window.exports = {};

window.module = {
  "exports": {}
};

window.process = {
  "env": {
    "YTDL_NO_UPDATE": true
  }
};

window.require = name => {
  if (name === "./utils") return window.utils;
  else if (name === "./sig") return window.sig;
  else if (name === "./info") return window.info;
  else if (name === "./cache") return window.Cache;
  else if (name === "./formats") return window.formats;
  else if (name === "./info-extras") return window.extras;
  else if (name === "./url-utils") return window.urlUtils;
  else if (name === "./format-utils") return window.formatUtils;
  else if (name === "../package.json") return {"version": "4.1.4"};
  /*  */
  else if (name === "url") {
    return {
      "URL": window.URL
    };
  } 
  /*  */
  else if (name === "timers") {
    return {
      "setTimeout": (...args) => {
        return {
          "unref": () => window.setTimeout(...args)
        }
      }
    }
  } 
  /*  */
  else if (name === "html-entities") {
    return {
      "AllHtmlEntities": {
        decode(str) {
          const parser = new DOMParser();
          const dom = parser.parseFromString(str, "text/html");
          return dom.body.textContent;
        }
      }
    };
  } 
  /*  */
  else if (name === "querystring") {
    return {
      parse(body) {
        const r = {};
        for (const [key, value] of new URLSearchParams(body)) {
          try {
            r[key] = decodeURIComponent(value);
          } catch (e) {
            r[key] = value;
          }
        }
        /*  */
        return r;
      }
    };
  } 
  /*  */
  else if (name === "sax") {
    const options = {
      close() {},
      write(content) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/xml");
        [...doc.querySelectorAll('*')].forEach(node => {
          options.onopentag({
            node,
            name: node.tagName.toUpperCase(),
            attributes: [...node.attributes].reduce((p, c) => {
              p[c.name.toUpperCase()] = c.value;
              return p;
            }, {})
          });
        });
        options.onend();
      }
    };
    /*  */
    return {
      parser() {
        return options;
      }
    };
  }
  /*  */
  else if (name === "vm") {
    class Script {
      constructor(code) {
        this.code = code;
      }
      //
      runInNewContext(options) {
        var code = this.code;        
        var [key, value] = Object.entries(options)[0];
        var rand = "---" + Math.floor((Math.random() * 1e11)).toString().slice(0, 10) + "---";
        //
        code = code.replace(/\r?\n|\r/g, '');
        code = code.replace(/[^;]+\(sig\)/, "self.postMessage('rand=" + rand + ",sig=' + $&)");
        code = code.replace(/[^;]+\(ncode\)/, "self.postMessage('rand=" + rand + ",ncode=' + $&)");
        code  = `var ${key}="${value}"; ` + code;        
        code = btoa(code);
        //
        var metric = new Promise((resolve, reject) => {
          var worker = new Worker(`data:text/javascript;base64,${code}`);
          worker.onmessage = async function (e) {
            var tmp = e.data.split(',');
            var key = tmp[0].split('=')[1];
            var value = tmp[1].split('=')[1];
            //
            resolve({"key": key, "value": value});
          };
        });
        //
        page.promises.push(metric);
        return rand;
      }
    }
    //
    return {Script};
  }
  /*  */
  else if (name === "miniget") {
    const r = (href, options = {}) => {
      var headers = new Headers();
      headers.append("Cache", "no-store");
      headers.append("Cache-Control", "no-store");
      for (var id in options.headers) {
        headers.append(id, options.headers[id]);
      }
      /*  */
      return {
        "setEncoding": function () {},
        "on": function (method, callback) {
          if (method === "data") {
            var crossorigin = href.indexOf(".youtube.") === -1;
            var mobileview = document.location.hostname.indexOf("m.youtube.") === 0;
            /*  */
            if (crossorigin || mobileview) {
              chrome.runtime.sendMessage({
                "data": {"href": href},
                "method": "crossorigin"
              }, callback);
            } else {
              var request = new Request(href);
              fetch(request, {
                "method": "GET",
                "headers": headers
              }).then(r => r.text()).then(callback);
            }
          }
        },
        "text": function () {
          var crossorigin = href.indexOf(".youtube.") === -1;
          var mobileview = document.location.hostname.indexOf("m.youtube.") === 0;
          /*  */
          if (crossorigin || mobileview) {
            return new Promise((resolve, reject) => {
              chrome.runtime.sendMessage({
                "data": {"href": href},
                "method": "crossorigin"
              }, resolve);
            });
          } else {
            var request = new Request(href);
            return fetch(request, {
              "method": "GET",
              "headers": headers
            }).then(r => r.text());
          }
        }
      }
    };
    /*  */
    return r;
  } 
  /*  */
  else {
    return {};
  }
};

(async () => {
  await import(chrome.runtime.getURL("data/content_script/resources/vendor/cache.js"));
  const tmp = window.module.exports;
  window.Cache = tmp;
  //
  await import(chrome.runtime.getURL("data/content_script/resources/vendor/formats.js"));
  window.formats = Object.assign({}, window.module.exports);
  //
  await import(chrome.runtime.getURL("data/content_script/resources/vendor/utils.js"));
  window.utils = Object.assign({}, window.exports);
  //
  await import(chrome.runtime.getURL("data/content_script/resources/vendor/sig.js"));
  window.sig = Object.assign({}, window.exports);
  //
  await import(chrome.runtime.getURL("data/content_script/resources/vendor/info-extras.js"));
  window.extras = Object.assign({}, window.exports);
  //
  await import(chrome.runtime.getURL("data/content_script/resources/vendor/format-utils.js"));
  window.formatUtils = Object.assign({}, window.exports);
  //
  await import(chrome.runtime.getURL("data/content_script/resources/vendor/url-utils.js"));
  window.urlUtils = Object.assign({}, window.exports);
  //
  await import(chrome.runtime.getURL("data/content_script/resources/vendor/info.js"));
  window.info = Object.assign({}, window.exports);
})();
