/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2024 Druide informatique inc. */
/*{DEV}*/console.log("Connecteur (script beta-comm) : ",new Date());

window.addEventListener("message_beta-comm", function (e) {
    let detail = JSON.parse(e.detail);
    let liste_options = document.querySelectorAll('[name="data[produit]"]')[0].options;
    document.querySelectorAll('[name="data[produit]"]')[0].options[liste_options.length-1].selected = true;
    document.querySelectorAll('[name="data[objet]"]')[0].value = "Correction Express : ";
    if(document.querySelectorAll('[name="data[dw]"]')!==undefined && document.querySelectorAll('[name="data[dw]"]').length > 0 ) 
        document.querySelectorAll('[name="data[dw]"]')[0].value = JSON.stringify(detail.donnees_globales);
    document.querySelectorAll('[name="data[journal]"]')[0].value = JSON.stringify(detail.log[0]);
}, false);


