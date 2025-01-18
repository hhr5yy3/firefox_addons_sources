function pfDataBuilder(win, doc, node) {
  var config = {
    environment: 'production',
    disableUI: false,
    protocol: 'https:',
    dir: 'ltr',
    usingBM: false,
    maxImageWidth: 750,
    filePath: '/assets/',
    platform: 'unknown',
    enablePrintOnly: false,
    extensionId: win.extensionId,
    extensionRootTabId: win.extensionRootTabId,
    extensionPath: win.extensionPath,
    enableLog: true,
    hosts: {
      cdn: 'https://cdn.printfriendly.com',
      pf: 'https://www.printfriendly.com',
      ds: 'https://www.printfriendly.com',
      translations: 'https://www.printfriendly.com',
      ds_cdn: 'https://key-cdn.printfriendly.com',
      pdf: 'https://pdf.printfriendly.com',
      email: 'https://www.printfriendly.com',
      page: win.location.host.split(':')[0]
    },
    urls: {
      page: win.location.href
    },
    domains: {
      page: win.location.host.split(':')[0].split('www.').pop()
    },
  };
  var htmlPreProcessor = {
    LARGE_IMAGE_WIDTH: 300,
    LARGE_IMAGE_HEIGHT: 200,

    run: function (node) {
      this.processChildren(node);
    },

    /* Mark hidden elements
     * Set Full URLs for images and links
     * Set width and height for images to keep size with removed stylesheets
     * Not splitting it into separate functions to avoid the
     * function call overhead as allElements can be very huge
     */
    processChildren: function (sourceElement) {
      var nodeName;
      var queue = [];
      // NOTE: phantomjs children property returns `undefined` for some elements(ex. SVGElements)
      // so we have to verify it first
      if (sourceElement.children && sourceElement.children.length) {
        for (var i = 0, length = sourceElement.children.length; i < length; i++) { queue.push(sourceElement.children[i]); }
      }

      var sourceChild = null;
      while (sourceChild = queue.shift()) {
        if (!commonUtils.hasClass(sourceChild, 'comment-list')) {
          // Process current element
          if (sourceChild.nodeType === Node.ELEMENT_NODE) {
            nodeName = sourceChild.nodeName.toLowerCase();

            persistComputedStylesAndRect(sourceChild);

            if (false
              // TODO: !userSettings.showHiddenContent && (sourceChild.getAttribute('data-pf_style_display') === 'none' || sourceChild.getAttribute('data-pf_style_visibility') === 'hidden')
            ) {
              commonUtils.addClassTo(sourceChild, "hidden-originally");
            } else if (commonUtils.hasClass(sourceChild, 'hidden-originally')) {
              commonUtils.removeClassFrom(sourceChild, 'hidden-originally');
            }

            if (nodeName === 'a') {
              // A: Convert relative to absolute URL
              var href = sourceChild.getAttribute('href');
              if (href && href.charAt(0) !== '#' && !href.startsWith('http')) {
                // sourceChild.href gives the full URL. So we use it here instead of
                // the result of getAttribute which return the original href
                sourceChild.setAttribute('href', toAbsoluteUrl(href, config));
              }
            } else if ((nodeName === 'input' || nodeName === 'textarea')) {
              if (sourceChild.type === 'radio' || sourceChild.type === 'checkbox') {
                if (sourceChild.checked) {
                  sourceChild.setAttribute("checked", "checked");
                }
              } else {
                sourceChild.setAttribute('value', sourceChild.value);
              }
            } else if (nodeName === 'select' && sourceChild.options.length && sourceChild.selectedIndex >= 0) {
              sourceChild.options[sourceChild.selectedIndex].setAttribute("selected", "selected");
            } else if (nodeName === 'img' || nodeName === 'svg') {
              // Convert relative to absolute URL
              if (sourceChild.getAttribute('src')) { sourceChild.src = sourceChild.src; }
              var srcset = sourceChild.getAttribute('srcset') || sourceChild.getAttribute('data-srcset');
              if (srcset) {
                var srcs = srcset.split(/,\s/);
                var newSrcs = [];
                for (var j = 0; j < srcs.length; j++) {
                  var src = srcs[j];
                  newSrcs.push(toAbsoluteUrl(src, config));
                }

                sourceChild.setAttribute('pf-data-srcset', newSrcs.join(', '));
                sourceChild.removeAttribute('srcset');
              }
              if (nodeName === 'img' && !commonUtils.hasClass(sourceChild, 'hidden-originally')) {
                var imgHeight = commonUtils.getImageHeight(sourceChild, false);
                var imgWidth = commonUtils.getImageWidth(sourceChild, false);

                if ((imgWidth * imgHeight) > (this.LARGE_IMAGE_WIDTH * this.LARGE_IMAGE_HEIGHT)) {
                  commonUtils.addClassTo(sourceChild, 'pf-large-image');
                }
              }
            }

          }

          // NOTE: phantomjs children property returns `undefined` for some elements(ex. SVGElements)
          // so we have to verify it first
          if (sourceChild.children && sourceChild.children.length) {
            for (var i = 0, length = sourceChild.children.length; i < length; i++) { queue.push(sourceChild.children[i]); }
          }
        }
      }
    }
  };

  var emailText = function () {
    var elements = node.getElementsByClassName('pf-email');
    return elements.length ? elements[0].textContent : '';
  };

  var csStyleSheetHrefs = function () {
    var hrefs = [];

    for (var i = 0; i < doc.styleSheets.length; i++) {
      hrefs.push(doc.styleSheets[i].href);
    }

    return hrefs;
  };

  var metas = function () {
    var metaTags = doc.getElementsByTagName('meta');
    var metas = [];

    for (var i = 0; i < metaTags.length; i++) {
      metas.push({
        name: metaTags[i].getAttribute('name'),
        content: metaTags[i].getAttribute('content'),
        property: metaTags[i].getAttribute('property'),
        itemprop: metaTags[i].getAttribute('itemprop')
      });
    }

    return metas;
  };

  var screen = function () {
    return {
      x: typeof win.top.screenX != 'undefined' ? win.top.screenX : win.top.screenLeft,
      y: typeof win.top.screenY != 'undefined' ? win.top.screenY : win.top.screenTop,
      width: typeof win.top.outerWidth != 'undefined' ? win.top.outerWidth : win.top.document.documentElement.clientWidth,
      height: typeof win.top.outerHeight != 'undefined' ? win.top.outerHeight : (win.top.document.documentElement.clientHeight - 22)
    };
  }

  var language = function () {
    var lang = node.getElementsByTagName('html')[0].getAttribute('lang');

    if (!lang) {
      var metaLang = node.querySelector('meta[http-equiv=Content-Language]');
      if (metaLang) {
        lang = metaLang.getAttribute('content');
      }
    }

    return lang;
  };

  var canvasDataUrls = function () {
    var dataUrls = [];

    var canvases = node.getElementsByTagName('canvas');
    for (var i = 0; i < canvases.length; i++) {
      try {
        var canvas = canvases[i];
        var dataUrl = canvas.toDataURL('image/png');
        canvas.setAttribute('pf-dataurl-index', dataUrls.length);
        dataUrls.push(dataUrl);
      } catch (e) { } // Ignore canvas tainted error
    }

    return dataUrls;
  };

  var favicon = function () {
    return "https://s2.googleusercontent.com/s2/favicons?domain=" + win.location.host;
  };

  var getApplicationLd = function () {
    var applicationLdNode = doc.querySelector('script[type="application/ld+json"]')
    if (applicationLdNode) {
      var applicationLdJSON = applicationLdNode.textContent.replace(/^\s*\/*\s<!\[CDATA\[|\]\]>\s*$/g, "").replace(/[/\s]*$/, '');
      try {
        return JSON.parse(applicationLdJSON);
      } catch (e) {
        exTracker.log(e);
      }
    }
  };

  return function () {
    return new Promise(resolve => {
      var location = doc.location;

      htmlPreProcessor.run(node);

      page = {
        dir: doc.body.getAttribute('dir') || doc.querySelector('html').getAttribute('dir') || getComputedStyle(doc.body).getPropertyValue('direction') || 'ltr',
        bodyClassList: [].slice.call(doc.body.classList || doc.body.className.split(' ')), // Convert Array like object to Array
        emailText: emailText(),
        screen: screen(),
        metas: metas(),
        csStyleSheetHrefs: csStyleSheetHrefs(),
        location: {
          href: location.href,
          host: location.host,
          pathname: location.pathname,
          protocol: location.protocol
        },
        enablePrintOnly: false,
        hasPrintOnly: !!doc.querySelector('#print-only, .print-only'),
        title: doc.title,
        // NOTE: in case we populate algo iframe with HTML containing <embed> tag in some cases it become broken for printing
        // Ref.: https://github.com/printfriendly/printfriendly/issues/2099
        body: node.body.innerHTML.replace(/<\s*?embed[^>]*?>(.*?<\s*?\/\s*?embed\s*?>)?/g, ''),
        language: language(),
        canvasDataUrls: canvasDataUrls(),
        favicon: favicon(),
        applicationLd: getApplicationLd(doc)
      };

      resolve({
        startTime: new Date().getTime(),
        config,
        userSettings: {
          imagesSize: 'full-size'
        },
        // userSettings: pf.userSettings,
        version: 'client',
        onServer: false,
        browser: { isIE: false },
        dsData: {},
        stats: {},
        page: page
      })
    })
  }
};


function PfAlgo(node) {
  return new Promise(resolve => {
    pfDataBuilder(window, document, node)().then(pfData => {
      const algoIframe = commonUtils.createIframe(document);

      messageBus.listen('', {
        PfExtensionAlgoLoaded: function () {
          messageBus.postMessage('algo', 'PfLoadAlgo', { pfData: pfData });
        },
        PfAlgoLoaded: function () {
          messageBus.postMessage('algo', 'PfStartAlgo', { pfData: pfData });
        },
        PfNSFWChecked: function () { },
        PfRunPostAlgoProcesses: function ({ contentData }) {
          algoIframe.remove();

          resolve({
            url: pfData.page.location.href,
            title: contentData.title,
            byline: contentData.author,
            dir: contentData.dir,
            content: contentData.content,
            textContent: contentData.contentTextWithTitleAndUrl,
            length: contentData.contentTextLength,
            excerpt: "",
            siteName: contentData.platform
          });
        }
      });

      algoIframe.id = 'algo-iframe';
      algoIframe.name = 'algo';
      commonUtils.addClassTo(algoIframe, 'js-print-area');
      commonUtils.addClassTo(algoIframe, 'flex-auto');
      algoIframe.height = "500px";
      algoIframe.width = "80%";
      document.body.appendChild(algoIframe);

      algoIframe.src = window.extensionPath + '/data/inject/PfAlgo/algo.html';
      algoIframe.onload = function () {
        messageBus.postMessage('algo', 'PfInitAlgoExtension', { extensionRootTabId: window.extensionRootTabId });
        try {
          algoWindow = algoIframe.contentWindow;
          if (algoWindow && algoWindow.document) {
            algoWindow.document.title = originalTitle;
          }
          messageBus.postMessage(
            'algo', 'PfLoadAlgo', { pfData: pfData },
            function () { messageBus.postMessage('root', 'PfExtensionAlgoLoaded'); }
          );
        } catch (e) { }
      };
    })
  })
}
