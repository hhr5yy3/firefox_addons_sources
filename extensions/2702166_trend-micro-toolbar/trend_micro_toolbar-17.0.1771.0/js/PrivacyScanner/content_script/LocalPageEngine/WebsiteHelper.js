(function() {
    /*
     global constants
     */
    window.checkLogInTimerList = {
        FACEBOOK : false,
        TWITTER : false,
        GOOGLEPLUS : false,
        LINKEDIN : false
    };

    window.reFixList = {
        FACEBOOK : null,
        TWITTER : null,
        GOOGLEPLUS : null,
        LINKEDIN : null
    };

    window.UserWeHaveScanned = {
        FACEBOOK : null,
        TWITTER : null,
        GOOGLEPLUS : null,
        LINKEDIN : null
    };

    window.UserLoginPage = {
        FACEBOOK : null,
        TWITTER : null,
        GOOGLEPLUS : null,
        LINKEDIN : null
    };

    window.TwitterFixFlag = 0;
    
    const CHECK_PAGE_CONNECTION_MAX_COUNT = 40;
    const GET_ACCOUNT_MAX_COUNT = 40;
    
    /*
        get_siteHelper could only be used by get_scannerHelper
    */
    window.get_siteHelper = function(Website) {
        switch (Website) {
            case FACEBOOK:
                return new FACEBOOK_WebsiteHelper();
            case TWITTER:
                return new TWITTER_WebsiteHelper();
            case GOOGLEPLUS:
                return new GOOGLEPLUS_WebsiteHelper();
            case LINKEDIN:
                return new LINKEDIN_WebsiteHelper();
        }
        return new WebsiteHelper();
    };
    
    window.get_Website_fromResponse = function(data) {
        if ( FPScanSingleResponse in data || FPScanResponse in data || FPFixSingleResponse in data) {
            return FACEBOOK;
        } else if ( TPScanSingleResponse in data || TPScanResponse in data || TPFixSingleResponse in data) {
            return TWITTER;
        } else if ( GPPScanSingleResponse in data || GPPScanResponse in data || GPPFixSingleResponse in data) {
            return GOOGLEPLUS;
        } else if ( LIPScanSingleResponse in data || LIPScanResponse in data || LIPFixSingleResponse in data) {
            return LINKEDIN;
        }
    };

    var WebsiteHelper = function () {
        BaseScannerHelper.call(this);

        var that = this;
        this.openNewTabWithURL = function (URL) {
            SendRequestToBackground_Website(null, null, 'login', that.contentPageName, null, that.Website, URL, true, false);
        };

        this.open_help_link = function (helpID) {
            SendRequestToBackground_openFaqPage("ALL", helpID);

            /*
             DCA --> lstHelpUsageInfo
             */
            DCA_UTIL.lstHelpUsageInfo(
                DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Website],
                helpID,
                1
            );
        };

        this.alertMessageInTabContent_pleaseSignIn = function () {
            var that = this;
            if (!PUtil.checkBrowser.IsSafari()) {
                that.alertMessageInTabContent(that.ConstructAlertMessageInContent({
                    title: GetPSL10NString('ALERT_LOG_IN_TITLE'),
                    button_content: GetPSL10NString('ALERT_SIGN_IN_BUTTON'),
                    callback: function () {
                        that.openNewTabWithURL(that.URL_ACCOUNT_PAGE);

                        //cannot avoid duplicate tabs in IE PSBackground currently.
                        /*if(that.Website != TWITTER || !PUtil.checkBrowser.IsIE())
                        {
                            that.checkLogInAndRefreshWrapper();
                        }*/
                    }
                }))
                if(that.Website != TWITTER || !PUtil.checkBrowser.IsIE()){
                    that.checkLogInAndRefreshWrapper();
                }
            } else {
                that.alertMessageInTabContent(that.ConstructAlertMessageInContent_titleLink({
                    title: {
                        wording: GetPSL10NString('ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN'),
                        learnMore: GetPSL10NString('ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE'),
                        link_clickEvent: that.safari_log_in_learn_more
                    },
                    button_content: GetPSL10NString('ALERT_SIGN_IN_BUTTON'),
                    callback: function () {
                        that.openNewTabWithURL(that.URL_ACCOUNT_PAGE);
                        that.checkLogInAndRefreshWrapper();
                    }
                }))
            }

            DCA_UTIL.lstErrorPageUsageInfo(
                DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Website],
                DCA_CONSTANTS.ERROR_ID.PLEASE_SIGNIN,
                1
            );
        };

        this.alertMessageInTabContent_signInToFix = function () {
            var that = this;
            if (!PUtil.checkBrowser.IsSafari()) {
                that.alertMessageInTabContent(that.ConstructAlertMessageInContent({
                    title: GetPSL10NString('ALERT_SIGN_IN_TO_FIX_TITLE'),
                    button_content: GetPSL10NString('ALERT_SIGN_IN_BUTTON'),
                    callback: function () {
                        that.openNewTabWithURL(that.URL_ACCOUNT_PAGE)
                        that.checkLogInAndRefreshWrapper();
                    }
                }))
            } else {
                that.alertMessageInTabContent(that.ConstructAlertMessageInContent_titleLink({
                    title: {
                        wording: GetPSL10NString('ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX'),
                        learnMore: GetPSL10NString('ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE'),
                        link_clickEvent: that.safari_log_in_learn_more
                    },
                    button_content: GetPSL10NString('ALERT_SIGN_IN_BUTTON'),
                    callback: function () {
                        that.openNewTabWithURL(that.URL_ACCOUNT_PAGE)
                        that.checkLogInAndRefreshWrapper();
                    }
                }))
            }
            that.UpdateNumberOfConcerns();
        };

        this.alertMessageInTabContent_networkError = function () {
            that.alertMessageInTabContent(that.ConstructAlertMessageInContent({
                title: GetPSL10NString('NETWORK_ERROR_CONTENT'),
                button_content: GetPSL10NString('ALERT_TRY_AGAIN_BUTTON'),
                callback: function () {
                    that.ForceScan();
                }
            }));

            /*
             DCA --> lstErrorPageUsageInfo
             */
            DCA_UTIL.lstErrorPageUsageInfo(
                DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Website],
                DCA_CONSTANTS.ERROR_ID.NETWORK_ERROR,
                1
            );
        };

        this.alertMessageInTabContent_timeoutError = function () {
            var that = this;
            that.alertMessageInTabContent(that.ConstructAlertMessageInContent_titleLink({
                title: {
                    wording: GetPSL10NString('ALERT_SOMETHING_WENT_WRONG_TITLE'),
                    learnMore: GetPSL10NString('ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE'),
                    link_clickEvent: function () {
                        that.open_help_link(DCA_CONSTANTS.HELP_ID.SOMETHING_WRONG);
                    }
                },
                button_content: GetPSL10NString('ALERT_TRY_AGAIN_BUTTON'),
                callback: function () {
                    that.ForceScan();
                }
            }));

            /*
             DCA --> lstErrorPageUsageInfo
             */
            DCA_UTIL.lstErrorPageUsageInfo(
                DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Website],
                DCA_CONSTANTS.ERROR_ID.TIMEOUT,
                1
            );
        };

        this.alertMessageInTabContent_busyFixing = function () {
            var that = this;
            that.alertMessageInTabContent(that.ConstructAlertMessageBusyFixing());

            /*
             DCA --> lstErrorPageUsageInfo
             */
            DCA_UTIL.lstErrorPageUsageInfo(
                DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Website],
                DCA_CONSTANTS.ERROR_ID.BUSY_FIXING,
                1
            );
        };

        this.alertMessageInTabContent_forceCloseTab = function () {
            var that = this;
            that.alertMessageInTabContent(that.ConstructAlertMessageInContent_titleLink({
                title: {
                    wording: that.ALERT_FORCE_CLOSE_TAB_TITLE,
                    learnMore: GetPSL10NString('ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE'),
                    link_clickEvent: function () {
                        that.open_help_link(DCA_CONSTANTS.HELP_ID.KEEP_SEEING_DONT_CLOSE_TAB);
                    }
                },
                button_content: GetPSL10NString('ALERT_TRY_AGAIN_BUTTON'),
                callback: function () {
                    that.ForceScan();
                }
            }))
        };

        this.alertMessageInTabContent_anotherUnknownAccount = function () {
            that.alertMessageInTabContent(that.ConstructAlertMessageInContent({
                title: that.ALERT_FIND_ANOTHER_ACCOUNT_SUDDENDLY,
                button_content: GetPSL10NString('OVERLAY_CHECKNOW'),
                callback: function () {
                    if (that.Website == GOOGLEPLUS) {
                        that.ForceScan({
                            "NeedOpenNewTabForcely": true
                        })
                    } else {
                        that.ForceScan()
                    }
                }
            }))
        };

        this.alertMessageOverTabContent_signInAnotherAccount = function () {
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                'closeButton': true,
                'closeEvent': function () {
                    that.ForceScan();
                },
                'title': that.OVERLAY_HAVE_SIGN_IN_ANOTHER_ACCOUNT,
                'buttons': [{
                    'title': GetPSL10NString('OVERLAY_OK'),
                    'callback': function () {
                        if (that.Website == GOOGLEPLUS) {
                            that.ForceScan({
                                "NeedOpenNewTabForcely": true
                            })
                        } else {
                            that.ForceScan()
                        }
                    }
                }]
            }))
        };

        this.alertMessageOverTabContent_forceCloseTab = function () {
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                'closeButton': true,
                'closeEvent': function () {
                    that.ForceScan();
                },
                'title': that.ALERT_FORCE_CLOSE_TAB_TITLE,
                'buttons': [{
                    'title': GetPSL10NString('ALERT_TRY_AGAIN_BUTTON'),
                    'callback': function () {
                        // remove current messagebox over tab content div anyway.
                        that.removeMessageOverTabContent();
                        that.alertMessageOverTabContent_loading()
                        that.UI_FixAllSetting(true, reFixList[that.Website], that.forceOpenNewTabWhenFix)
                    }
                }]
            }))
        };

        this.alertMessageOverTabContent_confirmPassword = function () {
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                'closeButton': true,
                'closeEvent': function () {
                    that.ForceScan();
                },
                'title': GetPSL10NString('OVERLAY_TWITTER_CONFIRM_PASSWORD'),
                'buttons': [{
                    'title': GetPSL10NString('OVERLAY_OK'),
                    'callback': function () {
                        that.ForceScan();
                    }
                }]
            }))
        };

        this.fixAllPopupClickEvent = function () {
            var selectedSite = TMExt_$('#tabs .selected').attr('siteorbrowsername');

            // send ubm
            window.browser.runtime.sendMessage({
                action: "feedbackUBM", 
                params: {
                    event: "PSLocalPage_" + selectedSite + "_AlertPopup_Fix_Click",
                    value: 1
                }
            });

            var list_toFix = [];// match by title.
            var li_list = that.contentDom.find('.overlay_quickFix_content_ul li:visible');

            for (var i = 0; i < li_list.length; i++) {
                var settingJSON = TMExt_$.parseJSON(li_list.eq(i).find('.Setting_display_none').text());
                list_toFix.push({
                    'Website': settingJSON['Website'],
                    'id': settingJSON['ID'],
                    'extra': {
                        'appIDs': settingJSON['appIDs']
                    },
                    'fix_to': settingJSON['Suggestion']
                });
            }

            that.removeMessageOverTabContent();
            that.alertMessageOverTabContent_loading()
            that.UI_FixAllSetting(true, list_toFix, that.forceOpenNewTabWhenFix)
        };

        this.UI_FixSetting = function (id, fix_to, forceOpenNewTab, callback, extra) {
            var that = this;
            var Website = this.Website;

            // find the dom which needs to fix
            var li_list = this.contentDom.find('.ul_concerns_list li');
            for (var i = 0; i < li_list.length; i++) {
                var setting_list_content = li_list.eq(i).find('.privacy_item_content');
                for (var j = 0; j < setting_list_content.length; j++) {
                    var settingJSON = TMExt_$.parseJSON(setting_list_content.eq(j).find('.Setting_display_none').text());
                    if (settingJSON['Website'] == Website && settingJSON['ID'] == id) {
                        break;
                    }
                }
                if (j != setting_list_content.length) {
                    break;
                }
            }

            if (i == li_list.length && j == setting_list_content.length) {
                return;
            }

            // fixing
            var setting_dom_top = setting_list_content.eq(j);

            var settingDom = setting_dom_top.find('.Setting_display_none');
            var settingJSON = TMExt_$.parseJSON(settingDom.text());

            var select = setting_dom_top.find('.privacy_item_content_selector');

            function checkFixResult(fix_to, data) {
                var response = data[that.ScanSingleResponse]['Response'];
                var returnCode = data[that.ScanSingleResponse]['ReturnCode'];

                switch (returnCode) {
                    case ReturnCodeEnum.NETWORK_ERROR.code:
                        return that.alertMessageInTabContent_networkError();
                    case ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.code:
                    case ReturnCodeEnum.NOT_LOGGED_IN.code:
                        return that.alertMessageInTabContent_signInToFix();
                }

                if (!response['PossibleValue']['0']) {
                    response['PossibleValue']['0'] = GetPSL10NString('SETTING_ITEM_OFF');
                    response['PossibleValue']['1'] = GetPSL10NString('SETTING_ITEM_ON');
                }
                // For Facebook applications setting items Refresh UI
                var subApps = setting_dom_top.find("button.subApps");

                if (subApps.length > 0) {
                    // for special applications setting
                    subApps.addClass("dirtyData");

                    var arrayLevels = new Array();
                    var jsonRisk = settingJSON['Risk'];
                    TMExt_$(".waiting").addClass("hidden");
                    setting_dom_top.find("button.subApps").parent().parent().hide();
                    var appCount = 0;

                    TMExt_$(".hidenApps").removeClass("hidenApps").show();
                    for (var appId in response.appsDetail) {
                        appCount++;
                        var certainButton = setting_dom_top.find("button.subApps." + appId);

                        if (appCount > MAX_SHOW_COUNT) {
                            var hiddenApp = certainButton.parent().parent().parent().parent();
                            hiddenApp.addClass("hidenApps").hide();
                            var extendBar = hiddenApp.parent().find(".extendBar");
                            if (extendBar.hasClass("unextended")) {
                                hiddenApp.css("display", "list-item");
                            }
                        }

                        certainButton.removeClass("dirtyData");
                        certainButton.attr("responseCurrent", response.appsDetail[appId].appLevelNum);
                        // update text
                        var certainApp = setting_dom_top.find("button.subApps." + appId + " .privacy_item_content_current_wording");
                        certainApp.text(response.appsDetail[appId].appLevelWording).parent().parent().parent().show();

                        //update icon
                        var certainIcon = setting_dom_top.find("button.subApps." + appId + " .privacy_item_content_current_riskImage");
                        certainIcon.removeClass('risk').removeClass('safe');
                        if (isSettingRisky(response.appsDetail[appId].appLevelNum, jsonRisk)) {
                            certainIcon.addClass('risk');
                        } else {
                            certainIcon.addClass('safe');
                        }

                        arrayLevels.push(response.appsDetail[appId].appLevelNum);
                    }

                    // for apply all fix button
                    var currentLevel = Math.min.apply(null, arrayLevels);
                    var current_wording = setting_dom_top.find('button.settingItem .privacy_item_content_current_wording');
                    current_wording.text(response['PossibleValue'][currentLevel]);

                    var currentButton = setting_dom_top.find('button.settingItem');
                    currentButton.attr("count", appCount).attr("responsecurrent", currentLevel);
                    if (appCount <= MAX_SHOW_COUNT) {
                        TMExt_$(".extendBar").hide();
                    }
                    if (appCount > 1) {
                        TMExt_$("#Application_can_access_your_personal_info").html(GetPSL10NString('CATEGORY_Application_access_plural').replace("%NUM%", '<span class="how_many_app_counts">' + appCount + '</span>'));
                        TMExt_$(".radioBtnApplyAll label").text(GetPSL10NString('fb_app_titleArea_radio_wording_apply_all').replace("%NUM%", appCount))
                    } else {
                        TMExt_$("#Application_can_access_your_personal_info").html(GetPSL10NString('CATEGORY_Application_access').replace("%NUM%", '<span class="how_many_app_counts">' + appCount + '</span>'));
                        TMExt_$(".radioBtnApplyAll label").text(GetPSL10NString('fb_app_titleArea_radio_wording_apply_all_singular'))
                    }
                    var currentIcon = setting_dom_top.find('button.settingItem .privacy_item_content_current_riskImage');
                    currentIcon.removeClass('risk').removeClass('safe');
                    if (isSettingRisky(currentLevel, jsonRisk)) {
                        currentIcon.addClass('risk');
                    } else {
                        currentIcon.addClass('safe');
                    }
                    var settingDom = setting_dom_top.find(".Setting_display_none");
                    settingDom.text(JSON.stringify(response));
                    if (appCount == 1) {
                        TMExt_$("button.subApps").removeClass('button_disabled_silver_inline').css('opacity', 1);
                        TMExt_$(".deleteBtn.facebookApp").removeClass('disabled').css('opacity', 1)
                        TMExt_$(".radioBtnApplyIndividual").trigger("click");
                        TMExt_$(".radioBtnApplyAll").hide();
                        TMExt_$(".radioBtnApplyIndividual").hide();
                        TMExt_$(".radioBtnApplyIndividual").parent().find(".privacy_item_content_selector.beFacebookApplications").hide();

                    }
                    // remove dirty data
                    setting_dom_top.find("button.subApps.dirtyData").parent().parent().parent().parent().remove();
                    // trigger radio button
                    if (TMExt_$(".radioBtnApplyAll input")[0].checked) {
                        TMExt_$(".radioBtnApplyAll").trigger("click");
                    } else {
                        TMExt_$(".radioBtnApplyIndividual").trigger("click");
                    }
                } else if (response['Current'] == fix_to) {

                    // for common settings
                    setting_dom_top.find('.current_setting_display_none').text(fix_to);
                    var current_wording = setting_dom_top.find('.privacy_item_content_current_wording');
                    current_wording.text(response['PossibleValue'][fix_to]);

                    var settingDom = setting_dom_top.find(".Setting_display_none");
                    settingDom.text(JSON.stringify(response));

                    var jsonRisk = settingJSON['Risk'];

                    current_wording.removeClass('risk').removeClass('safe');
                    if (isSettingRisky(fix_to, jsonRisk)) {
                        current_wording.addClass('risk');
                    } else {
                        current_wording.addClass('safe');
                    }
                } else {

                }

                if (callback) {
                    callback();
                }
            }

            that.CheckUserLogIn(function () {
                // send request to fix
                var _forceOpenNewTab = forceOpenNewTab ? forceOpenNewTab : false;

                that.fixSingle(id, fix_to, _forceOpenNewTab, function (data) {
                    if (Website == TWITTER || Website == FACEBOOK) {
                        if (callback) {
                            callback();
                        }
                    } else {
                        // give some time for linkedin server to sync operation state
                        var delayTime = (Website == LINKEDIN) ? 1000 : 0;
                        
                        setTimeout(function () {
                            that.scanSingle(id, function (data) {
                                checkFixResult(fix_to, data);
                            })
                        }, delayTime);
                    }
                }, null, extra);
            }, function () {
                that.alertMessageInTabContent_signInToFix();
            }, function () {
                that.alertMessageInTabContent_networkError();
            });
        };

        this.UI_FixAllSetting = function (isFirstInvoke, list, forceOpenNewTab) {
            var that = this;
            if (isFirstInvoke) {
                reFixList[that.Website] = list;
                that.fixStartTime = Date.now();
                that.fixListLength = list.length;
            }
            if (list.length == 0) {
                // Feedback UBM to know total fix time
                that.fixFinishTime = Date.now();
                let totalTime = Math.floor((that.fixFinishTime - that.fixStartTime) / 1000);
                FeedbackFixResult(that.Website, totalTime, that.fixListLength);

                that.DoWhenFinishFixing();
            } else {
                that.UI_FixSetting(list[0].id, list[0].fix_to, forceOpenNewTab, () => {
                    if (that.forceOpenNewTabMultiTimeWhenFix) {
                        that.UI_FixAllSetting(false, list.slice(1), true);
                    }
                    else {
                        that.UI_FixAllSetting(false, list.slice(1), false);
                    }
                },
                list[0].extra);
            }
        };

        this.checkLogInAndRefreshWrapper = function () {
            if (checkLogInTimerList[that.Website]) {
                // already have timer for this checker
                return;
            } else {
                checkLogInTimerList[that.Website] = true;
                that.checkLogInAndRefresh();
            }
        };

        this.checkLogInAndRefresh = function () {
            that.CheckUserLogIn(function () {
                that.ForceScan();
                checkLogInTimerList[that.Website] = false;
            }, function () {
                setTimeout(function () {
                    that.checkLogInAndRefresh();
                    return;
                }, TIME_INTERVAL_NOT_LOG_IN_CHECK_AGAIN);
            }, function () {
                setTimeout(function () {
                    that.checkLogInAndRefresh();
                    return;
                }, TIME_INTERVAL_NOT_LOG_IN_CHECK_AGAIN_IF_NETWORK_ERROR);
            });
        };

        this.isOriginalUser = function (checkKey) {
            if (!UserWeHaveScanned[that.Website]) {
                UserWeHaveScanned[that.Website] = checkKey;
            } else if (UserWeHaveScanned[that.Website] != checkKey && that.get_tabContent_Content().find('.alertOverTabContentArea_wrapper_loading').length > 0) {
                // only do it if we are busing fixing
                UserWeHaveScanned[that.Website] = checkKey;
                return false;
            } else {
                UserWeHaveScanned[that.Website] = checkKey;
            }
            return true;
        };

        this.ConstructSaveChangesWrapper = function (Website) {
            var div = TMExt_$('<div/>', {
                'class': 'changesMade_wrapper'
            });
            div.append(that.ConstructSaveChangesArea(Website));
            return div;
        };


        this.ConstructSaveChangesArea = function (Website) {
            var that = this;

            // header
            var div = TMExt_$('<div/>', {
                'class': 'changesMade_area'
            });

            var changesMade_hitArea = TMExt_$('<div/>', {
                'class': 'changesMade_area_hitArea'
            });

            if (this.showSaveChangeHints) {
                changesMade_hitArea.css("marginTop", "1px")
            } else {
                changesMade_hitArea.css("marginTop", "8px")
            }
            changesMade_hitArea.append(TMExt_$('<span/>', {
                'class': 'changesMade_area_changesMade_wording',
                text: GetPSL10NString('SAVE_CHANGES_CHANGES_MADE')
            })).append(TMExt_$('<span/>', {
                'class': 'changesMade_area_changesMade_number',
                text: '0'
            }));

            if (this.showSaveChangeHints) {
                changesMade_hitArea.append(TMExt_$('<div/>', {
                    'class': 'changesMade_area_changesMade_twitterTips',
                    text: that.saveChangeHintsWording
                }));
            }

            var saveChanges = TMExt_$('<button/>', {
                'class': 'btn_silver changesMade_area_saveChanges',
                text: GetPSL10NString('SAVE_CHANGES_BUTTON_TITLE')
            });

            div.append(saveChanges).append(changesMade_hitArea);

            saveChanges.click(function () {
                ToolTipHelper.HideTooltip();
                get_scannerHelper(Website).alertMessageOverTabContent_loading()

                var topDom = get_scannerHelper(Website).contentDom;
                var setting_div_list = topDom.find('.privacy_item_content');
                var list_toFix = [];
                for (var i = 0; i < setting_div_list.length; i++) {
                    // display each setting
                    var jsonSetting = TMExt_$.parseJSON(setting_div_list.eq(i).find('.Setting_display_none').text());
                    var indexUserSelected = setting_div_list.eq(i).find('.current_setting_display_none').text();
                    if (jsonSetting['Current'] != indexUserSelected) {
                        list_toFix.push({
                            'Website': Website,
                            'id': jsonSetting['ID'],
                            'fix_to': indexUserSelected,
                            'extra': {
                                'appIDs': jsonSetting['appIDs']
                            }
                        });
                    }
                    if (setting_div_list.eq(i).hasClass("bFacekookApplications")) {
                        var individualButtons = setting_div_list.eq(i).find("button.subApps");
                        individualButtons.each(function () {
                            var responseCurrent = TMExt_$(this).attr("responseCurrent");
                            var fixTo = TMExt_$(this).attr("fixTo");
                            if (fixTo && Number(fixTo) != Number(responseCurrent)) {
                                var appID = Number(TMExt_$(this).attr("appId"));
                                list_toFix.push({
                                    'Website': Website,
                                    'id': jsonSetting['ID'],
                                    'fix_to': Number(fixTo),
                                    'extra': {
                                        'appIDs': [appID]
                                    }
                                });
                            }
                        });

                    }
                }

                var _scannerHelper = get_scannerHelper(Website);
                _scannerHelper.UI_FixAllSetting(true, list_toFix, _scannerHelper.forceOpenNewTabWhenFix);
            });
            return div;
        };

        this.ConstructContentFromResponse = function (data) {
            var that = this;
            var div_scan_result_area = TMExt_$('<div class="scan_result_main"/>');
            var Website = get_Website_fromResponse(data);

            if (Website == FACEBOOK) {
                var response_list_raw = GetListStyleFacebookData(data[FPScanResponse]["Response"]);
            } else {
                var response_list_raw = data[that.ScanResponse]["Response"];
            }

            if (response_list_raw.length == 0) {
                that.alertMessageInTabContent_busyFixing();
                return;
            }

            var count = GetHowManyConcerns(response_list_raw);
            var response_list = that.FilterListByCategory(response_list_raw);

            if (count == 0) {
                var div_have_no_concerns = that.ConstructHaveNoConcerns();
                div_scan_result_area.append(div_have_no_concerns)

                return div_scan_result_area;
            }

            var div_number_of_concern = that.ConstructFixAllArea(count, function () {
                 // send ubm
                window.browser.runtime.sendMessage({
                    action: "feedbackUBM", 
                    params: {
                        event: "PSLocalPage_" + that.Website + "_FixAll_Click",
                        value: 1
                    }
                });
                
                that.alertMessageOverTabContent_fixAll();
                /*
                 DCA --> lstLocalPageUsageInfo --> nFixAllTimes
                 */
                DCA_UTIL.lstLocalPageUsageInfo.nFixAllTimes(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Website], 1);
            });

            this.contentDom.find('.fix_all_area_wrapper').append(div_number_of_concern);

            var div_saveChangesWrapper = that.ConstructSaveChangesWrapper(Website);
            div_scan_result_area.append(div_saveChangesWrapper)

            var ul_category_list = that.ConstructCategory(response_list);
            div_scan_result_area.append(ul_category_list)

            var share_after_scan = that.ConstructShareAfterScan();
            div_scan_result_area.append(share_after_scan);

            return div_scan_result_area;
        };

        this.ConstructUser = function (data) {
            var div = TMExt_$('<div/>', {
                'class': 'user_area'
            });

            // name_area
            var div_name_area = TMExt_$('<div/>', {
                'class': 'div_user'
            });

            var head_image_area = TMExt_$('<div/>', {
                'class': 'div_head_image_area'
            });

            var div_head_image;
            if (data['image_url']) {
                div_head_image = TMExt_$('<img/>', {
                    'class': 'div_head_image',
                    src: data['image_url']
                });
            } else if (data['image_html']) {
                div_head_image = data['image_html'];
            } else {
                PSDebug.log('no image data');
                div_head_image = '';
            }
            

            head_image_area.append(div_head_image);
            // set photo svg width and height for linkin
            if (data['Website'] === 'LINKEDIN' && data['image_html']) {
                head_image_area.find('#person-ghost-images')
                    .attr('height', '60px')
                    .attr('width', '60px');
            }

            var fix_all_area = TMExt_$('<div/>', {
                'class': 'fix_all_area_wrapper'
            });

            var name = TMExt_$('<div/>', {
                'class': 'user_area_name',
                text: data['name']
            });

            var div_clear = TMExt_$('<div/>', {
                'class': 'clear'
            });

            var header_wrapper = TMExt_$('<div/>', {
                'class': 'div_head_wrapper'
            }).append(name).append(div_clear).append(head_image_area);

            var header_image = TMExt_$('<div/>', {
                'class': 'div_head'
            }).append(header_wrapper).append(fix_all_area);

            div_name_area.append(header_image);

            // another drop down
            var div_another = TMExt_$('<div/>', {
                'class': 'wrongAccount_area'
            });

            // another drop down
            var div_another_content = TMExt_$('<div/>', {
                'class': 'wrongAccount_area_content'
            });

            var div_another_content_arrow = TMExt_$('<div/>', {
                'class': 'wrongAccount_area_content_arrow'
            });

            var div_another_content_frame = TMExt_$('<div/>', {
                'class': 'wrongAccount_area_content_frame'
            });

            var div_another_content_frame_title = TMExt_$('<div/>', {
                'class': 'wrongAccount_area_content_title',
                text: GetPSL10NString('WRONGACCOUNT_NOT_USER')
            });

            var a_another_one_link = TMExt_$('<div/>', {
                'class': 'wrongAccount_area_content_content',
                target: '_blank',
                text: GetPSL10NString('WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE')
            });

            a_another_one_link.click(function () {
                var _scannerHelper = get_scannerHelper(data['Website']);
                _scannerHelper.openNewTabWithURL(_scannerHelper.URL_ACCOUNT_PAGE);
                _scannerHelper.alertMessageOverTabContent_signInAnotherAccount();

                /*
                 DCA --> lstLocalPageUsageInfo --> nSwitchUserClickTimes
                 */
                DCA_UTIL.lstLocalPageUsageInfo.nSwitchUserClickTimes(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[data['Website']], 1);

                div_another.hide()
            });
            div_another_content_frame.append(div_another_content_frame_title).append(a_another_one_link);

            div_another_content.append(div_another_content_arrow).append(div_another_content_frame);

            div_another.append(div_another_content);
            div_another.hide();

            div.append(div_name_area);

            header_wrapper.append(div_another);

            name.on('mouseenter', function () {
                div_another.show();
                div_another.removeClass("anotherAccount_name");
                div_another.removeClass("anotherAccount_image");
                div_another.addClass("anotherAccount_name");
                div_another.css("left", name.outerWidth() - CSS_anotherAccount_name_gap);
            });

            head_image_area.on('mouseenter', function () {
                div_another.show();
                div_another.removeClass("anotherAccount_name");
                div_another.removeClass("anotherAccount_image");
                div_another.addClass("anotherAccount_image");
                div_another.css("left", CSS_anotherAccount_image_left);
            });

            header_wrapper.on('mouseleave', function () {
                div_another.hide();
            });

            return div;
        };

        this.ForceScan = function (params) {
            var that = this;
            var Website = that.Website;
            var tabs_list = that.tablistDom;
            var current_tab = that.tabDom;
            var current_tabContent = that.contentDom;
            var loading = that.get_tabContent_Loading();
            var content = that.get_tabContent_Content();

            content.hide();
            loading.show();
            ReUpdateUI_Layout();

            // clear the dom then constuct new based on newest result
            content.empty();

            var div_scan_result_area = TMExt_$('<div/>', {
                'class': 'scanResultArea'
            });
            content.append(div_scan_result_area);

            that.UpdateNumberOfConcerns();
            that.CheckUserLogIn(function (data) {
                var div_user = that.ConstructUser(data);
                div_scan_result_area.append(div_user);
                that.scanStartTime = Date.now();
                if (params && params['NeedOpenNewTabForcely']) {
                    that.scanOpenNewTabForcely(ScanAll_Finish);
                } else if(params && params['NotOpenTab']){
                    that.scanNotOpenTab(ScanAll_Finish);
                } else {
                    that.scan(ScanAll_Finish);
                }
            }, ForceScan_notLogIn, function () {
                that.alertMessageInTabContent_networkError();
            });
            
            function ForceScan_notLogIn() {
                that.alertMessageInTabContent_pleaseSignIn();
            }

            function ScanAll_Finish(data) {
                // content has been set by other callback
                var Website = get_Website_fromResponse(data);
                var response = data[that.ScanResponse];

                content.hide();

                switch (response["ReturnCode"]) {
                    case ReturnCodeEnum.OK.code:
                        div_scan_result_area.append(that.ConstructContentFromResponse(data));
                        that.showContent();

                        /*
                         DCA --> lstLocalPageUsageInfo --> nScanTimes
                         */
                        if (IS_SCANING[Website]) {
                            DCA_UTIL.lstLocalPageUsageInfo.nScanTimes(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[Website], 1);
                            IS_SCANING[Website] = false;
                        }
                        break;
                    case ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY.code:
                        // maybe user log out during the scan, so we will return this kind of error. Should show "user not log in" in this case.
                        that.CheckUserLogIn(function () {
                            div_scan_result_area.append(that.ConstructContentFromResponse(data));
                            that.showContent();

                            /*
                             DCA --> lstLocalPageUsageInfo --> nScanTimes
                             */
                            if (IS_SCANING[Website]) {
                                DCA_UTIL.lstLocalPageUsageInfo.nScanTimes(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[Website], 1);
                                IS_SCANING[Website] = false;
                            }
                        }, function () {
                            // not log in
                            ForceScan_notLogIn()
                            that.showContent();
                        }, function () {
                            // network error
                            that.alertMessageInTabContent_networkError();
                        })
                        break;

                    case ReturnCodeEnum.NETWORK_ERROR.code:
                        that.alertMessageInTabContent_networkError();
                        that.showContent();
                        break;

                    case ReturnCodeEnum.NOT_LOGGED_IN.code:
                        /*
                         User did not log in
                         */
                        ForceScan_notLogIn()
                        that.showContent();
                        break;

                    default:
                        // other error
                        PSDebug.error(response["ReturnCode"]);
                        that.showContent();
                        break;
                }

                // Feedback UBM to know total scanning time
                that.scanFinishTime = Date.now();
                let totalTime = Math.floor((that.scanFinishTime - that.scanStartTime) / 1000);
                FeedbackScanResult(that.Website, totalTime, response["ReturnCode"]);
            }
        };

        this.safari_log_in_learn_more = function () {
            SendRequestToBackground_openFaqPage(that.Website);
        };

        this.scanOpenNewTabForcely = function (success, error) {
            // only Google+ needs to implement this function as other sites don't need to open new tab to help scanning.
            PSDebug.log('scanOpenNewTabForcely');
        };

        this.scanNotOpenTab = function(success, error){

        };

        /*
         only for QA use. This API could be used to reset all privacy settings to dangerous
         */
        this.getDangerousSettingList = function () {
            // possibleFixValue
            var result = [];
            TMExt_$.each(this.scanResultTemplate, function (index, item) {
                var res = {
                    "Website": item.Website,
                    "id": item.ID,
                    // "fix_to" : item.Risk[0]
                    "fix_to": (function () {
                        var return_risk = null;

                        TMExt_$.each(item.Risk, function (risk_index, risk_value) {
                            if (TMExt_$.inArray(risk_value, item.possibleFixValue) !== -1) {
                                return_risk = risk_value;
                                return false;
                            }
                        })
                        return return_risk;
                    })()
                }

                if (res.fix_to !== null) {
                    result.push(res);
                }
            });
            return result;
        }

        /*
         only for QA use. This API could be used to reset all privacy settings to dangerous
         */
        this.resetAllSettingToDangerous = function () {
            var fix_array = this.getDangerousSettingList();
            QA_fix_all();

            function QA_fix_remain(arr) {
                TMExt_$.each(arr, function (index, item) {
                    that.fixSingle(item.id, item.fix_to, false);
                });
            }

            function QA_fix_all() {
                var first = fix_array[0];
                // open new tab
                that.fixSingle(first.id, first.fix_to, true, function () {
                    fix_array.splice(0, 1);
                    QA_fix_remain(fix_array);
                });
            }
        }

        this.SHARE_TITLE = GetPSL10NString('SHARE_TOOTHERS_SNS_TITLE');
    };


    /*
     FACEBOOK_WebsiteHelper
     */
    var FACEBOOK_WebsiteHelper = function() {
        WebsiteHelper.call(this);

        var that = this;
        this.Website = FACEBOOK;
        this.contentPageName = 'ContentPage_Background_FACEBOOK';
        this.contentDom = TMExt_$('#tabsContent_facebook');
        this.tabDom = TMExt_$('#tabs_facebook');
        this.userId = null;

        this.getUserId = function() {
            let params = {
                name: 'c_user',
                url: this.URL_CHECKLOGIN_PAGE
            };
            SendRequestToBackground_getSNSCookies(this.contentPageName, params, this.Website, this.URL_CHECKLOGIN_PAGE);

            return new Promise(resolve => {
                let user_id = null;
                let count = 0;
                // wait for user id from cookies
                let itvCheckCookies = setInterval(() => {
                    if(count > GET_ACCOUNT_MAX_COUNT) {
                        clearInterval(itvCheckCookies);
                        return resolve(user_id);
                    }
    
                    if(window.UserLoginPage[this.Website] !== null && window.UserLoginPage[this.Website].hasOwnProperty('c_user')) {
                        clearInterval(itvCheckCookies);
    
                        user_id = window.UserLoginPage[this.Website]['c_user'];
                        return resolve(user_id);
                    }
                    
                    count++;
                }, 500);
            });
        }

        this.openPage = function() {
            return new Promise(resolve => {
                SendRequestToBackground_openSNSPage(this.contentPageName, null, this.Website, this.URL_CHECKSETTING_PAGE)
                .then((ret) => {
                    resolve(ret);
                });
            });
        }

        this.getAccounInfo = function(userId) {
            SendRequestToBackground_getSNSAccountInfo(this.contentPageName, this.Website, this.URL_CHECKSETTING_PAGE);

            return new Promise(resolve => {
                let accountInfo = {
                    'user_id': userId,
                    'Website': FACEBOOK,
                    'image_url': 'https://graph.facebook.com/' + userId + '/picture',
                    'name': ''
                };

                // wait for account information from content script
                let count = 0;
                let itvGetAccountInfo = setInterval(() => {
                    if(count > GET_ACCOUNT_MAX_COUNT) {
                        clearInterval(itvGetAccountInfo);
                        return resolve(accountInfo);
                    }

                    let accountData = window.UserLoginPage.FACEBOOK;
                    if(accountData.hasOwnProperty('name')) {
                        clearInterval(itvGetAccountInfo);

                        accountInfo['name'] = accountData['name'];
                        if(accountData.hasOwnProperty('image_url')) {
                            accountInfo['image_url'] = accountData['image_url'];
                        }

                        return resolve(accountInfo);
                    }

                    count++;
                }, 500);
            })
        }

        this.CheckUserLogIn = function(logIn, notLogIn, whenNetworkError) {
            if(!navigator.onLine) {
                return whenNetworkError();
            }

            this.getUserId().then(userId => {
                if(!userId) {
                    return notLogIn();
                }

                if(!this.userId) {
                    this.userId = userId;
                }
                else if(this.userId !== userId) {
                    this.userId = userId;
                    return that.alertMessageInTabContent_anotherUnknownAccount();
                }

                this.openPage().then(() => {
                    this.getAccounInfo(userId).then(accountInfo => {
                        return logIn(accountInfo);
                    });
                });
            });
        };
        
        this.scanSingle = function(id, success, error) {
            var Scanner = new FacebookPScanner();
            Scanner.scanSingle(id, success);
        };
        this.scan = function(success, error) {
            window.browser.storage.local.get({ browser: '' }, ({ browser }) => {
                if (browser === 'firefox') {
                    SendRequestToBackground_Website(success, error, 'scan_all', 'ContentPage_Background_FACEBOOK', null, FACEBOOK, this.URL_SETTING_PAGE, false, false);
                } else {
                    var Scanner = new FacebookPScanner();
                    Scanner.scan(success);
                }
            })
        };
        this.fixSingle = function(id, value, forceOpenNewTab, success, error, extra) {
            SendRequestToBackground_Website(success, error, 'fix_single', 'ContentPage_Background_FACEBOOK', {
                id : id,
                value : value,
                extra : extra
            }, FACEBOOK, this.URL_SETTING_PAGE, false, forceOpenNewTab);
        };
        this.scanResultTemplate = FacebookScanResultsTemplate;
        this.ScanSingleResponse = FPScanSingleResponse;
        this.ScanResponse = FPScanResponse;
        this.FixSingleResponse = FPFixSingleResponse;
        this.URL_SETTING_PAGE = URL_LIST.FACEBOOK.URL_SETTING_PAGE;
        this.URL_CHECKLOGIN_PAGE = URL_LIST.FACEBOOK.URL_CHECKLOGIN_PAGE;
        this.URL_CHECKSETTING_PAGE = URL_LIST.FACEBOOK.URL_CHECKSETTING_PAGE;
        this.URL_ACCOUNT_PAGE = URL_LIST.FACEBOOK.URL_ACCOUNT_PAGE;
        this.OVERLAY_HAVE_SIGN_IN_ANOTHER_ACCOUNT = GetPSL10NString('OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT');
        this.OVERLAY_REMOVE_FACEBOOK_APPLICATION = GetPSL10NString('OVERLAY_REMOVE_FACEBOOK_APPLICATION');
        this.forceOpenNewTabWhenFix = true;
        this.ALERT_FORCE_CLOSE_TAB_TITLE = GetPSL10NString('OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN');
        this.ALERT_FIND_ANOTHER_ACCOUNT_SUDDENDLY = GetPSL10NString('OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY');
        
        this.alertLogoClassName = "alert_logo_FACEBOOK";
        this.DoWhenFinishFixing = this.ForceScan;
    };
    

    /*
     TWITTER_WebsiteHelper
     */
    var TWITTER_WebsiteHelper = function() {
        WebsiteHelper.call(this);
        
        var that = this;
        this.Website = TWITTER;
        this.contentPageName = 'ContentPage_Background_TWITTER';
        this.contentDom = TMExt_$('#tabsContent_twitter');
        this.tabDom = TMExt_$('#tabs_twitter');

        this.getUserId = function() {
            let params = {
                name: 'twid',
                url: that.URL_CHECKLOGIN_PAGE
            };
            SendRequestToBackground_getSNSCookies(this.contentPageName, params, this.Website, this.URL_CHECKLOGIN_PAGE);

            return new Promise(resolve => {
                let twid = null;
                let count = 0;
                // wait for twid from cookies
                let itvCheckCookies = setInterval(() => {
                    if(count > GET_ACCOUNT_MAX_COUNT) {
                        clearInterval(itvCheckCookies);
                        return resolve(twid);
                    }
    
                    if(window.UserLoginPage[this.Website] !== null && window.UserLoginPage[this.Website].hasOwnProperty('twid')) {
                        clearInterval(itvCheckCookies);
    
                        twid = window.UserLoginPage[this.Website]['twid'];
                        return resolve(twid);
                    }
                    
                    count++;
                }, 500);
            });
        }

        this.openPage = function() {
            return new Promise(resolve => {
                SendRequestToBackground_openSNSPage(this.contentPageName, null, this.Website, this.URL_ACCOUNT_PAGE)
                .then((ret) => {
                    resolve(ret);
                });
            });
        }

        this.getAccounInfo = function(user_id){
            SendRequestToBackground_getSNSAccountInfo(this.contentPageName, this.Website, this.URL_ACCOUNT_PAGE);

            return new Promise(resolve => {
                let accountInfo = {
                    'user_id': user_id,
                    'Website': this.Website,
                    'image_url': 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
                    'name': ''
                };

                // wait for account information from content script
                let count = 0;
                let itvGetAccountInfo = setInterval(() => {
                    if(count > GET_ACCOUNT_MAX_COUNT) {
                        clearInterval(itvGetAccountInfo);
                        return resolve(accountInfo);
                    }

                    let accountData = window.UserLoginPage.TWITTER;
                    if(accountData.hasOwnProperty('name') && accountData.hasOwnProperty('image_url')) {
                        clearInterval(itvGetAccountInfo);

                        accountInfo['name'] = accountData['name'];
                        accountInfo['image_url'] = accountData['image_url'];
                        return resolve(accountInfo);
                    }

                    count++;
                }, 500);
            });
        };

        this.CheckUserLogIn = function(logIn, notLogIn, whenNetworkError) {
            if(!navigator.onLine) {
                whenNetworkError();
                return;
            }

            this.getUserId().then(userId => {
                if(!userId) {
                    return notLogIn();
                }

                this.openPage().then(() => {
                    this.getAccounInfo(userId).then(accountInfo => {
                        return logIn(accountInfo);
                    });
                });
            });
        };
        
        this.scanSingle = function(id, success, error) {

        };
        this.scan = function(success, error) {
            SendRequestToBackground_Website(success, error, 'scan_all', 'ContentPage_Background_TWITTER', null, TWITTER, this.URL_SETTING_PAGE, false, false);
        };
        this.fixSingle = function(id, value, forceOpenNewTab, success, error) {
            // need to open new tab to fix. Everytime!
            SendRequestToBackground_Website(success, error, 'fix_single', 'ContentPage_Background_TWITTER', {
                id : id,
                value : value
            }, TWITTER, this.URL_FIX_PAGE, false, forceOpenNewTab);
        };
        this.scanResultTemplate = TwitterScanResultsTemplate;
        this.ScanSingleResponse = TPScanSingleResponse;
        this.ScanResponse = TPScanResponse;
        this.FixSingleResponse = TPFixSingleResponse;
        this.URL_CHECKLOGIN_PAGE = URL_LIST.TWITTER.URL_CHECKLOGIN_PAGE;
        this.URL_SETTING_PAGE = URL_LIST.TWITTER.URL_SETTING_PAGE;
        this.URL_FIX_PAGE = URL_LIST.TWITTER.URL_FIX_PAGE;     
        this.URL_ACCOUNT_PAGE = URL_LIST.TWITTER.URL_ACCOUNT_PAGE;
        this.OVERLAY_HAVE_SIGN_IN_ANOTHER_ACCOUNT = GetPSL10NString('OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT');

        this.forceOpenNewTabWhenFix = true;
        this.UI_FixAllSetting = function(isFirstInvoke, list, forceOpenNewTab) {
            that.do_UI_FixAllSetting(isFirstInvoke, list, false);
        };
        
        this.do_UI_FixAllSetting = function(isFirstInvoke, list, forceOpenNewTab) {
            if (isFirstInvoke) {
                reFixList[that.Website] = list;
            }

            if (list.length == 0) {
                that.ForceScan();
            } else {
                 that.UI_FixSetting(list[0].id, list[0].fix_to, forceOpenNewTab, function() {
                    var TwitterFixInterval = setInterval(function(){
                        if(window.TwitterFixFlag == 1) {
                            clearInterval(TwitterFixInterval);
                            window.TwitterFixFlag = 0;
                            that.do_UI_FixAllSetting(false, list.slice(1), false);
                        }
                    }, 500);
                });
            }
        };
        
        this.ALERT_FORCE_CLOSE_TAB_TITLE = GetPSL10NString('OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN');
        this.ALERT_FIND_ANOTHER_ACCOUNT_SUDDENDLY = GetPSL10NString('OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY');

        this.alertMessageOverTabContent_ie_ikbPopup = function() {
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                'title' : GetPSL10NString('tw_str_fix_pop1'),
                'buttons' : [{
                    'title' : GetPSL10NString('OVERLAY_OK'),
                    'callback' : function(){
                        that.removeMessageOverTabContent();
                        that.alertMessageOverTabContent_ie_refresh();
                    }
                }]
            }))
        };

        this.alertMessageOverTabContent_ie_refresh = function() {
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                'closeButton': true,
                'closeEvent': function () {
                    that.ForceScan();
                },
                'title': GetPSL10NString('tw_str_fix_pop2'),
                'buttons': [{
                    'title': GetPSL10NString('OVERLAY_OK'),
                    'callback': function () {
                        that.ForceScan();
                    }
                }]
            }))
        };
        
        this.alertLogoClassName = "alert_logo_TWITTER";
        
        this.showSaveChangeHints = true;
        
        this.saveChangeHintsWording = GetPSL10NString('SAVE_CHANGES_TWITTER_HINT');
		function isTwitterPSupport() {
            if(PUtil.checkBrowser.IsIE_9() || PUtil.checkBrowser.IsIELowerThan_9()) {
                return false;
            }
            return true;
        }
        if(!isTwitterPSupport()) {
            this.alertMessageInTabContent(this.ConstructAlertMessageTwitterOnIE9());
        }
	
	};
    

    /*
     GOOGLEPLUS_WebsiteHelper
     */
    var GOOGLEPLUS_WebsiteHelper = function() {
        WebsiteHelper.call(this);

        var that = this;
        this.Website = GOOGLEPLUS;
        this.contentPageName = 'ContentPage_Background_GOOGLEPLUS';
        this.contentDom = TMExt_$('#tabsContent_googlePlus');
        this.tabDom = TMExt_$('#tabs_googlePlus');

        this.CheckUserLogIn = function(logIn, notLogIn, whenNetworkError) {
            if(!navigator.onLine) {
                whenNetworkError();
                return;
            }

            SendWebRequest({
                'type' : 'GET',
                'data' : null,
                'dataType' : 'html',
                'url' : this.URL_CHECKLOGIN_PAGE
            }, function(data) {

                var logIn_RelatedData = {
                    'Website' : 'GOOGLEPLUS',
                    'name' : "",
                    'image_url' : ""
                };
                
                function method_1() {
                    try {
                        /*
                        Dom Sample:
                        <img class="gb_ea" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-src="//lh5.googleusercontent.com/-0zey8nF3asI/AAAAAAAAAAI/AAAAAAAAAAA/F0cQTYUwFgo/s48-c/photo.jpg" alt="Name">
                        */
                        
                        var photoIconPattern = [
                            'img[data-src*="s48-c-mo-md/photo.jpg"]',
                            'img[data-src*="s48-c-mo/photo.jpg"]'
                        ];
                        var img_found;
                        for (var i in photoIconPattern) {
                            try{
                                var img_found_photo = TMExt_$(data).find(photoIconPattern[i]);
                                if (img_found_photo.length != 0) {
                                    img_found = img_found_photo;
                                    break;
                                }
                            } catch(e){
                                PSDebug.log(e);
                            }
                        }
                        // image_url
                        if(!img_found || img_found.length === 0){
                            logIn_RelatedData['name'] = "";
                            logIn_RelatedData['image_url'] = "";
                            return;
                        }
                        
                        img_found = img_found.eq(0);
                        var ORIGIN_IMAGE_SIZE = "48";
                        var EXPECTED_IMAGE_SIZE = "50";
                        //var image_origin = 'https:' + img_found.attr('data-src');
                        var image_origin = img_found.attr('data-src');
                        var image_origin_split = image_origin.split('/');
                        if (image_origin_split.length > 1) {
                            image_origin_split[image_origin_split.length - 2] = image_origin_split[image_origin_split.length - 2].replace(ORIGIN_IMAGE_SIZE, EXPECTED_IMAGE_SIZE);
                            logIn_RelatedData['image_url'] = image_origin_split.join('/');
                        }
                        
                        // name
                        /*
                            Dom sample
                            <a class="gb_ma gb_na" href="/?authuser=0" target="_blank" rel="noreferrer">
                                <img class="gb_pa" src="//lh5.googleusercontent.com/-0zey8nF3asI/AAAAAAAAAAI/AAAAAAAAAAA/F0cQTYUwFgo/s48-c/photo.jpg" alt="Google+ Profile Icon">
                                <div class="gb_qa">
                                    <div class="gb_ra">name</div>
                                    <div class="gb_sa">xxx@ddd.com (default)</div>
                                </div>
                            </a>
                        */
                        logIn_RelatedData['name'] = img_found.next().find('div').eq(0).text();
                    } catch(err) {
                        logIn_RelatedData['name'] = "";
                        logIn_RelatedData['image_url'] = "";
                    }
                    return;
                }
                
                method_1();
                if (logIn_RelatedData['name'] != "" && logIn_RelatedData['image_url'] != "") {
                    return checkAndReturn()
                }
                
                // For Google+, it is hard to see whether user did not log in or dom change, so we still use the old method:
                // If found user ID, show log in, else show not log in. Do not check if Dom has changed.
                return notLogIn();
                
                function checkAndReturn() {
                    if (!that.isOriginalUser(logIn_RelatedData['name']) && !checkLogInTimerList[that.Website]) {
                        return that.alertMessageInTabContent_anotherUnknownAccount();
                    }
                    return logIn(logIn_RelatedData)
                }
            }, whenNetworkError);
        };
        
        this.scanSingle = function(id, success, error) {
            SendRequestToBackground_Website(success, error, 'scan_single', 'ContentPage_Background_GOOGLEPLUS', {
                id : id
            }, GOOGLEPLUS, this.URL_SETTING_PAGE, false, false);
        };
        this.scan = function(success, error) {
            if(PUtil.checkBrowser.IsIE()){
                SendRequestToBackground_Website(success, error, 'scan_all', 'ContentPage_Background_GOOGLEPLUS', null, GOOGLEPLUS, this.URL_SETTING_PAGE, false, true);    
            }else{
                SendRequestToBackground_Website(success, error, 'scan_all', 'ContentPage_Background_GOOGLEPLUS', null, GOOGLEPLUS, this.URL_SETTING_PAGE, false, false);   
            }
        };
        this.scanOpenNewTabForcely = function(success, error) {
            SendRequestToBackground_Website(success, error, 'scan_all', 'ContentPage_Background_GOOGLEPLUS', null, GOOGLEPLUS, this.URL_SETTING_PAGE, false, true);
        };
        this.scanNotOpenTab = function(success, error){
            SendRequestToBackground_Website(success, error, 'scan_all', 'ContentPage_Background_GOOGLEPLUS', null, GOOGLEPLUS, this.URL_SETTING_PAGE, false, false);
        };

        this.fixSingle = function(id, value, forceOpenNewTab, success, error) {
            var that = this;
            that.bActiveNewTab = true;

            SendRequestToBackground_Website(success, error, 'fix_single', 'ContentPage_Background_GOOGLEPLUS', {
                id : id,
                value : value
            }, GOOGLEPLUS, this.URL_SETTING_PAGE, that.bActiveNewTab, forceOpenNewTab);
        };

        this.DoWhenFinishFixing = function(){
            this.ForceScan({'NotOpenTab': true});
        };

        this.scanResultTemplate = GooglePlusScanResultsTemplate;
        this.ScanSingleResponse = GPPScanSingleResponse;
        this.ScanResponse = GPPScanResponse;
        this.FixSingleResponse = GPPFixSingleResponse;
        this.URL_SETTING_PAGE = URL_LIST.GOOGLEPLUS.URL_SETTING_PAGE;
        this.URL_CHECKLOGIN_PAGE = URL_LIST.GOOGLEPLUS.URL_CHECKLOGIN_PAGE;
        this.URL_ACCOUNT_PAGE = URL_LIST.GOOGLEPLUS.URL_ACCOUNT_PAGE;
        this.OVERLAY_HAVE_SIGN_IN_ANOTHER_ACCOUNT = GetPSL10NString('OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT');

        this.forceOpenNewTabWhenFix = true;
        this.ALERT_FORCE_CLOSE_TAB_TITLE = GetPSL10NString('OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN');
        this.ALERT_FIND_ANOTHER_ACCOUNT_SUDDENDLY = GetPSL10NString('OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY');
        
        this.alertLogoClassName = "alert_logo_GOOGLEPLUS";
        
        
        function isGooglePSupport() {
            if(PUtil.checkBrowser.IsIE_8() || PUtil.checkBrowser.IsIELowerThan_8()) {
                return false;
            }
            return true;
        }
        if(!isGooglePSupport()) {
            this.alertMessageInTabContent(this.ConstructAlertMessageGooglePonIE8());
        }
    };
    
    /*
     LINKEDIN_WebsiteHelper
     */
    var LINKEDIN_WebsiteHelper = function() {
        WebsiteHelper.call(this);

        var that = this;
        this.Website = LINKEDIN;
        this.contentPageName = 'ContentPage_Background_LINKEDIN';
        this.contentDom = TMExt_$('#tabsContent_linkedin');
        this.tabDom = TMExt_$('#tabs_linkedin');

        this.openPage = () => {
            return new Promise(resolve => {
                SendRequestToBackground_openSNSPage(this.contentPageName, null, this.Website, this.URL_ACCOUNT_PAGE)
                .then((ret) => {
                    resolve(ret);
                });
            });
        }

        this.tryGetAccounInfoFromWebsitePage = () => {
            SendRequestToBackground_getSNSAccountInfo(this.contentPageName, this.Website, this.URL_ACCOUNT_PAGE);

            return new Promise(resolve => {
                // wait for account information from content script
                let count = 0;
                let itvGetAccountInfo = setInterval(() => {
                    if(count > GET_ACCOUNT_MAX_COUNT) {
                        clearInterval(itvGetAccountInfo);
                        return resolve(false);
                    }

                    if(window.UserLoginPage.LINKEDIN.hasOwnProperty('name') ) {
                        clearInterval(itvGetAccountInfo);
                        return resolve(true);
                    }

                    count++;
                }, 500);
            });
        }

        this.getAccounInfoFromWebsitePage = async () => {
            let accountInfo = {
                'image_url': '',
                'name': ''
            };

            await this.openPage();

            let ret = await this.tryGetAccounInfoFromWebsitePage();
            if(ret) {
                accountInfo.name = window.UserLoginPage.LINKEDIN.name;
                accountInfo.image_url = window.UserLoginPage.LINKEDIN.image_url;
            }

            PSDebug.log('getAccounInfoFromWebsitePage: accountInfo =' + JSON.stringify(accountInfo));

            return accountInfo;
        };

        this.getAccountInfo = () => {
            return new Promise(resolve => {
                let url = that.URL_CHECK_ACCOUNT_PAGE;
                let accountInfo = {
                    'Website': 'LINKEDIN',
                    'name': '',
                    'image_url': ''
                };

                SendWebRequest({
                    'type' : 'GET',
                    'data' : null,
                    'dataType' : 'html',
                    'url' : url
                }, (data) => {
                    try {
                        let $htmlContent = TMExt_$(data);
                        if($htmlContent.find('img.profile-photo').length != 0 || $htmlContent.find("i.profile-image").length != 0) {
                            // Original LikedIn
                            let userInfoDOM = $htmlContent.find('img.profile-photo').length == 0 ? $htmlContent.find("i.profile-image"):$htmlContent.find('img.profile-photo');
                            accountInfo['name'] = $htmlContent.find('div.user-title h2').text();
                            accountInfo['image_url'] = userInfoDOM.attr('src');
                        }
                        else if($htmlContent.find("#minimal-nav-account-btn").length != 0) {
                            // SEG-90487 LikedIn DOM updated
                            let userInfoDOM = $htmlContent.find("#minimal-nav-account-btn");
                            accountInfo['name'] = userInfoDOM.find('.member-name').text();
                            accountInfo['image_html'] = userInfoDOM.find('#person-ghost-images');
                        }
                        else {
                            PSDebug.log('method: cannot find DOM');
                        }
                    } catch(err) {
                        PSDebug.error('getAccounInfo: err = ' + err);
                    }

                    if(!accountInfo.name) {
                        this.getAccounInfoFromWebsitePage()
                        .then((getRet) => {
                            accountInfo['name'] = getRet['name'];
                            accountInfo['image_url'] = getRet['image_url']
                            resolve(accountInfo);
                        })
                    }
                    else {
                        resolve(accountInfo);
                    }
                    
                }, () => {
                    resolve(accountInfo);
                });
            });
        }

        this.isUserLoggedIn = function() {
            let ret = false;
            let params = {
                name: 'liap',
                url: that.URL_CHECKLOGIN_PAGE
            };
            SendRequestToBackground_getSNSCookies(this.contentPageName, params, this.Website, this.URL_CHECKLOGIN_PAGE);

            return new Promise(resolve => {
                let count = 0;
                // wait for liap from cookies
                let itvCheckCookies = setInterval(() => {
                    if(count > GET_ACCOUNT_MAX_COUNT) {
                        clearInterval(itvCheckCookies);
                        return resolve(ret);
                    }
    
                    if(window.UserLoginPage[this.Website] !== null && window.UserLoginPage[this.Website].hasOwnProperty('liap')) {
                        clearInterval(itvCheckCookies);

                        ret = window.UserLoginPage[this.Website]['liap'];
                        return resolve(ret);
                    }
                    
                    count++;
                }, 500);
            });
        };

        this.CheckUserLogIn = function(logIn, notLogIn, whenNetworkError) {
            if(!navigator.onLine) {
                whenNetworkError();
                return;
            }

            this.isUserLoggedIn()
            .then(ret => {
                if(!ret) {
                    notLogIn();
                    return;
                }

                this.getAccountInfo()
                .then(accountInfo => {
                    PSDebug.log('accountInfo = ' + JSON.stringify(accountInfo));
                    logIn(accountInfo);
                })
            })
        };
        
        this.scanSingle = function(id, success, error) {
            //var Scanner = new LinkedinPScanner();
            //Scanner.scanSingle(id, success);
            SendRequestToBackground_Website(success, error, 'scan_single', 'ContentPage_Background_LINKEDIN', {
                id : id
            }, LINKEDIN, this.URL_SETTING_PAGE, false, false);
        };
        this.scan = function(success, error) {
            //var Scanner = new LinkedinPScanner();
            //Scanner.scan(success);
            SendRequestToBackground_Website(success, error, 'scan_all', 'ContentPage_Background_LINKEDIN', null, LINKEDIN, this.URL_SETTING_PAGE, false, false);
        };
        this.fixSingle = function(id, value, forceOpenNewTab, success, error) {
            SendRequestToBackground_Website(success, error, 'fix_single', 'ContentPage_Background_LINKEDIN', {
                id : id,
                value : value
            }, LINKEDIN, this.URL_FIX_SETTING_PAGE[id], false, forceOpenNewTab);
        };
        this.scanResultTemplate = LinkedinScanResultsTemplate;
        this.ScanSingleResponse = LIPScanSingleResponse;
        this.ScanResponse = LIPScanResponse;
        this.FixSingleResponse = LIPFixSingleResponse;
        this.URL_SETTING_PAGE = URL_LIST.LINKEDIN.URL_SETTING_PAGE;
        this.URL_FIX_SETTING_PAGE = URL_LIST.LINKEDIN.URL_FIX_SETTING_PAGE;
        this.URL_CHECKLOGIN_PAGE = URL_LIST.LINKEDIN.URL_CHECKLOGIN_PAGE;
        this.URL_ACCOUNT_PAGE = URL_LIST.LINKEDIN.URL_ACCOUNT_PAGE;
        this.URL_CHECK_ACCOUNT_PAGE = URL_LIST.LINKEDIN.URL_CHECK_ACCOUNT_PAGE;
        this.OVERLAY_HAVE_SIGN_IN_ANOTHER_ACCOUNT = GetPSL10NString('OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT');

        this.forceOpenNewTabWhenFix = false;
        this.forceOpenNewTabMultiTimeWhenFix = false; // for linkedin fix and open multiple tabs
        this.alertMessageOverTabContent_promoteUserInputPS = function(isFirstInvoke, list, forceOpenNewTab) {
            var that = this;
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                'title' : GetPSL10NString('OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN'),
                'buttons' : [{
                    'title' : GetPSL10NString('OVERLAY_OK'),
                    'callback' : function(){
                        that.removeMessageOverTabContent();
                        that.alertMessageOverTabContent_loading()
                        that.do_UI_FixAllSetting_withConfirmResultPopup(isFirstInvoke, list, forceOpenNewTab);
                    }
                }],
                'checkBox' : {
                    'title' : GetPSL10NString('OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE'),
                    'callback' : function(isChecked){
                        // when isChecked, set disabled which is dont show this again
                        LinkedinSetShowPromotePS(!isChecked)
                    }
                }
            }))
        };
        
        this.checkSettingPageLoggedIn = function(logIn, notLogIn, whenNetworkError){
            SendWebRequest({
                'type' : 'GET',
                'data' : null,
                'dataType' : 'html',
                'url' : this.URL_SETTING_PAGE
            }, function(data) {
                var $htmlContent = TMExt_$(data);
                
                // sometimes it will indicate user to sign in, sometimes indicate to joinin
                if( $htmlContent.find('input[name="signin"]').length !== 0 || 
                    $htmlContent.find('#register-custom-nav').length !== 0 ||
                    $htmlContent.find('.join-btn').length !== 0){
                    // not log in
                    return notLogIn();
                }
                
                return logIn();
            }, whenNetworkError);
        };
        
        this.UI_FixAllSetting = function(isFirstInvoke, list, forceOpenNewTab) {
            var that = this;
            this.checkSettingPageLoggedIn(function(){
                // logged in
                return that.do_UI_FixAllSetting_normal(isFirstInvoke, list, forceOpenNewTab);
            }, function(){
                // not logged in
                return that.do_UI_FixAllSetting_notLoggedIn(isFirstInvoke, list, forceOpenNewTab);
            }, function(){
                // network error
                return that.alertMessageInTabContent_networkError();
            });
        };
        
        this.do_UI_FixAllSetting_normal = function(isFirstInvoke, list, forceOpenNewTab) {
            var that = this;
            
            if (isFirstInvoke) {
                reFixList[that.Website] = list;
            }
            if (list.length == 0) {
                that.DoWhenFinishFixing();
            } else {
                that.UI_FixSetting(list[0].id, list[0].fix_to, forceOpenNewTab, function() {
                    that.do_UI_FixAllSetting_normal(false, list.slice(1), true);
                });
            }
        };
        
        this.do_UI_FixAllSetting_notLoggedIn = function(isFirstInvoke, list, forceOpenNewTab) {
            if(LinkedinIsNeedToShowPromotePS()){
                return that.alertMessageOverTabContent_promoteUserInputPS(isFirstInvoke, list, forceOpenNewTab);
            }else{
                return that.do_UI_FixAllSetting_withConfirmResultPopup(isFirstInvoke, list, forceOpenNewTab); 
            }
        };

        this.do_UI_FixAllSetting_withConfirmResultPopup = function(isFirstInvoke, list, forceOpenNewTab) {
            // after fix all, will show a popup to let user confirm to re-scan.
            if (isFirstInvoke) {
                reFixList[that.Website] = list;
            }

            if (list.length == 0) {
                that.alertMessageOverTabContent_confirmPassword();
            } else {
                that.UI_FixSetting(list[0].id, list[0].fix_to, forceOpenNewTab, function() {
                    that.do_UI_FixAllSetting_withConfirmResultPopup(false, list.slice(1), false);
                });
            }
        };
        
        this.alertMessageOverTabContent_confirmPassword = function(){
            var that = this;
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                'closeButton' : true,
                'closeEvent' : function(){
                    that.ForceScan();
                },
                'title' : GetPSL10NString('OVERLAY_LINKEDIN_CONFIRM_PASSWORD'),
                'buttons' : [{
                    'title' : GetPSL10NString('OVERLAY_OK'),
                    'callback' : function(){
                        that.ForceScan();
                    }
                }]
            }))
        }
        
        this.ALERT_FORCE_CLOSE_TAB_TITLE = GetPSL10NString('OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN');
        this.ALERT_FIND_ANOTHER_ACCOUNT_SUDDENDLY = GetPSL10NString('OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY');
        
        this.alertLogoClassName = "alert_logo_LINKEDIN";
    };
})();
