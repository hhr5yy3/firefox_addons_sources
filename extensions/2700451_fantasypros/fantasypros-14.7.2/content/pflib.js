var pickemfirst_lib = (function() {
  var $ = {};
  var DEV = false;
  var rwebkit = /(webkit)[ \/]([\w.]+)/, 
      ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/, 
      rmsie = /(msie) ([\w.]+)/, 
      rtrident = /(trident)(?:.*rv:([\w.]+))?/, 
      rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
      rmobile = /(iphone|ipad|ipod|android)/,
      rchrome = /(chrome)/,
      userAgent = navigator.userAgent,
      builder,
      scrollInterval,
      version = '4.0.MPB';
  var JXTAG = function(doc) {
    this.doc = doc || document;
    this.attributes = {};
    this.className = '';
    this.childNodes = [];
    // attributes to transfer to the root node
    this.transferAttributes = ['class', 'id', 'data-pf-id'];
    
  };
  JXTAG.registeredTags = {};
  JXTAG.addTag = function(tagname, params) {
    JXTAG.registeredTags[tagname] = params._contructor || function(){JXTAG.apply(this, arguments)};
    JXTAG.registeredTags[tagname].prototype = new JXTAG;
    if (params.prototype) {
      for (var iii in params.prototype) {
        JXTAG.registeredTags[tagname].prototype[iii] = params.prototype[iii];  
      }
    }
  };
  JXTAG.make = function(tagname) {
    var constructor = JXTAG.registeredTags[tagname];
    if (constructor) {
      return new constructor();
    }
    return null;
  }

  JXTAG.prototype = {
    setAttribute: function(name, value) {
      this.attributes[name] = value;
    },
    getAttribute: function(name) {
      return this.attributes[name];
    },
    appendChild: function(nd) {
      this.childNodes.push(nd);
    },
    render: function() {
      var node = this.compose();
      var attributes = {};
      $.each(this.transferAttributes, $.bind(this, function(attr){
        var value = this.attributes[attr];
        if (value !== undefined) { 
          attributes[attr] = value;
        }
      }));
      if (this.className) {
        attributes['class'] = 
          (attributes['class'] || '') + ' ' + this.className;
      }
      $.buildAttributes(this.doc, node, attributes);
      return node;
    },
    // to implement in derived classes
    compose: function() {
      return this.doc.createDocumentFragment();
    }
  };
  
  JXTAG.addTag('jx:frag',{
    prototype: {
      compose: function() {
        var frag = this.doc.createDocumentFragment();
        $.each(this.childNodes, function(child){
          frag.appendChild(child);
        });
        return frag;
      }
    }
  })
  
  
  var watchers = {},
      data_count = 0,
      nodes_data = {};
  
  var makeDraggableBase = function(params) {
    var root = params.root;
    var selector = params.selector;
    var onstart = params.onstart || $.noop;
    var onstop = params.onstop || $.noop;
    var onupdate = params.onupdate || $.noop;
    var doc = params.doc;
    var distance = params.distance;

    var current_element;
    var start = {};
    var mousestart = {};
    var view = doc.documentElement;
    var dragging = false;

    var onmouseup = function(event) {
      $.removeListener(view, 'mouseup', onmouseup);
      $.removeListener(view, 'mousemove', onmousemove);
      $.removeListener(doc.body, 'click', onclick, true);
      $.removeListener(doc, 'selectstart', onselect);
      if (dragging) {
        $.kill(event);
        dragging = false;
        onstop(event, current_element);
        $.remove($.find(current_element, 'img.gb_noclick')[0]);
      }
      current_element = null;
    };

    var onclick = function(event) {
      if (dragging)
        $.kill(event);
    };

    var onmousedown = function(event, dragged_root) {
      var exit = false;
      $.parent($.target(event), function(elem) {
        if ($.hasClass(elem,'nodrag')) {
          exit = true;
          return true;
        }
        if ($.hasClass(elem, 'draggable')) {
          exit = elem !== dragged_root;
          return true;
        }
        var tag = elem.tagName && elem.tagName.toLowerCase(); 
        exit =  tag == 'input' || tag == 'textarea';
        return exit;
      });
      if (exit) {
        return;
      }
      current_element = dragged_root;
      $.listen(view, 'mouseup', onmouseup);
      $.listen(view, 'mousemove', onmousemove);
      $.listen(doc.body, 'click', onclick, true);
      start = $.offset(dragged_root);
      mousestart = {
        x : event.clientX,
        y : event.clientY
      };
      // handled in greaseball
      //$.kill(event);
      return false;
    };

    var onselect = function(event) {
      $.kill(event);
      return false;
    };

    var onmousemove = function(event) {
      if (!dragging) {
        if (Math.abs(event.clientX - mousestart.x) > distance ||
            Math.abs(event.clientY - mousestart.y) > distance) {
          doc.body.focus();
          dragging = true;
          onstart(event, current_element);
          var overlay = $.overlay(doc, current_element);
          $.listen(doc, 'selectstart', onselect);
        }
      }
      if (dragging) {
        doc.body.focus();
        onupdate(event, current_element, start, mousestart);
        $.kill(event);
        return false;
      }
    };

    $.watch(root, selector, 'mousedown', onmousedown);
  }
  
  var makeDraggable = function(params) {
    params.onupdate = function(event, current_element, start, mousestart) {
      $.setStyle(current_element, {
        top : (start.y + event.clientY - mousestart.y) + "px",
        left : (start.x + event.clientX - mousestart.x) + "px"
      });      
    }
    makeDraggableBase(params);
  }

  var jsonp_counter = Math.floor(Math.random() * 1000);

  var querify = function(params) {
    var query = [];
    for (var ii in params) {
      query.push(encodeURIComponent(ii) + '=' + encodeURIComponent(params[ii]));
    }
    return query.join('&');
  }
  /** IE AND BOOKMARKLET VERSION ONLY **/
  var makeAsyncJsonp = function(params) {
    var doc = document;
    var cb = params.callback || $.noop;
    var error = params.error || $.noop;
    var warn = params.warn || $.noop;
    var url = params.url;
    var data = params.data || {};
    // remove timestamp to use FP server cache
 //   data.dt = new Date().getTime();
    if (data) {
      var sep = '?';
      if (url.indexOf('?') != -1) {
        sep = '&';
      }
      url += sep + querify(params.data);
    }
    var type = params.type;
    var nd = $.N(doc, 'script');
    var func_name = 'pfjsonp_' + (jsonp_counter++);
    window[func_name] = function(data) {
      $.remove(nd);
      cb(data);
      window[func_name] = $.noop;
      clearTimeout(token);
    };
    var token = setTimeout(function() {
      $.remove(nd);
      window[func_name] = $.noop;
      if (params.retrycount && params.retrycount >= 2) {
        error();
      } else {
        params.retrycount = params.retrycount || 0;
        params.retrycount++;
        warn(params.retrycount);
        makeAsyncJsonp(params);
      }
    }, 35000);
    url = url.replace('callback=?', 'callback=' + func_name);
    doc.body.appendChild(nd);
    nd.setAttribute('src', url);
  };
  
  var makeAsync = function(params) {
    var doc = document;
    var cb = params.callback || $.noop;
    var error = params.error || $.noop;
    var warn = params.warn || $.noop;
    var url = params.url;
    var data = params.data || {};
    // remove timestamp to use FP server cache
 //   data.dt = encodeURIComponent(new Date());
    if (data) {
      var sep = '?';
      if (url.indexOf('?') != -1) {
        sep = '&';
      }
      url += sep + querify(params.data);
    }
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(data) {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var txt = $.trim(xhr.responseText);
          if (txt.charAt(0) == '(') {
            txt = txt.substring(1, txt.length - 1);
          }
          try {
            var data = JSON.parse(txt);
            cb(data);
            return;
          } catch(e) {
        	  $.log('JSON PARSE EXCEPTION', url, e, txt);
          }
        }
        if (params.retrycount && params.retrycount >=2) {
          error();
        } else {
          params.retrycount = params.retrycount || 0;
          params.retrycount++;
          warn(params.retrycount);
          makeAsync(params);        
        }
        return;
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  };

  $ = {
    noop : function() {
    },
    version : function() {
      return version;
    },
    now: (Date.now || function(){ return +new Date(); }),
    get : function(doc, id) {
      return doc.getElementById(id);
    },
    setAttributes : function(elem, atts, unsafe) {
      for ( var att in atts) {
        if (unsafe && att.indexOf('on') > -1) {
          continue;
        }
        elem.setAttribute(att, atts[att]);
      }
    },
    parent: function(elem, fCallback) {
      var test;
      while(elem) {
        test = fCallback(elem);
        if (test) return elem;
        elem = elem.parentNode;
      }
    },
    index : function(array, elem) {
      for ( var ii = 0, length = array.length; ii < length; ii++) {
        if (array[ii] === elem) {
          return ii;
        }
      }
      return -1;
    },
    bind : function(_this, func) {
      var args = $.A(arguments);
      args.splice(0, 2);
      var binded = function() {
        var args_called = $.A(arguments).concat(args);
        return func.apply(_this, args_called);
      }
      return binded;
    },
    A : function(iterable) {
      if (!iterable)
        return [];
      if ('toArray' in Object(iterable))
        return iterable.toArray();
      var length = iterable.length || 0, results = new Array(length);
      while (length--)
        results[length] = iterable[length];
      return results;
    },
    isTextElement : function(nd) {
      return nd.nodeType === 3;
    },
    isHTMLElement : function(nd) {
      return nd.nodeType === 1;
    },
    isFragment : function(nd) {
      return nd.nodeType === 11;
    },
    isDocument : function(nd) {
      return nd.nodeType === 9;
    },
    log: function() {
      if (DEV && console && console.log) {
    	if ($.browser.msie && typeof console.log == 'object') {
    	  $.each(arguments, function(arg) {
    		 console.log(arg) 
    	  });
    	} else {
          console.log.apply(console, arguments);
    	}
      }
    },
    alert: function() {
      if (DEV) {
      	if ($.browser.msie && typeof window.alert == 'object') {
      	  var content;
      	  if (JSON && arguments.length > 1) {
        	content = JSON.stringify($A(arguments));
      	  } else {
      		content = arguments[0];
      	  }
      	  alert(content);
    	} else {
          alert.apply(window, arguments);
    	}
      }
    },
    N : function(doc, tag, atts, unsafe) {
      tag = tag.toLowerCase();
      if (unsafe &&
          (tag === "script" || tag === "object" || tag === "iframe" ||
           tag === "input" || tag === "form" || tag === "button" ||
           (tag === "a" && atts && atts.href && atts.href.indexOf('http') !== 0) ||
           (atts && atts.dom0) ) ) {
        return $.N('div', {children:['EXTERNAL CONTENT CANNOT BE SAFELY RENDERED']})
      }
      var elem;
      if (atts && atts.dom0 && !unsafe && $.browser.msie) {
        //IE only
        builder = builder || doc.createElement('div');
        var markup=['<'+tag].concat(atts.dom0);
        markup.push('/>');
        builder.innerHTML = markup.join(' ');
        delete atts['dom0'];
        elem = builder.getElementsByTagName(tag)[0];
      } else if (tag.indexOf('jx:') === 0) {
        var tag_constructor = JXTAG.registeredTags[tag];
        if (tag_constructor) {
          elem = new tag_constructor(doc);
          if (atts && atts.children) {
            for (var iii = 0; iii < atts.children.length; iii ++) {
              var child = atts.children[iii];
              if (child instanceof JXTAG.registeredTags['jx:frag']) {
                Array.prototype.splice.apply(atts.children, [iii, 1].concat(child.childNodes));
                iii--;
              }
            }
          }
        }
      } else {
        try {
        elem = doc.createElement(tag);
        }catch(e) {alert(tag);throw(e);}
      }
      if (atts) {
        $.buildAttributes(doc, elem, atts, unsafe);
      }
      if (elem instanceof JXTAG) {
        elem = elem.render();
      }
      return elem;
    },
    /**
     *  set attributes on an element.
     *    elem: target element
     *    atts: attributes and child elements.
     *      { class: 'xxx', style: 'xxx' | object, children: [string | HTMLElement | DocumentFragment | [tagname, attribute]], attributename: value, ... } 
     *    unsafe: true if the template is coming via xhr, 
     *      in which case no attributes of the type 'onXXX' 
     *      will be set.
     */
    buildAttributes: function(doc, elem, atts, unsafe) {
      var _class, _style;
      if (atts['class']) {
        _class = atts['class'];
        $.each(_class.split(' '), function(classname) {
          if (classname.length) {
            $.addClass(elem, classname);
          }
        });
        delete atts['class'];
      }
      if (atts.style) {
        _style = atts.style;
        $.setStyle(elem, _style);
        delete atts.style;
      }
      var children = null;
      if (atts.children) {
        children = atts.children;
        delete atts.children;
      }
      atts && $.setAttributes(elem, atts, unsafe);
      if (children) {
        $.each(children, function(child){
          if (child === null || child === undefined) {
            return;
          }
          var type = typeof child;
          var nd;
          if (type === 'string' || type === 'number') {
            nd = doc.createTextNode(child);
          } else if ($.isHTMLElement(child) ||
                     $.isFragment(child)) {
            nd = child;
          } else {
            var create_node_attributes = [doc].concat(child);
            if (unsafe) {
              create_node_attributes[2] = create_node_attributes[2] || null;
              create_node_attributes[3] = unsafe;
            }
            nd = $.N.apply($, create_node_attributes);
          }
          elem.appendChild(nd);
        });
      }
      children && (atts.children = children);
      _class && (atts['class'] = _class);
      _style && (atts.style = _style);
    },
    /**
     * fromTemplate creates an html markup from an object
     *   template : [tagname, attributes]
     *   data: [ [selector_to_a_child_node, attributes_to_set]* ]
     *   unsafe: true if the template is coming via xhr, in which case no
     *     script or object tags are accepted, and onXXX attributes are skipped. 
     **/
    fromTemplate: function(doc, template, data, unsafe) {
      var create_node_attributes = [doc].concat(template);
      if (unsafe) {
        create_node_attributes[2] = create_node_attributes[2] || null;
        create_node_attributes[3] = unsafe;
      }
      var content = $.N.apply($, create_node_attributes);
      data = data || [];
      $.each(data, function(data) {
        builder = builder || doc.createElement('div');
        $.empty(builder);
        builder.appendChild(content);
        var nd = $.find(builder, data[0])[0];
        $.buildAttributes(doc, nd, data[1], unsafe);
      });
      return content;
    },
    /**
     * Create a DocumentFragment from a template sent via XHR
     */
    fromExternalTemplate: function(doc, template, data) {
      // create from template marked as unsafe
      var markup = $.fromTemplate(doc, template, data, true);
      // all the templates from PF are wrapped in a div element.
      var frag = doc.createDocumentFragment();
      $.each($.A(markup.childNodes), function(nd) {frag.appendChild(nd);});
      return frag;
    },
    empty: function(node) {
      while (node.firstChild) {
        $.remove(node.firstChild);
      }
    },
    cloneChildren : function(doc, elem) {
      var frag = doc.createDocumentFragment();
      $.each($.A(elem), function(el) {
        frag.appendChild(el.cloneNode(true));
      });
      return frag;
    },
    remove : function(elem) {
      elem.parentNode.removeChild(elem);
    },
    replace : function(elem, replacement) {
      elem.parentNode.replaceChild(replacement, elem);
    },
    hasClass : function(elem, classname) {
      return (' ' + elem.className + ' ').indexOf(' '+classname+' ') > -1;
    },
    addClass : function(elem, classname) {
      var classnames = elem.className.split(' ');
      if ($.index(classnames, classname) === -1) {
        classnames.push(classname);
        elem.className = classnames.join(' ');
      }
    },
    setText : function(doc, node, text) {
    	if (node){
	      $.empty(node);
	      node.appendChild(doc.createTextNode(text));
    	}
    },
    removeClass : function(elem, classname) {
      var classnames = elem.className.split(' ');
      var idx;
      if ((idx = $.index(classnames, classname)) !== -1) {
        classnames.splice(idx, 1);
        elem.className = classnames.join(' ');
      }
    },

    conditionClass : function(elem, classname, condition) {
      if (condition) {
        $.addClass(elem, classname);
      } else {
        $.removeClass(elem, classname);
      }
    },
    toggle : function(elem, classname) {
      $.conditionClass(elem, classname, !$.hasClass(elem, classname));
    },
    trim : function(str){
      return str.replace(/^\s\s*/, '').replace(/\s(\s|\n|\r)*$/, '');
    },
    getStyle : function(elem, stylename) {
      return elem.style[stylename];
    },
    getNodeText: function(node) {
      return node.textContent||node.nodeValue||node.innerText||"";
    },
    dimensions : function(elem) {
      return {
        w : elem.offsetWidth,
        h : elem.offsetHeight
      };
    },
    viewportdims : function(doc) {
      var bdy = doc.body;
      var docelem = doc.documentElement;
      var getDim = function(dim) {
        return Math.max(
          bdy['scroll'+dim], docelem['scroll'+dim],
          bdy['offset'+dim], docelem['offset'+dim],
          bdy['client'+dim], docelem['client'+dim]
        );
      }
      return {
        w: getDim('Width'),
        h: getDim('Height')
      }
    },
    capitalize : function(str){
        return str.substring(0,1).toUpperCase() + str.substring(1);
    },
    hide : function(elem) {
      elem.style.display = 'none';
    },
    show : function(elem) {
      elem.style.display = '';
    },
    offset : function(elem) {
      var curleft = curtop = 0;
      if (elem.offsetParent) {
        do {
          curleft += elem.offsetLeft;
          curtop += elem.offsetTop;
        } while (elem = elem.offsetParent);
      }
      return {
        x : curleft,
        y : curtop
      };
    },
    setOpacity : function(elem, value) {
      elem.style.opacity = value;
    },
    setOpacityIE : function(elem, value) {
      function stripAlpha(filter) {
        return filter.replace(/alpha\([^\)]*\)/gi, '');
      }
      var currentStyle = elem.currentStyle;
      if ((currentStyle && !currentStyle.hasLayout) ||
          (!currentStyle && elem.style.zoom == 'normal'))
        elem.style.zoom = 1;

      var filter = $.getStyle(elem, 'filter'), style = elem.style;
      if (value == 1 || value === '') {
        (filter = stripAlpha(filter)) ? style.filter = filter : style
            .removeAttribute('filter');
        return elem;
      } else if (value < 0.00001)
        value = 0;
      style.filter = stripAlpha(filter) + 'alpha(opacity=' + (value * 100) +
          ')';
      return elem;

    },
    setStyle : function(elem, atts) {
      if (typeof atts === 'string') {
        elem.style.cssText = atts;
      } 
      if (atts['opacity'] && $.browser.msie) {
        $.setOpacityIE(elem, atts['opacity']);
      }
      $.copy(atts, elem.style);
    },
    each : function(array, fun /* , thisp */) {
      var len = array.length >>> 0;
      var thisp = arguments[2];
      for ( var ii = 0; ii < len; ii++) {
        if (ii in array) {
          fun.call(thisp, array[ii], ii, array);
        }
      }
    },
    some : function(array, fun /* , thisp */) {
      var i = 0, len = array.length >>> 0;

      var thisp = arguments[1];
      for (; i < len; i++) {
        if (i in array && fun.call(thisp, array[i], i, array)) {
          return array[i] || true;
        }
      }
      return false;
    },
    insertBefore : function(_new, _ref) {
      _ref.parentNode.insertBefore(_new, _ref);
    },
    insertAfter : function(_new, _ref) {
      _ref.parentNode.insertBefore(_new, _ref.nextSibling);
    },
    currate : function(array, func) {
      for ( var ii = array.length - 1; ii >= 0; ii--) {
        if (func(array[ii])) {
          array.splice(ii, 1);
        }
      }
    },
    find : function(root, match) {
      if (root.querySelectorAll) {
    	  if (match.indexOf('!') > -1) {
    		  match = match.replace(/\!([a-zA-Z]*,?)*/, function(match) {
    			  return ':not('+match.substr(1).split(',').join('):not(')+')';
    		  });
    	  }
    	  return $.A(root.querySelectorAll(match));
      }
      var matches = match.split(' ');
      var current_roots = [ root ];
      $.each(matches, function(match) {
        var keys = match.split('!');
        var except = keys[1];
        if (except) {
          var forbiden_tags = except.split(',');
          except = {};
          $.each(forbiden_tags, function(tag) {
            except[tag.toLowerCase()] = true;
          });
        }
        keys = keys[0].split('.');
        var tag = keys[0] || '*';
        var classname = keys[1];
        var new_roots = [];
        $.each(current_roots, function(node) {
          var childs = $.A(node.getElementsByTagName(tag));
          if (except) {
            $.currate(childs, function(child) {
              return except[child.tagName.toLowerCase()]
            });
          }
          if (!classname) {
            new_roots = new_roots.concat(childs);
          } else {
            $.each(childs, function(child) {
              if ($.hasClass(child, classname)) {
                new_roots.push(child);
              }
            });
          }
        });
        current_roots = new_roots;
      });
      return current_roots;
    },
    uaMatch : function(ua) {
      ua = ua.toLowerCase();

      var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || rtrident.exec(ua) ||
          ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
      var flavor = null;

  	  if (match[1] == 'trident'){
  		match[1] = 'msie'; //IE 11
  	  }
      var mobile = null;
      if (match[1] == 'webkit') {
        var mobilematch = rmobile.exec(ua);
        mobile = (mobilematch && (mobilematch[1])) || "";
        if (!mobile) {
          var flavormatch = rchrome.exec(ua);
          
          flavor = (flavormatch && flavormatch[0]) || 'safari';
        }
      }
      return {
        browser : match[1] || "",
        version : match[2] || "0",
        flavor : flavor,
        mobile: mobile 
      };
    },
    listen : function(node, eventname, callback, capture) {
      capture = capture || false;
      $.removeListener(node, eventname, callback, capture);
      if (node.attachEvent) {
        node.attachEvent('on' + eventname, callback);
      } else {
        node.addEventListener(eventname, callback, capture);
      }
    },
    removeListener : function(node, eventname, listener, capture) {
      capture = capture || false;
      if (node.detachEvent) {
        node.detachEvent('on' + eventname, listener);
      } else {
        node.removeEventListener(eventname, listener, capture);
      }
    },
    getData: function(node, data_name) {
      var data_id = null
      if ((data_id = node.getAttribute('data-pf-id')) &&
           nodes_data[data_id]) {
        return nodes_data[data_id][data_name];
      }
    },
    setData: function(node, data_name, value) {
      var data_id = node.getAttribute('data-pf-id');
      if (!data_id) {
        data_id = $.now() + '_' + (data_count++);
        node.setAttribute('data-pf-id', data_id);
      }
      nodes_data[data_id] = nodes_data[data_id] || {};
      nodes_data[data_id][data_name] = value; 
    },
    map: function(arr, transform) {
      var res = [];
      $.each(arr, function(elem){
        res.push(transform(elem));
      });
      return res;
    },
    isArray: function (vArg) {
      return Object.prototype.toString.call(vArg) === "[object Array]";
    },
    watch: function(node, path, event_name, callback, capture) {
      if ($.isArray(event_name)) {
        $.each(event_name, function(event){
          $.watch(node, path, event, callback);
        });
        return;
      }
      var data_name = path+'_'+event_name;
      if ($.getData(node, data_name)) {
        return;
      } else {
        path = path.split(' ');
        path = $.map(path, function(item){
          item = item.split('.');
          return {
            tag: item[0].toUpperCase(),
            className: item[1]
          }
        });
        $.setData(node, data_name, path);
      }
      $.listen(node, event_name, function(e) {
        var src = $.target(e);
        var test_index = path.length - 1;
        var last_node = null;
        $.parent(src, function(nd){
          var path_item = path[test_index];
          var tag_match = !path_item.tag || path_item.tag === nd.tagName;
          if (tag_match && (!path_item.className || $.hasClass(nd, path_item.className))) {
            test_index--;
          }
          if (test_index === -1) {
            last_node = nd;
            return true;
          }
          if (nd === node) {
            return true;
          }
        });
        if (last_node) {
          callback(e, last_node);
        }
      }, capture);
    },
    getScrollOffset: function() {
      var fun;
      if( typeof( window.pageYOffset ) == 'number' ) {
        fun = function () {
          return {x: window.pageXOffset, y: window.pageYOffset};
        };
      } else if (document.body && typeof(document.body.scrollLeft) == 'number') {
        //DOM compliant
        fun = function() {
          return {y: document.body.scrollTop, x: document.body.scrollLeft};
        };
      } else if (document.documentElement && typeof(document.documentElement.scrollLeft) == 'number') {
        //IE6 standards compliant mode
        fun = function() {
          return {y: document.documentElement.scrollTop, x: document.documentElement.scrollLeft};
        };
      }
      if (fun) {
        this.getScrollOffset = fun;
        return fun();
      }
      return {x: 0, y: 0};
    },
    scrollTo: function(x, y, options) {
      var offset = $.getScrollOffset(),
        options = options || {},
        time = options.ms || 250,
        steps = time,
        xdiff = x - offset.x,
        ydiff = y - offset.y,
        fx = options.ease ? options.ease : function(i, steps) {
          return (steps - i) / steps;
        },
        stop = $.now() + time;

      clearInterval(scrollInterval);
      
      scrollInterval = setInterval(function() {
        var i = Math.max(stop - $.now(), 0);
        
        var divisor = fx(i, steps);
        window.scroll(xdiff * divisor + offset.x, ydiff * divisor + offset.y);  
        // last step
        if (0 === i) {
            clearInterval(scrollInterval);
            window.scroll(x, y);
        }
      }, 10);
    },
    target : function(evt) {
      return evt.target || evt.srcElement;
    },
    copy: function(src, dest) {
      for (var name in src) {
        dest[name] = src[name];
      }
    },
    event: function(event) {
    	if (event.rawEvent) {
    		event = rawEvent;
    	}
    	var copy_event = {};
    	$.copy(event, copy_event);
        copy_event.rawEvent = event;
        copy_event.fake = true;
        return copy_event;
    },
    stop : function(evt) {
      if (evt.rawEvent) {
        evt = evt.rawEvent;
      }
      evt.stopPropagation && evt.stopPropagation();
      evt.cancelBubble = true;
    },
    prevent : function(evt) {
      if (evt.rawEvent) {
        evt = evt.rawEvent;
      }
      evt.preventDefault && evt.preventDefault();
      evt.returnValue = false;
    },
    testStorage: function() {
      try {
        if (window.localStorage) {
          window.localStorage.setItem('pickemfirsttest', true);
          window.localStorage.removeItem('pickemfirsttest');
          return true;
        }
      } catch(ex) {}
      return false;
    },
    kill : function(evt) {
      if (evt){
          $.stop(evt);
          $.prevent(evt);
      }
    },
    setDEV : function(b) {
    	DEV = b;
    },
    overlay: function(doc, nd) {
      var overlay = $.N(doc, 'img', {
        'class' : 'gb_noclick'
      });
      var content_dim = $.dimensions(nd);
      $.setStyle(overlay, {
        width : content_dim.w + "px",
        height : content_dim.h + "px",
        position : 'absolute',
        top : '0',
        left : '0'
      });
      overlay.src = 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
      nd.appendChild(overlay);
      return overlay;
    },
    draggable : makeDraggable,
    draggablebase : makeDraggableBase,
    browser : {},
    async : makeAsync,
    asyncp : makeAsyncJsonp,
    JXTAG: JXTAG
  };
  
  $.each(['get', 'overlay', 'N', 'setText', 'cloneChildren', 'H', 'viewportdims', 'fromTemplate', 'fromExternalTemplate'], function(fname) {
    var old = $[fname];
    $[fname] = function() {
      if (!$.isDocument(arguments[0])) {
        return old.apply($, [document].concat($.A(arguments)));
      } else {
        return old.apply($, arguments);
      }
    };
  });

  var browserMatch = $.uaMatch(userAgent);
  if (browserMatch.browser) {
    $.browser[browserMatch.browser] = true;
    $.browser.version = browserMatch.version;
    $.browser.mobile = browserMatch.mobile;
    $.browser.flavor = browserMatch.flavor;
  }

  return $;

})();
