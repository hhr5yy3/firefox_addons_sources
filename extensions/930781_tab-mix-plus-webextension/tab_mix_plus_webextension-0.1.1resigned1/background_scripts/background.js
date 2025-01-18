/* globals getDomain preferences, log, debug */
'use strict';

const Tabmix = {};

Tabmix.isNewTabUrls = function Tabmix_isNewTabUrls(aUrl) {
  return this.newTabUrls.indexOf(aUrl) > -1;
};

Tabmix.newTabUrls = [
  'about:newtab', 'about:blank',
  'chrome://abouttab/content/text.html',
  'chrome://abouttab/content/tab.html',
  'chrome://google-toolbar/content/new-tab.html',
  'chrome://fastdial/content/fastdial.html',
];

let platform;
browser.runtime.getPlatformInfo(info => {
  platform = info.os;
});

/**
 * Defines a getter on a specified object that will be created upon first use.
 *
 * @param aObject
 *        The object to define the lazy getter on.
 * @param aName
 *        The name of the getter to define on aObject.
 * @param aLambda
 *        A function that returns what the getter should return.  This will
 *        only ever be called once.
 */
function defineLazyGetter(aObject, aName, aLambda) {
  Object.defineProperty(aObject, aName, {
    get() {
      delete aObject[aName];
      const value = aLambda.apply(aObject);
      Object.defineProperty(aObject, aName, {
        value,
        writable: true,
        configurable: true,
        enumerable: true,
      });
      return value;
    },
    configurable: true,
    enumerable: true,
  });
}

const ALL_TABS_LOCKED = false;

function getBoolPref(prefName, def) {
  if (typeof preferences[prefName] != 'undefined') {
    return Boolean(preferences[prefName]);
  }
  return def;
}

//XXX TODO: apply Tabmix fix to this function
function whereToOpenLink(e, ignoreButton, ignoreAlt) {
  // This method must treat a null event like a left click without modifier keys (i.e.
  // e = { shiftKey:false, ctrlKey:false, metaKey:false, altKey:false, button:0 })
  // for compatibility purposes.
  if (!e) {
    return 'current';
  }

  var shift = e.shiftKey;
  var ctrl = e.ctrlKey;
  var meta = e.metaKey;
  var alt = e.altKey && !ignoreAlt;

  // ignoreButton allows 'middle-click paste' to use function without always opening in a new window.
  var middle = !ignoreButton && e.button == 1;
  var middleUsesTabs = getBoolPref('browser.tabs.opentabfor.middleclick', true);

  // Don't do anything special with right-mouse clicks.  They're probably clicks on context menu items.

  var metaKey = platform == 'mac' ? meta : ctrl;
  if (metaKey || middle && middleUsesTabs) {
    return shift ? 'tabshifted' : 'tab';
  }

  if (alt && getBoolPref('browser.altClickSave', false)) {
    return 'save';
  }

  if (shift || middle && !middleUsesTabs) {
    return 'window';
  }

  return 'current';
}

const linksHandler = {
  _data: null,

  resetData() {
    this._data = null;
    // this._browser = null;
    // this._window = null;
  },

  get targetPref() {
    return preferences.opentabforLinks;
  },

  get currentTabLocked() {
    // XXX TODO: need to find a way to get if the tab is locked
    // each tab is lock/unlock by the pref, unless the user change
    // the value with user action
    return ALL_TABS_LOCKED;
  },

  /**
   * Add attribute functions to wrapped node
   *
   * @return  wrapped node including attribute functions
   */
  getWrappedNode(node) {
    if (!node) {
      return null;
    }
    const wrappedNode = {...node};
    wrappedNode.parentNode = {...node.parentNode};

    wrappedNode.hasAttribute = function(att) {
      return att in this._attributes;
    };
    wrappedNode.getAttribute = function(att) {
      return this._attributes[att] || null;
    };
    wrappedNode.parentNode.hasAttribute = function(att) {
      return att in this._attributes;
    };
    wrappedNode.parentNode.getAttribute = function(att) {
      return this._attributes[att] || null;
    };
    return wrappedNode;
  },

  /**
   * @param event            A valid event union.
   * @param href             href string.
   * @param wrappedNode      wrapped DOM node containing the URL to be opened.
   * @param wrappedOnClickNode   wrapped DOM node containing onclick, may exist only
   *                         when link node is null.
   */
  getData(event, href, wrappedNode, wrappedOnClickNode) {
    const self = this;
    function LinkData() {
      this.event = event;
      this.href = href;
      this.wrappedNode = wrappedNode || null;
      this.wrappedOnClickNode = wrappedOnClickNode || null;
      this.targetAttr = wrappedNode && wrappedNode.target;
      this.currentURL = event._currentURL;
      this.pinned = event._pinned;
      // defineLazyGetter(this, 'currentURL', () => {
      //   //XXX TODO: fix this
      //   return self._browser.currentURI ? self._browser.currentURI.spec : '';
      // });
      defineLazyGetter(this, 'onclick', function() {
        if (this.wrappedNode && this.wrappedNode.hasAttribute('onclick')) {
          return this.wrappedNode.getAttribute('onclick');
        }
        return null;
      });
      defineLazyGetter(this, 'hrefFromOnClick', function() {
        return self.getHrefFromOnClick(event, href, this.wrappedNode, this.onclick);
      });
      defineLazyGetter(this, 'isLinkToExternalDomain', function() {
        /**
         * Check if link refers to external domain.
         * Get current page url
         * if user click a link while the page is reloading node.ownerDocument.location can be null
         */
        const youtube = /www\.youtube\.com\/watch\?v=/;
        let curpage = this.currentURL;
        if (!youtube.test(curpage)) {
          const node = this.wrappedNode || this.wrappedOnClickNode;
          curpage = node.ownerDocument.URL || this.currentURL;
        }
        // XXX TODO:
        // const nodeHref = this.hrefFromOnClick || this.href || self._window.XULBrowserWindow.overLink;
        const nodeHref = this.hrefFromOnClick || this.href;
        return self.isLinkToExternalDomain(curpage, nodeHref);
      });
    }

    this._data = new LinkData();
  },

  //XXX change function name
  receiveMessage(message) {
    // const {event, href, node, onClickNode} = message;
    const {event, href, node} = message;

    // call getWrappedNode to add attribute functions to the wrapped node
    const wrappedNode = this.getWrappedNode(node);

    if (!href && wrappedNode) {
      const onclick = wrappedNode.getAttribute('onclick');
      debug('wrappedNode.getAttribute(\'onclick\')', onclick);
      if (this.getHrefFromOnClick(event, null, wrappedNode, onclick)) {
        const newHref = event.__hrefFromOnClick;
        const result = this._getParamsForLink(event, null, newHref, wrappedNode);
        // result.hrefFromOnClick = newHref;
        return result;
      }
      return {where: 'default'};
    }
    return this._getParamsForLink(event, wrappedNode, href);
  },

  _getParamsForLink(event, wrappedNode, href, wrappedOnClickNode) {
    const [_where, suppressTabsOnFileDownload] =
        this.whereToOpen(event, href, wrappedNode, wrappedOnClickNode);

    let where = _where;

    debug(`whereToOpen ${_where}`);
    // for debug
    where = where.split('@')[0];
    where = where.split('.')[0];

    // we will use tabmix_allowLoad when we apply lock-tab
    // if (where == 'current') {
    //   browser.tabmix_allowLoad = true;
    // }

    const targetAttr = wrappedNode && wrappedNode.target;
    //XXX TODO need to implement this...
    // if (href && browser.getAttribute('remote') == 'true' &&
    //     where == 'default' && targetAttr) {
    //   let win = this._window;
    //   win.setTimeout(() => {
    //     // don't try to select new tab if the original browser is no longer
    //     // the selected browser
    //     if (win.gBrowser.selectedBrowser == browser)
    //       this.selectExistingTab(win, href, targetAttr);
    //   }, 300);
    // }

    const result = {
      where,
      href,
      suppressTabsOnFileDownload: suppressTabsOnFileDownload || false,
      targetAttr,
    };

    // don't call this._data.hrefFromOnClick
    // if __hrefFromOnClick did not set by now we won't use it
    if (where != 'default' && event.__hrefFromOnClick) {
      // result.href = event.__hrefFromOnClick;
      result.hrefFromOnClick = event.__hrefFromOnClick;
    }

    this.resetData();

    return result;
  },

  whereToOpen(event, href, wrappedNode, wrappedOnClickNode) {
  // whereToOpen(message) {
    log('whereToOpen starts');
    // const {event, href, node, onClickNode} = message;
    // const wrappedNode = this.getWrappedNode(node);
    // const wrappedOnClickNode = this.getWrappedNode(onClickNode);

    /*
    try {
      // this._browser = browser;
      // this._window = browser.ownerGlobal;
    } catch (ex) {
      console.error('Tabmix\n', ex);
    }
    */
    let eventWhere = '';
    const TMP_tabshifted = aEvent => {
      var where = eventWhere || whereToOpenLink(aEvent);
      return where == 'tabshifted' ? 'tabshifted' : 'tab';
    };

    ///XXX TODO: check again how SubmitToTab work
    // if (typeof this._window.SubmitToTab != 'undefined') {
    //   const target = event.target;
    //   if (target instanceof HTMLButtonElement ||
    //       target instanceof HTMLInputElement) {
    //     if (this._window.SubmitToTab.SubmitToTab.contentAreaClick(event) === false) {
    //       return ['default@1'];
    //     }
    //   }
    // }

    if (!wrappedNode && !wrappedOnClickNode) {
      return ['default@2'];
    }

    // this.getPref();
    this.getData(event, href, wrappedNode, wrappedOnClickNode);

    // whereToOpenLink return save or window
    eventWhere = whereToOpenLink(event);
    if (/^save|window/.test(eventWhere)) {
      // make sure to trigger hrefFromOnClick getter
      void this._data.hrefFromOnClick;
      return [`${eventWhere}@2.1`];
    }

    if (this.miscellaneous(wrappedNode || wrappedOnClickNode)) {
      return ['default@2.2'];
    }

    /*
     * prevents tab form opening when clicking Greasemonkey script
     */
    if (this.isGreasemonkeyScript(href)) {
      return ['default@3'];
    }

    // Check if new tab already opened from onclick event // 2006-09-26
    const {onclick, targetAttr} = this._data;
    if (wrappedNode && onclick &&
        wrappedNode.ownerDocument.location.href != wrappedNode._focusedWindowHref) {
      return ['default@4'];
    }

    log({href, onclick});

    if (wrappedNode && wrappedNode.getAttribute('rel') == 'sidebar' ||
        targetAttr == '_search' || href.indexOf('mailto:') > -1) {
      return ['default@5'];
    }

    /*
     * prevent tabs from opening if left-clicked link ends with given filetype or matches regexp;
     * portions were taken from disable target for downloads by cusser
     */
    if (this.suppressTabsOnFileDownload()) {
      // don't do anything if we are on gmail and let gmail take care of the download
      const url = this._data.currentURL;
      const isGmail = /^(http|https):\/\/mail.google.com/.test(url);
      // Don't use default for pinned tab, openLinkIn (utilityOverlay.js) open
      // new tab when the current tab is pinned and aAllowPinnedTabHostChange
      // is false
      const isHttps = !event._pinned && /^https/.test(href);
      if (isGmail || isHttps) {
        return ['default@6', true];
      }
      return ['current@7', true];
    }

    // check this after we check for suppressTabsOnFileDownload
    // for the case the link have a match in our list
    if (typeof event.tabmix_openLinkWithHistory == 'boolean') {
      return ['current@9'];
    }

    // don't mess with links that have onclick inside iFrame
    const onClickInFrame = wrappedOnClickNode && wrappedOnClickNode.ownerDocument.defaultView.frameElement ||
        onclick && wrappedNode.ownerDocument.defaultView.frameElement;

    /*
     * force a middle-clicked link to open in the current tab if certain conditions
     * are true. See the function comment for more details.
     */
    if (this.divertMiddleClick()) {
      // make sure to trigger hrefFromOnClick getter
      void this._data.hrefFromOnClick;
      return [onClickInFrame ? 'current.frame@10' : 'current@10'];
    }

    if (onClickInFrame) {
      return ['default@11'];
    }

    // catch other middle & right click
    if (event.button !== 0) {
      return event.button == 1 && this._data.hrefFromOnClick ?
        [`${TMP_tabshifted(event)}@12`] : ['default@12'];
    }

    // the rest of the code if for left-click only

    /*
     * don't change default behavior for links that point to exiting frame
     * in the current page
     */
    if (wrappedNode && wrappedNode.targetIsFrame &&
        preferences.targetIsFrame) {
      return ['default@13'];
    }

    /*
     * open targeted links in the current tab only if certain conditions are met.
     * See the function comment for more details.
     */
    if (this.divertTargetedLink()) {
      return ['current@14'];
    }

    /*
     * open links to other sites in a tab only if certain conditions are met. See the
     * function comment for more details.
     */
    if (this.openExSiteLink()) {
      return [`${TMP_tabshifted(event)}@15`];
    }

    //XXX TODO: - need to find a way to get the status of lock tab
    if (this.currentTabLocked || this.targetPref == 1) { // tab is locked
      const openNewTab = this.openTabfromLink();
      if (openNewTab !== null) {
        const result = openNewTab ? TMP_tabshifted(event) : 'default';
        return [`${result}@16`];
      }
    }
    return ['default@17'];
  },

  miscellaneous(node) {
    if ('className' in node) {
      // don't interrupt with noscript
      if (node.className.indexOf('__noscriptPlaceholder__') > -1) {
        return true;
      }

      const className = node.className.toLowerCase();
      // need to find a way to work here only on links
      if (/button/.test(className)) {
        return true;
      }

      const isAMO = /^(http|https):\/\/addons.mozilla.org/.test(this._data.currentURL);
      if (isAMO && /flag-review/.test(className)) {
        return true;
      }
    }

    if (node.hasAttribute('href') && node.hasAttribute('role')) {
      const role = node.getAttribute('role');
      if (role == 'button' || role == 'menu') {
        return true;
      }
    }

    // don't interrupt with fastdial links
    return 'ownerDocument' in node &&
        Tabmix.isNewTabUrls(node.ownerDocument.documentURI);
  },

  /**
   * @brief Suppress tabs that may be created by installing Greasemonkey script
   *
   * @returns             true if the link is a script.
   *
   */
  isGreasemonkeyScript(href) {
    // if (this.isGMEnabled(this._window)) {
    if (this.isGMEnabled()) {
      if (href && href.match(/\.user\.js(\?|$)/i)) {
        return true;
      }
    }
    return false;
  },

  // XXX TODO: - need to find how the get the status of Greasemonkey on current windows
  isGMEnabled() {
    return false;
  },

  /**
   * @brief Suppress tabs that may be created by downloading a file.
   *
   * This code borrows from Cusser's Disable Targets for Downloads extension.
   *
   * @returns             true if the link was handled by this function.
   *
   */
  suppressTabsOnFileDownload() {
    // if we are in google search don't prevent new tab
    if (/\w+\.google\.\D+\/search?/.test(this._data.currentURL)) {
      return false;
    }

    const {event, href: _href, hrefFromOnClick} = this._data;
    const href = hrefFromOnClick || _href;

    // prevent link with 'custombutton' protocol to open new tab when custombutton extension exist
    if (event.button != 2 && typeof custombuttons != 'undefined') {
      if (this.checkAttr(href, 'custombutton://')) {
        return true;
      }
    }

    if (event.button !== 0 || event.ctrlKey || event.metaKey) {
      return false;
    }

    // prevent links in tinderbox.mozilla.org with linkHref to *.gz from open in this function
    if (this.checkAttr(href, 'http://tinderbox.mozilla.org/showlog') ||
        this.checkAttr(href, 'http://tinderbox.mozilla.org/addnote')) {
      return false;
    }

    const onclick = this._data.onclick;
    if (onclick) {
      if (this.checkAttr(onclick, 'return install') ||
          this.checkAttr(onclick, 'return installTheme') ||
          // click on link in http://tinderbox.mozilla.org/showbuilds.cgi
          this.checkAttr(onclick, 'return note') || this.checkAttr(onclick, 'return log')) {
        return true;
      }
    }

    // lets try not to look into links that start with javascript (from 2006-09-02)
    if (this.checkAttr(href, 'javascript:')) {
      return false;
    }

    return this.isUrlForDownload(href);
  },

  isUrlForDownload(linkHref) {
    // we need this check when calling from onDragOver and onDrop
    if (linkHref.startsWith('mailto:')) {
      return true;
    }

    // always check if the link is an xpi link
    let filetype = ['xpi'];
    if (preferences.enablefiletype) {
      let types = preferences.filetype;
      types = types.toLowerCase().split(' ')
          .filter(t => filetype.indexOf(t) == -1);
      filetype = [...filetype, ...types];
    }

    let linkHrefExt = '';
    if (linkHref) {
      linkHref = linkHref.toLowerCase();
      linkHrefExt = linkHref.substring(linkHref.lastIndexOf('/'), linkHref.length);
      linkHrefExt = linkHrefExt.substring(linkHrefExt.indexOf('.'), linkHrefExt.length);
    }

    var testString, hrefExt, testExt;
    for (const type of filetype) {
      let doTest = true;
      if (type.indexOf('/') != -1) {
        // add \ before first ?
        testString = type.replace(/^\/(.*)\/$/, '$1').replace(/^\?/, '\\?');
        hrefExt = linkHref;
      } else if (type.includes('?')) {
        // escape any ? and make sure it starts with \.
        testString = type.replace(/\?/g, '?').replace(/\?/g, '\\?')
            .replace(/^\./, '').replace(/^\\\./, '');
        testString = `\\.${testString}`;
        hrefExt = linkHref;
      } else {
        testString = `\\.${type}`;
        hrefExt = linkHrefExt;
        try {
          // prevent filetype catch if it is in the middle of a word
          testExt = new RegExp(`${testString}[a-z0-9?.]+`, 'i');
          if (testExt.test(hrefExt)) {
            doTest = false;
          }
        } catch (ex) {}
      }
      try {
        if (doTest) {
          testExt = new RegExp(testString, 'i');
          if (testExt.test(hrefExt)) {
            return true;
          }
        }
      } catch (ex) {}
    }
    return false;
  },

  /**
   * @brief Divert middle-clicked links into the current tab.
   *
   * This function forces a middle-clicked link to open in the current tab if
   * the following conditions are true:
   *
   * - links to other sites are not configured to open in new tabs AND the current
   *   page domain and the target page domain do not match OR the current
   *   tab is locked
   * - middle-clicks are configured to open in the current tab AND the middle
   *   mouse button was pressed OR the left mouse button and one of the Ctrl/Meta keys
   *   was pressed
   *
   * @returns              true if the function handled the click, false if it didn't.
   *
   */
  divertMiddleClick() {
    // middlecurrent - A Boolean value that controls how middle clicks are handled.
    if (!preferences.middlecurrent) {
      return false;
    }

    var isTabLocked = this.targetPref == 1 || this.currentTabLocked;
    var isDifDomain = this.targetPref == 2 && this._data.isLinkToExternalDomain;
    if (!isTabLocked && !isDifDomain) {
      return false;
    }

    const {event} = this._data;
    return event.button == 1 || event.button === 0 && (event.ctrlKey || event.metaKey);
  },

  /**
   * @brief Divert links that contain targets to the current tab.
   *
   * This function forces a link with a target attribute to open in the
   * current tab if the following conditions are true:
   *
   * - linkTarget is true
   * - neither of the Ctrl/Meta keys were used AND the link node has a target attribute
   *   AND the content of the target attribute is not one of the special frame targets
   * - all links are not forced to open in new tabs.
   * - links to other sites are not configured to open in new tabs OR the domain name
   *   of the current page and the domain name of the target page match
   * - the current tab is not locked
   * - the target of the event has an onclick attribute that does not contain the
   *   function call 'window.open' or the function call 'return top.js.OpenExtLink'
   *
   * @returns                true if the function handled the click, false if it didn't.
   *
   */
  divertTargetedLink() {
    const href = this._data.hrefFromOnClick || this._data.href;
    if (this.checkAttr(href, 'javascript:') || // 2005-11-28 some link in Bloglines start with javascript
        this.checkAttr(href, 'data:')) {
      return false;
    }

    const {event, targetAttr} = this._data;
    if (!targetAttr || event.ctrlKey || event.metaKey) {
      return false;
    }

    if (!preferences.linkTarget) {
      return false;
    }

    var targetString = /^(_self|_parent|_top|_content|_main)$/;
    if (targetString.test(targetAttr.toLowerCase())) {
      return false;
    }

    if (this.currentTabLocked) {
      return false;
    }
    if (this.targetPref == 1 ||
        this.targetPref == 2 && this._data.isLinkToExternalDomain) {
      return false;
    }

    return !this.checkOnClick();
  },

  /**
   * @brief Open links to other sites in tabs as directed.
   *
   * This function opens links to external sites in tabs as long as the following
   * conditions are met:
   *
   * - links protocol is http[s] or about
   * - links to other sites are configured to open in tabs
   * - the link node does not have an 'onclick' attribute that contains either the function call
   *   'window.open' or the function call 'return top.js.OpenExtLink'.
   * - the domain name of the current page and the domain name of the target page do not match
   *   OR the link node has an 'onmousedown' attribute that contains the text 'return rwt'
   *
   * @returns                true to load link in new tab
   *                         false to load link in current tab
   *
   */
  openExSiteLink() {
    if (this.targetPref != 2 || Tabmix.isNewTabUrls(this._data.currentURL)) {
      return false;
    }

    if (this.GoogleComLink()) {
      return false;
    }

    if (this.checkOnClick()) {
      return false;
    }

    const {href, hrefFromOnClick, isLinkToExternalDomain, wrappedNode} = this._data;
    return /^(http|about)/.test(hrefFromOnClick || href) &&
        (isLinkToExternalDomain || wrappedNode &&
        this.checkAttr(wrappedNode.getAttribute('onmousedown'), 'return rwt'));
  },

  /**
   * @brief Open links in new tabs when tab is lock or preference is to always open tab from links.
   *
   * @returns null if the caller need to handled the click,
              true to load link in new tab
              false to load link in current tab
   */
  openTabfromLink() {
    if (Tabmix.isNewTabUrls(this._data.currentURL)) {
      return false;
    }

    if (this.GoogleComLink()) {
      return null;
    }

    let {href, hrefFromOnClick} = this._data;
    if (!/^(http|about)/.test(hrefFromOnClick || href)) {
      return null;
    }

    // don't open new tab from facebook chat and settings
    if (/www\.facebook\.com\/(?:ajax|settings)/.test(href)) {
      return false;
    }

    const current = this._data.currentURL.toLowerCase();
    const youtube = /www\.youtube\.com\/watch\?v=/;
    const isYoutube = _href => youtube.test(current) && youtube.test(_href);
    const getPath = url => {
      const {pathname, search} = new URL(url);
      return pathname + search;
    };
    const isSamePath = (_href, att) => getPath(current).split(att)[0] == getPath(_href).split(att)[0];
    const isSame = (_href, att) => current.split(att)[0] == _href.split(att)[0];

    if (hrefFromOnClick) {
      hrefFromOnClick = hrefFromOnClick.toLowerCase();
      if (isYoutube(hrefFromOnClick)) {
        return !isSamePath(hrefFromOnClick, '&t=');
      }

      return !isSame(hrefFromOnClick, '#');
    }

    if (href) {
      href = href.toLowerCase();
    }

    if (this.checkAttr(href, 'javascript:') ||
        this.checkAttr(href, 'data:') ||
        this.checkOnClick(true)) {
      // javascript links, do nothing!
      return null;
    } else if (isYoutube(href)) {
      return !isSamePath(href, '&t=');
    }

    // when the links target is in the same page don't open new tab
    return !isSame(href, '#');
  },

  /**
   * @brief Test if target link is special Google.com link preferences , advanced_search ...
   *
   * @returns true it is Google special link false for all other links
   */
  GoogleComLink() {
    var location = this._data.currentURL;
    var currentIsnGoogle = /\/\w+\.google\.\D+\//.test(location);
    if (!currentIsnGoogle) {
      return false;
    }

    if (/calendar\/render/.test(location)) {
      return true;
    }

    const node = this._data.wrappedNode || this._data.wrappedOnClickNode;
    if (/\/intl\/\D{2,}\/options\/|search/.test(node.pathname)) {
      return true;
    }

    const _list = ['/preferences', '/advanced_search', '/language_tools', '/profiles',
      '/accounts/Logout', '/accounts/ServiceLogin', '/u/2/stream/all'];

    const testPathname = _list.indexOf(node.pathname) > -1;
    if (testPathname) {
      return true;
    }

    const _host = [
      'profiles.google.com',
      'accounts.google.com',
      'groups.google.com',
      'news.google.com',
    ];
    return _host.indexOf(node.host) > -1;
  },

  // selectExistingTab(window, href, targetFrame) { },

  // frameSearchEpoch: 0,
  // frameSearch: new Map(),

  // isFrameInContent(windows, frameData, isMultiProcess) {},

  /**
   * @brief Check for certain JavaScript strings inside an attribute.
   *
   * @param attr     The attribute to check.
   * @param string   The string to check for.
   * @returns        true if the strings are present, false if they aren't.
   *
   */
  checkAttr: function TMP_checkAttr(attr, string) {
    if (typeof attr == 'string') {
      return attr.startsWith(string);
    }
    return false;
  },

  getBaseDomain(url) {
    const fixupURI = _url => {
      try {
        return new URL(_url);
      } catch (ex) {
        // apply simple fix instead of nsIURIFixup
        if (!_url.startsWith('http')) {
          return fixupURI(`http://${_url}`);
        }
      }
      return null;
    };

    if (typeof url != 'string') {
      url = url.toString();
    }

    if (url.match(/auth\?/)) {
      return null;
    }

    if (url.startsWith('file:')) {
      return 'local_file';
    }

    const fixedURI = fixupURI(url);
    if (fixedURI && ['http:', 'https:'].includes(fixedURI.protocol)) {
      url = fixedURI;

      // catch redirect
      const path = url.pathname + url.search;
      if (path.match(/^\/r\/\?http/)) {
        url = fixupURI(path.substr('/r/?'.length));
      } else if (path.match(/^.*\?url=http/)) {
        // redirect in www.reddit.com
        url = fixupURI(path.replace(/^.*\?url=/, ''));
      }
      if (!url) {
        return null;
      }
      const domain = getDomain(url.host);
      debug(`domain ${domain}`);
      return domain;
    }
    return null;
  },

  /**
   * @brief Check if link refers to external domain.
   *
   * @param target    The target link.
   * @param curpage   The current page url
   * @returns         true when curpage and target are in different domains
   *
   */
  isLinkToExternalDomain: function TMP_isLinkToExternalDomain(curpage, target) {
    const targetDomain = this.getBaseDomain(target);
    return targetDomain && targetDomain != this.getBaseDomain(curpage);
  },

  /**
   * @brief check if the link contain special onclick function.
   */
  checkOnClick: function TMP_checkOnClick(more) {
    const {onclick} = this._data;
    if (onclick) {
      if (this.checkAttr(onclick, 'window.open') ||
          this.checkAttr(onclick, 'NewWindow') ||
          this.checkAttr(onclick, 'PopUpWin') ||
          this.checkAttr(onclick, 'return ')) {
        return true;
      }

      if (more && (this.checkAttr(onclick, 'openit') ||
          onclick.indexOf('this.target="_Blank"') != -1 ||
          onclick.indexOf('return false') != -1)) {
        return true;
      }
    }
    return false;
  },

  /**
   * @brief prevent onclick function with the form javascript:top.location.href = url
   *        or the form window.location = url when we force new tab from link
   */
  getHrefFromOnClick(event, href, node, onclick) {
    if (typeof event.__hrefFromOnClick != 'undefined') {
      log('(typeof event.__hrefFromOnClick != \'undefined\')', event.__hrefFromOnClick);
      return event.__hrefFromOnClick;
    }

    const result = {__hrefFromOnClick: null};
    if (onclick) {
      this._hrefFromOnClick(href, node, onclick, result);
    } else {
      const parent = node.parentNode;
      if (parent && parent.hasAttribute('onclick')) {
        this._hrefFromOnClick(href, parent, parent.getAttribute('onclick'), result);
      }
    }
    return (event.__hrefFromOnClick = result.__hrefFromOnClick);
  },

  _hrefFromOnClick(href, node, onclick, result) {
    log('start this._hrefFromOnClick');
    const re = /^(javascript:)?(window\.|top\.)?(document\.)?location(\.href)?=/;
    if (!re.test(onclick)) {
      log('!re.test(onclick)');
      return;
    }

    let clickHref = onclick.replace(re, '').trim().replace(/;|'|'/g, '');
    log('clickHref', clickHref, 'node.baseURI', node.baseURI);
    // special case for forum/ucp.php
    if (clickHref == 'this.firstChild.href') {
      clickHref = href;
    }
    let newHref;
    // get absolute href
    try {
      newHref = new URL(clickHref, new URL(node.baseURI)).href;
    } catch (ex) {
      // unexpected error
      console.error(`${ex}\nunexpected error from new URL\nurl ${clickHref}`);
      return;
    }

    // Don't open new tab when the link protocol is not http or https
    if (!/^(http|about)/.test(newHref)) {
      return;
    }

    // don't change the onclick if the href point to a different address
    // from the href we extract from the onclick
    if (href && href.indexOf(clickHref) == -1 &&
        !this.checkAttr(href, 'javascript')) {
      return;
    }

    result.__hrefFromOnClick = newHref;
  },
};

async function getActiveTab() {
  const tabs = await browser.tabs.query({currentWindow: true, active: true});
  return tabs[0] || {url: '', pinned: false};
}

async function asyncResponse(message, sender, sendResponse) {
  log('asyncResponse starts');
  // we need activeTab to get pinned
  // we can get current utl form the content script by using top.location.href
  const activeTab = await getActiveTab();
  message.event._currentURL = activeTab.url;
  message.event._pinned = activeTab.pinned;
  log(`message.event._currentURL ${message.event._currentURL}`, message.event._currentURL);
  // const whereToOpen = linksHandler.whereToOpen(message);
  // log('asyncResponse sendResponse', whereToOpen[0]);
  // sendResponse({where: whereToOpen[0]});
  // linksHandler.resetData();
  const result = linksHandler.receiveMessage(message);
  log('asyncResponse sendResponse', result);
  sendResponse(result);
}

function onMessage(message, sender, sendResponse) {
  // debug(message);
  // if (message.type == 'open-tab') {
  //   browser.tabs.create({url: message.url});
  //   return false;
  // }
  log('onMessage starts');
  asyncResponse(message, sender, sendResponse);
  log('onMessage return true');
  return true;
}

browser.runtime.onMessage.addListener(onMessage);

/*
 TODO
 1. check how to set - browser.tabmix_allowLoad = true;
    maybe I can keep map of tabs and for each tab have set of property to use in the extension
 2. for non-xul link that i need to disable thee on-click
    - inject <a target='_blank'> link with the href we need with

*/

/*
add spacial pages list to content js
  1. github
  2. https://discourse.mozilla.org

*/
