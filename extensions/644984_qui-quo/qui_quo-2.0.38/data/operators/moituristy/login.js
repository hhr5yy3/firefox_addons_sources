function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form.form');
    if ( !form || form.querySelector(".qq-auto-login-wrapper") ) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "initial";
    button.style.cursor = "pointer";
    button.classList.add('ui', 'button');
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.before(label);
    form.append(wrapper);
}

function getElementsForQuickLoginAction() {
    return {specialInputs: true}
}


async function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    const form = document.querySelector('form.form');
    const usernameInp = form.querySelector('[name="username"]');
    const passwordInp = form.querySelector('[name="password"]')
    const loginBtn = form.querySelector('button[type="submit"]');

    usernameInp.value = login;
    await waitingFor(() => null, 200, 2);
    simulateEvent(usernameInp, "change");
    usernameInp.type = 'hidden';
    if ( insertPassword !== false ) {
        passwordInp.value = password;
        await waitingFor(() => null, 200, 2);
        simulateEvent(passwordInp, "change");
        passwordInp.type = 'hidden';
        loginBtn.click();
        await waitingFor(() => null, 300, 2);
        clearInputsValue(usernameInp, passwordInp);
        simulateEvent(passwordInp, "change");
    }
    usernameInp.type = 'text';
    passwordInp.type = 'password';
}

function setInputsValue(usernameInp, passwordInp, login, password) {
    usernameInp.value = login;
    passwordInp.value = password;
}
