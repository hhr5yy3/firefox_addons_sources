chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "initialize"});
  });

  
 chrome.commands.onCommand.addListener((command) => {
    //chrome.tabs.create({url:"https://www.udemy.com"});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //chrome.tabs.sendMessage(tabs[0].id, {tipo: "print", mensaje: "hola"});
        //inyectaCss(tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, {tipo: "print", mensaje: tabs[0].id});
        console.log(tabs[0].url);
    });      
    console.log("tecla capturada");
}); 
console.log("background.js");
/* function inyectaCss(){
    var tab = chrome.tabs.query({active: true, currentWindow: true});
    chrome.tabs.insertCSS(tab.id, { code: "body { background-color: red; }" });
  } */
//X_CRIEVACOMBAS_15097

chrome.runtime.onInstalled.addListener(() => {
    tab = chrome.tabs.query({active: true, currentWindow: true});
    /* chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["micss.css"]
      }); */
});

/* function inyectaCss(tabId){
  
    console.log(tabId);
    chrome.scripting.insertCSS({
      target: { tabId: tabId },
      files: ["micss.css"]
  })
}; */