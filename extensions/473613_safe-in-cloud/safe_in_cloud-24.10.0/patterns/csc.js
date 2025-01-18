const CSC_PATTERNS = {

    EN: [
        { pattern: "csc|cvc|cvn|cvv" },
        { pattern: "security.*code" },
        { pattern: "verification", guess: 50 },
        { pattern: "code", guess: 50 }
    ],

    CS: [
        { pattern: "bezpečnostní.*kód" },
        { pattern: "ověření", guess: 50 },
        { pattern: "kód", guess: 50 }
    ],

    DA: [
        { pattern: "sikkerhedskode" },
        { pattern: "verifikation", guess: 50 },
        { pattern: "kode", guess: 50 }
    ],

    DE: [
        { pattern: "sicherheitscode" },
        { pattern: "nachprüfung", guess: 50 },
        { pattern: "code", guess: 50 }
    ],

    EL: [
        { pattern: "κωδικός.*ασφαλείας" },
        { pattern: "επαλήθευση", guess: 50 },
        { pattern: "κώδικας", guess: 50 }
    ],

    ES: [
        { pattern: "código.*seguridad" },
        { pattern: "verificación", guess: 50 },
        { pattern: "código", guess: 50 }
    ],

    FI: [
        { pattern: "turvakoodi" },
        { pattern: "todentaminen", guess: 50 },
        { pattern: "koodi", guess: 50 }
    ],

    FR: [
        { pattern: "code.*sécurité" },
        { pattern: "vérification", guess: 50 },
        { pattern: "code", guess: 50 }
    ],

    HE: [
        { pattern: "אבטחה\s*קוד" },
        { pattern: "אימות", guess: 50 },
        { pattern: "קוד", guess: 50 }
    ],

    HU: [
        { pattern: "biztonsági.*kód" },
        { pattern: "igazolás", guess: 50 },
        { pattern: "kód", guess: 50 }
    ],

    IT: [
        { pattern: "codice.*sicurezza" },
        { pattern: "verifica", guess: 50 },
        { pattern: "codice", guess: 50 }
    ],

    JA: [
        { pattern: "セキュリティ.*コード" },
        { pattern: "検証", guess: 50 },
        { pattern: "コード", guess: 50 }
    ],
    KO: [
        { pattern: "보안.*코드" },
        { pattern: "확인", guess: 50 },
        { pattern: "암호|코드", guess: 50 }
    ],

    NL: [
        { pattern: "beveiligingscode" },
        { pattern: "verificatie", guess: 50 },
        { pattern: "code", guess: 50 }
    ],

    NO: [
        { pattern: "sikkerhetskode" },
        { pattern: "bekreftelse", guess: 50 },
        { pattern: "kode", guess: 50 }
    ],

    PL: [
        { pattern: "kod.*bezpieczeństwa" },
        { pattern: "weryfikacja", guess: 50 },
        { pattern: "kod", guess: 50 }
    ],

    PT: [
        { pattern: "código.*segurança" },
        { pattern: "verificação", guess: 50 },
        { pattern: "código", guess: 50 }
    ],

    PT_BR: [
        { pattern: "código.*de.*segurança" },
        { pattern: "verificação", guess: 50 },
        { pattern: "código", guess: 50 }
    ],

    RU: [
        { pattern: "код.*безопасности" },
        { pattern: "проверка", guess: 50 },
        { pattern: "код", guess: 50 }
    ],

    RO: [
        { pattern: "cod.*de.*securitate" },
        { pattern: "verificare", guess: 50 },
        { pattern: "cod", guess: 50 }
    ],

    SV: [
        { pattern: "säkerhetskod" },
        { pattern: "verifiering", guess: 50 },
        { pattern: "koda", guess: 50 }
    ],

    TR: [
        { pattern: "güvenlik.*kod" },
        { pattern: "doğrulama", guess: 50 },
        { pattern: "kod", guess: 50 }
    ],

    UK: [
        { pattern: "код.*безпеки" },
        { pattern: "перевірка", guess: 50 },
        { pattern: "код", guess: 50 }
    ],

    ZH_CN: [
        { pattern: "安全.*码" },
        { pattern: "验证", guess: 50 },
        { pattern: "码", guess: 50 }
    ],

    ZH: [
        { pattern: "安全.*碼" },
        { pattern: "驗證", guess: 50 },
        { pattern: "碼", guess: 50 }
    ]

}