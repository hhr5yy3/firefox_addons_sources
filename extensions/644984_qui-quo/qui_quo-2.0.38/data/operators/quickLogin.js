console.log("quick login activated!");


addAddonMessageListener("password response", async (data) => {
    if ( data.isActive === false ) {
        await pasteLoginAndPassword(Object.assign(data, {insertPassword: false}));
        createQuickLoginPopup(null, null, "alert", data.inactivityReason || 'Нет описания');
        return;
    }

    if ( !data.passObj ) {
        createQuickLoginPopup(null, null, 'alert', `Неизвестная ошибка!`);
        return;
    }

    if ( data.passObj.error ) {
        createQuickLoginPopup(null, null, 'alert', `${data.passObj.text}`);
        return;
    }
    if ( data.passObj.isUserSalted ) {
        data.userSalt ? decryptAndPastePassword(data, data.userSalt) : createQuickLoginPopup(data.passObj.password, data, 'promt');
        return;
    }
    decryptAndPastePassword(data, (data.passObj && data.passObj.id) || AGENCY_ID);
});

async function decryptAndPastePassword(data, salt) {
    const password = window.crypto.subtle ? await decrypt(data.passObj.password, `resolve${salt}`)
                                          : await decryptFromBackground('decrypt password', {password: data.passObj.password, salt: `resolve${salt}`});

    pasteLoginAndPassword(Object.assign(data, {password: password}));
}

sendMessageToAddon("get quick login init data", getHostname()).then(data => {
    if ( data ) {
        window.AGENCY_ID = data.agencyId;
        window.CANNOT_MAKE_QUOTE = data.cannotMakeQuote;
        const logins = data.logins;
        const quickLoginStatus = {
            isActive: data['isActive'],
            inactivityReason: data['inactivityReason'],
            isTutorial: logins.length === 0
        };
        const manager = data.currentManager;
        startInjectingAutoLoginSelect(logins, manager, quickLoginStatus);
    }
});


function getHostname() {
    if ( typeof getHostnameModule === 'function') {
        return getHostnameModule()
    }
    const host = window.qqIframeHost || window.location.hostname;
    if ( host === 'agencybooking.coral.ru' ) {
        return 'coralagency.ru';
    }
    return host;
}

function createQuickLoginSelect(logins, manager) {
    const select = document.createElement("select");
    if ( logins.length > 0 ) {
        select.classList.add("qq-quick-login-select");
        for (const login of logins) {
            const option = document.createElement("option");
            option.id = login.id;
            option.value = login.login;
            if (login["managers"] && login["managers"].length > 0 && login["managers"].includes(+manager)) {
                option.setAttribute("managerId", manager);
            }
            option.textContent = login.description || login.login;
            select.appendChild(option);
        }
        setDefaultSelectedOption(select)
        if (manager) {
            const optionManager = select.querySelector(`[managerId="${manager}"]`);
            if ( optionManager ) {
                optionManager.selected = true;
            }
        }
    }
    return select;
}

function setDefaultSelectedOption(select) {
    const selectedId = localStorage.getItem("quickLoginLastSelected");
    if ( selectedId ) {
        const foundOption = Array.from(select.options).find(option => option.id === selectedId);
        if ( foundOption ) {
            foundOption.selected = true;
        } else {
            select.options[0].selected = true;
        }
    } else {
        select.options[0].selected = true;
    }
}


function quickLoginButton(quickLoginStatus) {
    const button = document.createElement("button");
    const a = document.createElement("a");
    a.href = `https://${window.AGENCY_DOMAIN}/agency/quicklogin-passwords?hostname=${getHostname()}`;
    a.target = '_blank';
    a.style.cssText = `font-size: 12px;
                       margin-left: 3px;`;
    a.innerHTML = 'Настроить пароли в ЛК <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo';
    button.classList.add('qq-quick-login-btn');
    if (quickLoginStatus.isTutorial) {
        button.textContent = "Как войти с помощью Qui-Quo?";
        button.style.minWidth = '230px';
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            window.open('https://help.qui-quo.support/support/solutions/articles/35000156163')
        });
        return {button, a};
    }

    button.textContent = "Войти с помощью Qui-Quo";
    button.addEventListener("click", (event) => loginAction(event, quickLoginStatus));
    return {button, a};
}

function startInjectingAutoLoginSelect(logins, manager, quickLoginStatus) {
    if ( isNewVersionLoaded() ) {
        return;
    }
    try {
        injectAutoLoginSelect(logins, manager, quickLoginStatus);
        injectStyleSheet(document);
        window.setTimeout(()=> startInjectingAutoLoginSelect(logins, manager, quickLoginStatus), 1000);
    } catch (e) {
       console.log(e)
    }
}

function createAutoLoginWrapper(logins, manager, quickLoginStatus) {
    const wrapper = document.createElement("div");
    const {button, a} = quickLoginButton(quickLoginStatus);
    const select = createQuickLoginSelect(logins, manager);
    const label = document.createElement("span");

    label.innerHTML = "Логин для входа с помощью <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo: ";

    wrapper.classList.add("qq-auto-login-wrapper");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.margin = "2.5px 0px";
    wrapper.append(button, select, a);

    select.style.marginTop = "5px";
    if (quickLoginStatus.isTutorial) {
       setTutorialStyles([select, label])
    }
    return {wrapper, button, select, label, a}
}

function setTutorialStyles(elements) {
    for (const elem of elements) {
        elem.style.display = "none";
        elem.style.height = "0";
        elem.style.width = "0";
        elem.style.opacity = "0";
    }
}

function loginAction(event, quickLoginStatus) {
    event.preventDefault();
    event.stopPropagation();
    const wrapper = event.target.closest('.qq-auto-login-wrapper');
    const select = (wrapper || document).querySelector(".qq-quick-login-select");
    const option = selectedOption(select, false);
    if ( select && option ) {
        const login = option.getAttribute("value");
        const id = option.getAttribute("id");
        if ( id && login ) {
            sendMessageToAddon("get password by id", {id, login, isActive: quickLoginStatus.isActive, inactivityReason: quickLoginStatus.inactivityReason});
            localStorage.setItem("quickLoginLastSelected", option.id);
        }
    }
}


function setInputsValue(usernameInp, passwordInp, login, password, notHideInputs, isReact = true) {
    console.log({usernameInp, passwordInp, login, password})

    if ( usernameInp ) {
        usernameInp.value = login.trim();
        usernameInp.setAttribute("readonly", "");
        setReactInputValue(usernameInp, login.trim());
        setReactInputValueKeyBoard(usernameInp, login.trim());
        if ( !notHideInputs && !window.notHideInputs ) {
            usernameInp.type = "hidden";

        }
    }
    if ( passwordInp ) {
        passwordInp.value = password.trim();
        passwordInp.setAttribute("readonly", "");
        if ( isReact ) {
            setReactInputValue(passwordInp, password.trim());
            setReactInputValueKeyBoard(passwordInp, password.trim());
        }
        if ( !notHideInputs && !window.notHideInputs ) {
            passwordInp.type = "hidden";
        }
    }
}

function clearInputsValue(usernameInp, passwordInp) {
    if ( window.isQuickLoginAsyncFormAction !== true ) { //For asynchronously submitted forms isQuickLoginAsyncFormAction === true
        setInputsValue(usernameInp, passwordInp, "скрыт", "******", false, true);
    }
    setTimeout(() => {
        setInputsValue(usernameInp, passwordInp, "скрыт", "******", false, true);
        usernameInp.value = "скрыт";
        passwordInp.value = "******";
        usernameInp.type = "text";
        passwordInp.type = "password";
    }, 100)

}

function setClickedButton(event) {
    clickedButton = event.target;
}

initVersionChecker();

async function pasteLoginAndPassword({login, password, insertPassword}) {
    const {form, usernameInp, passwordInp, loginBtn, event, specialInputs, eventsDelay, notHideInputs, isReact, loginFunction} = getElementsForQuickLoginAction();
    if ( specialInputs === true ) {
        pasteSpecialLoginAndPassword({login, password, insertPassword});
        return;
    }

    if ( typeof loginFunction !== 'undefined') {
        return loginFunction(login, password);
    }

    if ( usernameInp && insertPassword === false ) {
        usernameInp.value = login;
        return;
    }

    // if ( !passwordInp ) {
    //     return;
    // }

    setInputsValue(usernameInp, passwordInp, login, password, notHideInputs, isReact);

    if ( event ) {
        simulateEvent(usernameInp, event);
        if (eventsDelay) {
            await waitingFor(() => null, 2, eventsDelay)
        }
        simulateEvent(passwordInp, event);
        if (eventsDelay) {
            await waitingFor(() => null, 2, eventsDelay)
        }
    }
    if ( loginBtn ) {
        loginBtn.removeAttribute('disabled');
        setTimeout(()=> {
            loginBtn.click()
            clearInputsValue(usernameInp, passwordInp);
        }, 100);
        return;
    }
    if ( form ) {
        form.submit();
    }
}



//---------------------------crypto functions --------------------------//
function toBase64(array) {
    let binaryString = '';
    const len = array.length;
    for ( let index = 0; index < len; index++ ) {
        binaryString += String.fromCharCode(array[index]);
    }
    return btoa(binaryString);
}

function fromBase64(string, type = Uint8Array) {
    const binaryString = atob(string);
    const len = binaryString.length;
    const bytes = new type(len);
    for ( let index = 0; index < len; index++ ) {
        bytes[index] = binaryString.charCodeAt(index);
    }
    return bytes;
}

async function decrypt(string, salt, iv) {
    try {
        const rawKey = await makeKey(salt);
        const stringBytes = fromBase64(string);
        const ivBytes = new Uint8Array(16);
        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv: ivBytes,
            },
            rawKey,
            stringBytes
        );
        const resultString = new TextDecoder().decode(decrypted);
        return await checkDecryptResult(resultString, salt, string) ? resultString : null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function checkDecryptResult(resultString, salt, stringForDecrypt) {
    const encrypted = await encrypt(resultString, salt);
    const encryptedString = toBase64(encrypted);
    return stringForDecrypt === encryptedString;
}

async function makeKey(password) {
    return await window.crypto.subtle.importKey(
        'raw',
        await makeSha256(password),
        'AES-CBC',
        true, ['decrypt', 'encrypt']
    );
}

async function makeSha256(string) {
    const strUint8 = new TextEncoder().encode(string);
    const hash = await crypto.subtle.digest('SHA-256', strUint8);
    return hash;
}

async function encrypt(text, salt, iv) {
    const rawKey = await makeKey(salt);
    const stringBytes = new TextEncoder().encode(text);
    const ivBytes = new Uint8Array(16);
    if ( iv ) {
        setArrayString(ivBytes, iv);
    }
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: 'AES-CBC',
            iv: ivBytes,
        },
        rawKey,
        stringBytes
    );
    return new Uint8Array(encrypted);
}

function setArrayString(array, string) {
    const encoder = new TextEncoder();
    array.set(encoder.encode(string));
    return array;
}

//----------------------password salt window ------------------------------//
function createQuickLoginPopup(password, data, type = "alert", text = "Ошибка!") {
    const oldIframe = document.querySelector('iframe.qq-popup-user-salt-block');
    if ( oldIframe ) {
        oldIframe.remove();
    }
    const backgroundDiv = document.createElement("div");
    const wrapper = document.createElement("div");
    const header = createQuickLoginPopupHeader();
    const iframe = createQuickLoginIframe();

    backgroundDiv.setAttribute('tabindex', '-1');
    backgroundDiv.classList.add('qq-quicklogin-popup-background');
    iframe.style.transition = "opacity .5s linear";
    iframe.style.opacity = "0";

    wrapper.classList.add('qq-quicklogin-popup-wrapper');

    const {body, input} = type === "alert" ?  createQuickLoginAlertPopupBody(text, backgroundDiv, iframe) :
                                              createUserSaltPopupBody(password, backgroundDiv, data, iframe);
    document.body.append(iframe);
    iframe.onload = () => {
        if ( iframe.contentDocument && !iframe.contentDocument.querySelector('.qq-quicklogin-popup-background') ) {
            appendItemsToIframe();
        }
    };
    appendItemsToIframe();

    function appendItemsToIframe() {
        injectStyleSheet(iframe.contentDocument);
        appendUserSaltPopup(wrapper, header, body, backgroundDiv, iframe);
        iframe.style.opacity = "1";
        simulateEvent(input, 'focus');
        if ( input ) {
            input.focus();
            input.style.cssText = '';
        }
    }
}

function appendUserSaltPopup(mainDiv, header, body, backgroundDiv, iframe) {
    mainDiv.append(header, body);
    backgroundDiv.append(mainDiv);
    iframe.contentDocument.body.append(backgroundDiv);
}

function createQuickLoginIframe() {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        overflow: auto;
        background-color: #06060699;
        border: none;
        z-index: 999999
    `;
    iframe.classList.add('qq-popup-user-salt-block');
    return iframe;
}

function createQuickLoginPopupHeader() {
    const header = document.createElement("div");
    const logo = document.createElement("div");

    header.classList.add("qq-quicklogin-popup-header");
    logo.classList.add('qq-quicklogin-popup-logo');

    header.append(logo);
    return header;
}

function createUserSaltPopupBody(password, backgroundDiv, data, iframe) {
    const input = document.createElement("input");
    const errorText = document.createElement('div');

    input.type = 'password';
    input.style.border = '1px solid #cccccc';

    errorText.textContent = 'Неверный ключ!';
    errorText.style.cssText = `
        color:red;
        font-size: 11px;
        opacity: 0;
        margin: 2px;
    `;

    const {buttonsWrapper, okButton, cancelButton} = createUserSaltPopupButtons(input, password, iframe, errorText, data);
    attachQuickLoginPopupBackgroundEvents(backgroundDiv, okButton, cancelButton);
    const body = createQuickLoginPopupBody('Введите ключ\nдля расшифровки пароля:', [input, errorText, buttonsWrapper]);
    return {body, input};
}

function createUserSaltPopupButtons(input, password, iframe, errorText, data) {
    const buttonsWrapper = createQuickLoginPopupButtonsWrapper();
    const okButton = createQuickLoginPopupButton('Ok', 'qq-quicklogin-popup-btn-ok', () => applyUserSalt(input, password, errorText, data, iframe));
    const cancelButton = createQuickLoginPopupButton('Отмена', 'qq-quicklogin-popup-btn-cancel', () => iframe.remove());

    buttonsWrapper.append(okButton, cancelButton);
    return {buttonsWrapper, okButton, cancelButton};
}

function attachQuickLoginPopupBackgroundEvents(backgroundDiv, okButton, cancelButton) {
    backgroundDiv.addEventListener('keydown', (event) => {
        if ( event.code === 'Escape' ) {
            cancelButton.click();
            return;
        }
        if ( event.code === 'Enter' || event.code === 'NumpadEnter' ) {
            okButton.click();
        }
    });
}

function createQuickLoginPopupBody(text, appendList = []) {
    const body = document.createElement('div');
    const bodyText = document.createElement('div');
    body.style.padding = '10px';

    bodyText.innerHTML = text;
    bodyText.style.cssText = `
         text-align: center;
         margin-bottom: 5px;
    `;
    body.append(bodyText, ...appendList);
    return body;
}

function createQuickLoginPopupButtonsWrapper() {
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add("qq-quicklogin-popup-buttons-wrapper");
    return buttonsWrapper;
}

function createQuickLoginPopupButton(caption, className, eventListener) {
    const button = document.createElement('button');
    button.textContent = caption;
    button.classList.add(className);
    button.addEventListener("click", eventListener);
    return button;
}

function createQuickLoginAlertPopupBody(text, backgroundDiv, iframe) {
    const {buttonsWrapper, okButton} = createQuickLoginAlertPopupButton(iframe);
    attachQuickLoginPopupBackgroundEvents(backgroundDiv, okButton, okButton);
    const body = createQuickLoginPopupBody(text, [buttonsWrapper]);
    return {body, input: okButton};
}

function createQuickLoginAlertPopupButton(iframe) {
    const buttonsWrapper = createQuickLoginPopupButtonsWrapper();
    const okButton = createQuickLoginPopupButton('Понятно', 'qq-quicklogin-popup-btn-cancel', () => iframe.remove());

    buttonsWrapper.append(okButton);
    return {buttonsWrapper, okButton};
}

async function applyUserSalt(input, password, errorText, data, iframe) {
    errorText.style.opacity = '0';
    const userSalt = input.value;
    const decryptedPassword = window.crypto.subtle ?  await decrypt(password, `resolve${userSalt}`) :
                               await decryptFromBackground('decrypt password', {password: password, salt: `resolve${userSalt}`});
    if ( !decryptedPassword || decryptedPassword === '' ) {
        errorText.style.opacity = '1';
        input.type = "password";
        simulateEvent(input, 'focus');
        input.focus();
        return;
    }
    sendMessageToAddon('save user salt', userSalt);
    iframe.remove();
    pasteLoginAndPassword(Object.assign(data, {password: decryptedPassword}));
}

async function decryptFromBackground(type, data) {
    return sendMessageToAddon(type, {password: data.password, salt: data.salt, type: 'decrypt password'})
}
