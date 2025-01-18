/**
 * Listen OnInstalled event message.
 * Communicate it to page script.
*/
browser.runtime.onMessage.addListener(request => {
    window.postMessage({
      direction: 'from-content-script',
      message: request.msg
    }, '*');
});

/**
 * Add 'search_plugin_added' class to body.
*/
document.body.classList.add('search_plugin_added');

(function () {
  const u = new URL(document.URL);
  if (u.hostname !== 'add.startpage.com'
      || !u.pathname.endsWith('/success/')) return;

  const store = window.localStorage;
  let fields;
  try {
    fields = JSON.parse(store.getItem('extMeta')) || {};
  } catch(ex) {
    fields = {};
  }
  const data = {
    event: 'spcontentpl',
    campaign: fields.campaign,
    date: fields.date,
    source: fields.source,
    live: true,
  };
  browser.runtime.sendMessage(data);
  store.setItem('extLoaded', 'true');
})();
