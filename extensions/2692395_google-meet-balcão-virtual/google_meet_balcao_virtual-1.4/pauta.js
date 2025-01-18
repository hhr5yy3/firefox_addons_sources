var mensagem = [];

// var mensagem = ["Senhores, favor manter seu microfone e câmera desligados para não atrapalhar a audiência e preservar sua privacidade. Obrigado.","Favor entrar na sala de audiências apenas quando for chamado. Obrigado.","Dúvidas? Utilize o chat!","Conciliação é a melhor solução.",""];
function iniciar() {
	function parametrosUrl() {
		var result = {}, keyValuePairs = location.search.slice(1).split("&");
		keyValuePairs.forEach(function(keyValuePair) {
			keyValuePair = keyValuePair.split('=');
			result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
		});
		return result;
	}
	var parametros = parametrosUrl();	
	
	document.getElementById("nm_orgao").innerText = parametros.Orgao;
	
	browser.storage.local.get('lista_avisos', function(result){
		mensagem = result.lista_avisos;
	});
	
	var qtde = 0;
	var check = setInterval(function() {
		//A MENSAGEM APARECERÁ A CADA 30 SEGUNDOS		
		if (!document.getElementById("janela_fundo_config_msg")) {
			while (true) {
				// console.log(qtde + " : " + mensagem[qtde]);
				if (mensagem[qtde] != null) {
					if (mensagem[qtde].length > 0) {
						msg(qtde);
						break;
					}
				}
				qtde = (qtde < 4 ? qtde + 1 : 0);
			}
			qtde = (qtde < 4 ? qtde + 1 : 0);			
		}
	}, 38000); //38 segundos
	
	function msg(param) {
		if (mensagem[param].length > 0) {
			//cria a janela da mensagem
			let elemento1 = document.createElement("div");
			elemento1.id = 'janela_fundo';
			elemento1.style = 'position: fixed;width: 100%;height: 100%;top: 0px;left: 0px;right: 0px;bottom: 0px;background: rgba(0, 0, 0, 0.69);z-index: 10000;display: flex;align-items: center;justify-content: center;color: rgb(255, 255, 255);text-align: center;';	
			elemento1.className = 'fade-in';
			let elemento2 = document.createElement("span");
			elemento2.style = 'animation: 0.2s shake; animation-delay: 1s; animation-iteration-count: 3; position: relative;width: 75%;background-color: white;color: black;border-radius: 20px;font-size: 1.5rem;font-weight: bold;padding: 15px;';
			elemento2.innerText = mensagem[param];
			elemento1.appendChild(elemento2);				
			document.body.appendChild(elemento1);
			let check1 = setInterval(function() {		
				//A MENSAGEM DURA 8 SEGUNDOS
				if (document.getElementById("janela_fundo")) {
					document.getElementById('janela_fundo').className = 'fade-out';
					setTimeout(function(){document.getElementById('janela_fundo').remove();}, 1500);
					clearInterval(check1);
				}
			}, 8000); //8 segundos
		}		
	}
}

document.getElementById("extensao_meet_mensagem").onclick = function () {
	// mensagem = prompt("O aviso aparecerá na tela a cada 45 segundos. Escreva a mensagem desejada:", mensagem);
	
	let elemento_fundo = document.createElement("div");
	elemento_fundo.id = 'janela_fundo_config_msg';
	elemento_fundo.style = 'position: fixed;width: 100%;height: 100%;top: 0px;left: 0px;right: 0px;bottom: 0px;background: rgba(0, 0, 0, 0.9);z-index: 10000;display: flex;align-items: center;justify-content: center;color: rgb(255, 255, 255);text-align: center;';	
	elemento_fundo.className = 'fade-in';
	
	let botao = document.createElement("a");
	var i = document.createElement("i");						
	botao.title = "Sair"; //<--aria-label
	botao.style = "cursor: pointer;position: absolute;right: 10px;padding: 5px;top: 5px;z-index: 1;opacity: 1;font-size: 1.5rem;";
	botao.onmouseover = function () {botao.style.opacity = 1};
	botao.onmouseout = function () {botao.style.opacity = 0.5};
	i.className = "fa fa-window-close";
	botao.onclick = function () {
		browser.storage.local.set({'lista_avisos': mensagem});
		document.getElementById('janela_fundo_config_msg').className = 'fade-out';
		setTimeout(function(){document.getElementById('janela_fundo_config_msg').remove();}, 1500);
	};						
	botao.appendChild(i);
	elemento_fundo.appendChild(botao);
	
	let elemento1 = document.createElement("div");
	elemento1.style = 'display: flex;flex-direction: column;justify-content: center;align-items: center;width: 100%;';	//position: absolute;
	elemento1.className = 'fade-in';
	
	let elemento_titulo = document.createElement("span");
	elemento_titulo.style = 'position: relative;width: 75%;color: white;font-size: 1.5rem;font-weight: bold;';
	elemento_titulo.innerText = "Os avisos aparecerão na tela, de forma intercalada, a cada 30s.";
	elemento1.appendChild(elemento_titulo);
	
	let elemento_subtitulo = document.createElement("span");
	elemento_subtitulo.style = 'position: relative;width: 75%;color: white;font-size: 0.8rem;font-weight: bold;';
	elemento_subtitulo.innerText = "Clique em cima do texto para alterá-lo. Avisos em branco serão desconsiderados";
	elemento1.appendChild(elemento_subtitulo);
	
	let div2 = document.createElement("div");
	div2.style = 'position: relative;width: 75%;background-color: white;border-radius: 20px;font-weight: bold;padding: 15px;margin: 5px;display: inline-flex;align-items: center;text-align: justify;';
	let span2 = document.createElement("span");
	span2.style = 'color: lightgray;font-size: 4rem;padding: 0px 20px 0px 0px;';
	span2.innerText = "1";
	let elemento2 = document.createElement("span");
	elemento2.id = "aviso1";
	elemento2.style = 'color: black; font-size: 1rem;';
	elemento2.innerText = mensagem[0];
	div2.onclick = function () {		
		mensagem[0] = prompt("Escreva a mensagem desejada:", document.getElementById("aviso1").innerText);
		document.getElementById("aviso1").innerText = mensagem[0];
	};	
	div2.appendChild(span2);
	div2.appendChild(elemento2);
	elemento1.appendChild(div2);
	
	let div3 = document.createElement("div");
	div3.style = 'position: relative;width: 75%;background-color: white;border-radius: 20px;font-weight: bold;padding: 15px;margin: 5px;display: inline-flex;align-items: center;text-align: justify;';
	let span3 = document.createElement("span");
	span3.style = 'color: lightgray;font-size: 4rem;padding: 0px 20px 0px 0px;';
	span3.innerText = "2";
	let elemento3 = document.createElement("span");
	elemento3.id = "aviso2";
	elemento3.style = 'color: black; font-size: 1rem;';
	elemento3.innerText = mensagem[1];
	div3.onclick = function () {
		mensagem[1] = prompt("Escreva a mensagem desejada:", document.getElementById("aviso2").innerText);
		document.getElementById("aviso2").innerText = mensagem[1];
	};	
	div3.appendChild(span3);
	div3.appendChild(elemento3);
	elemento1.appendChild(div3);
	
	let div4 = document.createElement("div");
	div4.style = 'position: relative;width: 75%;background-color: white;border-radius: 20px;font-weight: bold;padding: 15px;margin: 5px;display: inline-flex;align-items: center;text-align: justify;';
	let span4 = document.createElement("span");
	span4.style = 'color: lightgray;font-size: 4rem;padding: 0px 20px 0px 0px;';
	span4.innerText = "3";
	let elemento4 = document.createElement("span");
	elemento4.id = "aviso3";
	elemento4.style = 'color: black; font-size: 1rem;';
	elemento4.innerText = mensagem[2];
	div4.onclick = function () {
		mensagem[2] = prompt("Escreva a mensagem desejada:", document.getElementById("aviso3").innerText);
		document.getElementById("aviso3").innerText = mensagem[2];
	};	
	div4.appendChild(span4);
	div4.appendChild(elemento4);
	elemento1.appendChild(div4);
	
	let div5 = document.createElement("div");
	div5.style = 'position: relative;width: 75%;background-color: white;border-radius: 20px;font-weight: bold;padding: 15px;margin: 5px;display: inline-flex;align-items: center;text-align: justify;';
	let span5 = document.createElement("span");
	span5.style = 'color: lightgray;font-size: 4rem;padding: 0px 20px 0px 0px;';
	span5.innerText = "4";
	let elemento5 = document.createElement("span");
	elemento5.id = "aviso4";
	elemento5.style = 'color: black; font-size: 1rem;';
	elemento5.innerText = mensagem[3];
	div5.onclick = function () {
		mensagem[3] = prompt("Escreva a mensagem desejada:", document.getElementById("aviso4").innerText);
		document.getElementById("aviso4").innerText = mensagem[3];
	};	
	div5.appendChild(span5);
	div5.appendChild(elemento5);
	elemento1.appendChild(div5);
	
	let div6 = document.createElement("div");
	div6.style = 'position: relative;width: 75%;background-color: white;border-radius: 20px;font-weight: bold;padding: 15px;margin: 5px;display: inline-flex;align-items: center;text-align: justify;';
	let span6 = document.createElement("span");
	span6.style = 'color: lightgray;font-size: 4rem;padding: 0px 20px 0px 0px;';
	span6.innerText = "5";
	let elemento6 = document.createElement("span");
	elemento6.id = "aviso5";
	elemento6.style = 'color: black; font-size: 1rem;';
	elemento6.innerText = mensagem[4];
	div6.onclick = function () {
		mensagem[4] = prompt("Escreva a mensagem desejada:", document.getElementById("aviso5").innerText);
		document.getElementById("aviso5").innerText = mensagem[4];
	};	
	div6.appendChild(span6);
	div6.appendChild(elemento6);
	elemento1.appendChild(div6);
	
	elemento_fundo.appendChild(elemento1);
	document.body.appendChild(elemento_fundo);
};

document.addEventListener("DOMContentLoaded", iniciar);