function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('.system-auth-authorize-block');
    if (!form || form.querySelector(".qq-auto-login-wrapper")) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    button.style.cursor = "pointer";
    button.style.height = "28px";
    button.classList.add("ac-button");
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.before(label);
    form.append(wrapper);
}

function getElementsForQuickLoginAction() {
    return {specialInputs: true}
}

function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    $$('input[name="USER_LOGIN"]').forEach(usernameInp => {
        setInputsValue(usernameInp, null, login, password, false, true);
    })
    $$('input[name="USER_PASSWORD"]').forEach(passwordInp => {
        setInputsValue(null, passwordInp, login, password, false, true);
    })
    const form = $1('.system-auth-authorize-block');
    $$('[name="Login"]',form).forEach(b => b.click());
}
