(function(Export){
    Export.D_TSRToolTipTitleString = "Classificazione pagine di Trend Micro";


    Export.g_oRatingLevelToolTipString = {
        LevelString: {
            Nolink: "Nessuna risposta",
            Safe: "Sicuro",
            Neutral: "Sicuro",
            Dangerous: "Pericoloso",
            Suspicious: "Sospetto",
            Untested: "Non testato",
            Trusted: "Affidabile",
            Blocked: "Bloccato",
            PCBlocked:"Bloccato",
            Limited:"Questo sito Web è sicuro?"
        },
        HelpString: {
            Nolink: "Impossibile visualizzare una classificazione per questa pagina. Se il problema è stato causato da una connessione instabile, provare ad aggiornare la pagina.",
            Safe: "È possibile visualizzare questa pagina.",
            Neutral: "In passato, in questa pagina erano presenti contenuti indesiderati; oggi Trend Micro la considera sicura.",
            Dangerous: "Visitare questa pagina può compromettere la sicurezza. Le impostazioni di protezione ne impediscono l'apertura.",
            Suspicious: "Questa pagina può compromettere la sicurezza. Le impostazioni di protezione possono impedirne l'apertura.",
            Untested: "Trend Micro non ha ancora classificato questa pagina e pertanto al momento non è possibile visualizzare una classificazione. ",
            Trusted: "Questa pagina è presente nell'Elenco eccezioni come Affidabile, ma Trend Micro non ha confermato questa classificazione.",
            Blocked: "L'indirizzo della pagina specificata è presente nell'elenco dei siti Web bloccati.",
            PCBlocked:"Gli Strumenti di controllo per genitori su questo computer non consentono l'accesso a questa pagina.",
            Limited: "Aggiorna __productName__ per controllare la sicurezza di un sito Web, in modo da poter navigare su Internet in modo sicuro."
        },
        CheckUrlString: "<span id='TSRCheckUrl'>Chiedere a Trend Micro</span> di esaminare questo sito.",
        ToogleBgIkbString: "Come disattivare l'evidenziazione dei collegamenti valutati",
        SiteSafetyReportString: {
            Title: "Chiedere a Trend Micro di esaminare questo sito.",
            Address: "Indirizzo:",
            SiteOwnerCheckBox: "Sono il proprietario del sito",
            EmailAddressDefault: "Indirizzo e-mail",
            AddDescriptionDefault: "Aggiungere una descrizione",
            SendButton: "Invia",
            CancelButton: "Annulla",
			ReceivedReviewTitle:"Richiesta ricevuta",
			Description:"Trend Micro effettuerà un esame di questo sito e fornirà una classificazione a esame completato. Controllare di nuovo più tardi.",
			OKButton:"OK"
        }
    };

    Export.g_oRatingSetPopupString = {
        Title: "Le classificazioni delle nostre pagine hanno un nuovo aspetto!",
        DarkTitle: "Le classificazioni delle pagine sono ora ottimizzate per la modalità scura!",
        Desc: "Scegli lo stile che preferisci:",
        RadioHightlignt: "Evidenzia i collegamenti",
        RadioNotHightlight: "Non evidenziare i collegamenti",
        Safe: "Sicuro",
        Dangerous: "Pericoloso",
        HowDoWorkLink: "Come funzionano le classificazioni delle pagine?",
        RemindLater: "Visualizza in seguito",
        ApplyButton: "Applica",
        AppliedTitle:"Stile applicato!",
        ChangeSettingDesc:"È possibile modificare questa impostazione in qualsiasi momento in <a href='#' id='how_update_pagerating_link'>Impostazioni</a>."
    };

    Export.g_oToolTipString = {
        ShareToFriend: {
            ShareMsg: "Avvisare gli amici della pericolosità del post.",
            ShareString: "Il software di sicurezza Trend Micro™ ha segnalato questo link come pericoloso. Si consiglia di rimuoverlo ed effettuare la scansione del computer. https://www.facebook.com/Trendmicro/app_366801130018338"
        }
    };

    Export.g_oDirectPassPromotionString = {
        recommendDP: "",
        learnMore: "Ulteriori informazioni",
        donotAsk: "Non chiedere più"
    };

    Export.g_oSafeSearchingString = {
        warnUserTitle: "Qualcuno che si prende cura dell'utente ha stabilito che non è opportuno visualizzare questa immagine.",
        reallyNeedToSee: "Se è veramente necessario visualizzarla, <span class='provide_password'>fornire la password</span> e disattivare questa protezione",
        reallyNeedToSeeUntilRestart: "Se è veramente necessario visualizzarla, <a class='provide_password'>fornire la password</a> e disattivare questa protezione fino al riavvio del computer.",
        productName: "Classificazione pagine di Trend Micro"
    };
}(window));