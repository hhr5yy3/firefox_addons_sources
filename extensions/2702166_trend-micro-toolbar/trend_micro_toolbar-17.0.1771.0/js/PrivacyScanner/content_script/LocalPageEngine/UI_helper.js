(function() {
    window.GetListStyleFacebookData = function(data) {
        var data_result_list = [];

        for (var i = 0; i < data['PrivacySetting']['Items'].length; i++) {
            data_result_list.push(data['PrivacySetting']['Items'][i]);
        }

        for (var i = 0; i < data['TimeLineAndTagging']['Items'].length; i++) {
            data_result_list.push(data['TimeLineAndTagging']['Items'][i]);
        }

        for (var i = 0; i < data['AppsAndWebsites']['Items'].length; i++) {
            data_result_list.push(data['AppsAndWebsites']['Items'][i]);
        }

        return data_result_list;
    };
    /*
     UI helper
     */

    /*
     set vertical
     */
    window.SetVerticalCenter = function(node, addToTop) {
        if (!node) {
            return;
        }

        if (!node.is(':visible')) {
            return;
        }
        // PSDebug.error(parentNode.height() + ", " + childNode.height())

        var ah = node.outerHeight();
        if (ah == 0) {
            return;
        }
        var ph = node.parent().height();
        var mh = Math.ceil((ph - ah) / 2);
        if (mh > 0) {
            if (addToTop) {
                node.css('margin-top', mh + addToTop);
            } else {
                node.css('margin-top', mh);
            }
        }
    };
    
    /*
     set text horizontal center
     */
    window.SetTextHorizontalCenter = function(node) {
        if (!node) {
            return;
        }

        if (!node.is(':visible')) {
            return;
        }
        
        var child_width = node.width();
        if (child_width == 0) {
            return;
        }
        var parent_width = node.parent().width();
        var diff_width = Math.ceil((parent_width - child_width) / 2);
        if (diff_width > 0) {
            node.css('margin-left', diff_width);
        }
    };
    
    window.SetHorizontalCenter = function(node) {
        if (!node) {
            return;
        }

        if (!node.is(':visible')) {
            return;
        }
        
        var child_width = node.outerWidth();
        if (child_width == 0) {
            return;
        }
        var parent_width = node.parent().width();
        var diff_width = Math.ceil((parent_width - child_width) / 2);
        if (diff_width > 0) {
            node.css('margin-left', diff_width);
        }
    };
    
    window.SetAbsoluteCenter = function(node) {
        if (!node) {
            return;
        }

        if (!node.is(':visible')) {
            return;
        }
        // PSDebug.error(parentNode.height() + ", " + childNode.height())

        var ah = node.outerHeight();
        if (ah == 0) {
            return;
        }
        var ph = node.parent().outerHeight();
        var mh = Math.ceil((ph - ah) / 2);
        if (mh > 0) {
            node.css('top', mh);
        }
    };
    
    

    window.SetVerticalCenterPadding = function(node) {
        if (!node) {
            return;
        }

        if (!node.is(':visible')) {
            return;
        }

        // PSDebug.error(parentNode.height() + ", " + childNode.height())

        var ah = node.height();
        if (ah == 0) {
            return;
        }
        var ph = node.parent().height();
        var mh = Math.ceil((ph - ah) / 2);
        if (mh > 0) {
            node.css('padding-top', mh);
        }
    };

    window.ReUpdateUI_Layout = function() {
        var list_privacy_item_content = TMExt_$('.privacy_item_content');

        /*
         changesMade_area_hitArea
         */
        var save_changes_area = TMExt_$('.changesMade_area');
        for (var i = 0; i < save_changes_area.length; i++) {
            SetVerticalCenter(save_changes_area.eq(i).find('.changesMade_area_hitArea'));
            SetVerticalCenter(save_changes_area.eq(i).find('.changesMade_area_saveChanges'));
        }

        /*
         privacy_item_content_current_arrow
         */
        var privacy_item_content_current_arrow = TMExt_$('.privacy_item_content_current_arrow');
        for (var i = 0; i < privacy_item_content_current_arrow.length; i++) {
            SetVerticalCenter(privacy_item_content_current_arrow.eq(i));
        }
        
        /*
         head image
         */
        var header_image_list = TMExt_$('.div_head_image');
        for (var i = 0; i < header_image_list.length; i++) {
            SetVerticalCenter(header_image_list.eq(i));
        }
        
        /*
         alert over tab content fix alll popup
         */
        var overlay_quickFix_contentWrapper = TMExt_$('.overlay_quickFix_contentWrapper');
        for (var i = 0; i < overlay_quickFix_contentWrapper.length; i++) {
            SetVerticalCenter(overlay_quickFix_contentWrapper.eq(i));
        }
        
        /*
            fix all setting item --> current
        */
        var fixAll_item_content_current = TMExt_$('.fixAll_item_content_current');
        for (var i = 0; i < fixAll_item_content_current.length; i++) {
            SetVerticalCenter(fixAll_item_content_current.eq(i));
        }
        
        /*
            fix all setting item --> toIcon
        */
        var fixAll_item_content_toIcon = TMExt_$('.fixAll_item_content_toIcon');
        for (var i = 0; i < fixAll_item_content_toIcon.length; i++) {
            SetVerticalCenter(fixAll_item_content_toIcon.eq(i));
        }
        
        /*
            fix all setting item --> suggestion
        */
        var fixAll_item_content_suggestion = TMExt_$('.fixAll_item_content_suggestion');
        for (var i = 0; i < fixAll_item_content_suggestion.length; i++) {
            SetVerticalCenter(fixAll_item_content_suggestion.eq(i));
        }
        
        /*
            alert message in tab content title and bottom button    
        */
        var alert_message_title = TMExt_$('.alertInTabContentArea_title_content');
        for (var i = 0; i < alert_message_title.length; i++) {
            SetTextHorizontalCenter(alert_message_title.eq(i));
        }
        
        var alertInTabContentArea_button = TMExt_$('.alertInTabContentArea_button');
        for (var i = 0; i < alertInTabContentArea_button.length; i++) {
            SetHorizontalCenter(alertInTabContentArea_button.eq(i));
        }
        
        /*
            privacy_item_content_ul set its min-width
        */
        var privacy_item_content_ul = TMExt_$('.privacy_item_content_ul');
        for (var i = 0; i < privacy_item_content_ul.length; i++) {
            var current_ul = privacy_item_content_ul.eq(i);
            var button_width = current_ul.prev().width();
            current_ul.css({"min-width": button_width + 24});
        }
        
        /*
            width of user info area 
        */
        var div_head_wrapper = TMExt_$('.div_head_wrapper');
        var user_area_name = TMExt_$('.user_area_name');
        for (var i = 0; i < div_head_wrapper.length; i++) {
            var current_head_wrapper = div_head_wrapper.eq(i);
            var current_user_area_name = user_area_name.eq(i);
            if(!current_head_wrapper.is(':visible')){
                continue;
            }
            current_head_wrapper.css({
                width: current_user_area_name.outerWidth() + 2
            });
        }
        
        /*
            tooltip position update
        */
        ToolTipHelper.RefreshToolTip();
    };
    
    window.ToolTipHelper = (function(){
        var _$target = null;
        var tooltip = TMExt_$('.tooltip');

        var ShowTooltip = function(message, $target){
            _$target = $target;
            tooltip.show();
            
            // set content
            tooltip.find('.tooltipContent').text(message);
            
            PositionTooltip(message);
        }

        var PositionTooltip = function(){
            var tooltipArrow = tooltip.find('.tooltipArrow');
            var tooltipContent = tooltip.find('.tooltipContent');
            
            // set position
            var target_offset = _$target.offset();
            tooltip.css({
                top: target_offset.top + _$target.height(),
                left: target_offset.left + (_$target.outerWidth() - tooltipContent.outerWidth())/2
            });
            tooltipArrow.css({
                left: (tooltipContent.outerWidth() - tooltipArrow.width())/2
            });
        }
        
        var HideTooltip = function(){
            tooltip.hide();
        }
        
        var RefreshToolTip = function(){
            if(_$target){
                PositionTooltip();    
            }
        }
    
        return {
            ShowTooltip : ShowTooltip,
            HideTooltip : HideTooltip,
            RefreshToolTip : RefreshToolTip
        }    
    })();
    
    window.GetHowManyConcerns = function(response_list) {
        var count = 0;
        for (var i = 0; i < response_list.length; i++) {
            if (response_list[i]['Risk'].indexOf(response_list[i]['Current']) != -1) {
                count++;
            }
        }
        return count;
    };    

    window.isSettingRisky = function(currentSetting, jsonRisk) {
        if (TMExt_$.inArray(parseInt(currentSetting), jsonRisk) != -1) {
            return true;
        } else {
            return false;
        }
    };

    window.Initialize_UI = function() {
        /*
         check which tab should show in local page
         */
        var showSitesList = OptionSetting.getShowSiteOrBrowserList();
        var promoteSitesList = OptionSetting.getPromoteSiteOrBrowserList();
        for (var i = 0; i < showSitesList.length; i++) {
            var _scannerHelper = get_scannerHelper(showSitesList[i]);
            
            _scannerHelper.tabDom.show()
            _scannerHelper.contentDom.show()
            
            if (TMExt_$.inArray(showSitesList[i], promoteSitesList) !== -1) {
                // this site is not in support scope.
                _scannerHelper.alertMessageInTabContent_installProduct();
            }
            
            /*
                if is browser, show browser lsit
            */
            if(TMExt_$.inArray(showSitesList[i], AllBrowsers) !== -1){
                TMExt_$(".BrowserArea").show();
                TMExt_$(".SNSArea").addClass("notOnlySNS");
            }
        };
        
        /*
            customize footer area (according iTis side's request)
        */
        if(!(window.ProductFeatureConfiguration && window.ProductFeatureConfiguration.LocalPage.DisplayFootWebSiteArea == false)){
            TMExt_$('a[name="footer_trend_dot_com"]').show();
        }
        
        /*
          set get help link (click event)   
        */
        if(!PUtil.checkBrowser.IsIE()){
            TMExt_$('.header_content_area_getHelp').click(function(){
                SendRequestToBackground_openHelpLink();
            });
        }
    }

    window.LinkedinIsNeedToShowPromotePS = function() {
        return _GetGolbalSetting(SettingConstants.is_first_fixlinkedin);
    }

    window.LinkedinSetShowPromotePS = function(isEnabled) {
        SetGolbalSettingEnabled(SettingConstants.is_first_fixlinkedin, isEnabled);
    }
    
    window.IsNeedToShowSaveChangesHint = function() {
        return _GetGolbalSetting(SettingConstants.is_first_savechange);
    }

    window.SetShowSaveChangesHint = function(isEnabled) {
        SetGolbalSettingEnabled(SettingConstants.is_first_savechange, isEnabled);
    }
    
    var _GetGolbalSetting = function(param) {
        return PrivacyScannerGlobalSettings[param];
    }
    
    var _SetGolbalSetting = function(param, isEnabled) {
        PrivacyScannerGlobalSettings[param] = isEnabled;
    }

    var SetGolbalSettingEnabled = function(param, isEnabled) {
        // Global variable
        _SetGolbalSetting(param, isEnabled);
    }
})();
