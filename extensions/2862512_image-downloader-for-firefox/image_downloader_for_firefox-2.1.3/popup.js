//All rights reserved to Artur Akerberg 2024

const browserType = "firefox"; //chrome/edge/firefox
const debugMode = false;
const translations = {
    "am": ["መጠን", "ዓይነት", "ንድፍ", "ዩ አር ኤል", "አድቫንስድ", "አስቀምጥ", "Images:", "User guide", "Rate us", "Contact us", "Width:", "Height:", "All", "Wide", "Square", "Tall", "Include", "Exclude", "Image versions:", "Smallest", "Largest (recommended)", "All unique", "All", "Folder:", "Auto", "File:", "Auto","Web browsers prevent extensions from working on the add-ons store site.", "Extensions can only work on web pages.","Extension failed to capture the images.\nRefresh the page, wait until the images are loaded on the page, then open the extension. If it still fails, it is possible that the site employs techniques that prevent image detection. See if you can capture images on a different site.","None of the images passed your filtering. Consider relaxing the requirements.", "Searching...", "Finished.", "Get more images of"], 
    "ar": ["الحجم", "النوع", "التخطيط", "الرابط", "متقدم", "حفظ باسم", "الصور:", "دليل المستخدم", "قيمنا", "اتصل بنا", "العرض:", "الارتفاع:", "الكل", "واسع", "مربع", "طويل", "تضمين", "استبعاد", "نسخ الصور:", "الأصغر", "الأكبر (موصى به)", "جميع الفريدة", "الكل", "المجلد:", "تلقائي", "الملف:", "تلقائي", "تمنع المتصفحات الإضافات من العمل على موقع متجر الإضافات.", "الإضافات يمكن أن تعمل فقط على الصفحات الإلكترونية.", "فشل الامتداد في التقاط الصور.\nتحديث الصفحة، انتظر حتى يتم تحميل الصور على الصفحة، ثم افتح الامتداد. إذا استمر الفشل، قد يستخدم الموقع تقنيات تمنع اكتشاف الصور. تحقق مما إذا كان يمكنك التقاط الصور على موقع آخر.", "لم يمر أي من الصور مع تصفيتك. حاول استرخاء المتطلبات.", "جارٍ البحث...", "تم.", "احصل على المزيد من الصور من"],
    "bn": ["আকার", "প্রকার", "বিন্যাস", "ইউআরএল", "অ্যাডভান্সড", "সংরক্ষণ করুন", "চিত্র:", "ব্যবহারকারী গাইড", "আমাদের রেটিং দিন", "আমাদের সাথে যোগাযোগ করুন", "প্রস্থ:", "উচ্চতা:", "সব", "প্রশস্ত", "স্কয়ার", "টল", "শামিল", "বাইরে রাখুন", "চিত্র সংস্করণ:", "সর্বনিম্ন", "সর্বাধিক (প্রস্তাবিত)", "সকল অনন্য", "সব", "ফোল্ডার:", "অটো", "ফাইল:", "অটো", "ওয়েব ব্রাউজারগুলি অ্যাড-অন স্টোর সাইটে এক্সটেনশনগুলিকে কাজ করতে বাধা দেয়।", "এক্সটেনশন শুধুমাত্র ওয়েব পৃষ্ঠায় কাজ করতে পারে।", "এক্সটেনশন চিত্রগুলি ক্যাপচার করতে ব্যর্থ হয়েছে।\nপৃষ্ঠাটি রিফ্রেশ করুন, চিত্রগুলি পৃষ্ঠায় লোড হওয়া পর্যন্ত অপেক্ষা করুন, তারপর এক্সটেনশনটি খুলুন। যদি এটি এখনও ব্যর্থ হয়, তবে এটি সম্ভবত সাইটে এমন প্রযুক্তি রয়েছে যা চিত্র সনাক্তকরণ প্রতিরোধ করে। দেখুন যদি আপনি অন্য সাইটে চিত্র ক্যাপচার করতে পারেন।", "আপনার ফিল্টারিংয়ে কোনও চিত্র পাস করেনি। প্রয়োজনীয়তাগুলি শিথিল করার কথা বিবেচনা করুন।", "অনুসন্ধান হচ্ছে...", "সমাপ্ত।", "আরও চিত্র পান"],
    "bg": ["Размер", "Тип", "Оформление", "URL", "Разширени", "Запиши като", "Изображения:", "Ръководство за потребителя", "Оценете ни", "Свържете се с нас", "Ширина:", "Височина:", "Всички", "Широк", "Квадратен", "Висок", "Включи", "Изключи", "Версии на изображения:", "Най-малко", "Най-голямо (препоръчително)", "Всички уникални", "Всички", "Папка:", "Авто", "Файл:", "Авто", "Уеб браузърите не позволяват разширения да работят в сайта на магазина за добавки.", "Разширенията могат да работят само на уеб страници.", "Разширението не успя да заснеме изображения.\nПрезаредете страницата, изчакайте изображенията да се заредят и след това отворете разширението. Ако все още не успее, е възможно сайтът да използва техники, които предотвратяват откритие на изображения. Проверете дали можете да заснемете изображения на друг сайт.", "Нито едно от изображенията не премина вашето филтриране. Помислете за отпускане на изискванията.", "Търсене...", "Завършено.", "Вземете още изображения от"],
    "ca": ["Mida", "Tipus", "Disseny", "URL", "Avançat", "Desa com", "Imatges:", "Manual d'usuari", "Valora'ns", "Contacta amb nosaltres", "Amplada:", "Alçada:", "Tots", "Ampli", "Quadrat", "Alt", "Inclou", "Exclou", "Versions d'imatges:", "Més petit", "Més gran (recomanat)", "Tots els únics", "Tots", "Carpeta:", "Automàtic", "Fitxer:", "Automàtic", "Els navegadors web impedeixen que les extensions funcionin a la pàgina de la botiga d'extensions.", "Les extensions només poden funcionar a les pàgines web.", "L'extensió ha fallat en capturar les imatges.\nActualitza la pàgina, espera fins que les imatges es carreguin a la pàgina, i després obre l'extensió. Si encara falla, és possible que el lloc utilitzi tècniques que impedeixen la detecció d'imatges. Comprova si pots capturar imatges a un altre lloc.", "Cap de les imatges ha passat el teu filtratge. Considera relaxar els requisits.", "Cercant...", "Acabat.", "Obteniu més imatges de"],
    "zh_CN": ["大小", "类型", "布局", "网址", "高级", "另存为", "图片:", "用户指南", "评价我们", "联系我们", "宽度:", "高度:", "全部", "宽", "方形", "高", "包括", "排除", "图片版本:", "最小", "最大（推荐）", "所有独特", "全部", "文件夹:", "自动", "文件:", "自动", "网页浏览器禁止扩展在插件商店网站上工作。", "扩展只能在网页上工作。", "扩展捕获图片失败。\n刷新页面，等待图片加载完毕后再打开扩展。如果仍然失败，可能是该网站使用了防止图像检测的技术。查看是否能在其他网站捕获图像。", "没有图片通过您的过滤条件。考虑放宽要求。", "正在搜索...", "完成。", "获取更多图片"],
    "zh_TW": ["大小", "類型", "佈局", "網址", "進階", "另存為", "圖片:", "使用者指南", "評價我們", "聯繫我們", "寬度:", "高度:", "全部", "寬", "方形", "高", "包含", "排除", "圖片版本:", "最小", "最大（建議）", "所有唯一", "全部", "資料夾:", "自動", "檔案:", "自動", "網頁瀏覽器會阻止擴充功能在附加元件商店網站上運作。", "擴充功能只能在網頁上運作。", "擴充功能無法捕捉圖片。\n刷新頁面，等圖片加載完成後再打開擴充功能。如果仍然失敗，可能是網站使用了防止圖片檢測的技術。檢查是否能在其他網站捕捉圖片。", "您的過濾條件沒有通過任何圖片。考慮放寬要求。", "搜尋中...", "完成。", "獲取更多圖片"],
    "hr": ["Veličina", "Tip", "Izgled", "URL", "Napredno", "Spremi kao", "Slike:", "Korisnički priručnik", "Ocijenite nas", "Kontaktirajte nas", "Širina:", "Visina:", "Svi", "Širok", "Kvadrat", "Visok", "Uključi", "Isključi", "Verzije slika:", "Najmanje", "Najveće (preporučeno)", "Sve jedinstvene", "Sve", "Mapa:", "Automatski", "Datoteka:", "Automatski", "Web preglednici sprječavaju rad ekstenzija na stranici trgovine ekstenzija.", "Ekstenzije mogu raditi samo na web stranicama.", "Ekstenzija nije uspjela snimiti slike.\nOsvježite stranicu, pričekajte dok slike ne budu učitane na stranici, pa zatim otvorite ekstenziju. Ako i dalje ne uspije, moguće je da stranica koristi tehnike koje sprječavaju otkrivanje slika. Provjerite možete li snimiti slike na drugoj stranici.", "Nijedna slika nije prošla vaše filtriranje. Razmislite o opuštanju zahtjeva.", "Pretraživanje...", "Završeno.", "Preuzmite više slika iz"],
    "cs": ["Velikost", "Typ", "Rozvržení", "URL", "Pokročilé", "Uložit jako", "Obrázky:", "Příručka", "Hodnotit nás", "Kontaktujte nás", "Šířka:", "Výška:", "Vše", "Široké", "Čtverec", "Vysoké", "Zahrnout", "Vyloučit", "Verze obrázků:", "Nejmenší", "Největší (doporučeno)", "Všechny jedinečné", "Vše", "Složka:", "Automatické", "Soubor:", "Automatické", "Webové prohlížeče brání rozšířením v práci na stránkách obchodu s rozšířeními.", "Rozšíření mohou fungovat pouze na webových stránkách.", "Rozšíření selhalo při zachycení obrázků.\nObnovte stránku, počkejte, až se obrázky načtou, a pak otevřete rozšíření. Pokud to stále selže, je možné, že stránka používá techniky, které brání detekci obrázků. Zkontrolujte, zda můžete zachytit obrázky na jiné stránce.", "Žádný obrázek neprošel vaším filtrováním. Zvažte uvolnění požadavků.", "Hledání...", "Dokončeno.", "Získejte více obrázků z"],
    "da": ["Størrelse", "Type", "Layout", "URL", "Avanceret", "Gem som", "Billeder:", "Brugervejledning", "Bedøm os", "Kontakt os", "Bredde:", "Højde:", "Alle", "Bred", "Firkantet", "Høj", "Inkluder", "Ekskluder", "Billedversioner:", "Mindste", "Største (anbefalet)", "Alle unikke", "Alle", "Mappe:", "Automatisk", "Fil:", "Automatisk", "Webbrowseren forhindrer udvidelser i at fungere på add-ons store-sitet.", "Udvidelser kan kun fungere på websider.", "Udvidelsen kunne ikke fange billeder.\nOpdater siden, vent på, at billederne er indlæst på siden, og åbn derefter udvidelsen. Hvis det stadig mislykkes, er det muligt, at websitet anvender teknikker, der forhindrer billeddetektion. Se, om du kan fange billeder på en anden side.", "Ingen af billederne passer til din filtrering. Overvej at slappe af med kravene.", "Søger...", "Færdig.", "Hent flere billeder fra"],
    "nl": ["Grootte", "Type", "Indeling", "URL", "Geavanceerd", "Opslaan als", "Afbeeldingen:", "Gebruikershandleiding", "Beoordeel ons", "Neem contact met ons op", "Breedte:", "Hoogte:", "Alles", "Breed", "Vierkant", "Lang", "Insluiten", "Uitsluiten", "Afbeeldingversies:", "Kleinste", "Grootste (aanbevolen)", "Alle unieke", "Alle", "Map:", "Auto", "Bestand:", "Auto", "Webbrowsers verhinderen dat extensies werken op de add-ons winkelpagina.", "Extensies kunnen alleen werken op webpagina's.", "De extensie is niet gelukt om de afbeeldingen vast te leggen.\nVervers de pagina, wacht totdat de afbeeldingen op de pagina geladen zijn, en open de extensie opnieuw. Als het nog steeds mislukt, kan het zijn dat de site technieken gebruikt die afbeeldingsdetectie blokkeren. Kijk of je afbeeldingen kunt vastleggen op een andere site.", "Geen van de afbeeldingen voldeed aan je filterinstellingen. Overweeg om de vereisten te versoepelen.", "Zoeken...", "Voltooid.", "Krijg meer afbeeldingen van"],
    "en": ["Size", "Type", "Layout", "URL", "Advanced", "Save As", "Images:", "User guide", "Rate us", "Contact us", "Width:", "Height:", "All", "Wide", "Square", "Tall", "Include", "Exclude", "Image versions:", "Smallest", "Largest (recommended)", "All unique", "All", "Folder:", "Auto", "File:", "Auto","Web browsers prevent extensions from working on the add-ons store site.", "Extensions can only work on web pages.","Extension failed to capture the images.\nRefresh the page, wait until the images are loaded on the page, then open the extension. If it still fails, it is possible that the site employs techniques that prevent image detection. See if you can capture images on a different site.","None of the images passed your filtering. Consider relaxing the requirements.", "Searching...", "Finished.", "Get more images of"], 
    "et": ["Suurus", "Tüüp", "Paigutus", "URL", "Täiendav", "Salvesta kui", "Pildid:", "Kasutajajuhend", "Hinnake meid", "Kontaktige meid", "Laius:", "Kõrgus:", "Kõik", "Lai", "Ruudu", "Kõrge", "Sisalda", "Välista", "Pildi versioonid:", "Väikeim", "Suurim (soovitatav)", "Kõik ainulaadsed", "Kõik", "Kaust:", "Automaatne", "Fail:", "Automaatne", "Veebibrauserid takistavad lisandmoodulite toimimist lisandmoodulite poe veebilehel.", "Lisandmoodulid saavad töötada ainult veebilehtedel.", "Lisandmoodul ei suutnud pilte tabada.\nVärskendage lehte, oodake, kuni pildid lehele laaditakse, ja avage seejärel lisandmoodul. Kui see ikka ei õnnestu, võib-olla kasutab veebileht tehnikaid, mis takistavad piltide tuvastamist. Kontrollige, kas saate pilte teisel veebilehel püüda.", "Ükski pilt ei läbinud teie filtreerimist. Kaaluge nõuete leevendamist.", "Otsimine...", "Lõpetatud.", "Hangi rohkem pilte aadressilt"],
    "fil": ["Laki", "Uri", "I-layout", "URL", "Advanced", "I-save bilang", "Mga Larawan:", "Gabayan ang Gumagamit", "I-rate kami", "Makipag-ugnay sa Amin", "Lapad:", "Taas:", "Lahat", "Malapad", "Parisukat", "Mataas", "Isama", "Iwasan", "Bersyon ng mga Larawan:", "Pinakamaliit", "Pinakamalaki (inirerekomenda)", "Lahat ng natatangi", "Lahat", "Folder:", "Awtomatik", "File:", "Awtomatik", "Pinipigilan ng mga web browser ang mga extension na gumana sa website ng mga add-on store.", "Ang mga extension ay maaaring gumana lamang sa mga web page.", "Ang extension ay nabigong kunin ang mga larawan.\nI-refresh ang pahina, maghintay hanggang ang mga larawan ay ma-load sa pahina, pagkatapos ay buksan ang extension. Kung magpapatuloy pa rin ito, maaaring gumagamit ang site ng mga teknik na pumipigil sa pagkilala ng mga larawan. Tingnan kung maaari kang mag-capture ng mga larawan sa ibang site.", "Walang anumang mga larawan na nakapasa sa iyong pag-filter. Isaalang-alang ang pagpapaluwag ng mga kinakailangan.", "Naghahanap...", "Tapos na.", "Kumuha ng mas maraming larawan mula sa"],
    "fi": ["Koko", "Tyyppi", "Asettelu", "URL", "Lisäasetukset", "Tallenna nimellä", "Kuvat:", "Käyttöopas", "Arvostele meidät", "Ota yhteyttä", "Leveys:", "Korkeus:", "Kaikki", "Leveä", "Neliö", "Korkea", "Sisällytä", "Poissulje", "Kuvan versiot:", "Pienin", "Suurin (suositeltu)", "Kaikki ainutlaatuiset", "Kaikki", "Kansio:", "Automaattinen", "Tiedosto:", "Automaattinen", "Verkkoselaimet estävät laajennuksia toimimasta lisäosakaupan sivustolla.", "Laajennukset voivat toimia vain verkkosivuilla.", "Laajennus ei onnistunut tallentamaan kuvia.\nPäivitä sivu, odota, että kuvat latautuvat sivulle, ja avaa sitten laajennus. Jos se epäonnistuu edelleen, sivusto saattaa käyttää tekniikoita, jotka estävät kuvien havaitsemisen. Katso, voitko tallentaa kuvia toiselta sivustolta.", "Mikään kuvista ei läpäissyt suodattamistasi. Harkitse vaatimusten löysäämistä.", "Etsitään...", "Valmis.", "Hanki lisää kuvia"],
    "fr": ["Taille", "Type", "Disposition", "URL", "Avancé", "Enregistrer sous", "Images:", "Guide de l'utilisateur", "Évaluez-nous", "Contactez-nous", "Largeur:", "Hauteur:", "Tout", "Large", "Carré", "Grand", "Inclure", "Exclure", "Versions des images:", "Plus petit", "Plus grand (recommandé)", "Toutes les uniques", "Tout", "Dossier:", "Automatique", "Fichier:", "Automatique", "Les navigateurs web empêchent les extensions de fonctionner sur le site du magasin d'extensions.", "Les extensions ne peuvent fonctionner que sur les pages web.", "L'extension n'a pas pu capturer les images.\nActualisez la page, attendez que les images soient chargées sur la page, puis ouvrez l'extension. Si cela échoue encore, il est possible que le site utilise des techniques empêchant la détection des images. Vérifiez si vous pouvez capturer des images sur un autre site.", "Aucune des images n'a passé votre filtrage. Envisagez de relâcher les exigences.", "Recherche...", "Terminé.", "Obtenez plus d'images de"],
    "de": ["Größe", "Typ", "Layout", "URL", "Erweitert", "Speichern unter", "Bilder:", "Benutzerhandbuch", "Bewerten Sie uns", "Kontaktieren Sie uns", "Breite:", "Höhe:", "Alle", "Weit", "Quadratisch", "Hoch", "Einbeziehen", "Ausschließen", "Bildversionen:", "Kleinste", "Größte (empfohlen)", "Alle einzigartigen", "Alle", "Ordner:", "Automatisch", "Datei:", "Automatisch", "Webbrowser verhindern, dass Erweiterungen auf der Add-ons-Store-Seite funktionieren.", "Erweiterungen können nur auf Webseiten funktionieren.", "Die Erweiterung konnte die Bilder nicht erfassen.\nAktualisieren Sie die Seite, warten Sie, bis die Bilder auf der Seite geladen sind, und öffnen Sie dann die Erweiterung. Wenn es immer noch fehlschlägt, kann es sein, dass die Seite Techniken verwendet, die die Bilderkennung verhindern. Überprüfen Sie, ob Sie auf einer anderen Seite Bilder erfassen können.", "Keines der Bilder hat Ihre Filterung bestanden. Erwägen Sie, die Anforderungen zu lockern.", "Suche...", "Fertig.", "Holen Sie sich mehr Bilder von"],
    "el": ["Μέγεθος", "Τύπος", "Διάταξη", "URL", "Σύνθετο", "Αποθήκευση ως", "Εικόνες:", "Οδηγός χρήστη", "Βαθμολογήστε μας", "Επικοινωνήστε μαζί μας", "Πλάτος:", "Ύψος:", "Όλα", "Φαρδύ", "Τετράγωνο", "Υψηλό", "Συμπερίληψη", "Αποκλεισμός", "Εκδόσεις εικόνας:", "Μικρότερο", "Μεγαλύτερο (συνιστάται)", "Όλα τα μοναδικά", "Όλα", "Φάκελος:", "Αυτόματο", "Αρχείο:", "Αυτόματο", "Οι περιηγητές ιστού εμποδίζουν τις επεκτάσεις να λειτουργούν στον ιστότοπο καταστήματος προσθηκών.", "Οι επεκτάσεις μπορούν να λειτουργούν μόνο στις ιστοσελίδες.", "Η επέκταση απέτυχε να καταγράψει τις εικόνες.\nΑνανεώστε τη σελίδα, περιμένετε μέχρι να φορτωθούν οι εικόνες στη σελίδα και μετά ανοίξτε την επέκταση. Εάν αποτύχει ξανά, είναι πιθανό η σελίδα να χρησιμοποιεί τεχνικές που εμποδίζουν την ανίχνευση εικόνας. Δείτε αν μπορείτε να καταγράψετε εικόνες σε άλλη σελίδα.", "Καμία από τις εικόνες δεν πέρασε το φιλτράρισμά σας. Σκεφτείτε να χαλαρώσετε τις απαιτήσεις.", "Αναζήτηση...", "Ολοκληρώθηκε.", "Πάρτε περισσότερες εικόνες από"],
    "gu": ["આકાર", "પ્રકાર", "વિન્યાસ", "યુઆરએલ", "અદ્યતન", "સાચવો તરીકે", "છબીઓ:", "ઉપરિગ્રહ માર્ગદર્શિકા", "અમને રેટ કરો", "અમારો સંપર્ક કરો", "વિશાળતા:", "ઉંચાઈ:", "બધા", "વિશાળ", "ચોરસ", "ઊંચા", "સમાવિષ્ટ કરો", "બહાર રાખો", "છબી સંસ્કરણો:", "સુત્રિયું", "વિશેષ (સુપરિશ્રિત)", "બધા અનોખા", "બધા", "ફોલ્ડર:", "આટો", "ફાઇલ:", "આટો", "વેબ બ્રાઉઝરથી એડ-ઓન સ્ટોર સાઇટ પર એક્સટેંશન્સને કાર્ય કરવાથી રોકી દેવું છે.", "એક્સટેંશન્સ માત્ર વેબ પૃષ્ઠો પર કાર્ય કરી શકે છે.", "એક્સટેંશન છબીઓ પકડી લેવા માની નથી.\nપૃષ્ઠને રિફ્રેશ કરો, છબીઓ પૃષ્ઠ પર લોડ થવા માટે રાહ જોવો, પછી એક્સટેંશન ખોલો. જો તે હજુ પણ નિષ્ફળ થાય છે, તો કદાચ સાઇટમાં એડીટ ડીટેકશનને અટકાવતી તકનીકીઓનો ઉપયોગ થઈ રહ્યો છે. જો તમે બીજા સાઇટ પર છબીઓ પકડી શકો છો, તો તપાસો.", "તમારા ફિલ્ટરિંગથી કોઈ છબી પાસ થઈ નથી. આવશ્યકતાઓ મૂળ રાખવા માટે વિચાર કરો.", "શોધી રહ્યું છે...", "સમાપ્ત.", "વધુ છબીઓ મેળવવા માટે"],
    "he": ["גודל", "סוג", "פריסה", "URL", "מתקדם", "שמור כ", "תמונות:", "מדריך למשתמש", "דרג אותנו", "צור קשר", "רוחב:", "גובה:", "הכל", "רחב", "ריבוע", "גבוה", "כולל", "מנוע", "גרסאות תמונה:", "הקטן ביותר", "הגדול ביותר (מומלץ)", "הכל ייחודי", "הכל", "תיקייה:", "אוטומטי", "קובץ:", "אוטומטי", "דפדפנים מונעים מהתוספים לעבוד על דף החנות של התוספים.", "תוספים יכולים לפעול רק בדפים אינטרנטיים.", "התוסף לא הצליח ללכוד את התמונה.\nחזור לדף, המתן עד שהתמונות יטענו בדף ולאחר מכן פתח את התוסף. אם עדיין לא מצליח, ייתכן שהאתר משתמש בטכניקות המונעות זיהוי תמונות. בדוק אם תוכל ללכוד תמונות באתר אחר.", "אף אחת מהתמונות לא עברה את הסינון שלך. שקול להקל על הדרישות.", "מחפש...", "הושלם.", "הוסף תמונות נוספות מ"],
    "hi": ["आकार", "प्रकार", "लेआउट", "URL", "एडवांस्ड", "के रूप में सहेजें", "चित्र:", "उपयोगकर्ता मार्गदर्शिका", "हमें रेट करें", "संपर्क करें", "चौड़ाई:", "ऊँचाई:", "सभी", "चौड़ा", "वर्ग", "ऊँचा", "शामिल करें", "अलग रखें", "चित्र संस्करण:", "सबसे छोटा", "सबसे बड़ा (सिफारिश की गई)", "सभी अद्वितीय", "सभी", "फ़ोल्डर:", "स्वचालित", "फ़ाइल:", "स्वचालित", "वेब ब्राउज़र प्लगइन स्टोर साइट पर एक्सटेंशन को काम करने से रोकते हैं।", "एक्सटेंशन केवल वेब पृष्ठों पर काम कर सकते हैं।", "एक्सटेंशन चित्रों को कैप्चर करने में विफल हो गया।\nपृष्ठ को पुनः लोड करें, जब तक चित्र पृष्ठ पर लोड न हो जाए, तब तक इंतजार करें और फिर एक्सटेंशन खोलें। यदि यह अभी भी विफल रहता है, तो यह संभव है कि साइट चित्र पहचान को रोकने के लिए तकनीकों का उपयोग करती है। यह जांचें कि क्या आप किसी अन्य साइट पर चित्र कैप्चर कर सकते हैं।", "आपकी फ़िल्टरिंग से कोई चित्र पास नहीं हुआ। आवश्यकताओं को ढीला करने पर विचार करें।", "खोज रहा है...", "समाप्त।", "अधिक चित्र प्राप्त करें"],
    "hu": ["Méret", "Típus", "Elrendezés", "URL", "Haladó", "Mentés másként", "Képek:", "Felhasználói útmutató", "Értékeljen minket", "Lépjen kapcsolatba velünk", "Szélesség:", "Magasság:", "Minden", "Széles", "Négyzet", "Magas", "Tartalmazza", "Kizárja", "Képverziók:", "Legkisebb", "Legnagyobb (ajánlott)", "Minden egyedi", "Minden", "Mappa:", "Automatikus", "Fájl:", "Automatikus", "A webböngészők megakadályozzák a bővítmények működését az add-on áruház oldalán.", "A bővítmények csak weboldalakon működhetnek.", "A bővítmény nem tudta rögzíteni a képeket.\nFrissítse az oldalt, várjon, amíg a képek betöltődnek az oldalon, majd nyissa meg a bővítményt. Ha továbbra is hibát tapasztal, lehetséges, hogy az oldal olyan technikákat alkalmaz, amelyek megakadályozzák a képek észlelését. Nézze meg, hogy képes-e képeket rögzíteni egy másik oldalon.", "Egyik kép sem felelt meg a szűrésnek. Fontolja meg a követelmények lazítását.", "Keresés...", "Befejeződött.", "Több képet szerezhet innen"],
    "id": ["Ukuran", "Tipe", "Tata letak", "URL", "Lanjutan", "Simpan Sebagai", "Gambar:", "Panduan Pengguna", "Nilai kami", "Hubungi kami", "Lebar:", "Tinggi:", "Semua", "Lebar", "Persegi", "Tinggi", "Termasuk", "Kecualikan", "Versi gambar:", "Terkecil", "Terbesar (disarankan)", "Semua unik", "Semua", "Folder:", "Otomatis", "File:", "Otomatis", "Peramban web mencegah ekstensi berfungsi di situs toko add-on.", "Ekstensi hanya dapat berfungsi di halaman web.", "Ekstensi gagal menangkap gambar.\nSegarkan halaman, tunggu sampai gambar dimuat di halaman, lalu buka ekstensi. Jika masih gagal, mungkin situs tersebut menggunakan teknik yang mencegah deteksi gambar. Periksa apakah Anda dapat menangkap gambar di situs lain.", "Tidak ada gambar yang lolos dari penyaringan Anda. Pertimbangkan untuk melonggarkan persyaratan.", "Mencari...", "Selesai.", "Dapatkan lebih banyak gambar dari"],
    "it": ["Dimensione", "Tipo", "Layout", "URL", "Avanzato", "Salva come", "Immagini:", "Guida utente", "Valutaci", "Contattaci", "Larghezza:", "Altezza:", "Tutti", "Largo", "Quadrato", "Alto", "Includi", "Escludi", "Versioni immagine:", "Più piccolo", "Più grande (consigliato)", "Tutti unici", "Tutti", "Cartella:", "Automatico", "File:", "Automatico", "I browser web impediscono alle estensioni di funzionare nel sito del negozio di estensioni.", "Le estensioni possono funzionare solo sulle pagine web.", "L'estensione non è riuscita a catturare le immagini.\nRicarica la pagina, aspetta che le immagini vengano caricate nella pagina e quindi apri l'estensione. Se continua a non funzionare, è possibile che il sito utilizzi tecniche che impediscono il rilevamento delle immagini. Verifica se puoi catturare immagini su un altro sito.", "Nessuna delle immagini ha superato il tuo filtro. Considera di allentare i requisiti.", "Ricerca in corso...", "Fatto.", "Ottieni altre immagini da"],
    "ja": ["サイズ", "タイプ", "レイアウト", "URL", "詳細設定", "名前を付けて保存", "画像:", "ユーザーガイド", "評価する", "お問い合わせ", "幅:", "高さ:", "すべて", "ワイド", "正方形", "高い", "含める", "除外", "画像バージョン:", "最小", "最大（推奨）", "すべてのユニーク", "すべて", "フォルダ:", "自動", "ファイル:", "自動", "ウェブブラウザは拡張機能がアドオンストアページで機能するのをブロックします。", "拡張機能はウェブページでのみ機能します。", "拡張機能が画像をキャプチャできませんでした。\nページを更新し、画像がページに読み込まれるのを待ってから、拡張機能を開いてください。それでも失敗する場合、サイトが画像検出を防ぐ技術を使用している可能性があります。他のサイトで画像をキャプチャできるか確認してください。", "フィルターに合格した画像はありません。要求を緩和することを検討してください。", "検索中...", "完了。", "他の画像を取得するには"],
    "kn": ["ಮಾಪನ", "ಪ್ರಕಾರ", "ಹೂಡಿಕೆ", "URL", "ಆಗುವಿಕೆ", "ಆಗಿರಿಸಲು ಉಳಿಸು", "ಚಿತ್ರಗಳು:", "ಬಳಕೆದಾರ ಗೈಡ್", "ನಮ್ಮನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ", "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", "ಅಗಲಾದ:", "ಎತ್ತರ:", "ಎಲ್ಲಾ", "ಅಗಲಾದ", "ಚದುರ", "ಹೈ", "ಒಗ್ಗಟ್ಟಾಗಿರಿಸಲು", "ವಯೋವ್ಯತ್ಯಾಸ", "ಚಿತ್ರ ಆವೃತ್ತಿಗಳು:", "ಅತ್ಯಂತ ಕಡಿಮೆ", "ಅತ್ಯಂತ ದೊಡ್ಡ (ಆಗುತ್ತದೆ)", "ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯವಾದ", "ಎಲ್ಲಾ", "ಫೋಲ್ಡರ್:", "ಆಟೋ", "ಫೈಲ್:", "ಆಟೋ", "ವೆಬ್ ಬ್ರೌಸರ್‌ಗಳು ಹೆಚ್ಚುವರಿ ಸೇರಿದ ಹೋಗುವಿಕೆಗಾಗಿ ಜತೆಬೆಯಲು ಮಾಡುವುದನ್ನು ತಡೆಯುತ್ತವೆ.", "ಹೆಚ್ಚುವರಿ ವೆಬ್ ಪುಟಗಳಲ್ಲಿ ಮಾತ್ರ ಕೆಲಸ ಮಾಡುವುದನ್ನು ತಡೆಯುತ್ತವೆ.", "ಹೆಚ್ಚುವರಿ ಚಿತ್ರಗಳನ್ನು ಸೇರಲು ವಿಫಲವಾಗಿದೆ.\nಪುಟವನ್ನು ತಾಜಾ ಮಾಡಿರಿ, ಚಿತ್ರಗಳನ್ನು ಪುಟದಲ್ಲಿ ಲೋಡ್ ಮಾಡಲು ಕಾಯಿರಿ, ನಂತರ ಹೆಚ್ಚುವರಿಯನ್ನು ತೆರೆಯಿರಿ. ಇದು ಇನ್ನೂ ವಿಫಲವಾಗಿದ್ದರೆ, ಇದು ಸೈಟ್ ಚಿತ್ರಗಳನ್ನು ಗುರುತಿಸುವುದನ್ನು ತಡೆಯುವ ತಂತ್ರಗಳನ್ನು ಬಳಸಬಹುದು. ನೀವು ಮತ್ತೊಂದು ಸೈಟ್‌ನಲ್ಲಿ ಚಿತ್ರಗಳನ್ನು ಸೇರಿಸಬಹುದೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.", "ನೀವು ಫಿಲ್ಟರ್ ಮಾಡಿದ ಯಾವುದೇ ಚಿತ್ರಗಳು ಉತ್ತೀರ್ಣವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಅವಶ್ಯಕತೆಗಳನ್ನು ಸಡಿಲಿಸಿಕೊಳ್ಳಿ.", "ಹುಡುಕುತ್ತಿದೆ...", "ಮುಗಿಯಿತು.", "ಇತರೆ ಚಿತ್ರಗಳನ್ನು ಪಡೆಯಿರಿ"],
    "ko": ["크기", "유형", "레이아웃", "URL", "고급", "다른 이름으로 저장", "이미지:", "사용자 가이드", "평가하기", "문의하기", "너비:", "높이:", "모두", "넓게", "정사각형", "높게", "포함", "제외", "이미지 버전:", "가장 작은", "가장 큰 (추천)", "모든 고유한", "모두", "폴더:", "자동", "파일:", "자동", "웹 브라우저가 확장 프로그램이 애드온 스토어 사이트에서 작동하지 못하도록 차단합니다.", "확장 프로그램은 웹 페이지에서만 작동할 수 있습니다.", "확장 프로그램이 이미지를 캡처하지 못했습니다.\n페이지를 새로 고치고, 이미지가 페이지에 로드될 때까지 기다린 후 확장 프로그램을 열어 보세요. 여전히 실패하면 사이트가 이미지 감지를 차단하는 기술을 사용하고 있을 수 있습니다. 다른 사이트에서 이미지를 캡처할 수 있는지 확인해 보세요.", "필터링을 통과한 이미지는 없습니다. 요구 사항을 완화하는 것을 고려해 보세요.", "검색 중...", "완료.", "다른 이미지 가져오기"],
    "lv": ["Izmērs", "Tips", "Izkārtojums", "URL", "Papildus", "Saglabāt kā", "Attēli:", "Lietotāja rokasgrāmata", "Novērtējiet mūs", "Sazinieties ar mums", "Platums:", "Augstums:", "Visi", "Plats", "Kvadrāts", "Augsts", "Iekļaut", "Izslēgt", "Attēlu versijas:", "Mazākais", "Lielākais (ieteicams)", "Visi unikālie", "Visi", "Mape:", "Automātiski", "Fails:", "Automātiski", "Tīmekļa pārlūkprogrammas neļauj paplašinājumiem darboties paplašinājumu veikalu vietnē.", "Paplašinājumi var darboties tikai tīmekļa lapās.", "Paplašinājums neizdevās noķert attēlus.\nAtjaunojiet lapu, pagaidiet, līdz attēli tiek ielādēti lapā, pēc tam atveriet paplašinājumu. Ja tas joprojām neizdodas, iespējams, vietne izmanto tehnikas, kas novērš attēlu atpazīšanu. Pārbaudiet, vai varat noķert attēlus citā vietnē.", "Neviena no attēliem nepārgāja jūsu filtrēšanu. Apsveriet prasību atvieglošanu.", "Meklē...", "Pabeigts.", "Iegūstiet vairāk attēlu no"],
    "lt": ["Dydis", "Tipas", "Išdėstymas", "URL", "Išplėstinė", "Išsaugoti kaip", "Paveikslėliai:", "Vartotojo vadovas", "Įvertinkite mus", "Susisiekite su mumis", "Plotis:", "Aukštis:", "Visi", "Platus", "Kvadratas", "Aukštas", "Įtraukti", "Išskirti", "Paveikslėlio versijos:", "Mažiausias", "Didžiausias (rekomenduojama)", "Visi unikalūs", "Visi", "Aplankas:", "Automatiškai", "Failas:", "Automatiškai", "Žiniatinklio naršyklės neleidžia plėtiniams veikti papildinių parduotuvės svetainėje.", "Plėtiniai gali veikti tik žiniatinklio puslapiuose.", "Plėtinys nepavyko užfiksuoti paveikslėlių.\nAtnaujinkite puslapį, palaukite, kol paveikslėliai užsikraus puslapyje, tada atidarykite plėtinį. Jei vis tiek nepavyksta, gali būti, kad svetainė naudoja technologijas, kurios neleidžia aptikti paveikslėlių. Patikrinkite, ar galite užfiksuoti paveikslėlius kitoje svetainėje.", "Joks paveikslėlis nepraėjo jūsų filtravimo. Apsvarstykite galimybę šiek tiek sušvelninti reikalavimus.", "Ieškoma...", "Baigta.", "Gauti daugiau paveikslėlių iš"],
    "ms": ["Saiz", "Jenis", "Susun Atur", "URL", "Lanjutan", "Simpan Sebagai", "Gambar:", "Panduan Pengguna", "Beri Penilaian kepada kami", "Hubungi Kami", "Lebar:", "Tinggi:", "Semua", "Lebar", "Persegi", "Tinggi", "Termasuk", "Tidak Termasuk", "Versi Gambar:", "Terkecil", "Terbesar (disyorkan)", "Semua unik", "Semua", "Folder:", "Auto", "Fail:", "Auto", "Pelayar web menghalang sambungan daripada berfungsi di laman kedai sambungan.", "Sambungan hanya boleh berfungsi di halaman web.", "Sambungan gagal untuk menangkap gambar.\nSegarkan halaman, tunggu sehingga gambar dimuatkan pada halaman, kemudian buka sambungan. Jika masih gagal, mungkin laman web menggunakan teknik yang menghalang pengesanan gambar. Periksa jika anda boleh menangkap gambar di laman web lain.", "Tiada gambar yang lulus penapisan anda. Pertimbangkan untuk melonggarkan keperluan.", "Mencari...", "Selesai.", "Dapatkan lebih banyak gambar dari"],
    "ml": ["വലുപ്പം", "തരം", "പദ്ധതി", "URL", "അഡ്വാൻസ്ഡ്", "സേവ് അസ്", "ചിത്രങ്ങൾ:", "ഉപയോക്തൃ മാർഗ്ഗദർശനം", "നമ്മെ റേറ്റുചെയ്യുക", "ഞങ്ങളുമായി ബന്ധപ്പെടുക", "അഗലത്:", "ഉയരം:", "എല്ലാം", "വയറ്റുള്ള", "ചതുരം", "ഉയരം", "ചേർക്കുക", "പങ്ക് ചെയ്യുക", "ചിത്ര പതിപ്പുകൾ:", "ചെറിയത്", "ഇടയ്ക്കാരം (ശുപാർശ)", "എല്ലാം പ്രത്യേക", "എല്ലാം", "ഫോൾഡർ:", "ഓട്ടോ", "ഫയൽ:", "ഓട്ടോ", "വെബ് ബ്രൗസർസ് അഡ്ഡോൺ സ്റ്റോർ സൈറ്റിൽ വിപുലീകരണങ്ങൾ പ്രവർത്തിക്കാൻ തടയുന്നു.", "വിപുലീകരണങ്ങൾ വെബ് പേജുകളിൽ മാത്രമേ പ്രവർത്തിക്കൂ.", "വിപുലീകരണം ചിത്രങ്ങൾ പിടിക്കാൻ പരാജയപ്പെട്ടു.\nപേജ് റിഫ്രെഷ് ചെയ്യുക, ചിത്രങ്ങൾ പേജിൽ ലോഡ് ചെയ്യുന്നതിനുശേഷം വിപുലീകരണം തുറക്കുക. എങ്കിൽ, ഇത് പരാജയപ്പെടുന്നെങ്കിൽ, ആ സൈറ്റ് ചിത്ര പകർപ്പ് തടയുന്നതിനുള്ള സാങ്കേതികവിദ്യകൾ ഉപയോഗിക്കുന്നത് സാധ്യതയുണ്ട്. മറ്റൊരു സൈറ്റിൽ ചിത്രങ്ങൾ പിടിക്കാമോ എന്ന് പരിശോധിക്കുക.", "ചിത്രങ്ങൾ നിങ്ങളുടെ ഫിൽട്ടർ കടന്നില്ല. ആവശ്യങ്ങൾ ഓളമാക്കുന്നതായി പരിഗണിക്കുക.", "തിരച്ചിൽ ചെയ്യുന്നു...", "പൂര്ണ്ണമായി.", "കൂടുതൽ ചിത്രങ്ങൾ പ്രാപിക്കുക"],
    "mr": ["आकार", "प्रकार", "रचना", "URL", "विस्तृत", "सुपरिचित करा", "प्रतिमा:", "वापरकर्ता मार्गदर्शिका", "आम्हाला रेट करा", "संपर्क करा", "चौडाई:", "उंची:", "सर्व", "विस्तार", "वर्ग", "ऊंच", "समाविष्ट करा", "बाहेर ठेवा", "चित्र आवृत्त्या:", "लहान", "मोठा (शिफारस केली)", "सर्व अनोखे", "सर्व", "फोल्डर:", "स्वतः", "फाइल:", "स्वतः", "वेब ब्राउझर प्लगइन स्टोअर साइटवर विस्तार काम करू देत नाही.", "विस्तार फक्त वेब पृष्ठांवर कार्य करू शकतो.", "विस्तार प्रतिमा पकडण्यात अयशस्वी झाला.\nपृष्ठ ताजेतवाने करा, प्रतिमा पृष्ठावर लोड होईपर्यंत थांबा आणि नंतर विस्तार उघडा. जर त्यामध्ये अजूनही अयशस्वी झाला, तर ते साइट छायाचित्रे ओळखण्यास प्रतिबंध करणारी तंत्रे वापरत असल्याचे असू शकते. दुसर्या साइटवर प्रतिमा पकडण्याची शक्यता तपासा.", "तुमच्या फिल्टरने कोणतेही चित्र पास केले नाही. आवश्यकतांमध्ये ढील देण्याचा विचार करा.", "शोधत आहे...", "पूर्ण झाले.", "अधिक चित्र मिळवा"],
    "no": ["Størrelse", "Type", "Layout", "URL", "Avansert", "Lagre som", "Bilder:", "Brukerveiledning", "Vurder oss", "Kontakt oss", "Bredde:", "Høyde:", "Alle", "Bred", "Kvadrat", "Høy", "Inkluder", "Ekskluder", "Bildeversjoner:", "Minste", "Største (anbefalt)", "Alle unike", "Alle", "Mappe:", "Automatisk", "Fil:", "Automatisk", "Nettlesere hindrer at utvidelser fungerer på butikkens tilleggsnettsted.", "Utvidelser kan bare fungere på nettsider.", "Utvidelsen klarte ikke å fange bildene.\nOppdater siden, vent til bildene er lastet på siden, og åpne deretter utvidelsen. Hvis det fortsatt mislykkes, kan det være at nettstedet bruker teknikker som hindrer bildeoppdagelse. Sjekk om du kan fange bilder på et annet nettsted.", "Ingen av bildene passerte filtreringen din. Vurder å løsne på kravene.", "Søker...", "Ferdig.", "Få flere bilder fra"],
    "fa": ["اندازه", "نوع", "چیدمان", "URL", "پیشرفته", "ذخیره به عنوان", "تصاویر:", "راهنمای کاربر", "به ما امتیاز دهید", "با ما تماس بگیرید", "عرض:", "ارتفاع:", "همه", "عریض", "مربع", "بلند", "شامل", "مستثنی", "نسخه های تصویر:", "کوچکترین", "بزرگترین (توصیه شده)", "همه یکتا", "همه", "پوشه:", "خودکار", "فایل:", "خودکار", "مرورگرهای وب از عملکرد افزونه ها در سایت فروشگاه افزونه جلوگیری می کنند.", "افزونه ها فقط می توانند در صفحات وب کار کنند.", "افزونه قادر به ضبط تصاویر نبود.\nصفحه را مجدد بارگذاری کنید، منتظر بمانید تا تصاویر در صفحه بارگذاری شوند و سپس افزونه را باز کنید. اگر هنوز موفق نشدید، ممکن است سایت از تکنیک هایی برای جلوگیری از شناسایی تصاویر استفاده کند. بررسی کنید که آیا می توانید تصاویر را در سایت دیگری ضبط کنید.", "هیچ یک از تصاویر فیلتر شما را نگذشت. در نظر بگیرید که الزامات را کاهش دهید.", "در حال جستجو...", "تمام شد.", "تصاویر بیشتری از"],
    "pl": ["Rozmiar", "Typ", "Układ", "URL", "Zaawansowane", "Zapisz jako", "Obrazy:", "Podręcznik użytkownika", "Oceń nas", "Skontaktuj się z nami", "Szerokość:", "Wysokość:", "Wszystkie", "Szerokie", "Kwadratowe", "Wysokie", "Uwzględnij", "Wyklucz", "Wersje obrazu:", "Najmniejsze", "Największe (zalecane)", "Wszystkie unikalne", "Wszystkie", "Folder:", "Automatyczne", "Plik:", "Automatyczne", "Przeglądarki internetowe uniemożliwiają działanie rozszerzeń na stronie sklepu z dodatkami.", "Rozszerzenia mogą działać tylko na stronach internetowych.", "Rozszerzenie nie udało się przechwycić obrazów.\nOdśwież stronę, poczekaj, aż obrazy załadują się na stronie, a następnie otwórz rozszerzenie. Jeśli nadal się nie uda, możliwe, że strona używa technik, które uniemożliwiają wykrywanie obrazów. Sprawdź, czy uda ci się przechwycić obrazy na innej stronie.", "Żaden z obrazów nie przeszedł twojego filtrowania. Rozważ złagodzenie wymagań.", "Wyszukiwanie...", "Zakończono.", "Uzyskaj więcej obrazów z"],
    "pt": ["Tamanho", "Tipo", "Layout", "URL", "Avançado", "Salvar como", "Imagens:", "Guia do usuário", "Avalie-nos", "Contate-nos", "Largura:", "Altura:", "Todos", "Largo", "Quadrado", "Alto", "Incluir", "Excluir", "Versões de imagem:", "Menor", "Maior (recomendado)", "Todos os únicos", "Todos", "Pasta:", "Automático", "Arquivo:", "Automático", "Os navegadores da web impedem que extensões funcionem no site da loja de complementos.", "As extensões só podem funcionar em páginas da web.", "A extensão falhou ao capturar as imagens.\nAtualize a página, espere até que as imagens carreguem na página e, em seguida, abra a extensão. Se ainda falhar, é possível que o site utilize técnicas que impedem a detecção de imagens. Verifique se consegue capturar imagens em outro site.", "Nenhuma das imagens passou no seu filtro. Considere afrouxar os requisitos.", "Procurando...", "Concluído.", "Obtenha mais imagens de"],
    "ro": ["Dimensiune", "Tip", "Dispunere", "URL", "Avansat", "Salvează ca", "Imagini:", "Ghidul utilizatorului", "Evaluează-ne", "Contactează-ne", "Lățime:", "Înălțime:", "Toate", "Larg", "Pătrat", "Înalt", "Include", "Exclude", "Versiuni ale imaginii:", "Cel mai mic", "Cel mai mare (recomandat)", "Toate unice", "Toate", "Dosar:", "Automat", "Fișier:", "Automat", "Browserele web împiedică extensiile să funcționeze pe site-ul magazinului de addonuri.", "Extensiile pot funcționa doar pe pagini web.", "Extensia nu a reușit să capteze imaginile.\nReîmprospătează pagina, așteaptă până când imaginile sunt încărcate pe pagină și apoi deschide extensia. Dacă nu funcționează, este posibil ca site-ul să utilizeze tehnici care împiedică detectarea imaginilor. Verifică dacă poți capta imagini pe un alt site.", "Nicio imagine nu a trecut filtrul tău. Ia în considerare relaxarea cerințelor.", "Căutare...", "Finalizat.", "Obține mai multe imagini de la"],
    "ru": ["Размер", "Тип", "Макет", "URL", "Расширенные", "Сохранить как", "Изображения:", "Руководство пользователя", "Оцените нас", "Связаться с нами", "Ширина:", "Высота:", "Все", "Широкий", "Квадратный", "Высокий", "Включить", "Исключить", "Версии изображений:", "Самый маленький", "Самый большой (рекомендуется)", "Все уникальные", "Все", "Папка:", "Авто", "Файл:", "Авто", "Веб-браузеры блокируют работу расширений на сайте магазина дополнений.", "Расширения могут работать только на веб-страницах.", "Расширение не удалось захватить изображения.\nОбновите страницу, подождите, пока изображения загрузятся на странице, а затем откройте расширение. Если оно по-прежнему не работает, возможно, сайт использует технологии, которые препятствуют обнаружению изображений. Проверьте, сможете ли вы захватить изображения на другом сайте.", "Ни одно изображение не прошло вашу фильтрацию. Рассмотрите возможность ослабления требований.", "Поиск...", "Завершено.", "Получите больше изображений с"],
    "sr": ["Veličina", "Tip", "Raspored", "URL", "Napredno", "Spremi kao", "Slike:", "Korisnički priručnik", "Oceni nas", "Kontaktiraj nas", "Širina:", "Visina:", "Sve", "Široko", "Kvadrat", "Visoko", "Uključi", "Isključi", "Verzije slika:", "Najmanje", "Najveće (preporučeno)", "Sve jedinstvene", "Sve", "Folder:", "Automatski", "Fajl:", "Automatski", "Web pregledači sprečavaju rad ekstenzija na sajtu prodavnice ekstenzija.", "Ekstenzije mogu raditi samo na veb stranicama.", "Ekstenzija nije uspela da uhvati slike.\nOsveži stranicu, sačekaj da se slike učitaju na stranici, a zatim otvori ekstenziju. Ako i dalje ne uspe, moguće je da sajt koristi tehnike koje sprečavaju detekciju slika. Proveri da li možeš da uhvatiš slike na nekoj drugoj stranici.", "Ni jedna od slika nije prošla tvoje filtriranje. Razmisli o opuštanju zahteva.", "Pretraga...", "Završeno.", "Preuzmi više slika sa"],
    "sk": ["Veľkosť", "Typ", "Rozloženie", "URL", "Pokročilé", "Uložiť ako", "Obrázky:", "Príručka pre používateľov", "Hodnotte nás", "Kontaktujte nás", "Šírka:", "Výška:", "Všetky", "Široký", "Štvorcový", "Vysoký", "Zahrnúť", "Vylúčiť", "Verzie obrázkov:", "Najmenší", "Najväčší (odporúčané)", "Všetky jedinečné", "Všetky", "Adresár:", "Automatické", "Súbor:", "Automatické", "Webové prehliadače bránia rozšíreniam fungovať na stránke obchodu s doplnkami.", "Rozšírenia môžu fungovať iba na webových stránkach.", "Rozšírenie zlyhalo pri zachytávaní obrázkov.\nObnovte stránku, počkajte, kým sa obrázky načítajú na stránke, a potom otvorte rozšírenie. Ak stále zlyhá, môže to byť kvôli tomu, že stránka používa techniky, ktoré bránia detekcii obrázkov. Skontrolujte, či môžete zachytiť obrázky na inej stránke.", "Žiadny obrázok neprešiel vašim filtrovaním. Zvážte uvoľnenie požiadaviek.", "Hľadám...", "Dokončené.", "Získajte viac obrázkov z"],
    "sl": ["Velikost", "Vrsta", "Postavitev", "URL", "Napredno", "Shrani kot", "Slike:", "Uporabniški vodnik", "Ocenite nas", "Kontaktirajte nas", "Širina:", "Višina:", "Vse", "Široko", "Kvadrat", "Visoko", "Vključi", "Izključi", "Različice slike:", "Najmanjše", "Največje (priporočeno)", "Vse edinstvene", "Vse", "Mapa:", "Samodejno", "Datoteka:", "Samodejno", "Spletni brskalniki preprečujejo delovanje razširitev na spletni strani trgovine z dodatki.", "Razširitve lahko delujejo samo na spletnih straneh.", "Razširitev ni uspela zajeti slik.\nOsvežite stran, počakajte, da se slike naložijo na strani, nato pa odprite razširitev. Če še vedno ne uspe, je možno, da spletna stran uporablja tehnike, ki preprečujejo zaznavanje slik. Preverite, ali lahko zajamete slike na drugi spletni strani.", "Nobena slika ni prestala vaše filtracije. Premislite, če bi sprostili zahteve.", "Iščem...", "Končano.", "Pridobite več slik z"],
    "es": ["Tamaño", "Tipo", "Diseño", "URL", "Avanzado", "Guardar como", "Imágenes:", "Guía del usuario", "Califícanos", "Contáctanos", "Ancho:", "Alto:", "Todos", "Ancho", "Cuadrado", "Alto", "Incluir", "Excluir", "Versiones de imágenes:", "Más pequeño", "Más grande (recomendado)", "Todos únicos", "Todos", "Carpeta:", "Automático", "Archivo:", "Automático", "Los navegadores web impiden que las extensiones funcionen en el sitio de la tienda de complementos.", "Las extensiones solo pueden funcionar en páginas web.", "La extensión no pudo capturar las imágenes.\nRecarga la página, espera hasta que las imágenes se carguen en la página y luego abre la extensión. Si sigue fallando, es posible que el sitio use técnicas que impiden la detección de imágenes. Comprueba si puedes capturar imágenes en otro sitio.", "Ninguna de las imágenes pasó tu filtrado. Considera aflojar los requisitos.", "Buscando...", "Terminado.", "Obtén más imágenes de"],
    "sw": ["Ukubwa", "Aina", "Muundo", "URL", "Advanced", "Hifadhi kama", "Picha:", "Mwongozo wa mtumiaji", "Tutathmini", "Wasiliana nasi", "Upana:", "K height:", "Zote", "Pana", "Mraba", "Mrefu", "Jumuisha", "Tenga", "Matoleo ya picha:", "Kidogo zaidi", "Kubwa zaidi (inapendekezwa)", "Zote za kipekee", "Zote", "Folda:", "Auto", "Faili:", "Auto", "Vinjari vya wavuti vinazuia upanuzi kufanya kazi kwenye tovuti ya duka la viambatisho.", "Upanuzi unaweza kufanya kazi tu kwenye kurasa za wavuti.", "Upanuzi ulishindwa kukamata picha.\nRejesha ukurasa, subiri hadi picha zipakuliwe kwenye ukurasa, kisha fungua upanuzi. Ikiwa bado inashindwa, inaweza kuwa tovuti inatumia mbinu zinazozuia kugundua picha. Angalia ikiwa unaweza kukamata picha kwenye tovuti nyingine.", "Hakuna picha iliyopitishwa na kuchujwa. Fikiria kupunguza masharti.", "Kutafuta...", "Imekamilika.", "Pata picha zaidi kutoka kwa"],
    "sv": ["Storlek", "Typ", "Layout", "URL", "Avancerad", "Spara som", "Bilder:", "Användarguide", "Betygsätt oss", "Kontakta oss", "Bredd:", "Höjd:", "Alla", "Bred", "Kvadrat", "Hög", "Inkludera", "Exkludera", "Bildversioner:", "Minsta", "Största (rekommenderas)", "Alla unika", "Alla", "Mapp:", "Automatiskt", "Fil:", "Automatiskt", "Webbläsare blockerar att tillägg fungerar på tilläggsbutikens sida.", "Tillägg kan endast fungera på webbsidor.", "Tillägget misslyckades med att fånga bilder.\nUppdatera sidan, vänta tills bilderna har laddats på sidan och öppna sedan tillägget. Om det fortfarande misslyckas kan det vara så att webbplatsen använder tekniker som hindrar bilddetektering. Kontrollera om du kan fånga bilder på en annan webbplats.", "Inga av bilderna passerade din filtrering. Överväg att släppa kraven.", "Söker...", "Färdig.", "Hämta fler bilder från"],
    "ta": ["அளவு", "பரிமாணம்", "அட்டவணை", "URL", "தரப்பட்ட", "பதிவுசெய்", "படங்கள்:", "பயனர் வழிகாட்டி", "எங்களை மதிப்பிடுக", "எங்களுடன் தொடர்பு கொள்ளவும்", "அகலம்:", "உயரம்:", "எல்லாம்", "பரந்த", "சதுரம்", "உயரமான", "பின்வட்டமிடு", "விலக்கவும்", "பட பதிப்புகள்:", "சிறியது", "பெரியதாக (பரிந்துரைக்கப்பட்ட)", "எல்லா தனிப்பட்டவை", "எல்லாம்", "கோப்புறை:", "தானாக", "கோப்பு:", "தானாக", "வெப்தளம் உலாவிகள் அத்தியாவசியங்களை சேகரிக்கும் வலையமைப்பிலுள்ள இணைப்பு பிணைப்பு விரிவாக்கங்களை செயல்படுத்த அனுமதிப்பது இல்லை.", "இணைப்பு விரிவாக்கங்கள் வெப் பக்கங்களில் மட்டுமே செயல்பட முடியும்.", "இணைப்பு விரிவாக்கம் படங்களை பிடிக்க தோல்வியடைந்தது.\nபக்கத்தை புதுப்பிக்கவும், படங்கள் பக்கத்தில் ஏற்றப்பட்ட பிறகு விரிவாக்கத்தைத் திறக்கவும். இது இன்னும் தோல்வியடைந்தால், அந்த வலைத்தளம் படங்களை கண்டு பிடிப்பதைத் தடுக்கும்படியான தொழில்நுட்பங்களை பயன்படுத்துகிறது என்பதற்கான சாத்தியம் உள்ளது. நீங்கள் வேறு வலைத்தளத்தில் படங்களை பிடிக்க முடிகிறதா என பாருங்கள்.", "உங்கள் வடிகட்டல்களில் எந்த படங்களும் கடந்து போகவில்லை. தேவைகளை சற்றே விலக்கி பார்க்கவும்.", "தேடுகிறது...", "முடிந்தது.", "மேலும் படங்களை பெறவும்"],
    "te": ["పరిమాణం", "రకం", "వ్యాఖ్యానం", "URL", "ఎడ్వాన్స్డ్", "సేవ్ చేయండి", "చిత్రాలు:", "వినియోగదారుని మార్గదర్శిని", "మమ్మల్ని రేటింగ్ చేయండి", "మమ్మల్ని సంప్రదించండి", "అగలం:", "ఎత్తు:", "అన్నీ", "విస్తారంగా", "చతురస్రం", "ఎత్తుగా", "చేర్చండి", "హార్డోట్", "చిత్ర వర్షన్లు:", "చిన్నది", "పెద్దది (సిఫార్సు)", "అన్నీ ప్రత్యేక", "అన్నీ", "ఫోల్డర్:", "ఆటో", "ఫైల్:", "ఆటో", "వెబ్ బ్రౌజర్ల ద్వారా ఎడీన్ అడ్జన్ స్టోర్ పై ఇంటర్నెట్ అడ్జన్ నుండి బయటపడిన పాదాలన్నీ ఆపినవి.", "కేవలం వెబ్ పేజీల పై ఎడీన్ చేయగలుగుతుంది.", "ఎడీన్ చిత్రం  చూశడం బోల్చా.\nపేజీకి పెరిగిన శరీరములను ఎంపిక చేయండి.#"],
    "th": ["ขนาด", "ประเภท", "การจัดเรียง", "URL", "ขั้นสูง", "บันทึกเป็น", "ภาพ:", "คู่มือผู้ใช้", "ให้คะแนนเรา", "ติดต่อเรา", "ความกว้าง:", "ความสูง:", "ทั้งหมด", "กว้าง", "สี่เหลี่ยม", "สูง", "รวม", "ยกเว้น", "รุ่นของภาพ:", "เล็กที่สุด", "ใหญ่ที่สุด (แนะนำ)", "ทั้งหมดที่ไม่ซ้ำกัน", "ทั้งหมด", "โฟลเดอร์:", "อัตโนมัติ", "ไฟล์:", "อัตโนมัติ", "เว็บเบราว์เซอร์จะป้องกันไม่ให้ส่วนขยายทำงานในเว็บไซต์ร้านส่วนขยาย.", "ส่วนขยายสามารถทำงานได้เฉพาะในหน้าเว็บเท่านั้น.", "ส่วนขยายไม่สามารถจับภาพได้.\nรีเฟรชหน้าเว็บ รอจนกว่าภาพจะโหลดในหน้าเว็บ จากนั้นเปิดส่วนขยาย หากยังไม่สำเร็จ อาจเป็นไปได้ว่าเว็บไซต์ใช้เทคนิคที่ป้องกันไม่ให้ตรวจจับภาพ ดูว่าคุณสามารถจับภาพจากเว็บไซต์อื่นได้หรือไม่.", "ไม่มีภาพใดที่ผ่านการกรองของคุณ พิจารณาผ่อนคลายข้อกำหนด.", "กำลังค้นหา...", "เสร็จสิ้น.", "รับภาพเพิ่มเติมจาก"],
    "tr": ["Boyut", "Tür", "Düzen", "URL", "Gelişmiş", "Farklı Kaydet", "Resimler:", "Kullanıcı kılavuzu", "Bizi değerlendirin", "Bizimle iletişime geçin", "Genişlik:", "Yükseklik:", "Tümü", "Geniş", "Kare", "Yüksek", "Dahil et", "Hariç tut", "Resim sürümleri:", "En küçük", "En büyük (önerilen)", "Tümü benzersiz", "Tümü", "Klasör:", "Otomatik", "Dosya:", "Otomatik", "Web tarayıcıları, eklentilerin eklenti mağazası sitesinde çalışmasına engel olur.", "Eklentiler yalnızca web sayfalarında çalışabilir.", "Eklenti, resimleri yakalamakta başarısız oldu.\nSayfayı yenileyin, resimlerin sayfada yüklenmesini bekleyin, sonra eklentiyi açın. Hala başarısız olursa, site muhtemelen resim tespiti yapmayı engelleyen teknikler kullanıyor olabilir. Farklı bir sitede resim yakalayabiliyor musunuz diye kontrol edin.", "Filtrelemenizden hiç resim geçmedi. Gereksinimleri gevşetmeyi düşünün.", "Aranıyor...", "Tamamlandı.", "Daha fazla resim alın"],
    "uk": ["Розмір", "Тип", "Макет", "URL", "Додатково", "Зберегти як", "Зображення:", "Посібник користувача", "Оцініть нас", "Зв'язатися з нами", "Ширина:", "Висота:", "Всі", "Широкий", "Квадрат", "Високий", "Включити", "Виключити", "Версії зображень:", "Найменший", "Найбільший (рекомендовано)", "Всі унікальні", "Усі", "Папка:", "Авто", "Файл:", "Авто", "Веб-браузери забороняють розширенням працювати на сайті магазину розширень.", "Розширення можуть працювати лише на веб-сторінках.", "Розширення не вдалося захопити зображення.\nОновіть сторінку, дочекайтеся, поки зображення завантажаться на сторінці, а потім відкрийте розширення. Якщо це не вдалося, можливо, сайт використовує техніки, які запобігають виявленню зображень. Перевірте, чи можете ви захопити зображення на іншому сайті.", "Жодне зображення не пройшло вашу фільтрацію. Спробуйте ослабити вимоги.", "Шукаю...", "Завершено.", "Отримати більше зображень з"],
    "vi": ["Kích thước", "Loại", "Bố cục", "URL", "Nâng cao", "Lưu dưới dạng", "Hình ảnh:", "Hướng dẫn người dùng", "Đánh giá chúng tôi", "Liên hệ với chúng tôi", "Chiều rộng:", "Chiều cao:", "Tất cả", "Rộng", "Vuông", "Cao", "Bao gồm", "Loại trừ", "Phiên bản hình ảnh:", "Nhỏ nhất", "Lớn nhất (đề xuất)", "Tất cả duy nhất", "Tất cả", "Thư mục:", "Tự động", "Tệp:", "Tự động", "Trình duyệt web ngừng các tiện ích mở rộng hoạt động trên trang cửa hàng tiện ích.", "Tiện ích mở rộng chỉ có thể hoạt động trên các trang web.", "Tiện ích mở rộng không thể bắt được hình ảnh.\nLàm mới trang, chờ cho đến khi hình ảnh được tải trên trang, sau đó mở tiện ích mở rộng. Nếu vẫn thất bại, có thể trang web sử dụng các kỹ thuật ngăn chặn phát hiện hình ảnh. Kiểm tra xem bạn có thể bắt hình ảnh trên trang web khác không.", "Không có hình ảnh nào vượt qua bộ lọc của bạn. Cân nhắc nới lỏng yêu cầu.", "Đang tìm kiếm...", "Hoàn tất.", "Nhận thêm hình ảnh từ"]
}
const i18nt = {
    "am": "እንደ እኛ ማስ 확መት? ተመን ያድርጉልን!",
    "ar": "هل أعجبك امتدادنا؟ قيمنا!",
    "bn": "আমাদের এক্সটেনশনটি পছন্দ হয়েছে? আমাদের রেট করুন!",
    "bg": "Харесва ли ви нашето разширение? Оценете ни!",
    "ca": "T'agrada la nostra extensió? Avaluar-nos!",
    "zh_CN": "喜欢我们的扩展吗？评价我们！",
    "zh_TW": "喜歡我們的擴展嗎？評價我們！",
    "hr": "Sviđa li vam se naš proširenje? Ocijenite nas!",
    "cs": "Líbí se vám naše rozšíření? Ohodnoťte nás!",
    "da": "Kan du lide vores udvidelse? Bedøm os!",
    "nl": "Vindt u onze uitbreiding leuk? Beoordeel ons!",
    "en": "Like our extension? Rate us!",
    "et": "Kas teile meeldib meie laiend? Hinnake meid!",
    "fil": "Gusto mo ba ang aming extension? I-rate kami!",
    "fi": "Pidätkö laajennuksestamme? Arvostele meidät!",
    "fr": "Aimez-vous notre extension? Évaluez-nous!",
    "de": "Gefällt Ihnen unsere Erweiterung? Bewerten Sie uns!",
    "el": "Σας αρέσει η επέκτασή μας; Βαθμολογήστε μας!",
    "gu": "અમારા એક્સટેન્શનને પસંદ કરીએ છો? અમારું મૂલ્યાંકન કરો!",
    "he": "אהבתם את ההרחבה שלנו? דרגו אותנו!",
    "hi": "क्या आपको हमारा एक्सटेंशन पसंद आया? हमें रेट करें!",
    "hu": "Tetszik a kiterjesztésünk? Értékeljen minket!",
    "id": "Suka ekstensi kami? Beri penilaian kepada kami!",
    "it": "Ti piace la nostra estensione? Votaci!",
    "ja": "私たちの拡張機能は気に入りましたか？評価してください！",
    "kn": "ನಮ್ಮ ವಿಸ್ತರಣೆ ನಿಮಗೆ ಇಷ್ಟವಾಯಿತೆ? ನಮಗೆ ರೇಟಿಂಗ್ ನೀಡಿ!",
    "ko": "저희 확장 프로그램이 마음에 드세요? 평가해주세요!",
    "lv": "Vai jums patīk mūsu paplašinājums? Novērtējiet mūs!",
    "lt": "Ar patiko mūsų plėtinys? Įvertinkite mus!",
    "ms": "Suka sambungan kami? Beri penilaian kepada kami!",
    "ml": "നമ്മുടെ എക്‌സ്‌ടൻഷൻ ഇഷ്ടപ്പെട്ടുവോ? ഞങ്ങളെ റേറ്റ് ചെയ്യൂ!",
    "mr": "आमचं विस्तार आवडलं का? आमचं मूल्यांकन करा!",
    "no": "Liker du utvidelsen vår? Vurder oss!",
    "fa": "از گسترش ما خوشتان آمد؟ به ما امتیاز دهید!",
    "pl": "Podoba ci się nasze rozszerzenie? Oceń nas!",
    "pt": "Gostou da nossa extensão? Avalie-nos!",
    "ro": "Îți place extensia noastră? Evaluează-ne!",
    "ru": "Нравится наше расширение? Оцените нас!",
    "sr": "Sviđa vam se naš proširenje? Ocijenite nas!",
    "sk": "Páči sa vám naše rozšírenie? Ohodnoťte nás!",
    "sl": "Vam je všeč naša razširitev? Ocenite nas!",
    "es": "¿Te gusta nuestra extensión? ¡Califícanos!",
    "sw": "Unapenda kuongeza yetu? Tathmini sisi!",
    "sv": "Gillar du vårt tillägg? Betygsätt oss!",
    "ta": "எங்கள் விரிவாக்கத்தை பிடித்ததா? எங்களை மதிப்பிடுங்கள்!",
    "te": "మన విస్తరణ నచ్చిందా? మాకు రేటింగ్ ఇవ్వండి!",
    "th": "ชอบส่วนขยายของเราหรือไม่? ให้คะแนนเรา!",
    "tr": "Eklentimizi beğendiniz mi? Bizi oylayın!",
    "uk": "Тобі подобається наше розширення? Оціни нас!",
    "vi": "Bạn thích tiện ích của chúng tôi? Đánh giá chúng tôi!"
};

const tooltip ={
    "en" : [ "More","Download all","Download selected","Small","Mediun","Large","All","Save Size filter settings","Save Type filter settings","Save Layout filter settings","Save URL filter settings","Save Advanced filter settings","Save Save As settings","Open as popup","Open in a side panel","Result width limit","Theme","Language","Save Display settings"]
};

/*ToDo: 
-----------------------
#) rate us mechanisin
#) sort options
#) better rtl support
#) file converting
#) minifiy
#) set filter triger borders for update
#) add support for other
#) fix sttiky
#) senetize input for '-' '.' 
#) massge searching
#) image unvalid page
!) image selected on open in new tab
!) show wrong file name
!) show checker pattern on edges
*/

/*Todo-mid:
-----------------------
#) titles
#) i18n
#) fix mesg of issue when navagating sites
#) fix popup spacing
#) fix save as help link
#) use the svg prefix
#) rename extension on foreing lang
*/

const iconsSrc = [
    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 83.78" style="enable-background:new 0 0 122.88 83.78" xml:space="preserve"><g fill="orange"><path d="M95.73,10.81c10.53,7.09,19.6,17.37,26.48,29.86l0.67,1.22l-0.67,1.21c-6.88,12.49-15.96,22.77-26.48,29.86 C85.46,79.88,73.8,83.78,61.44,83.78c-12.36,0-24.02-3.9-34.28-10.81C16.62,65.87,7.55,55.59,0.67,43.1L0,41.89l0.67-1.22 c6.88-12.49,15.95-22.77,26.48-29.86C37.42,3.9,49.08,0,61.44,0C73.8,0,85.45,3.9,95.73,10.81L95.73,10.81z M60.79,22.17l4.08,0.39 c-1.45,2.18-2.31,4.82-2.31,7.67c0,7.48,5.86,13.54,13.1,13.54c2.32,0,4.5-0.62,6.39-1.72c0.03,0.47,0.05,0.94,0.05,1.42 c0,11.77-9.54,21.31-21.31,21.31c-11.77,0-21.31-9.54-21.31-21.31C39.48,31.71,49.02,22.17,60.79,22.17L60.79,22.17L60.79,22.17z M109,41.89c-5.5-9.66-12.61-17.6-20.79-23.11c-8.05-5.42-17.15-8.48-26.77-8.48c-9.61,0-18.71,3.06-26.76,8.48 c-8.18,5.51-15.29,13.45-20.8,23.11c5.5,9.66,12.62,17.6,20.8,23.1c8.05,5.42,17.15,8.48,26.76,8.48c9.62,0,18.71-3.06,26.77-8.48 C96.39,59.49,103.5,51.55,109,41.89L109,41.89z"/></g></svg>','<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 101.37" style="enable-background:new 0 0 122.88 101.37" xml:space="preserve"><g fill="orange"><path d="M12.64,77.27l0.31-54.92h-6.2v69.88c8.52-2.2,17.07-3.6,25.68-3.66c7.95-0.05,15.9,1.06,23.87,3.76 c-4.95-4.01-10.47-6.96-16.36-8.88c-7.42-2.42-15.44-3.22-23.66-2.52c-1.86,0.15-3.48-1.23-3.64-3.08 C12.62,77.65,12.62,77.46,12.64,77.27L12.64,77.27z M103.62,19.48c-0.02-0.16-0.04-0.33-0.04-0.51c0-0.17,0.01-0.34,0.04-0.51V7.34 c-7.8-0.74-15.84,0.12-22.86,2.78c-6.56,2.49-12.22,6.58-15.9,12.44V85.9c5.72-3.82,11.57-6.96,17.58-9.1 c6.85-2.44,13.89-3.6,21.18-3.02V19.48L103.62,19.48z M110.37,15.6h9.14c1.86,0,3.37,1.51,3.37,3.37v77.66 c0,1.86-1.51,3.37-3.37,3.37c-0.38,0-0.75-0.06-1.09-0.18c-9.4-2.69-18.74-4.48-27.99-4.54c-9.02-0.06-18.03,1.53-27.08,5.52 c-0.56,0.37-1.23,0.57-1.92,0.56c-0.68,0.01-1.35-0.19-1.92-0.56c-9.04-4-18.06-5.58-27.08-5.52c-9.25,0.06-18.58,1.85-27.99,4.54 c-0.34,0.12-0.71,0.18-1.09,0.18C1.51,100.01,0,98.5,0,96.64V18.97c0-1.86,1.51-3.37,3.37-3.37h9.61l0.06-11.26 c0.01-1.62,1.15-2.96,2.68-3.28l0,0c8.87-1.85,19.65-1.39,29.1,2.23c6.53,2.5,12.46,6.49,16.79,12.25 c4.37-5.37,10.21-9.23,16.78-11.72c8.98-3.41,19.34-4.23,29.09-2.8c1.68,0.24,2.88,1.69,2.88,3.33h0V15.6L110.37,15.6z M68.13,91.82c7.45-2.34,14.89-3.3,22.33-3.26c8.61,0.05,17.16,1.46,25.68,3.66V22.35h-5.77v55.22c0,1.86-1.51,3.37-3.37,3.37 c-0.27,0-0.53-0.03-0.78-0.09c-7.38-1.16-14.53-0.2-21.51,2.29C79.09,85.15,73.57,88.15,68.13,91.82L68.13,91.82z M58.12,85.25 V22.46c-3.53-6.23-9.24-10.4-15.69-12.87c-7.31-2.8-15.52-3.43-22.68-2.41l-0.38,66.81c7.81-0.28,15.45,0.71,22.64,3.06 C47.73,78.91,53.15,81.64,58.12,85.25L58.12,85.25z"/></g></svg>',
    '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 113.41"><defs><style></style></defs><title>review</title><g fill="orange"><path d="M4.29,47.64h19.3A4.31,4.31,0,0,1,27.88,52V109.1a4.31,4.31,0,0,1-4.29,4.31H4.29A4.31,4.31,0,0,1,0,109.1V52a4.31,4.31,0,0,1,4.29-4.31ZM59,4.77c2.27-11.48,21.07-.91,22.31,17.6A79.82,79.82,0,0,1,79.68,42h26.87c11.17.44,20.92,8.44,14,21.58,1.57,5.72,1.81,12.44-2.45,15.09.53,9-2,14.64-6.65,19.06-.31,4.52-1.27,8.53-3.45,11.62-3.61,5.09-6.54,3.88-12.22,3.88H50.45c-7.19,0-11.11-2-15.81-7.88V54.81C48.16,51.16,55.35,32.66,59,20.51V4.77Z"/></g></svg>',
    '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 88.86"><title>contact</title><g fill="orange"><path d="M7.05,0H115.83a7.07,7.07,0,0,1,7,7.05V81.81a7,7,0,0,1-1.22,4,2.78,2.78,0,0,1-.66,1,2.62,2.62,0,0,1-.66.46,7,7,0,0,1-4.51,1.65H7.05a7.07,7.07,0,0,1-7-7V7.05A7.07,7.07,0,0,1,7.05,0Zm-.3,78.84L43.53,40.62,6.75,9.54v69.3ZM49.07,45.39,9.77,83.45h103L75.22,45.39l-11,9.21h0a2.7,2.7,0,0,1-3.45,0L49.07,45.39Zm31.6-4.84,35.46,38.6V9.2L80.67,40.55ZM10.21,5.41,62.39,47.7,112.27,5.41Z"/></g></svg>','<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 511 511.26"><g transform="scale(1.1,0.75) translate(96,72)"><path fill="orange"  fill-rule="nonzero" d="M102.05 362.83v-4.57c.35-30.36 3.33-54.41 9.17-72.28 5.73-17.86 13.97-32.4 24.73-43.4 10.77-11.11 23.72-21.19 38.84-30.36 9.73-6.18 18.55-13.05 26.34-20.72 7.78-7.57 13.96-16.39 18.55-26.35 4.58-9.85 6.87-20.84 6.87-32.98 0-14.43-3.44-26.92-10.31-37.57-6.76-10.54-15.92-18.67-27.15-24.5-11.34-5.73-23.93-8.59-37.79-8.59-12.48 0-24.39 2.51-35.84 7.78-11.34 5.16-20.85 13.28-28.3 24.28-7.44 10.99-11.79 25.09-12.94 42.27H0c1.15-29.22 8.59-53.95 22.22-74.22 13.75-20.27 31.85-35.63 54.29-46.04C99.08 5.16 124.05 0 151.3 0c30 0 56.12 5.49 78.57 16.72 22.45 11.11 39.97 26.69 52.46 46.61C294.69 83.26 301 106.4 301 132.98c0 18.2-2.86 34.58-8.59 49.13-5.73 14.54-13.75 27.6-24.28 38.93-10.55 11.46-23.03 21.54-37.68 30.24-13.86 8.71-25.09 17.64-33.56 26.92-8.59 9.27-14.78 20.27-18.67 32.87-3.9 12.71-6.08 28.4-6.41 47.19v4.57h-69.76zm36.88 148.43c-13.39-.1-24.85-4.8-34.47-14.31-9.62-9.5-14.32-21.07-14.32-34.59 0-13.28 4.7-24.73 14.32-34.24 9.62-9.51 21.08-14.32 34.47-14.32 13.17 0 24.62 4.81 34.25 14.32 9.73 9.51 14.54 20.96 14.54 34.24 0 8.93-2.28 17.18-6.75 24.52-4.47 7.44-10.32 13.4-17.64 17.75-7.33 4.35-15.47 6.53-24.4 6.63z"/></g></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 256"><g fill="none" stroke="orange" stroke-width="16"><rect x="16" y="8" width="360" height="240" /><line x1="16" y1="64" x2="383" y2="64" /></g><g fill="orange"><circle cx="306" cy="36" r="8" />    <circle cx="328" cy="36" r="8" /><circle cx="350" cy="36" r="8" />  </g><g stroke="orange" stroke-width="12"><line x1="35" y1="36" x2="75" y2="36" /><line x1="90" y1="36" x2="130" y2="36" /><line x1="145" y1="36" x2="185" y2="36" /></g><g fill="none" stroke="orange" stroke-width="12"><rect x="192" y="64" width="128" height="125" /><line x1="210" y1="89" x2="302" y2="89" /><line x1="210" y1="114" x2="302" y2="114" /><line x1="210" y1="139" x2="302" y2="139" /><line x1="210" y1="164" x2="302" y2="164" /></g></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 256"><g fill="none" stroke="orange" stroke-width="16"><rect x="16" y="8" width="360" height="240" /><line x1="16" y1="64" x2="383" y2="64" /></g><g fill="orange"><circle cx="306" cy="36" r="8" /><circle cx="328" cy="36" r="8" /><circle cx="350" cy="36" r="8" /></g><g stroke="orange" stroke-width="12"><line x1="35" y1="36" x2="75" y2="36" /><line x1="90" y1="36" x2="130" y2="36" /> <line x1="145" y1="36" x2="185" y2="36" /></g><g fill="none" stroke="orange" stroke-width="12"><line x1="224" y1="64" x2="224" y2="242" /><line x1="242" y1="90" x2="356" y2="90" /><line x1="242" y1="112" x2="356" y2="112" /><line x1="242" y1="134" x2="356" y2="134" /><line x1="242" y1="156" x2="356" y2="156" /><line x1="242" y1="178" x2="356" y2="178" /><line x1="242" y1="200" x2="356" y2="200" /><line x1="242" y1="222" x2="356" y2="222" /></g></svg>',
    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="217px" height="122.151px" viewBox="0 0 217 122.151" enable-background="new 0 0 122.88 122.151" xml:space="preserve"><g fill="orange" transform="translate(47,0)"><path d="M8.676,0h105.529c2.405,0,4.557,0.984,6.124,2.552c1.567,1.567,2.551,3.754,2.551,6.124v104.8 c0,2.405-0.983,4.557-2.551,6.124c-1.568,1.567-3.755,2.552-6.124,2.552H8.676c-2.406,0-4.557-0.984-6.124-2.553 C0.984,118.032,0,115.845,0,113.476V8.675C0,6.27,0.984,4.119,2.552,2.552C4.12,0.984,6.307,0,8.676,0L8.676,0z M9.097,88.323 l35.411-33.9c1.421-1.313,3.645-1.167,4.921,0.255c0.037,0.036,0.037,0.073,0.073,0.073l31.459,37.218l4.812-29.6 c0.328-1.896,2.114-3.208,4.01-2.879c0.729,0.109,1.385,0.474,1.895,0.948l22.07,23.184V10.773c0-0.474-0.183-0.875-0.511-1.166 c-0.291-0.292-0.729-0.511-1.166-0.511H10.737c-0.474,0-0.875,0.182-1.166,0.511c-0.292,0.291-0.511,0.729-0.511,1.166v77.55H9.097 L9.097,88.323z M90.526,19.866c3.464,0,6.635,1.422,8.895,3.682c2.297,2.296,3.682,5.431,3.682,8.895 c0,3.463-1.421,6.634-3.682,8.894c-2.296,2.297-5.431,3.682-8.895,3.682c-3.462,0-6.634-1.421-8.894-3.682 c-2.297-2.296-3.682-5.431-3.682-8.894c0-3.463,1.421-6.634,3.682-8.895C83.929,21.251,87.064,19.866,90.526,19.866L90.526,19.866z"/></g><g><line x1="4" y1="0" x2="4" y2="122.151" stroke="orange" stroke-width="8"/></g><g><line x1="213" y1="0" x2="213" y2="122.151" stroke="orange" stroke-width="8"/></g><g fill="orange" transform="translate(12,40) scale(0.3,0.5)"><polygon class="st0" points="0,37.66 37.99,75.32 37.99,51.08 122.88,51.08 122.88,24.24 37.99,24.24 37.99,0 0,37.66"/></g> <g fill="orange" transform="translate(168,40) scale(0.3,0.5)"><polygon class="st0" points="122.88,37.66 84.89,75.32 84.89,51.08 0,51.08 0,24.24 84.89,24.24 84.89,0 122.88,37.66"/></g></svg>','<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 370 256"><g transform="translate(-120,-200),scale(1.5,1.5)"><path fill="orange" d="M84.246 173.714h43.841v-12.353h19.585v12.353h44.001v20.281h-9.033c-1.629 12.811-5.21 23.368-11.297 34.746-5.149 9.611-11.796 18.87-19.516 27.744 12.32 14.735 27.616 27.554 45.826 39.24l-10.073 15.701c-19.119-12.267-35.356-25.774-48.699-41.332-11.936 11.547-25.496 22.303-39.7 32.127l-10.588-15.325c14.055-9.725 27.407-20.347 38.896-31.672-10.588-15.493-18.697-32.88-24.308-52.875l17.968-5.038c4.601 16.401 11.052 30.837 19.344 43.759 5.657-6.848 10.548-13.876 14.412-21.092 4.74-8.866 7.286-16.196 8.89-25.983H84.246v-20.281zM272.456 246.314h-55.931l-7.357 25.09h-27.814c11.988-31.729 25.831-69.829 37.825-101.573 4.318-11.466 9.234-30.467 24.943-30.467 16.284 0 21.691 17.409 26.222 29.436l38.4 103.122h-28.708l-7.58-25.608zm-6-24.398l-21.893-57.703-21.971 57.703h43.864z"/></g></svg>'];
const iconsBG = [
    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g fill="orange" transform="translate(0 12)"><path class="st0" d="M8.94,0h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,17.88,0,13.86,0,8.94l0,0 C0,4.02,4.02,0,8.94,0L8.94,0z M8.94,78.07h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105 C4.02,95.95,0,91.93,0,87.01l0,0C0,82.09,4.02,78.07,8.94,78.07L8.94,78.07z M8.94,39.03h105c4.92,0,8.94,4.02,8.94,8.94l0,0 c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,56.91,0,52.89,0,47.97l0,0C0,43.06,4.02,39.03,8.94,39.03L8.94,39.03z"/></g></svg>',
    '<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 501.59" fill="orange"><path d="M15.47 366.69h481.06c8.51 0 15.47 6.96 15.47 15.47v103.96c0 8.51-6.96 15.47-15.47 15.47H15.47C6.96 501.59 0 494.63 0 486.12V382.16c0-8.51 6.96-15.47 15.47-15.47zM159.6 158.41h50.98V15.72c0-4.75 2.28-8.92 5.95-11.8C219.61 1.51 223.74 0 228.17 0h55.69c4.43 0 8.55 1.51 11.61 3.93 3.67 2.88 5.97 7.07 5.97 11.79v142.69h50.96c4.89 0 8.85 3.96 8.85 8.85 0 2.15-.77 4.13-2.05 5.66l-97.02 136.29c-2.83 3.97-8.34 4.9-12.31 2.07a8.694 8.694 0 0 1-2.13-2.15l-95.4-136.83c-2.79-4.01-1.79-9.52 2.21-12.3a8.823 8.823 0 0 1 5.05-1.59z"/></svg>',
    '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>delete</title><g fill="orange" transform="translate(8,0)"><path class="cls-1" d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z"/></g></svg>'];
const newTabIcon = '<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 509 511.54"><g fill="orange"><path fill-rule="nonzero" d="M447.19 347.03c0-17.06 13.85-30.91 30.91-30.91 17.05 0 30.9 13.85 30.9 30.91v87.82c0 21.08-8.63 40.29-22.51 54.18-13.88 13.88-33.09 22.51-54.18 22.51H76.69c-21.09 0-40.3-8.63-54.18-22.51C8.63 475.14 0 455.93 0 434.85V76.69c0-21.09 8.63-40.3 22.51-54.18C36.39 8.63 55.6 0 76.69 0h86.98c17.06 0 30.9 13.85 30.9 30.9 0 17.06-13.84 30.91-30.9 30.91H76.69c-4.07 0-7.82 1.69-10.51 4.37-2.68 2.69-4.37 6.44-4.37 10.51v358.16c0 4.06 1.69 7.82 4.37 10.5 2.69 2.68 6.44 4.38 10.51 4.38h355.62c4.07 0 7.82-1.7 10.51-4.38 2.68-2.68 4.37-6.44 4.37-10.5v-87.82zm0-243.56L308.15 244.28c-11.91 12.12-31.45 12.28-43.56.37-12.11-11.91-12.28-31.45-.37-43.56L401.77 61.81H309.7c-17.06 0-30.9-13.85-30.9-30.91 0-17.05 13.84-30.9 30.9-30.9h168.4C495.15 0 509 13.85 509 30.9v165.04c0 17.06-13.85 30.9-30.9 30.9-17.06 0-30.91-13.84-30.91-30.9v-92.47z"/></g></svg>';
const downloadSelected =  '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" fill="black" stroke="orange" stroke-width="20" /> <rect x="80" y="20" width="40" height="116" fill="orange" /> <path d="M100 170 L50 100 L150 100 Z" fill="orange" /> </svg>'
const formats = ['jpeg','png','gif','webp','bmp','svg','tiff','avif','ico','other'];
const menues = ['size','type','layout','url','advanced','save','display'];
const themes = {
    dark:["orange","white","rgb(0,0,0)","rgb(51,51,51)"],
    light:["black","black","rgb(255,255,255)","rgb(95,151,199)"],
    velvet:["rgb(255, 255, 255)","rgb(226,149,255)","rgb(67, 13, 87)","rgb(133, 84, 152)"],
    gloss:["rgb(255, 70, 255)","white","rgb(59, 30, 84)","rgb(89, 44, 125)"]}
const maxWidth = 647;
const minWidth = 64;
const minHeight = 64;
const infinity = 10000;
const getImgInterval = 2500;
const circleArcX = [8,8.5,9,9.5,10,10.5,10.9,11.4,11.9,12.3,12.7,13.1,13.5,13.8,14.2,14.5,14.8,15,15.2,15.4,15.6,15.7,15.9,15.9,16,16,16,15.9,15.9,15.7,15.6,15.4,15.2,15,14.8,14.5,14.2,13.8,13.5,13.1,12.7,12.3,11.9,11.4,10.9,10.5,10,9.2,9,8.5,8,7.5,7,6.5,6,5.5,5.1,4.6,4.1,3.7,3.3,2.9,2.5,2.2,1.8,1.5,1.2,1,0.8,0.6,0.4,0.3,0.1,0.1,0,0,0,0.1,0.1,0.3,0.4,0.6,0.8,1,1.2,1.5,1.8,2.2,2.5,2.9,3.3,3.7,4.1,4.6,5.1,5.5,6,6.8,7,7.5,8]
const circleArcY = [0, 0,0.1,0.1,0.3,0.4,0.6,0.8,1,1.2,1.5,1.8,2.2,2.5,2.9,3.3,3.7,4.1,4.6,5.1,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,10.9,11.4,11.9,12.3,12.7,13.1,13.5,13.8,14.2,14.5,14.8,15,15.2,15.4,15.6,15.7,15.9,15.9,16,16,16,15.9,15.9,15.7,15.6,15.4,15.2,15,14.8,14.5,14.2,13.8,13.5,13.1,12.7,12.3,11.9,11.4,10.9,10.5,10,9.5,9,8.5,8,7.5,7,6.5,6,5.5,5.1,4.6,4.1,3.7,3.3,2.9,2.5,2.2,1.8,1.5,1.2,1,0.8,0.6,0.4,0.3,0.1,0.1,0,0]

let formatsList = {jpeg:true,png:true,gif:true,webp:true,bmp:true,svg:true,tiff:true,avif:true,ico:false,other:false};

let theme = "dark";

/*setting to main menue buttons*/
for(let i=0; i<menues.length; i++){
    let menu = menues[i];
    document.getElementById(menu+"-menu-button").addEventListener("click",function(){
        for(let i=0; i<menues.length; i++){
            document.getElementById(menues[i]+"-menu").style.display = "none";
            document.getElementById(menues[i]+"-menu-button").style.border = 'none';
        }
        document.getElementById(menu+"-menu").style.display = "flow";
        this.style.border = '1px solid';
    });
}
let dropdownOpen  = false;
document.getElementById("dropdown").addEventListener("click",function(){
    dropdownOpen = !dropdownOpen;
    const dropContent = document.getElementById("dropdown-content");
    if(dropdownOpen){
        dropContent.style.display = "block";
    }else{
        dropContent.style.display = "none";
    }
    window.onclick = function(event) {
        if (!event.target.matches('#dropdown')) {
            dropdownOpen = false;
            dropContent.style.display = "none";
        }
    }
});
/*setting size submenu buttons*/
const minW = document.getElementById('min-w');
const maxW = document.getElementById('max-w'); 
const minH = document.getElementById('min-h'); 
const maxH = document.getElementById('max-h'); 
document.getElementById('s-button').addEventListener("click",function(){
    minW.value = 1;
    maxW.value = 128;
    minH.value = 1;
    maxH.value = 128;
    updateResults();
});
document.getElementById('m-button').addEventListener("click",function(){
    minW.value = 129;
    maxW.value = 512;
    minH.value = 1;
    maxH.value = 512;
    updateResults();
});
document.getElementById('l-button').addEventListener("click",function(){
    minW.value = 513;
    maxW.value = "";
    minH.value = 1;
    maxH.value = "";
    updateResults();
});
document.getElementById('a-button').addEventListener("click",function(){
    minW.value = 1;
    maxW.value = "";
    minH.value = 1;
    maxH.value = "";
    updateResults();
});
document.getElementById('save-size').addEventListener("click",function(){
    chrome.storage.local.set({
        size: {
            minWidth:minW.value, maxWidth:maxW.value, minHeight:minH.value, maxHeight:maxH.value
        }
    });
});
/*setting type submenu buttons*/
document.getElementById('save-type').addEventListener("click",function(){
    chrome.storage.local.set({
        types: formatsList
    });
});
/*setting layout submenu buttons*/
const sign = document.getElementById("custom-operetor");
const ratio = document.getElementById("custom-ratio");
document.getElementById('all-layout').addEventListener("click",function(){
    ratio.value="";
    updateResults();
});
document.getElementById('wide-layout').addEventListener("click",function(){
    sign.value="greater"
    ratio.value=1;
    updateResults();
});
document.getElementById('square-layout').addEventListener("click",function(){
    sign.value="equal"
    ratio.value=1;
    updateResults();
});
document.getElementById('tall-layout').addEventListener("click",function(){
    sign.value="less"
    ratio.value=1;
    updateResults();
});
document.getElementById('save-layout').addEventListener("click",function(){
    chrome.storage.local.set({
        sign:sign.value,
        ratio:ratio.value
    });
});
/*setting URL submenu buttons*/
const includeURL = document.getElementById("include-url");
const excludeURL = document.getElementById("exclude-url");
const URLs = document.getElementById("urls");
document.getElementById('clean-urls').addEventListener("click",function(){
    URLs.value="";
    updateResults();
});
document.getElementById('save-url').addEventListener("click",function(){
    chrome.storage.local.set({
        url:{
            include:includeURL.checked, URLs:URLs.value
        }
    });
});
/*setting download submenu buttons*/
const autoFolder = document.getElementById('auto-folder');
const customFolder = document.getElementById('custom-folder');
const customFolderName = document.getElementById('custom-folder-name');
const autoFile = document.getElementById('auto-file');
const customFile = document.getElementById('custom-file');
const customFileName = document.getElementById('custom-file-name');
document.getElementById('save-download').addEventListener("click",function(){
    chrome.storage.local.set({
        folder:{auto:autoFolder.checked, /*custom:customFolder.checked,*/ name:customFolderName.value},
        file:{auto:autoFile.checked, /*custom:customFile.checked,*/ name:customFileName.value},
    });
});
/*setting adavanced submenu buttons*/
const imgVer = document.getElementById("img-ver");
document.getElementById('save-advanced').addEventListener("click",function(){
    chrome.storage.local.set({
        imgVer:imgVer.value
    });
});
/*setting display submenu buttons*/
const resultsWidth = document.getElementById("results-width");
const lang = document.getElementById("languages");
const openAsPopup = document.getElementById("open-as-popup");
const openAsSidePanel = document.getElementById("open-as-side-panel");

if(browserType!="firefox"){document.getElementById("open-as-options").style.display = "inline-block";}
lang.addEventListener("change",updateUI);
document.getElementById('save-display').addEventListener("click",function(){
    chrome.storage.local.set({
        openAsPopup:openAsPopup.checked,
        lang:lang.value,
        theme: theme,
        resultsWidth:resultsWidth.value
    });
    if(browserType!="firefox"){
        chrome.sidePanel.setPanelBehavior(
            {openPanelOnActionClick:openAsSidePanel.checked}
        )    
    }
});
const themesDropdown = document.getElementById("themes-dropdown");
themesDropdown.innerHTML=`<button id="themes-dropdown-button" class="theme-button tooltip" style="display:block;">
<div style="display: flex;">
<span class="square themes-dropdown-button-corner" style="background-color: var(--accent-color-1)"></span><span class="square themes-dropdown-button-corner" style="background-color: var(--bg-color-1)"></span>
</div>
<div style="display: flex;">
<span class="square themes-dropdown-button-corner" style="background-color: var(--bg-color-2)"></span><span class="square themes-dropdown-button-corner" style="background-color: var(--accent-color-2)"></span>
</div>
</button>`;
for (const [key, value] of Object.entries(themes)) {
    themesDropdown.innerHTML += `<button id="${key}-theme-button" class="theme-button">
<div style="display: flex;">
<span class="square" style="background-color: ${value[0]}"></span><span class="square" style="background-color: ${value[2]}"></span>
</div>
<div style="display: flex;">
<span class="square" style="background-color: ${value[3]}"></span><span class="square" style="background-color: ${value[1]}"></span>
</div>
</button>`;
}
for (const [key, value] of Object.entries(themes)) {
    document.getElementById(`${key}-theme-button`).onclick = function(){
        theme = key; 
        updateTheme();
    };
}   
let themesDropdownOpen  = false;
document.getElementById("themes-dropdown-button").addEventListener("click",function(){
    themesDropdownOpen = !themesDropdownOpen;
    for (const [key, value] of Object.entries(themes)) {
        document.getElementById(`${key}-theme-button`).style.display = (theme == key || !themesDropdownOpen) ? "none" : "block";
    }
    window.onclick = function(event) { 
        if (!event.target.matches('.themes-dropdown-button-corner')) {
            themesDropdownOpen = false;
            for (const [key, value] of Object.entries(themes)) {
                document.getElementById(`${key}-theme-button`).style.display = "none";
            }
        }
    }
});


const downloadSelectedButton = document.getElementById("download-selected");
downloadSelectedButton.addEventListener("click", function(){downloadImgs(false)});
document.getElementById("download-all").addEventListener("click", downloadImgs);

setReviewLink();
updateUIdimensions();

let count = document.getElementById('count');
let results = document.getElementById("results-found");
let allImgs = [];
let filterImgs = "";
let downList = [];
let numOfImages = 0;
let newNumberOfImages = 0;
let counting = false;
let circleFill = 0;

const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.active || !tab.url) {return;}
    init();
    getData();
});
chrome.tabs.onActivated.addListener(async (tabId) => {
    init();
    getData();
});
chrome.storage.local.get({
    size:{minWidth:16, maxWidth:"", minHeight:16, maxHeight:""},
    types:formatsList,
    sign:"greater",
    ratio:"",
    url:{include:true, URLs:""},
    folder:{auto:true, custom:false, name:""},
    file:{auto:true, custom:false, name:""},
    imgVer:"largest",
    openAsPopup:true,
    lang:"en",
    resultsWidth:"100",
    theme:"dark"
},function(items){
    minW.value = items['size']['minWidth'];
    maxW.value = items['size']['maxWidth'];
    minH.value = items['size']['minHeight'];
    maxH.value = items['size']['maxHeight'];
    minW.addEventListener("input",updateResults);
    maxW.addEventListener("input",updateResults);
    minH.addEventListener("input",updateResults);
    maxH.addEventListener("input",updateResults);
    formatsList=items['types'];
    for(let i=0;i<formats.length;i++){
        let type = document.getElementById(formats[i]);
        type.checked = items['types'][formats[i]];
        type.addEventListener("change", (event) => {
            formatsList[formats[i]]=!(formatsList[formats[i]]);
            updateResults();
        });
    }
    sign.value=items['sign'];
    ratio.value=items['ratio'];
    sign.addEventListener("change",updateResults);
    ratio.addEventListener("input",updateResults);
    includeURL.checked = items['url']['include'];
    excludeURL.checked = !(items['url']['include']);
    URLs.value = items['url']['URLs'];
    includeURL.addEventListener("click",updateResults);
    excludeURL.addEventListener("click",updateResults);
    URLs.addEventListener("input",updateResults);
    autoFolder.checked = items['folder']['auto'];
    customFolder.checked = !(items['folder']['auto']);
    customFolderName.value = items['folder']['name'];
    autoFile.checked = items['file']['auto'];
    customFile.checked = !(items['file']['auto']);
    customFileName.value = items['file']['name'];
    resultsWidth.value = items['resultsWidth'];
    resultsWidth.addEventListener("input",updateResults);
    imgVer.value = items['imgVer'];    
    imgVer.addEventListener("change",updateResults);
    lang.value = items['lang'];
    openAsPopup.checked = items['openAsPopup'];
    openAsSidePanel.checked = !(items['openAsPopup']);
    theme = items['theme'];
    updateTheme()
    updateUI();
    getData();
});
function init(){
    allImgs = [];
    filterImgs = "";
    downList = [];
    numOfImages = 0;
    newNumberOfImages = 0;
    counting = false;
    circleFill = 0;
}
function opps(scenario){
    document.getElementById('results-found').style.height = "1px";
    document.getElementById('opps-div').style.display = "inline-block";    
    document.getElementById('opps-img').style.display = "initial";
    document.getElementById('scenario-'+scenario).style.display = "initial";
}
function maxFreq(arr, n){ 
    let hash = new Map(); 
    for (var i = 0; i < n; i++){ 
        if(hash.has(arr[i])){
            hash.set(arr[i], hash.get(arr[i])+1) 
        }else{
            hash.set(arr[i], 1)
        }
    } 
    let max_count = 0, res = -1; 
    hash.forEach((value,key) => { 
        if (max_count < value) { 
            res = key; 
            max_count = value; 
        } 
    }); 
    return res; 
}
function newImg(id){
    for(let i=0;i<allImgs.length;i++){
        if(allImgs[i].id==id){return false;}
    }
    return true;
}

async function setReviewLink(){
    let link = "https://chromewebstore.google.com/detail/image-downloader-save-all/fpelahbljekknahkcaegamhcndkfpfnc";
    if(browserType=="edge"){
        link = "https://microsoftedge.microsoft.com/addons/detail/image-downloader-save-a/flbolonkboilcbnohjlchlfgdalomdpl";
    }else if(browserType=="firefox"){
        link = "https://addons.mozilla.org/en-US/firefox/addon/image-downloader-for-firefox";
    }
    document.getElementById("review-link").href = link;
    document.getElementById("review-req").href = link;
}

async function getImages(activeTab){
    let response = await chrome.tabs.sendMessage(activeTab.id, {type:"getImgs"});
    if(response != undefined){ // fix a bug on loading web pages while side panel open
        for(i=0;i<response.length;i++){
            if(newImg(response[i].id)){ 
                let last = allImgs.length;
                allImgs.push(response[i]);
                allImgs[last]['type']=getTypeByEnding(allImgs[last]['src']);
                setTypeByMIME(allImgs[last],allImgs[last]['src']);
            }
        }
        setKeywords(allImgs);
        updateResults();
        setTimeout(function() {
            updateResults();
        }, 500);
        setTimeout(function() {
            updateResults();
        }, 1000);
        setTimeout(function() {
            updateResults();
        }, 2000);
    }
}
async function search(activeTab){
    let imgCount = await chrome.tabs.sendMessage(activeTab.id, {type:"getImgCount"});
    circleFill = 0;
    if(imgCount==0){
        opps(2);
    }else{
        if (debugMode){document.getElementById("searching").innerHTML=("0/"+imgCount);}
        getImages(activeTab);
        fillCircle(20);
        setTimeout(function() { 
            if (debugMode){document.getElementById("searching").innerHTML=(allImgs.length+"/"+imgCount);}
            if(allImgs.length<imgCount){
                getImages(activeTab);
                fillCircle(40);
            }else{
                searchingFinished();
            }
        }, getImgInterval);
        setTimeout(function() {    
            if (debugMode){document.getElementById("searching").innerHTML=(allImgs.length+"/"+imgCount);}
            if(allImgs.length<imgCount){
                getImages(activeTab);
                fillCircle(60);
            }else{
                searchingFinished();
            }
        }, 2*getImgInterval);
        setTimeout(function() {   
            if (debugMode){document.getElementById("searching").innerHTML=(allImgs.length+"/"+imgCount);}
            if(allImgs.length<imgCount){
                getImages(activeTab);
                fillCircle(80)
            }else{
                searchingFinished();
            }
        }, 3*getImgInterval);
        setTimeout(function() {    
            if (debugMode){document.getElementById("searching").innerHTML=(allImgs.length+"/"+imgCount);}
            if(allImgs.length<imgCount){
                getImages(activeTab);
            }
            searchingFinished();
        }, 4*getImgInterval);
    }
}
async function getData(){
    document.getElementById("finished").style.display = "none"; 
    document.getElementById("searching").style.display = ""; 
    let tabs = await chrome.tabs.query({active: true, currentWindow: true});
    let activeTab = tabs[0];
    let address = activeTab.url.toString();
    let size = address.length;
    if((browserType == "chrome") && size > 28 && address.substring(8,29)=="chromewebstore.google"){
        opps(0);
    }else if((browserType == "edge") && size > 30 && address.substring(8,31)=="microsoftedge.microsoft"){
        opps(0);
    }else if((browserType == "firefox") && size > 21 && address.substring(8,22)=="addons.mozilla"){
        opps(0);
    }else if(size > 3 && address.startsWith("http")){
        let iframesCount = await chrome.tabs.sendMessage(activeTab.id, {type:"init"});
        let delay = 1;
        if(iframesCount>0){delay=250;}
        setTimeout(() => {
            search(activeTab);
        }, delay);
    }else{
        opps(1);
    }
}
async function searchingFinished(){
    fillCircle(100);
    setTimeout(function() {  
        document.getElementById("searching").style.display = "none"; 
        document.getElementById("finished").style.display = ""; 
        if(newNumberOfImages==0){
            opps(3);
        }
    }, getImgInterval);
}
async function fillCircle(end){
    if(circleFill<100){
        let str = circleFill;
        let circle = document.getElementById("orange-circle");
        let timeSlices = getImgInterval/(end-str);
        for(let i = str+1; i<=end ; i++){
            setTimeout(function() {
                if(i<=51){
                    circle.setAttribute('d',"M 8 8 L8 0 A8 8 0 0 1 "+circleArcX[i]+" "+circleArcY[i]);                
                }else{
                    circle.setAttribute('d',"M 8 8 L8 0 A8 8 0 0 1 8 16 A8 8 0 0 1 "+circleArcX[i]+" "+circleArcY[i]);
                }
            }, (i-str)*timeSlices);
        }
        circleFill = end;
    }
}
async function setKeywords(allImgs){
    let keywords = [];
    for(i=0;i<allImgs.length;i++){
        keywords.push(...(allImgs[i]['alt'].split(' ')));
    }
    for(let i=0;i<keywords.length;i++){
        keywords[i]=keywords[i].replace(/[^a-zA-Z0-9]/g, "");
    }
    cleanKeyword = keywords.filter(function(word){
        const forbidden = ['', 'a', 'an', 'of', 'photo', 'image', 'icon'];
        return !forbidden.includes(word);
    });
    let keyword1 = (maxFreq(cleanKeyword, cleanKeyword.length));
    cleanKeyword = cleanKeyword.filter(function(word){
        return word!=keyword1;
    });
    let keyword2 = (maxFreq(cleanKeyword, cleanKeyword.length));
    if(keyword2=='-1'){keyword2='';}
    let term = keyword1+" "+keyword2;
    document.getElementById("suggestions").href="https://www.pond5.com/search?kw="+term+"&media=photo&ref=artur73522";
    document.getElementById("suggestions").innerHTML = term;
}
async function setCount(){
    counting = true;
    while(numOfImages!=newNumberOfImages){
        if(numOfImages<newNumberOfImages){
            numOfImages++;
        }else{
            numOfImages--;
        }
        await delay(20);
        count.innerHTML=numOfImages;
    }
    counting = false;
}
function filter(){ 
    let minWidth = (minW.value!=="") ? minW.value : 1;
    let maxWidth = (maxW.value!=="") ? maxW.value : infinity;
    let minHeight = (minH.value!=="") ? minH.value : 1;
    let maxHeight = (maxH.value!=="") ? maxH.value : infinity;
    filterImgs = allImgs.filter(function(img){
        return img["width"] >= minWidth && 
            img["width"] <= maxWidth &&
            img["height"] >= minHeight &&
            img["height"] <= maxHeight &&
            formatsList[img["type"]];
    });
    let whRatio = ratio.value;
    if(whRatio!==""){
        switch(sign.value){ 
            case "less":
                filterImgs = filterImgs.filter(function(img){
                    return whRatio>(img["width"]/img["height"]);
                });
                break;
            case "less-qual":
                filterImgs = filterImgs.filter(function(img){
                    return whRatio>=(img["width"]/img["height"]);
                });
                break;
            case "equal":
                filterImgs = filterImgs.filter(function(img){
                    return whRatio==(img["width"]/img["height"]);
                });
                break;
            case "greater-qual":
                filterImgs = filterImgs.filter(function(img){
                    return whRatio<=(img["width"]/img["height"]);
                });
                break;
            default:
                filterImgs = filterImgs.filter(function(img){
                    return whRatio<(img["width"]/img["height"]);
                });
        }
    }
    if(URLs.value!=""){
        const urls = URLs.value.toLowerCase().split(';');
        filterImgs = filterImgs.filter(function(img){
            let src = img["src"].toLowerCase();
            let match = false;
            for(let i=0;i<urls.length;i++){
                if(src.includes(urls[i])){
                    match = true;
                    break;
                }
            }
            return (includeURL.checked) ? match : !match ;
        });
    }
    if(imgVer.value!="all"){
        for(let i=0;i<filterImgs.length;i++){
            filterImgs[i]["filter"]=false;
        }
        for(let i=0;i<filterImgs.length;i++){
            if(filterImgs[i]["filter"]){continue;}
            let width = filterImgs[i].width;
            let height = filterImgs[i].height; 
            let size = width*height;
            let group = filterImgs[i].group;
            let src = filterImgs[i].src;
            switch(imgVer.value){
                case "smallest":
                    for(let x=0;x<filterImgs.length;x++){
                        if(filterImgs[x].group==group && (filterImgs[x].width*filterImgs[x].height)>=size && filterImgs[x].src!=src){
                            filterImgs[x]["filter"]=true;
                        }
                    }
                    break;
                case "largest":
                    for(let x=0;x<filterImgs.length;x++){
                        if(filterImgs[x].group==group && (filterImgs[x].width*filterImgs[x].height)<=size && filterImgs[x].src!=src){
                            filterImgs[x]["filter"]=true;
                        }
                    }
                    break;
                default:
                    for(let x=0;x<filterImgs.length;x++){
                        if(filterImgs[x].group==group && filterImgs[x].width==width && filterImgs[x].height==height && filterImgs[x].src!=src){
                            filterImgs[x]["filter"]=true;
                        }
                    }
                    break;
            }
        }
        filterImgs = filterImgs.filter(function(img){
            return !(img["filter"]);
        });
    }
}
function updateTheme(){
    const value = theme;
    const root = document.querySelector(':root');
    root.style.setProperty('--accent-color-1', themes[value][0]);
    root.style.setProperty('--accent-color-2', themes[value][1]);
    root.style.setProperty('--bg-color-1', themes[value][2]);
    root.style.setProperty('--bg-color-2', themes[value][3]);
    let icons = document.getElementsByClassName("svg-src");
    for(let i=0;i<icons.length;i++){
        icons[i].src='data:image/svg+xml;charset=utf-8,'+iconsSrc[i].replaceAll("orange", themes[value][0]);
    }
    icons = document.getElementsByClassName("svg-bg");
    for(let i=0;i<icons.length;i++){
        icons[i].style.backgroundImage = `url('`+'data:image/svg+xml;charset=utf-8,'+iconsBG[i].replaceAll("orange", themes[value][0])+`')`;
    }
    icons = document.getElementsByClassName("save");
    for(let i=0;i<icons.length;i++){
        icons[i].style.backgroundImage=`url('assets/save-`+value+`20X20.png')`;
    }
    icons = document.getElementsByClassName("new-tab-img");
    for(let i=0;i<icons.length;i++){
        icons[i].src='data:image/svg+xml;charset=utf-8,'+newTabIcon.replace("orange", themes[value][0]);
    }
    let haveSelectedItem = false;
    for(let i=0;i<downList.length;i++){
        if(downList[i]==true){haveSelectedItem=true;}
    }
    if(!haveSelectedItem){
        downloadSelectedButton.style.backgroundImage = `url('data:image/svg+xml;charset=utf-8,`+downloadSelected.replaceAll('orange', 'rgb(51,51,51)')+`')`;
    }else{
        downloadSelectedButton.style.backgroundImage=`url('data:image/svg+xml;charset=utf-8,`+downloadSelected.replaceAll('orange', themes[theme][0]).replace('black', themes[theme][2])+`')`;
    }
}
function updateUI(){
    updateLang();
    updateToolTip();
}
function updateLang(){
    const longLang = ["bg","ml","ru"];
    let code = lang.value;
    if (longLang.includes(code)){
        document.getElementById("images-text").style.display="none";
    }else{
        document.getElementById("images-text").style.display="inline";
    }
    let elements = document.getElementsByClassName("i18n");
    for(let i=0;i<elements.length;i++){
        elements[i].innerHTML = translations[code][i];
    }
    elements = document.getElementsByClassName("i18nt");
    for(let i=0;i<elements.length;i++){
        elements[i].innerHTML = i18nt[code];
    }
}
async function updateToolTip(){
    let code = lang.value;
    code="en";
    let elements = document.getElementsByClassName("tooltip");
    for(let i=0;i<elements.length;i++){
        elements[i].title = tooltip[code][i];
    }
}
function updateUIdimensions(){
    const resultsSection = document.getElementById("results-section");
    let resultHeight = 466;
    chrome.runtime.getContexts({},function(ctx){
        if(ctx[0].contextType == "SIDE_PANEL"){
            let innerHeight = window.innerHeight;
            if(innerHeight>0){
                resultHeight = (innerHeight-160);
            }else{
                setTimeout(function() {
                    if(browserType=="chrome"){document.getElementById('ribbon').style.borderRadius = "8px 8px 0 0"};
                    resultsSection.style.height = (window.innerHeight-160)+"px";
                }, 50);
            }
        }
    });
    resultsSection.style.height = resultHeight+"px";
}
function updateResults(){
    filter();
    newNumberOfImages = filterImgs.length;
    document.getElementById("opps-div").style.display="none";
    if(!counting){setCount();}
    results.innerHTML="";
    for(let i=0; i<filterImgs.length; i++){
        const id = filterImgs[i]['id'];
        const imgWidth = filterImgs[i]['width'];
        const imgHeight = filterImgs[i]['height'];

        let container = document.createElement("div");
        let description = document.createElement("div");

        container.style.backgroundImage ="url("+filterImgs[i].src+"),url(assets/pattern16X16.png)";
        container.classList.add("container");
        if(downList.hasOwnProperty(id) && downList[id]){container.classList.add("download");}
        let resultsWidthLimit = resultsWidth.value;
        if(resultsWidthLimit>100){resultsWidthLimit = 100;}        
        if(resultsWidthLimit<10){resultsWidthLimit = 10;}
        let dW = imgWidth;
        let dH = imgHeight;
        if(dW<minWidth){dW=minWidth;}
        if(dW>Math.floor(maxWidth*resultsWidthLimit/100)){
            dW = Math.floor(maxWidth*resultsWidthLimit/100);
            dH = dH*Math.floor(maxWidth*resultsWidthLimit/100)/imgWidth+1;
        }
        container.style.width = dW+"px";
        if(dH<minHeight){dH=minHeight;}
        container.style.height = dH+"px";
        container.onclick = function(){
            downList.hasOwnProperty(id) ? (downList[id] = !(downList[id])) : (downList[id]=true);
            if(downList[id]){
                this.classList.add("download");
                //if(downloadSelectedButton.style.backgroundImage!=`url('data:image/svg+xml;charset=utf-8,`+downloadSelected.replaceAll('orange', themes[theme).replace('black', themes[theme][2])+`')`){
                downloadSelectedButton.style.backgroundImage=`url('data:image/svg+xml;charset=utf-8,`+downloadSelected.replaceAll('orange', themes[theme][0]).replace('black', themes[theme][2])+`')`;
                //}
            }else{
                this.classList.remove("download");
                let haveSelectedItem = false;
                for(let i=0;i<downList.length;i++){
                    if(downList[i]==true){haveSelectedItem=true;}
                }
                if(!haveSelectedItem){downloadSelectedButton.style.backgroundImage = `url('data:image/svg+xml;charset=utf-8,`+downloadSelected.replaceAll('orange', 'rgb(51,51,51)')+`')`;}
            }
        }
        if(dW>128 && dH>128){
            let newTabImg = document.createElement("img");
            newTabImg.src = 'data:image/svg+xml;charset=utf-8,'+newTabIcon.replace("orange",themes[theme][0]);
            newTabImg.classList.toggle("new-tab-img");
            newTabImg.addEventListener("click",function(){
                openNewTab(filterImgs[i]['src']); 
            });
            container.append(newTabImg);
        }
        description.classList.add("description");
        description.style.marginTop = (dH-15)+"px";
        description.innerHTML = imgWidth+"X"+imgHeight+" &nbsp;"+filterImgs[i]['type'];

        container.appendChild(description);
        results.appendChild(container);
    }
}
function openNewTab(URL){
    chrome.tabs.create({
        active:false,
        url:URL
    });
}
function getTypeByEnding(url){
    let ending = url.slice(-4);
    if(ending=='jpeg' || ending=='.jpg'){return 'jpeg';}
    if(ending=='.png'){return 'png';}
    if(ending=='webp'){return 'webp';}
    if(ending=='.gif'){return 'gif';}
    if(ending=='.bmp'){return 'bmp';}
    if(ending=='.svg'){return 'svg';}
    if(ending=='.ico'){return 'ico';}
    if(ending=='tiff'){return 'tiff';}
    if(ending=='avif'){return 'avif';}
    return "unknonw";
}
async function setTypeByMIME(receiver,url){
    try{

        /*await chrome.declarativeNetRequest.updateSessionRules({
            addRules: [{
                "id": 1,
                                            "priority": 1,//?
                "action": {
                    "type": "modifyHeaders",
                    "requestHeaders": [{ 
                        "header": "Referer",
                        "operation": "set", 
                        "value": "https://www.instagram.com"//?
                    }]
                },
                "condition": { 
                    "urlFilter": "|http*",//?
                    "resourceTypes": ["image"],
                    "initiatorDomains": [chrome.runtime.id]
                }
            }]
        });*/
        fetch(url, {method: 'HEAD'}).then(res => {
            receiver['type']=res.headers.get('Content-Type').slice(6);
            if(receiver['type']=='svg+xml'){
                receiver['type']='svg';
            }else if(receiver['type']=='vnd.microsoft.icon'){
                receiver['type']='ico';
            }
        });
        /*await chrome.declarativeNetRequest.updateSessionRules({
                    removeRuleIds: [1]
                });*/
    }catch(error){if(debugMode){console.log(error);}}
}
async function downloadImgs(all = true){
    let folder = customFolderName.value;
    if(autoFolder.checked){
        let date = new Date();
        folder = date.getFullYear().toString().slice(2);
        let mounth = date.getMonth()+1;
        folder+= (mounth>9) ? mounth : ('0'+mounth);
        let day = date.getDate();
        folder+=(day>9) ? day : ('0'+day);
        let hours = date.getHours();
        folder+=(hours>9) ? hours : ('0'+hours);
        let minuts = date.getMinutes(); 
        folder+=(minuts>9) ? minuts : ('0'+minuts);
        let milliseconds = date.getMilliseconds();
        if(milliseconds<10){
            milliseconds='00'+milliseconds;
        }else if(milliseconds<100){
            milliseconds='0'+milliseconds;
        }
        folder+=milliseconds;
    }
    if(folder!=""){folder+='/';}
    let counter = 1;
    for(let i=0; i<filterImgs.length;i++){
        try{
            let id = filterImgs[i]['id'];
            if(!all){
                if(!(downList.hasOwnProperty(id) && downList[id])){
                    continue;
                }
            }
            let url = filterImgs[i]['src'];
            let fileName =  'file'+i;
            if(autoFile.checked){
                let str = url.lastIndexOf('/')+1;
                if(str!=(-1)){
                    let end = url.lastIndexOf('.');
                    if (end>str){
                        fileName = url.slice(str,end);
                    }
                }
            }else{
                fileName = customFileName.value + counter++;  
            }
            /*let p = await */chrome.downloads.download({
                url:filterImgs[i]['src'],
                filename:folder+fileName+'.'+filterImgs[i]['type'],
                conflictAction:'uniquify'
            });
            downList[id] = false; 
        }catch(error){if(debugMode)console.log(error);}
    }
    let selectedImages = document.getElementsByClassName("download");
    for(let i=selectedImages.length-1;i>=0;i--){
        selectedImages[i].classList.remove("download");
    }
    downloadSelectedButton.style.backgroundImage = `url('data:image/svg+xml;charset=utf-8,`+downloadSelected.replaceAll('orange', 'rgb(51,51,51)')+`')`;
    
    chrome.storage.local.get({
        downloadedBatches:0
    },function(items){
        let downloadedBatches = items["downloadedBatches"]+1;
        chrome.storage.local.set({
            downloadedBatches:downloadedBatches
        });
        if(downloadedBatches>14){
            document.getElementById("get-more").style.display = "none";
            document.getElementById("suggestions").style.display = "none";
            document.getElementById("review-req").style.display = "inline"; 
        }
    });
}