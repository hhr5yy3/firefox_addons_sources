// examples:
//  https://www.youtube.com/watch?v=G4fxtGH_lrU -> segmented
//  https://www.youtube.com/watch?v=7lTDkfZs_5s -> no audio bitrate
//  https://www.youtube.com/watch?v=23UGN3qqBWY -> filename with "."
//  https://www.youtube.com/watch?v=yMzMcvzcKag -> with two normal streams


window.getFullInfo = async href => {
  await import('./vendor/cache.js');
  window.Cache = window.module.exports;
  await import('./vendor/formats.js');
  window.formats = Object.assign({}, window.module.exports);
  await import('./vendor/utils.js');
  window.utils = Object.assign({}, window.exports);
  await import('./vendor/sig.js');
  window.sig = Object.assign({}, window.exports);
  await import('./vendor/info-extras.js');
  window.extras = Object.assign({}, window.exports);
  await import('./vendor/format-utils.js');
  window.formatUtils = Object.assign({}, window.exports);
  await import('./vendor/url-utils.js');
  window.urlUtils = Object.assign({}, window.exports);
  await import('./vendor/info.js');
  window.info = Object.assign({}, window.exports);

  return window.info.getInfo(href, {}).then(async o => {
    // TODO: REMOVE AFTER UPDATE
    if (o.videoDetails === undefined) {
      const packed = JSON.stringify(o);
      const a = /publishDate":"([^"]+)"/.exec(packed);
      o.videoDetails = {
        title: o.title,
        author: {},
        videoId: o['video_id'],
        publishDate: a ? a[1] : 'NA'
      };
      if (o.author) {
        o.videoDetails.author.name = o.author.name || o.author;
      }
      else {
        const b = /"author":"([^"]+)"/.exec(packed);
        if (b) {
          o.videoDetails.author.name = b[1];
        }
      }
    }

    let dom;
    for (const format of o.formats) {
      try {
        if (format.isDashMPD) {
          if (!dom) {
            const parser = new DOMParser();
            const content = await fetch(format.url).then(r => r.text());
            dom = parser.parseFromString(content, 'text/xml');
          }
          const node = [...dom.querySelectorAll('Representation')]
            .filter(node => node.id === format.itag.toString()).shift();
          if (node) {
            try {
              const base = node.querySelector('BaseURL').textContent;
              format.url = [...node.querySelectorAll('SegmentList *')].map(e => base + (e.attributes.sourceURL || e.attributes.media).value)
            }
            catch (e) {
              console.warn('Unable to Parse', node);
            }
          }
        }
      }
      catch (e) {
        console.warn('Cannot parse DashMPD', e);
      }
    }
    // remove unsupported formats
    o.formats = o.formats.filter(f => f.isLive === false && f.isHLS === false && (
      f.mimeType.startsWith('video/') || f.mimeType.startsWith('audio/')
    ));
    // make sure audio bitrates are available and sorted
    o.formats = o.formats.map(f => {
      if (f.mimeType.startsWith('audio/') && !f.audioBitrate && f.bitrate) {
        const rates = [32, 96, 128, 192, 256, 320];
        const ds = rates.map(v => Math.abs(v - f.bitrate / 1000));
        const index = ds.indexOf(Math.min(...ds));
        f.audioBitrate = rates[index];
      }
      return f;
    }).sort((a, b) => {
      if (a.mimeType.startsWith('audio/') && b.mimeType.startsWith('video/')) {
        return 1;
      }
      if (a.mimeType.startsWith('video/') && b.mimeType.startsWith('audio/')) {
        return -1;
      }
      if (a.mimeType.startsWith('video/') && b.mimeType.startsWith('video/')) {
        if (a.audioBitrate && !b.audioBitrate) {
          return -1;
        }
        if (!a.audioBitrate && b.audioBitrate) {
          return 1;
        }
        if (a.qualityLabel && b.qualityLabel && a.qualityLabel !== b.qualityLabel) {
          return parseInt(b.qualityLabel) - parseInt(a.qualityLabel);
        }
        return b.bitrate - a.bitrate;
      }
      if (a.mimeType.startsWith('audio/') && b.mimeType.startsWith('audio/')) {
        return b.audioBitrate - a.audioBitrate;
      }
    });
    return o;
  });
};

