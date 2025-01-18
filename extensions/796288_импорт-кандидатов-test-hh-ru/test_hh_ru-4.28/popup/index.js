(function() {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1254003
  // Подключаем скрипт на страницу
  chrome.runtime.sendMessage({ action: 'popupOpened' });

  const ACTIONS = {
    // сохранение скрипта делаем через onMessage,
    // так как к моменту готовности страницы, резюме может быть еще не готово
    saveResume: (request) => {
      if (request && request.data.to === 'iframe') {
        iframe.contentWindow.postMessage(JSON.stringify(request.data), '*');
      }
    },
  };

  const iframe = document.createElement('iframe');
  const body = document.querySelector('body');
  const loader = document.querySelector('.js-loader')
  const globalFailure = document.querySelector('.js-global-failure')
  const beforeLoadContent = document.querySelector('.js-content')

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!request.action || !ACTIONS[request.action]) {
      return;
    }

    ACTIONS[request.action](request, sender, sendResponse);
    return true;
  });

  window.addEventListener('message', (event) => {
    let eventData;
    try {
      eventData = JSON.parse(event.originalEvent ? event.originalEvent.data : event.data);
    } catch (e) {
      eventData = event.originalEvent ? event.originalEvent.data : event.data;
    }

    if (eventData && eventData.type) {
      if (eventData.type === 'HHTms-Init') {
        iframe.dataset.init = 'init';
        iframe.style.display = 'block';
        iframe.style.visibility = 'visible';
      }

      // переходный период со старого на новый плагин
      if (eventData === 'HHTms-ClosePopup' || eventData.type === 'HHTms-ClosePopup') {
        window.close();
        return;
      }

      if (eventData.type === 'HHTms-fix-height') {
        document.documentElement.style.height = eventData.height + 'px';
        return;
      }

      if (eventData.type === 'HHTms-Page-Loaded') {
        beforeLoadContent.style.display = 'none';
        return;
      }

      // Если получили любой action кроме закрытия — транслируем его до entry.js
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.tabs.sendMessage(tab.id, { action: eventData.type });
      });
    }
  });

  iframe.onload = () => {
    setTimeout(async () => {
      if (!iframe.dataset.init) {
        globalFailure.style.display = 'block';
        loader.style.display = 'none';
        iframe.style.display = 'none';

        const report = {
          type: 'iframe-failure',
        }
        await fetch('https://talantix.ru/ats/extension/error/report', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(report),
        })
      }
    }, 1000);
  }

  // timeout нужен, чтобы не забить event loop и чтобы отрисовать пользователю лоадер
  setTimeout(() => {
    iframe.setAttribute('src', 'https://talantix.ru/ats/extension/new/import');
    body.appendChild(iframe);
  }, 50);
})();
