(function() {
    /*window.Raven && Raven.config('http://193294de4e254041ab9740c8a71e46b4@sentry.kidms.ru/3', {
        fetchContext: true,
        logger: 'chromeExtension'
    }).install();*/

    var postilaScreenshotView = function (screenshotData, dimensions) {
        var _this = this;

        var minCropWidth = 336;
        var minCropHeight = 100;
        var isStarted = false;
        var namespace = 'postila';

        _this.settings = {
            version: '41.13.9',
            api: {
                baseProtocol: 'https:',
                baseURl: '//postila.ru/',
                version: 'api/1.0/',
                login: 'user/login',
                CSRF: 'base/csrf',
                upload: 'picture/upload'
            }
        };

        _this.screenshotData = screenshotData;
        _this.dimensions = dimensions;
        _this.$screenshot = null;
        _this.cropData = ko.observable({
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            originalWidth: 0,
            originalHeight: 0
        });
        _this.isImageUploading = ko.observable(false);
        _this.showUI = ko.observable(false);
        _this.showToolbar = ko.observable(false);
        _this.isCropping = ko.observable(false);
        _this.isSmallSelection = ko.observable(false);
        _this.isSmallSpaceFromTop = ko.observable(false);
        _this.isSmallSpaceFromLeft = ko.observable(false);
        _this.isSmallSpaceFromBottom = ko.observable(false);
        _this.message = ko.observable(chrome.i18n.getMessage('pleaseSelectPageArea'));
        _this.isError = ko.observable(false);

        _this.startCropper = function (dimensions) {
            console.info('startCropper');

            _this.$screenshot = $('.postila_screenshot__image');
            _this.$screenshot.cropper({
                zoomable: false,
                rotatable: false,
                autoCrop: false,
                done: function (data) {
                    var devicePixelRatio = window.devicePixelRatio;

                    data.width = data.width / devicePixelRatio;
                    data.height = data.height / devicePixelRatio;
                    data.x = data.x / devicePixelRatio;
                    data.y = data.y / devicePixelRatio;

                    isStarted && _this.cropData({
                        width: Math.round(data.width),
                        height: Math.round(data.height),
                        x: Math.round(data.x),
                        y: Math.round(data.y),
                        originalWidth: dimensions.width,
                        originalHeight: dimensions.screenHeight
                    });

                    _this.isSmallSpaceFromTop(data.y < 30);
                    _this.isSmallSpaceFromLeft((data.x + _this.cropData().width) < 200);
                    _this.isSmallSpaceFromBottom((dimensions.screenHeight - data.y - _this.cropData().height) < 100);
                    _this.showToolbar(!_this.isSmallSpaceFromBottom());
                    _this.isCropping(!!(_this.cropData().width * _this.cropData().height));
                    _this.isSmallSelection(_this.cropData().width < minCropWidth || _this.cropData().height < minCropHeight);

                    isStarted = true;

                    setTimeout(function () {
                        _this.showUI(true);
                    }, 100);
                }
            });
        };

        _this.getCropData = function () {
            return _this.$screenshot.cropper('getDataURL', {
                width: _this.cropData().width,
                height: _this.cropData().height
            });
        };

        _this.uploadImage = function () {
            var csrf = '';

            _this.isImageUploading(true);
            _this.message(chrome.i18n.getMessage('uploadingPicture'));

            chrome.runtime.sendMessage(
            {
                action: 'apiCall',
                url: _this.settings.api.baseProtocol + _this.settings.api.baseURl + _this.settings.api.version + _this.settings.api.login,
                options: {
                    method: 'GET'
                }
            }, function(response) {
                if (response) {
                    if (response.body.success && response.body.data && response.body.data.user) {
                        chrome.runtime.sendMessage(
                        {
                            action: 'apiCall',
                            url: _this.settings.api.baseProtocol + _this.settings.api.baseURl + _this.settings.api.version + _this.settings.api.CSRF,
                            options: {
                                method: 'GET'
                            }
                        }, function(response) {
                            if (response && response.body && response.body.csrf) {
                                csrf = response.body.csrf;

                                chrome.runtime.sendMessage(
                                {
                                    action: 'apiCall',
                                    url: _this.settings.api.baseProtocol + _this.settings.api.baseURl + _this.settings.api.version + _this.settings.api.upload,
                                    options: {
                                        body: 'YII_CSRF_TOKEN=' + csrf + '&fileBase64=' + encodeURIComponent(encodeURIComponent(_this.getCropData())),
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                        },
                                        method: 'POST'
                                    }
                                }, function(response) {
                                    if (response) {
                                        _this.isImageUploading(false);

                                        if (response.body.success) {
                                            chrome.runtime.sendMessage({
                                                action: 'newPostFromScreenshot',
                                                src: response.body.data.src
                                            });

                                            _this.close();
                                        } else {
                                            _this.message(response.body.data || chrome.i18n.getMessage('errorOnUploadingImage'));
                                            _this.isError(true);
                                            _this.isImageUploading(false);
                                        }
                                    } else {
                                        _this.message(response.data || chrome.i18n.getMessage('errorOnUploadingImage'));
                                        _this.isError(true);
                                        _this.isImageUploading(false);
                                    }
                                });
                            } else {
                                _this.message(response.data || chrome.i18n.getMessage('errorOnUploadingImage'));
                                _this.isError(true);
                                _this.isImageUploading(false);
                            }
                        });
                    } else {
                        window.open(_this.settings.api.baseProtocol + _this.settings.api.baseURl + '/?embed=1', '_blank', 'toolbar=0,location=0,menubar=0,width=1000,height=640');
                        _this.message(chrome.i18n.getMessage('pleaseLogin'));
                        _this.isError(true);
                        _this.isImageUploading(false);
                    }
                } else {
                    window.open(_this.settings.api.baseProtocol + _this.settings.api.baseURl + '/?embed=1', '_blank', 'toolbar=0,location=0,menubar=0,width=1000,height=640');
                    _this.message(chrome.i18n.getMessage('pleaseLogin'));
                    _this.isError(true);
                    _this.isImageUploading(false);
                }
            });
        };

        $('body').on('keyup.' + namespace, function (e) {
            if (e.keyCode == 27) {
                _this.close();
            }
        });

        _this.close = function () {
            $('html').
                removeClass('postila_screenshot__page');
            $('#postila_screenshot').remove();

            postilaScreenshotInit = null;
            postilaScreenshotView = null;

            $('body').off(namespace);

            chrome.runtime.sendMessage({
                namespace: 'postila',
                action: 'reloadHoverButton'
            });
        };
    };

    var postilaScreenshotInit = function (screenshotData) {
        var template =
            '<div id="postila_screenshot" class="postila_screenshot" data-bind="css: { \'postila_screenshot-show\': showUI }">' +
                '<div class="postila_screenshot__tollbar" data-bind="css: { \'postila_screenshot__tollbar-show\': showToolbar, \'postila_screenshot__tollbar-error\': isError }">' +
                    '<div class="postila_screenshot__message" data-bind="text: message, css: { \'postila_screenshot__message-error\': isError }"></div>' +
                    '<div class="postila_screenshot__action" data-bind="if: !isError()">' +
                        '<a href="https://pishite.postila.ru/topic/618732-rasshirenie-dlya-brauzera/" target="_blank" class="postila_screenshot__btn postila_screenshot__btn-white">' + chrome.i18n.getMessage('howTo') + '</a>' +
                    '</div>' +
                    '<div class="postila_screenshot__action_close">' +
                        '<span class="postila_screenshot__btn postila_screenshot__btn-secondary" data-bind="click: close">' + chrome.i18n.getMessage('cancel') + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="postila_screenshot__picture">' +
                    '<div class="postila_screenshot__dimension" data-bind="visible: isCropping, css: { \'postila_screenshot__dimension-small_selection\': isSmallSelection, \'postila_screenshot__dimension-in\': isSmallSpaceFromTop }, text: cropData().width + \' x \' + cropData().height, style: { right: (cropData().originalWidth - cropData().x - cropData().width) + \'px\', top: (cropData().y) + \'px\' }"></div>' +
                    '<div class="postila_screenshot__crop_action" data-bind="visible: isCropping, css: { \'postila_screenshot__crop_action-small_selection\': isSmallSelection, \'postila_screenshot__crop_action-in\': isSmallSpaceFromLeft, \'postila_screenshot__crop_action-inside\': isSmallSpaceFromBottom }, style: { right: (cropData().originalWidth - cropData().x - cropData().width) + \'px\', top: (cropData().y + cropData().height) + \'px\' }">' +
                        '<span data-bind="if: !isSmallSelection()">' +
                            '<span class="postila_screenshot__btn postila_screenshot__btn-secondary" data-bind="click: close, visible: !isImageUploading()">' + chrome.i18n.getMessage('cancel') + '</span>' +
                            '<span class="postila_screenshot__btn" data-bind="click: uploadImage, visible: !isImageUploading()">' + chrome.i18n.getMessage('upload') + '</span>' +
                            '<span class="postila_screenshot__btn postila_screenshot__btn-disabled" data-bind="visible: isImageUploading">' + chrome.i18n.getMessage('uploadInProgress') + '</span>' +
                        '</span>' +
                        '<span class="postila_screenshot__crop_message" data-bind="visible: isSmallSelection()">' +
                            chrome.i18n.getMessage('minImageSizeIs') + '<br/>' + chrome.i18n.getMessage('enlargeImageSize') + 
                        '</span>' +
                    '</div>' +
                    '<img class="postila_screenshot__image" data-bind="attr: { src: screenshotData, width: dimensions.width, height: dimensions.screenHeight }">' +
                '</div>' +
            '</div>';
        var view;
        var dimensions = {
            width: window.innerWidth,
            height: document.documentElement.scrollHeight,
            screenHeight: window.innerHeight,
            scrollPosition: window.pageYOffset
        };
        var div = document.createElement('div');

        if (!screenshotData) {
            alert(chrome.i18n.getMessage('refreshPageAndTry'));
            //Raven.captureMessage('No screenshotData');

            return false;
        } else {
            view = new postilaScreenshotView(screenshotData, dimensions);
        }

        $('html').
            addClass('postila_screenshot__page');

        div.innerHTML = DOMPurify.sanitize(template);
        document.body.appendChild(div);

        $('head').append("<link href='//fonts.googleapis.com/css?family=Roboto:300' rel='stylesheet' type='text/css'>");

        $(window).one('resize', function () {
            view.close();
        });

        chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
            if (msg.namespace == 'postila' && msg.action == 'screenshotClose') {
                view.close();
            }
        });

        ko.applyBindings(view, $('#postila_screenshot')[0]);
        view.startCropper(dimensions);
    };

    chrome.storage.sync.get({}, function(options) {
        chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
            if (msg.screenshotData && !$('#postila_screenshot').length) {
                postilaScreenshotInit && postilaScreenshotInit(msg.screenshotData, msg.dimensions);
            }
        });
    });
})();
