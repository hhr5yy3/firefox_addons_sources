browser.runtime.sendMessage({ "newIconPath" : "assets/img/pje-icon-active.png" });
browser.runtime.sendMessage({ "scripting" : "numeroProcesso"});
sleep(1000).then(() => {
	browser.storage.local.get(["token", "processo", "instancia"], function(items){
		touch(items.token, items.instancia).done(function (resposta) {
			setIcon(items.token, items.instancia, items.processo);
			browser.storage.local.set({ 
				"user": resposta.name
			}, function(){
				browser.runtime.sendMessage({ "navigate" : "views/home.html"});
			});
		}).fail(function (xhr, status) {
			browser.storage.local.remove("token", function() {});
			browser.runtime.sendMessage({ "navigate" : "views/login.html"});
		});
	});
});

function setIcon(token, instancia, processo){
	checkServices(token, instancia, processo).done(function (resposta) {
		if("U" == resposta.nivelAlerta) {
			let isUrgent = true;
			setInterval(() => {
				if (isUrgent) {
					browser.runtime.sendMessage({ "newIconPath" : "assets/img/pje-icon-active-match-urgent.png" });
				} else {
					browser.runtime.sendMessage({ "newIconPath" : "assets/img/pje-icon-active-match.png" });
				}
				isUrgent = !isUrgent;
			  }, 300);
		} else if(resposta.existeInformacoesProcesso){
			browser.runtime.sendMessage({ "newIconPath" : "assets/img/pje-icon-active-match.png" });
		} else {
			browser.runtime.sendMessage({ "newIconPath" : "assets/img/pje-icon-active.png" });
		}
	}).fail(function (xhr, status) {
		browser.runtime.sendMessage({ "newIconPath" : "assets/img/pje-icon-active.png" });
	});
}

function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}