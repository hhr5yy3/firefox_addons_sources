/** @format */

document.addEventListener('DOMContentLoaded', function () {
  var action = 'video';
  var message = { action: action };

  chrome.runtime.sendMessage(message, function (response) {
    console.log(response);
    var channelUrl = response.channelUrl;
    var videoUrl = response.videoUrl;
    var category = response.category;
    var displayUrl = videoUrl || channelUrl;

    document.getElementsByClassName('url')[0].setAttribute('title', displayUrl);
    document.getElementsByClassName('url')[0].innerHTML =
      decodeURIComponent(displayUrl);
    document.getElementsByClassName('category')[0].innerHTML = category;
  });
});
