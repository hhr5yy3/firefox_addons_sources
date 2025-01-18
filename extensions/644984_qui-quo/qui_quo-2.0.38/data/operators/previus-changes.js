function clearInputsValue(usernameInp, passwordInp) {
    if ( window.isQuickLoginAsyncFormAction !== true ) { //For asynchronously submitted forms isQuickLoginAsyncFormAction === true
        usernameInp.value = "";
        passwordInp.value = "";
    }
    setTimeout(() => {
        usernameInp.value = "";
        passwordInp.value = "";
        usernameInp.type = "text";
        passwordInp.type = "password";
    }, 1000)

}
