function ExtensionBackground()
{
    this.cwicInstanceInfo = {}
}

ExtensionBackground.prototype.onExtensionContentConnected = function(port)
{
    console.log("Cwic connected");
    if(Object.keys(this.ports).length === 0)
    {
        this.nativePort = chrome.runtime.connectNative("com.cisco.jsdk");
        this.nativePort.onMessage.addListener(this.onAddOnMessageReceived.bind(this));
        this.nativePort.onDisconnect.addListener(this.onAddonDisconnect.bind(this));
    }
    
    this.ports[port.name] = port;
    port.onMessage.addListener(this.onCwicMessageReceived.bind(this));
    port.onDisconnect.addListener(this.onCwicDisconnect.bind(this, [port.name]));
};

ExtensionBackground.prototype.onCwicDisconnect = function(portName)
{
    console.log("Cwic disconnected");
    delete this.ports[portName];
    if(Object.keys(this.ports).length === 0)
    {
        this.nativePort.disconnect();
    }
    else
    {
        var message =  {
            ciscoChannelMessage : {
                client : this.cwicInstanceInfo[portName[0]],
                clientConnected : false
            }
        };

        this.nativePort.postMessage(message)
    }
};

ExtensionBackground.prototype.onAddonDisconnect = function()
{
    var message = {
        ciscoChannelMessage :
        {
            ciscoChannelServerMessage : {
                "name" : "HostDisconnect",
                "cause" : "test"
            }
        }
    };

    this.onAddOnMessageReceived(message);
    /*for(var portName in this.ports)
    {
        if(this.ports.hasOwnProperty(portName))
        {
            this.ports[portName].postMessage(message);
        }
    }*/
    this.nativePort.disconnect();
};

ExtensionBackground.prototype.onCwicMessageReceived = function(message)
{
    if(message.type == "cwicClientConnected")
    {
        this.cwicInstanceInfo[message.content.id] = message.content;
    }
    else
    {
        console.log("Received message from ExtensionContent.");
        this.nativePort.postMessage(message);
    }
};

ExtensionBackground.prototype.onAddOnMessageReceived = function(message)
{
    console.log("Received message from Add-on.");
    for(var portName in this.ports)
    {
        if(this.ports.hasOwnProperty(portName))
        {
            this.ports[portName].postMessage(message);
        }
    }

    //this.port.postMessage(message);
};

ExtensionBackground.prototype.ports = {};
ExtensionBackground.prototype.port = null;
ExtensionBackground.prototype.nativePort = null;

var isInitialized = false;

function initilize()
{
    if(!isInitialized)
    {
        var extensionBackground = new ExtensionBackground();
        chrome.runtime.onConnect.addListener(extensionBackground.onExtensionContentConnected.bind(extensionBackground));
        isInitialized = true;
    }
}

initilize();

