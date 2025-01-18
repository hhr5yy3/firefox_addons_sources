var LabelGuesser = (function createLabelGuesser() {
    D.func();

    const DEFAULT_GUESS = 100;

    const PATTERNS = {
        emailInput: EMAIL_PATTERNS,
        confirmEmailInput: CONFIRM_EMAIL_PATTERNS,
        telInput: TEL_PATTERNS,
        usernameInput: USERNAME_PATTERNS,
        passwordInput: PASSWORD_PATTERNS,
        newPasswordInput: NEW_PASSWORD_PATTERNS,
        confirmPasswordInput: CONFIRM_PASSWORD_PATTERNS,
        passcodeInput: PASSCODE_PATTERNS,
        searchInput: SEARCH_PATTERNS,
        subscribeInput: SUBSCRIBE_PATTERNS,
        nameInput: NAME_PATTERNS,
        numberInput: NUMBER_PATTERNS,
        cscInput: CSC_PATTERNS,
        expMonthInput: EXP_MONTH_PATTERNS,
        expYearInput: EXP_YEAR_PATTERNS,
        expDateInput: EXP_DATE_PATTERNS,
        submitButton: SUBMIT_PATTERNS
    };

    function addLanguage(language, languages) {
        if (!language) {
            return;
        }
        let lang = language.toLocaleUpperCase().replace(/-/g, "_");
        const mapping = {
            NB: "NO",
            ZH_HANS: "ZH_CN",
            ZH_SG: "ZH_CN"
        };
        if (lang in mapping) {
            // apply mapping
            lang = mapping[lang];
        } else if (!(lang in PATTERNS.emailInput)) {
            // cut region
            lang = lang.substring(0, 2);
        }
        // if we have such a language and we have not added it yet
        if ((lang in PATTERNS.emailInput) && !languages.includes(lang)) {
            languages.push(lang);
        }
    }

    function getUserLanguages() {
        let languages = ["EN"];
        // page language
        let pageLanguage = document.querySelector('html').getAttribute('lang');
        addLanguage(pageLanguage, languages);
        // browser languages
        navigator.languages.forEach(browserLanguage => {
            addLanguage(browserLanguage, languages);
        });
        return languages;
    }

    function getLabelGuess(labelText, inputType) {
        if (!labelText) {
            // nothing ? => return min guess
            return 0;
        }
        let maxGuess = 0;
        const languages = getUserLanguages();
        // going through all languages
        for (let i = 0; i < languages.length; i++) {
            let lang = languages[i];
            // get all patterns for current language and input type
            let langPatterns = PATTERNS[inputType][lang];
            for (let j = 0; langPatterns && j < langPatterns.length; j++) {
                if (FindHelper.matchPattern(labelText, langPatterns[j].pattern)) {
                    // save the highest guess
                    let guess = langPatterns[j].guess || DEFAULT_GUESS;
                    if (guess === 100) {
                        return guess; // return if highest already
                    } else if (guess > maxGuess) {
                        maxGuess = guess;
                    }
                }
            }
        }
        return maxGuess;
    }

    return {
        // returns the highest guess (in range 0 - 100) for given labelText and inputType
        getLabelGuess: function(labelText, inputType) {
            return getLabelGuess(labelText, inputType);
        },

        getPatterns: function() {
            return PATTERNS;
        }
    };
})();