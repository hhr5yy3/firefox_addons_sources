const CONFIRM_EMAIL_PATTERNS = {

    EN: [
        { pattern: "confirm.*e.?mail|e.?mail.*confirm" },
        { pattern: "repeat.*e.?mail|e.?mail.*repeat" },
        { pattern: "e.?mail.*again|again.*e.?mail" },
        { pattern: "re.?enter.*e.?mail" },
        { pattern: "check.*e.?mail" },
        { pattern: "confirm", guess: 50 }
    ],

    CS: [
        { pattern: "potvrďte.*e.?mailem" },
        { pattern: "kontrola.*e.?mailem" },
        { pattern: "potvrďte", guess: 50 }
    ],

    DA: [
        { pattern: "bekræft.*e.*mail" },
        { pattern: "e.*mail.*kontrol" },
        { pattern: "bekræft", guess: 50 }
    ],

    DE: [
        { pattern: "e.*mail.*bestätigen|bestätigen.*e.*mail" },
        { pattern: "e.*mail.*wiederholen|e.*mail.*wiederholen" },
        { pattern: "e.*mail.*überprüfung" },
        { pattern: "bestätigen|wiederholen", guess: 50 }
    ],

    EL: [
        { pattern: "Επιβεβαίωση.*ΗΛΕΚΤΡΟΝΙΚΗ.*ΔΙΕΥΘΥΝΣΗ" },
        { pattern: "έλεγχος.*ΗΛΕΚΤΡΟΝΙΚΗ.*ΔΙΕΥΘΥΝΣΗ" },
        { pattern: "Επιβεβαίωση", guess: 50 }
    ],

    ES: [
        { pattern: "confirmar.*email" },
        { pattern: "confirmacion.*email" },
        { pattern: "confirmar", guess: 50 }
    ],

    FI: [
        { pattern: "vahvista.*sähköposti" },
        { pattern: "sähköposti.*tarkistus" },
        { pattern: "vahvista", guess: 50 }
    ],

    FR: [
        { pattern: "confirmez.*email" },
        { pattern: "vérification.*email" },
        { pattern: "confirmez", guess: 50 }
    ],

    HE: [
        { pattern: "אימייל*.אשר" },
        { pattern: "אימייל*.בדיקת" },
        { pattern: "סיסמאות", guess: 50 }
    ],

    HU: [
        { pattern: "email,*megerősítése" },
        { pattern: "email.*ellenőrzése" },
        { pattern: "megerősítése", guess: 50 }
    ],

    IT: [
        { pattern: "conferma.*e.*mail" },
        { pattern: "controllo.*e.*mail" },
        { pattern: "conferma", guess: 50 }
    ],

    JA: [
        { pattern: "e.*メール.*を.*認証.*する" },
        { pattern: "e.*メール.*チェック" },
        { pattern: "を.*認証.*する", guess: 50 }
    ],

    KO: [
        { pattern: "비밀번호.*이메일" },
        { pattern: "이메일.*비밀번호" },
        { pattern: "비밀번호", guess: 50 }
    ],

    NL: [
        { pattern: "bevestig.*e.*mail" },
        { pattern: "herhaal.*e.*mail" },
        { pattern: "e.*mail.*controle" },
        { pattern: "bevestig", guess: 50 }
    ],

    NO: [
        { pattern: "bekreft.*e.?post" },
        { pattern: "e.?post.*sjekk" },
        { pattern: "bekreft", guess: 50 }
    ],

    PL: [
        { pattern: "potwierdź.*e.*mail" },
        { pattern: "sprawdzanie.*e.*mail" },
        { pattern: "potwierdź", guess: 50 }
    ],

    PT: [
        { pattern: "confirme.*email" },
        { pattern: "verificação.*email" },
        { pattern: "confirme", guess: 50 }
    ],

    PT_BR: [
        { pattern: "confirme.*email" },
        { pattern: "verificação.*email" },
        { pattern: "confirmar", guess: 50 }
    ],

    RU: [
        { pattern: "подтвердите.*эл.*почт" },
        { pattern: "подтверждение.*эл.*почт" },
        { pattern: "повторите.*эл.*почт" },
        { pattern: "эл.*почт.*ещё.*раз|эл.*почт.*еще.*раз" },
        { pattern: "проверка.*эл.*почт" },
        { pattern: "подтвердит|подтверждение", guess: 50 }
    ],

    RO: [
        { pattern: "confirmă.*e.*mail" },
        { pattern: "verificare.*e.*mail" },
        { pattern: "confirmă", guess: 50 }
    ],

    SV: [
        { pattern: "bekräfta.*e.?post" },
        { pattern: "e.?post.*koll" },
        { pattern: "bekräfta", guess: 50 }
    ],

    TR: [
        { pattern: "e.?posta.*onayla" },
        { pattern: "e.?posta.*kontrolü" },
        { pattern: "onayla", guess: 50 }
    ],

    UK: [
        { pattern: "підтвердити.*електронн.*пошт|повторіть.*електронн.*пошт" },
        { pattern: "перевірка.*електронн.*пошт" },
        { pattern: "підтвердит|повторіт", guess: 50 }
    ],

    ZH_CN: [
        { pattern: "确认.*电子.*邮件" },
        { pattern: "电子.*邮件.*检查" },
        { pattern: "确认", guess: 50 }
    ],

    ZH: [
        { pattern: "確認.*電子郵件" },
        { pattern: "電子郵件.*檢查" },
        { pattern: "確認", guess: 50 }
    ]
}