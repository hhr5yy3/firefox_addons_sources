/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2024 Druide informatique inc. */

let monPort = null;
async function demandeDonnees() {
	var promesse = new Promise(function(resolution) {
		monPort = fureteur.runtime.connect({ name: "antidote-reglages" });
		monPort.onMessage.addListener(function(m){
			if(!estVide(m)){
				if(m.message == "_dib01"){
					monPort.postMessage({message:"demandeDonnees"})
				}else{
					resolution(m);
				}
			}
		});
		monPort.onDisconnect.addListener(async function() {

			let promesse = new Promise(resolutionGlobal => {
				fureteur.storage.local.get("objetGlobal").then( o => {
					resolutionGlobal( o.objetGlobal);
				}).catch( d => {
					resolutionGlobal({
						activeLog:false,
						estModeiOS:true,
						infoDW:{devDWebDevoilee:false},
						infoConnecteur:{manifest:2},
						langue:"fr"
					})});
			});
		
			let donnees = await promesse;
			resolution(donnees);

		})
	});
	return promesse;
}


async function actionAuChargement(e){
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }

    if(location.search.length > 0){
        if( getURLParameter("aweb")){
            let url = getURLParameter("aweb");
            url = decodeURIComponent( escape( window.atob(url) ));
            window.location.replace(url);
        }else if(getURLParameter("connexion") == "ok"){

            let donnees = await demandeDonnees();
            gestionTraduction.initAvecConstante(cstDict);
            gestionTraduction.metsLaLangue(donnees.langue);
        
        
            metsTexte(document.getElementById('succes'),gestionTraduction.Tr_(cstConnexionReussie,""));
                
            document.getElementById("fermer").addEventListener("click",()=>{
                monPort.postMessage({message:"ferme"});
            },false);


            document.getElementById("ok").style.display = "block";
        }
    }
}

if (document.readyState !== 'loading') {
    actionAuChargement(null);
} else {
    document.addEventListener('DOMContentLoaded', actionAuChargement,false);
}
