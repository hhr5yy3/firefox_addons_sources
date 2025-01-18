/* global gmail */
const ids = new Set();

const exit = () => {
  clearTimeout(exit.id);
  console.info('%c[offscreen iframe]', 'color:#ff9900', 'exit request', ids.size);
  exit.id = setTimeout(() => {
    if (ids.size === 0) {
      chrome.runtime.sendMessage({
        method: 'exit-offscreen'
      });
    }
  }, 60000);
};

const play = request => new Promise((resolve, reject) => {
  stop();
  const audio = document.createElement('audio');
  audio.setAttribute('preload', 'auto');
  audio.setAttribute('autobuffer', 'true');
  audio.setAttribute('autoplay', 'true');
  audio.onended = audio.onerror = e => {
    ids.delete(request.id);
    exit();
  };
  audio.iid = request.id;
  document.body.append(audio);

  const {index, media, prefs} = request;

  const type = index === null ? media.default.type : media['custom' + index].type;
  let path = '/data/sounds/' + type + '.mp4';
  if (type === 4) {
    path = index === null ? media.default.file : media['custom' + index].file;
  }
  audio.src = path;
  audio.volume = prefs.soundVolume / 100;
  audio.play().then(() => resolve(true), e => reject(e));
});

const stop = () => {
  for (const e of document.querySelectorAll('audio')) {
    e.pause();
    e.remove();
    ids.delete(e.iid);
  }
  exit();
};

chrome.runtime.onMessage.addListener(({request, method}, sender, response) => {
  if (method === 'offscreen') {
    console.info('%c[offscreen iframe]', 'color:#ff9900', 'request', request);
    clearTimeout(exit.id);
    const id = request.cmd + ';' + Math.random();
    request.id = id;
    ids.add(id);

    if (request.cmd === 'play') {
      play(request).then(() => response(true), e => response({
        error: e.message
      }));

      return true;
    }
    else if (request.cmd === 'stop') {
      stop(request);
      response(true);
      ids.delete(request.id);
      exit();
    }
    else if (request.cmd === 'gmail.action') {
      gmail.action(request.request).then(() => response(true)).catch(e => {
        console.error(e);
        response({
          message: e.message
        });
      }).finally(() => {
        ids.delete(request.id);
        exit();
      });
      return true;
    }
    else if (request.cmd === 'gmail.search') {
      gmail.search(request.request).then(response).catch(e => {
        console.error(e);
        response({
          message: e.message
        });
      }).finally(() => {
        ids.delete(request.id);
        exit();
      });
      return true;
    }
  }
});
