var config = {
  "observer": null,
  "elements": {
    "player": null,
    "button": null
  },
  "metrics": {
    "tag": "ytd-player",
    "selector": ".ytp-ad-skip-button.ytp-button"
  },
  "methods": {
    "attribute": function () {
      const scriptlets = chrome.runtime.getURL("data/content_script/page_context/vendor/scriptlets.js");
      document.documentElement.setAttribute("scriptlets", scriptlets);
    },
    "skip": function () {
      config.elements.button = document.querySelector(config.metrics.selector);
      /*  */
      if (config.elements.button) {
        config.elements.button.click();
      }
    },
    "find": function () {
      config.elements.player = document.getElementsByTagName(config.metrics.tag)[0];
      /*  */
      if (!config.elements.player) {
        return window.setTimeout(function () {
          config.methods.find();
        }, 300);
      } else {
        config.observer = new MutationObserver(config.methods.skip);
        config.observer.observe(config.elements.player, {
          "subtree": true,
          "childList": true
        });
      }
    }
  }
};

config.methods.attribute();
config.methods.find();
