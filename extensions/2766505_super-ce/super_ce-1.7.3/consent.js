document.getElementById("consent_1").addEventListener("click", function() {
    let button_consent = document.getElementById("button_finish");
    if(document.getElementById("consent_1").checked) {
        button_consent.style.opacity = "1";
        button_consent.removeAttribute("disabled");
        button_consent.addEventListener("click", userGiveConsent);
    } else {
        button_consent.style.opacity = "0.5";
        button_consent.setAttribute("disabled", "disabled");
        button_consent.removeEventListener("click", userGiveConsent);
    }
})

function userGiveConsent() {
    browser.storage.local.set({"couleur_ce_privacy": "true"});
    window.close('','_parent','');
}