/* Copyright (c) 2020 Andy McDonald. All rights reserved. */

/*jshint esversion: 6, module: true */

// ---------------------------------------------------------
const utils = window.foxclocks.utils;
// ---------------------------------------------------------
let _tz_db_source_version = null;
let _tz_db_update_check_timer_id = null;
let _init_state_promise = null;

// ---------------------------------------------------------
const normalizeTzDatabase = (tz_db) => {
  const keys = Object.keys(tz_db.zones);

  for (const tz_id of keys) {
    const zone = tz_db.zones[tz_id];

    if (zone.hasOwnProperty("alias_for")) {
      if (tz_db.zones.hasOwnProperty(zone.alias_for) === false) {
        utils.console.warn(
          "foxclocks.background.normalizeTzDatabase(): zone %s: cannot find aliased zone %s",
          tz_id,
          zone.alias_for
        );
        delete tz_db.zones[tz_id];
        continue;
      }

      const aliasedZone = tz_db.zones[zone.alias_for];

      if (
        zone.hasOwnProperty("transitions") === false &&
        aliasedZone.hasOwnProperty("transitions")
      )
        zone.transitions = utils.extend(true, [], aliasedZone.transitions);

      if (
        zone.hasOwnProperty("fixed") === false &&
        aliasedZone.hasOwnProperty("fixed")
      )
        zone.fixed = utils.extend(true, {}, aliasedZone.fixed);
    }
  }

  return tz_db;
};

// ---------------------------------------------------------
const parseZonePicker = (xml) => {
  if (typeof xml !== "object" || xml === null || xml.nodeType !== 1)
    return null;

  let json = null;

  if (xml.nodeName === "zonepicker") {
    json = [];
    let zonepickerChildNodeIndex = 0;

    for (let i = 0; i < xml.childNodes.length; i++) {
      const zonepickerChildNodeJson = parseZonePicker(xml.childNodes[i]);
      if (zonepickerChildNodeJson !== null)
        json[zonepickerChildNodeIndex++] = zonepickerChildNodeJson;
    }
  } else if (xml.nodeName === "Branch") {
    json = { text: xml.getAttribute("name"), children: [] };
    let branchChildNodeIndex = 0;

    for (let j = 0; j < xml.childNodes.length; j++) {
      const branchChildNodeJson = parseZonePicker(xml.childNodes[j]);
      if (branchChildNodeJson !== null)
        json.children[branchChildNodeIndex++] = branchChildNodeJson;
    }
  } else if (xml.nodeName === "Leaf") {
    json = {
      text: xml.getAttribute("name"),
      a_attr: { tz_id: xml.getAttribute("zone_id") },
    };

    const coords = xml.getAttribute("coords");

    if (coords !== null) json.a_attr.coords = coords;
    else if (
      xml.firstElementChild !== null &&
      xml.firstElementChild.nodeName === "Coordinates"
    )
      // legacy support - old-style zonepicker.xml
      json.a_attr.coords =
        xml.firstElementChild.getAttribute("latitude") +
        "," +
        xml.firstElementChild.getAttribute("longitude");
  }

  /*
	[
		{
			text: "Africa",
			children: [
				{
					text: "Countries",
					children: [

						{
							text: "Algeria",
							a_attr: {tz_id: "Africa/Algiers"}
						},
						{
							text: "Angola",
							a_attr: {tz_id: "Africa/Luanda"}
						}
					]
				}
				,
				{
					text: "Cities",
					children: []
				}
			]
		},
		{
			text: "Asia",
			children: []
		}
		,
		{
			text: "GMT/UTC",
			a_attr: {tz_id: "Etc/UTC", coords: "none"}
		}
	]
	*/

  return json;
};

// ---------------------------------------------------------
const compareVersions = (lhs, rhs) => {
  let retVal = 0;
  const lhsArray = lhs.split(".");
  const rhsArray = rhs.split(".");
  const maxLength = Math.max(lhsArray.length, rhsArray.length); // rather than hard-coding the documented 4

  for (let i = 0; retVal === 0 && i < maxLength; i++) {
    const l = lhsArray.length > i ? parseInt(lhsArray[i], 10) : 0;
    const r = rhsArray.length > i ? parseInt(rhsArray[i], 10) : 0;
    retVal = l > r ? 1 : l === r ? 0 : -1;
  }

  return retVal;
};

// ---------------------------------------------------------
const notifyDatabaseUpdated = (tz_db_source_version) => {
  try {
    utils.notifyUser(
      utils.getI18nMessage("extension_name"),
      utils.getI18nMessage("n_tz_db_updated_message", tz_db_source_version),
      utils.getI18nMessage("n_tz_db_updated_details"),
      utils.getExtensionUrl("images/icon128.png"),
      utils.getConfig("urls").tz_db
    );
  } catch (ex) {
    utils.console.warn("foxclocks.background.notifyDatabaseUpdated()", ex);
  }
};

// ---------------------------------------------------------
const checkForUpdate = () => {
  const nowEpoch = new Date().getTime();
  let remoteUrl = `${
    utils.getConfig("urls").tz_db_update_check
  }?client=${utils.getApplicationName()}&data_source_version=${_tz_db_source_version}&time=${nowEpoch}`;

  if (utils.getConfig("debug").test_tz_db_update_check === true)
    remoteUrl += "&test=true";

  utils.console.info("foxclocks.background.checkForUpdate(): url", remoteUrl);

  return utils
    .setStorage({ tz_db_last_update_check: nowEpoch })
    .then(() => fetch(encodeURI(remoteUrl)))
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);

      return response.json();
    })
    .then((updateResponse) => {
      return new Promise((resolve, reject) => {
        if (updateResponse.response_status.error === true) {
          reject("Server error");
        } else if (
          typeof updateResponse.tz_db !== "undefined" &&
          updateResponse.tz_db.source.version > _tz_db_source_version
        ) {
          utils
            .setStorage({ tz_db: normalizeTzDatabase(updateResponse.tz_db) })

            .then((storageObj) => {
              _tz_db_source_version = storageObj.tz_db.source.version;
              resolve(_tz_db_source_version);
              notifyDatabaseUpdated(_tz_db_source_version);
            })
            .catch((err) => reject("Failed to store time zone database"));
        } else if (
          utils.getConfig("debug").test_force_notify_tz_db_updated === true
        ) {
          const tz_db_source_version = "9999TEST_ONLY";
          resolve(tz_db_source_version);
          notifyDatabaseUpdated(tz_db_source_version);
        } else {
          resolve(null);
        }
      });
    })
    .then((newVersion) => {
      utils.console.log(
        "foxclocks.background.checkForUpdate(): done:",
        // prettier-ignore
        typeof newVersion === "string" ? `new version is ${newVersion}` : "no new version"
      );
      return newVersion;
    })
    .catch((err) => {
      utils.console.error(
        "foxclocks.background.checkForUpdate(): failed:",
        err
      );
      throw new Error("Database update check failed");
    });
};

// ---------------------------------------------------------
const setUpdateCheck = (lastUpdate = 0) => {
  if (_init_state_promise === null)
    // we've shutdown on startup failure, for example
    return;

  if (_tz_db_update_check_timer_id !== null)
    clearTimeout(_tz_db_update_check_timer_id);

  const millisToNextUpdate = Math.max(
    (lastUpdate !== null ? lastUpdate : 0) +
      utils.getConfig("tz_db_update_check_interval_millis") -
      new Date().getTime(),
    0
  );

  if (millisToNextUpdate > 0) {
    utils.console.info(
      "foxclocks.background.setUpdateCheck(): next update check at",
      new Date(new Date().getTime() + millisToNextUpdate).toString()
    );
    _tz_db_update_check_timer_id = setTimeout(
      checkForUpdate,
      millisToNextUpdate
    );
  } else {
    utils.console.info(
      "foxclocks.background.setUpdateCheck(): next update now"
    );
    checkForUpdate();
  }
};

// ---------------------------------------------------------
const onExtensionInstalled = (version) => {
  const onConfig = utils.getConfig("on_installed");

  if (onConfig.open_options === true)
    utils.openOptionsPage({ install_state: "new" });

  if (onConfig.open_web_url === true)
    utils.tabs.create({
      url: encodeURI(
        `${
          utils.getConfig("urls").extension_installed
        }?client=${utils.getApplicationName()}&version=${version}`
      ),
    });
};

// ---------------------------------------------------------
const onExtensionUpdated = (version, previousVersion) => {
  const onConfig = utils.getConfig("on_updated");

  if (onConfig.open_options === true)
    utils.openOptionsPage({ install_state: "updated" });

  if (onConfig.open_web_url === true)
    utils.tabs.create({
      url: encodeURI(
        `${
          utils.getConfig("urls").extension_updated
        }?client=${utils.getApplicationName()}&version=${version}&prev_version=${previousVersion}`
      ),
    });
};

// ---------------------------------------------------------
const onMessageEvent = (request, sender, sendResponse) => {
  if (_init_state_promise === null) {
    sendResponse(false);
    return;
  }

  _init_state_promise
    .then(() => {
      if (request.action === "init" || request.action === "ping") {
        sendResponse(true);
      } else if (request.action === "open_options") {
        utils.openOptionsPage();
        sendResponse(true);
      } else if (request.action === "update_tz_database") {
        checkForUpdate()
          .then((resolution) => sendResponse(resolution))
          .catch((err) => sendResponse(false));
      } else {
        sendResponse(false);
      }
    })
    .catch((err) => sendResponse(false));

  return true;
};

// ---------------------------------------------------------
const onStorageChangedEvent = (changes, namespace) => {
  if (typeof changes.tz_db_last_update_check !== "undefined")
    setUpdateCheck(changes.tz_db_last_update_check.newValue);

  if (typeof changes.config_override !== "undefined")
    utils.setConfig(changes.config_override.newValue);
};

//---------------------------------------------------------
const loadLocaleFiles = (uiLang, locale) => {
  const localeBase = utils.getExtensionUrl("_locales/") + locale;

  const getZonePicker = () => {
    return fetch(`${localeBase}/zonepicker.xml`)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);

        return response.text();
      })
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"));
  };

  const getTerritories = () => {
    return fetch(`${localeBase}/territories.json`).then((response) => {
      if (!response.ok) throw new Error(response.statusText);

      return response.json();
    });
  };

  return Promise.all([getZonePicker(), getTerritories()]).then(([zp, terr]) => {
    utils.console.log(
      "foxclocks.background.loadLocaleFiles(): loaded files for UI language %s from locale %s",
      uiLang,
      locale
    );

    return utils.setStorage({
      locale: {
        id: uiLang,
        zone_picker: parseZonePicker(zp.documentElement),
        territories:
          terr.main[Object.keys(terr.main)[0]].localeDisplayNames.territories,
      },
    });
  });
};

// ---------------------------------------------------------
const setLocale = (storedLocale) => {
  const uiLang = utils.getUILanguage();

  if (typeof storedLocale !== "undefined" && storedLocale.id === uiLang)
    return Promise.resolve();

  const uiLangCode = uiLang.split(/[\-_]/)[0];
  const defaultLocale = utils.getExtensionDefaultLocale();

  let loadPromise = loadLocaleFiles(uiLang, uiLang);

  if (uiLangCode !== uiLang)
    loadPromise = loadPromise.catch(() => loadLocaleFiles(uiLang, uiLangCode));

  if (defaultLocale !== uiLang && defaultLocale !== uiLangCode)
    loadPromise = loadPromise.catch(() =>
      loadLocaleFiles(uiLang, defaultLocale)
    );

  return loadPromise.catch((err) => {
    utils.console.error(
      "foxclocks.background.setLocale(): failed to load locale files. Giving up"
    );
    throw new Error("Failed to load locale files");
  });
};

//---------------------------------------------------------
const loadDatabase = (storedDatabase, lastUpdateCheck) => {
  let dbPromise = null;
  if (typeof storedDatabase !== "undefined") {
    dbPromise = Promise.resolve(storedDatabase.source.version);
  } else {
    dbPromise = fetch(utils.getExtensionUrl("data/zones.json"))
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);

        return response.json();
      })
      .then((tz_db) => utils.setStorage({ tz_db: normalizeTzDatabase(tz_db) }))
      .then((storageObj) => storageObj.tz_db.source.version);
  }

  return dbPromise
    .then((version) => {
      _tz_db_source_version = version;
      utils.console.info(
        "foxclocks.background.loadDatabase(): loaded time zone database from %s, version",
        typeof storedDatabase !== "undefined" ? "storage" : "file",
        _tz_db_source_version
      );
      setUpdateCheck(lastUpdateCheck);
    })
    .catch((err) => {
      utils.console.error(
        "foxclocks.background.loadDatabase(): failed to load and process time zone database"
      );
      throw new Error("Failed to load and process time zone database");
    });
};

// ---------------------------------------------------------
const init = () => {
  if (_init_state_promise !== null) return _init_state_promise;

  const startEpoch = new Date().getTime();
  const storageAll = [
    ...utils.getConfig("storage_sync"),
    ...utils.getConfig("storage_local"),
  ];
  const extensionVersion = utils.getExtensionVersion();
  let extensionPrevRunVersion = null;
  let installState = null;

  utils.console.info(
    "---------> foxclocks.background.init(): FoxClocks %s on %s. Initializing",
    extensionVersion,
    utils.getApplicationName()
  );

  _init_state_promise = utils
    .getStorage(storageAll)

    .then((storageItems) => {
      if (typeof storageItems.config_override !== "undefined")
        // ASAP
        utils.setConfig(storageItems.config_override);

      const debugConfig = utils.getConfig("debug");

      if (typeof storageItems.config_override !== "undefined")
        utils.console.warn(
          "foxclocks.background.init(): using config override",
          storageItems.config_override
        );

      if (Object.getOwnPropertyNames(debugConfig).length > 0)
        utils.console.warn(
          "foxclocks.background.init(): using debug settings",
          debugConfig
        );

      if (typeof debugConfig.test_previous_run_version !== "undefined")
        extensionPrevRunVersion = debugConfig.test_previous_run_version;
      else if (typeof storageItems.previous_run_version !== "undefined")
        extensionPrevRunVersion = storageItems.previous_run_version;

      const settingsToStore = { previous_run_version: extensionVersion };

      if (extensionPrevRunVersion === null) {
        installState = "new";

        // force reload - these wouldn't normally exist on a new install, but can in testing with test_previous_run_version === null
        //
        delete storageItems.locale;
        delete storageItems.tz_db;

        const defaults = utils.getConfig("defaults");

        for (const currStorageKey of storageAll) {
          if (typeof storageItems[currStorageKey] === "undefined") {
            const currStorageDefaultValue = defaults[currStorageKey];

            if (typeof currStorageDefaultValue !== "undefined")
              settingsToStore[currStorageKey] = currStorageDefaultValue;
          }
        }

        utils.console.info(
          "foxclocks.background.init(): new install, version",
          extensionVersion
        );
      } else if (
        compareVersions(extensionVersion, extensionPrevRunVersion) > 0
      ) {
        installState = "updated";
        delete storageItems.locale; // force reload
        delete storageItems.tz_db; // force reload

        utils.console.info(
          "foxclocks.background.init(): updated to version %s from version %s",
          extensionVersion,
          extensionPrevRunVersion
        );
      } else {
        installState = "normal";
      }

      utils.onMessage.addListener(onMessageEvent);
      utils.onStorageChanged.addListener(onStorageChangedEvent);

      return Promise.all([
        utils.setStorage(settingsToStore),
        setLocale(storageItems.locale),
        loadDatabase(storageItems.tz_db, storageItems.tz_db_last_update_check),
      ]);
    })
    .then(() => {
      if (installState === "new") onExtensionInstalled(extensionVersion);
      else if (installState === "updated")
        onExtensionUpdated(extensionVersion, extensionPrevRunVersion);

      utils.console.info(
        "<--------- foxclocks.background.init(): initialized in %sms",
        new Date().getTime() - startEpoch
      );
    })
    .catch((err) => {
      utils.console.error(
        "<--------- foxclocks.background.init(): failed in %sms",
        new Date().getTime() - startEpoch
      );
      throw new Error("FATAL: failed to initialize application");
    });

  return _init_state_promise;
};

// ---------------------------------------------------------
const shutdown = () => {
  if (_init_state_promise === null) return;

  if (_tz_db_update_check_timer_id !== null)
    clearTimeout(_tz_db_update_check_timer_id);

  utils.onMessage.removeListener(onMessageEvent);
  utils.onStorageChanged.removeListener(onStorageChangedEvent);

  _init_state_promise = null;

  utils.console.log("foxclocks.background.shutdown(): shut down done");
};

// ---------------------------------------------------------
// ENTRYPOINT
// ---------------------------------------------------------
init().catch((err) => shutdown());
