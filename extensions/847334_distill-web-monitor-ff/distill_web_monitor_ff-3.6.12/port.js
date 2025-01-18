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

