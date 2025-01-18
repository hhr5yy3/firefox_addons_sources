var jUtils = {

	getAttr : function(el, att) {
		var res = null;
        if (typeof el[att] === 'string') {
			res = el[att];
        }
		else if (el.getAttribute) {
			res = el.getAttribute(att);
        }
        return res;
	},
	
	setAttr : function (el, att, s) {
        if (typeof el[att] === 'string') {
			el[att] = s;
        }
		else {
			el.setAttribute(att, s);
        }
    },
	
	setStyle : function(el, k, s) {
		if (el != null) {
			el.style[k] = s;
		}
	},
	
	getElement : function(e) {
		var el = null;
		if (e.target) {
			return (e.target.nodeType === 3) ? e.target.parentNode : e.target;
		}
		return e.srcElement;
	},
	
	getBody : function() {
		var bodyElems = document.getElementsByTagName("body"); 
		return bodyElems[0];
	},
	
	getOffset : function (el) {
        var x = 0;
		var y = 0;
		var width = 0;
		var height = 0;
		if (el != null) {
			width = el.clientWidth;
			height = el.clientHeight;
			if (el.offsetParent) {
				do {
					if (PealtreesPearlItButton.isFirefoxEnv()) {
						x = x + el.offsetLeft - el.scrollLeft + el.clientLeft;
						y = y + el.offsetTop - el.scrollTop + el.clientTop;
					}
					else {
						x = x + el.offsetLeft;
						y = y + el.offsetTop;
					}
				} while (el = el.offsetParent);
				return {"left": x, "top": y, "width" : width, "height" : height};
			}
		}
    },
	
	listen : function (el, ev, fn) {
        if (el) {
            if (typeof window.addEventListener !== 'undefined') {
				el.addEventListener(ev, fn, false);
            }
			else if (typeof window.attachEvent !== 'undefined') {
				el.attachEvent('on' + ev, fn);
            }
        }
    },

//    listenToIframes : function (ev, fn) {
//        var frames = document.getElementsByTagName('iframe');
//        if (frames && frames.length > 0) {
//            for (var i = 0; i < frames.length; i ++) {
//                var frame = frames[i];
//                frame.onload = function() {
//                    var iWindow = frame.contentWindow || frame.contentDocument;
//                    if (iWindow.document) {
//                        jUtils.listen(iWindow, ev, fn);
//                        jUtils.listen(iWindow.document, ev, fn);
//                        jUtils.listen(iWindow.document.getElementsByTagName('body')[0], ev, fn);
//                    }
//                };
//            }
//        }
//    },
    
    remove : function (el, ev, fn) {
        if (el) {
            if (typeof window.removeEventListener !== 'undefined') {
				el.removeEventListener(ev, fn, false);
            }
        }
    },
	
	scrollTop : function() {
		return window.pageYOffset || document.documentElement.scrollTop;
	},
	
	scrollTopForEl : function(el) {
		var x = 0;
		try {
	        if (el.offsetParent && el != null) {
	            do {
	              x = x + el.scrollTop;
	            } while (el = el.offsetParent && el != null);
	        }
		}
		catch (e) {
			x = 0;
		}
		var globalx = window.pageYOffset || document.documentElement.scrollTop;
		PealtreesPearlItButton.log("Scroll : x= " + x + " - globalx= " + globalx);
		if (isNaN(x)) {
			return globalx;
		}
		return x >= globalx ? x : globalx + x;
	},
	
	getWithFilter : function(tg, attr, val) { 
		var metas = document.getElementsByTagName(tg); 
	    for (i=0; i < metas.length; i++) { 
			if (jUtils.getAttr(metas[i], attr) === val) { 
				return metas[i]; 
			} 
		} 
		return null;
	},
	
	setInputValue : function(formId, inputName, val) {
		var children = document.getElementById(formId).childNodes;
		for (var i=0; i < children.length; i++) {
			var child = children[i];
			if (jUtils.getAttr(child, 'name') === inputName) {
				child.value = val;
			}
		}
	},
	
	getSelectionText : function() {
        var text;
        if (window.getSelection) {
            text = window.getSelection();
        }
		else if (document.getSelection) {
			text = document.getSelection();
		}
        else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    },
	
	getSelectedNode : function() {
		var node = PealtreesPearlItButton.getSelectionText().baseNode;
		if (typeof node === 'undefined') {
			node = PealtreesPearlItButton.getSelectionText().anchorNode;
		}
		return node.parentNode;
	},
	
	getStartSelectionCoords : function() {
		var sel = document.selection, range, rect;
		var x = 0, y = 0, endx = 0, endy = 0;
		if (sel) {
			if (sel.type != "Control") {
				range = sel.createRange();
				range.collapse(true);
				x = range.boundingLeft;
				y = range.boundingTop;
			}
		}
		else if (window.getSelection) {
			sel = window.getSelection();
			if (sel.rangeCount) {
				range = sel.getRangeAt(0).cloneRange();
				if (range.getClientRects) {
					//range.collapse(true);
					rect = range.getClientRects()[0];
					x = rect.left;
					y = rect.top;
				}
				// Fall back to inserting a temporary element
				if (x == 0 && y == 0) {
					var span = document.createElement("span");
					if (span.getClientRects) {
						// Ensure span has dimensions and position by
						// adding a zero-width space character
						span.appendChild( document.createTextNode("\u200b") );
						range.insertNode(span);
						rect = span.getClientRects()[0];
						x = rect.left;
						y = rect.top;
						var spanParent = span.parentNode;
						spanParent.removeChild(span);

						// Glue any broken text nodes back together
						spanParent.normalize();
					}
				}
			}
		}
		return { x: x, y: y};
	},
	
	getEndOfSelectionCoords : function() {
		var x, y;
		if (window.getSelection) {
			var range = window.getSelection().getRangeAt(0).cloneRange();;
			range.collapse(false);
			var dummy = document.createElement("span");
			range.insertNode(dummy);
			var rect = dummy.getBoundingClientRect();
			x = rect.left;
			y = rect.top;
			dummy.parentNode.removeChild(dummy);
		}
		return {x: x, y: y};
	},
	
	isOverElement : function(el, ev, secondaryEl, specialOffset) {
		if (typeof el === 'undefined' || el == null) {
//			PealtreesPearlItButton.log("isOverElement el undefined");
			return false;
		}
//		PealtreesPearlItButton.log("isOver on " + el.tagName + "(" + jUtils.getAttr(el, "id") + " / " + jUtils.getAttr(el, "class") + ")");
		var eventx = ev.clientX || ev.pageX;
		var eventy = ev.clientY || ev.pageY;
		if (!PealtreesPearlItButton.isNeedScrollSite()) {
			eventy += jUtils.scrollTopForEl(el);
		}
//		PealtreesPearlItButton.log("isOverElement scrollTop " + jUtils.scrollTopForEl(el));
		var offset = jUtils.getOffset(el);
		if (typeof offset === 'undefined') {
//			PealtreesPearlItButton.log("isOverElement offset undefined");
			return false;
		}
//		PealtreesPearlItButton.log("isOverElement el size: " + offset.width + "x" + offset.height);
//		PealtreesPearlItButton.log("isOverElement el before offset : " + offset.left + "x" + offset.top);
//		if (typeof specialOffset != 'undefined' && specialOffset != null) {
//			PealtreesPearlItButton.log("isOverElement specialOffset : " + specialOffset.left + "x" + specialOffset.top + " - size " + specialOffset.width + "x" + specialOffset.height);
//
//		}
		if (typeof specialOffset != 'undefined' && specialOffset != null) {
			var buttonOffset = PealtreesPearlItButton.getOffsetForImageSize(specialOffset.width, specialOffset.height, 0, 0);
//			PealtreesPearlItButton.log("isOverElement buttonOffset : " + buttonOffset.left + "x" + buttonOffset.top);
			if (isNaN(buttonOffset.left) || isNaN(buttonOffset.top)) {
				offset.left = offset.left + specialOffset.left;
				offset.top = offset.top + specialOffset.top
			}
			else {
				offset.left = offset.left + specialOffset.left - buttonOffset.left;
				offset.top = offset.top + specialOffset.top - buttonOffset.top;
			}
		}
//		PealtreesPearlItButton.log("isOverElement el after offset : " + offset.left + "x" + offset.top);
//		PealtreesPearlItButton.log("isOverElement el : " + offset.left + "x" + offset.top);
//		PealtreesPearlItButton.log("isOverElement el max: " + (offset.left + el.offsetWidth) + "x" + (offset.top + el.offsetHeight));
//		PealtreesPearlItButton.log("isOverElement ev : " + eventx + "x" + eventy);
		var margin = 3;
		if (eventx + margin < offset.left || eventy + margin < offset.top) {
			return jUtils.isOverElement(secondaryEl, ev);
		}
		if (eventx - margin > offset.left + el.offsetWidth || eventy - margin > offset.top + el.offsetHeight) {
			return jUtils.isOverElement(secondaryEl, ev);
		}
		return true;
	}
}

var pearltreesOverlay = {

	overlayId : 'pearltrees_overlay',
	voileId : 'pearltrees_voile',
	iFrame : null,
	
	showOverlay : function() {
		var existing = window.document.getElementById(pearltreesOverlay.overlayId);
		if (!existing) {
			var frame = document.createElement('iframe');
			var requestString = [];
			frame.allowtransparency = 'true';
			frame.scrolling = 'no';
			frame.id = pearltreesOverlay.overlayId;
			frame.name = pearltreesOverlay.overlayId;
			frame.src = '_blank';
			var width = 520;
			var height = 600;
			var w = window.innerWidth;
			var h = window.innerHeight;
			jUtils.setStyle(frame, 'opacity', '0');
			jUtils.setStyle(frame, 'transition', 'opacity 100ms linear');
			jUtils.setStyle(frame, 'position', 'fixed');
			var topPosition = (h / 2 - height / 2);
			if (topPosition < 0) {
				topPosition = 0;
			}
			var leftPosition = (w / 2 - width / 2);
			if (leftPosition < 0) {
				leftPosition = 0;
			}
			jUtils.setStyle(frame, 'top', topPosition + 'px');
			jUtils.setStyle(frame, 'left', leftPosition + 'px');
			jUtils.setStyle(frame, 'border', '0px');
			jUtils.setStyle(frame, 'zIndex', '2147483649');
			jUtils.setStyle(frame, 'width', width + 'px');
			jUtils.setStyle(frame, 'height', height + 'px');
			jUtils.setStyle(frame, "border-radius", '6px');
			jUtils.setStyle(frame, "-webkit-border-radius", '6px');
			jUtils.setStyle(frame, "box-shadow", '0px 0px 3px rgba(0, 0, 0, 0.4)');
			jUtils.setStyle(frame, "background-color", 'white');
			var voile = document.createElement('div');
			voile.id = pearltreesOverlay.voileId;
			jUtils.setStyle(voile, 'width', '100%');
			jUtils.setStyle(voile, 'height', '100%');
			jUtils.setStyle(voile, 'position', 'fixed');
			jUtils.setStyle(voile, 'top', '0px');
			jUtils.setStyle(voile, 'left', '0px');
			jUtils.setStyle(voile, 'zIndex', '2147483649');
			jUtils.setStyle(voile, "background-color", 'rgba(0,0,0,0.35)');
			if (PealtreesPearlItButton.isFirefoxEnv()) {
				voile.style.backgroundColor = 'rgba(0,0,0,0.35)';
				frame.style.borderRadius = '6px';
				frame.style.boxShadow = '0px 0px 3px rgba(0, 0, 0, 0.4)';
			}
			
			jUtils.listen(voile, 'click',
				function (e) {
					pearltreesOverlay.closeOverlay();
				}
			);
			window.document.body.appendChild(voile);
			frame.frameborder = "0px";
			frame.onload = function () {
				frame.style.opacity = 1;
				window.setTimeout(function () {
					jUtils.setStyle(frame, 'opacity', '1');
				}, 10);
			};
			frame.addEventListener("mousewheel", function(event) {event.stopPropagation(); event.cancelBubble = true; event.preventDefault();}, false);
			window.document.body.appendChild(frame);
			window.addEventListener('message', pearltreesOverlay.handleMessage, false);
			window.setTimeout(function () {
				jUtils.setStyle(frame, 'opacity', '1');
			}, 1000);
		}
	},

	closeOverlay : function () {
		var frame = document.getElementById(pearltreesOverlay.overlayId);
		var voile = document.getElementById(pearltreesOverlay.voileId);
		if (frame) {
			jUtils.setStyle(frame, 'opacity', '0');
			jUtils.setStyle(voile, 'opacity', '0');
			window.setTimeout(function () {
				frame.src = 'about:blank';
				window.removeEventListener('message', pearltreesOverlay.handleMessage, false);
				frame.parentNode.removeChild(frame);
				voile.parentNode.removeChild(voile);
				frame = null;
			}, 100);
		}
	},
	
	handleMessage : function(e) {
		PealtreesPearlItButton.log("has received event from popup " + e.origin);
		if (PEARLTREES_URL.indexOf(e.origin) >= 0 || PEARLTREES_URL_HTTP.indexOf(e.origin) >= 0 || PEARLTREES_URL_BASE.indexOf(e.origin) >= 0) {
			var parts = e.data.split('@');
			var eventName = parts[0];
			var eventData = parts[1];
			PealtreesPearlItButton.log("event = " + eventName + " - " + eventData);
			if (eventName === "closeOverlay") {
				pearltreesOverlay.closeOverlay();
			}
			else if (eventName === "ptButtonClicked") {
				if (PealtreesPearlItButton.isSafariEnv()) {
					safari.self.tab.dispatchMessage("PTOpenTabFromCS", eventData);
				}
				else if (PealtreesPearlItButton.isFirefoxEnv()) {
					self.port.emit('openInNewTab', eventData);
				}
				else {
					window.open(eventData);
				}
				pearltreesOverlay.closeOverlay();
			}
			else if (eventName === "storeBackgroundButtonParameters") {
				PealtreesPearlItButton.saveUserButtonParameters(eventData);
			}
		}
	}
};

var selectionchange = (function (undefined) {

  var SELECT_ALL_MODIFIER = /^Mac/.test(navigator.platform) ? 'metaKey' : 'ctrlKey';
  var RANGE_PROPS = ['startContainer', 'startOffset', 'endContainer', 'endOffset'];

  var ranges;

  return {
    start: function (doc) {
      var d = doc || document;
      if (ranges || !hasNativeSupport(d) && (ranges = newWeakMap())) {
        if (!ranges.has(d)) {
          ranges.set(d, getSelectionRange(d));
          on(d, 'keydown', onKeyDown);
          on(d, 'mousedown', onMouseDown);
          on(d, 'mousemove', onMouseMove);
          on(d, 'mouseup', onMouseUp);
          on(d.defaultView, 'focus', onFocus);
        }
      }
    },
    stop: function (doc) {
      var d = doc || document;
      if (ranges && ranges.has(d)) {
        ranges['delete'](d);
        off(d, 'keydown', onKeyDown);
        off(d, 'mousedown', onMouseDown);
        off(d, 'mousemove', onMouseMove);
        off(d, 'mouseup', onMouseUp);
        off(d.defaultView, 'focus', onFocus);
      }
    }
  };

  function hasNativeSupport(doc) {
    var osc = doc.onselectionchange;
    if (osc !== undefined) {
      try {
        doc.onselectionchange = 0;
        return doc.onselectionchange === null;
      } catch (e) {
      } finally {
        doc.onselectionchange = osc;
      }
    }
    return false;
  }

  function newWeakMap() {
    if (typeof WeakMap !== 'undefined') {
      return new WeakMap();
    } else {
      console.error('selectionchange: WeakMap not supported');
      return null;
    }
  }

  function getSelectionRange(doc) {
	  if (typeof doc.getSelection !== 'undefined') {
		  var s = doc.getSelection();
		  return s.rangeCount ? s.getRangeAt(0) : null;
	  }
	  return null;
  }

  function on(el, eventType, handler) {
    el.addEventListener(eventType, handler, true);
  }

  function off(el, eventType, handler) {
    el.removeEventListener(eventType, handler, true);
  }

  function onKeyDown(e) {
    var code = e.keyCode;
    if (code === 65 && e[SELECT_ALL_MODIFIER] && !e.shiftKey && !e.altKey || // Ctrl-A or Cmd-A
        (code <= 40 && code >= 37) && e.shiftKey) { // (Alt-)Shift-arrow
      setTimeout(dispatchIfChanged.bind(null, this), 0);
    }
  }

  function onMouseDown(e) {
    if (e.button === 0) {
      on(this, 'mousemove', onMouseMove);
      setTimeout(dispatchIfChanged.bind(null, this), 0);
    }
  }

  function onMouseMove(e) {  // only needed while primary button is down
    if (e.buttons & 1) {
      dispatchIfChanged(this);
    } else {
      off(this, 'mousemove', onMouseMove);
    }
  }

  function onMouseUp(e) {
    if (e.button === 0) {
      setTimeout(dispatchIfChanged.bind(null, this), 0);
    } else {
      off(this, 'mousemove', onMouseMove);
    }
  }

  function onFocus() {
    setTimeout(dispatchIfChanged.bind(null, this.document), 0);
  }

  function dispatchIfChanged(doc) {
    var rOld = ranges.get(doc);
    var rNew = getSelectionRange(doc);
    if (!sameRange(rNew, rOld)) {
      ranges.set(doc, rNew);
      setTimeout(doc.dispatchEvent.bind(doc, new Event('selectionchange')), 0);
    }
  }

  function sameRange(r1, r2) {
    return r1 === r2 || r1 && r2 && RANGE_PROPS.every(function (prop) {
      return r1[prop] === r2[prop];
    });
  }
})();

selectionchange.start();

var browserDetect = {
    isChrome: function() {
        return chrome && chrome.runtime;
    }
}