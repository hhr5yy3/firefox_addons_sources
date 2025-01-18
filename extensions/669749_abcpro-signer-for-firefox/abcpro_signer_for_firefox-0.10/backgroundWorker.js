var ExtensionVersion = {
    Name: "extensionJS",
    GeneralVersion: 0,
    UpdateVersion: 8
};

var tabId;
var host_name;
var port;
var tabId;
var NativeMessage = {
    FunctionName:"",
    FunctionCallbackName:"",
    FunctionArguments: "",
    ResponseId:"",
    Info:""
};
var FunctionsEnum = {
    extensionJSVersion: { functionName: "getExtensionJSVersion", functionCallbackName: "getExtensionJSVersionCallback" },
    extensionNativeAppVersion: { functionName: "getExtensionNativeAppVersion", functionCallbackName: "getExtensionNativeAppVersionCallback" },
    ping: { functionName: "getPing", functionCallbackName: "getPingCallback" },
    certificates: { functionName: "getCertificates", functionCallbackName: "getCertificatesCallback" },
    commitmentTypes: { functionName: "getCommitmentTypes", functionCallbackName: "getCommitmentTypesCallback" },
    xadesTypes: { functionName: "getXadesTypes", functionCallbackName: "getXadesTypesCallback" },
    signDocument: { functionName: "signDocument", functionCallbackName: "signDocumentCallback" },
	signDocumentsSeries: {functionName: "signDocumentsSeries", functionCallbackName: "signDocumentsSeriesCallback" },
	signDocumentWithoutWidget: { functionName: "signDocumentWithoutWidget", functionCallbackName: "signDocumentWithoutWidgetCallback" },
    signDocumentsSeriesWithoutWidget: { functionName: "signDocumentsSeriesWithoutWidget", functionCallbackName: "signDocumentsSeriesWithoutWidgetCallback" },
	signEADMPackage: { functionName: "signEADMPackage", functionCallbackName: "signEADMPackageCallback" },
	signProgress: {functionName: "signProgress", functionCallbackName: "signProgressCallback" },
	signatureMethodTypes: { functionName: "getSignatureMethodTypes", functionCallbackName: "getSignatureMethodTypesCallback"},
}
var responseId;
var responseDic = { ids:[], functions:[]};
var responseProgressId = { ids:[]};

initialize();

function initialize() {
    host_name = "com.abc.signer";
    port = null;
    console.log("connect to native");

    responseId = 0; 
    addWebToExtensionListener();
}


function addWebToExtensionListener() {
    browser.runtime.onMessage.addListener(onExternalMessage);
}

function onExternalMessage(request, sender, sendResponse) {
	if(request.responseId != undefined){
		responseId = request.responseId;
	}
	
    console.log("onExternal: " + request.methodName + " , " + "functionArguments: " + request.functionArguments + ", responseId: " + responseId);

    responseDic.ids[responseId] = responseId;
    responseDic.functions[responseId] = sendResponse;

    functionChooserIn(request.methodName, responseId, request.functionArguments);

	if(request.responseId == undefined){
		responseId++;
	}
    return true;
}

function connectToNative() {
    port = browser.runtime.connectNative(host_name);
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);
    return port;
}

function sendNativeMessage(nativeMessage) {
    connectToNative();
    port.postMessage(nativeMessage);
}

function onNativeMessage(nativeMessage) {
    functionChooserOut(nativeMessage);
}

function onDisconnected() {
    console.log(browser.runtime.lastError);
    console.log('disconnected from native app.');
    port = null;
}

function getCertificatesCallback(response) {
    console.log('getCertificatesCallback', response);
}

function createNativeMessage(functionName, functionCallbackName, functionArguments, responseId, info) {
    var nativeMessage = {};
    nativeMessage.FunctionName = functionName;
    nativeMessage.FunctionCallbackName = functionCallbackName;
    nativeMessage.FunctionArguments = functionArguments;
    nativeMessage.ResponseId = responseId;
    nativeMessage.Info = info;
    return nativeMessage;
}

function functionChooserIn(functionName, responseId, functionArguments) {
    switch (functionName) {
        case FunctionsEnum.extensionJSVersion.functionName:
            getExtensionJSVersion(responseId);
            break;
        case FunctionsEnum.extensionNativeAppVersion.functionName:
            getExtensionNativeAppVersion(responseId);
            break;
        case FunctionsEnum.ping.functionName:
            getPing(responseId);
            break;
        case FunctionsEnum.certificates.functionName:
            getCertificates(responseId);
            break;
        case FunctionsEnum.commitmentTypes.functionName:
            getCommitmentTypes(responseId);
            break;
        case FunctionsEnum.xadesTypes.functionName:
            getXadesTypes(responseId);
            break;
        case FunctionsEnum.signDocument.functionName:
            signDocument(responseId, functionArguments);
            break;
        case FunctionsEnum.signDocumentsSeries.functionName:
            signDocumentsSeries(responseId, functionArguments);
            break;
		case FunctionsEnum.signDocumentWithoutWidget.functionName:
            signDocumentWithoutWidget(responseId, functionArguments);
            break;
        case FunctionsEnum.signDocumentsSeriesWithoutWidget.functionName:
            signDocumentsSeriesWithoutWidget(responseId, functionArguments);
            break;
		case FunctionsEnum.signEADMPackage.functionName:
            signEADMPackage(responseId, functionArguments);
            break;
        case FunctionsEnum.signProgress.functionName:
            signProgress(responseId);
            break;
        case FunctionsEnum.signatureMethodTypes.functionName:
            getSignatureMethodTypes(responseId);
            break;
        default:
            console.log("function chooserIn is not available");
    }
}

function functionChooserOut(nativeMessage) {
    console.log("function chooser recived : " + nativeMessage.FunctionCallbackName + ", responseId: " + nativeMessage.ResponseId);
	console.log(nativeMessage);
    if (responseDic.ids[nativeMessage.ResponseId] != undefined) {
        try {
            if (nativeMessage.FunctionArguments[0].Type == "Progress") {				
                if (responseProgressId.ids.length > 0) {					
                    var responseProcId = responseProgressId.ids.shift();
					nativeMessage.ResponseId = responseProcId;
                    responseDic.functions[responseProcId](nativeMessage);
                } else {
                    console.log("responseProgressId is empty, signProgress not returned");
                }
            } else {
                responseDic.functions[nativeMessage.ResponseId](nativeMessage);
            }
        } catch (err) {
            console.log("Occurred error in nativeMessage, nativeMessage.ResponseId is ok, but something with signProgress. " + err.message);
			if(nativeMessage.FunctionArguments[0].Type != "Progress"){				
				responseDic.functions[nativeMessage.ResponseId](nativeMessage);
			}
        }
    }
}

function getExtensionJSVersion(responseId) {
    var nativeMessage = createNativeMessage(FunctionsEnum.extensionJSVersion.functionName, FunctionsEnum.extensionJSVersion.functionCallbackName, [], "" + responseId);
    nativeMessage.FunctionArguments.push(ExtensionVersion);
    console.log("id: " + responseId);
    responseDic.functions[responseId](nativeMessage);
}

function getExtensionNativeAppVersion(responseId) {
    var nativeMessage = createNativeMessage(FunctionsEnum.extensionNativeAppVersion.functionName, FunctionsEnum.extensionNativeAppVersion.functionCallbackName, [], responseId);
    sendNativeMessage(nativeMessage);
}

function getPing(responseId) {
    var nativeMessage = createNativeMessage(FunctionsEnum.ping.functionName, FunctionsEnum.ping.functionCallbackName, [], responseId);
    sendNativeMessage(nativeMessage);
}

function getCertificates(responseId) {
    var nativeMessage = createNativeMessage(FunctionsEnum.certificates.functionName, FunctionsEnum.certificates.functionCallbackName, [], responseId, "");
    console.log("getCertificates", nativeMessage);
    sendNativeMessage(nativeMessage);
}

function getCommitmentTypes(responseId) {
    var nativeMessage = createNativeMessage(FunctionsEnum.commitmentTypes.functionName, FunctionsEnum.commitmentTypes.functionCallbackName, [], responseId);
    sendNativeMessage(nativeMessage);
}

function getXadesTypes(responseId) {
    var nativeMessage = createNativeMessage(FunctionsEnum.xadesTypes.functionName, FunctionsEnum.xadesTypes.functionCallbackName, [], responseId);
    sendNativeMessage(nativeMessage);
}

function getSignatureMethodTypes(responseId) {
    var nativeMessage = createNativeMessage(FunctionsEnum.signatureMethodTypes.functionName, FunctionsEnum.signatureMethodTypes.functionCallbackName, [], responseId);
    sendNativeMessage(nativeMessage);
}

function signProgress(responseId) {
    responseProgressId.ids.push(responseId);
}

function signDocumentsSeries(responseId, functionArguments) {
    var nativeMessage = createNativeMessage(FunctionsEnum.signDocumentsSeries.functionName, FunctionsEnum.signDocumentsSeries.functionCallbackName, functionArguments, responseId);
    sendNativeMessage(nativeMessage);
}

function signDocument(responseId, functionArguments) {
    var nativeMessage = createNativeMessage(FunctionsEnum.signDocument.functionName, FunctionsEnum.signDocument.functionCallbackName, functionArguments, responseId);
    sendNativeMessage(nativeMessage);
}

function signDocumentsSeriesWithoutWidget(responseId, functionArguments) {
    var nativeMessage = createNativeMessage(FunctionsEnum.signDocumentsSeriesWithoutWidget.functionName, FunctionsEnum.signDocumentsSeriesWithoutWidget.functionCallbackName, functionArguments, responseId);
    sendNativeMessage(nativeMessage);
}

function signDocumentWithoutWidget(responseId, functionArguments) {
    var nativeMessage = createNativeMessage(FunctionsEnum.signDocumentWithoutWidget.functionName, FunctionsEnum.signDocumentWithoutWidget.functionCallbackName, functionArguments, responseId);
    sendNativeMessage(nativeMessage);
}

function signEADMPackage(responseId, functionArguments) {
    var nativeMessage = createNativeMessage(FunctionsEnum.signEADMPackage.functionName, FunctionsEnum.signEADMPackage.functionCallbackName, functionArguments, responseId);
    sendNativeMessage(nativeMessage);
}