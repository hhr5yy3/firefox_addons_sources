const ea_rules_it = {
    "EA-R1": {
        "content": "Sintassi SVG non corretta",
        "explanation": "La sintassi dell'elemento SVG non è corretta. Manca l'attributo role o l'elemento title/desc.",
        "tip": "Controllare il ruolo o l'elemento title/desc dell'SVG."
    },
    "EA-R2": {
        "content": "<svg> testo accessibile mancante",
        "explanation": "Gli elementi <svg> con il ruolo \"img\" devono avere un nome accessibile, in modo che gli utenti di screen reader possano comprenderne il contenuto e lo scopo.",
        "tip": "Creare un attributo title, un elemento title/desc o attributi aria per l'elemento <svg>."
    },
    "EA-R3": {
        "content": "Il testo alternativo <svg> è molto breve (<5 caratteri)",
        "explanation": "Il testo accessibile SVG è molto breve (<5 caratteri) e potrebbe non descrivere sufficientemente il grafico.",
        "tip": "Verificare se il testo accessibile descrive sufficientemente l'SVG."
    },
    "EA-R4": {
        "content": "Il testo alternativo <svg> è molto lungo (>150 caratteri)",
        "explanation": "Il testo alternativo SVG è molto lungo (>150 caratteri) e potenzialmente può essere sintetizzato. Molte persone non vedenti leggono i testi con l'aiuto di un display Braille. Un display Braille può riprodurre almeno 40 caratteri, ma solo un massimo di 80 caratteri.",
        "tip": "Riassumete la descrizione all'essenziale."
    },
    "EA-R5": {
        "content": "<svg> accessibile è un po' lungo (>80 caratteri)",
        "explanation": "Testo alternativo SVG un po' lungo (>80 caratteri) e potenzialmente riassumibile. Molte persone non vedenti leggono i testi con l'aiuto di un display Braille. Un display Braille può riprodurre almeno 40 caratteri, ma solo un massimo di 80 caratteri.",
        "tip": "Riassumete la descrizione all'essenziale."
    },
    "EA-R6": {
        "content": "Immagine mancante di testo alternativo",
        "explanation": "Le immagini (<img> o role=\"img\") necessitano di un testo alternativo, in modo che gli utenti di screen reader possano capire il contenuto e lo scopo dell'immagine. L'attributo title non è sempre riconosciuto in modo affidabile.",
        "tip": "Aggiungere un testo alternativo significativo usando gli attributi alt-, aria-label- o aria-labelledby-. Per le immagini decorative si può usare un attributo alt vuoto."
    },
    "EA-R7": {
        "content": "Testo alt ridondante come link di collegamento",
        "explanation": "L'immagine ha lo stesso testo alternativo del link che la racchiude. Ripetere il testo alternativo di un link o di un'immagine nel testo adiacente non è necessario e può confondere gli utenti di screen reader che lo leggono due volte.",
        "tip": "Rimuovere il testo alt dall'immagine, poiché non contiene informazioni aggiuntive. Utilizzare invece un attributo alt vuoto, alt=\"\", per l'immagine."
    },
    "EA-R8": {
        "content": "Testo alternativo mancante nell'immagine collegata",
        "explanation": "Poiché il link in sé non contiene testo, l'immagine deve avere un testo alternativo in modo che gli screen reader possano identificare il contenuto e lo scopo del link. L'attributo title non è sufficiente per tutti gli screen reader.",
        "tip": "Aggiungere un testo alternativo significativo per il link o l'immagine collegata."
    },
    "EA-R9": {
        "content": "Il testo alternativo all'immagine è molto breve (<5 caratteri)",
        "explanation": "Il testo alternativo di un'immagine deve descrivere il suo contenuto in modo significativo.",
        "tip": "Verificare che il testo alternativo descriva adeguatamente l'immagine."
    },
    "EA-R10": {
        "content": "Il testo alternativo all'immagine è molto lungo (>150 caratteri)",
        "explanation": "Il testo alternativo di questa immagine è molto lungo (>150 caratteri) e può essere riassunto. Molte persone non vedenti leggono i testi con l'aiuto di un display Braille. Un display Braille può riprodurre almeno 40 caratteri, ma solo un massimo di 80 caratteri.",
        "tip": "Riassumere la descrizione nella sua essenza."
    },
    "EA-R11": {
        "content": "Il testo alternativo all'immagine è un po' lungo (>80 caratteri)",
        "explanation": "Il testo alternativo è un po' lungo (>80 caratteri) e può essere sintetizzato. Molte persone non vedenti leggono i testi con l'aiuto di un display Braille. Un display Braille può riprodurre almeno 40 caratteri, ma solo un massimo di 80 caratteri.",
        "tip": "Riassumere la descrizione nella sua essenza."
    },
    "EA-R12": {
        "content": "I link devono avere un testo accessibile",
        "explanation": "I link richiedono un testo comprensibile e riproducibile correttamente dagli screen reader. Il testo del link deve spiegare chiaramente quali informazioni il lettore otterrà cliccando su quel link.",
        "tip": "Aggiungere un testo di collegamento significativo utilizzando un testo interno o attributi ARIA che descrivano lo scopo e la destinazione del collegamento. Il testo del collegamento non deve essere nascosto agli screen reader (ad esempio con display: none o aria-hidden=\"true\")."
    },
    "EA-R13": {
        "content": "Collegamento vuoto",
        "explanation": "Questo link non ha contenuto né destinazione (attributo href).",
        "tip": "Rimuovere i collegamenti vuoti."
    },
    "EA-R14": {
        "content": "Il testo accessibile al link è un URL",
        "explanation": "I testi dei link devono essere significativi e descrivere lo scopo e l'obiettivo del link. Gli utenti di screen reader devono poter decidere facilmente se seguire un link.",
        "tip": "Assicurarsi di utilizzare descrizioni che descrivano lo scopo e l'obiettivo del link. Il testo del link non deve essere nascosto agli screen reader (ad esempio, con display: none o aria-hidden=\"true\")."
    },
    "EA-R15": {
        "content": "Il testo del link è molto lungo (>150 caratteri)",
        "explanation": "Il testo accessibile di questo link è molto lungo (>150 caratteri) e potenzialmente può essere sintetizzato. Molte persone non vedenti leggono i testi con l'aiuto di un display Braille. Un display Braille può riprodurre almeno 40 caratteri, ma solo un massimo di 80 caratteri.",
        "tip": "Assicuratevi di utilizzare testi significativi e compatti."
    },
    "EA-R16": {
        "content": "<oggetto> manca il nome accessibile",
        "explanation": "Gli elementi <object> possono contenere contenuti multimediali (audio, video, ecc.) e devono avere un nome accessibile per gli screen reader. Gli utenti di screen reader non possono conoscere il contenuto dell'oggetto senza un'alternativa testuale.",
        "tip": "Aggiungete un nome accessibile all'<oggetto> usando un titolo o gli attributi aria come aria-label e aria-labelledby."
    },
    "EA-R17": {
        "content": "Audio rilevato",
        "explanation": "Verificare se le informazioni sono trasmesse nell'audio (ad esempio, tramite una voce di commento). In tal caso, è necessaria una trascrizione.",
        "tip": "Verificare se per il file audio è necessaria una trascrizione. In tal caso, fornire un'alternativa, ad esempio una trascrizione testuale."
    },
    "EA-R18": {
        "content": "Video rilevato",
        "explanation": "Verificare se il video richiede un'alternativa multimediale o una didascalia. Se un video non è sottotitolato, gli utenti sordi avranno un accesso limitato o nullo alle informazioni in esso contenute. Allo stesso modo, i file video muti (senza voce) non sono disponibili per gli utenti non vedenti. Anche per loro è necessaria un'alternativa multimediale completa (testo, traccia audio alternativa o file audio).",
        "tip": "Verificate se è necessaria un'alternativa o una didascalia per il video e, se necessario, fornitela."
    },
    "EA-R19": {
        "content": "Rilevate più intestazioni H1",
        "explanation": "La struttura dei titoli della pagina deve essere logicamente strutturata e, se possibile, iniziare con l'intestazione H1. L'intestazione H1 identifica le parti più importanti della pagina.",
        "tip": "Se possibile, utilizzare un solo titolo H1. Strutturare altre intestazioni con H2, H3, ecc."
    },
    "EA-R20": {
        "content": "Titolo H1 mancante",
        "explanation": "L'intestazione H1 non esiste o è nascosta agli screen reader. Verificate che l'intestazione H1 esista e sia visibile, poiché è il primo e più importante elemento della struttura delle intestazioni (h1-h6). L'elemento <h1> dovrebbe trovarsi all'inizio del contenuto principale, consentendo agli utenti di screen reader di navigare direttamente al contenuto principale utilizzando le scorciatoie da tastiera.",
        "tip": "Se possibile, creare sempre un titolo <h1> visibile che descriva il contenuto della pagina."
    },
    "EA-R21": {
        "content": "Salto nell'ordine di intestazione",
        "explanation": "La struttura delle intestazioni della pagina deve essere organizzata in modo logico e i livelli di intestazione devono aumentare solo di uno. Evitate i salti, ad esempio da H2 a H4.",
        "tip": "Cercate di non saltare l'ordine di intestazione."
    },
    "EA-R22": {
        "content": "Un elemento dell'elenco <li> non fa parte di un elenco",
        "explanation": "Un elenco valido deve sempre essere incorniciato da un elemento <ul> o <ol>. In caso contrario, gli elementi dell'elenco non verranno riconosciuti correttamente come elenco dallo screen reader. Fate attenzione ai possibili ruoli degli elementi genitori <ul> o <ol> attraverso l'attributo role.",
        "tip": "Costruire un elenco corretto con un elemento genitore <ul> o <ol>. Se avete già impostato un elemento <ul> o <ol>, fate attenzione ai possibili ruoli attraverso l'attributo role."
    },
    "EA-R23": {
        "content": "Contrasto del testo insufficiente",
        "explanation": "Assicurarsi che tutti gli elementi di testo abbiano un contrasto di colore sufficiente tra il testo in primo piano e il colore di sfondo dietro di esso. Il contrasto minimo dipende dalle dimensioni del testo ed è di 3:1 o 4,5:1 per i testi in scala maggiore (>18pt).",
        "tip": "Aumentare il contrasto, ad esempio con un font o un colore di sfondo più scuro/più chiaro."
    },
    "EA-R24": {
        "content": "Contrasto SVG insufficiente",
        "explanation": "La rappresentazione visiva degli SVG deve mantenere un rapporto di contrasto minimo di 3:1 per essere ben percepita.",
        "tip": "Aumenta il contrasto dell'SVG."
    },
    "EA-R25": {
        "content": "Controllare manualmente il contrasto",
        "explanation": "È stato rilevato un contrasto molto basso. A volte questo indica l'uso di immagini di sfondo o di gradienti. Controllare manualmente il contrasto.",
        "tip": "Aumentare il contrasto, ad esempio con un font o un colore di sfondo più scuro/più chiaro. Assicuratevi che il testo sopra le immagini di sfondo abbia un contrasto sufficiente, pari a 4,5:1 per il testo più piccolo e a 3:1 per il testo più grande."
    },
    "EA-R26": {
        "content": "La pagina non ha titolo",
        "explanation": "Il titolo della pagina è importante per descrivere l'argomento o lo scopo della pagina. Permette ai visitatori del vostro sito web di classificare o trovare rapidamente i vostri contenuti.",
        "tip": "Aggiungere un elemento <title> descrittivo alla pagina."
    },
    "EA-R27": {
        "content": "Il titolo della pagina è molto breve",
        "explanation": "Il titolo della pagina è importante per descrivere l'argomento o lo scopo della pagina. Permette ai visitatori del vostro sito web di classificare o trovare rapidamente i vostri contenuti.",
        "tip": "Verificare che il titolo descriva adeguatamente la pagina."
    },
    "EA-R28": {
        "content": "<iframe> non ha un nome accessibile",
        "explanation": "Il nome accessibile di un <iframe> è importante per descriverne l'argomento o lo scopo. Gli utenti di screen reader possono accedere a un elenco di titoli per tutti i frame di una pagina. Tuttavia, la navigazione tra gli elementi <frame> e <iframe> può diventare difficile e confusa se il markup manca di un attributo title, in particolare per gli utenti disabili.",
        "tip": "Aggiungere un attributo titolo descrittivo all'<iframe>. In alternativa, si può aggiungere l'attributo aria, come aria-label o aria-labelledby."
    },
    "EA-R29": {
        "content": "Lingua del sito web mancante",
        "explanation": "Affinché la riproduzione vocale da parte degli screen reader o del browser funzioni correttamente, è necessario specificare la lingua della pagina. I lettori di schermo utilizzano librerie sonore diverse per le varie lingue, in base alla pronuncia e alle caratteristiche di quella lingua. È importante specificare una lingua e assicurarsi che sia valida, in modo che il testo del sito web venga pronunciato correttamente.",
        "tip": "Aggiungere l'attributo lang all'elemento HTML della pagina."
    },
    "EA-R30": {
        "content": "Lingua della pagina non corretta",
        "explanation": "Affinché l'output vocale dei lettori di schermo o del browser funzioni correttamente, la lingua della pagina deve essere specificata correttamente. In caso contrario, ad esempio, la pronuncia di un output vocale non è corretta.",
        "tip": "Verificare che la lingua dell'elemento HTML sia uguale a quella della pagina attuale."
    },
    "EA-R31": {
        "content": "Abbreviazione rilevata",
        "explanation": "Le abbreviazioni non sono sempre comprensibili a tutti e dovrebbero essere spiegate nel testo o tramite elementi HTML come <abbr>.",
        "tip": "Controllare se l'abbreviazione è già etichettata. In caso contrario, aggiungere il testo completo o utilizzare elementi HTML speciali come <abbr>."
    },
    "EA-R32": {
        "content": "Il valore dell'attributo ID deve essere unico",
        "explanation": "Un ID è un identificatore univoco per gli elementi della pagina web e di conseguenza non deve essere duplicato. La presenza di ID duplicati può far sì che gli elementi vengano saltati dagli screen reader. A partire dal 2023 questo non è più un requisito WCAG, a meno che non comporti il fallimento di un altro criterio WCAG.",
        "tip": "Rinominare l'ID in modo che venga utilizzato una sola volta nella pagina."
    },
    "EA-R33": {
        "content": "Il pulsante dell'immagine non ha un nome accessibile",
        "explanation": "Un input grafico (<input type=\"image\">) richiede un testo alternativo in modo che gli screen reader possano riflettere il suo scopo.",
        "tip": "Aggiungere un attributo alt o ARIA significativo (aria-label o aria-labelledby) che descriva il contenuto e lo scopo di questa immagine."
    },
    "EA-R34": {
        "content": "Il pulsante di reset non è consigliato",
        "explanation": "Si sconsiglia l'uso dei pulsanti di ripristino, che possono essere facilmente cliccati per errore.",
        "tip": "Se possibile, rimuovere il pulsante di ripristino."
    },
    "EA-R35": {
        "content": "Campo modulo mancante del nome accessibile",
        "explanation": "Un campo del modulo deve avere un nome accessibile, in modo che gli screen reader possano riflettere il suo scopo. Ciò include gli elementi <input> e <select> o gli elementi con ruolo di \"checkbox\", \"listbox\", \"searchbox\", \"spinbutton\" o \"textbox\", tra gli altri ruoli.",
        "tip": "Creare una <label> appropriata per gli elementi <input> o <select>. Si possono usare anche gli attributi aria, come aria-label, per gli elementi con un ruolo. L'etichetta deve descrivere lo scopo di questo campo del modulo. Quando si usa una <label>, utilizzare un attributo for che corrisponda all'id unico dell'input."
    },
    "EA-R36": {
        "content": "<bottone> manca il nome accessibile",
        "explanation": "Un <button> o un <input> con type=\"button\" ha bisogno di un nome accessibile, in modo che i lettori di schermo possano riflettere il suo scopo.",
        "tip": "Inserite un testo nel contenuto dell'elemento button o utilizzate gli attributi aria, come aria-label o aria-labelledby, per descrivere il suo scopo."
    },
    "EA-R38": {
        "content": "<area> manca il testo alternativo",
        "explanation": "Gli elementi area identificano aree all'interno di una mappa immagine che possono essere utilizzate per definire aree cliccabili. Questi elementi hanno quindi bisogno di un nome accessibile, in modo che i lettori di schermo possano riflettere il loro scopo.",
        "tip": "Aggiungere un testo alternativo all'elemento area, ad esempio tramite l'attributo alt o aira-labels."
    },
    "EA-R39": {
        "content": "Il corpo è nascosto all'aria",
        "explanation": "L'elemento body contiene l'attributo aria-hidden: \"true\" e la pagina non è quindi accessibile agli screen reader.",
        "tip": "Rimuove l'attributo aria-hidden dell'elemento body."
    },
    "EA-R40": {
        "content": "<select> manca il nome accessibile",
        "explanation": "Gli elementi <select> devono avere un nome accessibile, in modo che gli utenti di screen reader possano identificarne lo scopo.",
        "tip": "Descrivete lo scopo dell'elenco di selezione con un elemento <label> o con gli attributi aria."
    },
    "EA-R41": {
        "content": "Attributo accesskey duplicato",
        "explanation": "L'attributo accesskey può essere usato per specificare un carattere della tastiera che l'utente può premere per saltare direttamente agli elementi. Un'assegnazione duplicata non è consentita in questo caso e porta a un comportamento inaspettato.",
        "tip": "Modificare l'attributo della chiave di accesso in modo che sia unico per la pagina."
    },
    "EA-R42": {
        "content": "Elemento <th> vuoto",
        "explanation": "L'elemento di testa <th> di una tabella descrive il significato della rispettiva colonna. Senza testo visibile, lo scopo della riga o della colonna non è chiaro né agli utenti vedenti né agli screenreader.",
        "tip": "Inserire un contenuto di testo visibile che descriva i dati di questa colonna."
    },
    "EA-R43": {
        "content": "I titoli non devono essere vuoti",
        "explanation": "Questa voce non contiene testo, ma può essere raggiunta dai lettori di schermo.",
        "tip": "Aggiungere un testo all'intestazione o rimuoverlo."
    },
    "EA-R44": {
        "content": "Intestazione mancante del nome accessibile",
        "explanation": "Questa regola controlla che ogni titolo abbia un nome accessibile non vuoto e sia visibile per i lettori di schermo. I lettori di schermo segnalano agli utenti la presenza di un tag di intestazione. Se l'intestazione è vuota o il testo è inaccessibile, ciò potrebbe confondere gli utenti o addirittura impedire loro di accedere alle informazioni sulla struttura della pagina.",
        "tip": "Controlla se l'intestazione ha un contenuto. Il contenuto può anche essere nascosto usando aria-hidden=\"true\" o display=\"none\"."
    },
    "EA-R45": {
        "content": "Il paragrafo non ha un'altezza di riga sufficiente",
        "explanation": "L'altezza della riga del paragrafo (<p>) è inferiore a 1,5. Questo può influire sulla leggibilità del testo.",
        "tip": "Aumentate l'altezza delle righe del paragrafo ad almeno 1,5."
    },
    "EA-R46": {
        "content": "spaziatura tra lettere nell'attributo di stile",
        "explanation": "Questa regola controlla che l'attributo style non sia usato per evitare di regolare l'interlinea delle lettere usando !important, tranne se è almeno 0,12 volte la dimensione del carattere. L'uso di !important negli attributi di stile impedisce che questo stile venga sovrascritto.",
        "tip": "Se possibile, non utilizzate !important nell'attributo di stile o assicuratevi che la spaziatura delle lettere sia almeno 0,12 volte la dimensione del carattere."
    },
    "EA-R47": {
        "content": "spaziatura tra le parole nell'attributo di stile",
        "explanation": "Questa regola controlla che l'attributo style non sia usato per evitare di regolare la spaziatura delle parole usando !important, tranne se è almeno 0,16 volte la dimensione del carattere. L'uso di !important negli attributi di stile impedisce che questo stile venga sovrascritto.",
        "tip": "Se possibile, non utilizzate !important nell'attributo di stile o assicuratevi che l'interlinea sia almeno 0,16 volte la dimensione del carattere."
    },
    "EA-R48": {
        "content": "Altezza linea nell'attributo di stile",
        "explanation": "Questa regola controlla che l'attributo style non sia usato per evitare di regolare l'altezza delle righe usando !important, tranne se è almeno 1,5 volte la dimensione del carattere. L'uso di !important negli attributi di stile impedisce che questo stile venga sovrascritto.",
        "tip": "Se possibile, non utilizzate !important nell'attributo di stile o assicuratevi che l'altezza delle linee sia almeno 1,5 volte la dimensione del carattere."
    },
    "EA-R49": {
        "content": "L'elemento <audio> o <video> riproduce automaticamente l'audio.",
        "explanation": "L'audio o il video riprodotto automaticamente non può avere una durata superiore a 3 secondi o necessita di un meccanismo di controllo dell'audio per essere interrotto o disattivato.",
        "tip": "Non riproducete automaticamente l'audio o assicuratevi che sia disponibile un meccanismo di controllo per interrompere o disattivare l'audio."
    },
    "EA-R50": {
        "content": "Rilevato attributo lang non valido",
        "explanation": "L'attributo lang dell'elemento <html> deve essere un codice di lingua valido e conforme allo standard BCP 47, ad esempio \"de\" o \"en-us\".",
        "tip": "Assicurarsi che un codice di lingua valido sia impostato come attributo lang dell'elemento <html>."
    },
    "EA-R51": {
        "content": "Gli attributi Lang e xml:lang non coincidono",
        "explanation": "Gli attributi lang e xml:lang dell'elemento <html> di una pagina HTML non incorporata devono avere lo stesso subtag di lingua primaria.",
        "tip": "Assicurarsi che gli attributi lang e xml:lang dell'elemento <html> corrispondano."
    },
    "EA-R52": {
        "content": "Elementi <Iframe> con nomi accessibili identici",
        "explanation": "Gli elementi <iframe> con nomi accessibili identici dovrebbero essere evitati o almeno incorporare la stessa risorsa o risorse equivalenti. L'uso dello stesso nome accessibile può essere fuorviante per gli utenti di screen reader.",
        "tip": "Utilizzare attributi titolo unici per ogni frame o assicurarsi che gli elementi <iframe> con nomi accessibili identici portino alla stessa risorsa."
    },
    "EA-R53": {
        "content": "<iframe> ha un tabindex negativo",
        "explanation": "Gli elementi <iframe> con un attributo tabindex negativo non devono contenere elementi interattivi. Impostando il valore dell'attributo tabindex di un elemento <iframe> a -1 o a un altro numero negativo, diventa impossibile spostare il focus nel contesto di navigazione dell'elemento <iframe>.",
        "tip": "Rimuove il tabindex negativo se il <iframe> contiene elementi focalizzabili."
    },
    "EA-R54": {
        "content": "Meta viewport impedisce lo zoom",
        "explanation": "L'uso degli elementi <meta name=\"viewport\"> può limitare la capacità di zoom dell'utente, soprattutto sui dispositivi mobili. Lo zoom è un comportamento comune e previsto nelle pagine web per dispositivi mobili, quindi la sua disattivazione riduce l'esperienza dell'utente mobile, soprattutto per gli utenti con visione parziale o ipovedenti.",
        "tip": "Rimuovere gli attributi user-scalable e maximum-scale. Altrimenti, assicurarsi che l'attributo content non imposti user-scalable a \"no\" e che la proprietà maximum-scale sia almeno pari a 2."
    },
    "EA-R55": {
        "content": "Nessuna cella dati assegnata all'intestazione della tabella",
        "explanation": "Questa regola controlla che a ogni intestazione di tabella <th> siano assegnate le celle <td> in un elemento tabella. Se le tabelle non sono contrassegnate in modo appropriato, è possibile che l'output dello screen reader sia confuso o impreciso.",
        "tip": "Rimuovere le celle di intestazione della tabella che non hanno celle assegnate o assegnare celle all'intestazione."
    },
    "EA-R56": {
        "content": "Attributo ARIA non definito",
        "explanation": "Questa regola controlla che ogni attributo aria-* specificato sia definito in <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA 1.1</a>. Gli attributi aria non validi o scritti male non vengono riconosciuti dagli screen reader.",
        "tip": "Verificare che l'attributo aria non sia scritto in modo errato e che sia specificato nel file <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA-specifications</a>. Assicurarsi di utilizzare solo attributi aria validi."
    },
    "EA-R57": {
        "content": "Stato o proprietà ARIA non supportati",
        "explanation": "Questa regola controlla che gli stati o le proprietà <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria/\">WAI-ARIA</a> siano consentiti per l'elemento su cui sono specificati. Gli stati o le proprietà ARIA devono essere conformi alle specifiche ufficiali, altrimenti potrebbero essere ignorati o interpretati in modo errato dalle tecnologie assistive.",
        "tip": "Rimuovere stati o proprietà WAI-ARIA non specificati o correggerli con un valore consentito."
    },
    "EA-R58": {
        "content": "Stato o valore di proprietà ARIA non valido",
        "explanation": "Questa regola controlla che il valore di <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">stati o proprietà ARIA</a> sia consentito per l'elemento in cui è specificato. Gli stati o le proprietà ARIA devono essere conformi alle specifiche ufficiali, altrimenti non sono accessibili agli utenti di tecnologie assistive.",
        "tip": "Rimuovere i valori ARIA non specificati di stati o proprietà o correggerli con il valore corretto."
    },
    "EA-R59": {
        "content": "L'attributo di completamento automatico non è valido",
        "explanation": "Questa regola si applica a qualsiasi elemento HTML <input>, <select> e <textarea> con un valore di attributo di completamento automatico. L'attributo di completamento automatico ha bisogno di un valore corretto per essere riconosciuto dal browser e dagli screenreader.",
        "tip": "Assicurarsi che <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete\">il valore del completamento automatico</a> sia supportato."
    },
    "EA-R60": {
        "content": "Nessuna cella di intestazione assegnata alle celle di dati",
        "explanation": "Questa regola controlla che a ogni intestazione di tabella <th> siano assegnate le celle <td> in un elemento di tabella.",
        "tip": "Se possibile, aggiungere una cella di intestazione <th> a ogni cella di dati <td>."
    },
    "EA-R61": {
        "content": "La pagina non ha un titolo",
        "explanation": "Il documento non presenta elementi di intestazione. Le intestazioni aggiungono struttura a un sito web e aiutano gli utenti di screen reader a navigare e a comprenderne il contenuto.",
        "tip": "Verificate se è possibile aggiungere titoli per dare una struttura al sito. Assicurarsi di contrassegnare correttamente tutti i testi di intestazione utilizzando i tag <h1>-<h6> o con role=\"heading\"."
    },
    "EA-R62": {
        "content": "L'elemento di presentazione ha discendenti focalizzabili",
        "explanation": "Questa regola controlla che gli elementi con un ruolo che rende i suoi figli presentativi non contengano elementi focalizzabili, ad esempio un link, un pulsante o un input. Tali elementi sono ad esempio <button>, checkbox o <img>. I figli di questi elementi non vengono rilevati correttamente dalle tecnologie assistive e creano un tab stop vuoto.",
        "tip": "Non aggiungere elementi focalizzabili come figli di elementi con un ruolo che rende i suoi figli presentativi, ad esempio un <button> o role=\"checkbox\"."
    },
    "EA-R63": {
        "content": "L'elemento decorativo è esposto alle tecnologie assistive",
        "explanation": "Questa regola controlla che gli elementi contrassegnati come decorativi non siano inclusi nell'albero dell'accessibilità o abbiano un ruolo di presentazione. Se si contrassegna un elemento come decorativo, lo si nasconde alle tecnologie assistive, mentre se lo si rende focalizzabile lo si espone. Inoltre, alcuni elementi come <nav> non possono avere un ruolo decorativo se possiedono un nome accessibile, ad esempio tramite un'etichetta aria. Questo conflitto dovrebbe essere evitato.",
        "tip": "Verificare se l'elemento deve essere contrassegnato come decorativo o nasconderlo alle tecnologie assistive, ad esempio usando aria-hidden=\"true\" o role=\"presentation\". In questo caso, rimuovere anche tutti gli attributi aria label."
    },
    "EA-R64": {
        "content": "Contenitore mancante di bambini necessari",
        "explanation": "Alcuni elementi con un ruolo semantico esplicito devono avere almeno uno degli elementi posseduti. Per esempio, un elemento con il ruolo \"list\" deve possedere elementi con il ruolo \"listitem\". La mancanza di questo requisito può rendere l'elemento stesso non valido.",
        "tip": "Controllare se il ruolo dell'elemento è stato usato correttamente o assicurarsi di includere i nodi figli richiesti."
    },
    "EA-R65": {
        "content": "Elemento mancante del genitore richiesto",
        "explanation": "Alcuni elementi con un ruolo semantico esplicito devono avere un elemento genitore specifico. Per esempio, un elemento con il ruolo \"listitem\" ha bisogno di un nodo genitore con il ruolo \"list\". In mancanza di questo requisito, l'elemento stesso non è valido.",
        "tip": "Controllare se il ruolo dell'elemento è stato usato correttamente o assicurarsi di usare il nodo genitore e il ruolo richiesti."
    },
    "EA-R66": {
        "content": "L'elemento Aria-nascosto ha un contenuto focalizzabile",
        "explanation": "Aggiungendo aria-hidden=\"true\" a un elemento, l'elemento stesso e tutti i suoi discendenti vengono nascosti alle tecnologie assistive. Esporre l'elemento alla navigazione con focus sequenziale può causare confusione agli utenti delle tecnologie assistive, perché l'elemento è raggiungibile, ma dovrebbe essere nascosto.",
        "tip": "Verificare se l'elemento deve essere nascosto alla tecnologia assistiva e, in tal caso, rimuoverlo dalla navigazione sequenziale. Per rimuovere la navigazione a schede, aggiungere l'attributo tabindex=\"-1\", lo stile \"disabled:none\" o l'attributo disabled."
    },
    "EA-R67": {
        "content": "La dimensione dei caratteri è molto piccola",
        "explanation": "Questa regola controlla che le dimensioni dei caratteri siano superiori a 9 pixel. Le dimensioni ridotte dei caratteri non sono facili da leggere e dovrebbero essere evitate se possibile.",
        "tip": "Verificare se la dimensione dei caratteri può essere aumentata di almeno 10px. In generale, per il testo normale si consiglia una dimensione dei caratteri di 16px o superiore."
    },
    "EA-R68": {
        "content": "Il gruppo manca di un nome accessibile",
        "explanation": "Il raggruppamento di controlli di moduli correlati rende i moduli più comprensibili per tutti gli utenti, in quanto i controlli correlati sono più facili da identificare. Affinché le tecnologie assistive possano identificare correttamente lo scopo di un gruppo, è necessario assegnargli un nome accessibile, ad esempio utilizzando un <legend> per un <fieldset> o gli attributi aria per gli elementi con role=\"group\" o \"menubar\".",
        "tip": "Assicuratevi che ogni gruppo abbia un nome accessibile usando gli attributi aria, come aria-label o <legend> per un <fieldset>."
    },
    "EA-R69": {
        "content": "Attributo Headers dei riferimenti di cella mancanti",
        "explanation": "L'attributo <a target=\"_blank\" href=\"https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/H43\">headers</a> specifica una o più celle di intestazione a cui è collegata una cella di tabella. È utilizzato solo dai lettori di schermo. Questa regola controlla che l'attributo headers di una cella faccia riferimento a una cella corrispondente nello stesso elemento tabella. Se le tabelle non sono contrassegnate in modo corretto, è possibile che l'output del lettore di schermo sia confuso o impreciso.",
        "tip": "Controlla se nella stessa tabella esiste un'altra cella con l'id del valore dell'attributo headers. In caso contrario, eliminare l'attributo headers o creare una cella corrispondente con questo id."
    },
    "EA-R70": {
        "content": "L'elemento contrassegnato come decorativo è esposto",
        "explanation": "Questa regola controlla che gli elementi contrassegnati come decorativi non siano inclusi nell'albero dell'accessibilità o abbiano un ruolo di presentazione. Se si contrassegna un elemento come decorativo, lo si nasconde alle tecnologie assistive, ma se lo si rende focalizzabile o si aggiungono attributi ARIA lo si può esporre. Questo conflitto dovrebbe essere evitato.",
        "tip": "Verificare se l'elemento deve essere contrassegnato come decorativo o nasconderlo alle tecnologie assistive, ad esempio usando aria-hidden=\"true\" o role=\"presentation\"."
    },
    "EA-R71": {
        "content": "Rilevato elemento con attributo lang non valido",
        "explanation": "Le parti di un sito web possono essere contrassegnate come in una lingua diversa dal resto del sito utilizzando l'attributo lang. Anche l'attributo lang di questi elementi deve essere un codice di lingua valido e conforme allo standard BCP 47, ad esempio \"de\" o \"en-us\".",
        "tip": "Assicurarsi che un codice di lingua valido sia impostato come attributo lang dell'elemento."
    },
    "EA-R72": {
        "content": "Link non distinguibile dal testo circostante",
        "explanation": "Questa regola controlla che i link in linea siano distinguibili dal testo circostante attraverso una differenza non basata solo sul colore. I link possono essere evidenziati, ad esempio sottolineando il testo o utilizzando un bordo. Vengono controllati anche gli stati Hover e Focus.",
        "tip": "Assicuratevi che il link sia distinguibile dal testo circostante non solo per il colore. Verificatelo anche quando passate il mouse o mettete a fuoco il link."
    },
    "EA-R73": {
        "content": "Voce di menu mancante del nome accessibile",
        "explanation": "Questa regola controlla che ogni elemento con ruolo menuitem abbia un nome accessibile non vuoto. Il ruolo menuitem indica che l'elemento è un'opzione in un insieme di scelte contenute in un menu o in una barra di menu.",
        "tip": "Aggiungere un nome accessibile utilizzando il contenuto dell'elemento o gli attributi aria."
    },
    "EA-R74": {
        "content": "L'orientamento della pagina è limitato",
        "explanation": "Questa regola controlla che il contenuto della pagina non sia limitato all'orientamento orizzontale o verticale utilizzando la proprietà CSS transform. Gli elementi fissati a una certa rotazione, utilizzando la funzione media orientation con un valore di landscape o portrait, possono non ruotare sui dispositivi mobili.",
        "tip": "Assicurarsi che tutti gli elementi del sito web ruotino correttamente quando si passa dalla modalità verticale a quella orizzontale."
    },
    "EA-R75": {
        "content": "Il paragrafo è tutto in corsivo",
        "explanation": "Sebbene l'uso del corsivo per evidenziare i contenuti importanti sia positivo, evitate di usare il corsivo su paragrafi di testo più lunghi. Soprattutto per le persone dislessiche, il testo in corsivo può essere più difficile da leggere.",
        "tip": "Evitate le grandi porzioni di testo in corsivo e usatelo solo per evidenziare i contenuti importanti."
    },
    "EA-R76": {
        "content": "Il paragrafo è tutto maiuscolo",
        "explanation": "Sebbene l'uso del testo in maiuscolo per evidenziare i contenuti importanti possa essere utile, evitate di usare il testo in maiuscolo per i paragrafi più lunghi. Soprattutto per le persone dislessiche il testo in maiuscolo può essere più difficile da leggere. I lettori di schermo possono anche leggere ogni lettera singolarmente.",
        "tip": "Evitate le grandi porzioni di testo in maiuscolo e usatele solo per evidenziare i contenuti importanti."
    },
    "EA-R77": {
        "content": "I paragrafi di testo sono giustificati",
        "explanation": "Le persone con determinate disabilità cognitive hanno problemi a leggere il testo giustificato sia a destra che a sinistra. La spaziatura irregolare tra le parole in un testo completamente giustificato può rendere la lettura difficile e, in alcuni casi, impossibile.",
        "tip": "Evitare l'allineamento del testo giustificato nei paragrafi di testo più lunghi."
    },
    "EA-R78": {
        "content": "Il contenuto non è incluso in una regione di riferimento",
        "explanation": "<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html\">I punti di riferimento</a> identificano programmaticamente le sezioni di una pagina. È una buona pratica includere tutti i contenuti della pagina nei punti di riferimento, in modo che gli utenti di screen reader che si affidano ad essi per navigare da una sezione all'altra non perdano traccia dei contenuti. Esempi di regioni sono header, nav, footer o main. I punti di riferimento nativi di HTML5 come &lt;nav&gt; sono consigliati rispetto all'uso di ruoli ARIA come role=\"nav\".",
        "tip": "Aggiungere tutti gli elementi di testo ai punti di riferimento esistenti o crearne di nuovi. È possibile trovare una panoramica dei <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/HTML5.html\">marchi HTML qui</a>."
    },
    "EA-R79": {
        "content": "L'elemento <meta> ha un ritardo di aggiornamento",
        "explanation": "Questa regola controlla che l'elemento <meta> non sia usato per il reindirizzamento o il refresh ritardato. Poiché gli utenti non si aspettano che una pagina si aggiorni automaticamente, tale aggiornamento può disorientare. Se viene utilizzato un aggiornamento o un reindirizzamento, l'attributo content dell'elemento <meta> deve essere 0 o superiore a 72000 (20 ore).",
        "tip": "Non utilizzare aggiornamenti o reindirizzamenti ritardati o fornire una funzionalità che consenta all'utente di regolare il timer."
    },
    "EA-R80": {
        "content": "L'elemento <meta> ha un ritardo di aggiornamento (AAA)",
        "explanation": "Questa regola controlla che l'elemento <meta> non sia utilizzato per il reindirizzamento o il refresh ritardato. Se viene utilizzato un aggiornamento o un reindirizzamento, il valore dell'attributo content dell'elemento <meta> deve essere 0 senza eccezioni.",
        "tip": "Non utilizzare l'aggiornamento o il reindirizzamento ritardato e impostare il ritardo a 0."
    },
    "EA-R81": {
        "content": "Regione mancante del nome accessibile",
        "explanation": "Il ruolo di regione viene utilizzato per identificare le aree del documento che l'autore ritiene significative. Ogni regione deve avere un nome accessibile, in modo che gli utenti di screen reader possano identificarne il contenuto e lo scopo.",
        "tip": "Aggiungere un nome accessibile alla regione utilizzando gli attributi aria."
    },
    "EA-R82": {
        "content": "L'elemento ha un ruolo non valido",
        "explanation": "Questa regola controlla che ogni attributo di ruolo abbia un valore valido secondo le specifiche <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles\">WAI-ARIA</a>. Vengono controllati anche i ruoli deprecati.",
        "tip": "Controllare che l'attributo role non contenga errori ortografici e che il ruolo esista nella specifica."
    },
    "EA-R83": {
        "content": "L'elemento scorrevole non è accessibile da tastiera",
        "explanation": "Questa regola controlla che gli elementi scrollabili possano essere fatti scorrere da tastiera. Per garantire che ci sia un elemento da cui si possano usare i tasti freccia per controllare la posizione di scorrimento, il focus deve essere su o in un'area scrollabile.",
        "tip": "Assicurarsi che ogni elemento scorrevole o uno dei suoi figli sia focalizzabile."
    },
    "EA-R84": {
        "content": "L'etichetta visibile non fa parte del nome accessibile",
        "explanation": "Questa regola controlla che gli elementi interattivi come i pulsanti o i link abbiano la loro etichetta visibile completa come parte del loro nome accessibile, ad esempio quando si usa aria-label. Questo è particolarmente importante per gli utenti che utilizzano l'input vocale per controllare il sito web. In caso contrario, l'input vocale non può essere interpretato correttamente e potrebbe non funzionare. Un contesto aggiuntivo che non fa parte del nome visibile può essere aggiunto usando aria-describedby.",
        "tip": "Assicurarsi che l'intera etichetta visibile (non solo una parte) sia inclusa nel nome accessibile (impostato, ad esempio, con aria-label)."
    },
    "EA-R85": {
        "content": "Contrasto del testo insufficiente (migliorato)",
        "explanation": "Si tratta di un miglioramento AAA alla regola del contrasto minimo. Assicurarsi che tutti gli elementi di testo abbiano un contrasto di colore sufficiente tra il testo in primo piano e il colore di sfondo dietro di esso. Il contrasto minimo dipende dalle dimensioni del testo ed è di 7:1 o 4,5:1 per i testi più grandi.",
        "tip": "Aumentare il contrasto, ad esempio con un font o un colore di sfondo più scuro/più chiaro. L'aiuto è fornito dal <a target=\"_blank\" href=\"https://dashboard.eye-able.com/tools/contrast-check\">controller del contrasto di Eye-Able</a> nella Dashboard sotto Strumenti."
    },
    "EA-R86": {
        "content": "ARIA Meter-elemento mancante del nome accessibile",
        "explanation": "Un misuratore è una visualizzazione grafica di un valore numerico all'interno di un intervallo definito. Un elemento con il ruolo \"meter\" deve avere un nome accessibile, in modo che gli utenti di screen reader possano identificarne il contenuto e lo scopo.",
        "tip": "Aggiungere un nome accessibile al misuratore usando un titolo, un'etichetta aria o un attributo aria-labelledby."
    },
    "EA-R87": {
        "content": "ARIA Progressbar manca di un nome accessibile",
        "explanation": "Una barra di avanzamento indica lo stato di avanzamento dei compiti che richiedono molto tempo. Un elemento con il ruolo \"progressbar\" deve avere un nome accessibile, in modo che gli utenti di screen reader possano identificarne il contenuto e lo scopo.",
        "tip": "Aggiungere un nome accessibile alla barra di avanzamento usando un titolo, un'etichetta aria o un attributo aria-labelledby."
    },
    "EA-R88": {
        "content": "Manca l'equivalente aria-braille",
        "explanation": "Questo controllo assicura che esista un equivalente non braille per i contenuti aria-braillelabel e aria-brailleroledescription. Se usati senza una corrispondente etichetta o descrizione del ruolo, ARIA dice di ignorare questi attributi.",
        "tip": "Assicuratevi di fornire un equivalente non braille per gli attributi aria citati. Potrebbe trattarsi di un attributo aria-label o aria-roledescription."
    },
    "EA-R89": {
        "content": "Pulsante, collegamento o voce di menu ARIA mancante di nome accessibile",
        "explanation": "È fondamentale che ogni pulsante ARIA (role=\"button\"), link (role=\"link\") e voce di menu (role=\"menuitem\") abbia un nome che possa essere letto dalle tecnologie assistive.",
        "tip": "Assicurarsi che ogni pulsante, collegamento o voce di menu ARIA abbia un nome descrittivo e accessibile. Si può usare un testo interno, un attributo aria-label o aria-labelledby non vuoto."
    },
    "EA-R90": {
        "content": "Ruolo mancante degli attributi richiesti",
        "explanation": "Questa regola controlla che gli elementi che hanno un ruolo esplicito specifichino anche tutti gli stati e le proprietà richieste per quel ruolo. Lo stato dell'elemento non viene comunicato agli utenti di screen reader se un attributo richiesto viene omesso.",
        "tip": "Aggiungere gli attributi ARIA mancanti. Per ulteriori informazioni sugli attributi richiesti, consultare la <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#states_and_properties\">specifica ARIA</a>."
    },
    "EA-R91": {
        "content": "Il tooltip ARIA manca del nome accessibile",
        "explanation": "Ogni elemento ARIA tooltip (role=\"tooltip\") deve avere un nome accessibile che ne descriva lo scopo o la funzione per gli utenti di tecnologie assistive.",
        "tip": "Assicurarsi che ogni tooltip ARIA abbia un nome chiaro e descrittivo. Questo può essere impostato utilizzando un testo interno visibile o attributi come aria-label e aria-labelledby."
    },
    "EA-R92": {
        "content": "L'elemento <blink> è deprecato",
        "explanation": "L'elemento <blink> fa sì che il testo al suo interno lampeggi a una velocità predeterminata. Questo non può essere interrotto dall'utente, né può essere disabilitato come preferenza. Pertanto, i contenuti che utilizzano il blink non soddisfano il Criterio di successo perché il lampeggiamento può continuare per più di tre secondi.",
        "tip": "Rimuovere tutti gli elementi <blink> dalla pagina web."
    },
    "EA-R93": {
        "content": "Pagina mancante di mezzi per bypassare i blocchi ripetuti",
        "explanation": "Fornire modi per saltare i contenuti ripetitivi aiuta gli utenti a navigare nel sito in modo più efficace. Questa regola fallisce se la pagina non ha né un link di salto interno, né un'intestazione o una regione di riferimento.",
        "tip": "L'utilizzo di <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/\">elementi di riferimento appropriati</a>, come &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;, <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">intestazioni</a> o <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">collegamenti di salto interni</a> può aiutare gli utenti a navigare il sito in modo più efficace."
    },
    "EA-R94": {
        "content": "Struttura dell'elemento <dl> non corretta",
        "explanation": "Un elenco di definizioni (<dl>) racchiude un elenco di gruppi di termini (utilizzando gli elementi <dt>) e descrizioni (utilizzando gli elementi <dd>), ad esempio per visualizzare un glossario. Un elenco di definizioni può contenere solo elementi <dt>, <dd>, <template>, <script> o <div> in un ordine corretto.",
        "tip": "Verificare che l'elenco delle definizioni contenga solo elementi <dt>, <div> e <dd>. Inoltre, assicurarsi che siano ordinati correttamente: <dt> dovrebbe sempre precedere gli elementi <dd>."
    },
    "EA-R95": {
        "content": "L'elemento <dt> o <dd> non contiene <dl>.",
        "explanation": "Gli elementi termine di descrizione <dt> e dettagli di descrizione <dd> devono sempre essere avvolti da un elemento elenco di definizione <dl>, altrimenti l'elenco di definizione non è valido. In caso contrario, le tecnologie assistive potrebbero non essere in grado di riconoscere correttamente l'elenco di definizioni.",
        "tip": "Assicurarsi che l'elemento genitore di <dt> o <dd> sia un elenco di definizione <dl> o un <div> figlio di un <dl>."
    },
    "EA-R96": {
        "content": "Il campo del modulo ha più etichette",
        "explanation": "Ogni campo del modulo dovrebbe avere una sola <etichetta> associata. In caso contrario, vi sono incongruenze nel modo in cui le diverse tecnologie assistive e le combinazioni di browser interpretano l'etichetta. Le etichette sono collegate ai campi del modulo utilizzando l'attributo for della <label> e l'attributo id del campo del modulo.",
        "tip": "Assicurarsi che ogni campo del modulo abbia una sola <etichetta> associata. Utilizzare l'id del campo del modulo per cercare le etichette collegate."
    },
    "EA-R98": {
        "content": "Il valore dell'attributo ARIA ID deve essere unico",
        "explanation": "Un ID è un identificatore unico per gli elementi della pagina web e di conseguenza non deve essere duplicato. Questo è particolarmente importante per gli elementi ARIA, in quanto l'ID viene utilizzato per allegare nomi o descrizioni accessibili. Gli ID duplicati sono errori di validazione comuni che possono compromettere l'accessibilità delle etichette.",
        "tip": "Rinominare l'ID in modo che venga usato una sola volta nella pagina. Verificare che gli elementi ARIA rimangano validi."
    },
    "EA-R99": {
        "content": "Gli elenchi devono contenere solo elementi <li>.",
        "explanation": "Gli elenchi (<ul> o <ol>) devono essere strutturati correttamente per essere leggibili e annunciati correttamente dalle tecnologie assistive. Un elenco deve contenere solo <li>, <script> o <template> come nodi figli diretti. Gli elementi dell'elenco stesso possono contenere altri elementi.",
        "tip": "Assicurarsi che il nodo elenco (<ul> o <ol>) abbia solo elementi di elenco (<li>) come nodi figli diretti."
    },
    "EA-R101": {
        "content": "Evitare l'uso di elementi <marquee>.",
        "explanation": "L'elemento <marquee> crea un testo scorrevole difficile da leggere e da cliccare. L'elemento <marquee> è deprecato e può causare problemi di accessibilità e usabilità, soprattutto perché è difficile da mettere in pausa.",
        "tip": "Sostituire gli elementi <marquee> con moderne animazioni CSS o altre tecniche."
    },
    "EA-R102": {
        "content": "Evitare l'uso di mappe di immagini lato server",
        "explanation": "Le mappe di immagini sul lato server non sono accessibili agli utenti che utilizzano la tastiera, che devono fare clic con il mouse per accedere ai contenuti collegati. Questo rende l'immagine inaccessibile a chi naviga solo con la tastiera. Inoltre, non è possibile fornire alternative di testo per le zone interattive di una mappa di immagini lato server, come invece è possibile fare con le mappe di immagini lato client.",
        "tip": "Utilizzate mappe di immagini lato client o altri elementi interattivi per migliorare l'accessibilità."
    },
    "EA-R104": {
        "content": "Il bersaglio da toccare è troppo piccolo",
        "explanation": "I bersagli tattili devono avere dimensioni e spaziatura sufficienti per essere attivati facilmente senza attivare involontariamente un bersaglio adiacente. I bersagli tattili devono avere una dimensione minima di 24 x 24 pixel CSS o una distanza di 24px dal bersaglio successivo. I target tattili di grandi dimensioni aiutano a prevenire gli errori dell'utente e garantiscono una migliore esperienza per gli utenti mobili. Questa regola dipende dalle dimensioni del viewport e dalla posizione di scorrimento.",
        "tip": "Assicurarsi che il target tattile abbia una dimensione minima di 24 x 24 pixel CSS o una distanza di 24px dal target successivo. Esiste un'eccezione se esiste un altro controllo in grado di fornire la funzionalità sottostante e di soddisfare le dimensioni minime."
    },
    "EA-R105": {
        "content": "Assicurare valori appropriati per l'attributo ruolo",
        "explanation": "Valori di ruolo inadeguati possono confondere gli utenti di tecnologie assistive o far sì che gli elementi vengano ignorati.",
        "tip": "Convalida che l'attributo role abbia un valore adatto all'elemento dato."
    },
    "EA-R106": {
        "content": "La finestra di dialogo ARIA manca di un nome accessibile",
        "explanation": "Gli utenti di screen reader non possono capire lo scopo delle finestre di dialogo ARIA (elementi con role=\"dialog\" o role=\"alertdialog\") che non hanno un nome accessibile. Un nome accessibile fornisce un contesto alla finestra di dialogo, consentendo agli utenti di screen reader di comprenderne lo scopo e la funzione.",
        "tip": "Assicurarsi che la finestra di dialogo ARIA abbia un nome accessibile. A tale scopo, utilizzare gli attributi aria-label o aria-labelledby."
    },
    "EA-R107": {
        "content": "Garantire l'uso corretto di role=\"text\".",
        "explanation": "Il role=\"text\" deve essere usato per gli elementi che non hanno discendenti focalizzabili, per evitare problemi di navigazione agli utenti di screen reader.",
        "tip": "Usare role=\"text\" per gli elementi senza elementi figli focalizzabili."
    },
    "EA-R108": {
        "content": "ARIA treeitem mancante del nome accessibile",
        "explanation": "Un albero (role=\"tree\") è un elenco gerarchico con nodi genitori e figli, che può essere espanso e collassato. Un treeitem (role=\"treeitem\") è un nodo di un albero. Senza un nome accessibile, i lettori di schermo non sono in grado di determinare lo scopo del treeitem.",
        "tip": "Assegnare un nome descrittivo alla voce dell'albero utilizzando un testo interno, un'aria-label o un'aria-labelledby."
    },
    "EA-R110": {
        "content": "L'elemento del modulo manca di un'etichetta visibile",
        "explanation": "Le etichette visibili migliorano l'accessibilità dei moduli, fornendo un contesto chiaro agli utenti vedenti. Affidarsi esclusivamente alle etichette nascoste, al titolo o all'aria-describedby può essere limitante. Gli attributi title e aria-describedby forniscono informazioni aggiuntive come i suggerimenti. Poiché i suggerimenti sono presentati in modo diverso dalle etichette alle API per l'accessibilità, ciò può causare problemi con le tecnologie assistive.",
        "tip": "Fornire un'etichetta visibile e chiara. L'ideale sarebbe utilizzare un elemento <label>. Se non è possibile, si possono usare anche aria-label o aria-labelledby."
    },
    "EA-R111": {
        "content": "Il punto di riferimento del banner non è al livello superiore",
        "explanation": "Con i <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marchi di terra</a>, gli utenti non vedenti che utilizzano uno screen reader hanno la possibilità di saltare alle sezioni di una pagina web. Il ruolo banner (role=\"banner\") serve a definire un'intestazione globale del sito, ad esempio una funzione di ricerca, la navigazione globale o uno slogan. Se il punto di riferimento del banner non è un punto di riferimento di primo livello (ed è contenuto in un altro punto di riferimento), non definisce in modo efficace la porzione di intestazione predeterminata del layout.",
        "tip": "Assicurarsi che ogni punto di riferimento del banner non sia contenuto in un altro punto di riferimento."
    },
    "EA-R112": {
        "content": "Il punto di riferimento complementare non è di livello superiore",
        "explanation": "Con i <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">segnali di terra</a>, gli utenti non vedenti che utilizzano uno screen reader hanno la possibilità di saltare alle sezioni di una pagina web. I contenuti complementari come &lt;aside&gt; o role=\"complementare\" integrano il contenuto principale di un documento o di una pagina. Gli utenti di screen reader hanno la possibilità di saltare il contenuto complementare quando appare al livello superiore della pagina. Questa opzione non è disponibile se si incorpora un elemento &lt;aside&gt; in un altro punto di riferimento.",
        "tip": "Assicurarsi che ogni punto di riferimento complementare (&lt;aside&gt; o role=\"complementare\") non sia contenuto in un altro punto di riferimento."
    },
    "EA-R113": {
        "content": "Il punto di riferimento di Contentinfo non è al livello superiore",
        "explanation": "Con <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, gli utenti non vedenti che utilizzano uno screen reader hanno la possibilità di saltare alle sezioni di una pagina web. Il ruolo contentinfo (role=\"contentinfo\") definisce un piè di pagina, contenente informazioni quali il copyright, i link di navigazione e le dichiarazioni sulla privacy. Collocarlo all'interno di un altro punto di riferimento può impedire agli utenti non vedenti dello screen reader di trovare e navigare rapidamente verso il piè di pagina.",
        "tip": "Assicurarsi che il punto di riferimento contentinfo (role=\"contentinfo\") non sia contenuto in un altro punto di riferimento."
    },
    "EA-R114": {
        "content": "Il punto di riferimento principale non è al livello superiore",
        "explanation": "Con i <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marchi di riferimento</a>, gli utenti non vedenti che utilizzano uno screen reader hanno la possibilità di saltare alle sezioni di una pagina web. Il ruolo del landmark principale (&lt;main role=\"main\"&gt;) viene utilizzato per indicare il contenuto principale di un documento. È buona norma assicurarsi che il punto di riferimento principale non sia contenuto in un altro punto di riferimento.",
        "tip": "Assicurarsi che il punto di riferimento principale (&lt;main role=\"main\"&gt;) non sia contenuto in un altro punto di riferimento."
    },
    "EA-R115": {
        "content": "Esiste più di un punto di riferimento per i banner",
        "explanation": "Con i <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marchi di riferimento</a>, gli utenti non vedenti che utilizzano uno screen reader hanno la possibilità di saltare alle sezioni di una pagina web. La presenza di più banner di riferimento può confondere la navigazione degli screen reader, rendendo più difficile distinguere l'intestazione principale o il contenuto introduttivo.",
        "tip": "Assicuratevi che ogni pagina HTML abbia un solo banner di riferimento. Decidete quale punto di riferimento del banner volete mantenere e rimuovete tutti gli altri punti di riferimento del banner."
    },
    "EA-R116": {
        "content": "Esiste più di un punto di riferimento contentinfo",
        "explanation": "Con i <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marchi di riferimento</a>, gli utenti non vedenti che utilizzano uno screen reader hanno la possibilità di saltare alle sezioni di una pagina web. Più punti di riferimento contentinfo (role=\"contentinfo\") possono confondere gli utenti di tecnologie assistive suggerendo più regioni del piè di pagina.",
        "tip": "Assicurarsi che ogni pagina HTML abbia un solo punto di riferimento contentinfo. Decidere quale punto di riferimento contentinfo si vuole mantenere e rimuovere tutti gli altri punti di riferimento."
    },
    "EA-R117": {
        "content": "Esiste più di un punto di riferimento principale",
        "explanation": "Con i <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marchi di riferimento</a>, gli utenti non vedenti che utilizzano uno screen reader hanno la possibilità di saltare alle sezioni di una pagina web. Il ruolo di punto di riferimento principale (&lt;main role=\"main\"&gt;) viene utilizzato per indicare il contenuto principale di un documento. Più punti di riferimento principali possono rendere difficile per gli utenti identificare l'area del contenuto principale.",
        "tip": "Limitare la pagina a un solo punto di riferimento principale (&lt;main role=\"main\"&gt;) per indicare chiaramente il contenuto principale. Eliminare i punti di riferimento principali duplicati."
    },
    "EA-R118": {
        "content": "Manca il punto di riferimento principale",
        "explanation": "Con i <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marchi di terra</a>, gli utenti non vedenti che utilizzano uno screen reader hanno la possibilità di saltare alle sezioni di una pagina web. Il contenuto al di fuori di queste sezioni è difficile da trovare e il suo scopo può essere poco chiaro. Un punto di riferimento principale (&lt;main role=\"main\"&gt;) fornisce agli utenti di tecnologie assistive un modo rapido per navigare verso il contenuto principale.",
        "tip": "Aggiungete un punto di riferimento principale (<main>) al vostro sito web e includete al suo interno il contenuto principale della vostra pagina."
    },
    "EA-R119": {
        "content": "Il punto di riferimento non è unico",
        "explanation": "I punti di riferimento unici aiutano gli utenti a distinguere tra le diverse sezioni di contenuto. I punti di riferimento duplicati possono confondere gli utenti e rendere difficile la navigazione verso il contenuto desiderato. Alcuni punti di riferimento, come <header> o <footer>, possono esistere una sola volta per pagina, mentre altri, come <nav> o <section>, devono avere nomi unici e accessibili (ad esempio, da aria-label o aria-labelledby).",
        "tip": "Assicurarsi che il punto di riferimento abbia un ruolo unico o una combinazione di ruolo/etichetta/titolo. Ad esempio, cambiare l'etichetta per rendere unica la regione."
    },
    "EA-R120": {
        "content": "L'attributo Scope nella tabella non è corretto",
        "explanation": "L'attributo scope nelle tabelle aiuta gli utenti di tecnologie assistive a capire la relazione tra intestazioni e celle di dati. L'attributo scope può essere utilizzato solo nelle intestazioni delle tabelle <th> e deve avere il valore \"col\" o \"row\".",
        "tip": "Assicurarsi che l'attributo scope sia usato solo nelle intestazioni delle tabelle <th> e che il valore sia \"col\" o \"row\"."
    },
    "EA-R121": {
        "content": "Alla pagina manca un link di salto",
        "explanation": "I link di salto forniscono un collegamento all'inizio della pagina che, una volta attivato, fa saltare l'utente all'inizio dell'area del contenuto principale. Altrimenti, gli utenti con tastiera e screen reader devono navigare in un lungo elenco di link di navigazione e altri elementi prima di raggiungere il contenuto principale. Un tipico link di salto è \"salta al contenuto\", utilizzando un link con un collegamento di ancoraggio (ad esempio, #main-content). Si consiglia di nascondere il link finché l'utente non lo raggiunge con la tastiera.",
        "tip": "Aggiungere un link di salto al contenuto principale della pagina. Se esiste già un link di salto, assicurarsi che sia raggiungibile con la tastiera."
    },
    "EA-R122": {
        "content": "Assicurarsi che i valori di tabindex siano 0 o negativi",
        "explanation": "L'uso di valori di tabindex superiori a 0 può alterare l'ordine naturale delle schede, causando difficoltà di navigazione per gli utenti della tastiera e delle tecnologie assistive.",
        "tip": "Impostare i valori di tabindex a 0 o lasciarli non impostati per un ordine di tabulazione naturale. Usare valori negativi per gli elementi focalizzabili programmaticamente."
    },
    "EA-R123": {
        "content": "La tabella ha didascalia e sommario identici",
        "explanation": "La presenza dello stesso testo nell'elemento <caption> e nell'attributo summary di una tabella è ridondante e può creare confusione. L'elemento <caption> è usato come titolo sullo schermo, mentre l'attributo summary è usato dagli screen reader per accedere a un riassunto dello scopo della tabella.",
        "tip": "Assicurarsi che il testo <caption> sia diverso dall'attributo summary della tabella per evitare confusione."
    },
    "EA-R124": {
        "content": "Collegamenti identici con obiettivi diversi",
        "explanation": "I link con lo stesso nome accessibile dovrebbero avere la stessa funzionalità/obiettivo per evitare confusione. La descrizione del link permette all'utente di distinguere ogni link da quelli presenti nella pagina web che portano ad altre destinazioni e lo aiuta a decidere se seguire il link.",
        "tip": "Evitate di avere link con descrizioni identiche (ad esempio dal testo interno, dagli attributi alt o aria) che rimandano a URL diversi. Fornite un testo di collegamento che descriva lo scopo e l'obiettivo del link."
    },
    "EA-R125": {
        "content": "Si prega di verificare che la lingua del sito sia ben definita.",
        "explanation": "La lingua retrostante non si adatta a tutti gli elementi del sito. Questo è un errore, se questi elementi sono caratterizzati da un proprio attributo linguistico. Andernfalls è beispielsweise die Aussprache einer Sprachausgabe inkorrekt.",
        "tip": "Assicurarsi che tutte le altre parti del sito siano dotate di un corretto attributo di lunghezza."
    }
};