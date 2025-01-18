const memoizedFindForm = findForm();

function injectAutoLoginSelect(logins, manager, opts) {
    const {form} = memoizedFindForm();
    if (form && !document.querySelector(".qq-quick-login-btn")) {
        const autoLoginForm = createAutoLoginForm(logins, manager, opts);
        form.after(autoLoginForm);
    }
}

function findForm() {
    let cache = {};
    return () => {
        if ("form" in cache) {
            return cache;
        }
        try {
            const passwordInp = document.querySelector("#password-inputEl");
            const form = document.querySelector(".loginPanel");
            const usernameInp = form.querySelector("#username-inputEl");
            const loginBtn = form.querySelector('button[id*="btnEl"]');
            const event = ["focus", "click", "input", "change", "blur"];
            cache = {passwordInp, form, usernameInp, loginBtn, event};
            return cache;
        } catch (e) {
            return {error: e};
        }
    }
}

function createAutoLoginForm(logins, manager, opts) {
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "300px";

    wrapper.style.alignItems = "center";
    wrapper.style.width = "300px";
    wrapper.style.margin = 'auto';

    button.classList.add("btn", "btn-warning");

    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';

    return wrapper;
}

function getElementsForQuickLoginAction() {
    return memoizedFindForm();
}
