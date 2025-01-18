// need separate file for js cause of csp
// ¯\_(ツ)_/¯
//
// need popup because since chrome 49 all extensions' icons are shown in toolbar
// and if extensions doesnt have 'action' (like popup) - its' icon is gray
// ¯\_(ツ)_/¯
document.querySelector('#header').innerText = chrome.i18n.getMessage('title');
document.querySelector('#message').innerText = chrome.i18n.getMessage('popup_text');
