function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form#clientRequestForm');
    if ( !form || form.querySelector(".qq-auto-login-wrapper") ) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    button.classList.add("btn-primary");
    button.textContent = "Отправить с помощью Qui-Quo";
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    wrapper.style.width = "fit-content";
    select.before(label);
    form.append(wrapper);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form#clientRequestForm');
    const loginBtn = form.querySelector('#clientRequestFormButtonSubmit');
    const usernameInp = form.querySelector('input[name="email"]');
    const passwordInp = form.querySelector('input[name="password"]');
    const event = ['input', 'change', 'click']
    return {usernameInp, passwordInp, loginBtn, event, form}
}
