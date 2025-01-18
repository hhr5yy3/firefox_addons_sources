async function pasteLoginAndPassword({login, password, insertPassword}) {
    const {
        usernameInp, passwordInp, loginBtn, event, specialInputs, eventsDelay, notHideInputs, isReact
    } = getElementsForQuickLoginAction();

    if ( usernameInp && insertPassword === false ) {
        usernameInp.value = login;
        return;
    }

    if ( !passwordInp ) {
        return;
    }

    setInputsValue(usernameInp, passwordInp, login, password, notHideInputs, isReact);

    if ( event ) {
        simulateEvent(usernameInp, event);
        if ( eventsDelay ) {
            await waitingFor(() => null, 2, eventsDelay)
        }
        simulateEvent(passwordInp, event);
        if ( eventsDelay ) {
            await waitingFor(() => null, 2, eventsDelay)
        }
    }
    if ( loginBtn ) {
        loginBtn.click();
         clearInputsValue(usernameInp, passwordInp, loginBtn);
    }
}

function clearInputsValue(usernameInp, passwordInp, loginBtn) {
    usernameInp.type = "text";
    passwordInp.type = "password";
    usernameInp.value = "";
    passwordInp.value = "";
        setTimeout(() => {
            loginBtn.click();
        }, 200);
    setTimeout(() => {
        usernameInp.value = "";
        passwordInp.value = "";
    }, 400);

}
