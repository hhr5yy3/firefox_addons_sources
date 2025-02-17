/* Kumquat Hub Options Router
 * 
 **/

(function (undefined) {

    pl.extend(ke.app, {
        import: [
            'ext.util.langUtil',
            'ext.const.selectors',
            'ext.const.storage',
            'ext.const.subscriptions',
            'ext.util.selectorsUtil',
            'ext.util.storageUtil',

            'lib.confetti',

            'ext.mate_events',
            'ext.tpl',
            'ext.dom',
            'ext.input',
            'ext.time',
            'ext.clipboard',

            'particles.pro_block.proModel',
            'particles.pro_block.proView',
            'particles.sett_trans_combo.stcView',
            'particles.sett_trans_combo.stcModel',
            'particles.sett_tabber.tabView',
            'particles.sett_tabber.tabModel',
            'particles.scrollbars.sModel',
            'particles.lang_selectors.lsView',

            'ui_views.i18n',
            'ui_views.visibility',

            'ui_components.dropdown.dropdown',
            'ui_components.scrollbar.scrollbar',
            'ui_components.ss_selector.ss_selector',
            'ui_components.toggle',
            'ui_components.loading',
            'ui_components.pro_alert',
            'ui_components.login',
            'ui_components.notifications'
        ],

        $redeem_layout: $('.redeem-layout'),
        $redeem_form: $('.redeem-form'),
        $redeem_successful: $('.redeem-successful'),
        $redeem_failed: $('.redeem-failed'),

        callbacksInitialization: {},
        temp: {
            combos: 0,
            source: null,
            pro_block_test: null
        },

        flags: {
            pro: false
        },

        init: function () {
            var that = this;

            ke.ext.util.storageUtil.requestBackgroundOption('isTrueOption', ['dark_mode'], function (dark_mode) {
                if (dark_mode) {
                    $('body').addClass('dark-mode');
                }
            });

            if (document.location.hash === '#success') {
                ke.ext.util.storageUtil.requestBackgroundOption('setVal', ['chr_pro_flag', true], function() {
                    document.location.hash = '';
                    document.location.reload();
                });
            }

            ke.ui_views.i18n.setSettingsTitle();

            ke.ui.toggle.initToggles();

            // Render the list
            ke.particles.sett_trans_combo.view.renderAllCombinations(function () {
                setTimeout(function () {
                    that.initCombinationsDropdown();
                }, 50);
            });
            ke.app.render.events.bindCombinationAddition();

            ke.particles.sett_trans_combo.model.ctrlComboVisibility();

            ke.app.render.events.tabChange();

            ke.app.render.organize.showPopupShortcuts();
            $('.shortcut-swap').on('click', ke.app.handlers.onShortcutSwap);

            ke.app.render.events.bindBeforeUnload();

            ke.ext.util.storageUtil.requestBackgroundOption('getVal', ['ext_ver'], function (ext_ver) {
                $('.app-version').html(ext_ver);
            });
            
            window.onmessage = ke.app.handlers.handleMessagesFromIFrames;

            $('.subscribe').on('click', ke.app.handlers.onSubscribe);
            $('.email').on('click', ke.app.handlers.onEmailUs);
            $('.help-center').on('click', ke.app.handlers.onHC);
            $('.facebook').on('click', ke.app.handlers.onFacebookOpen);
            $('.twitter').on('click', ke.app.handlers.onTwitterOpen);
            $('.website').on('click', ke.app.handlers.onSiteOpen);
            $('.other-devices').on('click', ke.app.handlers.showOtherApps);

            $('.privacy-button').on('click', ke.app.handlers.openPrivacyPolicy);
            $('.tos-button').on('click', ke.app.handlers.openToS);
            $('.revoke-consent').on('click', ke.app.handlers.revokeConsent);
            $('.erase-data').on('click', ke.app.handlers.eraseUserData);

            $('.share-link').val(ke.storeLink).on('focus', ke.app.handlers.copyLink);

            $('.gikken-footer-logo').attr('href', $('.gikken-footer-logo').attr('href') + "?ref=" + ke.browserName);

            // no one needs VK outside of Russia
            if (ke.ext.util.storageUtil.getVal('user_country') !== 'ru') {
                $('.share-button[data-pl="vk"]').remove();
                $('.share-button[data-pl="email"]').removeClass('mw-2b');
            }

            ke.app.render.organize.showOtherPlatforms();

            $('.share-button').on('click', ke.app.handlers.showSharingWindow);

            $('.show-devdata').remove();

            if (ke.IS_SAMSUNG) {
                $('.shortcuts-feature, .toolbar-window-shortcuts, .double-click-translation, .selection-translation, .tooltip-size, .shortcuts').remove();
            }

            // no split tests for the pro block temporarily
            $('.pro-block-design.variant-2').show();

            ke.ext.util.storageUtil.chainRequestBackgroundOption([
                {fn: 'isTrueOption', args: ['chr_pro_flag']},
                {fn: 'isTrueOption', args: ['trial_started']},
                {fn: 'getIntValue', args: ['trial_start']},
                {fn: 'getIntValue', args: ['tooltip_scale']},
                {fn: 'isTrueOption', args: ['gdpr_consent']},
            ], function (r) {
                var is_pro = r[0].response;
                var trial_started = r[1].response;
                var trial_start = r[2].response;
                var tooltip_scale = r[3].response;
                var is_gdpr = r[4].response;

                ke.app.flags.pro = ke.isProUser;

                if (!ke.isProUser) {
                    $('.email').hide();
                    $('.help-center').removeClass('mw-2b').addClass('wba');
                }

                var postPaddleInit = function () {
                    ke.particles.pro_block.view.init(ke.ui.loading.close);

                    var def_tab = 1;
                    var h = document.location.hash.substr(1);

                    if (h.indexOf('start_purchase') > -1 && !is_pro) {
                        const init_data = h.split(',');

                        const PRO_ACTION_SHOW_ALERT = {
                            'tooltip-routine-promo': 'Window_ProBannerAds',
                            'tooltip-ipa-translit': 'Pro_IPA_Msg',
                            'tooltip-articles': 'Pro_Articles_Msg',
                            'tooltip-unpin': 'Window_UnpinPro',
                            'tooltip-synonyms': 'Pro_SynonymsPaywall',
                            'automatic-full-page': 'Pro_FullPageTranslation',
                            'netflix-phrasebook-saving': 'Pro_NetflixPhrasebookSaving'
                        };

                        if (ke.isSubscriptionBased) {
                            ke.app.temp.source = init_data[2];
                        } else {
                            ke.app.temp.source = init_data[1];
                        }

                        if (ke.app.temp.source in PRO_ACTION_SHOW_ALERT) {
                            ke.ui.pro_alert.show(ke.getLocale(PRO_ACTION_SHOW_ALERT[ke.app.temp.source]));
                        } else {
                            if (ke.isSubscriptionBased) {
                                ke.particles.pro_block.model.changeBillingPeriod.call($('.plan.' + init_data[1])[0]);
                                ke.particles.pro_block.model.subscribe();  
                            } else {
                                ke.particles.pro_block.model.upgrade();
                            }   
                        }
                    } else if (h.indexOf('sub_ref') > -1) {
                        const init_data = h.split(',');
                        ke.particles.pro_block.model.changeBillingPeriod.call($('.plan.' + init_data[1])[0]);
                        ke.app.temp.source = init_data[2];
                    } else if (h === 'start_restore') {
                        ke.particles.pro_block.model.restore();
                    } else {
                        var tab = parseInt(h.split(',')[0], 10);
                        ke.app.temp.source = h.split(',')[1];

                        if (!isNaN(tab) && tab >= 1 && tab <= 4) {
                            def_tab = tab;
                        } else {
                            ke.app.temp.source = h;
                        }
                    }

                    // to enable pre-opening of different tabs from emails
                    ke.particles.sett_tabber.view.displayCurrentTab(def_tab);
                };

                if (!ke.supportsOnlineAnalytics) {
                    ke.import('lib.ga', () => {
                        ke.initAnalytics(postPaddleInit);
                    });
                } else {
                    ke.loadExternalScript(ke.analyticsScriptLink, () => {
                        ke.initAnalytics(postPaddleInit);
                    });
                }

                $('.tt-' + (tooltip_scale + '').replace('.', '-')).addClass('sel-tt');
                $('.tt-size').on('click', ke.app.handlers.saveTooltipSize);

                $('.netflix-view-words').on('click', ke.app.handlers.openPhrasebook);
            });

            chrome.runtime.onMessage.addListener(ke.app.handlers.handleLoginStateChange);

            ke.ui_views.i18n.init();
        },

        initCombinationsDropdown: function (opt) {
            ke.ui.dropdown.init(
                ke.particles.sett_trans_combo.model.onComboDropdownChange,
                [ke.particles.sett_trans_combo.model.onComboDropdownOpen, ke.EF],
                ke.particles.sett_trans_combo.view.getComboVariants,
                opt || undefined,
                function () {
                }
            );
        }
    });

})();