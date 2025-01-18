let down = false;
const CURRENT_USER_OPOTIONS = {
  event: 'click',
  keymap: {
    start: {
      ctrlKey: true,
      shiftKey: false,
      altKey: false,
      metaKey: false,
      code: 'Comma',
    },
    stop: {
      ctrlKey: true,
      shiftKey: false,
      altKey: false,
      metaKey: false,
      code: 'Period',
    },
    startWithInterval: {
      ctrlKey: true,
      shiftKey: false,
      altKey: true,
      metaKey: false,
      code: 'Comma',
    },
  },
};

const fetchUserOptions = () => {
  browser.storage.sync.get(['USER_OPTIONS'], (items) => {
    const empty =
      Object.keys(items).length === 0 && items.constructor === Object;
    if (empty) {
      browser.storage.sync.set({ USER_OPTIONS });
      CURRENT_USER_OPTIONS = USER_OPTIONS;
    } else {
      CURRENT_USER_OPTIONS = items.USER_OPTIONS;
    }
    document.querySelector(`select`).value = CURRENT_USER_OPTIONS.event;
    if (CURRENT_USER_OPTIONS.interval) {
      document.querySelector('#interval').value = CURRENT_USER_OPTIONS.interval;
    }
  });
};

const attachDocumentEventListeners = () => {
  document.addEventListener(
    'change',
    async (event) => {
      if (event.target.matches('[name="options"]')) {
        CURRENT_USER_OPOTIONS.event = event.target.value;
        browser.storage.sync.set({ USER_OPTIONS: CURRENT_USER_OPOTIONS });
      }
      if (event.target.matches('#interval')) {
        CURRENT_USER_OPTIONS.interval = Number(event.target.value);
        browser.storage.sync.set({ USER_OPTIONS: CURRENT_USER_OPTIONS });
      }
    },
    false
  );

  document.addEventListener(
    'keydown',
    async (event) => {
      if (down) {
        return false;
      }
      down = true;
    },
    false
  );

  document.addEventListener(
    'keyup',
    async (event) => {
      down = false;
    },
    false
  );
};

fetchUserOptions();
attachDocumentEventListeners();
