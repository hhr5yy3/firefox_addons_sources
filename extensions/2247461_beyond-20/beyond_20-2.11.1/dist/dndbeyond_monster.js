function replaceRollsCallback(match, replaceCB) {
    let dice = match[2];
    let modifiers = match[3];
    if (dice === undefined) {
        dice = "";
        modifiers = match[4];
    }
    if (modifiers) {
        modifiers = modifiers.replace(/−/g, "-");
    }
    dice = dice.replace("D", "d");

    const replacement = replaceCB(dice, modifiers);
    if (replacement === null) return match[0];
    else return `${match[1]}${replacement}${match[5]}`;
}

function replaceRolls(text, replaceCB) {
    // TODO: Cache the value so we don't recompile the regexp every time
    const dice_regexp = new RegExp(/(^|[^\w])(?:(?:(?:(\d*[dD]\d+(?:ro(?:=|<|<=|>|>=)[0-9]+)?(?:min[0-9]+)?)((?:(?:\s*[-−+]\s*\d+)|(?:\s*[0+]\s*\d*[dD]\d+))*))|((?:[-−+]\s*\d+)+)))($|[^\w])/, "gm");
    return text.replace(dice_regexp, (...match) => replaceRollsCallback(match, replaceCB));
}

// Used to clean various dice.includes(imperfections) roll strings;
function cleanRoll(rollText) {
    //clean adjacent '+'s (Roll20 treats it as a d20);
    //eg: (1d10 + + 2 + 3) -> (1d10 + 2 + 3);
    rollText = (rollText || "").toString();
    rollText = rollText.replace(/\+ \+/g, '+').replace(/\+ \-/g, '-');
    return rollText;
}

// Taken from https://stackoverflow.com/questions/45985198/the-best-practice-to-detect-whether-a-browser-extension-is-running-on-chrome-or;
function getBrowser() {
    if (typeof (chrome) !== "undefined") {
        if (typeof (browser) !== "undefined") {
            return "Firefox";
        } else {
            return "Chrome";
        }
    } else {
        return "Edge";

    }
}

function getPlatform() {
    let platform;
    if (navigator.userAgentData && navigator.userAgentData.platform) {
        // This is the official way to do it but it's not supported by anything but Edge
        platform = navigator.userAgentData.platform;
    } else if (navigator.platform) {
        // And this is supposed to be deprecated...
        platform = navigator.platform;
    } else {
        return "Unknown";
    }
    if (platform.includes("Windows") || platform.includes("Win32")) {
        return "Windows";
    } else if (platform.includes("Mac")) {
        return "Mac";
    } else {
        return platform;
    }
}

function isExtensionDisconnected() {
    try {
        chrome.runtime.getURL("");
        return false;
    } catch (err) {
        return true;
    }
}

// Taken from https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script;
function injectPageScript(url) {
    const s = document.createElement('script');
    s.src = url;
    s.charset = "UTF-8";
    s.onload = () => s.remove();
    (document.head || document.documentElement).appendChild(s);
}

function injectCSS(css) {
    const s = document.createElement('style');
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
}

function sendCustomEvent(name, data=[]) {
    if (getBrowser() === "Firefox")
        data = cloneInto(data, window);
    const event = new CustomEvent("Beyond20_" + name, { "detail": data });
    document.dispatchEvent(event);
}

function addCustomEventListener(name, callback) {
    const event = ["Beyond20_" + name, (evt) => {
        const detail = evt.detail || [];
        callback(...detail)
    }, false];
    document.addEventListener(...event);
    return event;
}

function roll20Title(title) {
    return title.replace(" | Roll20", "");
}

function isRoll20(title) {
    return title.includes("| Roll20");
}

function isFVTT(title) {
    return title.includes("Foundry Virtual Tabletop");
}

function fvttTitle(title) {
    return title.replace(" • Foundry Virtual Tabletop", "");
}

function urlMatches(url, matching) {
    return url.match(matching.replace(/\*/g, "[^]*")) !== null;
}

function isCustomDomainUrl(tab) {
    // FVTT is handled separately from custom domains
    if (isFVTT(tab.title)) return false;
    for (const url of ((settings || {})["custom-domains"] || [])) {
        if (urlMatches(tab.url, url)) return true;
    }
    return false;
}

function isSupportedVTT(tab) {
    return SUPPORTED_VTT_URLS.some(url => urlMatches(tab.url, url))
}

function alertSettings(url, title) {
    if (alertify.Beyond20Settings === undefined)
        alertify.dialog('Beyond20Settings', function () { return {}; }, false, "alert");

    const popup = chrome.runtime.getURL(url);
    const img = E.img({src: chrome.runtime.getURL("images/icons/icon32.png"), style: "margin-right: 3px;"})
    const iframe = E.iframe({src: popup, style: "width: 100%; height: 100%;", frameborder: "0", scrolling: "yes"});
    const dialog = alertify.Beyond20Settings(img.outerHTML + title, iframe);
    const width = Math.min(720, window.innerWidth / 2); // 720px width or 50% on small screens
    dialog.set('padding', false).set('resizable', true).set('overflow', false).resizeTo(width, "80%");

}
function alertQuickSettings() {
    alertSettings("popup.html", "Beyond 20 Quick Settings");
}
function alertFullSettings() {
    alertSettings("options.html", "Beyond 20 Settings");
}

function isListEqual(list1, list2) {
    const list1_str = list1.join(",");
    const list2_str = list2.join(",");
    return list1_str == list2_str;

}
function isObjectEqual(obj1, obj2) {
    const obj1_str = Object.entries(obj1).join(",");
    const obj2_str = Object.entries(obj2).join(",");
    return obj1_str == obj2_str;
}

// replaces matchAll, requires a non global regexp
function reMatchAll(regexp, string) {
    const matches = string.match(new RegExp(regexp, "gm"));
    if ( matches) {
        let start = 0;
        return matches.map(group0 => {
            const match = group0.match(regexp);
            match.index = string.indexOf(group0, start);
            start = match.index;
            return match;
        });
    }
    return matches;
}

/**
 * Some users somehow inject html into their comments which include alertify classes
 * which can negatively impact how the page renders. We should remove those in order
 * to clean up the page
 */
function cleanupAlertifyComments() {
    const comments = $(".listing-comments");
    comments.find(".alertify, .alertify-notifier").remove();
}

E = new Proxy({}, {
    get: function (obj, name) {
        return new Proxy(function () {}, {
            apply: (target, thisArg, argumentsList) => {
                const attributes = argumentsList[0] || {};
                const children = argumentsList.slice(1);
                const e = document.createElement(name);
                for (const [name, value] of Object.entries(attributes))
                    e.setAttribute(name, value);
                for (const child of children)
                    e.append(child);
                return e;
            }
        });
    }
});


function initializeAlertify() {
    alertify.set("alert", "title", "Beyond 20");
    alertify.set("notifier", "position", "top-center");
    
    alertify.defaults.transition = "zoom";
    if (alertify.Beyond20Prompt === undefined) {
        const factory = function () {
            return {
                "settings": {
                    "content": undefined,
                    "ok_label": undefined,
                    "cancel_label": undefined,
                    "resolver": undefined,
                },
                "main": function (title, content, ok_label, cancel_label, resolver) {
                    this.set('title', title);
                    this.set('content', content);
                    this.set('resolver', resolver);
                    this.set('ok_label', ok_label);
                    this.set("cancel_label", cancel_label);
                },
                "setup": () => {
                    return {
                        "buttons": [
                            {
                                "text": alertify.defaults.glossary.ok,
                                "key": 13, //keys.ENTER;
                                "className": alertify.defaults.theme.ok,
                            },
                            {
                                "text": alertify.defaults.glossary.cancel,
                                "key": 27, //keys.ESC;
                                "invokeOnClose": true,
                                "className": alertify.defaults.theme.cancel,
                            }
                        ],
                        "focus": {
                            "element": 0,
                            "select": true
                        },
                        "options": {
                            "maximizable": false,
                            "resizable": false
                        }
                    }
                },
                "build": () => { },
                "prepare": function () {
                    this.elements.content.innerHTML = this.get('content');
                    this.__internal.buttons[0].element.innerHTML = this.get('ok_label');
                    this.__internal.buttons[1].element.innerHTML = this.get('cancel_label');
                },
                "callback": function (closeEvent) {
                    if (closeEvent.index == 0) {
                        this.get('resolver').call(this, $(this.elements.content.firstElementChild));
                    } else {
                        this.get('resolver').call(this, null);
                    }
                }
            }
        }
        alertify.dialog('Beyond20Prompt', factory, false, "prompt");
    }
    
    
    if (alertify.Beyond20Roll === undefined)
        alertify.dialog('Beyond20Roll', function () { return {}; }, false, "alert");
    
}

const bouncedFallbackRenders = {};
function simpleHash(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return hash;
}

function forwardMessageToDOM(request) {
    if (request.action == "hp-update") {
        sendCustomEvent("UpdateHP", [request, request.character.name, request.character.hp, request.character["max-hp"], request.character["temp-hp"]]);
    } else if (request.action === "update-combat") {
        sendCustomEvent("UpdateCombat", [request, request.combat, settings]);
    } else if (request.action == "conditions-update") {
        sendCustomEvent("UpdateConditions", [request, request.character.name, request.character.conditions, request.character.exhaustion]);
    } else if (request.action == "roll") {
        // Let's run it through the roll renderer and let the site decide to use
        // the original request or the rendered version
        // Requires roll_renderer to be set (currently in generic-site and ddb pages)
        roll_renderer.handleRollRequest(request);
    } else if (request.action == "rendered-roll") {
        // Hash the original request to be able to match it with the rendered one in case of fallback
        // But don't use the whole request since it can change by the time we render it (original-whisper is added)
        const reqHash = simpleHash(JSON.stringify({
            action: request.request.action,
            type: request.request.type,
            character: request.request.character,
            roll: request.request.roll,
            name: request.request.name,
            ability: request.request.ability,
            modifier: request.request.modifier,
            description: request.request.description
        }));
        if (request.rendered === "fallback") {
            // This is a fallback render, if we're sending it from DDB, we might end up with
            // a double render, so bounce this one for 500ms to let the real render happen if it's
            // going to, then override the fallback render if we do.
            bouncedFallbackRenders[reqHash] = setTimeout(() => {
                delete bouncedFallbackRenders[reqHash];
                sendCustomEvent("RenderedRoll", [request]);
            }, 500);
        } else {
            clearTimeout(bouncedFallbackRenders[reqHash]);
            delete bouncedFallbackRenders[reqHash];
            sendCustomEvent("RenderedRoll", [request]);
        }
    } 
}
// From https://github.com/eligrey/FileSaver.js
(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g,"undefined"!=typeof module&&(module.exports=g)});
class WhisperType {
    static get NO() { return 0; }
    static get YES() { return 1; }
    static get QUERY() { return 2; }
    static get HIDE_NAMES() { return 3; }
}

class RollType {
    static get NORMAL() { return 0; }
    static get DOUBLE() { return 1; }
    static get QUERY() { return 2; }
    static get ADVANTAGE() { return 3; }
    static get DISADVANTAGE() { return 4; }
    static get THRICE() { return 5; }
    static get SUPER_ADVANTAGE() { return 6; }
    static get SUPER_DISADVANTAGE() { return 7; }
    // If a feat overrides it to have advantage;
    static get OVERRIDE_ADVANTAGE() { return 8; }
    static get OVERRIDE_DISADVANTAGE() { return 9; }
}

class CriticalRules {
    static get PHB() { return 0; }
    static get HOMEBREW_MAX() { return 1; }
    // Impossible to achieve with Roll20 && hard with RollRenderer because of brutal && other mods.;
    static get HOMEBREW_DOUBLE() { return 2 }
    static get HOMEBREW_MOD() { return 3; }
    static get HOMEBREW_REROLL() { return 4; }
}

// keys: [short, title, description, type, default];
// Types: bool, string, combobox, link, special;
// combobox extra options:;
//                        choices: {value: string}
// special extra options:;
//                        createHTMLElement: function;
//                        set: function;
//                        get: function;

const options_list = {
    "whisper-type": {
        "short": "Whisper rolls",
        "title": "Whisper rolls to the DM",
        "description": "Determines if the rolls will be whispered to the DM.\n" +
            "In the case of Foundry VTT, the 'ask every time' option will use the setting in the chat box.",
        "type": "combobox",
        "default": WhisperType.NO,
        "choices": {
            [WhisperType.NO.toString()]: "Never whisper",
            [WhisperType.YES.toString()]: "Always whisper",
            [WhisperType.QUERY.toString()]: "Ask every time"
        }
    },

    "whisper-type-monsters": {
        "title": "Whisper monster rolls to the DM",
        "description": "Overrides the global whisper setting from monster stat blocks",
        "type": "combobox",
        "default": WhisperType.YES,
        "choices": {
            [WhisperType.NO.toString()]: "Use general whisper setting",
            [WhisperType.HIDE_NAMES.toString()]: "Hide monster and attack name",
            [WhisperType.YES.toString()]: "Always whisper monster rolls",
            [WhisperType.QUERY.toString()]: "Ask every time"
        }
    },

    "custom-domains": {
        "title": "List of custom domains to load Beyond20",
        "description": "Enter a list of custom domain URLs to load Beyond20 into.\nOne domain per line, you must include the http:// or https:// protocol and you can use wildcards for subdomains and path.\nThis can be used to send Beyond20 requests to sites that may independently support Beyond20.\nFor example: https://my-new-custom-vtt.com/*/game",
        "type": "special",
        "default": [],
        "advanced": true
        // callbacks will be added after the functions are defined
    },
    "roll20-discord-activity": {
        "title": "Support Roll20 Discord Activity",
        "description": "Integrate with Roll20's Discord Activity.\nThis requires opening Discord in the browser so Beyond20 can be loaded and communicate with the activity.",
        "type": "special",
        "default": null,
        "advanced": true
        // callbacks will be added after the functions are defined
    },

    "hide-results-on-whisper-to-discord": {
        "title": "Hide roll results on D&D Beyond when whispering to Discord",
        "description": "Don't show the roll results on D&D Beyond when using whisper and sending results to \"D&D Beyond Dice Roller & Discord\"",
        "type": "bool",
        "default": false,
        "advanced": true
    },

    "roll-type": {
        "short": "Type of Roll",
        "title": "Type of Roll (Advantange/Disadvantage)",
        "description": "Determines if rolls should be with advantage, disadvantage, double rolls or user queries",
        "short_description": "Hold Shift/Ctrl/Alt to override for Advantage/Disadvantage/Regular rolls",
        "type": "combobox",
        "default": RollType.NORMAL,
        "choices": {
            [RollType.NORMAL.toString()]: "Normal Roll",
            [RollType.DOUBLE.toString()]: "Always roll twice",
            [RollType.QUERY.toString()]: "Ask every time",
            [RollType.ADVANTAGE.toString()]: "Roll with Advantage",
            [RollType.DISADVANTAGE.toString()]: "Roll with Disadvantage",
            [RollType.THRICE.toString()]: "Always roll thrice (limited support on Roll20)",
            [RollType.SUPER_ADVANTAGE.toString()]: "Roll with Super Advantage",
            [RollType.SUPER_DISADVANTAGE.toString()]: "Roll with Super Disadvantage",
        }
    },

    "quick-rolls": {
        "short": "Add Quick Roll areas",
        "title": "Add Quick Rolls areas to main page",
        "description": "Listen to clicks in specific areas of the abilities, skills, actions and spells to quickly roll them.",
        "type": "bool",
        "default": true,
        "advanced": true
    },

    "use-digital-dice": {
        "short": "Use D&D Beyond's Digital Dice",
        "title": "Use D&D Beyond's Digital Dice",
        "description": "Integrate with D&D Beyond's Digital Dice, rolling the dice on the screen and sending the pre-calculated results to the VTT.",
        "type": "bool",
        "default": true
    },

    "auto-roll-damage": {
        "title": "Auto roll Damage and Crit",
        "description": "Always roll damage and critical hit dice when doing an attack",
        "type": "bool",
        "default": true
    },

    "initiative-tracker": {
        "title": "Add initiative roll to the Turn Tracker",
        "description": "Adds the result of the initiative roll to the turn tracker.\n" +
            "This requires you to have a token selected in the VTT\n" +
            "If using Roll20, it will also change the way the output of 'Advantage on initiative' rolls appear.",
        "type": "bool",
        "default": true
    },

    "initiative-tiebreaker": {
        "title": "Add tiebreaker to initiative rolls",
        "description": "Adds the dexterity score as a decimal to initiative rolls to break any initiative ties.",
        "type": "bool",
        "default": false,
        "advanced": true
    },

    "critical-homebrew": {
        "title": "Critical hit rule",
        "description": "Determines how the additional critical hit damages are determined",
        "type": "combobox",
        "default": CriticalRules.PHB.toString(),
        "choices": {
            [CriticalRules.PHB.toString()]: "Standard PHB Rules (reroll dice)",
            [CriticalRules.HOMEBREW_MAX.toString()]: "Homebrew: Perfect rolls",
            [CriticalRules.HOMEBREW_REROLL.toString()]: "Homebrew: Reroll all damages"
        }
    },

    "weapon-force-critical": {
        "title": "Force all attacks/damage rolls as Critical Hits",
        "description": "Forces all attacks to be considered as critical hits. Useful for melee attacks against paralyzed enemies or using adamantine weapons against objects",
        "short": "Force Critical Hits",
        "short_description": "Useful for crit damage rolls or melee attacks against paralyzed enemies or using adamantine weapons against objects",
        "type": "bool",
        "default": false
    },

    "update-hp": {
        "title": "Update VTT Token HP",
        "description": "When changing HP in D&D Beyond, update it in the VTT tokens and sheets",
        "type": "bool",
        "default": true
    },

    "display-conditions": {
        "title": "Display Condition updates to VTT",
        "description": "When updating character conditions in D&D Beyond, display a message in the VTT chat.\n" +
            "If using Foundry VTT with the Beyond20 module, it will also update the token's status icons appropriately.",
        "type": "bool",
        "default": true
    },

    "template": {
        "type": "migrate",
        "to": "roll20-template",
        "default": "roll20"
    },

    "hotkeys-bindings": {
        "title": "Define custom hotkeys",
        "description": "Set custom hotkeys for controlling Beyond20's behavior.",
        "type": "special",
        "default": null
        // callbacks will be added after the functions are defined
    },

    "sticky-hotkeys": {
        "title": "Sticky Hotkeys: no need to hold the button",
        "description": "Allows you to press a hotkey instead of holding it to toggle the assigned ability for the next roll.",
        "type": "bool",
        "default": false
    },

    "roll20-template": {
        "title": "Roll20 Character Sheet Setting",
        "description": "Select the Character Sheet Template that you use in Roll20\n" +
            "If the template does not match the campaign setting, it will default to the Beyond20 Roll Renderer.",
        "type": "combobox",
        "default": "roll20",
        "choices": { "roll20": "D&D 5E By Roll20", "default": "Default Roll20 template", "beyond20": "Beyond20 Roll Renderer" },
        "advanced": true
    },

    "notes-to-vtt": {
        "title": "Send custom text to the VTT",
        "description": "In the \"Notes\" or \"Description\" section of any item, action, or spell on the D&D Beyond Character Sheet, "
            + "you may add your own custom text to be sent to the VTT as a message when you use that element's roll action."
            + "\nTo do this, format the text you wish to send as follows:"
            + "\n[[msg-type]] Put text you wish to send HERE[[/msg-type]]"
            + "\nReplace \"msg-type\" with one of the following: \"before\", \"after\", or \"replace\" depending on how you want to affect the message or action that would normally be sent to the VTT.",
        "type": "info",
        "advanced": true
    },

    "subst-roll20": {
        "type": "migrate",
        "to": "subst-vtt",
        "default": true
    },

    "subst-vtt": {
        "title": "Replace Dices formulas in the VTT",
        "description": "In Roll20 or Foundry VTT, if a spell card or an item or a feat has a dice formula in its description,\n" +
            "enabling this will make the formula clickable to generate the roll in chat.",
        "type": "bool",
        "default": true
    },

    "subst-dndbeyond": {
        "title": "Replace Dices formulas in D&D Beyond (Spells & Character Sheet)",
        "description": "In the D&D Beyond Spell page or Character sheet side panel, if a spell, item, feat or action has a dice formula in its description,\n" +
            "enabling this will add a dice icon next to the formula to allow you to roll it.",
        "type": "bool",
        "default": true,
        "advanced": true
    },

    "subst-dndbeyond-stat-blocks": {
        "title": "Replace Dices formulas in D&D Beyond (Stat blocks)",
        "description": "In D&D Beyond, if a dice formula is found in the stat block of a creature, monster, vehicle,\n" +
            "enabling this will add a dice icon next to the formula to allow you to roll it.",
        "type": "bool",
        "default": true,
        "advanced": true
    },

    "handle-stat-blocks": {
        "title": "Add roll buttons to stat blocks",
        "description": "In D&D Beyond, adds roll buttons for abilities/saving throws/skills/actions to the stat block of a creature, monster or vehicle.",
        "type": "bool",
        "default": true,
        "advanced": true
    },

    "crit-prefix": {
        "title": "Critical Hit Prefix",
        "description": "Prefix to add to the Critical Hit dice result.\nIt might be less confusing to explicitely show the crit damage",
        "type": "string",
        "default": "Crit: ",
        "advanced": true
    },

    "components-display": {
        "title": "Components to display in spell attacks",
        "description": "When doing a spell attack, what components to show alongside the spell roll.",
        "type": "combobox",
        "default": "all",
        "choices": { "all": "All components", "material": "Only material components", "none": "Do not display anything" },
        "advanced": true
    },

    "component-prefix": {
        "title": "Component Prefix",
        "description": "Prefix to the components display of a spell attack.\nIf displaying material components only, you may want to set it to 'Materials used :' for example",
        "type": "string",
        "default": "Components: ",
        "advanced": true
    },

    "hidden-monster-replacement": {
        "title": "Hidden monster name",
        "description": "Text to use to replace the monster name and attack name for hidden monsters (whisper type)",
        "type": "string",
        "default": "???",
        "advanced": true
    },

    "combat-unknown-monster-name": {
        "title": "Unknown monster name replacement in encounters",
        "description": "Replace monster names in the combat tracker when they can't be mapped to tokens. Leave empty to not replace it.",
        "type": "string",
        "default": "Unknown Creature",
        "advanced": true
    },
    
    "roll20-spell-details-display": {
        "title": "Display Spell Details in spell attacks",
        "description": "When doing a spell attack, display the spell's details (Roll20 only toggle)",
        "type": "bool",
        "default": false
    },

    "roll20-spell-description-display": {
        "title": "Display Spell Descriptions in spell attacks",
        "description": "When doing a spell attack, display the spell's full description (Roll20 only toggle)",
        "type": "bool",
        "default": false
    },
    "weapon-handedness": {
        "title": "Always Show Weapon Handedness",
        "description": "On Versatile weapons, always show weapon-handedness, even if 1-handed or 2-handed is selected",
        "type": "bool",
        "default": false,
        "advanced": true
    },
    "roll-to-game-log": {
        "title": "Send Beyond20 roll results to game log",
        "description": "Send the roll results made by Beyond20 (not in the VTT) to the D&D Beyond Game Log",
        "type": "bool",
        "default": true,
        "advanced": true
    },

    "roll20-tab": {
        "type": "migrate",
        "to": "vtt-tab",
        "default": null
    },

    "vtt-tab": {
        "title": "Select the VTT tab or Game to send rolls to",
        "description": "Select the tab to send rolls to or the specific Game.\nYou can select the Game or tab from the extension's popup menu in the VTT tab itself.\nAfter a specific tab is selected and that tab is closed, it will revert to sending rolls to the same Game.",
        "type": "special",
        "default": null
        // callbacks will be added after the functions are defined
    },

    "discord-integration": {
        "title": "Discord Integration",
        "description": "You can get rolls sent to Discord by enabling Discord Integration!\n" +
            "Click the link, follow the instructions and enter your secret key below.",
        "type": "link",
        "default": "https://beyond20.here-for-more.info/discord",
        "icon": "/images/discord-logo.png",
        "icon-height": "100%",
        "icon-width": "auto"
    },

    "discord-secret": {
        "type": "migrate",
        "to": "discord-channels",
        "default": ""
    },

    "discord-channels": {
        "title": "Discord Default Destination Channel",
        "description": "Default Discord destination channel to send rolls to",
        "type": "special",
        "default": null
    },

    "show-changelog": {
        "title": "Show Changelog when installing a new version",
        "description": "When a new version is released and the extension has been updated,\n" +
            "open the changelog in a new window",
        "type": "bool",
        "default": true,
        "advanced": true
    },

    "last-version": {
        "description": "Last version that was installed. Used to check if an update just happened",
        "type": "string",
        "hidden": true,
        "default": ""
    },
    "migrated-sync-settings": {
        "description": "Whether the user settings were migrated from sync storage to local storage",
        "type": "bool",
        "hidden": true,
        "default": false
    },
    "last-whisper-query": {
        "description": "Last user selection for query whispers",
        "type": "int",
        "hidden": true,
        "default": WhisperType.NO
    },
    "last-advantage-query": {
        "description": "Last user selection for query roll type",
        "type": "int",
        "hidden": true,
        "default": RollType.NORMAL
    },

    "sync-combat-tracker": {
        "title": "Synchronize the Combat Tracker with the VTT",
        "description": "Overwrites the VTT's combat tracker with the details from D&D Beyond's Encounter tool (Roll20 only, GM only)",
        "type": "bool",
        "default": true
    },
    "discord-display-description": {
        "title": "Display description in Discord",
        "description": "Display the roll's description in the Discord message",
        "type": "bool",
        "default": false,
        "advanced": true
    },

    "backup-settings": {
        "title": "Backup Beyond20 settings",
        "description": "Export your Beyond20 settings to a file for backup",
        "type": "special",
        "advanced": true,
        "default": null
    },
    "restore-settings": {
        "title": "Restore Beyond20 settings",
        "description": "Import your Beyond20 settings from a previously exported backup file",
        "type": "special",
        "advanced": true,
        "default": null
    },

    "donate": {
        "short": "Buy rations (1 day) to feed my familiar",
        "title": "Become a patron of the art of software development!",
        "description": "If you wish to support my work on Beyond 20 or my other D&D related project, subscribe to my patreon " +
            "or donate via paypal!\nI am grateful for your generosity!",
        "type": "link",
        "default": "https://beyond20.here-for-more.info/rations",
        "icon": "/images/donate.png",
        "icon-width": "64",
        "icon-height": "64"
    },
    "donate-advanced": {
        "short": "Buy rations (1 day) to feed my familiar",
        "title": "Become a patron of the art of software development!",
        "description": "If you wish to support my work on Beyond 20 or my other D&D related project, subscribe to my patreon " +
            "or donate via paypal!\nI am grateful for your generosity!",
        "type": "link",
        "default": "https://beyond20.here-for-more.info/rations",
        "icon": "/images/donate.png",
        "icon-width": "64",
        "icon-height": "64",
        "advanced": true
    }
}

const character_settings = {
    "migrated-sync-settings": {
        "description": "Whether the user settings were migrated from sync storage to local storage",
        "type": "bool",
        "hidden": true,
        "default": false
    },
    "versatile-choice": {
        "title": "Versatile weapon choice",
        "description": "How to roll damage for Versatile weapons",
        "type": "combobox",
        "default": "both",
        "choices": {
            "both": "Roll both damages separately",
            "one": "Use weapon One-handed",
            "two": "Use weapon Two-handed"
        }
    },
    "custom-roll-dice": {
        "title": "Custom Roll dice formula bonus",
        "description": "Add custom formula to d20 rolls (Bless, Guidance, Bane, Magic Weapon, etc..)",
        "type": "string",
        "default": ""
    },
    "custom-damage-dice": {
        "title": "Custom Damage dice formula bonus",
        "description": "Add custom dice to damage rolls (Magic Weapon, Elemental Weapon, Green-flame Blade, etc..). Use a comma to separate multiple independent rolls.",
        "type": "string",
        "default": ""
    },
    "custom-ability-modifier": {
        "title": "Custom magical modifier to raw ability checks",
        "description": "Add a custom modifier from magical items (Stone of Good Luck for example) to raw ability checks.",
        "type": "string",
        "default": ""
    },
    "custom-critical-limit": {
        "title": "Custom Critical limit",
        "description": "Set a custom threshold for the critical hit limit (if using homebrew magical items)",
        "type": "string",
        "default": ""
    },

    // effects

    "effects-bless": {
        "title": "Effect: Bless",
        "description": "Whenever a target makes an attack roll or a saving throw before the spell ends, the target adds 1d4 to the attack roll or save.",
        "type": "bool",
        "default": false
    },

    "effects-bane": {
        "title": "Effect: Bane",
        "description": "Whenever a target makes an attack roll or a saving throw before the spell ends, the target subtracks 1d4 to the attack roll or save.",
        "type": "bool",
        "default": false
    },

    "effects-enlarge": {
        "title": "Effect: Enlarge",
        "description": "Until the spell ends, the target also has advantage on Strength checks and Strength saving throws. While these weapons are enlarged, the target's attack with them deal 1d4 extra damage.",
        "type": "bool",
        "default": false
    },

    "effects-reduce": {
        "title": "Effect: Reduce",
        "description": "Until the spell ends, the target also has disadvantage on Strength checks and Strength saving throws. While these weapons are reduced, the target's attacks with them deal 1d4 less damage (this can't reduce the damage below 1).",
        "type": "bool",
        "default": false
    },

    // class features
    "artificer-alchemical-savant": {
        "title": "Artificer: Alchemist: Alchemical Savant",
        "description": "Use your Alchemist's supplies as spellcasting focus, dealing extra damage or healing equal to your Intelligence Modifier",
        "type": "bool",
        "default": true
    },
    "artificer-arcane-firearm": {
        "title": "Artificer: Artillerist: Use Arcane Firearm",
        "description": "Use an Arcane Firearm for your Artificer spells. Deals extra 1d8 damage",
        "type": "bool",
        "default": false
    },
    "artificer-arcane-jolt": {
        "title": "Artificer: Battle Smith: Arcane Jolt",
        "description": "Apply an Arcane Jolt to you or your Steel Defender's Weapon Attacks. Deals extra 2d6 damage, or 4d6 at Artificer Level 15+",
        "type": "bool",
        "default": false
    },
    "bard-joat": {
        "title": "Bard: Jack of All Trades",
        "description": "Add JoaT bonus to raw ability checks",
        "type": "bool",
        "default": true
    },
    "bard-psychic-blades": {
        "title": "Bard: College of Whispers: Psychic Blades",
        "description": "Use your Bardic Inspiration to deal extra psychic damage (Apply to next roll only)",
        "type": "bool",
        "default": false
    },
    "bard-spiritual-focus": {
        "title": "Bard: College of Spirits: Spiritual Focus",
        "description": "Use your Spiritual Focus to deal extra psychic damage, or apply extra healing",
        "type": "bool",
        "default": true
    },
    "barbarian-rage": {
        "title": "Barbarian: Rage! You are raging, ARRGGHHHHHH",
        "description": "Add Rage damage to melee attacks and add advantage to Strength checks and saving throws",
        "type": "bool",
        "default": false
    },
    "barbarian-divine-fury": {
        "title": "Barbarian: Path of the Zealot: Divine Fury",
        "description": "Add Divine Fury damage to your attack (when raging)",
        "type": "bool",
        "default": true
    },
    "bloodhunter-crimson-rite": {
        "title": "Bloodhunter: Crimson Rite",
        "description": "Add Crimson Rite damage",
        "type": "bool",
        "default": false
    },
    "cleric-blessed-strikes": {
        "title": "Cleric: Blessed Strikes",
        "description": "Deal an extra 1d8 damage on damaging cantrips and weapon attacks",
        "type": "bool",
        "default": true
    },
    "cleric-circle-of-mortality": {
        "title": "Cleric: Grave Domain: Circle of Mortality",
        "description": "Manipulating the line between life and death, your healing on a creature with 0 hp is maximized",
        "type": "bool",
        "default": false
    },
    "cleric-divine-strike": {
        "title": "Cleric: Divine Strike",
        "description": "Deal an extra 1d8 (2d8 at level 14) damage to weapon attacks",
        "type": "bool",
        "default": true
    },
    "druid-symbiotic-entity": {
        "title": "Druid: Circle of Spores: Symbiotic Entity",
        "description": "Your symbiotic entity lends its power to your melee weapon strikes.",
        "type": "bool",
        "default": false
    },
    "wildfire-spirit-enhanced-bond": {
        "title": "Druid: Circle of Wildfire: Enhanced Bond",
        "description": "The bond with your wildfire spirit enhances your destructive and restorative spells.",
        "type": "bool",
        "default": false
    },
    "champion-remarkable-athlete": {
        "title": "Fighter: Champion: Remarkable Athlete",
        "description": "Add Remarkable Athlete bonus to Strength/Dexterity/Constitution ability checks",
        "type": "bool",
        "default": true
    },
    "fighter-giant-might": {
        "title": "Fighter: Rune Knight: Giant’s Might",
        "description": "Activate Giant’s Might to get advantage on Strength checks and saving throws and deal 1d6 extra damage",
        "type": "bool",
        "default": false
    },
    "monk-diamond-soul": {
        "title": "Monk: Diamond Soul",
        "description": "Your proficiency with ki aids you even against the grasp of death",
        "type": "bool",
        "default": true
    },
    "paladin-improved-divine-smite": {
        "title": "Paladin: Improved Divine Smite",
        "description": "Roll an extra 1d8 radiant damage whenever you hit with a melee weapon",
        "type": "bool",
        "default": true
    },
    "paladin-radiant-strikes": {
        "title": "Paladin: Radiant Strikes",
        "description": "Roll an extra 1d8 radiant damage whenever you hit with a melee weapon or an unarmed strike",
        "type": "bool",
        "default": true
    },
    "paladin-invincible-conqueror": {
        "title": "Paladin: Oath of Conquest: Invincible Conqueror",
        "description": "You can harness extraordinary martial prowess for 1 minute.",
        "type": "bool",
        "default": false
    },
    "paladin-sacred-weapon": {
        "title": "Paladin: Oath of Devotion: Sacred Weapon",
        "description": "Your charisma and deity guide your attacks",
        "type": "bool",
        "default": false
    },
    "ranger-favored-foe": {
        "title": "Ranger: Favored Foe",
        "description": "You mark an enemy and your attacks hurt them to an increased degree",
        "type": "bool",
        "default": false
    },
    "fey-wanderer-dreadful-strikes": {
        "title": "Ranger: Fey Wanderer: Dreadful Strikes",
        "description": "Imbue your weapons and deal psychic damage to your the minds of your enemies.",
        "type": "bool",
        "default": false
    },
    "ranger-dread-ambusher": {
        "title": "Ranger: Gloom Stalker: Dread Ambusher (Apply to next roll only)",
        "description": "You skills in ambushing your enemies lend more damage to your initial strike",
        "type": "bool",
        "default": false
    },
    "ranger-planar-warrior": {
        "title": "Ranger: Horizon Walker: Planar Warrior",
        "description": "Use your Planar Warrior ability to deal extra Force damage",
        "type": "bool",
        "default": false
    },
    "ranger-colossus-slayer": {
        "title": "Ranger: Hunter's Prey: Colossus Slayer",
        "description": "Use your Colossus Slayer ability and add 1d8 damage to your target",
        "type": "bool",
        "default": true
    },
    "ranger-slayers-prey": {
        "title": "Ranger: Monster Slayer: Slayer's Prey",
        "description": "Use your Slayer's Prey ability and add 1d6 damage to your target",
        "type": "bool",
        "default": false
    },
    "ranger-natural-explorer": {
        "title": "Ranger: Natural Explorer",
        "description": "Your familiarity with the current region aids in your exploration",
        "type": "bool",
        "default": false
    },
    "ranger-gathered-swarm": {
        "title": "Ranger: Swarmkeeper: Gathered Swarm",
        "description": "Use your Gathered Swarm ability to add extra Force damage to your attacks",
        "type": "bool",
        "default": false
    },
    "rogue-sneak-attack": {
        "title": "Rogue: Sneak Attack",
        "description": "Send Sneak Attack damage with each attack roll",
        "type": "bool",
        "default": true
    },
    "rogue-cunning-strike": {
        "title": "Rogue: Cunning Strike",
        "description": "When you deal Sneak Attack damage, you can add Cunning Strike effects to the roll.",
        "type": "bool",
        "default": false
    },
    "rogue-assassinate": {
        "title": "Rogue: Assassin: Assassinate Surprise Attack (Apply to next roll only)",
        "description": "Roll with advantage and roll critical damage dice",
        "type": "bool",
        "default": false
    },
    "sorcerer-trance-of-order": {
        "title": "Sorcerer: Clockwork Soul: Trance of Order",
        "description": "Align your conciousness to the calculations of Mechanus. You enter a heightened state.",
        "type": "bool",
        "default": false
    },
    "eldritch-invocation-lifedrinker": {
        "title": "Warlock: Eldritch Invocation: Lifedrinker",
        "description": "Your pact weapon drips with necrotic energy, lending extra damage to your strikes",
        "type": "bool",
        "default": false
    },
    "warlock-the-celestial-radiant-soul": {
        "title": "Warlock: The Celestial: Radiant Soul",
        "description": "The pact with your Celestial enhances your radiant and fire spells.",
        "type": "bool",
        "default": true
    },
    "genies-vessel": {
        "title": "Warlock: The Genie: Genie's Wrath",
        "description": "You genie patron lends their wrath to your attacks.",
        "type": "bool",
        "default": true
    },
    "warlock-hexblade-curse": {
        "title": "Warlock: The Hexblade: Hexblade's Curse",
        "description": "Apply the Hexblade's Curse extra damage on attack rolls and score critical hits on rolls of 19 and 20",
        "type": "bool",
        "default": false
    },
    "warlock-grave-touched": {
        "title": "Warlock: The Undead: Grave Touched",
        "description": "Your attacks become necrotic, and apply extra damage",
        "type": "bool",
        "default": false
    },
    "wizard-bladesong": {
        "title": "Wizard: Bladesinger: Bladesong",
        "description": "Activate your Bladesong and make your weapon sing with magic",
        "type": "bool",
        "default": false
    },
    "empowered-evocation": {
        "title": "Wizard: Evocation Wizard: Empowered Evocation",
        "description": "Your prowess in Evocation lends power to your Evocation spells",
        "type": "bool",
        "default": true
    },
    "wizard-durable-magic": {
        "title": "Wizard: War Magic: Durable Magic",
        "description": "While concenctrating on a spell, your savings throws are fortified",
        "type": "bool",
        "default": false
    },
    "charger-feat": {
        "title": "Feat: Charger Extra Damage (Apply to next roll only)",
        "description": "You charge into battle, lending weight to your blow!",
        "type": "bool",
        "default": false
    },
    "great-weapon-master": {
        "title": "Feat: Great Weapon Master (Apply to next roll only)",
        "description": "Apply Great Weapon Master -5 penalty to roll and +10 to damage",
        "type": "bool",
        "default": false
    },
    "great-weapon-master-2024": {
        "title": "Feat: Great Weapon Master 2024",
        "description": "Heavy Weapon Mastery. Apply extra damage equals your Proficiency Bonus.",
        "type": "bool",
        "default": true
    },
    "sharpshooter": {
        "title": "Feat: Sharpshooter (Apply to next roll only)",
        "description": "Apply Sharpshooter -5 penalty to roll and +10 to damage",
        "type": "bool",
        "default": false
    },
    "brutal-critical": {
        "title": "Brutal Critical/Savage Attacks: Roll extra die",
        "description": "Roll extra damage die on crit for Brutal Critical and Savage Attacks features",
        "type": "bool",
        "default": true
    },
    "brutal-strike": {
        "title": "Brutal Strike: Roll extra die",
        "description": "If you use Reckless Attack, you can forgo any Advantage on one Strength-based attack roll of your choice on your turn.",
        "type": "bool",
        "default": false
    },
    "protector-aasimar-radiant-soul": {
        "title": "Aasimar: Protector: Radiant Soul",
        "description": "Unleash your divine soul to deal extra radiant damage equal to your level.",
        "type": "bool",
        "default": false
    },
    "motm-aasimar-radiant-soul": {
        "title": "Aasimar: Celestial Revelation: Radiant Soul",
        "description": "Unleash your divine soul to deal extra radiant damage equal to your proficiency.",
        "type": "bool",
        "default": false
    },
    "halfling-lucky": {
        "title": "Halfling: Lucky",
        "description": "The luck of your people guides your steps",
        "type": "bool",
        "default": true
    },
    "druid-improved-lunar-radiance": {
        "title": "Druid: Improved Lunar Radiance",
        "description": "Once per turn, you can deal an extra 2d10 Radiant damage to a target you hit with a Wild Shape forms attack.",
        "type": "bool",
        "default": false
    },
    "discord-target": {
        "title": "Discord Destination",
        "description": "Send rolls to a character specific Discord channel",
        "type": "special",
        "default": null
    },
}


function getStorage() {
    return chrome.storage.local;
}

function storageGet(name, default_value, cb) {
    getStorage().get({ [name]: default_value }, (items) => cb(items[name]));
}

function storageSet(name, value, cb = null) {
    getStorage().set({ [name]: value }, () => {
        if (chrome.runtime.lastError) {
            console.log('Chrome Runtime Error', chrome.runtime.lastError.message);
        } else if (cb) {
            cb(value);
        }
    });
}

function storageRemove(names, cb = null) {
    getStorage().remove(names, () => {
        if (cb)
            cb(names);
    });
}
function storageGetEverything(cb) {
    getStorage().get(null, cb);
}
function storageSetEverything(value, cb) {
    getStorage().set(value, cb);
}

function getDefaultSettings(_list = options_list) {
    const settings = {}
    for (let option in _list)
        settings[option] = _list[option].default;
    //console.log("Default settings :", settings);
    return settings;
}

function getStoredSettings(cb, key = "settings", _list = options_list) {
    const settings = getDefaultSettings(_list);
    storageGet(key, settings, async (stored_settings) => {
        //console.log("Beyond20: Stored settings (" + key + "):", stored_settings);
        const migrated_keys = [];
        for (let opt in settings) {
            if (_list[opt].type == "migrate") {
                if (Object.keys(stored_settings).includes(opt)) {
                    if (stored_settings[opt] != _list[opt].default) {
                        // Migrate opts over when loading them;
                        stored_settings[_list[opt].to] = stored_settings[opt];
                        migrated_keys.push(opt);
                    }
                    delete stored_settings[opt];
                }
            } else if (!Object.keys(stored_settings).includes(opt)) {
                // On Firefox, if setting is not in storage, it won't return the default value
                stored_settings[opt] = settings[opt];
            }
        }
        // Migrate settings from sync storage to local storage
        if (!stored_settings["migrated-sync-settings"]) {
            await new Promise(resolve => {
                chrome.storage.sync.get({ [key]: stored_settings }, (items) => {
                    stored_settings = Object.assign(stored_settings, items[key]);
                    resolve();
                });
            });;
            stored_settings["migrated-sync-settings"] = true;
            migrated_keys.push("migrated-sync-settings");
        }
        if (migrated_keys.length > 0) {
            console.log("Beyond20: Migrated some keys:", stored_settings);
            storageSet(key, stored_settings);
        }
        cb(stored_settings);
    });
}

function setSettings(settings, cb = null, key = "settings") {
    storageSet(key, settings, (settings) => {
        console.log("Beyond20: Saved settings (" + key + "): ", settings);
        if (cb)
            cb(settings);
    });
}

function mergeSettings(settings, cb = null, key = "settings", _list = options_list) {
    console.log("Saving new settings (" + key + "): ", settings);
    getStoredSettings((stored_settings) => {
        for (let k in settings)
            stored_settings[k] = settings[k];
        setSettings(stored_settings, cb, key);
    }, key, _list);
}

function resetSettings(cb = null, _list = options_list) {
    setSettings(getDefaultSettings(_list), cb);
}

function createHTMLOptionEx(name, option, short = false, {advanced=false}={}) {
    if (option.hidden || (short && !option.short) || !option.title)
        return null;
    if (!advanced && option.advanced) return null; // Hide advanced if not in advanced mode
    if (advanced && !option.advanced) return null; // Hide non-advanced if in advanced mode

    const description = short ? option.short_description : option.description;
    const description_p = description ? description.split("\n").map(desc => E.p({}, desc)) : [];
    const title = short ? option.short : option.title;
    let e = null;
    if (option.type == "bool") {
        e = E.li({ class: "list-group-item beyond20-option beyond20-option-bool" },
            E.label({ class: "list-content", for: name },
                E.h4({}, title),
                ...description_p,
                E.div({ class: 'material-switch pull-right' },
                    E.input({ id: name, class: "beyond20-option-input", name, type: "checkbox" }),
                    E.label({ for: name, class: "label-default" })
                )
            )
        );
    } else if (option.type == "string") {
        e = E.li({ class: "list-group-item beyond20-option beyond20-option-string" },
            E.label({ class: "list-content", for: name },
                E.h4({}, title),
                ...description_p,
                E.div({ class: "right-entry" },
                    E.input({ id: name, class: "beyond20-option-input", name, type: "text" })
                )
            )
        );
    } else if (option.type == "combobox") {
        const dropdown_options = Object.values(option.choices).map(o => E.li({}, E.a({ href: "#" }, o)));
        for (let p of description_p) {
            p.classList.add("select");
        }
        e = E.li({ class: "list-group-item beyond20-option beyond20-option-combobox" },
            E.label({ class: "list-content", for: name },
                E.h4({ class: "select" }, title),
                ...description_p,
                E.div({ class: "button-group" },
                    E.a({ id: name, class: "input select beyond20-option-input", href: "" }, option.choices[option.default]),
                    E.ul({ class: "dropdown-menu" },
                        ...dropdown_options),
                    E.i({ id: `${name}--icon`, class: "icon select" })
                )
            )
        );
    } else if (option.type == "link") {
        e = E.li({ class: "list-group-item beyond20-option beyond20-option-link" },
            E.label({ class: "list-content", id: name },
                E.a({ href: option.default },
                    E.h4({}, title)),
                ...description_p,
                E.a({ href: option.default },
                    E.div({ class: "image-link" },
                        E.img({
                            class: "link-image",
                            width: option['icon-width'],
                            height: option['icon-height'],
                            src: option.icon.startsWith("/") ? chrome.runtime.getURL(option.icon) : option.icon
                        })
                    )
                )
            )
        );
    } else if (option.type == "info") {
        e = E.li({ class: "list-group-item beyond20-option beyond20-option-info" },
            E.label({ class: "list-content", for: name, style: "background-color: LightCyan;"},
                E.h4({}, title),
                ...description_p
            )
        );
    } else if (option.type == "special") {
        e = option.createHTMLElement(name, short);
    }
    return e;
}

function createHTMLOption(name, short = false, _list = options_list, {advanced}={}) {
    return createHTMLOptionEx(name, _list[name], short, {advanced});
}

function initializeMarkaGroup(group) {
    const triggerOpen = $(group).find('.select');
    const triggerClose = $(group).find('.dropdown-menu li');
    const dropdown_menu = $(group).find(".dropdown-menu");
    const button_group = $(group).find(".button-group");
    const marka = $(group).find('.icon');
    const input = $(group).find('.input');

    // set initial Marka icon;
    const m = new Marka('#' + marka.attr("id"));
    m.set('triangle').size(10);
    m.rotate('down');

    // trigger dropdown;
    $(group).find('.button-group').push(marka);
    makeOpenCB = (dropdown_menu, icon, m) => {
        return (event) => {
            event.preventDefault();
            dropdown_menu.toggleClass('open');
            button_group.toggleClass('open');

            if (icon.hasClass("marka-icon-times")) {
                m.set('triangle').size(10);
            } else {
                m.set('times').size(15);
            }
        }
    }
    makeCloseCB = (dropdown_menu, input, m) => {
        return function (event) {
            event.preventDefault();
            input.text(this.innerText);
            input.trigger("markaChanged");
            dropdown_menu.removeClass('open');
            button_group.removeClass('open');
            m.set('triangle').size(10);
        }
    }

    triggerOpen.click(makeOpenCB(dropdown_menu, marka, m));
    triggerClose.click(makeCloseCB(dropdown_menu, input, m));
    return m;
}

function initializeMarka() {
    const groups = $('.beyond20-option-combobox');

    for (let group of groups.toArray())
        initializeMarkaGroup(group);
}

function extractSettingsData(_list = options_list) {
    const settings = {}
    for (let option in _list) {
        const e = $("#" + option);
        if (e.length > 0) {
            const o_type = _list[option].type;
            if (o_type == "bool") {
                settings[option] = e.prop('checked');
            } else if (o_type == "combobox") {
                const val = e.text();
                const choices = _list[option].choices;
                for (let key in choices) {
                    if (choices[key] == val) {
                        settings[option] = key;
                        break;
                    }
                }
            } else if (o_type == "string") {
                settings[option] = e.val();
            } else if (o_type == "special") {
                settings[option] = _list[option].get(option);
            }
        }
    }
    return settings;
}

function loadSettings(settings, _list = options_list) {
    for (let option in settings) {
        if (!_list[option]) {
            continue;
        }
        const o_type = _list[option].type;
        if (o_type == "bool") {
            $("#" + option).prop('checked', settings[option]);
        } else if (o_type == "combobox") {
            const val = settings[option];
            const choices = _list[option].choices;
            $("#" + option).text(choices[val]);
        } else if (o_type == "string") {
            $("#" + option).val(settings[option]);
        } else if (o_type == "special") {
            _list[option].set(option, settings);
        }
    }
}

function restoreSavedSettings(cb = null, key = "settings", _list = options_list) {
    load = (stored_settings) => {
        loadSettings(stored_settings, _list);
        if (cb)
            cb(stored_settings);
    }
    getStoredSettings(load, key, _list);
}

function saveSettings(cb, key = "settings", _list = options_list) {
    mergeSettings(extractSettingsData(_list), cb, key, _list);
}

function initializeSettings(cb = null) {
    initializeMarka();
    restoreSavedSettings(cb);
}

function createRoll20TabCombobox(name, short, dropdown_options) {
    const opt = options_list[name];
    const description = short ? "Restrict where rolls are sent.\nUseful if you have multiple VTT windows open" : opt.description;
    const title = short ? "Send Beyond 20 rolls to" : opt.title;
    const description_p = description.split("\n").map(desc => E.p({}, desc));
    let options = [];
    for (let option of dropdown_options)
        options.push(E.li({}, E.a({ href: "#" }, option)));
    for (let p of description_p)
        p.classList.add("select");

    return E.li({
        id: "beyond20-option-vtt-tab",
        class: "list-group-item beyond20-option beyond20-option-combobox" + (short ? " vtt-tab-short" : "")
    },
        E.label({ class: "list-content", for: name },
            E.h4({ class: "select" }, title),
            ...description_p,
            E.div({ class: "button-group" },
                E.a({ id: name, class: "input select beyond20-option-input", href: "" }, "All VTT Tabs"),
                E.ul({ class: "dropdown-menu" },
                    ...options),
                E.i({ id: `${name}--icon`, class: "icon select" })
            )
        )
    );
}

function createVTTTabSetting(name, short) {
    const dropdown_options = ["All VTT Tabs",
        "Only Roll20 Tabs",
        "Only Foundry VTT Tabs",
        "D&D Beyond Dice Roller & Discord"];

    if (short) {
        const vtt = isFVTT(current_tab.title) ? "Foundry VTT" : "Roll20";
        const campaign = vtt == "Foundry VTT" ? "World" : "Campaign";
        dropdown_options.push("This " + campaign);
        dropdown_options.push("This Specific Tab");

    }
    return createRoll20TabCombobox(name, short, dropdown_options);

}
function setVTTTabSetting(name, settings) {
    const val = settings[name];
    const combobox = $("#beyond20-option-vtt-tab");
    if (combobox.length == 0) return;
    if (val === null) {
        $("#" + name).text("All VTT Tabs");
    } else if (val.title === null) {
        const vtt = val.vtt || "roll20";
        let choice = "";
        if (vtt == "dndbeyond") {
            choice = "D&D Beyond Dice Roller & Discord";
        } else {
            const vtt_name = vtt == "roll20" ? "Roll20" : "Foundry VTT";
            choice = "Only " + vtt_name + " Tabs";
        }
        $("#" + name).text(choice);
    } else {
        const [id, title, vtt] = [val.id, val.title, val.vtt || "roll20"];
        const vtt_name = vtt == "roll20" ? "Roll20" : "Foundry VTT";
        const campaign = vtt == "roll20" ? "Campaign" : "World";
        const short = combobox.hasClass("vtt-tab-short");
        let new_options = null;
        if (short) {
            console.log("Set roll20 tab, is SHORT ", val);
            const current_vtt = isFVTT(current_tab.title) ? "fvtt" : "roll20";
            const current_campaign = current_vtt == "roll20" ? "Campaign" : "World";
            const current_title = current_vtt == "roll20" ? roll20Title(current_tab.title) : fvttTitle(current_tab.title);
            const current_id = current_tab.id;
            console.log("vtt-tab settings are : ", id, title, vtt, current_id, current_title, current_vtt);
            if (id == 0 && title == current_title && current_vtt == vtt) {
                $("#" + name).text("This " + campaign);
            } else if (id == current_id && title == current_title && current_vtt == vtt) {
                $("#" + name).text("This Specific Tab");
            } else {
                new_options = ["All VTT Tabs",
                    "Only Roll20 Tabs",
                    "Only Foundry VTT Tabs",
                    "D&D Beyond Dice Roller & Discord",
                    "This " + current_campaign,
                    "This Specific Tab"];
                if (current_vtt == vtt) {
                    new_options.push("Another tab || " + campaign.toLowerCase() + " (No change)");
                } else {
                    new_options.push("A " + vtt_name + " " + campaign.toLowerCase() + " (No change)");
                }
            }
        } else {
            console.log("Set vtt tab, is LONG ", val);
            console.log("vtt-tab settings are : ", id, title, vtt);
            new_options = ["All VTT Tabs",
                "Only Roll20 Tabs",
                "Only Foundry VTT Tabs",
                "D&D Beyond Dice Roller & Discord",
                campaign + ": " + title];
            if (id != 0) {
                new_options.push("Tab #" + id + " (" + title + ")");

            }
        }
        if (new_options !== null) {
            const dropdown_options = [];
            for (let option of new_options)
                dropdown_options.push(E.li({}, E.a({ href: "#" }, option)));
            combobox.replaceWith(createRoll20TabCombobox("vtt-tab", short, dropdown_options));
            initializeMarkaGroup($("#beyond20-option-vtt-tab"));
            console.log("Added new options", dropdown_options);
            $("#" + name).text(new_options.slice(-1)[0].replace("(No change)", ""));
            $("#" + name).attr("x-beyond20-id", id);
            $("#" + name).attr("x-beyond20-title", title);
            $("#" + name).attr("x-beyond20-vtt", vtt);

        }
    }
}

function getVTTTabSetting(name) {
    const opt = $("#" + name);
    const value = opt.text();
    const saved_id = opt.attr("x-beyond20-id");
    const saved_title = opt.attr("x-beyond20-title");
    const saved_vtt = opt.attr("x-beyond20-vtt");
    let ret = null;
    if (value == "All VTT Tabs") {
        ret = null;
    } else if (["This Campaign", "This World", "This Specific Tab"].includes(value)) {
        const vtt = isFVTT(current_tab.title) ? "fvtt" : "roll20";
        const title = vtt == "fvtt" ? fvttTitle(current_tab.title) : roll20Title(current_tab.title);
        ret = {
            "id": (["This Campaign", "This World"].includes(value) ? 0 : current_tab.id),
            "title": title,
            "vtt": vtt
        }
    } else if (value == "Only Roll20 Tabs") {
        ret = { "id": 0, "title": null, "vtt": "roll20" }
    } else if (value == "Only Foundry VTT Tabs") {
        ret = { "id": 0, "title": null, "vtt": "fvtt" }
    } else if (value == "D&D Beyond Dice Roller & Discord") {
        ret = { "id": 0, "title": null, "vtt": "dndbeyond" }
    } else if (value.startsWith("Campaign: ") || value.startsWith("World: ")) {
        ret = { "id": 0, "title": saved_title, "vtt": saved_vtt }
    } else {
        // "Another tab || campaign (No change)", "A Roll20 game", "A FVTT game", "Tab #";
        ret = { "id": saved_id, "title": saved_title, "vtt": saved_vtt }
    }
    console.log("Get tab: ", ret);
    return ret;
}

function setCurrentTab(tab) {
    current_tab = tab;
}

var current_tab = null;


function createDiscordChannelsCombobox(name, description, title, dropdown_options) {
    const description_p = description.split("\n").map(desc => E.p({}, desc));
    let options = [];
    for (let option of dropdown_options) {
        const name = option.secret ? E.strong({}, option.name) : option.name;
        const attributes = {};
        if (option.action)
            attributes['data-action'] = option.action;
        if (option.secret !== undefined)
            attributes['data-secret'] = option.secret;
        attributes.style = "overflow: hidden; text-overflow: ellipsis;";
        options.push(E.li(attributes, E.a({ href: "#" }, name)));
    }
    for (let p of description_p)
        p.classList.add("select");

    return E.li({
        id: `beyond20-option-${name}`,
        class: "list-group-item beyond20-option beyond20-option-combobox"
    },
        E.label({ class: "list-content", for: name },
            E.h4({ class: "select" }, title),
            ...description_p,
            E.div({ class: "button-group" },
                E.a({ id: name, class: "input select beyond20-option-input", href: "", style: "overflow: hidden; text-overflow: ellipsis;" }, dropdown_options[0].name),
                E.ul({ class: "dropdown-menu", style: "max-width: 300px;" },
                    ...options),
                E.i({ id: `${name}--icon`, class: "icon select" })
            )
        )
    );
}

function createDiscordChannelsSetting(name, short) {
    const opt = options_list[name];
    const dropdowns = [{ name: "Do not send to Discord", active: true, secret: "" }]
    return createDiscordChannelsCombobox(name, opt.description, opt.title, dropdowns);
}

function setDiscordChannelsSetting(name, settings) {
    let val = settings[name];
    const dropdowns = [{ name: "Do not send to Discord", active: false, secret: "" }]

    if (typeof (val) === "string")
        val = [{ secret: val, name: "Unnamed Channel", active: true }];
    const channels = val || [];
    dropdowns.push(...channels)
    if (!dropdowns.find(d => d.active)) dropdowns[0].active = true;
    if (dropdowns.find(d => d.secret)) dropdowns.push({ name: "Delete selected channel", action: "delete" })
    dropdowns.push({ name: "Add new channel", action: "add" })

    console.log("Added new options", dropdowns);
    fillDisordChannelsDropdown(name, dropdowns);
}
function fillDisordChannelsDropdown(name, dropdowns, triggerChange=false, _list = options_list) {
    const settings_line = $(`#beyond20-option-${name}`);
    if (settings_line.length == 0) return;
    const opt = _list[name];
    settings_line.replaceWith(createDiscordChannelsCombobox(name, opt.description, opt.title, dropdowns));
    const markaGroup = $(`#beyond20-option-${name}`)
    const dropdown_menu = $(markaGroup).find(".dropdown-menu");
    const button_group = $(markaGroup).find(".button-group");
    const input = $(markaGroup).find('.input');
    const m = initializeMarkaGroup(markaGroup);

    const active = dropdowns.find(d => d.active);
    input.text(active.name);
    input.attr("data-secret", active.secret.slice(0, 12));

    $(`#beyond20-option-${name} li`).off('click').click(ev => {
        ev.stopPropagation();
        ev.preventDefault()
        const li = ev.currentTarget;
        const secret = li.dataset.secret;

        if (secret !== undefined) {
            input.text(li.textContent);
            input.attr("data-secret", secret.slice(0, 12));
        }
        dropdown_menu.removeClass('open');
        button_group.removeClass('open');
        m.set('triangle').size(10);
        dropdowns.forEach(d => d.active = (d.name === li.textContent && d.secret === secret))
        fillDisordChannelsDropdown(name, dropdowns, true, _list);
    });
    $(`#beyond20-option-${name} li[data-action=add]`).off('click').click(ev => {
        ev.stopPropagation();
        ev.preventDefault()

        dropdown_menu.removeClass('open');
        button_group.removeClass('open');
        m.set('triangle').size(10);
        alertify.prompt('Enter a friendly name for the discord channel you wish to add', '', (evt, channelName) => {
            console.log("Got evt ", evt, channelName);
            setTimeout(() => {
                alertify.prompt('Enter the secret value given by the Beyond20 Bot', '', (evt, channelSecret) => {
                    console.log("Adding new channel ", channelName, channelSecret);
                    dropdowns.splice(1, 0, {name: channelName, secret: channelSecret});
                    fillDisordChannelsDropdown(name, dropdowns, true, _list);
                });
            }, 100);
        });
    });
    $(`#beyond20-option-${name} li[data-action=delete]`).off('click').click(ev => {
        ev.stopPropagation();
        ev.preventDefault();
        console.log("DELETE");
        dropdown_menu.removeClass('open');
        button_group.removeClass('open');
        m.set('triangle').size(10);
        const toDelete = dropdowns.findIndex(d => d.active);
        if (toDelete > 0) {
            dropdowns.splice(toDelete, 1);
            dropdowns[0].active = true;
            fillDisordChannelsDropdown(name, dropdowns, true, _list);
        }
    });
    if (triggerChange)
        input.trigger("markaChanged");
}

function getDiscordChannelsSetting(name) {
    const combobox = $("#beyond20-option-discord-channels .dropdown-menu li");
    const opt = $("#" + name);
    const value = opt.attr("data-secret");
    const channels = [];
    for (let option of combobox.toArray()) {
        const secret = option.dataset.secret;
        if (secret)
            channels.push({ name: option.textContent, secret })
    }
    if (value) {
        const active = channels.find(c => c.secret.slice(0, 12) === value);
        if (active)
            active.active = true;
    }
    console.log("Get Discord channels : ", channels);
    return channels;
}

function createDiscordTargetSetting(name, short) {
    const opt = character_settings[name];
    const dropdowns = [{ name: "Send to default target", active: true, secret: "" }]
    return createDiscordChannelsCombobox(name, opt.description, opt.title, dropdowns);
}

function setDiscordTargetSetting(name, charSettings) {
    let val = charSettings[name];
    const dropdowns = [{ name: "Send to default target", active: false, secret: "" }]
    const channels = settings['discord-channels'] || []; // get settings from the global variable
    dropdowns.push(...channels)
    const selected = dropdowns.find(c => c.secret.slice(0, 12) === val);
    if (selected) selected.active = true;
    else dropdowns[0].active = true;

    fillDisordChannelsDropdown(name, dropdowns, false, character_settings);
}

function getDiscordTargetSetting(name) {
    return $(`#${name}`).attr("data-secret");
}

function getDiscordChannel(settings, character) {
    const channels = (settings["discord-channels"] || [])
    if (typeof (channels) === "string")
        return channels;
    const target = (character && character["discord-target"]) || null;
    return channels.find(c => target ? c.secret.slice(0, 12) === target : c.active);
}

let key_bindings = {
    ShiftLeft: "advantage",
    ControlLeft: "disadvantage",
    ShiftRight: "super_advantage",
    ControlRight: "super_disadvantage",
    AltLeft: "normal_roll"
};
try {
    // Mac OS X uses Command instead of Control, since Control+click = right click because mac mice have 1 button...
    if (getPlatform() === "Mac") {
        key_bindings.MetaLeft = "disadvantage";
        key_bindings.MetaRight = "super_disadvantage";
    }
} catch (err) {
    // Just in case...
}

const BINDING_NAMES = {
    "": "Click to configure hotkey",
    normal_roll: "Normal Roll",
    advantage: "Roll with Advantage",
    super_advantage: "Roll with Super Advantage",
    disadvantage: "Roll with Disadvantage",
    super_disadvantage: "Roll with Super Disadvantage",
    whisper: "Whisper Rolls",
    dont_whisper: "Don't Whisper Rolls",
    whisper_hide_names: "Hide Monster Name & Attack",
    force_critical: "Force Critical Hit Attack/Damage",
    versatile_one_handed: "Use Versatile Weapon One-handed",
    versatile_two_handed: "Use Versatile Weapon Two-handed",
    custom_modifier: "Custom Modifier",
    custom_damage: "Custom Damage",
    display_attack: "Display instead of rolling an Attack"
}

function configureHotKey(bindings, bindings_div, html, key) {
    const alert = $(`
        <div>
            Press a key to register the new hotkey.
        </div>
    `);
    if (key) {
        const keyName = key.replace(/^Key|^Digit/, "");
        alert.append($(`<div>Current key is : <strong>${keyName}</strong></div>`));
    }
    let newKey = null;
    const $window = $(window);
    const onKeydown = (event) => {
        $window.off('keydown', null, onKeydown);
        console.log(key, event)
        if ((key !== event.code && key !== event.key) &&
            (bindings[event.code] !== undefined || bindings[event.key] !== undefined)) {
            alertify.warning("Hotkey already in use");
            dialog.close();
            return;
        }
        newKey = event.code;
        let binding = bindings[key];
        let custom_formula = "";
        let permanent_toggle = false;
        if (binding.startsWith("custom_damage")) {
            custom_formula = binding.slice("custom_damage:".length).trim();
            binding = "custom_damage";
        } else if (binding.startsWith("custom_modifier")) {
            custom_formula = binding.slice("custom_modifier:".length).trim();
            binding = "custom_modifier";
        } else if (binding.startsWith("toggle-")) {
            permanent_toggle = true;
            binding = `option-${binding.slice("toggle-".length)}`;
        }
        const newKeyName = newKey.replace(/^Key|^Digit/, "");
        const actions = $(`
            <div>
                <div>
                    Select the action to perform when <strong>${newKeyName}</strong> is pressed :
                </div>
                <select style="margin: 5px;">
                    <option value="">None</option>
                </select>
                <div class="custom_formula" style="display: none">
                    <label style="margin: 5px;"> Custom Formula : 
                        <input type="text" value="${custom_formula}">
                    </label>
                </div>
                <div class="toggle_options" style="display: none">
                    <label style="margin: 5px;">
                        <b>Permanently toggle the setting when the hotkey is pressed</b>
                        <input type="checkbox" ${permanent_toggle ? "checked" : ""}>
                    </label>
                    <div>
                      <small>A temporary toggle will only apply while the hotkey is pressed</small>
                    </div>
                    <div>
                      <small>A permanent toggle will change the option until pressed again or changed from the settings</small>
                    </div>
                </div>
            </div>
        `)
        const select = actions.find("select");
        const custom_div = actions.find(".custom_formula");
        const toggles_div = actions.find(".toggle_options");
        let group = $(`<optgroup label="Override Global Settings"></optgroup>`);
        select.append(group);
        for (const action in BINDING_NAMES) {
            if (!action) continue;
            group.append($(`
                <option value="${action}" ${binding === action ? "selected": ""}>${BINDING_NAMES[action]}</option>
            `));
        }
        group = $(`<optgroup label="Toggle Character-Specific setting"></optgroup>`)
        select.append(group);
        for (const name in character_settings) {
            const option = character_settings[name];
            const action = `option-${name}`;
            if (option.hidden || option.type !== "bool") continue;
            group.append($(`
                <option value="${action}" ${binding === action ? "selected": ""}>${option.title}</option>
            `));
        }
        select.on('input', ev => {
            const value = select.val();
            if (value.startsWith("custom_modifier") || value.startsWith("custom_damage")) {
                custom_div.show();
            } else {
                custom_div.hide();
            }
            if (value.startsWith("option-")) {
                toggles_div.show();
            } else {
                toggles_div.hide();
            }
        });
        select.trigger('input');
        alert.empty().append(actions)
    };
    const onOK = () => {
        $window.off('keydown', null, onKeydown);
        if (!newKey) return;
        let action = alert.find("select").val() || "";
        const custom_formula = alert.find(".custom_formula input").val() || "";
        if (action === "custom_modifier" || action === "custom_damage") {
            action = `${action}: ${custom_formula}`;
        }
        if (action.startsWith("option-")) {
            const toggle = alert.find(".toggle_options input")[0].checked;
            if (toggle) {
                action = action.replace(/^option-/, "toggle-")
            }
        }
        html.remove();
        delete bindings[key];
        bindings[newKey] = action;
        addHotKeyToUI(bindings, bindings_div, newKey);
    }
    const onCancel = () => {
        $window.off('keydown', null, onKeydown);
    };
    $window.on('keydown', onKeydown);
    if (alertify.Beyond20HotkeyConfirm === undefined)
        alertify.dialog('Beyond20HotkeyConfirm', function () { return {}; }, false, "confirm");
    const dialog = alertify.Beyond20HotkeyConfirm('Configure Hotkey', alert[0], () => onOK(), () => onCancel());
}

function getHotKeyBindingName(key) {
    let name = BINDING_NAMES[key] || key;
    if (name.startsWith("option-") && character_settings[name.slice("option-".length)]) {
        name = character_settings[name.slice("option-".length)].title;
    }
    if (name.startsWith("toggle-") && character_settings[name.slice("toggle-".length)]) {
        name = character_settings[name.slice("toggle-".length)].title + "✅";
    }
    if (name.startsWith("custom_modifier:")) {
        name = BINDING_NAMES["custom_modifier"] + ": " + name.slice("custom_modifier:".length);
    }
    if (name.startsWith("custom_damage:")) {
        name = BINDING_NAMES["custom_damage"] + ": " + name.slice("custom_damage:".length);
    }
    return name;
}

function addHotKeyToUI(bindings, bindings_div, key) {
    const binding_name = getHotKeyBindingName(bindings[key]);
    const keyName = (key || "").replace(/^Key|^Digit/, "");
    const html = $(`
        <div style="border-bottom: 1px grey solid; display: flex; justify-content: space-between;">
            <div class="hotkey-event" style="cursor: pointer; flex-shrink: 1; padding: 5px; font-weight: bold;">${keyName}</div>
            <div class="hotkey-action" style="cursor: pointer; overflow: hidden; text-overflow: ellipsis; text-align: center; padding: 5px; flex-grow: 1;">${binding_name}</div>
            <span class="delete-hotkey" style="width:15px; height:15px; padding: 3px; flex-shrink: 1;font-weight: 900; font-size: medium;">X</span>
        </div>
    `);
    html.find(".delete-hotkey").click(ev => {
        html.remove();
        delete bindings[key];
        if (Object.keys(bindings).length == 0) {
            bindings_div.find(".no-bindings").show();
            bindings_div.find(".bindings-header").css({display: "none"});
        }
    });
    html.find(".hotkey-event, .hotkey-action").click(ev => {
        configureHotKey(bindings, bindings_div, html, key);
    });
    bindings_div.append(html);
    return html;
}

async function promptHotkeyManager(bindings) {
    // Use defaults if value is invalid or never set
    if (!bindings)
        bindings = {...key_bindings};
    console.log("Hotkeys manager");
    const manager = $(`
    <div class="hotkeys-manager">
        <div class="key-bindings">
            <div class="bindings-header" style="border: 1px grey solid; border-radius: 5px; display: none; justify-content: space-between">
                <div style="flex-shrink: 1; padding: 5px; font-weight: bold;">Hotkey</div>
                <div style="flex-grow: 1; padding: 5px; text-align: center; font-weight: bold;">Action</div>
                <div style="flex-shrink: 1; padding: 5px; font-weight: bold;">Delete</div>
            </div>
            <span class="no-bindings">No key bindings configured.</span>
        </div>
        <div class="save">
            <button class="btn add-hotkey">Add new Hotkey</button>
        </div>
    </div>
    `)
    const bindings_div = manager.find(".key-bindings");
    const add_button = manager.find("button.add-hotkey");
    for (const key in bindings) {
        addHotKeyToUI(bindings, bindings_div, key);
    }
    if (Object.keys(bindings).length > 0) {
        bindings_div.find(".no-bindings").hide();
        bindings_div.find(".bindings-header").css({display: "flex"});
    }
    add_button.click(ev => {
        if (bindings[null] !== undefined) return;
        bindings[null] = "";
        const html = addHotKeyToUI(bindings, bindings_div, null);
        bindings_div.find(".no-bindings").hide();
        bindings_div.find(".bindings-header").css({display: "flex"});
        configureHotKey(bindings, bindings_div, html, null)
    });

    return new Promise(resolve => {
        alertify.confirm('Beyond20 Hotkey Manager', manager[0], () => {
            delete bindings[null];
            resolve(bindings);
        }, () => {});
    });
}

function openHotkeyManager(button) {
    let bindings = null;
    try {
        bindings = JSON.parse(button.attr("data-bindings"));
    } catch (err) {}

    promptHotkeyManager(bindings).then(new_bindings => {
        button.attr("data-bindings", JSON.stringify(new_bindings));
        button.trigger("change");
    });
}
function createHotkeysSetting(name, short) {
    const opt = options_list[name];
    const description_p = opt.description.split("\n").map(desc => E.p({}, desc));
    for (let p of description_p)
        p.classList.add("select");

    const setting = E.li({
        id: "beyond20-option-hotkeys-bindings",
        class: "list-group-item beyond20-option beyond20-option-bool" 
    },
        E.label({ class: "list-content", for: name },
            E.h4({}, opt.title),
            ...description_p,
            E.div({ class: "save button-group" },
                E.button({ id: name, name, class: "beyond20-option-input btn", type: "button", "data-bindings": "" }, "Set Hotkeys"),
            )
        )
    );
    const button = $(setting).find("button");
    button.click(ev => {
        ev.stopPropagation();
        ev.preventDefault();
        openHotkeyManager(button);
    });

    return setting;
}
function setHotkeysSetting(name, settings) {
    const val = getKeyBindings(settings);
    const button = $(`#${name}`);
    button.attr("data-bindings", JSON.stringify(val));
}
function getHotkeysSetting(name) {
    const button = $(`#${name}`);
    try {
        return JSON.parse(button.attr("data-bindings"));
    } catch (err) {
        // Fallback on current settings or on default
        return {...key_bindings};
    }
}
function getKeyBindings(settings) {
    if (!settings['hotkeys-bindings']) return key_bindings;
    const bindings = settings['hotkeys-bindings'];
    
    // Migrate < 2.5 to 2.5+ custom modifier/damage key bindings
    for (const key in bindings) {
        const binding = bindings[key];
        for (const dice of [4, 6, 8, 10, 12]) {
            if (binding === `custom_add_damage_d${dice}`) {
                bindings[key] = `custom_damage: + 1d${dice}`;
            } else if (binding === `custom_add_d${dice}`) {
                bindings[key] = `custom_modifier: + 1d${dice}`;
            } else if (binding === `custom_sub_d${dice}`) {
                bindings[key] = `custom_modifier: - 1d${dice}`;
            }
        }
    }
    return bindings;
}


function createCustomDomainsSetting(name, short) {
    const opt = options_list[name];
    const description_p = opt.description.split("\n").map(desc => E.p({}, desc));
    for (let p of description_p)
        p.classList.add("select");
    const apply_button = E.div({class: "save button-group"},
        E.span({}, "You", E.b({}, " must "), " press Apply to request missing permissions"),
        E.button({ class: "beyond20-option-input btn", type: "button"}, "Apply")
    );
    const setting = E.li({
        id: "beyond20-option-custom-domains",
        class: "list-group-item beyond20-option beyond20-option-text" 
    },
        E.label({ class: "list-content", for: name },
            E.h4({}, opt.title),
            ...description_p,
            E.div({},
                E.textarea({ id: name, name, class: "beyond20-option-input"}),
            ),
            apply_button
            
        )
    );
    const button = $(setting).find("button");
    button.click(ev => {
        ev.stopPropagation();
        ev.preventDefault();
        const domains = getCustomDomainsSetting(name);
        for (const url of domains) {
            const chromeOrBrowser = getBrowser() === "Firefox" ? browser : chrome;
            if (!chromeOrBrowser.permissions) {
                alertify.error("Cannot request permissions. Please open the extension's options page and try again");
                return;
            }
            chromeOrBrowser.permissions.request({origins: [url]}).then((response) => {
                if (response) {
                    console.log("Permission was granted");
                    alertify.success(`Beyond20 will now load automatically on ${url}`);
                } else {
                    console.log("Permission was refused");
                    alertify.error(`Error requesting permission for ${url}`);
                }
            }).catch(err => {
                console.error("Error requesting permission for ", url, err);
            });
        }
    });

    return setting;
}
function setCustomDomainsSetting(name, settings) {
    const textarea = $(`#${name}`);
    textarea.val(settings["custom-domains"].join("\n"));
}
function getCustomDomainsSetting(name) {
    const textarea = $(`#${name}`);
    const domains = textarea.val().split("\n");
    const cleaned = domains.filter(url => {
        // Check for a URL with maybe a wildcard subdomain but valid domain and ignore the path portion
        return /^https?:\/\/(?:\*.)?(localhost|[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6})/.test(url);
    })
    textarea.val(cleaned.join("\n"));
    return cleaned;
}


function createRoll20DiscordActivitySetting(name, short) {
    const opt = options_list[name];
    const description_p = opt.description.split("\n").map(desc => E.p({}, desc));
    for (let p of description_p)
        p.classList.add("select");
    const apply_button = E.div({class: "save button-group"},
        E.span({id: name, name}, "🚫 Permissions missing"),
        E.button({ class: "beyond20-option-input btn", type: "button"}, "Request")
    );
    const label = E.div({ class: "save button-group" },
        E.span({id: name, name}, "✅ Permissions granted"),
        E.button({ class: "beyond20-option-input btn", type: "button"}, "Revoke")
    );
    const setting = E.li({
        id: "beyond20-option-roll20-discord-activity",
        class: "list-group-item beyond20-option beyond20-option-text" 
    },
        E.label({ class: "list-content", for: name },
            E.h4({}, opt.title),
            ...description_p,
            apply_button,
            label,
        )
    );
    const button = $(apply_button).find("button");
    button.click(ev => {
        ev.stopPropagation();
        ev.preventDefault();
        const chromeOrBrowser = getBrowser() === "Firefox" ? browser : chrome;
        if (!chromeOrBrowser.permissions) {
            alertify.error("Cannot request permissions. Please open the extension's options page and try again");
            return;
        }
        chromeOrBrowser.permissions.request(DISCORD_ACTIVITY_PERMISSION_DETAILS).then((response) => {
            if (response) {
                console.log("Permission was granted");
                alertify.success(`Beyond20 will now load automatically on Roll20 Discord activity`);
                $(label).show();
                $(apply_button).hide();
                chrome.runtime.sendMessage({ "action": "discord-permissions-updated", permissions: true });
            } else {
                console.log("Permission was refused");
                alertify.error(`Error requesting permission for Roll20 Discord activity`);
            }
        });
    });
    // Hide both the apply button and checkbox until we know if we have the permissions
    $(label).hide();
    $(apply_button).hide();
    const revokeButton = $(label).find("button");
    const chromeOrBrowser = getBrowser() === "Firefox" ? browser : chrome;
    if (chromeOrBrowser.permissions) {
        chromeOrBrowser.permissions.contains(DISCORD_ACTIVITY_PERMISSION_DETAILS).then((hasPermission) => {
            if (hasPermission) {
                $(label).show();
            } else {
                $(apply_button).show();
            }
        });
    } else {
        // No permissions API? Probably an alertify options dialog on Firefox, assume no permissions found
        $(apply_button).show();
    }
    revokeButton.click(ev => {
        ev.stopPropagation();
        ev.preventDefault();
        if (!chromeOrBrowser.permissions) {
            alertify.error("Cannot revoke permissions. Please open the extension's options page and try again");
            return;
        }
        chromeOrBrowser.permissions.remove(DISCORD_ACTIVITY_PERMISSION_DETAILS).then((removed) => {
            if (removed) {
                $(label).hide();
                $(apply_button).show();
                chrome.runtime.sendMessage({ "action": "discord-permissions-updated", permissions: false });
            }
        });
    });

    return setting;
}
function setRoll20DiscordActivitySetting(name, settings) {
}
function getRoll20DiscordActivitySetting(name) {
}

function createBackupRestoreSetting(name, short) {
    const backup = (name === "backup-settings");
    const opt = options_list[name];
    const description_p = opt.description.split("\n").map(desc => E.p({}, desc));
    const label = backup ? "Export" : "Import";
    // If import, add a hidden file input
    if (!backup) {
        description_p.push(E.input({
            style: "display: none;",
            type: "file",
            accept: ".json",
        }))
    }
    const setting = E.li({
        id: `beyond20-option-${name}`,
        class: "list-group-item beyond20-option beyond20-option-text" 
    },
        E.label({ class: "list-content", for: name },
            E.h4({}, opt.title),
            ...description_p,
            E.div({class: "save button-group"},
                E.button({ class: "beyond20-option-input btn", type: "button"}, label),
            )
        )
    );
    const button = $(setting).find("button");
    const input = $(setting).find("input");
    button.click(ev => {
        ev.stopPropagation();
        ev.preventDefault();
        if (backup) {
            // Export
            storageGetEverything(allSettings => {
                allSettings.beyond20 = {format: 1};
                const blob = new Blob([JSON.stringify(allSettings)], {type: "application/json"});
                saveAs(blob, "Beyond20.json");
            });
        } else {
            // Import
            input.click();
        }
    });
    if (!backup) {
        input.on('change', (ev) => {
            if (input[0].files.length === 0) return;
            const file = input[0].files[0];
            const fr = new FileReader();
            fr.addEventListener("load", () => {
                try {
                    const allSettings = JSON.parse(fr.result);
                    if (!allSettings.beyond20 || allSettings.beyond20.format !== 1) {
                        throw new Error("File doesn't contain Beyond20 settings");
                    }
                    delete allSettings.beyond20;
                    storageSetEverything(allSettings, () => {
                        for (const key in allSettings) {
                            if (key === "settings") {
                                chrome.runtime.sendMessage({ "action": "settings", "type": "general", "settings": allSettings[key] });
                            } else if (key.startsWith("character-")) {
                                const id = key.slice("character-".length);
                                chrome.runtime.sendMessage({ "action": "settings", "type": "character", "id": id, "settings": allSettings[key] })
                            }
                        }
                        alertify.success("Beyond20 settings loaded successfully");
                    });
                } catch (err) {
                    alertify.error(`Unable to load selected file : ${err.message}`);
                }
            }, false);
            fr.addEventListener("error", (ev) => {
                alertify.error("Unable to load selected file");
            }, false);
            fr.readAsText(file);
        })
    }

    return setting;
}
function setBackupRestoreSetting(name, settings) {
}
function getBackupRestoreSetting(name) {
}

options_list["vtt-tab"]["createHTMLElement"] = createVTTTabSetting;
options_list["vtt-tab"]["set"] = setVTTTabSetting;
options_list["vtt-tab"]["get"] = getVTTTabSetting;
options_list["discord-channels"]["createHTMLElement"] = createDiscordChannelsSetting;
options_list["discord-channels"]["set"] = setDiscordChannelsSetting;
options_list["discord-channels"]["get"] = getDiscordChannelsSetting;
options_list["hotkeys-bindings"]["createHTMLElement"] = createHotkeysSetting;
options_list["hotkeys-bindings"]["set"] = setHotkeysSetting;
options_list["hotkeys-bindings"]["get"] = getHotkeysSetting;
options_list["custom-domains"]["createHTMLElement"] = createCustomDomainsSetting;
options_list["custom-domains"]["set"] = setCustomDomainsSetting;
options_list["custom-domains"]["get"] = getCustomDomainsSetting;
options_list["roll20-discord-activity"]["createHTMLElement"] = createRoll20DiscordActivitySetting;
options_list["roll20-discord-activity"]["set"] = setRoll20DiscordActivitySetting;
options_list["roll20-discord-activity"]["get"] = getRoll20DiscordActivitySetting;
character_settings["discord-target"]["createHTMLElement"] = createDiscordTargetSetting;
character_settings["discord-target"]["set"] = setDiscordTargetSetting;
character_settings["discord-target"]["get"] = getDiscordTargetSetting;

options_list["backup-settings"]["createHTMLElement"] = createBackupRestoreSetting;
options_list["backup-settings"]["set"] = setBackupRestoreSetting;
options_list["backup-settings"]["get"] = getBackupRestoreSetting;

options_list["restore-settings"]["createHTMLElement"] = createBackupRestoreSetting;
options_list["restore-settings"]["set"] = setBackupRestoreSetting;
options_list["restore-settings"]["get"] = getBackupRestoreSetting;

const ROLL20_URL = "*://app.roll20.net/editor/*";
const FVTT_URL = "*://*/*game";
const DNDBEYOND_CHARACTER_URL = "*://*.dndbeyond.com/*characters/*";
const DNDBEYOND_MONSTER_URL = "*://*.dndbeyond.com/monsters/*";
const DNDBEYOND_ENCOUNTERS_URL = "*://*.dndbeyond.com/my-encounters";
const DNDBEYOND_ENCOUNTER_URL = "*://*.dndbeyond.com/encounters/*";
const DNDBEYOND_COMBAT_URL = "*://*.dndbeyond.com/combat-tracker/*";
const DNDBEYOND_SPELL_URL = "*://*.dndbeyond.com/spells/*";
const DNDBEYOND_VEHICLE_URL = "*://*.dndbeyond.com/vehicles/*";
const DNDBEYOND_SOURCES_URL = "*://*.dndbeyond.com/sources/*";
const DNDBEYOND_CLASSES_URL = "*://*.dndbeyond.com/classes/*";
const DNDBEYOND_EQUIPMENT_URL = "*://*.dndbeyond.com/equipment/*";
const DNDBEYOND_ITEMS_URL = "*://*.dndbeyond.com/magic-items/*";
const DNDBEYOND_FEATS_URL = "*://*.dndbeyond.com/feats/*";
const CHANGELOG_URL = "https://beyond20.here-for-more.info/update";
const DISCORD_BOT_INVITE_URL = "https://beyond20.kicks-ass.org/invite";
const DISCORD_BOT_API_URL = "https://beyond20.kicks-ass.org/roll";
const DISCORD_URL = "*://discord.com/*";
const ROLL20_DISCORD_ACTIVITY_DOMAIN = "*://1199271093882589195.discordsays.com/*";
const DISCORD_ACTIVITY_DOMAINS = [
    // discord.com is needed since the activity is an iframe within discord's app
    // without discord.com, a request from the popup.html will fail to pop up the settings
    DISCORD_URL, 
     // Roll20 Discord activity URL
    ROLL20_DISCORD_ACTIVITY_DOMAIN,
];
const DISCORD_ACTIVITY_PERMISSIONS = [
    "webNavigation", // Necessary to listen to navigations inside the discord activity iframe
];
const DISCORD_ACTIVITY_PERMISSION_DETAILS = {
    origins: DISCORD_ACTIVITY_DOMAINS,
    permissions: DISCORD_ACTIVITY_PERMISSIONS
};

const SUPPORTED_VTT_URLS = [
    "https://harpy.gg/*",
    "https://app.alchemyrpg.com/game/*",
    "https://dscryb.com/*",
    "https://codex.dragonshorn.com/*",
    "*://*.osrbeyond.com/*",
    ...DISCORD_ACTIVITY_DOMAINS
];


const BUTTON_STYLE_CSS = `
.character-button, .character-button-small {
    display: inline-block;
    border-radius: 3px;
    background-color: #96bf6b;
    color: #fff;
    font-family: Roboto Condensed,Roboto,Helvetica,sans-serif;
    font-size: 10px;
    border: 1px solid transparent;
    text-transform: uppercase;
    padding: 9px 15px;
    transition: all 50ms;
}
.character-button-small {
    font-size: 8px;
    padding: 5px;
    border-color: transparent;
    min-height: 22px;
}
.ct-button.ct-theme-button {
    cursor: default;
}
.ct-button.ct-theme-button--interactive {
    cursor: pointer;
}
.ct-button.ct-theme-button--filled {
    background-color: #c53131;
    color: #fff;
}
.mon-stat-block img {
    vertical-align: middle;
}
`;


//from constants import DISCORD_BOT_API_URL;

async function postToDiscord(secret, request, title, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open, settings) {
    secret = (secret || "").trim();
    if (!secret) return;

    if (request['original-whisper'] !== undefined)
        request.whisper = request['original-whisper'];

    // Override open to force display description if the setting is enabled
    open = open || settings["discord-display-description"];

    const body = {
        "secret": secret,
        "request": request,
        "title": title,
        "source": source,
        "attributes": attributes,
        "description": description,
        "attack_rolls": attack_rolls,
        "roll_info": roll_info,
        "damage_rolls": damage_rolls,
        "total_damages": total_damages,
        "open": open
    }
    try {
        const response = await fetch(DISCORD_BOT_API_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        if (json.error)
            console.error('Error from server : ', json.error);
        return json.error;
    } catch (e) {
        console.error(e);
        return e.message;
    }
    return null;
}


class Beyond20BaseRoll {
    constructor(formula, data = {}) {
        this._formula = this.cleanupFormula(formula);
        this._data = data;
        this._fail_limit = null;
        this._critical_limit = null;
        this._critical_faces = null;
        this._discarded = false;
        this._total = 0;
        this._roll_type = "custom";
        this.onDiscardedChanged = null;
    }

    get formula() {
        return this._formula;
    }

    get total() {
        throw new Error("NotImplemented");
    }

    get dice() {
        throw new Error("NotImplemented");
    }

    get parts() {
        throw new Error("NotImplemented");
    }

    async getTooltip() {
        throw new Error("NotImplemented");
    }

    async roll() {
        throw new Error("NotImplemented");
    }

    async reroll() {
        throw new Error("NotImplemented");
    }

    cleanupFormula(formula) {
        const cleaned = formula
            .replace(/(?:\+\s*)+([+-])/g, "$1") // Change + + and + - into + and - respectively
            .replace(/(?:\-\s*\-)+/g, "+") // Change - - into +
            .replace(/(?:\-\s*\+)+/g, "-") // Change - - into -
            .replace(/\s+/g, " ") // trim double spaces
        if (cleaned != formula) {
            // Clean it recursively due to order of operations, we may end up with 
            // a double operator situation
            return this.cleanupFormula(cleaned);
        }
        return cleaned;
    }
    setDiscarded(discarded) {
        this._discarded = discarded;
        if (this.onDiscardedChanged) {
            try {
                this.onDiscardedChanged(discarded);
            } catch (err) {}
        }
    }
    isDiscarded() {
        return this._discarded;
    }

    setCriticalLimit(limit) {
        this._critical_limit = limit;
    }
    setFailLimit(limit) {
        this._fail_limit = limit;
    }
    // Ignore all dice that don't have these faces when checking for a crit
    // Hacky trick for custom dice in d20 rolls
    setCriticalFaces(faces) {
        this._critical_faces = faces;
    }
    checkRollForCrits(cb) {
        for (let die of this.dice) {
            for (let r of die.rolls) {
                if (r.discarded === undefined || !r.discarded) {
                    if (cb(die.faces, r.roll)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isCriticalHit() {
        return this.checkRollForCrits((faces, value) => {
            if (this._critical_faces !== null && this._critical_faces !== faces) return false;
            const limit = this._critical_limit === null ? faces : this._critical_limit;
            return value >= limit;
        }
        );
    }

    isCriticalFail() {
        return this.checkRollForCrits((faces, value) => {
            if (this._critical_faces !== null && this._critical_faces !== faces) return false;
            const limit = this._fail_limit === null ? 1 : this._fail_limit;
            return value <= limit;
        }
        );
    }
    setRollType(type) {
        this._roll_type = type;
    }
    toJSON() {
        return {
            "formula": this.formula,
            "parts": this.parts.map(p => p.toJSON ? p.toJSON() : p),
            "fail-limit": this._fail_limit,
            "critical-limit": this._critical_limit,
            "critical-failure": this.isCriticalFail(),
            "critical-success": this.isCriticalHit(),
            "discarded": this.isDiscarded(),
            "type": this._roll_type,
            "total": this.total
        }
    }
}


class DNDBDice {
    constructor(amount, faces, modifiers = "") {
        this.amount = parseInt(amount) || 1;
        this.faces = parseInt(faces) || 0;
        this._modifiers = modifiers || "";
        this._reroll = { "active": false, "value": 0, "operator": "=" }
        this._dk = { "drop": false, "keep": false, "high": false, "amount": 0 }
        this._min = 0;
        if (modifiers != "") {
            const match_ro = modifiers.match(/r(=|<|<=|>|>=)([0-9]+)/);
            if (match_ro) {
                this._reroll.active = true;
                this._reroll.operator = match_ro[1];
                this._reroll.value = parseInt(match_ro[2]);
            }
            const match_dk = modifiers.match(/(dl|dh|kl|kh)([0-9]*)/);
            if (match_dk) {
                const dk = match_dk[1];
                this._dk.amount = parseInt(match_dk[2] || 1);
                if (dk == "dl") {
                    this._dk.drop = true;
                    this._dk.high = false;
                } else if (dk == "dh") {
                    this._dk.drop = true;
                    this._dk.high = true;
                } else if (dk == "kl") {
                    this._dk.keep = true;
                    this._dk.high = false;
                } else if (dk == "kh") {
                    this._dk.keep = true;
                    this._dk.high = true;
                }
            }
            const match_min = modifiers.match(/min([0-9]*)/);
            if (match_min)
                this._min = parseInt(match_min[1]);

        }
        this._rolls = [];
    }
    rollSingleDie () {
        // Borrowed from https://pthree.org/2018/06/13/why-the-multiply-and-floor-rng-method-is-biased/
        const max = Math.floor(2 ** 32 / this.faces) * this.faces; // make "max" a multiple of "faces"
        let x;
        do {
            x = Math.floor(Math.random() * 2 ** 32); // pick a number of [0, 2^32).
        } while (x >= max); // try again if x is too big
        return (x % this.faces) + 1; // uniformly picked in [1, faces] (inclusively)
    }
    async rollDice() {
        this._rolls = [];
        for (let i = 0; i < this.amount; i++) {
            this._rolls.push({ "roll": this.rollSingleDie() });
        }
    }
    async rerollDice(amount) {
        for (let i = 0; i < amount; i++) {
            this._rolls.push({ "roll": this.rollSingleDie() });
        }
    }
    async roll() {
        await this.rollDice();
        await this.handleModifiers();
        return this.total;
    }
    async handleModifiers() {
        if (this._reroll.active) {
            let rerolls = 0;
            for (let roll of this._rolls) {
                // Check for reroll modifier && discard old value && reroll it if necessary
                const die = roll.roll;
                if ((this._reroll.operator == "=" && die == this._reroll.value) ||
                    (this._reroll.operator == "<=" && die <= this._reroll.value) ||
                    (this._reroll.operator == "<" && die < this._reroll.value) ||
                    (this._reroll.operator == ">=" && die >= this._reroll.value) ||
                    (this._reroll.operator == ">" && die > this._reroll.value)) {
                    roll.discarded = true;
                    rerolls++;
                }
            }
            if (rerolls)
                await this.rerollDice(rerolls);
        }
        // Look for drops && keeps;
        const dk_amount = this._dk.amount;
        while ((this._dk.drop || this._dk.keep) && this._dk.amount > 0) {
            const non_discarded = this._rolls.filter(r => !r.discarded && !r.keep);
            if (non_discarded.length == 0)
                break;
            let to_dk = 0;
            if (this._dk.high)
                to_dk = Math.max(...non_discarded.map((r) => r.roll));
            else
                to_dk = Math.min(...non_discarded.map((r) => r.roll));
            if (this._dk.drop) {
                this._rolls = this._rolls.map((r) => {
                    if (to_dk > 0 && !r.discarded && !r.keep && r.roll == to_dk) {
                        r.discarded = true;
                        to_dk = 0;

                    }
                    return r;
                });
            } else if (this._dk.keep) {
                this._rolls = this._rolls.map((r) => {
                    if (to_dk > 0 && !r.discarded && !r.keep && r.roll == to_dk) {
                        r.keep = true;
                        to_dk = 0;
                    }
                    return r;
                });
            }
            this._dk.amount -= 1;
        }
        if (this._dk.keep) {
            this._rolls = this._rolls.map((r) => {
                if (!r.keep)
                    r.discarded = true;
                delete r.keep;
                return r;
            });
        }
        // Restore drop/keep case.includes(amount) of rerolls;
        this._dk.amount = dk_amount;

        return this.calculateTotal();
    }
    calculateTotal() {
        
        // Accumulate total based on non discarded rolls;
        this._total = this._rolls.reduce((acc, roll) => {
            return acc + (roll.discarded ? 0 : roll.roll);
        }, 0);
        if (this._min && this._total < this._min)
            this._total = this._min;
        return this._total;
    }

    get total() {
        return this._total;
    }

    get formula() {
        return this.amount + "d" + this.faces + this._modifiers;
    }

    get rolls() {
        return this._rolls || [];
    }

    toJSON() {
        return {
            "total": this.total,
            "formula": this.formula,
            "rolls": this.rolls,
            "amount": this.amount,
            "faces": this.faces,
            "modifiers": this._modifiers
        }
    }
}

class DNDBRoll extends Beyond20BaseRoll {
    constructor(formula, data = {}) {
        formula = formula.replace(/ro(=|<|<=|>|>=)([0-9]+)/g, "r$1$2");
        for (let key in data)
            formula = formula.replace('@' + key, data[key]);
        super(formula, data);
        this._parts = [];
        let last_sign = null;
        const parts = this._formula.split(/(?=[+-])/);
        const mergeSigns = (sign) => {
            if (!sign) return last_sign;
            if (!last_sign) return sign;
            if (sign === last_sign) return "+";
            return "-";
        }
        for (let part of parts) {
            part = part.trim();
            if (["+", "-"].includes(part)) {
                last_sign = mergeSigns(part);
                continue;
            }
            // Match dice formulas
            let match = part.match(/([+-])?\s*([0-9]*)d([0-9]+)(.*)/);
            if (match) {
                last_sign = mergeSigns(match[1]);
                if (last_sign)
                    this._parts.push(last_sign);
                const part = new DNDBDice(...match.slice(2, 5));
                this._parts.push(part);
                last_sign = "+";
            } else {
                // Match numeric values
                match = part.match(/([+-])?\s*([0-9\.]+)/);
                if (match) {
                    try {
                        last_sign = mergeSigns(match[1]);
                        if (last_sign)
                            this._parts.push(last_sign);
                        const part = parseFloat(match[2]);
                        this._parts.push(part);
                        last_sign = "+";
                    } catch (err) { }
                }
            }
        }
    }

    get total() {
        return this._total;
    }

    get formula() {
        let formula = "";
        let first = true;
        for (let part of this._parts) {
            if (!first)
                formula += " ";
            first = false;
            if (part instanceof DNDBDice)
                formula += part.formula;
            else
                formula += part;
        }
        return formula;
    }
    get dice() {
        const dice = [];
        for (let part of this._parts) {
            if (part instanceof DNDBDice) {
                dice.push(part);
            }
        }
        return dice;
    }

    get parts() {
        return this._parts;
    }

    async roll() {
        for (let part of this._parts) {
            if (part instanceof DNDBDice)
                await part.roll();
        }
        this.calculateTotal();
    }
    calculateTotal() {
        this._total = 0;
        let add = true;
        for (let part of this._parts) {
            if (part instanceof DNDBDice) {
                if (add)
                    this._total += part.total;
                else
                    this._total -= part.total;
            } else if (["+", "-"].includes(part)) {
                add = (part === "+");
            } else {
                if (add)
                    this._total += part;
                else
                    this._total -= part;
            }
        }
        this._total = Math.round(this._total * 100) / 100;
    }

    async getTooltip() {
        let tooltip = "<div class='beyond20-roll-tooltip'>";
        for (let part of this._parts) {
            if (part instanceof DNDBDice) {
                tooltip += "<div class='beyond20-roll-dice'>";
                tooltip += "<div class='beyond20-roll-dice-formula'>" + part.formula + "</div>";
                tooltip += "<div class='beyond20-roll-dice-rolls'>";
                for (let die of part.rolls) {
                    let result_class = 'beyond20-roll-detail-';
                    result_class += die.roll == part.faces ? 'crit' : (die.roll == 1 ? 'fail' : 'normal');
                    if (die.discarded)
                        result_class += ' beyond20-roll-detail-discarded';
                    tooltip += "<span class='beyond20-roll-die-result " + result_class + "'>" + die.roll + "</span>";
                }
                tooltip += "</div></div>";
            }
        }
        tooltip += "</div>";
        return tooltip;
    }

    async reroll() {
        await this.roll();
        return this;
    }
}

class RollTable {
    constructor(name, formula, table) {
        this.name = name;
        this.formula = formula;
        this.table = table;
        this.total = null;
    }
    get results() {
        const results = {};
        for (const row of Object.keys(this.table)) {
            for (const [range, description] of Object.entries(this.table[row])) {
                const match = range.match(/([0-9]+)(?:[–-]([0-9]+))?/);
                if (!match) continue;
                let min = parseInt(match[1]);
                let max = parseInt(match[2] || min);
                // A d100 table will use '00' for the 100 result
                if (min === 0) min = 100;
                if (max === 0) max = 100;
                if (this.total >= min && this.total <= max) {
                    results[row] = description;
                    break;
                }
            }
        }
        return results;
    }

    async roll() {
        const roll = new DNDBRoll(this.formula);
        await roll.roll();
        this.setTotal(roll.total);
        return this.results;
    }

    async resolveFormula() {
        const bardicInspirationDie = /Bardic Insp.* Die/.test(this.formula);
        if (bardicInspirationDie) {
            const choices = {
                "1d6": "1d6 (Bard levels 1-4)",
                "1d8": "1d8 (Bard levels 5-9)",
                "1d10": "1d10 (Bard levels 10-14)",
                "1d12": "1d12 (Bard levels 15-20)"
            }
            const choice = await dndbeyondDiceRoller.queryGeneric(this.name, "Select Bardic Inspiration Die : ", choices);
            if (choice === null) return null;
            this.formula = choice;
        }
        return this.formula;
    }

    setTotal(total) {
        this.total = total;
    }

    static parseTable(table, name, options={}) {
        const dice_columns = []; // Index of columns that contain dice results
        const columns = {};
        const headers = table.find("thead tr th");
        let formula = null;
        for (let index = 0; index < headers.length; index++) {
            const header = headers.eq(index).text().trim();
            if (!header) break;
            // If header is a dice formula, then this is a roll table
            const isDiceFormula = !replaceRolls(header, () => "").trim();
            const bardicInspirationDie = /Bardic Insp.* Die/.test(header);
            if (!formula) {
                if (!isDiceFormula && !bardicInspirationDie) break;
                dice_columns.push(index);
                formula = header;
                continue;
            } else {
                // Look for other columns that are part of this roll table
                // (some tables are split horizontally, having multiple columns for the same data)
                // see https://www.dndbeyond.com/sources/dmg/adventure-environments#BuildingaDungeon
                if (!isDiceFormula && !bardicInspirationDie) {
                    columns[header] = {};
                    continue;
                }
                const firstColumn = headers.eq(dice_columns[0]).text().trim();
                if (header === firstColumn) {
                    dice_columns.push(index);
                }
            }
        }
        if (!formula) return;
    
        const bardicInspirationDie = /Bardic Insp.* Die/.test(formula);
        if (bardicInspirationDie) {
            if (options.character) {
                const lvl = options.character.getClassLevel("Bard");
                if (lvl < 5) formula = "1d6";
                else if (lvl < 10) formula = "1d8";
                else if (lvl < 15) formula = "1d10";
                else formula = "1d12";
            }
        }
        const rows = table.find("tbody tr");
        for (const row of rows.toArray()) {
            const cells = $(row).find("td");
            let last_range = null;
            for (let index = 0; index < headers.length; index++) {
                if (dice_columns.includes(index)) {
                    last_range = cells.eq(index).text().trim();
                } else if (last_range === null) {
                    break;
                } else {
                    const header = headers.eq(index).text().trim();
                    const description = cells.eq(index).text().trim();
                    if (columns[header] === undefined) continue;
                    columns[header][last_range] = description;
                }
            }
        }
    
        return new this(name, formula, columns);
    }

}
class DAMAGE_FLAGS {
    static get MESSAGE() { return 0; }
    static get REGULAR() { return 1; }
    static get VERSATILE() { return 2; }
    static get ADDITIONAL() { return 4; }
    static get HEALING() { return 8; }
    static get CRITICAL() { return 0x10; }
}

class Beyond20RollRenderer {
    constructor(roller, prompter, displayer) {
        this._roller = roller;
        this._prompter = prompter;
        this._displayer = displayer;
        this._extension_url = "";
        this._settings = {}
    }

    setBaseURL(base_url) {
        this._extension_url = base_url;
    }

    setSettings(settings) {
        this._settings = settings;
    }
    _mergeSettings(data) {
        // Catch the mergeSettings since roll renderer could be called from a page script
        // which wouldn't have access to the chrome.storage APIs
        try {
            mergeSettings(data, (settings) => {
                this.setSettings(settings);
                chrome.runtime.sendMessage({ "action": "settings", "type": "general", "settings": settings });
            });
        } catch (err) {}
    }

    async queryGeneric(title, question, choices, select_id = "generic-query", order, selection, {prefix=""}={}) {
        let html = "<form>";
        if (prefix) {
            html += `<div class="beyond20-query-prefix">${prefix}</div>`;
        }
        html += `<div class="beyond20-form-row"><label>${question}</label><select id="${select_id}" name="${select_id}">`;

        if (!order)
            order = Object.keys(choices);
        for (let [i, option] of order.entries()) {
            const isSelected = (selection && selection == option) || (!selection && i === 0);
            const value = choices[option] || option;
            html += `<option value="${option}"${isSelected ? " selected" : ""}>${value}</option>`;
        }
        html += `;</select></div></form>`;
        return new Promise((resolve) => {
            this._prompter.prompt(title, html, "Roll").then((html) => {
                if (html) {
                    resolve(html.find("#" + select_id).val());
                } else {
                    // return null in case it got cancelled
                    resolve(null);
                }
            });
        });
    }

    async queryDoubleGeneric(title, question, choices, question2, choices2, select_id = "generic-query", order, order2, selection, selection2, {prefix=""}={}) {
        let html = "<form>";
        if (prefix) {
            html += `<div class="beyond20-query-prefix">${prefix}</div>`;
        }

        // query one
        html += `<div class="beyond20-form-row"><label>${question}</label><select id="${select_id}-one" name="${select_id}-one">`;

        if (!order) order = Object.keys(choices);
        for (let [i, option] of order.entries()) {
            const isSelected = (selection && selection == option) || (!selection && i === 0);
            const value = choices[option] || option;
            html += `<option value="${option}"${isSelected ? " selected" : ""}>${value}</option>`;
        }
        html += `;</select></div>`;

        // query two
        html += `<div class="beyond20-form-row"><label>${question2}</label><select id="${select_id}-two" name="${select_id}-two">`;

        if (!order2) order2 = Object.keys(choices2);
        for (let [i, option] of order2.entries()) {
            const isSelected = (selection2 && selection2 == option) || (!selection2 && i === 0);
            const value = choices2[option] || option;
            html += `<option value="${option}"${isSelected ? " selected" : ""}>${value}</option>`;
        }
        html += `;</select></div>`;
        
        html += `</form>`;
        return new Promise((resolve) => {
            this._prompter.prompt(title, html, "Roll").then((html) => {
                if (html) {
                    resolve([html.find("#" + select_id + "-one").val(), html.find("#" + select_id + "-two").val()]);
                } else {
                    // return null in case it got cancelled
                    resolve(null);
                }
            });
        });
    }

    async queryAdvantage(title, reason="") {
        const choices = {
            [RollType.NORMAL]: "Normal Roll",
            [RollType.DOUBLE]: "Roll Twice",
            [RollType.ADVANTAGE]: "Advantage",
            [RollType.DISADVANTAGE]: "Disadvantage",
            [RollType.THRICE]: "Roll Thrice",
            [RollType.SUPER_ADVANTAGE]: "Super Advantage",
            [RollType.SUPER_DISADVANTAGE]: "Super Disadvantage"
        }
        const order = [RollType.NORMAL, RollType.ADVANTAGE, RollType.DISADVANTAGE, RollType.DOUBLE, RollType.THRICE, RollType.SUPER_ADVANTAGE, RollType.SUPER_DISADVANTAGE];
        const lastQuery = this._settings["last-advantage-query"];
        reason = reason.split("\n").join("<br/>");
        const result = await this.queryGeneric(title, "Select roll mode : ", choices, "roll-mode", order, lastQuery, {prefix: reason});
        if (result === null) return null;
        const advantage = parseInt(result);
        if (lastQuery != advantage) {
            this._mergeSettings({ "last-advantage-query": advantage })
        }
        return advantage;
    }

    async queryWhisper(title, monster) {
        const choices = {
            [WhisperType.YES]: "Whisper Roll",
            [WhisperType.NO]: "Public Roll"
        }
        if (monster)
            choices[WhisperType.HIDE_NAMES] = "Hide Monster and Attack Name";
        const lastQuery = this._settings["last-whisper-query"];
        const result = await this.queryGeneric(title, "Select whisper mode : ", choices, "whisper-mode", null, lastQuery);
        if (result === null) return null;
        const whisper = parseInt(result);
        if (lastQuery != whisper) {
            this._mergeSettings({ "last-whisper-query": whisper })
        }
        return whisper;
    }

    getToHit(request, modifier = "", data = {}, type="to-hit") {
        const advantage = request.advantage;

        const d20 = request.d20 || "1d20";
        let rolls = [];
        if ([RollType.DOUBLE, RollType.ADVANTAGE, RollType.DISADVANTAGE].includes(advantage)) {
            const roll_1 = this.createRoll(d20 + modifier, data, type);
            const roll_2 = this.createRoll(d20 + modifier, data, type);
            roll_1.setCriticalFaces(20);
            roll_2.setCriticalFaces(20);

            rolls = [roll_1, roll_2];
        } else if ([RollType.THRICE, RollType.SUPER_ADVANTAGE, RollType.SUPER_DISADVANTAGE].includes(advantage)) {
            const roll_1 = this.createRoll(d20 + modifier, data, type);
            const roll_2 = this.createRoll(d20 + modifier, data, type);
            const roll_3 = this.createRoll(d20 + modifier, data, type);

            rolls = [roll_1, roll_2, roll_3];
        } else { // advantage == RollType.NORMAL
            rolls.push(this.createRoll(d20 + modifier, data, type));
        }
        rolls.forEach(r => r.setCriticalFaces(20));
        return {rolls};
    }
    processToHitAdvantage(advantage, rolls) {
        if ([RollType.DOUBLE, RollType.ADVANTAGE, RollType.DISADVANTAGE].includes(advantage)) {
            const roll_1 = rolls[0];
            const roll_2 = rolls[1];

            if (advantage == RollType.ADVANTAGE) {
                if (roll_1.total >= roll_2.total) {
                    roll_2.setDiscarded(true);
                } else {
                    roll_1.setDiscarded(true);
                }
            } else if (advantage == RollType.DISADVANTAGE) {
                if (roll_1.total <= roll_2.total) {
                    roll_2.setDiscarded(true);
                } else {
                    roll_1.setDiscarded(true);
                }
            }
            return [roll_1, roll_2];
        } else if ([RollType.THRICE, RollType.SUPER_ADVANTAGE, RollType.SUPER_DISADVANTAGE].includes(advantage)) {
            const roll_1 = rolls[0];
            const roll_2 = rolls[1];
            const roll_3 = rolls[2];

            if (advantage == RollType.SUPER_ADVANTAGE) {
                if (roll_1.total >= roll_2.total && roll_1.total >= roll_3.total) {
                    roll_2.setDiscarded(true);
                    roll_3.setDiscarded(true);
                } else if (roll_2.total >= roll_3.total) {
                    roll_1.setDiscarded(true);
                    roll_3.setDiscarded(true);
                } else {
                    roll_1.setDiscarded(true);
                    roll_2.setDiscarded(true);
                }
            } else if (advantage == RollType.SUPER_DISADVANTAGE) {
                if (roll_1.total <= roll_2.total && roll_1.total <= roll_3.total) {
                    roll_2.setDiscarded(true);
                    roll_3.setDiscarded(true);
                } else if (roll_2.total <= roll_3.total) {
                    roll_1.setDiscarded(true);
                    roll_3.setDiscarded(true);
                } else {
                    roll_1.setDiscarded(true);
                    roll_2.setDiscarded(true);
                }
            }
        }
    }

    isCriticalHitD20(rolls, limit = 20) {
        for (let roll of rolls) {
            roll.setCriticalLimit(limit);
            if (!roll.isDiscarded() && roll.isCriticalHit()) {
                return true;
            }
        }
        return false;
    }

    injectRollsInDescription(description) {
        const icon = "/modules/beyond20/images/icons/icon20.png";
        return replaceRolls(description, (dice, modifier) => {
            const dice_formula = (dice == "" ? "1d20" : dice) + modifier;
            // <u> is filtered 0.3.2, so using <span> instead;
            // Can't use single line, since newlines get replaced with <br/>
            return `<span class="ct-beyond20-custom-roll">` +
                `<strong>${dice}${modifier}</strong>` +
                `<img class="ct-beyond20-custom-icon" src="${icon}" style="margin-right: 3px; margin-left: 3px; border: 0px;"></img>` +
                `<span class="beyond20-roll-formula" style="display: none;">${dice_formula}</span>` +
            `</span>`;
        });
    }

    async rollToDetails(roll, is_total = false) {
        const hit = roll.isCriticalHit();
        const fail = roll.isCriticalFail();
        let roll_type_class = 'beyond20-roll-value beyond20-roll-detail-';
        roll_type_class += hit && fail ? 'crit-fail' : (hit ? 'crit' : (fail ? 'fail' : 'normal'))
        if (roll.isDiscarded())
            roll_type_class += ' beyond20-roll-detail-discarded';
        if (is_total)
            roll_type_class += ' beyond20-roll-total dice-total';

        const total = `<span class='${roll_type_class}'>${roll.total}</span>`;
        const tooltip = await roll.getTooltip();
        return `<span class='beyond20-tooltip'>${total}<span class='dice-roll beyond20-tooltip-content'>` +
            `<div class='dice-formula beyond20-roll-formula'>${roll.formula}</div>${tooltip}</span></span>`;
    }

    rollsToCells(html) {
        let result = "";
        for (let roll of html.split(" | "))
            result += `<div class="beyond20-roll-cell">${roll}</div>`;
        return result;
    }


    async postDescription(request, title, source, attributes, description, attack_rolls = [], roll_info = [], damage_rolls = [], open = false) {
        let play_sound = false;

        let html = '<div class="beyond20-message"><div class="beyond20-header">';
        if (request.whisper == WhisperType.HIDE_NAMES) {
            description = null;
            title = this._settings["hidden-monster-replacement"];
        } else if (request.character && request.character.avatar) {
            html += `<img class="beyond20-character-avatar" src="${request.character.avatar}" title="${title}" width="37" height="37">`;
        }
        if (description) {
            html += "<details" + (open ? " open" : "") + "><summary><a>" + title + "</a></summary>";
            if (source || Object.keys(attributes).length > 0) {
                html += "<table>";
                if (source)
                    html += "<tr><td colspan'2'><i>" + source + "</i></td></tr>";
                for (let attr in attributes)
                    html += "<tr><td><b>" + attr + "</b></td><td>" + attributes[attr] + "</td></tr>";
                html += "</table>";
            }
            const html_description = this.injectRollsInDescription(description).replace(/\n/g, "</br>");
            html += "<div class='beyond20-description'>" + html_description + "</div></details>";
        } else {
            html += "<span class='beyond20-title'>" +  title + "</span>";
        }
        html += "</div>";

        //console.log("Rolls : ", attack_rolls, roll_info, damage_rolls);

        for (let [name, value] of roll_info)
            html += "<div class='beyond20-roll-result'><b>" + name + ": </b><span>" + value + "</span></div>";

        if (attack_rolls.length > 0) {
            const is_total = attack_rolls.length === 1 && damage_rolls.length === 0;
            let roll_html = "";
            for (let [i, roll] of attack_rolls.entries()) {
                if (i > 0)
                    roll_html += " | ";
                roll_html += await this.rollToDetails(roll, is_total);
                play_sound = true;
            }
            html += "<div class='beyond20-roll-result beyond20-roll-cells'>" + this.rollsToCells(roll_html) + "</div>";
        }
        // Only add totals if we have either : 
        // - more than 1 critical damage
        // - or, more than 1 non-critical damage
        // - and the 2 non-critical damages are not 1 handed + 2 handed
        let add_totals = damage_rolls.filter((r) => (r[2] & DAMAGE_FLAGS.CRITICAL) == 0).length > 1 ||
                        damage_rolls.filter((r) => (r[2] & DAMAGE_FLAGS.CRITICAL) != 0).length > 1;
        if (add_totals && damage_rolls.length === 2 &&
            (damage_rolls[0][2] & DAMAGE_FLAGS.REGULAR) != 0 &&
            (damage_rolls[1][2] & DAMAGE_FLAGS.VERSATILE) != 0) {
            add_totals = false;
        }
        const total_damages = {}
        for (let [roll_name, roll, flags] of damage_rolls) {
            const is_total = !add_totals && (flags & DAMAGE_FLAGS.CRITICAL) == 0;
            let roll_html = "";
            if (typeof (roll) === "string")
                roll_html = "<span>" + roll + "</span>";
            else
                roll_html = await this.rollToDetails(roll, is_total);

            play_sound = true;
            roll_name = roll_name[0].toUpperCase() + roll_name.slice(1) + ": ";
            let dmg_classes = "beyond20-roll-result beyond20-roll-damage";
            if (flags & DAMAGE_FLAGS.CRITICAL) dmg_classes += " beyond20-critical-damage";
            if (flags & DAMAGE_FLAGS.HEALING) dmg_classes += " beyond20-healing";
            html += `<div class='${dmg_classes}'><b>${roll_name}</b>${roll_html}</div>`;
            if (add_totals && typeof (roll) !== "string") {
                let kind_of_damage = "";
                if (flags & DAMAGE_FLAGS.REGULAR) {
                    kind_of_damage = flags & DAMAGE_FLAGS.CRITICAL ? "Critical Damage" : "Damage";
                } else if (flags & DAMAGE_FLAGS.VERSATILE) {
                    kind_of_damage = flags & DAMAGE_FLAGS.CRITICAL ? "Critical 2-Handed Damage" : "2-Handed Damage";
                } else if (flags & DAMAGE_FLAGS.HEALING) {
                    kind_of_damage = "Healing";
                } else if (flags & DAMAGE_FLAGS.ADDITIONAL) {
                    // HACK Alert: crappy code;
                    const regular = flags & DAMAGE_FLAGS.CRITICAL ? "Critical Damage" : "Damage";
                    const versatile = flags & DAMAGE_FLAGS.CRITICAL ? "Critical 2-Handed Damage" : "2-Handed Damage";
                    if (total_damages[regular] !== undefined)
                        total_damages[regular] += " + " + String(roll.total);
                    if (total_damages[versatile] !== undefined)
                        total_damages[versatile] += " + " + String(roll.total);
                    continue;
                } else {
                    continue;
                }
                if (total_damages[kind_of_damage] !== undefined)
                    total_damages[kind_of_damage] += " + " + String(roll.total);
                else
                    total_damages[kind_of_damage] = String(roll.total);
            }
        }

        if (Object.keys(total_damages).length > 0) {
            // HACK ALERT: Even crappier code than above
            if (total_damages["2-Handed Damage"]) {
                total_damages["1-Handed Damage"] = total_damages["Damage"];
                delete total_damages["Damage"];
                // Need to swap them so two-handed goes last
                const two_handed = total_damages["2-Handed Damage"];
                delete total_damages["2-Handed Damage"];
                total_damages["2-Handed Damage"] = two_handed;
            }
            if (total_damages["Critical 2-Handed Damage"]) {
                total_damages["Critical 1-Handed Damage"] = total_damages["Critical Damage"];
                delete total_damages["Critical Damage"];
                // Need to swap them so two-handed goes last
                const two_handed = total_damages["Critical 2-Handed Damage"];
                delete total_damages["Critical 2-Handed Damage"];
                total_damages["Critical 2-Handed Damage"] = two_handed;
            }
            html += "<div class='beyond20-roll-result'><b><hr/></b></div>";
        }

        let roll = null;
        for (let key in total_damages) {
            const is_total = (roll === null);
            roll = this._roller.roll(total_damages[key]);
            roll.setRollType("damage");
            await roll.roll();
            total_damages[key] = roll;
            const roll_html = await this.rollToDetails(roll, is_total);
            let total_classes = "beyond20-total-damage";
            if (key.includes("Critical")) total_classes += " beyond20-critical-damage";
            html += `<div class='beyond20-roll-result ${total_classes}'><b>Total ${key}: </b>${roll_html}</div>`;
        }

        if (request.damages && request.damages.length > 0 && 
            request.rollAttack && !request.rollDamage) {
            html += '<button class="beyond20-button-roll-damages">Roll Damages</button>';
        }

        html += "</div>";
        const character = (request.whisper == WhisperType.HIDE_NAMES) ? this._settings["hidden-monster-replacement"] : request.character.name;
        const discordChannel = getDiscordChannel(this._settings, request.character)
        postToDiscord(discordChannel ? discordChannel.secret : "", request, title, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open, this._settings).then(discord_error => {
            if (discord_error != undefined)
                this._displayer.displayError("Beyond20 Discord Integration: " + discord_error);
        });

        // Hide the dialog showing the roll result on DDB when whispering to Discord (if the setting is on)
        // Allowing the simulation of Fantasy Ground's 'Dice Tower' feature.
        const isWhispering = request.whisper === WhisperType.YES;
        const isSendingResultToDiscordOnly = this._settings["vtt-tab"] && this._settings["vtt-tab"].vtt === "dndbeyond";
        const shouldHideResultsOnWhispersToDiscord = this._settings["hide-results-on-whisper-to-discord"];

        const canPostHTML = !isWhispering || !isSendingResultToDiscordOnly || !shouldHideResultsOnWhispersToDiscord;

        const json_attack_rolls = attack_rolls.map(r => r.toJSON ? r.toJSON() : r);
        const json_damage_rolls = damage_rolls.map(([l, r, f]) => r.toJSON ? [l, r.toJSON(), f] : [l, r, f]);
        const json_total_damages = Object.fromEntries(Object.entries(total_damages).map(([k, v]) => [k, v.toJSON ? v.toJSON() : v]));
        if (request.sendMessage && this._displayer.sendMessage) {
            this._displayer.sendMessage(request, title, html, character, request.whisper, play_sound, source, attributes, description, json_attack_rolls, roll_info, json_damage_rolls, json_total_damages, open)
        } else if (canPostHTML) {
            this._displayer.postHTML(request, title, html, character, request.whisper, play_sound, source, attributes, description, json_attack_rolls, roll_info, json_damage_rolls, json_total_damages, open);
            if (this._displayer.sendMessageToDOM) {
                this._displayer.sendMessageToDOM(request, title, html, character, request.whisper, play_sound, source, attributes, description, json_attack_rolls, roll_info, json_damage_rolls, json_total_damages, open)
            } 
        }

        if (attack_rolls.length > 0) {
            return attack_rolls.find((r) => !r.isDiscarded());
        } else if (total_damages.length > 0) {
            return total_damages[0];
        } else if (damage_rolls.length > 0) {
            return damage_rolls[0];
        } else {
            return null;
        }
    }

    postChatMessage(request, title, message) {
        const character = (request.whisper == WhisperType.HIDE_NAMES) ? this._settings["hidden-monster-replacement"] : request.character.name;
        if (request.whisper == WhisperType.HIDE_NAMES)
            title = this._settings["hidden-monster-replacement"];
        if (request.sendMessage && this._displayer.sendMessage)
            this._displayer.sendMessage(request, title, message, character, request.whisper, false, '', {}, '', [], [], [], [], true);
        else
            this._displayer.postHTML(request, title, message, character, request.whisper, false, '', {}, '', [], [], [], [], true);
            
        const discordChannel = getDiscordChannel(this._settings, request.character)
        postToDiscord(discordChannel ? discordChannel.secret : "", request, title, "", {}, "", [], [], [], [], false, this._settings).then(discord_error => {
            if (discord_error != undefined)
                this._displayer.displayError("Beyond20 Discord Integration: " + discord_error);
        });

    }

    createRoll(dice, data={}, type) {
        const new_data = {}
        const parts = [dice];
        for (let key in data) {
            if (data[key]) {
                const new_key = key.replace("_", "").toLowerCase();
                new_data[new_key] = data[key];
                parts.push(new_key);
            }
        }
        const roll = this._roller.roll(parts.join(" + @"), new_data);
        if (type)
            roll.setRollType(type);
        return roll;
    }

    async rollDice(request, title, dice, data = {}, type) {
        const roll = this.createRoll(dice, data, type);
        await this._roller.resolveRolls(title, [roll], request);
        return this.postDescription(request, title, null, {}, null, [roll]);
    }
    async sendCustomDigitalDice(character, digitalRoll) {
        let whisper = parseInt(character.getGlobalSetting("whisper-type", WhisperType.NO));
        const whisper_monster = parseInt(character.getGlobalSetting("whisper-type-monsters", WhisperType.YES));
        let is_monster = character.type() == "Monster" || character.type() == "Vehicle";
        if (is_monster && whisper_monster != WhisperType.NO)
            whisper = whisper_monster;
        if (whisper === WhisperType.QUERY) {
            whisper = await this.queryWhisper(digitalRoll.name || "Custom Roll", is_monster);
            if (whisper === null) return; // query was cancelled
        }
        // Default advantage/whisper would get overriden if (they are part of provided args;
        const request = {
            action: "roll",
            character: character.getDict(),
            type: "digital-dice",
            roll: digitalRoll.rolls[0].formula,
            advantage: RollType.NORMAL,
            whisper: whisper,
            sendMessage: true,
            name: digitalRoll.name
        }
        return this.postDescription(request, `${request.name} (${request.roll})`, null, {}, null, digitalRoll.rolls);
    }

    async rollD20(request, title, data, type) {
        const {rolls} = this.getToHit(request, "", data, type)
        await this._roller.resolveRolls(title, rolls, request);
        this.processToHitAdvantage(request.advantage, rolls);

        const roll_info = [];
        if (Array.isArray(request["effects"]) && request["effects"].length > 0)
            roll_info.push(["Effects", request["effects"].join(', ')]);

        return this.postDescription(request, title, null, {}, null, rolls, roll_info);
    }

    async rollSkill(request, custom_roll_dice = "") {
        const data = { [request.ability]: request.modifier, "custom_dice": custom_roll_dice }
        return this.rollD20(request, request.skill + " (" + request.modifier + ")", data, "skill-check");
    }

    rollAbility(request, custom_roll_dice = "") {
        const data = { [request.ability]: request.modifier, "custom_dice": custom_roll_dice }
        return this.rollD20(request, request.name + " (" + request.modifier + ")", data, "ability-check");
    }

    rollSavingThrow(request, custom_roll_dice = "") {
        const data = { [request.ability]: request.modifier, "custom_dice": custom_roll_dice }
        return this.rollD20(request, request.name + " Save" + " (" + request.modifier + ")", data, "saving-throw");
    }

    rollInitiative(request, custom_roll_dice = "") {
        const data = { "initiative": request.initiative, "custom_dice": custom_roll_dice }
        return this.rollD20(request, "Initiative" + " (" + request.initiative + ")", data, "initiative");
    }

    rollHitDice(request) {
        const rname = "Hit Dice" + (request.multiclass ? `(${request.class})` : "");
        return this.rollDice(request, rname, request["hit-dice"], {}, "hit-dice");
    }

    rollDeathSave(request, custom_roll_dice = "") {
        const data = { "custom_dice": custom_roll_dice }
        if (request.modifier) data.modifier = request.modifier
        return this.rollD20(request, "Death Saving Throw", data, "death-save");
    }

    rollItem(request) {
        return this.rollTrait(request);
    }

    rollTrait(request) {
        let source = request.type;
        let name = request.name;
        if (request["source-type"] !== undefined) {
            source = request["source-type"];
            if (request.source && request.source.length > 0)
                source += ": " + request.source;
        } else if (request["item-type"] !== undefined) {
            source = request["item-type"];
        }
        if (request.quantity) {
            name = `${request.name} (${request.quantity})`;
        }
        return this.postDescription(request, name, source, {}, request.description, [], [], [], true);
    }

    async queryDamageType(title, damage_types, type_id="damage-type") {
        const choices = {}
        for (let option in damage_types) {
            const value = damage_types[option];
            if (value)
                choices[option] = option + " (" + value + ")";
            else
                choices[option] = option;
        }
        // get/save the last user selection during similar query
        const settingId = `last-query-${type_id}`;
        const lastQuery = this._settings[settingId];
        const result = await this.queryGeneric(title, "Choose Damage Type :", choices, type_id, undefined, lastQuery);
        if (result !== null && lastQuery != result) {
            this._mergeSettings({ [settingId]: result })
        }
        return result;
    }

    async buildAttackRolls(request, custom_roll_dice) {
        let to_hit = [];
        const damage_rolls = [];
        const all_rolls = [];
        let is_critical = false;
        if (request.rollAttack && request["to-hit"] !== undefined) {
            const custom = custom_roll_dice == "" ? "" : (" + " + custom_roll_dice);
            const to_hit_mod = " + " + request["to-hit"] + custom;
            const {rolls} = this.getToHit(request, to_hit_mod)
            to_hit.push(...rolls);
            all_rolls.push(...rolls);
        }

        if (request.rollDamage && request.damages !== undefined) {
            const damages = request.damages;
            const damage_types = request["damage-types"];
            const critical_damages = request["critical-damages"];
            const critical_damage_types = request["critical-damage-types"];

            for (let i = 0; i < (damages.length); i++) {
                const dmg_type = damage_types[i];
                let damage_flags = DAMAGE_FLAGS.REGULAR;
                if (["Healing", "Temp HP", "Alchemical Savant Healing", "Enhanced Bond Healing", "Spiritual Focus Healing"].includes(dmg_type)) {
                    damage_flags = DAMAGE_FLAGS.HEALING;
                } else if (i == 0) {
                    damage_flags = DAMAGE_FLAGS.REGULAR;
                } else if (i == 1 && request.is_versatile) {
                    damage_flags = DAMAGE_FLAGS.VERSATILE;
                } else {
                    damage_flags = DAMAGE_FLAGS.ADDITIONAL;
                }
                const suffix = !(damage_flags & DAMAGE_FLAGS.HEALING) ? " Damage" : "";
                // Avoid adding an empty string
                if (damages[i].trim()) {
                    const roll = this._roller.roll(damages[i]);
                    roll.setRollType("damage");
                    all_rolls.push(roll);
                    damage_rolls.push([dmg_type + suffix, roll, damage_flags]);
                }
                // Handle life transference;
                if (request.name == "Life Transference" && dmg_type == "Necrotic") {
                    damage_rolls.push(["Healing", "Twice the Necrotic damage", DAMAGE_FLAGS.HEALING]);
                } else if (request.name == "Vampiric Touch" && dmg_type == "Necrotic") {
                    damage_rolls.push(["Healing", "Half the Necrotic damage", DAMAGE_FLAGS.HEALING]);
                }
            }
        
            await this._roller.resolveRolls(request.name, all_rolls, request)
            
            // Moved after the new resolveRolls so it can access the roll results
            if (request.name.includes("Chaos Bolt")) {
                for (let [i, dmg_roll] of damage_rolls.entries()) {
                    const [dmg_type, roll, flags] = dmg_roll;
                    if (dmg_type == "Chaotic Energy Damage" && roll.dice[0].faces == 8) {
                        const chaos_bolt_damages = ["Acid", "Cold", "Fire", "Force", "Lightning", "Poison", "Psychic", "Thunder"];
                        const damage_choices = {}
                        for (let r of roll.dice[0].rolls)
                            damage_choices[chaos_bolt_damages[r.roll - 1]] = null;
                        //console.log("Damage choices : ", damage_choices, damage_choices.length);
                        let chaotic_type = null;
                        if (Object.keys(damage_choices).length == 1) {
                            damage_rolls.push(["Chaotic energy leaps from the target to a different creature of your choice within 30 feet of it", "", DAMAGE_FLAGS.MESSAGE]);
                            chaotic_type = Object.keys(damage_choices)[0];
                        } else {
                            chaotic_type = await this.queryDamageType(request.name, damage_choices, "chaos-bolt");
                            if (chaotic_type === null) {
                                // Query was cancelled
                                chaotic_type = Object.keys(damage_choices)[0];
                            }
                        }
                        damage_rolls[i] = [chaotic_type + " Damage", roll, flags];
                        damage_rolls[i + 1][0] = chaotic_type + " Damage";
                        critical_damage_types[0] = chaotic_type;
                        critical_damage_types[1] = chaotic_type;
                        break;
                    }
                }
            }

            // If rolling the attack, check for critical hit, otherwise, use argument.
            if (request.rollAttack && to_hit.length > 0) {
                this.processToHitAdvantage(request.advantage, to_hit)
                const critical_limit = request["critical-limit"] || 20;
                is_critical = this.isCriticalHitD20(to_hit, critical_limit);
            } else {
                is_critical = request.rollCritical;
            }
            if (is_critical) {
                const critical_damage_rolls = []
                for (let i = 0; i < (critical_damages.length); i++) {
                    const roll = this._roller.roll(critical_damages[i]);
                    roll.setRollType("critical-damage");
                    critical_damage_rolls.push(roll);
                    const dmg_type = critical_damage_types[i];
                    let damage_flags = DAMAGE_FLAGS.REGULAR;
                    if (["Healing", "Temp HP", "Alchemical Savant Healing", "Enhanced Bond Healing", "Spiritual Focus Healing"].includes(dmg_type)) {
                        damage_flags = DAMAGE_FLAGS.HEALING;
                    } else if (i == 0) {
                        damage_flags = DAMAGE_FLAGS.REGULAR;
                    } else if (i == 1 && request.is_versatile) {
                        damage_flags = DAMAGE_FLAGS.VERSATILE;
                    } else {
                        damage_flags = DAMAGE_FLAGS.ADDITIONAL;
                    }
                    const suffix = !(damage_flags & DAMAGE_FLAGS.HEALING) ? " Critical Damage" : "";
                    damage_rolls.push([dmg_type + suffix, roll, damage_flags | DAMAGE_FLAGS.CRITICAL]);
                }
                await this._roller.resolveRolls(request.name, critical_damage_rolls, request);
            }
            
            // Process Sorcerous Burst after critical hits so we can deploy bursts out of the critical
            // damage dice as well.
            if (request.name.includes("Sorcerous Burst")) {
                const mods = request.character.spell_modifiers;
                const sorcererMod = Object.keys(mods).find(x => x.toLowerCase() === "sorcerer");
                const mainDamage = damage_rolls.find((roll) => roll[2] === DAMAGE_FLAGS.REGULAR);
                const critDamage = damage_rolls.find((roll) => roll[2] === (DAMAGE_FLAGS.REGULAR | DAMAGE_FLAGS.CRITICAL));
                const critRule = parseInt(this._settings["critical-homebrew"] || CriticalRules.PHB);
                const doubleForCrit = is_critical && [CriticalRules.PHB, CriticalRules.HOMEBREW_REROLL, CriticalRules.HOMEBREW_MOD].includes(critRule);

                const faces = parseInt(mainDamage[1].dice[0].faces);
                let burstCount = mainDamage[1].dice[0].rolls.filter(x => x.roll === faces).length;
                if (critRule !== CriticalRules.HOMEBREW_MAX && critDamage) {
                    burstCount += critDamage[1].dice[0].rolls.filter(x => x.roll === faces).length;
                }
                
                if (burstCount > 0) {
                    // Determine the selected modifier, prompt only if multiple options and no sorcerer
                    let selectedModifier = sorcererMod || Object.keys(mods)[0];
                    if (!sorcererMod && Object.keys(mods).length > 1) {
                        const result = await this.queryGeneric("Spellcasting Ability Modifier", "Burst Ability Modifier", Object.keys(mods));
                        selectedModifier = result !== null ? Object.keys(mods)[result] : Object.keys(mods)[0];
                    }
                    let burstRollsLeft = parseInt(mods[selectedModifier]);
          
                    const rollBurstDamage = async (burst) => {
                        if (burstRollsLeft <= 0) {
                            return [];
                        }
                        burst = Math.min(burst, burstRollsLeft);
                        burstRollsLeft -= burst;
                        const amount = doubleForCrit ? burst * 2 : burst;
                        const burstRoll = this._roller.roll(`${amount}d${faces}`);
                        burstRoll.setRollType("damage");
                        const rolls = [burstRoll];
                        await this._roller.resolveRolls(request.name, rolls, request);
                        const newBurstCount = burstRoll.dice[0].rolls.filter(x => x.roll === faces).length;
                        if (newBurstCount > 0) {
                            rolls.push(...await rollBurstDamage(newBurstCount));
                        }
                        return rolls;
                    }
                    const burstRolls = await rollBurstDamage(burstCount);
                    let burstRollCount = 1;
                    let burstCriticalAmount = 0;
                    for (let burstRoll of burstRolls) {
                        damage_rolls.push([`Burst (${burstRollCount++})`, burstRoll, DAMAGE_FLAGS.ADDITIONAL]);
                        // Accumulate critical damage if needed
                        if (is_critical && critRule === CriticalRules.HOMEBREW_MAX) {
                            burstCriticalAmount += burstRoll.dice.reduce((sum, die) => sum + (die.amount * die.faces), 0);
                        }
                    }

                    // Handle critical burst damage roll if needed
                    if(is_critical && critRule === CriticalRules.HOMEBREW_MAX && burstCriticalAmount > 0) {
                        const criticalRoll = this._roller.roll(burstCriticalAmount.toString());
                        criticalRoll.setRollType("critical-damage");
                        damage_rolls.push([`Burst Critical`, criticalRoll, DAMAGE_FLAGS.ADDITIONAL | DAMAGE_FLAGS.CRITICAL]);
                        await this._roller.resolveRolls(request.name, [criticalRoll], request);
                    }
                }
            }
        } else {
            // If no damages, still need to resolve to hit rolls
            
            await this._roller.resolveRolls(request.name, all_rolls, request)
            if (to_hit.length > 0)
                this.processToHitAdvantage(request.advantage, to_hit)
            const critical_limit = request["critical-limit"] || 20;
            this.isCriticalHitD20(to_hit, critical_limit);
        }

        return [to_hit, damage_rolls];
    }

    async rerollDamages(rolls) {
        const new_rolls = [];
        for (let [roll_name, roll, flags] of rolls) {
            if (typeof (roll.reroll) === "function") {
                new_rolls.push([roll_name, await roll.reroll(), flags]);
            } else {
                new_rolls.push([roll_name, roll, flags]);
            }
        }
        return new_rolls;
    }

    async rollAttack(request, custom_roll_dice = "") {
        const [to_hit, damage_rolls] = await this.buildAttackRolls(request, custom_roll_dice);

        const data = {}
        if (request.range !== undefined) {
            data["Range"] = request.range;
            if (request.aoe)
                data["Area of Effect"] = request.aoe;
            if (request["aoe-shape"])
                data["AoE Shape"] = request["aoe-shape"];
        }

        const roll_info = [];
        if (request["effects"] !== undefined)
            roll_info.push(["Effects", request["effects"].join(', ')]);
        if (request["mastery"] !== undefined)
            roll_info.push(["Mastery", request["mastery"]]);
        if (request["save-dc"] != undefined)
            roll_info.push(["Save", request["save-ability"] + " DC " + request["save-dc"]]);
        if (request["cunning-strike-effects"] != undefined)
            roll_info.push(["Cunning Strike Effects", request["cunning-strike-effects"]]);

        return this.postDescription(request, request.name, null, data, request.description || "", to_hit, roll_info, damage_rolls);
    }


    buildSpellCard(request) {
        const data = {
            "Casting Time": request["casting-time"],
            "Duration": request.duration,
            "Components": request.components,
            "Range": request.range
        }
        if (request["aoe"] !== undefined)
            data["Area of Effect"] = request["aoe"];
        if (request["aoe-shape"] !== undefined)
            data["AoE Shape"] = request["aoe-shape"];

        let source = request["level-school"];
        if (request["cast-at"] !== undefined)
            source = request["level-school"] + " (Cast at " + request["cast-at"] + " Level)";

        if (request.ritual)
            data["Ritual"] = "Can be cast as a ritual";
        if (request.concentration)
            data["Concentration"] = "Requires Concentration";

        const description = request.description.replace("At Higher Levels.", "</br><b>At Higher levels.</b>");
        return [source, data, description];
    }

    rollSpellCard(request) {
        const [source, data, description] = this.buildSpellCard(request);
        return this.postDescription(request, request.name, source, data, description, [], [], [], true);
    }

    async rollSpellAttack(request, custom_roll_dice) {
        const [source, data, description] = this.buildSpellCard(request);

        const roll_info = [];
        if (request.range !== undefined) {
            roll_info.push(["Range", request.range]);
            if (request.aoe)
                roll_info.push(["Area of Effect", request.aoe]);
            if (request["aoe-shape"])
                roll_info.push(["AoE Shape", request["aoe-shape"]]);
        }

        if (request["cast-at"] !== undefined)
            roll_info.push(["Cast at", request["cast-at"] + " Level"]);
        let components = request.components;
        const prefix = this._settings["component-prefix"] != "" ? this._settings["component-prefix"] : null;
        if (this._settings["components-display"] == "all") {
            if (components) {
                roll_info.push([prefix || "Components", components]);
            }
        } else if (this._settings["components-display"] == "material") {
            while (components) {
                if (["V", "S"].includes(components[0])) {
                    components = components.slice(1);
                    if (components.startsWith(", ")) {
                        components = components.slice(2);
                    }
                }
                if (components[0] == "M") {
                    roll_info.push([prefix || "Materials", this._settings["component-prefix"] + components.slice(2, -1)]);
                    components = "";
                }
            }
        }
        if (request["effects"] !== undefined)
            roll_info.push(["Effects", request["effects"].join(', ')]);
        if (request["mastery"] !== undefined)
            roll_info.push(["Mastery", request["mastery"]]);
        if (request["save-dc"] !== undefined)
            roll_info.push(["Save", request["save-ability"] + " DC " + request["save-dc"]]);
        if (request["cunning-strike-effects"] != undefined)
            roll_info.push(["Cunning Strike Effects", request["cunning-strike-effects"]]);

        const [attack_rolls, damage_rolls] = await this.buildAttackRolls(request, custom_roll_dice);

        return this.postDescription(request, request.name, source, data, description, attack_rolls, roll_info, damage_rolls);

    }

    displayAvatar(request) {
        const character = (request.whisper !== WhisperType.NO) ? this._settings["hidden-monster-replacement"] : request.character.name;
        const html = `<img src='${request.character.avatar}' width='100%'>`;
        if (request.sendMessage && this._displayer.sendMessage) {
            this._displayer.sendMessage(request, request.name, html, character, request.whisper, false, '', {}, '', [], [], [], [], true);
        } else {
            this._displayer.postHTML(request, request.name, html, {}, character, false, false);
        }
        this.displayAvatarToDiscord(request);
    }
    displayAvatarToDiscord(request) {
        const discordChannel = getDiscordChannel(this._settings, request.character);
        postToDiscord(discordChannel ? discordChannel.secret : "", request, request.name, "", {}, "", [], [], [], [], false, this._settings).then((error) => {
            if (error)
                this._displayer.displayError("Beyond20 Discord Integration: " + error);
        });
    }

    async rollRollTable(request, name, formula, data) {
        const table = new RollTable(name, formula, data);
        const roll = this.createRoll(formula);
        await this._roller.resolveRolls(name, [roll], request);
        table.setTotal(roll.total);
        const results = Object.entries(table.results);
        return this.postDescription(request, name, null, {}, null, [roll], results);
    }

    handleRollRequest(request) {
        let custom_roll_dice = "";
        if (request.character.type == "Character" ||
            (request.character.type == "Creature" && request.character.creatureType === "Wild Shape")) {
            custom_roll_dice = request.character.settings["custom-roll-dice"] || "";
        }

        if (request.type == "avatar") {
            return this.displayAvatar(request);
        } else if (request.type == "skill") {
            return this.rollSkill(request, custom_roll_dice);
        } else if (request.type == "ability") {
            return this.rollAbility(request, custom_roll_dice);
        } else if (request.type == "saving-throw") {
            return this.rollSavingThrow(request, custom_roll_dice);
        } else if (request.type == "initiative") {
            return this.rollInitiative(request, custom_roll_dice);
        } else if (request.type == "hit-dice") {
            return this.rollHitDice(request);
        } else if (request.type == "item") {
            return this.rollItem(request);
        } else if (request.type === "trait") {
            return this.rollTrait(request);
        } else if (request.type == "death-save") {
            return this.rollDeathSave(request, custom_roll_dice);
        } else if (request.type == "attack") {
            return this.rollAttack(request, custom_roll_dice);
        } else if (request.type == "spell-card") {
            return this.rollSpellCard(request);
        } else if (request.type == "spell-attack") {
            return this.rollSpellAttack(request, custom_roll_dice);
        } else if (request.type == "chat-message") {
            return this.postChatMessage(request, request.name, request.message);
        } else if (request.type == "roll-table") {
            return this.rollRollTable(request, request.name, request.formula, request.table);
        } else {
            // 'custom' or anything unexpected
            const mod = request.modifier || request.roll;
            const rname = request.name || request.type;

            return this.rollDice(request, rname + " (" + mod + ")", mod, {});
        }
    }
}

class DigitalDice {
    constructor(name, rolls, {whisper=false}={}) {
        this._name = name;
        this._rolls = rolls;
        this._whisper = whisper;
        this._dice = [];
        this._diceRollPromises = [];
        for (let roll of rolls) {
            for (const dice of roll.dice) {
                // If the dice faces aren't supported by the digital dice, then do a native roll instead
                if ([4, 6, 8, 10, 12, 20, 100].includes(dice.faces)) {
                    this._dice.push(dice);
                } else {
                    // It's an async method so we need to store the promise to make sure it doesn't
                    // get garbage collected before it's done calculating the total
                    this._diceRollPromises.push(dice.roll());
                }
            }
        }
        for (let dice of this._dice) {
            // Need access to the roll Class used to create the fake Roll on reroll
            const rollClass = this._rolls[0].constructor;
            dice.rerollDice = async function (amount) {
                const fakeDice = new this.constructor(amount, this.faces, "");
                const fakeRoll = new rollClass(fakeDice.formula);
                const digital = new DigitalDice(name, [fakeRoll], {whisper: this.whisper})
                await digital.roll();
                this._rolls.push(...fakeRoll.dice[0]._rolls);
            }
        }
        this._notificationId = null;
    }
    get name() {
        return this._name;
    }
    get rolls() {
        return this._rolls;
    }
    get whisper() {
        return this._whisper;
    }
    toJSON() {
        return {
            name: this.name,
            rolls: this.rolls.map(r => r.toJSON())
        }
    }
    async roll() {
        await Promise.all(this._diceRollPromises);
        return DigitalDiceManager.rollDigitalDice(this);
    }
    /**
     * 
     * @param {String} myId        Notification ID for parsing the results of this roll
     * @param {Boolean} passive    If set, do not modify the notification and calculate the total right away
     */
    parseNotification(myId, passive=false) {
        this._notificationId = myId;

        const result = $(`#${myId} .dice_result`);
        this._myId = myId;
        this._myResult = result;
        
        const breakdown = result.find(".dice_result__info__results .dice_result__info__breakdown").text();
        const dicenotation = result.find(".dice_result__info__dicenotation").text();

        const diceMatches = reMatchAll(/([0-9]*)d([0-9]+)(kh1|kl1)?/, dicenotation) || [];
        const results = breakdown.split("+");
        this._dice.forEach(d => d._rolls = []);
        for (let match of diceMatches) {
            const amount = parseInt(match[1]);
            const faces = parseInt(match[2]);
            const mod = match[3];
            for (let i = 0; i < amount; i++) {
                let rolls = [];
                if (mod) {
                    const result = results.shift();
                    if (result.match(/\([0-9,]+\)/)) {
                        rolls = result.slice(1, -1).split(",").map(r => ({roll: parseInt(r)}));
                        // Don't try to parse the result of the results as if we had just parsed the first dice roll
                        i += rolls.length - 1;
                        if (mod === "kh1") {
                            let max = 0;
                            for (let r of rolls) {
                                if (r.roll > max) max = r.roll;
                            }
                            if (rolls.every(r => r.roll === max) && rolls.length > 1) {
                                // If all rolls are the same, keep the first one
                                rolls.forEach(r => r.discarded = true);
                                rolls[0].discarded = false;
                            } else {
                                rolls.forEach(r => r.discarded = r.roll !== max);
                            }
                        } else if (mod === "kl1") {
                            let min = faces;
                            for (let r of rolls) {
                                if (r.roll < min) min = r.roll;
                            }
                            if (rolls.every(r => r.roll === min) && rolls.length > 1) {
                                // If all rolls are the same, keep the first one
                                rolls.forEach(r => r.discarded = true);
                                rolls[0].discarded = false;
                            } else {
                                rolls.forEach(r => r.discarded = r.roll !== min);
                            }
                        }
                    } else {
                        rolls = [{roll: parseInt(result || 0)}];
                    }
                } else {
                    rolls = [{roll: parseInt(results.shift())}];
                }
                for (let dice of this._dice) {
                    if (dice.faces != faces) continue;
                    if (dice._rolls.length == dice.amount) continue;
                    dice._rolls.push(...rolls);
                    break;
                }
            }
        }
        if (passive) {
            this._dice.forEach(dice => dice.calculateTotal());
            this._rolls.forEach(roll => roll.calculateTotal());
        } else {
            const rolldetails = result.find(".dice_result__info__title .dice_result__info__rolldetail");
            // the target also appears with the same class, so only replace the roll type
            for (const detail of rolldetails.toArray()) {
                const rolltype = $(detail.nextElementSibling);
                if (!rolltype.hasClass("dice_result__rolltype")) continue;
                $(detail).text("Beyond 20: ")
                rolltype.text(this._name);
            }
        }
    }
    async handleCompletedRoll() {
        for (let dice of this._dice)
            await dice.handleModifiers();
        this._rolls.forEach(roll => roll.calculateTotal());
        
        if (this._myResult) {
            const roll = this._rolls.find(roll => !roll.isDiscarded()) || this._rolls[0];
            this._myResult.find(".dice_result__info__results .dice_result__info__breakdown").text(roll.formula)
            this._myResult.find(".dice_result__info__dicenotation").text(`${this._rolls.length} roll${this._rolls.length > 1 ? 's' : ''} sent to VTT`)
                .prepend(E.img({ src: chrome.runtime.getURL("images/icons/icon32.png") }))
            const resultEl = this._myResult.find(".dice_result__total-result");
            resultEl.text(roll.total);
            // On advantage/disadvantage, the discarded flag doesn't get set until after
            // this method resolves. Let's set the total value to non discarded rolls when they get set
            for (const r of this._rolls) {
                r.onDiscardedChanged = () => {
                    const roll = this._rolls.find(roll => !roll.isDiscarded()) || this._rolls[0];
                    resultEl.text(roll.total);
                };
            }
        }
    }

}

class DigitalDiceManager {
    static clear() {
        $(".dice-toolbar__dropdown-die").click()
    }
    static clearResults() {
        $(".dice_notification_controls__clear").click()
    }
    static rollDice(amount, type) {
        const dice = $(`.dice-die-button[data-dice="${type}"]`)
        for (let i = 0; i < amount; i++)
            dice.click()
        return amount || 0;
    }
    static _makeRoll(roll) {
        // New DDB roll button has 2 buttons, one to roll, one to select target, so pick the first one only.
        if (dndbeyondDiceRoller._settings["roll-to-game-log"]) {
            sendCustomEvent("MBPendingRoll", [roll.toJSON()]);
        } else {
            // Stop the pending roll and fulfilled result from being posted
            sendCustomEvent("MBPendingRoll", null);
        }
        let rolled = false;
        if (roll.whisper) {
            $(".dice-toolbar__roll, .dice-toolbar.rollable button.dice-toolbar__target-menu-button").click();
            const options = $("#options-menu ul ul > div");
            const texts = options.toArray().map(d => d.textContent);
            const toDM = texts.findIndex(t => t === "Dungeon Master");
            const toSelf = texts.findIndex(t => t === "Self");
            if (toDM >= 0) {
                options.eq(toDM).click();
                rolled = true;
            } else if (toSelf >= 0) {
                options.eq(toSelf).click();
                rolled = true;
            }
        }
        // Roll normally (to everyone) or fallback if we can't find the whisper option
        if (!rolled) {
            $(".dice-toolbar__roll, .dice-toolbar.rollable button:not(.dice-toolbar__target-menu-button)").click();
        }
    }
    static isEnabled() {
        const toolbar = $(".dice-toolbar");
        return toolbar.length > 0;
    }
    static _getNotificationIds() {
        const notifications = $(".noty_bar").toArray();
        return notifications.map(n => n.id);
    }
    static updateNotifications() {
        const notifications = this._getNotificationIds();
        const newNotification = notifications.find(n => !this._notificationIds.includes(n))
        this._notificationIds = notifications;
        if (!newNotification) {
            // Check if we have a pending roll and the game log is open
            // game log will cause the notifications not to appear, so we need to prevent it
            if (this._pendingRolls.length > 0 && $(".ct-game-log-pane, .sidebar__pane-content .glc-game-log").length > 0) {
                const collapse = $(".ct-sidebar__control--collapse, .sidebar__control:has(.sidebar__control--collaspe)");
                // Collapse the side bar, or if it's locked, fake a click on the character name to change the sidepanel
                if (collapse.length > 0) {
                    collapse.click();
                } else {
                    // If there is no character profile to click (encounters page), then unlock the sidebar to collapse it
                    const character = $(".ddbc-character-tidbits__heading h1");
                    if (character.length > 0) character.click();
                    else $(".sidebar__control:has(.sidebar__control--unlock)").click();
                }
            }
            return;
        }
        return this._handleNewNotification(newNotification);
    }
    static _handleNewNotification(notification) {
        const pendingRoll = this._pendingRolls[0];
        if (!pendingRoll) {
            return this._parseCustomRoll(notification);
        }
        const [roll, resolver] = pendingRoll;
        roll.parseNotification(notification)
        this._finishPendingRoll();
    }
    static _finishPendingRoll() {
        const [roll, resolver] = this._pendingRolls.shift()
        roll.handleCompletedRoll().then(resolver);
        if (this._pendingRolls.length > 0) {
            const nextRoll = this._pendingRolls[0][0];
            this._submitRoll(nextRoll);
        }
    }
    static async rollDigitalDice(roll) {
        let resolver = null;
        const promise = new Promise(r => resolver = r);
        this._pendingRolls.push([roll, resolver]);
        if (this._pendingRolls.length === 1) {
            this._submitRoll(roll);
        }
        return promise;
    }
    static _submitRoll(roll) {
        this.clear();
        let diceRolled = 0;
        for (let dice of roll._dice) {
            diceRolled += this.rollDice(dice.amount, `d${dice.faces}`);
        }
        if (diceRolled > 0) {
            this._makeRoll(roll);
        } else {
            this.clear();
            this._finishPendingRoll()
        }
    }
    static _parseCustomRoll(notification) {
        const name = $(`#${notification} .dice_result .dice_result__info__title`).text();
        const formula = $(`#${notification} .dice_result .dice_result__info__dicenotation`).text();
        const roll = new DNDBRoll(formula)
        const digitalRoll = new DigitalDice(name, [roll])
        digitalRoll.parseNotification(notification, true);
        return digitalRoll;
    }
}
DigitalDiceManager._pendingRolls = [];
DigitalDiceManager._notificationIds = DigitalDiceManager._getNotificationIds()
class DNDBDisplayer {
    constructor() {
        this._error = null;
    }

    postHTML(request, title, html, character, whisper, play_sound, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open) {
        let content = "<div class='beyond20-dice-roller'>";
        if (this._error) {
            content += "<div class='beyond20-roller-error'>" +
                "<span class='beyond20-tooltip'>Virtual Table Top Not Found" +
                "<span class='beyond20-tooltip-content'>" + this._error + "</span>" +
                "</span>" +
                "</div>";
        }
        content += "<div class='beyond20-dice-roller-content'>" + html + "</div>" +
            "</div>";
        // Avoid having duplicate results displayed
        DigitalDiceManager.clearResults();
        const dlg = alertify.Beyond20Roll(title, content);
        dlg.set('onclose', () => {
            dlg.set('onclose', null);
            dlg.destroy();
        });
        const element = $(dlg.elements.content.firstElementChild);
        const icon = chrome.runtime.getURL("images/icons/badges/custom20.png");
        element.find(".ct-beyond20-custom-icon").attr('src', icon);
        element.find(".ct-beyond20-custom-roll").on('click', (event) => {
            const roll = $(event.currentTarget).find(".beyond20-roll-formula").text();
            dndbeyondDiceRoller.rollDice(request, title, roll);
        });
        element.find(".beyond20-button-roll-damages").on('click', (event) => {
            request.rollAttack = false;
            request.rollDamage = true;
            request.rollCritical = attack_rolls.some(r => !r.discarded && r["critical-success"])
            dndbeyondDiceRoller.handleRollRequest(request);
        });
    }

    async sendMessageToDOM(request, title, html, character, whisper, play_sound, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open) {
        const req = {
            action: "rendered-roll",
            request,
            title,
            html,
            character,
            whisper,
            play_sound,
            source,
            attributes,
            description,
            attack_rolls,
            roll_info,
            damage_rolls,
            total_damages,
            open
        }
        sendRollRequestToDOM(req);
        return req;
    }
    async sendMessage(request, title, html, character, whisper, play_sound, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open) {
        const req = await this.sendMessageToDOM(request, title, html, character, whisper, play_sound, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open);        
        console.log("Sending message: ", req);
        chrome.runtime.sendMessage(req, (resp) => beyond20SendMessageFailure(character, resp));
    }
    displayError(message) {
        alertify.error(message);
    }

    setError(error) {
        this._error = error;
    }
}

class DNDBRoller {
    roll(formula, data) {
        return new DNDBRoll(formula, data);
    }
    async resolveRolls(name, rolls, request={}) {
        
        if (dndbeyondDiceRoller._settings['use-digital-dice'] && DigitalDiceManager.isEnabled()) {
            const digital = new DigitalDice(name, rolls, {whisper: request.whisper === WhisperType.YES});
            await digital.roll();
        } else {
            await Promise.all(rolls.map(roll => roll.roll()))
        }
        
        const rollInfo = {
            name,
            rolls: rolls.map(r => r.toJSON()),
            request
        }
        if (dndbeyondDiceRoller._settings["roll-to-game-log"]) {
            sendCustomEvent("MBFulfilledRoll", [rollInfo]);
        }
    }
}

class DNDBPrompter {
    async prompt(title, html, ok_label = "OK", cancel_label = "Cancel") {
        return new Promise((resolve, reject) => {
            alertify.Beyond20Prompt(title, html, ok_label, cancel_label, resolve);
        });
    }
}

const dndbeyondDiceRoller = new Beyond20RollRenderer(new DNDBRoller(), new DNDBPrompter(), new DNDBDisplayer());
dndbeyondDiceRoller.setBaseURL(chrome.runtime.getURL(""));
dndbeyondDiceRoller.setSettings(getDefaultSettings());
dndbeyondDiceRoller.handleRollError = (request, error) => {
    dndbeyondDiceRoller._displayer.setError(error);
    if (request.action === "rendered-roll") {
        // If it was a custom digital dice roll, then don't show it would be redundant
        if (request.request.type === "digital-dice") return;
        return dndbeyondDiceRoller._displayer.postHTML(request.request, request.title,
            request.html, request.character, request.whisper,
            request.play_sound, request.source, request.attributes, 
            request.description, request.attack_rolls, request.roll_info, 
            request.damage_rolls, request.total_damages, request.open);
    }
    request['original-whisper'] = request.whisper;
    request.whisper = WhisperType.NO;
    delete request.sendMessage;
    return dndbeyondDiceRoller.handleRollRequest(request);
}

class CharacterBase {
    constructor(_type, global_settings) {
        this._name = "";
        this._type = _type;
        this._settings = null;
        this._url = window.location.href;
        this.setGlobalSettings(global_settings);
    }

    type() {
        return this._type;
    }

    getSetting(key, default_value = "", settings = null) {
        if (settings === null)
            settings = this._settings;
        const value = (settings && settings[key] !== undefined) ? settings[key] : default_value;
        return key_modifiers[`option-${key}`] ? !value : value;
    }

    getGlobalSetting(key, default_value = "") {
        return this.getSetting(key, default_value, this._global_settings);
    }

    setGlobalSettings(new_settings) {
        this._global_settings = new_settings;
        dndbeyondDiceRoller.setSettings(new_settings);
        updateRollTypeButtonClasses(this);
    }

    getDict() {
        return {
            "name": this._name,
            "source": "D&D Beyond",
            "type": this._type,
            "url": this._url
        };
    }
}

/**
 * Load alertify from all D&D Beyond pages, through the base file
 */
if (window.document.body.id !== "tinymce") {
    chrome.runtime.sendMessage({ "action": "load-alertify" }, initializeAlertify);
}

const key_modifiers = {
    advantage: false,
    disadvantage: false,
    super_advantage: false,
    super_disadvantage: false,
    normal_roll: false
};
const MAX_QUEUED_HOTKEY_EVENTS = 1000;
const savedKeyEvents = [];
var handleHotKeys = true;

function handleKeyModifierEvent(event, force=false) {
    // Pause event handling, queue the event
    if (!handleHotKeys && !force) {
        if (savedKeyEvents.length < MAX_QUEUED_HOTKEY_EVENTS) {
            savedKeyEvents.push(event);
        }
        return;
    }
    handleKeyModifier(event.type, event.key, event.code, event.originalEvent.repeat);
}

function handleKeyModifier(etype, key, code, repeat) {
    if (repeat) return;

    const oldValue = key_modifiers.advantage << 0 | key_modifiers.disadvantage << 1 |
                     key_modifiers.normal_roll << 2 | key_modifiers.super_advantage << 3 |
                     key_modifiers.super_disadvantage << 4;
    const modifier = (key_bindings || {})[code] || (key_bindings || {})[key];
    if (modifier) {
        if (modifier.startsWith("toggle-")) {
            // Permanent option toggle
            if (etype === "keydown" && typeof(character) !== "undefined" && character.type() === "Character") {
                const option = modifier.slice("toggle-".length);
                console.log("Toggling character option from hotkey", option);
                character.mergeCharacterSettings({
                    [option]: !character.getSetting(option)
                });
            }
        } else if (settings['sticky-hotkeys']) {
            if (etype !== "keydown") return;
            // Save value before we reset all to false
            const new_value = !key_modifiers[modifier];
            // Need to reset roll adv/dis modifiers if another is toggled.
            const roll_types = ["advantage", "disadvantage", "normal_roll", "super_advantage", "super_disadvantage"];
            if (roll_types.includes(modifier)) {
                roll_types.forEach(type => key_modifiers[type] = false);
            }
            key_modifiers[modifier] = new_value;
        } else {
            key_modifiers[modifier] = etype === "keydown";
        }
        updateHotkeysList();
    }
    const newValue = key_modifiers.advantage << 0 | key_modifiers.disadvantage << 1 |
                        key_modifiers.normal_roll << 2 | key_modifiers.super_advantage << 3 |
                        key_modifiers.super_disadvantage << 4;;

    if (oldValue !== newValue)
        updateRollTypeButtonClasses();
}

function resetKeyModifiers(event) {
    const needsUpdate = key_modifiers.advantage << 0 | key_modifiers.disadvantage << 1 |
                        key_modifiers.normal_roll << 2 | key_modifiers.super_advantage << 3 |
                        key_modifiers.super_disadvantage << 4;
    for (const key in key_modifiers)
        key_modifiers[key] = false;
    if (needsUpdate)
        updateRollTypeButtonClasses();
    updateHotkeysList();
}

/**
 * Pauses the handling of key events, which can be used if a user prompt
 * happens, where we want to retain the key_modifiers state until the roll is made
 */
function pauseHotkeyHandling() {
    handleHotKeys = false;
}
function resumeHotkeyHandling() {
    while (savedKeyEvents.length > 0) {
        handleKeyModifierEvent(savedKeyEvents.pop(), true);
    } 
    handleHotKeys = true;
}


function updateHotkeysList(popup) {
    // Ensure it runs only on pages with the hotkeys popup
    popup = popup || $(".beyond20-hotkeys-list");
    if (!popup) return;
    let hotkeys_enabled = false;
    const bindings = settings['hotkeys-bindings'];
    const roll_types = {"disadvantage": "", "normal_roll": "", "advantage": ""};
    // for adv/dis/norm, set up a special way to display them.
    const roll_types_span = [];
    const hotkeys_list = [];
    for (const key in bindings){
        const binding = bindings[key];
        if (!binding) continue;
        // Don't show permanent toggles
        if (binding.startsWith("toggle-")) continue;
        if (key_modifiers[binding])
            hotkeys_enabled = true;
        if (roll_types[binding] !== undefined) {
            roll_types[binding] = key;
        } else {
            let binding_name = getHotKeyBindingName(binding);
            // Limit the text to 32 characters
            if (binding_name.length > 32)
                binding_name = binding_name.substring(0, 31) + "…";
            hotkeys_list.push(E.li({class: 'beyond20-hotkey-toggle', "data-key": key, "data-modifier": binding},
                binding_name,
                E.span({class: 'beyond20-hotkey-checkmark'}, key_modifiers[binding] && "✔" || "")));
        }
    }
    if (roll_types['disadvantage']) {
        roll_types_span.push(E.span({
            class: "beyond20-hotkey-toggle " + (key_modifiers['disadvantage'] ? "beyond20-hotkey-enabled" : ""),
            "data-key": roll_types['disadvantage'],
            "data-modifier": 'disadvantage',
            style: "float: left;"
        }, "Disadvantage"));
    }
    if (roll_types['normal_roll']) {
        roll_types_span.push(E.span({
            class: "beyond20-hotkey-toggle " + (key_modifiers['normal_roll'] ? "beyond20-hotkey-enabled" : ""),
            "data-key": roll_types['normal_roll'],
            "data-modifier": 'normal_roll'
        }, "Normal"));
    } else {
        // This prevents <hr/> from breaking due to adv/disadv being floats
        roll_types_span.push($('<span>&nbsp;</span>')[0]);
    }
    if (roll_types['advantage']) {
        roll_types_span.push(E.span({
            class: "beyond20-hotkey-toggle " + (key_modifiers['advantage'] ? "beyond20-hotkey-enabled" : ""),
            "data-key": roll_types['advantage'],
            "data-modifier": 'advantage',
            style: "float: right;"
        }, "Advantage"))
    }
    const manage_button = E.a({href: "#"}, E.span({class: "ddbc-manage-icon__icon beyond20-manage-hotkeys"}))
    roll_types_span.push(manage_button);

    if (hotkeys_enabled){
        $('.ct-beyond20-settings-button').addClass('beyond20-button-has-hotkeys');
    } else {
        $('.ct-beyond20-settings-button').removeClass('beyond20-button-has-hotkeys');
    }
    popup.html(E.div({}, E.div({class: "beyond20-hotkeys-roll-types"}, ...roll_types_span), E.hr({}), E.ul({}, ...hotkeys_list)));
    popup.off('click', '.beyond20-hotkey-toggle'); //this removes all instances of this listener
    popup.on('click', '.beyond20-hotkey-toggle', function () {
        const key = this.dataset.key;
        // Set the event to be keydown or keyup based on whether we have sticky or not and if the hotkey is pressed
        const keydown = settings['sticky-hotkeys'] || !key_modifiers[this.dataset.modifier];
        handleKeyModifier(keydown ? 'keydown' : 'keyup', key, false);
    });
    $(manage_button).click(async ev => {
        ev.preventDefault();
        ev.stopPropagation();
        const new_bindings = await promptHotkeyManager();
        mergeSettings({"hotkeys-bindings": new_bindings}, (newSettings) => {
            settings = newSettings;
            chrome.runtime.sendMessage({ "action": "settings", "type": "general", "settings": settings });
        });
        updateHotkeysList(popup);
    });
}

$(window).keydown(handleKeyModifierEvent).keyup(handleKeyModifierEvent).blur(resetKeyModifiers);

const ability_abbreviations = {
    "Strength": "STR",
    "Dexterity": "DEX",
    "Constitution": "CON",
    "Intelligence": "INT",
    "Wisdom": "WIS",
    "Charisma": "CHA"
}

const skill_abilities = {
    "Acrobatics": "DEX",
    "Animal Handling": "WIS",
    "Arcana": "INT",
    "Athletics": "STR",
    "Deception": "CHA",
    "History": "INT",
    "Insight": "WIS",
    "Intimidation": "CHA",
    "Investigation": "INT",
    "Medicine": "WIS",
    "Nature": "INT",
    "Perception": "WIS",
    "Performance": "CHA",
    "Persuasion": "CHA",
    "Religion": "INT",
    "Sleight of Hand": "DEX",
    "Stealth": "DEX",
    "Survival": "WIS"
}

function skillToAbility(skill) {
    return skill_abilities[skill] || "";
}

function abbreviationToAbility(abbr) {
    for (let ability in ability_abbreviations) {
        if (ability_abbreviations[ability] == abbr)
            return ability;
    }
    return abbr;
}


function propertyListToDict(propList) {
    const properties = {}
    for (let i = 0; i < propList.length; i++) {
        const prop = propList.eq(i);
        let labelElement = prop.find(".ct-property-list__property-label,.ddbc-property-list__property-label,[class*='InfoItem_label']");
        let valueElement = prop.find(".ct-property-list__property-content,.ddbc-property-list__property-content,[class*='InfoItem_value']");
        // April 2024 website redesign now uses dynamic class names with styled components
        if (labelElement.length === 0 || valueElement.length === 0) {
            labelElement = prop.children().filter((i, el) => el.className.toLowerCase().includes("label"));
            valueElement = prop.children().filter((i, el) => el.className.toLowerCase().includes("value"));
        }
        if (labelElement.length > 0 && valueElement.length > 0) {
            let label = labelElement.text().trim();
            const value = valueElement.text().trim();
            if (label.endsWith(":")) {
                label = label.slice(0, -1);
            }
            properties[label] = value;
        }
    }
    return properties;
}

function descriptionToString(selector) {
    // strip tags : https://www.sitepoint.com/jquery-strip-html-tags-div/;
    return ($(selector).html() || "").replace(/<\/?[^>]+>/gi, '')
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, "\"")
        .replace(/&apos;/g, "\'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}

function findToHit(name_to_match, items_selector, name_selector, tohit_selector) {
    const items = $(items_selector);
    for (let i = 0; i < items.length; i++) {
        if (items.eq(i).find(name_selector).text() == name_to_match) {
            const to_hit = items.eq(i).find(tohit_selector);
            if (to_hit.length > 0) {
                const value = to_hit.text();
                return value === "--" ? null : value;
            }
            break;
        }
    }
    return null;
}

function damagesToCrits(character, damages) {
    const crits = [];
    const rule = parseInt(character.getGlobalSetting("critical-homebrew", CriticalRules.PHB));
    if (rule == CriticalRules.HOMEBREW_REROLL || rule == CriticalRules.HOMEBREW_MOD)
        return damages.slice();
    for (let damage of damages) {
        const damage_matches = reMatchAll(/([0-9]*)d([0-9]+)(?:ro<=[0-9]+)?(?:min[0-9]+)?/, damage) || [];
        const damage_parts = damage_matches.map(match => {
            if (rule == CriticalRules.HOMEBREW_MAX) {
                dice = parseInt(match[1] || 1);
                faces = parseInt(match[2]);
                return String(dice * faces);
            } else {
                return match[0];
            }
        });
        console.log("Damage to crits : ", damage, damage_parts);
        crits.push(damage_parts.join(" + "));
    }
    return crits;
}

async function queryDamageTypeFromArray(name, damages, damage_types, possible_types) {
    const damage_choices = {}
    let first_idx = -1;
    for (let dmgtype of possible_types) {
        const idx = damage_types.findIndex(t => t === dmgtype);
        if (idx === -1) continue;
        damage_choices[damage_types.splice(idx, 1)[0]] = damages.splice(idx, 1)[0];
        if (first_idx === -1) first_idx = idx;
    }
    if (first_idx === -1) return;
    const id = `dmg-${name.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const choice = await dndbeyondDiceRoller.queryDamageType(name, damage_choices, id);
    if (choice === null) return null; // query was cancelled
    damages.splice(first_idx, 0, damage_choices[choice]);
    damage_types.splice(first_idx, 0, choice);
    return choice;
}

async function queryCunningStrike() {
    const selection = [];
    // Sneak Attack free-rules, pg. 129
    // Cunning Strike free-rules, pg. 130
    const actions = [{ action: "None" }];
    const hasImprovedCunningStrike = character.hasClassFeature("Improved Cunning Strike");
    
    actions.push(...character.getSneakAttackActions());
    
    const options = [...actions.map(m => m["die"] ? `${m.action}: ${m.die}D6` : `${m.action}`)];

    const getSelection = choices => {
        return choices.map(m => {
            if (!m || m === "None") return {action: "None"};
            const option = m.split(":")[0];
            return actions.find(f => f.action === option);
        });
    }
        
    if(hasImprovedCunningStrike) {
        const choice = await dndbeyondDiceRoller.queryDoubleGeneric("Sneak Attack: Cunning Strike", "Cunning Strike effect", options, "Improved Cunning Strike effect", options, "sneak-attack", options, options, "None", "None");
        if (choice) {
            selection.push(...getSelection(choice));
        }
    } else {
        const choice = [await dndbeyondDiceRoller.queryGeneric("Sneak Attack: Cunning Strike", "Cunning Strike effect", options, "sneak-attack", options, "None")];
        if(choice) {
            selection.push(...getSelection(choice));
        }
    }
    
    return selection;
}

async function buildAttackRoll(character, attack_source, name, description, properties,
                         damages = [], damage_types = [], to_hit = null,
                         brutal = 0, force_to_hit_only = false, force_damages_only = false, {weapon_damage_length=0}={}, settings_to_change = []) {
    const roll_properties = {
        "name": name,
        "attack-source": attack_source,
        "description": description,
        "rollAttack": force_to_hit_only || !force_damages_only,
        "rollDamage": force_damages_only || (!force_to_hit_only && character.getGlobalSetting("auto-roll-damage", true)),
        "rollCritical": false
    }
    if (to_hit !== null)
        roll_properties["to-hit"] = to_hit;

    if (properties["Reach"] !== undefined) {
        roll_properties["reach"] = properties["Reach"];
        roll_properties["attack-type"] = "Melee";
    } else if (properties["Range"] !== undefined) {
        roll_properties["range"] = properties["Range"];
        roll_properties["attack-type"] = "Ranged";
    } else {
        const range_area = properties["Range/Area"] || "";
        if (range_area.includes("Reach")) {
            roll_properties["attack-type"] = "Melee";
            roll_properties["reach"] = range_area.replace(" Reach", "");
        } else {
            roll_properties["attack-type"] = "Ranged";
            roll_properties["range"] = range_area;
        }
    }
    if (properties["Attack Type"] !== undefined)
        roll_properties["attack-type"] = properties["Attack Type"];

    if (properties["Attack/Save"] !== undefined) {
        const [save_ability, save_dc] = properties["Attack/Save"].split(" ");
        roll_properties["save-ability"] = abbreviationToAbility(save_ability);
        roll_properties["save-dc"] = save_dc;
    }

    if (properties["Properties"] !== undefined) {
        roll_properties["properties"] = properties["Properties"].split(", ");
    }
    if (attack_source === "item") {
        roll_properties["proficient"] = properties["Proficient"] === "Yes";
    }

    if (damages.length > 0) {
        roll_properties["damages"] = damages;
        roll_properties["damage-types"] = damage_types;
        
        if (roll_properties.name === "Chromatic Orb") {
            const choice = await queryDamageTypeFromArray(roll_properties.name, damages, damage_types, ["Acid", "Cold", "Fire", "Lightning", "Poison", "Thunder"]);
            if (choice === null) return null; // Query was cancelled;
        } else if (roll_properties.name === "Sorcerous Burst") {
            const choice = await queryDamageTypeFromArray(roll_properties.name, damages, damage_types, ["Acid", "Cold", "Fire", "Lightning", "Poison", "Psychic", "Thunder"]);
            if (choice === null) return null; // Query was cancelled;
        } else if (roll_properties.name === "Dragon's Breath") {
            const choice = await queryDamageTypeFromArray(roll_properties.name, damages, damage_types, ["Acid", "Cold", "Fire", "Lightning", "Poison"]);
            if (choice === null) return null; // Query was cancelled;
        } else if (roll_properties.name.includes("Chaos Bolt")) {
            let base_damage = null;
            for (let dmgtype of ["Acid", "Cold", "Fire", "Force", "Lightning", "Poison", "Psychic", "Thunder"]) {
                const idx = damage_types.findIndex(t => t === dmgtype);
                if (idx === -1) continue;
                base_damage = damages.splice(idx, 1)[0];
                damage_types.splice(idx, 1);
            }
            if (base_damage) {
                damages.splice(0, 0, base_damage);
                damage_types.splice(0, 0, "Chaotic Energy");
            }
            // Chaos Bolt has a 1d6 damage with no damage type assigned
            const no_type_idx = damage_types.findIndex(t => t === "");
            if (no_type_idx > -1) {
                damage_types[no_type_idx] = "Chaotic Energy";
            }
        } else if (roll_properties.name == "Toll the Dead") {
            const ttd_dice = await dndbeyondDiceRoller.queryGeneric(roll_properties.name, "Is the target missing any of its hit points ?", { "d12": "Yes", "d8": "No" }, "ttd_dice", ["d12", "d8"]);
            if (ttd_dice === null) return null;
            damages[0] = damages[0].replace("d8", ttd_dice);
        }  else if (roll_properties.name === "Spirit Shroud") {
            const choice = await queryDamageTypeFromArray(roll_properties.name, damages, damage_types, ["Cold", "Necrotic", "Radiant"]);
            if (choice === null) return null; // Query was cancelled;
        } else if (roll_properties.name === "Destructive Wave") {
            const choice = await queryDamageTypeFromArray(roll_properties.name, damages, damage_types, ["Radiant", "Necrotic"]);
            if (choice === null) return null; // Query was cancelled;
        } else if (roll_properties.name === "Elemental Weapon") {
            const choice = await queryDamageTypeFromArray(roll_properties.name, damages, damage_types, ["Acid", "Cold", "Fire", "Lightning", "Thunder"]);
            if (choice === null) return null; // Query was cancelled;
        } else if (roll_properties.name === "Elemental Bane") {
            const choice = await queryDamageTypeFromArray(roll_properties.name, damages, damage_types, ["Acid", "Cold", "Fire", "Lightning", "Thunder"]);
            if (choice === null) return null; // Query was cancelled;
        } else if (roll_properties.name === "Spirit Guardians") {
            const choice = await queryDamageTypeFromArray(roll_properties.name, damages, damage_types, ["Radiant", "Necrotic"]);
            if (choice === null) return null; // Query was cancelled;
        }

        // TODO: refactor into a method and remove it from build attack roll 
        if (character.hasClass("Rogue") && character.hasClassFeature("Sneak Attack 2024") && 
            character.getSetting("rogue-sneak-attack", false) && 
            !name.includes("Psionic Power: Psychic Whispers") && 
            (properties["Attack Type"] == "Ranged" ||
            (properties["Properties"] && properties["Properties"].includes("Finesse")) ||
            name.includes("Psychic Blade") ||
            name.includes("Shadow Blade") ||
            name.includes("Sneak Attack"))) {
            let sneakDieCount = Math.ceil(character._classes["Rogue"] / 2);
            // Rogue: Sneak Attack
            if (character.hasClassFeature("Cunning Strike") && character.getSetting("rogue-cunning-strike", false)) {
                const choices = await queryCunningStrike();
                const validChoices = [];
                for (const choice of choices) {
                    if (choice.action === "None") continue;
                    if (choice["die"] > sneakDieCount) continue;
                    sneakDieCount -= choice["die"];
                    validChoices.push(choice);
                }
                roll_properties["cunning-strike-effects"] = validChoices.map(m => m.action).join(", ") || undefined;
                settings_to_change["rogue-cunning-strike"] = false;
            }
            const sneak_attack = sneakDieCount > 0 ? `${sneakDieCount}d6` : "0";
            if (name.includes("Sneak Attack")) {
                damages[0] = sneak_attack;
            } else {
                damages.push(sneak_attack);
                damage_types.push("Sneak Attack");
            }
        }
        const crits = damagesToCrits(character, damages, damage_types);
        const crit_damages = [];
        const crit_damage_types = [];
        for (let [i, dmg] of crits.entries()) {
            if (dmg != "") {
                crit_damages.push(dmg);
                crit_damage_types.push(damage_types[i]);
            }
        }      
        if (to_hit) {
            if (character.hasFeat("Piercer")) {
                for (let i = 0; i < damage_types.length; i++) {
                    if (damage_types[i].includes("Piercing")){
                        const piercer_damage = damagesToCrits(character, [damages[i]]);
                        if (piercer_damage.length > 0 && piercer_damage[0] != "") {    
                            piercer_damage[0] = piercer_damage[0].replace(/([0-9]+)d([0-9]+)/, '1d$2');
                            crit_damages.push(piercer_damage[0]);
                            crit_damage_types.push("Piercer Feat");
                            break;
                        }
                    }
                }
            }
            if (roll_properties.name === "Blade of Disaster")
                crit_damages[0] = damagesToCrits(character, ["8d12"])[0];
            if (roll_properties.name === "Jim’s Magic Missile")
                crit_damages[0] = damagesToCrits(character, ["3d4"])[0];
            const matchViciousWeapon = description.match(/When you roll a 20 on your attack roll with this magic weapon, the target takes an extra (\d+) damage of the weapon’s type./);
            if (matchViciousWeapon) {
                if (!damages.some(damage => damage === matchViciousWeapon[1])) {
                    crit_damages.push(matchViciousWeapon[1]);
                    crit_damage_types.push("Vicious (20 On The Attack Roll)");
                } 
            }

            // applies to only 2014 brutal critical 2024 has replaced this with brutal strike
            if (brutal > 0) {
                const rule = parseInt(character.getGlobalSetting("critical-homebrew", CriticalRules.PHB));
                let highest_dice = 0;
                let weapon_damage_counter = 0;
                for (let dmg of damages) {
                    if (weapon_damage_length && weapon_damage_counter >= weapon_damage_length) break;
                    const match = dmg.match(/[0-9]*d([0-9]+)/);
                    if (match) {
                        const sides = parseInt(match[1]);
                        if (sides > highest_dice)
                            highest_dice = sides;
                    }
                    weapon_damage_counter++;
                }
                const isBrutal = character.hasClassFeature("Brutal Critical");
                const isSavage = character.hasRacialTrait("Savage Attacks");
                if (highest_dice != 0) {
                    let brutal_dmg = `${brutal}d${highest_dice}`
                    if (rule == CriticalRules.HOMEBREW_MAX) {
                        crit_damages.push(damagesToCrits(character, [brutal_dmg])[0]);
                    } else {
                        brutal_dmg = applyGWFIfRequired(name, properties, brutal_dmg);
                        crit_damages.push(brutal_dmg);
                    }
                    crit_damage_types.push(isBrutal && isSavage ? "Savage Attacks & Brutal" : (isBrutal ? "Brutal" : "Savage Attacks"));
                }
            }
        }
        // effects
        if(properties["Attack Type"] == "Melee" || properties["Attack Type"] == "Unarmed Strike" || name.includes("Shadow Blade")) {
            if(character.getSetting("effects-enlarge", false)) {
                damages.push("+1d4");
                damage_types.push("Enlarge");
                addEffect(roll_properties, "Enlarge");
            } else if(character.getSetting("effects-reduce", false)) {
                damages.push("-1d4");
                damage_types.push("Reduce");
                addEffect(roll_properties, "Reduce");
            }
        }

        roll_properties["critical-damages"] = crit_damages;
        roll_properties["critical-damage-types"] = crit_damage_types;
        
    }

    return roll_properties;
}

function applyGWFIfRequired(action_name, properties, damage) {
    if((properties["Attack Type"] == "Melee" && 
        ((properties["Properties"].includes("Versatile") && character.getSetting("versatile-choice") != "one") || 
            properties["Properties"].includes("Two-Handed"))) ||
            (action_name.includes("Polearm Master") && character.hasFeat("Polearm Master", false)) ||
            (action_name.includes("Pole Strike") && character.hasFeat("Polearm Master 2024", false))
        ) {
        if(character.hasGreatWeaponFighting(2014)) {
            damage = damage.replace(/[0-9]*d[0-9]+/g, "$&ro<=2");
        } else if(character.hasGreatWeaponFighting(2024)) {
            damage = damage.replace(/([0-9]*)d([0-9]+)([^\s+-]*)(.*)/g, (match, amount, faces, roll_mods, mods) => {
                return new Array(parseInt(amount) || 1).fill(`1d${faces}${roll_mods}min3`).join(" + ") + mods;
            });
        }
    }
    return damage;
}

function addCustomDamages(character, damages, damage_types) {
    const custom_damages = character.getSetting("custom-damage-dice", "");
    if (custom_damages.length > 0) {
        for (let custom_damage of split_custom_damages(custom_damages)) {
            if (custom_damage.includes(":")) {
                const parts = custom_damage.split(":", 2);
                damages.push(parts[1].trim());
                damage_types.push(parts[0].trim());
            } else {
                damages.push(custom_damage.trim());
                damage_types.push("Custom");
            }
        }
    }
    for (const key in key_modifiers) {
        if (!key.startsWith("custom_damage:") || !key_modifiers[key]) continue;
        const custom_damage = key.slice("custom_damage:".length).trim();
        if (!custom_damage) continue;
        if (custom_damage.includes(":")) {
            const parts = custom_damage.split(":", 2);
            damages.push(parts[1].trim());
            damage_types.push(parts[0].trim());
        } else {
            damages.push(custom_damage.trim());
            damage_types.push("Custom");
        }
    }
}

async function sendRoll(character, rollType, fallback, args) {
    let whisper = parseInt(character.getGlobalSetting("whisper-type", WhisperType.NO));
    const whisper_monster = parseInt(character.getGlobalSetting("whisper-type-monsters", WhisperType.YES));
    let is_monster = character.type() == "Monster" || character.type() == "Vehicle";
    if (is_monster && whisper_monster != WhisperType.NO)
        whisper = whisper_monster;
    // Let the spell card display appear uncensored
    if (rollType === "spell-card" && whisper === WhisperType.HIDE_NAMES)
        whisper = WhisperType.NO;

    advantage = parseInt(character.getGlobalSetting("roll-type", RollType.NORMAL));
    if (args["advantage"] == RollType.OVERRIDE_ADVANTAGE)
        args["advantage"] = advantage == RollType.SUPER_ADVANTAGE ? RollType.SUPER_ADVANTAGE : RollType.ADVANTAGE;
    if (args["advantage"] == RollType.OVERRIDE_DISADVANTAGE)
        args["advantage"] = advantage == RollType.SUPER_DISADVANTAGE ? RollType.SUPER_DISADVANTAGE : RollType.DISADVANTAGE;

    // Default advantage/whisper would get overriden if (they are part of provided args;
    const req = {
        action: "roll",
        character: character.getDict(),
        type: rollType,
        roll: cleanRoll(fallback),
        advantage: advantage,
        whisper: whisper
    }
    for (let key in args)
        req[key] = args[key];
    if (key_modifiers.advantage)
        req["advantage"] = RollType.ADVANTAGE;
    else if (key_modifiers.disadvantage)
        req["advantage"] = RollType.DISADVANTAGE;
    if (key_modifiers.super_advantage)
        req["advantage"] = RollType.SUPER_ADVANTAGE;
    else if (key_modifiers.super_disadvantage)
        req["advantage"] = RollType.SUPER_DISADVANTAGE;
    else if (key_modifiers.normal_roll)
        req["advantage"] = RollType.NORMAL;

    if (key_modifiers.whisper)
        req.whisper = WhisperType.YES;
    else if (key_modifiers.dont_whisper)
        req.whisper = WhisperType.NO;
    else if (is_monster && key_modifiers.whisper_hide_names)
        req.whisper = WhisperType.HIDE_NAMES;

    // Add custom roll modifiers from hotkeys
    if (req.character.settings) {
        for (const key in key_modifiers) {
            if (!key.startsWith("custom_modifier:") || !key_modifiers[key]) continue;
            const modifier = key.slice("custom_modifier:".length).trim();
            const operator = ["+", "-"].includes(modifier[0]) ? "" : "+"
            req.character.settings["custom-roll-dice"] = (req.character.settings["custom-roll-dice"] || "") + ` ${operator}${modifier}`;
        }

        if (req.character.settings["effects-bless"] && (["attack", "spell-attack"].includes(req.type) && req["to-hit"] || req.type === "saving-throw")) {
            req.character.settings["custom-roll-dice"] = (req.character.settings["custom-roll-dice"] || "") + " +1d4";
            addEffect(req, "Bless");
        } else if (req.character.settings["effects-bane"] && (["attack", "spell-attack"].includes(req.type) && req["to-hit"] || req.type === "saving-throw")) {
            req.character.settings["custom-roll-dice"] = (req.character.settings["custom-roll-dice"] || "") + " -1d4";
            addEffect(req, "Bane");
        }
    }
        
    if (req.whisper === WhisperType.QUERY) {
        req.whisper = await dndbeyondDiceRoller.queryWhisper(args.name || rollType, is_monster);
        if (req.whisper === null) return; // Query was cancelled
    }
    if (rollType === "custom") {
        req.advantage = RollType.NORMAL;
    }
    if (req.advantage === RollType.QUERY) {
        req.advantage = await dndbeyondDiceRoller.queryAdvantage(args.name || rollType, req["advantage-query"]);
        if (req.advantage === null) return; // Query was cancelled
    }
    if (character.getGlobalSetting("weapon-force-critical", false) || key_modifiers.force_critical) {
        req["rollCritical"] = true;
        if (req["to-hit"]) {
            req["critical-limit"] = 1;
        }
    }

    if(req.character.settings){
        // effects 
        if(["saving-throw", "ability", "skill"].includes(rollType) && req.ability == "STR" && req.character.settings["effects-enlarge"]) {
            adjustRollAndKeyModifiersWithAdvantage(req);
            addEffect(req, "Enlarge");
        } else if(["saving-throw", "ability", "skill"].includes(rollType) && req.ability == "STR" && req.character.settings["effects-reduce"]) {
            adjustRollAndKeyModifiersWithDisadvantage(req);
            addEffect(req, "Reduce");
        }
    }

    if (character.getGlobalSetting("use-digital-dice", false) && DigitalDiceManager.isEnabled()) {
        req.sendMessage = true;
        dndbeyondDiceRoller.handleRollRequest(req);
    } else {
        console.log("Sending message: ", req);
        chrome.runtime.sendMessage(req, (resp) => beyond20SendMessageFailure(character, resp));
        sendRollRequestToDOM(req);
    }
}

function adjustRollAndKeyModifiersWithAdvantage(roll_properties) {
    // Adjust roll_properties["advantage"]
    const advantageMapping = {
        [RollType.NORMAL]: RollType.ADVANTAGE,
        [RollType.DISADVANTAGE]: RollType.NORMAL,
        [RollType.OVERRIDE_DISADVANTAGE]: RollType.NORMAL,
        [RollType.SUPER_DISADVANTAGE]: RollType.DISADVANTAGE
    };

    if (roll_properties["advantage"] === undefined) {
        roll_properties["advantage"] = RollType.ADVANTAGE;
    } else if (roll_properties["advantage"] in advantageMapping) {
        roll_properties["advantage"] = advantageMapping[roll_properties["advantage"]];
    }
}

function adjustRollAndKeyModifiersWithDisadvantage(roll_properties) {
    // Adjust roll_properties["advantage"]
    const disadvantageMapping = {
        [RollType.NORMAL]: RollType.DISADVANTAGE,
        [RollType.ADVANTAGE]: RollType.NORMAL,
        [RollType.OVERRIDE_ADVANTAGE]: RollType.NORMAL,
        [RollType.SUPER_ADVANTAGE]: RollType.ADVANTAGE
    };

    if (roll_properties["advantage"] === undefined) {
        roll_properties["advantage"] = RollType.DISADVANTAGE;
    } else if (roll_properties["advantage"] in disadvantageMapping) {
        roll_properties["advantage"] = disadvantageMapping[roll_properties["advantage"]];
    }
}

function sendRollRequestToDOM(request) {
    sendCustomEvent(request.action, [request]);
    forwardMessageToDOM(request);
}

function isRollButtonAdded(where) {
    if (!where) where = $(document);
    return where.find(".ct-beyond20-roll,.ct-beyond20-roll-display").length > 0;
}

function isCustomRollIconsAdded(where) {
    if (!where) where = $(document);
    return where.find(".ct-beyond20-custom-roll, .ct-beyond20-custom-roll-button").length > 0;
}

function isHitDieButtonAdded() {
    return $(".ct-beyond20-roll-hitdie").length > 0;
}

function getRollTypeButtonClass(character) {
    let advantage = RollType.NORMAL;
    if (character)
        advantage = parseInt(character.getGlobalSetting("roll-type", RollType.NORMAL));
    if (key_modifiers.advantage)
        advantage = RollType.ADVANTAGE;
    else if (key_modifiers.disadvantage)
        advantage = RollType.DISADVANTAGE;
    else if (key_modifiers.normal_roll)
        advantage = RollType.NORMAL;
    else if (key_modifiers.super_advantage)
        advantage = RollType.SUPER_ADVANTAGE;
    else if (key_modifiers.super_disadvantage)
        advantage = RollType.SUPER_DISADVANTAGE;

    if (advantage == RollType.DOUBLE)
        return "beyond20-roll-type-double";
    if (advantage == RollType.QUERY)
        return "beyond20-roll-type-query";
    if (advantage == RollType.THRICE)
        return "beyond20-roll-type-thrice";
    if (advantage == RollType.ADVANTAGE)
        return "beyond20-roll-type-advantage";
    if (advantage == RollType.DISADVANTAGE)
        return "beyond20-roll-type-disadvantage";
    if (advantage == RollType.SUPER_ADVANTAGE)
        return "beyond20-roll-type-super-advantage";
    if (advantage == RollType.SUPER_DISADVANTAGE)
        return "beyond20-roll-type-super-disadvantage";
    return "";
}

function getBadgeIconFromClass(rolltype_class, size="20") {
    const type = rolltype_class.replace("beyond20-roll-type-", "") || "normal";
    return chrome.runtime.getURL(`images/icons/badges/${type}${size}.png`);
}

var last_character_used = null;
function updateRollTypeButtonClasses(character) {
    const button_roll_type_classes = "beyond20-roll-type-double beyond20-roll-type-query beyond20-roll-type-thrice beyond20-roll-type-advantage beyond20-roll-type-disadvantage beyond20-roll-type-super-advantage beyond20-roll-type-super-disadvantage";
    const rolltype_class = getRollTypeButtonClass(character || last_character_used);
    if (character)
        last_character_used = character;
    $(".ct-beyond20-roll .ct-beyond20-roll-button,.beyond20-quick-roll-tooltip").removeClass(button_roll_type_classes).addClass(rolltype_class);
    const icon20 = getBadgeIconFromClass(rolltype_class, "20");
    const icon32 = getBadgeIconFromClass(rolltype_class, "32");
    $(".ct-beyond20-roll .ct-beyond20-icon").attr("src", icon20);
    $(".beyond20-quick-roll-tooltip .beyond20-quick-roll-icon").attr("src", icon32);
}


const button_class = "ct-theme-button ct-theme-button--filled ct-theme-button--interactive ct-button character-button";
const button_class_small = button_class + " character-button-small";
function addRollButton(character, callback, where, { small = false, append = false, prepend = false, before = false, image = true, text = "Beyond 20" } = {}) {
    last_character_used = character;

    const id = "beyond20-roll-" + Math.random().toString().slice(2);

    const rolltype_class = getRollTypeButtonClass(character);
    const buttonContents = [];
    if (image) {
        const icon = getBadgeIconFromClass(rolltype_class);
        buttonContents.push(E.img({ class: "ct-beyond20-icon", src: icon, style: "margin-right: 6px;" }));
    }
    buttonContents.push(E.span({ class: "ct-button__content" }, text));
    const button = E.div({ class: "ct-beyond20-roll", id },
        E.button({ class: "ct-beyond20-roll-button " + (small ? button_class_small : button_class) + " " + rolltype_class },
            ...buttonContents
        )
    )

    if (append)
        $(where).append(button);
    else if (prepend)
        $(where).prepend(button);
    else if (before)
        $(where).before(button);
    else
        $(where).after(button);

    $(`#${id}`).css({
        "float": "right",
        "display": "block",
        "text-align": "center"
    });
    $(`#${id} button`).on('click', (event) => callback());

    return id;
}

function addDisplayButton(callback, where, { text = "Display in VTT", append = true, small = true } = {}) {
    const button = E.div({ class: "ct-beyond20-roll-display" },
        E.button({ class: "ct-beyond20-display-button " + (small ? button_class_small : button_class).replace("filled", "outline") },
            E.span({ class: "ct-button__content" }, text)
        )
    );
    if (append)
        $(where).append(button);
    else
        $(where).after(button);

    $(".ct-beyond20-roll-display").css({
        "margin-left": "auto",
        "margin-right": "auto"
    });
    $(".ct-beyond20-roll-display").css("margin-top", "2px");
    $(".ct-beyond20-roll-display").on('click', (event) => callback());
    return button;
}

function addHitDieButtons(rollCallback) {
    const icon = chrome.runtime.getURL("images/icons/badges/custom20.png");
    const button = E.div({ class: "ct-beyond20-roll-hitdie", style: "float: right;" },
        E.img({ class: "ct-beyond20-icon", src: icon, style: "margin-right: 6px;" }),
        E.button({ class: "ct-beyond20-roll-button " + button_class_small },
            E.span({ class: "ct-button__content" }, "Roll Hit Die")
        )
    );
    //console.log("Adding Hit Dice buttons");

    $(".ct-reset-pane__hitdie-heading").append(button);
    const hitdice = $(".ct-reset-pane__hitdie");
    const multiclass = hitdice.length > 1;
    for (let i = 0; i < hitdice.length; i++) {
        $(".ct-beyond20-roll-hitdie").eq(i).on('click', (event) => rollCallback(multiclass, i));
    }
}

function addIconButton(character, callback, where, { append = false, prepend = false, custom = false } = {}) {
    const rolltype_class = getRollTypeButtonClass(character);
    const icon = custom ? chrome.runtime.getURL("images/icons/badges/custom20.png") :
                        getBadgeIconFromClass(rolltype_class);
    const id = "beyond20-roll-" + (custom ? "custom-" : "") + Math.random().toString().slice(2);
    const button = E.span({ class: "ct-beyond20-" + (custom ? "custom-roll-button" : "roll"), id, style: "margin-right:3px; margin-left: 3px;" },
        E.img({ class: "ct-beyond20-" + (custom ? "custom-icon" : "icon"), src: icon })
    );

    if (append)
        $(where).append(button);
    else if (prepend)
        $(where).prepend(button);
    else
        $(where).after(button);
    $(`#${id}`).on('click', (event) => callback());
    return button;
}

function addRollTableButton(character, where, table) {
    const icon = chrome.runtime.getURL("images/icons/badges/normal32.png");
    const button = E.a({ class: "ct-beyond20-roll button-alt", href: "#" },
        E.span({ class: "label" },
            E.img({ class: "ct-beyond20-roll-table-icon", src: icon, style: "margin-right: 10px;" }),
            "Roll Table to VTT"
        )
    );
    $(where).before(button);
    $(button).css({
        "float": "left",
        "display": "inline-block"
    });
    $(button).on('click', async (event) => {
        event.stopPropagation();
        event.preventDefault();
        // This is because of the prompt for the bardic inspiration dice
        const formula = await table.resolveFormula()
        // Check if there was a query that was cancelled
        if (formula === null) return;
        sendRoll(character, "roll-table", table.formula, {
            "name": table.name,
            "formula": table.formula,
            "table": table.table
        });
    });
}

function removeRollButtons(where) {
    if (!where) where = $(document);
    where.find(`.ct-beyond20-roll,
        .ct-beyond20-roll-hitdie,
        .ct-beyond20-roll-display,
        .ct-beyond20-custom-icon,
        .ct-beyond20-roll-display,
        .ct-beyond20-spell-icon,
        .ct-beyond20-spell-attack-icon`).remove();
    const custom_rolls = where.find("u.ct-beyond20-custom-roll");
    for (let i = 0; i < custom_rolls.length; i++)
        custom_rolls.eq(i).replaceWith(custom_rolls.eq(i).text());
    // We add "beyond20-rolls-added" class to indicate we parsed it. Remove it if we remove dice too
    const added_indicators = where.find(".beyond20-rolls-added");
    for (let i = 0; i < added_indicators.length; i++) {
        added_indicators.removeClass("beyond20-rolls-added");
    }
}


function recursiveDiceReplace(node, cb) {
    if (node.hasChildNodes()) {
        // We need to copy the list since its size could change as we modify it
        const children = [].concat(...node.childNodes);
        for (let child of children) {
            // don't replace anything inside of a roll button itself
            if ($(child).hasClass("ct-beyond20-roll") || $(child).hasClass("ct-beyond20-custom-roll"))
                continue;
            
            // Skip anything inside user comments
            if ($(child).hasClass("homebrew-comments"))
                continue;
            // don't replace anything inside of an embedded script or style tag
            if (["STYLE", "SCRIPT"].includes(node.nodeName))
                continue
            recursiveDiceReplace(child, cb);
        }
    } else if (node.nodeName == "#text") {
        const text = replaceRolls(node.textContent, (...args) => cb(node, ...args));
        // Only replace if we changed it, otherwise we might break existing html code bindings
        if (text != node.textContent) {
            // Try to catch the use case where part of the roll has a tooltip and is therefore a different node
            // <strong><span tooltip>2</span>d4</strong>
            const parent = $(node).parent();
            const parentText = parent.text();
            // The parent has another portion of the same dice formula, so we need to replace the whole parent
            // with the replaced dice
            const parentReplaced = replaceRolls(parentText, () => "-");
            if (parentText !== node.textContent &&
                (parentReplaced === "-" ||
                 parentReplaced === "--" ||
                 parentReplaced === "+-" // Emanate Wrath has "+2d6" which gets "2d6" parsed and leaves "+-"
                )) {
                const text = replaceRolls(parentText, (...args) => cb(node, ...args));
                parent.html($.parseHTML(text));
            } else {
                $(node).replaceWith($.parseHTML(text));
            }
        }
    }
}

function injectDiceToRolls(selector, character, name = "", replacementFn = null) {
    // Parse roll tables
    const tables = $(selector).find("table");
    for (let table of tables.toArray()) {
        table = $(table);
        // Skip any table found inside user comments
        if (table.closest(".homebrew-comments").length > 0) continue;
        if (isRollButtonAdded(table)) continue;
        const tableName = name instanceof Function ? name(table) : name;
        const roll_table = RollTable.parseTable(table, tableName, {character});
        if (roll_table) {
            addRollTableButton(character, table, roll_table);
        }
    }

    let added = 0;
    const icon = chrome.runtime.getURL("images/icons/badges/custom20.png");
    const replaceCB = (node, dice, modifier) => {
        added++;
        dice_formula = (dice == "" ? "1d20" : dice) + modifier;
        const rollName = name instanceof Function ? name(node) : name;
        const defaultReplacement = '<u class="ct-beyond20-custom-roll"><strong>' + dice + modifier + '</strong>' +
            '<img class="ct-beyond20-custom-icon" src="' + icon + '" x-beyond20-name="' + rollName +
            '" x-beyond20-roll="' + dice_formula + '" style="margin-right: 3px; margin-left: 3px;"></img></u>';
        if (!replacementFn) return defaultReplacement;
        return replacementFn(node, dice_formula, dice, modifier, rollName, defaultReplacement);
    }

    const items = $(selector);
    for (let item of items.toArray())
        recursiveDiceReplace(item, replaceCB);

    $(".ct-beyond20-custom-roll").off('click')
        .on('click', (event) => {
        const name = $(event.currentTarget).find("img").attr("x-beyond20-name");
        const roll = $(event.currentTarget).find("img").attr("x-beyond20-roll");
        sendRoll(character, "custom", roll, { "name": name });
    });
    return added;
}

function beyond20SendMessageFailure(character, response) {
    if (!response || (response.request && response.request.action === "update-combat"))
        return;
    console.log("Received response : ", response);
    if (["roll", "rendered-roll"].includes(response.request.action)  && ((response.vtt && response.vtt[0] == "dndbeyond") || response.error)) {
        dndbeyondDiceRoller.handleRollError(response.request, response.error);
    } else if (response.error) {
        alertify.error("<strong>Beyond 20 : </strong>" + response.error);
    }
    if (settings['sticky-hotkeys']) {
        // FIXME: This could reset a key that is being held which the user may want to keep enabled
        resetKeyModifiers();
    }
}


/**
 * Sends messages to the extension if a custom SendMessage is received on the DOM
 * This allows extensions to send DOM API calls to Beyond20 from the ddb site itself
 */
function _sendCustomMessageToBeyond20(message) {
    if (isExtensionDisconnected()) {
        return;
    }
    if (!message || !message.action) {
        console.error("Beyond20: Invalid message received: ", message);
        return;
    }
    // Check for allowed actions only
    if (!["roll", "rendered-roll", "hp-update", "conditions-update", "update-combat"].includes(message.action)) {
        console.error("Beyond20: Invalid action received: ", message.action);
        return;
    }
    chrome.runtime.sendMessage(message, (resp) => beyond20SendMessageFailure(character, resp))
}

function deactivateTooltipListeners(el) {
    return el.off('mouseenter').off('mouseleave').off('click');
}

var quickRollHideId = 0;
var quickRollMouseOverEl = null;
function activateTooltipListeners(el, direction, tooltip, callback) {
    el.on('mouseenter', (e) => {
        if (quickRollHideId)
            clearTimeout(quickRollHideId);
        quickRollHideId = 0;

        const target = $(e.currentTarget)
        const position = target.offset()
        if (direction === "up") {
            position.left += target.outerWidth() / 2 - tooltip.outerWidth() / 2;
            position.top -= tooltip.outerHeight() + 5;
        } else if (direction == "down") {
            position.left += target.outerWidth() / 2 - tooltip.outerWidth() / 2;
            position.top += target.outerHeight() + 5;
        } else if (direction == "left") {
            position.left -= tooltip.outerWidth() - 2;
            position.top += target.outerHeight() / 2 - tooltip.outerHeight() / 2;
        } else if (direction == "right") {
            position.left += target.outerWidth() + 2;
            position.top += target.outerHeight() / 2 - tooltip.outerHeight() / 2;
        }
        tooltip.find(".beyond20-quick-roll-indicator").removeClass("left right down up").addClass(direction);
        tooltip.css(position).show().off('click').on('click', (e) => {
            e.stopPropagation();
            callback(el);
        });
        el.off('click').on('click', (e) => {
            if ($(e.currentTarget).hasClass('integrated-dice__container') || $(e.currentTarget).find(".integrated-dice__container").length > 0) {
                e.stopPropagation();
            }
            callback(el);
        })
        quickRollMouseOverEl = el[0];
    }).on('mouseleave', (e) => {
        if (quickRollHideId)
            clearTimeout(quickRollHideId);
        quickRollHideId = setTimeout(() => tooltip.hide(), 250);
        quickRollMouseOverEl = null;
    });
    el.addClass("beyond20-quick-roll-area");
    // If the mouse was over one of the quick roll areas, then we've just destroyed the click handler, so we need to redo it.
    if (quickRollMouseOverEl === el[0]) {
        el.trigger('mouseenter');
    }
}
// If the element on which the tooltip is appearing gets removed from the visible DOM, then we
// can never receive the mouseleave event, so we trigger it manually
function hideTooltipIfDestroyed() {
    if (quickRollMouseOverEl && !document.body.contains(quickRollMouseOverEl)) {
        $(quickRollMouseOverEl).trigger('mouseleave');
    }
}

var quickRollTooltipEl = null;
function getQuickRollTooltip() {
    let beyond20_tooltip = quickRollTooltipEl || $(".beyond20-quick-roll-tooltip");
    if (beyond20_tooltip.length == 0) {
        const rolltype_class = getRollTypeButtonClass(character);
        const icon = getBadgeIconFromClass(rolltype_class, "32");
        const img = E.img({ class: "beyond20-quick-roll-icon", src: icon, style: "margin-right: 5px;margin-left: 5px;padding: 5px 5px;" });
        const indicator = E.img({ class: "beyond20-quick-roll-indicator", src: chrome.runtime.getURL("images/quick-roll-indicator.png") });
        const div = E.div({ class: "beyond20-quick-roll-tooltip " + getRollTypeButtonClass(character) }, img, indicator);
        beyond20_tooltip = $(div);
        beyond20_tooltip.css({
            "position": "absolute",
            "background": `url("${chrome.runtime.getURL("images/quick-roll-background.png")}") 50% center no-repeat transparent`,
            "background-size": "contain",
            "z-index": "10000"
        });
        beyond20_tooltip.off('mouseenter').off('mouseleave').on('mouseleave', (e) => {
            if (quickRollHideId)
                clearTimeout(quickRollHideId);
            quickRollHideId = setTimeout(() => beyond20_tooltip.hide(), 100);
        }).on('mouseenter', () => {
            if (quickRollHideId)
                clearTimeout(quickRollHideId);
            quickRollHideId = 0;
        })
        beyond20_tooltip.hide();
        $("body").append(beyond20_tooltip);
        // Cache it
        quickRollTooltipEl = beyond20_tooltip;
    }
    return beyond20_tooltip;
}

class GenericDisplayer {
    sendMessage(request, title, html, character, whisper, play_sound, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open) {
        return this.postHTML(request, title, html, character, whisper, play_sound, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open);
    }
    postHTML(request, title, html, character, whisper, play_sound, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open) {
        const req = {
            action: "rendered-roll",
            rendered: "fallback",   // This can be used to determine if it was rendered on the site's content script, or
                                    // if it was because of digital dice, so the site can't ignore digital dice results,
                                    // but could decide to ignore this render as a fallback only
            request,
            title,
            html,
            character,
            whisper,
            play_sound,
            source,
            attributes,
            description,
            attack_rolls,
            roll_info,
            damage_rolls,
            total_damages,
            open
        }
        forwardMessageToDOM(req);
    }
    
    displayError(message) {
        alertify.error(message);
    }
}

class GenericRoller {
    roll(formula, data) {
        return new DNDBRoll(formula, data);
    }
    async resolveRolls(name, rolls) {
        return Promise.all(rolls.map(roll => roll.roll()))
    }
}

class GenericPrompter {
    async prompt(title, html, ok_label = "OK", cancel_label = "Cancel") {
        return new Promise((resolve, reject) => {
            alertify.Beyond20Prompt(title, html, ok_label, cancel_label, resolve);
        });
    }
}

var roll_renderer = new Beyond20RollRenderer(new GenericRoller(), new GenericPrompter(), new GenericDisplayer());
roll_renderer.setBaseURL(chrome.runtime.getURL(""));

class SpellCharacter extends CharacterBase {
    constructor(global_settings) {
        super("spell", global_settings);
    }
}

class Spell {
    constructor(body, character, type = "page") {
        this._character = character;
        // if (type == "page")
        let title_selector = ".page-title";
        let statblock_selector = ".ddb-statblock";
        let description_selector = ".spell-details .more-info-content";
        let casting_time_label = "casting-time";
        let range_area_label = "range-area";

        if (type == "tooltip") {
            title_selector = ".tooltip-header-text";
            statblock_selector = ".tooltip-body-statblock";
            description_selector = ".tooltip-body-description-text";
            casting_time_label = "castingtime";
            range_area_label = "range";
        }

        const get_statblock = (label) => {
            return body.find(`${statblock_selector}-item-${label} ${statblock_selector}-item-value`).text().trim();
        }

        this.spell_name = body.find(title_selector).text().trim();
        this.casting_time = get_statblock(casting_time_label);
        this.range = get_statblock(range_area_label)
        this.components = get_statblock("components");
        this.duration = get_statblock("duration");
        this.description = body.find(description_selector).text().trim();
        const level = get_statblock("level");
        const school = get_statblock("school");
        this.preview = "https://www.dndbeyond.com/content/1-0-851-0/skins/waterdeep/images/spell-schools/35/" + school.toLowerCase() + ".png";
        if (level == "Cantrip") {
            this.level_school = school + " " + level;
        } else {
            this.level_school = level + " Level " + school;
        }
        if (this.duration.startsWith("Concentration")) {
            this.concentration = true;
            this.duration = this.duration.replace("Concentration", "").trim();
        } else {
            this.concentration = false;
        }
        this.ritual = (body.find(statblock_selector + "-item-casting-time .i-ritual").length > 0);
        if (this.components.slice(-1)[0] == "*") {
            const materials = body.find(description_selector + " .components-blurb").text().trim();
            this.description = this.description.slice(0, -1 * materials.length).trim();
            this.components = this.components.slice(0, -2) + materials.slice(4);
        }
        const aoe = body.find(`${statblock_selector}-item-${range_area_label} .aoe-size`).text().trim();
        // If there's an AoE, process the second portion of the Range/Area to separate the two
        if (aoe != "") {
            this.range = this.range.slice(0, -1 * aoe.length).trim();
            // Remove parenthesis around the aoe range, and a possible '*' at the end 
            this.aoe = aoe.trim().replace(/^\(\s*|\s*\*?\)$/g, "");
            // Find the icon with the AoE effect (<i class="i-aoe-sphere">) and convert it to a word
            const i = body.find(`${statblock_selector}-item-${range_area_label} .aoe-size i`);
            const aoeClass = (i.attr("class") || "").split(" ").find(c => c.startsWith("i-aoe-"));
            // Remove class prefix and capitalize first letter
            this.aoe_shape = aoeClass ? aoeClass.replace(/^i-aoe-(.)/, (_, g) => g.toUpperCase()) : undefined;
        }
        // In case of a range with an extra span, remove all the spaces and indents/newlines (metor swarm)
        this.range = this.range.replace(/\s+/g, " ");
    }

    display() {
        sendRoll(this._character, "spell-card", 0, {
            "name": this.spell_name,
            "preview": this.preview,
            "level-school": this.level_school,
            "range": this.range,
            "aoe": this.aoe,
            "aoe-shape": this.aoe_shape,
            "concentration": this.concentration,
            "duration": this.duration,
            "casting-time": this.casting_time,
            "components": this.components,
            "ritual": this.ritual,
            "description": this.description
        });
    }
}

class Monster extends CharacterBase {
    constructor(_type, base = null, global_settings = null, {character, creatureType}={}) {
        super(_type, global_settings);
        if (this.type() == "Monster") {
            this._base = ".mon-stat-block";
        } else if (this.type() == "Creature") {
            this._base = ".ct-creature-block";
        } else if (this.type() == "Vehicle" || this.type() == "Extra-Vehicle") {
            this._base = ".vehicle-stat-block";
        } else {
            this._base = ".mon-stat-block";
        }
        if (base) {
            this._base = base;
        }
        this._creatureType = creatureType;
        this._parent_character = character;
        this._stat_block = $(this._base);
        this._id = null;
        this._name = null;
        this._avatar = null;
        this._meta = null;
        this._attributes = {}
        this._ac = null;
        this._hp = null;
        this._hp_formula = null;
        this._max_hp = 0;
        this._temp_hp = 0;
        this._speed = null;
        this._abilities = [];
        this._tidbits = {}
        this._saves = {}
        this._skills = {}
        this._spells = {}
        this._cr = null;
    }
    
    getSetting(key, default_value = "", settings = null) {
        // Use parent's settings for wild shape creatures
        if (this.type() == "Creature" && this._creatureType === "Wild Shape" && this._parent_character) {
            return this._parent_character.getSetting(key, default_value, settings);
        }
        return super.getSetting(key, default_value, settings);
    }

    get isBlockFinder() {
        return this._base.includes(".stat-block-finder") || this._base.includes(".vehicle-block-finder");
    }

    parseStatBlock(stat_block) {
        const add_dice = this.getGlobalSetting('handle-stat-blocks', true);
        const inject_descriptions = this.getGlobalSetting('subst-dndbeyond-stat-blocks', true);
        const beyond20_tooltip = add_dice || inject_descriptions ? getQuickRollTooltip() : null;
        const base = this._base;
        if (!stat_block)
            stat_block = $(base);

        this._stat_block = stat_block;
        if (this.type() != "Creature" && this.type() != "Extra-Vehicle") {
            stat_block.find(".ct-beyond20-settings-button").remove();
            const quick_settings = E.div({ class: "ct-beyond20-settings-button", style: "background-color: rgba(0, 0, 0, 0.1)" },
                E.img({ class: "ct-beyond20-settings", src: chrome.runtime.getURL("images/icons/icon32.png"), style: "vertical-align: top;" }),
                E.span({ class: "ct-beyond20-settings-button-label mon-stat-block__tidbit mon-stat-block__tidbit-label", style: "font-size: 28px; margin: 5px;" }, "Beyond 20")
            );
            if (this.isBlockFinder) {
                stat_block.find(".Stat-Block-Styles_Stat-Block-Title").prepend(quick_settings);
            } else {
                stat_block.find(`${base}__header`).prepend(quick_settings);
            }
            $(quick_settings).on('click', (event) => alertQuickSettings());
        }
        if (this.isBlockFinder) {
            this._name = stat_block.find(".Stat-Block-Styles_Stat-Block-Title").text().trim();
        } else {
            this._name = stat_block.find(base + "__name").text().trim();
        }
        const link = this.isBlockFinder ?
            stat_block.find(".Stat-Block-Styles_Stat-Block-Title a") :
            stat_block.find(base + "__name-link");
        if (link.length > 0) {
            this._url = link[0].href;
            this._id = this._url.replace("/monsters/", "").replace("/vehicles/", "");
        } else {
            this._url = window.location.href;
            this._id = this._name;
        }
        if (this.isBlockFinder) {
            this._meta = stat_block.find(".Stat-Block-Styles_Stat-Block-Metadata").text().trim();
        } else {
            this._meta = stat_block.find(base + "__meta").text().trim();
        }
        const avatar = $(".details-aside .image a");
        if (avatar.length > 0) {
            this._avatar = avatar[0].href;
            const avatarImg = $(".details-aside .image");
            if (avatarImg)
                addDisplayButton(() => this.displayAvatar(), avatarImg, { small: false, image: true });
        }
        const attributes = this.isBlockFinder ?
            stat_block.find(".Stat-Block-Styles_Stat-Block-Data") :
            stat_block.find(`${base}__attributes ${base}__attribute`);
        for (let attr of attributes.toArray()) {
            let label;
            let value;
            if (this.isBlockFinder) {
                label = $(attr).find("strong").text().trim();
                // Use contents() to get text nodes, then skip the first element
                value = $(attr).contents().slice(1).text().trim();
            } else {
                label = $(attr).find(base + "__attribute-label").text().trim();
                value = $(attr).find(base + "__attribute-value").text().trim();
            }
            if (value == "")
                value = $(attr).find(base + "__attribute-data").text().trim();
            if (label == "Armor Class") {
                if (this.isBlockFinder) {
                    const match = value.match(/([0-9]+)/);
                    this._ac = match ? match[1] : value;
                } else {
                    this._ac = $(attr).find(base + "__attribute-data-value").text().trim();
                }
            } else if (label == "Hit Points") {
                if (this.isBlockFinder) {
                    const match = value.match(/([0-9]+)\s*(?:\((.*)\))?/);
                    this._hp = match ? match[1] : value;
                    this._hp_formula = match ? match[2] : value;
                } else {
                    this._hp = $(attr).find(base + "__attribute-data-value").text().trim();
                    const formula = $(attr).find(base + "__attribute-data-extra");
                    this._hp_formula = formula.text().trim().slice(1, -1);
                }
                if (add_dice) {
                    const digitalDiceBox = $(attr).find(base + "__attribute-data-extra .integrated-dice__container");
                    if (digitalDiceBox.length > 0) {
                        // Use the digital Dice box (encounters page)
                        digitalDiceBox.off('click').on('click', (e) => {
                            e.stopPropagation();
                            this.rollHitPoints();
                        })
                        deactivateTooltipListeners(digitalDiceBox);
                        activateTooltipListeners(digitalDiceBox, "right", beyond20_tooltip, () => this.rollHitPoints());
                    } else {
                        if (this.isBlockFinder) {
                            addIconButton(this, () => this.rollHitPoints(), $(attr), {custom: true, append: true});
                        } else {
                            addIconButton(this, () => this.rollHitPoints(), $(attr).find(base + "__attribute-data-extra"), {custom: true});
                        }
                    }
                }
            } else if (label == "Speed") {
                this._speed = value;
            }
            this._attributes[label] = value;
        }

        let abilities = stat_block.find(base + "__abilities");
        let prefix = `${base}__ability-`
        let initiative_selector = base + "__beyond20-roll-initiative";
        if (abilities.length > 0) {
            abilities = abilities.find("> div");
        } else {
            if (this.isBlockFinder) {
                abilities = stat_block.find(".stat-block-ability-scores > div");
                prefix = ".stat-block-ability-scores-";
                initiative_selector = ".block-finder__beyond20-roll-initiative"
            } else {
                abilities = stat_block.find(".ability-block > div");
                prefix = ".ability-block__";
            }
        }
        for (let ability of abilities.toArray()) {
            const abbr = $(ability).find(prefix + "heading").text().toUpperCase();
            const score = $(ability).find(prefix + "score").text();
            const modifier = $(ability).find(prefix + "modifier").text().slice(1, -1);
            this._abilities.push([abbreviationToAbility(abbr), abbr, score, modifier]);
            if (add_dice) {
                const digitalDiceBox = $(ability).find(prefix + "modifier .integrated-dice__container");
                if (digitalDiceBox.length > 0) {
                    // Use the digital Dice box (encounters page)
                    digitalDiceBox.off('click').on('click', (e) => {
                        e.stopPropagation();
                        this.rollAbilityCheck(abbr)
                    })
                    deactivateTooltipListeners(digitalDiceBox);
                    activateTooltipListeners(digitalDiceBox, "down", beyond20_tooltip, () => this.rollAbilityCheck(abbr));
                } else {
                    addIconButton(this, () => this.rollAbilityCheck(abbr), ability, { prepend: true });
                }
                if (abbr == "DEX") {
                    let roll_initiative = stat_block.find(initiative_selector);
                    const attributes = this.isBlockFinder ? 
                        stat_block.find(".red-statblock-text") :
                        stat_block.find(base + "__attributes");
                    if (attributes.length > 0) {
                        let initiative = roll_initiative.eq(0);
                        // Make sure the modifier didn't change (encounters)
                        if (roll_initiative.length > 0 && roll_initiative.attr("data-modifier") !== modifier) {
                            initiative = null;
                            roll_initiative.remove();
                            roll_initiative = [];
                        }
                        if (roll_initiative.length == 0) {
                            if (this.isBlockFinder) {
                                initiative = $(
                                    E.p({ class: `Stat-Block-Styles_Stat-Block-Data ${initiative_selector.slice(1)}`,
                                            "data-modifier": modifier },
                                        E.strong({ class: `block-finder-attribute-label` }, "Roll Initiative!"),
                                        E.span({ class: `block-finder-data` }, "  " + modifier)
                                    )
                                );
                            } else { 
                                const attribute_prefix = `${base.slice(1)}__attribute`
                                initiative = $(
                                    E.div({ class: `${attribute_prefix} ${initiative_selector.slice(1)}`,
                                            "data-modifier": modifier },
                                        E.span({ class: `${attribute_prefix}-label` }, "Roll Initiative!"),
                                        E.span({ class: `${attribute_prefix}-data` },
                                            E.span({ class: `${attribute_prefix}-data-value` }, "  " + modifier)
                                        )
                                    )
                                );
                            }
                        }
                        attributes.eq(0).append(initiative);
                        addIconButton(this, () => this.rollInitiative(), initiative, { append: true });
                    }
                }
            }
        }


        const tidbits = this.isBlockFinder ? 
            stat_block.find(".red-statblock-text").eq(1).find(".Stat-Block-Styles_Stat-Block-Data") : 
            stat_block.find(base + "__tidbits " + base + "__tidbit");
        for (let tidbit of tidbits.toArray()) {
            let label;
            let data;
            if (this.isBlockFinder) {
                label = $(tidbit).find("strong").text().trim();
                // Use contents() to get text nodes, then skip the first element
                data = $(tidbit).contents().slice(1);
            } else {
                label = $(tidbit).find(base + "__tidbit-label").text().trim();
                data = $(tidbit).find(base + "__tidbit-data");
            }
            const digitalDiceBoxes = data.find(".integrated-dice__container");
            const value = data.text().trim();
            if (label == "Saving Throws") {
                const saves = value.split(", ");
                const useDigitalDice = digitalDiceBoxes.length === saves.length;
                if (add_dice && !useDigitalDice) {
                    data.html("");
                    // For block finder, we don't have any elements, instead we have text nodes
                    if (this.isBlockFinder) {
                        data = data.addBack().each((idx, el) => {
                            // Remove text nodes
                            if (el.nodeType === 3) {
                                el.remove();
                            }
                        }).parent();
                        data.append(" ");
                    }
                }
                for (let save of saves) {
                    const parts = save.split(" ");
                    const abbr = parts[0];
                    const mod = parts.slice(1).join(" ");
                    this._saves[abbr] = mod;
                    if (useDigitalDice) {
                        // Hook into the existing digital dice boxes
                        const idx = saves.indexOf(save);
                        const digitalDiceBox = digitalDiceBoxes.eq(idx);
                        // Use the digital Dice box (encounters page)
                        digitalDiceBox.off('click').on('click', (e) => {
                            e.stopPropagation();
                            this.rollSavingThrow(abbr);
                        })
                        deactivateTooltipListeners(digitalDiceBox);
                        activateTooltipListeners(digitalDiceBox, "down", beyond20_tooltip, () => this.rollSavingThrow(abbr));
                    } else if (add_dice) {
                        data.append(abbr + " " + mod);
                        addIconButton(this, () => this.rollSavingThrow(abbr), data, { append: true });
                        if (saves.length > Object.keys(this._saves).length)
                            data.append(", ");
                    }
                }
            } else if (label == "Skills") {
                const skills = value.split(", ");
                const useDigitalDice = digitalDiceBoxes.length === skills.length;
                for (let skill of skills) {
                    const match = skill.match(/(.+?)([+-]?)\s*([0-9]+)/);
                    if (match) {
                        const name = match[1].trim();
                        const mod = `${match[2] || "+"}${match[3]}`;
                        this._skills[name] = mod;
                        // Hook into the existing digital dice boxes
                        if (useDigitalDice) {
                            const idx = skills.indexOf(skill);
                            const digitalDiceBox = digitalDiceBoxes.eq(idx);
                            // Use the digital Dice box (encounters page)
                            digitalDiceBox.off('click').on('click', (e) => {
                                e.stopPropagation();
                                this.rollSkillCheck(name)
                            })
                            deactivateTooltipListeners(digitalDiceBox);
                            activateTooltipListeners(digitalDiceBox, "down", beyond20_tooltip, () => this.rollSkillCheck(name));
                        }
                    }
                }
                if (useDigitalDice || !add_dice)
                    continue;
                if (this.type() == "Monster") {
                    const skill_links = this.isBlockFinder ? 
                        $(tidbit).find("> a") :
                        data.find("> a");
                    for (let a of skill_links.toArray()) {
                        const mon_skill = a.textContent;
                        let text = a.nextSibling;
                        let last = true;
                        if (text.textContent.trim() === "") {
                            text = text.nextSibling;
                        }
                        if (text.textContent.endsWith(", ")) {
                            text.textContent = text.textContent.slice(0, -2);
                            last = false;
                        }
                        if (text.nextSibling && text.nextSibling.textContent.trim() === ",") {
                            text.nextSibling.remove();
                            last = false;
                        }
                        addIconButton(this, () => this.rollSkillCheck(mon_skill), text);
                        if (!last)
                            $(a.nextElementSibling).after(", ");
                    }
                } else {
                    data.html("");
                    // For block finder, we don't have any elements, instead we have text nodes
                    if (this.isBlockFinder) {
                        data = data.addBack().each((idx, el) => {
                            // Remove text nodes
                            if (el.nodeType === 3) {
                                el.remove();
                            }
                        }).parent();
                        data.append(" ");
                    }
                    let first = true;
                    for (let skill in this._skills) {
                        if (!first)
                            data.append(", ");
                        first = false;
                        data.append(skill + " " + this._skills[skill]);
                        addIconButton(this, () => this.rollSkillCheck(skill), data, { append: true });
                    }
                }
            } else if (label == "Challenge") {
                this._cr = value.split(" ")[0];
            }
            this._tidbits[label] = value;
        }
        this.lookForActions(stat_block, add_dice, inject_descriptions);
        if (add_dice)
            this.lookForSpells(stat_block);
        //console.log("Done parsing stat block:", this);
    }

    displayAvatar() {
        sendRoll(this, "avatar", this._avatar, { "name": "Avatar" });
    }

    rollHitPoints() {
        sendRoll(this, "custom", this._hp_formula, {
            "name": "Hit Points",
            "modifier": this._hp_formula
        });
    }

    rollAbilityCheck(abbr) {
        for (let ability of this._abilities) {
            if (ability[1] == abbr) {
                const [name, abbr, score, modifier] = ability;
                const roll_properties = {
                    "name": name,
                    "ability": abbr,
                    "modifier": modifier,
                    "ability-score": score
                };
                if (abbr == "STR" && this.type() == "Creature" && this._creatureType === "Wild Shape" && this._parent_character && 
                    this._parent_character.hasClassFeature("Rage") && this._parent_character.getSetting("barbarian-rage", false)) {
                    roll_properties["advantage"] = RollType.OVERRIDE_ADVANTAGE;
                }
                
                if (this.type() == "Creature" && this._creatureType === "Wild Shape" && this._parent_character &&
                    this._parent_character.getSetting("custom-ability-modifier", "")) {
                    const custom = parseInt(this._parent_character.getSetting("custom-ability-modifier", "0")) || 0;
                    if (custom != 0)  {
                        let customModifier = parseInt(modifier) + custom;
                        customModifier = customModifier >= 0 ? `+${customModifier}` : `${customModifier}`;
                        roll_properties["modifier"] = customModifier;
                    }
                }
                sendRoll(this, "ability", "1d20" + modifier, roll_properties);
                break;
            }
        }
    }

    rollInitiative() {
        for (let ability of this._abilities) {
            if (ability[1] == "DEX") {
                const modifier = ability[3];

                let initiative = modifier;
                if (this.getGlobalSetting("initiative-tiebreaker", false)) {
                    const tiebreaker = ability[2];

                    // Add tiebreaker as a decimal;
                    initiative = parseFloat(initiative) + parseFloat(tiebreaker) / 100;

                    // Render initiative as a string that begins with '+' || '-';
                    initiative = initiative >= 0 ? '+' + initiative.toString() : initiative.toString();
                }

                sendRoll(this, "initiative", "1d20" + initiative, { "initiative": initiative });
                break;
            }
        }
    }

    rollSavingThrow(abbr) {
        const mod = this._saves[abbr];
        const name = abbreviationToAbility(abbr);
        const roll_properties = {
            "name": name,
            "ability": abbr,
            "modifier": mod
        };
        if (abbr == "STR" && this.type() == "Creature" && this._creatureType === "Wild Shape" && this._parent_character && 
            this._parent_character.hasClassFeature("Rage") && this._parent_character.getSetting("barbarian-rage", false)) {
            roll_properties["advantage"] = RollType.OVERRIDE_ADVANTAGE;
        }
        sendRoll(this, "saving-throw", "1d20" + mod, roll_properties);
    }

    rollSkillCheck(skill) {
        const modifier = this._skills[skill];
        const ability = skillToAbility(skill);
        const roll_properties = {
            "skill": skill,
            "ability": ability,
            "modifier": modifier
        };
        if (ability == "STR" && this.type() == "Creature" && this._creatureType === "Wild Shape" && this._parent_character && 
            this._parent_character.hasClassFeature("Rage") && this._parent_character.getSetting("barbarian-rage", false)) {
            roll_properties["advantage"] = RollType.OVERRIDE_ADVANTAGE;
        }
        sendRoll(this, "skill", "1d20" + modifier, roll_properties);
    }

    parseAttackInfo(description) {
        // changed for 2024 info descriptions
        const m = description.match(/(Melee|Ranged|Spell)(?: Weapon| Spell| Attack) ?(?: Attack|Roll):.*?(\+[0-9]+)(?: to hit.*?|\s?,) (?:reach |ranged? |Gibletish )?(.*?)(?:,.*?)?\./i);
        if (m)
            return m.slice(1, 4);
        else
            return null;
    }

    parseSaveInfo(description) {
        const regex2024 = /(?<save>Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)(?: Saving Throw:).DC (?<dc>[0-9]+)/;
        const regex2014 = /DC ([0-9]+) (.*?) saving throw/;

        const match2014 = description.match(regex2014);
        const match2024 = description.match(regex2024);

        if(match2014) return [match2014[2], match2014[1]];
        else if(match2024) return [match2024[1], match2024[2]]
        else return null;
    }

    parseHitInfo(description) {
        const hit_idx = description.indexOf("Hit:");
        let hit = description;
        if (hit_idx > 0)
            hit = description.slice(hit_idx);
        // Using match with global modifier then map to regular match because RegExp.matchAll isn't available on every browser
        const damage_regexp = new RegExp(/([\w]* )(?:([0-9]+)(?!d))?(?: *\(?([0-9]*d[0-9]+(?:\s*[-+]\s*[0-9]+)?(?: plus [^\)]+)?)\)?)? ([\w ]+?) damage/)
        const healing_regexp = new RegExp(/gains (?:([0-9]+)(?!d))?(?: *\(?([0-9]*d[0-9]+(?:\s*[-+]\s*[0-9]+)?)(?: plus [^\)]+)?\)?)? (temporary)?\s*hit points/)
        const damage_matches = reMatchAll(damage_regexp, hit) || [];
        const healing_matches = reMatchAll(healing_regexp, hit) || [];
        const damages = [];
        const damage_types = [];
        for (let dmg of damage_matches) {
            // Skip any damage that starts wit "DC" because of "DC 13 saving throw or take damage" which could match.
            // A lookbehind would be a simple solution here but rapydscript doesn't let me.
            // Also skip "target reduced to 0 hit points by this damage" from demon-grinder vehicle.
            if (dmg[1] == "DC " || dmg[4] == "hit points by this") {
                continue;
            }
            const damage = dmg[3] || dmg[2];
            // Make sure we did match a damage ('  some damage' would match the regexp, but there is no value)
            if (damage) {
                damages.push(damage.replace("plus", "+"));
                damage_types.push(dmg[4]);
            }
        }
        for (let dmg of healing_matches) {
            const damage = dmg[2] || dmg[1];
            const healingType = dmg[3] ? "Temp HP" : "Healing"
            if (damage) {
                damages.push(damage.replace("plus", "+"));
                damage_types.push(healingType);
            }
        }
        let save = null;
        const m = this.parseSaveInfo(hit);
        let preDCDamages = damages.length;
        if (m) {
            save = m;
            preDCDamages = damage_matches.reduce((total, match) => {
                if (match.index < m.index)
                    total++;
                return total
            }, 0);
        } else {
            const m2 = hit.match(/escape DC ([0-9]+)/);
            if (m2)
                save = ["Escape", m2[1]];
        }

        if (damages.length == 0 && save === null)
            return null;
        return [damages, damage_types, save, preDCDamages];
    }

    buildAttackRoll(name, description) {
        const roll_properties = {
            "name": name,
            "preview": this._avatar,
            "attack-source": "monster-action",
            "description": description,
            "rollAttack": true,
            "rollDamage": this.getGlobalSetting("auto-roll-damage", true),
        }

        const attackInfo = this.parseAttackInfo(description);
        //console.log("Attack info for ", name, attackInfo);
        if (attackInfo) {
            const [attack_type, to_hit, reach_range] = attackInfo;
            roll_properties["to-hit"] = to_hit;
            roll_properties["attack-type"] = attack_type;
            roll_properties[attack_type == "Melee" ? "reach" : "range"] = reach_range;
        }


        const hitInfo = this.parseHitInfo(description);
        //console.log("Hit info for ", name, hitInfo);
        if (hitInfo) {
            const [damages, damage_types, save, toCrit] = hitInfo;
            if (damages.length > 0) {
                roll_properties["damages"] = damages;
                roll_properties["damage-types"] = damage_types;
                const crits = damagesToCrits(this, damages.slice(0, toCrit), damage_types.slice(0, toCrit));
                const crit_damages = [];
                const crit_damage_types = [];
                for (let [i, dmg] of crits.entries()) {
                    if (dmg != "") {
                        crit_damages.push(dmg);
                        crit_damage_types.push(damage_types[i]);
                    }
                }
                roll_properties["critical-damages"] = crit_damages;
                roll_properties["critical-damage-types"] = crit_damage_types;
            }
            if (save) {
                roll_properties["save-ability"] = save[0];
                roll_properties["save-dc"] = save[1];
            }
        }

        if (attackInfo || hitInfo)
            return roll_properties;

        return null;
    }

    lookForActions(stat_block, add_dice, inject_descriptions) {
        let blocks;
        
        if (this.isBlockFinder) {
            // In block finders, there are no blocks, it's just straight p body elements
            blocks = stat_block;
        } else {
            blocks = stat_block.find(this._base + "__description-blocks " + this._base + "__description-block");
        }

        this._actions = [];

        const handleAction = (action_name, block, action) => {
            if (action_name.slice(-1)[0] == ".")
                action_name = action_name.slice(0, -1);
            this._actions.push(action_name);
            //console.log("Action name: ", action_name);
            if (add_dice) {
                let description = action.toArray ? 
                    action.toArray().map(a => descriptionToString(a)).join("\n")
                    : descriptionToString(action);
                description = description.replace(/−/g, "-");
                const roll_properties = this.buildAttackRoll(action_name, description);
                if (roll_properties) {
                    const id = addRollButton(this, () => {
                        // Need to recreate roll properties, in case settings (whisper, custom dmg, etc..) have changed since button was added
                        const roll_properties = this.buildAttackRoll(action_name, description);
                        if (this.type() == "Creature" && this._creatureType === "Wild Shape" && this._parent_character &&
                            roll_properties["damages"] && roll_properties["damages"].length > 0) {
                            if (this._parent_character.hasClass("Barbarian") && this._parent_character.hasClassFeature("Rage") &&
                                this._parent_character.getSetting("barbarian-rage", false) && description.match(/Melee(?: Weapon)? Attack:/)) {
                                // Barbarian: Rage
                                const barbarian_level = this._parent_character.getClassLevel("Barbarian");
                                const rage_damage = barbarian_level < 9 ? 2 : (barbarian_level < 16 ? 3 : 4);
                                roll_properties["damages"].push(String(rage_damage));
                                roll_properties["damage-types"].push("Rage");
                            }
                            // Add custom damages to wild shape attacks
                            addCustomDamages(character, roll_properties["damages"], roll_properties["damage-types"]);
                        }
                        if (roll_properties["damages"] && roll_properties["damages"].length > 0) {
                            for (const key in key_modifiers) {
                                if (!key.startsWith("custom_damage:") || !key_modifiers[key]) continue;
                                const custom_damage = key.slice("custom_damage:".length);
                                if (custom_damage.includes(":")) {
                                    const parts = custom_damage.split(":", 2);
                                    roll_properties["damages"].push(parts[1].trim());
                                    roll_properties["damage-types"].push(parts[0].trim());
                                } else {
                                    roll_properties["damages"].push(custom_damage.trim());
                                    roll_properties["damage-types"].push("Custom");
                                }
                            }
                        }
                        if (roll_properties["to-hit"]) {
                            for (const key in key_modifiers) {
                                if (!key.startsWith("custom_modifier:") || !key_modifiers[key]) continue;
                                const modifier = key.slice("custom_modifier:".length).trim();
                                const operator = ["+", "-"].includes(modifier[0]) ? "" : "+ "
                                roll_properties["to-hit"] += ` ${operator}${modifier}`;
                            }
                        }
                    
                        if (key_modifiers["display_attack"]) {
                            return sendRoll(this, "trait", "0", roll_properties);
                        }
                        sendRoll(this, "attack", "1d20" + (roll_properties["to-hit"] || ""), roll_properties)
                    }, block, {small: true, before: true, image: true, text: action_name});
                    $("#" + id).css({ "float": "", "text-align": "", "margin-top": "15px" });
                } else {
                    const id = addRollButton(this, () => {
                        const roll_properties = {
                            name: action_name,
                            description
                        };
                        sendRoll(this, "trait", "0", roll_properties);
                    }, block, {small: true, before: true, image: false, text: action_name});
                    $("#" + id).css({ "float": "", "text-align": "", "margin-top": "15px" });
                }
            }
            if (inject_descriptions) {
                injectDiceToRolls(action, this, action_name, (...args) => this._injectDiceReplacement(...args));
            }
        }

        let blockFinderPastTidbits = false;
        for (let block of blocks.toArray()) {
            const paragraphs = this.isBlockFinder ? 
                $(block).find("> p.Stat-Block-Styles_Stat-Block-Body, > p.Stat-Block-Styles_Stat-Block-Data") :
                $(block).find(`${this._base}__description-block-content p`);
            let lastAction = null;
            for (const p of paragraphs.toArray()) {
                //console.log("Found action: ", action);
                const firstChild = p.firstElementChild;
                if (!firstChild) continue;
                // Usually <em><strong> || <strong><em> (Orcus is <span><em><strong>);
                let action_name = $(firstChild).find("> :first-child").text().trim() || $(firstChild).text().trim();
                if (!action_name) continue;
                // Replace non-breaking space character with regular space so it can match the description
                action_name = action_name.replace(/ /g, " ");
                if (this.isBlockFinder && this.type() === "Vehicle") {
                    // Vehicles in source books will use data blocks just like any of the tidbits
                    // need to manually filter them out
                    if (action_name === "Speed") {
                        blockFinderPastTidbits = true;
                        continue;
                    }
                    if (!blockFinderPastTidbits) continue;
                    if (action_name.includes("Immunities")) continue;
                    if (action_name.includes("Resistance")) continue;
                }
                const description = descriptionToString(p).trim();
                if (!description.startsWith(action_name)) continue;
                if (lastAction) {
                    // Found a new action, parse all DOM elements in between as an action
                    const action = $(lastAction.block).nextUntil(p).addBack();
                    handleAction(lastAction.name, lastAction.block, action);
                }
                // Store action for later processing
                lastAction = { name: action_name, block: p };
            }
            if (lastAction) {
                // Grab all the remaining elements
                const action = $(lastAction.block).nextUntil().addBack();
                handleAction(lastAction.name, lastAction.block, action);
            }
        }

        if (this.type() == "Vehicle" || this.type() == "Extra-Vehicle") {
            // Parse Vehicle (boats) weapons;
            blocks = stat_block.find(this._base + "__component-block");
            for (let block of blocks.toArray()) {
                const action_name = $(block).find(this._base + "__component-block-heading").text().trim();
                const attributes = $(block).find(this._base + "__component-block-content " + this._base + "__attribute");
                for (const attribute of attributes.toArray()) {
                    const label = $(attribute).find(`${this._base}__attribute-label`).text().trim();
                    const description = $(attribute).find(`${this._base}__attribute-value`).text().trim();
                    // Skip all attributes and only handle action on the action's desription paragraph with no label
                    // Some vehicles will also have empty attributes with no label and no value
                    if (label || !description)
                        continue;
                    handleAction(action_name, block, attribute);
                }
            }

            // Parse Vehicle (boats) weapons (in character extra);
            blocks = stat_block.find(this._base + "-component");
            for (let block of blocks.toArray()) {
                const action_name = $(block).find(this._base + "__section-header").text();
                const actions = $(block).find(this._base + "-component__actions");
                // We can't parse each action separately because the entire block is interactive.;
                handleAction(action_name, block, actions);
            }

            // Parse Vehicle (infernal machines) features;
            blocks = stat_block.find(this._base + "__feature," + this._base + "__features-feature");
            for (let block of blocks.toArray()) {
                let action_name = $(block).find(this._base + "__feature-label").text();
                let action = $(block).find(this._base + "__feature-value");
                if (action_name == "" && action.length == 0) {
                    action_name = $(block).find(this._base + "__features-feature-name").text();
                    action = $(block).find(this._base + "__features-feature-description");
                }
                handleAction(action_name, block, action);
            }

            // Parse Vehicle (infernal machines) action stations;
            blocks = stat_block.find(this._base + "__action-station-block," + this._base + "-action-station");
            for (let block of blocks.toArray()) {
                let action_name = $(block).find(this._base + "__action-station-block-heading").text();
                let action = $(block).find(this._base + "__action-station-block-content " + this._base + "__attribute-value");
                if (action_name == "" && action.length == 0) {
                    action_name = $(block).find(this._base + "-action-station__heading").text();
                    action = $(block).find(this._base + "__action");
                }
                handleAction(action_name, block, action);
            }
        }
    }
    _injectDiceReplacement(node, formula, dice, modifier, name, defaultReplacement) {
        // Check if the formula is inside a digital dice button, if yes, don't replace anything
        const originalFormula = dice + modifier;
        const digitalDiceBox = $(node).closest(".integrated-dice__container");
        if (digitalDiceBox.length === 1) {
            // Trim parenthesis from the formula, as DDB tends to add them
            const digitalDiceFormula = digitalDiceBox.text().replace(/^[\(\)]+|[\(\)]+$/g, "");
            // Make sure the closest dice box contains the formula we're replacing
            if (digitalDiceFormula === originalFormula) {
                digitalDiceBox.off('click').on('click', (e) => {
                    e.stopPropagation();
                    sendRoll(this, "custom", formula, { "name": name });
                })
                deactivateTooltipListeners(digitalDiceBox);
                activateTooltipListeners(digitalDiceBox, "up", getQuickRollTooltip(), () => sendRoll(this, "custom", formula, { "name": name }));
                // Return null to prevent modifying the html
                return null;
            }
        }
        return defaultReplacement;
    }

    injectSpellRolls(element, url) {
        const icon = chrome.runtime.getURL("images/icons/badges/spell20.png");
        const roll_icon = $('<img class="ct-beyond20-spell-icon" x-beyond20-spell-url="' + url + '"></img>');

        $(element).after(roll_icon);

        $(".ct-beyond20-spell-icon").css("margin-right", "3px");
        $(".ct-beyond20-spell-icon").css("margin-left", "3px");
        $(".ct-beyond20-spell-icon").attr("src", icon);
        $(".ct-beyond20-spell-icon").off('click');
        $(".ct-beyond20-spell-icon").on('click', (event) => {
            const spell_url = $(event.currentTarget).attr("x-beyond20-spell-url");
            if (this._spells[spell_url] !== undefined) {
                this._spells[spell_url].display();
            } else {
                //console.log("Fetching Spell Tooltip from URL : ", spell_url);
                $.get(spell_url, (text) => {
                    const spell_json = JSON.parse(text.slice(1, -1));
                    const spell = new Spell($(spell_json.Tooltip), this, "tooltip");
                    spell.display();
                    this._spells[spell_url] = spell;
                });
            }
        });
    }

    lookForSpells(stat_block) {
        const spells = this.isBlockFinder ? 
            stat_block.find(".Stat-Block-Styles_Stat-Block-Body a.spell-tooltip") :
            stat_block.find(this._base + "__description-blocks a.spell-tooltip");
        for (let spell of spells.toArray()) {
            const tooltip_href = $(spell).attr("data-tooltip-href");
            const tooltip_url = tooltip_href.replace(/-tooltip.*$/, "/tooltip");
            this.injectSpellRolls(spell, tooltip_url);
        }
    }

    updateInfo() {
        if (this.type() != "Creature" && this.type() != "Extra-Vehicle") return;
        // Creature name could change/be between.includes(customized) calls;
        this._name = this._stat_block.find(this._base + "__name").text().trim();
        let hp = null;
        let max_hp = null;
        let temp_hp = null;
        const groups = $(".b20-creature-pane .ddbc-collapsible__content div[class*='styles_adjusterGroup']");
        for (let item of groups.toArray()) {
            const label = $(item).find("div[class*='styles_adjusterLabel']").text();
            if (label == "Current HP") {
                hp = parseInt($(item).find("div[class*='styles_adjusterValue']").text());
            } else if (label == "Max HP") {
                max_hp = parseInt($(item).find("div[class*='styles_adjusterValue']").text());
            } else if (label == "Temp HP") {
                temp_hp = parseInt($(item).find("div[class*='styles_adjusterValue'] input").val());
            }
        }
        if (hp !== null && max_hp !== null && (this._hp != hp || this._max_hp != max_hp || this._temp_hp != temp_hp)) {
            this._hp = hp;
            this._max_hp = max_hp;
            this._temp_hp = temp_hp;
            console.log("Monster HP updated to : (" + hp + "+" + temp_hp + ")/" + max_hp);

            if (this.getGlobalSetting("update-hp", true)) {
                const req = { "action": "hp-update", "character": this.getDict() }
                console.log("Sending message: ", req);
                chrome.runtime.sendMessage(req, (resp) => beyond20SendMessageFailure(this, resp));
                sendRollRequestToDOM(req);
            }
        }
    }

    getDict() {
        let settings = undefined;
        if (this.type() == "Creature" && this._parent_character && this._creatureType === "Wild Shape") {
            const parentDict = this._parent_character.getDict();
            settings = parentDict.settings;
        }
        return {
            "name": this._name,
            "source": "D&D Beyond",
            "avatar": this._avatar,
            "type": this.type(),
            "creatureType": this._creatureType,
            "settings": settings,
            "id": this._id,
            "ac": this._ac,
            "hp": this._hp,
            "hp-formula": this._hp_formula,
            "max-hp": this._max_hp,
            "temp-hp": this._temp_hp,
            "speed": this._speed,
            "abilities": this._abilities,
            "actions": this._actions,
            "discord-target": this._parent_character && this._parent_character.getSetting("discord-target", undefined),
            "saves": this._saves,
            "skills": this._skills,
            "cr": this._cr,
            "url": this._url
        }
    }
}
console.log("Beyond20: D&D Beyond Monster module loaded.");

var settings = getDefaultSettings();
var character = null;

function documentLoaded(settings) {
    cleanupAlertifyComments();
    character = new Monster("Monster", null, settings);
    // We reloaded the extension ? reload the page too...;
    if (isRollButtonAdded()) {
        chrome.runtime.sendMessage({ "action": "reload-me" });
    } else {
        character.parseStatBlock();
    }
}

function updateSettings(new_settings = null) {
    if (new_settings) {
        settings = new_settings;
        if (character !== null)
            character.setGlobalSettings(settings);
        key_bindings = getKeyBindings(settings);
        sendCustomEvent("NewSettings", [settings, chrome.runtime.getURL("")]);
    } else {
        getStoredSettings((saved_settings) => {
            sendCustomEvent("Loaded", [saved_settings]);
            updateSettings(saved_settings);
            documentLoaded(settings);
        });
    }
}

function handleMessage(request, sender, sendResponse) {
    if (request.action == "settings") {
        if (request.type == "general")
            updateSettings(request.settings);
    } else if (request.action == "open-options") {
        alertFullSettings();
    }
}

injectCSS(BUTTON_STYLE_CSS);
chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.sendMessage({ "action": "activate-icon" });
updateSettings();
addCustomEventListener("SendMessage", _sendCustomMessageToBeyond20);

