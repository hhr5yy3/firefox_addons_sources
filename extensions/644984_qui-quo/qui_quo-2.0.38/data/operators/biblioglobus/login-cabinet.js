function injectAutoLoginSelect(logins, manager, opts) {
    const panel = document.querySelector('.site-header__wrap .header-panel__menu_left, table.ib_support tr');
    if ( !panel || document.querySelector(".qq-quick-login-btn") || document.querySelector('a[href="/personal.jsp?action=passchange"]') ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    wrapper.style.display = "inline-flex";
    wrapper.style.marginBottom = "10px";
    if ( panel.classList.contains("header-panel__menu_left") ) {
        panel.after(wrapper);
        wrapper.style.marginLeft = "40px";
    } else {
        panel.append(wrapper);
    }

    button.style.cssText = `
    width: 100%;
    max-width: 100%;
    background: #ff5f00;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border: none;
    margin-top: 15px`;

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
    if ( getBrowserVersion().match(/firefox/i) ) {
        const url = `https://${encodeURIComponent(login.trim())}:${encodeURIComponent(password.trim())}@${location.host}/personal.jsp`
        return window.location.assign(url+`?qq_pass=true`);
    }

    const url = 'https://www.bgoperator.ru/personal.jsp';
    const xhr = new XMLHttpRequest();
    xhr.open("get", url, true, login.trim(), password.trim());
    xhr.send("");
    xhr.onload = function () {
        if ( xhr.status === 200 ) {
            if ( getBrowserVersion().match(/firefox/i) ) {
                return window.location.assign(`https://${login.trim()}:${password.trim()}@${location.host}/personal.jsp?qq_pass=true`);
            }
            window.location.href = url;
        } else {
            createQuickLoginPopup(null, null, 'alert', ` Authentication failed.`);
        }
    };
}
if ( location.search.match(/qq_pass=true/) ) {
    location.href = `https://${location.host}/personal.jsp`
}
