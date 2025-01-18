const ea_rules_nl = {
    "EA-R1": {
        "content": "SVG syntaxis incorrect",
        "explanation": "De syntaxis van het SVG-element is niet correct. Het mist het rol-attribuut of het title/desc-element.",
        "tip": "Controleer het rol- of title/desc-element van de SVG."
    },
    "EA-R2": {
        "content": "<svg> mist toegankelijke tekst",
        "explanation": "<svg>-elementen met de rol 'img' hebben een toegankelijke naam nodig zodat gebruikers van schermlezers de inhoud en het doel kunnen begrijpen.",
        "tip": "Maak een title attribuut, een title/desc-element of aria-attributen voor de <svg>."
    },
    "EA-R3": {
        "content": "<svg> alternatieve tekst is erg kort (<5 karakters)",
        "explanation": "De toegankelijke tekst van SVG is erg kort (<5 karakters) en beschrijft mogelijk de grafiek niet voldoende.",
        "tip": "Controleer of de toegankelijke tekst de SVG voldoende beschrijft."
    },
    "EA-R4": {
        "content": "<svg> alternatieve tekst is erg lang (>150 karakters)",
        "explanation": "De alternatieve tekst van SVG is erg lang (>150 karakters) en kan mogelijk worden samengevat. Veel blinde mensen lezen teksten met behulp van een brailleleesregel. Een brailleleesregel kan minimaal 40 karakters weergeven, maar maximaal 80 karakters.",
        "tip": "Vat de beschrijving samen tot de essentie."
    },
    "EA-R5": {
        "content": "<svg> toegankelijkheid is een beetje lang (>80 karakters)",
        "explanation": "SVG alternatieve tekst is enigszins lang (>80 karakters) en kan mogelijk worden samengevat. Veel blinde mensen lezen teksten met behulp van een brailleleesregel. Een brailleleesregel kan minimaal 40 karakters weergeven, maar maximaal 80 karakters.",
        "tip": "Vat de beschrijving samen tot de essentie."
    },
    "EA-R6": {
        "content": "Afbeelding mist alternatieve tekst",
        "explanation": "Afbeeldingen (<img> of rol='img') hebben een alternatieve tekst nodig zodat gebruikers van schermlezers de inhoud en het doel van de afbeelding kunnen begrijpen. Het title-attribuut wordt niet altijd betrouwbaar herkend.",
        "tip": "Voeg zinvolle alternatieve tekst toe met behulp van de alt-, aria-label- of aria-labelledby-attributen. Een leeg alt-attribuut kan worden gebruikt voor decoratieve afbeeldingen.",
        "demoSelector": "img"
    },
    "EA-R7": {
        "content": "Overbodige alt-tekst als de omsluitende link",
        "explanation": "De afbeelding heeft dezelfde alternatieve tekst als de omsluitende link. Het herhalen van alternatieve tekst voor een link of afbeelding in aangrenzende tekst is onnodig en kan schermlezergebruikers verwarren door het tweemaal te lezen.",
        "tip": "Verwijder de alt-tekst van de afbeelding aangezien deze geen aanvullende informatie bevat. Gebruik in plaats daarvan een leeg alt-attribuut, alt=''.",
        "demoSelector": "img"
    },
    "EA-R8": {
        "content": "Ontbrekende alternatieve tekst in gelinkte afbeelding",
        "explanation": "Aangezien de link zelf geen tekst bevat, moet de afbeelding een alternatieve tekst hebben zodat schermlezers de inhoud en het doel van de link kunnen identificeren. Een title-attribuut is niet voldoende voor alle schermlezers.",
        "tip": "Voeg een zinvolle alternatieve tekst toe voor de link of de gelinkte afbeelding.",
        "demoSelector": "img"
    },
    "EA-R9": {
        "content": "Afbeelding alternatieve tekst is erg kort (<5 karakters)",
        "explanation": "De alternatieve tekst van een afbeelding moet de inhoud op een zinvolle manier beschrijven.",
        "tip": "Controleer of de alternatieve tekst de afbeelding voldoende beschrijft.",
        "demoSelector": "img"
    },
    "EA-R10": {
        "content": "Afbeelding alternatieve tekst is erg lang (>150 karakters)",
        "explanation": "De alternatieve tekst van deze afbeelding is erg lang (>150 karakters) en kan mogelijk worden samengevat. Veel blinde mensen lezen teksten met behulp van een brailleleesregel. Een brailleleesregel kan minimaal 40 karakters weergeven, maar maximaal 80 karakters.",
        "tip": "Vat de beschrijving samen tot de essentie.",
        "demoSelector": "img"
    },
    "EA-R11": {
        "content": "Afbeelding alternatieve tekst is een beetje lang (>80 karakters)",
        "explanation": "De alternatieve tekst is een beetje lang (>80 karakters) en kan mogelijk worden samengevat. Veel blinde mensen lezen teksten met behulp van een brailleleesregel. Een brailleleesregel kan minimaal 40 karakters weergeven, maar maximaal 80 karakters.",
        "tip": "Vat de beschrijving samen tot de essentie.",
        "demoSelector": "img"
    },
    "EA-R12": {
        "content": "Links moeten toegankelijke tekst hebben",
        "explanation": "Links vereisen een linktekst die begrijpelijk is en correct wordt uitgevoerd door schermlezers. Een linktekst moet duidelijk uitleggen welke informatie de lezer krijgt door op die link te klikken.",
        "tip": "Voeg een zinvolle linktekst toe door gebruik te maken van een interne tekst of ARIA-attributen die het doel en de bestemming van de link beschrijven. De linktekst mag ook niet verborgen zijn voor schermlezers (bijv. met display: none of aria-hidden='true').",
        "demoSelector": "a"
    },
    "EA-R13": {
        "content": "Lege link",
        "explanation": "Deze link heeft geen inhoud en geen doel (href-attribuut).",
        "tip": "Verwijder lege links.",
        "demoSelector": "a"
    },
    "EA-R14": {
        "content": "Toegankelijke linktekst is een URL",
        "explanation": "Linkteksten moeten zinvol zijn en het doel en de bestemming van de link beschrijven. Gebruikers van schermlezers moeten gemakkelijk kunnen beslissen of ze een link willen volgen.",
        "tip": "Zorg ervoor dat u beschrijvingen gebruikt die het doel en de bestemming van de link beschrijven. De linktekst mag ook niet verborgen zijn voor schermlezers (bijv. met display: none of aria-hidden='true').",
        "demoSelector": "a"
    },
    "EA-R15": {
        "content": "Linktekst is erg lang (>150 karakters)",
        "explanation": "De toegankelijke tekst van deze link is erg lang (>150 karakters) en kan mogelijk worden samengevat. Veel blinde mensen lezen teksten met behulp van een brailleleesregel. Een brailleleesregel kan minimaal 40 karakters weergeven, maar maximaal 80 karakters.",
        "tip": "Zorg ervoor dat u betekenisvolle en compacte teksten gebruikt.",
        "demoSelector": "a"
    },
    "EA-R16": {
        "content": "<object> mist toegankelijke naam",
        "explanation": "<object>-elementen kunnen multimedia-inhoud (audio, video, enz.) bevatten en moeten een toegankelijke naam hebben voor schermlezers. Gebruikers van schermlezers kunnen de inhoud van het object niet kennen zonder een tekstalternatief.",
        "tip": "Voeg een toegankelijke naam toe aan het <object> met behulp van een title of aria-attributen zoals aria-label en aria-labelledby.",
        "demoSelector": "object,audio,video,h,a"
    },
    "EA-R17": {
        "content": "Audio gedetecteerd",
        "explanation": "Controleer of er informatie wordt overgebracht in de audio (bijv. via een commentaarstem). Zo ja, dan is een transcriptie vereist.",
        "tip": "Controleer of een transcriptie vereist is voor het audiobestand. Zo ja, bied dan een alternatief, bijvoorbeeld via een teksttranscriptie."
    },
    "EA-R18": {
        "content": "Video gedetecteerd",
        "explanation": "Controleer of de video een media-alternatief of ondertiteling nodig heeft. Als een video niet is ondertiteld, hebben dove gebruikers beperkte of geen toegang tot de informatie die deze bevat. Evenzo zijn stille videobestanden (zonder stem) niet beschikbaar voor blinde gebruikers. Ze hebben ook een volledig media-alternatief nodig (tekst, alternatieve audiotrack of audiobestand).",
        "tip": "Controleer of een media-alternatief of ondertiteling nodig is bij de video en bied deze indien nodig aan."
    },
    "EA-R19": {
        "content": "Meerdere H1-koppen gedetecteerd",
        "explanation": "De kopstructuur van de pagina moet logisch zijn opgebouwd en, indien mogelijk, beginnen met de H1-kop. De H1-kop identificeert de belangrijkste delen van de pagina.",
        "tip": "Gebruik indien mogelijk slechts één H1-kop. Structureer verdere koppen met H2, H3, enz.",
        "demoSelector": "H1,H2,H3,H4,H5"
    },
    "EA-R20": {
        "content": "Ontbrekende H1-kop",
        "explanation": "Er is ofwel geen H1-kop, of het is verborgen voor schermlezers. Controleer of de H1-kop bestaat en zichtbaar is, aangezien deze dient als het eerste en belangrijkste element van de kopstructuur (h1-h6). Het <h1>-element moet aan het begin van de hoofdinhoud staan, waardoor gebruikers van schermlezers direct naar de hoofdinhoud kunnen navigeren met behulp van toetsenbordsneltoetsen.",
        "tip": "Creëer indien mogelijk altijd een zichtbare <h1>-kop die de inhoud van de pagina beschrijft.",
        "demoSelector": "H1,H2,H3,H4,H5"
    },
    "EA-R21": {
        "content": "Sprong in de kopvolgorde",
        "explanation": "De kopstructuur van de pagina moet logisch georganiseerd zijn en kopniveaus mogen slechts met één toenemen. Vermijd sprongen, bijvoorbeeld van H2 naar H4.",
        "tip": "Probeer niet te springen in de kopvolgorde.",
        "demoSelector": "H1,H2,H3,H4,H5"
    },
    "EA-R22": {
        "content": "Een lijstitem <li> maakt geen deel uit van een lijst",
        "explanation": "Een geldige lijst moet altijd worden omkaderd door een <ul>- of <ol>-element. Anders worden de lijstelementen niet correct als een lijst gedetecteerd door de schermlezer. Let op mogelijke rollen van de <ul>- of <ol>-ouder elementen door het rol-attribuut.",
        "tip": "Bouw een correcte lijst met een <ul>- of <ol>-ouder element. Als u al een <ul>- of <ol>-element heeft ingesteld, let dan op mogelijke rollen door het rol-attribuut."
    },
    "EA-R23": {
        "content": "Onvoldoende tekstcontrast",
        "explanation": "Zorg ervoor dat alle tekstelementen voldoende kleurcontrast hebben tussen de tekst op de voorgrond en de achtergrondkleur erachter. Het minimale contrast is afhankelijk van de tekstgrootte en is 3:1 of 4,5:1 voor grotere tekst (>18pt).",
        "tip": "Verhoog het contrast, bijvoorbeeld met een donkerder/lichter lettertype of achtergrondkleur."
    },
    "EA-R24": {
        "content": "Onvoldoende SVG-contrast",
        "explanation": "De visuele representatie van SVG's moet een minimaal contrastverhouding van 3:1 behouden om goed waargenomen te worden.",
        "tip": "Verhoog het contrast van de SVG."
    },
    "EA-R25": {
        "content": "Contrast handmatig controleren",
        "explanation": "Er is een zeer laag contrast gedetecteerd. Soms duidt dit op het gebruik van achtergrondafbeeldingen of verlopen. Controleer het contrast handmatig.",
        "tip": "Verhoog het contrast, bijvoorbeeld met een donkerder/lichter lettertype of achtergrondkleur. Zorg ervoor dat tekst over achtergrondafbeeldingen een voldoende contrast van 4,5:1 voor kleinere tekst en 3:1 voor grotere tekst heeft."
    },
    "EA-R26": {
        "content": "Pagina heeft geen titel",
        "explanation": "De titel van de pagina is belangrijk om het onderwerp of doel van de pagina te beschrijven. Het stelt bezoekers van uw website in staat om uw inhoud snel te classificeren of te vinden.",
        "tip": "Voeg een beschrijvend <title>-element toe aan de pagina.",
        "demoSelector": "title"
    },
    "EA-R27": {
        "content": "Paginatitel is erg kort",
        "explanation": "De titel van de pagina is belangrijk om het onderwerp of doel van de pagina te beschrijven. Het stelt bezoekers van uw website in staat om uw inhoud snel te classificeren of te vinden.",
        "tip": "Controleer of de titel de pagina voldoende beschrijft.",
        "demoSelector": "title"
    },
    "EA-R28": {
        "content": "<iframe> heeft geen toegankelijke naam",
        "explanation": "De toegankelijke naam van een <iframe> is belangrijk om het onderwerp of doel ervan te beschrijven. Gebruikers van schermlezers kunnen een lijst van titels voor alle frames op een pagina openen. Het navigeren door <frame>- en <iframe>-elementen kan echter moeilijk en verwarrend worden als de opmaak een titelattribuut mist, vooral voor gebruikers met een handicap.",
        "tip": "Voeg een beschrijvend titelattribuut toe aan de <iframe>. Als alternatief kunt u aria-attributen zoals aria-label of aria-labelledby toevoegen.",
        "demoSelector": "iframe, title"
    },
    "EA-R29": {
        "content": "Website taal ontbreekt",
        "explanation": "Voor een correcte spraakuitvoer van schermlezers of de browser moet de taal van de pagina worden gespecificeerd. Schermlezers gebruiken verschillende geluidsbibliotheken voor verschillende talen, gebaseerd op de uitspraak en kenmerken van die taal. Het is belangrijk om een taal te specificeren en ervoor te zorgen dat deze geldig is, zodat de tekst van de website correct wordt uitgesproken.",
        "tip": "Voeg het lang-attribuut toe aan het HTML-element van uw pagina.",
        "demoSelector": "html"
    },
    "EA-R30": {
        "content": "Onjuiste paginataal",
        "explanation": "Voor een correcte spraakuitvoer van schermlezers of de browser moet de taal van de pagina correct worden gespecificeerd. Anders is bijvoorbeeld de uitspraak van een spraakuitvoer incorrect.",
        "tip": "Controleer of de taal in het HTML-element gelijk is aan de daadwerkelijke paginataal.",
        "demoSelector": "html"
    },
    "EA-R31": {
        "content": "Afkorting gedetecteerd",
        "explanation": "Afkortingen zijn niet altijd begrijpelijk voor iedereen en moeten worden uitgelegd in de tekst of via HTML-elementen zoals <abbr>.",
        "tip": "Controleer of de afkorting al is gelabeld. Zo niet, voeg dan de volledige tekst toe of gebruik speciale HTML-elementen zoals <abbr>."
    },
    "EA-R32": {
        "content": "ID-attribuutwaarde moet uniek zijn",
        "explanation": "Een ID is een unieke identificatie voor elementen van de webpagina en mag dienovereenkomstig niet worden gedupliceerd. Het hebben van dubbele ID's kan ertoe leiden dat elementen worden overgeslagen door schermlezers. Vanaf 2023 is dit geen WCAG-vereiste meer, tenzij het leidt tot een fout in een ander WCAG-criterium.",
        "tip": "Hernoem de ID zodat deze slechts één keer op de pagina wordt gebruikt."
    },
    "EA-R33": {
        "content": "Afbeeldingsknop mist toegankelijke naam",
        "explanation": "Een grafische invoer (<input type=\"image\">) vereist alternatieve tekst zodat schermlezers het doel ervan kunnen weerspiegelen.",
        "tip": "Voeg een zinvolle alt of ARIA-attribuut (aria-label of aria-labelledby) toe dat de inhoud en het doel van deze afbeelding beschrijft."
    },
    "EA-R34": {
        "content": "Resetknop wordt niet aanbevolen",
        "explanation": "Het gebruik van resetknoppen wordt niet aanbevolen, aangezien deze gemakkelijk per ongeluk kunnen worden geklikt.",
        "tip": "Verwijder indien mogelijk de resetknop."
    },
    "EA-R35": {
        "content": "Formulierveld mist toegankelijke naam",
        "explanation": "Een formulierveld heeft een toegankelijke naam nodig zodat schermlezers het doel ervan kunnen weerspiegelen. Dit omvat <input>- en <select>-elementen of elementen met een rol van \"checkbox\", \"listbox\", \"searchbox\", \"spinbutton\" of \"textbox\" onder andere rollen.",
        "tip": "Maak een geschikt <label> voor <input>- of <select>-elementen. U kunt ook aria-attributen zoals aria-label gebruiken voor elementen met een rol. Het label moet het doel van dit formulierveld beschrijven. Bij het gebruik van een <label> gebruikt u een for-attribuut dat overeenkomt met de unieke id van de invoer."
    },
    "EA-R36": {
        "content": "<button> mist toegankelijke naam",
        "explanation": "Een <button> of een <input> met type=\"button\" heeft een toegankelijke naam nodig zodat schermlezers het doel ervan kunnen weerspiegelen.",
        "tip": "Voeg een tekst in de inhoud van het knopelement of gebruik aria-attributen zoals aria-label of aria-labelledby om het doel te beschrijven."
    },
    "EA-R38": {
        "content": "<area> mist alternatieve tekst",
        "explanation": "Area-elementen identificeren gebieden binnen een afbeeldingskaart die kunnen worden gebruikt om klikbare gebieden te definiëren. Deze hebben daarom een toegankelijke naam nodig zodat schermlezers hun doel kunnen weerspiegelen.",
        "tip": "Voeg een alternatieve tekst toe aan het area-element, bijvoorbeeld via het alt-attribuut of aira-labels."
    },
    "EA-R39": {
        "content": "Body is aria-hidden",
        "explanation": "Het body-element bevat het attribuut aria-hidden: \"true\" en de pagina is daardoor niet toegankelijk voor schermlezers.",
        "tip": "Verwijder het aria-hidden-attribuut van het body-element."
    },
    "EA-R40": {
        "content": "<select> mist toegankelijke naam",
        "explanation": "<select>-elementen moeten een toegankelijke naam hebben zodat gebruikers van schermlezers hun doel kunnen identificeren.",
        "tip": "Beschrijf het doel van de selectielijst met een <label>-element of aria-attributen.",
        "deactivate": true
    },
    "EA-R41": {
        "content": "Dubbele accesskey-attribuut",
        "explanation": "Het accesskey-attribuut kan worden gebruikt om een karakter op het toetsenbord aan te geven dat de gebruiker kan indrukken om direct naar elementen te springen. Hier is een dubbele toewijzing niet toegestaan en leidt tot onverwacht gedrag.",
        "tip": "Wijzig het accesskey-attribuut zodat het uniek is voor de pagina."
    },
    "EA-R42": {
        "content": "Leeg <th>-element",
        "explanation": "Het tabelhoofd <th>-element in een tabel beschrijft de betekenis van de respectievelijke kolom. Zonder zichtbare tekst is het doel van de rij of kolom onduidelijk voor zowel ziende als schermlezergebruikers.",
        "tip": "Voeg een zichtbare tekstinhoud in die de gegevens in deze kolom beschrijft."
    },
    "EA-R43": {
        "content": "Koppen mogen niet leeg zijn",
        "explanation": "Deze kop bevat geen tekst maar kan worden bereikt door schermlezers.",
        "tip": "Voeg een tekst toe aan de kop of verwijder deze."
    },
    "EA-R44": {
        "content": "Kop mist toegankelijke naam",
        "explanation": "Deze regel controleert of elke kop een niet-lege toegankelijke naam heeft en zichtbaar is voor schermlezers. Schermlezers melden gebruikers de aanwezigheid van een kop-tag. Als de kop leeg is of de tekst ontoegankelijk is, kan dit gebruikers in verwarring brengen of zelfs verhinderen dat ze toegang krijgen tot informatie over de structuur van de pagina.",
        "tip": "Controleer of de kop enige inhoud heeft. De inhoud kan ook verborgen zijn met behulp van aria-hidden=\"true\" of display=\"none\"."
    },
    "EA-R45": {
        "content": "Paragraaf heeft onvoldoende regelhoogte",
        "explanation": "De regelhoogte van de paragraaf (<p>) is minder dan 1,5. Dit kan de leesbaarheid van de tekst beïnvloeden.",
        "tip": "Verhoog de regelhoogte van de paragraaf tot ten minste 1,5"
    },
    "EA-R46": {
        "content": "!important letterafstand in stijlattribuut",
        "explanation": "Deze regel controleert of het stijlattribuut niet wordt gebruikt om het aanpassen van de letterafstand te voorkomen door !important te gebruiken, behalve als het minstens 0,12 keer de lettergrootte is. Het gebruik van !important in de stijlattributen voorkomt dat deze stijl wordt overschreven.",
        "tip": "Gebruik indien mogelijk geen !important in het stijlattribuut of zorg ervoor dat de letterafstand minstens 0,12 keer de lettergrootte is."
    },
    "EA-R47": {
        "content": "!important woordafstand in stijlattribuut",
        "explanation": "Deze regel controleert of het stijlattribuut niet wordt gebruikt om het aanpassen van de woordafstand te voorkomen door !important te gebruiken, behalve als het minstens 0,16 keer de lettergrootte is. Het gebruik van !important in de stijlattributen voorkomt dat deze stijl wordt overschreven.",
        "tip": "Gebruik indien mogelijk geen !important in het stijlattribuut of zorg ervoor dat de woordafstand minstens 0,16 keer de lettergrootte is."
    },
    "EA-R48": {
        "content": "!important regelhoogte in stijlattribuut",
        "explanation": "Deze regel controleert of het stijlattribuut niet wordt gebruikt om het aanpassen van de regelhoogte te voorkomen door !important te gebruiken, behalve als het minstens 1,5 keer de lettergrootte is. Het gebruik van !important in de stijlattributen voorkomt dat deze stijl wordt overschreven.",
        "tip": "Gebruik indien mogelijk geen !important in het stijlattribuut of zorg ervoor dat de regelhoogte minstens 1,5 keer de lettergrootte is."
    },
    "EA-R49": {
        "content": "<audio> of <video> element speelt automatisch audio af",
        "explanation": "Audio of video die automatisch afspeelt, mag geen audio hebben die langer dan 3 seconden duurt of een audiobedieningsmechanisme nodig heeft om het te stoppen of te dempen.",
        "tip": "Speel geen audio automatisch af of zorg ervoor dat er een bedieningsmechanisme is om het te stoppen of te dempen."
    },
    "EA-R50": {
        "content": "Ongeldig lang-attribuut gedetecteerd",
        "explanation": "Het lang-attribuut in het <html>-element moet een geldige taalcode zijn en voldoen aan de BCP 47-norm, bijv. \"de\" of \"en-us\".",
        "tip": "Zorg ervoor dat een geldige taalcode is ingesteld als het lang-attribuut van het <html>-element."
    },
    "EA-R51": {
        "content": "Lang en xml:lang attributen komen niet overeen",
        "explanation": "De lang- en xml:lang-attributen op het <html>-element van een niet-ingekapselde HTML-pagina moeten dezelfde primaire taalsubtag hebben.",
        "tip": "Zorg ervoor dat de lang- en xml:lang-attributen op het <html>-element overeenkomen."
    },
    "EA-R52": {
        "content": "<Iframe>-elementen met identieke toegankelijke namen",
        "explanation": "<iframe>-elementen met identieke toegankelijke namen moeten worden vermeden of moeten ten minste dezelfde bron of gelijkwaardige bronnen insluiten. Het gebruik van dezelfde toegankelijke naam kan misleidend zijn voor gebruikers van schermlezers.",
        "tip": "Gebruik unieke titelattributen voor elk frame of zorg ervoor dat <iframe>-elementen met identieke toegankelijke namen naar dezelfde bron leiden."
    },
    "EA-R53": {
        "content": "<iframe> heeft negatieve tabindex",
        "explanation": "<iframe>-elementen met een negatief tabindex-attribuut mogen geen interactieve elementen bevatten. Door de tabindex-attribuutwaarde van een <iframe>-element in te stellen op -1 of een ander negatief getal, wordt het onmogelijk om de focus naar de browsecontext van het <iframe>-element te verplaatsen.",
        "tip": "Verwijder de negatieve tabindex als het <iframe> focusseerbare elementen bevat."
    },
    "EA-R54": {
        "content": "Meta viewport voorkomt zoomen",
        "explanation": "Het gebruik van <meta name=\"viewport\">-elementen kan de mogelijkheid van de gebruiker om in te zoomen beperken, vooral op mobiele apparaten. Inzoomen is een veelvoorkomend en verwacht 'toegestaan' gedrag op mobiele webpagina's, dus het uitschakelen ervan gaat ten koste van de mobiele gebruikerservaring, vooral voor gebruikers met gedeeltelijk zicht en slechtzienden.",
        "tip": "Verwijder de user-scalable- en maximum-scale-attributen. Zorg er anders voor dat het content-attribuut user-scalable niet instelt op \"nee\" en dat de maximum-scale-eigenschap ten minste 2 is."
    },
    "EA-R55": {
        "content": "Geen gegevenscellen toegewezen aan tabelkop",
        "explanation": "Deze regel controleert of elke tabelkop <th> toegewezen cellen <td> heeft in een tabel-element. Als tabellen niet correct zijn gemarkeerd, kan dit leiden tot verwarrende of onnauwkeurige schermlezeruitvoer.",
        "tip": "Verwijder tabelkopcellen die geen toegewezen cellen hebben of wijs cellen toe aan de kop."
    },
    "EA-R56": {
        "content": "Ongedefinieerd ARIA-attribuut",
        "explanation": "Deze regel controleert of elk gespecificeerd aria-* attribuut is gedefinieerd in <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA 1.1</a>. Ongeldige of verkeerd gespelde aria-attributen worden niet herkend door schermlezers.",
        "tip": "Controleer of het aria-attribuut niet verkeerd gespeld is en gespecificeerd in de <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA-specificaties</a>. Zorg ervoor dat u alleen geldige aria-attributen gebruikt."
    },
    "EA-R57": {
        "content": "Niet-ondersteunde ARIA-status of -eigenschap",
        "explanation": "Deze regel controleert dat <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria/\">WAI-ARIA</a>-statussen of -eigenschappen zijn toegestaan voor het element waarop ze zijn gespecificeerd. De ARIA-statussen of -eigenschappen moeten volgens de officiële specificatie zijn of ze kunnen worden genegeerd of onjuist geïnterpreteerd door ondersteunende technologieën.",
        "tip": "Verwijder niet-gespecificeerde WAI-ARIA-statussen of -eigenschappen of corrigeer ze naar een toegestane waarde."
    },
    "EA-R58": {
        "content": "Ongeldige ARIA-status- of -eigenschapwaarde",
        "explanation": "Deze regel controleert dat de waarde van <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA-statussen of -eigenschappen</a> zijn toegestaan voor het element waarop ze zijn gespecificeerd. De ARIA-statussen of -eigenschappen moeten volgens de officiële specificatie zijn of ze zijn niet toegankelijk voor gebruikers van ondersteunende technologie.",
        "tip": "Verwijder niet-gespecificeerde ARIA-waarden van statussen of eigenschappen of corrigeer ze naar de juiste waarde."
    },
    "EA-R59": {
        "content": "Autocomplete-attribuut is ongeldig",
        "explanation": "Deze regel is van toepassing op elk HTML <input>, <select> en <textarea>-element met een autocomplete-attribuutwaarde. Het autocomplete-attribuut heeft een correcte waarde nodig om door de browser en schermlezers te worden herkend.",
        "tip": "Zorg ervoor dat <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete\">de autocomplete-waarde</a> wordt ondersteund."
    },
    "EA-R60": {
        "content": "Geen koptekstcel toegewezen aan gegevenscellen",
        "explanation": "Deze regel controleert of elke tabelkop <th> toegewezen cellen <td> heeft in een tabel-element.",
        "tip": "Wijs indien mogelijk een koptekstcel <th> toe aan elke gegevenscel <td>."
    },
    "EA-R61": {
        "content": "Pagina heeft geen kop",
        "explanation": "Het document bevat geen kop-elementen. Koppen voegen structuur toe aan een website en helpen gebruikers van schermlezers om te navigeren en de inhoud ervan te begrijpen.",
        "tip": "Controleer of koppen kunnen worden toegevoegd om structuur toe te voegen aan de website. Zorg ervoor dat alle koppen correct zijn gemarkeerd met behulp van de tags <h1>-<h6> of met role=\"heading\"."
    },
    "EA-R62": {
        "content": "Presentatie-element heeft focusseerbare nakomelingen",
        "explanation": "Deze regel controleert of elementen met een rol die hun kinderen presentatieel maakt geen focusseerbare elementen bevatten, bijv. een link, knop of invoer. Dergelijke elementen zijn bijvoorbeeld <button>, checkbox of <img>. Kinderen van deze elementen worden niet correct gedetecteerd door ondersteunende technologieën en creëren een lege tabstop.",
        "tip": "Voeg geen focusseerbare elementen toe als kinderen van elementen met een rol die hun kinderen presentatieel maakt, bijv. een <button> of role=\"checkbox\"."
    },
    "EA-R63": {
        "content": "Decoratief element wordt blootgesteld aan ondersteunende technologieën",
        "explanation": "Deze regel controleert of elementen die als decoratief zijn gemarkeerd, niet zijn opgenomen in de toegankelijkheidsboom of een presentatierol hebben. Een element als decoratief markeren verbergt het voor ondersteunende technologieën, maar het focusseerbaar maken stelt het bloot. Ook kunnen sommige elementen zoals <nav> geen decoratieve rol hebben als ze een toegankelijke naam bezitten, bijv. door een aria-label. Dit conflict moet worden vermeden.",
        "tip": "Controleer of het element als decoratief moet worden gemarkeerd of verberg het voor ondersteunende technologieën, bijv. met aria-hidden=\"true\" of role=\"presentation\". Verwijder in dit geval ook alle aria-labelattributen."
    },
    "EA-R64": {
        "content": "Container mist vereiste kinderen",
        "explanation": "Sommige elementen met een expliciete semantische rol moeten ten minste één van de vereiste eigen elementen hebben. Bijvoorbeeld, een element met de rol \"lijst\" moet elementen met de rol \"lijstitem\" bezitten. Het niet voldoen aan deze vereiste kan het element zelf ongeldig maken.",
        "tip": "Controleer of de elementrol correct is gebruikt of zorg ervoor dat de vereiste kindknooppunten zijn opgenomen."
    },
    "EA-R65": {
        "content": "Element mist vereiste ouder",
        "explanation": "Sommige elementen met een expliciete semantische rol moeten een specifiek ouder-element hebben. Bijvoorbeeld, een element met de rol \"listitem\" heeft een ouderknooppunt nodig met de rol \"list\". Het niet voldoen aan deze vereiste maakt het element zelf ongeldig.",
        "tip": "Controleer of de elementrol correct is gebruikt of zorg ervoor dat het vereiste ouderknooppunt en rol worden gebruikt."
    },
    "EA-R66": {
        "content": "Aria-hidden-element heeft focusseerbare inhoud",
        "explanation": "Door aria-hidden=\"true\" toe te voegen aan een element, worden het element zelf en al zijn nakomelingen verborgen voor ondersteunende technologieën. Het blootstellen ervan aan de sequentiële focusnavigatie kan verwarring veroorzaken voor gebruikers van ondersteunende technologieën omdat het element kan worden bereikt, maar het zou verborgen moeten zijn.",
        "tip": "Controleer of het element verborgen moet worden voor ondersteunende technologie en verwijder het zo nodig uit de sequentiële focusnavigatie. Voeg het attribuut tabindex=\"-1\", de stijl \"disabled:none\" of het attribuut disabled toe om de tabnavigatie te verwijderen."
    },
    "EA-R67": {
        "content": "Lettergrootte is erg klein",
        "explanation": "Deze regel controleert of lettergroottes groter zijn dan 9 pixels. Kleine lettergroottes zijn niet gemakkelijk te lezen en moeten indien mogelijk worden vermeden.",
        "tip": "Controleer of de lettergrootte kan worden verhoogd tot ten minste 10px. Over het algemeen wordt een lettergrootte van 16px of groter aanbevolen voor reguliere tekst."
    },
    "EA-R68": {
        "content": "Groep mist toegankelijke naam",
        "explanation": "Het groeperen van gerelateerde formulierelementen maakt formulieren begrijpelijker voor alle gebruikers, aangezien gerelateerde besturingselementen gemakkelijker te identificeren zijn. Opdat ondersteunende technologieën het doel van een groep correct kunnen identificeren, heeft deze een toegankelijke naam nodig, bijv. met een <legend> voor een <fieldset> of aria-attributen voor elementen met role=\"group\" of \"menubar\".",
        "tip": "Zorg ervoor dat elke groep een toegankelijke naam heeft met behulp van aria-attributen zoals aria-label of een <legend> voor een <fieldset>."
    },
    "EA-R69": {
        "content": "Headers-attribuut van cel verwijst naar ontbrekende cel",
        "explanation": "Het <a target=\"_blank\" href=\"https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/H43\">headers-attribuut</a> geeft een of meer koptekstcellen aan waarmee een tabelcel is gerelateerd. Het wordt alleen gebruikt door schermlezers. Deze regel controleert of het headers-attribuut op een cel verwijst naar een overeenkomstige cel in hetzelfde tabel-element. Als tabellen niet correct zijn gemarkeerd, kan dit leiden tot verwarrende of onnauwkeurige schermlezeruitvoer.",
        "tip": "Controleer of er een andere cel is die de id van de headers-attribuutwaarde in dezelfde tabel heeft. Verwijder anders het headers-attribuut of maak een overeenkomstige cel met deze id."
    },
    "EA-R70": {
        "content": "Element gemarkeerd als decoratief wordt blootgesteld",
        "explanation": "Deze regel controleert of elementen die als decoratief zijn gemarkeerd, niet zijn opgenomen in de toegankelijkheidsboom of een presentatierol hebben. Een element als decoratief markeren verbergt het voor ondersteunende technologieën, maar het focusseerbaar maken of toevoegen van ARIA-attributen kan het blootstellen. Dit conflict moet worden vermeden.",
        "tip": "Controleer of het element als decoratief moet worden gemarkeerd of verberg het voor ondersteunende technologieën, bijv. met aria-hidden=\"true\" of role=\"presentation\"."
    },
    "EA-R71": {
        "content": "Element met ongeldig lang-attribuut gedetecteerd",
        "explanation": "Delen van een website kunnen worden gemarkeerd als in een andere taal dan de rest van de website met behulp van het lang-attribuut. Het lang-attribuut van deze elementen moet ook een geldige taalcode zijn en voldoen aan de BCP 47-norm, bijv. \"de\" of \"en-us\".",
        "tip": "Zorg ervoor dat een geldige taalcode is ingesteld als het lang-attribuut van het element."
    },
    "EA-R72": {
        "content": "Link niet te onderscheiden van omringende tekst",
        "explanation": "Deze regel controleert of inline links te onderscheiden zijn van de omringende tekst door een verschil dat niet alleen op kleur is gebaseerd. Links kunnen worden gemarkeerd door bijvoorbeeld de tekst te onderstrepen of een rand te gebruiken. Hover- en focusstaten worden ook gecontroleerd.",
        "tip": "Zorg ervoor dat de link te onderscheiden is van de omringende tekst, niet alleen door kleur. Controleer dit ook bij het zweven of focussen op de link."
    },
    "EA-R73": {
        "content": "Menu-item mist toegankelijke naam",
        "explanation": "Deze regel controleert of elk element met een menu-itemrol een niet-lege toegankelijke naam heeft. De menu-itemrol geeft aan dat het element een optie is in een reeks keuzes die wordt bevat door een menu of menubalk.",
        "tip": "Voeg een toegankelijke naam toe met behulp van de inhoud van het element of door gebruik te maken van aria-attributen."
    },
    "EA-R74": {
        "content": "Oriëntatie van de pagina is beperkt",
        "explanation": "Deze regel controleert of de pagina-inhoud niet is beperkt tot een bepaalde landschaps- of portretoriëntatie met behulp van de CSS transform-eigenschap. Elementen die zijn vastgezet aan een bepaalde rotatie, met behulp van de oriëntatiemediakenmerk met een waarde van landschap of portret, kunnen mogelijk niet roteren op mobiele apparaten.",
        "tip": "Zorg ervoor dat alle elementen op de website correct roteren bij het wisselen van portret naar landschapsmodus."
    },
    "EA-R75": {
        "content": "Paragraaf is volledig cursief",
        "explanation": "Hoewel het gebruik van cursieve tekst om belangrijke inhoud te benadrukken goed is, vermijd het gebruik van cursieve tekst op langere paragrafen tekst. Vooral voor mensen met dyslexie kan cursieve tekst moeilijker te lezen zijn.",
        "tip": "Vermijd grotere stukken cursieve tekst en gebruik het alleen om belangrijke inhoud te benadrukken."
    },
    "EA-R76": {
        "content": "Paragraaf is volledig in hoofdletters",
        "explanation": "Hoewel het gebruik van hoofdlettertekst om belangrijke inhoud te benadrukken goed kan zijn, vermijd het gebruik van hoofdlettertekst op langere paragrafen tekst. Vooral voor mensen met dyslexie kan hoofdlettertekst moeilijker te lezen zijn. Schermlezers kunnen ook elke letter afzonderlijk uitspreken.",
        "tip": "Vermijd grotere stukken tekst in hoofdletters en gebruik het alleen om belangrijke inhoud te benadrukken."
    },
    "EA-R77": {
        "content": "Paragrafen tekst is uitgelijnd",
        "explanation": "Mensen met bepaalde cognitieve beperkingen hebben problemen met het lezen van tekst die zowel links als rechts is uitgelijnd. De ongelijke woordafstand in volledig uitgelijnde tekst kan het lezen moeilijk maken en in sommige gevallen onmogelijk.",
        "tip": "Vermijd het gebruik van een uitgelijnde tekstuitlijning in langere paragrafen tekst."
    },
    "EA-R78": {
        "content": "Inhoud is niet opgenomen in een landmark-regio",
        "explanation": "<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html\">Landmarks</a> identificeren programmatisch secties van een pagina. Het is een best practice om alle inhoud op de pagina in landmarks op te nemen, zodat gebruikers van schermlezers die op hen vertrouwen om van sectie naar sectie te navigeren, geen inhoud verliezen. Voorbeelden van regio's zijn header, nav, footer of main. Native HTML5-landmarks zoals &lt;nav&gt; worden aanbevolen boven het gebruik van ARIA-rollen zoals role=\"nav\".",
        "tip": "Voeg alle tekstelementen toe aan bestaande landmarks of maak nieuwe. U kunt hier een overzicht van <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/HTML5.html\">HTML-landmarks vinden</a>."
    },
    "EA-R79": {
        "content": "<meta>-element heeft vertraging bij vernieuwen",
        "explanation": "Deze regel controleert of het <meta>-element niet wordt gebruikt voor vertraagd omleiden of vernieuwen. Omdat gebruikers niet verwachten dat een pagina automatisch wordt vernieuwd, kan een dergelijke vernieuwing desoriënterend zijn. Als een vernieuwing of omleiding wordt gebruikt, moet de content-attribuutwaarde van het <meta>-element 0 zijn of groter dan 72000 (20 uur).",
        "tip": "Gebruik geen vertraagde vernieuwingen of omleidingen of bied een functionaliteit voor de gebruiker om de timer aan te passen."
    },
    "EA-R80": {
        "content": "<meta>-element heeft vertraging bij vernieuwen (AAA)",
        "explanation": "Deze regel controleert of het <meta>-element niet wordt gebruikt voor vertraagd omleiden of vernieuwen. Als een vernieuwing of omleiding wordt gebruikt, moet de waarde van het <meta>-element content-attribuut 0 zijn zonder uitzondering.",
        "tip": "Gebruik geen vertraagde vernieuwingen of omleidingen en stel de vertraging in op 0."
    },
    "EA-R81": {
        "content": "Regio mist toegankelijke naam",
        "explanation": "De rol van regio wordt gebruikt om documentgebieden te identificeren die de auteur als significant beschouwt. Elke regio heeft een toegankelijke naam nodig, zodat gebruikers van schermlezers de inhoud en het doel ervan kunnen identificeren.",
        "tip": "Voeg een toegankelijke naam toe aan de regio met behulp van aria-attributen."
    },
    "EA-R82": {
        "content": "Element heeft ongeldige rol",
        "explanation": "Deze regel controleert of elke rolattribuut een geldige waarde heeft volgens de <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles\">WAI-ARIA-specificaties</a>. Verouderde rollen worden ook gecontroleerd.",
        "tip": "Controleer het rolattribuut op spelfouten en of de rol bestaat in de specificatie."
    },
    "EA-R83": {
        "content": "Scrollbaar element is niet toegankelijk via toetsenbord",
        "explanation": "Deze regel controleert of scrollbare elementen kunnen worden gescrold met het toetsenbord. Om ervoor te zorgen dat er een element is waarmee de pijltoetsen kunnen worden gebruikt om de scrollpositie te regelen, moet de focus op of in een scrollbare regio zijn.",
        "tip": "Zorg ervoor dat elk scrollbaar element of een van de kinderelementen focusseerbaar is."
    },
    "EA-R84": {
        "content": "Zichtbaar label maakt geen deel uit van toegankelijke naam",
        "explanation": "Deze regel controleert of interactieve elementen zoals knoppen of links hun volledige zichtbare label als onderdeel van hun toegankelijke naam hebben, bijv. bij gebruik van aria-label. Dit is vooral belangrijk voor gebruikers die spraakinvoer gebruiken om de website te bedienen. Anders kan de spraakinvoer niet correct worden geïnterpreteerd en werkt deze mogelijk niet. Aanvullende context die geen deel uitmaakt van de zichtbare naam, kan worden toegevoegd met aria-describedby.",
        "tip": "Zorg ervoor dat het volledige zichtbare label (niet slechts een deel) is opgenomen in de toegankelijke naam (ingesteld met bijv. aria-label)."
    },
    "EA-R85": {
        "content": "Onvoldoende tekstcontrast (verbeterd)",
        "explanation": "Dit is een AAA-verbetering van de minimumcontrastregel. Zorg ervoor dat alle tekstelementen voldoende kleurcontrast hebben tussen de tekst op de voorgrond en de achtergrondkleur erachter. Het minimale verbeterde contrast is afhankelijk van de tekstgrootte en is 7:1 of 4,5:1 voor grotere tekst.",
        "tip": "Verhoog het contrast, bijv. met een donkerder/lichter lettertype of achtergrondkleur. Hulp wordt geboden door de <a target=\"_blank\" href=\"https://dashboard.eye-able.com/tools/contrast-check\">contrastchecker van Eye-Able</a> in het Dashboard onder Tools."
    },
    "EA-R86": {
        "content": "ARIA Meter-element mist toegankelijke naam",
        "explanation": "Een meter is een grafische weergave van een numerieke waarde binnen een gedefinieerd bereik. Een element met de rol \"meter\" moet een toegankelijke naam hebben zodat gebruikers van schermlezers de inhoud en het doel ervan kunnen identificeren.",
        "tip": "Voeg een toegankelijke naam toe aan de meter met behulp van een title, aria-label of aria-labelledby attribuut."
    },
    "EA-R87": {
        "content": "ARIA voortgangsbalk mist toegankelijke naam",
        "explanation": "Een voortgangsbalk geeft de voortgangsstatus aan voor taken die lang duren. Een element met de rol \"progressbar\" moet een toegankelijke naam hebben zodat gebruikers van schermlezers de inhoud en het doel ervan kunnen identificeren.",
        "tip": "Voeg een toegankelijke naam toe aan de voortgangsbalk met behulp van een title, aria-label of aria-labelledby attribuut."
    },
    "EA-R88": {
        "content": "Ontbrekend aria-braille-equivalent",
        "explanation": "Deze controle zorgt ervoor dat er een niet-braille-equivalent is voor aria-braillelabel- en aria-brailleroledescription-inhoud. Wanneer gebruikt zonder een overeenkomstig label of roldescription zegt ARIA deze attributen te negeren.",
        "tip": "Zorg ervoor dat u een niet-braille-equivalent biedt voor de genoemde aria-attributen. Dit kan een aria-label of aria-roledescription-attribuut zijn."
    },
    "EA-R89": {
        "content": "ARIA knop, link of menu-item mist toegankelijke naam",
        "explanation": "Het is cruciaal dat elke ARIA-knop (role=\"button\"), link (role=\"link\") en menu-item (role=\"menuitem\") een naam heeft die kan worden gelezen door ondersteunende technologieën.",
        "tip": "Zorg ervoor dat elke ARIA-knop, link of menu-item een beschrijvende en toegankelijke naam heeft. U kunt een interne tekst, een niet-lege aria-label of aria-labelledby-attribuut gebruiken."
    },
    "EA-R90": {
        "content": "Rol mist vereiste attributen",
        "explanation": "Deze regel controleert of elementen die een expliciete rol hebben ook alle vereiste statussen en eigenschappen voor die rol specificeren. De status van het element wordt niet gecommuniceerd aan gebruikers van schermlezers als een vereist attribuut wordt weggelaten.",
        "tip": "Voeg de ontbrekende vereiste ARIA-attributen toe. Voor meer informatie over de vereiste attributen, controleer de <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#states_and_properties\">ARIA-specificatie</a>."
    },
    "EA-R91": {
        "content": "ARIA tooltip mist toegankelijke naam",
        "explanation": "Elk ARIA tooltip-element (role=\"tooltip\") moet een toegankelijke naam hebben die het doel of de functie ervan beschrijft voor gebruikers van ondersteunende technologie.",
        "tip": "Zorg ervoor dat elke ARIA tooltip een naam heeft die duidelijk en beschrijvend is. Dit kan worden ingesteld met behulp van een zichtbare interne tekst of attributen zoals aria-label en aria-labelledby."
    },
    "EA-R92": {
        "content": "<blink>-element is verouderd",
        "explanation": "Het <blink>-element zorgt ervoor dat elke tekst in het element knippert met een vooraf bepaald tarief. Dit kan niet worden onderbroken door de gebruiker, noch kan het worden uitgeschakeld als een voorkeur. Daarom faalt inhoud die blink gebruikt het Succescriterium omdat knipperen meer dan drie seconden kan doorgaan.",
        "tip": "Verwijder alle <blink>-elementen van uw webpagina."
    },
    "EA-R93": {
        "content": "Pagina mist middelen om herhaalde blokken over te slaan",
        "explanation": "Het bieden van manieren om repetitieve inhoud over te slaan, helpt gebruikers effectiever door de site te navigeren. Deze regel faalt als de pagina noch een interne skip-link, een kop of een landmark-regio heeft.",
        "tip": "Het gebruik van <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/\">geschikte landmark-elementen</a> zoals &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;, <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">koppen</a> of <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">interne skip-links</a> kan gebruikers helpen effectiever door de site te navigeren."
    },
    "EA-R94": {
        "content": "Onjuiste <dl>-elementstructuur",
        "explanation": "Een definitielijst (<dl>) omvat een lijst van groepen termen (met behulp van <dt>-elementen) en beschrijvingen (met behulp van <dd>-elementen) bijvoorbeeld om een woordenlijst weer te geven. Een definitielijst mag alleen <dt>, <dd>, <template>, <script> of <div>-elementen bevatten in een juiste volgorde.",
        "tip": "Controleer of uw definitielijst alleen <dt>, <div> en <dd>-elementen bevat. Zorg er ook voor dat ze correct zijn geordend, <dt> moet altijd voorafgaan aan <dd>-elementen."
    },
    "EA-R95": {
        "content": "<dt> of <dd>-element niet ingesloten <dl>",
        "explanation": "De beschrijvingsterm <dt> en beschrijvingsdetails <dd>-elementen moeten altijd worden ingesloten door een definitielijst <dl>-element of de definitielijst is ongeldig. Anders kunnen ondersteunende technologieën de definitielijst mogelijk niet correct herkennen.",
        "tip": "Zorg ervoor dat het ouder-element van <dt> of <dd> een definitielijst <dl> is of een <div> dat een kind is van een <dl>."
    },
    "EA-R96": {
        "content": "Formulierveld heeft meerdere labels",
        "explanation": "Elk formulierveld moet slechts één geassocieerd <label> hebben. Anders zijn er inconsistenties in de manier waarop verschillende ondersteunende technologieën en browsercombinaties het label interpreteren. Labels zijn verbonden aan formuliervelden met behulp van het for-attribuut op het <label> en het id-attribuut op het formulierveld.",
        "tip": "Zorg ervoor dat elk formulierveld slechts één geassocieerd <label> heeft. Gebruik de id van het formulierveld om verbonden labels te zoeken."
    },
    "EA-R98": {
        "content": "ARIA ID-attribuutwaarde moet uniek zijn",
        "explanation": "Een ID is een unieke identificatie voor elementen van de webpagina en mag dienovereenkomstig niet worden gedupliceerd. Dit is vooral belangrijk bij ARIA-elementen aangezien de id wordt gebruikt om toegankelijke namen of beschrijvingen te koppelen. Dubbele ID's zijn veelvoorkomende validatiefouten die de toegankelijkheid van labels kunnen breken.",
        "tip": "Hernoem de ID zodat deze slechts één keer op de pagina wordt gebruikt. Zorg ervoor dat uw ARIA-elementen geldig blijven."
    },
    "EA-R99": {
        "content": "Lijsten mogen alleen <li>-elementen bevatten",
        "explanation": "Lijsten (<ul> of <ol>) moeten correct zijn gestructureerd om leesbaar en correct aangekondigd te worden door ondersteunende technologie. Een lijst mag alleen <li>, <script> of <template> als directe kindknooppunten bevatten. De lijstitems zelf kunnen andere elementen bevatten.",
        "tip": "Zorg ervoor dat uw lijstknooppunt (<ul> of <ol>) alleen lijstitem (<li>) als directe kindknooppunten heeft."
    },
    "EA-R101": {
        "content": "Vermijd het gebruik van <marquee>-elementen",
        "explanation": "Het <marquee>-element creëert scrollende tekst die moeilijk te lezen en aan te klikken is. Het <marquee>-element is verouderd en kan toegankelijkheids- en bruikbaarheidsproblemen veroorzaken, vooral omdat het moeilijk te pauzeren is.",
        "tip": "Vervang <marquee>-elementen door moderne CSS-animaties of andere technieken."
    },
    "EA-R102": {
        "content": "Vermijd het gebruik van server-side afbeeldingskaarten",
        "explanation": "Server-side afbeeldingskaarten zijn niet toegankelijk voor toetsenbordgebruikers, die muisklikken moeten gebruiken om toegang te krijgen tot gelinkte inhoud. Dit maakt de afbeelding ontoegankelijk voor degenen die uitsluitend met een toetsenbord navigeren. Daarnaast kunnen tekstalternatieven niet worden geboden voor de interactieve zones van een server-side afbeeldingskaart, zoals dat kan met client-side afbeeldingskaarten.",
        "tip": "Gebruik client-side afbeeldingskaarten of andere interactieve elementen voor betere toegankelijkheid."
    },
    "EA-R104": {
        "content": "Aanraakdoel is te klein",
        "explanation": "Aanraakdoelen moeten van voldoende grootte en afstand zijn om gemakkelijk te kunnen worden geactiveerd zonder per ongeluk een aangrenzend doel te activeren. Aanraakdoelen moeten minimaal 24 x 24 CSS-pixels groot zijn of een afstand van 24px tot het volgende doel hebben. Grote aanraakdoelen helpen gebruikersfouten te voorkomen en zorgen voor een betere ervaring voor mobiele gebruikers. Deze regel is afhankelijk van de viewportgrootte en scrollpositie.",
        "tip": "Zorg ervoor dat uw aanraakdoel minimaal 24 x 24 CSS-pixels groot is of een afstand van 24px tot het volgende doel heeft. Er is een uitzondering als er een andere besturing is die de onderliggende functionaliteit kan bieden die aan de minimale grootte voldoet."
    },
    "EA-R105": {
        "content": "Zorg voor passende waarden voor rolattribuut",
        "explanation": "Ongepaste rolwaarden kunnen gebruikers van ondersteunende technologieën in verwarring brengen of ertoe leiden dat elementen worden genegeerd.",
        "tip": "Valideer dat het rolattribuut een geschikte waarde heeft voor het gegeven element."
    },
    "EA-R106": {
        "content": "ARIA dialoog mist toegankelijke naam",
        "explanation": "Gebruikers van schermlezers kunnen het doel van ARIA-dialogen (elementen met role=\"dialog\" of role=\"alertdialog\") die geen toegankelijke naam hebben, niet begrijpen. Een toegankelijke naam biedt context aan de dialoog waardoor gebruikers van schermlezers het doel en de functie ervan kunnen begrijpen.",
        "tip": "Zorg ervoor dat de ARIA-dialoog een toegankelijke naam heeft. Gebruik de aria-label- of aria-labelledby-attributen hiervoor."
    },
    "EA-R107": {
        "content": "Zorg voor correct gebruik van role=\"text\"",
        "explanation": "De role=\"text\" moet worden gebruikt op elementen zonder focusseerbare nakomelingen om navigatie-uitdagingen voor gebruikers van schermlezers te vermijden.",
        "tip": "Gebruik role=\"text\" voor elementen zonder focusseerbare kinderelementen."
    },
    "EA-R108": {
        "content": "ARIA treeitem mist toegankelijke naam",
        "explanation": "Een boom (role=\"tree\") is een hiërarchische lijst met ouder- en kindknooppunten die kunnen worden uitgebreid en ingeklapt. Een treeitem (role=\"treeitem\") is een knooppunt in een boom. Zonder een toegankelijke naam kunnen gebruikers van schermlezers het doel van het treeitem niet bepalen.",
        "tip": "Wijs een beschrijvende naam toe aan het treeitem met behulp van een interne tekst, een aria-label of aria-labelledby."
    },
    "EA-R110": {
        "content": "Formulierelement mist een zichtbaar label",
        "explanation": "Zichtbare labels verbeteren de toegankelijkheid van formulieren door duidelijke context te bieden voor ziende gebruikers. Alleen vertrouwen op verborgen labels, titel of aria-describedby kan beperkend zijn. De titel- en aria-describedby-attributen bieden aanvullende informatie zoals hints. Omdat hints anders worden gepresenteerd dan labels aan toegankelijkheids-API's, kan dit problemen veroorzaken met ondersteunende technologieën.",
        "tip": "Bied een zichtbaar en duidelijk label. Gebruik bij voorkeur een <label>-element. Indien niet mogelijk kunnen aria-label of aria-labelledby ook worden gebruikt."
    },
    "EA-R111": {
        "content": "Banner landmark is niet op het hoogste niveau",
        "explanation": "Met <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a> hebben blinde gebruikers die een schermlezer gebruiken de mogelijkheid om naar secties van een webpagina te springen. De bannerrol (role=\"banner\") is bedoeld voor het definiëren van een globale site-header bijvoorbeeld een zoekfunctie, de globale navigatie of een slogan. Als de banner-landmark niet een topniveau-landmark is (en zich bevindt binnen een ander landmark), definieert het niet effectief het vooraf bepaalde koptekstgedeelte van de lay-out.",
        "tip": "Zorg ervoor dat elke banner-landmark niet is opgenomen in een ander landmark."
    },
    "EA-R112": {
        "content": "Complementary landmark is niet op het hoogste niveau",
        "explanation": "Met <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a> hebben blinde gebruikers die een schermlezer gebruiken de mogelijkheid om naar secties van een webpagina te springen. Aanvullende inhoud zoals &lt;aside&gt; of role=\"complementary\" vult de hoofdinhoud van een document of pagina aan. Gebruikers van schermlezers hebben de optie om aanvullende inhoud over te slaan wanneer deze op het hoogste niveau van de pagina verschijnt. Deze optie is niet beschikbaar als u een &lt;aside&gt;-element insluit in een ander landmark.",
        "tip": "Zorg ervoor dat elk complementair landmark (&lt;aside&gt; of role=\"complementary\") niet is opgenomen in een ander landmark."
    },
    "EA-R113": {
        "content": "Contentinfo landmark is niet op het hoogste niveau",
        "explanation": "Met <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a> hebben blinde gebruikers die een schermlezer gebruiken de mogelijkheid om naar secties van een webpagina te springen. De contentinfo-rol (role=\"contentinfo\") definieert een footer met informatie zoals auteursrechten, navigatielinks en privacyverklaringen. Het plaatsen ervan binnen een ander landmark kan blinde schermlezergebruikers ervan weerhouden snel te vinden en te navigeren naar de footer.",
        "tip": "Zorg ervoor dat het contentinfo-landmark (role=\"contentinfo\") niet is opgenomen in een ander landmark."
    },
    "EA-R114": {
        "content": "Main landmark is niet op het hoogste niveau",
        "explanation": "Met <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a> hebben blinde gebruikers die een schermlezer gebruiken de mogelijkheid om naar secties van een webpagina te springen. De hoofdlandmark (&lt;main role=\"main\"&gt;) wordt gebruikt om de primaire inhoud van een document aan te geven. Het is een best practice om ervoor te zorgen dat de hoofdlandmark niet is opgenomen in een ander landmark.",
        "tip": "Zorg ervoor dat de hoofdlandmark (&lt;main role=\"main\"&gt;) niet is opgenomen in een ander landmark."
    },
    "EA-R115": {
        "content": "Meer dan één banner landmark bestaat",
        "explanation": "Met <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a> hebben blinde gebruikers die een schermlezer gebruiken de mogelijkheid om naar secties van een webpagina te springen. Het hebben van meerdere banner-landmarks kan de navigatie van schermlezers verwarren, waardoor het moeilijker wordt om de primaire header of introductie-inhoud te onderscheiden.",
        "tip": "Zorg ervoor dat elke HTML-pagina slechts één banner-landmark heeft. Beslis welke banner-landmark u wilt behouden en verwijder alle andere banner-landmarks."
    },
    "EA-R116": {
        "content": "Meer dan één contentinfo landmark bestaat",
        "explanation": "Met <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a> hebben blinde gebruikers die een schermlezer gebruiken de mogelijkheid om naar secties van een webpagina te springen. Meerdere contentinfo-landmarks (role=\"contentinfo\") kunnen gebruikers van ondersteunende technologieën in verwarring brengen door te suggereren dat er meerdere footer-regio's zijn.",
        "tip": "Zorg ervoor dat elke HTML-pagina slechts één contentinfo-landmark heeft. Beslis welke contentinfo-landmark u wilt behouden en verwijder alle andere landmarks."
    },
    "EA-R117": {
        "content": "Meer dan één hoofdlandmark bestaat",
        "explanation": "Met <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a> hebben blinde gebruikers die een schermlezer gebruiken de mogelijkheid om naar secties van een webpagina te springen. De hoofdlandmark (&lt;main role=\"main\"&gt;) wordt gebruikt om de primaire inhoud van een document aan te geven. Meerdere hoofdlandmarks kunnen het voor gebruikers moeilijk maken om het kerninhoudsgebied te identificeren.",
        "tip": "Beperk uw pagina tot één hoofdlandmark (&lt;main role=\"main\"&gt;) om duidelijk het primaire inhoudsgebied aan te geven. Verwijder dubbele hoofdlandmarks."
    },
    "EA-R118": {
        "content": "Hoofdlandmark ontbreekt",
        "explanation": "Met <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a> hebben blinde gebruikers die een schermlezer gebruiken de mogelijkheid om naar secties van een webpagina te springen. Inhoud buiten deze secties is moeilijk te vinden en het doel ervan kan onduidelijk zijn. Een hoofdlandmark (&lt;main role=\"main\"&gt;) biedt een snelle manier voor gebruikers van ondersteunende technologie om naar de primaire inhoud te navigeren.",
        "tip": "Voeg een hoofdlandmark (<main>) toe aan uw website en neem de hoofdinhoud van uw pagina erin op."
    },
    "EA-R119": {
        "content": "Landmark is niet uniek",
        "explanation": "Unieke landmarks helpen gebruikers bij het onderscheiden tussen verschillende inhoudssecties. Dubbele landmarks kunnen gebruikers in verwarring brengen en het moeilijk maken om naar de gewenste inhoud te navigeren. Sommige landmarks zoals <header> of <footer> kunnen slechts één keer per pagina bestaan, terwijl anderen zoals <nav> of <section>, unieke toegankelijke namen moeten hebben (bijv. van aria-label of aria-labelledby).",
        "tip": "Zorg ervoor dat het landmark een unieke rol of rol/label/titelcombinatie heeft. Bijvoorbeeld, verander het label om de regio uniek te maken."
    },
    "EA-R120": {
        "content": "Scope-attribuut in tabel is incorrect",
        "explanation": "Het scope-attribuut in tabellen helpt gebruikers van ondersteunende technologieën om de relatie tussen koppen en gegevenscellen te begrijpen. Het scope-attribuut kan alleen worden gebruikt op tabelkoppen <th> en moet de waarde \"col\" of \"row\" hebben.",
        "tip": "Zorg ervoor dat het scope-attribuut alleen wordt gebruikt op tabelkoppen <th> en dat de waarde \"col\" of \"row\" is."
    },
    "EA-R121": {
        "content": "Pagina mist een skip-link",
        "explanation": "Skip-links bieden een link bovenaan de pagina die, wanneer geactiveerd, de gebruiker naar het begin van het hoofdinhoudsgebied springt. Anders moeten toetsenbord- en schermlezergebruikers een lange lijst met navigatielinks en andere elementen doornemen voordat ze ooit bij de hoofdinhoud aankomen. Een typische skip-link is \"skip to content\" met behulp van een link met een ankerlink (bijv. #main-content). Het wordt aanbevolen dat de link verborgen is totdat de gebruiker er met een toetsenbord naar navigeert.",
        "tip": "Voeg een skip-link toe aan de hoofdinhoud op de pagina. Als u al een skip-link heeft, zorg ervoor dat deze met het toetsenbord kan worden bereikt."
    },
    "EA-R122": {
        "content": "Zorg ervoor dat tabindex-waarden 0 of negatief zijn",
        "explanation": "Het gebruik van tabindex-waarden groter dan 0 kan de natuurlijke tabvolgorde verstoren, waardoor navigatieproblemen ontstaan voor toetsenbord- en ondersteunende technologiegebruikers.",
        "tip": "Stel tabindex-waarden in op 0 of laat ze oningesteld voor natuurlijke tabvolgorde. Gebruik negatieve waarden voor programmeerbaar focusseerbare elementen."
    },
    "EA-R123": {
        "content": "Tabel heeft identieke bijschrift en samenvatting",
        "explanation": "Het hebben van dezelfde tekst in het <caption>-element van een tabel en de samenvattingsattribuut is overbodig en kan potentieel verwarrend zijn. Het <caption>-element wordt gebruikt als een on-screen titel, terwijl het samenvattingsattribuut wordt gebruikt door schermlezers om toegang te krijgen tot een samenvatting van het doel van de tabel.",
        "tip": "Zorg ervoor dat de <caption>-tekst verschilt van het samenvattingsattribuut van de tabel om verwarring te voorkomen."
    },
    "EA-R124": {
        "content": "Identieke links met verschillende doelen",
        "explanation": "Links met dezelfde toegankelijke naam moeten dezelfde functionaliteit/doel hebben om verwarring te voorkomen. De linkbeschrijving stelt een gebruiker in staat om elke link te onderscheiden van links op de webpagina die naar andere bestemmingen leiden en helpt de gebruiker te beslissen of hij de link wil volgen.",
        "tip": "Vermijd het hebben van links met identieke beschrijvingen (bijv. van interne tekst, alt- of aria-attributen) die naar verschillende URL's leiden. Bied een linktekst die het doel en de bestemming van de link beschrijft."
    },
    "EA-R125": {
        "content": "Bevestig dat de taal van de site correct is weergegeven",
        "explanation": "De achterliggende taal past niet bij alle elementen op de site. Dit is erlaubt, als deze elementen door een eigen lang-Attribut korrekt ausgezeichnet werden. Andernfalls ist beispielsweise die Aussprache einer Sprachausgabe inkorrekt.",
        "tip": "Zorg ervoor dat alle andere sprachigen Blöcke auf der Seite mit dem richt lang-Attribut vershen sind."
    }
};