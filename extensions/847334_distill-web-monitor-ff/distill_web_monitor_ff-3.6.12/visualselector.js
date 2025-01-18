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

