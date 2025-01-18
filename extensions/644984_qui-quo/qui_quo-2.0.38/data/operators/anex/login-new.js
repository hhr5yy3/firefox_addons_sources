function injectAutoLoginSelect(logins, manager, opts) {
    const loginInput = $first('input[name="login"], input[name="email"]');

    if ( loginInput ) {
        const form = loginInput.closest('form');
        const loginBtn = form.querySelector('button[type="submit"]');
        if ( !loginBtn || !getText(loginBtn).match(/войти/i) )  {
            return;
        }
        if ( !form || form.querySelector(".qq-auto-login-wrapper") ) {
            return;
        }
        const {button, wrapper, label, select} = createAutoLoginWrapper(logins, manager, opts);
        button.classList.add("button-text-purple", "h-56", "w-full", "text-16");
        button.style.width = "initial";
        label.style.marginLeft = "3px";
        label.style.marginTop = "5px";
        select.before(label);
        wrapper.style.marginTop = "1.6rem";

        select.classList.add("font-medium", "p-16", "w-full", "rounded", "text-16", "focus:border-purple", "lg:h-56", "md:h-56");
        select.style.backgroundColor = `rgb(245, 245, 250)`;
        form.append(wrapper);
    }
}

function getElementsForQuickLoginAction() {
    const usernameInp = $first('input[name="login"], input[name="email"]');
    if ( usernameInp ) {
        const form = usernameInp.closest('form');
        const loginBtn = form.querySelector('button[type="submit"]');
        const passwordInp = form.querySelector('input[name="password"]');
        const event = [];
        return {usernameInp, passwordInp, loginBtn, event, form, specialInputs: true}
    }
}


async function pasteSpecialLoginAndPassword({login, password, insertPassword}) {
    const {form, usernameInp, passwordInp, loginBtn} = getElementsForQuickLoginAction();

    if ( !loginBtn && !form ) {
        return;
    }

    // Создаем клоны для фейковых полей
    const fakeUserInput = usernameInp.cloneNode(true);
    const fakePassInput = passwordInp.cloneNode(true);

    try {
        // Эмулируем ввод логина
        usernameInp.focus();
        usernameInp.value = login;
        usernameInp.dispatchEvent(new Event('input', {bubbles: true}));
        usernameInp.dispatchEvent(new Event('change', {bubbles: true}));
        usernameInp.blur();

        // Эмулируем ввод пароля
        passwordInp.focus();
        passwordInp.value = password;
        passwordInp.dispatchEvent(new Event('input', {bubbles: true}));
        passwordInp.dispatchEvent(new Event('change', {bubbles: true}));
        passwordInp.blur();

        // Подменяем оригинальные поля на фейковые
        usernameInp.after(fakeUserInput);
        passwordInp.after(fakePassInput);

        // Скрываем оригинальные поля
        usernameInp.type = 'hidden';
        passwordInp.type = 'hidden';

        // Настраиваем фейковые поля
        fakeUserInput.value = '••••••••';
        fakePassInput.value = '••••••••';
        fakeUserInput.setAttribute('readonly', '');
        fakePassInput.setAttribute('readonly', '');

        // Даем время на обработку событий
        await new Promise(resolve => setTimeout(resolve, 50));

        // Отправляем форму
        loginBtn ? loginBtn.click() : form.submit();

        // Очищаем данные
        const cleanup = () => {
            // Заполняем случайными значениями
            usernameInp.value = 'temp_' + Math.random();
            passwordInp.value = 'temp_' + Math.random();

            // Показываем замаскированные значения
            fakeUserInput.value = 'скрыт';
            fakePassInput.value = '******';
        };

        setTimeout(cleanup, 0);
        setTimeout(cleanup, 100);
        requestAnimationFrame(cleanup);

    } catch (error) {
        console.error('Ошибка при автоматическом входе:', error);
        // Возвращаем исходное состояние в случае ошибки
        fakeUserInput.remove();
        fakePassInput.remove();
        usernameInp.type = 'text';
        passwordInp.type = 'password';
    }
}
