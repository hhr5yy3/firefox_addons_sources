document.addEventListener("DOMContentLoaded", function() {

  browser.storage.onChanged.addListener(function (changes) {
    if (changes.hasOwnProperty('hasContainer')) {
      changeContainerSate(changes.hasContainer.newValue);
    }
  });

  browser.storage.sync.get(['hasContainer'], function (result) {
    changeContainerSate(result.hasOwnProperty('hasContainer') ? result.hasContainer : false)
  })
});


function changeContainerSate (state) {
  var img      = document.getElementById('state-image'),
      text     = document.getElementById('message'),
      stateImg = img.getAttribute('src').replace(/[^\/]+$/g, state ? 'container48.png' : 'no_container48.png');

  img.setAttribute('src', stateImg);
  text.innerText = 'Usb устройство с контейнером: ' + (state ? 'присутствует' : 'отсутствует');
}