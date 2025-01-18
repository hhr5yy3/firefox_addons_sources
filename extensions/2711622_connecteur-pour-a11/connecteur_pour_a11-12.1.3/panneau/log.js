/*  Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite.
    Copyright 2022 Druide informatique inc. 
*/

//https://wunnle.com/dynamic-text-color-based-on-background
function getRGB(c) {
    return parseInt(c, 16) || c
}

function getsRGB(c) {
    return getRGB(c) / 255 <= 0.03928 ?
        getRGB(c) / 255 / 12.92 :
        Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}

function getLuminance(hexColor) {
    return (
        0.2126 * getsRGB(hexColor.substr(1, 2)) +
        0.7152 * getsRGB(hexColor.substr(3, 2)) +
        0.0722 * getsRGB(hexColor.substr(-2))
    )
}

function getContrast(f, b) {
    const L1 = getLuminance(f)
    const L2 = getLuminance(b)
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

function donneCouleurTexte(bgColor) {
    const whiteContrast = getContrast(bgColor, '#ffffff')
    const blackContrast = getContrast(bgColor, '#000000')

    return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}

let dwid_map = new Map();

function ajouteID(id) {
    if (!dwid_map.has(id)) {
        // dwid_map.set(id,"#"+Math.floor(Math.random()*16777215).toString(16));

        dwid_map.set(id, Math.floor((Math.abs(Math.sin(dwid_map.size) * 16777215))).toString(16));
    }
}

function donneCouleurFond(id) {
    if (dwid_map.has(id)) {
        return dwid_map.get(id);
    } else {
        ajouteID(id);
        return donneCouleurFond(id);
    }
}

async function demandeDonnees() {
	var promesse = new Promise(function(resolution) {
		monPort = fureteur.runtime.connect({ name: "antidote-log" });
		monPort.onMessage.addListener(function(m){
            if(!estVide(m)){
                if(m.message == "_dib01"){
                    monPort.postMessage({message:"demandeDonnees"})
                }else{
                    resolution(m);
                }
            }
		});
	});
	return promesse;
}



document.addEventListener('DOMContentLoaded', async function () {
    function append_json(data) {
        let table = document.getElementById('log');
        // console.log("DATA",data.length);
        data.forEach(function (object) {
            let tr = document.createElement('tr');
            let td_temps = document.createElement('td');
            let td_message = document.createElement('td');
            let td_id = document.createElement('td');
            td_id.style.backgroundColor = "#" + donneCouleurFond(object.id);
            td_id.style.color = donneCouleurTexte(donneCouleurFond(object.id));

            td_temps.appendChild(document.createTextNode(object.temps));
            td_message.appendChild(document.createTextNode(object.message == "init_connecteur" || object.message == "reinit_log" || object.message == "traitement_global" ? object.message : object.donnees_brutes.message));
            td_id.appendChild(document.createTextNode(object.id));

            tr.appendChild(td_temps);
            tr.appendChild(td_message);
            tr.appendChild(td_id);

            // tr.innerHTML = '<td>' + object.temps + '</td>' +
            // '<td>' + object.message + '</td>' +
            // '<td>' + object + '</td>' +
            // '<td>' + JSON.stringify(object) + '</td>' 

            let td_donnees = document.createElement('td');
            let td_donnees_traitees = document.createElement('td');

            if (object.donnees_brutes !== undefined && object.donnees_brutes.message == "initialiser") {
                td_message.className = "initialiser";
                let version_donnees = document.createElement('div');
                version_donnees.className = "div_version_donnees";
                version_donnees.appendChild(document.createTextNode("versionDonneees: " + object.donnees_brutes.versionDonnees));
                td_donnees.appendChild(version_donnees);

                let zones = document.createElement('div');
                zones.className = "div_zones";
                zones.appendChild(document.createTextNode("zones: " + JSON.stringify(object.donnees_brutes.zones, null, 2)));
                td_donnees.appendChild(zones);
            }

            if (object.donnees_brutes !== undefined && object.donnees_brutes.message == "nouveauDecoupage") {
                td_message.className = "nouveau_decoupage";
                let version_document = document.createElement('div');
                version_document.appendChild(document.createTextNode("versionDocument: " + object.donnees_brutes.versionDocument));
                td_donnees.appendChild(version_document);

                let nouvelles_phrases = document.createElement('div');
                nouvelles_phrases.className = "div_nouvelles_phrases";
                nouvelles_phrases.appendChild(document.createTextNode("nouvellesPharses: " + JSON.stringify(object.donnees_brutes.nouvellesPhrases, null, 2)));
                td_donnees.appendChild(nouvelles_phrases);

                let suppressions_phrases = document.createElement('div');
                suppressions_phrases.className = "div_suppressions_phrases";
                suppressions_phrases.appendChild(document.createTextNode("suppressionsPhrases: " + JSON.stringify(object.donnees_brutes.suppressionsPhrases, null, 2)));
                td_donnees.appendChild(suppressions_phrases);


            }
            if (object.donnees_brutes !== undefined && object.donnees_brutes.message == "analyseLocale") {
                td_message.className = "analyse_locale";
                let idPhrase = document.createElement('div');
                idPhrase.className = "div_idphrase";
                idPhrase.appendChild(document.createTextNode("idPhrase: " + object.donnees_brutes.idPhrase));
                td_donnees.appendChild(idPhrase);

                let resultat_corrections = document.createElement('div');
                resultat_corrections.className = "div_corrections";
                resultat_corrections.appendChild(document.createTextNode("resultats.corrections: " + JSON.stringify(object.donnees_brutes.resultats.corrections, null, 2)));
                td_donnees.appendChild(resultat_corrections);

                let resultat_detections = document.createElement('div');
                resultat_detections.className = "div_detections";
                resultat_detections.appendChild(document.createTextNode("resultats.detections: " + JSON.stringify(object.donnees_brutes.resultats.detections, null, 2)));
                td_donnees.appendChild(resultat_detections);
            }

            if (object.donnees_brutes !== undefined && object.donnees_brutes.message == "applique_correction") {
                if (object.donnees_brutes.type == "correction") {
                    td_message.className = "applique_correction";
                } else if (object.donnees_brutes.type == "retabli") {
                    td_message.className = "applique_retabli";
                }
                td_message.appendChild(document.createTextNode("\n\n" + object.donnees_brutes.type));
                let idPhrase = document.createElement('div');
                idPhrase.className = "div_idphrase";
                idPhrase.appendChild(document.createTextNode("idPhrase: " + object.donnees_brutes.idPhrase));
                td_donnees.appendChild(idPhrase);

                let d = document.createElement('div');
                d.appendChild(document.createTextNode(JSON.stringify(object.donnees_brutes, null, 2)));
                td_donnees.appendChild(d);
            }


            if (object.donnees_brutes !== undefined && object.donnees_brutes.message == cstTexte) {
                let d = document.createElement('div');
                d.appendChild(document.createTextNode(JSON.stringify(object.donnees_brutes, null, 2)));
                td_donnees.appendChild(d);
            }

            if(object.message !== undefined && object.message=="traitement_global"){
                let d = document.createElement('div');
                d.appendChild(document.createTextNode(JSON.stringify(object.data, null, 2)));
                td_donnees.appendChild(d);
            }


            tr.appendChild(td_donnees);

            if (object.donnees_brutes !== undefined && (object.donnees_brutes.message == "nouveauDecoupage" || object.donnees_brutes.message == "analyseLocale" || object.donnees_brutes.message == "applique_correction" || object.donnees_brutes.message == cstTexte)) {
                for (let [idPhrase, data] of Object.entries(object.donnees_traitees)) {
                    if (idPhrase != "nbATraiter") {
                        let idP = document.createElement('div');
                        idP.className = "div_idphrase";
                        let corr = document.createElement('div');
                        corr.className = "div_corrections";
                        let dect = document.createElement('div');
                        dect.className = "div_detections";
                        let intv = document.createElement('div');
                        intv.className = "div_intervalle";
                        //   let err = document.createElement('div'); err.className= data.aErreur? "div_erreur" : "div_non_errreur";
                        let hr = document.createElement('hr');

                        idP.appendChild(document.createTextNode(idPhrase));
                        corr.appendChild(document.createTextNode(JSON.stringify(data.resultats.corrections, null, 2)));
                        dect.appendChild(document.createTextNode(JSON.stringify(data.resultats.detections, null, 2)));
                        intv.appendChild(document.createTextNode(JSON.stringify(data.intervalle, null, 2)));
                        //   err.appendChild(document.createTextNode("---"));

                        td_donnees_traitees.appendChild(idP);
                        //    td_donnees_traitees.appendChild(err);
                        td_donnees_traitees.appendChild(corr);
                        td_donnees_traitees.appendChild(dect);
                        td_donnees_traitees.appendChild(intv);
                        td_donnees_traitees.appendChild(hr);
                    }

                }


            }

            tr.appendChild(td_donnees_traitees);
            table.appendChild(tr);
        });
    }

    function append_json_recuperation(data){
        let table = document.getElementById('log');
        let tr = document.createElement('tr');
        let td_temps = document.createElement('td');
        let td_message = document.createElement('td');
        let td_id = document.createElement('td');

        td_temps.appendChild(document.createTextNode(new Date().getTime().toString()));
        td_message.appendChild(document.createTextNode("récuperation"));
        td_id.appendChild(document.createTextNode("-"));

        let td_donnees = document.createElement('td');
        let td_donnees_traitees = document.createElement('td');


        let recup = document.createElement('div');
        recup.appendChild(document.createTextNode(JSON.stringify(data, null, 2)));
        td_donnees.appendChild(recup);

        td_temps.className = "recuperation"
        tr.appendChild(td_temps);
        tr.appendChild(td_message);
        tr.appendChild(td_id);
        tr.appendChild(td_donnees);
        table.appendChild(tr);
    }

    let donnees = await demandeDonnees();


    console.log("DONNEES", donnees);

    if(donnees.global){
        append_json_recuperation(donnees.global);
    }

    if(donnees.log_dw !== undefined){
        append_json(donnees.log_dw);
    }
    
    document.getElementById('vide').addEventListener('click',async function(e){
        await fureteur.storage.local.set({"log_dw":[{message:"reinit_log",temps:new Date().getTime()}]});
        location.reload();
    },false);

    document.getElementById('recharge').addEventListener('click',async function(e){
        location.reload();
    },false)

}, false)