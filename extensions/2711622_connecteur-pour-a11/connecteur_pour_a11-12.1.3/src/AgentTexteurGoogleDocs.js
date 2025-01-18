 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 const cstNomNoeudSelectionGoogleDocs = 'kix-canvas-tile-selection';
const cstNomNoeudFootnoteNumber = 'kix-footnotenumberview goog-inline-block';
const cstUnprintable = 'unprintable';
const cstNomNoeudPageHeader = 'kix-page-header';
const cstNomNoeudPageBottom = 'kix-page-bottom';
const cstNomNoeudGoogleInlineBlock = 'goog-inline-block';
const cstNomKixLineview = 'kix-lineview';
const cstNomNoeudLineView = 'goog-inline-block kix-lineview-text-block';
const cstNomNoeudParentPage = 'kix-page kix-page-paginated';
const cstNomNoeudParagraphe = 'kix-paragraphrenderer';
const cstNomNoeudErreurOrthographe = 'kix-spelling-error kix-htmloverlay docs-ui-unprintable';
const cstNomNoeudTexteSupp = 'kix-lineview-strikethrough';
const cstNomNoeudAppviewEditor = "kix-appview-editor";
const cstMargeErreurGoogleDoc = 1;
const cstRegexPuceListe = /^([\u25CF\u25CB\u25C6\u27A2\u25A0\u25A1\u2605\u274F\u2794\u21B5\u2756\u25AA\u2751\u2022\-\–\—o]|[VIX]+\.|[a-z0-9]{1,3}\.|\d{1,2}\.?\)|\d{1,2}\.\d{1,2}\.|\d{1,2}\.\d{1,2}\.\d{1,2}\.|[a-z]{1,2}\.?\)|[A-Z]{1,2}\.?\)|[A-Z]\.)$/;
const cstEventSelectionDocument = {
    "key": "a",
    "keyCode": 65,
    "which": 65,
    "code": "KeyA",
    "location": 0,
    "altKey": false,
    "ctrlKey": !estMacOS(),
    "metaKey": estMacOS(),
    "shiftKey": false,
    "repeat": false,
    "bubbles": true
};
const cstEventEscape = {
    "key": "Escape",
    "keyCode": 27,
    "which": 27,
    "code": "Escape",
    "location": 0,
    "altKey": false,
    "ctrlKey": false,
    "metaKey": false,
    "shiftKey": false,
    "repeat": false,
    "bubbles": true
};
const cstEventBasDocumentMac = (tenirShift) => {
    return {
        "key": "ArrowDown",
        "keyCode": 40,
        "which": 40,
        "code": "ArrowDown",
        "location": 0,
        "altKey": false,
        "ctrlKey": false,
        "metaKey": true,
        "shiftKey": tenirShift,
        "repeat": false,
        "bubbles": true
    };
}
const cstEventHautDocumentMac = (tenirShift) => {
    return {
        "key": "ArrowUp",
        "keyCode": 38,
        "which": 38,
        "code": "ArrowUp",
        "location": 0,
        "altKey": false,
        "ctrlKey": false,
        "metaKey": true,
        "shiftKey": tenirShift,
        "repeat": false,
        "bubbles": true
    };
}
const cstEventBasDocument = (tenirShift) => {
    return {
        "key": "End",
        "keyCode": 35,
        "which": 35,
        "code": "Numpad1",
        "location": 3,
        "altKey": false,
        "ctrlKey": true,
        "metaKey": false,
        "shiftKey": tenirShift,
        "description": "end",
        "path": "/end",
        "bubbles": true
    };
}
const cstEventHautDocument = (tenirShift) => {
    return {
        "key": "Home",
        "keyCode": 36,
        "which": 36,
        "code": "Numpad7",
        "location": 3,
        "altKey": false,
        "ctrlKey": true,
        "metaKey": false,
        "shiftKey": tenirShift,
        "description": "home",
        "unicode": "⌂",
        "path": "/home",
        "bubbles": true
    };
}
const cstEventSauterParagrapheVersBas = (tenirShift) => {
    return {
        "key": "ArrowDown",
        "keyCode": 40,
        "which": 40,
        "code": "ArrowDown",
        "location": 0,
        "altKey": estMacOS(),
        "ctrlKey": !estMacOS(),
        "metaKey": false,
        "shiftKey": tenirShift,
        "repeat": false,
        "bubbles": true
    };
}
const cstEventSauterParagrapheVersHaut = (tenirShift) => {
    return {
        "key": "ArrowUp",
        "keyCode": 38,
        "which": 38,
        "code": "ArrowUp",
        "location": 0,
        "altKey": estMacOS(),
        "ctrlKey": !estMacOS(),
        "metaKey": false,
        "shiftKey": tenirShift,
        "repeat": false,
        "bubbles": true
    };
}
const cstEventRechercheTexte = {
    "key": "f",
    "keyCode": 70,
    "which": 70,
    "code": "KeyF",
    "location": 0,
    "altKey": false,
    "ctrlKey": !estMacOS(),
    "metaKey": estMacOS(),
    "shiftKey": false,
    "repeat": false,
    "bubbles": true
};
const cstEventProchaineOccurrence = {
    "key": "g",
    "keyCode": 71,
    "which": 71,
    "code": "KeyG",
    "location": 0,
    "altKey": false,
    "ctrlKey": !estMacOS(),
    "metaKey": estMacOS(),
    "shiftKey": false,
    "repeat": false,
    "bubbles": true
};
const cstEventOccurrencePrecedente = {
    "key": "g",
    "keyCode": 71,
    "which": 71,
    "code": "KeyG",
    "location": 0,
    "altKey": false,
    "ctrlKey": !estMacOS(),
    "metaKey": estMacOS(),
    "shiftKey": true,
    "repeat": false,
    "bubbles": true
};
const cstEventDeplacementFlecheDroite = {
    "key": "ArrowRight",
    "keyCode": 39,
    "which": 39,
    "code": "ArrowRight",
    "location": 0,
    "altKey": false,
    "ctrlKey": false,
    "metaKey": false,
    "shiftKey": false,
    "repeat": false,
    "bubbles": true
};
const cstEventDeplacementFlecheGauche = {
    "key": "ArrowLeft",
    "keyCode": 37,
    "which": 37,
    "code": "ArrowLeft",
    "location": 0,
    "altKey": false,
    "ctrlKey": false,
    "metaKey": false,
    "shiftKey": false,
    "repeat": false,
    "bubbles": true
};
const cstEventSelectionFlecheDroite = {
    "key": "ArrowRight",
    "keyCode": 39,
    "which": 39,
    "code": "ArrowRight",
    "location": 0,
    "altKey": false,
    "ctrlKey": false,
    "metaKey": false,
    "shiftKey": true,
    "repeat": false,
    "bubbles": true
};
const cstEventSelectionFlecheGauche = {
    "key": "ArrowLeft",
    "keyCode": 37,
    "which": 37,
    "code": "ArrowLeft",
    "location": 0,
    "altKey": false,
    "ctrlKey": false,
    "metaKey": false,
    "shiftKey": true,
    "repeat": false,
    "bubbles": true
};

function noeudEstPuceDeListe(rect, listeRects) {
    if (!rect || !(rect.x instanceof SVGAnimatedLength)) return false;
    return rect === listeRects[0] && cstRegexPuceListe.test(rect.ariaLabel);
}

function donneCoordsRectangle(rectangle) {
    let matrice = rectangle.transform.animVal[0].matrix;
    let pageParent = rectangle.closest(".kix-page-paginated");
    let boxPage = pageParent.getBoundingClientRect();
    let top = matrice.e + parseFloat(pageParent.style.top) + parseFloat(rectangle.attributes[1].value);
    let left = matrice.f + boxPage.left + parseFloat(rectangle.attributes[0].value);
    let width = rectangle.width.animVal.value;
    let height = rectangle.height.animVal.value;
    return {
        x: left,
        y: top,
        width: width,
        height: height
    };
}

function coordsSontSurLaMemeLigne(a, b) {
    if (!a || !b) return false;
    let leRectMoinsGrand = a.height > b.height ? "b" : a.height == b.height ? "aucun" : "a";
    if (leRectMoinsGrand == "b") {
        return b.top >= a.top && b.top + b.height < a.top + a.height;
    } else if (leRectMoinsGrand == "a") {
        return a.top >= b.top && a.top + a.height < b.top + b.height;
    } else {
        return Math.abs(a.top - b.top) < 1 && Math.abs((a.top + a.height) - (b.top + b.height)) < 1;
    }
}

function changementDeFontDansLeMemeMot(a, b) {
    if (!a || !b) return false;
    return coordsSontSurLaMemeLigne(a, b) && Math.abs(b.left - (a.left + a.width)) <= 1 && a.font !== b.font;
}

function construireObjPositionsParagraphes(page) {
    if (!page) return;
    let boxPage = page.getBoundingClientRect();
    let liste = [];
    let leTexte = "";
    const lesParagraphes = Array.from(page.getElementsByTagName("g")).filter(p => p.dataset && p.dataset.sectionType === "body");
    let laPosDepuisDebut = leTexte.length;
    for (let p of lesParagraphes) {
        let calculayHauteurLigne = false;
        let rectangles = Array.from(p.querySelectorAll('rect'));
        let propietesParagraphe = {
            paragraphe: p,
            blocs: [],
            posDepuisDebut: laPosDepuisDebut,
            texteParagraphe: ""
        };
        for (let i = 0; i < rectangles.length; i++) {
            let fontRect = rectangles[i].dataset ? rectangles[i].dataset.fontCss : undefined;
            let fontProchainRect = rectangles[i] !== rectangles.at(-1) ? (rectangles[i + 1].dataset ? rectangles[i + 1].dataset.fontCss : undefined) : undefined;
            let boxRect = rectangles[i].getBoundingClientRect();
            let boxProchainRect = rectangles[i] !== rectangles.at(-1) ? rectangles[i + 1].getBoundingClientRect() : undefined;
            let coordsRelativesRect = {
                top: boxRect.top - boxPage.top,
                height: boxRect.height,
                left: boxRect.left - boxPage.left,
                width: boxRect.width,
                font: fontRect
            }
            let coordsRelativesProchainRect = !!boxProchainRect ? {
                top: boxProchainRect.top - boxPage.top,
                height: boxProchainRect.height,
                left: boxProchainRect.left - boxPage.left,
                font: fontProchainRect
            } : undefined;
            let noeudEstPuce = noeudEstPuceDeListe(rectangles[i], rectangles);
            let proprietesRect = {
                bloc: rectangles[i],
                coordonnees: donneCoordsRectangle(rectangles[i]),
                font: rectangles[i].dataset ? rectangles[i].dataset.fontCss : undefined,
                texteRect: rectangles[i].ariaLabel,
                matrice: rectangles[i].transform.animVal[0].matrix,
                posDepuisDebut: laPosDepuisDebut,
                noeudEstPuce: noeudEstPuce,
                finitParUnEspaceInvisible: !noeudEstPuce && !changementDeFontDansLeMemeMot(coordsRelativesRect, coordsRelativesProchainRect)
            };
            if (propietesParagraphe.blocs.length > 0 && proprietesRect.matrice.f !== propietesParagraphe.blocs.at(-1).matrice.f && !calculayHauteurLigne) {
                propietesParagraphe.hauteurLigne = parseFloat(((proprietesRect.matrice.f - propietesParagraphe.blocs.at(-1).matrice.f) /
                    propietesParagraphe.blocs.at(-1).coordonnees.height).toFixed(6));
                calculayHauteurLigne = true;
            }
            if (!!propietesParagraphe.blocs.at(-1) && propietesParagraphe.blocs.at(-1).noeudEstPuce) {
                leTexte += "";
            }
            if (!noeudEstPuce) {
                if (rectangles[i] !== rectangles.at(-1) && proprietesRect.finitParUnEspaceInvisible) proprietesRect.texteRect += " ";
                leTexte += proprietesRect.texteRect;
            }
            laPosDepuisDebut = leTexte.length;
            propietesParagraphe.texteParagraphe += !noeudEstPuce ? proprietesRect.texteRect : "";
            propietesParagraphe.blocs.push(proprietesRect);
        }
        if (p !== lesParagraphes.at(-1)) leTexte += "\n\n";
        laPosDepuisDebut = leTexte.length;
        liste.push(propietesParagraphe);
    }
    return {
        paragraphes: liste,
        leTexte: leTexte,
        longueurTexte: leTexte.length
    };
}
async function donneModeGoogleDocs(attendre) {
    let selecteurEdit = "#docs-toolbar-mode-switcher .docs-icon-mode-edit, .docs-mode-switcher .docs-icon-mode-edit-blue700," +
        " #docs-toolbar-mode-switcher.edit-mode, #docs-toolbar-mode-switcher[data-tooltip*='Editing'], #docs-toolbar-mode-switcher[data-tooltip*='Bearbeitungs']";
    let selecteurSuggestion = "#docs-toolbar-mode-switcher .docs-icon-acl-comment-only, .docs-mode-switcher .docs-icon-acl-comment-only-green700," +
        " #docs-toolbar-mode-switcher.suggest-mode, #docs-toolbar-mode-switcher[data-tooltip*='Suggest'], #docs-toolbar-mode-switcher[data-tooltip*='Vorschlag']";
    if (attendre) {
        let indicateur = document.querySelector("#docs-toolbar-mode-switcher");
        if (!indicateur || (indicateur && Object.keys(indicateur.dataset).length == 0)) {
            await new Promise(existe => {
                let obs = new MutationObserver(() => {
                    let indicateur = document.querySelector("#docs-toolbar-mode-switcher");
                    if (indicateur && Object.keys(indicateur.dataset).length !== 0) {
                        obs.disconnect();
                        existe();
                    }
                });
                obs.observe(document.querySelector("#docs-bars"), {
                    childList: true,
                    subtree: true
                });
                setTimeout(existe, 5000);
            });
        }
    }
    if (document.querySelector(selecteurSuggestion)) {
        return "suggestion";
    }
    if (document.querySelector(selecteurEdit)) {
        return "modification";
    }
    return "apercu";
}
class AgentTexteurGoogleDocs extends AgentTexteurGen {
    constructor() {
        super();
        this.monTexte = "";
        this.elementEvenements = null;
        this.maSelectionEnMemoire = {};
        this.fileMessages = [];
        if (this.monTypeAT === undefined)
            this.monTypeAT = cstTypeAgentTexteur.AgentTexteurGoogleDocs;
    }
    async recupererToutLeTexte() {
        return new Promise((resolve) => {
            const caractereBidonMenu = String.fromCharCode(59656);
            try {
                let leTexte;
                let handler = function(msg) {
                    if (!!msg && !!msg.data && msg.data.type === "TypeGoogleDocs" && msg.data.message == "donneToutLeTexte") {
                        if (msg.data.leTexte == undefined) {
                            leTexte = "";
                        }
                        leTexte = msg.data.leTexte.replaceAll("\x1b", "").replaceAll("\x1c", "").replaceAll("\x10", "").replaceAll("\x11", "").replaceAll("\x12", "").replaceAll("\x03" + caractereBidonMenu, "").replaceAll("", "").replaceAll(/\n-\n/, "\n\n").replaceAll('\uefff', "").replaceAll('\ueffe', "").split("\x03")[1] + "\n";
                        let leTexteHTML = this.donneTexteCompletHTML();
                        this.monTexte = this.nettoyerTexte(leTexte, leTexteHTML);
                        window.removeEventListener("message", handler);
                        resolve(this.monTexte);
                    }
                }.bind(this);
                window.addEventListener("message", handler);
                setTimeout(() => window.removeEventListener("message", handler), 10000);
                document.dispatchEvent(new CustomEvent("recupererToutLeTexte", {}));
            } catch (ex) {
                console.error("AgentTexteurGoogleDocs - recupererToutLeTexte", ex);
            }
        });
    }
    nettoyerTexte(texteWindow, texteHTML) {
        let indexImages = Object.entries(texteHTML).map(e => e[1] !== cstCarBidon ? undefined : parseInt(e[0])).filter(e => e !== undefined);
        let indexDebutEquations = Object.entries(texteWindow).map(e => e[1] !== "\x1a" ? undefined : parseInt(e[0])).filter(e => e !== undefined);
        let indexFinEquations = Object.entries(texteWindow).map(e => e[1] !== "\x1e" ? undefined : parseInt(e[0]) - 1).filter(e => e !== undefined);
        let vraisIntervallesEquations = [];
        texteWindow = texteWindow.replaceAll("\x1a", "").replaceAll("\x1e", "");
        while (indexImages.length > 0) {
            let index = indexImages[0];
            if (texteHTML[index] == cstCarBidon && texteWindow[index] == "*") {
                texteWindow = texteWindow.slice(0, index) + cstCarBidon + texteWindow.slice(index + 1);
                indexImages.shift();
            } else {
                console.warn("Mauvais index image");
                indexImages.shift();
            }
        }
        for (let idx of indexDebutEquations) {
            if (texteHTML[idx] === "\x1a") indexDebutEquations.splice(idx, 1);
        }
        for (let idx of indexFinEquations) {
            if (texteHTML[idx] === "\x1e") indexFinEquations.splice(idx, 1);
        }
        if (indexDebutEquations.length === indexFinEquations.length) {
            vraisIntervallesEquations = indexDebutEquations.map((e, i) => [e, indexFinEquations[i]]);
            vraisIntervallesEquations = vraisIntervallesEquations.map((e, i) => e.map(v => v - 2 * i));
            this.intervallesEquations = vraisIntervallesEquations;
        } else console.warn("Mauvaises positions d'equations");
        for (let i of vraisIntervallesEquations) {
            let longueurEquation = i[1] - i[0];
            texteHTML = texteHTML.slice(0, i[0]) + cstCarBidon.repeat(longueurEquation) + texteHTML.slice(i[1]);
            texteWindow = texteWindow.slice(0, i[0]) + cstCarBidon.repeat(longueurEquation) + texteWindow.slice(i[1]);
        }
        this.monTexteWindow = texteWindow;
        return texteHTML;
    }
    donneTexteCompletHTML() {
        this.elementEvenements.dispatchEvent(new KeyboardEvent('keydown', cstEventSelectionDocument));
        this.mettreAJourSelectionHTML();
        if (this.selectionHTML.innerHTML !== "") {
            this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheGauche));
        }
        return this.donneTexteSelectionHTML(true);
    }
    mettreAJourSelectionHTML() {
        this.elementEvenements.dispatchEvent(new ClipboardEvent("copy"));
        let selectionHTML = cree("div", {
            contenteditable: "true",
            spellcheck: "false"
        });
        selectionHTML.innerHTML = this.elementEvenements.innerHTML;
        this.selectionHTML = selectionHTML;
    }
    donneTexteSelectionHTML(estTexteComplet) {
        if (estTexteComplet == undefined) estTexteComplet = false;
        let leTexte = "";
        let positionDepuisDebut = 0;
        let listePositionParagraphes = [0];
        let listePositionPhrases = [];
        let noeudsVisitays = [];
        let listeTableaux = [];
        if (this.selectionHTML.querySelectorAll("p").length > 0) {
            let filter = {
                acceptNode: function(n) {
                    return n && (n.tagName == "P" || n.tagName == "H1" || n.tagName == "H2" || n.tagName == "H3" || n.tagName == "BR" || n.tagName == "TABLE") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                }
            }
            let walker = document.createTreeWalker(this.selectionHTML, NodeFilter.SHOW_ELEMENT, filter);
            let tableauActuel = null;
            do {
                let estDansTableau = !!walker.currentNode.closest("table");
                if (walker.currentNode.tagName == "TABLE" && !tableauActuel) {
                    tableauActuel = [];
                }
                if ((walker.currentNode.tagName == "P" || walker.currentNode.tagName == "H1" || walker.currentNode.tagName == "H2" || walker.currentNode.tagName == "H3") && walker.currentNode.dir !== "") {
                    noeudsVisitays.push(walker.currentNode);
                    let texteNoeud = "";
                    let phrasesParagraphe = walker.currentNode.querySelectorAll("span");
                    let positionPhrase = positionDepuisDebut;
                    let spanVisitays = [];
                    for (let p of phrasesParagraphe) {
                        if (spanVisitays.filter(e => e.contains(p)).length == 0) {
                            spanVisitays.push(p);
                            let leContenu = this.donneTexteNoeud(p, true);
                            listePositionPhrases.push({
                                textePhrase: leContenu,
                                position: positionPhrase
                            });
                            positionPhrase += leContenu.length;
                            texteNoeud += leContenu;
                        }
                    }
                    leTexte += texteNoeud + "\n";
                    listePositionParagraphes.push({
                        position: positionDepuisDebut,
                        texteParagraphe: texteNoeud,
                        estBr: false,
                        estDansTableau: estDansTableau
                    });
                    if (!!tableauActuel && estDansTableau) tableauActuel.push(listePositionParagraphes.length - 1);
                    if (!!tableauActuel && !estDansTableau) {
                        listeTableaux.push(tableauActuel);
                        tableauActuel = null;
                    }
                    positionDepuisDebut = leTexte.length;
                }
                if (walker.currentNode.tagName == "BR" && noeudsVisitays.filter(e => e.contains(walker.currentNode)).length == 0) {
                    listePositionParagraphes.push({
                        position: positionDepuisDebut,
                        texteParagraphe: '\n',
                        estBr: true,
                        estDansTableau: estDansTableau
                    });
                    if (!!tableauActuel && estDansTableau) tableauActuel.push(listePositionParagraphes.length - 1);
                    if (!!tableauActuel && !estDansTableau) {
                        listeTableaux.push(tableauActuel);
                        tableauActuel = null;
                    }
                    leTexte += "\n";
                    positionDepuisDebut += 1;
                }
            } while (walker.nextNode())
        } else if (this.selectionHTML.querySelectorAll("span").length > 0) {
            leTexte = this.selectionHTML.querySelector("span").textContent;
        }
        if (estMozillaWebExtension()) {
            listePositionParagraphes.push({
                estBr: true,
                position: positionDepuisDebut,
                texteParagraphe: "\n",
                estDansTableau: false
            });
        }
        if (listePositionParagraphes.at(-1) && listePositionParagraphes.at(-1).estBr && listePositionParagraphes.at(-2).estBr) {
            listePositionParagraphes.pop();
        }
        if (estTexteComplet) {
            this.listePositionParagraphes = listePositionParagraphes;
            this.listePositionPhrases = listePositionPhrases;
            this.listeTableaux = listeTableaux;
        }
        return leTexte;
    }
    donneBonTextePourRecherche(leTexte, ignorerLaCasse, ignorerLesSignesDiacritiques) {
        if (ignorerLaCasse) leTexte = leTexte.toLowerCase();
        if (ignorerLesSignesDiacritiques) leTexte = enleverDiacritiques(leTexte);
        return leTexte;
    }
    chercherPhrasePourIntervalle(position, liste) {
        let nombreIterations = 0;
        let indexDebut = 0;
        let indexFin = liste.length;
        let index, posDebut, posFin;
        let indexPhraseDebut = null;
        while (liste.length > 0) {
            if (nombreIterations > 100) {
                return {
                    phrase: this.listePositionPhrases[index],
                    position: parseInt(liste[index].position),
                    index: index
                };
            }
            index = Math.floor((indexDebut + indexFin) / 2);
            posDebut = parseInt(liste[index].position);
            posFin = parseInt(liste[index].position) + parseInt(liste[index].textePhrase.length);
            if (posDebut > position) indexFin = index;
            else if (posDebut < position && posFin < position) indexDebut = index;
            else if (posDebut <= position && posFin >= position) {
                indexPhraseDebut = index;
                break;
            }
            nombreIterations++;
        }
        return {
            phrase: this.listePositionPhrases[indexPhraseDebut],
            index: indexPhraseDebut
        };
    }
    async selectionnerIntervalleAvecRaccourcisRecherche(texteComplet, intervalleAbsolu) {
        const laPhrase = this.chercherPhrasePourIntervalle(intervalleAbsolu.d, this.listePositionPhrases);
        let intervalleRelatif = {};
        for (let [k, i] of Object.entries(intervalleAbsolu)) {
            intervalleRelatif[k] = i - laPhrase.phrase.position;
        }
        let listeOccurrences = [];
        let ignorerLaCasse = !!document.getElementById("docs-findandreplacedialog-match-case") ? !document.getElementById("docs-findandreplacedialog-match-case").ariaChecked : true;
        let ignorerLesSignesDiacritiques = !!document.getElementById("docs-findandreplacedialog-ignore-diacritics") ? document.getElementById("docs-findandreplacedialog-ignore-diacritics") : true;
        let texteCompletPourRecherche = this.donneBonTextePourRecherche(texteComplet, ignorerLaCasse, ignorerLesSignesDiacritiques);
        let contexteARechercher = this.donneBonTextePourRecherche(texteCompletPourRecherche.slice(laPhrase.phrase.position, laPhrase.phrase.position + laPhrase.phrase.textePhrase.length), ignorerLaCasse, ignorerLesSignesDiacritiques);
        let positionOccurence = texteCompletPourRecherche.indexOf(contexteARechercher, 0);
        while (positionOccurence >= 0) {
            listeOccurrences.push(positionOccurence);
            positionOccurence = texteCompletPourRecherche.indexOf(contexteARechercher, positionOccurence + 1);
        }
        let bonneOccurrence = listeOccurrences.indexOf(laPhrase.phrase.position);
        let parentBoiteRecherche = document.querySelector("#docs-findbar-id");
        if (parentBoiteRecherche.childNodes.length == 0 || (document.querySelector(".docs-slidingdialog") && document.querySelector(".docs-slidingdialog").style.display == "none")) {
            this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventRechercheTexte));
        }
        let boiteRecherche = null;
        await new Promise(resolve => {
            boiteRecherche = document.querySelector(".docs-findinput-input");
            if (boiteRecherche) resolve(true);
            let obsv = new MutationObserver((e) => {
                boiteRecherche = document.querySelector(".docs-findinput-input");
                if (boiteRecherche) resolve(true);
            });
            obsv.observe(document.querySelector("#docs-findbar-id"), {
                childList: true
            });
        });
        let contenantBoiteRecherche = document.querySelector(".docs-slidingdialog");
        contexteARechercher = contexteARechercher.replaceAll("\u2026", "...").replaceAll("\u2025", "..").replaceAll("\u2024", ".");
        if (!!boiteRecherche && bonneOccurrence >= 0) {
            boiteRecherche.click();
            boiteRecherche.focus();
            boiteRecherche.select();
            boiteRecherche.ownerDocument.execCommand("insertText", false, contexteARechercher);
            let compteurOccurences = document.querySelector(".docs-findinput-count");
            let occurenceActuelle = parseInt(compteurOccurences.textContent.at(0)) - 1;
            if (occurenceActuelle == -1) {
                console.warn("Aucune occurrence de la phrase dans le texte\n", {
                    phrase: contexteARechercher
                });
                boiteRecherche.dispatchEvent(new KeyboardEvent("keydown", cstEventEscape));
                return false;
            }
            let nombreDOccurrencesATraverser = bonneOccurrence - occurenceActuelle;
            let eventTraverser = cstEventProchaineOccurrence;
            if (nombreDOccurrencesATraverser < 0) {
                eventTraverser = cstEventOccurrencePrecedente;
                nombreDOccurrencesATraverser = Math.abs(nombreDOccurrencesATraverser);
            }
            eventTraverser = new KeyboardEvent("keydown", eventTraverser);
            for (let i = 0; i < nombreDOccurrencesATraverser; i++) {
                this.elementEvenements.dispatchEvent(eventTraverser);
            }
            let estBonneOccurrence = occurenceActuelle == bonneOccurrence;
            boiteRecherche.dispatchEvent(new KeyboardEvent("keydown", cstEventEscape));
            await new Promise(resolve => {
                if (contenantBoiteRecherche.style.display == "none") {
                    resolve(true);
                }
                let obsv = new MutationObserver((e) => {
                    if (contenantBoiteRecherche.style.display == "none") resolve(true);
                });
                obsv.observe(contenantBoiteRecherche, {
                    attributes: true
                });
            });
            await this.selectionnerIntervalleAvecFleches({
                d: laPhrase.phrase.position,
                f: laPhrase.phrase.position + laPhrase.phrase.textePhrase.length
            }, intervalleAbsolu, "dag");
            return estBonneOccurrence;
        }
        return false;
    }
    chercherParagraphePourPosition(position, liste) {
        let nombreIterations = 0;
        let indexDebut = 0;
        let indexFin = liste.length;
        let index, posDebut, posFin;
        let numeroParagrapheDebut = null;
        while (liste.length > 0) {
            if (nombreIterations > 100) {
                return {
                    paragraphe: liste[index],
                    numeroParagraphe: index
                };
            }
            index = Math.floor((indexDebut + indexFin) / 2);
            posDebut = parseInt(liste[index].position);
            posFin = parseInt(liste[index].position + liste[index].texteParagraphe.length);
            if (posDebut > position) indexFin = index;
            else if (posDebut < position && posFin < position) indexDebut = index;
            else if (posDebut <= position && posFin >= position) {
                numeroParagrapheDebut = index;
                break;
            }
            nombreIterations++;
        }
        return {
            paragraphe: liste[numeroParagrapheDebut],
            numeroParagraphe: numeroParagrapheDebut
        };
    }
    async selectionnerIntervalleAvecSautParagraphe(intervalleAbsolu) {
        let paragrapheDebut = this.chercherParagraphePourPosition(intervalleAbsolu.d, this.listePositionParagraphes).numeroParagraphe;
        let paragrapheFin = this.chercherParagraphePourPosition(intervalleAbsolu.f, this.listePositionParagraphes).numeroParagraphe;
        if (paragrapheDebut !== paragrapheFin && (this.listePositionParagraphes[paragrapheDebut].estDansTableau || this.listePositionParagraphes[paragrapheFin].estDansTableau)) {
            return;
        }
        if (intervalleAbsolu.d == this.maSelectionEnMemoire.intervalle.d) {
            if (this.maSelectionEnMemoire.direction == "gad") {
                await this.allerAIndexAvecSautsParagraphe(intervalleAbsolu.f, intervalleAbsolu, "f", paragrapheFin, true);
            } else {
                await this.allerAIndexAvecSautsParagraphe(intervalleAbsolu.d, intervalleAbsolu, "d", paragrapheDebut, false);
                await this.allerAIndexAvecSautsParagraphe(intervalleAbsolu.f, intervalleAbsolu, "f", paragrapheFin, true);
            }
        } else if (intervalleAbsolu.f == this.maSelectionEnMemoire.intervalle.f) {
            if (this.maSelectionEnMemoire.direction == "dag" && (this.maSelectionEnMemoire.paragrapheDebut == paragrapheDebut || this.maSelectionEnMemoire.intervalle.d > intervalleAbsolu.d || estWindows())) {
                await this.allerAIndexAvecSautsParagraphe(intervalleAbsolu.d, intervalleAbsolu, "d", paragrapheDebut, true);
            } else {
                await this.allerAIndexAvecSautsParagraphe(intervalleAbsolu.f, intervalleAbsolu, "f", paragrapheFin, false);
                await this.allerAIndexAvecSautsParagraphe(intervalleAbsolu.d, intervalleAbsolu, "d", paragrapheDebut, true);
            }
        } else {
            await this.allerAIndexAvecSautsParagraphe(intervalleAbsolu.d, intervalleAbsolu, "d", paragrapheDebut, false);
            await this.allerAIndexAvecSautsParagraphe(intervalleAbsolu.f, intervalleAbsolu, "f", paragrapheFin, true);
        }
    }
    async allerAIndexAvecSautsParagraphe(index, intervalleAbsolu, borneIntervalle, numeroParagraphe, tenirShift) {
        let numeroParagrapheCourant = borneIntervalle == "d" ? this.maSelectionEnMemoire.paragrapheDebut : this.maSelectionEnMemoire.paragrapheFin;
        let distanceAuParagraphe = Math.abs(numeroParagrapheCourant - numeroParagraphe);
        let moitieListe = Math.round(this.listePositionParagraphes.length / 2);
        let optionsPremierEvent;
        let optionsEventDeplacement;
        let nombreDeDispatch;
        if (numeroParagrapheCourant == numeroParagraphe || Math.abs(this.maSelectionEnMemoire.intervalle[borneIntervalle] - intervalleAbsolu[borneIntervalle]) < 5) {
            await this.allerAIndexAvecFleches(this.maSelectionEnMemoire.intervalle, intervalleAbsolu, index, this.maSelectionEnMemoire.direction, numeroParagraphe, borneIntervalle, tenirShift);
            return;
        }
        if ((numeroParagraphe <= moitieListe && distanceAuParagraphe <= numeroParagraphe) || (numeroParagraphe > moitieListe && distanceAuParagraphe <= this.listePositionParagraphes.length - numeroParagraphe - 1) || borneIntervalle == "d" && tenirShift && !estWindows()) {
            if (this.maSelectionEnMemoire.intervalle.d - this.maSelectionEnMemoire.intervalle.f !== 0 && !tenirShift) {
                this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheGauche));
            }
            optionsEventDeplacement = numeroParagrapheCourant < numeroParagraphe ? cstEventSauterParagrapheVersBas(tenirShift) : cstEventSauterParagrapheVersHaut(tenirShift);
            if ((optionsEventDeplacement.key == "ArrowUp" && this.maSelectionEnMemoire.intervalle[borneIntervalle] !== this.listePositionParagraphes[numeroParagrapheCourant].position) || (optionsEventDeplacement.key == "ArrowDown" && this.maSelectionEnMemoire.intervalle[borneIntervalle] !== this.listePositionParagraphes[numeroParagrapheCourant].position + this.listePositionParagraphes[numeroParagrapheCourant].texteParagraphe.length && !this.listePositionParagraphes[numeroParagrapheCourant].estBr)) {
                if (estWindows()) {
                    optionsPremierEvent = numeroParagrapheCourant < numeroParagraphe ? null : cstEventSauterParagrapheVersHaut(tenirShift)
                } else {
                    optionsPremierEvent = numeroParagrapheCourant < numeroParagraphe ? cstEventSauterParagrapheVersBas(tenirShift) : cstEventSauterParagrapheVersHaut(tenirShift);
                }
            } else if (this.maSelectionEnMemoire.intervalle.f == this.listePositionParagraphes[numeroParagrapheCourant].position +
                this.listePositionParagraphes[numeroParagrapheCourant].texteParagraphe.length && !estWindows()) {
                optionsPremierEvent = numeroParagrapheCourant < numeroParagraphe ? null : cstEventSauterParagrapheVersHaut(tenirShift);
            } else if (numeroParagrapheCourant == 1 && this.listePositionParagraphes[numeroParagrapheCourant].estBr && !estWindows()) {
                optionsPremierEvent = null;
            }
            nombreDeDispatch = Math.abs(numeroParagraphe - numeroParagrapheCourant);
        } else {
            let modificationNombreDispatch = 0;
            if (numeroParagraphe <= moitieListe && this.listePositionParagraphes[1].estBr && !estWindows()) {
                modificationNombreDispatch -= 1;
            }
            if (estWindows()) {
                modificationNombreDispatch -= 1;
            }
            if (estMacOS()) {
                optionsPremierEvent = numeroParagraphe <= moitieListe ? cstEventHautDocumentMac(tenirShift) : cstEventBasDocumentMac(tenirShift);
            } else {
                optionsPremierEvent = numeroParagraphe <= moitieListe ? cstEventHautDocument(tenirShift) : cstEventBasDocument(tenirShift);
            }
            optionsEventDeplacement = numeroParagraphe <= moitieListe ? cstEventSauterParagrapheVersBas(tenirShift) : cstEventSauterParagrapheVersHaut(tenirShift);
            if (tenirShift && optionsEventDeplacement.key == "ArrowUp" && (optionsPremierEvent.key == "ArrowDown" || optionsPremierEvent.key == "End") && borneIntervalle == "f") {
                modificationNombreDispatch -= 1;
            }
            nombreDeDispatch = numeroParagraphe <= moitieListe ? numeroParagraphe + modificationNombreDispatch : tenirShift ? this.listePositionParagraphes.length - numeroParagraphe + modificationNombreDispatch : this.listePositionParagraphes.length - numeroParagraphe - 1;
        }
        if (optionsPremierEvent) this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", optionsPremierEvent));
        let evenementDeplacement = new KeyboardEvent("keydown", optionsEventDeplacement);
        await attendreAsync(20);
        if (tenirShift && !estWindows()) {
            if (optionsEventDeplacement.key == "ArrowDown") {
                for (let i = 0; i < nombreDeDispatch; i++) {
                    if (this.listePositionParagraphes[numeroParagrapheCourant + i + 1] && this.listePositionParagraphes[numeroParagrapheCourant + i + 1].estBr && !this.listePositionParagraphes[numeroParagrapheCourant + i].estDansTableau && !this.listePositionParagraphes[numeroParagrapheCourant + i + 1].estDansTableau) {
                        if (!this.listePositionParagraphes[numeroParagrapheCourant + i].estBr) {
                            this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheDroite));
                            this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheDroite));
                        } else {
                            this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheDroite));
                        }
                    } else {
                        if (this.listePositionParagraphes[numeroParagrapheCourant + i + 1] && this.listePositionParagraphes[numeroParagrapheCourant + i + 1].estDansTableau) {
                            let lesParagraphesTableau = this.listeTableaux.filter(e => e.includes(numeroParagrapheCourant + i + 1)).flat(1);
                            i += lesParagraphesTableau.at(-1) - lesParagraphesTableau[0];
                        }
                        this.elementEvenements.dispatchEvent(evenementDeplacement);
                    }
                    if (i % 30 == 0) await attendreAsync(0);
                }
            } else {
                for (let i = 0; i < nombreDeDispatch; i++) {
                    this.elementEvenements.dispatchEvent(evenementDeplacement);
                    if (this.listePositionParagraphes[numeroParagrapheCourant - i - 1] && this.listePositionParagraphes[numeroParagrapheCourant - i - 1].estDansTableau) {
                        let lesParagraphesTableau = this.listeTableaux.filter(e => e.includes(numeroParagrapheCourant - i - 1)).flat(1);
                        i += lesParagraphesTableau.at(-1) - lesParagraphesTableau[0];
                    }
                    if (i % 30 == 0) await attendreAsync(0);
                }
            }
        } else {
            for (let i = 0; i < nombreDeDispatch; i++) {
                this.elementEvenements.dispatchEvent(evenementDeplacement);
                if (tenirShift) {
                    if (optionsEventDeplacement.key == "ArrowDown" && this.listePositionParagraphes[numeroParagrapheCourant + i + 1] && this.listePositionParagraphes[numeroParagrapheCourant + i + 1].estDansTableau) {
                        let lesParagraphesTableau = this.listeTableaux.filter(e => e.includes(numeroParagrapheCourant + i + 1)).flat(1);
                        i += lesParagraphesTableau.at(-1) - lesParagraphesTableau[0];
                    }
                    if (optionsEventDeplacement.key == "ArrowUp" && this.listePositionParagraphes[numeroParagrapheCourant - i - 1] && this.listePositionParagraphes[numeroParagrapheCourant - i - 1].estDansTableau) {
                        let lesParagraphesTableau = this.listeTableaux.filter(e => e.includes(numeroParagrapheCourant - i - 1)).flat(1);
                        i += lesParagraphesTableau.at(-1) - lesParagraphesTableau[0];
                    }
                }
                if (i % 30 == 0) await attendreAsync(0);
            }
        }
        let positionCourante = estWindows() ? this.listePositionParagraphes[numeroParagraphe].position : (optionsEventDeplacement.key == "ArrowDown" && !this.listePositionParagraphes[numeroParagraphe].estBr ? this.listePositionParagraphes[numeroParagraphe].position + this.listePositionParagraphes[numeroParagraphe].texteParagraphe.length : this.listePositionParagraphes[numeroParagraphe].position);
        let intervalleCourant;
        let directionCourante;
        if (!tenirShift) {
            intervalleCourant = {
                d: positionCourante,
                f: positionCourante
            }
            directionCourante = "aucune"
        } else {
            intervalleCourant = borneIntervalle == "d" ? {
                d: positionCourante,
                f: this.maSelectionEnMemoire.intervalle.f
            } : {
                d: this.maSelectionEnMemoire.intervalle.d,
                f: positionCourante
            };
            directionCourante = borneIntervalle == "d" ? "dag" : "gad";
        }
        await this.allerAIndexAvecFleches(intervalleCourant, intervalleAbsolu, index, directionCourante, numeroParagraphe, borneIntervalle, tenirShift);
        return true;
    }
    async allerAIndexAvecFleches(selectionCourante, intervalleAbsolu, index, directionCourante, numeroParagraphe, borneIntervalle, tenirShift) {
        let compteur = 0;
        let positionCourante = borneIntervalle == "d" ? selectionCourante.d : selectionCourante.f;
        let directionSelection = directionCourante;
        if (selectionCourante.d == intervalleAbsolu.d && directionCourante == "gad" && tenirShift) {
            if (selectionCourante.f < index) {
                for (let i = selectionCourante.f; i < index; i++) {
                    if (compteur % 1000 == 0) await attendreAsync(0);
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheDroite));
                    let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                    if (!!intervalleEquation && intervalleEquation[1] <= intervalleAbsolu.f && intervalleEquation.indexOf(i) == 0) {
                        i += intervalleEquation[1] - intervalleEquation[0] - 1;
                    }
                    compteur++;
                }
            } else {
                for (let i = selectionCourante.f; i > index; i--) {
                    if (compteur % 1000 == 0) await attendreAsync(0);
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheGauche));
                    let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                    if (!!intervalleEquation && intervalleEquation[0] >= intervalleAbsolu.d && intervalleEquation.indexOf(i) == 1) {
                        i += intervalleEquation[0] - intervalleEquation[1] + 1;
                    }
                    compteur++;
                }
            }
        } else if (selectionCourante.f == intervalleAbsolu.f && directionCourante == "dag" && tenirShift) {
            if (selectionCourante.d > index) {
                for (let i = selectionCourante.d; i > index; i--) {
                    if (compteur % 1000 == 0) await attendreAsync(0);
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheGauche));
                    let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                    if (!!intervalleEquation && intervalleEquation[0] >= intervalleAbsolu.d && intervalleEquation.indexOf(i) == 1) {
                        i += intervalleEquation[0] - intervalleEquation[1] + 1;
                    }
                    compteur++;
                }
            } else {
                for (let i = selectionCourante.d; i < index; i++) {
                    if (compteur % 1000 == 0) await attendreAsync(0);
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheDroite));
                    let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                    if (!!intervalleEquation && intervalleEquation[1] <= intervalleAbsolu.f && intervalleEquation.indexOf(i) == 0) {
                        i += intervalleEquation[1] - intervalleEquation[0] - 1;
                    }
                    compteur++;
                }
            }
        } else {
            if (selectionCourante.f - selectionCourante.d > 0 && !tenirShift) {
                if (borneIntervalle == "d") {
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheGauche));
                } else {
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheDroite));
                }
            }
            if (!tenirShift) {
                if (positionCourante > index) {
                    for (let i = positionCourante; i > index; i--) {
                        this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheGauche));
                    }
                } else {
                    for (let i = positionCourante; i < index; i++) {
                        this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheDroite));
                    }
                }
            } else {
                if (positionCourante >= index) {
                    for (let i = positionCourante; i > index; i--) {
                        if (compteur % 1000 == 0) await attendreAsync(0);
                        this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheGauche));
                        let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                        if (!!intervalleEquation && intervalleEquation[0] >= intervalleAbsolu.d && intervalleEquation.indexOf(i) == 1) {
                            i += intervalleEquation[0] - intervalleEquation[1] + 1;
                        }
                        compteur++;
                    }
                } else if (positionCourante <= index) {
                    for (let i = positionCourante; i < index; i++) {
                        if (compteur % 1000 == 0) await attendreAsync(0);
                        this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheDroite));
                        let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                        if (!!intervalleEquation && intervalleEquation[1] <= intervalleAbsolu.f && intervalleEquation.indexOf(i) == 0) {
                            i += intervalleEquation[1] - intervalleEquation[0] - 1;
                        }
                        compteur++;
                    }
                }
            }
        }
        if (intervalleAbsolu.d - intervalleAbsolu.f == 0) directionSelection = "aucune";
        if (!tenirShift) {
            if (borneIntervalle == "d") {
                this.maSelectionEnMemoire.paragrapheDebut = !!numeroParagraphe ? numeroParagraphe : this.chercherParagraphePourPosition(intervalleAbsolu.d, this.listePositionParagraphes).numeroParagraphe;
                this.maSelectionEnMemoire.paragrapheFin = this.maSelectionEnMemoire.paragrapheDebut;
                this.maSelectionEnMemoire.intervalle.d = index;
                this.maSelectionEnMemoire.intervalle.f = index;
                this.maSelectionEnMemoire.direction = "aucune";
            }
            if (borneIntervalle == "f") {
                this.maSelectionEnMemoire.paragrapheFin = !!numeroParagraphe ? numeroParagraphe : this.chercherParagraphePourPosition(intervalleAbsolu.f, this.listePositionParagraphes).numeroParagraphe;
                this.maSelectionEnMemoire.paragrapheDebut = this.maSelectionEnMemoire.paragrapheFin;
                this.maSelectionEnMemoire.intervalle.d = index;
                this.maSelectionEnMemoire.intervalle.f = index;
                this.maSelectionEnMemoire.direction = "aucune";
            }
        } else {
            if (borneIntervalle == "d") {
                this.maSelectionEnMemoire.paragrapheDebut = !!numeroParagraphe ? numeroParagraphe : this.chercherParagraphePourPosition(intervalleAbsolu.d, this.listePositionParagraphes).numeroParagraphe;
                this.maSelectionEnMemoire.intervalle.d = index;
                this.maSelectionEnMemoire.direction = "dag";
            }
            if (borneIntervalle == "f") {
                this.maSelectionEnMemoire.paragrapheFin = !!numeroParagraphe ? numeroParagraphe : this.chercherParagraphePourPosition(intervalleAbsolu.f, this.listePositionParagraphes).numeroParagraphe;
                this.maSelectionEnMemoire.intervalle.f = index;
                this.maSelectionEnMemoire.direction = "gad";
            }
        }
    }
    async selectionnerIntervalleAvecFleches(selectionCourante, intervalleAbsolu, directionCourante, numeroParagraphe) {
        if (selectionCourante == intervalleAbsolu) return;
        let positionCourante = selectionCourante.d;
        let directionSelection = directionCourante;
        let compteur = 0;
        if (selectionCourante.d == intervalleAbsolu.d && directionCourante == "gad") {
            if (selectionCourante.f < intervalleAbsolu.f) {
                for (let i = selectionCourante.f; i < intervalleAbsolu.f; i++) {
                    if (compteur % 1000 == 0) await attendreAsync(0);
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheDroite));
                    let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                    if (!!intervalleEquation && intervalleEquation[1] <= intervalleAbsolu.f && intervalleEquation.indexOf(i) == 0) {
                        i += intervalleEquation[1] - intervalleEquation[0] - 1;
                    }
                    compteur++;
                }
            } else {
                for (let i = selectionCourante.f; i > intervalleAbsolu.f; i--) {
                    if (compteur % 1000 == 0) await attendreAsync(0);
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheGauche));
                    let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                    if (!!intervalleEquation && intervalleEquation[0] >= intervalleAbsolu.d && intervalleEquation.indexOf(i) == 1) {
                        i += intervalleEquation[0] - intervalleEquation[1] + 1;
                    }
                    compteur++;
                }
            }
        } else if (selectionCourante.f == intervalleAbsolu.f && directionCourante == "dag") {
            if (selectionCourante.d > intervalleAbsolu.d) {
                for (let i = selectionCourante.d; i > intervalleAbsolu.d; i--) {
                    if (compteur % 1000 == 0) await attendreAsync(0);
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheGauche));
                    let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                    if (!!intervalleEquation && intervalleEquation[0] >= intervalleAbsolu.d && intervalleEquation.indexOf(i) == 1) {
                        i += intervalleEquation[0] - intervalleEquation[1] + 1;
                    }
                    compteur++;
                }
            } else {
                for (let i = selectionCourante.d; i < intervalleAbsolu.d; i++) {
                    if (compteur % 1000 == 0) await attendreAsync(0);
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheDroite));
                    let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                    if (!!intervalleEquation && intervalleEquation[1] <= intervalleAbsolu.f && intervalleEquation.indexOf(i) == 0) {
                        i += intervalleEquation[1] - intervalleEquation[0] - 1;
                    }
                    compteur++;
                }
            }
        } else {
            if (selectionCourante.f - selectionCourante.d > 0) {
                this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheGauche));
            }
            if (positionCourante > intervalleAbsolu.d && positionCourante < intervalleAbsolu.f) {
                for (let i = positionCourante; i > intervalleAbsolu.d; i--) {
                    this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheGauche));
                }
                positionCourante = intervalleAbsolu.d;
            }
            if (positionCourante >= intervalleAbsolu.f) {
                directionSelection = "dag";
                for (let i = positionCourante; i > intervalleAbsolu.d; i--) {
                    if (i > intervalleAbsolu.f) {
                        if (compteur % 1000 == 0) await attendreAsync(0);
                        this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheGauche));
                        if (this.intervallesEquations.filter(e => e.includes(i)).length > 0)
                            this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheGauche));
                        compteur++;
                    } else {
                        if (compteur % 1000 == 0) await attendreAsync(0);
                        this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheGauche));
                        let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                        if (!!intervalleEquation && intervalleEquation[0] >= intervalleAbsolu.d && intervalleEquation.indexOf(i) == 1) {
                            i += intervalleEquation[0] - intervalleEquation[1] + 1;
                            compteur++;
                        }
                    }
                }
            } else if (positionCourante <= intervalleAbsolu.d) {
                directionSelection = "gad";
                for (let i = positionCourante; i < intervalleAbsolu.f; i++) {
                    if (i < intervalleAbsolu.d) {
                        if (compteur % 1000 == 0) await attendreAsync(0);
                        this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheDroite));
                        if (this.intervallesEquations.filter(e => e.includes(i)).length > 0)
                            this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheDroite));
                        compteur++;
                    } else {
                        if (compteur % 1000 == 0) await attendreAsync(0);
                        this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionFlecheDroite));
                        let intervalleEquation = this.intervallesEquations.filter(e => e.includes(i))[0];
                        if (!!intervalleEquation && intervalleEquation[1] <= intervalleAbsolu.f && intervalleEquation.indexOf(i) == 0) {
                            i += intervalleEquation[1] - intervalleEquation[0] - 1;
                        }
                        compteur++;
                    }
                }
            }
        }
        if (intervalleAbsolu.d - intervalleAbsolu.f == 0) directionSelection = "aucune";
        this.maSelectionEnMemoire = {
            paragrapheDebut: !!numeroParagraphe ? numeroParagraphe : this.chercherParagraphePourIntervalle(intervalleAbsolu.d, this.listePositionParagraphes).numeroParagraphe,
            paragrapheFin: this.chercherParagraphePourIntervalle(intervalleAbsolu.f, this.listePositionParagraphes).numeroParagraphe,
            intervalle: intervalleAbsolu,
            direction: directionSelection
        };
    }
    initialise(lesArguments) {
        if (estMacOS()) lesArguments._dib72 = true;
        else lesArguments._dib72 = false;
    }
    async initPourCorrecteur() {
        this.initialiseTexteur(true);
    }
    async initPourOutils() {
        this.initialiseTexteur(true);
    }
    donneTextePourOutils() {
        this.mettreAJourSelectionHTML();
        let leTexteSelection = this.donneTexteSelectionHTML();
        if (!!this.listePositionParagraphes) {
            this.maSelectionEnMemoire = {
                paragrapheDebut: 1,
                paragrapheFin: this.chercherParagraphePourPosition(leTexteSelection.length, this.listePositionParagraphes),
                intervalle: {
                    d: 0,
                    f: leTexteSelection.length
                },
                direction: "aucune"
            }
        }
        return {
            _dib30: encodeChainePourJson(leTexteSelection),
            _dib31: 0,
            _dib32: leTexteSelection.length
        }
    }
    ajouteMessageDansFile(msg) {
        let doitDemarrerExecution = this.fileMessages.length == 0;
        this.fileMessages.push(msg);
        if (doitDemarrerExecution) {
            this.executeFileMessages();
        }
    }
    async executeFileMessages() {
        while (this.fileMessages.length > 0) {
            let args = this.fileMessages[0];
            await this.executeMessage(args);
            this.fileMessages.shift();
        }
    }
    async executeMessage(msg) {
        if (msg.message == "CorrigeAvecContexte") {
            await this.effectueCorrigeDansTexteur(msg);
        }
        if (msg.message == "_pb21d") {
            await this.effectueSelectionneIntervalle(msg);
        }
        if (msg.message == "_pb36d") {
            await this.effectueDonneLesZonesACorriger(msg);
        }
    }
    corrigeDansTexteur(lesArguments) {
        this.ajouteMessageDansFile(lesArguments);
    }
    async effectueCorrigeDansTexteur(lesArguments) {
        await this.effectueSelectionneIntervalle(lesArguments);
        await attendreAsync(25);
        this.remplaceSelection(lesArguments);
        let leDebutSelection = this.maSelectionEnMemoire.intervalle.d;
        this.mettreAJourRepresentationsInternes(lesArguments);
        if (estMacOS()) {
            if (lesArguments._dib49 !== lesArguments._dib50 && lesArguments._dib37 !== "") {
                this.maSelectionEnMemoire = {
                    paragrapheDebut: this.chercherParagraphePourPosition(lesArguments._dib49, this.listePositionParagraphes).numeroParagraphe,
                    paragrapheFin: this.chercherParagraphePourPosition(lesArguments._dib49 + lesArguments._dib37.length, this.listePositionParagraphes).numeroParagraphe,
                    intervalle: {
                        d: lesArguments._dib49,
                        f: lesArguments._dib49 + lesArguments._dib37.length
                    },
                    direction: "gad"
                };
            } else {
                this.maSelectionEnMemoire = {
                    paragrapheDebut: this.chercherParagraphePourPosition(leDebutSelection + lesArguments._dib37.length, this.listePositionParagraphes).numeroParagraphe,
                    paragrapheFin: this.chercherParagraphePourPosition(leDebutSelection + lesArguments._dib37.length, this.listePositionParagraphes).numeroParagraphe,
                    intervalle: {
                        d: leDebutSelection + lesArguments._dib37.length,
                        f: leDebutSelection + lesArguments._dib37.length
                    },
                    direction: "aucune"
                };
            }
        } else {
            this.maSelectionEnMemoire = {
                paragrapheDebut: this.chercherParagraphePourPosition(leDebutSelection + lesArguments._dib37.length, this.listePositionParagraphes).numeroParagraphe,
                paragrapheFin: this.chercherParagraphePourPosition(leDebutSelection + lesArguments._dib37.length, this.listePositionParagraphes).numeroParagraphe,
                intervalle: {
                    d: leDebutSelection + lesArguments._dib37.length,
                    f: leDebutSelection + lesArguments._dib37.length
                },
                direction: "aucune"
            };
        }
        if (lesArguments.estAWeb) await attendreAsync(50);
        this.repondsACorrigeDansTexteur(lesArguments);
        return true;
    }
    async faisCorrigeAvecContexte(lesArguments) {
        this.jeUtiliseEnveloppeIntervalleTexte = lesArguments._dib104 !== cstIdAntidoteBureau;
        lesArguments._dib37 = decodeChaineDeJson(lesArguments._dib37);
        lesArguments._dib92 = decodeChaineDeJson(lesArguments._dib92);
        lesArguments._dib99 = decodeChaineDeJson(lesArguments._dib99);
        lesArguments.contexteRequete = cstContexteCorrection;
        lesArguments._dib29 = this.peutCorriger(lesArguments);
        if (lesArguments._dib29) {
            this.corrigeDansTexteur(lesArguments);
        }
        this.erreur_log.type_agent_texteur = this.monTypeAT;
        if (!lesArguments._dib29) {
            lesArguments.erreur_log = this.erreur_log;
        }
        return;
    }
    faisDebuteCorrectionAutomatique(lesArguments) {
        this.blocDeCorrectionsEnCours = true;
        let appView = document.querySelector(".kix-appview-editor-container");
        let boxAppView = appView.getBoundingClientRect();
        this.elementBloquant.style.height = boxAppView.height + "px";
        this.elementBloquant.style.width = boxAppView.width + "px";
        this.elementBloquant.style.zIndex = findHighestZIndex("*") + 1;
        appView.insertAdjacentElement("beforebegin", this.elementBloquant);
    }
    termineCorrectionAutomatique(lesArguments) {
        this.blocDeCorrectionsEnCours = false;
        this.elementBloquant.remove();
    }
    mettreAJourRepresentationsInternes(lesArguments) {
        let texteOriginal = this.monTexte.slice(lesArguments._dib49, lesArguments._dib50);
        this.monTexte = this.monTexte.slice(0, lesArguments._dib49) + lesArguments._dib37 + this.monTexte.slice(lesArguments._dib50);
        this.monTexteWindow = this.monTexteWindow.slice(0, lesArguments._dib49) + lesArguments._dib37 + this.monTexteWindow.slice(lesArguments._dib50);
        let leParagraphe = this.chercherParagraphePourPosition(lesArguments._dib49, this.listePositionParagraphes);
        let laPhrase = this.chercherPhrasePourIntervalle(lesArguments._dib49, this.listePositionPhrases);
        this.listePositionParagraphes[leParagraphe.numeroParagraphe].texteParagraphe = leParagraphe.paragraphe.texteParagraphe.slice(0, lesArguments._dib49 - leParagraphe.paragraphe.position) +
            lesArguments._dib37 +
            leParagraphe.paragraphe.texteParagraphe.slice(lesArguments._dib50 - leParagraphe.paragraphe.position);
        this.listePositionParagraphes = this.listePositionParagraphes.map((p, i) => {
            if (i > leParagraphe.numeroParagraphe)
                return {
                    position: p.position += lesArguments._dib37.length - texteOriginal.length,
                    texteParagraphe: p.texteParagraphe,
                    estBr: p.estBr,
                    estDansTableau: p.estDansTableau
                };
            else return p;
        });
        this.listePositionPhrases[laPhrase.index].textePhrase = laPhrase.phrase.textePhrase.slice(0, lesArguments._dib49 - this.listePositionPhrases[laPhrase.index].position) +
            lesArguments._dib37 +
            laPhrase.phrase.textePhrase.slice(lesArguments._dib50 - this.listePositionPhrases[laPhrase.index].position);
        this.listePositionPhrases = this.listePositionPhrases.map((p, i) => {
            if (i > laPhrase.index)
                return {
                    textePhrase: p.textePhrase,
                    position: p.position += lesArguments._dib37.length - texteOriginal.length
                };
            else return p;
        });
    }
    docEstMort() {
        return !this.jeSuisInitialisay;
    }
    peutCorriger(lesArguments) {
        let intervalleAbsolu = {
            d: lesArguments._dib49,
            f: lesArguments._dib50
        };
        let paragrapheDebut = this.chercherParagraphePourPosition(intervalleAbsolu.d, this.listePositionParagraphes).numeroParagraphe;
        let paragrapheFin = this.chercherParagraphePourPosition(intervalleAbsolu.f, this.listePositionParagraphes).numeroParagraphe;
        if (paragrapheDebut !== paragrapheFin && (this.listePositionParagraphes[paragrapheDebut].estDansTableau || this.listePositionParagraphes[paragrapheFin].estDansTableau)) {
            return false;
        }
        return true;
    }
    remplaceSelection(lesArguments) {
        let e;
        if (lesArguments._dib37.length == 0) {
            e = new KeyboardEvent("keydown", {
                key: "Delete",
                keyCode: 46,
                bubbles: true
            });
        } else {
            let proprietesEvenement;
            if (estMacOS()) {
                proprietesEvenement = {
                    data: lesArguments._dib37,
                    inputType: "insertText",
                    bubbles: true
                }
                e = new InputEvent("beforeinput", proprietesEvenement);
            } else {
                if (lesArguments._dib37.startsWith(" ")) lesArguments._dib37 = "\xA0" + lesArguments._dib37.slice(1);
                if (lesArguments._dib37.endsWith(" ")) lesArguments._dib37 = lesArguments._dib37.slice(0, -1) + "\xA0";
                let proprietesEvenement;
                if (estMozillaWebExtension()) {
                    let dataEvenement = new DataTransfer();
                    dataEvenement.setData("text/plain", lesArguments._dib37);
                    proprietesEvenement = {
                        data: lesArguments._dib37,
                        dataType: "text/plain",
                        clipboardData: dataEvenement,
                        bubbles: true,
                    }
                } else {
                    let dataEvenement = new DataTransfer();
                    dataEvenement.setData("text/plain", lesArguments._dib37);
                    proprietesEvenement = {
                        clipboardData: dataEvenement,
                        bubbles: true,
                    }
                }
                e = new ClipboardEvent("paste", proprietesEvenement);
            }
        }
        let succes = e !== undefined ? this.elementEvenements.dispatchEvent(e) : false;
    }
    async selectionneIntervalle(lesArguments) {
        this.ajouteMessageDansFile(lesArguments);
    }
    async effectueSelectionneIntervalle(lesArguments) {
        let intervalleAbsolu = {
            d: lesArguments._dib49,
            f: lesArguments._dib50
        };
        if (intervalleAbsolu.d == this.maSelectionEnMemoire.intervalle.d && intervalleAbsolu.f == this.maSelectionEnMemoire.intervalle.f) return;
        let paragraphesTexte = this.listePositionParagraphes.filter(e => e.estBr == false);
        if (intervalleAbsolu.d == paragraphesTexte[0].position && intervalleAbsolu.f >= paragraphesTexte.at(-1).position + paragraphesTexte.at(-1).texteParagraphe.length) {
            this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventSelectionDocument));
            this.maSelectionEnMemoire = {
                paragrapheDebut: 1,
                paragrapheFin: this.listePositionParagraphes.length - 1,
                intervalle: {
                    d: lesArguments._dib49,
                    f: lesArguments._dib50
                },
                direction: "gad"
            }
        } else if (Math.round(this.maSelectionEnMemoire.paragrapheDebut - this.chercherParagraphePourPosition(lesArguments._dib49, this.listePositionParagraphes).numeroParagraphe) < 1000) {
            await this.selectionnerIntervalleAvecSautParagraphe(intervalleAbsolu);
        } else if (this.listePositionParagraphes.length < 5000 && this.monTexte.length >= 100000) {
            await this.selectionnerIntervalleAvecSautParagraphe(intervalleAbsolu);
        } else {
            await this.selectionnerIntervalleAvecRaccourcisRecherche(this.monTexteWindow, intervalleAbsolu);
        }
    }
    donneLesZonesACorriger(msg) {
        this.ajouteMessageDansFile(msg);
    }
    async effectueDonneLesZonesACorriger(lesArguments) {
        this.monDebutSelection = 0;
        this.maFinSelection = 0;
        this.maFinDocument = 0;
        this.initialiseSelection();
        let reponse = await this.donneRepresentationDesZones();
        if (!!reponse) {
            lesArguments._dib100 = reponse;
            lesArguments._dib34 = encodeChainePourJson(gAgentTexteurGen.monContexteSelection);
            lesArguments._dib35 = gAgentTexteurGen.monDebutSelectionDsContexte;
            lesArguments._dib36 = gAgentTexteurGen.maFinSelectionDsContexte;
            if (lesArguments._dib100.length == 0) gAgentTexteur = null;
            return this.repondsADonneLesZonesACorriger(lesArguments);
        }
    }
    repondsACorrigeDansTexteur(lesArguments) {
        this.envoieVersBackground(lesArguments);
    }
    donneTexteNoeud(leNoeud, enfantInclus) {
        if (leNoeud == null)
            return "";
        var uneChaine = "";
        if (estNoeudTexte(leNoeud)) {
            uneChaine = leNoeud.nodeValue;
            uneChaine = uneChaine.replace(/(\r\n|\n|\r)/gm, " ");
            uneChaine = uneChaine.replace(/(\t)/gm, "\u001D");
            if (uneChaine.length >= 1) {
                if (uneChaine.charAt(uneChaine.length - 1) == cstEspaceZero) {
                    uneChaine = uneChaine.substring(0, uneChaine.length - 1);
                }
            }
        } else {
            if (estBr(leNoeud) && estSpan(leNoeud.parentElement)) {
                return "\v";
            }
            if (leNoeud.dataset.richLinks !== undefined) {
                return "";
            }
            if (estImg(leNoeud)) {
                uneChaine = cstCarBidon;
            }
        }
        if (enfantInclus) {
            var lesFils = leNoeud.childNodes;
            if (lesFils != null) {
                var nb = lesFils.length;
                for (var index = 0; index < nb; index++) {
                    var unFils = lesFils.item(index);
                    if (unFils != null)
                        uneChaine += this.donneTexteNoeud(unFils, enfantInclus);
                }
            }
        }
        return uneChaine;
    }
    initialiseSelection() {
        this.maSelectionEnMemoire = {
            paragrapheDebut: 1,
            paragrapheFin: 1,
            intervalle: {
                d: 0,
                f: 0
            },
            direction: "aucune"
        };
    }
    reInitialiseTexteur() {
        this.maFenetre = null;
        this.monDocument = null;
        this.monTitre = "";
        this.monTexte = "";
        this.monTexteWindow = "";
        this.jeSuisInitialisay = false;
        this.mesElements = [];
        this.maFinDocument = 0;
        this.initialiseSelection();
    }
    async initialiseTexteur(estCorrecteur) {
        if (this.actualisationFenAweb) {
            this.actualisationFenAweb = false;
            return;
        }
        this.estCorrecteur = estCorrecteur;
        this.jeSuisInitialisay = false;
        if (estSafariWebex()) {
            this.elementEvenements = document.querySelector(".docs-texteventtarget-iframe")?.contentWindow?.document?.body
        } else {
            this.elementEvenements = document.querySelector(".docs-texteventtarget-iframe")?.contentWindow?.document?.querySelector('[contenteditable=true]');
        }
        this.elementBloquant = cree("div", {
            id: "druide-element-bloquant",
            style: {
                position: "absolute",
                opacity: "0",
                zIndex: findHighestZIndex("*")
            }
        });
        this.reInitialiseTexteur();
        this.jeSuisInitialisay = true;
    }
    async donneRepresentationDesZones() {
        if (await donneModeGoogleDocs(false) !== "modification") {
            return [];
        }
        this.monTexte = await this.recupererToutLeTexte();
        let desZonesJson = [];
        desZonesJson.push({
            d: 0,
            f: 0,
            _dib30: encodeChainePourJson(this.monTexte),
            _dib31: 0,
            _dib32: 0,
            _dib97: [],
            _dib99: encodeChainePourJson("0")
        });
        return desZonesJson;
    }
};
class AgentTexteurGoogleDocsDW extends AgentTexteurGoogleDocs {
    constructor(numeroPage, idPage) {
        super();
        this.numeroPage = numeroPage;
        this.idPage = idPage
        this.objPositionsParagraphes = {};
    }
    async initialiseTexteur() {
        super.initialiseTexteur(true);
        this.objPositionsParagraphes = construireObjPositionsParagraphes(DetecteurWeb.objPages[this.numeroPage].page);
    }
    chercheNoeudPourIndex(i) {
        let parag;
        let noeud;
        for (let p of this.objPositionsParagraphes.paragraphes) {
            if (i >= p.posDepuisDebut && i <= p.posDepuisDebut + p.texteParagraphe.length) {
                for (let b of p.blocs) {
                    if (i >= b.posDepuisDebut && i <= b.posDepuisDebut + b.texteRect.length) {
                        noeud = b;
                        parag = p;
                    }
                }
            }
        }
        return {
            noeud,
            paragraphe: parag
        };
    }
    chercheNoeudsPourIntervalle(d, f) {
        let resultatDebut = this.chercheNoeudPourIndex(d);
        let resultatFin = this.chercheNoeudPourIndex(f);
        let noeudDebut = resultatDebut.noeud;
        let noeudFin = resultatFin.noeud;
        let paragrapheDebut = resultatDebut.paragraphe;
        let paragrapheFin = resultatFin.paragraphe;
        if (!noeudDebut || !noeudFin) {
            return null;
        }
        return {
            noeudDebut: noeudDebut,
            decalageDebut: d - noeudDebut.posDepuisDebut,
            paragrapheDebut: paragrapheDebut,
            noeudFin: noeudFin,
            decalageFin: f - noeudFin.posDepuisDebut,
            paragrapheFin: paragrapheFin
        };
    }
    donneCoordonneesIntervalle(d, f) {
        let lesNoeuds = this.chercheNoeudsPourIntervalle(d, f);
        if (!lesNoeuds) return null;
        let boxPage = DetecteurWeb.objPages[this.numeroPage].page.getBoundingClientRect();
        if (lesNoeuds.noeudDebut == lesNoeuds.noeudFin) {
            let boxNoeud = lesNoeuds.noeudDebut.bloc.getBoundingClientRect();
            let echelleX = lesNoeuds.noeudDebut.matrice.a;
            let echelleY = lesNoeuds.noeudDebut.matrice.d;
            let coordsRelativesNoeud = {
                height: boxNoeud.height,
                width: boxNoeud.width,
                left: boxNoeud.left - boxPage.left,
                top: boxNoeud.top - boxPage.top
            }
            let canvasNoeud = document.createElement('canvas');
            canvasNoeud.height = boxNoeud.height;
            canvasNoeud.width = boxNoeud.width;
            let contexte2d = canvasNoeud.getContext("2d");
            contexte2d.font = lesNoeuds.noeudDebut.font;
            let blocTexteJusquaDebut = contexte2d.measureText(lesNoeuds.noeudDebut.texteRect.slice(0, lesNoeuds.decalageDebut));
            let blocTexteJusquaFin = contexte2d.measureText(lesNoeuds.noeudDebut.texteRect.slice(0, lesNoeuds.decalageFin));
            let coordsRelativesIntervalle = {
                height: coordsRelativesNoeud.height,
                width: blocTexteJusquaFin.width * echelleX - blocTexteJusquaDebut.width * echelleX,
                left: coordsRelativesNoeud.left + blocTexteJusquaDebut.width * echelleX,
                top: coordsRelativesNoeud.top,
                y: coordsRelativesNoeud.top,
                x: coordsRelativesNoeud.left + blocTexteJusquaDebut.width * echelleX
            }
            return [coordsRelativesIntervalle];
        } else {
            let boxNoeudDebut = lesNoeuds.noeudDebut.bloc.getBoundingClientRect();
            let boxNoeudFin = lesNoeuds.noeudFin.bloc.getBoundingClientRect();
            let echelleXDebut = lesNoeuds.noeudDebut.matrice.a;
            let echelleYDebut = lesNoeuds.noeudDebut.matrice.d;
            let echelleXFin = lesNoeuds.noeudFin.matrice.a;
            let echelleYFin = lesNoeuds.noeudFin.matrice.d;
            let coordsRelativesNoeudDebut = {
                height: boxNoeudDebut.height,
                width: boxNoeudDebut.width,
                left: boxNoeudDebut.left - boxPage.left,
                top: boxNoeudDebut.top - boxPage.top
            }
            let coordsRelativesNoeudFin = {
                height: boxNoeudFin.height,
                width: boxNoeudFin.width,
                left: boxNoeudFin.left - boxPage.left,
                top: boxNoeudFin.top - boxPage.top
            }
            let canvasNoeudDebut = document.createElement("canvas");
            let canvasNoeudFin = document.createElement("canvas");
            canvasNoeudDebut.height = coordsRelativesNoeudDebut.height;
            canvasNoeudDebut.width = coordsRelativesNoeudDebut.width;
            canvasNoeudFin.height = coordsRelativesNoeudFin.height;
            canvasNoeudFin.width = coordsRelativesNoeudFin.width;
            let contexte2dDebut = canvasNoeudDebut.getContext("2d");
            let contexte2dFin = canvasNoeudFin.getContext("2d");
            contexte2dDebut.font = lesNoeuds.noeudDebut.font;
            contexte2dFin.font = lesNoeuds.noeudFin.font;
            let blocTexteJusquaDebut = contexte2dDebut.measureText(lesNoeuds.noeudDebut.texteRect.slice(0, lesNoeuds.decalageDebut));
            let blocTexteJusquaFin = contexte2dFin.measureText(lesNoeuds.noeudFin.texteRect.slice(0, lesNoeuds.decalageFin));
            let coordsRelativesIntervalleNoeudDebut = {
                top: coordsRelativesNoeudDebut.top,
                height: coordsRelativesNoeudDebut.height,
                width: coordsRelativesNoeudDebut.width - blocTexteJusquaDebut.width * echelleXDebut,
                left: coordsRelativesNoeudDebut.left + blocTexteJusquaDebut.width * echelleXDebut
            }
            let coordsRelativesIntervalleNoeudFin = {
                top: coordsRelativesNoeudFin.top,
                height: coordsRelativesNoeudFin.height,
                width: blocTexteJusquaFin.width * echelleXFin,
                left: coordsRelativesNoeudFin.left
            }
            if (lesNoeuds.paragrapheDebut == lesNoeuds.paragrapheFin) {
                let noeudsEntreDebutEtFin = lesNoeuds.paragrapheDebut.blocs.filter(b => {
                    return b.posDepuisDebut > lesNoeuds.noeudDebut.posDepuisDebut && b.posDepuisDebut < lesNoeuds.noeudFin.posDepuisDebut
                });
                let listeCoordsNoeuds = [coordsRelativesIntervalleNoeudDebut].concat(noeudsEntreDebutEtFin.map(n => {
                    let boxNoeud = n.bloc.getBoundingClientRect();
                    let coordsRelativesNoeud = {
                        height: boxNoeud.height,
                        width: boxNoeud.width,
                        left: boxNoeud.left - boxPage.left,
                        top: boxNoeud.top - boxPage.top
                    }
                    return coordsRelativesNoeud;
                })).concat([coordsRelativesIntervalleNoeudFin]);
                if (coordsSontSurLaMemeLigne(coordsRelativesIntervalleNoeudDebut, coordsRelativesIntervalleNoeudFin)) {
                    listeCoordsNoeuds.sort((a, b) => b.height - a.height);
                    let coordsRelativesIntervalle = {
                        top: listeCoordsNoeuds[0].top,
                        height: listeCoordsNoeuds[0].height,
                        left: coordsRelativesIntervalleNoeudDebut.left,
                        width: coordsRelativesIntervalleNoeudFin.left + coordsRelativesIntervalleNoeudFin.width - coordsRelativesIntervalleNoeudDebut.left,
                        x: coordsRelativesIntervalleNoeudDebut.left,
                        y: listeCoordsNoeuds[0].top
                    }
                    return [coordsRelativesIntervalle];
                } else {
                    let indexChangementLignePrecedent = 0;
                    let listesLignes = []
                    for (let i = 1; i < listeCoordsNoeuds.length; i++) {
                        if (!coordsSontSurLaMemeLigne(listeCoordsNoeuds[i - 1], listeCoordsNoeuds[i])) {
                            listesLignes.push(listeCoordsNoeuds.slice(indexChangementLignePrecedent, i));
                            indexChangementLignePrecedent = i;
                        }
                    }
                    listesLignes.push(listeCoordsNoeuds.slice(indexChangementLignePrecedent));
                    let listeCoords = [];
                    for (let l of listesLignes) {
                        let left = l[0].left;
                        l.sort((a, b) => b.height - a.height);
                        listeCoords.push({
                            left: left,
                            height: l[0].height,
                            top: l[0].top,
                            width: l.at(-1).left + l.at(-1).width - l[0].left,
                            x: left,
                            y: l[0].top
                        });
                    }
                    return listeCoords;
                }
            } else {
                let noeudsDesParagraphesEntreDebutEtFin = this.objPositionsParagraphes.paragraphes.filter(b => {
                    return b.posDepuisDebut > lesNoeuds.paragrapheDebut.posDepuisDebut && b.posDepuisDebut < lesNoeuds.paragrapheFin.posDepuisDebut
                }).map(p => p.blocs).flat(1);
                let noeudsEntreDebutEtFin = lesNoeuds.paragrapheDebut.blocs.filter(b => b.posDepuisDebut > lesNoeuds.noeudDebut.posDepuisDebut).concat(noeudsDesParagraphesEntreDebutEtFin).concat(lesNoeuds.paragrapheFin.blocs.filter(b => b.posDepuisDebut < lesNoeuds.noeudFin.posDepuisDebut));
                let listeCoordsNoeuds = [coordsRelativesIntervalleNoeudDebut].concat(noeudsEntreDebutEtFin.map(n => {
                    let boxNoeud = n.bloc.getBoundingClientRect();
                    let coordsRelativesNoeud = {
                        height: boxNoeud.height,
                        width: boxNoeud.width,
                        left: boxNoeud.left - boxPage.left,
                        top: boxNoeud.top - boxPage.top
                    }
                    return coordsRelativesNoeud;
                })).concat([coordsRelativesIntervalleNoeudFin]);
                let indexChangementLignePrecedent = 0;
                let listesLignes = [];
                for (let i = 1; i < listeCoordsNoeuds.length; i++) {
                    if (!coordsSontSurLaMemeLigne(listeCoordsNoeuds[i - 1], listeCoordsNoeuds[i])) {
                        listesLignes.push(listeCoordsNoeuds.slice(indexChangementLignePrecedent, i));
                        indexChangementLignePrecedent = i;
                    }
                }
                listesLignes.push(listeCoordsNoeuds.slice(indexChangementLignePrecedent));
                let listeCoords = [];
                for (let l of listesLignes) {
                    let left = l[0].left;
                    l.sort((a, b) => b.height - a.height);
                    listeCoords.push({
                        left: left,
                        height: l[0].height,
                        top: l[0].top,
                        width: l.reduce((a, b) => a + b.width, 0),
                        x: left,
                        y: l[0].top
                    });
                }
                return listeCoords;
            }
        }
    }
    donneCoordsEvents(noeuds, intervalle) {
        let boxDebut = noeuds.noeudDebut.bloc.getBoundingClientRect();
        let echelleXDebut = noeuds.noeudDebut.matrice.a;
        if (noeuds.noeudDebut == noeuds.noeudFin) {
            let canvas = document.createElement("canvas");
            canvas.height = boxDebut.height;
            canvas.width = boxDebut.width;
            let contexte2d = canvas.getContext("2d");
            contexte2d.font = noeuds.noeudDebut.font;
            let blocDeTexteJusquaDebut = contexte2d.measureText(noeuds.noeudDebut.texteRect.slice(0, intervalle.d - noeuds.noeudDebut.posDepuisDebut));
            let blocDeTexteJusquaFin = contexte2d.measureText(noeuds.noeudDebut.texteRect.slice(0, intervalle.f - noeuds.noeudDebut.posDepuisDebut));
            let coordsDebut = {
                x: boxDebut.left + blocDeTexteJusquaDebut.width * echelleXDebut,
                y: boxDebut.top + boxDebut.height / 2
            }
            let coordsFin = {
                x: boxDebut.left + blocDeTexteJusquaFin.width * echelleXDebut,
                y: boxDebut.top + +boxDebut.height / 2
            }
            return {
                coordsDebut,
                coordsFin
            };
        } else {
            let boxFin = noeuds.noeudFin.bloc.getBoundingClientRect();
            let echelleXFin = noeuds.noeudFin.matrice.a;
            let canvasDebut = document.createElement("canvas");
            let canvasFin = document.createElement("canvas");
            canvasDebut.height = boxDebut.height;
            canvasDebut.width = boxDebut.width;
            canvasFin.height = boxFin.height;
            canvasFin.width = boxFin.width;
            let contexte2dDebut = canvasDebut.getContext("2d");
            let contexte2dFin = canvasFin.getContext("2d");
            contexte2dDebut.font = noeuds.noeudDebut.font;
            contexte2dFin.font = noeuds.noeudFin.font;
            let blocDeTexteJusquaDebut = contexte2dDebut.measureText(noeuds.noeudDebut.texteRect.slice(0, intervalle.d - noeuds.noeudDebut.posDepuisDebut));
            let blocDeTexteJusquaFin = contexte2dFin.measureText(noeuds.noeudFin.texteRect.slice(0, intervalle.f - noeuds.noeudFin.posDepuisDebut));
            let coordsDebut = {
                x: boxDebut.left + blocDeTexteJusquaDebut.width * echelleXDebut,
                y: boxDebut.top + boxDebut.height / 2
            }
            let coordsFin = {
                x: boxFin.left + blocDeTexteJusquaFin.width * echelleXFin,
                y: boxFin.top + boxFin.height / 2
            }
            return {
                coordsDebut,
                coordsFin
            };
        }
    }
    async selectionneIntervalle(d, f) {
        let noeudsIntervalle = this.chercheNoeudsPourIntervalle(d, f);
        let coordEvents = this.donneCoordsEvents(noeudsIntervalle, {
            d,
            f
        });
        let proprietesEventDebut = {
            clientX: coordEvents.coordsDebut.x,
            clientY: coordEvents.coordsDebut.y,
            bubbles: true
        }
        let proprietesEventFin = {
            clientX: coordEvents.coordsFin.x,
            clientY: coordEvents.coordsFin.y,
            bubbles: true
        }
        this.elementEvenements.dispatchEvent(new KeyboardEvent("keydown", cstEventDeplacementFlecheDroite));
        noeudsIntervalle.paragrapheDebut.paragraphe.dispatchEvent(new MouseEvent("mousemove", proprietesEventDebut));
        noeudsIntervalle.paragrapheDebut.paragraphe.dispatchEvent(new MouseEvent("mousedown", proprietesEventDebut));
        noeudsIntervalle.paragrapheFin.paragraphe.dispatchEvent(new MouseEvent("mousemove", proprietesEventFin));
        noeudsIntervalle.paragrapheFin.paragraphe.dispatchEvent(new MouseEvent("mouseup", proprietesEventFin));
        return true;
    }
    async corrigeDansTexteur(lesArguments) {
        await this.selectionneIntervalle(lesArguments._dib49, lesArguments._dib50);
        let texteOriginal = DetecteurWeb.objPages[this.numeroPage].leTexte.slice(lesArguments._dib49, lesArguments._dib50);
        await attendreAsync(10);
        this.remplaceSelection(lesArguments);
        DetecteurWeb.construireListePositionsNoeuds(DetecteurWeb.objPages[this.numeroPage].page, this.idPage, true);
        this.objPositionsParagraphes = construireObjPositionsParagraphes(DetecteurWeb.objPages[this.numeroPage].page, this.idPage, true);
        await attendreAsync(10);
        return texteOriginal;
    }
    donneLesZonesACorriger() {}
}