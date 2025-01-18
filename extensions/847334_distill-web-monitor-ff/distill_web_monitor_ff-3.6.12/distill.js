
/*
NOTE: Do not edit. This is an auto-generated file. All changes will be lost!
*/


const DEV = 0;  // used by main.js and bg.js to disable a few features
const VERSION = chrome.runtime.getManifest().version;

const CFG = window.CFG = {
  URL: {
    ANALYTICS : 'https://acts.distill.io',
    API: 'https://api.distill.io/v1',
    APP: 'https://monitor.distill.io',
    AUTH: 'https://accounts.distill.io',
    BASE: chrome.runtime.getURL(''),
    BROADCAST: 'https://broadcast2.distill.io',
    STATIC: 'https://accounts.distill.io/static_files/v1',
    WEBSITE: 'https://distill.io',
    UTILITIES : 'https://utils.distill.io',
    WATCHLIST: chrome.runtime.getURL('') + 'ui/inbox.html',
    LOGIN: 'https://accounts.distill.io/service-login?redirect=app://ui/inbox.html#inbox',
    ROOT: 'https://distill.io',
  },
  SENTRY: {
    dsn: "https://f856fd5cf4414e769b67a18668c3f233@o985892.ingest.sentry.io/5946006",
    tracesSampleRate: .01,
    environment: "ext",
    release: VERSION,
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'CreateHTMLCallback',
      'TemplateResult.getTemplateElement',
      'InvalidStateError: A mutation operation was attempted on a database that did not allow mutations.',
    ],
  },
  SIGNAL: {
    WS_URL: 'signalling-server.distill.io',
    WS_PORT: 443,
    SECURE: true,
  },
  VERSION,
};
;
CFG.URL.BASE = chrome.runtime.getURL('');
CFG.URL.WELCOME = CFG.URL.WEBSITE+'/docs/web-monitor/distill-firefox-add-on/';
CFG.URL.BLANK = 'about:blank';  // loading blank.html causes new tabs to not load the original page
CFG.URL.STICKY = CFG.URL.BASE+'sticky.html';
CFG.URL.DIFFWORKER = '/lib/worker.mjs';

CFG.CLIENT = {
  TYPE: 13,
  NAME: 'firefox_webext',
  INFO: 'Mozilla Firefox',
};
;
const ID = (function(x) {
  return function() {
    return x++;
  };
})(1);

const DBG = 0;

// Generate four random hex digits.
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
  return (S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4());
}

window.Supports = {
  tabForXFrame: true,
  tabForDynamic: true,
};

;
Sentry.init(CFG.SENTRY);

// Service level configurations
class ErrorBase extends Error {
  constructor(code, message, data = {}) {
    super(message);
    this.code = code;
    this.data = data;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      stack: this.stack,
    }
  }
}

function Err(code, msg) {
  const tpl = createTemplate(msg);

  return class Error extends ErrorBase {
    constructor(data) {
      super(code, tpl(data), data);
    }

    setSnapshot(snapshot) {
      this.snapshot = snapshot
    }

    hasSnapshot(snapshot) {
      return !!this.snapshot
    }

    // Checks if err is of same type
    static si(err) {
      return code === err.code;
    }
  };
}

// XXX expose different error classes directly?
_.extend(Err, {

  ABORT: Err('ABORT', 'Activity aborted!'),

  NOT_FOUND: Err('NOT_FOUND', '{{type}} not found with {{id}}.'),

  PARAM_INVALID: Err('PARAM_INVALID', 'Invalid {{param}}, got: {{value}}'),

  PAGE_LOAD: Err('ELOAD', 'Failed to load page; cause: {{message}}'),

  SELECTION_EMPTY: Err('SELECTION_EMPTY', 'Selection did not match any content'),

  TIMEOUT: Err('TIMEOUT', '{{type}} timedout after {{time}} seconds.'),

  TYPE_UNKNOWN: Err('TYPE_UNKNOWN', '{{type}} of unknown type: {{value}}'),

  UNHANDLED: function(e) {
    return {
      code: 'UNHANDLED',
      message: e.toString(),
      data: e.stack,
    };
  },

});

;
/**
 * Global object to trigger and subscribe to events.
 *
 * Namespacing events:
 *  ns_1:ns_x:name, event
 *
 * All arguments to a trigger should be serializable into JSON.
 */
const gEvents = window.gEvents = _.extend({}, Backbone.Events);

function createEventSource(callback) {
  // 1. Get token to subscribe to notifications
  HTTP.request({
    url: CFG.URL.BROADCAST + '/temp_token',
    method: 'POST',
    headers: apiHeaders(),
  }, function(err, xhrObj) {
    if (err) {
      callback(err);
    } else {
      let res = xhrObj.response;
      const ENTITIES = ['clients', 'sieves', 'sieve_data', 'sieve_actions', 'sieve_rules', 'tags', 'user_attrs', 'users', 'users_clients_groups', 'macros'];
      const source = new EventSource(CFG.URL.BROADCAST + '/events/' + res.token+'?' + qs.stringify({entities: ENTITIES}));
      callback(null, source);
    }
  });
}
;
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
;
const NotifyAudio = (function() {
  let defaultSrc = '/skin/media/bell_strike.ogg';

  return {
    play: function(action) {
      const src = action?.config?.tone || defaultSrc;

      const player = new Audio();

      if (src.indexOf('tone:') == 0) {
        KVStore.findOne(src, function(err, doc) {
          // doc can be null if tone was not found
          doc ? play(doc.value) : defaultSrc;
        });
      } else {
        play(src);
      }

      function play(src) {
        player.src = src;
        player.play();
      }
    },
  };
})();

const NotifyPopup = (function() {
  chrome.notifications.onClicked.addListener(function(notificationId) {
    const words = notificationId.split(/--(.+)/);
    if (words[0]== 'update') {
      service.openAndMarkRead(words[1]);
      chrome.notifications.clear(notificationId);
    } else if (words[0]== 'error') {
      chrome.tabs.create({url: words[1]});
      ErrorActions.clearErrorUnreadList();
    }
  });

  /*
  chrome.notifications.onSholwSettings.addListener(function() {
    // TODO Open settings page
  });
  */

  return {
    hide: function() {
    },
    showErrorGroup: function(results) {
      const title = 'Errors encountered';
      let resMsg;
      let buf = results.map(function(arg) {
        return arg.name; // truncate large names
      });
      if (results.length === 1) {
        const err = JSON.parse(results[0].err);
        buf.push((err.code || 'UNKNOWN') + ': ' + (err.msg || err.message || JSON.stringify(err)));
      }
      if (_.size(buf) > 3) {
        buf = buf.slice(0, 3);
      }
      if (results.length > 3) {
        buf.push('and ' + (results.length - 3).toString() + ' more...');
      }
      resMsg = buf.join('\n');

      chrome.notifications.create('error--'+service.appUrl+'#filter/error', {
        type: 'basic',
        title: title,
        message: resMsg, // TODO Show a smart preview of content
        iconUrl: 'ui/img/distill_error.svg',
      }, function(notificationId) {
        // Notification is created and shown

      });
    },
    clearErrorGroup: function() {
      chrome.notifications.clear('error--'+service.appUrl+'#filter/error');
    },
    show: function(action, context) {
      // console.log('Actions:popup:show', action, context);
      // Add message to list of messages to be shown to user. Once popup is
      // shown, it will pull message and display it to the user.

      PopupMessageStore.create({
        rel: SieveStore.name,
        key: context.sieve.id,
        uri: context.sieve.uri,
        title: context.sieve.name, // TODO Add a snippet of diff from context?
      }, function(err, msg) {
        const
          title = context.sieve.name;


        let text = context.sieve_data.text.replace(/\s+/g, ' '); // FF shows full text and uses \n to show line breaks

        text = text.length > 70 ? text.substring(0, 70) + '...' : text;

        chrome.notifications.create('update--'+context.sieve.id, {
          type: 'basic',
          title: title,
          message: text, // TODO Show a smart preview of content
          iconUrl: 'ui/img/distill_128.png',
          // buttons: [{ title: 'Mark as Read' }]
        }, function(notificationId) {
          // Notification is created and shown
        });
      });
    },
  };
})();

;
var ErrorActions = (function() {
  const counter = 0;
  // var timer = [0, 1000, 2000, 3000, 4000];
  let timer = 0;
  let eaUnreadErrList= {};
  let setTime;
  let handleFirstCalled = false;
  let timerId;
  /*
  function intervalReset(){
    if(Date.now() - setTime >= 7200000){
      counter = 0;
      setTime = Date.now();
    }
    setTimeout(intervalReset, 7210000);
  }
  */
  function runTimer() {
    if (_.size(eaUnreadErrList) > 0) {
      ErrorActions.handleIntervalError();
    }
    timerId = setTimeout(runTimer, timer*60000);
  }
  gEvents.on('init', function(argument) {
    Prefs.on('change:errorAction.enabled change:active', function(e) {
      if (!(Prefs.get('errorAction.enabled') && Prefs.get('active') )) {
        clearTimeout(timerId);
        NotifyPopup.clearErrorGroup();
      } else {
        handleFirstCalled = false;
      }
    });
    eaUnreadErrList = Prefs.get('eaUnreadErrList', {});
    timer = Prefs.get('errorAction.interval');
  });
  return {
    handleError: function(sieve, err) {
      const minCount = parseInt(Prefs.get('errorAction.minCount', 3));
      if (err.count === minCount) {
        eaUnreadErrList[sieve.id] = Date.now();
        Prefs.set('eaUnreadErrList', eaUnreadErrList);
      }
      // condition passes when user enables notifications and first error occurs
      if (Prefs.get('errorAction.enabled') && Prefs.get('active') && (!handleFirstCalled && err.count >= minCount)) {
        if (!_.isEmpty(eaUnreadErrList)) {
          this.handleFirstError(sieve, err);
        }
        runTimer();
      }
    },
    handleFirstError: function(sieve, err) {
      NotifyAudio.play({
        config: {
          tone: Prefs.get('errorAction.sound') || '/skin/media/buzzer.ogg',
        },
      });
      handleFirstCalled = true;
    },

    handleIntervalError: function() {
      SieveStore.find({
        // XXX Users only need notifications for monitors that are ON.
        'state.in': [C.STATE_READY],
        'err.ne': '$null',
        // 'ts_view.lt': { name: 'ts_data', type: 'field' }
      }, {
        only: ['id', 'ts', 'name', 'err'],
        order: ['-ts_mod'],
      }, function(err, result) {
        if (err) {
          DBG && console.error('Failed to schedule.');
          // XXX Severe error, unilkely to happen.
        } else {
          if (result && result.count > 0) {
            const resultList = _.filter(result.data, function(sieve) {
              return eaUnreadErrList[sieve.id];
            });

            if (_.size(resultList) > 0) {
              NotifyPopup.showErrorGroup(resultList);
              /*
                setTime = Date.now();
                if(!notificationCalled){
                  intervalReset();
                }
                notificationCalled = true;
                */
            }
          }
        }
      });
    },

    clearErrorUnreadList: function(argument) {
      NotifyPopup.clearErrorGroup();
      eaUnreadErrList = {};
      Prefs.set('eaUnreadErrList', {});
    },
  };
})();
;
const DATE_0 = new Date(0);
const DAYS = [0, 1, 2, 3, 4, 5, 6];
const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

ActionDescriptors = {};

ActionDescriptors[C.ACTION_EMAIL] = {
  descriptors: [{
    desc: 'Template for subject',
    name: 'subject',
    type: 'STRING_TEMPLATE',
  }, {
    desc: 'Template for email body',
    name: 'body',
    type: 'HTML_TEMPLATE',
  }],
  /**
   * Dispatches the alert.
   *
   * @action Configuration parameters. Must conform to descriptor.
   * @data Data generated by an alert.
   * @cb Callback to call when done.
   */
  act: function alert_email(action, context, cb) {
    ActionEmail.send(action, context, cb);
  },
},

ActionDescriptors[C.ACTION_LOCAL_POPUP] = {
  descriptors: [],
  act: function(action, context, cb) {
    if (Prefs.get('actions.popup', true)) {
      NotifyPopup.show(action, context);
    }
    cb();
  },
};

ActionDescriptors[C.ACTION_PUSH] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionPush.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_SMS] = {
  descriptors: [{
  }],
  act: function(action, context, cb) {
    ActionSMS.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_WEBHOOK] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionWebhook.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_SLACK] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionSlack.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_DISCORD] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionDiscord.send(action, context, cb);
  },
};

ActionDescriptors[C.ACTION_LOCAL_OPEN_TAB] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionTab.open(action, context, cb);
  },
};
ActionDescriptors[C.ACTION_LOCAL_AUDIO] = {
  descriptors: [{
    desc: 'Name or URL of the file to play audio',
    must: true,
    name: 'src',
    type: 'SRC',
  }, {
    desc: 'Playback duration',
    must: false,
    name: 'duration',
    type: 'DURATION',
  }],
  act: function(action, context, cb) {
    if (Prefs.get('actions.audio', true)) {
      NotifyAudio.play(action, context);
    }
    cb();
  },
};

ActionDescriptors[C.ACTION_MACRO] = {
  descriptors: [],
  act: function(action, context, cb) {
    ActionMacro.run(action, context, cb);
  },
};

ScheduleDescriptors = {
  undefined: {
    getSchedule: function(params, logs) {
      return -1;
    },
  },
  LIVE: {
    getSchedule: function() {
      return 0;
    },
  },
  INTERVAL: {
    getSchedule: function(params, logs) {
      let
        checkedOn; let lastCheckedOn;


      const interval = params.interval;
      // in sec

      const now = Date.now()/1000 | 0;

      if (_.isUndefined(interval)) {
        return -1;
      }

      if (interval >= C.TIME_INFINITE) {
        return -1;
      }

      checkedOn = _.map(logs, function(log) {
        return new Date(log.ts);
      });

      lastCheckedOn = (_.max(checkedOn) || DATE_0).valueOf()/1000 | 0;

      if (logs.length > 0 && logs[0].err) {
        // Previously there was an error. Reschedule after 120 secs
        const
          errs = _.pluck(logs, 'err');


        const indexNull = _.indexOf(errs, null);
        if (indexNull >= 0) {
          // Additionally perform quick check iff there has been atleast one
          // successful check in the log.
          return lastCheckedOn + Math.min(120, interval);
        }
      }

      return Math.max(now, lastCheckedOn + interval) + 1; // +1 offsets |0
    },
  },

  RANDOM: {
    getSchedule: function(params, logs) {
      let
        checkedOn; let lastCheckedOn;


      const min = params.min;


      const max = params.max;


      const now = Date.now()/1000 | 0;

      if (_.isUndefined(min) || _.isUndefined(max)) {
        return -1;
      }

      if (min >= C.TIME_INFINITE || max >= C.TIME_INFINITE) {
        return -1;
      }

      checkedOn = _.map(logs, function(log) {
        return new Date(log.ts);
      });

      lastCheckedOn = (_.max(checkedOn) || DATE_0).valueOf()/1000 | 0;

      if (logs.length > 0 && logs[0].err) {
        // Previously there was an error. Reschedule after 120 secs
        const
          errs = _.pluck(logs, 'err');


        const indexNull = _.indexOf(errs, null);
        if (indexNull >= 0) {
          // Additionally perform quick check iff there has been atleast one
          // successful check in the log.
          return lastCheckedOn + Math.min(120, max);
        }
      }

      return Math.max(now, lastCheckedOn + (Math.random()*(max-min)+min)) + 1;
    },
  },
};
;
const MSG_INIT = 1;
const MSG_EVENT = 2;
const MSG_REQUEST = 3;
const MSG_RESPONSE = 4;
const MSG_LOG = 5;

/**
 * A wrapper around native port to enable requests and response with any
 * content loaded in browser.
 * A port acts as a messaging channel between content process and background
 * process.
 */
class AbstractPort extends BBEvent {

  constructor(requestHandler) {
    super();
    if(!requestHandler) {
      throw new Error('Missing request handler');
    }
    this.id = ID();
    this._connected = true;
    this._destroyed = false;
    this.requestHandler = requestHandler;
    this.callbacks = {};
    this.onMessage = this.onMessage.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  destroy() {
    if(this._destroyed) {
      return false;
    }
    this._destroyed = true;
    this.trigger('destroy');  // for listeners
    this.off();
    this.stopListening();
    _.each(this.callbacks, (cb, id) => {
      try {
        cb.fn({code: 'EPORTREQ', msg: 'Request to port did not complete.'});
      } catch (e) {
        DBG && console.error(e);
      }
    });
    this.callbacks = null;
    return true;
  }

  async onMessage(msg) {
    // console.log('Port:onMessage:', msg);
    let {callbacks, } = this;

    if (msg.type == MSG_REQUEST) {
      if(this._destroyed) { return; }
      let id = msg._id;
      const input = msg.data;
      const path = msg.path;

      try {
        let data = await this.requestHandler.handleRequest(path, input);
        this.postMessage({ _id: id, type: MSG_RESPONSE,
          data,
        });
      } catch(err) {
        this.postMessage({ _id: id, type: MSG_RESPONSE, err, });
      }
    } else if (msg.type == MSG_RESPONSE) {
      // console.log('<- AbstractPort:response: ', this.id, msg._id, msg);

      let id = msg._id;
      const cb = callbacks[id];
      if(!cb) {
        console.warn('MSG_RESPONSE: missing response callback', msg);  // FIXME got response twice? how?
      } else {
        delete callbacks[id];
        cb.fn(msg.err, msg.data);
      }
    } else if (msg.type == MSG_EVENT) {
      // trigger event for its listeners
      const {type, event} = msg.data;
      // console.log('AbstractPort: event: <- ', this.id, type, event);
      this.trigger(type, event);
    } else {
      DBG && console.error('AbstractPort:Unhandled message: <- ', this.id, msg);
    }
  }

  onDisconnect() {
    this._connected = false;
    // console.log('AbstractPort:onDisconnect:', this.id, this);
    this.destroy();
  }

  postMessage(msg) {
    throw new Error('Not implemented by subclass');
  }

  sendEvent(type, event) {
    // console.log(' AbstractPort: sendEvent: -> ', this.id, type, event);

    this.postMessage({
      data: {event, type},
      type: MSG_EVENT,
    });
  }

  // Send request to content.
  sendRequest(path, data) {
    const _id = ID();
    // console.log('-> AbstractPort: sendRequest:', this.id, path, _id);
    const msg = {
      _id,
      data,
      path,
      type: MSG_REQUEST,
    };

    return new Promise((resolve, reject) => {
      let fn = (err, data) => err ? reject(err) : resolve(data);
      this.callbacks[_id] = { fn, msg, };
      this.postMessage(msg);
    });
  }

}

// A base port interface supporting request/response cycle.
class BasicPort extends AbstractPort {

  constructor(port, requestHandler) {
    super(requestHandler);
    if(!port) {
      throw new Error('Missing port');
    }

    this.port = port;

    port.onMessage.addListener(this.onMessage);
    port.onDisconnect.addListener(this.onDisconnect);
  }

  destroy() {
    if(super.destroy()) {
      // console.log('BasicPort:destroy', new Error().stack);
      let { port} = this;

      port.onMessage.removeListener(this.onMessage);
      port.onDisconnect.removeListener(this.onDisconnect);

      if(this._connected) {
        port.disconnect();
      }

      delete this.port;
    }
  }

  isRoot() {
    return this.port.attrs.root;
    // we used to support loading pages in an iframe but don't do that anymore
    // || (this.attrs.parent && this.attrs.parent.id === 'BG');
  }

  postMessage(msg) {
    if(this._destroyed) {
      console.warn('sending message after port was destroyed', msg);
    } else {
      this.port.postMessage(msg);
    }
  }

}

class LoaderPort extends BasicPort {

  constructor(port, requestHandler, options) {
    super(port, requestHandler, options);
    this.name = port.name;
    this.title = port.attrs.title;
    this.uri = port.attrs.uri;
    this.ready = false;

    port.postMessage({
      type: MSG_INIT,
      mods: [...options.pageMods],
    });

    // init is triggered after init is completed successfully
    this.once('init', (e) => {
      this.title = e.title;
      this.ready = true
    });
  }

}

// a dummy port
class StaticLocaderPort extends AbstractPort {
  constructor(requestHandler, {content, uri}) {
    super(requestHandler);
    this.id = ID();
    this.uri = uri;
    this.content = content;
    this.content.on('message', this.onMessage);
  }

  isRoot() {
    return true;
  }

  postMessage(msg) {
    this.content.postMessage(msg);
  }

}

;
const DEFAULT_LIMIT = 50;

function SimpleStore(name) {
  this.name = name;
}

_.extend(SimpleStore.prototype, Backbone.Events, {
  defaults: {},

  storage: chrome.storage.local,

  __init__: promisifyOrCallback(function(callback) {
    this.storage.get(this.name, (items) => {
      this.data = items[this.name] || {};
      callback && callback();
    });
  }),

  del(key) {
    const value = this.data[key];
    delete this.data[key];
    this.save();
    return value;
  },

  getDefault(key) {
    return this.defaults[key];
  },

  get(key, defaultValue) {
    const value = this.data[key];
    return value !== void 0 ? _.clone(value) :
      (arguments.length > 1 ? defaultValue : this.getDefault(key));
  },

  save() {
    const
      items = {};
    items[this.name] = this.data;
    this.storage.set(items);
  },

  set(key, value) {
    const oldValue = this.data[key];
    if (oldValue !== value) {
      this.data[key] = value;
      this.save();
      this.trigger('change:' + key, value, oldValue, key);
      gEvents.trigger('change:pref:' + key, value, oldValue, key);
    }
  },
});

Prefs = new SimpleStore('prefs');

function execQuery(query, values, options, callback) {
  // console.log('STORE: QUERY:', query, values);
  // console.trace();

  if (_.isFunction(options)) {
    callback = options;
    options = null;
  }

  if (_.isFunction(values)) {
    callback = values;
    options = null;
    values = null;
  }

  options || (options = {});

  const
    isSelect = query.isSelect;

  // TODO zango db api
  query.exec(SQLStore.db, function (err, result) {
    // console.log('RESULT', err, query.selector, result);
    if (err) {
      return callback({
        code: 'query:' + err.code,
        message: err.message,
      });
    }

    // TODO
    if (options.count) {
      callback(null, result.rows[0]);
    } else if (isSelect) {
      callback(null, result.rows);
    } else {
      callback(null/* , _.pick(result, 'length')*/);
    }
  });
}
execQuery = promisifyOrCallback(execQuery);

function openConnection(name, callback) {
  // noop
}
;
function initStores(callback) {
  // Update version when adding or removing tables
  const
    stores = [
      MaintLog, ClientStore, UserStore, SieveStore, TagStore, SieveDataStore,
      ActionStore, RuleStore, AttrStore, ErrorStore, WorkStore, PopupMessageStore,
      KVStore, ClientGroupStore, SieveSnapshotStore, MacroStore,
    ];
  const DB_VERSION = 4;


  const versions = stores.map(function(store) {
    return _.last(store.versions).version;
  });


  const version = _.reduce(versions, function(m, v) {
    return v + m;
  }, 0);


  const dbConfig = stores.reduce(function(memo, store) {
    memo[store.tableName] = store.fieldNames;
    return memo;
  }, {});

  // console.log('dbConfig:', dbConfig);

  const db = SQLStore.db = new zango.Db(name, DB_VERSION, dbConfig);
  db.on('blocked', function() {
    // XXX Should be emit a global event instead signalling fatal error?
    callback(new Error('Database version could not be upgraded'));
    callback = null;
  });

  try {
    MaintLog.findOne({id: 0}, function(err, res) {
      if (err) {
        return callback && callback({
          code: 'EDATABASEOPEN',
          msg: 'Failed to access database; check browser settings',
          err: err,
        });
      }
      Prefs.__init__(function(err) {
        if (!Prefs.get('since')) {
          Prefs.set('since', {
            time: new Date(),
            version: CFG.VERSION,
            nhist: 4,
          });
        }
        callback && callback(err);
      });
    });
  } catch (e) {
    console.error('Failed to open database connection', e);

    callback && callback({
      code: 'EDATABASEOPEN',
      msg: 'Failed to access database; check browser settings',
      err: e,
    });
  }
}

;
Prefs.defaults = {
  'active': true,
  'nworkers': 3,
  'account.sync': false,
  'actions.audio': true,
  'actions.popup': true,
  'actions.popup.autohide': 20,
  'errorAction.minCount': 5,
  'errorAction.enabled': true,
  'errorAction.interval': 15,
  'errorAction.sound': '/skin/media/buzzer.ogg',
  // 'page.embedded': true,
  // 'page.embedded.dock': 'R',
  'sticky-window-timeout': 6,
  'sieve-slot.start': '00:00',
  'sieve-slot.end': '23:59',
  'time-slot-map': {
    '0': {'start': '00:00', 'end': '23:59'},
    '1': {'start': '00:00', 'end': '23:59'},
    '2': {'start': '00:00', 'end': '23:59'},
    '3': {'start': '00:00', 'end': '23:59'},
    '4': {'start': '00:00', 'end': '23:59'},
    '5': {'start': '00:00', 'end': '23:59'},
    '6': {'start': '00:00', 'end': '23:59'},
  },
  'x-frame-load-in': 'tab', // bg, tab, window, sticky_window
};

execQuery = promisifyOrCallback(execQuery);
function SQLStore(options) {
  const self = this;
  const debouncedSyncPost = _.debounce(() => SyncMan.post(this), 120000);

  _.extend(this, {
    primaryKey: 'id',
    tableName: options.name, // alias for statements library
  }, options, {
    fields: _.flatten(_.pluck(options.versions, 'fields')),
  });
  this.fieldIndex = _.indexBy(this.fields, 'name');
  this.fieldNames = _.pluck(this.fields, 'name');

  this.syncable = !!self.sync;


  this.create = create = promisifyOrCallback(create);
  this.destroy = destroy = promisifyOrCallback(destroy);
  this.destroyWithSubQuery = destroyWithSubQuery = promisifyOrCallback(destroyWithSubQuery);
  this.find = find = promisifyOrCallback(find);
  this.findOne = findOne = promisifyOrCallback(findOne);
  this.update = update = promisifyOrCallback(update);
  this.updateLocal = updateLocal;
  this.hasField = hasField;

  SQLStore[this.name] = this;

  function formatFields(doc) {
    const newDoc = _.extend({}, doc);
    _.each(doc, function(value, key) {
      const
        field = self.fieldIndex[key];

      if (key === 'ts' || key.indexOf('ts_') === 0) {
        if (_.isNumber(value)) {
          try {
            // console.log('formatFields: ', value, key)
            newDoc[key] = new Date(value).toISOString();
            // console.log('formatFields: date - ', newDoc[key])
          } catch (e) {
            console.error(e);
          }
        }
      } else if (field && field.type == 'json') {
        if (_.isString(value)) {
          newDoc[key] = JSON.parse(value);
        }
      } else if (field && field.type == 'boolean') {
        newDoc[key] = value ? true : false;
      }
    });
    if (!options.formatFields) {
      return newDoc;
    }
    return options.formatFields(newDoc);
  }

  function deformatFields(doc) {
    // console.log('deformatFields: oldDoc - ', doc)
    const newDoc = _.extend({}, doc);
    _.each(doc, function(value, key) {
      const
        name = key.split('.')[0];


      const field = self.fieldIndex[key];

      if (name === 'ts' || name.indexOf('ts_') === 0) {
        if (_.isString(value)) {
          newDoc[key] = new Date(value).valueOf();
        }
      } else if (field && field.type == 'json') {
        if (_.isObject(value)) {
          newDoc[key] = JSON.stringify(value);
        }
      } else if(field && field.type == 'boolean') {
        newDoc[key] = value ? 1 : 0;
      }
    });
    // console.log('deformatFields: newDoc - ', newDoc)
    return newDoc;
  }

  // $api
  async function create(doc, callback) {
    // console.log('create doc: ', doc);
    const canSync = self.syncable && auth.isLoggedIn();

    _.defaults(doc, {_state: C.LOCAL_STATE_POST}, _.result(self, 'defaults'));

    if (canSync && doc._state !== C.LOCAL_STATE_SYNCED) {
      try {
        const response = await api(self.urls.root, 'POST', doc);
        doc = {...doc, ...response};
        doc._state = C.LOCAL_STATE_SYNCED;
      } catch (err) {
        _.defaults(doc, {id: guid()});
      }
    }
    createLocalDoc(deformatFields(doc), callback);
  }

  function createLocalDoc(doc, callback) {
    _.defaults(doc, {id: guid()});

    const
      id = doc.id;


    const outValues = [];


    const sql = Statements.insert(self, doc, outValues);

    callback || (callback = function() {});
    execQuery(sql, outValues, function(err, doc) {
      if (err) {
        callback(err);
      } else {
        findOne(id, function(err, doc) {
          callback(err, formatFields(doc));
          !err && doc && gEvents.trigger('store:'+self.name+':create', doc);
        });
      }
    });
  }

  // $api
  function destroy(query, callback) {
    query || (query = {});
    if (_.isString(query)) query = {id: query};
    query = deformatFields(query);

    callback || (callback = function() {});

    async.series({
      list: function(callback) {
        find(query, {only: ['id']}, callback);
      },
      destroys: function(callback) {
        const
          outValues = [];


        const sql = Statements.destroy(self, query, outValues);

        execQuery(sql, outValues, callback);
      },
    }, function(err, result) {
      callback(err, result.destroys);

      if (!err && result.list.count > 0) {
        result.list.data.forEach(function(row) {
          // console.log('Destroying ', row)
          gEvents.trigger('store:'+self.name+':destroy', row);
        });
      }
    });
  }

  // Need a special function to delete fields using a select from the same
  // table that requires LIMIT and OFFSET.
  // XXX Why not make it the default destroy implementation?
  function destroyWithSubQuery(query, options, callback) {
    options || (options = {});
    query = deformatFields(query);

    let ids;

    _.extend(options, {
      only: ['id'], // XXX Assuming that in our case, all tables have id.
    });

    async.waterfall([
      function(callback) {
        const
          outValues = [];


        const subQuery = Statements.select(self, query, options, outValues);

        execQuery(subQuery, outValues, options, callback);
      },
      function(rows, callback) {
        ids = _.pluck(rows, 'id');

        const
          outValues = [];


        const destroyQuery = Statements.destroy(self, {
          'id.in': ids,
        }, outValues);

        execQuery(destroyQuery, outValues, callback);
      },
    ], function(err, result) {
      callback(err, result);

      if (!err) {
        _.each(ids, function(id) {
          gEvents.trigger('store:'+self.name+':destroy', {id: id});
        });
      }
    });
  }

  // $api
  function find(query, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    query || (query = {});
    query = deformatFields(query);
    options || (options = {});
    callback || (callback = function() {});

    _.defaults(options, {
      limit: DEFAULT_LIMIT,
      offset: 0,
      order: ['-ts'],
    });

    async.parallel({
      data: function(callback) {
        const
          outValues = [];


        const sql = Statements.select(self, query, options, outValues);

        execQuery(sql, outValues, options, callback);
      },
      total_count: function(callback) {
        const
          outValues = [];


        const countOptions = {count: 1};


        const sql = Statements.select(self, query, countOptions, outValues);

        execQuery(sql, outValues, countOptions, callback);
      },
    }, function(err, result) {
      if (err) {
        DBG && console.error('ERR:STORE:', err);
        callback(err);
      } else {
        result.data = _.map(result.data, formatFields);
        result.count = result.data.length;
        result.offset = options.offset;
        result.total_count = result.total_count.count;
        // DBG && console.log('STORE:FIND:result', result);

        callback(null, result);
      }
    });
  }

  function findOne(query, options, callback) {
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    query || (query = {});
    if (_.isString(query)) query = {id: query};
    query = deformatFields(query);

    options || (options = {});
    callback || (callback = function() {});

    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }

    _.extend(options, {
      limit: 1,
    });

    const
      outValues = [];


    const sql = Statements.select(self, query, options, outValues);

    execQuery(sql, outValues, options, function(err, result) {
      callback(err, (result && result.length > 0) ? formatFields(result[0]) : null);
    });
  }

  function hasField(name) {
    return self.fieldNames.indexOf(name) >= 0;
  }

  async function update(query, doc, callback) {
    // console.log(self.name, '--UPDATE--', {...doc});

    const canSync = self.syncable && auth.isLoggedIn();
    // (self.name=='sieves') && console.trace();
    callback || (callback = function() {});

    query || (query = {});
    if (_.isString(query)) query = {id: query};
    query = deformatFields(query);

    // console.log('STORE: UPDATE:', self.name, query, doc);
    try {
      if (doc._state === -1) {
        // If state is default, only store locally, do nothing else
        delete doc._state;
      } else if (_.isUndefined(doc._state)) {
        doc._state = C.LOCAL_STATE_PUT;
      }
      // console.log(doc)
      const oldLocalRes = await find(query, {
        limit: 10000,
      });
      await updateLocalDocsAfterSync(doc, oldLocalRes);

      // Handle post case -> Call syncman post after delay
      // return doc when one is trying to patch one document
      callback(null, query.id ? {
        id: query.id,
        ts_mod: Date.now(),
        _count: oldLocalRes.count,
      } : oldLocalRes.count);
      canSync && debouncedSyncPost();
      oldLocalRes.data.forEach(function(row) {
        // console.log(_.extend(row, doc))
        gEvents.trigger('store:'+self.name+':update', _.extend(row, doc));
      });
    } catch (e) {
      console.error('Error updating store:', self.name, e);
      callback(e);
    }
  }

  async function updateLocalDocsAfterSync(doc, oldRes) {
    // if _state or ts_mod is set to -1; they should not be updated
    const setTsMod = doc.ts_mod !== -1;
    const tsMod = (new Date()).toISOString();
    const canSync = self.syncable && auth.isLoggedIn();
    for (const i in oldRes.data) {
      let methodName = 'PUT';
      const oldDoc = oldRes.data[i];
      let newDoc = {};
      try {
        // In sync, change only diff, and in case of put apply doc over oldDoc and put
        if (oldDoc._state == C.LOCAL_STATE_SYNCED) {
          for (const key in doc) {
            if (oldDoc[key] !== doc[key]) {
              newDoc[key] = doc[key];
            }
          }
        } else {
          newDoc = {...oldDoc, ...doc};
          if (oldDoc._state == C.LOCAL_STATE_POST && newDoc._state != C.LOCAL_STATE_SYNCED) {
            methodName = 'POST';
          }
        }

        delete newDoc._state;
        if (!setTsMod) {
          delete newDoc.ts_mod;
        }
        const isEmpty = _.isEmpty(newDoc);

        if (!isEmpty && setTsMod && _.isUndefined(newDoc.ts_mod)) {
          newDoc.ts_mod = tsMod;
        }

        if (doc._state == C.LOCAL_STATE_SYNCED) {
          newDoc._state = doc._state;
        } else if (canSync && !isEmpty
        // shouldn't if doc was synced from remote
        // doc._state must be used for this check
        // doc._state != C.LOCAL_STATE_SYNCED -- done in prev if check
        ) {
          const urlTpl = methodName=='POST' ? self.urls.root : self.urls.id;
          const url = Mustache.render(urlTpl, oldDoc);
          const response = await api(url, methodName, newDoc);
          _.extend(newDoc, response);
          newDoc._state = C.LOCAL_STATE_SYNCED;
        } else if (isEmpty) {
          // This is fine, we diff only when old doc is synced
          newDoc._state = C.LOCAL_STATE_SYNCED;
          // } else if(doc._state == -1) { -- it is deleted by caller
          // No need to update _state
        } else if (doc._state != void 0) { // synced is handled in 1st if block
          // Mark default dirty _state based on what was older _state
          newDoc._state = oldDoc._state == C.LOCAL_STATE_POST ? oldDoc._state : doc._state;
        }
      } catch (err) {
        console.error('syncAndUpdateLocal:', err);
        newDoc._state = doc._state != null ? doc._state :
          (oldDoc._state != null ? oldDoc._state : C.LOCAL_STATE_POST);
      }
      await updateLocal(oldDoc.id, newDoc);
    }
  }

  async function updateLocal(query, doc) {
    // console.log('updateLocal', self.name, id, doc)
    if (_.isString(query)) {
      query = {id: query};
    }
    const
      outValues = [];


    const sql = Statements.update(self, query, deformatFields(doc), outValues);
    return await execQuery(sql, outValues);
  }
}


window.MaintLog = new SQLStore({
  name: 'maint_logs',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'name', type: 'string'},
      {name: 'version', type: 'integer'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
    ],
  }],
});

window.ClientStore = new SQLStore({
  name: 'clients',
  urls: {
    root: '/clients',
    id: '/clients/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      // Comment out altered fields. Original name is preserved in new field
      // definition
      /* { name: 'id',           type: 'string', primaryKey: 1 }, */
      {name: 'user_id', type: 'string'},
      {name: 'type', type: 'integer'},
      {name: 'name', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'info', type: 'string'},
    ],
  }, {
    version: 3,
    fields: [],
  }, {
    version: 4,
    fields: [
      // Altered field with oldName attribute. Keep altered fields as last
      // fields in the list.
      {name: 'id', type: 'string', oldName: 'id'},
    ],
  }, {
    version: 5,
    fields: [
      // Altered field with oldName attribute. Keep altered fields as last
      // fields in the list.
      {name: 'version', type: 'string'},
      {name: 'messages_state', type: 'json', default: '"{}"'},
      {name: 'is_worker', type: 'boolean', default: true}
    ]}
  ],
  // These are custom extensions to column defs
  unique: ['id', 'user_id'],
  extension: ', UNIQUE (id, user_id) ON CONFLICT REPLACE',
});

window.UserStore = new SQLStore({
  name: 'users',
  urls: {
    root: '/users',
    id: '/users',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'name', type: 'string'},
      {name: 'full_name', type: 'string'},
      {name: 'bio', type: 'string'},
      {name: 'email', type: 'string'},
      {name: 'website', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'locale', type: 'string'},
    ],
  }, {
    version: 3,
    fields: [
      {name: 'prefs', type: 'json'},
    ],
  }, {
    version: 4,
    fields: [
      {name: 'account_id', type: 'string'},
      {name: 'role', type: 'string'},
    ],
  }, {
    version: 5,
    fields: [
      {name: 'billing_address', type: 'json'},
    ],
  }],
});
window.ClientGroupStore = new SQLStore({
  name: 'users_clients_groups',
  urls: {
    root: '/clients-groups',
    // id: '/clients-groups/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'cgid', type: 'string'},
      {name: 'user_id', type: 'string'},
      {name: 'client_id', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }],
});
window.SieveStore = new SQLStore({
  name: 'sieves',
  urls: {
    root: '/sieves',
    id: '/sieves/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'uri', type: 'string'},
      {name: 'rule_id', type: 'string'},
      {name: 'content_type', type: 'integer'},
      {name: 'config', type: 'string'},
      {name: 'schedule', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_READY},
      {name: 'text', type: 'string'},
      {name: 'tags', type: 'string'}, // de-normalized tag data
      // Timestamp when sievedata changed.
      {name: 'ts_data', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      // When it was last viewed by user
      {name: 'ts_view', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'client_id', type: 'string'},
    ],
  }, {
    version: 3,
    fields: [
      {name: 'err', type: 'string'},
    ],
  }, {
    version: 4,
    fields: [
      {name: 'session_id', type: 'string'},
      {name: 'proxy_id', type: 'string'},
      {name: 'meta', type: 'json'},
      {name: 'ext', type: 'json'},
    ],
  }, {
    version: 5,
    fields: [
      {name: 'macro_id', type: 'string'},
    ],
  }, {
    version: 6,
    fields: [
      {name: 'datasource_id', type: 'string'},
    ],
  }, {
    version: 7,
    fields: [
      {name: 'crawler_id', type: 'string'},
    ],
  },],
  defaults: function() {
    return {
      client_id: Prefs.get('client.id'),
      user_id: auth.getId(),
    };
  },
});

window.TagStore = new SQLStore({
  name: 'tags',
  urls: {
    root: '/tags',
    id: '/tags/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'name', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'user_id', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
    ],
  }],
  defaults: function() {
    return {
      user_id: auth.getId(),
      state: 0,
    };
  },
});

window.SieveDataStore = new SQLStore({
  name: 'sieve_data',
  urls: {
    root: '/sieves/-/data',
    id: '/sieves/{{sieve_id}}/data/{{id}}',
  },
  sync: {
    push: true,
    pull: false,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'sieve_id', type: 'string'},
      {name: 'data_type', type: 'integer'},
      {name: 'data', type: 'string'},
      {name: 'text', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
    ],
  }, {
    version: 3,
      fields: [
        { name: 'client_id', type: 'string' },
        { name: 'meta', type: 'json', default:'"{}"'},
        { name: 'triggered', type: 'boolean', default: false }
      ],
    }],
  // Override meta.rules to meta.rule
  // https://github.com/distill-io/distill.io/issues/1493
  formatFields: function (doc) {
    if (!doc.meta) {
      return doc;
    }
    if (doc.meta?.rules) {
      doc.meta.rule = doc.meta.rules;
    }
    return doc;
  }
});

window.SieveDataProxy = _.extend({}, SieveDataStore, {
  find: promisifyOrCallback(async function(query, options, callback) {
    options || (options = {})
    const sieveId = query.sieve_id;
    const offset = options.offset || 0;
    // If sieve_id
    // console.log('SieveDataProxy:', sieveId);
    if (sieveId && offset == 0) {
      const sieve = await SieveStore.findOne({id: sieveId});

      // Find last sieve data for sieve_id
      const sieveData = await SieveDataStore.findOne({
        sieve_id: sieveId,
      }, {
        order: ['-ts'],
      });
      // console.log(sieve, sieveData);

      // Check if out of sync
      // If yes, sync sieve data for sieveId
      if ((!sieveData || (sieveData.ts !== sieve.ts_data)) && (auth.isLoggedIn())) {
        // console.log('Hitting get');
        try {
          await SyncMan.get(SieveDataStore, {
            query: {
              sieve_id: sieveId,
            },
          });
        } catch (e) {
          // Ignore network error
          if (sieve.client_id != SyncId.get()) {
            return callback(e);
          }
        }
      }
    }
    SieveDataStore.find(query, options, callback);
  }),
});

// SieveDataProxy = SieveDataStore;

window.ActionStore = new SQLStore({
  name: 'actions',
  urls: {
    root: '/sieves/-/actions',
    id: '/sieves/{{sieve_id}}/actions/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'sieve_id', type: 'string'},
      {name: 'type', type: 'integer'},
      {name: 'config', type: 'string'},
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'user_id', type: 'string'},
    ],
  }],
  defaults: function() {
    return {
      state: 0,
      user_id: auth.getId(),
    };
  },
});

window.RuleStore = new SQLStore({
  name: 'rules',
  urls: {
    root: '/rules',
    id: '/rules/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'config', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'state', type: 'integer', default: C.STATE_DEFAULT},
    ],
  }, {
    version: 3,
    fields: [
      {name: 'version', type: 'string'},
    ],
  }],
  defaults: function() {
    return {
      user_id: auth.getId(),
    };
  },
});

window.AttrStore = new SQLStore({
  name: 'attrs',
  urls: {
    root: '/users/attrs',
    id: '/users/attrs/{{id}}',
  },
  sync: {
    push: true,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'value', type: 'string'},
      {name: 'state', type: 'integer'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }],
  defaults: function() {
    return {
      user_id: auth.getId(),
    };
  },
});

// Stores errors related to activities that should be reviewed manually.
window.ErrorStore = new SQLStore({
  name: 'errors',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      // Context name describes the context in which this error occurred.
      {name: 'context', type: 'string'},
      // Human readable error message (template?).
      {name: 'msg', type: 'string'},
      // Contextual data when this error happened.
      {name: 'data', type: 'string'},
      // Actual error message received.
      {name: 'err', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }],
});

window.WorkStore = new SQLStore({
  name: 'works',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'rel', type: 'string'},
      {name: 'key', type: 'string'},
      {name: 'err', type: 'string'},
      {name: 'data', type: 'string'},
      {name: 'duration', type: 'integer'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'snapshot_id', type: 'string'},
    ],
  }],
});

window.PopupMessageStore = new SQLStore({
  name: 'popup_messages',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'rel', type: 'string'},
      {name: 'key', type: 'string'},
      {name: 'uri', type: 'string'},
      {name: 'title', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  }, {
    version: 2,
    fields: [
      {name: 'msg', type: 'string'},
    ],
  }],
});

window.KVStore = new SQLStore({
  name: 'kv',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'value', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
    ],
  }],
});

window.SieveSnapshotStore = new SQLStore({
  name: 'sieve_snapshots',
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'sieve_id', type: 'string'},
      {name: 'work_id', type: 'string'},
      {name: 'uri', type: 'string'},
      {name: 'content', type: 'string'},
      {name: 'content_type', type: 'string'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
    ],
  }],
});

window.MacroStore = new SQLStore({
  name: 'macros',
  urls: {
    root: '/macros',
    id: '/macros/{{id}}',
  },
  sync: {
    push: false,
    pull: true,
  },
  versions: [{
    version: 1,
    fields: [
      {name: 'id', type: 'string', primaryKey: 1},
      {name: 'user_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'spec', type: 'json'},
      {name: 'steps', type: 'json'},
      {name: 'state', type: 'integer'},
      {name: 'ts', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: 'meta', type: 'json'},
      {name: 'ts_mod', type: 'integer', default: '(strftime(\'%s\', \'now\')*1000.0)'},
      {name: '_state', type: 'integer', default: C.LOCAL_STATE_SYNCED},
    ],
  },
  {
    version: 2,
    fields: [
      {name: 'version', type: 'integer'}
    ]
  }],
});

window.REMOTE_LOCAL_NAME_MAP = {
  'clients': 'clients',
  'sieves': 'sieves',
  'sieve_actions': 'actions',
  'sieve_data': 'sieve_data',
  'sieve_rules': 'rules',
  'user_attrs': 'attrs',
  'tags': 'tags',
  'users': 'users',
  'users_clients_groups' : 'users_clients_groups',
  'macros' : 'macros'
};
;
const TIMEOUT_LOAD = 30000;

/**
 * List of public APIs and events.
 *
 * APIs:
 *  - id
 *  - ports
 *  - uri
 *  - destroy
 *  - getPortIndex
 *  - load
 *  - request
 *
 * Events:
 *  - reset
 *  - port:init
 *  - port:<port_events>
 */
class WebpageLoader extends BBEvent {

  static ID = 1;
  static INSTANCES = [];

  static get(id) {
    return _.detect(WebpageLoader.INSTANCES, function(loader) {
      return loader.id == id;
    });
  }

  constructor(options) {
    super();
    this.options = options;
    this.pageMods = options.pageMods || [];
    this.ports = [];
    this.id = WebpageLoader.ID++;
    this.rootPort = null;
    this.uri = null;
    // if closeTabOnDestroy not passed, close only if tab has been created by us i.e. tabId is not present on info
    this.options.closeTabOnDestroy = this.options.closeTabOnDestroy ?? (options.info.tabId ? false : true);

    WebpageLoader.INSTANCES.push(this);
  }

  addPort(chromePort) {
    // const attrs = chromePort.attrs;
    // attrs.root && console.log('EXTN:loaderAttachPort:', attrs);
    let port = this.createPort(chromePort);

    // console.log("addPort: ", port);
    port.on('destroy', e => this.onPortDestroy(port), this);

    this.addPortEvents(port);
    // Add port to the list of ports
    if (port.isRoot()) { // Is a root port.
      // console.log('LOADER: root port set.', port.uri, this.id);
      this.rootPort = port;
      // XXX A hack to set root port with index 1. This can lead to errors if
      // clients are using ports and index before root port is added to loader.
      this.ports.unshift(port);
      this.uri = port.uri;
      this.trigger('reset');
    } else {
      this.ports.push(port);
    }
  }

  createPort(chromePort) {
    return new LoaderPort(chromePort, this, {
      pageMods: this.pageMods,
    });
  }

  addPortEvents(aPort) {
    aPort.on('all', (eventName, event) => {
      // console.log('on port event:', eventName, event);
      if(aPort == this.rootPort) {
        // sent root events in a special name to make listening easy
        const newType = 'port:root:' + eventName;
        this.trigger(newType, _.extend({}, event, {
          portId: aPort.id,
          type: newType,
        }), aPort);
      }
      const newType = 'port:' + eventName;
      this.trigger(newType, _.extend({}, event, {
        portId: aPort.id,
        type: newType,
      }), aPort);
    });
  }

  // Sub-classes create frames to load documents, either in an iframe or in a
  // tab.
  async createView(callback) {
    throw new Error('Not implemented');
  }

  async destroy() {
    // console.log("destroy: ");

    if (this.destroyed) return; // nothing to do if already destroyed.
    this.destroyed = true;

    [...this.ports].forEach(port => port.destroy());

    WebpageLoader.INSTANCES.splice(WebpageLoader.INSTANCES.indexOf(this), 1);
    this.trigger('destroy');

    this.off();
    this.stopListening();

    this.rootPort = null;

    // XXX await?
    this.destroy2 && await this.destroy2();
  }

  findPorts(portSelector) {
    let filter = function() {
      return false;
    };

    if (portSelector == '<root>') {
      return [this.rootPort];
    } else if (_.isNumber(portSelector)) {
      filter = function(port, index) {
        return index === portSelector;
      };
    } else if (portSelector.href) {
      if (typeof portSelector.href == 'object') {
        const regex = new RegExp(portSelector.href.pattern,
          portSelector.href.flags || 'i');
        filter = function(port) {
          return regex.test(port.data.href);
        };
      } else { // a string
        filter = function(port) {
          return port.data.href == portSelector.href;
        };
      }
    }
    // XXX support more ways of finding ports
    return _.filter(this.ports, filter);
  }

  getPortIndex(portId) {
    for (let i = 0; i < this.ports.length; i += 1) {
      if (this.ports[i].id == portId) {
        return i;
      }
    }
    return -1;
  }

  handleRequest() {
    throw new Error('not supported');
  }

  load(url, options={}) {
    // TODO support frameIndices as an option so that load waits for all
    // frames to load

    return new Promise((resolve, reject) => {
      let timeoutId;
      let timeout = options.timeout || TIMEOUT_LOAD;

      let off = () => {
        this.off('port:root:init');
        this.off('port:root:init:error');
        clearTimeout(timeoutId);
      }

      const onRootPortInit = (event, aPort) => {
        off();
        resolve();
      }

      const onRootPortInitError = (event, aPort) => {
        off();
        reject(new Err.PAGE_LOAD({ message: event.message }));
      }

      timeoutId = setTimeout(() => {
        off();
        reject(new Err.TIMEOUT({ type: 'Page load', time: timeout/1000 }));
      }, timeout);

      this.on('port:root:init', onRootPortInit);
      this.on('port:root:init:error', onRootPortInitError);

      this.setURL(url);
    });
  }

  onPortDestroy(aPort) {
    // console.log('LOADER:onPortDestroy:', aPort);

    if (aPort == this.rootPort) {
      this.rootPort = null;
      this.trigger('port:root:destroy', aPort, this);
    }
    const index = this.ports.indexOf(aPort);
    this.ports.splice(index, 1);
    this.trigger('port:destroy', aPort, this);
  }

  async request(portSelector, {path, data}) {
    // console.log('EXTN:loader:request:', portSelector, {path, data});
    const matchingPorts = this.findPorts(portSelector);

    if (matchingPorts.length == 0) {
      throw new Err.NOT_FOUND({
        type: 'port',
        param: 'selector',
        id: JSON.stringify(portSelector),
        data: portSelector,
        loader: this.id,
      });
    }
    return await matchingPorts[0].sendRequest(path, data);
  }

  setURL(url) {
    throw new Error('setURL not implemented by WebpageLoader subclass:',
      this.constructor);
  }

}


class TabLoader extends WebpageLoader {

  tabId = null;

  async createView() {
    let info = this.options.info = {
      pinned: true,
      active: false,
      ...this.options.info
    };
    let tab;

    if (info.tabId) {
      tab = await this._attachToTab(info.tabId);
    } else {
      tab = await this._createTab(info);
    }
    this.tabId = tab.id;
  }

  async _attachToTab(id) {
    return new Promise((resolve, reject) => {
      chrome.tabs.get(id, async (tab) => {
        if (!tab) {
          return reject(
            new Err.NOT_FOUND({ type: 'tab', id })
          );
        }
        // If the loader is being attached to an existing tab, load port script.
        await chrome.tabs.executeScript(id, {
          allFrames: true,
          file: './content/port-loader.js',
          runAt: 'document_start',
        });
        resolve(tab);
      });
    });
  }

  async _createTab(info) {
    // create tab in current window
    info = _.pick(info, 'active', 'index', 'pinned', 'url', 'windowOptions');
    info.url || (info.url = CFG.URL.BLANK);

    let tabs = await chrome.tabs.queryAsync({
      active: true,
      currentWindow: true,
    });

    if (info.after == 'activeTab') {
      // XXX chrome recently started sending no active tab when active is
      // being changed or being dragged
      const activeTab = tabs.length > 0 ? tabs[0] : -1;
      info.index = activeTab.index + 1;
    }

    return await chrome.tabs.createAsync(info);
  }

  async destroy2() {
    // Remove tab if we created it. do not remove if we didnt create it.
    if (this.options.closeTabOnDestroy && this.tabId) {
      try {
        const id = this.tabId;
        chrome.tabs.remove(id, () => {
          // A delayed call to remove pinned tab for Opera/some browsers
          // since pinned tabs may not be closed.
          setTimeout(function() {
            chrome.tabs.get(id, function(tab) {
              // Previously we checked for chrome.runtime.lastError
              // for tab not found error, which is not present in electron
              if(tab) {
                chrome.tabs.update(id, {pinned: false}, function() {
                  chrome.tabs.remove(id);
                });
              }
            });
          }, 500);
          removePinnedURL(this._tabURL);
        });
      } catch (e) {
        console.error('Error removing tab', e);
      }
    } else {
      // console.log('tabId not set - not removed');
    }
  }

  setURL(url) {
    // FIXME what if the page was redirected to a different URL?
    this._tabURL = url;
    chrome.tabs.update(this.tabId, {
      url,
    });

    // Store tab's URL into a persistent storage in order to clean that up
    if (this.options.info.pinned) {
      savePinnedURL(url);
    }
  }
}

class WindowLoader extends TabLoader {

  async createView() {
    let info = _.pick(this.options.info, 'url', 'tabId', 'left', 'top',
      'width', 'height', 'focused', 'type', 'state');

    info = _.defaults(info, {
      url: CFG.URL.BLANK,
    });

    let window = await chrome.windows.createAsync(info);
    this.tabId = window.tabs[0].id;
  }

  async destroy2() {
    // Remove tab if we created it. do not remove if we didnt create it.
    if (!this.options.tabId && this.tabId) {
      try {
        const id = this.tabId;
        chrome.tabs.remove(id, function() {
          // A delayed call to remove pinned tab for Opera since pinned tabs
          // cant be closed in Opera. This is unnecessary for Chrome.
          setTimeout(function() {
            chrome.tabs.update(id, {pinned: false}, function() {
              chrome.tabs.remove(id);
            });
          }, 200);
        });
      } catch (e) {/* ignore, tab removed*/}
      removePinnedURL(this._tabURL);
    }
  }

}

class StickyWindowLoader extends TabLoader {

  static STICKY_WINDOW = null;

  async createView() {
    let info = _.pick(this.options.info, 'url', 'tabId', 'left', 'top',
      'width', 'height', 'focused', 'type', 'state');

    info = _.defaults(info, {
      url: Session.stickyWindowURL,
      state: 'minimized',
    });

    const tabInfo = this.options.info;
    const session = Session.getInstance();

    this.options.tabInfo = _.defaults(tabInfo, {
      pinned: true,
      active: false,
    });

    if (StickyWindowLoader.STICKY_WINDOW) {
      session.trackStickyWindow(StickyWindowLoader.STICKY_WINDOW);
    } else {
      let _window = await chrome.windows.createAsync(info);
      // XXX There is a race condition where we can create duplicate sticky
      // windows. We should only create one at a time and second call should
      // wait for the first call to complete.
      // For now, it is a quick and dirty fix.
      if (StickyWindowLoader.STICKY_WINDOW) {
        // remove this newly created window, we already have one to use
        chrome.windows.remove(_window.id);
      } else {
        StickyWindowLoader.STICKY_WINDOW = _window.id;
        session.trackStickyWindow(StickyWindowLoader.STICKY_WINDOW);
        _window.distill = true;
        session.addWindow(_window);
      }
    }

    tabInfo.windowId = StickyWindowLoader.STICKY_WINDOW;
    const tab = await chrome.tabs.createAsync(tabInfo);
    this.tabId = tab.id;
    tab.distill = true;
    session.addTab(tab);
  }
}

function savePinnedURL(url) {
  const urls = Prefs.get('tabs.pinned.urls', []);
  if (urls.indexOf(url) < 0) {
    urls.push(url);
  }
  Prefs.set('tabs.pinned.urls', urls);
}

function removePinnedURL(url) {
  const urls = Prefs.get('tabs.pinned.urls', []);
  const index = urls.indexOf(url);

  if (index >= 0) {
    urls.splice(index, 1);
  }
  Prefs.set('tabs.pinned.urls', urls);
}

// FIXME unused?
function removePinnedTabs(url) {
  const urls = Prefs.get('tabs.pinned.urls', []);
  _.each(urls, function(url) {
    chrome.tabs.query({
      pinned: true,
      url, // FIXME Its a URL pattern
    }, function(tabs) {
      if (tabs && tabs.length > 0) {
        chrome.tabs.remove(_.pluck(tabs, 'id'));
      }
    });
  });
  Prefs.set('tabs.pinned.urls', []);
}

/**
 * @returns {WebpageLoader}
 */
async function createLoader({type, dynamic, ...options}) {
  let loader;
  if (type === 'bg' || dynamic === false) {
    loader = new StaticLoader(options);
  } else if (type === 'tab') {
    loader = new TabLoader(options);
  } else if (type === 'window') {
    loader = new WindowLoader(options);
  } else if (type === 'sticky_window') {
    loader = new StickyWindowLoader(options);
  } else if (type === 'offscreen_window') {
    loader = new OffscreenWindowLoader(options);
  } else {
    throw new Err.TYPE_UNKNOWN({
      type: 'Page loader',
      value: type
    });
  }

  await loader.createView();
  return loader;
}

function loaderAttachPort(port) {
  const tab = port.sender.tab;
  const loader = _.findWhere(WebpageLoader.INSTANCES, {tabId: tab.id});

  loader && loader.addPort(port);
  return !!loader;
}

chrome.tabs.onReplaced.addListener(function(added, removed) {
  // console.log('EXTN: tabs.onReplaced:', added, removed);
  _.each(WebpageLoader.INSTANCES, function(loader) {
    if (loader.tabId === removed) {
      loader.tabId = added;
    }
  });
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  // console.log('EXTN: tabs.onRemoved:', tabId, removeInfo);

  const loaders = _.where(WebpageLoader.INSTANCES, {tabId: tabId});
  loaders.forEach(function(loader) {
    loader.destroy();
  });
});

chrome.windows.onRemoved.addListener(function(windowId) {
  if (windowId == StickyWindowLoader.STICKY_WINDOW) {
    delete StickyWindowLoader.STICKY_WINDOW;
  }
  chrome.windows.getAll({}, async (windows) => {
    // windows can sometimes be undefined - bug?
    windows || (windows = []);
    const ids = windows.map(item => item.id);
    if (ids.length == 1 && ids[0] == StickyWindowLoader.STICKY_WINDOW) {
      // Get tabs for distill window
      const session = Session.getInstance();
      const tabs = await Session.fetchTabs(StickyWindowLoader.STICKY_WINDOW);
      for (const tab of tabs) {
        if (tab.url != Session.stickyWindowURL) {
          await chrome.tabs.remove(tab.id);
        }
      }
      chrome.windows.remove(StickyWindowLoader.STICKY_WINDOW);
    }
  });
});

gEvents.on('destroy:sticky_window', function() {
  if (StickyWindowLoader.STICKY_WINDOW) {
    chrome.windows.remove(StickyWindowLoader.STICKY_WINDOW);
    delete StickyWindowLoader.STICKY_WINDOW;
  }
});

gEvents.on('init', async () => {
  if (CFG.CLIENT.TYPE == C.CLIENT_FFWX) {
    Session.stickyWindowURL = CFG.URL.STICKY;
  } else {
    const responseText = await fetchLocalFileText(CFG.URL.STICKY);
    Session.stickyWindowURL = 'data:text/html,'+responseText.replace(/\n/g, '');
  }
  Session.prefs = new SimpleStore('session_prefs');
  Session.prefs.__init__(Session.restoreTabs);
});

Prefs.on('change:x-frame-load-in', (value, oldValue, key) => {
  if (oldValue == 'sticky_window' && value != 'sticky_window') {
    Session.destroy();
  }
});

gEvents.on('beforereload', () => {
  if (StickyWindowLoader.STICKY_WINDOW) {
    chrome.windows.remove(StickyWindowLoader.STICKY_WINDOW);
  }
});
;
// 1. Load URL content
// 2. Parse into DOM
// 3. Sanitize it
// 4. Load into iframe
// 5. Load content scripts
// 6. Create port
// 7. And start operations
class StaticContent extends BBEvent {
  height = 800;
  width = 1100;

  constructor({pageMods}) {
    super();
    this.pageMods = pageMods;
    this.iframe = this.createIFrame();
    this.doc = this.iframe.contentDocument;
    this.win = this.iframe.contentWindow;

    this.loading = {};

    this.destroy = this.destroy.bind(this);
    this.loadScript = this.loadScript.bind(this);

    this.win.loadScript = this.loadScript;
    this.win.sendMsgFromContentToPort = (msg) => this.trigger('message', msg);
  }

  createIFrame() {
    const iframe = document.createElement('iframe');
    iframe.src = 'about:blank';
    iframe.width = this.width;
    iframe.height = this.height;
    document.body.appendChild(iframe);
    return iframe;
  }

  async init() {
    let base = chrome.runtime.getURL('');
    await this.loadScript(`${base}ui/lib/underscore.js`);
    await this.loadScript(`${base}content/content.js`);

    await this.win.require(this.pageMods, () => {});
  }

  destroy() {
    this.iframe.remove();
    this.win = this.doc = this.iframe = null;
  }

  async load(url) {
    this.url = url;
    let html;
    try {
      let res = await this.fetch(url);
      html = await this.parseOrFetchWithCharset(res, url);
    } catch(e) {
      // not logging fetch errors - they are beyond our control and can be many
      if(e.response != null) {  // http request error
        html = e.response ? e.response : e.status;
      } else {
        html = `<b style="color:#F00">Failed to download page: ${e.message}<b>`;
      }
    }

    let win = this.iframe.contentWindow;
    let doc = win.document;
    win.URL_BASE = chrome.extension.getURL('');
    await this.setHTML(html);
    if(doc.querySelector('base') == null) {
      let base = doc.createElement('base');
      base.href = url;
      win.document.head.appendChild(base);
    }
  }

  loadScript(path) {
    return this.loading[path] || (this.loading[path] = new Promise(resolve => {
      // console.log('loadScript', path);
      let doc = this.iframe.contentDocument;
      const el = doc.createElement('script');
      el.src = path;
      doc.head.appendChild(el);
      el.addEventListener('load', resolve);
      setTimeout(() => el.removeEventListener('load', resolve), 10000);
    }));
  }

  postMessage(msg) {
    // defined by content script
    this.win.onMsgFromPortToContent(msg);
  }

  async parseOrFetchWithCharset(html, url) {
    // http://www.cpta.com.cn/GB/index.html
    // <meta http-equiv="content-type" content="text/html;charset=GB2312"/>
    let matches = html.match(/<meta.*?charset=['"](.*?)['"].*>/im);
    if(matches) {
      let charset = matches[1];
      if(charset && charset.toLowerCase() != 'utf-8') {
        // we refetch to help browser parse response correctly
        try {
          return await this.fetchWithCharset(url, charset);
        } catch(e) {
          // console.error('Error fetching with mime type override', e);
        }
      }
    }
    return html;
  }

  fetch(url) {
    return new Promise((resolve, reject) => {
      HTTP.get({ url, }, (err, xhrObj) => {
        err ? reject(err) : resolve(xhrObj.response);
      })
    });
  }

  fetchWithCharset(url, charset) {
    return new Promise((resolve, reject) => {
      HTTP.get({
        url,
        overrideMimeType: `text/html;charset=${charset}`,
      }, (err, xhrObj) => {
        err ? reject(err) : resolve(xhrObj.response);
      })
    });
  }

  async setHTML(html) {
    this.iframe.contentDocument.documentElement.innerHTML = await DOMUtils.Feed.sanitize(html);
  }

}

// Loads content locally
class StaticLoader extends WebpageLoader {

  createPort() {
    return new StaticLocaderPort(this, {
      content: this.content,
      uri: this.url,
    });
  }

  async createView() {
    this.content = new StaticContent({
      pageMods: this.pageMods,
    });
  }

  async destroy2() {
    this.content.destroy();
  }

  async load(url) {
    await this.content.load(url);
    this.addPort(); // calls createPort (by super)
    await this.content.init();
  }
};
class Session {

  constructor() {
    if(Session.instance) {
      throw new Error('Session is singleton.');
    }
    this.windows = {};
    this.tabs = {};
    this.listeners = {chrome: [], intervals: []};
    this.eventLog = Session.prefs.get('eventLog', []);
    this.restored = false;
    this.stickyWindowActivity = null;
    Session.instance = this;
    this.startListeners();
    this.saveCurrentState();
    this.trackStickyWindow();
  }

  trackStickyWindow() {
    let checkInterval = setInterval(() => {
      if(this.stickyWindowActivity) {
        let timeElapsed = Date.now() - this.stickyWindowActivity;
        let threshold = parseInt(Prefs.get('sticky-window-timeout'))*60*1000;
        if(timeElapsed > threshold) {
          clearInterval(checkInterval);
          Session.destroy();
          gEvents.trigger('destroy:sticky_window');
        }
      }
    }, 500);
  }

  save() {
    Session.prefs.set('windows', this.windows);
    Session.prefs.set('tabs', this.tabs);
    Session.prefs.set('eventLog', this.eventLog);
    Session.prefs.save();
  }

  deletePrefs() {
    Session.prefs.del('windows');
    Session.prefs.del('tabs');
    Session.prefs.del('eventLog');
  }

  async saveCurrentState(){
    // Save all tabs and windows
    let _windows = await Session.getAllWindows();
    _windows.forEach(async(_win) => {
      this.windows[_win.id] = _win;

      // tabs
      let tabs = await Session.fetchTabs(_win.id);
      tabs.forEach((tab) => {
        this.tabs[tab.id] = tab;
      });
    });
    this.save();
  }

  log(s) {
    var d = new Date();
    var n = d.toLocaleTimeString();
    this.eventLog.push(s + ` at ${n}`);
    this.save();
  }

  addWindow(newWindow) {
    newWindow.distill = newWindow.distill || false;
    newWindow.createdAt = newWindow.createdAt || Date.now();
    this.windows[newWindow.id] = newWindow;
    this.save();
  }

  addTab(newTab) {
    newTab.createdAt = newTab.createdAt || Date.now();
    if(newTab.distill) {
      this.stickyWindowActivity = Date.now();
    }
    this.tabs[newTab.id] = _.defaults(newTab, this.tabs[newTab.id]);
    this.save();
  }

  nonDistillWindowCount() {
    let windowProperties = Object.values(this.windows);
    // Exclude incognito windows from count
    let distillWindows = _.where(windowProperties, {distill: true, incognito: false});
    return this.windows.length - distillWindows.length;
  }

  // Defer deletion by a fixed time, so that last windows tabs aren't deleted
  // Drawback: If user quickly closes tabs within the given time interval, this won't work
  removeTabFromSession(id) {
    if(this.tabs[id].distill) {
      delete this.tabs[id];
      this.save();
    } else {
      setTimeout(() => {
        delete this.tabs[id];
        this.save();
      }, 2000);
    }
  }

  removeWindow(id) {
    this.windows[id].closedAt = Date.now();
    if(this.windows[id].distill || this.windows[id].incognito) {
      delete this.windows[id];
      //this.log(`Window ${id} was removed from list.`);
      this.save();
    } else if (!this.windows[id].distill && this.nonDistillWindowCount() > 1) {
      delete this.windows[id];
      //this.log(`Window ${id} was removed from list.`);
      this.save();
    }

  }

  static async restoreTabs() {
    let prefs = Session.prefs;
    let windows = JSON.parse(JSON.stringify(prefs.get('windows', {})));
    let lastTabs = JSON.parse(JSON.stringify(prefs.get('tabs', {})));
    let restoreEnabled = await Session.checkWhetherRestoreIsEnabled(windows);
    if(!restoreEnabled){
      return;
    }
    Session.prefs.set('windows', {});
    Session.prefs.set('tabs', {});

    let _window = await Session.fetchCurrentWindow();

    windows = Session.removeDistillWindows(windows, lastTabs);

    // Open a blank tab and close all current tabs
    // Restore tabs from last window
    let blankTab = await chrome.tabs.createAsync({windowId: _window.id});
    let tabs = await Session.getCurrentWindowTabs();
    tabs.forEach(async(tab) => {
      if(blankTab.id != tab.id) {
        await chrome.tabs.removeAsync(tab.id);
      }
    });
    let tabProperties = Object.values(lastTabs);
    let tabCount = tabProperties.length;
    let nTabsCreated = 0;
    let lastWindow = Session.getLastWindow(windows);
    // Update current window state
    if(lastWindow.state) {
      if(lastWindow.state == 'normal') {
        let props = _.pick(lastWindow, 'state', 'width', 'height', 'top', 'left');
        chrome.windows.update(_window.id, props);
      } else {
        chrome.windows.update(_window.id, {state: lastWindow.state});
      }
    }
    tabProperties.forEach((tab) => {
      let incognito = windows[tab.windowId] && windows[tab.windowId].incognito;
      if(tab.url &&
        !incognito &&
        tab.windowId == lastWindow.id &&
        !tab.distill &&
        !(tab.url == Session.stickyWindowURL) &&
        (tab.url.indexOf('chrome://newtab')==-1)
      ){
        chrome.tabs.create({url: tab.url});
        nTabsCreated += 1;
      }
    });
    if(nTabsCreated > 0) {
      await chrome.tabs.removeAsync(blankTab.id);
    }
  }

  static getLastWindow(windows) {
    let lastWindow = null;
    Object.values(windows).forEach((_window) => {
      // if(lastWindow && !_window.incognito && _window.closedAt && lastWindow.closedAt > _window.closedAt) {
      if(!_window.incognito) {
        lastWindow = _window;
      }
      // } else if(_window && _window.closedAt) {
      //   lastWindow = _window;
      // }
    });
    return lastWindow;
  }

  startListeners() {
    this.startTabOpenListener();
    this.startTabCloseListener();
    this.startTabUpdateListener();
    this.startTabAttachmentListener();
    this.startWindowOpenListener();
    this.startWindowCloseListener();
    this.startSizeListeners();
  }

  startSizeListeners() {
    let listener = setInterval(async() => {
      let _windows = await Session.getAllWindows();
      _windows.forEach((_window) => {
        let id = _window.id;
        this.windows[id].state = _window.state;
        if(this.windows[id].state=='normal') {
          this.windows[id].top = _window.top;
          this.windows[id].left = _window.left;
          this.windows[id].height = _window.height;
          this.windows[id].width = _window.width;
        }
      });
    }, 1000);
    this.listeners.intervals.push(listener);
  }

  startTabOpenListener() {
    this.sessionTabOpenListener = (tab) => {
      this.addTab(tab);
      //this.log(`Tab ${tab.id} (windowId: ${tab.windowId}) created with url ${tab.url}`);
    }
    let listener = chrome.tabs.onCreated.addListener(this.sessionTabOpenListener);
    let evt = chrome.tabs.onCreated;
    let fnc = this.sessionTabOpenListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  startTabUpdateListener() {
    this.sessionTabUpdateListener = (tabId, changeInfo, tab) => {
      this.addTab(tab);
      //this.log(`Tab ${tab.id} (windowId: ${tab.windowId}) updated with url ${tab.url}.`);
    }
    let listener = chrome.tabs.onUpdated.addListener(this.sessionTabUpdateListener);
    let evt = chrome.tabs.onUpdated;
    let fnc = this.sessionTabUpdateListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  startTabCloseListener() {
    this.sessionTabCloseListener = (id, info) => {
      //let tab = this.tabs[id];
      this.removeTabFromSession(id);
      //this.log(`Tab ${tab.id} (windowId: ${tab.windowId}) with url ${tab.url} closed`);
    }
    let listener = chrome.tabs.onRemoved.addListener(this.sessionTabCloseListener);
    let evt = chrome.tabs.onRemoved;
    let fnc = this.sessionTabCloseListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  startTabAttachmentListener() {
    this.sessionTabAttachmentListener = (id, info) => {
      this.tabs[id].windowId = info.attachInfo.newWindowId;
      this.save();
    }
    let listener = chrome.tabs.onAttached.addListener(this.sessionTabAttachmentListener);
    let evt = chrome.tabs.onAttached;
    let fnc = this.sessionTabAttachmentListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  startWindowOpenListener() {
    this.sessionWindowOpenListener = (_window) => {
      this.addWindow(_window);
      //this.log(`Window id ${_window.id} opened`);
    }
    let listener = chrome.windows.onCreated.addListener(this.sessionWindowOpenListener);
    let evt = chrome.windows.onCreated;
    let fnc = this.sessionWindowOpenListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  startWindowCloseListener() {
    this.sessionWindowCloseListener = (id) => {
      this.removeWindow(id);
      //this.log(`Window id ${id} closed`);
    }
    let listener = chrome.windows.onRemoved.addListener(this.sessionWindowCloseListener);
    let evt = chrome.windows.onRemoved;
    let fnc = this.sessionWindowCloseListener;
    this.listeners.chrome.push({listener, evt, fnc});
  }

  destroyListeners() {
    this.listeners.intervals.forEach((listener) => {
      clearInterval(listener);
    });
    this.listeners.chrome.forEach((listenerItem) => {
      let {listener, evt, fnc} = listenerItem;
      evt.removeListener(fnc);
    });
  }

  static windowContainsUserTab(id, tabs) {
    Object.values(tabs).forEach((tab) => {
      if(!tab.distill && tab.windowId == id) {
        return true;
      }
    });
    return false;
  }

}

Session.removeDistillWindows = (windows, tabs) => {
  Object.values(windows).forEach((_window) => {
    if(!Session.windowContainsUserTab(_window.id, tabs) && _window.distill) {
      delete windows[_window.id];
    }
  });
  return windows;
}

Session.checkWhetherRestoreIsEnabled = async(prevWindows) => {
  // If default distill tab is opened then restore is enabled
  let tabs = await Session.getCurrentWindowTabs();
  let windows = await Session.getAllWindows();
  if(windows.length > 1){
    Session.shutdownDistillWindows(prevWindows);
  }
  let enabled = false;
  tabs.forEach((tab) => {
    if(tab.url == Session.stickyWindowURL) {
      enabled = true;
    }
  });
  return enabled && (windows.length == 1) ;
}

Session.getWindow = async(windowId) => {
  return new Promise((resolve, reject) => {
    chrome.windows.get(windowId, resolve);
  });
}

Session.fetchTabs = async(windowId) => {
  return new Promise((resolve, reject) => {
    //chrome.tabs.getAllInWindow(windowId, resolve);
    let tabs = chrome.tabs.query({windowId}, resolve);
  });
}

Session.fetchCurrentWindow = async() => {
  return new Promise((resolve, reject) => {
    chrome.windows.getCurrent({}, resolve);
  });
}

Session.getCurrentWindowTabs = async() => {
  let _window = await Session.fetchCurrentWindow();
  return _window ? await Session.fetchTabs(_window.id) : [];
}

Session.getAllWindows = async() => {
  return new Promise((resolve, reject) => {
    chrome.windows.getAll({}, resolve);
  });
}

Session.getInstance = () => {
  return Session.instance || (Session.instance = new Session());
}

Session.shutdownDistillWindows = async(prevWindows) => {
  let windows = await Session.getAllWindows();
  let _tabs = Session.prefs.get('tabs', {});
  //let protocol = Session.stickyWindowURL.
  let params = {};
  if(CFG.CLIENT.TYPE == C.CLIENT_FFWX) {
    params.url = Session.stickyWindowURL;
  } else {
    params.url = 'data:*';
  }
  chrome.tabs.query(params, (tabs) => {
    if(tabs.length > 0) {
      tabs.forEach((tab) => {
        if(tab.url == Session.stickyWindowURL) {
          chrome.windows.remove(tab.windowId);
        }
      });
    }
  });
}

Session.destroy = () => {
  let instance = Session.getInstance();
  instance.destroyListeners();
  instance.deletePrefs();
  instance = null;
  Session.instance = null;
  delete instance;
  delete Session.instance;
}
;
// TODO send result using an event?

/**
 * @param {{loader: TabLoader}}
 */
function VisualSelector({loader, model, state}, resultCallback) {
  /**
   * @type {BasicPort}
   */
  let port; // the port connected to selector's iframe
  const id = ID();

  state = _.extend({
    selectorOn: false,
    expanded: true,
  }, Prefs.get('visualselector.uistate'), state);

  _.extend(this, Backbone.Events);

  this.id = id;
  this.loader = loader; // used externally

  VisualSelector.ALL.push(this);

  // 1. Store application state in a model.
  // 2. Open a visual selector port in tab content and connect the port to this
  //    selector instance.
  // 3. Load selector UI in an iframe in the content tab or in a separate window.
  // 4. Set the model and start editing selections.

  // If the loader is ready already, load visual selector now.
  this.listenTo(loader, 'reset', loadSelectorFrame);
  this.listenTo(loader, 'reset', onLoaderReset);
  this.listenTo(loader, 'destroy', () => resultCallback(null));

  if (loader.rootPort) {
    loadSelectorFrame();

  }
  this.listenTo(loader, 'port:init', (event, aPort) => {
    onLoaderPortInit(aPort);
  });

  // automatically forward all events from loader to selector port?
  [
    'port:select:close',
    'port:select:display',
    'port:select:new',
  ].forEach(name => {
    // using this.listenTo instead of loader.on for easier cleanup
    this.listenTo(loader, name, (event, aPort) => {
      port.sendEvent(`loader:${name}`, {
        index: loader.getPortIndex(event.portId),
        uri: aPort.uri,
        ...event,
      });
    });
  });

  this.destroy = () => {
    VisualSelector.ALL.splice(VisualSelector.ALL.indexOf(this), 1);

    this.off();
    this.stopListening();
  }

  this.setSelectorFramePort = (chromePort) => {
    if (port) port.destroy();
    port = new BasicPort(chromePort, {
      handleRequest: handleSelectorFameRequest,
    });
    this.initSelectorFramePort();
  }

  this.initSelectorFramePort = () => {
    port.on('disconnect', () => port = null);

    port.on('close', onClose);
    port.on('save', onSave);
    port.on('uistate', onUIState);

    // Set model and state variables
    // console.log('load model:', model);
    port.sendEvent('init', {
      model,
      state,
    });

    // Perform init if loader has already been loaded.
    if (loader.rootPort) {
      onLoaderReset();
    }
    _.each(loader.ports, onLoaderPortInit);
  }

  function onLoaderReset() {
    if (!port) return;

    port.sendEvent('loader:reset',
      _.pick(loader.rootPort.port.attrs, 'uri'));
  }

  function onLoaderPortInit(loaderPort) {
    if (!port) return;

    if (loaderPort.ready) {
      // console.log('onLoaderPortReady', loaderPort.uri);
      port.sendEvent('loader:load', {
        index: loader.getPortIndex(loaderPort.id),
      });
    }
  }

  function loadSelectorFrame() {
    if(isElectron()) {
      chrome.tabs.attachToolsPanel(loader.tabId);
    } else {
      // load this script in the top context.
      // this will create and load the selector iframe in the page
      chrome.tabs.executeScript(loader.tabId, {
        code: 'window.DISTILL_LOCALE=' +
          JSON.stringify(Prefs.get('locale') || 'en-US'),
        runAt: 'document_start',
      });

      chrome.tabs.executeScript(loader.tabId, {
        file: 'content/port-selector.js',
        runAt: 'document_start',
      });
    }
  }

  async function onClose() {
    chrome.tabs.executeScript(loader.tabId, {
      code: 'remove()',
    });

    const cancellablePromises = []
    try {
      await Promise.all(loader.ports.map(p => {
        const cancellablePromise = new CancellablePromise(100, new Error(`picker_setMode request failed for port ${port.id}`))
        cancellablePromises.push(cancellablePromise)
        return Promise.race([
          cancellablePromise,
          p.sendRequest("picker_setMode", "NOOP")
        ])
      }))
    } catch (e) {
      console.error('error while closing the picker', e)
    } finally {
      cancellablePromises.forEach(cp => {
        clearTimeout(cp.timeoutId)
      })
    }

    resultCallback();
  }

  function onSave(event) {
    chrome.tabs.executeScript(loader.tabId, {
      code: 'remove()', // Close visual selector ui
    });
    event.name = loader.rootPort.title;
    resultCallback(null, event);
  }

  function onUIState(event) {
    Prefs.set('visualselector.uistate', event);

    // call frame controller
    if(isElectron()) {
      chrome.tabs.toggleToolsPanel(loader.tabId, event);
    } else {
      chrome.tabs.executeScript(loader.tabId, {
        code: `show(${JSON.stringify(event)})`,
      });
    }
  }

  // handle requests coming from selector frame
  async function handleSelectorFameRequest(path, input) {
    switch (path) {
      case 'loader/request':
        return loader.request(input.portSelector, input.data);
        break;

      default:
        throw new Error('Unsupported path:' + path);
    }
  }

}

VisualSelector.ALL = [];

function selectorAttachPort(chromePort) {
  const tabId = chromePort.sender.tab.id;
  const vs = _.find(VisualSelector.ALL, function(vs) {
    return vs.loader.tabId == tabId;
  });

  vs && vs.setSelectorFramePort(chromePort);
  return !!vs;
}

;
const TYPE_FORM_ENCODED = 'application/x-www-form-urlencoded';

const TYPE_JSON = 'application/json';

const RE_XML = /((\/xml)|(\+xml))$/;

function encodeParams(params) {
  return _.map(params, function(value, name) {
    return name+'='+encodeURIComponent(value);
  }).join('&');
}

var HTTP = {
  request: promisifyOrCallback(function({
    params, json, url, overrideMimeType, headers, method
  }, callback) {
    const contentType = params ? TYPE_FORM_ENCODED : TYPE_JSON;

    method || (method = 'GET');
    json || (json = {});

    if (method == 'GET' && !_.isEmpty(json)) {
      url += (url.indexOf('?') < 0 ? '?' : '&') + qs.stringify(json);
    }
    // console.log('HTTP.request:', method, url);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = onreadystatechange;
    xhr.open(method, url, true);
    setHeaders();

    if(overrideMimeType) {
      xhr.overrideMimeType(overrideMimeType);
    }

    if (method == 'GET') {
      // null for GET with native object
      xhr.send(null);
    } else {
      const str = contentType == TYPE_JSON ?
        JSON.stringify(json) : encodeParams(params);
      xhr.send(str);
    }

    function onreadystatechange() {
      if (xhr.readyState == 4) {
        const text = xhr.responseText;
        const contentType = xhr.getResponseHeader('content-type') || 'text';
        const isJSON = contentType.indexOf(TYPE_JSON) == 0;
        const isXML = RE_XML.test(contentType);
        const response = isJSON ? JSON.parse(text) : isXML ? xhr.responseXML : text;
        const status = xhr.status;
        
        const headerString = xhr.getAllResponseHeaders();

        // Convert the header string into an array
        // of individual headers
        const arr = headerString.trim().split(/[\r\n]+/);
    
        // Create a map of header names to values
        const headers = {};
        arr.forEach((line) => {
          const parts = line.split(': ');
          const header = parts.shift();
          const value = parts.join(': ');
          headers[header] = value;
        });
        // console.log('HTTP:response:(type?', contentType, ')-', xhr.status,  xhr, xhr.responseText);
        callback(status !=200 ? {status, response} : null, {headers, response, status});
      }
    }

    function setHeaders() {
      xhr.withCredentials = true;
      if (method != 'GET') {
        xhr.setRequestHeader('Content-type', contentType);
      }
      _.each(headers, function(value, key) {
        xhr.setRequestHeader(key, value);
      });
    }
  }),
  
  del: function(options, ...args) {
    _.extend(options, {method: 'DELETE'});
    return HTTP.request(options, ...args);
  },
  head: function(options, ...args) {
    _.extend(options, {method: 'HEAD'});
    return HTTP.request(options, ...args);
  },
  get: function(options, ...args) {
    _.extend(options, {method: 'GET'});
    return HTTP.request(options, ...args);
  },
  post: function(options, ...args) {
    _.extend(options, {method: 'POST'});
    return HTTP.request(options, ...args);
  },
  put: function(options, ...args) {
    _.extend(options, {method: 'PUT'});
    return HTTP.request(options, ...args);
  },
};

;
function Route(options) {
  _.extend(this, options, this.parse(options.path));
}

_.extend(Route.prototype, {

  match: function(path) {
    const
      keys = this.keys;


    const params = this.params = {};


    const m = this.regexp.exec(path);

    if (!m) return false;

    for (let i = 1, len = m.length; i < len; ++i) {
      const key = keys[i - 1];

      const val = 'string' == typeof m[i]
        ? decode(m[i])
        : m[i];

      if (key) {
        params[key.name] = val;
      } else {
        throw new Error('Nameless param not supported, path:'+path);
      }
    }

    return true;
  },
  
  // The parse method returns a regular expression for the path provided which is later used 
  // to match the paths of store with input url in `api.js`

  parse: function(path) {
    const keys = []; const strict = true;
    path = path
      .concat(strict ? '' : '/?')
      .replace(/\/\(/g, '(?:/')
      .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g,
        function(_, slash, format, key, capture, optional, star) {
          keys.push({name: key, optional: !! optional});
          slash = slash || '';
          return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
          + (optional || '')
          + (star ? '(/*)?' : '');
        })
      .replace(/([\/.])/g, '\\$1')
      .replace(/\*/g, '(.*)');
    return {
      keys: keys,
      regexp: new RegExp('^' + path + '$', 'i'),
    };
  },

});


function Router(options) {
  this.routes = _.map(options.routes, function(routeOptions) {
    return new Route(routeOptions);
  }, this);

  // console.log('this.routes:', this.routes, options);
}

_.extend(Router.prototype, {

  find: function(path) {
    const route = _.find(this.routes, function(route) {
      return route.match(path);
    });
    return route;
  },

});

function decode(str) {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}

;
function apiHeaders() {
  return {
    'Authorization': 'Client ' + auth.getToken(),
    'X-Client-ID': Prefs.get('client.id'),
    'X-Client-Version': CFG.VERSION,
  };
}


function callAPI(url, method, json, callback) {
  let headers = {}
  if (url && typeof url === 'object') {
    const requestOptions = url
    callback = method
    url = requestOptions["url"]
    method = requestOptions["method"] || "GET"
    json = requestOptions["json"]
    headers = requestOptions["headers"]
  } else if (typeof method == 'function') {
    callback = method;
    json = null;
    method = 'GET';
  } else if (typeof json == 'function') {
    callback = json;
    if (_.isObject(method)) {
      json = method;
      method = 'GET';
    } else {
      json = null;
    }
  }
  // console.log(method, url)

  const options = {
    url,
    method,
    json,
    headers
  };
  return _api(options, callback);
}

async function _api(options, callback) {
  options.headers = { ...apiHeaders(), ...options.headers, };

  return new Promise((resolve, reject) => {
    return HTTP.request(options, function (err, xhrObj) {
      if (err && err.status == 401) {
        auth.on401(); // user need to login token lost
      }
      let res = xhrObj?.response;
      if (callback) {
        callback(err, res);
      } else {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      // err && console.error('api error: ', err, url, method, json);
      // callback(err, res);
    });
  });
}

function makeAPICaller(baseURL) {
  return (urlOrOptions, ...args) => {
    if (typeof urlOrOptions === "string") {
      return callAPI(baseURL + urlOrOptions, ...args);
    } else {
      urlOrOptions.url = baseURL + urlOrOptions.url
      return callAPI(urlOrOptions, ...args);
    }
  }
}


api = promisifyOrCallback(makeAPICaller(CFG.URL.API));
utilApi = utilWrapper;
util = makeAPICaller(CFG.URL.UTILITIES);

const utilRouter = new Router({
  routes: [{
    path: '/datasources/:datasource_id/fetch',
    handler: async function ({ json }) {
      const { datasource_id } = this.params;
      return await datasources.fetchData({
        type: datasource_id_type_map[datasource_id],
        fetchOpts: json
      });
    }
  }]
});

async function utilWrapper(url, method, json) {
  const route = utilRouter.find(url);
  if (route) {
    return await route.handler({ url, method, json });
  } else {
    return await util(url, method, json);
  }
}
;
var auth = _.extend({

  clear: function(callback) {
    Prefs.del('client.token');
  },

  isLegacy: function() {
    const installedVersion = auth.getVersion();
    const vInstall = installedVersion.split('.');
    const vMarker = [1, 11];
    const len = Math.max(vInstall.length, vMarker.length);

    for (let i = 0; i < len; i += 1) {
      const vi = parseInt(vInstall[i]||0); const vm = vMarker[i]||0;
      if (vi !== vm) {
        return vi < vm;// it is legacy version
      }
    }
    return false;// current ver is not legacy
  },

  logout: function() {
    auth.clear();
    auth.trigger('logout');
  },

  // Deprecated method
  _get: function(callback) {
    const name = Prefs.get('service.name');
    const password = Prefs.get('service.password');
    const cred = password ? { name, password, } : null;
    callback && callback(null, cred);
    return cred;
  },

  getId: function() {
    // XXX Set a default value of null, when it is undefined, IndexexDB (zangodb)
    // queries where they look for null values won't work
    return Prefs.get('service.user_id', null);
  },

  _setId: function(id) {
    Prefs.set('service.user_id', id);
  },

  getToken: function() {
    return Prefs.get('client.token');
  },

  _setToken: function(token) {
    Prefs.set('client.token', token);
  },

  setUserIdAndToken: async function(token, uid) {
    await ClientStore.update({
      id: SyncId.get(),
      user_id: '$null',
    }, {
      user_id: uid,
      _state: C.LOCAL_STATE_SYNCED,
    });

    auth._setId(uid);
    auth._setToken(token);

    auth.trigger("login")
    return true;
  },

  getUser: promisifyOrCallback(function(callback) {
    UserStore.findOne(auth.getId(), callback);
  }),

  getVersion: function() {
    return Prefs.get('since')['version'];
  },

  isLoggedIn: function() {
    return !!auth.getToken();
  },

  isLoginMandatory: function() {
    /*
    let version = auth.getVersion();
    if(auth.isLegacy()) {
      return !!auth.getId()
    } else {
      return true;
    }
    */
    return !!auth.getId();
  },

  isReady: function() {
    return (auth.isLoggedIn() || !auth.isLoginMandatory());
  },

  on401: function() {
    if (auth.isLoggedIn()) {
      auth.logout();
      auth.trigger('expired');
    }
  },

  // Fetch and save logged in user
  init: function(callback = function(err) {
    err && console.error('auth.init', err);
  }) {
    const oldCreds = auth._get();
    const token = auth.getToken();

    if (auth.getId() && !token) {
      // User was logged in at some point of time but does not have a valid token
      if (oldCreds) {
        // Get auth token from server
        auth.saveToken(oldCreds, callback);
      } else {
        // Can't get a token, send error. Should show a notice to the user.
        return callback({code: 'EAUTH', msg: 'Authentication required'});
      }
    } else if (token) {
      auth.initUser(callback);
    } else {
      callback();
    }
  },

  initUser: async function(callback = function() {}) {
    // console.trace()
    try {
      let user = await UserStore.findOne(auth.getId());
      if (!user) {
        user = await api('/users/self', 'GET');
        await UserStore.create(_.extend({_state: C.LOCAL_STATE_SYNCED}, user));
      }

      callback();
    } catch (e) {
      if (await UserStore.findOne(auth.getId())) { // slow network temporary solution for initUser failure
        callback();
      } else {
        callback(e);
      }
    }
  },

  // Check credentials and save token for auth for this client
  saveToken: function(params, callback) {
    ClientStore.findOne(SyncId.get(), function(err, client) {
      if (err) {
        // show watchlist with err code
        return callback(err);
      }
      if (!client) {
        // show watchlist with err code
        return callback({
          code: 'ECLIENT',
          msg: 'Failed to find client metadata',
        });
      }
      params.client = client;
      HTTP.post({
        url: CFG.URL.API + '/users/client_token',
        json: params,
      }, async (err, xhrObj) => {
        if (err) {
          // show watchlist with err code
          return callback(err);
        }
        let res = xhrObj.response;
        // Client is created on server as part of this call
        await ClientStore.update({
          id: client.id,
          user_id: '$null',
        }, {
          user_id: res.user_id,
          _state: C.LOCAL_STATE_SYNCED,
        });

        const
          token = res.token;
        auth._setId(res.user_id);
        auth._setToken(token);
        auth.initUser(callback);
      });
    });
  },

}, Backbone.Events);
;
// Id to sync data across different devices.
var SyncId = {

  webAppId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
  anyLocalId: C.DEFAULT_GROUPID,

  create: function (callback) {
    // console.log('client.create');
    let
      client_id = Prefs.get('client.id');


    let clientDoc;

    async.waterfall([
      function (callback) {
        const doc = {
          type: CFG.CLIENT.TYPE,
          name: CFG.CLIENT.NAME,
          info: CFG.CLIENT.INFO,
          // By default, sync is not authorized.
          state: C.STATE_DEFAULT,
          version: CFG.VERSION,
          is_worker: true,
        };
        client_id && (doc.id = client_id);
        // user_id && (doc.user_id = user_id); // Remove dependency on auth
        ClientStore.create(doc, callback);
      },
      function (_clientDoc, callback) {
        clientDoc = _clientDoc;
        client_id = clientDoc.id;
        Prefs.set('client.id', client_id);
        KVStore.destroy({ id: 'client_id' }, callback);
      },
      function (res, callback) {
        KVStore.create({ id: 'client_id', value: client_id }, callback);
      },
    ], function (err) {
      callback(err, clientDoc);
    });
  },

  init: function (callback) {
    SyncId.findId(function (err, client_id) {
      if (client_id) {
        Prefs.set('client.id', client_id);
        // Query ClientStore to make sure that an entry for client_id exists
        // for currently authenticated user. If this is not so, make sure that
        // we create one.
        const query = { id: client_id };
        // user_id && (query.user_id = user_id);   // Remove dependency on auth
        ClientStore.findOne(query, function (err, doc) {
          // console.log('findOne:', err, doc);
          if (!doc) {
            // XXX The db is out of sync. Possible reasons:
            // 1. Restored from backup of an older version.
            // 2. Copied from another client.
            // console.log('to create:', err, doc);
            SyncId.create(callback);
          } else {
            // We are all set, there is nothing left for us to do.
            callback(null, doc);
            ClientStore.update(query, { state: C.STATE_DEFAULT });
          }
        });
      } else {
        _getId().then(id => {
          if (id && id.length == 36) {
            // Save client id only iff it is a valid uuid
            Prefs.set('client.id', id);
          } else {
            const generateId = guid();
            Prefs.set('client.id', generateId);
            _setId(generateId);
          }
          SyncId.create(callback);
        })
          .catch(() => {
            Prefs.set('client.id', guid());
            SyncId.create(callback);
          })
      }
    });
  },

  findId: function (callback) {
    const client_id = Prefs.get('client.id');
    if (client_id) {
      callback(null, client_id);
    } else {
      // A more durable form of storage - can be restored from a backup
      KVStore.findOne({ id: 'client_id' }, function (err, doc) {
        callback(err, doc && doc.value);
      });
    }
  },

  get: function (callback) {
    return Prefs.get('client.id');
  },

};

function pruneDeletedSieve(callback) {
  SieveStore.destroy({
    state: C.STATE_DEL,
    $or: {
      _state: C.LOCAL_STATE_POST,
      user_id: null,
    },
  }, function (err, list) {
    if (err) {
      callback(err);
    } else {
      /*
      execQuery('DELETE FROM sieve_data WHERE id IN (SELECT sieve_data.id '
        + 'FROM sieve_data LEFT JOIN sieves ON '
        + 'sieves.id = sieve_data.sieve_id WHERE sieves.id IS NULL)',
        [], {},
        function(err, res) {
          callback(err);
        });
      */
      // pruneOrphanedData(callback);
      callback();
    }
  });
}

// delete the snapshots created when the logic for removing them was not there inside insertWork fn
//  remove the snapshots not referenced by works
function pruneSieveSnapshots(callback) {
  if (CFG.CLIENT.TYPE !== C.CLIENT_CR) {
    return callback()
  }

  execQuery('DELETE FROM sieve_snapshots WHERE id NOT IN (SELECT works.snapshot_id FROM works where works.snapshot_id IS NOT NULL)',
    [], {},
    function (err, res) {
      callback(err);
    });
}

function pruneOrphanedData(callback) {
  async.series([
    function (callback) {
      // Delete orphaned actions and data.
      async.each([ActionStore, SieveDataStore], function (store, callback) {
        const
          n = store.name;


        const sql = 'SELECT ' + n + '.id FROM ' + n + ' LEFT JOIN sieves ON ' + n + '.sieve_id=sieves.id WHERE sieves.id IS NULL';
        execQuery(sql, [], {}, function (err, list) {
          if (err) {
            callback(err);
          } else {
            const
              ids = _.pluck(list, 'id');
            // NOTE Limit maximum number of ids that can be passed to a query
            // in a single call. We destroy in chunks of 100.
            async.whilst(function () {
              return ids.length > 0;
            }, function (callback) {
              store.destroy({
                'id.in': ids.splice(0, 500), // SQLITE_MAX_VARIABLE_NUMBER is 999
              }, callback);
            }, callback);
          }
        });
      }, callback);
    },
    function (callback) {
      // Delete orphaned rules.
      const sql = 'SELECT rules.id FROM rules LEFT JOIN sieves on rules.id = sieves.rule_id where sieves.rule_id IS NULL';
      execQuery(sql, [], {}, function (err, list) {
        if (err) {
          callback(err);
        } else {
          RuleStore.destroy({
            'id.in': _.pluck(list, 'id'),
          }, callback);
        }
      });
    },
  ], callback);
}

function initData(callback) {
  const clientId = Prefs.get('client.id');

  async.series([
    // Prune data that has not been synced and has been marked for deletion
    pruneDeletedSieve,
    pruneSieveSnapshots,
    function (callback) {
      PopupMessageStore.destroy({}, callback);
    },
    // Make sure that we have updated state and _state
    function (callback) {
      // Update the _state to mark records for sync
      async.each([
        ClientStore, SieveStore, TagStore, SieveDataStore, ActionStore,
        RuleStore, AttrStore, ClientGroupStore/* ErrorStore, WorkStore,*/
      ],
        function (store, callback) {
          store.update({ _state: null }, {
            _state: C.LOCAL_STATE_POST,
            ts_mod: -1,
          }, callback);
        }, callback);
    },
    function (callback) {
      async.each([
        ClientStore, SieveStore, TagStore, SieveDataStore, ActionStore,
        RuleStore, AttrStore, ClientGroupStore /* ErrorStore, WorkStore,*/
      ],
        function (store, callback) {
          store.update({ state: null }, {
            state: C.STATE_DEFAULT,
            ts_mod: -1,
            _state: -1,
          }, callback);
        }, callback);
    },
    function (callback) {
      SieveStore.update({
        rule_id: '',
      }, {
          rule_id: null,
          ts_mod: -1,
          _state: -1,
        }, callback);
    },
    function (callback) {
      // console.log('update client_id');
      SieveStore.update({ client_id: null }, {
        client_id: clientId,
        ts_mod: -1,
        _state: -1,
      }, callback);
    },
    function (callback) {
      const user_id = auth.getId();
      if (!user_id) {
        callback();
        return;
      }
      async.parallel([
        function (callback) {
          ClientStore.update({
            'user_id': null,
            'id.nin': [SyncId.webAppId, SyncId.anyLocalId],
          }, {
              user_id: user_id,
              ts_mod: -1,
              _state: -1,
            }, callback);
        },
        function (callback) {
          async.each(
            [SieveStore, TagStore, ActionStore, RuleStore, AttrStore],
            function (store, callback) {
              store.update({
                user_id: null,
              }, {
                  user_id: user_id,
                  ts_mod: -1,
                  _state: -1,
                }, callback);
            }, callback);
        },
      ], callback);
    },
  ], callback);
}

async function _getId() {
  // Used when extension is reinstalled to recover the older client id using cookies
  const url = `${CFG.URL.AUTH}/client/id`;
  let res = await fetch(url);
  let text = await res.text();
  return text;
}

async function _setId(id) {

  const url = `${CFG.URL.AUTH}/client/id`;
  return await fetch(url, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'PATCH',
    body: 'id=' + id
  })
}
;
var SyncMan = _.extend({}, Backbone.Events, {

  accountEnabled: false,

  syncTimer: {},

  canSync: function() {
    return auth.isLoggedIn();
  },

  clearTimers: function() {
    _.each(this.syncTimer, function(timeoutId) {
      clearTimeout(timeoutId);
    });
    this.syncTimer = {};
  },

  del: promisifyOrCallback(function(store, callback) {
    // console.log('del:', store.name);
    const urlTpl = (store.urls.id);
    store.find({
      _state: C.LOCAL_STATE_DEL,
    }, function(err, resp) {
      if (err) {
        callback(err);
        return;
      }
      // console.log('to delete:', resp.count, resp.data);
      async.eachSeries(resp.data, function(doc, callback) {
        const url = Mustache.render(urlTpl, doc);
        api(url, 'DELETE', function(err) {
          if (err) {
            console.error('error deleting model from server:', err);
            store.update(doc.id, {
              _state: C.LOCAL_STATE_DEL_ERR,
            }, callback);
          } else {
            store.destroy(doc.id, callback);
          }
        });
      }, callback);
    });
  }),
  get: promisifyOrCallback(function(store, options, callback) {
    //
    if (typeof options == 'function') {
      callback = options;
      options = {};
    }
    function getSyncSuffix() {
      const
        query = options.query || {};


      const keys = Object.keys(query).sort();

      if (keys.length === 0) {
        return '';
      }

      const
        parts = keys.map(function(key) {
          return key + '_' + query[key];
        });

      return '_' + parts.join('_');
    }
    let
      tsDoc;


    let resp;


    const user_id = auth.getId();


    const tsSyncId = user_id+'_ts_sync_'+store.name+getSyncSuffix();

    async.waterfall([
      function(callback) {
        KVStore.findOne(tsSyncId, {
          only: ['id', 'value'],
        }, callback);
      },
      function(_tsDoc, callback) {
        // console.log('_tsDoc:', _tsDoc);
        tsDoc = _tsDoc;

        const url = store.urls.root;
        const query = _.extend({
          // Overrides API query default.
          'client_id': '-',
          // Remove any default query filter based on actions for /v1
          'state': '-',
          '_opt': {
            order: ['ts_mod', 'id'],
            limit: store.name == SieveDataStore.name ? 50 : 200,
          },
        }, options.query);

        if (tsDoc) {
          const parts = tsDoc.value.split(',');
          const sTsMod = new Date(parts[0] == 'null' ? 0 : parts[0]); // some tables can return null ts_mod
          const sId = parts[1];

          if (sId) {
            query.$or = {
              'ts_mod.gt': new Date(sTsMod.valueOf() + 1).toISOString(),
              '$and1': {
                'ts_mod.gte': sTsMod.toISOString(),
                'id.gt': sId,
              },
            };
          } else {
            query['ts_mod.gt'] = new Date(sTsMod.valueOf() + 1).toISOString();
          }
        } else {
          // Do not fetch deleted items for first sync
          query['state.nin'] = [C.STATE_DEL, C.STATE_ARCHIVED, ];
        }

        api(url, 'GET', query, callback);
      },
      function(_resp, callback) {
        // console.log('get:resp', store.name, _resp);
        resp = _resp;
        // TODO Fastest way to arrive at the logic would be to query the DB
        // for existing records and then perform the operations.
        async.eachSeries(resp.data, function(remoteDoc, callback) {
          // console.log('remotedoc:', remoteDoc.ts_mod);
          // XXX Find based on combination of id and user_id (if applicable)
          const query = _.pick(remoteDoc, 'id', 'user_id');
          store.findOne(query, {
            only: ['id', '_state'],
          }, function(err, localDoc) {
            remoteDoc._state = C.LOCAL_STATE_SYNCED;
            if (_.isUndefined(remoteDoc.state)) {
              remoteDoc.state = C.STATE_DEFAULT;
            }
            if (localDoc) {
              if (remoteDoc.state == C.STATE_DEL) {
                store.destroy(query, callback);
              } else {
                if (localDoc._state === C.LOCAL_STATE_PUT) {
                  // Let local changes overwrite remote ones
                  callback();
                } else {
                  store.update(query, remoteDoc, callback);
                }
              }
            } else {
              store.create(remoteDoc, callback);
            }
          });
        }, callback);
      },
      function(callback) {
        if (resp.count === 0) {
          callback();
        } else {
          const
            doc = _.pick(resp.data[resp.count - 1], 'id', 'ts_mod');


          const ref = doc.ts_mod + ',' + doc.id;

          if (tsDoc) {
            KVStore.update(tsDoc.id, {
              value: ref,
            }, callback);
          } else {
            KVStore.create({
              id: tsSyncId,
              value: ref,
            }, callback);
          }
        }
      },
    ], function(err) {
      if (err) {
        callback(err);
      } else if (resp.total_count > resp.count) {
        // If there are more items to be synced, get them.
        SyncMan.get(store, options, callback);
      } else {
        callback();
      }
    });
  }),
  post: promisifyOrCallback(function(store, callback) {
    // throw new Error();
    // console.log('post:', store.name);
    const
      url = store.urls.root;


    const user_id = auth.getId();

    store.find({
      'user_id': user_id,
      '_state': C.LOCAL_STATE_POST,
      '$or': {
        'state': null,
        'state.nin': [C.STATE_DEL],
      },
    }, {
      limit: 10,
      order: ['ts_mod'],
    }, function(err, resp) {
      // console.log('docs to post:', resp.data);
      async.eachSeries(resp.data, function(doc, callback) {
        api(url, 'POST', doc, async function(err, res) {
          if (err) {
            if (err.status == 409) {
              // The document was already created, we will resync later
              store.update(doc.id, {
                _state: C.LOCAL_STATE_PUT,
              }, function(errUpdate) {
                callback();
              });
            } else if (err.status == 461 && store == SieveStore) {
              // This error is received when a referenced entity was not found
              // It is similar to 404 where a parent entity could not be found
              const count = await RuleStore.updateLocal(doc.rule_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(RuleStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
              } else {
                // The related rule doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(doc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
              callback();
            } else if (err.status == 404 && res && res.param == 'sieve_id' && store.hasField('sieve_id')) {
              // When we reach here, SieveStore should have been synced, but didnt
              // Try to post that sieve once again
              const count = await SieveStore.updateLocal(doc.sieve_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(SieveStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
                // XXX Can we  be stuck in a look?
              } else {
                // The related sieve doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(doc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
              callback();
            } else if (err.status > 200 && err.status < 502) {
              // XXX Find the reason of error and take action accordingly
              // 1. Find if the resource exists and if so PUT it.
              // 2. In other cases, set it up for manual resolution.

              const
                urlTpl = (store.urls.id);


              const urlId = Mustache.render(urlTpl, doc);

              api(urlId, 'GET', async function(errGet, doc) {
                if (errGet) {
                  if (errGet.status > 200 && errGet.status < 502) {
                    await store.updateLocal(doc.id, {_state: C.LOCAL_STATE_POST_ERR});
                    callback();
                  } else {
                    // In case the error is due to intermittent connection, abort.
                    callback(err);
                  }
                } else {
                  // If there was a document at the server, update local's status
                  store.update(doc.id, {
                    _state: C.LOCAL_STATE_PUT,
                  }, function(errUpdate) {
                    callback();
                  });
                }
              });
            } else {
              // On other non-distill related errors, send error
              callback(err);
            }
          } else {
            savedDoc = res;
            // console.log('posted doc:', store.name, savedDoc.id);
            // XXX We query using ts_mod to handle cases when an update was
            // performed on an unsynced item. We leave unsynced items unchanged.
            const
              query = _.pick(doc, 'id', 'user_id', 'ts_mod');
            store.update(query, _.extend(savedDoc, {
              _state: C.LOCAL_STATE_SYNCED,
            }), async function(err, updatedDoc) {
              if (err) {
                return callback(err);
              }
              if (updatedDoc._count == 0) {
                // The doc was modified while we were posting it. Set its state
                // to PUT
                await store.updateLocal(_.omit(query, 'ts_mod'), {
                  _state: C.LOCAL_STATE_PUT,
                });
              }
              callback();
            });
          }
        });
      }, function(err) {
        if (err) {
          callback(err);
        } else if (resp.total_count > resp.count) {
          // console.log('post: again', store.name);
          SyncMan.post(store, callback);
        } else {
          callback();
        }
      });
    });
  }),
  put: promisifyOrCallback(function(store, callback) {
    // console.log('put:', store.name);
    const
      urlTpl = (store.urls.id);
    user_id = auth.getId();

    store.find({
      user_id: user_id,
      _state: C.LOCAL_STATE_PUT,
    }, {
      limit: 10,
    }, function(err, resp) {
      async.eachSeries(resp.data, function(doc, callback) {
        const
          url = Mustache.render(urlTpl, doc);


        let query = _.pick(doc, 'id', 'user_id');

        // console.log('put:url:', url, doc);
        api(url, 'PUT', doc, async function(err, res) {
          if (err) {
            if (err.status == 461 && store == SieveStore) {
              // This error is received when a referenced entity was not found
              // It is similar to 404 where a parent entity could not be found
              const count = await RuleStore.updateLocal(doc.rule_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(RuleStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
              } else {
                // The related rule doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(doc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
              callback();
            } else if (err.status == 404 && res && res.param == 'sieve_id' && store.hasField('sieve_id')) {
              // When we reach here, SieveStore should have been synced, but didnt
              // Try to post the sieve once again
              const count = await SieveStore.updateLocal(doc.sieve_id, {_state: C.LOCAL_STATE_POST});
              if (count > 0) {
                try {
                  await SyncMan.post(SieveStore);
                } catch (e) {
                  console.error('sync: error syncing', e);
                }
                // XXX Can we  be stuck in a look?
              } else {
                // The related sieve doesn't exist - related docs should be
                // cleaned up
                await store.updateLocal(doc.id, {state: C.STATE_DEL, _state: C.LOCAL_STATE_SYNCED});
              }
            } else if (err.status == 404) {
              store.update(query, {
                _state: C.LOCAL_STATE_POST,
              }, function(errUpdate) {
                callback(); // Err-less callback
              });
            } else if (err.status > 200 && err.status < 502) {
              // Server request resulted in error due to inconsistent state
              store.update(query, {
                _state: C.LOCAL_STATE_PUT_ERR,
              }, function(errUpdate) {
                callback(); // Err-less callback
              });
            } else {
              callback(err); // Bubble up error
            }
          } else {
            query = _.pick(res, 'id', 'user_id');
            store.update(query, _.extend(res, {
              // FIXME Race condition when an attribute changed while it was
              // being synced?
              _state: C.LOCAL_STATE_SYNCED,
            }), callback);
          }
        });
      }, function(err) {
        if (err) {
          callback(err);
        } else if (resp.total_count > resp.count) {
          // console.log('put: again', store.name);
          SyncMan.put(store, callback);
        } else {
          callback();
        }
      });
    });
  }),
  sync: promisifyOrCallback(function(clearTimers, callback) {
    // XXX When called explicitly, we clear the lock
    clearTimers && this.clearTimers();

    pruneDeletedSieve(function(err) {
      if (err) {
        return callback(err);
      }
      async.eachSeries(
        [ClientStore, UserStore, AttrStore, RuleStore, TagStore, SieveStore, SieveDataStore,
          ActionStore, ClientGroupStore, MacroStore],
        function(store, callback) {
          SyncMan.syncStore(store, callback);
        }, callback);
    });
  }),
  syncStore: function(store, options, callback) {
    const
      self = this;


    const name = store.name;

    if (typeof options == 'function') {
      callback = options;
      options = {};
    }

    callback || (callback = function(err) {
      err && console.error(err);
    });

    _.defaults(options, {
      delay: 100,
    });

    if (!this.canSync()) {
      callback({msg: 'e_sync_disabled'});
      return;
    }

    if (!this.accountEnabled) {
      callback({msg: 'e_sync_server_na'});
      return;
    }

    // This timer acts as a lock to prevent concurrent calls to sync same store
    if (!this.syncTimer[name]) {
      var timeoutId = setTimeout(function() {
        const syncTimeoutId = setTimeout(function() {
          // Don't remove if it was removed already
          if (self.syncTimer[name] === timeoutId) {
            // Report error and remove lock
            DBG && console.error('Removing store\'s lock after timeout:', name);
            self.syncTimer[name] = 0;
          }
        }, 120 * 1000);

        self._syncStore(store, function(err, res) {
          // Clear lock's timeout check
          clearTimeout(syncTimeoutId);
          // Remove sync lock
          self.syncTimer[name] = 0;
          if (err) {
            DBG && console.error('Sync failed', err);
          }
          callback(err);
        });
      }, options.delay);

      // Set lock that will be removed after sync completes
      this.syncTimer[name] = timeoutId;
    } else {
      // Sync again after old call has completed?
      self.once(name + ':sync', function (err, res) {
        if (err) {
          callback(err);
        } else {
          self.syncStore(store, options, callback);
        }
      });
    }
  },
  _syncStore: promisifyOrCallback(function(store, callback) {
    // console.log('_syncStore:', store.name);
    SyncMan.trigger(store.name+':sync:init');
    async.series({
      del: function(callback) {
        SyncMan.del(store, callback);
      },
      get: function(callback, force=false) {
        (store.sync.pull || force) ? SyncMan.get(store, callback) : callback();
      },
      put: function(callback) {
        SyncMan.put(store, callback);
      },
      post: function(callback) {
        SyncMan.post(store, callback);
      },
    }, function(err, res) {
      callback(err, res);
      SyncMan.trigger(store.name+':sync', err, res);
    });
  }),
});
;
const ActionEmail = {
  send: function(action, context, callback) {
    // console.log('ActionEmail:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/email', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'tags', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
          emailContent: context.html,
          hasDiff: true,
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionPush = {
  send: function(action, context, callback) {
    // console.log('ActionPush action, context);

    if (auth.getToken()) {
      api('/agents/actions/push', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'tags', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionSMS = {
  send: function(action, context, callback) {
    // console.log('ActionEmail:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/sms', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'tags', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionWebhook = {
  send: function(action, context, callback) {
    // console.log('ActionWebhook:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/webhook', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'tags', 'ts', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'data', 'ts', ),
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionTab = {
  open: function(action, context, callback) {
    // console.log('ActionOpenTab:', action, context);

    chrome.tabs.create({
      active: true,
      url: context.sieve.uri,
    });
  },
};

// Slack Action
const ActionSlack = {
  send: function(action, context, callback) {
    // console.log('ActionWebhook:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/slack', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'content_type'),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
          content: context.html,
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

// Discord Action
const ActionDiscord = {
  send: function(action, context, callback) {
    // console.log('ActionWebhook:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/discord', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'content_type'),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
          content: context.html,
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

// Macro Action
const ActionMacro = {
  log: async function (doc) {
    const res = await api('/agents/actions/macro/log', 'POST', doc)
  },
  run: async function (action, context, callback) {
    if (!auth.getToken()) {
      return callback({code: 'EAUTH', msg: 'Login to take this action'});
    }

    try {
      const usageLeft = await api('/users/usage-left/action_macro', 'GET')
      if (usageLeft?.action_macro <= 0) {
        return callback({
          // server also responds with 503
          code: 503,
          msg: 'e_quota'
        })
      }

      const pageContext = new PageContext({
        pageMods: ['locator'],
        pageProperties: {
          loaderProperties: {
            pinned: false,
            active: true,
          },
          closeLoadersOnClose: false,
        }
      });
      pageContext.setMacroId(action.config.macro_id);
      let macroErr = null
      try {
        await pageContext.run_macro(context.sieve)
      } catch (e) {
        DBG && console.log('ActionMacro', 'run', e)
        macroErr = e.msg || e.message
      }

      await this.log({
        error: macroErr, sieve_id: context.sieve.id, sieve_data_id: context.sieve_data.id, sieve_action_id: action?.id,
      })
      pageContext._close()
      callback()
    } catch (e) {
      console.error('cannot run the macro action', action.config.macro_id, e)
      callback()
    }
  },
};
;

/* 1
 * Feed parser
 * Parses raw XML feeds and converts them to so called Item objects (see below).
 * By qFox, 2010, http://qfox.nl
 */

var Feed = {
  domParser: new DOMParser(),

  /**
   * Detect the type of the feed and let type specific functions
   * parse the feed. The result is an array containing FeedItem
   * objects representing the items from the feed.
   * @param XML xml The actual feed, as an XML tree
   * @param string name Name of the feed, passed on to plugins
   * @param string group Name of group of the feed, passed on to plugins
   * @return array Contains Item objects
   */
  parse: function(xml, name, group) {
    let root; let result;

    // rss 1.0 ("rdf")
    if (xml.getElementsByTagName('rdf:RDF').length || xml.getElementsByTagName('RDF').length) {
      return Feed.parseRss1(xml, name, group);
    }

    // rss (2.0)
    if ((root = xml.getElementsByTagName('rss')) && root.length) { // RSS feed
      const version = root[0].getAttribute('version');
      if (version === '2.0') { // rss 2.0
        return Feed.parseRss2(root[0], name, group);
      }
      if (version === '0.91' || version === '0.92') { // rss 0.91 or 0.92
        return Feed.parseRss091(root[0], name, group);
      }
      throw new Error(' unknown rss version...');
    }

    // atom
    if (xml.getElementsByTagName('feed').length) {
      return Feed.parseAtom(xml, name, group);
    }

    throw new Error('unsupported feed');
    return false;
  },

  /**
   * Retrieve the node value for given attribute or an empty string on failure.
   * When the third parameter is given, it returns that attribute value of the node.
   * @param xml root The root node to search through
   * @param string name The node name we're looking for
   * @param string attr=false If given, the attribute of node we want returned
   * @return mixed
   */
  getNodeValue: function(root, name, attr) {
    try {
      const node = root.getElementsByTagName(name)[0];
      if (attr) {
        return node.getAttribute(attr);
      }

      return Feed.sanitize(node.childNodes[0].nodeValue);
    } catch (er) {
      return '';
    }
  },

  sanitize: function(text) {
    if (!/<\w.*>/.test(text)) return text;

    const doc = Feed.domParser.parseFromString(text, 'text/html');

    if (!doc || !doc.body) {
      return text;
    }

    const kachra = doc && doc.querySelectorAll(
      'script,link[as=script],noscript,frame,iframe,object'
    );

    _.toArray(kachra).forEach(el => el.remove());

    // Clean on* attributes for all elements
    Feed.sanitizeAttributes(doc.documentElement);

    return doc.documentElement.outerHTML;
  },

  sanitizeAttributes: function(el) {
    const attrs = _.toArray(el.attributes);

    _.each(attrs, function(attr) {
      if (attr.nodeName.startsWith('on')) {
        el.removeAttribute(attr);
      } else if (attr.value.toLowerCase().split(':')[0] == 'javascript') {
        el.removeAttribute(attr);
      }
    });

    _.each(el.childNodes, Feed.sanitizeAttributes);
  },

  /**
   * Parse a RSS 1.0 feed
   * Returns an array with FeedItem objects.
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseRss1: function(xmlRoot, name, group) {
    const
      result = [];


    const channel = xmlRoot.getElementsByTagName('channel')[0];


    const items = xmlRoot.getElementsByTagName('item');


    let item;


    let i;

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // throw new Error("Parsing item "+i+" ("+item+")");
      // title, link, description dc:creator, dc:date, dc:subject
      try {
        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'description'),
          Feed.getNodeValue(item, 'link'),
          Feed.getNodeValue(item, 'dc:date') || Feed.getNodeValue(item, 'pubDate') || Feed.getNodeValue(item, 'date') || '',
          item
        );
      } catch (er) {
        throw new Error('Unable to parse item '+i+': '+er.message);
      }
    }
    // return the items
    return {
      title: Feed.getNodeValue(channel, 'title'),
      link: Feed.getNodeValue(channel, 'link'),
      summary: Feed.getNodeValue(channel, 'description'),
      pubdate: Feed.getNodeValue(channel, 'pubDate') || Feed.getNodeValue(channel, 'dc:date') || Feed.getNodeValue(channel, 'date') || '',
      entries: result,
    };
  },

  /**
   * Parse an RSS 2.0 feed
   * Returns an array containing FeedItem objects.
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseRss2: function(xmlRoot, name, group) {
    let
      i;


    const result = [];


    let item;
    // one

    const channel = xmlRoot.getElementsByTagName('channel')[0];


    const items = xmlRoot.getElementsByTagName('item'); // collection of  nodes

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // now add the FeedItem
      try {
        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'description'),
          Feed.getNodeValue(item, 'link'),
          Feed.getNodeValue(item, 'pubDate') || Feed.getNodeValue(item, 'dc:date') || Feed.getNodeValue(item, 'date') || '',
          item
        );
      } catch (er) {
        throw new Error('Feed.parseRss2 fail for '+i+' '+j+' ('+er.message+')');
      }
    }

    return {
      title: Feed.getNodeValue(channel, 'title'),
      link: Feed.getNodeValue(channel, 'link'),
      summary: Feed.getNodeValue(channel, 'description'),
      pubdate: Feed.getNodeValue(channel, 'pubDate') || Feed.getNodeValue(channel, 'dc:date') || Feed.getNodeValue(channel, 'date') || '',
      entries: result,
    };
  },

  /**
   * Parse a RSS 0.91 feed
   * Returns an array with FeedItem objects
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseRss091: function(xmlRoot, name, group) {
    let
      i;


    const result = [];


    let item;
    // single  FeedItem

    const channel = xmlRoot.getElementsByTagName('channel')[0];


    const items = xmlRoot.getElementsByTagName('item'); // get items for this feed

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // now add the FeedItem
      try {
        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'description'),
          Feed.getNodeValue(item, 'link'),
          Feed.getNodeValue(item, 'pubDate') || Feed.getNodeValue(item, 'dc:date') || Feed.getNodeValue(item, 'date') || '',
          item
        );
      } catch (er) {
        throw new Error('Feed.parseRss2 fail for '+i+' ('+er.message+')');
      }
    }

    return {
      title: Feed.getNodeValue(channel, 'title'),
      link: Feed.getNodeValue(channel, 'link'),
      summary: Feed.getNodeValue(channel, 'description'),
      pubdate: Feed.getNodeValue(channel, 'pubDate') || Feed.getNodeValue(channel, 'dc:date') || Feed.getNodeValue(channel, 'date') || '',
      entries: result,
    };
  },

  /**
   * Parse an Atom feed
   * Returns an array with FeedItem objects.
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseAtom: function(xmlRoot, name, group) {
    const
      result = [];


    let i;


    let item;
    // one  FeedItem

    let aUri;


    const rootEl = xmlRoot.getElementsByTagName('feed')[0];


    const baseUri = rootEl.getAttribute('xml:base');


    const items = xmlRoot.getElementsByTagName('entry');

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // title, link, summary, pubdate
      try {
        aUri = Feed.getNodeValue(item, 'link', 'href');
        if (baseUri && aUri && aUri.indexOf(':') < 0) {
          aUri = baseUri + aUri;
        }

        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'summary'),
          aUri,
          Feed.getNodeValue(item, 'published') || Feed.getNodeValue(item, 'published') || '',
          item
        );
      } catch (er) {
        throw new Error('Unable to parse item '+i+': '+er.message);
      }
    }

    return {
      title: Feed.getNodeValue(rootEl, 'title'),
      link: Feed.getNodeValue(rootEl, 'link', 'href'),
      summary: Feed.getNodeValue(rootEl, 'description'),
      pubdate: Feed.getNodeValue(rootEl, 'published') || Feed.getNodeValue(rootEl, 'updated') || '',
      entries: result,
    };
  },
  // ext only, will be overridden by electron
  fetch: function(url, callback) {
    const xhr = HTTP.get({
      url: url,
      headers: {'X-Moz': 'livebookmarks'},
    }, function(err, xhrObj) {
      if (err) {
        console.error('error getting feed from: ' + url);
        callback(err);
      } else {
        let response = xhrObj.response;
        if (response.nodeType === Node.DOCUMENT_NODE) {
          Feed.fromXML(response, callback);
        } else {
          // Default to a string type. If we have a JSON, callback.
          Feed.fromString(response, callback);
        }
      }
    });
  },

  // calls callback with the retrieved result
  fromString: promisifyOrCallback(function(text, url, callback) {
    if (typeof url == 'function') {
      callback = url;
      url = '';
    }
    const
      parser = new DOMParser();


    const doc = parser.parseFromString(text, 'application/xml');

    Feed.fromXML(doc, callback);
  }),

  fromXML: function(doc, callback) {
    if (doc) {
      callback(null, Feed.parse(doc));
    } else {
      callback(ERR.PARAM_INVALID({param: 'feed', value: 'EMPTY'}));
    }
  },

  getText: function(feed) {
    const buf = [feed.title];

    feed.entries.forEach(function(entry, index) {
      buf.push(entry.title);
      if (/<\w.*>/.test(entry.summary)) {
        buf.push(Feed.domParser.parseFromString(entry.summary, 'text/html').documentElement.textContent);
      } else {
        buf.push(entry.summary);
      }
    });

    return buf.join(' \n');
  },

};

function FeedItem(title, summary, url, date, dom) {
  return {
    title: title, // string
    link: url, // string
    summary: summary, // string (not sanatized)
    pubdate: date, // timestamp (as found in the feed...)
  };
}

;
var Xml = {
  xmlSerializer: new XMLSerializer(),
  domParser: new DOMParser(),
  fetch: async function (uri, request) {
    try {
      const res = await datasources.fetchData({ type: 'text', fetchOpts: { uri, request } });
      return { ...res, response: res.text };
    } catch (e) {
      throw new Error('Error while fetching: ' + uri + ' ' + e.message);
    }
  },
  toString: function (xmlDoc) {
    return Xml.xmlSerializer.serializeToString(xmlDoc);
  },
  parse: function (xmlText) {
    return Xml.domParser.parseFromString(xmlText, 'application/xml');
  },
  // ext only, will be overridden by electron
  filter: function (xmlText, selector) {
    const includes = selector?.includes;

    if (!includes || includes.length == 0) {
      return xmlText;
    }

    const xmlDoc = Xml.parse(xmlText);
    let matches = [];
    includes.forEach((include) => {
      if (include.type === 'xpath') {
        const xpathRes = xmlDoc.evaluate(include.expr, xmlDoc, null, XPathResult.ANY_TYPE, null);
        matches.push(xpathRes.iterateNext());
      }
    });

    xmlDoc.documentElement.setAttribute('__hasincl', '1');
    let parent;
    matches.forEach((node) => {
      node.setAttribute('__incl', '1');
      parent = node.parentElement;
      while (parent && parent !== xmlDoc.documentElement && !parent.getAttribute('__hasincl')) {
        parent.setAttribute('__hasincl', '1');
        parent = parent.parentElement;
      }
    });

    Xml.removeExcluded(xmlDoc.documentElement, matches);
    // when root element has both __incl and __hasincl attribute, __hasincl is not removed
    xmlDoc.documentElement.removeAttribute('__hasincl');

    return Xml.toString(xmlDoc);
  },
  removeExcluded: function (el) {
    let attrIncl = el.getAttribute('__incl');
    let attrHasI = el.getAttribute('__hasincl');

    if (attrIncl) {
      el.removeAttribute('__incl');
    } else if (attrHasI) {
      el.removeAttribute('__hasincl');
      let children = el.children;
      Array.from(children).forEach((childEl) => {
        Xml.removeExcluded(childEl);
      });
    } else {
      el.remove();
    }
  }
};
;

class BrowserWrapper {
  pageContext;
  pageLoader;

  constructor(pageContext, pageLoader) {
    this.pageContext = pageContext;
    this.pageLoader = pageLoader;
  }

  async _frame_request(type, data){
    return await this.pageContext.frame_request({
      id: this.pageLoader.id,
      frame: 0,
      input: {
        path: 'performStep',
        data: {
          type,
          data: JSON.stringify(data)
        }
      }
    });
  }

  async click(selector, pos, opts) {
    await this._frame_request('api_click', {selector, pos, opts})
  }

  async waitForDoc(opts) {
    await this._frame_request('api_wait_doc', {opts})
  }

  async select(selector, value, opts) {
    await this._frame_request('api_select', {selector, value, opts})
  }

  async keypress(_code, _count, _opts){
    throw new Error('keypress not allowed in extension')
  }

  async mousemove(selector, pos, opts){
    await this._frame_request('api_mousemove', {selector, pos, opts});
  }

  async drag(_selector, _pos, _targetSelector, _targetPos, _opts){
    throw new Error('drag not implemented in extension');
  }

  async focus(selector, opts){
    await this._frame_request('api_focus', {selector, opts});
  }

  async type(selector, value, opts){
    await this._frame_request('api_type', {selector, value, opts})
  }

  async scroll(selector, left, top, opts) {
    if (isElectron()) {
      await this._frame_request('api_scroll', {selector, left, top, opts})
    } else {
      throw new Error('Scroll is not supported in extension. Use a desktop or cloud monitor instead.')
    }
  }

  async open(url, opts){
    await this._frame_request('api_open', {url, opts})
  }

  async getElementsCount(selector, opts){
    return await this._frame_request('api_get_elements_count', {selector, opts})
  }

  async getElementText(selector, opts){
    return await this._frame_request('api_get_element_text', {selector, opts})
  }

}

function toMacroFormat(steps) {
  return steps.map(step=>{
    let type = step.type.toLowerCase();
    switch (type){
      case 'click':
        return [
          type,
          ['selector', step.data.selector],
          step.data.pos,
          {frame: step.frame || 0}
        ]
      case 'wait_doc':
        return [
          type,
          {frame: step.frame || 0}
        ]
      case 'select':
        return [
          type,
          ['selector', step.data.selector],
          step.data.value,
          {frame: step.frame || 0}
        ]
      case 'keypress':
        return [
          type,
          step.data.code,
          step.data.count,
          {page: step.page || -1}
        ]
      case 'mousemove':
        return [
          type,
          ['selector', step.data.selector],
          step.data.pos,
          {frame: step.frame || 0}
        ]
      case 'drag':
        return [
          type,
          ['selector', step.data.start.selector],
          step.data.start.pos,
          ['selector', step.data.end.selector],
          step.data.end.pos,
          {frame: step.frame || 0}
        ]
      case 'focus':
        return [
          type,
          ['selector', step.data.selector],
          {frame: step.frame || 0}
        ]
      case 'type':
        return [
          type,
          ['selector', step.data.selector],
          step.data.value,
          {frame: step.frame || 0}
        ]
      case 'scroll':
        return [
          type,
          ['selector', step.data.selector],
          step.data.left,
          step.data.top,
          {frame: step.frame || 0}
        ]
      case 'wait_for_duration':
        return [
          type,
          step.data.duration
        ]
      case 'wait_for_element':
        return [
          type,
          ['selector', step.data.selector],
          {frame: step.frame || 0}
        ]
      case 'open':
        return [
          type,
          step.data.url,
          {page: step.page || -1}
        ]
      default:
        throw new Error('Unknown step type: ' + step.type)
    }
  })
}
;
const
MAX_RETRY_COUNT_ON_EMPTY_TEXT           = 4,
MAX_RETRY_COUNT_ON_EMPTY_TEXT_FOR_HTML  = 1,
RETRY_DELAY_ON_EMPTY_TEXT               = 5;    // in sec
DEFAULT_TIMEOUT                         = 60;    // in sec

const datasource_id_type_map = {
  [C.DS_ID_JSON]: 'json',
  [C.DS_ID_UPTIME]: 'uptime',
  [C.DS_ID_TEXT]: 'text'
}

// TODO: use a better name for closeLoadersOnClose
function Runner(sieve, pageProperties = {loaderProperties: {pinned: true, active: false}, closeLoadersOnClose: true}) {
  let
  self          = this,
  startedOn     = Date.now(),
  type          = sieve.content_type,
  config        = sieve.config,
  context       = new PageContext({
    pageMods: ['locator'],
    pageProperties,
  });

  this.config = JSON.parse(JSON.stringify(config));

  this.run    = run;

  function getMetrics() {
    var
    endedOn = Date.now();
    return {
      on: startedOn,
      duration: (endedOn - startedOn) / 1000 // milliseconds
    }
  }

  addBreadcrumb({
    message: `running sieve: ${sieve.id}`,
    data: _.pick(sieve, 'id', 'user_id', 'uri', 'client_id'),
  });

  function run(resultCallback) {
    switch (type) {
      case C.TYPE_HTML:
        context.run_html(sieve, config, runnerCallback);
        break;
      case C.TYPE_FEED:
        run_feed(runnerCallback);
        break;
      case C.TYPE_JSON:
        run_datasource(runnerCallback);
        break;
      case C.TYPE_XML:
        run_xml(runnerCallback);
        break;
      default:
        resultCallback(new Err.PARAM_INVALID({
          param: 'content_type',
          value: type
        }));
        break;
    }

    self.abort  = abort;

    // Call to abnormally interrupt execution. This could be done to reset it.
    function abort() {
      runnerCallback(new Err.ABORT({
        type: SieveStore.name,
        id: sieve.id
      }));
    }

    function runnerCallback(err, data) {
      //console.log('RUNNER:runnerCallback:', err, data, new Error().stack);

      let callback = resultCallback;
      resultCallback = null;

      try {
        context._close();
      } catch(e) {
        DBG && console.error('RUNNER: error closing context:', e);
      }

      context = null;
      self = this;

      try {
        callback && callback(err, data, getMetrics());
      } catch(e) {
        DBG && console.error('RUNNER: ERROR calling callback:', e);
        // Log this error to ErrorStore for user's review
        ErrorStore.create({
          context:  'runner',
          msg:      'Failed to call result callback after running job',
          data:     JSON.stringify(sieve),
          err:      JSON.stringify(new Err.UNHANDLED(e))
        });
      }
    }
  }

  async function run_xml(callback) {
    try {
      const { text } = await DOMUtils.Xml.fetch(sieve.uri, config.request);
      const filteredXml = await DOMUtils.Xml.filter(text, config.selection);
      return callback(null, {
        data_type: C.TYPE_XML,
        data: filteredXml,
        text: filteredXml
      });
    } catch (e) {
      DBG && console.error('Error while fetching XML ', e);
      return callback(e);
    }
  }

  function run_feed(callback) {
    DOMUtils.Feed.fetch(config.uri, async function(err, feed) {
      if (err) {
        callback(err);
      } else {
        try {
          let text = await DOMUtils.Feed.getText(feed);
          callback(null, {
            data_type: C.TYPE_FEED,
            data: JSON.stringify(feed),
            text
          });
        } catch (e) {
          callback(e);
        }
      }
    })
  }

  async function run_datasource(callback) {
    const opts = { uri: sieve.uri, config };
    const { datasource_id } = sieve;
    try {
      let result = await datasources.fetchData({
        type: datasource_id_type_map[datasource_id],
        fetchOpts: opts
      })
      // console.log('ds:result:', result);
      if (config.filters) {
        result = datasources.applyFilters(result, config.filters.included);
        // console.log('ds:filtered result:', result);
      }
      return callback(null, {
        data_type: C.TYPE_JSON,
        data: JSON.stringify(result),
        text: JSON.stringify(result)
      });
    } catch (e) {
      console.error('error while fetching data', e);
      return callback(e);
    }
  }
}

// Opens a tab and runs a live monitor within the tab.
function LiveRunner(sieve) {
  var

  startedOn     = Date.now(),
  type          = sieve.content_type,
  config        = sieve.config,
  context       = new PageContext({
    pageMods: ['live']
  });

  this.run    = run;

  function getMetrics() {
    var endedOn = Date.now();
    return {
      on: startedOn,
      duration: (endedOn - startedOn) / 1000 // milliseconds
    }
  }

  function run(resultCallback) {
    switch(type) {
      case C.TYPE_HTML:
        context.run_live_html(sieve, config, runnerCallback);
        break;

      default:
        resultCallback(new Err.PARAM_INVALID({
          param: 'content_type',
          value: type
        }));
        break;
    }

    this.abort = abort;

    // Call to abnormally interrupt execution. This could be done to reset it.
    function abort() {
      try {
        context._close();
      } catch(e) {
        DBG && console.error('RUNNER: error closing context:', e);
      }

      context = null;
      self = null;

      runnerCallback(new Err.ABORT({
        type: SieveStore.name,
        id: sieve.id
      }));
    }

    function runnerCallback(err, data) {
      //console.log('RUNNER:runnerCallback:', err, data, new Error().stack);

      try {
        resultCallback(err, data, getMetrics());
      } catch(e) {
        // This should be extremely rare
        console.error('RUNNER: ERROR calling callback:', e);
        // Log this error to ErrorStore for user's review
        ErrorStore.create({
          context: 'runner',
          msg: 'Failed to call result callback after running job',
          data: JSON.stringify(sieve),
          err: JSON.stringify(new Err.UNHANDLED(e))
        });
      }
    }
  }
}

class MacroPlayerClient {

  /**
   * @type {PageContext}
   */
  pageContext

  /**
   * @type {string}
   */
  macroId


  /**
   * @param {PageContext} pageContext
   * @param {string} macroId
   * @param {{
   *   showMessage: boolean
   * }} options
   */
  constructor(pageContext, macroId, options = {showMessage: false}) {
    this.pageContext = pageContext
    this.macroId = macroId
    this.options = options
  }


  isFirstWaitDoc = true

  /**
   * @param {WebpageLoader} page
   */
  async setPageLoader(page) {
    this.pageLoader = page
    if (this.options.showMessage) {
      await this._showMessage('Starting playback')
    }
  }

  async _showMessage(message = '', hideAfter = null) {
    const prefix = 'Macro' + (message.length > 0 ? ": " : "")
    await this.pageLoader.request(0, {
      path: 'showMsg',
      data: {msg: prefix + message, hideAfter, showLogo: true},
    });
  }

  async _removeMessage() {
    await this.pageLoader.request(0, {
      path: 'removeMsg',
      data: {},
    });
  }

  async _fetchMacro() {
    const macro = await MacroStore.findOne({id: this.macroId})
    if (macro) {
      return macro
    }
    DBG && console.error("cannot find the macro for sieve", this.macroId)
    throw new Err.NOT_FOUND({
      type: "Macro",
      id: this.macroId
    })
  }

  async play() {
    const macro = await this._fetchMacro()
    let steps = macro.steps;
    DBG && console.log('macro version', macro.version);

    DBG && console.log('expressions version', expressionsMacro.VERSION);
    if (macro.version > expressionsMacro.VERSION) {
      throw {
        code: 'EMACROVER',
        msg: 'This macro was created with a newer version of the recorder. Please update the app to the latest version to use this macro.',
      }
    }

    // Until the macros v2 feature is rolled out in web,
    // we will not have version in macros. So it is imperative to check if version exists.
    if (!macro.version || macro.version === 1) {
      steps = toMacroFormat(steps);
    }
    DBG && console.log('play:steps:', steps);
    let {Player} = expressionsMacro;

    let player = new Player(steps, new BrowserWrapper(this.pageContext, this.pageLoader), (params) => params);

    player.on('statusChange', async (params) => {
      let {step} = params;
      if (step.type === "FUNCTION_CALL" && step.name === 'wait_doc') {
        if (this.isFirstWaitDoc) {
          this.isFirstWaitDoc = false
        } else {
          await this.pageLoader.waitForEvent("reset")
          await Promise.race([
              this.pageLoader.waitForEvent("port:root:init", DEFAULT_TIMEOUT * 1000),
              new Promise((_, rej) => {
                this.pageLoader.on("port:root:init:error", rej)
              })
            ]
          )
        }
      }
      this.options.showMessage && await this._showMessage(`Current Step: ${JSON.stringify(step.toJSON())}`)
      DBG && console.log(`step: , ${JSON.stringify(step.toJSON())}`);
      await wait(1000);  // TODO wait only before actions, not before effects
    });

    try {
      await player.play()
    } catch (error) {
      DBG && console.error("macro playback failed", error)
      const errorMessage = `Macro playback failed\n${error.message}`
      this.options.showMessage && await this._showMessage(errorMessage)
      const {outerHTML} = await this.pageContext._page_snapshot(this.pageLoader)
      throw {
        code: 'EMACRO',
        msg: errorMessage,
        snapshot: {
          content: outerHTML,
          uri: this.pageLoader.rootPort.uri
        },
      };
    }
    await wait(1000); // wait for other changes to take effect
    DBG && console.log('play done');
    this.options.showMessage && await this._showMessage('Completed')
  }
}

class PageContext extends BBEvent {

  static http_request = HTTP.request;

  /**
   * @param {{
   * pageMods: any,
   * pageProperties: {
   *    loaderProperties: {
   *      pinned: boolean,
   *      active: boolean,
   *    },
   *    closeLoadersOnClose: boolean
   * }
   * }} options
   */
  constructor(options = {}) {
    super();
    this.options = _.defaults(options, {
      pageProperties: {
        loaderProperties: {
          pinned: true,
          active: false,
        },
        closeLoadersOnClose: true
      }
    });
    this.pageMods = options.pageMods;
    this.pages = [];

    /**
     * contains the tabs that may get created while the macro is running.
     * This array does not contain the first tab which the page context opens
     * using the _page_load method.
     */
    this.tabs = [];

    this.macroId = undefined

    this.onTabCreatedL = (tab) => {
      this.onTabCreated(tab)
    }
    // this.addTabListener()
  }

  setMacroId(macro_id) {
    this.macroId = macro_id
  }

  addTabListener() {
    chrome.tabs.onCreated.addListener(this.onTabCreatedL)
  }

  removeTabListener() {
    chrome.tabs.onCreated.removeListener(this.onTabCreatedL)
  }

  /**
   * @param {{
   * openerTabId: number,
   * id: number,
   * groupId: number
   * }} tab
   */
  onTabCreated(tab) {
    const parentTab = (this.pages || []).find(t => {
      // TODO: add support for the openerTabID in electron
      return t.tabId === tab.openerTabId
    })
    if (!parentTab) {
      return
    }

    this.tabs.push(tab)
  }

  /**
   * @param {WebpageLoader} loader
   */
  _addLoader(loader) {
    this.pages.push(loader);
  }

  async run_html(sieve, config, runCallback) {
    if(!config.selections) {
      return runCallback({
        code: 'ECONFIG',
        msg: 'Select parts of page to monitor this page, selection is empty'
      });
    }

    const macroId = this.macroId || sieve.macro_id

    const result          = {
      data_type: C.TYPE_HTML,
      /* data and text modified after filter-ing each frame*/
      data: '',
      text: ''
    },
    timeout = config.timeout || DEFAULT_TIMEOUT; // in sec

    // TODO: can a macro take > 60 secs to execute
    const timeoutId = setTimeout(function() {
      runCallback(new Err.TIMEOUT({
        type: 'Loading page',
        time: timeout
      }));

      // override so that we don't call back again accidentally
      runCallback = function(err, data){
        DBG && console.error('runCallback called after TIMEOUT', err, data);
      };
    }, timeout*1000);

    try {
      // config.selections: [pages: [frames: { index, includes, excludes}]]
      let pageSelection = config.selections[0]; // TODO remove support for list
      pageSelection.uri || (pageSelection.uri = sieve.uri);
      pageSelection.frames.forEach(fr => {
        // XXX some selectors create index as string - convert to int
        if(typeof fr.index == 'string') {
          fr.index = parseInt(fr.index);
        }
      });

      let page = await this._page_load(pageSelection);
      if (macroId) {
        this.macroPlayerClient = new MacroPlayerClient(this, macroId)
        await this.macroPlayerClient.setPageLoader(page)
        await this.macroPlayerClient.play()
      }

      // TODO: there are too may args, only one is enough for config and the page selection
      await this.filter(sieve, config, pageSelection, page, result, runCallback)
    } catch(e) {
      runCallback(e);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async run_macro(sieve) {
    const macroId = this.macroId || sieve.macro_id

    const timeout = DEFAULT_TIMEOUT; // in sec

    const cancellablePromise = new CancellableTimeoutPromise(timeout * 1000, new Err.TIMEOUT({
      type: 'Macro',
      time: timeout
    }))

    // TODO: can a macro take > 60 secs to execute
    await Promise.race([
      new Promise(async (res, rej) => {
        try {
          let page = await this._page_load({
            uri: sieve.uri,
          });
          this.macroPlayerClient = new MacroPlayerClient(this, macroId, {
            showMessage: true
          })
          this.macroPlayerClient.showMessage = true
          await this.macroPlayerClient.setPageLoader(page)
          await this.macroPlayerClient.play()
        } catch (e) {
          rej(e)
        }
        res()
      }),
      cancellablePromise.promise,
    ])

    cancellablePromise.cancel()
  }

  async filter(sieve, config, pageSelection, page, result, runCallback) {
    await this._page_filter(config, pageSelection, page, result);
    let re    = config.regexp;
    let text  = result.text;

    if(_.isString(re)) {  // backward compatibility
      re = { expr: re, flags: 'gim' };
    }

    if(re && re.expr) {
      let matches = text.match(new RegExp(re.expr, re.flags||''));
      if(matches && matches.length > 0) {
        text = matches.join(' ');
      } else {
        text = '';
      }
    }
    result.text = text;

    if (!result.text || result.text.length === 0) {
      // If the setting is set to mark empty matches as error, record this run
      // as error.
      if (sieve.config && sieve.config.ignoreEmptyText !== false) {
        // We stumbled on empty text selection. This is not expected and hence
        // not recorded in our history.
        const {outerHTML} = await this._page_snapshot(page)
        const selectionEmptyErr = new Err.SELECTION_EMPTY()
        selectionEmptyErr.setSnapshot({
          content: outerHTML,
          uri: page.rootPort.uri,
        })
        return runCallback(selectionEmptyErr, result)
      }
    }

    runCallback(null, result);
  }

  async run_live_html(sieve, config, runCallback) {
    if(!config.selections) {
      return runCallback({
        code: 'ECONFIG',
        msg: 'Select parts of page to monitor this page, selection is empty'
      });
    }

    const timeout = config.timeout || 60; // in sec

    const timeoutId = setTimeout(() => {
      runCallback(new Err.TIMEOUT({
        type: 'Loading page',
        time: timeout
      }));

      // override so that we don't call back again accidentally
      runCallback = function(err, data){
        DBG && console.error('runCallback called after TIMEOUT', err, data);
      };
    }, timeout*1000);

    let pageSelection = config.selections[0]; // TODO remove support for list
    // config.selections: [pages: [frames: { index, includes, excludes}]]
    pageSelection.uri || (pageSelection.uri = sieve.uri);
    pageSelection.frames.forEach(fr => {
      // XXX some selectors create index as string - convert to int
      if(typeof fr.index == 'string') {
        fr.index = parseInt(fr.index);
      }
    });

    let page;
    try {
      page = await this._page_load(pageSelection);
    } catch(e) {
      return runCallback(e);
    } finally {
      clearTimeout(timeoutId);
    }

    // events are sent by content once live watcher is setup
    // add listener before 'live_init' so that we don't miss the first event
    this.listenTo(page, 'port:live:err', ({message}) => {
      runCallback(new Err.PAGE_LOAD({ message }));
    });

    this.listenTo(page, 'port:live:result', ({result: {text, html}}) => {
      // console.log('LiveRunner:result', {text, data});

      // Fitler text using regexp
      let re    = config.regexp;
      if(_.isString(re)) {
        re = { expr: re, flags: 'gim' };
      }

      if(re && re.expr) {
        let matches = text.match(new RegExp(re.expr, re.flags||''));
        if(matches && matches.length > 0) {
          text = matches.join(' ');
        } else {
          text = '';
        }
      }

      runCallback(null, {data_type: C.TYPE_HTML, data: html, text, });
    });

    this.listenTo(page, 'port:root:init', () => {
      initMonitoring();
    });

    let initMonitoring = async () => {
      // init live monitoring
      for(let frame of pageSelection.frames) {
        let selectors = this._getFrameSelectors(config, frame);
        try {
          await this.frame_request({
            id: page.id,
            frame: frame.index,
            input: {
              path: 'live_init',
              data: selectors,
            }
          });
          // console.log('LiveRunner:live_init done', page.id, frame.index);
        } catch(e) {
          console.error('Failed to live_init', e);
          return runCallback(e);
        }
      }
    }

    initMonitoring();

    // console.log('LiveRunner:live_init done for all');
  }

  _getFrameSelectors(config, frame) {
    let includes = frame.includes,
      excludes = frame.excludes || [];

    if(config.includeScript) {
      // XXX Only include scripts with text?
      includes.push(
        { type: 'xpath', expr: '//script[not(@src)]' }
      );
    } else {
      excludes.push(
        { type: 'css', expr: 'script, noscript' },
        { type: 'xpath', expr: "//@*[starts-with(name(), 'on')]" }
      );
    }
    if(config.includeStyle) {
      includes.push(
        { type: 'css', expr: "style" },
        { type: 'css', expr: "link[rel='stylesheet']" }
      );
    } else {
      excludes.push(
        { type: 'css', expr: "style" },
        { type: 'css', expr: "link[rel='stylesheet']" },
        { type: 'xpath', expr: "//@*[name() ='style']" }
      );
    }
    excludes.push(
      { type: 'css', expr: "frame" },
      { type: 'css', expr: "iframe" }
    );
    // Include base URL. It will help us get
    includes.push({ type: 'css', expr: "base" });
    return {
      excludes,
      includes,
    }
  }

  async _frame_filter(config, page, frame, result, retryCount) {
    // console.log('_frame_filter', page, {retryCount});
    let selectors  = this._getFrameSelectors(config, frame);

    const {html, text} = await this.frame_request({
      id: page.id,
      frame: frame.index,
      input: {
        path: 'filterHTMLAndGetData',
        data: selectors
      }
    });

    result.data += html;
    if (text) {
      result.text += text;
    } else if (retryCount > MAX_RETRY_COUNT_ON_EMPTY_TEXT ||
      // For cases when looking for full HTML retry once more
      (config.dataAttr == 'data' &&
        retryCount > MAX_RETRY_COUNT_ON_EMPTY_TEXT_FOR_HTML)) {
      // no more retries
    } else {
      // Text was empty. Retry after some time.
      await wait(RETRY_DELAY_ON_EMPTY_TEXT * 1000);
      return this._frame_filter(config, page, frame, result, retryCount + 1);
    }
  }

  async _page_filter(config, {delay, frames}, page, result) {
    await wait((delay||0)*1000);
    // Filter innermost frame first. Usually that means that frame
    // with highest index should be filtered first.
    frames = _.sortBy(frames, function(frame) {
      return -frame.index;
    });
    for(let frame of frames) {
      await this._frame_filter(config, page, frame, result, 0);
    }
  }

  async _page_load({uri, dynamic, frames}, callback) {
    let type = Prefs.get('x-frame-load-in') || 'tab';
    let loader = await this.page_new({
      dynamic,
      pageMods: this.pageMods,
      type,
    });
    let frameIndices = _.pluck(frames, 'index');
    await this.page_load({ id: loader.id, uri, frameIndices });
    return loader;
  }

  /**
   * @returns {
   *   outerHTML: string
   * }
   */
  async _page_snapshot(page) {
    return await this.frame_request({
      id: page.id,
      frame: 0,
      input: { path: 'getSanitizedDoc' }
    });
  }

  async closeTabs() {
    const tabIds = this.tabs.map(t => t.id)
    if (tabIds && tabIds.length > 0) {
      await chrome.tabs.remove(tabIds)
    }
  }

  _close() {
    this.off();
    this.stopListening();

    // this.removeTabListener()
    // TODO: await
    // this.closeTabs()
    // this.tabs = []

    if (this.options.pageProperties.closeLoadersOnClose) {
      this.pages.forEach(function (loader) {
        loader.destroy();
      });
    }
    this.pages = null;
  }

  _removeLoader(loader) {
    _.remove(this.pages, loader);
  }

  async page_close({id}) {
    let loader = getLoader(id);
    await loader.destroy();
    this._removeLoader(loader);
  }

  async page_load({id, uri, frameIndices}, cb) {
    if(_.isEmpty(uri)) {
      throw new Err.PARAM_INVALID({ param: 'uri', value: 'empty' });
    }
    let loader = getLoader(id);
    await loader.load(uri, {frameIndices});

    // Call after a delay of few seconds to handle cases where js loads
    // content dynamically?
    await wait(2000);
  }

  async page_new(options) {
    //console.log('page_new:create:', options);
    options.info || (options.info = {});
    if (isElectron()) {
      options.info.windowOptions = {
        show: false
      };
      options.type = 'offscreen_window';
    }
    options.info = {
      ...options.info,
      ...this.options.pageProperties.loaderProperties,
    }
    let loader = await createLoader(options);
    this._addLoader(loader);

    return loader;
  }

  async frame_request({id, frame, input}) {
    let loader = getLoader(id);
    return await loader.request(frame, input);
  }

}

/**
 * Finds browser and give it back to the caller if browser is found.
 *
 * @return {WebpageLoader}
 */
function getLoader(id) {
  var loader = WebpageLoader.get(id);
  if(!loader) throw new Err.NOT_FOUND({ type: 'loader', param: 'id', id, });
  return loader;
}
;
const DOMUtils = {
  call: async function (method, ...args) {
    return method(...args);
  },
}
DOMUtils.Feed = Feed;
DOMUtils.Xml = Xml;
window.DOMUtils = DOMUtils;
;
const DATE_START = new Date();
const BROADCAST_HEARTBEAT_TIMEOUT = 120000; // 2 minutes
DBG && console.log('init main', DATE_START);

function upgradeCheck() {
  const version = Prefs.get('version');
  const newVersion = CFG.VERSION;

  if (!version) {
    Prefs.set('version', newVersion);

    // We are a new install. Show getting started page.
    setTimeout(function () {
      !DEV && !isElectron() && chrome.tabs.create({
        url: CFG.URL.WELCOME + '?utm_source=install',
        active: true,
      });
    }, 2000);
  } else if (version != newVersion) {
    const oldDate = version.split('.').pop();
    Prefs.set('version', newVersion);
    /*
    setTimeout(function() {
      showUpdateNotes(version, newVersion);
    }, 2000);
    */
  }
}


const diffWorker = new DiffWorker({ url: CFG.URL.DIFFWORKER });

const Scheduler = (function () {
  const q = [];
  const liveRunners = {};
  const runners = {};

  let timeouts = {}, count = 0;
  let checkInetervalId;
  let nActive = 0;

  //clientid changes on other peer disconnection
  let clientIds = [];
  const groupDetails = {};
  let initialized = false;

  function checkQueue() {
    // Check queue for schedule jobs and runs them when its their turn. Run it
    // only if there is an empty slot.
    const
      nMaxWorkers = Prefs.get('nworkers');


    const nWaiting = q.length;
    if (nWaiting > 0 && nActive < nMaxWorkers) {
      const id = q.shift();
      SieveStore.findOne(id, {
        only: ['id', 'name', 'uri', 'config', 'content_type', 'schedule',
          'err', 'client_id', 'rule_id', 'state', 'tags', 'user_id', 'macro_id', 'datasource_id'],
      }, function (err, sieve) {
        if(!sieve) {
          // could have been deleted after it was added to queue
          // XXX FIXME was it not deleted from `q`?
          return;
        }
        // allow turned off monitors so that manually run but paused monitors
        // work
        if (!isReadyToRun(sieve, true)) {
          // when sieve is not ready, return. clear any check state to make
          // sure that we don't show any checking state in the ui
          gEvents.trigger('worker:sieve:state', {
            id: sieve.id,
            state: C.RUN_STATE_INIT,
          });
          return;
        }

        sieve.config = JSON.parse(sieve.config);

        // DBG && console.log('Scheduler:checkQueue:findOne:', sieve);
        if (willAbortAndCanRun(sieve)) {
          run(sieve, function (err) {
            // console.log('Scheduler:run:callback:', err, sieve.id);
            // err && console.error('Error running:', sieve, err);

            count += 1;
            nActive -= 1;

            if (!(err && Err.ABORT.si(err))) {
              // Schedule again iff it has not been aborted by Scheduler.this
              schedule(sieve);
            } else {
              // Ignore errors that are ABORTs since they are called by
              // scheduler
            }
          });

          // Increment counter iff the worker started successfully.
          nActive += 1;
        }

        if (nActive < nMaxWorkers && nWaiting > 1) {
          setTimeout(checkQueue, 200);
        }
      });
    }
  }

  function deSchedule(sieveOrId) {
    // DBG && console.log('deSchedule:sieveOrId:', sieveOrId);

    const id = _.isString(sieveOrId) ? sieveOrId : sieveOrId.id;
    const timeoutId = timeouts[id];
    const liveRunner = liveRunners[id];

    if (timeoutId) {
      delete timeouts[id];
      clearTimeout(timeoutId);
    }

    if (liveRunner) {
      liveRunner.abort();
    }
    // What if the sieve is already being run? Let that run and finish.
  }

  function getScheduleOn(sieve, callback) {
    const schedule = sieve.schedule;

    WorkStore.find({
      rel: SieveStore.name,
      key: sieve.id,
    }, {
      limit: 10,
      only: ['id', 'err', 'ts'],
      order: ['-ts'],
    }, function (err, result) {
      if (err) {
        callback(err);
      } else {
        const scheduler = ScheduleDescriptors[schedule.type];
        if (!scheduler) {
          callback(new Err.TYPE_UNKNOWN({
            type: 'scheduler',
            value: schedule.type,
          }));
        } else {
          callback(null, scheduler.getSchedule(schedule.params, result.data));
        }
      }
    });
  }

  function onUpdate(sieve) {
    // console.log('onUpdate:', sieve);
    const {id, state} = sieve;
    if ((state != void 0) && (state != C.STATE_READY)) {
      // console.log('onUpdate:deSchedule', sieve);
      deSchedule(id);
    } else if (state == C.STATE_READY) {
      // console.log('onUpdate:schedule', sieve);
      schedule(id);
    } else if ('schedule' in sieve) {
      // console.log('onUpdate:schedule', sieve);
      schedule(id);
    }
  }

  function processResult(sieve, result, doneCallback) {
    // console.log('processResult:result:', result);
    const dataAttr = sieve.config.dataAttr || 'text';
    const ignoreWhitespace = sieve.config.ignoreWhitespace !== false;

    SieveDataProxy.find({
      sieve_id: sieve.id,
    }, {
      only: ['id', 'ts', 'text', 'data'],
      order: ['-ts'],
      limit: 1,
    }, function (err, res) {
      if (err) {
        // console.error('Scheduler:failed to find sieve data', err);
        doneCallback(err);
      } else {
        const lastData = res.count > 0 ? res.data[0] : null;
        const
          RE_WHITESPACE = /\s|\b/g;


        const RE_SPLIT = /\s+|\b/g;


        const equal = lastData &&
          (ignoreWhitespace ?
            _.isEqual(lastData[dataAttr].replace(RE_WHITESPACE, ''),
              result[dataAttr].replace(RE_WHITESPACE, ''))
            :
            _.isEqual(lastData[dataAttr].split(RE_SPLIT),
              result[dataAttr].split(RE_SPLIT))
          );

        if (equal) {
          if (sieve.err) {
            // Clear error from previous run
            SieveStore.update(sieve.id, { err: null }, doneCallback);
          } else {
            // Do nothing.
            doneCallback();
          }
        } else {
          saveData(lastData);
        }
      }
    });

    function saveData(lastData) {
      const
        now = Date.now();


      const ts = (new Date(now)).toISOString();


      const ts_view = (new Date(now + 1)).toISOString();
      // Save data
      async.parallel({
        sieve_data: function (callback) {
          SieveDataStore.create(_.extend({
            sieve_id: sieve.id,
            ts,
            ts_mod: ts,
            client_id: Prefs.get('client.id')
          }, result), callback);
        },
        sieve: function (callback) {
          const
            doc = {
              err: null,
              // Trim text content for preview
              text: result.text.slice(0, 199),
              ts_data: ts,
            };
          if (!lastData) {
            doc.ts_view = ts_view;
          }
          SieveStore.update(sieve.id, doc, callback);
        },
      }, async function (err, results) {
        doneCallback(err);

        if (!lastData) {
          return;
        }

        function getSummary(diffs) {
          // console.log('diffs:', diffs);
          let firstIns = -1;
          let firstInsEnd = -1;
          let len = 0;
          let summary = _.reduce(diffs, function (buff, aDiff) {
            const op = aDiff[0];
            let text = aDiff[1];

            if (op == DIFF_EQUAL) {
              buff.push(text);
              len += text.length;
            } else if (op == DIFF_INSERT) {
              text = '*' + text.trim() + '*';
              buff.push(text);
              if (firstIns < 0) {
                firstIns = len;
                firstInsEnd = firstIns + text.length;
              }
              len += text.length;
            }
            return buff;
          }, []).join('');

          if (firstIns > 40) {
            if (firstInsEnd > 80) {
              // XXX Slice on a word boundary
              summary = '...' + summary.slice(firstIns - 10);
            }
          }

          return summary.slice(0, 199);
        }

        const curData = results.sieve_data;

        if(!diffWorker.ready){
          await diffWorker.init();
        }
        let diffs;
        try {
          diffs = await diffWorker.diff(lastData.text, curData.text, {type: 'text'});
        } catch (err) {
          DBG && console.error('Scheduler:failed to diff', err);
          diffs = [[diff_match_patch.DIFF_INSERT, curData.text]];
        }

        const dels = _.reduce(diffs, function (buff, aDiff) {
          if (aDiff[0] == DIFF_DELETE) {
            buff.push(aDiff[1]);
          }
          return buff;
        }, []).join(' ');


        const inserts = _.reduce(diffs, function (buff, aDiff) {
          if (aDiff[0] == DIFF_INSERT) {
            buff.push(aDiff[1]);
          }
          return buff;
        }, []).join(' ');

        if(sieve.tags) {
          let tagIds = sieve.tags.split(',');
          let tagDocs = (await TagStore.find({
            'id.in': tagIds,
            state: C.STATE_DEFAULT,
          })).data;
          sieve.tags = _.map(tagDocs, doc => doc.name).join(',');
        }

        const context = {
          sieve,
          sieve_data: results.sieve_data,
          old_sieve_data: lastData, // added for matchRule
          items: [curData, lastData],
          diffs,
          dels,
          inserts,
        };

        /*
        if(curData.text.length > 80) {
          // Focus on changes in preview.
          SieveStore.update(sieve.id, { text: getSummary(diffs) });
        }
        */
        ActionManager.computeActions(context);

        // Prune old data that is outside of storage units
        SieveDataStore.destroyWithSubQuery({
          sieve_id: sieve.id,
        }, {
          limit: 10,
          offset: Prefs.get('nhist') || 10, // limit according to client's abilities
          order: ['-ts'],
        }, function (err) {
          if (err) {
            DBG && console.error('Scheduler:SieveDataStore:destroyWithSubQuery', err);
          }
        });
      });
    }
  }

  function qNow(id) {
    deSchedule(id);
    q.push(id);

    gEvents.trigger('worker:sieve:state', {
      id,
      state: C.RUN_STATE_WAIT,
    });
  }

  function resetAll() {
    _.each(_.values(timeouts), deSchedule);
    _.each(_.values(runners), stop);
    updateCliendIds();
  }

  function run(sieve, callback) {
    // console.log('Scheduler:run:', sieve);
    const runner = new Runner(sieve);

    // Keep reference for control.

    runners[sieve.id] = runner;

    runner.run(function (errRun, result, metrics) {
      // console.log('Scheduler:run:runner.run:', errRun, result, metrics);
      delete runners[sieve.id];
      sieveResultHandler(sieve, errRun, result, metrics, callback);
    });

    gEvents.trigger('worker:sieve:state', {
      id: sieve.id,
      state: C.RUN_STATE_WIP,
    });
  }

  function runLive(sieve) {
    const oldRunner = liveRunners[sieve.id];

    if (oldRunner) {
      // console.log('LiveRunner already running');
      return;
    }

    const liveRunner = new LiveRunner(sieve);

    liveRunners[sieve.id] = liveRunner;

    liveRunner.run(function (errRun, result, metrics) {
      if (errRun) {
        DBG && console.error('Error running live monitor', errRun, sieve);
        if (Err.ABORT.si(errRun)) {
          // deSchedule aborts a liveRunner. Remove the runner here after the
          // abort. It should be re-scheduled later
          delete liveRunners[sieve.id];
        } else if (Err.TIMEOUT.si(errRun)) {
          liveRunner.abort();
        }
      }
      sieveResultHandler(sieve, errRun, result, metrics, function (err) {
        if (!err) {
          return;
        }
      });
    });
  }

  function sieveResultHandler(sieve, errRun, result, metrics, callback) {
    if (errRun && Err.ABORT.si(errRun)) {
      callback(errRun);
      return;
    }

    const work = {
      rel: SieveStore.name,
      key: sieve.id,
      duration: metrics ? metrics.duration : 0,
    };

    let snapshot
    if (errRun) {
      snapshot = errRun.snapshot ? errRun.snapshot : undefined
      if (snapshot) {
        delete errRun.snapshot
      }

      WorkStore.find({
        key: sieve.id,
      }, {
        limit: 1,
        only: ['id', 'err', 'ts'],
        order: ['-ts'],
      }, function (err, result) {
        if (err) {
          console.error('Error querying WorkStore', err);
        } else {
          const lastError = result.count > 0 ? JSON.parse(result.data[0].err) : null;
          errRun.count = lastError && lastError.count ? lastError.count + 1 : 1;
        }
        work.err = JSON.stringify(errRun);
        insertWork();
      });

      if(!errRun.code) {
        // log unknown error so that we can fix it
        logMessage('sieve: unknown run error', {extra: {errRun, sieve}});
      }
    } else {
      insertWork();
    }

    async function insertWork() {
      let savedWork
      try {
        savedWork = await WorkStore.create(work)
      } catch (err) {
        DBG && console.error('Scheduler: failed to save work result to DB', err);
      }

      if (snapshot) {
        try {
         const res = await SieveSnapshotStore.create({
            sieve_id: sieve.id,
            work_id: savedWork.id,
            uri: snapshot.uri,
            content: snapshot.content,
            content_type: 'text/html',
          })

          await WorkStore.update({id: savedWork.id}, {snapshot_id: res.id});
        } catch (err) {
          DBG && console.error('SieveSnapshotStore: cannot insert the snapshot', err);
        }
      }

      if (errRun) {
        await SieveStore.update(sieve.id, {err: work.err})
        try {
          ErrorActions.handleError(sieve, errRun);
        } catch (e) {
          console.error('Error calling handleError', e);
        }

        callback(errRun);
      } else {
        processResult(sieve, result, callback);
      }

      try {
        const result = await WorkStore.find({rel: SieveStore.name, key: sieve.id,}, {
          limit: 10,
          offset: 10,
          order: ['-ts'],
          only: ['id']
        })
        if (result.count > 0) {
          await SieveSnapshotStore.destroyWithSubQuery({"work_id.in": result.data.map((d) => d.id),}, {})
        }
      } catch (err) {
        DBG && console.error('Scheduler:WorkStore:create:SieveSnapshotStore:destroy:err', err);
      }

      // Delete old entries from work log.
      // TODO Collect metrics into a stats table to summarize activity.
      try {
        await WorkStore.destroyWithSubQuery({
          rel: SieveStore.name,
          key: sieve.id,
        }, {
          limit: 10,
          offset: 10,
          order: ['-ts'],
        });
      } catch (err) {
        DBG && console.error('Scheduler:WorkStore:create:destroy:err', err);
        // A case of unhandled error.
      }

      if (sieve.client_id !== Prefs.get('client.id')) {
        const workTable = {
          name: 'work',
          data: work
        }
        PeerConnection.sendAllPeers(workTable);
      }
    }

    gEvents.trigger('worker:sieve:state', {
      id: sieve.id,
      state: C.RUN_STATE_INIT,
    });
  }

  function isReadyToRun(sieve, allowPaused = false) {
    const user_id = auth.getId();
    return (sieve
      && clientIds.includes(sieve.client_id)
      && (!user_id || sieve.user_id == user_id)
      && (allowPaused || sieve.state == C.STATE_READY));
  }

  function schedule(sieve, callback) {
    callback || (callback = function (err) {
      if (err) throw err;
    });
    // console.log('Clients Monitoring: ', clientIds)
    const id = _.isString(sieve) ? sieve : sieve.id;

    SieveStore.findOne(id, function (err, sieve) {
      if (!isReadyToRun(sieve)) {
        deSchedule(id);
        return;
      }

      sieve.config = JSON.parse(sieve.config);
      sieve.schedule = JSON.parse(sieve.schedule);

      if (sieve.schedule.type == 'LIVE') {
        // Start live runner
        runLive(sieve);
        callback();
        return;
      }

      getScheduleOn(sieve, function (err, scheduleOn) {
        if (err) {
          DBG && console.error('Error getting schedule:', sieve, err);
          callback(err);
        } else if (scheduleOn < 0) {
          // There is no need to schedule it according to its parameters.
          // DBG && console.log('Scheduler:not scheduled:', sieve.id, sieve.name);
          callback();
        } else {
          // console.log('Scheduler: schedule:', sieve.id, sieve.name, scheduleOn-Date.now()/1000);
          deSchedule(id);

          // XXX limit min and max https://stackoverflow.com/a/43358488
          const intervalInMs = Math.max(Math.min(scheduleOn * 1000 - Date.now(), 0x7FFFFFFF), 0);
          timeouts[sieve.id] = setTimeout(function () {
            // XXX There could be a subtle bug when the timeout for this sieve is
            // set after it was scheduled.
            qNow(sieve.id);
          }, intervalInMs);

          callback();
        }
      });
    });
  }
  function scheduleMonitors(offset=0) {
    SieveStore.find({
      state: C.STATE_READY,
      'client_id.in': clientIds,
      $or: [
        ['user_id', auth.getId()],
        ['user_id', null],
      ],
    }, {
      limit: 1000,
      offset: offset,
      only: ['id', 'schedule', 'client_id', 'ts'],
      order: ['-ts'],
    }, function (err, result) {
      // console.log('monitoring: clients: ', [...clientIds], '; sieves: ', result.data, 0);
      if (err) {
        console.error('Failed to schedule.', err);
        // XXX Severe error, unilkely to happen.
      } else {
        async.eachSeries(result.data, schedule, function (err) {
          if (err) {
            DBG && console.error('Error scheduling:', err);
          } else {
            if (result.total_count > (result.count + result.offset)) {
              scheduleMonitors(result.offset + result.count);
            }
          }
        });
      }
    });
  }
  function updateClientIds() {
    initiatePeerTable();
    scheduleMonitors();
  }

  function checkAndElectCoordinator(closedConnId) {
    const closedPeerGroup = PeerConnection.getClientsGroup(closedConnId);
    const clients = _.clone(PeerConnection.getClients());
    let coordinator;
    const orderedClients = {};
    Object.keys(clients).sort().forEach(function (key) {
      orderedClients[key] = clients[key];
    });

    // console.log(closedPeerGroup, clients)
    if (closedPeerGroup !== undefined) {
      for (let group of closedPeerGroup) {
        let count = 0, conn;
        if (group === C.DEFAULT_GROUPID && !clientIds.includes(C.DEFAULT_GROUPID) && groupDetails[C.DEFAULT_GROUPID] === closedConnId) {
          for (let id in orderedClients) {
            if (orderedClients[id] === C.CLIENT_ACTIVE) {
              coordinator = id;
              break;
            }
          }
          electCoordinator(1, coordinator, null, C.DEFAULT_GROUPID);
        } else if (group !== C.DEFAULT_GROUPID && groupDetails[group] === closedConnId) {
          for (conn of PeerConnection.getConnections(group)) {
            if (conn !== null) {
              if (clients[conn] === C.CLIENT_ACTIVE && count <= 2) {
                count++;
                coordinator = conn;
              } else if (count > 1) {
                break;
              }
            }
          }
          electCoordinator(count, coordinator, conn, group);
        }
      }
    } else {
      if(!clientIds.includes(C.DEFAULT_GROUPID)) {
        electCoordinator(1, Prefs.get('client.id'), null, C.DEFAULT_GROUPID);
      }
    }
    const msg = {
      name: 'group',
      data: groupDetails
    }
    PeerConnection.sendAllPeers(msg);
    scheduleMonitors();
  }

  function electCoordinator(count, coordinator, conn, group) {
    if (((count >= 1 && coordinator === Prefs.get('client.id')) || (count <= 1 && conn === Prefs.get('client.id'))) && clientIds[clientIds.length - 1] !== C.DEFAULT_GROUPID) {
      clientIds.push(group);
      groupDetails[group] = coordinator;
    }
  }

  function willAbortAndCanRun(sieve) {
    // If it is already running, stop current runner and remove its references.
    const oldRunner = runners[sieve.id];

    if (!oldRunner) {
      return true;
    }

    if (!_.isEqual(sieve.config, oldRunner.config)) {
      oldRunner.abort();
      delete runners[sieve.id];
      return true;
    }

    return false;
  }

  function initiatePeerTable() {
    const localGroup = loadClientIds();
    makeCoordinator(localGroup);
    clientIds =  _.union(localGroup, [Prefs.get('client.id')]);
  }

  function makeCoordinator(localGroup) {
    for (let peer_id of localGroup) {
      groupDetails[peer_id] = Prefs.get('client.id');
    }
    if (Object.entries(groupDetails).length !== 0) {
      const msg = {
        name: 'group',
        data: groupDetails
      }
      PeerConnection.sendAllPeers(msg);
    }
  }
  function loadClientIds() {
    let localGroup = _.clone(PeerConnection.getOwnGroups());
    const clients = _.clone(PeerConnection.getClients());
    for (let client in clients) {
      let clientsGroup = PeerConnection.getClientsGroup(client);
      if (clients[client] === C.CLIENT_ACTIVE && client !== Prefs.get('client.id') && Object.entries(localGroup).length !== 0) {
        localGroup = localGroup.filter(item => {
          if (groupDetails[item] === Prefs.get('client.id')) {
            return true;
          } else if (item !== undefined && clientsGroup !== undefined) {
            return clientsGroup.indexOf(item) < 0;
          } else if (clientsGroup === undefined && item === C.DEFAULT_GROUPID) {
            return false;
          }
        });
      }
    }
    return localGroup;
  }
  function onPeerConnect(conn) {
    const msg = {
      name: 'group',
      data: groupDetails
    }
    conn.send(msg);
  }

  function updateGroupDetails(groups) {
    for (let peer_id in groups) {
      groupDetails[peer_id] = groups[peer_id];
    }
  }
  return {
    isBusy: function () {
      return _.size(runners) > 0;
    },

    checkNow: function (ids) {
      _.each(ids, qNow);
    },

    getInfo: function () {
      return { count, initialized, nActive, nQueued: q.length, clientIds };
    },

    init: function () {
      if (initialized) this.uninit();
      PeerConnection.init();
      _.delay(updateClientIds, 6000);
      checkInetervalId = setInterval(function () {
        checkQueue();
      }, 1000);
      gEvents.on('store:' + SieveStore.name + ':create', schedule);
      gEvents.on('store:' + SieveStore.name + ':update', onUpdate);
      gEvents.on('store:' + SieveStore.name + ':destroy', deSchedule);

      gEvents.on('store:' + ClientGroupStore.name + ':create', PeerConnection.init);
      gEvents.on('store:' + ClientStore.name + ':create', PeerConnection.peerConnect);
      gEvents.on('store:' + ClientGroupStore.name + ':update', PeerConnection.init);

      PeerConnection.on('update:clients', updateClientIds);
      PeerConnection.on('change:clients:disconnect', checkAndElectCoordinator);
      PeerConnection.on('change:clients:peerconnected', onPeerConnect);
      PeerConnection.on('change:clients:updateGroup', updateGroupDetails);

      initialized = true;
    },

    uninit: function () {
      initialized = false;

      clearInterval(checkInetervalId);

      gEvents.off('store:' + SieveStore.name + ':create', schedule);
      gEvents.off('store:' + SieveStore.name + ':update', onUpdate);
      gEvents.off('store:' + SieveStore.name + ':destroy', deSchedule);

      _.each(_.values(runners), function (runner) {
        runner.abort();
      });
      _.each(_.values(liveRunners), function (runner) {
        runner.abort();
      });

      _.each(timeouts, clearTimeout);
      timeouts = {};

      q.splice(0);
      PeerConnection.uninit();
      gEvents.off('store:' + ClientGroupStore.name + ':create', PeerConnection.init);
      gEvents.off('store:' + ClientStore.name + ':create', PeerConnection.peerConnect);
      gEvents.off('store:' + ClientGroupStore.name + ':update', PeerConnection.init);

      PeerConnection.off('update:clients', updateClientIds);
      PeerConnection.off('change:clients:disconnect', checkAndElectCoordinator);
      PeerConnection.off('change:clients:peerconnected', onPeerConnect);
      PeerConnection.off('change:clients:updateGroup', updateGroupDetails);
    },
  };
})();

var ActionManager = (function () {
  async function computeActions(context) {

    let {sieve} = context;

    let promises = [
      UserStore.findOne(auth.getId()),
      ActionStore.find({ sieve_id: sieve.id, state: 0, }),
    ];

    if (sieve.rule_id) {
      promises.push(RuleStore.findOne(sieve.rule_id));
    }

    let [user, rActions, rule] = await Promise.all(promises);
    user || (user = {id: 0, prefs: {}});

    let globalActions = await getGlobalActions(user);
    let actions = dedupeActions([...globalActions, ...rActions.data]);

    context.actions = actions;
    context.rule = rule;

    // console.log('computeActions: context after diff: ', context);

    let matched = true;
    matched = matchRule(context, user.prefs);
    await updateSieveDataWithConditions(context, user.prefs, matched);
    if (matched) {
      await setContextDiff(context, user);
      takeActions(context);
      // Broadcast audio and popup actions to other peers
      const actions = context.actions.filter(
        (action) => action.type == C.ACTION_LOCAL_POPUP || action.type == C.ACTION_LOCAL_AUDIO
      );
      if (actions.length > 0) {
        const remoteContext = { ...context, actions };
        PeerConnection.sendAllPeers({
          name: 'notification',
          data: remoteContext
        });
      }
    } else {
      // Mark item as read
      SieveStore.update(sieve.id, { ts_view: Date.now() });
    }
  }

  async function updateSieveDataWithConditions(context, prefs, matched) {
      const sieveConditions = context.rule;
      const globalConditions = prefs.rule;
      const sieveConditionVersion = sieveConditions?.version ?? '';
      const globalConditionVersion = globalConditions?.version ?? '';
      const sieveRule = JSON.parse(sieveConditions?.config ?? '{}');

      const metaConditions = {
        rule: {
          global: {
            rules: { rule: globalConditions ?? {} },
            version: globalConditionVersion
          },
          sieve: {
            rules: sieveRule ?? {},
            version: sieveConditionVersion
          }
        }
      }

      const metaConditionsString = JSON.stringify(metaConditions);
      await SieveDataStore.update(
        { id: context.sieve_data.id },
        {
          meta: metaConditionsString,
          triggered: matched
        }
      );
  }

  function takeActions(context) {
    // console.log('takeActions:', context);
    async.each(context.actions, function (action, callback) {
      const desc = ActionDescriptors[action.type];
      if (!desc) {
        DBG && console.error('Invalid action type', action);
        callback(new Err.NOT_FOUND({
          type: 'action:desc',
          id: action.type,
        }));
      } else {
        // console.log('ActionManager:takeAction:', action);
        action = { ...action, config: JSON.parse(action.config||null) }
        // action.config && (action.config = JSON.parse(action.config));
        desc.act(action, context, callback);
      }
    });
  }


  return {

    computeActions,

    init: function () {
      // Start listening to events that result in actions.
      // Listen for action events sent by peers
      PeerConnection.on('change:clients:notification', onNotification);
      function onNotification(context) {
        setTimeout(takeActions, 2000, context);
      }
    },

    uninit: function () {
      // Remove peer notification listener or let remote notifications come?
    },
  };
})();

async function getGlobalActions({id, prefs}) {
  if(!prefs) {
    logMessage('user: prefs missing:', {extra: {id, }});
    return [];
  }
  let actions = prefs.actions;
  let hasApp = !!await AttrStore.findOne({
    user_id: id,
    'name.in': ['apns_id', 'fcm_id', ],
    state: C.STATE_DEFAULT,
  });

  if(hasApp && actions == null) {
    actions = [{
      type: C.ACTION_PUSH,
      config: null,
    }];
  }

  return actions || [];
}

function dedupeActions(actions) {
  return _.uniq(actions, (action) => action.type+action.config);
}

// set notification email content
async function setContextDiff(context, user) {
  if (!user.id) {
    return;
  }
  const newData = context.items[0];
  const oldData = context.items[1];

  // TODO set default behaviour if prefs not set

  const emailPrefs = _.defaults(user?.prefs?.action_email || {}, {
    content_type: 'HTML',
    highlighted: true,
    snipped: true,
    mode: 'SPLIT'
  });

  const { content_type } = context.sieve;
  switch (content_type) {
    case C.TYPE_FEED:
      try {
        context.html = await diffWorker.diffAndRenderEmail(oldData.data, newData.data, { type: 'feed' });
      } catch (e) {
        console.error('error:setContextDiff:feed: ', e);
      }
      break;
    case C.TYPE_JSON:
      try {
        context.html = await diffWorker.diffAndRenderEmail(oldData.data, newData.data, {
          type: 'json',
          emailOpts: emailPrefs
        });
      } catch (e) {
        console.error('error:setContextDiff:json: ', e);
      }
      break;
    default:
      // html diff
      const isHTML = emailPrefs.content_type == 'HTML';
      const newHtml = isHTML ? newData.data : `<div>${newData.text}</div>`;
      const oldHtml = isHTML ? oldData.data : `<div>${oldData.text}</div>`;

      // in html diff, xml tags are preserved as-is but xml diff needs <,> in xml tags to be replaced with $lt; and $gt;
      // html : <span><note></note></span>
      // text: <span>&lt;note&gt;&lt;/note&gt;</span>
      try {
        let result = await diffWorker.diffAndRenderEmail(oldHtml, newHtml, {
          type: content_type === C.TYPE_XML ? 'text' : 'html',
          emailOpts: { oldTs: oldData.ts, ...emailPrefs }
        });
        context.html = result;
      } catch (e) {
        context.html = newHtml;
        console.error('error:setContextDiff:email: ', e);
      }
  }
}

function setDiffStyle(doc) {
  setStyle(doc.querySelectorAll('.removed'), 'background-color', '#ff9494');
  setStyle(doc.querySelectorAll('.inserted'), 'background-color', '#b7fdcb');

  setStyle(doc.querySelectorAll('span.inserted, span.removed'), 'padding', '1px 4px');

  setStyle(doc.querySelectorAll('a.removed, a .removed'), 'color', '#008');

  setStyle(doc.querySelectorAll('img.removed'), 'border', 'solid 2px red');
  setStyle(doc.querySelectorAll('img.removed'), 'background-color', 'transparent');
  setStyle(doc.querySelectorAll('img.removed'), 'padding', '2px');

  setStyle(doc.querySelectorAll('img.inserted'), 'border', 'solid 2px green');
  setStyle(doc.querySelectorAll('img.inserted'), 'background-color', 'transparent');
  setStyle(doc.querySelectorAll('img.inserted'), 'padding', '2px');

  function setStyle(els, name, value) {
    _.each(els, function (el) {
      el.style[name] = value;
    });
  }
}

function Service(options) {
  const self = this;

  this.options = _.extend({}, this.OPTIONS, options);
  this.active = true;
  this.state = new Backbone.Model({ unread: 0, error: 0, sync: {
      syncing: false,
      name: null,
      err: null
    } }); // for ui
  this.initialized = false;
  this.initError = null;

  _.extend(this, Backbone.Events);

  this.once('init:stores', () => {
    // The most important step in init is preparing stores. So setting flag here
    // even when other parts that are super critical may fail
    this.initialized = true;

    initLocale();
  });


  this.init((err) => {
    if (Prefs.get('sieve-slot.enabled')) {
      Prefs.set('active', checkSlot());
    }

    setInterval(() => {
      if (Prefs.get('sieve-slot.enabled')) {
        Prefs.set('active', checkSlot());
      }
    }, 60000);

    Prefs.on('change:sieve-slot.enabled', (enabled) => {
      if (enabled) {
        Prefs.set('active', checkSlot());
      } else {
        Prefs.set('active', true);
      }
    });

    if (err) {
      console.error('Failed to init distill service:', err);
      this.initError = err;
      this.trigger('init:error', err);
    }

    upgradeCheck();

    auth.on('login', () => {
      // Called whenever user's logged in status changes
      if (auth.isReady()) {
        this.active && Scheduler.init();
        this.initData();
        this.updateState();
      }
    });

    auth.on('expired', () => {
      Scheduler.uninit();
      chrome.tabs.query({ url: CFG.URL.BASE + '*' }, function (tabs) {
        tabs.forEach((tab) => chrome.tabs.update(tab.id, { url: tab.url }));
      });
    });

    auth.on('logout', () => {
      this.setEventSource(null);
    });
  });
}

_.extend(Service.prototype, {

  appUrl: CFG.URL.WATCHLIST,

  serviceLoginUrl: CFG.URL.LOGIN,

  Scheduler: Scheduler,

  SyncMan: SyncMan,

  heartbeatTimer: null,

  checkNow: Scheduler.checkNow,

  getInfo: function () {
    return {
      active: this.active,
      ready: this.ready,
      errEventSource: this.errEventSource,
      initError: this.initError,
      initialized: this.initialized,
      scheduler: Scheduler.getInfo(),
    };
  },

  toggleService: function () {
    Prefs.set('sieve-slot.enabled', false);
    Prefs.set('active', !Prefs.get('active'));
  },

  // add listener that will be called back after service has inititalized
  afterInit: function (callback) {
    // NOTE Order of initialized and initError is important
    if (this.initialized) {
      callback();
    } else if (this.initError) {
      callback(this.initError);
    } else {
      this.once('init:stores', function () {
        try {
          callback();
        } catch (e) {
          // NOTE An error in one callback doesn't affect others
          console.error('Error calling afterInit callback', e);
        }
      });
      this.once('init:error', function (err) {
        try {
          callback(err);
        } catch (e) {
          console.error('Error calling afterInit callback', e);
        }
      });
    }
  },

  init: function (callback) {
    // gEvents.off('store:'+SieveDataStore.name+':create', this.onSieveDataCreate, this);
    gEvents.on('store:' + SieveDataStore.name + ':create', this.onSieveDataCreate, this);
    SyncMan.on("all", (eventName, err, _) => {
      if (eventName.endsWith(":sync:init")) {
        const storeName = eventName.split(":sync")[0]
        this.state.set("sync", {
          syncing: true,
          name: storeName
        })
      } else if (eventName.endsWith(":sync")) {
        const storeName = eventName.split(":sync")[0]
        this.state.set("sync", {
          syncing: false,
          name: storeName,
          err
        })
      }
    })

    this.initData(callback);
  },

  initData: function (callback) {
    async.series([
      initStores,
      (callback) => {
        this.trigger('init:stores');
        callback();
      },
      SyncId.init,
      (callback) => {
        auth.init(function (err) {
          // console.log('auth.init done');
          // TODO Add error to message store for review by user.
          err && console.error('Failed to init auth', err);
          callback();
        });
      },
      initData,
      (callback) => {
        this.triggerInit();
        this.initSync(callback);
      },
    ], callback);
  },

  isReady() {
    return this.ready;
  },

  isActive() {
    return this.active;
  },

  triggerInit: function () {
    this.ready = true;
    this.trigger('init init:data');
    gEvents.trigger('init');
  },

  initSync: promisifyOrCallback(function (callback){
    callback || (callback = function () { });

    if (SyncMan.canSync()) {
      api('/users/constraints', (err, constraint) => {
        if (err) {
          if (err.status == 401 || err.status == 403) {
            callback(err);
            // Do not retry in case of authentication failure
            // XXX sync inits after auth resets.
            // TODO Check various authentication and network failure modes
            // TODO Flag this error to user so that they can take action
            return;
          }

          let
            retryInterval = 300000; // 5 mins
          if (err.status == 403) {
            retryInterval = 3600000;
          } else if (err.status == 0 || err.status >= 500) {
            // temporary interruption
            retryInterval = 5000;
          }

          setTimeout(() => this.initSync(), retryInterval); // Retry
          callback(); // XXX Don't send back error
        } else {
          if (constraint.sync == 'S') {
            SyncMan.accountEnabled = true;
            // SyncMan.sync(false, callback);
            this.createEventSource(callback);
          } else {
            callback();
          }
        }
      });
    } else {
      // console.log('auth not set, cant create event source');
      this.setEventSource(null);
      callback();
    }
  }),

  createEventSource: function (callback) {
    callback || (callback = function () { });
    createEventSource((err, res) => {
      this.errEventSource = err;
      if (err) {
        console.error("createEventSource err callback", err)
        setTimeout(() => this.createEventSource(), 10000);
        callback();
      } else {
        this.setEventSource(res, callback);
      }
    });
  },

  resetHeartbeatTimer: function () {
    // Wait 2 minutes for a broadcast heartbeat
    // Re-initialize the eventsource if heartbeat is not recieved
    clearTimeout(this.heartbeatTimer);
    this.heartbeatTimer = setTimeout(() => {
      console.error('Broadcast message not received within timeout', new Date());
      setTimeout(() => this.createEventSource(), 10000);
    }, BROADCAST_HEARTBEAT_TIMEOUT);
  },

  markRead: function (callback) {
    SieveStore.update({
      'id.ne': null, // FIXME Workaround for bug in ZangoDB
      'state.in': [C.STATE_READY, C.STATE_PAUSED],
      'ts_view.lt': { name: 'ts_data', type: 'field' },
    }, {
      ts_view: Date.now(),
    }, callback);

    this.syncStore(SieveStore);
  },

  markReadById: async function (id) {
    await SieveStore.update(id, { ts_view: Date.now() });
    this.syncStore(SieveStore);
  },

  pause: function () {
    Scheduler.uninit();
    ActionManager.uninit();
    // PeerConnection.uninit();
    gEvents.off('store:create:' + SieveStore.name, this.onSieveCreate, this);
    gEvents.off('store:destroy:' + SieveStore.name, this.onSieveDestroy, this);
    gEvents.off('store:update:' + SieveStore.name, this.onSieveUpdate, this);
  },

  onSieveCreate: function (doc) {
    this.updateState(doc.id);
  },

  onSieveDataCreate: function (doc) {
    if (doc._state !== C.LOCAL_STATE_SYNCED) {
      this.syncStore(SieveDataStore, (err) => {
        if (!err) {
          this.syncStore(SieveStore, { delay: 100 });
        }
      });
    }
  },

  onSieveDestroy: function (doc) {
    // console.log('onSieveDestroy');
    this.updateState(doc.id);
  },

  onSieveUpdate: function (doc) {
    // console.log('main:onseiveupdate:', doc);
    this.updateState(doc.id);
  },

  open: function (id, options, callback) {
    if (typeof options == 'function') {
      callback = options;
      options = {};
    }

    SieveStore.findOne(id, {
      only: ['uri', 'name'],
    }, (err, sieve) => {
      if (err) {
        callback(new Err.NOT_FOUND({
          type: 'sieve',
          id: id,
        }));
      } else {
        // Look for open weapps. Request and focus one of them to show
        // sieve in inbox. If none is open, create and open a new tab.

        const url = sieve.uri;
        this.showURL(url, options, (err, tab) => {
          callback();
        });
      }
    });
  },

  openAndMarkRead: function (id, options, callback) {
    SieveStore.update(id, { ts_view: new Date().toISOString() }, () => {
      this.open(id, options, callback);
    });

    this.syncStore(SieveStore);
  },

  openGettingStarted: function () {
    chrome.tabs.create({
      url: CFG.URL.WELCOME,
      active: true,
    });
  },

  resume: function () {
    auth.isReady() && Scheduler.init();
    ActionManager.init();

    gEvents.on('store:' + SieveStore.name + ':create', this.onSieveCreate, this);
    gEvents.on('store:' + SieveStore.name + ':destroy', this.onSieveDestroy, this);
    gEvents.on('store:' + SieveStore.name + ':update', this.onSieveUpdate, this);

    this.updateState();
  },

  // Called and managed by service creator
  setActive: function (active) {
    // console.log('set active:', active);
    this.active = active;
    this[active ? 'resume' : 'pause']();
    gEvents.trigger('service:active', active);
  },

  setEventSource: function (source, callback) {
    callback || (callback = function () { });
    if (this.eventSource) {
      this.eventSource.close();
    }
    this.eventSource = source;
    if (source) {
      source.addEventListener('message', (e) => {
        this.resetHeartbeatTimer();
        const
          data = JSON.parse(e.data);
        // name, id, op, ts_mod

        const store = SQLStore[REMOTE_LOCAL_NAME_MAP[data.name]];

        // Find if we have the entity

        store && store.findOne(data.id, {
          only: ['ts_mod'],
        }, (err, doc) => {
          if (err) {
            // Most likely a programming or a fatal error. Shouldn't happen.
            DBG && console.error('Error fetching doc:', err);
          } else if (!doc) {
            if (store.name !== 'sieve_data') {
                this.syncStore(store);
            }
          } else {
            const
              ts1 = new Date(data.ts_mod);


            const ts2 = new Date(doc.ts_mod);


            const delta = Math.abs(ts1.valueOf() - ts2.valueOf());

            DBG && console.log('ts:', data.ts_mod, ts1, doc.ts_mod, ts2, delta);

            // stale by more than 5 sec.
            if (delta > 5000) {
              // We have stale data. Schedule a sync after
              if (store.name === 'sieve_data') {
                if (data.op === 'U') {
                  this.syncStore(store);
                }
              } else {
                this.syncStore(store);
              }
            }
          }
        });
      });

      source.addEventListener('error', (e) => {
        DBG && console.error('EventSource error', e);
        switch (e.target.readyState) {
          case EventSource.CLOSED:
            this.initSync();
            break;
        }
      });

      source.addEventListener('open', (e) => {
        // console.log('source.addEventListener: Opened');
        SyncMan.sync(false, callback);
      });
    } else {
      callback();
    }
  },

  showInInbox: function (id, team, callback) {
    if(typeof team == 'function') {
      callback = team;
    }
    chrome.tabs.create({
      active: true,
      url: `${this.appUrl}#/w/${team||0}/list/all/${id}.id/`,
    }, function () {
      callback && callback();
    });
  },

  showWatchlist: function (team) {
    this.showURL(`${this.appUrl}#/w/${team||0}/list/all/`);
  },

  openUrlInTabId: function (url, sender) {
    // console.log(url, sender);
    if (url.indexOf('app://') == 0) {
      const page = url.replace('app://', '');
      url = chrome.runtime.getURL(page);
    }
    if (sender.tab && sender.tab.id) {
      chrome.tabs.update(sender.tab.id, {
        active: true,
        url: url,
      });
    }
  },

  async showURL(url, options) {
    // console.log('showURL:', url);

    options || (options = {});

    let tabs = await chrome.tabs.queryAsync({ url });
    if (tabs && tabs.length > 0) {
      return await chrome.tabs.updateAsync(tabs[0].id, {
        active: true,
        url,
      });
    } else {
      // Get current tab. If it is an empty tab, do not create a new one.
      let tabs = await chrome.tabs.queryAsync({ active: true });
      const tab = tabs && tabs.length > 0 && tabs[0];
      // console.log('active tab:', tab);
      if (tab &&
        // A workaround to avoid all urls in one tab when opening multipe tabs
        options.openInBlank !== false &&
        /^(about:blank)|(about:newtab)|(chrome:\/\/newtab)/.test(tab.url)) {
        return await chrome.tabs.updateAsync(tab.id, {
          active: true,
          url,
        });
      } else {
        return await chrome.tabs.createAsync({
          active: true,
          url,
        });
      }
    }
  },

  syncStore: function (store, options, callback) {
    if (typeof options == 'function') {
      callback = options;
      options = null;
    }
    if (SyncMan.canSync()) {
      SyncMan.syncStore(store, options || { delay: 5000 }, function () { });
    }
  },

  updateState: function (sieveId) {
    // Update following parameters:
    // 1. Unread count
    const user_id = auth.getId();
    SieveStore.find({
      'id.ne': null, // FIXME Workaround for bug in ZangoDB
      'state.in': [C.STATE_READY, C.STATE_PAUSED],
      'ts_view.lt': { name: 'ts_data', type: 'field' },
      '$and': {
        $or: [
          ['user_id', user_id],
          ['user_id', null],
        ],
      },
    }, {
      only: ['id'],
      limit: 1,
    }, (err, result) => {
      this.state.set('unread', result.total_count);
    });

    SieveStore.find({
      'id.ne': null, // FIXME Workaround for bug in ZangoDB
      'state.in': [C.STATE_READY, C.STATE_PAUSED],
      'err.ne': '$null',
      '$and': {
        $or: [
          ['user_id', user_id],
          ['user_id', null],
        ],
      },
    },
      {
        only: ['id'],
        limit: 1,
      }, (err, result) => {
        this.state.set('error', result.total_count);
      });

    if (sieveId) {
      SieveStore.findOne(sieveId, {
        only: ['_state'],
      }, (err, doc) => {
        if (doc && doc._state !== C.LOCAL_STATE_SYNCED) {
          this.syncStore(SieveStore, { delay: 1000 });
        }
      });
    }
  },

});

let brwsr; let curBrowser;
try {
  brwsr = ['browser', 'chrome'];
  curBrowser = window[typeof browser == 'undefined' ? brwsr[1] : brwsr[0]];
} catch (e) {
  console.error(e);
}
curBrowser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // console.log( "onMessage", msg);
  chromeOnMessageHandler(msg, sender, sendResponse);
  return true;
});

async function chromeOnMessageHandler(msg, sender, sendResponse) {
  function replyOnMessage(msg) {
    if (typeof browser == 'undefined') { // XXX For firefox
      sendResponse(msg);
    } else {
      Promise.reject(msg);
    }
  }
  if (msg.type == 'request') {
    let
      { module, method, args } = { ...msg };


    const modulePath = (module && module != '') ? module : ('window');


    const tStore = getValueFromPath(window, module);
    args || (args = []);
    args = args.map((arg) => arg == '$sender' ? sender : arg);
    // console.log('main: ', msg, tStore, args)
    if (tStore) {
      try {
        const
          callable = tStore[method];
        if (typeof callable == 'function') {
          res = callable.bind(tStore)(...args);
          if (res && typeof res.then == 'function') {
            res = await res;
          }
        } else {
          res = callable;
        }
        // console.log('message: request: response', msg, res, ...args)
        try {
          sendResponse([null, res]);
        } catch (e) {
          console.error('onMessage: request: ', e);
        }
      } catch (e) {
        replyOnMessage([{ msg: e.msg || e.message || e }]);
      }
    } else {
      replyOnMessage([{ msg: 'Unhandled request, unknown store: ' + tStore }]);
    }
  } else {
    replyOnMessage([{ msg: 'Unhandled message type' }]);
  }
}


function checkSlot() {
  if (isActiveDay()) {
    const map = Prefs.get('time-slot-map');
    const date = new Date();
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes();
    const timeString = currentHours + ':' + currentMinutes;
    const slots = map[date.getDay() + ''];
    let inSlot = false;
    try {
      for (const i in slots) {
        const slot = slots[i];
        if (compareTime(timeString, slot.start) && compareTime(slot.end, timeString)) {
          inSlot = true;
          break;
        }
      }
    } catch (e) {
      // Fix data format
      // Prefs.time-slot-map format:
      // { 0: [{ start: 'mm:ss', end:'mm:ss'}], 1: [{ start: 'mm:ss', end:'mm:ss'}] ....}
      const days = [0, 1, 2, 3, 4, 5, 6];
      const fixedTimeSlotMap = days.reduce((acc, day) => {
        acc[day] = [{ start: '00:00', end: '23:59' }];
        return acc;
      }, {});
      // sieve-slot.start and sieve-slot.end are only used in UI
      Prefs.set('sieve-slot.start', '00:00');
      Prefs.set('sieve-slot.end', '23:59');
      Prefs.set('time-slot-map', fixedTimeSlotMap);
      return true;
    }
    return inSlot;
  } else {
    return false;
  }
}

function isActiveDay() {
  const map = Prefs.get('time-slot-map');
  const day = (new Date()).getDay();
  return !!map[(day + '')];
}

function compareTime(time1, time2) {
  const time1Data = time1.split(':');
  const time1Hours = parseInt(time1Data[0]);
  const time1Minutes = parseInt(time1Data[1]);
  const time2Data = time2.split(':');
  const time2Hours = parseInt(time2Data[0]);
  const time2Minutes = parseInt(time2Data[1]);
  if (time1Hours > time2Hours) {
    return true;
  } else if (time1Hours < time2Hours) {
    return false;
  } else {
    if (time1Minutes >= time2Minutes) {
      return true;
    } else {
      return false;
    }
  }
}
;
const PeerConnection = (function () {
  let connections = {};
  let clientsGroup = {};
  let connectionPeers = {};
  let clients = {};
  let reconnectPeers = {};
  let reconnectHandle = {};
  let peers, ownPeer;
  let myGroups = [];
  let initialized = 0;
  const peerEvents = _.extend({}, Backbone.Events);
  const handleInit = Promise.resolve();
  function init() {
    return handleInit.then(() => new Promise(async () => {
      const user_id = Prefs.get('service.user_id');
      initialized++;
      if (user_id === undefined) initialized = 0;
      const client_id = Prefs.get('client.id');
      if (initialized === 1) {
        ownPeer = createPeer(user_id, client_id);
        ownPeer.on('open', () => {
          ClientStore.find({ user_id, state: C.STATE_DEFAULT }, { order: ['id'] }, (err, otherClients) => {
            if (otherClients.count > 0) {
              peers = otherClients.data;
              for (let other of peers) {
                if (other.type !== 2) {
                  peerConnect(other);
                }
              }
            }
          });
        })
      }
      if (user_id !== undefined) {
        try {
          const otherPeers = await getGroupDetail(client_id, user_id);
          storeGroups(otherPeers, client_id);
          peerEvents.trigger('update:clients');
        } catch (err) {
          DBG && console.error('Unable to fetch group details');
        }
      }
    }));
  }
  function storeGroups(otherPeers, client_id) {
    if (otherPeers.count > 0) {
      const peerInfo = otherPeers.data;
      for (let info of peerInfo) {
        if (info.client_id === client_id || info.client_id === null) {
          if (myGroups.includes(info.cgid) === false) { 
            myGroups.push(info.cgid);
          }
          if (connections[info.cgid] !== undefined && !connections[info.cgid].includes(info.client_id)) {
            connections[info.cgid].push(info.client_id);
          } else if (connections[info.cgid] === undefined) {
            connections[info.cgid] = [info.client_id];
          }
        } else {
          if (clientsGroup[info.client_id] !== undefined && !clientsGroup[info.client_id].includes(info.cgid)) {
            clientsGroup[info.client_id].push(info.cgid);
          } else if (clientsGroup[info.client_id] === undefined) {
            clientsGroup[info.client_id] = [info.cgid];
          }
          if (connections[info.cgid] !== undefined && !connections[info.cgid].includes(info.client_id)) {
            connections[info.cgid].push(info.client_id);
          } else if (connections[info.cgid] === undefined) {
            connections[info.cgid] = [info.client_id];
          }
        }
      }
      for (let groups in clientsGroup) {
        if (!clientsGroup[groups].includes(C.DEFAULT_GROUPID)) {
          clientsGroup[groups].push(C.DEFAULT_GROUPID);
        }
      }
    } else {
      myGroups.push(C.DEFAULT_GROUPID);
    }
  }

  function peerConnect(client) {
    const user_id = Prefs.get('service.user_id');
    const client_id = Prefs.get('client.id');
    if (client_id !== client.id) {
      joinPeer(user_id, ownPeer, client.id);
    }
  }
  function uninit() {
    return handleInit.then(() => new Promise(() => {
      connections = {};
      clients = {};
      connectionPeers = {};
      clientsGroup = {};
      myGroups = [];
    }));
  }

  function joinPeer(user_id, peer, id) {
    const conn = peer.connect(user_id + '-' + id, {
      reliable: true
    });
    if (conn !== undefined) {
      connectionOpenHandler(conn, user_id, peer);
    }
  }
  function createPeer(user_id, id) {
    var last_id = user_id + '-' + id;
    let invalidUser;
    let peer = window.peer = new Peer(
      last_id, {
      debug: 0,
      host: CFG.SIGNAL.WS_URL,
      port: CFG.SIGNAL.WS_PORT,
      path: '/signal',
      token: Prefs.get('client.token'),
      key: 'peerjs',
      secure: CFG.SIGNAL.SECURE,
    });
    clients[id] = C.CLIENT_ACTIVE;
    peer.on('disconnected', function () {
      peer._lastServerId = last_id;
      if (invalidUser !== C.CLIENT_INVALID) {
        peer.reconnect();
      }
    });
    peer.on('close', function () {
      peer.destroy();
    });
    peer.on('error', function (err) {
      // console.log(err)
      if (String(err).search('Invalid user')) {
        invalidUser = C.CLIENT_INVALID;
      }
      if (err.type === 'peer-unavailable') {
        const peerUUID = String(err).match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/i);
        const peer_id = peerUUID[0].replace(Prefs.get('service.user_id') + '-', '');
        let peerConn = peer._connections.get(peerUUID[0]);
        if(peerConn.length > 1 && peerConn[peerConn.length - 1]._eventsCount !== 4) {
          peer._removeConnection(peerConn[peerConn.length - 1]);
        }
        if (clients[peer_id] === C.CLIENT_ACTIVE) {
          clients[peer_id] = C.CLIENT_DISCONN;
          peerEvents.trigger('change:clients:disconnect', peer_id)
        } else {
          clients[peer_id] = C.CLIENT_INACTIVE;
        }
        peerReconnection(user_id, peer, peer_id, peerUUID);
      }
    });
    peer.on('connection', function (conn) {
      // console.log(peer.id, " is Connected to : " + conn.peer);
      connectionOpenHandler(conn, user_id, peer);
    });
    return peer;
  }

  function connectionOpenHandler(conn, user_id, peer) {
    // console.log("connectionOpenHandler:", conn.peer, 'connecting to ' + peer.id);
    conn.on('open', () => {
      peerEvents.trigger('change:clients:peerconnected', conn);
      // console.log("connectionOpenHandler:", conn.peer, 'has been Connected to ' + peer.id, conn.connectionId);
      if (reconnectHandle[conn.peer] !== undefined) {
        clearTimeout(reconnectHandle[conn.peer]);
        reconnectPeers[conn.peer] = 0;
      }
      const peer_id = conn.peer.replace(user_id + '-', '');
      conn.on('close', () => {
        // console.log('Disconnected: ', conn.peer, conn.connectionId, clients[peer_id]);
        let conns = peer._connections.get(conn.peer);
        for (let conn1 of conns) {
          if (conn1._eventsCount !== 4) {
            peer._removeConnection(conn1);
          }
        }
        if (conns.length === 0) {
          joinPeer(user_id, peer, peer_id);
        }
      })
      conn.on('data', function (data) {
        setMessage(data);
      })
      conn.on('error', function (err) {
        // console.log('Disconnected-err: ', conn.peer, conn.connectionId);
      });

      if (clients[peer_id] === C.CLIENT_ACTIVE) {
        let conns = peer._connections.get(conn.peer);
        // console.log('Disconnected-ing: ', conns.map(c => c.connectionId), conn.peer, conn.connectionId);
        for(let conn1 of conns) {
          if(conn1.connectionId !== conn.connectionId && conn1._eventsCount === 4) {
            conn1.close();
            peer._removeConnection(conn1);
          }
        }
      }
      if (clients[peer_id] !== C.CLIENT_DISCONN) {
        clients[peer_id] = C.CLIENT_ACTIVE;
      }
      clients[peer_id] = C.CLIENT_ACTIVE;
      connectionPeers[peer_id] = conn;
    });
  }
  function peerReconnection(user_id, peer, peer_id, peerUUID) {
    if (reconnectPeers[peerUUID[0]] === undefined || reconnectPeers[peerUUID[0]] === 0) {
      reconnectPeers[peerUUID[0]] = 2;
    } else if (reconnectPeers[peerUUID[0]] < 256) {
      reconnectPeers[peerUUID[0]] *= 2;
    }
    reconnectHandle[peerUUID[0]] = setTimeout(joinPeer, reconnectPeers[peerUUID[0]] * 1000, user_id, peer, peer_id);
  }

  function setMessage(message) {
    if (message.name === 'work') {
      const data = message.data;
      if (data.length === undefined) {
        WorkStore.create(data, function (errSaveWork) {
          if (errSaveWork) {
            DBG && console.error('Scheduler: failed to save work result to DB');
          }
        });
      } else {
        for (let work of data) {
          if (data.key !== undefined) {
            WorkStore.create(work, function (errSaveWork) {
              if (errSaveWork) {
                DBG && console.error('Scheduler: failed to save work result to DB');
              }
            });
          }
        }
      }
    } else if (message.name === 'group') {
      peerEvents.trigger('change:clients:updateGroup', message.data);
    } else if (message.name === 'notification') {
      peerEvents.trigger('change:clients:notification', message.data);
    }
  }
  async function getGroupDetail(id, user_id) {
    try {
      const cgids = await ClientGroupStore.find(
        { $or: [['client_id', id], ['client_id', null]] },
        { only: ['cgid'] });
      if (cgids) {
        const groups = [];
        for (let group of cgids.data) {
          groups.push(group.cgid);
        }
        return await ClientGroupStore.find(
          { 'cgid.in': groups, user_id, state: 0 }, { order: ['-cgid'] })
      }
    } catch (err) {
      console.error('Store: Error: Cannot Access')
    }
  }
  function sendAllPeers(data) {
    const allPeers = connectionPeers;
    for (let conn in allPeers) {
      connectionPeers[conn].send(data)
    }
  }

  return _.extend(peerEvents, {
    init,
    getClients: () => clients,
    uninit,
    getOwnGroups: () => myGroups,
    getClientsGroup: (client) => clientsGroup[client],
    connectionPeers,
    sendAllPeers,
    getConnections: (group) => connections[group],
    peerConnect,
  })
})();;
async function fetchWithTimeout(uri, options = {}) {
  try {
    options = options || {};
    const { timeout = 5000 } = options;
    const controller = new AbortController();
    const signal = controller.signal;
    options.signal = signal;

    const timeoutId = setTimeout(() => {
      controller.abort(); // Abort the fetch request
    }, timeout);
    const res = await fetch(uri, options);
    clearTimeout(timeoutId);
    return res;
  } catch (e) {
    if (e instanceof DOMException) {
      e = new Error('TIMEOUT');
    }
    throw e;
  }
}

datasources.registerFetch({
  fetch: {
    useWrapper: true,
    fetch: ({ uri, fetchOpts }) => fetchWithTimeout(uri, fetchOpts)
  }
});

