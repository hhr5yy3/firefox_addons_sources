function injectAutoLoginSelect(logins, manager, opts) {
    const panel = document.querySelector('.bookSelector');
    if ( !panel || document.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    wrapper.style.display = "inline-flex";
    wrapper.style.marginBottom = "10px";
    wrapper.style.width = "100%";
    panel.after(wrapper);

    button.style.cssText = `
    color: #0984e3;
    padding: .3rem 1rem;
    border: 1px solid #0984e3;
    font-size: 1.5rem;
    margin: 0 0 1rem;
    white-space: nowrap;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    background-color: #fff;`;

    button.style.marginTop = "5px";
    label.style.marginLeft = "3px";

    select.before(label);
}

function getElementsForQuickLoginAction() {
     return {specialInputs: true};
}

function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    if ( insertPassword === false || !login || !password ) {
        return;
    }
    const url = 'https://tury.magput.ru/agent/?id=2';
    sendMessageToAddon('basic auth request', {login, password, url})
}

addAddonMessageListener('basic auth request result', (result) => {
    if ( result.auth === true ) {
        window.location.href = result.url
    } else {
        createQuickLoginPopup(null, null, 'alert', `Authentication failed.`);
    }
});