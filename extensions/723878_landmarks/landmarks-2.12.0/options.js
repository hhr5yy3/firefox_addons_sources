(function () {
  "use strict";
  // http://tumble.jeremyhubert.com/post/7076881720
  // HT http://stackoverflow.com/questions/25467009/
  function translate() {
    for (const element of document.querySelectorAll("[data-message]")) {
      element.appendChild(
        document.createTextNode(
          browser.i18n.getMessage(element.dataset.message)
        )
      );
    }
  }

  // User preferences

  const defaultBorderSettings = Object.freeze({
    borderType: "momentary",
    borderColour: "#ff2f92",
    borderFontSize: "16",
  });
  const defaultInterfaceSettings = Object.freeze({
    interface: "popup",
  });
  const defaultFunctionalSettings = Object.freeze({
    guessLandmarks: true,
    closePopupOnActivate: false,
  });
  const defaultSettings = Object.freeze(
    Object.assign(
      {},
      defaultBorderSettings,
      defaultInterfaceSettings,
      defaultFunctionalSettings
    )
  );

  // Dismissal state of user interface messages

  const defaultDismissedSidebarNotAlone = Object.freeze({
    dismissedSidebarNotAlone: false,
  });
  const defaultDismissedUpdate = Object.freeze({
    dismissedUpdate: false,
  });
  const defaultDismissalStates = Object.freeze(
    Object.assign({}, defaultDismissedSidebarNotAlone, defaultDismissedUpdate)
  );
  // hasOwnProperty is only used on browser-provided objects

  // Options

  const options = [
    {
      name: "borderType",
      kind: "choice",
    },
    {
      name: "borderColour",
      kind: "individual",
      element: document.getElementById("border-colour"),
    },
    {
      name: "borderFontSize",
      kind: "individual",
      element: document.getElementById("border-font-size"),
    },
    {
      name: "guessLandmarks",
      kind: "boolean",
      element: document.getElementById("guess-landmarks"),
    },
    {
      name: "closePopupOnActivate",
      kind: "boolean",
      element: document.getElementById("close-popup-on-activate"),
    },
  ];
  function restoreOptions() {
    browser.storage.sync.get(defaultSettings, function (items) {
      for (const option of options) {
        const name = option.name;
        const saved = items[name];
        switch (option.kind) {
          case "choice":
            document.getElementById(`radio-${saved}`).checked = true;
            break;

          case "individual":
            option.element.value = saved;
            break;

          case "boolean":
            option.element.checked = saved;
            break;

          default:
            console.error(`Unexpected option kind '${option.kind}'`);
        }
      }
    });
  }
  function setUpOptionHandlers() {
    for (const option of options) {
      switch (option.kind) {
        case "individual":
          option.element.addEventListener("change", () => {
            option.element.value
              ? browser.storage.sync.set({
                  [option.name]: option.element.value,
                })
              : (option.element.value = defaultSettings[option.name]);
          });
          break;

        case "boolean":
          option.element.addEventListener("change", () => {
            browser.storage.sync.set({
              [option.name]: option.element.checked,
            });
          });
        // Choice (radio button) options are handled below.
      }
    }
    for (const radio of document.querySelectorAll('input[type="radio"]')) {
      radio.addEventListener("change", function () {
        const pref = this.parentElement.parentElement.getAttribute("data-pref");
        browser.storage.sync.set({
          [pref]: this.value,
        });
      });
    }
    document.getElementById("reset-messages").onclick = resetMessages;
    document.getElementById("reset-to-defaults").onclick = resetToDefaults;
  }
  function updateResetDismissedMessagesButtonState() {
    const button = document.getElementById("reset-messages");
    const feedback = document.getElementById("reset-messages-feedback");
    browser.storage.sync.get(defaultDismissalStates, function (items) {
      for (const dismissalState in items) {
        if (true === items[dismissalState]) {
          button.dataset.someMessagesDismissed = true;
          feedback.innerText = null;
          return;
        }
      }
      button.dataset.someMessagesDismissed = false;
      feedback.innerText ||
        (feedback.innerText = browser.i18n.getMessage(
          "prefsResetMessagesNone"
        ));
    });
  }
  function resetMessages() {
    if (this.dataset.someMessagesDismissed === String(true)) {
      browser.storage.sync.set(defaultDismissalStates);
      document.getElementById("reset-messages-feedback").innerText =
        browser.i18n.getMessage("prefsResetMessagesDone");
    }
  }
  function dismissalStateChanged(thingChanged) {
    return defaultDismissalStates.hasOwnProperty(thingChanged);
  }
  function resetToDefaults() {
    browser.storage.sync.clear();
    restoreOptions();
  }

  // Entryway

  function main() {
    options.push({
      name: "interface",
      kind: "choice",
    });
    updateResetDismissedMessagesButtonState();
    browser.storage.onChanged.addListener(function (changes) {
      Object.keys(changes).some(dismissalStateChanged) &&
        updateResetDismissedMessagesButtonState();
    });
    translate();
    restoreOptions();
    setUpOptionHandlers();
  }
  main();
})();
