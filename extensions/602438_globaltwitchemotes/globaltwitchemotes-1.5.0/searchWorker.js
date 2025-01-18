(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var filterMode;
var filteredEmotesCount;
var filteredEmotes = {
    twitch: [],
    bttv: [],
    ffz: [],
    seventv: []
};

function initialize(mode, emotes) {
    filterMode = mode;
    filteredEmotesCount = emotes.length;

    for (var i = 0; i < emotes.length; ++i) {
        if (emotes[i].set === 'Twitch.tv') {
            filteredEmotes.twitch.push(emotes[i]);
        } else if (emotes[i].set === 'BetterTTV') {
            filteredEmotes.bttv.push(emotes[i]);
        } else if (emotes[i].set === 'FrankerFaceZ') {
            filteredEmotes.ffz.push(emotes[i]);
        } else if (emotes[i].set === '7TV') {
            filteredEmotes.seventv.push(emotes[i]);
        } else {
            console.error('Unrecognized emote filter set "' + emotes[i].set + '".');
        }
    }
}

function isEmoteAllowed(set, emote) {
    var result = true;

    if (filteredEmotesCount > 0) {
        var matchingRule = getMatchingFilterRule(set, emote);

        result = matchingRule === null;

        if (filterMode === 'Whitelist') {
            result = !result;
        }
    }

    return result;
}

function getMatchingFilterRule(set, emote) {
    var potentialRules = getMatchingFilterSet(set);
    var rule = null;

    for (var i = 0; i < potentialRules.length; ++i) {
        var currentRule = potentialRules[i];

        if (currentRule.value === emote) {
            rule = currentRule;
            break;
        }
    }

    return rule;
}

function getMatchingFilterSet(emoteSet) {
    var result = filteredEmotes.twitch;

    if (emoteSet.indexOf('bttv') === 0) {
        result = filteredEmotes.bttv;
    } else if (emoteSet.indexOf('ffz') === 0) {
        result = filteredEmotes.ffz;
    } else if (emoteSet.indexOf('seventv') === 0) {
        result = filteredEmotes.seventv;
    }

    return result;
}


module.exports = {
    initialize: initialize,
    isEmoteAllowed: isEmoteAllowed
};
},{}],2:[function(require,module,exports){
var emoteFilter = require('./emoteFilter');


const STRING_SEPARATOR = /([\w]|[:;)(\\\/<>73#\|\]])+/g;
const TWITCH_TV_MATCHING_REGEX = /\btwitch\.tv/i;

var emoteLibrary = {};


onmessage = function(event) {
    handleMessage(event.data);
};

function handleMessage(message) {
    if (message.header === 'settings') {
        emoteFilter.initialize(message.payload.emoteFilterMode, message.payload.emoteFilterList);
    } else if (message.header === 'emotes') {
        emoteLibrary = message.payload;
    } else if (message.header === 'search') {
        postMessage({
            header: 'searchResults',
            payload: {
                searchID: message.payload.searchID,
                results: searchForEmotes(message.payload.text, TWITCH_TV_MATCHING_REGEX.test(message.payload.hostname) === false)
            }
        });
    }
}

function searchForEmotes(text, allowSubscriberEmotes) {
    var nextWord;
    var foundEmotes = [];

    // Reset the regex
    STRING_SEPARATOR.lastIndex = 0;

    while ((nextWord = STRING_SEPARATOR.exec(text)) !== null) {
        var emote = nextWord[0];

        for (var set in emoteLibrary) {
            if (emoteLibrary.hasOwnProperty(set)) {
                // Do not render subscriber emoticons on Twitch.tv
                if (set.indexOf('twitchChannels') !== -1 && allowSubscriberEmotes === false) {
                    continue;
                }

                var emotes = emoteLibrary[set].emotes;

                if (emotes.hasOwnProperty(emote)) {
                    var emoteData = emotes[emote];

                    if (emoteFilter.isEmoteAllowed(set, emote) === true) {
                        foundEmotes.push({
                            index: nextWord.index,
                            emote: emote,
                            url: emoteData.url,
                            emoji: emoteData.emoji,
                            channel: emoteData.channel
                        });

                        break;
                    }
                }
            }
        }
    }

    return foundEmotes;
}
},{"./emoteFilter":1}]},{},[2]);
true;