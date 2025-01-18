'use strict';

const config = {};
config.scd = {
  id: atob('YTNlMDU5NTYzZDdmZDMzNzJiNDliMzdmMDBhMDBiY2Y=')
  // id: atob('R1NUTWcycXlLZ3E4T3U5d3ZKZmt4YjNqazFPTkl6dnk=')
  // id: atob('VHlRQXRlbWNPcUZGUVRDVjJxcXkzcm1QOWNPbjA2Nmo=')
};

function bgFetch(src, type = 'json') {
  return new Promise(resolve => chrome.runtime.sendMessage({
    method: 'fetch',
    src,
    type
  }, resolve));
}

function download(obj, button) {
  const link = document.createElement('a');
  const href = URL.createObjectURL(obj.blob);
  link.href = href;

  chrome.storage.local.get({
    filename: '[title] - [user.username].[extension]'
  }, prefs => {
    const filename = prefs.filename.replace(/\[([^\]]+)\]/g, (a, key) => {
      if (key === 'extension') {
        return ({
          'mpeg': 'mp3',
          'ogg': 'opus'
        })[obj.type.split('/')[1]];
      }
      return key.split('.').reduce((p, c) => p[c], obj.v2);
    });

    link.setAttribute('download', filename);
    link.dataset.title = obj.v2.title;
    button.textContent = '';
    button.dataset.prepared = true;
    button.appendChild(link);
    link.click();
    window.setTimeout(() => {
      URL.revokeObjectURL(href);
    }, 1000);
    link.removeAttribute('download');
    link.setAttribute('target', '_blank');
    link.href = 'https://webbrowsertools.com/convert-to-mp3/';
    link.title = link.textContent = 'Convert to MP3';
  });
}

function tracks(obj, button) {
  // changing state back to download
  button.textContent = 'Prepare';
  button.dataset.prepared = false;
  //
  const div = document.createElement('div');
  div.setAttribute('class', 'isdownloader-div');
  const par = document.createElement('div');
  div.appendChild(par);
  obj.tracks.forEach(o => {
    const b = button.cloneNode(true);
    if (o.title) {
      b.textContent = o.title;
    }
    else {
      b.textContent = '...';
      id2obj(o.id).then(o => {
        b.textContent = o.title;
      });
    }
    b.dataset.track = o.id;
    b.dataset.isdid = '';
    par.appendChild(b);
  });

  div.addEventListener('click', function(e) {
    if (e.target === div) {
      div.parentNode.removeChild(div);
    }
  });
  document.body.appendChild(div);
}
// join to one
function join(buffers) {
  const buffersLengths = buffers.map(b => b.byteLength);
  const totalBufferlength = buffersLengths.reduce((p, c) => p + c, 0);
  const unit8Arr = new Uint8Array(totalBufferlength);
  buffersLengths.reduce((p, c, i) => {
    unit8Arr.set(new Uint8Array(buffers[i]), p);
    return p + c;
  }, 0);
  return unit8Arr.buffer;
}
// id3
async function id3writer(arrayBuffer, v2) {
  if (!v2.artwork_url) {
    throw Error('NO_ARTWORK');
  }
  const coverArrayBuffer = await fetch(v2.artwork_url).then(r => r.arrayBuffer());

  const {ID3Writer} = await import(chrome.runtime.getURL('/data/inject/browser-id3-writer.mjs'));

  const writer = new ID3Writer(arrayBuffer);
  writer.setFrame('TIT2', v2.title || '')
    .setFrame('TPE1', [v2?.user?.full_name || ''])
    .setFrame('TLEN', v2.duration || 0)
    .setFrame('TCON', [v2.genre || ''])
    .setFrame('WOAF', v2.permalink_url)
    .setFrame('APIC', {
      type: 3,
      data: coverArrayBuffer,
      description: v2.description || ''
    });
  writer.addTag();

  return writer.arrayBuffer;
}

async function m3u(content, progress = () => {}) {
  const urls = content.split('\n').filter(a => a.trim() && a[0] !== '#');
  const parts = [];
  if (urls.length) {
    for (let i = 0; i < urls.length; i += 5) {
      progress(i / urls.length * 100);
      await Promise.all(urls.slice(i, i + 5).map((u, j) => {
        return fetch(u).then(r => r.arrayBuffer()).then(b => parts[i + j] = b);
      }));
    }
    return parts;
  }
  else {
    throw Error('cannot download empty list');
  }
}

// if obj has the track id, jump to step(), else get track id from obj.url
const id2obj = async id => {
  const v2 = await bgFetch('https://api-v2.soundcloud.com/tracks/' + id + '?client_id=' + config.scd.id);
  return v2;
};
const v2downlaoder = async (v2, progress) => {
  if (v2.media) {
    // grab MP3
    const o = v2.media.transcodings.sort((a, b) => b.preset.indexOf('mp3') - a.preset.indexOf('mp3')).shift();
    const playlist = await bgFetch(o.url + '?client_id=' + config.scd.id);
    if (playlist.url) {
      const list = await bgFetch(playlist.url, 'text');
      const blobs = await m3u(list, progress);
      const type = o.preset.startsWith('opus') ? 'audio/ogg' : 'video/mpeg';
      const a = await join(blobs);
      let blob;
      try {
        const b = await id3writer(a, v2);
        blob = new Blob([b], {type});
      }
      catch (e) {
        console.warn('cannot write id3 tags', e);
        blob = new Blob([a], {type});
      }
      progress(100);
      return {
        v2,
        blob,
        type
      };
    }
    else {
      throw Error('cannot detect playlist URL');
    }
  }
  else {
    throw Error('cannot detect media from v2');
  }
};

async function getInfo(obj, progress = () => {}) {
  if (obj.track) { // from tracks
    const v2 = await id2obj(obj.track);
    return v2downlaoder(v2, progress);
  }
  // convert url to track
  const track = await bgFetch('https://api-v2.soundcloud.com/' +
      'resolve?url=' + encodeURIComponent(obj.href) +
      '&client_id=' + config.scd.id);
  if (track.media) {
    return v2downlaoder(track, progress);
  }
  else if (track.tracks) {
    return track;
  }
  else if (track.id) {
    const v2 = await id2obj(track.id);
    return v2downlaoder(v2, progress);
  }
  else {
    console.warn(track);
    throw Error('cannot detect track location from track URL');
  }
}

function prepare(target) {
  function step(href, track) {
    const id = target.dataset.isdid || Math.random().toString(36).substring(7);
    target.dataset.isdid = id;
    target.textContent = 'Fetching...';
    target.dataset.prepared = false;

    getInfo({id, href, track}, p => {
      target.textContent = 'Fetching (' + p.toFixed(0) + '%)';
    }).then(o => {
      if (o.tracks) {
        tracks(o, target);
      }
      else {
        return download(o, target);
      }
    }).catch(e => {
      chrome.runtime.sendMessage({
        method: 'notify',
        message: e.message || e
      });
      console.warn(e);
      target.textContent = 'Prepare';
      target.dataset.prepared = false;
    });
  }
  const item = target.closest('.soundBadgeList__item') ||
    target.closest('.trackList__item') ||
    target.closest('[role="group"]');
  if (target.dataset.track) {
    step(null, target.dataset.track);
  }
  // detecting track URL
  else if (item) {
    // example https://soundcloud.com/no-angel-records/sets/avoid-dave
    const title = item.querySelector('.soundTitle__title') || item.querySelector('.trackItem__trackTitle');
    if (title) {
      const href = title.href || document.location.href;
      step(href);
    }
    else {
      chrome.runtime.sendMessage({
        method: 'notify',
        message: 'Cannot find the title element'
      });
    }
  }
  else {
    step(document.location.href);
  }
}

document.addEventListener('click', function(e) {
  if (e.button !== 0) {
    return;
  }
  const target = e.target;
  const cmd = target.dataset.cmd;

  if (cmd === 'prepare') {
    prepare(target);
  }
  if (cmd) {
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();
  }
});
