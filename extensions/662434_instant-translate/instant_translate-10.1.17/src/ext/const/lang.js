(function (undefined) {

    /* As for 31.03.16, Instant Translate Browsers supports:
     * 104 languages + auto
     */

    const BING_LANGS = {
        "bs": "bs-Latn",
        "sr": "sr-Cyrl",
        "zh-TW": "zh-CHT",
        "zh-CN": "zh-CHS",
        "iw": "he"
    };

    pl.extend(ke.ext.const.lang, {
        list: {
            'Auto': 'auto',
            'Afrikaans': 'af',
            'Albanian': 'sq',
            'Arabic': 'ar',
            'Armenian': 'hy',
            'Azerbaijani': 'az',
            'Basque': 'eu',
            'Belarusian': 'be',
            'Bengali': 'bn',
            'Bosnian': 'bs',
            'Bulgarian': 'bg',
            'Catalan': 'ca',
            'Cebuano': 'ceb',
            'Chichewa': 'ny',
            'ChineseSimplified': 'zh-CN',
            'ChineseTraditional': 'zh-TW',
            'Croatian': 'hr',
            'Czech': 'cs',
            'Danish': 'da',
            'Dutch': 'nl',
            'English': 'en',
            'EnglishUS': 'en-US',
            'Esperanto': 'eo',
            'Estonian': 'et',
            'Filipino': 'tl',
            'Finnish': 'fi',
            'French': 'fr',
            'Galician': 'gl',
            'Georgian': 'ka',
            'German': 'de',
            'Greek': 'el',
            'Gujarati': 'gu',
            'HaitianCreole': 'ht',
            'Hausa': 'ha',
            'Hebrew': 'iw',
            'Hindi': 'hi',
            'Hmong': 'hmn',
            'Hungarian': 'hu',
            'Icelandic': 'is',
            'Igbo': 'ig',
            'Indonesian': 'id',
            'Irish': 'ga',
            'Italian': 'it',
            'Javanese': 'jw',
            'Japanese': 'ja',
            'Kannada': 'kn',
            'Kazakh': 'kk',
            'Khmer': 'km',
            'Korean': 'ko',
            'Lao': 'lo',
            'Latin': 'la',
            'Latvian': 'lv',
            'Lithuanian': 'lt',
            'Macedonian': 'mk',
            'Malagasy': 'mg',
            'Malay': 'ms',
            'Maltese': 'mt',
            'Maori': 'mi',
            'Marathi': 'mr',
            'Mongolian': 'mn',
            'Nepali': 'ne',
            'Norwegian': 'no',
            'Persian': 'fa',
            'Polish': 'pl',
            'Portuguese': 'pt',
            'Punjabi': 'pa',
            'Romanian': 'ro',
            'Russian': 'ru',
            'Serbian': 'sr',
            'Sesotho': 'st',
            'Sinhala': 'si',
            'Slovak': 'sk',
            'Slovenian': 'sl',
            'Somali': 'so',
            'Spanish': 'es',
            'Sundanese': 'su',
            'Swahili': 'sw',
            'Swedish': 'sv',
            'Tajik': 'tg',
            'Tamil': 'ta',
            'Telugu': 'te',
            'Thai': 'th',
            'Turkish': 'tr',
            'Ukrainian': 'uk',
            'Urdu': 'ur',
            'Uzbek': 'uz',
            'Vietnamese': 'vi',
            'Welsh': 'cy',
            'Yiddish': 'yi',
            'Yoruba': 'yo',
            'Zulu': 'zu',
            'Malayalam': 'ml',
            'MyanmarBurmese': 'my',

            // v2.9.46 (+13 langs)

            'Amharic': 'am',
            'Corsican': 'co',
            'Frisian': 'fy',
            'Hawaiian': 'haw',
            'KurdishKurmanji': 'ku',
            'Kyrgyz': 'ky',
            'Luxembourgish': 'lb',
            'Pashto': 'ps',
            'Samoan': 'sm',
            'ScotsGaelic': 'gd',
            'Shona': 'sn',
            'Sindhi': 'sd',
            'Xhosa': 'xh'
        },

        // fp_supported_langs: ["ar", "bg", "ca", "zh-CHS", "zh-CHT", "cs", "da", "nl", "en", "et", "fi", "fr", "de", "el", "ht", "he", "hi", "mww", "hu", "id", "it", "ja", "tlh", "ko", "lv", "lt", "ms", "mt", "no", "fa", "pl", "pt", "ro", "ru", "sk", "sl", "es", "sv", "th", "tr", "uk", "ur", "vi", "cy"],

        fp_supported_langs: ['zh-CHS', 'zh-CHT', 'he', 'af', 'sq', 'am', 'ar', 'hy', 'az', 'bn', 'bs', 'bg', 'ca', 'hr', 'cs', 'da', 'nl', 'en', 'et', 'fi', 'fr', 'de', 'el', 'gu', 'ht', 'hi', 'hu', 'is', 'id', 'ga', 'it', 'ja', 'kn', 'kk', 'km', 'ko', 'ku', 'lo', 'lv', 'lt', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'my', 'ne', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'sk', 'sl', 'es', 'sw', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'cy'],

        isFPSupported: function(lang) {
            return ke.ext.const.lang.fp_supported_langs.indexOf(ke.ext.const.lang.getBingCompatibleLang(lang)) > -1;
        },

        getBingCompatibleLang: function(lang) {
            return BING_LANGS[lang] || lang;
        },

        stt: {
            'af': ['af-ZA'],
            'id': ['id-ID'],
            'ms': ['ms-MY'],
            'ca': ['ca-ES'],
            'cs': ['cs-CZ'],
            'da': ['da-DK'],
            'de': ['de-DE'],
            'en': ['en-GB'],
            'en-US': ['en-US'],
            'es': ['es-ES'],
            'eu': ['eu-ES'],
            'fil': ['fil-PH'],
            'fr': ['fr-FR'],
            'gl': ['gl-ES'],
            'hr': ['hr_HR'],
            'zu': ['zu-ZA'],
            'is': ['is-IS'],
            'it': ['it-IT'],
            'lt': ['lt-LT'],
            'hu': ['hu-HU'],
            'nl': ['nl-NL'],
            'nb': ['nb-NO'],
            'pl': ['pl-PL'],
            'pt': ['pt-BR'],
            'ro': ['ro-RO'],
            'sl': ['sl-SI'],
            'sk': ['sk-SK'],
            'fi': ['fi-FI'],
            'sv': ['sv-SE'],
            'vi': ['vi-VN'],
            'tr': ['tr-TR'],
            'el': ['el-GR'],
            'bg': ['bg-BG'],
            'ru': ['ru-RU'],
            'sr': ['sr-RS'],
            'uk': ['uk-UA'],
            'ko': ['ko-KR'],
            'zh-CN': ['cmn-Hans-CN'],
            'ja': ['ja-JP'],
            'hi': ['hi-IN'],
            'th': ['th-TH']
        }
    });

    ke.import('ext.arr', function () {
        for (var k in ke.ext.const.lang.tuList) {
            ke.ext.const.lang.tuEnum.push(ke.ext.const.lang.tuList[k]);
            ke.ext.const.lang.tuEnumForG =
                ke.ext.arr.pushUnique(ke.ext.const.lang.tuEnumForG, ke.ext.const.lang.tuList[k].split('-').shift());
        }
    });

})();