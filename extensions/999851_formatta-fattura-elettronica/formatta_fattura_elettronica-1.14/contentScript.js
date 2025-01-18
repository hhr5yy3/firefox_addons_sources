
  browser.runtime.onMessage.addListener(handleMessageFromBackground);
  
  if (document.getElementsByTagNameNS("*","FatturaElettronica").length === 1) {
    var versione = document.getElementsByTagNameNS("*","FatturaElettronica")[0].getAttribute("versione");
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "Fattura" + versione.replace(".", "")
    });
  } else if (document.getElementsByTagNameNS("*","FileMetadati").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "MT_v1.1"
    });
  } else if (document.getElementsByTagNameNS("*","RicevutaImpossibilitaRecapito").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "MC_v1.1"
    });
  } else if (document.getElementsByTagNameNS("*","RicevutaConsegna").length === 1) {
    if (document.getElementsByTagNameNS("*","Hash").length === 1) {
      browser.runtime.sendMessage({
        command: "giveMeMyStylesheet",
        url: document.URL,
        docType: "RC_v1.1"
      });
    } else {
      browser.runtime.sendMessage({
        command: "giveMeMyStylesheet",
        url: document.URL,
        docType: "RC_v1.0"
      });
    }
  } else if (document.getElementsByTagNameNS("*","RicevutaScarto").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "NS_v1.1"
    });
  } else if (document.getElementsByTagNameNS("*","AttestazioneTrasmissioneFattura").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "AT_v1.1"
    });
  } else if (document.getElementsByTagNameNS("*","NotificaDecorrenzaTermini").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "DT_v1.0"
    });
  } else if (document.getElementsByTagNameNS("*","NotificaEsitoCommittente").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "EC_v1.0"
    });
  } else if (document.getElementsByTagNameNS("*","NotificaMancataConsegna").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "MC_v1.0"
    });
  } else if (document.getElementsByTagNameNS("*","MetadatiInvioFile").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "MT_v1.0"
    });
  } else if (document.getElementsByTagNameNS("*","NotificaEsito").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "NE_v1.0"
    });
  } else if (document.getElementsByTagNameNS("*","NotificaFileNonRecapitabile").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "NR_v1.0"
    });
  } else if (document.getElementsByTagNameNS("*","NotificaScarto").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "NS_v1.0"
    });
  } else if (document.getElementsByTagNameNS("*","ScartoEsitoCommittente").length === 1) {
    browser.runtime.sendMessage({
      command: "giveMeMyStylesheet",
      url: document.URL,
      docType: "SE_v1.0"
    });
  }





  function handleMessageFromBackground(message) {
    if (message.command === "thisIsYourStylesheet") {
      var myHtml;
      if (message.xslString != null) {
        myHtml = xmlToHtmlWithXslString(message.xslString)
      } else {
        myHtml = xmlToHtmlWithXslRef(message.xslRef)
      }
      browser.runtime.sendMessage({
        command: "openTab",
        url: document.URL,
        html: myHtml
      });
    }
  }



  function xmlToHtmlWithXslRef(xslRef) {
    var xsltProcessor = new XSLTProcessor();
    var myXMLHTTPRequest = new XMLHttpRequest();
    myXMLHTTPRequest.open("GET", xslRef, false);
    myXMLHTTPRequest.overrideMimeType("application/xslt+xml");
    myXMLHTTPRequest.send();
    var xslDoc = myXMLHTTPRequest.responseXML;
    xsltProcessor.importStylesheet(xslDoc);
    var myDoc = xsltProcessor.transformToDocument(document);
    var myHtml = new XMLSerializer().serializeToString(myDoc);
    return(myHtml);
  }

  function xmlToHtmlWithXslString(xslString) {
    var xsltProcessor = new XSLTProcessor();
    var myXMLHTTPRequest = new XMLHttpRequest();
    var xslDoc = new DOMParser().parseFromString(xslString,"application/xml");
    xsltProcessor.importStylesheet(xslDoc);
    var myDoc = xsltProcessor.transformToDocument(document);
    var myHtml = new XMLSerializer().serializeToString(myDoc);
    return(myHtml);
  }

