var background = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.method === id) tmp[id](request.data);
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"method": id, "data": data})}
  }
})();

var init = function (data) {
  var _mp4 = document.getElementById("mp4");
  var _flv = document.getElementById("flv");
  var _3gp = document.getElementById("3gp");
  var _m4a = document.getElementById("m4a");
  var _webm = document.getElementById("webm");
  var _support = document.getElementById("support");
  var _videoOnly = document.getElementById("video-only");
  var _audioOnly = document.getElementById("audio-only");
  var _saveAs = document.getElementById("save-as");
  /*  */
  _mp4.checked = data["mp4"];
  _flv.checked = data["flv"];
  _3gp.checked = data["3gp"];
  _m4a.checked = data["m4a"];
  _webm.checked = data["webm"];
  _audioOnly.checked = data["a"];
  _videoOnly.checked = data["v"];
  _saveAs.checked = data["saveAs"];
  _support.checked = data["support"];
  /*  */
  _mp4.addEventListener("click", function (e) {background.send('options:store-mp4', {"mp4": e.target.checked})});
  _flv.addEventListener("click", function (e) {background.send('options:store-flv', {"flv": e.target.checked})});
  _3gp.addEventListener("click", function (e) {background.send('options:store-3gp', {"3gp": e.target.checked})});
  _m4a.addEventListener("click", function (e) {background.send('options:store-m4a', {"m4a": e.target.checked})});
  _videoOnly.addEventListener("click", function (e) {background.send('options:store-v', {"v": e.target.checked})});
  _audioOnly.addEventListener("click", function (e) {background.send('options:store-a', {"a": e.target.checked})});
  _webm.addEventListener("click", function (e) {background.send('options:store-webm', {"webm": e.target.checked})});
  _saveAs.addEventListener("click", function (e) {background.send('options:save-as', {"saveAs": e.target.checked})});
  _support.addEventListener("click", function (e) {background.send('options:store-support', {"support": e.target.checked})});
};
/*  */
background.receive('options:storage', init);
background.send('options:load');