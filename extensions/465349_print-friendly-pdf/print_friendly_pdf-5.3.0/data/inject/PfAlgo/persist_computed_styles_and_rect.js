var persistComputedStylesAndRect = (function() {
  var STYLES_TO_SAVE = ['display', 'visibility'];
  var RECT_TO_SAVE = ['width', 'height'];
  var PREFIX = 'pf';

  function persistObject(node, object, propsToSave, objPrefix) {
    for(var i = 0, length = propsToSave.length; i < length; i++) {
      var prop = propsToSave[i];
      var key = [PREFIX, objPrefix, prop].join('_');
      node.dataset[key] = object[prop];
    }
  }

  return function persistComputedStylesAndRect(node) {
    var style = node.currentStyle || window.getComputedStyle(node);
    if (style) { persistObject(node, style, STYLES_TO_SAVE, 'style'); }
    var rect = node.getBoundingClientRect && node.getBoundingClientRect();
    var nodeName = node.nodeName.toUpperCase();
    if (nodeName === 'IMG' || nodeName === 'SVG' || nodeName === 'IFRAME') {
      if (rect) { persistObject(node, rect, RECT_TO_SAVE, 'rect'); }
    }
  };
})();
