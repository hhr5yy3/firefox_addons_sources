/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2024 Druide informatique inc. */

//==================gestionnaireMessageDsPageAide===============================
function gestionnaireMessageDsPageAide(event){
	if (event.data.type != "TypeContentScriptAide")
    	return;	
	if(event.data.message == "sauvegarde"){
		if(typeof CKEDITOR !== "undefined"){ 
			try{
				for (let [unIdInstance,uneInstance] of Object.entries(CKEDITOR.instances)){
                    if(uneInstance.getSelectedHtml().$.textContent.length>0){
					    uneInstance.insertText(uneInstance.getSelectedHtml().$.textContent);
                    }
				}
			}catch(erreur){	
				console.error("antidoteAide.gestionnaireMessageDsPageAide",erreur);
			}
		}
	}
    return;	
};
window.addEventListener("message", gestionnaireMessageDsPageAide , false);
