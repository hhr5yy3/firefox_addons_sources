'use strict';

/**
 * Helper methods for the background scripts. This module pattern is designed
 * to extend when other helpers are included together.
 */
var modules = modules || {};
modules.helpers = (function (module) {

  // Internationalization constants and formatter strings.
  const i18n = {
    // No Placeholders
    mouseButtonLeft: browser.i18n.getMessage('mouseButtonLeft'),
    mouseButtonMiddle: browser.i18n.getMessage('mouseButtonMiddle'),
    mouseButtonRight: browser.i18n.getMessage('mouseButtonRight'),
    // Placeholders
    buttonOther: (button) =>
      browser.i18n.getMessage('mouseButtonOther', [ button ])
  };

  // MIME type to extension map.
  // Not an exhaustive list but contains most common mime types.
  // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats
  var mimeToExtensionMap = {
    // Document
    'text/plain': '.txt',
    'text/html': '.html',
    'text/css': '.css',
    'text/javascript': '.js',
    'text/json': '.json',
    // Image
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/gif': '.gif',
    'image/bmp': '.bmp',
    'image/webp': '.webp',
    // Video
    'video/mp4': '.mp4',
    'video/ogg': '.ogg',
    'video/webm': '.webm',
    // Audio
    'audio/flac': '.flac',
    'audio/x-flac': '.flac',
    'audio/ogg': '.ogg',
    'audio/midi': '.midi',
    'audio/mpeg': '.mp3',
    'audio/wav': '.wav',
    'audio/wave': '.wav',
    'audio/webm': '.webm',
    // Other
    'application/json': '.json',
    'application/octet-stream': '.bin'
  };

  // Parse the version strings used by this addon.
  module.parseAddonVersion = (version) => {
    let match = /(\d+)\.(\d+)\.(\d+)(beta[0-9]+)?/.exec(version);
    if (match) {
      return {
        major: Number(match[1]),
        minor: Number(match[2]),
        maint: Number(match[3]),
        beta: match[4]
      };
    } else {
      return null;
    }
  };

  // A string substitution method that uses {} as a placeholder.
  module.format = function (/* format, [...] */) {
    if (arguments.length === 0) { return ''; }
    if (arguments.length === 1) { return arguments[0]; }

    var format = arguments[0];
    for (var i = 1; i < arguments.length; ++i) {
      var index = format.indexOf('{}');
      if (index >= 0) {
        format = format.slice(0, index) + (arguments[i] || '') + format.slice(index + 2);
      } else {
        // No more placeholders - parameters are left over.
        break;
      }
    }

    return format;
  };

  // Remove invalid characters in a Windows path.
  module.cleanPath = (input, replace = '') => {
    return input.replace(/[\\/:"*?<>|]+/gi, replace);
  };

  // Attempt to determine the filename from a media URL. If the media source does not contain a file extension but the
  // mime type is known, select the extension automatically.
  module.suggestFilename = (mediaSource, mediaType = null) => {
    // Data URIs do not have a file name so try generate a name like 'data.ext' using mime type.    
    if (mediaSource.startsWith('data:')) {
      // Extract the mime type if present.
      let encodingStart = mediaSource.indexOf(';');
      let dataStart = mediaSource.indexOf(',');
      let mimeEnd = (encodingStart > 0 && (encodingStart < dataStart)) ? encodingStart : dataStart;
      let mime = mediaSource.substring(5, mimeEnd);
      return {
        name: 'data',
        ext: (mime === '') ? '.txt' : (mimeToExtensionMap[mime] || '.bin')
      };
    }

    try {
      // Extract the filename from the URL.
      // Take everything from the final / to the query, fragment, or end of URL.
      mediaSource = decodeURI(mediaSource);
      let match = /\/([^\/?#]+)($|\?|#)/i.exec(mediaSource);
      if (mediaSource && match && match[1]) {
        let basename = match[1];
        basename = decodeURIComponent(basename);
        basename = module.cleanPath(basename, ' ');

        // Split the basename into file and extension.
        let lastDot = basename.lastIndexOf('.');
        if (!!~lastDot)  {
          let filename = basename.substring(0, lastDot);
          let extension = basename.substring(lastDot);
          return {
            name: filename,
            // Trim any trailing text from the extension.
            ext: String(/\.\w+/.exec(extension))
          };
        } else {          
          return {
            name: basename,
            // Try to guess the extension from the type.
            ext: (mimeToExtensionMap[mediaType] || '')
          };
        }
      }
    } catch (error) {}

    // Couldn't determine the filename; let the browser guess.
    return {
      name: '',
      ext: ''
    };
  };

  // Try to determine the filename from headers like Content-Type and Content-Disposition.
  module.suggestFilenameFromHeaders = (headers, partialInfo) => {
    partialInfo = partialInfo || {};
    partialInfo.ext = partialInfo.ext || '';
    if (headers.contentType) {
      // Found the content type.
      partialInfo.ext = mimeToExtensionMap[headers.contentType] || '';
    }

    partialInfo.name = partialInfo.name || '';
    if (headers.contentDisposition) {
      // Found the content disposition.
      let match = /filename="([^"]+)"/i.exec(headers.contentDisposition);
      if (match && match[1]) {
         // Split the filename into name and extension.
         let lastDot = match[1].lastIndexOf('.');
         if (!!~lastDot)  {
           partialInfo.name = match[1].substring(0, lastDot);
           partialInfo.ext = match[1].substring(lastDot);
         } else {
           partialInfo.name = match[1];
         }
      }
    }
    
    return partialInfo;
  };

  // Fetch the Content-Type and Content-Disposition header values for a URL. This is likely to fail depending on the
  // CORS configuration of the server.
  module.getContentDisposition = (url) => {
    return fetch(url, {
      method: 'HEAD',
    }).then(res => {
      return {
        error: false,
        contentType: res.headers.get('Content-Type'),
        contentDisposition: res.headers.get('Content-Disposition')
      };
    }).catch(err => {
      return {
        error: true,
        contentType: null,
        contentDisposition: null
      };
    });
  };

  // Get a string that describes a chord combination.
  module.getChordPreview = (chord) => {
    return (chord || [])
      .map(button => {
        switch (button) {
          case 0: return i18n.mouseButtonLeft;
          case 1: return i18n.mouseButtonMiddle;
          case 2: return i18n.mouseButtonRight;
          default:
            return i18n.mouseButtonOther(button);
        }
      })
      .join(' + ');
  };

  // Convert a data URI to a Blob.
  // See: https://stackoverflow.com/a/12300351
  module.dataURItoBlob = (dataURI) => {
    // Convert base64 to raw binary data held in a string.
    var byteString = window.atob(dataURI.split(',')[1]);

    // Separate out the mime component.
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // Write the bytes of the string to an ArrayBuffer.
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  // Match a simple glob pattern against an input.
  module.globMatches = function (glob, input) {
    // Get the *-delimited parts of the glob.
    let parts = glob.split('*');
    let firstPart = parts[0];
    let lastPart = parts[parts.length - 1];

    // If the glob is longer than the string, it can't match.
    if (parts.join('').length > input.length) {
      return false;
    }

    let part, index = 0;
    while ((part = parts.shift()) !== undefined) {
      // Check if this part of the glob can be found in the string, after the previous part.
      index = input.indexOf(part, index);
      if (!~index) {
        return false;
      }
    }

    return true;
  };

  return module;

}(modules.helpers || {}));
