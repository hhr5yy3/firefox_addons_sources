var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/*! ***************************************************************************
Copyright (c) Ambrose A. Nilam. All rights reserved.
******************************************************************************* */
var Configuration;
(function (Configuration) {
    var QUIZZARD_GOLD_DONATION_URL = 'https://www.quizzardapp.com/api/v2/extension/donation';
    Configuration.DEFAULT_CLIENT_ID = -1;
    Configuration.DEFAULT_STATE = { question: '', answers: [], isLoading: false, noResults: false };
    Configuration.DEFAULT_THEMES = [
        {
            name: 'Red',
            primaryColor: '#FD6B6B',
            secondaryColor: '#EE5253',
            isDefault: false
        },
        {
            name: 'Orange',
            primaryColor: '#FE9F43',
            secondaryColor: '#FF8B1C',
            isDefault: false
        },
        {
            name: 'Green',
            primaryColor: '#21D1A1',
            secondaryColor: '#19AC84',
            isDefault: false
        },
        {
            name: 'Blue',
            primaryColor: '#54A0FC',
            secondaryColor: '#2E86DE',
            isDefault: true
        },
        {
            name: 'Pink',
            primaryColor: '#FE9FF3',
            secondaryColor: '#F368DF',
            isDefault: false
        },
        {
            name: 'Black',
            primaryColor: '#576574',
            secondaryColor: '#222E3E',
            isDefault: false
        },
        {
            name: 'Purple',
            primaryColor: '#5F27CD',
            secondaryColor: '#2E1D8C',
            isDefault: false
        },
        {
            name: 'Brown',
            primaryColor: '#B76D24',
            secondaryColor: '#914F0F',
            isDefault: false
        }
    ];
    Configuration.DEFAULT_PROMOTIONS = [
        { id: 1, header: 'Want to keep using Quizzard?', body: 'Please consider donating to keep Quizzard online and free of charge for everyone!', url: QUIZZARD_GOLD_DONATION_URL, weight: 1 }
    ];
    Configuration.DEFAULT_SEARCH_CONFIG = {
        definitions: [
            "\"definition\":\"((?:\\\\*.|[^\"\\\\])*)",
            "\\\"definition\\\":\\\"((?:\\\\\\*.|[^\"\\\\])*)\\"
        ],
        words: [
            "\"word\":\"((?:\\\\*.|[^\"\\\\])*)",
            "\\\"word\\\":\\\"((?:\\\\\\*.|[^\"\\\\])*)\\"
        ]
    };
})(Configuration || (Configuration = {}));
var Quizzard;
(function (Quizzard) {
    var searchConfigToRegex = function (searchConfig) {
        return {
            definitions: searchConfig.definitions.map(function (definition) { return new RegExp(definition, 'g'); }),
            words: searchConfig.words.map(function (word) { return new RegExp(word, 'g'); })
        };
    };
    var QuizzardSearch = (function () {
        function QuizzardSearch() {
        }
        QuizzardSearch.search = function (searchSettings, onResult) {
            return __awaiter(this, void 0, void 0, function () {
                var promises, searchConfig, googleAPIResult, googleResults, questionLowerCase, i, googleResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (QuizzardSearch.isValidSearchSettings(searchSettings) === false) {
                                return [2, Promise.reject('Invalid Arguments -> typeof <SearchSettings> not provided')];
                            }
                            promises = [];
                            searchConfig = searchConfigToRegex(searchSettings.searchConfig);
                            return [4, QuizzardSearch.searchGoogleWeb(searchSettings.question, searchSettings.goldSearchURL)];
                        case 1:
                            googleAPIResult = _a.sent();
                            googleResults = (googleAPIResult === null || googleAPIResult === void 0 ? void 0 : googleAPIResult.items) || undefined;
                            questionLowerCase = searchSettings.question.toLowerCase();
                            if (googleResults === undefined && Array.isArray(googleResults) === false) {
                                return [2, Promise.reject('Invalid response from the server ... Please re-install the application and try again')];
                            }
                            for (i = 0; i < googleResults.length; i++) {
                                googleResult = googleResults[i];
                                if (googleResult === undefined) {
                                    continue;
                                }
                                promises.push(QuizzardSearch.parseQuizletPage(googleResult.link, questionLowerCase, searchSettings.confidenceThreshold, searchConfig, onResult));
                            }
                            if (QuizzardSearch.QuizletCacheResetTimeout !== undefined) {
                                clearTimeout(QuizzardSearch.QuizletCacheResetTimeout);
                            }
                            QuizzardSearch.QuizletCacheResetTimeout = setTimeout(function () {
                                QuizzardSearch.QuizletStudySetCache.clear();
                            }, 60000 * 3);
                            return [4, Promise.all(promises)];
                        case 2:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        QuizzardSearch.searchGoogleWeb = function (question, goldSearchURL) {
            return __awaiter(this, void 0, void 0, function () {
                var questionSplit, quizletPages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (goldSearchURL !== undefined) {
                                return [2, QuizzardSearch.searchGold(question, goldSearchURL)];
                            }
                            questionSplit = question.split(' ').join('+');
                            return [4, Promise.all([
                                    QuizzardSearch.parseGoogleSearchResultsPage("https://www.google.com/search?hl=en&as_q=quizlet&as_epq=".concat(questionSplit, "&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=lang_en&cr=&as_qdr=all&as_sitesearch=quizlet.com&as_occt=any&safe=images&as_filetype=&tbs=")),
                                    QuizzardSearch.parseGoogleSearchResultsPage("https://www.google.com/search?hl=en&as_q=quizlet+".concat(questionSplit, "&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=lang_en&cr=&as_qdr=all&as_sitesearch=quizlet.com&as_occt=any&safe=images&as_filetype=&tbs="))
                                ])];
                        case 1:
                            quizletPages = (_a.sent());
                            return [2, { items: __spreadArray(__spreadArray([], quizletPages[0].items, true), quizletPages[1].items, true) }];
                    }
                });
            });
        };
        QuizzardSearch.searchGold = function (question, goldSearchURL) {
            return __awaiter(this, void 0, void 0, function () {
                var response, _a, responseContent, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            response = undefined;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4, fetch("".concat(goldSearchURL, "?question=").concat(question), { method: 'GET', credentials: 'include' })];
                        case 2:
                            response = _c.sent();
                            return [3, 4];
                        case 3:
                            _a = _c.sent();
                            return [3, 4];
                        case 4:
                            if (response === undefined || response.ok === false) {
                                return [2, { items: [] }];
                            }
                            responseContent = undefined;
                            _c.label = 5;
                        case 5:
                            _c.trys.push([5, 7, , 8]);
                            return [4, response.json()];
                        case 6:
                            responseContent = _c.sent();
                            return [3, 8];
                        case 7:
                            _b = _c.sent();
                            return [3, 8];
                        case 8:
                            if (responseContent === undefined) {
                                return [2, { items: [] }];
                            }
                            return [2, responseContent];
                    }
                });
            });
        };
        QuizzardSearch.parseGoogleSearchResultsPage = function (searchURL) {
            return __awaiter(this, void 0, void 0, function () {
                var response, html, filteredHTML, matches, refinedMatches, substringStartIndex, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, fetch(searchURL, { method: 'GET' })];
                        case 1:
                            response = _a.sent();
                            if (response.ok === false) {
                                if (response.status === 429) {
                                    return [2, Promise.reject(response.url)];
                                }
                            }
                            return [4, response.text()];
                        case 2:
                            html = _a.sent();
                            if (html === undefined || html === null) {
                                return [2, Promise.reject(response.url)];
                            }
                            filteredHTML = html.match(/href="([^\'\"]+)/g);
                            if (filteredHTML === null) {
                                return [2, Promise.reject(response.url)];
                            }
                            matches = filteredHTML.filter(function (item) { return /(href="https:\/\/quizlet.com)(.*)-flash-cards\//.test(item) === true; });
                            if (matches.length === 0) {
                                return [2, { items: [] }];
                            }
                            refinedMatches = [];
                            substringStartIndex = matches[0].indexOf('https');
                            for (i = 0; i < matches.length; i++) {
                                refinedMatches.push({ link: matches[i].substring(substringStartIndex) });
                            }
                            return [2, { items: refinedMatches }];
                    }
                });
            });
        };
        QuizzardSearch.parseQuizletPage = function (url, question, confidenceThreshold, searchConfig, onResult) {
            return __awaiter(this, void 0, void 0, function () {
                var quizletResult, termKeys, highestConfidence, quizletSet, j, termSet, questionData, questionFromSet, answerFromSet, confidence, isSwapped, tempQuestion, answer, quizletQuestionData, answerTrimmed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, QuizzardSearch.getQuizletStudySetFromURLOrCache(url, searchConfig)];
                        case 1:
                            quizletResult = _a.sent();
                            if (quizletResult === undefined) {
                                return [2, Promise.resolve()];
                            }
                            termKeys = Object.keys(quizletResult.termIdToTermsMap);
                            highestConfidence = 0;
                            quizletSet = undefined;
                            for (j = 0; j < termKeys.length; j++) {
                                termSet = quizletResult.termIdToTermsMap[termKeys[j]];
                                questionData = termSet.word.replace(/(\\)+n/g, '\n').split('\n');
                                if (questionData === undefined || questionData.length === 0) {
                                    continue;
                                }
                                questionFromSet = questionData[0].toLowerCase();
                                answerFromSet = termSet.definition.toLowerCase();
                                confidence = QuizzardSearch.compareTwoStrings(question, questionFromSet);
                                isSwapped = false;
                                if (confidence < confidenceThreshold) {
                                    confidence = QuizzardSearch.compareTwoStrings(question, answerFromSet);
                                    if (confidence < confidenceThreshold) {
                                        continue;
                                    }
                                    tempQuestion = questionData[0];
                                    questionFromSet = termSet.definition;
                                    answerFromSet = tempQuestion;
                                    isSwapped = true;
                                }
                                if (confidence >= highestConfidence) {
                                    answer = answerFromSet;
                                    highestConfidence = confidence;
                                    if (isSwapped === false) {
                                        answer = termSet.definition;
                                        quizletQuestionData = QuizzardSearch.parseQuizletQuestion(questionData);
                                        if (quizletQuestionData.multipleChoiceAnswersMap !== undefined) {
                                            answer = QuizzardSearch.getAnswerFromMultipleChoiceMapping(answerFromSet, quizletQuestionData.multipleChoiceAnswersMap);
                                        }
                                    }
                                    answerTrimmed = answer.replace(/\\\"/g, '\"').replace(/(\\)+n/g, '\n\n');
                                    quizletSet = { question: questionFromSet, answer: answerTrimmed, url: url, confidence: confidence };
                                }
                            }
                            if (quizletSet === undefined || (quizletSet === null || quizletSet === void 0 ? void 0 : quizletSet.answer) === undefined) {
                                return [2, Promise.resolve()];
                            }
                            if (onResult !== undefined && onResult !== null) {
                                onResult(quizletSet);
                            }
                            return [2];
                    }
                });
            });
        };
        QuizzardSearch.getQuizletStudySetFromURLOrCache = function (url, searchConfig) {
            return __awaiter(this, void 0, void 0, function () {
                var quizletStudySet, html, ignore_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (QuizzardSearch.QuizletStudySetCache.has(url) === true) {
                                return [2, Promise.resolve(QuizzardSearch.QuizletStudySetCache.get(url))];
                            }
                            quizletStudySet = undefined;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, QuizzardSearch.requestPageContents(url)];
                        case 2:
                            html = _a.sent();
                            quizletStudySet = QuizzardSearch.getQuizletQuestionSetFromRawHTML(html, searchConfig);
                            if (quizletStudySet === undefined) {
                                quizletStudySet = QuizzardSearch.getQuizletQuestionSetFromRawHTMLScript(html);
                            }
                            if (quizletStudySet !== undefined) {
                                QuizzardSearch.addStudySetToCacheIfNotExists(url, quizletStudySet);
                            }
                            return [3, 4];
                        case 3:
                            ignore_1 = _a.sent();
                            return [3, 4];
                        case 4: return [2, Promise.resolve(quizletStudySet)];
                    }
                });
            });
        };
        QuizzardSearch.getQuizletQuestionSetFromRawHTMLScript = function (html) {
            var quizletStudySet = undefined;
            try {
                var startTag = '<script id="__NEXT_DATA__" type="application/json">';
                var endTag = '</script>';
                var startIndex = html.indexOf(startTag) + startTag.length;
                var endIndex = html.indexOf(endTag, startIndex);
                var contents = html.slice(startIndex, endIndex);
                var initalJSON = JSON.parse(contents.trim());
                var nextJSON = JSON.parse(initalJSON.props.pageProps.dehydratedReduxStateKey);
                var setItems = nextJSON.studyModesCommon.studiableData.studiableItems;
                var studySet = {};
                var i = void 0;
                for (i = 0; i < setItems.length; i++) {
                    studySet["".concat(i)] = {
                        word: setItems[i].cardSides[0].media[0].plainText,
                        definition: setItems[i].cardSides[1].media[0].plainText
                    };
                }
                if (i > 0) {
                    quizletStudySet = { termIdToTermsMap: studySet };
                }
            }
            catch (error) { }
            return quizletStudySet;
        };
        QuizzardSearch.getQuizletQuestionSetFromRawHTML = function (html, searchConfig) {
            var searchText = 'termIdToTermsMap';
            var pageDataStartIndex = html.indexOf(searchText) - 2;
            if (pageDataStartIndex === -1) {
                return undefined;
            }
            var jsonString = '';
            for (var i = pageDataStartIndex; i < html.length; i++) {
                jsonString += html[i];
                if (html[i] === '}' && html[i + 1] === '}' && html[i + 2] === ',') {
                    jsonString += "}}";
                    break;
                }
            }
            var quizletResult;
            try {
                var words = QuizzardSearch.parseFromQuizletPage(jsonString, 'word', searchConfig);
                var definitions = QuizzardSearch.parseFromQuizletPage(jsonString, 'definition', searchConfig);
                var termIdToTermsMap = {};
                var i = void 0;
                for (i = 0; i < words.length; i++) {
                    termIdToTermsMap[i.toString()] = { word: words[i], definition: definitions[i] };
                }
                if (i > 0) {
                    quizletResult = { termIdToTermsMap: termIdToTermsMap };
                }
            }
            catch (error) { }
            return quizletResult;
        };
        QuizzardSearch.parseFromQuizletPage = function (jsonStringFromHTML, type, searchConfig) {
            var regexArray = searchConfig.definitions;
            if (type === 'word') {
                regexArray = searchConfig.words;
            }
            var matches = [];
            var regExpExecArray;
            for (var i = 0; i < regexArray.length; i++) {
                var regex = regexArray[i];
                regExpExecArray = regex.exec(jsonStringFromHTML);
                while (regExpExecArray !== null) {
                    if (regExpExecArray.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    regExpExecArray.forEach(function (match, groupIndex) {
                        if (groupIndex === 1) {
                            matches.push(match);
                        }
                    });
                    regExpExecArray = regex.exec(jsonStringFromHTML);
                }
                if (matches.length > 0) {
                    break;
                }
            }
            return matches;
        };
        QuizzardSearch.requestPageContents = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var response, retryCounter, _a, _b, responseData;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4, fetch(url, QuizzardSearch.RequestConfig)];
                        case 1:
                            response = _c.sent();
                            retryCounter = 0;
                            _c.label = 2;
                        case 2:
                            if (!(response.ok === false)) return [3, 7];
                            if (!(retryCounter >= 5)) return [3, 4];
                            _b = (_a = Promise).reject;
                            return [4, response.text()];
                        case 3: return [2, _b.apply(_a, [(_c.sent()) || 'An unknown error occurred! Please try again shortly ...'])];
                        case 4: return [4, fetch(url, QuizzardSearch.RequestConfig)];
                        case 5:
                            response = _c.sent();
                            if (response.status === 410) {
                                return [2, Promise.reject()];
                            }
                            if (response.ok === true) {
                                return [3, 7];
                            }
                            return [4, QuizzardSearch.sleep(500)];
                        case 6:
                            _c.sent();
                            retryCounter++;
                            return [3, 2];
                        case 7: return [4, response.text()];
                        case 8:
                            responseData = _c.sent();
                            return [2, Promise.resolve(responseData)];
                    }
                });
            });
        };
        QuizzardSearch.parseQuizletQuestion = function (questionData) {
            if (questionData.length < 3) {
                return { question: questionData[0], multipleChoiceAnswersMap: undefined };
            }
            var multipleChoiceAnswersMaps = new Map();
            for (var i = 1; i < questionData.length; i++) {
                var regexTest = /([a-zA-Z](\.|\))|[1-9](\.|\))) (.*)/;
                if (regexTest.test(questionData[i]) === true) {
                    var letterAnswer = questionData[i][0].toLowerCase();
                    var answer = questionData[i].substring(questionData[i].indexOf(' ') + 1);
                    multipleChoiceAnswersMaps.set(letterAnswer, answer);
                }
            }
            if (multipleChoiceAnswersMaps.size === 0) {
                return { question: questionData[0], multipleChoiceAnswersMap: undefined };
            }
            return { question: questionData[0], multipleChoiceAnswersMap: multipleChoiceAnswersMaps };
        };
        QuizzardSearch.getAnswerFromMultipleChoiceMapping = function (answer, multipleChoiceAnswersMap) {
            var _a, _b;
            if (answer.length === 0) {
                return answer;
            }
            if (answer.length === 1) {
                return (_a = multipleChoiceAnswersMap.get(answer.toLowerCase())) !== null && _a !== void 0 ? _a : answer;
            }
            var answerLetter = answer.match(/^(.*): ([a-gA-G])/);
            if (answerLetter !== null) {
                return (_b = multipleChoiceAnswersMap.get(answerLetter[2].toLowerCase())) !== null && _b !== void 0 ? _b : answer;
            }
            return answer;
        };
        QuizzardSearch.compareTwoStrings = function (stringA, stringB) {
            var first = stringA.replace(/\s+/g, '');
            var second = stringB.replace(/\s+/g, '');
            if (!first.length && !second.length) {
                return 1;
            }
            if (!first.length || !second.length) {
                return 0;
            }
            if (first === second) {
                return 1;
            }
            if (first.length === 1 && second.length === 1) {
                return 0;
            }
            if (first.length < 2 || second.length < 2) {
                return 0;
            }
            var firstBigrams = new Map();
            for (var i = 0; i < first.length - 1; i++) {
                var bigram = first.substring(i, i + 2);
                var count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
                firstBigrams.set(bigram, count);
            }
            var intersectionSize = 0;
            for (var i = 0; i < second.length - 1; i++) {
                var bigram = second.substring(i, i + 2);
                var count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;
                if (count > 0) {
                    firstBigrams.set(bigram, count - 1);
                    intersectionSize++;
                }
            }
            return (2.0 * intersectionSize) / (first.length + second.length - 2);
        };
        QuizzardSearch.addStudySetToCacheIfNotExists = function (url, quizletStudySet) {
            if (QuizzardSearch.QuizletStudySetCache.has(url) === true) {
                return;
            }
            QuizzardSearch.QuizletStudySetCache.set(url, quizletStudySet);
        };
        QuizzardSearch.isValidSearchSettings = function (searchSettings) {
            return searchSettings.searchConfig !== undefined && searchSettings.confidenceThreshold >= 0 && searchSettings.confidenceThreshold <= 1 && searchSettings.question !== undefined && searchSettings.confidenceThreshold !== undefined;
        };
        QuizzardSearch.sleep = function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        };
        QuizzardSearch.RequestConfig = { method: 'GET' };
        QuizzardSearch.QuizletStudySetCache = new Map();
        QuizzardSearch.QuizletCacheResetTimeout = undefined;
        return QuizzardSearch;
    }());
    Quizzard.QuizzardSearch = QuizzardSearch;
})(Quizzard || (Quizzard = {}));
var Browser;
(function (Browser) {
    var LocalStorage = chrome.storage.local;
    var ApplicationIcon = chrome.browserAction;
    var IntervalTimer = (function () {
        function IntervalTimer(callback) {
            this.callback = callback;
            this.state = IntervalTimer.Idle;
            this.interval = IntervalTimer.DEFAULT_ITERATION_INTERVAL;
        }
        IntervalTimer.prototype.start = function () {
            var _this = this;
            this.timerId = setInterval(function () { return _this.proxyCallback(); }, this.interval);
            this.state = 1;
        };
        IntervalTimer.prototype.stop = function () {
            if (this.state === IntervalTimer.Idle) {
                return;
            }
            if (this.timerId !== undefined) {
                clearInterval(this.timerId);
            }
            if (this.resumeId !== undefined) {
                clearTimeout(this.resumeId);
            }
            this.state = IntervalTimer.Idle;
        };
        IntervalTimer.prototype.isRunning = function () {
            return this.state === IntervalTimer.Running;
        };
        IntervalTimer.prototype.proxyCallback = function () {
            this.callback();
        };
        IntervalTimer.DEFAULT_ITERATION_INTERVAL = 1000 / 60;
        IntervalTimer.Idle = 0;
        IntervalTimer.Running = 1;
        return IntervalTimer;
    }());
    var Storage = (function () {
        function Storage() {
        }
        Storage.set = function (key, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(key !== undefined && value === undefined)) return [3, 2];
                            return [4, LocalStorage.remove(key)];
                        case 1:
                            _a.sent();
                            return [2, Promise.resolve(undefined)];
                        case 2:
                            if (key === undefined || value === undefined) {
                                return [2, Promise.resolve(undefined)];
                            }
                            return [2, new Promise(function (resolve) {
                                    var object = {};
                                    object[key] = value;
                                    LocalStorage.set(object, function () {
                                        return resolve(value);
                                    });
                                })];
                    }
                });
            });
        };
        Storage.remove = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, LocalStorage.remove(key)];
                });
            });
        };
        Storage.update = function (key, field, value) {
            return __awaiter(this, void 0, void 0, function () {
                var currentSettings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (key === undefined || field === undefined || value === undefined) {
                                return [2, Promise.resolve(undefined)];
                            }
                            return [4, LocalStorage.get(key)];
                        case 1:
                            currentSettings = _a.sent();
                            Storage.pushOrAssignFieldToObject(currentSettings, field, value);
                            return [2, Storage.set(key, currentSettings)];
                    }
                });
            });
        };
        Storage.get = function (key, defaultValue) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve) {
                            LocalStorage.get(key, function (object) {
                                var value = object[key];
                                if (value === undefined) {
                                    return resolve(defaultValue);
                                }
                                return resolve(value);
                            });
                        })];
                });
            });
        };
        Storage.getAll = function () {
            var key = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                key[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve) {
                            LocalStorage.get(key, function (object) {
                                return resolve(object);
                            });
                        })];
                });
            });
        };
        Storage.clear = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve) { return LocalStorage.clear(resolve); })];
                });
            });
        };
        Storage.pushOrAssignFieldToObject = function (obj, field, value) {
            if (Array.isArray(obj[field]) === true) {
                obj[field].push(value);
                return;
            }
            obj[field] = value;
        };
        return Storage;
    }());
    Browser.Storage = Storage;
    var Icon = (function () {
        function Icon() {
            this.context = new OffscreenCanvas(Icon.DEFAULT_ICON_CONFIG.contextWidth, Icon.DEFAULT_ICON_CONFIG.contextHeight).getContext('2d');
            this.intervalTimer = new IntervalTimer(this.onRotate.bind(this, new Date()));
        }
        Icon.prototype.startSpinning = function (colorHex) {
            if (this.intervalTimer.isRunning() === true) {
                return;
            }
            this.colorHex = colorHex;
            this.intervalTimer.start();
        };
        Icon.prototype.stopSpinning = function () {
            if (this.intervalTimer.isRunning() === false) {
                return;
            }
            this.intervalTimer.stop();
            ApplicationIcon.setIcon({ path: Icon.ICON_PATH });
        };
        Icon.prototype.setBadgeText = function (text) {
            ApplicationIcon.setBadgeText({ text: text });
        };
        Icon.prototype.clearBadgeText = function () {
            ApplicationIcon.setBadgeText({ text: '' });
        };
        Icon.prototype.onRotate = function (startTime) {
            if (this.context === null) {
                return;
            }
            var colorHex = Icon.hexToRgb(this.colorHex);
            var difference = (new Date().getTime() - startTime.getTime()) / 1000 * Icon.DEFAULT_ICON_CONFIG.lines;
            var rotation = parseInt(difference, 10) / Icon.DEFAULT_ICON_CONFIG.lines;
            this.context.save();
            this.context.clearRect(0, 0, Icon.DEFAULT_ICON_CONFIG.contextWidth, Icon.DEFAULT_ICON_CONFIG.contextHeight);
            this.context.translate(Icon.DEFAULT_ICON_CONFIG.contextWidth / 2, Icon.DEFAULT_ICON_CONFIG.contextHeight / 2);
            this.context.rotate(Math.PI * 2 * rotation);
            for (var i = 0; i < Icon.DEFAULT_ICON_CONFIG.lines; i++) {
                this.context.beginPath();
                this.context.rotate(Math.PI * 2 / Icon.DEFAULT_ICON_CONFIG.lines);
                this.context.moveTo(Icon.DEFAULT_ICON_CONFIG.contextWidth / 10, 0);
                this.context.lineTo(Icon.DEFAULT_ICON_CONFIG.contextWidth / 4, 0);
                this.context.lineWidth = Icon.DEFAULT_ICON_CONFIG.contextWidth / 30;
                this.context.strokeStyle = "rgba(".concat(colorHex.r, ", ").concat(colorHex.g, ", ").concat(colorHex.b, ", ").concat(i / Icon.DEFAULT_ICON_CONFIG.lines, ")");
                this.context.stroke();
            }
            var imageData = this.context.getImageData(10, 10, 19, 19);
            ApplicationIcon.setIcon({ imageData: imageData });
            this.context.restore();
        };
        Icon.hexToRgb = function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (hex === undefined || result === undefined || result === null) {
                return { r: 0, g: 0, b: 0 };
            }
            return { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) };
        };
        Icon.getInstance = function () {
            if (this.instance === undefined) {
                this.instance = new Icon();
            }
            return this.instance;
        };
        Icon.DEFAULT_ICON_CONFIG = { lines: 16, contextWidth: 40, contextHeight: 40 };
        Icon.ICON_PATH = '/icon.png';
        return Icon;
    }());
    Browser.Icon = Icon;
    var Runtime = (function () {
        function Runtime(port) {
            this.port = port;
            this.port.onMessage.addListener(this.onClientMessage.bind(this));
            this.port.onDisconnect.addListener(this.onClientDisconnect.bind(this));
        }
        Runtime.prototype.addEventListener = function (runtimeEventListener) {
            this.runtimeEventListener = runtimeEventListener;
        };
        Runtime.prototype.sendMessage = function (backgroundMessage) {
            if (this.port === undefined) {
                return;
            }
            try {
                this.port.postMessage(backgroundMessage);
            }
            catch (_a) { }
        };
        Runtime.prototype.isDisconnected = function () {
            return this.port === undefined;
        };
        Runtime.prototype.onClientMessage = function (backgroundMessage) {
            var isInvalidMessage = this.runtimeEventListener === undefined || backgroundMessage === undefined || backgroundMessage.messageType === undefined;
            if (isInvalidMessage === true) {
                return;
            }
            if (this.runtimeEventListener === undefined) {
                return;
            }
            switch (backgroundMessage.messageType) {
                case Browser.Runtime.MessageType.AGREE_TO_TERMS_OF_SERVICE: {
                    this.runtimeEventListener.onAgreeToTermsOfService(backgroundMessage.data.amountScrolled);
                    break;
                }
                case Browser.Runtime.MessageType.SEARCH_START: {
                    this.runtimeEventListener.onSearchStart(backgroundMessage.data.question);
                    break;
                }
                case Browser.Runtime.MessageType.UPDATE_STATE: {
                    this.runtimeEventListener.onUpdateState(backgroundMessage.data);
                    break;
                }
                case Browser.Runtime.MessageType.ABORT_SEARCH: {
                    this.runtimeEventListener.onAbortSearch();
                    break;
                }
                case Browser.Runtime.MessageType.UPDATE_THEME: {
                    this.runtimeEventListener.onUpdateTheme(backgroundMessage.data);
                    break;
                }
                case Browser.Runtime.MessageType.UPDATE_SEARCH_SETTINGS: {
                    this.runtimeEventListener.onUpdateSearchSettings(backgroundMessage.data);
                    break;
                }
                case Browser.Runtime.MessageType.CLEAR_RESULTS: {
                    this.runtimeEventListener.onClearResults();
                    break;
                }
                case Browser.Runtime.MessageType.LOGIN: {
                    this.runtimeEventListener.onLogin(backgroundMessage.data.email, backgroundMessage.data.password, backgroundMessage.data.rememberMe);
                    break;
                }
                case Browser.Runtime.MessageType.LOGOUT: {
                    this.runtimeEventListener.onLogout();
                    break;
                }
                case Browser.Runtime.MessageType.RESET_SIGN_UP_SESSION: {
                    this.runtimeEventListener.onResetSignUpSession();
                    break;
                }
                case Browser.Runtime.MessageType.ACTIVATE_FREE_TRIAL: {
                    this.runtimeEventListener.onActivateFreeTrial();
                    break;
                }
                case Browser.Runtime.MessageType.FORGOT_PASSWORD: {
                    this.runtimeEventListener.onForgotPassword(backgroundMessage.data.email);
                    break;
                }
                case Browser.Runtime.MessageType.SETTINGS_MODAL_CLICK: {
                    this.runtimeEventListener.onSettingsModalClick();
                    break;
                }
                case Browser.Runtime.MessageType.THEMES_MODAL_CLICK: {
                    this.runtimeEventListener.onThemesModalClick();
                    break;
                }
                case Browser.Runtime.MessageType.DONATE_CLICK: {
                    this.runtimeEventListener.onDonateClick();
                    break;
                }
                case Browser.Runtime.MessageType.DISCORD_CLICK: {
                    this.runtimeEventListener.onDiscordClick();
                    break;
                }
                case Browser.Runtime.MessageType.SUBSCRIBE_CLICK: {
                    this.runtimeEventListener.onSubscribeClick();
                    break;
                }
                case Browser.Runtime.MessageType.WEBSITE_CLICK: {
                    this.runtimeEventListener.onWebsiteClick(backgroundMessage.data.index);
                    break;
                }
                case Browser.Runtime.MessageType.PROMOTION_CLICK: {
                    this.runtimeEventListener.onPromotionClick(backgroundMessage.data.id);
                    break;
                }
                case Browser.Runtime.MessageType.SIGN_UP: {
                    this.runtimeEventListener.onSignUp(backgroundMessage.data.email, backgroundMessage.data.password, backgroundMessage.data.rememberMe);
                    break;
                }
                case Browser.Runtime.MessageType.ACTIVATE_ACCOUNT: {
                    this.runtimeEventListener.onActivateAccount(backgroundMessage.data.email, backgroundMessage.data.activationCode);
                    break;
                }
            }
        };
        Runtime.prototype.onClientDisconnect = function () {
            if (this.port === undefined) {
                return;
            }
            this.port.onMessage.removeListener(this.onClientMessage.bind(this));
            this.port.onDisconnect.removeListener(this.onClientDisconnect.bind(this));
            this.port = undefined;
        };
        Runtime.addInstallationEventListenerIfNotExists = function (listener) {
            if (Runtime.ApplicationRuntime.onInstalled !== undefined && Runtime.ApplicationRuntime.onInstalled.hasListeners !== undefined && Runtime.ApplicationRuntime.onInstalled.hasListeners() === true) {
                return;
            }
            Runtime.ApplicationRuntime.onInstalled.addListener(listener);
        };
        Runtime.addUpdateAvailableEventListenerIfNotExists = function (listener) {
            if (Runtime.ApplicationRuntime.onUpdateAvailable !== undefined && Runtime.ApplicationRuntime.onUpdateAvailable.hasListeners !== undefined && Runtime.ApplicationRuntime.onUpdateAvailable.hasListeners() === true) {
                return;
            }
            Runtime.ApplicationRuntime.onUpdateAvailable.addListener(listener);
        };
        Runtime.setUninstallURL = function (uninstallURL) {
            if (Runtime.ApplicationRuntime.setUninstallURL === undefined) {
                return;
            }
            Runtime.ApplicationRuntime.setUninstallURL(uninstallURL);
        };
        Runtime.addConnectionEventListenerIfNotExists = function (listener) {
            if (Runtime.ApplicationRuntime.onConnect !== undefined && Runtime.ApplicationRuntime.onConnect.hasListeners !== undefined && Runtime.ApplicationRuntime.onConnect.hasListeners() === true) {
                return;
            }
            Runtime.ApplicationRuntime.onConnect.addListener(listener);
        };
        return Runtime;
    }());
    Browser.Runtime = Runtime;
    (function (Runtime) {
        Runtime.ApplicationRuntime = browser.runtime;
        Runtime.RUNTIME_CONNECTION_NAME = 'QuizzardComm';
        var MessageType;
        (function (MessageType) {
            MessageType["LOAD_APPLICATION_DATA"] = "LOAD_APPLICATION_DATA";
            MessageType["AGREE_TO_TERMS_OF_SERVICE"] = "AGREE_TO_TERMS_OF_SERVICE";
            MessageType["UPDATE_THEME"] = "UPDATE_THEME";
            MessageType["UPDATE_SEARCH_SETTINGS"] = "UPDATE_SEARCH_SETTINGS";
            MessageType["UPDATE_STATE"] = "UPDATE_STATE";
            MessageType["SEARCH_START"] = "SEARCH";
            MessageType["SEARCH_RESULT"] = "SEARCH_RESULT";
            MessageType["SEARCH_END"] = "SEARCH_END";
            MessageType["ABORT_SEARCH"] = "ABORT_SEARCH";
            MessageType["CLEAR_RESULTS"] = "CLEAR_RESULTS";
            MessageType["ERROR_OCCURRED"] = "ERROR_OCCURRED";
            MessageType["LOGIN"] = "LOGIN";
            MessageType["LOGOUT"] = "LOGOUT";
            MessageType["SIGN_UP"] = "SIGN_UP";
            MessageType["ACTIVATE_ACCOUNT"] = "ACTIVATE_ACCOUNT";
            MessageType["RESET_SIGN_UP_SESSION"] = "RESET_SIGN_UP_SESSION";
            MessageType["ACTIVATE_FREE_TRIAL"] = "ACTIVATE_FREE_TRIAL";
            MessageType["FORGOT_PASSWORD"] = "FORGOT_PASSWORD";
            MessageType["SETTINGS_MODAL_CLICK"] = "SETTINGS_MODAL_CLICK";
            MessageType["THEMES_MODAL_CLICK"] = "THEMES_MODAL_CLICK";
            MessageType["DONATE_CLICK"] = "DONATE_CLICK";
            MessageType["DISCORD_CLICK"] = "DISCORD_CLICK";
            MessageType["SUBSCRIBE_CLICK"] = "SUBSCRIBE_CLICK";
            MessageType["FREE_TRIAL_CLICK"] = "FREE_TRIAL_CLICK";
            MessageType["WEBSITE_CLICK"] = "WEBSITE_CLICK";
            MessageType["PROMOTION_CLICK"] = "PROMOTION_CLICK";
        })(MessageType = Runtime.MessageType || (Runtime.MessageType = {}));
    })(Runtime = Browser.Runtime || (Browser.Runtime = {}));
    var ContextMenu = (function () {
        function ContextMenu() {
        }
        ContextMenu.createDefaultSearchContextMenu = function () {
            ContextMenu.Menu.create(ContextMenu.ClientContextMenuConfiguration);
        };
        ContextMenu.addDefaultSearchContextMenuListener = function (onRightClickToSearch) {
            if (ContextMenu.Menu.onClicked !== undefined && ContextMenu.Menu.onClicked.hasListeners !== undefined && ContextMenu.Menu.onClicked.hasListeners() === true) {
                return;
            }
            ContextMenu.Menu.onClicked.addListener(function (info) {
                if (info === undefined || info.selectionText === undefined) {
                    return;
                }
                onRightClickToSearch(info.selectionText);
            });
        };
        ContextMenu.ClientContextMenuConfiguration = {
            id: 'CM_10291',
            title: 'Search for \"%s\"',
            contexts: ['selection']
        };
        return ContextMenu;
    }());
    Browser.ContextMenu = ContextMenu;
    (function (ContextMenu) {
        ContextMenu.Menu = chrome.contextMenus;
    })(ContextMenu = Browser.ContextMenu || (Browser.ContextMenu = {}));
})(Browser || (Browser = {}));
var GoogleMeasurementProtocol;
(function (GoogleMeasurementProtocol) {
    var EventName;
    (function (EventName) {
        EventName["APPLICATION_OPENED"] = "application_opened";
        EventName["APPLICATION_ERROR"] = "app_exception";
        EventName["AUTHENTICATION_SKIPPED"] = "authentication_skipped";
        EventName["TERMS_OF_SERVICE_AGREED"] = "termsOfService_agreed";
        EventName["SEARCH_PERFORMED"] = "search_performed";
        EventName["RECEIVED_RECAPTCHA"] = "received_reCAPTCHA";
        EventName["OPENED_MODAL"] = "opened_modal";
        EventName["CLICKED_BUTTON"] = "clicked_button";
        EventName["ADJUSTED_SETTINGS"] = "adjusted_settings";
        EventName["ADJUSTED_THEME"] = "adjusted_theme";
    })(EventName || (EventName = {}));
    var sendGoogleMeasurementProtocolEvent = function (clientID, userID, eventName, eventParams) {
        var params = {
            client_id: clientID.toString(),
            timestamp_micros: Date.now() * 1000,
            non_personalized_ads: false,
            events: [
                {
                    name: eventName,
                    params: __assign({ engagement_time_msec: 1 }, eventParams)
                }
            ]
        };
        if (userID !== undefined) {
            params.user_id = userID.toString();
        }
        try {
            fetch("https://www.google-analytics.com/mp/collect?measurement_id=G-MMPQB5FJZ0&api_secret=9y3ateo2TvqPIVXasjPPzA", { method: 'POST', body: JSON.stringify(params) });
        }
        catch (ignore) { }
    };
    GoogleMeasurementProtocol.SendApplicationOpenedEvent = function (clientID, userID, clientVersion) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.APPLICATION_OPENED, { version: clientVersion });
    };
    GoogleMeasurementProtocol.SendAuthenticationSkippedEvent = function (clientID, userID) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.AUTHENTICATION_SKIPPED, {});
    };
    GoogleMeasurementProtocol.SendTermsOfServiceAgreedEvent = function (clientID, userID, amountScrolled) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.TERMS_OF_SERVICE_AGREED, { amountScrolled: amountScrolled });
    };
    GoogleMeasurementProtocol.SendOpenSettingsModalEvent = function (clientID, userID) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.OPENED_MODAL, { modalName: 'Settings' });
    };
    GoogleMeasurementProtocol.SendOpenThemesModalEvent = function (clientID, userID) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.OPENED_MODAL, { modalName: 'Themes' });
    };
    GoogleMeasurementProtocol.SendAdjustThemeEvent = function (clientID, userID, oldThemeName, newThemeName) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.ADJUSTED_THEME, { oldTheme: oldThemeName, newTheme: newThemeName });
    };
    function SendDonateClickEvent(clientID, userID) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.CLICKED_BUTTON, { buttonName: 'Donate' });
    }
    GoogleMeasurementProtocol.SendDonateClickEvent = SendDonateClickEvent;
    function SendDiscordClickEvent(clientID, userID) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.CLICKED_BUTTON, { buttonName: 'Discord' });
    }
    GoogleMeasurementProtocol.SendDiscordClickEvent = SendDiscordClickEvent;
    function SendSubscribeClickEvent(clientID, userID) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.CLICKED_BUTTON, { buttonName: 'Subscribe' });
    }
    GoogleMeasurementProtocol.SendSubscribeClickEvent = SendSubscribeClickEvent;
    function SendWebsiteClickEvent(clientID, userID, index) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.CLICKED_BUTTON, { buttonName: 'Website', value: index });
    }
    GoogleMeasurementProtocol.SendWebsiteClickEvent = SendWebsiteClickEvent;
    function SendPromotionClickEvent(clientID, userID, promotionID) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.CLICKED_BUTTON, { buttonName: 'Promotion', value: promotionID });
    }
    GoogleMeasurementProtocol.SendPromotionClickEvent = SendPromotionClickEvent;
    GoogleMeasurementProtocol.SendAdjustConfidenceThresholdEvent = function (clientID, userID, confidenceThreshold) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.ADJUSTED_SETTINGS, { settingName: 'ConfidenceThreshold', settingValue: confidenceThreshold });
    };
    GoogleMeasurementProtocol.SendAdjustAutomaticallyClearEvent = function (clientID, userID, automaticallyClear) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.ADJUSTED_SETTINGS, { settingName: 'AutomaticallyClear', settingValue: automaticallyClear });
    };
    GoogleMeasurementProtocol.SendAdjustAutomaticallySortEvent = function (clientID, userID, automaticallySort) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.ADJUSTED_SETTINGS, { settingName: 'AutomaticallySort', settingValue: automaticallySort });
    };
    GoogleMeasurementProtocol.SendReceivedReCAPTCHAEvent = function (clientID, userID) {
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.RECEIVED_RECAPTCHA, {});
    };
    GoogleMeasurementProtocol.SendSearchEvent = function (question, clientID, userID, isRightClickToSearch, isGoldSearch, totalResults, timeTakenSeconds) {
        var averageConfidence = 0;
        var confidenceStdDev = 0;
        try {
            var totalResultValue = totalResults.length;
            if (totalResultValue > 255) {
                totalResultValue = 255;
            }
            for (var _i = 0, totalResults_1 = totalResults; _i < totalResults_1.length; _i++) {
                var answer = totalResults_1[_i];
                averageConfidence += answer;
            }
            averageConfidence = Math.round((averageConfidence / totalResultValue) * 100);
            if (isNaN(averageConfidence) === true) {
                averageConfidence = 0;
            }
            if (totalResultValue > 1) {
                var sumOfSquares = 0;
                for (var _a = 0, totalResults_2 = totalResults; _a < totalResults_2.length; _a++) {
                    var answer = totalResults_2[_a];
                    sumOfSquares += Math.pow((answer - averageConfidence / 100), 2);
                }
                confidenceStdDev = Math.round(Math.sqrt(sumOfSquares / (totalResults.length - 1)) * 10000);
                if (isNaN(confidenceStdDev) === true) {
                    confidenceStdDev = 0;
                }
            }
        }
        catch (_b) { }
        sendGoogleMeasurementProtocolEvent(clientID, userID, EventName.SEARCH_PERFORMED, { isRightClickToSearch: isRightClickToSearch, numResults: totalResults.length, searchType: isGoldSearch === true ? 'Gold' : 'Normal', avgConfidence: averageConfidence, confidenceStdDev: confidenceStdDev, searchTime: timeTakenSeconds });
    };
})(GoogleMeasurementProtocol || (GoogleMeasurementProtocol = {}));
var Server;
(function (Server) {
    var _this = this;
    Server.APPLICATION_VERSION = 'v4.3.1';
    var APPLICATION_SERVER_URL = 'https://www.quizzardapp.com/';
    var APPLICATION_AUTHENTICATION_ENDPOINT = 'api/v2/extension/auth';
    var APPLICATION_LOGIN_ENDPOINT = 'api/v2/extension/login';
    var APPLICATION_LOGOUT_ENDPOINT = 'api/v2/extension/logout';
    var APPLICATION_FORGOT_PASSWORD_ENDPOINT = 'api/v2/extension/forgot-password';
    var APPLICATION_GOLD_SEARCH_ENDPOINT = 'api/v2/extension/gold-search';
    var APPLICATION_REGISTRATION_ENDPOINT = 'api/v2/extension/register';
    var APPLICATION_USER_ACTIVATION_ENDPOINT = 'api/v2/extension/activate';
    var APPLICATION_ACTIVATE_FREE_TRIAL_ENDPOINT = 'api/v2/extension/gold-trial';
    var APPLICATION_DATA_ENDPOINT = 'api/v2/extension/data';
    var APPLICATION_SEARCH_ENDPOINT = 'api/v2/extension/search';
    var APPLICATION_UNINSTALL_ENDPOINT = 'uninstall';
    var SERVER_UNAUTHORIZED_STATUS = 401;
    var SERVER_WEIRD_RESPONSE = 679;
    Server.getLatestApplicationDataAndAuthenticateIfNeeded = function () { return __awaiter(_this, void 0, void 0, function () {
        var applicationData, serverError, isAuthenticated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Server.getApplicationData()];
                case 1:
                    applicationData = _a.sent();
                    if (!(isServerError(applicationData) === true)) return [3, 9];
                    serverError = applicationData;
                    if (!(serverError.status !== SERVER_UNAUTHORIZED_STATUS)) return [3, 3];
                    return [4, Server.getLocalOrDefaultApplicationData()];
                case 2: return [2, _a.sent()];
                case 3: return [4, Server.authenticate()];
                case 4:
                    isAuthenticated = _a.sent();
                    if (!(isAuthenticated === false)) return [3, 6];
                    return [4, Server.getLocalOrDefaultApplicationData()];
                case 5: return [2, _a.sent()];
                case 6: return [4, Server.getApplicationData()];
                case 7:
                    applicationData = _a.sent();
                    if (!(isServerError(applicationData) === true)) return [3, 9];
                    return [4, Server.getLocalOrDefaultApplicationData()];
                case 8: return [2, _a.sent()];
                case 9: return [2, Promise.resolve(applicationData)];
            }
        });
    }); };
    Server.authenticateAndGetApplicationData = function () { return __awaiter(_this, void 0, void 0, function () {
        var isAuthenticated, applicationData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Server.authenticate()];
                case 1:
                    isAuthenticated = _a.sent();
                    if (!(isAuthenticated === false)) return [3, 3];
                    return [4, Server.getLocalOrDefaultApplicationData()];
                case 2: return [2, _a.sent()];
                case 3: return [4, Server.getApplicationData()];
                case 4:
                    applicationData = _a.sent();
                    if (!(isServerError(applicationData) === true)) return [3, 6];
                    return [4, Server.getLocalOrDefaultApplicationData()];
                case 5: return [2, _a.sent()];
                case 6: return [2, applicationData];
            }
        });
    }); };
    Server.search = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, ignore_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, fetch(APPLICATION_SERVER_URL.concat(APPLICATION_SEARCH_ENDPOINT), { method: 'PUT', headers: { 'Content-Type': 'text/plain' }, credentials: 'include' })];
                case 2:
                    response = _a.sent();
                    return [3, 4];
                case 3:
                    ignore_2 = _a.sent();
                    return [3, 4];
                case 4:
                    if (response === undefined || response.ok === false) {
                        return [2, Promise.resolve()];
                    }
                    return [2, Promise.resolve()];
            }
        });
    }); };
    Server.getApplicationData = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, ignore_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, fetch(APPLICATION_SERVER_URL.concat(APPLICATION_DATA_ENDPOINT), { method: 'GET', credentials: 'include' })];
                case 2:
                    response = _a.sent();
                    return [3, 4];
                case 3:
                    ignore_3 = _a.sent();
                    return [3, 4];
                case 4:
                    if (response === undefined) {
                        return [2, { status: -1 }];
                    }
                    if (response.ok === false) {
                        return [2, { status: response.status }];
                    }
                    return [4, response.json()];
                case 5: return [2, _a.sent()];
            }
        });
    }); };
    Server.forgotPassword = function (email) { return __awaiter(_this, void 0, void 0, function () {
        var response, responseError_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, fetch(APPLICATION_SERVER_URL.concat(APPLICATION_FORGOT_PASSWORD_ENDPOINT), { method: 'POST', body: JSON.stringify({ email: email }), headers: { 'Content-Type': 'text/plain' } })];
                case 1:
                    response = _a.sent();
                    return [3, 3];
                case 2:
                    responseError_1 = _a.sent();
                    return [2, Promise.resolve()];
                case 3:
                    if (response.ok === false) {
                        return [2, Promise.resolve()];
                    }
                    return [2, Promise.resolve()];
            }
        });
    }); };
    Server.login = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
        var response, responseError_2, responseContent, responseObject, ignore_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, fetch(APPLICATION_SERVER_URL.concat(APPLICATION_LOGIN_ENDPOINT), { method: 'POST', body: JSON.stringify({ email: email, password: password }), headers: { 'Content-Type': 'text/plain' } })];
                case 1:
                    response = _a.sent();
                    return [3, 3];
                case 2:
                    responseError_2 = _a.sent();
                    return [2, Promise.resolve({ error: { message: 'An error occurred while logging in! Please try-again.', code: 0 } })];
                case 3:
                    if (!(response.ok === false)) return [3, 5];
                    return [4, response.text()];
                case 4:
                    responseContent = _a.sent();
                    return [2, Promise.resolve({ error: { message: responseContent, code: response.status } })];
                case 5:
                    responseObject = undefined;
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4, response.json()];
                case 7:
                    responseObject = _a.sent();
                    return [3, 9];
                case 8:
                    ignore_4 = _a.sent();
                    return [3, 9];
                case 9:
                    if (responseObject === undefined) {
                        return [2, Promise.resolve({ error: { message: 'An error occurred while activating your account! Please try-again.', code: SERVER_WEIRD_RESPONSE } })];
                    }
                    return [2, Promise.resolve({ user: { userID: responseObject.userID, isGoldSearch: responseObject.isGoldSearch, isFreeTrialActivated: responseObject.isFreeTrialActivated, goldSearchEndTimeEpoch: responseObject.goldSearchEndTimeEpoch } })];
            }
        });
    }); };
    Server.logout = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, responseError_3, responseContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, fetch(APPLICATION_SERVER_URL.concat(APPLICATION_LOGOUT_ENDPOINT), { method: 'POST', headers: { 'Content-Type': 'text/plain' } })];
                case 1:
                    response = _a.sent();
                    return [3, 3];
                case 2:
                    responseError_3 = _a.sent();
                    return [2, Promise.resolve({ message: 'An error occurred while logging out! Please try-again.', code: 0 })];
                case 3:
                    if (!(response.ok === false)) return [3, 5];
                    return [4, response.text()];
                case 4:
                    responseContent = _a.sent();
                    return [2, Promise.resolve({ message: responseContent, code: response.status })];
                case 5: return [2, Promise.resolve(undefined)];
            }
        });
    }); };
    Server.signUp = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
        var response, responseError_4, responseContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, fetch(APPLICATION_SERVER_URL.concat(APPLICATION_REGISTRATION_ENDPOINT), { method: 'POST', body: JSON.stringify({ email: email, password: password }), headers: { 'Content-Type': 'text/plain' } })];
                case 1:
                    response = _a.sent();
                    return [3, 3];
                case 2:
                    responseError_4 = _a.sent();
                    return [2, Promise.resolve({ message: 'An error occurred while creating a new Quizzard account! Please try-again.', code: 0 })];
                case 3:
                    if (!(response.ok === false)) return [3, 5];
                    return [4, response.text()];
                case 4:
                    responseContent = _a.sent();
                    return [2, Promise.resolve({ message: responseContent, code: response.status })];
                case 5: return [2, Promise.resolve(undefined)];
            }
        });
    }); };
    Server.activateAccount = function (activationCode) { return __awaiter(_this, void 0, void 0, function () {
        var response, ignore_5, responseContent, responseObject, ignore_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, fetch(APPLICATION_SERVER_URL.concat(APPLICATION_USER_ACTIVATION_ENDPOINT), { method: 'POST', body: JSON.stringify({ activationCode: activationCode }), headers: { 'Content-Type': 'text/plain' } })];
                case 1:
                    response = _a.sent();
                    return [3, 3];
                case 2:
                    ignore_5 = _a.sent();
                    return [2, Promise.resolve({ error: { message: 'An error occurred while activating your account! Please try-again.', code: 0 } })];
                case 3:
                    if (!(response.ok === false)) return [3, 5];
                    return [4, response.text()];
                case 4:
                    responseContent = _a.sent();
                    return [2, Promise.resolve({ error: { message: responseContent, code: response.status } })];
                case 5:
                    responseObject = undefined;
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4, response.json()];
                case 7:
                    responseObject = _a.sent();
                    return [3, 9];
                case 8:
                    ignore_6 = _a.sent();
                    return [3, 9];
                case 9:
                    if (responseObject === undefined) {
                        return [2, Promise.resolve({ error: { message: 'An error occurred while activating your account! Please try-again.', code: SERVER_WEIRD_RESPONSE } })];
                    }
                    return [2, Promise.resolve({ userID: responseObject.userID })];
            }
        });
    }); };
    Server.activateFreeTrial = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, responseError_5, responseContent, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, fetch(APPLICATION_SERVER_URL.concat(APPLICATION_ACTIVATE_FREE_TRIAL_ENDPOINT), { method: 'POST', credentials: 'include' })];
                case 1:
                    response = _a.sent();
                    return [3, 3];
                case 2:
                    responseError_5 = _a.sent();
                    return [2, Promise.resolve({ error: 'An error occurred while activating free trial! Please try-again.', goldSearchEndTimeEpoch: undefined })];
                case 3:
                    if (!(response.ok === false)) return [3, 5];
                    return [4, response.text()];
                case 4:
                    responseContent = _a.sent();
                    return [2, Promise.resolve({ error: responseContent, goldSearchEndTimeEpoch: undefined })];
                case 5: return [4, response.json()];
                case 6:
                    data = _a.sent();
                    return [2, Promise.resolve({ error: undefined, goldSearchEndTimeEpoch: data.goldSearchEndTimeEpoch })];
            }
        });
    }); };
    Server.getUninstallURL = function () {
        return APPLICATION_SERVER_URL.concat(APPLICATION_UNINSTALL_ENDPOINT);
    };
    Server.getGoldSearchURL = function () {
        return APPLICATION_SERVER_URL.concat(APPLICATION_GOLD_SEARCH_ENDPOINT);
    };
    Server.authenticate = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, clientVersion, ignore_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = undefined;
                    clientVersion = { clientVersion: "QBE ".concat(Server.APPLICATION_VERSION) };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, fetch(APPLICATION_SERVER_URL.concat(APPLICATION_AUTHENTICATION_ENDPOINT), { method: 'POST', body: JSON.stringify(clientVersion), headers: { 'Content-Type': 'text/plain' } })];
                case 2:
                    response = _a.sent();
                    return [3, 4];
                case 3:
                    ignore_7 = _a.sent();
                    return [3, 4];
                case 4:
                    if (response === undefined || response.ok === false) {
                        return [2, Promise.resolve(false)];
                    }
                    return [2, Promise.resolve(true)];
            }
        });
    }); };
    Server.getLocalOrDefaultApplicationData = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, id, searchConfig, themes, promotions, isGold, isActivationRequired, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, Promise.all([
                        Browser.Storage.get('id', Configuration.DEFAULT_CLIENT_ID),
                        Browser.Storage.get('searchConfig', Configuration.DEFAULT_SEARCH_CONFIG),
                        Browser.Storage.get('themes', Configuration.DEFAULT_THEMES),
                        Browser.Storage.get('promotions', Configuration.DEFAULT_PROMOTIONS),
                        Browser.Storage.get('isGold', false),
                        Browser.Storage.get('isActivationRequired', false),
                        Browser.Storage.get('user', undefined),
                    ])];
                case 1:
                    _a = _b.sent(), id = _a[0], searchConfig = _a[1], themes = _a[2], promotions = _a[3], isGold = _a[4], isActivationRequired = _a[5], user = _a[6];
                    return [2, { id: id, searchConfig: searchConfig, themes: themes, promotions: promotions, isGold: isGold, isActivationRequired: isActivationRequired, user: user }];
            }
        });
    }); };
    var isServerError = function (error) {
        return error.status !== undefined;
    };
})(Server || (Server = {}));
var RuntimeHandler = (function () {
    function RuntimeHandler() {
        this.duplicateSetCache = new Map();
    }
    RuntimeHandler.prototype.initializePort = function (port) {
        this.runtime = new Browser.Runtime(port);
        this.runtime.addEventListener(this);
    };
    RuntimeHandler.prototype.search = function (question, isRightClickToSearch) {
        this.onSearchStart(question, isRightClickToSearch);
    };
    RuntimeHandler.prototype.onSearchStart = function (question, isRightClickToSearch) {
        var _this = this;
        if (isRightClickToSearch === void 0) { isRightClickToSearch = false; }
        var searchData = [
            Browser.Storage.get('didAgree', false),
            Browser.Storage.get('id', Configuration.DEFAULT_CLIENT_ID),
            Browser.Storage.get('searchConfig', Configuration.DEFAULT_SEARCH_CONFIG),
            Browser.Storage.get('settings', undefined),
            Browser.Storage.get('user', undefined)
        ];
        Promise.all(searchData).then(function (_a) {
            var didAgree = _a[0], id = _a[1], searchConfig = _a[2], settings = _a[3], user = _a[4];
            if (didAgree === false || settings === undefined) {
                return;
            }
            var goldSearchURL = undefined;
            var userID = undefined;
            if (user !== undefined) {
                userID = user.userID;
                if (user.isGoldSearch === true) {
                    goldSearchURL = ApplicationHandler.getGoldSearchURL();
                }
            }
            var isGoldSearchEnabled = goldSearchURL !== undefined;
            RuntimeHandler.getRandomizedPromotionIfAvailable(isGoldSearchEnabled).then(function (promotion) {
                var icon = Browser.Icon.getInstance();
                icon.startSpinning(settings.windowPrimaryColor);
                icon.clearBadgeText();
                _this.state = { question: question, answers: [], isLoading: true, noResults: false, randomizedPromotion: promotion };
                _this.duplicateSetCache.clear();
                RuntimeHandler.updateStateAndPostMessageIfPortAvailable('state', _this.state, Browser.Runtime.MessageType.UPDATE_STATE, _this.runtime);
                ApplicationHandler.search();
                var regularSearchSettings = { question: question, confidenceThreshold: settings.confidenceThreshold / 100, goldSearchURL: goldSearchURL, searchConfig: searchConfig };
                var currentTimeEpoch = new Date().getTime();
                Quizzard.QuizzardSearch.search(regularSearchSettings, _this.onSearchDataReceived.bind(_this, settings.autoSort)).then(_this.onSearchEnd.bind(_this, question, id, userID, isRightClickToSearch, isGoldSearchEnabled, currentTimeEpoch))["catch"](_this.onSearchError.bind(_this, id, userID, isGoldSearchEnabled));
            });
        });
    };
    RuntimeHandler.prototype.onApplicationDisconnect = function () {
        var _this = this;
        Browser.Storage.get('settings', undefined).then(function (settings) {
            if (_this.state === undefined || settings === undefined) {
                return;
            }
            if (settings.autoClear === true && _this.state.reCAPTCHAData === undefined) {
                _this.state = Configuration.DEFAULT_STATE;
            }
            Browser.Storage.set('state', _this.state);
            Browser.Icon.getInstance().stopSpinning();
        });
    };
    RuntimeHandler.prototype.onClearResults = function () {
        this.state = Configuration.DEFAULT_STATE;
        Browser.Storage.set('state', this.state);
    };
    RuntimeHandler.prototype.onUpdateSearchSettings = function (searchSettings) {
        Browser.Storage.get('settings', undefined).then(function (settings) {
            if (settings === undefined) {
                return;
            }
            if (searchSettings.confidenceThreshold !== settings.confidenceThreshold) {
                RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendAdjustConfidenceThresholdEvent(clientID, userID, searchSettings.confidenceThreshold); });
            }
            if (searchSettings.autoSort !== settings.autoSort) {
                RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendAdjustAutomaticallySortEvent(clientID, userID, searchSettings.autoSort); });
            }
            if (searchSettings.autoClear !== settings.autoClear) {
                RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendAdjustAutomaticallyClearEvent(clientID, userID, searchSettings.autoClear); });
            }
            settings.confidenceThreshold = searchSettings.confidenceThreshold;
            settings.autoSort = searchSettings.autoSort;
            settings.autoClear = searchSettings.autoClear;
            Browser.Storage.set('settings', settings);
        });
    };
    RuntimeHandler.prototype.onUpdateTheme = function (theme) {
        Browser.Storage.get('settings', undefined).then(function (settings) {
            var _a, _b;
            if (settings === undefined) {
                return;
            }
            var oldThemeName = (_b = (_a = Configuration.DEFAULT_THEMES.find(function (defaultTheme) { return defaultTheme.primaryColor === settings.windowPrimaryColor; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'Unknown';
            RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendAdjustThemeEvent(clientID, userID, oldThemeName, theme.name); });
            settings.windowPrimaryColor = theme.primaryColor;
            settings.windowSecondaryColor = theme.secondaryColor;
            Browser.Storage.set('settings', settings);
        });
    };
    RuntimeHandler.prototype.onAbortSearch = function () {
        Browser.Icon.getInstance().stopSpinning();
    };
    RuntimeHandler.prototype.onUpdateState = function (state) {
        Browser.Storage.set('state', state);
    };
    RuntimeHandler.prototype.onAgreeToTermsOfService = function (amountScrolled) {
        RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendTermsOfServiceAgreedEvent(clientID, userID, amountScrolled); });
        Browser.Storage.set('didAgree', true);
    };
    RuntimeHandler.prototype.onDonateClick = function () {
        RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendDonateClickEvent(clientID, userID); });
    };
    RuntimeHandler.prototype.onDiscordClick = function () {
        RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendDiscordClickEvent(clientID, userID); });
    };
    RuntimeHandler.prototype.onSubscribeClick = function () {
        RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendSubscribeClickEvent(clientID, userID); });
    };
    RuntimeHandler.prototype.onWebsiteClick = function (index) {
        RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendWebsiteClickEvent(clientID, userID, index); });
    };
    RuntimeHandler.prototype.onPromotionClick = function (id) {
        RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendPromotionClickEvent(clientID, userID, id); });
    };
    RuntimeHandler.prototype.onResetSignUpSession = function () {
        RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendAuthenticationSkippedEvent(clientID, userID); });
        Browser.Storage.set('isActivationRequired', false);
        Browser.Storage.set('signInResetTimeEpoch', new Date().getTime() + 86400000);
    };
    RuntimeHandler.prototype.onForgotPassword = function (email) {
        var _this = this;
        ApplicationHandler.forgotPassword(email)["finally"](function () {
            RuntimeHandler.postMessageIfPortAvailable({}, Browser.Runtime.MessageType.FORGOT_PASSWORD, _this.runtime);
        });
    };
    RuntimeHandler.prototype.onLogin = function (email, password, rememberMe) {
        var _this = this;
        if (rememberMe === true) {
            Browser.Storage.set('email', email);
        }
        Browser.Storage.set('rememberMe', rememberMe);
        ApplicationHandler.login(email, password).then(function (loginResponse) {
            if (loginResponse.user !== undefined) {
                Browser.Storage.set('user', { userID: loginResponse.user.userID, email: email, isGoldSearch: loginResponse.user.isGoldSearch, isFreeTrialActivated: loginResponse.user.isFreeTrialActivated, goldSearchEndTimeEpoch: loginResponse.user.goldSearchEndTimeEpoch });
            }
            RuntimeHandler.postMessageIfPortAvailable(loginResponse, Browser.Runtime.MessageType.LOGIN, _this.runtime);
        });
    };
    RuntimeHandler.prototype.onLogout = function () {
        var _this = this;
        ApplicationHandler.logout().then(function (error) {
            if (error !== undefined) {
            }
            Browser.Storage.set('user', undefined);
            Browser.Storage.set('signInResetTimeEpoch', new Date().getTime() + 86400000);
            RuntimeHandler.postMessageIfPortAvailable(undefined, Browser.Runtime.MessageType.LOGOUT, _this.runtime);
        });
    };
    RuntimeHandler.prototype.onSignUp = function (email, password, rememberMe) {
        var _this = this;
        if (rememberMe === true) {
            Browser.Storage.set('email', email);
        }
        Browser.Storage.set('rememberMe', rememberMe);
        ApplicationHandler.signUp(email, password).then(function (error) {
            var isActivationRequired = true;
            if (error !== undefined) {
                isActivationRequired = false;
            }
            RuntimeHandler.postMessageIfPortAvailable(error, Browser.Runtime.MessageType.SIGN_UP, _this.runtime);
            Browser.Storage.set('isActivationRequired', isActivationRequired);
        });
    };
    RuntimeHandler.prototype.onActivateAccount = function (email, activationCode) {
        var _this = this;
        ApplicationHandler.activateAccount(activationCode).then(function (activateAccountResponse) {
            if (activateAccountResponse.userID !== undefined) {
                var user = { userID: activateAccountResponse.userID, email: email, isGoldSearch: false, isFreeTrialActivated: false };
                Browser.Storage.set('isActivationRequired', false);
                Browser.Storage.set('user', user);
            }
            RuntimeHandler.postMessageIfPortAvailable(activateAccountResponse, Browser.Runtime.MessageType.ACTIVATE_ACCOUNT, _this.runtime);
        });
    };
    RuntimeHandler.prototype.onActivateFreeTrial = function () {
        var _this = this;
        ApplicationHandler.activateFreeTrial().then(function (activateFreeTrialResponse) {
            if (activateFreeTrialResponse.goldSearchEndTimeEpoch !== undefined) {
                Browser.Storage.get('user', undefined).then(function (user) {
                    if (user === undefined) {
                        return;
                    }
                    var updatedUser = { userID: user.userID, email: user.email, isGoldSearch: true, goldSearchEndTimeEpoch: activateFreeTrialResponse.goldSearchEndTimeEpoch, isFreeTrialActivated: true };
                    Browser.Storage.set('user', updatedUser);
                });
            }
            RuntimeHandler.postMessageIfPortAvailable(activateFreeTrialResponse, Browser.Runtime.MessageType.ACTIVATE_FREE_TRIAL, _this.runtime);
        });
    };
    RuntimeHandler.prototype.onSettingsModalClick = function () {
        RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendOpenSettingsModalEvent(clientID, userID); });
    };
    RuntimeHandler.prototype.onThemesModalClick = function () {
        RuntimeHandler.getClientIDAndPerformAction(function (clientID, userID) { return GoogleMeasurementProtocol.SendOpenThemesModalEvent(clientID, userID); });
    };
    RuntimeHandler.prototype.onSearchDataReceived = function (autoSort, quizletSet) {
        if (this.duplicateSetCache.has(quizletSet.url) === true) {
            return;
        }
        if (this.state === undefined) {
            return;
        }
        this.state.answers.push(quizletSet);
        if (autoSort === true) {
            this.state.answers = this.state.answers.sort(RuntimeHandler.sort);
        }
        this.state.isLoading = false;
        this.state.noResults = false;
        this.duplicateSetCache.set(quizletSet.url, quizletSet);
        RuntimeHandler.updateStateAndPostMessageIfPortAvailable('state', this.state, Browser.Runtime.MessageType.UPDATE_STATE, this.runtime);
    };
    RuntimeHandler.prototype.onSearchEnd = function (question, clientID, userID, isRightClickToSearch, isGoldSearch, searchStartTimeEpoch) {
        if (this.state === undefined) {
            return;
        }
        if (this.state.reCAPTCHAData !== undefined) {
            return;
        }
        this.state.isLoading = false;
        if (this.state.answers.length === 0) {
            this.state.noResults = true;
        }
        var confidenceScores = this.state.answers.map(function (quizletSet) { return quizletSet.confidence; });
        var timeTakenSeconds = Math.floor((new Date().getTime() - searchStartTimeEpoch) / 1000);
        GoogleMeasurementProtocol.SendSearchEvent(question, clientID, userID, isRightClickToSearch, isGoldSearch, confidenceScores, timeTakenSeconds);
        RuntimeHandler.updateStateAndPostMessageIfPortAvailable('state', this.state, Browser.Runtime.MessageType.UPDATE_STATE, this.runtime);
        Browser.Icon.getInstance().stopSpinning();
    };
    RuntimeHandler.prototype.onSearchError = function (clientID, userID, isGoldSearchEnabled, error) {
        if (this.state === undefined) {
            return;
        }
        if (this.state.reCAPTCHAData !== undefined) {
            return;
        }
        var icon = Browser.Icon.getInstance();
        icon.stopSpinning();
        icon.setBadgeText('!');
        this.state.isLoading = false;
        this.state.noResults = false;
        if (RuntimeHandler.isReCAPTCHAError(error) === true) {
            GoogleMeasurementProtocol.SendReceivedReCAPTCHAEvent(clientID, userID);
            this.state.reCAPTCHAData = { url: error };
        }
        RuntimeHandler.updateStateAndPostMessageIfPortAvailable('state', this.state, Browser.Runtime.MessageType.UPDATE_STATE, this.runtime);
    };
    RuntimeHandler.updateStateAndPostMessageIfPortAvailable = function (key, value, messageType, runtime) {
        Browser.Storage.set(key, value);
        RuntimeHandler.postMessageIfPortAvailable(value, messageType, runtime);
    };
    RuntimeHandler.postMessageIfPortAvailable = function (value, messageType, runtime) {
        if (runtime === undefined || runtime.isDisconnected() === true) {
            return;
        }
        try {
            runtime.sendMessage({ data: value, messageType: messageType });
        }
        catch (_a) { }
    };
    RuntimeHandler.getRandomizedPromotionIfAvailable = function (isGoldSearch) {
        return __awaiter(this, void 0, void 0, function () {
            var shouldDisplayRandomizedPromotion, promotions, randomPromotion, randomIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shouldDisplayRandomizedPromotion = RuntimeHandler.shouldDisplayRandomizedPromotion();
                        if (shouldDisplayRandomizedPromotion === false) {
                            return [2, undefined];
                        }
                        return [4, Browser.Storage.get('promotions', Configuration.DEFAULT_PROMOTIONS)];
                    case 1:
                        promotions = _a.sent();
                        randomPromotion = RuntimeHandler.getRandomizedPromotion(promotions);
                        while (isGoldSearch === true && randomPromotion.goldPromotion === true) {
                            randomPromotion = RuntimeHandler.getRandomizedPromotion(promotions);
                        }
                        randomIndex = RuntimeHandler.getRandomPromotionIndex();
                        return [2, { promotion: randomPromotion, index: randomIndex }];
                }
            });
        });
    };
    RuntimeHandler.getClientIDAndPerformAction = function (action) {
        Promise.all([Browser.Storage.get('id', undefined), Browser.Storage.get('user', undefined)]).then(function (values) {
            var clientID = values[0];
            if (clientID === undefined) {
                return;
            }
            var userID = undefined;
            if (values[1] !== undefined) {
                userID = values[1].userID;
            }
            action(clientID, userID);
        });
    };
    RuntimeHandler.getRandomizedPromotion = function (promotions) {
        var totalWeight = promotions.reduce(function (sum, promotion) { return sum + promotion.weight; }, 0);
        var randomNum = Math.random() * totalWeight;
        for (var _i = 0, promotions_1 = promotions; _i < promotions_1.length; _i++) {
            var promotion = promotions_1[_i];
            randomNum -= promotion.weight;
            if (randomNum <= 0) {
                return promotion;
            }
        }
        return promotions[0];
    };
    RuntimeHandler.getRandomPromotionIndex = function () {
        return Math.floor(Math.random() * 3) + 1;
    };
    RuntimeHandler.shouldDisplayRandomizedPromotion = function () {
        return Math.random() < RuntimeHandler.RANDOM_PROMOTION_CHANCES;
    };
    RuntimeHandler.sort = function (a, b) {
        return b.confidence - a.confidence;
    };
    RuntimeHandler.isReCAPTCHAError = function (error) {
        return error !== undefined && error.includes !== undefined && error.includes('sorry/index');
    };
    RuntimeHandler.RANDOM_PROMOTION_CHANCES = 0.90;
    return RuntimeHandler;
}());
var ApplicationHandler = (function () {
    function ApplicationHandler() {
        this.runtimeHandler = new RuntimeHandler();
        Browser.Runtime.addInstallationEventListenerIfNotExists(this.onInstall.bind(this));
        Browser.Runtime.addUpdateAvailableEventListenerIfNotExists(ApplicationHandler.onUpdateAvailable);
        Browser.Runtime.addConnectionEventListenerIfNotExists(this.onConnection.bind(this));
        Browser.Runtime.setUninstallURL(ApplicationHandler.getUninstallURL());
        Browser.ContextMenu.addDefaultSearchContextMenuListener(this.onRightClickToSearch.bind(this));
    }
    ApplicationHandler.search = function () {
        Server.search();
    };
    ApplicationHandler.prototype.onInstall = function (details) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ApplicationHandler.getApplicationDataBasedOnInstallationOrUpdate(details)];
                    case 1:
                        applicationData = _a.sent();
                        return [4, Browser.Storage.set('id', applicationData.id)];
                    case 2:
                        _a.sent();
                        return [4, Browser.Storage.set('themes', applicationData.themes)];
                    case 3:
                        _a.sent();
                        return [4, Browser.Storage.set('promotions', applicationData.promotions)];
                    case 4:
                        _a.sent();
                        return [4, Browser.Storage.set('state', Configuration.DEFAULT_STATE)];
                    case 5:
                        _a.sent();
                        return [4, Browser.Storage.set('didAgree', false)];
                    case 6:
                        _a.sent();
                        return [4, Browser.Storage.set('isActivationRequired', false)];
                    case 7:
                        _a.sent();
                        return [4, Browser.Storage.set('user', applicationData.user)];
                    case 8:
                        _a.sent();
                        if (!(details.reason === 'install')) return [3, 10];
                        return [4, Browser.Storage.set('settings', ApplicationHandler.getDefaultClientSettings(applicationData.themes))];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        Browser.ContextMenu.createDefaultSearchContextMenu();
                        Browser.ContextMenu.addDefaultSearchContextMenuListener(this.onRightClickToSearch.bind(this));
                        return [2];
                }
            });
        });
    };
    ApplicationHandler.prototype.onConnection = function (port) {
        if (port === undefined || port.name === undefined) {
            return;
        }
        if (port.name !== Browser.Runtime.RUNTIME_CONNECTION_NAME) {
            return;
        }
        Browser.Icon.getInstance().clearBadgeText();
        ApplicationHandler.getLatestApplicationData().then(function (applicationData) {
            Browser.Storage.set('id', applicationData.id);
            Browser.Storage.set('searchConfig', applicationData.searchConfig);
            Browser.Storage.set('themes', applicationData.themes);
            Browser.Storage.set('promotions', applicationData.promotions);
            Browser.Storage.set('isGold', applicationData.isGold);
            Browser.Storage.set('user', applicationData.user);
            if (applicationData.id !== undefined) {
                var userID = undefined;
                if (applicationData.user !== undefined) {
                    userID = applicationData.user.userID;
                }
                GoogleMeasurementProtocol.SendApplicationOpenedEvent(applicationData.id, userID, Server.APPLICATION_VERSION);
            }
            try {
                port.postMessage({ messageType: Browser.Runtime.MessageType.LOAD_APPLICATION_DATA, data: { themes: applicationData.themes, isGold: applicationData.isGold, user: applicationData.user } });
            }
            catch (_a) { }
        });
        this.runtimeHandler.initializePort(port);
    };
    ApplicationHandler.prototype.onRightClickToSearch = function (question) {
        this.runtimeHandler.search(question, true);
    };
    ApplicationHandler.forgotPassword = function (email) {
        return Server.forgotPassword(email);
    };
    ApplicationHandler.login = function (email, password) {
        return Server.login(email, password);
    };
    ApplicationHandler.logout = function () {
        return Server.logout();
    };
    ApplicationHandler.getGoldSearchURL = function () {
        return Server.getGoldSearchURL();
    };
    ApplicationHandler.signUp = function (email, password) {
        return Server.signUp(email, password);
    };
    ApplicationHandler.activateAccount = function (activationCode) {
        return Server.activateAccount(activationCode);
    };
    ApplicationHandler.activateFreeTrial = function () {
        return Server.activateFreeTrial();
    };
    ApplicationHandler.getLatestApplicationData = function () {
        return Server.getLatestApplicationDataAndAuthenticateIfNeeded();
    };
    ApplicationHandler.getApplicationDataBasedOnInstallationOrUpdate = function (details) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (details.reason === 'install' || details.reason === 'update') {
                    return [2, Server.authenticateAndGetApplicationData()];
                }
                return [2, Server.getLatestApplicationDataAndAuthenticateIfNeeded()];
            });
        });
    };
    ApplicationHandler.onUpdateAvailable = function (updateAvailableDetails) {
    };
    ApplicationHandler.getDefaultClientSettings = function (availableThemes) {
        var defaultTheme = availableThemes.find(function (theme) { return theme.isDefault; });
        if (defaultTheme === undefined) {
            throw new Error('No default theme found.');
        }
        var windowPrimaryColor = defaultTheme.primaryColor;
        var windowSecondaryColor = defaultTheme.secondaryColor;
        return { autoSort: true, autoClear: false, confidenceThreshold: 60, windowPrimaryColor: windowPrimaryColor, windowSecondaryColor: windowSecondaryColor };
    };
    ApplicationHandler.getUninstallURL = function () {
        return Server.getUninstallURL();
    };
    return ApplicationHandler;
}());
function main() {
    Browser.Icon.getInstance();
    new ApplicationHandler();
}
main();
