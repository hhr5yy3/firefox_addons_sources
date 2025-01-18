var port = null;
var tabID;
var maxX = "";
var maxY = "";
var guid = "";

var statusMsg = "Topaz Adobe Sign Extension SigCapture failed to start, may be another instance already running.";

chrome.runtime.onMessage.addListener(function(request) {	
    var result = null;		
    console.log("Tz Adobe Sign Firefox Background Extension - onMessage() called.");	
    if (request.type && (request.type == 'request_open')) {		
        var hostName = "com.topaz.adcextension.win";
        console.log("Tz Adobe Sign Firefox Background Extension - Before connectNative.");
        if (port == null) {
			try 
			{
            chrome.tabs.query({ url: request.siteUrl, active: true }, function(arrayOfTabs) {
                // since only one tab should be active and in the current window at once
                // the return variable should only have one entry
				//currentWindow: true,							
                tabID = arrayOfTabs[0].id;				
                console.log("Tz Adobe Sign Firefox Background Extension - Current Tab ID : " + tabID);
            });
			}
			catch(err)
			{
				console.log(err.message);
			}
            guid = request.GUID;
            port = chrome.runtime.connectNative(hostName);
            console.log("Tz Adobe Sign Firefox Background Extension - After connectNative.");
            if (port != null) {
                console.log("Tz Adobe Sign Firefox Background Extension - Port is not null.");
            }
			else
				console.log("Tz Adobe Sign Firefox Background Extension - Port is null.");
            port.onMessage.addListener(onNativeMessage);
            port.onDisconnect.addListener(onDisconnected);
            chrome.tabs.executeScript(null, { code: 'ClearStatusMsg();' });
            openConnection();
        }
        else {
            if (request.GUID != guid) {
				 console.log("Tz Adobe Sign Firefox Background Extension - Another instance already running.");
                chrome.tabs.executeScript(null, { code: 'ShowStatusMsg("' + false + '","' + statusMsg + '");' });
            }
        }
    }
    else if (request.type && (request.type == 'request_close')) {
        if (port != null) {
            if (request.GUID == guid) {
				console.log("Tz Adobe Sign Firefox Background Extension - Before close connection.");
                closeConnection();
            }
        }
    }
	
});

// Open a Connection (openConnection Method)
function openConnection() {
    console.log("Tz Adobe Sign Firefox Background Extension - Open connection.");
    message = { "command": "OPEN" };	
    port.postMessage(message);
	console.log("Tz Adobe Sign Firefox Background Extension - Open connection - Post message : " + JSON.stringify(message));
}

// Receiving response from Native Host (onNativeMessage Event)
function onNativeMessage(message) {	
    console.log("Tz Adobe Sign Firefox Background Extension - onNativeMessage : " + JSON.stringify(message));
    var message1 = message;
    var obj = JSON.parse(JSON.stringify(message1));	
    if (obj.command == "OPEN") {
        if (obj.status == 0) {
            console.log("Tz Adobe Sign Firefox Background Extension - Connection to NMH failed.");
            chrome.tabs.executeScript(tabID, { code: 'ShowStatusMsg(' + false + ');' });
        }
        else if (obj.status == 1) {
            console.log("Tz Adobe Sign Firefox Background Extension - Connection to NMH successfull.");
            chrome.tabs.executeScript(tabID, { code: 'ShowStatusMsg(' + true + ');' });
            maxX = obj.maxx;
            maxY = obj.maxy;
            chrome.tabs.executeScript(tabID, { code: 'CalculateScalingFactors(' + maxX + ',' + maxY + ');' });
        }
    }
    else if (obj.command == "POINT") {
		console.log("Tz Adobe Sign Firefox Background Extension - Received points from NMH.");
        chrome.tabs.executeScript(tabID, { code: 'ScaleAndDrawSignatureTZ(' + obj.X + ',' + obj.Y + ',' + obj.P + ');' });
    }
}
// Register event for chrome window closed 
chrome.windows.onRemoved.addListener(browserShutDown);
/** browserShutDown listener implementation */
function browserShutDown() {
    closeConnection();
}

// Disconnect (onDisconnected Event)
function onDisconnected() {	 
   // console.log("Tz ADC Firefox Background Extension - port.error.message : " + port.error.message);
	chrome.tabs.executeScript(tabID, { code: 'ShowStatusMsg("' + false + '","' +" "+ '");' });
	console.log("Tz Adobe Sign Firefox Background Extension - Disconnected from NMH.");
    port = null;
}
//Closes the connection
function closeConnection() {
    console.log("Tz Adobe Sign Firefox Background Extension - Close Connection.");
    message = { "command": "CLOSE" };
    port.postMessage(message);
	console.log("Tz Adobe Sign Firefox Background Extension - Close Connection - Post message : " + JSON.stringify(message));
    port = null;
}
