/**
 * Created by hasesanches on 2017.
 */

(function () {
    if (window.__nscContentScriptVideoPanel) return;
    window.__nscContentScriptVideoPanel = true;

    // console.log('start video panel');

    let ns_video_panel = {
        editor: null,
        interval: null,
        panel_move: false,
        option: {
            editor_tools: null,
            drawing_tools: false,
            delete_drawing: null
        },
        event: function () {
            ns_video_panel.editor.on('nimbus-editor-change', function (e, tools, color) {
                if (tools) {
                    let $this = $('[data-event-param=' + tools + ']');
                    let $button = $this.closest('.nsc-panel-button');
                    $('.nsc-panel-button').removeClass('active').filter($button).addClass('active');
                    if ($this.eq(0).closest('.nsc-panel-dropdown').length) {
                        $button.removeClass('opened').find('.nsc-panel-text').empty().append($this.eq(0).clone().on('click touchend').trigger('click'));
                    }
                }
                if (color) $('#nsc_panel_button_colors').css('background-color', color).closest('.nsc-panel-button').removeClass('opened');
            });

            $('*[data-event^=nimbus-editor]').on('click touchend', function () {
                ns_video_panel.editor.trigger($(this).data('event'), $(this).data('eventParam'));
                if ($(this).data('event') === 'nimbus-editor-active-tools') {
                    ns_video_panel.option.editor_tools = $(this).data('eventParam');
                    chrome.runtime.sendMessage({operation: 'set_video_editor_tools', tools: $(this).data('eventParam')});
                }
            });

            $('*[data-i18n]')
                .on('mouseenter touchenter', function () {
                    $('.nsc-panel-tooltip-layout').text(chrome.i18n.getMessage($(this).data('i18n')));
                    $('.nsc-panel.nsc-panel-compact').addClass('nsc-tooltip');
                })
                .on('mouseleave touchleave', function () {
                    $('.nsc-panel.nsc-panel-compact').removeClass('nsc-tooltip')
                });

            $('.nsc-panel-toggle-button').on('click', function () {
                $('.nsc-panel.nsc-panel-compact').hide();
            });

            $('.nsc-panel-trigger').on('click touchend', function () {
                let $this_button = $(this).closest('.nsc-panel-button');
                $('.nsc-panel-button').not($this_button).removeClass('opened');
                if ($this_button.find('.nsc-panel-dropdown').length) $this_button.toggleClass('opened');
            });

            function panelKeyDown(e) {
                if ((e.altKey || e.metaKey) && ns_video_panel.option.drawing_tools) {
                    switch (e.keyCode) {
                        case 86: // v
                            if ($('.nsc-panel.nsc-panel-compact:visible').length) {
                                $('.nsc-panel.nsc-panel-compact').addClass('nsc-hide');
                                // chrome.runtime.sendMessage({operation: 'set_video_panel', value: 'false'});
                                // ns_video_panel.editor.trigger('nimbus-editor-active-tools', false);
                            } else {
                                // if (ns_video_panel.editor.hasClass('nsc-hide')) {
                                //     let body = document.body,
                                //         html = document.documentElement,
                                //         page_w = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
                                //         page_h = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                                //
                                //
                                //     ns_video_panel.editor.removeClass('nsc-hide').width(page_w).height(page_h).videoEditor();
                                //     ns_video_panel.editor.trigger('nimbus-editor-active-tools', ns_video_panel.option.editor_tools);
                                //
                                //     if (ns_video_panel.option.delete_drawing) {
                                //         ns_video_panel.interval = setInterval(function () {
                                //             ns_video_panel.editor.trigger('nimbus-editor-remove-old');
                                //         }, ns_video_panel.option.delete_drawing * 1000)
                                //     }
                                // }

                                $('.nsc-panel.nsc-panel-compact').removeClass('nsc-hide');
                                // chrome.runtime.sendMessage({operation: 'set_video_panel', value: 'true'});
                                // ns_video_panel.editor.trigger('nimbus-editor-active-tools', ns_video_panel.option.editor_tools);
                            }
                            break;
                        case 83: // s
                            ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'cursorDefault');
                            ns_video_panel.option.editor_tools = 'cursorDefault';
                            chrome.runtime.sendMessage({operation: 'set_video_editor_tools', tools: 'cursorDefault'});
                            break;
                        case 71: // g
                            ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'cursorShadow');
                            ns_video_panel.option.editor_tools = 'cursorShadow';
                            chrome.runtime.sendMessage({operation: 'set_video_editor_tools', tools: 'cursorShadow'});
                            break;
                        case 76: // l
                            ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'cursorRing');
                            ns_video_panel.option.editor_tools = 'cursorRing';
                            chrome.runtime.sendMessage({operation: 'set_video_editor_tools', tools: 'cursorRing'});
                            break;
                        case 80: // p
                            ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'pen');
                            ns_video_panel.option.editor_tools = 'pen';
                            chrome.runtime.sendMessage({operation: 'set_video_editor_tools', tools: 'pen'});
                            break;
                        case 65: // a
                            ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'arrow');
                            ns_video_panel.option.editor_tools = 'arrow';
                            chrome.runtime.sendMessage({operation: 'set_video_editor_tools', tools: 'arrow'});
                            break;
                        case 82: // r
                            ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'square');
                            ns_video_panel.option.editor_tools = 'square';
                            chrome.runtime.sendMessage({operation: 'set_video_editor_tools', tools: 'square'});
                            break;
                        case 77: // m
                            ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'notifRed');
                            ns_video_panel.option.editor_tools = 'notifRed';
                            chrome.runtime.sendMessage({operation: 'set_video_editor_tools', tools: 'notifRed'});
                            break;
                        case 81: // q
                            ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'notifBlue');
                            ns_video_panel.option.editor_tools = 'notifBlue';
                            chrome.runtime.sendMessage({operation: 'set_video_editor_tools', tools: 'notifBlue'});
                            break;
                        case 67: // c
                            ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'notifGreen');
                            ns_video_panel.option.editor_tools = 'notifGreen';
                            chrome.runtime.sendMessage({operation: 'set_video_editor_tools', tools: 'notifGreen'});
                            break;
                        // case 78: // n
                        //     videoEditor && videoEditor.trigger('nimbus-editor-active-tools', 'clear');
                        //     break;
                        case 85: // u
                            ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'clearAll');
                            break;
                    }
                }
            }

            $('.nsc-panel.nsc-panel-compact .nsc-panel-move')
                .on('mousedown', function () {
                    ns_video_panel.panel_move = true;
                })
                .on('mouseup', function () {
                    ns_video_panel.panel_move = false;
                });

            $(window).on('keydown', panelKeyDown)
                .on('mousemove', function (e) {
                    if (ns_video_panel.panel_move) {
                        $('.nsc-panel.nsc-panel-compact').css({left: e.clientX - 2, bottom: $(window).height() - e.clientY - 46 / 2});
                    }
                })
                .on('mouseup', function () {
                    ns_video_panel.panel_move = false;
                });

            let $web_camera = $('#nimbus_web_camera_toggle');
            let $button_play = $('#nsc_panel_button_play').hide();
            let $button_pause = $('#nsc_panel_button_pause');
            let $button_stop = $('#nsc_panel_button_stop');

            $web_camera.on('click', function () {
                chrome.runtime.sendMessage({operation: 'web_camera_toggle_panel'});
            });

            $button_play.on('click touchend', function () {
                chrome.runtime.sendMessage({operation: 'status_video_change', status: 'play'});
            });
            $button_pause.on('click touchend', function () {
                chrome.runtime.sendMessage({operation: 'status_video_change', status: 'pause'});
            });
            $button_stop.on('click touchend', function () {
                chrome.runtime.sendMessage({operation: 'status_video_change', status: 'stop'});
            });
        },
        init: function () {
            $.get(chrome.runtime.getURL('template/panel-video-compact.html'), function (data) {
                $('body').append(data).append($('<div>').addClass('nsc-video-editor').addClass('nsc-hide'));

                let body = document.body,
                    html = document.documentElement,
                    page_w = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
                    page_h = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

                ns_video_panel.editor = $('.nsc-video-editor').width(page_w).height(page_h).videoEditor();
                ns_video_panel.event();
            })
        }
    };

    ns_video_panel.init();

    chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
        if (req.operation === 'status_video') {
            let $button_play = $('#nsc_panel_button_play');
            let $button_pause = $('#nsc_panel_button_pause');

            if (!req.status) {
                ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'clearAll');
                $('.nsc-panel.nsc-panel-compact').addClass('nsc-hide');
                ns_video_panel.editor.addClass('nsc-hide');//.width('auto').height('auto').videoEditor('clear');
                // ns_video_panel.option.drawing_tools = false;
                clearInterval(ns_video_panel.interval);
            } else if (req.status) {
                // ns_video_panel.option.drawing_tools = true;
            } else if (req.state === 'recording') {
                $button_play.hide();
                $button_pause.show();
            } else if (req.state === 'paused') {
                $button_pause.hide();
                $button_play.show();
            }
        }
        if (req.operation === 'video_panel_show') {
            ns_video_panel.option.drawing_tools = req.videoDrawingToolsEnable;
            ns_video_panel.option.delete_drawing = req.videoDrawingToolsDelete;
            ns_video_panel.option.editor_tools = req.videoEditorTools;

            if (ns_video_panel.option.delete_drawing) {
                ns_video_panel.interval = setInterval(function () {
                    ns_video_panel.editor.trigger('nimbus-editor-remove-old');
                }, ns_video_panel.option.delete_drawing * 1000)
            }

            let body = document.body,
                html = document.documentElement,
                page_w = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
                page_h = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

            ns_video_panel.editor.width(page_w).height(page_h);

            if (ns_video_panel.option.drawing_tools) {
                ns_video_panel.editor.trigger('nimbus-editor-active-tools', ns_video_panel.option.editor_tools);
                $('.nsc-panel.nsc-panel-compact').removeClass('nsc-hide');
            } else {
                ns_video_panel.editor.trigger('nimbus-editor-active-tools', 'cursorRing');
            }
            ns_video_panel.editor.removeClass('nsc-hide');
        }
    });
})();