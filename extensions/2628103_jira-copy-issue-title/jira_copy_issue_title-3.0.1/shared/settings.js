class SettingsV2 {
  static async load() {
    const settings = await browser.storage.sync.get([
      "copyIssueTemplate",
      "copyIssueButtonTitle",
    ]);

    return Utils.filterEmptyEntries(settings);
  }

  static save(settings) {
    browser.storage.sync.set(settings);
  }
}

class SettingsV3 {
  static key = "cards";
  static defaults = {
    id: 1,
    issueTemplate: "<key>: <title>",
    buttonTitle: "",
  };

  static async load() {
    return browser.storage.sync.get([this.key]);
  }

  static save(settings = []) {
    browser.storage.sync.set({ [this.key]: settings });
  }
}

async function migrateSettingsFromV2ToV3() {
  const settingsV2 = await SettingsV2.load();
  const { copyIssueTemplate, copyIssueButtonTitle } = settingsV2;
  const result = Utils.isEmptyObject(settingsV2)
    ? {}
    : { issueTemplate: copyIssueTemplate, buttonTitle: copyIssueButtonTitle };

  return result;
}

async function loadSettings() {
  const settingsV3 = await SettingsV3.load();

  return settingsV3.cards?.length
    ? settingsV3.cards
    : [
        {
          ...SettingsV3.defaults,
          ...Utils.filterEmptyEntries(await migrateSettingsFromV2ToV3()),
        },
      ];
}

function saveSettings(cards = []) {
  SettingsV3.save(cards);
}
