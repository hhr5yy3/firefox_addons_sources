if (typeof browser === "undefined") {
    var browser = chrome;
}

const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        browser.storage.local.get([key], function (result) {
            if (result[key] === undefined) {
                resolve(null);
            } else {
                resolve(result[key]);
            }
        });
    });
};

const writeLocalStorage = async (key, value) => {
    return new Promise((resolve, reject) => {
        browser.storage.local.set({[key]: value}, function () {
            resolve();
        });
    });
};

class Settings {
    constructor() {
        this.init();
    }
    save() {
        readLocalStorage("translator_config").then(config => {
            config.tl = $("#languages").val();
            config.vm = "ont";
            config.double_click = $("#double-click").val();
            writeLocalStorage("translator_config", config);
        });
        $("#notification").attr("class", "notification is-warning");
        $("#message").html(browser.i18n.getMessage("automatic_save")); 
        setTimeout(function() {
            $("#message").html(), $("#notification").attr("class", "hide")
        }, 2e3);
    }
    setSelectedValue(selectElement, selectedValue) {
        for (let option, index = 0; index < selectElement.children.length; index++) {
            option = selectElement.children[index];
            if (option.value === selectedValue) {
                option.selected = true;
            }
            else {
                option.selected = false;
            }
        }
    }
    populateSelect(selectElement, optionsObj) {
        for (let optionKey in optionsObj) {
            let newOption = document.createElement("option");
            newOption.value = optionKey, newOption.textContent = optionsObj[optionKey], selectElement.appendChild(newOption)
        }
        return selectElement
    }
    loadSupportedDblClickOptions() {
        const doubleClickSelect = document.querySelector("#double-click"),
            doubleClickOptions = {
                double_click_true: browser.i18n.getMessage("double_click_true"),
                double_click_false: browser.i18n.getMessage("double_click_false")
            };
        this.populateSelect(doubleClickSelect, doubleClickOptions);
        readLocalStorage("translator_config").then((config) => {
            if (config) {
                this.setSelectedValue(doubleClickSelect, config.double_click);
            }
            else {
                this.setSelectedValue(doubleClickSelect, "double_click_true");
            }
        });
    }
    loadSelectedLanguage() {
        const languageSelect = document.querySelector("#languages");
        readLocalStorage("translator_config").then((config) => {
            if (config) {
                this.setSelectedValue(languageSelect, config.tl);
            }
            else {
                this.setSelectedValue(languageSelect, "en");
            }
        });
    }
    changeElementsVisibility() {
        let selectElements = document.getElementsByTagName("select"),
            labelElements = document.getElementsByTagName("label");
        for (let index = 0; index < selectElements.length; index++) selectElements[index].className = "visible";
        for (let index = 0; index < labelElements.length; index++) labelElements[index].className = "visible"
    }
    init() {
        this.loadSupportedDblClickOptions();
        this.loadSelectedLanguage();

        let pageTitle = browser.i18n.getMessage("name") + " - " + browser.i18n.getMessage("settings");
        document.title = pageTitle; 
        $("#link").attr("href", `https://chrome.google.com/webstore/detail/${browser.runtime.id}`); 
        $("#instruction").html(browser.i18n.getMessage("instruction"));
        $("#description").html(browser.i18n.getMessage("description"));
        $("#title").html(pageTitle);
        $("#lb_translate_to").html(browser.i18n.getMessage("translate_to"));
        $("#lb_double-click").html(browser.i18n.getMessage("double_click"));
        document.querySelector("#languages").addEventListener("change", function() {
            this.save();
        }.bind(this));
        document.querySelector("#double-click").addEventListener("change", function() {
            this.save();
        }.bind(this));
        
        this.changeElementsVisibility();
    }
}
$(function() {
    new Settings
});