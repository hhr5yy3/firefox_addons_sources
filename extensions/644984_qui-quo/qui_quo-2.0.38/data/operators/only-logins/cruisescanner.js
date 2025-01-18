function setFormsStyles(form, autoLoginForm) {
    autoLoginForm.style.display = 'none';
    const a = document.createElement('a');
    a.href = "https://www.cruisescanner.ru/login/";
    a.textContent = "Перейти на страницу входа с помощью Qui-Quo";
    a.className = 'cs_auth_reg_link';
    autoLoginForm.after(a);
    form.style.minWidth = 'initial';
}