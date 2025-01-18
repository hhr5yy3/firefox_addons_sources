var Popup = (function createPopup() {
    D.func();

    const LAYOUTS_IDS = {
        IDLE_LAYOUT: "idle_layout",
        SELECT_CARD_LAYOUT: "select_card_layout",
        SHOW_CARD_LAYOUT: "show_card_layout",
        SELECT_ACCOUNT_LAYOUT: "select_account_layout",
        SHOW_ACCOUNT_LAYOUT: "show_account_layout",
        ADD_ACCOUNT_LAYOUT: "add_account_layout",
        ERROR_LAYOUT: "error_layout",
        PASSWORD_LAYOUT: "password_layout",
        FAST_UNLOCK_LAYOUT: "fast_unlock_layout",
        AUTHORIZATION_LAYOUT: "authorization_layout",
        SELECT_ACTION_LAYOUT: "select_action_layout",
        SELECT_FORM_LAYOUT: "select_form_layout",
        NOT_FOUND_LAYOUT: "not_found_layout",
        SEARCH_ACCOUNT_LAYOUT: "search_account_layout",
        QUERY_LAYOUT: "query_layout",
        CHANGE_PASSWORD_LAYOUT: "change_password_layout",
        GENERATE_PASSWORD_LAYOUT: "generate_password_layout",
        UPDATE_APP_LAYOUT: "update_app_layout",
        PASSWORD_OPTIONS_LAYOUT: "password_options_layout",
        START_APP_LAYOUT: "start_app_layout"
    };

    const LOCALIZED_IDS = [
        "enter_password_prompt",
        "show_password_prompt",
        "select_card_title",
        "select_account_title",
        "add_account_title",
        "add_button",
        "authorize_in_app_prompt",
        "not_found_error",
        "not_found_text",
        "change_password_title",
        "change_button",
        "current_password_prompt",
        "new_password_prompt",
        "password_length_prompt",
        "letters_and_numbers_label",
        "numbers_only_label",
        "wrong_password_error",
        "update_app_error",
        "update_button",
        "password_options_button",
        "password_options_title",
        "restore_button",
        "separators_prompt",
        "symbols_prompt",
        "exclude_similar_characters_prompt",
        "start_app_button",
        "generate_password_title",
        "warning_title",
        "websites_prompt",
        "website_prompt",
        "title_prompt",
        "app_not_running_error",
        "card_number_prompt",
        "name_on_card_prompt",
        "expires_prompt"
    ];

    const LOCALIZED_SELECTORS = [
        "ok_button",
        "select_button",
        "login_prompt",
        "password_prompt",
        "one_time_password_prompt",
        "report_problem_link",
        "yes_button",
        "no_button",
        "crack_time_prompt",
        "memorable_label",
        "random_label",
        "error_title",
        "show_text",
        "autofill_account_button",
        "autofill_card_button",
        "search_account_button",
        "add_account_button",
        "select_action_title",
        "autofill_login_button",
        "autofill_registration_button"
    ];

    // key codes
    const ENTER_KEY = 13;
    const ESC_KEY = 27;

    let _currentLayout = null;

    document.addEventListener("DOMContentLoaded", function onDOMContentLoaded() {
        D.func();
        localizePage();
        setLockScreens();
        setTheme();
        PopupModel.start();
    });

    document.addEventListener("keypress", function onLayoutKeyPress(event) {
        if (_currentLayout) {
            _currentLayout.onKeyPress(event);
        }
    });

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

    function setLockScreens() {
        D.func();
        let image, text;
        if (Settings.getLockScreenBackground() === "image") {
            image = Settings.getLockScreenImage();
            text = Settings.getLockScreenImageText();
            setLockScreenImageText(text);
            setLockScreenBackground(image);
            if (isLightColor(text)) {
                setLockScreenImageButtons("invert_image");
            }
        } else if (Settings.getLockScreenBackground() === "texture") {
            image = Settings.getLockScreenTexture();
            text = Settings.getLockScreenTextureText();
            setLockScreenTextureText(text);
            setLockScreenBackground(image);
            if (text === "light") {
                setLockScreenImageButtons("invert_image");
            }
        } else if (Settings.getTheme() === "dark") {
            setLockScreenImageButtons("invert_image");
        }
    }

    function isLightColor(color) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        if (result) {
            let r = parseInt(result[1], 16);
            let g = parseInt(result[2], 16);
            let b = parseInt(result[3], 16);
            let hsp = Math.sqrt(
                0.299 * (r * r) +
                0.587 * (g * g) +
                0.114 * (b * b)
              );
            return hsp > 127.5;
        }
        return false;
    }

    function setLockScreenBackground(image) {
        D.func();
        const lockScreenLayouts = document.querySelectorAll(".lock_screen_layout");
        if (image !== "default") {
            lockScreenLayouts.forEach(layout => {
                layout.style.backgroundImage = `url("${image}")`;
            });
        }
    }

    function setLockScreenImageText(text) {
        D.func();
        const lockScreenLayouts = document.querySelectorAll(".lock_screen_layout");
        if (text !== "default") {
            lockScreenLayouts.forEach(layout => {
                layout.style.color = text;
            });
        }
    }

    function setLockScreenTextureText(text) {
        D.func();
        const lockScreenLayouts = document.querySelectorAll(".lock_screen_layout");
        if (text !== "default") {
            lockScreenLayouts.forEach(layout => {
                layout.style.color = (text === "dark") ? "#000" : "#e8eaed";
            });
        }
    }

    function setLockScreenImageButtons(style) {
        D.func();
        const imageButtons = document.querySelectorAll(".lock_screen_layout .image_button");
        if (style) {
            imageButtons.forEach(button => {
                button.classList.add(style);
            });
        }
    }

    function setTheme() {
        D.func();
        if (Settings.getTheme() === "dark") {
            const link = document.createElement("link");
            link.href = "css/popup_dark.css";
            link.rel = "stylesheet";
            link.type = "text/css";
            document.head.appendChild(link);
        }
    }

    // -- LAYOUT STACK -------------------------------------------------------------

    let layoutStack = [];

    function popLayout(params = {}) {
        D.func();
        // remove layout on the top
        const layoutName = layoutStack.pop();
        if (layoutName) {
            const layout = window[layoutName];
            layout.onPopLayout();
        }
        // has layout to show ?
        if (layoutStack.length >= 1) {
            // show previous layout
            const layout = window[peekLayout()];
            layout.onTopLayout(layoutName, params);
        } else {
            throw "Stack is already empty.";
        }
    }

    // returns layout on the top
    function peekLayout() {
        D.func();
        return layoutStack[layoutStack.length - 1];
    }

    function pushLayout(layoutName, params = {}) {
        D.func(layoutName);
        const layout = window[layoutName];
        if (layout) {
            // show layout
            layoutStack.push(layoutName);
            layout.onPushLayout(params);
        } else {
            throw "Invalid layout id.";
        }
    }

    function canGoBack() {
        D.func();
        return layoutStack.length > 1;
    }

    function popAuthorizationLayout() {
        D.func();
        while (isAuthorizationLayout()) {
            layoutStack.pop();
        }
    }

    function isAuthorizationLayout() {
        const authorizationLayouts = ["AuthorizationLayout", "PasswordLayout", "FastUnlockLayout", "IdleLayout"];
        return authorizationLayouts.includes(peekLayout());
    }

    // -- PROTOTYPES ---------------------------------------------------------

    const Layout = {
        isInitialized: false,
        isShowPassword: null,

        initLayout() {
            if (!this.isInitialized) {
                this.init();
                this.isInitialized = true;
            }
        },

        showLayout() {
            D.func(this.layoutId);
            _currentLayout = this;
            for (let layoutId in LAYOUTS_IDS) {
                if (layoutId != this.layoutId) {
                    document.getElementById(LAYOUTS_IDS[layoutId]).style.display = "none";
                }
            }
            document.getElementById(this.layoutId).style.display = "block";
        },

        isLayoutVisible() {
            if (document.getElementById(this.layoutId).style.display === "none") {
                return false;
            }
            return true;
        },

        onTopLayout() {
            D.func();
            // display
            this.showLayout();
        },

        onPushLayout() {
            D.func();
            // initialize
            this.initLayout();
            // display
            this.showLayout();
        },

        onPopLayout() {
            D.func();
            this.clearTotpElements();
        },

        setUpdateAppButton() {
            // should update app ?
            if (PopupModel.shouldUpdateApp()) {
                // display warning
                document.querySelector(`#${this.layoutId} .update_app_button`).hidden = false;
            } else {
                document.querySelector(`#${this.layoutId} .update_app_button`).hidden = true;
            }
        },

        onKeyPress(event) {
            D.func(event);
        },

        onCloseButtonClick() {
            D.func();
            close();
        },

        onBackButtonClick() {
            D.func();
            popLayout();
        },

        onHelpButtonClick() {
            D.func();
            // FIXME: use help.json
            window.open("https://safeincloud.ladesk.com/667129-Browsers");
        },

        setNavigationButton() {
            // has place to return ?
            if (canGoBack()) {
                // set back button
                this.setBackNavigationButton();
            } else {
                // set close button
                this.setCloseNavigationButton();
            }
        },

        setCloseNavigationButton() {
            const navigationButton = document.querySelector(`#${this.layoutId} .navigation_button`);
            navigationButton.src = "./images/close_button.png";
            navigationButton.alt = "Close";
            navigationButton.removeEventListener("click", this);
            navigationButton.addEventListener("click", this);
        },

        setBackNavigationButton() {
            const navigationButton = document.querySelector(`#${this.layoutId} .navigation_button`);
            navigationButton.src = "./images/back_button.png";
            navigationButton.alt = "Back";
            navigationButton.removeEventListener("click", this);
            navigationButton.addEventListener("click", this);
        },

        handleEvent(event) {
            if (event.type == "click" && event.target.src) {
                if (event.target.src.includes("close_button")) {
                    this.onCloseButtonClick();
                }
                if (event.target.src.includes("back_button")) {
                    this.onBackButtonClick();
                }
            }
        },

        onUpdateAppButtonClick() {
            D.func();
            // show update app layout
            pushLayout("UpdateAppLayout");
        },

        onOptionsButtonClick() {
            D.func();
            chrome.runtime.openOptionsPage();
        },

        onSearchButtonClick() {
            D.func();
            PopupModel.searchAccount();
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

        showReportProblemLink() {
            const selector = `#${this.layoutId} .report_problem_link`;
            // get report problem link of current layout
            const reportProblemLink = document.querySelector(selector);
            // show
            reportProblemLink.hidden = false;
            // set listener
            reportProblemLink.addEventListener("click", () => this.onReportLinkClick());
        },

        onReportLinkClick() {
            D.func();
            // get URL
            let address = PopupModel.getHref();
            // get version
            const version = chrome.runtime.getManifest().version;
            // get browser
            const browser = Browser.getBrowser();
            if (address && version && browser) {
                // encode URL
                address = encodeURIComponent(address);
                const url = new URL(`https://docs.google.com/forms/d/e/1FAIpQLScH5C6q8TNP5sT9UImn2rAGkyDUstp626eBooGKLW8sl6saHw/viewform?entry.957028758=${address}&entry.77999744=${version}&entry.992574564=${browser}`);
                // open Google Forms
                window.open(url);
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
                // set snackbar
                setTimeout(() => {
                    this.setSnackbar(Strings.get("text_copied_message"), 2000);
                }, 100);
            }
        },

        setCrackTime(zxcvbnResult) {
            D.func();
            const crackTime = ZxcvbnHelper.getCrackTime(zxcvbnResult);
            document.querySelector(`#${this.layoutId} .crack_time_value`).textContent = crackTime;
            // show
            document.querySelector(`#${this.layoutId} .crack_time_label`).hidden = false;
        },

        setStrengthIndicator(zxcvbnResult) {
            D.func();
            const indicatorCells = document.querySelectorAll(`#${this.layoutId} .empty_password_cell`);
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
            const indicatorCells = document.querySelectorAll(`#${this.layoutId} .empty_password_cell`);
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
                document.querySelector(`#${this.layoutId} .crack_time_label`).hidden = true;
            }
        },

        setSnackbar(text, duration, isErrorSnackbar = false) {
            D.func();
            const snackbar = document.querySelector(`#${this.layoutId} .snackbar`);
            // reset snackbar
            this.resetSnackbar();
            // set snackbar style
            if (isErrorSnackbar) {
                snackbar.classList.add("error_snackbar");
            } else {
                snackbar.classList.add("info_snackbar");
            }
            // set snackbar text
            const textNode = document.createElement("div");
            textNode.textContent = text;
            textNode.classList.add("snackbar_text");
            snackbar.appendChild(textNode);
            // show snackbar
            snackbar.style.top = "0";
            setTimeout(() => {
                snackbar.style.top = "-35pt";
            }, duration);
        },

        resetSnackbar() {
            const snackbar = document.querySelector(`#${this.layoutId} .snackbar`);
            // reset style
            let classes = snackbar.classList;
            classes.forEach(currentClass => {
                // not base snackbar class ?
                if (currentClass != "snackbar") {
                    // remove class
                    classes.remove(currentClass);
                }
            });
            // reset content
            while (snackbar.firstChild) {
                snackbar.firstChild.remove();
            }
        },

        setStarIcon(hasStar) {
            D.func();
            const star = document.querySelector(`#${this.layoutId} .star_icon`)
            if (hasStar) {
                star.src = "./images/star_on_icon.png";
            } else {
                star.src = "./images/star_off_icon.png";
            }
        },

        isCustomTitleSupported() {
            return Settings.getVersion() >= 11;
        },

        // TOTO updates
        totpTextElements: [],
        totpIconElements: [],
        totpTimerId: null,

        clearTotpElements() {
            this.totpTextElements = [];
            this.totpIconElements = [];
            // stop
            if (this.totpTimerId) {
                clearTimeout(this.totpTimerId);
                this.totpTimerId = null;
            }
        },

        startTotpTimer() {
            if (!this.totpTimerId) {
                // const millis = new Date().getTime();
                // const left = 30 * 1000 - Math.floor(millis % (30 * 1000));
                // this.totpTimerId = setTimeout(() => this.onTotpTimer(), left);
                this.totpTimerId = setTimeout(() => this.onTotpTimer(), 500);
            }
        },

        onTotpTimer() {
            // restart
            this.totpTimerId = null;
            this.startTotpTimer();
            // update
            this.totpTextElements.forEach(textElement => {
                this.updateTotpTextElement(textElement);
            });
            this.totpIconElements.forEach(iconElement => {
                this.updateTotpIconElement(iconElement);
            });
        },

        updateTotpTextElement(textElement) {
            const passcode = this.getPasscode(textElement.oneTimePassword);
            textElement.element.textContent = this.getDisplayPasscode(passcode) +
                (textElement.suffix ? textElement.suffix : "");
        },

        updateTotpIconElement(iconElement) {
            const radians = this.getRadians();
            const context = iconElement.element.getContext("2d");
            context.clearRect(0, 0, 20, 20);
            context.beginPath();
            context.moveTo(10, 10);
            context.arc(10, 10, 9, 0, radians, false);
            context.fillStyle = "#fff";
            context.fill();
            context.closePath();
        },

        addTotpTextElement(element, oneTimePassword, suffix) {
            let textElement = {
                element: element,
                oneTimePassword: oneTimePassword,
                suffix: suffix
            };
            this.totpTextElements.push(textElement);
            this.updateTotpTextElement(textElement);
            // start if needed
            this.startTotpTimer();
        },

        addTotpIconElement(element) {
            let iconElement = {
                element: element
            };
            this.totpIconElements.push(iconElement);
            this.updateTotpIconElement(iconElement);
            // start if needed
            this.startTotpTimer();
        },

        getDisplayPasscode(passcode) {
            return passcode ?
                passcode.slice(0, passcode.length / 2) + " " + passcode.slice(passcode.length / 2) : "";
        },

        getPasscode(oneTimePassword) {
            if (oneTimePassword) {
                // generate passcode
                const secretKey = TOTP.getSecretKey(oneTimePassword);
                if (secretKey) {
                    return TOTP.getPasscode(secretKey);
                }
            }
            return null;
        },

        getRadians() {
            const date = new Date();
            const millis = date.getMilliseconds();
            const seconds = date.getSeconds() % 30 + (millis / 1000);
            const degree = 360 / 30 * seconds;
            const radian = degree * Math.PI / 180;
            return radian;
        },

    }

    const AccountListLayout = {
        __proto__: Layout,

        selectAccount(shouldFocus, index = 0) {
            D.func();
            // get populated accounts
            const radios = document.querySelectorAll(`.${this.accontRowClass} input`);
            for (let i = 0; i < radios.length; i++) {
                if (index === i) {
                    // check necessary account
                    radios[i].checked = true;
                    // should focus account ?
                    if (shouldFocus) {
                        radios[i].focus();
                    }
                } else {
                    radios[i].checked = false;
                }
            }
        },

        populateAccounts(accounts, query = "") {
            D.func();
            let prevRow = null;
            let row = null;
            // reset
            this.clearTotpElements();
            const rows = document.getElementsByClassName(this.accontRowClass);
            for (let k = rows.length - 1; k >= 0; k--) {
                row = rows[k];
                if (row.id != this.lastRowId) {
                    row.parentElement.removeChild(row);
                }
            }
            // populate
            row = document.getElementById(this.lastRowId);
            let showButton = row.querySelector(".show_account_button");
            row.removeEventListener("dblclick", this);
            showButton.removeEventListener("click", this);
            for (let i = 0; i < accounts.length; i++) {
                // set listeners
                row.addEventListener("dblclick", this);
                // set radio
                let radio = row.getElementsByTagName("input")[0];
                radio.id = this.accontRowClass + "_radio_" + i;
                radio.value = String(i);
                radio.tabIndex = i;
                // set label
                let label = row.getElementsByTagName("label")[0];
                label.htmlFor = radio.id;
                // set title
                let titleSpan = label.querySelector(".account_title");
                let title = accounts[i].title2 || "";
                SearchHelper.setHighlightedText(titleSpan, title, query);
                // set totp & login
                let loginSpan = label.querySelector(".account_login");
                if (accounts[i].login) {
                    SearchHelper.setHighlightedText(loginSpan, accounts[i].login, query);
                } else {
                    loginSpan.textContent = accounts[i].oneTimePassword ? "" : "-";
                }
                let totpSpan = label.querySelector(".account_totp");
                if (accounts[i].oneTimePassword) {
                    totpSpan.hidden = false;
                    this.addTotpTextElement(totpSpan, accounts[i].oneTimePassword, 
                        accounts[i].login ? " | " : null);
                } else {
                    totpSpan.hidden = true;
                }
                // set label max width
                label.style.maxWidth = this.getLabelMaxWidth(accounts[i]);
                // set star icon
                let starIcon = row.querySelector(".star_icon");
                if (accounts[i].hasStar) {
                    starIcon.hidden = false;
                } else {
                    starIcon.hidden = true;
                }
                // set otp icon
                let otpIcon = row.querySelector(".otp_icon");
                if (accounts[i].oneTimePassword) {
                    otpIcon.hidden = false;
                    this.addTotpIconElement(otpIcon);
                } else {
                    otpIcon.hidden = true;
                }
                // set show button
                showButton.id = "show_account_button_" + i;
                showButton.addEventListener("click", this);
                // set horizontal line
                let hr = row.querySelector("hr");
                if (i < accounts.length - 1) {
                    hr.hidden = false;
                } else {
                    hr.hidden = true;
                }
                // insert row
                if (prevRow) {
                    prevRow.parentNode.append(row);
                }
                prevRow = row;
                row = row.cloneNode(true);
                showButton = row.querySelector(".show_account_button");
                row.id = "";
            }
        },

        getCheckedRadioIndex() {
            D.func();
            const inputs = document.querySelectorAll(`#${this.layoutId} input`)
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].type === "radio" && inputs[i].checked) {
                    return parseInt(inputs[i].value);
                }
            }
            return null;
        },

        handleEvent(event) {
            super.handleEvent(event);
            if (event.type == "dblclick") {
                this.onAccountDoubleClick();
            }
            if (event.type == "click") {
                if (event.target.id.includes("show_account_button")) {
                    this.onShowAccountButtonClick(event);
                }
            }
        },

        getLabelMaxWidth(account) {
            let maxWidth = 280;
            if (account.hasStar) {
                maxWidth -= 10;
            }
            if (account.oneTimePassword) {
                maxWidth -= 10;
            }
            return `${maxWidth}px`;
        },

        onShowAccountButtonClick(event) {
            D.func();
            const index = /\d+/.exec(event.target.id)[0];
            const accounts = this.getAccounts();
            pushLayout("ShowAccountLayout", { account: accounts[index], hasSelectButton: true });
        },

        refreshStars(accounts) {
            D.func();
            const rows = document.querySelectorAll(`#${this.layoutId} .${this.accontRowClass}`);
            for (let i = 0; i < rows.length; i++) {
                // set label max width
                let label = rows[i].getElementsByTagName("label")[0];
                label.style.maxWidth = this.getLabelMaxWidth(accounts[i]);
                // set star icon
                let starIcon = rows[i].querySelector(".star_icon");
                if (accounts[i].hasStar) {
                    starIcon.hidden = false;
                } else {
                    starIcon.hidden = true;
                }
            }
        }
    }

    // -- IDLE LAYOUT ---------------------------------------------------------

    window["IdleLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.IDLE_LAYOUT,

        onPushLayout() {
            D.func();
            // display
            this.showLayout();
        }
    }

    // -- AUTHORIZATION LAYOUT -----------------------------------------------------

    window["AuthorizationLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.AUTHORIZATION_LAYOUT,

        init() {
            // set listeners
            document.querySelector(`#${this.layoutId} .options_button`).addEventListener("click", () => this.onOptionsButtonClick());
            document.querySelector(`#${this.layoutId} .update_app_button`).addEventListener("click", () => this.onUpdateAppButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onPushLayout() {
            D.func();
            // initialize
            this.initLayout();
            // set update warning
            this.setUpdateAppButton();
            // display
            this.showLayout();
        }
    }

    // -- PASSWORD LAYOUT -----------------------------------------------------

    window["PasswordLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.PASSWORD_LAYOUT,

        init() {
            // set listeners
            document.querySelector(`#${this.layoutId} .ok_button`).addEventListener("click", () => this.onOkButtonClick());
            document.getElementById("show_password_checkbox").addEventListener("change", () => this.onShowPasswordChange());
            document.querySelector(`#${this.layoutId} .options_button`).addEventListener("click", () => this.onOptionsButtonClick());
            document.querySelector(`#${this.layoutId} .update_app_button`).addEventListener("click", () => this.onUpdateAppButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onPushLayout() {
            D.func();
            // initialize
            this.initLayout();
            // set update warning
            this.setUpdateAppButton();
            // reset password
            this.resetPassword();
            // display
            this.showLayout();
            // focus on password input
            this.focusInput(document.getElementById("password_input"));
        },

        resetPassword() {
            document.getElementById("password_input").value = "";
            document.getElementById("text_input").value = "";
            this.disableLayout(false);
            document.getElementById("show_password_checkbox").checked = false;
            this.onShowPasswordChange();
        },

        disableLayout(disable) {
            D.func(disable);
            document.querySelector(`#${this.layoutId} .ok_button`).disabled = disable;
            document.getElementById("password_input").disabled = disable;
            document.getElementById("text_input").disabled = disable;
        },

        onWrongPassword() {
            D.func();
            this.disableLayout(false);
            document.getElementById("wrong_password_error").style.display = "inline";
            this.getPasswordInput().value = "";
            this.focusInput(this.getPasswordInput());
            setTimeout(function onWrongPasswordTimeout() {
                D.func();
                document.getElementById("wrong_password_error").style.display = "none";
            }, 1500);
        },

        getPasswordInput() {
            // show password
            if (document.getElementById("show_password_checkbox").checked) {
                return document.getElementById("text_input");
            } else {
                return document.getElementById("password_input");
            }
        },

        onKeyPress(event) {
            if (event.keyCode == ENTER_KEY) {
                this.onOkButtonClick();
            }
        },

        onOkButtonClick() {
            D.func();
            const password = this.getPasswordInput().value;
            if (password) {
                this.disableLayout(true);
                PopupModel.authenticate(password);
            } else {
                this.focusInput(this.getPasswordInput());
            }
        },

        onShowPasswordChange() {
            D.func();
            if (document.getElementById("show_password_checkbox").checked) {
                document.getElementById("text_input").value = document.getElementById("password_input").value;
                document.getElementById("password_input").style.display = "none";
            } else {
                document.getElementById("password_input").value = document.getElementById("text_input").value;
                document.getElementById("text_input").style.display = "none";
            }
            this.getPasswordInput().style.display = "inline-block";
            this.focusInput(this.getPasswordInput());
        }
    }

    // -- FAST UNLOCK LAYOUT --------------------------------------------------

    window["FastUnlockLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.FAST_UNLOCK_LAYOUT,
        FIRST_4_SYMBOLS_FAST_UNLOCK: 1,

        init() {
            // set listeners
            document.getElementById("fast_unlock_input").addEventListener("keyup", () => this.onKeyUp());
            document.querySelector(`#${this.layoutId} .options_button`).addEventListener("click", () => this.onOptionsButtonClick());
            document.querySelector(`#${this.layoutId} .update_app_button`).addEventListener("click", () => this.onUpdateAppButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onPushLayout(params) {
            D.func();
            // initialize
            this.initLayout();
            // reset symbols
            this.resetSymbols();
            // set update warning
            this.setUpdateAppButton();
            // set prompt
            document.getElementById("fast_unlock_prompt").textContent =
                Strings.get(
                    params.mode === this.FIRST_4_SYMBOLS_FAST_UNLOCK ?
                    "first_4_symbols_prompt" : "last_4_symbols_prompt");
            // display
            this.showLayout();
            this.focusInput(document.getElementById("fast_unlock_input"));
        },

        resetSymbols() {
            document.getElementById("fast_unlock_input").value = "";
            this.disableLayout(false);
        },

        disableLayout(disable) {
            D.func(disable);
            document.getElementById("fast_unlock_input").disabled = disable;
        },

        onKeyUp(e) {
            D.func(e);
            const symbols = document.getElementById("fast_unlock_input").value;
            if (symbols.length == 4) {
                this.disableLayout(true);
                PopupModel.fastUnlock(symbols);
            }
        }
    }

    // -- SELECT CARD LAYOUT --------------------------------------------

    window["SelectCardLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.SELECT_CARD_LAYOUT,
        cards: null,

        init() {
            // set listeners
            document.querySelector(`#${this.layoutId} .select_button`).addEventListener("click", () => this.onSelectButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
            // set navigation button
            this.setNavigationButton();
        },

        onPushLayout(params) {
            D.func();
            this.cards = params.cards;
            // initialize
            this.initLayout();
            // populate cards
            const checkedRadio = this.populateCards();
            // show report problem link
            this.showReportProblemLink();
            // display
            this.showLayout();
            checkedRadio.focus();
        },

        onTopLayout(layoutName, params) {
            D.func();
            if (layoutName == "ShowCardLayout" && params.selectedCard) {
                // autofill
                PopupModel.autofillCard(params.selectedCard);
            } else {
                // refresh stars
                this.refreshStars(this.cards);
                // display
                this.showLayout();
            }
        },

        populateCards() {
            D.func();
            let prevRow = null;
            let row = null;
            let checked = 0;
            let checkedRadio = null;
            // reset
            const rows = document.getElementsByClassName("card_row");
            for (let k = rows.length - 1; k >= 0; k--) {
                row = rows[k];
                if (row.id != "last_card_row") {
                    row.parentElement.removeChild(row);
                }
            }
            // populate
            row = document.getElementById("last_card_row");
            let showButton = row.querySelector(".show_card_button");
            row.removeEventListener("dblclick", this);
            showButton.removeEventListener("click", this);
            for (let i = 0; i < this.cards.length; i++) {
                row.addEventListener("dblclick", this);
                // set radio
                let radio = row.getElementsByTagName("input")[0];
                radio.id = "card_row_radio_" + i;
                radio.value = String(i);
                radio.tabIndex = i;
                if (i == checked) {
                    radio.checked = true;
                    checkedRadio = radio;
                } else {
                    radio.checked = false;
                }
                // set label
                let label = row.getElementsByTagName("label")[0];
                label.htmlFor = radio.id;
                let spans = label.getElementsByTagName("span");
                let title = this.cards[i].title2 || "";
                spans[0].textContent = title ? title : "-";
                let number = "***" + this.cards[i].number.slice(-4);
                spans[1].textContent = number;
                // set image
                let image = row.getElementsByTagName("img")[0];
                image.src = "images/" + this.getCardLogo(this.cards[i].number);
                // set star icon
                let starIcon = row.querySelector(".star_icon");
                if (this.cards[i].hasStar) {
                    starIcon.hidden = false;
                } else {
                    starIcon.hidden = true;
                }
                // set show button
                showButton.id = "show_card_button_" + i;
                showButton.addEventListener("click", this);
                // set horizontal line
                let hr = row.querySelector("hr");
                if (i < this.cards.length - 1) {
                    hr.hidden = false;
                } else {
                    hr.hidden = true;
                }
                // insert row
                if (prevRow) {
                    prevRow.parentNode.append(row);
                }
                prevRow = row;
                row = row.cloneNode(true);
                showButton = row.querySelector(".show_card_button");
                row.id = "";
            }
            return checkedRadio;
        },

        refreshStars(cards) {
            D.func();
            const rows = document.getElementsByClassName("card_row");
            for (let i = 0; i < rows.length; i++) {
                // set star icon
                let starIcon = rows[i].querySelector(".star_icon");
                if (cards[i].hasStar) {
                    starIcon.hidden = false;
                } else {
                    starIcon.hidden = true;
                }
            }
        },

        getCardLogo(number) {
            let regExp;
            // https://en.wikipedia.org/wiki/Payment_card_number
            // Visa: 4
            regExp = new RegExp("^4");
            if (regExp.test(number))
                return "visa_logo.png";
            // Mastercard: 51–55, 2221-2720
            regExp = new RegExp("^(5[1-5]|2(22[1-9]|2[3-9]|[3-6]|7[0-1]|720))");
            if (regExp.test(number))
                return "mastercard_logo.png";
            // MIR: 2200–2204
            regExp = new RegExp("^220[0-4]");
            if (regExp.test(number))
                return "mir_logo.png";
            // AMEX: 34, 37
            regExp = new RegExp("^3[47]");
            if (regExp.test(number))
                return "amex_logo.png";
            // Discover: 6011, 622126 - 622925, 624000 - 626999, 628200 - 628899, 64, 65
            regExp = new RegExp("^(6011|622(12[6-9]|1[3-9]|[2-8]|9[0-1][0-9]|92[0-5]|64[4-9])|62[4-6]|628[2-8]|64|65)");
            if (regExp.test(number))
                return "discover_logo.png";
            // Maestro: 50, 56–69
            regExp = new RegExp("^(5[06-9]|6)");
            if (regExp.test(number))
                return "maestro_logo.png";
            // Diners: 36, 300–305, 3095, 38–39
            regExp = new RegExp("^(36|30[0-5]|3095|3[89])");
            if (regExp.test(number))
                return "diners_logo.png";
            // JCB: 3528–3589
            regExp = new RegExp("^35(2[89]|[3-8])");
            if (regExp.test(number))
                return "jcb_logo.png";
            return "empty_logo.png";
        },

        handleEvent(event) {
            super.handleEvent(event);
            if (event.type === "dblclick") {
                this.onCardDoubleClick();
            }
            if (event.type == "click") {
                if (event.target.id.includes("show_card_button")) {
                    this.onShowCardButtonClick(event);
                }
            }
        },

        onShowCardButtonClick(event) {
            D.func();
            const index = /\d+/.exec(event.target.id)[0];
            pushLayout("ShowCardLayout", { card: this.cards[index] });
        },

        onCardDoubleClick() {
            D.func();
            this.onSelectButtonClick();
        },

        onKeyPress(event) {
            if (event.keyCode == ENTER_KEY) {
                this.onSelectButtonClick();
            }
        },

        onSelectButtonClick() {
            D.func();
            const radios = document.querySelectorAll(`#${this.layoutId} input`);
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    let index = parseInt(radios[i].value);
                    if (this.cards && index >= 0 && index < this.cards.length) {
                        // autofill
                        PopupModel.autofillCard(this.cards[index]);
                    }
                    return;
                }
            }
        }
    }

    // -- SHOW CARD LAYOUT ----------------------------------------------------

    window["ShowCardLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.SHOW_CARD_LAYOUT,
        card: null,
        isShowCsc: false,

        init() {
            // set listeners
            document.getElementById("copy_card_number_button").addEventListener("click", () => this.onCopyCardNumberButtonClick());
            document.getElementById("copy_card_name_button").addEventListener("click", () => this.onCopyCardNameButtonClick());
            document.getElementById("copy_exp_date_button").addEventListener("click", () => this.onCopyExpDateButtonClick());
            document.getElementById("copy_csc_button").addEventListener("click", () => this.onCopyCscButtonClick());
            document.getElementById("show_csc_button").addEventListener("click", () => this.onShowCscButtonClick());
            document.querySelector(`#${this.layoutId} .star_icon`).addEventListener("click", () => this.onStarIconClick());
            document.querySelector(`#${this.layoutId} .navigation_button`).addEventListener("click", () => this.onBackButtonClick());
            document.querySelector(`#${this.layoutId} .select_button`).addEventListener("click", () => this.onSelectButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onPushLayout(params) {
            D.func();
            this.card = params.card;
            this.isShowCsc = !Settings.isHidePasswords();
            // initialize
            this.initLayout();
            // setup
            this.setStarIcon(this.card.hasStar);
            this.setExpireDate();
            document.getElementById("card_title_value").textContent = this.card.title2;
            document.getElementById("card_number_value").textContent = this.card.number;
            document.getElementById("card_name_value").textContent = this.card.name;
            this.setCsc();
            // show report problem link
            this.showReportProblemLink();
            // display
            this.showLayout();
        },

        setCsc() {
            this.setShowCscButton();
            if (this.isShowCsc) {
                document.getElementById("csc_value").textContent = this.card.csc;
            } else {
                document.getElementById("csc_value").textContent = "●●●";
            }
        },

        setShowCscButton() {
            const showCscButton = document.getElementById("show_csc_button");
            if (this.isShowCsc) {
                showCscButton.src = "images/hide_password_button.png";
            } else {
                showCscButton.src = "images/show_password_button.png";
            }
        },

        setExpireDate() {
            let expMonth = this.card.expMonth;
            const expYear = this.card.expYear;
            if (expMonth && expYear) {
                expMonth = expMonth.length > 1 ? expMonth : `0${expMonth}`;
                document.getElementById("exp_date_value").textContent = `${expMonth}/${expYear}`;
            } else {
                document.getElementById("exp_date_value").textContent = "";
            }
        },

        onCopyCardNumberButtonClick() {
            D.func();
            this.copyToClipboard(this.card.number);
        },

        onCopyCardNameButtonClick() {
            D.func();
            this.copyToClipboard(this.card.name);
        },

        onCopyExpDateButtonClick() {
            D.func();
            const expDate = document.getElementById("exp_date_value").textContent;
            this.copyToClipboard(expDate);
        },

        onCopyCscButtonClick() {
            D.func();
            this.copyToClipboard(this.card.csc);
        },

        onShowCscButtonClick() {
            D.func();
            this.isShowCsc = !this.isShowCsc;
            this.setCsc();
        },

        onStarIconClick() {
            D.func();
            this.card.hasStar = !this.card.hasStar;
            this.setStarIcon(this.card.hasStar);
            PopupModel.setHasStar(this.card);
        },

        onSelectButtonClick() {
            D.func();
            popLayout({ selectedCard: this.card });
        }
    }

    // -- SELECT ACCOUNT LAYOUT --------------------------------------------

    window["SelectAccountLayout"] = {
        __proto__: AccountListLayout,
        layoutId: LAYOUTS_IDS.SELECT_ACCOUNT_LAYOUT,
        accounts: null,
        isSearchAccountSupported: false,
        lastRowId: "last_account_row",
        accontRowClass: "select_account_row",

        init() {
            // set listeners
            document.querySelector(`#${this.layoutId} .select_button`).addEventListener("click", () => this.onSelectButtonClick());
            document.querySelector(`#${this.layoutId} .search_button`).addEventListener("click", () => this.onSearchButtonClick());
            document.querySelector(`#${this.layoutId} .add_button`).addEventListener("click", () => this.onAddButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
            // set navigation button
            this.setNavigationButton();
        },

        onPushLayout(params) {
            D.func();
            this.accounts = params.accounts;
            this.isSearchAccountSupported = params.isSearchAccountSupported;
            // initialize
            this.initLayout();
            // populate accounts
            this.populateAccounts(this.accounts);
            // get & select current account
            PopupModel.getCurrentAccount(account => this.onGetCurrentAccount(account));
            // show report problem link
            this.showReportProblemLink();
            // display
            this.showSearchButton(this.isSearchAccountSupported);
            this.showLayout();
        },

        onTopLayout(layoutName, params) {
            D.func();
            if (layoutName === "ShowAccountLayout" && params.selectedAccount) {
                // select account
                PopupModel.onSelectAccount(params.selectedAccount);
            } else {
                // refresh stars
                this.refreshStars(this.accounts);
                // display
                this.showLayout();
            }
        },

        onGetCurrentAccount(account) {
            D.func();
            // still the same layout ?
            if (!this.isLayoutVisible()) {
                return;
            }
            let index = -1;
            // find prefilled account index
            const prefilledLogin = PopupModel.getPrefilledLogin();
            if (prefilledLogin) {
                index = this.accounts.findIndex(acc => acc.login === prefilledLogin);
            }
            // find current account index
            if (index === -1 && account) {
                index = this.accounts.findIndex(acc => acc.cardId === account.cardId);
            }
            // nothing ? 
            if (index === -1) {
                index = 0;
            }
            // select account
            this.selectAccount(true, index);
        },

        showSearchButton(show) {
            D.func();
            document.querySelector(`#${this.layoutId} .search_button`).hidden = !show;
        },

        onAccountDoubleClick() {
            D.func();
            this.onSelectButtonClick();
        },

        onKeyPress(event) {
            if (event.keyCode == ENTER_KEY) {
                this.onSelectButtonClick();
            }
        },

        onSelectButtonClick() {
            D.func();
            const index = this.getCheckedRadioIndex();
            if (this.accounts && index >= 0 && index < this.accounts.length) {
                // select account
                PopupModel.onSelectAccount(this.accounts[index]);
            }
            return;
        },

        getAccounts() {
            D.func();
            return this.accounts;
        },

        onAddButtonClick() {
            D.func();
            pushLayout("AddAccountLayout");
        }
    }

    // -- SHOW ACCOUNT LAYOUT ----------------------------------------------------

    window["ShowAccountLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.SHOW_ACCOUNT_LAYOUT,
        account: null,

        init() {
            // set listeners
            document.getElementById("copy_login_button").addEventListener("click", () => this.onCopyLoginButtonClick());
            document.getElementById("copy_password_button").addEventListener("click", () => this.onCopyPasswordButtonClick());
            document.getElementById("show_password_button").addEventListener("click", () => this.onShowPasswordButtonClick());
            document.querySelector(`#${this.layoutId} .star_icon`).addEventListener("click", () => this.onStarIconClick());
            document.querySelector(`#${this.layoutId} .select_button`).addEventListener("click", () => this.onSelectButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onPushLayout(params) {
            D.func();
            this.account = params.account;
            // initialize
            this.initLayout();
            // set navigation button
            if (params.closeButton) {
                this.setCloseNavigationButton();
            } else {
                this.setNavigationButton();
            }
            // show report problem link
            this.showReportProblemLink();
            // setup
            document.getElementById("account_title_value").textContent = this.account.title2;
            this.setSelectButton(params.hasSelectButton);
            this.setStarIcon(this.account.hasStar);
            // login, password, passcode
            this.setLogin();
            this.setPassword();
            this.setPasscode();
            // populate websites
            this.populateWebsites();
            // populate extras
            this.populateExtras();
            // display
            this.showLayout();
            this.setError(params.errorText);
        },

        setLogin() {
            if (this.account.login) {
                document.getElementById("account_login_field").hidden = false;
                document.getElementById("account_login_value").textContent = this.account.login;
                } else {
                document.getElementById("account_login_field").hidden = true;
            }
        },

        setPassword() {
            if (this.account.password) {
                document.getElementById("account_password_field").hidden = false;
                const isHidePasswords = Settings.isHidePasswords()
                this.setShowPassword(!isHidePasswords);
                document.getElementById("account_password_value").textContent = 
                    isHidePasswords ? "●●●●●●●●" : this.account.password;
                } else {
                document.getElementById("account_password_field").hidden = true;
            }
        },

        setShowPassword(isShowPassword) {
            const showPasswordButton = document.getElementById("show_password_button");
            this.isShowPassword = isShowPassword;
            if (isShowPassword) {
                showPasswordButton.src = "images/hide_password_button.png";
            } else {
                showPasswordButton.src = "images/show_password_button.png";
            }
        },

        setPasscode() {
            this.clearTotpElements();
            if (this.account.oneTimePassword) {
                document.getElementById("account_one_time_password_field").hidden = false;
                document.getElementById("copy_one_time_password_button").addEventListener("click", () => this.onCopyOneTimePasswordButtonClick());
                this.addTotpTextElement(
                    document.getElementById("account_one_time_password_value"),
                    this.account.oneTimePassword);
                const totpIcon = document.querySelector(`#${this.layoutId} .otp_icon`);
                this.addTotpIconElement(totpIcon);
            } else {
                document.getElementById("account_one_time_password_field").hidden = true;
            }
        },

        populateWebsites() {
            D.func();
            let prevRow = null;
            let row = null;
            // reset
            const rows = document.getElementsByClassName("website_row");
            for (let k = rows.length - 1; k >= 0; k--) {
                row = rows[k];
                if (row.id != "last_website_row") {
                    row.parentElement.removeChild(row);
                }
            }
            // set websites field
            const websites = this.account.websites;
            if (!websites || websites.length === 0) {
                document.getElementById("websites_field").hidden = true;
                return;
            } else {
                document.getElementById("websites_field").hidden = false;
            }
            // populate
            row = document.getElementById("last_website_row");
            row.removeEventListener("click", this);
            for (let i = 0; i < websites.length; i++) {
                // set click listener
                row.addEventListener("click", this);
                // set website value
                let websiteValue = row.querySelector(".website_value");
                websiteValue.id = "website_row" + "_value_" + i;
                websiteValue.textContent = websites[i];
                // insert row
                if (prevRow) {
                    prevRow.parentNode.append(row);
                }
                prevRow = row;
                row = row.cloneNode(true);
                row.id = "";
            }
        },

        populateExtras() {
            D.func();
            const extrasContainer = document.getElementById("extras_field");
            // reset
            while (extrasContainer.firstChild) {
                extrasContainer.firstChild.remove();
            }
            // populate
            for (let i = 0; this.account.extras && i < this.account.extras.length; i++) {
                let extraContainer = document.createElement("div");
                extraContainer.classList.add("account_field");
                // set name
                let nameField = document.createElement("label");
                nameField.classList.add("login_prompt");
                nameField.textContent = this.account.extras[i].name;
                extraContainer.appendChild(nameField);
                // set value
                let valueField = document.createElement("span");
                valueField.classList.add("account_field_value");
                valueField.textContent = this.account.extras[i].value;
                extraContainer.appendChild(valueField);
                // set copy button
                let copyButton = document.createElement("span");
                copyButton.classList.add("account_field_button");
                let imageButton = document.createElement("div");
                imageButton.classList.add("image_button");
                let buttonImage = document.createElement("img");
                buttonImage.classList.add("button_image");
                buttonImage.src = "images/copy_button.png";
                buttonImage.id = "copy_extra_" + i;
                imageButton.appendChild(buttonImage);
                copyButton.appendChild(imageButton);
                copyButton.addEventListener("click", event => this.onCopyExtraClick(event));
                extraContainer.appendChild(copyButton);
                // set extra
                extrasContainer.appendChild(extraContainer);
            }
        },

        onCopyExtraClick(event) {
            D.func();
            const index = parseInt(/\d+/.exec(event.target.id)[0]);
            const extraValue = this.account.extras[index].value;
            this.copyToClipboard(extraValue);
        },

        handleEvent(event) {
            super.handleEvent(event);
            if (event.type == "click") {
                this.onWebsiteClick(event.target);
            }
        },

        onWebsiteClick(websiteRow) {
            D.func();
            const index = /\d+/.exec(websiteRow.id)[0];
            const website = this.account.websites[index];
            window.open(website);
        },

        setSelectButton(hasSelectButton = false) {
            const selectButton = document.querySelector(`#${this.layoutId} .select_button`);
            if (hasSelectButton) {
                selectButton.hidden = false;
            } else {
                selectButton.hidden = true;
            }
        },

        onSelectButtonClick() {
            D.func();
            popLayout({ selectedAccount: this.account });
        },

        onCopyLoginButtonClick() {
            D.func();
            this.copyToClipboard(this.account.login);
        },

        onCopyPasswordButtonClick() {
            D.func();
            this.copyToClipboard(this.account.password);
        },

        onCopyOneTimePasswordButtonClick() {
            D.func();
            this.copyToClipboard(this.getPasscode(this.account.oneTimePassword));
        },

        onShowPasswordButtonClick() {
            D.func();
            if (this.isShowPassword) {
                document.getElementById("account_password_value").textContent = this.account.password ? "●●●●●●●●" : "";
            } else {
                document.getElementById("account_password_value").textContent = this.account.password;
            }
            this.setShowPassword(!this.isShowPassword);
        },

        setError(errorText) {
            if (errorText) {
                setTimeout(() => {
                    this.setSnackbar(errorText, 3000, true);
                }, 1000);
            }
        },

        onStarIconClick() {
            D.func();
            this.account.hasStar = !this.account.hasStar;
            this.setStarIcon(this.account.hasStar);
            PopupModel.setHasStar(this.account);
        }
    }

    // -- ADD ACCOUNT LAYOUT -----------------------------------------------------

    window["AddAccountLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.ADD_ACCOUNT_LAYOUT,
        login: null,
        newPassword: null,
        hasStar: null,

        init() {
            // set listeners
            document.getElementById("add_button").addEventListener("click", () => this.onAddButtonClick());
            document.getElementById("insert_login_button").addEventListener("click", () => this.onInsertLoginButtonClick());
            document.getElementById("generate_password_button").addEventListener("click", () => this.onGeneratePasswordButtonClick());
            document.getElementById("insert_login_popup").addEventListener("click", () => this.onInsertLoginPopupClick());
            document.getElementById("account_login_input").addEventListener("input", () => this.onLoginPasswordInput());
            document.getElementById("account_password_input").addEventListener("input", () => this.onLoginPasswordInput());
            document.querySelector(`#${this.layoutId} .star_icon`).addEventListener("click", () => this.onStarIconClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
            // set navigation button
            this.setNavigationButton();
            // set prefilled login & password
            const prefilledLogin = PopupModel.getPrefilledLogin();
            this.login = prefilledLogin ? prefilledLogin : "";
            const prefilledNewPassword = PopupModel.getPrefilledPassword();
            this.newPassword = prefilledNewPassword ? prefilledNewPassword : "";
        },

        onPushLayout() {
            D.func();
            // initialize
            this.initLayout();
            // setup
            this.setTitle();
            this.setStarIcon();
            document.getElementById("account_login_input").value = this.login;
            document.getElementById("account_password_input").value = this.newPassword;
            this.onLoginPasswordInput();
            this.showInsertLoginPopup(false);
            // display
            this.showLayout();
        },

        onTopLayout(_, params) {
            D.func();
            // setup new password
            this.newPassword = params.newPassword || this.newPassword;
            document.getElementById("account_password_input").value = this.newPassword;
            this.onLoginPasswordInput();
            // display
            this.showLayout();
        },

        setTitle() {
            D.func();
            const titleInput = document.getElementById("account_title_input");
            if (this.isCustomTitleSupported()) {
                titleInput.value = PopupModel.getTitle();
                this.focusInput(titleInput);
                titleInput.select();
            } else {
                titleInput.value = PopupModel.getUrl();
                titleInput.setAttribute("readonly", "true");
            }
        },

        populateLogins(logins) {
            D.func();
            const lastRow = document.getElementById("last_login_row");
            // reset
            const loginList = document.getElementById("login_list");
            const rows = loginList.getElementsByTagName("div");
            for (let j = rows.length - 1; j >= 0; j--) {
                if (rows[j].id != "last_login_row") {
                    rows[j].parentNode.removeChild(rows[j]);
                }
            }
            // populate
            const count = Math.min(6, logins.length);
            for (let i = 0; i < count; i++) {
                // clone row
                let row = lastRow.cloneNode(true);
                row.style.display = "block";
                row.id = "";
                row.addEventListener("click", event => this.onLoginRowClick(event));
                row.textContent = logins[i];
                // insert row
                lastRow.parentNode.insertBefore(row, lastRow);
            }
        },

        onLoginRowClick(event) {
            D.func();
            if (event) {
                const input = document.getElementById("account_login_input");
                input.value = event.target.textContent;
                this.onLoginPasswordInput();
            }
            this.showInsertLoginPopup(false);
        },

        onInsertLoginPopupClick() {
            D.func();
            this.showInsertLoginPopup(false);
        },

        onLoginPasswordInput() {
            D.func();
            this.login = document.getElementById("account_login_input").value;
            this.newPassword = document.getElementById("account_password_input").value;
            // update password strength
            this.updatePasswordStrength(this.newPassword);
            // set button
            const button = document.getElementById("add_button");
            if (this.login && this.newPassword) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        },

        showInsertLoginPopup(isShow) {
            D.func(isShow);
            document.getElementById("insert_login_popup").style.display = isShow ? "block" : "none";
        },

        onKeyPress(event) {
            const button = document.getElementById("add_button");
            if (!button.disabled && event.keyCode == ENTER_KEY) {
                this.onAddButtonClick();
            }
        },

        onInsertLoginButtonClick() {
            D.func();
            PopupModel.getLogins();
        },

        onGeneratePasswordButtonClick() {
            D.func();
            pushLayout("GeneratePasswordLayout");
        },

        onAddButtonClick() {
            D.func();
            const account = {
                login: document.getElementById("account_login_input").value,
                password: document.getElementById("account_password_input").value,
                title2: document.getElementById("account_title_input").value,
                hasStar: this.hasStar
            };
            // add account
            PopupModel.addAccount(account);
            // autofill & close
            PopupModel.tryAutofillAccount(account);
        },

        onStarIconClick() {
            D.func();
            this.hasStar = !this.hasStar;
            this.setStarIcon(this.hasStar);
        },
    }

    // -- ERROR LAYOUT --------------------------------------------------------

    window["ErrorLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.ERROR_LAYOUT,

        init() {
            // set listeners
            document.querySelector(`#${this.layoutId} .navigation_button`).addEventListener("click", () => this.onCloseButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onPushLayout(params) {
            D.func();
            // initialize
            this.initLayout();
            // set error
            document.querySelector(`#${this.layoutId} .error_text`).textContent = params.error;
            // set report problem link
            if (params.reportProblem) {
                this.showReportProblemLink();
            }
            // display
            this.showLayout();
        }
    }

    // -- SELECT ACTION LAYOUT --------------------------------------------------------

    window["SelectActionLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.SELECT_ACTION_LAYOUT,

        init() {
            // set listeners
            document.querySelector(`#${this.layoutId} .navigation_button`).addEventListener("click", () => this.onCloseButtonClick());
            document.getElementById("autofill_account_button").addEventListener("click", () => this.onAutofillAccountClick());
            document.getElementById("autofill_card_button").addEventListener("click", () => this.onAutofillCardClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onPushLayout() {
            D.func();
            // initialize
            this.initLayout();
            // show report problem link
            this.showReportProblemLink();
            // display
            this.showLayout();
        },

        onAutofillAccountClick() {
            D.func();
            PopupModel.onSelectAction("autofill_account");
        },

        onAutofillCardClick() {
            D.func();
            PopupModel.onSelectAction("autofill_card");
        }
    }

    // -- SELECT FORM LAYOUT --------------------------------------------------------

    window["SelectFormLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.SELECT_FORM_LAYOUT,

        init() {
            // set listeners
            document.getElementById("autofill_login_button").addEventListener("click", () => this.onAutofillLoginFormClick());
            document.getElementById("autofill_registration_button").addEventListener("click", () => this.onAutofillRegistrationFormClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
            // set navigation button
            this.setNavigationButton();
        },

        onPushLayout() {
            D.func();
            // initialize
            this.initLayout();
            // show report problem link
            this.showReportProblemLink();
            // display
            this.showLayout();
        },

        onAutofillLoginFormClick() {
            D.func();
            // select login form
            PopupModel.onSelectForm("login_form");
        },

        onAutofillRegistrationFormClick() {
            D.func();
            // select registration form
            PopupModel.onSelectForm("registration_form");
        }
    }

    // -- NOT FOUND LAYOUT --------------------------------------------------------

    window["NotFoundLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.NOT_FOUND_LAYOUT,

        init() {
            // set listeners
            document.getElementById("search_account_button").addEventListener("click", () => this.onSearchButtonClick());
            document.getElementById("add_account_button").addEventListener("click", () => this.onAddAccountClick());
            document.querySelector(`#${this.layoutId} .navigation_button`).addEventListener("click", () => this.onCloseButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onPushLayout() {
            D.func();
            // initialize
            this.initLayout();
            // show report problem link
            this.showReportProblemLink();
            // display
            this.showLayout();
        },

        onAddAccountClick() {
            D.func();
            pushLayout("AddAccountLayout");
        }
    }

    // -- SEARCH ACCOUNT LAYOUT --------------------------------------------

    window["SearchAccountLayout"] = {
        __proto__: AccountListLayout,
        layoutId: LAYOUTS_IDS.SEARCH_ACCOUNT_LAYOUT,
        accounts: null,
        selectedAccount: null,
        filteredAccounts: null,
        lastQuery: null,
        filterTimerId: null,
        lastRowId: "last_search_account_row",
        accontRowClass: "search_account_row",

        init() {
            // set listeners
            document.querySelector(`#${this.layoutId} .select_button`).addEventListener("click", () => this.onSelectButtonClick());
            document.querySelector(`#${this.layoutId} .navigation_button`).addEventListener("click", () => this.onBackButtonClick());
            document.querySelector("#search_box").addEventListener("input", event => this.onSearchBoxInput(event));
            document.querySelector("#search_box").addEventListener("keydown", event => this.onSearchBoxKeyDown(event));
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
            // localize placeholder
            document.querySelector("#search_box").placeholder = Strings.get("search_text");
        },

        onPushLayout(params) {
            D.func();
            this.filteredAccounts = this.accounts = params.accounts;
            // initialize
            this.initLayout();
            // populate accounts
            this.populateAccounts(this.accounts);
            // set checked radio
            this.selectAccount(false);
            // display
            this.showLayout();
            // focus search box
            this.focusInput(document.getElementById("search_box"));
        },

        onTopLayout(layoutName, params) {
            D.func();
            if (layoutName == "QueryLayout") {
                if (params.result) {
                    // assign account
                    PopupModel.assignAccount(this.selectedAccount);
                }
                // select account
                PopupModel.onSelectAccount(this.selectedAccount);
            } else if (layoutName == "ShowAccountLayout" && params.selectedAccount) {
                // select account
                this.selectedAccount = params.selectedAccount;
                this.onSelectAccount();
            } else {
                // refresh stars
                this.refreshStars(this.filteredAccounts);
                // display
                this.showLayout();
                // focus search box
                this.focusInput(document.getElementById("search_box"));
            }
        },

        onSearchBoxInput(event) {
            const query = event.target.value;
            D.func(query);
            // set first letter
            if (query.length === 1) {
                this.filterAccounts(query);
            }
            // add more letters with delay
            this.startFilterTimer(query);
        },

        filterAccounts(query) {
            D.func();
            // filter accounts
            if (this.lastQuery && (query.indexOf(this.lastQuery) === 0)) {
                this.filteredAccounts = SearchHelper.getFilteredAccounts(this.filteredAccounts, query);
            } else {
                this.filteredAccounts = SearchHelper.getFilteredAccounts(this.accounts, query);
            }
            this.lastQuery = query;
            // set filtered accounts
            if (this.filteredAccounts && this.filteredAccounts.length != 0) {
                this.populateAccounts(this.filteredAccounts, query);
                this.selectAccount(false);
                document.querySelector("#not_found_text").hidden = true;
                document.getElementById("search_account_list").hidden = false;
            } else {
                document.getElementById("search_account_list").hidden = true;
                document.querySelector("#not_found_text").hidden = false;
            }
        },

        startFilterTimer(query) {
            D.func();
            if (this.filterTimerId) {
                clearTimeout(this.filterTimerId);
            }
            this.filterTimerId = setTimeout(query => this.onFilterTimeout(query), 150, query);
        },

        onFilterTimeout(query) {
            D.func();
            this.filterTimerId = null;
            this.filterAccounts(query);
        },

        onAccountDoubleClick() {
            D.func();
            this.onSelectButtonClick();
        },

        onKeyPress(event) {
            D.func();
            if (event.keyCode == ENTER_KEY) {
                this.onSelectButtonClick();
            }
        },

        onSearchBoxKeyDown(event) {
            D.func();
            if (event.keyCode === ESC_KEY && event.target.value === "") {
                close();
            }
        },

        onSelectButtonClick() {
            D.func();
            const index = this.getCheckedRadioIndex();
            if (this.filteredAccounts && index >= 0 && index < this.filteredAccounts.length) {
                this.selectedAccount = this.filteredAccounts[index];
                this.onSelectAccount();
            }
            return;
        },

        onSelectAccount() {
            if (this.shouldAskToAssign()) {
                pushLayout("QueryLayout", { query: `${Strings.get("assign_account_query")} ${PopupModel.getUrl()} ?` });
            } else {
                PopupModel.tryAutofillAccount(this.selectedAccount);
            }
        },

        shouldAskToAssign() {
            D.func();
            const accounts = window["SelectAccountLayout"].getAccounts();
            if (accounts && accounts.length != 0) {
                return accounts.findIndex(acc => acc.cardId === this.selectedAccount.cardId) === -1;
            }
            return true;
        },

        getAccounts() {
            D.func();
            return this.filteredAccounts;
        }
    }

    // -- QUERY LAYOUT --------------------------------------------------------

    window["QueryLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.QUERY_LAYOUT,

        init() {
            // set listeners
            document.querySelector(`#${this.layoutId} .yes_button`).addEventListener("click", () => this.onYesButtonClick());
            document.querySelector(`#${this.layoutId} .no_button`).addEventListener("click", () => this.onNoButtonClick());
            document.querySelector(`#${this.layoutId} .navigation_button`).addEventListener("click", () => this.onCloseButtonClick());
        },

        onPushLayout(params) {
            D.func();
            // initialize
            this.initLayout();
            // setup
            document.querySelector(`#${this.layoutId} .query`).textContent = params.query;
            // display
            this.showLayout();
        },

        onYesButtonClick() {
            D.func();
            popLayout({ result: true });
        },

        onNoButtonClick() {
            D.func();
            popLayout({ result: false });
        }
    }

    // -- CHANGE PASSWORD LAYOUT -----------------------------------------------------

    window["ChangePasswordLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.CHANGE_PASSWORD_LAYOUT,
        account: null,
        newPassword: null,

        init() {
            // set listeners
            document.getElementById("generate_new_password_button").addEventListener("click", () => this.onGeneratePasswordButtonClick());
            document.getElementById("show_current_password_button").addEventListener("click", () => this.onShowPasswordButtonClick());
            document.getElementById("copy_current_password_button").addEventListener("click", () => this.onCopyCurrentPasswordButtonClick());
            document.getElementById("copy_new_password_button").addEventListener("click", () => this.onCopyNewPasswordButtonClick());
            document.getElementById("new_password_input").addEventListener("input", () => this.onNewPasswordInput());
            document.getElementById("change_button").addEventListener("click", () => this.onChangeButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
            // set website host
            document.getElementById("website_host_value").textContent = PopupModel.getUrl();
            // set navigation button
            this.setNavigationButton();
            // set prefilled password
            this.newPassword = PopupModel.getPrefilledNewPassword();
        },

        onPushLayout(params) {
            D.func();
            this.account = params.account;
            // initialize
            this.initLayout();
            // setup
            this.showReportProblemLink();
            this.setPassword();
            document.getElementById("new_password_input").value = this.newPassword;
            this.onNewPasswordInput();
            // display
            this.showLayout();
        },

        setPassword() {
            const isHidePasswords = Settings.isHidePasswords()
            this.setShowPassword(!isHidePasswords);
            if (isHidePasswords) {
                document.getElementById("current_password_value").textContent = this.account.password ? "●●●●●●●●" : "";
            } else {
                document.getElementById("current_password_value").textContent = this.account.password;
            }
        },

        setShowPassword(isShowPassword) {
            const showPasswordButton = document.getElementById("show_current_password_button");
            this.isShowPassword = isShowPassword;
            if (isShowPassword) {
                showPasswordButton.src = "images/hide_password_button.png";
            } else {
                showPasswordButton.src = "images/show_password_button.png";
            }
        },

        onTopLayout(layoutName, params) {
            D.func();
            if (layoutName == "QueryLayout") {
                if (params.result) {
                    // change password
                    const newAccount = {
                        ...this.account,
                        password: this.account.newPassword,
                        newPassword: null
                    };
                    // save new password in SafeInCloud app
                    PopupModel.changePassword(newAccount);
                    // autofill & close 
                    PopupModel.autofillAccount(this.account);
                } else {
                    // autofill & close
                    PopupModel.autofillAccount(this.account);
                }
            } else if (layoutName == "GeneratePasswordLayout") {
                // setup new password
                this.newPassword = params.newPassword || this.newPassword;
                document.getElementById("new_password_input").value = this.newPassword;
                this.onNewPasswordInput();
                // display
                this.showLayout();
            }
        },

        onCopyCurrentPasswordButtonClick() {
            D.func();
            // copy password to clipboard
            this.copyToClipboard(this.account.password);
        },

        onCopyNewPasswordButtonClick() {
            D.func();
            const newPassword = document.getElementById("new_password_input").value;
            // copy new password to clipboard
            this.copyToClipboard(newPassword);
        },

        onShowPasswordButtonClick() {
            D.func();
            // is password shown ?
            if (this.isShowPassword) {
                document.getElementById("current_password_value").textContent = this.account.password ? "●●●●●●●●" : "";
            } else {
                document.getElementById("current_password_value").textContent = this.account.password;
            }
            this.setShowPassword(!this.isShowPassword);
        },

        onGeneratePasswordButtonClick() {
            D.func();
            pushLayout("GeneratePasswordLayout");
        },

        onKeyPress(event) {
            const button = document.getElementById("change_button");
            if (!button.disabled && event.keyCode == ENTER_KEY) {
                this.onChangeButtonClick();
            }
        },

        onChangeButtonClick() {
            D.func();
            const newPassword = document.getElementById("new_password_input").value;
            this.account.newPassword = newPassword;
            pushLayout("QueryLayout", { query: Strings.get("save_password_query") });
        },

        onNewPasswordInput() {
            D.func();
            this.newPassword = document.getElementById("new_password_input").value;
            // update password strength
            this.updatePasswordStrength(this.newPassword);
            // set button 
            const button = document.getElementById("change_button");
            if (this.newPassword) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        }
    }

    // -- GENERATE PASSWORD LAYOUT -----------------------------------------------------

    window["GeneratePasswordLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.GENERATE_PASSWORD_LAYOUT,
        lengthSliderTimerId: null,

        init() {
            // set listeners
            document.getElementById("password_length_slider").addEventListener("input", event => this.onPasswordLengthSliderInput(event));
            document.getElementById("generated_password").addEventListener("input", event => this.onGeneratedPasswordInput(event));
            document.getElementById("password_options_button").addEventListener("click", () => this.onPasswordOptionsButtonClick());
            document.querySelector(".refresh_button").addEventListener("click", () => this.onRefreshButtonClick());
            document.querySelector(`#${this.layoutId} .ok_button`).addEventListener("click", () => this.onOkButtonClick());
            document.querySelectorAll(`#${this.layoutId} input[name=password_type]`).forEach(radio => radio.addEventListener("change", () => this.onPasswordTypeRadioChange()));
            document.querySelector(`#${this.layoutId} .navigation_button`).addEventListener("click", () => this.onBackButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onPushLayout() {
            D.func();
            // initialize
            this.initLayout();
            // set first password by default
            this.generateNewPassword();
            // display
            this.showLayout();
            // focus & check radio
            const type = Settings.getPasswordType();
            const radio = document.querySelectorAll(`#${this.layoutId} input[name=password_type]`)[type];
            this.focusInput(radio);
            radio.checked = true;
        },

        onTopLayout() {
            D.func();
            // generate new password
            this.generateNewPassword();
            // display
            this.showLayout();
        },

        onPasswordOptionsButtonClick() {
            D.func();
            pushLayout("PasswordOptionsLayout");
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

        onGeneratedPasswordInput(event) {
            D.func();
            // update password strength
            this.updatePasswordStrength(event.target.value);
        },

        onOkButtonClick() {
            D.func();
            popLayout({ newPassword: document.getElementById("generated_password").value });
        },

        onKeyPress(event) {
            D.func();
            if (event.keyCode == ENTER_KEY) {
                this.onOkButtonClick();
            }
        }
    }

    // -- UPDATE APP LAYOUT -----------------------------------------------------

    window["UpdateAppLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.UPDATE_APP_LAYOUT,

        init() {
            // set listeners
            document.getElementById("update_button").addEventListener("click", () => this.onUpdateAppButtonClick());
            document.querySelector(`#${this.layoutId} .navigation_button`).addEventListener("click", () => this.onBackButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onUpdateAppButtonClick() {
            D.func();
            chrome.tabs.create({ url: "https://www.safe-in-cloud.com/download" });
            // close
            close();
        }
    }

    // -- PASSWORD OPTIONS LAYOUT -----------------------------------------------------

    window["PasswordOptionsLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.PASSWORD_OPTIONS_LAYOUT,

        init() {
            // set listeners
            document.querySelector(`#${this.layoutId} .ok_button`).addEventListener("click", () => this.onOkButtonClick());
            document.querySelector(`#${this.layoutId} .navigation_button`).addEventListener("click", () => this.onBackButtonClick());
            document.getElementById("restore_button").addEventListener("click", () => this.onRestoreButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onPushLayout() {
            D.func();
            // initialize
            this.initLayout();
            // setup
            document.getElementById("separator_input").value = Settings.getAlphabet("separator_alphabet");
            document.getElementById("symbols_input").value = Settings.getAlphabet("symbols_alphabet");
            document.getElementById("exclude_similar_characters_checkbox").checked = Settings.isExcludeSimilarCharacters();
            // display
            this.showLayout();
        },

        onRestoreButtonClick() {
            D.func();
            // reset separator
            document.getElementById("separator_input").value = Settings.getDefaultAlphabet("separator_alphabet");
            // reset symbols
            document.getElementById("symbols_input").value = Settings.getDefaultAlphabet("symbols_alphabet");;
            // reset excude characters
            document.getElementById("exclude_similar_characters_checkbox").checked = false;
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
            // show previous layout
            popLayout();
        },

        onKeyPress(event) {
            D.func();
            if (event.keyCode == ENTER_KEY) {
                this.onOkButtonClick();
            }
        }
    }

    // -- START APP LAYOUT -----------------------------------------------------

    window["StartAppLayout"] = {
        __proto__: Layout,
        layoutId: LAYOUTS_IDS.START_APP_LAYOUT,

        init() {
            // set listeners
            document.getElementById("start_app_button").addEventListener("click", () => this.onStartAppButtonClick());
            document.querySelector(`#${this.layoutId} .navigation_button`).addEventListener("click", () => this.onCloseButtonClick());
            document.querySelector(`#${this.layoutId} .help_button`).addEventListener("click", () => this.onHelpButtonClick());
        },

        onStartAppButtonClick() {
            D.func();
            chrome.tabs.create({ url: "sicapp://start" });
        }
    }

    return {
        pushLayout: function(layoutId, params) {
            pushLayout(layoutId, params);
        },

        popAuthorizationLayout: function() {
            popAuthorizationLayout();
        },

        onWrongPassword: function() {
            window["PasswordLayout"].onWrongPassword();
        },

        showInsertLoginPopup: function(logins) {
            window["AddAccountLayout"].populateLogins(logins);
            window["AddAccountLayout"].showInsertLoginPopup(true);
        }
    }

})();