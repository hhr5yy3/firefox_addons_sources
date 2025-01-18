var preferencias = [];

function iniciar() {	
	browser.storage.local.get([
			'nm_orgao',
			'nm_sala_1',
			'lk_sala_1',
			'ck_sala_1_lock',			
			'ck_sala_1_mic',
			'ck_sala_1_mute',
			'ck_sala_1_ring',
			'nm_sala_2',
			'lk_sala_2',
			'ck_sala_2_lock',
			'ck_sala_2_mic',
			'ck_sala_2_mute',
			'ck_sala_2_ring',
			'nm_sala_3',
			'lk_sala_3',
			'ck_sala_3_lock',
			'ck_sala_3_mic',
			'ck_sala_3_mute',
			'ck_sala_3_ring',
			'nm_sala_4',
			'lk_sala_4',
			'ck_sala_4_lock',
			'ck_sala_4_mic',
			'ck_sala_4_mute',
			'ck_sala_4_ring',
			'nm_sala_5',
			'lk_sala_5',
			'ck_sala_5_lock',
			'ck_sala_5_mic',
			'ck_sala_5_mute',
			'ck_sala_5_ring'
	], function(configuracoes){
			preferencias = configuracoes;		
			mostrarOpcoes();
		}
	);
}

function mostrarOpcoes() {
	document.getElementById('opcoes').addEventListener('click', configuracoes);
	document.getElementById('extensao_atalho_0').addEventListener('click', abrirPauta);
	document.getElementById("versao").innerText = "v. " + chrome.runtime.getManifest().version;
	criarAtalhosPlugin();
}

function configuracoes() {
	return browser.runtime.sendMessage({
		tipo: 'abrirConfiguracoes'
	})		
}

function criarAtalhosPlugin() {
	var ul = document.getElementById("atalhosPlugin");
	if (preferencias.lk_sala_1 != "") {
		var li1 = document.createElement("li");
		var a1 = document.createElement("a");
		a1.id = "extensao_atalho_1";
		a1.title = "Abrir a Sala"; //<--aria-label
		a1.innerText = preferencias.nm_sala_1;
		a1.style.setProperty("width", "150px");
		a1.href = preferencias.lk_sala_1.length > 12 ? preferencias.lk_sala_1 : 'https://meet.google.com/' + preferencias.lk_sala_1;
		li1.appendChild(a1);
		
		var a11 = document.createElement("a");
		var i11 = document.createElement("i");						
		a11.title = "Copiar link"; //<--aria-label
		i11.className = "fas fa-copy"; //<i class="fas fa-copy"></i>
		a11.style.setProperty("width", "30px");
		a11.style.setProperty("border-left", "0px");
		a11.style.setProperty("border-right", "1px solid #DDDDDD");
		a11.onclick = function () {copiarClipboard(document.getElementById("extensao_atalho_1").href)};				
		a11.appendChild(i11);
		li1.appendChild(a11);
		
		ul.appendChild(li1);
	}
	if (preferencias.lk_sala_2 != "") {
		var li2 = document.createElement("li");
		var a2 = document.createElement("a");		
		a2.id = "extensao_atalho_2";
		a2.innerText = preferencias.nm_sala_2;
		a2.title = "Abrir a Sala"; //<--aria-label		
		a2.style.setProperty("width", "150px");
		a2.href = preferencias.lk_sala_2.length > 12 ? preferencias.lk_sala_2 : 'https://meet.google.com/' + preferencias.lk_sala_2;
		li2.appendChild(a2);
		
		var a12 = document.createElement("a");
		var i12 = document.createElement("i");						
		a12.title = "Copiar link"; //<--aria-label
		i12.className = "fas fa-copy"; //<i class="fas fa-copy"></i>
		a12.style.setProperty("width", "30px");
		a12.style.setProperty("border-left", "0px");
		a12.style.setProperty("border-right", "1px solid #DDDDDD");
		a12.onclick = function () {copiarClipboard(document.getElementById("extensao_atalho_2").href)};				
		a12.appendChild(i12);
		li2.appendChild(a12);
		
		ul.appendChild(li2);
	}
	if (preferencias.lk_sala_3 != "") {
		var li3 = document.createElement("li");
		var a3 = document.createElement("a");
		a3.id = "extensao_atalho_3";
		a3.title = "Abrir a Sala"; //<--aria-label		
		a3.style.setProperty("width", "150px");
		a3.innerText = preferencias.nm_sala_3;
		a3.href = preferencias.lk_sala_3.length > 12 ? preferencias.lk_sala_3 : 'https://meet.google.com/' + preferencias.lk_sala_3;
		li3.appendChild(a3);
		
		var a13 = document.createElement("a");
		var i13 = document.createElement("i");						
		a13.title = "Copiar link"; //<--aria-label
		i13.className = "fas fa-copy"; //<i class="fas fa-copy"></i>
		a13.style.setProperty("width", "30px");
		a13.style.setProperty("border-left", "0px");
		a13.style.setProperty("border-right", "1px solid #DDDDDD");
		a13.onclick = function () {copiarClipboard(document.getElementById("extensao_atalho_3").href)};				
		a13.appendChild(i13);
		li3.appendChild(a13);
		
		ul.appendChild(li3);
	}
	if (preferencias.lk_sala_4 != "") {
		var li4 = document.createElement("li");
		var a4 = document.createElement("a");
		a4.id = "extensao_atalho_4";
		a4.title = "Abrir a Sala"; //<--aria-label		
		a4.style.setProperty("width", "150px");
		a4.innerText = preferencias.nm_sala_4;
		a4.href = preferencias.lk_sala_4.length > 12 ? preferencias.lk_sala_4 : 'https://meet.google.com/' + preferencias.lk_sala_4;
		li4.appendChild(a4);
		
		var a14 = document.createElement("a");
		var i14 = document.createElement("i");						
		a14.title = "Copiar link"; //<--aria-label
		i14.className = "fas fa-copy"; //<i class="fas fa-copy"></i>
		a14.style.setProperty("width", "30px");
		a14.style.setProperty("border-left", "0px");
		a14.style.setProperty("border-right", "1px solid #DDDDDD");
		a14.onclick = function () {copiarClipboard(document.getElementById("extensao_atalho_4").href)};				
		a14.appendChild(i14);
		li4.appendChild(a14);
		
		ul.appendChild(li4);
	}
	if (preferencias.lk_sala_5 != "") {
		var li5 = document.createElement("li");
		var a5 = document.createElement("a");
		a5.id = "extensao_atalho_5";
		a5.title = "Abrir a Sala"; //<--aria-label		
		a5.style.setProperty("width", "150px");
		a5.innerText = preferencias.nm_sala_5;
		a5.href = preferencias.lk_sala_5.length > 12 ? preferencias.lk_sala_5 : 'https://meet.google.com/' + preferencias.lk_sala_5;
		li5.appendChild(a5);
		
		var a15 = document.createElement("a");
		var i15 = document.createElement("i");						
		a15.title = "Copiar link"; //<--aria-label
		i15.className = "fas fa-copy"; //<i class="fas fa-copy"></i>
		a15.style.setProperty("width", "30px");
		a15.style.setProperty("border-left", "0px");
		a15.style.setProperty("border-right", "1px solid #DDDDDD");
		a15.onclick = function () {copiarClipboard(document.getElementById("extensao_atalho_5").href)};				
		a15.appendChild(i15);
		li5.appendChild(a15);
		
		ul.appendChild(li5);
	}
}

function copiarClipboard(temp) {
	var textarea = document.createElement("textarea");
	textarea.textContent = temp;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea)
	browser.runtime.sendMessage({tipo: 'criarAlerta', valor: '\nLink copiado:\n' + temp});
}

function abrirPauta() {
	browser.runtime.sendMessage({tipo: 'popUp', valor: preferencias.nm_orgao});
}
document.addEventListener("DOMContentLoaded", iniciar);