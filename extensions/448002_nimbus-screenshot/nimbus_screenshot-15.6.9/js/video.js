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
'use strict';

var isLog = true;

if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
    MediaStream.prototype.stop = function () {
        this.getAudioTracks().forEach(function (track) {
            track.stop();
            track.dispatchEvent(new Event("ended"));
        });

        this.getVideoTracks().forEach(function (track) {
            track.stop();
            track.dispatchEvent(new Event("ended"));
        });
    };
}

if (typeof AudioContext !== 'undefined') {
    Storage.AudioContext = AudioContext;
} else if (typeof webkitAudioContext !== 'undefined') {
    Storage.AudioContext = webkitAudioContext;
}

iconService.setDefault();

var videoRecorder = (function () {
    let recorder = null;
    let socket = null;
    let user = {
        premium: null,
        notes: {
            current: 0,
            max: 0,
            max_size: 0
        }
    };

    let typeCaptureStream, typeCapture, videoTabSoundEnable, videoMicSoundEnable, videoCamera, videoDrawingToolsEnable, videoSize, videoAudioBitrate, videoBitrate, videoFps, audioPlayer, videoStream, micStream;
    let countdown = 0;

    let timer = null;
    let activeTab = null;

    let isRecording = false;
    let timeStart = null;
    let timePause = null;

    function isMediaAccess(cb) {
        window.navigator.getUserMedia({video: true, audio: true}, function (stream) {
                stream.stop();
                console.log('isMediaAccess', true)
                cb && cb(true)
            },
            function () {
                console.log('isMediaAccess', false)
                cb && cb(false)
            });
    }

    function mediaAccess(data) {
        capture({
            type: data.typeCapture,
            media_access: true
        });
    }

    function notesCreate(data) {
        if (isLog) console.log('notesCreate');
        let info = JSON.parse(localStorage.pageinfo);

        if (localStorage.numbusWorkspaceSelect === 'false') {
            nimbusShare.server.workspaces.getAll(null, function (err, res) {
                for (let i = 0, len = res.body.workspaces.length; len > i; i++) {
                    let workspace = res.body.workspaces[i];
                    if (workspace.isDefault) {
                        localStorage.numbusWorkspaceSelect = workspace.globalId;
                        notesCreate(data);
                        break;
                    }
                }
            });
            return;
        }

        nimbusShare.send({
            "action": "screencasts:save",
            "features": {
                "noteEditor": true
            },
            "body": {
                "workspaceId": localStorage.numbusWorkspaceSelect,
                "screen": {
                    "title": data.filename,
                    "tempname": data.name,
                    "parent_id": nimbusShare.getUploadFolder().id,
                    "url": window.nimbus_core.is_chrome ? info.url : '',
                    'isStreaming': true
                },
                "share": localStorage.videoPrivateUploadEnable !== 'true'
            },
            "_client_software": nimbusShare.client_software

        }, function (msg) {
            iconService.setDefault();
            nimbus_core.sendAllMessage({operation: 'content_automation_status_upload_end'});

            let url = '';
            if (msg.body.location) url = msg.body.location;
            else url = 'https://nimbusweb.me/ws/' + localStorage.workspaceSelect + '/recent/note/' + msg.body.global_id;

            screenshot.openPage(url);
            window.nimbus_core.copyTextToClipboard(url);

            if (!user.premium && localStorage.streamLimitTime === 'true') {
                localStorage.streamLimitTime = false;
                window.setTimeout(function () {
                    screenshot.insertPopup('nsc_popup_limittime_stream_open');
                }, 1000)
            }
        });
    }

    function createSocket(cb) {
        socket = new WebSocket('wss://stream-uploading.nimbusweb.me');

        socket.onopen = function () {
            if (isLog) console.log('notesCreate');
            console.info("Connected to server ...");
        };

        socket.onmessage = function (event) {
            let msg = JSON.parse(event.data);

            switch (msg.event) {
                case "reject":
                    if (isLog) console.error('socket reject', msg);
                    break;
                case "ready":
                    if (isLog) console.info('socket ready');
                    cb && cb();
                    break;
                case "progress":
                    if (isLog) console.info('socket progress', msg);
                    break;
                case "response":
                    if (isLog) console.info('Response', msg.data);
                    notesCreate(msg.data);
                    break;
            }
        };

        socket.onclose = function (event) {
            if (isLog) console.info('socket onclose', event);
            if (getState() !== 'inactive') stopRecord();
        };

        socket.onerror = function (error) {
            if (isLog) console.error("socket error", error);
            if (getState() !== 'inactive') stopRecord();
        };
    }

    function createMediaRecorder(video) {
        let option = {
            disableLogs: false,
            type: 'video',
            mimeType: 'video/webm\;codecs=vp8',
            audioBitsPerSecond: +localStorage.videoAudioBitrate,
            videoBitsPerSecond: +localStorage.videoBitrate
        };

        if (typeCaptureStream) {
            socket.send(JSON.stringify({
                event: 'meta',
                name: window.nimbus_core.getVideoFileName(JSON.parse(localStorage.pageinfo), 'webm'),
                type: 'video/webm'
            }));

            option.timeSlice = 1000;
            option.ondataavailable = function (blob) {
                if (isLog) console.log('RecordRTC ondataavailable', blob);
                if (!user.premium && Date.now() - timeStart > 60000 * 5) {
                    localStorage.streamLimitTime = true;
                    return stopRecord();
                } else {
                    socket.send(blob)
                }
                // file.chunks.push(blob);
            };
        }

        recorder = RecordRTC(video, option);
    }

    function preRecord(streamVideo) {
        if (isLog) console.log('preRecord', streamVideo, 'videoMicSoundEnable', videoMicSoundEnable);
        if (chrome.runtime.lastError) {
            if (/activeTab/.test(chrome.runtime.lastError.message)) {
                isRecording = false;
                alert(chrome.i18n.getMessage('notificationErrorActiveTab'));
            }
        } else {
            videoStream = streamVideo;

            if (typeCapture === 'tab') {
                injectionVideoPanel();
                injectionWatermarkVideo();
            }

            if (typeCapture === 'tab' || typeCapture === 'camera') {
                injectionWebCamera();

                if (videoTabSoundEnable) {
                    audioPlayer = new Audio();
                    audioPlayer.srcObject = videoStream;
                    audioPlayer.volume = 1;
                    audioPlayer.play();
                }
            }

            if (videoMicSoundEnable) {
                const constraints = {audio: {deviceId: localStorage.selectedMicrophone ? {exact: localStorage.selectedMicrophone} : undefined}};
                window.navigator.getUserMedia(constraints, function (streamAudio) {
                    micStream = streamAudio;
                    startRecord(videoStream, streamAudio);
                }, function (err) {
                    console.error('not access mic', err);
                    startRecord(videoStream);
                })
            } else {
                startRecord(videoStream);
            }
        }
    }

    function startRecord(video, mic) {
        if (isLog) console.log('startRecord', arguments);

        if (mic) {
            let finalStream = new MediaStream();
            let mixedAudioStream = getMixedAudioStream([mic, video]);

            mixedAudioStream.getAudioTracks().forEach(function (audioTrack) {
                finalStream.addTrack(audioTrack);
            });

            video.getVideoTracks().forEach(function (videoTrack) {
                finalStream.addTrack(videoTrack);
            });

            video = finalStream;
        }

        video.onended = function () {
            console.info("screen videoStream stopped externally");
            stopRecord();
        };
        video.getVideoTracks()[0].onended = function () {
            video && video.onended && video.onended()
        };

        screenshot.setPageInfo(function () {
            if (typeCaptureStream) {
                createSocket(function () {
                    createMediaRecorder(video);
                    recorder.startRecording();
                });
            } else {
                createMediaRecorder(video);
                recorder.startRecording();
            }
        }, typeCapture);
        timeStart = Date.now();

        if (typeCaptureStream) iconService.setLoading();
        else iconService.setRec();

        chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {operation: 'status_video', type: typeCapture, status: getStatus(), state: getState()});
        });
    }

    function stopRecord() {
        if (isLog) console.log('stopRecord', videoStream, recorder);

        if (!isRecording) return false;

        if (typeCapture === 'tab' || typeCapture === 'camera') {
            nimbus_core.setActiveTab(activeTab);
        }

        if (screenshot.automatic.data.site) {
            nimbus_core.setActiveTab(activeTab);
        }

        isRecording = false;

        window.setTimeout(function () {
            recorder.stopRecording(function () {
                try {
                    videoStream && videoStream.active && videoStream.stop();
                    micStream && micStream.active && micStream.stop();
                } catch (e) {
                    console.log(e)
                }

                if (timer) {
                    clearInterval(timer);
                    countdown = 0;
                    timer = null;
                }

                audioPlayer = undefined;
                videoStream = null;
                micStream = null;
                timeStart = null;
                timePause = null;
                activeTab = null;
                screenshot.changeVideoButton();

                chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {operation: 'status_video', type: typeCapture, status: getStatus(), state: getState()});
                });

                let blob = recorder.getBlob();
                if (typeCaptureStream) {
                    // let blob = new Blob(file.chunks, {'type': file.mimeType});
                    if (blob.size > user.notes.max_size || user.notes.current + blob.size > user.notes.max) {
                        iconService.setDefault();
                        sendPage(blob)
                    } else {
                        nimbus_core.sendMessage({operation: 'content_automation_status_upload_stream'});
                        socket.send(JSON.stringify({event: 'finish'}));
                    }
                } else {
                    iconService.setDefault();
                    sendPage(blob)
                }
                // file.chunks = [];
            })
        }, 1000);
    }

    function pauseRecord() {
        if(!getStatus()) return false;

        if (isLog) console.log('pauseRecord');

        if (recorder.state === 'recording') {
            timePause = Date.now();
            recorder.pauseRecording();
            iconService.setPause();
        } else {
            timePause = null;
            recorder.resumeRecording();
            iconService.setRec();
        }
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {operation: 'status_video', type: typeCapture, status: getStatus(), state: getState()});
        });
    }

    function getState() {
        return (recorder && recorder.state);
    }

    function getStatus() {
        return timer || (videoStream && !!videoStream.active);
    }

    function countdownRun(cb) {
        (function () {
            function time() {
                if (countdown > 0) {
                    iconService.showBadge(countdown);
                    countdown--;
                    timer = setTimeout(time, 1000);
                } else {
                    iconService.setDefault();
                    timer = null;
                    cb && cb();
                }
            }

            time();
        })()
    }

    function captureTab() {
        if (isLog) console.log('captureTab', arguments);

        chrome.tabCapture.capture({
            audio: videoTabSoundEnable,
            video: true,
            videoConstraints: {
                mandatory: {
                    chromeMediaSource: 'tab',
                    maxFrameRate: videoFps,
                    maxWidth: typeof videoSize !== 'object' ? activeTab.width : videoSize.width,
                    maxHeight: typeof videoSize !== 'object' ? activeTab.height : videoSize.height
                }
            }
        }, preRecord);
    }

    function captureCamera() {
        if (isLog) console.log('captureCamera', arguments);
        window.navigator.getUserMedia({
            video: {
                width: 1280,
                height: 720,
                deviceId: localStorage.selectedVideoCamera ? {exact: localStorage.selectedVideoCamera} : undefined
            }
        }, preRecord, console.log);
    }

    function captureDesktop() {
        if (isLog) console.log('captureDesktop', arguments);
        chrome.desktopCapture.chooseDesktopMedia(["screen", "window", "tab", "audio"], function (streamId, option) {
            if (!streamId) {
                isRecording = false;
            } else {
                let constraints = {
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: streamId,
                            maxFrameRate: videoFps,
                            maxWidth: typeof videoSize !== 'object' ? window.screen.width : videoSize.width,
                            maxHeight: typeof videoSize !== 'object' ? window.screen.height : videoSize.height
                        }
                    }
                };

                if (option.canRequestAudioTrack) {
                    constraints.audio = {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: streamId
                        }
                    }
                }
                countdownRun(function () {
                    window.navigator.getUserMedia(constraints, preRecord, console.error);
                })
            }
        });
    }

    function capture(param) {
        if (isLog) console.log('capture', arguments);
        if (isRecording) return;
        isRecording = true;

        localStorage.typeVideoCapture = typeCapture = param.type || 'tab';
        typeCaptureStream = localStorage.typeCaptureStream === 'true';
        countdown = +localStorage.videoCountdown;
        videoCamera = localStorage.videoCamera === 'true';
        videoMicSoundEnable = localStorage.videoMicSoundEnable === 'true';
        videoTabSoundEnable = localStorage.videoTabSoundEnable === 'true';
        videoDrawingToolsEnable = localStorage.videoDrawingToolsEnable === 'true';
        videoSize = localStorage.videoSize === 'auto';
        videoAudioBitrate = +localStorage.videoAudioBitrate;
        videoBitrate = +localStorage.videoBitrate;
        videoFps = +localStorage.videoFps;

        if (typeCaptureStream && !param.auth && !param.media_access) {
            isRecording = false;
            nimbusShare.server.user.authState(function (res) {
                console.log('authState', res);

                if (res.errorCode === 0 && res.body && res.body.authorized) {
                    nimbusShare.server.user.info(function (info) {
                        console.log('user info', info);
                        if (info.errorCode !== 0) return;

                        user.premium = !!info.body.premium.active;
                        user.notes.current = +info.body.usage.notes.current;
                        user.notes.max = +info.body.usage.notes.max;
                        user.notes.max_size = +info.body.limits.NOTES_MAX_ATTACHMENT_SIZE;

                        if (localStorage.streamMonthStart === undefined) localStorage.streamDataStart = new Date().getMonth();
                        if (localStorage.streamCountStart === undefined) localStorage.streamDataStart = 0;

                        if (+localStorage.streamMonthStart !== new Date().getMonth()) localStorage.streamCountStart = 0;

                        if (!user.premium && +localStorage.streamCountStart > 60) {
                            screenshot.insertPopup('nsc_popup_limitmonth_stream_open');
                        } else {
                            localStorage.streamCountStart = +localStorage.streamCountStart + 1;
                            capture({type: typeCapture, auth: true});
                        }
                    });
                } else {
                    screenshot.insertPopup('nsc_popup_login_open');
                }
            });
            return;
        }

        if (typeCaptureStream) {
            videoSize = 'hd';
            videoAudioBitrate = 32000;
            videoBitrate = 1000000;
            videoFps = 24;
        }

        switch (localStorage.videoSize) {
            case '4k':
                videoSize = {
                    width: 3840,
                    height: 2160
                };
                break;
            case 'full-hd':
                videoSize = {
                    width: 1920,
                    height: 1080
                };
                break;
            case 'hd':
                videoSize = {
                    width: 1280,
                    height: 720
                };
                break;
        }

        if (typeCapture === 'desktop' && typeCapture === 'camera') {
            videoTabSoundEnable = false;
            videoDrawingToolsEnable = false;
            videoCamera = false;
        }

        if (isLog) console.log('typeCapture', typeCapture, 'videoTabSoundEnable', videoTabSoundEnable, 'videoMicSoundEnable', videoMicSoundEnable, 'videoCamera', videoCamera, 'videoDrawingToolsEnable', videoDrawingToolsEnable, 'typeCaptureStream', localStorage.typeCaptureStream);

        if (typeCapture === 'tab' || typeCapture === 'camera') {
            chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
                if (!activeTab && (!tabs.length || /^chrome/.test(tabs[0].url))) {
                    isRecording = false;
                    alert(chrome.i18n.getMessage('notificationErrorChromeTab'));
                } else {
                    if (!activeTab) activeTab = tabs[0];
                    if ((videoMicSoundEnable || videoCamera || typeCapture === 'camera') && !param.media_access) {
                        isRecording = false;
                        let constraints = {};
                        if (videoMicSoundEnable) constraints.audio = {deviceId: localStorage.selectedMicrophone ? {exact: localStorage.selectedMicrophone} : undefined};
                        if (videoCamera || typeCapture === 'camera') constraints.video = {deviceId: localStorage.selectedVideoCamera ? {exact: localStorage.selectedVideoCamera} : undefined};

                        if (isLog) console.log('getUserMedia constraints', constraints);

                        window.navigator.getUserMedia(constraints, function (stream) {
                            stream.stop();
                            capture({type: typeCapture, media_access: true});
                        }, function () {
                            if (videoMicSoundEnable && (videoCamera || typeCapture === 'camera')) {
                                chrome.tabs.create({url: 'media_access/camera_and_mic.html?' + typeCapture});
                            } else if (videoCamera || typeCapture === 'camera') {
                                chrome.tabs.create({url: 'media_access/camera.html?' + typeCapture});
                            } else {
                                chrome.tabs.create({url: 'media_access/mic.html?' + typeCapture});
                            }
                        });
                    } else if (countdown > 0 && !param.not_timer) {
                        isRecording = false;
                        chrome.tabs.update(activeTab.id, {active: true}, function () {
                            timerContent.set(countdown, typeCapture)
                        });
                    } else {
                        if (typeCapture === 'tab') {
                            chrome.tabs.update(activeTab.id, {active: true}, captureTab)
                        } else {
                            chrome.tabs.update(activeTab.id, {active: true}, captureCamera)
                        }
                    }
                }
            });
        } else {
            chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
                if (!activeTab && !tabs.length) {
                    isRecording = false;
                    alert(chrome.i18n.getMessage('notificationErrorChromeTab'));
                } else {
                    if (!activeTab) activeTab = tabs[0];
                    if (videoMicSoundEnable && param.media_access === undefined) {
                        isRecording = false;
                        let constraints = {};
                        if (videoMicSoundEnable) constraints.audio = {deviceId: localStorage.selectedMicrophone ? {exact: localStorage.selectedMicrophone} : undefined};
                        if (isLog) console.log('getUserMedia constraints', constraints);
                        window.navigator.getUserMedia(constraints, function (stream) {
                            stream.stop();
                            capture({type: typeCapture, media_access: true});
                        }, function () {
                            chrome.tabs.create({url: 'media_access/mic.html?' + typeCapture});
                        });
                    } else {
                        captureDesktop();
                    }
                }
            });
        }
    }

    function sendPage(blob) {
        window.requestFileSystem(window.PERSISTENT, 10 * 1024 * 1024 * 1024, function (fs) {
            console.log(1111111111111111, fs)
                let truncated = false;
                fs.root.getFile('video.' + localStorage.videoFormat, {create: true, exclusive: false}, function (fileEntry) {
                    fileEntry.createWriter(function (writer) {
                            writer.onwriteend = function (progress) {
                                if (!truncated) {
                                    truncated = true;
                                    this.truncate(this.position);
                                    return;
                                }
                                console.log("Write completed", blob, progress);

                                if (localStorage.quickVideoCapture !== 'false' && screenshot.automatic.data.site !== 'github') {
                                    switch (localStorage.enableVideoEdit) {
                                        case 'nimbus':
                                        case 'google':
                                        case 'youtube':
                                        case 'quick':
                                            screenshot.automatic.send(blob);
                                            break;
                                        default:
                                            screenshot.createEditPage('video');
                                            break;
                                    }
                                } else if (localStorage.quickVideoCaptureGithub !== 'false' && screenshot.automatic.data.site === 'github') {
                                    screenshot.automatic.send(blob);
                                } else {
                                    screenshot.createEditPage('video');
                                }
                            };
                            writer.onerror = function (err) {
                                console.error("Write failed", err);
                            };
                            writer.write(blob);

                        }, function (err) {
                            console.error("Create Writer failed", err);
                        }
                    );
                }, function (err) {
                    console.error("Get File failed", err);
                });
            },
            function (err) {
                console.error("File System failed", err);
            }
        );
    }

    function getMixedAudioStream(arrayOfAudioStreams) {
        let audioContext = new AudioContext();

        let audioSources = [];

        let gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = 0;

        let audioTracksLength = 0;
        arrayOfAudioStreams.forEach(function (stream) {
            if (!stream.getAudioTracks().length) {
                return;
            }

            audioTracksLength++;

            let audioSource = audioContext.createMediaStreamSource(stream);
            audioSource.connect(gainNode);
            audioSources.push(audioSource);
        });

        if (!audioTracksLength) {
            return;
        }

        let audioDestination = audioContext.createMediaStreamDestination();
        audioSources.forEach(function (audioSource) {
            audioSource.connect(audioDestination);
        });
        return audioDestination.stream;
    }

    function getTimeRecord() {
        const date = Date.now();
        timeStart = timeStart + (timePause ? date - timePause : 0);
        timePause = timePause ? date : null;
        return timeStart ? (date - timeStart) : 0;
    }

    function injectionVideoPanel(id) {
        if (isLog) console.log('injectionVideoPanel', id, activeTab);
        if (!id && !activeTab) return;

        chrome.tabs.sendMessage(id || activeTab.id, {operation: 'video_panel_show', videoDrawingToolsEnable: videoDrawingToolsEnable, videoDrawingToolsDelete: +localStorage.videoDrawingToolsDelete, videoEditorTools: localStorage.videoEditorTools});
    }

    function injectionWebCamera(id) {
        if (isLog) console.log('injectionWebCamera', id, activeTab);
        if (!id && !activeTab) return;

        chrome.tabs.sendMessage(id || activeTab.id, {operation: 'content_camera_show', videoCameraPosition: localStorage.videoCameraPosition, selectedVideoCamera: localStorage.selectedVideoCamera, typeCapture: typeCapture, videoCamera: videoCamera});
    }

    function injectionWatermarkVideo(id) {
        if (isLog) console.log('injectionWatermarkVideo', id, activeTab);
        if (!id && !activeTab) return;

        let checkAndSend = function () {
            nimbus_core.checkWaterMark(function (check) {
                if (check) {
                    nimbus_core.getWaterMark();

                    window.setTimeout(function () {
                        nimbus_core.getWaterMark(function (watermark) {
                            nimbus_core.sendMessage({
                                operation: 'set_watermark_video',
                                dataUrl: watermark.toDataURL(),
                                position: localStorage.watermarkPosition,
                                watermarkEnableTime: localStorage.watermarkEnableTime === 'true',
                                watermarkTime: localStorage.watermarkTime
                            })
                        })
                    }, 0);
                }
            })
        };
        chrome.tabs.executeScript(id || activeTab.id, {file: "js/lib/jquery-3.3.1.js"}, function () {
            chrome.tabs.executeScript(id || activeTab.id, {file: "js/content-watermark.js"}, checkAndSend);
        });
    }

    chrome.tabs.onUpdated.addListener(function (tabId, info) {
        chrome.tabs.get(tabId, function (tab) {
            if (info.status === "complete" && activeTab && activeTab.id === tabId && !/^chrome/.test(tab.url)) {
                injectionVideoPanel(tabId);
                injectionWebCamera(tabId);
                injectionWatermarkVideo(tabId);
            }
        });
    });

    chrome.tabs.onRemoved.addListener(function (tabId, info) {
        if (activeTab && activeTab.id === tabId) {
            stopRecord();
        }
    });

    return {
        capture: capture,
        captureTab: captureTab,
        captureDesktop: captureDesktop,
        stopRecord: stopRecord,
        pauseRecord: pauseRecord,
        getStatus: getStatus,
        getState: getState,
        getTimeRecord: getTimeRecord,
        mediaAccess: mediaAccess,
        isMediaAccess: isMediaAccess
    }
})
();