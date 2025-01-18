const configKey = 'CAB';
const defaultConfig = {
    active: true,
    interval: 15,
    lastCheck: 0,
    lastPositive: false,
    currentIP: '',
    error: 0,
    historicalRecords: []
}

/**
 * Restaura la configuración del local storage en el storage de plugins
 * 
 * @returns true si se restaura, false en otros casos
 */
async function restoreOldConfig() {
    try {
        let localStorage = window.localStorage;

        if (localStorage.getItem("IPChecker") !== null && localStorage.getItem("IPChecker") != 'null' && localStorage.getItem("IPChecker") != undefined) {
            let historicalRecords = [];
            let lastCheck = localStorage.getItem("lastCheckDate") + ' ' + localStorage.getItem("lastCheckHour");

            if (localStorage.getItem("historicalRecord") !== '') {
                let historicalRecordsOld = JSON.parse(localStorage.getItem("historicalRecord"));

                for (let historicalRecordOld of historicalRecordsOld) {
                    historicalRecords.push(
                        {
                            date: getDateFromString(historicalRecordOld[0] + ' ' + historicalRecordOld[1]),
                            ip: historicalRecordOld[2],
                            threat: historicalRecordOld[3],
                            os: historicalRecordOld[4],
                            url: historicalRecordOld[5],
                            description: historicalRecordOld[6]
                        }
                    );
                }
            }

            let config = {
                active: localStorage.getItem("IPChecker") === 'enabled' ? true : false,
                interval: parseInt(localStorage.getItem("checkIntervalMinutes")),
                lastCheck: getDateFromString(lastCheck),
                lastPositive: localStorage.getItem("lastPositiveCheckInfo") !== '' ? true : false,
                currentIP: localStorage.getItem("currentIP"),
                error: parseInt(localStorage.getItem("error")),
                historicalRecords: historicalRecords
            }

            await updateConfig(config);

            localStorage.removeItem("IPChecker");
            localStorage.removeItem("checkIntervalMinutes");
            localStorage.removeItem("lastCheckDate");
            localStorage.removeItem("lastCheckHour");
            localStorage.removeItem("lastPositiveCheckInfo");
            localStorage.removeItem("currentIP");
            localStorage.removeItem("error");
            localStorage.removeItem("historicalRecord");

            return true;
        }
    } catch (error) {
        console.log(error)
    }

    return false;
}

/**
 * Obtiene la configuración almacenada para el plugin,
 * y antes de devolverla limpia los registros, valida la ip y 
 * valida el intervalo
 * 
 * @returns Configuración validada
 */
async function getConfig() {
    let config = await getStorageValues(configKey);

    if (typeof config === 'undefined' || Object.keys(config).length === 0) {
        config = defaultConfig;
    }

    if (!checkFormatHistoricalRecord(config.historicalRecords)) {
        config.historicalRecords = [];
        config.lastPositive= false;
        console.log(chrome.i18n.getMessage('msg_storage_data_validation_error'));
    }

    if(!checkFormatIp(config.currentIP)){
        config.currentIP = '';
    }

    config.interval = checkIntervalMinutes(config.interval);

    return config;
}

/**
 * Guarda la configuración en el almacenamiento local restringido
 * 
 * @param {Object} config Configuración a guardar
 */
async function updateConfig(config) {
    setStorageValues({ [configKey]: config });
}

/**
 * Obtiene la configuración del almacenamiento local restringido
 * 
 * @returns Configuración
 */
function getStorage() {
    if (isChrome() || chrome != undefined) {
        return chrome.storage.local;
    } else {
        return browser.storage.local;
    }
}

/**
 * Obtiene un valor del almacenamiento local restringido
 * 
 * @param {String} key Clave a buscar
 * 
 * @returns Promesa de acceso al almacenamiento
 */
async function getStorageValues(key) {
    return new Promise((resolve, reject) => {
        try {
            getStorage().get(key, (values) => {
                resolve(values[key]);
            });
        } catch (ex) {
            reject(ex);
        }
    });
}

/**
 * Guarda un valor en el almacenamiento local restringido
 * 
 * @param {Object} data Datos a guardar
 */
function setStorageValues(data) {
    return new Promise((resolve, reject) => {
        try {
            getStorage().set(data, () => {
                resolve();
            });
        } catch (ex) {
            reject(ex);
        }
    });
}