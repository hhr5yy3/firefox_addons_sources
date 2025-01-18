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
