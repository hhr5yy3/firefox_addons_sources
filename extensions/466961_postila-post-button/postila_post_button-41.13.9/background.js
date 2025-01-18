'use strict';
/*Raven.config('https://3c780fbc31584924868507614c7a0d15@sentry.postila.ru/2', {
    fetchContext: true,
    release: '41.13.9',
    logger: 'chromeExtension'
}).install();*/

var postilaBackground = (function () {
    var _this = {
        update: {
            message: 'Различные исправления и доработки'
        }
    };

    const sendEventToServer = (event) => {
        const payload = {
            client_id: chrome.runtime.id,
            useragent: navigator.userAgent,
            data: {
                'browser-extension': event
            }
        };

        fetch('https://restnew.postila.ru/action', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }

    const fetchApi = function(url, options) {
        return new Promise(function(resolve, reject) {
            fetch(url, options)
              .then(
                function(response) {
                    let headers = {};
                    for (var pair of response.headers.entries()) {
                        headers[pair[0]] = pair[1];
                    }

                    response.json()
                        .then(json =>  {
                            resolve({headers: headers, body: json});
                        }).
                        catch(err => {
                            if (response && response.status < 400 ) {
                                resolve({ headers: headers });
                            } else {
                                reject(err);
                            }
                        });
                }
              )
              .catch(function(err) {
                    reject(err);
              });
        });
    }

    _this.locales = JSON.parse('[{"locale":"ru","localeCode":"ru_ru","language":"Русский"},{"locale":"es","localeCode":"es_es","language":"Español"},{"locale":"en","localeCode":"en_us","language":"English"}]');

    if (!navigator.onLine) {
        return false;
    }

    _this.DEBUG = false;

    _this.namespace = 'postila';

    _this.settings = {
        version: '41.13.9',
        api: {
            baseProtocol: 'http',
            baseURl: '://postila.ru/',
            version: 'api/1.0/',
            login: 'user/login',
            events: 'user/events',
            postActionURL: 'post/post'
        }
    };

    _this.options = {
        showHoverButton: false
    };

    _this.status = {
        onSite: false,
        screenshotEnabled: true
    };

    _this.user = undefined;
    _this.checkUserTimer = null;
    _this.activeImage = null;

    _this.detectStatus = function () {
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
            if (changeInfo.status == 'loading') {
                return
            };

            if (changeInfo.status == 'complete') {
                _this.checkForDebugRun();
            };

            _this.setUpdateStatus();
        });

        chrome.tabs.onRemoved.addListener(function() {
            _this.setUpdateStatus();
        });

        chrome.tabs.onActivated.addListener(function() {
            _this.setUpdateStatus();
        });

        _this.setUpdateStatus();
    };

    _this.checkForDebugRun = () => {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
            discarded: false
        }, (tabs) => {
            if (tabs.length) {
                const url = new URL(tabs[0].url);

                if (url.hash === '#run-postila-extension') {
                    setTimeout(() => {
                        _this.newPost();
                    }, 5000);
                }
            }
        });
    }

    _this.setUpdateStatus = function (tab) {
        function getLocation (href) {
            var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
            return match && {
                    protocol: match[1],
                    host: match[2],
                    hostname: match[3],
                    port: match[4],
                    pathname: match[5],
                    search: match[6],
                    hash: match[7]
                }
        }

        function setStatus (url) {
            var location = getLocation(url);

            if (location && (location.host == 'postila.ru' || location.host == 'postila.io' || location.host == 'postila.co')) {
                _this.status.onSite = true;

                chrome.runtime.sendMessage({
                    onSite: _this.status.onSite
                });
            } else {
                _this.status.onSite = false;
            }
        }

        chrome.tabs.query({
            active: true,
            currentWindow: true,
            discarded: false
        }, function(tabs) {
            tabs.length && setStatus(tabs[0].url);
        });
    };

    _this.loadSettings = function (callback) {
        var supportedTranslations = _this.locales.map(lang => lang.locale);
        var language = navigator.language;
        var locales = [];
        var lang = 'en';

        if (language) {
            language = language.substr(0, 2).toLowerCase();

            supportedTranslations.forEach(function (supportedLanguage) {
                if (supportedLanguage == language) {
                    lang = supportedLanguage;
                }
            });
        }

        if (chrome.storage) {
            chrome.storage.sync.set({
                locale: lang
            }, function () {
                callback && callback();
            });
        }
    };

    _this.eventsCount = 0;

    _this.newImagePost = function (e, m) {
        var _this = this,
            url = _this.settings.api.baseProtocol + _this.settings.api.baseURl + _this.settings.api.postActionURL,
            parameters = [];

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            var tab = tabs[0] || {};

            //openPost(e, m, tab.title);
            chrome.tabs.sendMessage(tab.id, {
                namespace: 'postila',
                action: 'newImagePost',
                data: e
            });
        });
    };

    _this.newPost = function () {
        if (_this.status.onSite) {
            chrome.notifications.create(_this.namespace + '.notificationOnPostilaSite-' + Math.random(), {
                title: 'Кнопка «Пост!»',
                type: 'basic',
                iconUrl: '128x128.png',
                message: 'Кнопка установлена и работает. Попробуйте нажать её на интересных сайтах. Например, страницах с рецептами, идеями для путешествий, красивыми фотографиями.'
            }, function(){});
        } else {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            },
            function (tabs) {
                var tab = tabs[0].id;

                sendEventToServer('ext_start');

                if (!tabs || tabs.length == 0) {
                    return;
                }

                chrome.tabs.sendMessage(tab, {
                    namespace: 'postila',
                    action: 'screenshotClose'
                });

                chrome.tabs.sendMessage(tab, {
                    namespace: 'postila',
                    action: 'postShow'
                });
            });
        }
    };

    _this.screenshot = {
        canvas: document.createElement('canvas'),
        context: undefined,
        screenHeight: 0,
        iteration: 0,
        scrollPosition: 0,
        start: function (tabID, onComplete) {
            _this.screenshot.tabID = tabID;

            chrome.tabs.sendMessage(tabID, {
                namespace: 'postila',
                action: 'postClose'
            });

            setTimeout(function () {
                chrome.tabs.sendMessage(tabID, {
                    namespace: 'postila',
                    preparePageForScreenshot: true
                }, function (dimensions) {
                    console.info('start create scrernshot');
                    _this.screenshot.createOne(dimensions, tabID);

                    onComplete && onComplete();
                });
            }, 100);
        },
        createOne: function (dimensions, tabID) {
            try {
                var capturing = browser.tabs.captureVisibleTab({
                    format: 'png'
                });

                capturing.then(onCaptured, onError);
            }
            catch (e) {
                chrome.tabs.captureVisibleTab({
                    format: 'png'
                }, onCaptured);
            }

            function onCaptured(imageData) {
                chrome.tabs.sendMessage(tabID, {
                    namespace: 'postila',
                    screenshotDone: true
                });

                _this.screenshot.injectUI(imageData, dimensions);
            }

            function onError(error) {
                console.log(`Error: ${error}`);
            }
        },
        reset: function (dimension) {
            _this.screenshot.context = _this.screenshot.canvas.getContext('2d');
            _this.screenshot.canvas.width = dimension.width;
            _this.screenshot.canvas.height = dimension.height;
            _this.screenshot.screenHeight = dimension.screenHeight;
            _this.screenshot.scrollPosition = dimension.scrollPosition;
            _this.screenshot.iteration = 0;

            _this.screenshot.context.clearRect(0, 0, dimension.width, dimension.height);
        },
        add: function () {
            var img = document.createElement('img');

            chrome.tabs.captureVisibleTab({
                format: 'png'
            }, function (imageData) {
                img.src = imageData;

                img.onload = function() {
                    _this.screenshot.context.drawImage(img, 0, _this.screenshot.iteration * _this.screenshot.screenHeight);
                    _this.screenshot.iteration++;

                    chrome.tabs.sendMessage(_this.screenshot.tabID, {
                        prepareNextPageArea: true
                    });
                };
            });
        },
        end: function () {
            var img = document.createElement('img');

            chrome.tabs.captureVisibleTab({
                format: 'png'
            }, function (imageData) {
                img.src = imageData;

                img.onload = function() {
                    _this.screenshot.context.drawImage(img, 0, _this.screenshot.canvas.height - _this.screenshot.screenHeight);

                    _this.screenshot.injectUI(_this.screenshot.canvas.toDataURL('image/png'), _this.screenshot.scrollPosition);
                };
            });
        },
        injectUI: function (imageData, dimensions) {
            chrome.tabs.executeScript(null, {
                file: 'js/knockout-3.0.0.js'
            }, function () {
                chrome.tabs.executeScript(null, {
                    file: 'js/jquery-3.5.0.min.js'
                }, function () {
                    chrome.tabs.executeScript(null, {
                        file: 'js/purify.min.js'
                    }, function () {
                        chrome.tabs.executeScript(null, {
                            file: 'screenshot/postila.screenshot.cropper.min.js'
                        }, function () {
                            chrome.tabs.insertCSS(null, {
                                file: 'screenshot/postila.screenshot.css'
                            });
                            chrome.tabs.insertCSS(null, {
                                file: 'screenshot/postila.screenshot.cropper.min.css'
                            });
                            chrome.tabs.executeScript(null, {
                                file: 'screenshot/postila.screenshot.js'
                            }, function () {
                                chrome.tabs.sendMessage(_this.screenshot.tabID, {
                                    screenshotData: imageData,
                                    dimensions: dimensions
                                });
                            });
                        });
                    });
                });
            });
        }
    };

    _this.onMessage = function () {
        chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
            if (msg.action == 'apiCall' && msg.options) {
                if (msg.url && msg.options.method) {
                    fetchApi(msg.url, msg.options)
                        .then(response =>  {
                            sendResponse(response);
                        }).
                        catch(err => {
                            sendResponse(false);
                        });
                }

                return true;
            }

            if (msg.action == 'newPostFromScreenshot') {
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function (tabs) {
                    tabs.length && chrome.tabs.sendMessage(tabs[0].id, msg);
                });
            }

            if (msg.newImagePost) {
                _this.newImagePost(msg.newImagePost, msg.mArgument);
            }

            if ('activeImage' in msg) {
                if (msg.activeImage) {
                    _this.createContextMenuForImage();
                } else {
                    _this.removeContextMenuForImage();
                }

                _this.activeImage = msg.activeImage;
            }

            if (msg.getEventsCount) {
                sendResponse && sendResponse(_this.eventsCount);
            }

            if (msg.namespace == 'postila' && msg.screenshotStatus) {
                sendResponse && sendResponse(_this.status.screenshotEnabled);
            }

            if (msg.action && msg.action == 'reloadHoverButton') {
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function (tabs) {
                    tabs.length && chrome.tabs.sendMessage(tabs[0].id, {
                        namespace: 'postila',
                        action: 'reloadHoverButton'
                    });
                });
            }

            if (msg.action && msg.action == 'newPost') {
                _this.newPost();
            }

            if (msg.action && msg.action == 'screenshot' && _this.status.screenshotEnabled) {
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function (tabs) {
                    tabs.length && _this.screenshot.start(tabs[0].id);
                });
            }

            if (msg.action && msg.action == 'extensionUIIsVisible') {
                sendEventToServer('ext_show');
            }

            if (msg.action && msg.action == 'gotoPostila') {
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function(tabs) {
                    tabs.length && chrome.tabs.update(tabs[0].id, {
                        url: _this.settings.api.baseProtocol + _this.settings.api.baseURl + 'post/follow'
                    });
                });
            }
        });
    };

    _this.postImageFromContextMenu = function () {
        _this.activeImage && _this.newImagePost(_this.activeImage);
    };

    _this.createContextMenuForImage = function () {
        var title = chrome.i18n.getMessage('saveToPostila');

        if (chrome.contextMenus && !_this.imageContextMenuItem) {
            // Context menu for images
            _this.imageContextMenuItem = chrome.contextMenus.create({
                title: title,
                contexts: ['all'],
                onclick: _this.postImageFromContextMenu
            });
        }
    };

    _this.removeContextMenuForImage = function () {
        // Remove context menu for images
        if (chrome.contextMenus && _this.imageContextMenuItem) {
            chrome.contextMenus.remove(_this.imageContextMenuItem);
            _this.imageContextMenuItem = null;
        }
    };

    _this.start = function () {
        // Save version number
        chrome.storage && chrome.storage.sync.set({
            version: _this.settings.version
        });

        // Browser action
        chrome.browserAction.onClicked.addListener(_this.newPost);

        _this.loadSettings(function () {
            var contextMenuTitle = chrome.i18n.getMessage('action');

            // Context menu for page
            if (chrome.contextMenus) {
                _this.postContextMenuItem = chrome.contextMenus.create({
                    title: contextMenuTitle,
                    contexts: ['page', 'selection'],
                    onclick: _this.newPost
                });
            }


            _this.onMessage();
            _this.detectStatus();
        });

        chrome.runtime.onInstalled.addListener(function (details) {
            if (details.reason == 'update') {
                var updateMessage = chrome.i18n.getMessage('update');

                updateMessage && chrome.notifications && chrome.notifications.create(_this.namespace + '.notificationOnPostilaSite-' + Math.random(), {
                    title: chrome.i18n.getMessage('name'),
                    type: 'basic',
                    iconUrl: '128x128.png',
                    message: updateMessage
                }, function(){});
            }

            // inject post.js to all tabs
            chrome.tabs.query({
                url: [
                    'http://*/*',
                    'https://*/*'
                ],
                discarded: false,
                status: 'complete'
            }, function (tabs) {
                try {
                    if (tabs && tabs.length) {
                        tabs.forEach(function (tab) {
                            if (!tab.url.includes('chrome.google.com/webstore')) {
                                try {
                                    chrome.tabs.executeScript(tab.id, {file: 'post.js'});
                                    chrome.tabs.executeScript(tab.id, {file: 'screenshotHelper.js'});
                                    chrome.tabs.executeScript(tab.id, {file: 'hoverButton.js'});
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        });
                    }
                } catch (e) {}
            });
        });

        chrome.runtime.sendMessage({
            namespace: 'postila',
            debug: true
        });
    };

    _this.start();

    return _this;
})();
