async function loadDraftPage() {
    $$('iframe').forEach(i => i.remove());
    const iframe = document.createElement("iframe");
    iframe.style.border = 'none';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = chrome.runtime.getURL("data/material-ui/popup.html");
    document.body.appendChild(iframe);
    document.querySelector('html').style.height = '100%'
    document.querySelector('html').style.width = '100%'
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
}
loadDraftPage().then(()=> console.log('Loaded draft page'));
