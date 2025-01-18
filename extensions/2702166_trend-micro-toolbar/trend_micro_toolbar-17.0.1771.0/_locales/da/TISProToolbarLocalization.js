(function(Export){
    Export.D_TSRToolTipTitleString = "Trend Micro-sikkerhedsvurdering af side";


    Export.g_oRatingLevelToolTipString = {
        LevelString: {
            Nolink: "Intet svar",
            Safe: "Sikker",
            Neutral: "Sikker",
            Dangerous: "Farlig",
            Suspicious: "Mistænkelig",
            Untested: "Ikke testet",
            Trusted: "Betroet",
            Blocked: "Blokeret",
            PCBlocked:"Blokeret",
            Limited:"Er dette websted sikkert?"
        },
        HelpString: {
            Nolink: "Trend Micro kan ikke vise en vurdering af denne side. Hvis problemet er forårsaget af en ustabil forbindelse, kan det muligvis hjælpe at opdatere siden.",
            Safe: "Du er velkommen til at åbne denne side.",
            Neutral: "Der har tidligere været uønsket indhold på denne side, men Trend Micro anser den nu for at være sikker.",
            Dangerous: "Besøg på denne side kan udgøre en sikkerhedsrisiko. Dine beskyttelsesindstillinger vil forhindre, at den åbnes.",
            Suspicious: "Denne side kan udgøre en sikkerhedsrisiko. Dine beskyttelsesindstillinger vil muligvis forhindre, at den åbnes.",
            Untested: "Trend Micro har endnu ikke testet denne side og kan ikke vise en vurdering af den lige nu. ",
            Trusted: "Denne side er på undtagelseslisten som Betroet, men Trend Micro har ikke bekræftet denne vurdering.",
            Blocked: "Adressen til denne side vises på listen over blokerede websteder.",
            PCBlocked:"Forældrekontrol på denne computer tillader ikke adgang til denne side.",
            Limited: "Opgrader __productName__ for at kontrollere sikkerheden for et websted, så du kan browse internettet sikkert."
        },
        CheckUrlString: "<span id='TSRCheckUrl'>Bed Trend Micro</span> om at gennemse dette websted.",
        ToogleBgIkbString: "Hvordan slår man markeringen af bedømte links fra?",
        SiteSafetyReportString: {
            Title: "Bed Trend Micro om at gennemse dette websted.",
            Address: "Adresse:",
            SiteOwnerCheckBox: "Jeg er ejer af webstedet",
            EmailAddressDefault: "E-mailadresse",
            AddDescriptionDefault: "Tilføj en beskrivelse",
            SendButton: "Send",
            CancelButton: "Annuller",
			ReceivedReviewTitle:"Anmodning modtaget",
			Description:"Trend Micro gennemgår dette websted og giver en bedømmelse, når gennemgangen er afsluttet. Kontrollér igen senere.",
			OKButton:"OK"
        }
    };

    Export.g_oRatingSetPopupString = {
        Title: "Vores sidevurderinger har lige fået et nyt, friskt udseende!",
        DarkTitle: "Sidebedømmelser er nu optimeret til mørk tilstand!",
        Desc: "Vælg den stil, der passer dig bedst:",
        RadioHightlignt: "Fremhæv links ",
        RadioNotHightlight: "Fremhæv ikke links",
        Safe: "Sikker",
        Dangerous: "Farlig",
        HowDoWorkLink: "Hvordan fungerer sidebedømmelse?",
        RemindLater: "Påmind mig senere",
        ApplyButton: "Anvend",
        AppliedTitle:"Stil anvendt!",
        ChangeSettingDesc:"Du kan til enhver tid ændre det i <a href='#' id='how_update_pagerating_link'>Indstillinger</a>."
    };

    Export.g_oToolTipString = {
        ShareToFriend: {
            ShareMsg: "Advar din ven om denne post.",
            ShareString: "Min Trend Micro™-sikkerhedssoftware har rapporteret dette link som farligt. Du kan overveje at fjerne det og scanne din computer for at være på den sikre side. https://www.facebook.com/Trendmicro/app_366801130018338"
        }
    };

    Export.g_oDirectPassPromotionString = {
        recommendDP: "",
        learnMore: "Få mere at vide",
        donotAsk: "Spørg ikke igen"
    };

    Export.g_oSafeSearchingString = {
        warnUserTitle: "En person, som holder af dig, har besluttet, at du ikke må se dette billede.",
        reallyNeedToSee: "Hvis du virkelig gerne vil se det, skal du <span class='provide_password'>angive adgangskoden</span> og slå beskyttelsen fra",
        reallyNeedToSeeUntilRestart: "Hvis du virkelig gerne vil se det, skal du <a class='provide_password'>angive adgangskoden</a> og slå beskyttelsen fra, indtil computeren genstarter.",
        productName: "Trend Micro-sikkerhedsvurdering af side"
    };
}(window));