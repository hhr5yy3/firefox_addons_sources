(function(Export){
    Export.D_TSRToolTipTitleString = "趨勢科技網頁分級";


    Export.g_oRatingLevelToolTipString = {
        LevelString: {
            Nolink: "沒有回應",
            Safe: "安全",
            Neutral: "安全",
            Dangerous: "危險",
            Suspicious: "可疑",
            Untested: "尚未測試",
            Trusted: "信任的",
            Blocked: "已封鎖",
            PCBlocked:"已封鎖",
            Limited:"這個網頁安全嗎？"
        },
        HelpString: {
            Nolink: "趨勢科技無法顯示此網頁的分級。如果是因為連線不穩定而造成此問題，重新整理網頁或許有幫助。",
            Safe: "請安心開啟此網頁。",
            Neutral: "此網頁之前曾經包含不當的內容，但趨勢科技現在認為它是安全的。",
            Dangerous: "瀏覽此網頁可能會使電腦遭受安全威脅。您的安全防護設定將會禁止開啟此網頁。",
            Suspicious: "此網頁可能會造成安全威脅。您的安全防護設定可能會禁止開啟此網頁。",
            Untested: "趨勢科技尚未測試過此網頁，因此目前無法顯示其分級。 ",
            Trusted: "此網頁在「例外清單」中列為「信任的」分級，但趨勢科技尚未確認此分級。",
            Blocked: "此網頁的網址存在於封鎖的網站清單中。",
            PCBlocked:"此電腦上的「家長防護網」不允許存取此網頁。",
            Limited: "購買 __productName__ 正式版以取得該網站的安全評比並確保您可以安全地暢遊網際網路．"
        },
        CheckUrlString: "<span id='TSRCheckUrl'>請求趨勢科技</span>審查此網站。",
        ToogleBgIkbString: "如何關閉亮顯分級連結功能?",
        SiteSafetyReportString: {
            Title: "請求趨勢科技審查此網站。",
            Address: "網址：",
            SiteOwnerCheckBox: "我是網站擁有者",
            EmailAddressDefault: "電子郵件信箱",
            AddDescriptionDefault: "新增說明",
            SendButton: "傳送",
            CancelButton: "取消",
			ReceivedReviewTitle:"已收到要求",
			Description:"趨勢科技會審查此網站並在審查完成後提供分級。請稍後再次查看。",
			OKButton:"確定"
        }
    };

    Export.g_oRatingSetPopupString = {
        Title: "我們的網頁分級功能煥然一新！",
        DarkTitle: "網頁分級功能經過最佳化調整，現在更適合深色模式！",
        Desc: "選擇最適合您的樣式：",
        RadioHightlignt: "亮顯連結 ",
        RadioNotHightlight: "不亮顯連結",
        Safe: "安全",
        Dangerous: "危險",
        HowDoWorkLink: "網頁分評是如何進行的？",
        RemindLater: "稍後提醒我",
        ApplyButton: "套用",
        AppliedTitle:"已套用樣式！",
        ChangeSettingDesc:"您隨時可以進入<a href='#' id='how_update_pagerating_link'>設定</a>進行變更。"
    };

    Export.g_oToolTipString = {
        ShareToFriend: {
            ShareMsg: "警告您的朋友此貼文有問題。",
            ShareString: "我的趨勢科技™ PC-cillin™ 安全防護軟體報告此連結為危險連結。以防萬一，您可將其移除並掃瞄電腦。https://www.facebook.com/Trendmicro/app_366801130018338"
        }
    };

    Export.g_oDirectPassPromotionString = {
        recommendDP: "",
        learnMore: "深入瞭解",
        donotAsk: "不要再詢問"
    };

    Export.g_oSafeSearchingString = {
        warnUserTitle: "出於對您的關心，暫時不允許您檢視此影像。",
        reallyNeedToSee: "如果您真的需要查看此影像，<span class='provide_password'>請提供密碼</span>，然後關閉此防護",
        reallyNeedToSeeUntilRestart: "如果您真的需要查看此影像，<a class='provide_password'>請提供密碼</a>，然後在電腦重新啟動前關閉此防護。",
        productName: "趨勢科技網頁分級"
    };
}(window));