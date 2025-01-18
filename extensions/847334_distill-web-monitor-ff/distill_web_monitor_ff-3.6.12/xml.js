var Xml = {
  xmlSerializer: new XMLSerializer(),
  domParser: new DOMParser(),
  fetch: async function (uri, request) {
    try {
      const res = await datasources.fetchData({ type: 'text', fetchOpts: { uri, request } });
      return { ...res, response: res.text };
    } catch (e) {
      throw new Error('Error while fetching: ' + uri + ' ' + e.message);
    }
  },
  toString: function (xmlDoc) {
    return Xml.xmlSerializer.serializeToString(xmlDoc);
  },
  parse: function (xmlText) {
    return Xml.domParser.parseFromString(xmlText, 'application/xml');
  },
  // ext only, will be overridden by electron
  filter: function (xmlText, selector) {
    const includes = selector?.includes;

    if (!includes || includes.length == 0) {
      return xmlText;
    }

    const xmlDoc = Xml.parse(xmlText);
    let matches = [];
    includes.forEach((include) => {
      if (include.type === 'xpath') {
        const xpathRes = xmlDoc.evaluate(include.expr, xmlDoc, null, XPathResult.ANY_TYPE, null);
        matches.push(xpathRes.iterateNext());
      }
    });

    xmlDoc.documentElement.setAttribute('__hasincl', '1');
    let parent;
    matches.forEach((node) => {
      node.setAttribute('__incl', '1');
      parent = node.parentElement;
      while (parent && parent !== xmlDoc.documentElement && !parent.getAttribute('__hasincl')) {
        parent.setAttribute('__hasincl', '1');
        parent = parent.parentElement;
      }
    });

    Xml.removeExcluded(xmlDoc.documentElement, matches);
    // when root element has both __incl and __hasincl attribute, __hasincl is not removed
    xmlDoc.documentElement.removeAttribute('__hasincl');

    return Xml.toString(xmlDoc);
  },
  removeExcluded: function (el) {
    let attrIncl = el.getAttribute('__incl');
    let attrHasI = el.getAttribute('__hasincl');

    if (attrIncl) {
      el.removeAttribute('__incl');
    } else if (attrHasI) {
      el.removeAttribute('__hasincl');
      let children = el.children;
      Array.from(children).forEach((childEl) => {
        Xml.removeExcluded(childEl);
      });
    } else {
      el.remove();
    }
  }
};
