var Storage = {
	manage: function(param,value){
		param = 'SF_TEASER.'+param;
		if(value === undefined){ return localStorage.getItem(param); }else{ localStorage.setItem(param,value); }
	}
};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if( request.get )	{ sendResponse(Storage.manage(request.get)); }
	if( request.set )	{ Storage.manage(request.set, request.value); }
	if( request.clear )	{ localStorage.clear(); }
	if( request.popup )	{ opentab(request.popup) }
	if( request.setkey ){
		setKey(request, sender, sendResponse);
		return true;			
	}
});

function opentab(popup){ chrome.tabs.create({url:popup}); }

function setKey(request, sender, sendResponse)
{
	var key = Storage.manage('key');
	var result = sendResponse;
	var state_ex, state2_ex;
	var version_ex = "1.1.7";
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://seo-fast.ru/site_expansion/check_auth.php?key="+key, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status === 200){
				var resp = JSON.parse(xhr.responseText);
				if(resp.success){
					if(resp.version_ex != version_ex){
						chrome.browserAction.setIcon({ path: "img/icon48_off.png" });
					}else{
						chrome.browserAction.setIcon({ path: "img/icon48.png" });
					}
					if(key){
						if(resp.key != key){
							Storage.manage('key', resp.key);
							result(resp.key);
							return true;
						}else{
							if(resp.show_a != null){ if(resp.show_a == 1){ state_ex = true; chrome.browserAction.setIcon({ path: "img/icon48.png" }); }else{ state_ex = false; chrome.browserAction.setIcon({ path: "img/icon48_off.png" }); } Storage.manage('state', state_ex); }
							if(resp.show_t != null){ if(resp.show_t == 0){ state2_ex = true; }else{ state2_ex = false; } Storage.manage('state2', state2_ex); }
							if(resp.position_w != null){ Storage.manage('position_w', resp.position_w); }
							result(key);
							return true;
						}
					}else{
						Storage.manage('key', resp.key);
						result(resp.key);
						return true;
					}
				}else if(resp.error){ chrome.browserAction.setIcon({ path: "img/icon48_off.png" }); localStorage.clear(); }
				result(false);
				return false;
			}else{
				console.log(xhr.status);	
			}
		}
	}
	xhr.send();
}