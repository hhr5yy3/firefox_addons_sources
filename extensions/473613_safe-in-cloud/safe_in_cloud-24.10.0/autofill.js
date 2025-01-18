(function mainAutofill() {
    D.func();

    const DATA_ID_ATTR = "data-safeincloud_id";

    // listen
    chrome.runtime.onMessage.addListener(function onMessage(message, sender, callback) {
        // calling us ?
        if (message.target == "autofill.js") {
            autofill(message);
        }
    });

    function autofill(message) {
        D.func();
        if (message.account) {
            autofillAccount(message.autofillIds, message.account);
        } else if (message.card) {
            autofillCard(message.autofillIds, message.card);
        }
    }

    function autofillCard(autofillIds, card) {
        D.func();
        InputFiller.fillTextById(autofillIds.nameInput, card.name);
        InputFiller.fillTextById(autofillIds.numberInput, card.number);
        InputFiller.fillTextById(autofillIds.cscInput, card.csc);
        if (autofillIds.expDateInput && card.expMonth && card.expYear) {
            var expDate = shortMonth(card.expMonth) + "/" + shortYear(card.expYear);
            InputFiller.fillTextById(autofillIds.expDateInput, expDate);
        }
        if (autofillIds.expMonthInput && card.expMonth) {
            if (!InputFiller.fillTextById(autofillIds.expMonthInput, shortMonth(card.expMonth))) {
                SelectFiller.fillMonthById(autofillIds.expMonthInput, card.expMonth);
            }
        }
        if (autofillIds.expYearInput && card.expYear) {
            if (!InputFiller.fillTextById(autofillIds.expYearInput, shortYear(card.expYear))) {
                SelectFiller.fillYearById(autofillIds.expYearInput, card.expYear);
            }
        }
    }

    function shortMonth(month) {
        return ("0" + month).slice(-2);
    }

    function shortYear(year) {
        return year.slice(-2);
    }

    function isEmail(text) {
        const regExp = /^([\da-zA-Z+_.-]+)@([\da-zA-Z.-]+)\.([a-zA-Z]{2,})$/i;
        return regExp.test(text);
    }

    function isTel(text) {
        const regExp = /^(\+\d+[- .]*)?(\(\d+\)[- .]*)?(\d[\d- .]+\d)$/i;
        return regExp.test(text);
    }

    function autofillAccount(autofillIds, account) {
        D.func();
        // fill login according to its type
        if (isEmail(account.login)) {
            InputFiller.fillTextById(autofillIds.emailInput || autofillIds.usernameInput || autofillIds.telInput, account.login);
            InputFiller.fillTextById(autofillIds.confirmEmailInput, account.login);
        } else if (isTel(account.login)) {
            InputFiller.fillTextById(autofillIds.telInput || autofillIds.usernameInput || autofillIds.emailInput, account.login);
        } else {
            InputFiller.fillTextById(autofillIds.usernameInput || autofillIds.emailInput || autofillIds.telInput, account.login);
        }
        // fill extra fields
        for (let i = 0; account.extras && i < account.extras.length; i++) {
            InputFiller.fillTextById(autofillIds.extras[i], account.extras[i].value);
        }
        // fill others
        InputFiller.fillTextById(autofillIds.passwordInput, account.password);
        InputFiller.fillTextById(autofillIds.newPasswordInput, account.newPassword || account.password);
        InputFiller.fillTextById(autofillIds.confirmPasswordInput, account.newPassword || account.password);
        InputFiller.fillTextById(autofillIds.passcodeInput, account.passcode);
        // copy one-time password
        if (account.passcode && account.copyToClipboard) {
            copyToClipboard(account.passcode);
        }
    }

    function copyToClipboard(text) {
        D.func(text);
        var textArea = document.createElement("textarea");
        textArea.textContent = text;
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        body.removeChild(textArea);
    }

})();