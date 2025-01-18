(function() {
      const importPath = /*@__PURE__*/ JSON.parse('"contentScripts/searchWithAI.js"');
      import(chrome.runtime.getURL(importPath));
    })();