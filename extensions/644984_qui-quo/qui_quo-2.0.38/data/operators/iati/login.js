function findForm() {
        try {
            const passwordInp = document.querySelector("input[type='password'], input[name='pass']");
            const form = passwordInp.closest(".loginform");
            const usernameInp = form.querySelector("input[type='text'], input[name='login']");
            const loginBtn = form.querySelector("input[type='submit'], button[type='submit'], button[name='login'], input[alt='Войти']");
            const event = ["focus", "input", "change", "blur"];
            return {passwordInp, form, usernameInp, loginBtn, event};
        } catch (e) {
            return {error:e};
        }
}

function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = findForm();
    if ( form && !form.querySelector(".qq-quick-login-btn") ) {
        const autoLoginForm = createAutoLoginForm(logins, manager, opts);
        setFormsStyles(form, autoLoginForm)
        form.append(autoLoginForm);
    }
}
