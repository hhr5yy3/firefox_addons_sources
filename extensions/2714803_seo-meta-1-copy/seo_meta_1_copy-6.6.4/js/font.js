let version = -1;
function getManifestVer() {
  return chrome.runtime.getManifest().manifest_version;
}
function isV3() {
  if (version < 0) {
    version = getManifestVer();
  }
  return version === 3;
}
let path = "";
if (isV3()) {
  path = chrome.runtime.getURL("css/");
} else {
  path = chrome.extension.getURL("css/");
}
let fontFace = new FontFace("m-icon", "url(" + path + "fonts/m-icon.ttf?123456) format('truetype'), url(" + path + "fonts/m-icon.woff?123456) format('woff')", {style:"normal"});
fontFace.load().then(function(loadedFace) {
  document.fonts.add(loadedFace);
}).catch(function(e) {
  console.error("font load error...", e);
});

