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


class Roll20Displayer {
    sendMessage(request, title, html, character, whisper, play_sound, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open) {
        return this.postHTML(request, title, html, character, whisper, play_sound, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open);
    }
    postHTML(request, title, html, character, whisper, play_sound, source, attributes, description, attack_rolls, roll_info, damage_rolls, total_damages, open) {
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
        handleRenderedRoll(req);
    }
    
    displayError(message) {
        alertify.error(message);
    }
}

class Roll20Roller {
    roll(formula, data) {
        return new DNDBRoll(formula, data);
    }
    async resolveRolls(name, rolls) {
        return Promise.all(rolls.map(roll => roll.roll()))
    }
}

class Roll20Prompter {
    async prompt(title, html, ok_label = "OK", cancel_label = "Cancel") {
        return new Promise((resolve, reject) => {
            alertify.Beyond20Prompt(title, html, ok_label, cancel_label, resolve);
        });
    }
}

var roll_renderer = new Beyond20RollRenderer(new Roll20Roller(), new Roll20Prompter(), new Roll20Displayer());
roll_renderer.setBaseURL(chrome.runtime.getURL(""));
console.log("Beyond20: Roll20 module loaded.");

const ROLL20_WHISPER_QUERY = "?{Whisper?|Public Roll,|Whisper Roll,/w gm }"
const ROLL20_ADVANTAGE_QUERY = "{{query=1}} ?{Advantage?|Normal Roll,&#123&#123normal=1&#125&#125|Advantage,&#123&#123advantage=1&#125&#125 &#123&#123r2={r2}&#125&#125|Disadvantage,&#123&#123disadvantage=1&#125&#125 &#123&#123r2={r2}&#125&#125|Roll Twice,&#123&#123always=1&#125&#125 &#123&#123r2={r2}&#125&#125|Super Advantage,&#123&#123advantage=1&#125&#125 &#123&#123r2={r2kh}&#125&#125|Super Disadvantage,&#123&#123disadvantage=1&#125&#125 &#123&#123r2={r2kl}&#125&#125}"
const ROLL20_INITIATIVE_ADVANTAGE_QUERY = "?{Roll Initiative with advantage?|Normal Roll,1d20|Advantage,2d20kh1|Disadvantage,2d20kl1|Super Advantage,3d20kh1|Super Disadvantage,3d20kl1}"
const ROLL20_ADD_GENERIC_DAMAGE_DMG_QUERY = "?{Add %dmgType% damage?|No,0|Yes,%dmg%}"


const chat = document.getElementById("textchat-input");
const txt = chat.getElementsByTagName("textarea")[0];
const btn = chat.getElementsByTagName("button")[0];
const speakingas = document.getElementById("speakingas");
var settings = getDefaultSettings();

function postChatMessage(message, character = null) {
    let set_speakingas = true;
    const old_as = speakingas.value;
    if (character) {
        character = character.toLowerCase().trim();
        for (let i = 0; i < (speakingas.children.length); i++) {
            if (speakingas.children[i].text.toLowerCase().trim() === character) {
                speakingas.children[i].selected = true;
                set_speakingas = false;
                break;
            }
        }
    }
    if (set_speakingas)
        speakingas.children[0].selected = true;
    const old_text = txt.value;
    txt.value = message;
    btn.click();
    txt.value = old_text;
    speakingas.value = old_as;
}

function escapeRoll20Macro(text) {
    const regexp = new RegExp("\n[]{}()%@&?\"\'".split("").join("|\\"), "gm");
    return text.replace(regexp, (...match) => {
        let o = match[0].charCodeAt(0);
        if (o == 10)
            o = 13;
        return "&#" + String(o) + ";";
    });
}

function genRoll(dice, modifiers = {}) {
    dice = dice.replace(/ro<=([0-9]+)/, "ro<$1");
    dice = dice.replace(/(^|\s)+([^\s]+)min([0-9]+)([^\s]*)/g, "$1{$2$4, 0d0 + $3}kh1");
    let roll = "[[" + dice;
    for (let m in modifiers) {
        let mod = modifiers[m].trim();
        if (mod.length > 0) {
            if (m === "CUSTOM")
                mod = mod.replace(/([0-9]*d[0-9]+)/, "$1cs0cf0");
            if (["+", "-", "?", "&"].includes(mod[0])) {
                roll += " " + mod;
            } else {
                roll += "+" + mod;
            }
            if (m.length > 0)
                roll += "[" + m + "]";
        }
    }
    roll += "]]";
    return roll;
}

function subRolls(text, damage_only = false, overrideCB = null) {
    let replaceCB = overrideCB;
    if (!overrideCB) {
        replaceCB = (dice, modifier) => {
            if (damage_only && dice == "")
                return dice + modifier;
            const dice_formula = (dice === "" ? "1d20" : dice) + modifier;
            return genRoll(dice_formula);
        }
    }

    const result = replaceRolls(text, replaceCB);
    return result.replace(/\]\](\s*\+\s*)\[\[/g, '$1')
}

function subDescriptionRolls(request, description) {
    if (!settings["subst-vtt"])
        return description;
    const replaceCB = (dice, modifier) => {
        const roll = (dice == "" ? "1d20" : dice) + modifier;
        const roll_template = template(request, "simple",
            {
                "charname": request.character.name,
                "rname": request.name,
                "mod": dice + modifier,
                "r1": genRoll(roll),
                "normal": 1
            });
        return "[" + dice + modifier + "](!\n" + escapeRoll20Macro(roll_template) + ")";
    }
    return subRolls(description, false, replaceCB);
}

function subDamageRolls(text) {
    return subRolls(text, true);
}

function damagesToRollProperties(damages, damage_types, crits, crit_types) {
    const properties = {
        "damage": 1,
        "dmg1flag": 1
    }

    properties["dmg1"] = subDamageRolls(damages[0]);
    properties["dmg1type"] = damage_types[0];
    if (crits && crits.length > 0)
        properties["crit1"] = settings["crit-prefix"] + subDamageRolls(crits[0]);

    if (damages.length > 1) {
        properties["dmg2flag"] = 1;
        properties["dmg2"] = subDamageRolls(damages.slice(1).join(" | "));
        properties["dmg2type"] = damage_types.slice(1).join(" | ");
        if (crits && crits.length > 1)
            properties["crit2"] = settings["crit-prefix"] + subDamageRolls(crits.slice(1).join(" | "));
    } else if (crits != undefined && crits.length > 1) {
        // If there are more than 1 crit but only 1 damage (brutal critical/savage attacks), then show all the crits as part of the first damage;
        properties["crit1"] = settings["crit-prefix"] + subDamageRolls(crits.join(" | "));
    }

    return properties;
}

function advantageString(advantage, r1) {
    try {
        const format = (str, args) => {
            for (const [key, value] of Object.entries(args))
                str = str.replace(new RegExp(`{${key}}`, "g"), value)
            return str;
        }
        return {
            [RollType.NORMAL]: " {{normal=1}}",
            [RollType.DOUBLE]: " {{always=1}} {{r2=" + r1 + "}}",
            [RollType.THRICE]: " {{always=1}} {{r2=" + r1 + "}} {{r3=" + r1 + "}}",
            [RollType.QUERY]: format(ROLL20_ADVANTAGE_QUERY, { r2: r1, r2kh: r1.replace("1d20", "2d20kh1"), r2kl: r1.replace("1d20", "2d20kl1") }),
            [RollType.ADVANTAGE]: " {{advantage=1}} {{r2=" + r1 + "}}",
            [RollType.DISADVANTAGE]: " {{disadvantage=1}} {{r2=" + r1 + "}}",
            [RollType.SUPER_ADVANTAGE]: " {{advantage=1}} {{r2=" + r1.replace("1d20", "2d20kh1") + "}}",
            [RollType.SUPER_DISADVANTAGE]: " {{disadvantage=1}} {{r2=" + r1.replace("1d20", "2d20kl1") + "}}",
        }[advantage];
    } catch (err) {
        return " {{normal=1}}";
    }
}

function whisperString(whisper) {
    try {
        return {
            [WhisperType.NO]: "",
            [WhisperType.HIDE_NAMES]: "",
            [WhisperType.YES]: "/w gm",
            [WhisperType.QUERY]: ROLL20_WHISPER_QUERY
        }[whisper];
    } catch (err) {
        return "";
    }
}

function template(request, name, properties) {
    let result = whisperString(request.whisper);

    const removeProp = (key) => {
        result = result.replace("{{" + key + "=" + (Object.keys(properties).includes(key) ? properties[key] : "1") + "}}", "");
        result = result.replace("&//123&//123" + key + "=" + (Object.keys(properties).includes(key) ? properties[key] : "1") + "&//125&//125", "");
    }

    result += " &{template:" + name + "}";

    if (request.whisper == WhisperType.HIDE_NAMES) {
        if (properties["charname"])
            properties["charname"] = settings["hidden-monster-replacement"]
        // Take into account links for disabled auto-roll-damages option
        if (properties["rname"])
            properties["rname"] = properties["rname"].includes("](!") ?
                properties["rname"].replace(/\[[^\]]*\]\(\!/, "[???](!") : settings["hidden-monster-replacement"];
        if (properties["rnamec"])
            properties["rnamec"] = properties["rnamec"].includes("](!") ?
                properties["rnamec"].replace(/\[[^\]]*\]\(\!/, "[???](!") : settings["hidden-monster-replacement"];
        delete properties["description"];
    }
    for (let key in properties)
        result += " {{" + key + "=" + properties[key] + "}}";

    if (request.advantage !== undefined && properties.normal === undefined && properties.always === undefined
        && ["simple", "atk", "atkdmg"].includes(name))
        result += advantageString(request.advantage, properties["r1"]);

    // Super advantage/disadvantage is not supported
    properties["r3"] = properties["r1"];
    removeProp("r3");
    delete properties["r3"];

    return result;
}

function format_plus_mod(custom_roll_dice) {
    const prefix = custom_roll_dice && !["+", "-", "?", "&", ""].includes(custom_roll_dice.trim()[0]) ? " + " : "";
    return prefix + (custom_roll_dice || "").replace(/([0-9]*d[0-9]+)/g, "$1cs0cf0");;
}

function createTable(request, name, properties) {
    let result = whisperString(request.whisper);

    result += ` &{template:default} {{name=${name}}}`;
    for (let key in properties)
        result += " {{" + key + "=" + properties[key] + "}}";
    return result;
}

function rollAvatarDisplay(request) {
    // Use query string to override url for image detection so the avatar link is always Roll20.includes(displayed) as an image;
    return "[x](" + request.character.avatar + "#.png)";
}

function rollSkill(request, custom_roll_dice = "") {
    let modifier = request.modifier;
    return template(request, "simple", {
        "charname": request.character.name,
        "rname": request.skill,
        "mod": modifier + format_plus_mod(custom_roll_dice),
        "r1": genRoll(request.d20 || "1d20", { [request.ability]: modifier, "CUSTOM": custom_roll_dice })
    });
}

function rollAbility(request, custom_roll_dice = "") {
    const dice_roll = genRoll(request.d20 || "1d20", { [request.ability]: request.modifier, "CUSTOM": custom_roll_dice });
    return template(request, "simple", {
        "charname": request.character.name,
        "rname": request.name,
        "mod": request.modifier + format_plus_mod(custom_roll_dice),
        "r1": dice_roll
    });
}

function rollSavingThrow(request, custom_roll_dice = "") {
    return template(request, "simple", {
        "charname": request.character.name,
        "rname": request.name + " Save",
        "mod": request.modifier + format_plus_mod(custom_roll_dice),
        "r1": genRoll(request.d20 || "1d20", { [request.ability]: request.modifier, "CUSTOM": custom_roll_dice })
    });
}

function rollInitiative(request, custom_roll_dice = "") {
    const roll_properties = {
        "charname": request.character.name,
        "rname": "Initiative",
        "mod": request.initiative + format_plus_mod(custom_roll_dice)
    }
    if (settings["initiative-tracker"]) {
        let dice = request.d20 || "1d20";
        let r2 = false;
        let indicator = "";
        if (request.advantage == RollType.DOUBLE || request.advantage == RollType.THRICE) {
            r2 = true;
        } else if (request.advantage == RollType.ADVANTAGE) {
            dice = dice.replace("1d20", "2d20kh1");
            indicator = " (Advantage)";
        } else if (request.advantage == RollType.SUPER_ADVANTAGE) {
            dice = dice.replace("1d20", "3d20kh1");
            indicator = " (S Advantage)";
        } else if (request.advantage == RollType.DISADVANTAGE) {
            dice = dice.replace("1d20", "2d20kl1");
            indicator = " (Disadvantage)";
        } else if (request.advantage == RollType.SUPER_DISADVANTAGE) {
            dice = dice.replace("1d20", "3d20kl1");
            indicator = " (S Disadvantage)";
        } else if (request.advantage == RollType.QUERY) {
            dice = ROLL20_INITIATIVE_ADVANTAGE_QUERY;
        }
        roll_properties["r1"] = genRoll(dice, { "INIT": request.initiative, "CUSTOM": custom_roll_dice, "": "&{tracker}"}) + indicator;
        if (r2) {
            roll_properties["r2"] = genRoll(dice, { "INIT": request.initiative, "CUSTOM": custom_roll_dice});
            roll_properties["always"] = 1;
        } else {
            roll_properties["normal"] = 1;
        }
    } else {
        roll_properties["r1"] = genRoll(request.d20 || "1d20", { "INIT": request.initiative, "CUSTOM": custom_roll_dice });
    }
    return template(request, "simple", roll_properties);
}

function rollHitDice(request) {
    const rname = "Hit Dice" + (request.multiclass ? `(${request.class})` : "");
    return template(request, "simple", {
        "charname": request.character.name,
        "rname": rname,
        "mod": request["hit-dice"],
        "r1": subRolls(request["hit-dice"]),
        "normal": 1
    });
}

function rollDeathSave(request, custom_roll_dice = "") {
    return template(request, "simple", {
        "charname": request.character.name,
        "rname": "Death Saving Throw",
        "mod": request.modifier + format_plus_mod(custom_roll_dice),
        "r1": genRoll(request.d20 || "1d20", { "MAGIC": request.modifier, "CUSTOM": custom_roll_dice }),
        "normal": 1
    });
}

function rollItem(request) {
    return rollTrait(request);
}

function rollTrait(request) {
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
    return template(request, "traits", {
        "charname": request.character.name,
        "name": name,
        "source": source,
        "description": subDescriptionRolls(request, request.description)
    });
}

function rollAttack(request, custom_roll_dice = "") {
    const properties = {
        "charname": request.character.name,
        "rname": request.name
    }
    let template_type = "atkdmg";
    let dmg_props = {}
    if (request.rollAttack && request["to-hit"] !== undefined) {
        let d20_roll = request.d20 || "1d20";
        if (request["critical-limit"])
            d20_roll += "cs>" + request["critical-limit"];
        properties["mod"] = request["to-hit"];
        if (custom_roll_dice.length > 0)
            properties["mod"] += " + " + custom_roll_dice;
        properties["r1"] = genRoll(d20_roll, { "": request["to-hit"], "CUSTOM": custom_roll_dice });
        properties["attack"] = 1;
    }
    if (request.damages !== undefined) {
        const damages = request.damages;
        const damage_types = request["damage-types"];
        const crit_damages = request["critical-damages"];
        const crit_damage_types = request["critical-damage-types"];

        dmg_props = damagesToRollProperties(damages, damage_types, crit_damages, crit_damage_types);
    }
    if (request.range !== undefined) {
        properties["range"] = buildRangeString(request);
    }

    if (request["save-dc"] !== undefined) {
        dmg_props["save"] = 1;
        dmg_props["saveattr"] = request["save-ability"];
        dmg_props["savedc"] = request["save-dc"];
    }
    if (request.rollDamage && (!request.rollAttack || request["to-hit"] == undefined)) {
        template_type = "dmg";
        dmg_props["charname"] = request.character.name;
        dmg_props["rname"] = request.name;
        if (request.rollCritical) {
            dmg_props["crit"] = 1;
        }
    }
    if (request.damages && request.damages.length > 0 && 
        request["to-hit"] !== undefined && !request.rollDamage) {
        template_type = "atk";
        dmg_props["charname"] = request.character.name;
        dmg_props["rname"] = request.name;
        dmg_props["crit"] = 1;
        const dmg_template_crit = template(request, "dmg", dmg_props);
        delete dmg_props["crit"];
        delete dmg_props["crit1"];
        delete dmg_props["crit2"];
        const dmg_template = template(request, "dmg", dmg_props);
        properties["rname"] = "[" + request.name + "](!\n" + escapeRoll20Macro(dmg_template) + ")";
        properties["rnamec"] = "[" + request.name + "](!\n" + escapeRoll20Macro(dmg_template_crit) + ")";
    } else {
        for (let key in dmg_props)
            properties[key] = dmg_props[key];
    }

    return template(request, template_type, properties);
}

function rollSpellCard(request) {
    const properties = {
        "charname": request.character.name,
        "name": request.name,
        "castingtime": request["casting-time"],
        "range": buildRangeString(request),
        "duration": request.duration
    }

    if (request["cast-at"] !== undefined)
        properties["level"] = request["level-school"] + " (Cast at " + request["cast-at"] + " Level)";
    else
        properties["level"] = request["level-school"];

    let components = request.components;
    while (components != "") {
        if (components[0] == "V") {
            properties["v"] = 1;
            components = components.slice(1);
        } else if (components[0] == "S") {
            properties["s"] = 1;
            components = components.slice(1);
        } else if (components[0] == "M") {
            properties["m"] = 1;
            properties["material"] = components.slice(2, -1);
            components = "";
        }
        if (components.startsWith(", ")) {
            components = components.slice(2);
        }
    }
    if (request.ritual)
        properties["ritual"] = 1;
    if (request.concentration)
        properties["concentration"] = 1;
    const description = request.description;
    const higher = description.indexOf("At Higher Levels.");
    if (higher > 0) {
        properties["description"] = subDescriptionRolls(request, description.slice(0, higher - 1));
        properties["athigherlevels"] = subDescriptionRolls(request, description.slice(higher + "At Higher Levels.".length));
    } else {
        properties["description"] = subDescriptionRolls(request, description);
    }

    return template(request, "spell", properties);
}

function buildRangeString(request) {
    let range = request.range;
    if (request.aoe) {
        const shape = request['aoe-shape'] || "AoE";
        range += ` (${shape} ${request.aoe})`;
    }
    return range;
}

function rollSpellAttack(request, custom_roll_dice) {
    const properties = {
        "charname": request.character.name,
        "rname": request.name
    }
    let template_type = "atkdmg";
    let dmg_props = {}
    if (request.rollAttack && request["to-hit"] !== undefined) {
        let d20_roll = request.d20 || "1d20";
        if (request["critical-limit"])
            d20_roll += "cs>" + request["critical-limit"];
        properties["mod"] = request["to-hit"];
        if (custom_roll_dice.length > 0)
            properties["mod"] += " + " + custom_roll_dice;
        properties["r1"] = genRoll(d20_roll, { "": request["to-hit"], "CUSTOM": custom_roll_dice });
        properties["attack"] = 1;
    }
    if (request.damages !== undefined) {
        const damages = request.damages;
        const damage_types = request["damage-types"];
        const critical_damages = request["critical-damages"];
        const critical_damage_types = request["critical-damage-types"];
        if (request.name === "Life Transference") {
            const idx = damage_types.indexOf("Healing");
            damages[idx] = "Twice the Necrotic damage";
        } else if (request.name === "Vampiric Touch") {
            const idx = damage_types.indexOf("Healing");
            damages[idx] = "Half the Necrotic damage";
        }
        dmg_props = damagesToRollProperties(damages, damage_types, critical_damages, critical_damage_types);
    }
    if (request.range !== undefined) {
        properties["range"] = buildRangeString(request);
    }
    if (request["save-dc"] != undefined) {
        dmg_props["save"] = 1;
        dmg_props["saveattr"] = request["save-ability"];
        dmg_props["savedc"] = request["save-dc"];
    }
    if (request["cast-at"] !== undefined)
        dmg_props["hldmg"] = genRoll(request["cast-at"][0]) + request["cast-at"].slice(1) + " Level";
    let components = request.components;
    if (settings["components-display"] === "all") {
        if (components != "") {
            properties["desc"] = settings["component-prefix"] + components;
            components = "";
        }
    } else if (settings["components-display"] === "material") {
        while (components != "") {
            if (["V", "S"].includes(components[0])) {
                components = components.slice(1);
                if (components.startsWith(", "))
                    components = components.slice(2);
            }
            if (components[0] == "M") {
                properties["desc"] = settings["component-prefix"] + components.slice(2, -1);
                components = "";
            }
        }
    }
    if (settings["roll20-spell-details-display"] === true) {
		properties["desc"] = properties["desc"] ? properties["desc"] + "\n\n" : "";
		properties["desc"] += `Range/Area: ${request.range}\n\n`;
        properties["desc"] += `Duration: ${request.duration}`;
    }
    if (settings["roll20-spell-description-display"] === true) {
		properties["desc"] = properties["desc"] ? properties["desc"] + "\n\n" : "";
		properties["desc"] += `Description: ${request.description}`;
    }
    if (request.rollDamage && (!request.rollAttack || request["to-hit"] == undefined)) {
        template_type = "dmg";
        dmg_props["charname"] = request.character.name;
        dmg_props["rname"] = request.name;
        if (request.rollCritical) {
            dmg_props["crit"] = 1;
        }
    }
    if (request.damages && request.damages.length > 0 &&
        request["to-hit"] !== undefined && !request.rollDamage) {
        template_type = "atk";
        dmg_props["charname"] = request.character.name;
        dmg_props["rname"] = request.name;
        dmg_props["crit"] = 1;
        const dmg_template_crit = template(request, "dmg", dmg_props);
        delete dmg_props["crit"];
        delete dmg_props["crit1"];
        delete dmg_props["crit2"];
        const dmg_template = template(request, "dmg", dmg_props);
        properties["rname"] = "[" + request.name + "](!\n" + escapeRoll20Macro(dmg_template) + ")";
        properties["rnamec"] = "[" + request.name + "](!\n" + escapeRoll20Macro(dmg_template_crit) + ")";
    } else {
        for (let key in dmg_props)
            properties[key] = dmg_props[key];
    }

    return template(request, template_type, properties);
}

async function rollRollTable(request) {
    const table = new RollTable(request.name, request.formula, request.table);
    const results = await table.roll();
    return createTable(request, `${request.name}: [[${table.total} [${request.formula}]]]`, results);
}

function convertRollToText(whisper, roll, standout=false) {
    if (typeof (roll) === "string")
        return roll;
    const total = roll.total || 0;
    const prefix = (standout && !roll.discarded) ? '{' : '';
    const suffix = (standout && !roll.discarded) ? '}' : '';
    if (whisper === WhisperType.HIDE_NAMES) return `[[${total}]]`;
    const formula = roll.formula || "";
    const parts = roll.parts || [];
    let critfail = "";
    if (roll['critical-success'] || roll['critical-failure'])
        critfail = ` + 1d0cs>${roll['critical-success'] ? '0' : '1'}cf>${roll['critical-failure'] ? '0' : '1'}`
    let result = `${prefix}[[ ${total}${critfail} [${formula}] = `;
    let plus = '';
    for (let part of parts) {
        if (part.rolls) {
            result += `${plus}(`
            let part_plus = '';
            for (let die of part.rolls) {
                result += die.discarded ? `~${part_plus}${die.roll}~` : `${part_plus}${die.roll}`;
                part_plus = ' + ';
            }
            result += ')';
        } else {
            if (['+', '-'].includes(String(part).trim())) {
                plus = ` ${part} `;
            } else {
                part = isNaN(part) ? part : Number(part);
                if (part < 0) {
                    part = -1 * part;
                    plus = ' - ';
                }
                result += `${plus}${part}`;
            }
        }
        plus = ' + ';
    }
    result += `]]${suffix}`;
    return result;
};

function displayExtraInfo(request) {
    let extra = "";
    if (request["mastery"]) {
        extra += "Mastery: " + request["mastery"] + "\n";
    }
    if (Array.isArray(request["effects"]) && request["effects"].length > 0) {
        extra += "Effects: " + request["effects"].join(", ") + "\n";
    }
    if (extra != "") {
        return "\n" + template(request, "desc", { desc: extra });
    }
    return "";
}

async function handleRoll(request) {
    let custom_roll_dice = "";
    if (request.character.type == "Character" ||
        (request.character.type == "Creature" && request.character.creatureType === "Wild Shape")) {
        custom_roll_dice = request.character.settings["custom-roll-dice"] || "";
    }
    if (request.type == "skill") {
        roll = rollSkill(request, custom_roll_dice);
    } else if (request.type == "ability") {
        roll = rollAbility(request, custom_roll_dice);
    } else if (request.type == "saving-throw") {
        roll = rollSavingThrow(request, custom_roll_dice);
    } else if (request.type == "initiative") {
        roll = rollInitiative(request, custom_roll_dice);
    } else if (request.type == "hit-dice") {
        roll = rollHitDice(request);
    } else if (request.type == "item") {
        roll = rollItem(request);
    } else if (request.type === "trait") {
        roll = rollTrait(request);
    } else if (request.type == "death-save") {
        roll = rollDeathSave(request, custom_roll_dice);
    } else if (request.type == "attack") {
        roll = rollAttack(request, custom_roll_dice);
    } else if (request.type == "spell-card") {
        roll = rollSpellCard(request);
    } else if (request.type == "spell-attack") {
        roll = rollSpellAttack(request, custom_roll_dice);
    } else if (request.type == "chat-message") {
        roll = request.message;
    } else if (request.type == "roll-table") {
        roll = await rollRollTable(request);
    } else if (request.type == "avatar") {
        roll = rollAvatarDisplay(request);
        // Always hide monster name if whispering
        if (request.whisper !== WhisperType.NO) {
            request.whisper = WhisperType.HIDE_NAMES;
        }
    } else {
        // 'custom' || anything unexpected;
        const mod = request.modifier != undefined ? request.modifier : request.roll;
        const rname = request.name != undefined ? request.name : request.type;
        roll = template(request, "simple", {
            "charname": request.character.name,
            "rname": rname,
            "mod": mod,
            "r1": subRolls(request.roll),
            "normal": 1
        });
    }
    roll += displayExtraInfo(request);
    const character_name = request.whisper == WhisperType.HIDE_NAMES ? settings["hidden-monster-replacement"] : request.character.name;
    postChatMessage(roll, character_name);
}

async function hookRollDamages(rollDamages, request) {
    const originalRequest = request.request;
    let a = null;
    let timeout = 50;
    while (timeout > 0) {
        a = $(`a[href='!${rollDamages}']`);
        // Yeay for crappy code.
        // Wait until the link appears in chat
        if (a.length > 0)
            break;
        a = null;
        await new Promise(r => setTimeout(r, 500));
        timeout--;
    }
    if (a) {
        a.attr("href", "!");
        a.click(ev => {
            originalRequest.rollAttack = false;
            originalRequest.rollDamage = true;
            originalRequest.rollCritical = request.attack_rolls.some(r => !r.discarded && r["critical-success"])
            roll_renderer.handleRollRequest(originalRequest);
        });
    }
}

async function handleOGLRenderedRoll(request) {
    if (request.attack_rolls.length === 0 && request.damage_rolls.length === 0) {
        return handleRoll(request.request);
    }
    const originalRequest = request.request;
    let message = ""
    let rollDamages = null;
    let atkType = "simple";
    const atk_props = {
        "charname": request.character,
        "rname": request.title
    };
    if (request.attack_rolls.length > 1) {
        atk_props["r1"] = convertRollToText(request.whisper, request.attack_rolls[0]);
        atk_props["r2"] = request.attack_rolls.slice(1).map(roll => convertRollToText(request.whisper, roll)).join(" | ")
        if (request.attack_rolls.length === 2 && request.request.advantage === RollType.ADVANTAGE) atk_props["advantage"] = "1";
        else if (request.attack_rolls.length === 2 && request.request.advantage === RollType.DISADVANTAGE) atk_props["disadvantage"] = "1";
        else atk_props["always"] = "1";
        atk_props["attack"] = "1"
    } else if (request.attack_rolls.length > 0) {
        atk_props["r1"] = convertRollToText(request.whisper, request.attack_rolls[0]);
        atk_props["normal"]  = "1";
        atk_props["attack"] = "1"
    }
    if (originalRequest.type === "initiative" && settings["initiative-tracker"]) {
        const initiative = request.attack_rolls.find((roll) => !roll.discarded);
        if (initiative)
            atk_props["initiative"] = `[[${initiative.total} &{tracker}]]`;
    }
    if (originalRequest.damages && originalRequest.damages.length > 0 &&
        originalRequest.rollAttack && !originalRequest.rollDamage) {
        rollDamages = `beyond20-rendered-roll-button-${Math.random()}`;
        atk_props["rname"]  = `[${request.title}](!${rollDamages})`;
    }

    if (originalRequest.range !== undefined) {
        atk_props["range"] = buildRangeString(originalRequest);
        atkType = "atkdmg";
    }

    if (originalRequest["save-dc"] !== undefined) {
        atk_props["save"] = 1;
        atk_props["saveattr"] = originalRequest["save-ability"];
        atk_props["savedc"] = originalRequest["save-dc"];
        atkType = "atkdmg";
    }
    if (originalRequest["cast-at"] !== undefined) {
        atk_props["hldmg"] = genRoll(originalRequest["cast-at"][0]) + originalRequest["cast-at"].slice(1) + " Level";
        atkType = "atkdmg";
    }
    let components = originalRequest.components || "";
    if (components != "")
        atkType = "atkdmg";
    if (settings["components-display"] === "all") {
        if (components != "") {
            atk_props["desc"] = settings["component-prefix"] + components;
            components = "";
        }
    } else if (settings["components-display"] === "material") {
        while (components != "") {
            if (["V", "S"].includes(components[0])) {
                components = components.slice(1);
                if (components.startsWith(", "))
                    components = components.slice(2);
            }
            if (components[0] == "M") {
                atk_props["desc"] = settings["component-prefix"] + components.slice(2, -1);
                components = "";
            }
        }
    }
    if (request.damage_rolls.length > 0) {
        atkType = "atkdmg";
        atk_props["damage"] = "1";
        atk_props["dmg1flag"] = "1";
        atk_props["dmg1"] = convertRollToText(request.whisper, request.damage_rolls[0][1]);
        atk_props["dmg1type"] = request.damage_rolls[0][0];
    };
    if (request.damage_rolls.length > 1) {
        atk_props["dmg2flag"] = "1";
        atk_props["dmg2"] = convertRollToText(request.whisper, request.damage_rolls[1][1]);
        atk_props["dmg2type"] = request.damage_rolls[1][0];
    }
    atk_props["mod"] = (originalRequest["to-hit"] || "").trim();
    // If we have a character-related roll, then add custom roll modfier to the mod display
    if (originalRequest.character && originalRequest.character.type === "Character") {
        const custom_roll_dice = (originalRequest.character.settings["custom-roll-dice"] || "").trim();
        if (custom_roll_dice.length > 0) {
            atk_props["mod"] += " + " + custom_roll_dice;
        }
    }

    message += template(request, atkType, atk_props) + "\n";

    let damages = request.damage_rolls.slice(2)
    while (damages.length > 0) {
        const dmg_props = {
            "damage": "1",
            "dmg1flag": "1",
            "dmg1": convertRollToText(request.whisper, damages[0][1]),
            "dmg1type": damages[0][0]
        };
        damages = damages.slice(1);
        if (damages.length > 0) {
            dmg_props["dmg2flag"] = "1";
            dmg_props["dmg2"] = convertRollToText(request.whisper, damages[0][1]);
            dmg_props["dmg2type"] = damages[0][0];
            damages = damages.slice(1);
        }
        message += template(request, "dmg", dmg_props) + "\n";
    }
    let totals = Object.entries(request.total_damages)
    while (totals.length > 0) {
        const dmg_props = {
            "damage": "1",
            "dmg1flag": "1",
            "dmg1": convertRollToText(request.whisper, totals[0][1]),
            "dmg1type": `Total ${totals[0][0]}`
        };
        if (totals.length === Object.entries(request.total_damages).length)
            dmg_props["desc"] = "Totals"
        totals = totals.slice(1);
        if (totals.length > 0) {
            dmg_props["dmg2flag"] = "1"
            dmg_props["dmg2"] = convertRollToText(request.whisper, totals[0][1])
            dmg_props["dmg2type"] = `Total ${totals[0][0]}`;
            totals = totals.slice(1);
        }
        message += template(request, "dmg", dmg_props) + "\n";
    }
    message += displayExtraInfo(originalRequest);
    postChatMessage(message, request.character);

    if (rollDamages) {
        hookRollDamages(rollDamages, request);
    }
}

async function handleRenderedRoll(request) {
    const isOGL = $("#isOGL").val() === "1";
    if (isOGL && (settings["roll20-template"] === "roll20" ||
        settings["roll20-template"] === "beyond20")) {
        return handleOGLRenderedRoll(request);
    }
    
    if (["chat-message", "avatar"].includes(request.request.type)) {
        return handleRoll(request.request);
    }
    const properties = {};
    if (request.source)
        properties.source = request.source;
    if (Object.keys(request.attributes).length) {
        for (let attr in request.attributes)
            request[attr] = request.attributes[attr];
    }
    if (request.open)
        properties.description = request.description;

    for (let [name, value] of request.roll_info)
        properties[name] = value;

    let title = request.character;
    if (request.attack_rolls.length > 0) {
        properties[request.title] = request.attack_rolls.map(roll => convertRollToText(request.whisper, roll, true)).join(" | ")
    } else {
        title = `${request.title} (${request.character})`
    }
    for (let [roll_name, roll, flags] of request.damage_rolls) {
        if (properties[roll_name] === undefined) {
            properties[roll_name] = convertRollToText(request.whisper, roll);
        } else {
            // Could have multiple damages of the same type.
            let suffix = 2;
            while (properties[`${roll_name} (${suffix})`] !== undefined) suffix++;
            properties[`${roll_name} (${suffix})`] = convertRollToText(request.whisper, roll);
        }
    }
    if (Object.keys(request.total_damages).length > 0)
        properties["Totals"] = "";

    for (let [key, roll] of Object.entries(request.total_damages))
        properties["Total " + key] = convertRollToText(request.whisper, roll);

    let rollDamages = null;
    const originalRequest = request.request;
    if (originalRequest.damages && originalRequest.damages.length > 0 &&
        originalRequest.rollAttack && !originalRequest.rollDamage) {
        rollDamages = `beyond20-rendered-roll-button-${Math.random()}`;
        properties["Roll Damages"] = `[Click](!${rollDamages})`;
    }
    let message = createTable(request, title, properties);
    if (originalRequest.type === "initiative" && settings["initiative-tracker"]) {
        const initiative = request.attack_rolls.find((roll) => !roll.discarded);
        if (initiative)
            message += `  [[${initiative.total} &{tracker}]]`;
    }
    postChatMessage(message, request.character);
    if (rollDamages) {
        hookRollDamages(rollDamages, request);
    }
}

function injectSettingsButton() {
    const icon = chrome.runtime.getURL("images/icons/icon32.png");
    let img = document.getElementById("beyond20-settings");
    if (img)
        img.remove();
    img = E.img({ id: "beyond20-settings", src: icon, style: "margin-left: 5px;" });
    btn.after(img);
    img.onclick = alertQuickSettings;
}

function updateSettings(new_settings = null) {
    if (new_settings) {
        settings = new_settings;
        roll_renderer.setSettings(settings);
    } else {
        getStoredSettings((saved_settings) => {
            updateSettings(saved_settings);
        });
    }
}

function handleMessage(request, sender, sendResponse) {
    console.log("Got message : ", request);
    if (request.action == "settings") {
        if (request.type == "general")
            updateSettings(request.settings);
    } else if (request.action == "open-options") {
        alertFullSettings();
    } else if (request.action == "hp-update") {
        if (settings["update-hp"])
            sendCustomEvent("UpdateHP", [request.character.name, request.character.hp, request.character["max-hp"], request.character["temp-hp"]]);
    } else if (request.action == "conditions-update") {
        if (settings["display-conditions"]) {
            const character_name = request.character.name;
            if (request.character.exhaustion == 0) {
                conditions = request.character.conditions;
            } else {
                conditions = request.character.conditions.concat([`Exhausted (Level ${request.character.exhaustion})`]);
            }

            // We can't use window.is_gm because it's not available to the content script
            const is_gm = $("#textchat .message.system").text().includes("The player link for this campaign is");
            let em_command = `/emas "${character_name}" `;
            if (!is_gm) {
                // Add character name only if we can't speak as them
                const availableAs = Array.from(speakingas.children).map(c => c.text.toLowerCase())
                if (availableAs.includes(character_name.toLowerCase()))
                    em_command = "/em ";
                else
                    em_command = `/em | ${character_name} `;
            }
            let message = "";
            if (conditions.length == 0) {
                message = em_command + "has no active conditions";
            } else {
                message = em_command + "is: " + conditions.join(", ");
            }
            postChatMessage(message, character_name);
        }
    } else if (request.action == "roll") {
        const isOGL = $("#isOGL").val() === "1";
        if (settings["roll20-template"] === "default" ||
            settings["roll20-template"] === "beyond20" ||
            !isOGL) {
            return roll_renderer.handleRollRequest(request);
        }
        if (request.type == "avatar") {
            roll_renderer.displayAvatarToDiscord(request);
        }    
        handleRoll(request);
    } else if (request.action == "rendered-roll") {
        handleRenderedRoll(request);
    } else if (request.action === "update-combat") {
        sendCustomEvent("CombatTracker", [request.combat, settings]);
    }
}

chrome.runtime.onMessage.addListener(handleMessage);

updateSettings();
chrome.runtime.sendMessage({ "action": "activate-icon" });
sendCustomEvent("disconnect");
injectPageScript(chrome.runtime.getURL('dist/roll20_script.js'));
injectSettingsButton();
initializeAlertify();
