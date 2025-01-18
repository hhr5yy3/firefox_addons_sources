async function loadSettingsPage() {
    $$('body > *').forEach(i => i.remove());
    document.body.style.padding = '0'
    const iframe = document.createElement("iframe");
    iframe.style.border = 'none';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = chrome.runtime.getURL("data/settings.html");
    document.body.appendChild(iframe);
    document.querySelector('html').style.height = '100%'
    document.querySelector('html').style.width = '100%'
    document.title = "Настройки";
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
}

loadSettingsPage().then(() => console.log('Loaded draft page'));
