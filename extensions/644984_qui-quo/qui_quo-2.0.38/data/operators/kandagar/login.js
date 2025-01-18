let clickedButton = null;
function injectAutoLoginSelect(logins, manager, opts) {
    const topForm = document.querySelector('#agent_form form, #logonForm');
    const mainForm = document.querySelector('#authorization_form, #formauth');

    if ( !topForm && !mainForm ) {
        return;
    }

    if ( topForm ) {
        topForm.closest("#agent_form, .auth__form").style.height = "initial";
    }
    createCell(topForm, logins, manager, opts);
    createCell(mainForm, logins, manager, opts);
}

function createCell(form, logins, manager, opts) {
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    form.append(wrapper);
    button.style.fontSize = "12px";
    button.style.margin = "0";
    wrapper.style.width = "210px";
    wrapper.style.paddingTop = "3px";
    select.style.marginTop = "3px";
    label.style.marginLeft = "3px";
    label.style.fontSize = "10px";
    label.style.color = "black";
    select.before(label);
    button.addEventListener("click", setClickedButton);
}

function getElementsForQuickLoginAction() {
    const form = clickedButton ? clickedButton.closest("form") : document.querySelector('#authorization_form, #formauth, #agent_form form');
    const usernameInp = form.querySelector('input#login, input.login_user, input#loginValue');
    const passwordInp = form.querySelector('input#password, input.pass_user, input#passwordValue');

    const loginBtn = form.querySelector('input.authknopka, input.authknopka2, button#logon');
    return {usernameInp, passwordInp, loginBtn, event: ["focus", "input", "change", "blur"]}
}
