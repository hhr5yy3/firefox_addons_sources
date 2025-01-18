document.addEventListener("DOMContentLoaded", loadPopUp);

async function loadPopUp() {
    try {
        let config = await getConfig();

        if (config.lastCheck === 0) {
            if (await restoreOldConfig()) {
                config = await getConfig();
            }
        }

        let recentPositive = checkRecentPositive(config);

        document.getElementById('infoParagraphDiv').style.display = 'none';

        fillTextStrings(config, recentPositive);

        if (config.active === false) {
            setDisabledIcon();
        } else if (config.error !== 0) {
            setDisconIcon();
        } else {
            setEnabledIcon();
        }

        chrome.notifications.clear('positiveCheck');

        // Abre la ventana de configuracion en una nueva pestaña
        clickOnElementOpenTab('openConfigurationTab', true, 'configuration.html');

        // Abre la ventana de informacion sobre el servicio
        clickOnElementOpenTab('openInformationTab', false, chrome.i18n.getMessage('msg_URL_information'));

        // Abre la ventana del registro historico completo
        clickOnElementOpenTab('openFullHistoricalRecordTab', true, 'fullHistoricalRecord.html');

        // Muestra/Oculta la informacion extendida
        if (config.error === 0 && config.active === true) {
            document.getElementById('msg_extended_info').addEventListener('click', () => {
                changeExtendedInfoVisibility();
            });
        } else {
            document.getElementById('extendedInfoParagraph').style.display = 'none';
        }

        //Abre la ventana de configuración desde enlace cuando está desactivado. Sólo en Firefox.
        if (isFirefox() && config.active === false) {
            clickOnElementOpenTab('configurationLink', true, 'configuration.html');
        }

        //Se establece el color del fondo del parrafo de informacion.
        setBoxBackgroundColor(config, recentPositive);

        //Se rellena la tabla de registros historicos.
        injectTableHTML(config.historicalRecords, 5, 'tableHistoricalRecord');

        //Se muestra y mueve la información del 017 si es necesario
        setDivInformacion017(config);

    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Función que crea un evento click para abrir nuevas pestañas para los elementos necesarios.
 */
function clickOnElementOpenTab(idElement, isInternal, url) {
    document.getElementById(idElement).addEventListener('click', () => {
        openNewTab(isInternal, url);
    });
}

/**
 * Change background color and image of frame in function of last check result.
 * @param {*} config extension config
 * @param {*} recentPositive if last positive have less than one week
 */
function setBoxBackgroundColor(config, recentPositive) {
    try {
        let cssClass = '';
        let image = '';

        if (config.active === false) {
            cssClass = 'darkGrayBackground';
            image = 'images/disabled_service.png';
        } else if (config.error !== 0) {
            cssClass = 'yellowBackground';
            image = 'images/connectionError_check.png';
        } else if (config.lastPositive === true) {
            cssClass = 'redBackground';
            image = 'images/positive_check.png';
        } else if (recentPositive === true) {
            cssClass = 'orangeBackground';
            image = 'images/negative_check2.png';
        } else {
            cssClass = 'greenBackground';
            image = 'images/negative_check.png';
        }

        document.getElementById('currentStatusDiv').classList.add('optionBoxPopup', cssClass);
        document.getElementById('checkResultIcon').src = image;
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/*
 * Función que abre una nueva pestaña del chrome con la URL que se le pase como parametro.
 */
function openNewTab(internal, url) {
    try {
        let fullURL = url;

        if (internal) {
            fullURL = chrome.runtime.getURL(url);
        }
        // Se comprueba si ya existe esa página en alguna pesataña
        chrome.tabs.query({ currentWindow: true, url: [fullURL] }, (tabs) => {
            if (tabs.length > 0) {
                tabs.forEach(tab => {
                    chrome.tabs.update(tabs[0].id, { active: true });
                    chrome.tabs.reload(tabs[0].id, {});
                });
                window.close();
            } else {
                chrome.tabs.create({ 'url': url });
                if (isFirefox()) {
                    window.close();
                }
            }
        });
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Función que oculta/muestra el DIV de la informacion extendida del popup.
 */
function changeExtendedInfoVisibility() {
    try {
        let infoParagraphDiv = document.getElementById('infoParagraphDiv');

        if (infoParagraphDiv.style.display === 'none') {
            infoParagraphDiv.style.display = 'block';
        } else {
            infoParagraphDiv.style.display = 'none';
        }
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Función que rellena los label del HTML en funcion del idioma configurado en
 * Google Chrome.
 */
function fillTextStrings(config, recentPositive) {
    try {
        document.querySelector('title').textContent = chrome.i18n.getMessage('msg_html_title');
        setMessage('popup_description');
        setMessage('service_info');

        if (config.lastCheck === 0) {
            document.getElementById('lastCheckParagraph').style.display = 'none';
        } else {
            let msg_last_check = chrome.i18n.getMessage('msg_last_check');
            msg_last_check = msg_last_check.replace('[hh:mm]', getFormatedTime(config.lastCheck));
            msg_last_check = msg_last_check.replace('[dd/mm/aaaa]', getFormatedDate(config.lastCheck));
            setHtml('msg_last_check', msg_last_check);
        }

        let msgCheckResult = '';
        if (config.active === false) {
            // Si el usuario tiene el servicio desactivado, no se muestra información sobre chequeos
            document.getElementById('msg_checkResult_message').classList.add('bold');
            if (isFirefox()) {
                msgCheckResult = chrome.i18n.getMessage('msg_service_disabled_firefox');
            } else {
                msgCheckResult = chrome.i18n.getMessage('msg_service_disabled');
            }
        } else if (config.error === 2) {
            // si hay error por ip extranjera
            msgCheckResult = chrome.i18n.getMessage('msg_not_supported_ip_error');
        } else if (config.error !== 0) {
            msgCheckResult = chrome.i18n.getMessage('msg_connection_error');
        } else if (config.lastPositive === true) {
            // si el chequeo ha sido positivo
            let positive_check = chrome.i18n.getMessage('msg_positive_check');
            positive_check = positive_check.replace('xxx.xxx.xxx.xxx', config.currentIP);
            msgCheckResult = positive_check;
        } else if (recentPositive === true) {
            // Si ha habido un positivo reciente
            let recent_positive = chrome.i18n.getMessage('msg_recent_positive');
            recent_positive = recent_positive.replace('xxx.xxx.xxx.xxx', config.currentIP);
            msgCheckResult = recent_positive;
        } else if (config.lastCheck === 0) {
            // Si no hay información de chequeos
            msgCheckResult = chrome.i18n.getMessage('msg_no_check_info');
            document.getElementById('extendedInfoParagraph').style.display = 'none';
        } else {
            // Si ha sido negativo el chequeo
            let negative_check = chrome.i18n.getMessage('msg_negative_check');
            negative_check = negative_check.replace('xxx.xxx.xxx.xxx', config.currentIP);
            msgCheckResult = negative_check;
            document.getElementById('extendedInfo1').style.display = 'none';
        }
        setHtml('msg_checkResult_message', msgCheckResult);

        setMessage('date');
        setMessage('your_ip');
        setMessage('botnets');
        setMessage('SSOO');
        setMessage('disinfect_links');
        setMessage('survey_text');
        setMessage('popup_conditions');
        setMessage('configuration');
        setMessage('extended_info');
        setMessage('extended_info_text1');
        setMessage('extended_info_text2');
        setMessage('full_historical_record_link');
        setMessage('historical_record_title');
        setMessage('017_text');

        //Ponemos el texto si es Firefox. Por defecto queda el texto para Chrome.
        if (isFirefox()) {
            setMessage('popup_INTECO_text', 'popup_INTECO_text_firefox');
        } else {
            setMessage('popup_INTECO_text');
        }
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Función que mueve la información del 017 si el resultado es positivo.
 */
function setDivInformacion017(config) {
    try {
        if (config.lastPositive === true) {
            document.getElementById('divInfo017').insertAfter(document.getElementById('currentStatusDiv'));
        }
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

