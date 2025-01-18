
var pStack = {};
function token() {
    var val = '',
        hex = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < 32; i++) {
        val += hex.charAt(Math.floor(Math.random() * hex.length));
    }

    return val;
}
function sendOnMessage(message, msTimeout) {
    msTimeout = msTimeout || 500;
    return new Promise(function (resolve, reject) {
        message.id = token();
        message.sender = 'sdk';
        window.postMessage(message, '*');
    });
}
function messageHandler(event) {
    if (event.data.sender === 'rest') {
        for (messageId in pStack) {
            pStack[messageId].reject(new Error(event.data.error));
            delete pStack[messageId];
        }
        return;
    }

    if (event.data.id && event.data.id === '*' && event.data.sender && event.data.sender === 'extension' && event.data.error) {
        for (messageId in pStack) {
            pStack[messageId].reject(new Error(event.data.error));
            delete pStack[messageId];
        }
        return;
    }

    if (event.data.id && event.data.id in pStack && event.data.sender && event.data.sender == 'extension') {
        var messageId = event.data.id,
            promise = pStack[messageId];
        if (event.data.error) {
            promise.reject(new Error(event.data.error));
        } else {
            delete event.data.id;
            delete event.data.sender;
            promise.resolve(event.data);
        }
        delete pStack[messageId];
    }
}
window.addEventListener('message', messageHandler, false);