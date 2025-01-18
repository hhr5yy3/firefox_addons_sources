var preferencias = [];

function iniciar() {	
	browser.storage.local.get([
			'nm_orgao',
			'nm_sala_1',
			'lk_sala_1',
			'ck_sala_1_lock',
			'ck_sala_1_ring',
			'nm_sala_2',
			'lk_sala_2',
			'ck_sala_2_lock',
			'ck_sala_2_ring',
			'nm_sala_3',
			'lk_sala_3',
			'ck_sala_3_lock',
			'ck_sala_3_ring',
			'nm_sala_4',
			'lk_sala_4',
			'ck_sala_4_lock',
			'ck_sala_4_ring',
			'nm_sala_5',
			'lk_sala_5',
			'ck_sala_5_lock',
			'ck_sala_5_ring'
	], function(configuracoes){
			preferencias = configuracoes;		
			mostrarOpcoes();
		}
	);
}

function mostrarOpcoes() {
	document.getElementById("config").innerText = "v. " + chrome.runtime.getManifest().version;
	document.getElementById("nm_orgao").value = preferencias.nm_orgao;
	
	document.getElementById("nm_sala_1").value = preferencias.nm_sala_1;
	document.getElementById("nm_sala_2").value = preferencias.nm_sala_2;	
	document.getElementById("nm_sala_3").value = preferencias.nm_sala_3;	
	document.getElementById("nm_sala_4").value = preferencias.nm_sala_4;
	document.getElementById("nm_sala_5").value = preferencias.nm_sala_5;	
	
	document.getElementById("lk_sala_1").value = preferencias.lk_sala_1;
	document.getElementById("lk_sala_2").value = preferencias.lk_sala_2;
	document.getElementById("lk_sala_3").value = preferencias.lk_sala_3;
	document.getElementById("lk_sala_4").value = preferencias.lk_sala_4;
	document.getElementById("lk_sala_5").value = preferencias.lk_sala_5;
	
	document.getElementById("ck_sala_1_lock").checked = preferencias.ck_sala_1_lock;
	document.getElementById("ck_sala_2_lock").checked = preferencias.ck_sala_2_lock;
	document.getElementById("ck_sala_3_lock").checked = preferencias.ck_sala_3_lock;
	document.getElementById("ck_sala_4_lock").checked = preferencias.ck_sala_4_lock;
	document.getElementById("ck_sala_5_lock").checked = preferencias.ck_sala_5_lock;
	
	document.getElementById("ck_sala_1_lock").addEventListener("click", salvarOpcoes);
	document.getElementById("ck_sala_2_lock").addEventListener("click", salvarOpcoes);
	document.getElementById("ck_sala_3_lock").addEventListener("click", salvarOpcoes);
	document.getElementById("ck_sala_4_lock").addEventListener("click", salvarOpcoes);
	document.getElementById("ck_sala_5_lock").addEventListener("click", salvarOpcoes);
	
	document.getElementById("ck_sala_1_ring").checked = preferencias.ck_sala_1_ring;
	document.getElementById("ck_sala_2_ring").checked = preferencias.ck_sala_2_ring;
	document.getElementById("ck_sala_3_ring").checked = preferencias.ck_sala_3_ring;
	document.getElementById("ck_sala_4_ring").checked = preferencias.ck_sala_4_ring;
	document.getElementById("ck_sala_5_ring").checked = preferencias.ck_sala_5_ring;
	
	document.getElementById("ck_sala_1_ring").addEventListener("click", salvarOpcoes);
	document.getElementById("ck_sala_2_ring").addEventListener("click", salvarOpcoes);
	document.getElementById("ck_sala_3_ring").addEventListener("click", salvarOpcoes);
	document.getElementById("ck_sala_4_ring").addEventListener("click", salvarOpcoes);
	document.getElementById("ck_sala_5_ring").addEventListener("click", salvarOpcoes);
}

function salvarOpcoes() {
	console.log("salvando...");
	browser.storage.local.set({
		nm_orgao: document.getElementById("nm_orgao").value,
		nm_sala_1: document.getElementById("nm_sala_1").value,
		lk_sala_1: document.getElementById("lk_sala_1").value,
		ck_sala_1_lock: document.getElementById('ck_sala_1_lock').checked,
		ck_sala_1_ring : document.getElementById('ck_sala_1_ring').checked,
		nm_sala_2: document.getElementById("nm_sala_2").value,
		lk_sala_2: document.getElementById("lk_sala_2").value,
		ck_sala_2_lock: document.getElementById('ck_sala_2_lock').checked,
		ck_sala_2_ring : document.getElementById('ck_sala_2_ring').checked,
		nm_sala_3: document.getElementById("nm_sala_3").value,
		lk_sala_3: document.getElementById("lk_sala_3").value,
		ck_sala_3_lock: document.getElementById('ck_sala_3_lock').checked,
		ck_sala_3_ring : document.getElementById('ck_sala_3_ring').checked,
		nm_sala_4: document.getElementById("nm_sala_4").value,
		lk_sala_4: document.getElementById("lk_sala_4").value,
		ck_sala_4_lock: document.getElementById('ck_sala_4_lock').checked,
		ck_sala_4_ring : document.getElementById('ck_sala_4_ring').checked,
		nm_sala_5: document.getElementById("nm_sala_5").value,
		lk_sala_5: document.getElementById("lk_sala_5").value,
		ck_sala_5_lock: document.getElementById('ck_sala_5_lock').checked,
		ck_sala_5_ring : document.getElementById('ck_sala_5_ring').checked,
	});
	browser.runtime.sendMessage({tipo: 'criarAlerta', valor: '\n Informações salvas com sucesso!'});
}

document.addEventListener("DOMContentLoaded", iniciar);

document.getElementById("nm_orgao").addEventListener('focusout', function(event) {
	salvarOpcoes();
});
document.getElementById("nm_sala_1").addEventListener('focusout', function(event) {
	document.getElementById("titulo_sala_1").innerText = document.getElementById("nm_sala_1").value
	salvarOpcoes();
});
document.getElementById("nm_sala_2").addEventListener('focusout', function(event) {
	document.getElementById("titulo_sala_2").innerText = document.getElementById("nm_sala_2").value
	salvarOpcoes();
});
document.getElementById("nm_sala_3").addEventListener('focusout', function(event) {
	document.getElementById("titulo_sala_3").innerText = document.getElementById("nm_sala_3").value
	salvarOpcoes();
});
document.getElementById("nm_sala_4").addEventListener('focusout', function(event) {
	document.getElementById("titulo_sala_4").innerText = document.getElementById("nm_sala_4").value
	salvarOpcoes();
});
document.getElementById("nm_sala_5").addEventListener('focusout', function(event) {
	document.getElementById("titulo_sala_5").innerText = document.getElementById("nm_sala_5").value
	salvarOpcoes();
});


document.getElementById("lk_sala_1").addEventListener('focusout', function(event) {
	salvarOpcoes();
});
document.getElementById("lk_sala_2").addEventListener('focusout', function(event) {
	salvarOpcoes();
});
document.getElementById("lk_sala_3").addEventListener('focusout', function(event) {
	salvarOpcoes();
});
document.getElementById("lk_sala_4").addEventListener('focusout', function(event) {
	salvarOpcoes();
});
document.getElementById("lk_sala_5").addEventListener('focusout', function(event) {
	salvarOpcoes();
});