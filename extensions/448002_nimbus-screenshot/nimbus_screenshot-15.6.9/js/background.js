/*
 * "This work is created by NimbusWeb and is copyrighted by NimbusWeb. (c) 2017 NimbusWeb.
 * You may not replicate, copy, distribute, or otherwise create derivative works of the copyrighted
 * material without prior written permission from NimbusWeb.
 *
 * Certain parts of this work contain code licensed under the MIT License.
 * https://www.webrtc-experiment.com/licence/ THE SOFTWARE IS PROVIDED "AS IS",
 * WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * */

"use strict";

let xs, ys, ws, hs,
    scroll_crop = false, download_scroll_crop = false, send_nimbus_scroll_crop = false, send_slack_scroll_crop = false, send_google_scroll_crop = false, send_print_scroll_crop = false, send_pdf_scroll_crop = false, send_quick_scroll_crop = false, copy_to_clipboard_scroll_crop = false,
    fragment = false, download_fragment = false, send_nimbus_fragment = false, send_slack_fragment = false, send_google_fragment = false, send_print_fragment = false, send_pdf_fragment = false, send_quick_fragment = false, copy_to_clipboard_fragment = false,
    manifest = chrome.runtime.getManifest();

let screenshot = {
    id: chrome.i18n.getMessage("@@extension_id"),
    path: 'filesystem:chrome-extension://' + chrome.i18n.getMessage("@@extension_id") + '/persistent/',
    dataUrl: null,
    file: {
        parts: []
    },
    template: {
        panel_video_compact: ''
    },
    button_video: null,
    insertPopup: function (action) {
        window.nimbus_core.executeFile(['css/flex.min.css', 'css/new-style.min.css', 'css/icons.min.css', 'css/popup.min.css', 'css/fix-style.min.css', 'js/lib/jquery-3.3.1.js', 'js/connect-nimbus.js', 'js/content-popup.js'], function () {
            window.nimbus_core.sendMessage({operation: action});
        });
    },
    create: {
        canvas: function () {

        }
    },
    automatic: {
        data: {
            auth: '',
            action: '',
            type: '',
            site: '',
            workspace: {}
        },
        auth: function () {
            console.log('auth automation', screenshot.automatic.data);
            screenshot.setPageInfo(function () {
                switch (screenshot.automatic.data.auth) {
                    case 'nimbus':
                        nimbusShare.server.user.authState(function (res) {
                            if (res.errorCode === 0 && res.body && res.body.authorized) {
                                nimbusShare.server.workspaces.getAll(function (err, workspaces) {
                                    for (let workspace of workspaces) {
                                        if ((localStorage.numbusWorkspaceSelect !== 'false' && localStorage.numbusWorkspaceSelect === workspace.globalId) || (workspace.isDefault && localStorage.numbusWorkspaceSelect === 'false')) {
                                            screenshot.automatic.data.workspace = workspace;
                                            break;
                                        }
                                    }

                                    switch (screenshot.automatic.data.action) {
                                        case 'video':
                                            screenshot.videoRecorder.capture({type: screenshot.automatic.data.type});
                                            break;
                                        case 'image':
                                            screenshot.capture.activate.image_type(screenshot.automatic.data.type);
                                    }
                                });
                            } else {
                                screenshot.insertPopup('nsc_popup_login_open');
                            }
                        });
                        break;
                    case 'google':
                        if (!googleShare.story.get.accessToken()) {
                            window.google_oauth.login();
                        } else {
                            switch (screenshot.automatic.data.action) {
                                case 'video':
                                    screenshot.videoRecorder.capture({type: screenshot.automatic.data.type});
                                    break;
                                case 'image':
                                    screenshot.capture.activate.image_type(screenshot.automatic.data.type);
                            }
                        }
                        break;
                    case 'youtube':
                        if (!youtubeShare.getAccessToken()) {
                            window.youtube_oauth.login();
                        } else {
                            switch (screenshot.automatic.data.action) {
                                case 'video':
                                    screenshot.videoRecorder.capture({type: screenshot.automatic.data.type});
                                    break;
                            }
                        }
                        break;
                    default:
                        switch (screenshot.automatic.data.action) {
                            case 'video':
                                screenshot.videoRecorder.capture({type: screenshot.automatic.data.type});
                                break;
                            case 'image':
                                screenshot.capture.activate.image_type(screenshot.automatic.data.type);
                        }
                        break
                }
            }, screenshot.automatic.data.type)
        },
        send: function (blob) {
            console.log('send', blob, 'screenshot.automatic.data', screenshot.automatic.data);

            if (screenshot.automatic.data.auth === 'nimbus') {
                if (blob.size > screenshot.automatic.data.workspace.org.limits.attachmentSize) {
                    if (screenshot.automatic.data.workspace.org.user.premium && screenshot.automatic.data.workspace.org.user.premium.status === 'active') {
                        screenshot.insertPopup('nsc_popup_limitorgpremium_open');
                    } else {
                        screenshot.insertPopup('nsc_popup_limitorgfree_open');
                    }
                    return;
                }

                if (blob.size + screenshot.automatic.data.workspace.org.usage.traffic.current > screenshot.automatic.data.workspace.org.usage.traffic.max) {
                    screenshot.insertPopup('nsc_popup_limitorglimit_open');
                    return;
                }
            }

            window.nimbus_core.sendMessage({operation: 'content_automation_status_upload'});
            iconService.setLoading();

            switch (screenshot.automatic.data.auth) {
                case 'quick':
                    switch (screenshot.automatic.data.action) {
                        case 'video':
                            nimbusShare.server.send.quick({data: blob, title: screenshot.getFileName2(false, 'webm')}, function (err, res) {
                                nimbus_core.sendAllMessage({operation: 'content_automation_status_upload_end'});
                                iconService.setDefault();
                                if (!err && res) {
                                    nimbusShare.shortUrl(res.url, function (url) {
                                        nimbus_core.sendMessage({operation: 'content_automation_send_url', site: screenshot.automatic.data.site, url: url});
                                        screenshot.automatic.data = {auth: null, action: null, type: null, site: null, workspace: {}};
                                    });
                                } else if (screenshot.automatic.data.action !== 'abort') {
                                    chrome.tabs.create({url: 'edit.html?video'});
                                    screenshot.automatic.data = {auth: null, action: null, type: null, site: null, workspace: {}};
                                }
                            });
                            break;
                        case 'image':
                            nimbusShare.server.send.quick({data: blob, title: screenshot.getFileName()}, function (err, res) {
                                nimbus_core.sendAllMessage({operation: 'content_automation_status_upload_end'});
                                iconService.setDefault();
                                if (!err && res) {
                                    nimbusShare.shortUrl(res.url, function (url) {
                                        nimbus_core.sendMessage({operation: 'content_automation_send_url', site: screenshot.automatic.data.site, url: url});
                                        screenshot.automatic.data = {auth: null, action: null, type: null, site: null, workspace: {}};
                                    });
                                } else if (screenshot.automatic.data.action !== 'abort') {
                                    chrome.tabs.create({url: 'edit.html'});
                                    screenshot.automatic.data = {auth: null, action: null, type: null, site: null, workspace: {}};
                                }
                            });
                    }
                    break;
                case 'nimbus':
                    switch (screenshot.automatic.data.action) {
                        case 'video':
                            nimbusShare.server.send.screencast({data: blob, title: screenshot.getFileName2(false, 'webm'), name: screenshot.getFileName2(true, 'webm')}, function (err, res) {
                                nimbus_core.sendAllMessage({operation: 'content_automation_status_upload_end'});
                                iconService.setDefault();
                                if (!err && res) {
                                    nimbusShare.shortUrl(res.url, function (url) {
                                        nimbus_core.sendMessage({operation: 'content_automation_send_url', site: screenshot.automatic.data.site, url: url});
                                        screenshot.automatic.data = {auth: null, action: null, type: null, site: null, workspace: {}};
                                    });
                                } else if (screenshot.automatic.data.action !== 'abort') {
                                    chrome.tabs.create({url: 'edit.html?video'});
                                    screenshot.automatic.data = {auth: null, action: null, type: null, site: null, workspace: {}};
                                }
                            });
                            break;
                        case 'image':
                            nimbusShare.server.send.screenshot({data: blob, title: screenshot.getFileName(), name: screenshot.getFileName()}, function (err, res) {
                                nimbus_core.sendAllMessage({operation: 'content_automation_status_upload_end'});
                                iconService.setDefault();
                                if (!err && res) {
                                    nimbusShare.shortUrl(res.url, function (url) {
                                        nimbus_core.sendMessage({operation: 'content_automation_send_url', site: screenshot.automatic.data.site, url: url});
                                        screenshot.automatic.data = {auth: null, action: null, type: null, site: null, workspace: {}};
                                    });
                                } else if (screenshot.automatic.data.action !== 'abort') {
                                    chrome.tabs.create({url: 'edit.html'});
                                    screenshot.automatic.data = {auth: null, action: null, type: null, site: null, workspace: {}};
                                }
                            });
                            break;
                    }
                    break;
                case 'google':
                    switch (screenshot.automatic.data.action) {
                        case 'video':
                            googleShare.save(blob, screenshot.getFileName2(true, 'webm'), function (err, res) {
                                nimbus_core.sendAllMessage({operation: 'content_automation_status_upload_end'});
                                iconService.setDefault();
                                if (err && err.name === 401) {
                                    window.google_oauth.login();
                                } else if (!err && res) {
                                    googleShare.setPublicGdrive(res.id);
                                    nimbus_core.sendMessage({operation: 'content_automation_send_url', site: screenshot.automatic.data.site, url: 'https://drive.google.com/file/d/' + res.id});
                                    screenshot.automatic.data = {auth: null, action: null, type: null, site: null, premium_note: null, max_attachment_size_note: null};
                                } else if (screenshot.automatic.data.action !== 'abort') {
                                    screenshot.automatic.data = {auth: null, action: null, type: null, site: null, premium_note: null, max_attachment_size_note: null};
                                    chrome.tabs.create({url: 'edit.html?video'});
                                }
                            });
                            break;
                        case 'image':
                            googleShare.save(blob, screenshot.getFileName('format'), function (err, res) {
                                nimbus_core.sendAllMessage({operation: 'content_automation_status_upload_end'});
                                iconService.setDefault();
                                if (err && err.name === 401) {
                                    window.google_oauth.login();
                                } else if (!err && res) {
                                    googleShare.setPublicGdrive(res.id);
                                    nimbus_core.sendMessage({operation: 'content_automation_send_url', site: screenshot.automatic.data.site, url: 'https://drive.google.com/file/d/' + res.id});
                                    screenshot.automatic.data = {auth: null, action: null, type: null, site: null, premium_note: null, max_attachment_size_note: null};
                                } else if (screenshot.automatic.data.action !== 'abort') {
                                    screenshot.automatic.data = {auth: null, action: null, type: null, site: null, premium_note: null, max_attachment_size_note: null};
                                    chrome.tabs.create({url: 'edit.html'});
                                }
                            });
                            break;
                    }
                    break;
                case 'youtube':
                    switch (screenshot.automatic.data.action) {
                        case 'video':
                            youtubeShare.save(blob, screenshot.getFileName2(true, 'webm'), function (err, res) {
                                nimbus_core.sendAllMessage({operation: 'content_automation_status_upload_end'});
                                iconService.setDefault();
                                if (err && err.name === 401) {
                                    window.youtube_oauth.login();
                                } else if (!err && res) {
                                    nimbus_core.sendMessage({operation: 'content_automation_send_url', site: screenshot.automatic.data.site, url: 'https://youtu.be/' + res.id});
                                    screenshot.automatic.data = {auth: null, action: null, type: null, site: null, premium_note: null, max_attachment_size_note: null};
                                } else if (screenshot.automatic.data.action !== 'abort') {
                                    screenshot.automatic.data = {auth: null, action: null, type: null, site: null, premium_note: null, max_attachment_size_note: null};
                                    chrome.tabs.create({url: 'edit.html?video'});
                                }
                            });
                            break;
                    }
                    break;
            }
        },
        abort: function () {
            switch (screenshot.automatic.data.auth) {
                case 'nimbus':
                    nimbusShare.server.send.abort();
                    break;
                case 'google':
                    googleShare.abort();
                    break;
                case 'youtube':
                    youtubeShare.abort();
                    break;
                case 'quick':
                    nimbusShare.server.send.abort();
                    break;
            }
        }
    },
    capture: {
        activate: {
            image_type: function (type) {
                switch (type) {
                    case 'capture-visible' :
                        screenshot.capture.visible.init();
                        break;
                    case 'capture-fragment' :
                        screenshot.capture.fragment.init();
                        break;
                    case 'capture-fragment-scroll' :
                        screenshot.capture.fragment_scroll.init();
                        break;
                    case 'capture-selected' :
                        screenshot.capture.selected.init();
                        break;
                    case 'capture-scroll' :
                        screenshot.capture.scroll.init();
                        break;
                    case 'capture-entire' :
                        screenshot.capture.entire.init();
                        break;
                    case 'capture-window' :
                        screenshot.capture.window.init();
                        break;
                    case 'capture-delayed' :
                        screenshot.capture.delayed.init();
                        break;
                    case 'capture-blank' :
                        screenshot.capture.blank.init();
                        break;
                }
            },
            image: function (type) {
                if (localStorage.quickCapture === 'true') {
                    screenshot.automatic.data.action = 'image';
                    screenshot.automatic.data.auth = localStorage.enableEdit;
                    screenshot.automatic.data.type = type;
                    screenshot.automatic.data.site = undefined;
                    screenshot.automatic.auth();
                } else {
                    screenshot.setPageInfo(function () {
                        screenshot.capture.activate.image_type(type)
                    }, type);
                }
            },
            video: function (type) {
                if (localStorage.quickVideoCapture === 'true') {
                    screenshot.automatic.data.action = 'video';
                    screenshot.automatic.data.auth = localStorage.enableVideoEdit;
                    screenshot.automatic.data.type = type;
                    screenshot.automatic.data.site = undefined;
                    screenshot.automatic.auth();
                } else {
                    screenshot.videoRecorder.capture({type: type});
                }
            }
        },
        visible: {
            parts: [],
            init: function () {
                screenshot.file.parts = [];
                // localStorage.removeItem('imageFileInfo');
                window.nimbus_core.executeFile(['js/content-core.js', 'js/content-clear-capture.js', 'js/content-scrollbar.js'], function () {
                    window.nimbus_core.sendMessage({operation: 'nsc_scrollbar_invisible'}, screenshot.capture.visible.capture);
                });
            },
            capture: function (data) {
                chrome.tabs.captureVisibleTab(JSON.parse(localStorage.pageinfo).windowId, {format: localStorage.imageFormat === 'jpg' ? 'jpeg' : 'png', quality: +localStorage.imageQuality},
                    function (dataURI) {
                        screenshot.capture.visible.parts.push({x: 0, y: 0, w: data.width, h: data.height});
                        screenshot.file.parts.push(dataURI);
                        localStorage.imageFileInfo = JSON.stringify({w: data.width, h: data.height, z: data.z, parts: screenshot.capture.visible.parts});
                        screenshot.capture.visible.parts = [];
                        window.nimbus_core.sendMessage({operation: 'nsc_scrollbar_visible'});
                        screenshot.createEditPage();
                    });
            },
            finish: function () {
            }
        },
        selected: {
            parts: [],
            init: function () {
                screenshot.file.parts = [];
                // localStorage.removeItem('imageFileInfo');
                chrome.tabs.captureVisibleTab(JSON.parse(localStorage.pageinfo).windowId, {format: localStorage.imageFormat === 'jpg' ? 'jpeg' : 'png', quality: +localStorage.imageQuality},
                    function (dataUrl) {
                        screenshot.file.parts.push(dataUrl);
                        window.nimbus_core.executeFile(['css/fragment.min.css', 'css/cropper.min.css', 'css/crop.min.css', 'js/lib/jquery-3.3.1.js', 'js/content-core.js', 'js/lib/cropper.js', 'js/content-crop.js'], function () {
                            window.nimbus_core.sendMessage({operation: 'crop_data_screen', format: localStorage.imageFormat, quality: localStorage.imageQuality, dataUrl: dataUrl, appType: localStorage.appType});
                        });
                    });
            },
            capture: function (cb) {
                let data = JSON.parse(localStorage.cropPosition);
                let z = window.devicePixelRatio;
                console.log('cropPosition', data)
                screenshot.capture.selected.parts.push({x: data.x, y: data.y, w: data.width, h: data.height});

                localStorage.imageFileInfo = JSON.stringify({w: data.width, h: data.height, z: 1, parts: screenshot.capture.selected.parts});
                console.log('imageFileInfo', localStorage.imageFileInfo);
                screenshot.capture.selected.parts = [];
                cb ? cb() : screenshot.createEditPage();
            },
            finish: function (cb) {
            }
        },
        entire: {
            parts: [],
            parts_load: 0,
            init: function () {
                screenshot.file.parts = [];
                // localStorage.removeItem('imageFileInfo');
                window.nimbus_core.executeFile(['js/content-core.js', 'js/content-clear-capture.js', 'var actionEntirePageSctollDelay = ' + (localStorage.actionEntirePageSctollDelay) + ';', 'js/page.js'], function () {

                    if (scroll_crop === true) {
                        scroll_crop = false;
                        let data = JSON.parse(localStorage.cropScrollPosition);
                        console.log('cropScrollPosition', localStorage.cropScrollPosition);
                        window.nimbus_core.sendMessage({
                            operation: 'content_scroll_page',
                            'scroll_crop': true,
                            'fragment': false,
                            'hide_fixed_elements': (localStorage.actionHideFixedElements === 'true'),
                            'x': data.x,
                            'y': data.y,
                            'width': data.width,
                            'height': data.height
                        });
                    } else if (fragment) {
                        fragment = false;
                        let data = JSON.parse(localStorage.fragmentPosition);
                        console.log('fragmentPosition', localStorage.fragmentPosition);
                        window.nimbus_core.sendMessage({
                            operation: 'content_scroll_page',
                            'scroll_crop': false,
                            'fragment': true,
                            'hide_fixed_elements': (localStorage.actionHideFixedElements === 'true'),
                            'x': data.x,
                            'y': data.y,
                            'width': data.width,
                            'height': data.height
                        });
                    } else {
                        window.nimbus_core.sendMessage({
                            operation: 'content_scroll_page',
                            'scroll_crop': false,
                            'fragment': false,
                            'hide_fixed_elements': (localStorage.actionHideFixedElements === 'true')
                        })
                    }
                });
            },
            capture: function (data, cb) {
                chrome.tabs.captureVisibleTab(JSON.parse(localStorage.pageinfo).windowId, {format: localStorage.imageFormat === 'jpg' ? 'jpeg' : 'png', quality: +localStorage.imageQuality},
                    function (dataURI) {
                        cb && cb();

                        let x = 0;
                        let y = Math.floor((data.windowHeight - data.h) * data.z);
                        let w = Math.floor(data.w * data.z);
                        let h = Math.floor(data.h * data.z);
                        let x2 = Math.floor(data.x * data.z);
                        let y2 = Math.floor(data.y * data.z);
                        let w2 = w;
                        let h2 = h;

                        if (data.scroll_crop || data.fragment) {
                            x = Math.ceil(data.x * data.z);
                            y = Math.ceil(data.y_shift * data.z);
                            x2 = 0;
                            y2 = Math.ceil(data.y_crop * data.z);
                        }

                        screenshot.capture.entire.parts.push({x: x, y: y, w: w, h: h, x2: x2, y2: y2, w2: w2, h2});
                        screenshot.file.parts.push(dataURI);

                        if (++screenshot.capture.entire.parts_load === data.count_parts) {
                            let maxSize = 32767;
                            let maxArea = 268435456;
                            let width = Math.ceil(Math.min(data.totalWidth * data.z, maxSize));
                            let height = Math.ceil(Math.min(data.totalHeight * data.z, maxSize));
                            let z = window.devicePixelRatio;

                            if (width * height > maxArea) height = Math.floor(maxArea / width);

                            localStorage.imageFileInfo = JSON.stringify({w: width, h: height, z: 1, parts: screenshot.capture.entire.parts});
                            console.log('imageFileInfo', localStorage.imageFileInfo);
                            screenshot.capture.entire.parts = [];
                            screenshot.capture.entire.parts_load = 0;
                            screenshot.capture.entire.finish(cb);
                        }
                    });
            },
            finish: function () {
                if (download_scroll_crop || download_fragment) {
                    download_scroll_crop = false;
                    download_fragment = false;
                    screenshot.download();
                } else if (send_nimbus_scroll_crop || send_nimbus_fragment) {
                    send_nimbus_scroll_crop = false;
                    send_nimbus_fragment = false;
                    screenshot.createEditPage('nimbus');
                } else if (send_slack_scroll_crop || send_slack_fragment) {
                    send_slack_scroll_crop = false;
                    send_slack_fragment = false;
                    screenshot.createEditPage('slack');
                } else if (send_google_scroll_crop || send_google_fragment) {
                    send_google_scroll_crop = false;
                    send_google_fragment = false;
                    screenshot.createEditPage('google');
                } else if (send_print_scroll_crop || send_print_fragment) {
                    send_print_scroll_crop = false;
                    send_print_fragment = false;
                    screenshot.createEditPage('print');
                } else if (send_pdf_scroll_crop || send_pdf_fragment) {
                    send_pdf_scroll_crop = false;
                    send_pdf_fragment = false;
                    screenshot.createEditPage('pdf');
                } else if (send_quick_scroll_crop || send_quick_fragment) {
                    send_quick_scroll_crop = false;
                    send_quick_fragment = false;
                    screenshot.createEditPage('quick');
                } else if (copy_to_clipboard_scroll_crop || copy_to_clipboard_fragment) {
                    copy_to_clipboard_scroll_crop = false;
                    copy_to_clipboard_fragment = false;
                    screenshot.copyToClipboard();
                } else {
                    screenshot.createEditPage();
                }
            }
        },
        scroll: {
            init: function () {
                window.nimbus_core.executeFile(['css/fragment.min.css', 'css/cropper.min.css', 'css/crop.min.css', 'js/content-core.js', 'js/content-clear-capture.js', 'js/lib/jquery-3.3.1.js', 'js/lib/cropper.js', 'js/content-scroll-crop.js'], function () {
                    window.nimbus_core.sendMessage({operation: 'scroll_crop_data_screen', appType: localStorage.appType});
                });
            },
        },
        fragment: {
            init: function () {
                window.nimbus_core.executeFile(['css/fragment.min.css', 'css/crop.min.css', 'js/lib/jquery-3.3.1.js', 'js/content-core.js', 'js/content-fragment.js'], function () {
                    window.nimbus_core.sendMessage({operation: 'content_capture_fragment_init', appType: localStorage.appType});
                });
            },
        },
        fragment_scroll: {
            init: function () {
                window.nimbus_core.executeFile(['css/fragment.min.css', 'css/crop.min.css', 'js/lib/jquery-3.3.1.js', 'js/content-core.js', 'js/content-fragment-scroll.js'], function () {
                    window.nimbus_core.sendMessage({operation: 'content_capture_scroll_fragment_init', appType: localStorage.appType});
                });
            },
        },
        delayed: {
            init: function () {
                timerContent.set(localStorage.delayedScreenshotTime || 3, 'capture_delayed');
            },
        },
        window: {
            parts: [],
            init: function (cb) {
                screenshot.file.parts = [];
                chrome.desktopCapture.chooseDesktopMedia(["tab", 'screen', 'window'], function (streamId) {
                    screenshot.capture.window.capture(streamId, cb)
                })
            },
            capture: function (streamId, cb) {
                window.navigator.getUserMedia({audio: false, video: {mandatory: {chromeMediaSource: "desktop", chromeMediaSourceId: streamId}}},
                    function (stream) {
                        let video = document.createElement('video');
                        video.onloadedmetadata = function () {
                            let canvas = document.createElement('canvas');
                            let ctx = canvas.getContext('2d');
                            canvas.width = video.videoWidth;
                            canvas.height = video.videoHeight;

                            console.log(video.videoWidth, video.videoHeight)

                            ctx.drawImage(video, 0, 0);
                            stream.getTracks()[0].stop();
                            video.remove();
                            // screenshot.capture.window.canvas = window.nimbus_core.scaleCanvas(screenshot.capture.window.canvas);

                            screenshot.capture.window.parts.push({x: 0, y: 0, w: canvas.width, h: canvas.height});
                            screenshot.file.parts.push(canvas.toDataURL('image/' + localStorage.imageFormat === 'jpg' ? 'jpeg' : 'png', +localStorage.imageQuality / 100));
                            localStorage.imageFileInfo = JSON.stringify({w: canvas.width, h: canvas.height, z: 1, parts: screenshot.capture.window.parts});
                            screenshot.capture.window.parts = [];
                            screenshot.capture.window.finish(cb);

                            if (cb) {
                                chrome.tabs.create({url: 'nimbus_screnshot_active_tab'});
                                cb()
                            } else {
                                screenshot.createEditPage();
                            }
                        };
                        try {
                            video.srcObject = stream;
                        } catch (error) {
                            video.src = window.URL.createObjectURL(stream);
                        }
                        video.play();
                    }, console.error);
            },
            finish: function (cb) {
            },
        },
        blank: {
            canvas: null,
            ctx: null,
            parts: [],
            init: function () {
                screenshot.file.parts = [];
                localStorage.removeItem('imageFileInfo');
                screenshot.capture.blank.capture()
            },
            capture: function () {
                screenshot.capture.blank.canvas = document.createElement('canvas');
                screenshot.capture.blank.ctx = screenshot.capture.blank.canvas.getContext('2d');
                screenshot.capture.blank.canvas.width = screen.width - 100;
                screenshot.capture.blank.canvas.height = screen.height - 280;

                screenshot.capture.blank.ctx.fillStyle = "#FFF";
                screenshot.capture.blank.ctx.fillRect(0, 0, screenshot.capture.blank.canvas.width, screenshot.capture.blank.canvas.height);

                screenshot.capture.blank.parts.push({x: 0, y: 0, w: screenshot.capture.blank.canvas.width, h: screenshot.capture.blank.canvas.height});
                screenshot.file.parts.push(screenshot.capture.blank.canvas.toDataURL());
                screenshot.capture.blank.finish();
            },
            finish: function () {
                localStorage.imageFileInfo = JSON.stringify({w: screenshot.capture.blank.canvas.width, h: screenshot.capture.blank.canvas.height, z: 1, parts: screenshot.capture.blank.parts});

                screenshot.capture.blank.canvas = null;
                screenshot.capture.blank.ctx = null;
                screenshot.capture.blank.parts = [];

                screenshot.createEditPage('blank');
            }
        }
    },
    createMenu: function () {
        chrome.contextMenus.removeAll();
        if (localStorage.appContentMenuShow !== 'false') {
            let menu = JSON.parse(localStorage.appMenuItem);

            let button_root = chrome.contextMenus.create({
                "title": chrome.i18n.getMessage("appNameMini"),
                "contexts": ["all"]
            });

            menu.visible && chrome.contextMenus.create({
                title: chrome.i18n.getMessage("btnVisiblePage"),
                contexts: ["all"],
                parentId: button_root,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-visible')
            });

            menu.fragment && chrome.contextMenus.create({
                title: chrome.i18n.getMessage("btnCaptureFragment"),
                contexts: ["all"],
                parentId: button_root,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-fragment')
            });

            menu.selected && chrome.contextMenus.create({
                title: chrome.i18n.getMessage("btnSelectedArea"),
                contexts: ["all"],
                parentId: button_root,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-selected')
            });

            menu.scroll && chrome.contextMenus.create({
                title: chrome.i18n.getMessage("btnSelectedScroll"),
                contexts: ["all"],
                parentId: button_root,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-scroll')
            });

            menu.entire && chrome.contextMenus.create({
                title: chrome.i18n.getMessage("btnEntirePage"),
                contexts: ["all"],
                parentId: button_root,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-entire')
            });

            menu.delayed && chrome.contextMenus.create({
                title: chrome.i18n.getMessage("btnDelayedScreen"),
                contexts: ["all"],
                parentId: button_root,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-delayed')
            });

            menu.blank && chrome.contextMenus.create({
                title: chrome.i18n.getMessage("btnBlankScreen"),
                contexts: ["all"],
                parentId: button_root,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-blank')
            });

            if (window.nimbus_core.is_chrome) {
                menu.window && chrome.contextMenus.create({
                    title: chrome.i18n.getMessage("btnBrowserWindow"),
                    contexts: ["all"],
                    parentId: button_root,
                    onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-window')
                });

                menu.video && (screenshot.button_video = chrome.contextMenus.create({
                    title: chrome.i18n.getMessage("btnCaptureVideo"),
                    contexts: ["all"],
                    parentId: button_root,
                    onclick: screenshot.capture.activate.video.bind(screenshot, 'tab')
                }));
            }

            chrome.contextMenus.create({
                title: "separator",
                type: "separator",
                contexts: ["all"],
                parentId: button_root
            });

            chrome.contextMenus.create({
                title: chrome.i18n.getMessage("btnOptions"),
                contexts: ["all"],
                parentId: button_root,
                onclick: function () {
                    chrome.tabs.create({url: 'options.html'});
                }
            });
        }
    },
    changeVideoButton: function () {
        if (localStorage.appContentMenuShow === 'true') {
            if (screenshot.videoRecorder.getStatus()) {
                chrome.contextMenus.update(screenshot.button_video, {
                    title: chrome.i18n.getMessage("optionsLabelStopVideo"),
                    onclick: videoRecorder.stopRecord
                })
            } else {
                chrome.contextMenus.update(screenshot.button_video, {
                    title: chrome.i18n.getMessage("btnCaptureVideo"),
                    onclick: function () {
                        videoRecorder.capture({
                            type: 'tab',
                            countdown: localStorage.videoCountdown
                        });
                    }
                })
            }
        }
    },
    openPage: function (url) {
        chrome.tabs.create({url: url});
    },
    setPageInfo: function (cb, type) {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
            let url = document.createElement('a');
            url.href = tabs[0].url;
            let info = {id: tabs[0].id, windowId: tabs[0].windowId, url: 'http://' + url.host, title: tabs[0].title, time: getTimeStamp()};
            if (type === 'desktop' || type === 'capture-window') {
                info.title = 'nimbus-capture';
                info.url = 'http://nimbus-capture';
            }

            localStorage.pageinfo = JSON.stringify(info);
            cb && cb(info);
        });
    },
    createEditPage: function (params) {
        if (localStorage.quickCapture === 'true' && (localStorage.enableEdit === 'nimbus' || localStorage.enableEdit === 'google' || localStorage.enableEdit === 'quick')) {
            let info = JSON.parse(localStorage.imageFileInfo);
            window.nimbus_core.createCanvasParts(info, screenshot.file.parts, function (canvas, blob) {
                screenshot.automatic.send(blob)
            });
        } else {
            params = params || localStorage.enableEdit;
            switch (params) {
                case 'copy':
                    screenshot.copyToClipboard();
                    break;
                case 'save':
                    screenshot.download();
                    break;
                default:
                    chrome.tabs.create({url: 'edit.html' + ((params === 'edit' || !params) ? '' : '?' + params)});
                    break;
            }
        }
    },
    init: function () {
        console.log('init');

        if (window.nimbus_core.is_chrome) screenshot.videoRecorder = videoRecorder;
        screenshot.createMenu();
    },
    setWaterMark: function (canvas, cb) {
        nimbus_core.checkWaterMark(function (check) {
            nimbusShare.checkPremium(function (err, premium) {
                if (err || !premium.capture) return cb && cb(canvas);

                if (!check) return cb && cb(canvas);

                nimbus_core.getWaterMark(function (watermark) {
                    let x, y, shift = 10;
                    switch (localStorage.watermarkPosition) {
                        case 'lt':
                            x = shift;
                            y = shift;
                            break;
                        case 'rt':
                            x = canvas.width - watermark.width - shift;
                            y = shift;
                            break;
                        case 'lb':
                            x = shift;
                            y = canvas.height - watermark.height - shift;
                            break;
                        case 'rb':
                            x = canvas.width - watermark.width - shift;
                            y = canvas.height - watermark.height - shift;
                            break;
                        case 'c':
                            x = Math.floor((canvas.width - watermark.width) / 2);
                            y = Math.floor((canvas.height - watermark.height) / 2);
                            break;
                    }

                    canvas.getContext('2d').drawImage(watermark, x, y, watermark.width, watermark.height);

                    return cb && cb(canvas);
                });
            })
        })
    },
    copyToClipboard: function () {
        console.log('copyToClipboard');
        let imageinfo = JSON.parse(localStorage.imageFileInfo);

        if (window.nimbus_core.is_firefox) {
            window.nimbus_core.createCanvasParts(imageinfo, screenshot.file.parts, function (canvas, blob) {
                window.nimbus_core.dataUrlToArrayBuffer(window.URL.createObjectURL(blob), function (buffer) {
                    chrome.clipboard.setImageData(buffer, (localStorage.format === 'jpg' ? 'jpeg' : 'png'));

                    chrome.notifications.create(null, {
                            type: 'basic',
                            iconUrl: 'images/icons/48x48.png',
                            title: chrome.i18n.getMessage("appName"),
                            message: chrome.i18n.getMessage("notificationCopy")
                        },
                        function (notificationId) {
                            window.setTimeout(function (id) {
                                chrome.notifications.clear(id);

                                screenshot.file.parts = [];
                                localStorage.removeItem('imageFileInfo');
                            }.bind(this, notificationId), 3000);
                        });
                });
            });
        } else {
            let pageinfo = JSON.parse(localStorage.pageinfo);
            window.nimbus_core.setActiveTab(pageinfo.id);

            window.setTimeout(function () {
                window.nimbus_core.sendMessage({operation: 'copy_to_clipboard', info: imageinfo, parts: screenshot.file.parts});

                screenshot.file.parts = [];
                localStorage.removeItem('imageFileInfo');
            }, 200);
        }
    },
    download: function () {
        let info = JSON.parse(localStorage.imageFileInfo);
        window.nimbus_core.createCanvasParts(info, screenshot.file.parts, function (canvas, blob) {
            screenshot.file.parts = [];
            localStorage.removeItem('imageFileInfo');
            chrome.downloads.download({
                url: window.URL.createObjectURL(blob),
                filename: screenshot.getFileName(),
                saveAs: localStorage.enableSaveAs !== 'false'
            })
        });
    },
    getFileName: function () {
        let s = localStorage.fileNamePatternScreenshot;
        let f = localStorage.imageFormat;
        let info = JSON.parse(localStorage.pageinfo);
        let url = document.createElement('a');
        url.href = info.url || '';
        s = s.replace(/\{url}/, info.url || '')
            .replace(/\{title}/, info.title || '')
            .replace(/\{domain}/, url.host || '')
            .replace(/\{date}/, info.time.split(' ')[0] || '')
            .replace(/\{time}/, info.time.split(' ')[1] || '')
            .replace(/\{ms}/, info.time.split(' ')[2] || '')
            .replace(/\{timestamp}/, info.time.split(' ')[3] || '');

        return s.replace(/[\*\|\\\:\"\<\>\?\/#]+/ig, '_') + ('.' + f);
    },
    getFileName2: function (is_format, format) {
        let is_video = (format === 'webm' || format === 'mp4' || format === 'gif');
        let s = is_video ? localStorage.fileNamePatternScreencast : localStorage.fileNamePatternScreenshot;
        let info = JSON.parse(localStorage.pageinfo);
        let url = document.createElement('a');
        url.href = info.url || '';
        s = s.replace(/\{url}/, info.url || '')
            .replace(/\{title}/, info.title || '')
            .replace(/\{domain}/, url.host || '')
            .replace(/\{date}/, info.time.split(' ')[0] || '')
            .replace(/\{time}/, info.time.split(' ')[1] || '')
            .replace(/\{ms}/, info.time.split(' ')[2] || '')
            .replace(/\{timestamp}/, info.time.split(' ')[3] || '');

        return s.replace(/[\*\|\\\:\"\<\>\?\/#]+/ig, '_') + (is_format ? '.' + format : '');
    },
};

if (window.nimbus_core.is_chrome) {
    chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
        console.log(item);
        if (item.byExtensionId && item.byExtensionId === screenshot.id) {
            let page = JSON.parse(localStorage.pageinfo);
            if (/video/.test(item.mime)) {
                suggest({filename: window.nimbus_core.getVideoFileName(page, localStorage.videoFormat)});
            } else if (/image/.test(item.mime)) {
                suggest({filename: window.nimbus_core.getImageFileName(page, localStorage.imageFormat)});
            }
        }
    });
}

window.onload = screenshot.init;

function getTimeStamp() {
    let y, m, d, h, M, s, mm, timestamp;
    let time = new Date();
    y = time.getFullYear();
    m = time.getMonth() + 1;
    d = time.getDate();
    h = time.getHours();
    M = time.getMinutes();
    s = time.getSeconds();
    mm = time.getMilliseconds();
    timestamp = Date.now();
    if (m < 10) m = '0' + m;
    if (d < 10) d = '0' + d;
    if (h < 10) h = '0' + h;
    if (M < 10) M = '0' + M;
    if (s < 10) s = '0' + s;
    if (mm < 10) mm = '00' + mm;
    else if (mm < 100) mm = '0' + mm;
    return y + '.' + m + '.' + d + ' ' + h + ':' + M + ':' + s + ' ' + mm + ' ' + timestamp;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log('request', request);

        switch (request.operation) {
            case 'oauth_slack':
                slack_oauth.login();
                break;
            case 'oauth_google':
                google_oauth.login();
                break;
            case 'oauth_google_refresh':
                google_oauth.refreshToken();
                break;
            case 'oauth_youtube':
                window.youtube_oauth.login();
                break;
            case 'oauth_youtube_refresh':
                window.youtube_oauth.refreshToken();
                break;
            case 'update_menu':
                screenshot.createMenu();
                break;

            case 'set_video_panel':
                localStorage.videoDrawingToolsEnable = request.value;
                break;
            case 'set_video_editor_tools':
                localStorage.videoEditorTools = request.tools;
                break;
            case 'set_option':
                localStorage[request.key] = request.value;
                break;
            case 'get_option':
                sendResponse(localStorage[request.key]);
                break;
            case 'get_crop_position':
                sendResponse(localStorage.saveCropPosition === 'true' ? JSON.parse(localStorage.cropPosition) : {});
                break;
            case 'get_crop_scroll_position':
                let res = {};
                if (localStorage.saveCropPosition === 'true') res = JSON.parse(localStorage.cropScrollPosition);
                res.actionHideFixedElements = (localStorage.actionHideFixedElements === 'true');
                sendResponse(res);
                break;
            case 'get_hotkeys':
                sendResponse({hotkeys: localStorage.appHotkeys});
                break;
            case 'get_local_storage':
                sendResponse({localStorage: localStorage});
                break;
            case 'get_file_parts':
                sendResponse({parts: screenshot.file.parts});
                break;
            case 'get_info_record':
                sendResponse({
                    state: screenshot.videoRecorder.getState(),
                    status: screenshot.videoRecorder.getStatus(),
                    time: screenshot.videoRecorder.getTimeRecord()
                });
                break;
            case 'get_quick_capture':
                sendResponse({
                    enable_edit: localStorage.enableEdit,
                    enable_video_edit: localStorage.enableVideoEdit,
                    quick_capture: localStorage.quickCapture,
                    quick_capture_type: localStorage.quickCaptureType,
                    quick_video_capture: localStorage.quickVideoCapture,
                    quick_video_capture_type: localStorage.quickVideoCaptureType
                });
                break;
            case 'get_automation_setting':
                sendResponse({
                    quick_capture_github: localStorage.quickVideoCaptureGithub,
                    quick_capture_github_welcome: localStorage.quickVideoCaptureGithubWelcome
                });
                break;
            case 'get_capture_desktop':
                screenshot.capture.window.init(sendResponse);
                return true;
            case 'get_is_media_access':
                screenshot.videoRecorder.isMediaAccess(sendResponse);
                return true;
            case 'get_slack_data':
                slack_oauth.sendData();
                break;

            case 'save_crop_position':
                localStorage.cropPosition = JSON.stringify(request.value);
                break;
            case 'save_crop_scroll_position':
                localStorage.cropScrollPosition = JSON.stringify(request.value);
                break;
            case 'save_fragment_scroll_position':
                localStorage.fragmentPosition = JSON.stringify(request.value);
                break;
            case 'save_position_video_camera':
                localStorage.videoCameraPosition = JSON.stringify(request.position);
                break;

            case 'open_page':
                screenshot.openPage(request.url);
                break;
            case 'web_camera_toggle_panel':
                chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {operation: 'web_camera_toggle'});
                });
                break;

            case 'content_stop_timer':
                chrome.browserAction.setPopup({popup: 'popup.html'});
                break;
            case 'content_end_timer':
                chrome.browserAction.setPopup({popup: 'popup.html'});
                if (request.type === 'capture_delayed') {
                    screenshot.capture.visible.init();
                } else if (request.type !== undefined) {
                    screenshot.videoRecorder.capture({
                        type: request.type,
                        not_timer: true,
                        media_access: true
                    });
                }
                break;
            case 'update_context_menu':
                screenshot.createMenu();
                break;

            case 'activate_hotkey':
            case 'activate_capture':
                screenshot.capture.activate.image(request.value);
                break;

            case 'activate_record':
                switch (request.key) {
                    case 'start' :
                        screenshot.videoRecorder.capture({type: request.value});
                        break;
                    case 'pause' :
                        screenshot.videoRecorder.pauseRecord();
                        break;
                    case 'stop' :
                        screenshot.videoRecorder.stopRecord();
                        break;
                }
                break;

            case 'send_to':
                switch (request.path) {
                    /*
                    * crop
                    * */
                    case 'redactor' :
                    case 'nimbus' :
                    case 'slack' :
                    case 'google' :
                    case 'print' :
                    case 'pdf' :
                    case 'quick' :
                        screenshot.capture.selected.capture(screenshot.createEditPage.bind(this, request.path));
                        break;
                    case 'download' :
                        screenshot.capture.selected.capture(screenshot.download);
                        break;
                    case 'copy_to_clipboard' :
                        screenshot.capture.selected.capture(screenshot.copyToClipboard);
                        break;
                    /*
                    *  scroll crop
                    * */
                    case 'redactor_scroll':
                        scroll_crop = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'download_scroll':
                        download_scroll_crop = true;
                        scroll_crop = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'nimbus_scroll' :
                        send_nimbus_scroll_crop = true;
                        scroll_crop = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'slack_scroll' :
                        send_slack_scroll_crop = true;
                        scroll_crop = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'google_scroll' :
                        send_google_scroll_crop = true;
                        scroll_crop = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'print_scroll' :
                        send_print_scroll_crop = true;
                        scroll_crop = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'pdf_scroll' :
                        send_pdf_scroll_crop = true;
                        scroll_crop = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'quick_scroll' :
                        send_quick_scroll_crop = true;
                        scroll_crop = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'copy_to_clipboard_scroll' :
                        copy_to_clipboard_scroll_crop = true;
                        scroll_crop = true;
                        screenshot.capture.entire.init();
                        break;
                    /*
                    *  fragment
                    * */
                    case 'redactor_fragment':
                        fragment = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'download_fragment':
                        download_fragment = true;
                        fragment = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'nimbus_fragment' :
                        send_nimbus_fragment = true;
                        fragment = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'slack_fragment' :
                        send_slack_fragment = true;
                        fragment = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'google_fragment' :
                        send_google_fragment = true;
                        fragment = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'print_fragment' :
                        send_print_fragment = true;
                        fragment = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'pdf_fragment' :
                        send_pdf_fragment = true;
                        fragment = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'quick_fragment' :
                        send_quick_fragment = true;
                        fragment = true;
                        screenshot.capture.entire.init();
                        break;
                    case 'copy_to_clipboard_fragment' :
                        copy_to_clipboard_fragment = true;
                        fragment = true;
                        screenshot.capture.entire.init();
                        break;
                }
                break;

            case 'status_video_change':
                switch (request.status) {
                    case 'play' :
                        if (screenshot.videoRecorder.getState() !== 'recording') screenshot.videoRecorder.pauseRecord();
                        break;
                    case 'pause' :
                        if (screenshot.videoRecorder.getState() === 'recording') screenshot.videoRecorder.pauseRecord();
                        break;
                    case 'stop' :
                        screenshot.videoRecorder.stopRecord();
                        break;
                }
                break;

            case 'check_tab_action':
                let action = {
                    chrome: true,
                    fragment: false,
                    crop: false,
                    scroll_crop: false,
                    url: false
                };

                switch (request.action) {
                    case 'insert_page' :
                        console.log('insert_page')
                        chrome.tabs.query({active: true}, function (tabs) {
                            console.log('tabs.query', tabs)
                            if (!/^chrome/.test(tabs[0].url) && !/chrome.google.com\/webstore/.test(tabs[0].url)) {
                                chrome.tabs.executeScript(tabs[0].id, {file: "js/consentNimbus.js"});
                            } else {
                                action.chrome = true;
                                console.log('check_tab_action')
                                chrome.runtime.sendMessage({
                                    'operation': 'check_tab_action',
                                    'action': 'back_is_page',
                                    'value': JSON.stringify(action)
                                });
                            }
                        });
                        break;
                }
                break;
            case 'content_capture':
                screenshot.capture.entire.capture(request, sendResponse);
                return true;
            // break;
            case 'content_automation':
                screenshot.automatic.data.action = request.action;
                if (request.action !== 'abort') {
                    screenshot.automatic.data.auth = request.auth;
                    screenshot.automatic.data.type = request.type;
                    screenshot.automatic.data.site = request.site;
                    screenshot.automatic.auth();
                } else {
                    screenshot.automatic.abort();
                }
                break;
            case 'content_popup':
                screenshot.insertPopup(request.action);
                break;
            case 'content_popup_request':
                switch (request.action) {
                    case 'auth':
                        nimbusShare.server.user.auth(request.email, request.password, function (res) {
                            sendResponse(res);
                        });
                        break;
                    case 'register':
                        nimbusShare.server.user.register(request.email, request.password, function (res) {
                            sendResponse(res);
                        });
                        break;
                    case 'info':
                        nimbusShare.server.user.info(function (res) {
                            sendResponse(res);
                        });
                        break;
                }
                return true;
            case 'content_message':
                window.nimbus_core.sendMessage(request.message);
                break
        }
    }
);

if (window.nimbus_core.is_chrome) {
    chrome.commands.onCommand.addListener(function (command) {
        console.log(command)
        switch (command) {
            case 'start_tab_video':
                screenshot.videoRecorder.capture({type: 'tab'});
                break;
            case 'start_desktop_video':
                screenshot.videoRecorder.capture({type: 'desktop'});
                break;
            case 'stop_video':
                screenshot.videoRecorder.stopRecord();
                break;
            case 'pause_video':
                screenshot.videoRecorder.pauseRecord();
                break;
        }
    });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // console.log(tabId, changeInfo, tab)

    if (changeInfo.status === "loading" && /nimbus_screnshot_active_tab/.test(tab.url)) {
        chrome.tabs.remove(tabId);
    }

    if (changeInfo.status === "loading" && /nimbusweb\.me\/slack\/\?code/.test(tab.url)) {
        let code = tab.url.match(/code=(.+)&/)[1];
        let client_id = '17258488439.50405596566';
        let client_secret = '55775ecb78fe5cfc10250bd0119e0fc5';
        chrome.tabs.remove(tabId);

        slack_oauth.requestToApi('oauth.access', 'client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code, function (err, oauth) {
            slack_oauth.oauth = oauth;
            localStorage.slackToken = oauth.access_token;
            slack_oauth.sendData();
        })
    }


    if (/*changeInfo.status === "loading" && */ /everhelper\.me\/nimbus-download-image\.html\#access_token/.test(tab.url)) {
        // https://everhelper.me/#access_token=duM7xgibBQ8AAAAAAAAuxY-iIWLrqYvpmUaJa_9lSWGf_IfqBoB0hSE_YwcHIr5a&token_type=bearer&uid=388836341&account_id=dbid%3AAAB1hyx_Sq8YFtoC4c_sl52H8jeu2jNQaLg

        localStorage.access_token_dropbox = tab.url.match(/access_token=([^&]+)/)[1];
        chrome.tabs.remove(tabId);
        chrome.tabs.query({/*active: true, lastFocusedWindow: true*/}, function (tabs) {
            for (let i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id, {action: 'access_dropbox'});
            }
        });
    }
    if (changeInfo.status === "complete" && /*/nimbusweb\.me\/auth\/openidconnect/.test(tab.url) && *//###EVERFAUTH:/.test(tab.title)) {
        // localStorage.numbusSessionId = tab.title.match(/sessionId":"([^"]+)/)[1];

        chrome.tabs.remove(tabId);
        window.setTimeout(function () {
            chrome.tabs.query({/*active: true, lastFocusedWindow: true*/}, function (tabs) {
                for (let i = 0; i < tabs.length; i++) {
                    chrome.tabs.sendMessage(tabs[i].id, {action: 'access_nimbus'});
                }
            });
        }, 300);
    }

    if (changeInfo.status === "complete" && /accounts\.google\.com\/o\/oauth2\/approval/.test(tab.url) && /code=/.test(tab.title) && google_oauth.is_tab) {
        let code = tab.title.match(/.+?code=([\w\/\-]+)/)[1];
        let xhr = new XMLHttpRequest();
        let body = 'code=' + code +
            '&client_id=' + google_oauth.client_id +
            '&client_secret=' + google_oauth.client_secret +
            '&grant_type=authorization_code' +
            '&redirect_uri=urn:ietf:wg:oauth:2.0:oob:auto';
        xhr.open("POST", 'https://www.googleapis.com/oauth2/v4/token', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.readyState !== 4 && xhr.status !== 200) return;
            google_oauth.is_tab = false;
            let response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response.access_token !== undefined && response.refresh_token !== undefined) {
                localStorage.accessTokenGoogle = response.access_token;
                localStorage.refresh_token_google = response.refresh_token;
                localStorage.expires_in_google = Date.now() + +response.expires_in * 1000;

                if (localStorage.appType === 'google') {
                    xhr.open("GET", 'https://nimbusweb.me/auth/openidconnect.php?env=app&provider=google&oauth_email_key=' + response.id_token, true);
                    xhr.send();
                }

                if ((localStorage.quickCapture === 'true' && localStorage.enableEdit === 'google') || (localStorage.quickVideoCapture === 'true' && localStorage.enableVideoEdit === 'google')) {
                    nimbus_core.setActiveTab(JSON.parse(localStorage.pageinfo));
                    nimbus_core.blobUrlToBlob(localStorage.filePatch, screenshot.automatic.send);
                } else {
                    chrome.tabs.query({/*active: true, lastFocusedWindow: true*/}, function (tabs) {
                        for (let i = 0; i < tabs.length; i++) {
                            chrome.tabs.sendMessage(tabs[i].id, {operation: 'access_google'});
                        }
                    });
                }

                chrome.tabs.remove(tabId);
            }
        };
        xhr.onerror = function (err) {
            console.error(err);
        };
        xhr.send(body);
    }
    if (/*changeInfo.status === "complete" && *//accounts\.google\.com\/o\/oauth2\/approval/.test(tab.url) && /code=/.test(tab.title) && window.youtube_oauth.is_tab) {
        let code = tab.title.match(/.+?code=([\w\/\-]+)/)[1];
        let xhr = new XMLHttpRequest();
        let body = 'code=' + code +
            '&client_id=' + window.youtube_oauth.client_id +
            '&client_secret=' + window.youtube_oauth.client_secret +
            '&grant_type=authorization_code' +
            '&redirect_uri=urn:ietf:wg:oauth:2.0:oob:auto';
        xhr.open("POST", 'https://www.googleapis.com/oauth2/v4/token', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.readyState !== 4 && xhr.status !== 200) return;
            window.youtube_oauth.is_tab = false;
            let response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response.access_token !== undefined && response.refresh_token !== undefined) {
                localStorage.access_token_youtube = response.access_token;
                localStorage.refresh_token_youtube = response.refresh_token;
                localStorage.expires_in_youtube = Date.now() + +response.expires_in * 1000;

                chrome.tabs.remove(tabId);

                if ((localStorage.quickVideoCapture === 'true' && localStorage.enableVideoEdit === 'youtube')) {
                    nimbus_core.setActiveTab(JSON.parse(localStorage.pageinfo));
                    nimbus_core.blobUrlToBlob(localStorage.filePatch, screenshot.automatic.send);
                } else {
                    chrome.tabs.query({/*active: true, lastFocusedWindow: true*/}, function (tabs) {
                        for (let i = 0; i < tabs.length; i++) {
                            chrome.tabs.sendMessage(tabs[i].id, {operation: 'access_youtube'});
                        }
                    });
                }
            }
        };
        xhr.onerror = function (err) {
            console.error(err);
        };
        xhr.send(body);
    }
});


// localStorage.clear();

// if (screenshot.id === 'lbabmcgpnjhdnfacpamdelhmboiceohe') {
// localStorage.appType = 'google';
// }
// if (screenshot.id === 'bpconcjcammlapcogcnnelfmaeghhagj') {
localStorage.appType = 'nimbus';
// }

if (localStorage.hotkeys) localStorage.appHotkeys = localStorage.hotkeys;
if (localStorage.mainMenuItem) localStorage.appMenuItem = localStorage.mainMenuItem;
if (localStorage.accountPopup) localStorage.popupAccountShow = localStorage.accountPopup;
if (localStorage.ratePopup) localStorage.popupRate = localStorage.ratePopup;
if (localStorage.micSound) localStorage.videoMicSoundEnable = localStorage.micSound;
if (localStorage.tabSound) localStorage.videoTabSoundEnable = localStorage.tabSound;
if (localStorage.privateUploadVideo) localStorage.videoPrivateUploadEnable = localStorage.privateUploadVideo;
if (localStorage.recordType) localStorage.videoRecordType = localStorage.recordType;
if (localStorage.deawingTools) localStorage.videoDrawingToolsEnable = localStorage.deawingTools;
if (localStorage.depthScreenshot) localStorage.imageDepth = localStorage.depthScreenshot;
if (localStorage.deleteDrawing) localStorage.videoDrawingToolsDelete = localStorage.deleteDrawing;
if (localStorage.format) localStorage.imageFormat = localStorage.format;
if (localStorage.audioBitrate) localStorage.videoAudioBitrate = localStorage.audioBitrate;
if (localStorage.fillColor) localStorage.redactorFillColor = localStorage.fillColor;
if (localStorage.showContentMenu) localStorage.appContentMenuShow = localStorage.showContentMenu;
if (localStorage.autoShortUrl) localStorage.numbusAutoShortUrl = localStorage.autoShortUrl;
if (localStorage.keepOriginalResolution) localStorage.imageOriginalResolution = localStorage.keepOriginalResolution;
if (localStorage.hideFixedElements) localStorage.actionHideFixedElements = localStorage.hideFixedElements;

if (localStorage.appHotkeys) {
    let hotkeys = JSON.parse(localStorage.appHotkeys);
    localStorage.appHotkeys = JSON.stringify({
        tab_video: hotkeys.tab_video || 55,
        desktop_video: hotkeys.desktop_video || 56,
        stop_video: hotkeys.stop_video || 57,
        visible: hotkeys.visible || 49,
        fragment: hotkeys.fragment || 54,
        selected: hotkeys.selected || 50,
        scroll: hotkeys.scroll || 51,
        entire: hotkeys.entire || 52,
        window: hotkeys.window || 53
    });
} else {
    localStorage.appHotkeys = JSON.stringify({
        tab_video: 55,
        desktop_video: 56,
        stop_video: 57,
        visible: 49,
        fragment: 54,
        selected: 50,
        scroll: 51,
        entire: 52,
        window: 53
    });
}

if (localStorage.hotkeysSendNS) {
    let hotkeysSendNS = JSON.parse(localStorage.hotkeysSendNS);
    localStorage.hotkeysSendNS = JSON.stringify({
        key: hotkeysSendNS.key || 13,
        title: hotkeysSendNS.title || 'Enter'
    });
} else {
    localStorage.hotkeysSendNS = JSON.stringify({
        key: 13,
        title: 'Enter'
    });
}

if (!localStorage.appMenuItem) {
    localStorage.appMenuItem = JSON.stringify({
        "entire": true,
        "window": true,
        "selected": true,
        "fragment": true,
        "visible": true,
        "blank": true,
        "delayed": true,
        "scroll": true,
        "video": true
    });
}

localStorage.youtubePlaylist = localStorage.youtubePlaylist || 'no-playlist';
localStorage.popupAccountShow = localStorage.popupAccountShow || 'true';
localStorage.popupRate = localStorage.popupRate || JSON.stringify({show: true, date: Date.now()});
localStorage.videoCamera = localStorage.videoCamera || 'false';
localStorage.videoMicSoundEnable = localStorage.videoMicSoundEnable || 'true';
localStorage.videoTabSoundEnable = localStorage.videoTabSoundEnable || 'false';
localStorage.videoReEncoding = localStorage.videoReEncoding || 'true';
localStorage.videoPrivateUploadEnable = localStorage.videoPrivateUploadEnable || 'false';
localStorage.videoDrawingToolsEnable = localStorage.videoDrawingToolsEnable || 'false';
localStorage.videoRecordType = localStorage.videoRecordType || 'tab';
localStorage.videoSize = localStorage.videoSize || 'auto';
localStorage.videoBitrate = localStorage.videoBitrate || '4000000';
localStorage.videoAudioBitrate = localStorage.videoAudioBitrate || '96000';
localStorage.videoFps = localStorage.videoFps || '24';
localStorage.videoDrawingToolsDelete = localStorage.videoDrawingToolsDelete || '6';
localStorage.videoCountdown = localStorage.videoCountdown || '0';
localStorage.pageinfo = localStorage.pageinfo || JSON.stringify({'url': '', 'title': '', 'time': getTimeStamp()});
localStorage.imageFormat = localStorage.imageFormat || 'png';
localStorage.videoFormat = localStorage.videoFormat || 'webm';
localStorage.imageQuality = localStorage.imageQuality || '92';
localStorage.imageDepth = localStorage.imageDepth || '1';
localStorage.redactorFillColor = localStorage.redactorFillColor || 'rgba(0,0,0,0)';
localStorage.quickCapture = localStorage.quickCapture || 'false';
localStorage.quickCaptureType = localStorage.quickCaptureType || 'visible';
localStorage.quickVideoCapture = localStorage.quickVideoCapture || 'false';
localStorage.quickVideoCaptureType = localStorage.quickVideoCaptureType || 'tab';
localStorage.quickVideoCaptureGithub = localStorage.quickVideoCaptureGithub || 'false';
localStorage.enableEdit = localStorage.enableEdit || 'edit';
localStorage.enableVideoEdit = localStorage.enableVideoEdit || 'done';
localStorage.quickVideoCaptureGithubWelcome = localStorage.quickVideoCaptureGithubWelcome || 'true';
localStorage.quickVideoCaptureGithubCount = localStorage.quickVideoCaptureGithubCount || 0;
localStorage.enableSaveAs = localStorage.enableSaveAs || 'true';
localStorage.saveCropPosition = localStorage.saveCropPosition || 'false';
localStorage.appContentMenuShow = localStorage.appContentMenuShow || 'true';
localStorage.numbusAutoShortUrl = localStorage.numbusAutoShortUrl || 'true';
localStorage.imageOriginalResolution = localStorage.imageOriginalResolution || 'true';
localStorage.actionHideFixedElements = localStorage.actionHideFixedElements || 'false';
localStorage.shareOnGoogle = localStorage.shareOnGoogle || 'true';
localStorage.shareOnYoutube = localStorage.shareOnYoutube || 'public';
localStorage.cropPosition = localStorage.cropPosition || JSON.stringify({"x": 50, "y": 50, "width": 400, "height": 200});
localStorage.cropScrollPosition = localStorage.cropScrollPosition || JSON.stringify({"x": 50, "y": 50, "width": 400, "height": 200});
localStorage.fragmentPosition = localStorage.fragmentPosition || JSON.stringify({"x": 50, "y": 50, "width": 400, "height": 200});
localStorage.fileNamePatternScreenshot = localStorage.fileNamePatternScreenshot || 'screenshot-{domain}-{date}-{time}';
localStorage.fileNamePatternScreencast = localStorage.fileNamePatternScreencast || 'screencast-{domain}-{date}-{time}';
localStorage.actionEntirePageSctollDelay = localStorage.actionEntirePageSctollDelay || 500;
localStorage.redactorStrokeSize = localStorage.redactorStrokeSize || 5;
localStorage.redactorStrokeColor = localStorage.redactorStrokeColor || '#f00';
localStorage.redactorShadow = localStorage.redactorShadow || 'false';
localStorage.redactorShadowBlur = localStorage.redactorShadowBlur || 10;
localStorage.redactorShadowColor = localStorage.redactorShadowColor || 'rgb(0, 0, 0)';
localStorage.redactorFontFamily = localStorage.redactorFontFamily || 'Arial';
localStorage.redactorFontSize = localStorage.redactorFontSize || 35;
localStorage.googleUploadFolder = localStorage.googleUploadFolder || '{"id": "root", "title": "Main folder"}';
localStorage.popupHelperShow = localStorage.popupHelperShow || 'true';
localStorage.nimbusShare = localStorage.nimbusShare || 'false';
localStorage.showInfoPrint = localStorage.showInfoPrint || 'true';
localStorage.redactorEnableNumbers = localStorage.redactorEnableNumbers || 'false';
localStorage.videoEditorTools = localStorage.videoEditorTools || 'cursorRing';
localStorage.videoCameraPosition = localStorage.videoCameraPosition || JSON.stringify({"x": 10, "y": 10});
localStorage.watermarkEnable = localStorage.watermarkEnable || 'false';
localStorage.watermarkFile = localStorage.watermarkFile || '';
localStorage.watermarkType = localStorage.watermarkType || 'image';
localStorage.watermarkPosition = localStorage.watermarkPosition || 'rb';
localStorage.watermarkPercent = localStorage.watermarkPercent || 0.5;
localStorage.watermarkAlpha = localStorage.watermarkAlpha || 1;
localStorage.watermarkFont = localStorage.watermarkFont || 'Times New Roman';
localStorage.watermarkSize = localStorage.watermarkSize || 24;
localStorage.watermarkColor = localStorage.watermarkColor || 'rgb(0, 0, 0, 1)';
localStorage.watermarkText = localStorage.watermarkText || 'Watermark';
localStorage.appShowButtonNew = localStorage.appShowButtonNew || 'true';
localStorage.watermarkEnableTime = localStorage.watermarkEnableTime || 'false';
localStorage.watermarkTime = localStorage.watermarkTime || 30;
localStorage.googleIsPro = localStorage.googleIsPro || 'false';
localStorage.quickVideoStreamMenuEnable = localStorage.quickVideoStreamMenuEnable || 'false';
localStorage.numbusOrganizationSelect = localStorage.numbusOrganizationSelect || 'false';
localStorage.numbusWorkspaceSelect = localStorage.numbusWorkspaceSelect || 'false';

if (window.nimbus_core.is_chrome && localStorage.appGlobalId === undefined) {
    Fingerprint2.getV18({}, function (result, components) {
        localStorage.appGlobalId = result;
    });
} else {
    localStorage.appGlobalId = (function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return S4() + S4() + S4() + S4();
    })();
}

if (window.nimbus_core.is_linux) {
    localStorage.enableSaveAs = 'false';
}

chrome.runtime.setUninstallURL('https://nimbus.everhelper.me/screenshot-uninstall/');

chrome.storage.sync.get('nimbus_screenshot_first_install', function (data) {
    localStorage.appFirstInstall = data.nimbus_screenshot_first_install;
    if (!data.nimbus_screenshot_first_install) {
        chrome.storage.sync.set({'nimbus_screenshot_first_install': true}, function () {
            if (localStorage.appType !== 'google') {
                screenshot.openPage('https://nimbusweb.me/capture-install/install.php');
            } else {
                if (window.navigator.language === 'ru') {
                    screenshot.openPage('https://nimbusweb.me/capture-install/install-nimbus-google-drive-ru.php');
                } else {
                    screenshot.openPage('https://nimbusweb.me/capture-install/install-nimbus-google-drive.php');
                }
            }
        });
    }
});

if (localStorage.appVersion === undefined) {
    localStorage.appVersion = manifest.version;
    localStorage.googleIsPro = 'true';
}
if (localStorage.appVersion !== manifest.version && localStorage.appShowButtonNew === 'true' && localStorage.appType !== 'google') {
    iconService.setUpdate();

    chrome.browserAction.onClicked.addListener(function () {
        localStorage.appVersion = manifest.version;
        iconService.setDefault();
        chrome.tabs.create({url: 'https://nimbusweb.me/capture-install/releasecapture' + (navigator.language === 'ru' ? 'ru' : '') + (window.nimbus_core.is_firefox ? '-ff' : '') + '.php', active: true});
    });
}

window.google_oauth = {
    client_id: "330587763390.apps.googleusercontent.com",
    client_secret: "Wh5_rPxGej6B7qmsVxvGolg8",
    scopes: "https://www.googleapis.com/auth/drive.readonly.metadata https://www.googleapis.com/auth/drive.file",
    is_tab: false,
    login: function () {
        let url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
            '&client_id=' + google_oauth.client_id +
            '&redirect_uri=urn:ietf:wg:oauth:2.0:oob:auto' +
            '&scope=' + google_oauth.scopes +
            '&access_type=offline' +
            '&response_type=code';
        google_oauth.is_tab = true;
        chrome.tabs.create({url: url});
    },
    refreshToken: function () {
        if (localStorage.refresh_token_google === undefined) {
            this.login();
        } else {
            if (Date.now() < (+localStorage.expires_in_google || 0)) {
                chrome.tabs.query({/*active: true, lastFocusedWindow: true*/}, function (tabs) {
                    for (let i = 0; i < tabs.length; i++) {
                        chrome.tabs.sendMessage(tabs[i].id, {operation: 'access_google'});
                    }
                });
            } else {
                let xhr = new XMLHttpRequest();
                let body = 'refresh_token=' + localStorage.refresh_token_google +
                    '&client_id=' + google_oauth.client_id +
                    '&client_secret=' + google_oauth.client_secret +
                    '&grant_type=refresh_token';

                xhr.open("POST", 'https://www.googleapis.com/oauth2/v4/token', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onload = function () {
                    if (xhr.readyState !== 4 && xhr.status !== 200) return;

                    let response = JSON.parse(xhr.responseText);

                    localStorage.accessTokenGoogle = response.access_token;
                    localStorage.refresh_token_google = response.refresh_token;
                    localStorage.expires_in_google = Date.now() + +response.expires_in;

                    chrome.tabs.query({/*active: true, lastFocusedWindow: true*/}, function (tabs) {
                        for (let i = 0; i < tabs.length; i++) {
                            chrome.tabs.sendMessage(tabs[i].id, {operation: 'access_google'});
                        }
                    });
                };
                xhr.onerror = function (err) {
                    console.error(err);
                };
                xhr.send(body);
            }
        }
    }
};

if (localStorage.appType === 'google') {
    window.google_oauth.scopes = "openid email https://www.googleapis.com/auth/drive.readonly.metadata https://www.googleapis.com/auth/drive.file";
}

window.youtube_oauth = {
    client_id: "330587763390.apps.googleusercontent.com",
    client_secret: "Wh5_rPxGej6B7qmsVxvGolg8",
    scopes: "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtubepartner",
    is_tab: false,
    login: function () {
        let url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
            '&client_id=' + window.youtube_oauth.client_id +
            '&redirect_uri=urn:ietf:wg:oauth:2.0:oob:auto' +
            '&scope=' + window.youtube_oauth.scopes +
            '&access_type=offline' +
            '&response_type=code';
        window.youtube_oauth.is_tab = true;
        chrome.tabs.create({url: url});
    },
    refreshToken: function () {
        if (localStorage.refresh_token_youtube === undefined) {
            this.login();
        } else {
            if (Date.now() < (+localStorage.expires_in_youtube || 0)) {
                chrome.tabs.query({/*active: true, lastFocusedWindow: true*/}, function (tabs) {
                    for (let i = 0; i < tabs.length; i++) {
                        chrome.tabs.sendMessage(tabs[i].id, {operation: 'access_youtube'});
                    }
                });
            } else {
                let xhr = new XMLHttpRequest();
                let body = 'refresh_token=' + localStorage.refresh_token_youtube +
                    '&client_id=' + window.youtube_oauth.client_id +
                    '&client_secret=' + window.youtube_oauth.client_secret +
                    '&grant_type=refresh_token';

                xhr.open("POST", 'https://www.googleapis.com/oauth2/v4/token', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onload = function () {
                    if (xhr.readyState !== 4 && xhr.status !== 200) return;

                    let response = JSON.parse(xhr.responseText);
                    localStorage.access_token_youtube = response.access_token;
                    localStorage.refresh_token_youtube = response.refresh_token;
                    localStorage.expires_in_youtube = Date.now() + +response.expires_in;

                    chrome.tabs.query({/*active: true, lastFocusedWindow: true*/}, function (tabs) {
                        for (let i = 0; i < tabs.length; i++) {
                            chrome.tabs.sendMessage(tabs[i].id, {operation: 'access_youtube'});
                        }
                    });

                };
                xhr.onerror = function (err) {
                    console.error(err);
                };
                xhr.send(body);
            }
        }
    }
};

window.slack_oauth = {
    oauth: null,
    login: function () {
        screenshot.openPage('https://slack.com/oauth/authorize?client_id=17258488439.50405596566&scope=files:write:user,channels:read,users:read');
    },
    requestToApi: function (action, param, cb) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                cb && cb(null, res)
            } else {
                cb && cb(true, null)
            }
        };
        xhr.onerror = function (err) {
            console.error(err, null);
        };
        xhr.open('GET', 'https://slack.com/api/' + action + '?' + param, true);
        xhr.send();
    },
    sendData: function () {
        if (localStorage.slackToken) {
            slack_oauth.requestToApi('channels.list', 'token=' + localStorage.slackToken, function (err, channels) {
                slack_oauth.requestToApi('users.list', 'token=' + localStorage.slackToken, function (err, users) {
                    chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
                        let tab = tabs[0];
                        chrome.tabs.sendMessage(tab.id, {
                            action: 'slack_auth',
                            oauth: slack_oauth.oauth,
                            channels: channels.channels,
                            users: users.members,
                            settings: {
                                panel: localStorage.slackPanel === 'true'
                            }
                        });
                    });
                })
            })
        }
    }
};