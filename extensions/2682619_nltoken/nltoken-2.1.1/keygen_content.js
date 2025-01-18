console.log("KeyGen content script running");

chrome.runtime.onMessage.addListener(gotMessageFromBackgroundScript);


function gotMessageFromBackgroundScript(message, sender, sendResponse){
    if(message.response_type == "providerNames"){
        var data = { type: "FROM_EXTENSION", cmd: "getProviders", providers: message.providerNames};
        window.postMessage(data, "*");
    }
    if(message.response_type == "certReq"){
        var data = { type: "FROM_EXTENSION", cmd: "generateKey", certRequest: message.certReq};
        window.postMessage(data, "*");
    }
    if(message.response_type == "installCert"){
        var data = { type: "FROM_EXTENSION", cmd: "installCert", result: message.result};
        window.postMessage(data, "*");
    }
}

function sendMessageToBackgroundScript(msg){
    chrome.runtime.sendMessage(msg);
}

function getProviderNames(){
    let msg = {
        type: "KEYGEN",
        cmd:"getProviderNames"
    }
    sendMessageToBackgroundScript(msg);
}

function generateKey(pmsg) {
    var commonName = pmsg.commonName;
    var countryCode = pmsg.countryCode;
    var locality = pmsg.locality;
    var organization = pmsg.organization;
    var organizationUnit = pmsg.organizationUnit;
    var email = pmsg.email;
    var providerName = pmsg.providerName;
    var keyLength = pmsg.keyLength;
    var ContainerNumber = pmsg.ContainerNumber;
    var algorithm = pmsg.algorithm;
    let sub_msg = {
      "CommonName": commonName,
      "countryCode": countryCode,
      "locality": locality,
      "organization": organization,
      "organizationUnit": organizationUnit,
      "email": email,
      "keyLength" : keyLength,
      "providerName": providerName,
      "ContainerNumber": ContainerNumber,
      "algorithm": algorithm
    }
    let msg = {
        type: "KEYGEN",
        "cmd": "reqCertReq",
        "msg" : sub_msg
      }
  sendMessageToBackgroundScript(msg);
  }

function installCert(pmsg) {
  
    let sub_msg = {
        "providerName": pmsg.providerName,
        "ContainerNumber": pmsg.ContainerNumber,
        "cert": pmsg.cert_str
    }
    let msg = {
        type: "KEYGEN",
        "cmd": "installCert",
        "msg" : sub_msg
        }
    sendMessageToBackgroundScript(msg);
  }


  window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;
    // {
    //     type :
    //     cmd:
    //     msg:
    // }
    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received message: ");
        console.log(event.data)
        if (event.data.cmd && (event.data.cmd == "getProviders")){
            getProviderNames();
        }
        if (event.data.cmd && (event.data.cmd == "generateKey")){
            generateKey(event.data.msg);
        }
        if (event.data.cmd && (event.data.cmd == "installCert")){
            installCert(event.data.msg);
        }
    }
});
    
  
  
  


  

