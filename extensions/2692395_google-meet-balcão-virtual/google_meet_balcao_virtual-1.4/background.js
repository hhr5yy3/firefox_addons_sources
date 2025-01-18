browser.runtime.onInstalled.addListener(function(details) {
	if(details.reason == "install"){
		browser.storage.local.set({
			nm_orgao: "",
			nm_sala_1: "",
			lk_sala_1: "",
			ck_sala_1_lock: false,
			ck_sala_1_ring: false,
			nm_sala_2: "",
			lk_sala_2: "",
			ck_sala_2_lock: false,
			ck_sala_2_ring: false,
			nm_sala_3: "",
			lk_sala_3: "",
			ck_sala_3_lock: false,
			ck_sala_3_ring: false,
			nm_sala_4: "",
			lk_sala_4: "",
			ck_sala_4_lock: false,
			ck_sala_4_ring: false,
			nm_sala_5: "",
			lk_sala_5: "",
			ck_sala_5_lock: false,
			ck_sala_5_ring: false,
			lista_avisos: ["Aguarde, já iremos atendê-lo. Obrigado.","Dúvidas? Utilize o chat!","Conciliação é a melhor solução.","",""]
		}, function() {});
	}else if(details.reason == "update"){
		browser.storage.local.set({
			lista_avisos: ["Aguarde, já iremos atendê-lo. Obrigado.","Dúvidas? Utilize o chat!","Conciliação é a melhor solução.","",""]
		}, function() {});
	}
});

function notify(message) {
    switch (message.tipo) {
		case 'abrirConfiguracoes':
            browser.runtime.openOptionsPage()
            break
        case 'popUp':
			popUP(message.valor);
			break
		case 'criarAlerta':
			Alerta(message.valor);
			break
        default:
            console.error('Mensagem com tipo invalido: ' + message.tipo)
    }
}

function Alerta(mensagem, id='') {
	chrome.notifications.getAll((items) => {
		if ( items ) {
			for (let key in items) {
				chrome.notifications.clear(key);
			}
		}
	});
	chrome.notifications.create(id, {
		type: 'list',
		iconUrl: 'icons/ico_64.png',
		title: 'Google Meet Balcão Virtual',
		message: mensagem
	},function() {/*console.log('ALERTA: ' + mensagem);*/});
}

function popUP(mensagem) {
	chrome.tabs.create({url: chrome.extension.getURL('pauta.html?Orgao=' + mensagem)});
}

browser.runtime.onMessage.addListener(notify);