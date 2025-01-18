var pageMod = require("sdk/page-mod"),
    req = require('sdk/request'),
    setTimeout = require('sdk/timers').setTimeout,
    tlds = ['com.br', 'com', 'net', 'org.br', 'org'];


function getStores() {
  req.Request({
    url: "https://api2.reduza.com.br/stores",
    onComplete: function (response) {
      setTimeout(getStores, 1000*60*60); // reload in 60 minutes
      var stores = response.json;

      if (!Array.isArray(stores)) {
          return; // Invalid response!!!
      }

      var hostnamesRegexp = stores.filter(function(hostname) {
          // Remove any host that contains a character that is not alphanumeric, a dash or dot.
          // Colons are not a valid hostname character, but included in case the shop runs on a special port.
          return !/[^a-z0-9\-.:]/i.test(hostname);
      }).join('|');
      var allowedTldsRegex = tlds.join('|').replace(/\./g, '\\.'); // escape dot's
      var pattern = new RegExp('https?://[^/]*(' + hostnamesRegexp + ')\\.(' + allowedTldsRegex + ')/.*');

      injectScript(pattern, stores);
    }
  }).get();
}

getStores();

var mod;
var lastPattern;
function injectScript(matchPattern, stores) {
  if (lastPattern === matchPattern) {
    return; // Pattern did not change, no need to update the PageMod
  }
  if (mod) {
    mod.destroy();
  }
  mod = pageMod.PageMod({
     include: matchPattern,
     contentScriptOptions: {stores: stores},
     contentScriptFile: "./contentscript.js",
     attachTo: 'top'
  });
}
