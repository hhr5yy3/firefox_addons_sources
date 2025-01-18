function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('form.auth-sign-in-form, [class*="Authorization"] form');
    if (!form || form.querySelector(".qq-auto-login-wrapper")) {
        return;
    }
    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    wrapper.style.paddingTop = "10px";
    button.style.cssText = `
        align-items: center;
        background-color: var(--button-primary-bg);
        border: 1px solid transparent;
        border-radius: 4px;
        box-sizing: border-box;
        color: var(--button-primary-typo);
        cursor: pointer;
        display: inline-flex;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 500;
        justify-content: center;
        min-width: 40px;
        outline: none;
        position: relative;
        text-decoration: none;
        transition: all .16s ease;
        padding: 6px;
        user-select: none;`;
    button.style.width = "initial";

    button.style.cursor = "pointer";
    button.classList.add("button", "button-orange");
    label.style.marginLeft = "3px";
    label.style.marginTop = "5px";
    select.style.border = '1px solid black';
    select.before(label);
    form.append(wrapper);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('form.auth-sign-in-form, [class*="Authorization"] form');
    const usernameInp = form.querySelector('input.auth-sign-in-login, input[data-testid="user-widget-sign-in-email-input"]');
    const passwordInp = form.querySelector('input.auth-sign-in-password, input[data-testid="user-widget-sign-in-password-input"]');
    const loginBtn = form.querySelector('button.auth-sign-in-submit, button[data-testid="user-widget-sign-in-button"]');
    return {usernameInp, passwordInp, loginBtn}
}
