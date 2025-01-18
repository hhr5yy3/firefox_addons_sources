const NAME_PATTERNS = {

    EN: [
        { pattern: "card.*holder" },
        { pattern: "name.*on.*card" },
        { pattern: "owner", guess: 50 },
        { pattern: "name", guess: 50 }
    ],

    CS: [
        { pattern: "držák.*karty" },
        { pattern: "jméno.*na.*kartě" },
        { pattern: "majitel", guess: 50 },
        { pattern: "název|jméno", guess: 50 }
    ],

    DA: [
        { pattern: "kortholder" },
        { pattern: "navn.*på.*kort" },
        { pattern: "ejer", guess: 50 },
        { pattern: "navn|ry", guess: 50 }
    ],

    DE: [
        { pattern: "kartenhalter" },
        { pattern: "name.*karte" },
        { pattern: "eigentümer", guess: 50 },
        { pattern: "name", guess: 50 }
    ],

    EL: [
        { pattern: "κάτοχος.*κάρτας" },
        { pattern: "όνομα.*στην.*κάρτα" },
        { pattern: "ιδιοκτήτης", guess: 50 },
        { pattern: "όνομα", guess: 50 }
    ],

    ES: [
        { pattern: "titular.*tarjeta" },
        { pattern: "nombre.*tarjeta" },
        { pattern: "poseedor", guess: 50 },
        { pattern: "nombre", guess: 50 }
    ],

    FI: [
        { pattern: "kortin.*haltija" },
        { pattern: "nimi.*kortilla" },
        { pattern: "omistaja", guess: 50 },
        { pattern: "nimi", guess: 50 }
    ],

    FR: [
        { pattern: "titulaire.*carte" },
        { pattern: "nom.*carte" },
        { pattern: "propriétaire", guess: 50 },
        { pattern: "nom", guess: 50 }
    ],

    HE: [
        { pattern: "כרטיס\s*מחזיק" },
        { pattern: "בכרטיס\s*שם" },
        { pattern: "בעלים", guess: 50 },
        { pattern: "שֵׁם", guess: 50 }
    ],

    HU: [
        { pattern: "kártyatartó" },
        { pattern: "kártyán.*szereplő.*név" },
        { pattern: "tulajdonos", guess: 50 },
        { pattern: "név", guess: 50 }
    ],

    IT: [
        { pattern: "titolare.*carta" },
        { pattern: "nome.*carta" },
        { pattern: "possessore", guess: 50 },
        { pattern: "nome", guess: 50 }
    ],

    JA: [
        { pattern: "カード.*ホルダー" },
        { pattern: "カード.*上の.*名前" },
        { pattern: "オーナー", guess: 50 },
        { pattern: "名前", guess: 50 }
    ],
    KO: [
        { pattern: "카드.*홀더" },
        { pattern: "카드.*이름" },
        { pattern: "소유자", guess: 50 },
        { pattern: "이름", guess: 50 }
    ],

    NL: [
        { pattern: "kaarthouder" },
        { pattern: "naam.*kaart" },
        { pattern: "bezitter", guess: 50 },
        { pattern: "naam", guess: 50 }
    ],

    NO: [
        { pattern: "kortholder" },
        { pattern: "navn.*på.*kort" },
        { pattern: "eieren", guess: 50 },
        { pattern: "navn", guess: 50 }
    ],

    PL: [
        { pattern: "posiadacz.*karty" },
        { pattern: "imię.*na.*karcie" },
        { pattern: "właściciel", guess: 50 },
        { pattern: "imię", guess: 50 }
    ],

    PT: [
        { pattern: "titular.*cartão" },
        { pattern: "nome.*cartão" },
        { pattern: "possuidor", guess: 50 },
        { pattern: "nome", guess: 50 }
    ],

    PT_BR: [
        { pattern: "porta.*cartas" },
        { pattern: "nome.*no.*cartão" },
        { pattern: "proprietário", guess: 50 },
        { pattern: "nome", guess: 50 }
    ],

    RU: [
        { pattern: "держатель.*карты" },
        { pattern: "имя.*карте" },
        { pattern: "владелец", guess: 50 },
        { pattern: "имя", guess: 50 }
    ],

    RO: [
        { pattern: "titular.*de.*card" },
        { pattern: "numele.*de.*pe.*card" },
        { pattern: "proprietar", guess: 50 },
        { pattern: "nume", guess: 50 }
    ],

    SV: [
        { pattern: "korthållare" },
        { pattern: "namn.*på.*kort" },
        { pattern: "ägare", guess: 50 },
        { pattern: "namn", guess: 50 }
    ],

    TR: [
        { pattern: "kart.*sahibi" },
        { pattern: "karttaki.*isim" },
        { pattern: "sahip", guess: 50 },
        { pattern: "isim", guess: 50 }
    ],

    UK: [
        { pattern: "власник.*картки" },
        { pattern: "Ім.*я.*на.*картці" },
        { pattern: "власник", guess: 50 },
        { pattern: "назва", guess: 50 }
    ],

    ZH_CN: [
        { pattern: "持.*卡.*人" },
        { pattern: "卡片.*上.*的.*名字" },
        { pattern: "所有者", guess: 50 },
        { pattern: "名称", guess: 50 }
    ],

    ZH: [
        { pattern: "持.*卡.*人" },
        { pattern: "卡片.*上.*的.*名字" },
        { pattern: "所有者", guess: 50 },
        { pattern: "名稱", guess: 50 }
    ]

}