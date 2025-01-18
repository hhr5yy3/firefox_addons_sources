'use strict';

const ffmpeg = {
  sep: navigator.platform.startsWith('Win') ? '\\' : '/'
};
window.ffmpeg = ffmpeg;

ffmpeg.convert = function(command, args, dictionary) {
  return new Promise((resolve, reject) => {
    args = args.split(/\s/).map(s => {
      Object.keys(dictionary).forEach(key => s = s.replace(key, dictionary[key]));
      return s;
    });
    chrome.runtime.sendNativeMessage('com.add0n.node', {
      cmd: 'exec',
      kill: true,
      command,
      arguments: args
    }, obj => {
      if (!obj || obj.error || (obj.code && obj.code !== 0)) {
        console.warn('ffmpeg', obj);
        reject(new Error(obj ? obj.error || obj.stderr || obj.stdout : 'error_12'));
      }
      else {
        resolve();
      }
    });
  });
};

ffmpeg.parent = path => {
  return path.split(ffmpeg.sep).slice(0, -1).join(ffmpeg.sep);
};

ffmpeg.extract = path => {
  const s = path.split(ffmpeg.sep).pop();
  if (s.indexOf('.') === -1) {
    return [s, ''].map(a => a.trim());
  }
  else {
    const a = s.split('.');
    const e = a.pop();

    return [a.join('.'), e].map(a => a.trim());
  }
};

ffmpeg.resolve = (path, name, extension) => {
  function check(files, name, extension, index = 0) {
    const leafname = name.replace(/-\d+$/, '') + (index ? '-' + index : '') + '.' + extension;
    for (const n of files) {
      if (n.endsWith(leafname)) {
        return check(files, name, extension, index + 1);
      }
    }
    return leafname;
  }

  return new Promise((resolve, reject) => {
    chrome.runtime.sendNativeMessage('com.add0n.node', {
      cmd: 'dir',
      path
    }, obj => {
      if (!obj || obj.error || (obj.code && obj.code !== 0)) {
        console.error(obj);
        reject(new Error(obj ? obj.error || obj.stderr || obj.stdout : 'error_10'));
      }
      else {
        resolve(path + ffmpeg.sep + check(obj.files, name, extension));
      }
    });
  });
};

ffmpeg.remove = files => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendNativeMessage('com.add0n.node', {
      cmd: 'remove',
      files
    }, obj => {
      if (!obj || obj.error || (obj.code && obj.code !== 0)) {
        console.error(obj);
        reject(new Error(obj ? obj.error || obj.stderr || obj.stdout : 'error_11'));
      }
      else {
        resolve();
      }
    });
  });
};
