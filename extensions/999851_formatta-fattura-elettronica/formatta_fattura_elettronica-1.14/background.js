var isActive = true;
browser.runtime.onMessage.addListener(handleMessageFromContentScript);
browser.browserAction.onClicked.addListener(toggleAddon);

function handleMessageFromContentScript(message) {
  if (message.command === "openTab") {
    var tmp = message.url.split(":");
    if (tmp[0] === "file") {
      var gettingTab = browser.tabs.query({url: message.url});
      gettingTab.then(closeTab);
    }
    tmp = message.url.split("/");
    var fileName = tmp[tmp.length - 1];
    browser.tabs.create({
      url:"/VisualizzaFattura.html?" + fileName
    }).then(injectScript);
  } else if (message.command === "giveMeMyStylesheet" && isActive === true) {
    browser.tabs.query({url: message.url})
    .then(sendStylesheetRef);
  }

  function injectScript(tab) {
    var myTabId = tab.id;
    browser.tabs.executeScript(myTabId, {file: "/injectedScript.js"})
    .then(sendMessageToNewTab);
    
    function sendMessageToNewTab() {
      browser.tabs.sendMessage(myTabId, {
       command: "showInvoice",
       html: message.html,
       title: fileName
      });
    }
  }

  function sendStylesheetRef(tabs) {
    var xslRef;
    var xslString = null;
      if (message.docType === "Fattura10") {
        xslRef = browser.extension.getURL("/FoglioStileAssoSoftware.xsl");
        browser.storage.local.get("Fattura10")
        .then((res) => {
          if (res.Fattura10.xslString != null) {
            xslString = res.Fattura10.xslString;
          } else if (res.Fattura10.fileName === "Ministeriale") {
            xslRef = browser.extension.getURL("/" + message.docType + ".xsl");
          }
          sendMessage()
        })
        .catch((error) => {
          sendMessage()
        });
      } else if (message.docType === "Fattura11") {
        xslRef = browser.extension.getURL("/FoglioStileAssoSoftware.xsl");
        browser.storage.local.get("Fattura11")
        .then((res) => {
          if (res.Fattura11.xslString != null) {
            xslString = res.Fattura11.xslString;
          } else if (res.Fattura11.fileName === "Ministeriale") {
            xslRef = browser.extension.getURL("/" + message.docType + ".xsl");
          }
          sendMessage()
        })
        .catch((error) => {
          sendMessage()
        });
      } else if (message.docType === "FatturaFPA12") {
        xslRef = browser.extension.getURL("/FoglioStileAssoSoftware.xsl");
        browser.storage.local.get("FatturaFPA12")
        .then((res) => {
          if (res.FatturaFPA12.xslString != null) {
            xslString = res.FatturaFPA12.xslString;
          } else if (res.FatturaFPA12.fileName === "Ministeriale") {
            xslRef = browser.extension.getURL("/" + message.docType + ".xsl");
          }
          sendMessage()
        })
        .catch((error) => {
          sendMessage()
        });
      } else if (message.docType === "FatturaFPR12") {
        xslRef = browser.extension.getURL("/FoglioStileAssoSoftware.xsl");
        browser.storage.local.get("FatturaFPR12")
        .then((res) => {
          if (res.FatturaFPR12.xslString != null) {
            xslString = res.FatturaFPR12.xslString;
          } else if (res.FatturaFPR12.fileName === "Ministeriale") {
            xslRef = browser.extension.getURL("/" + message.docType + ".xsl");
          }
          sendMessage()
        })
        .catch((error) => {
          sendMessage()
        });
      } else {
        xslRef = browser.extension.getURL("/" + message.docType + ".xsl");
        sendMessage();
      }



    function sendMessage() {
      for (let tab of tabs) {
        browser.tabs.sendMessage(tab.id, {
          command: "thisIsYourStylesheet",
          xslRef: xslRef,
          xslString: xslString
        });
      }
    }
  }

}

function closeTab(tabs) {
  for (let tab of tabs) {
    browser.tabs.remove(tab.id);
  }
}


function toggleAddon() {
  console.log("togle");
  if (isActive === true) {
    browser.browserAction.setIcon({
      path: { 
        19: "icons/19-red.png",
        38: "icons/38-red.png"
      }
    });
    browser.browserAction.setTitle({
      title: "Attiva la formattazione delle fatture elettroniche"
    });
  isActive = false;
  } else {
    browser.browserAction.setIcon({
      path: {
        19: "icons/19-green.png",
        38: "icons/38-green.png"
      }
    });
    browser.browserAction.setTitle({
      title: "Disattiva la formattazione delle fatture elettroniche"
    });
  isActive = true;
  }
}

