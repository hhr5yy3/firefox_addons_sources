'use strict';

const DEBUG = 0;
const debug = DEBUG ? console.log : () => {};

const marker_uri = 'data:text/plain,tab-sidebar-marker:';
const transparent_image_uri = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const drag_data_type = 'text/x-tab-sidebar-ids';

const menu_items = [
  {id:'reload', title:'Reload Tab', tabid:true},
  {id:'mute', title:'Mute Tab', tabid:true},
  {id:'unmute', title:'Unmute Tab', tabid:true},
  {id:'activate', title:'Activate Tab', tabid:true},
  {type:'separator', tabid:true},
  {id:'pin', title:'Pin Tab', tabid:true},
  {id:'unpin', title:'Unpin Tab', tabid:true},
  {id:'duplicate', title:'Duplicate Tab', tabid:true},
  {id:'move_to_start', title:'Move to Start', tabid:true},
  {id:'move_to_end', title:'Move to End', tabid:true},
  {id:'move_new_win', title:'Move to New Window', tabid:true},
  {type:'separator', tabid:true},
  {id:'new', title:'New Tab'},
  {id:'new_marker', title:'New Marker Tab'},
  {type:'separator'},
  {id:'close_fold', title:'Close Fold', tabid:true},
  {id:'close_other_folds', title:'Close Other Folds', tabid:true},
  {id:'close_all_folds', title:'Close All Folds'},
  {type:'separator'},
  {id:'undo', title:'Undo Close Tab'},
  {id:'close', title:'Close Tab', tabid:true},
];

const view = {};
for (let e of document.querySelectorAll('[data-ctl]'))
  view[e.dataset.ctl] = e;

const use_native_menu = browser.menus.overrideContext !== undefined;

let window_id;
let unfolded_markers;
let tab_id_map; // for tabs API bug

let wheel_activate;

Element.prototype.show = function() { this.style.display = ''; }
Element.prototype.hide = function() { this.style.display = 'none'; }

browser.tabs.onActivated.addListener((info) => {
  if (info.windowId !== window_id) return;
  debug('activated', info);
  view.items.activate(info.tabId);
});

browser.tabs.onAttached.addListener((id, info) => {
  if (info.newWindowId !== window_id) return;
  debug('attached', id, info);
  browser.tabs.get(id).then((tab) => {
    if (tab.id !== id) {
      // tabs API bug:
      // tabs.onAttached uses original tab id
      // tabs.get return reassigned wrong tab id
      // some tabs event use reassigned wrong tab id
      tab_id_map[tab.id] = id;
      browser.runtime.sendMessage({set_tab_id_map:{key:tab.id, value:id}});
      debug('set_tab_id_map', tab.id, ':', id);
      tab.id = id;
    }
    view.items.new_tab(info.newPosition, tab);
  });
});

browser.tabs.onCreated.addListener((tab) => {
  if (tab.windowId !== window_id) return;
  debug('created', tab);
  view.items.new_tab(tab.index, tab);
});

browser.tabs.onDetached.addListener((id, info) => {
  if (info.oldWindowId !== window_id) return;
  debug('detached', id, info);
  view.items.remove_tab(id);
});

browser.tabs.onMoved.addListener((id, info) => {
  if (info.windowId !== window_id) return;
  debug('moved', id, info);
  // called before created with openerTabId
  if (view.items.tab(id)) view.items.move_tab(info.fromIndex, info.toIndex);
});

browser.tabs.onRemoved.addListener((id, info) => {
  if (info.windowId !== window_id) return;
  debug('removed', id, info);
  view.items.remove_tab(id);
});

browser.tabs.onUpdated.addListener((id, info, tab) =>{
  if (tab.windowId !== window_id) return;
  debug('updated', id, info, tab);
  // called before attached
  const e = view.items.tab(id);
  if (e) update_item(e, info, tab);
});

// check tabs API bug 1398272 (fixed on 61.0 and 60.1esr)
async function has_tab_id_bug() {
  const info = await browser.runtime.getBrowserInfo();
  let [major, minor] = info.version.split('.');
  major = Number(major);
  minor = Number(minor);
  return !(major >= 61 || (major === 60 && minor >= 1));
}

function icon_error(ev) {
  ev.target.hide();
}

function create_item(tab) {
  const e = document.createElement('div');
  e.dataset.item = '';
  e.setAttribute('draggable', 'true');
  const icon = document.createElement('img');
  icon.dataset.icon = '';
  icon.addEventListener('error', icon_error);
  e.appendChild(icon);
  const audio = document.createElement('div');
  audio.dataset.audio = '';
  e.appendChild(audio);
  const title = document.createElement('div');
  title.dataset.title = '';
  e.appendChild(title);
  update_item(e, null, tab);
  return e;
}

function tab_id(e) {
  return Number(e.dataset.id);
}

function is_marker(e) {
  return 'marker' in e.dataset;
}

function tab_ids(e) {
  const ids = [tab_id(e)];
  if ('fold' in e.dataset)
    while ((e = e.nextSibling) && !is_marker(e))
      ids.push(tab_id(e));
  return ids;
}

function tooltip(tab) {
  // like bookmark and history sidebar
  let url = tab.url;
  if (url.length > 60)
    url =  url.slice(0, 30) + '\u2026' + url.slice(-30);
  return tab.title + '\n' + url;
}

function is_marker_url(url) {
  return url.startsWith(marker_uri);
}

function set_item_icon(e, tab, status) {
  const icon = e.childNodes[0];

  if (is_marker_url(tab.url)) {
    icon.hide();
    return;
  }

  if (status === 'loading') {
    e.dataset.loading = '';
    icon.src = transparent_image_uri;
    icon.show();
    return;
  }

  if (status === 'complete') {
    delete e.dataset.loading;
    if (tab.favIconUrl) {
      icon.src = tab.favIconUrl;
      icon.show();
    } else
      icon.hide();
  }
}

function update_item(e, info, tab) {
  if (!info) e.dataset.id = tab.id;

  if (!info || 'active' in info)
    tab.active ? e.dataset.active = '' : delete e.dataset.active;

  if (!info || 'pinned' in info)
    tab.pinned ? e.dataset.pinned = '' : delete e.dataset.pinned;

  if (!info || 'hidden' in info)
    tab.hidden ? e.dataset.hidden = '' : delete e.dataset.hidden;

  if (!info || 'audible' in info)
    tab.audible ? e.dataset.audible = '' : delete e.dataset.audible;

  if (!info || 'mutedInfo' in info)
    tab.mutedInfo.muted ? e.dataset.muted = '' : delete e.dataset.muted;

  if (!info || 'status' in info || 'favIconUrl' in info) {
    // a possible tab.status is old value?
    set_item_icon(e, tab, (info && info.status) ? info.status : tab.status);
  }

  if (!info || 'url' in info) {
    if (is_marker_url(tab.url)) {
      e.dataset.marker = '';
      const title = decodeURIComponent(tab.url.slice(marker_uri.length));
      e.setAttribute('title', title);
      e.childNodes[0].hide();
      e.childNodes[2].textContent = title;
    } else {
      delete e.dataset.marker;
      e.setAttribute('title', tooltip(tab));
    }
  }

  if (!info || 'title' in info) {
    if (!is_marker_url(tab.url)) {
      e.childNodes[2].textContent = tab.title;
      e.setAttribute('title', tooltip(tab));
    }
  }
}

function create_tab_helper(params) {
  try {
    return browser.tabs.create(params);
  } catch (e) {
    delete params.openerTabId;
    return browser.tabs.create(params);
  }
}

const commands = {
  reload: (id) => browser.tabs.reload(id),
  mute: (id) => browser.tabs.update(id, {muted: true}),
  unmute: (id) => browser.tabs.update(id, {muted: false}),
  pin: (id) => browser.tabs.update(id, {pinned: true}),
  unpin: (id) => browser.tabs.update(id, {pinned: false}),
  duplicate: (id) => browser.tabs.duplicate(id),
  activate: (id) => browser.tabs.update(id, {active: true}),
  close_fold: (id) => view.items.fold(view.items.tab(id), true),
  close_other_folds: (id) => {
    const start_marker = view.items.find_start_marker(view.items.tab(id));
    for (let marker of view.items.querySelectorAll('[data-marker]'))
      if (marker !== start_marker)
        view.items.fold(marker, true);
  },
  close_all_folds: () => {
    for (let marker of view.items.querySelectorAll('[data-marker]'))
      view.items.fold(marker, true);
  },
  new: (id, url) => {
    // tabs API bug: tabs.create index is not clamped the number of tabs.
    // Need to count tabs.
    return browser.tabs.query({currentWindow:true})
      .then((tabs) => {
        let active;
        for (let tab of tabs) {
          if (tab.active) {
            active = tab;
            break;
          }
        }
        const params = {url:url, openerTabId:active.id};
        if (id) {
          return browser.tabs.get(id).then((tab) => {
            params.index = tab.index + 1;
            return create_tab_helper(params);
          });
        } else {
          params.index = tabs.length;
          return create_tab_helper(params);
        }
      });
  },
  new_marker: (id) => {
    commands.new(id, '/blank.html').then((tab) => {
      browser.tabs.executeScript(tab.id, {
        code: 'location.replace("' + marker_uri + 'MarkerNameHere")',
        runAt: 'document_start'
      });
    });
  },
  move: async (ids, index) => {
    const tab = await browser.tabs.get(ids[0]);
    if (index > -1) {
      const to = view.items.childNodes[index];
      if ('fold' in to.dataset)
        index = view.items.endindex(index);
    }
    if (tab.windowId !== window_id || index < tab.index)
      index += 1;
    if (ids.length > 1)
      view.items.style.cursor = 'wait';
    if (tab.windowId === window_id) {
      await browser.tabs.move(ids, {index:index});
      view.items.style.cursor = '';
    } else {
      // tabs API bug: insert position is wrong with multiple ids
      ids.reverse();
      const ps = [];
      for (let id of ids)
        ps.push(browser.tabs.move(id, {windowId:window_id, index:index}));
      await Promise.all(ps);
      view.items.style.cursor = '';
    }
  },
  move_to_start: async (id) => {
    const tab = await browser.tabs.get(id);
    const tabs = await browser.tabs.query({currentWindow:true, pinned:tab.pinned});
    const ids = tab_ids(view.items.tab(id));
    if (ids.length > 1)
      view.items.style.cursor = 'wait';
    await browser.tabs.move(ids, {index:tabs[0].index});
    view.items.style.cursor = '';
  },
  move_to_end: async (id) => {
    const tab = await browser.tabs.get(id);
    const tabs = await browser.tabs.query({currentWindow:true, pinned:tab.pinned});
    const ids = tab_ids(view.items.tab(id));
    if (ids.length > 1)
      view.items.style.cursor = 'wait';
    await browser.tabs.move(ids, {index:tabs[tabs.length-1].index});
    view.items.style.cursor = '';
  },
  move_new_win: (id) => {
    const ids = tab_ids(view.items.tab(id));
    browser.windows.create({tabId:ids[0]}).then((win) => {
      if (ids.length > 1) {
        ids.shift();
        // tabs API bug:
        // insert position is wrong with multiple ids
        ids.reverse();
        for (let id of ids)
          browser.tabs.move(id, {windowId:win.id, index:1});
      }
    });
  },
  undo: async (id) => browser.sessions.restore(await get_last_session_id()),
  close: (id) => browser.tabs.remove(id)
};

function update_css(css) {
  document.querySelector('[data-usercss]').textContent = css;
}

function update_theme(theme) {
  document.body.setAttribute('data-theme', theme);
}

function get_stats() {
  return browser.tabs.query({currentWindow: true}).then((tabs) => {
    const ret = {ntabs:tabs.length, nmarkers:0, ndiscarded:null};
    for (let tab of tabs) {
      if ('discarded' in tab) {
        if (ret.ndiscarded === null)
          ret.ndiscarded = 0;
        if (tab.discarded)
          ret.ndiscarded += 1;
      }
      if (tab.url.startsWith(marker_uri))
        ret.nmarkers += 1;
    }
    return ret;
  });
}

async function update_menu(menu, tab) {
  if (await get_last_session_id())
    menu.enable('undo');
  else
    menu.disable('undo');

  if (tab) {
    const tabs = await browser.tabs.query({currentWindow:true});

    const pinned = [];
    const unpinned = [];
    for (let t of tabs)
      (t.pinned ? pinned : unpinned).push(t);

    if (pinned.length && (pinned[0].id === tab.id) ||
        unpinned.length && (unpinned[0].id === tab.id))
      menu.disable('move_to_start');
    else
      menu.enable('move_to_start');

    const e = view.items.tab(tab.id);
    const start_marker = view.items.find_start_marker(e);
    const ids = tab_ids(e);

    if (pinned.length && (pinned[pinned.length-1].id === ids[ids.length-1]) ||
        unpinned.length && (unpinned[unpinned.length-1].id === ids[ids.length-1]))
      menu.disable('move_to_end');
    else
      menu.enable('move_to_end');

    if (tabs.length === ids.length)
      menu.disable('move_new_win');
    else
      menu.enable('move_new_win');

    const unfolded = view.items.querySelectorAll('[data-marker]:not([data-fold])');
    if (!unfolded.length || unfolded.length === 1 && unfolded[0] === start_marker)
      menu.disable('close_other_folds');
    else
      menu.enable('close_other_folds');

    if (unfolded.length)
      menu.enable('close_all_folds');
    else
      menu.disable('close_all_folds');

    if (is_marker_url(tab.url)) {
      menu.hide('mute');
      menu.hide('unmute');
      menu.hide('reload');
      menu.show('activate');
      menu.hide('close_fold');
      menu.hide('pin');
      menu.hide('unpin');
    } else {
      if (tab.mutedInfo.muted) {
        menu.hide('mute');
        menu.show('unmute');
      } else {
        menu.show('mute');
        menu.hide('unmute');
      }
      menu.show('reload');
      menu.hide('activate');
      if (start_marker)
        menu.enable('close_fold');
      else
        menu.disable('close_fold');
      menu.show('close_fold');
      if (tab.pinned) {
        menu.hide('pin');
        menu.show('unpin');
      } else {
        menu.show('pin');
        menu.hide('unpin');
      }
    }
  }
}

const dom_menu = {
  init: function() {
    this.items = {};
    view.menu.hide();

    const f = document.createDocumentFragment();
    for (let item of menu_items) {
      let e;
      if (item.type === 'separator')
        e = document.createElement('hr');
      else {
        e = document.createElement('div');
        e.dataset.cmd = item.id;
        e.textContent = item.title;
      }
      if (item.tabid)
        e.dataset.context = 'tab';
      f.appendChild(e);
      if (item.id)
        this.items[item.id] = e;
    }
    view.menu.appendChild(f);

    view.menu.addEventListener('click', (ev) => {
      if ('disabled' in ev.target.dataset) return;
      commands[ev.target.dataset.cmd](this.target_tabid);
      this._close();
    });

    document.addEventListener('mousedown', (ev) => {
      if (ev.target.parentNode !== view.menu)
        this._close();
    });

    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape')
        this._close();
    });

    addEventListener('blur', () => { this._close(); });

    this._close = () => {
      view.items.clear_selected();
      view.menu.hide();
    };

    this._popup = (ev) => {
      view.menu.show();
      const mrc = view.menu.getBoundingClientRect();
      const mh = mrc.bottom - mrc.top;
      const mw = mrc.right - mrc.left;

      let t = ev.clientY;
      if ((t + mh) > window.innerHeight)
        t -= mh;
      let l = ev.clientX;
      if ((l + mw) > window.innerWidth) {
        l = window.innerWidth - mw - 1;
        if (l < 0) l = 0;
      }

      view.menu.style.top = window.pageYOffset + t + 'px';
      view.menu.style.left = window.pageXOffset + l + 'px';
    };

    this.on_contextmenu = async (ev, tabid) => {
      for (let e of view.menu.children) {
        if ('cmd' in e.dataset || e.tagName === 'HR') {
          if (!tabid && e.dataset.context === 'tab')
            e.hide();
          else
            e.show();
        } else
          e.hide();
      }
      let tab = null;
      if (tabid)
        tab = await browser.tabs.get(tabid);
      await update_menu(this, tab);
      if (await has_tab_id_bug())
        this.items.move_new_win.hide();
      this.target_tabid = tabid;
      this._popup(ev);
    };

    this.on_contextmenu_stats = async (ev) => {
      for (let e of view.menu.children)
        e.hide();
      const stats = await get_stats();
      view.ntabs.textContent = stats.ntabs;
      view.nmarkers.textContent = stats.nmarkers;
      if (stats.ndiscarded !== null) {
        view.nloaded.textContent = stats.ntabs - stats.ndiscarded;
        view.ndiscarded.textContent = stats.ndiscarded;
      }
      view.stats.show();
      this._popup(ev);
    };

    this.show = (id) => this.items[id].show();
    this.hide = (id) => this.items[id].hide();
    this.enable = (id) => delete this.items[id].dataset.disabled;
    this.disable = (id) => this.items[id].dataset.disabled = '';
  }
};

const native_menu = {
  init: function() {
    browser.menus.removeAll().then(() => {
      const props = {
        viewTypes: ['sidebar'],
        documentUrlPatterns: [location.href]
      };

      // "Move To Window" is always enabled on native menu.
      // menus.overrideContext support version (Firefox 64) does not have tab
      // id bug.
      for (let item of menu_items) {
        if (item.type === 'separator')
          delete props.id;
        else
          props.id = item.id;
        props.title = item.title;
        props.type = item.type;
        props.contexts = item.tabid ? ['tab'] : ['tab', 'page'];
        browser.menus.create(props);
      }
    });

    let from_current_window = false;

    browser.menus.onHidden.addListener(() => {
      if (!from_current_window) return;
      from_current_window = false;
      view.items.clear_selected()
    });

    browser.menus.onClicked.addListener((info, tab) => {
      if (!from_current_window) return;
      commands[info.menuItemId](tab ? tab.id : null)
    });

    this.on_contextmenu = async (ev, tabid) => {
      from_current_window = true;
      browser.menus.overrideContext(tabid ? {context:'tab', tabId:tabid} : {});
      let tab = null;
      if (tabid)
        tab = await browser.tabs.get(tabid);
      await update_menu(this, tab);
      browser.menus.refresh();
    }
    this.show = (id) => browser.menus.update(id, {visible:true});
    this.hide = (id) => browser.menus.update(id, {visible:false});
    this.enable = (id) => browser.menus.update(id, {enabled:true});
    this.disable = (id) => browser.menus.update(id, {enabled:false});
  }
};

async function get_last_session_id() {
  const infos = await browser.sessions.getRecentlyClosed();
  let session_id = null;
  for (let info of infos) {
    if (!info.tab) continue;
    if (info.tab.windowId !== window_id) continue;
    session_id = info.tab.sessionId;
    break;
  }
  return session_id;
}

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') {
    if ('css' in changes)
      update_css(changes.css.newValue);
    if ('wheel_activate' in changes)
      wheel_activate = changes.wheel_activate.newValue;
    if ('theme' in changes)
      update_theme(changes.theme.newValue);
  }
});

browser.storage.local.get(null).then((res) => {
  update_css(res.css || '');
  wheel_activate = res.wheel_activate || false;
  update_theme(res.theme || 'default');
});

view.items.init = function(tabs) {
  this.tab = function(id) {
    id = tab_id_map[id] || id;
    return this.querySelector('[data-id="' + id + '"]');
  }

  this.intoview = function(e) {
    const rc = e.getBoundingClientRect();
    if (rc.top < 0 || rc.bottom > window.innerHeight)
      e.scrollIntoView(true);
  }

  this.activate = function(id) {
    if (this.active)
      delete this.active.dataset.active;
    this.active = null;
    for (let e of this.childNodes) {
      if (tab_id(e) === id) {
        this.active = e;
        break;
      }
    }
    if (this.active) {
      this.active.dataset.active = '';
      if (!is_marker(this.active))
        this.fold(this.active, false);
      this.intoview(this.active);
    }
    // if active element not found, maybe attached
  }

  this.new_tab = function(index, tab) {
    this.insertBefore(create_item(tab), this.childNodes[index]);
    if (tab.active)
      this.activate(tab.id);
  }

  this.move_tab = function(from_index, to_index) {
    const from = this.childNodes[from_index];
    const next_from = from.nextSibling;
    const to = this.childNodes[to_index];
    if (to_index < from_index)
      this.insertBefore(from, to);
    else
      this.insertBefore(from, to.nextSibling);
    let start_marker = this.find_start_marker(from);
    if (start_marker)
      this.fold(from, 'fold' in start_marker.dataset);
    else
      from.show();
    if (next_from) {
      start_marker = this.find_start_marker(next_from);
      if (start_marker)
        this.fold(next_from, 'fold' in start_marker.dataset);
      else
        next_from.show();
    }

    if ('active' in from.dataset)
      view.items.intoview(from);
  }

  this.remove_tab = function(id) {
    const e = this.tab(id);
    let next = e.nextSibling;
    this.removeChild(e);
    if (next) {
      const start_marker = this.find_start_marker(next);
      if (start_marker)
        this.fold(next, 'fold' in start_marker.dataset);
      else {
        while (next && !is_marker(next)) {
          next.show();
          next = next.nextSibling;
        }
      }
    }
  }

  this.clear_selected = function() {
    const e = this.querySelector('[data-selected]');
    if (e) delete e.dataset.selected;
  }

  this.find_start_marker = function(e) {
    while (!is_marker(e) && (e = e.previousSibling));
    return e;
  }

  this.fold = function(e, fold) {
    const start_marker = this.find_start_marker(e);
    if (!start_marker)
      return;
    e = start_marker;
    while ((e = e.nextSibling) && !is_marker(e))
      fold ? e.hide() : e.show();

    const id = tab_id(start_marker);
    if (fold) {
      start_marker.dataset.fold = '';
      delete unfolded_markers[id];
      browser.runtime.sendMessage({delete_unfolded_markers:id});
    } else {
      delete start_marker.dataset.fold;
      unfolded_markers[id] = true;
      browser.runtime.sendMessage({set_unfolded_markers:id});
    }
  }

  this.endindex = function(index) {
    let e = this.childNodes[index];
    while ((e = e.nextSibling) && !is_marker(e))
      index += 1;
    return index;
  }

  this.addEventListener('click', (ev) => {
    const e = ev.target;
    const id = tab_id(e) || tab_id(e.parentNode);
    if (!id) return;
    if ('audio' in e.dataset) {
      const p = e.parentNode;
      const cmd = ('muted' in p.dataset) ? 'unmute' : 'mute';
      commands[cmd](id);
    } else {
      if (is_marker(e))
        this.fold(e, !('fold' in e.dataset));
      else {
        debug('click>', id);
        commands.activate(id);
      }
    }
  });

  this.addEventListener('auxclick', (ev) => {
    if (ev.button === 1) {
      const id = tab_id(ev.target) || tab_id(ev.target.parentNode);
      if (id)
        commands.close(id);
    }
  });

  this.addEventListener('dblclick', (ev) => {
    if (ev.button === 0) {
      const id = tab_id(ev.target) || tab_id(ev.target.parentNode);
      if (id && !('audio' in ev.target.dataset) && !is_marker(ev.target))
        commands.reload(id);
    }
  });

  window_id = tabs[0].windowId;
  const f = document.createDocumentFragment();
  let fold;
  for (let tab of tabs) {
    tab.id = tab_id_map[tab.id] || tab.id;
    const e = create_item(tab);
    if (is_marker_url(tab.url)) {
      if (unfolded_markers[tab_id(e)])
        fold = false;
      else {
        fold = true;
        e.dataset.fold = '';
      }
    }
    if (!tab.pinned && !is_marker_url(tab.url) && fold) e.hide();
    if (tab.active) this.active = e;
    f.appendChild(e);
  }
  this.appendChild(f);
  this.fold(this.active, false);
  this.intoview(this.active);
}

dom_menu.init();
if (use_native_menu)
  native_menu.init();

browser.tabs.query({currentWindow: true}).then((tabs) => {
  browser.runtime.sendMessage({get_store:true}).then((res) => {
    unfolded_markers = res.unfolded_markers;
    tab_id_map = res.tab_id_map;

    view.items.init(tabs);

    document.addEventListener('mousedown', (ev) => {
      if (ev.button === 1)
        ev.preventDefault();
    });

    document.addEventListener('wheel', (ev) => {
      ev.preventDefault();

      if (ev.ctrlKey || !wheel_activate) {
        view.items.scrollTop +=
            view.items.childNodes[0].offsetHeight * ev.deltaY;
      } else {
        browser.tabs.query({currentWindow:true}).then((tabs) => {
          let i;
          for (let tab of tabs) {
            if (tab.active) {
              i = tab.index;
              break;
            }
          }
          if (ev.deltaY > 0)
            i = (i === tabs.length-1) ? 0 : i+1;
          else
            i = (i === 0) ? tabs.length-1 : i-1;
          browser.tabs.update(tabs[i].id, {active:true});
        });
      }
    });

    document.addEventListener('contextmenu', async (ev) => {
      let e = ev.target;
      if ('audio' in e.dataset)
        e = e.parentNode;
      let tabid = null;
      if ('item' in e.dataset) {
        e.dataset.selected = '';
        tabid = tab_id(e);
      }

      if (use_native_menu && !ev.ctrlKey)
        native_menu.on_contextmenu(ev, tabid);
      else {
        ev.preventDefault();
        if (ev.ctrlKey)
          dom_menu.on_contextmenu_stats(ev);
        else
          dom_menu.on_contextmenu(ev, tabid);
      }
    });

    document.addEventListener('dragstart', (ev) => {
      ev.dataTransfer.setDragImage(ev.target, ev.offsetX, ev.offsetY);
      ev.dataTransfer.setData(drag_data_type, JSON.stringify({
        pinned: 'pinned' in ev.target.dataset,
        ids: tab_ids(view.items.tab(Number(ev.target.dataset.id)))
      }));
    });
    document.addEventListener('dragover', (ev) => {
      const data = ev.dataTransfer.getData(drag_data_type);
      if (!data) return;

      ev.preventDefault();
      if (!ev.target.dataset.id ||
          JSON.parse(data).pinned !== 'pinned' in ev.target.dataset) {
        ev.dataTransfer.dropEffect = 'none';
        view.drop_guide.style.display = 'none';
        return;
      }
      ev.dataTransfer.dropEffect = 'move';
      view.drop_guide.style.width = view.items.clientWidth + 'px';
      view.drop_guide.style.display = 'block';
      let offset = ev.target.offsetTop - view.items.scrollTop -
                   view.drop_guide.clientHeight / 2;
      if (ev.offsetY < ev.target.clientHeight / 2) {
        if (offset < 0)
          offset = 0;
        view.drop_guide.style.top = offset + 'px';
      } else
        view.drop_guide.style.top = offset + ev.target.offsetHeight + 'px';
    });
    document.addEventListener('dragenter', (ev) => {
      if (!ev.dataTransfer.types.includes(drag_data_type))
        return false;
      ev.preventDefault();
    });
    document.addEventListener('dragleave', (ev) => {
      view.drop_guide.style.display = 'none';
    });
    document.addEventListener('drop', async (ev) => {
      const data = ev.dataTransfer.getData(drag_data_type);
      if (!data) return;
      const id = tab_id(ev.target);
      if (!id) return;
      const upper = ev.offsetY < ev.target.clientHeight / 2;
      const tab = await browser.tabs.get(id);
      await commands.move(JSON.parse(data).ids, upper ? tab.index - 1 : tab.index);
      view.drop_guide.style.display = 'none';
    });
  });
});
