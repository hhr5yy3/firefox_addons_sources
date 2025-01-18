const URL_WS_CAB = 'https://antibotnet.incibe.es/api/wscheckip/es';
const ALARM_ID = 'ipchecker_alarm';

if (chrome.alarms.onAlarm.hasListener(handleAlarm) === false) {
    chrome.alarms.onAlarm.addListener(handleAlarm);
}

/**
 * Funcion que activa  o desactiva el servicio de chequeo de IP
 * 
 * @param {Boolean} active Indica si el servicio es activado o desactivado
 * @param {Integer} interval Intervalo en minutos de comprobación de IP
 * @param {Long} lastCheck Fecha de ultima comprobación en milisegundos
 * 
 */
function checkService(active, interval, lastCheck) {
    try {
        chrome.alarms.get(ALARM_ID, (alarm) => {
            if (active === true) {
                interval = checkIntervalMinutes(interval);
                setEnabledIcon();
                let currentTime = new Date().getTime();
                let intervalInMilliseconds = 1000 * 60 * interval;

                if (alarm === undefined || alarm.periodInMinutes !== interval || lastCheck === 0 || lastCheck + intervalInMilliseconds < currentTime) {
                    chrome.alarms.create(ALARM_ID, { 'periodInMinutes': interval });
                    callToWebService();
                }
            } else {
                setDisabledIcon();
                if (alarm !== undefined) {
                    chrome.alarms.clear(ALARM_ID);
                }
            }
        });
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Captura la alarma y llama al webservice de comprobación si procede
 * 
 * @param {Alarm} alarm Alarma disparada
 */
function handleAlarm(alarm) {
    if (alarm.name === ALARM_ID) {
        callToWebService();
    }
}

/**
 * Funcion que realiza la llama AJAX al servicio web de chequeo de IP
 * 
 */
function callToWebService() {
  let pluginType = getPluginType();

  fetch(URL_WS_CAB, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X_INTECO_WS_Request_Source': pluginType
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((response) => {
    if (response.ok) {
      response.clone().json().then((data) => {
        manageWebServiceResponse(data)
      });
    } else {
      console.log('Respuesta de red OK pero respuesta HTTP no OK');
    }
  }).catch((error) => {
    manageWebServiceError(error.message)
  });
    
}

/**
 * Valida los datos y gestiona la resapuesta del webservice
 * 
 * @param {Object} response Respuesta del webservice
 * 
 * @returns true si se gestiona correctamente, false en otros casos
 */
function manageWebServiceResponse(response) {
    if (!responseValidation(response)) {
        manageWebServiceError(chrome.i18n.getMessage('msg_validation_error'));
    } else {
        if ((response.hasOwnProperty('error')) && (response.error !== '')) {
            manageWebServiceError(response.error);
        } else {
            manageWebServiceOK(response);
            return true;
        }
    }

    return false;
}

/**
 * Función de validación del JSON de respuesta del servidor
 * 
 * @param {Object} response Respuesta del webservice
 * 
 * @returns true si se valida correctamente, false en otros casos
 */
function responseValidation(response) {
    if (!tv4.validate(response, ip_schema)) {
        return false;
    }

    if (!checkFormatIp(response.ip) || !isValidError(response.error)) {
        return false;
    }

    if (response.evidences !== undefined) {
        for (let evidence of Object.values(response.evidences)) {
            if (!evidenceValidation(evidence)) {
                return false;
            }
        }
    } else {
        return false;
    }

    return true;
}

/**
 * Valida una evidencia devuelta por la llamada al webservice
 * 
 * @param {Object} evidence Evidencia
 * 
 * @returns true si es valida, false en otros casos
 */
function evidenceValidation(evidence) {
    return isValidDate(evidence.timestamp)
        && isValidThreatCodeName(evidence.threatCode)
        && checkThreatPublicName(evidence.name)
        && (evidence.descriptionUrl === '' || checkURLs(evidence.descriptionUrl))
        && (evidence.operatingSystems !== undefined && checkOperatingSystems(evidence.operatingSystems));
}

/**
 * Funcion que controla las llamadas al WS que devuelven una respuesta correcta
 * 
 * @param {Object} receivedData Respuesta del webservice
 * 
 */
async function manageWebServiceOK(response) {
    try {
        let config = await getConfig();
        config.error = 0;
        config.lastCheck = getCurrentDate();
        config.currentIP = response.ip;
        setEnabledIcon();

        // Si el JSON contiene evidencias, sera un chequeo positivo
        if ((response.hasOwnProperty('evidences')) && (response.evidences.length > 0)) {
            config.historicalRecords.unshift(...updateHistoricalRecord(response.evidences, config.currentIP, config.lastCheck));
            config.lastPositive = true;
            showAlertNotification();
        } else {
            config.lastPositive = false;
        }

        await updateConfig(config);
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Si el error es por que la ip esta fuera de rango, se establece el error 2, sino el 1. 
 * Ademas se estable el icono de desconexión y se limpia el ultimo positivo e ip.
 * 
 * @param {String} errorText Texto del error
 * 
 */
async function manageWebServiceError(errorText) {
    try {
        let config = await getConfig();
        config.currentIP = '';
        config.lastPositive = false;

        //Se comprueba si el problema es que la ip está fuera de rango
        if (errorText === chrome.i18n.getMessage('msg_not_supported_ip_error') || errorText === chrome.i18n.getMessage('msg_not_supported_ip_error_en')) {
            config.error = 2;
        } else {
            config.error = 1;
        }

        setDisconIcon();
        await updateConfig(config);
    } catch (err) {
        console.log(errorText);
    }
}

/**
 * Funcion que agrega los nuevos incidentes del ultimo escaneo en el registro historico
 * 
 * @param {Array} evidences Array de evidencias encontradas
 * @param {String} currentIP Ip analizada
 * @param {Long} lastCheck Fecha de ultima comprobación en milisegundos
 * 
 * @returns Array de evidencias validadas y formateadas
 */
function updateHistoricalRecord(evidences, currentIP, lastCheck) {
    let records = [];

    evidences.forEach(evidence => {
        let operatingSystems = [];
        let disinfectUrl = '';
        let descriptionUrl = '';

        evidence.operatingSystems.forEach(element => {
            operatingSystems.push(element.operatingSystem);
            if (disinfectUrl === undefined || disinfectUrl === '') {
                disinfectUrl = element.disinfectUrl;
            }
        });

        if (descriptionUrl === '' && evidence.descriptionUrl !== undefined && evidence.descriptionUrl !== '') {
            descriptionUrl = evidence.descriptionUrl;
        }

        let record = {
            date: lastCheck,
            ip: currentIP,
            threat: evidence.name,
            os: operatingSystems.join(', '),
            url: disinfectUrl,
            description: descriptionUrl
        }

        records.unshift(record);
    });

    return records;
}