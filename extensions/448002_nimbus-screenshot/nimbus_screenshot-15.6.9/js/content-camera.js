(function () {
    if (window.__nscContentScriptVideoCamera) return;
    window.__nscContentScriptVideoCamera = true;

    // console.log('start content camera');

    let videoCameraX = 0;
    let videoCameraY = 0;
    let videoCameraXFull = 0;
    let videoCameraYFull = 0;
    let videoCameraMove = false;
    let videoCameraShiftX = 0;
    let videoCameraShiftY = 0;
    let videoCameraW = 0;
    let videoCameraH = 0;
    let videoTypeCapture = '';
    let videoSelectedCamera = false;
    let videoCameraIs = false;

    let $content_camera, $content_camera_container, $camera_collapse, $camera_expand, $camera_close;

    let nsc_content_camera = {
        init_finish: false,
        view_start: false,
        init: function () {
            $.get(chrome.runtime.getURL('template/panel-video-camera.html'), function (data) {
                $('body').append(data);
                $content_camera = $('.nsc-content-camera');
                $content_camera_container = $('.nsc-content-camera-container');
                $camera_collapse = $('#nsc_video_camera_collapse');
                $camera_expand = $('#nsc_video_camera_expand');
                $camera_close = $('#nsc_video_camera_close');

                $camera_collapse.on('click', nsc_content_camera.miniCamera);
                $camera_expand.on('click', nsc_content_camera.fullCamera);
                $camera_close.on('click', nsc_content_camera.hideCamera);
                window.addEventListener('message', nsc_content_camera.messageFrame, false);
                nsc_content_camera.init_finish = true;
                if (nsc_content_camera.view_start) this.viewCamera();
            })
        },
        activate: function (option) {
            // console.log('activate', option);
            videoCameraX = option.videoCameraPosition.x;
            videoCameraY = option.videoCameraPosition.y;
            videoSelectedCamera = option.selectedVideoCamera;
            videoTypeCapture = option.typeCapture;
            videoCameraIs = option.videoCamera;

            if (videoCameraIs || videoTypeCapture === 'camera') this.viewCamera();
        },
        viewCamera: function () {
            if (!nsc_content_camera.init_finish) {
                nsc_content_camera.view_start = true;
                return;
            }
            if ($content_camera_container.find('iframe').length) return;

            let $iframe = $('<iframe>')
                .attr('allow', 'camera; microphone;')
                .attr('src', chrome.runtime.getURL('template/frame-video-camera.html?' + location.origin + '') + (videoSelectedCamera ? '&' + videoSelectedCamera : ''));

            $content_camera_container.prepend($iframe);
            $content_camera.removeClass('nsc-hide').css({top: videoCameraY, left: videoCameraX});

            $content_camera
                .on('mousedown', nsc_content_camera.startMove)
                .on('mouseup', nsc_content_camera.endMove);

            $(window)
                .on('mousemove', nsc_content_camera.move)
                .on('mouseup', nsc_content_camera.endMove);
        },
        hideCamera: function () {
            if (!$content_camera_container.find('iframe').length) return;

            $content_camera.addClass('nsc-hide');
            $content_camera.find('iframe').remove();

            $content_camera
                .off('mousedown', nsc_content_camera.startMove)
                .off('mouseup', nsc_content_camera.endMove);

            $(window)
                .off('mousemove', nsc_content_camera.move)
                .off('mouseup', nsc_content_camera.endMove);
        },
        miniCamera: function () {
            $content_camera.removeClass('full').css({top: videoCameraY, left: videoCameraX}).find('iframe').css({width: 300, height: 300 / (videoCameraW / videoCameraH)});

            $camera_collapse.hide();
            $camera_expand.show();
        },
        fullCamera: function () {
            $content_camera.addClass('full').css({top: 10, left: 10});

            let width = $(window).width() - 40;
            let height = $(window).height() - 40;

            if (width / (videoCameraW / videoCameraH) > height) {
                $content_camera.find('iframe').css({width: height * (videoCameraW / videoCameraH), height: height});
            } else {
                $content_camera.find('iframe').css({width: width, height: height});
            }

            $camera_collapse.show();
            $camera_expand.hide();
        },
        move: function (e) {
            // e.preventDefault();

            if (videoCameraMove) {
                let pageX = event.pageX - videoCameraShiftX;
                let pageY = event.pageY - videoCameraShiftY;
                videoCameraShiftX = event.pageX;
                videoCameraShiftY = event.pageY;

                if ($content_camera.hasClass('full')) {
                    pageX = videoCameraXFull = pageX + videoCameraXFull > 0 ? pageX + videoCameraXFull : 0;
                    pageY = videoCameraYFull = pageY + videoCameraYFull > 0 ? pageY + videoCameraYFull : 0;
                } else {
                    pageX = videoCameraX = pageX + videoCameraX > 0 ? pageX + videoCameraX : 0;
                    pageY = videoCameraY = pageY + videoCameraY > 0 ? pageY + videoCameraY : 0;
                }

                let pageLeft = 10;
                let pageTop = 10;
                let pageRight = $(window).width() - $content_camera.width() - 10;
                let pageBottom = $(window).height() - $content_camera.height() - 10;

                if (pageX < pageLeft) pageX = 10;
                if (pageY < pageTop) pageY = 10;
                if (pageX > pageRight) pageX = pageRight;
                if (pageY > pageBottom) pageY = pageBottom;

                $content_camera.css({top: pageY, left: pageX});
            }
        },
        startMove: function (e) {
            e.preventDefault();

            videoCameraMove = true;
            videoCameraShiftX = event.pageX;
            videoCameraShiftY = event.pageY;
            $content_camera.addClass('nsc-move');
        },
        endMove: function (e) {
            // e.preventDefault();

            videoCameraMove = false;
            if ($content_camera.hasClass('full')) return;

            chrome.runtime.sendMessage({
                operation: "save_position_video_camera",
                position: {x: videoCameraX, y: videoCameraY}
            });
            $content_camera.removeClass('nsc-move');
        },
        messageFrame: function (e) {
            if (e.data.message && e.data.message.hide) {
                $content_camera.addClass('nsc-hide');
                return
            }

            videoCameraW = (e.data.message && e.data.message.w) ? e.data.message.w : 720;
            videoCameraH = (e.data.message && e.data.message.h) ? e.data.message.h : 360;

            $content_camera.find('iframe').css({opacity: 1});

            if (videoTypeCapture === 'camera') {
                nsc_content_camera.fullCamera()
            } else {
                nsc_content_camera.miniCamera()
            }
        }
    };

    nsc_content_camera.init();

    chrome.runtime.onMessage.addListener(function (req) {
        if (req.operation === 'content_camera_show') {
            nsc_content_camera.activate(req)
        }
        if (req.operation === 'status_video' && !req.status) {
            nsc_content_camera.hideCamera()
        }
        if (req.operation === 'web_camera_toggle') {
            if ($content_camera.hasClass('nsc-hide')) {
                nsc_content_camera.viewCamera()
            } else {
                nsc_content_camera.hideCamera()
            }
        }
    });

})();

