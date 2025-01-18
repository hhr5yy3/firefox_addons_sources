if ('function' === typeof importScripts) {
  importScripts("./utils.js", "./lib/tv4.1_3_0.min.js", "./ip_schema.js", "./storage.js", "./webservice.js");
}

/**
 * Funtion that call on start or resume activiti
 */
function initializeCAB() {
  getConfig().then((config) => {
    checkService(config.active, config.interval, config.lastCheck);
  }).catch(() => {
    console.log(chrome.i18n.getMessage('msg_application_error'));
  });
}

if(chrome.runtime.onStartup.hasListener(initializeCAB) == false){
    chrome.runtime.onStartup.addListener(initializeCAB);
    initializeCAB();
} else {
    initializeCAB();
}