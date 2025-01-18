(function(Export){
    Export.D_TSRToolTipTitleString = "Trend Micro Sayfa Derecelendirme";


    Export.g_oRatingLevelToolTipString = {
        LevelString: {
            Nolink: "Yanıt Yok",
            Safe: "Güvenli",
            Neutral: "Güvenli",
            Dangerous: "Tehlikeli",
            Suspicious: "Şüpheli",
            Untested: "Test edilmemiş",
            Trusted: "Güvenilir",
            Blocked: "Engellenen",
            PCBlocked:"Engellenen",
            Limited:"Bu web sitesi güvenli mi?"
        },
        HelpString: {
            Nolink: "Trend Micro bu sayfa için bir derecelendirme gösteremiyor. Bu sorun istikrarsız bir bağlantıdan kaynaklanıyorsa, sayfayı yenilemek yardımcı olabilir.",
            Safe: "Bu sayfayı açabilirsiniz.",
            Neutral: "Bu sayfada daha önce istenmeyen içerik vardı, ancak Trend Micro artık sayfayı güvenli kabul ediyor.",
            Dangerous: "Bu sayfayı ziyaret etmek güvenliğinizi tehlikeye atabilir. Koruma ayarlarınız sayfanın açılmasını engelleyecektir.",
            Suspicious: "Bu sayfa bir güvenlik riski oluşturabilir. Koruma ayarlarınız sayfanın açılmasını engelleyebilir.",
            Untested: "Trend Micro bu sayfayı henüz test etmedi ve şimdilik bu sayfa için bir derecelendirme gösteremiyor. ",
            Trusted: "Bu sayfa, Kural Dışı Durum Listesinde Güvenilir olarak yer alıyor, ancak Trend Micro bu derecelendirmeyi onaylamadı.",
            Blocked: "Bu sayfanın adresi, engellenen web siteleri listenizde görünüyor.",
            PCBlocked:"Bu bilgisayardaki Ebeveyn Denetimleri, bu sayfaya erişime izin vermiyor.",
            Limited: "İnternette güvenle gezinebilmeniz için web sitelerinin güvenliğini otomatik olarak kontrol etmek için __productName__ ürününü yükseltin."
        },
        CheckUrlString: "<span id='TSRCheckUrl'>Trend Micro'dan</span> bu siteyi incelemesini isteyin.",
        ToogleBgIkbString: "Derecelendirilmiş bağlantıların vurgulanması nasıl kapatılır?",
        SiteSafetyReportString: {
            Title: "Trend Micro'dan bu siteyi incelemesini isteyin.",
            Address: "Adres:",
            SiteOwnerCheckBox: "Ben site sahibiyim",
            EmailAddressDefault: "E-posta adresi",
            AddDescriptionDefault: "Açıklama ekle",
            SendButton: "Gönder",
            CancelButton: "İptal",
			ReceivedReviewTitle:"İstek alındı",
			Description:"Trend Micro bu siteyi inceleyecek ve inceleme tamamlandığında bir derecelendirme sağlayacak. Lütfen daha sonra tekrar kontrol edin.",
			OKButton:"Tamam"
        }
    };

    Export.g_oRatingSetPopupString = {
        Title: "Sayfa derecelendirmelerimiz yepyeni bir görünüme kavuştu!",
        DarkTitle: "Sayfa derecelendirmeleri karanlık mod için optimize edildi!",
        Desc: "Size en uygun stili seçin:",
        RadioHightlignt: "Bağlantıları vurgula ",
        RadioNotHightlight: "Bağlantıları vurgulama",
        Safe: "Güvenli",
        Dangerous: "Tehlikeli",
        HowDoWorkLink: "Sayfa derecelendirmeleri nasıl çalışır?",
        RemindLater: "Daha sonra hatırlat",
        ApplyButton: "Uygula",
        AppliedTitle:"Stil uygulandı!",
        ChangeSettingDesc:"Bunu, <a href='#' id='how_update_pagerating_link'>Ayarlar</a> bölümünde istediğiniz zaman değiştirebilirsiniz."
    };

    Export.g_oToolTipString = {
        ShareToFriend: {
            ShareMsg: "Arkadaşınızı bu gönderi hakkında uyarın.",
            ShareString: "Trend Micro™ güvenlik yazılımım, bu bağlantıyı tehlikeli olarak bildirdi. Her ihtimale karşı bağlantıyı kaldırabilir ve bilgisayarınızı taratabilirsiniz. https://www.facebook.com/Trendmicro/app_366801130018338"
        }
    };

    Export.g_oDirectPassPromotionString = {
        recommendDP: "",
        learnMore: "Daha Fazla Bilgi",
        donotAsk: "Yeniden Sorma"
    };

    Export.g_oSafeSearchingString = {
        warnUserTitle: "Sizi düşünen birisi bu resim dosyasını açmamanız gerektiğine karar vermiş.",
        reallyNeedToSee: "Bu dosyayı gerçekten açmanız gerekiyorsa <span class='provide_password'>parolayı girin</span> ve bu korumayı kapatın",
        reallyNeedToSeeUntilRestart: "Bu dosyayı gerçekten açmanız gerekiyorsa <a class='provide_password'>parolayı girin</a> ve bilgisayar yeniden başlatılana kadar bu korumayı kapatın.",
        productName: "Trend Micro Sayfa Derecelendirme"
    };
}(window));