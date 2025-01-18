 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 var fureteur = null;
let testunit = typeof druide_test !== "undefined";
if (!testunit) {
    if (cstChaineNomFureteur == "Thunderbird" || cstChaineNomFureteur == "MozillaWebExtension" || cstChaineNomFureteur == "Edge" || cstChaineNomFureteur == "SafariWebExtension") {
        fureteur = browser;
    } else if (cstChaineNomFureteur == "GoogleChrome" || cstChaineNomFureteur == "OperaWebExtension") {
        if (cstVersionManifest !== undefined && cstVersionManifest == 3) {
            fureteur = chrome;
        } else if (cstVersionManifest !== undefined && cstVersionManifest == 2.5) {
            fureteur = browser;
        }
    }
}
async function attendreAsync(temps) {
    return new Promise(res => setTimeout(res, temps));
}

function referenceObjet(param) {
    this.value = param;
};

function estMacOS() {
    return navigator.userAgent.indexOf("Mac OS X") !== -1;
}

function estWindows() {
    return navigator.userAgent.indexOf("Windows") !== -1;
}

function estLinux() {
    return navigator.userAgent.indexOf("Linux") !== -1;
}

function estThunderbird() {
    return (cstChaineNomFureteur == 'Thunderbird');
};

function estFirefox() {
    return (cstMonFureteur == 'AntidoteFirefox');
};

function estEdge() {
    return (cstChaineNomFureteur == 'Edge');
};

function estSafariWebex() {
    return (cstChaineNomFureteur == 'SafariWebExtension');
};

function estSafariAppex() {
    return (cstChaineNomFureteur == 'SafariAppex');
};

function estSafari() {
    return (cstChaineNomFureteur == 'Safari' || estSafariAppex());
};

function estOpera() {
    return (cstChaineNomFureteur == 'OperaWebExtension');
};

function estGoogleChrome() {
    return (cstChaineNomFureteur == 'GoogleChrome' || estOpera());
};

function estMozillaWebExtension() {
    return (cstChaineNomFureteur == 'MozillaWebExtension');
};

function estFureteurWebExtension() {
    return (estGoogleChrome() || estMozillaWebExtension() || estEdge() || estSafariWebex() || estThunderbird());
};

function estMozilla() {
    return (cstChaineNomFureteur == 'Mozilla');
};

function estPanneauConnecteurMSO() {
    return window.document.getElementById('Druide.AntidoteMSOJS') != null;
};

function estAvecWorker() {
    return typeof importScripts == "function";
}

function estVersionSuperieure(laVersion, leSeuil) {
    let versionMajeur = parseInt(laVersion.split(".")[0]);
    let versionMineur = parseInt(laVersion.split(".")[1] !== undefined ? laVersion.split(".")[1] : 0);
    let seuilMajeur = parseInt(leSeuil.split(".")[0]);
    let seuilMineur = parseInt(leSeuil.split(".")[1]);
    if (versionMajeur > seuilMajeur) return true;
    else if (versionMajeur == seuilMajeur) {
        if (versionMineur > seuilMineur) {
            return true;
        }
    }
    return false;
}

function estVersionInferieure(laVersion, leSeuil) {
    return !estVersionSuperieure(laVersion, leSeuil) && !estVersionEgale(laVersion, leSeuil);
}

function estVersionEgale(laVersion, leSeuil) {
    let versionMajeur = parseInt(laVersion.split(".")[0]);
    let versionMineur = parseInt(laVersion.split(".")[1] !== undefined ? laVersion.split(".")[1] : 0);
    let seuilMajeur = parseInt(leSeuil.split(".")[0]);
    let seuilMineur = parseInt(leSeuil.split(".")[1]);
    if (versionMajeur == seuilMajeur && versionMineur == seuilMineur)
        return true;
    return false;
}

function estAntidoteWeb(leIdAntidote) {
    return (leIdAntidote == cstIdAntidoteWeb || leIdAntidote == cstIdAntidoteWebSolo || leIdAntidote == cstIdAntidoteWebAConfirmer);
}

function estAntidoteWebConfirmay(leIdAntidote) {
    return (leIdAntidote == cstIdAntidoteWeb || leIdAntidote == cstIdAntidoteWebSolo);
}

function estAntidoteBureau(leIdAntidote) {
    return !estAntidoteWeb(leIdAntidote);
}

function aAncetreAvecAttribut(leNoeud, lAttribut, laValeur) {
    let unParent = leNoeud.parentElement;
    while (unParent && !unParent.hasAttribute(lAttribut)) {
        unParent = unParent.parentElement;
    }
    if (unParent != null && laValeur !== undefined) {
        return unParent.getAttribute(lAttribut) == laValeur;
    }
    return unParent != null;
}

function estVisible(leNoeud) {
    if (!leNoeud) return false;
    if (leNoeud.nodeType == leNoeud.TEXT_NODE || leNoeud.nodeType == leNoeud.DOCUMENT_NODE) return true;
    let estUnePageAvecAPI = document.getElementsByTagName('html').item(0) ? document.getElementsByTagName('html').item(0).getAttribute("antidoteapi_jsconnect") : false;
    if (estUnePageAvecAPI != null && (estUnePageAvecAPI || estUnePageAvecAPI == "true")) {
        if (leNoeud.getAttribute("data-antidoteapi_jsconnect_groupe_id")) return true;
        let desNoeuds = leNoeud.ownerDocument.querySelectorAll('*[data-antidoteapi_jsconnect_groupe_id]');
        for (let n of desNoeuds) {
            if (n.contains(leNoeud)) {
                return true;
            }
        }
    }
    let unStyle = self.getComputedStyle(leNoeud);
    if (unStyle.display !== undefined && unStyle.display == "none") {
        return false;
    }
    if (unStyle.hidden !== undefined && (unStyle.hidden == "true" || unStyle.hidden == true)) {
        return false;
    }
    if (unStyle.opacity == 0) return false;
    if (unStyle.visibility == "hidden" || unStyle.visibility == "collapse") return false;
    let desRects = leNoeud.getBoundingClientRect();
    if (desRects) {
        let unePositionDroite = desRects.right !== undefined ? desRects.right : -1;
        if (unePositionDroite < 0) {
            return false;
        }
    }
    return true;
};

function estContenuEditable(leElement) {
    return estTextarea(leElement) || estInput(leElement) || leElement.isContentEditable;
}

function estVide(obj) {
    if (obj === undefined || obj == null) return true;
    if (obj.constructor === String) {
        return obj.length == 0 || obj == "{}";
    }
    let str = JSON.stringify(obj);
    return Object.entries(obj).length === 0 && obj.constructor === Object && str == "{}";
}

function estBlanc(laChaine) {
    return !cstContientCaracteresPasBlancsRegEx.test(laChaine);
};

function enleveNoeudEnfants(leNoeud) {
    while (leNoeud.firstChild) {
        leNoeud.removeChild(leNoeud.lastChild);
    }
}

function donneStyleNoeud(leElement) {
    if (estTexteTypeNode(leElement)) {
        return window.getComputedStyle(leElement.parentNode);
    }
    return window.getComputedStyle(leElement);
}

function estInput(leElement) {
    let reponse = leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == cstNomNoeudInput && (leElement.type !== undefined && leElement.type == "text") : false;
    if (reponse && leElement.tabIndex !== undefined) {
        reponse = leElement.tabIndex > -1;
    }
    return reponse;
}

function estTextarea(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == cstNomNoeudTextArea : false;
}

function estIFrame(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == cstNomNoeudIframe : false;
}

function estBody(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == cstNomNoeudBody : false;
}

function estHTML(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == "html" : false;
}

function estBouton(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == cstNomNoeudBouton : false;
}

function estSpan(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == cstNomNoeudSPAN : false;
}

function estDiv(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == cstNomNoeudDiv : false;
}

function estP(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == cstNomNoeudP : false;
}

function estPre(leElement) {
    return leElement ? leElement.nodeName.toLowerCase() == cstNomNoeudPre : false;
}

function estScript(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == "script" : false;
}

function estGras(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toUpperCase() === cstNomNoeudGras : false;
}

function estStrong(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toUpperCase() === cstNomNoeudStrong : false;
}

function estItalique(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toUpperCase() === cstNomNoeudItalique : false;
}

function estExposant(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toUpperCase() === cstNomNoeudExposant : false;
}

function estIndice(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toUpperCase() === cstNomNoeudIndice : false;
}

function estBr(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() === cstNomNoeudBR : false;
}

function estImg(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() === cstNomNoeudImg : false;
}

function estLabel(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() === cstNomNoeudLabel : false;
}

function estStyle(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() === "style" : false;
}

function estDocument(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() === "#document" : false;
}

function estBarre(leElement) {
    if (!leElement || leElement.nodeName === undefined) return false;
    return leElement.nodeName.toUpperCase() === cstNomNoeudBarre || leElement.nodeName.toUpperCase() === cstNomNoeudDel || leElement.nodeName.toUpperCase() === cstNomNoeudBarreHTML4;
}

function estEntete(leElement) {
    if (!leElement || leElement.nodeName === undefined) return false;
    return (leElement.nodeName.toLowerCase() == cstNomNoeudH1 || leElement.nodeName.toLowerCase() == cstNomNoeudH2 || leElement.nodeName.toLowerCase() == cstNomNoeudH3 || leElement.nodeName.toLowerCase() == cstNomNoeudH4 || leElement.nodeName.toLowerCase() == cstNomNoeudH5 || leElement.nodeName.toLowerCase() == cstNomNoeudH6);
};

function estEnteteDeListe(leElement) {
    if (!leElement || leElement.nodeName === undefined) return false;
    return (leElement.nodeName.toLowerCase() == cstNomNoeudUL || leElement.nodeName.toLowerCase() == cstNomNoeudOL || leElement.nodeName.toLowerCase() == cstNomNoeudDL);
};

function estElementDeListe(leElement) {
    if (!leElement || leElement.nodeName === undefined) return false;
    return (leElement.nodeName.toLowerCase() == cstNomNoeudLI || leElement.nodeName.toLowerCase() == cstNomNoeudDT || leElement.nodeName.toLowerCase() == cstNomNoeudDD);
};

function estTexte(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() == cstNomNoeudText : false;
};

function estTexteTypeNode(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeType == leElement.TEXT_NODE : false;
};

function estTable(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() === cstNomNoeudTable : false;
};

function estTr(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() === cstNomNoeudTR : false;
};

function estTd(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() === cstNomNoeudTD : false;
};

function estTh(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() === cstNomNoeudTH : false;
};

function estElementTable(leElement) {
    if (!leElement || leElement.nodeName === undefined) return false;
    return (estTable(leElement) || estTr(leElement) || estTd(leElement) || estTh(leElement));
};

function estScrollable(leElement) {
    if (!leElement || leElement.nodeName === undefined) return false;
    return (leElement.scrollHeight > leElement.clientHeight && ["scroll", "auto"].indexOf(window.getComputedStyle(leElement).overflowY) >= 0 && leElement !== document.documentElement);
};

function estFigure(leElement) {
    return leElement && leElement.nodeName !== undefined ? leElement.nodeName.toLowerCase() === "figure" : false;
};

function estCKEditor5(laRacine) {
    if (laRacine && laRacine.classList !== undefined && (laRacine.classList.contains("ck-editor__editable") || laRacine.classList.contains("ck-editor__main") || laRacine.classList.contains("ck"))) {
        return true;
    }
    return false;
};

function estTinyMCE(elem) {
    return elem && elem.ownerDocument && elem.ownerDocument.body && elem.ownerDocument.body.id !== undefined && elem.ownerDocument.body.id == "tinymce";
}

function estDraftJS(elem) {
    return elem && elem.classList && elem.classList.contains("public-DraftEditor-content") && elem.parentElement.classList.contains("DraftEditor-editorContainer");
}

function estGutenberg() {
    return (!!window.frameElement || window.top === window) && window.top.document.body.classList.contains("wp-embed-responsive") && !window.top.document.querySelector(".editor-text-editor");
}

function estGutenbergActive() {
    return document.activeElement.ownerDocument.body.classList.contains('block-editor-page');
}

function estNoeudEditable(leNoeud) {
    if (leNoeud.getAttribute("contenteditable") || leNoeud.getAttribute("g_editable") || leNoeud.isContentEditable)
        return true;
    return false;
};

function estSrcAccessible(src) {
    var estAccessible = false;
    try {
        let uneSrc = src;
        if (uneSrc === undefined || uneSrc == "" || uneSrc.indexOf("javascript") >= 0 || uneSrc.indexOf("about:blank") >= 0) {
            estAccessible = true;
        } else {
            if (uneSrc.indexOf("blob:") >= 0) {
                uneSrc = uneSrc.split("blob:")[1];
            }
            let unURLSrc = new URL(uneSrc);
            let unURLSrcParent = new URL(document.URL);
            if (unURLSrc.hostname != unURLSrcParent.hostname) {
                estAccessible = false;
            } else {
                estAccessible = true;
            }
        }
    } catch (erreur) {
        console.error("estSrcAccessible", erreur);
        estAccessible = false;
    }
    return estAccessible;
};

function estElementAccessible(source) {
    var estAccessible = true;
    if (source === undefined || source == null) return false;
    try {
        var el = estIFrame(source) ? source : source.activeElement;
        if (el === undefined || el == null) return false;
        if (estIFrame(el)) {
            estAccessible = false;
            try {
                estAccessible = estSrcAccessible(el.src);
                if (estAccessible) {
                    estAccessible = Boolean(el.contentDocument);
                }
            } catch (erreur) {
                console.error("estElementAccessible-1", erreur);
                estAccessible = false;
            }
        }
    } catch (erreur2) {
        console.error("estElementAccessible-2", erreur2);
        estAccessible = false;
    }
    return estAccessible;
};

function donneParentScrollable(leElement) {
    let e = leElement;
    while (!!e && !estScrollable(e)) {
        if (e.parentNode instanceof ShadowRoot) e = e.parentNode.host;
        if (e === e.ownerDocument.documentElement) return e.ownerDocument.documentElement;
        else e = e.parentNode;
    }
    return e == null ? document.documentElement : e;
}

function donneParentFixe(leElement) {
    let e = leElement;
    while (!!e && window.getComputedStyle(e).position !== "fixed") {
        if (e.parentNode instanceof ShadowRoot) e = e.parentNode.host;
        if (e === e.ownerDocument.documentElement) return e.ownerDocument.documentElement;
        else e = e.parentNode;
    }
    return e == null ? document.documentElement : e;
}

function donneParentSticky(leElement) {
    let e = leElement;
    while (!!e && window.getComputedStyle(e).position !== "sticky") {
        if (e.parentNode instanceof ShadowRoot) e = e.parentNode.host;
        if (e === e.ownerDocument.documentElement) return e.ownerDocument.documentElement;
        else e = e.parentNode;
    }
    return e == null ? document.documentElement : e;
}

function donneDernierOverflowHidden(leElement, leParentLimite) {
    if (!leParentLimite) leParentLimite = document.body;
    let e = leElement;
    let hiddenE = null;
    while (!!e && leParentLimite.contains(e) && e !== leParentLimite) {
        const overflow = window.getComputedStyle(e).overflow;
        if (e instanceof ShadowRoot) e = e.host;
        if (!!overflow && !!overflow.includes && (overflow.includes("hidden") || overflow.includes("clip"))) hiddenE = e;
        e = e.parentNode;
    }
    return hiddenE;
}

function donneLargeurScrollbar() {
    const ext = document.createElement('div');
    ext.style.visibility = 'hidden';
    ext.style.overflow = 'scroll';
    ext.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(ext);
    const int = document.createElement('div');
    ext.appendChild(int);
    const largeur = (ext.offsetWidth - int.offsetWidth);
    ext.parentNode.removeChild(ext);
    return largeur;
}

function donnePolice() {
    return "Atkinson Hyperlegible";
}

function getTextWidth(leTexte) {
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = "12pt " + donnePolice();
    var metrics = context.measureText(leTexte);
    return metrics.width;
};

function chaine_aleatoire() {
    return "." + (Math.random().toString(36) + '00000000000000000').slice(2, 7);
};

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(cstRegExGenGuid, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}

function donneUrlFichier(leFichier) {
    var uneChaine = "";
    if (!testunit) {
        if (estFureteurWebExtension())
            uneChaine = fureteur.runtime.getURL(leFichier);
        else if (estSafari())
            uneChaine = safari.extension.baseURI + leFichier;
    }
    return uneChaine;
};

function findHighestZIndex(elem) {
    let highest = 0;
    let walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_ELEMENT);
    do {
        let current = parseInt(window.getComputedStyle(walker.currentNode).zIndex);
        if (current > highest) highest = current;
    } while (walker.nextNode());
    return parseInt(highest);
};

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
};
const donneData = url => fetch(url).then(response => response.blob()).then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
}))

function encodeChainePourJson(laChaine) {
    return btoa(unescape(encodeURIComponent(laChaine)));
};

function decodeChaineDeJson(laChaine) {
    var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (base64regex.test(laChaine))
        return decodeURIComponent(escape(self.atob(laChaine)));
    else
        return laChaine;
};

function encodeChaine(laChaine) {
    return self.btoa(encodeURI(laChaine));
};

function decodeChaine(laChaine) {
    return decodeURI(self.atob(laChaine));
};

function enleverDiacritiques(laChaine) {
    return laChaine.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

function verifieMemeOrigine(leURL1, leURL2) {
    if (leURL1 && leURL2) {
        leURL1 = leURL1.startsWith("blob:") ? leURL1.slice(5) : leURL1;
        leURL2 = leURL2.startsWith("blob:") ? leURL2.slice(5) : leURL2;
        let url1 = new URL(leURL1);
        let url2 = new URL(leURL2);
        return url1.hostname == url2.hostname;
    }
    return false;
};

function metsTexte(leNoeud, leTexte) {
    if (!leNoeud || leTexte === undefined) return false;
    while (leNoeud.firstChild) {
        leNoeud.removeChild(leNoeud.lastChild);
    }
    const parse = Range.prototype.createContextualFragment.bind(document.createRange());
    leNoeud.appendChild(parse(leTexte));
    return true;
}

function cree(el, _dib84, leNamespace) {
    const ns = {
        HTML: "http://www.w3.org/1999/xhtml",
        SVG: "http://www.w3.org/2000/svg",
        XBL: "http://www.mozilla.org/xbl",
        XUL: "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
    }
    let d;
    if (leNamespace !== undefined) {
        d = document.createElementNS(ns[leNamespace], el);
    } else {
        d = document.createElement(el);
    }
    if (_dib84 !== undefined) {
        for (let a in _dib84) {
            var t = "";
            if (typeof _dib84[a] === 'object') {
                for (s in _dib84[a]) {
                    t = t + s + ":" + _dib84[a][s] + ";"
                }
            } else {
                t = _dib84[a];
            }
            d.setAttribute(a, t);
        }
    }
    return d;
}

function donneDate() {
    let x = new Date();
    let y = x.getFullYear().toString();
    let m = (x.getMonth() + 1).toString();
    let d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    let hh = x.getHours();
    let mm = x.getMinutes();
    let yyyymmdd = y + m + d + "_" + hh + mm;
    return yyyymmdd;
}

function contient(le, laListe) {
    for (let el of laListe) {
        if (le.indexOf(el) > -1) {
            return true
        }
    }
    return false;
}

function donneTousLesNomsDeProps(obj, regarderDansPrototype) {
    var props = [];
    do {
        Object.getOwnPropertyNames(obj).forEach(function(prop) {
            if (props.indexOf(prop) === -1) {
                props.push(prop);
            }
        });
        if (!regarderDansPrototype) {
            break;
        }
    } while (obj = Object.getPrototypeOf(obj));
    return props;
}