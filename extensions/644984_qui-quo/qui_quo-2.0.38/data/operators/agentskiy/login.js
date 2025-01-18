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
    form.style.minWidth = "300px";
    form.style.position = 'relative';

    autoLoginForm.style.zIndex = "999999";
    autoLoginForm.style.marginLeft = "auto";
    autoLoginForm.style.marginRight = "auto";
    autoLoginForm.style.marginTop = "10px";
    autoLoginForm.style.width = form.offsetWidth > 0 ? form.offsetWidth + "px" : "300px";
}

function findForm() {
    let cache = {};
    return () => {
        if ( "form" in cache ) {
            return cache;
        }
        try {

            const form = document.querySelector("#form_login");
            const passwordInp = form.querySelector("input[type='password']");
            const usernameInp = form.querySelector("input[type='text'], input[name='login']");
            const loginBtn = form.querySelector("input[type='submit'], button[type='submit']");
            const event = ["focus", "input", "change", "blur"];
            cache = {passwordInp, form, usernameInp, loginBtn, event};
            return cache;
        } catch (e) {
            return {error:e};
        }
    }
}

function createAutoLoginForm(logins, manager, opts) {
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "100%";
    button.classList.add("nemo-ui-button");
    wrapper.style.alignItems = "center";
    wrapper.style.padding = "10px";
    label.style.color = "#fff";
    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';

    return wrapper;
}

function getElementsForQuickLoginAction() {
    return memoizedFindForm();
}
