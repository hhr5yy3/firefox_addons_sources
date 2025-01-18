const ea_rules_pl = {
    "EA-R2": {
        "content": "<svg> brak dostępnego tekstu",
        "explanation": "Elementy <svg> z rolą \"img\" potrzebują dostępnej nazwy, aby użytkownicy czytników ekranowych mogli zrozumieć ich zawartość i cel.",
        "tip": "Utwórz atrybut title, element title/desc lub atrybuty aria dla <svg>."
    },
    "EA-R3": {
        "content": "<svg> alternatywny tekst jest bardzo krótki (<5 znaków)",
        "explanation": "Dostępny tekst SVG jest bardzo krótki (<5 znaków) i może nie opisywać grafiki wystarczająco.",
        "tip": "Sprawdź, czy dostępny tekst wystarczająco opisuje SVG."
    },
    "EA-R4": {
        "content": "<svg> alternatywny tekst jest bardzo długi (>150 znaków)",
        "explanation": "Alternatywny tekst SVG jest bardzo długi (>150 znaków) i potencjalnie może być streszczony. Wiele osób niewidomych czyta teksty za pomocą wyświetlacza Braille'a. Wyświetlacz Braille'a może wyświetlić co najmniej 40 znaków, ale maksymalnie 80 znaków.",
        "tip": "Streszcz opis do istoty."
    },
    "EA-R5": {
        "content": "<svg> dostępny jest nieco długi (>80 znaków)",
        "explanation": "Alternatywny tekst SVG jest nieco długi (>80 znaków) i potencjalnie może być streszczony. Wiele osób niewidomych czyta teksty za pomocą wyświetlacza Braille'a. Wyświetlacz Braille'a może wyświetlić co najmniej 40 znaków, ale maksymalnie 80 znaków.",
        "tip": "Streszcz opis do istoty."
    },
    "EA-R6": {
        "content": "Obrazek bez alternatywnego tekstu",
        "explanation": "Obrazy (<img> lub role=\"img\") potrzebują alternatywnego tekstu, aby użytkownicy czytników ekranowych mogli zrozumieć zawartość i cel obrazu. Atrybut title nie zawsze jest niezawodnie rozpoznawany.",
        "tip": "Dodaj znaczący alternatywny tekst za pomocą atrybutów alt-, aria-label- lub aria-labelledby-. Pusty atrybut alt może być używany dla obrazów dekoracyjnych."
    },
    "EA-R7": {
        "content": "Zbędny alt tekst jako otaczający link",
        "explanation": "Obraz ma taki sam alternatywny tekst jak otaczający link. Powtarzanie alternatywnego tekstu dla linku lub obrazu w sąsiednim tekście jest zbędne i może dezorientować użytkowników czytników ekranowych, czytając go dwa razy.",
        "tip": "Usuń tekst alt z obrazu, ponieważ nie zawiera żadnych dodatkowych informacji. Zamiast tego użyj pustego atrybutu alt, alt=\"\"."
    },
    "EA-R8": {
        "content": "Brakujący alternatywny tekst w połączonym obrazie",
        "explanation": "Ponieważ sam link nie zawiera tekstu, obraz musi mieć alternatywny tekst, aby czytniki ekranowe mogły zidentyfikować zawartość i cel linku. Atrybut title nie jest wystarczający dla wszystkich czytników ekranowych.",
        "tip": "Dodaj znaczący alternatywny tekst dla linku lub połączonego obrazu."
    },
    "EA-R9": {
        "content": "Alternatywny tekst obrazu jest bardzo krótki (<5 znaków)",
        "explanation": "Alternatywny tekst obrazu powinien opisywać jego zawartość w znaczący sposób.",
        "tip": "Sprawdź, czy alternatywny tekst odpowiednio opisuje obraz."
    },
    "EA-R10": {
        "content": "Alternatywny tekst obrazu jest bardzo długi (>150 znaków)",
        "explanation": "Alternatywny tekst tego obrazu jest bardzo długi (>150 znaków) i możliwe, że może być streszczony. Wiele osób niewidomych czyta teksty za pomocą wyświetlacza Braille'a. Wyświetlacz Braille'a może wyświetlić co najmniej 40 znaków, ale maksymalnie 80 znaków.",
        "tip": "Streszcz opis do jego istoty."
    },
    "EA-R11": {
        "content": "Alternatywny tekst obrazu jest nieco długi (>80 znaków)",
        "explanation": "Alternatywny tekst jest nieco długi (>80 znaków) i możliwe, że może być streszczony. Wiele osób niewidomych czyta teksty za pomocą wyświetlacza Braille'a. Wyświetlacz Braille'a może wyświetlić co najmniej 40 znaków, ale maksymalnie 80 znaków.",
        "tip": "Streszcz opis do jego istoty."
    },
    "EA-R12": {
        "content": "Linki muszą mieć dostępny tekst",
        "explanation": "Linki wymagają tekstu linku, który jest zrozumiały i poprawnie odczytywany przez czytniki ekranowe. Tekst linku powinien jasno wyjaśniać, jakie informacje czytelnik uzyska, klikając na ten link.",
        "tip": "Dodaj znaczący tekst linku, używając wewnętrznego tekstu lub atrybutów ARIA, które opisują cel i miejsce docelowe linku. Tekst linku również nie może być ukryty przed czytnikami ekranowymi (np. z display: none lub aria-hidden=\"true\")."
    },
    "EA-R13": {
        "content": "Pusty link",
        "explanation": "Ten link nie ma zawartości i celu (atrybut href).",
        "tip": "Usuń puste linki."
    },
    "EA-R14": {
        "content": "Dostępny tekst linku to URL",
        "explanation": "Teksty linków powinny być znaczące i opisywać cel i miejsce docelowe linku. Użytkownicy czytników ekranowych powinni łatwo móc zdecydować, czy chcą śledzić link.",
        "tip": "Upewnij się, że używasz opisów, które opisują cel i miejsce docelowe linku. Tekst linku również nie może być ukryty przed czytnikami ekranowymi (np. z display: none lub aria-hidden=\"true\")."
    },
    "EA-R15": {
        "content": "Tekst linku jest bardzo długi (>150 znaków)",
        "explanation": "Dostępny tekst tego linku jest bardzo długi (>150 znaków) i potencjalnie może być streszczony. Wiele osób niewidomych czyta teksty za pomocą wyświetlacza Braille'a. Wyświetlacz Braille'a może wyświetlić co najmniej 40 znaków, ale maksymalnie 80 znaków.",
        "tip": "Upewnij się, że używasz znaczących i zwięzłych tekstów."
    },
    "EA-R16": {
        "content": "<object> brak dostępnej nazwy",
        "explanation": "Elementy <object> mogą zawierać treści multimedialne (audio, wideo itp.) i muszą mieć dostępną nazwę dla czytników ekranowych. Użytkownicy czytników ekranowych nie mogą znać zawartości obiektu bez alternatywnego tekstu.",
        "tip": "Dodaj dostępną nazwę do <object> za pomocą tytułu lub atrybutów aria, takich jak aria-label i aria-labelledby."
    },
    "EA-R17": {
        "content": "Wykryto audio",
        "explanation": "Sprawdź, czy informacje są przekazywane w dźwięku (np. za pomocą głosu komentarza). Jeśli tak, wymagana jest transkrypcja.",
        "tip": "Sprawdź, czy wymagana jest transkrypcja pliku audio. Jeśli tak, zapewnij alternatywę, na przykład za pomocą transkrypcji tekstu."
    },
    "EA-R18": {
        "content": "Wykryto wideo",
        "explanation": "Sprawdź, czy wideo wymaga alternatywy medialnej lub napisów. Jeśli wideo nie ma napisów, osoby głuche będą miały ograniczony lub żaden dostęp do zawartych w nim informacji. Podobnie ciche pliki wideo (bez głosu) nie są dostępne dla osób niewidomych. Potrzebują również pełnej alternatywy medialnej (tekst, alternatywny ścieżka dźwiękowa lub plik audio).",
        "tip": "Sprawdź, czy wideo wymaga alternatywy medialnej lub napisów i zapewnij je w razie potrzeby."
    },
    "EA-R19": {
        "content": "Wykryto wiele nagłówków H1",
        "explanation": "Struktura nagłówków strony powinna być logicznie ułożona i, jeśli to możliwe, zaczynać się od nagłówka H1. Nagłówek H1 identyfikuje najważniejsze części strony.",
        "tip": "Jeśli to możliwe, używaj tylko jednego nagłówka H1. Strukturuj dalsze nagłówki z H2, H3 itd."
    },
    "EA-R20": {
        "content": "Brak nagłówka H1",
        "explanation": "Albo nie ma nagłówka H1, albo jest on ukryty przed czytnikami ekranowymi. Sprawdź, czy nagłówek H1 istnieje i jest widoczny, ponieważ służy jako pierwszy i najważniejszy element struktury nagłówków (h1-h6). Element <h1> powinien znajdować się na początku głównej treści, umożliwiając użytkownikom czytników ekranowych bezpośrednie przejście do głównej treści za pomocą skrótów klawiszowych.",
        "tip": "Jeśli to możliwe, zawsze twórz widoczny nagłówek <h1>, który opisuje zawartość strony."
    },
    "EA-R21": {
        "content": "Skok w kolejności nagłówków",
        "explanation": "Struktura nagłówków strony powinna być logicznie zorganizowana, a poziomy nagłówków powinny zwiększać się tylko o jeden. Unikaj skoków, na przykład z H2 do H4.",
        "tip": "Staraj się nie skakać w kolejności nagłówków."
    },
    "EA-R22": {
        "content": "Element listy <li> nie jest częścią listy",
        "explanation": "Prawidłowa lista musi być zawsze oprawiona elementem <ul> lub <ol>. W przeciwnym razie elementy listy nie będą poprawnie wykrywane jako lista przez czytnik ekranowy. Uważaj na możliwe role elementów nadrzędnych <ul> lub <ol> poprzez atrybut role.",
        "tip": "Zbuduj poprawną listę z nadrzędnym elementem <ul> lub <ol>. Jeśli już ustawiłeś element <ul> lub <ol>, uważaj na możliwe role poprzez atrybut role."
    },
    "EA-R23": {
        "content": "Niewystarczający kontrast tekstu",
        "explanation": "Upewnij się, że wszystkie elementy tekstowe mają wystarczający kontrast kolorów między tekstem na pierwszym planie a kolorem tła za nim. Minimalny kontrast zależy od rozmiaru tekstu i wynosi 3:1 lub 4,5:1 dla tekstu większej skali (>18pt).",
        "tip": "Zwiększ kontrast, na przykład za pomocą ciemniejszego/jaśniejszego koloru czcionki lub koloru tła."
    },
    "EA-R24": {
        "content": "Niewystarczający kontrast SVG",
        "explanation": "Wizualna reprezentacja SVG musi utrzymywać minimalny stosunek kontrastu 3:1, aby były dobrze postrzegane.",
        "tip": "Zwiększ kontrast SVG."
    },
    "EA-R25": {
        "content": "Ręczne sprawdzenie kontrastu",
        "explanation": "Wykryto bardzo niski kontrast. Czasami wskazuje to na użycie obrazów tła lub gradientów. Proszę sprawdzić kontrast ręcznie.",
        "tip": "Zwiększ kontrast, na przykład za pomocą ciemniejszego/jaśniejszego koloru czcionki lub koloru tła. Upewnij się, że tekst na obrazach tła ma wystarczający kontrast 4,5:1 dla mniejszego tekstu i 3:1 dla większego tekstu."
    },
    "EA-R26": {
        "content": "Strona nie ma tytułu",
        "explanation": "Tytuł strony jest ważny, aby opisać temat lub cel strony. Pozwala odwiedzającym Twoją witrynę szybko sklasyfikować lub znaleźć Twoją zawartość.",
        "tip": "Dodaj opisowy element <title> do strony."
    },
    "EA-R27": {
        "content": "Tytuł strony jest bardzo krótki",
        "explanation": "Tytuł strony jest ważny, aby opisać temat lub cel strony. Pozwala odwiedzającym Twoją witrynę szybko sklasyfikować lub znaleźć Twoją zawartość.",
        "tip": "Sprawdź, czy tytuł odpowiednio opisuje stronę."
    },
    "EA-R28": {
        "content": "<iframe> nie ma dostępnej nazwy",
        "explanation": "Dostępna nazwa <iframe> jest ważna, aby opisać jego temat lub cel. Użytkownicy czytników ekranowych mogą uzyskać dostęp do listy tytułów dla wszystkich ramek na stronie. Jednak nawigacja przez elementy <frame> i <iframe> może stać się trudna i myląca, jeśli znaczniki nie mają atrybutu title, szczególnie dla użytkowników z niepełnosprawnościami.",
        "tip": "Dodaj opisowy atrybut title do <iframe>. Alternatywnie możesz dodać atrybut aria, taki jak aria-label lub aria-labelledby."
    },
    "EA-R29": {
        "content": "Brak języka witryny",
        "explanation": "Aby poprawnie działało wyjście mowy z czytników ekranowych lub przeglądarki, należy określić język strony. Czytniki ekranowe używają różnych bibliotek dźwiękowych dla różnych języków, w oparciu o wymowę i cechy tego języka. Ważne jest, aby określić język i upewnić się, że jest on prawidłowy, aby tekst na stronie był poprawnie wymawiany.",
        "tip": "Dodaj atrybut lang do elementu HTML swojej strony."
    },
    "EA-R30": {
        "content": "Niepoprawny język strony",
        "explanation": "Aby poprawnie działało wyjście mowy z czytników ekranowych lub przeglądarki, język strony musi być poprawnie określony. W przeciwnym razie, na przykład wymowa wyjścia mowy jest nieprawidłowa.",
        "tip": "Sprawdź, czy język w elemencie HTML jest zgodny z rzeczywistym językiem strony."
    },
    "EA-R31": {
        "content": "Wykryto skrót",
        "explanation": "Skróty nie zawsze są zrozumiałe dla wszystkich i powinny być wyjaśnione w tekście lub za pomocą elementów HTML, takich jak <abbr>.",
        "tip": "Sprawdź, czy skrót jest już oznaczony. Jeśli nie, dodaj pełny tekst lub użyj specjalnych elementów HTML, takich jak <abbr>."
    },
    "EA-R32": {
        "content": "Wartość atrybutu ID musi być unikalna",
        "explanation": "ID to unikalny identyfikator dla elementów strony internetowej i odpowiednio nie może być zduplikowany. Posiadanie zduplikowanych identyfikatorów ID może prowadzić do pomijania elementów przez czytniki ekranowe. Od 2023 roku nie jest to już wymóg WCAG, chyba że prowadzi do niepowodzenia innego kryterium WCAG.",
        "tip": "Zmień nazwę ID tak, aby było używane tylko raz na stronie."
    },
    "EA-R33": {
        "content": "Przycisk obrazu brak dostępnej nazwy",
        "explanation": "Graficzne wejście (<input type=\"image\">) wymaga alternatywnego tekstu, aby czytniki ekranowe mogły odzwierciedlić jego cel.",
        "tip": "Dodaj znaczący alt lub atrybut ARIA (aria-label lub aria-labelledby), który opisuje treść i cel tego obrazu."
    },
    "EA-R34": {
        "content": "Przycisk resetowania nie jest zalecany",
        "explanation": "Użycie przycisków resetowania nie jest zalecane, ponieważ mogą one łatwo zostać kliknięte przez pomyłkę.",
        "tip": "Usuń przycisk resetowania, jeśli to możliwe."
    },
    "EA-R35": {
        "content": "Pole formularza brak dostępnej nazwy",
        "explanation": "Pole formularza potrzebuje dostępnej nazwy, aby czytniki ekranowe mogły odzwierciedlić jego cel. Dotyczy to elementów <input> i <select> lub elementów z rolą \"checkbox\", \"listbox\", \"searchbox\", \"spinbutton\" lub \"textbox\" wśród innych ról.",
        "tip": "Utwórz odpowiedni <label> dla elementów <input> lub <select>. Możesz również użyć atrybutów aria, takich jak aria-label dla elementów z rolą. Etykieta powinna opisywać cel tego pola formularza. Przy użyciu <label> użyj atrybutu for, który pasuje do unikalnego id wejścia."
    },
    "EA-R36": {
        "content": "<button> brak dostępnej nazwy",
        "explanation": "<button> lub <input> z typem=\"button\" potrzebuje dostępnej nazwy, aby czytniki ekranowe mogły odzwierciedlić jego cel.",
        "tip": "Wstaw tekst w treści elementu przycisku lub użyj atrybutów aria, takich jak aria-label lub aria-labelledby, aby opisać jego cel."
    },
    "EA-R38": {
        "content": "<area> brak alternatywnego tekstu",
        "explanation": "Elementy obszaru identyfikują obszary w mapie obrazu, które mogą być używane do definiowania klikalnych obszarów. Dlatego potrzebują one dostępnej nazwy, aby czytniki ekranowe mogły odzwierciedlić ich cel.",
        "tip": "Dodaj alternatywny tekst do elementu obszaru, na przykład za pomocą atrybutu alt lub etykiet aira."
    },
    "EA-R39": {
        "content": "Body jest aria-hidden",
        "explanation": "Element body zawiera atrybut aria-hidden: \"true\" i strona nie jest więc dostępna dla czytników ekranowych.",
        "tip": "Usuń atrybut aria-hidden z elementu body."
    },
    "EA-R40": {
        "content": "<select> brak dostępnej nazwy",
        "explanation": "Elementy <select> muszą mieć dostępną nazwę, aby użytkownicy czytników ekranowych mogli zidentyfikować ich cel.",
        "tip": "Opisz cel listy wyboru za pomocą elementu <label> lub atrybutów aria."
    },
    "EA-R41": {
        "content": "Zduplikowany atrybut accesskey",
        "explanation": "Atrybut accesskey może być używany do określenia znaku na klawiaturze, który użytkownik może nacisnąć, aby bezpośrednio przejść do elementów. Tutaj nie jest dozwolone zduplikowanie przypisania i prowadzi do nieoczekiwanego zachowania.",
        "tip": "Zmień atrybut klucza dostępu tak, aby był unikalny na stronie."
    },
    "EA-R42": {
        "content": "Pusty element <th>",
        "explanation": "Element nagłówka tabeli <th> w tabeli opisuje znaczenie odpowiedniej kolumny. Bez widocznego tekstu, cel wiersza lub kolumny jest niejasny zarówno dla osób widzących, jak i użytkowników czytników ekranowych.",
        "tip": "Wstaw widoczny tekst, który opisuje dane w tej kolumnie."
    },
    "EA-R43": {
        "content": "Nagłówki nie mogą być puste",
        "explanation": "Ten nagłówek nie zawiera tekstu, ale może być osiągnięty przez czytniki ekranowe.",
        "tip": "Dodaj tekst do nagłówka lub go usuń."
    },
    "EA-R44": {
        "content": "Brakująca dostępna nazwa nagłówka",
        "explanation": "Ta reguła sprawdza, czy każdy nagłówek ma niepusty dostępny tekst i jest widoczny dla czytników ekranowych. Czytniki ekranowe informują użytkowników o obecności tagu nagłówka. Jeśli nagłówek jest pusty lub tekst jest niedostępny, może to albo zdezorientować użytkowników, albo nawet uniemożliwić im dostęp do informacji o strukturze strony.",
        "tip": "Sprawdź, czy nagłówek ma jakąś zawartość. Zawartość może być również ukryta za pomocą aria-hidden=\"true\" lub display=\"none\"."
    },
    "EA-R45": {
        "content": "Akapit ma niewystarczającą wysokość linii",
        "explanation": "Wysokość linii akapitu (<p>) jest mniejsza niż 1,5. Może to wpłynąć na czytelność tekstu.",
        "tip": "Zwiększ wysokość linii akapitu do co najmniej 1,5"
    },
    "EA-R46": {
        "content": "!important odstęp między literami w atrybucie stylu",
        "explanation": "Ta reguła sprawdza, czy atrybut stylu nie jest używany do zapobiegania dostosowywaniu odstępu między literami za pomocą !important, chyba że jest to co najmniej 0,12 razy rozmiar czcionki. Użycie !important w atrybutach stylu zapobiega nadpisaniu tego stylu.",
        "tip": "Jeśli to możliwe, nie używaj !important w atrybucie stylu lub upewnij się, że odstęp między literami wynosi co najmniej 0,12 razy rozmiar czcionki."
    },
    "EA-R47": {
        "content": "!important odstęp między słowami w atrybucie stylu",
        "explanation": "Ta reguła sprawdza, czy atrybut stylu nie jest używany do zapobiegania dostosowywaniu odstępu między słowami za pomocą !important, chyba że jest to co najmniej 0,16 razy rozmiar czcionki. Użycie !important w atrybutach stylu zapobiega nadpisaniu tego stylu.",
        "tip": "Jeśli to możliwe, nie używaj !important w atrybucie stylu lub upewnij się, że odstęp między słowami wynosi co najmniej 0,16 razy rozmiar czcionki."
    },
    "EA-R48": {
        "content": "!important wysokość linii w atrybucie stylu",
        "explanation": "Ta reguła sprawdza, czy atrybut stylu nie jest używany do zapobiegania dostosowywaniu wysokości linii za pomocą !important, chyba że jest to co najmniej 1,5 razy rozmiar czcionki. Użycie !important w atrybutach stylu zapobiega nadpisaniu tego stylu.",
        "tip": "Jeśli to możliwe, nie używaj !important w atrybucie stylu lub upewnij się, że wysokość linii wynosi co najmniej 1,5 razy rozmiar czcionki."
    },
    "EA-R49": {
        "content": "<audio> lub <video> element automatycznie odtwarza dźwięk",
        "explanation": "Audio lub wideo, które odtwarza się automatycznie, nie może mieć dźwięku trwającego dłużej niż 3 sekundy lub potrzebuje mechanizmu kontroli dźwięku, aby go zatrzymać lub wyciszyć.",
        "tip": "Nie odtwarzaj automatycznie dźwięku lub upewnij się, że jest dostępny mechanizm kontroli, aby go zatrzymać lub wyciszyć."
    },
    "EA-R50": {
        "content": "Wykryto nieprawidłowy atrybut lang",
        "explanation": "Atrybut lang w elemencie <html> musi być prawidłowym kodem języka i zgodnym ze standardem BCP 47, np. \"de\" lub \"en-us\".",
        "tip": "Upewnij się, że jako atrybut lang elementu <html> ustawiony jest prawidłowy kod języka."
    },
    "EA-R51": {
        "content": "Atrybuty lang i xml:lang nie pasują do siebie",
        "explanation": "Atrybuty lang i xml:lang na elemencie <html> nieosadzonej strony HTML muszą mieć ten sam podstawowy podtag języka.",
        "tip": "Upewnij się, że atrybuty lang i xml:lang na elemencie <html> są zgodne."
    },
    "EA-R52": {
        "content": "Elementy <iframe> z identycznymi dostępnymi nazwami",
        "explanation": "Elementy <iframe> z identycznymi dostępnymi nazwami powinny być unikane lub przynajmniej osadzać ten sam zasób lub równoważne zasoby. Używanie tej samej dostępnej nazwy może wprowadzać w błąd użytkowników czytników ekranowych.",
        "tip": "Użyj unikalnych atrybutów title dla każdej ramki lub upewnij się, że elementy <iframe> z identycznymi dostępnymi nazwami prowadzą do tego samego zasobu."
    },
    "EA-R53": {
        "content": "<iframe> ma negatywny tabindex",
        "explanation": "Elementy <iframe> z negatywnym atrybutem tabindex nie mogą zawierać interaktywnych elementów. Ustawienie wartości atrybutu tabindex elementu <iframe> na -1 lub inną ujemną liczbę uniemożliwia przeniesienie fokusu do kontekstu przeglądania elementu <iframe>.",
        "tip": "Usuń negatywny tabindex, jeśli <iframe> zawiera elementy możliwe do skupienia."
    },
    "EA-R54": {
        "content": "Meta viewport zapobiega powiększeniu",
        "explanation": "Używanie elementów <meta name=\"viewport\"> może ograniczać możliwość powiększania przez użytkownika, szczególnie na urządzeniach mobilnych. Powiększanie jest powszechnym i oczekiwanym zachowaniem na stronach mobilnych, więc jego wyłączenie pogarsza doświadczenie użytkownika mobilnego, szczególnie dla użytkowników z częściowym widzeniem i niskim widzeniem.",
        "tip": "Usuń atrybuty user-scalable i maximum-scale. W przeciwnym razie upewnij się, że atrybut content nie ustawia user-scalable na \"no\" i że właściwość maximum-scale wynosi co najmniej 2."
    },
    "EA-R55": {
        "content": "Brak komórek danych przypisanych do nagłówka tabeli",
        "explanation": "Ta reguła sprawdza, czy każdy nagłówek tabeli <th> ma przypisane komórki <td> w elemencie tabeli. Jeśli tabele nie są poprawnie oznaczone, stwarza to potencjał dla mylącego lub nieprawidłowego wyjścia czytnika ekranowego.",
        "tip": "Usuń komórki nagłówka tabeli, które nie mają przypisanych komórek lub przypisz komórki do nagłówka."
    },
    "EA-R56": {
        "content": "Nieokreślony atrybut ARIA",
        "explanation": "Ta reguła sprawdza, czy każdy określony atrybut aria-* jest zdefiniowany w <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA 1.1</a>. Nieprawidłowe lub błędnie napisane atrybuty aria nie są rozpoznawane przez czytniki ekranowe.",
        "tip": "Sprawdź, czy atrybut aria nie jest błędnie napisany i określony w <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">specyfikacjach ARIA</a>. Upewnij się, że używasz tylko prawidłowych atrybutów aria."
    },
    "EA-R57": {
        "content": "Nieobsługiwany stan ARIA lub właściwość",
        "explanation": "Ta reguła sprawdza, czy <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria/\">stany lub właściwości WAI-ARIA</a> są dozwolone dla elementu, na którym są określone. Stany lub właściwości ARIA powinny być zgodne z oficjalną specyfikacją, w przeciwnym razie mogą być ignorowane lub interpretowane nieprawidłowo przez technologie wspomagające.",
        "tip": "Usuń niespecyfikowane stany lub właściwości WAI-ARIA lub popraw je na dozwoloną wartość."
    },
    "EA-R58": {
        "content": "Nieprawidłowa wartość stanu lub właściwości ARIA",
        "explanation": "Ta reguła sprawdza, czy wartość <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">stanów lub właściwości ARIA</a> są dozwolone dla elementu, na którym są określone. Stany lub właściwości ARIA muszą być zgodne z oficjalną specyfikacją, w przeciwnym razie nie są dostępne dla użytkowników technologii wspomagających.",
        "tip": "Usuń niespecyfikowane wartości ARIA stanów lub właściwości lub popraw je na poprawną wartość."
    },
    "EA-R59": {
        "content": "Atrybut autocomplete jest nieprawidłowy",
        "explanation": "Ta reguła dotyczy dowolnego elementu HTML <input>, <select> i <textarea> z wartością atrybutu autocomplete. Atrybut autocomplete potrzebuje prawidłowej wartości, aby był rozpoznawany przez przeglądarkę i czytniki ekranowe.",
        "tip": "Upewnij się, że <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete\">wartość autocomplete</a> jest obsługiwana."
    },
    "EA-R60": {
        "content": "Brak przypisanej komórki nagłówka do komórek danych",
        "explanation": "Ta reguła sprawdza, czy każdy nagłówek tabeli <th> ma przypisane komórki <td> w elemencie tabeli.",
        "tip": "Dodaj komórkę nagłówka <th> do każdej komórki danych <td>, jeśli to możliwe."
    },
    "EA-R61": {
        "content": "Strona nie ma nagłówka",
        "explanation": "Dokument nie ma żadnych elementów nagłówka. Nagłówki dodają strukturę do witryny i pomagają użytkownikom czytników ekranowych w nawigacji i zrozumieniu jej zawartości.",
        "tip": "Sprawdź, czy można dodać nagłówki, aby nadać strukturę witrynie. Upewnij się, że wszystkie teksty nagłówków są poprawnie oznaczone za pomocą tagów <h1>-<h6> lub z role=\"heading\"."
    },
    "EA-R62": {
        "content": "Element prezentacyjny ma potomków możliwych do skupienia",
        "explanation": "Ta reguła sprawdza, czy elementy z rolą, która czyni ich dzieci prezentacyjnymi, nie zawierają elementów możliwych do skupienia, np. linku, przycisku lub pola wejściowego. Takie elementy to na przykład <button>, checkbox lub <img>. Dzieci tych elementów nie są poprawnie wykrywane przez technologie wspomagające i tworzą pusty przystanek tabulacji.",
        "tip": "Nie dodawaj elementów możliwych do skupienia jako dzieci elementów z rolą, która czyni ich dzieci prezentacyjnymi, np. <button> lub role=\"checkbox\"."
    },
    "EA-R63": {
        "content": "Element dekoracyjny jest eksponowany na technologie wspomagające",
        "explanation": "Ta reguła sprawdza, czy elementy oznaczone jako dekoracyjne albo nie są uwzględnione w drzewie dostępności, albo mają rolę prezentacyjną. Oznaczenie elementu jako dekoracyjnego ukrywa go przed technologiami wspomagającymi, ale uczynienie go możliwym do skupienia eksponuje go. Również niektóre elementy, takie jak <nav>, nie mogą mieć roli dekoracyjnej, jeśli posiadają dostępną nazwę, np. przez aria-label. Ten konflikt należy unikać.",
        "tip": "Sprawdź, czy element musi być oznaczony jako dekoracyjny lub ukryj go przed technologiami wspomagającymi, np. używając aria-hidden=\"true\" lub role=\"presentation\". W takim przypadku usuń również wszystkie atrybuty aria label."
    },
    "EA-R64": {
        "content": "Kontener brak wymaganych dzieci",
        "explanation": "Niektóre elementy z wyraźną rolą semantyczną muszą mieć co najmniej jeden z wymaganych posiadanych elementów. Na przykład element z rolą \"list\" musi posiadać elementy z rolą \"listitem\". Niepowodzenie tego wymogu może uczynić sam element nieważnym.",
        "tip": "Sprawdź, czy rola elementu została użyta poprawnie lub upewnij się, że zawiera wymagane węzły potomne."
    },
    "EA-R65": {
        "content": "Element brak wymaganego rodzica",
        "explanation": "Niektóre elementy z wyraźną rolą semantyczną muszą mieć określony element rodzica. Na przykład element z rolą \"listitem\" potrzebuje węzła rodzica z rolą \"list\". Niepowodzenie tego wymogu czyni sam element nieważnym.",
        "tip": "Sprawdź, czy rola elementu została poprawnie użyta lub upewnij się, że używasz wymaganego węzła rodzica i roli."
    },
    "EA-R66": {
        "content": "Element aria-hidden ma treść możliwą do skupienia",
        "explanation": "Dodając aria-hidden=\"true\" do elementu, sam element i wszystkie jego potomki są ukryte przed technologiami wspomagającymi. Eksponowanie go na sekwencyjną nawigację fokusową może powodować zamieszanie u użytkowników technologii wspomagających, ponieważ element może być osiągnięty, ale powinien być ukryty.",
        "tip": "Sprawdź, czy element musi być ukryty przed technologią wspomagającą i jeśli tak, usuń go z sekwencyjnej nawigacji fokusowej. Aby usunąć z nawigacji zakładki, dodaj atrybut tabindex=\"-1\", styl \"disabled:none\" lub atrybut disabled."
    },
    "EA-R67": {
        "content": "Rozmiar czcionki jest bardzo mały",
        "explanation": "Ta reguła sprawdza, czy rozmiary czcionek są większe niż 9 pikseli. Małe rozmiary czcionek nie są łatwe do odczytania i należy ich unikać, jeśli to możliwe.",
        "tip": "Sprawdź, czy rozmiar czcionki można zwiększyć do co najmniej 10px. Ogólnie zaleca się rozmiar czcionki 16px lub większy dla regularnego tekstu."
    },
    "EA-R68": {
        "content": "Grupa nie ma dostępnej nazwy",
        "explanation": "Grupowanie powiązanych kontrolek formularza sprawia, że formularze są bardziej zrozumiałe dla wszystkich użytkowników, ponieważ powiązane kontrolki są łatwiejsze do zidentyfikowania. Aby technologie wspomagające mogły poprawnie zidentyfikować cel grupy, potrzebuje ona dostępnej nazwy, np. używając <legend> dla <fieldset> lub atrybutów aria dla elementów z rolą \"group\" lub \"menubar\".",
        "tip": "Upewnij się, że każda grupa ma dostępną nazwę za pomocą atrybutów aria, takich jak aria-label lub <legend> dla <fieldset>."
    },
    "EA-R69": {
        "content": "Atrybut headers komórki odnosi się do brakującej komórki",
        "explanation": "Atrybut <a target=\"_blank\" href=\"https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/H43\">headers</a> określa jedną lub więcej komórek nagłówka, do których odnosi się komórka tabeli. Jest używany tylko przez czytniki ekranowe. Ta reguła sprawdza, czy atrybut headers na komórce odnosi się do odpowiadającej komórki w tym samym elemencie tabeli. Jeśli tabele nie są poprawnie oznaczone, stwarza to potencjał dla mylącego lub nieprawidłowego wyjścia czytnika ekranowego.",
        "tip": "Sprawdź, czy istnieje inna komórka, która ma id wartości atrybutu headers w tej samej tabeli. W przeciwnym razie albo usuń atrybut headers, albo utwórz odpowiadającą komórkę z tym id."
    },
    "EA-R70": {
        "content": "Element oznaczony jako dekoracyjny jest eksponowany",
        "explanation": "Ta reguła sprawdza, czy elementy oznaczone jako dekoracyjne albo nie są uwzględnione w drzewie dostępności, albo mają rolę prezentacyjną. Oznaczenie elementu jako dekoracyjnego ukrywa go przed technologiami wspomagającymi, ale uczynienie go możliwym do skupienia lub dodanie atrybutów ARIA może go eksponować. Ten konflikt należy unikać.",
        "tip": "Sprawdź, czy element musi być oznaczony jako dekoracyjny lub ukryj go przed technologiami wspomagającymi, np. używając aria-hidden=\"true\" lub role=\"presentation\"."
    },
    "EA-R71": {
        "content": "Wykryto element z nieprawidłowym atrybutem lang",
        "explanation": "Części witryny mogą być oznaczone jako w innym języku niż reszta witryny za pomocą atrybutu lang. Atrybut lang tych elementów musi również być prawidłowym kodem języka i zgodnym ze standardem BCP 47, np. \"de\" lub \"en-us\".",
        "tip": "Upewnij się, że jako atrybut lang elementu ustawiony jest prawidłowy kod języka."
    },
    "EA-R72": {
        "content": "Link nie jest odróżnialny od otaczającego tekstu",
        "explanation": "Ta reguła sprawdza, czy linki w tekście są odróżnialne od otaczającego tekstu dzięki różnicy nie opartej wyłącznie na kolorze. Linki mogą być wyróżnione na przykład przez podkreślenie tekstu lub użycie obramowania. Sprawdzane są również stany najechania i fokusowania.",
        "tip": "Upewnij się, że link jest odróżnialny od otaczającego tekstu nie tylko przez kolor. Sprawdź to również podczas najechania lub fokusowania linku."
    },
    "EA-R73": {
        "content": "Brak dostępnej nazwy elementu menu",
        "explanation": "Ta reguła sprawdza, czy każdy element z rolą menuitem ma niepusty dostępny tekst. Rola menuitem wskazuje, że element jest opcją w zestawie wyborów zawartym w menu lub pasku menu.",
        "tip": "Dodaj dostępną nazwę za pomocą treści elementu lub za pomocą atrybutów aria."
    },
    "EA-R74": {
        "content": "Orientacja strony jest ograniczona",
        "explanation": "Ta reguła sprawdza, czy zawartość strony nie jest ograniczona do orientacji poziomej lub pionowej za pomocą właściwości CSS transform. Elementy, które są ustalone w określonej rotacji, używając funkcji mediów orientation z wartością landscape lub portrait, mogą nie obracać się na urządzeniach mobilnych.",
        "tip": "Upewnij się, że wszystkie elementy na stronie internetowej obracają się poprawnie podczas przełączania z trybu pionowego na poziomy."
    },
    "EA-R75": {
        "content": "Akapit jest cały pochylony",
        "explanation": "Chociaż używanie tekstu pochylonego do wyróżniania ważnych treści jest dobre, unikaj używania tekstu pochylonego w dłuższych akapitach tekstu. Szczególnie dla osób z dysleksją tekst pochylony może być trudniejszy do odczytania.",
        "tip": "Unikaj większych fragmentów tekstu pochylonego i używaj go tylko do wyróżniania ważnych treści."
    },
    "EA-R76": {
        "content": "Akapit jest cały pisany wielkimi literami",
        "explanation": "Chociaż używanie tekstu wielkimi literami do wyróżniania ważnych treści może być dobre, unikaj używania tekstu wielkimi literami w dłuższych akapitach tekstu. Szczególnie dla osób z dysleksją tekst wielkimi literami może być trudniejszy do odczytania. Czytniki ekranowe mogą również czytać każdą literę osobno.",
        "tip": "Unikaj większych fragmentów tekstu pisanych wielkimi literami i używaj ich tylko do wyróżniania ważnych treści."
    },
    "EA-R77": {
        "content": "Akapity tekstu są wyjustowane",
        "explanation": "Osoby z niektórymi niepełnosprawnościami poznawczymi mają problemy z czytaniem tekstu, który jest wyjustowany zarówno do lewej, jak i do prawej strony. Nierównomierny odstęp między słowami w pełni wyjustowanym tekście może utrudniać czytanie, a w niektórych przypadkach uniemożliwić.",
        "tip": "Unikaj używania wyjustowanego wyrównania tekstu w dłuższych akapitach tekstu."
    },
    "EA-R78": {
        "content": "Treść nie jest zawarta w regionie punktu orientacyjnego",
        "explanation": "<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html\">Punkty orientacyjne</a> programowo identyfikują sekcje strony. Dobrą praktyką jest zawarcie całej treści strony w punktach orientacyjnych, aby użytkownicy czytników ekranowych, którzy polegają na nich w nawigacji między sekcjami, nie tracili śladu treści. Przykładami regionów są nagłówek, nawigacja, stopka lub główna treść. Zalecane jest używanie natywnych punktów orientacyjnych HTML5, takich jak &lt;nav&gt;, zamiast używania ról ARIA, takich jak role=\"nav\".",
        "tip": "Dodaj wszystkie elementy tekstowe do istniejących punktów orientacyjnych lub utwórz nowe. Przegląd <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/HTML5.html\">punktów orientacyjnych HTML znajdziesz tutaj</a>."
    },
    "EA-R79": {
        "content": "Element <meta> ma opóźnienie odświeżania",
        "explanation": "Ta reguła sprawdza, czy element <meta> nie jest używany do opóźnionego przekierowywania lub odświeżania. Ponieważ użytkownicy nie oczekują automatycznego odświeżania strony, takie odświeżanie może być dezorientujące. Jeśli używane jest odświeżanie lub przekierowanie, wówczas atrybut content elementu <meta> musi wynosić 0 lub więcej niż 72000 (20 godzin).",
        "tip": "Nie używaj opóźnionych odświeżeń lub przekierowań lub zapewnij funkcjonalność umożliwiającą użytkownikowi dostosowanie timera."
    },
    "EA-R80": {
        "content": "Element <meta> ma opóźnienie odświeżania (AAA)",
        "explanation": "Ta reguła sprawdza, czy element <meta> nie jest używany do opóźnionego przekierowywania lub odświeżania. Jeśli używane jest odświeżanie lub przekierowanie, wówczas wartość atrybutu content elementu <meta> musi wynosić 0 bez wyjątku.",
        "tip": "Nie używaj opóźnionych odświeżeń lub przekierowań i ustaw opóźnienie na 0."
    },
    "EA-R81": {
        "content": "Region nie ma dostępnej nazwy",
        "explanation": "Rola regionu służy do identyfikacji obszarów dokumentu, które autor uważa za znaczące. Każdy region potrzebuje dostępnej nazwy, aby użytkownicy czytników ekranowych mogli zidentyfikować jego treść i cel.",
        "tip": "Dodaj dostępną nazwę do regionu za pomocą atrybutów aria."
    },
    "EA-R82": {
        "content": "Element ma nieprawidłową rolę",
        "explanation": "Ta reguła sprawdza, czy każdy atrybut roli ma prawidłową wartość zgodnie ze <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles\">specyfikacjami WAI-ARIA</a>. Sprawdzane są również przestarzałe role.",
        "tip": "Sprawdź atrybut roli pod kątem błędów ortograficznych i czy rola istnieje w specyfikacji."
    },
    "EA-R83": {
        "content": "Element przewijalny nie jest dostępny z klawiatury",
        "explanation": "Ta reguła sprawdza, czy elementy przewijalne można przewijać za pomocą klawiatury. Aby upewnić się, że istnieje jakiś element, z którego można używać klawiszy strzałek do kontrolowania pozycji przewijania, fokus musi być na lub w przewijalnym regionie.",
        "tip": "Upewnij się, że każdy element przewijalny lub jeden z jego elementów potomnych jest możliwy do skupienia."
    },
    "EA-R84": {
        "content": "Widoczna etykieta nie jest częścią dostępnej nazwy",
        "explanation": "Ta reguła sprawdza, czy interaktywne elementy, takie jak przyciski lub linki, mają swoją pełną widoczną etykietę jako część ich dostępnej nazwy, np. podczas używania aria-label. Jest to szczególnie ważne dla użytkowników korzystających z wejścia głosowego do sterowania stroną internetową. W przeciwnym razie wejście głosowe nie może być interpretowane poprawnie i może nie działać. Dodatkowy kontekst, który nie jest częścią widocznej nazwy, można dodać za pomocą aria-describedby.",
        "tip": "Upewnij się, że cała widoczna etykieta (nie tylko jej część) jest zawarta w dostępnej nazwie (ustawionej np. za pomocą aria-label)."
    },
    "EA-R85": {
        "content": "Niewystarczający kontrast tekstu (ulepszony)",
        "explanation": "Jest to ulepszenie AAA do minimalnej reguły kontrastu. Upewnij się, że wszystkie elementy tekstowe mają wystarczający kontrast kolorów między tekstem na pierwszym planie a kolorem tła za nim. Minimalny ulepszony kontrast zależy od rozmiaru tekstu i wynosi 7:1 lub 4,5:1 dla większego tekstu.",
        "tip": "Zwiększ kontrast, np. za pomocą ciemniejszego/jaśniejszego koloru czcionki lub koloru tła. Pomoc oferuje <a target=\"_blank\" href=\"https://dashboard.eye-able.com/tools/contrast-check\">sprawdzanie kontrastu od Eye-Able</a> w panelu narzędzi."
    },
    "EA-R86": {
        "content": "Brak dostępnej nazwy elementu ARIA Meter",
        "explanation": "Wskaźnik to graficzna prezentacja wartości liczbowej w określonym zakresie. Element z rolą \"meter\" musi mieć dostępną nazwę, aby użytkownicy czytników ekranowych mogli zidentyfikować jego treść i cel.",
        "tip": "Dodaj dostępną nazwę do wskaźnika za pomocą atrybutu title, aria-label lub aria-labelledby."
    },
    "EA-R87": {
        "content": "Brak dostępnej nazwy paska postępu ARIA",
        "explanation": "Pasek postępu wskazuje status postępu dla zadań, które zajmują dużo czasu. Element z rolą \"progressbar\" musi mieć dostępną nazwę, aby użytkownicy czytników ekranowych mogli zidentyfikować jego treść i cel.",
        "tip": "Dodaj dostępną nazwę do paska postępu za pomocą atrybutu title, aria-label lub aria-labelledby."
    },
    "EA-R88": {
        "content": "Brak równoważnika aria-braille",
        "explanation": "To sprawdzenie zapewnia, że istnieje równoważnik nienapisany w Braille'u dla treści aria-braillelabel i aria-brailleroledescription. Gdy są używane bez odpowiadającej etykiety lub opisu roli, ARIA mówi, aby zignorować te atrybuty.",
        "tip": "Upewnij się, że zapewniasz równoważnik nienapisany w Braille'u dla wspomnianych atrybutów aria. Może to być atrybut aria-label lub aria-roledescription."
    },
    "EA-R89": {
        "content": "Brak dostępnej nazwy przycisku ARIA, linku lub elementu menu",
        "explanation": "Kluczowe jest, aby każdy przycisk ARIA (role=\"button\"), link (role=\"link\") i element menu (role=\"menuitem\") miały nazwę, którą mogą odczytać technologie wspomagające.",
        "tip": "Upewnij się, że każdy przycisk ARIA, link lub element menu ma opisową i dostępną nazwę. Możesz użyć wewnętrznego tekstu, niepustego atrybutu aria-label lub aria-labelledby."
    },
    "EA-R90": {
        "content": "Roli brakuje wymaganych atrybutów",
        "explanation": "Ta reguła sprawdza, czy elementy, które mają wyraźną rolę, określają również wszystkie wymagane stany i właściwości dla tej roli. Stan elementu nie jest komunikowany użytkownikom czytników ekranowych, jeśli pominięto wymagany atrybut.",
        "tip": "Dodaj brakujące wymagane atrybuty ARIA. Więcej informacji o wymaganych atrybutach znajdziesz w <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#states_and_properties\">specyfikacji ARIA</a>."
    },
    "EA-R91": {
        "content": "Brak dostępnej nazwy narzędzia ARIA tooltip",
        "explanation": "Każdy element narzędzia ARIA (role=\"tooltip\") musi mieć dostępną nazwę, która opisuje jego cel lub funkcję dla użytkowników technologii wspomagających.",
        "tip": "Upewnij się, że każde narzędzie ARIA tooltip ma nazwę, która jest jasna i opisowa. Można to ustawić za pomocą widocznego wewnętrznego tekstu lub atrybutów, takich jak aria-label i aria-labelledby."
    },
    "EA-R92": {
        "content": "Element <blink> jest przestarzały",
        "explanation": "Element <blink> powoduje, że tekst wewnątrz elementu miga z ustaloną prędkością. Nie można tego przerwać przez użytkownika ani wyłączyć jako preferencji. Dlatego treść, która używa migania, nie spełnia Kryterium Sukcesu, ponieważ migotanie może trwać dłużej niż trzy sekundy.",
        "tip": "Usuń wszystkie elementy <blink> ze swojej strony internetowej."
    },
    "EA-R93": {
        "content": "Stronie brakuje sposobu na omijanie powtarzających się bloków",
        "explanation": "Dostarczanie sposobów na pomijanie powtarzających się treści pomaga użytkownikom w bardziej efektywnej nawigacji po witrynie. Ta reguła nie jest spełniona, jeśli strona nie ma ani wewnętrznego linku pomijającego, ani nagłówka, ani regionu punktu orientacyjnego.",
        "tip": "Używanie <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/\">odpowiednich elementów punktów orientacyjnych</a> takich jak &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;, <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">nagłówków</a> lub <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">wewnętrznych linków pomijających</a> może pomóc użytkownikom w bardziej efektywnej nawigacji po witrynie."
    },
    "EA-R94": {
        "content": "Niepoprawna struktura elementu <dl>",
        "explanation": "Lista definicji (<dl>) zawiera listę grup terminów (używając elementów <dt>) i opisów (używając elementów <dd>), na przykład do wyświetlania słownika. Lista definicji może zawierać tylko elementy <dt>, <dd>, <template>, <script> lub <div> w odpowiedniej kolejności.",
        "tip": "Sprawdź, czy twoja lista definicji zawiera tylko elementy <dt>, <div> i <dd>. Upewnij się również, że są one uporządkowane poprawnie, <dt> zawsze powinien poprzedzać elementy <dd>."
    },
    "EA-R95": {
        "content": "Element <dt> lub <dd> nie zawiera <dl>",
        "explanation": "Termin opisu <dt> i szczegóły opisu <dd> zawsze muszą być zawarte przez element listy definicji <dl> lub lista definicji jest nieprawidłowa. W przeciwnym razie technologie wspomagające mogą nie być w stanie prawidłowo rozpoznać listy definicji.",
        "tip": "Upewnij się, że element nadrzędny <dt> lub <dd> to lista definicji <dl> lub <div>, który jest dzieckiem <dl>."
    },
    "EA-R96": {
        "content": "Pole formularza ma wiele etykiet",
        "explanation": "Każde pole formularza powinno mieć tylko jedną powiązaną <label>. W przeciwnym razie występują niespójności w sposobie interpretacji etykiety przez różne technologie wspomagające i kombinacje przeglądarek. Etykiety są połączone z polami formularza za pomocą atrybutu for na <label> i atrybutu id na polu formularza.",
        "tip": "Upewnij się, że każde pole formularza ma tylko jedną powiązaną <label>. Użyj id pola formularza, aby szukać połączonych etykiet."
    },
    "EA-R98": {
        "content": "Wartość atrybutu ID ARIA musi być unikalna",
        "explanation": "ID to unikalny identyfikator dla elementów strony internetowej i odpowiednio nie może być zduplikowany. Jest to szczególnie ważne w przypadku elementów ARIA, ponieważ id jest używane do dołączania dostępnych nazw lub opisów. Zduplikowane identyfikatory to częste błędy walidacji, które mogą zakłócać dostępność etykiet.",
        "tip": "Zmień nazwę ID tak, aby było używane tylko raz na stronie. Upewnij się, że twoje elementy ARIA pozostają prawidłowe."
    },
    "EA-R99": {
        "content": "Listy muszą zawierać tylko elementy <li>",
        "explanation": "Listy (<ul> lub <ol>) muszą być poprawnie ustrukturyzowane, aby były czytelne i poprawnie ogłaszane przez technologię wspomagającą. Lista musi zawierać tylko <li>, <script> lub <template> jako bezpośrednie węzły potomne. Sami elementy listy mogą zawierać inne elementy.",
        "tip": "Upewnij się, że twój węzeł listy (<ul> lub <ol>) ma tylko elementy listy (<li>) jako bezpośrednie węzły potomne."
    },
    "EA-R101": {
        "content": "Unikaj używania elementów <marquee>",
        "explanation": "Element <marquee> tworzy przewijający się tekst, który jest trudny do odczytania i kliknięcia. Element <marquee> jest przestarzały i może powodować problemy z dostępnością i użytecznością, szczególnie dlatego, że jest trudny do wstrzymania.",
        "tip": "Zastąp elementy <marquee> nowoczesnymi animacjami CSS lub innymi technikami."
    },
    "EA-R102": {
        "content": "Unikaj używania map obrazów po stronie serwera",
        "explanation": "Mapy obrazów po stronie serwera nie są dostępne dla użytkowników klawiatury, którzy muszą używać kliknięć myszą, aby uzyskać dostęp do połączonej treści. Sprawia to, że obraz jest niedostępny dla osób, które nawigują wyłącznie za pomocą klawiatury. Ponadto, nie można dostarczyć alternatywnych tekstów dla interaktywnych stref mapy obrazów po stronie serwera, jak można to zrobić z mapami obrazów po stronie klienta.",
        "tip": "Użyj map obrazów po stronie klienta lub innych interaktywnych elementów dla lepszej dostępności."
    },
    "EA-R104": {
        "content": "Cel dotykowy jest zbyt mały",
        "explanation": "Cele dotykowe muszą mieć wystarczającą wielkość i odstęp, aby można je było łatwo aktywować bez niezamierzonego aktywowania sąsiedniego celu. Cele dotykowe muszą mieć co najmniej 24 x 24 piksele CSS lub odległość 24px do następnego celu. Duże cele dotykowe pomagają zapobiegać błędom użytkowników i zapewniają lepsze doświadczenie dla użytkowników mobilnych. Ta reguła zależy od rozmiaru widoku i pozycji przewijania.",
        "tip": "Upewnij się, że twój cel dotykowy ma co najmniej 24 x 24 piksele CSS lub odległość 24px do następnego celu. Istnieje wyjątek, jeśli istnieje inna kontrolka, która może zapewnić podstawową funkcjonalność spełniającą minimalny rozmiar."
    },
    "EA-R105": {
        "content": "Zapewnij odpowiednie wartości dla atrybutu role",
        "explanation": "Nieodpowiednie wartości roli mogą dezorientować użytkowników technologii wspomagających lub skutkować ignorowaniem elementów.",
        "tip": "Sprawdź, czy atrybut roli ma odpowiednią wartość dla danego elementu."
    },
    "EA-R106": {
        "content": "Dialog ARIA brak dostępnej nazwy",
        "explanation": "Użytkownicy czytników ekranowych nie mogą zrozumieć celu dialogów ARIA (elementy z rolą \"dialog\" lub \"alertdialog\"), które nie mają dostępnej nazwy. Dostępna nazwa dostarcza kontekstu do dialogu, umożliwiając użytkownikom czytników ekranowych zrozumienie jego celu i funkcji.",
        "tip": "Upewnij się, że dialog ARIA ma dostępną nazwę. Użyj atrybutów aria-label lub aria-labelledby do tego celu."
    },
    "EA-R107": {
        "content": "Zapewnij poprawne użycie role=\"text\"",
        "explanation": "Rola \"text\" powinna być używana na elementach bez potomków możliwych do skupienia, aby uniknąć problemów nawigacyjnych dla użytkowników czytników ekranowych.",
        "tip": "Użyj role=\"text\" dla elementów bez potomków możliwych do skupienia."
    },
    "EA-R108": {
        "content": "Element drzewa ARIA brak dostępnej nazwy",
        "explanation": "Drzewo (role=\"tree\") to hierarchiczna lista z węzłami rodzica i dziecka, które można rozwijać i zwijać. Element drzewa (role=\"treeitem\") to węzeł w drzewie. Bez dostępnej nazwy, czytniki ekranowe nie są w stanie określić celu elementu drzewa.",
        "tip": "Przypisz opisową nazwę do elementu drzewa za pomocą wewnętrznego tekstu, atrybutu aria-label lub aria-labelledby."
    },
    "EA-R110": {
        "content": "Element formularza brak widocznej etykiety",
        "explanation": "Widoczne etykiety poprawiają dostępność formularzy, dostarczając jasny kontekst dla użytkowników widzących. Poleganie wyłącznie na ukrytych etykietach, tytule lub aria-describedby może być ograniczające. Atrybuty title i aria-describedby dostarczają dodatkowych informacji, takich jak wskazówki. Ponieważ wskazówki są prezentowane inaczej niż etykiety dla interfejsów API dostępności, może to powodować problemy z technologiami wspomagającymi.",
        "tip": "Zapewnij widoczną i jasną etykietę. Idealnie użyj elementu <label>. Jeśli nie jest to możliwe, można również użyć aria-label lub aria-labelledby."
    },
    "EA-R111": {
        "content": "Punkt orientacyjny banera nie jest na najwyższym poziomie",
        "explanation": "Dzięki <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">punktom orientacyjnym</a>, niewidomi użytkownicy korzystający z czytnika ekranowego mają możliwość przeskakiwania do sekcji strony internetowej. Rola banera (role=\"banner\") służy do definiowania globalnego nagłówka witryny, na przykład funkcji wyszukiwania, globalnej nawigacji lub hasła. Jeśli punkt orientacyjny banera nie jest punktem orientacyjnym najwyższego poziomu (i jest zawarty w innym punkcie orientacyjnym), nie definiuje skutecznie ustalonej części nagłówka układu.",
        "tip": "Upewnij się, że każdy punkt orientacyjny banera nie jest zawarty w innym punkcie orientacyjnym."
    },
    "EA-R112": {
        "content": "Punkt orientacyjny complementary nie jest na najwyższym poziomie",
        "explanation": "Dzięki <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">punktom orientacyjnym</a>, niewidomi użytkownicy korzystający z czytnika ekranowego mają możliwość przeskakiwania do sekcji strony internetowej. Uzupełniająca treść, jak &lt;aside&gt; lub role=\"complementary\", uzupełnia główną treść dokumentu lub strony. Użytkownicy czytników ekranowych mają możliwość pominięcia treści uzupełniającej, gdy pojawia się ona na najwyższym poziomie strony. Ta opcja nie jest dostępna, jeśli osadzisz element &lt;aside&gt; w innym punkcie orientacyjnym.",
        "tip": "Upewnij się, że każdy punkt orientacyjny complementary (&lt;aside&gt; lub role=\"complementary\") nie jest zawarty w innym punkcie orientacyjnym."
    },
    "EA-R113": {
        "content": "Punkt orientacyjny contentinfo nie jest na najwyższym poziomie",
        "explanation": "Dzięki <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">punktom orientacyjnym</a>, niewidomi użytkownicy korzystający z czytnika ekranowego mają możliwość przeskakiwania do sekcji strony internetowej. Rola contentinfo (role=\"contentinfo\") definiuje stopkę, zawierającą informacje takie jak informacje o prawach autorskich, linki nawigacyjne i oświadczenia o prywatności. Umieszczenie jej w innym punkcie orientacyjnym może uniemożliwić niewidomym użytkownikom czytników ekranowych szybkie znalezienie i nawigowanie do stopki.",
        "tip": "Upewnij się, że punkt orientacyjny contentinfo (role=\"contentinfo\") nie jest zawarty w innym punkcie orientacyjnym."
    },
    "EA-R114": {
        "content": "Główny punkt orientacyjny nie jest na najwyższym poziomie",
        "explanation": "Dzięki <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">punktom orientacyjnym</a>, niewidomi użytkownicy korzystający z czytnika ekranowego mają możliwość przeskakiwania do sekcji strony internetowej. Główna rola punktu orientacyjnego (&lt;main role=\"main\"&gt;) jest używana do wskazywania głównej treści dokumentu. Najlepszą praktyką jest upewnienie się, że główny punkt orientacyjny nie jest zawarty w innym punkcie orientacyjnym.",
        "tip": "Upewnij się, że główny punkt orientacyjny (&lt;main role=\"main\"&gt;) nie jest zawarty w innym punkcie orientacyjnym."
    },
    "EA-R115": {
        "content": "Istnieje więcej niż jeden punkt orientacyjny banner",
        "explanation": "Dzięki <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">punktom orientacyjnym</a>, niewidomi użytkownicy korzystający z czytnika ekranowego mają możliwość przeskakiwania do sekcji strony internetowej. Posiadanie wielu punktów orientacyjnych banner może wprowadzać w błąd nawigację czytnika ekranowego, utrudniając rozróżnienie głównego nagłówka lub treści wprowadzającej.",
        "tip": "Upewnij się, że każda strona HTML ma tylko jeden punkt orientacyjny banner. Zdecyduj, który punkt orientacyjny banner chcesz zachować i usuń wszystkie inne punkty orientacyjne banner."
    },
    "EA-R116": {
        "content": "Istnieje więcej niż jeden punkt orientacyjny contentinfo",
        "explanation": "Dzięki <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">punktom orientacyjnym</a>, niewidomi użytkownicy korzystający z czytnika ekranowego mają możliwość przeskakiwania do sekcji strony internetowej. Wielokrotne punkty orientacyjne contentinfo (role=\"contentinfo\") mogą dezorientować użytkowników technologii wspomagających, sugerując wiele regionów stopki.",
        "tip": "Upewnij się, że każda strona HTML ma tylko jeden punkt orientacyjny contentinfo. Zdecyduj, który punkt orientacyjny contentinfo chcesz zachować i usuń wszystkie inne punkty orientacyjne."
    },
    "EA-R117": {
        "content": "Istnieje więcej niż jeden główny punkt orientacyjny",
        "explanation": "Dzięki <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">punktom orientacyjnym</a>, niewidomi użytkownicy korzystający z czytnika ekranowego mają możliwość przeskakiwania do sekcji strony internetowej. Główna rola punktu orientacyjnego (&lt;main role=\"main\"&gt;) jest używana do wskazywania głównej treści dokumentu. Wielokrotne główne punkty orientacyjne mogą utrudniać użytkownikom identyfikację głównego obszaru treści.",
        "tip": "Ogranicz swoją stronę do jednego głównego punktu orientacyjnego (&lt;main role=\"main\"&gt;), aby jasno wskazać główną treść. Usuń zduplikowane główne punkty orientacyjne."
    },
    "EA-R118": {
        "content": "Główny punkt orientacyjny brakuje",
        "explanation": "Dzięki <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">punktom orientacyjnym</a>, niewidomi użytkownicy korzystający z czytnika ekranowego mają możliwość przeskakiwania do sekcji strony internetowej. Treść poza tymi sekcjami jest trudna do znalezienia, a jej cel może być niejasny. Główny punkt orientacyjny (&lt;main role=\"main\"&gt;) umożliwia użytkownikom technologii wspomagających szybkie nawigowanie do głównej treści.",
        "tip": "Dodaj główny punkt orientacyjny (<main>) na swojej stronie internetowej i umieść w nim główną treść swojej strony."
    },
    "EA-R119": {
        "content": "Punkt orientacyjny nie jest unikalny",
        "explanation": "Unikalne punkty orientacyjne pomagają użytkownikom odróżnić różne sekcje treści. Zduplikowane punkty orientacyjne mogą wprowadzać w błąd użytkowników i utrudniać nawigację do pożądanej treści. Niektóre punkty orientacyjne, takie jak <header> lub <footer>, mogą istnieć tylko raz na stronie, podczas gdy inne, takie jak <nav> lub <section>, muszą mieć unikalne dostępne nazwy (np. z atrybutu aria-label lub aria-labelledby).",
        "tip": "Upewnij się, że punkt orientacyjny ma unikalną rolę lub kombinację roli/etykiety/tytułu. Na przykład zmień etykietę, aby region był unikalny."
    },
    "EA-R120": {
        "content": "Atrybut scope w tabeli jest niepoprawny",
        "explanation": "Atrybut scope w tabelach pomaga użytkownikom technologii wspomagających zrozumieć związek między nagłówkami a komórkami danych. Atrybut scope może być używany tylko na nagłówkach tabeli <th> i musi mieć wartość \"col\" lub \"row\".",
        "tip": "Upewnij się, że atrybut scope jest używany tylko na nagłówkach tabeli <th> i że wartość to \"col\" lub \"row\"."
    },
    "EA-R121": {
        "content": "Strona nie ma linku pomijania",
        "explanation": "Linki pomijania dostarczają linku na górze strony, który po aktywowaniu przeskakuje użytkownika na początek głównego obszaru treści. W przeciwnym razie użytkownicy klawiatury i czytników ekranowych muszą nawigować długą listę linków nawigacyjnych i innych elementów, zanim dotrą do głównej treści. Typowym linkiem pomijania jest \"przejdź do treści\" za pomocą linku z kotwicą (np. #main-content). Zaleca się, aby link był ukryty, dopóki użytkownik nie nawiguje do niego za pomocą klawiatury.",
        "tip": "Dodaj link pomijania do głównej treści na stronie. Jeśli już masz link pomijania, upewnij się, że można go osiągnąć za pomocą klawiatury."
    },
    "EA-R122": {
        "content": "Upewnij się, że wartości tabindex wynoszą 0 lub są ujemne",
        "explanation": "Używanie wartości tabindex większych niż 0 może zakłócać naturalny porządek klawiszy, powodując trudności w nawigacji dla użytkowników klawiatury i technologii wspomagających.",
        "tip": "Ustaw wartości tabindex na 0 lub pozostaw je nieustawione, aby uzyskać naturalny porządek klawiszy. Użyj wartości ujemnych dla elementów programowo skupialnych."
    },
    "EA-R123": {
        "content": "Tabela ma identyczny podpis i podsumowanie",
        "explanation": "Posiadanie tego samego tekstu w elemencie <caption> tabeli i jego atrybucie summary jest zbędne i może potencjalnie wprowadzać w błąd. Element <caption> jest używany jako tytuł na ekranie, podczas gdy atrybut summary jest używany przez czytniki ekranowe do dostępu do podsumowania celu tabeli.",
        "tip": "Upewnij się, że tekst w elemencie <caption> jest inny niż atrybut summary tabeli, aby uniknąć zamieszania."
    },
    "EA-R124": {
        "content": "Identyczne linki z różnymi celami",
        "explanation": "Linki o tej samej dostępnej nazwie powinny mieć taką samą funkcjonalność/cel, aby uniknąć zamieszania. Opis linku pozwala użytkownikowi odróżnić każdy link od innych na stronie internetowej, które prowadzą do innych miejsc docelowych, i pomaga użytkownikowi zdecydować, czy chce przejść do linku.",
        "tip": "Unikaj posiadania linków o identycznych opisach (np. z tekstu wewnętrznego, atrybutów alt lub aria), które prowadzą do różnych adresów URL. Podaj tekst linku, który opisuje cel i miejsce docelowe linku."
    },
    "EA-R1": {
        "content": "Nieprawidłowa składnia SVG",
        "explanation": "Składnia elementu SVG nie jest poprawna. Brakuje atrybutu role-attribute lub elementu title/desc.",
        "tip": "Sprawdź rolę SVG lub element title/desc."
    },
    "EA-R125": {
        "content": "Upewnij się, że język strony jest prawidłowy.",
        "explanation": "Język w tle nie pasuje do wszystkich elementów na stronie. Jest to zrozumiałe, gdy te elementy są w sposób prawidłowy przypisane do własnego atrybutu językowego. W przeciwnym razie jest to na przykład Aussprache einer Sprachausgabe inkorrekt.",
        "tip": "Upewnij się, że wszystkie inne elementy na stronie posiadają odpowiedni atrybut długości."
    }
};