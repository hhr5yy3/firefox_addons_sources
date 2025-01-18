var isFireFox = navigator.userAgent.match(/Firefox/i);
if (!isFireFox) {
    browserInstance = chrome;
} else {
    browserInstance = browser;
}

// Создаем канал с контекстым скриптом
browserInstance.runtime.onConnect.addListener(function (port) {
	console.log("Подключились к контекстному скрипту.");
    var isPortDisconnected = false;
    // Принимаем сообщения от контекстного скрипта и отправляем дальше нативному приложению
    port.onMessage.addListener(function (msg) {
        //console.log(msg);
        //console.log("background: " + (msg && msg.message));

        // Подключаемся к нативному приложению
        var isNativeMessageReceived = false;
        var hostPort = browserInstance.runtime.connectNative('native.a2.host');

        // Принимаем сообщения от нативного приложения и отправляем дальше контекстном скрипту
        hostPort.onMessage.addListener(function (response) {
            //console.log(response);
            //console.log("background: " + (response && response.message));
            if (!isPortDisconnected) {
                isNativeMessageReceived = true;
                port.postMessage(response);
            }
        });

        // Реагируем на обрыв связи с нативным приложением
        hostPort.onDisconnect.addListener(function () {
            console.log("Соединение с нативным приложением разорвано.");
            if (!isPortDisconnected) {
                if (!isNativeMessageReceived) {
                    port.postMessage({ uniqId: msg.uniqId, message: msg.message, errorText: "__disconnected__" });
                }                    
                port.postMessage({ uniqId: msg.uniqId, message: "signal", signalName: "disconnected" });
            }            
            
        });

        // Отправляем сообщения нативному приложению
        hostPort.postMessage(msg);
    });

    // Реагируем на обрыв связи с контекстным скриптом
    port.onDisconnect.addListener(function () {
        isPortDisconnected = true;
        console.log("Соединение с контекстным скриптом разорвано.");
    });    
});