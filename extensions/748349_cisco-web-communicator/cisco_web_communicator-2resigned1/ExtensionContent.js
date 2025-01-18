function ExtensionContent()
{
}

ExtensionContent.prototype.innerPort = null;
ExtensionContent.prototype.isInitialized = false;
ExtensionContent.prototype.extensionID = "jsdk@cisco.com";

ExtensionContent.prototype.initialize = function(message)
{
    if(!this.isInitialized)
    {
        var connectionInfo = {
            name : message.detail
        };

        this.innerPort = browser.runtime.connect(this.extensionID, connectionInfo);
        this.innerPort.onMessage.addListener(this.onAddOnMessageReceived.bind(this));

        var cwicInstanceInfo = {
            'id': message.detail,
            'url': window.location.href,
            'hostname': window.location.hostname ? window.location.hostname : "file://",
            'name': window.document.title
        };

        this.innerPort.postMessage({type : 'cwicClientConnected', content: cwicInstanceInfo});

        this.isInitialized = true;
    }
};

ExtensionContent.prototype.sendMessageToAddon = function(message)
{
    if(this.isInitialized)
    {
        this.innerPort.postMessage(message);
    }
};

ExtensionContent.prototype.sendMessageToCwic = function(message)
{
    var eventData = cloneInto(message, document.defaultView);
    var addOnEvent = new document.defaultView.CustomEvent("cwic-addon-message", {detail: eventData});
    document.defaultView.dispatchEvent(addOnEvent);
};

ExtensionContent.prototype.onCwicMessageReceived = function(message)
{
    if(message.currentTarget.location.origin != location.origin)
    {
        console.error("Invalid Origin");
        throw Error("Invalid Origin");
    }

    this.sendMessageToAddon(message.detail);
};

ExtensionContent.prototype.onAddOnMessageReceived = function(message)
{
    this.sendMessageToCwic(message);
};

ExtensionContent.prototype.exensionAvailable = function()
{
    var response = new document.defaultView.CustomEvent("cwic-extension-installed-response", {detail: ""});
    document.defaultView.dispatchEvent(response);
};

var CwicExtension = new ExtensionContent();

window.addEventListener("cwic-message", CwicExtension.onCwicMessageReceived.bind(CwicExtension));
window.addEventListener("cwic-extension-installed", CwicExtension.exensionAvailable.bind(CwicExtension));
window.addEventListener("cwic-initialize", CwicExtension.initialize.bind(CwicExtension));

