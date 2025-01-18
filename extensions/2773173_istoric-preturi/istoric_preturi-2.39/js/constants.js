function getVersion()
{
    return chrome.runtime.getManifest().version;
}
function getName()
{
    return chrome.runtime.getManifest().name;
}

const DEBUG_MODE = localStorage.hasOwnProperty("debug") && parseInt(localStorage.debug);

const mainSite = "https://www.istoric-preturi.info";
const apiEndpoint = "https://api.istoric-preturi.info";
const maxRetry = 3;

const genericError = "<font color=red>Eroare! Ceva nu a functionat, incearca din nou<br><br>Daca problema persista e posibil ca site-ul <a href='https://www.istoric-preturi.info' target='_blank'>www.istoric-preturi.info</a> sa fie offline temporar</font>";

const EXTENSION_FLAG_IGNORE_SCHEMA_DATA = 0x10;
