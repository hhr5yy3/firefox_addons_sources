(function(Export){
    Export.D_TSRToolTipTitleString = "Trend プロテクト";


    Export.g_oRatingLevelToolTipString = {
        LevelString: {
            Nolink: "応答なし",
            Safe: "安全",
            Neutral: "安全",
            Dangerous: "危険",
            Suspicious: "不審",
            Untested: "未評価",
            Trusted: "許可済み",
            Blocked: "ブロック",
            PCBlocked:"ブロック",
            Limited:"Is this website safe?"
        },
        HelpString: {
            Nolink: "このWebサイトの評価を表示できません。接続が不安定な場合は、画面表示を更新することで問題が解決することがあります。",
            Safe: "このWebサイトは安全です。",
            Neutral: "以前このWebサイトには望ましくないコンテンツが含まれていましたが、現在は安全と見なされます。",
            Dangerous: "このWebサイトにアクセスするとセキュリティを脅かす可能性があります。保護設定によってアクセスが拒否されます。",
            Suspicious: "このWebサイトを開くとセキュリティを脅かす可能性があります。保護設定によってアクセスが拒否される場合があります。",
            Untested: "このWebサイトは未評価です。評価を表示できません。 ",
            Trusted: "このWebサイトを許可するよう指定されていますが、このWebサイトの評価はまだ確認されていません。",
            Blocked: "このWebサイトのアドレスは、アクセスを禁止するWebサイトのリストに登録されています。",
            PCBlocked:"保護者による使用制限により、このWebサイトはブロックされています。",
            Limited: "Upgrade __productName__ to check the safety of a website so that you can browse the Internet safely."
        },
        CheckUrlString: "このWebサイトの再評価を<span id='TSRCheckUrl'>トレンドマイクロに依頼</span>します。",
        ToogleBgIkbString: "評価されたリンクの色別表示をオフにする方法",
        SiteSafetyReportString: {
            Title: "評価内容変更のリクエスト",
            Address: "URL:",
            SiteOwnerCheckBox: "このWebサイトの所有者です。",
            EmailAddressDefault: "メールアドレス",
            AddDescriptionDefault: "このWebサイトについてのコメント",
            SendButton: "送信",
            CancelButton: "キャンセル",
			ReceivedReviewTitle:"再評価の依頼を送信しました",
			Description:"トレンドマイクロではこのWebサイトを再評価し、終了後に結果を反映します。しばらくしてから再度ご確認ください。",
			OKButton:"OK"
        }
    };

    Export.g_oRatingSetPopupString = {
        Title: "検索結果の評価表示が新しくなりました。",
        DarkTitle: "検索結果の評価表示がダークモード用に最適化されました。",
        Desc: "最適な設定を選択してください。",
        RadioHightlignt: "リンクを色別で表示",
        RadioNotHightlight: "リンクを色別で表示しない",
        Safe: "安全",
        Dangerous: "危険",
        HowDoWorkLink: "検索結果評価の仕組み",
        RemindLater: "後で通知",
        ApplyButton: "適用",
        AppliedTitle:"設定が適用されました",
        ChangeSettingDesc:"<a href='#' id='how_update_pagerating_link'>[設定]</a> からいつでも変更できます。"
    };

    Export.g_oToolTipString = {
        ShareToFriend: {
            ShareMsg: "このリンクについて友人に警告する。",
            ShareString: "このWebページ内のリンクはトレンドマイクロにより「危険」と評価されています。このリンクにはアクセスしないでください。"
        }
    };

    Export.g_oDirectPassPromotionString = {
        recommendDP: "",
        learnMore: "もっと見る",
        donotAsk: "今後表示しない"
    };

    Export.g_oSafeSearchingString = {
        warnUserTitle: "保護者により、この画像が表示されないように設定されています。",
        reallyNeedToSee: "画像を表示するには<span class='provide_password'>パスワードを入力</span>する必要があります。",
        reallyNeedToSeeUntilRestart: "<a class='provide_password'>パスワードを入力</a>すれば、パソコンを再起動するまで画像を表示させることができます。",
        productName: "Trend プロテクト"
    };
}(window));