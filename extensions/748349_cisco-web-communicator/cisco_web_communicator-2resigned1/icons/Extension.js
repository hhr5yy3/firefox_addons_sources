var extension =  new Extension();

console.log("CwicExtension");

Extension.prototype.setMessageReceiver = function(messageReceiver)
{
    if(this.messageReceiver)
    {
        window.removeEventListener('addOnMessage', this.messageReceiver);
    }

    this.messageReceiver = messageReceiver;

};

Extension.prototype.sendMessage = function(message)
{
    console.log("Sending message to content script");

    var cwicMessageEvent = new CustomEvent('cwicMessage', {detail : message});
    window.dispatchEvent(cwicMessageEvent);
};

function Extension()
{
    console.log("Extension");
    var cwicMessageEvent = new CustomEvent('CwicInitialize');

    window.dispatchEvent(cwicMessageEvent);
    window.addEventListener('addOnMessage', onMessageReceived.bind(this));

    function onMessageReceived(message)
    {
        if(this.messageReceiver)
        {
            this.messageReceiver(message.detail);
        }
    }


}








