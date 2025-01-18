function injectAutoLoginSelect(logins, manager, opts) {
    const regionForm = document.querySelector('.region__form');
    const loginBook = document.querySelector('.region__login');

    if ( document.querySelector(".qq-auto-login-wrapper") ) {
        return;
    }


    if ( regionForm ) {
        createQuickButtonMainForm(regionForm, logins, manager, opts);
        return;
    }

    if ( loginBook && loginBook.querySelector("input.loginbutton") ) {
        createQuickButtonSearchForm(loginBook, logins, manager, opts);
        return;
    }


}

function createQuickButtonMainForm(regionForm, logins, manager, opts) {
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);

    wrapper.style.margin = "0px 70px";

    button.style.width = "initial";
    button.style.cursor = "pointer";
    button.style.background = "#FF7F0B";
    button.style.height = "32px";
    button.style.border = "none";
    button.style.color = "#fff";
    button.style.fontWeight = "bold";

    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";

    select.before(label);

    regionForm.after(wrapper);
}

function createQuickButtonSearchForm(loginBook, logins, manager, opts) {
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    wrapper.style.paddingTop = "10px";
    wrapper.style.flexDirection = "row";

    button.style.width = "48%";
    button.style.marginLeft = "3%";
    button.style.cursor = "pointer";
    button.style.background = "#FF7F0B";
    button.style.height = "32px";
    button.style.border = "none";
    button.style.color = "#fff";
    button.style.fontWeight = "bold";

    select.style.width = "48%";
    select.style.marginLeft = "1%";
    button.before(select);
    label.remove();
    loginBook.append(wrapper);
}



function getElementsForQuickLoginAction() {
    const loginButton = document.querySelector('.region__form input[type="submit"]');
    const loginBook = document.querySelector('.region__login');

    if ( loginButton ) {
        return  getMainFormElements();
    }

     if ( loginBook ) {
        return getSearchFormElements();
    }

}


function getMainFormElements() {
    const form = document.querySelector('.region__form');
    const usernameInp = form.querySelector('#ctl00_generalContent_LoginControl_txtUserName');
    const passwordInp = form.querySelector('#ctl00_generalContent_LoginControl_txtPassword');
    const loginBtn = form.querySelector('input[type="submit"]');
    return {usernameInp, passwordInp, loginBtn}
}

function getSearchFormElements() {
    const form = document.querySelector('.region__login');
    const usernameInp = form.querySelector('#ctl00_Login_ctl01');
    const passwordInp = form.querySelector('#ctl00_Login_ctl02');
    const loginBtn = form.querySelector('input.loginbutton');
    return {usernameInp, passwordInp, loginBtn}
}