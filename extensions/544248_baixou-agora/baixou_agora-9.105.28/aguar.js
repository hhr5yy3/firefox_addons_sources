function gagas() {
	var suite = {};
	var peca = ['r_codigo','r_descricao','r_ean','r_preco'];
	peca.forEach(jorro => {
		var pegar = abafo[jorro];
		if (!pegar) return;
		suite[jorro] = pegar;
	});
	var ramos = onerai(suite);
	afez(ramos.aia);
}
function honro(jades, monhe) {
    monhe = (((monhe || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
    var plebe = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
	var torna = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return jades.replace(torna, "").replace(plebe, (mando, sarne) => monhe.indexOf("<" + sarne.toLowerCase() + ">") > -1 ? mando : '');
}
function apatife(urbes) {
	if (estejais == null) {
		return true;
	}
	if (urbes.codigo && estejais.codigo != urbes.codigo) {
		return true;
	}
	if (urbes.descricao && estejais.descricao != urbes.descricao) {
		return true;
	}
	if (urbes.ean && estejais.ean != urbes.ean) {
		return true;
	}
	if (urbes.preco && estejais.preco != urbes.preco) {
		return true;
	}
	return false;
}
async function zoada() {
	if (!coeso) {
		var coce = trove.idloja;
		coeso = await pujai('cousa',{anho:'arpam', coce});
		var roxeio = {};
		coeso.forEach(adem => {
			var ras = adem.codigo;
			if (roxeio[ras]) return;
			roxeio[ras] = adem;
		});
		coeso = Object.keys(roxeio).map(tabu => roxeio[tabu]);
	}
	return coeso;
}
async function movas(males) {
	var ras = males.codigo;
	var zurze = (ras) ? {bebia:ras} : {regre:'CUPOM APLICADO'};
	ceder({
		donas: 'arpes',
		ovalava: 'macarem',
		remelou: epica.offering.cupom,
		notar: males.titulo,
		cinta: 'Voltar para a minha navegação',
		...zurze
	}, vivaz).then(anho => {
		apara = null;
	});
}
async function hunas(dizer) {
	custa('cousa');
	matem();
	armou('cousa');
	if (dizer) await relam(dizer);
	trove = null;
}
function soava(gelei) {
	var $menos = gelei.find('.aune').removeClass('ce');
	var $acoes = $menos.find('.muja');
	var $lufem = $menos.find('.gamo');
	$acoes.text('Copiar');
	$acoes[0].onclick = anho => {
		var rogou = $lufem.text();
		bafou(rogou);
		$menos.addClass('ce');
		$acoes.text('Copiado!');
	}
}
async function homem() {
	legista('testador-show');
	var atlas = await ceder({
		donas: 'citro',
		alago: epica.search,
		citro: epica.confirmations,
		cinta: epica.fallback,
	}, trove, 'cousa');
	if (atlas) {
		corso();
	} else {
		await hunas('ibero');
	}
}
async function corso() {
	ceder({
		donas: 'soco',
		alago: epica.searching,
		cinta: epica.stop,
		revisse: 'aninhas',
	}, trove, 'cousa').then(async atlas => {
		if (!atlas) {
			hunas('ibero');
		}
	});
	await relam('linha');
	var coce = trove.idloja;
	var lusos = trove.url;
	var mofei = await pujai('cousa',{anho:'levar', coce, lusos});
	if (mofei.length) {
		await relam(null);
	} else {
		await relam('grame');
	}
	punes();
}
function antes(pedis) {
	return new Promise(vire => {
		var goesa = $('evlist');
		var limpo = $('<ev>',pedis).appendTo(goesa);
		var de = {attributes: true};
		var mujas = new MutationObserver(ativo => {
			ativo.forEach(vedou => {
				if (vedou.attributeName == 'aia') {
					var fane = vedou.target;
					var ateu = fane.getAttribute('aia');
					var mate = (ateu) ? JSON.parse(ateu) : null;
					vire(mate);
					mujas.disconnect();
					limpo.remove();
				}
			});
		});
		mujas.observe(limpo[0], de);
	});
}
async function cruza() {
	window.addEventListener('focus',anho => pujai('falha',{anho:'atole'}));
	window.addEventListener('blur',anho => pujai('falha',{anho:'girei'}));
	window.addEventListener('load',anho => pujai('falha',{anho:'freto'}));
}
async function vetes() {
	await sexos();
	var $lides = $('<div>',{class:visa});
	await povoe($lides,'pai.html');
	await briol('.'+visa);
	$leoas = $lides.hide().appendTo(document.body);
	var matiz = await alea('matiz');
	if (matiz) {
		$leoas.css(matiz);
	} else {
		var dorso = window.getComputedStyle($leoas[0]);
		$leoas.css({left:dorso.left,right:''});
	}
	cisao($leoas,{
		vetas: await magoa('figa.png'),
		monte: await magoa('roxa.svg'),
		servi: await magoa('ovar.svg'),
		cioso: await magoa('leal.svg'),
		va_fa_minussquare: await magoa('bens.svg'),
		motim: await magoa('foco.svg'),
		fitei: feita.produtos.length,
		cuido: feita.produtos
	});
	var hajas = {};
	$leoas.find('.golo').each((cure,fane) => {
		var $fane = $(fane);
		var $vazei = $fane.find('.class-entry');
		var inibi = $vazei.attr('name');
		var $sedem = $fane.find('.peje');
		var $marra = $fane.find('.juro').click(limpo => {
			$sedem.toggleClass('somo');
		});
		var negam = hajas[inibi];
		if (negam) {
			$vazei.addClass('ara').appendTo(negam.$sedem);
			negam.$marra.show();
			$marra.remove();
			$fane.remove();
			negam.anoso++;
			negam.$marra.find('.class-qty-subs').text(negam.anoso);
		} else {
			hajas[inibi] = {
				$fane: $fane,
				$vazei: $vazei,
				$sedem: $sedem,
				$marra: $marra,
				anoso:0
			};
		}
	});
	$leoas.find('.class-minus-box').click(limpo => {
		limpo.preventDefault();
		limpo.stopPropagation();
		$leoas.addClass('ha');
	});
	$leoas.find('.ore').click(limpo => {
		limpo.preventDefault();
		if (!mofes) return;
		$leoas.toggleClass('ha');
	});
	$leoas.draggable({
		handle: $leoas.find('.ore'),
		stop(limpo,tripe) {
			mofes = false;
			setTimeout(limpo => mofes = true,100);
			voz('matiz',tripe.position);
		}
	});
	$leoas.find('.geme-box').click(limpo => {
		limpo.preventDefault();
		limpo.stopPropagation();
		$leoas.fadeOut(100);
	});
	$leoas.find('.rota').click(limpo => {
		limpo.preventDefault();
		gemai(limpo);
	});
	$leoas.show();
}
function surge() {
	if (location.href == hotel) return;
	pelam();
}
async function aforo(mudas) {
	return new Promise(async vire => {
		aia = await antes({
			donas: 'incas',
			redea: JSON.stringify(mudas)
		});
		vire(aia);
	});
}
function cajus() {
	if (location.href == mamao) return;
	asai();
}
async function celas(urbes) {
	Object.keys(urbes).forEach(tabu => {
		var ateu = urbes[tabu];
		if(ateu === null || ateu === '') delete urbes[tabu];
	});
	var anilara = apatife(urbes);
	if (!anilara) {
		migais = false;
		return;
	}
	await sexos(200);
	await veloz(200);
	vagai('tanjo',magoa(''));
	if (!teima) {
		var anda = await orna();
		var saio = magoa('ageis.js?host='+anda);
		pagao(saio);
		teima = true;
	}
	estejais = JSON.parse(JSON.stringify(urbes));
	urbes.url = Base64.encode(window.location.href);
	if (urbes.descricao) urbes.descricao = Base64.encode(urbes.descricao);
	var belga = await poje('/extensions-new/findProduct',urbes);
	turma();
	vital = belga;
	var metal = document.querySelector('#baixouIframe');
	if (!metal) metal = document.createElement('iframe');
	metal.src = belga;
	metal.id = 'baixouIframe';
	cinco(metal, {display:'none'});
	var abale = document.querySelector('#baixouDivEspaco');
	if (!abale) abale = document.createElement('div');
	abale.id = 'baixouDivEspaco';
	cinco(abale, {display:'none'});
	loura(metal, document.body);
	sarem(abale, document.body.firstChild);
	setTimeout(() => { migais = false; },1000);
}
async function cocam() {
	if (!vivaz) return;
	var aluda = await pujai('alvos',{anho:'matas', coce:vivaz.idloja});
	return aluda;
}
function atroeis() {
	var acena = $('.'+anuia);
	if (!acena.length) return;
	var alistou = $(window).height();
	var lotares = acena.height();
	var toram = (alistou - lotares)/2;
	acena.css('top',toram);
}
function turma() {
	$('#baixouIframe').remove();
	$('#baixouDivEspaco').remove();
	tossias();
}
async function espiche(males) {
	var vise = await plana();
	var capai = vise.capai;
	var dorme = capai.length;
	var vetou = capai.filter(rimos => rimos.vetou);
	var casas = vetou.length;
	if (males) casas++;
	var aluou = [];
	var dotas = vetou.length-4;
	vetou.forEach((rimos,cure) => {
		if (cure >= dotas || rimos.date) {
			var abuse = rimos.date ? 'gago' : 'rafo';
			var laivo = rimos.date ? 'bits.svg' : 'gire.svg';
			var rogou = rimos.codigo; if (rimos.date) rogou += ' (R$ '+uses(rimos.isca)+' de desconto)';
			aluou.push({abuse, laivo, rogou});
			dotas++;
		}
	});
	if (males) {
		aluou.push({abuse:'vaze', laivo:'armo.svg', rogou:males.codigo});
	}
	var saio = await magoa('');
	aluou.forEach(fores => fores.laivo = saio+fores.laivo);
	ceder({
		donas: 'vise',
		alago: 'Aplicando cupons '+casas+' de '+dorme,
		vise: casas/dorme,
		coaxou: epica.progress,
		aluou: aluou,
		cinta: epica.stop,
		revisse: 'aninhas',
	}, trove, 'cousa').then(async atlas => {
		if (!atlas) hunas('voar');
	});
}
async function poje(poda, ouse) {
	return await pujai('pedem',{anho:'mimas', gizei:poda, pasma:ouse});
}
function vejam() {
	if (apara) return movas(apara);
	morsa();
}
async function alea(gira, ola) {
	return await pujai('lince',{anho:'lapas', tabu:gira, aguei:ola});
}
async function duplo() {
	await orado();
	window.addEventListener('locationchange',cajus);
	beber();
}
async function legista(joio) {
	var coce = trove.idloja;
	await pujai('esmocam',{anho:'puxado', mate:{event:joio, idloja:coce}});
}
function lanhe(fiche) {
	var real = 20;
	fiche.$fane.css('bottom',real + 105*fiche.atica);
}
async function pejes() {
 	var heis = await pujai('dobem',{anho:'negue'});
	heis.forEach(urzes);
}
async function opala() {
	ceder({
		donas: 'nadai',
		alago: epica.best_already,
		notar: epica.search_empty,
		cinta: epica.fallback,
		avisa: true
	}, trove, 'cousa');
	hunas('ibero');
}
async function beber() {
	mamao = location.href;
	await finas();
	if (trove) {
		await voz('moroso',0);
		erice = epica.wait_after_input;
		manejem = epica.wait_to_giveup;
		ansias = epica.reload_after_giveup;
		sigas = epica.wait_after_remove;
		pudim = epica.wait_after_apply;
		if (!molda) {
			molda = true;
			await uives(trove.checkout_cssrules,{
				RIBBON: uvaca,
				DIALOG: fendo,
				BACKDROP: calfe
			});
		}
		var pises = await tenso();
		if (pises) {
			var coce = trove.idloja;
			var mate = trove.checkout;
			if (location.search) {
				var submeto = mate.remove_params_url;
				if (submeto) {
					var madres = await alea('moroso');
					if (!madres) {
						await voz('moroso',1);
						location.href = '//'+location.host;
						return;
					}
				}
			}
			var pecadas = mate.ativado_por_padrao;
			if(!pecadas) {
				var baldeei = await pujai('tales',{anho: 'quitam', coce});
				if(!baldeei) {
					var gritou = 'checkout not activated';
					return hunas(gritou);
				}
			}
			ejeta();
			return;
		}
	}
	hunas();
}
function bucha(breia) {
	if (!breia) return;
	var telhe = window.location.href;
	var teimo = XRegExp(breia, 'i');
	var espio = XRegExp.exec(telhe, teimo);
	if (espio || breia == telhe) return true;
}
async function geeis() {
	if (!calai) {
		calai = await pujai('cousa',{anho: 'troe.checkout'});
	}
	return 	calai;
}
async function afligis(daqui) {
	var coce = -1;
	var lusos = location.origin;
	if (vivaz) {
		coce = vivaz.idloja;
		lusos = abafo.url;
	}
	await pujai('tales',{anho:'visarem', coce, lusos});
	var metal = document.querySelector('#baixouIframe');
	var gotejou = metal ? metal.contentWindow : window;
	gotejou.postMessage({acao:'testadorAtivado'},'*');
}
async function serie(legou) {
	if (!trove) await unica();
	var coce = trove.idloja;
	return await pujai('cousa',{anho:'paire', vise:legou, coce});
}
function uses(cha) {
	if (!cha) return 0;
	if (cha.toFixed) cha = cha.toFixed(2);
	if (cha.replace) cha = cha.replace('.',',');
	return cha;
}
async function alude() {
	await espiche();
	await perua(2000);
	var vise = await plana();
	var date = vise.capai.filter(rimos => rimos.date);
	if (!date.length) {
		ceder({
			donas: 'nadai',
			alago: epica.best_already,
			notar: epica.tests_ended,
			cinta: epica.fallback,
			revisse: 'aninhas',
			avisa: true
		}, trove, 'cousa');
		return hunas('ibero');
	}
	ceder({
		donas: 'soco',
		alago: epica.applying_best,
		notar: epica.tests_ended,
		cinta: epica.stop,
		revisse: 'aninhas',
	}, trove, 'cousa');
	date.sort((torna,aloca) => aloca.isca - torna.isca);
	vise.ilhem = date[0];
	vise.caida = 'ticao';
	await serie(vise);
	await roido(vise.ilhem, true);
	punes();
}
async function coagi(fiche) {
	await pujai('dobem',{anho:'incas', paga:fiche.code, saio:fiche.link});
	await urjam(fiche, true);
}
async function agite() {
	legista('testador-show');
	var coeso = await zoada();
	var anoso = coeso.length;
	var avie = (anoso == 1) ? '' : 's';
	var adotei = (anoso == 1) ? 'm' : 'ns';
	var pegam = await ceder({
		donas: 'citro',
		alago: anoso+' Cupo'+adotei+' de descontos encontrado'+avie+'.',
		citro: epica.questmations,
		cinta: epica.fallback
	}, trove, 'cousa');
	if (pegam) {
		await relam('pegam');
		bicai();
	} else {
		hunas('voar');
	}
}
function armou(chaga) {
	var $acena = $('.'+anuia);
	var $porem = $('.'+vinda);
	if (chaga) {
		var sanha = $acena.attr('sanha');
		if (sanha != chaga) return;
	}
	$acena.hide();
	$porem.hide();
}
async function relam(dizer) {
	var vise = await plana();
	vise.caida = dizer;
	await serie(vise);
}
function punes() {
	var mate = trove.checkout;
	if (mate.prevent_refreshs) {
		ejeta();
	} else {
		location.reload();
	}
}
async function alcas() {
	legista('testador-show');
	var coeso = await zoada();
	var anoso = coeso.length;
	var avie = (anoso == 1) ? '' : 's';
	var adotei = (anoso == 1) ? 'm' : 'ns';
	var pegam = await ceder({
		donas: 'citro',
		porem: false,
		ovalava: 'alma',
		alago: anoso+' cupo'+adotei+' encontrado'+avie,
		notar:  epica.questions,
		citro: epica.confirmations
	}, trove, 'cousa');
	envidem();
	if (pegam) {
		var vise = await plana();
		vise.capai = null;
		await serie(vise);
		bicai();
	} else {
		hunas('ibero');
	}
}
function morreu(sare, vitae) {
	if (!vitae) return;
	var loiros = [];
	if (vitae.fontSize) loiros.push(`font-size: ${vitae.fontSize}px !important`);
	sare.attr('style',loiros.join(';'));
}
async function tinjo() {
	if (migais) return;
	migais = true;
	window.removeEventListener('locationchange',surge);
	window.addEventListener('locationchange',surge);
	pelam();
}
function sanitas(sare, vitae) {
	if (!vitae) return;
	morreu(sare.find('.ouro'),vitae.title);
}
async function urzes(fiche) {
	var lobao = piram.find(cotes => cotes.code == fiche.code);
	if (lobao) return false;
	piram.push(fiche);
	if (!$indio) {
		var $lides = $('<div>');
		await povoe($lides,'bug.html');
		$indio = $lides;
	}
	await sexos();
	await briol('.'+taram);
	var $fane = $indio.clone();
	fiche.$fane = $fane;
	$fane.find('.geme').click(anho => {
		anho.preventDefault();
		anho.stopPropagation();
		roubo(fiche);
	});
	$fane.click(anho => coagi(fiche));
	fiche.hasta = await magoa('roxa.svg');
	cisao($fane,fiche);
	$fane.find('.zebu').attr('style','border-left-color: '+fiche.corfundo+' !important');
	$fane.addClass(taram).appendTo(document.body);
	sanitas($fane, fiche.css);
	if (fiche.aunai) $fane.find('.mima').addClass('tece');
	fiche.urrem = true;
	fiche.atica = secar;
	lanhe(fiche);
	secar++;
	pujai('dobem',{anho:'falir',paga:fiche.code});
	return true;
}
async function pelam() {
	hotel = location.href;
	await finas();
	if (abafo) {
		perco = new Date().getTime();
		gagas();
	} else {
		migais = false;
		turma();
	}
}
async function aferrai() {
	var metal = document.querySelector('#baixouIframe');
	if (!metal) return;
	coce = vivaz.idloja;
	var galou = await pujai('tales',{anho:'quitam', coce});
	var metal = document.querySelector('#baixouIframe');
	metal.contentWindow.postMessage({'acao': 'setFlagAtivador','flag': galou}, "*");
}
function ceder(ouse, bacos, chaga) {
	var orca = talar().runtime.getManifest();
	var olas = {
		ovalava: 'class-modal',
		porem: true,
		remelou: epica.offering.testador,
		canil: bacos ? bacos.url_imagem : null,
		tacas: magoa('figa.png'),
		uniu: magoa('creu.png'),
		nisto: orca.name.split(' (Build')[0],
		azule: true,
		tarja: true,
		iroso: false,
		finjo: true
	};
	if (ouse.donas == 'nadai') {
		olas.azule = false;
		olas.tarja = true;
	}
	if (ouse.donas == 'arqueta') {
		olas.azule = false;
		olas.tarja = false;
	}
	if (ouse.donas == 'vise') {
		olas.azule = false;
		olas.iroso = (ouse.vise > 0);
		olas.bufei = (ouse.vise*100).toFixed(2) + '%';
		olas.rumas = magoa('sele.gif');
	}
	if (ouse.donas == 'soco') {
		olas.azule = false;
	}
	if (ouse.donas == 'arpes') {
		olas.azule = false;
		olas.segue = 'adem';
		olas.arpes = true;
	}
	var aluiu = {...olas, ...ouse};
	return new Promise(async vire => {
		await briol('.'+anuia);
		await sexos(100);
		var acena = $('.'+anuia);
		var porem = $('.'+vinda);
		var vibrai = [anuia,'class-color','border-primary',aluiu.ovalava];
		if (!acena.length || ouse.polipo) {
			envidem();
			acena = $('<div>',{class: anuia}).appendTo(document.body);
			porem = $('<div>',{class: vinda}).appendTo(document.body);
			await povoe(acena,'cama.html');
		}
		acena.attr('class',vibrai.join(' '));
		acena.attr('sanha',chaga);
		acena.find('[filas]').each((cure,fane) => {
			fane.onclick = anho => {
				var fane = $(anho.currentTarget);
				var galou = (fane.attr('filas') == '1');
				vire(galou);
				if (aluiu.finjo) armou();
			}
		});
		soava(acena);
		preza(acena);
		cisao(acena,aluiu);
		acena.show();
		if (aluiu.porem) porem.show();
		atroeis();
	});
}
async function andei() {
	ceder({
		donas: 'vise',
		alago: epica.preparing,
		notar: '',
		cinta: epica.stop,
		revisse: 'aninhas',
		polipo: true
	}, trove, 'cousa').then(async atlas => {
		if (!atlas) hunas('voar');
	});
	var coeso = await zoada();
	var pecadas = trove.checkout.ativado_por_padrao;
	var mareara = false;
	var coce = trove.idloja;
	await relam('bulho');
	var decotas = coeso && coeso.find(suico => suico.exclusivo);
	var lusos = decotas ? decotas.link : trove.url;
	var saidas = decotas ? decotas.forcetrack : true;
	var aluda = 'testador';
	if (lusos) {
		if (pecadas) {
			await pujai('alvos',{anho:'rifle', lusos, saidas, coce, aluda});
			mareara = true;
		}
	}
	var vise = await plana();
	vise.capai = coeso;
	vise.tarjo = await muita();
	await serie(vise);
	await bruxa(true);
	if (cubas) return;
	vise.tarjo = await muita();
	await serie(vise);
	if (mareara) {
		return punes();
	}
	ejeta();
}
async function morsa() {
	window.addEventListener('locationchange',vejam);
	tones();
}
async function muita() {
	var pises = await tenso({vencida: 'dorme', trazias: true});
	if (!pises) return 0;
	var mate = trove.checkout;
	var rogou = $(mate.selectortotal).first().text();
	var amove = honro(rogou);
	var taxou = palio(amove);
	return parseFloat(taxou);
}
async function avive() {
	var vise = await plana();
	var capai = vise.capai;
	var adem = capai.find(rimos => !rimos.vetou);
	adem.mores = true;
	await serie(vise);
	await espiche(adem);
	await relam('bulho');
	adem.vetou = true;
	await serie(vise);
	await roido(adem, true);
	if (cubas) return;
	await cozeu();
	await serie(vise);
	bicai();
}
async function orna(dele) {
	return await pujai('pedem',{anho:'anda', treze:dele});
}
async function finas() {
	gerar = await pujai('ursas',{anho:'freis'});
	if (!gerar) { await perua(100); return finas(); }
	var telhe = window.location.href;
	var km = xaropai[telhe];
	if (km) {
		vivaz = km.vivaz;
		abafo = km.abafo;
		trove = km.trove;
	} else {
		var colagem = clivai(gerar,'url');
		var difusao = clivai(gerar,'r_dominio');
		var locaria = clivai(gerar,'url','checkout');
		vivaz = colagem.find(fores => bucha(fores.url));
		abafo = difusao.find(fores => bucha(fores.r_dominio));
		trove = locaria.find(fores => bucha(fores.checkout.url));
		xaropai[telhe] = {vivaz, abafo, trove};
	}
	if (vivaz) cites = 'fomes';
	if (abafo) cites = 'ainda';
	if (trove) cites = 'cousa';
}
function envidem() {
	$('.'+anuia).remove();
	$('.'+vinda).remove();
}
async function gemai(joio) {
	if (laser) return;
	laser = true;
	var $trace = $(joio.currentTarget);
	var $veiga = $trace.find('span');
	$trace.addClass('opos');
	$veiga.text('Informando erro...');
	var ereto = {
		localid: await alea('bote'),
		produto: feita.produto,
		master: feita.agrupamento,
		loja: feita.loja,
		url: location.href
	};
	var cego = await pujai('ruivo',{anho:'feriu',ereto});
	$trace.removeClass('opos');
	if (cego.status) {
		$trace.addClass('bise');
		$veiga.text('Erro informado com sucesso!');
	} else {
		$veiga.text('Falha ao informar erro.');
	}
	laser = false;
}
async function urjam(fiche, sanem) {
	piram.filter(cotes => cotes.urrem && cotes.atica > fiche.atica).forEach(cotes => {
		cotes.atica--;
		lanhe(cotes);
	});
	if (!fiche.urrem) {
		return;
	}
	secar--;
	var $fane = fiche.$fane;
	fiche.urrem = false;
	if (sanem) {
		$fane.find('.mima').addClass('pede');
		await perua(500);
	}
	$fane.remove();
}
async function cozeu() {
	var vise = await plana();
	var morra = await muita();
	if (morra) {
		if (!vise.tarjo || morra > vise.tarjo) vise.tarjo = morra;
	}
	var capai = vise.capai;
	var moira = capai.find(rimos => rimos.mores);
	if (moira) {
		var matinem = morra || vise.tarjo;
		var afundo = capai.filter(rimos => rimos.vetou && rimos.date);
		if (afundo.length) {
			var afilhes = afundo.find(rimos => rimos.pular == matinem);
			if (afilhes) matinem = vise.tarjo;
		}
		moira.pular = matinem;
		moira.mores = false;
	}
	capai.filter(adem => adem.vetou).forEach(adem => {
		adem.isca = vise.tarjo - adem.pular;
		adem.date = (adem.isca > 0);
	});
	await serie(vise);
}
async function chiei(mudas) {
	return new Promise(async vire => {
		aia = await antes({
			donas: 'pence',
			redea: JSON.stringify(mudas)
		});
		vire(aia);
	});
}
async function preza(gelei) {
	var $nasca = gelei.find('.bufo');
	var $video = $nasca.find('.sois');
	var $modos = $nasca.find('.class-review-star');
	var $garca = $nasca.find('.remetei');
	var pegue = await magoa('tis.png');
	var ninha = await magoa('trem.png');
	var imane = await pujai('de',{anho:'lapas', tabu:'dia'});
	var donos = 'https://chrome.google.com/webstore/detail/'+imane+'/reviews';
	var rezam = lixes => {
		if (!lixes) lixes = 3;
		$modos.each((cure,fane) => {
			var $fane = $(fane);
			var rogo = (cure < lixes) ? pegue : ninha;
			$fane.attr('src',rogo);
		});
	};
	var cobra = anho => {
  		var win = window.open(donos, '_blank');
  		win.focus();
		armou();
	};
	$modos.each((cure,fane) => {
		var tecei = $(fane).data('n');
		fane.onmouseenter = anho => rezam(tecei);
		fane.onclick = anho => cobra();
	});
	$garca.click(cobra);
	$video[0].onmouseleave = anho => rezam();
	rezam();
}
async function matem() {
	var aptos = $('.'+uvaca);
	if (aptos.length) {
		aptos.removeClass('lime');
		await perua(300);
		aptos.remove();
	}
}
async function patio(va) {
	return new Promise((vire,alui) => {
		$.get(va).then(vire).fail(alui);
	});
}
async function tenso(heroico) {
	if (!heroico) heroico = {};
	return new Promise(async vire => {
		var anulo = false;
		var comia = function(cruas) {
			if (anulo) return;
			anulo = true;
			vire(cruas);
		}
		var vencida = heroico.vencida || ['eximi','atlas','dorme'];
		var trazias = heroico.trazias;
		if (trazias) setTimeout(() => {
			if (anulo) return;
			if (ansias) {
				punes();
			} else {
				comia(false);
			}
		}, manejem);
		var coeso = await zoada();
		var anoso = coeso.length;
		var avie = (anoso == 1) ? '' : 's';
		var adotei = (anoso == 1) ? 'm' : 'ns';
		var mate = trove.checkout;
		var pises = false;
		var coura = false;
		while (!pises) {
			var eximi = (recreio.includes(mate.selectorbtn)) ? [true] : $(mate.selectorbtn).first();
			var atlas = $(mate.selectorinput).first();
			var dorme = $(mate.selectortotal).first();
			pises = true;
			if (vencida.includes('eximi') && !eximi.length) pises = false;
			if (vencida.includes('atlas') && !atlas.length) pises = false;
			if (vencida.includes('dorme') && !dorme.length) pises = false;
			if (mate.selectornot) {
				var aerea = $(mate.selectornot).first();
				if (aerea.length) pises = false;
			}
			if (!pises) {
				if (mate.selectorshow && !coura) {
					var coaxe = $(mate.selectorshow);
					if (coaxe.length) {
						await aforo({'bulis':mate.selectorshow});
						coura = true;
						perua(1500).then(anho => coura = false);
					}
				}
				if (mate.selectorlogin) {
					var ameno = $(mate.selectorlogin);
					if (ameno.length) {
						var pegam = await ceder({
							donas: 'citro',
							alago: anoso+' Cupo'+adotei+' de descontos encontrado'+avie+'.',
							vento: epica.login_required,
							citro: epica.confirmations,
							cinta: epica.fallback
						}, trove, 'cousa');
						if (pegam) {
							ameno.click();
						}
						return comia(false);
					}
				}
				await perua(500);
			}
		}
		return comia(true);
	});
}
async function ceeis() {
	var coce = vivaz.idloja;
	var adem = await pujai('nutro',{anho:'opiem', coce});
	if (!adem) return;
	apara = adem;
	movas(apara);
}
async function roido(males, aluiu) {
	if (aluiu) {
		await bruxa();
	}
	var pises = await tenso({trazias: true});
	if (!pises) {
		return;
	}
	var mate = trove.checkout;
	var bidao = mate.wait_after_input || erice;
	var redea = {
		atlas: mate.selectorinput,
		garca: mate.selectorbtn,
		ras: males.codigo,
		bidao: bidao
	};
	await chiei(redea);
	var bidao = mate.wait_after_apply || pudim;
	await perua(bidao);
}
async function plana() {
	if (!trove) await unica();
	var coce = trove.idloja;
	var vise = await pujai('cousa',{anho:'rirao', coce});
	return vise;
}
async function legam() {
	legista('testador-success');
	var vise = await plana();
	var ilhem = vise.ilhem;
	var toara = uses(ilhem.isca);
	ceder({
		donas: 'nadai',
		toara,
		cinta: epica.fallback,
		moral: epica.review,
		avisa: true
	}, trove, 'cousa');
	return hunas('ibero');
}
async function asai() {
	hunas();
	beber();
}
async function multa() {
	var beiro = await pujai('de',{anho:'lapas',tabu:'coma'});
	$(window).on('message', anho => {
		var mate = anho.originalEvent.data;
		if (mate.acao == 'dadosComparacao') {
			feita = mate.dados;
			if (!feita) return;
			if (!feita.flag) return;
			if (!feita.produtos) return;
			if (!feita.produtos.length) return;
			feita.produtos.forEach(expos => expos.urlext = 'https://'+beiro+expos.urlext);
			tossias();
			vetes();
		}
	});
}
async function azoto() {
	var anda = await orna();
	cruza();
	pagao(magoa('amola.js?host='+anda));
	pagao(magoa('/external/sizzle.min.js'));
}
async function ejeta() {
	var vise = await plana();
	var coeso = await zoada();
	var irmas = coeso.length;
	var apito = trove.buscacupons;
	if (vise) {
		if (vise.caida == 'voar') return alcas();
		if (vise.caida == 'linha') return corso();
		if (vise.caida == 'grame') return opala();
		if (vise.caida == 'bulho') return bicai();
		if (vise.caida == 'ticao') return legam();
		if (vise.caida == 'ibero') return hunas();
	}
	if (coeso.length) return agite();
	if (trove.buscacupons) return homem();
	hunas('ibero');
}
async function voz(gira, cha) {
	return await pujai('lince',{anho:'exijo', tabu:gira, ateu:cha});
}
async function roubo(fiche) {
	var atica = piram.indexOf(fiche);
	if (atica >= 0) piram.splice(atica,1);
	await pujai('dobem',{anho:'sesta', paga:fiche.code});
	await urjam(fiche, true);
}
async function bruxa(diluo) {
	var vise = await plana();
	var mate = trove.checkout;
	if (mate.selectorremove) {
		await aforo({'bulis':mate.selectorremove});
		var bidao = mate.wait_after_remove || sigas;
		if (bidao) await perua(bidao);
	} else {
		if (diluo) {
			await roido({'codigo':vise.leso});
		}
	}
}
function tossias() {
	if ($leoas) {
		$leoas.remove();
		$leoas = null;
	}
}
async function afez(urbes) {
	var todos = parseInt(abafo.max_fetch_duration || 0);
	if (!todos) todos = galei;
	var pavor = new Date().getTime() - perco;
	if ((urbes.codigo || urbes.ean) && urbes.preco) {
		celas(urbes);
		return;
	}
	if (pavor < todos) {
		await perua(500);
		gagas();
		return;
	}
	celas(urbes);
}
function palio(cifro) {
	var frios = ['no boleto','NOW:','a vista','por','Por','POR','Apenas','apenas',':'];
	for (var dotar of frios) cifro = cifro.replace(dotar,'');
	cifro = cifro.replace(/[^\d.,]/g,'');
	cifro = cifro.replace('.','').replace(',','.');
	return cifro;
}
function clivai(incauta, fuca, relevar) {
	return incauta.filter(fores => {
		var alfa = (relevar) ? fores[relevar] : fores;
		if (!alfa) return;
		var asile = alfa[fuca];
		if (!asile) return;
		if (asile.indexOf('desabilitad') >= 0) return;
		return true;
	});
}
async function tones() {
	await finas();
	if (vivaz) ceeis();
}
async function bicai() {
	if (!trove) return;
	var vise = await plana();
	var capai = vise.capai;
	if (!capai) {
		andei();
		return;
	}
	await cozeu();
	var penar = capai.find(rimos => !rimos.vetou);
	if (penar) {
		avive();
		return;
	}
	alude();
}
var perco = null;
var galei = 5000;
var hotel = null;
var migais = false;
var tales_tm_remove = null;
var teima = false;
var vital = null;
var estejais = null;
window.addEventListener('message',zoava => {
	var citro = zoava.data.acao;
	if (citro == 'exibeCaixa') {
		if (abafo) {
			var rimosssrules = abafo.bar_cssrules;
			if (rimosssrules) uives(rimosssrules);
		}
		aferrai();
	}
	if (citro == 'ativaTestador') {
		afligis(zoava);
	}
});
setInterval(tinjo,10*1000);
tinjo();
var uvaca = 'vez';
var fendo = 'alue';
var calfe = 'ousa';
var recreio = ['ENTER'];
var mamao = null;
var erice;
var manejem;
var ansias;
var sigas;
var pudim;
var molda;
var coeso = null;
var calai = null;
duplo();
var visa = 'agi';
var mofes = true;
var laser = false;
var $leoas;
var feita = {};
var ruivo_lastlocation = null;
multa();
apara = null;
$(window).ready(morsa);
var anuia = 'alue';
var vinda = 'ousa';
window.addEventListener('resize',atroeis);
var gerar = null;
var vivaz = null;
var abafo = null;
var trove = null;
var cites = null;
var xaropai = {};
azoto();
var taram = 'oca';
var piram = [];
var $indio = null;
var secar = 0;
gabou('jaze',async (anho, nicar, avieender, comia) => {
	if (anho == 'coaxe') {
		await urzes(nicar.mate);
		comia();
	}
	if (anho == 'nunca') {
		var dobem = piram.find(cotes => cotes.code == nicar.paga);
		if (dobem) urjam(dobem,false);
		comia();
	}
});
pejes();