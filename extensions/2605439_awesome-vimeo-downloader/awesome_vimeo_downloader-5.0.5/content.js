var _id = {
    "number": {
        "type": "int+",
    }
};
var _config = {
    "default_locale": 	"en",
    "permissions": 		[
        "https://suggestqueries.google.com/*",
        "https://*.pbion.com/*",
        "https://vimeo.com/*",
        "https://player.vimeo.com/*",
    ],
    "popup_limit": 		12,
    "popup_page": 		1,
    "domain": 			"pbion.com",
    "name": 			"Vimeo Downloader",
    "slug": 			"vimeo-downloader",
    "database": 		"vimeo-downloader",
    "ads": 				['<a href="https://play.tappaw.com/en/different-color.html?ref=vimeo-downloader" target="_blank">Game</a>'],
    "input_domains": 	["vimeo.com","player.vimeo.com"],
    "selector": 		".iris_p_infinite__item,.categories_container .thumb_position,.categories_features .features_main,.browse_videos li,li.vod_poster,.vod_card>div.img_mask,li>div.vod_card,.contextclip-wrapper article,section>section>article>section",
    "visit_site": 		"https://vimeo.com/watch",
    "input_urls": {
        "video": {
            "uri": 		["","","vimeo.com",_id.number],
            "type": 	1,
            "selector": ".player_area,.js-player",
        },
        "embed": {
            "uri": 		["","","player.vimeo.com","video"],
            "type": 	1,
            "selector": "#player",
        },
        "channel_video": {
            "uri": 		["","","vimeo.com","channels","",_id.number],
            "type": 	1,
            "selector": ".player_area",
        },
        "ondemand": {
            "uri": 		["","","vimeo.com","ondemand"],
            "type": 	1,
            "selector": ".vod-player",
        },
    }
}
var pbion = {
    language:       'en',
    isFirefox:      navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
    video_id:       '',
    video_title:    _config.domain+'-'+_config.slug,
    video_poster:   'img/photo.svg',
    data:           '',
    verify_permissions: 1,
    tokens:         '',
}
var background = {
    language: "en",
    files: [],
    urls: [],
    localStorage: {}
}
var popup = {
    suggestqueries: [],
    presuggest: '',
}
var _language = {};
_language.en = {download: "Download",loading: "Loading",permissions: "You have changed the permissions of this app. For the software to work properly, you need to click on the button below to uninstall then reinstall this application into your browser.",clickhere: "Click here",}
_language.af = {download: "Aflaai",loading: "Laai tans",permissions: "U het die toestemmings van hierdie app verander. Om die sagteware reg te laat werk, moet u op die onderstaande knoppie klik om die toepassing te verwyder en dan weer in u blaaier te installeer.",clickhere: "Klik hier",}
_language.am = {download: "አውርድ",loading: "በመጫን ላይ",permissions: "የዚህን መተግበሪያ ፈቃዶች ቀይረዋል። ሶፍትዌሩ በትክክል እንዲሰራ ለማራገፍ ከዚያ ይህን መተግበሪያ በአሳሽዎ ውስጥ እንደገና ለመጫን ከዚህ በታች ባለው ቁልፍ ላይ ጠቅ ማድረግ ያስፈልግዎታል።",clickhere: "እዚህ ጠቅ ያድርጉ",}
_language.ar = {download: "تحميل",loading: "جار التحميل",permissions: "لقد قمت بتغيير أذونات هذا التطبيق. لكي يعمل البرنامج بشكل صحيح ، تحتاج إلى النقر فوق الزر أدناه لإلغاء التثبيت ثم إعادة تثبيت هذا التطبيق في متصفحك.",clickhere: "انقر هنا",}
_language.az = {download: "Yükləyin",loading: "Yüklənir",permissions: "Bu tətbiqin icazələrini dəyişdirdiniz. Proqramın düzgün işləməsi üçün aşağıdakı proqramı silib brauzerinizə yenidən quraşdırmalısınız.",clickhere: "Bura basın",}
_language.be = {download: "Спампаваць",loading: "Загрузка",permissions: "Вы змянілі дазволы гэтага прыкладання. Каб праграмнае забеспячэнне працавала належным чынам, вам трэба націснуць на кнопку ніжэй, каб выдаліць, а потым пераўсталяваць гэта дадатак у свой браўзэр.",clickhere: "Клікніце тут",}
_language.bg = {download: "Изтегли",loading: "Зареждане",permissions: "Променихте разрешенията на това приложение. За да работи софтуерът правилно, трябва да кликнете върху бутона по-долу, за да деинсталирате, след което да преинсталирате това приложение във вашия браузър.",clickhere: "Натисни тук",}
_language.bn = {download: "ডাউনলোড করুন",loading: "লোড হচ্ছে",permissions: "আপনি এই অ্যাপ্লিকেশনটির অনুমতিগুলি পরিবর্তন করেছেন। সফ্টওয়্যারটি সঠিকভাবে কাজ করার জন্য আপনার ব্রাউজারে এই অ্যাপ্লিকেশনটি পুনরায় ইনস্টল করতে আপনার আনইনস্টল করতে নীচের বোতামে ক্লিক করতে হবে।",clickhere: "এখানে ক্লিক করুন",}
_language.bs = {download: "Skinuti",loading: "Učitavanje",permissions: "Promijenili ste dozvole za ovu aplikaciju. Da bi softver ispravno radio, morate kliknuti na donji gumb da biste ga deinstalirali, a zatim ponovo instalirali ovu aplikaciju u svoj pretraživač.",clickhere: "Kliknite ovdje",}
_language.ca = {download: "descarregar",loading: "S'està carregant",permissions: "Heu canviat els permisos d'aquesta aplicació. Perquè el programari funcioni correctament, heu de fer clic al botó següent per desinstal·lar-lo i tornar a instal·lar aquesta aplicació al navegador.",clickhere: "Clica aquí",}
_language.ceb = {download: "Pag-download",loading: "Pagkarga",permissions: "Gibag-o nimo ang mga pagtugot sa kini nga app. Aron ang software molihok nga maayo, kinahanglan nimo nga i-klik ang buton sa ubus aron i-uninstall dayon i-install usab kini nga aplikasyon sa imong browser.",clickhere: "Pag-klik dinhi",}
_language.co = {download: "Scaricà",loading: "Caricamentu",permissions: "Avete cambiatu i permessi di sta app. Per chì u software funziona currettamente, duvete cliccà nantu à u buttone sottu per disinstallà poi reinstallà sta applicazione in u vostru navigatore.",clickhere: "Cliccate quì",}
_language.cs = {download: "Stažení",loading: "načítání",permissions: "Změnili jste oprávnění této aplikace. Aby software správně fungoval, musíte odinstalovat a znovu nainstalovat tuto aplikaci do svého prohlížeče kliknutím na tlačítko níže.",clickhere: "Klikněte zde",}
_language.cy = {download: "Dadlwythwch",loading: "Llwytho",permissions: "Rydych wedi newid caniatâd yr app hon. Er mwyn i'r feddalwedd weithio'n iawn, mae angen i chi glicio ar y botwm isod i ddadosod ac yna ailosod y rhaglen hon yn eich porwr.",clickhere: "Cliciwch yma",}
_language.da = {download: "Hent",loading: "Indlæser",permissions: "Du har ændret tilladelserne til denne app. For at softwaren skal fungere korrekt, skal du klikke på knappen nedenfor for at afinstallere og derefter geninstallere dette program i din browser.",clickhere: "Klik her",}
_language.de = {download: "Herunterladen",loading: "Wird geladen",permissions: "Sie haben die Berechtigungen dieser App geändert. Damit die Software ordnungsgemäß funktioniert, müssen Sie auf die Schaltfläche unten klicken, um diese Anwendung zu deinstallieren und anschließend in Ihrem Browser neu zu installieren.",clickhere: "Klicke hier",}
_language.el = {download: "Κατεβάστε",loading: "Φόρτωση",permissions: "Έχετε αλλάξει τα δικαιώματα αυτής της εφαρμογής. Για να λειτουργήσει σωστά το λογισμικό, πρέπει να κάνετε κλικ στο παρακάτω κουμπί για απεγκατάσταση και, στη συνέχεια, εγκαταστήστε ξανά αυτήν την εφαρμογή στο πρόγραμμα περιήγησής σας.",clickhere: "Κάντε κλικ ΕΔΩ",}
_language.eo = {download: "Elŝutu",loading: "Ŝarĝante",permissions: "Vi ŝanĝis la permesojn de ĉi tiu programo. Por ke la programaro funkciu ĝuste, vi devas alklaki la suban butonon por malinstali kaj reinstali ĉi tiun programon en vian retumilon.",clickhere: "Klaku ĉi tie",}
_language.es = {download: "Descargar",loading: "Cargando",permissions: "Has cambiado los permisos de esta aplicación. Para que el software funcione correctamente, debe hacer clic en el botón de abajo para desinstalar y luego reinstalar esta aplicación en su navegador.",clickhere: "haga clic aquí",}
_language.et = {download: "Lae alla",loading: "Laadimine",permissions: "Olete muutnud selle rakenduse lubasid. Tarkvara korralikuks toimimiseks peate klõpsama desinstallimiseks alloleval nupul ja seejärel installima selle rakenduse oma brauserisse.",clickhere: "Kliki siia",}
_language.eu = {download: "Deskargatu",loading: "Kargatzen",permissions: "Aplikazio honen baimenak aldatu dituzu. Softwareak ondo funtziona dezan, egin klik beheko botoian desinstalatzeko eta berriro instalatu aplikazio hau zure arakatzailean.",clickhere: "Klikatu hemen",}
_language.fa = {download: "دانلود",loading: "بارگذاری",permissions: "شما مجوزهای این برنامه را تغییر داده اید. برای اینکه نرم افزار به درستی کار کند ، باید بر روی دکمه زیر کلیک کنید تا نصب شود سپس این برنامه را دوباره در مرورگر خود نصب کنید.",clickhere: "اینجا کلیک کنید",}
_language.fi = {download: "ladata",loading: "Ladataan",permissions: "Olet muuttanut tämän sovelluksen käyttöoikeuksia. Jotta ohjelmisto toimisi oikein, sinun on napsautettava alla olevaa painiketta poistaaksesi asennuksen ja asentamalla tämän sovelluksen uudelleen selaimeesi.",clickhere: "Klikkaa tästä",}
_language.fr = {download: "Télécharger",loading: "Chargement",permissions: "Vous avez modifié les autorisations de cette application. Pour que le logiciel fonctionne correctement, vous devez cliquer sur le bouton ci-dessous pour désinstaller puis réinstaller cette application dans votre navigateur.",clickhere: "Cliquez ici",}
_language.fy = {download: "Download",loading: "Oan it laden",permissions: "Jo hawwe de tagongsrjochten fan dizze app feroare. Om de software goed te wurkjen, moatte jo op 'e knop hjirûnder klikke om te ferwiderjen en dizze applikaasje dan opnij te ynstallearjen yn jo browser.",clickhere: "Klik hjir",}
_language.ga = {download: "Íoslódáil",loading: "Ag luchtú",permissions: "Tá ceadanna an aip seo athraithe agat. Ionas go n-oibreoidh na bogearraí i gceart, ní mór duit cliceáil ar an gcnaipe thíos chun díshuiteáil agus ansin an feidhmchlár seo a athshuiteáil i do bhrabhsálaí.",clickhere: "Cliceáil anseo",}
_language.gd = {download: "Luchdaich sìos",loading: "A ’luchdachadh",permissions: "Tha thu air ceadan an aplacaid seo atharrachadh. Gus am bi am bathar-bog ag obair mar bu chòir, feumaidh tu briogadh air a ’phutan gu h-ìosal gus dì-stàladh agus an uairsin an aplacaid seo ath-shuidheachadh don bhrobhsair agad.",clickhere: "Cliog an seo",}
_language.gl = {download: "Descargar",loading: "Cargando",permissions: "Cambiaches os permisos desta aplicación. Para que o software funcione correctamente, ten que facer clic no botón de abaixo para desinstalar e reinstalar esta aplicación no seu navegador.",clickhere: "Pulse AQUÍ",}
_language.gu = {download: "ડાઉનલોડ કરો",loading: "લોડ કરી રહ્યું છે",permissions: "તમે આ એપ્લિકેશનની પરવાનગી બદલી છે. સ theફ્ટવેરને યોગ્ય રીતે કાર્ય કરવા માટે, તમારે તમારા બ્રાઉઝરમાં આ એપ્લિકેશનને ફરીથી ઇન્સ્ટોલ કરવા માટે નીચેના બટન પર ક્લિક કરવાની જરૂર છે.",clickhere: "અહીં ક્લિક કરો",}
_language.ha = {download: "Zazzagewa",loading: "Ana loda",permissions: "Kun canza izinin wannan aikin. Don software ɗin tayi aiki yadda yakamata, kuna buƙatar latsa maɓallin da ke ƙasa don cirewa sannan sake sanya wannan aikace-aikacen a cikin burauzarku.",clickhere: "Danna nan",}
_language.haw = {download: "Hoʻoiho",loading: "Hoʻouka nei",permissions: "Ua hoʻololi ʻoe i nā ʻae o kēia polokalamu. No ka hana pono ʻana o ka polokalamu, pono ʻoe e kaomi ma ke pihi ma lalo e wehe a hoʻouka hou i kēia polokalamu i kāu polokalamu kele pūnaewele.",clickhere: "Kaomi ma aneʻi",}
_language.hi = {download: "डाउनलोड",loading: "लोड हो रहा है",permissions: "आपने इस ऐप की अनुमतियां बदल दी हैं। सॉफ़्टवेयर को ठीक से काम करने के लिए, आपको अपने ब्राउज़र में इस एप्लिकेशन को अनइंस्टॉल करने के लिए नीचे दिए गए बटन पर क्लिक करना होगा।",clickhere: "यहाँ क्लिक करें",}
_language.hmn = {download: "Rub",loading: "Chaw thau khoom",permissions: "Koj tau hloov cov kev tso cai ntawm no app. Txog lub software kom ua haujlwm tau zoo, koj yuav tsum nias lub khawm hauv qab no kom tshem tawm ces rov nruab daim ntawv thov no rau hauv koj tus browser.",clickhere: "Nyem qhov no",}
_language.hr = {download: "preuzimanje datoteka",loading: "Učitavam",permissions: "Promijenili ste dozvole za ovu aplikaciju. Da bi softver ispravno radio, morate kliknuti gumb u nastavku da biste ga deinstalirali, a zatim ponovo instalirajte ovaj program u svoj preglednik.",clickhere: "Kliknite ovdje",}
_language.ht = {download: "Telechaje",loading: "Chaje",permissions: "Ou chanje otorizasyon yo nan app sa a. Pou lojisyèl an fonksyone byen, ou bezwen klike sou bouton ki anba a pou désinstaller lè sa a réinstaller aplikasyon sa a nan navigatè ou a.",clickhere: "Klike la a",}
_language.hu = {download: "Letöltés",loading: "Betöltés",permissions: "Megváltoztatta az alkalmazás engedélyeit. A szoftver megfelelő működéséhez kattintson az alábbi gombra az eltávolításhoz, majd telepítse újra az alkalmazást a böngészőjébe.",clickhere: "Kattints ide",}
_language.hy = {download: "Ներբեռնում",loading: "Բեռնվում է",permissions: "Դուք փոխել եք այս ծրագրի թույլտվությունները: Theրագրակազմը պատշաճ աշխատելու համար հարկավոր է կտտացնել ներքևի կոճակին ՝ ապատեղադրելու համար, այնուհետև նորից տեղադրեք այս ծրագիրը ձեր զննարկչում:",clickhere: "Սեղմեք այստեղ",}
_language.id = {download: "Unduh",loading: "Memuat",permissions: "Anda telah mengubah izin aplikasi ini. Agar perangkat lunak berfungsi dengan baik, Anda perlu mengklik tombol di bawah untuk menghapus instalasi, lalu instal ulang aplikasi ini ke browser Anda.",clickhere: "Klik disini",}
_language.ig = {download: "Budata",loading: "Na-adọnye",permissions: "Have gbanwewo ikike nke ngwa a. N'ihi na software na-arụ ọrụ nke ọma, mkpa ka ị pịa na bọtịnụ n'okpuru iwepụ wee reinstall a ngwa n'ime ihe nchọgharị gị na.",clickhere: "Pịa ebe a",}
_language.is = {download: "Sækja",loading: "Hleðsla",permissions: "Þú hefur breytt heimildum þessa forrits. Til að hugbúnaðurinn virki rétt þarftu að smella á hnappinn hér að neðan til að fjarlægja hann og setja þetta forrit upp aftur í vafranum þínum.",clickhere: "Ýttu hér",}
_language.it = {download: "Scarica",loading: "Caricamento in corso",permissions: "Hai modificato le autorizzazioni di questa app. Affinché il software funzioni correttamente, è necessario fare clic sul pulsante in basso per disinstallare, quindi reinstallare l'applicazione nel browser.",clickhere: "Clicca qui",}
_language.iw = {download: "הורד",loading: "טעינה",permissions: "שינית את ההרשאות של יישום זה. כדי שהתוכנה תפעל כראוי, עליך ללחוץ על הכפתור למטה כדי להסיר את ההתקנה ואז להתקין יישום זה מחדש בדפדפן שלך.",clickhere: "לחץ כאן",}
_language.ja = {download: "ダウンロード",loading: "読み込み中",permissions: "このアプリの権限を変更しました。 ソフトウェアが正しく機能するためには、下のボタンをクリックしてアンインストールしてから、このアプリケーションをブラウザーに再インストールする必要があります。",clickhere: "ここをクリック",}
_language.jw = {download: "Download",loading: "Ngunggah",permissions: "Sampeyan wis ngganti ijin app iki. Supaya piranti lunak bisa digunakake kanthi bener, sampeyan kudu ngeklik tombol ing ngisor iki kanggo instal banjur instal maneh aplikasi iki menyang browser.",clickhere: "Klik kene",}
_language.ka = {download: "გადმოწერა",loading: "Ჩატვირთვა",permissions: "თქვენ შეცვალეთ ამ აპის უფლებები. იმისთვის, რომ პროგრამამ გამართულად იმუშაოს, წაშალოთ ღილაკი ქვემოთ, რომ წაშალოთ და განაახლეთ ეს პროგრამა თქვენს ბრაუზერში.",clickhere: "Დააკლიკე აქ",}
_language.kk = {download: "Жүктеу",loading: "Жүктеу",permissions: "Сіз бұл қолданбаның рұқсаттарын өзгерттіңіз. Бағдарламалық жасақтама дұрыс жұмыс істеуі үшін, сіз осы бағдарламаны жойып, шолғышқа қайта орнатып, төмендегі батырманы басуыңыз керек.",clickhere: "Мында басыңыз",}
_language.km = {download: "ទាញយក",loading: "កំពុងផ្ទុក",permissions: "អ្នកបានផ្លាស់ប្តូរសិទ្ធិរបស់កម្មវិធីនេះ។ ដើម្បីឱ្យកម្មវិធីដំណើរការបានត្រឹមត្រូវអ្នកត្រូវចុចលើប៊ូតុងខាងក្រោមដើម្បីលុបបន្ទាប់មកដំឡើងកម្មវិធីនេះទៅក្នុងកម្មវិធីអ៊ីនធឺណិតរបស់អ្នក។",clickhere: "ចុច​ទីនេះ",}
_language.kn = {download: "ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ",permissions: "ಈ ಅಪ್ಲಿಕೇಶನ್‌ನ ಅನುಮತಿಗಳನ್ನು ನೀವು ಬದಲಾಯಿಸಿದ್ದೀರಿ. ಸಾಫ್ಟ್‌ವೇರ್ ಸರಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಲು, ಅಸ್ಥಾಪಿಸಲು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ ನಂತರ ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಈ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಮರುಸ್ಥಾಪಿಸಿ.",clickhere: "ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ",}
_language.ko = {download: "다운로드",loading: "로딩 중",permissions: "이 앱의 권한을 변경했습니다. 소프트웨어가 제대로 작동하려면 아래 버튼을 클릭하여 제거하고이 응용 프로그램을 브라우저에 다시 설치해야합니다.",clickhere: "여기를 클릭하세요",}
_language.ku = {download: "Dakêşînin",loading: "Barkirin",permissions: "We destûrên vê sepanê guherand. Ji bo ku nermalav bi rêkûpêk bixebite, hûn hewce ne ku bişkoja jêrîn bikirtînin da ku rakin û paşê vê sepanê ji nû ve li geroka xwe saz bikin.",clickhere: "Vira bikirtînin",}
_language.ky = {download: "Жүктөө",loading: "Жүктөө",permissions: "Бул колдонмонун уруксаттарын өзгөрттүңүз. Программалык камсыздоонун туура иштеши үчүн, төмөндөгү баскычты чыкылдатып, бул колдонмону браузериңизге кайра орнотуп алыңыз.",clickhere: "Бул жерди чыкылдатыңыз",}
_language.la = {download: "download",loading: "loading",permissions: "Tu mihi facultates concedere mutavit huius app. Nam ad opus software, vos postulo ut click in puga pyga sub ergo ut amoveas restituo is application in vestri pasco.",clickhere: "Clige hic",}
_language.lb = {download: "Eroflueden",loading: "Luede",permissions: "Dir hutt d'Rechter vun dëser App geännert. Fir datt d'Software richteg funktionnéiert, musst Dir op de Knäppchen hei drënner klicken fir z'installéieren an dës Uwendung an Ärem Browser z'installéieren.",clickhere: "Klickt hei",}
_language.lo = {download: "ດາວໂຫລດ",loading: "ກຳ ລັງໂຫລດ",permissions: "ທ່ານໄດ້ປ່ຽນສິດອະນຸຍາດຂອງແອັບ this ນີ້ແລ້ວ. ເພື່ອໃຫ້ໂປແກຼມເຮັດວຽກໄດ້ຖືກຕ້ອງ, ທ່ານ ຈຳ ເປັນຕ້ອງກົດປຸ່ມຂ້າງລຸ່ມນີ້ເພື່ອຕິດຕັ້ງຫຼັງຈາກນັ້ນຕິດຕັ້ງໂປແກຼມນີ້ເຂົ້າໃນ browser ຂອງທ່ານ.",clickhere: "ກົດ​ບ່ອນ​ນີ້",}
_language.lt = {download: "parsisiųsti",loading: "Įkeliama",permissions: "Pakeitėte šios programos leidimus. Kad programinė įranga veiktų tinkamai, turite spustelėti žemiau esantį mygtuką, kad pašalintumėte, tada iš naujo įdiekite šią programą savo naršyklėje.",clickhere: "Paspauskite čia",}
_language.lv = {download: "Lejupielādēt",loading: "Notiek ielāde",permissions: "Jūs esat mainījis šīs lietotnes atļaujas. Lai programmatūra darbotos pareizi, jums ir jānoklikšķina uz tālāk redzamās pogas, lai atinstalētu, pēc tam atkārtoti instalējiet šo lietojumprogrammu savā pārlūkprogrammā.",clickhere: "Noklikšķiniet šeit",}
_language.mg = {download: "Download",loading: "Loading",permissions: "Nanova ny fahazoan-dàlan'ity fampiharana ity ianao. Raha te hiasa tsara ilay rindrambaiko dia mila tsindrio ny bokotra etsy ambany hanesorana azy ary avereno apetrakao ao anaty tranokalaninao ity rindranasa ity.",clickhere: "kitiho eto",}
_language.mi = {download: "Tangohia",loading: "Kei te utaina",permissions: "Kua hurihia e koe nga mana o tenei taupānga. Kia pai ai te mahi a te raupaparorohiko, me paatoe koe ki te paatene i raro ake nei ki te tango ka tango ano i tenei tono ki to kaitirotiro.",clickhere: "Patohia a konei",}
_language.mk = {download: "Преземи",loading: "Се вчитува",permissions: "Ги сменивте дозволите за оваа апликација. За софтверот да работи правилно, треба да кликнете на копчето подолу за да ја деинсталирате, а потоа повторно да ја инсталирате оваа апликација во вашиот прелистувач.",clickhere: "Кликни тука",}
_language.ml = {download: "ഡൗൺലോഡ്",loading: "ലോഡിംഗ്",permissions: "ഈ അപ്ലിക്കേഷന്റെ അനുമതികൾ നിങ്ങൾ മാറ്റി. സോഫ്റ്റ്വെയർ‌ ശരിയായി പ്രവർ‌ത്തിക്കുന്നതിന്, അൺ‌ഇൻ‌സ്റ്റാൾ‌ ചെയ്യുന്നതിന് ചുവടെയുള്ള ബട്ടണിൽ‌ ക്ലിക്കുചെയ്‌ത് നിങ്ങളുടെ ബ്ര .സറിലേക്ക് ഈ അപ്ലിക്കേഷൻ‌ വീണ്ടും ഇൻ‌സ്റ്റാൾ‌ ചെയ്യുക.",clickhere: "ഇവിടെ ക്ലിക്ക് ചെയ്യുക",}
_language.mn = {download: "Татаж авах",loading: "Ачаалж байна",permissions: "Та энэ аппын зөвшөөрлийг өөрчилсөн. Програмыг зөв ажиллуулахын тулд та доорх товчийг дарж энэ програмыг устгаад дараа нь хөтөчдөө дахин суулгана уу.",clickhere: "Энд дар",}
_language.mr = {download: "डाउनलोड करा",loading: "लोड करीत आहे",permissions: "आपण या अ‍ॅपच्या परवानग्या बदलल्या आहेत. सॉफ्टवेअर योग्य प्रकारे कार्य करण्यासाठी आपल्याला आपल्या ब्राउझरमध्ये हा अनुप्रयोग पुन्हा स्थापित करण्यासाठी विस्थापित करण्यासाठी खालील बटणावर क्लिक करणे आवश्यक आहे.",clickhere: "इथे क्लिक करा",}
_language.ms = {download: "Muat turun",loading: "Memuatkan",permissions: "Anda telah menukar kebenaran aplikasi ini. Agar perisian berfungsi dengan baik, anda perlu mengklik butang di bawah untuk menyahpasang kemudian memasang semula aplikasi ini ke penyemak imbas anda.",clickhere: "Tekan di sini",}
_language.mt = {download: "Niżżel",loading: "Tagħbija",permissions: "Biddilt il-permessi ta 'din l-app. Biex is-softwer jaħdem sewwa, trid tikklikkja fuq il-buttuna hawn taħt biex tiddiżinstalla imbagħad erġa 'installa din l-applikazzjoni fil-browser tiegħek.",clickhere: "Għafas hawn",}
_language.my = {download: "ဒေါင်းလုပ်",loading: "တင်နေသည်",permissions: "သင်သည်ဤအက်ပလီကေးရှင်း၏ခွင့်ပြုချက်များကိုပြောင်းလဲပြီးဖြစ်သည်။ ဆော့ (ဖ်) ဝဲစနစ်အရကောင်းကောင်းအလုပ်လုပ်ဖို့အတွက်၊ ဒီပရိုဂရမ်ကိုသင်၏ဘရောက်ဇာတွင်ပြန်လည်ထည့်သွင်းရန်ဖယ်ထုတ်ရန်အောက်ဖော်ပြပါခလုတ်ကိုနှိပ်ပါ။",clickhere: "ဤနေရာကိုကလစ်နှိပ်ပါ",}
_language.ne = {download: "डाउनलोड गर्नुहोस्",loading: "लोड हुँदै",permissions: "तपाईंले यस अनुप्रयोगको अनुमतिहरू परिवर्तन गर्नुभयो। सफ्टवेयरले राम्रोसँग काम गर्नका लागि, तपाईंले तलको बटनमा क्लिक गर्नुपर्दछ अनइन्स्टल गर्न यस अनुप्रयोगलाई तपाईंको ब्राउजरमा पुन: स्थापना गर्नुहोस्।",clickhere: "यहाँ क्लिक गर्नुहोस्",}
_language.nl = {download: "Downloaden",loading: "Bezig met laden",permissions: "Je hebt de rechten van deze app gewijzigd. Om de software correct te laten werken, moet u op de onderstaande knop klikken om deze applicatie te verwijderen en vervolgens opnieuw in uw browser te installeren.",clickhere: "Klik hier",}
_language.no = {download: "nedlasting",loading: "Laster inn",permissions: "Du har endret tillatelsene til denne appen. For at programvaren skal fungere skikkelig, må du klikke på knappen nedenfor for å avinstallere og deretter installere dette programmet på nytt i nettleseren din.",clickhere: "Klikk her",}
_language.ny = {download: "Tsitsani",loading: "Kutsegula",permissions: "Mwasintha zilolezo za pulogalamuyi. Kuti pulogalamuyi igwire bwino ntchito, muyenera kudina batani pansipa kuti muchotsere ndikubwezeretsanso pulogalamuyi mu msakatuli wanu.",clickhere: "Dinani apa",}
_language.pa = {download: "ਡਾ .ਨਲੋਡ",loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ",permissions: "ਤੁਸੀਂ ਇਸ ਐਪ ਦੀ ਅਨੁਮਤੀ ਬਦਲ ਦਿੱਤੀ ਹੈ. ਸਾੱਫਟਵੇਅਰ ਦੇ ਸਹੀ workੰਗ ਨਾਲ ਕੰਮ ਕਰਨ ਲਈ, ਤੁਹਾਨੂੰ ਆਪਣੇ ਬ੍ਰਾ intoਜ਼ਰ ਵਿਚ ਇਸ ਐਪਲੀਕੇਸ਼ਨ ਨੂੰ ਦੁਬਾਰਾ ਸਥਾਪਿਤ ਕਰਨ ਲਈ ਹੇਠਾਂ ਦਿੱਤੇ ਬਟਨ ਤੇ ਕਲਿਕ ਕਰਨ ਦੀ ਜ਼ਰੂਰਤ ਹੈ.",clickhere: "ਇੱਥੇ ਕਲਿੱਕ ਕਰੋ",}
_language.pl = {download: "Pobieranie",loading: "Ładowanie",permissions: "Zmieniłeś uprawnienia tej aplikacji. Aby oprogramowanie działało poprawnie, musisz kliknąć przycisk poniżej, aby odinstalować, a następnie ponownie zainstalować tę aplikację w przeglądarce.",clickhere: "Kliknij tutaj",}
_language.ps = {download: "ډاونلوډ",loading: "بارول",permissions: "تاسو د دې کاریال اجازه لیکونه بدل کړي. د سافټویر په سمه توګه کار کولو لپاره ، تاسو اړتیا لرئ په لاندې ت buttonۍ کلیک وکړئ ترڅو نصب یې کړئ بیا دا غوښتنلیک په خپل براوزر کې بیا ځای په ځای کړئ.",clickhere: "دلته زور ورکړی",}
_language.pt = {download: "Baixar",loading: "Carregando",permissions: "Você alterou as permissões deste aplicativo. Para que o software funcione corretamente, você precisa clicar no botão abaixo para desinstalar e reinstalar este aplicativo em seu navegador.",clickhere: "Clique aqui",}
_language.ro = {download: "Descarca",loading: "Se încarcă",permissions: "Ați modificat permisiunile acestei aplicații. Pentru ca software-ul să funcționeze corect, trebuie să faceți clic pe butonul de mai jos pentru a dezinstala, apoi reinstalați această aplicație în browser.",clickhere: "Click aici",}
_language.ru = {download: "Скачать",loading: "Загрузка",permissions: "Вы изменили разрешения этого приложения. Для правильной работы программного обеспечения вам необходимо нажать кнопку ниже, чтобы удалить, а затем переустановить это приложение в своем браузере.",clickhere: "кликните сюда",}
_language.sd = {download: "ڊائون لوڊ ڪريو",loading: "لوڊ ڪري رهيو آهي",permissions: "توھان ھن ائپ جي اجازتن کي تبديل ڪري ڇڏيو آھي. صحيح طريقي سان ڪم ڪرڻ جي لاءِ ، توهان کي انسٽال ڪرڻ جي لاءِ هيٺ ڏنل بٽڻ تي ڪلڪ ڪرڻ گهرجي پوءِ اها ايپليڪيشن توهان جي برائوزر ۾ وري انسٽال ڪريو.",clickhere: "هتي ڪلڪ ڪريو",}
_language.si = {download: "බාගත",loading: "පූරණය වෙමින් පවතී",permissions: "ඔබ මෙම යෙදුමේ අවසරයන් වෙනස් කර ඇත. මෘදුකාංගය නිසියාකාරව ක්‍රියාත්මක වීමට නම්, අස්ථාපනය කිරීමට පහත බොත්තම ක්ලික් කර මෙම යෙදුම ඔබගේ බ්‍රව්සරයට නැවත ස්ථාපනය කරන්න.",clickhere: "මෙහි ක්ලික් කරන්න",}
_language.sk = {download: "Stiahnuť ▼",loading: "Načítava",permissions: "Zmenili ste povolenia tejto aplikácie. Aby softvér správne fungoval, musíte ho odinštalovať kliknutím na tlačidlo nižšie a potom znova nainštalovať túto aplikáciu do svojho prehliadača.",clickhere: "Kliknite tu",}
_language.sl = {download: "Prenesi",loading: "nalaganje",permissions: "Spremenili ste dovoljenja za to aplikacijo. Da bo programska oprema delovala pravilno, morate klikniti spodnji gumb za odstranitev in nato znova namestiti to aplikacijo v brskalnik.",clickhere: "Klikni tukaj",}
_language.sm = {download: "Lalotoso",loading: "Utaina",permissions: "Ua e suia faʻatagaina o lenei polokalama. Mo le polokalama e galue lelei, oe manaʻomia le kiliki i le faamau i lalo e aveese ona toe faapipii lea o lenei talosaga i lau browser.",clickhere: "Kiliki ii",}
_language.sn = {download: "Download",loading: "Loading",permissions: "Washandura mvumo yeapp iyi. Kuti software ishande nemazvo, unofanirwa kudzvanya pane bhatani pazasi kuti uninstall wobva waisazve ichi chishandiso mubrowser yako.",clickhere: "Dzvanya apa",}
_language.so = {download: "Soo Degso",loading: "Raadinta",permissions: "Waad bedeshay rukhsadaha abkan. Si softwareku uu si sax ah ugu shaqeeyo, waxaad u baahan tahay inaad gujiso batoonka hoose si aad u tirtirto ka dibna dib ugu cusbooneysii codsigan biraawsarkaaga.",clickhere: "Halkan guji",}
_language.sq = {download: "Shkarko",loading: "Po ngarkohet",permissions: "Ju keni ndryshuar lejet e këtij aplikacioni. Që softveri të funksionojë si duhet, duhet të klikoni në butonin më poshtë për të çinstaluar, pastaj instaluar përsëri këtë aplikacion në shfletuesin tuaj.",clickhere: "Kliko këtu",}
_language.sr = {download: "Преузимање",loading: "Лоадинг",permissions: "Променили сте дозволе за ову апликацију. Да би софтвер исправно функционисао, потребно је да кликнете на доње дугме да бисте га деинсталирали, а затим поново инсталирали ову апликацију у прегледач.",clickhere: "Кликните овде",}
_language.st = {download: "Khoasolla",loading: "Loading",permissions: "O fetotse tumello ea sesebelisoa sena. Hore software e sebetse hantle, o lokela ho tobetsa konopo e ka tlase ho tlosa ebe o kenya sesebelisoa sena ho sebatli sa hau.",clickhere: "tlanya mona",}
_language.su = {download: "Unduh",loading: "Ngamuat",permissions: "Anjeun parantos ngarobih idin tina aplikasi ieu. Pikeun parangkat lunak tiasa dianggo leres, anjeun kedah pencét tombol di handap pikeun uninstall teras pasang deui aplikasi ieu kana panyungsi anjeun.",clickhere: "klik di dieu",}
_language.sv = {download: "Ladda ner",loading: "Läser in",permissions: "Du har ändrat behörigheterna för den här appen. För att programvaran ska fungera korrekt måste du klicka på knappen nedan för att avinstallera och sedan installera om det här programmet i din webbläsare.",clickhere: "Klicka här",}
_language.sw = {download: "Pakua",loading: "Inapakia",permissions: "Umebadilisha ruhusa za programu hii. Ili programu ifanye kazi vizuri, unahitaji kubonyeza kitufe hapa chini ili kusanidua kisha usakinishe tena programu tumizi kwenye kivinjari chako.",clickhere: "Bonyeza hapa",}
_language.ta = {download: "பதிவிறக்க Tamil",loading: "ஏற்றுகிறது",permissions: "இந்த பயன்பாட்டின் அனுமதிகளை மாற்றியுள்ளீர்கள். மென்பொருள் சரியாக வேலை செய்ய, நிறுவல் நீக்க கீழே உள்ள பொத்தானைக் கிளிக் செய்து, இந்த பயன்பாட்டை உங்கள் உலாவியில் மீண்டும் நிறுவ வேண்டும்.",clickhere: "இங்கே கிளிக் செய்க",}
_language.te = {download: "డౌన్‌లోడ్",loading: "లోడ్",permissions: "మీరు ఈ అనువర్తనం యొక్క అనుమతులను మార్చారు. సాఫ్ట్‌వేర్ సరిగ్గా పనిచేయడానికి, మీరు అన్‌ఇన్‌స్టాల్ చేయడానికి క్రింది బటన్‌పై క్లిక్ చేసి, ఆపై మీ బ్రౌజర్‌లో ఈ అప్లికేషన్‌ను మళ్లీ ఇన్‌స్టాల్ చేయాలి.",clickhere: "ఇక్కడ నొక్కండి",}
_language.tg = {download: "Боргирӣ",loading: "Боркунӣ",permissions: "Шумо иҷозатномаҳои ин барномаро тағир додед. Барои он, ки нармафзор дуруст кор кунад, шумо бояд кнопкаро зер кунед, то онро тоза кунед ва пас ин барномаро ба браузери худ насб кунед.",clickhere: "ин ҷоро ангушт зан",}
_language.th = {download: "ดาวน์โหลด",loading: "กำลังโหลด",permissions: "คุณได้เปลี่ยนการอนุญาตของแอพนี้ เพื่อให้ซอฟต์แวร์ทำงานได้อย่างถูกต้องคุณต้องคลิกที่ปุ่มด้านล่างเพื่อถอนการติดตั้งจากนั้นติดตั้งแอปพลิเคชันนี้ใหม่ในเบราว์เซอร์ของคุณ",clickhere: "คลิกที่นี่",}
_language.tl = {download: "Mag-download",loading: "Naglo-load",permissions: "Binago mo ang mga pahintulot ng app na ito. Upang gumana nang maayos ang software, kailangan mong mag-click sa pindutan sa ibaba upang i-uninstall pagkatapos muling i-install ang application na ito sa iyong browser.",clickhere: "Pindutin dito",}
_language.tr = {download: "İndir",loading: "Yükleniyor",permissions: "Bu uygulamanın izinlerini değiştirdiniz. Yazılımın düzgün çalışması için, bu uygulamayı kaldırmak ve ardından tarayıcınıza yeniden yüklemek için aşağıdaki düğmeye tıklamanız gerekir.",clickhere: "Buraya Tıkla",}
_language.uk = {download: "Завантажити",loading: "Завантаження",permissions: "Ви змінили дозволи цього додатка. Щоб програмне забезпечення працювало належним чином, вам потрібно натиснути кнопку нижче, щоб видалити, а потім переінсталювати цю програму у свій браузер.",clickhere: "Натисніть тут",}
_language.ur = {download: "ڈاؤن لوڈ کریں",loading: "لوڈ ہو رہا ہے",permissions: "آپ نے اس ایپ کی اجازتیں تبدیل کردی ہیں۔ سوفٹویئر کے صحیح طریقے سے کام کرنے کے ل you ، آپ کو انسٹال کرنے کے لئے نیچے والے بٹن پر کلک کرنے کی ضرورت ہے اور پھر اس ایپلیکیشن کو اپنے براؤزر میں انسٹال کریں۔",clickhere: "یہاں کلک کریں",}
_language.uz = {download: "Yuklash",loading: "Yuklanmoqda",permissions: "Siz ushbu ilovaning ruxsatlarini o'zgartirdingiz. Dastur to'g'ri ishlashi uchun quyidagi dasturni o'chirib tashlashingiz kerak, so'ngra ushbu dasturni brauzeringizga qayta o'rnating.",clickhere: "bu yerni bosing",}
_language.vi = {download: "Tải xuống",loading: "Đang tải",permissions: "Bạn đã thay đổi quyền của ứng dụng này. Để phần mềm hoạt động bình thường, bạn cần nhấp vào nút bên dưới để gỡ cài đặt sau đó cài đặt lại ứng dụng này vào trình duyệt của mình.",clickhere: "Bấm vào đây",}
_language.xh = {download: "Khuphela",loading: "Iyalayisha",permissions: "Utshintshe iimvume zolu setyenziso. Ukuze isoftware isebenze kakuhle, kufuneka ucofe kwiqhosha elingezantsi ukuze ukhiphe kwaye uphinde ufake esi sicelo kwisikhangeli sakho.",clickhere: "Cofa apha",}
_language.yi = {download: "אראפקאפיע",loading: "Loading",permissions: "איר האָט געביטן די פּערמישאַנז פון דעם אַפּ. כּדי די ווייכווארג זאָל אַרבעטן רעכט, איר דאַרפֿן צו גיט אויף די קנעפּל אונטן צו נעם אַוועק די ינסטאַלירונג פון דעם אַפּלאַקיישאַן אין דיין בלעטערער.",clickhere: "דריק דא",}
_language.yo = {download: "Ṣe igbasilẹ",loading: "Ikojọpọ",permissions: "O ti yi awọn igbanilaaye ti ohun elo yii pada. Fun sọfitiwia naa lati ṣiṣẹ daradara, o nilo lati tẹ bọtini ti o wa ni isalẹ lati yọkuro lẹhinna tun fi ohun elo yii sii sinu ẹrọ aṣawakiri rẹ.",clickhere: "Kiliki ibi",}
_language.zh_cn = {download: "下载",loading: "载入中",permissions: "您已更改了此应用的权限。 为了使软件正常工作，您需要单击下面的按钮进行卸载，然后将该应用程序重新安装到浏览器中。",clickhere: "点击这里",}
_language.zh_tw = {download: "下載",loading: "載入中",permissions: "您已更改了此應用的權限。 為了使軟件正常工作，您需要單擊下面的按鈕進行卸載，然後將該應用程序重新安裝到瀏覽器中。",clickhere: "點擊這裡",}
_language.zu = {download: "Landa",loading: "Iyalayisha",permissions: "Ushintshe izimvume zalolu hlelo lokusebenza. Ukuze isoftware isebenze kahle, udinga ukuchofoza kunkinobho engezansi ukuze ukhiphe bese ufaka lolu hlelo lokusebenza kusiphequluli sakho.",clickhere: "Chofoza lapha",}

console.log('content script')
function pbion_xy(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top, left: rect.left, height: el.clientHeight }
}
function pbion_between(e, t, n) {
    return find = e.indexOf(t), -1 == find ? null : (find += t.length, jf = e.indexOf(n, find), e.substr(find, jf - find));
}
function pbion_url_variable(url,variable) {
    if(url==undefined || url=='') return '';
    if(url.indexOf('#') > -1) url = url.split('#')[0];
    var query = url.split('?');
    if(query.length == 1) return '';
    var vars = query[1].split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return '';
}
function pbion_error(language){
    var pbion = document.querySelector('#pbion-notice');
    if(pbion==undefined){
        var c = document.createElement('div');
        c.id = 'pbion-notice';
        var n = document.createElement('p');
        n.innerText = '❓⚠️ '+_language[language].permissions;
        c.appendChild(n);
        var b = document.createElement('a');
        b.innerText = '↻ '+_language[language].clickhere;
        b.href = 'https://'+_config.domain+'/'+language+'/'+_config.slug+'.html?addon='+language;
        c.appendChild(b);
        document.body.appendChild(c);
    }
    else{
        pbion.style.display = 'block';
    }
}
function pbion_button_add(d,p,u,language){
    var quick = (d=='quick')?1:0;
    if(d.error!=undefined) {
        if(d.error==1) {
            if(d.permissions!=undefined) {
                if(d.permissions=='fail') pbion_error(language);
            }
            return;
        }
        else d = '';
    }
    if(p.nodeName=='A') p = p.parentNode;
    var pbion = p.querySelector('.pbion-download');
    var du = 'https://'+_config.domain+'/'+language+'/'+_config.slug+'.html';
    var dl = (d!='')?du+'#data='+JSON.stringify(d):u+'#pbion';
    if(quick==1) dl = du+'#'+u;
    if(pbion==undefined){
        var pbion = document.createElement('div');
        pbion.className = 'pbion-text';
        var x = document.createElement('a');
        x.href = du+'?ref=ncdoc';
        x.target = '_blank';
        x.innerText = '➶ '+_config.domain;
        pbion.appendChild(x);
        var b = document.createElement('div');
        b.className = 'pbion-download pbion-abs';
        var a = document.createElement('a');
        a.href = dl;
        a.target = '_blank';
        var t = document.createElement('div');
        t.innerText = (d!='')?_language[language].download:_language[language].loading+'...';
        if(quick==1) t.innerText = _language[language].download;
        a.appendChild(t);
        b.appendChild(a);
        p.style.position = 'relative';
        p.appendChild(b);
    }
    else{
        pbion.querySelector('a').href = dl;
        if(d!='') pbion.querySelector('div').innerText = _language[language].download;
    }
    if(d!='') {
        var notice = document.querySelector('#pbion-notice');
        if(notice!=undefined) notice.style.display = 'none';
        pbion.setAttribute('data-pbion','ok');
    }
    else pbion.setAttribute('data-pbion','yet');
}
function pbion_bg_id(v,p,u){
    pbion_button_add('',p,u,_config.default_locale);
    setTimeout(function(){
        chrome.runtime.sendMessage({action: "getDataID",id: v},function(response){
            _config.default_locale = response.language;
            if(response.data=='') pbion_bg_id(v,p,u);
            else{
                if(response.data.error!=undefined){
                    //if(response.data.error==0) pbion_bg_id(v,p,u);
                }
                pbion_button_add(response.data,p,u,response.language);
            }
        });
    },1000);
}
function pbion_button_get(p,u){
    var pbion_parent = (p.nodeName=='A')?p.parentNode:p;
    var pbion = pbion_parent.querySelector('.pbion-download');

    if(pbion==undefined){
        var b = document.createElement('div');
        b.className = 'pbion-download pbion-abs';
        b.setAttribute('data-url',u);
        b.addEventListener('click',function(e){
            chrome.runtime.sendMessage({action: "get_page",url:this.getAttribute('data-url')},function(response){});
        });
        var c = document.createElement('div');
        var t = document.createElement('div');
        t.className = 'pbion-download-text';
        t.innerText = _language[_config.default_locale].download;
        c.appendChild(t);
        b.appendChild(c);
        p.style.position = 'relative';
        p.appendChild(b);
    }
    else{
        pbion.setAttribute('data-url',u);
        pbion.querySelector('.pbion-download-text').innerText = _language[_config.default_locale].download;
    }
}
function pbion_button_logo(show){
    var check = document.getElementById('pbion-logo');
    if(check==null){
        var b = document.createElement('div');
        b.id = 'pbion-logo';
        b.style.display = 'none';
        var logo = document.createElement('img');
        logo.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PGxpbmVhckdyYWRpZW50IGlkPSI2VmlGNE9hSnFoRm9PWTlWbWhZeFVhIiB4MT0iNi43MDIiIHgyPSIzOS4wODUiIHkxPSI2LjcwMiIgeTI9IjM5LjA4NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzIxYWQ2NCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA4ODI0MiIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCM2VmlGNE9hSnFoRm9PWTlWbWhZeFVhKSIgZD0iTTQwLDQySDhjLTEuMTA1LDAtMi0wLjg5NS0yLTJWOGMwLTEuMTA1LDAuODk1LTIsMi0yaDMyYzEuMTA1LDAsMiwwLjg5NSwyLDJ2MzIJQzQyLDQxLjEwNSw0MS4xMDUsNDIsNDAsNDJ6Ii8+PGNpcmNsZSBjeD0iMjQiIGN5PSI2LjEzOCIgcj0iNC44MjkiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjQuMDAxLDM4LjUyYy0wLjY2OCwwLTEuMjk2LTAuMjYtMS43NjgtMC43MzJsLTYuNzAxLTYuNzAxYy0wLjUxOS0wLjUxOS0wLjY3My0xLjI5Mi0wLjM5Mi0xLjk3CUMxNS40MiwyOC40MzgsMTYuMDc2LDI4LDE2LjgxLDI4SDIwVjE3YzAtMS4xMDMsMC44OTctMiwyLTJoNGMxLjEwMywwLDIsMC44OTcsMiwydjExaDMuMTljMC43MzQsMCwxLjM5LDAuNDM4LDEuNjcxLDEuMTE2CWMwLjI4MSwwLjY3OCwwLjEyNywxLjQ1MS0wLjM5MiwxLjk3bC02LjcwMSw2LjcwMUMyNS4yOTcsMzguMjU5LDI0LjY2OSwzOC41MiwyNC4wMDEsMzguNTJ6IiBvcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNMjQuMDAxLDM4LjAyYy0wLjUzNSwwLTEuMDM3LTAuMjA4LTEuNDE1LTAuNTg2bC02LjcwMS02LjcwMWMtMC4zNzUtMC4zNzUtMC40ODctMC45MzUtMC4yODQtMS40MjUJYzAuMjAzLTAuNDksMC42NzgtMC44MDcsMS4yMDgtMC44MDdoMy42OVYxN2MwLTAuODI3LDAuNjczLTEuNSwxLjUtMS41aDRjMC44MjcsMCwxLjUsMC42NzMsMS41LDEuNXYxMS41aDMuNjkJYzAuNTMxLDAsMS4wMDYsMC4zMTcsMS4yMDksMC44MDhjMC4yMDMsMC40OSwwLjA5MiwxLjA1LTAuMjgzLDEuNDI1bC02LjcwMSw2LjcwMUMyNS4wMzgsMzcuODEyLDI0LjUzNSwzOC4wMiwyNC4wMDEsMzguMDJ6IiBvcGFjaXR5PSIuMDciLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzEuMTksMjlIMjdWMTdjMC0wLjU1Mi0wLjQ0OC0xLTEtMWgtNGMtMC41NTIsMC0xLDAuNDQ4LTEsMXYxMmgtNC4xOQljLTAuNzIsMC0xLjA4LDAuODctMC41NzEsMS4zNzlsNi43MDEsNi43MDFjMC41ODYsMC41ODYsMS41MzYsMC41ODYsMi4xMjEsMGw2LjcwMS02LjcwMUMzMi4yNzEsMjkuODcsMzEuOTEsMjksMzEuMTksMjl6Ii8+PC9zdmc+';
        logo.style.width = '48px';
        logo.style.height = '48px';
        logo.style.display = 'inline-block';
        logo.title = _config.name;
        b.appendChild(logo);
        b.addEventListener('click',function(){
            pbion_run(2);
            var r = pbion_urls(document.URL);
            if(r.type!=''){
                chrome.runtime.sendMessage({action: "get_page",url:document.URL},function(response){});
            }
        });
        document.body.appendChild(b);
    }
    else{
        if(show==1) check.style.display = 'inline-block';
        else check.style.display = 'none';
    }
}
function pbion_run(callbg){
    if(callbg==1){
        chrome.runtime.sendMessage({action: "config"},function(response){
            if(response.data.autorun!=undefined){
                if(response.data.autorun=='on'){
                    parse_content(1);
                    pbion_button_logo(0);
                }
                else pbion_button_logo(1);
            }
        });
    }
    else if(callbg==2){
        parse_content(1);
    }
    else{
        return parse_content(0);
    }
}
function pbion_urls(input) {
    var test_url = new URL(input);
			    var params = test_url.searchParams;
    var uri = input.split('#')[0].split('?')[0].split('/');
    var b = 0;
    var r = {
        type:0,
        element: null
    };
    for (var k in _config.input_urls) {
        b = 0;
        var e = _config.input_urls[k];
        var a = e.uri;
        for (var i = 0; i < a.length; i++) {
            b = 0;
            if(a[i]!=''){
                if(uri[i]==undefined) uri[i] = '';
                if(typeof a[i]=='string'){
                    if(a[i].indexOf('|') > -1){
                        b = 0;
                        var x = a[i].split('|');
                        for (var j = 0; j < x.length; j++) {
                            if(x[j]==uri[i]) {
                                b = 1;
                            }
                        }
                        if(b==0) break;
                    }
                    else {
                        if(a[i].indexOf('%') > -1){
                            var kw = a[i].replace(/\%/g,'');
                            if(a[i][0]=='%'&&a[i].slice(-1)=='%'){
                                if(uri[i].indexOf(kw) > -1) b = 1;
                                else {
                                    b = 0;
                                    break;
                                }
                            }
                            else if(a[i][0]=='%'){
                                if(uri[i].indexOf(kw) == uri[i].length - 1 - kw.length) b = 1;
                                else {
                                    b = 0;
                                    break;
                                }
                            }
                            else{
                                if(uri[i].indexOf(kw) == 0) b = 1;
                                else {
                                    b = 0;
                                    break;
                                }
                            }
                        }
                        else{
                            if(uri[i]==a[i]) {
                                b = 1;
                            }
                            else {
                                b = 0;
                                break;
                            }
                        }
                    }
                }
                else{
                    if(a[i].type=='int+'){
                        if(parseInt(uri[i]) > 0) {
                            b = 1;
                        }
                        else {
                            b = 0;
                            break;
                        }
                    }
                    else {
                        b = 0;
                        break;
                    }
                }
            }
        }
        if(e.queries!=undefined){
            var a = e.queries;
            for (var i = 0; i < a.length; i++) {
                b = 0;
                if(a[i]!=''){
                    if(a[i].indexOf('|') > -1){
                        b = 0;
                        var x = a[i].split('|');
                        for (var j = 0; j < x.length; j++) {
                            if(params.get(x[j])!=null) {
                                b = 1;
                            }
                        }
                        if(b==0) break;
                    }
                    else {
                        if(params.get(a[i])!=null) {
                            b = 1;
                        }
                        else {
                            b = 0;
                            break;
                        }
                    }
                }
            }
        }
        if(b==1){
            r = {
                type: e.type,
                selector: e.selector,
            }
            break;
        }
    }
    return r;
}
function parse_content(callbg){
    chrome.runtime.sendMessage({action: "language"},function(response){
        _config.default_locale = response.language;
    });
    var action = (callbg==1)?'bgloader':'loader';
    var elements = document.querySelectorAll(_config.selector);
    var r = pbion_urls(document.URL);
    if(r.type > 0){
        var p = document.querySelector(r.selector);
        if(p!=null){
            if(callbg==1) pbion_button_get(p,document.URL);
            else chrome.runtime.sendMessage({action: action,id:null,url:document.URL});
        }
    }
    if (elements.length > 0) {
        var pl = 0;
        if(elements.length==0){
            return {
                status: 'player_undefined'
            };
        }
        for (var i = 0; i < elements.length; i++) {
            var x = pbion_xy(elements[i]);
            if(((x.top + x.height) > (x.height/4) || x.top > (x.height/4)) && x.top < window.innerHeight - (x.height/4)){
                //if(x.height < 10) continue;
                var p = elements[i];

                if(p.nodeName=='A') {
                    p = p.parentNode;
                }
                var a = p.querySelectorAll('a');
                pl = 1;
                for (var j = 0; j < a.length; j++) {
                    var u = a[j].href;
                    u = u.split('"')[0];
                    if(u.indexOf(_config.slug) > -1) continue;
                    if(u.indexOf('#pbion') > -1) continue;
                    if(u.indexOf('#data') > -1) continue;
                    var v = '';
                    var r = pbion_urls(u);
                    if(r.type!=''){
                        pbion_button_get(p,u);
                        break;
                    }
                }
            }
        }
        if(pl==1){
            return {
                status: 'loader_processing'
            };
        }
        else{
            return {
                status: 'player_undefined'
            };
        }
    }
    return {
        status: 'player_undefined'
    };
}
(function() {
    chrome.runtime.sendMessage({action: "language"},function(response){
        _config.default_locale = response.language;
    });
})();(function() {
    if(document.URL.indexOf('#pbion') > 0){
        var u = document.URL.split('?')[0].split('#')[0];
        chrome.runtime.sendMessage({action: "bgloader",url: u,broadcasts:0,popup:0,newtab:1,pbion:0});
    }
    setInterval(function(){
        pbion_run(1);
    },2000);
    var check = document.getElementById('pbion_extension');
    if(check==null){
        var pbion = document.createElement('div');
        pbion.id = 'pbion_extension';
        document.body.appendChild(pbion);
    }
    pbion_button_logo(0);
})();
