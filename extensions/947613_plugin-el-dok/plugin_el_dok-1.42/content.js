//$(document).ready(function ()
//{
	try{
window.addEventListener('message', function(e) {
		
		if (e.data.type && (e.data.type == "ELDOK_EXT_MSG")) 
		{
			console.log(e.data.type);
		//	alert(e.data.type);
			browser.runtime.sendMessage(e.data);

			
		}
	});
	}
	catch(e)
	{
		console.log(e);
	}
//});

browser.runtime.onMessage.addListener(
 function(request, sender) {
	// alert('ELDOK_EXT_MSG_RESPO');
     window.postMessage({ type: "ELDOK_EXT_MSG_RESPO", FunkcjaCallBack: request.CallBackFunk , Return : request.Return }, "*");
  });

