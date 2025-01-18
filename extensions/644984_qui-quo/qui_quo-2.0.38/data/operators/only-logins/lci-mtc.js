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
            const passwordInp = document.querySelector('[name="password"]');
            const form = passwordInp.closest(".login-box");
            const usernameInp = form.querySelector('[name="user"]');
            const loginBtn = form.querySelector('[type="submit"]');
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
    button.style.width = "100%";
    
    wrapper.style.alignItems = "center";
    wrapper.style.margin = "22.5px";
    
    button.classList.add("bth", "btn-primary");
    
    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';
    
    return wrapper;
}

function getElementsForQuickLoginAction() {
    return memoizedFindForm();
}
