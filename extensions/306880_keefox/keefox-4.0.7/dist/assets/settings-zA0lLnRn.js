import { $ as $$, a as $STR } from "./DollarPolyfills-DiqWGOUq.js";
import { c as configManager, K as KeeLog } from "./ConfigManager-DadTRJhU.js";
import { s as setup } from "./i18n-CWi2JcO5.js";
let siteModeAll = true;
let specificSite;
let searchResults;
async function setupPage() {
  await configManager.load();
  KeeLog.attachConfig(configManager.current);
  loadInitialConfig();
  [].forEach.call(
    $$(".siteSpecificToggle"),
    (node) => node.style.display = "none"
  );
  setupInputListeners();
  document.getElementById("i18n_root").style.display = "block";
}
function loadInitialConfig() {
  document.getElementById("pref_searchAllOpenDBs_label").checked = configManager.current.searchAllOpenDBs ? configManager.current.searchAllOpenDBs : null;
  document.getElementById("pref_autoFillFormsWithMultipleMatches_label").checked = configManager.current.autoFillFormsWithMultipleMatches ? configManager.current.autoFillFormsWithMultipleMatches : null;
  document.getElementById("pref_autoFillFieldsWithExistingValue_label").checked = configManager.current.autoFillFieldsWithExistingValue ? configManager.current.autoFillFieldsWithExistingValue : null;
  document.getElementById("pref_manualFillSubmitOverridable_label").checked = configManager.current.manualSubmitOverrideProhibited ? null : true;
  document.getElementById("pref_when_one_matching_network_login").checked = configManager.current.autoSubmitNetworkAuthWithSingleMatch ? configManager.current.autoSubmitNetworkAuthWithSingleMatch : null;
  document.getElementById("pref_saveFavicons_label").checked = configManager.current.saveFavicons ? configManager.current.saveFavicons : null;
  document.getElementById("pref_rememberMRUGroup_label").checked = configManager.current.rememberMRUGroup ? configManager.current.rememberMRUGroup : null;
  document.getElementById("pref_animateWhenOfferingSave_label").checked = configManager.current.animateWhenOfferingSave ? configManager.current.animateWhenOfferingSave : null;
  document.getElementById("pref_showConfirmationAfterSave_label").checked = !configManager.current.hideConfirmationAfterSave ? true : null;
  document.getElementById("pref_rememberMRUDB_label").checked = configManager.current.rememberMRUDB ? configManager.current.rememberMRUDB : null;
  document.getElementById("pref_when_kee_chooses_standard_form_desc").value = configManager.current.autoSubmitForms ? "FillAndSubmit" : configManager.current.autoFillForms ? "Fill" : "DoNothing";
  document.getElementById("pref_when_user_chooses_desc").value = configManager.current.autoSubmitMatchedForms ? "FillAndSubmit" : "Fill";
  document.getElementById("pref_logLevel_desc").value = stringFromLogLevel(
    configManager.current.logLevel
  );
  document.getElementById("pref_theme_desc").value = stringFromTheme(
    configManager.current.theme
  );
  document.getElementById("pref_currentSearchTermTimeout_label").value = configManager.current.currentSearchTermTimeout ? configManager.current.currentSearchTermTimeout.toString() : "";
  document.getElementById("pref_keePassRPCPort_label").value = configManager.current.KeePassRPCWebSocketPort ? configManager.current.KeePassRPCWebSocketPort.toString() : "";
  document.getElementById("pref_keePassDBToOpen_label").value = configManager.current.keePassDBToOpen;
  setSiteSpecificConfigValues();
}
function setupInputListeners() {
  document.getElementById("pref_searchAllOpenDBs_label").addEventListener("change", saveSearchAllOpenDBs);
  document.getElementById("pref_autoFillFormsWithMultipleMatches_label").addEventListener("change", saveAutoFillFormsWithMultipleMatches);
  document.getElementById("pref_autoFillFieldsWithExistingValue_label").addEventListener("change", saveAutoFillFieldsWithExistingValue);
  document.getElementById("pref_manualFillSubmitOverridable_label").addEventListener("change", saveManualSubmitOverrideProhibited);
  document.getElementById("pref_when_one_matching_network_login").addEventListener("change", saveAutoSubmitNetworkAuthWithSingleMatch);
  document.getElementById("pref_notifyBarRequestPasswordSave_label").addEventListener("change", saveOfferToSavePasswords);
  document.getElementById("requestPasswordSaveSelect").addEventListener("change", saveOfferToSavePasswords);
  document.getElementById("pref_listMatchingIgnoreCase_label").addEventListener("change", saveListMatchingIgnoreCase);
  document.getElementById("listMatchingIgnoreCaseSelect").addEventListener("change", saveListMatchingIgnoreCase);
  document.getElementById("pref_saveFavicons_label").addEventListener("change", saveSaveFavicons);
  document.getElementById("pref_rememberMRUGroup_label").addEventListener("change", saveRememberMRUGroup);
  document.getElementById("pref_animateWhenOfferingSave_label").addEventListener("change", saveAnimateWhenOfferingSaveUpdated);
  document.getElementById("pref_showConfirmationAfterSave_label").addEventListener("change", saveShowConfirmationAfterSaveUpdated);
  document.getElementById("pref_rememberMRUDB_label").addEventListener("change", saveRememberMRUDB);
  document.getElementById("pref_when_kee_chooses_standard_form_desc").addEventListener("change", saveWhenKeefoxChoosesStandardForm);
  document.getElementById("pref_when_user_chooses_desc").addEventListener("change", saveWhenUserChooses);
  document.getElementById("pref_logLevel_desc").addEventListener("change", saveLogLevel);
  document.getElementById("pref_currentSearchTermTimeout_label").addEventListener("change", saveCurrentSearchTermTimeout);
  document.getElementById("pref_keePassRPCPort_label").addEventListener("change", saveKPRPCPort);
  document.getElementById("pref_keePassDBToOpen_label").addEventListener("change", saveKPRPCDBToOpen);
  document.getElementById("siteOptionsModeAll").addEventListener("change", switchToAllSitesMode);
  document.getElementById("siteOptionsModeSpecific").addEventListener("change", switchToSpecificSitesMode);
  document.getElementById("siteChooserSearch").addEventListener("input", siteChooserKeyPress);
  document.getElementById("siteSearchClearButton").addEventListener("click", siteChooserClearSearch);
  document.getElementById("siteChooserForm").addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (document.getElementById("siteChooserSearch").value.length >= 2) {
      showSiteProperties();
    }
  });
  document.getElementById("siteAddButton").addEventListener("click", showSiteProperties);
  document.getElementById("siteEditButton").addEventListener("click", showSiteProperties);
  document.getElementById("siteDeleteButton").addEventListener("click", deleteSiteProperties);
  document.getElementById("sitePropertiesValue").addEventListener("change", sitePropertiesValueChanged);
  document.getElementById("sitePropertiesMethodExact").addEventListener("change", sitePropertiesMethodChanged);
  document.getElementById("sitePropertiesMethodPrefix").addEventListener("change", sitePropertiesMethodChanged);
  document.getElementById("sitePropertiesMethodRegex").addEventListener("change", sitePropertiesMethodChanged);
  document.querySelector("#sitePropertiesModal .modal-header button.close").addEventListener("click", closeSiteProperties);
  document.getElementById("sitePropertiesCancel").addEventListener("click", closeSiteProperties);
  document.getElementById("sitePropertiesSave").addEventListener("click", saveSiteProperties);
  for (const node of $$(".formFindingControlGroup")) {
    node.firstElementChild.firstElementChild.addEventListener(
      "change",
      formFindingControlGroupChange
    );
    node.firstElementChild.nextElementSibling.addEventListener(
      "change",
      changeSiteConfigFormFindingItem
    );
  }
  document.getElementById("pref_theme_desc").addEventListener("change", saveTheme);
}
function deleteSiteProperties() {
  if (specificSite) {
    const siteConfigLookup = configManager.siteConfigLookupFor(
      specificSite.target,
      specificSite.method
    );
    if (siteConfigLookup)
      delete siteConfigLookup[specificSite.value];
    configManager.save();
    siteChooserClearSearch();
  }
}
function showSiteProperties() {
  const valueElem = document.getElementById("sitePropertiesValue");
  valueElem.value = document.getElementById("siteChooserSearch").value;
  validateSitePropertiesValue();
  let radio = Array.from(document.querySelectorAll("#sitePropertiesTarget input"));
  const checkedTarget = specificSite ? specificSite.target : "Host";
  radio.forEach((r) => {
    if (r.value === checkedTarget)
      r.checked = true;
    else
      r.checked = null;
  });
  radio = Array.from(document.querySelectorAll("#sitePropertiesMethod input"));
  const checkedMethod = specificSite ? specificSite.method : "Exact";
  radio.forEach((r) => {
    if (r.value === checkedMethod)
      r.checked = true;
    else
      r.checked = null;
  });
  document.getElementById("sitePropertiesWeight").value = specificSite ? specificSite.matchWeight.toString() : "100";
  const modal = document.getElementById("sitePropertiesModal");
  modal.style.display = "block";
  modal.style.opacity = "1";
}
function closeSiteProperties() {
  const modal = document.getElementById("sitePropertiesModal");
  modal.style.opacity = "0";
  modal.style.display = "none";
}
function saveSiteProperties() {
  if (validateSitePropertiesValue()) {
    const value = document.getElementById("sitePropertiesValue").value;
    const weight = parseInt(
      document.getElementById("sitePropertiesWeight").value
    );
    let radio = Array.from(document.querySelectorAll("#sitePropertiesTarget input"));
    const target = radio.find((r) => r.checked).value;
    radio = Array.from(document.querySelectorAll("#sitePropertiesMethod input"));
    const method = radio.find((r) => r.checked).value;
    let siteConfig = {};
    if (specificSite) {
      siteConfig = specificSite.config;
      const siteConfigLookup = configManager.siteConfigLookupFor(
        specificSite.target,
        specificSite.method
      );
      if (siteConfigLookup)
        delete siteConfigLookup[specificSite.value];
    }
    specificSite = {
      value,
      matchWeight: weight,
      source: "User",
      target,
      method,
      config: siteConfig
    };
    const configLookup = configManager.siteConfigLookupFor(target, method);
    configLookup[value] = {
      config: siteConfig,
      source: "User",
      matchWeight: weight
    };
    configManager.save();
    closeSiteProperties();
    showSpecificSite();
  }
}
function sitePropertiesValueChanged() {
  validateSitePropertiesValue();
}
function sitePropertiesMethodChanged() {
  validateSitePropertiesValue();
}
function validateSitePropertiesValue() {
  let isValid = true;
  const saveButton = document.getElementById("sitePropertiesSave");
  const validation = document.getElementById("sitePropertiesValueValidation");
  if (document.getElementById("sitePropertiesMethodRegex").checked) {
    try {
      new RegExp(document.getElementById("sitePropertiesValue").value);
    } catch (e) {
      isValid = false;
    }
  }
  if (isValid) {
    saveButton.disabled = null;
    validation.innerText = "";
    validation.style.display = "none";
  } else {
    saveButton.disabled = true;
    validation.innerText = $STR("enter_valid_regex");
    validation.style.display = "block";
  }
  return isValid;
}
function formFindingControlGroupChange(e) {
  const targetCheckbox = e.target;
  const targetInput = targetCheckbox.parentElement.nextElementSibling;
  targetInput.disabled = !targetCheckbox.checked;
  if (targetCheckbox.checked)
    return changeSiteConfigFormFindingItem(null, targetInput);
  let siteConfig;
  if (siteModeAll) {
    siteConfig = configManager.current.siteConfig.pageRegex["^.*$"].config;
  } else {
    const siteConfigLookup = configManager.siteConfigLookupFor(
      specificSite.target,
      specificSite.method
    );
    siteConfig = siteConfigLookup[specificSite.value].config;
  }
  switch (targetInput.id) {
    case "sssWhiteFormName":
      if (siteConfig.whiteList && siteConfig.whiteList.form && siteConfig.whiteList.form.names) {
        delete siteConfig.whiteList.form.names;
        if (!siteConfig.whiteList.form.ids) {
          delete siteConfig.whiteList.form;
          if (!siteConfig.whiteList.fields && !siteConfig.whiteList.querySelectors) {
            delete siteConfig.whiteList;
          }
        }
      }
      break;
    case "sssWhiteFormId":
      if (siteConfig.whiteList && siteConfig.whiteList.form && siteConfig.whiteList.form.ids) {
        delete siteConfig.whiteList.form.ids;
        if (!siteConfig.whiteList.form.names) {
          delete siteConfig.whiteList.form;
          if (!siteConfig.whiteList.fields && !siteConfig.whiteList.querySelectors) {
            delete siteConfig.whiteList;
          }
        }
      }
      break;
    case "sssWhiteFieldName":
      if (siteConfig.whiteList && siteConfig.whiteList.fields && siteConfig.whiteList.fields.names) {
        delete siteConfig.whiteList.fields.names;
        if (!siteConfig.whiteList.fields.ids) {
          delete siteConfig.whiteList.fields;
          if (!siteConfig.whiteList.fields && !siteConfig.whiteList.querySelectors) {
            delete siteConfig.whiteList;
          }
        }
      }
      break;
    case "sssWhiteFieldId":
      if (siteConfig.whiteList && siteConfig.whiteList.fields && siteConfig.whiteList.fields.ids) {
        delete siteConfig.whiteList.fields.ids;
        if (!siteConfig.whiteList.fields.names) {
          delete siteConfig.whiteList.fields;
          if (!siteConfig.whiteList.fields && !siteConfig.whiteList.querySelectors) {
            delete siteConfig.whiteList;
          }
        }
      }
      break;
    case "sssBlackFormName":
      if (siteConfig.blackList && siteConfig.blackList.form && siteConfig.blackList.form.names) {
        delete siteConfig.blackList.form.names;
        if (!siteConfig.blackList.form.ids) {
          delete siteConfig.blackList.form;
          if (!siteConfig.blackList.fields && !siteConfig.blackList.querySelectors) {
            delete siteConfig.blackList;
          }
        }
      }
      break;
    case "sssBlackFormId":
      if (siteConfig.blackList && siteConfig.blackList.form && siteConfig.blackList.form.ids) {
        delete siteConfig.blackList.form.ids;
        if (!siteConfig.blackList.form.names) {
          delete siteConfig.blackList.form;
          if (!siteConfig.blackList.fields && !siteConfig.blackList.querySelectors) {
            delete siteConfig.blackList;
          }
        }
      }
      break;
    case "sssBlackFieldName":
      if (siteConfig.blackList && siteConfig.blackList.fields && siteConfig.blackList.fields.names) {
        delete siteConfig.blackList.fields.names;
        if (!siteConfig.blackList.fields.ids) {
          delete siteConfig.blackList.fields;
          if (!siteConfig.blackList.fields && !siteConfig.blackList.querySelectors) {
            delete siteConfig.blackList;
          }
        }
      }
      break;
    case "sssBlackFieldId":
      if (siteConfig.blackList && siteConfig.blackList.fields && siteConfig.blackList.fields.ids) {
        delete siteConfig.blackList.fields.ids;
        if (!siteConfig.blackList.fields.names) {
          delete siteConfig.blackList.fields;
          if (!siteConfig.blackList.fields && !siteConfig.blackList.querySelectors) {
            delete siteConfig.blackList;
          }
        }
      }
      break;
  }
  configManager.save();
}
function changeSiteConfigFormFindingItem(e, targetInput) {
  if (!targetInput)
    targetInput = e.target;
  const values = targetInput.value ? targetInput.value.split(",") : [];
  let siteConfig;
  if (siteModeAll) {
    siteConfig = configManager.current.siteConfig.pageRegex["^.*$"].config;
  } else {
    const siteConfigLookup = configManager.siteConfigLookupFor(
      specificSite.target,
      specificSite.method
    );
    siteConfig = siteConfigLookup[specificSite.value].config;
    siteConfigLookup[specificSite.value].source = "User";
  }
  switch (targetInput.id) {
    case "sssWhiteFormName":
      if (!siteConfig.whiteList)
        siteConfig.whiteList = {};
      if (!siteConfig.whiteList.form)
        siteConfig.whiteList.form = {};
      siteConfig.whiteList.form.names = values.filter((v) => v.length > 0);
      break;
    case "sssWhiteFormId":
      if (!siteConfig.whiteList)
        siteConfig.whiteList = {};
      if (!siteConfig.whiteList.form)
        siteConfig.whiteList.form = {};
      siteConfig.whiteList.form.ids = values.filter((v) => v.length > 0);
      break;
    case "sssWhiteFieldName":
      if (!siteConfig.whiteList)
        siteConfig.whiteList = {};
      if (!siteConfig.whiteList.fields)
        siteConfig.whiteList.fields = {};
      siteConfig.whiteList.fields.names = values.filter((v) => v.length > 0);
      break;
    case "sssWhiteFieldId":
      if (!siteConfig.whiteList)
        siteConfig.whiteList = {};
      if (!siteConfig.whiteList.fields)
        siteConfig.whiteList.fields = {};
      siteConfig.whiteList.fields.ids = values.filter((v) => v.length > 0);
      break;
    case "sssBlackFormName":
      if (!siteConfig.blackList)
        siteConfig.blackList = {};
      if (!siteConfig.blackList.form)
        siteConfig.blackList.form = {};
      siteConfig.blackList.form.names = values.filter((v) => v.length > 0);
      break;
    case "sssBlackFormId":
      if (!siteConfig.blackList)
        siteConfig.blackList = {};
      if (!siteConfig.blackList.form)
        siteConfig.blackList.form = {};
      siteConfig.blackList.form.ids = values.filter((v) => v.length > 0);
      break;
    case "sssBlackFieldName":
      if (!siteConfig.blackList)
        siteConfig.blackList = {};
      if (!siteConfig.blackList.fields)
        siteConfig.blackList.fields = {};
      siteConfig.blackList.fields.names = values.filter((v) => v.length > 0);
      break;
    case "sssBlackFieldId":
      if (!siteConfig.blackList)
        siteConfig.blackList = {};
      if (!siteConfig.blackList.fields)
        siteConfig.blackList.fields = {};
      siteConfig.blackList.fields.ids = values.filter((v) => v.length > 0);
      break;
  }
  configManager.save();
}
function setupFormFindingSetting(id, enabled, values) {
  const inputBox = document.getElementById(id);
  const enablingCheckbox = inputBox.parentElement.firstElementChild.firstElementChild;
  inputBox.value = values.join();
  inputBox.disabled = enabled ? null : true;
  enablingCheckbox.checked = enabled ? true : null;
}
function setSiteSpecificConfigValues() {
  const siteConfig = siteModeAll ? configManager.current.siteConfig.pageRegex["^.*$"].config : specificSite.config;
  if (siteModeAll) {
    document.getElementById("pref_notifyBarRequestPasswordSave_label").checked = siteConfig.preventSaveNotification === true ? null : true;
    document.getElementById("pref_listMatchingIgnoreCase_label").checked = siteConfig.listMatchingCaseSensitive === true ? null : true;
  } else {
    const save = siteConfig.preventSaveNotification === true ? "No" : siteConfig.preventSaveNotification === false ? "Yes" : "Inherit";
    document.getElementById("requestPasswordSaveSelect").value = save;
    const ignoreCase = siteConfig.listMatchingCaseSensitive === true ? "No" : siteConfig.listMatchingCaseSensitive === false ? "Yes" : "Inherit";
    document.getElementById("listMatchingIgnoreCaseSelect").value = ignoreCase;
  }
  let enabled;
  enabled = siteConfig.whiteList && siteConfig.whiteList.form && siteConfig.whiteList.form.names ? true : false;
  setupFormFindingSetting(
    "sssWhiteFormName",
    enabled,
    enabled ? siteConfig.whiteList.form.names : []
  );
  enabled = siteConfig.whiteList && siteConfig.whiteList.form && siteConfig.whiteList.form.ids ? true : false;
  setupFormFindingSetting(
    "sssWhiteFormId",
    enabled,
    enabled ? siteConfig.whiteList.form.ids : []
  );
  enabled = siteConfig.whiteList && siteConfig.whiteList.fields && siteConfig.whiteList.fields.names ? true : false;
  setupFormFindingSetting(
    "sssWhiteFieldName",
    enabled,
    enabled ? siteConfig.whiteList.fields.names : []
  );
  enabled = siteConfig.whiteList && siteConfig.whiteList.fields && siteConfig.whiteList.fields.ids ? true : false;
  setupFormFindingSetting(
    "sssWhiteFieldId",
    enabled,
    enabled ? siteConfig.whiteList.fields.ids : []
  );
  enabled = siteConfig.blackList && siteConfig.blackList.form && siteConfig.blackList.form.names ? true : false;
  setupFormFindingSetting(
    "sssBlackFormName",
    enabled,
    enabled ? siteConfig.blackList.form.names : []
  );
  enabled = siteConfig.blackList && siteConfig.blackList.form && siteConfig.blackList.form.ids ? true : false;
  setupFormFindingSetting(
    "sssBlackFormId",
    enabled,
    enabled ? siteConfig.blackList.form.ids : []
  );
  enabled = siteConfig.blackList && siteConfig.blackList.fields && siteConfig.blackList.fields.names ? true : false;
  setupFormFindingSetting(
    "sssBlackFieldName",
    enabled,
    enabled ? siteConfig.blackList.fields.names : []
  );
  enabled = siteConfig.blackList && siteConfig.blackList.fields && siteConfig.blackList.fields.ids ? true : false;
  setupFormFindingSetting(
    "sssBlackFieldId",
    enabled,
    enabled ? siteConfig.blackList.fields.ids : []
  );
}
function switchToAllSitesMode(e) {
  e.preventDefault();
  if (e.target.checked) {
    siteModeAll = true;
    specificSite = null;
    document.getElementById("siteChooser").style.display = "none";
    document.getElementById("siteList").style.display = "none";
    document.getElementById("siteAddButton").style.display = "none";
    document.getElementById("siteEditButton").style.display = "none";
    document.getElementById("siteDeleteButton").style.display = "none";
    document.getElementById("hiddenOptionsPresent").style.display = "none";
    document.getElementById("siteSearchClearButton").style.display = "none";
    document.getElementById("settings").style.display = "block";
    document.getElementById("panelFindingEntries").style.display = "block";
    document.getElementById("panelFillingEntries").style.display = "block";
    document.getElementById("panelNetworkAuthentication").style.display = "block";
    document.getElementById("panelLogging").style.display = "block";
    document.getElementById("panelAppearance").style.display = "block";
    document.getElementById("panelAdvanced").style.display = "block";
    [].forEach.call(
      $$(".siteSpecificToggle"),
      (node) => node.style.display = "none"
    );
    [].forEach.call(
      $$(".nonSiteSpecificField"),
      (node) => node.style.display = null
    );
    document.getElementById("siteChooserSearch").value = "";
    setSiteSpecificConfigValues();
  }
}
function switchToSpecificSitesMode(e) {
  e.preventDefault();
  if (e.target.checked) {
    siteModeAll = false;
    document.getElementById("siteChooser").style.display = "block";
    document.getElementById("settings").style.display = "none";
    document.getElementById("panelFindingEntries").style.display = "none";
    document.getElementById("panelFillingEntries").style.display = "none";
    document.getElementById("panelNetworkAuthentication").style.display = "none";
    document.getElementById("panelLogging").style.display = "none";
    document.getElementById("panelAppearance").style.display = "none";
    document.getElementById("panelAdvanced").style.display = "none";
    [].forEach.call(
      $$(".siteSpecificToggle"),
      (node) => node.style.display = null
    );
    [].forEach.call(
      $$(".nonSiteSpecificField"),
      (node) => node.style.display = "none"
    );
    showSiteList("");
    document.getElementById("siteChooserSearch").focus();
  }
}
function siteChooserKeyPress() {
  const searchTerm = document.getElementById("siteChooserSearch").value;
  document.getElementById("settings").style.display = "none";
  document.getElementById("siteList").style.display = "none";
  document.getElementById("siteAddButton").style.display = "none";
  document.getElementById("siteEditButton").style.display = "none";
  document.getElementById("siteDeleteButton").style.display = "none";
  specificSite = null;
  if (searchTerm.length < 1) {
    document.getElementById("siteSearchClearButton").style.display = "none";
    return;
  } else {
    document.getElementById("siteSearchClearButton").style.display = "block";
  }
  showSiteList(searchTerm);
  if (searchResults.length == 0) {
    document.getElementById("siteAddButton").style.display = "block";
    return;
  } else if (searchResults.length == 1 && searchResults[0].value == searchTerm) {
    selectSite(0);
    return;
  }
}
function selectSite(searchResultIndex) {
  specificSite = searchResults[searchResultIndex];
  showSpecificSite();
}
function showSpecificSite() {
  document.getElementById("siteAddButton").style.display = "none";
  document.getElementById("siteList").style.display = "none";
  document.getElementById("siteEditButton").style.display = specificSite.source === "Auto" ? "none" : "block";
  document.getElementById("siteDeleteButton").style.display = specificSite.source === "Auto" ? "none" : "block";
  document.getElementById("hiddenOptionsPresent").style.display = specificSite.source === "Auto" ? "block" : "none";
  document.getElementById("siteSearchClearButton").style.display = "block";
  document.getElementById("siteChooserSearch").value = specificSite.value;
  document.getElementById("settings").style.display = "block";
  setSiteSpecificConfigValues();
}
function siteChooserClearSearch() {
  document.getElementById("siteChooserSearch").value = "";
  document.getElementById("siteSearchClearButton").style.display = "none";
  document.getElementById("siteAddButton").style.display = "none";
  document.getElementById("siteEditButton").style.display = "none";
  document.getElementById("siteDeleteButton").style.display = "none";
  document.getElementById("hiddenOptionsPresent").style.display = "none";
  document.getElementById("settings").style.display = "none";
  document.getElementById("siteChooserSearch").focus();
  showSiteList("");
}
function showSiteList(filterTerm) {
  searchResults = findMatchingSiteConfigValues(filterTerm);
  document.querySelector("#siteListResults > tbody").textContent = "";
  for (const resultIndex in searchResults) {
    const tr = document.createElement("tr");
    const a = document.createElement("a");
    a.href = "#";
    a.innerText = searchResults[resultIndex].value;
    const td = document.createElement("td");
    td.addEventListener("click", () => selectSite(resultIndex));
    td.appendChild(a);
    tr.appendChild(td);
    const td2 = document.createElement("td");
    td2.innerText = searchResults[resultIndex].target;
    tr.appendChild(td2);
    const td3 = document.createElement("td");
    td3.innerText = searchResults[resultIndex].method;
    tr.appendChild(td3);
    const td4 = document.createElement("td");
    td4.innerText = searchResults[resultIndex].matchWeight.toString();
    tr.appendChild(td4);
    document.querySelector("#siteListResults > tbody").appendChild(tr);
  }
  document.getElementById("siteList").style.display = "block";
  return searchResults;
}
function findMatchingSiteConfigValues(searchTerm) {
  const results = [];
  if (configManager.current.siteConfig.domainExact) {
    findSiteConfigValues(
      searchTerm,
      results,
      configManager.current.siteConfig.domainExact,
      "Domain",
      "Exact"
    );
  }
  if (configManager.current.siteConfig.domainPrefix) {
    findSiteConfigValues(
      searchTerm,
      results,
      configManager.current.siteConfig.domainPrefix,
      "Domain",
      "Prefix"
    );
  }
  if (configManager.current.siteConfig.domainRegex) {
    findSiteConfigValues(
      searchTerm,
      results,
      configManager.current.siteConfig.domainRegex,
      "Domain",
      "Regex"
    );
  }
  if (configManager.current.siteConfig.hostExact) {
    findSiteConfigValues(
      searchTerm,
      results,
      configManager.current.siteConfig.hostExact,
      "Host",
      "Exact"
    );
  }
  if (configManager.current.siteConfig.hostPrefix) {
    findSiteConfigValues(
      searchTerm,
      results,
      configManager.current.siteConfig.hostPrefix,
      "Host",
      "Prefix"
    );
  }
  if (configManager.current.siteConfig.hostRegex) {
    findSiteConfigValues(
      searchTerm,
      results,
      configManager.current.siteConfig.hostRegex,
      "Host",
      "Regex"
    );
  }
  if (configManager.current.siteConfig.pageExact) {
    findSiteConfigValues(
      searchTerm,
      results,
      configManager.current.siteConfig.pageExact,
      "Page",
      "Exact"
    );
  }
  if (configManager.current.siteConfig.pagePrefix) {
    findSiteConfigValues(
      searchTerm,
      results,
      configManager.current.siteConfig.pagePrefix,
      "Page",
      "Prefix"
    );
  }
  if (configManager.current.siteConfig.pageRegex) {
    findSiteConfigValues(
      searchTerm,
      results,
      configManager.current.siteConfig.pageRegex,
      "Page",
      "Regex"
    );
  }
  return results.sort((r1, r2) => r1.value.localeCompare(r2.value));
}
function findSiteConfigValues(searchTerm, results, lookup, target, method) {
  for (const siteConfigNodeIndex in lookup) {
    if (siteConfigNodeIndex !== "^.*$" && siteConfigNodeIndex.startsWith(searchTerm)) {
      results.push(
        Object.assign(
          {
            value: siteConfigNodeIndex,
            target,
            method
          },
          lookup[siteConfigNodeIndex]
        )
      );
    }
  }
}
function saveSearchAllOpenDBs(e) {
  e.preventDefault();
  configManager.setASAP({
    searchAllOpenDBs: document.getElementById("pref_searchAllOpenDBs_label").checked
  });
}
function saveAutoFillFormsWithMultipleMatches(e) {
  e.preventDefault();
  configManager.setASAP({
    autoFillFormsWithMultipleMatches: document.getElementById(
      "pref_autoFillFormsWithMultipleMatches_label"
    ).checked
  });
}
function saveAutoFillFieldsWithExistingValue(e) {
  e.preventDefault();
  configManager.setASAP({
    autoFillFieldsWithExistingValue: document.getElementById(
      "pref_autoFillFieldsWithExistingValue_label"
    ).checked
  });
}
function saveManualSubmitOverrideProhibited(e) {
  e.preventDefault();
  configManager.setASAP({
    manualSubmitOverrideProhibited: !document.getElementById("pref_manualFillSubmitOverridable_label").checked
  });
}
function saveAutoSubmitNetworkAuthWithSingleMatch(e) {
  e.preventDefault();
  configManager.setASAP({
    autoSubmitNetworkAuthWithSingleMatch: document.getElementById("pref_when_one_matching_network_login").checked
  });
}
function saveOfferToSavePasswords(e) {
  e.preventDefault();
  if (siteModeAll) {
    const save = document.getElementById("pref_notifyBarRequestPasswordSave_label").checked;
    configManager.current.siteConfig.pageRegex["^.*$"].config.preventSaveNotification = !save;
  } else {
    const value = document.getElementById("requestPasswordSaveSelect").value;
    const preventSave = value === "Inherit" ? null : value == "No" ? true : false;
    const siteConfigLookup = configManager.siteConfigLookupFor(
      specificSite.target,
      specificSite.method
    );
    siteConfigLookup[specificSite.value].config.preventSaveNotification = preventSave;
    siteConfigLookup[specificSite.value].source = "User";
  }
  configManager.save();
}
function saveListMatchingIgnoreCase(e) {
  e.preventDefault();
  if (siteModeAll) {
    const ignoreCase = document.getElementById("pref_listMatchingIgnoreCase_label").checked;
    configManager.current.siteConfig.pageRegex["^.*$"].config.listMatchingCaseSensitive = !ignoreCase;
  } else {
    const value = document.getElementById("listMatchingIgnoreCaseSelect").value;
    const caseSensitive = value === "Inherit" ? null : value == "No" ? true : false;
    const siteConfigLookup = configManager.siteConfigLookupFor(
      specificSite.target,
      specificSite.method
    );
    siteConfigLookup[specificSite.value].config.listMatchingCaseSensitive = caseSensitive;
    siteConfigLookup[specificSite.value].source = "User";
  }
  configManager.save();
}
function saveSaveFavicons(e) {
  e.preventDefault();
  configManager.setASAP({
    saveFavicons: document.getElementById("pref_saveFavicons_label").checked
  });
}
function saveRememberMRUGroup(e) {
  e.preventDefault();
  configManager.setASAP({
    rememberMRUGroup: document.getElementById("pref_rememberMRUGroup_label").checked
  });
}
function saveAnimateWhenOfferingSaveUpdated(e) {
  e.preventDefault();
  configManager.setASAP({
    animateWhenOfferingSave: document.getElementById("pref_animateWhenOfferingSave_label").checked
  });
}
function saveShowConfirmationAfterSaveUpdated(e) {
  e.preventDefault();
  configManager.setASAP({
    hideConfirmationAfterSave: !document.getElementById("pref_showConfirmationAfterSave_label").checked
  });
}
function saveRememberMRUDB(e) {
  e.preventDefault();
  configManager.setASAP({
    rememberMRUDB: document.getElementById("pref_rememberMRUDB_label").checked
  });
}
function saveWhenKeefoxChoosesStandardForm(e) {
  e.preventDefault();
  const selectedValue = document.getElementById("pref_when_kee_chooses_standard_form_desc").value;
  configManager.setASAP({ autoFillForms: selectedValue != "DoNothing" });
  configManager.setASAP({
    autoSubmitForms: selectedValue == "FillAndSubmit"
  });
}
function saveWhenUserChooses(e) {
  e.preventDefault();
  const selectedValue = document.getElementById("pref_when_user_chooses_desc").value;
  configManager.setASAP({
    autoSubmitMatchedForms: selectedValue == "FillAndSubmit"
  });
}
function saveLogLevel(e) {
  e.preventDefault();
  const selectedValue = document.getElementById("pref_logLevel_desc").value;
  configManager.setASAP({ logLevel: logLevelFromString(selectedValue) });
}
function saveTheme(e) {
  e.preventDefault();
  const selectedValue = document.getElementById("pref_theme_desc").value;
  configManager.setASAP({ theme: themeFromString(selectedValue) });
}
function saveCurrentSearchTermTimeout(e) {
  e.preventDefault();
  configManager.setASAP({
    currentSearchTermTimeout: parseInt(
      document.getElementById("pref_currentSearchTermTimeout_label").value
    )
  });
}
function saveKPRPCPort(e) {
  e.preventDefault();
  configManager.current.KeePassRPCWebSocketPort = parseInt(
    document.getElementById("pref_keePassRPCPort_label").value
  );
  configManager.save().then(() => chrome.runtime.sendMessage({ action: "KPRPC_Port_Change" }));
}
function saveKPRPCDBToOpen(e) {
  e.preventDefault();
  configManager.setASAP({
    keePassDBToOpen: document.getElementById("pref_keePassDBToOpen_label").value
  });
}
function themeFromString(theme) {
  if (!theme)
    return null;
  return theme;
}
function stringFromTheme(theme) {
  if (!theme)
    return "";
  return theme;
}
function logLevelFromString(level) {
  switch (level) {
    case "Debugging":
      return 4;
    case "Information":
      return 3;
    case "Warnings":
      return 2;
    case "Errors":
      return 1;
    default:
      return 0;
  }
}
function stringFromLogLevel(level) {
  switch (level) {
    case 4:
      return "Debugging";
    case 3:
      return "Information";
    case 2:
      return "Warnings";
    case 1:
      return "Errors";
    default:
      return "Internal error - report to Kee team";
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", async () => await setupPage());
} else {
  (async () => {
    await setupPage();
  })();
}
setup();
//# sourceMappingURL=settings-zA0lLnRn.js.map
