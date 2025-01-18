/* globals download, ffmpeg, locale */
'use strict';

function close(id, callback = () => {}) {
  chrome.tabs.executeScript(id, {
    'runAt': 'document_start',
    'code': `
      [...document.querySelectorAll('.iaextractor-webx-iframe')].forEach(p => p.parentNode.removeChild(p));
    `
  }, callback);
}

function notify(request) {
  chrome.storage.local.get({
    notification: true
  }, prefs => {
    if (prefs.notification) {
      const message = locale.get(request.error || request.message || request);
      const optns = Object.assign({
        type: 'basic',
        iconUrl: '/data/icons/48.png',
        title: locale.get('title'),
        message
      }, {
        // requireInteraction: request.requireInteraction,
        isClickable: request.isClickable
      });
      chrome.notifications.create(optns);
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.method === 'error' || request.method === 'message') {
    notify(request);
  }
  else if (request.method === 'display-panel') {
    const id = request.tabId || sender.tab.id;

    chrome.tabs.executeScript(id, {
      'runAt': 'document_start',
      'code': `!!document.querySelector('.iaextractor-webx-iframe')`
    }, rs => {
      const error = chrome.runtime.lastError;
      const r = rs && rs[0];
      if (error) {
        notify(error);
      }
      else if (r) {
        close(id);
      }
      else {
        chrome.tabs.executeScript(id, {
          'runAt': 'document_start',
          'file': '/data/inject/panel.js'
        });
      }
    });
  }
  else if (request.method === 'download') {
    chrome.storage.local.get({
      pretendHD: false,
      opusmixing: false,
      doMerge: true,
      toAudio: true,
      toMP3: false,
      remove: true,
      ffmpeg: '',
      savein: '',
      saveAs: false,
      commands: {
        toMP3: '-loglevel error -i %input -q:a 0 %output',
        toAudio: '-loglevel error -i %input -acodec copy -vn %output',
        muxing: '-loglevel error -i %audio -i %video -acodec copy -vcodec copy %output'
      }
    }, prefs => {
      download.get(request, prefs).then(
        ds => {
          const vInfo = ds.filter(d => d.dash !== 'a').shift() || ds[0];
          const aInfo = ds.filter(d => d !== vInfo).shift();
          const root = prefs.savein || ffmpeg.parent(vInfo.filename);
          let [leafname, extension] = ffmpeg.extract(vInfo.filename);
          extension = vInfo.extension || extension;

          // audio and video muxing
          if (ds.length === 2 && prefs.doMerge && !prefs.ffmpeg) {
            notify({
              message: 'message_2',
              isClickable: true,
              requireInteraction: true
            });
            window.setTimeout(() => chrome.runtime.openOptionsPage(), 2000);
          }
          else if (ds.length === 2 && prefs.doMerge) {
            // we now allow OPUS for muxing; if vInfo === 'mp4', change container to MKV
            if (extension === 'mp4' && prefs.opusmixing) {
              extension = 'mkv';
            }
            leafname = leafname.replace(' - DASH', '');
            ffmpeg.resolve(root, leafname, extension).then(output => {
              return ffmpeg.convert(prefs.ffmpeg, prefs.commands.muxing, {
                '%audio': aInfo.filename,
                '%video': vInfo.filename,
                '%output': output
              });
            }).then(() => {
              if (prefs.remove) {
                return ffmpeg.remove([aInfo.filename, vInfo.filename]);
              }
            }).catch(e => notify(e));
          }
          // extract audio
          else if (ds.length === 1 && vInfo.dash !== 'v' && prefs.toAudio && prefs.ffmpeg) {
            switch (extension) {
            case 'weba':
            case 'webm':
            case 'ogg':
            case 'vorbis':
              extension = 'ogg';
              break;
            case 'opus':
              break;
            case 'aac':
              break;
            case 'mp4':
            case 'm4a':
              extension = 'm4a';
              break;
            default:
              extension = 'mka'; // "MKA" container format can store a huge number of audio codecs.
            }
            leafname = leafname.replace(' - DASH', '');
            ffmpeg.resolve(root, leafname, extension).then(output => {
              return ffmpeg.convert(prefs.ffmpeg, prefs.commands.toAudio, {
                '%input': vInfo.filename,
                '%output': output
              });
            }).then(() => {
              if (prefs.remove) {
                return ffmpeg.remove([vInfo.filename]);
              }
            }).catch(e => notify(e));
          }
          // convert to mp3
          else if (ds.length === 1 && vInfo.dash !== 'v' && prefs.toMP3 && prefs.ffmpeg) {
            ffmpeg.resolve(root, leafname, 'mp3').then(output => {
              return ffmpeg.convert(prefs.ffmpeg, prefs.commands.toMP3, {
                '%input': vInfo.filename,
                '%output': output
              });
            }).catch(e =>notify(e));
          }
        },
        e => notify(e)
      );
    });
  }
  else if (request.method === 'fetch') {
    const req = new XMLHttpRequest();
    req.open(request.type, request.url);
    req.onload = () => response({
      req
    });
    req.onerror = error => response({
      error
    });
    req.send();
    return true;
  }
  else if (request.method === 'open') {
    if (request.cmd === 'mp3-converter') {
      chrome.tabs.create({
        url: 'https://webbrowsertools.com/convert-to-mp3/'
      });
    }
  }
  //
  if (request.method === 'close-panel') {
    const id = request.tabId || sender.tab.id;
    close(id, response);
    return true;
  }
});

// FAQs
{
  const {onInstalled, getManifest} = chrome.runtime;
  const {version} = getManifest();
  const page = getManifest().homepage_url;
  onInstalled.addListener(({reason, previousVersion}) => {
    chrome.storage.local.get({
      'faqs': true,
      'last-update': 0
    }, prefs => {
      if (reason === 'install' || (prefs.faqs && reason === 'update')) {
        const doUpdate = (Date.now() - prefs['last-update']) / 1000 / 60 / 60 / 24 > 45;
        if (doUpdate && previousVersion !== version) {
          chrome.tabs.create({
            url: page + '?version=' + version +
              (previousVersion ? '&p=' + previousVersion : '') +
              '&type=' + reason,
            active: reason === 'install'
          });
          chrome.storage.local.set({'last-update': Date.now()});
        }
      }
    });
  });
}
