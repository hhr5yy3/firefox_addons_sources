

// ================================= POP/PUSH/STATE =================================

// storing the original pushState function
const ddr_encimo = window.history.pushState;


// storing the original replaceState function
const ddr_caches = window.history.replaceState;

async function ddr_lamino() {
	let ddr_abusada = false;
	let ddr_fincada = null;
	let ddr_adega = null;

	while (!ddr_abusada) {
		ddr_fincada = null;
		while (!ddr_fincada) {
			ddr_fincada = document.querySelector('html');
			if (!ddr_fincada) await misc_wait(100);
		}

		ddr_adega = document.createElement('evlist');

		try {
			ddr_fincada.appendChild(ddr_adega);
			ddr_abusada = true;
		} catch(e) {
			await misc_wait(100);
		}
	}

	const ddr_meles = new MutationObserver(ddr_benzi => {
		ddr_benzi.forEach(ddr_mafia => {
			if (ddr_mafia.addedNodes) {
				ddr_mafia.addedNodes.forEach(ddr_aliar => {
					const ddr_conga = {};
					for (const ddr_fortim of ddr_aliar.attributes) {
						const ddr_comica = ddr_fortim.nodeName;
						const ddr_incha = ddr_fortim.nodeValue;
						ddr_conga[ddr_comica] = ddr_incha;
					}

					if (ddr_conga.ddr_dates == 'ddr_uniria') {
						const ddr_fluir = ddr_conga.ddr_fluir;
						const ddr_retal = JSON.parse(ddr_conga.ddr_retal);
						fetch(ddr_fluir,ddr_retal).then(async ddr_estime => {
							let ddr_loires;
							while (typeof(ddr_loires) == 'undefined') {
								ddr_loires = ddr_estime.responseText;
								if (!ddr_loires) await misc_wait(100);
							}
							ddr_aliar.setAttribute('ddr_troca',ddr_loires);
						});
					}

					const ddr_oficie = {
						ddr_conta: ddr_vadios,
						ddr_mutue: ddr_mamado,
						ddr_embolo: ddr_fonica,
						ddr_morras: ddr_regaco,
						ddr_cirzas: ddr_totens
					};

					const ddr_orava = ddr_oficie[ddr_conga.ddr_dates];

					if (ddr_orava) {
						const ddr_retal = JSON.parse(ddr_conga.ddr_retal);
						ddr_orava(ddr_retal).then(feed => {
							const ddr_troca = (feed && feed.ddr_troca) ? JSON.stringify(feed.ddr_troca) : 1;
							ddr_aliar.setAttribute('ddr_troca',ddr_troca);
						});
					}
				});
			}
		});
	});

	ddr_meles.observe(ddr_adega,{childList: true});
	ddr_adega.setAttribute('ddr_cacoo', 1);
}

function ddr_amolgo(ddr_etanol) {
	try {
		return new Event(ddr_etanol);
	} catch(e) {

		const ev = document.createEvent('Event');
		ev.initEvent(ddr_etanol, true, true);
		return ev;
	}
}

/**
 * Dispatches an additional locationchange event and then call the origina push
 */
function ddr_traias() {
	ddr_acures();
    window.dispatchEvent(ddr_amolgo('pushstate'));
	return ddr_encimo.apply(window.history, arguments);
}

/**
 * Dispatches an additional locationchange event and then call the origina replace
 */
function ddr_mescal() {
	ddr_acures();
    window.dispatchEvent(ddr_amolgo('replacestate'));
	// then we call the original replace
	return ddr_caches.apply(window.history, arguments);
}

// hijacking the original calls
window.history.pushState = ddr_traias;
window.history.replaceState = ddr_mescal;

// 'forwarding' a locationchange event whever a popstate happens
window.addEventListener('popstate',ddr_batam => {
	ddr_acures();
});

async function ddr_acures() {
	await misc_wait(1000);
	window.dispatchEvent(ddr_amolgo('locationchange'));
}

// ===================================== EVENTS =====================================

function ddr_regaco(ddr_gulas) {
	return new Promise(ddr_acenei => {
	  	const ddr_atacam = `; ${document.cookie}`;
  		const ddr_abuso = ddr_atacam.split(`; ${ddr_gulas.ddr_comica}=`);
		const ddr_troca = (ddr_abuso.length == 2) ? ddr_abuso.pop().split(';').shift() : null;
		ddr_acenei(ddr_troca ? {ddr_troca} : null);
	});
}

function ddr_fonica(ddr_gulas) {
	return new Promise(ddr_acenei => {
		const ddr_comica = 	ddr_gulas.ddr_comica;
		const ddr_troca = window[ddr_comica];
		ddr_acenei(ddr_troca ? {ddr_troca} : null);
	});
}

function ddr_vadios(ddr_gulas) {
	return new Promise(async ddr_acenei => {
		// getting the element
		const ddr_recuas = await ddr_entope(ddr_gulas.ddr_entoa);
		// clicking it
		if (ddr_recuas) ddr_recuas.click();
		// then we done!
		ddr_acenei();
	});
}

function ddr_totens(ddr_gulas) {
	return new Promise(async ddr_acenei => {
		var ddr_piasse = ddr_gulas.ddr_toaste;
		var ddr_touros = ddr_gulas.ddr_molhou;
		vtexjs.checkout[ddr_piasse](...ddr_touros).then(ddr_troca => {
			ddr_acenei(ddr_troca ? {ddr_troca} : null);
		}).fail(ddr_valiam => {
			ddr_acenei(null);
		});
	});

}

let ddr_bolsas = 0;
const ddr_tolho = 1000;
const ddr_viciai = 100;

/**
 * Returns the result of the selector (tries to use sizzle, then fabllack to jquery, then fallback to querySelector)
 * @param {string} ddr_socado
 */
async function ddr_entope(ddr_socado) {
	const ddr_nivela = ddr_lancas();

	if (ddr_nivela) {
		let ddr_troca = ddr_nivela(ddr_socado);
		ddr_bolsas = 0;

		while (ddr_bolsas < ddr_tolho && !ddr_troca.length) {
			ddr_bolsas += ddr_viciai;
			await misc_wait(ddr_viciai);
			ddr_troca = ddr_nivela(ddr_socado);
		}

		return ddr_troca[0];
	}

	while (ddr_bolsas < ddr_tolho && !ddr_gazeei()) {
		ddr_bolsas += ddr_viciai;
		await misc_wait(ddr_viciai);
	}

	const ddr_aturou = ddr_gazeei();
	if (ddr_aturou) return ddr_aturou(ddr_socado)[0];

	return document.querySelector(ddr_socado);
}

/**
 * Returns the jQuery instance (if any)
 */
function ddr_gazeei() {
	if (typeof(jQuery) == "undefined") return null;
	// eslint-disable-next-line no-undef
	return jQuery;
}

let ddr_folhou = false;

function ddr_lancas() {
	if (typeof(Sizzle) == "undefined") return null;
	if (!ddr_folhou) {
		// eslint-disable-next-line no-undef
		Sizzle.selectors.pseudos.visible = function visibleSelector( elem ) {
 		 	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
		}
		ddr_folhou = true;
	}
	// eslint-disable-next-line no-undef
	return Sizzle;
}

/**
 * Runs the apply flow based on the parameters
 * @param {object} ddr_gulas
 * @param {number} ddr_banhes amount of retry attempts we already did
 */
function ddr_mamado(ddr_gulas, ddr_banhes = 0) {

	return new Promise(async ddr_acenei => {
		// if we already retried to much
		if (ddr_banhes > 10) {
			// just resolve it
			ddr_acenei();
			return;
		}
		// getting the input
		let ddr_panou = await ddr_entope(ddr_gulas.ddr_panou);
		while (!ddr_panou) {
			await misc_wait(1000);
			ddr_panou = await ddr_entope(ddr_gulas.ddr_panou);
		}
		// creating a fake input event
		const ddr_ciente = new InputEvent('input',{bubbles:true});
		const ddr_rodeia = new KeyboardEvent("focus",{bubbles:true});
		const ddr_regras = new KeyboardEvent("change",{bubbles:true});
		const ddr_premes = new KeyboardEvent("blur",{bubbles:true});
		const ddr_afluxo = new KeyboardEvent("keyup",{bubbles:true});
		// hack React15
		ddr_ciente.simulated = true;
		ddr_rodeia.simulated = true;
		ddr_regras.simulated = true;
		ddr_premes.simulated = true;
		ddr_afluxo.simulated = true;
		// storing its current value
		const ddr_acinzo = ddr_panou.value;
		// updaing the input value
		ddr_panou.dispatchEvent(ddr_rodeia);
		ddr_panou.value = ddr_gulas.ddr_folio;
		// hack React16
		const ddr_reptam = ddr_panou._valueTracker;
		if (ddr_reptam) ddr_reptam.setValue(ddr_acinzo);
		// firing the fake input event
		ddr_panou.dispatchEvent(ddr_ciente);
		ddr_panou.dispatchEvent(ddr_afluxo);
		ddr_panou.dispatchEvent(ddr_regras);
		ddr_panou.dispatchEvent(ddr_premes);
		// firing some other events
		ddr_panou.dispatchEvent(new KeyboardEvent("keyup"));
		ddr_panou.dispatchEvent(new InputEvent("change"));
		// waiting a bit
		await misc_wait(ddr_gulas.ddr_ermos);
		// fetching the input again
		const ddr_talava = await ddr_entope(ddr_gulas.ddr_panou);

		// checking if its value was really updated to the expected value
		if (ddr_talava?.value?.toUpperCase() !== ddr_gulas.ddr_folio?.toUpperCase()) {
			// if not, wait a bit
			await misc_wait(200);
			// then try again
			ddr_mamado(ddr_gulas, ddr_banhes+1).then(ddr_acenei);
			return;
		}

		let ddr_ameara = false;

		// if the button selector is ENTER, it means there is no button and we should fake a enter-button-click
		if (ddr_gulas.ddr_galas == "ENTER") {
			// so we define some fake data for an enter press
			const ddr_cantou = {bubbles: true, cancelable: true, keyCode: 13, target:ddr_panou};
			// then fire those events
			ddr_panou.dispatchEvent(new KeyboardEvent("keydown", ddr_cantou));
			ddr_panou.dispatchEvent(new KeyboardEvent("keyup", ddr_cantou));
			ddr_panou.dispatchEvent(new KeyboardEvent("keypress", ddr_cantou));
			ddr_ameara = true;
		}

		if (ddr_gulas.ddr_averbas) {
			const ddr_averbas = await ddr_entope(ddr_gulas.ddr_averbas);
			if (ddr_averbas) {
				var ddr_povoada = new Event('submit', { bubbles: true, cancelable: true }); 
				ddr_averbas.dispatchEvent(ddr_povoada);
				ddr_ameara = true;
			}
		}

		if (!ddr_ameara) {
			// if it's not a custom flux, then it's a normal selector, sowe'll get the button
			const ddr_enorme = await ddr_entope(ddr_gulas.ddr_galas);
			// and if it exists, we'll click it
			if (ddr_enorme && ddr_enorme.click) ddr_enorme.click();
		}
		// then we done!
		ddr_acenei();
	});
}

ddr_lamino();





const ddr_estrada = () => {


	var ddr_garfam = "prototype";
	var ddr_fingi = "open";
	var ddr_lanudo = "send";

	var ddr_urinar = XMLHttpRequest[ddr_garfam][ddr_fingi];
	var ddr_cinjam = XMLHttpRequest[ddr_garfam][ddr_lanudo];

	window.ddr_irmaos = {};

	XMLHttpRequest[ddr_garfam][ddr_fingi] = function(ddr_toaste, ddr_coaxe) {
		this.ddr_fluir = ddr_coaxe;
		ddr_urinar.apply(this, arguments);
	};

	XMLHttpRequest[ddr_garfam][ddr_lanudo] = function(ddr_boste) {
		if (ddr_boste) {
			window.ddr_irmaos[this.ddr_fluir] = ddr_boste;



		}
		ddr_cinjam.apply(this, arguments);
	}
}

ddr_estrada();




function inject_log (...args) {
	const args2 = Array.from(args);
	args2.unshift('[ISXX]');

}

function misc_wait(ddr_prure) {
	return new Promise(ddr_acenei => {
		setTimeout(ddr_acenei,ddr_prure);
	});
}