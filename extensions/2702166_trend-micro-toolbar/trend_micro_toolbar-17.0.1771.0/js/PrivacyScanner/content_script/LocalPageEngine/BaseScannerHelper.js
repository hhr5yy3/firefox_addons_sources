(function() {
    window.BaseScannerHelper = function(Item) {
        var that = this;
        this.tablistDom = TMExt_$('.tabs_li');
        this.tabContentlistDom = TMExt_$('#tabsContent>div');

        var disableButtonOfTabContent_Common = function(contentDom) {
            var save_button = contentDom.find('.changesMade_area_saveChanges');
            save_button.css('opacity', 0.5);

            var fix_button = contentDom.find('.fix_all_area_fix');
            fix_button.css('opacity', 0.5);

            var selector_list = contentDom.find('.privacy_item_content_current');
            for (var i = 0; i < selector_list.length; i++) {
                // skip facebook application's button items
                if (selector_list.eq(i).parent().hasClass("beFacebookApplications") || selector_list.eq(i).parent().hasClass("beFacebookSubApplications")) {
                    continue;
                }
                selector_list.eq(i).addClass('button_disabled_silver_inline');
                selector_list.eq(i).css('opacity', 0.5);
            }
        };

        var enableButtonOfTabContent_Common = function(contentDom) {
            var save_button = contentDom.find('.changesMade_area_saveChanges');
            save_button.css('opacity', 1);

            var fix_button = contentDom.find('.fix_all_area_fix');
            fix_button.css('opacity', 1);

            var selector_list = contentDom.find('.privacy_item_content_current');
            for (var i = 0; i < selector_list.length; i++) {
                // skip facebook application's button items
                if (selector_list.eq(i).parent().hasClass("beFacebookApplications") || selector_list.eq(i).parent().hasClass("beFacebookSubApplications")) {
                    continue;
                }
                selector_list.eq(i).removeClass('button_disabled_silver_inline');
                selector_list.eq(i).css('opacity', 1);
            };
        }

        this.disableButtonOfTabContent = function() {
            disableButtonOfTabContent_Common(this.contentDom)
        }
        this.enableButtonOfTabContent = function() {
            enableButtonOfTabContent_Common(this.contentDom)
        }
    
        this.UpdateNumberOfConcerns = function() {
            // calculate number of concerns based on concerns list shown on screen
            var tab = that.tabDom;
            var content = that.contentDom;
    
            var numberOnTab = tab.find('.status');
            numberOnTab.removeClass('unknown');
            numberOnTab.removeClass('noConcern');
    
            var numberOnTabContent = content.find('.how_many_privacy_concerns');
            var have_no_concerns_title = content.find('.have_no_concerns_title');
    
            if (have_no_concerns_title.length != 0) {
                numberOnTab.text('0');
                numberOnTab.addClass('noConcern');
                return;
            }
    
            if (numberOnTabContent.length == 0) {
                numberOnTab.text('?');
                numberOnTab.addClass('unknown');
                return;
            }
    
            var concerns_list = content.find('.privacy_item_content');
            var count = 0;
            for (var i = 0; i < concerns_list.length; i++) {
                // count the facebook application's count as concern count
                if (concerns_list.eq(i).hasClass("bFacekookApplications")) {
                    var applyAllButton = concerns_list.eq(i).find("button.settingItem");
                    
                    var appCount = Number(applyAllButton.attr("count"));
                    if (appCount) {
                        count += appCount;
                    }
                    
                } else {
                
                    var settingJSON = TMExt_$.parseJSON(concerns_list.eq(i).find('.Setting_display_none').text());
                    var risk = settingJSON['Risk'];
                    if (isSettingRisky(settingJSON['Current'], risk)) {
                        count++;
                    }
                }
            }
            numberOnTab.text(count);
    
            if (count == 1) {
                var wording_how_many_concern = GetPSL10NString('CONCERN_TITLE_ONE_CONCERN').replace('%d','<span class="how_many_privacy_concerns_number">' + count + '</span>');
            } else {
                var wording_how_many_concern = GetPSL10NString('CONCERN_TITLE').replace('%d','<span class="how_many_privacy_concerns_number">' + count + '</span>');
            }
            numberOnTabContent.html(wording_how_many_concern);
        };
        
        this.get_tabContent_Content = function() {
            return this.contentDom.find('.tabsContent_content');
        }

        this.get_tabContent_Loading = function() {
            return this.contentDom.find('.tabsContent_loading');
        }

        this.get_alertInTabContentArea = function() {
            return this.contentDom.find('.alertInTabContentArea');
        }

        this.get_saveChangesArea = function() {
            return this.contentDom.find('.changesMade_area');
        }
        
        this.get_numberOfSettingsInLocalPage = function(){
            return this.contentDom.find('.Setting_display_none').length;
        }
        
        this.get_alertOverTabContentArea = function() {
            return this.contentDom.find('.alertOverTabContentArea');
        }
        
        this.get_alertMessageOverTabContent_loading = function() {
            return this.contentDom.find('.alertOverTabContentArea_wrapper_loading');
        }
        
        this.alertMessageOverTabContent_loading = function() {
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent_loading());
        }
        
        this.removeMessageOverTabContent = function() {
            var selectedSite = TMExt_$('#tabs .selected').attr('siteorbrowsername');

            // send ubm
            window.browser.runtime.sendMessage({
                action: "feedbackUBM", 
                params: {
                    event: "PSLocalPage_" + selectedSite + "_AlertPopup_Cancel_Click",
                    value: 1
                }
            });

            var alertOverTabContentArea = that.get_alertOverTabContentArea();
            if(alertOverTabContentArea.length > 0){
                alertOverTabContentArea.remove();
                that.enableButtonOfTabContent();   
            }
        }
        
        this.alertMessageInTabContent = function(alertDiv) {
            /*
             If there is already a error message in tabContent, do not show again.
             */
            var alertInTabContentArea = that.get_alertInTabContentArea()
            if (alertInTabContentArea.length > 0) {
                // already have error message in tabContent
                return;
            }
            this.get_tabContent_Loading().hide()
            this.get_tabContent_Content().empty()
            this.get_tabContent_Content().append(alertDiv)
            this.get_tabContent_Content().show()
            
            ReUpdateUI_Layout();
            ToolTipHelper.HideTooltip();
        }

        this.alertMessageInTabContent_enableToolbar = function() {
            that.alertMessageInTabContent(ConstructEnableToolbar())
        }
        
        this.ConstructAlertMessageInContent = function(params) {
            var that = this;
            var div = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea'
            });
            
            var div_logoArea = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_logoArea'
            }).append(TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_logo ' + that.alertLogoClassName
            }));
            
            var div_title = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_title'
            });
            
            var div_title_content = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_title_content',
                text : params['title']
            });
            
            div_title.append(div_title_content);
            
            div.append(div_logoArea).append(div_title);
            
            if (params['button_content']) {
                var div_ok = TMExt_$('<button/>', {
                    'class' : 'btn_red alertInTabContentArea_button',
                    text : params['button_content']
                });
    
                div_ok.click(params['callback']);
    
                div.append(div_ok);
            }
            
            return div;
        };
        
        this.ConstructAlertMessageBusyFixing = function() {
            var that = this;
            
            var div = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea'
            });
            
            var div_logoArea = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_logoArea'
            }).append(TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_logo ' + that.alertLogoClassName
            }));
            
            var div_title = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_title',
                text : GetPSL10NString('BUSY_FIXING_HINT')
            });
            
            var div_image = TMExt_$('<div/>', {
                'class' : 'image_busy_fixing'
            });
                
            div.append(div_logoArea).append(div_title).append(div_image);
    
            return div;
        };
        
        this.ConstructAlertMessageGooglePonIE8 = function() {
            var that = this;
            
            var div = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea'
            });
            
            var div_logoArea = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_logoArea'
            }).append(TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_logo ' + that.alertLogoClassName
            }));
            
            var div_title = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_title',
                text : GetPSL10NString('fb_google_plus_on_IE8')
            });
            div.append(div_logoArea).append(div_title);
            return div;
        };
		
		this.ConstructAlertMessageTwitterOnIE9 = function() {
            var that = this;
            
            var div = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea'
            });
            
            var div_logoArea = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_logoArea'
            }).append(TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_logo ' + that.alertLogoClassName
            }));
            
            var div_title = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_title',
                text : GetPSL10NString('fb_twitter_on_IE9')
            });
            div.append(div_logoArea).append(div_title);
            return div;
        };
        
        this.ConstructAlertMessageInContent_titleLink = function(params) {
            var div = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea'
            });
            
            var div_logoArea = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_logoArea'
            }).append(TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_logo ' + that.alertLogoAlertClassName
            }));
            
            var div_title = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_title withLink'
            });
            
            div.append(div_logoArea).append(div_title);
            
            var div_title_wording = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_title_content',
                text : params['title']['wording']
            });
            
            var learnMore_wrapper = TMExt_$('<div/>', {
                'class' : 'alertInTabContentArea_titleWithLearnMore_learnMore_wrapper'
            });
            
            var a_title_learnMore = TMExt_$('<a/>', {
                'class' : 'alertInTabContentArea_titleWithLearnMore_learnMore',
                text : params['title']['learnMore']
            });
            
            a_title_learnMore.click(params['title']['link_clickEvent'])
            
            learnMore_wrapper.append(a_title_learnMore);

            div.append(learnMore_wrapper);
                
            div_title.append(div_title_wording);
            
            if (params['button_content']) {
                var div_ok = TMExt_$('<button/>', {
                    'class' : 'btn_red alertInTabContentArea_button',
                    text : params['button_content']
                });
    
                div_ok.click(params['callback']);
    
                div.append(div_ok);
            }
    
            return div;
        };
    
        this.alertMessageInTabContent_installProduct = function() {
            that.alertMessageInTabContent(that.ConstructAlertMessageInContent({
                title : GetPSL10NString('PROMOTE_TITANIUM_CONTENT'),
                button_content : GetPSL10NString('ALERT_BUY_TITANIUM_BUTTON'),
                callback : function() {
                    window.open(GetPSL10NString('PROMOTE_TITANIUM_URL'));
                }
            }))
        };

        this.alertMessageOverTabContent = function(alertDiv) {   
            // remove loading div anyway.
            if (that.get_alertMessageOverTabContent_loading().length > 0) {
                that.get_alertOverTabContentArea().remove();
            }
                   
            /*
             If there is already a error message in tabContent, do not show again.
             */
            var alertOverTabContentArea = that.get_alertOverTabContentArea()
            if (alertOverTabContentArea.length > 0) {
                // already have pop up error message in tabContent
                return;
            }

            that.get_tabContent_Content().append(alertDiv);
            that.disableButtonOfTabContent();
            
            ReUpdateUI_Layout()
        };
        
        this.alertMessageOverTabContent_fixAll = function() {
            var fixAllPopup = ConstructAlertMessageFixAll(that.contentDom, 
                                                        that.removeMessageOverTabContent, 
                                                        that.fixAllPopupClickEvent, 
                                                        that.removeMessageOverTabContent);
            that.alertMessageOverTabContent(fixAllPopup);
            ToolTipHelper.HideTooltip();
        };
        
        this.get_numberOfConcernsInLocalPage = function(){
            var concern_list = that.contentDom.find('.privacy_item_content');
            var count = 0;
            for (var i=0; i < concern_list.length; i++) {
                var settingJSON = TMExt_$.parseJSON(concern_list.eq(i).find('.Setting_display_none').text());
                var risk = settingJSON['Risk'];
                if (isSettingRisky(settingJSON['Current'], risk)) {
                    count++;
                }
            };
            return count;    
        };
        
        this.clickTabUI = function() {
            // tab effect
            var tabs_list = this.tablistDom;
            var current_tab = this.tabDom;
            
            tabs_list.removeClass('selected');
            current_tab.addClass('selected');
    
            tabs_list.find('.content').removeClass('selected');
            current_tab.find('.content').addClass('selected');
    
            tabs_list.find('.title').removeClass('selected');
            current_tab.find('.title').addClass('selected');
    
            tabs_list.find('.status').removeClass('selected');
            current_tab.find('.status').addClass('selected');
            
            tabs_list.find('.logo').removeClass('logo_disabled').addClass('logo_disabled');
            current_tab.find('.logo').removeClass('logo_disabled');
    
            // show related tab content
            this.tabContentlistDom.hide();
            this.contentDom.show();
    
            ReUpdateUI_Layout();
            ToolTipHelper.HideTooltip();
        };
        
        this.showContent = function() {
            var loading = that.get_tabContent_Loading();
            var content = that.get_tabContent_Content();
            
            if (loading.is(":visible")) {
                loading.fadeOut(200, whenloadHideFinish);
            } else {
                loading.hide();
                whenloadHideFinish()
            }

            function whenloadHideFinish() {
                content.show();
                that.UpdateNumberOfConcerns();
                ReUpdateUI_Layout();
            }

        };
        
        this.HasNoContent = function() {    
            if (!that.get_tabContent_Content().is(':visible') && !that.get_tabContent_Loading().is(':visible')) {
                return true;
            }
            return false;
        };

        this.DoWhenFinishFixing = function(){
            var that = this;

            that.UpdateNumberOfConcerns();
            that.removeMessageOverTabContent();

            /*
             check whether we need to show congratulation -> no concerns page
             */
            if(that.get_numberOfConcernsInLocalPage() == 0){
                that.contentDom.find('.fix_all_area').remove();
                that.contentDom.find('.changesMade_wrapper').remove();
                that.contentDom.find('.ul_category_list').remove();
                that.contentDom.find('.share_area').remove();
                that.contentDom.find('.scanResultArea').append(that.ConstructHaveNoConcerns());
                that.UpdateNumberOfConcerns();
                return;
            }

            // fade out and remove the setting we have fixed
            var li_category_list = that.contentDom.find('.ul_category_list>li');
            var listNeedToSlideUp = [];
            var listNeedToDelete = [];
            if(that.get_saveChangesArea().is(":visible")){
                listNeedToSlideUp.push(that.get_saveChangesArea());
            }

            for (var index=0; index < li_category_list.length; index++) {
                var li_setting_list = li_category_list.eq(index).find('.ul_concerns_list>li');

                var settingListNeedToSlideUp = [];
                for (var j=0;  j < li_setting_list.length; j++) {
                    var settingJSON = TMExt_$.parseJSON(li_setting_list.eq(j).find('.Setting_display_none').text());
                    var risk = settingJSON['Risk'];
                    if (!isSettingRisky(settingJSON['Current'], risk)) {
                        settingListNeedToSlideUp.push(li_setting_list.eq(j));
                    }
                }

                if(settingListNeedToSlideUp.length == li_setting_list.length){
                    listNeedToSlideUp.push(li_category_list.eq(index));
                    listNeedToDelete.push(li_category_list.eq(index));
                }else{
                    for (var k=0; k < settingListNeedToSlideUp.length; k++) {
                        listNeedToSlideUp.push(settingListNeedToSlideUp[k]);
                        listNeedToDelete.push(settingListNeedToSlideUp[k]);
                    }
                }
            }

            var NeedToSlideUp = null;
            for (var i=0; i < listNeedToSlideUp.length; i++) {
                if(NeedToSlideUp == null){
                    NeedToSlideUp = listNeedToSlideUp[i];
                }else{
                    NeedToSlideUp = NeedToSlideUp.add(listNeedToSlideUp[i]);
                }
            }

            if(NeedToSlideUp) {
                NeedToSlideUp.slideUp(DURATION_TIME_SLIDE_UP_SETTINGS, function(){
                    for (var i=0; i < listNeedToDelete.length; i++) {
                        listNeedToDelete[i].remove();
                    }
                });
            }

            ReUpdateUI_Layout();
        };

        this.ConstructFixAllArea = function(count, callback) {
            var div = TMExt_$('<div/>', {
                'class' : 'fix_all_area'
            });
    
            if (count == 1) {
                var wording_how_many_concern = GetPSL10NString('CONCERN_TITLE_ONE_CONCERN').replace('%d','<span class="how_many_privacy_concerns_number">' + count + '</span>');
            } else {
                var wording_how_many_concern = GetPSL10NString('CONCERN_TITLE').replace('%d','<span class="how_many_privacy_concerns_number">' + count + '</span>');
            }
            
            var p = TMExt_$('<p/>', {
                'class' : 'how_many_privacy_concerns',
                html : wording_how_many_concern
            });
    
            var div_fix_all = TMExt_$('<button/>', {
                'class' : 'btn_red fix_all_area_fix',
                text : GetPSL10NString('FIX_ALL_TITLE')
            });
    
            var contentDom = that.contentDom;
    
            div_fix_all.click(callback);
    
            div.append(p).append(div_fix_all);
    
            return div;
        };
    
        this.RemoveSafeySetting = function(response_list) {
            var indexList = [];
    
            return TMExt_$.grep(response_list, function(value) {
                return value['Risk'].indexOf(value['Current']) != -1;
            });
        };
    
        this.FilterListByCategory = function(response_list_raw) {
            var response_list_order = that.RemoveSafeySetting(response_list_raw);
    
            var response_list = {
                count : 0
            };
    
            var countAddFlag = false;
            for (var i = 0; i < CategoryList.length; i++) {
                for (var j = 0; j < response_list_order.length; j++) {
                    if (response_list_order[j]['Category'] == CategoryList[i]) {
                        countAddFlag = true;
                        if (response_list['count'] in response_list) {
                            response_list[response_list['count']].push(response_list_order[j]);
                        } else {
                            response_list[response_list['count']] = [];
                            response_list[response_list['count']].push(response_list_order[j]);
                        }
                    }
                }
    
                if (countAddFlag) {
                    countAddFlag = false;
                    response_list['count']++;
                }
            }
    
            return response_list;
        };
        
        this.ConstructSettingItem = function(response) {
            if (!response['PossibleValue']['0']) {
                response['PossibleValue']['0'] = GetPSL10NString('SETTING_ITEM_OFF');
                response['PossibleValue']['1'] = GetPSL10NString('SETTING_ITEM_ON');
            }
           
            
            // construct data now.
            var li = TMExt_$('<li/>');
    
            // header
            var titleArea = TMExt_$('<div/>', {
                'class' : 'privacy_item_content_titleArea'
            });
    
            var title = TMExt_$('<div/>', {
                'class' : 'privacy_item_content_titleArea_title'
            });
            
            var title_wording = TMExt_$('<div/>', {
                'class' : 'privacy_item_content_titleArea_title_wording'
            });
            
            var title_wording_icon = TMExt_$('<div/>', {
                'class' : 'privacy_item_content_titleArea_title_wording_icon',
                html : "&nbsp;"
            });
            
            var title_wording_title = TMExt_$('<div/>', {
                'class' : 'privacy_item_content_titleArea_title_wording_title',
                text : response['Title']
            });
            
            title_wording.append(title_wording_icon).append(title_wording_title);
            
            title.append(title_wording);
            
            var moreInfo_area = TMExt_$('<div/>', {
                'class' : 'moreInfo_area'
            });
    
            var title_moreInfo = TMExt_$('<div/>', {
                'class' : 'privacy_item_content_titleArea_moreInfo',
                html : "&nbsp;"
            });
            
            moreInfo_area.append(title_moreInfo);
    
            title_moreInfo.on('mouseenter', function() {
                ToolTipHelper.ShowTooltip(response['Desc'], title_moreInfo);
            });
    
            title_moreInfo.on('mouseleave', function() {
                ToolTipHelper.HideTooltip();
            });
            titleArea.append(title);
    
            if (response['Title'] != response['Desc']) {
                //title.append(moreInfo_area);
                title_wording_title.append(moreInfo_area);
            }
    
            var select = TMExt_$('<div/>', {
                'class' : 'privacy_item_content_selector'
            });
            
            var current_riskImage = TMExt_$('<div/>', {
                'class' : 'privacy_item_content_current_riskImage'
            });
            
            var current_wording = TMExt_$('<div/>', {
                'class' : 'privacy_item_content_current_wording',
                text : response['PossibleValue'][response['Current']]
            });
    
            if (isSettingRisky(response['Current'], response['Risk'])) {
                current_riskImage.addClass('risk');
                current_wording.addClass('risk');
            } else {
                current_riskImage.addClass('safe');
                current_wording.addClass('safe');
            }
    
            var current = TMExt_$('<button/>', {
                'class' : 'btn_silver_inline_div privacy_item_content_current settingItem',
                'responseCurrent' : response['Current']
            }).append(current_riskImage).append(TMExt_$('<div/>', {
                'class' : 'privacy_item_content_current_arrow'
            })).append(current_wording);
    
            var ul_selector = TMExt_$('<ul/>', {
                'class' : 'privacy_item_content_ul'
            });
            ul_selector.css("z-index",99);
            var Setting_display_none = TMExt_$('<div/>', {
                'class' : 'Setting_display_none',
                text : JSON.stringify(response)
            });
    
            var current_setting_display_none = TMExt_$('<div/>', {
                'class' : 'current_setting_display_none',
                text : JSON.stringify(response['Current'])
            });
    
            function option_click_event() {
                var index = ul_selector.find('li').index(TMExt_$(this));
                ul_selector.hide();
                current_setting_display_none.text(JSON.stringify(index));
                var current_wording = current.find('.privacy_item_content_current_wording');
                current_wording.text(response['PossibleValue'][index]);
                current_wording.removeClass('risk').removeClass('safe');
                current_riskImage.removeClass('risk').removeClass('safe');
    
                var jsonSetting = TMExt_$.parseJSON(Setting_display_none.text());
                if (isSettingRisky(index, jsonSetting['Risk'])) {
                    current_wording.addClass('risk');
                    current_riskImage.addClass('risk');
                } else {
                    current_wording.addClass('safe');
                    current_riskImage.addClass('safe');
                }
                if (ul_selector.parent().hasClass("beFacebookApplications")) {
                    var beFacebookApplications = true;
                    current.attr("fixTo",index);
                    checkShowSaveChanges(beFacebookApplications);
                    
                } else {
                     checkShowSaveChanges();
                }
               
            }
    
            function construct_option_safe(response, k) {
                var option = TMExt_$('<li/>', {
                    'class' : 'privacy_item_content_selector_safe'
                }).append(TMExt_$('<div/>', {
                    'class' : 'privacy_item_content_selector_safe_icon'
                })).append(TMExt_$('<span/>', {
                    text : response['PossibleValue'][k]
                }));
                
                if (response['Suggestion'] == k) {
                    option.append(TMExt_$('<span/>', {
                        'class' : 'privacy_item_content_selector_recommend',
                        text : GetPSL10NString('SETTING_ITEM_RECOMMENDED')
                    }));
                };
    
                return option;
            }
    
            function construct_option_risk(response, k) {
                var option = TMExt_$('<li/>', {
                    'class' : 'privacy_item_content_selector_risk'
                });
                
                var option_icon = TMExt_$('<div/>', {
                    'class' : 'privacy_item_content_selector_risk_icon'
                });
                
                var option_wording = TMExt_$('<span/>', {
                    text : response['PossibleValue'][k]
                });
                
                option.append(option_icon).append(option_wording);
                
                return option;
            }
    
            if (response['Website'] == FACEBOOK && response['ID'] == '81') {
                TMExt_$.each([0, 1], function(index, item){
                    if (isSettingRisky(item, response['Risk'])) {
                        var option = construct_option_risk(response, item);
                    } else {
                        var option = construct_option_safe(response, item);
                    }
    
                    option.click(option_click_event);
                    ul_selector.append(option);
                })
            } else {
                for(var index = 0, len = response['possibleFixValue'].length; index < len; index++){
                    var k = response['possibleFixValue'][index];
                    
                    if (isSettingRisky(k, response['Risk'])) {
                        var option = construct_option_risk(response, k);
                    } else {
                        var option = construct_option_safe(response, k);
                    }
    
                    option.click(option_click_event);
                    ul_selector.append(option);
                }
                
                // for (k in response['possibleFixValue']) {
                    // if (isSettingRisky(k, response['Risk'])) {
                        // var option = construct_option_risk(response, k);
                    // } else {
                        // var option = construct_option_safe(response, k);
                    // }
//     
                    // option.click(option_click_event);
                    // ul_selector.append(option);
                // }
            }
    
            current.click(function() {
                if(!TMExt_$(this).hasClass("button_disabled_silver_inline")) {
                    ul_selector.show();
                }
            });
    
            select.append(current).append(ul_selector);
    
            select.on('mouseleave', function() {
                ul_selector.hide();
            });
    
            // select[0].selectedIndex = parseInt(response["Current"])
    
            var checkShowSaveChanges = function(bFacebookApplicationsAll) {
    
                function updateSaveNumber() {
                    
                    var saveChanges_area = that.contentDom.find('.changesMade_area');
                    var saveChanges_area_number = saveChanges_area.find('.changesMade_area_changesMade_number');
                    var number = 0;
    

               
                    var setting_list = that.contentDom.find('.privacy_item_content');
                
                    for (var i = 0; i < setting_list.length; i++) {
                        if (setting_list.eq(i).hasClass("bFacekookApplications")) {
                            if (bFacebookApplicationsAll) {
                                
                                var applyAllButton = setting_list.eq(i).find("button.settingItem");
                                var responseCurrent = applyAllButton.attr("responseCurrent")
                                var fixTo = applyAllButton.attr("fixTo")
                                if (fixTo && Number(fixTo) != Number(responseCurrent)) {
                                    var appCount = Number(applyAllButton.attr("count"));
                                    number += appCount;
                                }
                                
                            } else {
                                var individualButtons = setting_list.eq(i).find("button.subApps");
                                individualButtons.each(function(){
                                    var responseCurrent = TMExt_$(this).attr("responseCurrent")
                                    var fixTo = TMExt_$(this).attr("fixTo")
                                    if (fixTo && Number(fixTo) != Number(responseCurrent)) {
                                        number++;
                                    }
                                });
                            }
                            
                        } else {
                            var selector = setting_list.eq(i).find('.privacy_item_content_selector');
                            var setting_display_none = setting_list.eq(i).find('.Setting_display_none');
                            var jsonSetting = TMExt_$.parseJSON(setting_display_none.text());
        
                            var current_setting_display_none = setting_list.eq(i).find('.current_setting_display_none');
                            var hopeFixTo = TMExt_$.parseJSON(current_setting_display_none.text());
        
                            if (jsonSetting['Current'] != hopeFixTo) {
                                number++;
                            }
                        }
                    }
                    
                    
                    saveChanges_area_number.text(number);
                    if (number == 0) {
                        if (saveChanges_area.is(':visible')) {
                            ToolTipHelper.HideTooltip();
                            saveChanges_area.slideUp(DURATION_TIME_SLIDE_UP_SAVECHANGES, function() {                        
                                ReUpdateUI_Layout();
                            });
                        }
                    } else {
                        if (!saveChanges_area.is(':visible')) {
                            ToolTipHelper.HideTooltip();
                            saveChanges_area.show()
                            ReUpdateUI_Layout();
                            saveChanges_area.hide()
                            saveChanges_area.slideDown(DURATION_TIME_SLIDE_DOWN_SAVECHANGES, function() {
                                if(IsNeedToShowSaveChangesHint()){
                                    var save_change_button = saveChanges_area.find('.changesMade_area_saveChanges');
                                    ToolTipHelper.ShowTooltip(GetPSL10NString('SAVE_CHANGES_FIRSTTIME_HINT'), save_change_button);
                                    
                                    SetShowSaveChangesHint(false);
                                }else{
                                    ToolTipHelper.HideTooltip();
                                }
                                ReUpdateUI_Layout();
                            });
                        }
                    }
                    
                }
    
                updateSaveNumber();
                ReUpdateUI_Layout();
            };
            
            
            var privacy_item_content_className = 'privacy_item_content'
            
            // use differnet css rule for special setting
            var special_list = UISettings.privacy_item_content;
            
            var needBreak = false;
            for(var i = 0, special_list_len = special_list.length; i < special_list_len; i++){
                if(needBreak){
                    break;
                }
                
                var current_special_rule = special_list[i];
                
                var current_list = current_special_rule.list;
                for(var j = 0, list_len = current_list.length; j < list_len; j++){
                    var name = response["Website"] || response["Browser"];
                    var ID = response["ID"];
                    if(name == current_list[j].name && ID == current_list[j].ID){
                        privacy_item_content_className += (" " + current_special_rule.className);
                        needBreak = true;
                        break;
                    }
                }
            }
            var div_privacy_item_content = TMExt_$('<div/>', {
                'class' : privacy_item_content_className
            });
            div_privacy_item_content.append(titleArea).append(Setting_display_none).append(current_setting_display_none);
            
            
            if (response.html && response.html.indexOf("<div") >= 0) {
                //For Facebook Applications table construct
                div_privacy_item_content.addClass("bFacekookApplications");
               
                var apps = TMExt_$('<ul/>', {
                    'class' : 'privacy_item_content_fb_applications'
                }).css("margin-top","35px").css("margin-left","35px");
                window.MAX_SHOW_COUNT = 5;
                var count = 0;
                for (var appId in response.appsDetail) {
                    count++;
                    var one = response.appsDetail[appId];
                    var dom = TMExt_$('<li class="oneApp" style="height:54px;"></li>');
                    var appContains = TMExt_$("<ul class='oneAppDetails'></ul>");
                    var appPic = TMExt_$("<li class='detailItem'><img style='height: 24px;width: 24px;margin-top: 15px; margin-left: 15px;' src=" +one.imgPath +"></img></li>");
                    var appName =  TMExt_$("<li class='detailItem'><div class='appNameWording'><span>"+one.appName +"</span></div></li>")
                    if (count > MAX_SHOW_COUNT) {
                        dom.hide().addClass("hidenApps");
                    }
                    var waitingIcon = TMExt_$('<li class="detailItem"><div class="waiting hidden" > </div></li>');
                   
                    var selcetor = TMExt_$('<div/>', {
                        'class' : 'privacy_item_content_selector beFacebookSubApplications'
                    });

                    var button = TMExt_$('<button/>', {
                        'class' : 'btn_silver_inline_div privacy_item_content_current subApps ' + appId,
                        'responseCurrent' : one.appLevelNum,
                        'appId' : appId
                    });
                    button.css("margin-bottom","0px");
                    var buttonDetailIcon = TMExt_$('<div class="currentIcon privacy_item_content_current_riskImage risk"></div>');
                    
                    var buttonDetailArrayRow = TMExt_$('<div class="privacy_item_content_current_arrow" style="margin-top: 11px;"></div>');
                    var buttonDetailWording = TMExt_$('<div class="privacy_item_content_current_wording risk">' +  one.appLevelWording + '</div>');
                    button.append(buttonDetailIcon).append(buttonDetailArrayRow).append(buttonDetailWording);
                    
                    button.addClass('button_disabled_silver_inline').css('opacity', 0.5)
                    var DeleteButton = TMExt_$('<div/>', {
                        'class' : 'deleteBtn facebookApp disabled',
                        'appId' : appId
                    });
                    
  
 
                    DeleteButton.css("opacity",0.5);
                    var ul = TMExt_$('<ul/>', {
                        'class' : 'privacy_item_content_ul privacy_item_content_ul_detail_app'
                    });
                    ul.css("z-index",1);
                    
                    for(var index = 0, len = response['possibleFixValue'].length; index < len; index++){
                        var k = response['possibleFixValue'][index];
                        
                        if (isSettingRisky(k, response['Risk'])) {
                            var option = construct_option_risk(response, k);
                        } else {
                            var option = construct_option_safe(response, k);
                        }
        
                        ul.append(option);
                        option.attr("value", index);
                    }
                    
                    ul.find("li").each(function(){
                        TMExt_$(this).click(function() {
                            
                            TMExt_$(this).parent().parent().find("button .privacy_item_content_current_wording").text(response.PossibleValue[TMExt_$(this).attr("value")]);
                            var currentIcon = TMExt_$(this).parent().parent().find("button .currentIcon");
                            var subAppsButton = TMExt_$(this).parent().parent().find("button.subApps");
                            currentIcon.removeClass("risk").removeClass("safe")
                            if (TMExt_$(this).hasClass("privacy_item_content_selector_risk")) {
                                currentIcon.addClass("risk");
                            } else {
                                currentIcon.addClass("safe");
                            }
                            subAppsButton.attr("fixTo",TMExt_$(this).attr("value"));
                            TMExt_$(this).parent().hide();
                            var bApplyAll = false;
                            checkShowSaveChanges(bApplyAll);
                           
                        });
                    })
                    button.click(function() {
                        if(!TMExt_$(this).hasClass("button_disabled_silver_inline")) {
                            TMExt_$(this).parent().find("ul").show();
                        }
                    });
                    DeleteButton.click(function() {
                        if(TMExt_$(this).hasClass("disabled")) {
                            return;
                        }
                        var thisButton = this;
                        that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                            'closeButton' : true,
                            'closeEvent' : function(){
                                TMExt_$("#tabsContent_facebook .alertOverTabContentArea").remove();
                                that.enableButtonOfTabContent();   
                            },
                            'title' : that.OVERLAY_REMOVE_FACEBOOK_APPLICATION, 
                            'buttons' : [{
                                'title' : GetPSL10NString('OVERLAY_REMOVE'),
                                'callback' : function(){                    
                                    ConfirmRemoveApp();
                                    TMExt_$("#tabsContent_facebook .alertOverTabContentArea").remove();
                                    that.enableButtonOfTabContent();   
                                }
                            },{
                                'title' : GetPSL10NString('OVERLAY_CANCEL'),
                                'callback' : function(){                    
                                    TMExt_$("#tabsContent_facebook .alertOverTabContentArea").remove();
                                    that.enableButtonOfTabContent();   
                                }
                            }],
                            'head': GetPSL10NString("fb_app_remove_title").replace("%APPNAME%", response.appsDetail[TMExt_$(thisButton).attr("appId")].appName)
                        }));
                        var thisButton = this;
                        
                        var ConfirmRemoveApp = function () {
                            TMExt_$(thisButton).parent().parent().parent().css("opacity",0.7);
                            TMExt_$(thisButton).parent().parent().find("button.subApps").addClass('button_disabled_silver_inline').css('opacity', 0.5)
                            TMExt_$(thisButton).parent().parent().find(".deleteBtn.facebookApp").addClass('disabled').css('opacity', 0.5)
                            
                            TMExt_$(thisButton).parent().parent().find(".waiting").removeClass("hidden");
                            var appId = TMExt_$(thisButton).attr("appId");
                            var _scannerHelper = get_scannerHelper("FACEBOOK")
                            var fixItem = {
                                    Website: "FACEBOOK",
                                    extra: {
                                        appIDs: [appId],
                                        bDelete: true
                                    },
                                    fix_to: 2,
                                    id: 84 
                                };
                                var list_toFix = new Array();
                                list_toFix.push(fixItem);
                                PSDebug.log("list_toFix:" ,list_toFix);
                                _scannerHelper.UI_FixAllSetting(true, list_toFix, _scannerHelper.forceOpenNewTabWhenFix)
                        };
                        /*
                        _scannerHelper.fixSingle(85, 0, true, function(data) {                  
                            PSDebug.log("DElete app: response:",data)
                        },null, [appId]);
                        TMExt_$(this).parent().hide();
                        */    
                    });
                    
                    DeleteButton.hover (function() {
                        if(TMExt_$(this).hasClass("disabled")) {
                            return;
                        }
                        ToolTipHelper.ShowTooltip(GetPSL10NString("fb_app_remove_tooltip"), TMExt_$(this));
                    },function() {
                        if(TMExt_$(this).hasClass("disabled")) {
                            return;
                        }
                        ToolTipHelper.HideTooltip();
                    })
                    selcetor.append(button);
                    
                    selcetor.append(ul);
                    selcetor.on('mouseleave', function() {
                        TMExt_$(this).parent().find("ul").hide();
                    });
                   
                    dom.hover (function() {
                        if (TMExt_$(".radioBtnApplyIndividual input")[0].checked) {
                            //TMExt_$(this).find(".deleteBtn").show()
                            TMExt_$(this).css("background-color","rgb(226, 226, 227)");
                        }
                    },function() {
                        //TMExt_$(this).find(".deleteBtn").hide()
                        TMExt_$(this).css("background-color","white");
                    })
                    var selectorLI = TMExt_$("<li class='detailItem'></li>");
                    selcetor.appendTo(selectorLI);
                    var deleteBtnLI = TMExt_$("<li class='detailItem'></li>");
                    DeleteButton.appendTo(deleteBtnLI);
                    appContains.append(appPic).append(appName).append(waitingIcon).append(selectorLI).append(deleteBtnLI);
                    
                    dom.append(appContains);
                    apps.append(dom);
                    
                }
                
                var radioBtnApplyAll = TMExt_$('<div class="radioBtnApplyAll"><input id="applyAll" name="ApplyType" type="radio" value="" checked="checked" /><label for="applyAll">' + GetPSL10NString('fb_app_titleArea_radio_wording_apply_all').replace("%NUM%",count) + ' </label></div>')
                if (count > 1) {
                    radioBtnApplyAll.find("label").text(GetPSL10NString('fb_app_titleArea_radio_wording_apply_all').replace("%NUM%",count))
                } else {
                    radioBtnApplyAll.find("label").text(GetPSL10NString('fb_app_titleArea_radio_wording_apply_all_singular'))
                }
                
                var radioBtnApplyIndividual = TMExt_$('<div class="radioBtnApplyIndividual"><input id="applyIndiv" name="ApplyType" type="radio" value="" /><label for="applyIndiv">' + GetPSL10NString('fb_app_titleArea_radio_wording_apply_individ') + '</label></div>')
                
                radioBtnApplyAll.click(function(){
                    TMExt_$(this).parent().parent().find("button.btn_silver_inline_div").removeClass('button_disabled_silver_inline').css('opacity', 1);
                    TMExt_$(this).parent().parent().find("button.subApps").addClass('button_disabled_silver_inline').css('opacity', 0.5)
                     TMExt_$(this).parent().parent().find(".deleteBtn.facebookApp").addClass('disabled').css('opacity', 0.5)
                    
                    var currentButtons = TMExt_$(this).parent().parent().find("button.btn_silver_inline_div.subApps")
                    currentButtons.each( function() {
                        var backupIndex = TMExt_$(this).attr("responseCurrent");
                        var lis = TMExt_$(this).parent().find(".privacy_item_content_ul li");
                        TMExt_$(lis[backupIndex]).trigger("click");
                    });
                    
                })
                radioBtnApplyIndividual.click(function(){
                    TMExt_$(this).parent().parent().find("button.btn_silver_inline_div").addClass('button_disabled_silver_inline').css('opacity', 0.5)
                    TMExt_$(this).parent().parent().find("button.subApps").removeClass('button_disabled_silver_inline').css('opacity', 1);
                    TMExt_$(this).parent().parent().find(".deleteBtn.facebookApp").removeClass('disabled').css('opacity', 1)
                    
                    var backupIndex = TMExt_$(this).parent().parent().find("button.btn_silver_inline_div.settingItem").attr("responseCurrent");
                    var lis = TMExt_$(this).parent().parent().find("button.btn_silver_inline_div.settingItem").parent().find(".privacy_item_content_ul li");
                    TMExt_$(lis[backupIndex]).trigger("click");
                })
                if (count > MAX_SHOW_COUNT) {
                    var extendBar = TMExt_$("<div><span class='wording'>" + GetPSL10NString("fb_app_extend_wording")+ "</span><span class='arrow'>&nbsp;</span>");
                    extendBar.addClass("extendBar");
                    extendBar.click(function() {TMExt_$(".hidenApps").slideToggle( );
                            });
                    extendBar.toggle(
                            function(){
                                    TMExt_$(this).find(".wording").text(GetPSL10NString("fb_app_unextend_wording"));
                                    TMExt_$(this).addClass("unextended");
                                },
                            function(){
                                    TMExt_$(this).find(".wording").text(GetPSL10NString("fb_app_extend_wording"));
                                    TMExt_$(this).removeClass("unextended");
                                }
                            );
                    apps.append(extendBar);
                }
                
                div_privacy_item_content.append(radioBtnApplyAll);
                div_privacy_item_content.append(radioBtnApplyIndividual);
                div_privacy_item_content.append(apps);
                
                // flag special selector
                select.addClass("beFacebookApplications");
                select.find("button").attr("count",count);
                
                if (count == 1) {
                    
                    div_privacy_item_content.find("button.subApps").removeClass('button_disabled_silver_inline').css('opacity', 1);
                    div_privacy_item_content.find(".deleteBtn.facebookApp").removeClass('disabled').css('opacity', 1)
                    radioBtnApplyAll.hide();
                    radioBtnApplyIndividual.hide();
                    select.hide();
                }
                
            }// else {
                select.prependTo(div_privacy_item_content);
            //}
            li.append(div_privacy_item_content);
    
            return li;
        };
        
        this.ConstructShareAfterScan = function(){
            if(window.ProductFeatureConfiguration && window.ProductFeatureConfiguration.LocalPage.DisplayShareButtonArea == false){
                var share_area_hide = TMExt_$('<div/>', {
                    'class' : 'share_area_hide'
                });
                return share_area_hide;
            }
            var that = this;
            var share_area = TMExt_$('<div/>', {
                'class' : 'share_area'
            });    
            
            var share_title = TMExt_$('<div/>', {
                'class' : 'share_title',
                'text' : GetPSL10NString('SHARE_DESCRIPTION')
            });
            
            var share_body = TMExt_$('<div/>', {
                'class' : 'share_icons'
            });
            
            share_body.append(that.ConstructShareSNS(FACEBOOK))
                        .append(that.ConstructShareSNS(TWITTER))
                        .append(that.ConstructShareSNS(GOOGLEPLUS))
                        .append(that.ConstructShareSNS(LINKEDIN));
            share_area.append(share_title).append(share_body);
            return share_area;
        };
        
        this.ConstructShareNoConcern = function(){
            if(window.ProductFeatureConfiguration && window.ProductFeatureConfiguration.LocalPage.DisplayShareButtonArea == false){
                var share_area_noConcern_hide = TMExt_$('<div/>', {
                    'class' : 'share_area_noConcern_hide'
                }); 
                return share_area_noConcern_hide;
            }
            var that = this;
            var share_area = TMExt_$('<div/>', {
                'class' : 'share_area_noConcern'
            });    
            
            var share_title = TMExt_$('<div/>', {
                'class' : 'share_title_noConcern',
                'text' : GetPSL10NString('SHARE_DESCRIPTION')
            });
            
            var share_body = TMExt_$('<div/>', {
                'class' : 'share_icons'
            });
            
            share_body.append(that.ConstructShareSNS(FACEBOOK))
                        .append(that.ConstructShareSNS(TWITTER))
                        .append(that.ConstructShareSNS(GOOGLEPLUS))
                        .append(that.ConstructShareSNS(LINKEDIN));
            share_area.append(share_title).append(share_body);
            return share_area;
        };
        
        this.ConstructShareSNS = function(SNSSite){
            var link = GetPSL10NString('SHARE_TOOTHERS_LINK');
            var wording_original = this.SHARE_TITLE + ' ' + link;
            var wording_encoded = encodeURIComponent(wording_original);
            
            var SNS_SHARE_DATA = {
                FACEBOOK : {
                    siteName : FACEBOOK,
                    className : 'share_facebook',
                    link : 'https://www.facebook.com/sharer/sharer.php?u=' + link + '&wording=' + wording_encoded
                },
                TWITTER : {
                    siteName : TWITTER,
                    className : 'share_twitter',
                    link : 'https://twitter.com/intent/tweet?text=' + wording_encoded
                },
                GOOGLEPLUS : {
                    siteName : GOOGLEPLUS,
                    className : 'share_googlePlus',
                    link : 'https://plus.google.com/share?url=' + link + '&wording=' + wording_encoded
                },
                LINKEDIN : {
                    siteName : LINKEDIN,
                    className : 'share_linkedIn',
                    link : 'https://www.linkedin.com/cws/share?url=' + link + '&wording=' + wording_encoded
                }
            }
            
            var Current_SNS = SNS_SHARE_DATA[SNSSite];
    
            var share = TMExt_$('<div/>', {
                'class' : Current_SNS.className
            });
            share.click(function() {
                window.open(Current_SNS.link);
        
                /*
                    DCA --> lstLocalPageUsageInfo --> nShareTimes
                */
                DCA_UTIL.lstLocalPageUsageInfo.nShareTimes(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[Current_SNS.siteName], 1);
            });
            
            return share;
        };
    
        this.ConstructHaveNoConcerns = function() {
            var div = TMExt_$('<div/>', {
            });
            
            /*
                append no concern wording to head area
            */
            var p = TMExt_$('<p/>', {
                'class' : 'have_no_concerns_title',
                text : GetPSL10NString('NO_CONCERN_DESCRIPTION')
            });
            
            this.contentDom.find('.fix_all_area_wrapper').empty().append(p);
            
            
            var div_image = TMExt_$('<div/>', {
                'class' : 'have_no_concerns_image_area'
            });
    
            div.append(this.ConstructShareNoConcern()).append(div_image);
            return div;
        };
    
        this.ConstructCategory = function(response_list) {
            var ul_category_list = TMExt_$('<ul/>', {
                'class' : 'ul_category_list'
            });
            for (var i = 0; i < parseInt(response_list['count']); i++) {
                // display category
                var li_category_list = TMExt_$('<li/>', {
                });
                
                // header
                var category_title = TMExt_$('<div/>', {
                    'class' : 'category_title',
                    'id' : response_list[i.toString()][0]['Category']
                });
                category_title.html((function() {
                    var category_wording_map = {
                        'People_can_see_your_personal_info'             : GetPSL10NString('CATEGORY_People_can_see_your_personal_info'),
                        'Strangers_can_easily_track_you'                 : GetPSL10NString('CATEGORY_Strangers_can_easily_track_you'),
                        'You_can_be_tagged_without_your_permission'        : GetPSL10NString('CATEGORY_You_can_be_tagged_without_your_permission'),
                        'People_outside_of_Facebook_can_see_your_info'    : GetPSL10NString('CATEGORY_People_outside_of_Facebook_can_see_your_info'),
                        'People_can_see_where_you_were'                    : GetPSL10NString('CATEGORY_People_can_see_where_you_were'),
                        'People_can_download_your_photos'                : GetPSL10NString('CATEGORY_People_can_download_your_photos'),
                        'Advertizers_can_learn_more_about_you'            : GetPSL10NString('CATEGORY_Advertizers_can_learn_more_about_you'),
                        'People_outside_of_Linkedin_can_see_your_info'    : GetPSL10NString('CATEGORY_People_outside_of_Linkedin_can_see_your_info'),
                        'Strangers_could_monitor_your_connection'        : GetPSL10NString('CATEGORY_Strangers_could_monitor_your_connection'),
                        'Browser_phishing_protect'                        : GetPSL10NString('CATEGORY_Browser_phishing_protect'),
                        'Application_can_access_your_personal_info'                        : GetPSL10NString('CATEGORY_Application_access'),
                        'Application_can_access_your_personal_info_P'                        : GetPSL10NString('CATEGORY_Application_access_plural')
                    }
                    var category_key = response_list[i.toString()][0]['Category'];
                    if(response_list[i.toString()][0].appIDs && response_list[i.toString()][0].appIDs.length > 1) {
                        return category_wording_map['Application_can_access_your_personal_info_P'].replace("%NUM%",'<span class="how_many_app_counts">' + response_list[i.toString()][0].appIDs.length + '</span>');
                    } else if (response_list[i.toString()][0].appIDs && response_list[i.toString()][0].appIDs.length == 1) {
                        return category_wording_map['Application_can_access_your_personal_info'].replace("%NUM%",'<span class="how_many_app_counts">' + response_list[i.toString()][0].appIDs.length + '</span>');
                    }
                    return category_wording_map[category_key] || "unexpected category";
                })()
               );
    
                li_category_list.append(category_title);
    
                var ul_concerns_list = TMExt_$('<ul/>', {
                    'class' : 'ul_concerns_list'
                });
    
                // display each setting
                for (var j = 0; j < response_list[i.toString()].length; j++) {
                    var setting_item_dom = that.ConstructSettingItem(response_list[i.toString()][j]);
                    ul_concerns_list.append(setting_item_dom);
                    
                }
                li_category_list.append(ul_concerns_list);
                
                
                ul_category_list.append(li_category_list);
            }
    
            return ul_category_list;
        };
        
        this.alertLogoAlertClassName = "alert_logo_ALERT";
    };
})();
