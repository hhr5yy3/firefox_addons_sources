const EMAIL_PATTERNS = {

    EN: [
        { pattern: "e.?mail|@.*example" },
        { pattern: "@", guess: 50 }
    ],

    CS: [
        { pattern: "e.?mailem" }
    ],

    DA: [
        { pattern: "e.*mail" }
    ],

    DE: [
        { pattern: "e.*mail" }
    ],

    EL: [
        { pattern: "ΗΛΕΚΤΡΟΝΙΚΗ.*ΔΙΕΥΘΥΝΣΗ" }
    ],

    ES: [
        { pattern: "email" },
        { pattern: "correo.*electrónico", guess: 50 }
    ],

    FI: [
        { pattern: "sähköposti" }
    ],

    FR: [
        { pattern: "email" },
        { pattern: "adresse.*courriel" }
    ],

    HE: [
        { pattern: "אימייל" }
    ],

    HU: [
        { pattern: "email" }
    ],

    IT: [
        { pattern: "e.*mail" }
    ],

    JA: [
        { pattern: "e.*メール" }
    ],

    KO: [
        { pattern: "이메일" }
    ],

    NL: [
        { pattern: "e.*mail" }
    ],

    NO: [
        { pattern: "e.?post" }
    ],

    PL: [
        { pattern: "e.*mail" }
    ],

    PT: [
        { pattern: "email" }
    ],

    PT_BR: [
        { pattern: "o.*email" }
    ],

    RU: [
        { pattern: "эл.*почт" }
    ],

    RO: [
        { pattern: "e.*mail" }
    ],

    SV: [
        { pattern: "e.?post" }
    ],

    TR: [
        { pattern: "e.?posta" }
    ],

    UK: [
        { pattern: "електронн.*пошт" }
    ],

    ZH_CN: [
        { pattern: "电子.*邮件" }
    ],

    ZH: [
        { pattern: "電子郵件" }
    ]

}