var port = chrome.runtime.connect({name: "dummy_mctgb"});
var target;

window.addEventListener('mousedown', function(mouseEvent) {
	if(mouseEvent.button != 1)		
		return;
	target = mouseEvent.target;
	if(target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement)
		return;
	mouseEvent.preventDefault();
	mouseEvent.stopPropagation();
}, true);

window.addEventListener('mouseup', function(mouseEvent) { 
	if(mouseEvent.button != 1)		
		return; 
	var t = mouseEvent.target;

	if(target != t){		
		//alert("target!=t");
		return; 
	}

	var doReturn = 0;

	try{
		if(t instanceof HTMLIFrameElement || t instanceof HTMLTextAreaElement || t instanceof HTMLInputElement || t.getAttribute('href')!=null || t.parentNode.getAttribute('href')!=null || t.parentNode.parentNode.getAttribute('href')!=null || t.parentNode.parentNode.parentNode.getAttribute('href')!=null){
			//alert("returning: "+t);
			doReturn = 1;
		}
	}
	catch(err){
		//alert("error: "+err);
	}
	finally{
		if(doReturn)
			return;
		mouseEvent.preventDefault();
		mouseEvent.stopPropagation();
		//alert("posting message");
		port.postMessage({action: "GoBackOrRemoveTab"});
	}
}, true);


