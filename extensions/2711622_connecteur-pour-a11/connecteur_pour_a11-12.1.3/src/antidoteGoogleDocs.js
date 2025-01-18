(function () {
    "use strict";
    const idConnecteur = "lmbopdiikkamfphhgcckcjhojnokgfeo";
    try {
        window._docs_annotate_canvas_by_ext = idConnecteur;
    } catch (ex) {
		console.warn("Erreur avec injection", ex)
	}

	const rougeSoulignayGdocs = "#dd0000";
    const bleuSouligneGdocs = "#4285f4";
	const rougeRectangleGdocs = "#fce8e6";
    const bleuRectangleGdocs = "#e8f0fe";
    let dwActivay = false;
    const vieilleFonctionStroke = CanvasRenderingContext2D.prototype.stroke;
    CanvasRenderingContext2D.prototype.stroke = function () {
      if (arguments[0]) {
        const styleStroke = this.strokeStyle.toString();
        if ([rougeSoulignayGdocs, bleuSouligneGdocs].includes(styleStroke.toLowerCase()) && !!dwActivay) {
          return;
        }
      }
      return vieilleFonctionStroke.apply(this, arguments);
    };

	const vieilleFonctionFillRect = CanvasRenderingContext2D.prototype.fillRect;
    CanvasRenderingContext2D.prototype.fillRect = function (...t) {
        const styleFill = this.fillStyle.toString();
        if (!([rougeRectangleGdocs, bleuRectangleGdocs].includes(styleFill.toLowerCase()) && !!dwActivay))
            return vieilleFonctionFillRect.apply(this, t);
    };

	document.addEventListener("recupererToutLeTexte", () => {
		let leTexte = "";
		let suiteAttributsPourTexte = null;
		try {
			if (
				((suiteAttributsPourTexte = (function () {
						const kixApp = window.KX_kixApp;
						if (!kixApp) {
							console.warn("Pas de kixapp dans window");
							return "";
						}
						const attributsAExplorer = [[kixApp, ["KX_kixApp"]]];
						let attributsDejaVisitays = new Set([kixApp]);
                        // Explorer chaque objet dans window.KX_kixApp, commencer par profondeur 1, ensuite si on ne trouve
                        // pas le texte, explorer les attributs des objets dans window.KX_kixApp, ensuite, si on ne trouve
                        // toujours pas le texte, explorer les attributs des attributs des objets dans window.KX_kixApp,
                        // ainsi de suite.
						for (const [objProfondeurCourante, suiteAttributs] of attributsAExplorer) {
							const attributsKix = Object.getOwnPropertyNames(objProfondeurCourante);
							for (const a of attributsKix)
								try {
									const attribut = objProfondeurCourante[a];
									if ("string" == typeof attribut && attribut.startsWith("\x03")) {
										return suiteAttributs.concat(a);
									}

									if (!(!(suiteAttributs.length < 20 && attribut instanceof Object) || attribut instanceof Node ||
										attribut instanceof Window || attribut instanceof RegExp || attribut instanceof Date ||
										attribut instanceof Map || Array.isArray(attribut) || attributsDejaVisitays.has(attribut)
									)) {
										attributsDejaVisitays.add(attribut);
                                        attributsAExplorer.push([attribut, suiteAttributs.concat(a)]);
									} 
								} catch (t) {}
						}
						return null;
					})()),
				null === suiteAttributsPourTexte)
			){
				leTexte = "";
			}
			let profondeurCourante = window;
			for (const e of suiteAttributsPourTexte) {
				profondeurCourante = profondeurCourante[e];
			}
			if ("string" == typeof profondeurCourante) {
				leTexte = profondeurCourante;
			}
			console.log("SUITE D'ATT",suiteAttributsPourTexte, leTexte.match(/ \n/));
			window.postMessage({leTexte: leTexte, message: "donneToutLeTexte", type: "TypeGoogleDocs"});
		} catch (ex) {
			console.error("antidoteGoogleDocs - recupererToutLeTexte", ex);
		}
		return "";
	});
	window.addEventListener("message", function(e){
		if (e.data.message && e.data.message == "etatDWGDocs"){
			const vieilleValeurDwActivay = dwActivay;
			dwActivay = e.data.etatDW;
			if (vieilleValeurDwActivay !== dwActivay){
				try {
					let eventVisibiliteWebkit = new Event("webkitvisibilitychange");
					document.dispatchEvent(eventVisibiliteWebkit)
					let eventVisibilite = new Event("visibilitychange");
					document.dispatchEvent(eventVisibilite);
				} catch (e) {}
			}
		}
	});
})();
