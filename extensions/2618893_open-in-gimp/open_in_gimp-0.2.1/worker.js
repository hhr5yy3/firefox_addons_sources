'use strict';

const notify = async msg => {
  const win = await chrome.windows.getCurrent();

  chrome.storage.local.get({
    width: 500,
    height: 200,
    left: win.left + Math.round((win.width - 500) / 2),
    top: win.top + Math.round((win.height - 200) / 2)
  }, prefs => {
    chrome.windows.create({
      url: '/data/notify/index.html?msg=' + encodeURIComponent(msg),
      width: prefs.width,
      height: prefs.height,
      left: prefs.left,
      top: prefs.top,
      type: 'popup'
    });
  });
};

const Native = function() {
  this.callback = null;
  this.channel = chrome.runtime.connectNative('com.add0n.node');

  function onDisconnect() {
    chrome.tabs.create({
      url: '/data/helper/index.html'
    });
  }

  this.channel.onDisconnect.addListener(onDisconnect);
  this.channel.onMessage.addListener(res => {
    if (!res) {
      chrome.tabs.create({
        url: '/data/helper/index.html'
      });
    }
    else if (res.code && (res.code !== 0 && (res.code !== 1 || res.stderr !== ''))) {
      notify(`Something went wrong!

-----
Code: ${res.code}
Output: ${res.stdout}
Error: ${res.stderr}`
      );
    }
    else if (this.callback) {
      this.callback(res);
    }
    else {
      console.error(res);
    }
  });
};
Native.prototype.find = function(env, callback) {
  this.callback = function(res) {
    const path = /.*gimp-[\d.]+\.exe/.exec(res.stdout);
    callback(path && path.length ? path[0] : null);
  };
  this.channel.postMessage({
    cmd: 'exec',
    command: 'where',
    arguments: ['gimp-*'],
    env
  });
};
Native.prototype.env = function(callback) {
  this.callback = res => {
    callback(res);
  };
  this.channel.postMessage({
    cmd: 'env'
  });
};

Native.prototype.exec = function(command, args, callback = () => {}) {
  this.callback = res => callback(res);
  this.channel.postMessage({
    cmd: 'exec',
    command,
    arguments: args
  });
};

function open(url, native) {
  chrome.storage.local.get({
    path: null
  }, prefs => {
    if (navigator.userAgent.includes('Mac')) {
      native.exec('open', ['-a', prefs.path || 'Gimp.app', '--args', '--new-instance', '--as-new', url]);
    }
    else if (navigator.userAgent.includes('Linux')) {
      native.exec(prefs.path || 'gimp', ['--as-new', url]);
    }
    else if (prefs.path) {
      native.exec(prefs.path, ['--as-new', url]);
    }
    else {
      native.env(obj => {
        const env = [
          obj.env.LOCALAPPDATA + '\\Programs',
          obj.env.ProgramFiles,
          obj.env['ProgramFiles(x86)'],
          obj.env.ProgramW6432
        ].filter((s, i, l) => l.indexOf(s) === i).map(s => {
          return [s + '\\gimp 1\\bin', s + '\\gimp 2\\bin', s + '\\gimp 3\\bin'];
        }).flat();
        native.find(env, path => {
          if (path) {
            native.exec(path, ['--as-new', url]);
          }
          else {
            notify('Cannot find GIMP executable');
          }
        });
      });
    }
  });
}

// start up
{
  const onstartup = () => chrome.storage.local.get({
    extensions: ['JPEG', 'JPG', 'GIF', 'PNG', 'EPS', 'TIFF', 'PSD', 'INDD', 'RAW', 'WEBP']
  }, prefs => {
    chrome.contextMenus.create({
      id: 'open-in-image',
      title: 'Open in GIMP',
      contexts: ['image'],
      documentUrlPatterns: ['*://*/*']
    }, () => chrome.runtime.lastError);
    if (prefs.extensions.length) {
      chrome.contextMenus.create({
        id: 'open-in-link',
        title: 'Open in GIMP',
        contexts: ['link'],
        targetUrlPatterns: prefs.extensions.map(e => ['*://*/*.' + e.toUpperCase() + '*', '*://*/*.' + e.toLowerCase() + '*']).flat(),
        documentUrlPatterns: ['*://*/*']
      });
    }
  });
  chrome.runtime.onStartup.addListener(onstartup);
  chrome.runtime.onInstalled.addListener(onstartup);
  chrome.storage.onChanged.addListener(ps => {
    if (ps.extensions) {
      chrome.contextMenus.remove('open-in-link', () => {
        chrome.runtime.lastError;
        onstartup();
      });
    }
  });
}

async function download(url) {
  if (/google\.[^./]+\/url?/.test(url)) {
    const tmp = /url=([^&]+)/.exec(url);
    if (tmp && tmp.length) {
      url = decodeURIComponent(tmp[1]);
    }
  }
  if (url.startsWith('data:') && /Firefox/.test(navigator.userAgent)) {
    url = await fetch(url)
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob));
  }

  const clean = () => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  };

  return new Promise((resolve, reject) => {
    chrome.downloads.download({url}, id => {
      function observe(d) {
        if (d.id === id && d.state) {
          if (d.state.current === 'complete' || d.state.current === 'interrupted') {
            chrome.downloads.onChanged.removeListener(observe);
            if (d.state.current === 'complete') {
              chrome.downloads.search({id}, ([d]) => {
                clean();
                if (d) {
                  resolve(d);
                }
                else {
                  reject(Error('I am not able to find the downloaded file!'));
                }
              });
            }
            else {
              clean();
              reject(Error('The downloading job got interrupted'));
            }
          }
        }
      }
      chrome.downloads.onChanged.addListener(observe);
    });
  });
}

function analyze(url) {
  const native = new Native();
  chrome.storage.local.get({
    download: true
  }, prefs => {
    if (prefs.download || url.startsWith('data:')) {
      download(url).then(d => open(d.filename, native)).catch(e => {
        alert(e.message);
        console.error(e);
      });
    }
    else {
      open(url, native);
    }
  });
}

chrome.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId === 'open-in-link') {
    analyze(info.linkUrl);
  }
  else {
    analyze(info.srcUrl || info.linkUrl);
  }
});

/* FAQs & Feedback */
{
  const {management, runtime: {onInstalled, setUninstallURL, getManifest}, storage, tabs} = chrome;
  if (navigator.webdriver !== true) {
    const page = getManifest().homepage_url;
    const {name, version} = getManifest();
    onInstalled.addListener(({reason, previousVersion}) => {
      management.getSelf(({installType}) => installType === 'normal' && storage.local.get({
        'faqs': true,
        'last-update': 0
      }, prefs => {
        if (reason === 'install' || (prefs.faqs && reason === 'update')) {
          const doUpdate = (Date.now() - prefs['last-update']) / 1000 / 60 / 60 / 24 > 45;
          if (doUpdate && previousVersion !== version) {
            tabs.query({active: true, currentWindow: true}, tbs => tabs.create({
              url: page + '&version=' + version + (previousVersion ? '&p=' + previousVersion : '') + '&type=' + reason,
              active: reason === 'install',
              ...(tbs && tbs.length && {index: tbs[0].index + 1})
            }));
            storage.local.set({'last-update': Date.now()});
          }
        }
      }));
    });
    setUninstallURL(page + '&rd=feedback&name=' + encodeURIComponent(name) + '&version=' + version);
  }
}
