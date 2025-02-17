// MARK: - Desktop Groups
const gmailDesktopGroups_DisableSocialFocus = {
  type: "checkbox",
  name: {
    ar: "تعطيل التركيز الاجتماعي على Gmail",
    ca: "Desactiveu SocialFocus a Gmail",
    "zh-CN": "在 Gmail 上禁用 SocialFocus",
    "zh-TW": "在 Gmail 上停用 SocialFocus",
    hr: "Onemogućite SocialFocus na Gmailu",
    cs: "Zakázat SocialFocus na Gmailu",
    da: "Deaktiver SocialFocus på Gmail",
    nl: "Schakel SocialFocus uit in Gmail",
    en: "Disable SocialFocus on Gmail",
    fi: "Poista SocialFocus käytöstä Gmailissa",
    fr: "Désactiver SocialFocus sur Gmail",
    de: "Deaktivieren Sie SocialFocus in Gmail",
    el: "Απενεργοποιήστε το SocialFocus στο Gmail",
    he: "השבת את SocialFocus ב-Gmail",
    hi: "जीमेल पर सोशलफोकस अक्षम करें",
    hu: "A SocialFocus letiltása a Gmailben",
    id: "Nonaktifkan Fokus Sosial di Gmail",
    it: "Disattiva SocialFocus su Gmail",
    ja: "Gmail で SocialFocus を無効にする",
    ko: "Gmail에서 SocialFocus 비활성화",
    ms: "Lumpuhkan SocialFocus pada Gmail",
    no: "Deaktiver SocialFocus på Gmail",
    pl: "Wyłącz SocialFocus w Gmailu",
    pt: "Desative o SocialFocus no Gmail",
    ro: "Dezactivați SocialFocus pe Gmail",
    ru: "Отключить SocialFocus в Gmail",
    sk: "Zakázať SocialFocus v Gmaile",
    es: "Deshabilitar SocialFocus en Gmail",
    sv: "Inaktivera SocialFocus på Gmail",
    th: "ปิดการใช้งาน SocialFocus บน Gmail",
    tr: "Gmail'de SocialFocus'u devre dışı bırakın",
    uk: "Вимкніть SocialFocus у Gmail",
    vi: "Tắt SocialFocus trên Gmail",
  },
  id: "socialFocus_gmail_master_toggle",
  defaultValue: false,
};

const gmailDesktopGroups_Essentials = [
  {
    type: "checkbox",
    name: {
      ar: "حظر جيميل",
      ca: "Bloqueja Gmail",
      "zh-CN": "阻止 Gmail",
      "zh-TW": "阻止 Gmail",
      hr: "Blokirajte Gmail",
      cs: "Blokovat Gmail",
      da: "Bloker Gmail",
      nl: "Gmail blokkeren",
      en: "Block Gmail",
      fi: "Estä Gmail",
      fr: "Bloquer Gmail",
      de: "Gmail blockieren",
      el: "Αποκλεισμός του Gmail",
      he: "חסום את Gmail",
      hi: "जीमेल को ब्लॉक करें",
      hu: "Gmail blokkolása",
      id: "Blokir Gmail",
      it: "Blocca Gmail",
      ja: "Gmail をブロックする",
      ko: "Gmail 차단",
      ms: "Sekat Gmail",
      no: "Blokker Gmail",
      pl: "Zablokuj Gmaila",
      pt: "Bloquear Gmail",
      ro: "Blocați Gmail",
      ru: "Блокировать Gmail",
      sk: "Blokovať Gmail",
      es: "Bloquear Gmail",
      sv: "Blockera Gmail",
      th: "บล็อก Gmail",
      tr: "Gmail'i engelle",
      uk: "Заблокувати Gmail",
      vi: "Chặn Gmail",
    },
    id: "socialFocus_gmail_block_gmail",
    defaultValue: false,
  },
  {
    type: "checkbox",
    name: {
      ar: "الوضع الرمادي",
      ca: "Mode gris",
      "zh-CN": "灰度模式",
      "zh-TW": "灰階模式",
      hr: "Sivi način rada",
      cs: "Šedý režim",
      da: "Grå tilstand",
      nl: "Grijze modus",
      en: "Gray Mode",
      fi: "Harmaa tila",
      fr: "Mode gris",
      de: "Graumodus",
      el: "Γκρι λειτουργία",
      he: "מצב אפור",
      hi: "ग्रे मोड",
      hu: "Szürke mód",
      id: "Modus Abu-abu",
      it: "Modalità grigia",
      ja: "グレーモード",
      ko: "그레이 모드",
      ms: "Mod Kelabu",
      no: "Grå modus",
      pl: "Tryb szary",
      pt: "Modo cinza",
      ro: "Modul gri",
      ru: "Серый режим",
      sk: "Šedý režim",
      es: "Modo gris",
      sv: "Grått läge",
      th: "โหมดสีเทา",
      tr: "Gri Mod",
      uk: "Сірий режим",
      vi: "Chế độ màu xám",
    },
    id: "socialFocus_gmail_gray_mode",
    defaultValue: false,
  },
];

const gmailDesktopGroups_TimeLimit = [
  {
    type: "select",
    name: {
      ar: "الحد اليومي",
      ca: "Límit diari",
      "zh-CN": "每日限额",
      "zh-TW": "每日限額",
      hr: "Dnevni limit",
      cs: "Denní limit",
      da: "Daglig grænse",
      nl: "Dagelijkse limiet",
      en: "Daily Limit",
      fi: "Päivittäinen raja",
      fr: "Limite quotidienne",
      de: "Tageslimit",
      el: "Ημερήσιο Όριο",
      he: "מגבלה יומית",
      hi: "दैनिक सीमा",
      hu: "Napi limit",
      id: "Batas Harian",
      it: "Limite giornaliero",
      ja: "1日あたりの制限",
      ko: "일일 한도",
      ms: "Had Harian",
      no: "Daglig grense",
      pl: "Limit dzienny",
      pt: "Limite Diário",
      ro: "Limită zilnică",
      ru: "Дневной лимит",
      sk: "Denný limit",
      es: "Límite diario",
      sv: "Daglig gräns",
      th: "ขีดจำกัดรายวัน",
      tr: "Günlük Limit",
      uk: "Денний ліміт",
      vi: "Giới hạn hàng ngày",
    },
    id: "socialFocus_daily_limit",
    defaultValue: "noLimit",
    selects: [
      {
        name: {
          ar: "بلا حدود",
          ca: "Sense límits",
          "zh-CN": "没有限制",
          "zh-TW": "沒有限制",
          hr: "Bez ograničenja",
          cs: "Bez omezení",
          da: "Ingen grænser",
          nl: "Geen grenzen",
          en: "No Limits",
          fi: "Ei rajoja",
          fr: "Aucune limite",
          de: "Keine Grenzen",
          el: "Χωρίς όρια",
          he: "ללא גבולות",
          hi: "असीम",
          hu: "Nincs határ",
          id: "Tanpa Batas",
          it: "Nessun limite",
          ja: "制限なし",
          ko: "한계 없음",
          ms: "Tiada Had",
          no: "Ingen grenser",
          pl: "Bez ograniczeń",
          pt: "Sem Limites",
          ro: "Fără limite",
          ru: "Без ограничений",
          sk: "Žiadne limity",
          es: "Sin límites",
          sv: "Inga gränser",
          th: "ไม่มีขีดจำกัด",
          tr: "Sınır Yok",
          uk: "Без обмежень",
          vi: "Không có giới hạn",
        },
        id: "noLimit",
      },
    ],
  },
  {
    type: "checkbox",
    name: {
      ar: "عرض الموقت على الموقع",
      ca: "Mostra el temporitzador al lloc",
      "zh-CN": "现场显示计时器",
      "zh-TW": "現場顯示計時器",
      hr: "Prikaz mjerača vremena na licu mjesta",
      cs: "Zobrazit časovač na místě",
      da: "Vis timer på stedet",
      nl: "Timer op locatie weergeven",
      en: "Display Timer On Site",
      fi: "Näytä ajastin paikan päällä",
      fr: "Afficher la minuterie sur site",
      de: "Timer vor Ort anzeigen",
      el: "Εμφάνιση χρονοδιακόπτη στον ιστότοπο",
      he: "הצגת טיימר באתר",
      hi: "साइट पर टाइमर प्रदर्शित करें",
      hu: "Időzítő megjelenítése a helyszínen",
      id: "Tampilkan Timer Di Situs",
      it: "Visualizza il timer sul sito",
      ja: "オンサイトでタイマーを表示",
      ko: "사이트에 타이머 표시",
      ms: "Paparkan Pemasa Di Tapak",
      no: "Vis timer på stedet",
      pl: "Wyświetl timer na miejscu",
      pt: "Exibir temporizador no local",
      ro: "Afișează cronometrul la fața locului",
      ru: "Отображение таймера на месте",
      sk: "Zobraziť časovač na mieste",
      es: "Mostrar temporizador en el sitio",
      sv: "Visa timer på plats",
      th: "แสดงตัวจับเวลาบนเว็บไซต์",
      tr: "Zamanlayıcıyı Sitede Görüntüle",
      uk: "Відображення таймера на сайті",
      vi: "Hiển thị bộ đếm thời gian trên trang web",
    },
    id: "socialFocus_gmail_daily_limit_show_timer_draggable",
    defaultValue: false,
  },
];

const gmailDesktopGroups_RighBar = [
  {
    type: "checkbox",
    name: {
      ar: "إخفاء زر 'التقويم'",
      ca: "Amaga el botó 'Calendari'",
      "zh-CN": "隐藏“日历”按钮",
      "zh-TW": "隱藏“日曆”按鈕",
      hr: "Sakrij gumb 'Kalendar'",
      cs: "Skrýt tlačítko 'Kalendář'",
      da: "Skjul knappen 'Kalender'",
      nl: "Knop 'Kalender' verbergen",
      en: "Hide 'Calendar' Button",
      fi: "Piilota 'Kalenteri'-painike",
      fr: "Masquer le bouton « Calendrier »",
      de: "Schaltfläche „Kalender“ ausblenden",
      el: "Απόκρυψη κουμπιού 'Ημερολόγιο'",
      he: "הסתר כפתור 'לוח שנה'",
      hi: "'कैलेंडर' बटन छुपाएं",
      hu: "A „Naptár” gomb elrejtése",
      id: "Sembunyikan Tombol 'Kalender'",
      it: "Nascondi il pulsante 'Calendario'",
      ja: "「カレンダー」ボタンを非表示にする",
      ko: "'캘린더' 버튼 숨기기",
      ms: "Sembunyikan Butang 'Kalendar'",
      no: "Skjul 'Kalender'-knappen",
      pl: "Ukryj przycisk „Kalendarz”",
      pt: "Ocultar botão 'Calendário'",
      ro: "Ascundeți butonul „Calendar”",
      ru: "Скрыть кнопку «Календарь»",
      sk: "Skryť tlačidlo „Kalendár“",
      es: "Ocultar el botón 'Calendario'",
      sv: "Dölj 'Kalender'-knappen",
      th: "ซ่อนปุ่ม 'ปฏิทิน'",
      tr: "'Takvim' Düğmesini Gizle",
      uk: "Сховати кнопку «Календар»",
      vi: "Ẩn nút 'Lịch'",
    },
    id: "socialFocus_gmail_hide_calendar_button",
    defaultValue: false,
  },
  {
    type: "checkbox",
    name: {
      ar: "إخفاء زر 'الاحتفاظ'",
      ca: "Amaga el botó 'Mantenir'",
      "zh-CN": "隐藏“保留”按钮",
      "zh-TW": "隱藏“保留”按鈕",
      hr: "Sakrij gumb 'Zadrži'",
      cs: "Skrýt tlačítko „Keep“",
      da: "Skjul knappen 'Behold'",
      nl: "Knop 'Behouden' verbergen",
      en: "Hide 'Keep' Button",
      fi: "Piilota 'Pidä'-painike",
      fr: "Masquer le bouton « Conserver »",
      de: "Schaltfläche „Behalten“ ausblenden",
      el: "Απόκρυψη κουμπιού 'Keep'",
      he: "הסתר את כפתור 'שמור'",
      hi: "'रखें' बटन छिपाएँ",
      hu: "A „Keep” gomb elrejtése",
      id: "Sembunyikan Tombol 'Simpan'",
      it: "Nascondi il pulsante 'Conserva'",
      ja: "「キープ」ボタンを非表示にする",
      ko: "'유지' 버튼 숨기기",
      ms: "Sembunyikan Butang 'Simpan'",
      no: "Skjul 'Keep'-knappen",
      pl: "Ukryj przycisk „Zachowaj”",
      pt: "Ocultar o botão 'Manter'",
      ro: "Ascundeți butonul „Păstrați”",
      ru: "Скрыть кнопку «Сохранить»",
      sk: "Skryť tlačidlo „Ponechať“",
      es: "Ocultar el botón 'Mantener'",
      sv: "Dölj 'Behåll'-knappen",
      th: "ซ่อนปุ่ม 'เก็บ'",
      tr: "'Tut' Düğmesini Gizle",
      uk: "Приховати кнопку «Зберегти»",
      vi: "Ẩn nút 'Giữ'",
    },
    id: "socialFocus_gmail_hide_keep_button",
    defaultValue: false,
  },
  {
    type: "checkbox",
    name: {
      ar: "إخفاء زر 'المهام'",
      ca: "Amaga el botó 'Tasques'",
      "zh-CN": "隐藏“任务”按钮",
      "zh-TW": "隱藏「任務」按鈕",
      hr: "Sakrij gumb 'Zadaci'",
      cs: "Skrýt tlačítko 'Úkoly'",
      da: "Skjul knappen 'Opgaver'",
      nl: "Knop 'Taken' verbergen",
      en: "Hide 'Tasks' Button",
      fi: "Piilota 'Tehtävät' -painike",
      fr: "Masquer le bouton « Tâches »",
      de: "Schaltfläche „Aufgaben“ ausblenden",
      el: "Απόκρυψη κουμπιού 'Εργασίες'",
      he: "הסתר את לחצן 'משימות'",
      hi: "'कार्य' बटन छिपाएँ",
      hu: "A „Feladatok” gomb elrejtése",
      id: "Sembunyikan Tombol 'Tugas'",
      it: "Nascondi il pulsante 'Attività'",
      ja: "「タスク」ボタンを非表示にする",
      ko: "'작업' 버튼 숨기기",
      ms: "Sembunyikan Butang 'Tugas'",
      no: "Skjul 'Oppgaver'-knappen",
      pl: "Ukryj przycisk „Zadania”",
      pt: "Ocultar botão 'Tarefas'",
      ro: "Ascundeți butonul „Sarcini”",
      ru: "Скрыть кнопку «Задачи»",
      sk: "Skryť tlačidlo „Úlohy“",
      es: "Ocultar el botón 'Tareas'",
      sv: "Dölj 'Uppgifter'-knappen",
      th: "ซ่อนปุ่ม 'งาน'",
      tr: "'Görevler' Düğmesini Gizle",
      uk: "Сховати кнопку «Завдання»",
      vi: "Ẩn nút 'Nhiệm vụ'",
    },
    id: "socialFocus_gmail_hide_tasks_button",
    defaultValue: false,
  },
  {
    type: "checkbox",
    name: {
      ar: "إخفاء زر 'جهات الاتصال'",
      ca: "Amaga el botó 'Contactes'",
      "zh-CN": "隐藏“联系人”按钮",
      "zh-TW": "隱藏「聯絡人」按鈕",
      hr: "Sakrij gumb 'Kontakti'",
      cs: "Skrýt tlačítko 'Kontakty'",
      da: "Skjul knappen 'Kontakter'",
      nl: "Knop 'Contacten' verbergen",
      en: "Hide 'Contacts' Button",
      fi: "Piilota 'Yhteystiedot'-painike",
      fr: "Masquer le bouton « Contacts »",
      de: "Schaltfläche „Kontakte“ ausblenden",
      el: "Απόκρυψη κουμπιού 'Επαφές'",
      he: "הסתר כפתור 'אנשי קשר'",
      hi: "'संपर्क' बटन छिपाएँ",
      hu: "A „Kapcsolatok” gomb elrejtése",
      id: "Sembunyikan Tombol 'Kontak'",
      it: "Nascondi il pulsante 'Contatti'",
      ja: "「連絡先」ボタンを非表示にする",
      ko: "'연락처' 버튼 숨기기",
      ms: "Sembunyikan Butang 'Kenalan'",
      no: "Skjul 'Kontakter'-knappen",
      pl: "Ukryj przycisk „Kontakty”",
      pt: "Ocultar botão 'Contatos'",
      ro: "Ascundeți butonul „Contacte”",
      ru: "Скрыть кнопку «Контакты»",
      sk: "Skryť tlačidlo 'Kontakty'",
      es: "Ocultar el botón 'Contactos'",
      sv: "Dölj 'Kontakter'-knappen",
      th: "ซ่อนปุ่ม 'ผู้ติดต่อ'",
      tr: "'Kişiler' Düğmesini Gizle",
      uk: "Приховати кнопку «Контакти»",
      vi: "Ẩn nút 'Danh bạ'",
    },
    id: "socialFocus_gmail_hide_contacts_button",
    defaultValue: false,
  },
  {
    type: "checkbox",
    name: {
      ar: "إخفاء زر 'الحصول على الوظائف الإضافية'",
      ca: "Amaga el botó 'Obtén complements'",
      "zh-CN": "隐藏“获取附加组件”按钮",
      "zh-TW": "隱藏「取得附加元件」按鈕",
      hr: "Sakrij gumb 'Dohvati dodatke'",
      cs: "Skrýt tlačítko „Získat doplňky“",
      da: "Skjul knappen 'Hent tilføjelser'",
      nl: "Verberg de knop 'Add-ons ophalen'",
      en: "Hide 'Get Add-ons' Button",
      fi: "Piilota 'Hae lisäosia' -painike",
      fr: "Masquer le bouton « Obtenir des modules complémentaires »",
      de: "Schaltfläche „Add-ons herunterladen“ ausblenden",
      el: "Απόκρυψη του κουμπιού 'Λήψη πρόσθετων'",
      he: "הסתר את כפתור 'קבל תוספות'",
      hi: "'ऐड-ऑन प्राप्त करें' बटन छिपाएँ",
      hu: "A „Kiegészítők beszerzése” gomb elrejtése",
      id: "Sembunyikan Tombol 'Dapatkan Pengaya'",
      it: "Nascondi il pulsante 'Ottieni componenti aggiuntivi'",
      ja: "「アドオンを取得」ボタンを非表示にする",
      ko: "'추가 기능 받기' 버튼 숨기기",
      ms: "Sembunyikan Butang 'Dapatkan Alat Tambah'",
      no: "Skjul 'Få tillegg'-knappen",
      pl: "Ukryj przycisk „Pobierz dodatki”",
      pt: "Ocultar o botão 'Obter complementos'",
      ro: "Ascundeți butonul „Obțineți suplimente”",
      ru: "Скрыть кнопку «Получить дополнения»",
      sk: "Skryť tlačidlo „Získať doplnky“",
      es: "Ocultar el botón 'Obtener complementos'",
      sv: "Dölj knappen 'Hämta tillägg'",
      th: "ซ่อนปุ่ม 'รับส่วนเสริม'",
      tr: "'Eklentileri Al' Düğmesini Gizle",
      uk: "Сховати кнопку «Отримати доповнення»",
      vi: "Ẩn nút 'Nhận tiện ích bổ sung'",
    },
    id: "socialFocus_gmail_hide_get_addons_button",
    defaultValue: false,
  },
];

const gmailDesktopGroups_Other = [
  {
    type: "checkbox",
    name: {
      ar: "إخفاء الإعلان",
      ca: "Amaga l'anunci",
      "zh-CN": "隐藏广告",
      "zh-TW": "隱藏廣告",
      hr: "Sakrij oglas",
      cs: "Skrýt inzerát",
      da: "Skjul annonce",
      nl: "Advertentie verbergen",
      en: "Hide Advertisement",
      fi: "Piilota mainos",
      fr: "Masquer la publicité",
      de: "Werbung ausblenden",
      el: "Απόκρυψη διαφήμισης",
      he: "הסתר פרסומת",
      hi: "विज्ञापन छिपाएँ",
      hu: "Reklám elrejtése",
      id: "Sembunyikan Iklan",
      it: "Nascondi pubblicità",
      ja: "広告を隠す",
      ko: "광고 숨기기",
      ms: "Sembunyikan Iklan",
      no: "Skjul annonse",
      pl: "Ukryj reklamę",
      pt: "Ocultar anúncio",
      ro: "Ascunde reclamă",
      ru: "Скрыть рекламу",
      sk: "Skryť inzerát",
      es: "Ocultar anuncio",
      sv: "Dölj annons",
      th: "ซ่อนโฆษณา",
      tr: "Reklamı Gizle",
      uk: "Приховати рекламу",
      vi: "Ẩn quảng cáo",
    },
    id: "socialFocus_gmail_hide_ads",
    defaultValue: false,
  },
];

// MARK: - Desktop Builder

const gmailDesktopGroups = [
  {
    groupName: {
      ar: "",
      ca: "",
      "zh-CN": "",
      "zh-TW": "",
      hr: "",
      cs: "",
      da: "",
      nl: "",
      en: "",
      fi: "",
      fr: "",
      de: "",
      el: "",
      he: "",
      hi: "",
      hu: "",
      id: "",
      it: "",
      ja: "",
      ko: "",
      ms: "",
      no: "",
      pl: "",
      pt: "",
      ro: "",
      ru: "",
      sk: "",
      es: "",
      sv: "",
      th: "",
      tr: "",
      uk: "",
      vi: "",
    },
    groupId: "disableSocialFocus",
    parentCategoryId: "gmail",
    options: [gmailDesktopGroups_DisableSocialFocus],
  },
  {
    groupName: {
      ar: "أساسيات",
      ca: "Essencials",
      "zh-CN": "必需品",
      "zh-TW": "必需品",
      hr: "Osnove",
      cs: "Essentials",
      da: "Essentialer",
      nl: "Essentiële zaken",
      en: "Essentials",
      fi: "Essentials",
      fr: "Essentiel",
      de: "Wesentliches",
      el: "Βασικά",
      he: "יסודות",
      hi: "अनिवार्य",
      hu: "Essentials",
      id: "Penting",
      it: "Elementi essenziali",
      ja: "必需品",
      ko: "골자",
      ms: "Perkara-perkara penting",
      no: "Essensielle",
      pl: "Elementy zasadnicze",
      pt: "Fundamentos",
      ro: "Esențiale",
      ru: "Основы",
      sk: "Essentials",
      es: "Esenciales",
      sv: "Essentials",
      th: "สิ่งจำเป็น",
      tr: "Temeller",
      uk: "Основи",
      vi: "Yếu tố cần thiết",
    },
    groupId: "essentials",
    parentCategoryId: "gmail",
    options: gmailDesktopGroups_Essentials,
  },
  {
    groupName: {
      ar: "الحد الزمني",
      ca: "Límit de temps",
      "zh-CN": "时限",
      "zh-TW": "時限",
      hr: "Vremensko ograničenje",
      cs: "Časový limit",
      da: "Tidsgrænse",
      nl: "Tijdslimiet",
      en: "Time Limit",
      fi: "Määräaika",
      fr: "Limite de temps",
      de: "Zeitlimit",
      el: "Προθεσμία",
      he: "מגבלת זמן",
      hi: "समय सीमा",
      hu: "Időkorlát",
      id: "Batas waktu",
      it: "Limite di tempo",
      ja: "期限",
      ko: "시간 제한",
      ms: "Had Masa",
      no: "Tidsbegrensning",
      pl: "Limit czasu",
      pt: "Limite de tempo",
      ro: "Limită de timp",
      ru: "Лимит времени",
      sk: "Časový limit",
      es: "Límite de tiempo",
      sv: "Tidsgräns",
      th: "จำกัดเวลา",
      tr: "Zaman Sınırı",
      uk: "Обмеження часу",
      vi: "Giới hạn thời gian",
    },
    groupId: "timeLimit",
    parentCategoryId: "gmail",
    options: gmailDesktopGroups_TimeLimit,
  },
  {
    groupName: {
      ar: "الشريط الأيمن",
      ca: "Barra dreta",
      "zh-CN": "右栏",
      "zh-TW": "右欄",
      hr: "Desna traka",
      cs: "Pravá lišta",
      da: "Højre bjælke",
      nl: "Rechter balk",
      en: "Right Bar",
      fi: "Oikea baari",
      fr: "Barre de droite",
      de: "Rechte Leiste",
      el: "Δεξιά Μπάρα",
      he: "בר ימין",
      hi: "सही बार",
      hu: "Jobb bár",
      id: "Bilah Kanan",
      it: "Barra destra",
      ja: "右バー",
      ko: "오른쪽 막대",
      ms: "Bar Kanan",
      no: "Høyre stolpe",
      pl: "Prawy pasek",
      pt: "Barra Direita",
      ro: "Bara din dreapta",
      ru: "Правая панель",
      sk: "Pravá lišta",
      es: "Barra derecha",
      sv: "Höger bar",
      th: "แถบขวา",
      tr: "Sağ Çubuk",
      uk: "Права панель",
      vi: "Thanh bên phải",
    },
    groupId: "rightBar",
    parentCategoryId: "gmail",
    options: gmailDesktopGroups_RighBar,
  },
  {
    groupName: {
      ar: "آحرون",
      ca: "Altres",
      "zh-CN": "其他的",
      "zh-TW": "其他的",
      hr: "Drugi",
      cs: "Ostatní",
      da: "Andre",
      nl: "Anderen",
      en: "Others",
      fi: "Muut",
      fr: "Autres",
      de: "Andere",
      el: "Οι υπολοιποι",
      he: "אחרים",
      hi: "अन्य",
      hu: "Mások",
      id: "Yang lain",
      it: "Altri",
      ja: "その他",
      ko: "기타",
      ms: "Lain-lain",
      no: "Andre",
      pl: "Inni",
      pt: "Outros",
      ro: "Alții",
      ru: "Другие",
      sk: "Iní",
      es: "Otros",
      sv: "Andra",
      th: "คนอื่น",
      tr: "Diğerleri",
      uk: "Інші",
      vi: "Người khác",
    },
    groupId: "other",
    parentCategoryId: "gmail",
    options: gmailDesktopGroups_Other,
  },
];

// MARK: - Mobile Groups
const gmailMobileGroups_DisableSocialFocus = {
  type: "checkbox",
  name: {
    ar: "تعطيل التركيز الاجتماعي على Gmail",
    ca: "Desactiveu SocialFocus a Gmail",
    "zh-CN": "在 Gmail 上禁用 SocialFocus",
    "zh-TW": "在 Gmail 上停用 SocialFocus",
    hr: "Onemogućite SocialFocus na Gmailu",
    cs: "Zakázat SocialFocus na Gmailu",
    da: "Deaktiver SocialFocus på Gmail",
    nl: "Schakel SocialFocus uit in Gmail",
    en: "Disable SocialFocus on Gmail",
    fi: "Poista SocialFocus käytöstä Gmailissa",
    fr: "Désactiver SocialFocus sur Gmail",
    de: "Deaktivieren Sie SocialFocus in Gmail",
    el: "Απενεργοποιήστε το SocialFocus στο Gmail",
    he: "השבת את SocialFocus ב-Gmail",
    hi: "जीमेल पर सोशलफोकस अक्षम करें",
    hu: "A SocialFocus letiltása a Gmailben",
    id: "Nonaktifkan Fokus Sosial di Gmail",
    it: "Disattiva SocialFocus su Gmail",
    ja: "Gmail で SocialFocus を無効にする",
    ko: "Gmail에서 SocialFocus 비활성화",
    ms: "Lumpuhkan SocialFocus pada Gmail",
    no: "Deaktiver SocialFocus på Gmail",
    pl: "Wyłącz SocialFocus w Gmailu",
    pt: "Desative o SocialFocus no Gmail",
    ro: "Dezactivați SocialFocus pe Gmail",
    ru: "Отключить SocialFocus в Gmail",
    sk: "Zakázať SocialFocus v Gmaile",
    es: "Deshabilitar SocialFocus en Gmail",
    sv: "Inaktivera SocialFocus på Gmail",
    th: "ปิดการใช้งาน SocialFocus บน Gmail",
    tr: "Gmail'de SocialFocus'u devre dışı bırakın",
    uk: "Вимкніть SocialFocus у Gmail",
    vi: "Tắt SocialFocus trên Gmail",
  },
  id: "socialFocus_gmail_master_toggle",
  defaultValue: false,
};

const gmailMobileGroups_Essentials = [
  {
    type: "checkbox",
    name: {
      ar: "حظر جيميل",
      ca: "Bloqueja Gmail",
      "zh-CN": "阻止 Gmail",
      "zh-TW": "阻止 Gmail",
      hr: "Blokirajte Gmail",
      cs: "Blokovat Gmail",
      da: "Bloker Gmail",
      nl: "Gmail blokkeren",
      en: "Block Gmail",
      fi: "Estä Gmail",
      fr: "Bloquer Gmail",
      de: "Gmail blockieren",
      el: "Αποκλεισμός του Gmail",
      he: "חסום את Gmail",
      hi: "जीमेल को ब्लॉक करें",
      hu: "Gmail blokkolása",
      id: "Blokir Gmail",
      it: "Blocca Gmail",
      ja: "Gmail をブロックする",
      ko: "Gmail 차단",
      ms: "Sekat Gmail",
      no: "Blokker Gmail",
      pl: "Zablokuj Gmaila",
      pt: "Bloquear Gmail",
      ro: "Blocați Gmail",
      ru: "Блокировать Gmail",
      sk: "Blokovať Gmail",
      es: "Bloquear Gmail",
      sv: "Blockera Gmail",
      th: "บล็อก Gmail",
      tr: "Gmail'i engelle",
      uk: "Заблокувати Gmail",
      vi: "Chặn Gmail",
    },
    id: "socialFocus_gmail_block_gmail",
    defaultValue: false,
  },
  {
    type: "checkbox",
    name: {
      ar: "الوضع الرمادي",
      ca: "Mode gris",
      "zh-CN": "灰度模式",
      "zh-TW": "灰階模式",
      hr: "Sivi način rada",
      cs: "Šedý režim",
      da: "Grå tilstand",
      nl: "Grijze modus",
      en: "Gray Mode",
      fi: "Harmaa tila",
      fr: "Mode gris",
      de: "Graumodus",
      el: "Γκρι λειτουργία",
      he: "מצב אפור",
      hi: "ग्रे मोड",
      hu: "Szürke mód",
      id: "Modus Abu-abu",
      it: "Modalità grigia",
      ja: "グレーモード",
      ko: "그레이 모드",
      ms: "Mod Kelabu",
      no: "Grå modus",
      pl: "Tryb szary",
      pt: "Modo cinza",
      ro: "Modul gri",
      ru: "Серый режим",
      sk: "Šedý režim",
      es: "Modo gris",
      sv: "Grått läge",
      th: "โหมดสีเทา",
      tr: "Gri Mod",
      uk: "Сірий режим",
      vi: "Chế độ màu xám",
    },
    id: "socialFocus_gmail_gray_mode",
    defaultValue: false,
  },
];

const gmailMobileGroups_TimeLimit = [
  {
    type: "select",
    name: {
      ar: "الحد اليومي",
      ca: "Límit diari",
      "zh-CN": "每日限额",
      "zh-TW": "每日限額",
      hr: "Dnevni limit",
      cs: "Denní limit",
      da: "Daglig grænse",
      nl: "Dagelijkse limiet",
      en: "Daily Limit",
      fi: "Päivittäinen raja",
      fr: "Limite quotidienne",
      de: "Tageslimit",
      el: "Ημερήσιο Όριο",
      he: "מגבלה יומית",
      hi: "दैनिक सीमा",
      hu: "Napi limit",
      id: "Batas Harian",
      it: "Limite giornaliero",
      ja: "1日あたりの制限",
      ko: "일일 한도",
      ms: "Had Harian",
      no: "Daglig grense",
      pl: "Limit dzienny",
      pt: "Limite Diário",
      ro: "Limită zilnică",
      ru: "Дневной лимит",
      sk: "Denný limit",
      es: "Límite diario",
      sv: "Daglig gräns",
      th: "ขีดจำกัดรายวัน",
      tr: "Günlük Limit",
      uk: "Денний ліміт",
      vi: "Giới hạn hàng ngày",
    },
    id: "socialFocus_daily_limit",
    defaultValue: "noLimit",
    selects: [
      {
        name: {
          ar: "بلا حدود",
          ca: "Sense límits",
          "zh-CN": "没有限制",
          "zh-TW": "沒有限制",
          hr: "Bez ograničenja",
          cs: "Bez omezení",
          da: "Ingen grænser",
          nl: "Geen grenzen",
          en: "No Limits",
          fi: "Ei rajoja",
          fr: "Aucune limite",
          de: "Keine Grenzen",
          el: "Χωρίς όρια",
          he: "ללא גבולות",
          hi: "असीम",
          hu: "Nincs határ",
          id: "Tanpa Batas",
          it: "Nessun limite",
          ja: "制限なし",
          ko: "한계 없음",
          ms: "Tiada Had",
          no: "Ingen grenser",
          pl: "Bez ograniczeń",
          pt: "Sem Limites",
          ro: "Fără limite",
          ru: "Без ограничений",
          sk: "Žiadne limity",
          es: "Sin límites",
          sv: "Inga gränser",
          th: "ไม่มีขีดจำกัด",
          tr: "Sınır Yok",
          uk: "Без обмежень",
          vi: "Không có giới hạn",
        },
        id: "noLimit",
      },
    ],
  },
  {
    type: "checkbox",
    name: {
      ar: "عرض الموقت على الموقع",
      ca: "Mostra el temporitzador al lloc",
      "zh-CN": "现场显示计时器",
      "zh-TW": "現場顯示計時器",
      hr: "Prikaz mjerača vremena na licu mjesta",
      cs: "Zobrazit časovač na místě",
      da: "Vis timer på stedet",
      nl: "Timer op locatie weergeven",
      en: "Display Timer On Site",
      fi: "Näytä ajastin paikan päällä",
      fr: "Afficher la minuterie sur site",
      de: "Timer vor Ort anzeigen",
      el: "Εμφάνιση χρονοδιακόπτη στον ιστότοπο",
      he: "הצגת טיימר באתר",
      hi: "साइट पर टाइमर प्रदर्शित करें",
      hu: "Időzítő megjelenítése a helyszínen",
      id: "Tampilkan Timer Di Situs",
      it: "Visualizza il timer sul sito",
      ja: "オンサイトでタイマーを表示",
      ko: "사이트에 타이머 표시",
      ms: "Paparkan Pemasa Di Tapak",
      no: "Vis timer på stedet",
      pl: "Wyświetl timer na miejscu",
      pt: "Exibir temporizador no local",
      ro: "Afișează cronometrul la fața locului",
      ru: "Отображение таймера на месте",
      sk: "Zobraziť časovač na mieste",
      es: "Mostrar temporizador en el sitio",
      sv: "Visa timer på plats",
      th: "แสดงตัวจับเวลาบนเว็บไซต์",
      tr: "Zamanlayıcıyı Sitede Görüntüle",
      uk: "Відображення таймера на сайті",
      vi: "Hiển thị bộ đếm thời gian trên trang web",
    },
    id: "socialFocus_gmail_daily_limit_show_timer",
    defaultValue: false,
  },
];

const gmailMobileGroups_Other = [
  {
    type: "checkbox",
    name: {
      ar: "إخفاء الإعلان",
      ca: "Amaga l'anunci",
      "zh-CN": "隐藏广告",
      "zh-TW": "隱藏廣告",
      hr: "Sakrij oglas",
      cs: "Skrýt inzerát",
      da: "Skjul annonce",
      nl: "Advertentie verbergen",
      en: "Hide Advertisement",
      fi: "Piilota mainos",
      fr: "Masquer la publicité",
      de: "Werbung ausblenden",
      el: "Απόκρυψη διαφήμισης",
      he: "הסתר פרסומת",
      hi: "विज्ञापन छिपाएँ",
      hu: "Reklám elrejtése",
      id: "Sembunyikan Iklan",
      it: "Nascondi pubblicità",
      ja: "広告を隠す",
      ko: "광고 숨기기",
      ms: "Sembunyikan Iklan",
      no: "Skjul annonse",
      pl: "Ukryj reklamę",
      pt: "Ocultar anúncio",
      ro: "Ascunde reclamă",
      ru: "Скрыть рекламу",
      sk: "Skryť inzerát",
      es: "Ocultar anuncio",
      sv: "Dölj annons",
      th: "ซ่อนโฆษณา",
      tr: "Reklamı Gizle",
      uk: "Приховати рекламу",
      vi: "Ẩn quảng cáo",
    },
    id: "socialFocus_gmail_hide_ads",
    defaultValue: false,
  },
  {
    type: "checkbox",
    name: {
      ar: "إخفاء فتح في شعار التطبيق",
      ca: "Amaga el bàner obert a l'aplicació",
      "zh-CN": "隐藏在应用程序中打开的横幅",
      "zh-TW": "隱藏在應用程式中開啟的橫幅",
      hr: "Sakrij natpis Otvori u aplikaciji",
      cs: "Skrýt Otevřít v banneru aplikace",
      da: "Skjul åben i app-banner",
      nl: "Open in app-banner verbergen",
      en: "Hide Open In App Banner",
      fi: "Piilota Avaa sovelluksessa -banneri",
      fr: "Masquer la bannière Ouvrir dans l'application",
      de: "Offenes In-App-Banner ausblenden",
      el: "Απόκρυψη Banner Open In App",
      he: "הסתר באנר של פתח באפליקציה",
      hi: "ऐप बैनर में खुला छिपाएँ",
      hu: "A Megnyitás az alkalmazásban szalaghirdetés elrejtése",
      id: "Sembunyikan Spanduk Buka Di Aplikasi",
      it: "Nascondi banner Apri nell'app",
      ja: "「アプリ内で開く」バナーを非表示にする",
      ko: "앱에서 열려 있는 배너 숨기기",
      ms: "Sembunyikan Sepanduk Buka Dalam Apl",
      no: "Skjul Åpne i app-banner",
      pl: "Ukryj baner Otwórz w aplikacji",
      pt: "Ocultar banner aberto no aplicativo",
      ro: "Ascunde bannerul Open In App",
      ru: "Скрыть открытие в баннере приложения",
      sk: "Skryť nápis Otvoriť v aplikácii",
      es: "Ocultar banner Abrir en aplicación",
      sv: "Dölj öppna i app-banner",
      th: "ซ่อนเปิดในแบนเนอร์แอป",
      tr: "Uygulamada Aç Banner'ını Gizle",
      uk: "Приховати банер «Відкрити в програмі»",
      vi: "Ẩn biểu ngữ mở trong ứng dụng",
    },
    id: "socialFocus_gmail_hide_open_in_app_banner",
    defaultValue: false,
  },
];

// MARK: - Mobile Builder

const gmailMobileGroups = [
  {
    groupName: {
      ar: "",
      ca: "",
      "zh-CN": "",
      "zh-TW": "",
      hr: "",
      cs: "",
      da: "",
      nl: "",
      en: "",
      fi: "",
      fr: "",
      de: "",
      el: "",
      he: "",
      hi: "",
      hu: "",
      id: "",
      it: "",
      ja: "",
      ko: "",
      ms: "",
      no: "",
      pl: "",
      pt: "",
      ro: "",
      ru: "",
      sk: "",
      es: "",
      sv: "",
      th: "",
      tr: "",
      uk: "",
      vi: "",
    },
    groupId: "disableSocialFocus",
    parentCategoryId: "gmail",
    options: [gmailMobileGroups_DisableSocialFocus],
  },
  {
    groupName: {
      ar: "أساسيات",
      ca: "Essencials",
      "zh-CN": "必需品",
      "zh-TW": "必需品",
      hr: "Osnove",
      cs: "Essentials",
      da: "Essentialer",
      nl: "Essentiële zaken",
      en: "Essentials",
      fi: "Essentials",
      fr: "Essentiel",
      de: "Wesentliches",
      el: "Βασικά",
      he: "יסודות",
      hi: "अनिवार्य",
      hu: "Essentials",
      id: "Penting",
      it: "Elementi essenziali",
      ja: "必需品",
      ko: "골자",
      ms: "Perkara-perkara penting",
      no: "Essensielle",
      pl: "Elementy zasadnicze",
      pt: "Fundamentos",
      ro: "Esențiale",
      ru: "Основы",
      sk: "Essentials",
      es: "Esenciales",
      sv: "Essentials",
      th: "สิ่งจำเป็น",
      tr: "Temeller",
      uk: "Основи",
      vi: "Yếu tố cần thiết",
    },
    groupId: "essentials",
    parentCategoryId: "gmail",
    options: gmailMobileGroups_Essentials,
  },
  {
    groupName: {
      ar: "الحد الزمني",
      ca: "Límit de temps",
      "zh-CN": "时限",
      "zh-TW": "時限",
      hr: "Vremensko ograničenje",
      cs: "Časový limit",
      da: "Tidsgrænse",
      nl: "Tijdslimiet",
      en: "Time Limit",
      fi: "Määräaika",
      fr: "Limite de temps",
      de: "Zeitlimit",
      el: "Προθεσμία",
      he: "מגבלת זמן",
      hi: "समय सीमा",
      hu: "Időkorlát",
      id: "Batas waktu",
      it: "Limite di tempo",
      ja: "期限",
      ko: "시간 제한",
      ms: "Had Masa",
      no: "Tidsbegrensning",
      pl: "Limit czasu",
      pt: "Limite de tempo",
      ro: "Limită de timp",
      ru: "Лимит времени",
      sk: "Časový limit",
      es: "Límite de tiempo",
      sv: "Tidsgräns",
      th: "จำกัดเวลา",
      tr: "Zaman Sınırı",
      uk: "Обмеження часу",
      vi: "Giới hạn thời gian",
    },
    groupId: "timeLimit",
    parentCategoryId: "gmail",
    options: gmailMobileGroups_TimeLimit,
  },
  {
    groupName: {
      ar: "آحرون",
      ca: "Altres",
      "zh-CN": "其他的",
      "zh-TW": "其他的",
      hr: "Drugi",
      cs: "Ostatní",
      da: "Andre",
      nl: "Anderen",
      en: "Others",
      fi: "Muut",
      fr: "Autres",
      de: "Andere",
      el: "Οι υπολοιποι",
      he: "אחרים",
      hi: "अन्य",
      hu: "Mások",
      id: "Yang lain",
      it: "Altri",
      ja: "その他",
      ko: "기타",
      ms: "Lain-lain",
      no: "Andre",
      pl: "Inni",
      pt: "Outros",
      ro: "Alții",
      ru: "Другие",
      sk: "Iní",
      es: "Otros",
      sv: "Andra",
      th: "คนอื่น",
      tr: "Diğerleri",
      uk: "Інші",
      vi: "Người khác",
    },
    groupId: "other",
    parentCategoryId: "gmail",
    options: gmailMobileGroups_Other,
  },
];
