document.addEventListener('DOMContentLoaded', function(){

	document.getElementById('btnClearStorage').addEventListener('click', () => {
		const modal = document.getElementById('confirmacaoModal');
		const closeModal = document.getElementsByClassName('close')[0];
		const confirmButton = document.getElementById('confirmar');
		const cancelButton = document.getElementById('cancelar');
	
		modal.style.display = "block";
	
		closeModal.onclick = () => { modal.style.display = "none"; };
	
		cancelButton.onclick = () => { modal.style.display = "none"; };
	
		confirmButton.onclick = () => {
			browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				const currentTab = tabs[0];
				const url = new URL(currentTab.url);
				const origin = url.origin;
	
				// Limitar a remoção de cookies à aba ativa
				browser.cookies.getAll({ url: origin }, (cookies) => {
					cookies.forEach((cookie) => {
						browser.cookies.remove({
							url: `${origin}${cookie.path}`,
							name: cookie.name
						});
					});
				});
	
				// Limpar outros dados de navegação da aba ativa sem afetar cookies importantes de outras abas, removi o "cookies"=true, estava matando o token 2fa do google.
				browser.browsingData.remove({
					hostnames: [url.hostname]
				}, {
					"localStorage": true,
					"indexedDB": true,
					"cache": true,
				}, () => {
					console.log(`Dados da aba ativa no domínio ${origin} foram limpos, exceto cookies críticos.`);
				});

				executeScript(currentTab.id, clearSessionStorage);
			});
	
			modal.style.display = "none"; 
		};
	});

	const executeScript = (tabId, func) => browser.scripting.executeScript({
		target: { tabId },
		func
	}, () => {
		console.log("Session storage da aba ativa limpo.");
		alert("Todos os dados da aba ativa foram limpos!");
	});
	
	function clearSessionStorage() {
		sessionStorage.clear();
		console.log('Session storage da aba ativa limpo.');
	}
})

