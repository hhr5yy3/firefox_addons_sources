(function () {
  var errorCodes = {
    "err_no_storage": 'Отсутствует usb устройство или на устройстве отсутсвует ключ',
    "err_no_struct": 'Запрос неверной структуры (json формат  ключи command, data, req_id, password)',
    "err_no_sign": 'Внутренняя ошибка при подписи буфера',
    "err_no_pass": 'Неверный пароль ключа',
    "err_no_crt": 'В ключе отсутсвует сертификат (заявка не подтверждена)',
    "err_no_after_crt": 'Истекла дата действие сертификата',
    "err_no_memory": 'Ошибка выделения памяти (в системе нет свободной памяти)',
    "err_no_command": 'Неверная команда',
  };


  var processing = false;
  /**
   * Открытый порт
   */
  var port;

  /**
   * Возвращает открытый порт
   * @param name
   * @return {chrome.runtime.Port}
   */
  function openPort (name) {
    port = browser.runtime.connectNative(name);
    return port;
  }


  browser.runtime
      .onMessage
      .addListener(function (request, sender, sendResponse) {
        console.log('background.js - incoming data from content.js:');
        console.log(request);


        if (request.data && request.cmd === 'ecp') {
          openPort(request.cmd);

          if (port) {
            // on native app events
            port.onDisconnect.addListener(function () {
              console.log("Disconnected");
            });
            port.onMessage.addListener(function (nativeResponse) {
              console.log("background.js - data received from native: ");
              console.log(nativeResponse);

              sendResponse(getResponseData(nativeResponse));
              return true;
            });

            sendMessage(request.data);
          }

        }
        return true;
      });

  /**
   * евенты отключение и подключение носителей
   */
  // browser.storage.onAttached.addListener(checkContainerOnAttachDetach);
  //
  // browser.storage.onDetached.addListener(checkContainerOnAttachDetach);


  /**
   * Инициализирует евенты проверки контейнера на открытом порте
   */
  function initAttachDetachListenersForStateCheck () {
    // при сообщении от порта
    port.onMessage.addListener(function (nativeResponse) {
      console.log(nativeResponse);
      if (!processing) {
        processing = true;
        if (nativeResponse.hasOwnProperty('code')) {
          browser.storage.sync.set({ hasContainer: nativeResponse.code === 'ok' }, function () {
            processing = false;

            afterContainerStateCheck();
          });
        }
      }
      return true;
    });
    // при отключении от порта
    port.onDisconnect.addListener(function () {
      console.log("Disconnected");
      return true;
    });
  }

  /**
   * Проверка наличия контейнера
   */
  function checkContainerState () {
    if (openPort('ecp')) {
      initAttachDetachListenersForStateCheck();
      sendMessage({ command: "state", data: "", password: "", req_id: "" });
    }
  }

  function checkContainerOnAttachDetach (storage) {
    if ((typeof storage == 'string' || storage.capacity > 0)) checkContainerState();
  }

  function afterContainerStateCheck () {
    // browser.storage.sync.get(['hasContainer'], function (result) {
    //   if (result && result.hasOwnProperty('hasContainer')) {
    //     // browser.browserAction.setBadgeBackgroundColor({ color: '#5f9bff' });
    //     // browser.browserAction.setBadgeText({ text: result.hasContainer ? '✓' : '' })
    //   }
    //   console.log(result);
    // });
  }


  /**
   * Отправка дынных в native app
   * @param data
   */
  function sendMessage (data) {
    try {
      console.log('background.js - trying to send data to exe file:');
      // если команда не обозначена, то выбирается команда подписи
      if (!data.hasOwnProperty('command')) data['command'] = 'sign';
      // отправка
      port.postMessage(data);
    } catch (e) {
      console.log('background.js - can\'t send data, error:');
      console.error(e)
    }
  }

  function getResponseData (resp) {
    if ((resp.hasError = resp.code !== 'ok')) {
      resp.error = getError(resp.code);
    }
    return resp;
  }

  function getError (code) {
    return errorCodes[code];
  }

  /**
   * Проверяет наличие контейнера при запуски браузера
   */
  checkContainerState();

})();