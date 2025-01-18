
self.importScripts(
      "./lib/common.js",
      "./background/storage.js",
      "./background/setup.js",
      "./background/imageconverter.js"
);

//other script must be loaded first before starting
self.importScripts("./background/background.js");