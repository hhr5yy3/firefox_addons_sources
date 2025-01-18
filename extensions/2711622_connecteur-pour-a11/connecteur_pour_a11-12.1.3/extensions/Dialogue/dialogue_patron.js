 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 let image = donneUrlFichier('images/icone-antidote.svg');

function verifieDisponibilite() {
    let d = document.createElement("dialog");
    return d.constructor !== window.HTMLUnknownElement && d.constructor !== window.HTMLElement;
}

function envoieReponse(msg) {
    msg._dib105 = "reponseDialogue";
    window.postMessage(msg);
}

function fermeDialogue(cadre) {
    if (!estThunderbird()) {
        if (cadre.nodeName == "DIALOG") {
            cadre.close();;
        } else {
            cadre.style.display = "none";
        }
    }
    envoieReponse({
        reponse: "fini"
    });
}
class Druide_Dialogue {
    constructor(leObjInitialisation) {
        this.id = leObjInitialisation.id;
        this.zIndex = leObjInitialisation.zIndex;
        this.element = null;
    }
    async init() {
        this.element = cree("div", {
            id: this.id
        });
        document.body.append(this.element);
        this.element.attachShadow({
            mode: 'open'
        });
        const {
            shadowRoot
        } = this.element;
        const perisprit = shadowRoot;
        const request = new Request(donneUrlFichier("panneau/css/racine.css"), {
            method: 'GET',
            headers: {
                'Content-Type': 'text/css'
            }
        });
        let uneReponseFetch = await fetch(request);
        let uneReponse = await uneReponseFetch.text();
        const style2 = document.createElement('style');
        style2.textContent = uneReponse;
        perisprit.appendChild(style2);
        const style = document.createElement('style');
        style.textContent = `dialog.cadre{@charset"utf-8";color:rgba(66,66,66,0.75);font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;margin:20;padding:20;background-color:#FCFCFC;font-size:16px;-webkit-font-smoothing:antialiased
position:relative;@charset"utf-8";}
div.cadre{@charset"utf-8";color:rgba(66,66,66,0.75);font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;margin:20;padding:20;background-color:#FCFCFC;font-size:16px;-webkit-font-smoothing:antialiased;position:absolute;top:30%;left:30%;@charset"utf-8";}
td.info{font-weight:500;}
td.explication{word-break:keep-all;font-weight:100;}#table_dialogue{margin-left:0px;margin-right:0px;padding:5px;border-spacing:5px;border:0px;width:500px;font-size:13px;border-radius:5px;@charset"utf-8";}#table_texte{margin-left:0px;margin-right:0px;padding:0px;border:0px;@charset"utf-8";}.dialogue_druide{width:480px;padding:20px;border:1px solid;border-radius:8px;border-color:#979797;box-shadow:5px 10px 18px#bdb6b6;@charset"utf-8";}#serie_boutons{text-align:right;}._svg{width:64px;height:auto;}.sur_ligne{display:inline;display:inline-block;}.bouton_dialogue{width:auto;margin:10px;padding:10px 10px;border:1px solid;border-radius:8px;border-color:#979797;text-align:center;-webkit-user-select:none;user-select:none;cursor:pointer;}.bouton_dialogue:hover{background-color:rgba(216,216,216,0.65);transition:.5s ease;}.dialogue_message{transition:opacity 1s;}.case_image{margin-left:auto;margin-right:auto;vertical-align:center;width:25%;}.colonne_droite{width:10px;}
a{font-weight:bold;color:#4AC1F4}`;
        perisprit.appendChild(style);
        let cadre = null;
        if (verifieDisponibilite()) {
            cadre = cree("dialog", {
                id: "cadre_dialogue",
                class: "cadre dialogue_druide"
            });
        } else {
            cadre = cree("div", {
                id: "cadre_dialogue",
                class: "cadre dialogue_druide"
            });
            cadre.style.zIndex = this.zIndex + 100;
        }
        if (estThunderbird()) {
            cadre.classList.remove("dialogue_druide");
            cadre.style.margin = "0px";
            cadre.style.width = window.innerWidth + "px";
            cadre.style.height = window.innerHeight + "px";
            document.body.style.backgroundColor = "white";
            document.body.style.marginTop = "0px";
            document.body.style.padding = "0px";
        }
        let uneTable = cree("table", {
            class: "table_dialogue"
        });
        let uneRangee_1 = cree("tr");
        let uneColonne_2_1 = cree("td", {
            class: "case_image"
        });
        let uneColonne_2_2 = cree("td", {
            class: "colonne_tableau"
        });
        let uneTableTexte = cree("table", {
            class: "table_texte"
        });
        let uneRange_tt_1 = cree("tr", {});
        let uneColonne_tt_1 = cree("td", {
            id: "titre_message",
            class: "info"
        });
        let uneSectionTitre = cree("div");
        let uneRange_tt_2 = cree("tr", {});
        let uneColonne_tt_2 = cree("td", {
            id: "explication_message",
            class: "explication"
        });
        let uneSectionExplication = cree("div");
        let uneColonne_2_3 = cree("td", {
            class: "colonne_droite"
        });
        let uneSectionImage = cree("img", {
            src: image,
            class: "_svg"
        });
        let hr = cree("hr", {
            style: {
                border: "1px solid var(--aw-clr-bordure-separateur)"
            }
        });
        uneColonne_tt_1.appendChild(uneSectionTitre);
        uneRange_tt_1.appendChild(uneColonne_tt_1);
        uneColonne_tt_2.appendChild(uneSectionExplication);
        uneRange_tt_2.appendChild(uneColonne_tt_2);
        uneTableTexte.appendChild(uneRange_tt_1);
        uneTableTexte.appendChild(uneRange_tt_2);
        uneColonne_2_1.appendChild(uneSectionImage);
        uneColonne_2_2.appendChild(uneTableTexte);
        uneRangee_1.appendChild(uneColonne_2_1);
        uneRangee_1.appendChild(uneColonne_2_2);
        uneRangee_1.appendChild(uneColonne_2_3);
        uneTable.appendChild(uneRangee_1);
        cadre.appendChild(uneTable);
        cadre.appendChild(hr);
        let uneSectionBoutons = cree("div", {
            id: "serie_boutons"
        });
        let bouton_1 = cree("button", {
            id: "bouton_1",
            class: "bouton-actions",
            style: {
                width: "fit-content !important",
                padding: "0 10px"
            }
        });
        let bouton_2 = cree("button", {
            id: "bouton_2",
            class: "bouton-actions",
            style: {
                width: "fit-content !important",
                padding: "0 10px"
            }
        });
        let bouton_3 = cree("button", {
            id: "bouton_3",
            class: "bouton-actions",
            style: {
                width: "fit-content !important",
                padding: "0 10px"
            }
        });
        uneSectionBoutons.appendChild(bouton_3);
        uneSectionBoutons.appendChild(bouton_2);
        uneSectionBoutons.appendChild(bouton_1);
        cadre.appendChild(uneSectionBoutons);
        perisprit.appendChild(cadre);
        bouton_1.style.display = "none";
        bouton_2.style.display = "none";
        bouton_3.style.display = "none";

        function clicBouton(ev) {
            let retour = this.dataset.retour;
            envoieReponse({
                reponse: retour
            });
            if (cadre.nodeName == "DIALOG") {
                cadre.close();
            } else {
                cadre.style.display = "none";
            }
        }
        bouton_1.addEventListener('click', clicBouton, {
            once: true
        });
        bouton_2.addEventListener('click', clicBouton, {
            once: true
        });
        bouton_3.addEventListener('click', clicBouton, {
            once: true
        });
        await attendreAsync(10);
        let fini = false;

        function creerDialogue(e) {
            if (fini) {
                window.removeEventListener('message', creerDialogue, false);
            }
            if (e.data._dib105 == "messageDialogue") {
                let data = e.data;
                if (data.plateforme == "mac" && estThunderbird()) {
                    cadre.style.borderRadius = "0px 0px 12px 12px";
                }
                if (data && data.id == perisprit.host.id) {
                    metsTexte(uneSectionTitre, data.titre_dialogue);
                    metsTexte(uneSectionExplication, data.explication_dialogue);
                    if (data.message == "dialogue") {
                        if (cadre.nodeName == "DIALOG" && cadre.isConnected) {
                            try {
                                if (window.getComputedStyle(cadre).length > 0) cadre.showModal();
                            } catch (erreur) {
                                console.error("dialogue-patron.message", erreur);
                            }
                        } else {
                            cadre.style.display = "block";
                        }
                        if (data.bouton_ok !== undefined) data.bouton_1 = data.bouton_ok;
                        if (data.bouton_annuler !== undefined) data.bouton_2 = data.bouton_annuler;
                        if (data.bouton_info !== undefined) data.bouton_3 = data.bouton_info;
                        if (data.bouton_1 !== undefined && data.bouton_1.texte_dialogue !== undefined && data.bouton_2 !== undefined && data.bouton_2.texte_dialogue !== undefined) {
                            bouton_1.style.display = "inline-block";
                            bouton_2.style.display = "inline-block";
                            if (data.plateforme == "mac") {
                                bouton_1.classList.add("bouton-defaut");
                                bouton_2.classList.add("bouton-nondefaut");
                                metsTexte(bouton_1, data.bouton_1.texte_dialogue);
                                metsTexte(bouton_2, data.bouton_2.texte_dialogue);
                                bouton_1.dataset.retour = data.bouton_1.retour;
                                bouton_2.dataset.retour = data.bouton_2.retour;
                            } else {
                                bouton_1.classList.add("bouton-nondefaut");
                                bouton_2.classList.add("bouton-defaut");
                                metsTexte(bouton_2, data.bouton_1.texte_dialogue);
                                metsTexte(bouton_1, data.bouton_2.texte_dialogue);
                                bouton_2.dataset.retour = data.bouton_1.retour;
                                bouton_1.dataset.retour = data.bouton_2.retour;
                            }
                        } else if (data.bouton_1 !== undefined && data.bouton_1.texte_dialogue !== undefined) {
                            bouton_1.style.display = "inline-block";
                            bouton_1.classList.add("bouton-defaut");
                            metsTexte(bouton_1, data.bouton_1.texte_dialogue);
                        }
                        if (data.bouton_3 !== undefined && data.bouton_3.texte_dialogue !== undefined) {
                            bouton_3.style.display = "inline-block";
                            bouton_3.classList.add("bouton-nondefaut");
                            metsTexte(bouton_3, data.bouton_3.texte_dialogue);
                            bouton_3.dataset.retour = data.bouton_3.retour;
                        }
                        perisprit.addEventListener("keydown", function(event) {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                perisprit.querySelectorAll(".bouton-defaut")[0].click();
                                fini = true;
                            }
                        }, false);
                        fini = true;
                    }
                    if (data.message == "alerte") {
                        if (data.expiration !== undefined) {
                            window.setTimeout(() => {
                                fermeDialogue(cadre);
                                fini = true;
                            }, data.expiration);
                        }
                        if (cadre.nodeName == "DIALOG") {
                            try {
                                if (window.getComputedStyle(cadre).length > 0) cadre.showModal();
                            } catch (erreur) {
                                console.error("dialogue-patron.message", erreur);
                            }
                        } else {
                            cadre.style.display = "block";
                        }
                        perisprit.addEventListener("keydown", function(event) {
                            if (event.keyCode == 13 || event.keyCode == 27) {
                                event.preventDefault();
                                fermeDialogue(cadre);
                                fini = true;
                            }
                        }, {
                            once: true
                        });
                        fini = true;
                    }
                    if (data.message == "fermeDialogue") {
                        console.trace("RECU FERME DIALOGIUE ", data, new Date());
                        fermeDialogue(cadre);
                        fini = true;
                    }
                }
            }
        }
        window.addEventListener('message', creerDialogue, false);
        let msg_init = {
            _dib105: "reponseDialogueInitialisation",
            message: "initialisationDialogue",
            completee: true
        }
        window.postMessage(msg_init);
    }
}