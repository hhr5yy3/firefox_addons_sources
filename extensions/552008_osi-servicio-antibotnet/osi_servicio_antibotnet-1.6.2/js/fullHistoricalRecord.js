document.addEventListener("DOMContentLoaded", loadHistory);

async function loadHistory() {
    try {
        let config = await getConfig();

        fillTextStrings();
        injectTableHTML(config.historicalRecords, config.historicalRecords.length, 'tableHistoricalRecord', true);

        // Boton borrar historial
        for (let item of document.getElementsByClassName('deleteHistoricalRecords')) {
            item.addEventListener('click', () => {
                manageHistoricalRecord(config);
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
 * Función que gestiona la opcion de borrado del historico.
 */
function manageHistoricalRecord(config) {
    try {
        let confirmAnswer = confirm(chrome.i18n.getMessage('msg_confirm'));
        if (confirmAnswer) {
            config.historicalRecords = [];
            config.lastPositive = false;
            config.lastCheck = 0;
            config.error = 0;

            updateConfig(config).then(() => {
                if (config.active === false) {
                    setDisabledIcon();
                } else {
                    setEnabledIcon();
                }
                window.location.reload();
            });
        }
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Función que rellena los label del HTML en funcion del idioma configurado en
 * Google Chrome.
 */
function fillTextStrings() {
    try {
        document.querySelector('title').textContent = chrome.i18n.getMessage('msg_html_title');
        document.getElementById('logoOSI').attributes['title'] = chrome.i18n.getMessage('msg_OSI');
        setMessage('full_historical_record');
        setMessage('empty_historical_record1', 'empty_historical_record');
        setMessage('empty_historical_record2', 'empty_historical_record');
        setMessage('date');
        setMessage('your_ip');
        setMessage('botnets');
        setMessage('SSOO');
        setMessage('disinfect_links');
        setMessage('close_historical_record_tab');
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}
