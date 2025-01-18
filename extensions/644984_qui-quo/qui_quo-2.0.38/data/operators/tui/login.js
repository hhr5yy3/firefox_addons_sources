function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('.loginPage');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("button", "green");

    button.style.marginTop = "10px";
    label.style.marginTop = "5px";
    label.style.marginLeft = "3px";
    label.style.fontSize = "10px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('.loginPage');
    const usernameInp = form.querySelector('input#popupAuthLogin');
    const passwordInp = form.querySelector('input#popupAuthPassword');
    const loginBtn = form.querySelector('.buttonContainer button.button.green');
    return {usernameInp, passwordInp, loginBtn, event: ["input", "change", "click"]}
}
