function injectAutoLoginSelect(logins, manager, opts) {
    const table = document.querySelector('.userlogincontainer table tbody');
    if ( !table || table.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    const submitBtn = table.querySelector("#ctl00_ContentPlaceHolder1_GirisBtn");
    if ( !submitBtn ) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    const newTr = document.createElement("tr");
    const newTd = document.createElement("td");
    newTr.append(newTd, wrapper);
    button.onmouseover = (event)=> event.target.classList.add("dxbButtonHover_Coral");
    button.onmouseover = (event)=> event.target.classList.add("dxbButtonHover_Sunmar");

    button.onmouseout = (event)=> event.target.classList.remove("dxbButtonHover_Coral");
     button.onmouseout = (event)=> event.target.classList.remove("dxbButtonHover_Sunmar");
    button.classList.add("dxbButton_Coral", "dxbButton_Sunmar");
    button.style.height = "27px";
    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";
    label.style.fontSize = "9px";
    select.before(label);
    table.append(newTr);
}

function getElementsForQuickLoginAction() {
    const container = document.querySelector('.userlogincontainer');
    const usernameInp = container.querySelector('#ctl00_ContentPlaceHolder1_UserName input');
    const passwordInp = container.querySelector('#ctl00_ContentPlaceHolder1_UserPassword input');
    const loginBtn = container.querySelector('#ctl00_ContentPlaceHolder1_GirisBtn');
    return {usernameInp, passwordInp, loginBtn}
}
