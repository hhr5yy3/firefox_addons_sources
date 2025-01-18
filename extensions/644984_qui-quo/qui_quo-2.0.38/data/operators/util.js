/*** Browser specific API ***/
window.addonMessageCallbacks = [];
window.initParams = null;
window.browserApiLiteral = typeof safari === "undefined" ? "web-extensions" : "safari";
window.SERVER_DOMAINS = ["qui-quo.ru", "qui-quo.com", "qui-quo.online", "podborka-turov.online"];
window.DEFAULT_DOMAIN = SERVER_DOMAINS[0];
window.AGENCY_DOMAIN = DEFAULT_DOMAIN;
window.airCodes = {};
if (typeof browser !== 'undefined') {
    window.chrome = browser;
}

async function saveDefaultDomain() {
    try {
        const {domain} = await getStorageDataAsync(['domain']);
        if ( !domain ) {
            await setStorageDataAsync({domain: window.DEFAULT_DOMAIN})
        } else {
            window.AGENCY_DOMAIN = domain;
        }
    } catch (e) {
        return null
    }
}

saveDefaultDomain();

window.PAID_STASTUSES = {
    unknown: 'Unknown',
    paid: 'PaidInFull',
    outstanding: 'Outstanding',
    overpaid: 'Overpaid'
}
window.AVIA_BOOKING_CLASS_CODES = {
    Y: "Economy",
    J: "Business",
    C: "First",
    W: "Economy with additional comfort",
    D: "Premium Economy",
    R: "Expert (only for some airlines)"
};

window.COUNTRY_LIST_RU = [
    "Австралия",
    "Австрия",
    "Азербайджан",
    "Аландские о-ва",
    "Албания",
    "Алжир",
    "Американское Самоа",
    "Ангилья",
    "Ангола",
    "Андорра",
    "Антарктида",
    "Антигуа и Барбуда",
    "Аргентина",
    "Армения",
    "Аруба",
    "Афганистан",
    "Багамы",
    "Бангладеш",
    "Барбадос",
    "Бахрейн",
    "Беларусь",
    "Белиз",
    "Бельгия",
    "Бенин",
    "Бермудские о-ва",
    "Болгария",
    "Боливия",
    "Бонэйр",
    "Синт-Эстатиус и Саба",
    "Босния и Герцеговина",
    "Ботсвана",
    "Бразилия",
    "Британская территория в Индийском океане",
    "Бруней-Даруссалам",
    "Буркина-Фасо",
    "Бурунди",
    "Бутан",
    "Вануату",
    "Ватикан",
    "Великобритания",
    "Венгрия",
    "Венесуэла",
    "Виргинские о-ва",
    "Виргинские о-ва",
    "Внешние малые о-ва",
    "Восточный Тимор",
    "Вьетнам",
    "Габон",
    "Гаити",
    "Гайана",
    "Гамбия",
    "Гана",
    "Гваделупа",
    "Гватемала",
    "Гвинея",
    "Гвинея-Бисау",
    "Германия",
    "Гернси",
    "Гибралтар",
    "Гондурас",
    "Гонконг",
    "Гренада",
    "Гренландия",
    "Греция",
    "Грузия",
    "Гуам",
    "Дания",
    "Джерси",
    "Джибути",
    "Доминика",
    "Доминиканская Республика",
    "Египет",
    "Замбия",
    "Западная Сахара",
    "Зимбабве",
    "Израиль",
    "Индия",
    "Индонезия",
    "Иордания",
    "Ирак",
    "Иран",
    "Ирландия",
    "Исландия",
    "Испания",
    "Италия",
    "Йемен",
    "Кабо-Верде",
    "Казахстан",
    "Камбоджа",
    "Камерун",
    "Канада",
    "Катар",
    "Кения",
    "Кипр",
    "Киргизия",
    "Кирибати",
    "Китай",
    "КНДР",
    "Кокосовые о-ва",
    "Колумбия",
    "Коморы",
    "Конго - Браззавиль",
    "Конго - Киншаса",
    "Коста-Рика",
    "Кот-д’Ивуар",
    "Куба",
    "Кувейт",
    "Кюрасао",
    "Лаос",
    "Латвия",
    "Лесото",
    "Либерия",
    "Ливан",
    "Ливия",
    "Литва",
    "Лихтенштейн",
    "Люксембург",
    "Маврикий",
    "Мавритания",
    "Мадагаскар",
    "Майотта",
    "Макао",
    "Малави",
    "Малайзия",
    "Мали",
    "Мальдивы",
    "Мальта",
    "Марокко",
    "Мартиника",
    "Маршалловы Острова",
    "Мексика",
    "Мозамбик",
    "Молдова",
    "Монако",
    "Монголия",
    "Монтсеррат",
    "Мьянма",
    "Намибия",
    "Науру",
    "Непал",
    "Нигер",
    "Нигерия",
    "Нидерланды",
    "Никарагуа",
    "Ниуэ",
    "Новая Зеландия",
    "Новая Каледония",
    "Норвегия",
    "о-в Буве",
    "о-в Мэн",
    "о-в Норфолк",
    "о-в Рождества",
    "о-в Св. Елены",
    "о-ва Питкэрн",
    "о-ва Тёркс и Кайкос",
    "о-ва Херд и Макдональд",
    "ОАЭ",
    "Оман",
    "Острова Кайман",
    "Острова Кука",
    "Пакистан",
    "Палау",
    "Палестинские территории",
    "Панама",
    "Папуа — Новая Гвинея",
    "Парагвай",
    "Перу",
    "Польша",
    "Португалия",
    "Пуэрто-Рико",
    "Республика Корея",
    "Реюньон",
    "Россия",
    "Руанда",
    "Румыния",
    "Сальвадор",
    "Самоа",
    "Сан-Марино",
    "Сан-Томе и Принсипи",
    "Саудовская Аравия",
    "Северная Македония",
    "Северные Марианские о-ва",
    "Сейшельские Острова",
    "Сен-Бартелеми",
    "Сен-Мартен",
    "Сен-Пьер и Микелон",
    "Сенегал",
    "Сент-Винсент и Гренадины",
    "Сент-Китс и Невис",
    "Сент-Люсия",
    "Сербия",
    "Сингапур",
    "Синт-Мартен",
    "Сирия",
    "Словакия",
    "Словения",
    "Соединенные Штаты",
    "Соломоновы Острова",
    "Сомали",
    "Судан",
    "Суринам",
    "Сьерра-Леоне",
    "Таджикистан",
    "Таиланд",
    "Тайвань",
    "Танзания",
    "Того",
    "Токелау",
    "Тонга",
    "Тринидад и Тобаго",
    "Тувалу",
    "Тунис",
    "Туркменистан",
    "Турция",
    "Уганда",
    "Узбекистан",
    "Украина",
    "Уоллис и Футуна",
    "Уругвай",
    "Фарерские о-ва",
    "Федеративные Штаты Микронезии",
    "Фиджи",
    "Филиппины",
    "Финляндия",
    "Фолклендские о-ва",
    "Франция",
    "Французская Гвиана",
    "Французская Полинезия",
    "Французские Южные территории",
    "Хорватия",
    "Центрально-Африканская Республика",
    "Чад",
    "Черногория",
    "Чехия",
    "Чили",
    "Швейцария",
    "Швеция",
    "Шпицберген и Ян-Майен",
    "Шри-Ланка",
    "Эквадор",
    "Экваториальная Гвинея",
    "Эритрея",
    "Эсватини",
    "Эстония",
    "Эфиопия",
    "Южная Георгия и Южные Сандвичевы о-ва",
    "Южно-Африканская Республика",
    "Южный Судан",
    "Ямайка",
    "Япония",
];
window.COUNTRY_LIST_UA = [
    "Австралія", "Австрія", "Азербайджан", "Албанія", "Алжир", "Ангола", "Андорра", "Антигуа і Барбуда", "Аргентина", "Афганістан", "Багамські Острови", "Бангладеш", "Барбадос", "Бахрейн", "Беліз", "Бельгія", "Бенін", "Білорусь", "Болгарія", "Болівія", "Боснія і Герцеговина", "Ботсвана", "Бразилія", "Бруней", "Буркіна-Фасо", "Бурунді", "Бутан", "Вануату", "Ватикан", "Велика Британія", "Венесуела", "В'єтнам", "Вірменія", "Габон", "Гаїті", "Гамбія", "Гана", "Гаяна", "Гватемала", "Гвінея", "Гвінея-Бісау", "Гондурас", "Гренада", "Греція", "Грузія", "Данія", "Джибуті", "Домініка", "Домініканська Республіка", "Еквадор", "Екваторіальна Гвінея", "Еритрея", "Естонія", "Есватіні", "Ефіопія", "Єгипет", "Ємен", "Замбія", "Зімбабве", "Ізраїль", "Індія", "Індонезія", "Ірак", "Іран", "Ірландія", "Ісландія", "Іспанія", "Італія", "Йорданія", "Кабо-Верде", "Казахстан", "Камбоджа", "Камерун", "Канада", "Катар", "Кенія", "Киргизстан", "Китай", "Кіпр", "Кірибаті", "Колумбія", "Коморські Острови", "ДР Конго", "Республіка Конго", "Південна Корея", "Північна Корея", "Коста-Рика", "Кот-д'Івуар", "Куба", "Кувейт", "Лаос", "Латвія", "Лесото", "Литва", "Ліберія", "Ліван", "Лівія", "Ліхтенштейн", "Люксембург", "Маврикій", "Мавританія", "Мадагаскар", "Малаві", "Малайзія", "Малі", "Мальдіви", "Мальта", "Марокко", "Маршаллові Острови", "Мексика", "Мікронезія", "Мозамбік", "Молдова", "Монако", "Монголія", "М'янма", "Намібія", "Науру", "Непал", "Нігер", "Нігерія", "Нідерланди", "Нікарагуа", "Німеччина", "Нова Зеландія", "Норвегія", "Об'єднані Арабські Емірати", "Оман", "Пакистан", "Палау", "Панама", "Папуа Нова Гвінея", "Парагвай", "Перу", "Південний Судан", "Південно-Африканська Республіка", "Північна Македонія", "Польща", "Португалія", "Росія", "Руанда", "Румунія", "Сальвадор", "Самоа", "Сан-Марино", "Сан-Томе і Принсіпі", "Саудівська Аравія", "Сейшельські Острови", "Сенегал", "Сент-Вінсент і Гренадини", "Сент-Кіттс і Невіс", "Сент-Люсія", "Сербія", "Сінгапур", "Сирія", "Словаччина", "Словенія", "Соломонові Острови", "Сомалі", "Сполучені Штати Америки", "Судан", "Суринам", "Східний Тимор", "Сьєрра-Леоне", "Таджикистан", "Таїланд", "Танзанія", "Того", "Тонга", "Тринідад і Тобаго", "Тувалу", "Туніс", "Туреччина", "Туркменістан", "Уганда", "Угорщина", "Узбекистан", "Україна", "Уругвай", "Фіджі", "Філіппіни", "Фінляндія", "Франція", "Хорватія", "Центральноафриканська Республіка", "Чад", "Чехія", "Чилі", "Чорногорія", "Швейцарія", "Швеція", "Шрі-Ланка", "Ямайка", "Японія"
];
window.COUNTRY_LIST_ENG = [
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua & Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia & Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Caribbean Netherlands",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos",
    "Islands",
    "Colombia",
    "Comoros",
    "Congo - Brazzaville",
    "Congo - Kinshasa",
    "Cook Islands",
    "Costa Rica",
    "Côte d’Ivoire",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard & McDonald Islands",
    "Honduras",
    "Hong Kong SAR China",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao SAR China",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "North Korea",
    "North Macedonia",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territories",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn Islands",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Réunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Samoa",
    "San Marino",
    "São Tomé & Príncipe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia & South Sandwich Islands",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "St.Barthélemy",
    "St.Helena",
    "St.Kitts & Nevis",
    "St.Lucia",
    "St.Martin",
    "St.Pierre & Miquelon",
    "St.Vincent & Grenadines",
    "Sudan",
    "Suriname",
    "Svalbard & Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor - Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad & Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks & Caicos Islands",
    "Tuvalu",
    "U.S.Outlying Islands",
    "U.S.Virgin Islands",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "UAE",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Wallis & Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
];
window.isoCountries = {
    'Afghanistan': 'AF',
    'Aland Islands': 'AX',
    'Albania': 'AL',
    'Algeria': 'DZ',
    'American Samoa': 'AS',
    'Andorra': 'AD',
    'Angola': 'AO',
    'Anguilla': 'AI',
    'Antarctica': 'AQ',
    'Antigua And Barbuda': 'AG',
    'Argentina': 'AR',
    'Armenia': 'AM',
    'Aruba': 'AW',
    'Australia': 'AU',
    'Austria': 'AT',
    'Azerbaijan': 'AZ',
    'Bahamas': 'BS',
    'Bahrain': 'BH',
    'Bangladesh': 'BD',
    'Barbados': 'BB',
    'Belarus': 'BY',
    'Belgium': 'BE',
    'Belize': 'BZ',
    'Benin': 'BJ',
    'Bermuda': 'BM',
    'Bhutan': 'BT',
    'Bolivia': 'BO',
    'Bosnia And Herzegovina': 'BA',
    'Botswana': 'BW',
    'Bouvet Island': 'BV',
    'Brazil': 'BR',
    'British Indian Ocean Territory': 'IO',
    'Brunei Darussalam': 'BN',
    'Bulgaria': 'BG',
    'Burkina Faso': 'BF',
    'Burundi': 'BI',
    'Cambodia': 'KH',
    'Cameroon': 'CM',
    'Canada': 'CA',
    'Cape Verde': 'CV',
    'Cayman Islands': 'KY',
    'Central African Republic': 'CF',
    'Chad': 'TD',
    'Chile': 'CL',
    'China': 'CN',
    'Christmas Island': 'CX',
    'Cocos (Keeling) Islands': 'CC',
    'Colombia': 'CO',
    'Comoros': 'KM',
    'Congo': 'CG',
    'Congo, Democratic Republic': 'CD',
    'Cook Islands': 'CK',
    'Costa Rica': 'CR',
    'Cote D\'Ivoire': 'CI',
    'Croatia': 'HR',
    'Cuba': 'CU',
    'Cyprus': 'CY',
    'Czech Republic': 'CZ',
    'Denmark': 'DK',
    'Djibouti': 'DJ',
    'Dominica': 'DM',
    'Dominican Republic': 'DO',
    'Ecuador': 'EC',
    'Egypt': 'EG',
    'El Salvador': 'SV',
    'Equatorial Guinea': 'GQ',
    'Eritrea': 'ER',
    'Estonia': 'EE',
    'Ethiopia': 'ET',
    'Falkland Islands': 'FK',
    'Faroe Islands': 'FO',
    'Fiji': 'FJ',
    'Finland': 'FI',
    'France': 'FR',
    'French Guiana': 'GF',
    'French Polynesia': 'PF',
    'French Southern Territories': 'TF',
    'Gabon': 'GA',
    'Gambia': 'GM',
    'Georgia': 'GE',
    'Germany': 'DE',
    'Ghana': 'GH',
    'Gibraltar': 'GI',
    'Greece': 'GR',
    'Greenland': 'GL',
    'Grenada': 'GD',
    'Guadeloupe': 'GP',
    'Guam': 'GU',
    'Guatemala': 'GT',
    'Guernsey': 'GG',
    'Guinea': 'GN',
    'Guinea-Bissau': 'GW',
    'Guyana': 'GY',
    'Haiti': 'HT',
    'Heard Island & Mcdonald Islands': 'HM',
    'Holy See (Vatican City State)': 'VA',
    'Honduras': 'HN',
    'Hong Kong': 'HK',
    'Hungary': 'HU',
    'Iceland': 'IS',
    'India': 'IN',
    'Indonesia': 'ID',
    'Iran, Islamic Republic Of': 'IR',
    'Iraq': 'IQ',
    'Ireland': 'IE',
    'Isle Of Man': 'IM',
    'Israel': 'IL',
    'Italy': 'IT',
    'Jamaica': 'JM',
    'Japan': 'JP',
    'Jersey': 'JE',
    'Jordan': 'JO',
    'Kazakhstan': 'KZ',
    'Kenya': 'KE',
    'Kiribati': 'KI',
    'Korea': 'KR',
    'Kuwait': 'KW',
    'Kyrgyzstan': 'KG',
    'Lao People\'s Democratic Republic': 'LA',
    'Latvia': 'LV',
    'Lebanon': 'LB',
    'Lesotho': 'LS',
    'Liberia': 'LR',
    'Libyan Arab Jamahiriya': 'LY',
    'Liechtenstein': 'LI',
    'Lithuania': 'LT',
    'Luxembourg': 'LU',
    'Macao': 'MO',
    'Macedonia': 'MK',
    'Madagascar': 'MG',
    'Malawi': 'MW',
    'Malaysia': 'MY',
    'Maldives': 'MV',
    'Mali': 'ML',
    'Malta': 'MT',
    'Marshall Islands': 'MH',
    'Martinique': 'MQ',
    'Mauritania': 'MR',
    'Mauritius': 'MU',
    'Mayotte': 'YT',
    'Mexico': 'MX',
    'Micronesia, Federated States Of': 'FM',
    'Moldova': 'MD',
    'Monaco': 'MC',
    'Mongolia': 'MN',
    'Montenegro': 'ME',
    'Montserrat': 'MS',
    'Morocco': 'MA',
    'Mozambique': 'MZ',
    'Myanmar': 'MM',
    'Namibia': 'NA',
    'Nauru': 'NR',
    'Nepal': 'NP',
    'Netherlands': 'NL',
    'Netherlands Antilles': 'AN',
    'New Caledonia': 'NC',
    'New Zealand': 'NZ',
    'Nicaragua': 'NI',
    'Niger': 'NE',
    'Nigeria': 'NG',
    'Niue': 'NU',
    'Norfolk Island': 'NF',
    'Northern Mariana Islands': 'MP',
    'Norway': 'NO',
    'Oman': 'OM',
    'Pakistan': 'PK',
    'Palau': 'PW',
    'Palestinian Territory, Occupied': 'PS',
    'Panama': 'PA',
    'Papua New Guinea': 'PG',
    'Paraguay': 'PY',
    'Peru': 'PE',
    'Philippines': 'PH',
    'Pitcairn': 'PN',
    'Poland': 'PL',
    'Portugal': 'PT',
    'Puerto Rico': 'PR',
    'Qatar': 'QA',
    'Reunion': 'RE',
    'Romania': 'RO',
    'Russian Federation': 'RU',
    'Russia': 'RU',
    'Rwanda': 'RW',
    'Saint Barthelemy': 'BL',
    'Saint Helena': 'SH',
    'Saint Kitts And Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Martin': 'MF',
    'Saint Pierre And Miquelon': 'PM',
    'Saint Vincent And Grenadines': 'VC',
    'Samoa': 'WS',
    'San Marino': 'SM',
    'Sao Tome And Principe': 'ST',
    'Saudi Arabia': 'SA',
    'Senegal': 'SN',
    'Serbia': 'RS',
    'Seychelles': 'SC',
    'Sierra Leone': 'SL',
    'Singapore': 'SG',
    'Slovakia': 'SK',
    'Slovenia': 'SI',
    'Solomon Islands': 'SB',
    'Somalia': 'SO',
    'South Africa': 'ZA',
    'South Georgia And Sandwich Isl.': 'GS',
    'Spain': 'ES',
    'Sri Lanka': 'LK',
    'Sudan': 'SD',
    'Suriname': 'SR',
    'Svalbard And Jan Mayen': 'SJ',
    'Swaziland': 'SZ',
    'Sweden': 'SE',
    'Switzerland': 'CH',
    'Syrian Arab Republic': 'SY',
    'Taiwan': 'TW',
    'Tajikistan': 'TJ',
    'Tanzania': 'TZ',
    'Thailand': 'TH',
    'Timor-Leste': 'TL',
    'Togo': 'TG',
    'Tokelau': 'TK',
    'Tonga': 'TO',
    'Trinidad And Tobago': 'TT',
    'Tunisia': 'TN',
    'Turkey': 'TR',
    'Turkmenistan': 'TM',
    'Turks And Caicos Islands': 'TC',
    'Tuvalu': 'TV',
    'Uganda': 'UG',
    'Ukraine': 'UA',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'United States Outlying Islands': 'UM',
    'Uruguay': 'UY',
    'Uzbekistan': 'UZ',
    'Vanuatu': 'VU',
    'Venezuela': 'VE',
    'Vietnam': 'VN',
    'Virgin Islands, British': 'VG',
    'Virgin Islands, U.S.': 'VI',
    'Wallis And Futuna': 'WF',
    'Western Sahara': 'EH',
    'Yemen': 'YE',
    'Zambia': 'ZM',
    'Zimbabwe': 'ZW'
};
window.isoCodes = {
    "AF": "Afghanistan",
    "AX": "Aland Islands",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua And Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia And Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CV": "Cape Verde",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo",
    "CD": "Congo, Democratic Republic",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Cote D'Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FK": "Falkland Islands",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island & Mcdonald Islands",
    "VA": "Holy See (Vatican City State)",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran, Islamic Republic Of",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle Of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KR": "Korea",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao People's Democratic Republic",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libyan Arab Jamahiriya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MK": "Macedonia",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia, Federated States Of",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "AN": "Netherlands Antilles",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestinian Territory, Occupied",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Reunion",
    "RO": "Romania",
    "RU": "Russia",
    "RW": "Rwanda",
    "BL": "Saint Barthelemy",
    "SH": "Saint Helena",
    "KN": "Saint Kitts And Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin",
    "PM": "Saint Pierre And Miquelon",
    "VC": "Saint Vincent And Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome And Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia And Sandwich Isl.",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard And Jan Mayen",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad And Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks And Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UM": "United States Outlying Islands",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "VG": "Virgin Islands, British",
    "VI": "Virgin Islands, U.S.",
    "WF": "Wallis And Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
};


function getNodeProperty(elem, voidType = null, attrName = "textContent") {
    return elem && elem[attrName] ? elem[attrName].trim() : voidType;
}

function addAddonMessageListener(type, callback) {
    addonMessageCallbacks.push({
        "type": type,
        "callback": callback,
    });
}

function onAddonMessage(request, sendResponse) {
    if (isNewVersionLoaded()) {
        addonMessageCallbacks = [];
        return;
    }
    for ( let i = 0; i < addonMessageCallbacks.length; i++ ) {
        if ( request.type === addonMessageCallbacks[i].type || request.name === addonMessageCallbacks[i].type ) {
            addonMessageCallbacks[i].callback(request.data, sendResponse);
        }
    }
}

function sendMessageToAddon(type, payload) {
    return chrome.runtime.sendMessage({
        "type": type,
        "data": payload
    }).catch(_ => null)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    onAddonMessage(request, sendResponse);
})

/** End of Browser specific API **/

window.TIMEOUT = 1000; //msec, timepause between table injection attempts

window.checkVersionKey = "";

function removeAllQqButtons() {
    const docs = collectAllDocuments(typeof getDoc == 'function' ? getDoc() : document);
    for ( const doc of docs ) {

    }
    const allQqButtons = docs.reduce((acc,doc) => acc.concat(Array.from(doc.querySelectorAll(`.qq, .qq-guide, .qq-caption, .qq-select, #qq-css, .qq-script,
                                                        #qq-currency, .qq-quick-login-btn, .qq-quick-login-select,
                                                        .qq-auto-login-wrapper, .qq-popup-user-salt-block, .qq-edit-popup, .qq-meta, .qq-snackbar, .qq-image-draft`))), []);
    for (let i = 0; i < allQqButtons.length; ++i) {
        allQqButtons[i].parentNode.removeChild(allQqButtons[i]);
    }
}

function collectAllDocuments(doc = document) {
    let iframes = querySelectorAll(document, "iframe");
    let documents = iframes.filter(iframe => {
        const iframeUrl = iframe.src ? new URL(iframe.src) : null;
        return iframeUrl ? iframeUrl.hostname === window.location.hostname : false;
    }).map(iframe => iframe.contentDocument || iframe.contentWindow)
      .filter(iframe => iframe);
    documents.push(doc);
    return documents;
}

function removeFindAction() {
    var btn = typeof getSearchButton === 'function' ? getSearchButton() : null;
    if ( !btn )
        return;
    if ( Array.isArray(btn) ) {
        for (var i = 0; i < btn.length; i++) {
            if ( btn[i] )
                btn[i].removeAttribute("injected");
        }
    } else {
        btn.removeAttribute("injected");
    }
}

function isNewVersionLoaded() {
    if ( !getVersionMark() ) {
        initVersionChecker();
    }
    return !(checkVersionKey === getNodeProperty(getVersionMark()));
}

function createVersionMark() {
    var newMark = document.createElement("meta");
    newMark.setAttribute("id", "qqVersionMark");
    document.head.appendChild(newMark);
    return newMark;
}

function getVersionMark() {
    return document.querySelector("#qqVersionMark");
}

function initVersionChecker() {
    console.log('init version cheker')
    window.checkVersionKey = Math.floor(Math.random() * 999999).toString();
    const checkVersionmark = getVersionMark() || createVersionMark();
    checkVersionmark.textContent = window.checkVersionKey;
    removeAllQqButtons();
    removeFindAction();
}

function extractIntFromStr(s) {
    return parseInt(s.match(/(\d+)/)[1], 10);
}

function getChildElementsByTagName(element, tagName) {
	var tagNameUpper = tagName.toUpperCase();
	var arr = [];
	if ( element && element.childNodes ) {
		for ( var i = 0; i < element.childNodes.length; i++) {
			var node = element.childNodes[i];
			if ( node.nodeType != 1 || node.nodeName.toUpperCase() != tagNameUpper ) {
				continue;
			}
			arr.push(node);
		}
	}
	return arr;
}

function toMoney(number, decimals, decimal_sep, thousands_sep)
{
   var n = number,
   c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
   d = decimal_sep || ',', //if no decimal separetor is passed we use the comma as default decimal separator (we MUST use a decimal separator)

   /*
   according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
   the fastest way to check for not defined parameter is to use typeof value === 'undefined'
   rather than doing value === undefined.
   */
   t = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep, //if you don't want ot use a thousands separator you can pass empty string as thousands_sep value

   sign = (n < 0) ? '-' : '',

   //extracting the absolute value of the integer part of the number and converting to string
   i = parseInt(n = Math.abs(n).toFixed(c)) + '',

   j = ((j = i.length) > 3) ? j % 3 : 0;
   return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}

function isANumber(s) {
    return /^(\d+)$/.test(s);
}

// takes date in the DD-MM-YY format, returns DD-MM-YYYY
function makeYear4Digits(d) {
	return d.substring(0,6)  + d.substring(6).padStart(4, "20");
}

function dayMonthYearToString(day, month, year) {
    if ( day && month && year ) {
        return [
            day.toString().padStart(2, "00"), month.toString().padStart(2, "00"), year.toString().padStart(4, "2000")
        ].join(".");
    }
    return "";
}

//takes day and month, returns DD.MM.YYYY string
function appendYear(trvDay, trvMonth) {
    var today = new Date();
    var year = 1900 + today.getYear();
    var curMonth = 1 + today.getMonth();
    var curDay = today.getDate();

    if ( trvMonth < curMonth || (trvMonth == curMonth && trvDay < curDay) ) {
        year = year + 1;
    }

    return dayMonthYearToString(trvDay, trvMonth, year);
}

function monthNameToNumber(month, locale = '') {
    const locales = ['ru', 'ua', 'en', 'et', 'lv', 'lt', 'ro'];
    if ( locales.indexOf(locale) < 0 ) {
        locale = '';
    }
    const formatMonth = month.substring(0, 3).toLowerCase();
    if ( locale === '' || locale === 'ru') {
        switch ( formatMonth ) {
            case "янв":
                return 1;
            case "фев":
                return 2;
            case "мар":
                return 3;
            case "апр":
                return 4;
            case "май":
                return 5;
            case "мая":
                return 5;
            case "июн":
                return 6;
            case "июл":
                return 7;
            case "авг":
                return 8;
            case "сен":
                return 9;
            case "окт":
                return 10;
            case "oкт":
                return 10;
            case "ноя":
                return 11;
            case "дек":
                return 12;
        }
    }
    if ( locale === '' || locale === 'ua' ) {
        switch ( formatMonth ) {
            case "січ":
                return 1;
            case "сiч":
                return 1;
            case "лют":
                return 2;
            case "бер":
                return 3;
            case "кві":
                return 4;
            case "квi":
                return 4;
            case "квт":
                return 4;
            case "тра":
                return 5;
            case "трв":
                return 5;
            case "чер":
                return 6;
            case "чрв":
                return 6;
            case "лип":
                return 7;
            case "лпн":
                return 7;
            case "сер":
                return 8;
            case "срп":
                return 8;
            case "вер":
                return 9;
            case "жвт":
                return 10;
            case "жов":
                return 10;
            case "лст":
                return 11;
            case "лиc":
                return 11;
            case "лис":
                return 11;
            case "грд":
                return 12;
            case "гру":
                return 12;
        }
    }
    if ( locale === '' || locale === 'en' ) {
        switch ( formatMonth ) {
            case "jan":
                return 1;
            case "feb":
                return 2;
            case "mar":
                return 3;
            case "apr":
                return 4;
            case "may":
                return 5;
            case "jun":
                return 6;
            case "jul":
                return 7;
            case "aug":
                return 8;
            case "sep":
                return 9;
            case "oct":
                return 10;
            case "nov":
                return 11;
            case "dec":
                return 12;
        }
    }

    if (locale === '' || locale === 'ro') {
        switch (formatMonth) {
            case "ian":
                return 1;
            case "feb":
                return 2;
            case "mar":
                return 3;
            case "apr":
                return 4;
            case "mai":
                return 5;
            case "iun":
                return 6;
            case "iul":
                return 7;
            case "aug":
                return 8;
            case "sep":
                return 9;
            case "oct":
                return 10;
            case "noi":
                return 11;
            case "dec":
                return 12;
        }
    }

    if ( locale === '' || locale === 'et' ) {  //Estonia
        switch ( month.toLowerCase().replace(/u{2}/, 'u').substring(0, 3) ) {
            case "jaa":
                return 1;
            case "vee":
                return 2;
            case "mär":
                return 3;
            case "apr":
                return 4;
            case "mai":
                return 5;
            case "jun":
                return 6;
            case "jul":
                return 7;
            case "aug":
                return 8;
            case "sep":
                return 9;
            case "okt":
                return 10;
            case "nov":
                return 11;
            case "det":
                return 12;
        }
    }

    if ( locale === '' || locale === 'lv' ) {  //Latvia
        switch ( formatMonth ) {
            case "jan":
                return 1;
            case "feb":
                return 2;
            case "mar":
                return 3;
            case "apr":
                return 4;
            case "mai":
                return 5;
            case "jūn":
                return 6;
            case "jūl":
                return 7;
            case "aug":
                return 8;
            case "sep":
                return 9;
            case "okt":
                return 10;
            case "nov":
                return 11;
            case "dec":
                return 12;
        }
    }

    if ( locale === '' || locale === 'lt' ) {  //Lithuania
        switch ( formatMonth ) {
            case "sau":
                return 1;
            case "vas":
                return 2;
            case "kov":
                return 3;
            case "bal":
                return 4;
            case "geg":
                return 5;
            case "bir":
                return 6;
            case "lie":
                return 7;
            case "rgp":
                return 8;
            case "rgs":
                return 9;
            case "rug":
                return 9;
            case "spa":
                return 10;
            case "lap":
                return 11;
            case "gru":
                return 12;
        }
    }

    if ( locale === '' || locale === 'pl' ) {  //Lithuania
        switch ( formatMonth ) {
            case 'sty':
                return 1;
            case 'lut':
                return 2;
            case 'mar':
                return 3;
            case 'kwi':
                return 4;
            case 'maj':
                return 5;
            case 'cze':
                return 6;
            case 'lip':
                return 7;
            case 'sie':
                return 8;
            case 'wrz':
                return 9;
            case 'paź':
                return 10;
            case 'lis':
                return 11;
            case 'gru':
                return 12;
        }
    }
    throw("Unexpected month name: " + month);
}

window.roomAbrs = ["DBL", "TWIN", "SGL", "TRPL", "QDPL", "APT"];

function dateFromDayAndMonthName(day, month, year, locale) {
	var d = parseInt(day, 10);
	var m = monthNameToNumber(month, locale);
	return year ? dayMonthYearToString(d, m, year) : appendYear(d, m);
}


function dateFromDayAndMonthNameString(date) {
    const [day, month, year] = date.split(/\s+/).filter(Boolean);
    if (!day || !month ) {
        return null;
    }
    return dateFromDayAndMonthName(day, month, year)
}


function getParameterByName(name, url) {
	if ( !url )
		url = window.location.search || window.location.href;
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getUrlSearchParameters(name, url = window.location.href) {  //Use instead getParameterByName func
    var urlObj = new URL(url);
    return urlObj.searchParams.get(name);
}

function trim(s) {
    if ( s == null ) {
        return s;
    }
    return s.split("&" + "nbsp;").join(" ").split(/\s+/).join(" ").trim();
}

function selectedOption(s, text = true) {
	if ( s != null && s.options != null && s.selectedIndex >= 0 && s.selectedIndex < s.options.length && s.options[s.selectedIndex] != null )
		return text ? s.options[s.selectedIndex].text : s.options[s.selectedIndex];
	else
		return null;
}

var transliterate = (
	function() {
        const rus = ['а','б','в','г','д','е','ё','ж', 'з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х', 'ц', 'ч', 'ш',    'щ', 'ъ','ы','ь','э', 'ю', 'я'];
        const eng = ['a','b','v','g','d','e','e','zh','z','i','i','k','l','m','n','o','p','r','s','t','u','f','kh','ts','ch','sh','shch','ie','y', '','e','iu','ia'];
		return function(text, engToRus) {
			for( let x = 0; x < rus.length; x++ ) {
				text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
			}
			return text;
		}
	}
)();
 // взято  https://dmsu.gov.ua/assets/js/services.js
function transliterateUa (inputText) {
    var rules = [
        {'pattern': 'а', 'replace': 'a'},
        {'pattern': 'б', 'replace': 'b'},
        {'pattern': 'в', 'replace': 'v'},
        {'pattern': 'зг', 'replace': 'zgh'},
        {'pattern': 'Зг', 'replace': 'Zgh'},
        {'pattern': 'г', 'replace': 'h'},
        {'pattern': 'ґ', 'replace': 'g'},
        {'pattern': 'д', 'replace': 'd'},
        {'pattern': 'е', 'replace': 'e'},
        {'pattern': '^є', 'replace': 'ye'},
        {'pattern': 'є', 'replace': 'ie'},
        {'pattern': 'ж', 'replace': 'zh'},
        {'pattern': 'з', 'replace': 'z'},
        {'pattern': 'и', 'replace': 'y'},
        {'pattern': 'і', 'replace': 'i'},
        {'pattern': '^ї', 'replace': 'yi'},
        {'pattern': 'ї', 'replace': 'i'},
        {'pattern': '^й', 'replace': 'y'},
        {'pattern': 'й', 'replace': 'i'},
        {'pattern': 'к', 'replace': 'k'},
        {'pattern': 'л', 'replace': 'l'},
        {'pattern': 'м', 'replace': 'm'},
        {'pattern': 'н', 'replace': 'n'},
        {'pattern': 'о', 'replace': 'o'},
        {'pattern': 'п', 'replace': 'p'},
        {'pattern': 'р', 'replace': 'r'},
        {'pattern': 'с', 'replace': 's'},
        {'pattern': 'т', 'replace': 't'},
        {'pattern': 'у', 'replace': 'u'},
        {'pattern': 'ф', 'replace': 'f'},
        {'pattern': 'х', 'replace': 'kh'},
        {'pattern': 'ц', 'replace': 'ts'},
        {'pattern': 'ч', 'replace': 'ch'},
        {'pattern': 'ш', 'replace': 'sh'},
        {'pattern': 'щ', 'replace': 'shch'},
        {'pattern': 'ьо', 'replace': 'io'},
        {'pattern': 'ьї', 'replace': 'ii'},
        {'pattern': 'ь', 'replace': ''},
        {'pattern': '^ю', 'replace': 'yu'},
        {'pattern': 'ю', 'replace': 'iu'},
        {'pattern': '^я', 'replace': 'ya'},
        {'pattern': 'я', 'replace': 'ia'},
        {'pattern': 'А', 'replace': 'A'},
        {'pattern': 'Б', 'replace': 'B'},
        {'pattern': 'В', 'replace': 'V'},
        {'pattern': 'Г', 'replace': 'H'},
        {'pattern': 'Ґ', 'replace': 'G'},
        {'pattern': 'Д', 'replace': 'D'},
        {'pattern': 'Е', 'replace': 'E'},
        {'pattern': '^Є', 'replace': 'Ye'},
        {'pattern': 'Є', 'replace': 'Ie'},
        {'pattern': 'Ж', 'replace': 'Zh'},
        {'pattern': 'З', 'replace': 'Z'},
        {'pattern': 'И', 'replace': 'Y'},
        {'pattern': 'І', 'replace': 'I'},
        {'pattern': '^Ї', 'replace': 'Yi'},
        {'pattern': 'Ї', 'replace': 'I'},
        {'pattern': '^Й', 'replace': 'Y'},
        {'pattern': 'Й', 'replace': 'I'},
        {'pattern': 'К', 'replace': 'K'},
        {'pattern': 'Л', 'replace': 'L'},
        {'pattern': 'М', 'replace': 'M'},
        {'pattern': 'Н', 'replace': 'N'},
        {'pattern': 'О', 'replace': 'O'},
        {'pattern': 'П', 'replace': 'P'},
        {'pattern': 'Р', 'replace': 'R'},
        {'pattern': 'С', 'replace': 'S'},
        {'pattern': 'Т', 'replace': 'T'},
        {'pattern': 'У', 'replace': 'U'},
        {'pattern': 'Ф', 'replace': 'F'},
        {'pattern': 'Х', 'replace': 'Kh'},
        {'pattern': 'Ц', 'replace': 'Ts'},
        {'pattern': 'Ч', 'replace': 'Ch'},
        {'pattern': 'Ш', 'replace': 'Sh'},
        {'pattern': 'Щ', 'replace': 'Shch'},
        {'pattern': 'Ь', 'replace': ''},
        {'pattern': '^Ю', 'replace': 'Yu'},
        {'pattern': 'Ю', 'replace': 'Iu'},
        {'pattern': '^Я', 'replace': 'Ya'},
        {'pattern': 'Я', 'replace': 'Ia'},
        {'pattern': '’', 'replace': ''},
        {'pattern': '\'', 'replace': ''},
        {'pattern': '`', 'replace': ''}
    ];

    var words = inputText.split(/[-_ \n]/);
    for (var n in words) {
        var word = words[n];
        for (var ruleNumber in rules) {
            word = word.replace(
                new RegExp(rules[ruleNumber]['pattern'], 'gm'),
                rules[ruleNumber]['replace']
            );
        }
        inputText = inputText.replace(words[n], word);
    }
    return inputText.toUpperCase();
}

String.prototype.capitalizeFirstLetter = function() { return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase(); };

Array.fromList = function(list) {
    var array = new Array(list.length);
    for ( var i = 0, n = list.length; i < n; ++i )
        array[i] = list[i];
    return array;
};

function ageFromDate(brth_dd_mm_yyyy, curr_dd_mm_yyyy) {
	if ( !brth_dd_mm_yyyy || !curr_dd_mm_yyyy ) {
		return null;
	}
	var regExp = /(\d+).(\d+).(\d{4})/;
	var matchB = brth_dd_mm_yyyy.match(regExp);
	var matchC = curr_dd_mm_yyyy.match(regExp);
	if ( !matchB || !matchC ) {
		return null;
	}
	var brth = new Date(matchB[3], matchB[2]-1, matchB[1]);
    var now = new Date(matchC[3], matchC[2]-1, matchC[1]);
    var age = now.getFullYear() - brth.getFullYear();
	return now.setFullYear(1972) < brth.setFullYear(1972) ? age - 1 : age;
}

function getDistance(date1, date2) {
    if ( !date1 || !date2 ) {
        return 0;
    }

    if ( !(date1 instanceof Date) ) {
        date1 = dayMonthYearToDate(date1);
    }
    if ( !(date2 instanceof Date) ) {
        date2 = dayMonthYearToDate(date2);
    }

	var distance = 0;
	while ( date1.getTime() < date2.getTime() ) {
		date1.setDate(date1.getDate()+1);
		distance++;
	}
	return distance;
}

function getBackgroundImageUrl(img) {
	if ( img ) {
		 var style = window.getComputedStyle(img);
		 var url = style && style.backgroundImage;
		 if ( url && url.length > 7 ) {
			return url.slice(5, -2)
		 }
	}
	return null;
}

function insertBeforeBR(td, text) {
    if ( td.textContent.indexOf(text) < 0 ) {
        var brs = td.querySelectorAll("br");
        for (var i = 0; i < brs.length; ++i) {
        	brs[i].parentNode.insertBefore(document.createTextNode(text), brs[i])
        }
    }
}

if (!String.prototype.startsWith) {
	Object.defineProperty(String.prototype, 'startsWith', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: function(searchString, position) {
			position = position || 0;
			return this.lastIndexOf(searchString, position) === position;
		}
	});
}

function zip(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}

function querySelectorAll(node, selectors) {
   return node ? [...node.querySelectorAll(selectors)] : [];
}

function extractOptionalInt(text) {
   return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function dayMonthYearToDate(date) {
	var r = date.match(/(\d+)\.(\d+)\.(\d+)/);
	return new Date(parseInt(r[3], 10),parseInt(r[2], 10)-1, parseInt(r[1], 10));
}

function addDaysToStringDate(date, days) {
      const initialDate = dayMonthYearToDate(date);
      initialDate.setDate(initialDate.getDate() + parseInt(days));
      return initialDate.toLocaleDateString('ru');
}

if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}

if ( !Array.prototype.asyncMap ) {
    Array.prototype.asyncMap = async function (callbackfn) {
        if ( !Array.isArray(this) ) {
            throw new TypeError('Array.prototype.asyncMap called on non-array object');
        }
        if ( typeof callbackfn !== 'function' ) {
            throw new TypeError('predicate must be a function');
        }
        const length = this.length;
        const thisArg = arguments[1];
        const resultArray = [];

        for ( let i = 0; i < length; i++ )  {
            const result = await callbackfn.call(thisArg, this[i], this, i);
            resultArray.push(result);
        }
        return resultArray
    };
}

function isPrefferedDefaultCurrencyUtil() {
    var sel = document.querySelector("#qq-currency select");
    return !sel || sel.value !== "USDEUR";
}

function injectCurrencySelectionUtil(selector = "", operator = OPERATOR_CURRENCY, legendStyle = "width:auto;float:left;margin-right:6px;font-size:12px;color:white;", selectStyle = "margin-top:-3px;", display = "display: block;") {
	if( document.querySelector("#qq-currency") ) {
        document.querySelector("#qq-currency").setAttribute("style", display);
        return;
    }
    var submit = document.querySelector(selector);
    if ( !submit ) {
        return;
    }
    var select = addCurrencySelectionUtil(submit, legendStyle, selectStyle);
    addAddonMessageListener(operator + " currency", function(currency) {
        document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
        document.querySelector("#qq-currency").setAttribute("style", display);
    });
    sendMessageToAddon("get operator currency", OPERATOR_CURRENCY);
    return select;
}

function addCurrencySelectionUtil(submit, legendStyle, selectStyle) {
    var div = document.createElement("div");
    div.id = "qq-currency";
    div.setAttribute("style", "display: none;");
    div.className = "qq-currency-container";


    var legend = document.createElement("legend");
    legend.setAttribute("style", legendStyle);
    legend.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
    div.appendChild(legend);

    var select = document.createElement("select");
    select.setAttribute("style", selectStyle);
    select.onchange = function () {
        sendMessageToAddon("set operator currency", {operator: OPERATOR_CURRENCY, currency: select.value});
    };

    var defaultCurr = document.createElement("option");
    defaultCurr.value = DEFAULT_CURRENCY;
    defaultCurr.textContent = DEFAULT_CURRENCY;
    select.appendChild(defaultCurr);

    var foreign = document.createElement("option");
    foreign.value = "USDEUR";
    foreign.textContent = "USD / EUR";
    select.appendChild(foreign);

    div.appendChild(select);

    return submit.parentElement.insertBefore(div, submit);
}

function simulateEvent(node, eventName) {
    if ( node ) {
        var eventsArray = [];
        if ( typeof eventName === "string" ) {
            eventsArray.push(eventName);
        } else {
            eventsArray = eventName;
        }
        eventsArray.forEach(eventName => {
            var event = new Event(eventName, {
                'view': window,
                'bubbles': true,
                'cancelable': false
            });
            node.dispatchEvent(event);
        });
    }
}

function simulateMouseEvent(node, eventName) {
    if ( node ) {
        var eventsArray = [];
        if ( typeof eventName === "string" ) {
            eventsArray.push(eventName);
        } else {
            eventsArray = eventName;
        }
        eventsArray.forEach(eventName => {
            var event = new MouseEvent(eventName, {
                'view': window,
                'bubbles': true,
                'cancelable': false
            });
            node.dispatchEvent(event);
        });
    }
}

function findTableTdIndex(ths, caption) {
    return ths.findIndex(function (th) {
        if ( th.textContent.match(caption) ) {
            return true;
        }
        return false;
    });
}

function makeCRCTable(){
    var c;
    var crcTable = [];
    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
}

function crc32(str) {
    var crcTable = window.crcTable || (window.crcTable = makeCRCTable());
    var crc = 0 ^ (-1);

    for (var i = 0; i < str.length; i++ ) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
}

function injectStyleSheet(doc) {
    if (doc.querySelector("#qq-css")) {
        return;
    }
    if (doc && doc.head) {
        doc.head.appendChild(appendStyleElement(doc));
    }
}

function appendStyleElement(doc) {
    const text = `
    .qq-edit-btn:hover, .qq-add-btn:hover, .qq-rating-btn:hover, .qq-add-img-fast-btn:hover, .qq-add-img-btn:hover  {
    transform: scale(1.1);
}
.qq-edit-btn:active, .qq-add-btn:active, .qq-rating-btn:active, .qq-add-img-fast-btn:active, .qq-add-img-btn:active {
    transform: scale(1);
}

.qq:hover > .qq-fly-btn:not(.added) {
   display: block;
}

.qq-rating-btn:hover  {
    font-size: 16px;
    line-height: 1.5em;
}
.qq-rating-btn:active {
    font-size: 12px;
    line-height: 2.5em;
}

.qq.box, .qq.qq-box {
    position: relative;
    display: flex;
    width: 48px;
    flex-wrap: wrap;
    min-width: 48px;
    align-content: center;
}

.qq-add-btn, .qq .qq-add-btn, .qq-add-img-fast-btn {
    cursor: pointer;
    width: 24px;
    height: 24px;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iU1ZHUm9vdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSI+CjxwYXRoIHN0cm9rZS13aWR0aD0iLjAxMzQ0IiBkPSJtMTguOTMgMTUuODZ2NC4yNzNxMCAxLjU5OS0xLjEzNiAyLjczNXQtMi43MzUgMS4xMzZoLTExLjE4cS0xLjU5OSAwLTIuNzM1LTEuMTM2LTEuMTM5LTEuMTItMS4xMzktMi43MnYtMTEuMThxMC0xLjU5OSAxLjEzNi0yLjczNSAxLjEzNS0xLjEzOCAyLjczNC0xLjEzOGgxMS4xOHEuODQ2NiAwIDEuNTcyLjMzNjAuMjAxNi4wOTQxMS4yNDE5LjMwOTEuMDQwMzMuMjI4NC0uMTIwOS4zODk3bC0uNjYuNjU4cS0uMTM0NC4xMzQ0LS4zMDkxLjEzNDQtLjA0MDMzIDAtLjEyMDktLjAyNjg5LS4zMDkxLS4wODA2Ni0uNjA0Ny0uMDgwNjZoLTExLjE4cS0uODg2OSAwLTEuNTE5LjYzMTYtLjYzMTYuNjMxNi0uNjMxNiAxLjUxOXYxMS4xOHEwIC44ODY5LjYzMTYgMS41MTkuNjMxNi42MzE2IDEuNTE5LjYzMTZoMTEuMThxLjg4NjkgMCAxLjUxOS0uNjMxNi42MzE2LS42MzE2LjYzMTYtMS41MTl2LTMuNDEzcTAtLjE3NDcuMTIwOS0uMjk1NmwwLjg2LTAuODZxLjEzNDQtLjEzNDQuMzA5MS0uMTM0NC4wODA2NiAwIC4xNjEzLjA0MDMzLjI2ODguMTA3NS4yNjg4LjM4OTd6bTMuMS02LjU2Ny0xMC45NCAxMC45NHEtLjMyMjUuMzIyNS0uNzY2MC4zMjI1dC0uNzY2MC0uMzIyNWwtNS43NzYtNS43OHEtLjMyMjUtLjMyMjUtLjMyMjUtLjc2NjB0LjMyMjUtLjc2NjBsMS40NzgtMS40NzhxLjMyMjUtLjMyMjUuNzY2MC0uMzIyNXQuNzY2MC4zMjI1bDMuNTM0IDMuNTM0IDguNjk1LTguNjk1cS4zMjI1LS4zMjI1Ljc2NjAtLjMyMjV0Ljc2NjAuMzIyNWwxLjQ3OCAxLjQ3OHEuMzIyNS4zMjI1LjMyMjUuNzY2MHQtLjMyMjUuNzY2MHoiLz4KPC9zdmc+Cg==) no-repeat;
}

.qq.horizontal, .qq.qq-horizontal {
    position: relative;
    display: inline-flex;
    height: 24px;
    max-height: 72px;
}

.qq.vertical, .qq.qq-vertical {
    position: relative;
    display: flex;
    width: 24px;
    max-width: 72px;
    flex-direction: column;
}

.qq-edit-btn, .qq .qq-edit-btn {
    cursor: pointer;
    width: 24px;
    height: 24px;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iU1ZHUm9vdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSI+CjxwYXRoIHN0cm9rZS13aWR0aD0iLjAxMzQ0IiBkPSJtMTEuOTMgMTkuMjggMS41NTktMS41NTktMi4wNDMtMi4wNDMtMS41NTkgMS41NTl2Ljc1MjZoMS4yODl2MS4yOXptNS45Mi05LjY4cS0uMjItLjIxNS0uNDUuMDEzbC00LjcwMyA0LjcwM3EtLjIyODQuMjI4NC0uMDEzNDQuNDQzNS4yMTUwLjIxNTAuNDQzNS0uMDEzNDRsNC43MDMtNC43MDNxLjIyODQtLjIyODQuMDEzNDQtLjQ0MzV6bTEuMDc1IDcuOTgydjIuNTUzcTAgMS41OTktMS4xMzYgMi43MzV0LTIuNzM1IDEuMTM2aC0xMS4xOHEtMS41OTkgMC0yLjczNS0xLjEzNnQtMS4xMzYtMi43MzV2LTExLjE4cTAtMS41OTkgMS4xMzYtMi43MzV0Mi43MzUtMS4xMzZoMTEuMThxLjg0NjYgMCAxLjU3Mi4zMzYwLjIwMTYuMDk0MTEuMjQxOS4zMDkxLjA0MDMzLjIyODQtLjEyMDkuMzg5N2wtLjY2LjY2NHEtLjE4LjE4OC0uNDMuMTA3LS4zMC0uMDgxLS42MC0uMDgxaC0xMS4xOHEtLjg4NjkgMC0xLjUxOS42MzE2LS42MzIuNjMyLS42MzIgMS41MTh2MTEuMTlxMCAuODg2OS42MzE2IDEuNTE5LjYzMTYuNjMxNiAxLjUxOS42MzE2aDExLjE4cS44ODY5IDAgMS41MTktLjYzMTYuNjMxNi0uNjMxNi42MzE2LTEuNTE5di0xLjdxMC0uMTc0Ny4xMjA5LS4yOTU2bDAuODYtLjg2MDFxLjIwMTYtLjIwMTYuNDcwMy0uMDk0MTEuMjY4OC4xMDc1LjI2ODguMzg5N3ptLTEuMjktOS45MTcgMy44NyAzLjg3LTkuMDMxIDkuMDMxaC0zLjg3MXYtMy44N3ptNS45NjcgMS43NzQtMS4yMzYgMS4yMzYtMy44Ny0zLjg3IDEuMjM2LTEuMjM2cS4zNzYzLS4zNzYzLjkxMzgtLjM3NjN0LjkxMzguMzc2M2wyLjA0MyAyLjA0M3EuMzc2My4zNzYzLjM3NjMuOTEzOHQtLjM3NjMuOTEzOHoiLz4KPC9zdmc+Cg==) no-repeat;
}

.qq-add-btn.added {
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iU1ZHUm9vdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSI+CjxwYXRoIHN0cm9rZS13aWR0aD0iLjAxMzQ0IiBkPSJtMTUuMDUgNi43OTdoLTExLjE4cS0uODg2OSAwLTEuNTE5LjYzMTYtLjYzMTYuNjMxNi0uNjMxNiAxLjUxOXYxMS4xOHEwIC44ODY5LjYzMTYgMS41MTkuNjMxNi42MzE2IDEuNTE5LjYzMTZoMTEuMThxLjg4NjkgMCAxLjUxOS0uNjMxNi42MzE2LS42MzE2LjYzMTYtMS41MTl2LTExLjE4cTAtLjg4NjktLjYzMTYtMS41MTktLjYzMTYtLjYzMTYtMS41MTktLjYzMTZ6bTMuODcgMi4xNXYxMS4xOHEwIDEuNTk5LTEuMTM2IDIuNzM1dC0yLjczNSAxLjEzNmgtMTEuMThxLTEuNTk5IDAtMi43MzUtMS4xMzYtMS4xMzItMS4xMy0xLjEzMi0yLjczdi0xMS4xOHEwLTEuNTk5IDEuMTM2LTIuNzM1IDEuMTM1LTEuMTM4IDIuNzM0LTEuMTM4aDExLjE4cTEuNTk5IDAgMi43MzUgMS4xMzZ0MS4xMzYgMi43MzV6Ii8+CjxwYXRoIHN0cm9rZS13aWR0aD0iLjAxMDM3IiBkPSJtMTUuNjIgMTguMjljMCAuMjc2Ni0uMDk2NzguNTExNi0uMjkwNC43MDUybC0xLjQxIDEuNDFjLS4xOTM2LjE5MzYtLjQyODcuMjkwNC0uNzA1Mi4yOTA0LS4yNzY2IDAtLjUxMTctLjA5Njc4LS43MDUzLS4yOTA0bC0zLjA0Ny0zLjA1LTMuMDQ5IDMuMDVjLS4xOTM2LjE5MzYtLjQyODcuMjkwNC0uNzA1Mi4yOTA0LS4yNzY2IDAtLjUxMTYtLjA5Njc4LS43MDUyLS4yOTA0bC0xLjQxMS0xLjQxYy0uMTk0LS4yMC0uMjkwLS40My0uMjkwLS43MSAwLS4yNzY2LjA5Njc5LS41MTE3LjI5MDQtLjcwNTNsMy4wNDktMy4wNC0zLjA0OS0zLjA1Yy0uMTk0LS4yMC0uMjkwLS40My0uMjkwLS43MSAwLS4yNzY2LjA5Njc5LS41MTE2LjI5MDQtLjcwNTJsMS40MS0xLjQwMmMuMTk0LS4xOTQuNDI5LS4yOTEuNzA2LS4yOTEuMjc2NiAwIC41MTE2LjA5Njc5LjcwNTIuMjkwNGwzLjA0OSAzLjA1MyAzLjA0Ny0zLjA1MmMuMTkzNi0uMTkzNi40Mjg3LS4yOTA0LjcwNTMtLjI5MDRzLjUxMTYuMDk2NzkuNzA1Mi4yOTA0bDEuNDEgMS40MWMuMTkzNi4xOTM2LjI5MDQuNDI4Ny4yOTA0LjcwNTIgMCAuMjc2Ni0uMDk2NzguNTExNy0uMjkwNC43MDUzbC0zLjA0OSAzLjA0OSAzLjA0OSAzLjA0OWMuMTkzNi4xOTM2LjI5MDQuNDI4Ny4yOTA0LjcwNTN6Ii8+Cjwvc3ZnPgo=) no-repeat !important;
}

.qq-edit-btn.added {
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iU1ZHUm9vdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSI+CjxwYXRoIHN0cm9rZS13aWR0aD0iLjAxMzQ0IiBkPSJtMTUuMDUgNi43OTdoLTExLjE4cS0uODg2OSAwLTEuNTE5LjYzMTYtLjYzMTYuNjMxNi0uNjMxNiAxLjUxOXYxMS4xOHEwIC44ODY5LjYzMTYgMS41MTkuNjMxNi42MzE2IDEuNTE5LjYzMTZoMTEuMThxLjg4NjkgMCAxLjUxOS0uNjMxNi42MzE2LS42MzE2LjYzMTYtMS41MTl2LTExLjE4cTAtLjg4NjktLjYzMTYtMS41MTktLjYzMTYtLjYzMTYtMS41MTktLjYzMTZ6bTMuODcgMi4xNXYxMS4xOHEwIDEuNTk5LTEuMTM2IDIuNzM1dC0yLjczNSAxLjEzNmgtMTEuMThxLTEuNTk5IDAtMi43MzUtMS4xMzYtMS4xMzItMS4xMy0xLjEzMi0yLjczdi0xMS4xOHEwLTEuNTk5IDEuMTM2LTIuNzM1IDEuMTM1LTEuMTM4IDIuNzM0LTEuMTM4aDExLjE4cTEuNTk5IDAgMi43MzUgMS4xMzZ0MS4xMzYgMi43MzV6Ii8+CjxwYXRoIHN0cm9rZS13aWR0aD0iLjAwODAwOCIgZD0ibTE1LjQxIDE1LjgycTAgLjA0LS4wMDguMDU2MS0uNTEyNSAyLjE0Ni0yLjE0NiAzLjQ3OXQtMy44MjggMS4zMzNxLTEuMTY5IDAtMi4yNjItLjQ0MDR0LTEuOTUtMS4yNTdsLTEuMDMzIDEuMDMzcS0uMTUyMi4xNTIyLS4zNjA0LjE1MjJ0LS4zNjA0LS4xNTIyLS4xNTIyLS4zNjA0di0zLjU4OHEwLS4yMDgyLjE1MjItLjM2MDR0LjM2MDQtLjE1MjJoMy41ODhxLjIwODIgMCAuMzYwNC4xNTIydC4xNTIyLjM2MDQtLjE1MjIuMzYwNGwtMS4wOTcgMS4wOTdxLjU2ODYuNTI4NSAxLjI4OS44MTY4LjcyMDcuMjg4MyAxLjQ5Ny4yODgzIDEuMDczIDAgMi4wMDItLjUyMDUuOTI4OS0uNTIwNSAxLjQ4OS0xLjQzMy4wODgxLS4xMzYxLjQyNDQtLjkzNjkuMDY0MS0uMTg0Mi4yNDAyLS4xODQyaDEuNTM4cS4xMDQxIDAgLjE4MDIuMDc2MXQuMDc2MS4xODAyem0uMjAwMi02LjQwNnYzLjU4N3EwIC4yMDgyLS4xNTIyLjM2MDR0LS4zNjA0LjE1MjJoLTMuNTg4cS0uMjA4MiAwLS4zNjA0LS4xNTIyLS4xNS0uMTUtLjE1LS4zNiAwLS4yMDgyLjE1MjItLjM2MDRsMS4xMDUtMS4xMDVxLTEuMTg1LTEuMDk3LTIuNzk1LTEuMDk3LTEuMDczIDAtMi4wMDIuNTIwNS0uOTI4OS41MjA1LTEuNDg5IDEuNDMzLS4wODgxLjEzNjEtLjQyNDQuOTM2OS0uMDY0MS4xODQyLS4yNDAyLjE4NDJoLTEuNTk0cS0uMTA0MSAwLS4xODAyLS4wNzYxdC0uMDc2MS0uMTgwMnYtLjA1NjFxLjUyMDUtMi4xNDYgMi4xNjItMy40Nzl0My44NDQtMS4zMzNxMS4xNjkgMCAyLjI3NC40NDQ0dDEuOTYyIDEuMjUzbDEuMDQxLTEuMDMzcS4xNTIyLS4xNTIyLjM2MDQtLjE1MjJ0LjM2MDQuMTUyMi4xNTIyLjM2MDR6Ii8+Cjwvc3ZnPgo=) no-repeat !important;
    width: 24px;
    height: 24px;
}

.qq-add-img-btn {
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iYSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8cGF0aCBkPSJtNS44NSA1LjA4djEuNzJoNS4wMmMwLjIxNCAwIDAuNDMxIDAuMDI4MyAwLjY1NSAwLjA4MiAwLjA1ODMgMC4wMTc5IDAuMTAyIDAuMDI3MyAwLjEzMSAwLjAyNzMgMC4xMjYgMWUtNyAwLjIzOC0wLjA0NTIgMC4zMzUtMC4xMzVsMC43MTYtMC42NThjMC4xMTctMC4xMDggMC4xNjEtMC4yMzggMC4xMzEtMC4zOTEtMC4wMjkyLTAuMTQzLTAuMTE3LTAuMjQ2LTAuMjYzLTAuMzA5LTAuNTI1LTAuMjI0LTEuMDktMC4zMzYtMS43LTAuMzM2eiIgc3R5bGU9InN0cm9rZS13aWR0aDoxLjA0Ii8+CiA8cGF0aCBkPSJtMy44NyA1LjA4Yy0xLjA3IDAtMS45OCAwLjM4LTIuNzMgMS4xNC0wLjc1NyAwLjc1Ny0xLjE0IDEuNjctMS4xNCAyLjczdjExLjJjMCAxLjA3IDAuMzc5IDEuOTcgMS4xNCAyLjcyIDAuNzU3IDAuNzU3IDEuNjcgMS4xMyAyLjczIDEuMTNoMTEuMmMxLjA3IDAgMS45OC0wLjM3NyAyLjczLTEuMTMgMC43NTctMC43NTcgMS4xNC0xLjY3IDEuMTQtMi43NHYtNC4yN2wtMC4wMDU5IDAuMDExN2MwLTAuMTg4LTAuMDkwMy0wLjMxOS0wLjI3LTAuMzkxLTAuMDUzOC0wLjAyNjktMC4xMDgtMC4wMzkxLTAuMTYyLTAuMDM5MS0wLjExNiAwLTAuMjE5IDAuMDQ1Mi0wLjMwOSAwLjEzNWwtMC44NTkgMC44NTljLTAuMDgwNiAwLjA4MDYtMC4xMjEgMC4xNzgtMC4xMjEgMC4yOTV2My40MWMwIDAuNTkyLTAuMjEyIDEuMS0wLjYzMyAxLjUyLTAuNDIxIDAuNDIxLTAuOTI2IDAuNjMzLTEuNTIgMC42MzNoLTExLjJjLTAuNTkyIDAtMS4xLTAuMjEyLTEuNTItMC42MzMtMC40MjEtMC40MjEtMC42MzMtMC45MjYtMC42MzMtMS41MnYtMTEuMmMwLTAuNTkyIDAuMjEyLTEuMSAwLjYzMy0xLjUyIDAuNDIxLTAuNDIxIDAuOTI4LTAuNjMzIDEuNTItMC42MzNoMy41NXYtMS43MnoiLz4KIDxwYXRoIGQ9Im0yMC41IDEwLjQtMTAuOSAxMC45Yy0wLjYxIDAuNDY5LTAuOTgyIDAuMjU3LTEuNTMgMGwtNS43OC01Ljc4Yy0wLjIxNS0wLjIxNS0wLjMyMi0wLjQ3LTAuMzIyLTAuNzY2czAuMTA4LTAuNTUxIDAuMzIyLTAuNzY2bDEuNDgtMS40OGMwLjIxNS0wLjIxNSAwLjQ3LTAuMzIyIDAuNzY2LTAuMzIyczAuNTUxIDAuMTA4IDAuNzY2IDAuMzIybDMuNTMgMy41MyA4LjctOC43YzAuMjE1LTAuMjE1IDAuNDctMC4zMjIgMC43NjYtMC4zMjJzMC41NTEgMC4xMDggMC43NjYgMC4zMjJsMS40OCAxLjQ4YzAuMjE1IDAuMjE1IDAuMzIyIDAuNDcgMC4zMjIgMC43NjZzLTAuMTA4IDAuNTUxLTAuMzIyIDAuNzY2eiIgc3Ryb2tlLXdpZHRoPSIuMDEzNCIgc3R5bGU9ImZpbGw6I2ZmZiIvPgogPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjk1MyAwIDAgLjk1MyA1LjkzIC0yMSkiIHN0cm9rZS13aWR0aD0iLjAxMzQiPgogIDxwYXRoIGQ9Im00OC42IDQuNDMtMTAuOSAxMC45Yy0wLjYxIDAuNDY5LTAuOTgyIDAuMjU3LTEuNTMgMGwtNS43OC01Ljc4Yy0wLjIxNS0wLjIxNS0wLjMyMi0wLjQ3LTAuMzIyLTAuNzY2czAuMTA4LTAuNTUxIDAuMzIyLTAuNzY2bDEuNDgtMS40OGMwLjIxNS0wLjIxNSAwLjQ3LTAuMzIyIDAuNzY2LTAuMzIyIDAuMjk2IDAgMC41NTEgMC4xMDggMC43NjYgMC4zMjJsMy41MyAzLjUzIDguNy04LjdjMC4yMTUtMC4yMTUgMC40Ny0wLjMyMiAwLjc2Ni0wLjMyMnMwLjU1MSAwLjEwOCAwLjc2NiAwLjMyMmwxLjQ4IDEuNDhjMC4yMTUgMC4yMTUgMC4zMjIgMC40NyAwLjMyMiAwLjc2NnMtMC4xMDggMC41NTEtMC4zMjIgMC43NjZ6Ii8+CiAgPHBhdGggZD0ibTQ4LjYgMC4yNzctMTAuOSAxMC45Yy0wLjYxIDAuNDY5LTAuOTgyIDAuMjU3LTEuNTMgMGwtNS43OC01Ljc4Yy0wLjIxNS0wLjIxNS0wLjMyMi0wLjQ3LTAuMzIyLTAuNzY2czAuMTA4LTAuNTUxIDAuMzIyLTAuNzY2bDEuNDgtMS40OGMwLjIxNS0wLjIxNSAwLjQ3LTAuMzIyIDAuNzY2LTAuMzIyIDAuMjk2IDAgMC41NTEgMC4xMDggMC43NjYgMC4zMjJsMy41MyAzLjUzIDguNy04LjdjMC4yMTUtMC4yMTUgMC40Ny0wLjMyMiAwLjc2Ni0wLjMyMnMwLjU1MSAwLjEwOCAwLjc2NiAwLjMyMmwxLjQ4IDEuNDhjMC4yMTUgMC4yMTUgMC4zMjIgMC40NyAwLjMyMiAwLjc2NnMtMC4xMDggMC41NTEtMC4zMjIgMC43NjZ6IiBzdHlsZT0iZmlsbDojZmZmIi8+CiAgPHBhdGggZD0ibTQ4LjYtMC4zMTktMTAuOSAxMC45Yy0wLjYxIDAuNDY5LTAuOTgyIDAuMjU3LTEuNTMgMGwtNS43OC01Ljc4Yy0wLjIxNS0wLjIxNS0wLjMyMi0wLjQ3LTAuMzIyLTAuNzY2czAuMTA4LTAuNTUxIDAuMzIyLTAuNzY2bDEuNDgtMS40OGMwLjIxNS0wLjIxNSAwLjQ3LTAuMzIyIDAuNzY2LTAuMzIyIDAuMjk2IDAgMC41NTEgMC4xMDggMC43NjYgMC4zMjJsMy41MyAzLjUzIDguNy04LjdjMC4yMTUtMC4yMTUgMC40Ny0wLjMyMiAwLjc2Ni0wLjMyMnMwLjU1MSAwLjEwOCAwLjc2NiAwLjMyMmwxLjQ4IDEuNDhjMC4yMTUgMC4yMTUgMC4zMjIgMC40NyAwLjMyMiAwLjc2NiAwIDAuMjk2LTAuMTA4IDAuNTUxLTAuMzIyIDAuNzY2eiIvPgogPC9nPgogPHBhdGggZD0ibTE5LjcgOC42NS05LjE5IDkuMTljLTAuMTk3IDAuMTk3LTAuNDMgMC4yOTUtMC43MDEgMC4yOTUtMC4yNzEgMC0wLjUwNi0wLjA5NzgtMC43MDMtMC4yOTVsLTQuNDMtNC40My0wLjg0IDAuODRjLTAuMTk3IDAuMTk3LTAuMjk3IDAuNDMtMC4yOTcgMC43MDEgMCAwLjI3MSAwLjA5OTggMC41MDYgMC4yOTcgMC43MDNsNS4yOSA1LjNjMC4xOTcgMC4xOTcgMC40MyAwLjI5NSAwLjcwMSAwLjI5NSAwLjI3MSAwIDAuNTA2LTAuMDk3OCAwLjcwMy0wLjI5NWwxMC0xMGMwLjE5Ny0wLjE5NyAwLjI5Ny0wLjQzMiAwLjI5Ny0wLjcwM3MtMC4wOTk4LTAuNTA0LTAuMjk3LTAuNzAxeiIgc3R5bGU9InN0cm9rZS13aWR0aDouOTE3Ii8+CiA8cGF0aCBkPSJtMjAuNSA2LjExLTEwIDEwcS0wLjI5NiAwLjI5Ni0wLjcwMiAwLjI5NnQtMC43MDItMC4yOTZsLTUuMjktNS4zcS0wLjI5Ni0wLjI5Ni0wLjI5Ni0wLjcwMiAwLTAuNDA3IDAuMjk2LTAuNzAybDEuMzUtMS4zNXEwLjI5Ni0wLjI5NiAwLjcwMi0wLjI5NiAwLjQwNyAwIDAuNzAyIDAuMjk2bDMuMjQgMy4yNCA3Ljk3LTcuOTdxMC4yOTYtMC4yOTYgMC43MDItMC4yOTYgMC40MDcgMCAwLjcwMiAwLjI5NmwxLjM1IDEuMzVxMC4yOTYgMC4yOTYgMC4yOTYgMC43MDIgMCAwLjQwNy0wLjI5NiAwLjcwMnoiIHN0eWxlPSJzdHJva2Utd2lkdGg6LjkxNyIvPgo8L3N2Zz4K) no-repeat !important;
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.qq-excellent-img-btn {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgaGVpZ2h0PSIyNCIKICAgdmlld0JveD0iMCAwIDI0IDI0IgogICB3aWR0aD0iMjQiCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzMyMjMiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImJ0bl9leGNlbGxlbnQuc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjAuMiAoZTg2Yzg3MDg3OSwgMjAyMS0wMS0xNSwgY3VzdG9tKSI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzIyOSI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGUgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGRlZnMKICAgICBpZD0iZGVmczMyMjciIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTgiCiAgICAgaWQ9Im5hbWVkdmlldzMyMjUiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjE1LjE3ODU3MSIKICAgICBpbmtzY2FwZTpjeD0iMTAuMTk4MzQ2IgogICAgIGlua3NjYXBlOmN5PSI5LjUyMDgzMDIiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii02IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItNiIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzMyMjMiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtcm90YXRpb249IjAiIC8+CiAgPHBhdGgKICAgICBkPSJNIDguMjUsMjAuMjUgUSA4LjI1LDE5Ljk0NTMxIDguMDI3MzQsMTkuNzIyNjYgNy44MDQ2OSwxOS41IDcuNSwxOS41IDcuMTgzNTksMTkuNSA2Ljk2NjgsMTkuNzIyNjYgNi43NSwxOS45NDUzMTEgNi43NSwyMC4yNSBxIDAsMC4zMTY0MSAwLjIxNjgsMC41MzMyIFEgNy4xODM1OSwyMSA3LjUsMjEgNy44MDQ2OSwyMSA4LjAyNzM0LDIwLjc4MzIgOC4yNSwyMC41NjY0MSA4LjI1LDIwLjI1IFogbSAxLjg3NSwtNiB2IDcuNSBxIDAsMC4zMDQ2OSAtMC4yMjI2NiwwLjUyNzM0IFEgOS42Nzk2OSwyMi41IDkuMzc1LDIyLjUgSCA2IFEgNS42OTUzMSwyMi41IDUuNDcyNjYsMjIuMjc3MzQgNS4yNSwyMi4wNTQ2OSA1LjI1LDIxLjc1IHYgLTcuNSBxIDAsLTAuMzA0NjkgMC4yMjI2NiwtMC41MjczNCBRIDUuNjk1MzEsMTMuNSA2LDEzLjUgaCAzLjM3NSBxIDAuMzA0NjksMCAwLjUyNzM0LDAuMjIyNjYgUSAxMC4xMjUsMTMuOTQ1MzEgMTAuMTI1LDE0LjI1IFogbSAxMy44NzUsMCBxIDAsMS4wMDc4MSAtMC42NDQ1MywxLjc0NjA5IDAuMTc1NzgsMC41MTU2MyAwLjE3NTc4LDAuODkwNjMgMC4wMzUyLDAuODkwNjIgLTAuNTAzOTEsMS42MDU0NyAwLjE5OTIyLDAuNjU2MjUgMCwxLjM3MTA5IC0wLjE3NTc4LDAuNjY3OTcgLTAuNjMyODEsMS4xMDE1NiAwLjEwNTQ3LDEuMzEyNSAtMC41NzQyMiwyLjEyMTEgLTAuNzUsMC44OTA2MiAtMi4zMDg1OSwwLjkxNDA2IEggMTggUSAxNy4yMjY1NiwyNCAxNi4zMTI1LDIzLjgxODM2IDE1LjM5ODQ0LDIzLjYzNjcyIDE0Ljg4ODY3LDIzLjQ3ODUyIDE0LjM3ODkxLDIzLjMyMDMxIDEzLjQ3NjU2LDIzLjAxNTYyIDEyLjAzNTE2LDIyLjUxMTcyIDExLjYyNSwyMi41IDExLjMyMDMxLDIyLjQ4ODMgMTEuMDk3NjYsMjIuMjcxNDggMTAuODc1LDIyLjA1NDY5IDEwLjg3NSwyMS43NSB2IC03LjUxMTcyIHEgMCwtMC4yOTI5NyAwLjIxMDk0LC0wLjUwOTc2IDAuMjEwOTQsLTAuMjE2OCAwLjUwMzksLTAuMjQwMjQgMC4yODEyNSwtMC4wMjM0IDAuODkwNjMsLTAuNjkxNDEgMC42MDkzNywtMC42Njc5NiAxLjE4MzU5LC0xLjQxNzk2IDAuNzk2ODgsLTEuMDE5NTQgMS4xODM2LC0xLjQwNjI1IDAuMjEwOTMsLTAuMjEwOTQgMC4zNjMyOCwtMC41NjI1IDAuMTUyMzQsLTAuMzUxNTcgMC4yMDUwOCwtMC41NjgzNiAwLjA1MjcsLTAuMjE2OCAwLjE1ODIsLTAuNzA4OTkgMC4wODIsLTAuNDU3MDMgMC4xNDY0OCwtMC43MTQ4NCBRIDE1Ljc4NTIsNy4xNjAxNiAxNS45NDkyMiw2LjgwODU5IDE2LjExMzI4LDYuNDU3MDMgMTYuMzQ3NjYsNi4yMjI2NiAxNi41NzAzMSw2IDE2Ljg3NSw2IHEgMC41MzkwNiwwIDAuOTY2OCwwLjEyMzA1IDAuNDI3NzMsMC4xMjMwNCAwLjcwMzEyLDAuMzA0NjggMC4yNzUzOSwwLjE4MTY0IDAuNDY4NzUsMC40NzQ2MSAwLjE5MzM2LDAuMjkyOTcgMC4yODEyNSwwLjUyNzM1IDAuMDg3OSwwLjIzNDM3IDAuMTQwNjMsMC41ODU5MyAwLjA1MjcsMC4zNTE1NyAwLjA1ODYsMC41MjczNSAwLjAwNiwwLjE3NTc4IDAuMDA2LDAuNDU3MDMgMCwwLjQ0NTMxIC0wLjExMTMzLDAuODkwNjIgLTAuMTExMzMsMC40NDUzMiAtMC4yMjI2NSwwLjcwMzEzIC0wLjExMTMzLDAuMjU3ODEgLTAuMzIyMjcsMC42NTYyNSAtMC4wMzUyLDAuMDcwMyAtMC4xMTcxOSwwLjIxMDk0IC0wLjA4MiwwLjE0MDYyIC0wLjEyODksMC4yNTc4MSAtMC4wNDY5LDAuMTE3MTkgLTAuMDkzNywwLjI4MTI1IGggMy4yNDYwOSBxIDAuOTE0MDYsMCAxLjU4MjAzLDAuNjY3OTcxIDAuNjY3OTcsMC42Njc5NyAwLjY2Nzk3LDEuNTgyMDMgeiIKICAgICBpZD0icGF0aDMyMzEiCiAgICAgc3R5bGU9ImZpbGw6IzAwODAwMDtzdHJva2Utd2lkdGg6MC4wMTE3MTg4IiAvPgo8L3N2Zz4K) no-repeat !important;
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.qq-good-img-btn {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjI0IgogICBoZWlnaHQ9IjI0IgogICB2ZXJzaW9uPSIxLjEiCiAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgaWQ9InN2ZzY4IgogICBzb2RpcG9kaTpkb2NuYW1lPSJidG5fZ29vZC5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMC4yIChlODZjODcwODc5LCAyMDIxLTAxLTE1LCBjdXN0b20pIj4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE3NCI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGRlZnMKICAgICBpZD0iZGVmczcyIiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDE4IgogICAgIGlkPSJuYW1lZHZpZXc3MCIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMzUuNDE2NjY3IgogICAgIGlua3NjYXBlOmN4PSIxMiIKICAgICBpbmtzY2FwZTpjeT0iMTcuNjQ3MDU5IgogICAgIGlua3NjYXBlOndpbmRvdy14PSItNiIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTYiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmc2OCIgLz4KICA8cGF0aAogICAgIGQ9Im0gMTAuMTQ0MSwyMC41Mzg4IHEgMCwtMC4yODEgLTAuMjA2LC0wLjQ4NyAtMC4yMDYsLTAuMjA2IC0wLjQ4NywtMC4yMDYgLTAuMjgxLDAgLTAuNDg3LDAuMjA2IC0wLjIwNiwwLjIwNiAtMC4yMDYsMC40ODcgMCwwLjI4MSAwLjIwNiwwLjQ4NyAwLjIwNiwwLjIwNiAwLjQ4NywwLjIwNiAwLjI4MSwwIDAuNDg3LC0wLjIwNiAwLjIwNiwtMC4yMDYgMC4yMDYsLTAuNDg3IHogbSAxMi41LC02LjIzIHEgMCwtMC41NTIgLTAuNDIyLC0wLjk2OCAtMC40MjIsLTAuNDE2IC0wLjk2MywtMC40MTYgaCAtMy44MSBxIDAsLTAuNjI3IDAuNTE5LC0xLjczIDAuNTE5LC0xLjEgMC41MTksLTEuNzQgMCwtMS4wNiAtMC4zNDYsLTEuNTcgLTAuMzQ2LC0wLjUwOCAtMS4zOCwtMC41MDggLTAuMjgxLDAuMjgxIC0wLjQxMSwwLjkxOSAtMC4xMywwLjYzOCAtMC4zMywxLjM2IC0wLjIsMC43MTkgLTAuNjQ0LDEuMTggLTAuMjM4LDAuMjQ5IC0wLjgzMywwLjk4NCAtMC4wNDMzLDAuMDU0MSAtMC4yNDksMC4zMjUgLTAuMjA2LDAuMjcgLTAuMzQxLDAuNDQ0IC0wLjEzNSwwLjE3MyAtMC4zNzMsMC40NiAtMC4yMzgsMC4yODcgLTAuNDMzLDAuNDc2IC0wLjE5NSwwLjE4OSAtMC40MTYsMC4zODQgLTAuMjIyLDAuMTk1IC0wLjQzMywwLjI5MiAtMC4yMTEsMC4wOTc0IC0wLjM4NCwwLjA5NzQgaCAtMC4zNDYgdiA2LjkyIGggMC4zNDYgcSAwLjE0MSwwIDAuMzQxLDAuMDMyNSAwLjIsMC4wMzI1IDAuMzU3LDAuMDcwMyAwLjE1NywwLjAzNzkgMC40MTEsMC4xMTkgMC4yNTQsMC4wODExIDAuMzc5LDAuMTI0IDAuMTI0LDAuMDQzMyAwLjM4NCwwLjEzNSAwLjI2LDAuMDkyIDAuMzE0LDAuMTE0IDIuMjgsMC43OSAzLjcsMC43OSBoIDEuMzEgcSAyLjA4LDAgMi4wOCwtMS44MSAwLC0wLjI4MSAtMC4wNTQxLC0wLjYwNiAwLjMyNSwtMC4xNzMgMC41MTQsLTAuNTY4IDAuMTg5LC0wLjM5NSAwLjE4OSwtMC43OTUgMCwtMC40IC0wLjE5NSwtMC43NDYgMC41NzMsLTAuNTQxIDAuNTczLC0xLjI5IDAsLTAuMjcgLTAuMTA4LC0wLjYgLTAuMTA4LC0wLjMzIC0wLjI3LC0wLjUxNCAwLjM0NiwtMC4wMTA4IDAuNTc5LC0wLjUwOCAwLjIzMywtMC40OTggMC4yMzMsLTAuODc2IHogbSAxLjM4LC0wLjAxMDggcSAwLDAuOTYzIC0wLjUzLDEuNzYgMC4wOTc0LDAuMzU3IDAuMDk3NCwwLjc0NiAwLDAuODMzIC0wLjQxMSwxLjU2IDAuMDMyNSwwLjIyNyAwLjAzMjUsMC40NjUgMCwxLjA5IC0wLjY0OSwxLjkzIDAuMDEwOCwxLjUgLTAuOTE5LDIuMzcgUSAyMC43MTUsMjQgMTkuMTg1LDI0IGggLTEuNCBxIC0xLjA0LDAgLTIuMDUsLTAuMjQzIC0xLjAxLC0wLjI0MyAtMi4zNCwtMC43MDkgLTEuMjUsLTAuNDMzIC0xLjQ5LC0wLjQzMyBoIC0zLjEyIHEgLTAuNTczLDAgLTAuOTc5LC0wLjQwNiBRIDcuNCwyMS44MDMgNy40LDIxLjIzIHYgLTYuOTIgcSAwLC0wLjU3MyAwLjQwNiwtMC45NzkgMC40MDYsLTAuNDA2IDAuOTc5LC0wLjQwNiBoIDIuOTYgcSAwLjM4OSwtMC4yNiAxLjQ4LC0xLjY4IDAuNjI3LC0wLjgxMSAxLjE2LC0xLjM4IDAuMjYsLTAuMjcgMC4zODQsLTAuOTI1IDAuMTI0LC0wLjY1NCAwLjMzLC0xLjM3IFEgMTUuMzA1LDYuODU2IDE1Ljc3LDYuNCAxNi4xOTIsNiAxNi43NDQsNiBxIDAuOTA5LDAgMS42MywwLjM1MiAwLjcyNSwwLjM1MiAxLjEsMS4xIDAuMzc5LDAuNzQ2IDAuMzc5LDIuMDEgMCwxLjAxIC0wLjUxOSwyLjA4IGggMS45IHEgMS4xMiwwIDEuOTUsMC44MjIgMC44MjIsMC44MjIgMC44MjIsMS45NCB6IgogICAgIHN0eWxlPSJmaWxsOiMwMDgwMDA7c3Ryb2tlLXdpZHRoOjAuMDEwOCIKICAgICBpZD0icGF0aDY2IiAvPgo8L3N2Zz4K) no-repeat !important;
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.qq-warning-img-btn {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgY29udGVudFNjcmlwdFR5cGU9InRleHQvZWNtYXNjcmlwdCIKICAgY29udGVudFN0eWxlVHlwZT0idGV4dC9jc3MiCiAgIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwNDggMjA0OCIKICAgaGVpZ2h0PSIyNCIKICAgaWQ9IkxheWVyXzEiCiAgIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiCiAgIHZlcnNpb249IjEuMSIKICAgdmlld0JveD0iLTcuMzMzMDAwMiAwIDI0IDI0IgogICB3aWR0aD0iMjQiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIHpvb21BbmRQYW49Im1hZ25pZnkiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImJ0bl93YXJuaW5nLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4wLjIgKGU4NmM4NzA4NzksIDIwMjEtMDEtMTUsIGN1c3RvbSkiPjxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTMxNzgiPjxyZGY6UkRGPjxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PGRjOnRpdGxlIC8+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzCiAgICAgaWQ9ImRlZnMzMTc2IiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDE4IgogICAgIGlkPSJuYW1lZHZpZXczMTc0IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSI4IgogICAgIGlua3NjYXBlOmN4PSI0MC4xNzA4ODIiCiAgICAgaW5rc2NhcGU6Y3k9IjI4LjM0MjEwNiIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTYiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii02IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0iTGF5ZXJfMSIKICAgICBpbmtzY2FwZTpvYmplY3QtcGF0aHM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1pbnRlcnNlY3Rpb24tcGF0aHM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1zbW9vdGgtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1taWRwb2ludHM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1jZW50ZXI9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1vYmplY3QtbWlkcG9pbnRzPSJ0cnVlIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXJvdGF0aW9uPSIwIiAvPjxwYXRoCiAgICAgZD0ibSA4LjM1NDg4ODYsMjAuODczNzk4IHYgLTIuMDU1MjgyIGMgMCwtMC4xMDA5MTQgLTAuMDM0MjU4LC0wLjE4NTY5OSAtMC4xMDI3NjQxLC0wLjI1NDIwNSAtMC4wNjg1MDYsLTAuMDY4NDYgLTAuMTQ5NjM1OSwtMC4xMDI3NDYgLTAuMjQzMzg5OSwtMC4xMDI3NDYgSCA1LjkzMTgxMTggYyAtMC4wOTM3NTQsMCAtMC4xNzQ4ODMzLDAuMDM0MjggLTAuMjQzMzg5NywwLjEwMjc0NiAtMC4wNjg1MDYsMC4wNjg0NiAtMC4xMDI3NjQsMC4xNTMyNDkgLTAuMTAyNzY0LDAuMjU0MjA1IHYgMi4wNTUyODIgYyAwLDAuMTAwOTE0IDAuMDM0MjU4LDAuMTg1Njk5IDAuMTAyNzY0LDAuMjU0MjE2IDAuMDY4NTA2LDAuMDY4NDYgMC4xNDk2MzU5LDAuMTAyNzQ3IDAuMjQzMzg5NywwLjEwMjc0NyBoIDIuMDc2OTIyNyBjIDAuMDkzNzU0LDAgMC4xNzQ4ODM3LC0wLjAzNDI5IDAuMjQzMzg5NywtMC4xMDI3NDcgMC4wNjg1MDYsLTAuMDY4NTcgMC4xMDI3NjQxLC0wLjE1MzI1OSAwLjEwMjc2NDQsLTAuMjU0MjE2IHogbSAtMC4wMjE2MzUsLTQuMDQ1NjcyIDAuMTk0NzExNSwtNC45NjUxNDIgYyAwLC0wLjA4NjU3IC0wLjAzNjA1NCwtMC4xNTUwMzcgLTAuMTA4MTczLC0wLjIwNTUyNiAtMC4wOTM3NTMsLTAuMDc5MzUgLTAuMTgwMjkyLC0wLjExODk5NSAtMC4yNTk2MTU0LC0wLjExODk5NSBoIC0yLjM3OTgwNyBjIC0wLjA3OTMyMywwIC0wLjE2NTg2MTcsMC4wMzk2OCAtMC4yNTk2MTU1LDAuMTE4OTk1IC0wLjA3MjExOSwwLjA1MDQ2IC0wLjEwODE3MjgsMC4xMjYyMDcgLTAuMTA4MTcyOCwwLjIyNzE2NCBsIDAuMTgzODk0LDQuOTQzNTA0IGMgMCwwLjA3MjEzIDAuMDM2MDU0LDAuMTMxNjIgMC4xMDgxNzMzLDAuMTc4NDg3IDAuMDcyMTE5LDAuMDQ2OSAwLjE1ODY1NzIsMC4wNzAyOSAwLjI1OTYxNSwwLjA3MDI5IGggMi4wMDEyMDE2IGMgMC4xMDA5NTg2LDAgMC4xODU3MDEsLTAuMDIzNCAwLjI1NDIwNjcsLTAuMDcwMjkgMC4wNjg1MDYsLTAuMDQ2OSAwLjEwNjM2NjMsLTAuMTA2NDEzIDAuMTEzNTgxNiwtMC4xNzg0ODcgeiBNIDguMTgxODExMSw2LjcyNDc2MSAxNi40ODk1MDIsMjEuOTU1NTMxIGMgMC4yNTI0MDEsMC40NTQzMjggMC4yNDUxOTYsMC45MDg2NTggLTAuMDIxNjQsMS4zNjI5ODUgLTAuMTIyNTkyLDAuMjA5MTI4IC0wLjI5MDI2LDAuMzc1IC0wLjUwMzAwNSwwLjQ5NzU5NSAtMC4yMTI3NDMsMC4xMjI1OTYgLTAuNDQxNzAzLDAuMTgzODg4IC0wLjY4Njg5OSwwLjE4Mzg4OCBIIC0xLjMzNzQxNzcgYyAtMC4yNDUxOTU5LDAgLTAuNDc0MTU0OSwtMC4wNjEyNCAtMC42ODY4OTg4LC0wLjE4Mzg4OCAtMC4yMTI3NDM5LC0wLjEyMjU5NSAtMC4zODA0MTIyLC0wLjI4ODQ2NyAtMC41MDMwMDQ3LC0wLjQ5NzU5NSAtMC4yNjY4MzA0LC0wLjQ1NDMyNyAtMC4yNzQwMzQ4LC0wLjkwODY1NyAtMC4wMjE2MzUsLTEuMzYyOTg1IEwgNS43NTg3MzQ2LDYuNzI0NzYxIEMgNS44ODEzMjc1LDYuNTAxMTk2OSA2LjA1MDgwMTksNi4zMjQ1MjE0IDYuMjY3MTQ4Miw2LjE5NDcxMjkgNi40ODM0OTQzLDYuMDY0OTA0MyA2LjcxNzg3MjcsNiA2Ljk3MDI3MjgsNiA3LjIyMjY3MzEsNiA3LjQ1NzA1MTcsNi4wNjQ5MDQgNy42NzMzOTc4LDYuMTk0NzEyOSA3Ljg4OTc0MzksNi4zMjQ1MjE0IDguMDU5MjE5Miw2LjUwMTE5NjkgOC4xODE4MTExLDYuNzI0NzYxIFoiCiAgICAgaWQ9InBhdGgzMTcxIgogICAgIHN0eWxlPSJmaWxsOiNmZjY2MDA7c3Ryb2tlLXdpZHRoOjAuMDEwODE3MyIgLz48L3N2Zz4K) no-repeat !important;
    width: 24px;
    height: 24px;
    cursor: pointer;
}


.qq-error-img-btn {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgaWQ9IlNWR1Jvb3QiCiAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgdmVyc2lvbj0iMS4xIgogICBzb2RpcG9kaTpkb2NuYW1lPSJidG5fZXJyb3Iuc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjAuMiAoZTg2Yzg3MDg3OSwgMjAyMS0wMS0xNSwgY3VzdG9tKSI+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMjYiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMyNCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTAxOCIKICAgICBpZD0ibmFtZWR2aWV3MjIiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjExLjMxMzcwOSIKICAgICBpbmtzY2FwZTpjeD0iLTE1LjUyOTQ5NSIKICAgICBpbmtzY2FwZTpjeT0iMTkuODIzMzAxIgogICAgIGlua3NjYXBlOndpbmRvdy14PSItNiIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTYiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJTVkdSb290IgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6YmJveC1wYXRocz0iZmFsc2UiCiAgICAgaW5rc2NhcGU6c25hcC1iYm94LWVkZ2UtbWlkcG9pbnRzPSJmYWxzZSIKICAgICBpbmtzY2FwZTpzbmFwLWNlbnRlcj0idHJ1ZSIKICAgICBpbmtzY2FwZTpzbmFwLXBhZ2U9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1pbnRlcnNlY3Rpb24tcGF0aHM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1zbW9vdGgtbm9kZXM9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC1vYmplY3QtbWlkcG9pbnRzPSJ0cnVlIgogICAgIGlua3NjYXBlOnNuYXAtZ3JpZHM9ImZhbHNlIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXJvdGF0aW9uPSIwIiAvPgogIDxwYXRoCiAgICAgZD0ibSAyMC4yNSwxNS43NSB2IC0xLjUgcSAwLC0wLjMwNDY5IC0wLjIyMjY2LC0wLjUyNzM0IFEgMTkuODA0NjksMTMuNSAxOS41LDEzLjUgaCAtOSBxIC0wLjMwNDY5LDAgLTAuNTI3MzQsMC4yMjI2NiBRIDkuNzUsMTMuOTQ1MzEgOS43NSwxNC4yNSB2IDEuNSBxIDAsMC4zMDQ2OSAwLjIyMjY2LDAuNTI3MzQgUSAxMC4xOTUzMSwxNi41IDEwLjUsMTYuNSBoIDkgcSAwLjMwNDY5LDAgMC41MjczNCwtMC4yMjI2NiBRIDIwLjI1LDE2LjA1NDY5IDIwLjI1LDE1Ljc1IFogTSAyNCwxNSBxIDAsMi40NDkyMiAtMS4yMDcwMyw0LjUxNzU4IC0xLjIwNzAzLDIuMDY4MzYgLTMuMjc1MzksMy4yNzUzOSBRIDE3LjQ0OTIyLDI0IDE1LDI0IDEyLjU1MDc4LDI0IDEwLjQ4MjQyLDIyLjc5Mjk3IDguNDE0MDYsMjEuNTg1OTQgNy4yMDcwMywxOS41MTc1OCA2LDE3LjQ0OTIyIDYsMTUgNiwxMi41NTA3OCA3LjIwNzAzLDEwLjQ4MjQyIDguNDE0MDYsOC40MTQwNiAxMC40ODI0Miw3LjIwNzAzIDEyLjU1MDc4LDYgMTUsNiBxIDIuNDQ5MjIsMCA0LjUxNzU4LDEuMjA3MDMgMi4wNjgzNiwxLjIwNzAzIDMuMjc1MzksMy4yNzUzOSBRIDI0LDEyLjU1MDc4IDI0LDE1IFoiCiAgICAgaWQ9InBhdGgzMDEwIgogICAgIHN0eWxlPSJmaWxsOiNkNDAwMDA7c3Ryb2tlLXdpZHRoOjAuMDExNzE4OCIgLz4KPC9zdmc+Cg==) no-repeat !important;
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.image-added .qq-add-img-btn, .image-added .qq-add-img-fast-btn {
    filter: invert(1) brightness(0.3) sepia(1) hue-rotate(80deg) saturate(5);
}


.image-good .qq-add-img-btn, .image-good .qq-add-img-fast-btn {
    filter: invert(1) brightness(0.3) sepia(1) hue-rotate(80deg) saturate(7);
}

.image-bad .qq-add-img-btn, .image-bad .qq-add-img-fast-btn {
    filter: invert(1) brightness(0.3) sepia(1) hue-rotate(80deg) saturate(9);
}

.qq-rating-btn {
    font-weight: bold;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    line-height: 2em;
    text-decoration: underline;
}

.qq.box .qq-rating-btn, .qq.qq-box .qq-rating-btn{
    width: 48px;
    height: 24px;
}

.qq.horizontal .qq-rating-btn, .qq.qq-horizontal .qq-rating-btn  {
    width: 24px;
    height: 24px;
}

.qq.vertical .qq-rating-btn, .qq.qq-vertical .qq-rating-btn {
    width: 24px;
}

.qq-rating-btn.qq-excellent {
    color: #25b50a !important;
}

.qq-rating-btn.qq-good {
    color: #dfa918ff !important;
}

.qq-rating-btn.qq-bad {
    color: #da4c4cff !important;
}

.qq-rating-btn.qq-not-available {
    display: none !important;
}

a.qq-rating-btn.qq-loading {
    display: none !important;
}

.qq-off {
    display: none !important;
}

.qq-edit-btn.qq-loading, .qq-add-btn.qq-loading {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSIxOXB4IiBoZWlnaHQ9IjE5cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48Y2lyY2xlIGN4PSIxNiIgY3k9IjY0IiByPSIxNiIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIxIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSI2NCIgcj0iMTQuMzQ0IiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIHRyYW5zZm9ybT0icm90YXRlKDQ1IDY0IDY0KSIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iNjQiIHI9IjEyLjUzMSIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIxIiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NCA2NCkiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjY0IiByPSIxMC43NSIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIxIiB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgNjQgNjQpIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSI2NCIgcj0iMTAuMDYzIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2NCA2NCkiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjY0IiByPSI4LjA2MyIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIxIiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgNjQgNjQpIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSI2NCIgcj0iNi40MzgiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMSIgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDY0IDY0KSIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iNjQiIHI9IjUuMzc1IiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIHRyYW5zZm9ybT0icm90YXRlKDMxNSA2NCA2NCkiLz48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDY0IDY0OzMxNSA2NCA2NDsyNzAgNjQgNjQ7MjI1IDY0IDY0OzE4MCA2NCA2NDsxMzUgNjQgNjQ7OTAgNjQgNjQ7NDUgNjQgNjQiIGNhbGNNb2RlPSJkaXNjcmV0ZSIgZHVyPSI3MjBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2c+PC9zdmc+) no-repeat !important;
    width: 24px;
    height: 24px;
    background-position-y: bottom !important;
}

.qq-not-active {
    pointer-events: none;
    cursor: default;
    filter: opacity(20%);
}

.qq.horizontal.qq-rating-off, .qq.qq-horizontal.qq-rating-off {
    width: 48px;
}

.qq.vertical.qq-rating-off, .qq.qq-vertical.qq-rating-off {
    height: 48px;
}

.qq.box.qq-rating-off, .qq.qq-box.qq-rating-off {
    width: 48px;
}
/*-------------------------------------------------------*/
.qq-fly-btn {
    cursor: pointer;
    position: absolute;
    top: -18px;
    height: 18px;
    display: none;
    z-index: 10000;
}

.qq-vertical .qq-fly-btn {
    transform: rotate(270deg);
    top: 17px;
    left: 12px;
}

.qq-fly-btn label.qq-switch {
    display: inline-block !important;
    width: 44px !important;
    height: 18px !important;
}

.qq-fly-btn label.qq-switch input {
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
}

.qq-fly-btn span.qq-slider {
    position: absolute !important;
    cursor: pointer !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background-color: #ccc !important;;
    transition: .4s !important;;
    border-radius: 24px !important;;
}

.qq-fly-btn span.qq-slider:before {
    all: initial;
    position: absolute !important;
    border-radius: 50% !important;
    content: "" !important;
    height: 14px !important;
    width: 14px !important;
    left: 2px !important;
    bottom: 2px !important;
    transition: .4s !important;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDE0IDE0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxnIHRyYW5zZm9ybT0ibWF0cml4KC4wNDcgMCAwIC4wNDcgLS4wMDAxNCAtLjAwMDI4KSIgZmlsbD0iI2ZmZiI+DQogIDxnIGZpbGw9IiNmZmYiPg0KICAgPHBhdGggZD0ibTE1MCAwYy04MyAwLTE1MCA2Ny0xNTAgMTUwczY3IDE1MCAxNTAgMTUwIDE1MC02NyAxNTAtMTUwLTY3LTE1MC0xNTAtMTUwem03MyA5OS0zMiAzMSAyMSA4My0xMiAxMi0zOS02NC0wLjktMC45LTQwIDM4Yy0wLjIzIDAuMjMtMC40OCAwLjQtMC43MiAwLjYybC0xLjMgMjktNDUtNDUgMjktMS4zYzAuMjItMC4yNCAwLjM5LTAuNDkgMC42Mi0wLjcybDM4LTQwLTAuMzItMC4zMy02NS00MCAxMi0xMiA4MiAyMSAzMS0zM2M2LjItNi4yIDE2LTYuMiAyMiAwIDYuMiA2LjIgNi4yIDE2LTJlLTMgMjJ6IiBmaWxsPSIjZmZmIi8+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==) no-repeat !important;
}

.qq-vertical .qq-fly-btn span.qq-slider:before {
    transform: rotate(90deg) !important;
}

.qq-fly-btn input:checked + span.qq-slider {
    background-color: #2196F3 !important;

}

.qq-fly-btn input:focus + span.qq-slider {
    all: initial;
    box-shadow: 0 0 1px #2196F3 !important;
}

.qq-fly-btn input:checked + span.qq-slider:before {
    transform: translateX(26px) !important;
}

.qq-fly-btn input:checked + span.qq-slider:after {
   all: initial !important;
}

.qq-vertical .qq-fly-btn input:checked + span.qq-slider:before {
    transform: translateX(26px) rotate(90deg) !important;
}
/*for ask key popup*/

.qq-quicklogin-popup-background, .qq-alert-popup-background, .qq-edit-popup-background {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: auto;
    background-color: #06060699;
    z-index: 99999;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    opacity: 1;
    transition: opacity 2s linear;
}

.qq-quicklogin-popup-wrapper, .qq-alert-popup-wrapper {
    width: 300px;
    height: auto;
    background-color: #fff;
    border: 1px solid;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

.qq-quicklogin-popup-header, .qq-alert-popup-header {
    background-color: #1b1b1b;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 100%;
}

.qq-quicklogin-popup-logo, .qq-alert-popup-logo {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEuNDM5bW0iIGhlaWdodD0iOC40MDI2bW0iIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQxLjQzOSA4LjQwMjYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjAuODkgLTMwLjA3OSkiPgogIDx0ZXh0IHg9IjYwLjM2ODA1IiB5PSIzNy45MjgzMDciIHN0eWxlPSJmaWxsOiM5OTk5OTk7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZjtmb250LXNpemU6MTAuNTgzcHg7bGluZS1oZWlnaHQ6MS4yNTtzdHJva2Utd2lkdGg6LjI2NDU4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iNjAuMzY4MDUiIHk9IjM3LjkyODMwNyIgc3R5bGU9ImZvbnQtZmFtaWx5OkhlbHZldGljYTtmb250LXdlaWdodDpib2xkO3N0cm9rZS13aWR0aDouMjY0NTgiPjx0c3BhbiBzdHlsZT0iZmlsbDojYTAyMzAwO2ZvbnQtZmFtaWx5OkhlbHZldGljYTtmb250LXdlaWdodDpib2xkIj5RPC90c3Bhbj51aS08dHNwYW4gc3R5bGU9ImZpbGw6I2EwMjMwMDtmb250LWZhbWlseTpIZWx2ZXRpY2E7Zm9udC13ZWlnaHQ6Ym9sZCI+UTwvdHNwYW4+dW88L3RzcGFuPjwvdGV4dD4KICA8dGV4dCB4PSIxMjguMjg5NjYiIHk9IjYyLjU4OTgwOSIgc3R5bGU9ImZpbGw6IzAwMDAwMDtmb250LWZhbWlseTpzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMC41ODNweDtsaW5lLWhlaWdodDoxLjI1O3N0cm9rZS13aWR0aDouMjY0NTgiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMjguMjg5NjYiIHk9IjYyLjU4OTgwOSIgc3R5bGU9InN0cm9rZS13aWR0aDouMjY0NTgiLz48L3RleHQ+CiA8L2c+Cjwvc3ZnPgo=);
    background-size: cover;
    width: 75px;
    height: 15px;
}

.qq-quicklogin-popup-buttons-wrapper, .qq-alert-popup-buttons-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}


.qq-quicklogin-popup-wrapper input {
    border-radius: 4px;
    padding: 4px 6px;
    transition: border linear 0.2s, box-shadow linear 0.2s;
    vertical-align: middle;
    border: 1px solid #cccccc;
    outline: none;
    width: 100%;
}

.qq-quicklogin-popup-wrapper input:focus {
    border-color: rgba(118, 179, 227, 0.85);
    box-shadow: rgba(82, 168, 236, 0.3) 0 0 4px 0;
    outline: none;
}

.qq-quicklogin-popup-wrapper button, .qq-alert-popup-wrapper button {
    width: 49%;
    height: 30px;
    cursor: pointer;
    background-repeat: repeat-x;
    padding: 4px 12px;
    font-size: 14px;
    border-radius: 4px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.qq-quicklogin-popup-btn-ok, .qq-alert-popup-btn-ok {
    outline: none;
    background-color: #006dcc;
    background-image: linear-gradient(to bottom, #0088cc, #0044cc);
    border: 1px solid #cccccc;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    color: #ffffff;
    text-shadow: rgba(0, 0, 0, 0.25) 0px -1px 0px;
}

.qq-quicklogin-popup-btn-cancel, .qq-alert-popup-btn-cancel {
    outline: none;
    background-color: #e6e6e6;
    background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
    border: 1px solid #cccccc;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    color: #333333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
}

.qq-quicklogin-popup-btn-ok:hover, .qq-alert-popup-btn-ok:hover {
    background-color: #0044cc;
    background-position: 0 -35px;
    transition: background-position 0.1s linear;
}

.qq-quicklogin-popup-btn-cancel:hover, .qq-alert-popup-btn-cancel:hover {
    background-color: #e6e6e6;
    background-position: 0 -35px;
    transition: background-position 0.1s linear;
}


.qq-quicklogin-popup-btn-ok:active, .qq-alert-popup-btn-ok:active {
    background-image: none;
    outline: 0;
}

.qq-quicklogin-popup-btn-cancel:active, .qq-alert-popup-btn-cancel:active {
    background-image: none;
    outline: 0;
}

.qq-container:not(.pull-right.qq-container) {
    display: flex;
    min-width: 185px;
    width: 185px;
    flex-wrap: wrap;
    align-items: center;
}

button.disabled {
    pointer-events: none;
    opacity: 0.5;
}

.qq-quicklogin-popup-wrapper, .qq-edit-popup-wrapper {
    width: 520px;
    height: auto;
    background-color: #fff;
    border: 2px solid;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

.qq-quicklogin-popup-header, .qq-edit-popup-header {
    background-color: #1b1b1b;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 100%;
}

.qq-quicklogin-popup-logo, .qq-edit-popup-logo {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEuNDM5bW0iIGhlaWdodD0iOC40MDI2bW0iIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQxLjQzOSA4LjQwMjYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjAuODkgLTMwLjA3OSkiPgogIDx0ZXh0IHg9IjYwLjM2ODA1IiB5PSIzNy45MjgzMDciIHN0eWxlPSJmaWxsOiM5OTk5OTk7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZjtmb250LXNpemU6MTAuNTgzcHg7bGluZS1oZWlnaHQ6MS4yNTtzdHJva2Utd2lkdGg6LjI2NDU4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4geD0iNjAuMzY4MDUiIHk9IjM3LjkyODMwNyIgc3R5bGU9ImZvbnQtZmFtaWx5OkhlbHZldGljYTtmb250LXdlaWdodDpib2xkO3N0cm9rZS13aWR0aDouMjY0NTgiPjx0c3BhbiBzdHlsZT0iZmlsbDojYTAyMzAwO2ZvbnQtZmFtaWx5OkhlbHZldGljYTtmb250LXdlaWdodDpib2xkIj5RPC90c3Bhbj51aS08dHNwYW4gc3R5bGU9ImZpbGw6I2EwMjMwMDtmb250LWZhbWlseTpIZWx2ZXRpY2E7Zm9udC13ZWlnaHQ6Ym9sZCI+UTwvdHNwYW4+dW88L3RzcGFuPjwvdGV4dD4KICA8dGV4dCB4PSIxMjguMjg5NjYiIHk9IjYyLjU4OTgwOSIgc3R5bGU9ImZpbGw6IzAwMDAwMDtmb250LWZhbWlseTpzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMC41ODNweDtsaW5lLWhlaWdodDoxLjI1O3N0cm9rZS13aWR0aDouMjY0NTgiIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbiB4PSIxMjguMjg5NjYiIHk9IjYyLjU4OTgwOSIgc3R5bGU9InN0cm9rZS13aWR0aDouMjY0NTgiLz48L3RleHQ+CiA8L2c+Cjwvc3ZnPgo=);
    background-size: cover;
    width: 75px;
    height: 15px;
}

.qq-quicklogin-popup-buttons-wrapper, .qq-edit-popup-buttons-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}


.qq-quicklogin-popup-wrapper input {
    border-radius: 4px;
    padding: 4px 6px;
    transition: border linear 0.2s, box-shadow linear 0.2s;
    vertical-align: middle;
    border: 1px solid #cccccc;
    outline: none;
    width: 100%;
}

.qq-quicklogin-popup-wrapper input:focus {
    border-color: rgba(118, 179, 227, 0.85);
    box-shadow: rgba(82, 168, 236, 0.3) 0 0 4px 0;
    outline: none;
}

.qq-quicklogin-popup-wrapper button, .qq-edit-popup-wrapper button {
    width: 49%;
    height: 30px;
    cursor: pointer;
    background-repeat: repeat-x;
    padding: 4px 12px;
    font-size: 14px;
    border-radius: 4px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.qq-quicklogin-popup-btn-ok, .qq-edit-popup-btn-ok {
    outline: none;
    background-color: #006dcc;
    background-image: linear-gradient(to bottom, #0088cc, #0044cc);
    border: 1px solid #cccccc;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    color: #ffffff;
    text-shadow: rgba(0, 0, 0, 0.25) 0px -1px 0px;
}

.qq-quicklogin-popup-btn-cancel, .qq-edit-popup-btn-cancel {
    outline: none;
    background-color: #e6e6e6;
    background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
    border: 1px solid #cccccc;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    color: #333333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
}

.qq-quicklogin-popup-btn-ok:hover, .qq-edit-popup-btn-ok:hover {
    background-color: #0044cc;
    background-position: 0 -35px;
    transition: background-position 0.1s linear;
}

.qq-quicklogin-popup-btn-cancel:hover, .qq-edit-popup-btn-cancel:hover {
    background-color: #e6e6e6;
    background-position: 0 -35px;
    transition: background-position 0.1s linear;
}


.qq-quicklogin-popup-btn-ok:active, .qq-edit-popup-btn-ok:active {
    background-image: none;
    outline: 0;
}

.qq-quicklogin-popup-btn-cancel:active, .qq-edit-popup-btn-cancel:active {
    background-image: none;
    outline: 0;
}

.qq-edit-popup {
    all: initial;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
    background-color: #06060699;
    border: none;
    z-index: 999999;
    padding-top: 5%;
}

.qq-edit-popup * {
    box-sizing: border-box;
}

#qq-dates.error input {
    border: 1px solid red;
}

.qq-edit-popup-wrapper {
    margin: auto;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    transform: scale(0.85);
    margin-bottom: 10%;
}
.error {
    color: red;
}
.qq-edit-popup-wrapper input[type=text], .qq-edit-popup-wrapper select, .qq-edit-popup-wrapper textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    box-sizing: border-box;
}

.qq-edit-popup-wrapper input[type=number] {
    width: 100%;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    box-sizing: border-box;
}

.qq-edit-popup-wrapper label {
    padding: 4px 4px 4px 0;
    display: inline-block;
}

.qq-edit-popup-wrapper .col-45 {
    float: left;
    width: 45%;
    margin-top: 6px;
}

.qq-edit-popup-wrapper .col-50 {
    float: left;
    width: 50%;
    margin-top: 6px;
}

.qq-edit-popup-wrapper .col-55 {
    float: left;
    width: 55%;
    margin-top: 6px;
}

.qq-edit-popup-wrapper.sticky {
    position: sticky;
}

.qq-snackbar {
    font-family: 'Segoe UI', Tahoma, sans-serif;
    z-index: 99999;
    position: fixed;
    right: 0;
    left: 0;
    justify-content: center;
    display: flex;
    bottom: 5%;
}

.qq-snackbar__surface {
    font-family: 'Segoe UI', Tahoma, sans-serif;
    background-color: #333333;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, .12);
    border-radius: 4px;
    padding-right: 8px;
    display: flex;
    max-width: 90%;
    transition: opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1), transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);
}

.qq-snackbar__label {
    font-family: 'Segoe UI', Tahoma, sans-serif;
    pointer-events: auto;
    color: rgba(255, 255, 255, 0.87);
    padding: 14px 8px 14px 16px;
}

.qq-snackbar__actions {
    font-family: 'Segoe UI', Tahoma, sans-serif;
    display: flex;
    align-items: center;
}

.qq-button.qq-snackbar__action {
    min-width: 64px;
    border: none;
    user-select: none;
    background: transparent;
    will-change: transform, opacity;
    height: 36px;
    padding: 0 8px 0 8px;
}

.qq-button__label {
    user-select: none;
    color: #A02300;
    font-size: 16px;
    font-weight: bold;
}

/* Clear floats after the columns */
.qq-edit-popup-wrapper .row:after {
    content: "";
    display: table;
    clear: both;
}

.qq-zoom-captcha {
    zoom: 3.5;
    top: 30%;
    right: 45%;
    position: fixed;
    z-index: 999999999;
    background-color: white;
    border: solid 2px red;
    padding: 4px;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
   .row .col-45, .row .col-55 {
        width: 100%;
        margin-top: 5px;
    }

    .qq-edit-popup-wrapper {
        width: auto;
    }

    .qq-edit-popup {
        padding: 0;
        font-size: 14px;
    }
    input {
        font-size: 14px;
    }
    h3 {
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 14px;
    }
    
    .qq-edit-popup-wrapper {
         transform: scale(1);
    }
}    
`;
    const style = doc ? doc.createElement('style') : document.createElement('style');
    style.textContent = text;
    style.id = "qq-css";
    return style;
}

//add padStart polyfill
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

//add flatMap polyfill
if (!Array.prototype.flatMap) {
    Array.prototype.flatMap = function (lambda) {
        return Array.prototype.concat.apply([], this.map(lambda));
    };
}

function deduplicateCollectionByField(coll, key) {
     var used = {};
    return coll.filter(function(obj) {
        return obj[key] in used ? 0:(used[obj[key]]=1);
    });
}

function deduplicateCollectionByFields(arr, keys) {
    return arr.filter((elem, index, currentArray) => currentArray.findIndex(t => {
        for ( const key of keys ) {
            if ( (t[key] !== elem[key]) ) {
                return false;
            }
        }
        return true;
    }) === index)
}

//As described in https://github.com/github/fetch/issues/175 Comment by https://github.com/mislav
function fetchTimeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("timeout"))
        }, ms);
        promise.then(resolve, reject)
    })
}

//delete duplicate array elements

function deleteArrayDuplicates(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true;
    }
    return Object.keys(obj);
}

function lastElement(list){
    return list[list.length - 1];
}

//////Полифил Element.closest для Safari
(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
    };
}(Element.prototype));


/////Полифил append для Chrome 49

(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

function saveAndExecDefaultBtnsEvent(img) {
    var func = img.onclick;
    return {
        execEvent: function (event) {
            func.call(img, event);
        }
    }
}

function toggleLoading(img) {
    var adjacentBtn = img.parentNode.querySelector(".qq-add-btn:not(.qq-loading), .qq-edit-btn:not(.qq-loading)");
    var style;
    return {
        off: function () {
            if ( style ) {
                style.remove();
            }
            img.classList.contains("qq-loading") ? img.classList.remove("qq-loading") : null;
            adjacentBtn.classList.contains("qq-not-active") ? adjacentBtn.classList.remove("qq-not-active") : null;
        },
        on: function () {
            simulateMouseEvent(img.parentNode, "mouseout");
            img.classList.add("qq-loading");
            adjacentBtn.classList.add("qq-not-active");
            if ( img.classList.contains("qq-edit-btn") ) {
                style = document.createElement('style');
                style.type = 'text/css';
                style.className = "qq";
                style.innerHTML = '.qq-edit-btn:not(.added) {\n' +
                    '    pointer-events: none !important;\n' +
                    '    cursor: default !important;\n' +
                    '    filter: opacity(20%) !important;\n' +
                    '}';
                document.head.append(style);
            }
        }
    }
}

function loadAsyncInfoUtil(img, getInfoFunc) {
    var defaultEvent = saveAndExecDefaultBtnsEvent(img);
    img.onclick = async function (event) {
        if ( img.classList.contains("added") ) {
            defaultEvent.execEvent(event);
            return img;
        }
        var loadingImage = toggleLoading(img);
        loadingImage.on();
        try {
            await getInfoFunc(img);
        } finally {
            loadingImage.off();
            defaultEvent.execEvent(event);
        }
    };
    return img;
}

function waitingFor(funcToCheck, delayBetweenCheck, attempts) {
    return new Promise(resolve => {
        (function loop() {
            setTimeout(() => {
                let result = funcToCheck();
                if ( result !== null ) {
                    resolve(result);
                    return;
                }

                if ( --attempts <= 0 ) {
                    resolve(null);
                    return;
                }
                loop(funcToCheck, delayBetweenCheck, attempts);
            }, delayBetweenCheck);
        })();
    });
}

function getText(elem, method = "textContent") {
    if ( typeof method === "string" && elem[method] ) {
        return elem[method].trim();
    }
    return elem.textContent.trim();
}

function getNodeData(options = {}, doc = document, method = 'textContent', voidType = null) {
    if ( typeof options === 'string' ) {
        return getNodeProperty($first(options, doc), voidType, method);
    } else {
        let {node = null, method = 'textContent', doc = document, safe = true, voidType = null} = options;
        if ( !node && safe ) {
            throw new Error('Node is not defined');
        }
        node = typeof node === 'string' ? $first(node, doc) : node;
        return safe ? getText(node, method) : getNodeProperty(node, voidType, method);
    }
}

function optionFromAttr(img) {
    var option = img.getAttribute("qq-option");
    option = option ? JSON.parse(option) : null;
    if ( option && typeof option === "object") {
        return option;
    }
    return null;
}

function setOptionAttr(img, option) {
    var strOption = JSON.stringify(option);
    querySelectorAll(img.parentNode, ".qq-add-btn, .qq-edit-btn").forEach(div => {
        div.setAttribute("qq-option", strOption);
    });
}

function mapCurrencyUtil(text) {
    const currencyKey = trim(text).replace(/\d+|\s+|\.|,/g, '');
    const currencies = {
        "£": "GBP",
        "₽": "RUB",
        "p": "RUB",
        "€": "EUR",
        "EU": "EUR",
        "Eu": "EUR",
        "$": "USD",
        "руб.": "RUB",
        "руб": "RUB",
        "р.": "RUB",
        "р": "RUB",
        "рб": "RUB",
        "бр": "BYN",
        "BYN": "BYN",
        "BN": "BYN",
        "BY": "BYN",
        "₴": "UAH",
        "грн": "UAH",
        "KZT": "KZT",
        "ТНГ": "KZT",
        "Tg": "KZT",
        "₸": "KZT",
        "AM": "AMD",
        'РУБ': "RUB",
        'сoм': "KGS",
        'zł': "PLN",
        'uzs': "UZS",
        'usd': "USD",
        'UE': "USD",
        'о': "RUB"
    };
    return currencies[currencyKey] || currencyKey;
}

function FlightSegment(args = {}) {

    this.flightNumber = args.flightNumber;
    this.airline =  args.airline;
    this.departureDate =  args.departureDate;
    this.departureTime = clearFlightTime(args.departureTime);
    this.departureCity = args.departureCity;
    this.departureCountry = args.departureCountry;
    this.departureAirport =  args.departureAirport;
    this.departureAirportID = args.departureAirportID ? (args.departureAirportID.match(/[A-Z][A-Z0-9]{2,3}/) || "")[0] : null;
    this.departureTerminal = args.departureTerminal;
    this.serviceClass =  args.serviceClass;
    this.arrivalDate = args.arrivalDate;
    this.arrivalTime = clearFlightTime(args.arrivalTime);
    this.arrivalCity =  args.arrivalCity;
    this.arrivalCountry = args.arrivalCountry;
    this.arrivalAirport = args.arrivalAirport;
    this.arrivalAirportID = args.arrivalAirportID ?  (args.arrivalAirportID.match(/[A-Z][A-Z0-9]{2,3}/) || "")[0] : null;
    this.arrivalTerminal = args.arrivalTerminal;
    this.travelTime = args.travelTime;
    this.plane =  args.plane;
    this.baggage = args.baggage;

    if ( !this.arrivalAirport && this.arrivalAirportID ) {
        this.arrivalCity = getDataByCode(this.arrivalAirportID, 'region') || this.arrivalCity;
        this.arrivalCountry = getDataByCode(this.arrivalAirportID, 'country') || this.arrivalCountry
    }

    if (!this.departureCity && this.departureAirportID) {
        this.departureCity = getDataByCode(this.departureAirportID, 'region') || this.departureCity
        this.departureCountry = getDataByCode(this.departureAirportID, 'country') || this.departureCountry
    }
}

function clearFlightTime(time) {
    if ( !time ) {
        return null;
    }
    const matched = time.match(/(\d{1,2}):(\d{1,2})/);
    return matched ? `${matched[1].padStart(2, '0')}:${matched[2].padStart(2, '0')}` : null;
}

function getPageWithFetchUtil(href, timeout = 1000) {
    return fetchTimeout(timeout, fetch(href)).then(response => response.text()).catch(e => {
        return null
    });
}

function createOptionFromFlight(flight) {
    const lastSegment = lastElement(lastElement(flight.sectors).segments);
    const startDate = dayMonthYearToDate(flight.sectors[0].segments[0].departureDate);
    const endDate = dayMonthYearToDate(lastSegment.arrivalDate);
    return {
        checkinDt: flight.sectors[0].segments[0].departureDate,
        nights: getDistance(startDate, endDate).toString(),
        hotelName:  getFlightName(flight) ,
        href: null,
        country: "",
        region: "",
        roomType: "",
        boardType: "",
        city_from: flight.sectors[0].segments[0].departureCity || flight.sectors[0].segments[0].departureAirport,
        operator: window.OPERATOR_NAME,
        flight,
        product_type: "Flight"
    };
}

function getCityFromFlight(flight) {
    try {
        if ( !flight ) {
            return null;
        }
        return flight.sectors[0].segments[0].departureCity || flight.sectors[0].segments[0].departureAirport || flight.sectors[0].segments[0].departureAirportID
    } catch (e) {
        console.log(e);
        return null;
    }
}

function getFlightName(flight) {
    const lastSegment = lastElement(lastElement(flight.sectors).segments);
    const firstSegment = flight.sectors[0].segments[0];
    if ( flight.sectors.length === 2 &&
        firstSegment.departureCity === lastSegment.arrivalCity &&
        lastElement(flight.sectors[0].segments).arrivalCity === lastElement(flight.sectors).segments[0].departureCity ) {
        return`${firstSegment.departureCity || firstSegment.departureAirport} ⟷ ${lastElement(flight.sectors[0].segments).arrivalCity || lastElement(flight.sectors[0].segments).arrivalAirport}`
    }
    return decorateDestinationCities(flight);
}

function decorateDestinationCities(flight) {
     return flight.sectors.map( sector => {
      const lastSegment = lastElement(sector.segments);
      const firstSegment = sector.segments[0];
      return `${firstSegment.departureCity || firstSegment.departureAirport} ➝ ${lastSegment.arrivalCity || lastSegment.arrivalAirport}`;
     }).join(" / ")
}

async function windows1251ResponseToUTF8Response(response) {
    return new Response(new TextDecoder("windows-1251").decode(await response.arrayBuffer()));
}

function getRegexPatterns() {
    return {
        date: new RegExp(/\d{2}.\d{2}.\d{2,4}/g),
        dateStrict: new RegExp(/\d{2}\.\d{2}\.\d{2,4}/g),
        dateSeparated: new RegExp(/(\d{2})\.(\d{2})\.(\d{2,4})/),
        time: new RegExp(/\d{2}:\d{2}/g),
        cleanCurrency:  new RegExp(/\d+|\s+/g),
        flightNumber: new RegExp(/\b([A-Z]{1,3}|[A-Z]\d|\d[A-Z])\s?\d{2,4}\b/)
    }
}

function hotelWithStars(hotel, stars) {
    return stars && stars > 0 ? `${hotel} ${stars}*` : hotel;
}

function quickBookingValue(props = {}) {
    this.description = props.description;
   // this.totalPrice = props.price ? parseFloat(props.price.toString().replace(/\D+/, '.')) : 0;
   // this.totalPriceCurrency = props.currency;
    this.caption = props.caption;
    this.dateStart = props.dateStart || props.date;
    this.dateEnd= props.dateEnd;
    this.date= props.date;
//    this.count = Number(props.count) || 1;
    this.passengers = props.passengers || null;
    this.addDates = props.addDates || false;
}

function mapPriceType(currency) {
      if ( (currency || '').match(/RUB|UAH|KZT|BYN|MDL/) )  {
          return 'inNationalCurrency';
      }
      return 'inForeignCurrency';
}

function getPassengerTypeUtil(text) {
    if ( !text ) {
        return 'adult';
    }
    if ( text.match(/взрослый|дорослий/i) ) {
        return 'adult';
    }
    if ( text.match(/ребенок|дитина/i) ) {
        return 'child';
    }
    if ( text.match(/младенец|немовля/i) ) {
        return 'infant';
    }
}

function getInputsValues(panel, object) {
        for ( const [key, value] of Object.entries(object) ) {
               object[key] = getNodeProperty((typeof value === 'string' ? $1(value, panel) : value), null, 'value');
        }
        return object;
}

function parseHotelsUtil(tourOptions) {
    if ( !tourOptions.hotelName ) {
        return [];
    }
    if (tourOptions.hotels) {
        return tourOptions.hotels;
    }
    const {
        nights, region,
        country,
        hotelName, roomType, boardType, accommodation, product_type
    } = tourOptions;
    if ( product_type === 'Flight' ) {
        return [];
    }
    return [{
        nights, dateStart: tourOptions.checkinDtHotel || tourOptions.dateStart || tourOptions.checkinDt,
        hotelName, roomType, accommodation, boardType, region,
        country
    }].map(splitRoomTypeUtil)
}

function splitRoomTypeUtil(option) {
    if ( !option.accommodation ) {
        const [roomType, accommodation] = (option.roomType || '').split(/,\s+/);
        option.roomType = roomType;
        option.accommodation = accommodation;
    }
    return option;
}

function mapDocType(string) {
    const typeKey = trim(string);
    const types = {
        "Загранпаспорт": "internationalPassport",
        "Заграничный паспорт": "internationalPassport",
        "Загр.паспорт": "internationalPassport",
        "Закордонний паспорт": "internationalPassport",

        "Гражданский паспорт": "nationalPassport",
        "Паспорт РФ": "nationalPassport",
        "Громадянський паспорт": "nationalPassport",
        "Национальный паспорт": "nationalPassport",
        "Нац.паспорт": "nationalPassport",

        "Свидетельство о рождении": "birthdayCertificate",
        "Свідоцтво про народження": "birthdayCertificate",
        "Св-во о рождении": "birthdayCertificate",
    };
    return types[typeKey] || typeKey;
}

function $$(selector, target = document.documentElement) {
    if ( !target ) {
        return [];
    }
    if ( typeof selector === 'string' ) {
        return [...target.querySelectorAll(selector)];
    }

    const {sel, searchString} = selector;
    return [...target.querySelectorAll(sel)].filter(el => getText(el).match(searchString));
}

function $1(selector, target = document.documentElement) {
    return $$(selector, target)[0] || null
}

function $first(selector, target = document) {
    return target.querySelector(selector);
}

function manifestLessOrEqualTo(oldVer, newVer ) {
    if ( !oldVer || !newVer ) {
        return false;
    }
    if ( oldVer === newVer ) {
        return true;
    }
    const oldParts = oldVer.split('.');
    const newParts = newVer.split('.');
    for ( let i = 0; i < newParts.length; i++ ) {
        const a = ~~newParts[i];
        const b = ~~oldParts[i];
        if ( a > b ) return true;
        if ( a < b ) return false;
    }
    return false
}

function getBackgroundFetchResponse(reqId) {
    try {
        const result = window.backgroundFetchResponses[reqId];
        if ( !result ) {
            return null;
        }
        return result;
    } catch (e) {
        return null;
    }
}

addAddonMessageListener("fetch response", (data) => {
    console.log('fetch response');
    console.log(data);
    window.backgroundFetchResponses[data.reqId] = data;
});

function optionalChaining(obj, keys, defaultValue = null) {
    if ( !obj ) {
        return null;
    }
    let summary = obj;
    for ( const key of keys ) {
        if ( summary[key] ) {
            summary = summary[key];
        } else {
            return defaultValue;
        }
    }
    return summary;
}

Array.range = function (n) {
    // Array.range(5) --> [0,1,2,3,4]
    return Array.apply(null, Array(n)).map((x, i) => i)
};

Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function getDatesArrayBetweenTwoDates(startDate, stopDate, toDate = false) {
    if ( !(startDate instanceof Date) ) {
        startDate = dayMonthYearToDate(startDate);
    }
    if ( !(stopDate instanceof Date) ) {
        stopDate = dayMonthYearToDate(stopDate);
    }
    const dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return toDate ? dateArray : dateArray.map(dt => dt.toLocaleDateString('ru'));
}

function transliterateQuickReservationObject(obj) {
    if (!obj || !obj.value) {
        return {value: null};
    }
    return { value: transliterate(obj.value.toLowerCase()).toUpperCase(), caption: obj.caption }
}

function createAlertPopup(text = "Ошибка!", details = null) {
    const oldIframe = document.querySelector('iframe.qq-alert-popup');
    if ( oldIframe ) {
        oldIframe.remove();
    }
    const backgroundDiv = document.createElement("div");
    const wrapper = document.createElement("div");
    const header = createAlertPopupHeader();
    const iframe = createAlertPopupIframe();

    backgroundDiv.setAttribute('tabindex', '-1');
    backgroundDiv.classList.add('qq-alert-popup-background');
    iframe.style.transition = "opacity .5s linear";
    iframe.style.opacity = "0";

    wrapper.classList.add('qq-alert-popup-wrapper');

    const {buttonsWrapper, okButton} = createAlertPopupContainer(iframe);
    attachAlertPopupBackgroundEvents(backgroundDiv, okButton, okButton);
    const body = createAlertPopupBody(text, details, [buttonsWrapper]);
    document.body.append(iframe);
    iframe.onload = () => {
        if ( iframe.contentDocument && !iframe.contentDocument.querySelector('.qq-alert-popup-background') ) {
            appendItemsToIframe();
        }
    };
    appendItemsToIframe();

    function appendItemsToIframe() {
        injectStyleSheet(iframe.contentDocument);
        wrapper.append(header, body);
        backgroundDiv.append(wrapper);
        iframe.contentDocument.body.append(backgroundDiv);
        iframe.style.opacity = "1";
    }
    return {wrapper, body, header, buttonsWrapper, okButton, iframe}
}

function createAlertPopupIframe() {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        overflow: auto;
        background-color: #06060699;
        border: none;
        z-index: 999999
    `;
    iframe.classList.add('qq-alert-popup');
    return iframe;
}

function createAlertPopupHeader() {
    const header = document.createElement("div");
    const logo = document.createElement("div");
    header.classList.add("qq-alert-popup-header");
    logo.classList.add('qq-alert-popup-logo');
    header.append(logo);
    return header;
}

function attachAlertPopupBackgroundEvents(backgroundDiv, okButton, cancelButton) {
    backgroundDiv.addEventListener('keydown', (event) => {
        if ( event.code === 'Escape' ) {
            cancelButton.click();
            return;
        }
        if ( event.code === 'Enter' || event.code === 'NumpadEnter' ) {
            okButton.click();
        }
    });
}

function createAlertPopupBody(text, detailsText, appendList = []) {
    const body = document.createElement('div');
    const bodyText = document.createElement('div');
    if ( detailsText ) {
        const details = document.createElement('div');
        const detailsLink = document.createElement('a');

        details.style.display = 'none';
        details.innerHTML = detailsText;
        detailsLink.textContent = 'Показать детали';
        detailsLink.href = '#';
        detailsLink.style.marginBottom = '5px';
        detailsLink.addEventListener('click', (e)=> {
            e.preventDefault();
            details.style.display = 'block';
            detailsLink.style.display = 'none';
        });
        appendList = [details, detailsLink,...appendList];
    }

    body.style.padding = '10px';
    body.style.textAlign = 'center';

    bodyText.innerHTML = text;
    bodyText.style.cssText = `
         text-align: center;
         margin-bottom: 5px;
    `;
    body.append(bodyText, ...appendList);
    return body;
}

function createAlertPopupContainer(iframe) {
    const buttonsWrapper = createAlertPopupButtonsWrapper();
    const okButton = createAlertPopupButton('Понятно', 'qq-alert-popup-btn-ok', () => iframe.remove());
    buttonsWrapper.append(okButton);
    return {buttonsWrapper, okButton};
}

function createAlertPopupButton(caption, className, eventListener) {
    const button = document.createElement('button');
    button.textContent = caption;
    if ( className ) {
        button.classList.add(className);
    }
    button.addEventListener("click", eventListener);
    return button;
}

function createAlertPopupButtonsWrapper() {
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add("qq-alert-popup-buttons-wrapper");
    return buttonsWrapper;
}

function getElementByXpath(path, target = document) {
    return document.evaluate(path, target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

async function getStorageDataAsync(keys) {
    return chrome.storage.local.get(keys);
}

function setStorageDataAsync(items) {
    return chrome.storage.local.set(items);
}

addAddonMessageListener('show alert popup', (data) => {
    if ( data.worker && data.worker.url === document.location.href ) {
        createAlertPopup(data.text, data.details)
    }
})

function getFlightPropByIndex(flights, prop, index = 0 ) {
    if ( flights && flights.value && flights.value.length > index ) {
        return {
            value: flights.value[index][prop],
            caption: 'Перелет: ' + prop
        }
    }

    return {
        value: '',
        caption: 'Перелет: ' + prop
    }
}

function setReactInputValue(input, value) {
    callNativeInputSetter(input, value);
    const inputEvent = new Event("input", {bubbles: true});
    input.dispatchEvent(inputEvent);
}

function setReactInputValueKeyBoard(input, value, event = 'keyup') {
    callNativeInputSetter(input, value);
    const inputEvent = new KeyboardEvent(event, {bubbles: true});
    input.dispatchEvent(inputEvent);
}

function callNativeInputSetter(input, value) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
    ).set;
    input.focus();
    nativeInputValueSetter.call(input, value);
    input.dispatchEvent(new Event('input', {bubbles: true}));
    input.dispatchEvent(new Event('change', {bubbles: true}));
    input.blur()
}

injectStyleSheet(document);   //TODO Remove after IOS app been updated

addAddonMessageListener('showSnackBarNotification', (data, sendResponse) => {
   const {text, title} = data;
    showSnackBarNotification(title, text)
    sendResponse(true)
})

async function showSnackBarNotification(title, text) {
    const isTourAdded = !!title.match(getI18nMessage('caption_hotelAdded')) || !!title.match(getI18nMessage('caption_quoteLoaded')) ;
    const btnText = isTourAdded ? "Открыть" : '<span style="color:red;">Q</span>ui&#8209;<span style="color:red;">Q</span>uo';

    let topText = title.match(getI18nMessage('caption_hotelAdded')) ? text : title;

    const optionsLength = await getStorageDataAsync('quote').then( r=>r.quote.options.length).catch(e=>0);
    const bottomText = isTourAdded ? `Добавлен. Всего в списке: ${optionsLength}` : text;
    if (title.match(getI18nMessage('caption_hotelAdded'))) {
        const hotelName = topText.split(/\d+\s+[A-Z]+/)[0];
        const price = String(topText.match(/\d+\s+[A-Z]+/));
        topText = `
                             <div style="
                                         text-overflow: ellipsis;
                                         white-space: nowrap;
                                         overflow: hidden;
                                         width: 60%;
                                         display: inline-block; ">
                                         ${hotelName}</div><div style="display: inline-block;overflow: hidden;">${price}</div>`;
    }

    const inlineStyle = isTourAdded ? `   
                display: inline-flex;
                min-width: 64px;
                border: none;
                outline: none;
                background: transparent;
                padding: 4px 8px 4px 8px;
                align-items: center;
                border-radius: 4px;
                box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);
                background-color: rgb(160 35 0);`  : '';

    $$('.qq-snackbar').forEach(i => i.remove());
    const aside = document.createElement('aside');
    aside.classList.add('qq-snackbar');
    const html = `
        <div class="qq-snackbar__surface" role="status" aria-relevant="additions">
            <div class="qq-snackbar__label" aria-atomic="false">
                 ${topText === 'Qui-Quo' ? '' : topText}
                 ${topText === 'Qui-Quo' ? '' :  '<br>'}
                  ${title.match(/Предложение загружено/i) ? bottomText.replace(/добавлен.\s*/i, '') :bottomText}
            </div>
            <div class="qq-snackbar__actions"  aria-atomic="true">
                <button style="${inlineStyle}" type="button" class="qq-button qq-snackbar__action">
                    <span style="color: #fff" class="qq-button__label">${btnText}</span>
                </button>
            </div>
        </div>
`;
    aside.innerHTML = html;
    document.body.appendChild(aside);
    const button = aside.querySelector('.qq-snackbar__actions button');
    const btnAction = (event) => {
        event.stopImmediatePropagation();
        event.preventDefault();
        openDraftTab()
    };
    button.addEventListener('click', btnAction);
    setTimeout(()=> aside.remove(), 4000);
}

function getI18nMessage(caption) {
    try {
        return chrome.i18n.getMessage(caption);
    } catch (e) {
        console.log(e);
        return null;
    }
}
function openDraftTab() {
    sendMessageToAddon('open draft page');
}

function chunkArray(arr, size) {
    return Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
        arr.slice(i * size, i * size + size)
    );
}

function splitSegmentsToSectors(segments) {
    let sectors = [];
    let obj = [];
    segments.forEach((segment, index) => {
        const arrival = segment.arrivalDate;
        const departure = segments[index + 1] ? segments[index + 1].departureDate : null;
        const distance = getDistance(arrival, departure);
        if ( !segment.added ) {
            obj.push(segment);
        }
        if ( arrival && departure && distance < 3 && (!segment.serviceClass || !segment.serviceClass.match(/купе|св|плацкар/i)) ) {
            obj.push(segments[index + 1]);
            segments[index + 1].added = true;
            return;
        }
        sectors.push({segments: obj});
        obj = [];
    });
    return sectors;
}

function getDocTypeUtils(div) {
    const select = div.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch ( value ) {
        case "Внутренний паспорт" :
            return "Паспорт";
        case "Заграничный паспорт":
            return "Заграничный паспорт";
        case "Свидетельство о рождении":
            return "Свидетельство о рождении";
        default:
            return 'none'
    }
}

function compareTime(time1, time2) {
    return new Date(`2000-01-01T${time1}:00.000Z`) > new Date(`2000-01-01T${time2}:00.000Z`)
}

function getBrowserVersion() {
    var ua = typeof navigator == "object" && navigator.userAgent;
    if ( ua ) {
        var browsers = ["YaBrowser", "Seamonkey", "Firefox", "OPR", "MSIE", "Chromium", "Chrome", "Safari"];
        for ( var i = 0; i < browsers.length; i++ ) {
            var m = ua.match(new RegExp(browsers[i] + "[/\\s]([^\\s]+)"));
            if ( m ) {
                return browsers[i] + " " + m[1];
            }
        }
    }
    return "Chrome";
}

if ( typeof Array.prototype.chunk === 'undefined' ) {
    Object.defineProperty(Array.prototype, 'chunk', {
        value: function (n) {
            // ACTUAL CODE FOR CHUNKING ARRAY:
            return Array.range(Math.ceil(this.length / n)).map((x, i) => this.slice(i * n, i * n + n));

        }
    });

}

function getCountryFromCode(code) {
    const preparedCode = code.trim().toUpperCase();
    return window.isoCodes[preparedCode]
}

function getDocumentFromString(string) {
    if ( !string || typeof string !== 'string') {
        return null;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(string, 'text/html');
    return doc;
}

if ( !Array.prototype.extractNodesText ) {
    Array.prototype.extractNodesText = function (method = 'textContent') {
        if ( !Array.isArray(this) ) {
            throw new TypeError('Array.prototype.asyncMap called on non-array object');
        }
        const result = this.map(node => {
            if ( node instanceof Node ) {
                return getNodeProperty(node, '', method);
            }
            return node;
        })
        return result
    }
}

/**
 * Object.entriesFrom() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if ( !Object.fromEntries ) {
    Object.fromEntries = function (entries) {
        if ( !entries || !entries[Symbol.iterator] ) { throw new Error('Object.fromEntries() requires a single iterable argument'); }
        let obj = {};
        for ( let [key, value] of entries ) {
            obj[key] = value;
        }
        return obj;
    };
}

function waiting(ms) {
    return new Promise(resolve => {
        (function delay() {
            setTimeout(() => {
                resolve();
            }, ms);
        })();
    });
}

function convertMinToHours (n) {
    return `0${n / 60 ^ 0}`.slice(-2) + ':' + ('0' + n % 60).slice(-2);
}

function getDataByCode(code, dataType, airports) {
    if (!code || !dataType) {
        return null;
    }
    if (!airCodes[code]) {
        return "";
    }

    return airCodes[code][dataType];
}

function getElementShallowText(element) {
    return Array.from(element.childNodes)
        .reduce((text, node) => node.nodeType === 3 ? text + getText(node) : text, '');
}


function parseNightsUtil(str) {
   return String(str.replace(/\D+/g, ''))
}

async function runModuleTest() {
    const buttons = $$('.qq-add-btn');
    for ( const button of buttons ) {
        const option = await createOption(button);
        console.log('Start option test ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', button)
        option.checkinDt && option.checkinDt.match(/\d{2}\.\d{2}\.\d{4}/) ? console.log('checkinDt', option.checkinDt) : console.error('checkinDt FAIL')
        option.nights && typeof option.nights === 'string' && option.nights.match(/^\d+$/) ? console.log('nights OK', option.nights) : console.error('nights FAIL')
        option.hotelName && typeof option.hotelName === 'string' ? console.log('hotelName OK', option.hotelName) : console.error('hotelName FAIL')
        option.href && typeof option.href === 'string' ? console.log('href OK', option.href) : console.error('href FAIL')
        option.country && typeof option.country === 'string' ? console.log('country OK', option.country) : console.error('country FAIL')
        option.region && typeof option.region === 'string' ? console.log('region OK', option.region) : console.error('region FAIL')
        option.boardType && typeof option.boardType === 'string' ? console.log('boardType OK', option.boardType) : console.error('boardType FAIL')
        option.price && typeof option.price === 'number' ? console.log('price OK', option.price) : console.error('price FAIL')
        option.currency && typeof option.currency === 'string' ? console.log('currency OK', option.currency) : console.error('currency FAIL')
        option.city_from && typeof option.city_from === 'string' ? console.log('city_from OK', option.city_from) : console.error('city_from FAIL')
        option.thumbnail && typeof option.thumbnail === 'string' ? console.log('thumbnail OK', option.thumbnail) : console.error('thumbnail FAIL')
        option.occupancy && typeof option.occupancy === 'object' ? console.log('occupancy OK', option.occupancy) : console.error('occupancy FAIL')
        console.log('END option test -<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', button)
    }
}

/**
 * @param {Object} params
 * @param {string} params.url
 * @param {'get' | 'put' | 'post'} params.method
 * @param {Request['headers']} params.headers
 * @param {number | undefined} params.timeout
 * @returns {Promise<Response | null>}
 */
async function fetchAddonProxy(params) {
    const { idToken } = await getStorageDataAsync(['idToken']);
    const url = `https://extension.${AGENCY_DOMAIN}/info/addon-proxy`;
    const { timeout, ...proxyParams } = { timeout: 10000, ...params };
    const defaultProxyHeaders = {
        'User-Agent': window.navigator.userAgent
    };
    proxyParams.headers = { ...defaultProxyHeaders, ...params.headers };

    return new Promise(async (resolve) => {
        const controller = window.AbortController != null ? new AbortController() : undefined;

        const timer = setTimeout(() => {
            controller && controller.abort();
            resolve(null);
        }, timeout);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: idToken,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(proxyParams),
            signal: controller.signal
        });

        clearTimeout(timer);
        resolve(response);
    });
}


addAddonMessageListener('add-tours', async (_, sendResponse) => {
    if ( typeof getToursForPopup === 'function') {
        const option = await getToursForPopup()
        sendMessageToAddon("add clicked", option);
        sendMessageToAddon("added option");
        sendResponse(null)
    }
})


addAddonMessageListener('hasToursForPopup', (_, sendResponse) => {
    if ( typeof getToursForPopup === 'function' && isTourForPopupAvailable() ) {
        sendResponse(true)
    }
})

async function getInitParams() {
    return await sendMessageToAddon("get init params");
}

function getAddonMajorVersion() {
    try {
        const manifest = chrome.runtime.getManifest();
        return manifest.version.split('.')[0];
    } catch (e) {
        console.log(e);
        return null;
    }
}

function initLegacyFunctions() {
    try {
        if ( getAddonMajorVersion() === '1' ) {
            console.log('Legacy PLUGIN!')
        }

    } catch (e) {
        console.log(e);
        return null;
    }
}

initLegacyFunctions()

function sanitize(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const dangerousTags = ['script', 'iframe', 'object', 'embed', 'link', 'style'];
    doc.querySelectorAll(dangerousTags.join(',')).forEach(el => el.remove());
    doc.querySelectorAll('*').forEach(el => {
        [...el.attributes].forEach(attr => {
            if ( /^on/i.test(attr.name) ) {
                el.removeAttribute(attr.name);
            }
            if ( /javascript:/i.test(attr.value) ) {
                el.removeAttribute(attr.name);
            }
        });
    });
    return doc.body.innerHTML;
}


function createAlertMessage(text = "Ошибка!", details = null) {
    return new Promise((resolve, reject) => {
        const iframe = document.createElement('iframe');
        const iframeStyles = {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: 'none',
            zIndex: '999999',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            backgroundColor: 'transparent' // Важно для Firefox
        };

        Object.assign(iframe.style, iframeStyles);

        iframe.id = `alert-iframe-${Date.now()}`;

        iframe.onerror = (error) => {
            console.error('Ошибка загрузки iframe:', error);
            reject(new Error('Не удалось создать окно сообщения'));
            cleanup();
        };

        // Функция очистки
        const cleanup = () => {
            if ( iframe && iframe.parentNode ) {
                iframe.style.opacity = '0';
                setTimeout(() => {
                    iframe.remove();
                }, 300);
            }
        };

        iframe.onload = () => {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow.document;

                const style = doc.createElement('style');
                style.textContent = `
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                        overflow: hidden;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    .message-box {
                        animation: fadeIn 0.3s ease-out;
                    }
                    
                    button:focus {
                        outline: 2px solid #0cc298;
                        outline-offset: 2px;
                    }
                `;
                doc.head.appendChild(style);

                const overlay = doc.createElement('div');
                Object.assign(overlay.style, {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: '0',
                    transition: 'opacity 0.3s ease'
                });

                const messageBox = doc.createElement('div');
                messageBox.className = 'message-box';
                Object.assign(messageBox.style, {
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                    width: '90%',
                    maxWidth: '480px',
                    textAlign: 'center',
                    position: 'relative'
                });

                const logoContainer = doc.createElement('div');
                Object.assign(logoContainer.style, {
                    padding: '14px 14px 10px',
                    textAlign: 'center'
                });

                const logo = doc.createElement('a');
                Object.assign(logo.style, {
                    display: 'inline-block',
                    padding: '7px 14px 7px',
                    fontSize: '26px',
                    fontWeight: '200',
                    color: '#000000',
                    textDecoration: 'none',
                    fontFamily: 'Helvetica, Arial, sans-serif'
                });

                const [q1, q2] = ['Q', 'Q'].map(text => {
                    const span = doc.createElement('span');
                    Object.assign(span.style, {
                        color: '#A02300',
                        fontWeight: 'bold'
                    });
                    span.textContent = text;
                    return span;
                });

                logo.appendChild(q1);
                logo.appendChild(doc.createTextNode('ui-'));
                logo.appendChild(q2);
                logo.appendChild(doc.createTextNode('uo'));
                logoContainer.appendChild(logo);

                const divider = doc.createElement('hr');
                Object.assign(divider.style, {
                    margin: '0',
                    border: 'none',
                    borderTop: '1px solid #e5e5e5',
                    width: '100%'
                });

                const contentContainer = doc.createElement('div');
                Object.assign(contentContainer.style, {
                    padding: '24px 32px'
                });

                const messageText = doc.createElement('div');
                Object.assign(messageText.style, {
                    fontSize: '16px',
                    color: '#333',
                    marginBottom: details ? '12px' : '24px',
                    lineHeight: '1.5'
                });
                messageText.innerHTML = text;

                if ( details ) {
                    const detailsText = doc.createElement('div');
                    Object.assign(detailsText.style, {
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '24px',
                        lineHeight: '1.4'
                    });
                    detailsText.innerHTML = details;
                    contentContainer.appendChild(detailsText);
                }


                const button = doc.createElement('button');
                Object.assign(button.style, {
                    backgroundColor: '#0cc298',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px 32px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                });
                button.textContent = 'Понятно';


                button.onmouseover = () => button.style.backgroundColor = '#0aad87';
                button.onmouseout = () => button.style.backgroundColor = '#0cc298';

                const closeAlert = () => {
                    overlay.style.opacity = '0';
                    messageBox.style.transform = 'translateY(20px)';
                    messageBox.style.opacity = '0';
                    setTimeout(() => {
                        cleanup();
                        resolve();
                    }, 300);
                };

                button.onclick = closeAlert;

                doc.addEventListener('keydown', (e) => {
                    if ( e.key === 'Escape' || e.key === 'Enter' ) {
                        e.preventDefault();
                        closeAlert();
                    }
                });

                contentContainer.appendChild(messageText);
                contentContainer.appendChild(button);

                messageBox.appendChild(logoContainer);
                messageBox.appendChild(divider);
                messageBox.appendChild(contentContainer);
                overlay.appendChild(messageBox);
                doc.body.appendChild(overlay);
                requestAnimationFrame(() => {
                    iframe.style.opacity = '1';
                    overlay.style.opacity = '1';
                });

            } catch (error) {
                console.error('Ошибка при создании содержимого:', error);
                reject(error);
                cleanup();
            }
        };

        document.body.appendChild(iframe);

        setTimeout(() => {
            if ( iframe.style.opacity === '0' ) {
                console.error('Таймаут создания окна');
                reject(new Error('Таймаут создания окна сообщения'));
                cleanup();
            }
        }, 5000);
    });
}
