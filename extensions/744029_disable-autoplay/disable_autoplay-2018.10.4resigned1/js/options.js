let options;
const optionPage = {};

optionPage.init = async () => {
  options = await browser.runtime.sendMessage({ msg: 'get-options' });

  const disableAutoplay = document.getElementById('disable-autoplay');
  const disablePreload = document.getElementById('disable-preload');

  if (options.defaults.disablePreload) {
    disablePreload.checked = true;
  }

  if (options.defaults.disableAutoplay) {
    disableAutoplay.checked = true;
    disablePreload.disabled = false;
  }

  disableAutoplay.disabled = false;

  optionPage.showDomainPrefs();
};

optionPage.showDomainPrefs = () => {
  const list = Object.keys(options.domainPrefs)
    .map(domain => optionPage.generateDomainPrefsItem(domain, options.domainPrefs[domain]));
  if (list.length > 0) {
    const dom = JsonToDOM.parse(list);
    document.querySelector('#domain-prefs .list .body').appendChild(dom);
  } else {
    document.querySelector('#domain-prefs .list .no-domain-pref').classList.remove('hide');
  }
};

optionPage.generateDomainPrefsItem = (domain, pref) => [
  'div', { class: 'item prefs', 'data-domain': domain }, [
    ['div', { class: 'col domain-name' }, domain],
    [
      'div', { class: 'col disable-autoplay' }, [
        [
          'div', { class: 'panel-formElements-item browser-style' }, [
            ['input', {
              type: 'checkbox',
              id: `${domain}-disable-autoplay`,
              class: 'disable-autoplay',
              checked: pref.disableAutoplay,
              onchange: optionPage.savePref.bind(null, 'disableAutoplay', false),
            }],
            ['label', { for: `${domain}-disable-autoplay` }],
          ],
        ],
      ],
    ],
    [
      'div', { class: 'col disable-preload' }, [
        [
          'div', { class: 'browser-style' }, [
            ['input', {
              type: 'checkbox',
              id: `${domain}-disable-preload`,
              class: 'disable-preload',
              checked: pref.disablePreload,
              onchange: optionPage.savePref.bind(null, 'disablePreload', false),
              disabled: !pref.disableAutoplay,
            }],
            ['label', { for: `${domain}-disable-preload` }],
          ],
        ],
      ],
    ],
    [
      'div', { class: 'col remove-btn' }, [
        [
          'div', { class: 'btn', onclick: optionPage.removeDomainPrefs }, [
            ['div', { class: 'image' }],
          ],
        ],
      ],
    ],
  ],
];

optionPage.savePref = (prefName, defaultPref, event) => {
  if (prefName === 'disableAutoplay') {
    const disablePreload = event.target.closest('.prefs').querySelector('.disable-preload');
    if (event.target.checked) {
      disablePreload.disabled = false;
    } else {
      disablePreload.disabled = true;
    }
  }
  const message = { prefName, value: event.target.checked };
  message.msg = defaultPref ? 'change-default' : 'save-domain-pref';
  if (!defaultPref) {
    message.domain = event.target.closest('.item').dataset.domain;
  }
  browser.runtime.sendMessage(message);
};

optionPage.removeDomainPrefs = (event) => {
  const item = event.target.closest('.item');
  const { domain } = item.dataset;
  browser.runtime.sendMessage({ msg: 'remove-domain-prefs', domain });
  item.remove();
  const domainPrefsCount = document.querySelector('#domain-prefs .list .body').children.length;
  if (domainPrefsCount === 0) {
    document.querySelector('#domain-prefs .list .no-domain-pref').classList.remove('hide');
  }
};

optionPage.init().catch(e => console.log(e));

document.getElementById('disable-autoplay')
  .addEventListener('change', optionPage.savePref.bind(null, 'disableAutoplay', true));

document.getElementById('disable-preload')
  .addEventListener('change', optionPage.savePref.bind(null, 'disablePreload', true));
