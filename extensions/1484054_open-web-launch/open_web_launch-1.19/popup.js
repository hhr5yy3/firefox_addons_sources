document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.getBackgroundPage(function(backgroundWindow) {
    backgroundWindow
      .checkMessagingHost()
      .then(() => document.querySelector('.message-box-installed').style.display = 'flex')
      .catch(e => {
        document.querySelector('.message-box-installed').style.display = 'none';
        document.querySelector('.message-box-not-installed').style.display = 'flex';
        document.querySelector('.message-box-download').style.display = 'flex';
        document.querySelector('.message-box-download>.icon').addEventListener('click', download, false);
      });
  });
});


