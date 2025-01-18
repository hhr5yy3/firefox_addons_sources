/* globals content, log, debug */
'use strict';

const ATTRIBS = ['href', 'onclick', 'onmousedown', 'rel', 'role'];

const LinkNodeUtils = {
  isFrameInContent(content, href, name) {
    if (!content) {
      return false;
    }
    if (content.location.href == href && content.name == name) {
      return true;
    }
    for (let i = 0; i < content.frames.length; i++) {
      const frame = content.frames[i];
      if (frame.location.href == href && frame.name == name) {
        return true;
      }
    }
    return false;
  },

  wrap(node, focusedWindow, getTargetIsFrame) {
    if (!node || typeof node.__tabmix == 'boolean') {
      return node;
    }

    const doc = node.ownerDocument;
    const wrapper = {
      __tabmix: true,
      baseURI: node.baseURI,
      host: node.host,
      pathname: node.pathname,
      className: node.className,
      target: getTargetAttr(node.target, focusedWindow),
      ownerDocument: {
        URL: doc.URL,
        documentURI: doc.documentURI,
        defaultView: {frameElement: Boolean(doc.defaultView.frameElement)},
        location: {href: doc.location ? doc.location.href : ''},
      },
      parentNode: {
        baseURI: node.parentNode ? node.parentNode.baseURI : '',
        _attributes: getAttributes(node.parentNode, ['onclick']),
      },
      _focusedWindowHref: focusedWindow.top.location.href,
      _attributes: getAttributes(node, ATTRIBS),
    };
    if (getTargetIsFrame) {
      wrapper.targetIsFrame = targetIsFrame(wrapper.target, focusedWindow);
      log('Tabmix:\nwrapper.targetIsFrame', wrapper.targetIsFrame);
    }
    return wrapper;
  },

  getNodeWithOnClick(node) {
    // for safety reason look only 3 level up
    let i = 0;
    while (i < 3 && node && node.hasAttribute && !node.hasAttribute('onclick')) {
      node = node.parentNode;
      i++;
    }
    if (node && node.hasAttribute && node.hasAttribute('onclick')) {
      return node;
    }
    return null;
  },

  // catch link in special pages
  isSpecialPage(href, linkNode, currentHref, window) {
    let blocked;
    try {
      // for the moment just do it for Google and Yahoo....
      // tvguide.com    - added 2013-07-20
      // duckduckgo.com - added 2014-12-24
      // jetbrains.com - added 2016-05-01
      const re = /duckduckgo.com|tvguide.com|google|yahoo.com|jetbrains.com/;
      blocked = re.test(currentHref);
      // youtube.com - added 2013-11-15
      if (!blocked && /youtube.com/.test(currentHref) &&
          (!this.isGMEnabled(window) || decodeURI(href).indexOf('return false;') == -1)) {
        blocked = true;
      } else if (!blocked) {
        // make sure external links in developer.mozilla.org open new tab
        const uri = new URL(currentHref);
        const host = uri && uri.host;
        blocked = host == 'developer.mozilla.org' && linkNode.host != host &&
            linkNode.classList.contains('external');
      }
    } catch (ex) {
      blocked = false;
    }
    return blocked;
  },

  _GM_function: new WeakMap(),

  isGMEnabled(window) {
    // window = window || Services.wm.getMostRecentWindow('navigator:browser');
    if (this._GM_function.has(window)) {
      return this._GM_function.get(window)();
    }
    return false;
  },
};

function getAttributes(node, attribs) {
  if (!node) {
    return {};
  }
  const wrapper = {};
  for (const att of attribs) {
    if (node.hasAttribute(att)) {
      wrapper[att] = node.getAttribute(att);
    }
  }
  return wrapper;
}

function getTargetAttr(targetAttr, focusedWindow) {
  log('Tabmix\ngetTargetAttr', targetAttr, focusedWindow, window.Node);
  // If link has no target attribute, check if there is a <base> with a target attribute
  if (!targetAttr) {
    const b = focusedWindow.document.getElementsByTagName('base');
    if (b.length > 0) {
      targetAttr = b[0].getAttribute('target');
    }
    log('Tabmix\ntargetAttr', targetAttr);
  }
  return targetAttr;
}

/**
 * @brief check if target attribute exist and point to frame in the document
 *        frame pool
 */
function targetIsFrame(targetAttr, focusedWindow) {
  if (targetAttr) {
    const content = focusedWindow.top;
    if (existsFrameName(content, targetAttr)) {
      return true;
    }
  }
  return false;
}

/**
 * @brief Check a document's frame pool and determine if
 * |targetFrame| is located inside of it.
 *
 * @param content           is a frame reference
 * @param targetFrame       The name of the frame that we are seeking.
 * @returns                 true if the frame exists within the given frame pool,
 *                          false if it does not.
 */
function existsFrameName(content, targetFrame) {
  for (let i = 0; i < content.frames.length; i++) {
    const frame = content.frames[i];
    const name = frame.frameElement.getAttribute('name');
    if (name == targetFrame || existsFrameName(frame, targetFrame)) {
      return true;
    }
  }
  return false;
}

// based on Firefox function with the same name from content/browser/content.js
function hrefAndLinkNodeForClickEvent(event) {
  function isHTMLLink(aNode) {
    // Be consistent with what nsContextMenu.js does.
    return aNode instanceof HTMLAnchorElement && aNode.href ||
        aNode instanceof HTMLAreaElement && aNode.href ||
        aNode instanceof HTMLLinkElement;
  }

  let node = event.target;
  while (node && !isHTMLLink(node)) {
    node = node.parentNode;
  }

  if (node) {
    return [node.href, node, node.ownerDocument.nodePrincipal];
  }

  // If there is no linkNode, try simple XLink.
  let href, baseURI;
  node = event.target;
  while (node && !href) {
    if (node.nodeType == window.Node.ELEMENT_NODE &&
        (node.localName == 'a' ||
        node.namespaceURI == 'http://www.w3.org/1998/Math/MathML')) {
      href = node.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
      if (href) {
        baseURI = node.ownerDocument.baseURIObject;
        break;
      }
    }
    node = node.parentNode;
  }

  // In case of XLink, we don't return the node we got href from since
  // callers expect <a>-like elements.
  // Note: URL() will throw if href is not a valid URI.
  const url = href ? (new URL(href, baseURI)).href : null;
  return [url, null, node && node.ownerDocument.nodePrincipal];
}

const nodes = new WeakMap();

async function onMousedown(event) {
  log('onMousedown starts');

  const [href, node, principal] = hrefAndLinkNodeForClickEvent(event);

  const ownerDoc = event.originalTarget.ownerDocument;
  log('onMousedown after hrefAndLinkNodeForClickEvent');

  /*
  //XXX TODO:
    currently we don't have a way to know if alt is going to trigger
    save. so we need to ignore it and let the browser do its default

    for middle click we need to add preference to our preference window
  */

  //XXX TODO: check if we need all this prop in the background functions
  const json = {
    button: event.button,
    shiftKey: event.shiftKey,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    altKey: event.altKey,
    // href: null,
    title: null,
    bookmark: false,
    originAttributes: principal ? principal.originAttributes : {},
    isContentWindowPrivate: browser.extension.inIncognitoContext,
  };

  if (typeof event.tabmix_openLinkWithHistory == 'boolean') {
    json.tabmix_openLinkWithHistory = true;
  }

  const linkNode = href ? node : LinkNodeUtils.getNodeWithOnClick(event.target);
  let wrappedNode;
  if (linkNode) {
    // clean any left over...
    cleanModifiedNode();

    if (!href) {
      json.originPrincipal = ownerDoc.nodePrincipal;
      json.triggeringPrincipal = ownerDoc.nodePrincipal;
    }

    //XXX TODO need to find a way to use focusedWindow
    //XXX TODO check what we really need from focusedWindow
    wrappedNode = LinkNodeUtils.wrap(linkNode, window,
        href && event.button === 0);
  }
  debug({href, linkNode, principal});

  log('onMousedown before sendMessage');
  const response = await browser.runtime.sendMessage({event: json, href, node: wrappedNode});
  log('onMousedown after sendMessage', response);
  if (response.where != 'default') {
    updateNodeProp(linkNode, response);
  }
}

/*
 manipulate dom based on the result
   1. change target to open in new tab or current tab
   2. remove onclick if we get hrefFromOnClick
   3. inject new <a> if node is not exist XLink???
   4. add test to each type of links
   5. for link that start download set target to self ?
*/
//XXX TODO test for XLink !!!
function updateNodeProp(node, response) {
  log('updateNodeProp');
  if (!node) {
    throw new Error('Tabmix:\nnode is undefined');
  }

  if (!['current', 'tab', 'tabshifted'].includes(response.where)) {
    throw new Error(`Tabmix:\nunexpected response.where ${response.where}`);
  }

  log('updateNodeProp after receiving response');

  const href = response.hrefFromOnClick || response.href;
  debug('data.hrefFromOnClick || data.href', response.hrefFromOnClick || response.href, 'response', response);
  const data = {
    where: response.where,
    href,
    notLink: node.localName != 'a',
    attributes: [],
  };

  data.attributes.push(['onclick', node.getAttribute('onclick')]);
  data.attributes.push(['target', node.getAttribute('target')]);
  data.attributes.push(['href', node.getAttribute('href')]);
  node.removeAttribute('onclick');

  if (response.where == 'current') {
    // node.removeAttribute('onclick');
    node.removeAttribute('target');
    node.href = '#';
    debug(node.onclick, node.href, node.target);
    // data.location = href;
  } else if (node.localName == 'a') {
    // node.removeAttribute('onclick');
    node.setAttribute('target', '_blank');
    node.href = href;
  }

  log('Tabmix\nnodes set', {node, data});
  nodes.set(content, {node, data});

  debug('data in updateNodeProp', data);

  const options = {capture: true, once: true};
  // for the case user move the mouse away before mouseup
  //XXX what if the user move the mouse back to the link before mouse up
  //XXX maybe it is safer to add this function to mouseup
  node.addEventListener('mouseout', () => {
    debug('call resetNode after timeout mouseout');

    //XXX save setTimeout to be able to clear it if in click event
    // maybe we don't need to clear the timeout and let it run anyway ??
    setTimeout(() => resetNode(node, data));
  }, options);
}

function onMouseClick(event) {
  if (!nodes.has(content)) {
    log('Tabmix\nnodes doesn\'t have a content');
    return;
  }

  const {node, data} = nodes.get(content);
  log('Tabmix\nnode data', {node, data});
  if (data.where == 'current' || data.notLink) {
    event.stopPropagation();
    event.preventDefault();
  }

  if (data.where == 'current') {
    // open link in current tab
    top.location.href = data.href;
  } else if (data.notLink) {
    // new tab/window will get the focus for non-link nodes
    window.open(data.href, '_blank');
  }

  setTimeout(() => resetNode(node, data));
}

function cleanModifiedNode() {
  if (nodes.has(content)) {
    const {node, data} = nodes.get(content);
    debug('cleanModifiedNode');
    resetNode(node, data);
  }
}

// restore and clean node to its original state
function resetNode(node, data) {
  if (!nodes.has(content)) {
    return;
  }
  debug('nodes.delete(content);', nodes.has(content));
  nodes.delete(content);
  if (!data) {
    throw new Error('Tabmix:\ndata is undefined');
  }
  debug('resetNode===================================================resetNode');

  const attributes = (data.attributes || []).slice();
  debug('attributes', attributes);
  debug('attributes after timeout', attributes);
  attributes.forEach(([attrib, val]) => {
    debug(`restore ${attrib} attribute`);
    if (val) {
      node.setAttribute(attrib, val);
    } else {
      node.removeAttribute(attrib);
    }
  });
}

window.addEventListener('mousedown', onMousedown, true);
window.addEventListener('click', onMouseClick, true);
