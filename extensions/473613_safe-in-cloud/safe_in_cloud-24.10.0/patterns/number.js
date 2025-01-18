const NUMBER_PATTERNS = {

    EN: [
        { pattern: "card.*number" },
        { pattern: "\\b0000 0000 0000 0000\\b", guess: 50 },
        { pattern: "card.*no", guess: 50 },
        { pattern: "card.*#", guess: 50 },
        { pattern: "number", guess: 50 }
    ],

    CS: [
        { pattern: "číslo.*karty" },
        { pattern: "číslo", guess: 50 }
    ],

    DA: [
        { pattern: "kortnummer" },
        { pattern: "nummer", guess: 50 }
    ],

    DE: [
        { pattern: "kartennummer" },
        { pattern: "nummer", guess: 50 }
    ],

    EL: [
        { pattern: "αριθμός.*κάρτας" },
        { pattern: "αριθμός", guess: 50 }
    ],

    ES: [
        { pattern: "número.*tarjeta" },
        { pattern: "número", guess: 50 }
    ],

    FI: [
        { pattern: "kortin.*numero" },
        { pattern: "määrä|numero", guess: 50 }
    ],

    FR: [
        { pattern: "numéro.*carte" },
        { pattern: "nombre", guess: 50 }
    ],

    HE: [
        { pattern: "כרטיס\s*מספר" },
        { pattern: "מספר", guess: 50 }
    ],

    HU: [
        { pattern: "kártyaszám" },
        { pattern: "szám", guess: 50 }
    ],

    IT: [
        { pattern: "numero.*carta" },
        { pattern: "numero", guess: 50 }
    ],

    JA: [
        { pattern: "カード.*番号" },
        { pattern: "数", guess: 50 }
    ],
    KO: [
        { pattern: "카드.*번호" },
        { pattern: "번호", guess: 50 }
    ],

    NL: [
        { pattern: "kaartnummer" },
        { pattern: "aantal|nummer|getal", guess: 50 }
    ],

    NO: [
        { pattern: "kortnummer" },
        { pattern: "antall", guess: 50 }
    ],

    PL: [
        { pattern: "numer.*karty" },
        { pattern: "numer", guess: 50 }
    ],

    PT: [
        { pattern: "número.*cartão" },
        { pattern: "número", guess: 50 }
    ],

    PT_BR: [
        { pattern: "número.*do.*cartão" },
        { pattern: "número", guess: 50 }
    ],

    RU: [
        { pattern: "номер.*карт" },
        { pattern: "номер", guess: 50 }
    ],

    RO: [
        { pattern: "număr.*de.*card" },
        { pattern: "număr", guess: 50 }
    ],

    SV: [
        { pattern: "kortnummer" },
        { pattern: "siffra|nummer", guess: 50 }
    ],

    TR: [
        { pattern: "kart.*numarası" },
        { pattern: "numara", guess: 50 }
    ],

    UK: [
        { pattern: "номер.*картки" },
        { pattern: "номер", guess: 50 }
    ],

    ZH_CN: [
        { pattern: "卡.*号" },
        { pattern: "数|编号|号", guess: 50 }
    ],

    ZH: [
        { pattern: "卡.*號" },
        { pattern: "數", guess: 50 }
    ]

}