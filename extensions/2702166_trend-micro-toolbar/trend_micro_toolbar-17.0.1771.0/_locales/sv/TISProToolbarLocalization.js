(function(Export){
    Export.D_TSRToolTipTitleString = "Sidbedömning i Trend Micro";


    Export.g_oRatingLevelToolTipString = {
        LevelString: {
            Nolink: "Inget svar",
            Safe: "Säker",
            Neutral: "Säker",
            Dangerous: "Farlig",
            Suspicious: "Misstänkt",
            Untested: "Otestad",
            Trusted: "Tillförlitlig",
            Blocked: "Blockerat",
            PCBlocked:"Blockerat",
            Limited:"Är den här webbplatsen säker?"
        },
        HelpString: {
            Nolink: "Trend Micro kan inte visa en bedömning av den här sidan. Om problemet orsakats av en instabil anslutning kan det hjälpa att uppdatera sidan.",
            Safe: "Du kan lugnt öppna den här sidan.",
            Neutral: "Sidan har tidigare innehållit oönskat innehåll men Trend Micro anser nu att den är säker.",
            Dangerous: "Om du öppnar den här sidan kan du utsätta dig för en säkerhetsrisk. Dina skyddsinställningar hindrar den från att öppnas.",
            Suspicious: "Den här sidan kan utgöra en säkerhetsrisk. Dina skyddsinställningar kan hindra den från att öppnas.",
            Untested: "Trend Micro har inte testat sidan än och kan inte ge en bedömning av den för närvarande. ",
            Trusted: "Den här sidan finns i undantagslistan som Tillförlitlig, men Trend Micro har inte bekräftat bedömningen.",
            Blocked: "Sidans adress finns med på din lista med blockerade webbplatser.",
            PCBlocked:"Föräldrakontrollerna på den här datorn tillåter inte åtkomst till sidan.",
            Limited: "Uppgradera __productName__ för att granska en webbplats säkerhet så att du kan använda internet säkert."
        },
        CheckUrlString: "<span id='TSRCheckUrl'>Be Trend Micro</span> att granska den här sidan.",
        ToogleBgIkbString: "Hur avaktiverar man markeringar av betygsatta länkar?",
        SiteSafetyReportString: {
            Title: "Be Trend Micro granska den här webbplatsen.",
            Address: "Adress:",
            SiteOwnerCheckBox: "Jag är webbplatsägaren",
            EmailAddressDefault: "E-postadress",
            AddDescriptionDefault: "Lägg till en beskrivning",
            SendButton: "Skicka",
            CancelButton: "Avbryt",
			ReceivedReviewTitle:"Begäran mottogs",
			Description:"Trend Micro kommer att granska den här webbplatsen och ge ett betyg när granskningen är klar. Kontrollera igen senare.",
			OKButton:"OK"
        }
    };

    Export.g_oRatingSetPopupString = {
        Title: "Våra sidbetyg har precis fått ett nytt utseende!",
        DarkTitle: "Sidbetyg är nu optimerade för mörkt läge!",
        Desc: "Välj en stil som passar dig bäst:",
        RadioHightlignt: "Markera länkar ",
        RadioNotHightlight: "Markera inte länkar",
        Safe: "Säker",
        Dangerous: "Farlig",
        HowDoWorkLink: "Hur fungerar sidbetyg?",
        RemindLater: "Påminn mig senare",
        ApplyButton: "Verkställ",
        AppliedTitle:"Stil applicerad!",
        ChangeSettingDesc:"Du kan ändra detta när som helst i <a href='#' id='how_update_pagerating_link'>Inställningar</a>."
    };

    Export.g_oToolTipString = {
        ShareToFriend: {
            ShareMsg: "Varna din vän om detta inlägg.",
            ShareString: "Mitt säkerhetsprogram Trend Micro™ rapporterade att den här länken är farlig. För säkerhets skull bör du kanske ta bort den och genomsöka datorn. https://www.facebook.com/Trendmicro/app_366801130018338"
        }
    };

    Export.g_oDirectPassPromotionString = {
        recommendDP: "",
        learnMore: "Mer information",
        donotAsk: "Fråga inte igen"
    };

    Export.g_oSafeSearchingString = {
        warnUserTitle: "Någon som bryr sig om dig har beslutat att du inte borde se den här bilden.",
        reallyNeedToSee: "Om du verkligen måste se den <span class='provide_password'>anger du lösenordet</span> och stänger sedan av det här skyddet",
        reallyNeedToSeeUntilRestart: "Om du verkligen måste se den <a class='provide_password'>anger du lösenordet</a> och stänger sedan av det här skyddet tills datorn startar om.",
        productName: "Sidbedömning i Trend Micro"
    };
}(window));