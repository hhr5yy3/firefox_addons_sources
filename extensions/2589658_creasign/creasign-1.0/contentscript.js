function InitializeCreaSignFfExtension()
{
	var creaSignExtensionDivId = "crea.creasign.ff.extension";
  var creaSignExtensionDiv = document.getElementById(creaSignExtensionDivId);
  
  if (!creaSignExtensionDiv)
  {
    creaSignExtensionDiv = document.createElement("div");
    creaSignExtensionDiv.id = creaSignExtensionDivId;
    creaSignExtensionDiv.style.display = "none";
    
    document.body.appendChild(creaSignExtensionDiv);   
  }	
}

window.addEventListener("message", function(event) {
	
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "crea.creasign.ff.initializeExtension")) 
  {
    InitializeCreaSignFfExtension();
  } 
  else if (event.data.type && (event.data.type == "crea.creasign.ff.sendToCreaSign")) 
  {
    browser.runtime.sendMessage({ action: "crea.creasign.ff.sendToCreaSign", dataToPost: event.data.dataToPost });
  }   
   
}, false);

