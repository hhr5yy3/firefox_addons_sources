function injectAutoLoginSelect(logins, manager, opts) {
    const loginButton = document.querySelector('.loginform input.loginform__submit, .login__button');
    const loginBook = document.querySelector('.box_login_book');

    if ( document.querySelector(".qq-auto-login-wrapper") ) {
        return;
    }

    if ( loginButton ) {
        createQuickButtonMainForm(loginButton, logins, manager, opts);
        return;
    }

    if ( loginBook && loginBook.querySelector("input.loginbutton") ) {
        createQuickButtonSearchForm(loginBook, logins, manager, opts);
        return;
    }
}

function createQuickButtonMainForm(loginButton, logins, manager, opts) {
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "initial";
    button.style.cursor = "pointer";
    button.style.marginBottom = "5px";
    button.classList.add("loginform__submit");
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.before(label);
    loginButton.after(wrapper);
}

function createQuickButtonSearchForm(loginBook, logins, manager, opts) {
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    wrapper.style.width = "282px";
    wrapper.style.marginLeft = "122px";
    select.before(label);
    loginBook.append(wrapper);
}


function getElementsForQuickLoginAction() {
    const loginButton = document.querySelector('.loginform input.loginform__submit, .login__wrap .login__button');
    const loginBook = document.querySelector('.box_login_book');

    if ( loginButton ) {
        return  getMainFormElements();
    }

     if ( loginBook ) {
        return getSearchFormElements();
    }

}

function getMainFormElements() {
    const form = document.querySelector('.loginform, .login__wrap .login');
    const usernameInp = form.querySelector('.loginform__login input, .login__item input[type="text"]');
    const passwordInp = form.querySelector('.loginform__password input, .login__item input[type="password"]');
    const loginBtn = form.querySelector('input.loginform__submit, .login__button');
    const event = ['focus', 'click', 'input','change','blur'];
    return {usernameInp, passwordInp, loginBtn, event}
}

function getSearchFormElements() {
    const form = document.querySelector('.box_login_book');
    const usernameInp = form.querySelector('#ctl00_Login_ctl01');
    const passwordInp = form.querySelector('#ctl00_Login_ctl02');
    const loginBtn = form.querySelector('input.loginbutton');
    return {usernameInp, passwordInp, loginBtn}
}

