document.addEventListener('DOMContentLoaded', function(){
    browser.storage.local.get(["user", "welcome", "token", "instancia", "pod"], async function(items){
		validateLogin(items.token, items.user, items.welcome, items.instancia, items.pod);
    });

	function validateLogin(token, user, welcome, instancia, pod){
		touch(token, instancia).done(function (resposta) {
			initHome(token, user, welcome, instancia, pod);
		}).fail(function (xhr, status) {
			browser.storage.local.remove("token", function() {});
			navigateToLogin();
		});
	}

	async function initHome(token, user, welcome, instancia, pod){
		const [tab] = await browser.tabs.query({ active:true, currentWindow:true});
		const title = await executeScript(tab.id, () => document.title);
		const processo = title[0].result.substring(0, 25);
		
		if(!welcome){
			let span = document.createElement('span');
			span.id = 'btnClose';
			span.textContent = 'x';
			let b = document.createElement('b');
			b.textContent = " Bem-vindo(a), " + user+"!";
			let result = document.getElementById('divUsuario');
			result.appendChild(span);
			result.appendChild(b);
			$(".mensagem").css("display", "block");
			$(".mensagem").css("background-color", "#aeeece");
		}else{
			$('#ifrm').attr('height', 310);
		}

		$('#ifrm').attr('src', WEB + "?processo=" + processo + "&instancia=" + instancia + "&token=" + token + "&pod=" + pod)

		if($('#btnClose').length){
			document.querySelector('#btnClose').addEventListener('click',function(){
				$("#divUsuario").hide();
				$('#ifrm').attr('height', 310);
				browser.storage.local.set({ "welcome": true }, function(){});
			})
		}
	}

	const executeScript = (tabId, func) => new Promise(resolve => {
		browser.scripting.executeScript({ target: { tabId }, func }, resolve)
	  });

    function navigateToLogin(){
		browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var currTab = tabs[0];
			if (currTab) {
				browser.browserAction.setPopup({
					tabId: currTab.id,
					popup: "/views/login.html"
				});
				document.location.replace("login.html")
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
				browser.storage.local.set({ "backUrl": '/views/home.html' }, function(){});
			}
		});
	}
});