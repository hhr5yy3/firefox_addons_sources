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
