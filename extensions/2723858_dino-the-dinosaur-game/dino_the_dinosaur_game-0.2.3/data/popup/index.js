const frame = document.querySelector('iframe');

const configs = {
  mode: '',
  player: '',
  ground: '',
  tree: ''
};

const start = () => chrome.storage.local.get(configs, prefs => {
  prefs.mode = prefs.mode || ['color', 'black'][Math.floor(Math.random() * 2)];
  prefs.ground = prefs.ground || ['one', 'two', 'three'][Math.floor(Math.random() * 3)];
  prefs.tree = prefs.tree || ['one', 'two'][Math.floor(Math.random() * 2)];

  if (prefs.player) {
    frame.addEventListener('load', () => {
      frame.contentWindow.postMessage({
        prefs
      }, '*');
      frame.focus();
    }, {
      once: true
    });
    frame.src = 'game/index.html';
  }
  else {
    frame.src = 'select/index.html';
  }
});
start();

window.onmessage = e => {
  if (e.data.cmd === 'reload') {
    frame.src = '';
    start();
  }
  else if (e.data.cmd === 'reset') {
    frame.src = 'select/index.html';
    chrome.storage.local.set({
      player: ''
    });
  }
  else if (e.data.cmd === 'open-in-tab') {
    chrome.storage.local.get(configs, prefs => {
      const args = new URLSearchParams();
      for (const [key, value] of Object.entries(prefs)) {
        args.set(key, value);
      }
      args.set('mode', 'window');
      chrome.tabs.create({
        url: '/data/popup/game/index.html?' + args.toString()
      }, () => window.close());
    });
  }
};

// Firefox
window.addEventListener('focus', e => {
  frame.focus();
});
