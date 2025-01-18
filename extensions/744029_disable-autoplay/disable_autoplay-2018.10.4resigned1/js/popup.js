const popup = {};

popup.init = async () => {
  const tab = (await browser.tabs.query({ active: true, currentWindow: true }))[0];
  const { protocol, hostname: domain } = new URL(tab.url);

  if (protocol !== 'http:' && protocol !== 'https:') {
    document.body.classList.add('not-webpage');
  }

  popup.domain = domain;

  document.getElementById('domain').textContent = domain;

  const prefs = await browser.runtime.sendMessage({ msg: 'popup-loaded', tabId: tab.id, domain });

  const disableAutoplay = document.getElementById('disable-autoplay');
  const disablePreload = document.getElementById('disable-preload');

  if (prefs.disablePreload) {
    disablePreload.checked = true;
  }

  if (prefs.disableAutoplay) {
    disableAutoplay.checked = true;
    disablePreload.disabled = false;
  }

  disableAutoplay.disabled = false;
};

popup.savePref = (prefName, event) => {
  if (prefName === 'disableAutoplay') {
    const disablePreload = document.getElementById('disable-preload');
    if (event.target.checked) {
      disablePreload.disabled = false;
    } else {
      disablePreload.disabled = true;
    }
  }
  browser.runtime.sendMessage({
    prefName,
    msg: 'save-domain-pref',
    value: event.target.checked,
    domain: popup.domain,
  });
};

// popup.openOptions = () => browser.runtime.openOptionsPage();

popup.init().catch(e => console.log(e));

document.getElementById('disable-autoplay')
  .addEventListener('change', popup.savePref.bind(null, 'disableAutoplay'));

document.getElementById('disable-preload')
  .addEventListener('change', popup.savePref.bind(null, 'disablePreload'));

document.getElementById('options-btn').addEventListener('click', () => {
  browser.runtime.openOptionsPage();
});
