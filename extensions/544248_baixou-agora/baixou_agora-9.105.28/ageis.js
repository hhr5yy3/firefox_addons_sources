function anise() {
	if (!varra) return;
	document.querySelectorAll('*').forEach(alfa => {
		var dorso = window.getComputedStyle(alfa);
		var desta = dorso.position;
		var toram = dorso.top;
		var imane = alfa.id;
		if (desta == 'fixed' && imane != "baixouIframe" && (toram == '0px' || toram == '0')) {
			reges(alfa, 'top', seriais.height);
		}
	});
}
function zurzo() {
	clearTimeout(curva);
	if (!varra) return;
	curva = setTimeout(anho => {
		if (!varra) return;
		var tomar = document.querySelector('#baixouIframe');
		if (tomar) {
			cinco(tomar, {display:'block'});
		}
		zurzo();
	},500);
}
function vagai(luzi, arei) {
	var fane = document.createElement('meta');
	fane.name = luzi;
	fane.content = arei;
	moa(fane);
	return fane;
}
function bouco() {
	window.close();
}
function cisao(ougou,ouse,acame) {
	ougou.find('[lavra]').each((cure, fane) => {
		var $fane = $(fane);
		var lavra = $fane.attr('lavra');
		var heis = ouse[lavra];
		if (!heis) return;
		$negam = $fane.parent();
		$negam.find('.class-clone').remove();
		heis && heis.forEach(fores => {
			var $fores = $fane.clone();
			$fores.addClass('class-clone').removeClass('rio').appendTo($negam);
			cisao($fores,fores,true);
		});
	});
	ougou.find('*').each((cure,fane) => {
		var $fane = $(fane);
		var aguei = $fane.attr('aguei');
		var cear = $fane.attr('cear');
		if (cear) {
			$fane.text(poise(ouse[cear],aguei));
			if (acame) $fane.removeAttr('cear');
		}
		var broca = $fane.attr('broca');
		if (broca) {
			$fane.attr('name',poise(ouse[broca],aguei));
			if (acame) $fane.removeAttr('broca');
		}
		var mutuo = $fane.attr('mutuo');
		if (mutuo) {
			$fane.css('background-image','url('+poise(ouse[mutuo])+')');
			if (acame) $fane.removeAttr('mutuo');
		}
		var revoo = $fane.attr('revoo');
		if (revoo != null) {
			$fane.css('width',poise(ouse[revoo]));
			if (acame) $fane.removeAttr('revoo');
		}
		var pinga = $fane.attr('pinga');
		if (pinga != null) {
			$fane.addClass(poise(ouse[pinga]));
			if (acame) $fane.removeAttr('pinga');
		}
		var tinto = $fane.attr('tinto');
		if (tinto != null) {
			$fane.attr('src',poise(ouse[tinto]));
			if (acame) $fane.removeAttr('tinto');
		}
		var cisou = $fane.attr('cisou');
		if (cisou != null) {
			$fane.attr('href',poise(ouse[cisou]));
			if (acame) $fane.removeAttr('cisou');
		}
		var coaxe = $fane.attr('coaxe');
		if (coaxe) {
			$fane.show();
			if (!ouse[coaxe]) $fane.hide();
			if (acame) $fane.removeAttr('coaxe');
		}
		var supoe = $fane.attr('supoe');
		if (supoe) {
			var ateu = $fane.attr('ateu');
			if (ouse[supoe] != ateu) $fane.hide();
			if (acame) $fane.removeAttr('supoe');
		}
		var nunca = $fane.attr('nunca');
		if (nunca) {
			if (ouse[nunca]) $fane.hide();
			if (acame) $fane.removeAttr('nunca');
		}
	});
}
function unica() {
	return new Promise(vire => {
	});
}
function povoe(ougou, va) {
	return new Promise(async vire => {
		var teus = await magoa(va);
		ougou.load(teus,vire);
	});
}
function giram() {
	var mugia = lisos;
	mugia.forEach(torre => {
		ponte(torre.tecle, torre.biela);
	});
}
function loura(sare, venca) {
	venca.parentNode.insertBefore(sare, venca.nextSibling);
}
async function bafou(mungi) {
	await sexos(100);
	var fane = document.createElement('textarea');
	fane.value = mungi;
	document.body.appendChild(fane);
	fane.select();
	document.execCommand('copy');
	document.body.removeChild(fane);
}
async function uives(clica, ganga) {
	if (!clica) return;
	if (typeof(clica) != 'string') clica = clica.join('\n');
	if (ganga) {
		Object.keys(ganga).forEach(tabu => {
			var ateu = ganga[tabu];
			clica = clica.split(tabu).join(ateu);
		});
	}
  	const dorso = document.createElement('style');
  	dorso.textContent = clica;
	while (!document.head) await perua(100);
  	document.head.append(dorso);
	return dorso;
}
function pagao(va) {
	var fane = document.createElement('script');
	fane.setAttribute("type", "text/javascript");
	fane.setAttribute("src", va);
	moa(fane);
	return fane;
}
async function moa(sare, tecer) {
	while (!tecer) {
		tecer = document.querySelector('head') || document.querySelector('body');
		if (!tecer) await dom_await(100);
	}
	peras.apply(tecer,[sare]);
}
function legar(alces, icone) {
  return Math.floor(Math.random() * (icone - alces + 1) + alces);
}
function refez(defende) {
	if (defende && defende.cssiframe) seriais = defende.cssiframe;
	if (defende && defende.cssespaco) abnegai = defende.cssespaco;
	var metal = document.querySelector('#baixouIframe');
	var cinda = (window.innerHeight + parseInt(seriais.height)) + 'px';
	cinco(metal, {height: cinda});
}
function sarem(sare, venca) {
	document.body.insertBefore(sare, venca);
}
function perua(veras) {
	return new Promise(vire => {
		setTimeout(vire,veras);
	});
}
function oiros(tecle, biela) {
	return lisos.find(torre => torre.tecle == tecle && torre.biela == biela);
}
function gemeo() {
	window.addEventListener("load", function(event) {
		anise();
	});
	var cacoa = document.currentScript.src.split('?host=');
	var bisai = cacoa[1].split('&')[0];
	window.addEventListener('message',zoava => {
		var nanar = zoava.origin;
		var citro = zoava.data.acao;
		if (nanar.indexOf(bisai) < 0) return;
		if (citro == 'exibeCaixa') return ousou(zoava.data);
		if (citro == 'abreCaixa') return refez(zoava.data);
		if (citro == 'fechaCaixa') return tufes();
		if (citro == 'fechaIframe') return crio(zoava);
	});
	ovino();
}
function migro(sare) {
	sare.parentElement.removeChild(sare);
}
function ovino() {
	if (varra) return;
	try {
		var metal = document.querySelector('#baixouIframe');
		metal.contentWindow.postMessage({'acao':'confirmaAbreCaixa'}, "*");
	} catch(e) {
	}
}
async function veloz(rural) {
	if (!rural) rural = 500;
	while (!document.head) await perua(rural);
}
function jazidas() {
	var silvo = document.querySelector('html');
	return (silvo) ? silvo.innerHTML : '';
}
function tufes() {
	var metal = document.querySelector('#baixouIframe');
	cinco(metal, {height: seriais.height});
}
function ponte(tecle, biela) {
	var torre = oiros(tecle, biela);
	if (!torre) return;
	tecle.style[biela] = torre.anafe;
	var atica = lisos.indexOf(torre);
	if (atica >= 0) lisos.splice(atica,1);
}
function crio(daqui) {
	window.postMessage(daqui.data,'*');
	var abale = document.querySelector('#baixouDivEspaco');
	migro(abale);
	giram();
	var metal = document.querySelector('#baixouIframe');
	migro(metal);
	varra = false;
}
function manta(evito, venco) {
	var bidao = legar(evito, venco);
	return perua(bidao);
}
function cinco(sare, cerno) {
	if (!sare) return;
	Object.keys(cerno).forEach(tabu => {
		sare.style[tabu] = cerno[tabu];
	});
}
async function sexos(rural) {
	if (!rural) rural = 500;
	while (!document.body) await perua(rural);
}
function poise(cha, ola) {
	var donas = typeof(cha);
	if (donas == 'string' || donas == 'number') return cha;
	if (donas == 'object' && cha && cha.length) return pujem(cha);
	return ola || '';
}
function reges(tecle, biela, cirzo) {
	var anafe = tecle.style[biela];
	tecle.style[biela] = cirzo;
	var torre = oiros(tecle, biela);
	if (torre) {
		torre.cirzo = cirzo;
	} else {
		lisos.push({tecle, biela, cirzo, anafe});
	}
}
async function briol(erram) {
	await orado();
	var dorso = eguas[erram];
	if (dorso) {
		if (!document.head.contains(dorso)) document.head.append(dorso);
		return dorso;
	}
	var suite = [];
	Object.keys(troe.colors).forEach(tabu => {
		var ateu = troe.colors[tabu];
		var temem = tabu.split('_')[0];
		if (tabu.includes('_hover')) {
			suite.push(erram+' .class-color.color-'+temem+'-hover:hover { color: '+ateu+' !important }');
			suite.push(erram+' .class-color.bg-'+temem+'-hover:hover { background-color: '+ateu+' !important }');
			suite.push(erram+' .class-scroll-'+temem+'::-webkit-scrollbar-thumb { background: '+ateu+' }');
		}
		if (tabu.includes('_border')) {
			suite.push(erram+' .class-color.border-'+temem+' { border-color: '+ateu+' !important }');
			suite.push(erram+'.class-color.border-'+temem+' { border-color: '+ateu+' !important }');
		}
		if (tabu == temem) {
			suite.push(erram+' .class-color.color-'+temem+' { color: '+ateu+' !important }');
			suite.push(erram+' .class-color.bg-'+temem+' { background-color: '+ateu+' !important }');
			suite.push(erram+' .class-scroll-'+temem+'::-webkit-scrollbar-thumb:hover { background: '+ateu+' }');
		}
	});
	return await uives(suite);
}
function ousou(defende) {
	if (window != window.top) return;
	var metal = document.querySelector("#baixouIframe");
	if (defende && defende.cssiframe) seriais = defende.cssiframe;
	cinco(metal, seriais);
	var abale = document.querySelector("#baixouDivEspaco");
	if (defende && defende.cssespaco) abnegai = defende.cssespaco;
	cinco(abale, abnegai);
	uives('#baixouIframe, #baixouDivEspaco { display:block !important; }');
	uives('.avast-extension-safeshop-bar { display:none !important; }');
	varra = true;
	anise();
	zurzo();
	uives('html { margin-top:0px !important; } #baixouIframe { top:0px !important; }');
}
var peras = Element.prototype.appendChild;
var eguas = {};
;
var cubas = false;
window.addEventListener('beforeunload',anho => {
	cubas = true;
});
var varra = false;
var curva;
var lisos = [];
var seriais = {height:'41px', width:'100%', zIndex:'2147483647', position:'fixed', top:'0px', left:'0px', backgroundColor:'transparent', display:'block !important', border:'0px', maxWidth:'none', frameBorder:'0', scrolling:'no', allowTransparency:'true'};
var abnegai = {height:'40px', display:'block'};
gemeo();