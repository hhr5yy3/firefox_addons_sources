function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#form_login fieldset');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.style.width = "initial";
    button.style.height = "50px";
    button.style.backgroundColor = "#f68105";
    button.style.color = "white";
    button.style.border = "none";

    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";

    wrapper.style.maxWidth = "360px";
    wrapper.style.marginLeft = "240px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#form_login');

    const usernameInp = form.querySelector('input[name="login"]');
    const passwordInp = form.querySelector('input[name="pass"]');

    const loginBtn = form.querySelector('button[type="submit"]');
    return {usernameInp, passwordInp, loginBtn, event: "change"}
}
