const TEL_PATTERNS = {

    EN: [
        { pattern: "telephone|mobile" },
        { pattern: "phone.*number" },
        { pattern: "tel", guess: 50 }
    ],

    CS: [
        { pattern: "telefon|mobilní" },
        { pattern: "telefonní.*číslo" }
    ],

    DA: [
        { pattern: "telefon|mobil" },
        { pattern: "telefonnummer" }
    ],

    DE: [
        { pattern: "telefon|mobil" },
        { pattern: "telefonnummer" },
        { pattern: "vertragsnummer", guess: 50 }
    ],

    EL: [
        { pattern: "τηλέφωνο|κινητό" },
        { pattern: "τηλεφωνικό.*νούμερο" }
    ],

    ES: [
        { pattern: "teléfono|móvil" },
        { pattern: "número.*teléfono" }
    ],

    FI: [
        { pattern: "puhelin|kännykkä" },
        { pattern: "puhelinnumero" }
    ],

    FR: [
        { pattern: "téléphone|portable" },
        { pattern: "numéro.*téléphone" }
    ],

    HE: [
        { pattern: "טֵלֵפוֹן|נייד" },
        { pattern: "מספר*.טלפון" }
    ],

    HU: [
        { pattern: "telefon|mobil" },
        { pattern: "telefonszám" }
    ],

    IT: [
        { pattern: "telefono|cellulare" },
        { pattern: "numero.*telefono" }
    ],

    JA: [
        { pattern: "電話|携帯" },
        { pattern: "電話.*番号" }
    ],
    KO: [
        { pattern: "전화|휴대" },
        { pattern: "전화.*번호" }
    ],

    NL: [
        { pattern: "telefoon|mobiele" },
        { pattern: "telefoonnummer" }
    ],

    NO: [
        { pattern: "telefon|mobil" },
        { pattern: "telefonnummer" }
    ],

    PL: [
        { pattern: "telefon|komórkowy" },
        { pattern: "numer.*telefonu" }
    ],

    PT: [
        { pattern: "telefone|celular" },
        { pattern: "número.*telefone" }
    ],

    PT_BR: [
        { pattern: "telefone|celular" },
        { pattern: "número.*telefone" }
    ],

    RU: [
        { pattern: "телефон|мобильн" },
        { pattern: "номер.*телефон|телефон.*номер" }
    ],

    RO: [
        { pattern: "telefon|mobil" },
        { pattern: "numar.*telefon" }
    ],

    SV: [
        { pattern: "telefon|mobil" },
        { pattern: "telefonnummer" }
    ],

    TR: [
        { pattern: "telefon|cep" },
        { pattern: "telefon.*numarası" }
    ],

    UK: [
        { pattern: "телефон|мобільн" },
        { pattern: "номер.*телефон" }
    ],

    ZH_CN: [
        { pattern: "电话|移动" },
        { pattern: "电话.*号码" }
    ],

    ZH: [
        { pattern: "電話|移動" },
        { pattern: "電話號碼" }
    ]

}