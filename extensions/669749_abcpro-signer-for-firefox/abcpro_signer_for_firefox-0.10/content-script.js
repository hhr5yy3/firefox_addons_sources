var url = '';
function receiveMessage(event)
{

    url = event.origin;
    notifyBackgroundPage(event.data);
}
window.addEventListener("message", receiveMessage, false);

function handleResponse(message) {
    console.log('received response', message);
    window.postMessage({
        direction: "from-extension",
        messageType: "out",
        messageData: message
    }, url);

}

function handleError(error) {
    console.log('received error', error);
    console.log(`Error: ${error}`);
}

function notifyBackgroundPage(object) {
    
    console.log('notifying', object);

    if(object.messageData.functionName){
        var sending = browser.runtime.sendMessage({
            methodName: object.messageData.functionName, functionArguments: object.messageData.functionArguments, responseId: object.messageData.responseId
        });

        sending.then(handleResponse, handleError);  
    }
}

