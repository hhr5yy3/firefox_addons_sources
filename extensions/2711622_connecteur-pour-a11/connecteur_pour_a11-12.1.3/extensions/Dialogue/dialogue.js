 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 function initDialogue() {}

function envoieMessageAuDialogue(msg) {
    msg.id = "ID_DIALOGUE";
    msg._dib105 = 'messageDialogue';
    window.postMessage(msg);
}
async function afficheDialogue(lesDonneesDuDialogue) {
    if (window.document.getElementById("ID_DIALOGUE") == null) {
        let zIndexMax = findHighestZIndex("*");
        let dialogue = new Druide_Dialogue({
            zIndex: zIndexMax,
            id: "ID_DIALOGUE"
        });
        dialogue.init();
    }
    let promesseInitDialogue = new Promise((resolve) => {
        window.addEventListener('message', function(e) {
            if (e.data._dib105 != "reponseDialogueInitialisation")
                return;
            if (e.data.message == "initialisationDialogue") {
                resolve(true);
            }
        }, false);
    });
    await promesseInitDialogue;
    envoieMessageAuDialogue(lesDonneesDuDialogue);
    return new Promise(function(resolve) {
        window.addEventListener('message', function(e) {
            if (e.data._dib105 == "reponseDialogue") {
                resolve(e.data.reponse);
                detruisDialogue();
            }
        }, false);
    });
}

function detruisDialogue() {
    let d = document.getElementById("ID_DIALOGUE");
    if (d) d.remove();
}
window.addEventListener("si-chargeay", function(e) {
    initDialogue();
}, false);