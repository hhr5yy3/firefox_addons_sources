const EXP_DATE_PATTERNS = {

    EN: [
        { pattern: "date" },
        { pattern: "valid" },
        { pattern: "month.*year" },
        { pattern: "mm.*yy" }
    ],

    CS: [
        { pattern: "datum" },
        { pattern: "platný" },
        { pattern: "měsíc.*rok" },
        { pattern: "mm.*rr" }
    ],

    DA: [
        { pattern: "dato|daddel" },
        { pattern: "gyldig|velbegrundet" },
        { pattern: "måned.*år" },
        { pattern: "mm.*åå" }
    ],

    DE: [
        { pattern: "datum" },
        { pattern: "gültig" },
        { pattern: "monat.*jahr" },
        { pattern: "mm.*jj" }
    ],

    EL: [
        { pattern: "ημερομηνία" },
        { pattern: "μήνας.*χρόνος" },
        { pattern: "έγκυρος" }
    ],

    ES: [
        { pattern: "fecha" },
        { pattern: "válido|valedero|vigente" },
        { pattern: "mes.*año" },
        { pattern: "mm.*aa" }
    ],

    FI: [
        { pattern: "päivämäärä" },
        { pattern: "kuukausi.*vuosi" },
        { pattern: "pätevä" }
    ],

    FR: [
        { pattern: "date|rancard" },
        { pattern: "valide|valable" },
        { pattern: "mois.*année" },
        { pattern: "mm.*aa" }
    ],

    HE: [
        { pattern: "תַאֲרִיך" },
        { pattern: "חודש.*שנה" },
        { pattern: "תָקֵף" }
    ],

    HU: [
        { pattern: "dátum" },
        { pattern: "hónap.*év" },
        { pattern: "érvényes" }
    ],

    IT: [
        { pattern: "data|dattero" },
        { pattern: "valido|giustificato" },
        { pattern: "mese.*anno" },
        { pattern: "mm.*aa" }
    ],

    JA: [
        { pattern: "日付" },
        { pattern: "月.*年" },
        { pattern: "有効" }
    ],
    KO: [
        { pattern: "데이트" },
        { pattern: "월.*년" },
        { pattern: "유효한" }
    ],

    NL: [
        { pattern: "datum|dagtekening|afspraakje" },
        { pattern: "maand.*jaar" },
        { pattern: "geldig|geldend" }
    ],

    NO: [
        { pattern: "dato|daddel" },
        { pattern: "måned.*år" },
        { pattern: "gyldig" }
    ],

    PL: [
        { pattern: "data" },
        { pattern: "ważny" },
        { pattern: "miesiąc.*rok" },
        { pattern: "mm.*rr" }
    ],

    PT: [
        { pattern: "encontro|tâmara|data" },
        { pattern: "válido" },
        { pattern: "mês.*ano" },
        { pattern: "mm.*aa" }
    ],

    PT_BR: [
        { pattern: "data" },
        { pattern: "válido" },
        { pattern: "mês.*ano" },
        { pattern: "mm.*aa" }
    ],

    RU: [
        { pattern: "дата" },
        { pattern: "действительна" },
        { pattern: "месяц.*год" },
        { pattern: "мм.*гг|mm.*гг" }
    ],

    RO: [
        { pattern: "data" },
        { pattern: "valabil" },
        { pattern: "lună.*an" },
        { pattern: "ll.*aa" }
    ],

    SV: [
        { pattern: "datum" },
        { pattern: "månad.*år" },
        { pattern: "giltig" }
    ],

    TR: [
        { pattern: "tarih" },
        { pattern: "ay.*yıl" },
        { pattern: "geçerli" }
    ],

    UK: [
        { pattern: "дата" },
        { pattern: "місяць.*рік" },
        { pattern: "дійсний" }
    ],

    ZH_CN: [
        { pattern: "日期" },
        { pattern: "年.*月" },
        { pattern: "有效" }
    ],

    ZH: [
        { pattern: "日期" },
        { pattern: "年.*月" },
        { pattern: "有效" }
    ]

}