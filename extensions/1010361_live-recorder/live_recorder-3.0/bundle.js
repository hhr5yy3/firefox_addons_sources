(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	// "X-ray issues" make WeakMap not work correctly with web-extensions.
	// The 'document-register-element' library has a polyfill in it. Let's use it.
	// https://bugzilla.mozilla.org/show_bug.cgi?id=1505511
	if (!window.liveRecorder && (new window.WeakMap).get === undefined)
		window.WeakMap = null;

	// This file has been slightly modified.
	// It didn't work with webextensions out of the box.
	// Something to do with "X-ray support".
	/*!
	ISC License

	Copyright (c) 2014-2018, Andrea Giammarchi, @WebReflection

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted, provided that the above
	copyright notice and this permission notice appear in all copies.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
	OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.

	*/
	// global window Object
	// optional polyfill info
	//    'auto' used by default, everything is feature detected
	//    'force' use the polyfill even if not fully needed
	function installCustomElements(window, polyfill) {
	  // DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
	  // THIS IS A PROJECT BASED ON A BUILD SYSTEM
	  // THIS FILE IS JUST WRAPPED UP RESULTING IN
	  // build/document-register-element.node.js

	  var
	    document = window.document,
	    Object = window.Object
	  ;

	  var htmlClass = (function (info) {
	    // (C) Andrea Giammarchi - @WebReflection - MIT Style
	    var
	      catchClass = /^[A-Z]+[a-z]/,
	      filterBy = function (re) {
	        var arr = [], tag;
	        for (tag in register) {
	          if (re.test(tag)) arr.push(tag);
	        }
	        return arr;
	      },
	      add = function (Class, tag) {
	        tag = tag.toLowerCase();
	        if (!(tag in register)) {
	          register[Class] = (register[Class] || []).concat(tag);
	          register[tag] = (register[tag.toUpperCase()] = Class);
	        }
	      },
	      register = (Object.create || Object)(null),
	      htmlClass = {},
	      i, section, tags, Class
	    ;
	    for (section in info) {
	      for (Class in info[section]) {
	        tags = info[section][Class];
	        register[Class] = tags;
	        for (i = 0; i < tags.length; i++) {
	          register[tags[i].toLowerCase()] =
	          register[tags[i].toUpperCase()] = Class;
	        }
	      }
	    }
	    htmlClass.get = function get(tagOrClass) {
	      return typeof tagOrClass === 'string' ?
	        (register[tagOrClass] || (catchClass.test(tagOrClass) ? [] : '')) :
	        filterBy(tagOrClass);
	    };
	    htmlClass.set = function set(tag, Class) {
	      return (catchClass.test(tag) ?
	        add(tag, Class) :
	        add(Class, tag)
	      ), htmlClass;
	    };
	    return htmlClass;
	  }({
	    "collections": {
	      "HTMLAllCollection": [
	        "all"
	      ],
	      "HTMLCollection": [
	        "forms"
	      ],
	      "HTMLFormControlsCollection": [
	        "elements"
	      ],
	      "HTMLOptionsCollection": [
	        "options"
	      ]
	    },
	    "elements": {
	      "Element": [
	        "element"
	      ],
	      "HTMLAnchorElement": [
	        "a"
	      ],
	      "HTMLAppletElement": [
	        "applet"
	      ],
	      "HTMLAreaElement": [
	        "area"
	      ],
	      "HTMLAttachmentElement": [
	        "attachment"
	      ],
	      "HTMLAudioElement": [
	        "audio"
	      ],
	      "HTMLBRElement": [
	        "br"
	      ],
	      "HTMLBaseElement": [
	        "base"
	      ],
	      "HTMLBodyElement": [
	        "body"
	      ],
	      "HTMLButtonElement": [
	        "button"
	      ],
	      "HTMLCanvasElement": [
	        "canvas"
	      ],
	      "HTMLContentElement": [
	        "content"
	      ],
	      "HTMLDListElement": [
	        "dl"
	      ],
	      "HTMLDataElement": [
	        "data"
	      ],
	      "HTMLDataListElement": [
	        "datalist"
	      ],
	      "HTMLDetailsElement": [
	        "details"
	      ],
	      "HTMLDialogElement": [
	        "dialog"
	      ],
	      "HTMLDirectoryElement": [
	        "dir"
	      ],
	      "HTMLDivElement": [
	        "div"
	      ],
	      "HTMLDocument": [
	        "document"
	      ],
	      "HTMLElement": [
	        "element",
	        "abbr",
	        "address",
	        "article",
	        "aside",
	        "b",
	        "bdi",
	        "bdo",
	        "cite",
	        "code",
	        "command",
	        "dd",
	        "dfn",
	        "dt",
	        "em",
	        "figcaption",
	        "figure",
	        "footer",
	        "header",
	        "i",
	        "kbd",
	        "mark",
	        "nav",
	        "noscript",
	        "rp",
	        "rt",
	        "ruby",
	        "s",
	        "samp",
	        "section",
	        "small",
	        "strong",
	        "sub",
	        "summary",
	        "sup",
	        "u",
	        "var",
	        "wbr"
	      ],
	      "HTMLEmbedElement": [
	        "embed"
	      ],
	      "HTMLFieldSetElement": [
	        "fieldset"
	      ],
	      "HTMLFontElement": [
	        "font"
	      ],
	      "HTMLFormElement": [
	        "form"
	      ],
	      "HTMLFrameElement": [
	        "frame"
	      ],
	      "HTMLFrameSetElement": [
	        "frameset"
	      ],
	      "HTMLHRElement": [
	        "hr"
	      ],
	      "HTMLHeadElement": [
	        "head"
	      ],
	      "HTMLHeadingElement": [
	        "h1",
	        "h2",
	        "h3",
	        "h4",
	        "h5",
	        "h6"
	      ],
	      "HTMLHtmlElement": [
	        "html"
	      ],
	      "HTMLIFrameElement": [
	        "iframe"
	      ],
	      "HTMLImageElement": [
	        "img"
	      ],
	      "HTMLInputElement": [
	        "input"
	      ],
	      "HTMLKeygenElement": [
	        "keygen"
	      ],
	      "HTMLLIElement": [
	        "li"
	      ],
	      "HTMLLabelElement": [
	        "label"
	      ],
	      "HTMLLegendElement": [
	        "legend"
	      ],
	      "HTMLLinkElement": [
	        "link"
	      ],
	      "HTMLMapElement": [
	        "map"
	      ],
	      "HTMLMarqueeElement": [
	        "marquee"
	      ],
	      "HTMLMediaElement": [
	        "media"
	      ],
	      "HTMLMenuElement": [
	        "menu"
	      ],
	      "HTMLMenuItemElement": [
	        "menuitem"
	      ],
	      "HTMLMetaElement": [
	        "meta"
	      ],
	      "HTMLMeterElement": [
	        "meter"
	      ],
	      "HTMLModElement": [
	        "del",
	        "ins"
	      ],
	      "HTMLOListElement": [
	        "ol"
	      ],
	      "HTMLObjectElement": [
	        "object"
	      ],
	      "HTMLOptGroupElement": [
	        "optgroup"
	      ],
	      "HTMLOptionElement": [
	        "option"
	      ],
	      "HTMLOutputElement": [
	        "output"
	      ],
	      "HTMLParagraphElement": [
	        "p"
	      ],
	      "HTMLParamElement": [
	        "param"
	      ],
	      "HTMLPictureElement": [
	        "picture"
	      ],
	      "HTMLPreElement": [
	        "pre"
	      ],
	      "HTMLProgressElement": [
	        "progress"
	      ],
	      "HTMLQuoteElement": [
	        "blockquote",
	        "q",
	        "quote"
	      ],
	      "HTMLScriptElement": [
	        "script"
	      ],
	      "HTMLSelectElement": [
	        "select"
	      ],
	      "HTMLShadowElement": [
	        "shadow"
	      ],
	      "HTMLSlotElement": [
	        "slot"
	      ],
	      "HTMLSourceElement": [
	        "source"
	      ],
	      "HTMLSpanElement": [
	        "span"
	      ],
	      "HTMLStyleElement": [
	        "style"
	      ],
	      "HTMLTableCaptionElement": [
	        "caption"
	      ],
	      "HTMLTableCellElement": [
	        "td",
	        "th"
	      ],
	      "HTMLTableColElement": [
	        "col",
	        "colgroup"
	      ],
	      "HTMLTableElement": [
	        "table"
	      ],
	      "HTMLTableRowElement": [
	        "tr"
	      ],
	      "HTMLTableSectionElement": [
	        "thead",
	        "tbody",
	        "tfoot"
	      ],
	      "HTMLTemplateElement": [
	        "template"
	      ],
	      "HTMLTextAreaElement": [
	        "textarea"
	      ],
	      "HTMLTimeElement": [
	        "time"
	      ],
	      "HTMLTitleElement": [
	        "title"
	      ],
	      "HTMLTrackElement": [
	        "track"
	      ],
	      "HTMLUListElement": [
	        "ul"
	      ],
	      "HTMLUnknownElement": [
	        "unknown",
	        "vhgroupv",
	        "vkeygen"
	      ],
	      "HTMLVideoElement": [
	        "video"
	      ]
	    },
	    "nodes": {
	      "Attr": [
	        "node"
	      ],
	      "Audio": [
	        "audio"
	      ],
	      "CDATASection": [
	        "node"
	      ],
	      "CharacterData": [
	        "node"
	      ],
	      "Comment": [
	        "#comment"
	      ],
	      "Document": [
	        "#document"
	      ],
	      "DocumentFragment": [
	        "#document-fragment"
	      ],
	      "DocumentType": [
	        "node"
	      ],
	      "HTMLDocument": [
	        "#document"
	      ],
	      "Image": [
	        "img"
	      ],
	      "Option": [
	        "option"
	      ],
	      "ProcessingInstruction": [
	        "node"
	      ],
	      "ShadowRoot": [
	        "#shadow-root"
	      ],
	      "Text": [
	        "#text"
	      ],
	      "XMLDocument": [
	        "xml"
	      ]
	    }
	  }));
	  
	  
	    
	  // passed at runtime, configurable via nodejs module
	  if (typeof polyfill !== 'object') polyfill = {type: polyfill || 'auto'};
	  
	  var 
	    // V0 polyfill entry
	    REGISTER_ELEMENT = 'registerElement',
	  
	    // IE < 11 only + old WebKit for attributes + feature detection
			// ALTERED 'window.math.random' -> math.random
	    EXPANDO_UID = '__' + REGISTER_ELEMENT + (Math.random() * 10e4 >> 0),
	  
	    // shortcuts and costants
	    ADD_EVENT_LISTENER = 'addEventListener',
	    ATTACHED = 'attached',
	    CALLBACK = 'Callback',
	    DETACHED = 'detached',
	    EXTENDS = 'extends',
	  
	    ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK,
	    ATTACHED_CALLBACK = ATTACHED + CALLBACK,
	    CONNECTED_CALLBACK = 'connected' + CALLBACK,
	    DISCONNECTED_CALLBACK = 'disconnected' + CALLBACK,
	    CREATED_CALLBACK = 'created' + CALLBACK,
	    DETACHED_CALLBACK = DETACHED + CALLBACK,
	  
	    ADDITION = 'ADDITION',
	    MODIFICATION = 'MODIFICATION',
	    REMOVAL = 'REMOVAL',
	  
	    DOM_ATTR_MODIFIED = 'DOMAttrModified',
	    DOM_CONTENT_LOADED = 'DOMContentLoaded',
	    DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',
	  
	    PREFIX_TAG = '<',
	    PREFIX_IS = '=',
	  
	    // valid and invalid node names
	    validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
	    invalidNames = [
	      'ANNOTATION-XML',
	      'COLOR-PROFILE',
	      'FONT-FACE',
	      'FONT-FACE-SRC',
	      'FONT-FACE-URI',
	      'FONT-FACE-FORMAT',
	      'FONT-FACE-NAME',
	      'MISSING-GLYPH'
	    ],
	  
	    // registered types and their prototypes
	    types = [],
	    protos = [],
	  
	    // to query subnodes
	    query = '',
	  
	    // html shortcut used to feature detect
	    documentElement = window.document.documentElement,
	  
	    // ES5 inline helpers || basic patches
	    indexOf = types.indexOf || function (v) {
	      for(var i = this.length; i-- && this[i] !== v;){}
	      return i;
	    },
	  
	    // other helpers / shortcuts
	    OP = Object.prototype,
	    hOP = OP.hasOwnProperty,
	    iPO = OP.isPrototypeOf,
	  
	    defineProperty = Object.defineProperty,
	    empty = [],
	    gOPD = Object.getOwnPropertyDescriptor,
	    gOPN = Object.getOwnPropertyNames,
	    gPO = Object.getPrototypeOf,
	    sPO = Object.setPrototypeOf,
	  
	    // jshint proto: true
	    hasProto = !!Object.__proto__,
	  
	    DRECEV1 = '__dreCEv1',
	    customElements = customElements,
	    usableCustomElements = !/^force/.test(polyfill.type) && !!(
	      customElements &&
	      customElements.define &&
	      customElements.get &&
	      customElements.whenDefined
	    ),
	    Dict = Object.create || Object,
	    Map = Map || function Map() {
	      var K = [], V = [], i;
	      return {
	        get: function (k) {
	          return V[indexOf.call(K, k)];
	        },
	        set: function (k, v) {
	          i = indexOf.call(K, k);
	          if (i < 0) V[K.push(k) - 1] = v;
	          else V[i] = v;
	        }
	      };
	    },
	    Promise = Promise || function (fn) {
	      var
	        notify = [],
	        done = false,
	        p = {
	          'catch': function () {
	            return p;
	          },
	          'then': function (cb) {
	            notify.push(cb);
	            if (done) setTimeout(resolve, 1);
	            return p;
	          }
	        }
	      ;
	      function resolve(value) {
	        done = true;
	        while (notify.length) notify.shift()(value);
	      }
	      fn(resolve);
	      return p;
	    },
	    justCreated = false,
	    constructors = Dict(null),
	    waitingList = Dict(null),
	    nodeNames = new Map(),
	    secondArgument = function (is) {
	      return is.toLowerCase();
	    },
	  
	    // used to create unique instances
	    create = Object.create || function Bridge(proto) {
	      // silly broken polyfill probably ever used but short enough to work
	      return proto ? ((Bridge.prototype = proto), new Bridge()) : this;
	    },
	  
	    // will set the prototype if possible
	    // or copy over all properties
	    setPrototype = sPO || (
	      hasProto ?
	        function (o, p) {
	          o.__proto__ = p;
	          return o;
	        } : (
	      (gOPN && gOPD) ?
	        (function(){
	          function setProperties(o, p) {
	            for (var
	              key,
	              names = gOPN(p),
	              i = 0, length = names.length;
	              i < length; i++
	            ) {
	              key = names[i];
	              if (!hOP.call(o, key)) {
	                defineProperty(o, key, gOPD(p, key));
	              }
	            }
	          }
	          return function (o, p) {
	            do {
	              setProperties(o, p);
	            } while ((p = gPO(p)) && !iPO.call(p, o));
	            return o;
	          };
	        }()) :
	        function (o, p) {
	          for (var key in p) {
	            o[key] = p[key];
	          }
	          return o;
	        }
	    )),
	  
	    // DOM shortcuts and helpers, if any
	  
	    MutationObserver = window.MutationObserver ||
	                       WebKitMutationObserver,
	  
	    HTMLAnchorElement = window.HTMLAnchorElement,
	  
	    HTMLElementPrototype = (
	      window.HTMLElement ||
	      window.Element ||
	      window.Node
	    ).prototype,
	  
	    IE8 = !iPO.call(HTMLElementPrototype, documentElement),
	  
	    safeProperty = IE8 ? function (o, k, d) {
	      o[k] = d.value;
	      return o;
	    } : defineProperty,
	  
	    isValidNode = IE8 ?
	      function (node) {
	        return node.nodeType === 1;
	      } :
	      function (node) {
	        return iPO.call(HTMLElementPrototype, node);
	      },
	  
	    targets = IE8 && [],
	  
	    attachShadow = HTMLElementPrototype.attachShadow,
	    cloneNode = HTMLElementPrototype.cloneNode,
	    dispatchEvent = HTMLElementPrototype.dispatchEvent,
	    getAttribute = HTMLElementPrototype.getAttribute,
	    hasAttribute = HTMLElementPrototype.hasAttribute,
	    removeAttribute = HTMLElementPrototype.removeAttribute,
	    setAttribute = HTMLElementPrototype.setAttribute,
	  
	    // replaced later on
	    createElement = document.createElement,
	    importNode = document.importNode,
	    patchedCreateElement = createElement,
	  
	    // shared observer for all attributes
	    attributesObserver = MutationObserver && {
	      attributes: true,
	      characterData: true,
	      attributeOldValue: true
	    },
	  
	    // useful to detect only if there's no MutationObserver
	    DOMAttrModified = MutationObserver || function(e) {
	      doesNotSupportDOMAttrModified = false;
	      documentElement.removeEventListener(
	        DOM_ATTR_MODIFIED,
	        DOMAttrModified
	      );
	    },
	  
	    // will both be used to make DOMNodeInserted asynchronous
	    asapQueue,
	    asapTimer = 0,
	  
	    // internal flags
	    V0 = REGISTER_ELEMENT in document &&
	         !/^force-all/.test(polyfill.type),
	    setListener = true,
	    justSetup = false,
	    doesNotSupportDOMAttrModified = true,
	    dropDomContentLoaded = true,
	  
	    // needed for the innerHTML helper
	    notFromInnerHTMLHelper = true,
	  
	    // optionally defined later on
	    onSubtreeModified,
	    callDOMAttrModified,
	    getAttributesMirror,
	    observer,
	    observe,
	  
	    // based on setting prototype capability
	    // will check proto or the expando attribute
	    // in order to setup the node once
	    patchIfNotAlready,
	    patch,
	  
	    // used for tests
	    tmp
	  ;
	  
	  // IE11 disconnectedCallback issue #
	  // to be tested before any createElement patch
	  if (MutationObserver) {
	    // original fix:
	    // https://github.com/javan/mutation-observer-inner-html-shim
	    tmp = document.createElement('div');
	    tmp.innerHTML = '<div><div></div></div>';
	    new MutationObserver(function (mutations, observer) {
	      if (
	        mutations[0] &&
	        mutations[0].type == 'childList' &&
	        !mutations[0].removedNodes[0].childNodes.length
	      ) {
	        tmp = gOPD(HTMLElementPrototype, 'innerHTML');
	        var set = tmp && tmp.set;
	        if (set)
	          defineProperty(HTMLElementPrototype, 'innerHTML', {
	            set: function (value) {
	              while (this.lastChild)
	                this.removeChild(this.lastChild);
	              set.call(this, value);
	            }
	          });
	      }
	      observer.disconnect();
	      tmp = null;
	    }).observe(tmp, {childList: true, subtree: true});
	    tmp.innerHTML = "";
	  }
	  
	  // only if needed
	  if (!V0) {
	  
	    if (sPO || hasProto) {
	        patchIfNotAlready = function (node, proto) {
	          if (!iPO.call(proto, node)) {
	            setupNode(node, proto);
	          }
	        };
	        patch = setupNode;
	    } else {
	        patchIfNotAlready = function (node, proto) {
	          if (!node[EXPANDO_UID]) {
	            node[EXPANDO_UID] = Object(true);
	            setupNode(node, proto);
	          }
	        };
	        patch = patchIfNotAlready;
	    }
	  
	    if (IE8) {
	      doesNotSupportDOMAttrModified = false;
	      (function (){
	        var
	          descriptor = gOPD(HTMLElementPrototype, ADD_EVENT_LISTENER),
	          addEventListener = descriptor.value,
	          patchedRemoveAttribute = function (name) {
	            var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
	            e.attrName = name;
	            e.prevValue = getAttribute.call(this, name);
	            e.newValue = null;
	            e[REMOVAL] = e.attrChange = 2;
	            removeAttribute.call(this, name);
	            dispatchEvent.call(this, e);
	          },
	          patchedSetAttribute = function (name, value) {
	            var
	              had = hasAttribute.call(this, name),
	              old = had && getAttribute.call(this, name),
	              e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true})
	            ;
	            setAttribute.call(this, name, value);
	            e.attrName = name;
	            e.prevValue = had ? old : null;
	            e.newValue = value;
	            if (had) {
	              e[MODIFICATION] = e.attrChange = 1;
	            } else {
	              e[ADDITION] = e.attrChange = 0;
	            }
	            dispatchEvent.call(this, e);
	          },
	          onPropertyChange = function (e) {
	            // jshint eqnull:true
	            var
	              node = e.currentTarget,
	              superSecret = node[EXPANDO_UID],
	              propertyName = e.propertyName,
	              event
	            ;
	            if (superSecret.hasOwnProperty(propertyName)) {
	              superSecret = superSecret[propertyName];
	              event = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
	              event.attrName = superSecret.name;
	              event.prevValue = superSecret.value || null;
	              event.newValue = (superSecret.value = node[propertyName] || null);
	              if (event.prevValue == null) {
	                event[ADDITION] = event.attrChange = 0;
	              } else {
	                event[MODIFICATION] = event.attrChange = 1;
	              }
	              dispatchEvent.call(node, event);
	            }
	          }
	        ;
	        descriptor.value = function (type, handler, capture) {
	          if (
	            type === DOM_ATTR_MODIFIED &&
	            this[ATTRIBUTE_CHANGED_CALLBACK] &&
	            this.setAttribute !== patchedSetAttribute
	          ) {
	            this[EXPANDO_UID] = {
	              className: {
	                name: 'class',
	                value: this.className
	              }
	            };
	            this.setAttribute = patchedSetAttribute;
	            this.removeAttribute = patchedRemoveAttribute;
	            addEventListener.call(this, 'propertychange', onPropertyChange);
	          }
	          addEventListener.call(this, type, handler, capture);
	        };
	        defineProperty(HTMLElementPrototype, ADD_EVENT_LISTENER, descriptor);
	      }());
	    } else if (!MutationObserver) {
	      documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, DOMAttrModified);
	      documentElement.setAttribute(EXPANDO_UID, 1);
	      documentElement.removeAttribute(EXPANDO_UID);
	      if (doesNotSupportDOMAttrModified) {
	        onSubtreeModified = function (e) {
	          var
	            node = this,
	            oldAttributes,
	            newAttributes,
	            key
	          ;
	          if (node === e.target) {
	            oldAttributes = node[EXPANDO_UID];
	            node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
	            for (key in newAttributes) {
	              if (!(key in oldAttributes)) {
	                // attribute was added
	                return callDOMAttrModified(
	                  0,
	                  node,
	                  key,
	                  oldAttributes[key],
	                  newAttributes[key],
	                  ADDITION
	                );
	              } else if (newAttributes[key] !== oldAttributes[key]) {
	                // attribute was changed
	                return callDOMAttrModified(
	                  1,
	                  node,
	                  key,
	                  oldAttributes[key],
	                  newAttributes[key],
	                  MODIFICATION
	                );
	              }
	            }
	            // checking if it has been removed
	            for (key in oldAttributes) {
	              if (!(key in newAttributes)) {
	                // attribute removed
	                return callDOMAttrModified(
	                  2,
	                  node,
	                  key,
	                  oldAttributes[key],
	                  newAttributes[key],
	                  REMOVAL
	                );
	              }
	            }
	          }
	        };
	        callDOMAttrModified = function (
	          attrChange,
	          currentTarget,
	          attrName,
	          prevValue,
	          newValue,
	          action
	        ) {
	          var e = {
	            attrChange: attrChange,
	            currentTarget: currentTarget,
	            attrName: attrName,
	            prevValue: prevValue,
	            newValue: newValue
	          };
	          e[action] = attrChange;
	          onDOMAttrModified(e);
	        };
	        getAttributesMirror = function (node) {
	          for (var
	            attr, name,
	            result = {},
	            attributes = node.attributes,
	            i = 0, length = attributes.length;
	            i < length; i++
	          ) {
	            attr = attributes[i];
	            name = attr.name;
	            if (name !== 'setAttribute') {
	              result[name] = attr.value;
	            }
	          }
	          return result;
	        };
	      }
	    }
	  
	    // set as enumerable, writable and configurable
	    document[REGISTER_ELEMENT] = function registerElement(type, options) {
	      upperType = type.toUpperCase();
	      if (setListener) {
	        // only first time document.registerElement is used
	        // we need to set this listener
	        // setting it by default might slow down for no reason
	        setListener = false;
	        if (MutationObserver) {
	          observer = (function(attached, detached){
	            function checkEmAll(list, callback) {
	              for (var i = 0, length = list.length; i < length; callback(list[i++])){}
	            }
	            return new MutationObserver(function (records) {
	              for (var
	                current, node, newValue,
	                i = 0, length = records.length; i < length; i++
	              ) {
	                current = records[i];
	                if (current.type === 'childList') {
	                  checkEmAll(current.addedNodes, attached);
	                  checkEmAll(current.removedNodes, detached);
	                } else {
	                  node = current.target;
	                  if (notFromInnerHTMLHelper &&
	                      node[ATTRIBUTE_CHANGED_CALLBACK] &&
	                      current.attributeName !== 'style') {
	                    newValue = getAttribute.call(node, current.attributeName);
	                    if (newValue !== current.oldValue) {
	                      node[ATTRIBUTE_CHANGED_CALLBACK](
	                        current.attributeName,
	                        current.oldValue,
	                        newValue
	                      );
	                    }
	                  }
	                }
	              }
	            });
	          }(executeAction(ATTACHED), executeAction(DETACHED)));
	          observe = function (node) {
	            observer.observe(
	              node,
	              {
	                childList: true,
	                subtree: true
	              }
	            );
	            return node;
	          };
	          observe(document);
	          if (attachShadow) {
	            HTMLElementPrototype.attachShadow = function () {
	              return observe(attachShadow.apply(this, arguments));
	            };
	          }
	        } else {
	          asapQueue = [];
	          document[ADD_EVENT_LISTENER]('DOMNodeInserted', onDOMNode(ATTACHED));
	          document[ADD_EVENT_LISTENER]('DOMNodeRemoved', onDOMNode(DETACHED));
	        }
	  
	        document[ADD_EVENT_LISTENER](DOM_CONTENT_LOADED, onReadyStateChange);
	        document[ADD_EVENT_LISTENER]('readystatechange', onReadyStateChange);
	  
	        document.importNode = function (node, deep) {
	          switch (node.nodeType) {
	            case 1:
	              return setupAll(document, importNode, [node, !!deep]);
	            case 11:
	              for (var
	                fragment = document.createDocumentFragment(),
	                childNodes = node.childNodes,
	                length = childNodes.length,
	                i = 0; i < length; i++
	              )
	                fragment.appendChild(document.importNode(childNodes[i], !!deep));
	              return fragment;
	            default:
	              return cloneNode.call(node, !!deep);
	          }
	        };
	  
	        HTMLElementPrototype.cloneNode = function (deep) {
	          return setupAll(this, cloneNode, [!!deep]);
	        };
	      }
	  
	      if (justSetup) return (justSetup = false);
	  
	      if (-2 < (
	        indexOf.call(types, PREFIX_IS + upperType) +
	        indexOf.call(types, PREFIX_TAG + upperType)
	      )) {
	        throwTypeError(type);
	      }
	  
	      if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
	        throw new Error('The type ' + type + ' is invalid');
	      }
	  
	      var
	        constructor = function () {
	          return extending ?
	            document.createElement(nodeName, upperType) :
	            document.createElement(nodeName);
	        },
	        opt = options || OP,
	        extending = hOP.call(opt, EXTENDS),
	        nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
	        upperType,
	        i
	      ;
	  
	      if (extending && -1 < (
	        indexOf.call(types, PREFIX_TAG + nodeName)
	      )) {
	        throwTypeError(nodeName);
	      }
	  
	      i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;
	  
	      query = query.concat(
	        query.length ? ',' : '',
	        extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
	      );
	  
	      constructor.prototype = (
	        protos[i] = hOP.call(opt, 'prototype') ?
	          opt.prototype :
	          create(HTMLElementPrototype)
	      );
	  
	      if (query.length) loopAndVerify(
	        document.querySelectorAll(query),
	        ATTACHED
	      );
	  
	      return constructor;
	    };
	  
	    document.createElement = (patchedCreateElement = function (localName, typeExtension) {
	      var
	        is = getIs(typeExtension),
	        node = is ?
	          createElement.call(document, localName, secondArgument(is)) :
	          createElement.call(document, localName),
	        name = '' + localName,
	        i = indexOf.call(
	          types,
	          (is ? PREFIX_IS : PREFIX_TAG) +
	          (is || name).toUpperCase()
	        ),
	        setup = -1 < i
	      ;
	      if (is) {
	        node.setAttribute('is', is = is.toLowerCase());
	        if (setup) {
	          setup = isInQSA(name.toUpperCase(), is);
	        }
	      }
	      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
	      if (setup) patch(node, protos[i]);
	      return node;
	    });
	  
	  }
	  
	  function ASAP() {
	    var queue = asapQueue.splice(0, asapQueue.length);
	    asapTimer = 0;
	    while (queue.length) {
	      queue.shift().call(
	        null, queue.shift()
	      );
	    }
	  }
	  
	  function loopAndVerify(list, action) {
	    for (var i = 0, length = list.length; i < length; i++) {
	      verifyAndSetupAndAction(list[i], action);
	    }
	  }
	  
	  function loopAndSetup(list) {
	    for (var i = 0, length = list.length, node; i < length; i++) {
	      node = list[i];
	      patch(node, protos[getTypeIndex(node)]);
	    }
	  }
	  
	  function executeAction(action) {
	    return function (node) {
	      if (isValidNode(node)) {
	        verifyAndSetupAndAction(node, action);
	        if (query.length) loopAndVerify(
	          node.querySelectorAll(query),
	          action
	        );
	      }
	    };
	  }
	  
	  function getTypeIndex(target) {
	    var
	      is = getAttribute.call(target, 'is'),
	      nodeName = target.nodeName.toUpperCase(),
	      i = indexOf.call(
	        types,
	        is ?
	            PREFIX_IS + is.toUpperCase() :
	            PREFIX_TAG + nodeName
	      )
	    ;
	    return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
	  }
	  
	  function isInQSA(name, type) {
	    return -1 < query.indexOf(name + '[is="' + type + '"]');
	  }
	  
	  function onDOMAttrModified(e) {
	    var
	      node = e.currentTarget,
	      attrChange = e.attrChange,
	      attrName = e.attrName,
	      target = e.target,
	      addition = e[ADDITION] || 2,
	      removal = e[REMOVAL] || 3
	    ;
	    if (notFromInnerHTMLHelper &&
	        (!target || target === node) &&
	        node[ATTRIBUTE_CHANGED_CALLBACK] &&
	        attrName !== 'style' && (
	          e.prevValue !== e.newValue ||
	          // IE9, IE10, and Opera 12 gotcha
	          e.newValue === '' && (
	            attrChange === addition ||
	            attrChange === removal
	          )
	    )) {
	      node[ATTRIBUTE_CHANGED_CALLBACK](
	        attrName,
	        attrChange === addition ? null : e.prevValue,
	        attrChange === removal ? null : e.newValue
	      );
	    }
	  }
	  
	  function onDOMNode(action) {
	    var executor = executeAction(action);
	    return function (e) {
	      asapQueue.push(executor, e.target);
	      if (asapTimer) clearTimeout(asapTimer);
	      asapTimer = setTimeout(ASAP, 1);
	    };
	  }
	  
	  function onReadyStateChange(e) {
	    if (dropDomContentLoaded) {
	      dropDomContentLoaded = false;
	      e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
	    }
	    if (query.length) loopAndVerify(
	      (e.target || document).querySelectorAll(query),
	      e.detail === DETACHED ? DETACHED : ATTACHED
	    );
	    if (IE8) purge();
	  }
	  
	  function patchedSetAttribute(name, value) {
	    // jshint validthis:true
	    var self = this;
	    setAttribute.call(self, name, value);
	    onSubtreeModified.call(self, {target: self});
	  }
	  
	  function setupAll(context, callback, args) {
	    var
	      node = callback.apply(context, args),
	      i = getTypeIndex(node)
	    ;
	    if (-1 < i) patch(node, protos[i]);
	    if (args.pop() && query.length)
	      loopAndSetup(node.querySelectorAll(query));
	    return node;
	  }
	  
	  function setupNode(node, proto) {
	    setPrototype(node, proto);
	    if (observer) {
	      observer.observe(node, attributesObserver);
	    } else {
	      if (doesNotSupportDOMAttrModified) {
	        node.setAttribute = patchedSetAttribute;
	        node[EXPANDO_UID] = getAttributesMirror(node);
	        node[ADD_EVENT_LISTENER](DOM_SUBTREE_MODIFIED, onSubtreeModified);
	      }
	      node[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, onDOMAttrModified);
	    }
	    if (node[CREATED_CALLBACK] && notFromInnerHTMLHelper) {
	      node.created = true;
	      node[CREATED_CALLBACK]();
	      node.created = false;
	    }
	  }
	  
	  function purge() {
	    for (var
	      node,
	      i = 0,
	      length = targets.length;
	      i < length; i++
	    ) {
	      node = targets[i];
	      if (!documentElement.contains(node)) {
	        length--;
	        targets.splice(i--, 1);
	        verifyAndSetupAndAction(node, DETACHED);
	      }
	    }
	  }
	  
	  function throwTypeError(type) {
	    throw new Error('A ' + type + ' type is already registered');
	  }
	  
	  function verifyAndSetupAndAction(node, action) {
	    var
	      fn,
	      i = getTypeIndex(node),
	      counterAction
	    ;
	    if (-1 < i) {
	      patchIfNotAlready(node, protos[i]);
	      i = 0;
	      if (action === ATTACHED && !node[ATTACHED]) {
	        node[DETACHED] = false;
	        node[ATTACHED] = true;
	        counterAction = 'connected';
	        i = 1;
	        if (IE8 && indexOf.call(targets, node) < 0) {
	          targets.push(node);
	        }
	      } else if (action === DETACHED && !node[DETACHED]) {
	        node[ATTACHED] = false;
	        node[DETACHED] = true;
	        counterAction = 'disconnected';
	        i = 1;
	      }
	      if (i && (fn = (
	        node[action + CALLBACK] ||
	        node[counterAction + CALLBACK]
	      ))) fn.call(node);
	    }
	  }
	  
	  
	  
	  // V1 in da House!
	  function CustomElementRegistry() {}
	  
	  CustomElementRegistry.prototype = {
	    constructor: CustomElementRegistry,
	    // a workaround for the stubborn WebKit
	    define: usableCustomElements ?
	      function (name, Class, options) {
	        if (options) {
	          CERDefine(name, Class, options);
	        } else {
	          var NAME = name.toUpperCase();
	          constructors[NAME] = {
	            constructor: Class,
	            create: [NAME]
	          };
	          nodeNames.set(Class, NAME);
	        }
	      } :
	      CERDefine,
	    get: usableCustomElements ?
	      function (name) {
	        return customElements.get(name) || get(name);
	      } :
	      get,
	    whenDefined: usableCustomElements ?
	      function (name) {
	        return Promise.race([
	          customElements.whenDefined(name),
	          whenDefined(name)
	        ]);
	      } :
	      whenDefined
	  };
	  
	  function CERDefine(name, Class, options) {
	    var
	      is = options && options[EXTENDS] || '',
	      CProto = Class.prototype,
	      proto = create(CProto),
	      attributes = Class.observedAttributes || empty,
	      definition = {prototype: proto}
	    ;
	    // TODO: is this needed at all since it's inherited?
	    // defineProperty(proto, 'constructor', {value: Class});
	    safeProperty(proto, CREATED_CALLBACK, {
	        value: function () {
	          if (justCreated) justCreated = false;
	          else if (!this[DRECEV1]) {
	            this[DRECEV1] = true;
	            new Class(this);
	            if (CProto[CREATED_CALLBACK])
	              CProto[CREATED_CALLBACK].call(this);
	            var info = constructors[nodeNames.get(Class)];
	            if (!usableCustomElements || info.create.length > 1) {
	              notifyAttributes(this);
	            }
	          }
	      }
	    });
	    safeProperty(proto, ATTRIBUTE_CHANGED_CALLBACK, {
	      value: function (name) {
	        if (-1 < indexOf.call(attributes, name)) {
	          if (CProto[ATTRIBUTE_CHANGED_CALLBACK])
	            CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this, arguments);
	        }
	      }
	    });
	    if (CProto[CONNECTED_CALLBACK]) {
	      safeProperty(proto, ATTACHED_CALLBACK, {
	        value: CProto[CONNECTED_CALLBACK]
	      });
	    }
	    if (CProto[DISCONNECTED_CALLBACK]) {
	      safeProperty(proto, DETACHED_CALLBACK, {
	        value: CProto[DISCONNECTED_CALLBACK]
	      });
	    }
	    if (is) definition[EXTENDS] = is;
	    name = name.toUpperCase();
	    constructors[name] = {
	      constructor: Class,
	      create: is ? [is, secondArgument(name)] : [name]
	    };
	    nodeNames.set(Class, name);
	    document[REGISTER_ELEMENT](name.toLowerCase(), definition);
	    whenDefined(name);
	    waitingList[name].r();
	  }
	  
	  function get(name) {
	    var info = constructors[name.toUpperCase()];
	    return info && info.constructor;
	  }
	  
	  function getIs(options) {
	    return typeof options === 'string' ?
	        options : (options && options.is || '');
	  }
	  
	  function notifyAttributes(self) {
	    var
	      callback = self[ATTRIBUTE_CHANGED_CALLBACK],
	      attributes = callback ? self.attributes : empty,
	      i = attributes.length,
	      attribute
	    ;
	    while (i--) {
	      attribute =  attributes[i]; // || attributes.item(i);
	      callback.call(
	        self,
	        attribute.name || attribute.nodeName,
	        null,
	        attribute.value || attribute.nodeValue
	      );
	    }
	  }
	  
	  function whenDefined(name) {
	    name = name.toUpperCase();
	    if (!(name in waitingList)) {
	      waitingList[name] = {};
	      waitingList[name].p = new Promise(function (resolve) {
	        waitingList[name].r = resolve;
	      });
	    }
	    return waitingList[name].p;
	  }
	  
	  function polyfillV1() {
	    if (customElements) delete window.customElements;
	    defineProperty(window, 'customElements', {
	      configurable: true,
	      value: new CustomElementRegistry()
	    });
	    defineProperty(window, 'CustomElementRegistry', {
	      configurable: true,
	      value: CustomElementRegistry
	    });
	    for (var
	      patchClass = function (name) {
	        var Class = window[name];
	        if (Class) {
	          window[name] = function CustomElementsV1(self) {
	            var info, isNative;
	            if (!self) self = this;
	            if (!self[DRECEV1]) {
	              justCreated = true;
	              info = constructors[nodeNames.get(self.constructor)];
	              isNative = usableCustomElements && info.create.length === 1;
	              self = isNative ?
	                Reflect.construct(Class, empty, info.constructor) :
	                document.createElement.apply(document, info.create);
	              self[DRECEV1] = true;
	              justCreated = false;
	              if (!isNative) notifyAttributes(self);
	            }
	            return self;
	          };
	          window[name].prototype = Class.prototype;
	          try {
	            Class.prototype.constructor = window[name];
	          } catch(WebKit) {
	            defineProperty(Class, DRECEV1, {value: window[name]});
	          }
	        }
	      },
	      Classes = htmlClass.get(/^HTML[A-Z]*[a-z]/),
	      i = Classes.length;
	      i--;
	      patchClass(Classes[i])
	    ) {}
	    (document.createElement = function (name, options) {
	      var is = getIs(options);
	      return is ?
	        patchedCreateElement.call(this, name, secondArgument(is)) :
	        patchedCreateElement.call(this, name);
	    });
	    if (!V0) {
	      justSetup = true;
	      document[REGISTER_ELEMENT]('');
	    }
	  }
	  
	  // if customElements is not there at all
	  if (!customElements || /^force/.test(polyfill.type)) polyfillV1();
	  else if(!polyfill.noBuiltIn) {
	    // if available test extends work as expected
	    try {
	      (function (DRE, options, name) {
	        var re = new RegExp('^<a\\s+is=(\'|")' + name + '\\1></a>$');
	        options[EXTENDS] = 'a';
	        DRE.prototype = create(HTMLAnchorElement.prototype);
	        DRE.prototype.constructor = DRE;
	        window.customElements.define(name, DRE, options);
	        if (
	          !re.test(document.createElement('a', {is: name}).outerHTML) ||
	          !re.test((new DRE()).outerHTML)
	        ) {
	          throw options;
	        }
	      }(
	        function DRE() {
	          return Reflect.construct(HTMLAnchorElement, [], DRE);
	        },
	        {},
	        'document-register-element-a'
	      ));
	    } catch(o_O) {
	      // or force the polyfill if not
	      // and keep internal original reference
	      polyfillV1();
	    }
	  }
	  
	  // FireFox only issue
	  if(!polyfill.noBuiltIn) {
	    try {
	      if (createElement.call(document, 'a', 'a').outerHTML.indexOf('is') < 0)
	        throw {};
	    } catch(FireFox) {
	      secondArgument = function (is) {
	        return {is: is.toLowerCase()};
	      };
	    }
	  }
	  
	}

	if (window.liveRecorder == null)
		installCustomElements(window, 'force');

	/*! (c) Andrea Giammarchi - ISC */
	var self = undefined || /* istanbul ignore next */ {};
	try { self.WeakMap = WeakMap; }
	catch (WeakMap) {
	  // this could be better but 90% of the time
	  // it's everything developers need as fallback
	  self.WeakMap = (function (id, Object) {    var dP = Object.defineProperty;
	    var hOP = Object.hasOwnProperty;
	    var proto = WeakMap.prototype;
	    proto.delete = function (key) {
	      return this.has(key) && delete key[this._];
	    };
	    proto.get = function (key) {
	      return this.has(key) ? key[this._] : void 0;
	    };
	    proto.has = function (key) {
	      return hOP.call(key, this._);
	    };
	    proto.set = function (key, value) {
	      dP(key, this._, {configurable: true, value: value});
	      return this;
	    };
	    return WeakMap;
	    function WeakMap(iterable) {
	      dP(this, '_', {value: '_@ungap/weakmap' + id++});
	      if (iterable)
	        iterable.forEach(add, this);
	    }
	    function add(pair) {
	      this.set(pair[0], pair[1]);
	    }
	  }(Math.random(), Object));
	}
	var WeakMap$1 = self.WeakMap;

	/*! (c) Andrea Giammarchi - ISC */
	var self$1 = undefined || /* istanbul ignore next */ {};
	try { self$1.WeakSet = WeakSet; }
	catch (WeakSet) {
	  (function (id, dP) {
	    var proto = WeakSet.prototype;
	    proto.add = function (object) {
	      if (!this.has(object))
	        dP(object, this._, {value: true, configurable: true});
	      return this;
	    };
	    proto.has = function (object) {
	      return this.hasOwnProperty.call(object, this._);
	    };
	    proto.delete = function (object) {
	      return this.has(object) && delete object[this._];
	    };
	    self$1.WeakSet = WeakSet;
	    function WeakSet() {      dP(this, '_', {value: '_@ungap/weakmap' + id++});
	    }
	  }(Math.random(), Object.defineProperty));
	}
	var WeakSet$1 = self$1.WeakSet;

	const {indexOf, slice} = [];

	const append = (get, parent, children, start, end, before) => {
	  const isSelect = 'selectedIndex' in parent;
	  let noSelection = isSelect;
	  while (start < end) {
	    const child = get(children[start], 1);
	    parent.insertBefore(child, before);
	    if (isSelect && noSelection && child.selected) {
	      noSelection = !noSelection;
	      let {selectedIndex} = parent;
	      parent.selectedIndex = selectedIndex < 0 ?
	        start :
	        indexOf.call(parent.querySelectorAll('option'), child);
	    }
	    start++;
	  }
	};

	const eqeq = (a, b) => a == b;

	const identity = O => O;

	const indexOf$1 = (
	  moreNodes,
	  moreStart,
	  moreEnd,
	  lessNodes,
	  lessStart,
	  lessEnd,
	  compare
	) => {
	  const length = lessEnd - lessStart;
	  /* istanbul ignore if */
	  if (length < 1)
	    return -1;
	  while ((moreEnd - moreStart) >= length) {
	    let m = moreStart;
	    let l = lessStart;
	    while (
	      m < moreEnd &&
	      l < lessEnd &&
	      compare(moreNodes[m], lessNodes[l])
	    ) {
	      m++;
	      l++;
	    }
	    if (l === lessEnd)
	      return moreStart;
	    moreStart = m + 1;
	  }
	  return -1;
	};

	const isReversed = (
	  futureNodes,
	  futureEnd,
	  currentNodes,
	  currentStart,
	  currentEnd,
	  compare
	) => {
	  while (
	    currentStart < currentEnd &&
	    compare(
	      currentNodes[currentStart],
	      futureNodes[futureEnd - 1]
	    )) {
	      currentStart++;
	      futureEnd--;
	    }  return futureEnd === 0;
	};

	const next = (get, list, i, length, before) => i < length ?
	              get(list[i], 0) :
	              (0 < i ?
	                get(list[i - 1], -0).nextSibling :
	                before);

	const remove = (get, children, start, end) => {
	  while (start < end)
	    drop(get(children[start++], -1));
	};

	// - - - - - - - - - - - - - - - - - - -
	// diff related constants and utilities
	// - - - - - - - - - - - - - - - - - - -

	const DELETION = -1;
	const INSERTION = 1;
	const SKIP = 0;
	const SKIP_OND = 50;

	const HS = (
	  futureNodes,
	  futureStart,
	  futureEnd,
	  futureChanges,
	  currentNodes,
	  currentStart,
	  currentEnd,
	  currentChanges
	) => {

	  let k = 0;
	  /* istanbul ignore next */
	  let minLen = futureChanges < currentChanges ? futureChanges : currentChanges;
	  const link = Array(minLen++);
	  const tresh = Array(minLen);
	  tresh[0] = -1;

	  for (let i = 1; i < minLen; i++)
	    tresh[i] = currentEnd;

	  const nodes = currentNodes.slice(currentStart, currentEnd);

	  for (let i = futureStart; i < futureEnd; i++) {
	    const index = nodes.indexOf(futureNodes[i]);
	    if (-1 < index) {
	      const idxInOld = index + currentStart;
	      k = findK(tresh, minLen, idxInOld);
	      /* istanbul ignore else */
	      if (-1 < k) {
	        tresh[k] = idxInOld;
	        link[k] = {
	          newi: i,
	          oldi: idxInOld,
	          prev: link[k - 1]
	        };
	      }
	    }
	  }

	  k = --minLen;
	  --currentEnd;
	  while (tresh[k] > currentEnd) --k;

	  minLen = currentChanges + futureChanges - k;
	  const diff = Array(minLen);
	  let ptr = link[k];
	  --futureEnd;
	  while (ptr) {
	    const {newi, oldi} = ptr;
	    while (futureEnd > newi) {
	      diff[--minLen] = INSERTION;
	      --futureEnd;
	    }
	    while (currentEnd > oldi) {
	      diff[--minLen] = DELETION;
	      --currentEnd;
	    }
	    diff[--minLen] = SKIP;
	    --futureEnd;
	    --currentEnd;
	    ptr = ptr.prev;
	  }
	  while (futureEnd >= futureStart) {
	    diff[--minLen] = INSERTION;
	    --futureEnd;
	  }
	  while (currentEnd >= currentStart) {
	    diff[--minLen] = DELETION;
	    --currentEnd;
	  }
	  return diff;
	};

	// this is pretty much the same petit-dom code without the delete map part
	// https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L556-L561
	const OND = (
	  futureNodes,
	  futureStart,
	  rows,
	  currentNodes,
	  currentStart,
	  cols,
	  compare
	) => {
	  const length = rows + cols;
	  const v = [];
	  let d, k, r, c, pv, cv, pd;
	  outer: for (d = 0; d <= length; d++) {
	    /* istanbul ignore if */
	    if (d > SKIP_OND)
	      return null;
	    pd = d - 1;
	    /* istanbul ignore next */
	    pv = d ? v[d - 1] : [0, 0];
	    cv = v[d] = [];
	    for (k = -d; k <= d; k += 2) {
	      if (k === -d || (k !== d && pv[pd + k - 1] < pv[pd + k + 1])) {
	        c = pv[pd + k + 1];
	      } else {
	        c = pv[pd + k - 1] + 1;
	      }
	      r = c - k;
	      while (
	        c < cols &&
	        r < rows &&
	        compare(
	          currentNodes[currentStart + c],
	          futureNodes[futureStart + r]
	        )
	      ) {
	        c++;
	        r++;
	      }
	      if (c === cols && r === rows) {
	        break outer;
	      }
	      cv[d + k] = c;
	    }
	  }

	  const diff = Array(d / 2 + length / 2);
	  let diffIdx = diff.length - 1;
	  for (d = v.length - 1; d >= 0; d--) {
	    while (
	      c > 0 &&
	      r > 0 &&
	      compare(
	        currentNodes[currentStart + c - 1],
	        futureNodes[futureStart + r - 1]
	      )
	    ) {
	      // diagonal edge = equality
	      diff[diffIdx--] = SKIP;
	      c--;
	      r--;
	    }
	    if (!d)
	      break;
	    pd = d - 1;
	    /* istanbul ignore next */
	    pv = d ? v[d - 1] : [0, 0];
	    k = c - r;
	    if (k === -d || (k !== d && pv[pd + k - 1] < pv[pd + k + 1])) {
	      // vertical edge = insertion
	      r--;
	      diff[diffIdx--] = INSERTION;
	    } else {
	      // horizontal edge = deletion
	      c--;
	      diff[diffIdx--] = DELETION;
	    }
	  }
	  return diff;
	};

	const applyDiff = (
	  diff,
	  get,
	  parentNode,
	  futureNodes,
	  futureStart,
	  currentNodes,
	  currentStart,
	  currentLength,
	  before
	) => {
	  const live = [];
	  const length = diff.length;
	  let currentIndex = currentStart;
	  let i = 0;
	  while (i < length) {
	    switch (diff[i++]) {
	      case SKIP:
	        futureStart++;
	        currentIndex++;
	        break;
	      case INSERTION:
	        // TODO: bulk appends for sequential nodes
	        live.push(futureNodes[futureStart]);
	        append(
	          get,
	          parentNode,
	          futureNodes,
	          futureStart++,
	          futureStart,
	          currentIndex < currentLength ?
	            get(currentNodes[currentIndex], 0) :
	            before
	        );
	        break;
	      case DELETION:
	        currentIndex++;
	        break;
	    }
	  }
	  i = 0;
	  while (i < length) {
	    switch (diff[i++]) {
	      case SKIP:
	        currentStart++;
	        break;
	      case DELETION:
	        // TODO: bulk removes for sequential nodes
	        if (-1 < live.indexOf(currentNodes[currentStart]))
	          currentStart++;
	        else
	          remove(
	            get,
	            currentNodes,
	            currentStart++,
	            currentStart
	          );
	        break;
	    }
	  }
	};

	const findK = (ktr, length, j) => {
	  let lo = 1;
	  let hi = length;
	  while (lo < hi) {
	    const mid = ((lo + hi) / 2) >>> 0;
	    if (j < ktr[mid])
	      hi = mid;
	    else
	      lo = mid + 1;
	  }
	  return lo;
	};

	const smartDiff = (
	  get,
	  parentNode,
	  futureNodes,
	  futureStart,
	  futureEnd,
	  futureChanges,
	  currentNodes,
	  currentStart,
	  currentEnd,
	  currentChanges,
	  currentLength,
	  compare,
	  before
	) => {
	  applyDiff(
	    OND(
	      futureNodes,
	      futureStart,
	      futureChanges,
	      currentNodes,
	      currentStart,
	      currentChanges,
	      compare
	    ) ||
	    HS(
	      futureNodes,
	      futureStart,
	      futureEnd,
	      futureChanges,
	      currentNodes,
	      currentStart,
	      currentEnd,
	      currentChanges
	    ),
	    get,
	    parentNode,
	    futureNodes,
	    futureStart,
	    currentNodes,
	    currentStart,
	    currentLength,
	    before
	  );
	};

	const drop = node => (node.remove || dropChild).call(node);

	function dropChild() {
	  const {parentNode} = this;
	  /* istanbul ignore else */
	  if (parentNode)
	    parentNode.removeChild(this);
	}

	/*! (c) 2018 Andrea Giammarchi (ISC) */

	const domdiff = (
	  parentNode,     // where changes happen
	  currentNodes,   // Array of current items/nodes
	  futureNodes,    // Array of future items/nodes
	  options         // optional object with one of the following properties
	                  //  before: domNode
	                  //  compare(generic, generic) => true if same generic
	                  //  node(generic) => Node
	) => {
	  if (!options)
	    options = {};

	  const compare = options.compare || eqeq;
	  const get = options.node || identity;
	  const before = options.before == null ? null : get(options.before, 0);

	  const currentLength = currentNodes.length;
	  let currentEnd = currentLength;
	  let currentStart = 0;

	  let futureEnd = futureNodes.length;
	  let futureStart = 0;

	  // common prefix
	  while (
	    currentStart < currentEnd &&
	    futureStart < futureEnd &&
	    compare(currentNodes[currentStart], futureNodes[futureStart])
	  ) {
	    currentStart++;
	    futureStart++;
	  }

	  // common suffix
	  while (
	    currentStart < currentEnd &&
	    futureStart < futureEnd &&
	    compare(currentNodes[currentEnd - 1], futureNodes[futureEnd - 1])
	  ) {
	    currentEnd--;
	    futureEnd--;
	  }

	  const currentSame = currentStart === currentEnd;
	  const futureSame = futureStart === futureEnd;

	  // same list
	  if (currentSame && futureSame)
	    return futureNodes;

	  // only stuff to add
	  if (currentSame && futureStart < futureEnd) {
	    append(
	      get,
	      parentNode,
	      futureNodes,
	      futureStart,
	      futureEnd,
	      next(get, currentNodes, currentStart, currentLength, before)
	    );
	    return futureNodes;
	  }

	  // only stuff to remove
	  if (futureSame && currentStart < currentEnd) {
	    remove(
	      get,
	      currentNodes,
	      currentStart,
	      currentEnd
	    );
	    return futureNodes;
	  }

	  const currentChanges = currentEnd - currentStart;
	  const futureChanges = futureEnd - futureStart;
	  let i = -1;

	  // 2 simple indels: the shortest sequence is a subsequence of the longest
	  if (currentChanges < futureChanges) {
	    i = indexOf$1(
	      futureNodes,
	      futureStart,
	      futureEnd,
	      currentNodes,
	      currentStart,
	      currentEnd,
	      compare
	    );
	    // inner diff
	    if (-1 < i) {
	      append(
	        get,
	        parentNode,
	        futureNodes,
	        futureStart,
	        i,
	        get(currentNodes[currentStart], 0)
	      );
	      append(
	        get,
	        parentNode,
	        futureNodes,
	        i + currentChanges,
	        futureEnd,
	        next(get, currentNodes, currentEnd, currentLength, before)
	      );
	      return futureNodes;
	    }
	  }
	  /* istanbul ignore else */
	  else if (futureChanges < currentChanges) {
	    i = indexOf$1(
	      currentNodes,
	      currentStart,
	      currentEnd,
	      futureNodes,
	      futureStart,
	      futureEnd,
	      compare
	    );
	    // outer diff
	    if (-1 < i) {
	      remove(
	        get,
	        currentNodes,
	        currentStart,
	        i
	      );
	      remove(
	        get,
	        currentNodes,
	        i + futureChanges,
	        currentEnd
	      );
	      return futureNodes;
	    }
	  }

	  // common case with one replacement for many nodes
	  // or many nodes replaced for a single one
	  /* istanbul ignore else */
	  if ((currentChanges < 2 || futureChanges < 2)) {
	    append(
	      get,
	      parentNode,
	      futureNodes,
	      futureStart,
	      futureEnd,
	      get(currentNodes[currentStart], 0)
	    );
	    remove(
	      get,
	      currentNodes,
	      currentStart,
	      currentEnd
	    );
	    return futureNodes;
	  }

	  // the half match diff part has been skipped in petit-dom
	  // https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L391-L397
	  // accordingly, I think it's safe to skip in here too
	  // if one day it'll come out like the speediest thing ever to do
	  // then I might add it in here too

	  // Extra: before going too fancy, what about reversed lists ?
	  //        This should bail out pretty quickly if that's not the case.
	  if (
	    currentChanges === futureChanges &&
	    isReversed(
	      futureNodes,
	      futureEnd,
	      currentNodes,
	      currentStart,
	      currentEnd,
	      compare
	    )
	  ) {
	    append(
	      get,
	      parentNode,
	      futureNodes,
	      futureStart,
	      futureEnd,
	      next(get, currentNodes, currentEnd, currentLength, before)
	    );
	    return futureNodes;
	  }

	  // last resort through a smart diff
	  smartDiff(
	    get,
	    parentNode,
	    futureNodes,
	    futureStart,
	    futureEnd,
	    futureChanges,
	    currentNodes,
	    currentStart,
	    currentEnd,
	    currentChanges,
	    currentLength,
	    compare,
	    before
	  );

	  return futureNodes;
	};

	/*! (c) Andrea Giammarchi - ISC */
	var self$2 = undefined || /* istanbul ignore next */ {};
	self$2.CustomEvent = typeof CustomEvent === 'function' ?
	  CustomEvent :
	  (function (__p__) {
	    CustomEvent[__p__] = new CustomEvent('').constructor[__p__];
	    return CustomEvent;
	    function CustomEvent(type, init) {
	      if (!init) init = {};
	      var e = document.createEvent('CustomEvent');
	      e.initCustomEvent(type, !!init.bubbles, !!init.cancelable, init.detail);
	      return e;
	    }
	  }('prototype'));
	var CustomEvent$1 = self$2.CustomEvent;

	/*! (c) Andrea Giammarchi - ISC */
	var self$3 = undefined || /* istanbul ignore next */ {};
	try { self$3.Map = Map; }
	catch (Map) {
	  self$3.Map = function Map() {
	    var i = 0;
	    var k = [];
	    var v = [];
	    return {
	      delete: function (key) {
	        var had = contains(key);
	        if (had) {
	          k.splice(i, 1);
	          v.splice(i, 1);
	        }
	        return had;
	      },
	      forEach: function forEach(callback, context) {
	        k.forEach(
	          function (key, i)  {
	            callback.call(context, v[i], key, this);
	          },
	          this
	        );
	      },
	      get: function get(key) {
	        return contains(key) ? v[i] : void 0;
	      },
	      has: function has(key) {
	        return contains(key);
	      },
	      set: function set(key, value) {
	        v[contains(key) ? i : (k.push(key) - 1)] = value;
	        return this;
	      }
	    };
	    function contains(v) {
	      i = k.indexOf(v);
	      return -1 < i;
	    }
	  };
	}
	var Map$1 = self$3.Map;

	// hyperHTML.Component is a very basic class
	// able to create Custom Elements like components
	// including the ability to listen to connect/disconnect
	// events via onconnect/ondisconnect attributes
	// Components can be created imperatively or declaratively.
	// The main difference is that declared components
	// will not automatically render on setState(...)
	// to simplify state handling on render.
	function Component() {
	  return this; // this is needed in Edge !!!
	}

	// Component is lazily setup because it needs
	// wire mechanism as lazy content
	function setup(content) {
	  // there are various weakly referenced variables in here
	  // and mostly are to use Component.for(...) static method.
	  const children = new WeakMap$1;
	  const create = Object.create;
	  const createEntry = (wm, id, component) => {
	    wm.set(id, component);
	    return component;
	  };
	  const get = (Class, info, context, id) => {
	    const relation = info.get(Class) || relate(Class, info);
	    switch (typeof id) {
	      case 'object':
	      case 'function':
	        const wm = relation.w || (relation.w = new WeakMap$1);
	        return wm.get(id) || createEntry(wm, id, new Class(context));
	      default:
	        const sm = relation.p || (relation.p = create(null));
	        return sm[id] || (sm[id] = new Class(context));
	    }
	  };
	  const relate = (Class, info) => {
	    const relation = {w: null, p: null};
	    info.set(Class, relation);
	    return relation;
	  };
	  const set = context => {
	    const info = new Map$1;
	    children.set(context, info);
	    return info;
	  };
	  // The Component Class
	  Object.defineProperties(
	    Component,
	    {
	      // Component.for(context[, id]) is a convenient way
	      // to automatically relate data/context to children components
	      // If not created yet, the new Component(context) is weakly stored
	      // and after that same instance would always be returned.
	      for: {
	        configurable: true,
	        value(context, id) {
	          return get(
	            this,
	            children.get(context) || set(context),
	            context,
	            id == null ?
	              'default' : id
	          );
	        }
	      }
	    }
	  );
	  Object.defineProperties(
	    Component.prototype,
	    {
	      // all events are handled with the component as context
	      handleEvent: {value(e) {
	        const ct = e.currentTarget;
	        this[
	          ('getAttribute' in ct && ct.getAttribute('data-call')) ||
	          ('on' + e.type)
	        ](e);
	      }},
	      // components will lazily define html or svg properties
	      // as soon as these are invoked within the .render() method
	      // Such render() method is not provided by the base class
	      // but it must be available through the Component extend.
	      // Declared components could implement a
	      // render(props) method too and use props as needed.
	      html: lazyGetter('html', content),
	      svg: lazyGetter('svg', content),
	      // the state is a very basic/simple mechanism inspired by Preact
	      state: lazyGetter('state', function () { return this.defaultState; }),
	      // it is possible to define a default state that'd be always an object otherwise
	      defaultState: {get() { return {}; }},
	      // dispatch a bubbling, cancelable, custom event
	      // through the first known/available node
	      dispatch: {value(type, detail) {
	        const {_wire$} = this;
	        if (_wire$) {
	          const event = new CustomEvent$1(type, {
	            bubbles: true,
	            cancelable: true,
	            detail
	          });
	          event.component = this;
	          return (_wire$.dispatchEvent ?
	                    _wire$ :
	                    _wire$.firstChild
	                  ).dispatchEvent(event);
	        }
	        return false;
	      }},
	      // setting some property state through a new object
	      // or a callback, triggers also automatically a render
	      // unless explicitly specified to not do so (render === false)
	      setState: {value(state, render) {
	        const target = this.state;
	        const source = typeof state === 'function' ? state.call(this, target) : state;
	        for (const key in source) target[key] = source[key];
	        if (render !== false)
	          this.render();
	        return this;
	      }}
	    }
	  );
	}

	// instead of a secret key I could've used a WeakMap
	// However, attaching a property directly will result
	// into better performance with thousands of components
	// hanging around, and less memory pressure caused by the WeakMap
	const lazyGetter = (type, fn) => {
	  const secret = '_' + type + '$';
	  return {
	    get() {
	      return this[secret] || setValue(this, secret, fn.call(this, type));
	    },
	    set(value) {
	      setValue(this, secret, value);
	    }
	  };
	};

	// shortcut to set value on get or set(value)
	const setValue = (self, secret, value) =>
	  Object.defineProperty(self, secret, {
	    configurable: true,
	    value: typeof value === 'function' ?
	      function () {
	        return (self._wire$ = value.apply(this, arguments));
	      } :
	      value
	  })[secret]
	;

	Object.defineProperties(
	  Component.prototype,
	  {
	    // used to distinguish better than instanceof
	    ELEMENT_NODE: {value: 1},
	    nodeType: {value: -1}
	  }
	);

	const attributes = {};
	const intents = {};
	const keys = [];
	const hasOwnProperty = intents.hasOwnProperty;

	let length = 0;

	var Intent = {

	  // used to invoke right away hyper:attributes
	  attributes,

	  // hyperHTML.define('intent', (object, update) => {...})
	  // can be used to define a third parts update mechanism
	  // when every other known mechanism failed.
	  // hyper.define('user', info => info.name);
	  // hyper(node)`<p>${{user}}</p>`;
	  define: (intent, callback) => {
	    if (intent.indexOf('-') < 0) {
	      if (!(intent in intents)) {
	        length = keys.push(intent);
	      }
	      intents[intent] = callback;
	    } else {
	      attributes[intent] = callback;
	    }
	  },

	  // this method is used internally as last resort
	  // to retrieve a value out of an object
	  invoke: (object, callback) => {
	    for (let i = 0; i < length; i++) {
	      let key = keys[i];
	      if (hasOwnProperty.call(object, key)) {
	        return intents[key](object[key], callback);
	      }
	    }
	  }
	};

	var isArray$1 = Array.isArray || (function (toString) {
	  var $ = toString.call([]);
	  return function isArray(object) {
	    return toString.call(object) === $;
	  };
	}({}.toString));

	/*! (c) Andrea Giammarchi - ISC */
	var createContent = (function (document) {  var FRAGMENT = 'fragment';
	  var TEMPLATE = 'template';
	  var HAS_CONTENT = 'content' in create(TEMPLATE);

	  var createHTML = HAS_CONTENT ?
	    function (html) {
	      var template = create(TEMPLATE);
	      template.innerHTML = html;
	      return template.content;
	    } :
	    function (html) {
	      var content = create(FRAGMENT);
	      var template = create(TEMPLATE);
	      var childNodes = null;
	      if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
	        var selector = RegExp.$1;
	        template.innerHTML = '<table>' + html + '</table>';
	        childNodes = template.querySelectorAll(selector);
	      } else {
	        template.innerHTML = html;
	        childNodes = template.childNodes;
	      }
	      append(content, childNodes);
	      return content;
	    };

	  return function createContent(markup, type) {
	    return (type === 'svg' ? createSVG : createHTML)(markup);
	  };

	  function append(root, childNodes) {
	    var length = childNodes.length;
	    while (length--)
	      root.appendChild(childNodes[0]);
	  }

	  function create(element) {
	    return element === FRAGMENT ?
	      document.createDocumentFragment() :
	      document.createElementNS('http://www.w3.org/1999/xhtml', element);
	  }

	  // it could use createElementNS when hasNode is there
	  // but this fallback is equally fast and easier to maintain
	  // it is also battle tested already in all IE
	  function createSVG(svg) {
	    var content = create(FRAGMENT);
	    var template = create('div');
	    template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
	    append(content, template.firstChild.childNodes);
	    return content;
	  }

	}(document));

	/*! (c) Andrea Giammarchi */
	function disconnected(poly) {  var Event = poly.Event;
	  var WeakSet = poly.WeakSet;
	  var notObserving = true;
	  var observer = null;
	  return function observe(node) {
	    if (notObserving) {
	      notObserving = !notObserving;
	      observer = new WeakSet;
	      startObserving(node.ownerDocument);
	    }
	    observer.add(node);
	    return node;
	  };
	  function startObserving(document) {
	    var connected = new WeakSet;
	    var disconnected = new WeakSet;
	    try {
	      (new MutationObserver(changes)).observe(
	        document,
	        {subtree: true, childList: true}
	      );
	    }
	    catch(o_O) {
	      var timer = 0;
	      var records = [];
	      var reschedule = function (record) {
	        records.push(record);
	        clearTimeout(timer);
	        timer = setTimeout(
	          function () {
	            changes(records.splice(timer = 0, records.length));
	          },
	          0
	        );
	      };
	      document.addEventListener(
	        'DOMNodeRemoved',
	        function (event) {
	          reschedule({addedNodes: [], removedNodes: [event.target]});
	        },
	        true
	      );
	      document.addEventListener(
	        'DOMNodeInserted',
	        function (event) {
	          reschedule({addedNodes: [event.target], removedNodes: []});
	        },
	        true
	      );
	    }
	    function changes(records) {
	      for (var
	        record,
	        length = records.length,
	        i = 0; i < length; i++
	      ) {
	        record = records[i];
	        dispatchAll(record.removedNodes, 'disconnected', disconnected, connected);
	        dispatchAll(record.addedNodes, 'connected', connected, disconnected);
	      }
	    }
	    function dispatchAll(nodes, type, wsin, wsout) {
	      for (var
	        node,
	        event = new Event(type),
	        length = nodes.length,
	        i = 0; i < length;
	        (node = nodes[i++]).nodeType === 1 &&
	        dispatchTarget(node, event, type, wsin, wsout)
	      );
	    }
	    function dispatchTarget(node, event, type, wsin, wsout) {
	      if (observer.has(node) && !wsin.has(node)) {
	        wsout.delete(node);
	        wsin.add(node);
	        node.dispatchEvent(event);
	        /*
	        // The event is not bubbling (perf reason: should it?),
	        // hence there's no way to know if
	        // stop/Immediate/Propagation() was called.
	        // Should DOM Level 0 work at all?
	        // I say it's a YAGNI case for the time being,
	        // and easy to implement in user-land.
	        if (!event.cancelBubble) {
	          var fn = node['on' + type];
	          if (fn)
	            fn.call(node, event);
	        }
	        */
	      }
	      for (var
	        // apparently is node.children || IE11 ... ^_^;;
	        // https://github.com/WebReflection/disconnected/issues/1
	        children = node.children || [],
	        length = children.length,
	        i = 0; i < length;
	        dispatchTarget(children[i++], event, type, wsin, wsout)
	      );
	    }
	  }
	}

	/*! (c) Andrea Giammarchi - ISC */
	var importNode = (function (
	  document,
	  appendChild,
	  cloneNode,
	  createTextNode,
	  importNode
	) {
	  var native = importNode in document;
	  // IE 11 has problems with cloning templates:
	  // it "forgets" empty childNodes. This feature-detects that.
	  var fragment = document.createDocumentFragment();
	  fragment[appendChild](document[createTextNode]('g'));
	  fragment[appendChild](document[createTextNode](''));
	  var content = native ?
	    document[importNode](fragment, true) :
	    fragment[cloneNode](true);
	  return content.childNodes.length < 2 ?
	    function importNode(node, deep) {
	      var clone = node[cloneNode]();
	      for (var
	        childNodes = node.childNodes || [],
	        length = childNodes.length,
	        i = 0; deep && i < length; i++
	      ) {
	        clone[appendChild](importNode(childNodes[i], deep));
	      }
	      return clone;
	    } :
	    (native ?
	      document[importNode] :
	      function (node, deep) {
	        return node[cloneNode](!!deep);
	      }
	    );
	}(
	  document,
	  'appendChild',
	  'cloneNode',
	  'createTextNode',
	  'importNode'
	));

	var trim = ''.trim || function () {
	  return String(this).replace(/^\s+|\s+/g, '');
	};

	/*! (c) Andrea Giammarchi - ISC */

	// Custom
	var UID = '-' + Math.random().toFixed(6) + '%';
	//                           Edge issue!

	var UID_IE = false;

	try {
	  if (!(function (template, content, tabindex) {
	    return content in template && (
	      (template.innerHTML = '<p ' + tabindex + '="' + UID + '"></p>'),
	      template[content].childNodes[0].getAttribute(tabindex) == UID
	    );
	  }(document.createElement('template'), 'content', 'tabindex'))) {
	    UID = '_dt: ' + UID.slice(1, -1) + ';';
	    UID_IE = true;
	  }
	} catch(meh) {}

	var UIDC = '<!--' + UID + '-->';

	// DOM
	var COMMENT_NODE = 8;
	var ELEMENT_NODE = 1;
	var TEXT_NODE = 3;

	var SHOULD_USE_TEXT_CONTENT = /^(?:style|textarea)$/i;
	var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

	/*! (c) Andrea Giammarchi - ISC */

	function sanitize (template) {
	  return template.join(UIDC)
	          .replace(selfClosing, fullClosing)
	          .replace(attrSeeker, attrReplacer);
	}

	var spaces = ' \\f\\n\\r\\t';
	var almostEverything = '[^' + spaces + '\\/>"\'=]+';
	var attrName = '[' + spaces + ']+' + almostEverything;
	var tagName = '<([A-Za-z]+[A-Za-z0-9:._-]*)((?:';
	var attrPartials = '(?:\\s*=\\s*(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything.replace('\\/', '') + '))?)';

	var attrSeeker = new RegExp(tagName + attrName + attrPartials + '+)([' + spaces + ']*/?>)', 'g');
	var selfClosing = new RegExp(tagName + attrName + attrPartials + '*)([' + spaces + ']*/>)', 'g');
	var findAttributes = new RegExp('(' + attrName + '\\s*=\\s*)([\'"]?)' + UIDC + '\\2', 'gi');

	function attrReplacer($0, $1, $2, $3) {
	  return '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
	}

	function replaceAttributes($0, $1, $2) {
	  return $1 + ($2 || '"') + UID + ($2 || '"');
	}

	function fullClosing($0, $1, $2) {
	  return VOID_ELEMENTS.test($1) ? $0 : ('<' + $1 + $2 + '></' + $1 + '>');
	}

	var umap = _ => ({
	  // About: get: _.get.bind(_)
	  // It looks like WebKit/Safari didn't optimize bind at all,
	  // so that using bind slows it down by 60%.
	  // Firefox and Chrome are just fine in both cases,
	  // so let's use the approach that works fast everywhere 👍
	  get: key => _.get(key),
	  set: (key, value) => (_.set(key, value), value)
	});

	/* istanbul ignore next */
	var normalizeAttributes = UID_IE ?
	  function (attributes, parts) {
	    var html = parts.join(' ');
	    return parts.slice.call(attributes, 0).sort(function (left, right) {
	      return html.indexOf(left.name) <= html.indexOf(right.name) ? -1 : 1;
	    });
	  } :
	  function (attributes, parts) {
	    return parts.slice.call(attributes, 0);
	  }
	;

	function find(node, path) {
	  var length = path.length;
	  var i = 0;
	  while (i < length)
	    node = node.childNodes[path[i++]];
	  return node;
	}

	function parse(node, holes, parts, path) {
	  var childNodes = node.childNodes;
	  var length = childNodes.length;
	  var i = 0;
	  while (i < length) {
	    var child = childNodes[i];
	    switch (child.nodeType) {
	      case ELEMENT_NODE:
	        var childPath = path.concat(i);
	        parseAttributes(child, holes, parts, childPath);
	        parse(child, holes, parts, childPath);
	        break;
	      case COMMENT_NODE:
	        var textContent = child.textContent;
	        if (textContent === UID) {
	          parts.shift();
	          holes.push(
	            // basicHTML or other non standard engines
	            // might end up having comments in nodes
	            // where they shouldn't, hence this check.
	            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ?
	              Text(node, path) :
	              Any(child, path.concat(i))
	          );
	        } else {
	          switch (textContent.slice(0, 2)) {
	            case '/*':
	              if (textContent.slice(-2) !== '*/')
	                break;
	            case '\uD83D\uDC7B': // ghost
	              node.removeChild(child);
	              i--;
	              length--;
	          }
	        }
	        break;
	      case TEXT_NODE:
	        // the following ignore is actually covered by browsers
	        // only basicHTML ends up on previous COMMENT_NODE case
	        // instead of TEXT_NODE because it knows nothing about
	        // special style or textarea behavior
	        /* istanbul ignore if */
	        if (
	          SHOULD_USE_TEXT_CONTENT.test(node.nodeName) &&
	          trim.call(child.textContent) === UIDC
	        ) {
	          parts.shift();
	          holes.push(Text(node, path));
	        }
	        break;
	    }
	    i++;
	  }
	}

	function parseAttributes(node, holes, parts, path) {
	  var attributes = node.attributes;
	  var cache = [];
	  var remove = [];
	  var array = normalizeAttributes(attributes, parts);
	  var length = array.length;
	  var i = 0;
	  while (i < length) {
	    var attribute = array[i++];
	    var direct = attribute.value === UID;
	    var sparse;
	    if (direct || 1 < (sparse = attribute.value.split(UIDC)).length) {
	      var name = attribute.name;
	      // the following ignore is covered by IE
	      // and the IE9 double viewBox test
	      /* istanbul ignore else */
	      if (cache.indexOf(name) < 0) {
	        cache.push(name);
	        var realName = parts.shift().replace(
	          direct ?
	            /^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/ :
	            new RegExp(
	              '^(?:|[\\S\\s]*?\\s)(' + name + ')\\s*=\\s*(\'|")[\\S\\s]*',
	              'i'
	            ),
	            '$1'
	        );
	        var value = attributes[realName] ||
	                      // the following ignore is covered by browsers
	                      // while basicHTML is already case-sensitive
	                      /* istanbul ignore next */
	                      attributes[realName.toLowerCase()];
	        if (direct)
	          holes.push(Attr(value, path, realName, null));
	        else {
	          var skip = sparse.length - 2;
	          while (skip--)
	            parts.shift();
	          holes.push(Attr(value, path, realName, sparse));
	        }
	      }
	      remove.push(attribute);
	    }
	  }
	  length = remove.length;
	  i = 0;

	  /* istanbul ignore next */
	  var cleanValue = 0 < length && UID_IE && !('ownerSVGElement' in node);
	  while (i < length) {
	    // Edge HTML bug #16878726
	    var attr = remove[i++];
	    // IE/Edge bug lighterhtml#63 - clean the value or it'll persist
	    /* istanbul ignore next */
	    if (cleanValue)
	      attr.value = '';
	    // IE/Edge bug lighterhtml#64 - don't use removeAttributeNode
	    node.removeAttribute(attr.name);
	  }

	  // This is a very specific Firefox/Safari issue
	  // but since it should be a not so common pattern,
	  // it's probably worth patching regardless.
	  // Basically, scripts created through strings are death.
	  // You need to create fresh new scripts instead.
	  // TODO: is there any other node that needs such nonsense?
	  var nodeName = node.nodeName;
	  if (/^script$/i.test(nodeName)) {
	    // this used to be like that
	    // var script = createElement(node, nodeName);
	    // then Edge arrived and decided that scripts created
	    // through template documents aren't worth executing
	    // so it became this ... hopefully it won't hurt in the wild
	    var script = document.createElement(nodeName);
	    length = attributes.length;
	    i = 0;
	    while (i < length)
	      script.setAttributeNode(attributes[i++].cloneNode(true));
	    script.textContent = node.textContent;
	    node.parentNode.replaceChild(script, node);
	  }
	}

	function Any(node, path) {
	  return {
	    type: 'any',
	    node: node,
	    path: path
	  };
	}

	function Attr(node, path, name, sparse) {
	  return {
	    type: 'attr',
	    node: node,
	    path: path,
	    name: name,
	    sparse: sparse
	  };
	}

	function Text(node, path) {
	  return {
	    type: 'text',
	    node: node,
	    path: path
	  };
	}

	// globals

	var parsed = umap(new WeakMap$1);

	function createInfo(options, template) {
	  var markup = (options.convert || sanitize)(template);
	  var transform = options.transform;
	  if (transform)
	    markup = transform(markup);
	  var content = createContent(markup, options.type);
	  cleanContent(content);
	  var holes = [];
	  parse(content, holes, template.slice(0), []);
	  return {
	    content: content,
	    updates: function (content) {
	      var updates = [];
	      var len = holes.length;
	      var i = 0;
	      var off = 0;
	      while (i < len) {
	        var info = holes[i++];
	        var node = find(content, info.path);
	        switch (info.type) {
	          case 'any':
	            updates.push({fn: options.any(node, []), sparse: false});
	            break;
	          case 'attr':
	            var sparse = info.sparse;
	            var fn = options.attribute(node, info.name, info.node);
	            if (sparse === null)
	              updates.push({fn: fn, sparse: false});
	            else {
	              off += sparse.length - 2;
	              updates.push({fn: fn, sparse: true, values: sparse});
	            }
	            break;
	          case 'text':
	            updates.push({fn: options.text(node), sparse: false});
	            node.textContent = '';
	            break;
	        }
	      }
	      len += off;
	      return function () {
	        var length = arguments.length;
	        if (len !== (length - 1)) {
	          throw new Error(
	            (length - 1) + ' values instead of ' + len + '\n' +
	            template.join('${value}')
	          );
	        }
	        var i = 1;
	        var off = 1;
	        while (i < length) {
	          var update = updates[i - off];
	          if (update.sparse) {
	            var values = update.values;
	            var value = values[0];
	            var j = 1;
	            var l = values.length;
	            off += l - 2;
	            while (j < l)
	              value += arguments[i++] + values[j++];
	            update.fn(value);
	          }
	          else
	            update.fn(arguments[i++]);
	        }
	        return content;
	      };
	    }
	  };
	}

	function createDetails(options, template) {
	  var info = parsed.get(template) || parsed.set(template, createInfo(options, template));
	  return info.updates(importNode.call(document, info.content, true));
	}

	var empty = [];
	function domtagger(options) {
	  var previous = empty;
	  var updates = cleanContent;
	  return function (template) {
	    if (previous !== template)
	      updates = createDetails(options, (previous = template));
	    return updates.apply(null, arguments);
	  };
	}

	function cleanContent(fragment) {
	  var childNodes = fragment.childNodes;
	  var i = childNodes.length;
	  while (i--) {
	    var child = childNodes[i];
	    if (
	      child.nodeType !== 1 &&
	      trim.call(child.textContent).length === 0
	    ) {
	      fragment.removeChild(child);
	    }
	  }
	}

	/*! (c) Andrea Giammarchi - ISC */
	var hyperStyle = (function (){  // from https://github.com/developit/preact/blob/33fc697ac11762a1cb6e71e9847670d047af7ce5/src/varants.js
	  var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
	  var hyphen = /([^A-Z])([A-Z]+)/g;
	  return function hyperStyle(node, original) {
	    return 'ownerSVGElement' in node ? svg(node, original) : update(node.style, false);
	  };
	  function ized($0, $1, $2) {
	    return $1 + '-' + $2.toLowerCase();
	  }
	  function svg(node, original) {
	    var style;
	    if (original)
	      style = original.cloneNode(true);
	    else {
	      node.setAttribute('style', '--hyper:style;');
	      style = node.getAttributeNode('style');
	    }
	    style.value = '';
	    node.setAttributeNode(style);
	    return update(style, true);
	  }
	  function toStyle(object) {
	    var key, css = [];
	    for (key in object)
	      css.push(key.replace(hyphen, ized), ':', object[key], ';');
	    return css.join('');
	  }
	  function update(style, isSVG) {
	    var oldType, oldValue;
	    return function (newValue) {
	      var info, key, styleValue, value;
	      switch (typeof newValue) {
	        case 'object':
	          if (newValue) {
	            if (oldType === 'object') {
	              if (!isSVG) {
	                if (oldValue !== newValue) {
	                  for (key in oldValue) {
	                    if (!(key in newValue)) {
	                      style[key] = '';
	                    }
	                  }
	                }
	              }
	            } else {
	              if (isSVG)
	                style.value = '';
	              else
	                style.cssText = '';
	            }
	            info = isSVG ? {} : style;
	            for (key in newValue) {
	              value = newValue[key];
	              styleValue = typeof value === 'number' &&
	                                  !IS_NON_DIMENSIONAL.test(key) ?
	                                  (value + 'px') : value;
	              if (!isSVG && /^--/.test(key))
	                info.setProperty(key, styleValue);
	              else
	                info[key] = styleValue;
	            }
	            oldType = 'object';
	            if (isSVG)
	              style.value = toStyle((oldValue = info));
	            else
	              oldValue = newValue;
	            break;
	          }
	        default:
	          if (oldValue != newValue) {
	            oldType = 'string';
	            oldValue = newValue;
	            if (isSVG)
	              style.value = newValue || '';
	            else
	              style.cssText = newValue || '';
	          }
	          break;
	      }
	    };
	  }
	}());

	/*! (c) Andrea Giammarchi - ISC */
	var Wire = (function (slice, proto) {

	  proto = Wire.prototype;

	  proto.ELEMENT_NODE = 1;
	  proto.nodeType = 111;

	  proto.remove = function (keepFirst) {
	    var childNodes = this.childNodes;
	    var first = this.firstChild;
	    var last = this.lastChild;
	    this._ = null;
	    if (keepFirst && childNodes.length === 2) {
	      last.parentNode.removeChild(last);
	    } else {
	      var range = this.ownerDocument.createRange();
	      range.setStartBefore(keepFirst ? childNodes[1] : first);
	      range.setEndAfter(last);
	      range.deleteContents();
	    }
	    return first;
	  };

	  proto.valueOf = function (forceAppend) {
	    var fragment = this._;
	    var noFragment = fragment == null;
	    if (noFragment)
	      fragment = (this._ = this.ownerDocument.createDocumentFragment());
	    if (noFragment || forceAppend) {
	      for (var n = this.childNodes, i = 0, l = n.length; i < l; i++)
	        fragment.appendChild(n[i]);
	    }
	    return fragment;
	  };

	  return Wire;

	  function Wire(childNodes) {
	    var nodes = (this.childNodes = slice.call(childNodes, 0));
	    this.firstChild = nodes[0];
	    this.lastChild = nodes[nodes.length - 1];
	    this.ownerDocument = nodes[0].ownerDocument;
	    this._ = null;
	  }

	}([].slice));

	// Node.CONSTANTS
	const DOCUMENT_FRAGMENT_NODE$1 = 11;

	// SVG related constants
	const OWNER_SVG_ELEMENT = 'ownerSVGElement';

	// Custom Elements / MutationObserver constants
	const CONNECTED = 'connected';
	const DISCONNECTED = 'dis' + CONNECTED;

	const componentType = Component.prototype.nodeType;
	const wireType = Wire.prototype.nodeType;

	const observe = disconnected({Event: CustomEvent$1, WeakSet: WeakSet$1});

	// returns an intent to explicitly inject content as html
	const asHTML = html => ({html});

	// returns nodes from wires and components
	const asNode = (item, i) => {
	  switch (item.nodeType) {
	    case wireType:
	      // in the Wire case, the content can be
	      // removed, post-pended, inserted, or pre-pended and
	      // all these cases are handled by domdiff already
	      /* istanbul ignore next */
	      return (1 / i) < 0 ?
	        (i ? item.remove(true) : item.lastChild) :
	        (i ? item.valueOf(true) : item.firstChild);
	    case componentType:
	      return asNode(item.render(), i);
	    default:
	      return item;
	  }
	};

	// returns true if domdiff can handle the value
	const canDiff = value => 'ELEMENT_NODE' in value;

	const hyperSetter = (node, name, svg) => svg ?
	  value => {
	    try {
	      node[name] = value;
	    }
	    catch (nope) {
	      node.setAttribute(name, value);
	    }
	  } :
	  value => {
	    node[name] = value;
	  };

	// when a Promise is used as interpolation value
	// its result must be parsed once resolved.
	// This callback is in charge of understanding what to do
	// with a returned value once the promise is resolved.
	const invokeAtDistance = (value, callback) => {
	  callback(value.placeholder);
	  if ('text' in value) {
	    Promise.resolve(value.text).then(String).then(callback);
	  } else if ('any' in value) {
	    Promise.resolve(value.any).then(callback);
	  } else if ('html' in value) {
	    Promise.resolve(value.html).then(asHTML).then(callback);
	  } else {
	    Promise.resolve(Intent.invoke(value, callback)).then(callback);
	  }
	};

	// quick and dirty way to check for Promise/ish values
	const isPromise_ish = value => value != null && 'then' in value;

	// list of attributes that should not be directly assigned
	const readOnly = /^(?:form|list)$/i;

	// reused every slice time
	const slice$1 = [].slice;

	// simplifies text node creation
	const text = (node, text) => node.ownerDocument.createTextNode(text);

	function Tagger(type) {
	  this.type = type;
	  return domtagger(this);
	}

	Tagger.prototype = {

	  // there are four kind of attributes, and related behavior:
	  //  * events, with a name starting with `on`, to add/remove event listeners
	  //  * special, with a name present in their inherited prototype, accessed directly
	  //  * regular, accessed through get/setAttribute standard DOM methods
	  //  * style, the only regular attribute that also accepts an object as value
	  //    so that you can style=${{width: 120}}. In this case, the behavior has been
	  //    fully inspired by Preact library and its simplicity.
	  attribute(node, name, original) {
	    const isSVG = OWNER_SVG_ELEMENT in node;
	    let oldValue;
	    // if the attribute is the style one
	    // handle it differently from others
	    if (name === 'style')
	      return hyperStyle(node, original, isSVG);
	    // direct accessors for <input .value=${...}> and friends
	    else if (name.slice(0, 1) === '.')
	      return hyperSetter(node, name.slice(1), isSVG);
	    // the name is an event one,
	    // add/remove event listeners accordingly
	    else if (/^on/.test(name)) {
	      let type = name.slice(2);
	      if (type === CONNECTED || type === DISCONNECTED) {
	        observe(node);
	      }
	      else if (name.toLowerCase()
	        in node) {
	        type = type.toLowerCase();
	      }
	      return newValue => {
	        if (oldValue !== newValue) {
	          if (oldValue)
	            node.removeEventListener(type, oldValue, false);
	          oldValue = newValue;
	          if (newValue)
	            node.addEventListener(type, newValue, false);
	        }
	      };
	    }
	    // the attribute is special ('value' in input)
	    // and it's not SVG *or* the name is exactly data,
	    // in this case assign the value directly
	    else if (
	      name === 'data' ||
	      (!isSVG && name in node && !readOnly.test(name))
	    ) {
	      return newValue => {
	        if (oldValue !== newValue) {
	          oldValue = newValue;
	          if (node[name] !== newValue && newValue == null) {
	            // cleanup on null to avoid silly IE/Edge bug
	            node[name] = '';
	            node.removeAttribute(name);
	          }
	          else
	            node[name] = newValue;
	        }
	      };
	    }
	    else if (name in Intent.attributes) {
	      return any => {
	        const newValue = Intent.attributes[name](node, any);
	        if (oldValue !== newValue) {
	          oldValue = newValue;
	          if (newValue == null)
	            node.removeAttribute(name);
	          else
	            node.setAttribute(name, newValue);
	        }
	      };
	    }
	    // in every other case, use the attribute node as it is
	    // update only the value, set it as node only when/if needed
	    else {
	      let owner = false;
	      const attribute = original.cloneNode(true);
	      return newValue => {
	        if (oldValue !== newValue) {
	          oldValue = newValue;
	          if (attribute.value !== newValue) {
	            if (newValue == null) {
	              if (owner) {
	                owner = false;
	                node.removeAttributeNode(attribute);
	              }
	              attribute.value = newValue;
	            } else {
	              attribute.value = newValue;
	              if (!owner) {
	                owner = true;
	                node.setAttributeNode(attribute);
	              }
	            }
	          }
	        }
	      };
	    }
	  },

	  // in a hyper(node)`<div>${content}</div>` case
	  // everything could happen:
	  //  * it's a JS primitive, stored as text
	  //  * it's null or undefined, the node should be cleaned
	  //  * it's a component, update the content by rendering it
	  //  * it's a promise, update the content once resolved
	  //  * it's an explicit intent, perform the desired operation
	  //  * it's an Array, resolve all values if Promises and/or
	  //    update the node with the resulting list of content
	  any(node, childNodes) {
	    const diffOptions = {node: asNode, before: node};
	    const nodeType = OWNER_SVG_ELEMENT in node ? /* istanbul ignore next */ 'svg' : 'html';
	    let fastPath = false;
	    let oldValue;
	    const anyContent = value => {
	      switch (typeof value) {
	        case 'string':
	        case 'number':
	        case 'boolean':
	          if (fastPath) {
	            if (oldValue !== value) {
	              oldValue = value;
	              childNodes[0].textContent = value;
	            }
	          } else {
	            fastPath = true;
	            oldValue = value;
	            childNodes = domdiff(
	              node.parentNode,
	              childNodes,
	              [text(node, value)],
	              diffOptions
	            );
	          }
	          break;
	        case 'function':
	          anyContent(value(node));
	          break;
	        case 'object':
	        case 'undefined':
	          if (value == null) {
	            fastPath = false;
	            childNodes = domdiff(
	              node.parentNode,
	              childNodes,
	              [],
	              diffOptions
	            );
	            break;
	          }
	        default:
	          fastPath = false;
	          oldValue = value;
	          if (isArray$1(value)) {
	            if (value.length === 0) {
	              if (childNodes.length) {
	                childNodes = domdiff(
	                  node.parentNode,
	                  childNodes,
	                  [],
	                  diffOptions
	                );
	              }
	            } else {
	              switch (typeof value[0]) {
	                case 'string':
	                case 'number':
	                case 'boolean':
	                  anyContent({html: value});
	                  break;
	                case 'object':
	                  if (isArray$1(value[0])) {
	                    value = value.concat.apply([], value);
	                  }
	                  if (isPromise_ish(value[0])) {
	                    Promise.all(value).then(anyContent);
	                    break;
	                  }
	                default:
	                  childNodes = domdiff(
	                    node.parentNode,
	                    childNodes,
	                    value,
	                    diffOptions
	                  );
	                  break;
	              }
	            }
	          } else if (canDiff(value)) {
	            childNodes = domdiff(
	              node.parentNode,
	              childNodes,
	              value.nodeType === DOCUMENT_FRAGMENT_NODE$1 ?
	                slice$1.call(value.childNodes) :
	                [value],
	              diffOptions
	            );
	          } else if (isPromise_ish(value)) {
	            value.then(anyContent);
	          } else if ('placeholder' in value) {
	            invokeAtDistance(value, anyContent);
	          } else if ('text' in value) {
	            anyContent(String(value.text));
	          } else if ('any' in value) {
	            anyContent(value.any);
	          } else if ('html' in value) {
	            childNodes = domdiff(
	              node.parentNode,
	              childNodes,
	              slice$1.call(
	                createContent(
	                  [].concat(value.html).join(''),
	                  nodeType
	                ).childNodes
	              ),
	              diffOptions
	            );
	          } else if ('length' in value) {
	            anyContent(slice$1.call(value));
	          } else {
	            anyContent(Intent.invoke(value, anyContent));
	          }
	          break;
	      }
	    };
	    return anyContent;
	  },

	  // style or textareas don't accept HTML as content
	  // it's pointless to transform or analyze anything
	  // different from text there but it's worth checking
	  // for possible defined intents.
	  text(node) {
	    let oldValue;
	    const textContent = value => {
	      if (oldValue !== value) {
	        oldValue = value;
	        const type = typeof value;
	        if (type === 'object' && value) {
	          if (isPromise_ish(value)) {
	            value.then(textContent);
	          } else if ('placeholder' in value) {
	            invokeAtDistance(value, textContent);
	          } else if ('text' in value) {
	            textContent(String(value.text));
	          } else if ('any' in value) {
	            textContent(value.any);
	          } else if ('html' in value) {
	            textContent([].concat(value.html).join(''));
	          } else if ('length' in value) {
	            textContent(slice$1.call(value).join(''));
	          } else {
	            textContent(Intent.invoke(value, textContent));
	          }
	        } else if (type === 'function') {
	          textContent(value(node));
	        } else {
	          node.textContent = value == null ? '' : value;
	        }
	      }
	    };
	    return textContent;
	  }
	};

	var isNoOp = typeof document !== 'object';

	var templateLiteral = function (tl) {
	  var RAW = 'raw';
	  var isBroken = function (UA) {
	    return /(Firefox|Safari)\/(\d+)/.test(UA) &&
	          !/(Chrom[eium]+|Android)\/(\d+)/.test(UA);
	  };
	  var broken = isBroken((document.defaultView.navigator || {}).userAgent);
	  var FTS = !(RAW in tl) ||
	            tl.propertyIsEnumerable(RAW) ||
	            !Object.isFrozen(tl[RAW]);
	  if (broken || FTS) {
	    var forever = {};
	    var foreverCache = function (tl) {
	      for (var key = '.', i = 0; i < tl.length; i++)
	        key += tl[i].length + '.' + tl[i];
	      return forever[key] || (forever[key] = tl);
	    };
	    // Fallback TypeScript shenanigans
	    if (FTS)
	      templateLiteral = foreverCache;
	    // try fast path for other browsers:
	    // store the template as WeakMap key
	    // and forever cache it only when it's not there.
	    // this way performance is still optimal,
	    // penalized only when there are GC issues
	    else {
	      var wm = new WeakMap$1;
	      var set = function (tl, unique) {
	        wm.set(tl, unique);
	        return unique;
	      };
	      templateLiteral = function (tl) {
	        return wm.get(tl) || set(tl, foreverCache(tl));
	      };
	    }
	  } else {
	    isNoOp = true;
	  }
	  return TL(tl);
	};

	function TL(tl) {
	  return isNoOp ? tl : templateLiteral(tl);
	}

	function tta (template) {
	  var length = arguments.length;
	  var args = [TL(template)];
	  var i = 1;
	  while (i < length)
	    args.push(arguments[i++]);
	  return args;
	}

	// all wires used per each context
	const wires = new WeakMap$1;

	// A wire is a callback used as tag function
	// to lazily relate a generic object to a template literal.
	// hyper.wire(user)`<div id=user>${user.name}</div>`; => the div#user
	// This provides the ability to have a unique DOM structure
	// related to a unique JS object through a reusable template literal.
	// A wire can specify a type, as svg or html, and also an id
	// via html:id or :id convention. Such :id allows same JS objects
	// to be associated to different DOM structures accordingly with
	// the used template literal without losing previously rendered parts.
	const wire = (obj, type) => obj == null ?
	  content(type || 'html') :
	  weakly(obj, type || 'html');

	// A wire content is a virtual reference to one or more nodes.
	// It's represented by either a DOM node, or an Array.
	// In both cases, the wire content role is to simply update
	// all nodes through the list of related callbacks.
	// In few words, a wire content is like an invisible parent node
	// in charge of updating its content like a bound element would do.
	const content = type => {
	  let wire, tagger, template;
	  return function () {
	    const args = tta.apply(null, arguments);
	    if (template !== args[0]) {
	      template = args[0];
	      tagger = new Tagger(type);
	      wire = wireContent(tagger.apply(tagger, args));
	    } else {
	      tagger.apply(tagger, args);
	    }
	    return wire;
	  };
	};

	// wires are weakly created through objects.
	// Each object can have multiple wires associated
	// and this is thanks to the type + :id feature.
	const weakly = (obj, type) => {
	  const i = type.indexOf(':');
	  let wire = wires.get(obj);
	  let id = type;
	  if (-1 < i) {
	    id = type.slice(i + 1);
	    type = type.slice(0, i) || 'html';
	  }
	  if (!wire)
	    wires.set(obj, wire = {});
	  return wire[id] || (wire[id] = content(type));
	};

	// A document fragment loses its nodes 
	// as soon as it is appended into another node.
	// This has the undesired effect of losing wired content
	// on a second render call, because (by then) the fragment would be empty:
	// no longer providing access to those sub-nodes that ultimately need to
	// stay associated with the original interpolation.
	// To prevent hyperHTML from forgetting about a fragment's sub-nodes,
	// fragments are instead returned as an Array of nodes or, if there's only one entry,
	// as a single referenced node which, unlike fragments, will indeed persist
	// wire content throughout multiple renderings.
	// The initial fragment, at this point, would be used as unique reference to this
	// array of nodes or to this single referenced node.
	const wireContent = node => {
	  const childNodes = node.childNodes;
	  const {length} = childNodes;
	  return length === 1 ?
	    childNodes[0] :
	    (length ? new Wire(childNodes) : node);
	};

	// a weak collection of contexts that
	// are already known to hyperHTML
	const bewitched = new WeakMap$1;

	// better known as hyper.bind(node), the render is
	// the main tag function in charge of fully upgrading
	// or simply updating, contexts used as hyperHTML targets.
	// The `this` context is either a regular DOM node or a fragment.
	function render() {
	  const wicked = bewitched.get(this);
	  const args = tta.apply(null, arguments);
	  if (wicked && wicked.template === args[0]) {
	    wicked.tagger.apply(null, args);
	  } else {
	    upgrade.apply(this, args);
	  }
	  return this;
	}

	// an upgrade is in charge of collecting template info,
	// parse it once, if unknown, to map all interpolations
	// as single DOM callbacks, relate such template
	// to the current context, and render it after cleaning the context up
	function upgrade(template) {
	  const type = OWNER_SVG_ELEMENT in this ? 'svg' : 'html';
	  const tagger = new Tagger(type);
	  bewitched.set(this, {tagger, template: template});
	  this.textContent = '';
	  this.appendChild(tagger.apply(null, arguments));
	}

	/*! (c) Andrea Giammarchi (ISC) */

	// all functions are self bound to the right context
	// you can do the following
	// const {bind, wire} = hyperHTML;
	// and use them right away: bind(node)`hello!`;
	const bind = context => render.bind(context);
	const define = Intent.define;
	const tagger = Tagger.prototype;

	hyper.Component = Component;
	hyper.bind = bind;
	hyper.define = define;
	hyper.diff = domdiff;
	hyper.hyper = hyper;
	hyper.observe = observe;
	hyper.tagger = tagger;
	hyper.wire = wire;

	// exported as shared utils
	// for projects based on hyperHTML
	// that don't necessarily need upfront polyfills
	// i.e. those still targeting IE
	hyper._ = {
	  WeakMap: WeakMap$1,
	  WeakSet: WeakSet$1
	};

	// the wire content is the lazy defined
	// html or svg property of each hyper.Component
	setup(content);

	// by default, hyperHTML is a smart function
	// that "magically" understands what's the best
	// thing to do with passed arguments
	function hyper(HTML) {
	  return arguments.length < 2 ?
	    (HTML == null ?
	      content('html') :
	      (typeof HTML === 'string' ?
	        hyper.wire(null, HTML) :
	        ('raw' in HTML ?
	          content('html')(HTML) :
	          ('nodeType' in HTML ?
	            hyper.bind(HTML) :
	            weakly(HTML, 'html')
	          )
	        )
	      )) :
	    ('raw' in HTML ?
	      content('html') : hyper.wire
	    ).apply(null, arguments);
	}

	/*! (C) 2017-2018 Andrea Giammarchi - ISC Style License */

	// utils to deal with custom elements builtin extends
	const ATTRIBUTE_CHANGED_CALLBACK = 'attributeChangedCallback';
	const O = Object;
	const classes = [];
	const defineProperty = O.defineProperty;
	const getOwnPropertyDescriptor = O.getOwnPropertyDescriptor;
	const getOwnPropertyNames = O.getOwnPropertyNames;
	const getOwnPropertySymbols = O.getOwnPropertySymbols || (() => []);
	const getPrototypeOf = O.getPrototypeOf || (o => o.__proto__);
	const ownKeys = typeof Reflect === 'object' && Reflect.ownKeys ||
	                (o => getOwnPropertyNames(o).concat(getOwnPropertySymbols(o)));
	const setPrototypeOf = O.setPrototypeOf ||
	                      ((o, p) => (o.__proto__ = p, o));
	const camel = name => name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase());
	const {attachShadow} = HTMLElement.prototype;
	const sr = new WeakMap;

	class HyperHTMLElement extends HTMLElement {

	  // define a custom-element in the CustomElementsRegistry
	  // class MyEl extends HyperHTMLElement {}
	  // MyEl.define('my-el');
	  static define(name, options) {
	    const Class = this;
	    const proto = Class.prototype;

	    const onChanged = proto[ATTRIBUTE_CHANGED_CALLBACK];
	    const hasChange = !!onChanged;

	    // Class.booleanAttributes
	    // -----------------------------------------------
	    // attributes defined as boolean will have
	    // an either available or not available attribute
	    // regardless of the value.
	    // All falsy values, or "false", mean attribute removed
	    // while truthy values will be set as is.
	    // Boolean attributes are also automatically observed.
	    const booleanAttributes = Class.booleanAttributes || [];
	    booleanAttributes.forEach(name => {
	      if (!(name in proto)) defineProperty(
	        proto,
	        camel(name),
	        {
	          configurable: true,
	          get() {
	            return this.hasAttribute(name);
	          },
	          set(value) {
	            if (!value || value === 'false')
	              this.removeAttribute(name);
	            else
	              this.setAttribute(name, value);
	          }
	        }
	      );
	    });

	    // Class.observedAttributes
	    // -------------------------------------------------------
	    // HyperHTMLElement will directly reflect get/setAttribute
	    // operation once these attributes are used, example:
	    // el.observed = 123;
	    // will automatically do
	    // el.setAttribute('observed', 123);
	    // triggering also the attributeChangedCallback
	    const observedAttributes = Class.observedAttributes || [];
	    observedAttributes.forEach(name => {
	      // it is possible to redefine the behavior at any time
	      // simply overwriting get prop() and set prop(value)
	      if (!(name in proto)) defineProperty(
	        proto,
	        camel(name),
	        {
	          configurable: true,
	          get() {
	            return this.getAttribute(name);
	          },
	          set(value) {
	            if (value == null)
	              this.removeAttribute(name);
	            else
	              this.setAttribute(name, value);
	          }
	        }
	      );
	    });

	    // if these are defined, overwrite the observedAttributes getter
	    // to include also booleanAttributes
	    const attributes = booleanAttributes.concat(observedAttributes);
	    if (attributes.length)
	      defineProperty(Class, 'observedAttributes', {
	        get() { return attributes; }
	      });

	    // created() {}
	    // ---------------------------------
	    // an initializer method that grants
	    // the node is fully known to the browser.
	    // It is ensured to run either after DOMContentLoaded,
	    // or once there is a next sibling (stream-friendly) so that
	    // you have full access to element attributes and/or childNodes.
	    const created = proto.created || function () {
	      this.render();
	    };

	    // used to ensure create() is called once and once only
	    defineProperty(
	      proto,
	      '_init$',
	      {
	        configurable: true,
	        writable: true,
	        value: true
	      }
	    );

	    defineProperty(
	      proto,
	      ATTRIBUTE_CHANGED_CALLBACK,
	      {
	        configurable: true,
	        value: function aCC(name, prev, curr) {
	          if (this._init$) {
	            checkReady.call(this, created);
	            if (this._init$)
	              return this._init$$.push(aCC.bind(this, name, prev, curr));
	          }
	          // ensure setting same value twice
	          // won't trigger twice attributeChangedCallback
	          if (hasChange && prev !== curr) {
	            onChanged.apply(this, arguments);
	          }
	        }
	      }
	    );

	    const onConnected = proto.connectedCallback;
	    const hasConnect = !!onConnected;
	    defineProperty(
	      proto,
	      'connectedCallback',
	      {
	        configurable: true,
	        value: function cC() {
	          if (this._init$) {
	            checkReady.call(this, created);
	            if (this._init$)
	              return this._init$$.push(cC.bind(this));
	          }
	          if (hasConnect) {
	            onConnected.apply(this, arguments);
	          }
	        }
	      }
	    );

	    // define lazily all handlers
	    // class { handleClick() { ... }
	    // render() { `<a onclick=${this.handleClick}>` } }
	    getOwnPropertyNames(proto).forEach(key => {
	      if (/^handle[A-Z]/.test(key)) {
	        const _key$ = '_' + key + '$';
	        const method = proto[key];
	        defineProperty(proto, key, {
	          configurable: true,
	          get() {
	            return  this[_key$] ||
	                    (this[_key$] = method.bind(this));
	          }
	        });
	      }
	    });

	    // whenever you want to directly use the component itself
	    // as EventListener, you can pass it directly.
	    // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
	    //  class Reactive extends HyperHTMLElement {
	    //    oninput(e) { console.log(this, 'changed', e.target.value); }
	    //    render() { this.html`<input oninput="${this}">`; }
	    //  }
	    if (!('handleEvent' in proto)) {
	      defineProperty(
	        proto,
	        'handleEvent',
	        {
	          configurable: true,
	          value(event) {
	            this[
	              (event.currentTarget.dataset || {}).call ||
	              ('on' + event.type)
	            ](event);
	          }
	        }
	      );
	    }

	    if (options && options.extends) {
	      const Native = document.createElement(options.extends).constructor;
	      const Intermediate = class extends Native {};
	      const ckeys = ['length', 'name', 'arguments', 'caller', 'prototype'];
	      const pkeys = [];
	      let Super = null;
	      let BaseClass = Class;
	      while (Super = getPrototypeOf(BaseClass)) {
	        [
	          {target: Intermediate, base: Super, keys: ckeys},
	          {target: Intermediate.prototype, base: Super.prototype, keys: pkeys}
	        ]
	        .forEach(({target, base, keys}) => {
	          ownKeys(base)
	            .filter(key => keys.indexOf(key) < 0)
	            .forEach((key) => {
	              keys.push(key);
	              defineProperty(
	                target,
	                key,
	                getOwnPropertyDescriptor(base, key)
	              );
	            });
	        });

	        BaseClass = Super;
	        if (Super === HyperHTMLElement)
	          break;
	      }
	      setPrototypeOf(Class, Intermediate);
	      setPrototypeOf(proto, Intermediate.prototype);
	      customElements.define(name, Class, options);
	    } else {
	      customElements.define(name, Class);
	    }
	    classes.push(Class);
	    return Class;
	  }

	  // weakly relate the shadowRoot for refs usage
	  attachShadow() {
	    const shadowRoot = attachShadow.apply(this, arguments);
	    sr.set(this, shadowRoot);
	    return shadowRoot;
	  }

	  // returns elements by ref
	  get refs() {
	    const value = {};
	    if ('_html$' in this) {
	      const all = (sr.get(this) || this).querySelectorAll('[ref]');
	      for (let {length} = all, i = 0; i < length; i++) {
	        const node = all[i];
	        value[node.getAttribute('ref')] = node;
	      }
	      Object.defineProperty(this, 'refs', {value});
	      return value;
	    }
	    return value;
	  }

	  // lazily bind once hyperHTML logic
	  // to either the shadowRoot, if present and open,
	  // the _shadowRoot property, if set due closed shadow root,
	  // or the custom-element itself if no Shadow DOM is used.
	  get html() {
	    return this._html$ || (this.html = bind(
	      // in a way or another, bind to the right node
	      // backward compatible, first two could probably go already
	      this.shadowRoot || this._shadowRoot || sr.get(this) || this
	    ));
	  }

	  // it can be set too if necessary, it won't invoke render()
	  set html(value) {
	    defineProperty(this, '_html$', {configurable: true, value: value});
	  }

	  // overwrite this method with your own render
	  render() {}

	  // ---------------------//
	  // Basic State Handling //
	  // ---------------------//

	  // define the default state object
	  // you could use observed properties too
	  get defaultState() { return {}; }

	  // the state with a default
	  get state() {
	    return this._state$ || (this.state = this.defaultState);
	  }

	  // it can be set too if necessary, it won't invoke render()
	  set state(value) {
	    defineProperty(this, '_state$', {configurable: true, value: value});
	  }

	  // currently a state is a shallow copy, like in Preact or other libraries.
	  // after the state is updated, the render() method will be invoked.
	  // ⚠️ do not ever call this.setState() inside this.render()
	  setState(state, render) {
	    const target = this.state;
	    const source = typeof state === 'function' ? state.call(this, target) : state;
	    for (const key in source) target[key] = source[key];
	    if (render !== false) this.render();
	    return this;
	  }

	}
	// exposing hyperHTML utilities
	HyperHTMLElement.Component = Component;
	HyperHTMLElement.bind = bind;
	HyperHTMLElement.intent = define;
	HyperHTMLElement.wire = wire;
	HyperHTMLElement.hyper = hyper;

	try {
	  if (Symbol.hasInstance) classes.push(
	    defineProperty(HyperHTMLElement, Symbol.hasInstance, {
	      enumerable: false,
	      configurable: true,
	      value(instance) {
	        return classes.some(isPrototypeOf, getPrototypeOf(instance));
	      }
	    }));
	} catch(meh) {}

	// ------------------------------//
	// DOMContentLoaded VS created() //
	// ------------------------------//
	const dom = {
	  type: 'DOMContentLoaded',
	  handleEvent() {
	    if (dom.ready()) {
	      document.removeEventListener(dom.type, dom, false);
	      dom.list.splice(0).forEach(invoke);
	    }
	    else
	      setTimeout(dom.handleEvent);
	  },
	  ready() {
	    return document.readyState === 'complete';
	  },
	  list: []
	};

	if (!dom.ready()) {
	  document.addEventListener(dom.type, dom, false);
	}

	function checkReady(created) {
	  if (dom.ready() || isReady.call(this, created)) {
	    if (this._init$) {
	      const list = this._init$$;
	      if (list) delete this._init$$;
	      created.call(defineProperty(this, '_init$', {value: false}));
	      if (list) list.forEach(invoke);
	    }
	  } else {
	    if (!this.hasOwnProperty('_init$$'))
	      defineProperty(this, '_init$$', {configurable: true, value: []});
	    dom.list.push(checkReady.bind(this, created));
	  }
	}

	function invoke(fn) {
	  fn();
	}

	function isPrototypeOf(Class) {
	  return this === Class.prototype;
	}

	function isReady(created) {
	  let el = this;
	  do { if (el.nextSibling) return true; }
	  while (el = el.parentNode);
	  setTimeout(checkReady.bind(this, created));
	  return false;
	}

	/**!
	 * @fileOverview Kickass library to create and place poppers near their reference elements.
	 * @version 1.16.1
	 * @license
	 * Copyright (c) 2016 Federico Zivolo and contributors
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */
	var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

	var timeoutDuration = function () {
	  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
	  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
	    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
	      return 1;
	    }
	  }
	  return 0;
	}();

	function microtaskDebounce(fn) {
	  var called = false;
	  return function () {
	    if (called) {
	      return;
	    }
	    called = true;
	    window.Promise.resolve().then(function () {
	      called = false;
	      fn();
	    });
	  };
	}

	function taskDebounce(fn) {
	  var scheduled = false;
	  return function () {
	    if (!scheduled) {
	      scheduled = true;
	      setTimeout(function () {
	        scheduled = false;
	        fn();
	      }, timeoutDuration);
	    }
	  };
	}

	var supportsMicroTasks = isBrowser && window.Promise;

	/**
	* Create a debounced version of a method, that's asynchronously deferred
	* but called in the minimum time possible.
	*
	* @method
	* @memberof Popper.Utils
	* @argument {Function} fn
	* @returns {Function}
	*/
	var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

	/**
	 * Check if the given variable is a function
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Any} functionToCheck - variable to check
	 * @returns {Boolean} answer to: is a function?
	 */
	function isFunction(functionToCheck) {
	  var getType = {};
	  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	/**
	 * Get CSS computed property of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Eement} element
	 * @argument {String} property
	 */
	function getStyleComputedProperty(element, property) {
	  if (element.nodeType !== 1) {
	    return [];
	  }
	  // NOTE: 1 DOM access here
	  var window = element.ownerDocument.defaultView;
	  var css = window.getComputedStyle(element, null);
	  return property ? css[property] : css;
	}

	/**
	 * Returns the parentNode or the host of the element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} parent
	 */
	function getParentNode(element) {
	  if (element.nodeName === 'HTML') {
	    return element;
	  }
	  return element.parentNode || element.host;
	}

	/**
	 * Returns the scrolling parent of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} scroll parent
	 */
	function getScrollParent(element) {
	  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
	  if (!element) {
	    return document.body;
	  }

	  switch (element.nodeName) {
	    case 'HTML':
	    case 'BODY':
	      return element.ownerDocument.body;
	    case '#document':
	      return element.body;
	  }

	  // Firefox want us to check `-x` and `-y` variations as well

	  var _getStyleComputedProp = getStyleComputedProperty(element),
	      overflow = _getStyleComputedProp.overflow,
	      overflowX = _getStyleComputedProp.overflowX,
	      overflowY = _getStyleComputedProp.overflowY;

	  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
	    return element;
	  }

	  return getScrollParent(getParentNode(element));
	}

	/**
	 * Returns the reference node of the reference object, or the reference object itself.
	 * @method
	 * @memberof Popper.Utils
	 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
	 * @returns {Element} parent
	 */
	function getReferenceNode(reference) {
	  return reference && reference.referenceNode ? reference.referenceNode : reference;
	}

	var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
	var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

	/**
	 * Determines if the browser is Internet Explorer
	 * @method
	 * @memberof Popper.Utils
	 * @param {Number} version to check
	 * @returns {Boolean} isIE
	 */
	function isIE(version) {
	  if (version === 11) {
	    return isIE11;
	  }
	  if (version === 10) {
	    return isIE10;
	  }
	  return isIE11 || isIE10;
	}

	/**
	 * Returns the offset parent of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} offset parent
	 */
	function getOffsetParent(element) {
	  if (!element) {
	    return document.documentElement;
	  }

	  var noOffsetParent = isIE(10) ? document.body : null;

	  // NOTE: 1 DOM access here
	  var offsetParent = element.offsetParent || null;
	  // Skip hidden elements which don't have an offsetParent
	  while (offsetParent === noOffsetParent && element.nextElementSibling) {
	    offsetParent = (element = element.nextElementSibling).offsetParent;
	  }

	  var nodeName = offsetParent && offsetParent.nodeName;

	  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
	    return element ? element.ownerDocument.documentElement : document.documentElement;
	  }

	  // .offsetParent will return the closest TH, TD or TABLE in case
	  // no offsetParent is present, I hate this job...
	  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
	    return getOffsetParent(offsetParent);
	  }

	  return offsetParent;
	}

	function isOffsetContainer(element) {
	  var nodeName = element.nodeName;

	  if (nodeName === 'BODY') {
	    return false;
	  }
	  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
	}

	/**
	 * Finds the root node (document, shadowDOM root) of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} node
	 * @returns {Element} root node
	 */
	function getRoot(node) {
	  if (node.parentNode !== null) {
	    return getRoot(node.parentNode);
	  }

	  return node;
	}

	/**
	 * Finds the offset parent common to the two provided nodes
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element1
	 * @argument {Element} element2
	 * @returns {Element} common offset parent
	 */
	function findCommonOffsetParent(element1, element2) {
	  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
	  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
	    return document.documentElement;
	  }

	  // Here we make sure to give as "start" the element that comes first in the DOM
	  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
	  var start = order ? element1 : element2;
	  var end = order ? element2 : element1;

	  // Get common ancestor container
	  var range = document.createRange();
	  range.setStart(start, 0);
	  range.setEnd(end, 0);
	  var commonAncestorContainer = range.commonAncestorContainer;

	  // Both nodes are inside #document

	  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
	    if (isOffsetContainer(commonAncestorContainer)) {
	      return commonAncestorContainer;
	    }

	    return getOffsetParent(commonAncestorContainer);
	  }

	  // one of the nodes is inside shadowDOM, find which one
	  var element1root = getRoot(element1);
	  if (element1root.host) {
	    return findCommonOffsetParent(element1root.host, element2);
	  } else {
	    return findCommonOffsetParent(element1, getRoot(element2).host);
	  }
	}

	/**
	 * Gets the scroll value of the given element in the given side (top and left)
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @argument {String} side `top` or `left`
	 * @returns {number} amount of scrolled pixels
	 */
	function getScroll(element) {
	  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

	  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
	  var nodeName = element.nodeName;

	  if (nodeName === 'BODY' || nodeName === 'HTML') {
	    var html = element.ownerDocument.documentElement;
	    var scrollingElement = element.ownerDocument.scrollingElement || html;
	    return scrollingElement[upperSide];
	  }

	  return element[upperSide];
	}

	/*
	 * Sum or subtract the element scroll values (left and top) from a given rect object
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} rect - Rect object you want to change
	 * @param {HTMLElement} element - The element from the function reads the scroll values
	 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
	 * @return {Object} rect - The modifier rect object
	 */
	function includeScroll(rect, element) {
	  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var scrollTop = getScroll(element, 'top');
	  var scrollLeft = getScroll(element, 'left');
	  var modifier = subtract ? -1 : 1;
	  rect.top += scrollTop * modifier;
	  rect.bottom += scrollTop * modifier;
	  rect.left += scrollLeft * modifier;
	  rect.right += scrollLeft * modifier;
	  return rect;
	}

	/*
	 * Helper to detect borders of a given element
	 * @method
	 * @memberof Popper.Utils
	 * @param {CSSStyleDeclaration} styles
	 * Result of `getStyleComputedProperty` on the given element
	 * @param {String} axis - `x` or `y`
	 * @return {number} borders - The borders size of the given axis
	 */

	function getBordersSize(styles, axis) {
	  var sideA = axis === 'x' ? 'Left' : 'Top';
	  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

	  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
	}

	function getSize(axis, body, html, computedStyle) {
	  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
	}

	function getWindowSizes(document) {
	  var body = document.body;
	  var html = document.documentElement;
	  var computedStyle = isIE(10) && getComputedStyle(html);

	  return {
	    height: getSize('Height', body, html, computedStyle),
	    width: getSize('Width', body, html, computedStyle)
	  };
	}

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();





	var defineProperty$1 = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	/**
	 * Given element offsets, generate an output similar to getBoundingClientRect
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Object} offsets
	 * @returns {Object} ClientRect like output
	 */
	function getClientRect(offsets) {
	  return _extends({}, offsets, {
	    right: offsets.left + offsets.width,
	    bottom: offsets.top + offsets.height
	  });
	}

	/**
	 * Get bounding client rect of given element
	 * @method
	 * @memberof Popper.Utils
	 * @param {HTMLElement} element
	 * @return {Object} client rect
	 */
	function getBoundingClientRect(element) {
	  var rect = {};

	  // IE10 10 FIX: Please, don't ask, the element isn't
	  // considered in DOM in some circumstances...
	  // This isn't reproducible in IE10 compatibility mode of IE11
	  try {
	    if (isIE(10)) {
	      rect = element.getBoundingClientRect();
	      var scrollTop = getScroll(element, 'top');
	      var scrollLeft = getScroll(element, 'left');
	      rect.top += scrollTop;
	      rect.left += scrollLeft;
	      rect.bottom += scrollTop;
	      rect.right += scrollLeft;
	    } else {
	      rect = element.getBoundingClientRect();
	    }
	  } catch (e) {}

	  var result = {
	    left: rect.left,
	    top: rect.top,
	    width: rect.right - rect.left,
	    height: rect.bottom - rect.top
	  };

	  // subtract scrollbar size from sizes
	  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
	  var width = sizes.width || element.clientWidth || result.width;
	  var height = sizes.height || element.clientHeight || result.height;

	  var horizScrollbar = element.offsetWidth - width;
	  var vertScrollbar = element.offsetHeight - height;

	  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
	  // we make this check conditional for performance reasons
	  if (horizScrollbar || vertScrollbar) {
	    var styles = getStyleComputedProperty(element);
	    horizScrollbar -= getBordersSize(styles, 'x');
	    vertScrollbar -= getBordersSize(styles, 'y');

	    result.width -= horizScrollbar;
	    result.height -= vertScrollbar;
	  }

	  return getClientRect(result);
	}

	function getOffsetRectRelativeToArbitraryNode(children, parent) {
	  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var isIE10 = isIE(10);
	  var isHTML = parent.nodeName === 'HTML';
	  var childrenRect = getBoundingClientRect(children);
	  var parentRect = getBoundingClientRect(parent);
	  var scrollParent = getScrollParent(children);

	  var styles = getStyleComputedProperty(parent);
	  var borderTopWidth = parseFloat(styles.borderTopWidth);
	  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

	  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
	  if (fixedPosition && isHTML) {
	    parentRect.top = Math.max(parentRect.top, 0);
	    parentRect.left = Math.max(parentRect.left, 0);
	  }
	  var offsets = getClientRect({
	    top: childrenRect.top - parentRect.top - borderTopWidth,
	    left: childrenRect.left - parentRect.left - borderLeftWidth,
	    width: childrenRect.width,
	    height: childrenRect.height
	  });
	  offsets.marginTop = 0;
	  offsets.marginLeft = 0;

	  // Subtract margins of documentElement in case it's being used as parent
	  // we do this only on HTML because it's the only element that behaves
	  // differently when margins are applied to it. The margins are included in
	  // the box of the documentElement, in the other cases not.
	  if (!isIE10 && isHTML) {
	    var marginTop = parseFloat(styles.marginTop);
	    var marginLeft = parseFloat(styles.marginLeft);

	    offsets.top -= borderTopWidth - marginTop;
	    offsets.bottom -= borderTopWidth - marginTop;
	    offsets.left -= borderLeftWidth - marginLeft;
	    offsets.right -= borderLeftWidth - marginLeft;

	    // Attach marginTop and marginLeft because in some circumstances we may need them
	    offsets.marginTop = marginTop;
	    offsets.marginLeft = marginLeft;
	  }

	  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
	    offsets = includeScroll(offsets, parent);
	  }

	  return offsets;
	}

	function getViewportOffsetRectRelativeToArtbitraryNode(element) {
	  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var html = element.ownerDocument.documentElement;
	  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
	  var width = Math.max(html.clientWidth, window.innerWidth || 0);
	  var height = Math.max(html.clientHeight, window.innerHeight || 0);

	  var scrollTop = !excludeScroll ? getScroll(html) : 0;
	  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

	  var offset = {
	    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
	    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
	    width: width,
	    height: height
	  };

	  return getClientRect(offset);
	}

	/**
	 * Check if the given element is fixed or is inside a fixed parent
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @argument {Element} customContainer
	 * @returns {Boolean} answer to "isFixed?"
	 */
	function isFixed(element) {
	  var nodeName = element.nodeName;
	  if (nodeName === 'BODY' || nodeName === 'HTML') {
	    return false;
	  }
	  if (getStyleComputedProperty(element, 'position') === 'fixed') {
	    return true;
	  }
	  var parentNode = getParentNode(element);
	  if (!parentNode) {
	    return false;
	  }
	  return isFixed(parentNode);
	}

	/**
	 * Finds the first parent of an element that has a transformed property defined
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} first transformed parent or documentElement
	 */

	function getFixedPositionOffsetParent(element) {
	  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
	  if (!element || !element.parentElement || isIE()) {
	    return document.documentElement;
	  }
	  var el = element.parentElement;
	  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
	    el = el.parentElement;
	  }
	  return el || document.documentElement;
	}

	/**
	 * Computed the boundaries limits and return them
	 * @method
	 * @memberof Popper.Utils
	 * @param {HTMLElement} popper
	 * @param {HTMLElement} reference
	 * @param {number} padding
	 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
	 * @param {Boolean} fixedPosition - Is in fixed position mode
	 * @returns {Object} Coordinates of the boundaries
	 */
	function getBoundaries(popper, reference, padding, boundariesElement) {
	  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  // NOTE: 1 DOM access here

	  var boundaries = { top: 0, left: 0 };
	  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

	  // Handle viewport case
	  if (boundariesElement === 'viewport') {
	    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
	  } else {
	    // Handle other cases based on DOM element used as boundaries
	    var boundariesNode = void 0;
	    if (boundariesElement === 'scrollParent') {
	      boundariesNode = getScrollParent(getParentNode(reference));
	      if (boundariesNode.nodeName === 'BODY') {
	        boundariesNode = popper.ownerDocument.documentElement;
	      }
	    } else if (boundariesElement === 'window') {
	      boundariesNode = popper.ownerDocument.documentElement;
	    } else {
	      boundariesNode = boundariesElement;
	    }

	    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

	    // In case of HTML, we need a different computation
	    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
	      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
	          height = _getWindowSizes.height,
	          width = _getWindowSizes.width;

	      boundaries.top += offsets.top - offsets.marginTop;
	      boundaries.bottom = height + offsets.top;
	      boundaries.left += offsets.left - offsets.marginLeft;
	      boundaries.right = width + offsets.left;
	    } else {
	      // for all the other DOM elements, this one is good
	      boundaries = offsets;
	    }
	  }

	  // Add paddings
	  padding = padding || 0;
	  var isPaddingNumber = typeof padding === 'number';
	  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
	  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
	  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
	  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

	  return boundaries;
	}

	function getArea(_ref) {
	  var width = _ref.width,
	      height = _ref.height;

	  return width * height;
	}

	/**
	 * Utility used to transform the `auto` placement to the placement with more
	 * available space.
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
	  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

	  if (placement.indexOf('auto') === -1) {
	    return placement;
	  }

	  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

	  var rects = {
	    top: {
	      width: boundaries.width,
	      height: refRect.top - boundaries.top
	    },
	    right: {
	      width: boundaries.right - refRect.right,
	      height: boundaries.height
	    },
	    bottom: {
	      width: boundaries.width,
	      height: boundaries.bottom - refRect.bottom
	    },
	    left: {
	      width: refRect.left - boundaries.left,
	      height: boundaries.height
	    }
	  };

	  var sortedAreas = Object.keys(rects).map(function (key) {
	    return _extends({
	      key: key
	    }, rects[key], {
	      area: getArea(rects[key])
	    });
	  }).sort(function (a, b) {
	    return b.area - a.area;
	  });

	  var filteredAreas = sortedAreas.filter(function (_ref2) {
	    var width = _ref2.width,
	        height = _ref2.height;
	    return width >= popper.clientWidth && height >= popper.clientHeight;
	  });

	  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

	  var variation = placement.split('-')[1];

	  return computedPlacement + (variation ? '-' + variation : '');
	}

	/**
	 * Get offsets to the reference element
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} state
	 * @param {Element} popper - the popper element
	 * @param {Element} reference - the reference element (the popper will be relative to this)
	 * @param {Element} fixedPosition - is in fixed position mode
	 * @returns {Object} An object containing the offsets which will be applied to the popper
	 */
	function getReferenceOffsets(state, popper, reference) {
	  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
	  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
	}

	/**
	 * Get the outer sizes of the given element (offset size + margins)
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Object} object containing width and height properties
	 */
	function getOuterSizes(element) {
	  var window = element.ownerDocument.defaultView;
	  var styles = window.getComputedStyle(element);
	  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
	  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
	  var result = {
	    width: element.offsetWidth + y,
	    height: element.offsetHeight + x
	  };
	  return result;
	}

	/**
	 * Get the opposite placement of the given one
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement
	 * @returns {String} flipped placement
	 */
	function getOppositePlacement(placement) {
	  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash[matched];
	  });
	}

	/**
	 * Get offsets to the popper
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} position - CSS position the Popper will get applied
	 * @param {HTMLElement} popper - the popper element
	 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
	 * @param {String} placement - one of the valid placement options
	 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
	 */
	function getPopperOffsets(popper, referenceOffsets, placement) {
	  placement = placement.split('-')[0];

	  // Get popper node sizes
	  var popperRect = getOuterSizes(popper);

	  // Add position, width and height to our offsets object
	  var popperOffsets = {
	    width: popperRect.width,
	    height: popperRect.height
	  };

	  // depending by the popper placement we have to compute its offsets slightly differently
	  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
	  var mainSide = isHoriz ? 'top' : 'left';
	  var secondarySide = isHoriz ? 'left' : 'top';
	  var measurement = isHoriz ? 'height' : 'width';
	  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

	  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
	  if (placement === secondarySide) {
	    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
	  } else {
	    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
	  }

	  return popperOffsets;
	}

	/**
	 * Mimics the `find` method of Array
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Array} arr
	 * @argument prop
	 * @argument value
	 * @returns index or -1
	 */
	function find$1(arr, check) {
	  // use native find if supported
	  if (Array.prototype.find) {
	    return arr.find(check);
	  }

	  // use `filter` to obtain the same behavior of `find`
	  return arr.filter(check)[0];
	}

	/**
	 * Return the index of the matching object
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Array} arr
	 * @argument prop
	 * @argument value
	 * @returns index or -1
	 */
	function findIndex(arr, prop, value) {
	  // use native findIndex if supported
	  if (Array.prototype.findIndex) {
	    return arr.findIndex(function (cur) {
	      return cur[prop] === value;
	    });
	  }

	  // use `find` + `indexOf` if `findIndex` isn't supported
	  var match = find$1(arr, function (obj) {
	    return obj[prop] === value;
	  });
	  return arr.indexOf(match);
	}

	/**
	 * Loop trough the list of modifiers and run them in order,
	 * each of them will then edit the data object.
	 * @method
	 * @memberof Popper.Utils
	 * @param {dataObject} data
	 * @param {Array} modifiers
	 * @param {String} ends - Optional modifier name used as stopper
	 * @returns {dataObject}
	 */
	function runModifiers(modifiers, data, ends) {
	  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

	  modifiersToRun.forEach(function (modifier) {
	    if (modifier['function']) {
	      // eslint-disable-line dot-notation
	      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
	    }
	    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
	    if (modifier.enabled && isFunction(fn)) {
	      // Add properties to offsets to make them a complete clientRect object
	      // we do this before each modifier to make sure the previous one doesn't
	      // mess with these values
	      data.offsets.popper = getClientRect(data.offsets.popper);
	      data.offsets.reference = getClientRect(data.offsets.reference);

	      data = fn(data, modifier);
	    }
	  });

	  return data;
	}

	/**
	 * Updates the position of the popper, computing the new offsets and applying
	 * the new style.<br />
	 * Prefer `scheduleUpdate` over `update` because of performance reasons.
	 * @method
	 * @memberof Popper
	 */
	function update() {
	  // if popper is destroyed, don't perform any further update
	  if (this.state.isDestroyed) {
	    return;
	  }

	  var data = {
	    instance: this,
	    styles: {},
	    arrowStyles: {},
	    attributes: {},
	    flipped: false,
	    offsets: {}
	  };

	  // compute reference element offsets
	  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

	  // compute auto placement, store placement inside the data object,
	  // modifiers will be able to edit `placement` if needed
	  // and refer to originalPlacement to know the original value
	  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

	  // store the computed placement inside `originalPlacement`
	  data.originalPlacement = data.placement;

	  data.positionFixed = this.options.positionFixed;

	  // compute the popper offsets
	  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

	  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

	  // run the modifiers
	  data = runModifiers(this.modifiers, data);

	  // the first `update` will call `onCreate` callback
	  // the other ones will call `onUpdate` callback
	  if (!this.state.isCreated) {
	    this.state.isCreated = true;
	    this.options.onCreate(data);
	  } else {
	    this.options.onUpdate(data);
	  }
	}

	/**
	 * Helper used to know if the given modifier is enabled.
	 * @method
	 * @memberof Popper.Utils
	 * @returns {Boolean}
	 */
	function isModifierEnabled(modifiers, modifierName) {
	  return modifiers.some(function (_ref) {
	    var name = _ref.name,
	        enabled = _ref.enabled;
	    return enabled && name === modifierName;
	  });
	}

	/**
	 * Get the prefixed supported property name
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} property (camelCase)
	 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
	 */
	function getSupportedPropertyName(property) {
	  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
	  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

	  for (var i = 0; i < prefixes.length; i++) {
	    var prefix = prefixes[i];
	    var toCheck = prefix ? '' + prefix + upperProp : property;
	    if (typeof document.body.style[toCheck] !== 'undefined') {
	      return toCheck;
	    }
	  }
	  return null;
	}

	/**
	 * Destroys the popper.
	 * @method
	 * @memberof Popper
	 */
	function destroy() {
	  this.state.isDestroyed = true;

	  // touch DOM only if `applyStyle` modifier is enabled
	  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
	    this.popper.removeAttribute('x-placement');
	    this.popper.style.position = '';
	    this.popper.style.top = '';
	    this.popper.style.left = '';
	    this.popper.style.right = '';
	    this.popper.style.bottom = '';
	    this.popper.style.willChange = '';
	    this.popper.style[getSupportedPropertyName('transform')] = '';
	  }

	  this.disableEventListeners();

	  // remove the popper if user explicitly asked for the deletion on destroy
	  // do not use `remove` because IE11 doesn't support it
	  if (this.options.removeOnDestroy) {
	    this.popper.parentNode.removeChild(this.popper);
	  }
	  return this;
	}

	/**
	 * Get the window associated with the element
	 * @argument {Element} element
	 * @returns {Window}
	 */
	function getWindow(element) {
	  var ownerDocument = element.ownerDocument;
	  return ownerDocument ? ownerDocument.defaultView : window;
	}

	function attachToScrollParents(scrollParent, event, callback, scrollParents) {
	  var isBody = scrollParent.nodeName === 'BODY';
	  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
	  target.addEventListener(event, callback, { passive: true });

	  if (!isBody) {
	    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
	  }
	  scrollParents.push(target);
	}

	/**
	 * Setup needed event listeners used to update the popper position
	 * @method
	 * @memberof Popper.Utils
	 * @private
	 */
	function setupEventListeners(reference, options, state, updateBound) {
	  // Resize event listener on window
	  state.updateBound = updateBound;
	  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

	  // Scroll event listener on scroll parents
	  var scrollElement = getScrollParent(reference);
	  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
	  state.scrollElement = scrollElement;
	  state.eventsEnabled = true;

	  return state;
	}

	/**
	 * It will add resize/scroll events and start recalculating
	 * position of the popper element when they are triggered.
	 * @method
	 * @memberof Popper
	 */
	function enableEventListeners() {
	  if (!this.state.eventsEnabled) {
	    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
	  }
	}

	/**
	 * Remove event listeners used to update the popper position
	 * @method
	 * @memberof Popper.Utils
	 * @private
	 */
	function removeEventListeners(reference, state) {
	  // Remove resize event listener on window
	  getWindow(reference).removeEventListener('resize', state.updateBound);

	  // Remove scroll event listener on scroll parents
	  state.scrollParents.forEach(function (target) {
	    target.removeEventListener('scroll', state.updateBound);
	  });

	  // Reset state
	  state.updateBound = null;
	  state.scrollParents = [];
	  state.scrollElement = null;
	  state.eventsEnabled = false;
	  return state;
	}

	/**
	 * It will remove resize/scroll events and won't recalculate popper position
	 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
	 * unless you call `update` method manually.
	 * @method
	 * @memberof Popper
	 */
	function disableEventListeners() {
	  if (this.state.eventsEnabled) {
	    cancelAnimationFrame(this.scheduleUpdate);
	    this.state = removeEventListeners(this.reference, this.state);
	  }
	}

	/**
	 * Tells if a given input is a number
	 * @method
	 * @memberof Popper.Utils
	 * @param {*} input to check
	 * @return {Boolean}
	 */
	function isNumeric(n) {
	  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
	}

	/**
	 * Set the style to the given popper
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element - Element to apply the style to
	 * @argument {Object} styles
	 * Object with a list of properties and values which will be applied to the element
	 */
	function setStyles(element, styles) {
	  Object.keys(styles).forEach(function (prop) {
	    var unit = '';
	    // add unit if the value is numeric and is one of the following
	    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
	      unit = 'px';
	    }
	    element.style[prop] = styles[prop] + unit;
	  });
	}

	/**
	 * Set the attributes to the given popper
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element - Element to apply the attributes to
	 * @argument {Object} styles
	 * Object with a list of properties and values which will be applied to the element
	 */
	function setAttributes(element, attributes) {
	  Object.keys(attributes).forEach(function (prop) {
	    var value = attributes[prop];
	    if (value !== false) {
	      element.setAttribute(prop, attributes[prop]);
	    } else {
	      element.removeAttribute(prop);
	    }
	  });
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} data.styles - List of style properties - values to apply to popper element
	 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The same data object
	 */
	function applyStyle(data) {
	  // any property present in `data.styles` will be applied to the popper,
	  // in this way we can make the 3rd party modifiers add custom styles to it
	  // Be aware, modifiers could override the properties defined in the previous
	  // lines of this modifier!
	  setStyles(data.instance.popper, data.styles);

	  // any property present in `data.attributes` will be applied to the popper,
	  // they will be set as HTML attributes of the element
	  setAttributes(data.instance.popper, data.attributes);

	  // if arrowElement is defined and arrowStyles has some properties
	  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
	    setStyles(data.arrowElement, data.arrowStyles);
	  }

	  return data;
	}

	/**
	 * Set the x-placement attribute before everything else because it could be used
	 * to add margins to the popper margins needs to be calculated to get the
	 * correct popper offsets.
	 * @method
	 * @memberof Popper.modifiers
	 * @param {HTMLElement} reference - The reference element used to position the popper
	 * @param {HTMLElement} popper - The HTML element used as popper
	 * @param {Object} options - Popper.js options
	 */
	function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
	  // compute reference element offsets
	  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

	  // compute auto placement, store placement inside the data object,
	  // modifiers will be able to edit `placement` if needed
	  // and refer to originalPlacement to know the original value
	  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

	  popper.setAttribute('x-placement', placement);

	  // Apply `position` to popper before anything else because
	  // without the position applied we can't guarantee correct computations
	  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

	  return options;
	}

	/**
	 * @function
	 * @memberof Popper.Utils
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
	 * @returns {Object} The popper's position offsets rounded
	 *
	 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
	 * good as it can be within reason.
	 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
	 *
	 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
	 * as well on High DPI screens).
	 *
	 * Firefox prefers no rounding for positioning and does not have blurriness on
	 * high DPI screens.
	 *
	 * Only horizontal placement and left/right values need to be considered.
	 */
	function getRoundedOffsets(data, shouldRound) {
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;
	  var round = Math.round,
	      floor = Math.floor;

	  var noRound = function noRound(v) {
	    return v;
	  };

	  var referenceWidth = round(reference.width);
	  var popperWidth = round(popper.width);

	  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
	  var isVariation = data.placement.indexOf('-') !== -1;
	  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
	  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

	  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
	  var verticalToInteger = !shouldRound ? noRound : round;

	  return {
	    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
	    top: verticalToInteger(popper.top),
	    bottom: verticalToInteger(popper.bottom),
	    right: horizontalToInteger(popper.right)
	  };
	}

	var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function computeStyle(data, options) {
	  var x = options.x,
	      y = options.y;
	  var popper = data.offsets.popper;

	  // Remove this legacy support in Popper.js v2

	  var legacyGpuAccelerationOption = find$1(data.instance.modifiers, function (modifier) {
	    return modifier.name === 'applyStyle';
	  }).gpuAcceleration;
	  if (legacyGpuAccelerationOption !== undefined) {
	    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
	  }
	  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

	  var offsetParent = getOffsetParent(data.instance.popper);
	  var offsetParentRect = getBoundingClientRect(offsetParent);

	  // Styles
	  var styles = {
	    position: popper.position
	  };

	  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

	  var sideA = x === 'bottom' ? 'top' : 'bottom';
	  var sideB = y === 'right' ? 'left' : 'right';

	  // if gpuAcceleration is set to `true` and transform is supported,
	  //  we use `translate3d` to apply the position to the popper we
	  // automatically use the supported prefixed version if needed
	  var prefixedProperty = getSupportedPropertyName('transform');

	  // now, let's make a step back and look at this code closely (wtf?)
	  // If the content of the popper grows once it's been positioned, it
	  // may happen that the popper gets misplaced because of the new content
	  // overflowing its reference element
	  // To avoid this problem, we provide two options (x and y), which allow
	  // the consumer to define the offset origin.
	  // If we position a popper on top of a reference element, we can set
	  // `x` to `top` to make the popper grow towards its top instead of
	  // its bottom.
	  var left = void 0,
	      top = void 0;
	  if (sideA === 'bottom') {
	    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
	    // and not the bottom of the html element
	    if (offsetParent.nodeName === 'HTML') {
	      top = -offsetParent.clientHeight + offsets.bottom;
	    } else {
	      top = -offsetParentRect.height + offsets.bottom;
	    }
	  } else {
	    top = offsets.top;
	  }
	  if (sideB === 'right') {
	    if (offsetParent.nodeName === 'HTML') {
	      left = -offsetParent.clientWidth + offsets.right;
	    } else {
	      left = -offsetParentRect.width + offsets.right;
	    }
	  } else {
	    left = offsets.left;
	  }
	  if (gpuAcceleration && prefixedProperty) {
	    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
	    styles[sideA] = 0;
	    styles[sideB] = 0;
	    styles.willChange = 'transform';
	  } else {
	    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
	    var invertTop = sideA === 'bottom' ? -1 : 1;
	    var invertLeft = sideB === 'right' ? -1 : 1;
	    styles[sideA] = top * invertTop;
	    styles[sideB] = left * invertLeft;
	    styles.willChange = sideA + ', ' + sideB;
	  }

	  // Attributes
	  var attributes = {
	    'x-placement': data.placement
	  };

	  // Update `data` attributes, styles and arrowStyles
	  data.attributes = _extends({}, attributes, data.attributes);
	  data.styles = _extends({}, styles, data.styles);
	  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

	  return data;
	}

	/**
	 * Helper used to know if the given modifier depends from another one.<br />
	 * It checks if the needed modifier is listed and enabled.
	 * @method
	 * @memberof Popper.Utils
	 * @param {Array} modifiers - list of modifiers
	 * @param {String} requestingName - name of requesting modifier
	 * @param {String} requestedName - name of requested modifier
	 * @returns {Boolean}
	 */
	function isModifierRequired(modifiers, requestingName, requestedName) {
	  var requesting = find$1(modifiers, function (_ref) {
	    var name = _ref.name;
	    return name === requestingName;
	  });

	  var isRequired = !!requesting && modifiers.some(function (modifier) {
	    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
	  });

	  if (!isRequired) {
	    var _requesting = '`' + requestingName + '`';
	    var requested = '`' + requestedName + '`';
	    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
	  }
	  return isRequired;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function arrow(data, options) {
	  var _data$offsets$arrow;

	  // arrow depends on keepTogether in order to work
	  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
	    return data;
	  }

	  var arrowElement = options.element;

	  // if arrowElement is a string, suppose it's a CSS selector
	  if (typeof arrowElement === 'string') {
	    arrowElement = data.instance.popper.querySelector(arrowElement);

	    // if arrowElement is not found, don't run the modifier
	    if (!arrowElement) {
	      return data;
	    }
	  } else {
	    // if the arrowElement isn't a query selector we must check that the
	    // provided DOM node is child of its popper node
	    if (!data.instance.popper.contains(arrowElement)) {
	      console.warn('WARNING: `arrow.element` must be child of its popper element!');
	      return data;
	    }
	  }

	  var placement = data.placement.split('-')[0];
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

	  var len = isVertical ? 'height' : 'width';
	  var sideCapitalized = isVertical ? 'Top' : 'Left';
	  var side = sideCapitalized.toLowerCase();
	  var altSide = isVertical ? 'left' : 'top';
	  var opSide = isVertical ? 'bottom' : 'right';
	  var arrowElementSize = getOuterSizes(arrowElement)[len];

	  //
	  // extends keepTogether behavior making sure the popper and its
	  // reference have enough pixels in conjunction
	  //

	  // top/left side
	  if (reference[opSide] - arrowElementSize < popper[side]) {
	    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
	  }
	  // bottom/right side
	  if (reference[side] + arrowElementSize > popper[opSide]) {
	    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
	  }
	  data.offsets.popper = getClientRect(data.offsets.popper);

	  // compute center of the popper
	  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

	  // Compute the sideValue using the updated popper offsets
	  // take popper margin in account because we don't have this info available
	  var css = getStyleComputedProperty(data.instance.popper);
	  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
	  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
	  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

	  // prevent arrowElement from being placed not contiguously to its popper
	  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

	  data.arrowElement = arrowElement;
	  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$1(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$1(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

	  return data;
	}

	/**
	 * Get the opposite placement variation of the given one
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement variation
	 * @returns {String} flipped placement variation
	 */
	function getOppositeVariation(variation) {
	  if (variation === 'end') {
	    return 'start';
	  } else if (variation === 'start') {
	    return 'end';
	  }
	  return variation;
	}

	/**
	 * List of accepted placements to use as values of the `placement` option.<br />
	 * Valid placements are:
	 * - `auto`
	 * - `top`
	 * - `right`
	 * - `bottom`
	 * - `left`
	 *
	 * Each placement can have a variation from this list:
	 * - `-start`
	 * - `-end`
	 *
	 * Variations are interpreted easily if you think of them as the left to right
	 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
	 * is right.<br />
	 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
	 *
	 * Some valid examples are:
	 * - `top-end` (on top of reference, right aligned)
	 * - `right-start` (on right of reference, top aligned)
	 * - `bottom` (on bottom, centered)
	 * - `auto-end` (on the side with more space available, alignment depends by placement)
	 *
	 * @static
	 * @type {Array}
	 * @enum {String}
	 * @readonly
	 * @method placements
	 * @memberof Popper
	 */
	var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

	// Get rid of `auto` `auto-start` and `auto-end`
	var validPlacements = placements.slice(3);

	/**
	 * Given an initial placement, returns all the subsequent placements
	 * clockwise (or counter-clockwise).
	 *
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement - A valid placement (it accepts variations)
	 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
	 * @returns {Array} placements including their variations
	 */
	function clockwise(placement) {
	  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var index = validPlacements.indexOf(placement);
	  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
	  return counter ? arr.reverse() : arr;
	}

	var BEHAVIORS = {
	  FLIP: 'flip',
	  CLOCKWISE: 'clockwise',
	  COUNTERCLOCKWISE: 'counterclockwise'
	};

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function flip(data, options) {
	  // if `inner` modifier is enabled, we can't use the `flip` modifier
	  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
	    return data;
	  }

	  if (data.flipped && data.placement === data.originalPlacement) {
	    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
	    return data;
	  }

	  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

	  var placement = data.placement.split('-')[0];
	  var placementOpposite = getOppositePlacement(placement);
	  var variation = data.placement.split('-')[1] || '';

	  var flipOrder = [];

	  switch (options.behavior) {
	    case BEHAVIORS.FLIP:
	      flipOrder = [placement, placementOpposite];
	      break;
	    case BEHAVIORS.CLOCKWISE:
	      flipOrder = clockwise(placement);
	      break;
	    case BEHAVIORS.COUNTERCLOCKWISE:
	      flipOrder = clockwise(placement, true);
	      break;
	    default:
	      flipOrder = options.behavior;
	  }

	  flipOrder.forEach(function (step, index) {
	    if (placement !== step || flipOrder.length === index + 1) {
	      return data;
	    }

	    placement = data.placement.split('-')[0];
	    placementOpposite = getOppositePlacement(placement);

	    var popperOffsets = data.offsets.popper;
	    var refOffsets = data.offsets.reference;

	    // using floor because the reference offsets may contain decimals we are not going to consider here
	    var floor = Math.floor;
	    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

	    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
	    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
	    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
	    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

	    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

	    // flip the variation if required
	    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

	    // flips variation if reference element overflows boundaries
	    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

	    // flips variation if popper content overflows boundaries
	    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

	    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

	    if (overlapsRef || overflowsBoundaries || flippedVariation) {
	      // this boolean to detect any flip loop
	      data.flipped = true;

	      if (overlapsRef || overflowsBoundaries) {
	        placement = flipOrder[index + 1];
	      }

	      if (flippedVariation) {
	        variation = getOppositeVariation(variation);
	      }

	      data.placement = placement + (variation ? '-' + variation : '');

	      // this object contains `position`, we want to preserve it along with
	      // any additional property we may add in the future
	      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

	      data = runModifiers(data.instance.modifiers, data, 'flip');
	    }
	  });
	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function keepTogether(data) {
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var placement = data.placement.split('-')[0];
	  var floor = Math.floor;
	  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	  var side = isVertical ? 'right' : 'bottom';
	  var opSide = isVertical ? 'left' : 'top';
	  var measurement = isVertical ? 'width' : 'height';

	  if (popper[side] < floor(reference[opSide])) {
	    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
	  }
	  if (popper[opSide] > floor(reference[side])) {
	    data.offsets.popper[opSide] = floor(reference[side]);
	  }

	  return data;
	}

	/**
	 * Converts a string containing value + unit into a px value number
	 * @function
	 * @memberof {modifiers~offset}
	 * @private
	 * @argument {String} str - Value + unit string
	 * @argument {String} measurement - `height` or `width`
	 * @argument {Object} popperOffsets
	 * @argument {Object} referenceOffsets
	 * @returns {Number|String}
	 * Value in pixels, or original string if no values were extracted
	 */
	function toValue(str, measurement, popperOffsets, referenceOffsets) {
	  // separate value from unit
	  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
	  var value = +split[1];
	  var unit = split[2];

	  // If it's not a number it's an operator, I guess
	  if (!value) {
	    return str;
	  }

	  if (unit.indexOf('%') === 0) {
	    var element = void 0;
	    switch (unit) {
	      case '%p':
	        element = popperOffsets;
	        break;
	      case '%':
	      case '%r':
	      default:
	        element = referenceOffsets;
	    }

	    var rect = getClientRect(element);
	    return rect[measurement] / 100 * value;
	  } else if (unit === 'vh' || unit === 'vw') {
	    // if is a vh or vw, we calculate the size based on the viewport
	    var size = void 0;
	    if (unit === 'vh') {
	      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    } else {
	      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	    }
	    return size / 100 * value;
	  } else {
	    // if is an explicit pixel unit, we get rid of the unit and keep the value
	    // if is an implicit unit, it's px, and we return just the value
	    return value;
	  }
	}

	/**
	 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
	 * @function
	 * @memberof {modifiers~offset}
	 * @private
	 * @argument {String} offset
	 * @argument {Object} popperOffsets
	 * @argument {Object} referenceOffsets
	 * @argument {String} basePlacement
	 * @returns {Array} a two cells array with x and y offsets in numbers
	 */
	function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
	  var offsets = [0, 0];

	  // Use height if placement is left or right and index is 0 otherwise use width
	  // in this way the first offset will use an axis and the second one
	  // will use the other one
	  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

	  // Split the offset string to obtain a list of values and operands
	  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
	  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
	    return frag.trim();
	  });

	  // Detect if the offset string contains a pair of values or a single one
	  // they could be separated by comma or space
	  var divider = fragments.indexOf(find$1(fragments, function (frag) {
	    return frag.search(/,|\s/) !== -1;
	  }));

	  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
	    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
	  }

	  // If divider is found, we divide the list of values and operands to divide
	  // them by ofset X and Y.
	  var splitRegex = /\s*,\s*|\s+/;
	  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

	  // Convert the values with units to absolute pixels to allow our computations
	  ops = ops.map(function (op, index) {
	    // Most of the units rely on the orientation of the popper
	    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
	    var mergeWithPrevious = false;
	    return op
	    // This aggregates any `+` or `-` sign that aren't considered operators
	    // e.g.: 10 + +5 => [10, +, +5]
	    .reduce(function (a, b) {
	      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
	        a[a.length - 1] = b;
	        mergeWithPrevious = true;
	        return a;
	      } else if (mergeWithPrevious) {
	        a[a.length - 1] += b;
	        mergeWithPrevious = false;
	        return a;
	      } else {
	        return a.concat(b);
	      }
	    }, [])
	    // Here we convert the string values into number values (in px)
	    .map(function (str) {
	      return toValue(str, measurement, popperOffsets, referenceOffsets);
	    });
	  });

	  // Loop trough the offsets arrays and execute the operations
	  ops.forEach(function (op, index) {
	    op.forEach(function (frag, index2) {
	      if (isNumeric(frag)) {
	        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
	      }
	    });
	  });
	  return offsets;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @argument {Number|String} options.offset=0
	 * The offset value as described in the modifier description
	 * @returns {Object} The data object, properly modified
	 */
	function offset(data, _ref) {
	  var offset = _ref.offset;
	  var placement = data.placement,
	      _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var basePlacement = placement.split('-')[0];

	  var offsets = void 0;
	  if (isNumeric(+offset)) {
	    offsets = [+offset, 0];
	  } else {
	    offsets = parseOffset(offset, popper, reference, basePlacement);
	  }

	  if (basePlacement === 'left') {
	    popper.top += offsets[0];
	    popper.left -= offsets[1];
	  } else if (basePlacement === 'right') {
	    popper.top += offsets[0];
	    popper.left += offsets[1];
	  } else if (basePlacement === 'top') {
	    popper.left += offsets[0];
	    popper.top -= offsets[1];
	  } else if (basePlacement === 'bottom') {
	    popper.left += offsets[0];
	    popper.top += offsets[1];
	  }

	  data.popper = popper;
	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function preventOverflow(data, options) {
	  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

	  // If offsetParent is the reference element, we really want to
	  // go one step up and use the next offsetParent as reference to
	  // avoid to make this modifier completely useless and look like broken
	  if (data.instance.reference === boundariesElement) {
	    boundariesElement = getOffsetParent(boundariesElement);
	  }

	  // NOTE: DOM access here
	  // resets the popper's position so that the document size can be calculated excluding
	  // the size of the popper element itself
	  var transformProp = getSupportedPropertyName('transform');
	  var popperStyles = data.instance.popper.style; // assignment to help minification
	  var top = popperStyles.top,
	      left = popperStyles.left,
	      transform = popperStyles[transformProp];

	  popperStyles.top = '';
	  popperStyles.left = '';
	  popperStyles[transformProp] = '';

	  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

	  // NOTE: DOM access here
	  // restores the original style properties after the offsets have been computed
	  popperStyles.top = top;
	  popperStyles.left = left;
	  popperStyles[transformProp] = transform;

	  options.boundaries = boundaries;

	  var order = options.priority;
	  var popper = data.offsets.popper;

	  var check = {
	    primary: function primary(placement) {
	      var value = popper[placement];
	      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
	        value = Math.max(popper[placement], boundaries[placement]);
	      }
	      return defineProperty$1({}, placement, value);
	    },
	    secondary: function secondary(placement) {
	      var mainSide = placement === 'right' ? 'left' : 'top';
	      var value = popper[mainSide];
	      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
	        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
	      }
	      return defineProperty$1({}, mainSide, value);
	    }
	  };

	  order.forEach(function (placement) {
	    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
	    popper = _extends({}, popper, check[side](placement));
	  });

	  data.offsets.popper = popper;

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function shift(data) {
	  var placement = data.placement;
	  var basePlacement = placement.split('-')[0];
	  var shiftvariation = placement.split('-')[1];

	  // if shift shiftvariation is specified, run the modifier
	  if (shiftvariation) {
	    var _data$offsets = data.offsets,
	        reference = _data$offsets.reference,
	        popper = _data$offsets.popper;

	    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
	    var side = isVertical ? 'left' : 'top';
	    var measurement = isVertical ? 'width' : 'height';

	    var shiftOffsets = {
	      start: defineProperty$1({}, side, reference[side]),
	      end: defineProperty$1({}, side, reference[side] + reference[measurement] - popper[measurement])
	    };

	    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
	  }

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function hide(data) {
	  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
	    return data;
	  }

	  var refRect = data.offsets.reference;
	  var bound = find$1(data.instance.modifiers, function (modifier) {
	    return modifier.name === 'preventOverflow';
	  }).boundaries;

	  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
	    // Avoid unnecessary DOM access if visibility hasn't changed
	    if (data.hide === true) {
	      return data;
	    }

	    data.hide = true;
	    data.attributes['x-out-of-boundaries'] = '';
	  } else {
	    // Avoid unnecessary DOM access if visibility hasn't changed
	    if (data.hide === false) {
	      return data;
	    }

	    data.hide = false;
	    data.attributes['x-out-of-boundaries'] = false;
	  }

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function inner(data) {
	  var placement = data.placement;
	  var basePlacement = placement.split('-')[0];
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

	  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

	  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

	  data.placement = getOppositePlacement(placement);
	  data.offsets.popper = getClientRect(popper);

	  return data;
	}

	/**
	 * Modifier function, each modifier can have a function of this type assigned
	 * to its `fn` property.<br />
	 * These functions will be called on each update, this means that you must
	 * make sure they are performant enough to avoid performance bottlenecks.
	 *
	 * @function ModifierFn
	 * @argument {dataObject} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {dataObject} The data object, properly modified
	 */

	/**
	 * Modifiers are plugins used to alter the behavior of your poppers.<br />
	 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
	 * needed by the library.
	 *
	 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
	 * All the other properties are configurations that could be tweaked.
	 * @namespace modifiers
	 */
	var modifiers = {
	  /**
	   * Modifier used to shift the popper on the start or end of its reference
	   * element.<br />
	   * It will read the variation of the `placement` property.<br />
	   * It can be one either `-end` or `-start`.
	   * @memberof modifiers
	   * @inner
	   */
	  shift: {
	    /** @prop {number} order=100 - Index used to define the order of execution */
	    order: 100,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: shift
	  },

	  /**
	   * The `offset` modifier can shift your popper on both its axis.
	   *
	   * It accepts the following units:
	   * - `px` or unit-less, interpreted as pixels
	   * - `%` or `%r`, percentage relative to the length of the reference element
	   * - `%p`, percentage relative to the length of the popper element
	   * - `vw`, CSS viewport width unit
	   * - `vh`, CSS viewport height unit
	   *
	   * For length is intended the main axis relative to the placement of the popper.<br />
	   * This means that if the placement is `top` or `bottom`, the length will be the
	   * `width`. In case of `left` or `right`, it will be the `height`.
	   *
	   * You can provide a single value (as `Number` or `String`), or a pair of values
	   * as `String` divided by a comma or one (or more) white spaces.<br />
	   * The latter is a deprecated method because it leads to confusion and will be
	   * removed in v2.<br />
	   * Additionally, it accepts additions and subtractions between different units.
	   * Note that multiplications and divisions aren't supported.
	   *
	   * Valid examples are:
	   * ```
	   * 10
	   * '10%'
	   * '10, 10'
	   * '10%, 10'
	   * '10 + 10%'
	   * '10 - 5vh + 3%'
	   * '-10px + 5vh, 5px - 6%'
	   * ```
	   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
	   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
	   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  offset: {
	    /** @prop {number} order=200 - Index used to define the order of execution */
	    order: 200,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: offset,
	    /** @prop {Number|String} offset=0
	     * The offset value as described in the modifier description
	     */
	    offset: 0
	  },

	  /**
	   * Modifier used to prevent the popper from being positioned outside the boundary.
	   *
	   * A scenario exists where the reference itself is not within the boundaries.<br />
	   * We can say it has "escaped the boundaries" — or just "escaped".<br />
	   * In this case we need to decide whether the popper should either:
	   *
	   * - detach from the reference and remain "trapped" in the boundaries, or
	   * - if it should ignore the boundary and "escape with its reference"
	   *
	   * When `escapeWithReference` is set to`true` and reference is completely
	   * outside its boundaries, the popper will overflow (or completely leave)
	   * the boundaries in order to remain attached to the edge of the reference.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  preventOverflow: {
	    /** @prop {number} order=300 - Index used to define the order of execution */
	    order: 300,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: preventOverflow,
	    /**
	     * @prop {Array} [priority=['left','right','top','bottom']]
	     * Popper will try to prevent overflow following these priorities by default,
	     * then, it could overflow on the left and on top of the `boundariesElement`
	     */
	    priority: ['left', 'right', 'top', 'bottom'],
	    /**
	     * @prop {number} padding=5
	     * Amount of pixel used to define a minimum distance between the boundaries
	     * and the popper. This makes sure the popper always has a little padding
	     * between the edges of its container
	     */
	    padding: 5,
	    /**
	     * @prop {String|HTMLElement} boundariesElement='scrollParent'
	     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
	     * `viewport` or any DOM element.
	     */
	    boundariesElement: 'scrollParent'
	  },

	  /**
	   * Modifier used to make sure the reference and its popper stay near each other
	   * without leaving any gap between the two. Especially useful when the arrow is
	   * enabled and you want to ensure that it points to its reference element.
	   * It cares only about the first axis. You can still have poppers with margin
	   * between the popper and its reference element.
	   * @memberof modifiers
	   * @inner
	   */
	  keepTogether: {
	    /** @prop {number} order=400 - Index used to define the order of execution */
	    order: 400,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: keepTogether
	  },

	  /**
	   * This modifier is used to move the `arrowElement` of the popper to make
	   * sure it is positioned between the reference element and its popper element.
	   * It will read the outer size of the `arrowElement` node to detect how many
	   * pixels of conjunction are needed.
	   *
	   * It has no effect if no `arrowElement` is provided.
	   * @memberof modifiers
	   * @inner
	   */
	  arrow: {
	    /** @prop {number} order=500 - Index used to define the order of execution */
	    order: 500,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: arrow,
	    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
	    element: '[x-arrow]'
	  },

	  /**
	   * Modifier used to flip the popper's placement when it starts to overlap its
	   * reference element.
	   *
	   * Requires the `preventOverflow` modifier before it in order to work.
	   *
	   * **NOTE:** this modifier will interrupt the current update cycle and will
	   * restart it if it detects the need to flip the placement.
	   * @memberof modifiers
	   * @inner
	   */
	  flip: {
	    /** @prop {number} order=600 - Index used to define the order of execution */
	    order: 600,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: flip,
	    /**
	     * @prop {String|Array} behavior='flip'
	     * The behavior used to change the popper's placement. It can be one of
	     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
	     * placements (with optional variations)
	     */
	    behavior: 'flip',
	    /**
	     * @prop {number} padding=5
	     * The popper will flip if it hits the edges of the `boundariesElement`
	     */
	    padding: 5,
	    /**
	     * @prop {String|HTMLElement} boundariesElement='viewport'
	     * The element which will define the boundaries of the popper position.
	     * The popper will never be placed outside of the defined boundaries
	     * (except if `keepTogether` is enabled)
	     */
	    boundariesElement: 'viewport',
	    /**
	     * @prop {Boolean} flipVariations=false
	     * The popper will switch placement variation between `-start` and `-end` when
	     * the reference element overlaps its boundaries.
	     *
	     * The original placement should have a set variation.
	     */
	    flipVariations: false,
	    /**
	     * @prop {Boolean} flipVariationsByContent=false
	     * The popper will switch placement variation between `-start` and `-end` when
	     * the popper element overlaps its reference boundaries.
	     *
	     * The original placement should have a set variation.
	     */
	    flipVariationsByContent: false
	  },

	  /**
	   * Modifier used to make the popper flow toward the inner of the reference element.
	   * By default, when this modifier is disabled, the popper will be placed outside
	   * the reference element.
	   * @memberof modifiers
	   * @inner
	   */
	  inner: {
	    /** @prop {number} order=700 - Index used to define the order of execution */
	    order: 700,
	    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
	    enabled: false,
	    /** @prop {ModifierFn} */
	    fn: inner
	  },

	  /**
	   * Modifier used to hide the popper when its reference element is outside of the
	   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
	   * be used to hide with a CSS selector the popper when its reference is
	   * out of boundaries.
	   *
	   * Requires the `preventOverflow` modifier before it in order to work.
	   * @memberof modifiers
	   * @inner
	   */
	  hide: {
	    /** @prop {number} order=800 - Index used to define the order of execution */
	    order: 800,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: hide
	  },

	  /**
	   * Computes the style that will be applied to the popper element to gets
	   * properly positioned.
	   *
	   * Note that this modifier will not touch the DOM, it just prepares the styles
	   * so that `applyStyle` modifier can apply it. This separation is useful
	   * in case you need to replace `applyStyle` with a custom implementation.
	   *
	   * This modifier has `850` as `order` value to maintain backward compatibility
	   * with previous versions of Popper.js. Expect the modifiers ordering method
	   * to change in future major versions of the library.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  computeStyle: {
	    /** @prop {number} order=850 - Index used to define the order of execution */
	    order: 850,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: computeStyle,
	    /**
	     * @prop {Boolean} gpuAcceleration=true
	     * If true, it uses the CSS 3D transformation to position the popper.
	     * Otherwise, it will use the `top` and `left` properties
	     */
	    gpuAcceleration: true,
	    /**
	     * @prop {string} [x='bottom']
	     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
	     * Change this if your popper should grow in a direction different from `bottom`
	     */
	    x: 'bottom',
	    /**
	     * @prop {string} [x='left']
	     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
	     * Change this if your popper should grow in a direction different from `right`
	     */
	    y: 'right'
	  },

	  /**
	   * Applies the computed styles to the popper element.
	   *
	   * All the DOM manipulations are limited to this modifier. This is useful in case
	   * you want to integrate Popper.js inside a framework or view library and you
	   * want to delegate all the DOM manipulations to it.
	   *
	   * Note that if you disable this modifier, you must make sure the popper element
	   * has its position set to `absolute` before Popper.js can do its work!
	   *
	   * Just disable this modifier and define your own to achieve the desired effect.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  applyStyle: {
	    /** @prop {number} order=900 - Index used to define the order of execution */
	    order: 900,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: applyStyle,
	    /** @prop {Function} */
	    onLoad: applyStyleOnLoad,
	    /**
	     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
	     * @prop {Boolean} gpuAcceleration=true
	     * If true, it uses the CSS 3D transformation to position the popper.
	     * Otherwise, it will use the `top` and `left` properties
	     */
	    gpuAcceleration: undefined
	  }
	};

	/**
	 * The `dataObject` is an object containing all the information used by Popper.js.
	 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
	 * @name dataObject
	 * @property {Object} data.instance The Popper.js instance
	 * @property {String} data.placement Placement applied to popper
	 * @property {String} data.originalPlacement Placement originally defined on init
	 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
	 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
	 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
	 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
	 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
	 * @property {Object} data.boundaries Offsets of the popper boundaries
	 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
	 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
	 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
	 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
	 */

	/**
	 * Default options provided to Popper.js constructor.<br />
	 * These can be overridden using the `options` argument of Popper.js.<br />
	 * To override an option, simply pass an object with the same
	 * structure of the `options` object, as the 3rd argument. For example:
	 * ```
	 * new Popper(ref, pop, {
	 *   modifiers: {
	 *     preventOverflow: { enabled: false }
	 *   }
	 * })
	 * ```
	 * @type {Object}
	 * @static
	 * @memberof Popper
	 */
	var Defaults = {
	  /**
	   * Popper's placement.
	   * @prop {Popper.placements} placement='bottom'
	   */
	  placement: 'bottom',

	  /**
	   * Set this to true if you want popper to position it self in 'fixed' mode
	   * @prop {Boolean} positionFixed=false
	   */
	  positionFixed: false,

	  /**
	   * Whether events (resize, scroll) are initially enabled.
	   * @prop {Boolean} eventsEnabled=true
	   */
	  eventsEnabled: true,

	  /**
	   * Set to true if you want to automatically remove the popper when
	   * you call the `destroy` method.
	   * @prop {Boolean} removeOnDestroy=false
	   */
	  removeOnDestroy: false,

	  /**
	   * Callback called when the popper is created.<br />
	   * By default, it is set to no-op.<br />
	   * Access Popper.js instance with `data.instance`.
	   * @prop {onCreate}
	   */
	  onCreate: function onCreate() {},

	  /**
	   * Callback called when the popper is updated. This callback is not called
	   * on the initialization/creation of the popper, but only on subsequent
	   * updates.<br />
	   * By default, it is set to no-op.<br />
	   * Access Popper.js instance with `data.instance`.
	   * @prop {onUpdate}
	   */
	  onUpdate: function onUpdate() {},

	  /**
	   * List of modifiers used to modify the offsets before they are applied to the popper.
	   * They provide most of the functionalities of Popper.js.
	   * @prop {modifiers}
	   */
	  modifiers: modifiers
	};

	/**
	 * @callback onCreate
	 * @param {dataObject} data
	 */

	/**
	 * @callback onUpdate
	 * @param {dataObject} data
	 */

	// Utils
	// Methods
	var Popper = function () {
	  /**
	   * Creates a new Popper.js instance.
	   * @class Popper
	   * @param {Element|referenceObject} reference - The reference element used to position the popper
	   * @param {Element} popper - The HTML / XML element used as the popper
	   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
	   * @return {Object} instance - The generated Popper.js instance
	   */
	  function Popper(reference, popper) {
	    var _this = this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    classCallCheck(this, Popper);

	    this.scheduleUpdate = function () {
	      return requestAnimationFrame(_this.update);
	    };

	    // make update() debounced, so that it only runs at most once-per-tick
	    this.update = debounce(this.update.bind(this));

	    // with {} we create a new object with the options inside it
	    this.options = _extends({}, Popper.Defaults, options);

	    // init state
	    this.state = {
	      isDestroyed: false,
	      isCreated: false,
	      scrollParents: []
	    };

	    // get reference and popper elements (allow jQuery wrappers)
	    this.reference = reference && reference.jquery ? reference[0] : reference;
	    this.popper = popper && popper.jquery ? popper[0] : popper;

	    // Deep merge modifiers options
	    this.options.modifiers = {};
	    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
	      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
	    });

	    // Refactoring modifiers' list (Object => Array)
	    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
	      return _extends({
	        name: name
	      }, _this.options.modifiers[name]);
	    })
	    // sort the modifiers by order
	    .sort(function (a, b) {
	      return a.order - b.order;
	    });

	    // modifiers have the ability to execute arbitrary code when Popper.js get inited
	    // such code is executed in the same order of its modifier
	    // they could add new properties to their options configuration
	    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
	    this.modifiers.forEach(function (modifierOptions) {
	      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
	        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
	      }
	    });

	    // fire the first update to position the popper in the right place
	    this.update();

	    var eventsEnabled = this.options.eventsEnabled;
	    if (eventsEnabled) {
	      // setup event listeners, they will take care of update the position in specific situations
	      this.enableEventListeners();
	    }

	    this.state.eventsEnabled = eventsEnabled;
	  }

	  // We can't use class properties because they don't get listed in the
	  // class prototype and break stuff like Sinon stubs


	  createClass(Popper, [{
	    key: 'update',
	    value: function update$$1() {
	      return update.call(this);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy$$1() {
	      return destroy.call(this);
	    }
	  }, {
	    key: 'enableEventListeners',
	    value: function enableEventListeners$$1() {
	      return enableEventListeners.call(this);
	    }
	  }, {
	    key: 'disableEventListeners',
	    value: function disableEventListeners$$1() {
	      return disableEventListeners.call(this);
	    }

	    /**
	     * Schedules an update. It will run on the next UI update available.
	     * @method scheduleUpdate
	     * @memberof Popper
	     */


	    /**
	     * Collection of utilities useful when writing custom modifiers.
	     * Starting from version 1.7, this method is available only if you
	     * include `popper-utils.js` before `popper.js`.
	     *
	     * **DEPRECATION**: This way to access PopperUtils is deprecated
	     * and will be removed in v2! Use the PopperUtils module directly instead.
	     * Due to the high instability of the methods contained in Utils, we can't
	     * guarantee them to follow semver. Use them at your own risk!
	     * @static
	     * @private
	     * @type {Object}
	     * @deprecated since version 1.8
	     * @member Utils
	     * @memberof Popper
	     */

	  }]);
	  return Popper;
	}();

	/**
	 * The `referenceObject` is an object that provides an interface compatible with Popper.js
	 * and lets you use it as replacement of a real DOM node.<br />
	 * You can use this method to position a popper relatively to a set of coordinates
	 * in case you don't have a DOM node to use as reference.
	 *
	 * ```
	 * new Popper(referenceObject, popperNode);
	 * ```
	 *
	 * NB: This feature isn't supported in Internet Explorer 10.
	 * @name referenceObject
	 * @property {Function} data.getBoundingClientRect
	 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
	 * @property {number} data.clientWidth
	 * An ES6 getter that will return the width of the virtual reference element.
	 * @property {number} data.clientHeight
	 * An ES6 getter that will return the height of the virtual reference element.
	 */


	Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
	Popper.placements = placements;
	Popper.Defaults = Defaults;

	const compute = (startTime, elapsedTime) => (+new Date() - startTime) + elapsedTime;

	var minimalTimer = (startTime = 0, elapsedTime = 0, running = false) => ({
	  start (customDate = new Date()) {
	    running = true; 
	    elapsedTime = 0;
	    startTime = +customDate;
	  },
	  stop () {
	    if(running === false) return elapsedTime
	    running = false;
	    return elapsedTime = compute(startTime, elapsedTime)
	  },
	  elapsedTime: () => running ? compute(startTime, elapsedTime) : elapsedTime,

	  isRunning: () => running,

	  resume(){
	    if(this.isRunning()) return
	    running = true;
	    startTime = +new Date();
	  }
	});

	// Passed to MediaRecorder.start as `timeslice` variable.
	// Smaller chunksize is nice since, in case of errors, it has almost always stored something.
	// No losing 15mins of recording for one error.
	const CHUNKSIZE = 500;
	// How long is too long for worker? Let's say 10min.
	const LONG_DURATION = 10 * 60 * 1000;

	/** 
	 * All in all, the mozCaptureStream is (still) very buggy.
	 *
	 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=966247 
	 * TL;DR: playbackRate is set to 1,and changing it will not work once recording.
	 *
	 * https://w3c.github.io/mediacapture-fromelement/#dom-htmlmediaelement-capturestream
	 * "Muting the audio on a media element does not cause the capture to produce
	 * silence, nor does hiding a media element cause captured video to stop.
	 * Similarly, the audio level or volume of the media element does not affect
	 * the volume of captured audio."
	 *
	 *
	 * Audio gets muted:
	 * [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1178751
	 *
	 * MediaRecorder:
	 * Errors on seeking. Always.
	 * Stops recording on end, if looping. Should not do that, according to spec.
	 * Some of these could be problems from captureStream, too.
	 *
	 */

	/*
	 * Workflow: record -> pauses &plays -> stop -> "preparing" -> "processing" -> final
	 */
	class LiveRecorder extends HyperHTMLElement {

		static get observedAttributes() {
			return ['target']
		}

		/**
		 * Used for unmuting audio.
		 * https://bugzilla.mozilla.org/show_bug.cgi?id=1178751
		 * ^No movement in years.
		 */
		static get audioContext() {
			if (window.liveRecorder == null) {
				//log('liveRecorder nulled??????')
				window.liveRecorder = {};
			}

			if (window.liveRecorder.context == null) {
				window.liveRecorder.context = new AudioContext;
			}

			return window.liveRecorder.context
		}

		created(){
			//log('hello?')
			this.targetElement = document.querySelector(`[data-liverecorder="${this.target}"]`); 
			//log(this.targetElement, this.state, this.setState, this.data)
			if (this.targetElement != null) {
				this._shadowRoot = this.attachShadow({mode: 'closed'});
				this.popper = new Popper(this.targetElement, this, {
					placement: 'bottom'
				});

				// this.data doesn't affect render.
				this.data = [];
				this.audioIsConnected = false;
				// Things don't need 'new' "now"?
				this.timer = minimalTimer();

				let title = this.targetElement.src.split('/');
				title = title[title.length-1];
				if (title === '') {
					title=document.title.slice(0, 10) || "live-recorder";
				}
				this.fileTitle = title;

				// MediaRecorder doesn't do well with a lot of things; even this seems to be of no help.
				// It'll just stop recording. Hopefully some day some day things will look up. (^-^)
				// for ( let ev of [ 'ended', 'stalled', 'seeking', 'waiting', 'emptied' ] ) {
				//  // Note: handlePause argument removed since making this.
				// 	this.targetElement.addEventListener(ev, () => this.handlePause(true))
				// }

				this.render();
			}
		}

		render() {
			const {recorder, error} = this.state;
			const recording = recorder.state !== 'inactive';
			const paused = recorder.state === 'paused';
			const errored = error === '' ? 'live-recorder-none' : '';
			const realError = !error.startsWith('Whoops');
			// Using handleX style because things bug out otherwise. Maybe something to do with the polyfill.
			return this.html`
			<style>
				:host(.live-recorder-none) {
					display: none !important;
				}
				:host {
					z-index: 2147483647;
					display: block;
				}
				.live-recorder {
					all: initial;
					display: block;
					font-family: "Twemoji Mozilla";
					max-width: -moz-min-content;
					max-width: min-content;
				}
				.live-recorder-hidden {
					visibility: hidden;
				}
				.live-recorder button, .live-recorder a:not(.text-link) {
					font-family: inherit;
					-moz-appearance: button;
					appearance: button;
					background-color: white;
					border: none;
					border-radius: 5px;
					padding: 0.2em 0.7em;
					margin: 5px;
					text-align: center;
					text-decoration: none;
					cursor: pointer;
					font-family: inherit;
					font-size: 100%;
					line-height: 1;
					-moz-user-select: none;
					user-select: none;
				}
				.live-recorder-close {
					margin-left: auto;
				}
				.live-recorder-none {
					display: none !important;
				}
				.live-recorder-inner {
					display: flex;
					justify-content: space-between;
					align-items: baseline;
					background: #5f5f5f;
				}
				.live-recorder-disabled {
					cursor: wait !important;
					backgound-color: #ccc !important;
				}
				.color-white {
					color: white;
				}
				.color-white a {
					color: #d4e7ff;
				}
			</style>
			<div class="live-recorder">
				<div class="live-recorder-inner">
					<button onclick=${this.handleStartStop}
						title=${!recording ? 'Record' : 'Stop'}
						type="button"
						>
						${ !recording ? '⏺️' : '⏹️' }
					</button>

					<button onclick=${this.handlePause}
						type="button"
						title=${paused ? 'Continue recording' : 'Pause recording' }
						class=${!recording ? 'live-recorder-hidden' : ''}
						>
						${paused ? '▶️' : '⏸️'}
					</button>

					<button type="button" title="Close" onclick=${this.handleClose}>
						❎
					</button>

				</div>

				<div class=${[errored, 'live-recorder-inner'].join(' ')}>
					<span class="color-white">
						${error} <a class=${"text-link" + (realError ? '' : ' live-recorder-none') } href=${this.targetElement.src} target="_blank">Open in new tab</a>
					</span>
				</div>
			</div>
		`
		}

		get defaultState() {
			return ({
				error: '',
				recorder: { 
					state: 'inactive'
				}
			})
		}

		async handleClose() {
			this.classList.add('live-recorder-none');
			this.stop();
			this.data=[];
		}

		async handleStatus() {
			//log(this.handleStatus, this.state)
			if (this.state.error !== ''){
				//log('removing.')
				this.setState({
					error: ''
				});
			}
		}

		/**
		 * TODO: fix bug:
		 * Start rec + pause spam made start rec button stuck.
		 */
		async handlePause() {
			//log('pausing!')

			try {
				// Pause and resume are glitched and don't emit events.
				switch (this.state.recorder.state) {
					case 'recording':
						this.state.recorder.pause();
						this.timer.stop();
						break

					case 'paused':
						this.targetElement.play();
						this.state.recorder.resume();
						this.timer.resume();
						break

					default:
						//log('handlepause switch defaulted. state:', this.state)
				}
			} catch(e) {
				console.error('Live Recoder: something reasonably horrible happened in handlePause:',e);
			}
			this.render();
		}

		async handleStartStop(){
			if (this.data.length > 0) {
				this.save();
			}
			// log('startstop')
			// log(this, this.targetElement, this.data, this.state)
			//log("HELLO?")
			//log('this',this.state)
			if (this.state == null)
				this.setState( this.defaultState );
			//log(this.state)
			this.handleStatus();
			log(this.state, this.state.recorder.state);
			if (this.state.recorder.state  === 'inactive') {
				// log('start')
				// Call stop first. No harm in doing so.
				await this.stop();
				await this.start();
				// log('started', this.state)
			} else {
				//log('stop')
				await this.stop();
				//log('stopped', this.state)
			}
		}

		async start() {
			// log('in start')
			// Capturing mutes audio (Firefox bug).
			const capture = HTMLMediaElement.prototype.captureStream 
							|| HTMLMediaElement.prototype.mozCaptureStream;
			const stream = capture.call(this.targetElement);
			// "Unmute".
			// Only need to do this once.
			if (!this.audioIsConnected) {
				// Try-catch because media without audio will mess up otherwise.
				try {
					const context = LiveRecorder.audioContext;
					const source = context.createMediaStreamSource(stream);
					source.connect(context.destination);
					this.audioIsConnected = true;
				} catch(e) {
					// nothing
				}
			}

			// Apparently recorder types on android = no-go?
			// https://github.com/streamproc/MediaStreamRecorder/blob/master/MediaStreamRecorder.js#L1118
			// Testing & hoping for feedback.
			// MediaRecorder actually converts filetypes with the mimetype argument.
			// Surprising, even after reading the docs...
			const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
			const data = [];
			recorder.ondataavailable = e => { data.push(e.data); };

			// These don't work.
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1363915
			// Update: they work now. v.65+. What was I supposed to do with em?
			recorder.onpause = log;
			recorder.onresume = log;

			/**
			 * Considering 'recorder' is instance specific,
			 * it's okay to use .onstop type listeners.
			 * One usually wants to avoid them in extensions
			 * as they steal potential existing listeners
			 * by the website.
			 */
			const stopped = new Promise((res, rej) => {
				recorder.onstop = () => res(this.timer.stop());
				recorder.onerror = async () => {
					this.stop().then(() => {
						rej({ name:'Unknown error', message: 'unlucky.' });
					});
				};
			});

			// Possible error message gets overwritten by an error with recorder?
			// Like: play() errors, now trying to recorder.start() regardless,
			//  -> error2 from recorder -> overwrite error 1.
			await this.targetElement.play().catch(e => this.error(e));

			const started = new Promise(res => {
				// Will throw (reject) if start fails.
				recorder.onstart = () => res(this.timer.start());
				recorder.start(CHUNKSIZE);
			});

			this.data = data;

			// Triggers render.
			started.then(() => this.setState({ recorder }))
				.then(() => stopped)
				.catch(error => this.error(error));
				// .then(() => this.revokeExistingURL())
				// .catch(error => this.error(error))
			log('start finished. state:', this.state);
		}

		async error(e) {
			//log('error', e, e.name, e.message)
			let error;
			if (e.name === 'SecurityError') {
				error = 'Security error: open the video in its own tab.';
			} else if (e.name && e.message) {
				//log( 'hello??', this.state, this.data )
				error = '' + e.name + ': ' + e.message;
			} else {
				error = 'Undefined error. Stopped.';
			}
			this.stop();

			//log( this.state )

			this.setState({
				error
			});
		}

		async stop() {
			//log('in stop', this.state)
			if (this.state.recorder && this.state.recorder.state !== 'inactive') { 
				this.timer.stop();
				this.state.recorder.stop();
				this.save();
				this.data = [];
				this.render();
			}
		}

		/**
		 * Wire up the save button.
		 */
		async save() {
			if (this.data.length === 0) {
				return
			}
			//log('preocessing')
			const buggyBlob = new Blob(this.data, { type: 'video/webm' });
			const time = this.timer.elapsedTime();
			let blob = buggyBlob;
			// Send to worker, unless duration is long, which causes worker to work forever.
			if (time < LONG_DURATION) {
				blob = await workIt(buggyBlob, time);
			} else {
				this.error({ message: 'File is too big to process duration metadata.', name: 'Whoops'});
			}
			// Creating the url in the worker results in CSP fiesta.
			// "Cannot load from moz-exte...."
			const downloadURL = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.download = this.fileTitle;
			a.href = downloadURL;
			a.click();
			URL.revokeObjectURL(downloadURL);
			this.data = [];
		}
	}

	try{
		LiveRecorder.define('live-recorder');
	} catch(e) { /* nop */ }

	// eslint-disable-next-line
	function log(...args) {
		// console.log('liverecorder', ...args)
	}

	/**
	 * Messaging between worker to create a good blob.
	 * Good = duration fixed.
	 * Before changing this, consider that there are a lot of CSP issues.
	 */
	function workIt(buggyBlob, duration){
		// log('duration', duration)
		return new Promise((resolve) => {
			window.liveRecorder.worker.onmessage = e => {
				resolve(e.data);
			};
			window.liveRecorder.worker.postMessage({buggyBlob, duration});
		})
	}

	(function() {
		const elements = Array.prototype.filter.call(document.querySelectorAll('video, audio, canvas'), filterPaused);

		if (elements.length === 0) {
			alert('Unpaused media elements not found!\nStart playback, then try again.');
			return
		}

		if (window.liveRecorder != null && window.liveRecorder.injected === true) {
			Array.prototype.forEach.call(elements, addRecorder);
			return
		}

		if (window.liveRecorder == null) {
			window.liveRecorder = {};
			window.liveRecorder.uniqueID = 1;
			window.liveRecorder.injected = true;
			window.liveRecorder.worker = new Worker(browser.extension.getURL('') + 'live-recorder-worker-bundle.js');
		}

		Array.prototype.forEach.call(elements, addRecorder);

		function addRecorder(mediaElement) {
			const target = mediaElement.dataset.liverecorder;
			if (target != null) {
				showLiveRecorder(target);
			} else {
				createRecorder(mediaElement);
			}
		}

		function filterPaused(el) {
			return !el.paused
		}

		function showLiveRecorder(target) {
			const liverecorder = document.querySelector(`live-recorder[target="${target}"]`);
			liverecorder.classList.remove('live-recorder-none');
		}
		function createRecorder(mediaElement) {
			let rec = new LiveRecorder;
			mediaElement.dataset.liverecorder = window.liveRecorder.uniqueID;
			rec.setAttribute('target', window.liveRecorder.uniqueID++);
			document.body.appendChild(rec);
		}

	})();

})));
//# sourceMappingURL=bundle.js.map
