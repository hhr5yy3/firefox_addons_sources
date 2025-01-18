function postMessage(a,b,c) {
	chrome.runtime.sendMessage({a: a, b: b, c: c},
	function(response) {
		if (a==1) {
			if (response) {
				postMessage(2,false,false);
			} else {
				return;
			}
		} 
		else if (a==2 || a==3) {
			if (response) {
				document.getElementsByClassName('infoExternal')[0].value=response;	
				var element =  document.getElementById('checkextension');
				if (typeof(element) != 'undefined' && element != null)
				{
					document.getElementsByClassName('checkextension')[0].style.display="none";
				}
				var element =  document.getElementById('recaptchasolve');
				if (typeof(element) != 'undefined' && element != null)
				{
					document.getElementsByClassName('recaptchasolve')[0].style.display="block";
				}
							
			} 
		}
	});
}
		
function getMessage() {
	chrome.runtime.sendMessage({a: 4, b: false, c: false},
		function(response) {
			if (response) {
				document.getElementsByClassName('resultExternalJason')[0].value='{ "result" : [{ "a":'+response.result[0].a+' , "b":"'+response.result[0].b+'" }] }';
				return; 
			} else {
				return;
			}
		});
}
		
function checkResponse(a,b,c) {
	if (a) {
		postMessage(a,b,c);
		if (a==11 || a==12 || a==21 || a==22)
			checkResponse(false,false,false);
	} else {
		setTimeout(function(){
			getMessage();
			if (document.getElementsByClassName('resultExternalJason')[0].value) {
				return;
			} else {
				checkResponse(false,false,false);
			}
		}, 1000);
	}
}

window.addEventListener("message", function(event) {
    if (event.source != window)
        return;
    if (event.data.type && (event.data.type == "danfeonline")) {
		document.getElementsByClassName('resultExternalJason')[0].value="";
		document.getElementsByClassName('infoExternal')[0].value="";
		checkResponse(event.data.a,event.data.b,event.data.c);
    }
}, false);