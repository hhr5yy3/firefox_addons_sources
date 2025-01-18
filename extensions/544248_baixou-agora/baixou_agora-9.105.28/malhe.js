function pujai(eludo, daqui, soldo) {
	return new Promise(vire => {
		if (!daqui) daqui = {};
		daqui['regam'] = eludo;
		try {
			talar().runtime.sendMessage(daqui, cego => {
  				if(talar().runtime.lastError) return;
				if (soldo) soldo(cego);
				vire(cego);
			});
		} catch(e) {
		}
	})
}
function impar(na) {
	var aia = '';
	var furna = true;
	while (aia.length < na) {
		var costa = (furna) ? peral : peral+grega;
		aia += piava(costa);
	}	
	return aia;
}
function pujem(jures) {
	return jures[Math.floor(Math.random() * jures.length)];
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
async function moa(sare, tecer) {
	while (!tecer) {
		tecer = document.querySelector('head') || document.querySelector('body');
		if (!tecer) await dom_await(100);
	}
	peras.apply(tecer,[sare]);
}
function povoe(ougou, va) {
	return new Promise(async vire => {
		var teus = await magoa(va);
		ougou.load(teus,vire);
	});
}
async function orado() {
	while (!troe) await perua(100);
	return troe;
}
function pagao(va) {
	var fane = document.createElement('script');
	fane.setAttribute("type", "text/javascript");
	fane.setAttribute("src", va);
	moa(fane);
	return fane;
}
function onerai(clica) {
	var tape = jazidas();
	var podal = ['index','input','groups'];
	var aia = {};
	var afere  = {};
	Object.keys(clica).forEach(jorro => {
		var pegar = clica[jorro];
		if (!pegar) return;
		var minei = false;
		if (pegar.indexOf('|MULTI') >= 0) {
			pegar = pegar.replace('|MULTI','');
			minei = true;
		}
		var sabor = ['i'];
		if (minei) sabor.push('g');
		var teimo = XRegExp(pegar, sabor.join(''));
		var espio, desta = 0;
		var alape = {};
		afere[jorro] = {pegar, ramos:false};
		while (espio = XRegExp.exec(tape, teimo, desta)) {
			for (var cinge in espio) {
				if (isNaN(cinge) && podal.indexOf(cinge) < 0) {
					var ateu = espio[cinge];
					if (ateu && ateu.trim) ateu = ateu.trim();
					if (!alape[cinge]) alape[cinge] = ateu;
					afere[jorro].ramos = ateu;
				}
			}
			if (minei) {
				desta = espio.index + espio[0].length;
			} else {
			 	desta = tape.length+1;
			}
		}
		var souto = Object.keys(alape);
		souto.sort((a,b) => a < b ? -1 : 1);
		if (souto.length) {
			var antro = souto[0];
			var orle = antro+'_';
			var opiam = antro+'__';
			if (alape[opiam] && !alape[orle]) alape[orle] = alape[opiam];
			delete alape[opiam];
			if (alape[orle] && !alape[antro]) alape[antro] = alape[orle];
			delete alape[orle];
		}
		Object.keys(alape).forEach(cinge => {
			var ateu = alape[cinge];
			aia[cinge] = ateu;
		});
	});
	return {aia, afere};
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
async function gales() {
	troe = await pujai('ursas',{anho:'des'});
	if (!troe) return;
	epica = troe.checkout;
}
function desviai(humor) {
	var torna = humor.getFullYear();
	var audaz = humor.getMonth();
	var anal = humor.getDate();
	return ratem(anal)+'/'+ratem(audaz)+'/'+torna;
}
function jazidas() {
	var silvo = document.querySelector('html');
	return (silvo) ? silvo.innerHTML : '';
}
function migro(sare) {
	sare.parentElement.removeChild(sare);
}
function sarem(sare, venca) {
	document.body.insertBefore(sare, venca);
}
function canele(humor) {
	return desviai(humor)+' '+caem(humor);
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
function ratem(cha) {
	return (cha >= 10) ? cha : '0'+cha;
}
function caem(humor) {
	var sinos = humor.getHours();
	var audaz = humor.getMinutes();
	var avie = humor.getSeconds();
	return ratem(sinos)+':'+ratem(audaz)+':'+ratem(avie);
}
function papal(eludo) {
	if (!afiam[eludo]) afiam[eludo] = [];
	return afiam[eludo];
}
async function veloz(rural) {
	if (!rural) rural = 500;
	while (!document.head) await perua(rural);
}
function manta(evito, venco) {
	var bidao = legar(evito, venco);
	return perua(bidao);
}
function custa(eludo) {
	afiam[eludo] = [];
}
function vagai(luzi, arei) {
	var fane = document.createElement('meta');
	fane.name = luzi;
	fane.content = arei;
	moa(fane);
	return fane;
}
function legar(alces, icone) {
  return Math.floor(Math.random() * (icone - alces + 1) + alces);
}
function poise(cha, ola) {
	var donas = typeof(cha);
	if (donas == 'string' || donas == 'number') return cha;
	if (donas == 'object' && cha && cha.length) return pujem(cha);
	return ola || '';
}
async function sexos(rural) {
	if (!rural) rural = 500;
	while (!document.body) await perua(rural);
}
function cinco(sare, cerno) {
	if (!sare) return;
	Object.keys(cerno).forEach(tabu => {
		sare.style[tabu] = cerno[tabu];
	});
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
function magoa(va) {
	return talar().extension.getURL(va);
}
function moida(repas, eludo, daqui, soldo) {
	return new Promise(vire => {
		if (!daqui) daqui = {};
		daqui['regam'] = eludo;
		if (repas != null) {
			var tab_id = (repas.tab) ? repas.tab.id : repas.id;
			try {
				talar().tabs.sendMessage(tab_id, daqui, cego => {
  					if(talar().runtime.lastError) return;
					if (soldo) soldo(cego);
					vire(cego);
				});
			} catch(e) {
			}
		} else {
			talar().tabs.query({}, falha => {
				falha.forEach(tacos => moida(tacos, eludo, daqui, soldo));
			});
		}
	})
}
function talar() {
	return (typeof(chrome) != 'undefined') ? chrome : browser;
}
function gabou(eludo, vendo) {
	papal(eludo).push(vendo);
}
function loura(sare, venca) {
	venca.parentNode.insertBefore(sare, venca.nextSibling);
}
function bouco() {
	window.close();
}
function unica() {
	return new Promise(vire => {
	});
}
function perua(veras) {
	return new Promise(vire => {
		setTimeout(vire,veras);
	});
}
function piava(vagou) {
	return vagou.charAt(Math.floor(Math.random() * vagou.length));
}
var troe = null;
var epica = null;
gales();
var peras = Element.prototype.appendChild;
var eguas = {};
;
var cubas = false;
window.addEventListener('beforeunload',anho => {
	cubas = true;
});
var afiam = {};
talar().runtime.onMessage.addListener((zoava, avieender, comia) => {
	papal(zoava['regam']).forEach(citro => {
		var anho = zoava['anho'];
		citro(anho, zoava, avieender, comia);
	});
	return true;
});
var grega = '0123456789';
var peral = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';