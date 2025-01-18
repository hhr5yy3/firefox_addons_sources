var bgPage = chrome.extension.getBackgroundPage();

function convertToPDFPopupMenu() {
	  bgPage.web2pdf_handleConversionRequest2({context: bgPage.web2pdfContext.PAGE, url: "", action: bgPage.web2pdfAction.CONVERT});
	  setTimeout(function(){window.close();}, 200);
}

function appendToExistingPDFPopupMenu() {
    bgPage.web2pdf_handleConversionRequest2({context: bgPage.web2pdfContext.PAGE, url: "", action: bgPage.web2pdfAction.APPEND});
    setTimeout(function(){window.close();}, 200);
}

function emailPDFPopupMenu() {
    bgPage.web2pdf_handleConversionRequest2({context: bgPage.web2pdfContext.PAGE, url: "", action: bgPage.web2pdfAction.EMAIL});
    setTimeout(function(){window.close();}, 200);
}

function sendToDMSPopupMenu() {
    bgPage.web2pdf_handleConversionRequest2({context: bgPage.web2pdfContext.PAGE, url: "", action: bgPage.web2pdfAction.DMS});
    setTimeout(function(){window.close();}, 200);
}

function showSettingsDialog() {
    bgPage.web2pdf_showSettingsDialog();
    setTimeout(function(){window.close();}, 200);
}

function setChildTextNode(elementId, text) {
    document.getElementById(elementId).innerText = text;
}

function setAllChildTextNodes() {
    setChildTextNode("web2pdf_ConvertToPDFText", chrome.i18n.getMessage("web2pdfMenuConvertToPDF"));
    setChildTextNode("web2pdf_AppendToExistingPDFText", chrome.i18n.getMessage("web2pdfMenuAppendToExistingPDF"));
    setChildTextNode("web2pdf_EmailPDFText", chrome.i18n.getMessage("web2pdfMenuEmailPDF"));
    setChildTextNode("web2pdf_SendToDMSText", chrome.i18n.getMessage("web2pdfMenuSendToDMS"));
    setChildTextNode("web2pdf_PreferencesText", chrome.i18n.getMessage("web2pdfMenuPreferences"));
}

function initPage() {
    setAllChildTextNodes();
    if (bgPage.web2pdf_isDMSAvailable()) {
        document.getElementById("web2pdf_SendToDMSText").setAttribute("class", "menu-text");
    }
}

window.addEventListener("load", initPage, false);

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("web2pdf_ConvertToPDF").addEventListener('click', convertToPDFPopupMenu);
    document.getElementById("web2pdf_AppendToExistingPDF").addEventListener('click', appendToExistingPDFPopupMenu);
    document.getElementById("web2pdf_EmailPDF").addEventListener('click', emailPDFPopupMenu);
    if (bgPage.web2pdf_isDMSAvailable()) {
        document.getElementById("web2pdf_SendToDMS").addEventListener('click', sendToDMSPopupMenu);
    }
    document.getElementById("web2pdf_Preferences").addEventListener('click', showSettingsDialog);
});


