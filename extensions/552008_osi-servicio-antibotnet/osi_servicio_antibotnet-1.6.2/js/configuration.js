document.addEventListener("DOMContentLoaded", loadConfiguration);

async function loadConfiguration() {
    try {
        let config = await getConfig();

        fillTextStrings();
        checkActive(config.active);
        checkInterval(config.interval);

        // Radiobuttons del servicio de chequeo de IP
        for (let item of document.querySelectorAll('input[type=radio][name=radioIPChecker]')) {
            item.addEventListener('click', () => {
                manageActive(config);
            });
        }

        // Radiobuttons del intervalo de chequeo
        for (let item of document.querySelectorAll('input[type=radio][name=radioCheckInterval]')) {
            item.addEventListener('click', () => {
                manageInterval(config);
            });
        }

        // Boton cerrar pestaña
        document.getElementById('closeTab').addEventListener('click', () => {
            closeCurrentTab();
        });
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Función para seleccionar el radiobutton en funcion al dato almacenado.
 */
function checkActive(active) {
    try {
        if (active === true) {
            document.querySelector('input[type=radio][name=radioIPChecker][value="enabled"]').checked = true;
        } else {
            document.querySelector('input[type=radio][name=radioIPChecker][value="disabled"]').checked = true;
        }
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Función que modifica la variable (Activar/Desactivar el servicio)
 */
function manageActive(config) {
    try {

        let checked = document.querySelector('input[type=radio][name=radioIPChecker]:checked');
        if (typeof checked !== 'undefined' && typeof checked.value !== 'undefined' && (checked.value === 'enabled' || checked.value === 'disabled')) {
            config.active = checked.value === 'enabled' ? true : false;
            checkService(config.active, config.interval, config.lastCheck);
            updateConfig(config);
        }
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Función para seleccionar el radiobutton de intervalo almacenado.
 */
function checkInterval(interval) {
    try {
        interval = checkIntervalMinutes(interval);
        document.querySelector('input[type=radio][name=radioCheckInterval][value="' + interval + '"]').checked = true;
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Función que modifica la variable (intervalo de chequeo) almacenada en funcion
 * de la seleccion que haga el usuario.
 */
function manageInterval(config) {
    try {
        let checked = document.querySelector('input[type=radio][name=radioCheckInterval]:checked');
        if (typeof checked !== 'undefined' && typeof checked.value !== 'undefined') {
            config.interval = parseInt(checked.value);
            checkService(config.active, config.interval, config.lastCheck);
            updateConfig(config);
        }
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Función que rellena los label del HTML en funcion del idioma configurado en
 * el navegador correspondiente.
 */
function fillTextStrings() {
    try {
        document.querySelectorAll('title').textContent = chrome.i18n.getMessage('msg_html_title');
        document.getElementById('logoOSI').attributes['title'] = chrome.i18n.getMessage('msg_OSI');
        setMessage('ip_checker');

        //Ponemos el texto si es Firefox. Por defecto queda el texto para Chrome.
        if (isFirefox()) {
            setMessage('ip_checker_explanation', 'ip_checker_explanation_firefox');
        } else {
            setMessage('ip_checker_explanation');
        }

        setMessage('enabled');
        setMessage('disabled');
        setMessage('check_interval');
        setMessage('check_interval_explanation');
        setHtml('msg_minutes_opc1', '15 ' + chrome.i18n.getMessage('msg_minutes'));
        setHtml('msg_minutes_opc2', '30 ' + chrome.i18n.getMessage('msg_minutes'));
        setHtml('msg_hour_opc3', '1 ' + chrome.i18n.getMessage('msg_hourLowercase'));
        setMessage('INTECO_text1');
        setMessage('INTECO_text2');
        setMessage('close_configuration_tab');
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}