function injectAutoLoginSelect(logins, manager, opts) {
    const smallForm = document.querySelector('#online_form');
    const loginFull = document.querySelector('.login-full form');

    if ( document.querySelector(".qq-auto-login-wrapper") ) {
        return;
    }


    if ( loginFull ) {
        createQuickButtonFullForm(loginFull, logins, manager, opts);
        return;
    }

    if ( smallForm ) {
        createQuickButtonSmallForm(smallForm, logins, manager, opts);
        return;
    }


}

function createQuickButtonFullForm(loginFull, logins, manager, opts) {
    const {button, wrapper, select} = createAutoLoginWrapper(logins, manager, opts);

    wrapper.style.width = "616px";
    wrapper.style.paddingLeft = "214px";
    wrapper.style.flexDirection = "row";
    wrapper.style.marginTop = "10px";

    button.style.cursor = "pointer";
    button.style.backgroundColor = "#08559a";
    button.style.height = "46px";
    button.style.border = "1px solid";
    button.style.borderRadius = "3px";
    button.style.borderColor = "#fff";
    button.style.color = "#fff";
    button.style.width = "48%"
    button.style.marginLeft = "4%"

    select.style.width = "48%"

    button.before(select);
    loginFull.append(wrapper);
}

function createQuickButtonSmallForm(smallForm, logins, manager, opts) {
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    wrapper.style.width = "94%";
    wrapper.style.marginLeft = "4%";

    button.style.background = "transparent url(/images/tourtrans/tourmenu-button1.png)";
    button.style.color = "#fff";
    button.style.border = "0";
    button.style.height = "28px";
    button.style.width = "145px";
    button.style.fontSize = "10px"
    button.style.marginLeft = "27%";
    button.style.cursor = "pointer";

    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    label.style.fontSize = "10px";

    select.before(label);
    smallForm.append(wrapper);
}



function getElementsForQuickLoginAction() {
    const smallForm = document.querySelector('#online_form');
    const loginFull = document.querySelector('.login-full form');

    if ( loginFull ) {
        return  getFullFormElements(loginFull);
    }

     if ( smallForm ) {
        return getSmallFormElements(smallForm);
    }

}


function getFullFormElements(form) {
    const usernameInp = form.querySelector('input[placeholder="Логин"]');
    const passwordInp = form.querySelector('input[placeholder="Пароль"]');
    const loginBtn = form.querySelector('input[value="Войти"]');
    return {usernameInp, passwordInp, loginBtn}
}

function getSmallFormElements(form) {
    const usernameInp = form.querySelector('#userid');
    const passwordInp = form.querySelector('#password');
    const loginBtn = form.querySelector('#submit_OK');
    return {usernameInp, passwordInp, loginBtn}
}