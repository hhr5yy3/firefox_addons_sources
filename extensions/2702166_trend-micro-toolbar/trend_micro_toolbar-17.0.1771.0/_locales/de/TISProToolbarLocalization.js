(function(Export){
    Export.D_TSRToolTipTitleString = "Trend Micro Webseitenbewertung";


    Export.g_oRatingLevelToolTipString = {
        LevelString: {
            Nolink: "Keine Antwort",
            Safe: "Sicher",
            Neutral: "Sicher",
            Dangerous: "Gefährlich",
            Suspicious: "Verdächtig",
            Untested: "Nicht getestet",
            Trusted: "Vertrauenswürdig",
            Blocked: "Gesperrt",
            PCBlocked:"Gesperrt",
            Limited:"Ist diese Website sicher?"
        },
        HelpString: {
            Nolink: "Trend Micro kann für diese Seite keine Bewertung angeben. Wenn dieses Problem durch eine instabile Verbindung verursacht wurde, kann es hilfreich sein, die Seite zu aktualisieren.",
            Safe: "Sie können diese Seite gerne öffnen.",
            Neutral: "Auf dieser Seite befanden sich früher unerwünschte Inhalte, sie wird jetzt aber als sicher eingestuft.",
            Dangerous: "Der Besuch dieser Seite kann die Sicherheit Ihres Computers gefährden. Ihre Schutzeinstellungen verhindern, dass die Seite geöffnet wird.",
            Suspicious: "Diese Seite könnte ein Sicherheitsrisiko darstellen. Ihre Schutzeinstellungen verhindern möglicherweise, dass die Seite geöffnet wird.",
            Untested: "Trend Micro hat diese Seite noch nicht getestet und kann daher für sie jetzt keine Bewertung angeben. ",
            Trusted: "Diese Seite ist in der Ausschlussliste als 'Vertrauenswürdig' gekennzeichnet, aber Trend Micro hat diese Bewertung nicht bestätigt.",
            Blocked: "Die Adresse dieser Seite ist in Ihrer Liste der gesperrten Websites enthalten.",
            PCBlocked:"Die Kindersicherung auf diesem Computer lässt den Zugriff auf diese Seite nicht zu.",
            Limited: "Führen Sie ein Upgrade für __productName__ durch, um die Sicherheit von Websites prüfen zu können, damit Sie sicher im Internet surfen können."
        },
        CheckUrlString: "<span id='TSRCheckUrl'>Bitten Sie Trend Micro</span>, diese Website zu prüfen.",
        ToogleBgIkbString: "So deaktivieren Sie die Hervorhebung von bewerteten Links",
        SiteSafetyReportString: {
            Title: "Trend Micro auffordern, die Überprüfung dieser Website vorzunehmen.",
            Address: "Adresse:",
            SiteOwnerCheckBox: "Ich bin Besitzer einer Website",
            EmailAddressDefault: "E-Mail-Adresse",
            AddDescriptionDefault: "Eine Beschreibung hinzufügen",
            SendButton: "Senden",
            CancelButton: "Abbrechen",
			ReceivedReviewTitle:"Anfrage erhalten",
			Description:"Trend Micro überprüft diese Website und stellt nach Abschluss der Überprüfung eine Bewertung zur Verfügung. Bitte später erneut überprüfen.",
			OKButton:"OK"
        }
    };

    Export.g_oRatingSetPopupString = {
        Title: "Unsere Seitenbewertungen haben einen frischen neuen Look erhalten.",
        DarkTitle: "Die Seitenbewertungen sind jetzt für den dunklen Modus optimiert.",
        Desc: "Wählen Sie einen Stil, der für Sie am besten geeignet ist:",
        RadioHightlignt: "Links hervorheben ",
        RadioNotHightlight: "Links nicht hervorheben",
        Safe: "Sicher",
        Dangerous: "Gefährlich",
        HowDoWorkLink: "Wie funktionieren Seitenbewertungen?",
        RemindLater: "Später erinnern",
        ApplyButton: "Übernehmen",
        AppliedTitle:"Formatvorlage angewendet!",
        ChangeSettingDesc:"Sie können dies jederzeit in den <a href='#' id='how_update_pagerating_link'>Einstellungen</a> ändern."
    };

    Export.g_oToolTipString = {
        ShareToFriend: {
            ShareMsg: "Warnen Sie einen Freund über diesen Post.",
            ShareString: "Meine Trend Micro™ Sicherheitssoftware hat diesen Link als gefährlich gemeldet. Sie sollten ihn entfernen und Ihren Computer zur Sicherheit nach Sicherheitsbedrohungen durchsuchen. https://www.facebook.com/Trendmicro/app_366801130018338"
        }
    };

    Export.g_oDirectPassPromotionString = {
        recommendDP: "",
        learnMore: "Weitere Informationen",
        donotAsk: "Nicht mehr fragen"
    };

    Export.g_oSafeSearchingString = {
        warnUserTitle: "Jemand, der sich um Sie sorgt, hat beschlossen, dass Sie dieses Bild nicht anzeigen dürfen.",
        reallyNeedToSee: "Wenn Sie es dennoch anzeigen möchten, <span class='provide_password'>geben Sie das Kennwort ein</span>, und schalten Sie dann diesen Schutz aus",
        reallyNeedToSeeUntilRestart: "Wenn Sie es dennoch anzeigen möchten, <a class='provide_password'>geben Sie das Kennwort ein</a>, und schalten Sie dann diesen Schutz aus, bis der Computer neu gestartet wird.",
        productName: "Trend Micro Webseitenbewertung"
    };
}(window));