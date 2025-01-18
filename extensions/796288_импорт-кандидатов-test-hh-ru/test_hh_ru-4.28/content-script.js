(function() {
  'use strict';
  const event = new Event('plugin');

  event.initEvent('plugin', true, true);

  document.dispatchEvent(event);
})();
