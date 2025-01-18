
function convertToPDFContextMenu(info, tab) {
    var url = info.pageUrl;
    if (url == undefined)
        url = tab.url;
    web2pdf_handleConversionRequest({ tab: tab.id, context: web2pdfContext.PAGE, url: url, action: web2pdfAction.CONVERT });
}

function appendToExistingPDFContextMenu(info, tab) {
    var url = info.pageUrl;
    if (url == undefined)
        url = tab.url;
    web2pdf_handleConversionRequest({ tab: tab.id, context: web2pdfContext.PAGE, url: url, action: web2pdfAction.APPEND });
}

function convertLinkToPDFContextMenu(info, tab) {
    var url = info.linkUrl;
    web2pdf_handleConversionRequest({ tab: tab.id, context: web2pdfContext.LINK, url: url, action: web2pdfAction.CONVERT });
}

function appendLinkToExistingPDFContextMenu(info, tab) {
    var url = info.linkUrl;
    web2pdf_handleConversionRequest({ tab: tab.id, context: web2pdfContext.LINK, url: url, action: web2pdfAction.APPEND });
}

chrome.contextMenus.create({ "title": chrome.i18n.getMessage("web2pdfContextMenuConvertPage"), "contexts": ["page"], "onclick": convertToPDFContextMenu });
chrome.contextMenus.create({ "title": chrome.i18n.getMessage("web2pdfContextMenuAppendPage"), "contexts": ["page"], "onclick": appendToExistingPDFContextMenu });

chrome.contextMenus.create({ "title": chrome.i18n.getMessage("web2pdfContextMenuConvertLink"), "contexts": ["link"], "onclick": convertLinkToPDFContextMenu });
chrome.contextMenus.create({ "title": chrome.i18n.getMessage("web2pdfContextMenuAppendLink"), "contexts": ["link"], "onclick": appendLinkToExistingPDFContextMenu });