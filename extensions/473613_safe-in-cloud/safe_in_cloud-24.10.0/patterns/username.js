const USERNAME_PATTERNS = {

    EN: [
        { pattern: "user" },
        { pattern: "login" },
        { pattern: "account" },
        { pattern: "tin" },
        { pattern: "customer", guess: 50 }
    ],

    CS: [
        { pattern: "uživatel" },
        { pattern: "přihlášení" },
        { pattern: "Účet" },
        { pattern: "zákazník", guess: 50 }
    ],

    DA: [
        { pattern: "bruger|brugernavn" },
        { pattern: "log.*på|přihlašovací" },
        { pattern: "konto" },
        { pattern: "kunde", guess: 50 }
    ],

    DE: [
        { pattern: "benutzer" },
        { pattern: "anmeldung|anmeldename" },
        { pattern: "konto" },
        { pattern: "kunde", guess: 50 },
        { pattern: "zugangsnummer" }
    ],

    EL: [
        { pattern: "χρήστη" },
        { pattern: "Σύνδεση" },
        { pattern: "λογαριασμός" },
        { pattern: "πελάτης", guess: 50 }
    ],

    ES: [
        { pattern: "usuario" },
        { pattern: "iniciar.*sesión" },
        { pattern: "cuenta" },
        { pattern: "nie" },
        { pattern: "cliente", guess: 50 }
    ],

    FI: [
        { pattern: "käyttäjä" },
        { pattern: "kirjaudu.*sisään|käyttäjätunnus" },
        { pattern: "tili" },
        { pattern: "asiakas", guess: 50 }
    ],

    FR: [
        { pattern: "utilisateur|identifiant" },
        { pattern: "s.?identifier" },
        { pattern: "compte" },
        { pattern: "client", guess: 50 }
    ],

    HE: [
        { pattern: "מִשׁתַמֵשׁ|צוֹרֵך" },
        { pattern: "התחברות" },
        { pattern: "חֶשְׁבּוֹן" },
        { pattern: "צרכן", guess: 50 }
    ],

    HU: [
        { pattern: "használó" },
        { pattern: "belépés" },
        { pattern: "számla" },
        { pattern: "vevő", guess: 50 }
    ],

    IT: [
        { pattern: "utente" },
        { pattern: "accesso" },
        { pattern: "account" },
        { pattern: "cliente", guess: 50 }
    ],

    JA: [
        { pattern: "ユーザー" },
        { pattern: "ログイン.*する" },
        { pattern: "アカウント" },
        { pattern: "お客様", guess: 50 }
    ],
    KO: [
        { pattern: "사용자" },
        { pattern: "로그인" },
        { pattern: "계정" },
        { pattern: "고객", guess: 50 }
    ],

    NL: [
        { pattern: "gebruiker" },
        { pattern: "account" },
        { pattern: "klant", guess: 50 }
    ],

    NO: [
        { pattern: "bruker" },
        { pattern: "logg.*inn" },
        { pattern: "regnskap" },
        { pattern: "kunde", guess: 50 }
    ],

    PL: [
        { pattern: "użytkownik" },
        { pattern: "zaloguj.*sie" },
        { pattern: "konto" },
        { pattern: "klient", guess: 50 }
    ],

    PT: [
        { pattern: "utilizador|usuário" },
        { pattern: "conecte.?se" },
        { pattern: "conta" },
        { pattern: "cliente", guess: 50 }
    ],

    PT_BR: [
        { pattern: "usuário" },
        { pattern: "login" },
        { pattern: "conta" },
        { pattern: "cliente", guess: 50 }
    ],

    RU: [
        { pattern: "пользовател" },
        { pattern: "логин" },
        { pattern: "учётн.*запис" },
        { pattern: "инн" },
        { pattern: "клиент", guess: 50 }
    ],

    RO: [
        { pattern: "utilizator" },
        { pattern: "autentificare" },
        { pattern: "cont" },
        { pattern: "client", guess: 50 }
    ],

    SV: [
        { pattern: "användare" },
        { pattern: "logga.*in" },
        { pattern: "konto" },
        { pattern: "kund", guess: 50 }
    ],

    TR: [
        { pattern: "kullanıcı" },
        { pattern: "oturum.*aç" },
        { pattern: "hesap" },
        { pattern: "müşteri", guess: 50 }
    ],

    UK: [
        { pattern: "користувач" },
        { pattern: "вхід" },
        { pattern: "обліков.*запис" },
        { pattern: "замовник", guess: 50 }
    ],

    ZH_CN: [
        { pattern: "邮箱" },
        { pattern: "用户" },
        { pattern: "登录" },
        { pattern: "帐户" },
        { pattern: "顾客", guess: 50 }
    ],

    ZH: [
        { pattern: "郵箱" },
        { pattern: "用戶" },
        { pattern: "登錄" },
        { pattern: "帳戶" },
        { pattern: "顧客", guess: 50 }
    ]

}