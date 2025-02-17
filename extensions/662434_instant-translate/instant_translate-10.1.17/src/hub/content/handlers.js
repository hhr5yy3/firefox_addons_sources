/* Kumquat Hub Content Handlers
 * 
 **/

(function (undefined) {

    pl.extend(ke.app.handlers, {
        passInlineTranslation: 0,

        scanForProperCombination: function (e, callback, dblclick) {
            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'option', 'getKeyComboOptionActiveness'),
                identificator: 'tooltip',
                dblclick: dblclick
            }, function (activeness_data) {
                if (activeness_data.is_active) {
                    chrome.runtime.sendMessage({
                        action: ke.processCall('app', 'option', 'isKeyCombo'),
                        identificator: 'tooltip',
                        keys_down: ke.ext.event.keysDown,
                        dblclick: activeness_data.old_data.dblclick
                    }, function (combo_data) {
                        if (combo_data.old_data.dblclick || combo_data.is_active) {
                            callback(combo_data.combo, combo_data.from, combo_data.to, combo_data.old_data.event);
                            ke.ext.event.keysDown = {};
                        }
                    });
                }
            });

            return true;
        },

        hasFocusedInputs: function (doc) {
            doc = doc || document;
            var has_focus_elements = false;

            $(doc.body).find("*:focus").each(function () {
                if ($(this).is("input,textarea") || this.contentEditable == 'true') {
                    has_focus_elements = true;
                }
            });

            return has_focus_elements;
        },

        skipSelectTranslation: false,

        onDoubleClick: function (event, doc, iframe) {
            if ((event.target.className || '').indexOf(ke.getPrefix()) > -1) {
                return;
            }

            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'option', 'getDoubleClickOptionActiveness'),
                event: ke.ext.event.getNecessaryInfo(event),
                identificator: 'tooltip'
            }, function (activeness_data) {
                if (!activeness_data.is_active || ke.app.handlers.hasFocusedInputs(doc) || pl.empty(ke.particles.translate_ctt.model.getSelectedText())) {
                    return;
                }

                ke.app.handlers.skipSelectTranslation = true;

                chrome.runtime.sendMessage({
                    action: ke.processCall('app', 'option', 'getMainLanguagePair'),
                    identificator: 'tooltip'
                }, function (l_data) {
                    if (ke.app.handlers.hasFocusedInputs(doc) || pl.empty(ke.particles.translate_ctt.model.getSelectedText())) {
                        return;
                    }

                    ke.app.handlers.lastTranslationCallArgs.doc = doc;
                    ke.app.handlers.lastTranslationCallArgs.iframe = iframe;

                    ke.particles.translate_ctt.model.showTranslation(undefined, l_data.from_lang, l_data.to_lang, doc, iframe, 'double-click');
                });
            });
        },

        hideSelectionButton: function () {
            $('.' + ke.getPrefix() + 'translate-selection-button').fadeOut(150, function () {
                $(this).remove();
            });
        },

        onSelection: function (event, doc, iframe) {

            if (pl.empty(ke.particles.translate_ctt.model.getSelectedText())
                || ((typeof event.target.className === 'string' ? event.target.className : '').indexOf(ke.getPrefix()) > -1
                    && (typeof event.target.className === 'string' ? event.target.className : '').indexOf('mate-subtitle-wrap') === -1)) {

                //
                // hide button
                ke.app.handlers.hideSelectionButton();

                //
                // don't execute code below
                return;
            }

            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'option', 'getTranslateOnSelectActiveness'),
                event: ke.ext.event.getNecessaryInfo(event),
                identificator: 'tooltip'
            }, function (activeness_data) {
                if (!activeness_data.is_active || ke.app.handlers.hasFocusedInputs(doc) || pl.empty(ke.particles.translate_ctt.model.getSelectedText())) {
                    return;
                }

                chrome.runtime.sendMessage({
                    action: ke.processCall('app', 'option', 'getMainLanguagePair'),
                    identificator: 'tooltip'
                }, function (l_data) {
                    if (ke.app.handlers.hasFocusedInputs(doc) || pl.empty(ke.particles.translate_ctt.model.getSelectedText())) {
                        return;
                    }

                    if (ke.app.handlers.skipSelectTranslation) {
                        ke.app.handlers.skipSelectTranslation = false;
                        return;
                    }

                    var selection = ke.particles.translate_ctt.model.getSelection();
                    var params = ke.ui.tooltip.helpSelected._getSelectionParameters(selection);

                    ke.app.handlers.lastTranslationCallArgs.text = selection.toString();
                    ke.app.handlers.lastTranslationCallArgs.selectionBB = params;

                    $('.' + ke.getPrefix() + 'translate-selection-button').remove();

                    if (document.location.href.indexOf('netflix.com/watch') > -1) {
                        //
                        // on netflix, just translate it right away
                        //
                        ke.app.handlers.netflix.pause();
                        ke.app.handlers.translateSelection(null, l_data.from_lang, l_data.to_lang);
                    } else {
                        //
                        // otherwise show the button
                        //
                        var height = 24;
                        var width = height;
                        var x = params.left + params.width / 2 + window.pageXOffset - width / 2;
                        var y;

                        if (params.top + params.height + 10 + height > window.innerHeight) {
                            y = params.top - 10 - height + window.pageYOffset; // floating button is above
                        } else {
                            y = params.top + params.height + 10 + window.pageYOffset; // floating button is below
                        }

                        $('body').append(
                            $('<div class="' + ke.getPrefix() + 'translate-selection-button"></div>')
                                .css({
                                    top: y,
                                    left: x
                                })
                                .data('l-from', l_data.from_lang)
                                .data('l-to', l_data.to_lang)
                                .on('click', ke.app.handlers.translateSelection)
                        );

                        // Auto-hide the floating button if not clicked after 2 seconds
                        setTimeout(function () {
                            $('.' + ke.getPrefix() + 'translate-selection-button').fadeOut(250, function () {
                                $(this).remove();
                            });
                        }, 2000);
                    }
                });
            });
        },

        upgradeForArticle: function() {
            let plan = '';
            if (ke.isSubscriptionBased) {
                plan = 'annual,';
            }
            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'opt', 'newTab'),
                url: chrome.extension.getURL('/pages/public/options.html#start_purchase,' + plan + 'articles')
            });

            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                cat: 'tooltip',
                event: 'upgrade-for-articles'
            });
        },

        upgradeForIpa: function() {
            let plan = '';
            if (ke.isSubscriptionBased) {
                plan = 'annual,';
            }
            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'opt', 'newTab'),
                url: chrome.extension.getURL('/pages/public/options.html#start_purchase,' + plan + 'ipa-translit')
            });

            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                cat: 'tooltip',
                event: 'upgrade-for-ipa'
            });
        },

        translateSelection: function (event, __from, __to) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }

            var from = __from || $(this).data('l-from');
            var to = __to || $(this).data('l-to');

            ke.particles.translate_ctt.model.showTranslation(undefined, from, to, null, null, 'selection');
        },

        lastTranslationCallArgs: {
            from: null, to: null, text: null, doc: undefined, iframe: undefined, selection: null, selectionBB: null
        },

        onKeyCombinationClick: function (e, doc, iframe) {
            if (ke.ext.event.isDown('esc', ke.ext.event.IN_STR)) {
                ke.ui.tooltip.simple.close(true);
                $('.TnITTtw-translate-loading').remove();
                return;
            }

            if (ke.app.handlers.hasFocusedInputs(doc)) {
                return;
            }

            return ke.app.handlers.scanForProperCombination(e, function (combo, from, to) {
                if (ke.app.handlers.passInlineTranslation) {
                    return --ke.app.handlers.passInlineTranslation;
                }

                // prevent showing a new tooltip with no selection
                // if something was translated before
                // and previous selection was saved in lastTranslationCallArgs
                // and is being reused now
                if (!ke.particles.translate_ctt.model.getSelectedText(doc)) {
                    return;
                }

                //ke.app.handlers.lastTranslationCallArgs.from = from;
                //ke.app.handlers.lastTranslationCallArgs.to = to;
                ke.app.handlers.lastTranslationCallArgs.doc = doc;
                ke.app.handlers.lastTranslationCallArgs.iframe = iframe;

                ke.particles.translate_ctt.model.showTranslation(undefined, from, to, doc, iframe, 'shortcut');
            }, false);
        },

        getListenValue: function (s, event) {
            var $where = !event.target ? event : $(ke.ext.util.selectorsUtil.getTooltipWrapRecursively(event.target));

            if (s === 'orig') {
                var i = ke.ext.string.removeHtml($where.find('.' + ke.getPrefix() + 'original-wrap .' + ke.getPrefix() + 'mv-text-part').html());

                if (!i) {
                    return ke.ext.string.removeHtml($where.find('.' + ke.getPrefix() + 'original-wrap .' + ke.getPrefix() + 'tpart').html());
                } else {
                    return i;
                }
            } else if (s === 'trans') {
                var i = ke.ext.string.removeHtml($where.find('.' + ke.getPrefix() + 'main-variant .' + ke.getPrefix() + 'mv-text-part').html());
                
                if (!i) {
                    return ke.ext.string.removeHtml($where.find('.' + ke.getPrefix() + 'trans-wrap .' + ke.getPrefix() + 'tpart').html());
                } else {
                    return i;
                }
            }

            return '';
        },

        //
        // Click on flags in the tooltip
        // Open tooltip settings to change languages
        //
        reverseTranslation: function (event) {
            /*chrome.runtime.sendMessage({
                action: ke.processCall('app', 'opt', 'newTab'),
                url: chrome.extension.getURL('/pages/public/options.html#3,tooltip')
            });

            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                cat: 'tooltip',
                event: 'change-langs'
            });*/

            // Last time we had a proper swap was in v6.X.X, before v7
            if (ke.app.handlers.lastTranslationCallArgs.from != null
                && ke.app.handlers.lastTranslationCallArgs.to != null
                && ke.app.handlers.lastTranslationCallArgs.text != null) {
                ke.particles.translate_ctt.model.showTranslation(
                    null,
                    ke.app.handlers.lastTranslationCallArgs.to,
                    ke.app.handlers.lastTranslationCallArgs.from,
                    ke.app.handlers.lastTranslationCallArgs.doc,
                    ke.app.handlers.lastTranslationCallArgs.iframe,
                    'reverse'
                );

                chrome.runtime.sendMessage({
                    action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                    cat: 'tooltip',
                    event: 'reverse-translate'
                });
            }
        },

        highlight: function (event) {
            $('body').highlight(ke.app.handlers.getListenValue('orig', event), {wordsOnly: true});

            setTimeout(function () {
                $('body').unhighlight();
            }, 750);

            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                cat: 'tooltip',
                event: 'highlight'
            });
        },

        unpin: function (event) {
            ke.ext.util.storageUtil.requestProStatus((isPro) => {
                if (!isPro) {
                    let plan = '';
                    if (ke.isSubscriptionBased) {
                        plan = 'annual,';
                    }
                    chrome.runtime.sendMessage({
                        action: ke.processCall('app', 'opt', 'newTab'),
                        url: chrome.extension.getURL('/pages/public/options.html#start_purchase,' + plan + 'tooltip-unpin')
                    });
                    
                    chrome.runtime.sendMessage({
                        action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                        cat: 'tooltip',
                        event: 'upgrade-to-pro-unpin'
                    });
                } else {
                    var $tooltip = $(ke.ext.util.selectorsUtil.getTooltipWrapRecursively(event.target));
    
                    $tooltip.addClass(ke.getPrefix() + 'unpinned');
                    $tooltip
                        .find('.' + ke.getPrefix() + 'help-selected-wrap')
                        .removeClass(ke.getPrefix() + 'with-netflix-buttons');
                    $tooltip
                        .find('.' + ke.getPrefix() + 'help-selected-wrap')
                        .removeClass(ke.getPrefix() + 'with-info-warn');
    
                    $tooltip.find('.' + ke.getPrefix() + 'arr0w').remove();
    
                    //
                    //
                    // Update the contents of tooltip
    
                    var time = 175;
                    $tooltip.find('.' + ke.getPrefix() + 'utils').slideUp(time, 'easeInOutQuint');
                    setTimeout(function () {
                        $tooltip.find('.' + ke.getPrefix() + 'unpinned-utils').css('display', 'block');
                        $tooltip.find('.' + ke.getPrefix() + 'original-wrap').slideDown(time, 'easeInOutQuint', function () {
                            var ttid = $tooltip.data('ttid');
    
                            $(this).css('display', 'block');
    
                            ke.particles.scrollbars.model.setupHelpSelectedScroll(ttid);
                        });
                    }, time - 75);
    
                    //
                    //
                    // Dragging
    
                    var startPosXInTt = 0, startPosYInTt = 0;
    
                    var tt_move = function (event) {
                        $tooltip.css({
                            left: event.clientX - startPosXInTt,
                            top: event.clientY - startPosYInTt
                        });
                    };
    
                    $tooltip.find('.' + ke.getPrefix() + 'unpinned-utils').on('mousedown', function (event) {
                        if (event.which === 1) {
                            startPosXInTt = event.clientX - parseInt($tooltip.css('left'));
                            startPosYInTt = event.clientY - parseInt($tooltip.css('top'));
    
                            $(window).on('mousemove', tt_move);
                        }
                    });
                    $(window).on('mouseup', function () {
                        $(window).off('mousemove', tt_move);
                    });
    
                    //
                    //
                    // Closing
    
                    $('.' + ke.getPrefix() + 'close-unpinned').on('click', function (event) {
                        var $to_close_tooltip = $(ke.ext.util.selectorsUtil.getTooltipWrapRecursively(event.target));
                        $to_close_tooltip.fadeOut(125, 'easeInOutQuint', function () {
                            $(this).remove();
                        });
                    });
    
                    chrome.runtime.sendMessage({
                        action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                        cat: 'tooltip',
                        event: 'unpin'
                    });
                }
            });
        },

        settings: function () {
            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'opt', 'newTab'),
                url: chrome.extension.getURL('/pages/public/options.html#3,tooltip')
            });

            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                cat: 'tooltip',
                event: 'settings'
            });

            ke.ext.util.storageUtil.requestBackgroundOption('setVal', ['new_settings_counter', 10]);
        },

        useLocalizedInfoWarn: function () {
            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                cat: 'tooltip',
                event: 'use-sw-warn'
            });
        },

        closeInlineOption: function (event) {
            event.stopPropagation();

            var ttid = +$(this).data('ttid');
            var option = $(this).parent().data('option');

            $(this).parent().slideUp(125, 'easeInOutQuint', function () {
                $(this).remove();
                $('.' + ke.getPrefix() + 'hsw-' + ttid).removeClass(ke.getPrefix() + 'with-info-warn');
                ke.particles.scrollbars.model.setupHelpSelectedScroll(ttid, 0);
            });

            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                cat: 'tooltip',
                event: 'inline-option-close',
                subevent: option
            });
        },

        disableInlineOption: function () {
            var option = $(this).data('option');

            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'option', 'disableOption'),
                option: option
            });

            chrome.runtime.sendMessage({
                action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                cat: 'tooltip',
                event: 'inline-option-disable',
                subevent: option
            });

            $(this)
                .addClass(ke.getPrefix() + 'disabled')
                .find('span')
                .html(ke.getLocale('Tooltip_InlineOptionDisabled'));
        },

        zendesk_observer: null,

        checkZendeskTickets: function() {
            ke.app.handlers.zendesk_observer = new MutationObserver(function (mutations) {
                if (/zendesk.com\/agent\/tickets\/([0-9]+)/.test(document.location.href)) {
                    ke.ext.util.storageUtil.requestBackgroundOption('setVal', ['zendesk_user', true]);
                    
                    if (ke.app.handlers.zendesk_observer) {
                        ke.app.handlers.zendesk_observer.disconnect();
                    }
                }
            });

            ke.app.handlers.zendesk_observer.observe(document.querySelector('body'), {
                childList: true,
                subtree: true
            });
        },

        onPageLangDropdownValueChanged: (serial, v) => {
            //console.log('selector value changed:', serial, v);
            // move it to `handlers`

            if (serial === 3) {
                ke.particles.lang_selectors.model.onFullPageLangDropdownChange(serial, v, null, false, () => {
                    onFPLangSelectorValueChanged(serial, v);
                });
            } else {
                ke.particles.lang_selectors.model.onLangDropdownChange(serial, v, null, false, () => {
                    if (serial === 1) {
                        ke.particles.translate_ctt.model.showTranslation(
                            null,
                            v,
                            ke.app.handlers.lastTranslationCallArgs.to,
                            ke.app.handlers.lastTranslationCallArgs.doc,
                            ke.app.handlers.lastTranslationCallArgs.iframe,
                            'lang-changed'
                        );
                        //$tt.find('.' + ke.getPrefix() + 'from-flag').attr('src', ke.pathToExt + 'res/images/flags/' + v + '@2x.png');
                    } else if (serial === 2) {
                        // also re-translate, of course
                        //$tt.find('.' + ke.getPrefix() + 'to-flag').attr('src', ke.pathToExt + 'res/images/flags/' + v + '@2x.png');
                        ke.particles.translate_ctt.model.showTranslation(
                            null,
                            ke.app.handlers.lastTranslationCallArgs.from,
                            v,
                            ke.app.handlers.lastTranslationCallArgs.doc,
                            ke.app.handlers.lastTranslationCallArgs.iframe,
                            'lang-changed'
                        );
                    }
                });
            }
        },

        onPageLangDropdownOpened: (serial, ot) => {
            if (serial === 3) {
                ke.particles.scrollbars.model.setupFPDropdownScroll(ot);
            } else {
                ke.particles.lang_selectors.model.onOpen(serial, ot);
            }
        },

        netflix: {
            prevSubtitles: '',

            handleNavigation: function () {
                var unload = function () {
                    clearInterval(ke.app.temp.subtitle_update_int);
                    ke.app.temp.wordlist_id = null;
                    ke.app.flags.netflix_player_loaded = false;
                    ke.app.temp.landing_href = document.location.href;
                };

                if (document.location.href !== ke.app.temp.landing_href
                    && document.location.href.indexOf('https://www.netflix.com/watch/') > -1) {

                    //console.log('load');

                    // load the subtitle translator
                    // first unload is it's the next episode e.g.
                    unload();

                    ke.app.temp.landing_href = document.location.href;
                    ke.app.initNetflixSubtitleTranslator();
                } else if (ke.app.temp.landing_href.indexOf('https://www.netflix.com/watch/') > -1
                    && document.location.href.indexOf('https://www.netflix.com/watch/') === -1) {

                    //console.log('unload');

                    // unload the translator
                    unload();
                }
            },

            parseAndShowSubtitle: function ($pieces) {
                $pieces.hide();

                var full_text_subtitle = '';

                $pieces.each(function () {
                    full_text_subtitle += ' ' + $(this).text();
                });

                full_text_subtitle = full_text_subtitle.replace(/  /g, ' ');

                // update subtitles position only if it's changed
                if (ke.app.temp.bottom_controls_height !== ke.app.temp.prev_bottom_controls_height
                    || ke.app.handlers.netflix.prevSubtitles !== full_text_subtitle) {

                    ke.app.temp.prev_bottom_controls_height = ke.app.temp.bottom_controls_height;

                    $('.' + ke.getPrefix() + 'mate-subtitle-wrap')
                        .css('bottom', parseInt(ke.app.temp.bottom_controls_height) + 16);
                }

                if (ke.app.handlers.netflix.prevSubtitles === full_text_subtitle) {
                    // not updating the contents when they're the same
                    return;
                }

                ke.app.handlers.netflix.prevSubtitles = full_text_subtitle;

                ke.app.handlers.netflix.showClickableSubtitle(full_text_subtitle);
            },

            play: function () {
                if ($('div[data-uia="player"]').hasClass('inactive')) {
                    $('div[data-uia="player"]').trigger('click'); // show the player
                }
                $('button[data-uia="control-play-pause-play"]').trigger('click');
            },

            pause: function () {
                if ($('div[data-uia="player"]').hasClass('inactive')) {
                    $('div[data-uia="player"]').trigger('click'); // show the player
                }
                $('button[data-uia="control-play-pause-pause"]').trigger('click');
            },

            getEpisodeName: function () {
                var episode_name = ke.app.temp.netflix_episode_name
                    ? ' – ' + ke.app.temp.netflix_episode_name || ''
                    : '';
                var episode_code = ke.app.temp.netflix_episode_code
                    ? ' (' + ke.app.temp.netflix_episode_code + ')'
                    : '';

                return ke.app.temp.netflix_title + episode_name + episode_code;
            },

            save: function (event) {
                var $that = $(this);

                ke.ext.util.storageUtil.requestProStatus((is_pro) => {
                    if (!is_pro) {
                        let plan = '';
                        if (ke.isSubscriptionBased) {
                            plan = 'annual,';
                        }
                        chrome.runtime.sendMessage({
                            action: ke.processCall('app', 'opt', 'newTab'),
                            url: chrome.extension.getURL('/pages/public/options.html#start_purchase,' + plan + 'netflix-phrasebook-saving')
                        });
                        
                        chrome.runtime.sendMessage({
                            action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                            cat: 'tooltip',
                            event: 'netflix',
                            subevent: 'upgrade-for-saving-to-pb'
                        });
                    } else {
                        chrome.runtime.sendMessage({
                            action: ke.processCall('app', 'phrasebook', 'addPhrase'),
                            wl_name: ke.app.handlers.netflix.getEpisodeName(),
                            phrase: ke.particles.three_dots.model.getOriginalWord(event),
                            from: ke.app.temp.netflix_subtitles_lang,
                            to: ke.app.temp.to_lang,
                            usageExample: ke.app.handlers.netflix.capturedSubtitle
                        }, function (data) {
                            ke.app.temp.wordlist_id = data.parent_wordlist_key;
        
                            $that.addClass(ke.getPrefix() + 'netflix-saved-state').html('SAVED!');
        
                            ke.app.handlers.netflix.play();
        
                            chrome.runtime.sendMessage({
                                action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                                cat: 'pb',
                                event: 'phrase-add',
                                subevent: 'from-netflix'
                            });
        
                            chrome.runtime.sendMessage({
                                action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                                cat: 'tooltip',
                                event: 'netflix',
                                subevent: 'save'
                            });
                        });
                    }
                });                
            },

            'continue': function () {
                ke.ui.tooltip.simple.close(true);
                ke.app.handlers.netflix.play();

                chrome.runtime.sendMessage({
                    action: ke.processCall('app', 'commands', 'sendAnalyticsEvent'),
                    cat: 'tooltip',
                    event: 'netflix',
                    subevent: 'continue'
                });
            },

            fetchWordlistId: function () {
                chrome.runtime.sendMessage({
                    action: ke.processCall('app', 'phrasebook', 'getWordlistIdByName'),
                    wl_name: ke.app.handlers.netflix.getEpisodeName(),
                    from: ke.app.temp.netflix_subtitles_lang,
                    to: ke.app.temp.to_lang
                }, function (id) {
                    ke.app.temp.wordlist_id = id;
                });
            },

            viewSavedWords: function () {
                if (ke.app.temp.wordlist_id) {
                    chrome.runtime.sendMessage({
                        action: ke.processCall('app', 'opt', 'newTab'),
                        url: chrome.extension.getURL("/pages/public/phrasebook.html#wl-" + ke.app.temp.wordlist_id)
                    });
                }
            },

            setNewParsedSubtitleLang: function (new_lang) {
                new_lang = new_lang.replace(/ \[.*\]/, '');

                var netflix_locale = document.querySelector('html')
                    .getAttribute('lang')
                    .split('-')
                    .shift();
                var langs = ke.ext.const.netflix_langs[netflix_locale] || ke.ext.const.netflix_langs['en'];
                var split_langs = new_lang.split(' ');

                //
                // European Spanish is just Spanish for us, e.g.
                //

                if (split_langs.length > 1) {
                    var temp_lang;

                    //
                    // Check the full language name, too
                    // E.g., Traditional Chinese or Simplified Chinese
                    //
                    split_langs.push(new_lang);

                    split_langs.forEach(function (lang) {
                        var lang_code = langs[ ke.ext.string.getTitleCase(lang) ];

                        if (lang_code && lang_code !== 'auto') {
                            temp_lang = lang_code;
                        }
                    });

                    if (!temp_lang) {
                        // couldn't find any meaninful language code
                        ke.app.temp.netflix_subtitles_lang = 'auto';
                    } else {
                        ke.app.temp.netflix_subtitles_lang = temp_lang;
                    }
                } else {
                    ke.app.temp.netflix_subtitles_lang = langs[ ke.ext.string.getTitleCase(split_langs[0]) ] || 'auto';
                }

                //console.log('set lang:', ke.app.temp.netflix_subtitles_lang);
            },

            onSubtitlesLangChange: function () {
                var $that = $(this);

                var u = setInterval(function () {

                    var $subtitles_langs = $that.next().find('.track-list-subtitles .track');

                    if ($subtitles_langs.length > 0) {
                        clearInterval(u);

                        $subtitles_langs.on('click', function () {
                            var new_lang = $(this).text();

                            setTimeout(function () {
                                ke.app.handlers.netflix.setNewParsedSubtitleLang(new_lang);
                                ke.app.handlers.netflix.fetchWordlistId();
                            }, 250);
                        });
                    }
                }, 250);
            },

            showClickableSubtitle: function (text) {
                ke.ui.tooltip.simple.close(true);

                $('.' + ke.getPrefix() + 'mate-subtitle-wrap').fadeOut(150, function () {
                    $(this).remove();
                });

                if (!text) {
                    return;
                }

                var words_html = text
                    .replace(/&nbsp;/g, ' ')
                    .replace(ke.ext.string.hackRegex(/((?!br\b)\b(\p{L}|\')+)/g),
                        '<span class="' + ke.getPrefix() + 'clickable-mate-subtitle">$1</span>');

                $('<div>')
                    .addClass(ke.getPrefix() + 'mate-subtitle-wrap')
                    .css('font-size', ke.app.temp.netflix_subtitles_fontsize)
                    .css('bottom', (parseInt(ke.app.temp.bottom_controls_height) || 0) + 16)
                    .html(words_html)
                    .appendTo('.watch-video--player-view')
                    .find('.' + ke.getPrefix() + 'clickable-mate-subtitle')
                    .on('click', ke.app.handlers.netflix.translate);
            },

            translate: function () {
                ke.app.handlers.netflix.capturedSubtitle = ke.app.handlers.netflix.prevSubtitles
                    .replace(/<br>/g, ' ')
                    .replace(/&nbsp;/g, ' ');

                var word = $(this).html();
                ke.app.handlers.netflix.pause();

                var pos = ke.ext.dom.getPosition(this);
                var w = $(this).width();
                var h = $(this).height();

                chrome.runtime.sendMessage({
                    action: ke.processCall('app', 'option', 'getMainLanguagePair'),
                    identificator: 'tooltip'
                }, function (l_data) {
                    ke.app.handlers.lastTranslationCallArgs.doc = null;
                    ke.app.handlers.lastTranslationCallArgs.iframe = null;

                    ke.app.handlers.lastTranslationCallArgs.text = word;
                    ke.app.handlers.lastTranslationCallArgs.selectionBB = {
                        left: pos[0],
                        top: pos[1],
                        width: w,
                        height: h
                    };

                    ke.app.temp.to_lang = l_data.to_lang;

                    ke.particles.translate_ctt.model.showTranslation(undefined, ke.app.temp.netflix_subtitles_lang, l_data.to_lang, null, null, 'netf');
                });
            }
        },

        _processEventHandlers: {
            app: {
                audio: {},

                trans: {
                    getSelectedText: function (data, sendResponse) {
                        sendResponse(ke.particles.translate_ctt.model.getSelectedText());
                    },

                    displayAsTooltip: function (data, sendResponse) {
                        if (pl.empty(ke.app.temp.windows)) {
                            ke.particles.translate_ctt.model.showTranslation(data.message, data.from, data.to, null, null, 'context-menu');
                        } else {
                            try {
                                pl.each(ke.app.temp.windows, function (k, v) {
                                    if (!v || !v.getSelection() || !v.getSelection().toString()) {
                                        return;
                                    }

                                    ke.particles.translate_ctt.model.showTranslation(data.message, data.from, data.to, ke.app.temp.windows[k], ke.app.temp.iframes[k], 'context-menu');
                                });
                            } catch (e) {
                            }
                        }
                    },

                    fullPage: function (data, sendResponse) {
                        tryShowingMateBar(true); // true – forced show, i.e. override possible "never show" options
                    }
                }
            }
        }
    });
})();