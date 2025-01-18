let clickedButton = null;
function injectAutoLoginSelect(logins, manager, opts) {
    const forms = querySelectorAll(document, 'form, #tabs-3').filter(form => form.querySelector('input[name="login"]'));
    forms.forEach(form => createCell(form, logins, manager, opts))
}

function createCell(form, logins, manager, opts) {
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    form.append(wrapper);
    select.before(label);
    button.addEventListener("click", setClickedButton);
}

function getElementsForQuickLoginAction() {
    const form = clickedButton ? clickedButton.closest("form, #tabs-3") : document.querySelector('form');
    const usernameInp = form.querySelector('input[name="login"]');
    const passwordInp = form.querySelector('input[name="password"]');

    const loginBtn = form.querySelector('input[type="submit"]');
    return {usernameInp, passwordInp, loginBtn, event: ["focus", "input", "change", "blur"]}
}
