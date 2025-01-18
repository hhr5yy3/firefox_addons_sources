(function() {
    window.ConstructFixAllSettingItem = function(response) {
        // construct data now.
        var li = TMExt_$('<li/>');

        var title = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_title'
        });
        
        var title_icon = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_title_icon'
        });
        
        var title_wording = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_title_wording',
            text : response['Title']
        });
    
        title.append(title_wording).append(title_icon);
    
        var current = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_current'
        });
        
        var current_icon = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_current_icon'
        });
        
        var current_wording = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_current_wording',
            text : response['PossibleValue'][response['Current']]
        });
        
        current.append(current_icon).append(current_wording);
        
        var toIcon = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_toIcon'            
        });
        
        var suggestion = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_suggestion'
        });
        
        var suggestion_icon = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_suggestion_icon'
        });
        
        var suggestion_wording = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_suggestion_wording',
            text : response['PossibleValue'][response['Suggestion']]
        });
        
        suggestion.append(suggestion_icon).append(suggestion_wording);
        
        var setting = TMExt_$('<div/>', {
            'class' : 'Setting_display_none',
            text : JSON.stringify(response)
        });

        var div_privacy_item_content = TMExt_$('<div/>', {
            'class' : 'fixAll_item_content_title_ul_li_content'
        }).append(title).append(current).append(toIcon).append(suggestion).append(setting);

        li.append(div_privacy_item_content);

        return li;
    };
        
    window.ConstructEnableToolbar = function() {
        var div = TMExt_$('<div/>', {
            'class' : 'alertInTabContentArea'
        });

        var p = TMExt_$('<p/>', {
            'class' : 'enable_toolbar_wording',
            text : GetPSL10NString('ENABLE_TOOLBAR_HINT')
        });
        
        var getHelpLink = TMExt_$('<a/>', {
            'class' : 'get_help_link',
            'target' : '_blank',
            text : GetPSL10NString('GET_MORE_HELP')
        });
        
        getHelpLink.click(function(){
            window.open(GetPSL10NString('ENABLE_TOOLBAR_LINK'));
        })
        
        p.append(getHelpLink);
        div.append(p);
        return div;
    };
    
    window.ConstructAlertMessageOverContent_loading = function(params) {
        var div = TMExt_$('<div/>', {
            'class' : 'alertOverTabContentArea'
        });

        var div_wrapper = TMExt_$('<div/>', {
            'class' : 'alertOverTabContentArea_wrapper_loading'
        });

        div.append(div_wrapper)

        return div;
    };

    window.ConstructAlertMessageOverContent = function(params) {
        var div = TMExt_$('<div/>', {
            'class' : 'alertOverTabContentArea'
        });

        var div_wrapper = TMExt_$('<div/>', {
            'class' : 'alertOverTabContentArea_wrapper'
        });
        
        
        
        var div_wrapper_content = TMExt_$('<div/>', {
            'class' : 'alertOverTabContentArea_wrapper_content'
        });
        
        
        
        div_wrapper.append(div_wrapper_content);
        
        div.append(div_wrapper);
        
        if(params['closeButton']){
            var close_button = TMExt_$('<div/>', {
                'class' : 'overlay_container_closeButton'
            });
            close_button.click(params['closeEvent']);
            div_wrapper_content.append(close_button);
        }
        
        if(params.head) {
            var div_head = TMExt_$('<div/>', {
                'class' : 'alertOverTabContentArea_head'
            });
            div_wrapper_content.append(div_head);
            div_head.html(params.head);
        }
        
        div_wrapper_content.append(TMExt_$('<div/>', {
            'class' : 'overlay_container_content'
        }));
        div_wrapper_content.find(".overlay_container_content").html(params['title']);
        
        /*
            divider
        */
        div_wrapper_content.append(TMExt_$('<div/>', {
            'class' : 'overlay_container_content_divider'
        }));
        
        if (params['buttons']) {
            var div_buttonArea = TMExt_$('<div/>', {
                'class' : 'overlay_container_buttonArea'
            });
            div_wrapper_content.append(div_buttonArea)
        }
        
        if (params['buttons']) {            
            if(params['buttons'].length == 1){
                var button = TMExt_$('<button/>', {
                    'class' : 'btn_silver overlay_container_ok_only',
                    text : params['buttons'][0]["title"]
                });
                button.click(params['buttons'][0]["callback"])
                div_buttonArea.append(button)
            }else if(params['buttons'].length == 2){
                var button_0 = TMExt_$('<button/>', {
                    'class' : 'btn_blue overlay_container_ok',
                    text : params['buttons'][0]["title"]
                });
                button_0.click(params['buttons'][0]["callback"])
                
                var button_1 = TMExt_$('<button/>', {
                    'class' : 'btn_silver overlay_container_cancel',
                    text : params['buttons'][1]["title"]
                });
                button_1.click(params['buttons'][1]["callback"])
                
                div_buttonArea.append(button_1).append(button_0)
            }
        }
        
        if (params['checkBox']) {
            var label = TMExt_$('<label/>', {
                'class' : 'dont_mention_again_area'
            });
                        
            var input = TMExt_$('<input/>', {
                'class' : 'dont_mention_again_area_input',
                'type' : 'checkbox',
                'checked' : false
            });
            input.click(function(){
                params['checkBox']["callback"](input.is(':checked'))
            });
            label.append(input).append(params['checkBox']["title"])
            
            div_buttonArea.append(label)
        }

        return div;
    };
    
    window.ConstructAlertMessageFixAll = function(contentDom, closeEvent, fixAllEvent, cancelEvent) {
        var div = TMExt_$('<div/>', {
            'class' : 'alertOverTabContentArea'
        });
        
        var div_overlay_quickFix_contentWrapper = TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_contentWrapper'
        });
        
        var div_overlay_quickFix_content = TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_content'
        });
        
        div_overlay_quickFix_contentWrapper.append(div_overlay_quickFix_content);
        
        div.append(div_overlay_quickFix_contentWrapper);
        
        /*
            header
        */
        var div_overlay_quickFix_header = TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_header'
        }).append(TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_content_title',
            text : GetPSL10NString('QUICKFIX_TITLE')
        })).append(TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_content_secondTitle',
            text : GetPSL10NString('QUICKFIX_DESCRIPTION')
        }));
        
        var div_overlay_quickFix_closeButton = TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_closeButton'
        });
        
        div_overlay_quickFix_closeButton.click(closeEvent);
        
        //div_overlay_quickFix_header.append(div_overlay_quickFix_closeButton);
        div_overlay_quickFix_content.append(div_overlay_quickFix_closeButton);
        div_overlay_quickFix_content.append(div_overlay_quickFix_header);
        
        /*
            setting and changes
        */
        var div_overlay_quickFix_content_settingAndChanges = TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_content_settingAndChanges'
        });
        
        var div_overlay_quickFix_content_settingAndChanges_textArea = TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_content_settingAndChanges_textArea'
        }).append(TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_content_settingAndChanges_shadowline_setting',
            text : GetPSL10NString('QUICKFIX_SETTING')
        })).append(TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_content_settingAndChanges_shadowline_current',
            text : GetPSL10NString('QUICKFIX_CURRENT')
        })).append(TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_content_settingAndChanges_shadowline_changes',
            text : GetPSL10NString('QUICKFIX_NEW')
        }));

        
        div_overlay_quickFix_content_settingAndChanges.append(div_overlay_quickFix_content_settingAndChanges_textArea);
        
        div_overlay_quickFix_content.append(div_overlay_quickFix_content_settingAndChanges);
        
        /*
            ul content
        */
        var ul_overlay_quickFix_content_ul = TMExt_$('<ul/>', {
            'class' : 'overlay_quickFix_content_ul'
        });
        div_overlay_quickFix_content.append(ul_overlay_quickFix_content_ul)

        var setting_div_list = contentDom.find('.Setting_display_none');
        for (var i = 0; i < setting_div_list.length; i++) {
            // display each setting
            var jsonSetting = TMExt_$.parseJSON(setting_div_list.eq(i).text());
            if (isSettingRisky(jsonSetting['Current'], jsonSetting['Risk'])) {
                ul_overlay_quickFix_content_ul.append(ConstructFixAllSettingItem(jsonSetting));
            } else {
                continue;
            }
        }
            
        /*
            button area
        */
        var div_overlay_quickFix_content_buttonArea = TMExt_$('<div/>', {
            'class' : 'overlay_quickFix_content_buttonArea'
        });
        
        var div_overlay_quickFix_content_buttonArea_cancel = TMExt_$('<button/>', {
            'class' : 'btn_silver overlay_quickFix_content_buttonArea_cancel',
            text : GetPSL10NString('QUICKFIX_FIXALL_CANCEL')
        });
        div_overlay_quickFix_content_buttonArea_cancel.click(cancelEvent)
        
        var div_overlay_quickFix_content_buttonArea_fixAll = TMExt_$('<button/>', {
            'class' : 'btn_red overlay_quickFix_content_buttonArea_fixAll',
            text : GetPSL10NString('QUICKFIX_FIXALL_BUTTON')
        })
        div_overlay_quickFix_content_buttonArea_fixAll.click(fixAllEvent)
        
        div_overlay_quickFix_content_buttonArea.append(div_overlay_quickFix_content_buttonArea_cancel).append(div_overlay_quickFix_content_buttonArea_fixAll)
        
        div_overlay_quickFix_content.append(div_overlay_quickFix_content_buttonArea);

        return div;
    };
})();
