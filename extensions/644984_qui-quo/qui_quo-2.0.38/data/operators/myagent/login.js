function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('.AuthForm form');
    if ( !form || form.querySelector(".qq-auto-login-wrapper")) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "initial";
    button.style.cursor = "pointer";
    button.classList.add("Button","Button--primary", "Button--withoutRadius");
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.before(label);
    form.append(wrapper);
}

function getElementsForQuickLoginAction() {
    return {specialInputs: true}
}


async function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    const form = document.querySelector('.AuthForm form');
    const [usernameInp, passwordInp] = form.querySelectorAll('input.FormInput__Input');
    const loginBtn = form.querySelector('.AuthForm__Buttons button[type="submit"]');

    setReactInputValue(usernameInp, login)
    if ( insertPassword !== false ) {
        setReactInputValue(passwordInp, password);
        loginBtn.click();
    }
}

function setInputsValue(usernameInp, passwordInp, login, password) {
    usernameInp.value = login;
    passwordInp.value = password;
}
