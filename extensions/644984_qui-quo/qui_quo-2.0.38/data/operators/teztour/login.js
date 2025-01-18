function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#loginform form, .login_body form');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("search-btn-55", "s-40", "login-butt");
    button.style.width = "initial";

    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    label.classList.add("label_login");
    
    wrapper.style.width = "100%";
    wrapper.style.paddingTop = "10px";
    select.before(label);
    const oldForm = document.querySelector("#online-login-form");
    if ( oldForm ) {
        oldForm.style.height = "initial";
    }
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#loginform form, .login_body form');

    const usernameInp = form.querySelector('input#j_username');
    const passwordInp = form.querySelector('input#j_password');

    const loginBtn = form.querySelector('input.gStatAgencyLogin, input.login-butt, [name="submit"]');
    return {usernameInp, passwordInp, loginBtn}
}
