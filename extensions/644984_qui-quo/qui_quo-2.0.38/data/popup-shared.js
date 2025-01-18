function updateMangers(managers, managerId) {
    const popupContainer = $1("#popupContainer");
    const managerSelect = $1("#manager");
    resetManagerSelect(managerSelect, popupContainer)
    if ( !managers || managers.length === 0 ) {
        hideManagerSelect(popupContainer)
        return;
    }
    if ( managers.length > 0 ) {
        fillManagerSelect(managers, managerId, managerSelect)
    }

}

function disableManagerSelect(managerSelect) {
    managerSelect.style.display = 'none';
    const label = document.querySelector('label');
    if ( label ) {
        label.textContent = `Менеджер: ${selectedOption(managerSelect)}`;
    }
}

function hideManagerSelect(popupContainer) {
    popupContainer.classList.remove("with-manager");
}

function resetManagerSelect(managerSelect, popupContainer) {
    popupContainer.classList.add("with-manager");
    managerSelect.style.display = 'inline-block';
    $$('option', managerSelect).forEach(option => option.remove());
    const label = document.querySelector('label');
    if ( label ) {
        label.textContent = 'Менеджер: ';
    }
}

function fillManagerSelect(managers, managerId, managerSelect) {
    managerSelect.append(createOptionElement("none", "Не выбран"));
    managers.forEach(item => {
        managerSelect.append(createOptionElement(item.id, item.name, item.logo))
    });
    managerSelect.value = (managerId ? String(managerId) : "none");
    if ( managers.length === 1 ) {
        managerSelect.value = managers[0].id;
        disableManagerSelect(managerSelect)
    }
}

function createOptionElement(value, text, logo) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    if ( logo ) {
        option.setAttribute('logo', logo);
    }
    return option;
}

function logError(msg, e) {
    const data = {
        title: msg,
        quote: quote
    };

    if ( e != null ) {
        if ( e.stack != null )
            data.stack = e.stack;
        if ( e.message != null )
            data.title = data.title + " - " + e.message;
    }

    sendMessageToAddon("popuperror", data);
}

function handleCorruptedQuote(e) {
    logError("Failed to dispay corrupted quote", e);
    sendMessageToAddon("popupshowerrorpage");

    clearQuote();
    clearQuoteContentTable();
    closePopup();
}

document.addEventListener('copy', function (e) {
    if ( !isTestPeriod ) {
        return;
    }
    showErrorMessagePopup('Тестовый тариф!', 'Нажмите кнопку "Готово", чтобы создать подборку. Над подборкой появится панель инструментов. Нажмите на ней кнопку "Копировать", и подборка туров скопируется в буфер обмена.');
    e.preventDefault();
});

function copyQuoteToClipboard(copyText, quote) {
    try {
        copyTextToClipboard(copyText);
        sendMessageToAddon("copyText notify");
    } catch (e) {
        logError({
            title: "Failed to copy text to clipboard - " + e.message,
            quote: quote,
            stack: e.stack
        });
    }
}

function copyNewStyle(text) {
    navigator.clipboard.writeText(text)
        .then()
        .catch(err => {           console.log('Something went wrong', err)});
}

function copyOldStyle(text) {
    const copyFrom = document.createElement('textarea');
    copyFrom.textContent = text;
    const body = document.querySelector('body');
    body.append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

function attachLogonViewEvents() {
    document.querySelector("#close").onclick = function (e) {
        closePopup();
        e.preventDefault();
    };

    document.querySelector("#logon-ok").onclick = logon;

    document.querySelector("#logon-cancel").onclick = closePopup;

    document.querySelector("#agency_page").onclick = function (e) {
        openTab(`https://${AGENCY_DOMAIN}/agency`);
        e.preventDefault();
    };
    document.querySelector("#last_quotes").onclick = lastQuotesClickHandler;

    document.querySelector("#bookmarks").onclick = function (e) {
        openTab(`https://${AGENCY_DOMAIN}/agency/bookmarks`);
        e.preventDefault();
    };

    document.querySelector("#recover_password").onclick = function (e) {
        e.preventDefault();
        openTab(`https://${AGENCY_DOMAIN}/recovery`);
    };
    document.querySelector("#website_login").onclick = function (e) {
        e.preventDefault();
        openTab(`https://${AGENCY_DOMAIN}/login`);
    };
}

function attachQuoteViewEvents() {
    document.querySelector("#agency_page").onclick = function (e) {
        openTab(`https://${AGENCY_DOMAIN}/agency?agencyId=` + agencyId);
        e.preventDefault();
    };

    document.querySelector("#last_quotes").onclick = (e) => lastQuotesClickHandler(e, agencyId);

    document.querySelector("#touroperators").onclick = function (e) {
        openTab(`https://${AGENCY_DOMAIN}/agency/bookmarks?agencyId=` + agencyId);
        e.preventDefault();
    };

    document.querySelector("#bookmarks").onclick = function (e) {
        openTab(`https://${AGENCY_DOMAIN}/agency/bookmarks?agencyId=` + agencyId);
        e.preventDefault();
    };
}

function isSafariBrowser() {
    return navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
}


async function checkPermissions() {
    try {
        chrome.permissions.getAll((res) => {
            if (res && res.origins && !res.origins.some(str => str.indexOf('all_urls') !== -1 || str.indexOf('*://*/*') !== -1)) {
                if (isSafariBrowser()) {
                    $1('#permission-alert-safari').style.display = 'flex';
                } else {
                    $1('#permission-alert').style.display = 'flex';
                }
                $$('button').forEach(btn => btn.setAttribute('disabled', 'disabled'))
            }
        })
    } catch (e) {
        console.log(e);
        return null;
    }
}

function checkOptionWithPopupActive(addToursButton, postPoneButton) {
    try {
        console.log('checkOptionWithPopupActive')
        chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
            console.log({tab})
            chrome.tabs.sendMessage(tab[0].id, {type: "hasToursForPopup"}, (response) => {
                if ( response && response === true ) {
                    addToursButton.style.display = "inherit";
                    if ( postPoneButton ) {
                        postPoneButton.style.display = "none";
                    }
                }
            })
        });
    } catch (e) {
        return null;
    }

}

async function getOptionForPopup() {
    waitingPopup(true);
    chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
        chrome.tabs.sendMessage(tab[0].id, {type: "add-tours"}, response => console.log(response));
    });
}


addMessageListener("added option", function (data) {
    location.reload()
});
