(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "การขอรับความช่วยเหลือ",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=TH-TH&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "ไม่สามารถเชื่อมต่อกับอินเทอร์เน็ต ตรวจสอบการเชื่อมต่อและลองใหม่อีกครั้ง",
        PROMOTE_TITANIUM_CONTENT : "รับการปกป้องจาก Trend Micro เพื่อช่วยปกป้องความเป็นส่วนตัวของคุณบน Facebook, X และ LinkedIn",
        PROMOTE_TITANIUM_URL : "http://www.trendmicro.co.th",
        OVERLAY_OK : "ตกลง",
        OVERLAY_SCAN : "สแกน",
        OVERLAY_SIGN_IN : "ลงชื่อเข้าระบบ",
        OVERLAY_CANCEL : "ยกเลิก",
        OVERLAY_REMOVE : "ลบ",
        
        OVERLAY_CHECKNOW : "ตรวจสอบเดี๋ยวนี้",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "ดูเหมือนว่าคุณได้เปลี่ยนไปเป็นบัญชี Facebook บัญชีอื่น คุณต้องการ ตรวจสอบสิ่งนี้แทนหรือไม่",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "ดูเหมือนว่าคุณได้เปลี่ยนไปใช้บัญชี X อื่น คุณต้องการตรวจสอบบัญชีนี้แทนหรือไม่",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "ดูเหมือนว่าคุณได้เปลี่ยนไปเป็นบัญชี Google+ บัญชีอื่น คุณต้องการตรวจสอบสิ่งนี้แทนหรือไม่",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "ดูเหมือนว่าคุณได้เปลี่ยนเป็นบัญชี LinkedIn อื่นแล้ว คุณต้องการตรวจสอบบัญชีนี้แทนหรือไม่",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "หลังจากยืนยันรหัสผ่านแล้ว ให้คลิกที่ปุ่มเพื่อดูผลลัพธ์",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "หลังจากลงชื่อเ้ข้าระบบแล้ว คลิก ตกลง เพื่อดูผลลัพธ์",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "หลังจากลงชื่อเข้าใช้บัญชีที่ถูกต้องแล้ว ให้คลิกที่ปุ่มด้านล่าง",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "หลังจากลงชื่อเข้าใช้บัญชีที่ถูกต้องแล้ว ให้คลิกที่ปุ่มด้านล่าง",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "หลังจากลงชื่อเข้าใช้บัญชีที่ถูกต้องแล้ว ให้คลิกที่ปุ่มด้านล่าง",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "หลังจากลงชื่อเข้าใช้บัญชีที่ถูกต้องแล้ว ให้คลิกที่ปุ่มด้านล่าง",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "เมื่อไซต์ Facebook เปิดขึ้นอีกครั้งโดยอัตโนมัติ โปรดเปิดทิ้งไว้เพื่อสแกนการตั้งค่า",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "เมื่อเว็บไซต์ X เปิดขึ้นอีกครั้งโดยอัตโนมัติ โปรดเปิดทิ้งไว้เพื่อสแกนการตั้งค่า",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "เมื่อไซต์ Google+ เปิดขึ้นอีกครั้งโดยอัตโนมัติ โปรดเปิดทิ้งไว้เพื่อสแกนการตั้งค่า",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "เมื่อไซต์ LinkedIn เปิดขึ้นอีกครั้งโดยอัตโนมัติ โปรดเปิดทิ้งไว้เพื่อสแกนการตั้งค่า",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "ไม่สามารถเชื่อมต่อกับอินเทอร์เน็ต ตรวจสอบการเชื่อมต่อและลองใหม่อีกครั้ง",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "สำหรับการปกป้องของคุณ คุณต้องใส่รหัสผ่าน X ของคุณอีกครั้งตอนนี้เพื่อยืนยันการเปลี่ยนแปลงเหล่านี้ คลิกที่ปุ่มเพื่อดำเนินการต่อ",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "ไม่'ต้องแสดงสิ่งนี้อีก",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "เพื่อเป็นการปกป้องคุณ คุณจะต้องลงชื่อเข้าระบบ LinkedIn อีกครั้งในตอนนี้เพื่อยืนยันการเปลี่ยนแปลงนี้ คลิกที่ปุ่มเพื่อดำเนินการต่อ",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "ไม่ใช่บัญชีของคุณหรือ",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "ลงชื่อเข้าใช้ให้ถูกต้อง",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "คุณมี %d ข้อกังวลด้านความเป็นส่วนตัว",
        CONCERN_TITLE_ONE_CONCERN : "คุณมี %dข้อกังวลด้านความเป็นส่วนตัว",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "แก้ไขทั้งหมด",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "ช่วยเพื่อน ๆ ปกป้องความเป็นส่วนตัวของตน",
        SHARE_TOOTHERS_SNS_TITLE : "ตรวจสอบความเป็นส่วนตัวของ Trend Micro ช่วยปกป้องความเป็นส่วนตัวของฉันบนเครือข่ายสังคมออนไลน์ ลองใช้ดู!",
        SHARE_TOOTHERS_BROWSER_TITLE : "ตรวจสอบความเป็นส่วนตัวของ Trend Micro ช่วยให้เว็บเบรา์เซอร์ของฉันปลอดภัยขึ้น ลองใช้ดู!",
        SHARE_TOOTHERS_LINK : "http://www.trendmicro.co.th",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(ข้อมูลเพิ่มเติม)",
        SETTING_ITEM_RECOMMENDED : "(แนะนำ)",
        SETTING_ITEM_ON : "เปิด",
        SETTING_ITEM_OFF : "ปิด",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "คนทั่วไปสามารถมองเห็นข้อมูลส่วนตัวของคุณ",
        CATEGORY_Strangers_can_easily_track_you : "คนแปลกหน้าสามารถติดตามคุณได้ง่ายๆ",
        CATEGORY_You_can_be_tagged_without_your_permission : "คุณสามารถถูกแท็กโดยที่ไม่ได้รับอนุญาต",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "คนจากนอก Facebook สามารถเห็นข้อมูลของคุณ",
        CATEGORY_People_can_see_where_you_were : "คนทั่วไปสามารถทราบว่าคุณอยู่ที่ใดบ้าง",
        CATEGORY_People_can_download_your_photos : "คนทั่วไปสามารถดาวน์โหลดภาพของคุณ",
        CATEGORY_Advertizers_can_learn_more_about_you : "ผู้ลงโฆษณาสามารถเรียนรู้เพิ่มเติมเกี่ยวกับตัวคุณ",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "คนจากนอก LinkedIn สามารถเห็นข้อมูลของคุณ",
        CATEGORY_Strangers_could_monitor_your_connection : "คนแปลกหน้าสามารถเฝ้าดูการเชื่อมต่อของคุณ",
        CATEGORY_Browser_phishing_protect : "ป้องกันฟิชชิ่ง",
        CATEGORY_Application_access : "คนสามารถเห็น %NUM% แอพและการโพสต์ของแอพ",
        CATEGORY_Application_access_plural : "คนสามารถเห็น %NUM% แอพและการโพสต์ของแอพ",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "การเปลี่ยนแปลง:",
        SAVE_CHANGES_BUTTON_TITLE : "บันทึกการเปลี่ยนแปลง",
        SAVE_CHANGES_TWITTER_HINT : "เมื่อพร้อมทำการแก้ไข ให้คลิกที่ปุ่มและยืนยันรหัสผ่าน X ของคุณ",
        SAVE_CHANGES_FIRSTTIME_HINT : "คลิกที่นี่เมื่อพร้อมที่จะบันทึกการเปลี่ยนแปลงใด ๆ ด้านล่าง",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "ทำได้ดีมาก! คุณไม่มีข้อกังวลด้านความเป็นส่วนตัว แต่เพื่อนของคุณอาจต้องการความช่วยเหลือ...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "แก้ไขทั้งหมด",
        QUICKFIX_DESCRIPTION : "เพื่อปกป้องความเป็นส่วนตัวของคุณ จะมีการเปลี่ยนแปลงการตั้งค่าของคุณดังต่อไปนี้",
        QUICKFIX_SETTING : "การตั้งค่า",
        QUICKFIX_CHANGES : "การเปลี่ยนแปลง",
        QUICKFIX_CURRENT : "ปัจจุบัน",
        QUICKFIX_NEW : "สร้าง",
        QUICKFIX_FIXALL_BUTTON : "แก้ไข",
        QUICKFIX_FIXALL_CANCEL : "ยกเลิก",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "ตรวจสอบความเป็นส่วนตัว",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "Trend Micro",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://www.trendmicro.co.th",
        HTML_FOOTER_COPYRIGHT : "Copyright © 2023 Trend Micro Incorporated สงวนลิขสิทธิ์ทุกประการ",
        
        SNS_AREA_TITLE : "ไซต์เครือข่ายสังคม",
        BROWSERS_AREA_TITLE : "เบราว์เซอร์",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "ขออภัยในความไม่สะดวก แต่เราจำเป็นต้องมีการปรับปรุงเล็กน้อยเพื่อให้ทันกับการเปลี่ยนแปลงล่าสุดของเครือข่ายสังคมนี้ ในขณะเดียวกัน คุณสามารถตรวจสอบบัญชีอื่น ๆ ของคุณบัญชีใดบัญชีหนึ่งแทนได้",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "เปิด Trend Micro Toolbar เพื่อตรวจสอบความเป็นส่วนตัวของคุณ",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=TH-TH",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "ลงชื่อเข้าระบบเพื่อตรวจสอบความเป็นส่วนตัวของคุณ.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "ในการตรวจสอบความเป็นส่วนตัวของคุณ กรุณาลงชื่อเข้าใช้ก่อนและอย่าลืมทำเครื่องหมายที่กล่องกาเครื่องหมาย \"ให้ฉันลงชื่อเข้าใช้อยู่เสมอ\"",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "ในการแก้ไขข้อกังวลด้านความเป็นส่วนตัวของคุณ กรุณาลงชื่อเข้าใช้ก่อนและอย่าลืมทำเครื่องหมายที่กล่องกาเครื่องหมาย \"ให้ฉันลงชื่อเข้าใช้อยู่เสมอ\"",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "ศึกษาเพิ่มเติม",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "มีบางอย่างผิดปกติ โปรดลองใหม่อีกครั้งในภายหลัง",
        ALERT_SIGN_IN_TO_FIX_TITLE : "โปรดลงชื่อเข้าระบบเพื่อแก้ไขข้อกังวลด้านความเป็นส่วนตัว",
        ALERT_SIGN_IN_BUTTON : "ลงชื่อเข้าระบบ",
        ALERT_TRY_AGAIN_BUTTON : "ลองใหม่อีกครั้ง",
        GET_MORE_HELP : "คลิกที่นี่เพื่อขอรับความช่วยเหลือเพิ่มเติม",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "หากคุณยังคงเห็นข้อความนี้อยู่ ให้ขอรับความช่วยเหลือที่นี่",
        ALERT_BUY_TITANIUM_BUTTON : "สั่งซื้อทันที",
        ALERT_RESTART_BUTTON : "เริ่มการทำงานใหม่",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Trend Micro PrivacyScanner ประสบปัญหากับ Google Chrome",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "คลิกที่นี่สำหรับคำแนะำนำง่ายๆ ในการแก้ไขปัญหานี้",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "เริ่มการทำงานของ Google Chrome ใหม่เพื่อนำการเปลี่ยนแปลงไปใช้",
        FIREFOX_RESTART_TITLE : "เริ่มการทำงานของ Firefox ใหม่เพื่อนำการเปลี่ยนแปลงไปใช้",
        INTERNET_EXPLORER_RESTART_TITLE : "เริ่มการทำงานของ Internet explorer ใหม่เพื่อนำการเปลี่ยนแปลงไปใช้",
        
        CHROME_STOP_TITLE : "ต้องปิด Google Chrome ตอนนี้เพื่อนำการเปลี่ยนแปลงไปใช้",
        FIREFOX_STOP_TITLE : "ต้องปิด Firefox ตอนนี้เพื่อนำการเปลี่ยนแปลงไปใช้",
        INTERNET_EXPLORER_STOP_TITLE : "ต้องปิด Internet Explorer ตอนนี้เพื่อนำการเปลี่ยนแปลงไปใช้",
        
        ALERT_APPLY_CLOSE_BUTTON : "นำไปใช้ตอนนี้",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "นำไปใช้ภายหลัง",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "เริ่มการทำงานของ Google Chrome ใหม่เพื่อนำการเปลี่ยนแปลงไปใช้",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "เริ่มการทำงานของ Firefox ใหม่เพื่อนำการเปลี่ยนแปลงไปใช้",
        RESTART_IE_LATER_OR_NOT_TITLE : "เริ่มการทำงานของ Internet explorer ใหม่เพื่อนำการเปลี่ยนแปลงไปใช้",
        ALERT_RESTART_NOW : "เริ่มการทำงานใหม่เดี๋ยวนี้",
        ALERT_RESTART_LATER : "เริ่มการทำงานใหม่ภายหลัง",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "เพื่อทำให้การเปลี่ยนแปลงมีผล คุณจะต้องปิด Google Chrome คุณสามารถทำได้เลยตอนนี้หรือรอไว้ทำทีหลัง",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "เพื่อทำให้การเปลี่ยนแปลงมีผล คุณจะต้องปิด Firefox คุณสามารถทำได้เลยตอนนี้หรือรอไว้ทำทีหลัง",
        CLOSE_IE_LATER_OR_NOT_TITLE : "เพื่อทำให้การเปลี่ยนแปลงมีผล คุณจะต้องปิด Internet Explorer คุณสามารถทำได้เลยตอนนี้หรือรอไว้ทำทีหลัง",
        ALERT_CLOSE_NOW : "เปลี่ยนเดี๋ยวนี้",
        ALERT_CLOSE_LATER : "เปลี่ยนในภายหลัง",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "คุณต้องเปิดซอฟต์แวร์ความปลอดภัยของ Trend Micro เพื่อสแกน Internet Explorer",
        ERROR_CHROME_LAUNCH_TI_FIRST : "คุณต้องเปิดซอฟต์แวร์ความปลอดภัยของ Trend Micro เพื่อสแกน Google Chrome",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "คุณต้องเปิดซอฟต์แวร์ความปลอดภัยของ Trend Micro เพื่อสแกน Firefox",
        
        ERROR_IE_VERSION_TOO_LOW : "โปรดปรับรุ่นเป็นรุ่นล่าสุดของ Microsoft Internet Explorer ก่อนคลิกปุ่มด้านล่าง",
        
        ERROR_DEFAULT_TITLE : "มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้งในภายหลัง",
        ERROR_DEFAULT_LEARN_MORE : "ศึกษาเพิ่มเติม",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "โปรดปรับรุ่นเป็นรุ่นล่าสุดของ Microsoft Internet Explorer",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "ส่งคำขอ 'อย่าติดตาม' ไปกับการท่องอินเทอร์เน็ตของคุณ",
        cr_do_not_track_DESC : "อาจมีบางเว็บไซต์ที่ไม่สนใจคำขอให้หลีกเลี่ยงการติดตามสิ่งที่คุณทำขณะออนไลน์",
        cr_do_not_track_value_0_POSSIBLEVALUE : "เปิด",
        cr_do_not_track_value_1_POSSIBLEVALUE : "ปิด",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "เสนอให้บันทึกรหัสผ่านที่ป้อนบนเว็บ",
        cr_remember_sign_on_DESC : "เว็บไซต์และซอฟต์แวร์อันตรายอาจใช้ประโยชน์จากข้อมูลส่วนบุคคลที่บันทึกไว้ใน Google Chrome",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "เปิด",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "ปิด",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "เปิดใช้งานการป้องกันฟิชชิ่งและมัลแวร์",
        cr_phishing_protect_DESC : "ก่อนเปิดเว็บไซต์ Google Chrome จะตรวจสอบให้แน่ใจว่าที่อยู่นี้ไม่ได้ปรากฏบนรายชื่อที่อยู่ซึ่งเกี่ยวข้องกับซอฟต์แวร์อันตรายและการหลอกลวงทางออนไลน์",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "เปิด",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "ปิด",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "เบราเซอร์ควรตอบสนองอย่างไรเมื่อเว็บไซต์พยายามจะติดตามคุณ",
        ff_do_not_track_DESC : "อาจมีบางเว็บไซต์ที่ไม่สนใจคำขอให้หลีกเลี่ยงการติดตามสิ่งที่คุณทำขณะออนไลน์",
        ff_do_not_track_value_0_POSSIBLEVALUE : "ป้องกันการติดตาม",
        ff_do_not_track_value_1_POSSIBLEVALUE : "อนุญาตการติดตาม",
        ff_do_not_track_value_2_POSSIBLEVALUE : "ไม่มีสิ่งที่ต้องการเป็นพิเศษ",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "จำรหัสผ่านสำหรับไซต์",
        ff_remember_sign_on_DESC : "เว็บไซต์และซอฟต์แวร์อันตรายอาจใช้ประโยชน์จากข้อมูลส่วนบุคคลที่บันทึกไว้ใน FireFox",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "เปิด",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "ปิด",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "สกัดกั้นไซต์โจมตีที่ได้รับรายงาน",
        ff_block_attack_sites_DESC : "ก่อนเปิดเว็บไซต์ FireFox จะตรวจสอบให้แน่ใจว่าที่อยู่นี้ไม่ได้ปรากฏบนรายชื่อที่อยู่ซึ่งเกี่ยวข้องกับซอฟต์แวร์อันตรายและแฮ็กเกอร์",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "เปิด",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "ปิด",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "สกัดกั้นการปลอมแปลงเว็บที่ได้รับรายงาน",
        ff_block_web_forgeries_DESC : "ก่อนเปิดเว็บไซต์ FireFox จะตรวจสอบให้แน่ใจว่าที่อยู่นี้ไม่ได้ปรากฏบนรายชื่อที่อยู่ซึ่งเกี่ยวข้องกับการหลอกลวงทางออนไลน์",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "เปิด",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "ปิด",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "ส่งคำขอ อย่าติดตาม ไปยังไซต์ที่คุณเยี่ยมชมใน Internet Explorer",
        ie_do_not_track_DESC : "อาจมีบางเว็บไซต์ที่ไม่สนใจคำขอให้หลีกเลี่ยงการติดตามสิ่งที่คุณทำขณะออนไลน์",
        ie_do_not_track_value_0_POSSIBLEVALUE : "ปิด",
        ie_do_not_track_value_1_POSSIBLEVALUE : "เปิด",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "เปิดใช้งานตัวกรอง SmartScreen",
        ie_phishing_protect_DESC : "ก่อนเปิดเว็บไซต์ Internet Explorer จะตรวจสอบให้แน่ใจว่าที่อยู่นี้ไม่ได้ปรากฏบนรายชื่อที่อยู่ซึ่งเกี่ยวข้องกับการหลอกลวงทางออนไลน์",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "ปิด",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "เปิด",
        
        // ie_remember_password
        ie_remember_password_TITLE : "ใช้ AutoComplete สำหรับชื่อผู้ใช้และรหัสผ่านในแบบฟอร์ม",
        ie_remember_password_DESC : "เว็บไซต์และซอฟต์แวร์อันตรายอาจใช้ประโยชน์จากข้อมูลส่วนบุคคลที่บันทึกไว้ใน Internet Explorer",
        ie_remember_password_value_0_POSSIBLEVALUE : "ปิด",
        ie_remember_password_value_1_POSSIBLEVALUE : "เปิด",
        
        // ie_private_mode
        ie_private_mode_TITLE : "ปิดใช้งานแถบเครื่องมือและส่วนขยายเมื่อ InPrivate Browsing เริ่มต้นขึ้น",
        ie_private_mode_DESC : "การปิดคุณสมบัติพิเศษเหล่านี้ช่วยให้มั่นใจว่าจะไม่มีร่องรอยกิจกรรมออนไลน์ของคุณหลงเหลืออยู่เมื่อคุณใช้ InPrivate Browsing",
        ie_private_mode_value_0_POSSIBLEVALUE : "ปิด",
        ie_private_mode_value_1_POSSIBLEVALUE : "เปิด",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "การมองเห็นแอพและผู้ชมโพสต์",
        fb_app_titleArea_radio_wording_apply_all: "ใครสามารถเห็น %NUM% แอพและการโพสต์ของแอพ",
        fb_app_titleArea_radio_wording_apply_all_singular: "ใครสามารถเห็น 1 แอพและการโพสต์ของแอพ",
        fb_app_titleArea_radio_wording_apply_individ:"ใครสามารถเห็นแต่ละแอพและการโพสต์ของแอพ",
        fb_app_titleArea_title_wording_detail_tooltip:"การตั้งค่านี้ควบคุมว่าใครใน Facebook สามารถเห็นว่าคุณใช้แอพนี้ อีกทั้งยังอนุญาตให้คุณเลือกผู้ชมโพสต์ที่แอพทำขึ้นในนามของคุณ",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"การทำเช่นนี้ี้จะลบแอพออกจากบัญชี Facebook ของคุณ แอพนี้จะไม่อยู่ในคั่นหน้าเว็บหรือรายการแอพที่คุณใช้อีกต่อไป (ซึ่งพบในการตั้งค่าของคุณ) <a href='https://www.facebook.com/help/234899866630865' target='_blank'>ศึกษาเพิ่มเติม</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"เพื่อน",
        fb_app_level_FriendsOfFriends_wording:"เพื่อนของเพื่อน",
        fb_app_level_public_wording:"สาธารณะ",
        fb_app_level_onlyme_wording:"ฉันเท่านั้น",
        fb_app_extend_wording:"แสดงมากขึ้น",
        fb_app_unextend_wording:"แสดงน้อยลง",
        fb_app_remove_tooltip:"ลบแอพออกจาก Facebook",
        fb_app_remove_title:"ลบ %APPNAME% ออกจาก Facebook ใช่หรือไม่",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ ไม่สนับสนุน Internet Explorer 8 กรุณาเปิด Google+ ในเบราว์เซอร์อื่นหรืออัพเกรดเป็นรุ่นล่าสุดของ Microsoft Internet Explorer",
        fb_twitter_on_IE9:"X ไม่รองรับการเปิดบน Internet Explorer 9 หรือเวอร์ชันก่อนหน้า โปรดเปิด X ในเบราว์เซอร์อื่น หรืออัปเกรดเป็น Microsoft Internet Explorer เวอร์ชันล่าสุด",

        // Twitter wordings
        tw_str_fix_pop1:"หากต้องการดำเนินการต่อ ไปที่แท็บ X ที่ปรากฏบนหน้าต่างเบราว์เซอร์ของคุณ และใส่รหัสผ่าน X ของคุณ", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"หลังจากยืนยันรหัสผ่านแล้ว คลิก ตกลง เพื่อแก้ไขปัญหานี้"
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
