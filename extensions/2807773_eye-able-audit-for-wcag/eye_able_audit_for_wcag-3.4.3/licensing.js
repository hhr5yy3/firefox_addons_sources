let eyeAble_settings = {};

function initLang() {
    //internationalization
    let texts = document.querySelectorAll("[eALangID]");
    for (let i = 0; i < texts.length; i++) {
        if (eyeAble_settings.lang) {
            document.documentElement.lang = eyeAble_settings.lang;
            texts[i].textContent = getMessage(texts[i].getAttribute("ealangid"));
        } else {
            document.documentElement.lang = chrome.i18n.getUILanguage();
            texts[i].textContent = chrome.i18n.getMessage(texts[i].getAttribute("ealangid"));
        }
    }

    let elements = document.querySelectorAll("[eaAriaLangID]");
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("aria-label", getMessage(elements[i].getAttribute("eaAriaLangID")));
    }
}

function getMessage(name) {
    if (eyeAble_settings && eyeAble_settings.lang) {
        document.documentElement.lang = eyeAble_settings.lang;
        try {
            if (eyeAble_settings.lang === "de") {
                return eyeAbleAudit_de[name]["message"];
            } else if (eyeAble_settings.lang === "nl") {
                return eyeAbleAudit_nl[name]["message"];
            } else if (eyeAble_settings.lang === "es") {
                return eyeAbleAudit_es[name]["message"];
            } else if (eyeAble_settings.lang === "fr") {
                return eyeAbleAudit_fr[name]["message"];
            } else if (eyeAble_settings.lang === "it") {
                return eyeAbleAudit_it[name]["message"];
            } else if (eyeAble_settings.lang === "pl") {
                return eyeAbleAudit_pl[name]["message"];
            } else if (eyeAble_settings.lang === "pt") {
                return eyeAbleAudit_pt[name]["message"];
            } else if (eyeAble_settings.lang === "zh") {
                return eyeAbleAudit_zh[name]["message"];
            } else {
                return eyeAbleAudit_en[name]["message"];
            }
        } catch (e) {
            console.log(name, e);
            return "";
        }
    } else {
        return chrome.i18n.getMessage(name);
    }
}

const severityMap = {
    4: getMessage("4Txt"), //"Nicht erfüllt"
    3: getMessage("3Txt"),
    2: getMessage("2Txt"),
    1: getMessage("1Txt"),
    0: getMessage("0Txt")
}

//get the previous settings
chrome.storage.local.get(["eyeAble_Settings"], function (result) {
    if (result.eyeAble_Settings) {
        eyeAble_settings = result.eyeAble_Settings;
        initLicensing();
    } else {
        //set the default settings
        //largerPopup is only valid in the Popup but not in Eye-Able
        chrome.storage.local.set({eyeAble_Settings: {}}, function () {
            initLicensing();
        });
    }
});

/**
 * Add new css Rule to existing stylesheet
 * @param sheet
 * @param selector
 * @param rules
 * @param index
 */
function addCSSRule(sheet, selector, rules, index) {
    if ("insertRule" in sheet) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    } else if ("addRule" in sheet) {
        sheet.addRule(selector, rules, index);
    }
}

/**
 * Returns the reference path to all files
 * @returns {string|*}
 */
function getHomePath() {
    if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
        return chrome.runtime.getURL('');
    }
    return "https://cdn.eye-able.com/auditDemoAssets/";
}

function initLicensing() {
    initLang();

    /**
     * Show a warning to the user
     * @param text
     */
    function displayKeyWarning(text) {
        document.getElementById("keyWarning").innerText = text;
        document.getElementById("keyWarning").style.display = "block";
    }

    /**
     * Saves new licenses to the storage and triggers an display update
     * @param data
     */
    function saveLicenseData(data) {
        console.log("Received Licenses: ", data);
        if (data.length > 0) {
            eyeAble_settings["licenses"] = data;
            chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
                updateLicenses();
            });
        } else {
            displayKeyWarning(getMessage("licenseTableNonFound"));
        }
    }

    /**
     * Displays availabale licenses in the tabel
     */
    function updateLicenses() {
        if (eyeAble_settings.licenses && eyeAble_settings.licenses.length > 0) {
            let table = document.getElementById("licensesTable");

            //remove rows
            let rows = table.querySelectorAll("tr:not(#topLevelTable)");
            for (let i = 0; i < rows.length; i++) {
                rows[i].remove();
            }
            //add new licenses
            for (let i = 0; i < eyeAble_settings.licenses.length; i++) {
                let endDate = eyeAble_settings.licenses[i].endDate.split("T")[0];

                //if the license is more than 1 year in the future, it is a full license
                if (new Date(endDate) > new Date(new Date().setFullYear(new Date().getFullYear() + 1))) {
                    endDate = getMessage("fullLicenseText");
                }

                //if the license is expired, mark it expired
                if (new Date(endDate) < new Date()) {
                    endDate = "<strong style='color:red'>" + endDate + "</strong>";
                }

                let row = "" + "<tr>" + "    <td>" + eyeAble_settings.licenses[i].domains + "</td>" + "    <td>" + endDate + "</td>";
                ("</tr>");
                table.children[0].insertAdjacentHTML("beforeend", row);
            }
        }
    }

  function getUserData(userKey) {
    fetch("https://api.eye-able.com/user?adminApiKey=" + userKey + "&apiKey=" + userKey)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data[0]);
            chrome.storage.local.set({ eyeAble_User: data[0] }, function () {
              updateLicenses();
            });
            console.log(data);
          });
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

    /**
   * Gets licenses from the api using the apiKey that is input on the website
     */
  function getLicensesFromAPI() {
    let apiKey = document.getElementById("apiKeyInput").value;
    if (apiKey.length !== 16) {
      displayKeyWarning(getMessage("licenseWrongKey"));
    } else {
      fetch("https://api.eye-able.com/checkerLicense?apiKey=" + apiKey)
        .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        displayKeyWarning(getMessage("licenseSuccess"));
              eyeAble_settings["apiKey"] = apiKey;
                        saveLicenseData(data);
              getUserData(apiKey);
                    });
                } else if (response.status === 500) {
                    displayKeyWarning(getMessage("licenseErrorAPI"));
                } else {
                    displayKeyWarning(getMessage("licenseErrorNoUser"));
            console.log(response);
                }
            }).catch((error) => {
                displayKeyWarning(getMessage("licenseErrorNoUser"));
          console.log(error);
            });
        }

    }

  //show the current apiKey
  if (eyeAble_settings.apiKey) {
    document.getElementById("apiKeyInput").value = eyeAble_settings.apiKey;
    }
    updateLicenses();

    let fontStyle = (function () {
        // Create the <style> tag
        let style = document.createElement("style");

        // WebKit hack :(
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    })();
    addCSSRule(fontStyle, "@font-face", "font-family: 'Open Sans - Regular'; src : url(" + getHomePath() + "public/font/open-sans-v18-latin-regular.woff2) format('woff2'); font-weight: 400; font-style: normal");

    //auto run audit settings
    if (!eyeAble_settings.autoRunAudit) {
        eyeAble_settings.autoRunAudit = false;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    }
    if (eyeAble_settings.autoRunAudit) {
        document.getElementById("autoAuditSetting").checked = true;
    }
    document.getElementById("autoAuditSetting").addEventListener("change", function () {
        eyeAble_settings.autoRunAudit = document.getElementById("autoAuditSetting").checked;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    });

    //sr FFocus audit settings
    if (!eyeAble_settings.srFocusMode) {
        eyeAble_settings.srFocusMode = false;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    }
    if (eyeAble_settings.srFocusMode) {
        document.getElementById("srHighlightAuditSetting").checked = true;
    }
    document.getElementById("srHighlightAuditSetting").addEventListener("change", function () {
        eyeAble_settings.srFocusMode = document.getElementById("srHighlightAuditSetting").checked;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    });

    //disable alfa settings
    if (!eyeAble_settings.disableAlfa) {
        eyeAble_settings.disableAlfa = false;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    }
    if (eyeAble_settings.disableAlfa) {
        document.getElementById("alfaDisableAuditSetting").checked = true;
    }
    document.getElementById("alfaDisableAuditSetting").addEventListener("change", function () {
        eyeAble_settings.disableAlfa = document.getElementById("alfaDisableAuditSetting").checked;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    });

    //hide icon settings
    if (!eyeAble_settings.hideIcon && eyeAble_settings.hideIcon !== false) {
        eyeAble_settings.hideIcon = false;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    }
    if (eyeAble_settings.hideIcon) {
        document.getElementById("hideIconSetting").checked = true;
    }
    document.getElementById("hideIconSetting").addEventListener("change", function () {
        eyeAble_settings.hideIcon = document.getElementById("hideIconSetting").checked;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    });

    //error markup settings
    if (!eyeAble_settings.showMarkup && eyeAble_settings.showMarkup !== false) {
        eyeAble_settings.showMarkup = true;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    }
    if (eyeAble_settings.showMarkup) {
        document.getElementById("markupSetting").checked = true;
    }
    document.getElementById("markupSetting").addEventListener("change", function () {
        eyeAble_settings.showMarkup = document.getElementById("markupSetting").checked;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    });

    //language settings
    if (!eyeAble_settings.lang) {
        eyeAble_settings.lang = chrome.i18n.getUILanguage();
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    }

    //select language in select
    //Get the select element by it's unique ID.
    let selectElement = document.getElementById("langSetting");
    //Get the options.
    let selectOptions = selectElement.options;
    //Loop through these options using a for loop.
    for (let opt, j = 0; (opt = selectOptions[j]); j++) {
        //If the option of value is equal to the option we want to select.
        if (eyeAble_settings.lang.toLowerCase().includes(opt.value)) {
            //Select the option and break out of the for loop.
            selectElement.selectedIndex = j;
            break;
        }
    }

    //responsibility selection
    if (typeof eyeAble_settings.activeCategories === "undefined") {
        //setup as all active
        eyeAble_settings.activeCategories = ["code", "design", "content"];
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    }

    //setup active states and listeners
    if (!eyeAble_settings.activeCategories.includes("code")) {
        document.getElementById("codeSetting").checked = false;
    }
    document.getElementById("codeSetting").addEventListener("change", function () {
        if (document.getElementById("codeSetting").checked && !eyeAble_settings.activeCategories.includes("code")) {
            eyeAble_settings.activeCategories.push("code");
        } else {
            const index = eyeAble_settings.activeCategories.indexOf("code");
            eyeAble_settings.activeCategories.splice(index, 1);
        }
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    });
    if (!eyeAble_settings.activeCategories.includes("design")) {
        document.getElementById("designSetting").checked = false;
    }
    document.getElementById("designSetting").addEventListener("change", function () {
        if (document.getElementById("designSetting").checked && !eyeAble_settings.activeCategories.includes("design")) {
            eyeAble_settings.activeCategories.push("design");
        } else {
            const index = eyeAble_settings.activeCategories.indexOf("design");
            eyeAble_settings.activeCategories.splice(index, 1);
        }
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    });
    if (!eyeAble_settings.activeCategories.includes("content")) {
        document.getElementById("contentSetting").checked = false;
    }
    document.getElementById("contentSetting").addEventListener("change", function () {
        if (document.getElementById("contentSetting").checked && !eyeAble_settings.activeCategories.includes("content")) {
            eyeAble_settings.activeCategories.push("content");
        } else {
            const index = eyeAble_settings.activeCategories.indexOf("content");
            eyeAble_settings.activeCategories.splice(index, 1);
        }
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
        });
    });

    //css selector
    if (eyeAble_settings.skipElementsSelector) {
        document.getElementById("skipSelectorSetting").value = eyeAble_settings.skipElementsSelector;
    }
    document.getElementById("skipSelectorSetting").addEventListener("change", function () {
        if (document.getElementById("skipSelectorSetting").value) {
            eyeAble_settings.skipElementsSelector = document.getElementById("skipSelectorSetting").value;
        } else {
            eyeAble_settings.skipElementsSelector = "";
        }

        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
            console.log(eyeAble_settings);
        });
    });

    document.getElementById("langSetting").addEventListener("change", function () {
        eyeAble_settings.lang = document.getElementById("langSetting").value;
        chrome.storage.local.set({eyeAble_Settings: eyeAble_settings}, function () {
            initLang();
        });
    });

    document.getElementById("saveSettings").addEventListener("click", function () {
    //eyeAble_settings.reloadPage = true;
    chrome.storage.local.set({ eyeAble_Settings: eyeAble_settings }, function () {});
        });

  document.getElementById("getLicenses").addEventListener("click", getLicensesFromAPI);

  //show admin menu if an admin key is stored
  chrome.storage.local.get("eyeAble_User", function (result) {
    console.log(result);
    if (result && result.eyeAble_User && result.eyeAble_User.role === "admin") {
      document.getElementById("admin_menu").style.display = "block";
    }
    });

  //create new user using the Eye-ABle API
  document.getElementById("createUser").addEventListener("click", function () {
    //get data from input form
    let form = document.querySelector("#userData");
    let data = Object.fromEntries(new FormData(form).entries());
    let apiKey = document.getElementById("apiKeyInput").value;
    console.log(data, apiKey);

    document.getElementById("apiUpDiv").style.background = "red";

    fetch("https://api.eye-able.com/user?adminApiKey=" + apiKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          document.getElementById("apiUpDiv").style.background = "green";
        } else {
          document.getElementById("apiUpDiv").style.background = "red";
        }
        res.json().then((json) => {
          console.log("Success:", json);
          document.getElementById("apiFeedbackTxt").innerText = res.status + ":\n" + JSON.stringify(json, null, 2);
          document.getElementById("newUserKey").value = json.user[0];
          //directly get the user id from the api
          getUserAPI();
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("apiUpDiv").style.background = "red";
      });
  });

  //checks api uptime
  document.getElementById("checkApiButton").addEventListener("click", function () {
    fetch("https://api.eye-able.com/")
      .then((res) => {
        if (res.ok) {
          document.getElementById("apiUpDiv").style.background = "green";
        } else {
          document.getElementById("apiUpDiv").style.background = "red";
        }
        res.json().then((json) => {
          document.getElementById("apiFeedbackTxt").innerText = res.status + ":\n" + JSON.stringify(json, null, 2);
        });
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("apiUpDiv").style.background = "red";
      });
  });

  function getUserAPI() {
    let apiKey = document.getElementById("apiKeyInput").value;
    let userKey = document.getElementById("newUserKey").value;
    if (!apiKey || !userKey) {
      document.getElementById("apiFeedbackTxt").innerText = "Please input apiKeys, admin and user";
      return;
    }

    fetch("https://api.eye-able.com/user?adminApiKey=" + apiKey + "&apiKey=" + userKey)
      .then((res) => {
        if (res.ok) {
          document.getElementById("apiUpDiv").style.background = "green";
        } else {
          document.getElementById("apiUpDiv").style.background = "red";
        }
        res.json().then((json) => {
          document.getElementById("apiFeedbackTxt").innerText = res.status + ":\n" + JSON.stringify(json, null, 2);
        });
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("apiUpDiv").style.background = "red";
      });
  }

  //gets user information
  document.getElementById("getUser").addEventListener("click", getUserAPI);

  //create new user using the Eye-ABle API
  document.getElementById("addLicense").addEventListener("click", function () {
    //get data from input form
    let form = document.querySelector("#licenseData");
    let data = Object.fromEntries(new FormData(form).entries());
    let apiKey = document.getElementById("apiKeyInput").value;
    console.log(data, apiKey);

    document.getElementById("apiUpDiv").style.background = "red";

    fetch("https://api.eye-able.com/checkerLicense?apiKey=" + apiKey + "&userID=" + data.userId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          document.getElementById("apiUpDiv").style.background = "green";
        } else {
          document.getElementById("apiUpDiv").style.background = "red";
        }
        res.json().then((json) => {
          console.log("Success:", json);
          document.getElementById("apiFeedbackTxt").innerText = res.status + ":\n" + JSON.stringify(json, null, 2);
          document.getElementById("newUserKey").value = json.user[0];
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("apiUpDiv").style.background = "red";
      });
    });

    buildRulesOverviewList();
}

function eyeAbleAudit_getMessage(name) {
    return getMessage(name);
}

function buildRulesOverviewList() {
    let listElement = document.getElementById("rulesOverviewList");

    let wcagRules;

    if (eyeAble_settings.lang && eyeAble_settings.lang.includes("de")) {
        wcagRules = wcag_rules_de;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("nl")) {
        wcagRules = wcag_rules_nl;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("es")) {
        wcagRules = wcag_rules_es;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("fr")) {
        wcagRules = wcag_rules_fr;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("it")) {
        wcagRules = wcag_rules_it;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("pl")) {
        wcagRules = wcag_rules_pl;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("pt")) {
        wcagRules = wcag_rules_pt;
    } else {
        wcagRules = wcag_rules_en;
    }

    for (let key in wcag_rules_meta) {
        if (!wcagRules[key]) {
            wcagRules[key] = wcag_rules_meta[key];
        }
        //also check the keys of the subobjects
        for (let subKey in wcag_rules_meta[key]) {
            if (!wcagRules[key][subKey]) {
                wcagRules[key][subKey] = wcag_rules_meta[key][subKey];
            }
        }
    }

    let chapters = Object.keys(wcagRules);

    chapters.forEach((chapter) => {
        let wcagImagePath = "";
        switch (wcagRules[chapter].wcagLvl) {
            case "A":
                wcagImagePath = "public/images/wcagLvlA.png";
                break;
            case "AA":
                wcagImagePath = "public/images/wcagLvlAA.png";
                break;
            case "AAA":
                wcagImagePath = "public/images/wcagLvlAAA.png";
                break;
            case "Best Practice":
                wcagImagePath = "public/images/bestPractice.png";
                break;
        }
        let chapterName = wcagRules[chapter].name;
        //prevents showing best practice twice as chapter and chaptername
        if (chapterName === "Best Practice") chapterName = "";

        let newChapterEntry = `
    <li wcagChapter="${chapter}">
        <div class="overviewRuleBox wcag">
            <img alt="WCAG ${wcagRules[chapter].wcagLvl}" style="height: 20px;margin-right: 10px" src="${wcagImagePath}">
            <p>${chapter}</p>
            <p>${chapterName}</p>
        </div>
        <ul class="chapterRules">
        </ul>
    </li>`;
        listElement.insertAdjacentHTML("beforeend", newChapterEntry);
    });

    let auditRules;

    if (eyeAble_settings.lang && eyeAble_settings.lang.includes("de")) {
        auditRules = ea_rules_de;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("nl")) {
        auditRules = ea_rules_nl;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("es")) {
        auditRules = ea_rules_es;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("fr")) {
        auditRules = ea_rules_fr;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("it")) {
        auditRules = ea_rules_it;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("pl")) {
        auditRules = ea_rules_pl;
    } else if (eyeAble_settings.lang && eyeAble_settings.lang.includes("pt")) {
        auditRules = ea_rules_pt;
    } else {
        auditRules = ea_rules_en;
    }

    //add the metadata
    for (let key in ea_rules_meta) {
        if (!auditRules[key]) {
            auditRules[key] = ea_rules_meta[key];
        }
        //also check the keys of the subobjects
        for (let subKey in ea_rules_meta[key]) {
            if (!auditRules[key][subKey]) {
                auditRules[key][subKey] = ea_rules_meta[key][subKey];
            }
        }
    }

    //let auditRules = getEyeAbleRules();

    let rules = Object.keys(auditRules);

    rules.forEach((rule) => {
        let ruleListElement = document.querySelector('[wcagChapter="' + auditRules[rule].categories[0] + '"]').querySelector(".chapterRules");
        let errorImagePath = "public/images/warning" + auditRules[rule].severity + ".svg";
        let errorUrl = auditRules[rule].eyeAbleUrl || auditRules[rule].references.actRuleUrl || "";

        let ruleImgAlt = "";
        if (auditRules[rule].severity >= 3) {
            ruleImgAlt = getMessage("errorTableErr");
        } else if (auditRules[rule].severity >= 1) {
            ruleImgAlt = getMessage("errorTableWarn");
        } else {
            ruleImgAlt = getMessage("errorTableHint");
        }

        let newRuleEntry = `
    <li ruleId="${rule}">
        <div class="overviewRuleBox">
            <a style="color: white; margin: 3px; font-size: 16px;" target="_blank" href="${errorUrl}">
                <img alt="${ruleImgAlt}" style="height: 25px; margin-right: 10px;vertical-align: middle;" src="${errorImagePath}">
                ${auditRules[rule].content.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}
            </a>
        </div>
    </li>`;

        ruleListElement.insertAdjacentHTML("beforeend", newRuleEntry);
    });

    //filter empty wcag rules
    let chapterElements = document.querySelectorAll("[wcagChapter]");
    for (let i = 0; i < chapterElements.length; i++) {
        //console.log(listElement.children[i],listElement.children[i].querySelector(".chapterRules"),listElement.children[i].querySelector(".chapterRules").children.length);
        if (chapterElements[i].querySelector(".chapterRules").children.length === 0) {
            chapterElements[i].remove();
        }
    }
}
