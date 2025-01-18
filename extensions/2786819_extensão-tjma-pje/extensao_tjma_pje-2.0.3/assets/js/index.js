document.addEventListener('DOMContentLoaded', function(){

	document.querySelector('#btnNavigate').addEventListener('click',function(){
		navigateToNugep();
	}) 

	function navigateToNugep(){
		browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var currTab = tabs[0];
			if (currTab) {
				browser.browserAction.setPopup({
					tabId: currTab.id,
					popup: "views/extensaonugep.html"
				});
				document.location.replace("views/extensaonugep.html")
				browser.storage.local.set({ "backUrl": '/index.html' }, function(){});
			}
		});
	}

	browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const currentTab = tabs[0];
		browser.runtime.sendMessage({ "pod" : currentTab.url});
		setInterval(() => {
			browser.storage.local.get("pod", (result) => {
				const podInfoElement = document.getElementById('podInfo');
				if (result.pod) {
					podInfoElement.textContent = `POD atual: ${result.pod}`;
				} else {
					podInfoElement.textContent = "POD atual: Não disponível";
				}
			});
		}, 300);
	});
})