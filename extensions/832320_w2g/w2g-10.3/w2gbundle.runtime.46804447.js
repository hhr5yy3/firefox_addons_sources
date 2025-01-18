
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("5xVxF", function(module, exports) {

$parcel$export(module.exports, "register", function () { return $409cab704eb97965$export$6503ec6e8aabbaf; }, function (v) { return $409cab704eb97965$export$6503ec6e8aabbaf = v; });
var $409cab704eb97965$export$6503ec6e8aabbaf;
var $409cab704eb97965$export$f7ad0328861e2f03;
"use strict";
var $409cab704eb97965$var$mapping = new Map();
function $409cab704eb97965$var$register(baseUrl, manifest) {
    for(var i = 0; i < manifest.length - 1; i += 2)$409cab704eb97965$var$mapping.set(manifest[i], {
        baseUrl: baseUrl,
        path: manifest[i + 1]
    });
}
function $409cab704eb97965$var$resolve(id) {
    var resolved = $409cab704eb97965$var$mapping.get(id);
    if (resolved == null) throw new Error("Could not resolve bundle with id " + id);
    return new URL(resolved.path, resolved.baseUrl).toString();
}
$409cab704eb97965$export$6503ec6e8aabbaf = $409cab704eb97965$var$register;
$409cab704eb97965$export$f7ad0328861e2f03 = $409cab704eb97965$var$resolve;

});

var $c827c37806849e9b$exports = {};

(parcelRequire("5xVxF")).register(new URL("", import.meta.url).toString(), JSON.parse('["jVT4r","w2gbundle.dc79b58f.js","ePNFz","1.7774c926.png","9F498","w2gbundle.0cc61fc3.js","ecqxa","youtube-AT.c460f9f9.json","k0yLX","youtube-CA.34ecb1f4.json","6nEoI","youtube-DE.a8369814.json","g6s36","youtube-ES.f923d344.json","5ZQ74","youtube-FR.967d502d.json","2UEq2","youtube-GB.c908448f.json","5lGg3","youtube-IT.7fc9c01d.json","4ypDr","youtube-NL.18439e9c.json","dnrbc","youtube-PL.b07e9962.json","iIbPc","youtube-SE.41171058.json","3LOf8","youtube-US.e93c76d4.json","2C7fL","33.7a424336.png","bqqwa","2.bbd021da.png","3Wiop","35.679ead21.png","kP7Mr","34.ffe429f0.png","iGQyl","7.869c0e49.png","aXYrm","22.0838bc34.png","btOYw","20.948bb4f4.png","3h4H6","32.66d022f4.png","ecuZJ","19.4c018825.png","jg8Sk","37.86c31928.png","fExUZ","38.f4bdfac0.png","j6P2E","12.ab3da155.png","kpb9I","14.530ac3a6.png","cpVr2","36.f5f10f7d.png","6af19","13.6949acb8.png","hPq2C","11.805dd8a6.png","1xbYW","3.05e2000b.png","gWi0z","8.b856401a.png","ch83O","4.a429afec.png","hSd52","9.21cbda7c.png","cBJBS","15.0e1bebaf.png","3ppz9","30.2616e0d4.png","eyAA5","31.e70b3b01.png","7j0h7","28.3d98d00b.png","63bcY","23.012c986a.png","l1Y5b","24.1ec6ef2c.png","hbwft","10.fda3a601.png","Egxo7","w2gbundle.e917737a.js"]'));


