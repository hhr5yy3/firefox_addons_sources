const memoizedFindForm = findForm();

function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = memoizedFindForm();
    if ( form && !form.querySelector(".qq-quick-login-btn") ) {
        const autoLoginForm = createAutoLoginForm(logins, manager, opts);
        setFormsStyles(form, autoLoginForm)
        form.append(autoLoginForm);
    }
}

function setFormsStyles(form, autoLoginForm) {
    form.style.position = 'relative';

    autoLoginForm.style.zIndex = "999999";
    autoLoginForm.style.marginLeft = "auto";
    autoLoginForm.style.marginRight = "auto";
    autoLoginForm.style.marginTop = "10px";
}

function findForm() {
    let cache = {};
    return () => {
        if ( "form" in cache ) {
            return cache;
        }
        try {
            const passwordInp = document.querySelector("input[type='password'], input[name='pass']");
            const form = passwordInp.closest("form");
            const usernameInp = form.querySelector("input[type='text'], input[name='login']");
            const loginBtn = form.querySelector("input[type='submit'], button[type='submit']");
            const event = ["focus", "input", "change", "blur"];
            cache = {passwordInp, form, usernameInp, loginBtn, event};
            return cache;
        } catch (e) {
            return {};
        }
    }
}

function createAutoLoginForm(logins, manager, opts) {
    const {button, wrapper, select, label, a} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "100%";

    wrapper.style.alignItems = "center";
    wrapper.style.padding = "10px";

    select.before(label);
    label.style.display = 'inline-block';
    label.style.color = "#fff";
    label.style.fontSize = "16px";
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';
    wrapper.style.width = '100%';
    a.style.color = "#fff";

    return wrapper;
}

function getElementsForQuickLoginAction() {
    return memoizedFindForm();
}
