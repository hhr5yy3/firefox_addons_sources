let ora = {};
let ls_data = {};
let ls_forever = [
	'bote',
	'sadio'
];
let togar = null;
let pujar = null;
let ouviria = null;
let atures = [];
let evacuas = null;
let rixes;
let sarno = -1;
let ondas = '...';
let parco;
let augiu = [];
let verei = {};
let penam;
let fanes = ['click', 'close', 'expired', 'muted'];
let sazonar = null;
let pruro = {};
let augir = null;
let tarje = 5000;
let abris = {};
async function lia() {
	var des = await heroi();
	talar().webRequest.onBeforeRequest.addListener(anho => { return {cancel:true}; },{urls: des.blocked}, ["blocking"]);
}
async function ilhou() {
	var des = await heroi();
	parco = des.push;
	penam = alea('penam',0)*1;
	afolhai();
	minou();
}
async function vacina() {
	if (!rixes) return;
	secas();
	coxeei();
	var alforra = surram/3;
	var topaste = surram*Math.random();
	var bidao = Math.round(alforra + topaste);
	await perua(bidao);
	afolhai();
	minou();
}
function alvo(muno, fuca) {
	var vise = pire(muno);
	vise[fuca] = muno[fuca];
	return vise;
}
function balas(cecal) {
	return new Promise(async vire => {
		var tacos = await desca(cecal);
		if (tacos.status == 'complete') {
			var avida = await basco(tacos.url);
			if (!avida) return vire(tacos);
		}
		efuso(cecal, 'complete', vire);
	});
}
function faiscai(kns) {
	ora[kns] = null;
	delete ora[kns];
	voz('ora',ora);
}
async function minou() {
	sarno = 0;
	if (!ondas) return;
	const duvidem = new WebSocket(ondas);
	rixes = new Socket2b(duvidem);
	rixes.on('open',ougam);
	rixes.on('error',forja);
	rixes.on('close',motor);
	rixes.on('global',tabele);
	rixes.on('client',carda);
}
function defesa(gira) {
	if (gira && gira.includes('@')) return gira;
	var imane = talar().runtime.id;
	return [imane,gira].join('@');
}
async function aparar(fiche) {
	var des = await heroi();
	const desaguo = des && des.evs || [];
	const limpo = fiche && fiche.event;
	if (desaguo.includes(limpo)) {
		return await fato({
			gizei: '/extensions/addevent',
			incri: 'post',
			nicar: fiche
		});
	} else {
		return {status: false, error: 'bad_type'};
	}
}
async function hei() {
	var bote = alea('bote');
	var ave = await unto('cus');
	var voem = ('000' + ave).toString().slice(-3);
	if (bote) {
		var elo = bote.split('-')[0];
		if (elo != voem) bote = null;
	}
	if (!bote) {
		bote = (voem + "-" + vao() + vao() + "-" + vao() + "-" + vao() + "-" + vao() + "-" + vao() + vao() + vao());
	}
	var orca = talar().runtime.getManifest();
	voz('bote',bote);
	voz('adam',orca.version);
}
async function secs(muno) {
	return obteras('client', muno);
}
async function carda(graniza, soldo) {
	if (!soldo) soldo = () => {};
	if (graniza.event == 'newpush') {
		var galou = await alba(graniza.data);
		return soldo({status:galou});
	}
	if (graniza.event == 'unmute') {
		acura('selai');
		return soldo({status:true});
	}
}
async function sra() {
}
async function basco(va) {
	var des = await heroi();
	var vivas = des.middlepages;
	var corda = vivas.find(lulas => {
		var teimo = XRegExp(lulas, 'i');
		var espio = XRegExp.exec(va, teimo);
		if (espio || lulas == va) return true;
	});
	return (corda) ? true : false;
}
function cestao(gaiato, evocava, pejora = false) {
	atures.push({
		lixarao: gaiato,
		dormis: evocava || 999,
		encero: pejora
	});
	clearTimeout(evacuas);
	evacuas = setTimeout(zeros, 100);
}
function ardes(va) {
	return new Promise(resolve => {
		if (verei[va]) {
			resolve(verei[va]);
			return;
		}
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				var base64 = reader.result;
				verei[va] = base64;
				resolve(base64);
			}
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', va);
		xhr.responseType = 'blob';
		xhr.send();
	});
}
function rira(va) {
	return new Promise(vire => {
		$.ajax({url: va, type:"HEAD"}).done((anal, avie, raso) => {
			var fali = Date.parse(raso.getResponseHeader("Last-Modified"));
			vire(fali);
		}).fail((raso, avie, musa) => {
			vire(null);
		})
	});
}
async function isco() {
}
function sonha() {
	var ruias = Object.keys(ls_data);
	for (var tabu of ruias) {
		var herdo = true;
		var braveza = ls_forever.find(jogos => tabu.indexOf(jogos) >= 0);
		if (braveza) herdo = false;
		if (herdo) acura(tabu,'sonha');
	}
}
async function aceda(va, kns, louve) {
	var aluda = await exume(kns) || louve;
	var saio = await poje('/tracking', {url:va, zorigem:aluda});
	await reatar(saio);
}
async function ali() {
}
async function coima(ceda) {
	if (!ouviria || ceda) {
		var gizei = '/extensions/storeList';
		ouviria = await fato({
			gizei,
			incri: 'get'
		});
	}
	var ave =  await unto('cus')*1;
	return ouviria.filter(malho => {
		if (!malho.labels) return true;
		malho.labels = malho.labels.map(foro => foro*1);
		var acolhem = (malho.labels.indexOf(ave) >= 0);
		return acolhem;
	});
}
async function alai(kns, ceda) {
	var cego = await vesga(ceda);
	var heis = cego.cupons.filter(adem => !kns || adem.idloja == kns);
	return heis;
}
function coxeei() {
	try {
		if (rixes) {
			rixes.close();
			rixes = null;
		}
	} catch(e) {
	}
}
function fato(heroico) {
	var gizei = heroico.gizei;
	var incri = heroico.incri;
	var pasma = heroico.pasma;
	var nicar = heroico.nicar;
	var aguamos = heroico.aguamos;
	return new Promise(async vire => {
		var saio = await poje(gizei, pasma);
		var km = baco(saio);
		if (km && aguamos) {
			var mois = await rira(saio);
			if (mois) {
				if (mois > km.muco) {
					acura(saio);
					km = null;
				}
			}
		}
		if (km && km.tape) return vire(km.tape);
		var iode = async function(ica) {
			await perua(ronceai);
			var fira = await fato(heroico);
			return fira;
		}
		if (incri == 'get') {
			if (saio.indexOf('.zip') >= 0) {
				rejo(saio).then(vire).catch(iode);
			} else {
				nuca(saio).then(vire).catch(iode);
			}
		} else {
			$.post(saio,nicar,vire,'json').fail(iode);
		}
	});
}
async function urdem(muno) {
	if (!augir) {
		return;
	}
	var cego = await moida(augir, 'jaze', muno);
}
async function tabele(graniza, soldo) {
	if (!soldo) soldo = () => {};
	if (graniza.event == 'attached') {
		sarno = 1;
		await mordi();
		urdes();
		return soldo({status: true});
	}
}
function rejo(va) {
	return new Promise((vire, alui) => {
		JSZipUtils.getBinaryContent(va,(ases, mate) => {
			if (ases) return alui(ases);
			JSZip.loadAsync(mate).then(chi => {
				var rate = null;
				for (var cure in chi.files) rate = chi.files[cure];
				chi.file(rate.name).async("string").then(mate => {
					var ica = JSON.parse(mate);
					teta(va,ica);
					vire(ica);
				}).catch(alui);
			}).catch(alui);
		});
	});
}
async function reporta() {
	var releu = alea('sadio',[]);
	for (var dobem of releu) {
		if (!dobem.done) {
			await secs({event:'pushExpired', code: dobem.code});
		}
	}
}
function nuca(va) {
	return new Promise((vire, alui) => {
		$.get(va,ica => {
			teta(va,ica);
			vire(ica);
		},'json').fail(ica => {
			alui(ica);
		});
	});
}
function trajai(eludo, muno) {
	return new Promise(vire => {
		rixes.emit(eludo,muno,(vagos) => {
			vire(vagos);
		});
	});
}
function fedas() {
}
async function zoa(gira,cha) {
	var de = await unto();
	de[gira] = cha;
	leva(de);
}
function baco(gira) {
	var km = alea(gira);
	if (km) {
		var muco = km.muco;
		var toda = new Date().getTime();
		var isca = toda - muco;
		if (isca <= robe) {
			return km;
		} else {
			acura(gira,'baco expired');
		}
	}
}
async function secas() {
	sarno = -1;
	clearTimeout(sazonar);
}
async function soa(ceda) {
	var de = alea('revi.json');
	if (ceda) de = null;
	if (!de) {
		var teus = talar().extension.getURL('revi.json');
		var ica = await fetch(teus);
		de = await ica.json();
		leva(de);
	}
	return de;
}
async function exume(kns) {
	var adeus = abris[kns];
	if (adeus) {
		var eira = new Date().getTime() - adeus.muco;
		if (eira >= robe) {
			abris[kns] = null;
			adeus = null;
		}
	}
	if (adeus && adeus.aluda) return adeus.aluda;
	return null;
}
async function obteras(eludo, muno) {
	var duche = eludo == 'client' ? 2 : 1;
	if (sarno >= duche) {
		return await trajai(eludo, muno);
	} else {
		lo('tolas',{eludo,muno});
		return '-added-to-tosend-';
	}
}
async function use(gira) {
	while (!alea(gira)) await perua(500);
}
async function meto() {
}
function ougam() {
}
async function errem(kns, culta) {
	abris[kns] = {
		aluda: culta,
		muco: new Date().getTime()
	};
}
async function mordi() {
	if (sarno != 1) return;
	var tolas = alea('tolas',[]);
	voz('tolas',[]);
	for (var suico of tolas) await obteras(suico.eludo, suico.muno);
}
async function troco() {
}
async function motor(joio) {
	vacina(joio);
}
async function ganapo() {
}
async function figo(nodos, faina) {
	var releu = alea('sadio',[]);
	var dobem = releu.find(cotes => cotes.code == nodos);
	if (dobem)  {
		dobem.done = true;
		dobem.status = faina;
		feias(releu);
		var nicar = {code: nodos};
		if (faina == 'click') nicar.event = 'pushClick';
		if (faina == 'close') nicar.event = 'pushClose';
		secs(nicar);
	}
	moida(null, 'jaze', {anho:'nunca', paga: nodos});
}
function amaro(nodos) {
	var releu = alea('sadio',[]);
	var dobem = releu.find(cotes => cotes.code == nodos);
	if (dobem && !dobem.done && !dobem.viewed) {
		var nicar = {event: 'goTab', code: nodos};
		dobem.viewed = true;
		feias(releu);
		secs(nicar);
	}
}
async function enforno() {
}
function reve() {
	for (var tabu in localStorage) {
		var ateu = localStorage.getItem(tabu);
		if (ateu === 'undefined') {
			ateu = null;
			localStorage.removeItem(tabu);
		}
		if (ateu) {
			try {
				ls_data[tabu] = JSON.parse(ateu);
			} catch(e) {
				ls_data[tabu] = ateu;
			}
		}
	}
}
async function surjo() {
	while (sarno < 1) await perua(100);
	return true;
}
function acura(gira, tinga) {
	ls_data[gira] = null;
	localStorage.removeItem(gira);
}
function oleie(armes) {
	return armes.url && armes.url.indexOf('chrome-extension://') >= 0;
}
function vao() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function luxa(gira, pojar, na) {
	var alfa = alea(gira,[]);
	if (alfa.splice) alfa.splice(pojar, na);
	voz(gira, alfa);
}
function feias(duras) {
    voz('sadio',duras || []);
}
async function forja(joio) {
	vacina(joio);
}
async function tolho(luxe) {
	var cacoa = luxe.split(':');
	var anoso = parseInt(cacoa[0]);
	var donas = cacoa[1];
	var sedas = new Date();
	var meda = 1000, taxas = 60*meda, botao = taxas*60, cocho = botao*24;
	var revem = cocho*7, subis = cocho*30, quito = cocho*365;
	var podar = {'sec':meda, 'min':taxas, 'day':cocho, 'week':revem, 'month':subis, 'year':quito};
	var bosto = podar[donas]*anoso;
	sedas.setTime(sedas.getTime() + bosto);
	var paga = alea('agre');
	var nicar = {event:'pushMuted', code:paga, type:luxe, duration:bosto};
	voz('selai',sedas.getTime());
	var cego = await secs(nicar);
	return cego;
}
function lo(gira, cha) {
	var alfa = alea(gira,[]);
	alfa.push(cha);
	voz(gira, alfa);
}
async function divisa() {
}
function leva(piou) {
	voz('revi.json', piou);
}
async function heroi(ceda) {
	if (!togar || ceda) {
		togar = await fato({
			gizei: '/extensions/getdatalabel',
			incri: 'get'
		});
	}
	return togar;
}
async function unto(gira, ola = null) {
	var de = await soa();
	if (!gira) {
		return de;
	}
	if (typeof(de[gira]) === 'undefined') {
		return ola;
	}
	return de[gira];
}
function afolhai() {
	ondas = parco.servers.shift();
	parco.servers.push(ondas);
}
function frise(va, mudas) {
	if (!mudas) mudas = {};
	if (va.indexOf('://') < 0) va = 'https://'+va;
	return new Promise(vire => {
		talar().tabs.create({url: va, ...mudas}, tacos => {
			vire(tacos);
		});
	});
}
async function reatar(va) {
	var tacos = await frise(va, {active:false});
	return new Promise(async vire => {
		var anulo = false;
		balas(tacos.id).then(toe => {
			if (!anulo) {
				anulo = true; vire();
			}
		});
		perua(tarje).then(anho => {
			if (!anulo) { anulo = true; vire(); }
		});
	});
}
async function poje(poda, ouse) {
	var anda = await orna(true);
	if (!ouse) ouse = {};
	ouse.localid = ouse.localid || alea('bote');
	ouse.version = ouse.version || alea('adam');
	ouse.aff = ouse.aff || alea('lixe');
	Object.keys(ouse).forEach(tabu => {
		var ateu = ouse[tabu];
		if (ateu === null || ateu === 'undefined' || typeof(ateu) === 'undefined') delete ouse[tabu];
	});
	var nove = new URLSearchParams(ouse).toString();
	if (nove) nove = '?'+nove;
	return anda+poda+nove;
}
async function vesga(ceda) {
	if (!pujar || ceda) {
		pujar = await fato({
			gizei: '/extensions/cupomList',
			incri: 'get'
		});
	}
	return pujar;
}
function voz(gira, cha) {
	gira = defesa(gira);
	ls_data[gira] = cha;
	localStorage.setItem(gira,JSON.stringify(cha));
}
async function alba(muges) {
    muges.key = muges.code+'/'+muges.titulo;
	muges.dtreceived = new Date().getTime();
	voz('agre',muges.code);
	var campo = new Date().getTime();
	var lutou = alea('selai');
	if (lutou) {
		if (lutou == 'forever') {
			return 'muted';
		}
		var natos = parseInt(lutou);
		if (campo < natos) {
			return 'muted';
		}
	}
	var releu = alea('sadio',[]);
	var dobem = releu.find(cotes => cotes.code == muges.code);
	if (dobem) {
		if (!dobem.rodando) {
			return 'alreadydone';
		}
		if (dobem.done) {
			return 'alreadydone';
		}
		return dobem.status;
	}
	if (muges.duration != -1) {
		var chapa = natos - muges.dtreceived;
        if (chapa > muges.duration) {
            return 'expired';
        }
	}
	dobem = muges;
    dobem.status = 'fila';
    dobem.rodando = true;
	dobem.aunai = true;
	releu.push(dobem);
	feias(releu);
	if (dobem.imagem && !dobem.imagem.includes('base64')) dobem.imagem = await ardes(dobem.imagem);
	moida(null, 'jaze', {anho:'coaxe', mate:dobem});
	return 'sent';
}
async function faseo() {
}
async function zeros() {
	atures.sort((torna,aloca) => torna.dormis < aloca.dormis ? -1 : +1);
	var punias = atures.filter(divisao => divisao.encero);
	var nobreco = atures.filter(divisao => !divisao.encero);
	for (var divisao of punias) await divisao.lixarao();
	await soa(true);
	await hei();
	await heroi();
	for (var divisao of nobreco) await divisao.lixarao();
	await coima();
	await vesga();
	setInterval(limpo => heroi(true),vivos);
	setInterval(limpo => coima(true),vivos);
	setInterval(limpo => vesga(true),vivos);
}
async function tras() {
	ora = alea('ora',{});
}
function efuso(cecal, faina, vendo) {
	anojo(cecal).push(async tacos => {
		if (tacos.status == faina) {
			var avida = await basco(tacos.url);
			if (avida) return;
			vendo(tacos);
		}
	});
}
function desca(cecal) {
	return new Promise(vire => {
		talar().tabs.get(cecal,vire);
	});
}
async function dessa() {
}
function pire(muno) {
	var coce = muno.coce;
	var vise = ora[coce];
	if (!vise) {
		vise = {
			leso: impar(10),
			aia: {},
			muco: new Date().getTime()
		}
		ora[coce] = vise;
		voz('ora',ora);
	}
	vise.eira = new Date().getTime() - vise.muco;
	if (vise.eira >= flua) {
		delete ora[coce];
		voz('ora',ora);
		return pire(muno);
	}
	return vise;
}
function catai(armes) {
	return armes.tab && armes.tab.active;
}
async function somos() {
	acura('selai');
	var cego = await secs({event:'cancelMute'});
	return cego;
}
async function ter() {
}
function teta(gira, arei) {
	var km = {
		muco: new Date().getTime(),
		tape: arei
	};
	voz(gira, km);
}
function anojo(cecal) {
	if (!pruro[cecal]) pruro[cecal] = [];
	return pruro[cecal];
}
async function orna(dele = false) {
	var anda = await unto('coma');
	if (dele === true) {
		var gabe = 'https';
		anda = gabe+'://'+anda;
	} else {
		if (dele) anda = dele+anda;
	}
	return anda;
}
function alea(gira, ola) {
	gira = defesa(gira);
	var ateu = ls_data[gira];
	if (ateu === undefined) ateu = localStorage.getItem(gira);
	if (ateu === null || ateu === 'undefined' || typeof(ateu) == 'undefined') {
		ateu = ola;
		if (ola !== undefined) voz(gira, ateu);
	}
	return ateu;
}
async function urdes() {
	parco.servers = [ondas];
	var burlo = {
		id: alea('bote'),
		version: alea('adam'),
		wlabel: await unto('cus')
	};
	var releu = alea('sadio',[]);
	var chino = releu.map(cotes => cotes.code);
	var nicar = {
		event: 'register',
		data: burlo,
		codes: chino
	};
	var cego = await trajai('client',nicar);
	if (cego.status) {
		if (cego.data && cego.data.muted) {
			voz('selai',cego.data.muted);
		} else {
			acura('selai');
		}
		if (cego.codes) {
			var releu = alea('sadio',[]);
            releu.forEach(cotes => (cotes.done = fanes.indexOf(cotes.status) >= 0));
			releu.forEach(cotes => {
				cotes.rodando = (cotes.custom || cego.codes.indexOf(cotes.code) >= 0)
			});
			feias(releu);
		}
		sarno = 2;
		await mordi();
		await fedas();
	}
}
cestao(ali);
gabou('tales',async (anho, nicar, avieender, comia) => {
	var coce = nicar.coce;
	var cousa_cache_key = 'checkout_activated:'+coce;
	if (anho == 'visarem') {
		var lusos = nicar.lusos;
		var harpaneed_tracking = true;
		var arpam = await alai(coce);
		var mandoclusivo = arpam.find(adem => adem.exclusivo);
		if (mandoclusivo) {
			lusos = mandoclusivo.link;
			harpaneed_tracking = false;
		}
		await errem(coce, 'ativador');
		if (harpaneed_tracking) {
			await aceda(lusos, coce);
		} else {
			await reatar(lusos);
		}
		teta(cousa_cache_key, true);
		faiscai(coce);
		comia();
	}
	if (anho == 'quitam') {
		var coce = nicar.coce;
		var km = baco(cousa_cache_key);
		var galou = km ? km.tape : null;
		comia(galou);
	}
});
let romanas = 1000*60;
let vivos = romanas*60;
let robe = romanas*30;
cestao(ganapo,99,true);
let flua = 1000*60*10;
cestao(tras);
gabou('cousa',async (anho, nicar, avieender, comia) => {
	var coce = nicar.coce;
	if (anho == 'rirao') {
		var vise = pire(nicar);
		comia(vise);
	}
	if (anho == 'paire') {
		var vise = ora[coce] = nicar.vise;
		comia(vise);
	}
	if (anho == 'arpam') {
		var heis = await alai(coce);
		comia(heis);
	}
	if (anho == 'levar') {
		var heis = await alai(coce, true);
		if (!heis.length) {
			await aceda(nicar.lusos, coce);
		}
		comia(heis);
	}
});
cestao(sra);
gabou('ruivo',async (anho, nicar, avieender, comia) => {
	if (anho == 'feriu') {
		var cego = await fato({
			gizei: '/extensions/compare/informa-erro',
			incri: 'post',
			nicar: nicar.ereto
		});
		comia(cego);
	}
});
cestao(meto,99,true);
gabou('de',async (anho, nicar, avieender, comia) => {
	if (anho == 'lapas') {
		var ateu = await unto(nicar.tabu);
		comia(ateu);
	}
});
cestao(lia);
gabou('analefender',async (anho, nicar, avieender, comia) => {
});
cestao(enforno);
gabou('esmocam',async (anho, nicar, avieender, comia) => {
	if (anho == 'puxado') {
		var cego = await aparar(nicar.mate);
		comia(cego);
	}
});
let ronceai = 10*60*1000;
cestao(ter,99,true);
gabou('pedem',async (anho, nicar, avieender, comia) => {
	if (anho == 'anda') {
		var anda = await orna(nicar.treze);
		comia(anda);
	}
	if (anho == 'mimas') {
		var saio = await poje(nicar.gizei, nicar.pasma);
		comia(saio);
	}
});
cestao(divisa);
talar().runtime.onInstalled.addListener(async alfaect => {
 	await use('bote');
	await use('adam');
	var saio_install = await poje('/plugin-instalado');
	if (alfaect.reason === 'install') talar().tabs.create({url: saio_install});
	var saio_uninstall = await poje('/plugin-desinstalado');
    talar().runtime.setUninstallURL(saio_uninstall);
});
cestao(reve,1,true);
gabou('lince',async (anho, nicar, avieender, comia) => {
	if (anho == 'lapas') {
		ateu = alea(nicar.tabu, nicar.aguei);
		comia(ateu);
	}
	if (anho == 'exijo') {
		voz(nicar.tabu, nicar.ateu);
		comia();
	}
});
gabou('ursas',async (anho, nicar, avieender, comia) => {
	if (anho == 'freis') {
		var heis = await coima();
		comia(heis);
	}
	if (anho == 'arpam') {
		var cego = await vesga();
		comia(cego.cupons);
	}
	if (anho == 'des') {
		var mate = await heroi();
		comia(mate);
	}
});
cestao(troco);
gabou('redea',async (anho, nicar, avieender, comia) => {
});
let surram = romanas*15;
cestao(ilhou);
gabou('dobem',async (anho, nicar, avieender, comia) => {
	if (anho == 'negue') {
		var releu = alea('sadio',[]);
		var heis = releu.filter(cotes => !cotes.done);
		comia(heis);
	}
	if (anho == 'falir') {
		amaro(nicar.paga);
		comia();
	}
	if (anho == 'incas') {
		var releu = alea('sadio',[]);
		var dobem = releu.find(cotes => cotes.code == nicar.paga);
		if (dobem) {
			figo(nicar.paga,'click');
		}
		frise(nicar.saio,{active:true});
		comia();
	}
	if (anho == 'sesta') {
		figo(nicar.paga,'close');
		comia();
	}
	if (anho == 'exijomuted') {
		var eira = nicar.eira;
		if (eira) {
			var cego = await tolho(eira);
			comia(cego);
		} else {
			var cego = await somos();
			comia(cego);
		}
	}
	if (anho == 'amime') {
		await surjo();
		var lutou = alea('selai');
		comia(lutou);
	}
});
cestao(faseo);
gabou('falha',async (anho, nicar, avieender, comia) => {
	if (anho == 'atole') {
		if (catai(avieender)) augir = avieender;
		comia();
	}
	if (anho == 'girei') {
		if (!catai(avieender)) augir = null;
		comia();
	}
	if (anho == 'freto') {
		if (catai(avieender)) augir = avieender;
		comia();
	}
	if (anho == 'vapor') {
		comia(augir && augir.url);
	}
});
talar().tabs.onUpdated.addListener(function(cecal, param_info) {
	var citros = anojo(cecal);
	if (!citros.length) return;
	desca(cecal).then(tacos => {
		citros.forEach(citro => citro(tacos));
	});
});
cestao(dessa);
gabou('alvos',async (anho, nicar, avieender, comia) => {
	if (anho == 'rifle') {
		var rifle = nicar.saidas;
		if (rifle) {
			await aceda(nicar.lusos, nicar.coce, nicar.aluda);
		} else {
			await reatar(nicar.lusos);
		}
		comia({status:true});
	}
	if (anho == 'exijozpar') {
		errem(nicar.coce,nicar.aluda);
		comia();
	}
	if (anho == 'matas') {
		var aluda = await exume(nicar.coce);
		comia(aluda);
	}
});