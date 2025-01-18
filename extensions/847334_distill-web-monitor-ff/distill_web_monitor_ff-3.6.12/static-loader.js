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
}