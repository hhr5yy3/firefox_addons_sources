const PASSCODE_PATTERNS = {

    EN: [
        { pattern: "one.*time.*code" },
        { pattern: "one.*time.*password" },
        { pattern: "otp" }
    ],

    CS: [
        { pattern: "jednorázový.*kód" },
        { pattern: "jednorázový.*hesl" }
    ],

    DA: [
        { pattern: "en.*gangs.*kode" },
        { pattern: "en.*gangs.*adgangskode" }
    ],

    DE: [
        { pattern: "einmal.*code" },
        { pattern: "einmal.*passwort" }
    ],

    EL: [
        { pattern: "εφάπαξ.*κωδικός" },
        { pattern: "κωδικός.*μιάς.*χρήσης" }
    ],

    ES: [
        { pattern: "código.*una.*sola.*vez" },
        { pattern: "contraseña.*un.*solo.*uso" }
    ],

    FI: [
        { pattern: "yhden.*kerran.*koodi" },
        { pattern: "yhden.*kerran.*salasana" }
    ],

    FR: [
        { pattern: "code.*unique" },
        { pattern: "code.*temporel" },
        { pattern: "mot.*de.*passe.*unique" }
    ],

    HE: [
        { pattern: "פעמי\s*חד\s*קוד" },
        { pattern: "פעמית*.חד*.סיסמה" }
    ],

    HU: [
        { pattern: "egyszeri.*kód" },
        { pattern: "alkalmi.*jelszó" }
    ],

    IT: [
        { pattern: "codice.*unico" },
        { pattern: "volta.*password" }
    ],

    JA: [
        { pattern: "ワン.*タイム.*コード" },
        { pattern: "ワン.*タイム.*パスワード" }
    ],
    KO: [
        { pattern: "일회성.*코드" },
        { pattern: "일회성.*패스워드" }
    ],

    NL: [
        { pattern: "eenmalige.*code" },
        { pattern: "eenmalig.*wachtwoord" }
    ],

    NO: [
        { pattern: "engangskode" },
        { pattern: "engangspassord" }
    ],

    PL: [
        { pattern: "kod.*jednorazowy" },
        { pattern: "jednorazowe.*hasło" }
    ],

    PT: [
        { pattern: "código.*único" },
        { pattern: "senha.*único" }
    ],

    PT_BR: [
        { pattern: "código.*único" },
        { pattern: "senha.*único" }
    ],

    RU: [
        { pattern: "одноразовый.*код" },
        { pattern: "одноразовый.*пароль" }
    ],

    RO: [
        { pattern: "cod.*unic" },
        { pattern: "parolă.*unică.*folosință" }
    ],

    SV: [
        { pattern: "engångskod" },
        { pattern: "engångslösenord" }
    ],

    TR: [
        { pattern: "bir.*defalık.*kod" },
        { pattern: "tek.*seferlik.*şifre" }
    ],

    UK: [
        { pattern: "одноразовий.*код" },
        { pattern: "одноразовий.*пароль" }
    ],

    ZH_CN: [
        { pattern: "一次.*性.*代码" },
        { pattern: "一次.*密码" }
    ],

    ZH: [
        { pattern: "一次.*性.*代碼" },
        { pattern: "一次.*密碼" }
    ]

}