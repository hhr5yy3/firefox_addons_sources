(function() {
    var imports = window;
    var exports = window;
    var $ = TMExt_$;

    //Change L10N wording
    var ChangePageL10NWording = function(){
        /*
         title
         */
        //$('title').text(GetPSL10NString("HTML_PAGE_TITLE"))
        document.title = GetPSL10NString("HTML_PAGE_TITLE");
        
        $('.header_content_area_getHelp').text(GetPSL10NString("HEADER_GETHELP"));
        if(PUtil.checkBrowser.IsIE()){
            // As IE toolbar may be disabled, so we have to get this link from L10n file instead of call background API.
            // If not in IE, we could set it by call background API (UI_helper.js).
            $('.header_content_area_getHelp').attr('href',GetPSL10NString("HEADER_GETHELP_LINK"));   
        }
        /*
         tab
         */
        var tab_area = $('#tabs')
        
        tab_area.find('#tabs_facebook .title').text(GetPSL10NString("HTML_TITLE_FACEBOOK"))
        tab_area.find('#tabs_twitter .title').text(GetPSL10NString("HTML_TITLE_TWITTER"))
        tab_area.find('#tabs_googlePlus .title').text(GetPSL10NString("HTML_TITLE_GOOGLEPLUS"))
        tab_area.find('#tabs_linkedin .title').text(GetPSL10NString("HTML_TITLE_LINKEDIN"))
        tab_area.find('#tabs_chrome .title').text(GetPSL10NString("HTML_TITLE_CHROME"))
        tab_area.find('#tabs_firefox .title').text(GetPSL10NString("HTML_TITLE_FIREFOX"))
        tab_area.find('#tabs_internet_explorer .title').text(GetPSL10NString("HTML_TITLE_INTERNET_EXPLORER"))
        tab_area.find('.status').text(GetPSL10NString("HTML_CONCERNS_UNKNOWN"))
        
        tab_area.find('.SNSAreaTitle').text(GetPSL10NString("SNS_AREA_TITLE"))
        tab_area.find('.BrowserAreaTitle').text(GetPSL10NString("BROWSERS_AREA_TITLE"))
    
        /*
         footer
         */
        var footer_area = $('#footer')
        footer_area.find('[name="footer_trend_dot_com"]').text(GetPSL10NString("HTML_FOOTER_TREND_DOT_COM"))
        footer_area.find('[name="footer_trend_dot_com"]').attr('href',GetPSL10NString("HTML_FOOTER_TREND_DOT_COM_LINK"));
        footer_area.find('[name="footer_copyright"]').text(GetPSL10NString("HTML_FOOTER_COPYRIGHT"))
        
        /*
         IE6/7 error message
         */
        $('.IE_LowVersion_wording').text(GetPSL10NString('UPDATE_TO_LATEST_IE'))
    };
    
    //Change L10N image
    var ChangePageL10NImage = function(_locale){
        window.browser.storage.local.get('locale', (data) => {
            var locale = _locale || LocalUtil.ParamFromURL.Locale() ;
            if(locale === "default"){
                locale = data.locale;
            }
            if (locale) {
                //Product Name Image
                var product_name_img = imports.GetPSL10NImage(locale, 'product_name_Titanium.png');
                $('.header_logo_area_productName_image').attr('src', product_name_img);
            }
        })
    };
    
    exports.InitL10NFromExtension = function(locale) {
        //Update corresponding L10N resources
        ChangePageL10NImage(locale);
    };
    
    try{
        ChangePageL10NWording();
        ChangePageL10NImage();
    }catch(e){
        if (typeof (console) != 'undefined' && typeof (console.log) != 'undefined'){
            console.log('Error:' + e);
        }
    }
})();
