var checkCadeado;
var qtde_pessoas = 1;
var preferencias = [];
var observerQtdePessoas, observerPedidos;
var campainha = false;
var cadeado = false;

browser.storage.local.get(null, function(configuracoes){
		preferencias = configuracoes;
		executar();
	}
);

function executar() {
	console.log("google meet balcão virtual");

	var check = setInterval(function() {
		if (document.querySelector('button[aria-label="Sair da chamada"]')) {
			//identifica os campos variáveis da página, que serão utilizados na extensão, para facilitar as próximas atualizações
			let el = document.querySelector('div[jscontroller="SKibOb"]'); ;//campo que contém a quantidade de pessoas na sala
			el.id = "extensao_meet_qtde_pessoas";
			
			let el2 = document.querySelector('div[jscontroller="yEvoid"]') || document.querySelector('div[jsname="NeC6gb"]'); //nome da sala Original - NeC6gb versão anterior
			
			el2.id = "extensao_meet_nm_sala_original";
			//******************
			
			incluirBotoes();
			
			//inicia o monitor de qtde de pessoas na sala
			var target1 = document.getElementById('extensao_meet_qtde_pessoas');
			observerQtdePessoas = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (campainha){
						let qtde = parseInt(document.getElementById('extensao_meet_qtde_pessoas').innerText);
						// console.log(qtde + " > " + qtde_pessoas);
						if (qtde > qtde_pessoas) {
							som_chamada();
						}
						qtde_pessoas = parseInt(document.getElementById('extensao_meet_qtde_pessoas').innerText);
						// console.log("Existe(m) " + qtde_pessoas + " pessoa(s) na sala de reunião");
					}
				});
			});		
			var config1 = { childList: true, characterData: true, subtree:true }
			observerQtdePessoas.observe(target1, config1); //inicia o MutationObserver 1
			
			//inicia o monitor de pedidos para entrar na sala
			var target2 = document.body;
			observerPedidos = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (!mutation.addedNodes[0]) {return}
					if (!mutation.addedNodes[0].innerText) {return}
					if (!mutation.addedNodes[0].innerText) {return}
					if (!mutation.addedNodes[0].innerText.includes("Alguém quer participar desta chamada")) {return}
					let bt = querySelectorByText('BUTTON', 'Permitir');
					if (bt) {
						// console.log("cadeado: " + cadeado);
						if (cadeado){
							// console.log("autorizada a entrada")
							bt.click();
						} else {
							if (campainha){
								som_chamada();
							}
						}
					}
				});
			});
			var config2 = { childList: true, characterData: true, subtree:true };
			observerPedidos.observe(target2, config2); //inicia o MutationObserver 2
			
			
			setTimeout(function(){
				if (preferencias.lk_sala_1 != "" && document.location.href.search(preferencias.lk_sala_1) > -1) {
					document.getElementById("extensao_meet_nomeSala").innerText = preferencias.nm_sala_1;
					document.querySelector('title').innerText = preferencias.nm_sala_1; //MUDA O NOME NA ABA DO NAVEGADOR
					cadeado = preferencias.ck_sala_1_lock;
					campainha = preferencias.ck_sala_1_ring;
				} else if (preferencias.lk_sala_2 != "" && document.location.href.search(preferencias.lk_sala_2) > -1) {
					document.getElementById("extensao_meet_nomeSala").innerText = preferencias.nm_sala_2;
					document.querySelector('title').innerText = preferencias.nm_sala_2; //MUDA O NOME NA ABA DO NAVEGADOR
					cadeado = preferencias.ck_sala_2_lock;
					campainha = preferencias.ck_sala_2_ring;
				} else if (preferencias.lk_sala_3 != "" && document.location.href.search(preferencias.lk_sala_3) > -1) {
					document.getElementById("extensao_meet_nomeSala").innerText = preferencias.nm_sala_3;
					document.querySelector('title').innerText = preferencias.nm_sala_3; //MUDA O NOME NA ABA DO NAVEGADOR
					cadeado = preferencias.ck_sala_3_lock;
					campainha = preferencias.ck_sala_3_ring;
				} else if (preferencias.lk_sala_4 != "" && document.location.href.search(preferencias.lk_sala_4) > -1) {
					document.getElementById("extensao_meet_nomeSala").innerText = preferencias.nm_sala_4;
					document.querySelector('title').innerText = preferencias.nm_sala_4; //MUDA O NOME NA ABA DO NAVEGADOR
					cadeado = preferencias.ck_sala_4_lock;
					campainha = preferencias.ck_sala_4_ring;
				} else if (preferencias.lk_sala_5 != "" && document.location.href.search(preferencias.lk_sala_5) > -1) {
					document.getElementById("extensao_meet_nomeSala").innerText = preferencias.nm_sala_5;
					document.querySelector('title').innerText = preferencias.nm_sala_5; //MUDA O NOME NA ABA DO NAVEGADOR
					cadeado = preferencias.ck_sala_5_lock;
					campainha = preferencias.ck_sala_5_ring;
				} else {
					document.getElementById("extensao_meet_nomeSala").innerText = el2.innerText;
					document.querySelector('title').innerText = document.getElementById("extensao_meet_nomeSala").innerText; //MUDA O NOME NA ABA DO NAVEGADOR
				}
			}, 2000);
			clearInterval(check);
		}			
	}, 1000); // 1 segundo
}

function incluirBotoes() {	
	//CRIA O USO DE FONTES (fontawesome.com)
	let fnt = document.createElement("link");
	fnt.type = "text/css";
	fnt.rel = "stylesheet";
	fnt.href = "https://pro.fontawesome.com/releases/v5.13.0/css/all.css";
	document.querySelector('head').appendChild(fnt);
	
	//DESCRIÇÃO: cria o tooltip
	let sheet = window.document.styleSheets[0];
	sheet.insertRule('[extensao-meet-data-tooltip] {position: relative; cursor: pointer;}', sheet.cssRules.length);
	sheet.insertRule('[extensao-meet-data-tooltip]:before {content: attr(extensao-meet-data-tooltip); display: none; position: absolute; top: -10px; left: 45px; width: auto; white-space:nowrap; z-index: 2; padding: 10px; margin-top: 10px; text-decoration: none; font-family: "NunitoSans Regular", "Arial", sans-serif; font-size: 14px; font-weight: 500; background: black;	color: white; border-radius: 5px; box-shadow: 3px 3px 10px black;}', sheet.cssRules.length);
	sheet.insertRule('[extensao-meet-data-tooltip]:hover:before {display: inline-block;}', sheet.cssRules.length);
	
	//DESCRIÇÃO: cria a estrutura base dos botões
	let barra_atalhos = document.createElement("div");
	barra_atalhos.id = "extensao_meet_barra_atalhos";
	barra_atalhos.style = 'z-index: 100; width: 50px;  position: absolute; display: flex; flex-direction: column; left: 0px; top: 50px; height: auto;';	
	document.body.appendChild(barra_atalhos);
	bt_atalhos();
	
	function bt_atalhos() {
		//DESCRIÇÃO: INSERIR TAG COM O NOME DA SALA
		if (!document.getElementById("extensao_meet_nomeSala")) {
			let botao1 = document.createElement("a");
			let i1 = document.createElement("i");
			botao1.id = "extensao_meet_nomeSala";
			botao1.title = "Clique para mudar o nome da sala";
			botao1.style = "cursor: pointer; position: absolute; left: 5px; top: 10px; text-align: left; font-size: 1.5rem; font-weight: bold; background-color: rgb(32, 33, 36); color: white; z-index: 1; padding: 4px 10px; border-radius: 6px 6px 6px 6px; opacity: 0.8;";
			botao1.innerText = document.getElementById('extensao_meet_nm_sala_original').innerText;
			botao1.onmouseover = function () {botao1.style.opacity = '0.5'};
			botao1.onmouseout = function () {botao1.style.opacity = '1'};
			botao1.onclick = function () {
				this.innerText = prompt("Informe o nome da sala", this.innerText);
				document.querySelector('title').innerText = document.getElementById("extensao_meet_nomeSala").innerText; //MUDA O NOME NA ABA DO NAVEGADOR
				document.getElementById('extensao_meet_nm_sala_original').innerText = document.getElementById("extensao_meet_nomeSala").innerText; //MUDA O NOME NA PÁGINA
			};				
			botao1.appendChild(i1);				
			document.body.appendChild(botao1);
		}
		
		let estiloBotao = "cursor: pointer; position: relative; left: 5px; width: 30px;  font-size: 1.5rem; font-weight: bold; color: white; text-align: center; z-index: 1; background-color: rgb(32, 33, 36); padding: 5px 5px; border-radius: 6px; margin-top: 10px; opacity: 0.5;";
		
		//DESCRIÇÃO: INSERIR BOTÃO PARA ABRIR E FECHAR A SALA
		if (!document.getElementById("extensao_meet_cadeado")) {
			let botao2 = document.createElement("a");	
			botao2.id = "extensao_meet_cadeado";
			botao2.style = estiloBotao;
			botao2.setAttribute('extensao-meet-data-tooltip','Sala Fechada');
			botao2.onmouseover = function () {botao2.style.opacity = '1'};
			botao2.onmouseout = function () {botao2.style.opacity = '0.5'};
			botao2.onclick = function () {
				if (document.getElementById("extensao_meet_cadeado").getAttribute('extensao-meet-data-tooltip') == "Sala Fechada") {
					// console.log("ABRINDO cadeado");
					document.getElementById("extensao_meet_cadeado").setAttribute('extensao-meet-data-tooltip','Sala Aberta');
					document.getElementById("extensao_meet_button_img_cadeado").className = "fas fa-lock-open";
					cadeado = true;
				} else {
					// console.log("FECHANDO cadeado");
					document.getElementById("extensao_meet_cadeado").setAttribute('extensao-meet-data-tooltip','Sala Fechada');
					document.getElementById("extensao_meet_button_img_cadeado").className = "fas fa-lock";
					cadeado = false;
				}
			};
			let i2 = document.createElement("i");
			i2.id = "extensao_meet_button_img_cadeado";
			i2.className = "fas fa-lock";
			botao2.appendChild(i2);				
			barra_atalhos.appendChild(botao2);
		}
		
		//DESCRIÇÃO: INSERIR BOTÃO PARA LIGAR/DESLIGAR A CAMPAINHA
		if (!document.getElementById("extensao_meet_campainha")) {
			let botao6 = document.createElement("a");	
			botao6.id = "extensao_meet_campainha";
			botao6.style = estiloBotao;
			botao6.setAttribute('extensao-meet-data-tooltip','Campainha Desligada');
			botao6.onmouseover = function () {botao6.style.opacity = '1'};
			botao6.onmouseout = function () {botao6.style.opacity = '0.5'};
			botao6.onclick = function () {
				if (document.getElementById("extensao_meet_campainha").getAttribute('extensao-meet-data-tooltip') == "Campainha Desligada") {
					// console.log("LIGANDO Campainha");
					document.getElementById("extensao_meet_campainha").setAttribute('extensao-meet-data-tooltip','Campainha Ligada');
					document.getElementById("extensao_meet_button_img_campainha").className = "fas fa-bell";
					campainha = true;
				} else {
					// console.log("DESLIGANDO Campainha");
					document.getElementById("extensao_meet_campainha").setAttribute('extensao-meet-data-tooltip','Campainha Desligada');
					document.getElementById("extensao_meet_button_img_campainha").className = "fas fa-bell-slash";
					campainha = false;
				}
			};
			let i6 = document.createElement("i");
			i6.id = "extensao_meet_button_img_campainha";
			i6.className = "fas fa-bell-slash";
			botao6.appendChild(i6);				
			barra_atalhos.appendChild(botao6);
			
			//cria o elemento de audio na página
			let aviso = document.createElement('audio');
			aviso.id = 'extensao_meet_campainha_audio';
			aviso.setAttribute('preload', 'auto');
			let som = document.createElement('source');
			let url = chrome.runtime.getURL('icons/ring.mp3')
			som.setAttribute('src', url);
			som.setAttribute('type', 'audio/mpeg');			
			aviso.appendChild(som);
			
			document.body.appendChild(aviso);
		}
		
	}
}

function som_chamada() {
	// console.log("som_chamada");
	//efeito da extensão rodando em segundo plano
	let sheet = window.document.styleSheets[0];
	sheet.insertRule('.extensao_meet_executando {animation: animacao 0.5s infinite; animation-fill-mode: both;}', sheet.cssRules.length);	
	sheet.insertRule('@keyframes animacao {0% {translate(1px, 1px) rotate(0deg);}10% { transform: translate(-1px, -2px) rotate(-1deg); }20% { transform: translate(-3px, 0px) rotate(1deg); }30% { transform: translate(3px, 2px) rotate(0deg); }40% { transform: translate(1px, -1px) rotate(1deg); }50% { transform: translate(-1px, 2px) rotate(-1deg); }60% { transform: translate(-3px, 1px) rotate(0deg); }70% { transform: translate(3px, 1px) rotate(-1deg); }80% { transform: translate(-1px, -1px) rotate(1deg); }90% { transform: translate(1px, 2px) rotate(0deg); }100% { transform: translate(1px, -2px) rotate(-1deg); }}', sheet.cssRules.length);
	
	if (!document.getElementById('extensao_meet_janela_fundo')) {
		let elemento_fundo = document.createElement("div");
		elemento_fundo.id = 'extensao_meet_janela_fundo';
		elemento_fundo.style = 'position: fixed;width: 100%;height: 100%;top: 0px;left: 0px;right: 0px;bottom: 0px;background: rgba(0, 0, 0, 0.9);z-index: 10000;display: flex;align-items: center;justify-content: center;color: rgb(255, 255, 255);text-align: center;';	
		elemento_fundo.className = 'fade-in';
		
		let botaoAtenderChamada = document.createElement("a");	
		botaoAtenderChamada.id = "extensao_meet_botaoAtenderChamada";
		botaoAtenderChamada.style = "cursor: pointer; font-size: 1.5rem; font-weight: bold; color: white; z-index: 1000; background-color: green; padding: 30px; border-radius: 6px; margin-top: 10px; opacity: 1;width: 200px; display: flex;flex-direction: column;justify-content: center;align-items: center;width: 50%;";
		botaoAtenderChamada.textContent = "Atender";
		botaoAtenderChamada.className = 'extensao_meet_executando';
		botaoAtenderChamada.onclick = function () {
			let bt = querySelectorByText('BUTTON', 'Permitir');
			if(bt){bt.click();qtde_pessoas++;};
			clearInterval(check);
			elemento_fundo.remove();
		};
		elemento_fundo.appendChild(botaoAtenderChamada);
		document.body.appendChild(elemento_fundo);
		
		//TOQUE
		//o primeiro toque é imediato
		document.getElementById('extensao_meet_campainha_audio').play();	
		let check = setInterval(function() {
			if (document.querySelector('div[class*="mVuLZ"]')) {
				if (document.querySelector('div[class*="mVuLZ"]').textContent.toLowerCase() == "#atender") {
					clearInterval(check);
					elemento_fundo.remove();
				}			
			}
			document.getElementById('extensao_meet_campainha_audio').play();
		}, 4000); // 4 segundos
	}
}

function querySelectorByText(elemento, texto){
	return Array.from(document.querySelectorAll(elemento)).find(el => el.textContent.includes(texto));
}

document.addEventListener('keydown', function(event) {
	//pagina para obter os event.codes : https://keycode.info/
	if (event.getModifierState("Alt")) {
		if (event.code === "Digit1" || event.code === "Numpad1") {
			// incluirBotoes();
		} else if (event.code === "Digit2" || event.code === "Numpad2") {
			// document.getElementById('extensao_meet_barra_atalhos').textContent = "";
			// document.getElementById('extensao_meet_barra_atalhos').remove();
			// document.getElementById('extensao_meet_nomeSala').remove();
			// document.getElementById('extensao_meet_cronometro').remove();
			som_chamada();
		}
	}
});