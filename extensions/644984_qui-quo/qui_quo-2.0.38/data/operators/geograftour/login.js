const memoizedFindForm = findForm();

function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = memoizedFindForm();
    if ( form && !form.querySelector(".qq-quick-login-btn") ) {
        const autoLoginForm = createAutoLoginForm(logins, manager, opts);
        form.append(autoLoginForm);
    }
}

function findForm() {
    let cache = {};
    return () => {
        if ( "form" in cache ) {
            return cache;
        }
        try {
            const passwordInp = document.querySelector("input[type='password'], input[name='pass'");
            const form = passwordInp.closest(".login_form");
            const usernameInp = form.querySelector("input[type='text'], input[name='login']");
            const loginBtn = form.querySelector(".md-primary .md-button-content");
            const event = ["focus", "input", "change", "click", "blur"];
            cache = {passwordInp, form, usernameInp, loginBtn, event};
            return cache;
        } catch (e) {
            return {};
        }
    }
}

function createAutoLoginForm(logins, manager, opts) {
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "100%";

    wrapper.style.alignItems = "center";
    wrapper.style.padding = "10px";
    label.style.fontSize = "12px";

    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';

    return wrapper;
}

function getElementsForQuickLoginAction() {
    return memoizedFindForm();
}
