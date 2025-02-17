(function (undefined) {
    pl.extend(ke.particles.lang_selectors.model, {
        onOpen: function (serial, ot) {
            if (ke.is_touch_device()) return;

            if (serial === 1) {
                ke.particles.scrollbars.model.setupFromWindowDropdownScroll(ot);
            } else if (serial === 2) {
                ke.particles.scrollbars.model.setupToWindowDropdownScroll(ot);
            }
        },

        onFullPageLangDropdownChange: function(serial, v, prev_val, skipTranslation, callback) {
            ke.ext.util.storageUtil.requestBackgroundOption('setVal', ['fp_to_lang', v], () => {
                // no need to update the context menu as FP language is separate from CM/toolbar/tooltip ones
                // -=-=-=-
                
                if (typeof callback === 'function') {
                    callback();
                }
            });
        }, 

        onLangDropdownChange: function (serial, v, prev_val, skipTranslation, callback) {
            ke.ext.util.storageUtil.chainRequestBackgroundOption([
                {fn: 'getVal', args: ['from_lang']},
                {fn: 'getVal', args: ['to_lang']}
            ], function (r) {
                var from = r[0].response;
                var to = r[1].response;

                var opposite_lang;
                var args = null;

                if (serial === 1) {
                    opposite_lang = to;
                    args = ['from_lang', v];
                    
                    if (ke.section !== 'content') {
                        ke.particles.translate.model.toggleControls();
                    }
                } else if (serial === 2) {
                    opposite_lang = from;
                    args = ['to_lang', v];
                    
                    if (ke.section !== 'content') {
                        ke.app.temp.toLang = v;
                    }
                }

                ke.ext.util.storageUtil.chainRequestBackgroundOption([
                    {fn: 'getArrayValLen', args: ['recently_used_lang']},
                    {fn: 'spliceBySearch', args: ['recently_used_lang', opposite_lang]},
                    {fn: 'addArrayVal', args: ['recently_used_lang', v]},
                    {fn: 'setVal', args: args}
                ], function (responses) {
                    if (skipTranslation !== true && ke.section !== 'content') {
                        ke.particles.translate.model.translateSimple(undefined, true);
                    }

                    var ru_len = responses[0].response;
                    if (ru_len >= 8) {
                        for (var i = ru_len; i > 8; --i) {
                            ke.ext.util.storageUtil.requestBackgroundOption('popArrayVal', ['recently_used_lang']);
                        }
                    }

                    var spliced = responses[1].response;

                    if (!pl.empty(spliced)) {
                        ke.ext.util.storageUtil.requestBackgroundOption('addArrayVal', ['recently_used_lang', spliced]);
                    }

                    // still need to re-generate that html even if it's a content page
                    // we're using the same language pair all over the app
                    // so those changes need to be reflected also in the toolbar window
                    chrome.runtime.sendMessage({
                        action: ke.processCall('app', 'opt', 'generateDropdownHtml')
                    }, function (data) {
                        if (ke.section !== 'content') {
                            ke.app.initDropdown();
                        }
                    });

                    chrome.runtime.sendMessage({
                        action: ke.processCall('app', 'option', 'updateContextMenu')
                    });

                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            });
        },

        removeRecentLanguage: function (event) {
            var lang = $(this).prev().attr('val');

            ke.ext.util.storageUtil.requestBackgroundOption('spliceBySearch', ["recently_used_lang", lang]);

            event.stopPropagation();

            $(this).parent().slideUp(ke.getAnimSpeed('slide_up'), ke.getAnimType('slide_up'));
            $('.lang-' + lang).removeClass('hidden');

            ke.ext.util.storageUtil.requestBackgroundOption('isEmptyArray', ['recently_used_lang'], function (is_empty) {
                if (is_empty) {
                    $('.group').slideUp(ke.getAnimSpeed('slide_up'), ke.getAnimType('slide_up'), function () {
                        if (!ke.is_touch_device()) {
                            if (ke.ui.dropdown.data.openedOptionsSerial === 1) {
                                ke.particles.scrollbars.model.setupFromWindowDropdownScroll();
                            } else if (ke.ui.dropdown.data.openedOptionsSerial === 2) {
                                ke.particles.scrollbars.model.setupToWindowDropdownScroll();
                            }
                        }
                    });
                }
            });
        }
    });

})();