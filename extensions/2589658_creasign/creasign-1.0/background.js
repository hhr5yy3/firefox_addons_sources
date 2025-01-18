function handleMessage(request, sender, sendResponse) 
{
  if (request && request.action == 'crea.creasign.ff.sendToCreaSign') 
  {
    var hostName = "com.crea.creasign.ff";
    var messageToPost = { "text": request.dataToPost };
	  
	  var sending = browser.runtime.sendNativeMessage(
	    hostName,
	    messageToPost);
  }
}

browser.runtime.onMessage.addListener(handleMessage);