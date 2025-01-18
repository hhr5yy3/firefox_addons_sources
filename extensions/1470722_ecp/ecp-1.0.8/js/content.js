/**
 * элемент указывающий на подключенное расширение
 * @type {string}
 */
var extensionCode = 'ecp-extension';

(function () {
  // получение евента со страницы
  window.addEventListener('message', function (ev) {
    if (ev.source != window)
      return;

    if (ev.data.type && (ev.data.type === "ecp")) {

      console.log("content.js - data from page:");
      console.log(ev.data.request);

      var objToBackground = {
        data: ev.data.request,
        cmd: ev.data.type
      };

      // отправка в background
      browser.runtime.sendMessage(objToBackground, callback);

      function callback (response) {
        console.log('content.js - response from background.js:');
        console.log(response);

        window.postMessage({
          type: "ext-response",
          req: response
        }, "*")
      }
    }
  });

  /**
   * Создает div для указании о том что расширение подключено
   */
  function initExt () {
    var el = document.createElement('div');
    el.setAttribute('id', extensionCode);
    document.body.appendChild(el);
  }

  initExt();
})();