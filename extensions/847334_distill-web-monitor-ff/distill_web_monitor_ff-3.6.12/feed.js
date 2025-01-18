
/* 1
 * Feed parser
 * Parses raw XML feeds and converts them to so called Item objects (see below).
 * By qFox, 2010, http://qfox.nl
 */

var Feed = {
  domParser: new DOMParser(),

  /**
   * Detect the type of the feed and let type specific functions
   * parse the feed. The result is an array containing FeedItem
   * objects representing the items from the feed.
   * @param XML xml The actual feed, as an XML tree
   * @param string name Name of the feed, passed on to plugins
   * @param string group Name of group of the feed, passed on to plugins
   * @return array Contains Item objects
   */
  parse: function(xml, name, group) {
    let root; let result;

    // rss 1.0 ("rdf")
    if (xml.getElementsByTagName('rdf:RDF').length || xml.getElementsByTagName('RDF').length) {
      return Feed.parseRss1(xml, name, group);
    }

    // rss (2.0)
    if ((root = xml.getElementsByTagName('rss')) && root.length) { // RSS feed
      const version = root[0].getAttribute('version');
      if (version === '2.0') { // rss 2.0
        return Feed.parseRss2(root[0], name, group);
      }
      if (version === '0.91' || version === '0.92') { // rss 0.91 or 0.92
        return Feed.parseRss091(root[0], name, group);
      }
      throw new Error(' unknown rss version...');
    }

    // atom
    if (xml.getElementsByTagName('feed').length) {
      return Feed.parseAtom(xml, name, group);
    }

    throw new Error('unsupported feed');
    return false;
  },

  /**
   * Retrieve the node value for given attribute or an empty string on failure.
   * When the third parameter is given, it returns that attribute value of the node.
   * @param xml root The root node to search through
   * @param string name The node name we're looking for
   * @param string attr=false If given, the attribute of node we want returned
   * @return mixed
   */
  getNodeValue: function(root, name, attr) {
    try {
      const node = root.getElementsByTagName(name)[0];
      if (attr) {
        return node.getAttribute(attr);
      }

      return Feed.sanitize(node.childNodes[0].nodeValue);
    } catch (er) {
      return '';
    }
  },

  sanitize: function(text) {
    if (!/<\w.*>/.test(text)) return text;

    const doc = Feed.domParser.parseFromString(text, 'text/html');

    if (!doc || !doc.body) {
      return text;
    }

    const kachra = doc && doc.querySelectorAll(
      'script,link[as=script],noscript,frame,iframe,object'
    );

    _.toArray(kachra).forEach(el => el.remove());

    // Clean on* attributes for all elements
    Feed.sanitizeAttributes(doc.documentElement);

    return doc.documentElement.outerHTML;
  },

  sanitizeAttributes: function(el) {
    const attrs = _.toArray(el.attributes);

    _.each(attrs, function(attr) {
      if (attr.nodeName.startsWith('on')) {
        el.removeAttribute(attr);
      } else if (attr.value.toLowerCase().split(':')[0] == 'javascript') {
        el.removeAttribute(attr);
      }
    });

    _.each(el.childNodes, Feed.sanitizeAttributes);
  },

  /**
   * Parse a RSS 1.0 feed
   * Returns an array with FeedItem objects.
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseRss1: function(xmlRoot, name, group) {
    const
      result = [];


    const channel = xmlRoot.getElementsByTagName('channel')[0];


    const items = xmlRoot.getElementsByTagName('item');


    let item;


    let i;

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // throw new Error("Parsing item "+i+" ("+item+")");
      // title, link, description dc:creator, dc:date, dc:subject
      try {
        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'description'),
          Feed.getNodeValue(item, 'link'),
          Feed.getNodeValue(item, 'dc:date') || Feed.getNodeValue(item, 'pubDate') || Feed.getNodeValue(item, 'date') || '',
          item
        );
      } catch (er) {
        throw new Error('Unable to parse item '+i+': '+er.message);
      }
    }
    // return the items
    return {
      title: Feed.getNodeValue(channel, 'title'),
      link: Feed.getNodeValue(channel, 'link'),
      summary: Feed.getNodeValue(channel, 'description'),
      pubdate: Feed.getNodeValue(channel, 'pubDate') || Feed.getNodeValue(channel, 'dc:date') || Feed.getNodeValue(channel, 'date') || '',
      entries: result,
    };
  },

  /**
   * Parse an RSS 2.0 feed
   * Returns an array containing FeedItem objects.
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseRss2: function(xmlRoot, name, group) {
    let
      i;


    const result = [];


    let item;
    // one

    const channel = xmlRoot.getElementsByTagName('channel')[0];


    const items = xmlRoot.getElementsByTagName('item'); // collection of  nodes

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // now add the FeedItem
      try {
        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'description'),
          Feed.getNodeValue(item, 'link'),
          Feed.getNodeValue(item, 'pubDate') || Feed.getNodeValue(item, 'dc:date') || Feed.getNodeValue(item, 'date') || '',
          item
        );
      } catch (er) {
        throw new Error('Feed.parseRss2 fail for '+i+' '+j+' ('+er.message+')');
      }
    }

    return {
      title: Feed.getNodeValue(channel, 'title'),
      link: Feed.getNodeValue(channel, 'link'),
      summary: Feed.getNodeValue(channel, 'description'),
      pubdate: Feed.getNodeValue(channel, 'pubDate') || Feed.getNodeValue(channel, 'dc:date') || Feed.getNodeValue(channel, 'date') || '',
      entries: result,
    };
  },

  /**
   * Parse a RSS 0.91 feed
   * Returns an array with FeedItem objects
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseRss091: function(xmlRoot, name, group) {
    let
      i;


    const result = [];


    let item;
    // single  FeedItem

    const channel = xmlRoot.getElementsByTagName('channel')[0];


    const items = xmlRoot.getElementsByTagName('item'); // get items for this feed

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // now add the FeedItem
      try {
        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'description'),
          Feed.getNodeValue(item, 'link'),
          Feed.getNodeValue(item, 'pubDate') || Feed.getNodeValue(item, 'dc:date') || Feed.getNodeValue(item, 'date') || '',
          item
        );
      } catch (er) {
        throw new Error('Feed.parseRss2 fail for '+i+' ('+er.message+')');
      }
    }

    return {
      title: Feed.getNodeValue(channel, 'title'),
      link: Feed.getNodeValue(channel, 'link'),
      summary: Feed.getNodeValue(channel, 'description'),
      pubdate: Feed.getNodeValue(channel, 'pubDate') || Feed.getNodeValue(channel, 'dc:date') || Feed.getNodeValue(channel, 'date') || '',
      entries: result,
    };
  },

  /**
   * Parse an Atom feed
   * Returns an array with FeedItem objects.
   *
   * @param document xmlRoot
   * @param string name Name of the feed we're fetching, passed on to plugins
   * @param string group Name of the group this feed belongs to, passed on to plugins
   * @return array
   */
  parseAtom: function(xmlRoot, name, group) {
    const
      result = [];


    let i;


    let item;
    // one  FeedItem

    let aUri;


    const rootEl = xmlRoot.getElementsByTagName('feed')[0];


    const baseUri = rootEl.getAttribute('xml:base');


    const items = xmlRoot.getElementsByTagName('entry');

    for (i=0; i < items.length; i+=1) {
      item = items[i];
      // title, link, summary, pubdate
      try {
        aUri = Feed.getNodeValue(item, 'link', 'href');
        if (baseUri && aUri && aUri.indexOf(':') < 0) {
          aUri = baseUri + aUri;
        }

        result[result.length] = FeedItem(
          Feed.getNodeValue(item, 'title'),
          Feed.getNodeValue(item, 'summary'),
          aUri,
          Feed.getNodeValue(item, 'published') || Feed.getNodeValue(item, 'published') || '',
          item
        );
      } catch (er) {
        throw new Error('Unable to parse item '+i+': '+er.message);
      }
    }

    return {
      title: Feed.getNodeValue(rootEl, 'title'),
      link: Feed.getNodeValue(rootEl, 'link', 'href'),
      summary: Feed.getNodeValue(rootEl, 'description'),
      pubdate: Feed.getNodeValue(rootEl, 'published') || Feed.getNodeValue(rootEl, 'updated') || '',
      entries: result,
    };
  },
  // ext only, will be overridden by electron
  fetch: function(url, callback) {
    const xhr = HTTP.get({
      url: url,
      headers: {'X-Moz': 'livebookmarks'},
    }, function(err, xhrObj) {
      if (err) {
        console.error('error getting feed from: ' + url);
        callback(err);
      } else {
        let response = xhrObj.response;
        if (response.nodeType === Node.DOCUMENT_NODE) {
          Feed.fromXML(response, callback);
        } else {
          // Default to a string type. If we have a JSON, callback.
          Feed.fromString(response, callback);
        }
      }
    });
  },

  // calls callback with the retrieved result
  fromString: promisifyOrCallback(function(text, url, callback) {
    if (typeof url == 'function') {
      callback = url;
      url = '';
    }
    const
      parser = new DOMParser();


    const doc = parser.parseFromString(text, 'application/xml');

    Feed.fromXML(doc, callback);
  }),

  fromXML: function(doc, callback) {
    if (doc) {
      callback(null, Feed.parse(doc));
    } else {
      callback(ERR.PARAM_INVALID({param: 'feed', value: 'EMPTY'}));
    }
  },

  getText: function(feed) {
    const buf = [feed.title];

    feed.entries.forEach(function(entry, index) {
      buf.push(entry.title);
      if (/<\w.*>/.test(entry.summary)) {
        buf.push(Feed.domParser.parseFromString(entry.summary, 'text/html').documentElement.textContent);
      } else {
        buf.push(entry.summary);
      }
    });

    return buf.join(' \n');
  },

};

function FeedItem(title, summary, url, date, dom) {
  return {
    title: title, // string
    link: url, // string
    summary: summary, // string (not sanatized)
    pubdate: date, // timestamp (as found in the feed...)
  };
}

