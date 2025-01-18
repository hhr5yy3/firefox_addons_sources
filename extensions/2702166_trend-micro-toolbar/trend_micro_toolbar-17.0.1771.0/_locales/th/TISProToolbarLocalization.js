(function(Export){
    Export.D_TSRToolTipTitleString = "การจัดอันดับเพจของ Trend Micro";


    Export.g_oRatingLevelToolTipString = {
        LevelString: {
            Nolink: "ไม่มีการตอบโต้",
            Safe: "ปลอดภัย",
            Neutral: "ปลอดภัย",
            Dangerous: "เป็นอันตราย",
            Suspicious: "น่าสงสัย",
            Untested: "ไม่ได้รับการทดสอบ",
            Trusted: "เชื่อถือได้",
            Blocked: "สกัดกั้นแล้ว",
            PCBlocked:"สกัดกั้นแล้ว",
            Limited:"เว็บไซต์นี้ปลอดภัยหรือไม่"
        },
        HelpString: {
            Nolink: "Trend Micro ไม่สามารถแสดงการจัดอันดับสำหรับเพจนี้ ถ้าการเชื่อมต่อที่ไม่เสถียรก่อให้เกิดปัญหานี้ การฟื้นฟูเพจอาจช่วยได้",
            Safe: "เปิดเพจนี้ได้อย่างสบายใจ",
            Neutral: "ก่อนหน้านี้ เพจนี้เคยมีเนื้อหาที่ไม่พึงประสงค์ แต่ขณะนี้ Trend Micro ได้พิจารณาแล้วว่าเพจนี้ปลอดภัย",
            Dangerous: "การเยี่ยมชมเพจนี้อาจทำให้เสี่ยงต่อความปลอดภัยของคุณ การตั้งค่าการป้องกันของคุณทำให้ไม่สามารถเปิดใช้ได้",
            Suspicious: "เพจนี้อาจมีความเสี่ยงด้านความปลอดภัย การตั้งค่าการป้องกันของคุณอาจทำให้ไม่สามารถเปิดใช้ได้",
            Untested: "Trend Micro ยังไม่ได้ทดสอบเพจนี้ และไม่สามารถแสดงการจัดอันดับเพจนี้ได้ในขณะนี้ ",
            Trusted: "นี้อยู่ในรายการข้อยกเว้นในฐานะ เชื่อถือได้แต่ Trend Micro ยังไม่ได้ยืนยันการจัดประเภทนี้",
            Blocked: "ที่อยู่ของเพจนี้ปรากฏอยู่ในรายการเว็บไซต์ที่ถูกสกัดกั้นของคุณ",
            PCBlocked:"การควบคุมโดยผู้ปกครองบนคอมพิวเตอร์ทำให้ไม่สามารถเข้าสู่เพจนี้ได้",
            Limited: "อัปเกรด __productName__ เพื่อตรวจสอบความปลอดภัยของเว็บไซต์ เพื่อให้คุณท่องอินเทอร์เน็ตได้อย่างปลอดภัย"
        },
        CheckUrlString: "<span id='TSRCheckUrl'>สอบถาม Trend Micro</span> เพื่อให้ตรวจสอบไซต์นี้",
        ToogleBgIkbString: "วิธีปิดการเน้นลิงก์ที่ได้รับการจัดอันดับ",
        SiteSafetyReportString: {
            Title: "สอบถาม Trend Micro เพื่อให้ตรวจสอบไซต์นี้",
            Address: "ที่อยู่:",
            SiteOwnerCheckBox: "ฉันเป็นเจ้าของไซต์",
            EmailAddressDefault: "ที่อยู่อีเมล",
            AddDescriptionDefault: "เพิ่มคำอธิบาย",
            SendButton: "ส่ง",
            CancelButton: "ยกเลิก",
			ReceivedReviewTitle:"ได้รับคำขอแล้ว",
			Description:"Trend Micro จะตรวจสอบเว็บไซต์นี้และจัดอันดับเมื่อการตรวจสอบเสร็จสมบูรณ์ โปรดตรวจสอบอีกครั้งในภายหลัง",
			OKButton:"ตกลง"
        }
    };

    Export.g_oRatingSetPopupString = {
        Title: "การจัดอันดับหน้าเพจของเรามีรูปลักษณ์โฉมใหม่!",
        DarkTitle: "การจัดอันดับหน้าเพจตอนนี้ปรับให้เหมาะกับโหมดมืดแล้ว!",
        Desc: "เลือกรูปแบบที่เหมาะกับคุณที่สุด:",
        RadioHightlignt: "เน้นลิงก์ ",
        RadioNotHightlight: "ไม่เน้นลิงก์",
        Safe: "ปลอดภัย",
        Dangerous: "เป็นอันตราย",
        HowDoWorkLink: "การจัดอันดับหน้าเพจทำงานอย่างไร",
        RemindLater: "เตือนฉันในภายหลัง",
        ApplyButton: "ใช้",
        AppliedTitle:"นำรูปแบบไปใช้แล้ว!",
        ChangeSettingDesc:"คุณสามารถเปลี่ยนแปลงได้ทุกเมื่อใน <a href='#' id='how_update_pagerating_link'>การตั้งค่า</a>"
    };

    Export.g_oToolTipString = {
        ShareToFriend: {
            ShareMsg: "เตือนเพื่อนของคุณเกี่ยวกับโพสต์นี้",
            ShareString: "ซอฟต์แวร์ความปลอดภัยของ Trend Micro™ รายงานว่าลิงก์นี้อันตราย คุณอาจต้องการเอาซอฟต์แวร์์นี้ออกและสแกนคอมพิวเตอร์ของคุณ เพื่อความปลอดภัย https://www.facebook.com/Trendmicro/app_366801130018338"
        }
    };

    Export.g_oDirectPassPromotionString = {
        recommendDP: "",
        learnMore: "ศึกษาเพิ่มเติม",
        donotAsk: "ไม่ต้องถามฉันอีก"
    };

    Export.g_oSafeSearchingString = {
        warnUserTitle: "บุคคลที่ห่วงใยคุณได้ตัดสินใจว่าคุณไม่ควรดูรูปภาพนี้",
        reallyNeedToSee: "ถ้าคุณต้องการดูรูปภาพนี้จริงๆ <span class='provide_password'>ใส่รหัสผ่าน</span> จากนั้นปิดการป้องกันนี้",
        reallyNeedToSeeUntilRestart: "ถ้าคุณต้องการดูรูปภาพนี้จริงๆ <a class='provide_password'>ใส่รหัสผ่าน</a> จากนั้นปิดการป้องกันนี้จนกระทั่งคอมพิวเตอร์เริ่มระบบใหม่",
        productName: "การจัดอันดับเพจของ Trend Micro"
    };
}(window));