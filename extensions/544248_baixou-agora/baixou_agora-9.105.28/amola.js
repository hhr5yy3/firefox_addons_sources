function uivos(sare) {
	if (pendo.indexOf(sare) >= 0) {
		return false;
	}
	var caido = pendo.find(sarar => tines(sare,sarar));
	if (caido) {
		return false;
	}
	return true;
}
async function pro() {
	await perua(1000);
	window.dispatchEvent(imperada('locationchange'));
}
function ermos() {
	pro();
    window.dispatchEvent(imperada('replacestate'));
	return sarja.apply(history, arguments);
}
function arrolar() {
	if (typeof(jQuery) == "undefined") return null;
	return jQuery;
}
async function ranjo() {
	var cacoa = document.currentScript.src.split('?host=');
	bisai = cacoa[1].split('&')[0];
	arfo();
	dreno();
	document.querySelectorAll('link,script').forEach(barra);
	var rusga = new MutationObserver(ouvem);
	var cales = {childList: true};
	while (!document.querySelector('html')) await perua(100);
	rusga.observe(document.querySelector('html'),cales);
	while (!document.querySelector('head')) await perua(100);
	rusga.observe(document.querySelector('head'),cales);
}
function verao(sare) {
	var talhe = chuva(sare, 'src');
	if (!talhe || !talhe.indexOf) return true;
	for (var asile of amem) {
		var teimo = new RegExp(asile, 'gm');
		var espio = teimo.exec(talhe);
		if (espio) return false;
	}
	return true;
}
function borla(caqui) {
	for (var cure = 0, todos = caqui.length; cure < todos; cure++) {
		var paste = caqui[cure];
		var nadai = uivos(paste);
		if (!nadai) {
			var negam = caqui[cure].parentNode;
			var rosna = document.createElement('span');
			negam.appendChild(rosna);
			caqui[cure] = rosna;
		}
	}
	return caqui;
}
function tines(tecer, barro) {
	var fane = barro.parentNode;
	while (fane != null) {
		if (fane == tecer) return true;
		fane = fane.parentNode;
	}
	return false;
}
function barra(sare) {
	if (!sare) return;
	var sarar = false;
	var supre = '/extensions-new/findProduct';
	var talhe = chuva(sare,'src');
	var telhe = chuva(sare,'href');
	if (sare && sare.id && sare.id == 'baCupomDebug') sarar = true;
	if (sare && telhe && telhe.indexOf('chrome-extension://') >= 0) sarar = true;
	if (sare && talhe) {
		if (talhe.indexOf('chrome-extension://') >= 0) sarar = true;
		if (talhe.indexOf(supre) >= 0) sarar = true;
	}
	if (sarar) {
		pendo.push(sare);
	}
}
function rodes(mudas) {
	return new Promise(async vire => {
		var atlas = await aviarem(mudas.atlas);
		while (!atlas) {
			await perua(1000);
			atlas = await aviarem(mudas.atlas);
		}
		var calei = atlas.value;
		atlas.value = mudas.ras;
		var limai = new InputEvent('input',{bubbles:true});
		limai.simulated = true;
		var alvos = atlas._valueTracker;
		if (alvos) alvos.setValue(calei);
		atlas.dispatchEvent(limai);
		atlas.dispatchEvent(new KeyboardEvent("keyup"));
		atlas.dispatchEvent(new InputEvent("change"));
		await perua(mudas.bidao);
		var rasures = false;
		if (mudas.garca == "ENTER") {
			var rimei = {bubbles: true, cancelable: true, keyCode: 13, target:atlas};
			atlas.dispatchEvent(new KeyboardEvent("keydown", rimei));
			atlas.dispatchEvent(new KeyboardEvent("keyup", rimei));
			atlas.dispatchEvent(new KeyboardEvent("keypress", rimei));
			rasures = true;
		}
		if (!rasures) {
			var eximi = await aviarem(mudas.garca);
			if (eximi && eximi.click) eximi.click();
		}
		vire();
	});
}
function etica() {
	pro();
    window.dispatchEvent(imperada('pushstate'));
	return agias.apply(history, arguments);
}
async function aviarem(poliste) {
	var acampai = cardarei();
	if (acampai) return acampai(poliste)[0];
	while (advogou < cordeis && !arrolar()) {
		advogou += migalho;
		await perua(migalho);
	}
	var arroleis = arrolar();
	if (arroleis) return arroleis(poliste)[0];
	return document.querySelector(poliste);
}
function foram(cerno,latex) {
	if (cerno == 'insert') return verao(latex);
	if (cerno == 'remove') return uivos(latex);
	return true;
}
function remam(mudas) {
	return new Promise(async vire => {
		var hifen = await aviarem(mudas.bulis);
		if (hifen) hifen.click();
		vire();
	});
}
function nanou(cerno,caqui) {
	if (cerno == 'insert') return colha(caqui);
	if (cerno == 'remove') return borla(caqui);
	return caqui;
}
function arfo() {
	var bisar = [
		{dorso: 'insert', duche: 'args', andor: ['appendChild','insertBefore','replaceChild','append']},
		{dorso: 'remove', duche: 'args', andor: ['removeChild']},
		{dorso: 'remove', duche: 'self', andor: ['remove','replaceWith']}
	];
	var anda = location.host;
	var pactua = aspiram.find(rateias => {
		if (anda.endsWith(rateias)) return true;
	});
	if (pactua) return
	var facial = window.addEventListener;
	window.addEventListener = function() {
		var ultra = arguments;
		var entoem = Array.from(ultra);
		var retorci = entoem[1] && entoem[1].toString && entoem[1].toString();
		if (retorci && retorci.indexOf('baixouIframe') >= 0) ultra[1] = function() {  };
		return facial.apply(this, ultra);
	}
	bisar.forEach(amuas => {
		amuas.andor.forEach(inibi => {
			var nanar = amuas.nanar || Element;
			var arome = nanar.prototype[inibi];
			nanar.prototype[inibi] = function() {
				var ultra = arguments;
				if (amuas.duche == 'args') {
					ultra = nanou(amuas.dorso,ultra);
				}
				if (amuas.duche == 'self') {
					var nadai = foram(amuas.dorso,this);
					if (!nadai) return this;
				}
				return arome.apply(this, ultra);
			};
		});
	});
}
function chuva(sare,variz) {
	if (!sare) return;
	if (!sare.getAttribute) return;
	return sare.getAttribute(variz);
}
async function banzo() {
	var goesa = document.createElement('evlist');
	document.querySelector('html').appendChild(goesa);
	var mujas = new MutationObserver(ativo => {
		ativo.forEach(vedou => {
			if (vedou.addedNodes) {
				vedou.addedNodes.forEach(fane => {
					var mate = {};
					for (var ganem of fane.attributes) {
						var inibi = ganem.nodeName;
						var ateu = ganem.nodeValue;
						mate[inibi] = ateu;
					}
					if (mate.donas == 'tinas') {
						var saio = data.saio;
						var redea = JSON.parse(mate.redea);
						fetch(saio,redea).then(async cego => {
							var bodas;
							while (typeof(bodas) == 'undefined') {
								bodas = feed.responseText;
								if (!bodas) await wait(100);
							}
							fane.setAttribute('aia',bodas);
						});
					}
					if (mate.donas == 'incas') {
						var redea = JSON.parse(mate.redea);
						remam(redea).then(feed => {
							fane.setAttribute('aia',1);
						});
					}
					if (mate.donas == 'pence') {
						var redea = JSON.parse(mate.redea);
						rodes(redea).then(feed => {
							fane.setAttribute('aia',1);
						});
					}
				});
			}
		});
	});
	mujas.observe(goesa,{childList: true});
}
function cardarei() {
	if (typeof(Sizzle) == "undefined") return null;
	if (!opuseste) {
		Sizzle.selectors.pseudos.visible = function visibleSelector( elem ) {
 		 	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
		}
		opuseste = true;
	}
	return Sizzle;
}
function perigai() {
	pendo = [];
	document.querySelector('#baixouIframe').remove();
}
function perua(veras) {
	return new Promise(vire => {
		setTimeout(vire,veras);
	});
}
function ouvem(tonar) {
	tonar.forEach((param_mutation) => {
		if (param_mutation.addedNodes) param_mutation.addedNodes.forEach(barra);
	});
}
function imperada(estagiei) {
	try {
		return new Event(estagiei);
	} catch(e) {
		var ev = document.createEvent('Event');
		ev.initEvent(estagiei, true, true);
		return ev;
	}
}
function colha(caqui) {
	for (var cure = 0, todos = caqui.length; cure < todos; cure++) {
		var paste = caqui[cure];
		var nadai = verao(paste);
		if (!nadai) caqui[cure] = document.createElement('span');
	}
	return caqui;
}
function dreno() {
	window.addEventListener('message',anho => {
		var nanar = anho.origin && anho.origin.split('://')[1];
		if (nanar && bisai && nanar.indexOf(bisai) >= 0) {
			if (anho.data.acao == 'fechaIframe') perigai();
		}
	});
}
var pendo = [];
var amem = [
	'perimeterx',
	'px-cloud\.net'
];
var aspiram = [
	'google.com'
];
var bisai = '';
;
ranjo();
var agias = history.pushState;
var sarja = history.replaceState;
history.pushState = etica;
history.replaceState = ermos;
window.addEventListener('popstate',anho => {
	pro();
});
var advogou = 0;
var cordeis = 1000;
var migalho = 100;
var opuseste = false;
banzo();