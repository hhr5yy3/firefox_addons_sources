var load = function () {
  chrome.storage.local.get(null, function (e) {
    if ("width" in e && "height" in e) {
      document.body.style.width = e.width + "px";
      document.body.style.height = e.height + "px";
    }
  });
  /*  */
  window.removeEventListener("load", load, false);
  var iframe = document.getElementById("popup-iframe");
  if (iframe.src === "about:blank") iframe.src = "https://translate.google.com/";
};

window.addEventListener("load", load, false);
