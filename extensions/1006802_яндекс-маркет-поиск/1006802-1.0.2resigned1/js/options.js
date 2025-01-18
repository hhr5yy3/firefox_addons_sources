// Localize options page
document.addEventListener('DOMContentLoaded', 
  function localize() {
    // About section
    document.getElementById("aboutTitle").innerText = chrome.i18n.getMessage("aboutTitle");
    document.getElementById("aboutContents").innerHTML = chrome.i18n.getMessage("aboutContents");

    // Credits section
    document.getElementById("creditsTitle").innerText = chrome.i18n.getMessage("creditsTitle");
  });
