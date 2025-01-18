const wcag_rules_it = {
    "1.1": {
        "name": "Alternative di testo",
        "desc": "Fornire alternative di testo per qualsiasi contenuto non testuale, in modo che possa essere trasformato in altre forme di cui le persone hanno bisogno, come la stampa a caratteri grandi, il braille, il parlato, i simboli o un linguaggio più semplice."
    },
    "1.1.1": {
        "name": "Contenuto non testuale",
        "desc": "Tutti i contenuti non testuali che vengono presentati all'utente hanno un'alternativa testuale che serve allo stesso scopo, ad eccezione delle situazioni elencate di seguito."
    },
    "1.2.1": {
        "name": "Descrizione audio o supporto alternativo (preregistrato)",
        "desc": "Un'alternativa per i media basati sul tempo o la descrizione audio del contenuto video preregistrato è fornita per i media sincronizzati."
    },
    "1.3.1": {
        "name": "Info e relazioni",
        "desc": "Le informazioni, la struttura e le relazioni trasmesse attraverso la presentazione possono essere determinate programmaticamente o sono disponibili nel testo."
    },
    "1.3.4": {
        "name": "Orientamento",
        "desc": "Il contenuto non limita la sua visualizzazione e il suo funzionamento a un unico orientamento del display, ad esempio verticale o orizzontale, a meno che non sia essenziale un orientamento specifico del display."
    },
    "1.3.5": {
        "name": "Identificare lo scopo dell'ingresso",
        "desc": "Lo scopo di ogni campo di input che raccoglie informazioni sull'utente può essere determinato in modo programmatico."
    },
    "1.4.1": {
        "name": "Uso del colore",
        "desc": "Il colore non viene utilizzato come unico mezzo visivo per trasmettere informazioni, indicare un'azione, sollecitare una risposta o distinguere un elemento visivo."
    },
    "1.4.2": {
        "name": "Controllo audio",
        "desc": "Se l'audio di una pagina Web viene riprodotto automaticamente per più di 3 secondi, è disponibile un meccanismo per mettere in pausa o interrompere l'audio, oppure un meccanismo per controllare il volume dell'audio indipendentemente dal livello generale del volume del sistema."
    },
    "1.4.3": {
        "name": "Contrasto (minimo)",
        "desc": "La presentazione visiva del testo e delle immagini del testo ha un rapporto di contrasto minimo."
    },
    "1.4.4": {
        "name": "Ridimensionare il testo",
        "desc": "Ad eccezione delle didascalie e delle immagini di testo, il testo può essere ridimensionato senza tecnologie assistive fino al 200% senza perdita di contenuto o funzionalità."
    },
    "1.4.6": {
        "name": "Contrasto (migliorato)",
        "desc": "La presentazione visiva del testo e delle immagini del testo ha un rapporto di contrasto di almeno 7:1, tranne che per il testo di grandi dimensioni."
    },
    "1.4.8": {
        "name": "Presentazione visiva",
        "desc": "La presentazione visiva dei blocchi di testo segue determinati standard di accessibilità."
    },
    "1.4.10": {
        "name": "Riflusso",
        "desc": "Il contenuto può essere presentato senza perdita di informazioni o funzionalità e senza richiedere lo scorrimento in due dimensioni per il contenuto a scorrimento verticale con una larghezza equivalente a 320 pixel CSS o per il contenuto a scorrimento orizzontale con un'altezza equivalente a 256 pixel CSS."
    },
    "1.4.12": {
        "name": "Spaziatura del testo",
        "desc": "I parametri di spaziatura del testo seguono determinati standard di accessibilità, ad esempio l'altezza della riga è almeno 1,5 volte la dimensione del carattere."
    },
    "2.1.1": {
        "name": "Tastiera",
        "desc": "Tutte le funzionalità del contenuto sono utilizzabili attraverso un'interfaccia a tastiera."
    },
    "2.1.3": {
        "name": "Tastiera (nessuna eccezione)",
        "desc": "Tutte le funzionalità del contenuto sono utilizzabili attraverso un'interfaccia a tastiera senza richiedere tempistiche specifiche per la pressione dei singoli tasti."
    },
    "2.2.1": {
        "name": "Temporizzazione regolabile",
        "desc": "Ogni limite di tempo impostato dall'utente deve soddisfare determinate specifiche."
    },
    "2.2.2": {
        "name": "Pausa, Stop, Nascondi",
        "desc": "Le informazioni che si muovono, lampeggiano, scorrono o si aggiornano automaticamente devono soddisfare determinate specifiche"
    },
    "2.2.4": {
        "name": "Interruzioni",
        "desc": "Le interruzioni possono essere posticipate o soppresse dall'utente, ad eccezione delle interruzioni per emergenza."
    },
    "2.4.1": {
        "name": "Blocchi di bypass",
        "desc": "È disponibile un meccanismo per bypassare i blocchi di contenuto che si ripetono su più pagine Web."
    },
    "2.4.2": {
        "name": "Titolo della pagina",
        "desc": "Le pagine web hanno titoli che descrivono l'argomento o lo scopo."
    },
    "2.4.4": {
        "name": "Scopo del collegamento (nel contesto)",
        "desc": "Lo scopo di ogni link può essere determinato dal solo testo del link o dal testo del link insieme al suo contesto determinato programmaticamente, tranne nei casi in cui lo scopo del link sarebbe ambiguo per gli utenti in generale."
    },
    "2.4.6": {
        "name": "Titoli ed etichette",
        "desc": "I titoli e le etichette descrivono l'argomento o lo scopo."
    },
    "2.4.9": {
        "name": "Scopo del collegamento (solo collegamento)",
        "desc": "È disponibile un meccanismo che consente di identificare lo scopo di ciascun link dal solo testo del link, tranne nei casi in cui lo scopo del link sarebbe ambiguo per gli utenti in generale."
    },
    "2.5.3": {
        "name": "Etichetta nel nome",
        "desc": "Per i componenti dell'interfaccia utente con etichette che includono testo o immagini di testo, il nome contiene il testo che viene presentato visivamente."
    },
    "2.5.8": {
        "name": "Zielgröße (minimo)",
        "desc": "Tutti gli elementi interattivi devono avere una superficie minima di 24×24 pixel CSS. Dazu kann auch der Leerraum um das Ziel herum gehören."
    },
    "3.1.1": {
        "name": "Lingua della pagina",
        "desc": "La lingua umana predefinita di una pagina Web può essere determinata in modo programmatico."
    },
    "3.1.2": {
        "name": "Il linguaggio delle parti",
        "desc": "La lingua umana di ogni passaggio o frase del contenuto può essere determinata programmaticamente, tranne che per i nomi propri, i termini tecnici, le parole di lingua indeterminata e le parole o frasi che sono entrate a far parte del vernacolo del testo immediatamente circostante."
    },
    "3.1.4": {
        "name": "Abbreviazioni",
        "desc": "È disponibile un meccanismo per identificare la forma estesa o il significato delle abbreviazioni."
    },
    "3.2.5": {
        "name": "Modifica su richiesta",
        "desc": "Le modifiche del contesto vengono avviate solo su richiesta dell'utente o è disponibile un meccanismo per disattivare tali modifiche."
    },
    "3.3.2": {
        "name": "Etichette o istruzioni",
        "desc": "Le etichette o le istruzioni sono fornite quando il contenuto richiede l'immissione di dati da parte dell'utente."
    },
    "4.1.1": {
        "name": "Parsing",
        "desc": "Nei contenuti implementati utilizzando linguaggi di markup, gli elementi hanno tag di inizio e fine completi, gli elementi sono annidati secondo le loro specifiche, gli elementi non contengono attributi duplicati e tutti gli ID sono unici, a meno che le specifiche non consentano queste caratteristiche."
    },
    "4.1.2": {
        "name": "Nome, Ruolo, Valore",
        "desc": "Per tutti i componenti dell'interfaccia utente (compresi, ma non solo, gli elementi dei moduli, i collegamenti e i componenti generati dagli script), il nome e il ruolo possono essere determinati programmaticamente."
    },
    "Best Practice": {
        "name": "Migliori pratiche",
        "desc": "Include linee guida non obbligatorie secondo le WCAG, ma utili per un sito web accessibile."
    }
};