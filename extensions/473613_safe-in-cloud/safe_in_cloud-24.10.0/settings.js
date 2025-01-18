var Settings = (function createSettings() {
    D.func();

    const NEVER_EXPIRES = -1;
    const ONE_TIME = -2;
    const HOUR = 3600;

    const REQUIRE_PASSWORD_SETTING = "ask_password";

    function getRequirePassword() {
        return localStorage[REQUIRE_PASSWORD_SETTING] || "every_time";
    }

    function setRequirePassword(value) {
        localStorage[REQUIRE_PASSWORD_SETTING] = value;
    }

    function getExpiresIn() {
        var requirePassword = getRequirePassword();
        switch (String(requirePassword)) {
            case "every_time":
                return ONE_TIME;
            case "every_hour":
                return HOUR;
            case "every_2_hours":
                return 2 * HOUR;
            case "every_4_hours":
                return 4 * HOUR;
            case "once_a_day":
                return 24 * HOUR;
            case "once_per_session":
            case "once":
            default:
                return NEVER_EXPIRES;
        };
    }

    function getAlphabet(name) {
        D.func();
        return localStorage[name] || getDefaultAlphabet(name);
    }

    function setAlphabet(name, alphabet) {
        D.func();
        localStorage[name] = alphabet;
    }

    function getDefaultAlphabet(alphabet) {
        const DEFAULT_SYMBOLS_ALPHABET = "@#$&*-+!?%^._:'\\/{}[]=()<>";
        const DEFAULT_SEPARATOR_ALPHABET = "@#$&*-+!?%^._:'\\/{}[]=()<>";
        if (alphabet === "symbols_alphabet") {
            return DEFAULT_SYMBOLS_ALPHABET;
        } else if (alphabet === "separator_alphabet") {
            return DEFAULT_SEPARATOR_ALPHABET;
        }
        return null;
    }

    function isExcludeSimilarCharacters() {
        D.func();
        if (localStorage["exclude_similar_charaters"]) {
            // return true or false
            return !!parseInt(localStorage["exclude_similar_charaters"]);
        }
        return false;
    }

    function setExcludeSimilarCharacters(isExcludeSimilarCharaters) {
        D.func();
        localStorage["exclude_similar_charaters"] = isExcludeSimilarCharaters ? 1 : 0;
    }

    function getPasswordLength() {
        D.func();
        const MIN_PASSWORD_LENGTH = 8;
        const MAX_PASSWORD_LENGTH = 64;
        const DEFAULT_PASSWORD_LENGTH = 12;
        const length = parseInt(localStorage["password_length"]);
        if (length >= MIN_PASSWORD_LENGTH && length <= MAX_PASSWORD_LENGTH) {
            return length;
        } else {
            return DEFAULT_PASSWORD_LENGTH;
        }
    }

    function setPasswordLength(length) {
        D.func();
        localStorage["password_length"] = length;
    }

    function getPasswordType() {
        D.func();
        const type = parseInt(localStorage["password_type"]);
        if (type || type === 0) {
            return type;
        } else {
            // default
            const randomType = 2;
            return randomType;
        }
    }

    function setPasswordType(type) {
        D.func();
        localStorage["password_type"] = type;
    }

    function getVersion() {
        const version = parseInt(localStorage["version"]);
        if (version) {
            return version
        }
        return null;
    }

    function setVersion(version) {
        D.func();
        localStorage["version"] = version;
    }

    function setShowNumberOfCards(showNumberOfCards) {
        localStorage["show_number_of_cards"] = showNumberOfCards ? 1 : 0;
    }

    function isShowNumberOfCards() {
        if (localStorage["show_number_of_cards"]) {
            return !!parseInt(localStorage["show_number_of_cards"]);
        }
        return true;
    }

    function setHidePasswords(hidePasswords) {
        localStorage["hide_passwords"] = hidePasswords ? 1 : 0;
    }

    function isHidePasswords() {
        if (localStorage["hide_passwords"]) {
            return !!parseInt(localStorage["hide_passwords"]);
        }
        return true;
    }

    function setCopyOtp(copyOtp) {
        localStorage["copy_otp"] = copyOtp ? 1 : 0;
    }

    function isCopyOtp() {
        if (localStorage["copy_otp"]) {
            return !!parseInt(localStorage["copy_otp"]);
        }
        return true;
    }

    function setLockAtBrowserExit(lockAtBrowserExit) {
        localStorage["lock_at_browser_exit"] = lockAtBrowserExit ? 1 : 0;
    }

    function isLockAtBrowserExit() {
        if (localStorage["lock_at_browser_exit"]) {
            return !!parseInt(localStorage["lock_at_browser_exit"]);
        }
        return true;
    }

    function setTheme(theme) {
        localStorage["theme"] = theme;
    }

    function getTheme() {
        return localStorage["theme"] || "light";
    }

    function getSavePasswords() {
        if (localStorage["save_passwords"]) {
            return localStorage["save_passwords"];
        }
        return "ask";
    }

    function setSavePasswords(savePasswords) {
        localStorage["save_passwords"] = savePasswords;
    }

    function setLockScreenTexture(texture) {
        localStorage["lock_screen_texture"] = texture;
    }

    function getLockScreenTexture() {
        return localStorage["lock_screen_texture"] || "default";
    }

    function setLockScreenImage(image) {
        localStorage["lock_screen_image"] = image;
    }

    function getLockScreenImage() {
        return localStorage["lock_screen_image"] || "default";
    }

    function setLockScreenBackground(lockScreenBackground) {
        localStorage["lock_screen_background"] = lockScreenBackground;
    }

    function getLockScreenBackground() {
        return localStorage["lock_screen_background"] || "none";
    }

    function setLockScreenTextureText(color) {
        localStorage["lock_screen_texture_text"] = color;
    }

    function getLockScreenTextureText() {
        return localStorage["lock_screen_texture_text"] || "default";
    }

    function setLockScreenImageText(color) {
        localStorage["lock_screen_image_text"] = color;
    }

    function getLockScreenImageText() {
        return localStorage["lock_screen_image_text"] || "default";
    }

    return {
        setRequirePassword: function(value) {
            setRequirePassword(value);
        },

        getRequirePassword: function() {
            return getRequirePassword();
        },

        setExcludeSimilarCharacters: function(isExcludeSimilarCharacters) {
            setExcludeSimilarCharacters(isExcludeSimilarCharacters);
        },

        isExcludeSimilarCharacters: function() {
            return isExcludeSimilarCharacters();
        },

        setAlphabet: function(name, alphabet) {
            setAlphabet(name, alphabet);
        },

        getAlphabet: function(name) {
            return getAlphabet(name);
        },

        getDefaultAlphabet: function(alphabet) {
            return getDefaultAlphabet(alphabet);
        },

        setPasswordType: function(type) {
            setPasswordType(type);
        },

        getPasswordType: function() {
            return getPasswordType();
        },

        setPasswordLength: function(length) {
            setPasswordLength(length);
        },

        getPasswordLength: function() {
            return getPasswordLength();
        },

        getVersion: function() {
            return getVersion();
        },

        setVersion: function(version) {
            setVersion(version);
        },

        getExpiresIn: function() {
            return getExpiresIn();
        },

        isShowNumberOfCards: function() {
            return isShowNumberOfCards();
        },

        setShowNumberOfCards: function(showNumberOfCards) {
            setShowNumberOfCards(showNumberOfCards);
        },

        isHidePasswords: function() {
            return isHidePasswords();
        },

        setHidePasswords: function(hidePasswords) {
            setHidePasswords(hidePasswords);
        },

        isCopyOtp: function() {
            return isCopyOtp();
        },

        setCopyOtp: function(copyOtp) {
            setCopyOtp(copyOtp);
        },

        isLockAtBrowserExit: function() {
            return isLockAtBrowserExit();
        },

        setLockAtBrowserExit: function(lockAtBrowserExit) {
            setLockAtBrowserExit(lockAtBrowserExit);
        },


        setTheme: function(theme) {
            setTheme(theme);
        },

        getTheme: function() {
            return getTheme();
        },

        getSavePasswords: function() {
            return getSavePasswords();
        },

        setSavePasswords: function(savePasswords) {
            setSavePasswords(savePasswords);
        },

        getLockScreenTexture: function() {
            return getLockScreenTexture();
        },

        setLockScreenTexture: function(texture) {
            setLockScreenTexture(texture);
        },

        getLockScreenImage: function() {
            return getLockScreenImage();
        },

        setLockScreenImage: function(image) {
            setLockScreenImage(image);
        },

        setLockScreenBackground: function(lockScreenBackground) {
            setLockScreenBackground(lockScreenBackground);
        },

        getLockScreenBackground: function() {
            return getLockScreenBackground();
        },

        setLockScreenTextureText: function(color) {
            setLockScreenTextureText(color);
        },

        getLockScreenTextureText: function() {
            return getLockScreenTextureText();
        },

        setLockScreenImageText: function(color) {
            setLockScreenImageText(color);
        },

        getLockScreenImageText: function() {
            return getLockScreenImageText();
        }
    };

})();