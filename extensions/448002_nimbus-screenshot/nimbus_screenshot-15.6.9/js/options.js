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

$(document).ready(function () {
    const location = window.location.href.match(/\?(\w+)$/);
    const hotkeys = JSON.parse(localStorage.appHotkeys);

    $("input, button, select, textarea").on('input change', function (e) {
        let _this = this;
        let checked = $(_this).prop("checked");

        switch (this.name) {
            case 'image-format':
                localStorage.imageFormat = this.value;
                window.nimbus_core.setOption('imageFormat', localStorage.imageFormat);
                $('.nsc-settings-format .nsc-setting-quality').toggleClass('nsc-setting-quality-hidden', this.value === 'png');
                break;
            case 'show-new-button':
                localStorage.appShowButtonNew = $(this).prop("checked");
                window.nimbus_core.setOption('appShowButtonNew', localStorage.appShowButtonNew);
                break;
            case 'enable-watermark':
                if (e.type !== 'input') return;
                if (checked) {
                    nimbusShare.checkPremium(function (err, premium) {
                        if (err || !premium.capture) {
                            $(_this).prop('checked', false);
                            return;
                        }
                        localStorage.watermarkEnable = checked;
                        localStorage.isUseWatermark = true;
                        window.nimbus_core.setOption('watermarkEnable', localStorage.watermarkEnable);
                        window.nimbus_core.setEvent('enable-watermark', localStorage.watermarkEnable);
                        window.nimbus_core.setOption('isUseWatermark', localStorage.isUseWatermark);

                        $('input[name=type-watermark]').prop('disabled', false);
                        $('input[name=percent-watermark]').prop('disabled', false);
                        $('select[name=font-watermark]').prop('disabled', false);
                        $('input[name=size-watermark]').prop('disabled', false);
                        $('textarea[name=text-watermark]').prop('disabled', false);
                        $('button[name=button-file-watermark]').prop('disabled', false);
                        $('input[name=time-enable-watermark]').prop('disabled', false);
                        $('select[name=time-watermark]').prop('disabled', false);

                    });
                } else {
                    localStorage.watermarkEnable = checked;
                    window.nimbus_core.setOption('watermarkEnable', localStorage.watermarkEnable);
                    window.nimbus_core.setEvent('enable-watermark', localStorage.watermarkEnable);

                    $('input[name=type-watermark]').prop('disabled', true);
                    $('input[name=percent-watermark]').prop('disabled', true);
                    $('select[name=font-watermark]').prop('disabled', true);
                    $('input[name=size-watermark]').prop('disabled', true);
                    $('textarea[name=text-watermark]').prop('disabled', true);
                    $('button[name=button-file-watermark]').prop('disabled', true);
                    $('input[name=time-enable-watermark]').prop('disabled', true);
                    $('select[name=time-watermark]').prop('disabled', true);
                }
                break;
            case 'type-watermark':
                if (e.type !== 'input') return;

                localStorage.watermarkType = this.value;
                window.nimbus_core.setOption('watermarkType', localStorage.watermarkType);
                window.nimbus_core.setEvent('type-watermark', localStorage.watermarkType);

                if (this.value === 'image' && localStorage.watermarkFile !== '') {
                    $('.nsc-settings-watermark-image').attr('src', localStorage.watermarkFile).css('opacity', localStorage.watermarkAlpha);
                }
                if (this.value === 'text') {
                    $('#nsc_settings_watermark_percent').hide();
                    $('textarea[name=text-watermark]').css('opacity', localStorage.watermarkAlpha);
                } else {
                    $('#nsc_settings_watermark_percent').show();
                }
                $('[data-type-watermark]').hide().filter('[data-type-watermark=' + this.value + ']').show();
                break;
            case 'percent-watermark':
                localStorage.watermarkPercent = +this.value / 100;
                window.nimbus_core.setOption('watermarkPercent', localStorage.watermarkPercent);
                window.nimbus_core.setEvent('percent-watermark', localStorage.watermarkPercent);
                break;
            case 'alpha-watermark':
                localStorage.watermarkAlpha = +this.value / 100;
                window.nimbus_core.setOption('watermarkAlpha', localStorage.watermarkAlpha);
                window.nimbus_core.setEvent('alpha-watermark', localStorage.watermarkAlpha);
                $('.nsc-settings-watermark-image').css('opacity', localStorage.watermarkAlpha);
                $('textarea[name=text-watermark]').css('opacity', localStorage.watermarkAlpha);
                break;
            case 'font-watermark':
                localStorage.watermarkFont = this.value;
                window.nimbus_core.setOption('watermarkFont', localStorage.watermarkFont);
                window.nimbus_core.setEvent('font-watermark', localStorage.watermarkFont);
                $('textarea[name=text-watermark]').css({'font-family': localStorage.watermarkFont});
                break;
            case 'size-watermark':
                localStorage.watermarkSize = this.value;
                window.nimbus_core.setOption('watermarkSize', localStorage.watermarkSize);
                window.nimbus_core.setEvent('size-watermark', localStorage.watermarkSize);
                $('textarea[name=text-watermark]').css({
                    'line-height': localStorage.watermarkSize + 'px',
                    'font-size': localStorage.watermarkSize + 'px'
                });
                break;
            case 'text-watermark':
                if (e.type !== 'input') return;

                localStorage.watermarkText = this.value;
                window.nimbus_core.setOption('watermarkText', localStorage.watermarkText);
                window.nimbus_core.setEvent('text-watermark', localStorage.watermarkText);
                break;
            case 'file-watermark':
                const file = this.files[0];

                if (!file.type.match('image.*')) return $('#nsc_popup_watermark_unsupported').show();
                if (file.size >= 1048576) return $('#nsc_popup_watermark_limit').show();

                window.nimbus_core.blobToDataURL(file, function (dataUrl) {
                    localStorage.watermarkFile = dataUrl;
                    window.nimbus_core.setOption('watermarkFile', localStorage.watermarkFile);
                    window.nimbus_core.setEvent('file-watermark', localStorage.watermarkFile);

                    $('.nsc-settings-watermark-image-area').show();
                    $('.nsc-settings-watermark-image').attr('src', localStorage.watermarkFile);
                });
                break;
            case 'time-enable-watermark':
                localStorage.watermarkEnableTime = checked;
                window.nimbus_core.setOption('watermarkEnableTime', localStorage.watermarkEnableTime);
                window.nimbus_core.setEvent('time-enable-watermark', localStorage.watermarkEnableTime);

                break;
            case 'time-watermark':
                localStorage.watermarkTime = this.value;
                window.nimbus_core.setOption('watermarkTime', localStorage.watermarkTime);
                window.nimbus_core.setEvent('time-watermark', localStorage.watermarkTime);
                break;
            case 'video-quick-capture':
                if (checked && localStorage.appType !== 'google') {
                    nimbusShare.checkPremium(function (err, premium) {
                        if (err || !premium.capture) {
                            $(_this).prop('checked', false);
                            return;
                        }
                        localStorage.quickVideoCapture = checked;
                        window.nimbus_core.setOption('quickVideoCapture', localStorage.quickVideoCapture);
                        $('#video_quick_capture').toggleClass('nsc-settings-choose-enabled', localStorage.quickVideoCapture !== 'false');
                    });
                } else {
                    localStorage.quickVideoCapture = checked;
                    window.nimbus_core.setOption('quickVideoCapture', localStorage.quickVideoCapture);
                    $('#video_quick_capture').toggleClass('nsc-settings-choose-enabled', localStorage.quickVideoCapture !== 'false');
                }
                break;
            case 'video-quick-capture-after':
                localStorage.quickVideoCaptureType = this.value;
                window.nimbus_core.setOption('quickVideoCaptureType', localStorage.quickVideoCaptureType);
                break;
            case 'video-quick-capture-before':
                localStorage.enableVideoEdit = this.value;
                window.nimbus_core.setOption('enableVideoEdit', localStorage.enableVideoEdit);
                break;
            case 'video-quick-capture-github':
                if (checked) {
                    nimbusShare.checkPremium(function (err, premium) {
                        if ((err || !premium.capture)/* && +localStorage.quickVideoCaptureGithubCount > 3*/) {
                            $(_this).prop('checked', false);

                            if (+localStorage.quickVideoCaptureGithubCount > 3) {
                                // todo: view popup
                            }
                            return;
                        }
                        localStorage.quickVideoCaptureGithub = checked;
                        window.nimbus_core.setOption('quickVideoCaptureGithub', localStorage.quickVideoCaptureGithub);
                        $('#video_quick_capture_github').toggleClass('nsc-settings-choose-enabled', localStorage.quickVideoCaptureGithub !== 'false');
                    });
                } else {
                    localStorage.quickVideoCaptureGithub = checked;
                    window.nimbus_core.setOption('quickVideoCapture', localStorage.quickVideoCaptureGithub);
                    $('#video_quick_capture_github').toggleClass('nsc-settings-choose-enabled', localStorage.quickVideoCaptureGithub !== 'false');
                }
                break;
            case 'video-stream-menu':
                if (checked) {
                    localStorage.quickVideoStreamMenuEnable = checked;
                    window.nimbus_core.setOption('quickVideoStreamMenuEnable', localStorage.quickVideoStreamMenuEnable);
                } else {
                    localStorage.quickVideoStreamMenuEnable = checked;
                    window.nimbus_core.setOption('quickVideoStreamMenuEnable', localStorage.quickVideoStreamMenuEnable);
                }
                break;
        }
    }).on('click', function () {
        switch (this.name) {
            case 'button-file-watermark':
                $('[name=file-watermark]').focus().trigger('click');
                break;
        }
    }).filter('[name=image-format][value=' + localStorage.imageFormat + ']').prop('checked', true).trigger('change').end()
        .filter('[name=show-new-button]').prop('checked', localStorage.appShowButtonNew !== 'false').end()
        .filter('[name=enable-watermark]').prop('checked', localStorage.watermarkEnable !== 'false').trigger('change').end()
        .filter('input[name=type-watermark][value=' + localStorage.watermarkType + ']').prop('checked', true).trigger('input').end()
        .filter('[name=time-enable-watermark]').prop('checked', localStorage.watermarkEnableTime !== 'false').end()
        .filter('[name=time-watermark]').val(localStorage.watermarkTime).end()
        .filter('[name=percent-watermark]').val(localStorage.watermarkPercent * 100).end()
        .filter('[name=alpha-watermark]').val(localStorage.watermarkAlpha * 100).end()
        .filter('[name=font-watermark]').val(localStorage.watermarkFont).trigger('change').end()
        .filter('[name=size-watermark]').val(localStorage.watermarkSize).trigger('change').end()
        .filter('[name=text-watermark]').val(localStorage.watermarkText).trigger('input').end();

    $('[name=video-quick-capture]').prop('checked', localStorage.quickVideoCapture !== 'false').trigger('change');
    $('[name=video-quick-capture-after] option[value=' + localStorage.quickVideoCaptureType + ']').attr('selected', 'selected');
    $('[name=video-quick-capture-before] option[value=' + localStorage.enableVideoEdit + ']').attr('selected', 'selected');
    $('[name=video-quick-capture-github]').prop('checked', localStorage.quickVideoCaptureGithub !== 'false').trigger('change');
    $('[name=video-quick-capture-github-before] option[value=' + localStorage.quickVideoCaptureGithubType + ']').attr('selected', 'selected');
    $('[name=video-stream-menu]').prop('checked', localStorage.quickVideoStreamMenuEnable !== 'false').trigger('change');

    $("[name=color-watermark]").spectrum({
        color: localStorage.watermarkColor,
        flat: true,
        showAlpha: true,
        showButtons: false,
        move: function (color) {
            if (localStorage.watermarkEnable === 'false') return;
            localStorage.watermarkColor = color.toRgbString();
            window.nimbus_core.setOption('watermarkColor', localStorage.watermarkColor);
            window.nimbus_core.setEvent('color-watermark', localStorage.watermarkColor);

            $("[name=color-watermark]").val(localStorage.watermarkColor).closest('.nsc-settings-watermark-colorpicker').find('.nsc-settings-watermark-colorpicker-fill-shape-inner').css('background', localStorage.watermarkColor);
            $('textarea[name=text-watermark]').css({'color': localStorage.watermarkColor});
        }
    }).closest('.nsc-settings-watermark-colorpicker').find('.nsc-settings-watermark-colorpicker-fill-shape-inner').css('background-color', localStorage.watermarkColor);

    let $watermark = $('.nsc-settings-watermark-box-item');
    $watermark.on('click', function () {
        if (localStorage.watermarkEnable === 'false') return;
        $watermark.removeClass('filled').filter(this).addClass('filled');
        localStorage.watermarkPosition = $(this).data('position');
        window.nimbus_core.setOption('watermarkPosition', localStorage.watermarkPosition);
        window.nimbus_core.setEvent('position-watermark', localStorage.watermarkPosition);
    }).filter('[data-position=' + localStorage.watermarkPosition + ']').addClass('filled');

    $('.nsc-settings-watermark-colorpicker-button').on('click', function () {
        $('.nsc-settings-watermark-colorpicker-drop-holder').toggle();
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.nsc-settings-watermark-colorpicker').length) {
            $('.nsc-settings-watermark-colorpicker-drop-holder').hide();
        }
    });

    $('.nsc-popup-close button, .nsc-popup a').on('click', function (e) {
        $(this).closest('.nsc-popup').hide();
    });

    $('.nsc-open-popup-login-nimbus').on('click', function () {
        $('.nsc-popup').hide();
        $('#nsc_popup_connect_nimbus').show();
        return false;
    });

    $('.nsc-open-popup-register-nimbus').on('click', function () {
        $('.nsc-popup').hide();
        $('#nsc_popup_register_nimbus').show();
        return false;
    });

    $('#nsc_connect_to_google').on('click', function (e) {
        $('#nsc_popup_connect_nimbus').hide();
        window.open('https://nimbus.everhelper.me/auth/openidconnect.php?env=app&provider=google', '_blank');
        return false;
    });

    $('#nsc_connect_to_facebook').on('click', function (e) {
        $('#nsc_popup_connect_nimbus').hide();
        window.open('https://nimbus.everhelper.me/auth/openidconnect.php?env=app&provider=facebook', '_blank');
        return false;
    });

    $('#nsc_form_login_nimbus').on("submit", function () {
        let wrong = false;
        let $form = $(this);
        let email = this.elements['email'];
        let password = this.elements['password'];

        if (password.value.length < 8) {
            $(password).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipPassInfo"), type: "error", timeout: 5});
            wrong = true;
        }
        if (!/\S+@\S+\.\S+/.test(email.value)) {
            $(email).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipWrongEmail"), type: "error", timeout: 5});
            wrong = true;
        }

        if (!wrong) {
            nimbusShare.server.user.auth(email.value, password.value, function (res) {
                if (res.errorCode === 0) {
                    $form.find('input').val('');
                    $('.nsc-popup').hide();

                    if ((location && location[1]) === 'streamwelcome') {
                        nimbusShare.server.user.info(function (info) {
                            $('#nsc_stream_start').show();
                            if (info.body.premium.active) $('.stream-start-hide-premium').hide();
                        });
                    }
                } else {
                    $.ambiance({message: chrome.i18n.getMessage("notificationLoginFail"), type: "error", timeout: 5});
                }
            });
        }
        return false;
    }).find('input').on('keyup', function () {
        $(this).removeClass('wrong');

        if ($(this).val().length < 8 ||
            ($(this).attr('name') === 'email' && !/\S+@\S+\.\S+/.test($(this).val()))) {
            $(this).addClass('wrong');
        }
    });

    $('#nsc_form_register_nimbus').on("submit", function () {
        let wrong = false;
        let $form = $(this);
        let email = this.elements['email'];
        let password = this.elements['password'];
        let password_repeat = this.elements['pass-repeat'];

        if (password.value.length < 8) {
            $(password).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipPassInfo"), type: "error", timeout: 5});
            wrong = true;
        }

        if (password.value !== password_repeat.value) {
            $(password).addClass('wrong');
            $(password_repeat).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipPassMatch"), type: "error", timeout: 5});
            wrong = true;
        }

        if (!/\S+@\S+\.\S+/.test(email.value)) {
            $(email).addClass('wrong').focus();
            $.ambiance({message: chrome.i18n.getMessage("tooltipWrongEmail"), type: "error", timeout: 5});
            wrong = true;
        }

        if (!wrong) {
            nimbusShare.server.user.register(email.value, password.value, function (res) {
                if (res.errorCode === 0) {
                    nimbusShare.server.user.auth(email.value, password.value, function () {
                        $form.find('input').val('');
                        $('.nsc-popup').hide();

                        if ((location && location[1]) === 'streamwelcome') {
                            nimbusShare.server.user.info(function (info) {
                                $('#nsc_stream_start').show();
                                if (info.body.premium.active) $('.stream-start-hide-premium').hide();
                            });
                        }
                    });
                } else if (res.errorCode === -4) {
                    $.ambiance({message: chrome.i18n.getMessage("notificationEmailFail"), type: "error", timeout: 5});
                } else {
                    $.ambiance({
                        message: chrome.i18n.getMessage("notificationRegisterFail"),
                        type: "error",
                        timeout: 5
                    });
                }
            });
        }
        return false;
    }).find('input').on('keyup', function () {
        $(this).removeClass('wrong');

        if ($(this).val().length < 8 ||
            ($(this).attr('name') === 'pass-repeat' && $(this).val() !== $(this).closest('form').find("[name='pass']").val()) ||
            $(this).attr('name') === 'email' && !/\S+@\S+\.\S+/.test($(this).val())) {
            $(this).addClass('wrong');
        }
    });

    $('input[name=main-menu-item]').on('change', function () {
        let main_menu_item = JSON.parse(localStorage.appMenuItem);
        if (this.value === 'visible' || this.value === 'android') {
            $(this).prop('checked', true);
        }
        main_menu_item[this.value] = $(this).prop('checked');
        localStorage.appMenuItem = JSON.stringify(main_menu_item);
        window.nimbus_core.setOption('appMenuItem', localStorage.appMenuItem);
        chrome.runtime.sendMessage({operation: 'update_menu'});
    });

    $('button[name=filename-template-screenshot]').on('click', function () {
        let $name = $('#filename_template_screenshot');
        $name.val($name.val() + '{' + this.value + '}').trigger('input');
    });
    $('button[name=filename-template-screencast]').on('click', function () {
        let $name = $('#filename_template_screencast');
        $name.val($name.val() + '{' + this.value + '}').trigger('input');
    });
    $('#filename_template_screenshot').on('input', function () {
        localStorage.fileNamePatternScreenshot = this.value;
        window.nimbus_core.setOption('fileNamePatternScreenshot', localStorage.fileNamePatternScreenshot);
    });
    $('#filename_template_screencast').on('input', function () {
        localStorage.fileNamePatternScreencast = this.value;
        window.nimbus_core.setOption('fileNamePatternScreencast', localStorage.fileNamePatternScreencast);
    });
    $('#delayed_screenshot_time').on('blur', function () {
        this.value = parseInt(this.value) || 0;
        if (this.value < 0) this.value = 0;
        if (this.value > 999) this.value = 999;
        localStorage.delayedScreenshotTime = this.value;
        window.nimbus_core.setOption('delayedScreenshotTime', localStorage.delayedScreenshotTime);
    });
    $('#time_scroll_entire_page').on('blur', function () {
        this.value = parseInt(this.value) || 0;
        if (this.value < 0) this.value = 0;
        if (this.value > 9999) this.value = 9999;
        localStorage.actionEntirePageSctollDelay = this.value;
        window.nimbus_core.setOption('actionEntirePageSctollDelay', localStorage.actionEntirePageSctollDelay);
    });
    $('#depth_screenshot').on('blur', function () {
        this.value = parseInt(this.value) || 1;
        if (this.value < 1) this.value = 1;
        if (this.value > 64) this.value = 64;
        localStorage.imageDepth = this.value;
        window.nimbus_core.setOption('imageDepth', localStorage.imageDepth);
    });
    $('#enable_save_as').on('change', function () {
        localStorage.enableSaveAs = $(this).prop('checked');
        window.nimbus_core.setOption('enableSaveAs', localStorage.enableSaveAs);
    });
    $('#save_crop_position').on('change', function () {
        localStorage.saveCropPosition = $(this).prop('checked');
        window.nimbus_core.setOption('saveCropPosition', localStorage.saveCropPosition);
    });
    $('#hide_fixed_elements').on('change', function () {
        localStorage.actionHideFixedElements = $(this).prop('checked');
        window.nimbus_core.setOption('actionHideFixedElements', localStorage.actionHideFixedElements);
    });
    $('#show_content_menu').on('change', function () {
        localStorage.appContentMenuShow = $(this).prop('checked');
        window.nimbus_core.setOption('appContentMenuShow', localStorage.appContentMenuShow);
        chrome.runtime.sendMessage({operation: 'update_context_menu'});
    });
    $('#auto_short_url').on('change', function () {
        localStorage.numbusAutoShortUrl = $(this).prop('checked');
        window.nimbus_core.setOption('numbusAutoShortUrl', localStorage.numbusAutoShortUrl);
    });
    $('#keep_original_resolution').on('change', function () {
        localStorage.imageOriginalResolution = $(this).prop('checked');
        window.nimbus_core.setOption('imageOriginalResolution', localStorage.imageOriginalResolution);
    });
    $('#show_info_print').on('change', function () {
        localStorage.showInfoPrint = $(this).prop('checked');
        window.nimbus_core.setOption('showInfoPrint', localStorage.showInfoPrint);
    });

    $('#image-quality').on('change', function () {
        localStorage.imageQuality = this.value;
        window.nimbus_core.setOption('imageQuality', localStorage.imageQuality);
        $('#image-quality-value').text(localStorage.imageQuality);
    });

    let $capture_type = $('#capture_type');
    let $capture_enable_edit = $('#capture_enable_edit');
    let $quick_capture_choose = $('#quick_capture_choose');
    let $quick_capture_enable = $('#quick_capture_enable');

    $quick_capture_enable.on('change', function () {
        localStorage.quickCapture = $(this).prop("checked");
        window.nimbus_core.setOption('quickCapture', localStorage.quickCapture);
        $quick_capture_choose.toggleClass('nsc-settings-choose-enabled', localStorage.quickCapture !== 'false');
    }).prop('checked', (localStorage.quickCapture !== 'false'));

    $quick_capture_choose.toggleClass('nsc-settings-choose-enabled', localStorage.quickCapture !== 'false');

    $capture_type.on('change', function () {
        localStorage.quickCaptureType = this.value;
        window.nimbus_core.setOption('quickCapture', localStorage.quickCaptureType);
        $capture_type.find('option[value=' + localStorage.quickCaptureType + ']').attr('selected', 'selected');
    }).find('option[value=' + localStorage.quickCaptureType + ']').attr('selected', 'selected');

    $capture_enable_edit.on('change', function () {
        localStorage.enableEdit = this.value;
        window.nimbus_core.setOption('enableEdit', localStorage.enableEdit);
        $(this).find('option[value=' + localStorage.enableEdit + ']').attr('selected', 'selected');
    }).find('option[value=' + localStorage.enableEdit + ']').attr('selected', 'selected');

    $('#shortcut_load_to_ns').on('change', function () {
        localStorage.hotkeysSendNS = JSON.stringify({key: this.value, title: $(this).find('option:selected').text()});
        window.nimbus_core.setOption('hotkeysSendNS', localStorage.hotkeysSendNS);
        chrome.runtime.sendMessage({'operation': 'shortcut_load_to_ns_change'});
    });

    $('.open-page').on('click', function (e) {
        chrome.runtime.sendMessage({'operation': 'open_page', 'url': $(this).data('url')});
        return false;
    });

    // if (localStorage.watermarkEnable === 'false') {
    //     $('input[name=type-watermark]').prop('disabled', true);
    //     $('input[name=percent-watermark]').prop('disabled', true);
    //     $('select[name=font-watermark]').prop('disabled', true);
    //     $('input[name=size-watermark]').prop('disabled', true);
    //     $('textarea[name=text-watermark]').prop('disabled', true);
    //     $('input[name=button-file-watermark]').prop('disabled', true);
    // }

    if (localStorage.hotkeysSendNS) {
        $('#shortcut_load_to_ns').val(JSON.parse(localStorage.hotkeysSendNS).key);
    }

    if (localStorage.appMenuItem) {
        const main_menu_item = JSON.parse(localStorage.appMenuItem);
        for (let key in main_menu_item) {
            $('input[name=main-menu-item][value=' + key + ']').prop('checked', main_menu_item[key]);
        }
    }

    $('textarea[name=text-watermark]').css({'color': localStorage.watermarkColor});
    $("#image-quality").val(localStorage.imageQuality);
    $('#image-quality-value').text(localStorage.imageQuality);
    $('#delayed_screenshot_time').val(localStorage.delayedScreenshotTime || 3);
    $('#time_scroll_entire_page').val(localStorage.actionEntirePageSctollDelay);
    $('#depth_screenshot').val(localStorage.imageDepth);
    $('#filename_template_screenshot').val(localStorage.fileNamePatternScreenshot);
    $('#filename_template_screencast').val(localStorage.fileNamePatternScreencast);
    $("#enable_save_as").prop('checked', (localStorage.enableSaveAs !== 'false'));
    $("#save_crop_position").prop('checked', (localStorage.saveCropPosition !== 'false'));
    $("#hide_fixed_elements").prop('checked', (localStorage.actionHideFixedElements !== 'false'));
    $("#show_content_menu").prop('checked', (localStorage.appContentMenuShow !== 'false'));
    $("#auto_short_url").prop('checked', (localStorage.numbusAutoShortUrl !== 'false'));
    $("#keep_original_resolution").prop('checked', (localStorage.imageOriginalResolution !== 'false'));
    $("#show_info_print").prop('checked', (localStorage.showInfoPrint !== 'false'));


    const $shortcut_visible = $('#shortcut_visible');
    const $shortcut_fragment = $('#shortcut_fragment');
    const $shortcut_selected = $('#shortcut_selected');
    const $shortcut_scroll = $('#shortcut_scroll');
    const $shortcut_entire = $('#shortcut_entire');
    const $shortcut_window = $('#shortcut_window');
    $shortcut_visible.val(hotkeys.visible);
    $shortcut_fragment.val(hotkeys.fragment);
    $shortcut_selected.val(hotkeys.selected);
    $shortcut_scroll.val(hotkeys.scroll);
    $shortcut_entire.val(hotkeys.entire);
    $shortcut_window.val(hotkeys.window);

    [$shortcut_visible, $shortcut_fragment, $shortcut_selected, $shortcut_scroll, $shortcut_entire, $shortcut_window].forEach(function ($shortcut) {
        $shortcut.on('change', function () {
            const e = $shortcut_entire.val();
            const f = $shortcut_fragment.val();
            const s = $shortcut_selected.val();
            const sc = $shortcut_scroll.val();
            const v = $shortcut_visible.val();
            const w = $shortcut_window.val();

            if (window.nimbus_core.checkDifferent([e, f, s, sc, v, w])) {
                localStorage.appHotkeys = JSON.stringify({
                    entire: e,
                    fragment: f,
                    selected: s,
                    scroll: sc,
                    visible: v,
                    window: w
                });
                window.nimbus_core.setOption('appHotkeys', localStorage.appHotkeys);
            } else {
                $shortcut_visible.val(hotkeys.visible);
                $shortcut_fragment.val(hotkeys.fragment);
                $shortcut_selected.val(hotkeys.selected);
                $shortcut_scroll.val(hotkeys.scroll);
                $shortcut_entire.val(hotkeys.entire);
                $shortcut_window.val(hotkeys.window);
            }
        });
    });

    $('.nsc-settings-flag .nsc-icon-ask').on('click', false);

    if (window.navigator.language !== 'ru') {
        $('[data-i18n=popupLabelQuickVideoCaptureGithubEnable]').removeAttr('data-i18n').on('click', function () {
            window.open('https://s.nimbusweb.me/share/3329590/zfyp5nvplodpsfxvzap9', '_blank');
        });
        $('[data-i18n=popupLabelQuickVideoCaptureEnable]').removeAttr('data-i18n').on('click', function () {
            window.open('https://s.nimbusweb.me/share/3435562/44foo5ci2trkbir3m79o', '_blank');
        });

        $('[data-i18n=popupLabelStreamMenuEnable]').removeAttr('data-i18n').on('click', function () {
            window.open('https://s.nimbusweb.me/share/3267935/99q972riouoi0b4fs19s', '_blank');
            return false;
        });
    } else {
        $('[data-i18n=popupLabelStreamMenuEnable]').removeAttr('data-i18n').on('click', function () {
            window.open('https://s.nimbusweb.me/share/3641100/i5rr247nmw19bocl4a7c', '_blank');
            return false;
        });
    }

    $('[data-tab]').on('click', function () {
        $('[data-tab]').removeClass('nsc-settings-tab-active').filter(this).addClass('nsc-settings-tab-active');
        $('[data-container]').removeClass('nsc-settings-container-active').filter('[data-container=' + $(this).data('tab') + ']').addClass('nsc-settings-container-active');

        if (localStorage.watermarkFile === '') {
            $('.nsc-settings-watermark-image-area').hide();
        }
    }).filter(function () {
        return $(this).data('tab') === (location && location[1]);
    }).trigger('click');

    $('*[data-i18n]').each(function () {
        $(this).on('restart-i18n', function () {
            const text = chrome.i18n.getMessage($(this).data('i18n')) || $(this).data('i18n');
            const attr = $(this).data('i18nAttr');
            if (attr && text) {
                $(this).attr(attr, text);
            } else if (text) {
                $(this).html(text);
            }
        }).trigger('restart-i18n');
    });

    $('[data-i18n-attr="title"]').tooltip({
        position: {my: "center top+10", at: "center bottom"}
    });

    $('#nimbus_help_link').attr('href', 'https://s.nimbusweb.me/share/' + (window.navigator.language === 'ru' ? '3552389/f4vdbtq17l1zmkrhs5n1' : '3552387/mp8nr3ee75mtgyqfonnc'));

    // if ((location && location[1]) === 'login') $('#nsc_popup_connect_nimbus').show();
    // if ((location && location[1]) === 'limitfree') $('#nsc_popup_limit_free').show();
    // if ((location && location[1]) === 'streamwelcome') $('#nsc_stream_welcome').show();

    if (window.nimbus_core.is_firefox) {
        $('.nsc-global').removeClass('nsc-global');
    }
    if (window.nimbus_core.is_chrome) {
        chrome.commands.getAll(function (commands) {
            // console.log(commands)
            for (let command of commands) {
                $('[data-command-name="' + command.name + '"]').text(command.shortcut)
            }
        });
    }

    if (localStorage.appType === 'google') {
        $('[data-tab=watermark]').hide();
        $('#capture_enable_edit option[value=nimbus]').hide();
        $('#capture_enable_edit option[value=dropbox]').hide();
        $('#capture_enable_edit option[value=quick]').hide();
        $('#shortcut_load_to_ns').closest('.nsc-settings-shortcut').hide();
        $('input[name=video-stream-menu]').closest('.nsc-settings-flag').hide();
        $('input[name=show-new-button]').closest('.nsc-settings-flag').hide();
        $('input[name=video-quick-capture-github]').closest('.nsc-settings-flag').hide();
        $('select[name=video-quick-capture-before] option[value=nimbus]').hide();
        $('select[name=video-quick-capture-before] option[value=dropbox]').hide();
        $('select[name=video-quick-capture-before] option[value=quick]').hide();
        $('select[name=video-quick-capture-before] option[value=youtube]').hide();
    }
});