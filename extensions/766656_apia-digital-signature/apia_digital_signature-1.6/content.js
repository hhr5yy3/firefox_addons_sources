/**
 * JS for Firefox Extension
 */

document.body.className = 'extension-is-installed';

var dataToSign = localStorage["dataToSign"];
var params = JSON.parse(dataToSign);

var lblTitle = escapeHTML(params.lblTitle);
var lblCompTask = escapeHTML(params.lblCompTask);
var lblExit = escapeHTML(params.lblExit);
var lblCompTaskTooltip = escapeHTML(params.lblCompTaskTooltip);

var lblNoDataForSignFound = escapeHTML(params.lblNoDataForSignFound);
var lblWaitForSign = escapeHTML(params.lblWaitForSign);


var modalContent = document.getElementById('div-applet');
clearElement(modalContent);

var header = createElement('div', {'class':'header'});
header.appendChild(createElement('span',null,lblTitle));
modalContent.appendChild(header);

var confDiv = createElement('div', {'class':'button', id:'btnConf', onclick:'cofirmTask()', title: lblCompTaskTooltip}, lblCompTask);
confDiv.style.marginLeft = '12px';
var closeDiv = createElement('div', {'class':'close', id:'btnExit', onclick:'closeSign()', title: lblExit}, lblExit);
var footerConfirmClose = createElement('div',{'class':'footer'});
footerConfirmClose.appendChild(confDiv);
footerConfirmClose.appendChild(closeDiv);

var closeDiv = createElement('div', {'class':'close', id:'btnExit', onclick:'closeSign()', title: lblExit}, lblExit);
var footerClose = createElement('div',{'class':'footer'});
footerClose.appendChild(closeDiv);

var nativeAppNotFound = escapeHTML(params.lblNativeAppNotFound);
var tokbr = nativeAppNotFound.indexOf("TOKBR");
var tok1  = nativeAppNotFound.indexOf("TOK1");
var tok2  = nativeAppNotFound.indexOf("TOK2");

var nativeAppNotFoundElems = [];
nativeAppNotFoundElems.push(document.createTextNode(nativeAppNotFound.substring(0, tokbr)));
nativeAppNotFoundElems.push(createElement('br'));
nativeAppNotFoundElems.push(document.createTextNode(nativeAppNotFound.substring(tokbr+5, tok1)));
var link = createElement('a', {'href':'apiaDigitalSignatureFirefoxInstaller.jar', 'download':''});
link.appendChild( document.createTextNode(nativeAppNotFound.substring(tok1+4, tok2)));
nativeAppNotFoundElems.push(link);
nativeAppNotFoundElems.push(document.createTextNode(nativeAppNotFound.substring(tok2+4)));


var signWrongVersion = escapeHTML(params.lblSignWrongVersion);
tok1 = signWrongVersion.indexOf("TOK1");
tok2 = signWrongVersion.indexOf("TOK2");

var signWrongVersionElems = [];
signWrongVersionElems.push(document.createTextNode(signWrongVersion.substring(0, tok1)));
link = createElement('a', {'href':'apiaDigitalSignatureFirefoxInstaller.jar', 'download':''});
link.appendChild( document.createTextNode(signWrongVersion.substring(tok1+4, tok2)));
signWrongVersionElems.push(link);
signWrongVersionElems.push(document.createTextNode(signWrongVersion.substring(tok2+4)));


if(!dataToSign) {
	addModalContentToBody(lblNoDataForSignFound, footerClose);
} else {
	addModalContentToBody(lblWaitForSign, footerClose);
	
	browser.runtime.sendMessage({
		action: "sign",
		params: params
	}, function(response) {
		console.log(response);
	});
	
	checkResponse();
}

frameElement.style.height = document.getElementById('div-applet').offsetHeight + "px";
frameElement.style.width = document.getElementById('div-applet').offsetWidth + "px";

function checkResponse() {
	browser.runtime.sendMessage({action: 'check'}, function(response) {
		if(response) {
			if(response.result == 'ok' && response.message == params.lblAppletSignOK) {
				addModalContentToBody(escapeHTML(response.message), footerConfirmClose);
				localStorage["result"]  = "true";
			} else {
				if(response.message == "Specified native messaging host not found." || response.result=="error")
					addModalContentToBody(null, footerClose, nativeAppNotFoundElems);
				else if (response.status == "false")
					addModalContentToBody(escapeHTML(response.message), footerClose);
				else
					addModalContentToBody(null, footerClose, signWrongVersionElems);
				
				localStorage["result"]  = "false";
			}
			
			localStorage["appletTokenId"] = response.appletTokenId;
			
			frameElement.style.height = document.getElementById('div-applet').offsetHeight + "px";
			frameElement.style.width = document.getElementById('div-applet').offsetWidth + "px";
			
		} else {
			setTimeout(checkResponse, 100);
		}
	});
}

function escapeHTML(str) { return str.replace(/[&"'<>\/]/g, (m) => ({ "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" , "/":"	&#47;"})[m]); }

function addModalContentToBody(contentText, footerElement, contentElements){
	clearElement(modalContent);
	modalContent.appendChild(header);
	modalContent.appendChild( createElement('div', {'class':'content',id:'divContent'}, contentText, contentElements) );
	modalContent.appendChild(footerElement);
}

function createElement(elementType, attributes, textContent, contentElements){
	var ele = document.createElement(elementType);
	for (var key in attributes) { ele.setAttribute(key, attributes[key]); }
	if (textContent) ele.textContent = textContent;	
	if (contentElements){
		for (var i=0; i<contentElements.length; i++) { ele.appendChild(contentElements[i]);	}	
	}
	return ele;
}

function clearElement(element){
	while (element.firstChild) { element.removeChild(element.firstChild); }
}

