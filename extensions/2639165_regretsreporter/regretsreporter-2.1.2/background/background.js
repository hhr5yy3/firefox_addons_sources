!function(modules, entry, mainEntry, parcelRequireName, globalName) {
  var globalObject = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}, previousRequire = "function" == typeof globalObject.parcelRequire94c2 && globalObject.parcelRequire94c2, cache = previousRequire.cache || {}, nodeRequire = "undefined" != typeof module && "function" == typeof module.require && module.require.bind(module);
  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        var currentRequire = "function" == typeof globalObject.parcelRequire94c2 && globalObject.parcelRequire94c2;
        if (!jumped && currentRequire) return currentRequire(name, !0);
        if (previousRequire) return previousRequire(name, !0);
        if (nodeRequire && "string" == typeof name) return nodeRequire(name);
        var err = new Error("Cannot find module '" + name + "'");
        throw err.code = "MODULE_NOT_FOUND", err;
      }
      localRequire.resolve = function(x) {
        return modules[name][1][x] || x;
      }, localRequire.cache = {};
      var module = cache[name] = new newRequire.Module(name);
      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }
    return cache[name].exports;
    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }
  }
  newRequire.isParcelRequire = !0, newRequire.Module = function(moduleName) {
    this.id = moduleName, this.bundle = newRequire, this.exports = {};
  }, newRequire.modules = modules, newRequire.cache = cache, newRequire.parent = previousRequire, 
  newRequire.register = function(id, exports) {
    modules[id] = [ function(require, module) {
      module.exports = exports;
    }, {} ];
  }, Object.defineProperty(newRequire, "root", {
    get: function() {
      return globalObject.parcelRequire94c2;
    }
  }), globalObject.parcelRequire94c2 = newRequire;
  for (var i = 0; i < entry.length; i++) newRequire(entry[i]);
  var mainExports = newRequire("4Z6dU");
  "object" == typeof exports && "undefined" != typeof module ? module.exports = mainExports : "function" == typeof define && define.amd && define((function() {
    return mainExports;
  }));
}({
  "4Z6dU": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "BackgroundScript", (() => BackgroundScript));
    var _webextensionPolyfillTs = require("webextension-polyfill-ts"), _webext = require("@mozilla/glean/webext"), _webextDefault = parcelHelpers.interopDefault(_webext), _browser = require("@sentry/browser"), _messages = require("../common/messages"), _common = require("../common/common"), _uuid = require("uuid"), _main = require("../telemetry/generated/main"), _metadata = require("../telemetry/generated/metadata"), _videoData = require("../telemetry/generated/videoData"), _regretDetails = require("../telemetry/generated/regretDetails"), _pings = require("../telemetry/generated/pings"), _links = require("../common/links");
    window.browser = _webextensionPolyfillTs.browser;
    function log(...args) {
      false;
    }
    class BackgroundScript {
      async asyncConstructor() {
        this.attachInstallHook(), await this.initializeExtension(), await this.initializeSentry(), 
        await this.updateBadgeIcon(), this.attachRequestHook(), this.attachMessageListener();
      }
      async initializeExtension() {
        const installId = await _common.installationId.acquire(), experimentArmValue = await _common.experimentArm.acquire(_common.ExperimentArm.OptOut), feedbackUiVariantValue = await _common.feedbackUiVariant.acquire();
        await _common.videosPlayedSet.acquire();
        const enableUploads = experimentArmValue !== _common.ExperimentArm.OptOut;
        _webextDefault.default.initialize("regrets.reporter.ucs", enableUploads, {
          serverEndpoint: "https://incoming.telemetry.mozilla.org",
          appBuild: "2.1.1",
          appDisplayVersion: "2.1.1"
        }), _webextDefault.default.setLogPings(false), _metadata.installationId.set(installId), 
        _metadata.experimentArm.set(experimentArmValue), _metadata.feedbackUiVariant.set(feedbackUiVariantValue);
      }
      async updateBadgeIcon() {
        const icon = await _common.studyResultsClicked.acquire() ? "assets/icon/icon-toolbar-active.svg.38x38.png" : "assets/icon/icon-toolbar-badge.svg.38x38.png";
        await _webextensionPolyfillTs.browser.browserAction.setIcon({
          path: icon
        });
      }
      async initializeSentry() {
        const installationIdValue = await _common.installationId.acquire(), experimentArmValue = await _common.experimentArm.acquire();
        _browser.init({
          enabled: await _common.errorReportingEnabled.acquire(),
          dsn: "https://74118d6b39f0403dab36358a789c25e6@o1069899.ingest.sentry.io/4503970708914176",
          release: "2.1.1",
          integrations: function(integrations) {
            return integrations.filter((function(integration) {
              return "Breadcrumbs" !== integration.name;
            }));
          }
        }), _browser.configureScope((scope => {
          scope.setUser({
            id: installationIdValue
          }), scope.setTags({
            experimentArm: experimentArmValue,
            label: "v2"
          });
        }));
      }
      async toggleErrorReporting(enabled) {
        _browser.getCurrentHub().getClient().getOptions().enabled = enabled, await _common.errorReportingEnabled.set(enabled);
      }
      attachInstallHook() {
        _webextensionPolyfillTs.browser.runtime.onInstalled.addListener((async details => {
          if (await _common.installReason.set(details.reason), "browser_update" !== details.reason && "chrome_update" !== details.reason) {
            if ("update" === details.reason) {
              const [major] = details.previousVersion.split("."), majorVersion = parseInt(major, 10);
              if (console.log(majorVersion), majorVersion > 1) return;
            }
            _webextensionPolyfillTs.browser.tabs.create({
              url: "get-started/index.html",
              active: !0
            });
          }
        }));
      }
      attachRequestHook() {
        _webextensionPolyfillTs.browser.webRequest.onSendHeaders.addListener((details => {
          log((details.url, details.tabId)), log(details.requestHeaders);
          const userAuth = function(details) {
            const key = new URL(details.url).searchParams.get("key");
            if (key) {
              const headers = Object.fromEntries(details.requestHeaders.map((h => [ h.name, h.value ])));
              if ("Authorization" in headers) return {
                key: key,
                headers: headers
              };
            }
          }(details);
          userAuth && (log(), this.authRecorded = !0, async function(message) {
            const tabs = await _webextensionPolyfillTs.browser.tabs.query({
              currentWindow: !0,
              active: !0
            });
            for (const tab of tabs) try {
              await _webextensionPolyfillTs.browser.tabs.sendMessage(tab.id, message);
            } catch (e) {
              log();
            }
          }({
            type: _messages.EventType.AuthRecorded,
            keyId: userAuth.key,
            headers: userAuth.headers
          }));
        }), {
          urls: [ "*://*.youtube.com/youtubei/v1/*" ],
          types: [ "xmlhttprequest" ]
        }, [ "requestHeaders" ]);
      }
      async onVideoViewedEvent(message, tabId) {
        log();
        const playedVideos = await _common.videosPlayedSet.acquire();
        playedVideos[message.data.id] = !0, await _common.videosPlayedSet.set(playedVideos);
        const playedVideoCount = Object.keys(playedVideos).length;
        this.videoIndex[message.data.id] = {
          tabId: tabId,
          ...message.data
        }, await this.pushEvent(_messages.EventType.VideoViewed, "VideoViewed", tabId, message.data), 
        _main.videoPlayed.record({
          videos_played: playedVideoCount
        });
      }
      attachAlarmListener() {
        _webextensionPolyfillTs.browser.alarms.onAlarm.addListener((async ({name: name}) => {
          log(), "surveyFollowup" === name && await this.updateBadgeIcon();
        }));
      }
      attachMessageListener() {
        _webextensionPolyfillTs.browser.runtime.onMessage.addListener((async (message, sender) => {
          log();
          const tabId = sender.tab.id;
          return message.type === _messages.EventType.VideoViewed ? this.onVideoViewedEvent(message, tabId) : message.type === _messages.EventType.VideoBatchRecorded ? this.onVideoBatchRecorded(message, tabId) : message.type === _messages.EventType.RegretDetailsSubmitted ? this.onRegretDetailsSubmitted(message, tabId) : message.type === _messages.EventType.NativeFeedbackSent ? this.onNativeFeedbackSent(message, tabId) : message.type === _messages.EventType.RegretVideo ? this.onRegretVideoEvent(message, tabId) : void 0;
        }));
      }
      async onNativeFeedbackSent(message, tabId) {
        if (await this.dataCollectionDisabled()) return;
        const video = this.videoIndex[message.videoId], videoDataId = recordVideoData(video || {
          id: message.videoId
        });
        return _main.nativeUiInteraction.record({
          feedback_type: message.feedbackType,
          video_data_id: videoDataId
        }), _pings.mainEvents.submit(), this.pushEvent(_messages.EventType.NativeFeedbackSent, message.feedbackType, tabId, {
          videoId: message.videoId,
          feedbackType: message.feedbackType
        });
      }
      async dataCollectionDisabled() {
        return await _common.experimentArm.acquire() === _common.ExperimentArm.OptOut;
      }
      async onRegretDetailsSubmitted(message, tabId) {
        if (await this.dataCollectionDisabled()) return;
        const video = this.videoIndex[message.videoId], videoDataId = recordVideoData(video || {
          id: message.videoId
        });
        return _regretDetails.videoDataId.set(videoDataId), _regretDetails.feedbackText.set(message.feedbackText), 
        _pings.regretDetails.submit(), this.pushEvent(_messages.EventType.RegretDetailsSubmitted, "RegretDetailsSubmitted", tabId, {
          videoId: message.videoId,
          feedbackText: message.feedbackText
        });
      }
      async onRegretVideoEvent(message, tabId) {
        const cohort = await _common.experimentArm.acquire();
        let feedbackToken;
        message.triggerOnboarding && await _webextensionPolyfillTs.browser.tabs.create({
          url: _links.onboardingUrl
        }), log(message.videoId);
        const feedbackType = function(arm) {
          switch (arm) {
           case _common.ExperimentArm.OptOut:
           case _common.ExperimentArm.DislikeAction:
            return _common.FeedbackType.Dislike;

           case _common.ExperimentArm.NotInterestedAction:
            return _common.FeedbackType.NotInterested;

           case _common.ExperimentArm.NoRecommendAction:
            return _common.FeedbackType.NoRecommend;

           case _common.ExperimentArm.RemoveFromHistory:
            return _common.FeedbackType.RemoveFromHistory;
          }
          return null;
        }(cohort), actionRequiresToken = feedbackType === _common.FeedbackType.NotInterested || feedbackType === _common.FeedbackType.NoRecommend, video = this.videoIndex[message.videoId];
        if (video || !actionRequiresToken) {
          if (log((message.videoId, null == video || video.tabId)), feedbackType === _common.FeedbackType.NotInterested && (feedbackToken = video.tokens.notInterested), 
          feedbackType === _common.FeedbackType.NoRecommend && (feedbackToken = video.tokens.dontRecommend), 
          !await this.dataCollectionDisabled()) {
            const videoDataId = recordVideoData(video || {
              id: message.videoId
            });
            _main.regretAction.record({
              feedback_type: feedbackType || "none",
              video_data_id: videoDataId
            }), _pings.mainEvents.submit(), await this.pushEvent(_messages.EventType.VideoRegretted, feedbackType, tabId, video);
          }
          return await _common.dispatchEventToTab(tabId, {
            type: _messages.EventType.SendVideoFeedback,
            feedbackType: feedbackType,
            feedbackToken: feedbackToken,
            videoId: message.videoId
          });
        }
        log(message.videoId);
      }
      async onVideoBatchRecorded(message, tabId) {
        if (log(), !await this.dataCollectionDisabled()) {
          for (const videoData of message.data) {
            this.videoIndex[videoData.id] = {
              tabId: tabId,
              ...videoData
            }, this.videoTokens[videoData.id] = {
              ...this.videoTokens[videoData.id],
              ...videoData.tokens
            }, await this.pushEvent(_messages.EventType.VideoBatchRecorded, message.batchType, tabId, videoData);
            const videoDataId = recordVideoData(videoData);
            _main.videoRecommended.record({
              video_data_id: videoDataId,
              recommendation_type: message.batchType
            });
          }
          _pings.mainEvents.submit();
        }
      }
      sendDataDeletionRequest() {
        _common.experimentArm.set(_common.ExperimentArm.OptOut), _webextDefault.default.setUploadEnabled(!1);
      }
      async onOnboardingCompleted(experimentOptedIn) {
        if (!experimentOptedIn) return;
        _webextDefault.default.setUploadEnabled(!0);
        const experimentArmValue = await _common.experimentArm.reset(), installId = await _common.installationId.acquire(), feedbackUiVariantValue = await _common.feedbackUiVariant.acquire();
        _metadata.installationId.set(installId), _metadata.experimentArm.set(experimentArmValue), 
        _metadata.feedbackUiVariant.set(feedbackUiVariantValue), _main.onboardingCompleted.record(), 
        _pings.mainEvents.submit();
      }
      async initializeSurveyAlarm(create = !1) {
        this.attachAlarmListener();
        let when = await _common.surveyReminderDate.acquire();
        log();
        const now = +new Date;
        return create && null === when && (when = 18144e5 + now, await _common.surveyReminderDate.set(when)), 
        when && _webextensionPolyfillTs.browser.alarms.create("surveyFollowup", {
          when: when
        }), when;
      }
      async onSurveyClick() {}
      async onReminderSurveyClick() {
        await _common.allSurveysCompleted.set(!0), await this.updateBadgeIcon();
      }
      async onStudyResultsClick() {
        await _common.studyResultsClicked.set(!0), await this.updateBadgeIcon();
      }
      async updateFeedbackUiVariant(variant) {
        await _common.feedbackUiVariant.set(variant), _metadata.feedbackUiVariant.set(variant), 
        _pings.mainEvents.submit();
      }
      async updateExperimentArm(arm) {
        await _common.experimentArm.set(arm), _metadata.experimentArm.set(arm), _pings.mainEvents.submit();
      }
      async getUniquePlayedVideosCount() {
        const playedVideos = await _common.videosPlayedSet.acquire();
        return Object.keys(playedVideos).length;
      }
      async pushEvent(type, subtype, tabId, payload) {
        this.events.unshift({
          id: _uuid.v4(),
          timestamp: new Date,
          counter: await this.getUniquePlayedVideosCount(),
          type: type,
          tabId: tabId,
          subtype: subtype,
          payload: payload
        });
      }
      constructor() {
        this.authRecorded = !1, this.events = [], this.videoTokens = {}, this.videoIndex = {}, 
        this.asyncConstructor();
      }
    }
    function recordVideoData(data) {
      var ref;
      const videoDataId = _uuid.v4(), payload = {
        uuid: videoDataId,
        id: data.id,
        title: data.title,
        viewCount: data.views,
        channelId: null === (ref = data.channel) || void 0 === ref ? void 0 : ref.url,
        description: data.description
      };
      return Object.keys(payload).forEach((function(key) {
        const value = payload[key];
        void 0 !== value && _videoData[key].set(value);
      })), _pings.videoData.submit(), videoDataId;
    }
    window.bg = new BackgroundScript;
  }, {
    "webextension-polyfill-ts": "g4Zvj",
    "@mozilla/glean/webext": "eaTKX",
    "@sentry/browser": "6JKvf",
    "../common/messages": "8QxHi",
    "../common/common": "jKOy4",
    uuid: "81aaC",
    "../telemetry/generated/main": "1smIR",
    "../telemetry/generated/metadata": "dlnhC",
    "../telemetry/generated/videoData": "8Z6Mu",
    "../telemetry/generated/regretDetails": "9ZqxO",
    "../telemetry/generated/pings": "bGB7L",
    "../common/links": "4v6Gb",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  g4Zvj: [ function(require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.browser = require("webextension-polyfill");
  }, {
    "webextension-polyfill": "curLV"
  } ],
  curLV: [ function(require, module, exports) {
    !function(global, factory) {
      if ("function" == typeof define && define.amd) define("webextension-polyfill", [ "module" ], factory); else if (void 0 !== exports) factory(module); else {
        var mod = {
          exports: {}
        };
        factory(mod), global.browser = mod.exports;
      }
    }("undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : this, (function(module) {
      "use strict";
      if ("undefined" == typeof browser || Object.getPrototypeOf(browser) !== Object.prototype) {
        const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.", SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)", wrapAPIs = extensionAPIs => {
          const apiMetadata = {
            alarms: {
              clear: {
                minArgs: 0,
                maxArgs: 1
              },
              clearAll: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            bookmarks: {
              create: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getChildren: {
                minArgs: 1,
                maxArgs: 1
              },
              getRecent: {
                minArgs: 1,
                maxArgs: 1
              },
              getSubTree: {
                minArgs: 1,
                maxArgs: 1
              },
              getTree: {
                minArgs: 0,
                maxArgs: 0
              },
              move: {
                minArgs: 2,
                maxArgs: 2
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              removeTree: {
                minArgs: 1,
                maxArgs: 1
              },
              search: {
                minArgs: 1,
                maxArgs: 1
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            },
            browserAction: {
              disable: {
                minArgs: 0,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              enable: {
                minArgs: 0,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              getBadgeBackgroundColor: {
                minArgs: 1,
                maxArgs: 1
              },
              getBadgeText: {
                minArgs: 1,
                maxArgs: 1
              },
              getPopup: {
                minArgs: 1,
                maxArgs: 1
              },
              getTitle: {
                minArgs: 1,
                maxArgs: 1
              },
              openPopup: {
                minArgs: 0,
                maxArgs: 0
              },
              setBadgeBackgroundColor: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setBadgeText: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setIcon: {
                minArgs: 1,
                maxArgs: 1
              },
              setPopup: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setTitle: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              }
            },
            browsingData: {
              remove: {
                minArgs: 2,
                maxArgs: 2
              },
              removeCache: {
                minArgs: 1,
                maxArgs: 1
              },
              removeCookies: {
                minArgs: 1,
                maxArgs: 1
              },
              removeDownloads: {
                minArgs: 1,
                maxArgs: 1
              },
              removeFormData: {
                minArgs: 1,
                maxArgs: 1
              },
              removeHistory: {
                minArgs: 1,
                maxArgs: 1
              },
              removeLocalStorage: {
                minArgs: 1,
                maxArgs: 1
              },
              removePasswords: {
                minArgs: 1,
                maxArgs: 1
              },
              removePluginData: {
                minArgs: 1,
                maxArgs: 1
              },
              settings: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            commands: {
              getAll: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            contextMenus: {
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              removeAll: {
                minArgs: 0,
                maxArgs: 0
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            },
            cookies: {
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getAll: {
                minArgs: 1,
                maxArgs: 1
              },
              getAllCookieStores: {
                minArgs: 0,
                maxArgs: 0
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            devtools: {
              inspectedWindow: {
                eval: {
                  minArgs: 1,
                  maxArgs: 2,
                  singleCallbackArg: !1
                }
              },
              panels: {
                create: {
                  minArgs: 3,
                  maxArgs: 3,
                  singleCallbackArg: !0
                },
                elements: {
                  createSidebarPane: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                }
              }
            },
            downloads: {
              cancel: {
                minArgs: 1,
                maxArgs: 1
              },
              download: {
                minArgs: 1,
                maxArgs: 1
              },
              erase: {
                minArgs: 1,
                maxArgs: 1
              },
              getFileIcon: {
                minArgs: 1,
                maxArgs: 2
              },
              open: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              pause: {
                minArgs: 1,
                maxArgs: 1
              },
              removeFile: {
                minArgs: 1,
                maxArgs: 1
              },
              resume: {
                minArgs: 1,
                maxArgs: 1
              },
              search: {
                minArgs: 1,
                maxArgs: 1
              },
              show: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              }
            },
            extension: {
              isAllowedFileSchemeAccess: {
                minArgs: 0,
                maxArgs: 0
              },
              isAllowedIncognitoAccess: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            history: {
              addUrl: {
                minArgs: 1,
                maxArgs: 1
              },
              deleteAll: {
                minArgs: 0,
                maxArgs: 0
              },
              deleteRange: {
                minArgs: 1,
                maxArgs: 1
              },
              deleteUrl: {
                minArgs: 1,
                maxArgs: 1
              },
              getVisits: {
                minArgs: 1,
                maxArgs: 1
              },
              search: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            i18n: {
              detectLanguage: {
                minArgs: 1,
                maxArgs: 1
              },
              getAcceptLanguages: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            identity: {
              launchWebAuthFlow: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            idle: {
              queryState: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            management: {
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              },
              getSelf: {
                minArgs: 0,
                maxArgs: 0
              },
              setEnabled: {
                minArgs: 2,
                maxArgs: 2
              },
              uninstallSelf: {
                minArgs: 0,
                maxArgs: 1
              }
            },
            notifications: {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              create: {
                minArgs: 1,
                maxArgs: 2
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              },
              getPermissionLevel: {
                minArgs: 0,
                maxArgs: 0
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            },
            pageAction: {
              getPopup: {
                minArgs: 1,
                maxArgs: 1
              },
              getTitle: {
                minArgs: 1,
                maxArgs: 1
              },
              hide: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setIcon: {
                minArgs: 1,
                maxArgs: 1
              },
              setPopup: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setTitle: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              show: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              }
            },
            permissions: {
              contains: {
                minArgs: 1,
                maxArgs: 1
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              request: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            runtime: {
              getBackgroundPage: {
                minArgs: 0,
                maxArgs: 0
              },
              getPlatformInfo: {
                minArgs: 0,
                maxArgs: 0
              },
              openOptionsPage: {
                minArgs: 0,
                maxArgs: 0
              },
              requestUpdateCheck: {
                minArgs: 0,
                maxArgs: 0
              },
              sendMessage: {
                minArgs: 1,
                maxArgs: 3
              },
              sendNativeMessage: {
                minArgs: 2,
                maxArgs: 2
              },
              setUninstallURL: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            sessions: {
              getDevices: {
                minArgs: 0,
                maxArgs: 1
              },
              getRecentlyClosed: {
                minArgs: 0,
                maxArgs: 1
              },
              restore: {
                minArgs: 0,
                maxArgs: 1
              }
            },
            storage: {
              local: {
                clear: {
                  minArgs: 0,
                  maxArgs: 0
                },
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getBytesInUse: {
                  minArgs: 0,
                  maxArgs: 1
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              managed: {
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getBytesInUse: {
                  minArgs: 0,
                  maxArgs: 1
                }
              },
              sync: {
                clear: {
                  minArgs: 0,
                  maxArgs: 0
                },
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getBytesInUse: {
                  minArgs: 0,
                  maxArgs: 1
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1
                }
              }
            },
            tabs: {
              captureVisibleTab: {
                minArgs: 0,
                maxArgs: 2
              },
              create: {
                minArgs: 1,
                maxArgs: 1
              },
              detectLanguage: {
                minArgs: 0,
                maxArgs: 1
              },
              discard: {
                minArgs: 0,
                maxArgs: 1
              },
              duplicate: {
                minArgs: 1,
                maxArgs: 1
              },
              executeScript: {
                minArgs: 1,
                maxArgs: 2
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getCurrent: {
                minArgs: 0,
                maxArgs: 0
              },
              getZoom: {
                minArgs: 0,
                maxArgs: 1
              },
              getZoomSettings: {
                minArgs: 0,
                maxArgs: 1
              },
              goBack: {
                minArgs: 0,
                maxArgs: 1
              },
              goForward: {
                minArgs: 0,
                maxArgs: 1
              },
              highlight: {
                minArgs: 1,
                maxArgs: 1
              },
              insertCSS: {
                minArgs: 1,
                maxArgs: 2
              },
              move: {
                minArgs: 2,
                maxArgs: 2
              },
              query: {
                minArgs: 1,
                maxArgs: 1
              },
              reload: {
                minArgs: 0,
                maxArgs: 2
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              removeCSS: {
                minArgs: 1,
                maxArgs: 2
              },
              sendMessage: {
                minArgs: 2,
                maxArgs: 3
              },
              setZoom: {
                minArgs: 1,
                maxArgs: 2
              },
              setZoomSettings: {
                minArgs: 1,
                maxArgs: 2
              },
              update: {
                minArgs: 1,
                maxArgs: 2
              }
            },
            topSites: {
              get: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            webNavigation: {
              getAllFrames: {
                minArgs: 1,
                maxArgs: 1
              },
              getFrame: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            webRequest: {
              handlerBehaviorChanged: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            windows: {
              create: {
                minArgs: 0,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 2
              },
              getAll: {
                minArgs: 0,
                maxArgs: 1
              },
              getCurrent: {
                minArgs: 0,
                maxArgs: 1
              },
              getLastFocused: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            }
          };
          if (0 === Object.keys(apiMetadata).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
          class DefaultWeakMap extends WeakMap {
            constructor(createItem, items) {
              super(items), this.createItem = createItem;
            }
            get(key) {
              return this.has(key) || this.set(key, this.createItem(key)), super.get(key);
            }
          }
          const makeCallback = (promise, metadata) => (...callbackArgs) => {
            extensionAPIs.runtime.lastError ? promise.reject(new Error(extensionAPIs.runtime.lastError.message)) : metadata.singleCallbackArg || callbackArgs.length <= 1 && !1 !== metadata.singleCallbackArg ? promise.resolve(callbackArgs[0]) : promise.resolve(callbackArgs);
          }, pluralizeArguments = numArgs => 1 == numArgs ? "argument" : "arguments", wrapMethod = (target, method, wrapper) => new Proxy(method, {
            apply: (targetMethod, thisObj, args) => wrapper.call(thisObj, target, ...args)
          });
          let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
          const wrapObject = (target, wrappers = {}, metadata = {}) => {
            let cache = Object.create(null), handlers = {
              has: (proxyTarget, prop) => prop in target || prop in cache,
              get(proxyTarget, prop, receiver) {
                if (prop in cache) return cache[prop];
                if (!(prop in target)) return;
                let value1 = target[prop];
                if ("function" == typeof value1) if ("function" == typeof wrappers[prop]) value1 = wrapMethod(target, target[prop], wrappers[prop]); else if (hasOwnProperty(metadata, prop)) {
                  let wrapper = ((name, metadata) => function(target, ...args) {
                    if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                    if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                    return new Promise(((resolve, reject) => {
                      if (metadata.fallbackToNoCallback) try {
                        target[name](...args, makeCallback({
                          resolve: resolve,
                          reject: reject
                        }, metadata));
                      } catch (cbError) {
                        console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError), 
                        target[name](...args), metadata.fallbackToNoCallback = !1, metadata.noCallback = !0, 
                        resolve();
                      } else metadata.noCallback ? (target[name](...args), resolve()) : target[name](...args, makeCallback({
                        resolve: resolve,
                        reject: reject
                      }, metadata));
                    }));
                  })(prop, metadata[prop]);
                  value1 = wrapMethod(target, target[prop], wrapper);
                } else value1 = value1.bind(target); else if ("object" == typeof value1 && null !== value1 && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) value1 = wrapObject(value1, wrappers[prop], metadata[prop]); else {
                  if (!hasOwnProperty(metadata, "*")) return Object.defineProperty(cache, prop, {
                    configurable: !0,
                    enumerable: !0,
                    get: () => target[prop],
                    set(value) {
                      target[prop] = value;
                    }
                  }), value1;
                  value1 = wrapObject(value1, wrappers[prop], metadata["*"]);
                }
                return cache[prop] = value1, value1;
              },
              set: (proxyTarget, prop, value, receiver) => (prop in cache ? cache[prop] = value : target[prop] = value, 
              !0),
              defineProperty: (proxyTarget, prop, desc) => Reflect.defineProperty(cache, prop, desc),
              deleteProperty: (proxyTarget, prop) => Reflect.deleteProperty(cache, prop)
            }, proxyTarget = Object.create(target);
            return new Proxy(proxyTarget, handlers);
          }, wrapEvent = wrapperMap => ({
            addListener(target, listener, ...args) {
              target.addListener(wrapperMap.get(listener), ...args);
            },
            hasListener: (target, listener) => target.hasListener(wrapperMap.get(listener)),
            removeListener(target, listener) {
              target.removeListener(wrapperMap.get(listener));
            }
          }), onRequestFinishedWrappers = new DefaultWeakMap((listener => "function" != typeof listener ? listener : function(req) {
            const wrappedReq = wrapObject(req, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            listener(wrappedReq);
          }));
          let loggedSendResponseDeprecationWarning = !1;
          const onMessageWrappers = new DefaultWeakMap((listener => "function" != typeof listener ? listener : function(message, sender, sendResponse) {
            let wrappedSendResponse, result, didCallSendResponse = !1, sendResponsePromise = new Promise((resolve => {
              wrappedSendResponse = function(response) {
                loggedSendResponseDeprecationWarning || (console.warn(SEND_RESPONSE_DEPRECATION_WARNING, (new Error).stack), 
                loggedSendResponseDeprecationWarning = !0), didCallSendResponse = !0, resolve(response);
              };
            }));
            try {
              result = listener(message, sender, wrappedSendResponse);
            } catch (err) {
              result = Promise.reject(err);
            }
            const isResultThenable = !0 !== result && ((value = result) && "object" == typeof value && "function" == typeof value.then);
            var value;
            if (!0 !== result && !isResultThenable && !didCallSendResponse) return !1;
            const sendPromisedResult = promise => {
              promise.then((msg => {
                sendResponse(msg);
              }), (error => {
                let message1;
                message1 = error && (error instanceof Error || "string" == typeof error.message) ? error.message : "An unexpected error occurred", 
                sendResponse({
                  __mozWebExtensionPolyfillReject__: !0,
                  message: message1
                });
              })).catch((err => {
                console.error("Failed to send onMessage rejected reply", err);
              }));
            };
            return sendPromisedResult(isResultThenable ? result : sendResponsePromise), !0;
          })), wrappedSendMessageCallback = ({reject: reject, resolve: resolve}, reply) => {
            extensionAPIs.runtime.lastError ? extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE ? resolve() : reject(new Error(extensionAPIs.runtime.lastError.message)) : reply && reply.__mozWebExtensionPolyfillReject__ ? reject(new Error(reply.message)) : resolve(reply);
          }, wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
            if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
            if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
            return new Promise(((resolve, reject) => {
              const wrappedCb = wrappedSendMessageCallback.bind(null, {
                resolve: resolve,
                reject: reject
              });
              args.push(wrappedCb), apiNamespaceObj.sendMessage(...args);
            }));
          }, staticWrappers = {
            devtools: {
              network: {
                onRequestFinished: wrapEvent(onRequestFinishedWrappers)
              }
            },
            runtime: {
              onMessage: wrapEvent(onMessageWrappers),
              onMessageExternal: wrapEvent(onMessageWrappers),
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          }, settingMetadata = {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          };
          return apiMetadata.privacy = {
            network: {
              "*": settingMetadata
            },
            services: {
              "*": settingMetadata
            },
            websites: {
              "*": settingMetadata
            }
          }, wrapObject(extensionAPIs, staticWrappers, apiMetadata);
        };
        if ("object" != typeof chrome || !chrome || !chrome.runtime || !chrome.runtime.id) throw new Error("This script should only be loaded in a browser extension.");
        module.exports = wrapAPIs(chrome);
      } else module.exports = browser;
    }));
  }, {} ],
  eaTKX: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "ErrorType", (() => _errorTypeJs.ErrorType)), 
    parcelHelpers.export(exports, "Uploader", (() => _uploaderJsDefault.default)), parcelHelpers.export(exports, "UploadResult", (() => _uploaderJs.UploadResult)), 
    parcelHelpers.export(exports, "UploadResultStatus", (() => _uploaderJs.UploadResultStatus));
    var _indexJs = require("../platform/browser/webext/index.js"), _indexJsDefault = parcelHelpers.interopDefault(_indexJs), _baseJs = require("./base.js"), _baseJsDefault = parcelHelpers.interopDefault(_baseJs), _errorTypeJs = require("../core/error/error_type.js"), _uploaderJs = require("../core/upload/uploader.js"), _uploaderJsDefault = parcelHelpers.interopDefault(_uploaderJs);
    exports.default = _baseJsDefault.default(_indexJsDefault.default);
  }, {
    "../platform/browser/webext/index.js": "dCcly",
    "./base.js": "9kL5O",
    "../core/error/error_type.js": "euvNM",
    "../core/upload/uploader.js": "GM0rQ",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  dCcly: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _storageJs = require("./storage.js"), _storageJsDefault = parcelHelpers.interopDefault(_storageJs), _uploaderJs = require("../uploader.js"), _uploaderJsDefault = parcelHelpers.interopDefault(_uploaderJs), _platformInfoJs = require("./platform_info.js"), _platformInfoJsDefault = parcelHelpers.interopDefault(_platformInfoJs);
    const WebExtPlatform = {
      Storage: _storageJsDefault.default,
      uploader: _uploaderJsDefault.default,
      info: _platformInfoJsDefault.default,
      timer: {
        setTimeout: setTimeout,
        clearTimeout: clearTimeout
      },
      name: "webext"
    };
    exports.default = WebExtPlatform;
  }, {
    "./storage.js": "b6b1g",
    "../uploader.js": "dpBKu",
    "./platform_info.js": "dxbe6",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  b6b1g: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _logJs = require("../../../core/log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _utilsJs = require("../../../core/storage/utils.js"), _utilsJs1 = require("../../../core/utils.js");
    function stripNulls(query) {
      for (const key in query) {
        const curr = query[key];
        null === curr && delete query[key], _utilsJs1.isObject(curr) && (0 === Object.keys(curr).length ? delete query[key] : stripNulls(curr));
      }
    }
    exports.default = class {
      constructor(rootKey) {
        if ("undefined" == typeof browser) throw Error("The web extensions store should only be user in a browser extension context.\n        If running is a browser different from Firefox, make sure you have installed\n        the webextension-polyfill peer dependency. To do so, run `npm i webextension-polyfill`.");
        this.store = browser.storage.local, this.rootKey = rootKey, this.logTag = `platform.webext.Storage.${rootKey}`;
      }
      async _getWholeStore() {
        return (await this.store.get({
          [this.rootKey]: {}
        }))[this.rootKey];
      }
      _buildQuery(index) {
        let query = null;
        for (const key of [ this.rootKey, ...index ].reverse()) query = {
          [key]: query
        };
        return query;
      }
      async _buildQueryFromStore(transformFn) {
        const store = await this._getWholeStore();
        return {
          [this.rootKey]: transformFn(store)
        };
      }
      async get(index = []) {
        const query = this._buildQuery(index), response = await this.store.get(query);
        if (stripNulls(response), response) return _utilsJs1.isJSONValue(response) ? _utilsJs1.isObject(response) ? _utilsJs.getValueFromNestedObject(response, [ this.rootKey, ...index ]) : response : void _logJsDefault.default(this.logTag, [ `Unexpected value found in storage for index ${JSON.stringify(index)}. Ignoring.\n        ${JSON.stringify(response, null, 2)}` ], _logJs.LoggingLevel.Warn);
      }
      async update(index, transformFn) {
        if (0 === index.length) throw Error("The index must contain at least one property to update.");
        const query = await this._buildQueryFromStore((store => _utilsJs.updateNestedObject(store, index, transformFn)));
        return this.store.set(query);
      }
      async delete(index) {
        try {
          const query = await this._buildQueryFromStore((store => _utilsJs.deleteKeyFromNestedObject(store, index)));
          return this.store.set(query);
        } catch (e) {
          _logJsDefault.default(this.logTag, [ `Error attempting to delete key ${index.toString()} from storage. Ignoring.`, e ], _logJs.LoggingLevel.Warn);
        }
      }
    };
  }, {
    "../../../core/log.js": "l3qBW",
    "../../../core/storage/utils.js": "fG8Uh",
    "../../../core/utils.js": "gSLA7",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  l3qBW: [ function(require, module, exports) {
    var LoggingLevel, LoggingLevel1, parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "LoggingLevel", (() => LoggingLevel)), 
    (LoggingLevel1 = LoggingLevel || (LoggingLevel = {})).Debug = "debug", LoggingLevel1.Info = "info", 
    LoggingLevel1.Warn = "warn", LoggingLevel1.Error = "error", LoggingLevel1.Trace = "trace", 
    exports.default = function(modulePath, message, level = LoggingLevel.Debug) {
      const prefix = `(Glean.${modulePath})`;
      Array.isArray(message) ? console[level](prefix, ...message) : console[level](prefix, message);
    };
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "9Dmg7": [ function(require, module, exports) {
    exports.interopDefault = function(a) {
      return a && a.__esModule ? a : {
        default: a
      };
    }, exports.defineInteropFlag = function(a) {
      Object.defineProperty(a, "__esModule", {
        value: !0
      });
    }, exports.exportAll = function(source, dest) {
      return Object.keys(source).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (key in dest && dest[key] === source[key] || Object.defineProperty(dest, key, {
          enumerable: !0,
          get: function() {
            return source[key];
          }
        }));
      })), dest;
    }, exports.export = function(dest, destName, get) {
      Object.defineProperty(dest, destName, {
        enumerable: !0,
        get: get
      });
    };
  }, {} ],
  fG8Uh: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "getValueFromNestedObject", (() => getValueFromNestedObject)), 
    parcelHelpers.export(exports, "updateNestedObject", (() => updateNestedObject)), 
    parcelHelpers.export(exports, "deleteKeyFromNestedObject", (() => deleteKeyFromNestedObject));
    var _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _utilsJs = require("../utils.js");
    function getValueFromNestedObject(obj, index) {
      if (0 === index.length) throw Error("The index must contain at least one property to get.");
      let target = obj;
      for (const key of index) {
        if (!_utilsJs.isObject(target) || !(key in target)) return;
        {
          const temp = target[key];
          _utilsJs.isJSONValue(temp) && (target = temp);
        }
      }
      return target;
    }
    function updateNestedObject(obj, index, transformFn) {
      if (0 === index.length) throw Error("The index must contain at least one property to update.");
      const returnObject = {
        ...obj
      };
      let target = returnObject;
      for (const key of index.slice(0, index.length - 1)) _utilsJs.isObject(target[key]) || (target[key] = {}), 
      target = target[key];
      const finalKey = index[index.length - 1], current = target[finalKey];
      try {
        const value = transformFn(current);
        return target[finalKey] = value, returnObject;
      } catch (e) {
        return _logJsDefault.default("core.Storage.Utils", [ "Error while transforming stored value. Ignoring old value.", e ], _logJs.LoggingLevel.Error), 
        target[finalKey] = transformFn(void 0), returnObject;
      }
    }
    function deleteKeyFromNestedObject(obj, index) {
      if (0 === index.length) return {};
      const returnObject = {
        ...obj
      };
      let target = returnObject;
      for (const key of index.slice(0, index.length - 1)) {
        const value = target[key];
        if (!_utilsJs.isObject(value)) throw Error(`Attempted to delete an entry from an inexistent index: ${JSON.stringify(index)}.`);
        target = value;
      }
      return delete target[index[index.length - 1]], returnObject;
    }
  }, {
    "../log.js": "l3qBW",
    "../utils.js": "gSLA7",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  gSLA7: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "isJSONValue", (() => isJSONValue)), 
    parcelHelpers.export(exports, "isObject", (() => isObject)), parcelHelpers.export(exports, "isUndefined", (() => isUndefined)), 
    parcelHelpers.export(exports, "isString", (() => isString)), parcelHelpers.export(exports, "isBoolean", (() => isBoolean)), 
    parcelHelpers.export(exports, "isNumber", (() => isNumber)), parcelHelpers.export(exports, "isInteger", (() => isInteger)), 
    parcelHelpers.export(exports, "sanitizeApplicationId", (() => sanitizeApplicationId)), 
    parcelHelpers.export(exports, "validateURL", (() => validateURL)), parcelHelpers.export(exports, "validateHeader", (() => validateHeader)), 
    parcelHelpers.export(exports, "generateUUIDv4", (() => generateUUIDv4)), parcelHelpers.export(exports, "getMonotonicNow", (() => getMonotonicNow)), 
    parcelHelpers.export(exports, "truncateStringAtBoundaryWithError", (() => truncateStringAtBoundaryWithError)), 
    parcelHelpers.export(exports, "testOnly", (() => testOnly));
    var _uuid = require("uuid"), _contextJs = require("./context.js"), _errorTypeJs = require("./error/error_type.js"), _logJs = require("./log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs);
    function isJSONValue(v) {
      if (isString(v) || isBoolean(v) || isNumber(v)) return !0;
      if (isObject(v)) {
        if (0 === Object.keys(v).length) return !0;
        for (const key in v) return isJSONValue(v[key]);
      }
      return !!Array.isArray(v) && v.every((e => isJSONValue(e)));
    }
    function isObject(v) {
      return "object" == typeof v && null !== v && v.constructor === Object;
    }
    function isUndefined(v) {
      return void 0 === v;
    }
    function isString(v) {
      return "string" == typeof v;
    }
    function isBoolean(v) {
      return "boolean" == typeof v;
    }
    function isNumber(v) {
      return "number" == typeof v && !isNaN(v);
    }
    function isInteger(v) {
      return isNumber(v) && Number.isInteger(v);
    }
    function sanitizeApplicationId(applicationId) {
      return applicationId.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    }
    function validateURL(v) {
      return /^(http|https):\/\/[a-zA-Z0-9._-]+(:\d+){0,1}(\/{0,1})$/i.test(v);
    }
    function validateHeader(v) {
      return /^[a-z0-9-]{1,20}$/i.test(v);
    }
    function generateUUIDv4() {
      return "undefined" != typeof crypto ? _uuid.v4() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(c) {
        const r = 16 * Math.random() | 0;
        return ("x" == c ? r : 3 & r | 8).toString(16);
      }));
    }
    const TIME_ORIGIN = Date.now();
    function getMonotonicNow() {
      const now = "undefined" == typeof performance ? Date.now() - TIME_ORIGIN : performance.now();
      return Math.round(now);
    }
    async function truncateStringAtBoundaryWithError(metric, value, length) {
      const truncated = value.substr(0, length);
      return truncated !== value && await _contextJs.Context.errorManager.record(metric, _errorTypeJs.ErrorType.InvalidOverflow, `Value length ${value.length} exceeds maximum of ${length}.`), 
      truncated;
    }
    function testOnly(logTag = "core.utils") {
      return (_target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        return descriptor.value = function(...args) {
          return _contextJs.Context.testing ? originalMethod ? originalMethod.apply(this, args) : Promise.resolve() : (_logJsDefault.default(logTag, [ `Attempted to access test only method \`${propertyKey || "unknown"}\`,`, "but Glean is not in testing mode. Ignoring. Make sure to put Glean in testing mode", "before accessing such methods, by calling `Glean.testResetGlean`." ], _logJs.LoggingLevel.Error), 
          Promise.resolve());
        }, descriptor;
      };
    }
  }, {
    uuid: "81aaC",
    "./context.js": "fbkOU",
    "./error/error_type.js": "euvNM",
    "./log.js": "l3qBW",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "81aaC": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "v1", (() => _v1JsDefault.default)), 
    parcelHelpers.export(exports, "v3", (() => _v3JsDefault.default)), parcelHelpers.export(exports, "v4", (() => _v4JsDefault.default)), 
    parcelHelpers.export(exports, "v5", (() => _v5JsDefault.default)), parcelHelpers.export(exports, "NIL", (() => _nilJsDefault.default)), 
    parcelHelpers.export(exports, "version", (() => _versionJsDefault.default)), parcelHelpers.export(exports, "validate", (() => _validateJsDefault.default)), 
    parcelHelpers.export(exports, "stringify", (() => _stringifyJsDefault.default)), 
    parcelHelpers.export(exports, "parse", (() => _parseJsDefault.default));
    var _v1Js = require("./v1.js"), _v1JsDefault = parcelHelpers.interopDefault(_v1Js), _v3Js = require("./v3.js"), _v3JsDefault = parcelHelpers.interopDefault(_v3Js), _v4Js = require("./v4.js"), _v4JsDefault = parcelHelpers.interopDefault(_v4Js), _v5Js = require("./v5.js"), _v5JsDefault = parcelHelpers.interopDefault(_v5Js), _nilJs = require("./nil.js"), _nilJsDefault = parcelHelpers.interopDefault(_nilJs), _versionJs = require("./version.js"), _versionJsDefault = parcelHelpers.interopDefault(_versionJs), _validateJs = require("./validate.js"), _validateJsDefault = parcelHelpers.interopDefault(_validateJs), _stringifyJs = require("./stringify.js"), _stringifyJsDefault = parcelHelpers.interopDefault(_stringifyJs), _parseJs = require("./parse.js"), _parseJsDefault = parcelHelpers.interopDefault(_parseJs);
  }, {
    "./v1.js": "8GGDW",
    "./v3.js": "7VBxl",
    "./v4.js": "1YhWI",
    "./v5.js": "7Q52j",
    "./nil.js": "8uAVg",
    "./version.js": "7Lujd",
    "./validate.js": "dtxfR",
    "./stringify.js": "3uxVY",
    "./parse.js": "d8P63",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "8GGDW": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _nodeId, _clockseq, _rngJs = require("./rng.js"), _rngJsDefault = parcelHelpers.interopDefault(_rngJs), _stringifyJs = require("./stringify.js"), _stringifyJsDefault = parcelHelpers.interopDefault(_stringifyJs), _lastMSecs = 0, _lastNSecs = 0;
    exports.default = function(options, buf, offset) {
      var i = buf && offset || 0, b = buf || new Array(16), node = (options = options || {}).node || _nodeId, clockseq = void 0 !== options.clockseq ? options.clockseq : _clockseq;
      if (null == node || null == clockseq) {
        var seedBytes = options.random || (options.rng || _rngJsDefault.default)();
        null == node && (node = _nodeId = [ 1 | seedBytes[0], seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5] ]), 
        null == clockseq && (clockseq = _clockseq = 16383 & (seedBytes[6] << 8 | seedBytes[7]));
      }
      var msecs = void 0 !== options.msecs ? options.msecs : Date.now(), nsecs = void 0 !== options.nsecs ? options.nsecs : _lastNSecs + 1, dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && void 0 === options.clockseq && (clockseq = clockseq + 1 & 16383), 
      (dt < 0 || msecs > _lastMSecs) && void 0 === options.nsecs && (nsecs = 0), nsecs >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      _lastMSecs = msecs, _lastNSecs = nsecs, _clockseq = clockseq;
      var tl = (1e4 * (268435455 & (msecs += 122192928e5)) + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255, b[i++] = tl >>> 16 & 255, b[i++] = tl >>> 8 & 255, b[i++] = 255 & tl;
      var tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255, b[i++] = 255 & tmh, b[i++] = tmh >>> 24 & 15 | 16, b[i++] = tmh >>> 16 & 255, 
      b[i++] = clockseq >>> 8 | 128, b[i++] = 255 & clockseq;
      for (var n = 0; n < 6; ++n) b[i + n] = node[n];
      return buf || _stringifyJsDefault.default(b);
    };
  }, {
    "./rng.js": "lLMo4",
    "./stringify.js": "3uxVY",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  lLMo4: [ function(require, module, exports) {
    var getRandomValues;
    require("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(exports);
    var rnds8 = new Uint8Array(16);
    exports.default = function() {
      if (!getRandomValues && !(getRandomValues = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      return getRandomValues(rnds8);
    };
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "3uxVY": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    for (var _validateJs = require("./validate.js"), _validateJsDefault = parcelHelpers.interopDefault(_validateJs), byteToHex = [], i = 0; i < 256; ++i) byteToHex.push((i + 256).toString(16).substr(1));
    exports.default = function(arr) {
      var offset = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      if (!_validateJsDefault.default(uuid)) throw TypeError("Stringified UUID is invalid");
      return uuid;
    };
  }, {
    "./validate.js": "dtxfR",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  dtxfR: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _regexJs = require("./regex.js"), _regexJsDefault = parcelHelpers.interopDefault(_regexJs);
    exports.default = function(uuid) {
      return "string" == typeof uuid && _regexJsDefault.default.test(uuid);
    };
  }, {
    "./regex.js": "e2bte",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  e2bte: [ function(require, module, exports) {
    require("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(exports), 
    exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "7VBxl": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _v35Js = require("./v35.js"), _v35JsDefault = parcelHelpers.interopDefault(_v35Js), _md5Js = require("./md5.js"), _md5JsDefault = parcelHelpers.interopDefault(_md5Js), v3 = _v35JsDefault.default("v3", 48, _md5JsDefault.default);
    exports.default = v3;
  }, {
    "./v35.js": "b5uif",
    "./md5.js": "jylIx",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  b5uif: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "DNS", (() => DNS)), 
    parcelHelpers.export(exports, "URL", (() => URL1));
    var _stringifyJs = require("./stringify.js"), _stringifyJsDefault = parcelHelpers.interopDefault(_stringifyJs), _parseJs = require("./parse.js"), _parseJsDefault = parcelHelpers.interopDefault(_parseJs);
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", URL1 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.default = function(name, version, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        if ("string" == typeof value && (value = function(str) {
          str = unescape(encodeURIComponent(str));
          for (var bytes = [], i = 0; i < str.length; ++i) bytes.push(str.charCodeAt(i));
          return bytes;
        }(value)), "string" == typeof namespace && (namespace = _parseJsDefault.default(namespace)), 
        16 !== namespace.length) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        var bytes = new Uint8Array(16 + value.length);
        if (bytes.set(namespace), bytes.set(value, namespace.length), (bytes = hashfunc(bytes))[6] = 15 & bytes[6] | version, 
        bytes[8] = 63 & bytes[8] | 128, buf) {
          offset = offset || 0;
          for (var i = 0; i < 16; ++i) buf[offset + i] = bytes[i];
          return buf;
        }
        return _stringifyJsDefault.default(bytes);
      }
      try {
        generateUUID.name = name;
      } catch (err) {}
      return generateUUID.DNS = DNS, generateUUID.URL = URL1, generateUUID;
    };
  }, {
    "./stringify.js": "3uxVY",
    "./parse.js": "d8P63",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  d8P63: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _validateJs = require("./validate.js"), _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
    exports.default = function(uuid) {
      if (!_validateJsDefault.default(uuid)) throw TypeError("Invalid UUID");
      var v, arr = new Uint8Array(16);
      return arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24, arr[1] = v >>> 16 & 255, 
      arr[2] = v >>> 8 & 255, arr[3] = 255 & v, arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, 
      arr[5] = 255 & v, arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, arr[7] = 255 & v, 
      arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, arr[9] = 255 & v, arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, 
      arr[11] = v / 4294967296 & 255, arr[12] = v >>> 24 & 255, arr[13] = v >>> 16 & 255, 
      arr[14] = v >>> 8 & 255, arr[15] = 255 & v, arr;
    };
  }, {
    "./validate.js": "dtxfR",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  jylIx: [ function(require, module, exports) {
    function getOutputLength(inputLength8) {
      return 14 + (inputLength8 + 64 >>> 9 << 4) + 1;
    }
    function safeAdd(x, y) {
      var lsw = (65535 & x) + (65535 & y);
      return (x >> 16) + (y >> 16) + (lsw >> 16) << 16 | 65535 & lsw;
    }
    function md5cmn(q, a, b, x, s, t) {
      return safeAdd((num = safeAdd(safeAdd(a, q), safeAdd(x, t))) << (cnt = s) | num >>> 32 - cnt, b);
      var num, cnt;
    }
    function md5ff(a, b, c, d, x, s, t) {
      return md5cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5gg(a, b, c, d, x, s, t) {
      return md5cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5hh(a, b, c, d, x, s, t) {
      return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5ii(a, b, c, d, x, s, t) {
      return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    require("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(exports), 
    exports.default = function(bytes) {
      if ("string" == typeof bytes) {
        var msg = unescape(encodeURIComponent(bytes));
        bytes = new Uint8Array(msg.length);
        for (var i = 0; i < msg.length; ++i) bytes[i] = msg.charCodeAt(i);
      }
      return function(input) {
        for (var output = [], length32 = 32 * input.length, hexTab = "0123456789abcdef", i = 0; i < length32; i += 8) {
          var x = input[i >> 5] >>> i % 32 & 255, hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(15 & x), 16);
          output.push(hex);
        }
        return output;
      }(function(x, len) {
        x[len >> 5] |= 128 << len % 32, x[getOutputLength(len) - 1] = len;
        for (var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, i = 0; i < x.length; i += 16) {
          var olda = a, oldb = b, oldc = c, oldd = d;
          a = md5ff(a, b, c, d, x[i], 7, -680876936), d = md5ff(d, a, b, c, x[i + 1], 12, -389564586), 
          c = md5ff(c, d, a, b, x[i + 2], 17, 606105819), b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330), 
          a = md5ff(a, b, c, d, x[i + 4], 7, -176418897), d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426), 
          c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341), b = md5ff(b, c, d, a, x[i + 7], 22, -45705983), 
          a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416), d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417), 
          c = md5ff(c, d, a, b, x[i + 10], 17, -42063), b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162), 
          a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682), d = md5ff(d, a, b, c, x[i + 13], 12, -40341101), 
          c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290), a = md5gg(a, b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329), c, d, x[i + 1], 5, -165796510), 
          d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632), c = md5gg(c, d, a, b, x[i + 11], 14, 643717713), 
          b = md5gg(b, c, d, a, x[i], 20, -373897302), a = md5gg(a, b, c, d, x[i + 5], 5, -701558691), 
          d = md5gg(d, a, b, c, x[i + 10], 9, 38016083), c = md5gg(c, d, a, b, x[i + 15], 14, -660478335), 
          b = md5gg(b, c, d, a, x[i + 4], 20, -405537848), a = md5gg(a, b, c, d, x[i + 9], 5, 568446438), 
          d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690), c = md5gg(c, d, a, b, x[i + 3], 14, -187363961), 
          b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501), a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467), 
          d = md5gg(d, a, b, c, x[i + 2], 9, -51403784), c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473), 
          a = md5hh(a, b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734), c, d, x[i + 5], 4, -378558), 
          d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463), c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562), 
          b = md5hh(b, c, d, a, x[i + 14], 23, -35309556), a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060), 
          d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353), c = md5hh(c, d, a, b, x[i + 7], 16, -155497632), 
          b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640), a = md5hh(a, b, c, d, x[i + 13], 4, 681279174), 
          d = md5hh(d, a, b, c, x[i], 11, -358537222), c = md5hh(c, d, a, b, x[i + 3], 16, -722521979), 
          b = md5hh(b, c, d, a, x[i + 6], 23, 76029189), a = md5hh(a, b, c, d, x[i + 9], 4, -640364487), 
          d = md5hh(d, a, b, c, x[i + 12], 11, -421815835), c = md5hh(c, d, a, b, x[i + 15], 16, 530742520), 
          a = md5ii(a, b = md5hh(b, c, d, a, x[i + 2], 23, -995338651), c, d, x[i], 6, -198630844), 
          d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415), c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905), 
          b = md5ii(b, c, d, a, x[i + 5], 21, -57434055), a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571), 
          d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606), c = md5ii(c, d, a, b, x[i + 10], 15, -1051523), 
          b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799), a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359), 
          d = md5ii(d, a, b, c, x[i + 15], 10, -30611744), c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380), 
          b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649), a = md5ii(a, b, c, d, x[i + 4], 6, -145523070), 
          d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379), c = md5ii(c, d, a, b, x[i + 2], 15, 718787259), 
          b = md5ii(b, c, d, a, x[i + 9], 21, -343485551), a = safeAdd(a, olda), b = safeAdd(b, oldb), 
          c = safeAdd(c, oldc), d = safeAdd(d, oldd);
        }
        return [ a, b, c, d ];
      }(function(input) {
        if (0 === input.length) return [];
        for (var length8 = 8 * input.length, output = new Uint32Array(getOutputLength(length8)), i = 0; i < length8; i += 8) output[i >> 5] |= (255 & input[i / 8]) << i % 32;
        return output;
      }(bytes), 8 * bytes.length));
    };
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "1YhWI": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _rngJs = require("./rng.js"), _rngJsDefault = parcelHelpers.interopDefault(_rngJs), _stringifyJs = require("./stringify.js"), _stringifyJsDefault = parcelHelpers.interopDefault(_stringifyJs);
    exports.default = function(options, buf, offset) {
      var rnds = (options = options || {}).random || (options.rng || _rngJsDefault.default)();
      if (rnds[6] = 15 & rnds[6] | 64, rnds[8] = 63 & rnds[8] | 128, buf) {
        offset = offset || 0;
        for (var i = 0; i < 16; ++i) buf[offset + i] = rnds[i];
        return buf;
      }
      return _stringifyJsDefault.default(rnds);
    };
  }, {
    "./rng.js": "lLMo4",
    "./stringify.js": "3uxVY",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "7Q52j": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _v35Js = require("./v35.js"), _v35JsDefault = parcelHelpers.interopDefault(_v35Js), _sha1Js = require("./sha1.js"), _sha1JsDefault = parcelHelpers.interopDefault(_sha1Js), v5 = _v35JsDefault.default("v5", 80, _sha1JsDefault.default);
    exports.default = v5;
  }, {
    "./v35.js": "b5uif",
    "./sha1.js": "cRuif",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  cRuif: [ function(require, module, exports) {
    function f(s, x, y, z) {
      switch (s) {
       case 0:
        return x & y ^ ~x & z;

       case 1:
        return x ^ y ^ z;

       case 2:
        return x & y ^ x & z ^ y & z;

       case 3:
        return x ^ y ^ z;
      }
    }
    function ROTL(x, n) {
      return x << n | x >>> 32 - n;
    }
    require("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(exports), 
    exports.default = function(bytes) {
      var K = [ 1518500249, 1859775393, 2400959708, 3395469782 ], H = [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ];
      if ("string" == typeof bytes) {
        var msg = unescape(encodeURIComponent(bytes));
        bytes = [];
        for (var i = 0; i < msg.length; ++i) bytes.push(msg.charCodeAt(i));
      } else Array.isArray(bytes) || (bytes = Array.prototype.slice.call(bytes));
      bytes.push(128);
      for (var l = bytes.length / 4 + 2, N = Math.ceil(l / 16), M = new Array(N), _i = 0; _i < N; ++_i) {
        for (var arr = new Uint32Array(16), j = 0; j < 16; ++j) arr[j] = bytes[64 * _i + 4 * j] << 24 | bytes[64 * _i + 4 * j + 1] << 16 | bytes[64 * _i + 4 * j + 2] << 8 | bytes[64 * _i + 4 * j + 3];
        M[_i] = arr;
      }
      M[N - 1][14] = 8 * (bytes.length - 1) / Math.pow(2, 32), M[N - 1][14] = Math.floor(M[N - 1][14]), 
      M[N - 1][15] = 8 * (bytes.length - 1) & 4294967295;
      for (var _i2 = 0; _i2 < N; ++_i2) {
        for (var W = new Uint32Array(80), t = 0; t < 16; ++t) W[t] = M[_i2][t];
        for (var _t = 16; _t < 80; ++_t) W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
        for (var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], _t2 = 0; _t2 < 80; ++_t2) {
          var s = Math.floor(_t2 / 20), T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
          e = d, d = c, c = ROTL(b, 30) >>> 0, b = a, a = T;
        }
        H[0] = H[0] + a >>> 0, H[1] = H[1] + b >>> 0, H[2] = H[2] + c >>> 0, H[3] = H[3] + d >>> 0, 
        H[4] = H[4] + e >>> 0;
      }
      return [ H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, 255 & H[0], H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, 255 & H[1], H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, 255 & H[2], H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, 255 & H[3], H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, 255 & H[4] ];
    };
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "8uAVg": [ function(require, module, exports) {
    require("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(exports), 
    exports.default = "00000000-0000-0000-0000-000000000000";
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "7Lujd": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _validateJs = require("./validate.js"), _validateJsDefault = parcelHelpers.interopDefault(_validateJs);
    exports.default = function(uuid) {
      if (!_validateJsDefault.default(uuid)) throw TypeError("Invalid UUID");
      return parseInt(uuid.substr(14, 1), 16);
    };
  }, {
    "./validate.js": "dtxfR",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  fbkOU: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Context", (() => Context));
    var _dispatcherJs = require("./dispatcher.js"), _dispatcherJsDefault = parcelHelpers.interopDefault(_dispatcherJs), _logJs = require("./log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs);
    const LOG_TAG = "core.Context";
    class Context {
      constructor() {
        this._initialized = !1, this._testing = !1, this._startTime = new Date, this._dispatcher = new _dispatcherJsDefault.default;
      }
      static get instance() {
        return Context._instance || (Context._instance = new Context), Context._instance;
      }
      static testUninitialize() {
        Context._instance = void 0;
      }
      static get dispatcher() {
        return Context.instance._dispatcher;
      }
      static get uploadEnabled() {
        return void 0 === Context.instance._uploadEnabled && _logJsDefault.default(LOG_TAG, [ "Attempted to access Context.uploadEnabled before it was set. This may cause unexpected behaviour." ], _logJs.LoggingLevel.Trace), 
        Context.instance._uploadEnabled;
      }
      static set uploadEnabled(upload) {
        Context.instance._uploadEnabled = upload;
      }
      static get metricsDatabase() {
        return void 0 === Context.instance._metricsDatabase && _logJsDefault.default(LOG_TAG, [ "Attempted to access Context.metricsDatabase before it was set. This may cause unexpected behaviour." ], _logJs.LoggingLevel.Trace), 
        Context.instance._metricsDatabase;
      }
      static set metricsDatabase(db) {
        Context.instance._metricsDatabase = db;
      }
      static get eventsDatabase() {
        return void 0 === Context.instance._eventsDatabase && _logJsDefault.default(LOG_TAG, [ "Attempted to access Context.eventsDatabase before it was set. This may cause unexpected behaviour." ], _logJs.LoggingLevel.Trace), 
        Context.instance._eventsDatabase;
      }
      static set eventsDatabase(db) {
        Context.instance._eventsDatabase = db;
      }
      static get pingsDatabase() {
        return void 0 === Context.instance._pingsDatabase && _logJsDefault.default(LOG_TAG, [ "Attempted to access Context.pingsDatabase before it was set. This may cause unexpected behaviour." ], _logJs.LoggingLevel.Trace), 
        Context.instance._pingsDatabase;
      }
      static set pingsDatabase(db) {
        Context.instance._pingsDatabase = db;
      }
      static get errorManager() {
        return void 0 === Context.instance._errorManager && _logJsDefault.default(LOG_TAG, [ "Attempted to access Context.errorManager before it was set. This may cause unexpected behaviour." ], _logJs.LoggingLevel.Trace), 
        Context.instance._errorManager;
      }
      static set errorManager(db) {
        Context.instance._errorManager = db;
      }
      static get applicationId() {
        return void 0 === Context.instance._applicationId && _logJsDefault.default(LOG_TAG, [ "Attempted to access Context.applicationId before it was set. This may cause unexpected behaviour." ], _logJs.LoggingLevel.Trace), 
        Context.instance._applicationId;
      }
      static set applicationId(id) {
        Context.instance._applicationId = id;
      }
      static get initialized() {
        return Context.instance._initialized;
      }
      static set initialized(init) {
        Context.instance._initialized = init;
      }
      static get debugOptions() {
        return void 0 === Context.instance._debugOptions && _logJsDefault.default(LOG_TAG, [ "Attempted to access Context.debugOptions before it was set. This may cause unexpected behaviour." ], _logJs.LoggingLevel.Trace), 
        Context.instance._debugOptions;
      }
      static set debugOptions(options) {
        Context.instance._debugOptions = options;
      }
      static get startTime() {
        return Context.instance._startTime;
      }
      static get testing() {
        return Context.instance._testing;
      }
      static set testing(flag) {
        Context.instance._testing = flag;
      }
      static set platform(platform) {
        Context.instance._platform = platform;
      }
      static get platform() {
        return void 0 === Context.instance._platform && _logJsDefault.default(LOG_TAG, [ "Attempted to access Context.platform before it was set. This may cause unexpected behaviour." ], _logJs.LoggingLevel.Trace), 
        Context.instance._platform;
      }
      static isPlatformSet() {
        return !!Context.instance._platform;
      }
    }
  }, {
    "./dispatcher.js": "c3Ppl",
    "./log.js": "l3qBW",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  c3Ppl: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "DispatcherState", (() => DispatcherState));
    var _logJs = require("./log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs);
    var DispatcherState, DispatcherState1, Commands, Commands1;
    (DispatcherState1 = DispatcherState || (DispatcherState = {})).Uninitialized = "Uninitialized", 
    DispatcherState1.Idle = "Idle", DispatcherState1.Processing = "Processing", DispatcherState1.Stopped = "Stopped", 
    DispatcherState1.Shutdown = "Shutdown", (Commands1 = Commands || (Commands = {})).Task = "Task", 
    Commands1.PersistentTask = "PersistentTask", Commands1.InitTask = "InitTask", Commands1.Stop = "Stop", 
    Commands1.Clear = "Clear", Commands1.Shutdown = "Shutdown", Commands1.TestTask = "TestTask";
    exports.default = class {
      constructor(maxPreInitQueueSize = 100, logTag = "core.Dispatcher") {
        this.maxPreInitQueueSize = maxPreInitQueueSize, this.logTag = logTag, this.shuttingDown = !1, 
        this.currentJob = Promise.resolve(), this.queue = [], this.state = "Uninitialized";
      }
      getNextCommand() {
        return this.queue.shift();
      }
      async executeTask(task) {
        try {
          return await task(), !0;
        } catch (e) {
          return _logJsDefault.default(this.logTag, [ "Error executing task:", e ], _logJs.LoggingLevel.Error), 
          !1;
        }
      }
      unblockTestResolvers() {
        this.queue.forEach((c => {
          "TestTask" === c.command && c.resolver();
        }));
      }
      async execute() {
        let nextCommand = this.getNextCommand();
        for (;nextCommand; ) {
          switch (nextCommand.command) {
           case "Stop":
            return void (this.state = "Stopped");

           case "Shutdown":
            return this.unblockTestResolvers(), this.queue = [], this.state = "Shutdown", void (this.shuttingDown = !1);

           case "Clear":
            this.unblockTestResolvers(), this.queue = this.queue.filter((c => [ "PersistentTask", "Shutdown" ].includes(c.command)));
            break;

           case "TestTask":
            await this.executeTask(nextCommand.task), nextCommand.resolver();
            break;

           case "InitTask":
            await this.executeTask(nextCommand.task) || (_logJsDefault.default(this.logTag, [ "Error initializing dispatcher, won't execute anything further.", "There might be more error logs above." ], _logJs.LoggingLevel.Error), 
            this.clear(), this.shutdown());
            break;

           case "PersistentTask":
           case "Task":
            await this.executeTask(nextCommand.task);
          }
          nextCommand = this.getNextCommand();
        }
      }
      triggerExecution() {
        "Idle" === this.state && this.queue.length > 0 && (this.state = "Processing", this.currentJob = this.execute(), 
        this.currentJob.then((() => {
          "Processing" === this.state && (this.state = "Idle");
        })).catch((error => {
          _logJsDefault.default(this.logTag, [ "IMPOSSIBLE: Something went wrong while the dispatcher was executing the tasks queue.", error ], _logJs.LoggingLevel.Error);
        })));
      }
      launchInternal(command, priorityTask = !1) {
        return "Shutdown" === this.state ? (_logJsDefault.default(this.logTag, "Attempted to enqueue a new task but the dispatcher is shutdown. Ignoring.", _logJs.LoggingLevel.Warn), 
        !1) : !priorityTask && "Uninitialized" === this.state && this.queue.length >= this.maxPreInitQueueSize ? (_logJsDefault.default(this.logTag, "Unable to enqueue task, pre init queue is full.", _logJs.LoggingLevel.Warn), 
        !1) : (priorityTask ? this.queue.unshift(command) : this.queue.push(command), this.triggerExecution(), 
        !0);
      }
      launch(task) {
        this.launchInternal({
          task: task,
          command: "Task"
        });
      }
      launchPersistent(task) {
        this.launchInternal({
          task: task,
          command: "PersistentTask"
        });
      }
      flushInit(task) {
        "Uninitialized" === this.state ? (task && this.launchInternal({
          task: task,
          command: "InitTask"
        }, !0), this.state = "Idle", this.triggerExecution()) : _logJsDefault.default(this.logTag, "Attempted to initialize the Dispatcher, but it is already initialized. Ignoring.", _logJs.LoggingLevel.Warn);
      }
      clear(priorityTask = !0) {
        this.launchInternal({
          command: "Clear"
        }, priorityTask), this.resume();
      }
      stop(priorityTask = !0) {
        this.shuttingDown ? this.clear(priorityTask) : this.launchInternal({
          command: "Stop"
        }, priorityTask);
      }
      resume() {
        "Stopped" === this.state && (this.state = "Idle", this.triggerExecution());
      }
      shutdown() {
        return this.shuttingDown = !0, this.launchInternal({
          command: "Shutdown"
        }), this.resume(), this.currentJob;
      }
      async testBlockOnQueue() {
        return await this.currentJob;
      }
      async testUninitialize() {
        "Uninitialized" !== this.state && (this.clear(), await this.shutdown(), this.state = "Uninitialized");
      }
      testLaunch(task) {
        return new Promise(((resolver, reject) => {
          this.resume();
          this.launchInternal({
            resolver: resolver,
            task: task,
            command: "TestTask"
          }) || reject();
        }));
      }
    };
  }, {
    "./log.js": "l3qBW",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  euvNM: [ function(require, module, exports) {
    var ErrorType, ErrorType1, parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "ErrorType", (() => ErrorType)), 
    (ErrorType1 = ErrorType || (ErrorType = {})).InvalidValue = "invalid_value", ErrorType1.InvalidLabel = "invalid_label", 
    ErrorType1.InvalidState = "invalid_state", ErrorType1.InvalidOverflow = "invalid_overflow";
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  dpBKu: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _logJs = require("../../core/log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _uploaderJs = require("../../core/upload/uploader.js"), _uploaderJsDefault = parcelHelpers.interopDefault(_uploaderJs);
    const LOG_TAG = "platform.browser.Uploader";
    class BrowserUploader extends _uploaderJsDefault.default {
      async post(url, body, headers = {}) {
        const controller = new AbortController, timeout = setTimeout((() => controller.abort()), _uploaderJs.DEFAULT_UPLOAD_TIMEOUT_MS);
        let response;
        try {
          response = await fetch(url.toString(), {
            headers: headers,
            method: "POST",
            body: body,
            keepalive: !0,
            credentials: "omit",
            signal: controller.signal,
            redirect: "error"
          });
        } catch (e) {
          return e instanceof DOMException ? _logJsDefault.default(LOG_TAG, [ "Timeout while attempting to upload ping.\n", e ], _logJs.LoggingLevel.Error) : e instanceof TypeError ? _logJsDefault.default(LOG_TAG, [ "Network error while attempting to upload ping.\n", e ], _logJs.LoggingLevel.Error) : _logJsDefault.default(LOG_TAG, [ "Unknown error while attempting to upload ping.\n", e ], _logJs.LoggingLevel.Error), 
          clearTimeout(timeout), new _uploaderJs.UploadResult(0);
        }
        return clearTimeout(timeout), new _uploaderJs.UploadResult(2, response.status);
      }
    }
    exports.default = new BrowserUploader;
  }, {
    "../../core/log.js": "l3qBW",
    "../../core/upload/uploader.js": "GM0rQ",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  GM0rQ: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "DEFAULT_UPLOAD_TIMEOUT_MS", (() => DEFAULT_UPLOAD_TIMEOUT_MS)), 
    parcelHelpers.export(exports, "UploadResultStatus", (() => UploadResultStatus)), 
    parcelHelpers.export(exports, "UploadResult", (() => UploadResult)), parcelHelpers.export(exports, "Uploader", (() => Uploader));
    const DEFAULT_UPLOAD_TIMEOUT_MS = 1e4;
    var UploadResultStatus, UploadResultStatus1;
    (UploadResultStatus1 = UploadResultStatus || (UploadResultStatus = {}))[UploadResultStatus1.RecoverableFailure = 0] = "RecoverableFailure", 
    UploadResultStatus1[UploadResultStatus1.UnrecoverableFailure = 1] = "UnrecoverableFailure", 
    UploadResultStatus1[UploadResultStatus1.Success = 2] = "Success";
    class UploadResult {
      constructor(result, status) {
        this.result = result, this.status = status;
      }
    }
    class Uploader {}
    exports.default = Uploader;
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  dxbe6: [ function(require, module, exports) {
    require("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(exports);
    const WebExtPlatformInfo = {
      async os() {
        switch ((await browser.runtime.getPlatformInfo()).os) {
         case "mac":
          return "Darwin";

         case "win":
          return "Windows";

         case "android":
          return "Android";

         case "cros":
          return "ChromeOS";

         case "linux":
          return "Linux";

         case "openbsd":
          return "OpenBSD";

         default:
          return "Unknown";
        }
      },
      osVersion: async () => Promise.resolve("Unknown"),
      arch: async () => (await browser.runtime.getPlatformInfo()).arch,
      locale: async () => Promise.resolve(navigator.language || "und")
    };
    exports.default = WebExtPlatformInfo;
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "9kL5O": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _gleanJs = require("../core/glean.js"), _gleanJsDefault = parcelHelpers.interopDefault(_gleanJs);
    exports.default = platform => ({
      initialize(applicationId, uploadEnabled, config) {
        _gleanJsDefault.default.setPlatform(platform), _gleanJsDefault.default.initialize(applicationId, uploadEnabled, config);
      },
      setUploadEnabled(flag) {
        _gleanJsDefault.default.setUploadEnabled(flag);
      },
      setLogPings(flag) {
        _gleanJsDefault.default.setLogPings(flag);
      },
      setDebugViewTag(value) {
        _gleanJsDefault.default.setDebugViewTag(value);
      },
      shutdown: () => _gleanJsDefault.default.shutdown(),
      setSourceTags(value) {
        _gleanJsDefault.default.setSourceTags(value);
      },
      testResetGlean: async (applicationId, uploadEnabled = !0, config) => _gleanJsDefault.default.testResetGlean(applicationId, uploadEnabled, config)
    });
  }, {
    "../core/glean.js": "3RIbD",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "3RIbD": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _constantsJs = require("./constants.js"), _configJs = require("./config.js"), _databaseJs = require("./metrics/database.js"), _databaseJsDefault = parcelHelpers.interopDefault(_databaseJs), _databaseJs1 = require("./pings/database.js"), _databaseJsDefault1 = parcelHelpers.interopDefault(_databaseJs1), _managerJs = require("./upload/manager.js"), _managerJsDefault = parcelHelpers.interopDefault(_managerJs), _utilsJs = require("./utils.js"), _internalMetricsJs = require("./internal_metrics.js"), _indexJs = require("./metrics/events_database/index.js"), _indexJsDefault = parcelHelpers.interopDefault(_indexJs), _uuidJs = require("./metrics/types/uuid.js"), _uuidJsDefault = parcelHelpers.interopDefault(_uuidJs), _datetimeJs = require("./metrics/types/datetime.js"), _datetimeJsDefault = parcelHelpers.interopDefault(_datetimeJs), _internalPingsJs = require("./internal_pings.js"), _internalPingsJsDefault = parcelHelpers.interopDefault(_internalPingsJs), _utilsJs1 = require("./events/utils.js"), _indexJs1 = require("./error/index.js"), _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1), _indexJs2 = require("../platform/test/index.js"), _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2), _contextJs = require("./context.js"), _pingTypeJs = require("./pings/ping_type.js"), _pingTypeJsDefault = parcelHelpers.interopDefault(_pingTypeJs), _logJs = require("./log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs);
    const LOG_TAG = "core.Glean";
    class Glean {
      constructor() {
        if (!_utilsJs.isUndefined(Glean._instance)) throw new Error("Tried to instantiate Glean through `new`.\n      Use Glean.instance instead to access the Glean singleton.");
        this._coreMetrics = new _internalMetricsJs.CoreMetrics, this._corePings = new _internalPingsJsDefault.default;
      }
      static get instance() {
        return Glean._instance || (Glean._instance = new Glean), Glean._instance;
      }
      static get pingUploader() {
        return Glean.instance._pingUploader;
      }
      static get coreMetrics() {
        return Glean.instance._coreMetrics;
      }
      static get corePings() {
        return Glean.instance._corePings;
      }
      static async onUploadEnabled() {
        _contextJs.Context.uploadEnabled = !0, await Glean.coreMetrics.initialize(Glean.instance._config, _contextJs.Context.platform);
      }
      static async onUploadDisabled() {
        _contextJs.Context.uploadEnabled = !1, await _pingTypeJsDefault.default._private_submitUndispatched(Glean.corePings.deletionRequest), 
        await Glean.clearMetrics();
      }
      static async clearMetrics() {
        let firstRunDate;
        await Glean.pingUploader.clearPendingPingsQueue();
        try {
          firstRunDate = new _datetimeJs.DatetimeMetric(await _contextJs.Context.metricsDatabase.getMetric(_constantsJs.CLIENT_INFO_STORAGE, Glean.coreMetrics.firstRunDate)).date;
        } catch (_a) {
          firstRunDate = new Date;
        }
        await _contextJs.Context.eventsDatabase.clearAll(), await _contextJs.Context.metricsDatabase.clearAll(), 
        await _contextJs.Context.pingsDatabase.clearAll(), _contextJs.Context.uploadEnabled = !0, 
        await _uuidJsDefault.default._private_setUndispatched(Glean.coreMetrics.clientId, _constantsJs.KNOWN_CLIENT_ID), 
        await _datetimeJsDefault.default._private_setUndispatched(Glean.coreMetrics.firstRunDate, firstRunDate), 
        _contextJs.Context.uploadEnabled = !1;
      }
      static initialize(applicationId, uploadEnabled, config) {
        if (_contextJs.Context.initialized) return void _logJsDefault.default(LOG_TAG, "Attempted to initialize Glean, but it has already been initialized. Ignoring.", _logJs.LoggingLevel.Warn);
        if (!_utilsJs.isString(applicationId)) return void _logJsDefault.default(LOG_TAG, "Unable to initialize Glean, applicationId must be a string.", _logJs.LoggingLevel.Error);
        if (!_utilsJs.isBoolean(uploadEnabled)) return void _logJsDefault.default(LOG_TAG, "Unable to initialize Glean, uploadEnabled must be a boolean.", _logJs.LoggingLevel.Error);
        if (0 === applicationId.length) return void _logJsDefault.default(LOG_TAG, "Unable to initialize Glean, applicationId cannot be an empty string.", _logJs.LoggingLevel.Error);
        if (!_contextJs.Context.platform) return void _logJsDefault.default(LOG_TAG, "Unable to initialize Glean, platform has not been set.", _logJs.LoggingLevel.Error);
        _contextJs.Context.applicationId = _utilsJs.sanitizeApplicationId(applicationId);
        const correctConfig = new _configJs.Configuration(config);
        if (_contextJs.Context.debugOptions = correctConfig.debug, Glean.instance._config = correctConfig, 
        _contextJs.Context.metricsDatabase = new _databaseJsDefault.default, _contextJs.Context.eventsDatabase = new _indexJsDefault.default, 
        _contextJs.Context.pingsDatabase = new _databaseJsDefault1.default, _contextJs.Context.errorManager = new _indexJsDefault1.default, 
        Glean.instance._pingUploader = new _managerJsDefault.default(correctConfig, _contextJs.Context.pingsDatabase), 
        null == config ? void 0 : config.plugins) for (const plugin of config.plugins) _utilsJs1.registerPluginToEvent(plugin);
        _contextJs.Context.dispatcher.flushInit((async () => {
          if (_contextJs.Context.initialized = !0, await _contextJs.Context.metricsDatabase.clear("application"), 
          _contextJs.Context.uploadEnabled = uploadEnabled, uploadEnabled) await Glean.onUploadEnabled(); else {
            const clientId = await _contextJs.Context.metricsDatabase.getMetric(_constantsJs.CLIENT_INFO_STORAGE, Glean.coreMetrics.clientId);
            clientId ? clientId !== _constantsJs.KNOWN_CLIENT_ID && await Glean.onUploadDisabled() : await Glean.clearMetrics();
          }
          await _contextJs.Context.eventsDatabase.initialize(), await _contextJs.Context.pingsDatabase.scanPendingPings();
        }));
      }
      static get serverEndpoint() {
        var _a;
        return null === (_a = Glean.instance._config) || void 0 === _a ? void 0 : _a.serverEndpoint;
      }
      static get logPings() {
        var _a, _b;
        return (null === (_b = null === (_a = Glean.instance._config) || void 0 === _a ? void 0 : _a.debug) || void 0 === _b ? void 0 : _b.logPings) || !1;
      }
      static get debugViewTag() {
        var _a, _b;
        if (null === (_a = Glean.instance._config) || void 0 === _a ? void 0 : _a.debugViewTag) return null === (_b = Glean.instance._config) || void 0 === _b ? void 0 : _b.debugViewTag;
      }
      static get sourceTags() {
        var _a, _b, _c;
        if (null === (_a = Glean.instance._config) || void 0 === _a ? void 0 : _a.debug.sourceTags) return null === (_c = null === (_b = Glean.instance._config) || void 0 === _b ? void 0 : _b.debug.sourceTags) || void 0 === _c ? void 0 : _c.toString();
      }
      static get platform() {
        if (!_contextJs.Context.platform) throw new Error("IMPOSSIBLE: Attempted to access environment specific APIs before Glean was initialized.");
        return _contextJs.Context.platform;
      }
      static setUploadEnabled(flag) {
        _contextJs.Context.initialized ? _utilsJs.isBoolean(flag) ? _contextJs.Context.dispatcher.launch((async () => {
          _contextJs.Context.uploadEnabled !== flag && (flag ? await Glean.onUploadEnabled() : await Glean.onUploadDisabled());
        })) : _logJsDefault.default(LOG_TAG, "Unable to change upload state, new value must be a boolean. Ignoring.", _logJs.LoggingLevel.Error) : _logJsDefault.default(LOG_TAG, [ "Changing upload enabled before Glean is initialized is not supported.\n", "Pass the correct state into `Glean.initialize`.\n", "See documentation at https://mozilla.github.io/glean/book/user/general-api.html#initializing-the-glean-sdk`" ], _logJs.LoggingLevel.Error);
      }
      static setLogPings(flag) {
        _contextJs.Context.dispatcher.launch((() => (Glean.instance._config.debug.logPings = flag, 
        Promise.resolve())));
      }
      static setDebugViewTag(value) {
        _contextJs.Context.dispatcher.launch((() => (Glean.instance._config.debugViewTag = value, 
        Promise.resolve())));
      }
      static setSourceTags(value) {
        _contextJs.Context.dispatcher.launch((() => (Glean.instance._config.sourceTags = value, 
        Promise.resolve())));
      }
      static async shutdown() {
        _contextJs.Context.initialized ? (await _contextJs.Context.dispatcher.shutdown(), 
        await Glean.pingUploader.blockOnOngoingUploads()) : _logJsDefault.default(LOG_TAG, "Attempted to shutdown Glean, but Glean is not initialized. Ignoring.");
      }
      static setPlatform(platform) {
        _contextJs.Context.initialized || (_contextJs.Context.isPlatformSet() && _contextJs.Context.platform.name !== platform.name && !_contextJs.Context.testing && _logJsDefault.default(LOG_TAG, [ `IMPOSSIBLE: Attempted to change Glean's targeted platform",\n          "from "${_contextJs.Context.platform.name}" to "${platform.name}". Ignoring.` ], _logJs.LoggingLevel.Error), 
        _contextJs.Context.platform = platform);
      }
      static async testInitialize(applicationId, uploadEnabled = !0, config) {
        _contextJs.Context.testing = !0, Glean.setPlatform(_indexJsDefault2.default), Glean.initialize(applicationId, uploadEnabled, config), 
        await _contextJs.Context.dispatcher.testBlockOnQueue();
      }
      static async testUninitialize(clearStores = !0) {
        _contextJs.Context.initialized && (await Glean.shutdown(), clearStores && (await _contextJs.Context.eventsDatabase.clearAll(), 
        await _contextJs.Context.metricsDatabase.clearAll(), await _contextJs.Context.pingsDatabase.clearAll()), 
        _contextJs.Context.testUninitialize(), _utilsJs1.testResetEvents());
      }
      static async testResetGlean(applicationId, uploadEnabled = !0, config, clearStores = !0) {
        await Glean.testUninitialize(clearStores), await Glean.testInitialize(applicationId, uploadEnabled, config);
      }
    }
    exports.default = Glean;
  }, {
    "./constants.js": "kPBk9",
    "./config.js": "9c41i",
    "./metrics/database.js": "jfZ0j",
    "./pings/database.js": "fOTtz",
    "./upload/manager.js": "2g1xn",
    "./utils.js": "gSLA7",
    "./internal_metrics.js": "8avI8",
    "./metrics/events_database/index.js": "5JW5i",
    "./metrics/types/uuid.js": "8BW3z",
    "./metrics/types/datetime.js": "4adlt",
    "./internal_pings.js": "cT6ti",
    "./events/utils.js": "bNpC8",
    "./error/index.js": "bwlnw",
    "../platform/test/index.js": "idTsI",
    "./context.js": "fbkOU",
    "./pings/ping_type.js": "ciomu",
    "./log.js": "l3qBW",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  kPBk9: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "GLEAN_SCHEMA_VERSION", (() => GLEAN_SCHEMA_VERSION)), 
    parcelHelpers.export(exports, "GLEAN_VERSION", (() => GLEAN_VERSION)), parcelHelpers.export(exports, "PING_INFO_STORAGE", (() => PING_INFO_STORAGE)), 
    parcelHelpers.export(exports, "CLIENT_INFO_STORAGE", (() => CLIENT_INFO_STORAGE)), 
    parcelHelpers.export(exports, "KNOWN_CLIENT_ID", (() => KNOWN_CLIENT_ID)), parcelHelpers.export(exports, "DEFAULT_TELEMETRY_ENDPOINT", (() => DEFAULT_TELEMETRY_ENDPOINT)), 
    parcelHelpers.export(exports, "DELETION_REQUEST_PING_NAME", (() => DELETION_REQUEST_PING_NAME)), 
    parcelHelpers.export(exports, "GLEAN_MAX_SOURCE_TAGS", (() => GLEAN_MAX_SOURCE_TAGS)), 
    parcelHelpers.export(exports, "GLEAN_REFERENCE_TIME_EXTRA_KEY", (() => GLEAN_REFERENCE_TIME_EXTRA_KEY)), 
    parcelHelpers.export(exports, "GLEAN_EXECUTION_COUNTER_EXTRA_KEY", (() => GLEAN_EXECUTION_COUNTER_EXTRA_KEY)), 
    parcelHelpers.export(exports, "GLEAN_RESERVED_EXTRA_KEYS", (() => GLEAN_RESERVED_EXTRA_KEYS));
    const GLEAN_SCHEMA_VERSION = 1, GLEAN_VERSION = "0.29.0", PING_INFO_STORAGE = "glean_ping_info", CLIENT_INFO_STORAGE = "glean_client_info", KNOWN_CLIENT_ID = "c0ffeec0-ffee-c0ff-eec0-ffeec0ffeec0", DEFAULT_TELEMETRY_ENDPOINT = "https://incoming.telemetry.mozilla.org", DELETION_REQUEST_PING_NAME = "deletion-request", GLEAN_MAX_SOURCE_TAGS = 5, GLEAN_REFERENCE_TIME_EXTRA_KEY = "#glean_reference_time", GLEAN_EXECUTION_COUNTER_EXTRA_KEY = "#glean_execution_counter", GLEAN_RESERVED_EXTRA_KEYS = [ GLEAN_EXECUTION_COUNTER_EXTRA_KEY, GLEAN_REFERENCE_TIME_EXTRA_KEY ];
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "9c41i": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Configuration", (() => Configuration));
    var _constantsJs = require("./constants.js"), _utilsJs = require("./utils.js"), _logJs = require("./log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _contextJs = require("./context.js");
    class Configuration {
      constructor(config) {
        var _a;
        if (this.channel = null == config ? void 0 : config.channel, this.appBuild = null == config ? void 0 : config.appBuild, 
        this.appDisplayVersion = null == config ? void 0 : config.appDisplayVersion, this.architecture = null == config ? void 0 : config.architecture, 
        this.osVersion = null == config ? void 0 : config.osVersion, this.debug = {}, (null == config ? void 0 : config.serverEndpoint) && !_utilsJs.validateURL(config.serverEndpoint)) throw new Error(`Unable to initialize Glean, serverEndpoint ${config.serverEndpoint} is an invalid URL.`);
        if (!_contextJs.Context.testing && (null === (_a = null == config ? void 0 : config.serverEndpoint) || void 0 === _a ? void 0 : _a.startsWith("http:"))) throw new Error(`Unable to initialize Glean, serverEndpoint ${config.serverEndpoint} must use the HTTPS protocol.`);
        this.serverEndpoint = config && config.serverEndpoint ? config.serverEndpoint : _constantsJs.DEFAULT_TELEMETRY_ENDPOINT, 
        this.httpClient = null == config ? void 0 : config.httpClient;
      }
      get debugViewTag() {
        return this.debug.debugViewTag || "";
      }
      set debugViewTag(tag) {
        _utilsJs.validateHeader(tag) ? this.debug.debugViewTag = tag : _logJsDefault.default("core.Config", [ `"${tag}" is not a valid \`debugViewTag\` value.`, "Please make sure the value passed satisfies the regex `^[a-zA-Z0-9-]{1,20}$`." ], _logJs.LoggingLevel.Error);
      }
      get sourceTags() {
        return this.debug.sourceTags || [];
      }
      set sourceTags(tags) {
        if (tags.length < 1 || tags.length > _constantsJs.GLEAN_MAX_SOURCE_TAGS) _logJsDefault.default("core.Config", `A list of tags cannot contain more than ${_constantsJs.GLEAN_MAX_SOURCE_TAGS} elements.`, _logJs.LoggingLevel.Error); else {
          for (const tag of tags) {
            if (tag.startsWith("glean")) return void _logJsDefault.default("core.Config", "Tags starting with `glean` are reserved and must not be used.", _logJs.LoggingLevel.Error);
            if (!_utilsJs.validateHeader(tag)) return;
          }
          this.debug.sourceTags = tags;
        }
      }
    }
  }, {
    "./constants.js": "kPBk9",
    "./utils.js": "gSLA7",
    "./log.js": "l3qBW",
    "./context.js": "fbkOU",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  jfZ0j: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "generateReservedMetricIdentifiers", (() => generateReservedMetricIdentifiers)), 
    parcelHelpers.export(exports, "isValidInternalMetricsRepresentation", (() => isValidInternalMetricsRepresentation));
    var _utilsJs = require("./utils.js"), _utilsJs1 = require("../utils.js"), _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _contextJs = require("../context.js");
    const LOG_TAG = "core.Metrics.Database";
    function generateReservedMetricIdentifiers(name) {
      return {
        category: "glean",
        name: `reserved#${name}`
      };
    }
    function isValidInternalMetricsRepresentation(v) {
      if (_utilsJs1.isObject(v)) {
        for (const metricType in v) {
          const metrics = v[metricType];
          if (!_utilsJs1.isObject(metrics)) return !1;
          for (const metricIdentifier in metrics) if (!_utilsJs.validateMetricInternalRepresentation(metricType, metrics[metricIdentifier])) return _logJsDefault.default(LOG_TAG, `Invalid metric representation found for metric "${metricIdentifier}"`, _logJs.LoggingLevel.Debug), 
          !1;
        }
        return !0;
      }
      return !1;
    }
    exports.default = class {
      constructor() {
        this.userStore = new _contextJs.Context.platform.Storage("userLifetimeMetrics"), 
        this.pingStore = new _contextJs.Context.platform.Storage("pingLifetimeMetrics"), 
        this.appStore = new _contextJs.Context.platform.Storage("appLifetimeMetrics");
      }
      _chooseStore(lifetime) {
        switch (lifetime) {
         case "user":
          return this.userStore;

         case "ping":
          return this.pingStore;

         case "application":
          return this.appStore;
        }
      }
      async record(metric, value) {
        await this.transform(metric, (() => value));
      }
      async transform(metric, transformFn) {
        if (metric.disabled) return;
        const store = this._chooseStore(metric.lifetime), storageKey = await metric.identifier();
        for (const ping of metric.sendInPings) {
          const finalTransformFn = v => transformFn(v).get();
          await store.update([ ping, metric.type, storageKey ], finalTransformFn);
        }
      }
      async hasMetric(lifetime, ping, metricType, metricIdentifier) {
        const store = this._chooseStore(lifetime), value = await store.get([ ping, metricType, metricIdentifier ]);
        return !_utilsJs1.isUndefined(value);
      }
      async countByBaseIdentifier(lifetime, ping, metricType, metricIdentifier) {
        const store = this._chooseStore(lifetime), pingStorage = await store.get([ ping, metricType ]);
        return _utilsJs1.isUndefined(pingStorage) ? 0 : Object.keys(pingStorage).filter((n => n.startsWith(metricIdentifier))).length;
      }
      async getMetric(ping, metric) {
        const store = this._chooseStore(metric.lifetime), storageKey = await metric.identifier(), value = await store.get([ ping, metric.type, storageKey ]);
        return _utilsJs1.isUndefined(value) || _utilsJs.validateMetricInternalRepresentation(metric.type, value) ? value : (_logJsDefault.default(LOG_TAG, `Unexpected value found for metric ${storageKey}: ${JSON.stringify(value)}. Clearing.`, _logJs.LoggingLevel.Error), 
        void await store.delete([ ping, metric.type, storageKey ]));
      }
      async getAndValidatePingData(ping, lifetime) {
        const store = this._chooseStore(lifetime), data = await store.get([ ping ]);
        return _utilsJs1.isUndefined(data) ? {} : isValidInternalMetricsRepresentation(data) ? data : (_logJsDefault.default(LOG_TAG, `Unexpected value found for ping "${ping}" in "${lifetime}" store: ${JSON.stringify(data)}. Clearing.`, _logJs.LoggingLevel.Debug), 
        await store.delete([ ping ]), {});
      }
      processLabeledMetric(snapshot, metricType, metricId, metricData) {
        const newType = `labeled_${metricType}`, idLabelSplit = metricId.split("/", 2), newId = idLabelSplit[0], label = idLabelSplit[1];
        if (newType in snapshot && newId in snapshot[newType]) {
          const existingData = snapshot[newType][newId];
          snapshot[newType][newId] = {
            ...existingData,
            [label]: metricData
          };
        } else snapshot[newType] = {
          ...snapshot[newType],
          [newId]: {
            [label]: metricData
          }
        };
      }
      async getPingMetrics(ping, clearPingLifetimeData) {
        const userData = await this.getAndValidatePingData(ping, "user"), pingData = await this.getAndValidatePingData(ping, "ping"), appData = await this.getAndValidatePingData(ping, "application");
        clearPingLifetimeData && Object.keys(pingData).length > 0 && await this.clear("ping", ping);
        const response = {};
        for (const data of [ userData, pingData, appData ]) for (const metricType in data) for (const metricId in data[metricType]) metricId.startsWith("glean.reserved#") || (metricId.includes("/") ? this.processLabeledMetric(response, metricType, metricId, data[metricType][metricId]) : response[metricType] = {
          ...response[metricType],
          [metricId]: data[metricType][metricId]
        });
        return 0 === Object.keys(response).length ? void 0 : function(v) {
          const result = {};
          for (const metricType in v) {
            const metrics = v[metricType];
            result[metricType] = {};
            for (const metricIdentifier in metrics) {
              const metric = _utilsJs.createMetric(metricType, metrics[metricIdentifier]);
              result[metricType][metricIdentifier] = metric.payload();
            }
          }
          return result;
        }(response);
      }
      async clear(lifetime, ping) {
        const store = this._chooseStore(lifetime), storageIndex = ping ? [ ping ] : [];
        await store.delete(storageIndex);
      }
      async clearAll() {
        await this.userStore.delete([]), await this.pingStore.delete([]), await this.appStore.delete([]);
      }
    };
  }, {
    "./utils.js": "hYPaM",
    "../utils.js": "gSLA7",
    "../log.js": "l3qBW",
    "../context.js": "fbkOU",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  hYPaM: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "createMetric", (() => createMetric)), 
    parcelHelpers.export(exports, "validateMetricInternalRepresentation", (() => validateMetricInternalRepresentation));
    var _labeledJs = require("./types/labeled.js"), _booleanJs = require("./types/boolean.js"), _counterJs = require("./types/counter.js"), _datetimeJs = require("./types/datetime.js"), _quantityJs = require("./types/quantity.js"), _rateJs = require("./types/rate.js"), _stringJs = require("./types/string.js"), _stringListJs = require("./types/string_list.js"), _textJs = require("./types/text.js"), _timespanJs = require("./types/timespan.js"), _urlJs = require("./types/url.js"), _uuidJs = require("./types/uuid.js");
    const METRIC_MAP = Object.freeze({
      boolean: _booleanJs.BooleanMetric,
      counter: _counterJs.CounterMetric,
      datetime: _datetimeJs.DatetimeMetric,
      labeled_boolean: _labeledJs.LabeledMetric,
      labeled_counter: _labeledJs.LabeledMetric,
      labeled_string: _labeledJs.LabeledMetric,
      quantity: _quantityJs.QuantityMetric,
      rate: _rateJs.RateMetric,
      string: _stringJs.StringMetric,
      string_list: _stringListJs.StringListMetric,
      text: _textJs.TextMetric,
      timespan: _timespanJs.TimespanMetric,
      url: _urlJs.UrlMetric,
      uuid: _uuidJs.UUIDMetric
    });
    function createMetric(type, v) {
      if (!(type in METRIC_MAP)) throw new Error(`Unable to create metric of unknown type ${type}`);
      return new METRIC_MAP[type](v);
    }
    function validateMetricInternalRepresentation(type, v) {
      try {
        return createMetric(type, v), !0;
      } catch (_a) {
        return !1;
      }
    }
  }, {
    "./types/labeled.js": "rM1qs",
    "./types/boolean.js": "8Q73J",
    "./types/counter.js": "2XjZC",
    "./types/datetime.js": "4adlt",
    "./types/quantity.js": "gH7TE",
    "./types/rate.js": "btxFJ",
    "./types/string.js": "dpEKZ",
    "./types/string_list.js": "iOMti",
    "./types/text.js": "9ML5U",
    "./types/timespan.js": "h7TRS",
    "./types/url.js": "1RkGU",
    "./types/uuid.js": "8BW3z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  rM1qs: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "LabeledMetric", (() => LabeledMetric)), 
    parcelHelpers.export(exports, "OTHER_LABEL", (() => OTHER_LABEL)), parcelHelpers.export(exports, "combineIdentifierAndLabel", (() => combineIdentifierAndLabel)), 
    parcelHelpers.export(exports, "stripLabel", (() => stripLabel)), parcelHelpers.export(exports, "getValidDynamicLabel", (() => getValidDynamicLabel));
    var _metricJs = require("../metric.js"), _contextJs = require("../../context.js"), _errorTypeJs = require("../../error/error_type.js");
    class LabeledMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      validate(v) {
        return !0;
      }
      payload() {
        return this._inner;
      }
    }
    const OTHER_LABEL = "__other__", LABEL_REGEX = /^[a-z_][a-z0-9_-]{0,29}(\.[a-z_][a-z0-9_-]{0,29})*$/;
    function combineIdentifierAndLabel(metricName, label) {
      return `${metricName}/${label}`;
    }
    function stripLabel(identifier) {
      return identifier.split("/")[0];
    }
    async function getValidDynamicLabel(metric) {
      if (void 0 === metric.dynamicLabel) throw new Error("This point should never be reached.");
      const key = combineIdentifierAndLabel(metric.baseIdentifier(), metric.dynamicLabel);
      for (const ping of metric.sendInPings) if (await _contextJs.Context.metricsDatabase.hasMetric(metric.lifetime, ping, metric.type, key)) return key;
      let numUsedKeys = 0;
      for (const ping1 of metric.sendInPings) numUsedKeys += await _contextJs.Context.metricsDatabase.countByBaseIdentifier(metric.lifetime, ping1, metric.type, metric.baseIdentifier());
      let hitError = !1;
      return numUsedKeys >= 16 ? hitError = !0 : metric.dynamicLabel.length > 61 ? (hitError = !0, 
      await _contextJs.Context.errorManager.record(metric, _errorTypeJs.ErrorType.InvalidLabel, `Label length ${metric.dynamicLabel.length} exceeds maximum of 61.`)) : LABEL_REGEX.test(metric.dynamicLabel) || (hitError = !0, 
      await _contextJs.Context.errorManager.record(metric, _errorTypeJs.ErrorType.InvalidLabel, `Label must be snake_case, got '${metric.dynamicLabel}'.`)), 
      hitError ? combineIdentifierAndLabel(metric.baseIdentifier(), OTHER_LABEL) : key;
    }
    class LabeledMetricType {
      constructor(meta1, submetric, labels) {
        return new Proxy(this, {
          get: (_target, label) => labels ? LabeledMetricType.createFromStaticLabel(meta1, submetric, labels, label) : LabeledMetricType.createFromDynamicLabel(meta1, submetric, label)
        });
      }
      static createFromStaticLabel(meta, submetricClass, allowedLabels, label) {
        const adjustedLabel = allowedLabels.includes(label) ? label : OTHER_LABEL;
        return new submetricClass({
          ...meta,
          name: combineIdentifierAndLabel(meta.name, adjustedLabel)
        });
      }
      static createFromDynamicLabel(meta, submetricClass, label) {
        return new submetricClass({
          ...meta,
          dynamicLabel: label
        });
      }
    }
    exports.default = LabeledMetricType;
  }, {
    "../metric.js": "3rqgD",
    "../../context.js": "fbkOU",
    "../../error/error_type.js": "euvNM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "3rqgD": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Metric", (() => Metric));
    var _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs);
    class Metric {
      constructor(v1) {
        if (!this.validate(v1)) throw new Error("Unable to create new Metric instance, value is in unexpected format.");
        this._inner = v1;
      }
      get() {
        return this._inner;
      }
      set(v) {
        this.validate(v) ? this._inner = v : _logJsDefault.default("core.Metrics.Metric", `Unable to set metric to ${JSON.stringify(v)}. Value is in unexpected format. Ignoring.`, _logJs.LoggingLevel.Error);
      }
    }
  }, {
    "../log.js": "l3qBW",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "8Q73J": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "BooleanMetric", (() => BooleanMetric));
    var _indexJs = require("../index.js"), _contextJs = require("../../context.js"), _metricJs = require("../metric.js"), _utilsJs = require("../../utils.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    class BooleanMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      validate(v) {
        return _utilsJs.isBoolean(v);
      }
      payload() {
        return this._inner;
      }
    }
    class BooleanMetricType extends _indexJs.MetricType {
      constructor(meta) {
        super("boolean", meta);
      }
      set(value) {
        _contextJs.Context.dispatcher.launch((async () => {
          if (!this.shouldRecord(_contextJs.Context.uploadEnabled)) return;
          const metric = new BooleanMetric(value);
          await _contextJs.Context.metricsDatabase.record(this, metric);
        }));
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let metric;
        return await _contextJs.Context.dispatcher.testLaunch((async () => {
          metric = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), metric;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.BooleanMetricType") ], BooleanMetricType.prototype, "testGetValue", null), 
    exports.default = BooleanMetricType;
  }, {
    "../index.js": "fCqHm",
    "../../context.js": "fbkOU",
    "../metric.js": "3rqgD",
    "../../utils.js": "gSLA7",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  fCqHm: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "MetricType", (() => MetricType));
    var _utilsJs = require("../utils.js"), _labeledJs = require("./types/labeled.js"), _contextJs = require("../context.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    class MetricType {
      constructor(type, meta) {
        this.type = type, this.name = meta.name, this.category = meta.category, this.sendInPings = meta.sendInPings, 
        this.lifetime = meta.lifetime, this.disabled = meta.disabled, this.dynamicLabel = meta.dynamicLabel;
      }
      baseIdentifier() {
        return this.category.length > 0 ? `${this.category}.${this.name}` : this.name;
      }
      async identifier() {
        const baseIdentifier = this.baseIdentifier();
        return _utilsJs.isUndefined(this.dynamicLabel) ? baseIdentifier : await _labeledJs.getValidDynamicLabel(this);
      }
      shouldRecord(uploadEnabled) {
        return uploadEnabled && !this.disabled;
      }
      async testGetNumRecordedErrors(errorType, ping = this.sendInPings[0]) {
        return _contextJs.Context.errorManager.testGetNumRecordedErrors(this, errorType, ping);
      }
    }
    __decorate([ _utilsJs.testOnly() ], MetricType.prototype, "testGetNumRecordedErrors", null);
  }, {
    "../utils.js": "gSLA7",
    "./types/labeled.js": "rM1qs",
    "../context.js": "fbkOU",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "2XjZC": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "CounterMetric", (() => CounterMetric));
    var _utilsJs = require("../../utils.js"), _indexJs = require("../index.js"), _contextJs = require("../../context.js"), _metricJs = require("../metric.js"), _errorTypeJs = require("../../error/error_type.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    class CounterMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      validate(v) {
        return !!_utilsJs.isInteger(v) && !(v <= 0);
      }
      payload() {
        return this._inner;
      }
    }
    class CounterMetricType extends _indexJs.MetricType {
      constructor(meta) {
        super("counter", meta);
      }
      static async _private_addUndispatched(instance, amount) {
        if (!instance.shouldRecord(_contextJs.Context.uploadEnabled)) return;
        if (_utilsJs.isUndefined(amount) && (amount = 1), amount <= 0) return void await _contextJs.Context.errorManager.record(instance, _errorTypeJs.ErrorType.InvalidValue, `Added negative and zero value ${amount}`);
        const transformFn = (amount => v2 => {
          let metric, result;
          try {
            metric = new CounterMetric(v2), result = metric.get() + amount;
          } catch (_a) {
            metric = new CounterMetric(amount), result = amount;
          }
          return result > Number.MAX_SAFE_INTEGER && (result = Number.MAX_SAFE_INTEGER), metric.set(result), 
          metric;
        })(amount);
        await _contextJs.Context.metricsDatabase.transform(instance, transformFn);
      }
      add(amount) {
        _contextJs.Context.dispatcher.launch((async () => CounterMetricType._private_addUndispatched(this, amount)));
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let metric;
        return await _contextJs.Context.dispatcher.testLaunch((async () => {
          metric = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), metric;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.CounterMetricType") ], CounterMetricType.prototype, "testGetValue", null), 
    exports.default = CounterMetricType;
  }, {
    "../../utils.js": "gSLA7",
    "../index.js": "fCqHm",
    "../../context.js": "fbkOU",
    "../metric.js": "3rqgD",
    "../../error/error_type.js": "euvNM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "4adlt": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "formatTimezoneOffset", (() => formatTimezoneOffset)), 
    parcelHelpers.export(exports, "DatetimeMetric", (() => DatetimeMetric));
    var _indexJs = require("../index.js"), _timeUnitJs = require("../../metrics/time_unit.js"), _timeUnitJsDefault = parcelHelpers.interopDefault(_timeUnitJs), _contextJs = require("../../context.js"), _metricJs = require("../metric.js"), _utilsJs = require("../../utils.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    const LOG_TAG = "core.metrics.DatetimeMetricType";
    function formatTimezoneOffset(timezone) {
      const offset = timezone / 60 * -1;
      return `${offset > 0 ? "+" : "-"}${Math.abs(offset).toString().padStart(2, "0")}:00`;
    }
    class DatetimeMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      static fromDate(v, timeUnit) {
        return new DatetimeMetric({
          timeUnit: timeUnit,
          timezone: v.getTimezoneOffset(),
          date: v.toISOString()
        });
      }
      get date() {
        return new Date(this._inner.date);
      }
      get timezone() {
        return this._inner.timezone;
      }
      get timeUnit() {
        return this._inner.timeUnit;
      }
      get dateISOString() {
        return this._inner.date;
      }
      validate(v) {
        if (!_utilsJs.isObject(v) || 3 !== Object.keys(v).length) return !1;
        const timeUnitVerification = "timeUnit" in v && _utilsJs.isString(v.timeUnit) && Object.values(_timeUnitJsDefault.default).includes(v.timeUnit), timezoneVerification = "timezone" in v && _utilsJs.isNumber(v.timezone), dateVerification = "date" in v && _utilsJs.isString(v.date) && 24 === v.date.length && !isNaN(Date.parse(v.date));
        return !!(timeUnitVerification && timezoneVerification && dateVerification);
      }
      payload() {
        const extractedDateInfo = this.dateISOString.match(/\d+/g);
        if (!extractedDateInfo || extractedDateInfo.length < 0) throw new Error("IMPOSSIBLE: Unable to extract date information from DatetimeMetric.");
        const correctedDate = new Date(parseInt(extractedDateInfo[0]), parseInt(extractedDateInfo[1]) - 1, parseInt(extractedDateInfo[2]), parseInt(extractedDateInfo[3]) - this.timezone / 60, parseInt(extractedDateInfo[4]), parseInt(extractedDateInfo[5]), parseInt(extractedDateInfo[6])), timezone = formatTimezoneOffset(this.timezone), year = correctedDate.getFullYear().toString().padStart(2, "0"), month = (correctedDate.getMonth() + 1).toString().padStart(2, "0"), day = correctedDate.getDate().toString().padStart(2, "0");
        if (this.timeUnit === _timeUnitJsDefault.default.Day) return `${year}-${month}-${day}${timezone}`;
        const hours = correctedDate.getHours().toString().padStart(2, "0");
        if (this.timeUnit === _timeUnitJsDefault.default.Hour) return `${year}-${month}-${day}T${hours}${timezone}`;
        const minutes = correctedDate.getMinutes().toString().padStart(2, "0");
        if (this.timeUnit === _timeUnitJsDefault.default.Minute) return `${year}-${month}-${day}T${hours}:${minutes}${timezone}`;
        const seconds = correctedDate.getSeconds().toString().padStart(2, "0");
        if (this.timeUnit === _timeUnitJsDefault.default.Second) return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;
        const milliseconds = correctedDate.getMilliseconds().toString().padStart(3, "0");
        return this.timeUnit === _timeUnitJsDefault.default.Millisecond ? `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezone}` : this.timeUnit === _timeUnitJsDefault.default.Microsecond ? `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}000${timezone}` : `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}000000${timezone}`;
      }
    }
    class DatetimeMetricType extends _indexJs.MetricType {
      constructor(meta, timeUnit) {
        super("datetime", meta), this.timeUnit = timeUnit;
      }
      static async _private_setUndispatched(instance, value) {
        if (!instance.shouldRecord(_contextJs.Context.uploadEnabled)) return;
        value || (value = new Date);
        const truncatedDate = value;
        switch (instance.timeUnit) {
         case _timeUnitJsDefault.default.Day:
          truncatedDate.setMilliseconds(0), truncatedDate.setSeconds(0), truncatedDate.setMinutes(0), 
          truncatedDate.setMilliseconds(0);

         case _timeUnitJsDefault.default.Hour:
          truncatedDate.setMilliseconds(0), truncatedDate.setSeconds(0), truncatedDate.setMinutes(0);

         case _timeUnitJsDefault.default.Minute:
          truncatedDate.setMilliseconds(0), truncatedDate.setSeconds(0);

         case _timeUnitJsDefault.default.Second:
          truncatedDate.setMilliseconds(0);
        }
        const metric = DatetimeMetric.fromDate(value, instance.timeUnit);
        await _contextJs.Context.metricsDatabase.record(instance, metric);
      }
      set(value) {
        _contextJs.Context.dispatcher.launch((() => DatetimeMetricType._private_setUndispatched(this, value)));
      }
      async testGetValueAsDatetimeMetric(ping) {
        let value;
        if (await _contextJs.Context.dispatcher.testLaunch((async () => {
          value = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), value) return new DatetimeMetric(value);
      }
      async testGetValueAsString(ping = this.sendInPings[0]) {
        const metric = await this.testGetValueAsDatetimeMetric(ping);
        return metric ? metric.payload() : void 0;
      }
      async testGetValue(ping = this.sendInPings[0]) {
        const metric = await this.testGetValueAsDatetimeMetric(ping);
        return metric ? metric.date : void 0;
      }
    }
    __decorate([ _utilsJs.testOnly(LOG_TAG) ], DatetimeMetricType.prototype, "testGetValueAsDatetimeMetric", null), 
    __decorate([ _utilsJs.testOnly(LOG_TAG) ], DatetimeMetricType.prototype, "testGetValueAsString", null), 
    __decorate([ _utilsJs.testOnly(LOG_TAG) ], DatetimeMetricType.prototype, "testGetValue", null), 
    exports.default = DatetimeMetricType;
  }, {
    "../index.js": "fCqHm",
    "../../metrics/time_unit.js": "d9iTI",
    "../../context.js": "fbkOU",
    "../metric.js": "3rqgD",
    "../../utils.js": "gSLA7",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  d9iTI: [ function(require, module, exports) {
    var TimeUnit, TimeUnit1;
    require("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(exports), 
    (TimeUnit1 = TimeUnit || (TimeUnit = {})).Nanosecond = "nanosecond", TimeUnit1.Microsecond = "microsecond", 
    TimeUnit1.Millisecond = "millisecond", TimeUnit1.Second = "second", TimeUnit1.Minute = "minute", 
    TimeUnit1.Hour = "hour", TimeUnit1.Day = "day", exports.default = TimeUnit;
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  gH7TE: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "QuantityMetric", (() => QuantityMetric));
    var _indexJs = require("../index.js"), _utilsJs = require("../../utils.js"), _contextJs = require("../../context.js"), _metricJs = require("../metric.js"), _errorTypeJs = require("../../error/error_type.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    class QuantityMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      validate(v) {
        return !!_utilsJs.isInteger(v) && !(v < 0);
      }
      payload() {
        return this._inner;
      }
    }
    class QuantityMetricType extends _indexJs.MetricType {
      constructor(meta) {
        super("quantity", meta);
      }
      static async _private_setUndispatched(instance, value) {
        if (!instance.shouldRecord(_contextJs.Context.uploadEnabled)) return;
        if (value < 0) return void await _contextJs.Context.errorManager.record(instance, _errorTypeJs.ErrorType.InvalidValue, `Set negative value ${value}`);
        value > Number.MAX_SAFE_INTEGER && (value = Number.MAX_SAFE_INTEGER);
        const metric = new QuantityMetric(value);
        await _contextJs.Context.metricsDatabase.record(instance, metric);
      }
      set(value) {
        _contextJs.Context.dispatcher.launch((() => QuantityMetricType._private_setUndispatched(this, value)));
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let metric;
        return await _contextJs.Context.dispatcher.testLaunch((async () => {
          metric = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), metric;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.QuantityMetricType") ], QuantityMetricType.prototype, "testGetValue", null), 
    exports.default = QuantityMetricType;
  }, {
    "../index.js": "fCqHm",
    "../../utils.js": "gSLA7",
    "../../context.js": "fbkOU",
    "../metric.js": "3rqgD",
    "../../error/error_type.js": "euvNM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  btxFJ: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "RateMetric", (() => RateMetric));
    var _indexJs = require("../index.js"), _contextJs = require("../../context.js"), _metricJs = require("../metric.js"), _utilsJs = require("../../utils.js"), _errorTypeJs = require("../../error/error_type.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    class RateMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      get numerator() {
        return this._inner.numerator;
      }
      get denominator() {
        return this._inner.denominator;
      }
      validate(v) {
        if (!_utilsJs.isObject(v) || 2 !== Object.keys(v).length) return !1;
        const numeratorVerification = "numerator" in v && _utilsJs.isNumber(v.numerator) && v.numerator >= 0, denominatorVerification = "denominator" in v && _utilsJs.isNumber(v.denominator) && v.denominator >= 0;
        return numeratorVerification && denominatorVerification;
      }
      payload() {
        return {
          numerator: this._inner.numerator,
          denominator: this._inner.denominator
        };
      }
    }
    class RateMetricType extends _indexJs.MetricType {
      constructor(meta) {
        super("rate", meta);
      }
      addToNumerator(amount) {
        _contextJs.Context.dispatcher.launch((async () => {
          if (!this.shouldRecord(_contextJs.Context.uploadEnabled)) return;
          if (amount < 0) return void await _contextJs.Context.errorManager.record(this, _errorTypeJs.ErrorType.InvalidValue, `Added negative value ${amount} to numerator.`);
          const transformFn = (amount => v2 => {
            let metric, result;
            try {
              metric = new RateMetric(v2), result = metric.numerator + amount;
            } catch (_a) {
              metric = new RateMetric({
                numerator: amount,
                denominator: 0
              }), result = amount;
            }
            return result > Number.MAX_SAFE_INTEGER && (result = Number.MAX_SAFE_INTEGER), metric.set({
              numerator: result,
              denominator: metric.denominator
            }), metric;
          })(amount);
          await _contextJs.Context.metricsDatabase.transform(this, transformFn);
        }));
      }
      addToDenominator(amount) {
        _contextJs.Context.dispatcher.launch((async () => {
          if (!this.shouldRecord(_contextJs.Context.uploadEnabled)) return;
          if (amount < 0) return void await _contextJs.Context.errorManager.record(this, _errorTypeJs.ErrorType.InvalidValue, `Added negative value ${amount} to denominator.`);
          const transformFn = (amount => v2 => {
            let metric, result;
            try {
              metric = new RateMetric(v2), result = metric.denominator + amount;
            } catch (_a) {
              metric = new RateMetric({
                numerator: 0,
                denominator: amount
              }), result = amount;
            }
            return result > Number.MAX_SAFE_INTEGER && (result = Number.MAX_SAFE_INTEGER), metric.set({
              numerator: metric.numerator,
              denominator: result
            }), metric;
          })(amount);
          await _contextJs.Context.metricsDatabase.transform(this, transformFn);
        }));
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let metric;
        return await _contextJs.Context.dispatcher.testLaunch((async () => {
          metric = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), metric;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.RateMetricType") ], RateMetricType.prototype, "testGetValue", null), 
    exports.default = RateMetricType;
  }, {
    "../index.js": "fCqHm",
    "../../context.js": "fbkOU",
    "../metric.js": "3rqgD",
    "../../utils.js": "gSLA7",
    "../../error/error_type.js": "euvNM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  dpEKZ: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "MAX_LENGTH_VALUE", (() => MAX_LENGTH_VALUE)), 
    parcelHelpers.export(exports, "StringMetric", (() => StringMetric));
    var _indexJs = require("../index.js"), _contextJs = require("../../context.js"), _metricJs = require("../metric.js"), _utilsJs = require("../../utils.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    const MAX_LENGTH_VALUE = 100;
    class StringMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      validate(v) {
        return !!_utilsJs.isString(v) && !(v.length > MAX_LENGTH_VALUE);
      }
      payload() {
        return this._inner;
      }
    }
    class StringMetricType extends _indexJs.MetricType {
      constructor(meta) {
        super("string", meta);
      }
      static async _private_setUndispatched(instance, value) {
        if (!instance.shouldRecord(_contextJs.Context.uploadEnabled)) return;
        const truncatedValue = await _utilsJs.truncateStringAtBoundaryWithError(instance, value, MAX_LENGTH_VALUE), metric = new StringMetric(truncatedValue);
        await _contextJs.Context.metricsDatabase.record(instance, metric);
      }
      set(value) {
        _contextJs.Context.dispatcher.launch((() => StringMetricType._private_setUndispatched(this, value)));
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let metric;
        return await _contextJs.Context.dispatcher.testLaunch((async () => {
          metric = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), metric;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.StringMetricType") ], StringMetricType.prototype, "testGetValue", null), 
    exports.default = StringMetricType;
  }, {
    "../index.js": "fCqHm",
    "../../context.js": "fbkOU",
    "../metric.js": "3rqgD",
    "../../utils.js": "gSLA7",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  iOMti: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "MAX_LIST_LENGTH", (() => MAX_LIST_LENGTH)), 
    parcelHelpers.export(exports, "MAX_STRING_LENGTH", (() => MAX_STRING_LENGTH)), parcelHelpers.export(exports, "StringListMetric", (() => StringListMetric));
    var _indexJs = require("../index.js"), _contextJs = require("../../context.js"), _metricJs = require("../metric.js"), _utilsJs = require("../../utils.js"), _errorTypeJs = require("../../error/error_type.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    const MAX_LIST_LENGTH = 20, MAX_STRING_LENGTH = 50;
    class StringListMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      validate(v) {
        if (!Array.isArray(v)) return !1;
        if (v.length > MAX_LIST_LENGTH) return !1;
        for (const s of v) if (!_utilsJs.isString(s) || s.length > MAX_STRING_LENGTH) return !1;
        return !0;
      }
      payload() {
        return this._inner;
      }
    }
    class StringListMetricType extends _indexJs.MetricType {
      constructor(meta) {
        super("string_list", meta);
      }
      set(value) {
        _contextJs.Context.dispatcher.launch((async () => {
          if (!this.shouldRecord(_contextJs.Context.uploadEnabled)) return;
          const truncatedList = [];
          value.length > MAX_LIST_LENGTH && await _contextJs.Context.errorManager.record(this, _errorTypeJs.ErrorType.InvalidValue, `String list length of ${value.length} exceeds maximum of ${MAX_LIST_LENGTH}.`);
          for (let i = 0; i < Math.min(value.length, MAX_LIST_LENGTH); ++i) {
            const truncatedString = await _utilsJs.truncateStringAtBoundaryWithError(this, value[i], MAX_STRING_LENGTH);
            truncatedList.push(truncatedString);
          }
          const metric = new StringListMetric(truncatedList);
          await _contextJs.Context.metricsDatabase.record(this, metric);
        }));
      }
      add(value) {
        _contextJs.Context.dispatcher.launch((async () => {
          if (!this.shouldRecord(_contextJs.Context.uploadEnabled)) return;
          const truncatedValue = await _utilsJs.truncateStringAtBoundaryWithError(this, value, MAX_STRING_LENGTH);
          let currentLen = 0;
          const transformFn = (value => v2 => {
            let metric, result;
            try {
              metric = new StringListMetric(v2), result = metric.get(), currentLen = result.length, 
              result.length < MAX_LIST_LENGTH && result.push(value);
            } catch (_a) {
              metric = new StringListMetric([ value ]), result = [ value ];
            }
            return metric.set(result), metric;
          })(truncatedValue);
          await _contextJs.Context.metricsDatabase.transform(this, transformFn), currentLen >= MAX_LIST_LENGTH && await _contextJs.Context.errorManager.record(this, _errorTypeJs.ErrorType.InvalidValue, `String list length of ${currentLen + 1} exceeds maximum of ${MAX_LIST_LENGTH}.`);
        }));
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let metric;
        return await _contextJs.Context.dispatcher.testLaunch((async () => {
          metric = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), metric;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.StringListMetricType") ], StringListMetricType.prototype, "testGetValue", null), 
    exports.default = StringListMetricType;
  }, {
    "../index.js": "fCqHm",
    "../../context.js": "fbkOU",
    "../metric.js": "3rqgD",
    "../../utils.js": "gSLA7",
    "../../error/error_type.js": "euvNM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "9ML5U": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "TEXT_MAX_LENGTH", (() => TEXT_MAX_LENGTH)), 
    parcelHelpers.export(exports, "TextMetric", (() => TextMetric));
    var _utilsJs = require("../../utils.js"), _indexJs = require("../index.js"), _contextJs = require("../../context.js"), _metricJs = require("../metric.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    const TEXT_MAX_LENGTH = 204800;
    class TextMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      validate(v) {
        return !!_utilsJs.isString(v) && !(v.length > TEXT_MAX_LENGTH);
      }
      payload() {
        return this._inner;
      }
    }
    class TextMetricType extends _indexJs.MetricType {
      constructor(meta) {
        super("text", meta);
      }
      set(text) {
        _contextJs.Context.dispatcher.launch((async () => {
          if (!this.shouldRecord(_contextJs.Context.uploadEnabled)) return;
          const truncatedValue = await _utilsJs.truncateStringAtBoundaryWithError(this, text, TEXT_MAX_LENGTH), metric = new TextMetric(truncatedValue);
          await _contextJs.Context.metricsDatabase.record(this, metric);
        }));
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let metric;
        return await _contextJs.Context.dispatcher.testLaunch((async () => {
          metric = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), metric;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.TextMetricType") ], TextMetricType.prototype, "testGetValue", null), 
    exports.default = TextMetricType;
  }, {
    "../../utils.js": "gSLA7",
    "../index.js": "fCqHm",
    "../../context.js": "fbkOU",
    "../metric.js": "3rqgD",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  h7TRS: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "TimespanMetric", (() => TimespanMetric));
    var _utilsJs = require("../../utils.js"), _timeUnitJs = require("../time_unit.js"), _timeUnitJsDefault = parcelHelpers.interopDefault(_timeUnitJs), _indexJs = require("../index.js"), _metricJs = require("../metric.js"), _contextJs = require("../../context.js"), _errorTypeJs = require("../../error/error_type.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    class TimespanMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      get timespan() {
        switch (this._inner.timeUnit) {
         case _timeUnitJsDefault.default.Nanosecond:
          return 1e6 * this._inner.timespan;

         case _timeUnitJsDefault.default.Microsecond:
          return 1e3 * this._inner.timespan;

         case _timeUnitJsDefault.default.Millisecond:
          return this._inner.timespan;

         case _timeUnitJsDefault.default.Second:
          return Math.round(this._inner.timespan / 1e3);

         case _timeUnitJsDefault.default.Minute:
          return Math.round(this._inner.timespan / 1e3 / 60);

         case _timeUnitJsDefault.default.Hour:
          return Math.round(this._inner.timespan / 1e3 / 60 / 60);

         case _timeUnitJsDefault.default.Day:
          return Math.round(this._inner.timespan / 1e3 / 60 / 60 / 24);
        }
      }
      validate(v) {
        if (!_utilsJs.isObject(v) || 2 !== Object.keys(v).length) return !1;
        const timeUnitVerification = "timeUnit" in v && _utilsJs.isString(v.timeUnit) && Object.values(_timeUnitJsDefault.default).includes(v.timeUnit), timespanVerification = "timespan" in v && _utilsJs.isNumber(v.timespan) && v.timespan >= 0;
        return !(!timeUnitVerification || !timespanVerification);
      }
      payload() {
        return {
          time_unit: this._inner.timeUnit,
          value: this.timespan
        };
      }
    }
    class TimespanMetricType extends _indexJs.MetricType {
      constructor(meta, timeUnit) {
        super("timespan", meta), this.timeUnit = timeUnit;
      }
      static async _private_setRawUndispatched(instance, elapsed) {
        if (!instance.shouldRecord(_contextJs.Context.uploadEnabled)) return;
        if (!_utilsJs.isUndefined(instance.startTime)) return void await _contextJs.Context.errorManager.record(instance, _errorTypeJs.ErrorType.InvalidState, "Timespan already running. Raw value not recorded.");
        let reportValueExists = !1;
        const transformFn = (elapsed => old => {
          let metric;
          try {
            metric = new TimespanMetric(old), reportValueExists = !0;
          } catch (_a) {
            metric = new TimespanMetric({
              timespan: elapsed,
              timeUnit: instance.timeUnit
            });
          }
          return metric;
        })(elapsed);
        await _contextJs.Context.metricsDatabase.transform(instance, transformFn), reportValueExists && await _contextJs.Context.errorManager.record(instance, _errorTypeJs.ErrorType.InvalidState, "Timespan value already recorded. New value discarded.");
      }
      start() {
        const startTime = _utilsJs.getMonotonicNow();
        _contextJs.Context.dispatcher.launch((async () => {
          if (this.shouldRecord(_contextJs.Context.uploadEnabled)) {
            if (_utilsJs.isUndefined(this.startTime)) return this.startTime = startTime, Promise.resolve();
            await _contextJs.Context.errorManager.record(this, _errorTypeJs.ErrorType.InvalidState, "Timespan already started");
          }
        }));
      }
      stop() {
        const stopTime = _utilsJs.getMonotonicNow();
        _contextJs.Context.dispatcher.launch((async () => {
          if (!this.shouldRecord(_contextJs.Context.uploadEnabled)) return void (this.startTime = void 0);
          if (_utilsJs.isUndefined(this.startTime)) return void await _contextJs.Context.errorManager.record(this, _errorTypeJs.ErrorType.InvalidState, "Timespan not running.");
          const elapsed = stopTime - this.startTime;
          this.startTime = void 0, elapsed < 0 ? await _contextJs.Context.errorManager.record(this, _errorTypeJs.ErrorType.InvalidState, "Timespan was negative.") : await TimespanMetricType._private_setRawUndispatched(this, elapsed);
        }));
      }
      cancel() {
        _contextJs.Context.dispatcher.launch((() => (this.startTime = void 0, Promise.resolve())));
      }
      setRawNanos(elapsed) {
        _contextJs.Context.dispatcher.launch((async () => {
          const elapsedMillis = 1e-6 * elapsed;
          await TimespanMetricType._private_setRawUndispatched(this, elapsedMillis);
        }));
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let value;
        if (await _contextJs.Context.dispatcher.testLaunch((async () => {
          value = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), value) return new TimespanMetric(value).timespan;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.TimespanMetricType") ], TimespanMetricType.prototype, "testGetValue", null), 
    exports.default = TimespanMetricType;
  }, {
    "../../utils.js": "gSLA7",
    "../time_unit.js": "d9iTI",
    "../index.js": "fCqHm",
    "../metric.js": "3rqgD",
    "../../context.js": "fbkOU",
    "../../error/error_type.js": "euvNM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "1RkGU": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "UrlMetric", (() => UrlMetric));
    var _utilsJs = require("../../utils.js"), _indexJs = require("../index.js"), _contextJs = require("../../context.js"), _metricJs = require("../metric.js"), _errorTypeJs = require("../../error/error_type.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    const URL_VALIDATION_REGEX = /^[a-zA-Z][a-zA-Z0-9-\+\.]*:(.*)$/;
    class UrlMetricError extends Error {
      constructor(type, message) {
        super(message), this.type = type, this.name = "UrlMetricError";
      }
    }
    class UrlMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      validate(v) {
        if (!_utilsJs.isString(v)) return !1;
        if (v.length > 2048) throw new UrlMetricError(_errorTypeJs.ErrorType.InvalidOverflow, `URL length ${v.length} exceeds maximum of 2048.`);
        if (v.startsWith("data:")) throw new UrlMetricError(_errorTypeJs.ErrorType.InvalidValue, "URL metric does not support data URLs.");
        if (!URL_VALIDATION_REGEX.test(v)) throw new UrlMetricError(_errorTypeJs.ErrorType.InvalidValue, `"${v}" does not start with a valid URL scheme.`);
        return !0;
      }
      payload() {
        return this._inner;
      }
    }
    class UrlMetricType extends _indexJs.MetricType {
      constructor(meta) {
        super("url", meta);
      }
      set(url) {
        _contextJs.Context.dispatcher.launch((async () => {
          if (this.shouldRecord(_contextJs.Context.uploadEnabled)) try {
            const metric = new UrlMetric(url);
            await _contextJs.Context.metricsDatabase.record(this, metric);
          } catch (e) {
            e instanceof UrlMetricError && await _contextJs.Context.errorManager.record(this, e.type, e);
          }
        }));
      }
      setUrl(url) {
        this.set(url.toString());
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let metric;
        return await _contextJs.Context.dispatcher.testLaunch((async () => {
          metric = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), metric;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.URLMetricType") ], UrlMetricType.prototype, "testGetValue", null), 
    exports.default = UrlMetricType;
  }, {
    "../../utils.js": "gSLA7",
    "../index.js": "fCqHm",
    "../../context.js": "fbkOU",
    "../metric.js": "3rqgD",
    "../../error/error_type.js": "euvNM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "8BW3z": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "UUIDMetric", (() => UUIDMetric));
    var _indexJs = require("../index.js"), _utilsJs = require("../../utils.js"), _contextJs = require("../../context.js"), _metricJs = require("../metric.js"), _errorTypeJs = require("../../error/error_type.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    class UUIDMetric extends _metricJs.Metric {
      constructor(v1) {
        super(v1);
      }
      validate(v) {
        return !!_utilsJs.isString(v) && UUID_REGEX.test(v);
      }
      payload() {
        return this._inner;
      }
    }
    class UUIDMetricType extends _indexJs.MetricType {
      constructor(meta) {
        super("uuid", meta);
      }
      static async _private_setUndispatched(instance, value) {
        if (!instance.shouldRecord(_contextJs.Context.uploadEnabled)) return;
        let metric;
        value || (value = _utilsJs.generateUUIDv4());
        try {
          metric = new UUIDMetric(value);
        } catch (_a) {
          return void await _contextJs.Context.errorManager.record(instance, _errorTypeJs.ErrorType.InvalidValue, `"${value}" is not a valid UUID.`);
        }
        await _contextJs.Context.metricsDatabase.record(instance, metric);
      }
      set(value) {
        _contextJs.Context.dispatcher.launch((() => UUIDMetricType._private_setUndispatched(this, value)));
      }
      generateAndSet() {
        if (!this.shouldRecord(_contextJs.Context.uploadEnabled)) return;
        const value = _utilsJs.generateUUIDv4();
        return this.set(value), value;
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let metric;
        return await _contextJs.Context.dispatcher.testLaunch((async () => {
          metric = await _contextJs.Context.metricsDatabase.getMetric(ping, this);
        })), metric;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.UUIDMetricType") ], UUIDMetricType.prototype, "testGetValue", null), 
    exports.default = UUIDMetricType;
  }, {
    "../index.js": "fCqHm",
    "../../utils.js": "gSLA7",
    "../../context.js": "fbkOU",
    "../metric.js": "3rqgD",
    "../../error/error_type.js": "euvNM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  fOTtz: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "isDeletionRequest", (() => isDeletionRequest)), 
    parcelHelpers.export(exports, "isValidPingInternalRepresentation", (() => isValidPingInternalRepresentation));
    var _utilsJs = require("../utils.js"), _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _constantsJs = require("../constants.js"), _fflate = require("fflate"), _contextJs = require("../context.js");
    const LOG_TAG = "core.Pings.Database";
    function isDeletionRequest(ping) {
      return ping.path.split("/")[3] === _constantsJs.DELETION_REQUEST_PING_NAME;
    }
    function getPingSize(ping) {
      return _fflate.strToU8(JSON.stringify(ping)).length;
    }
    function isValidPingInternalRepresentation(v) {
      if (_utilsJs.isObject(v) && (2 === Object.keys(v).length || 3 === Object.keys(v).length)) {
        const hasValidPath = "path" in v && _utilsJs.isString(v.path), hasValidPayload = "payload" in v && _utilsJs.isJSONValue(v.payload) && _utilsJs.isObject(v.payload), hasValidHeaders = !("headers" in v) || _utilsJs.isJSONValue(v.headers) && _utilsJs.isObject(v.headers);
        return !!(hasValidPath && hasValidPayload && hasValidHeaders);
      }
      return !1;
    }
    exports.default = class {
      constructor() {
        this.store = new _contextJs.Context.platform.Storage("pings");
      }
      attachObserver(observer) {
        this.observer = observer;
      }
      async recordPing(path, identifier, payload, headers) {
        const ping = {
          collectionDate: (new Date).toISOString(),
          path: path,
          payload: payload
        };
        headers && (ping.headers = headers), await this.store.update([ identifier ], (() => ping)), 
        this.observer && this.observer.update(identifier, ping);
      }
      async deletePing(identifier) {
        await this.store.delete([ identifier ]);
      }
      async getAllPings() {
        const allStoredPings = await this.store.get(), finalPings = {};
        if (_utilsJs.isObject(allStoredPings)) for (const identifier in allStoredPings) {
          const ping = allStoredPings[identifier];
          isValidPingInternalRepresentation(ping) ? finalPings[identifier] = ping : (_logJsDefault.default(LOG_TAG, "Unexpected data found in pings database. Deleting.", _logJs.LoggingLevel.Warn), 
          await this.store.delete([ identifier ]));
        }
        return Object.entries(finalPings).sort((([_idA, {collectionDate: dateA}], [_idB, {collectionDate: dateB}]) => new Date(dateA).getTime() - new Date(dateB).getTime()));
      }
      async getAllPingsWithoutSurplus(maxCount = 250, maxSize = 10485760) {
        const allPings = await this.getAllPings(), pings = allPings.filter((([_, ping]) => !isDeletionRequest(ping))).reverse(), deletionRequestPings = allPings.filter((([_, ping]) => isDeletionRequest(ping))), total = pings.length;
        total > maxCount && _logJsDefault.default(LOG_TAG, [ `More than ${maxCount} pending pings in the pings database,`, `will delete ${total - maxCount} old pings.` ], _logJs.LoggingLevel.Warn);
        let deleting = !1, pendingPingsCount = 0, pendingPingsDatabaseSize = 0;
        const remainingPings = [];
        for (const [identifier, ping] of pings) pendingPingsCount++, pendingPingsDatabaseSize += getPingSize(ping), 
        !deleting && pendingPingsDatabaseSize > maxSize && (_logJsDefault.default(LOG_TAG, [ `Pending pings database has reached the size quota of ${maxSize} bytes,`, "outstanding pings will be deleted." ], _logJs.LoggingLevel.Warn), 
        deleting = !0), pendingPingsCount > maxCount && (deleting = !0), deleting ? await this.deletePing(identifier) : remainingPings.unshift([ identifier, ping ]);
        return [ ...deletionRequestPings, ...remainingPings ];
      }
      async scanPendingPings() {
        if (!this.observer) return;
        const pings = await this.getAllPingsWithoutSurplus();
        for (const [identifier, ping] of pings) this.observer.update(identifier, ping);
      }
      async clearAll() {
        await this.store.delete([]);
      }
    };
  }, {
    "../utils.js": "gSLA7",
    "../log.js": "l3qBW",
    "../constants.js": "kPBk9",
    fflate: "62X4P",
    "../context.js": "fbkOU",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "62X4P": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "FlateErrorCode", (() => FlateErrorCode)), 
    parcelHelpers.export(exports, "Deflate", (() => Deflate)), parcelHelpers.export(exports, "AsyncDeflate", (() => AsyncDeflate)), 
    parcelHelpers.export(exports, "deflate", (() => deflate)), parcelHelpers.export(exports, "deflateSync", (() => deflateSync)), 
    parcelHelpers.export(exports, "Inflate", (() => Inflate)), parcelHelpers.export(exports, "AsyncInflate", (() => AsyncInflate)), 
    parcelHelpers.export(exports, "inflate", (() => inflate)), parcelHelpers.export(exports, "inflateSync", (() => inflateSync)), 
    parcelHelpers.export(exports, "Gzip", (() => Gzip)), parcelHelpers.export(exports, "AsyncGzip", (() => AsyncGzip)), 
    parcelHelpers.export(exports, "gzip", (() => gzip)), parcelHelpers.export(exports, "gzipSync", (() => gzipSync)), 
    parcelHelpers.export(exports, "Gunzip", (() => Gunzip)), parcelHelpers.export(exports, "AsyncGunzip", (() => AsyncGunzip)), 
    parcelHelpers.export(exports, "gunzip", (() => gunzip)), parcelHelpers.export(exports, "gunzipSync", (() => gunzipSync)), 
    parcelHelpers.export(exports, "Zlib", (() => Zlib)), parcelHelpers.export(exports, "AsyncZlib", (() => AsyncZlib)), 
    parcelHelpers.export(exports, "zlib", (() => zlib)), parcelHelpers.export(exports, "zlibSync", (() => zlibSync)), 
    parcelHelpers.export(exports, "Unzlib", (() => Unzlib)), parcelHelpers.export(exports, "AsyncUnzlib", (() => AsyncUnzlib)), 
    parcelHelpers.export(exports, "unzlib", (() => unzlib)), parcelHelpers.export(exports, "unzlibSync", (() => unzlibSync)), 
    parcelHelpers.export(exports, "compress", (() => gzip)), parcelHelpers.export(exports, "AsyncCompress", (() => AsyncGzip)), 
    parcelHelpers.export(exports, "compressSync", (() => gzipSync)), parcelHelpers.export(exports, "Compress", (() => Gzip)), 
    parcelHelpers.export(exports, "Decompress", (() => Decompress)), parcelHelpers.export(exports, "AsyncDecompress", (() => AsyncDecompress)), 
    parcelHelpers.export(exports, "decompress", (() => decompress)), parcelHelpers.export(exports, "decompressSync", (() => decompressSync)), 
    parcelHelpers.export(exports, "DecodeUTF8", (() => DecodeUTF8)), parcelHelpers.export(exports, "EncodeUTF8", (() => EncodeUTF8)), 
    parcelHelpers.export(exports, "strToU8", (() => strToU8)), parcelHelpers.export(exports, "strFromU8", (() => strFromU8)), 
    parcelHelpers.export(exports, "ZipPassThrough", (() => ZipPassThrough)), parcelHelpers.export(exports, "ZipDeflate", (() => ZipDeflate)), 
    parcelHelpers.export(exports, "AsyncZipDeflate", (() => AsyncZipDeflate)), parcelHelpers.export(exports, "Zip", (() => Zip)), 
    parcelHelpers.export(exports, "zip", (() => zip)), parcelHelpers.export(exports, "zipSync", (() => zipSync)), 
    parcelHelpers.export(exports, "UnzipPassThrough", (() => UnzipPassThrough)), parcelHelpers.export(exports, "UnzipInflate", (() => UnzipInflate)), 
    parcelHelpers.export(exports, "AsyncUnzipInflate", (() => AsyncUnzipInflate)), parcelHelpers.export(exports, "Unzip", (() => Unzip)), 
    parcelHelpers.export(exports, "unzip", (() => unzip)), parcelHelpers.export(exports, "unzipSync", (() => unzipSync));
    var ch2 = {}, u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array, fleb = new u8([ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0 ]), fdeb = new u8([ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0 ]), clim = new u8([ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ]), freb = function(eb, start) {
      for (var b = new u16(31), i = 0; i < 31; ++i) b[i] = start += 1 << eb[i - 1];
      var r = new u32(b[30]);
      for (i = 1; i < 30; ++i) for (var j = b[i]; j < b[i + 1]; ++j) r[j] = j - b[i] << 5 | i;
      return [ b, r ];
    }, _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
    fl[28] = 258, revfl[258] = 28;
    for (var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1], rev = new u16(32768), i = 0; i < 32768; ++i) {
      var x = (43690 & i) >>> 1 | (21845 & i) << 1;
      x = (61680 & (x = (52428 & x) >>> 2 | (13107 & x) << 2)) >>> 4 | (3855 & x) << 4, 
      rev[i] = ((65280 & x) >>> 8 | (255 & x) << 8) >>> 1;
    }
    var hMap = function(cd, mb, r) {
      for (var s = cd.length, i1 = 0, l = new u16(mb); i1 < s; ++i1) ++l[cd[i1] - 1];
      var co, le = new u16(mb);
      for (i1 = 0; i1 < mb; ++i1) le[i1] = le[i1 - 1] + l[i1 - 1] << 1;
      if (r) {
        co = new u16(1 << mb);
        var rvb = 15 - mb;
        for (i1 = 0; i1 < s; ++i1) if (cd[i1]) for (var sv = i1 << 4 | cd[i1], r_1 = mb - cd[i1], v = le[cd[i1] - 1]++ << r_1, m = v | (1 << r_1) - 1; v <= m; ++v) co[rev[v] >>> rvb] = sv;
      } else for (co = new u16(s), i1 = 0; i1 < s; ++i1) cd[i1] && (co[i1] = rev[le[cd[i1] - 1]++] >>> 15 - cd[i1]);
      return co;
    }, flt = new u8(288);
    for (i = 0; i < 144; ++i) flt[i] = 8;
    for (i = 144; i < 256; ++i) flt[i] = 9;
    for (i = 256; i < 280; ++i) flt[i] = 7;
    for (i = 280; i < 288; ++i) flt[i] = 8;
    var fdt = new u8(32);
    for (i = 0; i < 32; ++i) fdt[i] = 5;
    var flm = hMap(flt, 9, 0), flrm = hMap(flt, 9, 1), fdm = hMap(fdt, 5, 0), fdrm = hMap(fdt, 5, 1), max = function(a) {
      for (var m = a[0], i1 = 1; i1 < a.length; ++i1) a[i1] > m && (m = a[i1]);
      return m;
    }, bits = function(d, p, m) {
      var o = p / 8 | 0;
      return (d[o] | d[o + 1] << 8) >> (7 & p) & m;
    }, bits16 = function(d, p) {
      var o = p / 8 | 0;
      return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (7 & p);
    }, shft = function(p) {
      return (p + 7) / 8 | 0;
    }, slc = function(v, s, e) {
      (null == s || s < 0) && (s = 0), (null == e || e > v.length) && (e = v.length);
      var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
      return n.set(v.subarray(s, e)), n;
    }, FlateErrorCode = {
      UnexpectedEOF: 0,
      InvalidBlockType: 1,
      InvalidLengthLiteral: 2,
      InvalidDistance: 3,
      StreamFinished: 4,
      NoStreamHandler: 5,
      InvalidHeader: 6,
      NoCallback: 7,
      InvalidUTF8: 8,
      ExtraFieldTooLong: 9,
      InvalidDate: 10,
      FilenameTooLong: 11,
      StreamFinishing: 12,
      InvalidZipData: 13,
      UnknownCompressionMethod: 14
    }, ec = [ "unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data" ], err = function(ind, msg, nt) {
      var e = new Error(msg || ec[ind]);
      if (e.code = ind, Error.captureStackTrace && Error.captureStackTrace(e, err), !nt) throw e;
      return e;
    }, inflt = function(dat, buf, st) {
      var sl = dat.length;
      if (!sl || st && st.f && !st.l) return buf || new u8(0);
      var noBuf = !buf || st, noSt = !st || st.i;
      st || (st = {}), buf || (buf = new u8(3 * sl));
      var cbuf = function(l) {
        var bl = buf.length;
        if (l > bl) {
          var nbuf = new u8(Math.max(2 * bl, l));
          nbuf.set(buf), buf = nbuf;
        }
      }, final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n, tbts = 8 * sl;
      do {
        if (!lm) {
          final = bits(dat, pos, 1);
          var type = bits(dat, pos + 1, 3);
          if (pos += 3, !type) {
            var l = dat[(s = shft(pos) + 4) - 4] | dat[s - 3] << 8, t = s + l;
            if (t > sl) {
              noSt && err(0);
              break;
            }
            noBuf && cbuf(bt + l), buf.set(dat.subarray(s, t), bt), st.b = bt += l, st.p = pos = 8 * t, 
            st.f = final;
            continue;
          }
          if (1 == type) lm = flrm, dm = fdrm, lbt = 9, dbt = 5; else if (2 == type) {
            var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4, tl = hLit + bits(dat, pos + 5, 31) + 1;
            pos += 14;
            for (var ldt = new u8(tl), clt = new u8(19), i1 = 0; i1 < hcLen; ++i1) clt[clim[i1]] = bits(dat, pos + 3 * i1, 7);
            pos += 3 * hcLen;
            var clb = max(clt), clbmsk = (1 << clb) - 1, clm = hMap(clt, clb, 1);
            for (i1 = 0; i1 < tl; ) {
              var s, r = clm[bits(dat, pos, clbmsk)];
              if (pos += 15 & r, (s = r >>> 4) < 16) ldt[i1++] = s; else {
                var c = 0, n = 0;
                for (16 == s ? (n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i1 - 1]) : 17 == s ? (n = 3 + bits(dat, pos, 7), 
                pos += 3) : 18 == s && (n = 11 + bits(dat, pos, 127), pos += 7); n--; ) ldt[i1++] = c;
              }
            }
            var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
            lbt = max(lt), dbt = max(dt), lm = hMap(lt, lbt, 1), dm = hMap(dt, dbt, 1);
          } else err(1);
          if (pos > tbts) {
            noSt && err(0);
            break;
          }
        }
        noBuf && cbuf(bt + 131072);
        for (var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1, lpos = pos; ;lpos = pos) {
          var sym = (c = lm[bits16(dat, pos) & lms]) >>> 4;
          if ((pos += 15 & c) > tbts) {
            noSt && err(0);
            break;
          }
          if (c || err(2), sym < 256) buf[bt++] = sym; else {
            if (256 == sym) {
              lpos = pos, lm = null;
              break;
            }
            var add = sym - 254;
            if (sym > 264) {
              var b = fleb[i1 = sym - 257];
              add = bits(dat, pos, (1 << b) - 1) + fl[i1], pos += b;
            }
            var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
            d || err(3), pos += 15 & d;
            dt = fd[dsym];
            if (dsym > 3) {
              b = fdeb[dsym];
              dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
            }
            if (pos > tbts) {
              noSt && err(0);
              break;
            }
            noBuf && cbuf(bt + 131072);
            for (var end = bt + add; bt < end; bt += 4) buf[bt] = buf[bt - dt], buf[bt + 1] = buf[bt + 1 - dt], 
            buf[bt + 2] = buf[bt + 2 - dt], buf[bt + 3] = buf[bt + 3 - dt];
            bt = end;
          }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final, lm && (final = 1, st.m = lbt, st.d = dm, 
        st.n = dbt);
      } while (!final);
      return bt == buf.length ? buf : slc(buf, 0, bt);
    }, wbits = function(d, p, v) {
      v <<= 7 & p;
      var o = p / 8 | 0;
      d[o] |= v, d[o + 1] |= v >>> 8;
    }, wbits16 = function(d, p, v) {
      v <<= 7 & p;
      var o = p / 8 | 0;
      d[o] |= v, d[o + 1] |= v >>> 8, d[o + 2] |= v >>> 16;
    }, hTree = function(d, mb) {
      for (var t = [], i2 = 0; i2 < d.length; ++i2) d[i2] && t.push({
        s: i2,
        f: d[i2]
      });
      var s = t.length, t2 = t.slice();
      if (!s) return [ et, 0 ];
      if (1 == s) {
        var v = new u8(t[0].s + 1);
        return v[t[0].s] = 1, [ v, 1 ];
      }
      t.sort((function(a, b) {
        return a.f - b.f;
      })), t.push({
        s: -1,
        f: 25001
      });
      var l = t[0], r = t[1], i0 = 0, i13 = 1, i21 = 2;
      for (t[0] = {
        s: -1,
        f: l.f + r.f,
        l: l,
        r: r
      }; i13 != s - 1; ) l = t[t[i0].f < t[i21].f ? i0++ : i21++], r = t[i0 != i13 && t[i0].f < t[i21].f ? i0++ : i21++], 
      t[i13++] = {
        s: -1,
        f: l.f + r.f,
        l: l,
        r: r
      };
      var maxSym = t2[0].s;
      for (i2 = 1; i2 < s; ++i2) t2[i2].s > maxSym && (maxSym = t2[i2].s);
      var tr = new u16(maxSym + 1), mbt = ln(t[i13 - 1], tr, 0);
      if (mbt > mb) {
        i2 = 0;
        var dt = 0, lft = mbt - mb, cst = 1 << lft;
        for (t2.sort((function(a, b) {
          return tr[b.s] - tr[a.s] || a.f - b.f;
        })); i2 < s; ++i2) {
          var i2_1 = t2[i2].s;
          if (!(tr[i2_1] > mb)) break;
          dt += cst - (1 << mbt - tr[i2_1]), tr[i2_1] = mb;
        }
        for (dt >>>= lft; dt > 0; ) {
          var i2_2 = t2[i2].s;
          tr[i2_2] < mb ? dt -= 1 << mb - tr[i2_2]++ - 1 : ++i2;
        }
        for (;i2 >= 0 && dt; --i2) {
          var i2_3 = t2[i2].s;
          tr[i2_3] == mb && (--tr[i2_3], ++dt);
        }
        mbt = mb;
      }
      return [ new u8(tr), mbt ];
    }, ln = function(n, l, d) {
      return -1 == n.s ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
    }, lc = function(c) {
      for (var s = c.length; s && !c[--s]; ) ;
      for (var cl = new u16(++s), cli = 0, cln = c[0], cls = 1, w = function(v) {
        cl[cli++] = v;
      }, i2 = 1; i2 <= s; ++i2) if (c[i2] == cln && i2 != s) ++cls; else {
        if (!cln && cls > 2) {
          for (;cls > 138; cls -= 138) w(32754);
          cls > 2 && (w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305), cls = 0);
        } else if (cls > 3) {
          for (w(cln), --cls; cls > 6; cls -= 6) w(8304);
          cls > 2 && (w(cls - 3 << 5 | 8208), cls = 0);
        }
        for (;cls--; ) w(cln);
        cls = 1, cln = c[i2];
      }
      return [ cl.subarray(0, cli), s ];
    }, clen = function(cf, cl) {
      for (var l = 0, i2 = 0; i2 < cl.length; ++i2) l += cf[i2] * cl[i2];
      return l;
    }, wfblk = function(out, pos, dat) {
      var s = dat.length, o = shft(pos + 2);
      out[o] = 255 & s, out[o + 1] = s >>> 8, out[o + 2] = 255 ^ out[o], out[o + 3] = 255 ^ out[o + 1];
      for (var i2 = 0; i2 < s; ++i2) out[o + i2 + 4] = dat[i2];
      return 8 * (o + 4 + s);
    }, wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
      wbits(out, p++, final), ++lf[256];
      for (var _a1 = hTree(lf, 15), dlt = _a1[0], mlb = _a1[1], _b1 = hTree(df, 15), ddt = _b1[0], mdb = _b1[1], _c = lc(dlt), lclt = _c[0], nlc = _c[1], _d = lc(ddt), lcdt = _d[0], ndc = _d[1], lcfreq = new u16(19), i2 = 0; i2 < lclt.length; ++i2) lcfreq[31 & lclt[i2]]++;
      for (i2 = 0; i2 < lcdt.length; ++i2) lcfreq[31 & lcdt[i2]]++;
      for (var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1], nlcc = 19; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc) ;
      var lm, ll, dm, dl, flen = bl + 5 << 3, ftlen = clen(lf, flt) + clen(df, fdt) + eb, dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
      if (flen <= ftlen && flen <= dtlen) return wfblk(out, p, dat.subarray(bs, bs + bl));
      if (wbits(out, p, 1 + (dtlen < ftlen)), p += 2, dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257), wbits(out, p + 5, ndc - 1), wbits(out, p + 10, nlcc - 4), 
        p += 14;
        for (i2 = 0; i2 < nlcc; ++i2) wbits(out, p + 3 * i2, lct[clim[i2]]);
        p += 3 * nlcc;
        for (var lcts = [ lclt, lcdt ], it = 0; it < 2; ++it) {
          var clct = lcts[it];
          for (i2 = 0; i2 < clct.length; ++i2) {
            var len = 31 & clct[i2];
            wbits(out, p, llm[len]), p += lct[len], len > 15 && (wbits(out, p, clct[i2] >>> 5 & 127), 
            p += clct[i2] >>> 12);
          }
        }
      } else lm = flm, ll = flt, dm = fdm, dl = fdt;
      for (i2 = 0; i2 < li; ++i2) if (syms[i2] > 255) {
        len = syms[i2] >>> 18 & 31;
        wbits16(out, p, lm[len + 257]), p += ll[len + 257], len > 7 && (wbits(out, p, syms[i2] >>> 23 & 31), 
        p += fleb[len]);
        var dst = 31 & syms[i2];
        wbits16(out, p, dm[dst]), p += dl[dst], dst > 3 && (wbits16(out, p, syms[i2] >>> 5 & 8191), 
        p += fdeb[dst]);
      } else wbits16(out, p, lm[syms[i2]]), p += ll[syms[i2]];
      return wbits16(out, p, lm[256]), p + ll[256];
    }, deo = new u32([ 65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632 ]), et = new u8(0), dflt = function(dat, lvl, plvl, pre, post, lst) {
      var s = dat.length, o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post), w = o.subarray(pre, o.length - post), pos = 0;
      if (!lvl || s < 8) for (var i2 = 0; i2 <= s; i2 += 65535) {
        var e = i2 + 65535;
        e < s ? pos = wfblk(w, pos, dat.subarray(i2, e)) : (w[i2] = lst, pos = wfblk(w, pos, dat.subarray(i2, s)));
      } else {
        for (var opt = deo[lvl - 1], n = opt >>> 13, c = 8191 & opt, msk_1 = (1 << plvl) - 1, prev = new u16(32768), head = new u16(msk_1 + 1), bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1, hsh = function(i3) {
          return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
        }, syms = new u32(25e3), lf = new u16(288), df = new u16(32), lc_1 = 0, eb = 0, li = (i2 = 0, 
        0), wi = 0, bs = 0; i2 < s; ++i2) {
          var hv = hsh(i2), imod = 32767 & i2, pimod = head[hv];
          if (prev[imod] = pimod, head[hv] = imod, wi <= i2) {
            var rem = s - i2;
            if ((lc_1 > 7e3 || li > 24576) && rem > 423) {
              pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i2 - bs, pos), li = lc_1 = eb = 0, 
              bs = i2;
              for (var j = 0; j < 286; ++j) lf[j] = 0;
              for (j = 0; j < 30; ++j) df[j] = 0;
            }
            var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
            if (rem > 2 && hv == hsh(i2 - dif)) for (var maxn = Math.min(n, rem) - 1, maxd = Math.min(32767, i2), ml = Math.min(258, rem); dif <= maxd && --ch_1 && imod != pimod; ) {
              if (dat[i2 + l] == dat[i2 + l - dif]) {
                for (var nl = 0; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl) ;
                if (nl > l) {
                  if (l = nl, d = dif, nl > maxn) break;
                  var mmd = Math.min(dif, nl - 2), md = 0;
                  for (j = 0; j < mmd; ++j) {
                    var ti = i2 - dif + j + 32768 & 32767, cd = ti - prev[ti] + 32768 & 32767;
                    cd > md && (md = cd, pimod = ti);
                  }
                }
              }
              dif += (imod = pimod) - (pimod = prev[imod]) + 32768 & 32767;
            }
            if (d) {
              syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
              var lin = 31 & revfl[l], din = 31 & revfd[d];
              eb += fleb[lin] + fdeb[din], ++lf[257 + lin], ++df[din], wi = i2 + l, ++lc_1;
            } else syms[li++] = dat[i2], ++lf[dat[i2]];
          }
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i2 - bs, pos), !lst && 7 & pos && (pos = wfblk(w, pos + 1, et));
      }
      return slc(o, 0, pre + shft(pos) + post);
    }, crct = function() {
      for (var t = new Int32Array(256), i2 = 0; i2 < 256; ++i2) {
        for (var c = i2, k = 9; --k; ) c = (1 & c && -306674912) ^ c >>> 1;
        t[i2] = c;
      }
      return t;
    }(), crc = function() {
      var c = -1;
      return {
        p: function(d) {
          for (var cr = c, i2 = 0; i2 < d.length; ++i2) cr = crct[255 & cr ^ d[i2]] ^ cr >>> 8;
          c = cr;
        },
        d: function() {
          return ~c;
        }
      };
    }, adler = function() {
      var a = 1, b = 0;
      return {
        p: function(d) {
          for (var n = a, m = b, l = 0 | d.length, i2 = 0; i2 != l; ) {
            for (var e = Math.min(i2 + 2655, l); i2 < e; ++i2) m += n += d[i2];
            n = (65535 & n) + 15 * (n >> 16), m = (65535 & m) + 15 * (m >> 16);
          }
          a = n, b = m;
        },
        d: function() {
          return (255 & (a %= 65521)) << 24 | a >>> 8 << 16 | (255 & (b %= 65521)) << 8 | b >>> 8;
        }
      };
    }, dopt = function(dat, opt, pre, post, st) {
      return dflt(dat, null == opt.level ? 6 : opt.level, null == opt.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(dat.length)))) : 12 + opt.mem, pre, post, !st);
    }, mrg = function(a, b) {
      var o = {};
      for (var k in a) o[k] = a[k];
      for (var k in b) o[k] = b[k];
      return o;
    }, wcln = function(fn, fnStr, td) {
      for (var dt = fn(), st = fn.toString(), ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/ /g, "").split(","), i2 = 0; i2 < dt.length; ++i2) {
        var v = dt[i2], k = ks[i2];
        if ("function" == typeof v) {
          fnStr += ";" + k + "=";
          var st_1 = v.toString();
          if (v.prototype) if (-1 != st_1.indexOf("[native code]")) {
            var spInd = st_1.indexOf(" ", 8) + 1;
            fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
          } else for (var t in fnStr += st_1, v.prototype) fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString(); else fnStr += st_1;
        } else td[k] = v;
      }
      return [ fnStr, td ];
    }, ch = [], wrkr = function(fns, init, id, cb) {
      var _a1;
      if (!ch[id]) {
        for (var fnStr = "", td_1 = {}, m = fns.length - 1, i2 = 0; i2 < m; ++i2) fnStr = (_a1 = wcln(fns[i2], fnStr, td_1))[0], 
        td_1 = _a1[1];
        ch[id] = wcln(fns[m], fnStr, td_1);
      }
      var td = mrg({}, ch[id][1]);
      return function(c, id, msg, transfer, cb) {
        var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([ c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})' ], {
          type: "text/javascript"
        }))));
        return w.onmessage = function(e) {
          var d = e.data, ed = d.$e$;
          if (ed) {
            var err = new Error(ed[0]);
            err.code = ed[1], err.stack = ed[2], cb(err, null);
          } else cb(null, d);
        }, w.postMessage(msg, transfer), w;
      }(ch[id][0] + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td, function(v) {
        var tl = [];
        for (var k in v) (v[k] instanceof u8 || v[k] instanceof u16 || v[k] instanceof u32) && tl.push((v[k] = new v[k].constructor(v[k])).buffer);
        return tl;
      }(td), cb);
    }, bInflt = function() {
      return [ u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gu8 ];
    }, bDflt = function() {
      return [ u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf ];
    }, gze = function() {
      return [ gzh, gzhl, wbytes, crc, crct ];
    }, guze = function() {
      return [ gzs, gzl ];
    }, zle = function() {
      return [ zlh, wbytes, adler ];
    }, zule = function() {
      return [ zlv ];
    }, pbf = function(msg) {
      return postMessage(msg, [ msg.buffer ]);
    }, gu8 = function(o) {
      return o && o.size && new u8(o.size);
    }, cbify = function(dat, opts, fns, init, id, cb) {
      var w = wrkr(fns, init, id, (function(err1, dat1) {
        w.terminate(), cb(err1, dat1);
      }));
      return w.postMessage([ dat, opts ], opts.consume ? [ dat.buffer ] : []), function() {
        w.terminate();
      };
    }, astrm = function(strm) {
      return strm.ondata = function(dat, final) {
        return postMessage([ dat, final ], [ dat.buffer ]);
      }, function(ev) {
        return strm.push(ev.data[0], ev.data[1]);
      };
    }, astrmify = function(fns, strm, opts, init, id) {
      var t, w = wrkr(fns, init, id, (function(err1, dat) {
        err1 ? (w.terminate(), strm.ondata.call(strm, err1)) : (dat[1] && w.terminate(), 
        strm.ondata.call(strm, err1, dat[0], dat[1]));
      }));
      w.postMessage(opts), strm.push = function(d, f) {
        strm.ondata || err(5), t && strm.ondata(err(4, 0, 1), null, !!f), w.postMessage([ d, t = f ], [ d.buffer ]);
      }, strm.terminate = function() {
        w.terminate();
      };
    }, b2 = function(d, b) {
      return d[b] | d[b + 1] << 8;
    }, b4 = function(d, b) {
      return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
    }, b8 = function(d, b) {
      return b4(d, b) + 4294967296 * b4(d, b + 4);
    }, wbytes = function(d, b, v) {
      for (;v; ++b) d[b] = v, v >>>= 8;
    }, gzh = function(c, o) {
      var fn = o.filename;
      if (c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : 9 == o.level ? 2 : 0, 
      c[9] = 3, 0 != o.mtime && wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1e3)), 
      fn) {
        c[3] = 8;
        for (var i3 = 0; i3 <= fn.length; ++i3) c[i3 + 10] = fn.charCodeAt(i3);
      }
    }, gzs = function(d) {
      31 == d[0] && 139 == d[1] && 8 == d[2] || err(6, "invalid gzip data");
      var flg = d[3], st = 10;
      4 & flg && (st += d[10] | 2 + (d[11] << 8));
      for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++]) ;
      return st + (2 & flg);
    }, gzl = function(d) {
      var l = d.length;
      return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
    }, gzhl = function(o) {
      return 10 + (o.filename && o.filename.length + 1 || 0);
    }, zlh = function(c, o) {
      var lv = o.level, fl1 = 0 == lv ? 0 : lv < 6 ? 1 : 9 == lv ? 3 : 2;
      c[0] = 120, c[1] = fl1 << 6 | (fl1 ? 32 - 2 * fl1 : 1);
    }, zlv = function(d) {
      (8 != (15 & d[0]) || d[0] >>> 4 > 7 || (d[0] << 8 | d[1]) % 31) && err(6, "invalid zlib data"), 
      32 & d[1] && err(6, "invalid zlib data: preset dictionaries not supported");
    };
    function AsyncCmpStrm(opts, cb) {
      return cb || "function" != typeof opts || (cb = opts, opts = {}), this.ondata = cb, 
      opts;
    }
    var Deflate = function() {
      function Deflate1(opts, cb) {
        cb || "function" != typeof opts || (cb = opts, opts = {}), this.ondata = cb, this.o = opts || {};
      }
      return Deflate1.prototype.p = function(c, f) {
        this.ondata(dopt(c, this.o, 0, 0, !f), f);
      }, Deflate1.prototype.push = function(chunk, final) {
        this.ondata || err(5), this.d && err(4), this.d = final, this.p(chunk, final || !1);
      }, Deflate1;
    }(), AsyncDeflate = function(opts, cb) {
      astrmify([ bDflt, function() {
        return [ astrm, Deflate ];
      } ], this, AsyncCmpStrm.call(this, opts, cb), (function(ev) {
        var strm = new Deflate(ev.data);
        onmessage = astrm(strm);
      }), 6);
    };
    function deflate(data, opts, cb) {
      return cb || (cb = opts, opts = {}), "function" != typeof cb && err(7), cbify(data, opts, [ bDflt ], (function(ev) {
        return pbf(deflateSync(ev.data[0], ev.data[1]));
      }), 0, cb);
    }
    function deflateSync(data, opts) {
      return dopt(data, opts || {}, 0, 0);
    }
    var Inflate = function() {
      function Inflate1(cb) {
        this.s = {}, this.p = new u8(0), this.ondata = cb;
      }
      return Inflate1.prototype.e = function(c) {
        this.ondata || err(5), this.d && err(4);
        var l = this.p.length, n = new u8(l + c.length);
        n.set(this.p), n.set(c, l), this.p = n;
      }, Inflate1.prototype.c = function(final) {
        this.d = this.s.i = final || !1;
        var bts = this.s.b, dt = inflt(this.p, this.o, this.s);
        this.ondata(slc(dt, bts, this.s.b), this.d), this.o = slc(dt, this.s.b - 32768), 
        this.s.b = this.o.length, this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
      }, Inflate1.prototype.push = function(chunk, final) {
        this.e(chunk), this.c(final);
      }, Inflate1;
    }(), AsyncInflate = function(cb) {
      this.ondata = cb, astrmify([ bInflt, function() {
        return [ astrm, Inflate ];
      } ], this, 0, (function() {
        var strm = new Inflate;
        onmessage = astrm(strm);
      }), 7);
    };
    function inflate(data, opts, cb) {
      return cb || (cb = opts, opts = {}), "function" != typeof cb && err(7), cbify(data, opts, [ bInflt ], (function(ev) {
        return pbf(inflateSync(ev.data[0], gu8(ev.data[1])));
      }), 1, cb);
    }
    function inflateSync(data, out) {
      return inflt(data, out);
    }
    var Gzip = function() {
      function Gzip1(opts, cb) {
        this.c = crc(), this.l = 0, this.v = 1, Deflate.call(this, opts, cb);
      }
      return Gzip1.prototype.push = function(chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
      }, Gzip1.prototype.p = function(c, f) {
        this.c.p(c), this.l += c.length;
        var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
        this.v && (gzh(raw, this.o), this.v = 0), f && (wbytes(raw, raw.length - 8, this.c.d()), 
        wbytes(raw, raw.length - 4, this.l)), this.ondata(raw, f);
      }, Gzip1;
    }(), AsyncGzip = function(opts, cb) {
      astrmify([ bDflt, gze, function() {
        return [ astrm, Deflate, Gzip ];
      } ], this, AsyncCmpStrm.call(this, opts, cb), (function(ev) {
        var strm = new Gzip(ev.data);
        onmessage = astrm(strm);
      }), 8);
    };
    function gzip(data, opts, cb) {
      return cb || (cb = opts, opts = {}), "function" != typeof cb && err(7), cbify(data, opts, [ bDflt, gze, function() {
        return [ gzipSync ];
      } ], (function(ev) {
        return pbf(gzipSync(ev.data[0], ev.data[1]));
      }), 2, cb);
    }
    function gzipSync(data, opts) {
      opts || (opts = {});
      var c = crc(), l = data.length;
      c.p(data);
      var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
      return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
    }
    var Gunzip = function() {
      function Gunzip1(cb) {
        this.v = 1, Inflate.call(this, cb);
      }
      return Gunzip1.prototype.push = function(chunk, final) {
        if (Inflate.prototype.e.call(this, chunk), this.v) {
          var s = this.p.length > 3 ? gzs(this.p) : 4;
          if (s >= this.p.length && !final) return;
          this.p = this.p.subarray(s), this.v = 0;
        }
        final && (this.p.length < 8 && err(6, "invalid gzip data"), this.p = this.p.subarray(0, -8)), 
        Inflate.prototype.c.call(this, final);
      }, Gunzip1;
    }(), AsyncGunzip = function(cb) {
      this.ondata = cb, astrmify([ bInflt, guze, function() {
        return [ astrm, Inflate, Gunzip ];
      } ], this, 0, (function() {
        var strm = new Gunzip;
        onmessage = astrm(strm);
      }), 9);
    };
    function gunzip(data, opts, cb) {
      return cb || (cb = opts, opts = {}), "function" != typeof cb && err(7), cbify(data, opts, [ bInflt, guze, function() {
        return [ gunzipSync ];
      } ], (function(ev) {
        return pbf(gunzipSync(ev.data[0]));
      }), 3, cb);
    }
    function gunzipSync(data, out) {
      return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
    }
    var Zlib = function() {
      function Zlib1(opts, cb) {
        this.c = adler(), this.v = 1, Deflate.call(this, opts, cb);
      }
      return Zlib1.prototype.push = function(chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
      }, Zlib1.prototype.p = function(c, f) {
        this.c.p(c);
        var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
        this.v && (zlh(raw, this.o), this.v = 0), f && wbytes(raw, raw.length - 4, this.c.d()), 
        this.ondata(raw, f);
      }, Zlib1;
    }(), AsyncZlib = function(opts, cb) {
      astrmify([ bDflt, zle, function() {
        return [ astrm, Deflate, Zlib ];
      } ], this, AsyncCmpStrm.call(this, opts, cb), (function(ev) {
        var strm = new Zlib(ev.data);
        onmessage = astrm(strm);
      }), 10);
    };
    function zlib(data, opts, cb) {
      return cb || (cb = opts, opts = {}), "function" != typeof cb && err(7), cbify(data, opts, [ bDflt, zle, function() {
        return [ zlibSync ];
      } ], (function(ev) {
        return pbf(zlibSync(ev.data[0], ev.data[1]));
      }), 4, cb);
    }
    function zlibSync(data, opts) {
      opts || (opts = {});
      var a = adler();
      a.p(data);
      var d = dopt(data, opts, 2, 4);
      return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
    }
    var Unzlib = function() {
      function Unzlib1(cb) {
        this.v = 1, Inflate.call(this, cb);
      }
      return Unzlib1.prototype.push = function(chunk, final) {
        if (Inflate.prototype.e.call(this, chunk), this.v) {
          if (this.p.length < 2 && !final) return;
          this.p = this.p.subarray(2), this.v = 0;
        }
        final && (this.p.length < 4 && err(6, "invalid zlib data"), this.p = this.p.subarray(0, -4)), 
        Inflate.prototype.c.call(this, final);
      }, Unzlib1;
    }(), AsyncUnzlib = function(cb) {
      this.ondata = cb, astrmify([ bInflt, zule, function() {
        return [ astrm, Inflate, Unzlib ];
      } ], this, 0, (function() {
        var strm = new Unzlib;
        onmessage = astrm(strm);
      }), 11);
    };
    function unzlib(data, opts, cb) {
      return cb || (cb = opts, opts = {}), "function" != typeof cb && err(7), cbify(data, opts, [ bInflt, zule, function() {
        return [ unzlibSync ];
      } ], (function(ev) {
        return pbf(unzlibSync(ev.data[0], gu8(ev.data[1])));
      }), 5, cb);
    }
    function unzlibSync(data, out) {
      return inflt((zlv(data), data.subarray(2, -4)), out);
    }
    var Decompress = function() {
      function Decompress1(cb) {
        this.G = Gunzip, this.I = Inflate, this.Z = Unzlib, this.ondata = cb;
      }
      return Decompress1.prototype.push = function(chunk, final) {
        if (this.ondata || err(5), this.s) this.s.push(chunk, final); else {
          if (this.p && this.p.length) {
            var n = new u8(this.p.length + chunk.length);
            n.set(this.p), n.set(chunk, this.p.length);
          } else this.p = chunk;
          if (this.p.length > 2) {
            var _this_1 = this, cb = function() {
              _this_1.ondata.apply(_this_1, arguments);
            };
            this.s = 31 == this.p[0] && 139 == this.p[1] && 8 == this.p[2] ? new this.G(cb) : 8 != (15 & this.p[0]) || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(cb) : new this.Z(cb), 
            this.s.push(this.p, final), this.p = null;
          }
        }
      }, Decompress1;
    }(), AsyncDecompress = function() {
      function AsyncDecompress1(cb) {
        this.G = AsyncGunzip, this.I = AsyncInflate, this.Z = AsyncUnzlib, this.ondata = cb;
      }
      return AsyncDecompress1.prototype.push = function(chunk, final) {
        Decompress.prototype.push.call(this, chunk, final);
      }, AsyncDecompress1;
    }();
    function decompress(data, opts, cb) {
      return cb || (cb = opts, opts = {}), "function" != typeof cb && err(7), 31 == data[0] && 139 == data[1] && 8 == data[2] ? gunzip(data, opts, cb) : 8 != (15 & data[0]) || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflate(data, opts, cb) : unzlib(data, opts, cb);
    }
    function decompressSync(data, out) {
      return 31 == data[0] && 139 == data[1] && 8 == data[2] ? gunzipSync(data, out) : 8 != (15 & data[0]) || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, out) : unzlibSync(data, out);
    }
    var fltn = function(d, p, t, o) {
      for (var k in d) {
        var val = d[k], n = p + k;
        val instanceof u8 ? t[n] = [ val, o ] : Array.isArray(val) ? t[n] = [ val[0], mrg(o, val[1]) ] : fltn(val, n + "/", t, o);
      }
    }, te = "undefined" != typeof TextEncoder && new TextEncoder, td = "undefined" != typeof TextDecoder && new TextDecoder, tds = 0;
    try {
      td.decode(et, {
        stream: !0
      }), tds = 1;
    } catch (e) {}
    var dutf8 = function(d) {
      for (var r = "", i4 = 0; ;) {
        var c = d[i4++], eb = (c > 127) + (c > 223) + (c > 239);
        if (i4 + eb > d.length) return [ r, slc(d, i4 - 1) ];
        eb ? 3 == eb ? (c = ((15 & c) << 18 | (63 & d[i4++]) << 12 | (63 & d[i4++]) << 6 | 63 & d[i4++]) - 65536, 
        r += String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c)) : r += 1 & eb ? String.fromCharCode((31 & c) << 6 | 63 & d[i4++]) : String.fromCharCode((15 & c) << 12 | (63 & d[i4++]) << 6 | 63 & d[i4++]) : r += String.fromCharCode(c);
      }
    }, DecodeUTF8 = function() {
      function DecodeUTF81(cb) {
        this.ondata = cb, tds ? this.t = new TextDecoder : this.p = et;
      }
      return DecodeUTF81.prototype.push = function(chunk, final) {
        if (this.ondata || err(5), final = !!final, this.t) return this.ondata(this.t.decode(chunk, {
          stream: !0
        }), final), void (final && (this.t.decode().length && err(8), this.t = null));
        this.p || err(4);
        var dat = new u8(this.p.length + chunk.length);
        dat.set(this.p), dat.set(chunk, this.p.length);
        var _a1 = dutf8(dat), ch1 = _a1[0], np = _a1[1];
        final ? (np.length && err(8), this.p = null) : this.p = np, this.ondata(ch1, final);
      }, DecodeUTF81;
    }(), EncodeUTF8 = function() {
      function EncodeUTF81(cb) {
        this.ondata = cb;
      }
      return EncodeUTF81.prototype.push = function(chunk, final) {
        this.ondata || err(5), this.d && err(4), this.ondata(strToU8(chunk), this.d = final || !1);
      }, EncodeUTF81;
    }();
    function strToU8(str, latin1) {
      if (latin1) {
        for (var ar_1 = new u8(str.length), i4 = 0; i4 < str.length; ++i4) ar_1[i4] = str.charCodeAt(i4);
        return ar_1;
      }
      if (te) return te.encode(str);
      var l = str.length, ar = new u8(str.length + (str.length >> 1)), ai = 0, w = function(v) {
        ar[ai++] = v;
      };
      for (i4 = 0; i4 < l; ++i4) {
        if (ai + 5 > ar.length) {
          var n = new u8(ai + 8 + (l - i4 << 1));
          n.set(ar), ar = n;
        }
        var c = str.charCodeAt(i4);
        c < 128 || latin1 ? w(c) : c < 2048 ? (w(192 | c >> 6), w(128 | 63 & c)) : c > 55295 && c < 57344 ? (w(240 | (c = 65536 + (1047552 & c) | 1023 & str.charCodeAt(++i4)) >> 18), 
        w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | 63 & c)) : (w(224 | c >> 12), 
        w(128 | c >> 6 & 63), w(128 | 63 & c));
      }
      return slc(ar, 0, ai);
    }
    function strFromU8(dat, latin1) {
      if (latin1) {
        for (var r = "", i5 = 0; i5 < dat.length; i5 += 16384) r += String.fromCharCode.apply(null, dat.subarray(i5, i5 + 16384));
        return r;
      }
      if (td) return td.decode(dat);
      var _a1 = dutf8(dat), out = _a1[0];
      return _a1[1].length && err(8), out;
    }
    var dbf = function(l) {
      return 1 == l ? 3 : l < 6 ? 2 : 9 == l ? 1 : 0;
    }, slzh = function(d, b) {
      return b + 30 + b2(d, b + 26) + b2(d, b + 28);
    }, zh = function(d, b, z) {
      var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(2048 & b2(d, b + 8))), es = b + 46 + fnl, bs = b4(d, b + 20), _a2 = z && 4294967295 == bs ? z64e(d, es) : [ bs, b4(d, b + 24), b4(d, b + 42) ], sc = _a2[0], su = _a2[1], off = _a2[2];
      return [ b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off ];
    }, z64e = function(d, b) {
      for (;1 != b2(d, b); b += 4 + b2(d, b + 2)) ;
      return [ b8(d, b + 12), b8(d, b + 4), b8(d, b + 20) ];
    }, exfl = function(ex) {
      var le = 0;
      if (ex) for (var k in ex) {
        var l = ex[k].length;
        l > 65535 && err(9), le += l + 4;
      }
      return le;
    }, wzh = function(d, b, f, fn, u, c, ce, co) {
      var fl1 = fn.length, ex = f.extra, col = co && co.length, exl = exfl(ex);
      wbytes(d, b, null != ce ? 33639248 : 67324752), b += 4, null != ce && (d[b++] = 20, 
      d[b++] = f.os), d[b] = 20, b += 2, d[b++] = f.flag << 1 | (null == c && 8), d[b++] = u && 8, 
      d[b++] = 255 & f.compression, d[b++] = f.compression >> 8;
      var dt = new Date(null == f.mtime ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
      if ((y < 0 || y > 119) && err(10), wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >>> 1), 
      b += 4, null != c && (wbytes(d, b, f.crc), wbytes(d, b + 4, c), wbytes(d, b + 8, f.size)), 
      wbytes(d, b + 12, fl1), wbytes(d, b + 14, exl), b += 16, null != ce && (wbytes(d, b, col), 
      wbytes(d, b + 6, f.attrs), wbytes(d, b + 10, ce), b += 14), d.set(fn, b), b += fl1, 
      exl) for (var k in ex) {
        var exf = ex[k], l = exf.length;
        wbytes(d, b, +k), wbytes(d, b + 2, l), d.set(exf, b + 4), b += 4 + l;
      }
      return col && (d.set(co, b), b += col), b;
    }, wzf = function(o, b, c, d, e) {
      wbytes(o, b, 101010256), wbytes(o, b + 8, c), wbytes(o, b + 10, c), wbytes(o, b + 12, d), 
      wbytes(o, b + 16, e);
    }, ZipPassThrough = function() {
      function ZipPassThrough1(filename) {
        this.filename = filename, this.c = crc(), this.size = 0, this.compression = 0;
      }
      return ZipPassThrough1.prototype.process = function(chunk, final) {
        this.ondata(null, chunk, final);
      }, ZipPassThrough1.prototype.push = function(chunk, final) {
        this.ondata || err(5), this.c.p(chunk), this.size += chunk.length, final && (this.crc = this.c.d()), 
        this.process(chunk, final || !1);
      }, ZipPassThrough1;
    }(), ZipDeflate = function() {
      function ZipDeflate1(filename, opts) {
        var _this_1 = this;
        opts || (opts = {}), ZipPassThrough.call(this, filename), this.d = new Deflate(opts, (function(dat, final) {
          _this_1.ondata(null, dat, final);
        })), this.compression = 8, this.flag = dbf(opts.level);
      }
      return ZipDeflate1.prototype.process = function(chunk, final) {
        try {
          this.d.push(chunk, final);
        } catch (e) {
          this.ondata(e, null, final);
        }
      }, ZipDeflate1.prototype.push = function(chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
      }, ZipDeflate1;
    }(), AsyncZipDeflate = function() {
      function AsyncZipDeflate1(filename, opts) {
        var _this_1 = this;
        opts || (opts = {}), ZipPassThrough.call(this, filename), this.d = new AsyncDeflate(opts, (function(err1, dat, final) {
          _this_1.ondata(err1, dat, final);
        })), this.compression = 8, this.flag = dbf(opts.level), this.terminate = this.d.terminate;
      }
      return AsyncZipDeflate1.prototype.process = function(chunk, final) {
        this.d.push(chunk, final);
      }, AsyncZipDeflate1.prototype.push = function(chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
      }, AsyncZipDeflate1;
    }(), Zip = function() {
      function Zip1(cb) {
        this.ondata = cb, this.u = [], this.d = 1;
      }
      return Zip1.prototype.add = function(file) {
        var _this_1 = this;
        if (this.ondata || err(5), 2 & this.d) this.ondata(err(4 + 8 * (1 & this.d), 0, 1), null, !1); else {
          var f = strToU8(file.filename), fl_1 = f.length, com = file.comment, o = com && strToU8(com), u = fl_1 != file.filename.length || o && com.length != o.length, hl_1 = fl_1 + exfl(file.extra) + 30;
          fl_1 > 65535 && this.ondata(err(11, 0, 1), null, !1);
          var header = new u8(hl_1);
          wzh(header, 0, file, f, u);
          var chks_1 = [ header ], pAll_1 = function() {
            for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
              var chk = chks_2[_i];
              _this_1.ondata(null, chk, !1);
            }
            chks_1 = [];
          }, tr_1 = this.d;
          this.d = 0;
          var ind_1 = this.u.length, uf_1 = mrg(file, {
            f: f,
            u: u,
            o: o,
            t: function() {
              file.terminate && file.terminate();
            },
            r: function() {
              if (pAll_1(), tr_1) {
                var nxt = _this_1.u[ind_1 + 1];
                nxt ? nxt.r() : _this_1.d = 1;
              }
              tr_1 = 1;
            }
          }), cl_1 = 0;
          file.ondata = function(err1, dat, final) {
            if (err1) _this_1.ondata(err1, dat, final), _this_1.terminate(); else if (cl_1 += dat.length, 
            chks_1.push(dat), final) {
              var dd = new u8(16);
              wbytes(dd, 0, 134695760), wbytes(dd, 4, file.crc), wbytes(dd, 8, cl_1), wbytes(dd, 12, file.size), 
              chks_1.push(dd), uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, 
              uf_1.size = file.size, tr_1 && uf_1.r(), tr_1 = 1;
            } else tr_1 && pAll_1();
          }, this.u.push(uf_1);
        }
      }, Zip1.prototype.end = function() {
        var _this_1 = this;
        2 & this.d ? this.ondata(err(4 + 8 * (1 & this.d), 0, 1), null, !0) : (this.d ? this.e() : this.u.push({
          r: function() {
            1 & _this_1.d && (_this_1.u.splice(-1, 1), _this_1.e());
          },
          t: function() {}
        }), this.d = 3);
      }, Zip1.prototype.e = function() {
        for (var bt = 0, l = 0, tl = 0, _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
          tl += 46 + (f = _a2[_i]).f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
        }
        for (var out = new u8(tl + 22), _b1 = 0, _c = this.u; _b1 < _c.length; _b1++) {
          var f = _c[_b1];
          wzh(out, bt, f, f.f, f.u, f.c, l, f.o), bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), 
          l += f.b;
        }
        wzf(out, bt, this.u.length, tl, l), this.ondata(null, out, !0), this.d = 2;
      }, Zip1.prototype.terminate = function() {
        for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
          _a2[_i].t();
        }
        this.d = 2;
      }, Zip1;
    }();
    function zip(data, opts, cb) {
      cb || (cb = opts, opts = {}), "function" != typeof cb && err(7);
      var r = {};
      fltn(data, "", r, opts);
      var k = Object.keys(r), lft = k.length, o = 0, tot = 0, slft = lft, files = new Array(lft), term = [], tAll = function() {
        for (var i6 = 0; i6 < term.length; ++i6) term[i6]();
      }, cbd = function(a, b) {
        mt((function() {
          cb(a, b);
        }));
      };
      mt((function() {
        cbd = cb;
      }));
      var cbf = function() {
        var out = new u8(tot + 22), oe = o, cdl = tot - o;
        tot = 0;
        for (var i6 = 0; i6 < slft; ++i6) {
          var f = files[i6];
          try {
            var l = f.c.length;
            wzh(out, tot, f, f.f, f.u, l);
            var badd = 30 + f.f.length + exfl(f.extra), loc = tot + badd;
            out.set(f.c, loc), wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), 
            tot = loc + l;
          } catch (e) {
            return cbd(e, null);
          }
        }
        wzf(out, o, files.length, cdl, oe), cbd(null, out);
      };
      lft || cbf();
      for (var _loop_1 = function(i6) {
        var fn = k[i6], _a2 = r[fn], file = _a2[0], p = _a2[1], c = crc(), size = file.length;
        c.p(file);
        var f = strToU8(fn), s = f.length, com = p.comment, m = com && strToU8(com), ms = m && m.length, exl = exfl(p.extra), compression = 0 == p.level ? 0 : 8, cbl = function(e, d) {
          if (e) tAll(), cbd(e, null); else {
            var l = d.length;
            files[i6] = mrg(p, {
              size: size,
              crc: c.d(),
              c: d,
              f: f,
              m: m,
              u: s != fn.length || m && com.length != ms,
              compression: compression
            }), o += 30 + s + exl + l, tot += 76 + 2 * (s + exl) + (ms || 0) + l, --lft || cbf();
          }
        };
        if (s > 65535 && cbl(err(11, 0, 1), null), compression) if (size < 16e4) try {
          cbl(null, deflateSync(file, p));
        } catch (e) {
          cbl(e, null);
        } else term.push(deflate(file, p, cbl)); else cbl(null, file);
      }, i6 = 0; i6 < slft; ++i6) _loop_1(i6);
      return tAll;
    }
    function zipSync(data, opts) {
      opts || (opts = {});
      var r = {}, files = [];
      fltn(data, "", r, opts);
      var o = 0, tot = 0;
      for (var fn in r) {
        var _a2 = r[fn], file = _a2[0], p = _a2[1], compression = 0 == p.level ? 0 : 8, s = (f = strToU8(fn)).length, com = p.comment, m = com && strToU8(com), ms = m && m.length, exl = exfl(p.extra);
        s > 65535 && err(11);
        var d = compression ? deflateSync(file, p) : file, l = d.length, c = crc();
        c.p(file), files.push(mrg(p, {
          size: file.length,
          crc: c.d(),
          c: d,
          f: f,
          m: m,
          u: s != fn.length || m && com.length != ms,
          o: o,
          compression: compression
        })), o += 30 + s + exl + l, tot += 76 + 2 * (s + exl) + (ms || 0) + l;
      }
      for (var out = new u8(tot + 22), oe = o, cdl = tot - o, i6 = 0; i6 < files.length; ++i6) {
        var f = files[i6];
        wzh(out, f.o, f, f.f, f.u, f.c.length);
        var badd = 30 + f.f.length + exfl(f.extra);
        out.set(f.c, f.o + badd), wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
      }
      return wzf(out, o, files.length, cdl, oe), out;
    }
    var UnzipPassThrough = function() {
      function UnzipPassThrough1() {}
      return UnzipPassThrough1.prototype.push = function(data, final) {
        this.ondata(null, data, final);
      }, UnzipPassThrough1.compression = 0, UnzipPassThrough1;
    }(), UnzipInflate = function() {
      function UnzipInflate1() {
        var _this_1 = this;
        this.i = new Inflate((function(dat, final) {
          _this_1.ondata(null, dat, final);
        }));
      }
      return UnzipInflate1.prototype.push = function(data, final) {
        try {
          this.i.push(data, final);
        } catch (e) {
          this.ondata(e, null, final);
        }
      }, UnzipInflate1.compression = 8, UnzipInflate1;
    }(), AsyncUnzipInflate = function() {
      function AsyncUnzipInflate1(_, sz) {
        var _this_1 = this;
        sz < 32e4 ? this.i = new Inflate((function(dat, final) {
          _this_1.ondata(null, dat, final);
        })) : (this.i = new AsyncInflate((function(err1, dat, final) {
          _this_1.ondata(err1, dat, final);
        })), this.terminate = this.i.terminate);
      }
      return AsyncUnzipInflate1.prototype.push = function(data, final) {
        this.i.terminate && (data = slc(data, 0)), this.i.push(data, final);
      }, AsyncUnzipInflate1.compression = 8, AsyncUnzipInflate1;
    }(), Unzip = function() {
      function Unzip1(cb) {
        this.onfile = cb, this.k = [], this.o = {
          0: UnzipPassThrough
        }, this.p = et;
      }
      return Unzip1.prototype.push = function(chunk, final) {
        var _this_1 = this;
        if (this.onfile || err(5), this.p || err(4), this.c > 0) {
          var len = Math.min(this.c, chunk.length), toAdd = chunk.subarray(0, len);
          if (this.c -= len, this.d ? this.d.push(toAdd, !this.c) : this.k[0].push(toAdd), 
          (chunk = chunk.subarray(len)).length) return this.push(chunk, final);
        } else {
          var f = 0, i6 = 0, is = void 0, buf = void 0;
          this.p.length ? chunk.length ? ((buf = new u8(this.p.length + chunk.length)).set(this.p), 
          buf.set(chunk, this.p.length)) : buf = this.p : buf = chunk;
          for (var l = buf.length, oc = this.c, add = oc && this.d, _loop_2 = function() {
            var _a3, sig = b4(buf, i6);
            if (67324752 == sig) {
              f = 1, is = i6, this_1.d = null, this_1.c = 0;
              var bf = b2(buf, i6 + 6), cmp_1 = b2(buf, i6 + 8), u = 2048 & bf, dd = 8 & bf, fnl = b2(buf, i6 + 26), es = b2(buf, i6 + 28);
              if (l > i6 + 30 + fnl + es) {
                var chks_3 = [];
                this_1.k.unshift(chks_3), f = 2;
                var d_1, sc_1 = b4(buf, i6 + 18), su_1 = b4(buf, i6 + 22), fn_1 = strFromU8(buf.subarray(i6 + 30, i6 += 30 + fnl), !u);
                4294967295 == sc_1 ? (_a3 = dd ? [ -2 ] : z64e(buf, i6), sc_1 = _a3[0], su_1 = _a3[1]) : dd && (sc_1 = -1), 
                i6 += es, this_1.c = sc_1;
                var file_1 = {
                  name: fn_1,
                  compression: cmp_1,
                  start: function() {
                    if (file_1.ondata || err(5), sc_1) {
                      var ctr = _this_1.o[cmp_1];
                      ctr || file_1.ondata(err(14, "unknown compression type " + cmp_1, 1), null, !1), 
                      (d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1)).ondata = function(err1, dat, final1) {
                        file_1.ondata(err1, dat, final1);
                      };
                      for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                        var dat = chks_4[_i];
                        d_1.push(dat, !1);
                      }
                      _this_1.k[0] == chks_3 && _this_1.c ? _this_1.d = d_1 : d_1.push(et, !0);
                    } else file_1.ondata(null, et, !0);
                  },
                  terminate: function() {
                    d_1 && d_1.terminate && d_1.terminate();
                  }
                };
                sc_1 >= 0 && (file_1.size = sc_1, file_1.originalSize = su_1), this_1.onfile(file_1);
              }
              return "break";
            }
            if (oc) {
              if (134695760 == sig) return is = i6 += 12 + (-2 == oc && 8), f = 3, this_1.c = 0, 
              "break";
              if (33639248 == sig) return is = i6 -= 4, f = 3, this_1.c = 0, "break";
            }
          }, this_1 = this; i6 < l - 4; ++i6) {
            if ("break" === _loop_2()) break;
          }
          if (this.p = et, oc < 0) {
            var dat = f ? buf.subarray(0, is - 12 - (-2 == oc && 8) - (134695760 == b4(buf, is - 16) && 4)) : buf.subarray(0, i6);
            add ? add.push(dat, !!f) : this.k[+(2 == f)].push(dat);
          }
          if (2 & f) return this.push(buf.subarray(i6), final);
          this.p = buf.subarray(i6);
        }
        final && (this.c && err(13), this.p = null);
      }, Unzip1.prototype.register = function(decoder) {
        this.o[decoder.compression] = decoder;
      }, Unzip1;
    }(), mt = "function" == typeof queueMicrotask ? queueMicrotask : "function" == typeof setTimeout ? setTimeout : function(fn) {
      fn();
    };
    function unzip(data, opts, cb) {
      cb || (cb = opts, opts = {}), "function" != typeof cb && err(7);
      var term = [], tAll = function() {
        for (var i7 = 0; i7 < term.length; ++i7) term[i7]();
      }, files = {}, cbd = function(a, b) {
        mt((function() {
          cb(a, b);
        }));
      };
      mt((function() {
        cbd = cb;
      }));
      for (var e = data.length - 22; 101010256 != b4(data, e); --e) if (!e || data.length - e > 65558) return cbd(err(13, 0, 1), null), 
      tAll;
      var lft = b2(data, e + 8);
      if (lft) {
        var c = lft, o = b4(data, e + 16), z = 4294967295 == o;
        if (z) {
          if (e = b4(data, e - 12), 101075792 != b4(data, e)) return cbd(err(13, 0, 1), null), 
          tAll;
          c = lft = b4(data, e + 32), o = b4(data, e + 48);
        }
        for (var fltr = opts && opts.filter, _loop_3 = function(i7) {
          var _a3 = zh(data, o, z), c_1 = _a3[0], sc = _a3[1], su = _a3[2], fn = _a3[3], no = _a3[4], off = _a3[5], b = slzh(data, off);
          o = no;
          var cbl = function(e1, d) {
            e1 ? (tAll(), cbd(e1, null)) : (d && (files[fn] = d), --lft || cbd(null, files));
          };
          if (!fltr || fltr({
            name: fn,
            size: sc,
            originalSize: su,
            compression: c_1
          })) if (c_1) if (8 == c_1) {
            var infl = data.subarray(b, b + sc);
            if (sc < 32e4) try {
              cbl(null, inflateSync(infl, new u8(su)));
            } catch (e1) {
              cbl(e1, null);
            } else term.push(inflate(infl, {
              size: su
            }, cbl));
          } else cbl(err(14, "unknown compression type " + c_1, 1), null); else cbl(null, slc(data, b, b + sc)); else cbl(null, null);
        }, i7 = 0; i7 < c; ++i7) _loop_3();
      } else cbd(null, {});
      return tAll;
    }
    function unzipSync(data, opts) {
      for (var files = {}, e = data.length - 22; 101010256 != b4(data, e); --e) (!e || data.length - e > 65558) && err(13);
      var c = b2(data, e + 8);
      if (!c) return {};
      var o = b4(data, e + 16), z = 4294967295 == o;
      z && (e = b4(data, e - 12), 101075792 != b4(data, e) && err(13), c = b4(data, e + 32), 
      o = b4(data, e + 48));
      for (var fltr = opts && opts.filter, i8 = 0; i8 < c; ++i8) {
        var _a3 = zh(data, o, z), c_2 = _a3[0], sc = _a3[1], su = _a3[2], fn = _a3[3], no = _a3[4], off = _a3[5], b = slzh(data, off);
        o = no, fltr && !fltr({
          name: fn,
          size: sc,
          originalSize: su,
          compression: c_2
        }) || (c_2 ? 8 == c_2 ? files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su)) : err(14, "unknown compression type " + c_2) : files[fn] = slc(data, b, b + sc));
      }
      return files;
    }
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "2g1xn": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _contextJs = require("../context.js"), _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _databaseJs = require("../pings/database.js"), _rateLimiterJs = require("./rate_limiter.js"), _rateLimiterJsDefault = parcelHelpers.interopDefault(_rateLimiterJs), _workerJs = require("./worker.js"), _workerJsDefault = parcelHelpers.interopDefault(_workerJs), _policyJs = require("./policy.js"), _policyJsDefault = parcelHelpers.interopDefault(_policyJs), _taskJs = require("./task.js"), _taskJsDefault = parcelHelpers.interopDefault(_taskJs);
    const LOG_TAG = "core.Upload.PingUploadManager";
    exports.default = class {
      constructor(config, pingsDatabase, policy = new _policyJsDefault.default, rateLimiter = new _rateLimiterJsDefault.default) {
        this.pingsDatabase = pingsDatabase, this.policy = policy, this.rateLimiter = rateLimiter, 
        this.recoverableFailureCount = 0, this.waitAttemptCount = 0, this.queue = [], this.worker = new _workerJsDefault.default(config.httpClient ? config.httpClient : _contextJs.Context.platform.uploader, config.serverEndpoint, policy), 
        pingsDatabase.attachObserver(this);
      }
      enqueuePing(ping) {
        for (const queuedPing of this.queue) if (queuedPing.identifier === ping.identifier) return;
        this.queue.push(ping);
      }
      getUploadTaskInternal() {
        if (this.recoverableFailureCount >= this.policy.maxRecoverableFailures) return _logJsDefault.default(LOG_TAG, "Glean has reached maximum recoverable upload failures for the current uploading window.", _logJs.LoggingLevel.Debug), 
        _taskJsDefault.default.done();
        if (this.queue.length > 0) {
          const {state: state, remainingTime: remainingTime} = this.rateLimiter.getState();
          if (1 === state) return _logJsDefault.default(LOG_TAG, [ "Glean is currently throttled.", `Pending pings may be uploaded in ${(remainingTime || 0) / 1e3}s.` ], _logJs.LoggingLevel.Debug), 
          this.waitAttemptCount++, this.waitAttemptCount > this.policy.maxWaitAttempts ? _taskJsDefault.default.done() : _taskJsDefault.default.wait(remainingTime || 0);
          const nextPing = this.queue.shift();
          return _taskJsDefault.default.upload(nextPing);
        }
        return _taskJsDefault.default.done();
      }
      getUploadTask() {
        const nextTask = this.getUploadTaskInternal();
        return "wait" !== nextTask.type && this.waitAttemptCount > 0 && (this.waitAttemptCount = 0), 
        "upload" !== nextTask.type && this.recoverableFailureCount > 0 && (this.recoverableFailureCount = 0), 
        nextTask;
      }
      async processPingUploadResponse(ping, response) {
        const {identifier: identifier} = ping;
        this.queue.filter((p => p.identifier !== identifier));
        const {status: status, result: result} = response;
        return status && status >= 200 && status < 300 ? (_logJsDefault.default(LOG_TAG, `Ping ${identifier} succesfully sent ${status}.`, _logJs.LoggingLevel.Info), 
        void await this.pingsDatabase.deletePing(identifier)) : 1 === result || status && status >= 400 && status < 500 ? (_logJsDefault.default(LOG_TAG, `Unrecoverable upload failure while attempting to send ping ${identifier}. Error was: ${null != status ? status : "no status"}.`, _logJs.LoggingLevel.Warn), 
        void await this.pingsDatabase.deletePing(identifier)) : (_logJsDefault.default(LOG_TAG, [ `Recoverable upload failure while attempting to send ping ${identifier}, will retry.`, `Error was: ${null != status ? status : "no status"}.` ], _logJs.LoggingLevel.Warn), 
        this.recoverableFailureCount++, void this.enqueuePing(ping));
      }
      async clearPendingPingsQueue() {
        this.queue = this.queue.filter((ping => _databaseJs.isDeletionRequest(ping))), await this.blockOnOngoingUploads();
      }
      async blockOnOngoingUploads() {
        return this.worker.blockOnCurrentJob();
      }
      update(identifier, ping) {
        this.enqueuePing({
          identifier: identifier,
          ...ping
        }), this.worker.work((() => this.getUploadTask()), ((ping, result) => this.processPingUploadResponse(ping, result)));
      }
    };
  }, {
    "../context.js": "fbkOU",
    "../log.js": "l3qBW",
    "../pings/database.js": "fOTtz",
    "./rate_limiter.js": "cXj8O",
    "./worker.js": "9OuId",
    "./policy.js": "j4QcW",
    "./task.js": "4O4Ja",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  cXj8O: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "RATE_LIMITER_INTERVAL_MS", (() => RATE_LIMITER_INTERVAL_MS)), 
    parcelHelpers.export(exports, "MAX_PINGS_PER_INTERVAL", (() => MAX_PINGS_PER_INTERVAL)), 
    parcelHelpers.export(exports, "RateLimiterState", (() => RateLimiterState));
    var _utilsJs = require("../utils.js");
    const RATE_LIMITER_INTERVAL_MS = 6e4, MAX_PINGS_PER_INTERVAL = 40;
    var RateLimiterState, RateLimiterState1;
    (RateLimiterState1 = RateLimiterState || (RateLimiterState = {}))[RateLimiterState1.Incrementing = 0] = "Incrementing", 
    RateLimiterState1[RateLimiterState1.Throttled = 1] = "Throttled";
    exports.default = class {
      constructor(interval = RATE_LIMITER_INTERVAL_MS, maxCount = MAX_PINGS_PER_INTERVAL, count = 0, started) {
        this.interval = interval, this.maxCount = maxCount, this.count = count, this.started = started;
      }
      get elapsed() {
        if (_utilsJs.isUndefined(this.started)) return NaN;
        const result = _utilsJs.getMonotonicNow() - this.started;
        return result < 0 ? NaN : result;
      }
      reset() {
        this.started = _utilsJs.getMonotonicNow(), this.count = 0;
      }
      shouldReset() {
        return !!_utilsJs.isUndefined(this.started) || !!(isNaN(this.elapsed) || this.elapsed > this.interval);
      }
      getState() {
        this.shouldReset() && this.reset();
        const remainingTime = this.interval - this.elapsed;
        return this.count >= this.maxCount ? {
          state: 1,
          remainingTime: remainingTime
        } : (this.count++, {
          state: 0
        });
      }
    };
  }, {
    "../utils.js": "gSLA7",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "9OuId": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _fflate = require("fflate"), _constantsJs = require("../constants.js"), _contextJs = require("../context.js"), _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _policyJs = require("./policy.js"), _policyJsDefault = parcelHelpers.interopDefault(_policyJs), _uploaderJs = require("./uploader.js");
    const LOG_TAG = "core.Upload.PingUploadWorker";
    class PingBodyOverflowError extends Error {
      constructor(message) {
        super(message), this.name = "PingBodyOverflow";
      }
    }
    exports.default = class {
      constructor(uploader, serverEndpoint, policy = new _policyJsDefault.default) {
        this.uploader = uploader, this.serverEndpoint = serverEndpoint, this.policy = policy, 
        this.isBlocking = !1;
      }
      async buildPingRequest(ping) {
        let headers = ping.headers || {};
        headers = {
          ...ping.headers,
          "Content-Type": "application/json; charset=utf-8",
          Date: (new Date).toISOString(),
          "X-Client-Type": "Glean.js",
          "X-Client-Version": _constantsJs.GLEAN_VERSION,
          "X-Telemetry-Agent": `Glean/${_constantsJs.GLEAN_VERSION} (JS on ${await _contextJs.Context.platform.info.os()})`
        };
        const stringifiedBody = JSON.stringify(ping.payload), encodedBody = _fflate.strToU8(stringifiedBody);
        let finalBody, bodySizeInBytes;
        try {
          finalBody = _fflate.gzipSync(encodedBody), bodySizeInBytes = finalBody.length, headers["Content-Encoding"] = "gzip";
        } catch (_a) {
          finalBody = stringifiedBody, bodySizeInBytes = encodedBody.length;
        }
        if (bodySizeInBytes > this.policy.maxPingBodySize) throw new PingBodyOverflowError(`Body for ping ${ping.identifier} exceeds ${this.policy.maxPingBodySize}bytes. Discarding.`);
        return headers["Content-Length"] = bodySizeInBytes.toString(), {
          headers: headers,
          payload: finalBody
        };
      }
      async attemptPingUpload(ping) {
        try {
          const finalPing = await this.buildPingRequest(ping);
          return await this.uploader.post(`${this.serverEndpoint}${ping.path}`, finalPing.payload, finalPing.headers);
        } catch (e) {
          return _logJsDefault.default(LOG_TAG, [ "Error trying to build or post ping request:", e ], _logJs.LoggingLevel.Warn), 
          new _uploaderJs.UploadResult(1);
        }
      }
      async workInternal(getUploadTask, processUploadResponse) {
        for (;;) {
          const nextTask = getUploadTask();
          switch (nextTask.type) {
           case "upload":
            const result = await this.attemptPingUpload(nextTask.ping);
            await processUploadResponse(nextTask.ping, result);
            continue;

           case "wait":
            if (this.isBlocking) return;
            try {
              if (await new Promise((resolve => {
                this.waitPromiseResolver = resolve, this.waitTimeoutId = _contextJs.Context.platform.timer.setTimeout((() => {
                  this.waitPromiseResolver = void 0, this.waitTimeoutId = void 0, resolve(!1);
                }), nextTask.remainingTime);
              }))) return;
            } catch (_) {
              return this.waitPromiseResolver = void 0, void (this.waitTimeoutId = void 0);
            }
            continue;

           case "done":
            return;
          }
        }
      }
      work(getUploadTask, processUploadResponse) {
        this.currentJob || (this.currentJob = this.workInternal(getUploadTask, processUploadResponse).then((() => {
          this.currentJob = void 0;
        })).catch((error => {
          _logJsDefault.default(LOG_TAG, [ "IMPOSSIBLE: Something went wrong while processing ping upload tasks.", error ], _logJs.LoggingLevel.Error);
        })));
      }
      async blockOnCurrentJob() {
        return this.currentJob ? (this.waitTimeoutId && this.waitPromiseResolver && (_contextJs.Context.platform.timer.clearTimeout(this.waitTimeoutId), 
        this.waitPromiseResolver(!0), this.waitPromiseResolver = void 0, this.waitTimeoutId = void 0), 
        this.isBlocking = !0, await this.currentJob, void (this.isBlocking = !1)) : Promise.resolve();
      }
    };
  }, {
    fflate: "62X4P",
    "../constants.js": "kPBk9",
    "../context.js": "fbkOU",
    "../log.js": "l3qBW",
    "./policy.js": "j4QcW",
    "./uploader.js": "GM0rQ",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  j4QcW: [ function(require, module, exports) {
    require("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(exports);
    exports.default = class {
      constructor(maxWaitAttempts = 3, maxRecoverableFailures = 3, maxPingBodySize = 1048576) {
        this.maxWaitAttempts = maxWaitAttempts, this.maxRecoverableFailures = maxRecoverableFailures, 
        this.maxPingBodySize = maxPingBodySize;
      }
    };
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "4O4Ja": [ function(require, module, exports) {
    var UploadTaskTypes, UploadTaskTypes1, parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "UploadTaskTypes", (() => UploadTaskTypes)), 
    (UploadTaskTypes1 = UploadTaskTypes || (UploadTaskTypes = {})).Done = "done", UploadTaskTypes1.Wait = "wait", 
    UploadTaskTypes1.Upload = "upload", exports.default = {
      done: () => ({
        type: "done"
      }),
      wait: remainingTime => ({
        type: "wait",
        remainingTime: remainingTime
      }),
      upload: ping => ({
        type: "upload",
        ping: ping
      })
    };
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "8avI8": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "CoreMetrics", (() => CoreMetrics));
    var _constantsJs = require("./constants.js"), _uuidJs = require("./metrics/types/uuid.js"), _uuidJsDefault = parcelHelpers.interopDefault(_uuidJs), _datetimeJs = require("./metrics/types/datetime.js"), _datetimeJsDefault = parcelHelpers.interopDefault(_datetimeJs), _stringJs = require("./metrics/types/string.js"), _stringJsDefault = parcelHelpers.interopDefault(_stringJs), _utilsJs = require("./metrics/utils.js"), _timeUnitJs = require("./metrics/time_unit.js"), _timeUnitJsDefault = parcelHelpers.interopDefault(_timeUnitJs), _utilsJs1 = require("./utils.js"), _logJs = require("./log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _contextJs = require("./context.js");
    class CoreMetrics {
      constructor() {
        this.clientId = new _uuidJsDefault.default({
          name: "client_id",
          category: "",
          sendInPings: [ "glean_client_info" ],
          lifetime: "user",
          disabled: !1
        }), this.firstRunDate = new _datetimeJsDefault.default({
          name: "first_run_date",
          category: "",
          sendInPings: [ "glean_client_info" ],
          lifetime: "user",
          disabled: !1
        }, _timeUnitJsDefault.default.Day), this.os = new _stringJsDefault.default({
          name: "os",
          category: "",
          sendInPings: [ "glean_client_info" ],
          lifetime: "application",
          disabled: !1
        }), this.osVersion = new _stringJsDefault.default({
          name: "os_version",
          category: "",
          sendInPings: [ "glean_client_info" ],
          lifetime: "application",
          disabled: !1
        }), this.architecture = new _stringJsDefault.default({
          name: "architecture",
          category: "",
          sendInPings: [ "glean_client_info" ],
          lifetime: "application",
          disabled: !1
        }), this.locale = new _stringJsDefault.default({
          name: "locale",
          category: "",
          sendInPings: [ "glean_client_info" ],
          lifetime: "application",
          disabled: !1
        }), this.appChannel = new _stringJsDefault.default({
          name: "app_channel",
          category: "",
          sendInPings: [ "glean_client_info" ],
          lifetime: "application",
          disabled: !1
        }), this.appBuild = new _stringJsDefault.default({
          name: "app_build",
          category: "",
          sendInPings: [ "glean_client_info" ],
          lifetime: "application",
          disabled: !1
        }), this.appDisplayVersion = new _stringJsDefault.default({
          name: "app_display_version",
          category: "",
          sendInPings: [ "glean_client_info" ],
          lifetime: "application",
          disabled: !1
        });
      }
      async initialize(config, platform) {
        await this.initializeClientId(), await this.initializeFirstRunDate(), await _stringJsDefault.default._private_setUndispatched(this.os, await platform.info.os()), 
        await _stringJsDefault.default._private_setUndispatched(this.osVersion, await platform.info.osVersion(config.osVersion)), 
        await _stringJsDefault.default._private_setUndispatched(this.architecture, await platform.info.arch(config.architecture)), 
        await _stringJsDefault.default._private_setUndispatched(this.locale, await platform.info.locale()), 
        await _stringJsDefault.default._private_setUndispatched(this.appBuild, config.appBuild || "Unknown"), 
        await _stringJsDefault.default._private_setUndispatched(this.appDisplayVersion, config.appDisplayVersion || "Unknown"), 
        config.channel && await _stringJsDefault.default._private_setUndispatched(this.appChannel, config.channel);
      }
      async initializeClientId() {
        let needNewClientId = !1;
        const clientIdData = await _contextJs.Context.metricsDatabase.getMetric(_constantsJs.CLIENT_INFO_STORAGE, this.clientId);
        if (clientIdData) try {
          _utilsJs.createMetric("uuid", clientIdData).payload() === _constantsJs.KNOWN_CLIENT_ID && (needNewClientId = !0);
        } catch (_a) {
          _logJsDefault.default("core.InternalMetrics", "Unexpected value found for Glean clientId. Ignoring.", _logJs.LoggingLevel.Warn), 
          needNewClientId = !0;
        } else needNewClientId = !0;
        needNewClientId && await _uuidJsDefault.default._private_setUndispatched(this.clientId, _utilsJs1.generateUUIDv4());
      }
      async initializeFirstRunDate() {
        await _contextJs.Context.metricsDatabase.getMetric(_constantsJs.CLIENT_INFO_STORAGE, this.firstRunDate) || await _datetimeJsDefault.default._private_setUndispatched(this.firstRunDate);
      }
    }
  }, {
    "./constants.js": "kPBk9",
    "./metrics/types/uuid.js": "8BW3z",
    "./metrics/types/datetime.js": "4adlt",
    "./metrics/types/string.js": "dpEKZ",
    "./metrics/utils.js": "hYPaM",
    "./metrics/time_unit.js": "d9iTI",
    "./utils.js": "gSLA7",
    "./log.js": "l3qBW",
    "./context.js": "fbkOU",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "5JW5i": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "getGleanRestartedEventMetric", (() => getGleanRestartedEventMetric));
    var _utilsJs = require("../../utils.js"), _eventJs = require("../types/event.js"), _eventJsDefault = parcelHelpers.interopDefault(_eventJs), _logJs = require("../../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _counterJs = require("../types/counter.js"), _counterJsDefault = parcelHelpers.interopDefault(_counterJs), _contextJs = require("../../context.js"), _databaseJs = require("../database.js"), _recordedEventJs = require("./recorded_event.js"), _constantsJs = require("../../constants.js"), _errorTypeJs = require("../../error/error_type.js");
    function createDateObject(str) {
      _utilsJs.isString(str) || (str = "");
      const date = new Date(str);
      if (isNaN(date.getTime())) throw new Error(`Error attempting to generate Date object from string: ${str}`);
      return date;
    }
    function getExecutionCounterMetric(sendInPings) {
      return new _counterJsDefault.default({
        ..._databaseJs.generateReservedMetricIdentifiers("execution_counter"),
        sendInPings: sendInPings,
        lifetime: "ping",
        disabled: !1
      });
    }
    function getGleanRestartedEventMetric(sendInPings) {
      return new _eventJsDefault.default({
        category: "glean",
        name: "restarted",
        sendInPings: sendInPings,
        lifetime: "ping",
        disabled: !1
      }, [ _constantsJs.GLEAN_REFERENCE_TIME_EXTRA_KEY ]);
    }
    async function recordGleanRestartedEvent(sendInPings, time = _contextJs.Context.startTime) {
      const metric = getGleanRestartedEventMetric(sendInPings);
      await _eventJsDefault.default._private_recordUndispatched(metric, {
        [_constantsJs.GLEAN_REFERENCE_TIME_EXTRA_KEY]: time.toISOString()
      }, 0);
    }
    exports.default = class {
      constructor() {
        this.initialized = !1, this.eventsStore = new _contextJs.Context.platform.Storage("events");
      }
      async getAvailableStoreNames() {
        const data = await this.eventsStore.get([]);
        return _utilsJs.isUndefined(data) ? [] : Object.keys(data);
      }
      async initialize() {
        if (this.initialized) return;
        const storeNames = await this.getAvailableStoreNames();
        await _counterJsDefault.default._private_addUndispatched(getExecutionCounterMetric(storeNames), 1), 
        await recordGleanRestartedEvent(storeNames), this.initialized = !0;
      }
      async record(metric, value) {
        if (!metric.disabled) for (const ping of metric.sendInPings) {
          const executionCounter = getExecutionCounterMetric([ ping ]);
          let currentExecutionCount = await _contextJs.Context.metricsDatabase.getMetric(ping, executionCounter);
          currentExecutionCount || (await _counterJsDefault.default._private_addUndispatched(executionCounter, 1), 
          currentExecutionCount = 1, await recordGleanRestartedEvent([ ping ], new Date)), 
          value.addExtra(_constantsJs.GLEAN_EXECUTION_COUNTER_EXTRA_KEY, currentExecutionCount);
          const transformFn = v => {
            var _a;
            const existing = null !== (_a = v) && void 0 !== _a ? _a : [];
            return existing.push(_recordedEventJs.RecordedEvent.toJSONObject(value)), existing;
          };
          await this.eventsStore.update([ ping ], transformFn);
        }
      }
      async getEvents(ping, metric) {
        const events = await this.getAndValidatePingData(ping);
        if (0 !== events.length) return events.filter((e => e.category === metric.category && e.name === metric.name)).map((e => e.withoutReservedExtras()));
      }
      async getAndValidatePingData(ping) {
        const data = await this.eventsStore.get([ ping ]);
        return _utilsJs.isUndefined(data) ? [] : Array.isArray(data) ? data.map((e => _recordedEventJs.RecordedEvent.fromJSONObject(e))) : (_logJsDefault.default("core.Metric.EventsDatabase", `Unexpected value found for ping ${ping}: ${JSON.stringify(data)}. Clearing.`, _logJs.LoggingLevel.Error), 
        await this.eventsStore.delete([ ping ]), []);
      }
      async getPingEvents(ping, clearPingLifetimeData) {
        const pingData = await this.getAndValidatePingData(ping);
        if (clearPingLifetimeData && Object.keys(pingData).length > 0 && await this.eventsStore.delete([ ping ]), 
        0 === pingData.length) return;
        const payload = await this.prepareEventsPayload(ping, pingData);
        return payload.length > 0 ? payload : void 0;
      }
      async prepareEventsPayload(pingName, pingData) {
        var _a, _b, _c, _d;
        const sortedEvents = pingData.sort(((a, b) => {
          var _a1, _b1;
          const executionCounterA = Number(null === (_a1 = a.extra) || void 0 === _a1 ? void 0 : _a1[_constantsJs.GLEAN_EXECUTION_COUNTER_EXTRA_KEY]), executionCounterB = Number(null === (_b1 = b.extra) || void 0 === _b1 ? void 0 : _b1[_constantsJs.GLEAN_EXECUTION_COUNTER_EXTRA_KEY]);
          return executionCounterA !== executionCounterB ? executionCounterA - executionCounterB : a.timestamp - b.timestamp;
        }));
        let lastRestartDate;
        try {
          lastRestartDate = createDateObject(null === (_a = sortedEvents[0].extra) || void 0 === _a ? void 0 : _a[_constantsJs.GLEAN_REFERENCE_TIME_EXTRA_KEY]), 
          sortedEvents.shift();
        } catch (_e) {
          lastRestartDate = _contextJs.Context.startTime;
        }
        const firstEventOffset = (null === (_b = sortedEvents[0]) || void 0 === _b ? void 0 : _b.timestamp) || 0;
        let restartedOffset = 0;
        for (const [index, event] of sortedEvents.entries()) {
          try {
            const nextRestartDate = createDateObject(null === (_c = event.extra) || void 0 === _c ? void 0 : _c[_constantsJs.GLEAN_REFERENCE_TIME_EXTRA_KEY]), dateOffset = nextRestartDate.getTime() - lastRestartDate.getTime();
            lastRestartDate = nextRestartDate;
            const newRestartedOffset = restartedOffset + dateOffset, previousEventTimestamp = sortedEvents[index - 1].timestamp;
            newRestartedOffset <= previousEventTimestamp ? (restartedOffset = previousEventTimestamp + 1, 
            await _contextJs.Context.errorManager.record(getGleanRestartedEventMetric([ pingName ]), _errorTypeJs.ErrorType.InvalidValue, `Invalid time offset between application sessions found for ping "${pingName}". Ignoring.`)) : restartedOffset = newRestartedOffset;
          } catch (_f) {}
          let adjustedTimestamp;
          adjustedTimestamp = 1 === Number((null === (_d = event.extra) || void 0 === _d ? void 0 : _d[_constantsJs.GLEAN_EXECUTION_COUNTER_EXTRA_KEY]) || 1) ? event.timestamp - firstEventOffset : event.timestamp + restartedOffset, 
          sortedEvents[index] = new _recordedEventJs.RecordedEvent(event.category, event.name, adjustedTimestamp, event.extra);
        }
        return sortedEvents.map((e => _recordedEventJs.RecordedEvent.toJSONObject(e.payload())));
      }
      async clearAll() {
        await this.eventsStore.delete([]);
      }
    };
  }, {
    "../../utils.js": "gSLA7",
    "../types/event.js": "1NVqI",
    "../../log.js": "l3qBW",
    "../types/counter.js": "2XjZC",
    "../../context.js": "fbkOU",
    "../database.js": "jfZ0j",
    "./recorded_event.js": "jAXZp",
    "../../constants.js": "kPBk9",
    "../../error/error_type.js": "euvNM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "1NVqI": [ function(require, module, exports) {
    require("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(exports);
    var _indexJs = require("../index.js"), _recordedEventJs = require("../events_database/recorded_event.js"), _utilsJs = require("../../utils.js"), _contextJs = require("../../context.js"), _errorTypeJs = require("../../error/error_type.js"), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    class EventMetricType extends _indexJs.MetricType {
      constructor(meta, allowedExtraKeys) {
        super("event", meta), this.allowedExtraKeys = allowedExtraKeys;
      }
      static async _private_recordUndispatched(instance, extra, timestamp = _utilsJs.getMonotonicNow()) {
        if (!instance.shouldRecord(_contextJs.Context.uploadEnabled)) return;
        let truncatedExtra;
        if (extra && instance.allowedExtraKeys) {
          truncatedExtra = {};
          for (const [name, value] of Object.entries(extra)) {
            if (!instance.allowedExtraKeys.includes(name)) {
              await _contextJs.Context.errorManager.record(instance, _errorTypeJs.ErrorType.InvalidValue, `Invalid key index: ${name}`);
              continue;
            }
            _utilsJs.isString(value) ? truncatedExtra[name] = await _utilsJs.truncateStringAtBoundaryWithError(instance, value, 100) : truncatedExtra[name] = value;
          }
        }
        return _contextJs.Context.eventsDatabase.record(instance, new _recordedEventJs.RecordedEvent(instance.category, instance.name, timestamp, truncatedExtra));
      }
      record(extra) {
        const timestamp = _utilsJs.getMonotonicNow();
        _contextJs.Context.dispatcher.launch((async () => {
          await EventMetricType._private_recordUndispatched(this, extra, timestamp);
        }));
      }
      async testGetValue(ping = this.sendInPings[0]) {
        let events;
        return await _contextJs.Context.dispatcher.testLaunch((async () => {
          events = await _contextJs.Context.eventsDatabase.getEvents(ping, this);
        })), events;
      }
    }
    __decorate([ _utilsJs.testOnly("core.metrics.EventMetricType") ], EventMetricType.prototype, "testGetValue", null), 
    exports.default = EventMetricType;
  }, {
    "../index.js": "fCqHm",
    "../events_database/recorded_event.js": "jAXZp",
    "../../utils.js": "gSLA7",
    "../../context.js": "fbkOU",
    "../../error/error_type.js": "euvNM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  jAXZp: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "RecordedEvent", (() => RecordedEvent));
    var _constantsJs = require("../../constants.js");
    class RecordedEvent {
      constructor(category, name, timestamp, extra) {
        this.category = category, this.name = name, this.timestamp = timestamp, this.extra = extra;
      }
      static toJSONObject(e) {
        return {
          category: e.category,
          name: e.name,
          timestamp: e.timestamp,
          extra: e.extra
        };
      }
      static fromJSONObject(e) {
        return new RecordedEvent(e.category, e.name, e.timestamp, e.extra);
      }
      static withTransformedExtras(e, transformFn) {
        const transformedExtras = transformFn(e.extra || {});
        return new RecordedEvent(e.category, e.name, e.timestamp, transformedExtras && Object.keys(transformedExtras).length > 0 ? transformedExtras : void 0);
      }
      addExtra(key, value) {
        this.extra || (this.extra = {}), this.extra[key] = value;
      }
      withoutReservedExtras() {
        return RecordedEvent.withTransformedExtras(this, (extras => Object.keys(extras).filter((key => !_constantsJs.GLEAN_RESERVED_EXTRA_KEYS.includes(key))).reduce(((obj, key) => (obj[key] = extras[key], 
        obj)), {})));
      }
      payload() {
        return RecordedEvent.withTransformedExtras(this.withoutReservedExtras(), (extras => Object.keys(extras).reduce(((extra1, key) => (extra1[key] = extras[key].toString(), 
        extra1)), {})));
      }
    }
  }, {
    "../../constants.js": "kPBk9",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  cT6ti: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _constantsJs = require("./constants.js"), _pingTypeJs = require("./pings/ping_type.js"), _pingTypeJsDefault = parcelHelpers.interopDefault(_pingTypeJs);
    exports.default = class {
      constructor() {
        this.deletionRequest = new _pingTypeJsDefault.default({
          name: _constantsJs.DELETION_REQUEST_PING_NAME,
          includeClientId: !0,
          sendIfEmpty: !0
        });
      }
    };
  }, {
    "./constants.js": "kPBk9",
    "./pings/ping_type.js": "ciomu",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  ciomu: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _constantsJs = require("../constants.js"), _utilsJs = require("../utils.js"), _makerJs = require("../pings/maker.js"), _makerJsDefault = parcelHelpers.interopDefault(_makerJs), _contextJs = require("../context.js"), _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), __decorate = function(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    const LOG_TAG = "core.Pings.PingType";
    class PingType {
      constructor(meta) {
        var _a;
        this.name = meta.name, this.includeClientId = meta.includeClientId, this.sendIfEmpty = meta.sendIfEmpty, 
        this.reasonCodes = null !== (_a = meta.reasonCodes) && void 0 !== _a ? _a : [];
      }
      isDeletionRequest() {
        return this.name === _constantsJs.DELETION_REQUEST_PING_NAME;
      }
      submit(reason) {
        this.testCallback ? this.testCallback(reason).then((() => {
          PingType._private_internalSubmit(this, reason, this.resolveTestPromiseFunction);
        })).catch((e => {
          _logJsDefault.default(LOG_TAG, [ `There was an error validating "${this.name}" (${null != reason ? reason : "no reason"}):`, e ], _logJs.LoggingLevel.Error), 
          PingType._private_internalSubmit(this, reason, this.rejectTestPromiseFunction);
        })) : PingType._private_internalSubmit(this, reason);
      }
      static async _private_submitUndispatched(instance, reason, testResolver) {
        if (!_contextJs.Context.initialized) return void _logJsDefault.default(LOG_TAG, "Glean must be initialized before submitting pings.", _logJs.LoggingLevel.Info);
        if (!_contextJs.Context.uploadEnabled && !instance.isDeletionRequest()) return void _logJsDefault.default(LOG_TAG, "Glean disabled: not submitting pings. Glean may still submit the deletion-request ping.", _logJs.LoggingLevel.Info);
        let correctedReason = reason;
        reason && !instance.reasonCodes.includes(reason) && (_logJsDefault.default(LOG_TAG, `Invalid reason code ${reason} from ${this.name}. Ignoring.`, _logJs.LoggingLevel.Warn), 
        correctedReason = void 0);
        const identifier = _utilsJs.generateUUIDv4();
        await _makerJsDefault.default(identifier, instance, correctedReason), testResolver && (testResolver(), 
        instance.resolveTestPromiseFunction = void 0, instance.rejectTestPromiseFunction = void 0, 
        instance.testCallback = void 0);
      }
      static _private_internalSubmit(instance, reason, testResolver) {
        _contextJs.Context.dispatcher.launch((async () => {
          await PingType._private_submitUndispatched(instance, reason, testResolver);
        }));
      }
      async testBeforeNextSubmit(callbackFn) {
        if (!this.testCallback) return new Promise(((resolve, reject) => {
          this.resolveTestPromiseFunction = resolve, this.rejectTestPromiseFunction = reject, 
          this.testCallback = callbackFn;
        }));
        _logJsDefault.default(LOG_TAG, `There is an existing test call for ping "${this.name}". Ignoring.`, _logJs.LoggingLevel.Error);
      }
    }
    __decorate([ _utilsJs.testOnly(LOG_TAG) ], PingType.prototype, "testBeforeNextSubmit", null), 
    exports.default = PingType;
  }, {
    "../constants.js": "kPBk9",
    "../utils.js": "gSLA7",
    "../pings/maker.js": "humKz",
    "../context.js": "fbkOU",
    "../log.js": "l3qBW",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  humKz: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "getSequenceNumber", (() => getSequenceNumber)), 
    parcelHelpers.export(exports, "getStartEndTimes", (() => getStartEndTimes)), parcelHelpers.export(exports, "buildPingInfoSection", (() => buildPingInfoSection)), 
    parcelHelpers.export(exports, "buildClientInfoSection", (() => buildClientInfoSection)), 
    parcelHelpers.export(exports, "getPingHeaders", (() => getPingHeaders)), parcelHelpers.export(exports, "collectPing", (() => collectPing)), 
    parcelHelpers.export(exports, "makePath", (() => makePath)), parcelHelpers.export(exports, "collectAndStorePing", (() => collectAndStorePing));
    var _constantsJs = require("../constants.js"), _counterJs = require("../metrics/types/counter.js"), _counterJsDefault = parcelHelpers.interopDefault(_counterJs), _datetimeJs = require("../metrics/types/datetime.js"), _datetimeJsDefault = parcelHelpers.interopDefault(_datetimeJs), _timeUnitJs = require("../metrics/time_unit.js"), _timeUnitJsDefault = parcelHelpers.interopDefault(_timeUnitJs), _indexJs = require("../events/index.js"), _indexJsDefault = parcelHelpers.interopDefault(_indexJs), _contextJs = require("../context.js"), _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs);
    const LOG_TAG = "core.Pings.Maker";
    async function getSequenceNumber(ping) {
      const seq = new _counterJsDefault.default({
        category: "",
        name: `${ping.name}#sequence`,
        sendInPings: [ _constantsJs.PING_INFO_STORAGE ],
        lifetime: "user",
        disabled: !1
      }), currentSeqData = await _contextJs.Context.metricsDatabase.getMetric(_constantsJs.PING_INFO_STORAGE, seq);
      if (await _counterJsDefault.default._private_addUndispatched(seq, 1), currentSeqData) try {
        return new _counterJs.CounterMetric(currentSeqData).payload();
      } catch (e) {
        _logJsDefault.default(LOG_TAG, `Unexpected value found for sequence number in ping ${ping.name}. Ignoring.`, _logJs.LoggingLevel.Warn);
      }
      return 0;
    }
    async function getStartEndTimes(ping) {
      const {startTimeMetric: startTimeMetric, startTime: startTime} = await async function(ping) {
        const startTimeMetric = new _datetimeJsDefault.default({
          category: "",
          name: `${ping.name}#start`,
          sendInPings: [ _constantsJs.PING_INFO_STORAGE ],
          lifetime: "user",
          disabled: !1
        }, _timeUnitJsDefault.default.Minute), startTimeData = await _contextJs.Context.metricsDatabase.getMetric(_constantsJs.PING_INFO_STORAGE, startTimeMetric);
        let startTime;
        return startTime = startTimeData ? new _datetimeJs.DatetimeMetric(startTimeData) : _datetimeJs.DatetimeMetric.fromDate(_contextJs.Context.startTime, _timeUnitJsDefault.default.Minute), 
        {
          startTimeMetric: startTimeMetric,
          startTime: startTime
        };
      }(ping), endTimeData = new Date;
      await _datetimeJsDefault.default._private_setUndispatched(startTimeMetric, endTimeData);
      const endTime = _datetimeJs.DatetimeMetric.fromDate(endTimeData, _timeUnitJsDefault.default.Minute);
      return {
        startTime: startTime.payload(),
        endTime: endTime.payload()
      };
    }
    async function buildPingInfoSection(ping, reason) {
      const seq = await getSequenceNumber(ping), {startTime: startTime, endTime: endTime} = await getStartEndTimes(ping), pingInfo = {
        seq: seq,
        start_time: startTime,
        end_time: endTime
      };
      return reason && (pingInfo.reason = reason), pingInfo;
    }
    async function buildClientInfoSection(ping) {
      let clientInfo = await _contextJs.Context.metricsDatabase.getPingMetrics(_constantsJs.CLIENT_INFO_STORAGE, !0);
      clientInfo || (_logJsDefault.default(LOG_TAG, "Empty client info data. Will submit anyways.", _logJs.LoggingLevel.Warn), 
      clientInfo = {});
      let finalClientInfo = {
        telemetry_sdk_build: _constantsJs.GLEAN_VERSION
      };
      for (const metricType in clientInfo) finalClientInfo = {
        ...finalClientInfo,
        ...clientInfo[metricType]
      };
      return ping.includeClientId || delete finalClientInfo.client_id, finalClientInfo;
    }
    function getPingHeaders() {
      var _a, _b;
      const headers = {};
      if ((null === (_a = _contextJs.Context.debugOptions) || void 0 === _a ? void 0 : _a.debugViewTag) && (headers["X-Debug-ID"] = _contextJs.Context.debugOptions.debugViewTag), 
      (null === (_b = _contextJs.Context.debugOptions) || void 0 === _b ? void 0 : _b.sourceTags) && (headers["X-Source-Tags"] = _contextJs.Context.debugOptions.sourceTags.toString()), 
      Object.keys(headers).length > 0) return headers;
    }
    async function collectPing(ping, reason) {
      const eventsData = await _contextJs.Context.eventsDatabase.getPingEvents(ping.name, !0), metricsData = await _contextJs.Context.metricsDatabase.getPingMetrics(ping.name, !0);
      if (!metricsData && !eventsData) {
        if (!ping.sendIfEmpty) return void _logJsDefault.default(LOG_TAG, `Storage for ${ping.name} empty. Bailing out.`, _logJs.LoggingLevel.Info);
        _logJsDefault.default(LOG_TAG, `Storage for ${ping.name} empty. Ping will still be sent.`, _logJs.LoggingLevel.Info);
      }
      return {
        ...metricsData ? {
          metrics: metricsData
        } : {},
        ...eventsData ? {
          events: eventsData
        } : {},
        ping_info: await buildPingInfoSection(ping, reason),
        client_info: await buildClientInfoSection(ping)
      };
    }
    function makePath(identifier, ping) {
      return `/submit/${_contextJs.Context.applicationId}/${ping.name}/${_constantsJs.GLEAN_SCHEMA_VERSION}/${identifier}`;
    }
    async function collectAndStorePing(identifier, ping, reason) {
      const collectedPayload = await collectPing(ping, reason);
      if (!collectedPayload) return;
      let modifiedPayload;
      try {
        modifiedPayload = await _indexJsDefault.default.afterPingCollection.trigger(collectedPayload);
      } catch (e) {
        return void _logJsDefault.default(LOG_TAG, [ `Error while attempting to modify ping payload for the "${ping.name}" ping using`, `the ${JSON.stringify(_indexJsDefault.default.afterPingCollection.registeredPluginIdentifier)} plugin.`, "Ping will not be submitted. See more logs below.\n\n", e ], _logJs.LoggingLevel.Error);
      }
      _contextJs.Context.debugOptions.logPings && _logJsDefault.default(LOG_TAG, JSON.stringify(collectedPayload, null, 2), _logJs.LoggingLevel.Info);
      const finalPayload = modifiedPayload || collectedPayload, headers = getPingHeaders();
      return _contextJs.Context.pingsDatabase.recordPing(makePath(identifier, ping), identifier, finalPayload, headers);
    }
    exports.default = collectAndStorePing;
  }, {
    "../constants.js": "kPBk9",
    "../metrics/types/counter.js": "2XjZC",
    "../metrics/types/datetime.js": "4adlt",
    "../metrics/time_unit.js": "d9iTI",
    "../events/index.js": "hEASU",
    "../context.js": "fbkOU",
    "../log.js": "l3qBW",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  hEASU: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "CoreEvent", (() => CoreEvent));
    var _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs);
    class CoreEvent {
      constructor(name) {
        this.name = name;
      }
      get registeredPluginIdentifier() {
        var _a;
        return null === (_a = this.plugin) || void 0 === _a ? void 0 : _a.name;
      }
      registerPlugin(plugin) {
        this.plugin ? _logJsDefault.default("core.Events", [ `Attempted to register plugin '${plugin.name}', which listens to the event '${plugin.event}'.`, `That event is already watched by plugin '${this.plugin.name}'`, `Plugin '${plugin.name}' will be ignored.` ], _logJs.LoggingLevel.Error) : this.plugin = plugin;
      }
      deregisterPlugin() {
        this.plugin = void 0;
      }
      trigger(...args) {
        if (this.plugin) return this.plugin.action(...args);
      }
    }
    const CoreEvents = {
      afterPingCollection: new CoreEvent("afterPingCollection")
    };
    exports.default = CoreEvents;
  }, {
    "../log.js": "l3qBW",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  bNpC8: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "registerPluginToEvent", (() => registerPluginToEvent)), 
    parcelHelpers.export(exports, "testResetEvents", (() => testResetEvents));
    var _indexJs = require("./index.js"), _indexJsDefault = parcelHelpers.interopDefault(_indexJs), _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs);
    function registerPluginToEvent(plugin) {
      const eventName = plugin.event;
      if (eventName in _indexJsDefault.default) {
        _indexJsDefault.default[eventName].registerPlugin(plugin);
      } else _logJsDefault.default("core.Events.Utils", [ `Attempted to register plugin '${plugin.name}', which listens to the event '${plugin.event}'.`, "That is not a valid Glean event. Ignoring" ], _logJs.LoggingLevel.Error);
    }
    function testResetEvents() {
      for (const event in _indexJsDefault.default) _indexJsDefault.default[event].deregisterPlugin();
    }
  }, {
    "./index.js": "hEASU",
    "../log.js": "l3qBW",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  bwlnw: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _counterJs = require("../metrics/types/counter.js"), _counterJsDefault = parcelHelpers.interopDefault(_counterJs), _labeledJs = require("../metrics/types/labeled.js"), _logJs = require("../log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs);
    function getErrorMetricForMetric(metric, error) {
      const identifier = metric.baseIdentifier(), name = _labeledJs.stripLabel(identifier);
      return new _counterJsDefault.default({
        name: _labeledJs.combineIdentifierAndLabel(error, name),
        category: "glean.error",
        lifetime: "ping",
        sendInPings: metric.sendInPings,
        disabled: !1
      });
    }
    exports.default = class {
      async record(metric, error, message, numErrors = 1) {
        const errorMetric = getErrorMetricForMetric(metric, error);
        _logJsDefault.default(function(metric) {
          return `core.Metrics.${metric.type.charAt(0).toUpperCase() + metric.type.slice(1)}`;
        }(metric), [ `${metric.baseIdentifier()}:`, message ]), numErrors > 0 && await _counterJsDefault.default._private_addUndispatched(errorMetric, numErrors);
      }
      async testGetNumRecordedErrors(metric, error, ping) {
        const errorMetric = getErrorMetricForMetric(metric, error);
        return await errorMetric.testGetValue(ping) || 0;
      }
    };
  }, {
    "../metrics/types/counter.js": "2XjZC",
    "../metrics/types/labeled.js": "rM1qs",
    "../log.js": "l3qBW",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  idTsI: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _storageJs = require("../test/storage.js"), _storageJsDefault = parcelHelpers.interopDefault(_storageJs), _uploaderJs = require("../../core/upload/uploader.js"), _uploaderJsDefault = parcelHelpers.interopDefault(_uploaderJs);
    class MockUploader extends _uploaderJsDefault.default {
      post(_url, _body, _headers) {
        const result = new _uploaderJs.UploadResult(2, 200);
        return Promise.resolve(result);
      }
    }
    const MockPlatformInfo = {
      os: () => Promise.resolve("Unknown"),
      osVersion: () => Promise.resolve("Unknown"),
      arch: () => Promise.resolve("Unknown"),
      locale: () => Promise.resolve("Unknown")
    }, safeSetTimeout = "undefined" != typeof setTimeout ? setTimeout : () => {
      throw new Error;
    }, safeClearTimeout = "undefined" != typeof clearTimeout ? clearTimeout : () => {}, TestPlatform = {
      Storage: _storageJsDefault.default,
      uploader: new MockUploader,
      info: MockPlatformInfo,
      timer: {
        setTimeout: safeSetTimeout,
        clearTimeout: safeClearTimeout
      },
      name: "test"
    };
    exports.default = TestPlatform;
  }, {
    "../test/storage.js": "hEHak",
    "../../core/upload/uploader.js": "GM0rQ",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  hEHak: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _logJs = require("../../core/log.js"), _logJsDefault = parcelHelpers.interopDefault(_logJs), _utilsJs = require("../../core/storage/utils.js");
    let globalStore = {};
    exports.default = class {
      constructor(rootKey) {
        this.rootKey = rootKey;
      }
      get(index = []) {
        try {
          const value = _utilsJs.getValueFromNestedObject(globalStore, [ this.rootKey, ...index ]);
          return Promise.resolve(value);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      update(index, transformFn) {
        try {
          return globalStore = _utilsJs.updateNestedObject(globalStore, [ this.rootKey, ...index ], transformFn), 
          Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      }
      delete(index) {
        try {
          globalStore = _utilsJs.deleteKeyFromNestedObject(globalStore, [ this.rootKey, ...index ]);
        } catch (e) {
          _logJsDefault.default("plaftom.test.Storage", [ `Error attempting to delete key ${index.toString()} from storage. Ignoring.`, e ], _logJs.LoggingLevel.Warn);
        }
        return Promise.resolve();
      }
    };
  }, {
    "../../core/log.js": "l3qBW",
    "../../core/storage/utils.js": "fG8Uh",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "6JKvf": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Integrations", (() => INTEGRATIONS)), 
    parcelHelpers.export(exports, "Transports", (() => _transports));
    var _tslib = require("tslib"), _core = require("@sentry/core"), _utils = require("@sentry/utils"), _integrations = require("./integrations"), _transports = require("./transports"), _exports = require("./exports");
    parcelHelpers.exportAll(_exports, exports);
    var windowIntegrations = {}, _window = _utils.getGlobalObject();
    _window.Sentry && _window.Sentry.Integrations && (windowIntegrations = _window.Sentry.Integrations);
    var INTEGRATIONS = _tslib.__assign(_tslib.__assign(_tslib.__assign({}, windowIntegrations), _core.Integrations), _integrations);
  }, {
    tslib: "eEuCs",
    "./exports": "jSgin",
    "@sentry/core": "fctce",
    "@sentry/utils": "gda2Z",
    "./integrations": "9JGL8",
    "./transports": "c53MC",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  eEuCs: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "__extends", (() => __extends)), 
    parcelHelpers.export(exports, "__assign", (() => __assign)), parcelHelpers.export(exports, "__rest", (() => __rest)), 
    parcelHelpers.export(exports, "__decorate", (() => __decorate)), parcelHelpers.export(exports, "__param", (() => __param)), 
    parcelHelpers.export(exports, "__metadata", (() => __metadata)), parcelHelpers.export(exports, "__awaiter", (() => __awaiter)), 
    parcelHelpers.export(exports, "__generator", (() => __generator)), parcelHelpers.export(exports, "__createBinding", (() => __createBinding)), 
    parcelHelpers.export(exports, "__exportStar", (() => __exportStar)), parcelHelpers.export(exports, "__values", (() => __values)), 
    parcelHelpers.export(exports, "__read", (() => __read)), parcelHelpers.export(exports, "__spread", (() => __spread)), 
    parcelHelpers.export(exports, "__spreadArrays", (() => __spreadArrays)), parcelHelpers.export(exports, "__await", (() => __await)), 
    parcelHelpers.export(exports, "__asyncGenerator", (() => __asyncGenerator)), parcelHelpers.export(exports, "__asyncDelegator", (() => __asyncDelegator)), 
    parcelHelpers.export(exports, "__asyncValues", (() => __asyncValues)), parcelHelpers.export(exports, "__makeTemplateObject", (() => __makeTemplateObject)), 
    parcelHelpers.export(exports, "__importStar", (() => __importStar)), parcelHelpers.export(exports, "__importDefault", (() => __importDefault)), 
    parcelHelpers.export(exports, "__classPrivateFieldGet", (() => __classPrivateFieldGet)), 
    parcelHelpers.export(exports, "__classPrivateFieldSet", (() => __classPrivateFieldSet));
    /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var extendStatics = function(d, b) {
      return (extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d1, b1) {
        d1.__proto__ = b1;
      } || function(d1, b1) {
        for (var p in b1) b1.hasOwnProperty(p) && (d1[p] = b1[p]);
      })(d, b);
    };
    function __extends(d, b) {
      function __() {
        this.constructor = d;
      }
      extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
      new __);
    }
    var __assign = function() {
      return (__assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) for (var p in s = arguments[i]) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
        return t;
      }).apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};
      for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0 && (t[p] = s[p]);
      if (null != s && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]) && (t[p[i]] = s[p[i]]);
      }
      return t;
    }
    function __decorate(decorators, target, key, desc) {
      var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    }
    function __metadata(metadataKey, metadataValue) {
      if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))((function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator.throw(value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          var value;
          result.done ? resolve(result.value) : (value = result.value, value instanceof P ? value : new P((function(resolve) {
            resolve(value);
          }))).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      }));
    }
    function __generator(thisArg, body) {
      var f, y, t, g, _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      };
      function verb(n) {
        return function(v) {
          return function(op) {
            if (f) throw new TypeError("Generator is already executing.");
            for (;_; ) try {
              if (f = 1, y && (t = 2 & op[0] ? y.return : op[0] ? y.throw || ((t = y.return) && t.call(y), 
              0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              switch (y = 0, t && (op = [ 2 & op[0], t.value ]), op[0]) {
               case 0:
               case 1:
                t = op;
                break;

               case 4:
                return _.label++, {
                  value: op[1],
                  done: !1
                };

               case 5:
                _.label++, y = op[1], op = [ 0 ];
                continue;

               case 7:
                op = _.ops.pop(), _.trys.pop();
                continue;

               default:
                if (!(t = _.trys, (t = t.length > 0 && t[t.length - 1]) || 6 !== op[0] && 2 !== op[0])) {
                  _ = 0;
                  continue;
                }
                if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (6 === op[0] && _.label < t[1]) {
                  _.label = t[1], t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2], _.ops.push(op);
                  break;
                }
                t[2] && _.ops.pop(), _.trys.pop();
                continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [ 6, e ], y = 0;
            } finally {
              f = t = 0;
            }
            if (5 & op[0]) throw op[1];
            return {
              value: op[0] ? op[1] : void 0,
              done: !0
            };
          }([ n, v ]);
        };
      }
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" == typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
    }
    function __createBinding(o, m, k, k2) {
      void 0 === k2 && (k2 = k), o[k2] = m[k];
    }
    function __exportStar(m, exports) {
      for (var p in m) "default" === p || exports.hasOwnProperty(p) || (exports[p] = m[p]);
    }
    function __values(o) {
      var s = "function" == typeof Symbol && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && "number" == typeof o.length) return {
        next: function() {
          return o && i >= o.length && (o = void 0), {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
      var m = "function" == typeof Symbol && o[Symbol.iterator];
      if (!m) return o;
      var r, e, i = m.call(o), ar = [];
      try {
        for (;(void 0 === n || n-- > 0) && !(r = i.next()).done; ) ar.push(r.value);
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          r && !r.done && (m = i.return) && m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    }
    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
      return ar;
    }
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      var r = Array(s), k = 0;
      for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    }
    function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var i, g = generator.apply(thisArg, _arguments || []), q = [];
      function verb(n) {
        g[n] && (i[n] = function(v) {
          return new Promise((function(a, b) {
            q.push([ n, v, a, b ]) > 1 || resume(n, v);
          }));
        });
      }
      function resume(n, v) {
        try {
          (r = g[n](v)).value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        } catch (e) {
          settle(q[0][3], e);
        }
        var r;
      }
      function fulfill(value) {
        resume("next", value);
      }
      function reject(value) {
        resume("throw", value);
      }
      function settle(f, v) {
        f(v), q.shift(), q.length && resume(q[0][0], q[0][1]);
      }
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i;
    }
    function __asyncDelegator(o) {
      var i, p;
      function verb(n, f) {
        i[n] = o[n] ? function(v) {
          return (p = !p) ? {
            value: __await(o[n](v)),
            done: "return" === n
          } : f ? f(v) : v;
        } : f;
      }
      return i = {}, verb("next"), verb("throw", (function(e) {
        throw e;
      })), verb("return"), i[Symbol.iterator] = function() {
        return this;
      }, i;
    }
    function __asyncValues(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var i, m = o[Symbol.asyncIterator];
      function verb(n) {
        i[n] = o[n] && function(v) {
          return new Promise((function(resolve, reject) {
            (function(resolve, reject, d, v) {
              Promise.resolve(v).then((function(v1) {
                resolve({
                  value: v1,
                  done: d
                });
              }), reject);
            })(resolve, reject, (v = o[n](v)).done, v.value);
          }));
        };
      }
      return m ? m.call(o) : (o = __values(o), i = {}, verb("next"), verb("throw"), verb("return"), 
      i[Symbol.asyncIterator] = function() {
        return this;
      }, i);
    }
    function __makeTemplateObject(cooked, raw) {
      return Object.defineProperty ? Object.defineProperty(cooked, "raw", {
        value: raw
      }) : cooked.raw = raw, cooked;
    }
    function __importStar(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (null != mod) for (var k in mod) Object.hasOwnProperty.call(mod, k) && (result[k] = mod[k]);
      return result.default = mod, result;
    }
    function __importDefault(mod) {
      return mod && mod.__esModule ? mod : {
        default: mod
      };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
      if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
      return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
      if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
      return privateMap.set(receiver, value), value;
    }
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  jSgin: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Severity", (() => _types.Severity)), 
    parcelHelpers.export(exports, "Status", (() => _types.Status)), parcelHelpers.export(exports, "addGlobalEventProcessor", (() => _core.addGlobalEventProcessor)), 
    parcelHelpers.export(exports, "addBreadcrumb", (() => _core.addBreadcrumb)), parcelHelpers.export(exports, "captureException", (() => _core.captureException)), 
    parcelHelpers.export(exports, "captureEvent", (() => _core.captureEvent)), parcelHelpers.export(exports, "captureMessage", (() => _core.captureMessage)), 
    parcelHelpers.export(exports, "configureScope", (() => _core.configureScope)), parcelHelpers.export(exports, "getHubFromCarrier", (() => _core.getHubFromCarrier)), 
    parcelHelpers.export(exports, "getCurrentHub", (() => _core.getCurrentHub)), parcelHelpers.export(exports, "Hub", (() => _core.Hub)), 
    parcelHelpers.export(exports, "makeMain", (() => _core.makeMain)), parcelHelpers.export(exports, "Scope", (() => _core.Scope)), 
    parcelHelpers.export(exports, "startTransaction", (() => _core.startTransaction)), 
    parcelHelpers.export(exports, "setContext", (() => _core.setContext)), parcelHelpers.export(exports, "setExtra", (() => _core.setExtra)), 
    parcelHelpers.export(exports, "setExtras", (() => _core.setExtras)), parcelHelpers.export(exports, "setTag", (() => _core.setTag)), 
    parcelHelpers.export(exports, "setTags", (() => _core.setTags)), parcelHelpers.export(exports, "setUser", (() => _core.setUser)), 
    parcelHelpers.export(exports, "withScope", (() => _core.withScope)), parcelHelpers.export(exports, "BrowserClient", (() => _client.BrowserClient)), 
    parcelHelpers.export(exports, "injectReportDialog", (() => _helpers.injectReportDialog)), 
    parcelHelpers.export(exports, "eventFromException", (() => _eventbuilder.eventFromException)), 
    parcelHelpers.export(exports, "eventFromMessage", (() => _eventbuilder.eventFromMessage)), 
    parcelHelpers.export(exports, "defaultIntegrations", (() => _sdk.defaultIntegrations)), 
    parcelHelpers.export(exports, "forceLoad", (() => _sdk.forceLoad)), parcelHelpers.export(exports, "init", (() => _sdk.init)), 
    parcelHelpers.export(exports, "lastEventId", (() => _sdk.lastEventId)), parcelHelpers.export(exports, "onLoad", (() => _sdk.onLoad)), 
    parcelHelpers.export(exports, "showReportDialog", (() => _sdk.showReportDialog)), 
    parcelHelpers.export(exports, "flush", (() => _sdk.flush)), parcelHelpers.export(exports, "close", (() => _sdk.close)), 
    parcelHelpers.export(exports, "wrap", (() => _sdk.wrap)), parcelHelpers.export(exports, "SDK_NAME", (() => _version.SDK_NAME)), 
    parcelHelpers.export(exports, "SDK_VERSION", (() => _version.SDK_VERSION));
    var _types = require("@sentry/types"), _core = require("@sentry/core"), _client = require("./client"), _helpers = require("./helpers"), _eventbuilder = require("./eventbuilder"), _sdk = require("./sdk"), _version = require("./version");
  }, {
    "@sentry/types": "2Tlfl",
    "@sentry/core": "fctce",
    "./client": "3seWe",
    "./helpers": "eeNY6",
    "./eventbuilder": "4kSuP",
    "./sdk": "lJb5U",
    "./version": "in8FX",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "2Tlfl": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "LogLevel", (() => _loglevel.LogLevel)), 
    parcelHelpers.export(exports, "SessionStatus", (() => _session.SessionStatus)), 
    parcelHelpers.export(exports, "Severity", (() => _severity.Severity)), parcelHelpers.export(exports, "Status", (() => _status.Status)), 
    parcelHelpers.export(exports, "TransactionSamplingMethod", (() => _transaction.TransactionSamplingMethod));
    var _loglevel = require("./loglevel"), _session = require("./session"), _severity = require("./severity"), _status = require("./status"), _transaction = require("./transaction");
  }, {
    "./loglevel": "h1otX",
    "./session": "cAhJd",
    "./severity": "j9gxV",
    "./status": "ePfqj",
    "./transaction": "bskvI",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  h1otX: [ function(require, module, exports) {
    var LogLevel, LogLevel1, parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "LogLevel", (() => LogLevel)), 
    (LogLevel1 = LogLevel || (LogLevel = {}))[LogLevel1.None = 0] = "None", LogLevel1[LogLevel1.Error = 1] = "Error", 
    LogLevel1[LogLevel1.Debug = 2] = "Debug", LogLevel1[LogLevel1.Verbose = 3] = "Verbose";
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  cAhJd: [ function(require, module, exports) {
    var SessionStatus, SessionStatus1, parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "SessionStatus", (() => SessionStatus)), 
    (SessionStatus1 = SessionStatus || (SessionStatus = {})).Ok = "ok", SessionStatus1.Exited = "exited", 
    SessionStatus1.Crashed = "crashed", SessionStatus1.Abnormal = "abnormal";
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  j9gxV: [ function(require, module, exports) {
    var Severity, Severity1, parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Severity", (() => Severity)), 
    (Severity1 = Severity || (Severity = {})).Fatal = "fatal", Severity1.Error = "error", 
    Severity1.Warning = "warning", Severity1.Log = "log", Severity1.Info = "info", Severity1.Debug = "debug", 
    Severity1.Critical = "critical", function(Severity1) {
      Severity1.fromString = function(level) {
        switch (level) {
         case "debug":
          return Severity1.Debug;

         case "info":
          return Severity1.Info;

         case "warn":
         case "warning":
          return Severity1.Warning;

         case "error":
          return Severity1.Error;

         case "fatal":
          return Severity1.Fatal;

         case "critical":
          return Severity1.Critical;

         case "log":
         default:
          return Severity1.Log;
        }
      };
    }(Severity || (Severity = {}));
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  ePfqj: [ function(require, module, exports) {
    var Status, Status1, parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Status", (() => Status)), 
    (Status1 = Status || (Status = {})).Unknown = "unknown", Status1.Skipped = "skipped", 
    Status1.Success = "success", Status1.RateLimit = "rate_limit", Status1.Invalid = "invalid", 
    Status1.Failed = "failed", function(Status1) {
      Status1.fromHttpCode = function(code) {
        return code >= 200 && code < 300 ? Status1.Success : 429 === code ? Status1.RateLimit : code >= 400 && code < 500 ? Status1.Invalid : code >= 500 ? Status1.Failed : Status1.Unknown;
      };
    }(Status || (Status = {}));
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  bskvI: [ function(require, module, exports) {
    var TransactionSamplingMethod, TransactionSamplingMethod1, parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "TransactionSamplingMethod", (() => TransactionSamplingMethod)), 
    (TransactionSamplingMethod1 = TransactionSamplingMethod || (TransactionSamplingMethod = {})).Explicit = "explicitly_set", 
    TransactionSamplingMethod1.Sampler = "client_sampler", TransactionSamplingMethod1.Rate = "client_rate", 
    TransactionSamplingMethod1.Inheritance = "inheritance";
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  fctce: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "addBreadcrumb", (() => _minimal.addBreadcrumb)), 
    parcelHelpers.export(exports, "captureException", (() => _minimal.captureException)), 
    parcelHelpers.export(exports, "captureEvent", (() => _minimal.captureEvent)), parcelHelpers.export(exports, "captureMessage", (() => _minimal.captureMessage)), 
    parcelHelpers.export(exports, "configureScope", (() => _minimal.configureScope)), 
    parcelHelpers.export(exports, "startTransaction", (() => _minimal.startTransaction)), 
    parcelHelpers.export(exports, "setContext", (() => _minimal.setContext)), parcelHelpers.export(exports, "setExtra", (() => _minimal.setExtra)), 
    parcelHelpers.export(exports, "setExtras", (() => _minimal.setExtras)), parcelHelpers.export(exports, "setTag", (() => _minimal.setTag)), 
    parcelHelpers.export(exports, "setTags", (() => _minimal.setTags)), parcelHelpers.export(exports, "setUser", (() => _minimal.setUser)), 
    parcelHelpers.export(exports, "withScope", (() => _minimal.withScope)), parcelHelpers.export(exports, "addGlobalEventProcessor", (() => _hub.addGlobalEventProcessor)), 
    parcelHelpers.export(exports, "getCurrentHub", (() => _hub.getCurrentHub)), parcelHelpers.export(exports, "getHubFromCarrier", (() => _hub.getHubFromCarrier)), 
    parcelHelpers.export(exports, "Hub", (() => _hub.Hub)), parcelHelpers.export(exports, "makeMain", (() => _hub.makeMain)), 
    parcelHelpers.export(exports, "Scope", (() => _hub.Scope)), parcelHelpers.export(exports, "API", (() => _api.API)), 
    parcelHelpers.export(exports, "BaseClient", (() => _baseclient.BaseClient)), parcelHelpers.export(exports, "BaseBackend", (() => _basebackend.BaseBackend)), 
    parcelHelpers.export(exports, "eventToSentryRequest", (() => _request.eventToSentryRequest)), 
    parcelHelpers.export(exports, "sessionToSentryRequest", (() => _request.sessionToSentryRequest)), 
    parcelHelpers.export(exports, "initAndBind", (() => _sdk.initAndBind)), parcelHelpers.export(exports, "NoopTransport", (() => _noop.NoopTransport)), 
    parcelHelpers.export(exports, "Integrations", (() => _integrations));
    var _integrations = require("./integrations"), _minimal = require("@sentry/minimal"), _hub = require("@sentry/hub"), _api = require("./api"), _baseclient = require("./baseclient"), _basebackend = require("./basebackend"), _request = require("./request"), _sdk = require("./sdk"), _noop = require("./transports/noop");
  }, {
    "@sentry/minimal": "52xGd",
    "@sentry/hub": "8MJ29",
    "./api": "ii8g3",
    "./baseclient": "9EabM",
    "./basebackend": "2O0sy",
    "./request": "esMMQ",
    "./sdk": "bLUqH",
    "./transports/noop": "h6Pbk",
    "./integrations": "34QOE",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "52xGd": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "captureException", (() => captureException)), 
    parcelHelpers.export(exports, "captureMessage", (() => captureMessage)), parcelHelpers.export(exports, "captureEvent", (() => captureEvent)), 
    parcelHelpers.export(exports, "configureScope", (() => configureScope)), parcelHelpers.export(exports, "addBreadcrumb", (() => addBreadcrumb)), 
    parcelHelpers.export(exports, "setContext", (() => setContext)), parcelHelpers.export(exports, "setExtras", (() => setExtras)), 
    parcelHelpers.export(exports, "setTags", (() => setTags)), parcelHelpers.export(exports, "setExtra", (() => setExtra)), 
    parcelHelpers.export(exports, "setTag", (() => setTag)), parcelHelpers.export(exports, "setUser", (() => setUser)), 
    parcelHelpers.export(exports, "withScope", (() => withScope)), parcelHelpers.export(exports, "_callOnClient", (() => _callOnClient)), 
    parcelHelpers.export(exports, "startTransaction", (() => startTransaction));
    var _tslib = require("tslib"), _hub = require("@sentry/hub");
    function callOnHub(method) {
      for (var args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
      var hub = _hub.getCurrentHub();
      if (hub && hub[method]) return hub[method].apply(hub, _tslib.__spread(args));
      throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
    }
    function captureException(exception, captureContext) {
      var syntheticException;
      try {
        throw new Error("Sentry syntheticException");
      } catch (exception1) {
        syntheticException = exception1;
      }
      return callOnHub("captureException", exception, {
        captureContext: captureContext,
        originalException: exception,
        syntheticException: syntheticException
      });
    }
    function captureMessage(message, captureContext) {
      var syntheticException;
      try {
        throw new Error(message);
      } catch (exception) {
        syntheticException = exception;
      }
      var context = "string" != typeof captureContext ? {
        captureContext: captureContext
      } : void 0;
      return callOnHub("captureMessage", message, "string" == typeof captureContext ? captureContext : void 0, _tslib.__assign({
        originalException: message,
        syntheticException: syntheticException
      }, context));
    }
    function captureEvent(event) {
      return callOnHub("captureEvent", event);
    }
    function configureScope(callback) {
      callOnHub("configureScope", callback);
    }
    function addBreadcrumb(breadcrumb) {
      callOnHub("addBreadcrumb", breadcrumb);
    }
    function setContext(name, context) {
      callOnHub("setContext", name, context);
    }
    function setExtras(extras) {
      callOnHub("setExtras", extras);
    }
    function setTags(tags) {
      callOnHub("setTags", tags);
    }
    function setExtra(key, extra) {
      callOnHub("setExtra", key, extra);
    }
    function setTag(key, value) {
      callOnHub("setTag", key, value);
    }
    function setUser(user) {
      callOnHub("setUser", user);
    }
    function withScope(callback) {
      callOnHub("withScope", callback);
    }
    function _callOnClient(method) {
      for (var args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
      callOnHub.apply(void 0, _tslib.__spread([ "_invokeClient", method ], args));
    }
    function startTransaction(context, customSamplingContext) {
      return callOnHub("startTransaction", _tslib.__assign({}, context), customSamplingContext);
    }
  }, {
    tslib: "eEuCs",
    "@sentry/hub": "8MJ29",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "8MJ29": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "addGlobalEventProcessor", (() => _scope.addGlobalEventProcessor)), 
    parcelHelpers.export(exports, "Scope", (() => _scope.Scope)), parcelHelpers.export(exports, "Session", (() => _session.Session)), 
    parcelHelpers.export(exports, "getActiveDomain", (() => _hub.getActiveDomain)), 
    parcelHelpers.export(exports, "getCurrentHub", (() => _hub.getCurrentHub)), parcelHelpers.export(exports, "getHubFromCarrier", (() => _hub.getHubFromCarrier)), 
    parcelHelpers.export(exports, "getMainCarrier", (() => _hub.getMainCarrier)), parcelHelpers.export(exports, "Hub", (() => _hub.Hub)), 
    parcelHelpers.export(exports, "makeMain", (() => _hub.makeMain)), parcelHelpers.export(exports, "setHubOnCarrier", (() => _hub.setHubOnCarrier));
    var _scope = require("./scope"), _session = require("./session"), _hub = require("./hub");
  }, {
    "./scope": "37bps",
    "./session": "g0b3T",
    "./hub": "grC9S",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "37bps": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Scope", (() => Scope)), 
    parcelHelpers.export(exports, "addGlobalEventProcessor", (() => addGlobalEventProcessor));
    var _tslib = require("tslib"), _utils = require("@sentry/utils"), Scope = function() {
      function Scope1() {
        this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], 
        this._breadcrumbs = [], this._user = {}, this._tags = {}, this._extra = {}, this._contexts = {};
      }
      return Scope1.clone = function(scope) {
        var newScope = new Scope1;
        return scope && (newScope._breadcrumbs = _tslib.__spread(scope._breadcrumbs), newScope._tags = _tslib.__assign({}, scope._tags), 
        newScope._extra = _tslib.__assign({}, scope._extra), newScope._contexts = _tslib.__assign({}, scope._contexts), 
        newScope._user = scope._user, newScope._level = scope._level, newScope._span = scope._span, 
        newScope._session = scope._session, newScope._transactionName = scope._transactionName, 
        newScope._fingerprint = scope._fingerprint, newScope._eventProcessors = _tslib.__spread(scope._eventProcessors)), 
        newScope;
      }, Scope1.prototype.addScopeListener = function(callback) {
        this._scopeListeners.push(callback);
      }, Scope1.prototype.addEventProcessor = function(callback) {
        return this._eventProcessors.push(callback), this;
      }, Scope1.prototype.setUser = function(user) {
        return this._user = user || {}, this._session && this._session.update({
          user: user
        }), this._notifyScopeListeners(), this;
      }, Scope1.prototype.getUser = function() {
        return this._user;
      }, Scope1.prototype.setTags = function(tags) {
        return this._tags = _tslib.__assign(_tslib.__assign({}, this._tags), tags), this._notifyScopeListeners(), 
        this;
      }, Scope1.prototype.setTag = function(key, value) {
        var _a;
        return this._tags = _tslib.__assign(_tslib.__assign({}, this._tags), ((_a = {})[key] = value, 
        _a)), this._notifyScopeListeners(), this;
      }, Scope1.prototype.setExtras = function(extras) {
        return this._extra = _tslib.__assign(_tslib.__assign({}, this._extra), extras), 
        this._notifyScopeListeners(), this;
      }, Scope1.prototype.setExtra = function(key, extra) {
        var _a;
        return this._extra = _tslib.__assign(_tslib.__assign({}, this._extra), ((_a = {})[key] = extra, 
        _a)), this._notifyScopeListeners(), this;
      }, Scope1.prototype.setFingerprint = function(fingerprint) {
        return this._fingerprint = fingerprint, this._notifyScopeListeners(), this;
      }, Scope1.prototype.setLevel = function(level) {
        return this._level = level, this._notifyScopeListeners(), this;
      }, Scope1.prototype.setTransactionName = function(name) {
        return this._transactionName = name, this._notifyScopeListeners(), this;
      }, Scope1.prototype.setTransaction = function(name) {
        return this.setTransactionName(name);
      }, Scope1.prototype.setContext = function(key, context) {
        var _a;
        return null === context ? delete this._contexts[key] : this._contexts = _tslib.__assign(_tslib.__assign({}, this._contexts), ((_a = {})[key] = context, 
        _a)), this._notifyScopeListeners(), this;
      }, Scope1.prototype.setSpan = function(span) {
        return this._span = span, this._notifyScopeListeners(), this;
      }, Scope1.prototype.getSpan = function() {
        return this._span;
      }, Scope1.prototype.getTransaction = function() {
        var _a, _b, _c, _d, span = this.getSpan();
        return (null === (_a = span) || void 0 === _a ? void 0 : _a.transaction) ? null === (_b = span) || void 0 === _b ? void 0 : _b.transaction : (null === (_d = null === (_c = span) || void 0 === _c ? void 0 : _c.spanRecorder) || void 0 === _d ? void 0 : _d.spans[0]) ? span.spanRecorder.spans[0] : void 0;
      }, Scope1.prototype.setSession = function(session) {
        return session ? this._session = session : delete this._session, this._notifyScopeListeners(), 
        this;
      }, Scope1.prototype.getSession = function() {
        return this._session;
      }, Scope1.prototype.update = function(captureContext) {
        if (!captureContext) return this;
        if ("function" == typeof captureContext) {
          var updatedScope = captureContext(this);
          return updatedScope instanceof Scope1 ? updatedScope : this;
        }
        return captureContext instanceof Scope1 ? (this._tags = _tslib.__assign(_tslib.__assign({}, this._tags), captureContext._tags), 
        this._extra = _tslib.__assign(_tslib.__assign({}, this._extra), captureContext._extra), 
        this._contexts = _tslib.__assign(_tslib.__assign({}, this._contexts), captureContext._contexts), 
        captureContext._user && Object.keys(captureContext._user).length && (this._user = captureContext._user), 
        captureContext._level && (this._level = captureContext._level), captureContext._fingerprint && (this._fingerprint = captureContext._fingerprint)) : _utils.isPlainObject(captureContext) && (this._tags = _tslib.__assign(_tslib.__assign({}, this._tags), captureContext.tags), 
        this._extra = _tslib.__assign(_tslib.__assign({}, this._extra), captureContext.extra), 
        this._contexts = _tslib.__assign(_tslib.__assign({}, this._contexts), captureContext.contexts), 
        captureContext.user && (this._user = captureContext.user), captureContext.level && (this._level = captureContext.level), 
        captureContext.fingerprint && (this._fingerprint = captureContext.fingerprint)), 
        this;
      }, Scope1.prototype.clear = function() {
        return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, 
        this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, 
        this._span = void 0, this._session = void 0, this._notifyScopeListeners(), this;
      }, Scope1.prototype.addBreadcrumb = function(breadcrumb, maxBreadcrumbs) {
        var mergedBreadcrumb = _tslib.__assign({
          timestamp: _utils.dateTimestampInSeconds()
        }, breadcrumb);
        return this._breadcrumbs = void 0 !== maxBreadcrumbs && maxBreadcrumbs >= 0 ? _tslib.__spread(this._breadcrumbs, [ mergedBreadcrumb ]).slice(-maxBreadcrumbs) : _tslib.__spread(this._breadcrumbs, [ mergedBreadcrumb ]), 
        this._notifyScopeListeners(), this;
      }, Scope1.prototype.clearBreadcrumbs = function() {
        return this._breadcrumbs = [], this._notifyScopeListeners(), this;
      }, Scope1.prototype.applyToEvent = function(event, hint) {
        var _a;
        if (this._extra && Object.keys(this._extra).length && (event.extra = _tslib.__assign(_tslib.__assign({}, this._extra), event.extra)), 
        this._tags && Object.keys(this._tags).length && (event.tags = _tslib.__assign(_tslib.__assign({}, this._tags), event.tags)), 
        this._user && Object.keys(this._user).length && (event.user = _tslib.__assign(_tslib.__assign({}, this._user), event.user)), 
        this._contexts && Object.keys(this._contexts).length && (event.contexts = _tslib.__assign(_tslib.__assign({}, this._contexts), event.contexts)), 
        this._level && (event.level = this._level), this._transactionName && (event.transaction = this._transactionName), 
        this._span) {
          event.contexts = _tslib.__assign({
            trace: this._span.getTraceContext()
          }, event.contexts);
          var transactionName = null === (_a = this._span.transaction) || void 0 === _a ? void 0 : _a.name;
          transactionName && (event.tags = _tslib.__assign({
            transaction: transactionName
          }, event.tags));
        }
        return this._applyFingerprint(event), event.breadcrumbs = _tslib.__spread(event.breadcrumbs || [], this._breadcrumbs), 
        event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : void 0, this._notifyEventProcessors(_tslib.__spread(getGlobalEventProcessors(), this._eventProcessors), event, hint);
      }, Scope1.prototype._notifyEventProcessors = function(processors, event, hint, index) {
        var _this = this;
        return void 0 === index && (index = 0), new _utils.SyncPromise((function(resolve, reject) {
          var processor = processors[index];
          if (null === event || "function" != typeof processor) resolve(event); else {
            var result = processor(_tslib.__assign({}, event), hint);
            _utils.isThenable(result) ? result.then((function(final) {
              return _this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve);
            })).then(null, reject) : _this._notifyEventProcessors(processors, result, hint, index + 1).then(resolve).then(null, reject);
          }
        }));
      }, Scope1.prototype._notifyScopeListeners = function() {
        var _this = this;
        this._notifyingListeners || (this._notifyingListeners = !0, this._scopeListeners.forEach((function(callback) {
          callback(_this);
        })), this._notifyingListeners = !1);
      }, Scope1.prototype._applyFingerprint = function(event) {
        event.fingerprint = event.fingerprint ? Array.isArray(event.fingerprint) ? event.fingerprint : [ event.fingerprint ] : [], 
        this._fingerprint && (event.fingerprint = event.fingerprint.concat(this._fingerprint)), 
        event.fingerprint && !event.fingerprint.length && delete event.fingerprint;
      }, Scope1;
    }();
    function getGlobalEventProcessors() {
      var global = _utils.getGlobalObject();
      return global.__SENTRY__ = global.__SENTRY__ || {}, global.__SENTRY__.globalEventProcessors = global.__SENTRY__.globalEventProcessors || [], 
      global.__SENTRY__.globalEventProcessors;
    }
    function addGlobalEventProcessor(callback) {
      getGlobalEventProcessors().push(callback);
    }
  }, {
    tslib: "eEuCs",
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  gda2Z: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports);
    var _async = require("./async");
    parcelHelpers.exportAll(_async, exports);
    var _browser = require("./browser");
    parcelHelpers.exportAll(_browser, exports);
    var _dsn = require("./dsn");
    parcelHelpers.exportAll(_dsn, exports);
    var _error = require("./error");
    parcelHelpers.exportAll(_error, exports);
    var _instrument = require("./instrument");
    parcelHelpers.exportAll(_instrument, exports);
    var _is = require("./is");
    parcelHelpers.exportAll(_is, exports);
    var _logger = require("./logger");
    parcelHelpers.exportAll(_logger, exports);
    var _memo = require("./memo");
    parcelHelpers.exportAll(_memo, exports);
    var _misc = require("./misc");
    parcelHelpers.exportAll(_misc, exports);
    var _node = require("./node");
    parcelHelpers.exportAll(_node, exports);
    var _object = require("./object");
    parcelHelpers.exportAll(_object, exports);
    var _path = require("./path");
    parcelHelpers.exportAll(_path, exports);
    var _promisebuffer = require("./promisebuffer");
    parcelHelpers.exportAll(_promisebuffer, exports);
    var _stacktrace = require("./stacktrace");
    parcelHelpers.exportAll(_stacktrace, exports);
    var _string = require("./string");
    parcelHelpers.exportAll(_string, exports);
    var _supports = require("./supports");
    parcelHelpers.exportAll(_supports, exports);
    var _syncpromise = require("./syncpromise");
    parcelHelpers.exportAll(_syncpromise, exports);
    var _time = require("./time");
    parcelHelpers.exportAll(_time, exports);
  }, {
    "./async": "i0tCE",
    "./browser": "7gFyj",
    "./dsn": "jPZtA",
    "./error": "jJi6q",
    "./instrument": "9sZwj",
    "./is": "6j9uu",
    "./logger": "48ndf",
    "./memo": "2uqdD",
    "./misc": "carQl",
    "./node": "92YVC",
    "./object": "fGkWR",
    "./path": "bKuCh",
    "./promisebuffer": "jPEus",
    "./stacktrace": "7Zuak",
    "./string": "79LDE",
    "./supports": "k96De",
    "./syncpromise": "fJ5EH",
    "./time": "bSddU",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  i0tCE: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    function forget(promise) {
      promise.then(null, (function(e) {
        console.error(e);
      }));
    }
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "forget", (() => forget));
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "7gFyj": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "htmlTreeAsString", (() => htmlTreeAsString));
    var _is = require("./is");
    function htmlTreeAsString(elem) {
      try {
        for (var currentElem = elem, out = [], height = 0, len = 0, sepLength = " > ".length, nextStr = void 0; currentElem && height++ < 5 && !("html" === (nextStr = _htmlElementAsString(currentElem)) || height > 1 && len + out.length * sepLength + nextStr.length >= 80); ) out.push(nextStr), 
        len += nextStr.length, currentElem = currentElem.parentNode;
        return out.reverse().join(" > ");
      } catch (_oO) {
        return "<unknown>";
      }
    }
    function _htmlElementAsString(el) {
      var className, classes, key, attr, i, elem = el, out = [];
      if (!elem || !elem.tagName) return "";
      if (out.push(elem.tagName.toLowerCase()), elem.id && out.push("#" + elem.id), (className = elem.className) && _is.isString(className)) for (classes = className.split(/\s+/), 
      i = 0; i < classes.length; i++) out.push("." + classes[i]);
      var allowedAttrs = [ "type", "name", "title", "alt" ];
      for (i = 0; i < allowedAttrs.length; i++) key = allowedAttrs[i], (attr = elem.getAttribute(key)) && out.push("[" + key + '="' + attr + '"]');
      return out.join("");
    }
  }, {
    "./is": "6j9uu",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "6j9uu": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    function isError(wat) {
      switch (Object.prototype.toString.call(wat)) {
       case "[object Error]":
       case "[object Exception]":
       case "[object DOMException]":
        return !0;

       default:
        return isInstanceOf(wat, Error);
      }
    }
    function isErrorEvent(wat) {
      return "[object ErrorEvent]" === Object.prototype.toString.call(wat);
    }
    function isDOMError(wat) {
      return "[object DOMError]" === Object.prototype.toString.call(wat);
    }
    function isDOMException(wat) {
      return "[object DOMException]" === Object.prototype.toString.call(wat);
    }
    function isString(wat) {
      return "[object String]" === Object.prototype.toString.call(wat);
    }
    function isPrimitive(wat) {
      return null === wat || "object" != typeof wat && "function" != typeof wat;
    }
    function isPlainObject(wat) {
      return "[object Object]" === Object.prototype.toString.call(wat);
    }
    function isEvent(wat) {
      return "undefined" != typeof Event && isInstanceOf(wat, Event);
    }
    function isElement(wat) {
      return "undefined" != typeof Element && isInstanceOf(wat, Element);
    }
    function isRegExp(wat) {
      return "[object RegExp]" === Object.prototype.toString.call(wat);
    }
    function isThenable(wat) {
      return Boolean(wat && wat.then && "function" == typeof wat.then);
    }
    function isSyntheticEvent(wat) {
      return isPlainObject(wat) && "nativeEvent" in wat && "preventDefault" in wat && "stopPropagation" in wat;
    }
    function isInstanceOf(wat, base) {
      try {
        return wat instanceof base;
      } catch (_e) {
        return !1;
      }
    }
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "isError", (() => isError)), 
    parcelHelpers.export(exports, "isErrorEvent", (() => isErrorEvent)), parcelHelpers.export(exports, "isDOMError", (() => isDOMError)), 
    parcelHelpers.export(exports, "isDOMException", (() => isDOMException)), parcelHelpers.export(exports, "isString", (() => isString)), 
    parcelHelpers.export(exports, "isPrimitive", (() => isPrimitive)), parcelHelpers.export(exports, "isPlainObject", (() => isPlainObject)), 
    parcelHelpers.export(exports, "isEvent", (() => isEvent)), parcelHelpers.export(exports, "isElement", (() => isElement)), 
    parcelHelpers.export(exports, "isRegExp", (() => isRegExp)), parcelHelpers.export(exports, "isThenable", (() => isThenable)), 
    parcelHelpers.export(exports, "isSyntheticEvent", (() => isSyntheticEvent)), parcelHelpers.export(exports, "isInstanceOf", (() => isInstanceOf));
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  jPZtA: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Dsn", (() => Dsn));
    var _tslib = require("tslib"), _error = require("./error"), DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/, Dsn = function() {
      function Dsn1(from) {
        "string" == typeof from ? this._fromString(from) : this._fromComponents(from), this._validate();
      }
      return Dsn1.prototype.toString = function(withPassword) {
        void 0 === withPassword && (withPassword = !1);
        var _a = this, host = _a.host, path = _a.path, pass = _a.pass, port = _a.port, projectId = _a.projectId;
        return _a.protocol + "://" + _a.user + (withPassword && pass ? ":" + pass : "") + "@" + host + (port ? ":" + port : "") + "/" + (path ? path + "/" : path) + projectId;
      }, Dsn1.prototype._fromString = function(str) {
        var match = DSN_REGEX.exec(str);
        if (!match) throw new _error.SentryError("Invalid Dsn");
        var _a = _tslib.__read(match.slice(1), 6), protocol = _a[0], user = _a[1], _b = _a[2], pass = void 0 === _b ? "" : _b, host = _a[3], _c = _a[4], port = void 0 === _c ? "" : _c, path = "", projectId = _a[5], split = projectId.split("/");
        if (split.length > 1 && (path = split.slice(0, -1).join("/"), projectId = split.pop()), 
        projectId) {
          var projectMatch = projectId.match(/^\d+/);
          projectMatch && (projectId = projectMatch[0]);
        }
        this._fromComponents({
          host: host,
          pass: pass,
          path: path,
          projectId: projectId,
          port: port,
          protocol: protocol,
          user: user
        });
      }, Dsn1.prototype._fromComponents = function(components) {
        this.protocol = components.protocol, this.user = components.user, this.pass = components.pass || "", 
        this.host = components.host, this.port = components.port || "", this.path = components.path || "", 
        this.projectId = components.projectId;
      }, Dsn1.prototype._validate = function() {
        var _this = this;
        if ([ "protocol", "user", "host", "projectId" ].forEach((function(component) {
          if (!_this[component]) throw new _error.SentryError("Invalid Dsn: " + component + " missing");
        })), !this.projectId.match(/^\d+$/)) throw new _error.SentryError("Invalid Dsn: Invalid projectId " + this.projectId);
        if ("http" !== this.protocol && "https" !== this.protocol) throw new _error.SentryError("Invalid Dsn: Invalid protocol " + this.protocol);
        if (this.port && isNaN(parseInt(this.port, 10))) throw new _error.SentryError("Invalid Dsn: Invalid port " + this.port);
      }, Dsn1;
    }();
  }, {
    tslib: "eEuCs",
    "./error": "jJi6q",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  jJi6q: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "SentryError", (() => SentryError1));
    var _tslib = require("tslib"), _polyfill = require("./polyfill"), SentryError1 = function(_super) {
      function SentryError2(message) {
        var _newTarget = this.constructor, _this = _super.call(this, message) || this;
        return _this.message = message, _this.name = _newTarget.prototype.constructor.name, 
        _polyfill.setPrototypeOf(_this, _newTarget.prototype), _this;
      }
      return _tslib.__extends(SentryError2, _super), SentryError2;
    }(Error);
  }, {
    tslib: "eEuCs",
    "./polyfill": "1aXCC",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "1aXCC": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "setPrototypeOf", (() => setPrototypeOf));
    var setPrototypeOf = Object.setPrototypeOf || ({
      __proto__: []
    } instanceof Array ? function(obj, proto) {
      return obj.__proto__ = proto, obj;
    } : function(obj, proto) {
      for (var prop in proto) obj.hasOwnProperty(prop) || (obj[prop] = proto[prop]);
      return obj;
    });
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "9sZwj": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "addInstrumentationHandler", (() => addInstrumentationHandler));
    var lastHref, _tslib = require("tslib"), _is = require("./is"), _logger = require("./logger"), _misc = require("./misc"), _object = require("./object"), _stacktrace = require("./stacktrace"), _supports = require("./supports"), global = _misc.getGlobalObject(), handlers = {}, instrumented = {};
    function instrument(type) {
      if (!instrumented[type]) switch (instrumented[type] = !0, type) {
       case "console":
        !function() {
          if (!("console" in global)) return;
          [ "debug", "info", "warn", "error", "log", "assert" ].forEach((function(level) {
            level in global.console && _object.fill(global.console, level, (function(originalConsoleLevel) {
              return function() {
                for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                triggerHandlers("console", {
                  args: args,
                  level: level
                }), originalConsoleLevel && Function.prototype.apply.call(originalConsoleLevel, global.console, args);
              };
            }));
          }));
        }();
        break;

       case "dom":
        !function() {
          if (!("document" in global)) return;
          global.document.addEventListener("click", domEventHandler("click", triggerHandlers.bind(null, "dom")), !1), 
          global.document.addEventListener("keypress", keypressEventHandler(triggerHandlers.bind(null, "dom")), !1), 
          [ "EventTarget", "Node" ].forEach((function(target) {
            var proto = global[target] && global[target].prototype;
            proto && proto.hasOwnProperty && proto.hasOwnProperty("addEventListener") && (_object.fill(proto, "addEventListener", (function(original) {
              return function(eventName, fn, options) {
                return fn && fn.handleEvent ? ("click" === eventName && _object.fill(fn, "handleEvent", (function(innerOriginal) {
                  return function(event) {
                    return domEventHandler("click", triggerHandlers.bind(null, "dom"))(event), innerOriginal.call(this, event);
                  };
                })), "keypress" === eventName && _object.fill(fn, "handleEvent", (function(innerOriginal) {
                  return function(event) {
                    return keypressEventHandler(triggerHandlers.bind(null, "dom"))(event), innerOriginal.call(this, event);
                  };
                }))) : ("click" === eventName && domEventHandler("click", triggerHandlers.bind(null, "dom"), !0)(this), 
                "keypress" === eventName && keypressEventHandler(triggerHandlers.bind(null, "dom"))(this)), 
                original.call(this, eventName, fn, options);
              };
            })), _object.fill(proto, "removeEventListener", (function(original) {
              return function(eventName, fn, options) {
                try {
                  original.call(this, eventName, fn.__sentry_wrapped__, options);
                } catch (e) {}
                return original.call(this, eventName, fn, options);
              };
            })));
          }));
        }();
        break;

       case "xhr":
        !function() {
          if (!("XMLHttpRequest" in global)) return;
          var requestKeys = [], requestValues = [], xhrproto = XMLHttpRequest.prototype;
          _object.fill(xhrproto, "open", (function(originalOpen) {
            return function() {
              for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
              var xhr = this, url = args[1];
              xhr.__sentry_xhr__ = {
                method: _is.isString(args[0]) ? args[0].toUpperCase() : args[0],
                url: args[1]
              }, _is.isString(url) && "POST" === xhr.__sentry_xhr__.method && url.match(/sentry_key/) && (xhr.__sentry_own_request__ = !0);
              var onreadystatechangeHandler = function() {
                if (4 === xhr.readyState) {
                  try {
                    xhr.__sentry_xhr__ && (xhr.__sentry_xhr__.status_code = xhr.status);
                  } catch (e) {}
                  try {
                    var requestPos = requestKeys.indexOf(xhr);
                    if (-1 !== requestPos) {
                      requestKeys.splice(requestPos);
                      var args_1 = requestValues.splice(requestPos)[0];
                      xhr.__sentry_xhr__ && void 0 !== args_1[0] && (xhr.__sentry_xhr__.body = args_1[0]);
                    }
                  } catch (e) {}
                  triggerHandlers("xhr", {
                    args: args,
                    endTimestamp: Date.now(),
                    startTimestamp: Date.now(),
                    xhr: xhr
                  });
                }
              };
              return "onreadystatechange" in xhr && "function" == typeof xhr.onreadystatechange ? _object.fill(xhr, "onreadystatechange", (function(original) {
                return function() {
                  for (var readyStateArgs = [], _i1 = 0; _i1 < arguments.length; _i1++) readyStateArgs[_i1] = arguments[_i1];
                  return onreadystatechangeHandler(), original.apply(xhr, readyStateArgs);
                };
              })) : xhr.addEventListener("readystatechange", onreadystatechangeHandler), originalOpen.apply(xhr, args);
            };
          })), _object.fill(xhrproto, "send", (function(originalSend) {
            return function() {
              for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
              return requestKeys.push(this), requestValues.push(args), triggerHandlers("xhr", {
                args: args,
                startTimestamp: Date.now(),
                xhr: this
              }), originalSend.apply(this, args);
            };
          }));
        }();
        break;

       case "fetch":
        !function() {
          if (!_supports.supportsNativeFetch()) return;
          _object.fill(global, "fetch", (function(originalFetch) {
            return function() {
              for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
              var handlerData = {
                args: args,
                fetchData: {
                  method: getFetchMethod(args),
                  url: getFetchUrl(args)
                },
                startTimestamp: Date.now()
              };
              return triggerHandlers("fetch", _tslib.__assign({}, handlerData)), originalFetch.apply(global, args).then((function(response) {
                return triggerHandlers("fetch", _tslib.__assign(_tslib.__assign({}, handlerData), {
                  endTimestamp: Date.now(),
                  response: response
                })), response;
              }), (function(error) {
                throw triggerHandlers("fetch", _tslib.__assign(_tslib.__assign({}, handlerData), {
                  endTimestamp: Date.now(),
                  error: error
                })), error;
              }));
            };
          }));
        }();
        break;

       case "history":
        !function() {
          if (!_supports.supportsHistory()) return;
          var oldOnPopState = global.onpopstate;
          function historyReplacementFunction(originalHistoryFunction) {
            return function() {
              for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
              var url = args.length > 2 ? args[2] : void 0;
              if (url) {
                var from = lastHref, to = String(url);
                lastHref = to, triggerHandlers("history", {
                  from: from,
                  to: to
                });
              }
              return originalHistoryFunction.apply(this, args);
            };
          }
          global.onpopstate = function() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            var to = global.location.href, from = lastHref;
            if (lastHref = to, triggerHandlers("history", {
              from: from,
              to: to
            }), oldOnPopState) return oldOnPopState.apply(this, args);
          }, _object.fill(global.history, "pushState", historyReplacementFunction), _object.fill(global.history, "replaceState", historyReplacementFunction);
        }();
        break;

       case "error":
        _oldOnErrorHandler = global.onerror, global.onerror = function(msg, url, line, column, error) {
          return triggerHandlers("error", {
            column: column,
            error: error,
            line: line,
            msg: msg,
            url: url
          }), !!_oldOnErrorHandler && _oldOnErrorHandler.apply(this, arguments);
        };
        break;

       case "unhandledrejection":
        _oldOnUnhandledRejectionHandler = global.onunhandledrejection, global.onunhandledrejection = function(e) {
          return triggerHandlers("unhandledrejection", e), !_oldOnUnhandledRejectionHandler || _oldOnUnhandledRejectionHandler.apply(this, arguments);
        };
        break;

       default:
        _logger.logger.warn("unknown instrumentation type:", type);
      }
    }
    function addInstrumentationHandler(handler) {
      handler && "string" == typeof handler.type && "function" == typeof handler.callback && (handlers[handler.type] = handlers[handler.type] || [], 
      handlers[handler.type].push(handler.callback), instrument(handler.type));
    }
    function triggerHandlers(type, data) {
      var e_1, _a;
      if (type && handlers[type]) try {
        for (var _b = _tslib.__values(handlers[type] || []), _c = _b.next(); !_c.done; _c = _b.next()) {
          var handler = _c.value;
          try {
            handler(data);
          } catch (e) {
            _logger.logger.error("Error while triggering instrumentation handler.\nType: " + type + "\nName: " + _stacktrace.getFunctionName(handler) + "\nError: " + e);
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          _c && !_c.done && (_a = _b.return) && _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }
    function getFetchMethod(fetchArgs) {
      return void 0 === fetchArgs && (fetchArgs = []), "Request" in global && _is.isInstanceOf(fetchArgs[0], Request) && fetchArgs[0].method ? String(fetchArgs[0].method).toUpperCase() : fetchArgs[1] && fetchArgs[1].method ? String(fetchArgs[1].method).toUpperCase() : "GET";
    }
    function getFetchUrl(fetchArgs) {
      return void 0 === fetchArgs && (fetchArgs = []), "string" == typeof fetchArgs[0] ? fetchArgs[0] : "Request" in global && _is.isInstanceOf(fetchArgs[0], Request) ? fetchArgs[0].url : String(fetchArgs[0]);
    }
    var keypressTimeout, lastCapturedEvent, debounceTimer = 0;
    function domEventHandler(name, handler, debounce) {
      return void 0 === debounce && (debounce = !1), function(event) {
        keypressTimeout = void 0, event && lastCapturedEvent !== event && (lastCapturedEvent = event, 
        debounceTimer && clearTimeout(debounceTimer), debounce ? debounceTimer = setTimeout((function() {
          handler({
            event: event,
            name: name
          });
        })) : handler({
          event: event,
          name: name
        }));
      };
    }
    function keypressEventHandler(handler) {
      return function(event) {
        var target;
        try {
          target = event.target;
        } catch (e) {
          return;
        }
        var tagName = target && target.tagName;
        tagName && ("INPUT" === tagName || "TEXTAREA" === tagName || target.isContentEditable) && (keypressTimeout || domEventHandler("input", handler)(event), 
        clearTimeout(keypressTimeout), keypressTimeout = setTimeout((function() {
          keypressTimeout = void 0;
        }), 1e3));
      };
    }
    var _oldOnErrorHandler = null;
    var _oldOnUnhandledRejectionHandler = null;
  }, {
    tslib: "eEuCs",
    "./is": "6j9uu",
    "./logger": "48ndf",
    "./misc": "carQl",
    "./object": "fGkWR",
    "./stacktrace": "7Zuak",
    "./supports": "k96De",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "48ndf": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "logger", (() => logger));
    var _misc = require("./misc"), global = _misc.getGlobalObject(), PREFIX = "Sentry Logger ", Logger = function() {
      function Logger1() {
        this._enabled = !1;
      }
      return Logger1.prototype.disable = function() {
        this._enabled = !1;
      }, Logger1.prototype.enable = function() {
        this._enabled = !0;
      }, Logger1.prototype.log = function() {
        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        this._enabled && _misc.consoleSandbox((function() {
          global.console.log(PREFIX + "[Log]: " + args.join(" "));
        }));
      }, Logger1.prototype.warn = function() {
        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        this._enabled && _misc.consoleSandbox((function() {
          global.console.warn(PREFIX + "[Warn]: " + args.join(" "));
        }));
      }, Logger1.prototype.error = function() {
        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        this._enabled && _misc.consoleSandbox((function() {
          global.console.error(PREFIX + "[Error]: " + args.join(" "));
        }));
      }, Logger1;
    }();
    global.__SENTRY__ = global.__SENTRY__ || {};
    var logger = global.__SENTRY__.logger || (global.__SENTRY__.logger = new Logger);
  }, {
    "./misc": "carQl",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  carQl: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "getGlobalObject", (() => getGlobalObject)), 
    parcelHelpers.export(exports, "uuid4", (() => uuid4)), parcelHelpers.export(exports, "parseUrl", (() => parseUrl)), 
    parcelHelpers.export(exports, "getEventDescription", (() => getEventDescription)), 
    parcelHelpers.export(exports, "consoleSandbox", (() => consoleSandbox)), parcelHelpers.export(exports, "addExceptionTypeValue", (() => addExceptionTypeValue)), 
    parcelHelpers.export(exports, "addExceptionMechanism", (() => addExceptionMechanism)), 
    parcelHelpers.export(exports, "getLocationHref", (() => getLocationHref)), parcelHelpers.export(exports, "parseSemver", (() => parseSemver)), 
    parcelHelpers.export(exports, "parseRetryAfterHeader", (() => parseRetryAfterHeader)), 
    parcelHelpers.export(exports, "addContextToFrame", (() => addContextToFrame)), parcelHelpers.export(exports, "stripUrlQueryAndFragment", (() => stripUrlQueryAndFragment));
    var _node = require("./node"), _string = require("./string"), global = arguments[3], fallbackGlobalObject = {};
    function getGlobalObject() {
      return _node.isNodeEnv() ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : fallbackGlobalObject;
    }
    function uuid4() {
      var global1 = getGlobalObject(), crypto = global1.crypto || global1.msCrypto;
      if (void 0 !== crypto && crypto.getRandomValues) {
        var arr = new Uint16Array(8);
        crypto.getRandomValues(arr), arr[3] = 4095 & arr[3] | 16384, arr[4] = 16383 & arr[4] | 32768;
        var pad = function(num) {
          for (var v = num.toString(16); v.length < 4; ) v = "0" + v;
          return v;
        };
        return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
      }
      return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (function(c) {
        var r = 16 * Math.random() | 0;
        return ("x" === c ? r : 3 & r | 8).toString(16);
      }));
    }
    function parseUrl(url) {
      if (!url) return {};
      var match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
      if (!match) return {};
      var query = match[6] || "", fragment = match[8] || "";
      return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        relative: match[5] + query + fragment
      };
    }
    function getEventDescription(event) {
      if (event.message) return event.message;
      if (event.exception && event.exception.values && event.exception.values[0]) {
        var exception = event.exception.values[0];
        return exception.type && exception.value ? exception.type + ": " + exception.value : exception.type || exception.value || event.event_id || "<unknown>";
      }
      return event.event_id || "<unknown>";
    }
    function consoleSandbox(callback) {
      var global1 = getGlobalObject();
      if (!("console" in global1)) return callback();
      var originalConsole = global1.console, wrappedLevels = {};
      [ "debug", "info", "warn", "error", "log", "assert" ].forEach((function(level) {
        level in global1.console && originalConsole[level].__sentry_original__ && (wrappedLevels[level] = originalConsole[level], 
        originalConsole[level] = originalConsole[level].__sentry_original__);
      }));
      var result = callback();
      return Object.keys(wrappedLevels).forEach((function(level) {
        originalConsole[level] = wrappedLevels[level];
      })), result;
    }
    function addExceptionTypeValue(event, value, type) {
      event.exception = event.exception || {}, event.exception.values = event.exception.values || [], 
      event.exception.values[0] = event.exception.values[0] || {}, event.exception.values[0].value = event.exception.values[0].value || value || "", 
      event.exception.values[0].type = event.exception.values[0].type || type || "Error";
    }
    function addExceptionMechanism(event, mechanism) {
      void 0 === mechanism && (mechanism = {});
      try {
        event.exception.values[0].mechanism = event.exception.values[0].mechanism || {}, 
        Object.keys(mechanism).forEach((function(key) {
          event.exception.values[0].mechanism[key] = mechanism[key];
        }));
      } catch (_oO) {}
    }
    function getLocationHref() {
      try {
        return document.location.href;
      } catch (oO) {
        return "";
      }
    }
    var SEMVER_REGEXP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    function parseSemver(input) {
      var match = input.match(SEMVER_REGEXP) || [], major = parseInt(match[1], 10), minor = parseInt(match[2], 10), patch = parseInt(match[3], 10);
      return {
        buildmetadata: match[5],
        major: isNaN(major) ? void 0 : major,
        minor: isNaN(minor) ? void 0 : minor,
        patch: isNaN(patch) ? void 0 : patch,
        prerelease: match[4]
      };
    }
    var defaultRetryAfter = 6e4;
    function parseRetryAfterHeader(now, header) {
      if (!header) return defaultRetryAfter;
      var headerDelay = parseInt("" + header, 10);
      if (!isNaN(headerDelay)) return 1e3 * headerDelay;
      var headerDate = Date.parse("" + header);
      return isNaN(headerDate) ? defaultRetryAfter : headerDate - now;
    }
    function addContextToFrame(lines, frame, linesOfContext) {
      void 0 === linesOfContext && (linesOfContext = 5);
      var lineno = frame.lineno || 0, maxLines = lines.length, sourceLine = Math.max(Math.min(maxLines, lineno - 1), 0);
      frame.pre_context = lines.slice(Math.max(0, sourceLine - linesOfContext), sourceLine).map((function(line) {
        return _string.snipLine(line, 0);
      })), frame.context_line = _string.snipLine(lines[Math.min(maxLines - 1, sourceLine)], frame.colno || 0), 
      frame.post_context = lines.slice(Math.min(sourceLine + 1, maxLines), sourceLine + 1 + linesOfContext).map((function(line) {
        return _string.snipLine(line, 0);
      }));
    }
    function stripUrlQueryAndFragment(urlPath) {
      return urlPath.split(/[\?#]/, 1)[0];
    }
  }, {
    "./node": "92YVC",
    "./string": "79LDE",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "92YVC": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "isNodeEnv", (() => isNodeEnv)), 
    parcelHelpers.export(exports, "dynamicRequire", (() => dynamicRequire)), parcelHelpers.export(exports, "extractNodeRequestData", (() => extractNodeRequestData));
    var _is = require("./is"), _object = require("./object"), process = require("process");
    function isNodeEnv() {
      return "[object process]" === Object.prototype.toString.call(void 0 !== process ? process : 0);
    }
    function dynamicRequire(mod, request) {
      return mod.require(request);
    }
    var DEFAULT_REQUEST_KEYS = [ "cookies", "data", "headers", "method", "query_string", "url" ];
    function extractNodeRequestData(req, keys) {
      if (void 0 === keys && (keys = DEFAULT_REQUEST_KEYS), !isNodeEnv()) throw new Error("Can't get node request data outside of a node environment");
      var requestData = {}, headers = req.headers || req.header || {}, method = req.method, host = req.hostname || req.host || headers.host || "<no host>", protocol = "https" === req.protocol || req.secure || (req.socket || {}).encrypted ? "https" : "http", originalUrl = req.originalUrl || req.url || "", absoluteUrl = protocol + "://" + host + originalUrl;
      return keys.forEach((function(key) {
        switch (key) {
         case "headers":
          requestData.headers = headers;
          break;

         case "method":
          requestData.method = method;
          break;

         case "url":
          requestData.url = absoluteUrl;
          break;

         case "cookies":
          requestData.cookies = req.cookies || dynamicRequire(module, "cookie").parse(headers.cookie || "");
          break;

         case "query_string":
          requestData.query_string = dynamicRequire(module, "url").parse(originalUrl || "", !1).query;
          break;

         case "data":
          if ("GET" === method || "HEAD" === method) break;
          void 0 !== req.body && (requestData.data = _is.isString(req.body) ? req.body : JSON.stringify(_object.normalize(req.body)));
          break;

         default:
          ({}).hasOwnProperty.call(req, key) && (requestData[key] = req[key]);
        }
      })), requestData;
    }
  }, {
    process: "3spER",
    "./is": "6j9uu",
    "./object": "fGkWR",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "3spER": [ function(require, module, exports) {
    var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
      setTimeout(fun, 0);
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e1) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    !function() {
      try {
        cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    }();
    var currentQueue, queue = [], draining = !1, queueIndex = -1;
    function cleanUpNextTick() {
      draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
      queue.length && drainQueue());
    }
    function drainQueue() {
      if (!draining) {
        var timeout = runTimeout(cleanUpNextTick);
        draining = !0;
        for (var len = queue.length; len; ) {
          for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
          queueIndex = -1, len = queue.length;
        }
        currentQueue = null, draining = !1, function(marker) {
          if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
          clearTimeout(marker);
          try {
            cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e1) {
              return cachedClearTimeout.call(this, marker);
            }
          }
        }(timeout);
      }
    }
    function Item(fun, array) {
      this.fun = fun, this.array = array;
    }
    function noop() {}
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
      queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
    }, Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
    process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, 
    process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
    process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, 
    process.listeners = function(name) {
      return [];
    }, process.binding = function(name) {
      throw new Error("process.binding is not supported");
    }, process.cwd = function() {
      return "/";
    }, process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    }, process.umask = function() {
      return 0;
    };
  }, {} ],
  fGkWR: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "fill", (() => fill)), 
    parcelHelpers.export(exports, "urlEncode", (() => urlEncode)), parcelHelpers.export(exports, "normalizeToSize", (() => normalizeToSize)), 
    parcelHelpers.export(exports, "walk", (() => walk)), parcelHelpers.export(exports, "normalize", (() => normalize)), 
    parcelHelpers.export(exports, "extractExceptionKeysForMessage", (() => extractExceptionKeysForMessage)), 
    parcelHelpers.export(exports, "dropUndefinedKeys", (() => dropUndefinedKeys));
    var _tslib = require("tslib"), _browser = require("./browser"), _is = require("./is"), _memo = require("./memo"), _stacktrace = require("./stacktrace"), _string = require("./string"), global = arguments[3];
    function fill(source, name, replacementFactory) {
      if (name in source) {
        var original = source[name], wrapped = replacementFactory(original);
        if ("function" == typeof wrapped) try {
          wrapped.prototype = wrapped.prototype || {}, Object.defineProperties(wrapped, {
            __sentry_original__: {
              enumerable: !1,
              value: original
            }
          });
        } catch (_Oo) {}
        source[name] = wrapped;
      }
    }
    function urlEncode(object) {
      return Object.keys(object).map((function(key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
      })).join("&");
    }
    function getWalkSource(value) {
      if (_is.isError(value)) {
        var error = value, err = {
          message: error.message,
          name: error.name,
          stack: error.stack
        };
        for (var i in error) Object.prototype.hasOwnProperty.call(error, i) && (err[i] = error[i]);
        return err;
      }
      if (_is.isEvent(value)) {
        var event_1 = value, source = {};
        source.type = event_1.type;
        try {
          source.target = _is.isElement(event_1.target) ? _browser.htmlTreeAsString(event_1.target) : Object.prototype.toString.call(event_1.target);
        } catch (_oO) {
          source.target = "<unknown>";
        }
        try {
          source.currentTarget = _is.isElement(event_1.currentTarget) ? _browser.htmlTreeAsString(event_1.currentTarget) : Object.prototype.toString.call(event_1.currentTarget);
        } catch (_oO) {
          source.currentTarget = "<unknown>";
        }
        for (var i in "undefined" != typeof CustomEvent && _is.isInstanceOf(value, CustomEvent) && (source.detail = event_1.detail), 
        event_1) Object.prototype.hasOwnProperty.call(event_1, i) && (source[i] = event_1);
        return source;
      }
      return value;
    }
    function utf8Length(value) {
      return ~-encodeURI(value).split(/%..|./).length;
    }
    function jsonSize(value) {
      return utf8Length(JSON.stringify(value));
    }
    function normalizeToSize(object, depth, maxSize) {
      void 0 === depth && (depth = 3), void 0 === maxSize && (maxSize = 102400);
      var serialized = normalize(object, depth);
      return jsonSize(serialized) > maxSize ? normalizeToSize(object, depth - 1, maxSize) : serialized;
    }
    function serializeValue(value) {
      var type = Object.prototype.toString.call(value);
      if ("string" == typeof value) return value;
      if ("[object Object]" === type) return "[Object]";
      if ("[object Array]" === type) return "[Array]";
      var normalized = normalizeValue(value);
      return _is.isPrimitive(normalized) ? normalized : type;
    }
    function normalizeValue(value, key) {
      return "domain" === key && value && "object" == typeof value && value._events ? "[Domain]" : "domainEmitter" === key ? "[DomainEmitter]" : void 0 !== global && value === global ? "[Global]" : "undefined" != typeof window && value === window ? "[Window]" : "undefined" != typeof document && value === document ? "[Document]" : _is.isSyntheticEvent(value) ? "[SyntheticEvent]" : "number" == typeof value && value != value ? "[NaN]" : void 0 === value ? "[undefined]" : "function" == typeof value ? "[Function: " + _stacktrace.getFunctionName(value) + "]" : "symbol" == typeof value ? "[" + String(value) + "]" : "bigint" == typeof value ? "[BigInt: " + String(value) + "]" : value;
    }
    function walk(key, value, depth, memo) {
      if (void 0 === depth && (depth = 1 / 0), void 0 === memo && (memo = new _memo.Memo), 
      0 === depth) return serializeValue(value);
      if (null != value && "function" == typeof value.toJSON) return value.toJSON();
      var normalized = normalizeValue(value, key);
      if (_is.isPrimitive(normalized)) return normalized;
      var source = getWalkSource(value), acc = Array.isArray(value) ? [] : {};
      if (memo.memoize(value)) return "[Circular ~]";
      for (var innerKey in source) Object.prototype.hasOwnProperty.call(source, innerKey) && (acc[innerKey] = walk(innerKey, source[innerKey], depth - 1, memo));
      return memo.unmemoize(value), acc;
    }
    function normalize(input, depth) {
      try {
        return JSON.parse(JSON.stringify(input, (function(key, value) {
          return walk(key, value, depth);
        })));
      } catch (_oO) {
        return "**non-serializable**";
      }
    }
    function extractExceptionKeysForMessage(exception, maxLength) {
      void 0 === maxLength && (maxLength = 40);
      var keys = Object.keys(getWalkSource(exception));
      if (keys.sort(), !keys.length) return "[object has no keys]";
      if (keys[0].length >= maxLength) return _string.truncate(keys[0], maxLength);
      for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
        var serialized = keys.slice(0, includedKeys).join(", ");
        if (!(serialized.length > maxLength)) return includedKeys === keys.length ? serialized : _string.truncate(serialized, maxLength);
      }
      return "";
    }
    function dropUndefinedKeys(val) {
      var e_1, _a;
      if (_is.isPlainObject(val)) {
        var obj = val, rv = {};
        try {
          for (var _b = _tslib.__values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            void 0 !== obj[key] && (rv[key] = dropUndefinedKeys(obj[key]));
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            _c && !_c.done && (_a = _b.return) && _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        return rv;
      }
      return Array.isArray(val) ? val.map(dropUndefinedKeys) : val;
    }
  }, {
    tslib: "eEuCs",
    "./browser": "7gFyj",
    "./is": "6j9uu",
    "./memo": "2uqdD",
    "./stacktrace": "7Zuak",
    "./string": "79LDE",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "2uqdD": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Memo", (() => Memo));
    var Memo = function() {
      function Memo1() {
        this._hasWeakSet = "function" == typeof WeakSet, this._inner = this._hasWeakSet ? new WeakSet : [];
      }
      return Memo1.prototype.memoize = function(obj) {
        if (this._hasWeakSet) return !!this._inner.has(obj) || (this._inner.add(obj), !1);
        for (var i = 0; i < this._inner.length; i++) {
          if (this._inner[i] === obj) return !0;
        }
        return this._inner.push(obj), !1;
      }, Memo1.prototype.unmemoize = function(obj) {
        if (this._hasWeakSet) this._inner.delete(obj); else for (var i = 0; i < this._inner.length; i++) if (this._inner[i] === obj) {
          this._inner.splice(i, 1);
          break;
        }
      }, Memo1;
    }();
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "7Zuak": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "getFunctionName", (() => getFunctionName));
    function getFunctionName(fn) {
      try {
        return fn && "function" == typeof fn && fn.name || "<anonymous>";
      } catch (e) {
        return "<anonymous>";
      }
    }
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "79LDE": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "truncate", (() => truncate)), 
    parcelHelpers.export(exports, "snipLine", (() => snipLine)), parcelHelpers.export(exports, "safeJoin", (() => safeJoin)), 
    parcelHelpers.export(exports, "isMatchingPattern", (() => isMatchingPattern));
    var _is = require("./is");
    function truncate(str, max) {
      return void 0 === max && (max = 0), "string" != typeof str || 0 === max || str.length <= max ? str : str.substr(0, max) + "...";
    }
    function snipLine(line, colno) {
      var newLine = line, ll = newLine.length;
      if (ll <= 150) return newLine;
      colno > ll && (colno = ll);
      var start = Math.max(colno - 60, 0);
      start < 5 && (start = 0);
      var end = Math.min(start + 140, ll);
      return end > ll - 5 && (end = ll), end === ll && (start = Math.max(end - 140, 0)), 
      newLine = newLine.slice(start, end), start > 0 && (newLine = "'{snip} " + newLine), 
      end < ll && (newLine += " {snip}"), newLine;
    }
    function safeJoin(input, delimiter) {
      if (!Array.isArray(input)) return "";
      for (var output = [], i = 0; i < input.length; i++) {
        var value = input[i];
        try {
          output.push(String(value));
        } catch (e) {
          output.push("[value cannot be serialized]");
        }
      }
      return output.join(delimiter);
    }
    function isMatchingPattern(value, pattern) {
      return !!_is.isString(value) && (_is.isRegExp(pattern) ? pattern.test(value) : "string" == typeof pattern && -1 !== value.indexOf(pattern));
    }
  }, {
    "./is": "6j9uu",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  k96De: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "supportsErrorEvent", (() => supportsErrorEvent)), 
    parcelHelpers.export(exports, "supportsDOMError", (() => supportsDOMError)), parcelHelpers.export(exports, "supportsDOMException", (() => supportsDOMException)), 
    parcelHelpers.export(exports, "supportsFetch", (() => supportsFetch)), parcelHelpers.export(exports, "supportsNativeFetch", (() => supportsNativeFetch)), 
    parcelHelpers.export(exports, "supportsReportingObserver", (() => supportsReportingObserver)), 
    parcelHelpers.export(exports, "supportsReferrerPolicy", (() => supportsReferrerPolicy)), 
    parcelHelpers.export(exports, "supportsHistory", (() => supportsHistory));
    var _logger = require("./logger"), _misc = require("./misc");
    function supportsErrorEvent() {
      try {
        return new ErrorEvent(""), !0;
      } catch (e) {
        return !1;
      }
    }
    function supportsDOMError() {
      try {
        return new DOMError(""), !0;
      } catch (e) {
        return !1;
      }
    }
    function supportsDOMException() {
      try {
        return new DOMException(""), !0;
      } catch (e) {
        return !1;
      }
    }
    function supportsFetch() {
      if (!("fetch" in _misc.getGlobalObject())) return !1;
      try {
        return new Headers, new Request(""), new Response, !0;
      } catch (e) {
        return !1;
      }
    }
    function isNativeFetch(func) {
      return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
    }
    function supportsNativeFetch() {
      if (!supportsFetch()) return !1;
      var global = _misc.getGlobalObject();
      if (isNativeFetch(global.fetch)) return !0;
      var result = !1, doc = global.document;
      if (doc && "function" == typeof doc.createElement) try {
        var sandbox = doc.createElement("iframe");
        sandbox.hidden = !0, doc.head.appendChild(sandbox), sandbox.contentWindow && sandbox.contentWindow.fetch && (result = isNativeFetch(sandbox.contentWindow.fetch)), 
        doc.head.removeChild(sandbox);
      } catch (err) {
        _logger.logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", err);
      }
      return result;
    }
    function supportsReportingObserver() {
      return "ReportingObserver" in _misc.getGlobalObject();
    }
    function supportsReferrerPolicy() {
      if (!supportsFetch()) return !1;
      try {
        return new Request("_", {
          referrerPolicy: "origin"
        }), !0;
      } catch (e) {
        return !1;
      }
    }
    function supportsHistory() {
      var global = _misc.getGlobalObject(), chrome = global.chrome, isChromePackagedApp = chrome && chrome.app && chrome.app.runtime, hasHistoryApi = "history" in global && !!global.history.pushState && !!global.history.replaceState;
      return !isChromePackagedApp && hasHistoryApi;
    }
  }, {
    "./logger": "48ndf",
    "./misc": "carQl",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  bKuCh: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    function normalizeArray(parts, allowAboveRoot) {
      for (var up = 0, i = parts.length - 1; i >= 0; i--) {
        var last = parts[i];
        "." === last ? parts.splice(i, 1) : ".." === last ? (parts.splice(i, 1), up++) : up && (parts.splice(i, 1), 
        up--);
      }
      if (allowAboveRoot) for (;up--; ) parts.unshift("..");
      return parts;
    }
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "resolve", (() => resolve)), 
    parcelHelpers.export(exports, "relative", (() => relative)), parcelHelpers.export(exports, "normalizePath", (() => normalizePath)), 
    parcelHelpers.export(exports, "isAbsolute", (() => isAbsolute)), parcelHelpers.export(exports, "join", (() => join)), 
    parcelHelpers.export(exports, "dirname", (() => dirname)), parcelHelpers.export(exports, "basename", (() => basename));
    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/;
    function splitPath(filename) {
      var parts = splitPathRe.exec(filename);
      return parts ? parts.slice(1) : [];
    }
    function resolve() {
      for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
      for (var resolvedPath = "", resolvedAbsolute = !1, i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? args[i] : "/";
        path && (resolvedPath = path + "/" + resolvedPath, resolvedAbsolute = "/" === path.charAt(0));
      }
      return (resolvedAbsolute ? "/" : "") + (resolvedPath = normalizeArray(resolvedPath.split("/").filter((function(p) {
        return !!p;
      })), !resolvedAbsolute).join("/")) || ".";
    }
    function trim(arr) {
      for (var start = 0; start < arr.length && "" === arr[start]; start++) ;
      for (var end = arr.length - 1; end >= 0 && "" === arr[end]; end--) ;
      return start > end ? [] : arr.slice(start, end - start + 1);
    }
    function relative(from, to) {
      from = resolve(from).substr(1), to = resolve(to).substr(1);
      for (var fromParts = trim(from.split("/")), toParts = trim(to.split("/")), length = Math.min(fromParts.length, toParts.length), samePartsLength = length, i = 0; i < length; i++) if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
      var outputParts = [];
      for (i = samePartsLength; i < fromParts.length; i++) outputParts.push("..");
      return (outputParts = outputParts.concat(toParts.slice(samePartsLength))).join("/");
    }
    function normalizePath(path) {
      var isPathAbsolute = isAbsolute(path), trailingSlash = "/" === path.substr(-1), normalizedPath = normalizeArray(path.split("/").filter((function(p) {
        return !!p;
      })), !isPathAbsolute).join("/");
      return normalizedPath || isPathAbsolute || (normalizedPath = "."), normalizedPath && trailingSlash && (normalizedPath += "/"), 
      (isPathAbsolute ? "/" : "") + normalizedPath;
    }
    function isAbsolute(path) {
      return "/" === path.charAt(0);
    }
    function join() {
      for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
      return normalizePath(args.join("/"));
    }
    function dirname(path) {
      var result = splitPath(path), root = result[0], dir = result[1];
      return root || dir ? (dir && (dir = dir.substr(0, dir.length - 1)), root + dir) : ".";
    }
    function basename(path, ext) {
      var f = splitPath(path)[2];
      return ext && f.substr(-1 * ext.length) === ext && (f = f.substr(0, f.length - ext.length)), 
      f;
    }
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  jPEus: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "PromiseBuffer", (() => PromiseBuffer));
    var _error = require("./error"), _syncpromise = require("./syncpromise"), PromiseBuffer = function() {
      function PromiseBuffer1(_limit) {
        this._limit = _limit, this._buffer = [];
      }
      return PromiseBuffer1.prototype.isReady = function() {
        return void 0 === this._limit || this.length() < this._limit;
      }, PromiseBuffer1.prototype.add = function(task) {
        var _this = this;
        return this.isReady() ? (-1 === this._buffer.indexOf(task) && this._buffer.push(task), 
        task.then((function() {
          return _this.remove(task);
        })).then(null, (function() {
          return _this.remove(task).then(null, (function() {}));
        })), task) : _syncpromise.SyncPromise.reject(new _error.SentryError("Not adding Promise due to buffer limit reached."));
      }, PromiseBuffer1.prototype.remove = function(task) {
        return this._buffer.splice(this._buffer.indexOf(task), 1)[0];
      }, PromiseBuffer1.prototype.length = function() {
        return this._buffer.length;
      }, PromiseBuffer1.prototype.drain = function(timeout) {
        var _this = this;
        return new _syncpromise.SyncPromise((function(resolve) {
          var capturedSetTimeout = setTimeout((function() {
            timeout && timeout > 0 && resolve(!1);
          }), timeout);
          _syncpromise.SyncPromise.all(_this._buffer).then((function() {
            clearTimeout(capturedSetTimeout), resolve(!0);
          })).then(null, (function() {
            resolve(!0);
          }));
        }));
      }, PromiseBuffer1;
    }();
  }, {
    "./error": "jJi6q",
    "./syncpromise": "fJ5EH",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  fJ5EH: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "SyncPromise", (() => SyncPromise));
    var States, States1, _is = require("./is");
    (States1 = States || (States = {})).PENDING = "PENDING", States1.RESOLVED = "RESOLVED", 
    States1.REJECTED = "REJECTED";
    var SyncPromise = function() {
      function SyncPromise1(executor) {
        var _this = this;
        this._state = States.PENDING, this._handlers = [], this._resolve = function(value) {
          _this._setResult(States.RESOLVED, value);
        }, this._reject = function(reason) {
          _this._setResult(States.REJECTED, reason);
        }, this._setResult = function(state, value) {
          _this._state === States.PENDING && (_is.isThenable(value) ? value.then(_this._resolve, _this._reject) : (_this._state = state, 
          _this._value = value, _this._executeHandlers()));
        }, this._attachHandler = function(handler) {
          _this._handlers = _this._handlers.concat(handler), _this._executeHandlers();
        }, this._executeHandlers = function() {
          if (_this._state !== States.PENDING) {
            var cachedHandlers = _this._handlers.slice();
            _this._handlers = [], cachedHandlers.forEach((function(handler) {
              handler.done || (_this._state === States.RESOLVED && handler.onfulfilled && handler.onfulfilled(_this._value), 
              _this._state === States.REJECTED && handler.onrejected && handler.onrejected(_this._value), 
              handler.done = !0);
            }));
          }
        };
        try {
          executor(this._resolve, this._reject);
        } catch (e) {
          this._reject(e);
        }
      }
      return SyncPromise1.resolve = function(value) {
        return new SyncPromise1((function(resolve) {
          resolve(value);
        }));
      }, SyncPromise1.reject = function(reason) {
        return new SyncPromise1((function(_, reject) {
          reject(reason);
        }));
      }, SyncPromise1.all = function(collection) {
        return new SyncPromise1((function(resolve, reject) {
          if (Array.isArray(collection)) if (0 !== collection.length) {
            var counter = collection.length, resolvedCollection = [];
            collection.forEach((function(item, index) {
              SyncPromise1.resolve(item).then((function(value) {
                resolvedCollection[index] = value, 0 === (counter -= 1) && resolve(resolvedCollection);
              })).then(null, reject);
            }));
          } else resolve([]); else reject(new TypeError("Promise.all requires an array as input."));
        }));
      }, SyncPromise1.prototype.then = function(onfulfilled, onrejected) {
        var _this = this;
        return new SyncPromise1((function(resolve, reject) {
          _this._attachHandler({
            done: !1,
            onfulfilled: function(result) {
              if (onfulfilled) try {
                return void resolve(onfulfilled(result));
              } catch (e) {
                return void reject(e);
              } else resolve(result);
            },
            onrejected: function(reason) {
              if (onrejected) try {
                return void resolve(onrejected(reason));
              } catch (e) {
                return void reject(e);
              } else reject(reason);
            }
          });
        }));
      }, SyncPromise1.prototype.catch = function(onrejected) {
        return this.then((function(val) {
          return val;
        }), onrejected);
      }, SyncPromise1.prototype.finally = function(onfinally) {
        var _this = this;
        return new SyncPromise1((function(resolve, reject) {
          var val, isRejected;
          return _this.then((function(value) {
            isRejected = !1, val = value, onfinally && onfinally();
          }), (function(reason) {
            isRejected = !0, val = reason, onfinally && onfinally();
          })).then((function() {
            isRejected ? reject(val) : resolve(val);
          }));
        }));
      }, SyncPromise1.prototype.toString = function() {
        return "[object SyncPromise]";
      }, SyncPromise1;
    }();
  }, {
    "./is": "6j9uu",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  bSddU: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "dateTimestampInSeconds", (() => dateTimestampInSeconds)), 
    parcelHelpers.export(exports, "timestampInSeconds", (() => timestampInSeconds)), 
    parcelHelpers.export(exports, "timestampWithMs", (() => timestampWithMs)), parcelHelpers.export(exports, "usingPerformanceAPI", (() => usingPerformanceAPI)), 
    parcelHelpers.export(exports, "browserPerformanceTimeOrigin", (() => browserPerformanceTimeOrigin));
    var _misc = require("./misc"), _node = require("./node"), dateTimestampSource = {
      nowSeconds: function() {
        return Date.now() / 1e3;
      }
    };
    var platformPerformance = _node.isNodeEnv() ? function() {
      try {
        return _node.dynamicRequire(module, "perf_hooks").performance;
      } catch (_) {
        return;
      }
    }() : function() {
      var performance = _misc.getGlobalObject().performance;
      if (performance && performance.now) return {
        now: function() {
          return performance.now();
        },
        timeOrigin: Date.now() - performance.now()
      };
    }(), timestampSource = void 0 === platformPerformance ? dateTimestampSource : {
      nowSeconds: function() {
        return (platformPerformance.timeOrigin + platformPerformance.now()) / 1e3;
      }
    }, dateTimestampInSeconds = dateTimestampSource.nowSeconds.bind(dateTimestampSource), timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource), timestampWithMs = timestampInSeconds, usingPerformanceAPI = void 0 !== platformPerformance, browserPerformanceTimeOrigin = function() {
      var performance = _misc.getGlobalObject().performance;
      if (performance) return performance.timeOrigin ? performance.timeOrigin : performance.timing && performance.timing.navigationStart || Date.now();
    }();
  }, {
    "./misc": "carQl",
    "./node": "92YVC",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  g0b3T: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Session", (() => Session));
    var _types = require("@sentry/types"), _utils = require("@sentry/utils"), Session = function() {
      function Session1(context) {
        this.errors = 0, this.sid = _utils.uuid4(), this.timestamp = Date.now(), this.started = Date.now(), 
        this.duration = 0, this.status = _types.SessionStatus.Ok, context && this.update(context);
      }
      return Session1.prototype.update = function(context) {
        void 0 === context && (context = {}), context.user && (context.user.ip_address && (this.ipAddress = context.user.ip_address), 
        context.did || (this.did = context.user.id || context.user.email || context.user.username)), 
        this.timestamp = context.timestamp || Date.now(), context.sid && (this.sid = 32 === context.sid.length ? context.sid : _utils.uuid4()), 
        context.did && (this.did = "" + context.did), "number" == typeof context.started && (this.started = context.started), 
        "number" == typeof context.duration ? this.duration = context.duration : this.duration = this.timestamp - this.started, 
        context.release && (this.release = context.release), context.environment && (this.environment = context.environment), 
        context.ipAddress && (this.ipAddress = context.ipAddress), context.userAgent && (this.userAgent = context.userAgent), 
        "number" == typeof context.errors && (this.errors = context.errors), context.status && (this.status = context.status);
      }, Session1.prototype.close = function(status) {
        status ? this.update({
          status: status
        }) : this.status === _types.SessionStatus.Ok ? this.update({
          status: _types.SessionStatus.Exited
        }) : this.update();
      }, Session1.prototype.toJSON = function() {
        return _utils.dropUndefinedKeys({
          sid: "" + this.sid,
          init: !0,
          started: new Date(this.started).toISOString(),
          timestamp: new Date(this.timestamp).toISOString(),
          status: this.status,
          errors: this.errors,
          did: "number" == typeof this.did || "string" == typeof this.did ? "" + this.did : void 0,
          duration: this.duration,
          attrs: _utils.dropUndefinedKeys({
            release: this.release,
            environment: this.environment,
            ip_address: this.ipAddress,
            user_agent: this.userAgent
          })
        });
      }, Session1;
    }();
  }, {
    "@sentry/types": "2Tlfl",
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  grC9S: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "API_VERSION", (() => API_VERSION)), 
    parcelHelpers.export(exports, "Hub", (() => Hub)), parcelHelpers.export(exports, "getMainCarrier", (() => getMainCarrier)), 
    parcelHelpers.export(exports, "makeMain", (() => makeMain)), parcelHelpers.export(exports, "getCurrentHub", (() => getCurrentHub)), 
    parcelHelpers.export(exports, "getActiveDomain", (() => getActiveDomain)), parcelHelpers.export(exports, "getHubFromCarrier", (() => getHubFromCarrier)), 
    parcelHelpers.export(exports, "setHubOnCarrier", (() => setHubOnCarrier));
    var _tslib = require("tslib"), _utils = require("@sentry/utils"), _scope = require("./scope"), _session = require("./session"), API_VERSION = 3, Hub = function() {
      function Hub1(client, scope, _version) {
        void 0 === scope && (scope = new _scope.Scope), void 0 === _version && (_version = API_VERSION), 
        this._version = _version, this._stack = [ {} ], this.getStackTop().scope = scope, 
        this.bindClient(client);
      }
      return Hub1.prototype.isOlderThan = function(version) {
        return this._version < version;
      }, Hub1.prototype.bindClient = function(client) {
        this.getStackTop().client = client, client && client.setupIntegrations && client.setupIntegrations();
      }, Hub1.prototype.pushScope = function() {
        var scope = _scope.Scope.clone(this.getScope());
        return this.getStack().push({
          client: this.getClient(),
          scope: scope
        }), scope;
      }, Hub1.prototype.popScope = function() {
        return !(this.getStack().length <= 1) && !!this.getStack().pop();
      }, Hub1.prototype.withScope = function(callback) {
        var scope = this.pushScope();
        try {
          callback(scope);
        } finally {
          this.popScope();
        }
      }, Hub1.prototype.getClient = function() {
        return this.getStackTop().client;
      }, Hub1.prototype.getScope = function() {
        return this.getStackTop().scope;
      }, Hub1.prototype.getStack = function() {
        return this._stack;
      }, Hub1.prototype.getStackTop = function() {
        return this._stack[this._stack.length - 1];
      }, Hub1.prototype.captureException = function(exception, hint) {
        var eventId = this._lastEventId = _utils.uuid4(), finalHint = hint;
        if (!hint) {
          var syntheticException = void 0;
          try {
            throw new Error("Sentry syntheticException");
          } catch (exception1) {
            syntheticException = exception1;
          }
          finalHint = {
            originalException: exception,
            syntheticException: syntheticException
          };
        }
        return this._invokeClient("captureException", exception, _tslib.__assign(_tslib.__assign({}, finalHint), {
          event_id: eventId
        })), eventId;
      }, Hub1.prototype.captureMessage = function(message, level, hint) {
        var eventId = this._lastEventId = _utils.uuid4(), finalHint = hint;
        if (!hint) {
          var syntheticException = void 0;
          try {
            throw new Error(message);
          } catch (exception) {
            syntheticException = exception;
          }
          finalHint = {
            originalException: message,
            syntheticException: syntheticException
          };
        }
        return this._invokeClient("captureMessage", message, level, _tslib.__assign(_tslib.__assign({}, finalHint), {
          event_id: eventId
        })), eventId;
      }, Hub1.prototype.captureEvent = function(event, hint) {
        var eventId = this._lastEventId = _utils.uuid4();
        return this._invokeClient("captureEvent", event, _tslib.__assign(_tslib.__assign({}, hint), {
          event_id: eventId
        })), eventId;
      }, Hub1.prototype.lastEventId = function() {
        return this._lastEventId;
      }, Hub1.prototype.addBreadcrumb = function(breadcrumb, hint) {
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        if (scope && client) {
          var _b = client.getOptions && client.getOptions() || {}, _c = _b.beforeBreadcrumb, beforeBreadcrumb = void 0 === _c ? null : _c, _d = _b.maxBreadcrumbs, maxBreadcrumbs = void 0 === _d ? 100 : _d;
          if (!(maxBreadcrumbs <= 0)) {
            var timestamp = _utils.dateTimestampInSeconds(), mergedBreadcrumb = _tslib.__assign({
              timestamp: timestamp
            }, breadcrumb), finalBreadcrumb = beforeBreadcrumb ? _utils.consoleSandbox((function() {
              return beforeBreadcrumb(mergedBreadcrumb, hint);
            })) : mergedBreadcrumb;
            null !== finalBreadcrumb && scope.addBreadcrumb(finalBreadcrumb, Math.min(maxBreadcrumbs, 100));
          }
        }
      }, Hub1.prototype.setUser = function(user) {
        var scope = this.getScope();
        scope && scope.setUser(user);
      }, Hub1.prototype.setTags = function(tags) {
        var scope = this.getScope();
        scope && scope.setTags(tags);
      }, Hub1.prototype.setExtras = function(extras) {
        var scope = this.getScope();
        scope && scope.setExtras(extras);
      }, Hub1.prototype.setTag = function(key, value) {
        var scope = this.getScope();
        scope && scope.setTag(key, value);
      }, Hub1.prototype.setExtra = function(key, extra) {
        var scope = this.getScope();
        scope && scope.setExtra(key, extra);
      }, Hub1.prototype.setContext = function(name, context) {
        var scope = this.getScope();
        scope && scope.setContext(name, context);
      }, Hub1.prototype.configureScope = function(callback) {
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        scope && client && callback(scope);
      }, Hub1.prototype.run = function(callback) {
        var oldHub = makeMain(this);
        try {
          callback(this);
        } finally {
          makeMain(oldHub);
        }
      }, Hub1.prototype.getIntegration = function(integration) {
        var client = this.getClient();
        if (!client) return null;
        try {
          return client.getIntegration(integration);
        } catch (_oO) {
          return _utils.logger.warn("Cannot retrieve integration " + integration.id + " from the current Hub"), 
          null;
        }
      }, Hub1.prototype.startSpan = function(context) {
        return this._callExtensionMethod("startSpan", context);
      }, Hub1.prototype.startTransaction = function(context, customSamplingContext) {
        return this._callExtensionMethod("startTransaction", context, customSamplingContext);
      }, Hub1.prototype.traceHeaders = function() {
        return this._callExtensionMethod("traceHeaders");
      }, Hub1.prototype.startSession = function(context) {
        this.endSession();
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client, _b = client && client.getOptions() || {}, release = _b.release, environment = _b.environment, session = new _session.Session(_tslib.__assign(_tslib.__assign({
          release: release,
          environment: environment
        }, scope && {
          user: scope.getUser()
        }), context));
        return scope && scope.setSession(session), session;
      }, Hub1.prototype.endSession = function() {
        var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
        if (scope) {
          var session = scope.getSession && scope.getSession();
          session && (session.close(), client && client.captureSession && client.captureSession(session), 
          scope.setSession());
        }
      }, Hub1.prototype._invokeClient = function(method) {
        for (var _a, args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
        var _b = this.getStackTop(), scope = _b.scope, client = _b.client;
        client && client[method] && (_a = client)[method].apply(_a, _tslib.__spread(args, [ scope ]));
      }, Hub1.prototype._callExtensionMethod = function(method) {
        for (var args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
        var carrier = getMainCarrier(), sentry = carrier.__SENTRY__;
        if (sentry && sentry.extensions && "function" == typeof sentry.extensions[method]) return sentry.extensions[method].apply(this, args);
        _utils.logger.warn("Extension method " + method + " couldn't be found, doing nothing.");
      }, Hub1;
    }();
    function getMainCarrier() {
      var carrier = _utils.getGlobalObject();
      return carrier.__SENTRY__ = carrier.__SENTRY__ || {
        extensions: {},
        hub: void 0
      }, carrier;
    }
    function makeMain(hub) {
      var registry = getMainCarrier(), oldHub = getHubFromCarrier(registry);
      return setHubOnCarrier(registry, hub), oldHub;
    }
    function getCurrentHub() {
      var registry = getMainCarrier();
      return hasHubOnCarrier(registry) && !getHubFromCarrier(registry).isOlderThan(API_VERSION) || setHubOnCarrier(registry, new Hub), 
      _utils.isNodeEnv() ? function(registry) {
        try {
          var activeDomain = getActiveDomain();
          if (!activeDomain) return getHubFromCarrier(registry);
          if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(API_VERSION)) {
            var registryHubTopStack = getHubFromCarrier(registry).getStackTop();
            setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, _scope.Scope.clone(registryHubTopStack.scope)));
          }
          return getHubFromCarrier(activeDomain);
        } catch (_Oo) {
          return getHubFromCarrier(registry);
        }
      }(registry) : getHubFromCarrier(registry);
    }
    function getActiveDomain() {
      var sentry = getMainCarrier().__SENTRY__;
      return sentry && sentry.extensions && sentry.extensions.domain && sentry.extensions.domain.active;
    }
    function hasHubOnCarrier(carrier) {
      return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
    }
    function getHubFromCarrier(carrier) {
      return carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub || (carrier.__SENTRY__ = carrier.__SENTRY__ || {}, 
      carrier.__SENTRY__.hub = new Hub), carrier.__SENTRY__.hub;
    }
    function setHubOnCarrier(carrier, hub) {
      return !!carrier && (carrier.__SENTRY__ = carrier.__SENTRY__ || {}, carrier.__SENTRY__.hub = hub, 
      !0);
    }
  }, {
    tslib: "eEuCs",
    "@sentry/utils": "gda2Z",
    "./scope": "37bps",
    "./session": "g0b3T",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  ii8g3: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "API", (() => API));
    var _utils = require("@sentry/utils"), API = function() {
      function API1(dsn) {
        this.dsn = dsn, this._dsnObject = new _utils.Dsn(dsn);
      }
      return API1.prototype.getDsn = function() {
        return this._dsnObject;
      }, API1.prototype.getBaseApiEndpoint = function() {
        var dsn = this._dsnObject, protocol = dsn.protocol ? dsn.protocol + ":" : "", port = dsn.port ? ":" + dsn.port : "";
        return protocol + "//" + dsn.host + port + (dsn.path ? "/" + dsn.path : "") + "/api/";
      }, API1.prototype.getStoreEndpoint = function() {
        return this._getIngestEndpoint("store");
      }, API1.prototype.getStoreEndpointWithUrlEncodedAuth = function() {
        return this.getStoreEndpoint() + "?" + this._encodedAuth();
      }, API1.prototype.getEnvelopeEndpointWithUrlEncodedAuth = function() {
        return this._getEnvelopeEndpoint() + "?" + this._encodedAuth();
      }, API1.prototype.getStoreEndpointPath = function() {
        var dsn = this._dsnObject;
        return (dsn.path ? "/" + dsn.path : "") + "/api/" + dsn.projectId + "/store/";
      }, API1.prototype.getRequestHeaders = function(clientName, clientVersion) {
        var dsn = this._dsnObject, header = [ "Sentry sentry_version=7" ];
        return header.push("sentry_client=" + clientName + "/" + clientVersion), header.push("sentry_key=" + dsn.user), 
        dsn.pass && header.push("sentry_secret=" + dsn.pass), {
          "Content-Type": "application/json",
          "X-Sentry-Auth": header.join(", ")
        };
      }, API1.prototype.getReportDialogEndpoint = function(dialogOptions) {
        void 0 === dialogOptions && (dialogOptions = {});
        var dsn = this._dsnObject, endpoint = this.getBaseApiEndpoint() + "embed/error-page/", encodedOptions = [];
        for (var key in encodedOptions.push("dsn=" + dsn.toString()), dialogOptions) if ("dsn" !== key) if ("user" === key) {
          if (!dialogOptions.user) continue;
          dialogOptions.user.name && encodedOptions.push("name=" + encodeURIComponent(dialogOptions.user.name)), 
          dialogOptions.user.email && encodedOptions.push("email=" + encodeURIComponent(dialogOptions.user.email));
        } else encodedOptions.push(encodeURIComponent(key) + "=" + encodeURIComponent(dialogOptions[key]));
        return encodedOptions.length ? endpoint + "?" + encodedOptions.join("&") : endpoint;
      }, API1.prototype._getEnvelopeEndpoint = function() {
        return this._getIngestEndpoint("envelope");
      }, API1.prototype._getIngestEndpoint = function(target) {
        return "" + this.getBaseApiEndpoint() + this._dsnObject.projectId + "/" + target + "/";
      }, API1.prototype._encodedAuth = function() {
        var auth = {
          sentry_key: this._dsnObject.user,
          sentry_version: "7"
        };
        return _utils.urlEncode(auth);
      }, API1;
    }();
  }, {
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "9EabM": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "BaseClient", (() => BaseClient));
    var _tslib = require("tslib"), _hub = require("@sentry/hub"), _types = require("@sentry/types"), _utils = require("@sentry/utils"), _integration = require("./integration"), BaseClient = function() {
      function BaseClient1(backendClass, options) {
        this._integrations = {}, this._processing = 0, this._backend = new backendClass(options), 
        this._options = options, options.dsn && (this._dsn = new _utils.Dsn(options.dsn));
      }
      return BaseClient1.prototype.captureException = function(exception, hint, scope) {
        var _this = this, eventId = hint && hint.event_id;
        return this._process(this._getBackend().eventFromException(exception, hint).then((function(event) {
          return _this._captureEvent(event, hint, scope);
        })).then((function(result) {
          eventId = result;
        }))), eventId;
      }, BaseClient1.prototype.captureMessage = function(message, level, hint, scope) {
        var _this = this, eventId = hint && hint.event_id, promisedEvent = _utils.isPrimitive(message) ? this._getBackend().eventFromMessage(String(message), level, hint) : this._getBackend().eventFromException(message, hint);
        return this._process(promisedEvent.then((function(event) {
          return _this._captureEvent(event, hint, scope);
        })).then((function(result) {
          eventId = result;
        }))), eventId;
      }, BaseClient1.prototype.captureEvent = function(event, hint, scope) {
        var eventId = hint && hint.event_id;
        return this._process(this._captureEvent(event, hint, scope).then((function(result) {
          eventId = result;
        }))), eventId;
      }, BaseClient1.prototype.captureSession = function(session) {
        session.release ? this._sendSession(session) : _utils.logger.warn("Discarded session because of missing release");
      }, BaseClient1.prototype.getDsn = function() {
        return this._dsn;
      }, BaseClient1.prototype.getOptions = function() {
        return this._options;
      }, BaseClient1.prototype.flush = function(timeout) {
        var _this = this;
        return this._isClientProcessing(timeout).then((function(ready) {
          return _this._getBackend().getTransport().close(timeout).then((function(transportFlushed) {
            return ready && transportFlushed;
          }));
        }));
      }, BaseClient1.prototype.close = function(timeout) {
        var _this = this;
        return this.flush(timeout).then((function(result) {
          return _this.getOptions().enabled = !1, result;
        }));
      }, BaseClient1.prototype.setupIntegrations = function() {
        this._isEnabled() && (this._integrations = _integration.setupIntegrations(this._options));
      }, BaseClient1.prototype.getIntegration = function(integration) {
        try {
          return this._integrations[integration.id] || null;
        } catch (_oO) {
          return _utils.logger.warn("Cannot retrieve integration " + integration.id + " from the current Client"), 
          null;
        }
      }, BaseClient1.prototype._updateSessionFromEvent = function(session, event) {
        var e_1, _a, userAgent, crashed = !1, errored = !1, exceptions = event.exception && event.exception.values;
        if (exceptions) {
          errored = !0;
          try {
            for (var exceptions_1 = _tslib.__values(exceptions), exceptions_1_1 = exceptions_1.next(); !exceptions_1_1.done; exceptions_1_1 = exceptions_1.next()) {
              var mechanism = exceptions_1_1.value.mechanism;
              if (mechanism && !1 === mechanism.handled) {
                crashed = !0;
                break;
              }
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              exceptions_1_1 && !exceptions_1_1.done && (_a = exceptions_1.return) && _a.call(exceptions_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }
        var user = event.user;
        if (!session.userAgent) {
          var headers = event.request ? event.request.headers : {};
          for (var key in headers) if ("user-agent" === key.toLowerCase()) {
            userAgent = headers[key];
            break;
          }
        }
        session.update(_tslib.__assign(_tslib.__assign({}, crashed && {
          status: _types.SessionStatus.Crashed
        }), {
          user: user,
          userAgent: userAgent,
          errors: session.errors + Number(errored || crashed)
        }));
      }, BaseClient1.prototype._sendSession = function(session) {
        this._getBackend().sendSession(session);
      }, BaseClient1.prototype._isClientProcessing = function(timeout) {
        var _this = this;
        return new _utils.SyncPromise((function(resolve) {
          var ticked = 0, interval = setInterval((function() {
            0 == _this._processing ? (clearInterval(interval), resolve(!0)) : (ticked += 1, 
            timeout && ticked >= timeout && (clearInterval(interval), resolve(!1)));
          }), 1);
        }));
      }, BaseClient1.prototype._getBackend = function() {
        return this._backend;
      }, BaseClient1.prototype._isEnabled = function() {
        return !1 !== this.getOptions().enabled && void 0 !== this._dsn;
      }, BaseClient1.prototype._prepareEvent = function(event, scope, hint) {
        var _this = this, _a = this.getOptions().normalizeDepth, normalizeDepth = void 0 === _a ? 3 : _a, prepared = _tslib.__assign(_tslib.__assign({}, event), {
          event_id: event.event_id || (hint && hint.event_id ? hint.event_id : _utils.uuid4()),
          timestamp: event.timestamp || _utils.dateTimestampInSeconds()
        });
        this._applyClientOptions(prepared), this._applyIntegrationsMetadata(prepared);
        var finalScope = scope;
        hint && hint.captureContext && (finalScope = _hub.Scope.clone(finalScope).update(hint.captureContext));
        var result = _utils.SyncPromise.resolve(prepared);
        return finalScope && (result = finalScope.applyToEvent(prepared, hint)), result.then((function(evt) {
          return "number" == typeof normalizeDepth && normalizeDepth > 0 ? _this._normalizeEvent(evt, normalizeDepth) : evt;
        }));
      }, BaseClient1.prototype._normalizeEvent = function(event, depth) {
        if (!event) return null;
        var normalized = _tslib.__assign(_tslib.__assign(_tslib.__assign(_tslib.__assign(_tslib.__assign({}, event), event.breadcrumbs && {
          breadcrumbs: event.breadcrumbs.map((function(b) {
            return _tslib.__assign(_tslib.__assign({}, b), b.data && {
              data: _utils.normalize(b.data, depth)
            });
          }))
        }), event.user && {
          user: _utils.normalize(event.user, depth)
        }), event.contexts && {
          contexts: _utils.normalize(event.contexts, depth)
        }), event.extra && {
          extra: _utils.normalize(event.extra, depth)
        });
        return event.contexts && event.contexts.trace && (normalized.contexts.trace = event.contexts.trace), 
        normalized;
      }, BaseClient1.prototype._applyClientOptions = function(event) {
        var options = this.getOptions(), environment = options.environment, release = options.release, dist = options.dist, _a = options.maxValueLength, maxValueLength = void 0 === _a ? 250 : _a;
        "environment" in event || (event.environment = "environment" in options ? environment : "production"), 
        void 0 === event.release && void 0 !== release && (event.release = release), void 0 === event.dist && void 0 !== dist && (event.dist = dist), 
        event.message && (event.message = _utils.truncate(event.message, maxValueLength));
        var exception = event.exception && event.exception.values && event.exception.values[0];
        exception && exception.value && (exception.value = _utils.truncate(exception.value, maxValueLength));
        var request = event.request;
        request && request.url && (request.url = _utils.truncate(request.url, maxValueLength));
      }, BaseClient1.prototype._applyIntegrationsMetadata = function(event) {
        var sdkInfo = event.sdk, integrationsArray = Object.keys(this._integrations);
        sdkInfo && integrationsArray.length > 0 && (sdkInfo.integrations = integrationsArray);
      }, BaseClient1.prototype._sendEvent = function(event) {
        this._getBackend().sendEvent(event);
      }, BaseClient1.prototype._captureEvent = function(event, hint, scope) {
        return this._processEvent(event, hint, scope).then((function(finalEvent) {
          return finalEvent.event_id;
        }), (function(reason) {
          _utils.logger.error(reason);
        }));
      }, BaseClient1.prototype._processEvent = function(event, hint, scope) {
        var _this = this, _a = this.getOptions(), beforeSend = _a.beforeSend, sampleRate = _a.sampleRate;
        if (!this._isEnabled()) return _utils.SyncPromise.reject(new _utils.SentryError("SDK not enabled, will not send event."));
        var isTransaction = "transaction" === event.type;
        return !isTransaction && "number" == typeof sampleRate && Math.random() > sampleRate ? _utils.SyncPromise.reject(new _utils.SentryError("Discarding event because it's not included in the random sample (sampling rate = " + sampleRate + ")")) : this._prepareEvent(event, scope, hint).then((function(prepared) {
          if (null === prepared) throw new _utils.SentryError("An event processor returned null, will not send event.");
          if (hint && hint.data && !0 === hint.data.__sentry__ || isTransaction || !beforeSend) return prepared;
          var beforeSendResult = beforeSend(prepared, hint);
          if (void 0 === beforeSendResult) throw new _utils.SentryError("`beforeSend` method has to return `null` or a valid event.");
          return _utils.isThenable(beforeSendResult) ? beforeSendResult.then((function(event1) {
            return event1;
          }), (function(e) {
            throw new _utils.SentryError("beforeSend rejected with " + e);
          })) : beforeSendResult;
        })).then((function(processedEvent) {
          if (null === processedEvent) throw new _utils.SentryError("`beforeSend` returned `null`, will not send event.");
          var session = scope && scope.getSession && scope.getSession();
          return !isTransaction && session && _this._updateSessionFromEvent(session, processedEvent), 
          _this._sendEvent(processedEvent), processedEvent;
        })).then(null, (function(reason) {
          if (reason instanceof _utils.SentryError) throw reason;
          throw _this.captureException(reason, {
            data: {
              __sentry__: !0
            },
            originalException: reason
          }), new _utils.SentryError("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " + reason);
        }));
      }, BaseClient1.prototype._process = function(promise) {
        var _this = this;
        this._processing += 1, promise.then((function(value) {
          return _this._processing -= 1, value;
        }), (function(reason) {
          return _this._processing -= 1, reason;
        }));
      }, BaseClient1;
    }();
  }, {
    tslib: "eEuCs",
    "@sentry/hub": "8MJ29",
    "@sentry/types": "2Tlfl",
    "@sentry/utils": "gda2Z",
    "./integration": "31EEG",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "31EEG": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "installedIntegrations", (() => installedIntegrations)), 
    parcelHelpers.export(exports, "getIntegrationsToSetup", (() => getIntegrationsToSetup)), 
    parcelHelpers.export(exports, "setupIntegration", (() => setupIntegration)), parcelHelpers.export(exports, "setupIntegrations", (() => setupIntegrations));
    var _tslib = require("tslib"), _hub = require("@sentry/hub"), _utils = require("@sentry/utils"), installedIntegrations = [];
    function getIntegrationsToSetup(options) {
      var defaultIntegrations = options.defaultIntegrations && _tslib.__spread(options.defaultIntegrations) || [], userIntegrations = options.integrations, integrations = [];
      if (Array.isArray(userIntegrations)) {
        var userIntegrationsNames_1 = userIntegrations.map((function(i) {
          return i.name;
        })), pickedIntegrationsNames_1 = [];
        defaultIntegrations.forEach((function(defaultIntegration) {
          -1 === userIntegrationsNames_1.indexOf(defaultIntegration.name) && -1 === pickedIntegrationsNames_1.indexOf(defaultIntegration.name) && (integrations.push(defaultIntegration), 
          pickedIntegrationsNames_1.push(defaultIntegration.name));
        })), userIntegrations.forEach((function(userIntegration) {
          -1 === pickedIntegrationsNames_1.indexOf(userIntegration.name) && (integrations.push(userIntegration), 
          pickedIntegrationsNames_1.push(userIntegration.name));
        }));
      } else "function" == typeof userIntegrations ? (integrations = userIntegrations(defaultIntegrations), 
      integrations = Array.isArray(integrations) ? integrations : [ integrations ]) : integrations = _tslib.__spread(defaultIntegrations);
      var integrationsNames = integrations.map((function(i) {
        return i.name;
      }));
      return -1 !== integrationsNames.indexOf("Debug") && integrations.push.apply(integrations, _tslib.__spread(integrations.splice(integrationsNames.indexOf("Debug"), 1))), 
      integrations;
    }
    function setupIntegration(integration) {
      -1 === installedIntegrations.indexOf(integration.name) && (integration.setupOnce(_hub.addGlobalEventProcessor, _hub.getCurrentHub), 
      installedIntegrations.push(integration.name), _utils.logger.log("Integration installed: " + integration.name));
    }
    function setupIntegrations(options) {
      var integrations = {};
      return getIntegrationsToSetup(options).forEach((function(integration) {
        integrations[integration.name] = integration, setupIntegration(integration);
      })), integrations;
    }
  }, {
    tslib: "eEuCs",
    "@sentry/hub": "8MJ29",
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "2O0sy": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "BaseBackend", (() => BaseBackend));
    var _utils = require("@sentry/utils"), _noop = require("./transports/noop"), BaseBackend = function() {
      function BaseBackend1(options) {
        this._options = options, this._options.dsn || _utils.logger.warn("No DSN provided, backend will not do anything."), 
        this._transport = this._setupTransport();
      }
      return BaseBackend1.prototype.eventFromException = function(_exception, _hint) {
        throw new _utils.SentryError("Backend has to implement `eventFromException` method");
      }, BaseBackend1.prototype.eventFromMessage = function(_message, _level, _hint) {
        throw new _utils.SentryError("Backend has to implement `eventFromMessage` method");
      }, BaseBackend1.prototype.sendEvent = function(event) {
        this._transport.sendEvent(event).then(null, (function(reason) {
          _utils.logger.error("Error while sending event: " + reason);
        }));
      }, BaseBackend1.prototype.sendSession = function(session) {
        this._transport.sendSession ? this._transport.sendSession(session).then(null, (function(reason) {
          _utils.logger.error("Error while sending session: " + reason);
        })) : _utils.logger.warn("Dropping session because custom transport doesn't implement sendSession");
      }, BaseBackend1.prototype.getTransport = function() {
        return this._transport;
      }, BaseBackend1.prototype._setupTransport = function() {
        return new _noop.NoopTransport;
      }, BaseBackend1;
    }();
  }, {
    "@sentry/utils": "gda2Z",
    "./transports/noop": "h6Pbk",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  h6Pbk: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "NoopTransport", (() => NoopTransport));
    var _types = require("@sentry/types"), _utils = require("@sentry/utils"), NoopTransport = function() {
      function NoopTransport1() {}
      return NoopTransport1.prototype.sendEvent = function(_) {
        return _utils.SyncPromise.resolve({
          reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
          status: _types.Status.Skipped
        });
      }, NoopTransport1.prototype.close = function(_) {
        return _utils.SyncPromise.resolve(!0);
      }, NoopTransport1;
    }();
  }, {
    "@sentry/types": "2Tlfl",
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  esMMQ: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "sessionToSentryRequest", (() => sessionToSentryRequest)), 
    parcelHelpers.export(exports, "eventToSentryRequest", (() => eventToSentryRequest));
    var _tslib = require("tslib");
    function sessionToSentryRequest(session, api) {
      return {
        body: JSON.stringify({
          sent_at: (new Date).toISOString()
        }) + "\n" + JSON.stringify({
          type: "session"
        }) + "\n" + JSON.stringify(session),
        type: "session",
        url: api.getEnvelopeEndpointWithUrlEncodedAuth()
      };
    }
    function eventToSentryRequest(event, api) {
      var _a = event.tags || {}, samplingMethod = _a.__sentry_samplingMethod, sampleRate = _a.__sentry_sampleRate, otherTags = _tslib.__rest(_a, [ "__sentry_samplingMethod", "__sentry_sampleRate" ]);
      event.tags = otherTags;
      var useEnvelope = "transaction" === event.type, req = {
        body: JSON.stringify(event),
        type: event.type || "event",
        url: useEnvelope ? api.getEnvelopeEndpointWithUrlEncodedAuth() : api.getStoreEndpointWithUrlEncodedAuth()
      };
      if (useEnvelope) {
        var envelope = JSON.stringify({
          event_id: event.event_id,
          sent_at: (new Date).toISOString()
        }) + "\n" + JSON.stringify({
          type: event.type,
          sample_rates: [ {
            id: samplingMethod,
            rate: sampleRate
          } ]
        }) + "\n" + req.body;
        req.body = envelope;
      }
      return req;
    }
  }, {
    tslib: "eEuCs",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  bLUqH: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "initAndBind", (() => initAndBind));
    var _hub = require("@sentry/hub"), _utils = require("@sentry/utils");
    function initAndBind(clientClass, options) {
      !0 === options.debug && _utils.logger.enable();
      var hub = _hub.getCurrentHub(), client = new clientClass(options);
      hub.bindClient(client);
    }
  }, {
    "@sentry/hub": "8MJ29",
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "34QOE": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "FunctionToString", (() => _functiontostring.FunctionToString)), 
    parcelHelpers.export(exports, "InboundFilters", (() => _inboundfilters.InboundFilters));
    var _functiontostring = require("./functiontostring"), _inboundfilters = require("./inboundfilters");
  }, {
    "./functiontostring": "iYv4m",
    "./inboundfilters": "iFJdb",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  iYv4m: [ function(require, module, exports) {
    var originalFunctionToString, parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "FunctionToString", (() => FunctionToString));
    var FunctionToString = function() {
      function FunctionToString1() {
        this.name = FunctionToString1.id;
      }
      return FunctionToString1.prototype.setupOnce = function() {
        originalFunctionToString = Function.prototype.toString, Function.prototype.toString = function() {
          for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
          var context = this.__sentry_original__ || this;
          return originalFunctionToString.apply(context, args);
        };
      }, FunctionToString1.id = "FunctionToString", FunctionToString1;
    }();
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  iFJdb: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "InboundFilters", (() => InboundFilters));
    var _tslib = require("tslib"), _hub = require("@sentry/hub"), _utils = require("@sentry/utils"), DEFAULT_IGNORE_ERRORS = [ /^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/ ], InboundFilters = function() {
      function InboundFilters1(_options) {
        void 0 === _options && (_options = {}), this._options = _options, this.name = InboundFilters1.id;
      }
      return InboundFilters1.prototype.setupOnce = function() {
        _hub.addGlobalEventProcessor((function(event) {
          var hub = _hub.getCurrentHub();
          if (!hub) return event;
          var self = hub.getIntegration(InboundFilters1);
          if (self) {
            var client = hub.getClient(), clientOptions = client ? client.getOptions() : {}, options = self._mergeOptions(clientOptions);
            if (self._shouldDropEvent(event, options)) return null;
          }
          return event;
        }));
      }, InboundFilters1.prototype._shouldDropEvent = function(event, options) {
        return this._isSentryError(event, options) ? (_utils.logger.warn("Event dropped due to being internal Sentry Error.\nEvent: " + _utils.getEventDescription(event)), 
        !0) : this._isIgnoredError(event, options) ? (_utils.logger.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + _utils.getEventDescription(event)), 
        !0) : this._isDeniedUrl(event, options) ? (_utils.logger.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: " + _utils.getEventDescription(event) + ".\nUrl: " + this._getEventFilterUrl(event)), 
        !0) : !this._isAllowedUrl(event, options) && (_utils.logger.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: " + _utils.getEventDescription(event) + ".\nUrl: " + this._getEventFilterUrl(event)), 
        !0);
      }, InboundFilters1.prototype._isSentryError = function(event, options) {
        if (!options.ignoreInternal) return !1;
        try {
          return event && event.exception && event.exception.values && event.exception.values[0] && "SentryError" === event.exception.values[0].type || !1;
        } catch (_oO) {
          return !1;
        }
      }, InboundFilters1.prototype._isIgnoredError = function(event, options) {
        return !(!options.ignoreErrors || !options.ignoreErrors.length) && this._getPossibleEventMessages(event).some((function(message) {
          return options.ignoreErrors.some((function(pattern) {
            return _utils.isMatchingPattern(message, pattern);
          }));
        }));
      }, InboundFilters1.prototype._isDeniedUrl = function(event, options) {
        if (!options.denyUrls || !options.denyUrls.length) return !1;
        var url = this._getEventFilterUrl(event);
        return !!url && options.denyUrls.some((function(pattern) {
          return _utils.isMatchingPattern(url, pattern);
        }));
      }, InboundFilters1.prototype._isAllowedUrl = function(event, options) {
        if (!options.allowUrls || !options.allowUrls.length) return !0;
        var url = this._getEventFilterUrl(event);
        return !url || options.allowUrls.some((function(pattern) {
          return _utils.isMatchingPattern(url, pattern);
        }));
      }, InboundFilters1.prototype._mergeOptions = function(clientOptions) {
        return void 0 === clientOptions && (clientOptions = {}), {
          allowUrls: _tslib.__spread(this._options.whitelistUrls || [], this._options.allowUrls || [], clientOptions.whitelistUrls || [], clientOptions.allowUrls || []),
          denyUrls: _tslib.__spread(this._options.blacklistUrls || [], this._options.denyUrls || [], clientOptions.blacklistUrls || [], clientOptions.denyUrls || []),
          ignoreErrors: _tslib.__spread(this._options.ignoreErrors || [], clientOptions.ignoreErrors || [], DEFAULT_IGNORE_ERRORS),
          ignoreInternal: void 0 === this._options.ignoreInternal || this._options.ignoreInternal
        };
      }, InboundFilters1.prototype._getPossibleEventMessages = function(event) {
        if (event.message) return [ event.message ];
        if (event.exception) try {
          var _a = event.exception.values && event.exception.values[0] || {}, _b = _a.type, type = void 0 === _b ? "" : _b, _c = _a.value, value = void 0 === _c ? "" : _c;
          return [ "" + value, type + ": " + value ];
        } catch (oO) {
          return _utils.logger.error("Cannot extract message for event " + _utils.getEventDescription(event)), 
          [];
        }
        return [];
      }, InboundFilters1.prototype._getEventFilterUrl = function(event) {
        try {
          if (event.stacktrace) {
            var frames_1 = event.stacktrace.frames;
            return frames_1 && frames_1[frames_1.length - 1].filename || null;
          }
          if (event.exception) {
            var frames_2 = event.exception.values && event.exception.values[0].stacktrace && event.exception.values[0].stacktrace.frames;
            return frames_2 && frames_2[frames_2.length - 1].filename || null;
          }
          return null;
        } catch (oO) {
          return _utils.logger.error("Cannot extract url for event " + _utils.getEventDescription(event)), 
          null;
        }
      }, InboundFilters1.id = "InboundFilters", InboundFilters1;
    }();
  }, {
    tslib: "eEuCs",
    "@sentry/hub": "8MJ29",
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "3seWe": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "BrowserClient", (() => BrowserClient1));
    var _tslib = require("tslib"), _core = require("@sentry/core"), _utils = require("@sentry/utils"), _backend = require("./backend"), _helpers = require("./helpers"), _integrations = require("./integrations"), _version = require("./version"), BrowserClient1 = function(_super) {
      function BrowserClient2(options) {
        return void 0 === options && (options = {}), _super.call(this, _backend.BrowserBackend, options) || this;
      }
      return _tslib.__extends(BrowserClient2, _super), BrowserClient2.prototype.showReportDialog = function(options) {
        void 0 === options && (options = {}), _utils.getGlobalObject().document && (this._isEnabled() ? _helpers.injectReportDialog(_tslib.__assign(_tslib.__assign({}, options), {
          dsn: options.dsn || this.getDsn()
        })) : _utils.logger.error("Trying to call showReportDialog with Sentry Client disabled"));
      }, BrowserClient2.prototype._prepareEvent = function(event, scope, hint) {
        return event.platform = event.platform || "javascript", event.sdk = _tslib.__assign(_tslib.__assign({}, event.sdk), {
          name: _version.SDK_NAME,
          packages: _tslib.__spread(event.sdk && event.sdk.packages || [], [ {
            name: "npm:@sentry/browser",
            version: _version.SDK_VERSION
          } ]),
          version: _version.SDK_VERSION
        }), _super.prototype._prepareEvent.call(this, event, scope, hint);
      }, BrowserClient2.prototype._sendEvent = function(event) {
        var integration = this.getIntegration(_integrations.Breadcrumbs);
        integration && integration.addSentryBreadcrumb(event), _super.prototype._sendEvent.call(this, event);
      }, BrowserClient2;
    }(_core.BaseClient);
  }, {
    tslib: "eEuCs",
    "@sentry/core": "fctce",
    "@sentry/utils": "gda2Z",
    "./backend": "a5iOH",
    "./helpers": "eeNY6",
    "./integrations": "9JGL8",
    "./version": "in8FX",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  a5iOH: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "BrowserBackend", (() => BrowserBackend1));
    var _tslib = require("tslib"), _core = require("@sentry/core"), _types = require("@sentry/types"), _utils = require("@sentry/utils"), _eventbuilder = require("./eventbuilder"), _transports = require("./transports"), BrowserBackend1 = function(_super) {
      function BrowserBackend2() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      return _tslib.__extends(BrowserBackend2, _super), BrowserBackend2.prototype.eventFromException = function(exception, hint) {
        return _eventbuilder.eventFromException(this._options, exception, hint);
      }, BrowserBackend2.prototype.eventFromMessage = function(message, level, hint) {
        return void 0 === level && (level = _types.Severity.Info), _eventbuilder.eventFromMessage(this._options, message, level, hint);
      }, BrowserBackend2.prototype._setupTransport = function() {
        if (!this._options.dsn) return _super.prototype._setupTransport.call(this);
        var transportOptions = _tslib.__assign(_tslib.__assign({}, this._options.transportOptions), {
          dsn: this._options.dsn
        });
        return this._options.transport ? new this._options.transport(transportOptions) : _utils.supportsFetch() ? new _transports.FetchTransport(transportOptions) : new _transports.XHRTransport(transportOptions);
      }, BrowserBackend2;
    }(_core.BaseBackend);
  }, {
    tslib: "eEuCs",
    "@sentry/core": "fctce",
    "@sentry/types": "2Tlfl",
    "@sentry/utils": "gda2Z",
    "./eventbuilder": "4kSuP",
    "./transports": "c53MC",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "4kSuP": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "eventFromException", (() => eventFromException)), 
    parcelHelpers.export(exports, "eventFromMessage", (() => eventFromMessage)), parcelHelpers.export(exports, "eventFromUnknownInput", (() => eventFromUnknownInput)), 
    parcelHelpers.export(exports, "eventFromString", (() => eventFromString));
    var _tslib = require("tslib"), _types = require("@sentry/types"), _utils = require("@sentry/utils"), _parsers = require("./parsers"), _tracekit = require("./tracekit");
    function eventFromException(options, exception, hint) {
      var event = eventFromUnknownInput(exception, hint && hint.syntheticException || void 0, {
        attachStacktrace: options.attachStacktrace
      });
      return _utils.addExceptionMechanism(event, {
        handled: !0,
        type: "generic"
      }), event.level = _types.Severity.Error, hint && hint.event_id && (event.event_id = hint.event_id), 
      _utils.SyncPromise.resolve(event);
    }
    function eventFromMessage(options, message, level, hint) {
      void 0 === level && (level = _types.Severity.Info);
      var event = eventFromString(message, hint && hint.syntheticException || void 0, {
        attachStacktrace: options.attachStacktrace
      });
      return event.level = level, hint && hint.event_id && (event.event_id = hint.event_id), 
      _utils.SyncPromise.resolve(event);
    }
    function eventFromUnknownInput(exception, syntheticException, options) {
      var event;
      if (void 0 === options && (options = {}), _utils.isErrorEvent(exception) && exception.error) return exception = exception.error, 
      event = _parsers.eventFromStacktrace(_tracekit.computeStackTrace(exception));
      if (_utils.isDOMError(exception) || _utils.isDOMException(exception)) {
        var domException = exception, name_1 = domException.name || (_utils.isDOMError(domException) ? "DOMError" : "DOMException"), message = domException.message ? name_1 + ": " + domException.message : name_1;
        return event = eventFromString(message, syntheticException, options), _utils.addExceptionTypeValue(event, message), 
        "code" in domException && (event.tags = _tslib.__assign(_tslib.__assign({}, event.tags), {
          "DOMException.code": "" + domException.code
        })), event;
      }
      if (_utils.isError(exception)) return event = _parsers.eventFromStacktrace(_tracekit.computeStackTrace(exception));
      if (_utils.isPlainObject(exception) || _utils.isEvent(exception)) {
        var objectException = exception;
        return event = _parsers.eventFromPlainObject(objectException, syntheticException, options.rejection), 
        _utils.addExceptionMechanism(event, {
          synthetic: !0
        }), event;
      }
      return event = eventFromString(exception, syntheticException, options), _utils.addExceptionTypeValue(event, "" + exception, void 0), 
      _utils.addExceptionMechanism(event, {
        synthetic: !0
      }), event;
    }
    function eventFromString(input, syntheticException, options) {
      void 0 === options && (options = {});
      var event = {
        message: input
      };
      if (options.attachStacktrace && syntheticException) {
        var stacktrace = _tracekit.computeStackTrace(syntheticException), frames_1 = _parsers.prepareFramesForEvent(stacktrace.stack);
        event.stacktrace = {
          frames: frames_1
        };
      }
      return event;
    }
  }, {
    tslib: "eEuCs",
    "@sentry/types": "2Tlfl",
    "@sentry/utils": "gda2Z",
    "./parsers": "lRgxc",
    "./tracekit": "gRwyq",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  lRgxc: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "exceptionFromStacktrace", (() => exceptionFromStacktrace)), 
    parcelHelpers.export(exports, "eventFromPlainObject", (() => eventFromPlainObject)), 
    parcelHelpers.export(exports, "eventFromStacktrace", (() => eventFromStacktrace)), 
    parcelHelpers.export(exports, "prepareFramesForEvent", (() => prepareFramesForEvent));
    var _utils = require("@sentry/utils"), _tracekit = require("./tracekit");
    function exceptionFromStacktrace(stacktrace) {
      var frames = prepareFramesForEvent(stacktrace.stack), exception = {
        type: stacktrace.name,
        value: stacktrace.message
      };
      return frames && frames.length && (exception.stacktrace = {
        frames: frames
      }), void 0 === exception.type && "" === exception.value && (exception.value = "Unrecoverable error caught"), 
      exception;
    }
    function eventFromPlainObject(exception, syntheticException, rejection) {
      var event = {
        exception: {
          values: [ {
            type: _utils.isEvent(exception) ? exception.constructor.name : rejection ? "UnhandledRejection" : "Error",
            value: "Non-Error " + (rejection ? "promise rejection" : "exception") + " captured with keys: " + _utils.extractExceptionKeysForMessage(exception)
          } ]
        },
        extra: {
          __serialized__: _utils.normalizeToSize(exception)
        }
      };
      if (syntheticException) {
        var frames_1 = prepareFramesForEvent(_tracekit.computeStackTrace(syntheticException).stack);
        event.stacktrace = {
          frames: frames_1
        };
      }
      return event;
    }
    function eventFromStacktrace(stacktrace) {
      return {
        exception: {
          values: [ exceptionFromStacktrace(stacktrace) ]
        }
      };
    }
    function prepareFramesForEvent(stack) {
      if (!stack || !stack.length) return [];
      var localStack = stack, firstFrameFunction = localStack[0].func || "", lastFrameFunction = localStack[localStack.length - 1].func || "";
      return -1 === firstFrameFunction.indexOf("captureMessage") && -1 === firstFrameFunction.indexOf("captureException") || (localStack = localStack.slice(1)), 
      -1 !== lastFrameFunction.indexOf("sentryWrapped") && (localStack = localStack.slice(0, -1)), 
      localStack.slice(0, 50).map((function(frame) {
        return {
          colno: null === frame.column ? void 0 : frame.column,
          filename: frame.url || localStack[0].url,
          function: frame.func || "?",
          in_app: !0,
          lineno: null === frame.line ? void 0 : frame.line
        };
      })).reverse();
    }
  }, {
    "@sentry/utils": "gda2Z",
    "./tracekit": "gRwyq",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  gRwyq: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "computeStackTrace", (() => computeStackTrace));
    var _tslib = require("tslib"), chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, reactMinifiedRegexp = /Minified React error #\d+;/i;
    function computeStackTrace(ex) {
      var stack = null, popSize = 0;
      ex && ("number" == typeof ex.framesToPop ? popSize = ex.framesToPop : reactMinifiedRegexp.test(ex.message) && (popSize = 1));
      try {
        if (stack = function(ex) {
          if (!ex || !ex.stacktrace) return null;
          for (var parts, stacktrace = ex.stacktrace, opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i, lines = stacktrace.split("\n"), stack = [], line = 0; line < lines.length; line += 2) {
            var element = null;
            (parts = opera10Regex.exec(lines[line])) ? element = {
              url: parts[2],
              func: parts[3],
              args: [],
              line: +parts[1],
              column: null
            } : (parts = opera11Regex.exec(lines[line])) && (element = {
              url: parts[6],
              func: parts[3] || parts[4],
              args: parts[5] ? parts[5].split(",") : [],
              line: +parts[1],
              column: +parts[2]
            }), element && (!element.func && element.line && (element.func = "?"), stack.push(element));
          }
          return stack.length ? {
            message: extractMessage(ex),
            name: ex.name,
            stack: stack
          } : null;
        }(ex)) return popFrames(stack, popSize);
      } catch (e) {}
      try {
        if (stack = function(ex) {
          if (!ex || !ex.stack) return null;
          for (var submatch, parts, element, stack = [], lines = ex.stack.split("\n"), i = 0; i < lines.length; ++i) {
            if (parts = chrome.exec(lines[i])) {
              var isNative = parts[2] && 0 === parts[2].indexOf("native");
              parts[2] && 0 === parts[2].indexOf("eval") && (submatch = chromeEval.exec(parts[2])) && (parts[2] = submatch[1], 
              parts[3] = submatch[2], parts[4] = submatch[3]), element = {
                url: parts[2] && 0 === parts[2].indexOf("address at ") ? parts[2].substr(11) : parts[2],
                func: parts[1] || "?",
                args: isNative ? [ parts[2] ] : [],
                line: parts[3] ? +parts[3] : null,
                column: parts[4] ? +parts[4] : null
              };
            } else if (parts = winjs.exec(lines[i])) element = {
              url: parts[2],
              func: parts[1] || "?",
              args: [],
              line: +parts[3],
              column: parts[4] ? +parts[4] : null
            }; else {
              if (!(parts = gecko.exec(lines[i]))) continue;
              parts[3] && parts[3].indexOf(" > eval") > -1 && (submatch = geckoEval.exec(parts[3])) ? (parts[1] = parts[1] || "eval", 
              parts[3] = submatch[1], parts[4] = submatch[2], parts[5] = "") : 0 !== i || parts[5] || void 0 === ex.columnNumber || (stack[0].column = ex.columnNumber + 1), 
              element = {
                url: parts[3],
                func: parts[1] || "?",
                args: parts[2] ? parts[2].split(",") : [],
                line: parts[4] ? +parts[4] : null,
                column: parts[5] ? +parts[5] : null
              };
            }
            !element.func && element.line && (element.func = "?"), stack.push(element);
          }
          return stack.length ? {
            message: extractMessage(ex),
            name: ex.name,
            stack: stack
          } : null;
        }(ex)) return popFrames(stack, popSize);
      } catch (e) {}
      return {
        message: extractMessage(ex),
        name: ex && ex.name,
        stack: [],
        failed: !0
      };
    }
    function popFrames(stacktrace, popSize) {
      try {
        return _tslib.__assign(_tslib.__assign({}, stacktrace), {
          stack: stacktrace.stack.slice(popSize)
        });
      } catch (e) {
        return stacktrace;
      }
    }
    function extractMessage(ex) {
      var message = ex && ex.message;
      return message ? message.error && "string" == typeof message.error.message ? message.error.message : message : "No error message";
    }
  }, {
    tslib: "eEuCs",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  c53MC: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "BaseTransport", (() => _base.BaseTransport)), 
    parcelHelpers.export(exports, "FetchTransport", (() => _fetch.FetchTransport)), 
    parcelHelpers.export(exports, "XHRTransport", (() => _xhr.XHRTransport));
    var _base = require("./base"), _fetch = require("./fetch"), _xhr = require("./xhr");
  }, {
    "./base": "6Cov9",
    "./fetch": "guwvf",
    "./xhr": "jG78I",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "6Cov9": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "BaseTransport", (() => BaseTransport));
    var _tslib = require("tslib"), _core = require("@sentry/core"), _types = require("@sentry/types"), _utils = require("@sentry/utils"), BaseTransport = function() {
      function BaseTransport1(options) {
        this.options = options, this._buffer = new _utils.PromiseBuffer(30), this._rateLimits = {}, 
        this._api = new _core.API(this.options.dsn), this.url = this._api.getStoreEndpointWithUrlEncodedAuth();
      }
      return BaseTransport1.prototype.sendEvent = function(_) {
        throw new _utils.SentryError("Transport Class has to implement `sendEvent` method");
      }, BaseTransport1.prototype.close = function(timeout) {
        return this._buffer.drain(timeout);
      }, BaseTransport1.prototype._handleResponse = function(_a) {
        var requestType = _a.requestType, response = _a.response, headers = _a.headers, resolve = _a.resolve, reject = _a.reject, status = _types.Status.fromHttpCode(response.status);
        this._handleRateLimit(headers) && _utils.logger.warn("Too many requests, backing off until: " + this._disabledUntil(requestType)), 
        status !== _types.Status.Success ? reject(response) : resolve({
          status: status
        });
      }, BaseTransport1.prototype._disabledUntil = function(category) {
        return this._rateLimits[category] || this._rateLimits.all;
      }, BaseTransport1.prototype._isRateLimited = function(category) {
        return this._disabledUntil(category) > new Date(Date.now());
      }, BaseTransport1.prototype._handleRateLimit = function(headers) {
        var e_1, _a, e_2, _b, now = Date.now(), rlHeader = headers["x-sentry-rate-limits"], raHeader = headers["retry-after"];
        if (rlHeader) {
          try {
            for (var _c = _tslib.__values(rlHeader.trim().split(",")), _d = _c.next(); !_d.done; _d = _c.next()) {
              var parameters = _d.value.split(":", 2), headerDelay = parseInt(parameters[0], 10), delay = 1e3 * (isNaN(headerDelay) ? 60 : headerDelay);
              try {
                for (var _e = (e_2 = void 0, _tslib.__values(parameters[1].split(";"))), _f = _e.next(); !_f.done; _f = _e.next()) {
                  var category = _f.value;
                  this._rateLimits[category || "all"] = new Date(now + delay);
                }
              } catch (e_2_1) {
                e_2 = {
                  error: e_2_1
                };
              } finally {
                try {
                  _f && !_f.done && (_b = _e.return) && _b.call(_e);
                } finally {
                  if (e_2) throw e_2.error;
                }
              }
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              _d && !_d.done && (_a = _c.return) && _a.call(_c);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          return !0;
        }
        return !!raHeader && (this._rateLimits.all = new Date(now + _utils.parseRetryAfterHeader(now, raHeader)), 
        !0);
      }, BaseTransport1;
    }();
  }, {
    tslib: "eEuCs",
    "@sentry/core": "fctce",
    "@sentry/types": "2Tlfl",
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  guwvf: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "FetchTransport", (() => FetchTransport1));
    var _tslib = require("tslib"), _core = require("@sentry/core"), _utils = require("@sentry/utils"), _base = require("./base"), global = _utils.getGlobalObject(), FetchTransport1 = function(_super) {
      function FetchTransport2() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      return _tslib.__extends(FetchTransport2, _super), FetchTransport2.prototype.sendEvent = function(event) {
        return this._sendRequest(_core.eventToSentryRequest(event, this._api), event);
      }, FetchTransport2.prototype.sendSession = function(session) {
        return this._sendRequest(_core.sessionToSentryRequest(session, this._api), session);
      }, FetchTransport2.prototype._sendRequest = function(sentryRequest, originalPayload) {
        var _this = this;
        if (this._isRateLimited(sentryRequest.type)) return Promise.reject({
          event: originalPayload,
          type: sentryRequest.type,
          reason: "Transport locked till " + this._disabledUntil(sentryRequest.type) + " due to too many requests.",
          status: 429
        });
        var options = {
          body: sentryRequest.body,
          method: "POST",
          referrerPolicy: _utils.supportsReferrerPolicy() ? "origin" : ""
        };
        return void 0 !== this.options.fetchParameters && Object.assign(options, this.options.fetchParameters), 
        void 0 !== this.options.headers && (options.headers = this.options.headers), this._buffer.add(new _utils.SyncPromise((function(resolve, reject) {
          global.fetch(sentryRequest.url, options).then((function(response) {
            var headers = {
              "x-sentry-rate-limits": response.headers.get("X-Sentry-Rate-Limits"),
              "retry-after": response.headers.get("Retry-After")
            };
            _this._handleResponse({
              requestType: sentryRequest.type,
              response: response,
              headers: headers,
              resolve: resolve,
              reject: reject
            });
          })).catch(reject);
        })));
      }, FetchTransport2;
    }(_base.BaseTransport);
  }, {
    tslib: "eEuCs",
    "@sentry/core": "fctce",
    "@sentry/utils": "gda2Z",
    "./base": "6Cov9",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  jG78I: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "XHRTransport", (() => XHRTransport1));
    var _tslib = require("tslib"), _core = require("@sentry/core"), _utils = require("@sentry/utils"), XHRTransport1 = function(_super) {
      function XHRTransport2() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      return _tslib.__extends(XHRTransport2, _super), XHRTransport2.prototype.sendEvent = function(event) {
        return this._sendRequest(_core.eventToSentryRequest(event, this._api), event);
      }, XHRTransport2.prototype.sendSession = function(session) {
        return this._sendRequest(_core.sessionToSentryRequest(session, this._api), session);
      }, XHRTransport2.prototype._sendRequest = function(sentryRequest, originalPayload) {
        var _this = this;
        return this._isRateLimited(sentryRequest.type) ? Promise.reject({
          event: originalPayload,
          type: sentryRequest.type,
          reason: "Transport locked till " + this._disabledUntil(sentryRequest.type) + " due to too many requests.",
          status: 429
        }) : this._buffer.add(new _utils.SyncPromise((function(resolve, reject) {
          var request = new XMLHttpRequest;
          for (var header in request.onreadystatechange = function() {
            if (4 === request.readyState) {
              var headers = {
                "x-sentry-rate-limits": request.getResponseHeader("X-Sentry-Rate-Limits"),
                "retry-after": request.getResponseHeader("Retry-After")
              };
              _this._handleResponse({
                requestType: sentryRequest.type,
                response: request,
                headers: headers,
                resolve: resolve,
                reject: reject
              });
            }
          }, request.open("POST", sentryRequest.url), _this.options.headers) _this.options.headers.hasOwnProperty(header) && request.setRequestHeader(header, _this.options.headers[header]);
          request.send(sentryRequest.body);
        })));
      }, XHRTransport2;
    }(require("./base").BaseTransport);
  }, {
    tslib: "eEuCs",
    "@sentry/core": "fctce",
    "@sentry/utils": "gda2Z",
    "./base": "6Cov9",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  eeNY6: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "shouldIgnoreOnError", (() => shouldIgnoreOnError)), 
    parcelHelpers.export(exports, "ignoreNextOnError", (() => ignoreNextOnError)), parcelHelpers.export(exports, "wrap", (() => wrap)), 
    parcelHelpers.export(exports, "injectReportDialog", (() => injectReportDialog));
    var _tslib = require("tslib"), _core = require("@sentry/core"), _utils = require("@sentry/utils"), ignoreOnError = 0;
    function shouldIgnoreOnError() {
      return ignoreOnError > 0;
    }
    function ignoreNextOnError() {
      ignoreOnError += 1, setTimeout((function() {
        ignoreOnError -= 1;
      }));
    }
    function wrap(fn, options, before) {
      if (void 0 === options && (options = {}), "function" != typeof fn) return fn;
      try {
        if (fn.__sentry__) return fn;
        if (fn.__sentry_wrapped__) return fn.__sentry_wrapped__;
      } catch (e) {
        return fn;
      }
      var sentryWrapped = function() {
        var args = Array.prototype.slice.call(arguments);
        try {
          before && "function" == typeof before && before.apply(this, arguments);
          var wrappedArguments = args.map((function(arg) {
            return wrap(arg, options);
          }));
          return fn.handleEvent ? fn.handleEvent.apply(this, wrappedArguments) : fn.apply(this, wrappedArguments);
        } catch (ex) {
          throw ignoreNextOnError(), _core.withScope((function(scope) {
            scope.addEventProcessor((function(event) {
              var processedEvent = _tslib.__assign({}, event);
              return options.mechanism && (_utils.addExceptionTypeValue(processedEvent, void 0, void 0), 
              _utils.addExceptionMechanism(processedEvent, options.mechanism)), processedEvent.extra = _tslib.__assign(_tslib.__assign({}, processedEvent.extra), {
                arguments: args
              }), processedEvent;
            })), _core.captureException(ex);
          })), ex;
        }
      };
      try {
        for (var property in fn) Object.prototype.hasOwnProperty.call(fn, property) && (sentryWrapped[property] = fn[property]);
      } catch (_oO) {}
      fn.prototype = fn.prototype || {}, sentryWrapped.prototype = fn.prototype, Object.defineProperty(fn, "__sentry_wrapped__", {
        enumerable: !1,
        value: sentryWrapped
      }), Object.defineProperties(sentryWrapped, {
        __sentry__: {
          enumerable: !1,
          value: !0
        },
        __sentry_original__: {
          enumerable: !1,
          value: fn
        }
      });
      try {
        Object.getOwnPropertyDescriptor(sentryWrapped, "name").configurable && Object.defineProperty(sentryWrapped, "name", {
          get: function() {
            return fn.name;
          }
        });
      } catch (_oO) {}
      return sentryWrapped;
    }
    function injectReportDialog(options) {
      if (void 0 === options && (options = {}), options.eventId) if (options.dsn) {
        var script = document.createElement("script");
        script.async = !0, script.src = new _core.API(options.dsn).getReportDialogEndpoint(options), 
        options.onLoad && (script.onload = options.onLoad), (document.head || document.body).appendChild(script);
      } else _utils.logger.error("Missing dsn option in showReportDialog call"); else _utils.logger.error("Missing eventId option in showReportDialog call");
    }
  }, {
    tslib: "eEuCs",
    "@sentry/core": "fctce",
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "9JGL8": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "GlobalHandlers", (() => _globalhandlers.GlobalHandlers)), 
    parcelHelpers.export(exports, "TryCatch", (() => _trycatch.TryCatch)), parcelHelpers.export(exports, "Breadcrumbs", (() => _breadcrumbs.Breadcrumbs)), 
    parcelHelpers.export(exports, "LinkedErrors", (() => _linkederrors.LinkedErrors)), 
    parcelHelpers.export(exports, "UserAgent", (() => _useragent.UserAgent));
    var _globalhandlers = require("./globalhandlers"), _trycatch = require("./trycatch"), _breadcrumbs = require("./breadcrumbs"), _linkederrors = require("./linkederrors"), _useragent = require("./useragent");
  }, {
    "./globalhandlers": "jg4qv",
    "./trycatch": "872x9",
    "./breadcrumbs": "63Io6",
    "./linkederrors": "6FaoY",
    "./useragent": "j1KM5",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  jg4qv: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "GlobalHandlers", (() => GlobalHandlers));
    var _tslib = require("tslib"), _core = require("@sentry/core"), _types = require("@sentry/types"), _utils = require("@sentry/utils"), _eventbuilder = require("../eventbuilder"), _helpers = require("../helpers"), GlobalHandlers = function() {
      function GlobalHandlers1(options) {
        this.name = GlobalHandlers1.id, this._onErrorHandlerInstalled = !1, this._onUnhandledRejectionHandlerInstalled = !1, 
        this._options = _tslib.__assign({
          onerror: !0,
          onunhandledrejection: !0
        }, options);
      }
      return GlobalHandlers1.prototype.setupOnce = function() {
        Error.stackTraceLimit = 50, this._options.onerror && (_utils.logger.log("Global Handler attached: onerror"), 
        this._installGlobalOnErrorHandler()), this._options.onunhandledrejection && (_utils.logger.log("Global Handler attached: onunhandledrejection"), 
        this._installGlobalOnUnhandledRejectionHandler());
      }, GlobalHandlers1.prototype._installGlobalOnErrorHandler = function() {
        var _this = this;
        this._onErrorHandlerInstalled || (_utils.addInstrumentationHandler({
          callback: function(data) {
            var error = data.error, currentHub = _core.getCurrentHub(), hasIntegration = currentHub.getIntegration(GlobalHandlers1), isFailedOwnDelivery = error && !0 === error.__sentry_own_request__;
            if (hasIntegration && !_helpers.shouldIgnoreOnError() && !isFailedOwnDelivery) {
              var client = currentHub.getClient(), event = _utils.isPrimitive(error) ? _this._eventFromIncompleteOnError(data.msg, data.url, data.line, data.column) : _this._enhanceEventWithInitialFrame(_eventbuilder.eventFromUnknownInput(error, void 0, {
                attachStacktrace: client && client.getOptions().attachStacktrace,
                rejection: !1
              }), data.url, data.line, data.column);
              _utils.addExceptionMechanism(event, {
                handled: !1,
                type: "onerror"
              }), currentHub.captureEvent(event, {
                originalException: error
              });
            }
          },
          type: "error"
        }), this._onErrorHandlerInstalled = !0);
      }, GlobalHandlers1.prototype._installGlobalOnUnhandledRejectionHandler = function() {
        var _this = this;
        this._onUnhandledRejectionHandlerInstalled || (_utils.addInstrumentationHandler({
          callback: function(e) {
            var error = e;
            try {
              "reason" in e ? error = e.reason : "detail" in e && "reason" in e.detail && (error = e.detail.reason);
            } catch (_oO) {}
            var currentHub = _core.getCurrentHub(), hasIntegration = currentHub.getIntegration(GlobalHandlers1), isFailedOwnDelivery = error && !0 === error.__sentry_own_request__;
            if (!hasIntegration || _helpers.shouldIgnoreOnError() || isFailedOwnDelivery) return !0;
            var client = currentHub.getClient(), event = _utils.isPrimitive(error) ? _this._eventFromRejectionWithPrimitive(error) : _eventbuilder.eventFromUnknownInput(error, void 0, {
              attachStacktrace: client && client.getOptions().attachStacktrace,
              rejection: !0
            });
            event.level = _types.Severity.Error, _utils.addExceptionMechanism(event, {
              handled: !1,
              type: "onunhandledrejection"
            }), currentHub.captureEvent(event, {
              originalException: error
            });
          },
          type: "unhandledrejection"
        }), this._onUnhandledRejectionHandlerInstalled = !0);
      }, GlobalHandlers1.prototype._eventFromIncompleteOnError = function(msg, url, line, column) {
        var name, message = _utils.isErrorEvent(msg) ? msg.message : msg;
        if (_utils.isString(message)) {
          var groups = message.match(/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i);
          groups && (name = groups[1], message = groups[2]);
        }
        var event = {
          exception: {
            values: [ {
              type: name || "Error",
              value: message
            } ]
          }
        };
        return this._enhanceEventWithInitialFrame(event, url, line, column);
      }, GlobalHandlers1.prototype._eventFromRejectionWithPrimitive = function(reason) {
        return {
          exception: {
            values: [ {
              type: "UnhandledRejection",
              value: "Non-Error promise rejection captured with value: " + String(reason)
            } ]
          }
        };
      }, GlobalHandlers1.prototype._enhanceEventWithInitialFrame = function(event, url, line, column) {
        event.exception = event.exception || {}, event.exception.values = event.exception.values || [], 
        event.exception.values[0] = event.exception.values[0] || {}, event.exception.values[0].stacktrace = event.exception.values[0].stacktrace || {}, 
        event.exception.values[0].stacktrace.frames = event.exception.values[0].stacktrace.frames || [];
        var colno = isNaN(parseInt(column, 10)) ? void 0 : column, lineno = isNaN(parseInt(line, 10)) ? void 0 : line, filename = _utils.isString(url) && url.length > 0 ? url : _utils.getLocationHref();
        return 0 === event.exception.values[0].stacktrace.frames.length && event.exception.values[0].stacktrace.frames.push({
          colno: colno,
          filename: filename,
          function: "?",
          in_app: !0,
          lineno: lineno
        }), event;
      }, GlobalHandlers1.id = "GlobalHandlers", GlobalHandlers1;
    }();
  }, {
    tslib: "eEuCs",
    "@sentry/core": "fctce",
    "@sentry/types": "2Tlfl",
    "@sentry/utils": "gda2Z",
    "../eventbuilder": "4kSuP",
    "../helpers": "eeNY6",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "872x9": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "TryCatch", (() => TryCatch));
    var _tslib = require("tslib"), _utils = require("@sentry/utils"), _helpers = require("../helpers"), DEFAULT_EVENT_TARGET = [ "EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload" ], TryCatch = function() {
      function TryCatch1(options) {
        this.name = TryCatch1.id, this._options = _tslib.__assign({
          XMLHttpRequest: !0,
          eventTarget: !0,
          requestAnimationFrame: !0,
          setInterval: !0,
          setTimeout: !0
        }, options);
      }
      return TryCatch1.prototype.setupOnce = function() {
        var global = _utils.getGlobalObject();
        (this._options.setTimeout && _utils.fill(global, "setTimeout", this._wrapTimeFunction.bind(this)), 
        this._options.setInterval && _utils.fill(global, "setInterval", this._wrapTimeFunction.bind(this)), 
        this._options.requestAnimationFrame && _utils.fill(global, "requestAnimationFrame", this._wrapRAF.bind(this)), 
        this._options.XMLHttpRequest && "XMLHttpRequest" in global && _utils.fill(XMLHttpRequest.prototype, "send", this._wrapXHR.bind(this)), 
        this._options.eventTarget) && (Array.isArray(this._options.eventTarget) ? this._options.eventTarget : DEFAULT_EVENT_TARGET).forEach(this._wrapEventTarget.bind(this));
      }, TryCatch1.prototype._wrapTimeFunction = function(original) {
        return function() {
          for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
          var originalCallback = args[0];
          return args[0] = _helpers.wrap(originalCallback, {
            mechanism: {
              data: {
                function: _utils.getFunctionName(original)
              },
              handled: !0,
              type: "instrument"
            }
          }), original.apply(this, args);
        };
      }, TryCatch1.prototype._wrapRAF = function(original) {
        return function(callback) {
          return original.call(this, _helpers.wrap(callback, {
            mechanism: {
              data: {
                function: "requestAnimationFrame",
                handler: _utils.getFunctionName(original)
              },
              handled: !0,
              type: "instrument"
            }
          }));
        };
      }, TryCatch1.prototype._wrapEventTarget = function(target) {
        var global = _utils.getGlobalObject(), proto = global[target] && global[target].prototype;
        proto && proto.hasOwnProperty && proto.hasOwnProperty("addEventListener") && (_utils.fill(proto, "addEventListener", (function(original) {
          return function(eventName, fn, options) {
            try {
              "function" == typeof fn.handleEvent && (fn.handleEvent = _helpers.wrap(fn.handleEvent.bind(fn), {
                mechanism: {
                  data: {
                    function: "handleEvent",
                    handler: _utils.getFunctionName(fn),
                    target: target
                  },
                  handled: !0,
                  type: "instrument"
                }
              }));
            } catch (err) {}
            return original.call(this, eventName, _helpers.wrap(fn, {
              mechanism: {
                data: {
                  function: "addEventListener",
                  handler: _utils.getFunctionName(fn),
                  target: target
                },
                handled: !0,
                type: "instrument"
              }
            }), options);
          };
        })), _utils.fill(proto, "removeEventListener", (function(originalRemoveEventListener) {
          return function(eventName, fn, options) {
            var _a, wrappedEventHandler = fn;
            try {
              var originalEventHandler = null === (_a = wrappedEventHandler) || void 0 === _a ? void 0 : _a.__sentry_wrapped__;
              originalEventHandler && originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
            } catch (e) {}
            return originalRemoveEventListener.call(this, eventName, wrappedEventHandler, options);
          };
        })));
      }, TryCatch1.prototype._wrapXHR = function(originalSend) {
        return function() {
          for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
          var xhr = this, xmlHttpRequestProps = [ "onload", "onerror", "onprogress", "onreadystatechange" ];
          return xmlHttpRequestProps.forEach((function(prop) {
            prop in xhr && "function" == typeof xhr[prop] && _utils.fill(xhr, prop, (function(original) {
              var wrapOptions = {
                mechanism: {
                  data: {
                    function: prop,
                    handler: _utils.getFunctionName(original)
                  },
                  handled: !0,
                  type: "instrument"
                }
              };
              return original.__sentry_original__ && (wrapOptions.mechanism.data.handler = _utils.getFunctionName(original.__sentry_original__)), 
              _helpers.wrap(original, wrapOptions);
            }));
          })), originalSend.apply(this, args);
        };
      }, TryCatch1.id = "TryCatch", TryCatch1;
    }();
  }, {
    tslib: "eEuCs",
    "@sentry/utils": "gda2Z",
    "../helpers": "eeNY6",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "63Io6": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Breadcrumbs", (() => Breadcrumbs));
    var _tslib = require("tslib"), _core = require("@sentry/core"), _types = require("@sentry/types"), _utils = require("@sentry/utils"), Breadcrumbs = function() {
      function Breadcrumbs1(options) {
        this.name = Breadcrumbs1.id, this._options = _tslib.__assign({
          console: !0,
          dom: !0,
          fetch: !0,
          history: !0,
          sentry: !0,
          xhr: !0
        }, options);
      }
      return Breadcrumbs1.prototype.addSentryBreadcrumb = function(event) {
        this._options.sentry && _core.getCurrentHub().addBreadcrumb({
          category: "sentry." + ("transaction" === event.type ? "transaction" : "event"),
          event_id: event.event_id,
          level: event.level,
          message: _utils.getEventDescription(event)
        }, {
          event: event
        });
      }, Breadcrumbs1.prototype.setupOnce = function() {
        var _this = this;
        this._options.console && _utils.addInstrumentationHandler({
          callback: function() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            _this._consoleBreadcrumb.apply(_this, _tslib.__spread(args));
          },
          type: "console"
        }), this._options.dom && _utils.addInstrumentationHandler({
          callback: function() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            _this._domBreadcrumb.apply(_this, _tslib.__spread(args));
          },
          type: "dom"
        }), this._options.xhr && _utils.addInstrumentationHandler({
          callback: function() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            _this._xhrBreadcrumb.apply(_this, _tslib.__spread(args));
          },
          type: "xhr"
        }), this._options.fetch && _utils.addInstrumentationHandler({
          callback: function() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            _this._fetchBreadcrumb.apply(_this, _tslib.__spread(args));
          },
          type: "fetch"
        }), this._options.history && _utils.addInstrumentationHandler({
          callback: function() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            _this._historyBreadcrumb.apply(_this, _tslib.__spread(args));
          },
          type: "history"
        });
      }, Breadcrumbs1.prototype._consoleBreadcrumb = function(handlerData) {
        var breadcrumb = {
          category: "console",
          data: {
            arguments: handlerData.args,
            logger: "console"
          },
          level: _types.Severity.fromString(handlerData.level),
          message: _utils.safeJoin(handlerData.args, " ")
        };
        if ("assert" === handlerData.level) {
          if (!1 !== handlerData.args[0]) return;
          breadcrumb.message = "Assertion failed: " + (_utils.safeJoin(handlerData.args.slice(1), " ") || "console.assert"), 
          breadcrumb.data.arguments = handlerData.args.slice(1);
        }
        _core.getCurrentHub().addBreadcrumb(breadcrumb, {
          input: handlerData.args,
          level: handlerData.level
        });
      }, Breadcrumbs1.prototype._domBreadcrumb = function(handlerData) {
        var target;
        try {
          target = handlerData.event.target ? _utils.htmlTreeAsString(handlerData.event.target) : _utils.htmlTreeAsString(handlerData.event);
        } catch (e) {
          target = "<unknown>";
        }
        0 !== target.length && _core.getCurrentHub().addBreadcrumb({
          category: "ui." + handlerData.name,
          message: target
        }, {
          event: handlerData.event,
          name: handlerData.name
        });
      }, Breadcrumbs1.prototype._xhrBreadcrumb = function(handlerData) {
        if (handlerData.endTimestamp) {
          if (handlerData.xhr.__sentry_own_request__) return;
          var _a = handlerData.xhr.__sentry_xhr__ || {}, method = _a.method, url = _a.url, status_code = _a.status_code, body = _a.body;
          _core.getCurrentHub().addBreadcrumb({
            category: "xhr",
            data: {
              method: method,
              url: url,
              status_code: status_code
            },
            type: "http"
          }, {
            xhr: handlerData.xhr,
            input: body
          });
        } else ;
      }, Breadcrumbs1.prototype._fetchBreadcrumb = function(handlerData) {
        handlerData.endTimestamp && (handlerData.fetchData.url.match(/sentry_key/) && "POST" === handlerData.fetchData.method || (handlerData.error ? _core.getCurrentHub().addBreadcrumb({
          category: "fetch",
          data: handlerData.fetchData,
          level: _types.Severity.Error,
          type: "http"
        }, {
          data: handlerData.error,
          input: handlerData.args
        }) : _core.getCurrentHub().addBreadcrumb({
          category: "fetch",
          data: _tslib.__assign(_tslib.__assign({}, handlerData.fetchData), {
            status_code: handlerData.response.status
          }),
          type: "http"
        }, {
          input: handlerData.args,
          response: handlerData.response
        })));
      }, Breadcrumbs1.prototype._historyBreadcrumb = function(handlerData) {
        var global = _utils.getGlobalObject(), from = handlerData.from, to = handlerData.to, parsedLoc = _utils.parseUrl(global.location.href), parsedFrom = _utils.parseUrl(from), parsedTo = _utils.parseUrl(to);
        parsedFrom.path || (parsedFrom = parsedLoc), parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host && (to = parsedTo.relative), 
        parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host && (from = parsedFrom.relative), 
        _core.getCurrentHub().addBreadcrumb({
          category: "navigation",
          data: {
            from: from,
            to: to
          }
        });
      }, Breadcrumbs1.id = "Breadcrumbs", Breadcrumbs1;
    }();
  }, {
    tslib: "eEuCs",
    "@sentry/core": "fctce",
    "@sentry/types": "2Tlfl",
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "6FaoY": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "LinkedErrors", (() => LinkedErrors));
    var _tslib = require("tslib"), _core = require("@sentry/core"), _utils = require("@sentry/utils"), _parsers = require("../parsers"), _tracekit = require("../tracekit"), LinkedErrors = function() {
      function LinkedErrors1(options) {
        void 0 === options && (options = {}), this.name = LinkedErrors1.id, this._key = options.key || "cause", 
        this._limit = options.limit || 5;
      }
      return LinkedErrors1.prototype.setupOnce = function() {
        _core.addGlobalEventProcessor((function(event, hint) {
          var self = _core.getCurrentHub().getIntegration(LinkedErrors1);
          return self ? self._handler(event, hint) : event;
        }));
      }, LinkedErrors1.prototype._handler = function(event, hint) {
        if (!(event.exception && event.exception.values && hint && _utils.isInstanceOf(hint.originalException, Error))) return event;
        var linkedErrors = this._walkErrorTree(hint.originalException, this._key);
        return event.exception.values = _tslib.__spread(linkedErrors, event.exception.values), 
        event;
      }, LinkedErrors1.prototype._walkErrorTree = function(error, key, stack) {
        if (void 0 === stack && (stack = []), !_utils.isInstanceOf(error[key], Error) || stack.length + 1 >= this._limit) return stack;
        var stacktrace = _tracekit.computeStackTrace(error[key]), exception = _parsers.exceptionFromStacktrace(stacktrace);
        return this._walkErrorTree(error[key], key, _tslib.__spread([ exception ], stack));
      }, LinkedErrors1.id = "LinkedErrors", LinkedErrors1;
    }();
  }, {
    tslib: "eEuCs",
    "@sentry/core": "fctce",
    "@sentry/utils": "gda2Z",
    "../parsers": "lRgxc",
    "../tracekit": "gRwyq",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  j1KM5: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "UserAgent", (() => UserAgent));
    var _tslib = require("tslib"), _core = require("@sentry/core"), global = require("@sentry/utils").getGlobalObject(), UserAgent = function() {
      function UserAgent1() {
        this.name = UserAgent1.id;
      }
      return UserAgent1.prototype.setupOnce = function() {
        _core.addGlobalEventProcessor((function(event) {
          var _a, _b, _c;
          if (_core.getCurrentHub().getIntegration(UserAgent1)) {
            if (!global.navigator && !global.location && !global.document) return event;
            var url = (null === (_a = event.request) || void 0 === _a ? void 0 : _a.url) || (null === (_b = global.location) || void 0 === _b ? void 0 : _b.href), referrer = (global.document || {}).referrer, userAgent = (global.navigator || {}).userAgent, headers = _tslib.__assign(_tslib.__assign(_tslib.__assign({}, null === (_c = event.request) || void 0 === _c ? void 0 : _c.headers), referrer && {
              Referer: referrer
            }), userAgent && {
              "User-Agent": userAgent
            }), request = _tslib.__assign(_tslib.__assign({}, url && {
              url: url
            }), {
              headers: headers
            });
            return _tslib.__assign(_tslib.__assign({}, event), {
              request: request
            });
          }
          return event;
        }));
      }, UserAgent1.id = "UserAgent", UserAgent1;
    }();
  }, {
    tslib: "eEuCs",
    "@sentry/core": "fctce",
    "@sentry/utils": "gda2Z",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  in8FX: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "SDK_NAME", (() => SDK_NAME)), 
    parcelHelpers.export(exports, "SDK_VERSION", (() => SDK_VERSION));
    var SDK_NAME = "sentry.javascript.browser", SDK_VERSION = "5.30.0";
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  lJb5U: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "defaultIntegrations", (() => defaultIntegrations)), 
    parcelHelpers.export(exports, "init", (() => init)), parcelHelpers.export(exports, "showReportDialog", (() => showReportDialog)), 
    parcelHelpers.export(exports, "lastEventId", (() => lastEventId)), parcelHelpers.export(exports, "forceLoad", (() => forceLoad)), 
    parcelHelpers.export(exports, "onLoad", (() => onLoad)), parcelHelpers.export(exports, "flush", (() => flush)), 
    parcelHelpers.export(exports, "close", (() => close)), parcelHelpers.export(exports, "wrap", (() => wrap));
    var _core = require("@sentry/core"), _utils = require("@sentry/utils"), _client = require("./client"), _helpers = require("./helpers"), _integrations = require("./integrations"), defaultIntegrations = [ new _core.Integrations.InboundFilters, new _core.Integrations.FunctionToString, new _integrations.TryCatch, new _integrations.Breadcrumbs, new _integrations.GlobalHandlers, new _integrations.LinkedErrors, new _integrations.UserAgent ];
    function init(options) {
      if (void 0 === options && (options = {}), void 0 === options.defaultIntegrations && (options.defaultIntegrations = defaultIntegrations), 
      void 0 === options.release) {
        var window_1 = _utils.getGlobalObject();
        window_1.SENTRY_RELEASE && window_1.SENTRY_RELEASE.id && (options.release = window_1.SENTRY_RELEASE.id);
      }
      void 0 === options.autoSessionTracking && (options.autoSessionTracking = !1), _core.initAndBind(_client.BrowserClient, options), 
      options.autoSessionTracking && function() {
        var window = _utils.getGlobalObject(), hub = _core.getCurrentHub(), loadResolved = "complete" === document.readyState, fcpResolved = !1, possiblyEndSession = function() {
          fcpResolved && loadResolved && hub.endSession();
        }, resolveWindowLoaded = function() {
          loadResolved = !0, possiblyEndSession(), window.removeEventListener("load", resolveWindowLoaded);
        };
        hub.startSession(), loadResolved || window.addEventListener("load", resolveWindowLoaded);
        try {
          var po = new PerformanceObserver((function(entryList, po1) {
            entryList.getEntries().forEach((function(entry) {
              "first-contentful-paint" === entry.name && entry.startTime < firstHiddenTime_1 && (po1.disconnect(), 
              fcpResolved = !0, possiblyEndSession());
            }));
          })), firstHiddenTime_1 = "hidden" === document.visibilityState ? 0 : 1 / 0;
          document.addEventListener("visibilitychange", (function(event) {
            firstHiddenTime_1 = Math.min(firstHiddenTime_1, event.timeStamp);
          }), {
            once: !0
          }), po.observe({
            type: "paint",
            buffered: !0
          });
        } catch (e) {
          fcpResolved = !0, possiblyEndSession();
        }
      }();
    }
    function showReportDialog(options) {
      void 0 === options && (options = {}), options.eventId || (options.eventId = _core.getCurrentHub().lastEventId());
      var client = _core.getCurrentHub().getClient();
      client && client.showReportDialog(options);
    }
    function lastEventId() {
      return _core.getCurrentHub().lastEventId();
    }
    function forceLoad() {}
    function onLoad(callback) {
      callback();
    }
    function flush(timeout) {
      var client = _core.getCurrentHub().getClient();
      return client ? client.flush(timeout) : _utils.SyncPromise.reject(!1);
    }
    function close(timeout) {
      var client = _core.getCurrentHub().getClient();
      return client ? client.close(timeout) : _utils.SyncPromise.reject(!1);
    }
    function wrap(fn) {
      return _helpers.wrap(fn)();
    }
  }, {
    "@sentry/core": "fctce",
    "@sentry/utils": "gda2Z",
    "./client": "3seWe",
    "./helpers": "eeNY6",
    "./integrations": "9JGL8",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "8QxHi": [ function(require, module, exports) {
    var EventType, EventType1, VideoThumbnailType, VideoThumbnailType1, parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "EventType", (() => EventType)), 
    parcelHelpers.export(exports, "VideoThumbnailType", (() => VideoThumbnailType)), 
    (EventType1 = EventType || (EventType = {})).RegretVideo = "RegretVideo", EventType1.AuthRecorded = "AuthRecorded", 
    EventType1.SendVideoFeedback = "SendVideoFeedback", EventType1.VideoBatchRecorded = "VideoBatchRecorded", 
    EventType1.RegretDetailsSubmitted = "RegretDetailsSubmitted", EventType1.VideoViewed = "VideoViewed", 
    EventType1.NativeFeedbackSent = "NativeFeedbackSent", EventType1.VideoRegretted = "VideoRegretted", 
    (VideoThumbnailType1 = VideoThumbnailType || (VideoThumbnailType = {})).SidebarRecommendation = "SidebarRecommendation", 
    VideoThumbnailType1.HomePageRecommendation = "HomePageRecommendation", VideoThumbnailType1.Other = "OtherRecommendation";
  }, {
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  jKOy4: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "FeedbackType", (() => FeedbackType)), 
    parcelHelpers.export(exports, "FeedbackUiVariant", (() => FeedbackUiVariant)), parcelHelpers.export(exports, "ExperimentArm", (() => ExperimentArm)), 
    parcelHelpers.export(exports, "dispatchEventToTab", (() => dispatchEventToTab)), 
    parcelHelpers.export(exports, "dispatchSendFeedbackEvent", (() => dispatchSendFeedbackEvent)), 
    parcelHelpers.export(exports, "installationId", (() => installationId)), parcelHelpers.export(exports, "experimentArm", (() => experimentArm)), 
    parcelHelpers.export(exports, "feedbackUiVariant", (() => feedbackUiVariant)), parcelHelpers.export(exports, "installReason", (() => installReason)), 
    parcelHelpers.export(exports, "surveyReminderDate", (() => surveyReminderDate)), 
    parcelHelpers.export(exports, "allSurveysCompleted", (() => allSurveysCompleted)), 
    parcelHelpers.export(exports, "studyResultsClicked", (() => studyResultsClicked)), 
    parcelHelpers.export(exports, "onboardingCompleted", (() => onboardingCompleted)), 
    parcelHelpers.export(exports, "errorReportingEnabled", (() => errorReportingEnabled)), 
    parcelHelpers.export(exports, "onboardingReminderCount", (() => onboardingReminderCount)), 
    parcelHelpers.export(exports, "videosPlayedSet", (() => videosPlayedSet)), parcelHelpers.export(exports, "useErrorReportingToggle", (() => useErrorReportingToggle));
    var FeedbackType, FeedbackType1, FeedbackUiVariant, FeedbackUiVariant1, ExperimentArm, ExperimentArm1, _webextensionPolyfillTs = require("webextension-polyfill-ts"), _uuid = require("uuid"), _messages = require("./messages"), _storage = require("./storage"), _react = require("react");
    async function dispatchEventToTab(tabId, message) {
      await _webextensionPolyfillTs.browser.tabs.sendMessage(tabId, message);
    }
    async function dispatchSendFeedbackEvent({videoId: videoId, feedbackTokenNotInterested: feedbackTokenNotInterested, feedbackTokenNoRecommend: feedbackTokenNoRecommend, tabId: tabId}) {
      let feedbackToken, feedbackType = FeedbackType.Dislike;
      feedbackTokenNoRecommend ? (feedbackType = FeedbackType.NoRecommend, feedbackToken = feedbackTokenNoRecommend) : feedbackTokenNotInterested && (feedbackType = FeedbackType.NotInterested, 
      feedbackToken = feedbackTokenNotInterested), await dispatchEventToTab(tabId, {
        videoId: videoId,
        feedbackToken: feedbackToken,
        feedbackType: feedbackType,
        type: _messages.EventType.SendVideoFeedback
      }), alert("Feedback sent to YT tab");
    }
    (FeedbackType1 = FeedbackType || (FeedbackType = {})).Dislike = "dislike", FeedbackType1.NotInterested = "not_interested", 
    FeedbackType1.NoRecommend = "dont_recommend", FeedbackType1.RemoveFromHistory = "remove_from_history", 
    (FeedbackUiVariant1 = FeedbackUiVariant || (FeedbackUiVariant = {})).TellUsMore = "tell_use_more_variant", 
    FeedbackUiVariant1.ForcedModal = "forced_modal_variant", (ExperimentArm1 = ExperimentArm || (ExperimentArm = {})).DislikeAction = "dislike", 
    ExperimentArm1.NotInterestedAction = "not_interested", ExperimentArm1.NoRecommendAction = "dont_recommend", 
    ExperimentArm1.RemoveFromHistory = "remove_from_history", ExperimentArm1.NoAction = "control_with_ux", 
    ExperimentArm1.NoInject = "ux_control", ExperimentArm1.OptOut = "opt_out";
    const installationId = new _storage.StorageValue(_storage.localStorageKeys.installationId, _uuid.v4), experimentArm = new _storage.StorageValue(_storage.localStorageKeys.experimentArm, (() => {
      const arms = Object.values(ExperimentArm);
      var min, max;
      return arms[(min = 0, max = arms.length - 2, min = Math.ceil(min), max = Math.floor(max), 
      Math.floor(Math.random() * (max - min + 1)) + min)];
    })), feedbackUiVariant = new _storage.StorageValue(_storage.localStorageKeys.feedbackUiVariant, (() => FeedbackUiVariant.ForcedModal)), installReason = new _storage.StorageValue(_storage.localStorageKeys.installedAsUpdate, (() => "install")), surveyReminderDate = new _storage.StorageValue(_storage.localStorageKeys.surveyReminderDate, (() => null)), allSurveysCompleted = new _storage.StorageValue(_storage.localStorageKeys.allSurveysCompleted, (() => !1)), studyResultsClicked = new _storage.StorageValue(_storage.localStorageKeys.studyResultsClicked, (() => !1)), onboardingCompleted = new _storage.StorageValue(_storage.localStorageKeys.onboardingCompleted, (() => !1)), errorReportingEnabled = new _storage.StorageValue(_storage.localStorageKeys.errorReportingEnabled, (() => !1)), onboardingReminderCount = new _storage.StorageValue(_storage.localStorageKeys.onboardingReminderCount, (() => 2)), videosPlayedSet = new _storage.StorageValue(_storage.localStorageKeys.videosPlayedSet, (() => ({})));
    function useErrorReportingToggle() {
      const enabled = errorReportingEnabled.use(), [toggleOn, setToggleOn] = _react.useState(!1);
      return _react.useEffect((() => setToggleOn(!!enabled)), [ enabled ]), [ toggleOn, setToggleOn ];
    }
  }, {
    "webextension-polyfill-ts": "g4Zvj",
    uuid: "81aaC",
    "./messages": "8QxHi",
    "./storage": "4FzrO",
    react: "8Nzqg",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "4FzrO": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "acquireInstallationKey", (() => acquireInstallationKey)), 
    parcelHelpers.export(exports, "useExtensionState", (() => useExtensionState)), parcelHelpers.export(exports, "localStorageKeys", (() => localStorageKeys)), 
    parcelHelpers.export(exports, "StorageValue", (() => StorageValue));
    var _webextensionPolyfillTs = require("webextension-polyfill-ts"), _react = require("react"), _helpers = require("./helpers");
    async function acquireInstallationKey(key, valueGenerator) {
      const data = await _webextensionPolyfillTs.browser.storage.local.get(key), value = data ? data[key] : void 0;
      if (value) return value;
      const genValue = valueGenerator();
      return await _webextensionPolyfillTs.browser.storage.local.set({
        [key]: genValue
      }), genValue;
    }
    function useExtensionState(key, defaultValue) {
      const [value, setValue] = _react.useState(null), updateState = _react.useCallback(((val = defaultValue) => {
        const strVal = JSON.stringify(val);
        _webextensionPolyfillTs.browser.storage.local.set({
          [key]: strVal
        }).then((() => {
          setValue(val);
        }));
      }), [ setValue, defaultValue ]);
      return _webextensionPolyfillTs.browser.storage.local.get(key).then((data => {
        key in data ? setValue(JSON.parse(data[key])) : updateState(defaultValue);
      })), [ value, updateState ];
    }
    const localStorageKeys = {
      studyResultsClicked: "study_results_clicked",
      onboardingCompleted: "onboarding_completed",
      experimentOptedIn: "experiment_opted_in",
      installationId: "installation_id",
      experimentArm: "experiment_arm",
      feedbackUiVariant: "feedback_ui_variant",
      errorReportingEnabled: "error_reporting_enabled",
      installedAsUpdate: "installed_as_update",
      surveyReminderDate: "survey_reminder_date",
      allSurveysCompleted: "all_surveys_completed",
      videosPlayedSet: "videos_played_set",
      onboardingReminderCount: "onboarding_reminder_count"
    };
    class StorageValue {
      async reset() {
        return this.set(this.valueGenerator());
      }
      use() {
        const {value: value, execute: execute} = _helpers.useAsync(this.acquire, !0);
        return value;
      }
      constructor(key, valueGenerator) {
        this.key = key, this.valueGenerator = valueGenerator, this.acquire = async value => {
          const val = await acquireInstallationKey(this.key, (() => JSON.stringify(value || this.valueGenerator())));
          return JSON.parse(val);
        }, this.set = async value => (await _webextensionPolyfillTs.browser.storage.local.set({
          [this.key]: JSON.stringify(value)
        }), value);
      }
    }
  }, {
    "webextension-polyfill-ts": "g4Zvj",
    react: "8Nzqg",
    "./helpers": "hce4W",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "8Nzqg": [ function(require, module, exports) {
    "use strict";
    module.exports = require("./cjs/react.production.min.js");
  }, {
    "./cjs/react.production.min.js": "cNQ25"
  } ],
  cNQ25: [ function(require, module, exports) {
    /** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
    "use strict";
    var l = require("object-assign"), n = 60103, p = 60106;
    exports.Fragment = 60107, exports.StrictMode = 60108, exports.Profiler = 60114;
    var q = 60109, r = 60110, t = 60112;
    exports.Suspense = 60113;
    var u = 60115, v = 60116;
    if ("function" == typeof Symbol && Symbol.for) {
      var w = Symbol.for;
      n = w("react.element"), p = w("react.portal"), exports.Fragment = w("react.fragment"), 
      exports.StrictMode = w("react.strict_mode"), exports.Profiler = w("react.profiler"), 
      q = w("react.provider"), r = w("react.context"), t = w("react.forward_ref"), exports.Suspense = w("react.suspense"), 
      u = w("react.memo"), v = w("react.lazy");
    }
    var x = "function" == typeof Symbol && Symbol.iterator;
    function z(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var A = {
      isMounted: function() {
        return !1;
      },
      enqueueForceUpdate: function() {},
      enqueueReplaceState: function() {},
      enqueueSetState: function() {}
    }, B = {};
    function C(a, b, c) {
      this.props = a, this.context = b, this.refs = B, this.updater = c || A;
    }
    function D() {}
    function E(a, b, c) {
      this.props = a, this.context = b, this.refs = B, this.updater = c || A;
    }
    C.prototype.isReactComponent = {}, C.prototype.setState = function(a, b) {
      if ("object" != typeof a && "function" != typeof a && null != a) throw Error(z(85));
      this.updater.enqueueSetState(this, a, b, "setState");
    }, C.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    }, D.prototype = C.prototype;
    var F = E.prototype = new D;
    F.constructor = E, l(F, C.prototype), F.isPureReactComponent = !0;
    var G = {
      current: null
    }, H = Object.prototype.hasOwnProperty, I = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    };
    function J(a, b, c) {
      var e, d = {}, k = null, h = null;
      if (null != b) for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), 
      b) H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
      var g = arguments.length - 2;
      if (1 === g) d.children = c; else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
        d.children = f;
      }
      if (a && a.defaultProps) for (e in g = a.defaultProps) void 0 === d[e] && (d[e] = g[e]);
      return {
        $$typeof: n,
        type: a,
        key: k,
        ref: h,
        props: d,
        _owner: G.current
      };
    }
    function L(a) {
      return "object" == typeof a && null !== a && a.$$typeof === n;
    }
    var M = /\/+/g;
    function N(a, b) {
      return "object" == typeof a && null !== a && null != a.key ? function(a) {
        var b = {
          "=": "=0",
          ":": "=2"
        };
        return "$" + a.replace(/[=:]/g, (function(a1) {
          return b[a1];
        }));
      }("" + a.key) : b.toString(36);
    }
    function O(a, b, c, e, d) {
      var k = typeof a;
      "undefined" !== k && "boolean" !== k || (a = null);
      var h = !1;
      if (null === a) h = !0; else switch (k) {
       case "string":
       case "number":
        h = !0;
        break;

       case "object":
        switch (a.$$typeof) {
         case n:
         case p:
          h = !0;
        }
      }
      if (h) return d = d(h = a), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", 
      null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", (function(a1) {
        return a1;
      }))) : null != d && (L(d) && (d = function(a, b) {
        return {
          $$typeof: n,
          type: a.type,
          key: b,
          ref: a.ref,
          props: a.props,
          _owner: a._owner
        };
      }(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), 
      b.push(d)), 1;
      if (h = 0, e = "" === e ? "." : e + ":", Array.isArray(a)) for (var g = 0; g < a.length; g++) {
        var f = e + N(k = a[g], g);
        h += O(k, b, c, f, d);
      } else if ("function" == typeof (f = function(a) {
        return null === a || "object" != typeof a ? null : "function" == typeof (a = x && a[x] || a["@@iterator"]) ? a : null;
      }(a))) for (a = f.call(a), g = 0; !(k = a.next()).done; ) h += O(k = k.value, b, c, f = e + N(k, g++), d); else if ("object" === k) throw b = "" + a, 
      Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
      return h;
    }
    function P(a, b, c) {
      if (null == a) return a;
      var e = [], d = 0;
      return O(a, e, "", "", (function(a1) {
        return b.call(c, a1, d++);
      })), e;
    }
    function Q(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b(), a._status = 0, a._result = b, b.then((function(b1) {
          0 === a._status && (b1 = b1.default, a._status = 1, a._result = b1);
        }), (function(b1) {
          0 === a._status && (a._status = 2, a._result = b1);
        }));
      }
      if (1 === a._status) return a._result;
      throw a._result;
    }
    var R = {
      current: null
    };
    function S() {
      var a = R.current;
      if (null === a) throw Error(z(321));
      return a;
    }
    var T = {
      ReactCurrentDispatcher: R,
      ReactCurrentBatchConfig: {
        transition: 0
      },
      ReactCurrentOwner: G,
      IsSomeRendererActing: {
        current: !1
      },
      assign: l
    };
    exports.Children = {
      map: P,
      forEach: function(a, b, c) {
        P(a, (function() {
          b.apply(this, arguments);
        }), c);
      },
      count: function(a) {
        var b = 0;
        return P(a, (function() {
          b++;
        })), b;
      },
      toArray: function(a) {
        return P(a, (function(a1) {
          return a1;
        })) || [];
      },
      only: function(a) {
        if (!L(a)) throw Error(z(143));
        return a;
      }
    }, exports.Component = C, exports.PureComponent = E, exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T, 
    exports.cloneElement = function(a, b, c) {
      if (null == a) throw Error(z(267, a));
      var e = l({}, a.props), d = a.key, k = a.ref, h = a._owner;
      if (null != b) {
        if (void 0 !== b.ref && (k = b.ref, h = G.current), void 0 !== b.key && (d = "" + b.key), 
        a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for (f in b) H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (1 === f) e.children = c; else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
        e.children = g;
      }
      return {
        $$typeof: n,
        type: a.type,
        key: d,
        ref: k,
        props: e,
        _owner: h
      };
    }, exports.createContext = function(a, b) {
      return void 0 === b && (b = null), (a = {
        $$typeof: r,
        _calculateChangedBits: b,
        _currentValue: a,
        _currentValue2: a,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }).Provider = {
        $$typeof: q,
        _context: a
      }, a.Consumer = a;
    }, exports.createElement = J, exports.createFactory = function(a) {
      var b = J.bind(null, a);
      return b.type = a, b;
    }, exports.createRef = function() {
      return {
        current: null
      };
    }, exports.forwardRef = function(a) {
      return {
        $$typeof: t,
        render: a
      };
    }, exports.isValidElement = L, exports.lazy = function(a) {
      return {
        $$typeof: v,
        _payload: {
          _status: -1,
          _result: a
        },
        _init: Q
      };
    }, exports.memo = function(a, b) {
      return {
        $$typeof: u,
        type: a,
        compare: void 0 === b ? null : b
      };
    }, exports.useCallback = function(a, b) {
      return S().useCallback(a, b);
    }, exports.useContext = function(a, b) {
      return S().useContext(a, b);
    }, exports.useDebugValue = function() {}, exports.useEffect = function(a, b) {
      return S().useEffect(a, b);
    }, exports.useImperativeHandle = function(a, b, c) {
      return S().useImperativeHandle(a, b, c);
    }, exports.useLayoutEffect = function(a, b) {
      return S().useLayoutEffect(a, b);
    }, exports.useMemo = function(a, b) {
      return S().useMemo(a, b);
    }, exports.useReducer = function(a, b, c) {
      return S().useReducer(a, b, c);
    }, exports.useRef = function(a) {
      return S().useRef(a);
    }, exports.useState = function(a) {
      return S().useState(a);
    }, exports.version = "17.0.2";
  }, {
    "object-assign": "2MWk6"
  } ],
  "2MWk6": [ function(require, module, exports) {
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols, hasOwnProperty = Object.prototype.hasOwnProperty, propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (null == val) throw new TypeError("Object.assign cannot be called with null or undefined");
      return Object(val);
    }
    module.exports = function() {
      try {
        if (!Object.assign) return !1;
        if ("abc"[5] = "de", "5" === Object.getOwnPropertyNames("abc")[0]) return !1;
        for (var test2 = {}, i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
        if ("0123456789" !== Object.getOwnPropertyNames(test2).map((function(n) {
          return test2[n];
        })).join("")) return !1;
        var test3 = {};
        return "abcdefghijklmnopqrst".split("").forEach((function(letter) {
          test3[letter] = letter;
        })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, test3)).join("");
      } catch (err) {
        return !1;
      }
    }() ? Object.assign : function(target, source) {
      for (var from, symbols, to = toObject(target), s = 1; s < arguments.length; s++) {
        for (var key in from = Object(arguments[s])) hasOwnProperty.call(from, key) && (to[key] = from[key]);
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]]);
        }
      }
      return to;
    };
  }, {} ],
  hce4W: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "useAsync", (() => useAsync)), 
    parcelHelpers.export(exports, "getBackgroundScript", (() => getBackgroundScript)), 
    parcelHelpers.export(exports, "universalFetch", (() => universalFetch));
    var _react = require("react"), _webextensionPolyfillTs = require("webextension-polyfill-ts");
    const useAsync = (asyncFunction, immediate = !0) => {
      const [status, setStatus] = _react.useState("idle"), [value, setValue] = _react.useState(null), [error, setError] = _react.useState(null), execute = _react.useCallback((() => (setStatus("pending"), 
      setValue(null), setError(null), asyncFunction().then((response => {
        setValue(response), setStatus("success");
      })).catch((error1 => {
        setError(error1), setStatus("error");
      })))), [ asyncFunction ]);
      return _react.useEffect((() => {
        immediate && execute();
      }), [ execute, immediate ]), {
        execute: execute,
        status: status,
        value: value,
        error: error
      };
    };
    async function getBackgroundScript() {
      return (await _webextensionPolyfillTs.browser.runtime.getBackgroundPage()).window.bg;
    }
    const universalFetch = function(...args) {
      return _webextensionPolyfillTs.browser.runtime.getURL("").startsWith("moz-extension://") ? content.fetch(...args) : window.fetch(...args);
    };
  }, {
    react: "8Nzqg",
    "webextension-polyfill-ts": "g4Zvj",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "1smIR": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "onboardingCompleted", (() => onboardingCompleted)), 
    parcelHelpers.export(exports, "videoPlayed", (() => videoPlayed)), parcelHelpers.export(exports, "regretAction", (() => regretAction)), 
    parcelHelpers.export(exports, "nativeUiInteraction", (() => nativeUiInteraction)), 
    parcelHelpers.export(exports, "videoRecommended", (() => videoRecommended));
    var _event = require("@mozilla/glean/private/metrics/event"), _eventDefault = parcelHelpers.interopDefault(_event);
    const onboardingCompleted = new _eventDefault.default({
      category: "main",
      name: "onboarding_completed",
      sendInPings: [ "main-events" ],
      lifetime: "ping",
      disabled: !1
    }, []), videoPlayed = new _eventDefault.default({
      category: "main",
      name: "video_played",
      sendInPings: [ "main-events" ],
      lifetime: "ping",
      disabled: !1
    }, [ "videos_played" ]), regretAction = new _eventDefault.default({
      category: "main",
      name: "regret_action",
      sendInPings: [ "main-events" ],
      lifetime: "ping",
      disabled: !1
    }, [ "feedback_type", "video_data_id" ]), nativeUiInteraction = new _eventDefault.default({
      category: "main",
      name: "native_ui_interaction",
      sendInPings: [ "main-events" ],
      lifetime: "ping",
      disabled: !1
    }, [ "feedback_type", "video_data_id" ]), videoRecommended = new _eventDefault.default({
      category: "main",
      name: "video_recommended",
      sendInPings: [ "main-events" ],
      lifetime: "ping",
      disabled: !1
    }, [ "recommendation_type", "video_data_id" ]);
  }, {
    "@mozilla/glean/private/metrics/event": "1NVqI",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  dlnhC: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "feedbackUiVariant", (() => feedbackUiVariant)), 
    parcelHelpers.export(exports, "experimentArm", (() => experimentArm)), parcelHelpers.export(exports, "installationId", (() => installationId));
    var _string = require("@mozilla/glean/private/metrics/string"), _stringDefault = parcelHelpers.interopDefault(_string);
    const feedbackUiVariant = new _stringDefault.default({
      category: "metadata",
      name: "feedback_ui_variant",
      sendInPings: [ "main-events", "video-data" ],
      lifetime: "user",
      disabled: !1
    }), experimentArm = new _stringDefault.default({
      category: "metadata",
      name: "experiment_arm",
      sendInPings: [ "main-events", "video-data" ],
      lifetime: "user",
      disabled: !1
    }), installationId = new _stringDefault.default({
      category: "metadata",
      name: "installation_id",
      sendInPings: [ "main-events", "video-data" ],
      lifetime: "user",
      disabled: !1
    });
  }, {
    "@mozilla/glean/private/metrics/string": "dpEKZ",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "8Z6Mu": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "uuid", (() => uuid)), 
    parcelHelpers.export(exports, "id", (() => id)), parcelHelpers.export(exports, "title", (() => title)), 
    parcelHelpers.export(exports, "viewCount", (() => viewCount)), parcelHelpers.export(exports, "duration", (() => duration)), 
    parcelHelpers.export(exports, "description", (() => description)), parcelHelpers.export(exports, "postedDate", (() => postedDate)), 
    parcelHelpers.export(exports, "channelId", (() => channelId));
    var _string = require("@mozilla/glean/private/metrics/string"), _stringDefault = parcelHelpers.interopDefault(_string), _text = require("@mozilla/glean/private/metrics/text"), _textDefault = parcelHelpers.interopDefault(_text), _quantity = require("@mozilla/glean/private/metrics/quantity"), _quantityDefault = parcelHelpers.interopDefault(_quantity);
    const uuid = new _stringDefault.default({
      category: "video_data",
      name: "uuid",
      sendInPings: [ "video-data" ],
      lifetime: "ping",
      disabled: !1
    }), id = new _stringDefault.default({
      category: "video_data",
      name: "id",
      sendInPings: [ "video-data" ],
      lifetime: "ping",
      disabled: !1
    }), title = new _stringDefault.default({
      category: "video_data",
      name: "title",
      sendInPings: [ "video-data" ],
      lifetime: "ping",
      disabled: !1
    }), viewCount = new _stringDefault.default({
      category: "video_data",
      name: "view_count",
      sendInPings: [ "video-data" ],
      lifetime: "ping",
      disabled: !1
    }), duration = new _quantityDefault.default({
      category: "video_data",
      name: "duration",
      sendInPings: [ "video-data" ],
      lifetime: "ping",
      disabled: !1
    }), description = new _textDefault.default({
      category: "video_data",
      name: "description",
      sendInPings: [ "video-data" ],
      lifetime: "ping",
      disabled: !1
    }), postedDate = new _stringDefault.default({
      category: "video_data",
      name: "posted_date",
      sendInPings: [ "video-data" ],
      lifetime: "ping",
      disabled: !1
    }), channelId = new _stringDefault.default({
      category: "video_data",
      name: "channel_id",
      sendInPings: [ "video-data" ],
      lifetime: "ping",
      disabled: !1
    });
  }, {
    "@mozilla/glean/private/metrics/string": "dpEKZ",
    "@mozilla/glean/private/metrics/text": "9ML5U",
    "@mozilla/glean/private/metrics/quantity": "gH7TE",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "9ZqxO": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "videoDataId", (() => videoDataId)), 
    parcelHelpers.export(exports, "feedbackText", (() => feedbackText));
    var _string = require("@mozilla/glean/private/metrics/string"), _stringDefault = parcelHelpers.interopDefault(_string), _text = require("@mozilla/glean/private/metrics/text"), _textDefault = parcelHelpers.interopDefault(_text);
    const videoDataId = new _stringDefault.default({
      category: "regret_details",
      name: "video_data_id",
      sendInPings: [ "regret-details" ],
      lifetime: "ping",
      disabled: !1
    }), feedbackText = new _textDefault.default({
      category: "regret_details",
      name: "feedback_text",
      sendInPings: [ "regret-details" ],
      lifetime: "ping",
      disabled: !1
    });
  }, {
    "@mozilla/glean/private/metrics/string": "dpEKZ",
    "@mozilla/glean/private/metrics/text": "9ML5U",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  bGB7L: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "mainEvents", (() => mainEvents)), 
    parcelHelpers.export(exports, "regretDetails", (() => regretDetails)), parcelHelpers.export(exports, "videoData", (() => videoData));
    var _ping = require("@mozilla/glean/private/ping"), _pingDefault = parcelHelpers.interopDefault(_ping);
    const mainEvents = new _pingDefault.default({
      includeClientId: !0,
      sendIfEmpty: !1,
      name: "main-events",
      reasonCodes: []
    }), regretDetails = new _pingDefault.default({
      includeClientId: !0,
      sendIfEmpty: !1,
      name: "regret-details",
      reasonCodes: []
    }), videoData = new _pingDefault.default({
      includeClientId: !1,
      sendIfEmpty: !1,
      name: "video-data",
      reasonCodes: []
    });
  }, {
    "@mozilla/glean/private/ping": "ciomu",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "4v6Gb": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "extensionFeedbackUrl", (() => extensionFeedbackUrl)), 
    parcelHelpers.export(exports, "abuseReportingPlatformUrl", (() => abuseReportingPlatformUrl)), 
    parcelHelpers.export(exports, "surveyUrl", (() => surveyUrl)), parcelHelpers.export(exports, "reminderSurveyUrl", (() => reminderSurveyUrl)), 
    parcelHelpers.export(exports, "privacyNoticeUrl", (() => privacyNoticeUrl)), parcelHelpers.export(exports, "experimentGroupsUrl", (() => experimentGroupsUrl)), 
    parcelHelpers.export(exports, "onboardingUrl", (() => onboardingUrl)), parcelHelpers.export(exports, "studyResultsUrl", (() => studyResultsUrl));
    var _webextensionPolyfillTs = require("webextension-polyfill-ts");
    const extensionFeedbackUrl = "https://qsurvey.mozilla.com/s3/regrets-reporter-product-feedback", abuseReportingPlatformUrl = "https://support.google.com/youtube/answer/2802027", surveyUrl = "https://mozillafoundation.typeform.com/ytusersurvey", reminderSurveyUrl = "https://mozillafoundation.typeform.com/to/b1PiAfWP", privacyNoticeUrl = "https://foundation.mozilla.org/youtube/regretsreporter/privacy-notice/", experimentGroupsUrl = "https://github.com/mozilla-extensions/regrets-reporter/blob/main/experimentinfo.md", onboardingUrl = _webextensionPolyfillTs.browser.runtime.getURL("get-started/index.html"), studyResultsUrl = "https://foundation.mozilla.org/youtube/user-controls/";
  }, {
    "webextension-polyfill-ts": "g4Zvj",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ]
}, [ "4Z6dU" ]);