/* eslint camelcase: 0 */
'use strict';

const youtube = window.youtube = {};

/* Converting video tag to video codec information */
youtube.formatDictionary = (function() {
  const KNOWN = {
    '5': ['flv', '240', 'mp3', 64, null],
    '6': ['flv', '270', 'mp3', 64, null],
    '13': ['3gp', 'N/A', 'aac', null, null],
    '17': ['3gp', '144', 'aac', 24, null],
    '18': ['mp4', '360', 'aac', 96, null],
    '22': ['mp4', '720', 'aac', 192, null],
    '34': ['flv', '360', 'aac', 128, null],
    '35': ['flv', '280', 'aac', 128, null],
    '36': ['3gp', '240', 'aac', 38, null],
    '37': ['mp4', '1080', 'aac', 192, null],
    '38': ['mp4', '3072', 'aac', 192, null],
    '43': ['webm', '360', 'ogg', 128, null],
    '44': ['webm', '480', 'ogg', 128, null],
    '45': ['webm', '720', 'ogg', 192, null],
    '46': ['webm', '1080', 'ogg', 192, null],
    '59': ['mp4', '480', 'aac', 128, null],
    '78': ['mp4', '480', 'aac', 128, null],
    '82': ['mp4', '360', 'aac', 96, null],
    '83': ['mp4', '240', 'aac', 96, null],
    '84': ['mp4', '720', 'aac', 192, null],
    '85': ['mp4', '520', 'aac', 152, null],
    '91': ['ts', '144', 'acc', 48, null],
    '92': ['ts', '240', 'acc', 48, null],
    '93': ['ts', '360', 'acc', 128, null],
    '94': ['ts', '480', 'acc', 128, null],
    '95': ['ts', '720', 'acc', 256, null],
    '96': ['ts', '1080', 'acc', 256, null],
    '100': ['webm', '360', 'ogg', 128, null],
    '101': ['webm', '360', 'ogg', 192, null],
    '102': ['webm', '720', 'ogg', 192, null],
    '120': ['flv', '720', 'aac', 128, null],
    '127': ['ts', '360', 'aac', 96, null],
    '128': ['ts', '360', 'aac', 96, null],
    '132': ['ts', '240', 'aac', 48, null],
    '133': ['mp4', '240', null, null, 'v'],
    '134': ['mp4', '360', null, null, 'v'],
    '135': ['mp4', '480', null, null, 'v'],
    '136': ['mp4', '720', null, null, 'v'],
    '137': ['mp4', '1080', null, null, 'v'],
    '138': ['mp4', '2160', null, null, 'v'],
    '139': ['m4a', null, 'aac', 38, 'a'],
    '140': ['m4a', null, 'aac', 128, 'a'],
    '141': ['m4a', null, 'aac', 256, 'a'],
    '151': ['ts', '720', 'acc', 24, null],
    '160': ['mp4', '144', null, null, 'v'],
    '171': ['webm', null, 'ogg', 128, 'a'],
    '172': ['webm', null, 'ogg', 192, 'a'],
    '242': ['webm', '240', null, null, 'v'],
    '243': ['webm', '360', null, null, 'v'],
    '244': ['webm', '480', null, null, 'v'],
    '245': ['webm', '480', null, null, 'v'],
    '246': ['webm', '480', null, null, 'v'],
    '247': ['webm', '720', null, null, 'v'],
    '248': ['webm', '1080', null, null, 'v'],
    '249': ['webm', null, 'opus', 50, 'a'],
    '250': ['webm', null, 'opus', 70, 'a'],
    '251': ['webm', null, 'opus', 160, 'a'],
    '264': ['mp4', '1440', null, null, 'v'],
    '266': ['mp4', '2160', null, null, 'v'],
    '271': ['webm', '1440', null, null, 'v'],
    '272': ['webm', '2160', null, null, 'v'],
    '278': ['webm', '144', null, null, 'v'],
    '298': ['mp4', '720', null, null, 'v'],
    '299': ['mp4', '1080', null, null, 'v'],
    '302': ['webm', '720', null, null, 'v'],
    '303': ['webm', '1080', null, null, 'v'],
    '308': ['webm', '1440', null, null, 'v'],
    '313': ['webm', '2160', null, null, 'v'],
    '315': ['webm', '2160', null, null, 'v'],
    '330': ['webm', '144', null, null, 'v'],
    '331': ['webm', '240', null, null, 'v'],
    '332': ['webm', '360', null, null, 'v'],
    '333': ['webm', '240', null, null, 'v'],
    '334': ['webm', '720', null, null, 'v'],
    '335': ['webm', '1080', null, null, 'v'],
    '336': ['webm', '1440', null, null, 'v'],
    '337': ['webm', '2160', null, null, 'v'],
    '394': ['mp4', '144', null, null, 'v'],
    '395': ['mp4', '240', null, null, 'v'],
    '396': ['mp4', '360', null, null, 'v'],
    '397': ['mp4', '480', null, null, 'v'],
    '398': ['mp4', '720', null, null, 'v']
  };
  return obj => {
    const itag = obj.itag;
    const IK = KNOWN[itag];
    const dash = IK ? IK[4] : (obj.audioSampleRate || obj.audioQuality ? 'a' : 'v');

    let container = '';
    try {
      container = (obj.mimeType || obj.type).split('/')[1].split(';')[0];
    }
    catch (e) {}
    let codecs = '';
    try {
      codecs = dash === 'a' ? (obj.mimeType || obj.type).split('codecs="')[1].split('"')[0].split('.')[0] : null;
    }
    catch (e) {}
    let audioBitrate = null;
    if (IK) {
      audioBitrate = IK[3];
    }
    else if (dash === 'a') {
      if (obj.audioQuality === 'AUDIO_QUALITY_MEDIUM') {
        audioBitrate = 160;
      }
      else if (obj.audioQuality === 'AUDIO_QUALITY_LOW') {
        audioBitrate = 70;
      }
      else {
        try {
          audioBitrate = parseInt(obj.audioSampleRate / 1000);
        }
        catch (e) {}
      }
    }
    // get resolution from YouTube server
    const res = obj.size ? /\d+x(\d+)/.exec(obj.size) : null;
    let resolution = '';
    if (IK) {
      resolution = IK[1] + 'p';
    }
    else if (res && res.length) {
      resolution = res[1] + 'p';
    }
    else if (obj.quality) {
      if (obj.quality === 'medium') {
        resolution = '360p';
      }
      else if (obj.quality === 'large') {
        resolution = '480p';
      }
      else if (obj.quality === 'small') {
        resolution = '240p';
      }
      else if (obj.quality === 'tiny') {
        resolution = '144p';
      }
      else {
        resolution = obj.quality.replace('hd', '') + 'p';
      }
    }
    else if (obj.quality_label) {
      resolution = obj.quality_label;
    }

    const tmp = {
      container: IK ? IK[0] : container,
      resolution,
      audioEncoding: IK ? IK[2] : codecs,
      audioBitrate,
      dash
    };
    if (dash === 'a') {
      tmp.quality = 'Audio-only';
    }
    if (dash === 'v') {
      tmp.quality = tmp.resolution + ' Video-only';
    }
    return tmp;
  };
})();

youtube.fetch = (url, method = 'GET', raw = false) => new Promise((resolve, reject) => {
  const req = new XMLHttpRequest();
  req.open(method, url);
  req.onload = () => resolve(raw ? req : req.response);
  req.onerror = reject;
  req.send();
});

youtube.size = (url, pretify) => {
  function format(bytes, si) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    do {
      bytes /= thresh;
      u += 1;
    }
    while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + units[u];
  }

  return youtube.fetch(url, 'HEAD', true).then(req => {
    let size = req.getResponseHeader('Content-Length');
    size = parseInt(size);
    if (pretify && !isNaN(size)) {
      size = format(size, false);
    }
    return size;
  });
};

youtube.getFormats = videoID => {
  // console.log('getFormats', videoID);
  return youtube.fetch('https://www.youtube.com/watch?v=' + videoID).then(content => {
    const url_encoded_fmt_stream_map = /url_encoded_fmt_stream_map":\s*"([^"]*)/.exec(content);
    const adaptive_fmts = /adaptive_fmts":\s*"([^"]*)/.exec(content);
    const adaptiveFormats = /\\"adaptiveFormats\\":([^\]]+\])/.exec(content);
    const normalFormats = /\\"formats\\":([^\]]+\])/.exec(content);
    const dashmpd = /"dashmpd":\s*"([^"]+)"/.exec(content);
    const player = /"js":\s*"([^"]+)"/.exec(content);
    const published_date =
      /"dateText".*(\w{3}\s\d{1,2}[,.]\s*\d{4})"/.exec(content) ||
      /"dateText".*(\d{1,2}\s\w{3}\s\d{4})"/.exec(content);
    return {
      url_encoded_fmt_stream_map: url_encoded_fmt_stream_map && url_encoded_fmt_stream_map[1],
      adaptive_fmts: adaptive_fmts && adaptive_fmts[1],
      normalFormats: normalFormats && normalFormats[1],
      adaptiveFormats: adaptiveFormats && adaptiveFormats[1],
      dashmpd: dashmpd && dashmpd[1] || '',
      player: player && player[1],
      published_date: published_date && published_date[1] || '-'
    };
  });
};

youtube.getExtra = videoID => {
  // console.log('getExtra', videoID);
  function quary(str) {
    const temp = {};
    const vars = str.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] === 'url_encoded_fmt_stream_map' || pair[0] === 'adaptive_fmts' || pair[0] === 'dashmpd') {
        temp[pair[0]] = window.unescape(pair[1]);
      }
      // we do not need these two anymore as we get them from player.getVideoData();
      else if (pair[0] !== 'title' && pair[0] !== 'author') {
        temp[pair[0]] = window.unescape(decodeURIComponent(pair[1]));
      }
    }
    return temp;
  }

  return youtube.fetch(
    'https://www.youtube.com/get_video_info?hl=en_US&el=detailpage&dash="0"&video_id=' + videoID
  ).then(content => {
    const tmp = quary(content);
    if (tmp.errorcode) {
      throw Error('info server failed with: ' + tmp.reason);
    }
    return tmp;
  });
};

youtube.getInfo = (videoID, author, title) => {
  // console.log('getInfo', videoID);
  return Promise.all([
    youtube.getFormats(videoID).catch(() => {}),
    youtube.getExtra(videoID).catch(() => {})
  ]).then(([frmts, extra]) => {
    const obj = Object.assign(frmts, extra);
    if (!obj.url_encoded_fmt_stream_map && !obj.adaptive_fmts && !obj.adaptiveFormats) {
      throw Error('Cannot detect url_encoded_fmt_stream_map, adaptive_fmts or adaptiveFormats');
    }
    obj.author = author;
    obj.title = title;
    obj.vid = videoID;

    return obj;
  });
};

youtube.decipher = (ccode, s = '') => {
  let sig = s.split('');
  function swap(arr, b) {
    const c = arr[0];
    arr[0] = arr[b % arr.length];
    arr[b % arr.length] = c;
    return arr;
  }

  ccode.forEach((c, i) => {
    if (typeof c !== 'string') {
      return;
    }
    switch (c) {
    case 'r':
      sig.reverse();
      break;
    case 's':
      sig = sig.slice(ccode[i + 1]);
      break;
    case 'p':
      sig.splice(0, ccode[i + 1]);
      break;
    case 'w':
      sig = swap(sig, ccode[i + 1]);
      break;
    }
  });
  return sig.join('');
};

/* Appending itag 141 to info */
youtube.findOtherItags = (info, ccode) => {
  // console.log('findOtherItags', ccode);
  let dashmpd = info.dashmpd;

  if (dashmpd.indexOf(/signature/) === -1) {
    const matchSig = (/\/s\/([a-zA-Z0-9.]+)\/?/i.exec(dashmpd) || [null, ''])[1];
    dashmpd = dashmpd.replace('/s/' + matchSig + '/', '/signature/' + youtube.decipher(ccode, matchSig, ccode) + '/');
  }
  if (dashmpd) {
    return youtube.fetch(dashmpd).then(function(response) {
      function doTag(itag) {
        const regexp = new RegExp('<baseurl[^>]*>(http[^<]+itag[=/]' + itag + '[^<]+)</baseurl>', 'i');
        const res = regexp.exec(response);
        if (res && res.length) {
          if (res[1].indexOf('yt_otf') === -1) {
            const url = res[1].replace(/&amp;/g, '&');
            let obj = {
              itag
            };
            const format = youtube.formatDictionary(obj);
            if (!format) {
              return;
            }
            obj = Object.assign(obj, format, {url});
            info.formats.push(obj);
          }
          else {
            // console.log(`itag=${itag} is skipped; we are not supporting segmentation`);
          }
        }
      }

      const availableItags = info.formats.map(o => o.itag);
      const itags = (response.match(/itag[=/]\d+/g))
        .map(s => s.substr(5))
        .map(i => parseInt(i))
        .filter(i => availableItags.indexOf(i) === -1);
      itags.forEach(doTag);
      return info;
    }, () => info);
  }
  else {
    return Promise.resolve(info);
  }
};

youtube.extractFormats = (info, ccode) => {
  // console.log('extractFormats');
  let objs = [];

  [info.url_encoded_fmt_stream_map, info.adaptive_fmts]
    .filter(a => a).join(',').split(',')
    .forEach(elem => {
      const pairs = elem.split('&')
        .map(function(e) {
          const pair = e.split('=');
          if (!pair || !pair.length) {
            return null;
          }
          return [
            pair[0],
            decodeURIComponent(window.unescape(window.unescape(pair[1])))
          ];
        })
        .filter(e => e)
        .reduce((p, c) => {
          p[c[0]] = c[1];
          return p;
        }, {});

      const itag = parseInt(pairs.itag);
      if (!itag) {
        return;
      }
      pairs.itag = itag;

      // TO-DO; Lh0vuaCQgJc
      if (!pairs.stream_type) {
        objs.push(pairs);
      }
    });
  //
  if (info.adaptiveFormats || info.normalFormats) {
    const v = (info.normalFormats || '[]').replace(/\\(.)/g, (a, b) => b);
    const w = (info.adaptiveFormats || '[]').replace(/\\(.)/g, (a, b) => b);
    try {
      const list = [...JSON.parse(v), ...JSON.parse(w)];
      objs.push(...list.map(o => {
        const a = (o.cipher || '').split('&').reduce((p, c) => {
          const [k, v] = c.split('=');
          p[k] = decodeURIComponent(window.unescape(window.unescape(v)));
          return p;
        }, {});
        return Object.assign(o, a);
      }));
      for (const o of objs) {
        if (o.signatureCipher) {
          const args = new URLSearchParams(o.signatureCipher);
          o.url = args.get('url') || '';
          for (const [key, value] of args.entries()) {
            if (key === 's' || key === 'sig' || key === 'sp') {
              o[key] = value;
            }
            else if (key !== 'url') {
              o.url += '&' + key + '=' + encodeURIComponent(value);
            }
          }
        }
      }

      for (const o of objs) {
        let url = o.url;
        if (url.indexOf('ratebypass') === -1) {
          url += '&ratebypass=yes';
        }
        o.url = url;

        if (o.s) {
          o.url += '&s=' + o.s;
        }
        else if (o.sig) {
          o.url += '&' + (o.sp || 'signature') + '=' + o.sig;
        }
        const format = youtube.formatDictionary(o) || {};
        Object.assign(o, format);
      }
    }
    catch (e) {
      console.error('error parsing adaptiveFormats', e);
    }
  }
  // remove duplicates
  const itags = [];
  objs = objs.reverse().filter(o => {
    if (itags.indexOf(o.itag) === -1) {
      itags.push(o.itag);
      return true;
    }
    // else {
    //   console.log('duplicated itag', o.itag);
    // }
  });

  if (!objs || !objs.length) {
    throw Error('extractFormats: No link is found');
  }
  info.formats = objs;
  delete info.url_encoded_fmt_stream_map;
  delete info.adaptive_fmts;

  return youtube.findOtherItags(info, ccode);
};

youtube.doCorrections = (info, ccode) => {
  info.formats.forEach((o, i) => {
    info.formats[i].url = o.url.replace(/&s=([^&]*)/, (a, s) => {
      return '&' + (o.sp || 'signature') + '=' + youtube.decipher(ccode, s);
    });
  });
  return info;
};

/* local signature detection
 * inspired from https://github.com/gantt/downloadyoutube
 */
youtube.signatureLocal = info => {
  // console.log('signatureLocal');
  function doMatch(text, regexp) {
    const matches = text.match(regexp);
    return matches ? matches[1] : null;
  }
  if (!info.player) {
    throw Error('signatureLocal: Cannot resolve signature;1');
  }

  let scriptURL = info.player.replace(/\\/g, '');
  scriptURL = (scriptURL.substr(0, 2) === '//' ? 'https:' : 'https://www.youtube.com/') + scriptURL;
  // console.error(scriptURL);
  return youtube.fetch(scriptURL).then(content => {
    content = content.replace(/\r?\n|\r/g, '');

    let sigFunName =
      doMatch(content, /([^\s};]*)\s*=\s*function\s*\([^,]\)[^}]*\.split\(["']{2}\)[^}]*\.join\(['"]{2}\)/) ||
      doMatch(content, /\.set\s*\("signature"\s*,\s*([a-zA-Z0-9_$][\w$]*)\(/) ||
      doMatch(content, /\.sig\s*\|\|\s*([a-zA-Z0-9_$][\w$]*)\(/) ||
      doMatch(content, /\.signature\s*=\s*([a-zA-Z_$][\w$]*)\([a-zA-Z_$][\w$]*\)/) ||
      doMatch(content, /set\("signature",\s([a-zA-Z0-9_$][\w$]*)\(/) ||
      doMatch(content, /signature.*\.set\([^,],\s*([a-zA-Z0-9_$]*)\(/);

    if (sigFunName === null) {
      throw Error('signatureLocal: Cannot resolve signature;2');
    }
    sigFunName = sigFunName.replace('$', '\\$');
    const regCode = new RegExp(
      'function \\s*' + sigFunName +
      '\\s*\\([\\w$]*\\)\\s*{[\\w$]*=[\\w$]*\\.split\\(""\\);(.+);return [\\w$]*\\.join'
    );
    let functionCode = doMatch(content, regCode);

    if (functionCode === null) {
      const regCode2 = new RegExp(
        sigFunName +
        '\\s*\\=\\s*function\\([\\w\\$]*\\)\\s*\\{\\s*[\\w\\$]\\=[\\w\\$]*\\.split\\([^\\)]*\\)\\;(.+?)(?=return)'
      );
      functionCode = doMatch(content, regCode2);
      if (functionCode === null) {
        throw Error('signatureLocal: Cannot resolve signature;3');
      }
    }
    const revFunName = doMatch(
      content,
      /([\w$]*)\s*:\s*function\s*\(\s*[\w$]*\s*\)\s*{\s*(?:return\s*)?[\w$]*\.reverse\s*\(\s*\)\s*}/
    );
    const sliceFuncName = doMatch(
      content,
      /([\w$]*)\s*:\s*function\s*\(\s*[\w$]*\s*,\s*[\w$]*\s*\)\s*{\s*(?:return\s*)?[\w$]*\.(?:slice)\(.+\)\s*}/
    );
    const spliceFuncName = doMatch(
      content,
      /([\w$]*)\s*:\s*function\s*\(\s*[\w$]*\s*,\s*[\w$]*\s*\)\s*{\s*(?:return\s*)?[\w$]*\.(?:splice)\(.+\)\s*}/
    );
    const regInline = new RegExp(
      '[\\w$]+\\[0\\]\\s*=\\s*[\\w$]+\\[([0-9]+)\\s*%\\s*[\\w$]+\\.length\\]'
    );
    const funcPieces = functionCode.split(/\s*;\s*/);
    const decodeArray = [];

    for (let i = 0; i < funcPieces.length; i++) {
      funcPieces[i] = funcPieces[i].trim();
      const codeLine = funcPieces[i];
      if (codeLine.length > 0) {
        if (codeLine.indexOf(sliceFuncName) !== -1) { // slice
          const slice = /\d+/.exec(codeLine.split(',').pop()); // oE.s4(a,43) or oE["s4"](a,43) or oE['s4'](a,43)
          if (slice && slice.length) {
            decodeArray.push('s', slice[0]);
          }
          else {
            throw Error('signatureLocal: Cannot resolve signature;4');
          }
        }
        if (codeLine.indexOf(spliceFuncName) !== -1) { // splice
          const splice = /\d+/.exec(codeLine.split(',').pop()); // oE.s4(a,43) or oE["s4"](a,43) or oE['s4'](a,43)
          if (splice && splice.length) {
            decodeArray.push('p', splice[0]);
          }
          else {
            throw Error('signatureLocal: Cannot resolve signature;4');
          }
        }
        else if (codeLine.indexOf(revFunName) !== -1) { // reverse
          decodeArray.push('r');
        }
        else if (codeLine.indexOf('[0]') >= 0) { // inline swap
          if (i + 2 < funcPieces.length &&
            funcPieces[i + 1].indexOf('.length') >= 0 &&
            funcPieces[i + 1].indexOf('[0]') >= 0) {
            let inline = doMatch(funcPieces[i + 1], regInline);
            inline = parseInt(inline);
            decodeArray.push('w', inline);
            i += 2;
          }
          else {
            throw Error('signatureLocal: Cannot resolve signature;5');
          }
        }
        else if (codeLine.indexOf(',') >= 0) { // swap
          const swap = /\d+/.exec(codeLine.split(',').pop()); // oE.s4(a,43) or oE["s4"](a,43) or oE['s4'](a,43)
          if (swap && swap.length) {
            decodeArray.push('w', swap[0]);
          }
          else {
            throw Error('signatureLocal: Cannot resolve signature;6');
          }
        }
        else {
          throw Error('signatureLocal: Cannot resolve signature;7');
        }
      }
    }
    if (decodeArray) {
      return new Promise((resolve, reject) => {
        chrome.storage.local.set({
          ccode: decodeArray,
          player: info.player
        }, () => {
          const url = youtube.doCorrections({
            formats: [info.formats[0]]
          }, decodeArray).formats[0].url;
          youtube.size(url).then(
            size => {
              if (size) {
                resolve(youtube.doCorrections(info, decodeArray));
              }
              else {
                chrome.storage.local.remove(['ccode', 'player'], () => {
                  reject(Error('signatureLocal: Signature cannot be verified'));
                });
              }
            },
            e => reject(e)
          );
        });
      });
    }
    else {
      throw Error('signatureLocal: Cannot resolve signature;8');
    }
  });
};

youtube.verify = (info, prefs) => {
  // console.log('verify', info);
  const isEncrypted = info.formats[0].s;
  const doUpdate = isEncrypted && (!prefs.player || !prefs.ccode || info.player !== prefs.player);

  if (doUpdate) {
    return youtube.signatureLocal(info);
  }
  else if (isEncrypted && !doUpdate) {
    return youtube.doCorrections(info, prefs.ccode);
  }
  else {
    return info;
  }
};

/* Sorting audio-only and video-only formats */
youtube.sort = info => {
  info.formats = info.formats.sort((a, b) => {
    if (a.dash === 'a' && b.dash === 'a') {
      return b.audioBitrate - a.audioBitrate;
    }
    if (a.dash === 'a' && b.dash === 'v') {
      return 1;
    }
    if (a.dash === 'v' && b.dash === 'a') {
      return -1;
    }
    if (a.dash !== 'a' && a.dash !== 'v' && (b.dash === 'a' || b.dash === 'v')) {
      return -1;
    }
    if (b.dash !== 'a' && b.dash !== 'v' && (a.dash === 'a' || a.dash === 'v')) {
      return 1;
    }
    let tmp = parseInt(b.resolution) - parseInt(a.resolution);
    if (tmp === 0) {
      tmp = parseInt(b.bitrate) - parseInt(a.bitrate);
    }
    return tmp;
  });

  return info;
};

youtube.connrections = (info, pattern) => {
  // dot is used to find extension
  info.title = info.title.replace(/\./g, '-');
  info.formats = info.formats.map(f => {
    const extension = f.dash === 'a' ? f.audioEncoding : f.container;
    f.name = pattern
      .replace('[file_name]', info.title)
      .replace('[extension]', extension)
      .replace('[author]', info.author)
      .replace('[author]', info.author)
      .replace('[video_id]', info.vid || info.video_id)
      .replace('[video_resolution]', f.resolution)
      .replace('[audio_bitrate]', f.audioBitrate)
      .replace('[published_date]', info.published_date);

    f.extension = extension;
    // use DASH in title
    if (f.dash) {
      if ('.' + extension) {
        f.name = f.name.replace('.' + extension, ' - DASH.' + extension);
      }
      else {
        f.name += ' - DASH';
      }
    }
    // OS file name limitations
    f.name = f.name.trim()
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",<>{}[\]\\/]/gi, '-')
      .replace(/[\\/:*?"<>|]/g, '_').substring(0, 240);

    return f;
  });
  return info;
};
youtube.perform = (videoID, author, title) => new Promise((resolve, reject) => {
  chrome.storage.local.get({
    ccode: ['r', 'r'],
    player: null,
    pattern: '[file_name].[extension]'
  }, prefs => {
    youtube.getInfo(videoID, author, title)
      .then(info => youtube.extractFormats(info, prefs.ccode))
      .then(info => youtube.verify(info, prefs))
      .then(youtube.sort)
      .then(info => youtube.connrections(info, prefs.pattern))
      .then(resolve)
      .catch(reject);
  });
});
