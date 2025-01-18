function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    form.append(wrapper);
    button.classList.add("el-button", "el-button--primary");
    button.style.marginTop = "10px";
    label.style.marginTop = "5px";
    label.style.marginLeft = "3px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form');
    const usernameInp = form.querySelector('input:not([type="password"])');
    const passwordInp = form.querySelector('input[type="password"]');
    const loginBtn = form.nextElementSibling.querySelector('button.el-button.el-button--primary:not(.qq-quick-login-btn)');
    return {usernameInp, passwordInp, loginBtn, event: "input"}
}
