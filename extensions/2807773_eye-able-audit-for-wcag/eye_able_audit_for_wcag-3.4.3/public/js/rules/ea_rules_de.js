const ea_rules_de = {
    "EA-R1": {
        "content": "SVG Syntax nicht korrekt",
        "explanation": "Die Syntax des SVG Elements nicht korrekt. Es fehlt die Rolle oder das title/desc-Element.",
        "tip": "Überprüfen Sie die Rolle oder das title/desc Element des SVGs."
    },
    "EA-R2": {
        "content": "<svg> hat keinen zugänglichen Namen",
        "explanation": "<svg> Elemente mit der Rolle \"img\" benötigen einen zugänglichen Namen damit deren Inhalt und Zweck von Screenreadern korrekt vorgelesen werden können.",
        "tip": "Erstellen Sie ein title-Attribut, ein title/desc Element oder ARIA-Attribute für das <svg>."
    },
    "EA-R3": {
        "content": "<svg> zugänglicher Name sehr kurz (<5 Zeichen)",
        "explanation": "Die SVG Textalternative ist sehr kurz (<5 Zeichen) und beschreibt möglicherweise die Grafik nicht ausreichend.",
        "tip": "Prüfen Sie, ob der zugängliche Name das SVG sinnhaft beschreibt."
    },
    "EA-R4": {
        "content": "<svg> zugänglicher Name sehr lang (>150 Zeichen)",
        "explanation": "Die SVG Beschriftung ist möglicherweise zu lang (>150 Zeichen) und kann zusammengefasst werden. Viele blinde Menschen lesen Texte mithilfe einer Braillezeile. Eine Braillezeile kann mindestens 40 Zeichen, aber nur maximal 80 Zeichen ausgeben.",
        "tip": "Fassen Sie die Beschreibung auf das Wesentliche zusammen."
    },
    "EA-R5": {
        "content": "<svg> Beschriftung etwas lang (>80 Zeichen)",
        "explanation": "Die SVG Beschriftung ist etwas lang (>80 Zeichen) und kann möglicherweise zusammengefasst werden. Viele blinde Menschen lesen Texte mithilfe einer Braillezeile. Eine Braillezeile kann mindestens 40 Zeichen, aber nur maximal 80 Zeichen ausgeben.",
        "tip": "Fassen Sie die Beschreibung auf das Wesentliche zusammen."
    },
    "EA-R6": {
        "content": "Bild hat keinen zugänglichen Namen",
        "explanation": "Bilder (<img> oder role=\"img\")  benötigen einen zugänglichen Namen (z.B. einen Alt-Text), damit diese von Screenreadern erfasst werden können. Der Alt-Text sollte die Inhalt und den Zweck des Bildes wiedergeben. Das Titel-Attribut wird nicht immer zuverlässig erkannt.",
        "tip": "Ergänzen Sie einen aussagekräftigen Alternativtext. Bei dekorativen Bildern kann ein leeres Alt-Attribut verwendet werden."
    },
    "EA-R7": {
        "content": "Gleicher Alt-Text wie der umschließende Link",
        "explanation": "Das Bild hat den gleichen Alt-Text wie der umschließende Link. Eine Wiederholung des Alternativtextes für einen Link oder ein Bild im angrenzenden Text ist unnötig und kann Nutzer von Bildschirmlesegeräten verwirren, da sie ihn doppelt vorgelesen bekommen.",
        "tip": "Entfernen Sie den Alternativtext des Bildes, da er keine zusätzliche Information enthält. Verwenden Sie stattdessen ein leeres Alt-Attribut, alt=\"\", für das Bild."
    },
    "EA-R8": {
        "content": "Kein zugänglicher Name für verlinktes Bild",
        "explanation": "Zugänglicher Text für alternative Ausgaben wie z.B. Screenreader oder Braillezeilen fehlt im verlinkten Bild. Da der Link selbst keinen Text enthält, muss im Alternativtext das Bild oder seine Funktion beschrieben werden. Ein Titel-Attribut ist nicht für alle Screenreader ausreichend.",
        "tip": "Ergänzen Sie einen aussagekräftigen Alternativtext für den Link oder das verlinkte Bild."
    },
    "EA-R9": {
        "content": "Alt-Text sehr kurz (<5 Zeichen)",
        "explanation": "Der Alt-Text eines Bildes sollte dessen Inhalt sinnhaft beschreiben.",
        "tip": "Prüfen Sie, ob der Alternativtext das Bild ausreichend beschreibt."
    },
    "EA-R10": {
        "content": "Alt-Text sehr lang (>150 Zeichen)",
        "explanation": "Der Alt-Text ist sehr lang (>150 Zeichen) und kann möglicherweise zusammengefasst werden. Viele blinde Menschen lesen Texte mithilfe einer Braillezeile. Eine Braillezeile kann mindestens 40 Zeichen, aber nur maximal 80 Zeichen ausgeben.",
        "tip": "Fassen Sie die Beschreibung auf das Wesentliche zusammen."
    },
    "EA-R11": {
        "content": "Alt-Text etwas lang (>80 Zeichen)",
        "explanation": "Der Alt-Text ist etwas lang (>80 Zeichen) und kann möglicherweise zusammengefasst werden. Viele blinde Menschen lesen Texte mithilfe einer Braillezeile. Eine Braillezeile kann mindestens 40 Zeichen, aber nur maximal 80 Zeichen ausgeben.",
        "tip": "Fassen Sie die Beschreibung auf das Wesentliche zusammen."
    },
    "EA-R12": {
        "content": "Link hat keinen Linktext hinterlegt",
        "explanation": "Links benötigen einen Linktext, der verständlich ist und von Screenreadern korrekt ausgegeben wird. Ein Linktext sollte klar erklären, welche Informationen der Leser erhält, wenn er auf diesen Link klickt.",
        "tip": "Ergänzen Sie einen aussagekräftigen Linktext. Fügen Sie beispielweise Text in dem Link ein oder verwenden Sie ein ARIA-Attribut. Der Linktext sollte auch für Screenreader nicht versteckt werden (z. B. durch display: none oder aria-hidden=\"true\")."
    },
    "EA-R13": {
        "content": "Leerer Link",
        "explanation": "Dieser Link hat keinen Inhalt und keine Verlinkung (href-Attribut).",
        "tip": "Entfernen Sie leere Links."
    },
    "EA-R14": {
        "content": "Linktext ist ein URL",
        "explanation": "Linktexte sollten aussagekräftig und den Zweck des Links wiedergeben. Screenreader Nutzer sollen leicht entscheiden können, ob sie einem Link folgen möchten.",
        "tip": "Achten Sie darauf, aussagekräftige Texte und nicht zu lange URLs als Linktext zu verwenden."
    },
    "EA-R15": {
        "content": "Linktext ist sehr lang (>150 Zeichen)",
        "explanation": "Der Linktext ist sehr lang (>150 Zeichen) und kann möglicherweise zusammengefasst werden. Viele blinde Menschen lesen Texte mithilfe einer Braillezeile. Eine Braillezeile kann mindestens 40 Zeichen, aber nur maximal 80 Zeichen ausgeben.",
        "tip": "Achten Sie darauf, aussagekräftige und kompakte Texte zu verwenden."
    },
    "EA-R16": {
        "content": "<object> hat keinen zugänglichen Namen",
        "explanation": "<object>-Elemente können Multimedia Inhalte (Audio, Video, etc.) enthalten und müssen eine Auszeichnung für Screenreader enthalten. Benutzer von Screenreadern können den Inhalt des Objekts ohne eine Textalternative nicht erfassen.",
        "tip": "Fügen Sie dem <object> einen zugänglichen Namen, z.B über Text, ein Aria-Label (aria-label oder aria-labelledby) oder ein Titel-Attribut hinzu."
    },
    "EA-R17": {
        "content": "Audiodatei erkannt",
        "explanation": "Prüfen Sie, ob in der Audio Informationen vermittelt werden (z.B. über eine Kommentarstimme). Falls ja ist eine Transkription für taube Nutzende erforderlich.",
        "tip": "Prüfen Sie, ob für die Audiodatei eine Transkription benötigt wird. Falls ja stellen Sie eine Alternative, beispielsweise über eine Texttranskription, zur Verfügung."
    },
    "EA-R18": {
        "content": "Video erkannt",
        "explanation": "Prüfen Sie, ob bei dem Video eine Medienalternative oder Untertitel benötigt werden. Wenn ein Video nicht mit Untertiteln versehen ist, haben gehörlose Nutzer nur begrenzten oder gar keinen Zugang zu den darin enthaltenen Informationen. Stumme Videodateien (ohne Stimme) sind für blinde Nutzende nicht verfügbar. Auch diese brauchen eine vollwertige Medienalternative (Text, alternative Tonspur oder Audiodatei).",
        "tip": "Prüfen Sie, ob bei dem Video eine Medienalternative und Untertitel benötigt werden und stellen Sie diese gegebenenfalls zur Verfügung."
    },
    "EA-R19": {
        "content": "Mehrere H1 Überschriften erkannt",
        "explanation": "Die Überschriften Struktur der Seite sollte logisch gegliedert sein und nach Möglichkeit mit der H1 Überschrift beginnen. Die H1 Überschrift kennzeichnet hierbei die wichtigsten Teile der Seite.",
        "tip": "Verwenden Sie nach Möglichkeit nur eine H1 Überschrift pro Seite. Strukturieren Sie weitere Überschriften mit H2, H3, usw."
    },
    "EA-R20": {
        "content": "Keine H1 Überschrift",
        "explanation": "Die H1 Überschrift existiert nicht oder ist nicht für Screenreader sichtbar. Prüfen Sie, ob eine sichtbare H1 Überschrift existiert, da diese als erstes und wichtigstes Element der Überschriften-Struktur (h1-h6) dient. Das <h1>-Element sollte am Anfang des Hauptinhalts stehen, damit Benutzer von Screenreadern mit Hilfe von Tastaturbefehlen direkt zum Hauptinhalt navigieren können.",
        "tip": "Erstellen Sie möglichst immer eine sichtbare <h1> Überschrift die den Inhalt der Seite beschreibt."
    },
    "EA-R21": {
        "content": "Sprung in der Überschriften-Reihenfolge",
        "explanation": "Die Überschriften-Struktur der Seite sollte logisch gegliedert sein und Sprünge, beispielsweise von H2 nach H4, vermeiden.",
        "tip": "Versuchen Sie keine Sprünge in der Überschriften-Reihenfolge zu machen."
    },
    "EA-R22": {
        "content": "Listenelement <li> ist nicht Teil von Liste",
        "explanation": "Ein <li>-Element muss immer von einem <ul> oder <ol> Element umrahmt sein. Andernfalls werden die Listenelemente nicht korrekt von Screenreadern als Liste erfasst. Achten Sie auf mögliche Rollen der <ul> oder <ol> Elemente über das role-Attribut.",
        "tip": "Erstellen Sie eine korrekte Liste mit einem <ul> oder <ol> als Eltern-Element. Falls Sie schon ein <ul> oder <ol> Element gesetzt haben, achten Sie auf mögliche Rollen über das role-Attribut."
    },
    "EA-R23": {
        "content": "Textkontrast nicht ausreichend",
        "explanation": "Die visuelle Darstellung von Text muss ein Mindestkontrast&shy;verhältnis mit dessen Hintergrund einhalten, damit dieser gut wahrgenommen werden kann. Der Mindestkontrast ist abhängig von der Textgröße und liegt bei 4.5:1 oder 3:1 für größere Texte (>18pt).",
        "tip": "Erhöhen Sie den Kontrast, z.B. durch eine dunklere/hellere Schriftfarbe oder Hintergrundfarbe."
    },
    "EA-R24": {
        "content": "Nicht ausreichender Kontrast in SVG",
        "explanation": "Die visuelle Darstellung von SVGs muss ein Mindestkontrast&shy;verhältnis von 3:1 einhalten, damit diese gut wahrgenommen werden können.",
        "tip": "Erhöhen Sie den Kontrast des SVGs."
    },
    "EA-R25": {
        "content": "Kontrast manuell prüfen",
        "explanation": "Es wurde ein sehr niedriger Kontrast erkannt. Teilweise kann dies auf die Verwendung von Hintergrundbildern oder Gradienten hindeuten. Bitte prüfen Sie den Kontrast manuell.",
        "tip": "Erhöhen Sie den Kontrast, z.B. durch eine dunklere/hellere Schriftfarbe. Achten Sie auf ausreichende Kontraste der Texte bei Hintergrundbildern."
    },
    "EA-R26": {
        "content": "Seite hat keinen Titel",
        "explanation": "Der Titel der Seite ist wichtig um das Thema oder den Zweck der Seite zu beschreiben. Er erlaubt es Besuchern der Webseite diese inhaltlich einzuordnen oder zu finden.",
        "tip": "Fügen Sie der Seite ein aussagekräftiges <titel>-Element hinzu."
    },
    "EA-R27": {
        "content": "Seite hat einen sehr kurzen Titel",
        "explanation": "Der Titel der Seite ist wichtig um das Thema oder den Zweck der Seite zu beschreiben. Er erlaubt es Besuchern der Webseite diese inhaltlich einzuordnen oder zu finden.",
        "tip": "Prüfen Sie, ob der Titel die Seite ausreichend beschreibt."
    },
    "EA-R28": {
        "content": "<iframe> hat keinen zugänglichen Namen",
        "explanation": "Der Titel eines <iframe> ist wichtig, um dessen Thema oder dessen Zweck zu beschreiben. Benutzer von Screenreadern können auf eine Liste von Titeln für alle Frames auf einer Seite abrufen. Die Navigation durch <frame>- und <iframe>-Elemente kann jedoch schwierig und verwirrend sein, wenn das Titelattribut fehlt.",
        "tip": "Fügen Sie dem <iframe> ein aussagekräftiges Titel-Attribut hinzu. Alternativ können Sie Sie ARIA-Attribut wie aria-label oder aria-labelledby verwenden."
    },
    "EA-R29": {
        "content": "Keine Sprache im HTML hinterlegt",
        "explanation": "Damit Sprachausgabe von Screenreader oder des Browsers korrekt funktioniert muss die Sprache der Seite angegeben werden. Screenreader verwenden für verschiedene Sprachen unterschiedliche Sound-Bibliotheken, die auf der Aussprache der jeweiligen Sprache basieren. Es ist wichtig, eine Sprache anzugeben und sicherzustellen, dass diese gültig ist, damit der Website-Text richtig ausgesprochen wird.",
        "tip": "Fügen Sie dem HTML-Element ihrer Seite das lang-Attribut hinzu."
    },
    "EA-R30": {
        "content": "Hinterlegte Sprache passt nicht zur Seitensprache",
        "explanation": "Damit Sprachausgabe von Screenreader oder des Browsers korrekt funktioniert muss die Sprache der Seite korrekt angegeben werden. Andernfalls ist beispielsweise die Aussprache einer Sprachausgabe inkorrekt.",
        "tip": "Prüfen Sie, dass die Sprache im HTML-Element der Seitensprache entspricht."
    },
    "EA-R31": {
        "content": "Abkürzung erkannt",
        "explanation": "Abkürzungen sind nicht immer für jeden verständlich und sollten im Text oder über HTML-Elemente wie <abbr> ausgezeichnet werden.",
        "tip": "Prüfen Sie, ob die Abkürzung bereits im Text oder durch spezielle HTML-Elemente (e.g. <abbr>) ausgezeichnet ist bzw. ausgezeichnet werden kann."
    },
    "EA-R32": {
        "content": "ID nicht eindeutig",
        "explanation": "Eine ID ist ein eindeutiger Identifikator für Elemente der Webseite und darf entsprechend nicht doppelt vorkommen. Doppelte IDs können dazu führen, dass Screenreader Elemente überspringen oder Labels nicht richtig zugeordnet werden. Seit 2023 ist es keine Anforderung der WCAG mehr, dass IDs eindeutig sind, außer eine Beschriftung wird hierdurch uneindeutig.",
        "tip": "Ändern Sie die ID, sodass diese nur einmalig auf der Seite verwendet wird. Beachten Sie insbesondere eventuell verknüpfte Labels."
    },
    "EA-R33": {
        "content": "Grafisches Bedienelement hat keinen zugänglichen Namen",
        "explanation": "Ein grafisches Bedienelement (<input type=\"image\">) benötigt einen Alternativtext, damit Screenreader dessen Zweck wiedergeben können.",
        "tip": "Fügen Sie der Eingabe ein aussagekräftiges Alt- oder ARIA-Attribut (aria-label oder aria-labelledby) hinzu, das den Inhalt und Zweck dieses Bildes beschreibt."
    },
    "EA-R34": {
        "content": "Reset-Button ist nicht empfohlen",
        "explanation": "Die Verwendung von Reset-Buttons ist nicht empfohlen, da diese leicht aus Versehen geklickt werden können.",
        "tip": "Entfernen Sie den Reset Knopf falls möglich."
    },
    "EA-R35": {
        "content": "Formularfeld hat keinen zugänglichen Namen",
        "explanation": "Ein Formularfeld benötigt einen zugänglichen Namen, damit Screenreader dessen Zweck wiedergeben können. Dazu gehören <input>- und <select>-Elemente oder unter anderen Elemente mit der Rolle \"checkbox\", \"listbox\", \"searchbox\", \"spinbutton\" oder \"textbox\".",
        "tip": "Erstellen Sie einen <label>-Element für <input>- oder <select>-Elemente oder ARIA-Attribute für Elemente mit einem role-Attribut. Die Beschreibung sollte den Zweck des Formularfeldes beschreiben. Achten Sie bei der Verwendung eines <label> darauf, dass das for-Attribut mit der eindeutigen Id des Feldes übereinstimmt."
    },
    "EA-R36": {
        "content": "Button hat keinen zugänglichen Namen",
        "explanation": "Ein <button> oder ein <input> mit type=\"button\" benötigt einen zugänglichen Namen, damit Screenreader dessen Zweck wiedergeben können.",
        "tip": "Fügen Sie einen Text im button-Element ein oder geben sie dem button ein gültiges ARIA-Attribut (z.B. aria-label oder aria-labelledby)."
    },
    "EA-R38": {
        "content": "Area-Element hat keinen Alternativtext",
        "explanation": "Area-Elemente kennzeichnen Bereiche innerhalb einer Bildkarte mit denen klickbare Bereiche definiert werden können. Diese benötigen deshalb einen zugänglichen Namen, damit Screenreader deren Zweck wiedergeben können.",
        "tip": "Fügen Sie dem Area-Element einen zugänglichen Namen z.B über das Alt-Attribut hinzu."
    },
    "EA-R39": {
        "content": "Body mit aria-hidden versteckt",
        "explanation": "Das Body-Element enthält das Attribut aria-hidden: \"true\" und die Seite ist somit nicht für Screen-Reader erreichbar.",
        "tip": "Entfernen Sie das Aria-Hidden Attribut des Body-Elements."
    },
    "EA-R40": {
        "content": "<select> hat keinen zugänglichen Namen",
        "explanation": "<select>-Elemente müssen einen zugänglichen Namen besitzen, damit Screenreader deren Zweck wiedergeben können.",
        "tip": "Beschreiben Sie den Zweck der Auswahlliste mit einem <label> Element oder ARIA-Attributen."
    },
    "EA-R41": {
        "content": "Accesskey-Attribut nicht eindeutig",
        "explanation": "Mit dem Accesskey-Attribut kann ein Zeichen auf der Tastatur bestimmt werden, das der Anwender drücken kann, um Elemente direkt anzuspringen. Eine doppelte Vergabe ist hierbei nicht zulässig und führt zu unerwarteten Verhalten.",
        "tip": "Ändern Sie das Access-Key-Attribut, sodass es dieses nur einmalig auf der Seite gibt."
    },
    "EA-R42": {
        "content": "Leeres Table-Head-Element",
        "explanation": "Das Table-Head-Element in einer Tabelle beschreibt den Sinn der jeweiligen Spalte. Ohne sichtbaren Text ist der Zweck der Zeile oder Spalte sowohl für sehende als auch für Screenreader-Nutzer unklar.",
        "tip": "Fügen Sie einen sichtbaren Text-Inhalt ein, der die Daten in der Spalte beschreibt."
    },
    "EA-R43": {
        "content": "Leere Überschrift",
        "explanation": "Diese Überschrift beinhaltet keinen Text und kann von Screenreadern erreicht, aber nicht wiedergegeben werden.",
        "tip": "Fügen Sie einen Text hinzu oder entfernen Sie die Überschrift."
    },
    "EA-R44": {
        "content": "Überschrift hat keinen Inhalt",
        "explanation": "Diese Regel prüft, dass jede Überschrift einen nicht leeren zugänglichen Namen hat und für Screenreader sichtbar ist. Screenreader informieren die Benutzer über das Vorhandensein einer Überschrift. Wenn die Überschrift leer oder der Text versteckt ist, könnte dies die Benutzer entweder verwirren oder sie sogar davon abhalten, auf die Informationen über die Struktur der Seite zuzugreifen.",
        "tip": "Prüfen Sie, ob die Überschrift einen Inhalt hat. Möglicherweise ist der Inhalt auch über aria-hidden=\"true\" oder display=\"none\" versteckt."
    },
    "EA-R45": {
        "content": "Absatz mit zu geringem Zeilenabstand",
        "explanation": "Die Zeilenhöhe des Absatzes (<p>) ist kleiner als 1,5. Dies kann die Lesbarkeit des Textes beeinträchtigen.",
        "tip": "Erhöhen Sie die Zeilenhöhe des Absatzes auf mindestens 1.5"
    },
    "EA-R46": {
        "content": "!important Zeichenabstand in Style-Attribut",
        "explanation": "Diese Regel prüft, dass das style-Attribut nicht durch die Verwendung von !important verhindert, dass der Zeichenabstand angepasst werden kann. Es sei denn, er beträgt mindestens das 0,12-fache der Schriftgröße. Die Verwendung von !important in den style-Attributen verhindert, dass dieser Stil überschrieben wird.",
        "tip": "Verwenden Sie nach Möglichkeit kein !important im Style-Attribut oder stellen Sie sicher, dass der Zeichenabstand mindestens das 0,12-fache der Schriftgröße beträgt."
    },
    "EA-R47": {
        "content": "!important Wortabstand in Style-Attribut",
        "explanation": "Diese Regel prüft, dass das style-Attribut nicht durch die Verwendung von !important verhindert, dass der Wortabstand angepasst werden kann. Es sei denn, er beträgt mindestens das 0,16-fache der Schriftgröße. Die Verwendung von !important in den style-Attributen verhindert, dass dieser Stil überschrieben wird.",
        "tip": "Verwenden Sie nach Möglichkeit kein !important im Style-Attribut oder stellen Sie sicher, dass der Wortabstand mindestens das 0,16-fache der Schriftgröße beträgt."
    },
    "EA-R48": {
        "content": "!important Zeilenabstand in Style-Attribut",
        "explanation": "Diese Regel prüft, dass das style-Attribut nicht durch die Verwendung von !important verhindert, dass der Zeilenabstand angepasst werden kann. Es sei denn, er beträgt mindestens das 1,5-fache der Schriftgröße. Die Verwendung von !important in den style-Attributen verhindert, dass dieser Stil überschrieben wird.",
        "tip": "Verwenden Sie nach Möglichkeit kein !important im Style-Attribut oder stellen Sie sicher, dass der Zeilenabstand mindestens das 1,5-fache der Schriftgröße beträgt."
    },
    "EA-R49": {
        "content": "<audio> oder <video> Element spielt automatisch Ton ab",
        "explanation": "Automatisch abgespielte Audio- oder Videodateien dürfen nicht länger als 3 Sekunden dauern oder müssen über einen Kontrollmechanismus gestoppt oder stummgeschaltet werden können.",
        "tip": "Spielen Sie Ton nicht automatisch ab oder stellen Sie sicher, dass ein Kontrollmechanismus zum Anhalten oder Stummschalten vorhanden ist.",
        "exception": "Stellen Sie sicher, dass es entweder am Anfang der Seite oder in den Zugänglichkeitsfunktionen einen Mechanismus gibt, der Ihnen dies ermöglicht: den Ton zu pausieren oder zu stoppen oder die Lautstärke unabhängig von der Gesamtlautstärke des Systems zu regeln."
    },
    "EA-R50": {
        "content": "Ungültige Sprache im HTML hinterlegt",
        "explanation": "Die im <html>-Element hinterlegte Sprache muss ein gültiger Sprachcode sein und dem BCP 47 Standard entsprechen. Beispiele sind \"de\" oder \"en-us\".",
        "tip": "Stellen Sie sicher, dass ein gültiger Sprachcode als Lang-Attribut des <html>-Elements hinterlegt ist."
    },
    "EA-R51": {
        "content": "Lang und xml:lang Attribute stimmen nicht überein",
        "explanation": "Die Attribute lang und xml:lang auf dem <html>-Element einer nicht eingebetteten HTML-Seite müssen denselben primären Sprachcode haben.",
        "tip": "Stellen Sie sicher, dass die Attribute lang und xml:lang des <html>-Elements übereinstimmen."
    },
    "EA-R52": {
        "content": "<iframe>-Elemente mit identischen zugänglichen Namen",
        "explanation": "<iframe>-Elemente mit identischen zugänglichen Namen sollten vermieden werden oder die gleiche Ressource oder gleichwertige Ressourcen einbetten. Die Verwendung desselben zugänglichen Namens kann für Benutzer von Screenreadern verwirrend sein.",
        "tip": "Stellen Sie sicher, dass <iframe>-Elemente einen eindeutigen zugänglichen Namen haben oder zur gleichen Ressource führen."
    },
    "EA-R53": {
        "content": "<iframe> hat negativen Tabindex",
        "explanation": "<iframe>-Elemente mit einem negativen tabindex-Attribut dürfen keine interaktiven Elemente enthalten. Wenn der Wert des tabindex-Attributs eines <iframe>-Elements auf -1 oder eine andere negative Zahl gesetzt wird, wird es unmöglich, den Fokus in den Kontext des <iframe>-Elements zu setzten.",
        "tip": "Entfernen Sie den negativen Tabindex, wenn der <iframe> fokussierbare Elemente enthält."
    },
    "EA-R54": {
        "content": "Meta viewport verhindert Zoom",
        "explanation": "Die Verwendung von <meta name=\"viewport\">-Elementen kann die Zoom-Möglichkeiten des Nutzers einschränken, insbesondere auf mobilen Geräten. Das Zoomen ist ein übliches und erwartetes \"erlaubtes\" Verhalten auf Webseiten, so dass die Deaktivierung des Zoomens das Nutzererlebnis beeinträchtigt insbesondere für Nutzer mit Seheinschränkungen.",
        "tip": "Entfernen Sie die Attribute user-scalable und maximum-scale. Andernfalls stellen Sie sicher, dass das Attribut-Content nicht user-scalable auf \"no\" setzt und dass die Eigenschaft maximum-scale mindestens 2 beträgt."
    },
    "EA-R55": {
        "content": "Tabellenkopf sind keine Datenzellen zugeordnet",
        "explanation": "Diese Regel prüft, dass jedem Tabellenkopf <th> Zellen in einem Tabellenelement <td> zugeordnet sind. Wenn Tabellen nicht ordnungsgemäß gekennzeichnet sind, kann dies zu einer verwirrenden oder ungenauen Screenreader-Ausgabe führen.",
        "tip": "Entfernen Sie Tabellenkopfzellen, denen keine Zellen zugeordnet sind, oder ordnen Sie Zellen dem Kopf zu."
    },
    "EA-R56": {
        "content": "Undefiniertes ARIA-Attribut",
        "explanation": "Diese Regel überprüft, ob jedes vorhandene aria-* Attribut in <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA 1.1</a> definiert ist. Ungültige oder falsch geschriebene ARIA-Attribute werden von Screenreadern nicht erfasst.",
        "tip": "Prüfen Sie, ob das ARIA-Attribut eventuell falsch geschrieben ist und dass es in der <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA-Spezifikation</a> existiert. Stellen Sie sicher, dass Sie nur gültige ARIA-Attribute verwenden."
    },
    "EA-R57": {
        "content": "ARIA-Wert oder -Attribut nicht unterstützt",
        "explanation": "Diese Regel überprüft, ob <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria/\">WAI-ARIA</a>-Werte oder -Attribute für das Element, für das sie angegeben sind, zulässig sind. Die ARIA-Werte oder -Attribute sollten immer der offiziellen Spezifikation entsprechen. Andernfalls können diese ignoriert oder falsch interpretiert werden.",
        "tip": "Entfernen Sie nicht spezifizierte WAI-ARIA-Werte oder -Attribute oder korrigieren Sie diese auf den korrekten Wert."
    },
    "EA-R58": {
        "content": "ARIA-Wert nicht zulässig",
        "explanation": "Diese Regel überprüft, dass die Werte von <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA-Zuständen oder -Attributen</a> zulässig sind. Die ARIA-Zustände oder -Attribute müssen der offiziellen Spezifikation entsprechen, andernfalls werden diese nicht von Assistenzsoftware erkannt.",
        "tip": "Entfernen Sie nicht spezifizierte Werte von WAI-ARIA-Zuständen oder -Attributen oder korrigieren Sie diese auf den korrekten Wert."
    },
    "EA-R59": {
        "content": "Das Autocomplete-Attribut ist ungültig",
        "explanation": "Diese Regel gilt für alle HTML-<input>, <select> und <textarea>-Elemente mit einem Wert für das Attribut \"autocomplete\". Das Autocomplete-Attribut benötigt einen korrekten Wert, um vom Browser und Screenreadern erkannt zu werden.",
        "tip": "Stellen Sie sicher, dass <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete\">der Autocomplete-Wert</a> unterstützt wird."
    },
    "EA-R60": {
        "content": "<td>-Element (Datenzelle) ist kein Tabellenkopf zugeordnet",
        "explanation": "Diese Regel prüft, ob jeder Datenzelle <td> einem Tabellenkopf <th> zugeordnet ist.",
        "tip": "Fügen Sie jeder Datenzelle <td> einen Tabellenkopf <th> hinzu."
    },
    "EA-R61": {
        "content": "Seite hat keine Überschriften",
        "explanation": "Das Dokument enthält keine Überschriften. Überschriften strukturieren eine Website und helfen Screenreader Nutzern bei der Navigation und dem Verständnis des Inhalts.",
        "tip": "Prüfen Sie, ob Überschriften hinzugefügt werden können, um der Website Struktur zu geben. Achten Sie darauf, dass alle Überschriften korrekt mit den Tags <h1>-<h6> oder mit role=\"heading\" gekennzeichnet sind."
    },
    "EA-R62": {
        "content": "Element hat versteckte fokussierbare Kindelemente",
        "explanation": "Diese Regel prüft, dass Elemente mit einer Rolle, die ihre Kindelemente als dekorativ kennzeichnet, keine fokussierbaren Elemente, wie Links, Buttons oder Inputs, enthalten. Solche Elemente sind beispielsweise vom Typ <button>, checkbox oder <img>. Die Kindelemente dieser Elemente werden von Hilfstechnologien nicht korrekt erkannt und erzeugen einen leeren Tab-Stopp.",
        "tip": "Fügen Sie keine fokussierbaren Elemente als Kinder von Elementen mit einer Rolle hinzu, die ihre Kinder automatisch als dekorativ kennzeichnet z.B. ein <button> oder role=\"checkbox\"."
    },
    "EA-R63": {
        "content": "Dekoratives Element ist fokussierbar",
        "explanation": "Diese Regel prüft, ob als dekorativ gekennzeichnete Elemente entweder nicht Teil des \"accessibility tree\" sind oder eine Präsentationsfunktion haben. Die Kennzeichnung eines Elements als dekorativ verbirgt es vor Hilfsmitteln, aber die Fokussierbarkeit macht es sichtbar. Außerdem können einige Elemente wie <nav> keine dekorative Rolle haben, wenn sie einen zugänglichen Namen besitzen, z.B. durch ein Aria-Label. Dieser Konflikt sollte vermieden werden.",
        "tip": "Prüfen Sie, ob das Element als dekorativ gekennzeichnet werden muss, oder verbergen Sie es vor Hilfsmitteln, z.B. mit aria-hidden=\"true\" oder role=\"presentation\". Entfernen Sie in diesem Fall auch alle Aria-Label Attribute."
    },
    "EA-R64": {
        "content": "Eltern-Element fehlt erforderliches Kind-Element",
        "explanation": "Einige Elemente mit einer expliziten semantischen Rolle müssen mindestens eines ihrer erforderlichen Kind-Elemente haben. Zum Beispiel muss ein Element mit der Rolle \"list\" Elemente mit der Rolle \"listitem\" besitzen. Wird diese Anforderung nicht erfüllt, kann das Element selbst ungültig werden.",
        "tip": "Prüfen Sie, ob die Rolle des Elements korrekt verwendet wurde, oder stellen Sie sicher, dass die erforderlichen Kind-Elemente vorhanden sind."
    },
    "EA-R65": {
        "content": "Erforderliches Eltern-Element fehlt",
        "explanation": "Einige Elemente mit einer expliziten semantischen Rolle müssen ein bestimmtes übergeordnetes Elternelement haben. Zum Beispiel braucht ein Element mit der Rolle \"listitem\" einen übergeordneten Knoten mit der Rolle \"list\". Wird diese Anforderung nicht erfüllt, ist das Element selbst ungültig.",
        "tip": "Prüfen Sie, ob die Rolle des Elements korrekt verwendet wurde, oder stellen Sie sicher, dass Sie den erforderlichen Elternknoten und Rolle verwenden."
    },
    "EA-R66": {
        "content": "Aria-Hidden Element hat fokussierbaren Inhalt",
        "explanation": "Durch Hinzufügen von aria-hidden=\"true\" zu einem Element werden das Element selbst und alle seine Kinder vor Hilfstechnologien verborgen. Wenn das Element dennoch Teil der Tabnavigation ist, kann dies zu Verwirrung bei Nutzern von Hilfstechnologien führen, da das Element zwar erreicht werden kann, aber verborgen sein sollte.",
        "tip": "Prüfen Sie, ob das Element für Hilfsmittel versteckt werden muss, oder entfernen Sie es gegebenenfalls aus der Tabnavigation. Für das Entfernen aus der Tabnavigation fügen Sie das Attribut tabindex=\"-1\", den Style \"disabled:none\" oder das disabled-Attribut hinzu."
    },
    "EA-R67": {
        "content": "Schriftgröße ist sehr klein",
        "explanation": "Diese Regel prüft, dass Schriftgrößen auf der Seite größer als 9 Pixel sind. Kleine Schriftgrößen sind nicht gut lesbar und sollten nach Möglichkeit vermieden werden.",
        "tip": "Prüfen Sie, ob die Schriftgröße auf mindestens 10px erhöht werden kann. Im Allgemeinen wird für normalen Text eine Schriftgröße von 16 px oder mehr empfohlen."
    },
    "EA-R68": {
        "content": "Fehlender zugänglicher Name für Gruppe",
        "explanation": "Die Gruppierung zusammengehöriger Steuerelemente macht Formulare für alle Benutzer verständlicher, da zusammengehörige Steuerelemente leichter zu identifizieren sind. Damit assistive Technologien den Zweck einer Gruppe korrekt identifizieren können, braucht sie einen zugänglichen Namen, z. B. mit einer <legend> für ein <fieldset> oder ARIA-Attribute für Elemente mit role=\"group\" oder \"menubar\".",
        "tip": "Stellen Sie sicher, dass jede Gruppe einen zugänglichen Namen hat, indem Sie ARIA-Attribute wie aria-label oder ein <legend>-Element für ein <fieldset> verwenden."
    },
    "EA-R69": {
        "content": "Headers-Attribut einer Zelle verweist auf fehlende Zelle",
        "explanation": "Das Attribut <a target=\"_blank\" href=\"https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/H43\">headers</a> gibt eine oder mehrere Überschriftenzellen an, auf die sich eine Tabellenzelle bezieht. Es wird nur von Screenreadern verwendet. Diese Regel prüft, ob das Attribut \"headers\" einer Zelle auf eine entsprechende Zelle derselben Tabelle verweist. Wenn Tabellen nicht ordnungsgemäß gekennzeichnet sind, kann dies zu einer verwirrenden oder ungenauen Screenreader-Ausgabe führen.",
        "tip": "Prüfen Sie, ob es in derselben Tabelle eine andere Zelle mit der ID des Wertes des \"headers\"-Attributs gibt. Andernfalls löschen Sie entweder das \"headers\"-Attribut  oder erstellen SIe eine entsprechende Zelle mit dieser ID."
    },
    "EA-R70": {
        "content": "Dekoratives Element ist nicht versteckt",
        "explanation": "Diese Regel prüft, ob als dekorativ gekennzeichnete Elemente entweder nicht Teil des \"accessibility tree\" sind oder eine Präsentationsfunktion haben. Die Kennzeichnung eines Elements als dekorativ verbirgt es vor Hilfsmitteln, aber die Fokussierbarkeit oder das Hinzufügen von ARIA Attributen kann es sichtbar machen. Dieser Konflikt sollte vermieden werden.",
        "tip": "Prüfen Sie, ob das Element als dekorativ gekennzeichnet werden muss, oder verbergen Sie es vor Hilfsmitteln, z.B. mit aria-hidden=\"true\" oder role=\"presentation\""
    },
    "EA-R71": {
        "content": "Ungültiger Sprachcode hinterlegt",
        "explanation": "Teile der Webseite können über das lang-Attribut als anderssprachig markiert werden. Die hier hinterlegte Sprache muss ein gültiger Sprachcode sein und dem BCP 47 Standard entsprechen. Beispiele sind \"de\" oder \"en-us\".",
        "tip": "Stellen Sie sicher, dass ein gültiger Sprachcode als Lang-Attribut des Elements hinterlegt ist."
    },
    "EA-R72": {
        "content": "Link nicht vom umgebenden Text unterscheidbar",
        "explanation": "Diese Regel prüft, ob sich eingebettete Links vom umgebenden Text nicht allein durch die Farbe unterscheiden. Links können z. B. durch ein Unterstreichen des Textes oder durch einen Rahmen hervorgehoben werden. Hover- und Fokus-Zustände werden ebenfalls überprüft.",
        "tip": "Achten Sie darauf, dass sich der Link vom umgebenden Text nicht nur durch Farbe abhebt, auch wenn Sie den Mauszeiger über den Link bewegen oder ihn fokussieren."
    },
    "EA-R73": {
        "content": "Menüpunkt fehlt zugänglicher Name",
        "explanation": "Diese Regel prüft, ob jedes Element mit einer menuitem-Rolle einen nicht leeren zugänglichen Namen hat. Die menuitem-Rolle zeigt an, dass das Element eine Option in einer Reihe von Auswahlmöglichkeiten ist, die in einem Menü (role=\"menu\") oder einer Menüleiste (role=\"menubar\") enthalten sind.",
        "tip": "Fügen Sie einen zugänglichen Namen über den Inhalt des Elements oder über ARIA Attribute hinzu."
    },
    "EA-R74": {
        "content": "Die Ausrichtung der Seite ist eingeschränkt",
        "explanation": "Mit dieser Regel wird überprüft, dass der Seiteninhalt nicht durch die CSS-Eigenschaft transform auf eine einzige Ausrichtung im Hoch- oder Querformat beschränkt ist. Elemente, die auf eine bestimmte Drehung festgelegt sind, indem die CSS-Eigenschaft \"orientation media\" mit dem Wert \"landscape\" oder \"portrait\" verwendet wird, können auf mobilen Geräten möglicherweise nicht korrekt gedreht werden.",
        "tip": "Vergewissern Sie sich, dass sich alle Elemente auf der Website beim Wechsel vom Hoch- zum Querformat richtig gedreht werden."
    },
    "EA-R75": {
        "content": "Gesamter Absatz ist kursiv",
        "explanation": "Die Verwendung von kursivem Text zur Hervorhebung wichtiger Inhalte ist zwar gut, aber bei längeren Textabschnitten sollte man kursiven Text vermeiden. Insbesondere für Menschen mit Legasthenie kann kursiver Text schwerer zu lesen sein.",
        "tip": "Vermeiden Sie größere kursive Textabschnitte und verwenden Sie kursive Schrift nur zur Hervorhebung wichtiger Inhalte."
    },
    "EA-R76": {
        "content": "Gesamter Absatz ist in Großbuchstaben",
        "explanation": "Die Verwendung von Großbuchstaben zur Hervorhebung wichtiger Inhalte ist zwar gut, aber bei längeren Textabschnitten sollte man Großbuchstaben vermeiden. Insbesondere für Menschen mit Legasthenie können Großbuchstaben schwerer zu lesen sein. Es kann auch passieren, dass Screenreader jeden Buchstaben einzeln vorlesen.",
        "tip": "Vermeiden Sie größere Textabschnitte mit ausschließlich Großbuchstaben und verwenden Sie Großbuchstaben nur zur Hervorhebung wichtiger Inhalte."
    },
    "EA-R77": {
        "content": "Textabschnitt in Blocksatz",
        "explanation": "Menschen mit bestimmten kognitiven Behinderungen haben Probleme beim Lesen von Text, der sowohl links- als auch rechtsbündig ausgerichtet ist. Die ungleichmäßigen Abstände zwischen den Wörtern in vollbündigen Text können das Lesen erschweren und in manchen Fällen unmöglich machen.",
        "tip": "Vermeiden Sie eine Blocksatzausrichtung in längeren Textabschnitten."
    },
    "EA-R78": {
        "content": "Inhalt nicht in Seitenregion enthalten",
        "explanation": "<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html\">Seitenregionen</a> kennzeichnen inhaltliche Abschnitte einer Seite. Es empfiehlt sich, den gesamten Inhalt der Seite in Seitenregionen (eng. \"landmarks\") zu strukturieren. Dadurch können Benutzer von Screenreadern leicht von einem Abschnitt zum Anderen navigieren, ohne den Überblick über den Inhalt zu verlieren. Beispiele für Regionen sind Header, Nav, Footer oder Main. Native HTML5-Landmarken wie &lt;nav&gt; werden gegenüber der Verwendung von ARIA-Rollen wie role=\"nav\" empfohlen.",
        "tip": "Fügen Sie alle Textinhalte in bestehende Seitenregionen hinzu oder erstellen Sie neue Regionen. Hier finden Sie einen Überblick über <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/HTML5.html\">HTML Seitenregionen</a>."
    },
    "EA-R79": {
        "content": "Verzögerung in <meta>-Element erkannt",
        "explanation": "Diese Regel prüft, dass das <meta>-Element nicht für eine verzögerte Umleitung oder Aktualisierung verwendet wird. Da Benutzer nicht erwarten, dass eine Seite automatisch aktualisiert wird, kann eine solche Aktualisierung verwirrend sein. Wenn eine Aktualisierung oder Umleitung verwendet wird, muss das content-Attribut des <meta>-Elements entweder 0 oder größer als 72000 (20 Stunden) sein.",
        "tip": "Verwenden Sie keine verzögerten Aktualisierungen oder Weiterleitungen. Bieten Sie alternativ eine Funktion an, mit der der Benutzer den Timer einstellen kann."
    },
    "EA-R80": {
        "content": "Verzögerung in <meta>-Element erkannt (AAA)",
        "explanation": "Diese Regel prüft, dass das <meta>-Element nicht für eine verzögerte Umleitung oder Aktualisierung verwendet wird. Wenn eine Aktualisierung oder Umleitung verwendet wird, muss der Wert des Attributs content des <meta>-Elements 0 sein, ohne Ausnahmen.",
        "tip": "Verwenden Sie keine verzögerten Aktualisierungen oder Weiterleitungen und setzten Sie die Verzögerung auf 0."
    },
    "EA-R81": {
        "content": "Fehlender zugänglicher Name für Region",
        "explanation": "Die \"region\"-Rolle wird verwendet, um Dokumentbereiche zu identifizieren, die der Autor der Webseite für wichtig hält. Jede Region benötigt einen zugänglichen Namen, damit Benutzer von Screenreadern deren Inhalt und Zweck erkennen können.",
        "tip": "Fügen Sie der Region mithilfe von ARIA-Attributen einen zugänglichen Namen hinzu."
    },
    "EA-R82": {
        "content": "Element hat ungültige Rolle",
        "explanation": "Diese Regel prüft, ob jedes Rollenattribut einen gültigen Wert gemäß den <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles\">WAI-ARIA Spezifikationen</a> hat. Veraltete Rollen werden ebenfalls überprüft.",
        "tip": "Überprüfen Sie das Rollenattribut auf Rechtschreibfehler und ob die Rolle in der Spezifikation existiert."
    },
    "EA-R83": {
        "content": "Scrollbares Element ist nicht über die Tastatur zugänglich",
        "explanation": "Diese Regel prüft, ob scrollbare Elemente mit der Tastatur gescrollt werden können. Um sicherzustellen, dass es ein Element gibt, von dem aus die Pfeiltasten zur Steuerung der Scrollposition verwendet werden können, muss der Fokus auf oder in einem Kindelement liegen können.",
        "tip": "Stellen Sie sicher, dass jedes scrollbare Element oder eines seiner untergeordneten Elemente fokussierbar ist."
    },
    "EA-R84": {
        "content": "Sichtbare Bezeichnung nicht Teil des zugänglichen Namens",
        "explanation": "Diese Regel prüft, dass interaktive Elemente wie Buttons oder Links ihre gesamte sichtbare Bezeichnung als Teil ihres zugänglichen Namens haben, z. B. bei der Verwendung von aria-label. Dies ist besonders wichtig für Nutzer, die die Website per Spracheingabe steuern. Andernfalls kann die Spracheingabe nicht korrekt interpretiert werden und funktioniert möglicherweise nicht. Zusätzlicher Kontext, der nicht Teil des sichtbaren Namens ist, kann durch aria-describedby hinzugefügt werden.",
        "tip": "Stellen Sie sicher, dass das gesamte sichtbare Label (nicht nur ein Teil) im zugänglichen Namen (gesetzt durch z.b. aria-label) enthalten ist."
    },
    "EA-R85": {
        "content": "Textkontrast nicht ausreichend (erhöht)",
        "explanation": "Dies ist eine AAA-Verschärfung der Kontrastregel. Im Allgemeinen muss die visuelle Darstellung von Text ein Mindestkontrast&shy;verhältnis mit dessen Hintergrund einhalten, damit dieser gut wahrgenommen werden kann. Der Mindestkontrast ist abhängig von der Textgröße und liegt für die AAA-Anforderung bei 7:1 oder 4.5:1 für größere Texte.",
        "tip": "Erhöhen Sie den Kontrast, z.B. durch eine dunklere/hellere Schriftfarbe oder Hintergrundfarbe. Eine Hilfe bietet der <a target=\"_blank\" href=\"https://dashboard.eye-able.com/tools/contrast-check\">Kontrastchecker von Eye-Able</a> im Dashboard unter Tool."
    },
    "EA-R86": {
        "content": "ARIA Meter-Element hat keinen zugänglichen Namen",
        "explanation": "Das Meter-Element repräsentiert einen skalaren Wert z. B. wie viel Speicherplatz belegt ist. Ein Element mit der Rolle \"meter\" muss einen zugänglichen Namen haben, damit Screenreader-Nutzer seinen Inhalt und Zweck erkennen können.",
        "tip": "Fügen Sie dem Meter einen zugänglichen Namen hinzu, indem Sie ein title, aria-label oder aria-labelledby Attribut verwenden."
    },
    "EA-R87": {
        "content": "ARIA Fortschrittsanzeige hat keinen zugänglichen Namen",
        "explanation": "Ein Fortschrittsanzeige-Element zeigt den aktuellen Fortschritt eines im Hintergrund ablaufenden Prozesses. Ein Element mit der Rolle \"progressbar\" muss einen zugänglichen Namen haben, damit Screenreader-Nutzer seinen Inhalt und Zweck erkennen können.",
        "tip": "Fügen Sie der Fortschrittsanzeige einen zugänglichen Namen hinzu, indem Sie ein title, aria-label oder aria-labelledby Attribut verwenden."
    },
    "EA-R88": {
        "content": "Fehlendes ARIA-Braille Äquivalent",
        "explanation": "Diese Prüfung stellt sicher, dass es eine Nicht-Braille-Darstellung für jedes aria-braillelabel und aria-brailleroledescription Attribut gibt. Ohne eine zugehörige Beschriftung oder Beschreibung werden Braille-Attribute nach ARIA Spezifikation ignoriert.",
        "tip": "Stellen Sie sicher, dass Sie ein Nicht-Braille-Äquivalent für Braille-ARIA-Attribute bereitstellen. Verwenden Sie beispielsweise aria-label oder aria-labelledby Attribute."
    },
    "EA-R89": {
        "content": "ARIA-Button, -Link oder -Menüpunkt ohne zugänglichen Namen",
        "explanation": "Es ist wichtig, dass jede ARIA-Button (role=\"button\"), jeder Link (role=\"link\") und jedes Menüelement (role=\"menuitem\") einen Namen hat, der von assistiven Technologien gelesen werden kann.",
        "tip": "Stellen Sie sicher, dass jede ARIA-Button, jeder Link und jedes Menüelement einen beschreibenden und zugänglichen Namen hat. Sie können einen Textinhalt, ein aria-label oder aria-labelledby Attribut verwenden."
    },
    "EA-R90": {
        "content": "ARIA-Rolle hat fehlende Attribute",
        "explanation": "Um korrekt mit assistiven Technologien zu funktionieren, müssen Elemente mit ARIA-Rollen über ihre erforderlichen ARIA-Attribute verfügen. Andernfalls werden diese Elemente von assistiven Technologien nicht korrekt ausgegeben.",
        "tip": "Fügen Sie die fehlenden erforderlichen ARIA-Attribute hinzu. Für mehr Informationen zu den erforderlichen Attributen prüfen Sie die <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#states_and_properties\">ARIA Spezifikation</a>."
    },
    "EA-R91": {
        "content": "ARIA-Tooltip hat keinen zugänglichen Namen",
        "explanation": "Jedes ARIA-Tooltip-Element (role=\"tooltip\") muss einen zugänglichen Namen haben, der seinen Zweck oder seine Funktion für Benutzer von Assistenztechnik beschreibt.",
        "tip": "Stellen Sie sicher, dass jeder ARIA-Tooltip einen zugänglichen Namen hat, der dessen Inhalt und Zweck gut beschreibt. Dieser kann durch einen sichtbaren inneren Text oder Attribute wie aria-label oder aria-labelledby festgelegt werden."
    },
    "EA-R92": {
        "content": "<blink> Element ist veraltet",
        "explanation": "Das <blink>-Element bewirkt, dass jeder Text innerhalb des Elements in einer bestimmten Geschwindigkeit blinkt. Dies kann weder vom Benutzer unterbrochen noch als Voreinstellung deaktiviert werden. Daher erfüllen Inhalte, die blink verwenden, das Erfolgskriterium nicht, da das Blinken länger als drei Sekunden andauern kann.",
        "tip": "Entfernen Sie alle <blink>-Elemente aus Ihrem Webseite."
    },
    "EA-R93": {
        "content": "Fehlende Möglichkeit zur Umgehung von Inhaltsblöcken",
        "explanation": "Die Bereitstellung von Möglichkeiten, sich wiederholende Inhalte zu überspringen, hilft den Benutzern, effektiver auf der Website zu navigieren. Diese Regel schlägt fehl, wenn die Seite weder einen internen Sprungmarke, noch eine Überschrift oder eine Region besitzt.",
        "tip": "Die Verwendung geeigneter <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/\">Orientierungselemente</a> wie &lt;nav&gt;, &lt;main&gt; oder &lt;footer&gt;, <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">Überschriften</a> oder <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">interner Sprungmarken</a> können Nutzern helfen, effektiver auf Ihrer Website zu navigieren."
    },
    "EA-R94": {
        "content": "Inkorrekte <dl>-Element Struktur",
        "explanation": "Eine Definitionsliste (<dl>) enthält eine Liste von Begriffsgruppen (mit <dt>-Elementen) und Beschreibungen (mit <dd>-Elementen), um beispielsweise ein Glossar anzuzeigen. Eine Definitionsliste darf nur <dt>-, <dd>-, <template>-, <script>- oder <div>-Elemente in der richtigen Reihenfolge enthalten.",
        "tip": "Stellen Sie sicher, dass Ihre Definitionsliste nur die Elemente <dt>, <div> und <dd> enthält. Stellen Sie außerdem sicher, dass sie richtig angeordnet sind. Vor <dd>-Elementen sollte immer ein <dt> Element stehen."
    },
    "EA-R95": {
        "content": "<dt>- oder <dd>-Element nicht von <dl> umgeben",
        "explanation": "Die Elemente „description term“ <dt> und „description details“ <dd> müssen immer von einer Definitionsliste <dl> umschlossen sein, andernfalls ist die Definitionsliste ungültig. In diesem Fall können Assistenztechniken die Definitionsliste möglicherweise nicht richtig erkennen.",
        "tip": "Stellen Sie sicher, dass das Elternelement von <dt> oder <dd> Elementen eine Definitionsliste <dl> oder ein <div>, das ein Kindelement von einer <dl> ist, ist."
    },
    "EA-R96": {
        "content": "Formularfeld hat mehrere Beschriftungen",
        "explanation": "Jedes Formularfeld sollte nur eine zugehörige Beschriftung (<label>) haben. Andernfalls kommt es zu Inkonsistenzen bei der Interpretation der Beschriftung durch verschiedene Assistenzsystem- und Browserkombinationen. Beschriftungen werden mit Formularfeldern über das for-Attribut des <label> und das id-Attribut des Formularfeldes verbunden.",
        "tip": "Stellen Sie sicher, dass jedes Formularfeld nur ein zugehöriges <Label> hat. Verwenden Sie die Id des Forumlarfelds um nach verbundenen Labeln zu suchen."
    },
    "EA-R98": {
        "content": "ARIA ID nicht eindeutig",
        "explanation": "Eine ID ist ein eindeutiger Identifikator für Elemente der Webseite und darf entsprechend nicht doppelt vorkommen. Dies ist vor allem bei ARIA-Elementen wichtig, da die id verwendet wird, um zugängliche Namen oder Beschreibungen zu verknüpfen. Doppelte IDs können dazu führen, dass Screenreader Elemente überspringen oder Labels nicht richtig zugeordnet werden.",
        "tip": "Ändern Sie die ID, sodass diese nur einmalig auf der Seite verwendet wird. Achten Sie darauf, dass Ihre ARIA-Elemente gültig bleiben."
    },
    "EA-R99": {
        "content": "Listen dürfen nur <li>-Elemente enthalten",
        "explanation": "Listen (<ul> oder <ol>) müssen korrekt strukturiert sein, damit sie von Assistenztechnik gelesen und korrekt angekündigt werden können. Eine Liste kann nur Listeneinträge <li>-, <script>- oder <template>-Elemente als direkte Kindelemente enthalten. Die Listeneinträge selbst können andere Elemente enthalten.",
        "tip": "Stellen Sie sicher, dass Ihr Liste (<ul> oder <ol>) nur Listeneinträge (<li>) als direkte Kindelemente hat."
    },
    "EA-R101": {
        "content": "Vermeiden Sie <marquee>-Elemente",
        "explanation": "Das <marquee>-Element erzeugt laufenden Text, der schwer zu lesen und anzuklicken ist. Das <marquee>-Element ist veraltet und kann zu Zugänglichkeits- und Benutzerfreundlichkeitsproblemen führen, insbesondere da es schwer or nicht pausierbar ist.",
        "tip": "Ersetzen Sie <marquee>-Elemente durch moderne CSS-Animationen oder andere Techniken."
    },
    "EA-R102": {
        "content": "Vermeiden Sie serverseitige Image-Maps",
        "explanation": "Serverseitige Image-Maps sind für Tastaturbenutzer nicht zugänglich, die mit Mausklicks auf verlinkte Inhalte zugreifen müssen. Dies macht das Bild unzugänglich für diejenigen, die ausschließlich mit einer Tastatur navigieren. Außerdem können für die interaktiven Bereiche einer serverseitigen Image-Map keine Textalternativen bereitgestellt werden, wie dies bei clientseitigen Image-Maps möglich ist.",
        "tip": "Verwenden Sie clientseitige Image-Maps oder andere interaktive Elemente für eine bessere Zugänglichkeit."
    },
    "EA-R104": {
        "content": "Berührungsziel ist zu klein",
        "explanation": "Touch- und Klick-Ziele müssen eine ausreichende Größe und einen ausreichenden Abstand haben, damit sie leicht aktiviert werden können, ohne unbeabsichtigt ein benachbartes Feld zu aktivieren. Die Touch-Ziele müssen mindestens 24 x 24 CSS-Pixel groß sein oder einen Abstand von mindestens 24px Abstand zu anderen Zielen haben. Große Touch-Ziele helfen, Bedienungsfehler zu vermeiden und sorgen für ein besseres Erlebnis für mobile Benutzer. Diese Regel ist abhängig von der Viewport Größe und Scroll-Position.",
        "tip": "Stellen Sie sicher, dass Ihr Touch-Ziel mindestens 24 x 24 CSS-Pixel groß ist oder einen Abstand von mindestens 24px zum nächsten Ziel hat. Es gibt eine Ausnahme, wenn es ein anderes Bedienelement gibt, das die gleiche Funktionalität bietet und die Mindestgröße erfüllt."
    },
    "EA-R105": {
        "content": "Stellen Sie sicher, dass geeignete Werte für das Rollenattribut vorhanden sind.",
        "explanation": "Ungeeignete Rollenwerte können Benutzer von Hilfstechnologien verwirren oder dazu führen, dass Elemente ignoriert werden.",
        "tip": "Überprüfen Sie, ob das Rollenattribut einen geeigneten Wert für das gegebene Element hat."
    },
    "EA-R106": {
        "content": "ARIA-Dialog hat keinen zugänglichen Namen",
        "explanation": "Benutzer von Screenreadern können den Zweck von ARIA-Dialogen (Elemente mit role=\"dialog\" oder role=\"alertdialog\") ohne zugänglichen Namen nicht verstehen. Ein zugänglicher Name gibt dem Dialog einen Inhalt, so dass Screenreader-Benutzer seinen Zweck und seine Funktion erfassen können.",
        "tip": "Stellen Sie sicher, dass der ARIA-Dialog einen zugänglichen Namen hat. Verwenden Sie dafür die Attribute aria-label oder aria-labelledby."
    },
    "EA-R107": {
        "content": "Stellen Sie die korrekte Verwendung von role=\"text\" sicher.",
        "explanation": "Die Rolle=\"text\" sollte für Elemente ohne fokussierbare Unterlemente verwendet werden, um Navigationsherausforderungen für Screenreader-Benutzer zu vermeiden.",
        "tip": "Verwenden Sie role=\"text\" für Elemente ohne fokussierbare Unterlemente."
    },
    "EA-R108": {
        "content": "ARIA-Treeitem hat keinen zugänglichen Namen",
        "explanation": "Ein Baum (role=\"tree\") ist eine hierarchische Liste mit Eltern- und Kindknoten, die auf- und zugeklappt werden können. Ein treeitem (role=\"treeitem\") ist ein Knoten in einem solchen Baum. Ohne einen zugänglichen Namen können Screenreader den Zweck des treeitem nicht erkennen.",
        "tip": "Weisen Sie dem treeitem einen zugänglichen Namen zu, indem Sie einen inneren Text, ein aria-label oder aria-labelledby verwenden."
    },
    "EA-R110": {
        "content": "Formularfeld hat kein sichtbares Label",
        "explanation": "Sichtbare Beschriftungen verbessern die Zugänglichkeit von Formularen, da sie für sehende Benutzer einen klaren Kontext bieten. Sich nur auf versteckte Beschriftungen, title oder aria-describedby zu verlassen, kann daher einschränkend sein. Die Attribute title und aria-describedby bieten zusätzliche Informationen wie Hinweise. Da Hinweise anders als Beschriftungen für Zugänglichkeits-APIs dargestellt werden, kann dies aber zu Problemen mit unterstützenden Technologien führen.",
        "tip": "Geben Sie eine sichtbare und eindeutige Beschriftung an. Verwenden Sie idealerweise ein <label>-Element. Wenn dies nicht möglich ist, kann auch aria-label oder aria-labelledby verwendet werden."
    },
    "EA-R111": {
        "content": "Banner-Region ist nicht auf der obersten Ebene",
        "explanation": "Mit <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">Regionen (eng. landmarks)</a> können blinde Nutzer, die einen Screenreader verwenden, zu bestimmten Abschnitten einer Webseite springen. Die Banner-Rolle (role=\"banner\") wird verwendet, um einen globalen Seitenkopf zu definieren, z.B. für eine Suchfunktion, die globale Navigation oder einen Slogan. Wenn die Banner-Rolle keine Top-Level-Region ist (und in einer anderen Region enthalten ist), definiert sie nicht den vordefinierten Kopfbereich des Layouts.",
        "tip": "Stellen Sie sicher, dass jede Banner-Region nicht in einer anderen Region enthalten ist."
    },
    "EA-R112": {
        "content": "Ergänzende Region ist nicht auf der obersten Ebene",
        "explanation": "Mit <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">Regionen (eng. landmarks)</a> können blinde Nutzer, die einen Screenreader verwenden, zu bestimmten Abschnitten einer Webseite springen. Komplementäre Inhalte wie &lt;aside&gt; oder role=\"complementary\" ergänzen den Hauptinhalt einer Seite. Benutzer von Screenreadern haben die Möglichkeit, ergänzende Inhalte zu überspringen, wenn sie auf der obersten Ebene der Seite erscheinen. Diese Option ist nicht verfügbar, wenn ein &lt;aside&gt;-Element in einer anderen Region einbettet ist.",
        "tip": "Stellen Sie sicher, dass jeder ergänzende Region (&lt;aside&gt; oder role=\"complementary\") nicht in einer anderen Region enthalten ist."
    },
    "EA-R113": {
        "content": "Contentinfo-Region ist nicht auf der obersten Ebene",
        "explanation": "Mit <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">Regionen (eng. landmarks)</a> können blinde Nutzer, die einen Screenreader verwenden, zu bestimmten Abschnitten einer Webseite springen. Die Rolle contentinfo (role=\"contentinfo\") definiert den Footer, der Informationen wie Copyright-Informationen, Navigationslinks und Datenschutzerklärungen enthält. Die Platzierung innerhalb eines anderen Landmarks kann verhindern, dass blinde Screenreader-Nutzer die Fußzeile schnell finden und zu ihr navigieren können.",
        "tip": "Stellen Sie sicher, dass die Contentinfo-Region (role=\"contentinfo\") nicht in einer anderen Region enthalten ist."
    },
    "EA-R114": {
        "content": "Main-Region ist nicht auf der obersten Ebene",
        "explanation": "Mit <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">Regionen (eng. landmarks)</a> können blinde Nutzer, die einen Screenreader verwenden, zu bestimmten Abschnitten einer Webseite springen. Das Main-Region (&lt;main role=\"main\"&gt;) wird verwendet, um den primären Inhalt eines Dokuments zu kennzeichnen. Die Main-Region sollte nicht in einer anderen Region enthalten ist.",
        "tip": "Stellen Sie sicher, dass die Main-Region (&lt;main role=\"main\"&gt;) nicht in einer anderen Region enthalten ist."
    },
    "EA-R115": {
        "content": "Mehr als eine Banner-Region vorhanden",
        "explanation": "Mit <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">Regionen (eng. landmarks)</a> können blinde Nutzer, die einen Screenreader verwenden, zu bestimmten Abschnitten einer Webseite springen. Mehrere Banner-Regionen können die Navigation von Screenreadern verwirren und machen es schwieriger, den Hauptkopf oder Einführungsinhalt zu erkennen.",
        "tip": "Stellen Sie sicher, dass jede HTML-Seite nur eine Banner-Region enthält. Entscheiden Sie, welche Banner-Region Sie behalten wollen und entfernen Sie alle anderen Regionen."
    },
    "EA-R116": {
        "content": "Mehr als eine Contentinfo-Region vorhanden",
        "explanation": "Mit <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">Regionen (eng. landmarks)</a> können blinde Nutzer, die einen Screenreader verwenden, zu bestimmten Abschnitten einer Webseite springen. Mehrere Contentinfo-Regionen (role=\"contentinfo\") können Benutzer von Hilfstechnologien verwirren, indem sie mehrere Footer Regionen vorschlagen.",
        "tip": "Stellen Sie sicher, dass jede HTML-Seite nur eine Contentinfo-Region enthält. Entscheiden Sie, welche Contentinfo-Region Sie behalten wollen und entfernen Sie alle anderen Regionen."
    },
    "EA-R117": {
        "content": "Mehr als eine Hauptregion vorhanden",
        "explanation": "Mit <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">Regionen (eng. landmarks)</a> können blinde Nutzer, die einen Screenreader verwenden, zu bestimmten Abschnitten einer Webseite springen. Die Hauptregion bzw. Main-Region (&lt;main role=\"main\"&gt;) wird verwendet, um den primären Inhalt eines Dokuments zu kennzeichnen. Mehrere Main-Regionen können es für Benutzer schwierig machen, den Kerninhalt der Seite zu identifizieren .",
        "tip": "Beschränken Sie Ihre Seite auf eine Hauptregion (&lt;main role=\"main\"&gt;), um den Hauptinhalt klar zu kennzeichnen. Entfernen Sie doppelte Regionen."
    },
    "EA-R118": {
        "content": "Eine Hauptregion fehlt",
        "explanation": "Mit <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">Regionen (eng. landmarks)</a> können blinde Nutzer, die einen Screenreader verwenden, zu bestimmten Abschnitten einer Webseite springen. Inhalte außerhalb dieser Abschnitte sind schwer zu finden, und ihr Zweck kann unklar sein. Eine Hauptregion (&lt;main role=\"main\"&gt;) bietet Nutzern von Hilfstechnologien eine schnelle Möglichkeit, zum Hauptinhalt zu navigieren.",
        "tip": "Fügen Sie Ihrer Website eine Hauptregion (<main>) hinzu und fügen Sie den Hauptinhalt Ihrer Seite darin ein."
    },
    "EA-R119": {
        "content": "Region ist nicht eindeutig",
        "explanation": "Eindeutige Regionen helfen den Nutzern von Screenreadern bei der Unterscheidung zwischen verschiedenen Inhaltsbereichen. Doppelte Regionen können die Nutzer verwirren und es schwierig machen, zum gewünschten Inhalt zu navigieren. Einige Regionen wie <header> oder <footer> dürfen nur einmal pro Seite vorkommen, während andere wie <nav> oder <section> eindeutige zugängliche Namen haben müssen (z. B. von aria-label oder aria-labelledby).",
        "tip": "Stellen Sie sicher, dass die Region eine eindeutige Rolle oder Rollen-/Label-/Titel-Kombination besitzt. Ändern Sie z.B. das Label, um die Region eindeutig zu machen."
    },
    "EA-R120": {
        "content": "Scope-Attribut in Tabelle ist inkorrekt",
        "explanation": "Das Scope-Attribut in Tabellen hilft Benutzern von Hilfstechnologien, die Beziehung zwischen Kopfzellen und Datenzellen zu verstehen. Das Scope Attribute darf dabei nur auf Kopfzellen <th> verwendet werden und muss enter \"col\" oder \"row\" als Wert haben.",
        "tip": "Stellen Sie sicher, dass das Scope-Attribut nur auf Tabellenköpfen <th> verwendet wird und dass der Wert \"col\" oder \"row\" ist."
    },
    "EA-R121": {
        "content": "Seite hat keinen Sprunglink zum Hauptinhalt",
        "explanation": "Sprunglinks bieten einen Link am Seitenanfang, der, wenn er aktiviert wird, den Benutzer an den Anfang des Hauptinhaltsbereichs springen lässt. Andernfalls müssen Tastatur- und Screenreadernutzer durch eine lange Liste von Navigationslinks und anderen Elementen navigieren, bevor sie den Hauptinhalt erreichen. Ein typischer Sprunglink ist \"Zum Inhalt springen\", der unter Verwendung eines Links mit einem Anker-Link (z. B. #main-content) erstellt wird. Es wird empfohlen, den Link so lange auszublenden, bis der Benutzer ihn mit der Tastatur ansteuert.",
        "tip": "Fügen Sie der Seite einen Sprunglink zum Hauptinhalt hinzu. Falls Sie bereits einen Sprunglink haben, stellen Sie sicher, dass er mit der Tastatur erreicht werden kann."
    },
    "EA-R122": {
        "content": "Stellen Sie sicher, dass Tabindex-Werte 0 oder negativ sind.",
        "explanation": "Die Verwendung von Tabindex-Werten, die größer als 0 sind, kann die natürliche Tab-Reihenfolge stören und so Navigationsprobleme für Tastatur- und Hilfstechnologie-Benutzer verursachen.",
        "tip": "Setzen Sie Tabindex-Werte auf 0 oder lassen Sie sie für eine natürliche Tab-Reihenfolge nicht festgelegt. Verwenden Sie negative Werte für programmgesteuert fokussierbare Elemente."
    },
    "EA-R123": {
        "content": "Tabelle hat identische <caption> und summary",
        "explanation": "Die Verwendung desselben Textes im <caption>-Element und im \"summary\"-Attribut einer Tabelle ist redundant und kann möglicherweise verwirrend sein. Das <caption>-Element wird als Titel auf der Seite angezeigt, während das \"summary\"-Element für Screenreader verwendet wird, um eine Zusammenfassung des Tabelleninhalts zur Verfügung zu stellen.",
        "tip": "Achten Sie darauf, dass sich der <caption>-Text vom summary-Attribut der Tabelle unterscheidet, um Verwirrung zu vermeiden."
    },
    "EA-R124": {
        "content": "Identische Links mit unterschiedlichen Zielen",
        "explanation": "Links mit demselben zugänglichen Namen sollten dieselbe Funktion bzw. dasselbe Ziel haben, um Verwechslungen zu vermeiden. Die Linkbeschreibung ermöglicht es dem Benutzer, jeden Link von anderen Links auf der Webseite zu unterscheiden, die zu anderen Zielen führen. Dies hilft dem Benutzer zu entscheiden, ob er dem Link folgen soll.",
        "tip": "Vermeiden Sie Links mit identischen Beschreibungen (z. B. aus dem inneren Text, den Alt- oder Aria-Attributen), die zu unterschiedlichen URLs führen. Stellen Sie einen Linktext bereit, der den Zweck und das Ziel des Links beschreibt."
    },
    "EA-R125": {
        "content": "Prüfen Sie, dass die Sprache der Seite korrekt ausgezeichnet ist",
        "explanation": "Die hinterlegte Sprache passt nicht zu allen Elementen auf der Seite. Dies ist erlaubt, wenn diese Elemente durch ein eigenes lang-Attribut korrekt ausgezeichnet werden. Andernfalls ist beispielsweise die Aussprache einer Sprachausgabe inkorrekt.",
        "tip": "Prüfen Sie, dass alle anderssprachigen Blöcke auf der Seite mit dem richten lang-Attribut versehen sind."
    }
};