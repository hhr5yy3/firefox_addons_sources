// inject API of Croc XML Signer into a page
// run_at document_end



var url = chrome.extension.getURL("crocxmlsigner.js");


var scriptElement = document.createElement('script');


scriptElement.type = "text/javascript";
scriptElement.id = "crocxmlsigner";
scriptElement.src = url;

document.getElementsByTagName("head")[0].appendChild(scriptElement);



/*
Send message to extenstion background and return reply to calling page.
Parameterts:
    requestId - integer id of the request (passed away to the calling page unmodified)
    msg - message content

Upon the message processing completion event CROCXmlSignInternalReply will be issued asynchronously.
The event's "detail" has the following fields:
    id - requestId
    success - true or false
    content - results of the message processing on success or undefined otherwise
    errorMessage - error message text on failure or undefined on success

*/
function CROCXmlSignInternalImpl(requestId, msg) {


    chrome.runtime.sendMessage(
        { crocxmlsign: msg },
        function (response) {
            var eventDetail=new Object;
            eventDetail.id = requestId;
            eventDetail.success = false;

            if (response == undefined) {
                console.log("CROCXmlSignInternalImpl sendMessage error");
                console.error(chrome.runtime.lastError);               
               	eventDetail.errorMessage = "Internal error: " + chrome.runtime.lastError.message;
            }
            else {
                console.log("CROCXmlSignInternalImpl sendMessage return");
                console.log(JSON.stringify(response));

                eventDetail.success = response.success;
                eventDetail.errorMessage = response.errorMessage;
                eventDetail.content = response.content;

                if(!eventDetail.success && msg.actionCode == "getVersion") {
                    eventDetail.success = true;
                    eventDetail.content = new Object;
                    eventDetail.content.major = 1;
                    eventDetail.content.minor = 1;
                }
            }
            var event = new CustomEvent('CROCXmlSignInternalReply',
                    { detail: JSON.stringify(eventDetail) });
            scriptElement.dispatchEvent(event);
        });
}

/*
Handle request from the application page (crocxmlsigner.js)
The message "detail" attributes expected are:
    id - the request id to return in reply
    content - the application request content to be passed to background part
*/
scriptElement.addEventListener("CROCXmlSignInternal", function (data) {

    CROCXmlSignInternalImpl(data.detail.id, data.detail.content);
});




