const BBEvent = function() {};
BBEvent.prototype = Backbone.Events;

BBEvent.prototype.waitForEvent = function(name, timeout = 0) {
  return new Promise((resolve, reject) => {
    this.once(name, resolve);
    if(timeout > 0) {
      setTimeout(reject, timeout, new Error('time out waiting for: ' + name));
    }
  });
}

const REGEX_CHARS_SPECIAL = '*.?^$[]{}()\/+,:|!'.split('').map(function(chr) {
  return [new RegExp('\\' + chr, 'g'), '\\' + chr];
});

const LOGGED_MESSAGES = {};
const LOG_SKIP_NEXT_N = 100;
const MAX_TAB_CREATE_RETRY_COUNT = 10;

function addBreadcrumb(...args) {
  window.Sentry && Sentry.addBreadcrumb(...args);
}

function logMessage(msg, ...args) {
  let count = LOGGED_MESSAGES[msg] || 0;
  if(count == 0) {
    window.Sentry && Sentry.captureMessage(msg, ...args);
  }
  count += 1;
  // log, skip N and log again
  LOGGED_MESSAGES[msg] = count > LOG_SKIP_NEXT_N ? 0 : count;
}

function testURL(url) {
  return /^(http:|https:)/i.test(url);
};

function createTemplate(str) {
  return (data) => str.replace(/\{\{(\w*)\}\}/g, (x, key) => data[key] || '');
}

function wildcardMatch(pattern, str) {
  const expr = pattern.split('*').map(function(block) {
    REGEX_CHARS_SPECIAL.forEach(function(replacer) {
      block = block.replace(replacer[0], replacer[1]);
    });
    return block;
  }).join('.*');
  const regex = new RegExp('^' + expr + '$');
  return regex.test(str);
}

function getHostname(url) {
  return url.split('/')[2];
}

/*
  Take a function, with last argument as callback,
  and promisify it if callback is null, else just
  call the function with arguments.
  **** Will work only if there is only one function as argument in fn, as callback.
  **** Will work with only 2 arguments in the callback function inside new Promise,
       err, res. Since resolve & reject only takes 1 argument.
*/
function promisifyOrCallback(fn) {
  return function(...args) {
    if (typeof(args[args.length-1]) != 'function') {
      return new Promise((resolve, reject) => {
        fn.call(this, ...args, (err, res) => err ? reject(err) : resolve(res));
      });
    } else {
      fn.call(this, ...args);
    }
  };
}

function getValueFromPath(json, path) {
  const parts = path.split('.');
  let value = json;

  for (let i = 0; i < parts.length; i += 1) {
    value = value[parts[i]];
    if (value == null) {
      break;
    }
  }
  return value;
}

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}


class CancellablePromise {

  cancel() {
    throw new Error("Not Implemented")
  }
}

class CancellableTimeoutPromise extends CancellablePromise {

  timeoutId = null

  /**
   * @type {Promise}
   */
  promise = null

  constructor(ms, e) {
    super();
    this.promise = new Promise((_, rej) => {
      this.timeoutId = setTimeout(() => {
        rej(e)
      }, ms)
    })
  }

  cancel() {
    clearTimeout(this.timeoutId)
  }
}

function isElectron() {
  return CFG.CLIENT.TYPE === C.CLIENT_ELECTRON;
}

chrome.tabs.createAsync = function(info, retryCount = 0) {
  return new Promise(function(resolve, reject) {
    chrome.tabs.create(info, async (tab) => {
      // chrome has started returning a null tab. it can happen when user is
      // interacting with the tab bar.
      if(tab) {
        resolve(tab);
      } else if(retryCount < MAX_TAB_CREATE_RETRY_COUNT) {
        await wait(2000);
        chrome.tabs.createAsync(info, retryCount + 1).then(resolve).catch(reject);
      } else {
        reject({code: 'EBROWSER', msg: 'chrome.tabs.create failed to create a tab'});
      }
    });
  });
};

chrome.tabs.queryAsync = function (query) {
  return new Promise(resolve => {
    chrome.tabs.query(query, tabs => resolve(tabs));
  });
};

chrome.tabs.removeAsync = function(id) {
  return new Promise((resolve, reject) => {
    chrome.tabs.remove(id, resolve);
  });
}

chrome.tabs.updateAsync = function(id, info) {
  return new Promise((resolve, reject) => {
    chrome.tabs.update(id, info, resolve);
  });
}

chrome.windows.createAsync = function(info) {
  return new Promise((resolve, reject) => {
    chrome.windows.create(info, window => {
      if(!window) {
        return reject(new Error('window not found'));
      }
      resolve(window);
    });
  });
}
