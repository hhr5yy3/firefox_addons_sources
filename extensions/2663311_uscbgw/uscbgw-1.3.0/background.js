var portToNativeApp;
var isConnected = false;
var tabs = [];
var greeen = "color: green;";

Array.prototype.remove = function(v) {
    if(this.indexOf(v) != -1) 
    {
        this.splice(this.indexOf(v), 1);
        return true;
    }
    
    return false;
}

browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
  	if(tabs.includes(tabId))
  	{
		tabs.remove(tabId);
	}
});

function onError(error) 
{
	console.error(`Error: ${error}`);
}

function sendResponseToCS(data)
{
	browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
  		browser.tabs.sendMessage(tabs[0].id, data)
  			.catch(onError);
	}).catch(onError);
}

function handleMessage(request, sender, sendResponse) {
	if(request.newtab == "newtab")
  	{
  		sendResponseToCS({response: request.newtab});	// Zurücksenden
  		if(sender.tab)
		{
			let tabId = sender.tab.id;
			if(!tabs.includes(tabId))
				tabs.push(tabId);
		}
  	}
  	else if(request.type == "connect") 
    {
    	if(!isConnected)
    	{
    		portToNativeApp = browser.runtime.connectNative("USCBGateway");
    		
    		portToNativeApp.onMessage.addListener(response => {
				sendResponseToCS(response);
			});
			
			if(!isConnected)
    			isConnected = true;
    	}

    	portToNativeApp.onDisconnect.addListener(event => {
			isConnected = false;
  			if(event.error)
  			{
  				console.error(event.error.message);
  				sendResponseToCS({response:"err#" + event.error.message});
  			}
  			else
  			{
  				sendResponseToCS({response:"disconnected"});
  			}
		});
    }
    else if(request.type == "disconnect")
    {
    	console.log("BS Verbindung zur nativen Applikation schließen...");
    	console.log("%cAnzahl Tabs %i", greeen, tabs.length);
    	if(portToNativeApp && tabs.length === 0)
    	{
    		isConnected = false;
    		portToNativeApp.disconnect();
    	}
    }
    else if(request.type == "msg")
    {
    	portToNativeApp.postMessage(request.text);
    }	
}

browser.runtime.onMessage.addListener(handleMessage);
