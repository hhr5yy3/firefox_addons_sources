document.addEventListener('DOMContentLoaded', function(){
	browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
		let url = tabs[0]?.url;
		if(url){
			browser.cookies.get({"url": url, "name": KEYCLOAK_IDENTITY}).then((cookie) => {
				let token = cookie.value
				if(token){
					validateLogin(token);
				}
			});
		}
	});

	function validateLogin(token){
		browser.storage.local.get(["instancia"], function(items){
			touch(token, items.instancia).done(function (resposta) {
				browser.storage.local.set({ 
					"token": token, 
					"user": resposta.name
				}, function(){
					navigateToHome();
				}
			);
			}).fail(function (xhr, status) {
				browser.storage.local.remove("token", function() {});
				let result = document.getElementById('login-message');
				result.className = "error-message";
				result.textContent = "Sua sessão no PJE expirou, atualize a página e tente novamente.";
			});
		});
	}

	function navigateToHome(){
		browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var currTab = tabs[0];
			if (currTab) {
				browser.browserAction.setPopup({
					tabId: currTab.id,
					popup: "/views/home.html"
				});
				document.location.replace("home.html")
			}
		});
	}

	document.querySelector('#btnNavigate').addEventListener('click',function(){
		navigateToNugep();
	}) 

	function navigateToNugep(){
		browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var currTab = tabs[0];
			if (currTab) {
				browser.browserAction.setPopup({
					tabId: currTab.id,
					popup: "/views/extensaonugep.html"
				});
				document.location.replace("extensaonugep.html")
				browser.storage.local.set({ "backUrl": '/views/login.html' }, function(){});
			}
		});
	}
})