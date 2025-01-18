function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('div.login-form');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("v-btn", "v-btn--contained", "theme--light", "v-size--large", "primary");
    button.style.marginTop = "10px";
    label.style.marginTop = "5px";
    label.style.marginLeft = "3px";
    select.style.border = "1px solid";
    select.style.borderRadius = "4px";
    select.style.padding = "12px";
    select.style.color = "grey";
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('div.login-form');
    const usernameInp = form.querySelector('input[name="login"]');
    const passwordInp = form.querySelector('input[name="password"]');
    const loginBtn = form.querySelector('button.orange:not(.qq-quick-login-btn)');
    return {usernameInp, passwordInp, loginBtn, event: "input"}
}
