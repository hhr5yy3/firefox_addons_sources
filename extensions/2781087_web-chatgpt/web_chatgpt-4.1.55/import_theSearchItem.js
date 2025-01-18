(function() {
      const importPath = /*@__PURE__*/ JSON.parse('"contentScripts/theSearchItem.js"');
      import(chrome.runtime.getURL(importPath));
    })();