const SUBMIT_PATTERNS = {

    EN: [
        { pattern: "submit|send" },
        { pattern: "login|sign.*in|log.*in|enter|admission" },
        { pattern: "register" },
        { pattern: "change" }
    ],

    CS: [
        { pattern: "předložit|poslat" },
        { pattern: "přihlásit.*se|vstoupit|přijetí" },
        { pattern: "registrovat" },
        { pattern: "změna" }
    ],

    DA: [
        { pattern: "indsend|sende" },
        { pattern: "log.*på|log.*ind|gå.*ind|adgang" },
        { pattern: "tilmeld" },
        { pattern: "lave.*om" }
    ],

    DE: [
        { pattern: "einreichen|senden" },
        { pattern: "anmeldung|einloggen|anmeldung|eingeben|eintritt" },
        { pattern: "registrieren" },
        { pattern: "veränderung" }
    ],

    EL: [
        { pattern: "υποβάλλουν|στείλετε" },
        { pattern: "Σύνδεση|Συνδεθείτε|εισαγω|άδεια" },
        { pattern: "κανω.*ΕΓΓΡΑΦΗ" },
        { pattern: "αλλαγή" }
    ],

    ES: [
        { pattern: "enviar" },
        { pattern: "iniciar.*sesión|registrarse|entrar|admisión" },
        { pattern: "registrarse" },
        { pattern: "cambio" }
    ],

    FI: [
        { pattern: "lähetä|lähettää" },
        { pattern: "kirjaudu.*sisään|tulla.*sisään|pääsy" },
        { pattern: "rekisteröidy" },
        { pattern: "muuttaa" }
    ],

    FR: [
        { pattern: "soumettre|envoyer" },
        { pattern: "s.*identifier|se.*connecter|entrer|admission" },
        { pattern: "s.*inscrire" },
        { pattern: "changement" }
    ],

    HE: [
        { pattern: "שינוי|לִשְׁלוֹחַ" },
        { pattern: "התחברות|להתחבר|להיכנס|הוֹדָאָה" },
        { pattern: "להירשם" },
        { pattern: "שינוי" }
    ],

    HU: [
        { pattern: "beküldés|küld" },
        { pattern: "bejelentkezés|belép|belép" },
        { pattern: "regisztráció" },
        { pattern: "változás" }
    ],

    IT: [
        { pattern: "invia|spedire" },
        { pattern: "accesso|registrati|accedere|ammissione|accedi" },
        { pattern: "registrati" },
        { pattern: "modificare" }
    ],

    JA: [
        { pattern: "参加.*する|送る" },
        { pattern: "ログイン.*する|サイン.*イン|入る|入場" },
        { pattern: "登録" },
        { pattern: "変化.*する" }
    ],
    KO: [
        { pattern: "제출|보내다" },
        { pattern: "로그인|로그인|시작하다|입장" },
        { pattern: "레지스터" },
        { pattern: "변화" }
    ],

    NL: [
        { pattern: "indienen|sturen" },
        { pattern: "inloggen|log.*in|invoeren|toelating" },
        { pattern: "registreren" },
        { pattern: "verandering" }
    ],

    NO: [
        { pattern: "sende.*inn|sende" },
        { pattern: "logg.*inn|tast.*inn|adgang" },
        { pattern: "registrere" },
        { pattern: "endring" }
    ],

    PL: [
        { pattern: "zatwierdź|wysłać" },
        { pattern: "zaloguj.*sie|wchodzić|wstęp" },
        { pattern: "zarejestrować" },
        { pattern: "zmiana" }
    ],

    PT: [
        { pattern: "enviar" },
        { pattern: "сonecte.*se|assinar.*em|entrar|admissão" },
        { pattern: "registro" },
        { pattern: "mudança" }
    ],

    PT_BR: [
        { pattern: "enviar" },
        { pattern: "сonecte.*se|assinar.*em|entrar|admissão" },
        { pattern: "registro" },
        { pattern: "mudança" }
    ],

    RU: [
        { pattern: "отправить" },
        { pattern: "войти|вход|зайти" },
        { pattern: "регистр" },
        { pattern: "изменит|помен" }
    ],

    RO: [
        { pattern: "trimite" },
        { pattern: "autentificare|conectare|introduce|admitere" },
        { pattern: "inregistreaza.*te" },
        { pattern: "schimbare" }
    ],

    SV: [
        { pattern: "skicka.*in|skicka" },
        { pattern: "logga.*in|stiga.*på|tillträde" },
        { pattern: "registrera" },
        { pattern: "förändra" }
    ],

    TR: [
        { pattern: "sunmak|göndermek" },
        { pattern: "oturum.*aç|giriş|kabul" },
        { pattern: "kayıt.*ol" },
        { pattern: "değişiklik" }
    ],

    UK: [
        { pattern: "подати|надіслати" },
        { pattern: "логін|увійти|увійдіть|введіть|допуск" },
        { pattern: "реєструвати" },
        { pattern: "змінити" }
    ],

    ZH_CN: [
        { pattern: "提交|发送" },
        { pattern: "登录|登入|输入|入.*场" },
        { pattern: "寄存器" },
        { pattern: "更改" }
    ],

    ZH: [
        { pattern: "提交|發送" },
        { pattern: "登錄|登入|輸入|入場" },
        { pattern: "寄存器" },
        { pattern: "更改" }
    ]

}