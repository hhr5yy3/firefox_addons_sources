class AutoClicker {
  constructor() {
    this.intervalList = [];
    this.lastMouseMoveEvent = null;
    this.indicator = document.createElement('div');
    this.indicator.id = 'ext-icon';

    const keyupEventListener = this.windowKeyupListener.bind(this);
    const windowMousemoveListener = this.windowMousemoveListener.bind(this);
    const getUserOptions = this.getUserOptions.bind(this);
    const storageOnChangedListener = this.storageOnChangedListener.bind(this);
    window.addEventListener('keydown', keyupEventListener);
    window.addEventListener('mousemove', windowMousemoveListener);
    browser.storage.sync.get('USER_OPTIONS', getUserOptions);
    browser.storage.onChanged.addListener(storageOnChangedListener);
  }

  _comparable(o) {
    return typeof o != 'object' || !o
      ? o
      : Object.keys(o)
          .sort()
          .reduce((c, key) => ((c[key] = this._comparable(o[key])), c), {});
  }

  getUserOptions(items) {
    const empty = !items || Object.keys(items).length === 0;
    if (empty) {
      browser.storage.sync.set({ USER_OPTIONS });
      this.USER_OPTIONS = USER_OPTIONS;
    } else {
      this.USER_OPTIONS = items.USER_OPTIONS;
    }
  }

  storageOnChangedListener(changes) {
    if (
      changes.USER_OPTIONS.newValue &&
      Object.keys(changes.USER_OPTIONS.newValue.length > 0)
    ) {
      Object.keys(changes.USER_OPTIONS.newValue).map((key) => {
        this.USER_OPTIONS[key] = changes.USER_OPTIONS.newValue[key];
      });
    }
  }

  windowMousemoveListener(event) {
    this.lastMouseMoveEvent = event;
  }

  eventPositionClicker(event, clickEvent) {
    return function () {
      const mouseEvent = new MouseEvent(clickEvent, {
        bubbles: true,
      });
      event.target.dispatchEvent(mouseEvent);
    };
  }

  showIndicator(event) {
    let domIndicator = document.getElementById('ext-icon');
    if (domIndicator === null) {
      domIndicator = document.body.appendChild(this.indicator);
    }
    domIndicator.style.top = `${event.pageY - 10}px`;
    domIndicator.style.left = `${event.pageX - 10}px`;
  }

  removeIndicator() {
    let domIndicator = document.getElementById('ext-icon');
    if (domIndicator) {
      domIndicator.remove();
    }
  }

  _runClicking(t) {
    let timeout = t * 1000;
    if (t === 0) timeout = 1;
    const event = this.lastMouseMoveEvent;
    this.showIndicator(event);
    this.eventPositionClicker(event, this.USER_OPTIONS.event)();
    const intervalNumber = window.setInterval(() => {
      this.eventPositionClicker(event, this.USER_OPTIONS.event)();
    }, timeout);
    this.intervalList.push(intervalNumber);
    const id = event.target.id ? `#${event.target.id}` : '';
    const className = event.target.className
      ? `.${event.target.className}`
      : '';
  }

  async _runScrolling(t) {
    let timeout = t * 1000;
    if (t === 0) timeout = 2000;
    const intervalNumber = window.setInterval(() => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }, timeout);
    this.intervalList.push(intervalNumber);
  }

  async start() {
    if (
      this.intervalList.length === 0 &&
      this.USER_OPTIONS.event !== 'scrolldown'
    ) {
      this._runClicking(0);
    } else {
      this._runScrolling(0);
    }
  }

  async startWithInterval() {
    let timeout = 0;
    if (this.intervalList.length === 0) {
      let { USER_OPTIONS } = await browser.storage.sync.get(['USER_OPTIONS']);
      timeout = USER_OPTIONS.interval;
      if (timeout === null) {
        return alert('No Interval Set!');
      }
      timeout = Number(timeout);
      if (isNaN(timeout)) {
        return alert('Please enter a number.');
      }
      if (timeout < 0) {
        return alert('Please enter at least 0.');
      }
      if (this.USER_OPTIONS.event !== 'scrolldown') this._runClicking(timeout);
      else this._runScrolling(timeout);
    }
  }

  stop() {
    if (this.intervalList.length > 0) {
      this.removeIndicator();
      this.intervalList.map((intervalNumber) =>
        window.clearInterval(intervalNumber)
      );
      this.intervalList = [];
    }
  }

  windowKeyupListener(event) {
    const { shiftKey, ctrlKey, altKey, metaKey, code } = event;
    const currentKeyEvent = { shiftKey, ctrlKey, altKey, metaKey, code };
    const keymap = this.USER_OPTIONS.keymap;
    for (const key in keymap) {
      if (keymap.hasOwnProperty(key)) {
        if (
          JSON.stringify(this._comparable(keymap[key])) ===
          JSON.stringify(this._comparable(currentKeyEvent))
        ) {
          this[key]();
        }
      }
    }
  }
}

new AutoClicker();
