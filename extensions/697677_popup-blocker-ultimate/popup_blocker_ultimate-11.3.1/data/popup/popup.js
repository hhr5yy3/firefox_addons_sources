var toggle = function () {
    chrome.storage.local.get(null, function (o) {
    var status = ("statuspopup" in o) ? o["statuspopup"] : "babw";
	document.getElementById(status).checked = true;
  });
};
document.addEventListener("click", function (e) {
  var type = e.target ? e.target.dataset.type : null;
  if (type) chrome.runtime.sendMessage({"path": 'popup-to-background', "message": "type", "data": {"type": type}}, function () {});
});
toggle();