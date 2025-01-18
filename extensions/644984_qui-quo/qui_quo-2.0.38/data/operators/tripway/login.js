function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form#new_user');
    if ( !form || form.querySelector(".qq-auto-login-wrapper")) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "initial";
    button.style.cursor = "pointer";
    button.classList.add("button_orange","button","button");
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.style.border = "1px solid #e1e4e5";
    select.style.borderRadius = "2px";
    select.before(label);
    form.append(wrapper);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form#new_user');
    const usernameInp = form.querySelector('input#user_email');
    const passwordInp = form.querySelector('input#user_password');
    const loginBtn = form.querySelector('input[type="submit"]');
    return {usernameInp, passwordInp, loginBtn, event: "change"}
}
