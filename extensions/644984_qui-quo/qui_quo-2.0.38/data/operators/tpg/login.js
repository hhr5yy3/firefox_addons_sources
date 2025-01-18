function injectAutoLoginSelect(logins, manager, quickLoginStatus) {
    const form = document.querySelector('#top_login');
    if ( !form || form.querySelector(".qq-quick-login-btn") ) {
        return;
    }
    let {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, quickLoginStatus);

    button.remove();
    label.remove();

    const selectWrap =  createSelectWrapper(select);
    const customButton = createCustomButton();

    wrapper.style.display = "block";
    wrapper.append(customButton);
    wrapper.append(selectWrap);
    form.append(wrapper);
    customButton.addEventListener("click",(event)  => loginAction(event, quickLoginStatus));
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#top_login');
    const usernameInp = form.querySelector('input#authoriz_login');
    const passwordInp = form.querySelector('input#authoriz_password');
    const loginBtn = form.querySelector('#login_me');
    return {usernameInp, passwordInp, loginBtn}
}

function createSelectWrapper(select) {
    const selectWrap = document.createElement("div");
    const selectContainer = document.createElement("div");
    const arrow = document.createElement("span");

    arrow.classList.add("select_pic");
    selectWrap.classList.add("select_wrap");
    selectWrap.style.margin = "5px 10px";

    selectContainer.classList.add("select_container");
    selectContainer.textContent = selectedOption(select);
    selectContainer.style.textAlign = "center";
    selectContainer.style.lineHeight = "30px";

    select.classList.add("stylish_select", "select", "work");


    selectWrap.append(selectContainer);
    selectContainer.append(arrow, select);
    select.addEventListener("change", (e) => {
        selectContainer.firstChild.textContent = selectedOption(e.target);
    });
    return selectWrap;
}

function createCustomButton() {
    const button = document.createElement("div");
    button.classList.add("form_btn", "qq-quick-login-btn");
    button.textContent = "Войти с помощью Qui-Quo";
    button.style.marginRight = "25px";
    return button;
}