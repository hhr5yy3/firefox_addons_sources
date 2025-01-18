let app = {};

app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};

if (!navigator.webdriver) {
  chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall");
  chrome.runtime.onInstalled.addListener(function (e) {
    chrome.management.getSelf(function (result) {
      if (result.installType === "normal") {
        if (e.reason === "install" || e.reason === "update") {
          var parameter = (e.previousVersion ? "&p=" + e.previousVersion : '') + "&type=" + e.reason;
          chrome.tabs.create({"active": true, "url": app.homepage() + "?v=" + app.version() + parameter});
        }
      }
    });
  });
}

app.printtopdf = function () {
  chrome.storage.local.get(null, function (storage) {
    var scaling = ("scaling" in storage) ? storage["scaling"] : 1;
    var marginTop = ("marginTop" in storage) ? storage["marginTop"] : 0.5;
    var paperWidth = ("paperWidth" in storage) ? storage["paperWidth"] : 8.5;
    var marginLeft = ("marginLeft" in storage) ? storage["marginLeft"] : 0.5;
    var headerLeft = ("headerLeft" in storage) ? storage["headerLeft"] : "&T";
    var orientation = ("orientation" in storage) ? storage["orientation"] : 0;
    var footerLeft = ("footerLeft" in storage) ? storage["footerLeft"] : "&PT";
    var paperHeight = ("paperHeight" in storage) ? storage["paperHeight"] : 11;
    var marginRight = ("marginRight" in storage) ? storage["marginRight"] : 0.5;
    var headerRight = ("headerRight" in storage) ? storage["headerRight"] : "&U";
    var footerRight = ("footerRight" in storage) ? storage["footerRight"] : "&D";
    var shrinkToFit = ("shrinkToFit" in storage) ? storage["shrinkToFit"] : true;
    var footerCenter = ("footerCenter" in storage) ? storage["footerCenter"] : '';
    var headerCenter = ("headerCenter" in storage) ? storage["headerCenter"] : '';
    var marginBottom = ("marginBottom" in storage) ? storage["marginBottom"] : 0.5;
    var paperSizeUnit = ("paperSizeUnit" in storage) ? storage["paperSizeUnit"] : 0;
    var showBackgroundColors = ("showBackgroundColors" in storage) ? storage["showBackgroundColors"] : false;
    var showBackgroundImages = ("showBackgroundImages" in storage) ? storage["showBackgroundImages"] : false;
    /*  */
    browser.tabs.saveAsPDF({
      "scaling": scaling,
      "marginTop": marginTop,
      "paperWidth": paperWidth,
      "marginLeft": marginLeft,
      "headerLeft": headerLeft,
      "orientation": orientation,
      "footerLeft": footerLeft,
      "paperHeight": paperHeight,
      "marginRight": marginRight,
      "headerRight": headerRight,
      "footerRight": footerRight,
      "shrinkToFit": shrinkToFit,
      "footerCenter": footerCenter,
      "headerCenter": headerCenter,
      "marginBottom": marginBottom,
      "paperSizeUnit": paperSizeUnit,
      "showBackgroundColors": showBackgroundColors,
      "showBackgroundImages": showBackgroundImages
    });
  });
};

chrome.browserAction.onClicked.addListener(app.printtopdf);

chrome.contextMenus.create({
  "contexts": ["page"],
  "title": "Print to PDF", 
  "onclick": app.printtopdf
});