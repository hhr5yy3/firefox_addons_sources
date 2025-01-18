$(document).ready(function() {
  var tellinks = document.querySelectorAll("a[href^='tel:']"),
    l = tellinks.length;

  for (var i = 0; i < l; ++i) {
    tellinks[i].addEventListener("click", function(evt) {
      browser.runtime.sendMessage({ selectionText: this.innerText });
      evt.preventDefault();
    });
  }
});
