{
  let port;
  try {
    port = document.getElementById('mea0dUui');
    port.remove();
  }
  catch (e) {
    port = document.createElement('span');
    port.id = 'mea0dUui';
    document.documentElement.append(port);
  }

  let script = '';
  const observe = e => {
    const s = document.createElement('script');
    s.evt = e;
    s.evt = e;
    try { // Firefox
      s.wrappedJSObject.evt = e;
    }
    catch (e) {}
    s.textContent = script;
    document.documentElement.append(s);
    s.remove();
    if (s.dataset.block === 'true' && s.dataset.url) {
      port.dispatchEvent(new CustomEvent('request', {
        detail: {
          url: s.dataset.url,
          close: s.dataset.close === 'true'
        }
      }));
    }
  };
  port.addEventListener('changed', e => {
    script = e.detail.script;

    removeEventListener('click', observe, true);
    if (script) {
      addEventListener('click', observe, true);
    }
  });
}
