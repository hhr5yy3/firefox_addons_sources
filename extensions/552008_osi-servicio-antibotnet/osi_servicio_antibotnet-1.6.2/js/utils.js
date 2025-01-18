const DEFAULT_INTERVAL = 15;
const INTERVALS = [15, 30, 60];

/**
 * Detecta si es un plugin de Firefox o Chrome
 * 
 * @returns pluginFirefox si es Firefox, pluginChrome en otros casos
 */
function getPluginType() {
    let pluginType = 'pluginChrome';
    if (isFirefox()) {
        pluginType = 'pluginFirefox';
    }
    return pluginType;
}

/**
 * Detecta si el navegador es Firefox
 * 
 * @returns true si es Firefox, falso en otros casos
 */
function isFirefox() {
    let browserName = browserDetect();
    return browserName === "firefox";
}

/**
 * Detecta si el navegador es Chrome o Edge
 * 
 * @returns true Si es Chrome o Edge, falso en otros casos
 */
function isChrome() {
    let browserName = browserDetect();
    return browserName === "chrome" || browserName === "edge";
}

/**
 * Detecta el nombre del navegador
 * 
 * @returns chrome|firefox|safari|opera|edge|other
 */
function browserDetect() {
    let userAgent = navigator.userAgent;
    let browserName;

    if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
        browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
        browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
        browserName = "edge";
    } else {
        browserName = "other";
    }

    return browserName;
}

/**
 * Establece el icono normal en la barra de notificación
 * 
 */
function setEnabledIcon() {
    setIcon('bar_icon_normal');
}

/**
 * Establece el icono deshabilitado en la barra de notificación
 * 
 */
function setDisabledIcon() {
    setIcon('bar_icon_disabled');
}

/**
 * Establece el icono desconectado en la barra de notificación
 * 
 */
function setDisconIcon() {
    setIcon('bar_icon_discon');
}

/**
 * Establece el icono de peligro en la barra de notificación
 * 
 */
function setDangerIcon() {
    setIcon('bar_icon_danger');
}

/**
 * Establece el icono en la barra de notificación
 * 
 * @param {String} name Nombre del icono disponible en la carpeta de imagenes en formato 19 y 38
 */
function setIcon(name) {
    let action = chrome.action;

    if ('undefined' === typeof action) {
        action = chrome.browserAction;
    }

    action.setIcon({
        path: {
            '19': '/images/' + name + '_19.png',
            '38': '/images/' + name + '_38.png'
        }
    });
}

/**
 * Comrpueba si el formato de IP es valido
 * 
 * @param {String} ip IPv4
 * 
 * @returns true Si es una IPv4 valida, false en otros casos
 */
function checkFormatIp(ip) {
    if (ip === undefined || ip === null) {
        return false;
    }

    let newreg = /^(([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5]))$/;

    return newreg.test(ip);
}

/**
 * Se comprueba el formato error
 * 
 * @param {String} error Error a validar
 * 
 * @returns true Si el error no es nulo, de no mas de 400 caracteres y sin caracteres no permitidos, false en otros casos
 */
function isValidError(error) {
    if (error === undefined || error === null) {
        return false;
    }

    let newreg = /^[A-Za-z0-9 ÑñÁÉÍÓÚáéíóú\[\]\(\)\-_\.,\*]{0,400}$/;

    return newreg.test(error);
}

/**
 * Valida la url y SO de los sistemas operativos
 * 
 * @param {*} operatingSystems Sistemas operativos
 * 
 * @returns true si todos los SO tienen url y OS validos
 */
function checkOperatingSystems(operatingSystems) {
    for (let os of Object.values(operatingSystems)) {
        if (!checkURLs(os.disinfectUrl)
            || !checkOS(os.operatingSystem)) {
            return false;
        }
    }

    return true;
}

/**
 * Se comprueba el formato de la lista de urls.
 * 
 * @param {String} urlList Listado de urls separadas por comas
 * 
 * @returns true Si las urls son validas, falso en otros casos
 */
function checkURLs(urlList) {
    if (urlList === undefined || urlList === null) {
        return false;
    }

    let result = true;
    let urlArray = urlList.split(',');
    let cont = 0;
    let protocols = ['http', 'https', 'rtsp', 'https', 'Rtsp', 'Https', 'Http'];
    while (result && cont < urlArray.length) {
        let element = urlArray[cont];
        let urlSeparated = element.split(':');
        if (protocols.indexOf(urlSeparated[0].trim()) !== -1 && element) {
            let newreg = /(?:((http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-ZÑñáéíóú0-9][a-zA-ZÑñáéíóú0-9\-]{0,64}\.)+(?:(:?aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdeghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/;
            if (!newreg.test(element)) {
                result = false;
            }
        } else {
            result = false;
        }
        cont++;
    }
    return result;

}

/**
 * Se comprueban los sistemas operativos validos
 * 
 * @param {String} osList Listado de sistemas operativos separados por comas
 * 
 * @returns true Si todos los sistemas son validos, falso en otros casos
 */
function checkOS(osList) {
    if (osList === undefined || osList === null) {
        return false;
    }

    let result = true;
    let osarray = osList.split(',');
    let cont = 0;
    while (result && cont < osarray.length) {
        switch (osarray[cont].trim()) {
            case 'Linux':
            case 'Windows':
            case 'MacOS':
            case 'Android':
            case 'iOS':
            case 'Windows Phone':
                break;
            default:
                result = false;
        }
        cont++;
    }
    return result;
}

/**
 * Se comprueba el formato de nombre de amenaza publica
 * 
 * @param {String} name Nombre de la amenaza
 * 
 * @returns true Si el nombre no tiene caracteres invalidos y esta entre 3 y 20 caracteres, false en otros casos
 */
function checkThreatPublicName(name) {
    if (name === undefined || name === null) {
        return false;
    }

    let newreg = /^[A-Za-z0-9 Ññáéíóú\-_\*]{3,20}$/;

    return newreg.test(name);
}

/**
 * Se comprueba el formato de codigo de amenaza publica.
 * 
 * @param {String} code Código de la amenara
 * 
 * @returns true Si el código no tiene caracteres invalidos y esta entre 3 y 20 caracteres, false en otros casos
 */
function isValidThreatCodeName(code) {
    if (code === undefined || code === null) {
        return false;
    }

    let reg = /^[ABCDEFGHJKLMNPQRSTUVWXYZ123456789abcdefghijkmnopqrstuvwxyz]{2}$/;
    // Nuevo formato de código
    if (code.length === 4) {
        reg = /^[ABCDEFGHJKLMNQRSTUVWXYZ23456789]{4}$/;
    }

    return reg.test(code);
}

/**
 * Se comprueba el formato de registro de historicos.
 * 
 * @param {Array} historicalRecords Array de registros historicos de amenazas
 * 
 * @returns true Si todos los registros pasan las validaciones, false en otros casos
 */
function checkFormatHistoricalRecord(historicalRecords) {
    historicalRecords.forEach(record => {
        // Se comprueba la ip
        if (!checkFormatIp(record.ip)) {
            return false;
        }
        // Se comprueba nombre amenazas
        if (!checkThreatPublicName(record.thread)) {
            return false;
        }
        // se comprueban los sistemas operativos
        if (!checkOS(record.os)) {
            return ssoo;
        }
        // Se comprueba la url de desinfección
        if (!checkURLs(record.url)) {
            return false;
        }
        // Se comprueba la url de descripción
        if (record.description !== undefined && record.description !== '' && !checkURLs(record.description)) {
            return false;
        }
    });

    return true;
}

/**
 * Obtiene la fecha actual
 * 
 * @returns Fecha actual en milisegundos
 */
function getCurrentDate() {
    return new Date().getTime();
}

/**
 * Obtiene la fecha y hora para la localización es-ES
 * 
 * @param {Integer} timestamp Fecha en milisegundos
 * 
 * @returns Fecha y hora en formato dd/MM/yyyy hh:mm
 */
function getFormatedDateTime(timestamp) {
    return getFormatedDate(timestamp) + ' ' + getFormatedTime(timestamp);
}

/**
 * Obtiene la fecha para la localización es-ES
 * 
 * @param {Integer} timestamp Fecha en milisegundos
 * 
 * @returns Fecha en formato dd/MM/yyyy
 */
function getFormatedDate(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * Obtiene la hora para la localización es-ES
 * 
 * @param {Integer} timestamp Fecha en milisegundos
 * 
 * @returns Hora en formato HH:mm
 */
function getFormatedTime(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Obtiene la fecha en milisegundos 
 * 
 * @param {String} dateString Fecha en formato dd/MM/yyyy hh:mm o yyyy-MM-dd
 * 
 * @returns Timestamp Fecha en milisegundos si es valida, 0 en otros casos
 */
function getDateFromString(dateString) {
    if (dateString !== undefined || dateString !== null) {
        let regexpEs = /^(?<day>[0-9]{1,2})\/(?<month>[0-9]{1,2})\/(?<year>[0-9]{4})(?: (?<hour>[0-9]{2}):(?<minute>[0-9]{2})(?::(?<second>[0-9]{2}))?)?$/;
        let regexpUs = /^(?<year>[0-9]{4})-(?<month>[0-9]{1,2})-(?<day>[0-9]{1,2})(?: (?<hour>[0-9]{2}):(?<minute>[0-9]{2})(?::(?<second>[0-9]{2}))?)?$/;
        let groups = undefined;
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        if (regexpEs.test(dateString)) {
            groups = dateString.match(regexpEs).groups;
        } else if (regexpUs.test(dateString)) {
            groups = dateString.match(regexpUs).groups;
        }

        if (groups !== undefined && Object.values(groups).length > 0) {
            if (groups.hour === undefined) {
                options.hour = '2-digit';
            }

            if (groups.minute === undefined) {
                groups.minute = 0;
            }

            if (groups.second === undefined) {
                groups.second = 0;
            }

            let date = new Date(groups.year, groups.month - 1, groups.day, groups.hour, groups.minute, groups.second);
            return date.getTime();
        }
    }

    return 0;
}

/**
 * Valida el formato de una fecha 
 * 
 * @param {String} dateString Fecha en formato "dd/mm/yyyy HH:MM" o "yyy-mm-dd"
 * 
 * @returns true Si es una fecha valida, falso en otros casos
 */
function isValidDate(dateString) {

    if (dateString !== undefined || dateString !== null) {
        let regexpEs = /^(?<day>[0-9]{1,2})\/(?<month>[0-9]{1,2})\/(?<year>[0-9]{4})(?: (?<hour>[0-9]{2}):(?<minute>[0-9]{2})(?::(?<second>[0-9]{2}))?)?$/;
        let regexpUs = /^(?<year>[0-9]{4})-(?<month>[0-9]{1,2})-(?<day>[0-9]{1,2})(?: (?<hour>[0-9]{2}):(?<minute>[0-9]{2})(?::(?<second>[0-9]{2}))?)?$/;
        let groups = undefined;
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        if (regexpEs.test(dateString)) {
            groups = dateString.match(regexpEs).groups;
        } else if (regexpUs.test(dateString)) {
            groups = dateString.match(regexpUs).groups;
            dateString = groups.day + '/' + groups.month + '/' + groups.year;

            if (groups.hour !== undefined) {
                dateString += ' ' + groups.hour + ':' + groups.minute;
            }

            if (groups.second !== undefined) {
                dateString += ':' + groups.second;
            }
        }

        if (groups !== undefined && Object.values(groups).length > 0) {
            if (groups.hour !== undefined) {
                options.hour = '2-digit';
            } else {
                groups.hour = 0;
            }

            if (groups.minute !== undefined) {
                options.minute = '2-digit';
            } else {
                groups.minute = 0;
            }

            if (groups.second !== undefined) {
                options.second = '2-digit';
            } else {
                groups.second = 0;
            }

            let date = new Date(groups.year, groups.month - 1, groups.day, groups.hour, groups.minute, groups.second);
            let format = date.toLocaleString('es-ES', options).replace(',', '');
            return format === dateString;
        }
    }

    return false;
}

/**
 * Funcion que muestra una notificacion cuando se ha detectado un positivo en un chequeo IP
 * 
 */
function showAlertNotification() {
    let msgNotification = 'msg_notification_text';
    if (isFirefox()) {
        msgNotification = 'msg_notification_text_firefox';
    }

    try {
        setDangerIcon();

        let notificationOptions = {
            type: 'basic',
            title: chrome.i18n.getMessage('msg_notification_title'),
            message: chrome.i18n.getMessage(msgNotification),
            iconUrl: '/images/notification.png',
            priority: 2
        };

        chrome.notifications.onClicked.addListener(notificacionListener);
        chrome.notifications.create('positiveCheck', notificationOptions);
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Escuchador del evento de click, para limpiar la notificación y este escuchador
 * 
 * @param {String} notificationId Id de la notificación
 */
function notificacionListener(notificationId) {
    if (notificationId !== undefined && notificationId === 'positiveCheck') {
        chrome.notifications.clear('positiveCheck');
        chrome.notifications.onClicked.removeListener(notificacionListener);
    }
}

/**
 * Función que comprueba el intervalo está dentro de los valores establecidos.
 * 
 * @param {Integer} interval Intervalo de comprobación de IP en minutos
 * 
 * @returns El intervalo si es valido, el intervalo por defecto en otros casos
 */
function checkIntervalMinutes(interval) {
    if (!INTERVALS.includes(interval)) {
        return DEFAULT_INTERVAL;
    }

    return interval;
}

/**
 * Cierra la pestaña actual del navegador
 * 
 */
function closeCurrentTab() {
    try {
        chrome.tabs.getCurrent((tab) => {
            chrome.tabs.remove(tab.id);
        });
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Escapa contenido html de un texto
 * 
 * @param {String} str Cadena a escapar
 * 
 * @returns Cadena escapada
 */
function escapeHTML(str) {
    return str.replace(/[&"<>]/g, function (m) {
        return escapeHTML.replacements[m];
    });
}
escapeHTML.replacements = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };

/**
 * Genera un enlace para la tabla de historicos
 *
 * @param {String} url Url a la que apunta
 * @param {String} labelInfo Etiqueta del enlace
 * 
 * @returns Enlace formado
 */
function getLink(url, html) {
    let link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.textContent = escapeHTML(html);
    return link;
}

/**
 * Genera una columna de la tabla de historicos
 * 
 * @param {String} className Clase CSS
 * @param {String} html Contenido HTML
 * 
 * @returns td con el contenido y clase apropiados
 */
function getColumn(className, html) {
    let column = document.createElement('td');
    column.setAttribute('class', className);
    column.textContent = escapeHTML(html);
    return column;
}

/**
 * Genera una fila de la tabla de historico de amenzadas con los datos facilitados
 * 
 * @param {Array} record Datos del registro historico
 * 
 * @returns tr con las columnas rellenas
 */
function getRow(record, inline = false) {
    let columns = [];
    columns.push(getFormatedDateTime(record.date));
    columns.push(record.ip);
    columns.push(record.threat);
    columns.push(record.os);

    let row = document.createElement('tr');
    columns.forEach(column => {
        row.appendChild(getColumn('centerText', column));
    });

    let links = getColumn('centerText', '');
    links.appendChild(getLink(record.url, chrome.i18n.getMessage('msg_disinfection')));

    if (record.description !== '') {
        if(inline === true){
            let span = document.createElement('span');
            span.innerHTML = ' / ';
            links.appendChild(span);
        } else {
            links.appendChild(document.createElement('br'));
        }
        links.appendChild(getLink(record.description, chrome.i18n.getMessage('msg_more_information')));
    }

    row.appendChild(links);

    return row;
}

/**
 * Genera una fila vacia para la tabla de historico de amenazas
 * 
 * @returns tr con las columnas vacias
 */
function getEmptyRow() {
    let row = document.createElement('tr');

    for (let i = 0; i < 5; i++) {
        row.appendChild(getColumn('emptyCell', '--'));
    }

    return row;
}

/**
 * Función que rellena de forma dinamica la tabla del registro historico (del popup y de la pestaña)
 * 
 * @param {Array} records Registros historicos de amenazas
 * @param {Integer} limit Limite de filas, siendo 5 por defecto
 * @param {String} id Id de la tabla, siendo tableHistoricalRecord por defecto
 * 
 */

function injectTableHTML(records, limit = 5, id = 'tableHistoricalRecord', inline = false) {
    try {
        let table = document.getElementById(id);
        let tbody = table.tBodies[0];
        tbody.innerHTML = "";

        if (limit > 0 && records !== undefined && records.length > 0) {
            if (records.length > limit) {
                records = records.slice(0, limit);
            }

            records.forEach((record) => {
                tbody.append(getRow(record, inline));
            });
        } else {
            tbody.append(getEmptyRow());
        }
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Estabece la clave traducida en el elemento mng indicado
 * 
 * @param {String} id Id del elemento msg
 * @param {String} key Clave de la entrada traducida
 * 
 */
function setMessage(id, key) {
    if (typeof key === 'undefined') {
        key = id;
    }
    setHtml('msg_' + id, chrome.i18n.getMessage('msg_' + key));
}

/**
 * Rellena el elemento con id facilitado con el contenido HTML
 * 
 * @param {String} id Id del elemento msg
 * @param {String} html Código HTML
 * 
 */
function setHtml(id, html) {
    try {
        if(html.includes("href=")){ // El mensaje contiene un enlace
            let message = getMessageWithLink(html);
            document.getElementById(id).textContent = message[0];
            document.getElementById(id).appendChild(getLink(message[1],message[2]));
            document.getElementById(id).after(message[3]);
        }else if(html.includes("abbr title='")){ // El mensaje es el título de una tabla
            let tag = html.substring(html.indexOf(">")+1, html.lastIndexOf("<"));
            let attribute = html.substring(html.indexOf("'")+1, html.lastIndexOf("'"));
            let title = document.createElement('abbr');
            title.setAttribute('title', attribute);
            title.textContent = tag;
            document.getElementById(id).appendChild(title);
        }else{ // El mensaje no contiene ninguna etiqueta HTML
            document.getElementById(id).textContent = html;
        }
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }
}

/**
 * Divide el mensaje para separar un enlace del texto
 * 
 * @param {String} html Código HTML
 * 
 * @returns Array con el mensaje dividido [pre = Texto pre-URL, url = URL del mensaje, txt = texto del enlace, post = Texto post-URL]
 */
function getMessageWithLink (html) {
    let pre = html.substring(0, html.indexOf("<"));
    let url = html.substring(html.indexOf("href='"), html.length);
    url = url.replace("href='", "href=-")
    url = url.substring(url.indexOf("href=-")+6, url.indexOf("'"));
    let txt = html.substring(html.indexOf(">")+1, html.lastIndexOf(">"));
    txt = txt.substring(0, txt.indexOf("<"));
    let post = html.substring(html.lastIndexOf(">")+1, html.length);

    return [pre, url, txt, post]
}

/**
 * Comprueba si hay positivos en la ultima semana
 * 
 * @param {*} config Configuración guardada del plugin
 * 
 * @returns true si hay amenazas en la ultima semana, false en otros casos
 */
function checkRecentPositive(config) {
    try {

        if (config.historicalRecords !== undefined && config.historicalRecords.length > 0) {
            let last = config.historicalRecords[0];
            let currentDate = new Date().getTime();
            let oneWeek = (1000 * 60 * 60 * 24) * 7;

            if ((currentDate - last.date) < oneWeek) {
                return true;
            }
        }
    } catch (err) {
        console.log(chrome.i18n.getMessage('msg_application_error'));
    }

    return false;
}