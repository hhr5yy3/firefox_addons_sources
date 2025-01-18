const CONFIRM_PASSWORD_PATTERNS = {

    EN: [
        { pattern: "confirm.*password|password.*confirm|repeat.*password|re.?enter.*password|again.*password|password.*again" },
        { pattern: "password.*check|check.*password", guess: 50 },
        { pattern: "confirm", guess: 50 }
    ],

    CS: [
        { pattern: "potvrďte.*hesl" },
        { pattern: "kontrola.*hesl", guess: 50 },
        { pattern: "potvrďte", guess: 50 }
    ],

    DA: [
        { pattern: "bekræft.*kodeord" },
        { pattern: "adgangskontrol", guess: 50 },
        { pattern: "bekræft", guess: 50 }
    ],

    DE: [
        { pattern: "kennwort.*bestätigen|bestätigen.*passwort" },
        { pattern: "kennwort.*wiederholen|wiederholen.*passwort" },
        { pattern: "passwortüberprüfung", guess: 50 },
        { pattern: "bestätigen|wiederholen", guess: 50 }
    ],

    EL: [
        { pattern: "Επιβεβαίωση.*Κωδικού" },
        { pattern: "έλεγχος.*κωδικού.*πρόσβασης", guess: 50 },
        { pattern: "Επιβεβαίωση", guess: 50 }
    ],

    ES: [
        { pattern: "confirmar.*contraseña" },
        { pattern: "confirmacion.*contraseña", guess: 50 },
        { pattern: "confirmar", guess: 50 }
    ],

    FI: [
        { pattern: "vahvista.*salasana" },
        { pattern: "salasanan.*tarkistus", guess: 50 },
        { pattern: "vahvista", guess: 50 }
    ],

    FR: [
        { pattern: "confirmez.*mot.*de.*passe" },
        { pattern: "vérification.*mot.*de.*passe", guess: 50 },
        { pattern: "confirmez", guess: 50 }
    ],

    HE: [
        { pattern: "סיסמה\s*אשר" },
        { pattern: "סיסמאות.*בדיקת", guess: 50 },
        { pattern: "סיסמאות", guess: 50 }
    ],

    HU: [
        { pattern: "jelszó.*megerősítése" },
        { pattern: "jelszó.*ellenőrzése", guess: 50 },
        { pattern: "megerősítése", guess: 50 }
    ],

    IT: [
        { pattern: "conferma.*password" },
        { pattern: "controllo.*password", guess: 50 },
        { pattern: "conferma", guess: 50 }
    ],

    JA: [
        { pattern: "パスワード.*を.*認証.*する" },
        { pattern: "パスワード.*チェック", guess: 50 },
        { pattern: "を.*認証.*する", guess: 50 }
    ],
    KO: [
        { pattern: "비밀번호.*확인" },
        { pattern: "비밀번호", guess: 50 }
    ],

    NL: [
        { pattern: "bevestig.*wachtwoord" },
        { pattern: "herhaal.*wachtwoord" },
        { pattern: "wachtwoordcontrole", guess: 50 },
        { pattern: "bevestig", guess: 50 }
    ],

    NO: [
        { pattern: "bekreft.*passord" },
        { pattern: "passordsjekk", guess: 50 },
        { pattern: "bekreft", guess: 50 }
    ],

    PL: [
        { pattern: "potwierdź.*hasło" },
        { pattern: "sprawdzanie.*hasła", guess: 50 },
        { pattern: "potwierdź", guess: 50 }
    ],

    PT: [
        { pattern: "confirme.*senha" },
        { pattern: "verificação.*senha", guess: 50 },
        { pattern: "confirme", guess: 50 }
    ],

    PT_BR: [
        { pattern: "confirmar.*senha" },
        { pattern: "verificação.*de.*senha", guess: 50 },
        { pattern: "confirmar", guess: 50 }
    ],

    RU: [
        { pattern: "подтвердите.*пароль|подтверждение.*пароля|повторите.*пароль" },
        { pattern: "пароль.*ещё.*раз|пароль.*еще.*раз" },
        { pattern: "проверка.*пароля", guess: 50 },
        { pattern: "подтвердит|подтверждение", guess: 50 }
    ],

    RO: [
        { pattern: "confirmă.*parola" },
        { pattern: "verificare.*parolă", guess: 50 },
        { pattern: "confirmă", guess: 50 }
    ],

    SV: [
        { pattern: "bekräfta.*lösenord" },
        { pattern: "lösenordskoll", guess: 50 },
        { pattern: "bekräfta", guess: 50 }
    ],

    TR: [
        { pattern: "Şifreyi.*onayla" },
        { pattern: "şifre.*kontrolü", guess: 50 },
        { pattern: "onayla", guess: 50 }
    ],

    UK: [
        { pattern: "підтвердити.*пароль|повторіть.*пароль" },
        { pattern: "перевірка.*пароля", guess: 50 },
        { pattern: "підтвердит|повторіт", guess: 50 }
    ],

    ZH_CN: [
        { pattern: "确认.*密码" },
        { pattern: "密码.*检查", guess: 50 },
        { pattern: "确认", guess: 50 }
    ],

    ZH: [
        { pattern: "確認.*密碼" },
        { pattern: "密碼.*檢查", guess: 50 },
        { pattern: "確認", guess: 50 }
    ]

}