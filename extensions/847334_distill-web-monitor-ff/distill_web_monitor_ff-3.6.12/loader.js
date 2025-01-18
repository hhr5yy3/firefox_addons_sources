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
