(function mainFormSubmit() {
    D.func();

    const MAX_ATTEMPT_COUNT = 3;
    const ENTER_KEY = 13;

    var _submitMethod = null;

    // // FIXME: print inputs
    // D.printInputs();

    // attach
    tryAttachToForm(0);

    function tryAttachToForm(attempt) {
        D.func(attempt);
        // find forms
        const operableOnly = attempt != MAX_ATTEMPT_COUNT - 1;
        const forms = AccountFinder.findSubmitForms(document.location.href, operableOnly);
        for (let i = 0; i < forms.length; i++) {
            // attach
            let form = forms[i];
            attachToForm(form);
        }
        // attached ?
        if (forms.length == 0 && attempt < MAX_ATTEMPT_COUNT) {
            // try after delay
            window.setTimeout(function onTimeout() {
                D.func();
                tryAttachToForm(attempt + 1);
            }, 750);
        } else if (forms.length == 0 && attempt === MAX_ATTEMPT_COUNT) {
            attachToForm(document);
        }
    }

    function attachToForm(form) {
        D.func();
        const button = getSubmitButton(form);
        // attach to button
        if (button) {
            button.addEventListener("click", () => onSubmitButtonClick(form));
            button.addEventListener("keypress", (event) => onKeyPress(event, form));
        }
        // attach to key press
        form.addEventListener("keypress", onKeyPress);
        // attach to form
        form.addEventListener("submit", onSubmitEvent);
        D.print("ATTACHED!");
    }

    function getSubmitButton(form) {
        D.func();
        let button = InputGuesser.guessButton(form);
        if (!button) {
            button = InputGuesser.guessButton(document);
            if (button && button.form) {
                button = null;
            }
        }
        return button;
    }

    function onKeyPress(event) {
        if (event.keyCode == ENTER_KEY) {
            if (!_submitMethod || _submitMethod === "alternative") {
                D.func(event.target);
                formSubmit(event.target, "alternative");
            }
        }
    }

    function onSubmitButtonClick(form) {
        if (!_submitMethod || _submitMethod === "alternative") {
            D.func(form);
            formSubmit(form, "alternative");
        }
    }

    function onSubmitEvent(event) {
        if (!_submitMethod || _submitMethod === "submit") {
            D.func(event);
            formSubmit(event.target, "submit");
        }
    }

    function formSubmit(form, method) {
        D.func(method);
        let inputs = Patcher.findInputs(document.location.href, document);
        if (!inputs) {
            inputs = AccountFinder.findFormInputs(form);
        }
        let processed = false;
        if (AccountFinder.isChangePasswordForm(inputs)) { // change password ?
            processed = SubmitChangePasswordForm(inputs);
        } else if (AccountFinder.isLoginOrRegistrationForm(inputs)) { // login or registration ?
            processed = SubmitLoginForm(inputs);
        }
        if (processed) {
            _submitMethod = method;
        }
    }

    function SubmitLoginForm(inputs) {
        D.func();
        const account = {
            title: document.title,
            login: AccountFinder.getLoginValue(inputs),
            password: AccountFinder.getPasswordValue(inputs) || AccountFinder.getNewPasswordValue(inputs)
        };
        if (account.login && account.password) {
            chrome.runtime.sendMessage({
                target: "Client",
                method: "formSubmit",
                args: [document.location.hostname, document.location.href, account]
            });
            return true;
        }
        return false;
    }

    function SubmitChangePasswordForm(inputs) {
        D.func();
        const account = {
            password: AccountFinder.getNewPasswordValue(inputs),
            oldPassword: AccountFinder.getPasswordValue(inputs)
        };
        if (account.password && account.oldPassword) {
            chrome.runtime.sendMessage({
                target: "Client",
                method: "changeSubmit",
                args: [document.location.hostname, account]
            });
            return true;
        }
        return false;
    }

})();