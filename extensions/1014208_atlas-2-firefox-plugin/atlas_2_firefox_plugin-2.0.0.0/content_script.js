var isFireFox = navigator.userAgent.match(/Firefox/i);
if (!isFireFox) {
    browserInstance = chrome;
} else {
    browserInstance = browser;
}

var version = browserInstance.runtime.getManifest().version;
var isPortDisconnected = false;
// Подключаемся к фонофой странице
var port = browserInstance.runtime.connect();

console.log('Версия расширения: ' + version);

// Принимаем сообщения от веб страницы и отправляем их дальше фоновой странице
window.addEventListener("message", function (event) {
    if (event.source !== window)
        return;

	//console.log(event.data);
    if (event.data && event.data.source === "Atlas-2") {
        //console.log("content_script: " + event.data.message);
        event.data.extensionVersion = version; 

        // возвращаем сообщении о разрыве с фоновой страницей
        if (isPortDisconnected) {
            event.data.errorText = "__extensionDisconnected__";
            sendMessageToWebPage(event.data);
            return;
        }
        
        // возвращаем версию расширения
        if (event.data.message === "extensionVersion") {            
            sendMessageToWebPage(event.data);
            return;
        }
        // отправляем сообщение фоновой странице
        port.postMessage(event.data);
    }
}, false);

// Принимаем сообщения от фоновый страницы и отправляем дальше веб странице
port.onMessage.addListener(function (msg) {
	//console.log(msg);
    //console.log("content_script: " + (msg && msg.message));
    msg.extensionVersion = version; 
    sendMessageToWebPage(msg);
});


// Реагируем на обрыв связи с фоновой страницей
port.onDisconnect.addListener(function () {
    isPortDisconnected = true;
    console.log("Соединение с фоновой страницей разорвано.");
    sendMessageToWebPage({ message: "signal", signalName: "extensionDisconnected" });
});   

/**
 * Отпправляет сообщение веб странице
 * @param {any} msg сообщение в формате json
 */
function sendMessageToWebPage(msg) {
    msg.source = "Atlas-2 Plug-in";
    window.postMessage(msg, "*");
}



