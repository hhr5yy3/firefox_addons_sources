import { objectWalk, sendBackgroundMessage } from './library.js';
import { renderContent } from './render.js';
import { initLocalization } from './resources.js';
import { locale_date } from './templates.js';
import { MessageTypes } from './types.js';
import { serialize as serializeForm } from './vendor/form-serialization.js';

function displayToastMessage({ success, failure, renderOptions }, callback = () => { }) {
  // Render submit result toast message
  renderContent(
    {
      contentType: 'options_toast',
      contentData: { success, failure },
      appearance: { selector: '#toast' },
    },
    renderOptions
  );

  // Close flash message in while
  const toast = document.querySelector('#toast');
  handleAuthideElements(toast, callback);
}

function handleAuthideElements(parent = document.body, callback) {
  const attribute = 'data-autohide';

  for (let element of parent.querySelectorAll(`[${attribute}]`)) {
    const interval = parseInt(element.getAttribute(attribute), 10);
    if (!isNaN(interval)) setTimeout(() => {
      element.style.visibility = "hidden";
      callback();
    }, interval);
  }
}


function handlePreferencesForm({ l }, callback) {
  let formValuesHasChanged = false;
  const defaults = {
    scanGoogle: 'off',
    scanHeureka: 'off',
    scanZbozi: 'off',
    scanSeznam: 'off'
  };

  document.body.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const serialized = serializeForm(event.target, { hash: true });
    const completed = { ...defaults, ...serialized };
    const preferences = objectWalk(completed, (val, prop, obj) => {
      if (val === "on") obj[prop] = true;
      if (val === "off") obj[prop] = false;
    });

    formValuesHasChanged = false;
    document.body.querySelector('form button[type="submit"]').setAttribute('disabled', 'disabled');
    callback(preferences);
  });

  document.body.addEventListener('change', event => {
    if (event.target.name !== 'blacklist-add-domain') {
      formValuesHasChanged = true;
      document.body.querySelector('form button[type="submit"]').removeAttribute('disabled');
    }
  });
  window.addEventListener('beforeunload', event => {
    if (formValuesHasChanged) {
      event.preventDefault();
      event.returnValue = '';
    }
  })
}

function handleClickAction({ action, l, renderOptions }) {
  switch (action) {
    case 'restore-extension': {
      if (!confirm(l('restore-extension-confirm'))) return;
      sendBackgroundMessage(MessageTypes.RESTORE_EXTENSION).then(() => {
        const success = l('restore-extension-complete');
        displayToastMessage({ success }, () => {
          window.location.reload();
        })
      });
      break;
    }

    case 'blacklist-add-domain': {
      const input = document.body.querySelector('input[name="blacklist-add-domain"]')
      const url = input.value;

      sendBackgroundMessage(MessageTypes.BLACKLIST_URL, { url }).then(({ payload }) => {
        if (!payload) {
          displayToastMessage({ failure: l('blacklist-add-error') });
          return;
        }

        input.value = '';

        const current = document.body.querySelector(`input[value="${payload.urlBase}"]`);
        if (current) {
          displayToastMessage({ success: l('blacklist-add-exists') });
          return;
        }

        const newIndex = document.querySelectorAll('#domain-preferences [data-url-base]').length;
        renderContent(
          {
            contentType: 'domain_preference',
            contentData: { ...payload, newIndex },
            appearance: { selector: '#domain-preferences', append: true },
          },
          renderOptions
        )
        displayToastMessage({ success: l('blacklist-add-complete') });
      });
      break;
    }

    case 'blacklist-remove-domain': {
      const { clickPayload: url } = event.target.dataset;
      sendBackgroundMessage(MessageTypes.BLACKLIST_REMOVE_URL, { url }).then(({ payload }) => {
        document.body.querySelector(`[data-url-base="${url}"]`).remove();
        displayToastMessage({ success: l('blacklist-remove-complete') });
      })
      break;
    }

    case 'refresh-feed': {
      sendBackgroundMessage(MessageTypes.REFRESH_FEED_REQUEST).then(({ payload }) => {
        displayToastMessage({ success: l('feed-refreshed') });
        const span = document.querySelector('#feed-updated-at-info');
        if (span && payload) span.innerText = locale_date(payload.loadedAt);
      })
      break;
    }

    default:
      console.warn(`Unknown UI action "${action}"`);
      return;
  }
}

(async () => {
  const { payload: { user, preferences } } = await sendBackgroundMessage(MessageTypes.BASIC_DATA_REQUEST);
  const { payload: feedMeta } = await sendBackgroundMessage(MessageTypes.FEED_META_REQUEST);
  const { payload: manifest } = await sendBackgroundMessage(MessageTypes.MANIFEST_REQUEST);

  const renderOptions = { locale: preferences.locale };
  const l = initLocalization(preferences.locale);

  // Render options page
  renderContent(
    {
      contentType: 'options_form',
      contentData: { user, preferences, feedMeta, manifest },
      appearance: { selector: '#content' },
    },
    renderOptions
  );

  // Handle changed options submit
  handlePreferencesForm({ l }, async (values) => {
    const {
      payload: { success, failure }
    } = await sendBackgroundMessage(MessageTypes.UPDATE_PREFERENCES_REQUEST, values);
    const toast = {
      success: success && l('settings-saved'),
      failure: failure && l('settings-save-error'),
      renderOptions
    };
    displayToastMessage(toast, () => {
      if (preferences.locale !== values.locale) {
        window.location.reload();
      }
    });

  });

  // Handle UI actions
  document.body.addEventListener('click', event => {
    if (event.target.href === '#') event.preventDefault();
    const { clickAction: action } = event.target.dataset;
    if (!action) return;

    handleClickAction({ action, l, renderOptions });
  });

})();

