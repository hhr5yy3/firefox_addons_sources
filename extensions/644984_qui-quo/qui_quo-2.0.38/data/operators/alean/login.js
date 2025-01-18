function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('.cabinetLogin form, .bookingTourists-contentLogin form');
    if ( !form || form.querySelector(".qq-quick-login-btn") || !form.querySelector('input[ng-model="vm.account.password"], input[ng-model="vm.user.password"], input[ng-model="vm.login.password"]')) {
        if ( !form || !form.querySelector('input[ng-model="vm.account.password"], input[ng-model="vm.user.password"], input[ng-model="vm.login.password"]') ) {
            const wrapper = document.querySelector(".qq-auto-login-wrapper");
            if ( wrapper ) {
                wrapper.remove();
            }
        }
        return;
    }

    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add("btn", "btn-lg", "btn-block", "btn-danger");
    button.style.width = "initial";

    select.style.marginTop = "0px";
    label.style.marginLeft = "3px";

    select.before(label);

    wrapper.style.margin = "10px 15px 2.5px";
    wrapper.style.lineHeight = "25px";
    wrapper.style.width = "345px";
    wrapper.classList.add("cabinetLogin-control");
    if ($1('.bookingTourists-contentLoginForm button[ng-click="::vm.submitTourists()"]') ) {
        button.textContent = 'Войти с помощью Qui-Quo (Далее)'
    }
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('.cabinetLogin form, .bookingTourists-contentLogin form');
    const usernameInp = form.querySelector('input[ng-model="vm.account.login"], input[ng-model="vm.user.login"], input[ng-model="vm.login.login"]');
    const passwordInp = form.querySelector('input[ng-model="vm.account.password"], input[ng-model="vm.user.password"], input[ng-model="vm.login.password"]');
    const loginBtn = form.querySelector('button.cabinetLogin-controlBtn, button[type="submit"]') ||
        $1('.bookingTourists-contentLoginForm button[ng-click="::vm.submitTourists()"]');
    return {usernameInp, passwordInp, loginBtn, event: "change"}

}
