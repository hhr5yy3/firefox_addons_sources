{
  let port;
  try {
    port = document.getElementById('wa-port');
    port.remove();
  }
  catch (e) {
    port = document.createElement('span');
    port.id = 'wa-port';
    document.documentElement.append(port);
  }

  Audio.prototype.play = new Proxy(Audio.prototype.play, {
    apply(target, self, args) {
      if (port.dataset.notification === 'granted') {
        return Reflect.apply(target, self, args);
      }
      else {
        console.info('sound playing is skipped');
        return Promise.resolve();
      }
    }
  });

  Object.defineProperty(Notification, 'permission', {
    enumerable: true,
    configurable: true,
    get() {
      return port.dataset.notification;
    }
  });

  let title = '';
  const dt = Object.getOwnPropertyDescriptor(Document.prototype, 'title');
  Object.defineProperty(document, 'title', {
    enumerable: true,
    configurable: true,
    get() {
      return title;
    },
    set(val) {
      title = val;
      dt.set.call(document, title);
      port.dispatchEvent(new CustomEvent('title-changed', {
        detail: title
      }));
    }
  });
}

