(function(Export){
    Export.D_TSRToolTipTitleString = "Trend Micro-sidevurdering";


    Export.g_oRatingLevelToolTipString = {
        LevelString: {
            Nolink: "Får ikke svar",
            Safe: "Sikker",
            Neutral: "Sikker",
            Dangerous: "Farlig",
            Suspicious: "Mistenkelig",
            Untested: "Ikke kontrollert",
            Trusted: "Klarert",
            Blocked: "Blokkert",
            PCBlocked:"Blokkert",
            Limited:"Er dette nettstedet trygt?"
        },
        HelpString: {
            Nolink: "Trend Micro kan ikke vise en vurdering for denne siden. Hvis en ustabil tilkobling forårsaket dette problemet, kan det hjelpe å oppdatere siden.",
            Safe: "Du må gjerne åpne denne siden.",
            Neutral: "Denne siden inneholdt tidligere uønsket materiale, men Trend Micro anser den nå som trygg.",
            Dangerous: "Det kan utgjøre en sikkerhetsrisiko å gå til denne siden. Beskyttelsesinnstillingene hindrer deg i å åpne siden.",
            Suspicious: "Denne siden kan utgjøre en risiko. Beskyttelsesinnstillingene kan hindre deg i å åpne siden.",
            Untested: "Trend Micro har ikke testet denne siden ennå, og kan derfor ikke vise en vurdering av den.",
            Trusted: "Denne siden er på den klarerte unntakslisten, men Trend Micro har ikke bekreftet denne vurderingen.",
            Blocked: "Adressen til denne siden vises i listen over blokkerte nettsteder.",
            PCBlocked:"Foreldrestyringen på denne datamaskinen gir ikke adgang til denne siden.",
            Limited: "Oppgrader __productName__ for å sjekke sikkerheten på et nettsted, slik at du kan bruke internett på en trygg måte."
        },
        CheckUrlString: "<span id='TSRCheckUrl'>Be Trend Micro</span> om å vurdere dette nettstedet.",
        ToogleBgIkbString: "Slik slår du av uthevelse for rangerte lenker",
        SiteSafetyReportString: {
            Title: "Be Trend Micro om å vurdere dette nettstedet.",
            Address: "Adresse:",
            SiteOwnerCheckBox: "Jeg er eieren av nettstedet",
            EmailAddressDefault: "E-postadresse",
            AddDescriptionDefault: "Legg til en beskrivelse",
            SendButton: "Send",
            CancelButton: "Avbryt",
			ReceivedReviewTitle:"Forespørsel mottatt",
			Description:"Trend Micro vil gjennomgå dette nettstedet og gi en vurdering når gjennomgangen er fullført. Sjekk igjen senere.",
			OKButton:"OK"
        }
    };

    Export.g_oRatingSetPopupString = {
        Title: "Siderangeringene våre har nettopp fått et nytt utseende!",
        DarkTitle: "Siderangeringene er nå optimalisert for mørk modus!",
        Desc: "Velg den stilen som passer best for deg:",
        RadioHightlignt: "Uthev lenker ",
        RadioNotHightlight: "Ikke uthev lenker",
        Safe: "Sikker",
        Dangerous: "Farlig",
        HowDoWorkLink: "Hvordan fungerer siderangeringer?",
        RemindLater: "Påminn meg senere",
        ApplyButton: "Bruk",
        AppliedTitle:"Stil benyttet!",
        ChangeSettingDesc:"Du kan endre dette når som helst fra <a href='#' id='how_update_pagerating_link'>Innstillinger</a>."
    };

    Export.g_oToolTipString = {
        ShareToFriend: {
            ShareMsg: "Advar vennen din om dette innlegget.",
            ShareString: "Min Trend Micro™ sikkerhetsprogramvare rapporterte denne koblingen som farlig. Det er kanskje best at du fjerner den og skanner datamaskinen, bare i tilfelle. https://www.facebook.com/Trendmicro/app_366801130018338"
        }
    };

    Export.g_oDirectPassPromotionString = {
        recommendDP: "",
        learnMore: "Les mer",
        donotAsk: "Ikke spør igjen"
    };

    Export.g_oSafeSearchingString = {
        warnUserTitle: "Noen som er glad i deg, har bestemt at du ikke bør åpne dette bildet.",
        reallyNeedToSee: "Hvis du virkelig må se det, må du <span class='provide_password'>oppgi passordet</span> og slå av denne beskyttelsen",
        reallyNeedToSeeUntilRestart: "Hvis du virkelig må se det, må du <a class='provide_password'>oppgi passordet</a> og slå av denne beskyttelsen til datamaskinen starter på nytt.",
        productName: "Trend Micro-sidevurdering"
    };
}(window));