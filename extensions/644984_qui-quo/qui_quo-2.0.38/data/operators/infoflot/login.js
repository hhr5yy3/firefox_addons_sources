function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#TopNav-LoginForm, form.form-inline');
    const iframe = document.querySelector('iframe[src="https://booking.infoflot.com/External/Topbar"]');
    if ( iframe && iframe.getAttribute('height') != "72" ) {
        iframe.setAttribute('height', "72" );
    }

    if ( !form || document.querySelector(".qq-auto-login-wrapper") ) {
        return;
    }

    const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
    wrapper.style.flexDirection = "row";
    wrapper.style.display = "inline-flex";


    button.style.width = "initial";
    button.style.cursor = "pointer";
    button.classList.add("btn");

    select.style.margin = "0px 5px";

    button.before(select);
    form.append(wrapper);
    button.addEventListener('click', () => {window.setTimeout(() =>window.location.reload(), 2500); button.textContent = 'Вход...'});
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#TopNav-LoginForm, form.form-inline');
    const usernameInp = form.querySelector('input[name="username"]');
    const passwordInp = form.querySelector('input[name="password"]');
    const loginBtn = form.querySelector('input[name="submit"]');
    return {usernameInp, passwordInp, loginBtn}

}
