// Croc XML Signer browser extension


// window.alert("background");

/*
call native message host
Outgoing message formats see CROCXmlSignerXXX functions.
One of attributes is 'actionCode' which specifies action to be executed. Other attributes depends on the action.

Inbound messages are excepted to contain the following fields:
    success (boolean) - whether the call was successful
    errorMessage - error message if success==false 
    content - result of request execution, passed unchanged to top-level caller so must conform descrition of 'content'
callback function parameter as described for CROCXmlSignerXXX functions On failure ignored, on success may be omitted if
not required (in that case top-level caller will receive "undefied")
*/
function callNMH(msg, sendResponse)
{
    chrome.runtime.sendNativeMessage('ru.croc.xmlsigner', msg,
          function(response) {
              console.log("Received " + JSON.stringify(response));

              var reply = {};
     
              if(response==undefined)
              {
                  reply.success = false;
                  reply.errorMessage = chrome.runtime.lastError.message
              }
              else
              {
                  if (response.success == undefined)
                  {
                      reply.success = false;
                      reply.errorMessage = "Malformed reponse from native message host"
                  }
                  else
                  {
                      reply.success = response.success;
                      reply.errorMessage = response.errorMessage;
                      reply.content = response.content;
                  }

              }

              sendResponse(reply);
          });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.crocxmlsign != undefined) { // ignore unrecognized messages

            console.log("request:" + JSON.stringify(request.crocxmlsign));

            callNMH(request.crocxmlsign, sendResponse);

            return true; // async return or will fail on sendResponse call 
        }
    });

