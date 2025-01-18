(function mainOptions() {
    D.func();

    const TABS_IDS = {
        PREFERENCES_TAB: "preferences_tab",
        IMPORT_TAB: "import_export_tab",
        ABOUT_TAB: "about_tab",
        SECURITY_TAB: "security_tab",
        LEGAL_TAB: "legal_tab",
        APPEARANCE_TAB: "appearance_tab",
        GENERATOR_TAB: "generator_tab",
        PASSWORD_OPTIONS_TAB: "password_options_tab"
    }

    const LOCALIZED_IDS = [
        // "app_title",
        "keyboard_shortcuts_setting",
        "change_button",
        "show_number_of_cards_setting",
        "hide_passwords_setting",
        "theme_setting",
        "import_export_text",
        "version_text",
        "website_prompt",
        "support_text",
        "privacy_policy_text",
        "legal_text",
        "preferenses_title",
        "import_export_title",
        "about_title",
        "rate_extension_title",
        "lock_title",
        "security_title",
        "options_locations_prompt",
        "save_passwords_setting",
        "off_text",
        "ask_text",
        "automatically_text",
        "copy_otp_setting",
        "help_text",
        "image_text",
        "clear_button",
        "lock_screen_background_setting",
        "none_text",
        "texture_text",
        "lock_screen_text_setting",
        "back_button",
        "appearance_title",
        "light_text",
        "dark_text",
        "generator_title",
        "crack_time_prompt",
        "password_length_prompt",
        "letters_and_numbers_label",
        "numbers_only_label",
        "copy_button",
        "password_options_button",
        "separators_prompt",
        "symbols_prompt",
        "exclude_similar_characters_prompt",
        "ok_button",
        "restore_button",
        "lock_at_browser_exit_setting"
    ];

    const LOCALIZED_SELECTORS = [
        "start_app_button",
        "random_label",
        "memorable_label"
    ];

    document.addEventListener("DOMContentLoaded", function onDOMContentLoaded() {
        D.func();
        setMenuListeners();
        localizePage();
        setTheme();
        // show preferences by default
        PreferencesTab.show();
    });

    function setTheme() {
        D.func();
        if (Settings.getTheme() === "dark") {
            const link = document.createElement("link");
            link.href = "css/options_dark.css";
            link.rel = "stylesheet";
            link.type = "text/css";
            document.head.appendChild(link);
        }
    }

    function setMenuListeners() {
        D.func();
        document.getElementById("preferences_menu_item").addEventListener("click", onPreferencesMenuItemClick);
        document.getElementById("appearance_menu_item").addEventListener("click", onAppearanceMenuItemClick)
        document.getElementById("import_menu_item").addEventListener("click", onImportMenuItemClick);
        document.getElementById("about_menu_item").addEventListener("click", onAboutMenuItemClick);
        document.getElementById("rate_menu_item").addEventListener("click", onRateMenuItemClick);
        document.getElementById("lock_menu_item").addEventListener("click", onLockMenuItemClick);
        document.getElementById("security_menu_item").addEventListener("click", onSecurityMenuItemClick);
        document.getElementById("generator_menu_item").addEventListener("click", onGeneratorMenuItemClick);
    }

    function onPreferencesMenuItemClick(event) {
        D.func();
        setActiveMenuItem(event);
        PreferencesTab.show();
    }

    function onAppearanceMenuItemClick(event) {
        D.func();
        setActiveMenuItem(event);
        AppearanceTab.show();
    }

    function onImportMenuItemClick(event) {
        D.func();
        setActiveMenuItem(event);
        ImportTab.show();
    }

    function onAboutMenuItemClick(event) {
        D.func();
        setActiveMenuItem(event);
        AboutTab.show();
    }

    function onRateMenuItemClick() {
        D.func();
        window.open(Browser.getRateUrl());
    }

    function onLockMenuItemClick() {
        D.func();
        lockExtension();
        alert(Strings.get("extension_locked_message"));
    }

    function lockExtension() {
        D.func();
        localStorage["token"] = 0;
    }

    function onSecurityMenuItemClick(event) {
        D.func();
        setActiveMenuItem(event);
        SecurityTab.show();
    }

    function onGeneratorMenuItemClick(event) {
        D.func();
        setActiveMenuItem(event);
        GeneratorTab.show();
    }

    function setActiveMenuItem(event) {
        D.func();
        document.querySelectorAll(".menu_item").forEach(item => {
            if (item == event.target || item == event.target.parentElement) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    function localizePage() {
        D.func();
        for (let j = 0; j < LOCALIZED_IDS.length; j++) {
            let id = LOCALIZED_IDS[j];
            document.getElementById(id).textContent =
                Strings.get(id);
        }
        for (let k = 0; k < LOCALIZED_SELECTORS.length; k++) {
            let selector = LOCALIZED_SELECTORS[k];
            let elements = document.querySelectorAll("." + selector);
            for (let i = 0; i < elements.length; i++) {
                elements[i].textContent = Strings.get(selector);
            }
        }
    }

    // -- PROTOTYPES ---------------------------------------------------------

    const Tab = {
        isInitialized: false,
        version: chrome.runtime.getManifest().version,
        websiteLanguage: Strings.getWebsiteLanguage(),

        initTab() {
            if (!this.isInitialized) {
                this.init();
                this.isInitialized = true;
            }
        },

        showTab() {
            D.func(this.tabId);
            for (let tabId in TABS_IDS) {
                if (tabId != this.tabId) {
                    document.getElementById(TABS_IDS[tabId]).style.display = "none";
                }
            }
            document.getElementById(this.tabId).style.display = "block";
        },

        onStartAppRowClick() {
            chrome.tabs.create({ url: "sicapp://start" });
        },

        focusInput(input) {
            D.func();
            if (input) {
                input.focus();
                // bug workaround in FF
                setTimeout(function onFocusInputTimeout() {
                    input.focus();
                }, 500);
            }
        },

        copyToClipboard(text) {
            D.func(text);
            if (text) {
                // copy text
                const textArea = document.createElement("textarea");
                textArea.textContent = text;
                const body = document.querySelector("body");
                body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                body.removeChild(textArea);
            }
        }
    }

    // -- PREFERENCES TAB ---------------------------------------------------------

    const PreferencesTab = {
        __proto__: Tab,
        tabId: TABS_IDS.PREFERENCES_TAB,

        init() {
            // set listeners
            document.getElementById("change_button").addEventListener("click", () => this.onChangeButtonClick());
            document.getElementById("show_number_of_cards_checkbox").addEventListener("change", event => this.onShowNumberOfCardsChange(event));
            document.getElementById("hide_passwords_checkbox").addEventListener("change", event => this.onHidePasswordsChange(event));
            document.getElementById("copy_otp_checkbox").addEventListener("change", event => this.onCopyOtpChange(event));
            document.getElementById("save_password_select").addEventListener("change", event => this.onSavePasswordsChange(event));
            document.getElementById("lock_at_browser_exit_checkbox").addEventListener("change", event => this.onLockAtBrowserExitChange(event));
        },

        show() {
            D.func();
            // initialize
            this.initTab();
            // setup
            if (!Browser.canConfigureShortcuts()) {
                document.getElementById("keyboard_shortcuts_option").style.display = "none";
            }
            document.getElementById("show_number_of_cards_checkbox").checked = Settings.isShowNumberOfCards();
            document.getElementById("hide_passwords_checkbox").checked = Settings.isHidePasswords();
            document.getElementById("copy_otp_checkbox").checked = Settings.isCopyOtp();
            document.getElementById("save_password_select").value = Settings.getSavePasswords();
            document.getElementById("lock_at_browser_exit_checkbox").checked = Settings.isLockAtBrowserExit();
            // display
            this.showTab();
        },

        onShowNumberOfCardsChange(event) {
            D.func();
            Settings.setShowNumberOfCards(event.target.checked);
        },

        onChangeButtonClick() {
            D.func();
            chrome.tabs.create({ url: Browser.getShortcutsUrl() });
        },

        onHidePasswordsChange(event) {
            D.func();
            Settings.setHidePasswords(event.target.checked);
        },

        onCopyOtpChange(event) {
            D.func();
            Settings.setCopyOtp(event.target.checked);
        },

        onSavePasswordsChange(event) {
            D.func();
            Settings.setSavePasswords(event.target.value);
        },

        onLockAtBrowserExitChange(event) {
            D.func();
            Settings.setLockAtBrowserExit(event.target.checked);
        }
    }

    // -- IMPORT TAB ---------------------------------------------------------

    const ImportTab = {
        __proto__: Tab,
        tabId: TABS_IDS.IMPORT_TAB,

        init() {
            // set listeners
            document.querySelector(`#${this.tabId} .start_app_row`).addEventListener("click", () => this.onStartAppRowClick());

        },

        show() {
            D.func();
            // initialize
            this.initTab();
            // display
            this.showTab();
        }
    }

    // -- ABOUT TAB ---------------------------------------------------------

    const AboutTab = {
        __proto__: Tab,
        tabId: TABS_IDS.ABOUT_TAB,

        init() {
            // set listeners
            document.getElementById("website_row").addEventListener("click", () => this.onWebsiteRowClick());
            document.getElementById("help_row").addEventListener("click", () => this.onHelpRowClick());
            document.getElementById("support_row").addEventListener("click", () => this.onSupportRowClick());
            document.getElementById("privacy_policy_row").addEventListener("click", () => this.onPrivacyPolicyRowClick());
            document.getElementById("legal_row").addEventListener("click", () => this.onLegalRowClick());
        },

        show() {
            D.func();
            // initialize
            this.initTab();
            // setup
            document.getElementById("version_value").textContent = "SafeInCloud 2 (" + this.version + ")";
            // display
            this.showTab();
        },

        onWebsiteRowClick() {
            D.func();
            window.open("https://www.safe-in-cloud.com");
        },

        onHelpRowClick() {
            D.func();
            window.open("https://www.safe-in-cloud.com/support");
        },

        onSupportRowClick() {
            D.func();
            const email = "support@safe-in-cloud.com";
            let subject = "SafeInCloud 2 browser extension version" + " " + this.version;
            let body = "Your detailed request in English.";
            if (this.websiteLanguage === "ru") {
                subject = "Браузерное расширение SafeInCloud 2 версия" + " " + this.version;
                body = "Подробное описание на русском.";
            }
            window.open(`mailto:${email}?subject=${subject}&body=${body}`);
        },

        onPrivacyPolicyRowClick() {
            D.func();
            window.open(`https://www.safe-in-cloud.com/${this.websiteLanguage}/license.html`);
        },

        onLegalRowClick() {
            D.func();
            LegalTab.show();
        }
    }

    // -- SECRITY TAB ---------------------------------------------------------

    const SecurityTab = {
        __proto__: Tab,
        tabId: TABS_IDS.SECURITY_TAB,

        init() {
            // set listeners
            document.querySelector(`#${this.tabId} .start_app_row`).addEventListener("click", () => this.onStartAppRowClick());
        },

        show() {
            D.func();
            // initialize
            this.initTab();
            // display
            this.showTab();
        }
    }

    // -- LEGAL TAB ---------------------------------------------------------

    const LegalTab = {
        __proto__: Tab,
        tabId: TABS_IDS.LEGAL_TAB,

        init() {
            // set listeners
            document.getElementById("back_button").addEventListener("click", () => this.onBackButtonClick());
        },

        show() {
            D.func();
            // initialize
            this.initTab();
            // display
            this.showTab();
        },

        onBackButtonClick() {
            D.func();
            AboutTab.show();
        }
    }

    // -- APPEARANCE TAB ---------------------------------------------------------

    const AppearanceTab = {
        __proto__: Tab,
        tabId: TABS_IDS.APPEARANCE_TAB,
        lightColor: "#e8eaed",
        darkColor: "#000000",

        init() {
            // set listeners
            document.getElementById("theme_select").addEventListener("change", event => this.onThemeChange(event));
            document.getElementById("lock_screen_background_type_select").addEventListener("change", event => this.onLockScreenBackgroundTypeChange(event.target.value));
            document.querySelectorAll("input[name='lock_screen_texture']").forEach(radio => radio.addEventListener("change", event => this.onLockScreenTextureRadioChange(event)));
            document.querySelectorAll(".lock_screen_texture").forEach(image => image.addEventListener("click", event => this.onLockScreenTextureClick(event)));
            document.getElementById("lock_screen_image_input").addEventListener("input", event => this.onLockScreenImageInput(event));
            document.getElementById("clear_button").addEventListener("click", () => this.onClearButtonClick());
            document.getElementById("lock_screen_image_text_select").addEventListener("input", event => this.onLockScreenImageTextInput(event));
        },

        show() {
            D.func();
            // initialize
            this.initTab();
            // setup
            document.getElementById("theme_select").value = Settings.getTheme();
            this.setLockScreenBackgroundType();
            // display
            this.showTab();
        },

        onThemeChange(event) {
            D.func();
            Settings.setTheme(event.target.value);
            setTimeout(() => alert(Strings.get("theme_changed_message")), 150);
        },

        setLockScreenBackgroundType() {
            D.func();
            const lockScreenBackground = Settings.getLockScreenBackground();
            document.getElementById("lock_screen_background_type_select").value = lockScreenBackground;
            this.onLockScreenBackgroundTypeChange(lockScreenBackground);
        },

        onLockScreenBackgroundTypeChange(type) {
            D.func();
            Settings.setLockScreenBackground(type);
            if (type === "image") {
                this.setLockScreenImage();
                this.setLockScreenImageText();
                // show image
                document.getElementById("lock_screen_image_container").hidden = false;
                // hide texture
                document.getElementById("lock_screen_texture_container").hidden = true;
            } else if (type === "texture") {
                this.setLockScreenTextures();
                // hide image
                document.getElementById("lock_screen_image_container").hidden = true;
                // show texture
                document.getElementById("lock_screen_texture_container").hidden = false;
            } else {
                // hide all
                document.getElementById("lock_screen_texture_container").hidden = true;
                document.getElementById("lock_screen_image_container").hidden = true;
            }
        },

        setLockScreenImage() {
            D.func();
            const image = Settings.getLockScreenImage();
            // has image ?
            if (image !== "default") {
                // set image
                document.getElementById("lock_screen_image").style.backgroundImage = `url(${image})`;
                // set text
                document.getElementById("lock_screen_image_text").hidden = false;
            }
        },

        setLockScreenImageText() {
            const text = Settings.getLockScreenImageText();
            // has text color ?
            if (text !== "default") {
                document.getElementById("lock_screen_image_text_select").jscolor.processValueInput(text);
                document.getElementById("lock_screen_image_text").style.color = text;
            } else {
                // set text color according to theme
                const color = (Settings.getTheme() === "dark") ? this.lightColor : this.darkColor; // text color is opposite to theme
                document.getElementById("lock_screen_image_text_select").jscolor.processValueInput(color);
                document.getElementById("lock_screen_image_text").style.color = color;
            }
        },

        setLockScreenTextures() {
            D.func();
            const textures = document.querySelectorAll(`#${this.tabId} .lock_screen_texture`);
            // ignore default
            for (let i = 0; i < textures.length; i++) {
                textures[i].style.backgroundImage = `url("images/texture_${i + 1}.jpg")`;
            }
            this.setCheckedLockScreenTexture();
        },

        setCheckedLockScreenTexture() {
            D.func();
            const textureRadios = document.querySelectorAll("input[name='lock_screen_texture']");
            const texture = Settings.getLockScreenTexture();
            if (texture === "default") {
                textureRadios[0].checked = true;
            } else {
                const index = parseInt(/\d+/.exec(texture)[0]) - 1;
                textureRadios[index].checked = true;
                this.setLockScreenTextureText(index);
            }
        },

        setLockScreenTextureText(index) {
            D.func();
                // first 6 textures has light text
                Settings.setLockScreenTextureText(index >= 6 ? "light" : "dark")
        },

        onLockScreenTextureClick(event) {
            D.func();
            const index = parseInt(/\d+/.exec(event.target.id)[0]);
            const textureRadio = document.querySelectorAll("input[name='lock_screen_texture']")[index];
            textureRadio.checked = true;
            this.onSelectLockScreenTexture(index);
        },

        onLockScreenTextureRadioChange(event) {
            D.func();
            const index = parseInt(/\d+/.exec(event.target.getAttribute("for"))[0]);
            this.onSelectLockScreenTexture(index);
        },

        onSelectLockScreenTexture(index) {
            D.func();
            // set text
            this.setLockScreenTextureText(index);
            // set texture
            Settings.setLockScreenTexture(`images/texture_${index + 1}.jpg`);
        },

        onLockScreenImageInput(event) {
            D.func();
            const maxFileSize = 3670016; // 3,5 MB
            const file = event.target.files[0];
            // select file ?
            if (file) {
                // image ?
                if (/image/.test(file.type)) {
                    // correct size ?
                    if (file.size < maxFileSize) {
                        const reader = new FileReader();
                        reader.onload = e => {
                            Settings.setLockScreenImage(e.target.result);
                            document.getElementById("lock_screen_image").style.backgroundImage = `url(${e.target.result})`;
                            document.getElementById("lock_screen_image_text").hidden = false;
                        }
                        reader.readAsDataURL(file);
                    } else {
                        alert(Strings.get("too_big_file_size_message"));
                        // clear input
                        event.target.value = "";
                    }
                } else {
                    alert(Strings.get("unsupported_file_type_message"));
                    // clear input
                    event.target.value = "";
                }
            }
        },

        onClearButtonClick() {
            D.func();
            // clear image
            document.getElementById("lock_screen_image").style.backgroundImage = "";
            Settings.setLockScreenImage("");
            // clear input
            document.getElementById("lock_screen_image_input").value = "";
            // hide text
            document.getElementById("lock_screen_image_text").hidden = true;
        },

        onLockScreenImageTextInput(event) {
            D.func();
            const text = document.getElementById("lock_screen_image_text");
            const color = event.target.value;
            Settings.setLockScreenImageText(color);
            text.style.color = color;
        }
    }

    // -- GENERATOR TAB ---------------------------------------------------------

    const GeneratorTab = {
        __proto__: Tab,
        tabId: TABS_IDS.GENERATOR_TAB,
        lengthSliderTimerId: null,

        init() {
            // set listeners
            document.getElementById("password_length_slider").addEventListener("input", event => this.onPasswordLengthSliderInput(event));
            document.getElementById("generated_password").addEventListener("input", event => this.onGeneratedPasswordInput(event));
            document.getElementById("refresh_button").addEventListener("click", () => this.onRefreshButtonClick());
            document.querySelectorAll(`#${this.tabId} input[name=password_type]`).forEach(radio => radio.addEventListener("change", () => this.onPasswordTypeRadioChange()));
            document.getElementById("copy_button").addEventListener("click", () => this.onCopyButtonClick());
            document.getElementById("password_options_button").addEventListener("click", () => this.onOptionsButtonClick());
        },

        show() {
            D.func();
            // initialize
            this.initTab();
            // set first password by default
            this.generateNewPassword();
            // display
            this.showTab();
            // focus & check radio
            const type = Settings.getPasswordType();
            const radio = document.querySelectorAll(`#${this.tabId} input[name=password_type]`)[type];
            this.focusInput(radio);
            radio.checked = true;
        },

        onPasswordLengthSliderInput(event) {
            D.func();
            // set length counter
            document.getElementById("password_length_value").textContent = event.target.value;
            if (this.lengthSliderTimerId) {
                clearTimeout(this.lengthSliderTimerId);
            }
            this.startLengthSliderTimeout(event);
        },

        startLengthSliderTimeout(event) {
            D.func();
            this.lengthSliderTimerId = setTimeout(() => {
                Settings.setPasswordLength(event.target.value);
                this.generateNewPassword();
                this.lengthSliderTimerId = null;
            }, 100);
        },

        generateNewPassword() {
            D.func();
            const length = Settings.getPasswordLength();
            const type = Settings.getPasswordType();
            const password = Generator.generatePassword(length, type);
            // set password
            document.getElementById("generated_password").value = password;
            // set slider
            document.getElementById("password_length_slider").value = length;
            // set length counter
            document.getElementById("password_length_value").textContent = length;
            // update password strength
            this.updatePasswordStrength(password);
        },

        updatePasswordStrength(password) {
            D.func();
            if (password) {
                const zxcvbnResult = zxcvbn(password);
                // set crack time counter
                this.setCrackTime(zxcvbnResult);
                // set crack time indicator
                this.setStrengthIndicator(zxcvbnResult);
            } else {
                this.resetStrengthIndicator();
                document.getElementById("crack_time_label").hidden = true;
            }
        },

        setCrackTime(zxcvbnResult) {
            D.func();
            const crackTime = ZxcvbnHelper.getCrackTime(zxcvbnResult);
            document.getElementById("crack_time_value").textContent = crackTime;
            // show
            document.getElementById("crack_time_label").hidden = false;
        },

        setStrengthIndicator(zxcvbnResult) {
            D.func();
            const indicatorCells = document.querySelectorAll(`#${this.tabId} .empty_password_cell`);
            // clear classes
            this.resetStrengthIndicator();
            const passwordScore = ZxcvbnHelper.getStrengthScore(zxcvbnResult);
            switch (passwordScore) {
                case 0:
                case 1:
                    // set first box red
                    indicatorCells[0].classList.add("weak_password_cell");
                    break;
                case 2:
                    // set two boxes orange
                    for (let i = 0; i < 2; i++) {
                        indicatorCells[i].classList.add("average_password_cell");
                    }
                    break;
                case 3:
                    // set three boxes green
                    for (let i = 0; i < 3; i++) {
                        indicatorCells[i].classList.add("strong_password_cell");
                    }
                    break;
                case 4:
                    // set four boxes green
                    for (let i = 0; i < 4; i++) {
                        indicatorCells[i].classList.add("strong_password_cell");
                    }
                    break;
            }
        },

        resetStrengthIndicator() {
            D.func();
            const indicatorCells = document.querySelectorAll(`#${this.tabId} .empty_password_cell`);
            indicatorCells.forEach(box => {
                // get all classes of current box
                let classes = box.classList;
                classes.forEach(currentClass => {
                    // not base indicator class ?
                    if (currentClass != "empty_password_cell") {
                        // remove class
                        classes.remove(currentClass);
                    }
                })
            });
        },

        onGeneratedPasswordInput(event) {
            D.func();
            // update password strength
            this.updatePasswordStrength(event.target.value);
        },

        onRefreshButtonClick() {
            D.func();
            this.generateNewPassword();
        },

        onPasswordTypeRadioChange() {
            D.func();
            const types = document.getElementsByName("password_type");
            for (let i = 0; i < types.length; i++) {
                if (types[i].checked) {
                    if (Settings.getPasswordType() != i) {
                        // save type
                        Settings.setPasswordType(i);
                        this.generateNewPassword();
                    }
                }
            }
        },

        onCopyButtonClick() {
            D.func();
            const password = document.getElementById("generated_password").value;
            this.copyToClipboard(password);
        },

        onOptionsButtonClick() {
            D.func();
            PasswordOptionsTab.show();
        }
    }

    // -- PASSWORD OPTIONS TAB ---------------------------------------------------------

    const PasswordOptionsTab = {
        __proto__: Tab,
        tabId: TABS_IDS.PASSWORD_OPTIONS_TAB,

        init() {
            // set listeners
            document.getElementById("ok_button").addEventListener("click", () => this.onOkButtonClick());
            document.getElementById("restore_button").addEventListener("click", () => this.onRestoreButtonClick());
        },

        show() {
            D.func();
            // initialize
            this.initTab();
            // setup
            document.getElementById("separator_input").value = Settings.getAlphabet("separator_alphabet");
            document.getElementById("symbols_input").value = Settings.getAlphabet("symbols_alphabet");
            document.getElementById("exclude_similar_characters_checkbox").checked = Settings.isExcludeSimilarCharacters();
            // display
            this.showTab();
        },

        onOkButtonClick() {
            D.func();
            const symbolsAlphabet = document.getElementById("symbols_input").value;
            const separatorAlphabet = document.getElementById("separator_input").value;
            const isExcludeSimilarCharaters = document.getElementById("exclude_similar_characters_checkbox").checked;
            // save options
            Settings.setAlphabet("separator_alphabet", separatorAlphabet)
            Settings.setAlphabet("symbols_alphabet", symbolsAlphabet)
            Settings.setExcludeSimilarCharacters(isExcludeSimilarCharaters);
            // show generator tab
            GeneratorTab.show();
        },

        onRestoreButtonClick() {
            D.func();
            // reset separator
            document.getElementById("separator_input").value = Settings.getDefaultAlphabet("separator_alphabet");
            // reset symbols
            document.getElementById("symbols_input").value = Settings.getDefaultAlphabet("symbols_alphabet");;
            // reset excude characters
            document.getElementById("exclude_similar_characters_checkbox").checked = false;
        }
    }

})();