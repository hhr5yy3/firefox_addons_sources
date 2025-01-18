document.addEventListener('DOMContentLoaded', function(){

	$('#ifrmIndex').attr('src', EXTENSAONUGEP)

	document.querySelector('#btnVoltar').addEventListener('click',function(){
        navigateToBack();
	})

	function navigateToBack(){
		browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var currTab = tabs[0];
			if (currTab) {
				browser.storage.local.get(["backUrl"], function(item){
					if(item.backUrl){
						browser.browserAction.setPopup({
							tabId: currTab.id,
							popup: item.backUrl
						});
						document.location.replace(item.backUrl)
					}
				})
			}
		});
	}

})