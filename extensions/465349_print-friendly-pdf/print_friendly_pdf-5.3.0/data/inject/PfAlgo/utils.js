var commonUtils = {
  hasClass: function(node, className) {
    if (node.nodeType !== Node.ELEMENT_NODE) { return false; }
    if (node.classList) { return node.classList.contains(className); }

    var classNames = (node.getAttribute('class') || '').split(/\s/);
    return classNames.indexOf(className) >= 0;
  },
  addClassTo: function(node, className) {
    if (node.nodeType !== Node.ELEMENT_NODE) { return; }

    if(!commonUtils.hasClass(node, className)) {
      if (node.classList) {
        node.classList.add(className);
      } else {
        node.className = (node.className || '') + ' ' + className;
      }
    }
  },
  removeClassFrom: function(node, className) {
    if (node.nodeType !== Node.ELEMENT_NODE) { return; }

    if(commonUtils.hasClass(node, className)) {
      if (node.classList) {
        node.classList.remove(className);
      } else {
        var classNames = (node.getAttribute('class') || '').split(' ');
        var index = classNames.indexOf(className);
        if (index >= 0) { classNames.splice(index, 1); }
        node.setAttribute('class', classNames.join(' '));
      }
    }
  },
  getImageWidth: function (img, onServer) {
    if (img.jquery) { img = img[0]; }
    var result = null;
    if (onServer) {
      var pfDataWidth = img.getAttribute('pf-data-width');
      if (pfDataWidth) { result = parseInt(pfDataWidth, 10); }
    } else if (img.getAttribute('data-pf_rect_width')) {
      result = parseInt(img.getAttribute('data-pf_rect_width'), 10);
    }

    /*
      Fetch current height/width if value is zero as firefox
      sets the width/height as zero for some images when we initially persist
      the values
    */
    if (result === null || result === 0 || typeof result != 'number' || isNaN(result)) {
      result = img.getBoundingClientRect().width;
    }
    return result;
  },

  getImageHeight: function (img, onServer) {
    if (img.jquery) { img = img[0]; }
    var result = null;
    if (onServer) {
      var pfDataHeight = img.getAttribute('pf-data-height');
      if (pfDataHeight) { result = parseInt(pfDataHeight, 10); }
    } else if (img.getAttribute('data-pf_rect_height')) {
      result = parseInt(img.getAttribute('data-pf_rect_height'), 10);
    }

    /*
      Fetch current height/width if value is zero as firefox
      sets the width/height as zero for some images when we initially persist
      the values
    */
    if (result === null || result === 0 || typeof result != 'number' || isNaN(result)) {
      result = img.getBoundingClientRect().height;
    }
    return result;
  },

  MAX_SVG_SIZE: 1000,
  MAX_SVG_ICON_SIZE: 21,
  ICON_REGEXP: /icon/i,
  svgMaxValue: function(svg) {
    return this.ICON_REGEXP.test(svg.getAttribute('class') || '') ? this.MAX_SVG_ICON_SIZE : this.MAX_SVG_SIZE;
  },

  svgViewBox: function(svg) {
    var viewBox = svg.getAttribute('viewBox');
    if (viewBox) {
      var viewBoxValues = viewBox.split(' ');
      if (viewBoxValues.length === 4) { return { width: parseInt(viewBoxValues[2], 10), height: parseInt(viewBoxValues[3], 10) }; }
    }
    return {};
  },

  INFINITY: 1000000,
  getSvgImageWidth: function(svg, onServer) {
    var result = this.getImageWidth(svg, onServer) || this.INFINITY;
    var maxValue = this.svgMaxValue(svg);
    var viewBoxValue = this.svgViewBox(svg).width || this.INFINITY;
    return Math.min(result, maxValue, viewBoxValue);
  },

  getSvgImageHeight: function(svg, onServer) {
    var result = this.getImageHeight(svg, onServer);
    var maxValue = this.svgMaxValue(svg);
    var viewBoxValue = this.svgViewBox(svg).height || this.INFINITY;
    return Math.min(result, maxValue, viewBoxValue);
  },

  getTopWrapper: function(node) {
    var parent = node.parentNode;
    if (parent.childNodes.length > 1) { return node; }
    return this.getTopWrapper(parent);
  },
  selectorsNotToBeRemoved: [
    '.copyright',
    '#copyright',
    '.delete-no',
    '.delete-off',
    '.pf-author',
    '.print-content',
    '#print-content',
    '.pf-date',
    '#pf-date',
    '.pf-title',
    '.pf-footer',
    '.print-header',
    '.print-footer',
    '.print-yes',
    '.pf-content',
    '#pf-content',
  ],
  isDeletableElement: (function () {
    var CLICK_TO_DEL_ELEMENTS = 'small, footer, header, aside, details, dialog, figure, nav, summary, twitter-widget, p, img, blockquote, h1, h2, h3, h4, h5, h6, ol, ul, li, a, table, td, pre, span, code, dl, dt, dd, hr, div.pf-caption, video, figcaption, data';
    var MANY_ELEMENTS_THRESHOLD = 15;

    return function isDeletableElement(node) {
      return (
        !commonUtils.hasClass(node, 'non-delete') &&
        !$(node).find(commonUtils.selectorsNotToBeRemoved.join(', ')).length && (
          node.matches(CLICK_TO_DEL_ELEMENTS) ||
          $(node).find('*:visible').length <= MANY_ELEMENTS_THRESHOLD
        )
      );
    };
  })(),

  resizeImageCssClass: function(value) {
    return 'pf-size-' + value.replace('-size', '').replace('-images', '');
  },

  addCSS: function(css, doc, useBody) {
    var tagName = useBody ? 'body' : 'head';
    var element = doc.getElementsByTagName(tagName)[0];
    var style = doc.createElement('style');

    style.type = 'text/css';
    style.setAttribute('name', 'pf-style');

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }
    element.appendChild(style);
  },

  createIframe: function(doc) {
    var iframe = doc.createElement('iframe');
    // TODO: do we need this src? If yes add sha256 to manifest.json CSP to avoid. Commented for now
    // Error: "Refused to execute JavaScript URL because it violates the following Content Security Policy..."
    /* jshint -W107 */
    // iframe.src = "javascript:false";
    /* jshint +W107 */
    iframe.frameBorder = '0';
    iframe.allowTransparency = 'true';
    return iframe;
  },

  loadHtmlInIframe: function(doc, iframe, html) {
    var dom, idoc;

    try {
      idoc = iframe.contentWindow.document;
    } catch(e) {
      dom = doc.domain;
      /* jshint -W107 */
      iframe.src = "javascript:var d=document.open();d.domain='"+dom+"';void(0);";
      /* jshint +W107 */
      idoc = iframe.contentWindow.document;
    }
    idoc.write(html);
    idoc.close();
  }
};
