(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

window.Amigo = { Metric: window.Amigo.Metric.default };
var pageActionService = require('./lib/page-action');
var distributionService = require('./../common/services/distribution-service');
var inlineThemeService = require('./lib/inline-theme-service');
var inlineOkService = require('./lib/inline-ok-service');

var distributionDefaultSites = require('./lib/distribution-default-sites');

var polyfills = require('../common/utils/polyfills');
polyfills.array();
polyfills.object();
polyfills.canvas();

var SiteArrayBuilder = require('../common/utils/site-array-builder');

var merge = require('merge');

var utils = require('./lib/utils');

var chrome = require('../common/factory/chrome-factory')();
var urlUtils = require('../common/utils/url-utils');
var arrayUtils = require('../common/utils/array');
var extensions = require('./lib/extensions');
var extensionIds = require('./../common/constants/extension-ids');
var defaultSites = require('./lib/default-sites');
var historyService = require('./lib/history');
var favorites = require('./lib/favorites');
var persistenceService = require('./lib/persistence');
var recommendations = require('./lib/recommendations');
var presets = require('./lib/presets');
var widgets = require('./lib/widgets');
var chromeUtils = require('./lib/chrome-utils');

var tileInfoService = require('./lib/tile-info-service');
var tilesJsonService = require('./lib/json-services/tiles-json-service');
var themesJsonService = require('./lib/json-services/themes-json-service');
var presetsJsonService = require('./lib/json-services/presets-json-service');
var notifications = require('./lib/notifications');
var boardsService = require('./lib/boards');
var userMetaCache = require('./lib/cache/meta-cache');
var userImagesCache = require('./lib/cache/image-cache');
var userFaviconsCache = require('./lib/cache/favicon-cache');
var sharingTempCache = require('./lib/cache/sharing-temp-cache');
var myWidgetCache = require('./lib/cache/mywidget-cache');

var recommendedSitesService = require('./lib/recommended-sites');
var importedFromVbSites = require('./lib/vb-imported-sites');
var metricService = require('./lib/metrics/metrics-service');
var hintsService = require('./lib/hints');
var promoService = require('./lib/promo-service');
var strings = require('../common/utils/strings');

var asyncForEach = require('../common/utils/async-foreach');
var customImageService = require('./lib/tile-info-services/custom-image');
var promoImageService = require('./lib/tile-info-services/promo-image');
var userMetaService = require('./lib/tile-info-services/meta');
var socialService = require('./lib/social/social-service');

var addShowcaseService = require('./lib/json-services/add-showcase-json-service');
var gamesShowcaseService = require('./lib/json-services/games-showcase-json-service');
var gamesWidgetJsonService = require('./lib/json-services/games-widget-json-service');
var okGamesWidgetJsonService = require('./lib/json-services/ok-games-widget-json-service');

var authService = require('./lib/auth');

var masterPlugin = require('./lib/master-plugin-wrapper');
var mailCheckerConnect = masterPlugin.Connect.create(extensionIds.MAIL_CHECKER_EXT);

var lclStorage = require('../common/factory/localstorage-factory')();

var tileConstants = require('../common/models/tile-constants');
var specificValues = require('./../common/services/specific-values-service');
var tilesModes = require('./../common/constants/tiles-modes');

var FIRST_LAUNCH_KEY = 'first_launch';
var FIRST_OPEN_KEY = 'first_open';
var FIRST_INSTALL = 'first_install';
var ALGORITHM_KEY = 'algorithm';
var SITES_TO_BOARDS_KEY = 'sites_to_boards';
var CHECKED_FOR_DUPLICATES_KEY = 'checked_for_duplicates';

var MINIMUM = tileConstants.MAX_TILES_COUNT;
var MAXIMUM = tileConstants.ABSOLUTELY_MAX_TILES_COUNT;
var INITIAL_BOARDS_COUNT = 2;

var EXCLUDED_HOSTNAMES = [ 'e.mail.ru', 'news.mail.ru', 'ad.mail.ru', 'r.mail.ru', 'google.com', 'google.ru', 'ya.ru', 'yandex.ru' ];

var MOCK_SENDER_ID = -2;

function addClientSideListener(callback) {
    chrome.runtime.onMessage.addListener(callback);
}

function getDefaultSites() {
    return defaultSites.load();
}

function getTopSites() {
    return historyService.getTopSites();
}

function getFavorites() {
    return favorites.getFavorites();
}

function getBrowserHistory(options) {
    return historyService.search(options);
}

function getBrowserHistoryForLastMonth() {
    return historyService.getHistoryForLastMonth().then(function(history) {
        return new SiteArrayBuilder().setSource(history).extractUniqueDomains().build();
    });
}

function buildInitialTilesUsingFirstAlgorithm(defaultSiteList, history, extensionList, visualBookmarks, sharedSites, recommendedSites) {
    var builder = new SiteArrayBuilder();

    return builder
        .setSource(history)
        .extractUniqueDomains()
        .filterHostnames(EXCLUDED_HOSTNAMES) // Exclude widgets
        .filter(function(site) { // Exclude chrome extension pages (???)
            return site.url.indexOf('chrome-extension://') === -1;
        })
        .filter(function(site) {
            var siteHostname = urlUtils.getHostname(site.url);

            var index = recommendedSites.findIndex(function(recommendedSite) {
                return siteHostname === urlUtils.getHostname(recommendedSite.url);
            });

            return index > -1;
        })
        .filterSiteList(visualBookmarks)
        .prepend(visualBookmarks)
        .filterSiteList(sharedSites)
        .prepend(sharedSites)
        .filterSiteList([ { url: 'http://mail.ru' }, { url: 'http://travel.mail.ru' }, { url: 'https://money.mail.ru' } ]) // remove mail.ru, money and travel from visual bookmarks
        .prepend(extensionList)
        .selectFirst(MAXIMUM)
        .if(builder.length < MAXIMUM)
            .filterSiteList(defaultSiteList)
            .append(defaultSiteList)
            .selectFirst(MAXIMUM)
        .endIf()
        .build();
}

function buildInitialTilesUsingSecondAlgorithm(defaultSiteList, history, extensionList, visualBookmarks, sharedSites) {
    var builder = new SiteArrayBuilder();

    return builder
        .setSource(history)
        //.selectFirst(10)
        .filterHostnames(EXCLUDED_HOSTNAMES) // Exclude widgets
        .filter(function(site) { // Exclude chrome extension pages (???)
            return site.url.indexOf('chrome-extension://') === -1;
        })
        .filterSiteList(visualBookmarks)
        .prepend(visualBookmarks)
        .filterSiteList(sharedSites)
        .prepend(sharedSites)
        .filterSiteList([ { url: 'http://mail.ru' }, { url: 'http://travel.mail.ru' }, { url: 'https://money.mail.ru' } ]) // remove mail.ru, money and travel from visual bookmarks
        .prepend(extensionList)
        .selectFirst(MAXIMUM)
        .if(builder.length < MAXIMUM)
        .filterSiteList(defaultSiteList)
        .append(defaultSiteList)
        .selectFirst(MAXIMUM)
        .endIf()
        .build();
}

function buildInitialTiles() {
    return Promise.all([
        getDefaultSites(),
        getTopSites(),
        extensions.getPredefinedExtensionsList(),
        getImportedFromVbSites(),
        getSharedSites(),
        getRecommendedSites(),
        getBrowserHistoryForLastMonth()
    ]).then(function(results) {
        var defaultSiteList = results[0] || [],
            topSites = results[1] || [],
            extensionList = results[2] || [],
            visualBookmarks = results[3] || [],
            sharedSites = results[4] || [],
            recommendedSites = results[5] || [],
            history = results[6] || [];

        var algorithm = 1;
        var noHistory = history.length === 0;

        addMetricAlgorithmParam(algorithm);


        console.log('@@@ Visual bookmarks are', visualBookmarks);
        var initialTiles;
        var isMailRuOnly = function(source) {
            return (source.length === 1 && /^(https?:\/\/)?mail\.ru(\/?)$/gi.test(source[0].url));
        };

        if (visualBookmarks && visualBookmarks.length > 0 && !isMailRuOnly(visualBookmarks)) {
            console.log('@@@ NOT ONLY', visualBookmarks);
            initialTiles = buildInitialTilesUsingSecondAlgorithm([], [], [], visualBookmarks, [], []);
        } else {
            console.log('@@@ ONLY OR EMPTY', visualBookmarks);
            initialTiles = distributionDefaultSites.getSites();
        }

        return {
            data: initialTiles,
            algorithm: algorithm,
            noHistory: noHistory
        };
    });
}

function buildInitialTilesUsingPreset(presetsBoards) {
    presetsBoards.forEach(function(presetBoard) {
        presetBoard.tiles = presetBoard.tiles.slice(0, MAXIMUM);
    });

    return {
        data: presetsBoards,
        algorithm: 'preset'
    };
}

function recalculatePopularSites() {
    return presets.getMatchedPresetsWithNotAppliedTiles().then(function(presetsList) {
        if (presetsList.length === 0) {
            return buildInitialTiles();
        }

        return presets.getPresetsBoards(presetsList)
            .then(buildInitialTilesUsingPreset)
            .then(function(result) {
                return presets.markPresetsTilesApplied().then(function() {
                    return result;
                });
            });
    })
    .then(function(result) {
        sharingTempCache.clear();
        return result;
    })
    .catch(function(err) {
        console.error('Error getting first tiles', err);
    });
}

function addMetricAlgorithmParam(algorithm) {
    var createHandler = function(algorithm) {
        return function(data) {
            data.algorithm = algorithm;
        };
    };

    metricService.addBeforeSendHandler(createHandler(algorithm));
}

function addMetricDistributionParams() {
    return distributionService.getExtensionData().then(function(extData) {
        metricService.addBeforeSendHandler(function(data) {
            data.variation = extData.fr;
            data.product_id = extData.product_id;
        });
    });
}

function checkFirstLaunch() {
    return persistenceService.load(FIRST_LAUNCH_KEY).then(function(data) {
        return (!data.hasOwnProperty(FIRST_LAUNCH_KEY) || data[FIRST_LAUNCH_KEY] === true);
    });
}

function checkFirstOpening() {
    return persistenceService.load(FIRST_OPEN_KEY).then(function(data) {
        return (!data.hasOwnProperty(FIRST_OPEN_KEY) || data[FIRST_OPEN_KEY] === true);
    });
}

function notify(message) {
    chrome.runtime.sendMessage(message);
}

function saveFirstLaunch() {
    return persistenceService.save(FIRST_LAUNCH_KEY, false);
}

function saveAlgorithm(value) {
    return persistenceService.save(ALGORITHM_KEY, value);
}

function saveUpgradeToBoards() {
    return persistenceService.save(SITES_TO_BOARDS_KEY, true);
}

function initBoardsWithTiles(value, boardsCount) {
    if (!boardsCount) {
        boardsCount = value.length > tileConstants.MAX_TILES_COUNT ? INITIAL_BOARDS_COUNT : 1;
    }
    return boardsService.initWithTiles(value, boardsCount).then(saveUpgradeToBoards);
}

function initBoardsWithBoards(value) {
    return boardsService.initWithBoards(value).then(saveUpgradeToBoards);
}

function saveHints(value) {
    console.log('HINTS UPDATE', value);
    return persistenceService.save('hints', value);
}

function getAlgorithm() {
    return persistenceService.load(ALGORITHM_KEY).then(function(data) {
        return data.algorithm;
    });
}

function saveFirstOpening() {
    return persistenceService.save(FIRST_OPEN_KEY, false);
}

function decorateWithMeta(tiles) {
    var queue = [ ];

    tiles.forEach(function(site) {
        queue.push(Promise.all([
            userMetaService.has(site.url),
            customImageService.hasCached(site.url)
        ]));
    });

    return Promise.all(queue).then(function(results) {
        console.log('Finished queue', results);
        return new Promise(function(resolve) {
            function callback(item, index, next) {
                var hasMeta = item[0];
                var hasImage = item[1];

                var currentSite = tiles[index];

                if (!hasMeta || !hasImage) {
                    return next();
                }

                Promise.all([
                    userMetaService.get(currentSite.url),
                    customImageService.load(currentSite.url)
                ]).then(function(results) {
                    var meta = results[0];
                    var image = results[1];

                    currentSite.meta = merge({ image: image.dataUrl }, meta);
                    next();
                }).catch(function() {
                    next();
                });
            }

            function done() {
                resolve(tiles);
            }

            asyncForEach(results, callback, done);
        });
    });
}

function loadBoards() {
    return getPopularSites();
}

function getBoardsFromPresetsAndPrepend(presetsList, boards, reverse) {
    return presets.getPresetsBoards(presetsList).then(function(presetBoards) {
        const presetsIsNotEmpty = presetBoards.length > 0;
        let updatedBoards;
        let newActiveBoardIndex;

        if (reverse) {
            updatedBoards = boards.concat(presetBoards);

            if (presetsIsNotEmpty) {
                newActiveBoardIndex = updatedBoards.length - 1;
            }
        } else {
            updatedBoards = presetBoards.concat(boards);

            if (presetsIsNotEmpty) {
                newActiveBoardIndex = 0;
            }
        }

        const operations = [
            presets.markPresetsTilesApplied(),
            boardsService.saveBoards(updatedBoards)
        ];

        if (newActiveBoardIndex) {
            const settingsOperation = boardsService.saveSettings({ activeBoardIndex: newActiveBoardIndex });
            operations.push(settingsOperation);
        }

        return Promise.all(operations).then(function() {  // https://jira.mail.ru/browse/AMIGO-5241 Need to update tiles on all opened NTPs after preset was applied
            notify({ type: 'preset_tiles_applied', originatorId: 'presets' });
        }).then(function() {
            return updatedBoards;
        });
    });
}

function getUserTiles() {
    return checkFirstLaunch()
        .then(function(isFirst) {
            if (!isFirst) {
                return Promise.all([
                    updateTilesJsonIfNeeded(),
                    updatePresetsJsonIfNeeded()
                ])
                .then(loadBoards)
                .then(function(boards) {
                    return presets.getMatchedPresetsWithNotAppliedTiles().then(function(presetsList) {
                        if (presetsList.length === 0) {
                            return boards;
                        }

                        return getBoardsFromPresetsAndPrepend(presetsList, boards);
                    });
                });
            }

            return updatePresetsJsonIfNeeded()
                .then(recalculatePopularSites)
                .then(function(result) {
                    var saveFn;
                    var tilesList;
                    var prePromise;

                    if (result.algorithm === 'preset') {
                        var presetsBoards = result.data;
                        saveFn = initBoardsWithBoards;
                        tilesList = presetsBoards.reduce(function(tiles, board) {
                            return tiles.concat(board.tiles);
                        }, []);

                        // TODO - режимы и соотвественно определение нужного режима при установке с пресетом отложены до лучших времен
                        prePromise = Promise.resolve(); //boardsService.saveSettings({ mode: calculateModeForBoards(presetsBoards) });
                    } else {
                        saveFn = initBoardsWithTiles;
                        tilesList = result.data;
                        prePromise = Promise.resolve();
                    }

                    return prePromise.then(function() {
                        return Promise.all([
                            saveFn(result.data),
                            saveAlgorithm(result.algorithm)
                        ]);
                    }).then(function () {
                        return addMetricAlgorithmParam(result.algorithm);
                    }).then(function () {
                        return sendMetric('first_launch', [tilesList.length, result.noHistory ? 'no' : 'yes']);
                    });
                })
                .then(saveFirstLaunch)
                .then(loadBoards);
        });
}

function getRecommendedSites() {
    return tilesJsonService.getAll();
}

function getHints() {
    return persistenceService.load('hints');
}

function getImportedFromVbSites() {
    return importedFromVbSites.load();
}

function getSharedSites() {
    return sharingTempCache.getAll();
}

function savePopularSites(value) {
    return boardsService.saveBoards(value);
}

function getCustomTileData(name) {
    return persistenceService.load(name);
}

function updateCustomTileData(name, newData) {
    return persistenceService.load(name).then(function(oldData) {
        var result;
        if (oldData[name] !== undefined && oldData[name].version === newData.version) {
            result = merge(true, oldData[name], newData);
        } else {
            result = newData;
        }

        console.group('Custom tile update');
        console.log('oldData', oldData[name]);
        console.log('newData', newData);
        console.log('RESULT', result);
        console.groupEnd();
        return persistenceService.save(name, result);
    });
}

function updateTilesJsonIfNeeded() {
    return tilesJsonService.updateIfNeeded();
}

function updateThemesJsonIfNeeded() {
    return themesJsonService.updateIfNeeded();
}

function updatePresetsJsonIfNeeded() {
    return presetsJsonService.updateIfNeeded();
}

function getMetaForHostname(hostname) {
    return tileInfoService.getInfo(hostname);
}

function saveMetaForPromo(meta) {
    console.log('SAVING META FOR PROMO', meta);

    return promoImageService.save(meta.url, {
        title: meta.title,
        image: meta.imageUrl,
        url: meta.url
    });
}

function checkCacheVersion() {
    var version = chrome.runtime.getManifest().version;

    return persistenceService.load('version').then(function(data) {
        if (!data.version || data.version !== version) {
            return persistenceService.save('version', version);
        }
    });
}

function sendMetric(metric, params) {
    return metricService.send(metric, params);
}

function hidePromo(id) {
    return promoService.hide(id);
}

function isPromoHidden(id) {
    return promoService.isHidden(id);
}

function getBoardsData() {
    return getUserTiles().then(function(tiles) {
        return boardsService.getSettings().then(function(settings) {
            return {
                boards: tiles,
                settings: settings
            };
        });
    });
}

function notifyIfThemePrepended(originatorId) {
    return function(data) {
        if (data.prepended) {
            notify({ type: 'custom_theme_applied', originatorId });
        }
        return data;
    };
}

function extractDataProp(updatedData) {
    return updatedData.data;
}

function applyPresetTheme(allThemes) {
    return presets.getMatchedPresetsWithNotAppliedTheme().then(function(presetsList) {
        if (presetsList.length === 0) {
            return allThemes;
        }
        return createThirdPartyThemeAndPrepend(presets.getPresetsTheme.bind(presets, presetsList), allThemes)
            .then(utils.proxyPromiseResult(presets.markPresetsThemeApplied.bind(presets)))
            .then(notifyIfThemePrepended('presets'))
            .then(extractDataProp);
    });
}

function applyInlineInstallTheme(allThemes) {
    return inlineThemeService.getInlineTheme().then(function(imageUrl) {
        if (!imageUrl) {
            return allThemes;
        }
        return createThirdPartyThemeAndPrepend(inlineThemeService.createInlineThemeFromImageUrl.bind(inlineThemeService, imageUrl), allThemes)
            .then(utils.proxyPromiseResult(inlineThemeService.markThemeApplied.bind(inlineThemeService, imageUrl)))
            .then(notifyIfThemePrepended('inline'))
            .then(extractDataProp);
    });
}

function createThirdPartyThemeAndPrepend(strategyFn, allThemes) {
    return strategyFn()
        .then(function(theme) {
            if (!theme) {
                return { prepended: false, data: allThemes };
            }
            theme.hidden = false;
            return themesJsonService.setCustomTheme(theme.fullImage, theme)
                .then(themesJsonService.getThemesData.bind(themesJsonService))
                .then(function(data) {
                    return { prepended: true, data: data };
                });
        });
}

function getThemes() {
    return updateThemesJsonIfNeeded()
        .then(function() {
            return themesJsonService.getThemesData();
        })
        .then(applyPresetTheme)
        .then(applyInlineInstallTheme)
        ;
}

function applyPreset(presetId) {
    const themePromise = themesJsonService.getThemesData().then(data => {
        return createThirdPartyThemeAndPrepend(presets.getPresetsTheme.bind(presets, [presetId]), data)
            .then(notifyIfThemePrepended('preset'));
    });

    const boardsPromise = loadBoards().then(boards => {
        return getBoardsFromPresetsAndPrepend([presetId], boards, true);
    });

    return Promise.all([ themePromise, boardsPromise ]).then(() => {
        presets.saveHistory([presetId]);
    });
}

function openNewTabWithPresetDialog(presetId) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            chrome.tabs.update(null, { url: `chrome://newtab/#?presetid=${presetId}` }, function () {
                var success = true;

                if (chrome.runtime.lastError) {
                    success = false;
                }

                resolve({ success: success });
            });
        }, 100); // give browser a little time to start loading landing before redirect to prevent rendering issues
    });
}

function getShowcase(type) {
    var service = type === 'games' ? gamesShowcaseService : addShowcaseService;

    return service.updateIfNeeded().then(function() {
        return service.getShowcase();
    });
}

function getGamesWidget() {
    return gamesWidgetJsonService.updateIfNeeded().then(function() {
        return gamesWidgetJsonService.getWidget();
    });
}

function getOkGamesWidget() {
    return okGamesWidgetJsonService.updateIfNeeded().then(function() {
        return okGamesWidgetJsonService.getGames();
    });
}

function checkOnboardingIsRequired() {
    return Promise.all([
        checkFirstOpening(),
        presets.getHistory()
    ]).then(data => {
        const isFirstOpening = data[0];
        const presetsHistory = data[1];

        if (isFirstOpening) {
            saveFirstOpening();
        }

        // onboarding is required only if it's first opening and ntp installed without preset
        return isFirstOpening && presetsHistory.length === 0;
    });
}

function getMyWidgetStatus(cid, initialStatus) {
    return myWidgetCache.get(cid)
        .catch(() => {
            const date = Date.now();
            const inverted = initialStatus;
            return setMyWidgetStatus(cid, inverted, date) // Save initial state
                .then(() => ({ date: Date.now(), inverted: inverted }));
        });
}

function setMyWidgetStatus(cid, inverted, date) {
    return myWidgetCache.put(cid, { inverted: inverted, date: date });
}

function addVidCookieParam() {
    return inlineOkService.getVidCookie()
        .then((cookie) => {
            if (cookie) {
                return distributionService.addParameters({ vid: cookie });
            }
        });
}

function checkLoginAndAddParams(skipAutoLogin) {
    return authService.isLoggedIn(skipAutoLogin)
        .then((loggedIn) => {
            if (!loggedIn) {
                return addLoggedInParam(0)
                    .then(() => false);
            }
            return addLoggedInParam(1)
                .then(() => addVidCookieParam())
                .then(() => true);
        });
}

function addLoggedInParam(value) {
    return distributionService.addParameters({ ok_logged_in: value });
}

function loginAndUpdateStatus() {
    return authService.login()
        .then((result) =>
            addLoggedInParam(1)
                .then(() => addVidCookieParam())
                .then(() => result)
        );
}

function logoutAndUpdateStatus() {
    return authService.logout()
        .then((result) =>
            addLoggedInParam(0)
                .then(() => result)
        );
}

function createMessageListener() {
    addClientSideListener(function(request, sender, sendResponse) {
        sendResponse = request.noReply ? function() { } : sendResponse;

        switch (request.type) {
            case 'get_boards':
                getBoardsData().then(sendResponse);
                break;
            case 'save_boards':
                savePopularSites(request.boards).then(function(data) {
                    if (!request.silently) {
                        notify({type: 'tiles_saved', originatorId: sender.tab.id});
                    }

                    sendResponse(data);
                });
                break;
            case 'save_boards_settings':
                boardsService.saveSettings(request.settings).then(function(data) {
                    if (!request.silently) {
                        notify({type: 'tiles_saved', originatorId: sender.tab.id});
                    }
                    return sendResponse(data);
                });
                break;
            case 'get_meta':
                getMetaForHostname(request.hostname).then(sendResponse).catch(sendResponse);
                break;
            case 'save_meta_for_promo':
                saveMetaForPromo(request.meta).then(sendResponse).catch(sendResponse);
                break;
            case 'top_sites':
                getTopSites().then(sendResponse);
                break;
            case 'history':
                getBrowserHistoryForLastMonth().then(sendResponse);
                break;
            case 'get_recommended_sites':
                getRecommendedSites().then(sendResponse);
                break;
            case 'widgets':
                extensions.getAllExtensionsList().then(sendResponse);
                break;
            case 'favorites':
                getFavorites().then(sendResponse);
                break;
            case 'get_all_recommendations':
                recommendations.getSites().then(sendResponse);
                break;
            case 'check_onboarding_is_required':
                checkOnboardingIsRequired().then(sendResponse);
                break;
            case 'send_metric':
                sendMetric(request.metric, request.params).then(sendResponse);
                break;
            case 'get_custom_tile_data':
                getCustomTileData(request.name).then(sendResponse);
                break;
            case 'update_custom_tile_data':
                updateCustomTileData(request.name, request.data).then(sendResponse);
                break;
            case 'get_hints':
                getHints().then(sendResponse);
                break;
            case 'save_hints':
                saveHints(request.hints).then(sendResponse);
                break;
            case 'get_themes':
                getThemes().then(sendResponse);
                break;
            case 'add_theme':
                themesJsonService.setCustomTheme(null, request.theme, request.notActive).then(function() {
                    notify({ type: 'themes_updated', originatorId: -2 });

                    sendResponse();
                });
                break;
            case 'remove_theme':
                themesJsonService.removeCustomTheme(request.themeName).then(function() {
                    notify({ type: 'themes_updated', originatorId: -2 });

                    sendResponse();
                });
                break;
            case 'save_themes_settings':
                themesJsonService.saveThemesData(request.themesData).then(function() {
                    if (!request.themesData.settings.random) {
                        notify({type: 'themes_updated', originatorId: sender.tab.id});
                    }

                    sendResponse();
                });
                break;
            case 'add_theme_local_image':
                themesJsonService.addLocalImageToSettings(request.themeName, request.imageUrl).then(sendResponse);
                break;
            case 'check_has_mail_checker_app':
                extensions.hasExtension(extensionIds.MAIL_CHECKER_APP).then(sendResponse);
                break;
            case 'hide_promo':
                hidePromo(request.bannerId).then(sendResponse);
                break;
            case 'is_promo_hidden':
                isPromoHidden(request.bannerId).then(sendResponse);
                break;
            case 'check_has_mail_checker':
                extensions.hasExtension(extensionIds.MAIL_CHECKER_EXT).then(sendResponse);
                break;
            case 'checker_get_info':
                sendResponse();
                //mailCheckerConnect.send('checker_get_info').then(sendResponse);
                break;
            case 'checker_attach':
                mailCheckerConnect.send('checker_attach').then(sendResponse);
                break;
            case 'checker_detach':
                mailCheckerConnect.send('checker_detach').then(sendResponse);
                break;
            case 'checker_open_settings':
                mailCheckerConnect.send('checker_open_settings').then(sendResponse);
                break;
            case 'get_data_for_social_tile':
                console.log('GET DATA FOR SOCIAL TILE');
                socialService.getDataForTile(request.info).then(sendResponse);
                break;
            case 'get_social_records':
                socialService.getAllRecords().then(sendResponse);
                break;
            case 'get_notifications':
                notifications.getData().then(sendResponse);
                break;
            case 'save_notifications':
                notifications.saveData(request.notifications).then(sendResponse);
                break;
            case 'is_first_opening':
                checkFirstOpening().then(sendResponse);
            case 'get_preset_info':
                presets.getPresetsInfo([request.presetId]).then(function(infoArr) {
                    return infoArr[0];
                }).then(sendResponse);
                break;
            case 'get_presets_data':
                presets.getPresetsData().then(sendResponse);
                break;
            case 'get_last_installed_preset_info':
                presets.getHistory()
                    .then(function(presetsIds) {
                        return presetsIds.slice(-1)[0];
                    })
                    .then(function(lastPresetId) {
                        return presets.getPresetsInfo([lastPresetId]).then(function(infoArr) {
                            return infoArr[0];
                        });
                    })
                    .then(sendResponse);
                break;
            case 'apply_preset':
                applyPreset(request.presetId).then(() => {
                    notify({ type: 'preset_applied', originatorId: MOCK_SENDER_ID });
                    sendResponse();
                });
                break;
            case 'mark_presets_visited':
                presetsJsonService.resetUpdates().then(sendResponse);
                break;
            case 'get_showcase':
                getShowcase(request.showcase).then(sendResponse);
                break;
            case 'get_games_widget':
                getGamesWidget().then(sendResponse);
                break;
            case 'get_ok_games_widget':
                getOkGamesWidget().then(sendResponse);
                break;
            case 'get_promo_contexts':
                presets.getPromoContexts().then(sendResponse);
                break;
            case 'get_specific_values':
                specificValues.getAll().then(sendResponse);
                break;
            case 'get_mywidget_status':
                getMyWidgetStatus(request.cid, request.initialStatus).then(sendResponse);
                break;
            case 'set_mywidget_status':
                setMyWidgetStatus(request.cid, request.inverted, request.date).then(sendResponse);
                break;
            case 'cancel_last_page_action':
                request.noReply = true;
                pageActionClickHandler(sender.tab, true);
                break;
            case 'auth:is_authorized':
                checkLoginAndAddParams(request.skipAutoLogin).then(sendResponse).catch(sendResponse);
                break;
            case 'auth:login':
                loginAndUpdateStatus().then(sendResponse).catch(sendResponse);
                break;
            case 'auth:logout':
                logoutAndUpdateStatus().then(sendResponse).catch(sendResponse);
                break;
            case 'auth:get_current_user':
                authService.getCurrentUser().then(sendResponse).catch(sendResponse);
                break;
            case 'auth:get_user_by_id':
                authService.getUserById(request.id).then(sendResponse).catch(sendResponse);
                break;
            case 'auth:get_gifts':
                authService.getGifts().then(sendResponse).catch(sendResponse);
                break;
            case 'auth:get_streams':
                authService.getStreams().then(sendResponse).catch(sendResponse);
                break;
            case 'auth:get_showcases':
                authService.getShowcases().then(sendResponse).catch(sendResponse);
                break;
            case 'auth:get_notifications':
                authService.getNotifications(request.tileType).then(sendResponse).catch(sendResponse);
                break;
            case 'auth:show_login':
                inlineOkService.hasOkPreset().then(sendResponse);
                break;
            default:
                console.error('UNKNOWN MESSAGE TYPE', request);
                return false;
        }

        return request.noReply ? false : true;
    });
}

function createExternalMessageListener() {
    chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
        switch (request.type) {
            case 'open_newtab_with_preset_dialog':
                openNewTabWithPresetDialog(request.presetId).then(sendResponse);
                break;
        }
        return true;
    });
}

function createOnBeforePresetsRequestListener() {
    function getActiveTab() {
        return new Promise(resolve => {
            chrome.tabs.query({ active: true }, tabs => {
                resolve(tabs[0]);
            });
        });
    }

    function isLanding(url) {
        return urlUtils.getHostname(url).includes('all.amigo.mail.ru');
    }

    var presetRe = /install_preset=(\w+)/i;

    chrome.webRequest.onBeforeRequest.addListener(details => {
        function replacedListener() {
            getActiveTab()
                .then(tab => {
                    var url = tab.url;

                    if (tab.id !== tabId) {
                        return;
                    }

                    var matchArr = url.match(presetRe);

                    if (isLanding(url) && matchArr && matchArr.length > 1) {
                        openNewTabWithPresetDialog(matchArr[1]);
                    }

                    chrome.tabs.onReplaced.removeListener(replacedListener);
                });
        }

        var url = details.url;
        var matchArr = url.match(presetRe);
        var tabId = details.tabId;

        if (matchArr && matchArr.length > 1) {
            getActiveTab()
                .then(tab => {
                    if (tabId === tab.id) {
                        openNewTabWithPresetDialog(matchArr[1]);
                    } else {
                        chrome.tabs.onReplaced.addListener(replacedListener);
                    }
                });
        }
    }, {urls: ["*://*.amigo.mail.ru/*"], types: ["main_frame"]});
}

function checkIfAlreadyUpgradedToBoards() {
    return persistenceService.load(SITES_TO_BOARDS_KEY).then(function(data) {
        return data.hasOwnProperty(SITES_TO_BOARDS_KEY) && data[SITES_TO_BOARDS_KEY] === true;
    });
}

function eliminateDuplicateTileIds() {
    return persistenceService.load(CHECKED_FOR_DUPLICATES_KEY)
        .then(data => {
            if (data[CHECKED_FOR_DUPLICATES_KEY] === true) {
                return true;
            }
            return boardsService.eliminateDuplicateIds().then(() => {
                return persistenceService.save(CHECKED_FOR_DUPLICATES_KEY, true);
            });
        });
}

function getPopularSites() {
    return checkIfAlreadyUpgradedToBoards().then(function(isUpgraded) {
        if (!isUpgraded) {
            return persistenceService.load('sites').then(function(data) {
                console.error('INIT BOARDS WITH TILES', data.sites);
                return initBoardsWithTiles(data.sites, 1)
                    .then(function() {
                        persistenceService.remove('sites');
                    });
            });
        }
    }).then(function() {
        return eliminateDuplicateTileIds().then(() => boardsService.getBoards());
    });
}

function getMaxTilesCount() {
    return boardsService.getSettings().then(function(settings) {
        var mode = tilesModes[settings.mode] || tilesModes.mix;
        return mode.maxCount;
    });
}

function checkIfSiteAlreadyAdded(url) {
    return checkFirstLaunch().then(function(isFirst) {
        if (isFirst) {
            return sharingTempCache.has(urlUtils.normalize(url))
                .then(function(has) {
                    return {
                        isAdded: has,
                        canAdd: true
                    };
                });
        }

        return Promise.all([
            getPopularSites(),
            getMaxTilesCount()
        ])
            .then(function(data) {
                var boards = data[0];
                var maxTilesCount = data[1];

                var existBoardWithSpace = boards.some(function(board) {
                    return board.tiles.length < maxTilesCount;
                });

                var canAdd = existBoardWithSpace || boards.length < tileConstants.MAX_BOARDS_COUNT;

                var isAdded = boards.some(function(board) {
                    return board.tiles.some(function (tile) {
                        try {
                            return urlUtils.compare(tile.url, url);
                        } catch (err) {
                            return false;
                        }
                    });
                });

                return {
                    isAdded: isAdded,
                    canAdd: canAdd
                };
            });
    });
}

function addSite(url, source) {
    var tileSource = source || { url: url };

    return checkFirstLaunch()
        .then(function (isFirst) {
            if (isFirst) {
                return sharingTempCache.put(urlUtils.normalize(url), tileSource);
            }

            return Promise.all([
                getPopularSites(),
                getMaxTilesCount()
            ])
                .then(function(data) {
                    var boards = data[0].slice();
                    var maxTilesCount = data[1];

                    if (boards.length >= tileConstants.MAX_BOARDS_COUNT) {
                        var lastBoardWithSpaceIndex = boards.slice().reverse().findIndex(function(board) {
                            return board.tiles.length < maxTilesCount;
                        });
                        boards[boards.length - lastBoardWithSpaceIndex - 1].tiles.push(tileSource);
                    } else {
                        var lastBoard = boards[boards.length - 1];

                        if (lastBoard && lastBoard.tiles.length < maxTilesCount) {
                            lastBoard.tiles.push(tileSource);
                        } else {
                            var newBoard = {
                                tiles: [ tileSource ]
                            };
                            boards.push(newBoard);
                        }
                    }

                    return boards;
                })
                .then(function(result) {
                    savePopularSites(result);
                });
        })
        .then(function() {
            notify({ type: 'tiles_saved', originatorId: MOCK_SENDER_ID });
        });
}

function removeSite(url) {
    return getPopularSites()
        .then(function(data) {
            var boards = data.slice();

            var tileIndex;
            var indexOfBoardWithSite = boards.findIndex(function(board) {
                tileIndex = board.tiles.findIndex(function(tile) {
                    try {
                        return urlUtils.compare(tile.url, url);
                    } catch (err) {
                        return false;
                    }
                });

                return tileIndex !== -1;
            });

            if (indexOfBoardWithSite !== -1) {
                var board = boards[indexOfBoardWithSite];
                board.tiles.splice(tileIndex, 1);

                if (board.tiles.length === 0) {
                    boards.splice(indexOfBoardWithSite, 1);
                }
            }

            return boards;
        })
        .then(savePopularSites)
        .then(function() {
            notify({ type: 'tiles_saved', originatorId: MOCK_SENDER_ID });
        });
}

masterPlugin.Connect.on('message', function(e) {
    var data = e.data;

    switch (e.message) {
        case 'get_tile_info':
            getMetaForHostname(data.url).then(e.resolve).catch(e.reject);
            break;
        case 'get_is_added':
            checkIfSiteAlreadyAdded(data.url).then(e.resolve).catch(e.reject);
            break;
        case 'add_site':
            addSite(data.url);
            break;
        case 'remove_site':
            removeSite(data.url);
            break;
        case 'checker_get_info':
            notify({type: 'checker_info', originatorId: e.origin, data: data});
            e.resolve('checker_info');
            break;
    }
});

function browserStateChangeHandler(state) {
    switch (state) {
        case 'active':
            socialService.start();
            break;
        case 'idle':
            socialService.stop();
            break;
    }
}


function updateHints() {
    return getHints()
        .then(function(data) {
            return hintsService.updateHints(data.hints);
        })
        .then(saveHints);
}

function calculateModeForBoards(boards) {
    const maxTilesCountOnBoard = arrayUtils.getMax(boards.map(board => board.tiles.length));
    let modeName = tilesModes.large.name;

    if (maxTilesCountOnBoard > tilesModes.medium.maxCount) {
        modeName = tilesModes.small.name;
    } else if (maxTilesCountOnBoard > tilesModes.large.maxCount) {
        modeName = tilesModes.medium.name;
    }

    return modeName;
}

function setInitialTileMode(isFirstLaunch) {
    return boardsService.saveSettings({ mode: tilesModes.mix.name });

    // TODO - режимы отложены до лучших времен, поэтому включен дефолтный смешанный режим (соответствующий старому поведению)
    //if (isFirstLaunch) {
    //    return boardsService.saveSettings({ mode: tilesModes.medium.name });
    //}
    //
    //return getBoardsData().then(data => {
    //    const settings = data.settings;
    //    const boards = data.boards;
    //
    //    if (!settings.mode) {
    //        return boardsService.saveSettings({ mode: calculateModeForBoards(boards) });
    //    }
    //});
}
function checkInstall() {
    return persistenceService.load(FIRST_INSTALL).then(function (data) {
        return (!data.hasOwnProperty(FIRST_INSTALL) || data[FIRST_INSTALL] === true);
    });
}
function saveFirstInstall() {
    return persistenceService.save(FIRST_INSTALL, false);
}

function init(distributionData) {
    console.log('INSTALLED');
    Promise.all([
        checkFirstOpening(),
        checkInstall()
    ]).then((data) => {
        const isFirstOpening = data[0];
        const isFirstInstall = data[1];

        if (isFirstOpening && isFirstInstall) {
            // set cookie i
            fetch('https://ad.mail.ru/i1554.gif');
            saveFirstInstall();
        }
    });

    return updateHints()
        .then(function() {
            return distributionService.initialize(distributionData);
        })
        .then(() => checkLoginAndAddParams(true))
        .then(addMetricDistributionParams)
        .then(checkFirstLaunch)
        .then(function(isFirst) {
            setInitialTileMode(isFirst);

            if (isFirst) {
                return updateTilesJsonIfNeeded();
            }

            return checkCacheVersion().then(getAlgorithm).then(addMetricAlgorithmParam);
        })
        .then(updatePresetsJsonIfNeeded)
        .catch(function(err) {
            console.error('Error in init()', err);
        });
}

function restart() {
    console.log('STARTUP');
    updateHints()
        .then(getAlgorithm)
        .then(addMetricAlgorithmParam)
        .then(updatePresetsJsonIfNeeded)
        .then(updateTilesJsonIfNeeded)
        .catch(function(err) {
            console.error('Error on restart()', err);
        });
}
// FIREFOX not supports this
//chrome.runtime.onInstalled.addListener(function() { init(); });
//chrome.runtime.onStartup.addListener(function() { restart(); });
init()
  .then(() => restart())
  .catch((err) => console.error('### ERROR', err));

/*chrome.runtime.onInstalled.addListener(function() { init(); });
chrome.runtime.onStartup.addListener(function() { restart(); });*/

// Begin distribution migration code
function migrateAndInit() {
    const KEY = 'distribution-migrated';
    return chromeUtils.wrapChromeCallback(chrome.runtime, 'sendMessage', 'get-legacy-data')
        .then((response) => {
            console.log('@@@ Response is');
            if (response !== null) {
                console.log('@@@ Received response', response);
                response.forEach(({key, value}) => {
                    if (/^(mrds_metric_url|go_metric_url)$/i.test(key)) {
                        localStorage.setItem(key, value.replace('ff_xtnvbm', 'ff_pult'));
                    } else {
                        localStorage.setItem(key, value);
                    }
                });
                if (response.length > 0) {
                    return {
                        info: {
                            migrated_xpcom: 1
                        },
                        settings: {
                            persistent: false,
                            source: 'native_messaging'
                        },
                        source: response
                    };
                }
            }
            return {
                info: {}, settings: {}, source: null
            };
        })
        .then((migrationData) => {
            createMessageListener();
            return init(migrationData)
              .then(() => restart())
              .then(() => {
                if (migrationData && migrationData.source !== null) {
                    migrationData.source
                      .filter((item) => item.key.indexOf('metric_state') === -1)
                      .filter((item) => item.key.indexOf('visual-bookmarks') === -1)
                      .forEach((item) => {
                        localStorage.removeItem(item.key);
                      });
                }
              });
        });
}
//migrateAndInit();
// End distribution migration code
// FIREFOX not supports this
//chrome.idle.onStateChanged.addListener(browserStateChangeHandler);

createMessageListener();
// FIREFOX not supports this
//createExternalMessageListener();
//createOnBeforePresetsRequestListener();

function showPageAction(tab) {
    const urlObject = new URL(tab.url);

    if (urlObject.protocol.includes('chrome') ||
        urlObject.protocol.includes('moz-extension') ||
        urlObject.protocol.includes('about') ||
        tab.url.startsWith('https://chrome.google.com/webstore')) {
        return;
    }

    return checkIfSiteAlreadyAdded(tab.url)
        .then(info => {
            return pageActionService.show(tab, info);
        });
}

function pageActionClickHandler(tab, silently) {
    return checkIfSiteAlreadyAdded(tab.url)
        .then(info => {
            if(!info.canAdd) {
                return Promise.reject();
            }

            if (!info.isAdded) {
                addSite(tab.url);
            } else {
                removeSite(tab.url);
            }

            info.isAdded = !info.isAdded;
            pageActionService.handleClick(tab, info, silently);
        });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    showPageAction(tab);
});
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        if (!tab.url) {
            return;
        }
        showPageAction(tab);
    });
});
chrome.pageAction.onClicked.addListener(pageActionClickHandler);

//extras

var ntpExtras = {
    setCustomTheme: function(url, options) {
        themesJsonService.setCustomTheme(url, options).then(function() {
            notify({type: 'themes_updated', originatorId: MOCK_SENDER_ID});
        });
    },
    addExternalTile: function(url) {
        var source = {
            type: 'iframe',
            url: url
        };
        addSite(url, source);
    },
    addTile: function(url, options) {
        addSite(url, options);
    },
    addWidget: function(type) {
        var widget = widgets.getSource(type);
        addSite(widget.url, widget);
    },
    setJsonUrl: function(type) {
        function resetSettings(key) {
            const ts = new Date().getTime();
            return persistenceService.save(key, {
                createdAt: ts.toString(),
                lastCheck: ts,
                updateInterval: 0
            });
        }

        Promise.all([
            resetSettings('games-widget-update-settings'),
            resetSettings('add-showcase-update-settings'),
            resetSettings('games-showcase-update-settings'),
            resetSettings('custom-images-update-settings'),
            resetSettings('presets-update-settings'),
            resetSettings('themes-update-settings')
        ]).then(function() {
            persistenceService.save('json_destination_url', type);
        });
    }
};

// add extras
Object.assign(window, { ntpExtras });

// redefining about:newtab
const redirectNewtabUrl = chrome.runtime.getURL('visual-bookmarks.html');

function redirectTabOnOurNewtab(tabId) {
    return chromeUtils
        .wrapChromeCallback(chrome.tabs, 'update', tabId, { url: redirectNewtabUrl });
}

function isFirefoxNewtabUrl(url) {
    const firefoxNewtabUrl = 'about:newtab';
    return url === firefoxNewtabUrl;
}

/*chrome.webNavigation.onBeforeNavigate.addListener(function(event) {
    if (isFirefoxNewtabUrl(event.url)) {
        redirectTabOnOurNewtab(event.tabId);
    }
});

chrome.tabs.onCreated.addListener(function(tab) {
    if (tab.url && isFirefoxNewtabUrl(tab.url)) {
        redirectTabOnOurNewtab(tab.id);
    }
});*/

chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
        if (isFirefoxNewtabUrl(tab.url)) {
            redirectTabOnOurNewtab(tab.id);
        }
    });
});

/* for replacement default ok avatar */
//chrome.webRequest.onBeforeRequest.addListener(
//    function(details) {
//        const defaultOkAvatar = chrome.runtime.getURL('img/odnoklassniki/default-avatar.png');
//        /* "https://a.ppy.sh/1149637_1435279138.png" */
//        return { redirectUrl: defaultOkAvatar };
//    }, {
//        urls: ["*://*.mycdn.me/res/stub_50x50.gif", "*://*.mycdn.me/res/stub_128x128.gif"]
//    },
//    ["blocking"]
//);
},{"../common/factory/chrome-factory":88,"../common/factory/localstorage-factory":89,"../common/models/tile-constants":113,"../common/utils/array":128,"../common/utils/async-foreach":129,"../common/utils/polyfills":138,"../common/utils/site-array-builder":139,"../common/utils/strings":140,"../common/utils/url-utils":141,"./../common/constants/extension-ids":81,"./../common/constants/tiles-modes":87,"./../common/services/distribution-service":116,"./../common/services/specific-values-service":120,"./lib/auth":2,"./lib/boards":3,"./lib/cache/favicon-cache":6,"./lib/cache/image-cache":7,"./lib/cache/meta-cache":8,"./lib/cache/mywidget-cache":9,"./lib/cache/sharing-temp-cache":13,"./lib/chrome-utils":15,"./lib/default-sites":17,"./lib/distribution-default-sites":19,"./lib/extensions":20,"./lib/favorites":21,"./lib/hints":22,"./lib/history":23,"./lib/inline-ok-service":26,"./lib/inline-theme-service":28,"./lib/json-services/add-showcase-json-service":29,"./lib/json-services/games-showcase-json-service":30,"./lib/json-services/games-widget-json-service":31,"./lib/json-services/ok-games-widget-json-service":33,"./lib/json-services/presets-json-service":34,"./lib/json-services/themes-json-service":36,"./lib/json-services/tiles-json-service":37,"./lib/master-plugin-wrapper":40,"./lib/metrics/metrics-service":42,"./lib/notifications":43,"./lib/page-action":44,"./lib/persistence":46,"./lib/presets":48,"./lib/promo-service":49,"./lib/recommendations":50,"./lib/recommended-sites":51,"./lib/social/social-service":62,"./lib/tile-info-service":64,"./lib/tile-info-services/custom-image":68,"./lib/tile-info-services/meta":72,"./lib/tile-info-services/promo-image":75,"./lib/utils":77,"./lib/vb-imported-sites":78,"./lib/widgets":79,"merge":157}],2:[function(require,module,exports){
'use strict';

const ClientOAuth2 = require('client-oauth2');
const chromeUtils = require('../chrome-utils');
const persistence = require('../persistence');
const md5 = require('../../../common/utils/md5');
const utf8 = require('../../../common/utils/utf8');
const urlUtils = require('../../../common/utils/url-utils');
const TileType = require('../../../common/models/tile-type');

const chrome = window.chrome;
const STORAGE_KEY = 'ok_auth_data';
const CONSUMER_KEY = 'CBAECHLEEBABABABA';
const API_URL = 'https://api.ok.ru/api';
const CONFIG = {
    clientId: '1136009984',
    authorizationUri: 'https://connect.ok.ru/oauth/authorize',
    redirectUri: 'https://oauth.mycdn.me/blank.html',
    scopes: 'LONG_ACCESS_TOKEN;VALUABLE_ACCESS;SET_STATUS;PHOTO_CONTENT;VIDEO_CONTENT;MESSAGING'
};

const okAuth = new ClientOAuth2(CONFIG);
let cachedToken = null;
let loginStatusPromise = null;

function getToken() {
    if (cachedToken) {
        return Promise.resolve(cachedToken);
    }
    return persistence.load(STORAGE_KEY).then((result) => {
        const data = result.hasOwnProperty(STORAGE_KEY) ? result[STORAGE_KEY] : null;
        if (data) {
            cachedToken = okAuth.createToken(data);
            cachedToken.expiresIn(parseInt(data.expires_in));
        }
        console.log('AUTH:CACHEDTOKEN', cachedToken);
        return cachedToken;
    });
}

const onBeforeSendHeadersListener = (details) => {
    const headers = details.requestHeaders || [];
    headers.push({ name: 'Referer', value: 'https://mail.ru' });
    return { requestHeaders: headers };
};

function checkOKLoginStatus() {
    chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeadersListener,
        { urls: [ 'https://ok.ru/mapi*' ] },
        [ 'blocking', 'requestHeaders' ]
    );

    return fetch('https://ok.ru/mapi?query=%7B%22cmd%22%3A%22getCounters%22%7D&callback=some', { credentials: 'include' })
        .then(r => r.text())
        .then(r => r.replace(/^.+some\((.+)\);$/i, '$1'))
        .then(r => JSON.parse(r))
        .then(r => {
            chrome.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeadersListener);
            return r.status === 'ok';
        })
        .catch(e => {
            chrome.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeadersListener);
            return false;
        });
}

function isLoggedIn(skipAutoLogin) {
    if (loginStatusPromise === null) {
        loginStatusPromise = getToken().then((token) => {
            if (token !== null) {
                return true;
            }
            if (skipAutoLogin === true) {
                return false;
            }
            return checkOKLoginStatus()
                .then((status) => {
                    if (status) {
                        return login()
                            .then(() => true)
                            .catch(() => false);
                    }
                    return false;
                });
        }).then((status) => {
            loginStatusPromise = null;
            return status;
        });
    }
    return loginStatusPromise;
}

function signParams(params, secret) {
    const str = urlUtils.paramsToString(params, '', true).concat(secret);
    return md5(utf8.encode(str)).toLowerCase();
}

function api(method, options) {
    return getToken().then((token) => {
        if (token === null) {
            throw new Error('No token provided');
        }

        const params = Object.assign({}, {
            application_key: CONSUMER_KEY,
            format: 'json'
        }, options);

        const signature = signParams(params, token.data.session_secret_key);

        const additionalParams = {
            access_token: token.data.access_token,
            sig: signature
        };

        const requestParams = urlUtils.paramsToString(Object.assign({}, params, additionalParams));
        const url = `${API_URL}/${method}?${requestParams}`;
        console.log('AUTH:API_URL', url);

        const request = {
            url: url,
            method: 'GET',
        };

        return token.client.request(request.method, request.url, {}, {})
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('API Error ' + response.status);
                }

                const result = JSON.parse(response.body);

                if (result.error_code) {
                    throw new Error('API Error ' + result.error_msg);
                }

                return result;
            })
            .catch((err) => {
                console.error('AUTH:API_ERROR', err);
                return logout().then(() => null);
            });
    });
}

function getCurrentUser() {
    return api('users/getCurrentUser', {
        fields: 'uid,first_name,last_name,name,gender,online,pic_base,pic50x50,pic128x128'
    });
}

function getGifts() {
    return api('presents/getShowcaseSingleSection', {
        present_origin: 'PULT',
        section_name: 'actualGifts',
        columns_count: 10,
        postcard_columns_count: 10,
        music_gifts_supported: 0
    });
}

function getShowcases() {
    const fetchRb = () => {
        return fetch(`http://ad.mail.ru/adi/1058337?ts=${Date.now()}`)
            .then(response => response.json());
    };

    return api('apps/getPlatformCatalogNodesTop', {
        fields: 'id,url,name,pic128x128,banner230x150'
    });
}

function getUserById(userId) {
    return api('users/getInfo', {
        uids: `${userId}`,
        fields: 'uid,first_name,last_name,name,gender,online,pic_base,pic128x128'
    });
}

function getStreams() {
    return api('video/getCatalog', {
        catalog: 'LIVE_TV_APP',
        count: 10,
        fields: 'video.title,video.permalink,video.thumbnail_url'
    });
}

function getNotifications(tileType) {
    let types;
    switch (tileType) {
        case TileType.OK_MARKS:
            types = 'MARKS';
            break;
        case TileType.OK_GUESTS:
            types = 'GUESTS';
            break;
        case TileType.OK_MESSAGES:
            types = 'MESSAGES';
            break;
        default:
            types = 'NOTIFS_UNREAD';
    }
    return api('events/get', { types: types });
}

function login() {
    return new Promise((resolve, reject) => {
        chromeUtils.wrapChromeCallback(chrome.tabs, 'create', { url: okAuth.token.getUri() }).then((authTab) => {
            const authTabId = authTab.id;
            //const updateListener = (tabId, changeInfo) => {
            const updateListener = (event) => {
                if (/*event.url.indexOf('api.ok.ru/blank.html') !== -1 && */authTabId === event.tabId) {
                    removeAllListeners();
                    chromeUtils.wrapChromeCallback(chrome.tabs, 'remove', authTabId)
                      .then(() => okAuth.token.getToken(event.url))
                      .then((token) => {
                          cachedToken = token;
                          return cachedToken.data;
                      })
                      .then((data) => persistence.save(STORAGE_KEY, data).then(() => data))
                      .then(resolve)
                      .catch(e => {
                          console.error(e);
                          reject();
                      });
                }

                //console.log('Updatae---------', tabId, authTabId, changeInfo);
                //if (tabId === authTabId && changeInfo.url !== undefined /*&& /*changeInfo.status === 'loading'*/) {
                //    if (changeInfo.url.indexOf('api.ok.ru/blank.html') !== -1) {
                //        removeAllListeners();
                //        chromeUtils.wrapChromeCallback(chrome.tabs, 'remove', authTabId)
                //            .then(() => okAuth.token.getToken(changeInfo.url))
                //            .then((token) => {
                //                cachedToken = token;
                //                return cachedToken.data;
                //            })
                //            .then((data) => persistence.save(STORAGE_KEY, data).then(() => data))
                //            .then(resolve)
                //            .catch(reject);
                //    }
                //}
            };
            const removeListener = (tabId) => {
                if (tabId === authTabId) {
                    removeAllListeners();
                    reject();
                }
            };
            const removeAllListeners = () => {
                chrome.tabs.onUpdated.removeListener(updateListener);
                chrome.tabs.onRemoved.removeListener(removeListener);
                chrome.webNavigation.onCompleted.removeListener(updateListener);
            };

            //chrome.tabs.onUpdated.addListener(updateListener);
            chrome.tabs.onRemoved.addListener(removeListener);
            chrome.webNavigation.onCompleted.addListener(updateListener, { url: [
                { urlMatches: 'http://api.ok.ru/blank.html' },
                { urlMatches: 'https://api.ok.ru/blank.html' },
                { urlMatches: 'https://oauth.mycdn.me/blank.html' },
            ] });
        });
    });
}

function logout() {
    const removeCookie = (name) => chromeUtils.wrapChromeCallback(chrome.cookies, 'remove', { name: name, url: 'https://ok.ru' });
    const removeJSessionId = () => removeCookie('JSESSIONID');
    const removeAuthCode = () => removeCookie('AUTHCODE');
    const removeToken = () => persistence.remove(STORAGE_KEY);
    const clearCachedToken = () => (cachedToken = null);

    return Promise
        .all([ removeAuthCode(), removeJSessionId(), removeToken() ])
        .then(clearCachedToken);
}

module.exports = {
    isLoggedIn,
    login,
    logout,
    getCurrentUser,
    getGifts,
    getStreams,
    getShowcases,
    getNotifications,
    getUserById
};

},{"../../../common/models/tile-type":114,"../../../common/utils/md5":135,"../../../common/utils/url-utils":141,"../../../common/utils/utf8":142,"../chrome-utils":15,"../persistence":46,"client-oauth2":145}],3:[function(require,module,exports){
"use strict";

var boardsCache = require('./cache/boards-cache');
var boardsSettingsCache = require('./cache/boards-settings-cache');
var persistence = require('./persistence');
var MAX_TILES_COUNT = require('../../common/models/tile-constants').MAX_TILES_COUNT;
var guid = require('../../common/utils/guid');

var BOARDS_SETTINGS_KEY = 'boards-settings';
var boardsSettings;

function getBoards() {
    return boardsCache.get('boards');
}

function saveBoards(boards) {
    return boardsCache.put('boards', boards);
}

function getSettings() {
    if (boardsSettings) {
        return Promise.resolve(boardsSettings);
    }

    return persistence.loadExt(BOARDS_SETTINGS_KEY).then(settings => {
        if (settings) {
            return Promise.resolve(settings);
        }

        return boardsSettingsCache.has(BOARDS_SETTINGS_KEY).then(function(hasSettings) {
            return hasSettings ? boardsSettingsCache.get(BOARDS_SETTINGS_KEY) : { };
        });
    });
}

function saveSettings(newSettings) {
    return getSettings().then(oldSettings => {
        console.debug('BOARDS SETTINGS', oldSettings, newSettings);
        return persistence.save(BOARDS_SETTINGS_KEY, Object.assign({}, oldSettings, newSettings));
    });
}

function init(boards) {
    return Promise.all([
        saveBoards(boards),
        saveSettings({ activeBoardIndex: 0 })
    ]);
}

module.exports = {
    initWithTiles(sites, boardsCount) {
        boardsCount = boardsCount || 1;

        var boards = [];
        var sitesCopy = sites.slice(0);

        if (boardsCount === 1) {
            boards = [{
                tiles: sitesCopy
            }];
        } else {
            for (var i = 0; i < boardsCount; ++i) {
                var notFirstBoardWithNoTiles = i > 0 && sites.length === 0;
                if (!notFirstBoardWithNoTiles) {
                    boards.push({
                        tiles: sitesCopy.splice(0, MAX_TILES_COUNT)
                    });
                }
            }
        }

        return init(boards);
    },

    initWithBoards: init,

    getBoards,

    saveBoards,

    getSettings,

    saveSettings,

    getTiles() {
        return getBoards().then(function(boards) {
            return boards.reduce(function(prev, curr) {
                return prev.concat(curr.tiles);
            }, []);
        });
    },

    eliminateDuplicateIds() {
        return getBoards().then(function(boards) {
            const idHash = new Set();

            boards.forEach(function(board) {
                board.tiles.forEach(function(tile) {
                    const id = tile.id.toString();
                    if (idHash.has(id)) {
                        tile.id = guid();
                    }
                    idHash.add(id);
                });
            });
            return saveBoards(boards);
        }).catch(function() {
            return false;
        });
    }
};
},{"../../common/models/tile-constants":113,"../../common/utils/guid":133,"./cache/boards-cache":4,"./cache/boards-settings-cache":5,"./persistence":46}],4:[function(require,module,exports){
"use strict";

var cache = require('./named-cache')('boards');

module.exports = cache;
},{"./named-cache":10}],5:[function(require,module,exports){
"use strict";

var cache = require('./named-cache')('boards-settings');

module.exports = cache;
},{"./named-cache":10}],6:[function(require,module,exports){
"use strict";

var cache = require('./named-cache')('favicons');

module.exports = cache;
},{"./named-cache":10}],7:[function(require,module,exports){
"use strict";

var cache = require('./named-cache')('images');

module.exports = cache;
},{"./named-cache":10}],8:[function(require,module,exports){
"use strict";

var cache = require('./named-cache')('meta');

module.exports = cache;
},{"./named-cache":10}],9:[function(require,module,exports){
"use strict";

var cache = require('./named-cache')('mywidget');

module.exports = cache;
},{"./named-cache":10}],10:[function(require,module,exports){
"use strict";

var persistence = require('./../persistence');

function throttle(callback, limit) {
    var wait = false;
    var timeoutId = -1;
    return function(force) {
        if (force === true) {
            window.clearTimeout(timeoutId);
            wait = false;
        }

        if (wait === true) {
            return Promise.resolve();
        }

        wait = true;
        timeoutId = window.setTimeout(function() {
            wait = false;
        }, limit);

        return callback.call();
    };
}

var OperationType = {
    ADD: 0,
    REMOVE: 1,
    REMOVE_ALL: 2
};

module.exports = function(name, interval) {
    var cache;
    var operationQueue = [];
    var syncInterval = interval || 300;

    function read() {
        if (cache) {
            return Promise.resolve(cache);
        }

        return persistence.load(name).then(function(data) {
            cache = data[name] || { };
            return cache;
        });
    }

    function enqueueOperation(type, item) {
        operationQueue.push({ type, item });
        return sync();
    }

    function persist() {
        return read().then(function(c) {
            let operation;
            for (var i = 0, n = operationQueue.length; i < n; i++) {
                operation = operationQueue[i];

                if (operation.type === OperationType.ADD) {
                    c[operation.item.key] = operation.item.value;
                }

                if (operation.type === OperationType.REMOVE) {
                    c[operation.item.key] = null;
                    delete c[operation.item.key];
                }

                if (operation.type === OperationType.REMOVE_ALL) {
                    c = {};
                }
            }
            return persistence.save(name, c).then(function() {
                cache = undefined; // Reset caching
            });
        });
    }

    var sync = throttle(persist, syncInterval);

    return {
        has: function(key) {
            return read().then(function(c) {
                return c.hasOwnProperty(key);
            });
        },
        getKeys: function() {
            return read().then(function(c) {
                return Object.keys(c);
            });
        },
        get: function(key) {
            return read().then(function(c) {
                if (c.hasOwnProperty(key)) {
                    return c[key];
                }

                throw new Error('Key not found' + key);
            });
        },
        getAll: function() {
            return read().then(function(c) {
                var result = [];

                for (var key in c) {
                    if (c.hasOwnProperty(key)) {
                        result.push(c[key]);
                    }
                }

                return result;
            });
        },
        put: function(key, value) {
            return enqueueOperation(OperationType.ADD, { key, value });
        },
        remove: function(key) {
            return enqueueOperation(OperationType.REMOVE, { key });
        },
        removeAll: function() {
            return enqueueOperation(OperationType.REMOVE_ALL);
        },
        flush: function() {
            return sync(true);
        },
        clear: function() {
            cache = undefined;
        }
    };
};
},{"./../persistence":46}],11:[function(require,module,exports){
"use strict";

var cache = require('./named-cache')('preset-images');

module.exports = cache;
},{"./named-cache":10}],12:[function(require,module,exports){
"use strict";

var cache = require('./named-cache')('promo-images');

module.exports = cache;
},{"./named-cache":10}],13:[function(require,module,exports){
"use strict";

var cache = require('./named-cache')('sharing-temp');

module.exports = cache;
},{"./named-cache":10}],14:[function(require,module,exports){
"use strict";

var cache = require('./named-cache')('temp-meta');

module.exports = cache;
},{"./named-cache":10}],15:[function(require,module,exports){
"use strict";

var chrome = require('../../common/factory/chrome-factory')();

function wrapChromeCallback(context, operation /*, ...rest */) {
    var extArgs = arguments;

    return new Promise(function(resolve, reject) {
        var callback = function(result) {
            if (chrome.runtime.lastError) {
                return reject(new Error(chrome.runtime.lastError));
            }

            return resolve(result);
        };

        var args = [].splice.call(extArgs, 2).concat(callback);

        context[operation].apply(context, args);
    });
}

module.exports = {
    wrapChromeCallback: wrapChromeCallback
};
},{"../../common/factory/chrome-factory":88}],16:[function(require,module,exports){
"use strict";

var utils = require('./utils');

var PALETTE = [
    createColorObject(0x00, 0x52, 0xdd),
    createColorObject(0xf1, 0x5f, 0x1f),
    createColorObject(0xf8, 0x98, 0x24),
    createColorObject(0x36, 0xbb, 0xb6),
    createColorObject(0x00, 0x7e, 0xff),
    createColorObject(0x6d, 0xab, 0x1a),
    createColorObject(0xb7, 0xc0, 0x0e),
    createColorObject(0xdd, 0xb1, 0x0e),

    createColorObject(0x34, 0x1e, 0x64),
    createColorObject(0x6d, 0xab, 0x1a),
    createColorObject(0x00, 0xac, 0xed),
    createColorObject(0xdd, 0xb1, 0x0e),
    createColorObject(0x00, 0x98, 0xb3),
    createColorObject(0x94, 0xbe, 0x4b),
    createColorObject(0x3b, 0x2c, 0x97),
    createColorObject(0xd6, 0x37, 0x00),

    createColorObject(0x00, 0x98, 0xb3),
    createColorObject(0x62, 0x30, 0x8a),
    createColorObject(0x12, 0x32, 0x9a),
    createColorObject(0x00, 0x7e, 0xff),
    createColorObject(0xb7, 0xc0, 0x0e),
    createColorObject(0x64, 0x56, 0xbb),
    createColorObject(0xff, 0x78, 0x00),
    createColorObject(0x00, 0xac, 0xed)
];

function getContrastIndex(colorObj) {
    return (parseInt(colorObj.r) * 299 + parseInt(colorObj.g) * 587 + parseInt(colorObj.b) * 144) / 1000;
}

function getBrightnessDifference(c1, c2) {
    return getContrastIndex(c1) - getContrastIndex(c2);
}

function getHueDifference(c1, c2) {
    return Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b);
}

function isDark(colorObj) {
    var white = whiteColor();

    var brightnessDifference = getBrightnessDifference(white, colorObj);
    var hueDifference = getHueDifference(white, colorObj);

    return brightnessDifference <= 125 || hueDifference <= 300;
}

function isTransparent(colorObj) {
    return colorObj.hasOwnProperty('a') && colorObj.a < 0.2;
}

function makeRgb(colorObj) {
    return [ 'rgb(', colorObj.r, ',', colorObj.g, ',', colorObj.b, ')' ].join('');
}

function makeRgba(colorObj) {
    return [ 'rgba(', colorObj.r, ',', colorObj.g, ',', colorObj.b, ',', colorObj.a, ')' ].join('');
}

function createColorObject(r, g, b, a) {
    return { r: r, g: g, b: b, a: a === undefined ? 1.0 : a };
}

function whiteColor() {
    return createColorObject(255, 255, 255, 1);
}

function randomColor(palette) {
    return palette[utils.randomInt(0, palette.length - 1)];
}

function randomColorFromDefaultPalette() {
    return randomColor(PALETTE);
}

function getTheme(colorObj, ignoreAlpha) {
    if (ignoreAlpha !== true && (colorObj.a !== undefined && colorObj.a < 0.1)) {
        return 'dark';
    }

    return isDark(colorObj) ? 'dark' : 'light';
}

function needsBorder(colorObj) {
    return (colorObj.a < 0.05 || (colorObj.r === 255 && colorObj.g === 255 && colorObj.b === 255));
}

function defaultIconBackgroundObject() {
    return { r: 0, g: 0, b: 0, a: 0.6 };
}

function defaultIconBackground() {
    return makeRgba(defaultIconBackgroundObject());
}

module.exports = {
    isDark: isDark,
    makeRgb: makeRgb,
    makeRgba: makeRgba,
    getTheme: getTheme,
    whiteColor: whiteColor,
    randomColor: randomColor,
    needsBorder: needsBorder,
    isTransparent: isTransparent,
    createColorObject: createColorObject,
    defaultIconBackground: defaultIconBackground,
    defaultIconBackgroundObject: defaultIconBackgroundObject,
    randomColorFromDefaultPalette: randomColorFromDefaultPalette
};
},{"./utils":77}],17:[function(require,module,exports){
"use strict";

var generator = require('./demo-site-generator');
var proxy = require('./xhr-proxy');
var url = '';

var sampleData = generator([
    {
        title: 'Одноклассники',
        url: 'http://ok.ru'
    },
    {
        title: 'YouTube',
        url: 'https://youtube.com'
    },
    {
        title: 'Twitter',
        url: 'https://twitter.com'
    },
    {
        title: 'Новости Mail.Ru',
        url: 'http://news.mail.ru'
    },
    {
        title: 'ВКонтакте',
        url: 'https://vk.com'
    },
    {
        title: 'Мой Мир@mail.ru',
        url: 'http://my.mail.ru'
    },
    {
        title: 'Облако Mail.Ru',
        url: 'https://cloud.mail.ru/'
    },
    {
        title: 'Facebook',
        url: 'https://www.facebook.com/'
    },
    {
        title: 'Wikipedia',
        url: 'http://www.wikipedia.org/'
    },
    {
        title: 'Instagram',
        url: 'http://instagram.com/'
    },
    {
        title: 'Ask.fm',
        url: 'http://ask.fm/'
    },
    {
        title: 'Добро Mail.ru',
        url: 'http://dobro.mail.ru'
    },
    {
        title: 'Ответы@Mail.Ru',
        url: 'http://otvet.mail.ru/'
    },
    {
        title: 'Фотострана',
        url: 'http://fotostrana.ru/'
    },
    {
        title: 'Ground War: Tanks',
        url: 'https://tanks.mail.ru/',
        extendedInfo: {
            type: 'content',
            theme: 'light',
            overlay: '30,29,29',
            image: 'http://amigoimgs.cdnmail.ru/877d7e1a7a44aa1dd26631b882f8ce7d.png'
        }
    },
    {
        title: 'Warface',
        url: 'https://wf.mail.ru/',
        extendedInfo: {
            type: 'content',
            theme: 'light',
            overlay: '22, 24, 42',
            image: 'http://amigoimgs.cdnmail.ru/8920225f77b67d66bf8409244eaa9b13.png'
        }
    },
    {
        title: 'Skyforge',
        url: 'https://sf.mail.ru/',
        extendedInfo: {
            type: 'content',
            theme: 'light',
            overlay: '5, 8, 12',
            image: 'http://amigoimgs.cdnmail.ru/27fafe14e3c1863bdf9c70165e181c59.png'
        }
    }
]);

module.exports = {
    load: function() {
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(sampleData);
            });
        });
    }
};
},{"./demo-site-generator":18,"./xhr-proxy":80}],18:[function(require,module,exports){
"use strict";

var guid = require('../../common/utils/guid');

function createTile(params) {
    return Object.assign({}, params, {
        id: params.id || guid(),
        url: params.url || 'http://mail.ru',
        title: params.title || 'm@il.ru',
        visitCount: isNaN(params.visitCount) ? 0 : params.visitCount
    });
}

module.exports = function(data) {
    var result = [ ];

    data.forEach(function(item) {
        result.push(createTile(item || { }));
    });

    return result;
};


},{"../../common/utils/guid":133}],19:[function(require,module,exports){
var widgets = require('./widgets');
var TileType = require('../../common/models/tile-type');

function getSites() {
    return [
        widgets.getSource(TileType.EMAIL),
        {
            type: TileType.SITE,
            title: 'Mail.Ru',
            url: 'https://inline.go.mail.ru/homepage?inline_comp=pult&inline_no_gp=1'
        },
        widgets.getSource(TileType.HORO),
        widgets.getSource(TileType.WEATHER),
        widgets.getSource(TileType.CURRENCY),
        {
            title: 'Новости Mail.Ru',
            url: 'http://news.mail.ru'
        },
        {
            title: 'Армата',
            url: 'http://1l-go.mail.ru/r/adid/2108081_2000049/pid/100022/pof/1/f/3/'
        },
        {
            title: 'Облако Mail.Ru',
            url: 'https://cloud.mail.ru/'
        },
        {
            title: 'Кино Mail.Ru',
            url: 'https://afisha.mail.ru/'
        },
        {
            title: 'Одноклассники',
            url: 'http://ok.ru'
        },
        {
            title: 'ВКонтакте',
            url: 'https://vk.com'
        },
        {
            title: 'МойМир',
            url: 'http://my.mail.ru'
        },
        {
            title: 'ArchAge',
            url: 'http://1l-go.mail.ru/r/adid/2108078_1218/pid/334/pof/1/f/3/'
        },
        {
            title: 'Crossfire',
            url: 'http://1l-go.mail.ru/r/adid/2108082_247/pid/112/pof/1/f/3/'
        },
        {
            title: 'Бумз!',
            url: 'http://1l-go.mail.ru/r/adid/2108083_598/pid/178/pof/1/f/1/'
        },
        {
            title: 'ПараПа',
            url: 'http://1l-go.mail.ru/r/adid/2108084_107/pid/45/pof/1/f/3/'
        },
        {
            title: 'Perfect World',
            url: 'http://1l-go.mail.ru/r/adid/2108085_144/pid/52/pof/1/f/3/'
        },
        {
            title: 'Warface',
            url: 'http://1l-go.mail.ru/r/adid/2108086_824/pid/274/pof/1/f/3/'
        },
        {
            title: 'Skyforge',
            url: 'http://1l-go.mail.ru/r/adid/2108087_2000042/pid/100017/pof/1/f/3/'
        },
        {
            title: 'Аллоды Онлайн',
            url: 'http://1l-go.mail.ru/r/adid/2108313_194/pid/81/pof/1/f/1/'
        }
    ];
}

module.exports = {
    getSites
};
},{"../../common/models/tile-type":114,"./widgets":79}],20:[function(require,module,exports){
"use strict";

const chrome = require('../../common/factory/chrome-factory')();
const localize = require('../../common/services/localize-service');
const chromeUtils = require('./chrome-utils');

const extensionIds = require('./../../common/constants/extension-ids');
const tileFactory = require('../../common/factory/tile-factory');
const TileType = require('../../common/models/tile-type');
const MediaTileType = require('../../common/constants/media-tiles-types');
const widgets = require('./widgets');

module.exports = {
    list() {
        return Promise.resolve([]);
        // management is not supported in the Firefox
        //return chromeUtils.wrapChromeCallback(chrome.management, 'getAll');
    },

    hasExtension(id) {
        return this.list().then(extensions => {
            console.log('extensions', extensions);
            return extensions.findIndex(info => {
                return info.id === id && info.enabled === true;
            }) !== -1;
        });
    },

    getAllExtensionsList() {
        return Promise.all([
            // FIREFOX does not support chrome.management.getAll
            //this.hasExtension(extensionIds.MUSIC_APP),
            //this.hasExtension(extensionIds.MUSIC_EXT),
            //this.hasExtension(extensionIds.MAIL_CHECKER_EXT)
        ]).then(extensions => {
            const hasMusicApp = false;//extensions[0];
            const hasMusicExt = false;//extensions[1];
            const hasMailCheckerExt = false;//= extensions[2];

            const result = [ ];

            result.push(widgets.getSource(TileType.EMAIL, { hasExt: hasMailCheckerExt }));

            result.push({
                type: TileType.SITE,
                title: 'mail.ru',
                url: 'http://mail.ru'
            });

            result.push(widgets.getSource(TileType.HORO));

            result.push(widgets.getSource(TileType.WEATHER));

            if (hasMusicApp || hasMusicExt) {
                result.push(widgets.getSource(TileType.MUSIC, { hasApp: hasMusicApp }));
            }

            result.push(widgets.getSource(TileType.CURRENCY));

            result.push({
                type: TileType.SHOWCASE,
                title: localize('widgets_games'),
                showcaseType: 'games'
            });

            result.push(widgets.getSource(MediaTileType.RECIPES));
            result.push(widgets.getSource(MediaTileType.HITECH));
            result.push(widgets.getSource(TileType.OK_GAMES));

            return result;
        });
    },
    getPredefinedExtensionsList() {
        const predefinedTypesList = [
            TileType.EMAIL,
            TileType.SITE,
            TileType.HORO,
            TileType.WEATHER,
            TileType.MUSIC,
            TileType.CURRENCY,
            TileType.SHOWCASE,
            MediaTileType.RECIPES,
            MediaTileType.HITECH
        ];

        return this.getAllExtensionsList().then(list =>{
            return list.filter(item => predefinedTypesList.includes(item.type));
        });
    }
};
},{"../../common/constants/media-tiles-types":82,"../../common/factory/chrome-factory":88,"../../common/factory/tile-factory":91,"../../common/models/tile-type":114,"../../common/services/localize-service":118,"./../../common/constants/extension-ids":81,"./chrome-utils":15,"./widgets":79}],21:[function(require,module,exports){
"use strict";

var utils = require('./chrome-utils');
var chrome = require('../../common/factory/chrome-factory')();
var urlUtils = require('../../common/utils/url-utils');

function sitesFromBookmarks(bkArr) {
    var sitesArray = [];
    bkArr.forEach(function(bk) {
        if (bk.children && bk.children.length > 0 ) {
            sitesArray = sitesArray.concat(sitesFromBookmarks(bk.children));
        } else if (!bk.children && bk.url && urlUtils.isValidUrl(bk.url)){
            sitesArray.push(bk);
        }
    });
    return sitesArray;
}

function getBookmarksTree() {
    return utils.wrapChromeCallback(chrome.bookmarks, 'getTree');
}

function getFavorites() {
    if (favorites.length === 0) {
        return getBookmarksTree().then(function(tree) {
            favorites = sitesFromBookmarks(tree);
            return favorites;
        });
    }

    return new Promise(function(resolve){
        resolve(favorites);
    });
}

//chrome.bookmarks.onCreated.addListener(function() {
//    console.log('BK ON CHANGED');
//    getBookmarksTree().then(function(tree) {
//        favorites = sitesFromBookmarks(tree);
//    });
//});

var favorites = [];

module.exports = {
    getFavorites: getFavorites
};
},{"../../common/factory/chrome-factory":88,"../../common/utils/url-utils":141,"./chrome-utils":15}],22:[function(require,module,exports){
"use strict";

var GuideType = require('../../common/models/guide-type');
var RuleType = require('../../common/models/guide-rule-type');
var localize = require('../../common/services/localize-service');

var hints = [
    {
        type: GuideType.HINT,
        events: {
            show: 'addTile',
            disable: 'newTile'
        },
        disabled: false,
        selector: '.add-button',
        positioningMode: 'center',
        shift: {
            left: {
                value: -110,
                unit: '%'
            },
            top: {
                value: 0,
                unit: 'px'
            }
        },
        className: 'hint-add-tile',
        description: localize('hints_addFavoriteSites'),
        imgUrl: '/img/hints/add-tile.png',
        displayRule: {
            type: RuleType.TIME,
            data: {
                timeUntilDisplay: 24 * 60 * 60 * 1000 //1 day
            }
        }
    },
    {
        type: GuideType.HINT,
        events: {
            show: 'popUp'
        },
        disabled: false,
        selector: '.add-site-form',
        positioningMode: 'right-top',
        shift: {
            left: {
                value: 25,
                unit: '%'
            },
            top: {
                value: -25,
                unit: '%'
            }
        },
        className: 'hint-popup',
        description: localize('hints_enterSiteName'),
        imgUrl: null,
        displayRule: {
            type: RuleType.COUNT,
            data: {
                maxDisplayCount: 1
            }
        }
    },
    {
        type: GuideType.HINT,
        events: {
            show: 'dragTile'
        },
        disabled: false,
        selector: '.drag-zone.right .drag-slider',
        positioningMode: 'center',
        shift: {
            left: {
                value: -75,
                unit: '%'
            },
            top: {
                value: -100,
                unit: '%'
            }
        },
        className: 'hint-dragtile',
        description: localize('hints_dragSite'),
        imgUrl: null,
        displayRule: {
            type: RuleType.COUNT,
            data: {
                maxDisplayCount: 1
            }
        }
    },
    {
        type: GuideType.HINT,
        events: {
            show: 'restoreTile'
        },
        disabled: false,
        selector: '.restore-block',
        positioningMode: 'right',
        shift: {
            left: {
                value: 60,
                unit: '%'
            },
            top: {
                value: 30,
                unit: '%'
            }
        },
        className: 'hint-restore-tile',
        description: localize('hints_restoreSite'),
        imgUrl: '/img/hints/restore-tile.png',
        displayRule: {
            type: RuleType.COUNT,
            data: {
                maxDisplayCount: 1
            }
        }
    },
    {
        type: GuideType.HINT,
        events: {
            show: 'canDragTile',
            disable: 'draggingTile'
        },
        disabled: false,
        selector: '.grid',
        positioningMode: 'center',
        shift: {
            left: {
                value: 55,
                unit: '%'
            },
            top: {
                value: 0,
                unit: 'px'
            }
        },
        className: 'hint-can-drag-tile',
        description: localize('hints_reorderSite'),
        imgUrl: '/img/hints/can-drag-tile.png',
        displayRule: {
            type: RuleType.TIME,
            data: {
                timeUntilDisplay: 2 * 24 * 60 * 60 * 1000 //2 days
            }
        }
    },
    {
        type: GuideType.HINT,
        events: {
            show: 'moreThemes',
            disable: 'openThemesPanel'
        },
        disabled: false,
        selector: '.theme-shortcut .shortcut-title',
        positioningMode: 'top',
        shift: {
            left: {
                value: -60,
                unit: '%'
            },
            top: {
                value: -100,
                unit: '%'
            }
        },
        className: 'hint-more-themes',
        description: localize('hints_moreBackgrounds'),
        imgUrl: '/img/hints/hint-more-themes.png',
        displayRule: {
            type: RuleType.TIME,
            data: {
                timeUntilDisplay: 3 * 24 * 60 * 60 * 1000 //3 days
            }
        }
    }
];

module.exports = {
    loadHints: function() {
        return new Promise(function(resolve) {
            resolve(hints);
        });
    },
    updateHints: function(oldHints) {
        if (!oldHints) {
            return hints;
        }

        var hintsToAdd = [];
        hints.forEach(function(newHint) {
            var index = oldHints.findIndex(function(oldHint) {
                return newHint.events.show === oldHint.events.show;
            });

            if (index === -1) {
                hintsToAdd.push(newHint);
            } else {
                oldHints[index] = Object.assign({}, oldHints[index], newHint);
            }
        });

        return oldHints.concat(hintsToAdd);
    }
};
},{"../../common/models/guide-rule-type":98,"../../common/models/guide-type":99,"../../common/services/localize-service":118}],23:[function(require,module,exports){
"use strict";

var utils = require('./chrome-utils');
var chrome = require('../../common/factory/chrome-factory')();

function search(options) {
    return utils.wrapChromeCallback(chrome.history, 'search', options);
}

function getHistoryForLastMonth() {
    var startTime = new Date();
    startTime.setMonth(startTime.getMonth() - 1);

    var endTime = new Date();

    return search({ startTime: startTime.getTime(), endTime: endTime.getTime(), text: '', maxResults: 500 });
}

function getTopSites() {
    return Promise.resolve([]);
    //FIREFOX does not support chrome.topSites
    //return utils.wrapChromeCallback(chrome.topSites, 'get');
}

var historyService = {
    search: search,
    getHistoryForLastMonth: getHistoryForLastMonth,
    getTopSites: getTopSites
};

module.exports = historyService;
},{"../../common/factory/chrome-factory":88,"./chrome-utils":15}],24:[function(require,module,exports){
"use strict";

var urlChecker = require('./url-checker');

module.exports = {
    check: function(url) {
        return new Promise(function(resolve) {
            // Not all servers respond to HEAD request
            urlChecker.check(url).then(function(res) {
                if (res.headers.hasOwnProperty('content-type') && res.headers['content-type'].indexOf('image/') !== -1) {
                    return resolve(true);
                }

                return resolve(false);
            }).catch(function() {
                return resolve(false);
            });
        });
    }
};
},{"./url-checker":76}],25:[function(require,module,exports){
"use strict";

//var xhr = require('xhr');
var proxy = require('./xhr-proxy');
var imageUtils = require('./../../common/utils/image-utils');

module.exports = {
    loadAndConvertToDataUrl: function(url) {
        var self = this;

        return self.load(url).then(function(blob) {
            var objectUrl = window.URL.createObjectURL(blob);

            return imageUtils.convertToDataUrl(objectUrl).then(function(dataUrl) {
                self.unload(blob);
                return dataUrl;
            });
        });
    },
    load: function(url) {
        return proxy.load({ url: url, method: 'GET', responseType: 'blob' });
    },
    unload: function(blob) {
        return blob && window.URL.revokeObjectURL(blob);
    }
};
},{"./../../common/utils/image-utils":134,"./xhr-proxy":80}],26:[function(require,module,exports){
const chromeUtils = require('./chrome-utils');
const persistence = require('./persistence');

const KEY = 'presets_history';

const loadSavedValue = () => persistence.loadExt(KEY);

const getCookie = (name) =>
    chromeUtils.wrapChromeCallback(chrome.cookies, 'get', { name: name, url: 'http://inline.go.mail.ru' });

const getVidCookie = () => getCookie('VID');

module.exports = {
    getVidCookie: function() {
        return getVidCookie()
            .then((cookie) => (cookie ? cookie.value : null));
    },
    hasOkPreset: function() {
        return loadSavedValue()
            .then((history) => Array.isArray(history) && history.indexOf('okru') > -1)
            .catch((err) => false);
    }
};

},{"./chrome-utils":15,"./persistence":46}],27:[function(require,module,exports){
const distributionService = require('../../common/services/distribution-service');

function getInlineParamValue(param) {
    return distributionService.getExtensionData().then(function(extensionData) {
        return extensionData[param];
    });
}

module.exports = { getInlineParamValue };
},{"../../common/services/distribution-service":116}],28:[function(require,module,exports){
const themeImageService = require('../../common/services/theme-image-service');
const inlineThemeCache = require('./cache/named-cache')('inline-themes');
const inlineParamService = require('./inline-param-service');
const imageLoader = require('./image-loader');
const guid = require('../../common/utils/guid');

function getInlineTheme() {
    return inlineParamService.getInlineParamValue('pic')
        .then(function(value) {
            //return 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=1e9d6264da3ae9cacdddcad3b63f3c04';
            //return 'https://images.unsplash.com/photo-1463412855783-af97e375664b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=19e33c88ec16bba61815e6f55ee8f06a';
            //return 'https://images.unsplash.com/photo-1462819067004-905a72ea3996?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=4832f28a526c7a3538a887b8fbbfe897';
            if (!value || value === '') {
                return null;
            }
            return decodeURIComponent(value);
        });
}

function markThemeApplied(value) {
    return inlineThemeCache.put(value, true);
}

function createInlineThemeFromImageUrl(value) {
    return inlineThemeCache.has(value).then(function(applied) {
        if (applied) {
            return null;
        }
        return imageLoader.load(value).then(function(blob) {
            const name = guid();
            return Promise.all([
                themeImageService.createFullImage(blob, name),
                themeImageService.createPreviewImage(blob, name)
            ]).then(function(results) {
                return {
                    fullImage: results[0],
                    previewImage: results[1],
                    colorScheme: 'light',
                    name: `theme_${name}`,
                    id: name
                };
            });
        }).catch(function() {
            return null;
        });
    });
}

module.exports = {
    getInlineTheme,
    markThemeApplied,
    createInlineThemeFromImageUrl
};
},{"../../common/services/theme-image-service":121,"../../common/utils/guid":133,"./cache/named-cache":10,"./image-loader":25,"./inline-param-service":27}],29:[function(require,module,exports){
"use strict";

var factory = require('./showcase-json-service-factory');
var urlKey = 'add-showcases';
var type = 'add';

module.exports = factory.create(urlKey, type);
},{"./showcase-json-service-factory":35}],30:[function(require,module,exports){
"use strict";

var factory = require('./showcase-json-service-factory');
var urlKey = 'games-showcases';
var type = 'games';

module.exports = factory.create(urlKey, type);
},{"./showcase-json-service-factory":35}],31:[function(require,module,exports){
"use strict";

const UpdateableJsonService = require('./updateable-json-service');
const persistence = require('../persistence');

const JSON_URL_KEY = 'games-widget';
const SETTINGS_KEY = 'games-widget-update-settings';
const WIDGET_CACHE_KEY = 'games-widget';

class GamesWidgetService extends UpdateableJsonService {
    constructor() {
        super(JSON_URL_KEY, SETTINGS_KEY);
    }

    __update(json) {
        return persistence.save(WIDGET_CACHE_KEY, json.widget);
    }

    getWidget() {
        return persistence.loadExt(WIDGET_CACHE_KEY);
    }
}

module.exports = new GamesWidgetService();
},{"../persistence":46,"./updateable-json-service":39}],32:[function(require,module,exports){
"use strict";

var fetchService = require('../../../common/services/fetch-service');
var persistence = require('../persistence');

var DEBUG_SETTINGS_KEY = 'json_destination_url';

var CONFIG = {
    local: {
        'tiles': createLocalUrl('tiles.json'),
        'presets': createLocalUrl('presets.json'),
        'add-showcases': createLocalUrl('add-showcases.json'),
        'games-showcases': createLocalUrl('games-showcases.json'),
        'games-widget': createLocalUrl('games-widget.json'),
        'ok-games-widget': createLocalUrl('ok-games-widget.json'),
        'themes': createProductionUrl('themes.json')
    },
    admin: {
        'tiles': createAdminUrl('tiles.json'),
        'presets': createAdminUrl('presets.json'),
        'add-showcases': createAdminUrl('add-showcases.json'),
        'games-showcases': createAdminUrl('games-showcases.json'),
        'games-widget': createAdminUrl('games-widget.json'),
        'ok-games-widget': createAdminUrl('ok-games-widget.json'),
        'themes': createProductionUrl('themes.json')
    },
    test: {
        'tiles': createTestUrl('v2/tiles.json'),
        'presets': createTestUrl('presets.json'),
        'add-showcases': createTestUrl('add-showcases.json'),
        'games-showcases': createTestUrl('games-showcases.json'),
        'games-widget': createTestUrl('games-widget.json'),
        'ok-games-widget': createTestUrl('ok-games-widget.json'),
        'themes': createTestUrl('themes.json')
    },
    prod: {
        'tiles': createProductionUrl('v2/tiles.json'),
        'presets': createProductionUrl('presets.json'),
        'add-showcases': createProductionUrl('add-showcases.json'),
        'games-showcases': createProductionUrl('games-showcases.json'),
        'games-widget': createProductionUrl('games-widget.json'),
        'ok-games-widget': createProductionUrl('ok-games-widget.json'),
        'themes': createProductionUrl('themes.json')
    }
};

function createLocalUrl(jsonName) {
    return `http://localhost:3000/downloads/${jsonName}?debug=true`;
}

function createAdminUrl(jsonName) {
    return `http://admamigo.go.devmail.ru:3000/downloads/${jsonName}?debug=true`;
}

function createProductionUrl(jsonName) {
    return `https://data-ff.mail.ru/newtab/${jsonName}?ts=${Date.now().toString()}`;
}

function createTestUrl(jsonName) {
    return `https://test-data.amigo.mail.ru/newtab/${jsonName}?ts=${Date.now().toString()}`;
}

function getConfigEntry() {
    return persistence.load(DEBUG_SETTINGS_KEY).then(function(result) {
        return result[DEBUG_SETTINGS_KEY] || 'prod';
    });
}

function getUrl(key, entry) {
    return CONFIG[entry][key];
}

function load(url) {
    return fetchService.get(url);
}

function loadByKey(key) {
    return getConfigEntry()
        .then(function(entry) {
            return getUrl(key, entry);
        })
        .then(function(url) {
            return load(url);
        });
}

module.exports = {
    load: load,
    loadByKey: loadByKey
};

},{"../../../common/services/fetch-service":117,"../persistence":46}],33:[function(require,module,exports){
"use strict";

const UpdateableJsonService = require('./updateable-json-service');
const persistence = require('../persistence');

const JSON_URL_KEY = 'ok-games-widget';
const SETTINGS_KEY = 'ok-games-widget-update-settings';
const WIDGET_CACHE_KEY = 'ok-games-widget';

class OkGamesWidgetService extends UpdateableJsonService {
    constructor() {
        super(JSON_URL_KEY, SETTINGS_KEY);
    }

    /*__load() {
        return Promise.resolve({
            "version": 1,
            "timestamp": "1480599980818",
            "update_period": 86400,
            "games":[
                {
                    "title":"Аватария",
                    "iconUrl":"https://r.mradx.net/img/65/26069D.png",
                    "url":"https://ok.ru/game/avataria?st.refplace=33"
                },
                {
                    "title":"Битва за трон",
                    "iconUrl":"https://r.mradx.net/img/17/A5CE2F.jpg",
                    "url":"https://ok.ru/game/cot?st.refplace=33"
                },
                {
                    "title":"Родина",
                    "iconUrl":"https://r.mradx.net/img/16/B58532.jpg",
                    "url":"https://ok.ru/game/homeland?st.refplace=33"
                },
                {
                    "title":"Ледяной остров",
                    "iconUrl":"https://r.mradx.net/img/55/915B85.jpg",
                    "url":"https://ok.ru/games/iceisland?st.refplace=33"
                },
                {
                    "title":"World Poker Club",
                    "iconUrl":"https://r.mradx.net/img/37/527D7E.jpg",
                    "url":"https://ok.ru/game/wc-poker?st.refplace=33"
                },
                {
                    "title":"Рыцари и принцессы",
                    "iconUrl":"https://r.mradx.net/img/FF/9470FE.jpg",
                    "url":"https://ok.ru/game/vernost?st.refplace=33"
                },
                {
                    "title":"Косынка Онлайн",
                    "iconUrl":"https://r.mradx.net/img/94/FA0BE7.png",
                    "url":"https://ok.ru/games/kosynka-online?st.refplace=33"
                },
                {
                    "title":"КЛОНДАЙК",
                    "iconUrl":"https://r.mradx.net/img/BD/D3F22B.jpg",
                    "url":"https://ok.ru/games/klon?st.refplace=33"
                },
                {
                    "title":"Экспедиция",
                    "iconUrl":"https://r.mradx.net/img/2F/1D9BBF.jpg",
                    "url":"https://ok.ru/game/chudiki?st.refplace=33"
                },
                {
                    "title":"Властелины стихий",
                    "iconUrl":"https://r.mradx.net/img/00/1E6775.jpg",
                    "url":"https://ok.ru/games/vlastelin?st.refplace=33"
                },
                {
                    "title":"Три подсказки",
                    "iconUrl":"https://r.mradx.net/img/99/E9BC0B.jpg",
                    "url":"https://www.ok.ru/games/tips?st.refplace=33"
                },
                {
                    "title":"Дикий запад",
                    "iconUrl":"https://r.mradx.net/img/D2/1CDEF1.jpg",
                    "url":"https://www.ok.ru/games/dz3d?st.refplace=33"
                },
                {
                    "title":"Таонга",
                    "iconUrl":"https://r.mradx.net/img/D2/8FDBFE.png",
                    "url":"https://www.ok.ru/games/taonga?st.refplace=33"
                },
                {
                    "title":"Вегамикс",
                    "iconUrl":"https://r.mradx.net/img/66/A1ACD4.png",
                    "url":"https://www.ok.ru/games/vegamix?st.refplace=33"
                },
                {
                    "title":"Цветочная история",
                    "iconUrl":"https://r.mradx.net/img/8A/38B4C2.jpg",
                    "url":"https://www.ok.ru/games/flowerstory?st.refplace=33"
                },
                {
                    "title":"Кухня",
                    "iconUrl":"https://r.mradx.net/img/17/9C2425.png",
                    "url":"https://www.ok.ru/games/kitchennew?st.refplace=33"
                },
                {
                    "title":"Сладости 2: малиновое желе",
                    "iconUrl":"https://r.mradx.net/img/F0/1A45F8.png",
                    "url":"https://www.ok.ru/games/candyvalley2?st.refplace=33"
                }
            ]
        })
    }*/

    __update(json) {
        return persistence.save(WIDGET_CACHE_KEY, json.games);
    }

    getGames() {
        return persistence.loadExt(WIDGET_CACHE_KEY);
    }
}

module.exports = new OkGamesWidgetService();
},{"../persistence":46,"./updateable-json-service":39}],34:[function(require,module,exports){
"use strict";

const merge = require('merge');

const UpdateableJsonService = require('./updateable-json-service');
const persistence = require('../persistence');
const widgets = require('../widgets');
const presetImageService = require('../tile-info-services/preset-image');
const extend = require('../../../common/utils/extend');
const urlUtils = require('../../../common/utils/url-utils');
const arrayUtils = require('../../../common/utils/array');
const asyncForEach = require('../../../common/utils/async-foreach');

const JSON_URL_KEY = 'presets';
const SETTINGS_KEY = 'presets-update-settings';
const PRESETS_CACHE_KEY = 'presets';
const PRESETS_USER_SETTINGS_KEY = 'presets-user-settings';
const PRESETS_HAVE_UPDATES_KEY = 'presets-have-updates';
const WIDGET_REGEXP = /^widget:/i;

function mapper(record) {
    if (typeof record === 'object') {
        return record;
    }

    if (WIDGET_REGEXP.test(record)) {
        return widgets.getSource(record.replace(WIDGET_REGEXP, ''));
    }

    return { url: record };
}

function savePresets(value) {
    return persistence.save(PRESETS_CACHE_KEY, value);
}

function getPresetsData() {
    return persistence.loadExt(PRESETS_CACHE_KEY).then(data => data ? data : { });
}

function setIfHaveUpdates(haveUpdates) {
    return persistence.save(PRESETS_HAVE_UPDATES_KEY, haveUpdates);
}

function getPresetByRfr(rfr) {
    return getPresetsData().then(data => {
        const key = findKey(data.rfr, rfr);

        if (key) {
            return data.presets[data.rfr[key]];
        }

        return null;
    });
}

function getUserSettings() {
    return persistence.loadExt(PRESETS_USER_SETTINGS_KEY);
}

function saveUserSettings(value) {
    return persistence.save(PRESETS_USER_SETTINGS_KEY, value);
}

function checkAndSaveDefaultUserSettings(value) {
    return getUserSettings().then(settings => {
        if (settings === null) {
            return saveUserSettings(value);
        }

        return true;
    });
}

function findKey(source, rfr) {
    return Object.keys(source).find(i => i === rfr);
}

function swapKeyAndValue(obj){
    const result = {};

    Object.keys(obj).forEach(key => {
        result[obj[key]] = key;
    });

    return result;
}

class PresetsJsonService extends UpdateableJsonService {
    constructor() {
        super(JSON_URL_KEY, SETTINGS_KEY);
    }

    __update(json) {
        function getCategoriesKeys(categories) {
            return arrayUtils.uniq(categories.reduce((prev, curr) => {
                return prev.concat(curr.presets);
            }, []));
        }

        const newPresetsData = json.presets || { };
        const newCategoriesKeys = getCategoriesKeys(newPresetsData.categories || []);

        return getPresetsData().then(oldPresetsData => {
            const oldCategoriesKeys = getCategoriesKeys(oldPresetsData.categories || []);
            const hasUpdates = newCategoriesKeys.some(newKey => !oldCategoriesKeys.includes(newKey));

            if (hasUpdates) {
                setIfHaveUpdates(true);
            }

            return Promise.all([
                checkAndSaveDefaultUserSettings({}),
                savePresets(newPresetsData)
            ]);
        });
    }

    matchesPreset(rfr) {
        return getPresetsData().then(data => {
            return data ? (findKey(data.rfr, rfr) !== undefined) : false;
        });
    }

    getPresetTilesData(rfr) {
        return getPresetByRfr(rfr).then(preset => {
            if (preset === null) {
                return [];
            }

            return {
                tiles: preset.tiles.map(mapper),
                boardsCount: preset.boardsCount !== undefined ? preset.boardsCount : 1,
                tilesCount: preset.tilesCount !== undefined ? preset.tilesCount : [24]
            };
        });
    }

    preparePresetTiles(tiles) {
        const queue = tiles
            .filter(tile => (typeof tile === 'object' && tile.hasOwnProperty('imageUrl')))
            .map(tile => {
                const url = tile.url;
                const key = urlUtils.isDomain(url) ? urlUtils.getHostname(url) : url;
                return presetImageService.save(key, {
                    title: tile.title,
                    image: tile.imageUrl,
                    url: tile.url
                });
            });

        if (queue.length === 0) {
            return Promise.resolve(tiles);
        }

        return Promise.all(queue).then(() => tiles);
    }

    getPresetTheme(rfr) {
        return getPresetByRfr(rfr).then(preset => {
            if (preset === null || !preset.hasOwnProperty('theme')) {
                return null;
            }

            return preset.theme;
        });
    }

    getPresetsInfo() {
        return getPresetsData()
            .then(data => {
                return Object.entries(data.rfr)
                    .map(entry => {
                        const rfr = entry[0];
                        const presetKey = entry[1];
                        const preset = data.presets[presetKey];

                        return {
                            id: rfr,
                            title: preset.title,
                            description: preset.description,
                            theme: preset.theme,
                            preview: preset.preview,
                            boardsCount: preset.boardsCount,
                            isNew: preset.isNew
                        };
                    });

            })
            .catch(() => {
                return [];
            });
    }

    getPresetInfo(rfr) {
        return this.getPresetsInfo().then(presets => {
            const presetInfo = presets.find(preset => preset.id === rfr);
            return presetInfo || null;
        });
    }

    getCategories() {
        return getPresetsData()
            .then(data => {
                const keyToRfrMap = swapKeyAndValue(data.rfr);
                const categories = data.categories;

                // replace presets keys with rfrs because we use rfrs as preset id in app
                if (Array.isArray(categories)) {
                    categories.forEach(category => {
                        let presets = category.presets;
                        presets = Array.isArray(presets) ? presets : [];
                        category.presets = presets.map(presetKey => keyToRfrMap[presetKey]);
                    });
                }

                return categories || [];
            })
            .catch(() => {
                return [];
            });
    }

    isPresetWithTargeting(rfr) {
        return getPresetByRfr(rfr).then(preset => {
            if (preset === null || !preset.hasOwnProperty('targeting')) {
                return false;
            }

            return preset.targeting;
        });
    }

    haveUpdates() {
        return persistence.loadExt(PRESETS_HAVE_UPDATES_KEY)
            .then(value => (value === null ? true : value))
            .catch(() => true);
    }

    resetUpdates() {
        return setIfHaveUpdates(false);
    }
}

module.exports = new PresetsJsonService();
},{"../../../common/utils/array":128,"../../../common/utils/async-foreach":129,"../../../common/utils/extend":131,"../../../common/utils/url-utils":141,"../persistence":46,"../tile-info-services/preset-image":74,"../widgets":79,"./updateable-json-service":39,"merge":157}],35:[function(require,module,exports){
"use strict";

const merge = require('merge');

const UpdateableJsonService = require('./updateable-json-service');
const persistence = require('../persistence');
const extend = require('../../../common/utils/extend');
const urlUtils = require('../../../common/utils/url-utils');

const SETTINGS_KEY = 'showcase-update-settings';
const SHOWCASE_CACHE_KEY = 'showcase';

function formatPrefix(prefix, key) {
    return `${prefix}-${key}`;
}

class ShowcaseJsonService extends UpdateableJsonService {
    constructor(url, keyPrefix) {
        super(url, formatPrefix(keyPrefix, SETTINGS_KEY));
        this.__keyPrefix = keyPrefix;
    }

    __update(json) {
        return persistence.save(formatPrefix(this.__keyPrefix, SHOWCASE_CACHE_KEY), json.showcase);
    }

    getShowcase() {
        console.log('GETTING SHOWCASE', this.__keyPrefix);
        return persistence.loadExt(formatPrefix(this.__keyPrefix, SHOWCASE_CACHE_KEY));
    }
}

module.exports = {
    create: function(url, type) {
        return new ShowcaseJsonService(url, type);
    }
};
},{"../../../common/utils/extend":131,"../../../common/utils/url-utils":141,"../persistence":46,"./updateable-json-service":39,"merge":157}],36:[function(require,module,exports){
"use strict";

const extend = require('../../../common/utils/extend');
const UpdateableJsonService = require('./updateable-json-service');
const ThemesData = require('../../../common/models/themes-data');
const persistence = require('../persistence');
const merge = require('merge');
const guid = require('../../../common/utils/guid');
const objectUtils = require('../../../common/utils/object-utils');

const JSON_URL_KEY = 'themes';
const SETTINGS_KEY = 'themes-update-settings';
const THEMES_KEY = 'themes';
const USER_SETTINGS_KEY = 'themes-user-settings';

function load(key) {
    return persistence.load(key).then(data => {
        return data.hasOwnProperty(key) ? data[key] : {};
    });
}

function save(key, value) {
    return persistence.save(key, value);
}

function getSettings() {
    return load(USER_SETTINGS_KEY);
}

function updateSettings(newSettings) {
    return getSettings().then(oldSettings => {
        return merge.recursive(true, oldSettings, newSettings);
    });
}

function clearLocalImages() {
    return getSettings().then(oldSettings => {
        oldSettings.localImages = {};
        return oldSettings;
    });
}

function saveSettings(settings) {
    return save(USER_SETTINGS_KEY, settings);
}

class ThemesJsonService extends UpdateableJsonService {
    constructor() {
        super(JSON_URL_KEY, SETTINGS_KEY);
    }

    __update(json) {
        console.debug('THEMES JSON', json);
        return this.getThemesData().then(themesData => {
            const oldSettings = themesData.settings;
            const oldThemes = themesData.themes;
            const newThemes = json.themes || [];

            return Promise.all([
                save(THEMES_KEY, {
                    themes: newThemes,
                    authors: json.authors || [],
                    categories: json.categories || [],
                    onboardingThemes: json.onboardingThemes || []
                }),
                clearLocalImages().then(saveSettings)
            ]).then(() => {
                const activeThemeId = oldSettings.activeId;
                let activeTheme = newThemes.find(theme => theme.id === activeThemeId);

                // if activeTheme is not presented in new themes json, save it as custom
                if (!activeTheme) {
                    activeTheme = oldThemes.find(theme => theme.id === activeThemeId);
                    const isUserTheme = Array.isArray(oldSettings.userThemes) &&
                        oldSettings.userThemes.find(theme => theme.id === activeThemeId);

                    if (activeTheme && !isUserTheme) {
                        return this.setCustomTheme(null, {
                            fullImage: activeTheme.fullImage,
                            colorScheme: activeTheme.colorScheme,
                            previewImage: activeTheme.previewImage,
                            hidden: false
                        });
                    }
                }
            });
        });
    }

    getThemesData() {
        return Promise.all([
            load(THEMES_KEY),
            getSettings()
        ]).then(data => {
            const themesData = new ThemesData({
                themes: data[0].themes || [ ],
                authors: data[0].authors || [ ],
                categories: data[0].categories || [ ],
                onboardingThemes: data[0].onboardingThemes || [],
                settings: data[1] || { }
            });

            /**
             * Когда рандомные темы, по запросу отдаем данные, лежащие в сторадже, затем
             * вычисляем, какая тема будет следующей и кладем эти данные в сторадж.
             * Такое поведение требуется для получения текущей темы скриптом предзагрузки (preload.js)
              */
            const currThemesData = themesData.addUserThemes().setDefaultThemeIfNeeded();
            const result = merge.recursive(true, {}, currThemesData.data); //TODO - Object.assign??

            const nextThemesData = currThemesData.setRandomThemeIfNeeded();

            this.saveThemesData(nextThemesData.data);

            return result;
        });
    }

    addLocalImageToSettings(themeName, imageUrl) {
        return getSettings().then(settings => {
            settings.localImages = settings.localImages || {};
            settings.localImages[themeName] = imageUrl;

            return saveSettings(settings);
        });
    }

    //TODO - refactor this method and all it's usages
    setCustomTheme(url, options, notActive) {
        options = objectUtils.isObject(options) ? options : {};

        const themeId = guid();
        const theme = {
            id: options.id || themeId,
            name: options.name || 'custom' + themeId,
            fullImage: url || options.fullImage,
            colorScheme: options.colorScheme || 'light',
            hidden: options.hidden !== false,
            previewImage: options.previewImage || url,
            own: !!options.own
        };

        let settingsPromise;

        if (notActive) {
            settingsPromise = getSettings();
        } else {
            settingsPromise = updateSettings({
                activeId: theme.id,
                random: false
            });
        }

        return settingsPromise.then(settings => {
            if (Array.isArray(settings.userThemes)) {
                const themeIndex = settings.userThemes.findIndex(userTheme => {
                    return userTheme.id === theme.id;
                });

                if (themeIndex !== -1) {
                    settings.userThemes[themeIndex] = theme;
                } else {
                    settings.userThemes.unshift(theme);
                }
            } else {
                settings.userThemes = [theme];
            }

            return settings;
        }).then(saveSettings);
    }

    removeCustomTheme(themeName) {
        return getSettings().then(settings => {
            if (Array.isArray(settings.userThemes)) {
                const themeIndex = settings.userThemes.findIndex(userTheme => {
                    return userTheme.name === themeName;
                });

                if (themeIndex !== -1) {
                    settings.userThemes.splice(themeIndex, 1);
                    delete settings.localImages[themeName];
                }
            }

            return settings;
        }).then(saveSettings);
    }

    saveThemesData(data) {
        const settings = data.settings;
        return updateSettings(settings).then(saveSettings);
    }

    makeThemeActive(id) {
        return updateSettings({ activeId: id }).then(saveSettings);
    }

    updateThemesSettings(settings) {
        return updateSettings(settings).then(saveSettings);
    }

}

module.exports = new ThemesJsonService();
},{"../../../common/models/themes-data":112,"../../../common/utils/extend":131,"../../../common/utils/guid":133,"../../../common/utils/object-utils":137,"../persistence":46,"./updateable-json-service":39,"merge":157}],37:[function(require,module,exports){
"use strict";

var extend = require('../../../common/utils/extend');
var UpdateableJsonService = require('./updateable-json-service');
var persistence = require('../persistence');
var urlUtils = require('../../../common/utils/url-utils');

var JSON_URL_KEY = 'tiles';
var SETTINGS_KEY = 'custom-images-update-settings';
var CUSTOM_IMAGES_CACHE_KEY = 'custom-images';
var USER_IMAGES_CACHE_KEY = 'images';
var FAVICONS_CACHE_KEY = 'favicons';
var ALIAS_CACHE_KEY = 'aliases';
var META_CACHE_KEY = 'meta';

function TilesJsonService() {
    UpdateableJsonService.call(this, JSON_URL_KEY, SETTINGS_KEY);
}

extend(UpdateableJsonService, TilesJsonService);

var Proto = TilesJsonService.prototype;

function load(key) {
    return persistence.load(key).then(function(data) {
        return data.hasOwnProperty(key) ? data[key] : {};
    });
}

function save(key, value) {
    return persistence.save(key, value);
}

function loadCustomImages() {
    return load(CUSTOM_IMAGES_CACHE_KEY);
}

function loadUserImages() {
    return load(USER_IMAGES_CACHE_KEY);
}

function loadUserFavicons() {
    return load(FAVICONS_CACHE_KEY);
}

function loadUserMeta() {
    return load(META_CACHE_KEY);
}

function loadAliases() {
    return load(ALIAS_CACHE_KEY);
}

function saveCustomImages(value) {
    return save(CUSTOM_IMAGES_CACHE_KEY, value);
}

function saveUserImages(value) {
    return save(USER_IMAGES_CACHE_KEY, value);
}

function saveUserFavicons(value) {
    return save(FAVICONS_CACHE_KEY, value);
}

function saveUserMeta(value) {
    return save(META_CACHE_KEY, value);
}

function saveAliases(value) {
    return save(ALIAS_CACHE_KEY, value);
}

function mapKey(key) {
    return loadAliases().then(function(result) {
        if (result.hasOwnProperty(key)) {
            return result[key];
        }

        return key;
    });
}

Proto.__update = function(json) {
    return loadCustomImages().then(function(currentImages) {
        var newImages = { };
        var aliasRefs = { };

        return Promise.all([ loadUserImages(), loadUserFavicons(), loadUserMeta() ])
            .then(function(results) {
                console.groupCollapsed('Processing tiles');

                var userImages = results[0];
                var userFavicons = results[1];
                var userMeta = results[2];

                console.log('Saved data', userImages, userFavicons);

                json.tiles.forEach(function(tile) {
                    var isDomain = urlUtils.isDomain(tile.url);
                    var hostname = urlUtils.getHostname(tile.url);

                    var key = isDomain ? hostname : tile.url; // AMIGO-3864 Extract hostname for root URL's. Keep other URL's unchanged

                    var hasPreviousCustomImage = currentImages.hasOwnProperty(key);

                    var imageWasLoaded = userImages.hasOwnProperty(tile.url);
                    var faviconWasLoaded = userFavicons.hasOwnProperty(hostname);
                    var metaWasAdded = userMeta.hasOwnProperty(tile.url);

                    newImages[key] = tile;

                    if (tile.hasOwnProperty('aliases') && tile.aliases.length !== 0) { // Check for alternate urls
                        tile.aliases.forEach(function(alias) {
                            aliasRefs[alias] = key;
                        });
                    }

                    if (hasPreviousCustomImage) { // Image was in previous json
                        console.info('Has previous record for `%s`', key);

                        if (!imageWasLoaded) {
                            return console.info('Image for `%s` was not loaded', key);
                        }

                        if (currentImages[key].image !== tile.image) {
                            console.info('Updated image for `%s`', key);
                            userImages[tile.url] = null;
                            delete userImages[tile.url];
                        }
                    } else { // New image
                        console.info('New image for `%s`', key);
                        if (faviconWasLoaded) {
                            console.info('Has favicon for `%s`', key);
                            userFavicons[hostname] = null;
                            delete userFavicons[hostname];
                        }
                    }

                    if (metaWasAdded) {
                        console.info('Resetting meta for `%s`', tile.url);
                        userMeta[tile.url] = null;
                        delete userMeta[tile.url];
                    }
                });

                console.info('Aliases', aliasRefs);

                console.groupEnd('Done processing tiles');

                console.groupCollapsed('Cleaning up deleted records');
                Object.keys(currentImages).forEach(function(key) {
                    if (!newImages.hasOwnProperty(key)) { // Record was deleted!!!
                        console.log('Processing deleted record for `%s`', key);
                        var entry = currentImages[key];

                        userImages[entry.url] = null;
                        delete userImages[entry.url];

                        userMeta[entry.url] = null;
                        delete userMeta[entry.url];
                    }
                });
                console.groupEnd('Done cleaning up deleted records');

                return Promise.all([
                    saveUserImages(userImages),
                    saveUserFavicons(userFavicons),
                    saveUserMeta(userMeta),
                    saveAliases(aliasRefs)
                ]);
            })
            .then(function() {
                return saveCustomImages(newImages);
            });
    });
};

Proto.getAll = function() {
    return loadCustomImages().then(function(result) {
        var keys = Object.keys(result);
        var list = [ ];

        keys.forEach(function(key) {
            if (result.hasOwnProperty(key)) {
                list.push(result[key]);
            }
        });

        return list;
    });
};

Proto.hasImage = function(key) {
    return mapKey(key).then(function(correctKey) {
        return loadCustomImages().then(function(result) {
            return result.hasOwnProperty(correctKey);
        });
    });
};

Proto.getImage = function(key) {
    return mapKey(key).then(function(correctKey) {
        return loadCustomImages().then(function(result) {
            if (result.hasOwnProperty(correctKey)) {
                return result[correctKey];
            }

            throw new Error('Custom image for `%s` not found', correctKey);
        });
    });
};

module.exports = new TilesJsonService();
},{"../../../common/utils/extend":131,"../../../common/utils/url-utils":141,"../persistence":46,"./updateable-json-service":39}],38:[function(require,module,exports){
"use strict";

var namedCacheFactory = require('../cache/named-cache');

var LAST_CHECK_KEY = 'lastCheck';
var CREATED_AT_KEY = 'createdAt';
var UPDATE_INTERVAL_KEY = 'updateInterval';

module.exports = function(key) {
    var settingsCache = namedCacheFactory(key);

    function createSettingsObject(createdAt, lastCheck, updateInterval) {
        return {
            createdAt: createdAt,
            lastCheck: lastCheck,
            updateInterval: updateInterval
        };
    }

    function createDefaultSettings() {
        return createSettingsObject(Date.now(), new Date(1970, 0, 1, 0), 86400000);
    }

    function needsUpdate() {
        return Promise.all([
            settingsCache.get(LAST_CHECK_KEY),
            settingsCache.get(UPDATE_INTERVAL_KEY)
        ]).then(function(results) {
            var lastCheck = results[0];
            var updateInterval = results[1];

            return Date.now() - lastCheck > updateInterval;
        }).catch(function() {
            return true;
        });
    }

    function renewUpdateInterval(value) {
        return settingsCache.put(UPDATE_INTERVAL_KEY, value);
    }

    function renewLastCheck() {
        return settingsCache.put(LAST_CHECK_KEY, Date.now());
    }

    function getSettings() {
        return Promise.all([
            settingsCache.get(CREATED_AT_KEY),
            settingsCache.get(LAST_CHECK_KEY),
            settingsCache.get(UPDATE_INTERVAL_KEY)
        ]).then(function(results) {
            return createSettingsObject(results[0], results[1], results[2]);
        }).catch(function() {
            return createDefaultSettings();
        });
    }

    function saveSettings(createdAt, lastCheck, updateInterval) {
        return Promise.all([
            settingsCache.put(CREATED_AT_KEY, createdAt),
            settingsCache.put(LAST_CHECK_KEY, lastCheck),
            settingsCache.put(UPDATE_INTERVAL_KEY, updateInterval)
        ]).then(function() {
            return true;
        }).catch(function() {
            return false;
        });
    }

    return {
        needsUpdate: needsUpdate,
        getSettings: getSettings,
        saveSettings: saveSettings,
        renewLastCheck: renewLastCheck,
        renewUpdateInterval: renewUpdateInterval
    };
};
},{"../cache/named-cache":10}],39:[function(require,module,exports){
"use strict";

var jsonLoader = require('./json-loader');
var updateSettingsFactory = require('./update-settings');

function UpdateableJsonService(jsonUrlKey, updateSettingsKey) {
    this.__jsonUrlKey = jsonUrlKey;
    this.__updateSettings = updateSettingsFactory(updateSettingsKey);
}

UpdateableJsonService.prototype = {
    __load: function() {
        return jsonLoader.loadByKey(this.__jsonUrlKey);
    },
    __timestampChanged: function(json) {
        console.log('Checking timestamp');
        var timestamp = json.timestamp;

        return this.__updateSettings
            .getSettings()
            .then(function(settings) {
                return this.__updateSettings.renewLastCheck().then(function() {
                    console.log(settings.createdAt, timestamp);
                    return settings.createdAt !== timestamp;
                });
            }.bind(this));
    },
    __renewUpdateSettings: function(json) {
        console.log('Renew update settings');
        return this.__updateSettings.saveSettings(
            json.timestamp,
            Date.now(),
            json.update_period * 1000
        );
    },
    __update: function(json) {
        return Promise.reject(new Error('__update() method should be overridden'));
    },
    __loadAndUpdateIfChanged: function() {
        var self = this;

        return self.__load()
            .then(function(json) {
                console.log('Loaded json', json);
                return self.__timestampChanged(json).then(function(changed) {
                    if (!changed) {
                        console.info('JSON is the same, no need to update!');
                        return;
                    }
                    console.info('Performing update routine');
                    return self.__update(json).then(function() {
                        return self.__renewUpdateSettings(json);
                    });
                });
            });
    },
    __needsUpdateCheck: function() {
        return this.__updateSettings.needsUpdate();
    },
    updateIfNeeded: function() {
        var self = this;

        console.info('Checking if JSON update is needed');
        return self.__needsUpdateCheck().then(function(needsUpdate) {
            console.info('Done checking');
            if (needsUpdate) {
                console.warn('Needs update');
                return self.__loadAndUpdateIfChanged().then(function() {
                    return true;
                });
            }

            console.info('Update not needed');
            return false;
        }).catch(function(err) {
            console.error('Error updating JSON', err);
            return false;
        });
    }
};

module.exports = UpdateableJsonService;
},{"./json-loader":32,"./update-settings":38}],40:[function(require,module,exports){
"use strict";

var Amigo = window.Amigo || { };
Amigo.Metric = Amigo.Metric || {};

Amigo.Metric.default = Amigo.Metric.default || {
    create: function(params) {
        var instance = { };

        var createStub = function(key) {
            return function() {
                console.log('Metric stub "%s"', key);
                return null;
            };
        };

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                instance[key] = createStub(key);
            }
        }

        return Promise.resolve(instance);
    }
};

Amigo.Connect = Amigo.Connect || {
    create: function (id){

    },
    on: function (eventName, callback) {

    }
};

Amigo.OAuth = Amigo.OAuth || {
    create: function(network) {
        return {
            state: function() {
                return Promise.resolve('none');
            }
        };
    }
};

module.exports = Amigo;
},{}],41:[function(require,module,exports){
"use strict";

function getPageTitle(doc) {
    var titleTag = doc.querySelector('title');
    var metaTitleTag = doc.querySelector('meta[name="application-name"]');
    var result = '';

    if (metaTitleTag !== null) {
        result = metaTitleTag.attributes.content.nodeValue || '';
    }

    if (titleTag !== null) {
        result = titleTag.textContent || '';
    }

    return result.trim();
}

module.exports = {
    extract: function(doc) {
        var type, imageUrl;
        var pageTitle = getPageTitle(doc);
        var color = doc.querySelector('meta[name="msapplication-navbutton-color"]');
        var icons = doc.querySelectorAll('link[rel="favicon"], link[rel="shortcut icon"], link[rel="apple-touch-icon-precomposed"], link[rel="apple-touch-icon"]');

        if (icons.length > 0) {
            type = 'favicon';

            var iconArray = Array.prototype.slice.call(icons);

            var icon = iconArray.map(function(icon) {
                var attrs = icon.attributes;

                return {
                    rel: attrs.rel.nodeValue,
                    url: attrs.href.nodeValue,
                    size: attrs.sizes ? attrs.sizes.nodeValue : undefined
                };
            }).reduce(function(prev, next) {
                if (!prev && next) {
                    return next;
                }

                if (!prev.size && next.size) {
                    return next;
                }

                if (prev.size && !next.size) {
                    return prev;
                }

                if (!prev.size && !next.size) {
                    if (prev.rel.indexOf('apple-touch-icon') !== -1) {
                        return prev;
                    }

                    return next;
                }

                var prevSizeValue = parseInt(prev.size.toLowerCase().split('x')[0]);
                var nextSizeValue = parseInt(next.size.toLowerCase().split('x')[0]);

                return prevSizeValue > nextSizeValue ? prev : next;
            }, undefined);

            imageUrl = icon.url;
        }

        var meta = { };

        if (type) {
            meta.type = type;
        }

        if (imageUrl) {
            meta.imageUrl = imageUrl;
        }

        if (pageTitle) {
            meta.title = pageTitle;
        }

        if (color) {
            meta.color = color;
        }

        return meta;
    }
};
},{}],42:[function(require,module,exports){
"use strict";

var masterPlugin = require('./../master-plugin-wrapper');

var metric = masterPlugin.Metric.create({}, "ntp");

module.exports = {
    bindParams: function(params, metricList) {
        metric = metric.bindParams(params, metricList);
    },
    addBeforeSendHandler: function(callback) {
        metric.beforeSend = callback;
    },
    removeBeforeSendHandler: function(callback) {
        metric.beforeSend.removeHandler(callback);
    },
    send: function(name, params) {
        var fn = metric[name];

        if (fn === undefined) {
            return Promise.resolve(null);
        }

        return fn.apply(null, params)
            .then(function(res) {
                return res;
            })
            .catch(function(err) {
                console.error('Metric error', err);
                return null;
            });
    }
};
},{"./../master-plugin-wrapper":40}],43:[function(require,module,exports){
"use strict";

const persistence = require('./persistence');

const NOTIFICATIONS_KEY = 'notifications';
const MAX_NOTIFICATIONS_COUNT = 100;

function getNotifications() {
    return persistence.loadExt(NOTIFICATIONS_KEY);
}

function saveNotifications(notifications) {
    return persistence.save(NOTIFICATIONS_KEY, notifications.slice(0, MAX_NOTIFICATIONS_COUNT));
}

module.exports = {

    getData: getNotifications,
    saveData: saveNotifications
};
},{"./persistence":46}],44:[function(require,module,exports){
"use strict";

const chrome = require('../../common/factory/chrome-factory')();
const localize = require('../../common/services/localize-service');
const chromeUtils = require('./chrome-utils');

const pageTitle = {
    ADD_PAGE: localize('pageAction_addSite'),
    ALREADY_ADDED: localize('pageAction_alreadyAdded'),
    DISABLED: ''
};

const pageIcon = {
    ADD_PAGE: 'img/page-action/add.png',
    ALREADY_ADDED: 'img/page-action/added.png',
    DISABLED: 'img/page-action/disabled.png'
};

function setPageIconInfo(info, tabId) {
        const title = info.isAdded ? pageTitle.ALREADY_ADDED : pageTitle.ADD_PAGE;
        const activeIcon = info.isAdded ? pageIcon.ALREADY_ADDED : pageIcon.ADD_PAGE;

        chrome.pageAction.setTitle({
            tabId,
            title: info.canAdd ? title : pageTitle.DISABLED
        });

        return chromeUtils.wrapChromeCallback(chrome.pageAction, 'setIcon', {
            tabId,
            path: {
                "19": info.canAdd ? activeIcon : pageIcon.DISABLED
            }
        });
}

function sendMessageToContentScript(info, tabId) {
    return chromeUtils.wrapChromeCallback(chrome.tabs, 'sendMessage', tabId, { type: 'show_notification',  isAdded: info.isAdded})
        .then(response => {
            if (!response) {
                return Promise.reject();
            }
        });
}

function injectContentScript(info, tabId) {
    //chrome.tabs.insertCSS(tabId, { file: 'css/cs-add-site.css' });
    //return chromeUtils.wrapChromeCallback(chrome.tabs, 'executeScript', tabId, { code: `window.IS_ADDED = ${info.isAdded};` })
    //    .then(() => {
    //        return chromeUtils.wrapChromeCallback(chrome.tabs, 'executeScript', tabId, { file: 'js/cs-add-site.js' });
    //    });
}

function setPageActionInfoForUrl(info, url) {
    return chromeUtils.wrapChromeCallback(chrome.tabs, 'query', { url }).then(tabs => {
        const promises = [];

        tabs.forEach(tab => {
            const promise = setPageIconInfo(info, tab.id);
            promises.push(promise);
        });

        return Promise.all(promises);
    });
}

module.exports = {
    show(tab, siteInfo) {
        const tabId = tab.id;

        return setPageIconInfo(siteInfo, tabId)
            .then(() => {
                chrome.pageAction.show(tabId);
            });
    },
    handleClick(tab, siteInfo, silently) {
        const tabId = tab.id;

        return setPageActionInfoForUrl(siteInfo, tab.url)
            .then(() => {
                //if (!silently) {
                //    return sendMessageToContentScript(siteInfo, tabId)
                //        .catch(() => injectContentScript(siteInfo, tabId));
                //}
            });
    }
};
},{"../../common/factory/chrome-factory":88,"../../common/services/localize-service":118,"./chrome-utils":15}],45:[function(require,module,exports){
"use strict";

var proxy = require('./xhr-proxy');

module.exports = {
    get: function(url) {
        return proxy.load({ url: url, method: 'GET' }).then(function(res) {
            return new window.DOMParser().parseFromString(res, 'text/html');
        });
    }
};
},{"./xhr-proxy":80}],46:[function(require,module,exports){
"use strict";

var utils = require('./chrome-utils');
var memCache = require('mem-cache');
var chrome = require('../../common/factory/chrome-factory')();

function wrapWithMemCache(target) {
    var cache = new memCache({ timeout: 100 });

    return {
        save: function(key, value) {
            var dataObject = {};
            dataObject[key] = value;

            cache.set(key, dataObject); // Wrap value with object for consistency

            return target.save(key, value);
        },
        load: function(key) {
            var cachedValue = cache.get(key);

            if (cachedValue !== null) {
                return Promise.resolve(cachedValue);
            }

            return target.load(key).then(function(result) {
                cache.set(key, result);
                return result;
            });
        },
        loadExt: function(key) {
            return this.load(key).then(function(data) {
                return data.hasOwnProperty(key) ? data[key] : null;
            });
        },
        remove: function(key) {
            cache.remove(key);
            return target.remove(key);
        }
    };
}

var persistenceService = {
    save: function(key, value) {
        var saveObject = { };
        saveObject[key] = value;

        return utils.wrapChromeCallback(chrome.storage.local, 'set', saveObject);
    },
    load: function(key) {
        return utils.wrapChromeCallback(chrome.storage.local, 'get', key).then(function(res) {
            return res;
        });
    },
    remove: function(key) {
        return utils.wrapChromeCallback(chrome.storage.local, 'remove', key);
    }
};

module.exports = wrapWithMemCache(persistenceService);
},{"../../common/factory/chrome-factory":88,"./chrome-utils":15,"mem-cache":156}],47:[function(require,module,exports){
"use strict";

var cache = {
    'mail.ru': { image: 'mail.ru.png', title: 'mail.ru', url: 'https://mail.ru' },
    'my.mail.ru': { image: 'my.mail.ru.png', title: 'Мой Мир', url: 'http://my.mail.ru' },
    'ok.ru': { image: 'ok.ru.png', title: 'Одноклассники', url: 'http://ok.ru' },
    'vk.com': { image: 'vk.com.png', title: 'ВКонтакте', url: 'http://vk.com' },
    'vkontakte.ru': { image: 'vkontakte.ru.png', title: 'ВКонтакте', url: 'http://vkontakte.ru' },
    'odnoklassniki.ru': { image: 'ok.ru.png', title: 'Одноклассники', url: 'http://odnoklassniki.ru' },
    'twitter.com': { image: 'twitter.png', title: 'Twitter', url: 'https://twitter.com' },
    'facebook.com': { image: 'facebook.com.png', title: 'Facebook', url: 'https://www.facebook.com' },
    'kinogo.net': { image: 'kinogo.net.png', title: 'KinoGo.net', url: 'http://kinogo.net' },
    'youtube.com': { image: 'youtube.com.png', title: 'YouTube', url: 'https://youtube.com' },
    'news.mail.ru': { image: 'news.mail.ru.png', title: 'Новости Mail.ru', url: 'http://news.mail.ru' },
    'games.mail.ru': { image: 'games.mail.ru.png', title: 'Игры Mail.ru', url: 'http://games.mail.ru' },
    'cloud.mail.ru': { image: 'cloud.mail.ru.png', title: 'Облако Mail.ru', url: 'http://cloud.mail.ru' },
    'otvet.mail.ru': { image: 'otvet.mail.ru.png', title: 'Ответы@Mail.Ru', url: 'http://otvet.mail.ru' },
    'tanks.mail.ru': { image: 'tanks.mail.ru_game_unity.png', title: 'Ground Tanks War', url: 'http://tanks.mail.ru' },
    'wf.mail.ru': { image: 'wf.mail.ru.png', title: 'Warface', url: 'http://wf.mail.ru' },
    'sf.mail.ru': { image: 'sf.mail.ru.png', title: 'Skyforge', url: 'http://sf.mail.ru' },
    'sys.mail.ru': { image: 'sys.mail.ru.png', title: 'Sys.mail.ru', url: 'http://sys.mail.ru' },
    'dobro.mail.ru': { image: 'dobro.mail.ru.png', title: 'Добро Mail.ru', url: 'http://dobro.mail.ru' },
    'jira.mail.ru': { image: 'jira.mail.ru.png', title: 'Jira.mail.ru', url: 'https://jira.mail.ru' },
    'confluence.mail.ru': { image: 'confluence.mail.ru.png', title: 'Confluence.mail.ru', url: 'https://confluence.mail.ru' },
    'hr.corp.mail.ru': { image: 'hr.corp.mail.ru_irj_portal.png', title: 'HR-портал Mail.ru', url: 'https://hr.corp.mail.ru' },
    'https://sys.mail.ru/ideas': { image: 'sys.mail.ru.ideas.png', title: 'Идеи Mail.ru', url: 'https://sys.mail.ru/ideas' },
    'https://sys.mail.ru/blog': { image: 'sys.mail.ru.blog.png', title: 'Блог Mail.ru', url: 'https://sys.mail.ru/blog' },
    'instagram.com': { image: 'instagram.com.png', title: 'Instagram', url: 'http://instagram.com/' },
    'ask.fm': { image: 'ask.fm.png', title: 'Ask.fm', url: 'http://ask.fm/' },
    'fotostrana.ru': { image: 'fotostrana.ru.png', title: 'Фотострана', url: 'http://fotostrana.ru/' },
    'wikipedia.org': { image: 'wikipedia.org.png', title: 'Wikipedia', url: 'http://www.wikipedia.org/' }
};

var prefix = '../img/predefined/';

module.exports = {
    hasLocalImage: function(key) {
        return cache.hasOwnProperty(key);
    },
    getData: function(key) {
        var data = cache[key];

        if (data === undefined) {
            return null;
        }

        return {
            image: prefix + data.image,
            title: data.title,
            url: data.url
        };
    }
};
},{}],48:[function(require,module,exports){
"use strict";

const presetsJsonService = require('./json-services/presets-json-service');
const persistence = require('./persistence');
const arrayUtils = require('../../common/utils/array');
const objectUtils = require('../../common/utils/object-utils');
const asyncForEach = require('../../common/utils/async-foreach');
const chrome = require('../../common/factory/chrome-factory')();
const inlineParamService = require('./inline-param-service');

const PresetsState = require('./../../common/models/presets-state');

const PRESETS_STATE_KEY = 'presets_state';
const PRESETS_HISTORY_KEY = 'presets_history';

const FEATURE_THEME = 'theme';
const FEATURE_TILES = 'tiles';

let presetsState;
let presetsHistory = null;

function createPresetsArrayFromPresetsString(presetsStr, feature) {
    if (!presetsStr) {
        return [];
    }

    let diffStr = presetsState.findDiff(presetsStr);
    const noDiff = diffStr.length === 0;

    if (noDiff) {
        if (presetsState.isFeatureApplied(feature)) {
            return [];
        } else {
            diffStr = presetsState.lastDiff;
        }
    } else {
        presetsState.changeState(presetsStr);
    }

    const presetsArray = diffStr.split(';').reverse();
    const uniqPresetsArray = arrayUtils.uniq(presetsArray, item => item);

    return uniqPresetsArray;
}

function getPresetListFromRegistry() {
    return new Promise(resolve => {
        if (!chrome.amigo) {
            return resolve('');
        }
        chrome.amigo.GetRegistryValue('PresetList', resolve);
    });
}

function getPresetListFromInlineInstall() {
    return inlineParamService.getInlineParamValue('psi');
}

function getPresetListForFeature(feature) {
    const queue = [
        getPresetListFromRegistry()
        , getPresetListFromInlineInstall()
    ];

    return Promise.all(queue).then(results => {
        return []
            .concat(results[1] )
            .concat(results[0])
            .filter(el => (el !== '' && el !== null && el !== undefined))
            .join(';');
    }).then(presetsString => {
        return createPresetsArrayFromPresetsString(presetsString, feature);
    }).then(presetsArray => {
        savePresetsState();
        return presetsArray;
    });
}

function getMatchedPresets(matchFn, feature) {
    return getPresetListForFeature(feature).then(presetsList => {
        const matchPromises = presetsList.map(matchFn);

        return Promise.all(matchPromises).then(matchList => {
            const matchedPresets = presetsList.filter((presetId, index) => matchList[index] === true);
            saveHistory(matchedPresets);
            return matchedPresets;
        });
    });
}

function savePresetsState() {
    return persistence.save(PRESETS_STATE_KEY, presetsState.json());
}

function loadPresetsState() {
    return persistence.load(PRESETS_STATE_KEY).then(data => {
        const defaultPresetsState = {
            featureApplied: {
                theme: true,
                tiles: true
            }
        };
        const presetsStatesSource = data.hasOwnProperty(PRESETS_STATE_KEY) ? data[PRESETS_STATE_KEY] : defaultPresetsState;
        presetsState = new PresetsState(presetsStatesSource);

        return presetsState;
    });
}

function getHistory() {
    if (Array.isArray(presetsHistory)) {
        return Promise.resolve(presetsHistory);
    }

    return persistence.loadExt(PRESETS_HISTORY_KEY).then(history => {
        console.log('HISTORY', history);
        return Array.isArray(history) ? history : [];
    });
}

function saveHistory(newPresets) {
    if (newPresets.length === 0) {
        return Promise.resolve();
    }

    return getHistory().then(history => {
        const newHistory = arrayUtils.uniq(history.concat(newPresets), item => item);
        presetsHistory = newHistory;
        return persistence.save(PRESETS_HISTORY_KEY, newHistory);
    });
}


loadPresetsState();

module.exports = {
    getMatchedPresets() {
        return getMatchedPresets(presetsJsonService.matchesPreset);
    },
    getMatchedPresetsWithNotAppliedTiles() {
        return getMatchedPresets(presetsJsonService.matchesPreset, FEATURE_TILES);
    },
    getMatchedPresetsWithNotAppliedTheme() {
        return getMatchedPresets(presetsJsonService.matchesPreset, FEATURE_THEME);
    },
    getPresetsBoards(presetsList) {
        const tilesDataPromises = presetsList.map(presetId => {
            return presetsJsonService.getPresetTilesData(presetId).then(data => {
                return presetsJsonService.preparePresetTiles(data.tiles).then(() => data);
            });
        });

        return Promise.all(tilesDataPromises).then(results => {
           return results.reduce((prevBoardsArr, tilesData) => {
               const boards = [ ];
               const tiles = tilesData.tiles;

               for (let i = 0; i < tilesData.boardsCount; ++i) {
                   const boardTiles = tiles.splice(0, tilesData.tilesCount[i]);
                   boards[i] = { tiles: boardTiles };
               }

               return prevBoardsArr.concat(boards);
           }, [ ]);
        });
    },
    getPresetsTheme(presetsList) {
        let theme;

        return new Promise(resolve => {
            function callback(presetId, index, next) {
                presetsJsonService.getPresetTheme(presetId).then(presetTheme => {

                    if (objectUtils.isObject(presetTheme)) {
                        theme = presetTheme;
                        done();
                    } else {
                        next();
                    }
                }).catch(() => next());
            }

            function done() {
                resolve(theme);
            }

            asyncForEach(presetsList, callback, done);
        });
    },
    getPresetsInfo(presetsList) {
        return getHistory().then(presetsHistory => {
            return presetsJsonService.getPresetsInfo().then(presets => {
                if (Array.isArray(presetsList)) {
                    presets = presets.filter(preset => presetsList.includes(preset.id));
                }

                return presets.map(preset => {
                    return Object.assign({}, preset, {
                        alreadyApplied: presetsHistory.includes(preset.id)
                    });
                });
            });
        });
    },
    getPresetsData(presetsList) {
        return Promise.all([
            this.getPresetsInfo(presetsList),
            presetsJsonService.getCategories(),
            presetsJsonService.haveUpdates()
        ]).then(data => {
            return {
                presets: data[0],
                categories: data[1],
                haveUpdates: data[2]
            };
        });
    },
    getPromoContexts() {
        return getHistory().then(presetsList => {
            const promoPromises = presetsList.map(presetId => presetsJsonService.isPresetWithTargeting(presetId));
            return Promise.all(promoPromises).then(targetings => {
                console.debug('GET PROMO CONTEXTS', presetsList, targetings);
                return presetsList.filter((presetId, index) => targetings[index]);
            });
        });
    },
    markPresetsTilesApplied() {
        presetsState.applyFeature(FEATURE_TILES);
        return savePresetsState();
    },
    markPresetsThemeApplied() {
        presetsState.applyFeature(FEATURE_THEME);
        return savePresetsState();
    },
    getHistory,
    saveHistory
};
},{"../../common/factory/chrome-factory":88,"../../common/utils/array":128,"../../common/utils/async-foreach":129,"../../common/utils/object-utils":137,"./../../common/models/presets-state":108,"./inline-param-service":27,"./json-services/presets-json-service":34,"./persistence":46}],49:[function(require,module,exports){
"use strict";

var hiddenPromoCache = require('./cache/named-cache')('hidden-promos');

module.exports = {
    hide: function(id) {
        return hiddenPromoCache.put(id, true);
    },
    show: function(id) {
        return hiddenPromoCache.remove(id);
    },
    isHidden: function(id) {
        return hiddenPromoCache
            .has(id)
            .catch(function() {
                return false;
            });
    }
};
},{"./cache/named-cache":10}],50:[function(require,module,exports){
"use strict";

const extensions = require('./extensions');
const historyService = require('./history');
const tilesJsonService = require('./json-services/tiles-json-service');
const SiteArrayBuilder = require('../../common/utils/site-array-builder');
const urlUtils = require('../../common/utils/url-utils');

const boardsService = require('./boards');
const TileType = require('../../common/models/tile-type');

const UPDATE_INTERVAL = 1000 * 3600 * 24;

function getPredefinedSites() {
    return tilesJsonService.getAll();
}

function getTopSites() {
    return historyService.getTopSites();
}

function getExtensions() {
    return extensions.getPredefinedExtensionsList();
}

function getBrowserHistoryForLastMonth() {
    return historyService.getHistoryForLastMonth().then(history => {
        return new SiteArrayBuilder().setSource(history).extractUniqueDomains().build();
    });
}

function getHistoryOrMailRuServices() {
    return getBrowserHistoryForLastMonth().then(results => {
        var expression = /^chrome-extension:\/\/diciddlabejpoaofdnmoamebeohoiobg|^https?:\/\/(www\.)?mail\.ru/i;

        return results.filter(item => !expression.test(item.url));
    });
}

function getRecommendedSites() {
    return Promise.all([
        getExtensions(),
        getTopSites(),
        getHistoryOrMailRuServices(),
        getPredefinedSites()
    ]).then(results => {
        const widgets = results[0];
        const topSites = results[1];
        const historyResults = results[2];
        const predefinedSites = results[3]
            .filter(a => a.priority > 0)
            .sort((a, b) => a.priority > b.priority ? -1 : 1)
            .concat(
            results[3]
                .filter(a => a.priority <= 0)
                .sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)

        );

        function filterFn(site) {
            const siteHostname = urlUtils.getHostname(site.url);
            const siteIsDomain = urlUtils.isDomain(site.url);

            const index = predefinedSites.findIndex(item => {
                const itemHostname = urlUtils.getHostname(item.url);
                const itemIsDomain = urlUtils.isDomain(item.url);

                return (itemIsDomain && siteIsDomain) && (itemHostname === siteHostname);
            });

            return index > -1;
        }

        function filterWidgetsFn(site) {
            return !/^https?:\/\/(horo.mail.ru|pogoda.mail.ru)/gi.test(site.url);
        }

        return new SiteArrayBuilder()
            .setSource(historyResults)
            .filter(filterFn)
            .filterSiteList(topSites)
            .prepend(topSites)
            .filterSiteList(predefinedSites)
            .append(predefinedSites)
            .filter(filterWidgetsFn)
            .prepend(widgets)
            .build();
    });
}

let recommendations;
let timestamp;

function updateSites() {
    return getRecommendedSites().then(results => {
        recommendations = results;//associateRecommendationsWithTheirIndexesInSource(results);
        timestamp = Date.now();
        return recommendations;
    });
}

module.exports = {
    getSites() {
        if (recommendations) {
            const updateIsNeeded = (Date.now() - timestamp) > UPDATE_INTERVAL;

            if (updateIsNeeded) {
                updateSites();
            }

            return Promise.resolve(recommendations);
        }

        return updateSites();
    }
};
},{"../../common/models/tile-type":114,"../../common/utils/site-array-builder":139,"../../common/utils/url-utils":141,"./boards":3,"./extensions":20,"./history":23,"./json-services/tiles-json-service":37}],51:[function(require,module,exports){
"use strict";

var generator = require('./demo-site-generator');
var guid = require('../../common/utils/guid');

var recommendedSites = generator([
    { url: 'http://habrahabr.ru' },
    { url: 'http://vk.com' },
    { url: 'http://translate.google.com' },
    { url: 'http://google.com' },
    { url: 'http://facebook.com' },
    { url: 'http://odnoklassniki.ru' },
    { url: 'http://lenta.ru' },
    { url: 'http://twitter.com' },
    { url: 'http://tjournal.ru' },
    { url: 'http://reddit.com' },
    { url: 'http://techcrunch.com' },
    { url: 'http://bbc.co.uk' },
    { url: 'http://championat.com' },
    { url: 'http://4pda.ru' },
    { url: 'http://mail.ru' },
    { url: 'http://geektimes.com' },
    { url: 'http://meduza.io' },
    { url: 'http://9gag.com' }
]);

module.exports = {
    load: function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                return resolve(recommendedSites);
            }, 100);
        });
    }
};
},{"../../common/utils/guid":133,"./demo-site-generator":18}],52:[function(require,module,exports){
var fetchService = require('../../../../../common/services/fetch-service');
var socialNetworks = require('../../../../../common/constants/social-networks');
var socialRecordsTypes = require('../../../../../common/constants/social-records-types');

var urlUtils = require('../../../../../common/utils/url-utils');
var objectUtils = require('../../../../../common/utils/object-utils');

var md5 = require('md5');

function formatMmUserInfo(info) {
    var fullName = info.first_name + ' ' + info.last_name;
    var nickName = info.nick;

    return {
        name: fullName.length > nickName.length ? fullName : nickName,
        image: info.pic_128,
        online: info.is_online,
        network: socialNetworks.MM,
        //screenName: urlUtils.getPathname(info.link),
        uid: info.uid,
        type: socialRecordsTypes.USER
    };
}

function formatMmGroupInfo(info) {
    return {
        name: info.nick,
        image: info.pic_128,
        online: false,
        network: socialNetworks.MM,
        //screenName: urlUtils.getPathname(info.link),
        uid: info.uid,
        type: socialRecordsTypes.GROUP
    };
}

function formatUnknownInfo(info) {
    if (info.group_info) {
        return formatMmGroupInfo(info);
    } else {
        return formatMmUserInfo(info);
    }
}

function getObjectId(screenName) {
    return fetchService.get(platformRoot + screenName)
        .then(function(json) {
            return json.uid;
        });
}

function getObjectsInfo(uids, formatFn) {
    var emptyResult = [];

    if (!Array.isArray(uids) || uids.length === 0) {
        return Promise.resolve(emptyResult);
    }

    var uidsString = uids.join(',');
    var params = {
        method: apiMethods.getUsers,
        app_id: appId,
        secure: 1,
        uids: uidsString
    };

    params.sig = md5(urlUtils.paramsToString(params, '', true) + secret);

    return fetchService.getWithParams(apiRoot, params)
        .then(function(json) {
            console.log(json);
            if (Array.isArray(json)) {
                return json.map(formatFn);
            }

            return emptyResult;
        });
}

function getNewObjectInfo(screenName) {
    var notSocialResult = [{ type: socialRecordsTypes.NOT_SOCIAL }];

    return getObjectId(screenName)
        .then(function(uid) {
            if (!uid) {
                return notSocialResult;
            }

            return getObjectsInfo([ uid ], formatUnknownInfo);
        }).catch(function(error) {

            if (error === 404) {
                return notSocialResult;
            }

            return [ ];
        });
}


var platformRoot = 'http://www.appsmail.ru/platform';
var apiRoot = platformRoot + '/api';
var secret = 'f4caa513983ee3353e3ed2e66bc7b2c9';
var appId = '681201';

var apiMethods = {
    getUsers: 'users.getInfo',
    getGroups: 'users.getInfo'
};

module.exports = {
    getNewObject: getNewObjectInfo,
    getUsers: function(uids) {
        return getObjectsInfo(uids, formatMmUserInfo);
    },
    getGroups: function(uids) {
        return getObjectsInfo(uids, formatMmGroupInfo);
    }
};
},{"../../../../../common/constants/social-networks":83,"../../../../../common/constants/social-records-types":84,"../../../../../common/services/fetch-service":117,"../../../../../common/utils/object-utils":137,"../../../../../common/utils/url-utils":141,"md5":154}],53:[function(require,module,exports){
var mmApi = require('./api');
var socialDataService = require('./../../social-data');
var socialNetworks = require('../../../../../common/constants/social-networks');
var socialRecordsTypes = require('../../../../../common/constants/social-records-types');

var SocialNetwork = require('../social-network');

function MmNetwork(source) {
    SocialNetwork.call(this, source);

    this._api = mmApi;
    this._type = socialNetworks.MM;
}

MmNetwork.prototype = Object.create(SocialNetwork.prototype, {
    makeRequests: {
        value: function() {
            function getIds(records, type) {
                return records
                    .filter(function(record) { return record.type === type; })
                    .map(function(record) { return record.uid; });
            }

            return socialDataService.getSocialRecords(this._type).then(function(records) {
                var userIds = getIds(records, socialRecordsTypes.USER);
                var groupIds = getIds(records, socialRecordsTypes.GROUP);

                return Promise.all([
                    this._api.getUsers(userIds),
                    this._api.getGroups(groupIds)
                ]).then(function (data) {
                    var socialData = data[0].concat(data[1]);
                    socialDataService.updateSocialRecords(this._type, socialData);

                    return socialData;
                }.bind(this));
            }.bind(this));
        }
    },
    getDataForScreenName: {
        value: function(screenName) {
            return this.getRecords().then(function(records) {
                var recordForScreenName = records.find(function (record) {
                    return record.screenName === screenName;
                });

                if (recordForScreenName) {
                    return Promise.resolve(recordForScreenName);
                }

                return this._api.getNewObject(screenName)
                    .then(function (result) {
                        var record = result[0];

                        if (record.type === socialRecordsTypes.NOT_SOCIAL) {
                            return Promise.reject(socialRecordsTypes.NOT_SOCIAL);
                        }

                        if (record) {
                            record.screenName = screenName;
                            socialDataService.addSocialRecord(record);
                        }

                        return record;
                    });
            }.bind(this));
        }
    }
});

MmNetwork.prototype.constructor = MmNetwork;

module.exports = MmNetwork;
},{"../../../../../common/constants/social-networks":83,"../../../../../common/constants/social-records-types":84,"../social-network":56,"./../../social-data":61,"./api":52}],54:[function(require,module,exports){
var socialNetworks = require('../../../../../common/constants/social-networks');
var objectUtils = require('../../../../../common/utils/object-utils');
var socialRecordsTypes = require('../../../../../common/constants/social-records-types');

var Amigo = require('../../../master-plugin-wrapper');

function checkStateDecorator(targetFn) {
    return function() {
        var args = arguments;

        return auth.state().then(function(state) {
            var authorized = ['authorized', 'access'].indexOf(state) !== -1;
            if (authorized) {
                isAuth = true;
                return targetFn.apply(null, args);
            } else {
                isAuth = false;
                return targetFn();
            }
        });
    };
}

function formatOkUserInfo(info) {
    return {
        name: info.first_name + ' ' + info.last_name,
        image: info.pic128x128,
        online: info.online,
        network: socialNetworks.OK,
        //screenName: info.url_profile,
        uid: info.uid,
        type: socialRecordsTypes.USER
    };
}

function formatOkGroupInfo(info) {
    return {
        name: info.name,
        image: info.picAvatar,
        online: false,
        network: socialNetworks.OK,
        uid: info.uid,
        type: socialRecordsTypes.GROUP
    };
}

function getOkUsersInfo(userIds) {
    var emptyResult = [];

    if (!Array.isArray(userIds) || userIds.length === 0) {
        return Promise.resolve(emptyResult);
    }

    var userIdsString = userIds.join(',');
    var apiMethod = apiMethods.getUsers;
    var params = {
        uids: userIdsString,
        fields: 'pic128x128,online,uid,first_name,last_name,url_profile'
    };

    return auth.query({ url: apiMethod, data: params })
        .then(function(response) {
            if (Array.isArray(response)) {
                return response.map(formatOkUserInfo);
            }

            return emptyResult;
        }).catch(function() {
            return emptyResult;
        });
}

function getOkGroupsInfo(groupIds) {
    var emptyResult = [];

    if (!Array.isArray(groupIds) || groupIds.length === 0) {
        return Promise.resolve(emptyResult);
    }

    var groupIdsString = groupIds.join(',');
    var apiMethod = apiMethods.getGroups;
    var params = {
        uids: groupIdsString,
        fields: 'uid,name,pic_avatar'
    };

    return auth.query({ url: apiMethod, data: params })
        .then(function(response) {
            if (Array.isArray(response)) {
                return response.map(formatOkGroupInfo);
            }

            return emptyResult;
        }).catch(function(error) {
            return emptyResult;
        });
}

function getInfo(screenName) {
    var emptyResult = { };

    if (typeof screenName !== 'string' || screenName.length === 0) {
        return Promise.resolve(emptyResult);
    }

    var apiMethod = apiMethods.getInfoByUrl;
    var params = {
        url: screenName
    };

    return auth.query({ url: apiMethod, data: params })
        .then(function(response) {
            if (objectUtils.isObject(response)) {
                var result;

                switch (response.type) {
                    case 'GROUP':
                        result = {
                            type: socialRecordsTypes.GROUP,
                            id: response.objectId
                        };
                        break;
                    case 'PROFILE':
                        result = {
                            type: socialRecordsTypes.USER,
                            id: response.objectId
                        };
                        break;
                    default:
                        result = {
                            type: socialRecordsTypes.NOT_SOCIAL
                        };
                }

                return result;
            }

            return emptyResult;
        }).catch(function(error) {
            return emptyResult;
        });
}

var apiRoot = 'http://api.odnoklassniki.ru/api/';
var apiMethods = {
    getUsers: apiRoot + 'users/getInfo',
    getGroups: apiRoot + 'group/getInfo',
    getInfoByUrl: apiRoot + 'url/getInfo'
};

var auth = Amigo.OAuth.create('ok');
var isAuth = true;

module.exports = {
    getUsers: checkStateDecorator(getOkUsersInfo),
    getGroups: checkStateDecorator(getOkGroupsInfo),
    getInfo: checkStateDecorator(getInfo),
    isAuth
};
},{"../../../../../common/constants/social-networks":83,"../../../../../common/constants/social-records-types":84,"../../../../../common/utils/object-utils":137,"../../../master-plugin-wrapper":40}],55:[function(require,module,exports){
var okApi = require('./api');
var socialDataService = require('./../../social-data');
var socialNetworks = require('../../../../../common/constants/social-networks');
var socialRecordsTypes = require('../../../../../common/constants/social-records-types');

var SocialNetwork = require('../social-network');

function OkNetwork(source) {
    SocialNetwork.call(this, source);

    this._api = okApi;
    this._type = socialNetworks.OK;
}

OkNetwork.prototype = Object.create(SocialNetwork.prototype, {
    makeRequests: {
        value: function() {
            function getIds(records, type) {
                return records
                    .filter(function(record) { return record.type === type; })
                    .map(function(record) { return record.uid; });
            }

            return socialDataService.getSocialRecords(this._type).then(function(records) {
                var userIds = getIds(records, socialRecordsTypes.USER);
                var groupIds = getIds(records, socialRecordsTypes.GROUP);

                return Promise.all([
                    this._api.getUsers(userIds),
                    this._api.getGroups(groupIds)
                ]).then(function (data) {
                    var socialData = data[0].concat(data[1]);
                    socialDataService.updateSocialRecords(this._type, socialData);

                    return socialData;
                }.bind(this));
            }.bind(this));
        }
    },
    getSocialDataByIdAndType: {
        value: function(id, type) {
            switch (type) {
                case socialRecordsTypes.USER:
                    return this._api.getUsers([ id ]);
                case socialRecordsTypes.GROUP:
                    return this._api.getGroups([ id ]);
                default:
                    return [];
            }
        }
    },
    getDataForScreenName: {
        value: function(screenName) {
            return this.getRecords().then(function(records) {
                var recordForScreenName = records.find(function (record) {
                    return record.screenName === screenName;
                });

                if (recordForScreenName) {
                    return Promise.resolve(recordForScreenName);
                }

                return this._api.getInfo(screenName)
                    .then(function(info) {
                        if (info.type === socialRecordsTypes.NOT_SOCIAL) {
                            return Promise.reject(socialRecordsTypes.NOT_SOCIAL);
                        }

                        return this.getSocialDataByIdAndType(info.id, info.type);
                    }.bind(this))
                    .then(function (result) {
                        var record = result[0];

                        if (record) {
                            record.screenName = screenName;
                            socialDataService.addSocialRecord(record);
                        }

                        return record;
                    });
            }.bind(this));
        }
    }
});

OkNetwork.prototype.constructor = OkNetwork;

module.exports = OkNetwork;
},{"../../../../../common/constants/social-networks":83,"../../../../../common/constants/social-records-types":84,"../social-network":56,"./../../social-data":61,"./api":54}],56:[function(require,module,exports){
var socialDataService = require('./../social-data');
var boards = require('../../boards');
var objectUtils = require('../../../../common/utils/object-utils');

function SocialNetwork(source) {
    source = source || { };
    this._type = source.type;
    this._api = source.api;
    this._requestsIntervalId = null;
    this._filterRecordsIntervalId = null;
    this._requestsInterval = source.requestsInterval || 60 * 1000; // 1 minute
    this._filterRecordsInterval = source.filterRecordsInterval || 24 * 60 * 60 * 1000; // 1 day
}

SocialNetwork.prototype = {
    makeRequests: function() {
        return new Promise.resolve([]);
    },
    start: function() {
        if (this._requestsIntervalId) {
            this.stop();
        }

        var FILTERING_DELAY = 10000;

        this._requestsIntervalId = setInterval(this.makeRequests.bind(this), this._requestsInterval);
        setTimeout(function() {
            this._filterRecordsIntervalId = setInterval(this.filterRecords.bind(this), this._filterRecordsInterval);
        }.bind(this), FILTERING_DELAY);
        return this.makeRequests();
    },
    stop: function() {
        clearInterval(this._requestsIntervalId);
        clearInterval(this._filterRecordsIntervalId);
        this._requestsIntervalId = null;
        this._filterRecordsIntervalId = null;
    },
    getRecords: function() {
        return socialDataService.getSocialRecords(this._type);
    },
    getDataForScreenName: function() {
        return new Promise.resolve([]);
    },
    filterRecords: function() {
        return this.getRecords().then(function(records) {
            if (records.length === 0) {
                return;
            }

            return boards.getTiles().then(function(tiles) {
                var networkTiles = tiles.filter(function(tile) {
                    var extendedInfo = tile.extendedInfo;
                    return objectUtils.isObject(extendedInfo) && extendedInfo.network === this._type;
                }.bind(this));

                var filteredRecords = records.filter(function(record) {
                    return networkTiles.some(function(tile) {
                        return tile.extendedInfo.screenName === record.screenName;
                    });
                });

                return socialDataService.saveSocialRecords(this._type, filteredRecords);
            }.bind(this));
        }.bind(this));
    }
};

module.exports = SocialNetwork;
},{"../../../../common/utils/object-utils":137,"../../boards":3,"./../social-data":61}],57:[function(require,module,exports){
var socialNetworks = require('../../../../../common/constants/social-networks');
var socialRecordsTypes = require('../../../../../common/constants/social-records-types');
var Amigo = require('../../../master-plugin-wrapper');

function checkStateDecorator(targetFn) {
    return function() {
        var args = arguments;

        return auth.state().then(function(state) {
            var authorized = ['authorized', 'access'].indexOf(state) !== -1;
            if (authorized) {
                isAuth = true;
                return targetFn.apply(null, args);
            } else {
                isAuth = false;
                return targetFn();
            }
        });
    };
}

function formatTwUserInfo(info) {
    return {
        name: info.name,
        image: info.profile_image_url.replace('_normal', '_bigger'),
        online: false,
        network: socialNetworks.TW,
        //screenName: info.screen_name,
        uid: info.id,
        type: socialRecordsTypes.USER
    };
}

function getTwUsersInfo(userIds) {
    var emptyResult = [];

    if (!Array.isArray(userIds) || userIds.length === 0) {
        return Promise.resolve(emptyResult);
    }

    var userIdsString = userIds.join(',');
    var apiMethod = apiMethods.getUsers;

    var params = {
        user_id: userIdsString
    };

    return auth.query({ url: apiMethod, data: params })
        .then(function(response) {
            if (Array.isArray(response)) {
                return response.map(formatTwUserInfo);
            }

            return emptyResult;
        }).catch(function() {
            return emptyResult;
        });
}

function getInfo(screenName) {
    var emptyResult = undefined; // jshint ignore:line
    var notSocialResult = { type: socialRecordsTypes.NOT_SOCIAL };

    if (typeof screenName !== 'string' || screenName.length === 0) {
        return Promise.resolve(emptyResult);
    }

    var apiMethod = apiMethods.getUsers;
    var params = {
        screen_name: screenName
    };

    return auth.query({ url: apiMethod, data: params })
        .then(function(response) {
            if (Array.isArray(response)) {
                return formatTwUserInfo(response[0]);
            }

            return emptyResult;
        }).catch(function(error) {
            if (error.status === 404) {
                return notSocialResult;
            }

            return emptyResult;
        });
}

var apiRoot = 'https://api.twitter.com/1.1/';
var apiMethods = {
    getUsers: apiRoot + 'users/lookup.json'
};

var auth = Amigo.OAuth.create('tw');
var isAuth = true;

module.exports = {
    getUsers: checkStateDecorator(getTwUsersInfo),
    getInfo: checkStateDecorator(getInfo),
    isAuth
};
},{"../../../../../common/constants/social-networks":83,"../../../../../common/constants/social-records-types":84,"../../../master-plugin-wrapper":40}],58:[function(require,module,exports){
var twApi = require('./api');
var socialDataService = require('./../../social-data');
var socialNetworks = require('../../../../../common/constants/social-networks');
var socialRecordsTypes = require('../../../../../common/constants/social-records-types');

var SocialNetwork = require('../social-network');

function TwNetwork(source) {
    SocialNetwork.call(this, source);

    this._api = twApi;
    this._type = socialNetworks.TW;
}

TwNetwork.prototype = Object.create(SocialNetwork.prototype, {
    makeRequests: {
        value: function() {
            return socialDataService.getSocialRecords(this._type).then(function(records) {
                var userIds = records.map(function(record) {
                    return record.uid;
                });

                return this._api.getUsers(userIds).then(function (data) {
                    socialDataService.updateSocialRecords(this._type, data);
                    return data;
                }.bind(this));
            }.bind(this));
        }
    },
    getDataForScreenName: {
        value: function(screenName) {
            return this.getRecords().then(function(records) {
                var recordForScreenName = records.find(function (record) {
                    return record.screenName === screenName;
                });

                if (recordForScreenName) {
                    return Promise.resolve(recordForScreenName);
                }

                return this._api.getInfo(screenName)
                    .then(function (result) {
                        var record = result;

                        if (record) {

                            if (record.type === socialRecordsTypes.NOT_SOCIAL) {
                                return Promise.reject(socialRecordsTypes.NOT_SOCIAL);
                            }

                            record.screenName = screenName;
                            socialDataService.addSocialRecord(record);
                        }

                        return record;
                    });
            }.bind(this));
        }
    }
});

TwNetwork.prototype.constructor = TwNetwork;

module.exports = TwNetwork;
},{"../../../../../common/constants/social-networks":83,"../../../../../common/constants/social-records-types":84,"../social-network":56,"./../../social-data":61,"./api":57}],59:[function(require,module,exports){
var fetchService = require('../../../../../common/services/fetch-service');
var socialNetworks = require('../../../../../common/constants/social-networks');
var socialRecordsTypes = require('../../../../../common/constants/social-records-types');

var objectUtils = require('../../../../../common/utils/object-utils');

function formatVkUserInfo(info) {
    return {
        name: info.first_name + ' ' + info.last_name,
        image: info.photo_200 || info.photo_100 || info.photo_50,
        online: info.online,
        network: socialNetworks.VK,
        //screenName: info.screen_name,
        uid: info.id,
        type: socialRecordsTypes.USER
    };
}

function formatVkGroupInfo(info) {
    return {
        name: info.name,
        image: info.photo_200 || info.photo_100 || info.photo_50,
        online: false,
        network: socialNetworks.VK,
        //screenName: info.screen_name,
        uid: info.id,
        type: socialRecordsTypes.GROUP
    };
}

function getVkUsersInfo(userIds) {
    var emptyResult = [];

    if (!Array.isArray(userIds) || userIds.length === 0) {
        return Promise.resolve(emptyResult);
    }

    var userIdsString = userIds.join(',');
    var apiMethod = apiMethods.getUsers;
    var params = {
        user_ids: userIdsString,
        v: apiVersion,
        fields: 'photo_200,photo_100,photo_50,online,screen_name'
    };

    return fetchService.getWithParams(apiMethod, params)
        .then(function(json) {
            var response = json.response;
            if (Array.isArray(response)) {
                return response.map(formatVkUserInfo);
            }

            return emptyResult;
        }).catch(function() {
            return emptyResult;
        });
}

function getVkGroupsInfo(groupIds) {
    var emptyResult = [];

    if (!Array.isArray(groupIds) || groupIds.length === 0) {
        return Promise.resolve(emptyResult);
    }

    var groupIdsString = groupIds.join(',');
    var apiMethod = apiMethods.getGroups;
    var params = {
        group_ids: groupIdsString,
        v: apiVersion,
        fields: 'photo_200,photo_100,photo_50,screen_name'
    };

    return fetchService.getWithParams(apiMethod, params)
        .then(function(json) {
            var response = json.response;
            if (Array.isArray(response)) {
                return response.map(formatVkGroupInfo);
            }

            return emptyResult;
        }).catch(function() {
            return emptyResult;
        });
}

function getType(screenName) {
    var emptyResult = undefined; // jshint ignore:line

    if (typeof screenName !== 'string' || screenName.length === 0) {
        return Promise.resolve(emptyResult);
    }

    var apiMethod = apiMethods.getType;
    var params = {
        screen_name: screenName,
        v: apiVersion
    };

    return fetchService.getWithParams(apiMethod, params)
        .then(function(json) {
            var response = json.response;
            if (objectUtils.isObject(response)) {
                return response.type;
            }

            if (Array.isArray(response) && response.length === 0) {
                return socialRecordsTypes.NOT_SOCIAL;
            }

            return emptyResult;
        }).catch(function() {
            return emptyResult;
        });
}

var apiRoot = 'http://api.vk.com/method/';
var apiVersion = '5.40';
var apiMethods = {
    getUsers: apiRoot + 'users.get',
    getGroups: apiRoot + 'groups.getById',
    getType: apiRoot + 'utils.resolveScreenName'
};

module.exports = {
    getUsers: getVkUsersInfo,
    getGroups: getVkGroupsInfo,
    getType: getType
};
},{"../../../../../common/constants/social-networks":83,"../../../../../common/constants/social-records-types":84,"../../../../../common/services/fetch-service":117,"../../../../../common/utils/object-utils":137}],60:[function(require,module,exports){
var vkApi = require('./api');
var socialDataService = require('./../../social-data');
var socialNetworks = require('../../../../../common/constants/social-networks');
var socialRecordsTypes = require('../../../../../common/constants/social-records-types');

var SocialNetwork = require('../social-network');

function VkNetwork(source) {
    SocialNetwork.call(this, source);

    this._api = vkApi;
    this._type = socialNetworks.VK;
}

VkNetwork.prototype = Object.create(SocialNetwork.prototype, {
    makeRequests: {
        value: function() {
            function getIds(records, type) {
                return records
                    .filter(function(record) { return record.type === type; })
                    .map(function(record) { return record.uid; });
            }

            return socialDataService.getSocialRecords(this._type).then(function(records) {
                var userIds = getIds(records, socialRecordsTypes.USER);
                var groupIds = getIds(records, socialRecordsTypes.GROUP);

                return Promise.all([
                    this._api.getUsers(userIds),
                    this._api.getGroups(groupIds)
                ]).then(function (data) {
                    var socialData = data[0].concat(data[1]);
                    socialDataService.updateSocialRecords(this._type, socialData);

                    return socialData;
                }.bind(this));
            }.bind(this));
        }
    },
    getSocialDataForScreenNameByType: {
        value: function(screenName, type) {
            switch (type) {
                case socialRecordsTypes.USER:
                    return this._api.getUsers([ screenName ]);
                case socialRecordsTypes.GROUP:
                    return this._api.getGroups([ screenName ]);
                default:
                    return Promise.reject(socialRecordsTypes.NOT_SOCIAL);
            }
        }
    },
    getDataForScreenName: {
        value: function(screenName) {
            return this.getRecords().then(function(records) {
                var recordForScreenName = records.find(function (record) {
                    return record.screenName === screenName;
                });

                if (recordForScreenName) {
                    return Promise.resolve(recordForScreenName);
                }

                return this._api.getType(screenName)
                    .then(function (type) {
                        if (!type) {
                            return Promise.reject();
                        }

                        if (type === socialRecordsTypes.NOT_SOCIAL) {
                            return Promise.reject(socialRecordsTypes.NOT_SOCIAL);
                        }

                        return this.getSocialDataForScreenNameByType(screenName, type);
                    }.bind(this))
                    .then(function (result) {
                        var record = result[0];

                        if (record) {
                            record.screenName = screenName;
                            socialDataService.addSocialRecord(record);
                        }

                        return record;
                    });
            }.bind(this));
        }
    }
});

VkNetwork.prototype.constructor = VkNetwork;

module.exports = VkNetwork;
},{"../../../../../common/constants/social-networks":83,"../../../../../common/constants/social-records-types":84,"../social-network":56,"./../../social-data":61,"./api":59}],61:[function(require,module,exports){
"use strict";

var socialService = require('../../../common/services/social-service');
var persistence = require('../persistence');

var SOCIAL_RECORDS = 'social_records';

function getSocialRecords(network) {
    return persistence.loadExt(network + SOCIAL_RECORDS).then(function(records) {
        return Array.isArray(records) ? records : [];
    });
}

function saveSocialRecords(network, records) {
    return persistence.save(network + SOCIAL_RECORDS, records);
}

function updateSocialRecords(network, newRecords) {
    return getSocialRecords(network).then(function(records) {
        var entirelyNewRecords = [];

        newRecords.forEach(function(newRecord) {
            var recordToUpdateIndex = records.findIndex(function(record) {
                return record.uid === newRecord.uid;
            });

            if (recordToUpdateIndex !== -1) {
                records[recordToUpdateIndex] = Object.assign({}, records[recordToUpdateIndex], newRecord);
            } else {
                entirelyNewRecords.push(newRecord);
            }
        });

        records = records.concat(entirelyNewRecords);

        return saveSocialRecords(network, records);
    });
}

function addSocialRecord(info) {
    return getSocialRecords(info.network).then(function(records) {
        var recordIndex = records.findIndex(function(record) {
            return record.screenName === info.screenName;
        });

        if (recordIndex === -1) {
            records.push(info);
        } else {
            records[recordIndex] = info;
        }

        return saveSocialRecords(info.network, records);
    });
}

function removeSocialRecord(info) {
    return getSocialRecords(info.network).then(function(records) {
        var recordIndex = records.findIndex(function(record) {
            return record.screenName === info.screenName;
        });

        if (recordIndex !== -1) {
            records.splice(recordIndex, 1);
        }

        return saveSocialRecords(info.network, records);
    });
}

module.exports = {
    addSocialRecord: addSocialRecord,
    removeSocialRecord: removeSocialRecord,
    getSocialRecords: getSocialRecords,
    saveSocialRecords: saveSocialRecords,
    updateSocialRecords: updateSocialRecords
};
},{"../../../common/services/social-service":119,"../persistence":46}],62:[function(require,module,exports){
var chrome = require('../../../common/factory/chrome-factory')();

var VkNetwork = require('./networks/vk/network');
var MmNetwork = require('./networks/mm/network');
var OkNetwork = require('./networks/ok/network');
var TwNetwork = require('./networks/tw/network');
var socialNetworks = require('../../../common/constants/social-networks');

var tileInfoService = require('../tile-info-service');

function getServiceByNetworkType(network) {
    switch (network) {
        case socialNetworks.VK:
            return vkService;
        case socialNetworks.MM:
            return mmService;
        case socialNetworks.OK:
            return okService;
        case socialNetworks.TW:
            return twService;
        default:
            return;
    }
}

function start() {
    vkService.start();
    mmService.start();
    okService.start();
    twService.start();
}

function stop() {
    vkService.stop();
    mmService.stop();
    okService.stop();
    twService.stop();
}

function init() {
    vkService = new VkNetwork();
    mmService = new MmNetwork();
    okService = new OkNetwork();
    twService = new TwNetwork({requestsInterval: 1000 * 60 * 60 * 24}); //once a day

    start();
}

var vkService;
var mmService;
var okService;
var twService;

init();

module.exports = {
    start: start,
    stop: stop,
    getDataForTile: function(info) {

        return tileInfoService.getInfo(info.url).then(function(meta) {
            console.debug('SOCIAL', info.url, meta);
            if (meta.imageForUrl || meta.extendedInfo) {
                return { error: 'not_social' };
            }

            var service = getServiceByNetworkType(info.network);
            if (service) {
                return service.getDataForScreenName(info.screenName).catch(function(error) {
                    return { error: error };
                });
            } else {
                return Promise.resolve();
            }
        });
    },
    getNetworkRecords: function(network) {
        var service = getServiceByNetworkType(network);
        return service ? service.getRecords() : Promise.resolve();
    },
    getAllRecords: function() {
        return Promise.all([
            vkService.getRecords(),
            mmService.getRecords(),
            okService.getRecords(),
            twService.getRecords()
        ]).then(function(data) {
            var vkRecords = data[0];
            var mmRecords = data[1];
            var okRecords = data[2];
            var twRecords = data[3];

            var allRecords = {};
            allRecords[socialNetworks.VK] = vkRecords;
            allRecords[socialNetworks.MM] = mmRecords;
            allRecords[socialNetworks.OK] = okRecords;
            allRecords[socialNetworks.TW] = twRecords;

            return allRecords;
        });
    }
};
},{"../../../common/constants/social-networks":83,"../../../common/factory/chrome-factory":88,"../tile-info-service":64,"./networks/mm/network":53,"./networks/ok/network":55,"./networks/tw/network":58,"./networks/vk/network":60}],63:[function(require,module,exports){
"use strict";

var SpecialTileType = require('../../../common/special/special-tile-type');
var localize = require('../../../common/services/localize-service');

function getWidgetSourceByType(type, options) {
    var source;

    switch(type) {
        case SpecialTileType.NEW_YEAR:
            source = {
                id: 'new-year',
                type: 'new-year',
                title: localize('specialWidgets_fireworks')
            };
            break;
    }

    return source;
}

module.exports = {
    getSource: getWidgetSourceByType
};
},{"../../../common/services/localize-service":118,"../../../common/special/special-tile-type":125}],64:[function(require,module,exports){
"use strict";

var customImageService = require('./tile-info-services/custom-image');
var metaService = require('./tile-info-services/meta');
var pageInfoService = require('./tile-info-services/page-info');
var faviconService = require('./tile-info-services/favicon');
var metrics = require('./metrics/metrics-service');

var merge = require('merge');
var urlUtils = require('../../common/utils/url-utils');
var colorUtils = require('./color-utils');

function sendMetrics(url, source) {
    return metrics.send('tile_image_added', [ url, source ]);
}

function saveMeta(key, meta) {
    return metaService.removeTemporary(key).then(function() {
        return metaService.save(key, meta);
    });
}

function getPredefinedInfoOrExtract(record) {
    if (record.entry.hasOwnProperty('imageInfo')) {
        var imageInfo = record.entry.imageInfo;
        if (imageInfo.background.a === 0) {
            return Promise.resolve({
                color: colorUtils.defaultIconBackground(),
                theme: 'light',
                border: false
            });
        }

        return Promise.resolve({
            color: colorUtils.makeRgba(imageInfo.background),
            theme: imageInfo.theme === 'light' ? 'dark' : 'light',
            border: false
        });
    }

    return customImageService.getInfo(record.dataUrl);
}

module.exports = {
    getInfo: function(url) {
        console.log('Getting tile info for `%s`', url);

        var isDomain = urlUtils.isDomain(url);
        var hostname = urlUtils.getHostname(url);
        var cacheKey = isDomain ? hostname : url;

        return Promise.all([
            metaService.has(url),
            customImageService.has(url),
            faviconService.has(hostname)
        ]).then(function(results) {
            var hasCachedMeta = results[0];
            var hasCustomImage = results[1];
            var hasFavicon = results[2];

            console.log('Initial data for `%s`: has cached meta: `%s`; has custom image: `%s`; has favicon; `%s`', url, hasCachedMeta, hasCustomImage, hasFavicon);

            if (hasCustomImage) {
                console.log('Has custom image for `%s`', url);

                return customImageService.load(cacheKey)
                    .then(function(record) {
                        if (record.error) {
                            return record;
                        }

                        if (record.cached) {
                            return record;
                        }

                        return sendMetrics(url, 'stock')
                            .then(function() {
                                hasCachedMeta = false; // Override user meta flag (need to reload)
                            })
                            .then(function() {
                                return faviconService.remove(hostname).then(function() {
                                    return record;
                                });
                            });
                    })
                    .then(function(record) {
                        console.log('Loaded custom image for `%s`', url, record);

                        if (record.error) {
                            console.log('Return errorneous meta');

                            return metaService.getTemporary(url, { temporary: true, imageForUrl: true, customTile: true, title: record.entry.title });
                        }

                        if (record.isContentTile) { // For content tiles
                            console.info('URL has content tile');
                            return { extendedInfo: merge({ title: record.entry.title }, record.entry.extendedInfo) };
                        }

                        if (hasCachedMeta) {
                            console.log('Has cached meta for `%s`', url);

                            return metaService.get(url).then(function(meta) {
                                console.log('Got cached meta for `%s`', url, meta);
                                return merge({ image: record.dataUrl }, meta);
                            });
                        }

                        console.log('Doesn`t have cached meta for `%s`', url);

                        return getPredefinedInfoOrExtract(record).then(function(customImageInfo) {
                            console.log('Extracted custom image info for `%s`', url, customImageInfo);

                            var imageForUrl = !!record.imageForUrl;

                            var meta = merge({
                                favicon: false,
                                customTile: true,
                                imageForUrl: imageForUrl
                            }, customImageInfo);

                            if (isDomain || imageForUrl) {
                                console.log('Url `%s` is domain(%s) or has custom image for URL(%s)', url, isDomain, imageForUrl);
                                meta.title = record.entry.title;

                                return saveMeta(url, meta).then(function() {
                                    console.log('Saved meta for `%s`', url, meta);

                                    return merge({ image: record.dataUrl }, meta);
                                });
                            }

                            console.log('Url is not domain and doesn`t have custom image for URL', url);

                            return pageInfoService.getInfo(url).then(function(pageInfo) {
                                console.log('Extracted page info for `%s`', url, pageInfo);

                                meta.title = pageInfo.title;

                                return saveMeta(url, meta).then(function() {
                                    console.log('Saved meta for `%s`', url, meta);

                                    return merge({ image: record.dataUrl }, meta);
                                });
                            });
                        });
                    });
            }

            if (hasFavicon) {
                console.log('Has cached favicon for `%s`', url);

                return faviconService.get(hostname).then(function(favicon) {
                    console.log('Got cached favicon for `%s`', hostname, favicon.dataUrl);

                    if (hasCachedMeta) {
                        console.log('Has cached meta for `%s`', url);

                        return metaService.get(url).then(function(meta) {
                            console.log('Got cached meta for `%s`', url, meta);
                            return (meta.tooSmall === true) ? meta : merge({ image: favicon.dataUrl }, meta);
                        });
                    }

                    console.log('Doesn`t have cached meta for `%s`', url);

                    return Promise.all([
                        faviconService.getInfo(favicon.dataUrl),
                        pageInfoService.getInfo(url)
                    ]).then(function(results) {
                        console.log('Got favicon info and page info for `%s`', url, results);

                        var faviconInfo = results[0];
                        var pageInfo = results[1];

                        return merge({
                            title: pageInfo.title,
                            favicon: true,
                            customTile: false,
                            imageForUrl: false
                        }, faviconInfo);
                    }).then(function(meta) {
                        return saveMeta(url, meta).then(function() {
                            console.log('Saved meta for `%s`', url, meta);
                            return (meta.tooSmall === true) ? meta : merge({ image: favicon.dataUrl }, meta);
                        });
                    });
                });
            }

            if (hasCachedMeta) {
                console.log('Has cached meta only for `%s`', url);

                return metaService.get(url).then(function(meta) {
                    console.log('Got cached meta only for `%s`', url, meta);
                    return meta;
                });
            }

            console.log('First time addition and no custom images for `%s`', url);

            return pageInfoService.getInfo(url).then(function(pageInfo) {
                console.log('Got page info for `%s`', url, pageInfo);

                if (pageInfo.hasOwnProperty('imageUrl')) { // Has favicon
                    console.log('Has favicon meta for `%s`', url);

                    var faviconUrl = urlUtils.createCorrectUrl(pageInfo.imageUrl, hostname);

                    return faviconService.loadAndSave(faviconUrl, hostname)
                        .then(function(favicon) {
                            return sendMetrics(url, 'logo').then(function() {
                                return favicon;
                            });
                        })
                        .then(function(favicon) {
                            console.log('Loaded and saved favicon for `%s`', url, favicon.dataUrl);

                            return faviconService.getInfo(favicon.dataUrl)
                                .then(function(info) {
                                    console.log('Extracted favicon info for `%s`', url, info);
                                    return merge({ title: pageInfo.title, favicon: true }, info);
                                })
                                .then(function(meta) {
                                    return saveMeta(url, meta).then(function() {
                                        console.log('Saved meta for `%s`', url, meta);
                                        return (meta.tooSmall === true) ? meta : merge({ image: favicon.dataUrl }, meta);
                                    });
                                });
                        });
                }

                console.log('Doesn`t have favicon for `%s`', url);

                var additionalParams = { temporary: true, title: pageInfo.title };

                return metaService.getTemporary(url, additionalParams)
                    .then(function(tempMeta) {
                        return sendMetrics(url, 'blank').then(function() {
                            return tempMeta;
                        });
                    })
                    .then(function(tempMeta) {
                        console.log('Saved tempMeta for `%s`', url, tempMeta);
                        return tempMeta;
                    });
            });
        }).catch(function(err) {
            console.error('>>> Error getting tile info for `%s`', url, err);
            return metaService.getTemporary(url, { temporary: true  });
        });
    }
};
},{"../../common/utils/url-utils":141,"./color-utils":16,"./metrics/metrics-service":42,"./tile-info-services/custom-image":68,"./tile-info-services/favicon":71,"./tile-info-services/meta":72,"./tile-info-services/page-info":73,"merge":157}],65:[function(require,module,exports){
"use strict";

var urlUtils = require('../../../../common/utils/url-utils');
var jsonService = require('../../json-services/tiles-json-service');
var localImages = require('../../predefined-images');
var promoImages = require('../promo-image');
var presetImages = require('../preset-image');
var imageCache = require('../../cache/image-cache');

function hasCached(url) {
    return get(url)
        .then(function(data) {
            return imageCache.has(data.entry.url);
        })
        .catch(function() {
            return false;
        });
}

function hasCustom(url) {
    return jsonService.hasImage(url).then(function(hasImage) {
        if (hasImage) {
            return true;
        }

        var hostname = urlUtils.getHostname(url);

        return jsonService.hasImage(hostname);
    });
}

function hasLocal(url) {
    var hostname = urlUtils.getHostname(url);

    return localImages.hasLocalImage(url) || localImages.hasLocalImage(hostname);
}

function hasPromo(url) {
    return promoImages.has(url);
}

function hasPreset(url) {
    return presetImages.has(url).then(function(hasImage) {
        if (hasImage) {
            return true;
        }

        var hostname = urlUtils.getHostname(url);

        return presetImages.has(hostname);
    });
}

function has(url) {
    return Promise.all([ hasCustom(url), hasLocal(url), hasPromo(url), hasPreset(url) ]).then(function(res) {
        var hasCustom = res[0];
        var hasLocal = res[1];
        var hasPromo = res[2];
        var hasPreset = res[3];

        return hasCustom || hasLocal || hasPromo || hasPreset;
    });
}

function getCustom(url) {
    var hostname = urlUtils.getHostname(url);

    return presetImages.get(url).then(function(entry) {
        return {
            entry: entry,
            imageForUrl: true
        };
    }).catch(function() {
        return promoImages.get(url).then(function(entry) {
            return {
                entry: entry,
                imageForUrl: true
            };
        });
    }).catch(function() {
        return jsonService.getImage(url).then(function(entry) {
            return {
                entry: entry,
                imageForUrl: true
            };
        });
    }).catch(function() {
        return presetImages.get(hostname).then(function(entry) {
            return {
                entry: entry,
                imageForUrl: false
            };
        });
    }).catch(function() {
        return jsonService.getImage(hostname).then(function(entry) {
            return {
                entry: entry,
                imageForUrl: false
            };
        });
    });
}

function getLocal(url) {
    var entry = localImages.getData(url);

    if (entry !== null) {
        return Promise.resolve({ entry: entry, imageForUrl: true });
    }

    var hostname = urlUtils.getHostname(url);
    entry = localImages.getData(hostname);

    if (entry !== null) {
        return Promise.resolve({ entry: entry, imageForUrl: false });
    }

    return Promise.reject(new Error('Local image not found for ', url));
}

function get(url) {
    return getCustom(url).catch(function() {
        return getLocal(url);
    });
}

module.exports = {
    hasCached: hasCached,
    hasLocal: hasLocal,
    hasCustom: hasCustom,
    getLocal: getLocal,
    getCustom: getCustom,
    has: has,
    get: get
};
},{"../../../../common/utils/url-utils":141,"../../cache/image-cache":7,"../../json-services/tiles-json-service":37,"../../predefined-images":47,"../preset-image":74,"../promo-image":75}],66:[function(require,module,exports){
"use strict";

var imageUtils = require('../../../../common/utils/image-utils');
var colorUtils = require('../../color-utils');

function extract(dataUrl) {
    return imageUtils.extractTopLeftPixelColor(dataUrl).then(function(colorObj) {
        if (colorObj.a === 0.0) {
            colorObj = colorUtils.defaultIconBackgroundObject();
        }

        return {
            color: colorUtils.makeRgba(colorObj),
            theme: colorUtils.getTheme(colorObj),
            border: false//colorUtils.needsBorder(colorObj)
        };
    });
}

module.exports = {
    extract: extract
};
},{"../../../../common/utils/image-utils":134,"../../color-utils":16}],67:[function(require,module,exports){
"use strict";

var imageCache = require('../../cache/image-cache');
var imageLoader = require('../../image-loader');

function checkCustomImageInCache(key) {
    return imageCache.get(key);
}

function loadImage(url) {
    return imageLoader.loadAndConvertToDataUrl(url);
}

function saveCustomImageToCache(key, value) {
    return imageCache.put(key, value);
}

function load(entry) {
    return checkCustomImageInCache(entry.url)
        .then(function(dataUrl) {
            return { cached: true, dataUrl: dataUrl };
        })
        .catch(function() {
            return loadImage(entry.image).then(function(dataUrl) {
                return saveCustomImageToCache(entry.url, dataUrl).then(function() {
                    return { cached: false, dataUrl: dataUrl };
                });
            });
    });
}

module.exports = {
    load: load,
    loadUrl: loadImage,
    saveToCache: saveCustomImageToCache
};
},{"../../cache/image-cache":7,"../../image-loader":25}],68:[function(require,module,exports){
"use strict";

var customImageDataExtractor = require('./custom-image-data-extractor');
var customImageLoader = require('./custom-image-loader');
var customImageChecker = require('./custom-image-checker');

var merge = require('merge');

function loadImage(entry) {
    return customImageLoader.load(entry).then(function(customImage) {
        console.log('>>> Loaded image from entry', entry, customImage.dataUrl);
        return customImage;
    });
}

function loadImageUrl(imageUrl) {
    return customImageLoader.loadUrl(imageUrl);
}

function getCustom(key) {
    return customImageChecker.getCustom(key);
}

function getLocal(key) {
    return customImageChecker.getLocal(key);
}

function info(dataUrl) {
    return customImageDataExtractor.extract(dataUrl);
}

function load(url) {
    return getCustom(url)
        .then(function(record) {
            console.log('Found custom image record for `%s`', url, record);
            if (record.entry.hasOwnProperty('extendedInfo')) {
                return merge({ isContentTile: true }, record);
            }

            return loadImage(record.entry)
                .then(function(image) {
                    console.log('Loaded custom image for `%s`', url, image.dataUrl);
                    return merge(image, record);
                });
        })
        .catch(function(err) {
            return getLocal(url).then(function(record) {
                console.log('Found local image record for `%s`', url, record);
                return loadImage(record.entry).then(function(image) {
                    console.log('Loaded custom image for `%s`', url, image.dataUrl);
                    return merge(image, record);
                });
            });
        });
}

function has(url) {
    return customImageChecker.has(url);
}

function hasCached(url) {
    return customImageChecker.hasCached(url);
}

function save(key, dataUrl) {
    return customImageLoader.saveToCache(key, dataUrl);
}

module.exports = {
    loadImageUrl: loadImageUrl,
    load: load,
    has: has,
    hasCached: hasCached,
    getInfo: info,
    save: save
};
},{"./custom-image-checker":65,"./custom-image-data-extractor":66,"./custom-image-loader":67,"merge":157}],69:[function(require,module,exports){
"use strict";

var colorUtils = require('../../color-utils');
var imageUtils = require('../../../../common/utils/image-utils');

function extract(dataUrl) {
    return imageUtils.getImageDimensions(dataUrl).then(function(dimensions) {
        var MIN_SIZE = 48;
        var tooSmall = dimensions.width < MIN_SIZE && dimensions.height < MIN_SIZE;
        var isSquare = dimensions.width === dimensions.height;

        if (tooSmall) {
            return imageUtils.extractDominantColor(dataUrl).then(function(colorObj) {
                return {
                    tooSmall: true,
                    color: colorUtils.makeRgb(colorObj),
                    theme: colorUtils.getTheme(colorObj, true),
                    border: false
                };
            });
        }

        return {
            tooSmall: false,
            color: colorUtils.defaultIconBackground(),
            theme: 'dark',
            border: false,
            square: isSquare
        };
    });
}

module.exports = {
    extract: extract
};
},{"../../../../common/utils/image-utils":134,"../../color-utils":16}],70:[function(require,module,exports){
"use strict";

var urlUtils = require('../../../../common/utils/url-utils');
var imageUrlChecker = require('../../image-checker');

function attemptToFindFaviconsForUrl(url) {
    var baseUrl = urlUtils.getBaseUrl(url);

    var urls = [
        baseUrl.concat('/apple-touch-icon.png'),
        baseUrl.concat('/favicon.ico')
    ];

    var batch = urls.map(function(url) {
        return imageUrlChecker.check(url);
    });

    return Promise
        .all(batch)
        .then(function(results) {
            var index = results.findIndex(function(value) { return value; });

            if (index === -1) {
                throw new Error('Favicon not found');
            }

            return urls[index];
        });
}

module.exports = {
    find: attemptToFindFaviconsForUrl
};
},{"../../../../common/utils/url-utils":141,"../../image-checker":24}],71:[function(require,module,exports){
"use strict";

var imageLoader = require('../../image-loader');
var faviconCache = require('../../cache/favicon-cache');

var faviconFinder = require('./favicon-finder');
var faviconDataExtractor = require('./favicon-data-extractor');

function has(key) {
    return faviconCache.has(key);
}

function loadAndSave(url, key) {
    return imageLoader.loadAndConvertToDataUrl(url).then(function(dataUrl) {
        var data = { icon: dataUrl }; // Compatibility with old versions
        return faviconCache.put(key, data).then(function() {
            return { dataUrl: dataUrl };
        });
    });
}

function getInfo(dataUrl) {
    return faviconDataExtractor.extract(dataUrl);
}

function findFavicon(url) {
    return faviconFinder.find(url);
}

function getCached(key) {
    return faviconCache.get(key).then(function(data) {
        return { dataUrl: data.icon };
    });
}

function remove(key) {
    return faviconCache.remove(key);
}

module.exports = {
    has: has,
    loadAndSave: loadAndSave,
    get: getCached,
    remove: remove,
    getInfo: getInfo,
    findFavicon: findFavicon
};
},{"../../cache/favicon-cache":6,"../../image-loader":25,"./favicon-data-extractor":69,"./favicon-finder":70}],72:[function(require,module,exports){
"use strict";

var merge = require('merge');
var metaCache = require('../../cache/meta-cache');
var tempMetaCache = require('../../cache/temp-meta-cache');

var colorUtils = require('../../color-utils');

function has(key) {
    return metaCache.has(key);
}

function get(key) {
    return metaCache.get(key);
}

function save(key, value) {
    return metaCache.put(key, value);
}

function getTemporary(key, params) {
    return tempMetaCache.has(key)
        .then(function(hasTemporary) {
            if (hasTemporary) {
                return tempMetaCache.get(key);
            }

            var colorObj = colorUtils.randomColorFromDefaultPalette();

            var theme = colorUtils.getTheme(colorObj);
            var color = colorUtils.makeRgba(colorObj);
            var needsBorder = false;

            var meta = {
                color: color,
                theme: theme,
                border: needsBorder
            };

            return tempMetaCache.put(key, meta).then(function() {
                return meta;
            });
        })
        .then(function(meta) {
            return merge(params, meta);
        });
}

function removeTemporary(key) {
    return tempMetaCache.remove(key);
}

module.exports = {
    has: has,
    get: get,
    save: save,
    removeTemporary: removeTemporary,
    getTemporary: getTemporary
};
},{"../../cache/meta-cache":8,"../../cache/temp-meta-cache":14,"../../color-utils":16,"merge":157}],73:[function(require,module,exports){
"use strict";

var merge = require('merge');
var favicon = require('../favicon');
var pageLoader = require('../../page-loader');
var metaExtractor = require('../../meta-extractor');

function getInfo(url) {
    return pageLoader.get(url)
        .then(function(doc) {
            return metaExtractor.extract(doc);
        })
        .then(function(meta) {
            if (meta.hasOwnProperty('imageUrl')) { // Image found in page
                return meta;
            }

            return favicon.findFavicon(url)
                .then(function(faviconUrl) {
                    return merge({ imageUrl: faviconUrl }, meta);
                })
                .catch(function() { // Favicon not found
                    return meta;
                });
        });
}

module.exports = {
    getInfo: getInfo
};
},{"../../meta-extractor":41,"../../page-loader":45,"../favicon":71,"merge":157}],74:[function(require,module,exports){
"use strict";

var presetImages = require('../../cache/preset-image-cache');

function has(url) {
    return presetImages.has(url);
}

function get(url) {
    return presetImages.get(url);
}

function save(url, entry) {
    return presetImages.put(url, entry);
}

module.exports = {
    has: has,
    get: get,
    save: save
};
},{"../../cache/preset-image-cache":11}],75:[function(require,module,exports){
"use strict";

var promoImages = require('../../cache/promo-image-cache');

function has(url) {
    return promoImages.has(url);
}

function get(url) {
    return promoImages.get(url);
}

function save(url, entry) {
    return promoImages.put(url, entry);
}

module.exports = {
    has: has,
    get: get,
    save: save
};
},{"../../cache/promo-image-cache":12}],76:[function(require,module,exports){
"use strict";

var proxy = require('./xhr-proxy');

module.exports = {
    check: function(url) {
        return new Promise(function(resolve, reject) {
            proxy.load({ url: url,  method: 'GET', headers: { Range: 'bytes=0-1' } }, true).then(resolve).catch(reject);
        });
    }
};
},{"./xhr-proxy":80}],77:[function(require,module,exports){
"use strict";

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCorrectUrl(url, hostname) {
    if (url.match(/^https?:\/\/(www[0-9]?\.)?(.[^\/:]+)/i)) {
        return url;
    }

    if (url.match(/^\/\/(www[0-9]?\.)?(.[^\/:]+)/i)) {
        return 'http:'.concat(url);
    }

    if (url.match(/^(.+\.\w{2,5}\/.+)/i)) {
        return 'http://'.concat(url);
    }

    if (url.substr(0, 1) !== '/') {
        url = '/'.concat(url);
    }

    return 'http://'.concat(hostname).concat(url);
}

function isPromise(value) {
    return (value && value.hasOwnProperty('then') && (typeof value.then === 'function'));
}

function proxyPromiseResult(fn) {
    return function() {
        const args = arguments;
        const result = fn();
        if (isPromise(result)) {
            return result.then(function() { return args; });
        }
        return args[0]; // Promise.then() always accepts a single argument
    };
}

module.exports = {
    randomInt: randomInt,
    isPromise: isPromise,
    proxyPromiseResult: proxyPromiseResult,
    createCorrectUrl: createCorrectUrl
};
},{}],78:[function(require,module,exports){
"use strict";

var generator = require('./demo-site-generator');

function getVbSites() {
    var bookmark_keys = [];
    for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            if (key.indexOf('visual-bookmarks.bookmark_') >= 0) {
                bookmark_keys.push(key);
            }
        }
    }

    var sites = [];
    bookmark_keys.forEach(function(key) {
        var bookmark = JSON.parse(localStorage.getItem(key));
        sites.push({
            url: bookmark.url,
            title: bookmark.title,
            index: bookmark.index
        });
    });

    return sites.sort(function(a, b) {
        return a.index > b.index;
    });
}

module.exports = {
    load: function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                return resolve(generator(getVbSites()));
            }, 100);
        });
    }
};
},{"./demo-site-generator":18}],79:[function(require,module,exports){
"use strict";

var TileType = require('../../common/models/tile-type');
var MediaTileType = require('../../common/constants/media-tiles-types');
var extensionIds = require('./../../common/constants/extension-ids');
var localize = require('../../common/services/localize-service');

var specialWidgets = require('./special/special-widgets');

function getWidgetSourceByType(widgetString, options) {
    var source;
    var [ type, params ] = widgetString.split('?');
    switch(type) {
        case TileType.EMAIL:
            source = {
                type: TileType.EMAIL,
                title: localize('widgets_mail'),
                url: 'https://e.mail.ru',
                smallImageUrl: 'img/extensions/mail-small.png',
                mediumImageUrl: 'img/extensions/mail-medium.png',
                largeImageUrl: 'img/extensions/mail-large.png'
            };
            break;

        case TileType.WEATHER:
            source = {
                type: TileType.WEATHER,
                title: localize('widgets_weather'),
                url: 'http://r.mail.ru/clb1341715/pogoda.mail.ru/'
            };
            break;

        case TileType.CURRENCY:
            source = {
                type: TileType.CURRENCY,
                title: localize('widgets_currency'),
                url: 'http://news.mail.ru/currency.html'
            };
            break;

        case TileType.HORO:
            source = {
                type: TileType.HORO,
                title: localize('widgets_horo'),
                url: 'https://horo.mail.ru/prediction/today/',
                smallImageUrl: 'img/extensions/horo-small.png',
                mediumImageUrl: 'img/extensions/horo-medium.png',
                largeImageUrl: 'img/extensions/horo-large.png'
            };
            break;

        case TileType.MUSIC:
            options = options || { hasApp: true };
            source = {
                type: TileType.MUSIC,
                title: localize('widgets_music'),
                isApp: options.hasApp === true,
                smallImageUrl: 'img/extensions/music-small.png',
                mediumImageUrl: 'img/extensions/music-medium.png',
                largeImageUrl: 'img/extensions/music-large.png'
            };
            break;
        case TileType.SHOWCASE:
            source = {
                type: TileType.SHOWCASE,
                title: localize('widgets_games')
            };
            break;
        case MediaTileType.RECIPES:
            source = {
                type: TileType.MEDIA,
                mediaType: MediaTileType.RECIPES,
                title: localize('widgets_recipes'),
                mainColor: '#FF2D54',
                url: 'https://lady.mail.ru/cookery/',
                apiUrl: 'http://likemore-fe.go.mail.ru/?cid=ee8569ae3fcde0a4e943eac6c75410ec&referer=lady.mail.ru',
                className: 'recipes-tile',
                titleImageUrl: 'img/recipes.svg'
            };
            break;
        case MediaTileType.HITECH:
            source = {
                type: TileType.MEDIA,
                mediaType: MediaTileType.HITECH,
                title: 'hi-tech@mail.ru',
                mainColor: '#5856D6',
                url: 'https://hi-tech.mail.ru/news/',
                apiUrl: 'http://likemore-fe.go.mail.ru/?cid=cb4b38c0c4a372b222839202993959c7&referer=hi-tech.mail.ru',
                className: 'hitech-tile',
                titleImageUrl: 'img/hitech.svg'
            };
            break;
        case TileType.MYWIDGET:
            const tempParams = params.split('&').reduce(function(result, pair) {
                const [ key, value ] = pair.split('=');
                result[key] = decodeURIComponent(value);
                return result;
            }, {});
            source = {
                type: TileType.MYWIDGET,
                url: 'https://go.mail.ru',
                cid: tempParams.cid, //'ff7084618ee0d36bb819be1ea4870878'
                icon: tempParams.icon, //'../img/media-tile/recipes-left.svg'
                title: tempParams.title,
                updateInterval: tempParams.update_interval,
                themeColor: tempParams.theme_color,
                textColor: tempParams.text_color,
                referer: tempParams.referer, //'life.ru'
                initialStatus: tempParams.inverted === 'true'
            };
            break;
        case TileType.OK_GIFTS:
            source = {
                type: TileType.OK_GIFTS
            };
            break;
        case TileType.OK_STREAMS:
            source = {
                type: TileType.OK_STREAMS
            };
            break;
        case TileType.OK_GAMES:
            source = {
                type: TileType.OK_GAMES
            };
            break;
        case TileType.OK_NOTIFICATIONS:
            source = {
                type: TileType.OK_NOTIFICATIONS
            };
            break;
        default:
            source = specialWidgets.getSource(type);
    }

    if (!source) {
        source = {
            type: TileType.SITE,
            title: 'mail.ru',
            url: 'http://mail.ru'
        };
    }

    return source;
}

module.exports = {
    getSource: getWidgetSourceByType
};
},{"../../common/constants/media-tiles-types":82,"../../common/models/tile-type":114,"../../common/services/localize-service":118,"./../../common/constants/extension-ids":81,"./special/special-widgets":63}],80:[function(require,module,exports){
"use strict";

var xhr = require('xhr');

var LIMIT = 5;

function Buffer(handler) {
    var queue = [ ];

    function run() {
        handler(queue.shift(), function() {
            if (queue.length > 0) {
                setTimeout(run, 100);
            }
        });
    }

    this.append = function(task) {
        queue.push(task);

        if (queue.length < LIMIT) {
            run();
        }
    };
}

function Task(options, callback) {
    this.options = options;
    this.callback = callback;
}

function taskHandler(task, callback) {
    xhr(task.options, function(err, res, body) {
        task.callback(err, res, body);
        callback();
    });
}

var buffer = new Buffer(taskHandler);

module.exports = {
    load: function(options, fullResponse) {
        return new Promise(function(resolve, reject) {
            buffer.append(new Task(options, function(err, res/*, body*/) {
                if (err) {
                    console.error('XHR ERROR', err, res);
                    return reject(err);
                }

                if (fullResponse === true) {
                    return resolve(res);
                }

                resolve(res.response);
            }));
        });
    }
};

},{"xhr":175}],81:[function(require,module,exports){
"use strict";

module.exports = {
    MUSIC_EXT: 'edkeelajlcgdekcgnfbchhlfgdhngiff',
    MUSIC_APP: 'mbipmajmbfjakbcfnjdldckninlnmhoe',
    MASTER_PLUGIN: '',
    SOCIAL_PLUGIN: 'diciddlabejpoaofdnmoamebeohoiobg',
    MAIL_CHECKER_EXT: 'kgkggmpkealihpbjpdmcblcplljamohl',
    MAIL_CHECKER_APP: 'hlnkhcccfccipjdgeddoifmlognfajdp',
    CLOUD: 'igcpckodfphkhippbghgobbfajdfooii',
    SHARING: 'hfpahoblpjopcfnlokmndooidiinhiie'
};
},{}],82:[function(require,module,exports){
module.exports = {
    RECIPES: 'recipes',
    HITECH: 'hitech'
};
},{}],83:[function(require,module,exports){
module.exports = {
    VK: 'vk',
    MM: 'mm',
    OK: 'ok',
    TW: 'tw'
};
},{}],84:[function(require,module,exports){
module.exports = {
    USER: 'user',
    GROUP: 'group',
    NOT_SOCIAL: 'not_social'
};
},{}],85:[function(require,module,exports){
"use strict";

const chrome = require('../factory/chrome-factory')();

module.exports = {
    RFR_KEY: 'rfr',
    FR_KEY: 'fr',
    PRODUCT_ID_KEY: 'product_id',
    OK_PIXEL_URL: 'https://ad.mail.ru/i1918.gif',



     RFR_VALUE: '800000',
     RB_PIXEL_URL: 'https://ad.mail.ru/i1554.gif',
     FR3_VALUE: 'vbm',
     COMP_VALUE: 'pult',
     PRODUCT_TYPE: 'ff_pult',
     FR_VALUE: 'ffpult',

     FR_VALUE: 'ffpult',
     ADD_COMP_HP: 0,
     ADD_COMP_DSE: 0,
     RB_PIXEL_URL: 'https://ad.mail.ru/i1554.gif',
     ONE_LINK: true,






};

},{"../factory/chrome-factory":88}],86:[function(require,module,exports){
module.exports = {
    MAX_FULL_IMAGE_WIDTH: 2560,
    MAX_FULL_IMAGE_HEIGHT: 1440,
    MAX_PREVIEW_WIDTH: 135,
    MAX_PREVIEW_HEIGHT: 76,
    MAX_ACCEPTABLE_RATIO_DIFF: 0.1,
    COMMON_RATIO: 16 / 9
};
},{}],87:[function(require,module,exports){
const localize = require('../services/localize-service');

// name of mode should be equal to name of property in root object
module.exports = {
    small: {
        name: 'small',
        maxCount: 24,
        title: localize('tileMode_small'),
        image: 'img/tiles-settings/mode-small.svg'
    },
    medium: {
        name: 'medium',
        maxCount: 12,
        title: localize('tileMode_medium'),
        image: 'img/tiles-settings/mode-medium.svg'
    },
    large: {
        name: 'large',
        maxCount: 8,
        title: localize('tileMode_large'),
        image: 'img/tiles-settings/mode-large.svg'
    },
    mix: {
        name: 'mix',
        maxCount: 24,
        title: localize('tileMode_mixed'),
        image: 'img/tiles-settings/mode-mix.svg'
    }
};
},{"../services/localize-service":118}],88:[function(require,module,exports){
"use strict";

module.exports = function() {
    return window.chrome || window.browser;
};
},{}],89:[function(require,module,exports){
"use strict";

module.exports = function() {
    return window.localStorage;
};
},{}],90:[function(require,module,exports){
const TileType = require('../models/tile-type');
const SiteTile = require('../models/decorated-site-tile');
const OkGiftsTile = require('../models/ok-gifts-tile');
const OkGamesTile = require('../models/ok-games-tile');
const OkStreamsTile = require('../models/ok-streams-tile');
const OkNotificationsTile = require('../models/ok-notifications-tile');
const socialNetworks = require('../constants/social-networks');

const mix = require('../../common/utils/mix');
const RbUrlMixin = require('../../common/mixins/rb-url');

const rb = (Super) => (bannerId, authBannerId) => mix(Super).with(RbUrlMixin(bannerId, authBannerId));
const isOk = (socialInfo) => socialInfo.network === socialNetworks.OK;
const createVideoTile = (source) => new (rb(SiteTile)('25564283', '25564289'))(source);
const createMusicTile = (source) => new (rb(SiteTile)('25564196', '25564203'))(source);
const createGamesTile = (source) => new (rb(OkGamesTile)('25564370', '98747'))(source);
const createGiftsTile = (source) => new (rb(OkGiftsTile)('25564454', '25564458'))(source);
const createStreamsTile = (source) => new (rb(OkStreamsTile)('25564428', '25564439'))(source);
const createProfileTile = (source) => new (rb(SiteTile)('25564128', '25564145'))(source);
const createPaymentsTile = (source) => new (rb(SiteTile)('25564305', '25564316'))(source);
const createGameStreamsTile = (source) => new (rb(SiteTile)('25564348', '25564352'))(source);
const createNotificationTile = (type) => (source) => {
    let bannerId, authBannerId, modifications;
    switch (type) {
        case TileType.OK_MARKS:
            bannerId = '25564212';
            authBannerId = '25564231';
            modifications = {
                type: TileType.OK_MARKS,
                title: chrome.i18n.getMessage('ok_widgetMarks'),
                url: 'https://ok.ru/marks'
            };
            break;
        case TileType.OK_GUESTS:
            bannerId = '25564328';
            authBannerId = '25564334';
            modifications = {
                type: TileType.OK_GUESTS,
                title: chrome.i18n.getMessage('ok_widgetGuests'),
                url: 'https://ok.ru/guests'
            };
            break;
        case TileType.OK_MESSAGES:
            bannerId = '25564175';
            authBannerId = '25564183';
            modifications = {
                type: TileType.OK_MESSAGES,
                title: chrome.i18n.getMessage('ok_widgetMessages'),
                url: 'https://ok.ru/messages'
            };
            break;
        case TileType.OK_NOTIFICATIONS:
        default:
            bannerId = '25564253';
            authBannerId = '25564260';
            modifications = {
                type: TileType.OK_NOTIFICATIONS,
                title: chrome.i18n.getMessage('ok_widgetNotifications'),
                url: 'https://ok.ru/notifications'
            };
    }
    return new (rb(OkNotificationsTile)(bannerId, authBannerId))(Object.assign({}, source, modifications));
};

module.exports = {
    isOk,
    createVideoTile,
    createMusicTile,
    createGamesTile,
    createGiftsTile,
    createProfileTile,
    createStreamsTile,
    createPaymentsTile,
    createGameStreamsTile,
    createNotificationTile
};

},{"../../common/mixins/rb-url":92,"../../common/utils/mix":136,"../constants/social-networks":83,"../models/decorated-site-tile":96,"../models/ok-games-tile":104,"../models/ok-gifts-tile":105,"../models/ok-notifications-tile":106,"../models/ok-streams-tile":107,"../models/tile-type":114}],91:[function(require,module,exports){
"use strict";

const SiteTile = require('../models/decorated-site-tile');
const MusicTile = require('../models/music-tile');
const CurrencyTile = require('../models/currency-tile');
const WeatherTile = require('../models/weather-tile');
const HoroTile = require('../models/horo-tile');
const PromoTile = require('../models/promo-tile');
const EmailTile = require('../models/email-tile');
const ShowcaseTile = require('../models/showcase-tile');
const MediaTile = require('../models/media-tile');
const MyWidgetTile = require('../models/mywidget-tile');
const BlankTile = require('../models/blank-tile');
const TileType = require('../models/tile-type');
const urlUtils = require('../utils/url-utils');
const ok = require('./ok-tile-factory');

const socialService = require('../services/social-service');
const specialTileFactory = require('./../special/special-tile-factory');

module.exports = {
    create(source) {
        source = source || {
            type: TileType.SITE,
            title: 'mail.ru',
            url: 'http://mail.ru'
        };

        let tile;

        function createSiteTileExcludingWidgets(source) {
            const url = source.url;
            const isDomain = urlUtils.isDomain(url);

            if (/^https?:\/\/(www.)?ok.ru\/gifts(\/?)/gi.test(url)) {
                return ok.createGiftsTile(source);
            }

            if (/^https?:\/\/(www.)?ok.ru\/video\/liveApp(\/?)$/gi.test(url)) {
                return ok.createStreamsTile(source);
            }

            if (/^https?:\/\/(www.)?ok.ru\/games(\/?)$/gi.test(url)) {
                return ok.createGamesTile(source);
            }

            if (/^https?:\/\/(www.)?ok.ru\/notifications(\/?)$/gi.test(url)) {
                return ok.createNotificationTile(TileType.OK_NOTIFICATIONS)(source);
            }

            if (/^https?:\/\/(www.)?ok.ru\/messages$/gi.test(url)) {
                return ok.createNotificationTile(TileType.OK_MESSAGES)(source);
            }

            if (/^https?:\/\/(www.)?ok.ru\/marks/gi.test(url)) {
                return ok.createNotificationTile(TileType.OK_MARKS)(source);
            }

            if (/^https?:\/\/(www.)?ok.ru\/guests/gi.test(url)) {
                return ok.createNotificationTile(TileType.OK_GUESTS)(source);
            }

            if (/^https?:\/\/(www.)?ok.ru\/payment\/p2pnew$/gi.test(url)) {
                return ok.createPaymentsTile(source);
            }

            if (/^https?:\/\/(www.)?ok.ru\/music$/gi.test(url)) {
                return ok.createMusicTile(source);
            }

            if (/^https?:\/\/(www.)?ok.ru\/video\/top$/gi.test(url)) {
                return ok.createVideoTile(source);
            }

            if (/^https:\/\/games.ok.ru\/streams$/gi.test(url)) {
                return ok.createGameStreamsTile(source);
            }

            if (!isDomain) {
                return new SiteTile(source);
            }

            if (/^https?:\/\/horo.mail.ru/gi.test(url)) {
                return new HoroTile(source);
            }

            if (/^https?:\/\/e.mail.ru/gi.test(url)) {
                return new EmailTile(source);
            }

            if (/^https?:\/\/pogoda.mail.ru/gi.test(url)) {
                return new WeatherTile(source);
            }

            const socialTile = createSocialTile(source);

            if (socialTile != null) {
                return socialTile;
            } else {
                return new SiteTile(source);
            }
        }

        function createSocialTile(source) {
            const socialInfo = socialService.getSocialInfoForUrl(source.url);
            if (socialInfo) {
                source.extendedInfo = Object.assign({}, socialInfo, {
                    type: 'social'
                });
                return ok.isOk(socialInfo) ? ok.createProfileTile(source) : new SiteTile(source);
            }

            return undefined;
        }

        switch (source.type) {
            case TileType.PROMO:
                tile = new PromoTile(source);
                break;
            case TileType.EMAIL:
                tile = new EmailTile(source);
                break;
            case TileType.MUSIC:
                tile = new MusicTile(source);
                break;
            case TileType.CURRENCY:
                tile = new CurrencyTile(source);
                break;
            case TileType.WEATHER:
                tile = new WeatherTile(source);
                break;
            case TileType.HORO:
                tile = new HoroTile(source);
                break;
            case TileType.SHOWCASE:
                tile = new ShowcaseTile(source);
                break;
            case TileType.MEDIA:
                tile = new MediaTile(source);
                break;
            case TileType.MYWIDGET:
                tile = new MyWidgetTile(source);
                break;
            case TileType.OK_GIFTS:
                tile = ok.createGiftsTile(source);
                break;
            case TileType.OK_STREAMS:
                tile = ok.createStreamsTile(source);
                break;
            case TileType.OK_NOTIFICATIONS:
            case TileType.OK_MESSAGES:
            case TileType.OK_GUESTS:
            case TileType.OK_MARKS:
                tile = ok.createNotificationTile(source.type)(source);
                break;
            case TileType.OK_GAMES:
                tile = ok.createGamesTile(source);
                break;
            case TileType.BLANK:
                tile = new BlankTile(source);
                break;
            case TileType.SITE:
                tile = createSiteTileExcludingWidgets(source);
                break;
            default:
                tile = specialTileFactory.create(source) || createSocialTile(source) || createSiteTileExcludingWidgets(source);
        }

        return tile;
    }
};
},{"../models/blank-tile":94,"../models/currency-tile":95,"../models/decorated-site-tile":96,"../models/email-tile":97,"../models/horo-tile":100,"../models/media-tile":101,"../models/music-tile":102,"../models/mywidget-tile":103,"../models/promo-tile":109,"../models/showcase-tile":110,"../models/tile-type":114,"../models/weather-tile":115,"../services/social-service":119,"../utils/url-utils":141,"./../special/special-tile-factory":124,"./ok-tile-factory":90}],92:[function(require,module,exports){
const urlUtils = require('../utils/url-utils');

module.exports = function(bannerId, loggedInBannerId) {
    return function(Super) {
        return class RbUrlMixedClass extends Super {
            get rbUrl() {
                return urlUtils.wrapRbLink(bannerId)(this.url);
            }
            get rbAuthUrl() {
                return urlUtils.wrapRbLink(loggedInBannerId)(this.url);
            }
            get bannerId() {
                return bannerId;
            }
            get authBannerId() {
                return loggedInBannerId;
            }
        };
    };
};
},{"../utils/url-utils":141}],93:[function(require,module,exports){
"use strict";

const guid = require('../utils/guid');
const TileType = require('./tile-type');
const urlUtils = require('./../utils/url-utils');

class Tile {
    constructor(source) {
        this._id = source.hasOwnProperty('id') ? source.id : guid();
        this._type = source.type || TileType.DEFAULT;
        this._dragOptions = { };
    }

    get id() {
        return this._id;
    }

    get type() {
        return this._type;
    }

    get displayType() {
        return this._type;
    }

    get custom() {
        return this._custom;
    }

    get dragOptions() {
        return this._dragOptions;
    }

    set dragOptions(options) {
        this._dragOptions = options;
    }

    compare(tileInfo) {
        tileInfo = tileInfo || {};

        if (this.type !== TileType.SITE && this.type === tileInfo.type) {
            return true;
        }

        if (this.type === TileType.SITE && tileInfo.type === TileType.SITE && tileInfo.url != null) {
            const tileUrl = this.url;
            const tileIsDomain = urlUtils.isDomain(tileUrl);
            const tileHostname = urlUtils.getHostname(tileUrl);

            if (tileInfo.isDomain && tileIsDomain) {
                return tileHostname === tileInfo.hostname;
            }

            return urlUtils.compare(tileInfo.url, tileUrl);
        }

        return this.id === tileInfo.id;
    }

    json() {
        return {
            id: this.id,
            type: this.type
        };
    }

    updateId(value) {
        this._id = value; // Temporary method to eliminate duplicate id's in user's boards
    }
}

module.exports = Tile;
},{"../utils/guid":133,"./../utils/url-utils":141,"./tile-type":114}],94:[function(require,module,exports){
"use strict";

const TileType = require('./tile-type');
const BaseTile = require('./base-tile');

class BlankTile extends BaseTile {
    constructor(source) {
        super(source);
        this._type = TileType.BLANK;
    }
}

module.exports = BlankTile;
},{"./base-tile":93,"./tile-type":114}],95:[function(require,module,exports){
"use strict";

const BaseTile = require('./base-tile');
const TileType = require('./tile-type');

class CurrencyTile extends BaseTile {
    constructor(source) {
        super(source);

        this._type = TileType.CURRENCY;
        this._url = source.url || '';
        this._title = source.title || '';
        this._defaultImage = source.defaultImage || '/img/no-int-big-black.png';
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get defaultImage() {
        return this._defaultImage;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            url: this.url,
            defaultImage: this.defaultImage
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = CurrencyTile;

},{"./base-tile":93,"./tile-type":114}],96:[function(require,module,exports){
"use strict";

const SiteTile = require('./site-tile');
const TileType = require('./tile-type');

class DecoratedSiteTile extends SiteTile {
    constructor(source) {
        super(source);

        this._type = TileType.SITE;
        this._meta = source.meta || null;
    }

    get meta() {
        return this._meta;
    }

    get hasMeta() {
        return this._meta !== null;
    }

    setMeta(value) {
        this._meta = value;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            meta: this.meta
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = DecoratedSiteTile;
},{"./site-tile":111,"./tile-type":114}],97:[function(require,module,exports){
"use strict";

const TileType = require('./tile-type');
const BaseTile = require('./base-tile');

class EmailTile extends BaseTile {
    constructor(source) {
        super(source);

        this._type = TileType.EMAIL;
        this._isApp = source.isApp === true;
        this._url = 'http://e.mail.ru';
        this._title = source.title || '';
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get isApp() {
        return this._isApp;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            url: this.url,
            isApp: this.isApp
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = EmailTile;
},{"./base-tile":93,"./tile-type":114}],98:[function(require,module,exports){
"use strict";

module.exports = {
    COUNT: 'count',
    TIME: 'time',
    DEFAULT: 'default'
};
},{}],99:[function(require,module,exports){
"use strict";

module.exports = {
    HINT: 'hint',
    ONBOARDING: 'onboarding',
    DEFAULT: 'default'
};
},{}],100:[function(require,module,exports){
"use strict";

const BaseTile = require('./base-tile');
const TileType = require('./tile-type');

class HoroTile extends BaseTile {
    constructor(source) {
        super(source);

        this._type = TileType.HORO;
        this._url = 'http://horo.mail.ru';
        this._title = source.title || '';
        this._defaultImage = source.defaultImage || '/img/no-int-big-white.png';
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get defaultImage() {
        return this._defaultImage;
    }

    setUrl(url) {
        this._url = url;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            url: this.url,
            defaultImage: this.defaultImage
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = HoroTile;

},{"./base-tile":93,"./tile-type":114}],101:[function(require,module,exports){
"use strict";

const urlUtils = require('../../common/utils/url-utils');
const DecoratedSiteTile = require('./decorated-site-tile');
const TileType = require('./tile-type');

class MediaTile extends DecoratedSiteTile {
    constructor(source) {
        super(source);

        this._type = TileType.MEDIA;
        this._url = source.url;
        this._defaultUrl = source.defaultUrl || source.url;
        this._title = source.title || '';
        this._mediaType = source.mediaType;
        this._apiUrl = source.apiUrl;
        this._mainColor = source.mainColor;
        this._className = source.className;
        this._titleImageUrl = source.titleImageUrl;
        this._regressMode = false;
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get defaultUrl() {
        return this._defaultUrl;
    }

    get mediaType() {
        return this._mediaType;
    }

    get apiUrl() {
        return this._apiUrl;
    }

    get mainColor() {
        return this._mainColor;
    }

    get className() {
        return this._className;
    }

    get titleImageUrl() {
        return this._titleImageUrl;
    }

    get displayType() {
        return this._regressMode ? TileType.SITE : this._type;
    }

    setUrl(url) {
        this._url = url;
    }

    regressToOrdinaryTile() {
        this._regressMode = true;
    }

    compare(tileInfo) {
        return this.type === tileInfo.type && this.mediaType === tileInfo.tile.mediaType;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            mediaType: this.mediaType,
            defaultUrl: this.defaultUrl,
            apiUrl: this.apiUrl,
            mainColor: this.mainColor,
            className: this.className,
            titleImageUrl: this.titleImageUrl
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = MediaTile;

},{"../../common/utils/url-utils":141,"./decorated-site-tile":96,"./tile-type":114}],102:[function(require,module,exports){
"use strict";

const TileType = require('./tile-type');
const BaseTile = require('./base-tile');

class MusicTile extends BaseTile {
    constructor(source) {
        super(source);

        this._type = TileType.MUSIC;
        this._isApp = source.isApp === true;
        this._title = source.title || '';
    }

    get title() {
        return this._title;
    }

    get isApp() {
        return this._isApp;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            isApp: this.isApp
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = MusicTile;
},{"./base-tile":93,"./tile-type":114}],103:[function(require,module,exports){
/**
 * Created by a.protasov on 05.10.2016.
 */
"use strict";

const BaseTile = require('./base-tile');
const TileType = require('./tile-type');

class MyWidgetTile extends BaseTile {
    constructor(source) {
        super(source);
        this._type = TileType.MYWIDGET;
        this._url = source.url;
        this._cid = source.cid;
        this._title = source.title;
        this._themeColor = source.themeColor;
        this._textColor = source.textColor;
        this._updateInterval = parseInt(source.updateInterval);
        this._icon = source.icon;
        this._referer = source.referer;
        this._initialStatus = source.initialStatus;
        this._regressMode = false;
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get cid() {
        return this._cid;
    }

    get themeColor() {
        return this._themeColor;
    }

    get textColor() {
        return this._textColor;
    }

    get updateInterval() {
        return this._updateInterval;
    }

    get icon() {
        return this._icon;
    }

    get referer() {
        return this._referer;
    }

    get initialStatus() {
        return this._initialStatus;
    }

    setUrl(url) {
        this._url = url;
    }

    regressToOrdinaryTile() {
        this._regressMode = true;
    }

    compare(tileInfo) {
        return this.type === tileInfo.type && this.cid === tileInfo.tile.cid;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            url: this.url,
            cid: this.cid,
            themeColor: this.themeColor,
            textColor: this.textColor,
            referer: this.referer,
            initialStatus: this.initialStatus,
            updateInterval: this.updateInterval,
            icon: this.icon
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = MyWidgetTile;

},{"./base-tile":93,"./tile-type":114}],104:[function(require,module,exports){
"use strict";

const TileType = require('./tile-type');
const BaseTile = require('./decorated-site-tile');

class OkGamesTile extends BaseTile {
    constructor(source) {
        super(source);

        this._type = TileType.OK_GAMES;
        this._showcaseType = 'ok_games';
        this._title = chrome.i18n.getMessage('ok_widgetGames');
        this._url = 'https://ok.ru/games';
        this._custom = true;
    }

    get title() {
        return this._title;
    }

    get showcaseType() {
        return this._showcaseType;
    }

    get displayType() {
        return this._regressMode ? TileType.SITE : this._type;
    }

    get url() {
        return this._url;
    }

    regressToOrdinaryTile() {
        this._regressMode = true;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            showcaseType: this.showcaseType
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = OkGamesTile;
},{"./decorated-site-tile":96,"./tile-type":114}],105:[function(require,module,exports){
/**
 * Created by a.protasov on 05.10.2016.
 */
"use strict";

const BaseTile = require('./decorated-site-tile');
const TileType = require('./tile-type');
const chrome = window.chrome;

class OkGiftsTile extends BaseTile {
    constructor(source) {
        super(source);
        this._type = TileType.OK_GIFTS;
        this._url = 'https://ok.ru/gifts'; // FIXME Restore or=PULT
        this._title = chrome.i18n.getMessage('ok_widgetGifts');
        this._regressMode = false;
        this._extendedInfo = {
            type: TileType.OK_GIFTS
        };
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get displayType() {
        return this._regressMode ? TileType.SITE : this._type;
    }

    setUrl(url) {
        this._url = url;
    }

    regressToOrdinaryTile() {
        this._regressMode = true;
    }

    compare(tileInfo) {
        return this.type === tileInfo.type;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            url: this.url
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = OkGiftsTile;

},{"./decorated-site-tile":96,"./tile-type":114}],106:[function(require,module,exports){
"use strict";

const BaseTile = require('./decorated-site-tile');
const TileType = require('./tile-type');
const chrome = window.chrome;

class OkNotificationsTile extends BaseTile {
    constructor(source) {
        super(source);
        this._type = source.type;
        this._url = source.url;
        this._title = source.title;
        this._regressMode = false;
        this._extendedInfo = {
            type: source.type
        };
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get displayType() {
        return this._regressMode ? TileType.SITE : this._type;
    }

    setUrl(url) {
        this._url = url;
    }

    regressToOrdinaryTile() {
        this._regressMode = true;
    }

    compare(tileInfo) {
        return this.type === tileInfo.type;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            url: this.url
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = OkNotificationsTile;

},{"./decorated-site-tile":96,"./tile-type":114}],107:[function(require,module,exports){
"use strict";

const BaseTile = require('./decorated-site-tile');
const TileType = require('./tile-type');
const chrome = window.chrome;

class OkStreamsTile extends BaseTile {
    constructor(source) {
        super(source);
        this._type = TileType.OK_STREAMS;
        this._url = 'https://ok.ru/video/liveApp';
        this._title = chrome.i18n.getMessage('ok_widgetStreams');
        this._ignoreExtended = false;
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get displayType() {
        return this._regressMode ? TileType.SITE : this._type;
    }

    setUrl(url) {
        this._url = url;
    }

    regressToOrdinaryTile() {
        this._regressMode = true;
    }

    compare(tileInfo) {
        return this.type === tileInfo.type;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            url: this.url
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = OkStreamsTile;

},{"./decorated-site-tile":96,"./tile-type":114}],108:[function(require,module,exports){
"use strict";

function PresetsState(source) {
    source = source || { };
    this.__currentPresetsStr = source.currentPresetsStr || '';
    this.__lastDiff = source.lastDiff || '';
    this.__featureApplied = source.featureApplied || { };
}

PresetsState.prototype = {
    get lastDiff() {
        return this.__lastDiff;
    },
    findDiff: function(newPresetsStr) {
        var prevPresetsStr = this.__currentPresetsStr;

        var result =
            newPresetsStr.startsWith(prevPresetsStr) && prevPresetsStr.length > 0 ?
                newPresetsStr.slice(prevPresetsStr.length + 1) :
                newPresetsStr;

        return result.trim();
    },
    changeState: function(newPresetsStr) {
        this.__lastDiff = this.findDiff(newPresetsStr);
        this.__currentPresetsStr = newPresetsStr;
        this.disapplyAllFeatures();
    },
    applyFeature: function(feature) {
        this.__featureApplied[feature] = true;
    },
    isFeatureApplied: function(feature) {
        return this.__featureApplied[feature];
    },
    isAllFeaturesApplied: function() {
        return Object.keys(this.__featureApplied).every(function(feature) {
            return this.__featureApplied[feature] === true;
        }.bind(this));
    },
    disapplyAllFeatures: function() {
        Object.keys(this.__featureApplied).forEach(function(feature) {
            this.__featureApplied[feature] = false;
        }.bind(this));
    },
    json: function() {
        return {
            currentPresetsStr: this.__currentPresetsStr,
            featureApplied: this.__featureApplied
        };
    }
};

module.exports = PresetsState;

},{}],109:[function(require,module,exports){
"use strict";

const objectUtils = require('../../common/utils/object-utils');
const localize = require('../services/localize-service');

const TileType = require('./tile-type');
const SiteTile = require('./site-tile');

class PromoTile extends SiteTile {
    constructor(source) {
        const siteSource = objectUtils.findNestedObjectByPropertyName(source, 'site') || {}; // this lines are for
        const extendedSource = Object.assign({}, source, siteSource);                         // correct comparison
        extendedSource.url = extendedSource.fixedUrl || extendedSource.url;                 // with board tiles

        super(extendedSource);

        this._bannerId = source.bannerId;
        this._type = TileType.PROMO;
        this._action = source.action || {};
        this._icon = source.icon || { url: '' };
        this._category = source.category || '';
        this._background = source.background || { color: '#ffffff' };
        this._src = siteSource;
    }

    get icon() {
        return this._icon;
    }

    get action() {
        return this._action;
    }

    get category() {
        return this._category;
    }

    get background() {
        return this._background;
    }

    get bannerId() {
        return this._bannerId;
    }

    get backText() {
        return this.action.backText || localize('promo_navigate');
    }

    get src() {
        return this._src;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            icon: this.icon,
            action: this.action,
            category: this.category,
            background: this.background,
            bannerId: this.bannerId,
            src: this.src
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = PromoTile;
},{"../../common/utils/object-utils":137,"../services/localize-service":118,"./site-tile":111,"./tile-type":114}],110:[function(require,module,exports){
"use strict";

const TileType = require('./tile-type');
const BaseTile = require('./base-tile');

class ShowcaseTile extends BaseTile {
    constructor(source) {
        super(source);

        this._type = TileType.SHOWCASE;
        this._showcaseType = source.showcaseType || 'games';
        this._title = source.title || '';
        this._url = 'games_widget';
        this._custom = true;
    }

    get title() {
        return this._title;
    }

    get showcaseType() {
        return this._showcaseType;
    }

    get url() {
        return this._url;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            showcaseType: this.showcaseType
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = ShowcaseTile;
},{"./base-tile":93,"./tile-type":114}],111:[function(require,module,exports){
"use strict";

const urlUtils = require('../../common/utils/url-utils');

const TileType = require('./tile-type');
const BaseTile = require('./base-tile');

class SiteTile extends BaseTile {
    constructor(source) {
        super(source);

        this._type = TileType.SITE;
        this._url = source.url || undefined;
        this._title = source.title || '';
        this._extendedInfo = source.extendedInfo || undefined;
        this._hostname = urlUtils.getHostname(this._url);
        this._favicon = source.favicon || 'chrome://favicon/' + this.url;
        this._color = source.color || undefined;
        this._isDomain = urlUtils.isDomain(this._url);
        this._priority = source.priority || 0;
        this._ignoreExtended = false;
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get extendedInfo() {
        return this._extendedInfo;
    }

    get hostname() {
        return this._hostname;
    }

    get favicon() {
        return this._favicon;
    }

    get color() {
        return this._color;
    }

    get isDomain() {
        return this._isDomain;
    }

    get priority() {
        return this._priority;
    }

    get isExtended() {
        return this._extendedInfo !== undefined && !this._ignoreExtended;
    }

    get displayType() {
        return this.isExtended ? this._extendedInfo.type : 'site';
    }

    regressToOrdinaryTile() {
        this._ignoreExtended = true;
    }

    revertToOrdinaryTile() {
        this._extendedInfo = undefined;
    }

    revokeRegressToOrdinaryTile() {
        this._regressMode = false;
        this._ignoreExtended = false;
    }

    setColor(value) {
        this._color = value;
    }

    setExtendedInfo(info) {
        this._extendedInfo = info;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            url: this.url,
            hostname: this.hostname,
            color: this.color,
            favicon: this.favicon,
            isDomain: this.isDomain,
            priority: this.priority,
            extendedInfo: this.extendedInfo
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = SiteTile;

},{"../../common/utils/url-utils":141,"./base-tile":93,"./tile-type":114}],112:[function(require,module,exports){
"use strict";

function ThemesData(data) {
    this._themes = data.themes || [ ];
    this._authors = data.authors || [ ];
    this._settings = data.settings || { };
    this._categories = data.categories || { };
    this._onboardingThemes = data.onboardingThemes || [];
}

ThemesData.prototype = {
    get data() {
        return {
            themes: this._themes,
            authors: this._authors,
            settings: this._settings,
            categories: this._categories,
            onboardingThemes: this._onboardingThemes
        };
    },
    addUserThemes: function() {
        this._themes = (this._settings.userThemes || [ ]).concat(this._themes);
        return this;
    },
    setDefaultThemeIfNeeded: function() {
        if (this._settings === undefined || this._settings.activeId === undefined) { //checks if user already saved some themes settings
            var defaultTheme = ThemesData.findDefaultTheme(this._themes || []) || {};

            this._settings = {
                activeId: defaultTheme.id
            };
        }

        return this;
    },
    setRandomThemeIfNeeded: function() {
        if (this._settings.random) {
            this._settings.activeId = ThemesData.getRandomTheme(this._themes).id;
        }

        return this;
    }
};

ThemesData.findDefaultTheme = function(themes) {
    return themes.find(function (theme) {
        return theme.default === true;
    });
};

ThemesData.getRandomTheme = function(themes) {
    var availableThemes = themes.filter(function(theme) {
        return !theme.hidden;
    });

    return availableThemes[Math.floor(Math.random() * availableThemes.length)];
};

ThemesData.findActiveTheme = function(themesData) {
    if (themesData.settings && themesData.settings.activeId !== undefined && themesData.themes) {
        return themesData.themes.find(function (theme) {
            return theme.id === themesData.settings.activeId;
        });
    }
};

module.exports = ThemesData;
},{}],113:[function(require,module,exports){
"use strict";

module.exports = {
    MAX_BOARDS_COUNT: 20,
    MAX_TILES_COUNT: 12,
    ABSOLUTELY_MAX_TILES_COUNT: 24
};
},{}],114:[function(require,module,exports){
"use strict";

module.exports = {
    CONTENT: 'content',
    SITE: 'site',
    CHAT: 'chat',
    PROMO: 'promo',
    EMAIL: 'email',
    MUSIC: 'music',
    WEATHER: 'weather',
    CURRENCY: 'currency',
    HORO: 'horo',
    TRAFFIC: 'traffic',
    SHOWCASE: 'showcase',
    MEDIA: 'media',
    MYWIDGET: 'mywidget',
    OK_GIFTS: 'ok_gifts',
    OK_STREAMS: 'ok_streams',
    OK_GAMES: 'ok_games',
    OK_NOTIFICATIONS: 'ok_notifications',
    OK_MESSAGES: 'ok_messages',
    OK_MARKS: 'ok_marks',
    OK_GUESTS: 'ok_guests',
    BLANK: 'blank',
    DEFAULT: 'default'
};
},{}],115:[function(require,module,exports){
"use strict";

const BaseTile = require('./base-tile');
const TileType = require('./tile-type');

class WeatherTile extends BaseTile {
    constructor(source) {
        super(source);

        this._type = TileType.WEATHER;
        this._url = 'http://pogoda.mail.ru';
        this._title = source.title || '';
        this._defaultImage = source.defaultImage || '/img/no-int-big-white.png';
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get defaultImage() {
        return this._defaultImage;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title,
            url: this.url,
            defaultImage: this.defaultImage
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = WeatherTile;

},{"./base-tile":93,"./tile-type":114}],116:[function(require,module,exports){
"use strict";

const specificValues = require('./../constants/specific-values');
const inlineOkService = require('./../../background/lib/inline-ok-service');

const additionalOptions = {
    fr: specificValues.FR_VALUE,
    comp: 'pult',
    product_type: 'ff_pult',
    kind: 'ff_pult',
    add_comp_hp: specificValues.ADD_COMP_HP,
    add_comp_dse: specificValues.ADD_COMP_DSE,
    ok_logged_in: 0
};

const additionalConfig = {
    localStorage: {
        key: 'ru.mail.pult.ext_info'
    },
    shortTermCookie: {
        url: 'https://inline.go.mail.ru',
        name: 'go_install_data_vbm'
    },
    longTermCookie: {
        url: 'https://inline.go.mail.ru',
        name: 'go_req_data_vbm'
    },
    rbTargeting: {
        url: specificValues.RB_PIXEL_URL
    },
    oneLink: specificValues.hasOwnProperty('ONE_LINK') ? specificValues.ONE_LINK : false,
    bookmarks: true,
};

let instance, moduleCreatorPromise;

function createDistributionModuleFactoryPromise(additionalOptions, config, overrideSettings) {
    return new Promise((resolve) => {
        window.distributionModuleFactory(additionalOptions, config, overrideSettings)
            .then(moduleInstance => {
                resolve(moduleInstance);
            });
    })
}

function getInstance(data) {
    if (instance) {
        return Promise.resolve(instance);
    }
    return inlineOkService.hasOkPreset().then((hasOkPreset) => {
        const options = Object.assign({}, additionalOptions, data ? data.info : {})
        const settings = data ? data.settings : {};
        const config = hasOkPreset ? Object.assign({}, additionalConfig, {
                rbTargeting: {
                    urls: [
                        specificValues.OK_PIXEL_URL,
                        specificValues.RB_PIXEL_URL
                    ]
                }
            }) : additionalConfig;

        if (!moduleCreatorPromise) {
            moduleCreatorPromise = createDistributionModuleFactoryPromise(options, config, settings).then((moduleInstance) => {
                instance = moduleInstance;
                return instance;
            });
        }

        return moduleCreatorPromise;
    });
}

module.exports = {
    initialize: (data) => {
        return getInstance(data).then(module => module.initialize());
    },
    getExtensionData: () => {
        return getInstance().then(module => module.getExtensionData());
    },
    addParameters: (parameters) => getInstance().then(module => module.addParameters(parameters)),
    removeParameters: (keys) => getInstance().then(module => module.removeParameters(keys))
};
},{"./../../background/lib/inline-ok-service":26,"./../constants/specific-values":85}],117:[function(require,module,exports){
var urlUtils = require('../utils/url-utils');

function fetchJson(url, options) {
    return fetch(url, options)
        .then(function(response) {
            if (!response.ok) {
                return Promise.reject(response.status);
            }

            return response.json();
        });
}

function get(url, options) {
    options = options || { };
    return fetchJson(url, options);
}

function getWithParams(url, params, options) {
    var fullUrl = url + '?' + urlUtils.paramsToString(params);
    return fetchJson(fullUrl, options);
}

module.exports = {
    get: get,
    getWithParams: getWithParams
};
},{"../utils/url-utils":141}],118:[function(require,module,exports){
module.exports = function(key) {
    return chrome.i18n.getMessage(key);
};
},{}],119:[function(require,module,exports){
"use strict";

var urlUtils = require('../utils/url-utils');
var socialNetworks = require('../constants/social-networks');

var vkRegex = /^(www\.)?(new\.)?(vkontakte\.|vk\.)/;
var mmRegex = /^(www\.)?(my\.mail\.)/;
var okRegex = /^(www\.)?(odnoklassniki\.|ok\.)/;
var twRegex = /^(www\.)?(twitter\.)/;

module.exports = {
    getSocialInfoForUrl: function(url) {
        var hostname = urlUtils.getHostname(url) || '';
        var pathname = urlUtils.getPathname(url) || '';

        if (vkRegex.test(hostname) && pathname.length > 1) {
            var vkScreenName = pathname.substring(1);

            return {
                network: socialNetworks.VK,
                screenName: vkScreenName
            };
        }

        if (mmRegex.test(hostname) && pathname.length > 1) {
            var mmScreenName = pathname;

            return {
                network: socialNetworks.MM,
                screenName: mmScreenName
            };
        }

        if (okRegex.test(hostname) /*&& pathname.length > 1*/) {

            return {
                network: socialNetworks.OK,
                screenName: url
            };
        }


        return undefined;
    }
};

},{"../constants/social-networks":83,"../utils/url-utils":141}],120:[function(require,module,exports){
"use strict";

const chrome = require('../factory/chrome-factory')();
const specificValues = require('./../constants/specific-values');
const distributionService = require('./../services/distribution-service');

// all functions should be async
module.exports = Object.assign({}, specificValues, {

    getRfr() {
        return new Promise(resolve => {
            //if (chrome.amigo) {
            //    return chrome.amigo.GetRfr(resolve);
            //}

            return distributionService.getExtensionData().then(data => {
                resolve(data.gp);
            });

            resolve(this.RFR_VALUE || null);
        });
    },
    getFr() {
        return new Promise(resolve => {
             return distributionService.getExtensionData().then(data => {
                resolve(data.fr);
             });

            resolve(this.FR_VALUE);
        });
    },
    getAll() {
        const result = { };
        console.log('GET ALL 0');

        Object.keys(this).forEach(key => {
            const value = this[key];

            if (typeof value !== 'function') {
                result[key] = value;
            }
        });


        console.log('GET ALL 1', result);

        return Promise.all([
            this.getFr(),
            this.getRfr()
        ]).then(data => {
            console.log('GET ALL 2', data);
            result.FR_VALUE = data[0];
            result.RFR_VALUE = data[1];

            return result;
        });
    }
});
},{"../factory/chrome-factory":88,"./../constants/specific-values":85,"./../services/distribution-service":116}],121:[function(require,module,exports){
"use strict";

const imageUtils = require('./../utils/image-utils');
const fileSystem = require('./../utils/file-system');

const themesConstants = require('./../constants/themes');

const outputOptions = {
    format: 'blob',
    type: 'image/jpeg',
    quality: 0.9
};

function fileToImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = loadEvent => {
            const img = new Image();
            img.src = loadEvent.target.result;

            img.onload = () => {
                resolve(img);
            };
            img.onerror = reject;
        };

        reader.readAsDataURL(file);
    });
}

function convertToImage(input) {
    if (input instanceof File || input instanceof Blob) {
        return fileToImage(input);
    } else if (input instanceof Image) {
        return Promise.resolve(input);
    }

    return imageUtils.loadImg(input);
}

function convertToFile(input) {
    if (input instanceof File || input instanceof Blob) {
        return Promise.resolve(input);
    } else if (input instanceof Image) {
        return imageUtils.convertToFile(input, outputOptions);
    }

    return imageUtils.loadImg(input).then(img => imageUtils.convertToFile(img, outputOptions));
}

function createFullImage(imgObj, name) {
    return convertToImage(imgObj).then(image => {
        const imageWidth = image.width;
        const imageRatio = image.width / image.height;
        const ratioDiff = Math.abs(imageRatio - themesConstants.COMMON_RATIO);

        if (imageWidth < themesConstants.MAX_FULL_IMAGE_WIDTH && ratioDiff < themesConstants.MAX_ACCEPTABLE_RATIO_DIFF) {
            return convertToFile(imgObj);
        }

        return imageUtils.fit(image, themesConstants.MAX_FULL_IMAGE_WIDTH, themesConstants.MAX_FULL_IMAGE_HEIGHT, outputOptions);
    }).then(file => {
        return fileSystem.saveFile(file, name).then(() => {
            return name;
        });
    });
}

function createPreviewImage(imgObj, name) {
    return convertToImage(imgObj).then(image => {
        return imageUtils.fit(image, themesConstants.MAX_PREVIEW_WIDTH, themesConstants.MAX_PREVIEW_HEIGHT, outputOptions);
    }).then(file => {
        const previewName = name + 'preview';

        return fileSystem.saveFile(file, previewName).then(() => {
            return previewName;
        });
    });
}


module.exports = {
    createFullImage,
    createPreviewImage
};
},{"./../constants/themes":86,"./../utils/file-system":132,"./../utils/image-utils":134}],122:[function(require,module,exports){
"use strict";

const SpecialTile = require('./special-tile');

class IframeTile extends SpecialTile {
    constructor(source) {
        super(source);
        this._url = source.url || '';
    }

    get url() {
        return this._url;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            url: this.url
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = IframeTile;
},{"./special-tile":126}],123:[function(require,module,exports){
"use strict";

const SpecialTile = require('./special-tile');

class NewYearTile extends SpecialTile {
    constructor(source) {
        super(source);
    }
}

module.exports = NewYearTile;
},{"./special-tile":126}],124:[function(require,module,exports){
"use strict";

var NewYearTile = require('./ny-tile');
var IframeTile = require('./iframe-tile');
var TileType = require('./special-tile-type');

module.exports = {
    create: function(source) {
        switch (source.type) {
            case TileType.NEW_YEAR:
                return new NewYearTile(source);
            case TileType.IFRAME:
                return new IframeTile(source);
            default:
                return undefined;
        }
    }
};
},{"./iframe-tile":122,"./ny-tile":123,"./special-tile-type":125}],125:[function(require,module,exports){
"use strict";

module.exports = {
    DEFAULT: 'special',
    NEW_YEAR: 'new-year',
    IFRAME: 'iframe'
};
},{}],126:[function(require,module,exports){
"use strict";

const TileType = require('./special-tile-type');
const BaseTile = require('./../models/base-tile');

class SpecialTile extends BaseTile {
    constructor(source) {
        super(source);
        this._type = source.type || TileType.DEFAULT;
        this._title = source.title;
    }

    get displayType() {
        return TileType.DEFAULT;
    }

    get title() {
        return this.__title;
    }

    json() {
        const baseJson = super.json();
        const specificJson = {
            title: this.title
        };

        return Object.assign({}, baseJson, specificJson);
    }
}

module.exports = SpecialTile;
},{"./../models/base-tile":93,"./special-tile-type":125}],127:[function(require,module,exports){
"use strict";

var urlUtils = require('../../common/utils/url-utils');

function createSortBy(key) {
    return;
}

function ArrayBuilder() {
    this.__source = [ ];
    this.__conditionStarted = false;
    this.__conditionValue = false;
}

ArrayBuilder.prototype = {
    get length() {
        return this.__source.length;
    },
    decorateWithCondition: function(callback) {
        var self = this;

        return function() {
            if ((self.__conditionStarted && self.__conditionValue) || !self.__conditionStarted) {
                callback.apply(self);
            }

            return self;
        };
    },
    clear: function() {
        return this.decorateWithCondition(function() {
            this.__source = [ ];
        }).apply(this);
    },
    setSource: function(items) {
        return this.decorateWithCondition(function() {
            this.__source = items.slice(0);
        }).apply(this);
    },
    append: function(list) {
        return this.decorateWithCondition(function() {
            this.__source = this.__source.concat(list);
        }).apply(this);
    },
    prepend: function(list) {
        return this.decorateWithCondition(function() {
            this.__source = list.concat(this.__source);
        }).apply(this);
    },
    sortBy: function(key) {
        return this.decorateWithCondition(function() {
            this.__source = this.__source.sort(function(a, b) {
                if (a[key] < b[key]) {
                    if (a.hasOwnProperty('position') && a.position > -1) {
                        return -1;
                    }

                    return 1;
                }

                if (a[key] > b[key]) {
                    return -1;
                }

                return 0;
            });
        }).apply(this);
    },
    selectFirst: function(count) {
        return this.decorateWithCondition(function() {
            this.__source = this.__source.splice(0, count);
        }).apply(this);
    },
    filter: function(callback) {
        return this.decorateWithCondition(function() {
            this.__source = this.__source.filter(callback);
        }).apply(this);
    },
    if: function(condition) {
        if (this.__conditionStarted) {
            throw new Error('Another if() routine is already in progress');
        }

        this.__conditionStarted = true;
        this.__conditionValue = condition;

        return this;
    },
    endIf: function() {
        if (!this.__conditionStarted) {
            throw new Error('You need to initiate if() routine first');
        }

        this.__conditionStarted = false;

        return this;
    },
    build: function() {
        return this.__source;
    }
};

module.exports = ArrayBuilder;
},{"../../common/utils/url-utils":141}],128:[function(require,module,exports){
"use strict";

var asyncForEach = require('./async-foreach');

module.exports = {
    asyncForEach: asyncForEach,

    shuffle: function(arr) {
        for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    },
    getPrevIndex: function(arrLength, currentIndex) {
        if (arrLength === 1) {
            return currentIndex;
        }
        if (currentIndex !== 0) {
            return currentIndex-1;
        } else {
            return arrLength - 1;
        }
    },
    getNextIndex: function(arrLength, currentIndex) {
        if (arrLength === 1) {
            return 0;
        }

        if (currentIndex > -1 && currentIndex < arrLength - 1) {
            return currentIndex + 1;
        }

        return 0;
    },
    uniq: function(source, identityFn) {
        const seen = new Set();
        return source.filter(item => {
            const key = typeof identityFn === 'function' ? identityFn(item) : item;
            return !seen.has(key) && seen.add(key);
        });
    },
    getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    getMax(numArr) {
        return Math.max.apply(null, numArr);
    }
};
},{"./async-foreach":129}],129:[function(require,module,exports){
"use strict";

module.exports = function(source, fn, done) {
    var count = source.length;
    var index = -1;

    var advance = function advance() {
        index++;

        if (index < count) {
            setTimeout(process, 0);
        } else {
            if (done) {
                setTimeout(done, 0);
            }
        }
    };

    var process = function process() {
        var item = source[index];

        if (!fn) {
            advance();
        } else {
            fn(item, index, function next() {
                advance();
            });
        }
    };

    advance();
};
},{}],130:[function(require,module,exports){
"use strict";

var BLOCKSIZE = 5;
var PALETTESIZE = 10;

function makeRGB(name){
    return ['rgba(', name, ')'].join('');
}

function convertAlpha(value) {
    return value / 255;
}

function mapPalette(palette){
    return palette.map(function(c){ return makeRGB(c.name); });
}

function RGBA(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

RGBA.prototype = {
    toString: function() {
        return [ this.r, this.g, this.b, this.a ].join(',');
    },
    toRgbaString: function() {
        return 'rgba(' + this.toString() + ')';
    },
    toPlainObject: function() {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        };
    }
};

module.exports = function(data, opts) {
    opts = opts || {};
    var exclude = opts.exclude || [ ],// for example, to exlude white and black:  [ '0,0,0', '255,255,255' ],
        ignoreTransparentPixels = opts.ignoreTransparentPixels === true,
        paletteSize = opts.paletteSize || PALETTESIZE;

    return new Promise(function(resolve) {
        var length        = /*( img.width * img.height ) ||*/ data.length,
            colorCounts   = {},
            rgbaString     = '',
            rgba          = {},
            colors        = {
                dominant: { name: '', count: 0 },
                palette:  Array.apply(null, new Array(paletteSize)).map(Boolean).map(function(a){ return { name: '0,0,0,0', count: 0 }; })
            };

        // Loop over all pixels, in BLOCKSIZE iterations.
        var i = 0;
        var createSomeCallback = function(color, count) {
            return function(c) {
                if (count > c.count ) {
                    c.color = color;
                    c.count = count;

                    return true;
                }

                return false;
            };
        };

        var excluded;

        while (i < length) {
            rgba = new RGBA(data[i], data[i + 1], data[i + 2], convertAlpha(data[i + 3]));
            rgbaString = rgba.toString();

            // Keep track of counts.
            if (rgbaString in colorCounts) {
                colorCounts[rgbaString] = colorCounts[rgbaString] + 1;
            } else {
                colorCounts[rgbaString] = 1;
            }

            // Find dominant and palette, ignoring those colors in the exclude list.
            excluded = (exclude.indexOf(makeRGB(rgbaString)) > -1) || (ignoreTransparentPixels && rgba.a < 0.05);

            if (!excluded) {
                var colorCount = colorCounts[rgbaString];

                if (colorCount > colors.dominant.count){
                    colors.dominant.color = rgba;
                    colors.dominant.count = colorCount;
                } else {
                    colors.palette.some(createSomeCallback(rgba, colorCount));
                }
            }

            // Increment!
            i += BLOCKSIZE * 4;
        }

        resolve(colors.dominant.color.toPlainObject());
    });
};
},{}],131:[function(require,module,exports){
"use strict";

function extend(Parent, Child) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

module.exports = extend;
},{}],132:[function(require,module,exports){
"use strict";

var Dexie = require('dexie');

function IndexDbAdapter() {
    this._db = new Dexie('ntp-files');
    this._init();
}

IndexDbAdapter.prototype = {
    _init() {
        this._db
          .version(1)
          .stores({storage: 'name,data'});
        this._db.open();
    },
    saveFile(data, name) {
        return this._db.storage.put({name: name, data: data});
    },
    getUrl(name) {
        return this._db.storage.get(name).then(response => {
            if (response != null) {
                return window.URL.createObjectURL(response.data);
            }
            return Promise.resolve();
        });
    }
};

/*------chrome-filesystem--------*/

function writeFile(localPath, data) {
    if (!fileSystem) {
        return Promise.resolve();
    }
    return new Promise(function(resolve, reject) {
        if (fileSystem === undefined) {
            return reject();
        }

        fileSystem.root.getFile(localPath, {create: true}, function (fileEntry) {

            fileEntry.createWriter(function (fileWriter) {

                fileWriter.onwriteend = function (e) {
                    resolve();
                };

                fileWriter.onerror = function (e) {
                    reject();
                };

                fileWriter.write(data, {type: data.type});
            }, reject);

        }, reject);
    });
}

function readFile(localPath) {
    if (!fileSystem) {
        return Promise.resolve();
    }
    return new Promise(function(resolve, reject) {
        if (fileSystem === undefined) {
            return reject();
        }

        fileSystem.root.getFile(localPath, {create: false}, function (fileEntry) {
            resolve(fileEntry.toURL());
        }, reject);
    }).then(function(data) {
        return data;
    }, function() {
        return undefined;
    });
}

var api;
var fileSystem;

var chromeFsApi = {
    saveFile(data, localPath) {
        return writeFile(localPath, data);
    },
    getUrl(localPath) {
        var fsRe = /^filesystem:/i;

        if (fsRe.test(localPath)) {
            return Promise.resolve(localPath);
        }

        return readFile(localPath);
    }
};

window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

if (window.requestFileSystem) {
    window.requestFileSystem(window.PERSISTENT, 50 * 1024 * 1024 /*50MB*/, function (fs) {
        fileSystem = fs;
    }, function () {
        fileSystem = undefined;
    });

    api = chromeFsApi;
} else {
    api = new IndexDbAdapter();
}

module.exports = api;
},{"dexie":148}],133:[function(require,module,exports){
"use strict";

module.exports = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};
},{}],134:[function(require,module,exports){
"use strict";

const dominantColor = require('./dominant-color');

function load(src) {
    return new Promise(function(resolve, reject) {
        const img = new Image();

        if (!src.startsWith('data:')) {
            img.crossOrigin = 'Anonymous';
        }

        img.onload = () => {
            resolve(img);
        };

        img.onerror = err => {
            reject(err);
        };

        img.src = src;
    });
}

function getContext(img) {
    const context = document.createElement('canvas').getContext('2d');
    context.drawImage(img, 0, 0);

    return context;
}

function getImageData(img) {
    return getContext(img).getImageData(0, 0, img.width, img.height);
}

function extractDominantColor(src) {
    return load(src).then(img => {
        return dominantColor(getImageData(img).data, { ignoreTransparentPixels: true });
    });
}

function extractTopLeftPixelColor(src) {
    return load(src).then(img => {
        const data = getImageData(img).data;

        return { r: data[0], g: data[1], b: data[2], a: data[3] / 255 };
    });
}

function getImageDimensions(src) {
    return load(src).then(img => {
        return {
            width: img.width,
            height: img.height
        };
    });
}

function isSquare(src) {
    return getImageDimensions(src).then(dimensions => dimensions.width === dimensions.height);
}

function fit(img, maxWidth, maxHeight, outputOptions) {
    const imgPromise = img instanceof Image ? Promise.resolve(img) : load(img);

    return imgPromise.then(img => {
        const ratio = maxWidth / maxHeight;
        const imgWidth = img.width;
        const imgHeight = img.height;
        const currentRatio = imgWidth / imgHeight;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        let options = {
            sWidth: null, // image crop width
            sHeight: null, // image crop height
            sX: null, // x coord of crop left corner
            sY: null, // y coord of crop left corner
            dWidth: null, // canvas width
            dHeight: null // canvas height
        };

        // calculate crop and resize values
        if (currentRatio > ratio) {
            if (imgHeight > maxHeight) {
                options.dWidth = maxWidth;
                options.dHeight = maxHeight;
            } else {
                options.dWidth = imgHeight * ratio;
                options.dHeight = imgHeight;
            }

            options.sX = (imgWidth - imgHeight * ratio) / 2;
            options.sY = 0;
            options.sWidth = imgHeight * ratio;
            options.sHeight = imgHeight;

        } else {
            if (imgWidth > maxWidth) {
                options.dWidth = maxWidth;
                options.dHeight = maxHeight;
            } else {
                options.dWidth = imgWidth;
                options.dHeight = imgWidth / ratio;
            }

            options.sX = 0;
            options.sY = (imgHeight - imgWidth / ratio) / 2;
            options.sWidth = imgWidth;
            options.sHeight = imgWidth / ratio;
        }

        // round all values
        Object.keys(options).forEach(key => {
            options[key] = Math.round(options[key]);
        });

        canvas.width = options.dWidth;
        canvas.height = options.dHeight;

        context.drawImage(img, options.sX, options.sY, options.sWidth, options.sHeight,
            0, 0, options.dWidth, options.dHeight);

        outputOptions = outputOptions || { };
        const outputFormat = outputOptions.format;
        const mimeType = outputOptions.type;
        const imageQuality = outputOptions.quality;

        return new Promise(resolve => {
            if (outputFormat === 'blob') {
                canvas.toBlob(resolve, mimeType, imageQuality);
            } else {
                resolve(canvas.toDataURL(mimeType, imageQuality));
            }
        });
    });
}

function convertToDataUrl(src) {
    return load(src).then(img => {
        const canvas = document.createElement('canvas');

        canvas.width = img.width;
        canvas.height = img.height;

        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        return canvas.toDataURL('image/png');
    });
}

function convertToFile(img, outputOptions) {
    return new Promise(resolve => {
        const canvas = document.createElement('canvas');

        canvas.width = img.width;
        canvas.height = img.height;

        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        canvas.toBlob(resolve, outputOptions.type, outputOptions.quality);
    });
}

module.exports = {
    loadImg: load,
    fit,
    convertToDataUrl,
    convertToFile,
    extractDominantColor,
    extractTopLeftPixelColor,
    getImageDimensions,
    isSquare
};
},{"./dominant-color":130}],135:[function(require,module,exports){
function md5(str) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return (x ^ y ^ z);
    }

    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    str = Utf8Encode(str);
    var x = ConvertToWordArray(str);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
}

module.exports = md5;
},{}],136:[function(require,module,exports){
module.exports = function mix(SuperClass) {
    return {
        with: function() {
            return Array.prototype.slice.call(arguments)
                .reduce((c, mixin) => mixin(c), SuperClass);
        }
    };
};

},{}],137:[function(require,module,exports){
"use strict";

module.exports = {
    getPropertyByPath: function(obj, propPath) {
        if (obj === undefined) {
            return null;
        }

        var pathArr = propPath.split('.'),
            prop = obj;

        var noProperty = pathArr.some(function(node) {
            prop = prop[node];
            return prop === undefined;
        });

        return noProperty ? null : prop ;
    },
    findNestedObjectByPropertyName: function(obj, propName) {
        var nestedObj;

        if (!this.isObject(obj)){
            return;
        }

        if (obj.hasOwnProperty(propName)) {
            var target = obj[propName];
            return this.isObject(target) ? target : undefined;
        }

        Object.keys(obj).some(function(key) {
            nestedObj = this.findNestedObjectByPropertyName(obj[key], propName);
            return nestedObj !== undefined;
        }.bind(this));

        return nestedObj;
    },
    isObject: function(obj) {
        return obj === Object(obj) && !Array.isArray(obj);
    },
    isEmpty: function(obj) {
        return Object.getOwnPropertyNames(obj).length === 0;
    }
};

},{}],138:[function(require,module,exports){
"use strict";

module.exports = {
    array: function() {
        if (!Array.prototype.find) {
            Array.prototype.find = function(predicate) {
                if (!this) {
                    throw new TypeError('Array.prototype.find called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;

                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
                return undefined;
            };
        }

        if (!Array.prototype.findIndex) {
            Array.prototype.findIndex = function(predicate) {
                if (!this) {
                    throw new TypeError('Array.prototype.find called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;

                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return i;
                    }
                }
                return -1;
            };
        }

        if (!Array.prototype.includes) {
            Array.prototype.includes = function(searchElement/*, fromIndex*/) {
                var O = Object(this);
                var len = parseInt(O.length) || 0;
                if (len === 0) {
                    return false;
                }
                var n = parseInt(arguments[1]) || 0;
                var k;
                if (n >= 0) {
                    k = n;
                } else {
                    k = len + n;
                    if (k < 0) {
                        k = 0;
                    }
                }
                while (k < len) {
                    var currentElement = O[k];
                    if (searchElement === currentElement ||
                        (searchElement !== searchElement && currentElement !== currentElement)
                    ) {
                        return true;
                    }
                    k++;
                }
                return false;
            };
        }

        return this;
    },

    string: function() {
        if (!String.prototype.includes) {
            String.prototype.includes = function() {
                return String.prototype.indexOf.apply(this, arguments) !== -1;
            };
        }

        return this;
    },

    object: function() {
        if (!Object.assign) {
            Object.defineProperty(Object, 'assign', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function(target, firstSource) {
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert first argument to object');
                    }

                    var to = Object(target);
                    for (var i = 1; i < arguments.length; i++) {
                        var nextSource = arguments[i];
                        if (nextSource === undefined || nextSource === null) {
                            continue;
                        }

                        var keysArray = Object.keys(Object(nextSource));
                        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                            var nextKey = keysArray[nextIndex];
                            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                            if (desc !== undefined && desc.enumerable) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                    return to;
                }
            });
        }

        if (!Object.values) {
            Object.defineProperty(Object, 'values', {
                enumerable: false,
                configurable: true,
                writable: true,
                value(target) {
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert first argument to object');
                    }

                    return Object.keys(target).map(key => target[key]);
                }
            });
        }

        if (!Object.entries) {
            Object.defineProperty(Object, 'entries', {
                enumerable: false,
                configurable: true,
                writable: true,
                value(target) {
                    if (target === undefined || target === null) {
                        throw new TypeError('Cannot convert first argument to object');
                    }

                    return Object.keys(target).map(key => [key, target[key]]);
                }
            });
        }

        return this;
    },

    canvas: function() {
        if (!HTMLCanvasElement.prototype.toBlob) {
            Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                value: function (callback, type, quality) {

                    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
                        len = binStr.length,
                        arr = new Uint8Array(len);

                    for (var i=0; i<len; i++ ) {
                        arr[i] = binStr.charCodeAt(i);
                    }

                    callback( new Blob( [arr], {type: type || 'image/png'} ) );
                }
            });
        }
    }
};
},{}],139:[function(require,module,exports){
"use strict";

var extend = require('./extend');
var urlUtils = require('./url-utils');

var ArrayBuilder = require('./array-builder');

function SiteArrayBuilder() { }

extend(ArrayBuilder, SiteArrayBuilder);

SiteArrayBuilder.prototype.extractUniqueDomains = function() {
    return this.decorateWithCondition(function() {
        var cache = {}, results = [];

        this.__source.forEach(function(item) {
            var baseUrl = urlUtils.getBaseUrl(item.url);
            var hostname = urlUtils.getHostname(item.url);

            if (!baseUrl || !hostname) {
                return;
            }

            if (!cache.hasOwnProperty(hostname)) {
                cache[hostname] = true;
                item.url = baseUrl;
                results.push(item);
            }
        });

        this.__source = results;
    }).apply(this);
};

SiteArrayBuilder.prototype.addSites = function(sites) {
    var source = this.__source;

    return this.decorateWithCondition(function() {
        sites.forEach(function (item) {
            if (item.hasOwnProperty('position') && item.position > -1) {
                return source.splice(item.position, 0, item);
            }

            source.push(item);
        });
    }).apply(this);
};

SiteArrayBuilder.prototype.addCustomSitesFrom = function(sites) {
    var source = this.__source;

    return this.decorateWithCondition(function() {
        sites.filter(function (items) {
            return (items.hasOwnProperty('custom') && items.custom === true) || (items.hasOwnProperty("pinned") && items.pinned === true);
        }).forEach(function (site) {
            if (site.hasOwnProperty('position') && site.position > -1) {
                source.splice(site.position, 0, site);
            } else {
                source.push(site);
            }
        });
    }).apply(this);
};

SiteArrayBuilder.prototype.filterHostnames = function(list) {
    return this.filter(function(site) {
        var index = list.findIndex(function(hostname) {
            return hostname === urlUtils.getHostname(site.url);
        });

        return index === -1;
    });
};

SiteArrayBuilder.prototype.filterSiteList = function(list) {
    return this.filter(function(site) {
        var siteHostname = urlUtils.getHostname(site.url);
        var siteIsDomain = urlUtils.isDomain(site.url);

        var index = list.findIndex(function(item) {
            var itemHostname = urlUtils.getHostname(item.url);
            var itemIsDomain = urlUtils.isDomain(item.url);

            return (itemIsDomain && siteIsDomain) && (itemHostname === siteHostname);
        });

        return index === -1;
    });
};

module.exports = SiteArrayBuilder;
},{"./array-builder":127,"./extend":131,"./url-utils":141}],140:[function(require,module,exports){
"use strict";

module.exports = {
    score: function (str1, str2, fuzziness) {
        if (str1 === str2) {
            return 1;
        }

        if (str2 === '') {
            return 0;
        }

        var runningScore = 0,
            charScore,
            finalScore,
            string = str1,
            lString = string.toLowerCase(),
            strLength = string.length,
            lWord = str2.toLowerCase(),
            wordLength = str2.length,
            idxOf,
            i,
            startAt = 0,
            fuzzies = 1,
            fuzzyFactor;

        if (fuzziness) {
            fuzzyFactor = 1 - fuzziness;
        }

        // Walk through word and add up scores.
        // Code duplication occurs to prevent checking fuzziness inside for loop
        if (fuzziness) {
            for (i = 0; i < wordLength; ++i) {

                // Find next first case-insensitive match of a character.
                idxOf = lString.indexOf(lWord[i], startAt);

                if (-1 === idxOf) {
                    fuzzies += fuzzyFactor;
                    continue;
                } else if (startAt === idxOf) {
                    // Consecutive letter & start-of-string Bonus
                    charScore = 0.7;
                } else {
                    charScore = 0.1;

                    // Acronym Bonus
                    // Weighing Logic: Typing the first character of an acronym is as if you
                    // preceded it with two perfect character matches.
                    if (string[idxOf - 1] === ' ') charScore += 0.8;
                }

                // Same case bonus.
                if (string[idxOf] === str2[i]) charScore += 0.1;

                // Update scores and startAt position for next round of indexOf
                runningScore += charScore;
                startAt = idxOf + 1;
            }
        } else {
            for (i = 0; i < wordLength; ++i) {
                idxOf = lString.indexOf(lWord[i], startAt);
                if (-1 === idxOf) {
                    return 0;
                } else if (startAt === idxOf) {
                    charScore = 0.7;
                } else {
                    charScore = 0.1;
                    if (string[idxOf - 1] === ' ') charScore += 0.8;
                }
                if (string[idxOf] === str2[i]) charScore += 0.1;
                runningScore += charScore;
                startAt = idxOf + 1;
            }
        }

        finalScore = 0.5 * (runningScore / strLength + runningScore / wordLength) / fuzzies;

        if ((lWord[0] === lString[0]) && (finalScore < 0.85)) {
            finalScore += 0.15;
        }

        return finalScore;
    }
};
},{}],141:[function(require,module,exports){
"use strict";

var punycode = require('punycode');
var normalizeUrl = require('normalize-url');

var DEFAULT_PROTOCOL = 'http:';

function decode(url) {
    return punycode.toUnicode(url);
}

function createCorrectUrlObject(input, hostname) {
    var correctUrl;

    if (hostname === undefined) {
        hostname = '';
    }

    if (/^(https?|ftp|chrome(-extension)?):\/\/\S+/i.test(input)) { // correct url
        correctUrl = input;
    } else if (/^\/[^\/]\S+/i.test(input)) { // relative url with leading '/'
        correctUrl = DEFAULT_PROTOCOL.concat('//').concat(hostname).concat(input);
    } else if (/^\/\/\S+/i.test(input)) { // no protocol but '//'
        correctUrl = DEFAULT_PROTOCOL.concat(input);
    } else if (/^(\S+\.\S{2,11}(\/\S+)?)/i.test(input)) { // no protocol and no '//'
        correctUrl = DEFAULT_PROTOCOL.concat('//').concat(input);
    } else { // relative url without leading '/'
        correctUrl = DEFAULT_PROTOCOL.concat('//').concat(hostname).concat('/').concat(input);
    }

    return new URL(correctUrl);
}

function decodeHostname(input, hostname) {
    return input.replace(hostname, decode(hostname));
}

function stripHttpHttps(url) {
    return url.replace(/^https?:/, '');
}

function paramsToString(params, separator, alphabetically) {
    separator = separator !== undefined ? separator : '&';

    var paramsKeys = Object.keys(params);

    if (alphabetically) {
        paramsKeys.sort();
    }

    return paramsKeys.reduce(function(prevResult, key) {
        return prevResult  + key + '=' + params[key] + separator;
    }, '').slice(0, -separator.length || undefined);
}

module.exports = {
    isValidUrl: function(input) {
        try {
            createCorrectUrlObject(input, '');
            return true;
        } catch(err) {
            return false;
        }

    },
    isValidUrlSimple: function(url) {
        try {
            new URL(url);
        } catch(e) {
            return false;
        }
        return true;
    },
    isDomain: function(input) {
        try {
            var url = createCorrectUrlObject(input, '');
            return url.pathname === '/';
        } catch(err) {
            return false;
        }
    },
    getBaseUrl: function(input) {
        try {
            var urlObject = createCorrectUrlObject(input, '');
            return decodeHostname(urlObject.origin, urlObject.hostname);
        } catch(err) {
            return null;
        }
    },
    getCleanUrl: function(input) {
        try {
            var urlObject = createCorrectUrlObject(input);
            return decodeHostname(urlObject.origin + urlObject.pathname, urlObject.hostname);
        } catch(err) {
            return null;
        }
    },
    getHostname: function(input) {
        try {
            var urlObject = createCorrectUrlObject(input, '');
            return decode(urlObject.hostname.replace(/^www[0-9]*\./i, ''));
        } catch(err) {
            return null;
        }
    },
    getPathname: function(input) {
        try {
            var urlObject = createCorrectUrlObject(input, '');
            if (urlObject.pathname === '/') return urlObject.pathname;
            return decode(urlObject.pathname.replace(/\/$/i, ''));
        } catch(err) {
            return null;
        }
    },
    createCorrectUrl: function(input, hostname/*, protocol*/) {
        var urlObject = createCorrectUrlObject(input, hostname);
        return decodeHostname(urlObject.href, urlObject.hostname);
    },
    normalize: function(url) {
        return normalizeUrl(url);
    },
    compare: function(url1, url2) {
        if (url1 === url2) {
            return true;
        }

        var result = false;

        try {
            result = normalizeUrl(stripHttpHttps(url1)) === normalizeUrl(stripHttpHttps(url2));
        } catch (err) { /* Ignore malformed URLs */}

        return result;
    },
    stripHttpHttps: stripHttpHttps,
    paramsToString: paramsToString,
    wrapRbLink: function(bannerId) {
        return function(url) {
            return 'http://r.mail.ru/clb'
                .concat(bannerId)
                .concat('/')
                .concat(url.replace(/^https?:\/\//gi, ''));
        }
    }
};
},{"normalize-url":158,"punycode":163}],142:[function(require,module,exports){
function encodeUtf8(string) {
    var res = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            res += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            res += String.fromCharCode((c >> 6) | 192);
            res += String.fromCharCode((c & 63) | 128);
        }
        else {
            res += String.fromCharCode((c >> 12) | 224);
            res += String.fromCharCode(((c >> 6) & 63) | 128);
            res += String.fromCharCode((c & 63) | 128);
        }
    }
    return res;
}

function decodeUtf8(utftext) {
    var string = "";
    var i = 0;
    var c = 0, c2 = 0, c3 = 0;
    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}

module.exports = {
    encode: encodeUtf8,
    decode: decodeUtf8
};
},{}],143:[function(require,module,exports){

},{}],144:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],145:[function(require,module,exports){
(function (Buffer){
var extend = require('xtend')
var Querystring = require('querystring')
var Url = require('url')
var defaultRequest = require('./request')

var btoa = typeof Buffer === 'function' ? btoaBuffer : window.btoa

/**
 * Export `ClientOAuth2` class.
 */
module.exports = ClientOAuth2

/**
 * Default headers for executing OAuth 2.0 flows.
 */
var DEFAULT_HEADERS = {
  'Accept': 'application/json, application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded'
}

/**
 * Format error response types to regular strings for displaying to clients.
 *
 * Reference: http://tools.ietf.org/html/rfc6749#section-4.1.2.1
 */
var ERROR_RESPONSES = {
  'invalid_request': [
    'The request is missing a required parameter, includes an',
    'invalid parameter value, includes a parameter more than',
    'once, or is otherwise malformed.'
  ].join(' '),
  'invalid_client': [
    'Client authentication failed (e.g., unknown client, no',
    'client authentication included, or unsupported',
    'authentication method).'
  ].join(' '),
  'invalid_grant': [
    'The provided authorization grant (e.g., authorization',
    'code, resource owner credentials) or refresh token is',
    'invalid, expired, revoked, does not match the redirection',
    'URI used in the authorization request, or was issued to',
    'another client.'
  ].join(' '),
  'unauthorized_client': [
    'The client is not authorized to request an authorization',
    'code using this method.'
  ].join(' '),
  'unsupported_grant_type': [
    'The authorization grant type is not supported by the',
    'authorization server.'
  ].join(' '),
  'access_denied': [
    'The resource owner or authorization server denied the request.'
  ].join(' '),
  'unsupported_response_type': [
    'The authorization server does not support obtaining',
    'an authorization code using this method.'
  ].join(' '),
  'invalid_scope': [
    'The requested scope is invalid, unknown, or malformed.'
  ].join(' '),
  'server_error': [
    'The authorization server encountered an unexpected',
    'condition that prevented it from fulfilling the request.',
    '(This error code is needed because a 500 Internal Server',
    'Error HTTP status code cannot be returned to the client',
    'via an HTTP redirect.)'
  ].join(' '),
  'temporarily_unavailable': [
    'The authorization server is currently unable to handle',
    'the request due to a temporary overloading or maintenance',
    'of the server.'
  ].join(' ')
}

/**
 * Support base64 in node like how it works in the browser.
 *
 * @param  {String} string
 * @return {String}
 */
function btoaBuffer (string) {
  return new Buffer(string).toString('base64')
}

/**
 * Check if properties exist on an object and throw when they aren't.
 *
 * @throws {TypeError} If an expected property is missing.
 *
 * @param {Object} obj
 * @param {Array}  props
 */
function expects (obj, props) {
  for (var i = 0; i < props.length; i++) {
    var prop = props[i]

    if (obj[prop] == null) {
      throw new TypeError('Expected "' + prop + '" to exist')
    }
  }
}

/**
 * Pull an authentication error from the response data.
 *
 * @param  {Object} data
 * @return {String}
 */
function getAuthError (body) {
  var message = ERROR_RESPONSES[body.error] ||
    body.error_description ||
    body.error

  if (message) {
    var err = new Error(message)
    err.body = body
    err.code = 'EAUTH'
    return err
  }
}

/**
 * Attempt to parse response body as JSON, fall back to parsing as a query string.
 *
 * @param {String} body
 * @return {Object}
 */
function parseResponseBody (body) {
  try {
    return JSON.parse(body)
  } catch (e) {
    return Querystring.parse(body)
  }
}

/**
 * Sanitize the scopes option to be a string.
 *
 * @param  {Array}  scopes
 * @return {String}
 */
function sanitizeScope (scopes) {
  return Array.isArray(scopes) ? scopes.join(' ') : toString(scopes)
}

/**
 * Create a request uri based on an options object and token type.
 *
 * @param  {Object} options
 * @param  {String} tokenType
 * @return {String}
 */
function createUri (options, tokenType) {
  // Check the required parameters are set.
  expects(options, [
    'clientId',
    'redirectUri',
    'authorizationUri'
  ])

  return options.authorizationUri + '?' + Querystring.stringify(extend(
    options.query,
    {
      client_id: options.clientId,
      redirect_uri: options.redirectUri,
      scope: sanitizeScope(options.scopes),
      response_type: tokenType,
      state: options.state
    }
  ))
}

/**
 * Create basic auth header.
 *
 * @param  {String} username
 * @param  {String} password
 * @return {String}
 */
function auth (username, password) {
  return 'Basic ' + btoa(toString(username) + ':' + toString(password))
}

/**
 * Ensure a value is a string.
 *
 * @param  {String} str
 * @return {String}
 */
function toString (str) {
  return str == null ? '' : String(str)
}

/**
 * Merge request options from an options object.
 */
function requestOptions (requestOptions, options) {
  return extend(requestOptions, {
    body: extend(options.body, requestOptions.body),
    query: extend(options.query, requestOptions.query),
    headers: extend(options.headers, requestOptions.headers)
  })
}

/**
 * Construct an object that can handle the multiple OAuth 2.0 flows.
 *
 * @param {Object} options
 */
function ClientOAuth2 (options, request) {
  this.options = options
  this.request = request || defaultRequest

  this.code = new CodeFlow(this)
  this.token = new TokenFlow(this)
  this.owner = new OwnerFlow(this)
  this.credentials = new CredentialsFlow(this)
  this.jwt = new JwtBearerFlow(this)
}

/**
 * Alias the token constructor.
 *
 * @type {Function}
 */
ClientOAuth2.Token = ClientOAuth2Token

/**
 * Create a new token from existing data.
 *
 * @param  {String} access
 * @param  {String} [refresh]
 * @param  {String} [type]
 * @param  {Object} [data]
 * @return {Object}
 */
ClientOAuth2.prototype.createToken = function (access, refresh, type, data) {
  var options = extend(
    data,
    typeof access === 'string' ? { access_token: access } : access,
    typeof refresh === 'string' ? { refresh_token: refresh } : refresh,
    typeof type === 'string' ? { token_type: type } : type
  )

  return new ClientOAuth2.Token(this, options)
}

/**
 * Using the built-in request method, we'll automatically attempt to parse
 * the response.
 *
 * @param  {Object}  options
 * @return {Promise}
 */
ClientOAuth2.prototype._request = function (options) {
  var url = options.url
  var body = Querystring.stringify(options.body)
  var query = Querystring.stringify(options.query)

  if (query) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + query
  }

  return this.request(options.method, url, body, options.headers)
    .then(function (res) {
      var body = parseResponseBody(res.body)
      var authErr = getAuthError(body)

      if (authErr) {
        return Promise.reject(authErr)
      }

      if (res.status < 200 || res.status >= 399) {
        var statusErr = new Error('HTTP status ' + res.status)
        statusErr.status = res.status
        statusErr.body = res.body
        statusErr.code = 'ESTATUS'
        return Promise.reject(statusErr)
      }

      return body
    })
}

/**
 * General purpose client token generator.
 *
 * @param {Object} client
 * @param {Object} data
 */
function ClientOAuth2Token (client, data) {
  this.client = client
  this.data = data
  this.tokenType = data.token_type && data.token_type.toLowerCase()
  this.accessToken = data.access_token
  this.refreshToken = data.refresh_token

  this.expiresIn(Number(data.expires_in))
}

/**
 * Expire the token after some time.
 *
 * @param  {Number|Date} duration Seconds from now to expire, or a date to expire on.
 * @return {Date}
 */
ClientOAuth2Token.prototype.expiresIn = function (duration) {
  if (typeof duration === 'number') {
    this.expires = new Date()
    this.expires.setSeconds(this.expires.getSeconds() + duration)
  } else if (duration instanceof Date) {
    this.expires = new Date(duration.getTime())
  } else {
    throw new TypeError('Unknown duration: ' + duration)
  }

  return this.expires
}

/**
 * Sign a standardised request object with user authentication information.
 *
 * @param  {Object} requestObject
 * @return {Object}
 */
ClientOAuth2Token.prototype.sign = function (requestObject) {
  if (!this.accessToken) {
    throw new Error('Unable to sign without access token')
  }

  requestObject.headers = requestObject.headers || {}

  if (this.tokenType === 'bearer') {
    requestObject.headers.Authorization = 'Bearer ' + this.accessToken
  } else {
    var parts = requestObject.url.split('#')
    var token = 'access_token=' + this.accessToken
    var url = parts[0].replace(/[?&]access_token=[^&#]/, '')
    var fragment = parts[1] ? '#' + parts[1] : ''

    // Prepend the correct query string parameter to the url.
    requestObject.url = url + (url.indexOf('?') > -1 ? '&' : '?') + token + fragment

    // Attempt to avoid storing the url in proxies, since the access token
    // is exposed in the query parameters.
    requestObject.headers.Pragma = 'no-store'
    requestObject.headers['Cache-Control'] = 'no-store'
  }

  return requestObject
}

/**
 * Refresh a user access token with the supplied token.
 *
 * @return {Promise}
 */
ClientOAuth2Token.prototype.refresh = function (options) {
  var self = this

  options = extend(this.client.options, options)

  if (!this.refreshToken) {
    return Promise.reject(new Error('No refresh token'))
  }

  return this.client._request(requestOptions({
    url: options.accessTokenUri,
    method: 'POST',
    headers: extend(DEFAULT_HEADERS, {
      Authorization: auth(options.clientId, options.clientSecret)
    }),
    body: {
      refresh_token: this.refreshToken,
      grant_type: 'refresh_token'
    }
  }, options))
    .then(function (data) {
      return self.client.createToken(extend(self.data, data))
    })
}

/**
 * Check whether the token has expired.
 *
 * @return {Boolean}
 */
ClientOAuth2Token.prototype.expired = function () {
  return Date.now() > this.expires.getTime()
}

/**
 * Support resource owner password credentials OAuth 2.0 grant.
 *
 * Reference: http://tools.ietf.org/html/rfc6749#section-4.3
 *
 * @param {ClientOAuth2} client
 */
function OwnerFlow (client) {
  this.client = client
}

/**
 * Make a request on behalf of the user credentials to get an acces token.
 *
 * @param  {String}  username
 * @param  {String}  password
 * @return {Promise}
 */
OwnerFlow.prototype.getToken = function (username, password, options) {
  var self = this

  options = extend(this.client.options, options)

  return this.client._request(requestOptions({
    url: options.accessTokenUri,
    method: 'POST',
    headers: extend(DEFAULT_HEADERS, {
      Authorization: auth(options.clientId, options.clientSecret)
    }),
    body: {
      scope: sanitizeScope(options.scopes),
      username: username,
      password: password,
      grant_type: 'password'
    }
  }, options))
    .then(function (data) {
      return self.client.createToken(data)
    })
}

/**
 * Support implicit OAuth 2.0 grant.
 *
 * Reference: http://tools.ietf.org/html/rfc6749#section-4.2
 *
 * @param {ClientOAuth2} client
 */
function TokenFlow (client) {
  this.client = client
}

/**
 * Get the uri to redirect the user to for implicit authentication.
 *
 * @param  {Object} options
 * @return {String}
 */
TokenFlow.prototype.getUri = function (options) {
  options = extend(this.client.options, options)

  return createUri(options, 'token')
}

/**
 * Get the user access token from the uri.
 *
 * @param  {String}  uri
 * @param  {Object}  [options]
 * @return {Promise}
 */
TokenFlow.prototype.getToken = function (uri, options) {
  options = extend(this.client.options, options)

  var url = Url.parse(uri)
  var expectedUrl = Url.parse(options.redirectUri)

  if (url.pathname !== expectedUrl.pathname) {
    return Promise.reject(new TypeError('Should match redirect uri: ' + uri))
  }

  // If no query string or fragment exists, we won't be able to parse
  // any useful information from the uri.
  if (!url.hash && !url.search) {
    return Promise.reject(new TypeError('Unable to process uri: ' + uri))
  }

  // Extract data from both the fragment and query string. The fragment is most
  // important, but the query string is also used because some OAuth 2.0
  // implementations (Instagram) have a bug where state is passed via query.
  var data = extend(
    url.query ? Querystring.parse(url.query) : {},
    url.hash ? Querystring.parse(url.hash.substr(1)) : {}
  )

  var err = getAuthError(data)

  // Check if the query string was populated with a known error.
  if (err) {
    return Promise.reject(err)
  }

  // Check whether the state matches.
  if (options.state != null && data.state !== options.state) {
    return Promise.reject(new TypeError('Invalid state: ' + data.state))
  }

  // Initalize a new token and return.
  return Promise.resolve(this.client.createToken(data))
}

/**
 * Support client credentials OAuth 2.0 grant.
 *
 * Reference: http://tools.ietf.org/html/rfc6749#section-4.4
 *
 * @param {ClientOAuth2} client
 */
function CredentialsFlow (client) {
  this.client = client
}

/**
 * Request an access token using the client credentials.
 *
 * @param  {Object}  [options]
 * @return {Promise}
 */
CredentialsFlow.prototype.getToken = function (options) {
  var self = this

  options = extend(this.client.options, options)

  expects(options, [
    'clientId',
    'clientSecret',
    'accessTokenUri'
  ])

  return this.client._request(requestOptions({
    url: options.accessTokenUri,
    method: 'POST',
    headers: extend(DEFAULT_HEADERS, {
      Authorization: auth(options.clientId, options.clientSecret)
    }),
    body: {
      scope: sanitizeScope(options.scopes),
      grant_type: 'client_credentials'
    }
  }, options))
    .then(function (data) {
      return self.client.createToken(data)
    })
}

/**
 * Support authorization code OAuth 2.0 grant.
 *
 * Reference: http://tools.ietf.org/html/rfc6749#section-4.1
 *
 * @param {ClientOAuth2} client
 */
function CodeFlow (client) {
  this.client = client
}

/**
 * Generate the uri for doing the first redirect.
 *
 * @return {String}
 */
CodeFlow.prototype.getUri = function (options) {
  options = extend(this.client.options, options)

  return createUri(options, 'code')
}

/**
 * Get the code token from the redirected uri and make another request for
 * the user access token.
 *
 * @param  {String}  uri
 * @param  {Object}  [options]
 * @return {Promise}
 */
CodeFlow.prototype.getToken = function (uri, options) {
  var self = this

  options = extend(this.client.options, options)

  expects(options, [
    'clientId',
    'clientSecret',
    'redirectUri',
    'accessTokenUri'
  ])

  var url = Url.parse(uri)
  var expectedUrl = Url.parse(options.redirectUri)

  if (url.pathname !== expectedUrl.pathname) {
    return Promise.reject(new TypeError('Should match redirect uri: ' + uri))
  }

  if (!url.search) {
    return Promise.reject(new TypeError('Unable to process uri: ' + uri))
  }

  var data = Querystring.parse(url.query)
  var err = getAuthError(data)

  if (err) {
    return Promise.reject(err)
  }

  if (options.state && data.state !== options.state) {
    return Promise.reject(new TypeError('Invalid state:' + data.state))
  }

  // Check whether the response code is set.
  if (!data.code) {
    return Promise.reject(new TypeError('Missing code, unable to request token'))
  }

  return this.client._request(requestOptions({
    url: options.accessTokenUri,
    method: 'POST',
    headers: extend(DEFAULT_HEADERS),
    body: {
      code: data.code,
      grant_type: 'authorization_code',
      redirect_uri: options.redirectUri,
      client_id: options.clientId,
      client_secret: options.clientSecret
    }
  }, options))
    .then(function (data) {
      return self.client.createToken(data)
    })
}

/**
 * Support JSON Web Token (JWT) Bearer Token OAuth 2.0 grant.
 *
 * Reference: https://tools.ietf.org/html/draft-ietf-oauth-jwt-bearer-12#section-2.1
 *
 * @param {ClientOAuth2} client
 */
function JwtBearerFlow (client) {
  this.client = client
}

/**
 * Request an access token using a JWT token.
 *
 * @param  {string} token A JWT token.
 * @param  {Object}  [options]
 * @return {Promise}
 */
JwtBearerFlow.prototype.getToken = function (token, options) {
  var self = this

  options = extend(this.client.options, options)

  expects(options, [
    'accessTokenUri'
  ])

  var headers = extend(DEFAULT_HEADERS)

  // Authentication of the client is optional, as described in
  // Section 3.2.1 of OAuth 2.0 [RFC6749]
  if (options.clientId) {
    headers['Authorization'] = auth(options.clientId, options.clientSecret)
  }

  return this.client._request(requestOptions({
    url: options.accessTokenUri,
    method: 'POST',
    headers: headers,
    body: {
      scope: sanitizeScope(options.scopes),
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token
    }
  }, options))
    .then(function (data) {
      return self.client.createToken(data)
    })
}

}).call(this,require("buffer").Buffer)
},{"./request":146,"buffer":143,"querystring":167,"url":171,"xtend":177}],146:[function(require,module,exports){
/**
 * Make a request using `XMLHttpRequest`.
 *
 * @param   {String}  method
 * @param   {String}  url
 * @param   {String}  body
 * @param   {Object}  headers
 * @returns {Promise}
 */
module.exports = function request (method, url, body, headers) {
  return new Promise(function (resolve, reject) {
    var xhr = new window.XMLHttpRequest()

    xhr.open(method, url)

    xhr.onload = function () {
      return resolve({
        status: xhr.status,
        body: xhr.responseText
      })
    }

    xhr.onerror = xhr.onabort = function () {
      return reject(new Error(xhr.statusText || 'XHR aborted: ' + url))
    }

    Object.keys(headers).forEach(function (header) {
      xhr.setRequestHeader(header, headers[header])
    })

    xhr.send(body)
  })
}

},{}],147:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],148:[function(require,module,exports){
(function (global){
(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
   typeof define === 'function' && define.amd ? define(factory) :
   (global.Dexie = factory());
}(this, (function () { 'use strict';

/*
* Dexie.js - a minimalistic wrapper for IndexedDB
* ===============================================
*
* By David Fahlander, david.fahlander@gmail.com
*
* Version 1.5.1, Tue Nov 01 2016
* www.dexie.com
* Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
*/
var keys = Object.keys;
var isArray = Array.isArray;
var _global = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global;

function extend(obj, extension) {
    if (typeof extension !== 'object') return obj;
    keys(extension).forEach(function (key) {
        obj[key] = extension[key];
    });
    return obj;
}

var getProto = Object.getPrototypeOf;
var _hasOwn = {}.hasOwnProperty;
function hasOwn(obj, prop) {
    return _hasOwn.call(obj, prop);
}

function props(proto, extension) {
    if (typeof extension === 'function') extension = extension(getProto(proto));
    keys(extension).forEach(function (key) {
        setProp(proto, key, extension[key]);
    });
}

function setProp(obj, prop, functionOrGetSet, options) {
    Object.defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === 'function' ? { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } : { value: functionOrGetSet, configurable: true, writable: true }, options));
}

function derive(Child) {
    return {
        from: function (Parent) {
            Child.prototype = Object.create(Parent.prototype);
            setProp(Child.prototype, "constructor", Child);
            return {
                extend: props.bind(null, Child.prototype)
            };
        }
    };
}

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

function getPropertyDescriptor(obj, prop) {
    var pd = getOwnPropertyDescriptor(obj, prop),
        proto;
    return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
}

var _slice = [].slice;
function slice(args, start, end) {
    return _slice.call(args, start, end);
}

function override(origFunc, overridedFactory) {
    return overridedFactory(origFunc);
}

function doFakeAutoComplete(fn) {
    var to = setTimeout(fn, 1000);
    clearTimeout(to);
}

function assert(b) {
    if (!b) throw new Error("Assertion Failed");
}

function asap(fn) {
    if (_global.setImmediate) setImmediate(fn);else setTimeout(fn, 0);
}



/** Generate an object (hash map) based on given array.
 * @param extractor Function taking an array item and its index and returning an array of 2 items ([key, value]) to
 *        instert on the resulting object for each item in the array. If this function returns a falsy value, the
 *        current item wont affect the resulting object.
 */
function arrayToObject(array, extractor) {
    return array.reduce(function (result, item, i) {
        var nameAndValue = extractor(item, i);
        if (nameAndValue) result[nameAndValue[0]] = nameAndValue[1];
        return result;
    }, {});
}

function trycatcher(fn, reject) {
    return function () {
        try {
            fn.apply(this, arguments);
        } catch (e) {
            reject(e);
        }
    };
}

function tryCatch(fn, onerror, args) {
    try {
        fn.apply(null, args);
    } catch (ex) {
        onerror && onerror(ex);
    }
}

function getByKeyPath(obj, keyPath) {
    // http://www.w3.org/TR/IndexedDB/#steps-for-extracting-a-key-from-a-value-using-a-key-path
    if (hasOwn(obj, keyPath)) return obj[keyPath]; // This line is moved from last to first for optimization purpose.
    if (!keyPath) return obj;
    if (typeof keyPath !== 'string') {
        var rv = [];
        for (var i = 0, l = keyPath.length; i < l; ++i) {
            var val = getByKeyPath(obj, keyPath[i]);
            rv.push(val);
        }
        return rv;
    }
    var period = keyPath.indexOf('.');
    if (period !== -1) {
        var innerObj = obj[keyPath.substr(0, period)];
        return innerObj === undefined ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
    }
    return undefined;
}

function setByKeyPath(obj, keyPath, value) {
    if (!obj || keyPath === undefined) return;
    if ('isFrozen' in Object && Object.isFrozen(obj)) return;
    if (typeof keyPath !== 'string' && 'length' in keyPath) {
        assert(typeof value !== 'string' && 'length' in value);
        for (var i = 0, l = keyPath.length; i < l; ++i) {
            setByKeyPath(obj, keyPath[i], value[i]);
        }
    } else {
        var period = keyPath.indexOf('.');
        if (period !== -1) {
            var currentKeyPath = keyPath.substr(0, period);
            var remainingKeyPath = keyPath.substr(period + 1);
            if (remainingKeyPath === "") {
                if (value === undefined) delete obj[currentKeyPath];else obj[currentKeyPath] = value;
            } else {
                var innerObj = obj[currentKeyPath];
                if (!innerObj) innerObj = obj[currentKeyPath] = {};
                setByKeyPath(innerObj, remainingKeyPath, value);
            }
        } else {
            if (value === undefined) delete obj[keyPath];else obj[keyPath] = value;
        }
    }
}

function delByKeyPath(obj, keyPath) {
    if (typeof keyPath === 'string') setByKeyPath(obj, keyPath, undefined);else if ('length' in keyPath) [].map.call(keyPath, function (kp) {
        setByKeyPath(obj, kp, undefined);
    });
}

function shallowClone(obj) {
    var rv = {};
    for (var m in obj) {
        if (hasOwn(obj, m)) rv[m] = obj[m];
    }
    return rv;
}

function deepClone(any) {
    if (!any || typeof any !== 'object') return any;
    var rv;
    if (isArray(any)) {
        rv = [];
        for (var i = 0, l = any.length; i < l; ++i) {
            rv.push(deepClone(any[i]));
        }
    } else if (any instanceof Date) {
        rv = new Date();
        rv.setTime(any.getTime());
    } else {
        rv = any.constructor ? Object.create(any.constructor.prototype) : {};
        for (var prop in any) {
            if (hasOwn(any, prop)) {
                rv[prop] = deepClone(any[prop]);
            }
        }
    }
    return rv;
}

function getObjectDiff(a, b, rv, prfx) {
    // Compares objects a and b and produces a diff object.
    rv = rv || {};
    prfx = prfx || '';
    keys(a).forEach(function (prop) {
        if (!hasOwn(b, prop)) rv[prfx + prop] = undefined; // Property removed
        else {
                var ap = a[prop],
                    bp = b[prop];
                if (typeof ap === 'object' && typeof bp === 'object' && ap && bp && ap.constructor === bp.constructor)
                    // Same type of object but its properties may have changed
                    getObjectDiff(ap, bp, rv, prfx + prop + ".");else if (ap !== bp) rv[prfx + prop] = b[prop]; // Primitive value changed
            }
    });
    keys(b).forEach(function (prop) {
        if (!hasOwn(a, prop)) {
            rv[prfx + prop] = b[prop]; // Property added
        }
    });
    return rv;
}

// If first argument is iterable or array-like, return it as an array
var iteratorSymbol = typeof Symbol !== 'undefined' && Symbol.iterator;
var getIteratorOf = iteratorSymbol ? function (x) {
    var i;
    return x != null && (i = x[iteratorSymbol]) && i.apply(x);
} : function () {
    return null;
};

var NO_CHAR_ARRAY = {};
// Takes one or several arguments and returns an array based on the following criteras:
// * If several arguments provided, return arguments converted to an array in a way that
//   still allows javascript engine to optimize the code.
// * If single argument is an array, return a clone of it.
// * If this-pointer equals NO_CHAR_ARRAY, don't accept strings as valid iterables as a special
//   case to the two bullets below.
// * If single argument is an iterable, convert it to an array and return the resulting array.
// * If single argument is array-like (has length of type number), convert it to an array.
function getArrayOf(arrayLike) {
    var i, a, x, it;
    if (arguments.length === 1) {
        if (isArray(arrayLike)) return arrayLike.slice();
        if (this === NO_CHAR_ARRAY && typeof arrayLike === 'string') return [arrayLike];
        if (it = getIteratorOf(arrayLike)) {
            a = [];
            while (x = it.next(), !x.done) {
                a.push(x.value);
            }return a;
        }
        if (arrayLike == null) return [arrayLike];
        i = arrayLike.length;
        if (typeof i === 'number') {
            a = new Array(i);
            while (i--) {
                a[i] = arrayLike[i];
            }return a;
        }
        return [arrayLike];
    }
    i = arguments.length;
    a = new Array(i);
    while (i--) {
        a[i] = arguments[i];
    }return a;
}

var concat = [].concat;
function flatten(a) {
    return concat.apply([], a);
}

function nop() {}
function mirror(val) {
    return val;
}
function pureFunctionChain(f1, f2) {
    // Enables chained events that takes ONE argument and returns it to the next function in chain.
    // This pattern is used in the hook("reading") event.
    if (f1 == null || f1 === mirror) return f2;
    return function (val) {
        return f2(f1(val));
    };
}

function callBoth(on1, on2) {
    return function () {
        on1.apply(this, arguments);
        on2.apply(this, arguments);
    };
}

function hookCreatingChain(f1, f2) {
    // Enables chained events that takes several arguments and may modify first argument by making a modification and then returning the same instance.
    // This pattern is used in the hook("creating") event.
    if (f1 === nop) return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res !== undefined) arguments[0] = res;
        var onsuccess = this.onsuccess,
            // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = null;
        this.onerror = null;
        var res2 = f2.apply(this, arguments);
        if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        return res2 !== undefined ? res2 : res;
    };
}

function hookDeletingChain(f1, f2) {
    if (f1 === nop) return f2;
    return function () {
        f1.apply(this, arguments);
        var onsuccess = this.onsuccess,
            // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = this.onerror = null;
        f2.apply(this, arguments);
        if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    };
}

function hookUpdatingChain(f1, f2) {
    if (f1 === nop) return f2;
    return function (modifications) {
        var res = f1.apply(this, arguments);
        extend(modifications, res); // If f1 returns new modifications, extend caller's modifications with the result before calling next in chain.
        var onsuccess = this.onsuccess,
            // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = null;
        this.onerror = null;
        var res2 = f2.apply(this, arguments);
        if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        return res === undefined ? res2 === undefined ? undefined : res2 : extend(res, res2);
    };
}

function reverseStoppableEventChain(f1, f2) {
    if (f1 === nop) return f2;
    return function () {
        if (f2.apply(this, arguments) === false) return false;
        return f1.apply(this, arguments);
    };
}



function promisableChain(f1, f2) {
    if (f1 === nop) return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res && typeof res.then === 'function') {
            var thiz = this,
                i = arguments.length,
                args = new Array(i);
            while (i--) {
                args[i] = arguments[i];
            }return res.then(function () {
                return f2.apply(thiz, args);
            });
        }
        return f2.apply(this, arguments);
    };
}

// By default, debug will be true only if platform is a web platform and its page is served from localhost.
// When debug = true, error's stacks will contain asyncronic long stacks.
var debug = typeof location !== 'undefined' &&
// By default, use debug mode if served from localhost.
/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);

function setDebug(value, filter) {
    debug = value;
    libraryFilter = filter;
}

var libraryFilter = function () {
    return true;
};

var NEEDS_THROW_FOR_STACK = !new Error("").stack;

function getErrorWithStack() {
    "use strict";

    if (NEEDS_THROW_FOR_STACK) try {
        // Doing something naughty in strict mode here to trigger a specific error
        // that can be explicitely ignored in debugger's exception settings.
        // If we'd just throw new Error() here, IE's debugger's exception settings
        // will just consider it as "exception thrown by javascript code" which is
        // something you wouldn't want it to ignore.
        getErrorWithStack.arguments;
        throw new Error(); // Fallback if above line don't throw.
    } catch (e) {
        return e;
    }
    return new Error();
}

function prettyStack(exception, numIgnoredFrames) {
    var stack = exception.stack;
    if (!stack) return "";
    numIgnoredFrames = numIgnoredFrames || 0;
    if (stack.indexOf(exception.name) === 0) numIgnoredFrames += (exception.name + exception.message).split('\n').length;
    return stack.split('\n').slice(numIgnoredFrames).filter(libraryFilter).map(function (frame) {
        return "\n" + frame;
    }).join('');
}

function deprecated(what, fn) {
    return function () {
        console.warn(what + " is deprecated. See https://github.com/dfahlander/Dexie.js/wiki/Deprecations. " + prettyStack(getErrorWithStack(), 1));
        return fn.apply(this, arguments);
    };
}

var dexieErrorNames = ['Modify', 'Bulk', 'OpenFailed', 'VersionChange', 'Schema', 'Upgrade', 'InvalidTable', 'MissingAPI', 'NoSuchDatabase', 'InvalidArgument', 'SubTransaction', 'Unsupported', 'Internal', 'DatabaseClosed', 'IncompatiblePromise'];

var idbDomErrorNames = ['Unknown', 'Constraint', 'Data', 'TransactionInactive', 'ReadOnly', 'Version', 'NotFound', 'InvalidState', 'InvalidAccess', 'Abort', 'Timeout', 'QuotaExceeded', 'Syntax', 'DataClone'];

var errorList = dexieErrorNames.concat(idbDomErrorNames);

var defaultTexts = {
    VersionChanged: "Database version changed by other database connection",
    DatabaseClosed: "Database has been closed",
    Abort: "Transaction aborted",
    TransactionInactive: "Transaction has already completed or failed"
};

//
// DexieError - base class of all out exceptions.
//
function DexieError(name, msg) {
    // Reason we don't use ES6 classes is because:
    // 1. It bloats transpiled code and increases size of minified code.
    // 2. It doesn't give us much in this case.
    // 3. It would require sub classes to call super(), which
    //    is not needed when deriving from Error.
    this._e = getErrorWithStack();
    this.name = name;
    this.message = msg;
}

derive(DexieError).from(Error).extend({
    stack: {
        get: function () {
            return this._stack || (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
        }
    },
    toString: function () {
        return this.name + ": " + this.message;
    }
});

function getMultiErrorMessage(msg, failures) {
    return msg + ". Errors: " + failures.map(function (f) {
        return f.toString();
    }).filter(function (v, i, s) {
        return s.indexOf(v) === i;
    }) // Only unique error strings
    .join('\n');
}

//
// ModifyError - thrown in WriteableCollection.modify()
// Specific constructor because it contains members failures and failedKeys.
//
function ModifyError(msg, failures, successCount, failedKeys) {
    this._e = getErrorWithStack();
    this.failures = failures;
    this.failedKeys = failedKeys;
    this.successCount = successCount;
}
derive(ModifyError).from(DexieError);

function BulkError(msg, failures) {
    this._e = getErrorWithStack();
    this.name = "BulkError";
    this.failures = failures;
    this.message = getMultiErrorMessage(msg, failures);
}
derive(BulkError).from(DexieError);

//
//
// Dynamically generate error names and exception classes based
// on the names in errorList.
//
//

// Map of {ErrorName -> ErrorName + "Error"}
var errnames = errorList.reduce(function (obj, name) {
    return obj[name] = name + "Error", obj;
}, {});

// Need an alias for DexieError because we're gonna create subclasses with the same name.
var BaseException = DexieError;
// Map of {ErrorName -> exception constructor}
var exceptions = errorList.reduce(function (obj, name) {
    // Let the name be "DexieError" because this name may
    // be shown in call stack and when debugging. DexieError is
    // the most true name because it derives from DexieError,
    // and we cannot change Function.name programatically without
    // dynamically create a Function object, which would be considered
    // 'eval-evil'.
    var fullName = name + "Error";
    function DexieError(msgOrInner, inner) {
        this._e = getErrorWithStack();
        this.name = fullName;
        if (!msgOrInner) {
            this.message = defaultTexts[name] || fullName;
            this.inner = null;
        } else if (typeof msgOrInner === 'string') {
            this.message = msgOrInner;
            this.inner = inner || null;
        } else if (typeof msgOrInner === 'object') {
            this.message = msgOrInner.name + ' ' + msgOrInner.message;
            this.inner = msgOrInner;
        }
    }
    derive(DexieError).from(BaseException);
    obj[name] = DexieError;
    return obj;
}, {});

// Use ECMASCRIPT standard exceptions where applicable:
exceptions.Syntax = SyntaxError;
exceptions.Type = TypeError;
exceptions.Range = RangeError;

var exceptionMap = idbDomErrorNames.reduce(function (obj, name) {
    obj[name + "Error"] = exceptions[name];
    return obj;
}, {});

function mapError(domError, message) {
    if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name]) return domError;
    var rv = new exceptionMap[domError.name](message || domError.message, domError);
    if ("stack" in domError) {
        // Derive stack from inner exception if it has a stack
        setProp(rv, "stack", { get: function () {
                return this.inner.stack;
            } });
    }
    return rv;
}

var fullNameExceptions = errorList.reduce(function (obj, name) {
    if (["Syntax", "Type", "Range"].indexOf(name) === -1) obj[name + "Error"] = exceptions[name];
    return obj;
}, {});

fullNameExceptions.ModifyError = ModifyError;
fullNameExceptions.DexieError = DexieError;
fullNameExceptions.BulkError = BulkError;

function Events(ctx) {
    var evs = {};
    var rv = function (eventName, subscriber) {
        if (subscriber) {
            // Subscribe. If additional arguments than just the subscriber was provided, forward them as well.
            var i = arguments.length,
                args = new Array(i - 1);
            while (--i) {
                args[i - 1] = arguments[i];
            }evs[eventName].subscribe.apply(null, args);
            return ctx;
        } else if (typeof eventName === 'string') {
            // Return interface allowing to fire or unsubscribe from event
            return evs[eventName];
        }
    };
    rv.addEventType = add;

    for (var i = 1, l = arguments.length; i < l; ++i) {
        add(arguments[i]);
    }

    return rv;

    function add(eventName, chainFunction, defaultFunction) {
        if (typeof eventName === 'object') return addConfiguredEvents(eventName);
        if (!chainFunction) chainFunction = reverseStoppableEventChain;
        if (!defaultFunction) defaultFunction = nop;

        var context = {
            subscribers: [],
            fire: defaultFunction,
            subscribe: function (cb) {
                if (context.subscribers.indexOf(cb) === -1) {
                    context.subscribers.push(cb);
                    context.fire = chainFunction(context.fire, cb);
                }
            },
            unsubscribe: function (cb) {
                context.subscribers = context.subscribers.filter(function (fn) {
                    return fn !== cb;
                });
                context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
            }
        };
        evs[eventName] = rv[eventName] = context;
        return context;
    }

    function addConfiguredEvents(cfg) {
        // events(this, {reading: [functionChain, nop]});
        keys(cfg).forEach(function (eventName) {
            var args = cfg[eventName];
            if (isArray(args)) {
                add(eventName, cfg[eventName][0], cfg[eventName][1]);
            } else if (args === 'asap') {
                // Rather than approaching event subscription using a functional approach, we here do it in a for-loop where subscriber is executed in its own stack
                // enabling that any exception that occur wont disturb the initiator and also not nescessary be catched and forgotten.
                var context = add(eventName, mirror, function fire() {
                    // Optimazation-safe cloning of arguments into args.
                    var i = arguments.length,
                        args = new Array(i);
                    while (i--) {
                        args[i] = arguments[i];
                    } // All each subscriber:
                    context.subscribers.forEach(function (fn) {
                        asap(function fireEvent() {
                            fn.apply(null, args);
                        });
                    });
                });
            } else throw new exceptions.InvalidArgument("Invalid event config");
        });
    }
}

//
// Promise Class for Dexie library
//
// I started out writing this Promise class by copying promise-light (https://github.com/taylorhakes/promise-light) by
// https://github.com/taylorhakes - an A+ and ECMASCRIPT 6 compliant Promise implementation.
//
// Modifications needed to be done to support indexedDB because it wont accept setTimeout()
// (See discussion: https://github.com/promises-aplus/promises-spec/issues/45) .
// This topic was also discussed in the following thread: https://github.com/promises-aplus/promises-spec/issues/45
//
// This implementation will not use setTimeout or setImmediate when it's not needed. The behavior is 100% Promise/A+ compliant since
// the caller of new Promise() can be certain that the promise wont be triggered the lines after constructing the promise.
//
// In previous versions this was fixed by not calling setTimeout when knowing that the resolve() or reject() came from another
// tick. In Dexie v1.4.0, I've rewritten the Promise class entirely. Just some fragments of promise-light is left. I use
// another strategy now that simplifies everything a lot: to always execute callbacks in a new tick, but have an own microTick
// engine that is used instead of setImmediate() or setTimeout().
// Promise class has also been optimized a lot with inspiration from bluebird - to avoid closures as much as possible.
// Also with inspiration from bluebird, asyncronic stacks in debug mode.
//
// Specific non-standard features of this Promise class:
// * Async static context support (Promise.PSD)
// * Promise.follow() method built upon PSD, that allows user to track all promises created from current stack frame
//   and below + all promises that those promises creates or awaits.
// * Detect any unhandled promise in a PSD-scope (PSD.onunhandled). 
//
// David Fahlander, https://github.com/dfahlander
//

// Just a pointer that only this module knows about.
// Used in Promise constructor to emulate a private constructor.
var INTERNAL = {};

// Async stacks (long stacks) must not grow infinitely.
var LONG_STACKS_CLIP_LIMIT = 100;
var MAX_LONG_STACKS = 20;
var stack_being_generated = false;

/* The default "nextTick" function used only for the very first promise in a promise chain.
   As soon as then promise is resolved or rejected, all next tasks will be executed in micro ticks
   emulated in this module. For indexedDB compatibility, this means that every method needs to 
   execute at least one promise before doing an indexedDB operation. Dexie will always call 
   db.ready().then() for every operation to make sure the indexedDB event is started in an
   emulated micro tick.
*/
var schedulePhysicalTick = _global.setImmediate ?
// setImmediate supported. Those modern platforms also supports Function.bind().
setImmediate.bind(null, physicalTick) : _global.MutationObserver ?
// MutationObserver supported
function () {
    var hiddenDiv = document.createElement("div");
    new MutationObserver(function () {
        physicalTick();
        hiddenDiv = null;
    }).observe(hiddenDiv, { attributes: true });
    hiddenDiv.setAttribute('i', '1');
} :
// No support for setImmediate or MutationObserver. No worry, setTimeout is only called
// once time. Every tick that follows will be our emulated micro tick.
// Could have uses setTimeout.bind(null, 0, physicalTick) if it wasnt for that FF13 and below has a bug 
function () {
    setTimeout(physicalTick, 0);
};

// Confifurable through Promise.scheduler.
// Don't export because it would be unsafe to let unknown
// code call it unless they do try..catch within their callback.
// This function can be retrieved through getter of Promise.scheduler though,
// but users must not do Promise.scheduler (myFuncThatThrows exception)!
var asap$1 = function (callback, args) {
    microtickQueue.push([callback, args]);
    if (needsNewPhysicalTick) {
        schedulePhysicalTick();
        needsNewPhysicalTick = false;
    }
};

var isOutsideMicroTick = true;
var needsNewPhysicalTick = true;
var unhandledErrors = [];
var rejectingErrors = [];
var currentFulfiller = null;
var rejectionMapper = mirror; // Remove in next major when removing error mapping of DOMErrors and DOMExceptions

var globalPSD = {
    global: true,
    ref: 0,
    unhandleds: [],
    onunhandled: globalError,
    //env: null, // Will be set whenever leaving a scope using wrappers.snapshot()
    finalize: function () {
        this.unhandleds.forEach(function (uh) {
            try {
                globalError(uh[0], uh[1]);
            } catch (e) {}
        });
    }
};

var PSD = globalPSD;

var microtickQueue = []; // Callbacks to call in this or next physical tick.
var numScheduledCalls = 0; // Number of listener-calls left to do in this physical tick.
var tickFinalizers = []; // Finalizers to call when there are no more async calls scheduled within current physical tick.

// Wrappers are not being used yet. Their framework is functioning and can be used
// to replace environment during a PSD scope (a.k.a. 'zone').
/* **KEEP** export var wrappers = (() => {
    var wrappers = [];

    return {
        snapshot: () => {
            var i = wrappers.length,
                result = new Array(i);
            while (i--) result[i] = wrappers[i].snapshot();
            return result;
        },
        restore: values => {
            var i = wrappers.length;
            while (i--) wrappers[i].restore(values[i]);
        },
        wrap: () => wrappers.map(w => w.wrap()),
        add: wrapper => {
            wrappers.push(wrapper);
        }
    };
})();
*/

function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    this._listeners = [];
    this.onuncatched = nop; // Deprecate in next major. Not needed. Better to use global error handler.

    // A library may set `promise._lib = true;` after promise is created to make resolve() or reject()
    // execute the microtask engine implicitely within the call to resolve() or reject().
    // To remain A+ compliant, a library must only set `_lib=true` if it can guarantee that the stack
    // only contains library code when calling resolve() or reject().
    // RULE OF THUMB: ONLY set _lib = true for promises explicitely resolving/rejecting directly from
    // global scope (event handler, timer etc)!
    this._lib = false;
    // Current async scope
    var psd = this._PSD = PSD;

    if (debug) {
        this._stackHolder = getErrorWithStack();
        this._prev = null;
        this._numPrev = 0; // Number of previous promises (for long stacks)
        linkToPreviousPromise(this, currentFulfiller);
    }

    if (typeof fn !== 'function') {
        if (fn !== INTERNAL) throw new TypeError('Not a function');
        // Private constructor (INTERNAL, state, value).
        // Used internally by Promise.resolve() and Promise.reject().
        this._state = arguments[1];
        this._value = arguments[2];
        if (this._state === false) handleRejection(this, this._value); // Map error, set stack and addPossiblyUnhandledError().
        return;
    }

    this._state = null; // null (=pending), false (=rejected) or true (=resolved)
    this._value = null; // error or result
    ++psd.ref; // Refcounting current scope
    executePromiseTask(this, fn);
}

props(Promise.prototype, {

    then: function (onFulfilled, onRejected) {
        var _this = this;

        var rv = new Promise(function (resolve, reject) {
            propagateToListener(_this, new Listener(onFulfilled, onRejected, resolve, reject));
        });
        debug && (!this._prev || this._state === null) && linkToPreviousPromise(rv, this);
        return rv;
    },

    _then: function (onFulfilled, onRejected) {
        // A little tinier version of then() that don't have to create a resulting promise.
        propagateToListener(this, new Listener(null, null, onFulfilled, onRejected));
    },

    catch: function (onRejected) {
        if (arguments.length === 1) return this.then(null, onRejected);
        // First argument is the Error type to catch
        var type = arguments[0],
            handler = arguments[1];
        return typeof type === 'function' ? this.then(null, function (err) {
            return (
                // Catching errors by its constructor type (similar to java / c++ / c#)
                // Sample: promise.catch(TypeError, function (e) { ... });
                err instanceof type ? handler(err) : PromiseReject(err)
            );
        }) : this.then(null, function (err) {
            return (
                // Catching errors by the error.name property. Makes sense for indexedDB where error type
                // is always DOMError but where e.name tells the actual error type.
                // Sample: promise.catch('ConstraintError', function (e) { ... });
                err && err.name === type ? handler(err) : PromiseReject(err)
            );
        });
    },

    finally: function (onFinally) {
        return this.then(function (value) {
            onFinally();
            return value;
        }, function (err) {
            onFinally();
            return PromiseReject(err);
        });
    },

    // Deprecate in next major. Needed only for db.on.error.
    uncaught: function (uncaughtHandler) {
        var _this2 = this;

        // Be backward compatible and use "onuncatched" as the event name on this.
        // Handle multiple subscribers through reverseStoppableEventChain(). If a handler returns `false`, bubbling stops.
        this.onuncatched = reverseStoppableEventChain(this.onuncatched, uncaughtHandler);
        // In case caller does this on an already rejected promise, assume caller wants to point out the error to this promise and not
        // a previous promise. Reason: the prevous promise may lack onuncatched handler. 
        if (this._state === false && unhandledErrors.indexOf(this) === -1) {
            // Replace unhandled error's destinaion promise with this one!
            unhandledErrors.some(function (p, i, l) {
                return p._value === _this2._value && (l[i] = _this2);
            });
            // Actually we do this shit because we need to support db.on.error() correctly during db.open(). If we deprecate db.on.error, we could
            // take away this piece of code as well as the onuncatched and uncaught() method.
        }
        return this;
    },

    stack: {
        get: function () {
            if (this._stack) return this._stack;
            try {
                stack_being_generated = true;
                var stacks = getStack(this, [], MAX_LONG_STACKS);
                var stack = stacks.join("\nFrom previous: ");
                if (this._state !== null) this._stack = stack; // Stack may be updated on reject.
                return stack;
            } finally {
                stack_being_generated = false;
            }
        }
    }
});

function Listener(onFulfilled, onRejected, resolve, reject) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.resolve = resolve;
    this.reject = reject;
    this.psd = PSD;
}

// Promise Static Properties
props(Promise, {
    all: function () {
        var values = getArrayOf.apply(null, arguments); // Supports iterables, implicit arguments and array-like.
        return new Promise(function (resolve, reject) {
            if (values.length === 0) resolve([]);
            var remaining = values.length;
            values.forEach(function (a, i) {
                return Promise.resolve(a).then(function (x) {
                    values[i] = x;
                    if (! --remaining) resolve(values);
                }, reject);
            });
        });
    },

    resolve: function (value) {
        if (value instanceof Promise) return value;
        if (value && typeof value.then === 'function') return new Promise(function (resolve, reject) {
            value.then(resolve, reject);
        });
        return new Promise(INTERNAL, true, value);
    },

    reject: PromiseReject,

    race: function () {
        var values = getArrayOf.apply(null, arguments);
        return new Promise(function (resolve, reject) {
            values.map(function (value) {
                return Promise.resolve(value).then(resolve, reject);
            });
        });
    },

    PSD: {
        get: function () {
            return PSD;
        },
        set: function (value) {
            return PSD = value;
        }
    },

    newPSD: newScope,

    usePSD: usePSD,

    scheduler: {
        get: function () {
            return asap$1;
        },
        set: function (value) {
            asap$1 = value;
        }
    },

    rejectionMapper: {
        get: function () {
            return rejectionMapper;
        },
        set: function (value) {
            rejectionMapper = value;
        } // Map reject failures
    },

    follow: function (fn) {
        return new Promise(function (resolve, reject) {
            return newScope(function (resolve, reject) {
                var psd = PSD;
                psd.unhandleds = []; // For unhandled standard- or 3rd party Promises. Checked at psd.finalize()
                psd.onunhandled = reject; // Triggered directly on unhandled promises of this library.
                psd.finalize = callBoth(function () {
                    var _this3 = this;

                    // Unhandled standard or 3rd part promises are put in PSD.unhandleds and
                    // examined upon scope completion while unhandled rejections in this Promise
                    // will trigger directly through psd.onunhandled
                    run_at_end_of_this_or_next_physical_tick(function () {
                        _this3.unhandleds.length === 0 ? resolve() : reject(_this3.unhandleds[0]);
                    });
                }, psd.finalize);
                fn();
            }, resolve, reject);
        });
    },

    on: Events(null, { "error": [reverseStoppableEventChain, defaultErrorHandler] // Default to defaultErrorHandler
    })

});

var PromiseOnError = Promise.on.error;
PromiseOnError.subscribe = deprecated("Promise.on('error')", PromiseOnError.subscribe);
PromiseOnError.unsubscribe = deprecated("Promise.on('error').unsubscribe", PromiseOnError.unsubscribe);

/**
* Take a potentially misbehaving resolver function and make sure
* onFulfilled and onRejected are only called once.
*
* Makes no guarantees about asynchrony.
*/
function executePromiseTask(promise, fn) {
    // Promise Resolution Procedure:
    // https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    try {
        fn(function (value) {
            if (promise._state !== null) return;
            if (value === promise) throw new TypeError('A promise cannot be resolved with itself.');
            var shouldExecuteTick = promise._lib && beginMicroTickScope();
            if (value && typeof value.then === 'function') {
                executePromiseTask(promise, function (resolve, reject) {
                    value instanceof Promise ? value._then(resolve, reject) : value.then(resolve, reject);
                });
            } else {
                promise._state = true;
                promise._value = value;
                propagateAllListeners(promise);
            }
            if (shouldExecuteTick) endMicroTickScope();
        }, handleRejection.bind(null, promise)); // If Function.bind is not supported. Exception is handled in catch below
    } catch (ex) {
        handleRejection(promise, ex);
    }
}

function handleRejection(promise, reason) {
    rejectingErrors.push(reason);
    if (promise._state !== null) return;
    var shouldExecuteTick = promise._lib && beginMicroTickScope();
    reason = rejectionMapper(reason);
    promise._state = false;
    promise._value = reason;
    debug && reason !== null && typeof reason === 'object' && !reason._promise && tryCatch(function () {
        var origProp = getPropertyDescriptor(reason, "stack");
        reason._promise = promise;
        setProp(reason, "stack", {
            get: function () {
                return stack_being_generated ? origProp && (origProp.get ? origProp.get.apply(reason) : origProp.value) : promise.stack;
            }
        });
    });
    // Add the failure to a list of possibly uncaught errors
    addPossiblyUnhandledError(promise);
    propagateAllListeners(promise);
    if (shouldExecuteTick) endMicroTickScope();
}

function propagateAllListeners(promise) {
    //debug && linkToPreviousPromise(promise);
    var listeners = promise._listeners;
    promise._listeners = [];
    for (var i = 0, len = listeners.length; i < len; ++i) {
        propagateToListener(promise, listeners[i]);
    }
    var psd = promise._PSD;
    --psd.ref || psd.finalize(); // if psd.ref reaches zero, call psd.finalize();
    if (numScheduledCalls === 0) {
        // If numScheduledCalls is 0, it means that our stack is not in a callback of a scheduled call,
        // and that no deferreds where listening to this rejection or success.
        // Since there is a risk that our stack can contain application code that may
        // do stuff after this code is finished that may generate new calls, we cannot
        // call finalizers here.
        ++numScheduledCalls;
        asap$1(function () {
            if (--numScheduledCalls === 0) finalizePhysicalTick(); // Will detect unhandled errors
        }, []);
    }
}

function propagateToListener(promise, listener) {
    if (promise._state === null) {
        promise._listeners.push(listener);
        return;
    }

    var cb = promise._state ? listener.onFulfilled : listener.onRejected;
    if (cb === null) {
        // This Listener doesnt have a listener for the event being triggered (onFulfilled or onReject) so lets forward the event to any eventual listeners on the Promise instance returned by then() or catch()
        return (promise._state ? listener.resolve : listener.reject)(promise._value);
    }
    var psd = listener.psd;
    ++psd.ref;
    ++numScheduledCalls;
    asap$1(callListener, [cb, promise, listener]);
}

function callListener(cb, promise, listener) {
    var outerScope = PSD;
    var psd = listener.psd;
    try {
        if (psd !== outerScope) {
            // **KEEP** outerScope.env = wrappers.snapshot(); // Snapshot outerScope's environment.
            PSD = psd;
            // **KEEP** wrappers.restore(psd.env); // Restore PSD's environment.
        }

        // Set static variable currentFulfiller to the promise that is being fullfilled,
        // so that we connect the chain of promises (for long stacks support)
        currentFulfiller = promise;

        // Call callback and resolve our listener with it's return value.
        var value = promise._value,
            ret;
        if (promise._state) {
            ret = cb(value);
        } else {
            if (rejectingErrors.length) rejectingErrors = [];
            ret = cb(value);
            if (rejectingErrors.indexOf(value) === -1) markErrorAsHandled(promise); // Callback didnt do Promise.reject(err) nor reject(err) onto another promise.
        }
        listener.resolve(ret);
    } catch (e) {
        // Exception thrown in callback. Reject our listener.
        listener.reject(e);
    } finally {
        // Restore PSD, env and currentFulfiller.
        if (psd !== outerScope) {
            PSD = outerScope;
            // **KEEP** wrappers.restore(outerScope.env); // Restore outerScope's environment
        }
        currentFulfiller = null;
        if (--numScheduledCalls === 0) finalizePhysicalTick();
        --psd.ref || psd.finalize();
    }
}

function getStack(promise, stacks, limit) {
    if (stacks.length === limit) return stacks;
    var stack = "";
    if (promise._state === false) {
        var failure = promise._value,
            errorName,
            message;

        if (failure != null) {
            errorName = failure.name || "Error";
            message = failure.message || failure;
            stack = prettyStack(failure, 0);
        } else {
            errorName = failure; // If error is undefined or null, show that.
            message = "";
        }
        stacks.push(errorName + (message ? ": " + message : "") + stack);
    }
    if (debug) {
        stack = prettyStack(promise._stackHolder, 2);
        if (stack && stacks.indexOf(stack) === -1) stacks.push(stack);
        if (promise._prev) getStack(promise._prev, stacks, limit);
    }
    return stacks;
}

function linkToPreviousPromise(promise, prev) {
    // Support long stacks by linking to previous completed promise.
    var numPrev = prev ? prev._numPrev + 1 : 0;
    if (numPrev < LONG_STACKS_CLIP_LIMIT) {
        // Prohibit infinite Promise loops to get an infinite long memory consuming "tail".
        promise._prev = prev;
        promise._numPrev = numPrev;
    }
}

/* The callback to schedule with setImmediate() or setTimeout().
   It runs a virtual microtick and executes any callback registered in microtickQueue.
 */
function physicalTick() {
    beginMicroTickScope() && endMicroTickScope();
}

function beginMicroTickScope() {
    var wasRootExec = isOutsideMicroTick;
    isOutsideMicroTick = false;
    needsNewPhysicalTick = false;
    return wasRootExec;
}

/* Executes micro-ticks without doing try..catch.
   This can be possible because we only use this internally and
   the registered functions are exception-safe (they do try..catch
   internally before calling any external method). If registering
   functions in the microtickQueue that are not exception-safe, this
   would destroy the framework and make it instable. So we don't export
   our asap method.
*/
function endMicroTickScope() {
    var callbacks, i, l;
    do {
        while (microtickQueue.length > 0) {
            callbacks = microtickQueue;
            microtickQueue = [];
            l = callbacks.length;
            for (i = 0; i < l; ++i) {
                var item = callbacks[i];
                item[0].apply(null, item[1]);
            }
        }
    } while (microtickQueue.length > 0);
    isOutsideMicroTick = true;
    needsNewPhysicalTick = true;
}

function finalizePhysicalTick() {
    var unhandledErrs = unhandledErrors;
    unhandledErrors = [];
    unhandledErrs.forEach(function (p) {
        p._PSD.onunhandled.call(null, p._value, p);
    });
    var finalizers = tickFinalizers.slice(0); // Clone first because finalizer may remove itself from list.
    var i = finalizers.length;
    while (i) {
        finalizers[--i]();
    }
}

function run_at_end_of_this_or_next_physical_tick(fn) {
    function finalizer() {
        fn();
        tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
    }
    tickFinalizers.push(finalizer);
    ++numScheduledCalls;
    asap$1(function () {
        if (--numScheduledCalls === 0) finalizePhysicalTick();
    }, []);
}

function addPossiblyUnhandledError(promise) {
    // Only add to unhandledErrors if not already there. The first one to add to this list
    // will be upon the first rejection so that the root cause (first promise in the
    // rejection chain) is the one listed.
    if (!unhandledErrors.some(function (p) {
        return p._value === promise._value;
    })) unhandledErrors.push(promise);
}

function markErrorAsHandled(promise) {
    // Called when a reject handled is actually being called.
    // Search in unhandledErrors for any promise whos _value is this promise_value (list
    // contains only rejected promises, and only one item per error)
    var i = unhandledErrors.length;
    while (i) {
        if (unhandledErrors[--i]._value === promise._value) {
            // Found a promise that failed with this same error object pointer,
            // Remove that since there is a listener that actually takes care of it.
            unhandledErrors.splice(i, 1);
            return;
        }
    }
}

// By default, log uncaught errors to the console
function defaultErrorHandler(e) {
    console.warn('Unhandled rejection: ' + (e.stack || e));
}

function PromiseReject(reason) {
    return new Promise(INTERNAL, false, reason);
}

function wrap(fn, errorCatcher) {
    var psd = PSD;
    return function () {
        var wasRootExec = beginMicroTickScope(),
            outerScope = PSD;

        try {
            if (outerScope !== psd) {
                // **KEEP** outerScope.env = wrappers.snapshot(); // Snapshot outerScope's environment
                PSD = psd;
                // **KEEP** wrappers.restore(psd.env); // Restore PSD's environment.
            }
            return fn.apply(this, arguments);
        } catch (e) {
            errorCatcher && errorCatcher(e);
        } finally {
            if (outerScope !== psd) {
                PSD = outerScope;
                // **KEEP** wrappers.restore(outerScope.env); // Restore outerScope's environment
            }
            if (wasRootExec) endMicroTickScope();
        }
    };
}

function newScope(fn, a1, a2, a3) {
    var parent = PSD,
        psd = Object.create(parent);
    psd.parent = parent;
    psd.ref = 0;
    psd.global = false;
    // **KEEP** psd.env = wrappers.wrap(psd);

    // unhandleds and onunhandled should not be specifically set here.
    // Leave them on parent prototype.
    // unhandleds.push(err) will push to parent's prototype
    // onunhandled() will call parents onunhandled (with this scope's this-pointer though!)
    ++parent.ref;
    psd.finalize = function () {
        --this.parent.ref || this.parent.finalize();
    };
    var rv = usePSD(psd, fn, a1, a2, a3);
    if (psd.ref === 0) psd.finalize();
    return rv;
}

function usePSD(psd, fn, a1, a2, a3) {
    var outerScope = PSD;
    try {
        if (psd !== outerScope) {
            // **KEEP** outerScope.env = wrappers.snapshot(); // snapshot outerScope's environment.
            PSD = psd;
            // **KEEP** wrappers.restore(psd.env); // Restore PSD's environment.
        }
        return fn(a1, a2, a3);
    } finally {
        if (psd !== outerScope) {
            PSD = outerScope;
            // **KEEP** wrappers.restore(outerScope.env); // Restore outerScope's environment.
        }
    }
}

var UNHANDLEDREJECTION = "unhandledrejection";

function globalError(err, promise) {
    var rv;
    try {
        rv = promise.onuncatched(err);
    } catch (e) {}
    if (rv !== false) try {
        var event,
            eventData = { promise: promise, reason: err };
        if (_global.document && document.createEvent) {
            event = document.createEvent('Event');
            event.initEvent(UNHANDLEDREJECTION, true, true);
            extend(event, eventData);
        } else if (_global.CustomEvent) {
            event = new CustomEvent(UNHANDLEDREJECTION, { detail: eventData });
            extend(event, eventData);
        }
        if (event && _global.dispatchEvent) {
            dispatchEvent(event);
            if (!_global.PromiseRejectionEvent && _global.onunhandledrejection)
                // No native support for PromiseRejectionEvent but user has set window.onunhandledrejection. Manually call it.
                try {
                    _global.onunhandledrejection(event);
                } catch (_) {}
        }
        if (!event.defaultPrevented) {
            // Backward compatibility: fire to events registered at Promise.on.error
            Promise.on.error.fire(err, promise);
        }
    } catch (e) {}
}

/* **KEEP** 

export function wrapPromise(PromiseClass) {
    var proto = PromiseClass.prototype;
    var origThen = proto.then;
    
    wrappers.add({
        snapshot: () => proto.then,
        restore: value => {proto.then = value;},
        wrap: () => patchedThen
    });

    function patchedThen (onFulfilled, onRejected) {
        var promise = this;
        var onFulfilledProxy = wrap(function(value){
            var rv = value;
            if (onFulfilled) {
                rv = onFulfilled(rv);
                if (rv && typeof rv.then === 'function') rv.then(); // Intercept that promise as well.
            }
            --PSD.ref || PSD.finalize();
            return rv;
        });
        var onRejectedProxy = wrap(function(err){
            promise._$err = err;
            var unhandleds = PSD.unhandleds;
            var idx = unhandleds.length,
                rv;
            while (idx--) if (unhandleds[idx]._$err === err) break;
            if (onRejected) {
                if (idx !== -1) unhandleds.splice(idx, 1); // Mark as handled.
                rv = onRejected(err);
                if (rv && typeof rv.then === 'function') rv.then(); // Intercept that promise as well.
            } else {
                if (idx === -1) unhandleds.push(promise);
                rv = PromiseClass.reject(err);
                rv._$nointercept = true; // Prohibit eternal loop.
            }
            --PSD.ref || PSD.finalize();
            return rv;
        });
        
        if (this._$nointercept) return origThen.apply(this, arguments);
        ++PSD.ref;
        return origThen.call(this, onFulfilledProxy, onRejectedProxy);
    }
}

// Global Promise wrapper
if (_global.Promise) wrapPromise(_global.Promise);

*/

doFakeAutoComplete(function () {
    // Simplify the job for VS Intellisense. This piece of code is one of the keys to the new marvellous intellisense support in Dexie.
    asap$1 = function (fn, args) {
        setTimeout(function () {
            fn.apply(null, args);
        }, 0);
    };
});

function rejection(err, uncaughtHandler) {
    // Get the call stack and return a rejected promise.
    var rv = Promise.reject(err);
    return uncaughtHandler ? rv.uncaught(uncaughtHandler) : rv;
}

/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * By David Fahlander, david.fahlander@gmail.com
 *
 * Version 1.5.1, Tue Nov 01 2016
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 */

var DEXIE_VERSION = '1.5.1';
var maxString = String.fromCharCode(65535);
var maxKey = function () {
    try {
        IDBKeyRange.only([[]]);return [[]];
    } catch (e) {
        return maxString;
    }
}();
var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
var STRING_EXPECTED = "String expected.";
var connections = [];
var isIEOrEdge = typeof navigator !== 'undefined' && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
var hasIEDeleteObjectStoreBug = isIEOrEdge;
var hangsOnDeleteLargeKeyRange = isIEOrEdge;
var dexieStackFrameFilter = function (frame) {
    return !/(dexie\.js|dexie\.min\.js)/.test(frame);
};

setDebug(debug, dexieStackFrameFilter);

function Dexie(dbName, options) {
    /// <param name="options" type="Object" optional="true">Specify only if you wich to control which addons that should run on this instance</param>
    var deps = Dexie.dependencies;
    var opts = extend({
        // Default Options
        addons: Dexie.addons, // Pick statically registered addons by default
        autoOpen: true, // Don't require db.open() explicitely.
        indexedDB: deps.indexedDB, // Backend IndexedDB api. Default to IDBShim or browser env.
        IDBKeyRange: deps.IDBKeyRange // Backend IDBKeyRange api. Default to IDBShim or browser env.
    }, options);
    var addons = opts.addons,
        autoOpen = opts.autoOpen,
        indexedDB = opts.indexedDB,
        IDBKeyRange = opts.IDBKeyRange;

    var globalSchema = this._dbSchema = {};
    var versions = [];
    var dbStoreNames = [];
    var allTables = {};
    ///<var type="IDBDatabase" />
    var idbdb = null; // Instance of IDBDatabase
    var dbOpenError = null;
    var isBeingOpened = false;
    var openComplete = false;
    var READONLY = "readonly",
        READWRITE = "readwrite";
    var db = this;
    var dbReadyResolve,
        dbReadyPromise = new Promise(function (resolve) {
        dbReadyResolve = resolve;
    }),
        cancelOpen,
        openCanceller = new Promise(function (_, reject) {
        cancelOpen = reject;
    });
    var autoSchema = true;
    var hasNativeGetDatabaseNames = !!getNativeGetDatabaseNamesFn(indexedDB),
        hasGetAll;

    function init() {
        // Default subscribers to "versionchange" and "blocked".
        // Can be overridden by custom handlers. If custom handlers return false, these default
        // behaviours will be prevented.
        db.on("versionchange", function (ev) {
            // Default behavior for versionchange event is to close database connection.
            // Caller can override this behavior by doing db.on("versionchange", function(){ return false; });
            // Let's not block the other window from making it's delete() or open() call.
            // NOTE! This event is never fired in IE,Edge or Safari.
            if (ev.newVersion > 0) console.warn('Another connection wants to upgrade database \'' + db.name + '\'. Closing db now to resume the upgrade.');else console.warn('Another connection wants to delete database \'' + db.name + '\'. Closing db now to resume the delete request.');
            db.close();
            // In many web applications, it would be recommended to force window.reload()
            // when this event occurs. To do that, subscribe to the versionchange event
            // and call window.location.reload(true) if ev.newVersion > 0 (not a deletion)
            // The reason for this is that your current web app obviously has old schema code that needs
            // to be updated. Another window got a newer version of the app and needs to upgrade DB but
            // your window is blocking it unless we close it here.
        });
        db.on("blocked", function (ev) {
            if (!ev.newVersion || ev.newVersion < ev.oldVersion) console.warn('Dexie.delete(\'' + db.name + '\') was blocked');else console.warn('Upgrade \'' + db.name + '\' blocked by other connection holding version ' + ev.oldVersion / 10);
        });
    }

    //
    //
    //
    // ------------------------- Versioning Framework---------------------------
    //
    //
    //

    this.version = function (versionNumber) {
        /// <param name="versionNumber" type="Number"></param>
        /// <returns type="Version"></returns>
        if (idbdb || isBeingOpened) throw new exceptions.Schema("Cannot add version when database is open");
        this.verno = Math.max(this.verno, versionNumber);
        var versionInstance = versions.filter(function (v) {
            return v._cfg.version === versionNumber;
        })[0];
        if (versionInstance) return versionInstance;
        versionInstance = new Version(versionNumber);
        versions.push(versionInstance);
        versions.sort(lowerVersionFirst);
        return versionInstance;
    };

    function Version(versionNumber) {
        this._cfg = {
            version: versionNumber,
            storesSource: null,
            dbschema: {},
            tables: {},
            contentUpgrade: null
        };
        this.stores({}); // Derive earlier schemas by default.
    }

    extend(Version.prototype, {
        stores: function (stores) {
            /// <summary>
            ///   Defines the schema for a particular version
            /// </summary>
            /// <param name="stores" type="Object">
            /// Example: <br/>
            ///   {users: "id++,first,last,&amp;username,*email", <br/>
            ///   passwords: "id++,&amp;username"}<br/>
            /// <br/>
            /// Syntax: {Table: "[primaryKey][++],[&amp;][*]index1,[&amp;][*]index2,..."}<br/><br/>
            /// Special characters:<br/>
            ///  "&amp;"  means unique key, <br/>
            ///  "*"  means value is multiEntry, <br/>
            ///  "++" means auto-increment and only applicable for primary key <br/>
            /// </param>
            this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;

            // Derive stores from earlier versions if they are not explicitely specified as null or a new syntax.
            var storesSpec = {};
            versions.forEach(function (version) {
                // 'versions' is always sorted by lowest version first.
                extend(storesSpec, version._cfg.storesSource);
            });

            var dbschema = this._cfg.dbschema = {};
            this._parseStoresSpec(storesSpec, dbschema);
            // Update the latest schema to this version
            // Update API
            globalSchema = db._dbSchema = dbschema;
            removeTablesApi([allTables, db, Transaction.prototype]);
            setApiOnPlace([allTables, db, Transaction.prototype, this._cfg.tables], keys(dbschema), READWRITE, dbschema);
            dbStoreNames = keys(dbschema);
            return this;
        },
        upgrade: function (upgradeFunction) {
            /// <param name="upgradeFunction" optional="true">Function that performs upgrading actions.</param>
            var self = this;
            fakeAutoComplete(function () {
                upgradeFunction(db._createTransaction(READWRITE, keys(self._cfg.dbschema), self._cfg.dbschema)); // BUGBUG: No code completion for prev version's tables wont appear.
            });
            this._cfg.contentUpgrade = upgradeFunction;
            return this;
        },
        _parseStoresSpec: function (stores, outSchema) {
            keys(stores).forEach(function (tableName) {
                if (stores[tableName] !== null) {
                    var instanceTemplate = {};
                    var indexes = parseIndexSyntax(stores[tableName]);
                    var primKey = indexes.shift();
                    if (primKey.multi) throw new exceptions.Schema("Primary key cannot be multi-valued");
                    if (primKey.keyPath) setByKeyPath(instanceTemplate, primKey.keyPath, primKey.auto ? 0 : primKey.keyPath);
                    indexes.forEach(function (idx) {
                        if (idx.auto) throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
                        if (!idx.keyPath) throw new exceptions.Schema("Index must have a name and cannot be an empty string");
                        setByKeyPath(instanceTemplate, idx.keyPath, idx.compound ? idx.keyPath.map(function () {
                            return "";
                        }) : "");
                    });
                    outSchema[tableName] = new TableSchema(tableName, primKey, indexes, instanceTemplate);
                }
            });
        }
    });

    function runUpgraders(oldVersion, idbtrans, reject) {
        var trans = db._createTransaction(READWRITE, dbStoreNames, globalSchema);
        trans.create(idbtrans);
        trans._completion.catch(reject);
        var rejectTransaction = trans._reject.bind(trans);
        newScope(function () {
            PSD.trans = trans;
            if (oldVersion === 0) {
                // Create tables:
                keys(globalSchema).forEach(function (tableName) {
                    createTable(idbtrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
                });
                Promise.follow(function () {
                    return db.on.populate.fire(trans);
                }).catch(rejectTransaction);
            } else updateTablesAndIndexes(oldVersion, trans, idbtrans).catch(rejectTransaction);
        });
    }

    function updateTablesAndIndexes(oldVersion, trans, idbtrans) {
        // Upgrade version to version, step-by-step from oldest to newest version.
        // Each transaction object will contain the table set that was current in that version (but also not-yet-deleted tables from its previous version)
        var queue = [];
        var oldVersionStruct = versions.filter(function (version) {
            return version._cfg.version === oldVersion;
        })[0];
        if (!oldVersionStruct) throw new exceptions.Upgrade("Dexie specification of currently installed DB version is missing");
        globalSchema = db._dbSchema = oldVersionStruct._cfg.dbschema;
        var anyContentUpgraderHasRun = false;

        var versToRun = versions.filter(function (v) {
            return v._cfg.version > oldVersion;
        });
        versToRun.forEach(function (version) {
            /// <param name="version" type="Version"></param>
            queue.push(function () {
                var oldSchema = globalSchema;
                var newSchema = version._cfg.dbschema;
                adjustToExistingIndexNames(oldSchema, idbtrans);
                adjustToExistingIndexNames(newSchema, idbtrans);
                globalSchema = db._dbSchema = newSchema;
                var diff = getSchemaDiff(oldSchema, newSchema);
                // Add tables           
                diff.add.forEach(function (tuple) {
                    createTable(idbtrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
                });
                // Change tables
                diff.change.forEach(function (change) {
                    if (change.recreate) {
                        throw new exceptions.Upgrade("Not yet support for changing primary key");
                    } else {
                        var store = idbtrans.objectStore(change.name);
                        // Add indexes
                        change.add.forEach(function (idx) {
                            addIndex(store, idx);
                        });
                        // Update indexes
                        change.change.forEach(function (idx) {
                            store.deleteIndex(idx.name);
                            addIndex(store, idx);
                        });
                        // Delete indexes
                        change.del.forEach(function (idxName) {
                            store.deleteIndex(idxName);
                        });
                    }
                });
                if (version._cfg.contentUpgrade) {
                    anyContentUpgraderHasRun = true;
                    return Promise.follow(function () {
                        version._cfg.contentUpgrade(trans);
                    });
                }
            });
            queue.push(function (idbtrans) {
                if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
                    // Dont delete old tables if ieBug is present and a content upgrader has run. Let tables be left in DB so far. This needs to be taken care of.
                    var newSchema = version._cfg.dbschema;
                    // Delete old tables
                    deleteRemovedTables(newSchema, idbtrans);
                }
            });
        });

        // Now, create a queue execution engine
        function runQueue() {
            return queue.length ? Promise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) : Promise.resolve();
        }

        return runQueue().then(function () {
            createMissingTables(globalSchema, idbtrans); // At last, make sure to create any missing tables. (Needed by addons that add stores to DB without specifying version)
        });
    }

    function getSchemaDiff(oldSchema, newSchema) {
        var diff = {
            del: [], // Array of table names
            add: [], // Array of [tableName, newDefinition]
            change: [] // Array of {name: tableName, recreate: newDefinition, del: delIndexNames, add: newIndexDefs, change: changedIndexDefs}
        };
        for (var table in oldSchema) {
            if (!newSchema[table]) diff.del.push(table);
        }
        for (table in newSchema) {
            var oldDef = oldSchema[table],
                newDef = newSchema[table];
            if (!oldDef) {
                diff.add.push([table, newDef]);
            } else {
                var change = {
                    name: table,
                    def: newDef,
                    recreate: false,
                    del: [],
                    add: [],
                    change: []
                };
                if (oldDef.primKey.src !== newDef.primKey.src) {
                    // Primary key has changed. Remove and re-add table.
                    change.recreate = true;
                    diff.change.push(change);
                } else {
                    // Same primary key. Just find out what differs:
                    var oldIndexes = oldDef.idxByName;
                    var newIndexes = newDef.idxByName;
                    for (var idxName in oldIndexes) {
                        if (!newIndexes[idxName]) change.del.push(idxName);
                    }
                    for (idxName in newIndexes) {
                        var oldIdx = oldIndexes[idxName],
                            newIdx = newIndexes[idxName];
                        if (!oldIdx) change.add.push(newIdx);else if (oldIdx.src !== newIdx.src) change.change.push(newIdx);
                    }
                    if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
                        diff.change.push(change);
                    }
                }
            }
        }
        return diff;
    }

    function createTable(idbtrans, tableName, primKey, indexes) {
        /// <param name="idbtrans" type="IDBTransaction"></param>
        var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
        indexes.forEach(function (idx) {
            addIndex(store, idx);
        });
        return store;
    }

    function createMissingTables(newSchema, idbtrans) {
        keys(newSchema).forEach(function (tableName) {
            if (!idbtrans.db.objectStoreNames.contains(tableName)) {
                createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
            }
        });
    }

    function deleteRemovedTables(newSchema, idbtrans) {
        for (var i = 0; i < idbtrans.db.objectStoreNames.length; ++i) {
            var storeName = idbtrans.db.objectStoreNames[i];
            if (newSchema[storeName] == null) {
                idbtrans.db.deleteObjectStore(storeName);
            }
        }
    }

    function addIndex(store, idx) {
        store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
    }

    function dbUncaught(err) {
        return db.on.error.fire(err);
    }

    //
    //
    //      Dexie Protected API
    //
    //

    this._allTables = allTables;

    this._tableFactory = function createTable(mode, tableSchema) {
        /// <param name="tableSchema" type="TableSchema"></param>
        if (mode === READONLY) return new Table(tableSchema.name, tableSchema, Collection);else return new WriteableTable(tableSchema.name, tableSchema);
    };

    this._createTransaction = function (mode, storeNames, dbschema, parentTransaction) {
        return new Transaction(mode, storeNames, dbschema, parentTransaction);
    };

    /* Generate a temporary transaction when db operations are done outside a transactino scope.
    */
    function tempTransaction(mode, storeNames, fn) {
        // Last argument is "writeLocked". But this doesnt apply to oneshot direct db operations, so we ignore it.
        if (!openComplete && !PSD.letThrough) {
            if (!isBeingOpened) {
                if (!autoOpen) return rejection(new exceptions.DatabaseClosed(), dbUncaught);
                db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
            }
            return dbReadyPromise.then(function () {
                return tempTransaction(mode, storeNames, fn);
            });
        } else {
            var trans = db._createTransaction(mode, storeNames, globalSchema);
            return trans._promise(mode, function (resolve, reject) {
                newScope(function () {
                    // OPTIMIZATION POSSIBLE? newScope() not needed because it's already done in _promise.
                    PSD.trans = trans;
                    fn(resolve, reject, trans);
                });
            }).then(function (result) {
                // Instead of resolving value directly, wait with resolving it until transaction has completed.
                // Otherwise the data would not be in the DB if requesting it in the then() operation.
                // Specifically, to ensure that the following expression will work:
                //
                //   db.friends.put({name: "Arne"}).then(function () {
                //       db.friends.where("name").equals("Arne").count(function(count) {
                //           assert (count === 1);
                //       });
                //   });
                //
                return trans._completion.then(function () {
                    return result;
                });
            }); /*.catch(err => { // Don't do this as of now. If would affect bulk- and modify methods in a way that could be more intuitive. But wait! Maybe change in next major.
                 trans._reject(err);
                 return rejection(err);
                });*/
        }
    }

    this._whenReady = function (fn) {
        return new Promise(fake || openComplete || PSD.letThrough ? fn : function (resolve, reject) {
            if (!isBeingOpened) {
                if (!autoOpen) {
                    reject(new exceptions.DatabaseClosed());
                    return;
                }
                db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
            }
            dbReadyPromise.then(function () {
                fn(resolve, reject);
            });
        }).uncaught(dbUncaught);
    };

    //
    //
    //
    //
    //      Dexie API
    //
    //
    //

    this.verno = 0;

    this.open = function () {
        if (isBeingOpened || idbdb) return dbReadyPromise.then(function () {
            return dbOpenError ? rejection(dbOpenError, dbUncaught) : db;
        });
        debug && (openCanceller._stackHolder = getErrorWithStack()); // Let stacks point to when open() was called rather than where new Dexie() was called.
        isBeingOpened = true;
        dbOpenError = null;
        openComplete = false;

        // Function pointers to call when the core opening process completes.
        var resolveDbReady = dbReadyResolve,

        // upgradeTransaction to abort on failure.
        upgradeTransaction = null;

        return Promise.race([openCanceller, new Promise(function (resolve, reject) {
            doFakeAutoComplete(function () {
                return resolve();
            });

            // Make sure caller has specified at least one version
            if (versions.length > 0) autoSchema = false;

            // Multiply db.verno with 10 will be needed to workaround upgrading bug in IE:
            // IE fails when deleting objectStore after reading from it.
            // A future version of Dexie.js will stopover an intermediate version to workaround this.
            // At that point, we want to be backward compatible. Could have been multiplied with 2, but by using 10, it is easier to map the number to the real version number.

            // If no API, throw!
            if (!indexedDB) throw new exceptions.MissingAPI("indexedDB API not found. If using IE10+, make sure to run your code on a server URL " + "(not locally). If using old Safari versions, make sure to include indexedDB polyfill.");

            var req = autoSchema ? indexedDB.open(dbName) : indexedDB.open(dbName, Math.round(db.verno * 10));
            if (!req) throw new exceptions.MissingAPI("IndexedDB API not available"); // May happen in Safari private mode, see https://github.com/dfahlander/Dexie.js/issues/134
            req.onerror = wrap(eventRejectHandler(reject));
            req.onblocked = wrap(fireOnBlocked);
            req.onupgradeneeded = wrap(function (e) {
                upgradeTransaction = req.transaction;
                if (autoSchema && !db._allowEmptyDB) {
                    // Unless an addon has specified db._allowEmptyDB, lets make the call fail.
                    // Caller did not specify a version or schema. Doing that is only acceptable for opening alread existing databases.
                    // If onupgradeneeded is called it means database did not exist. Reject the open() promise and make sure that we
                    // do not create a new database by accident here.
                    req.onerror = preventDefault; // Prohibit onabort error from firing before we're done!
                    upgradeTransaction.abort(); // Abort transaction (would hope that this would make DB disappear but it doesnt.)
                    // Close database and delete it.
                    req.result.close();
                    var delreq = indexedDB.deleteDatabase(dbName); // The upgrade transaction is atomic, and javascript is single threaded - meaning that there is no risk that we delete someone elses database here!
                    delreq.onsuccess = delreq.onerror = wrap(function () {
                        reject(new exceptions.NoSuchDatabase('Database ' + dbName + ' doesnt exist'));
                    });
                } else {
                    upgradeTransaction.onerror = wrap(eventRejectHandler(reject));
                    var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion; // Safari 8 fix.
                    runUpgraders(oldVer / 10, upgradeTransaction, reject, req);
                }
            }, reject);

            req.onsuccess = wrap(function () {
                // Core opening procedure complete. Now let's just record some stuff.
                upgradeTransaction = null;
                idbdb = req.result;
                connections.push(db); // Used for emulating versionchange event on IE/Edge/Safari.

                if (autoSchema) readGlobalSchema();else if (idbdb.objectStoreNames.length > 0) {
                    try {
                        adjustToExistingIndexNames(globalSchema, idbdb.transaction(safariMultiStoreFix(idbdb.objectStoreNames), READONLY));
                    } catch (e) {
                        // Safari may bail out if > 1 store names. However, this shouldnt be a showstopper. Issue #120.
                    }
                }

                idbdb.onversionchange = wrap(function (ev) {
                    db._vcFired = true; // detect implementations that not support versionchange (IE/Edge/Safari)
                    db.on("versionchange").fire(ev);
                });

                if (!hasNativeGetDatabaseNames) {
                    // Update localStorage with list of database names
                    globalDatabaseList(function (databaseNames) {
                        if (databaseNames.indexOf(dbName) === -1) return databaseNames.push(dbName);
                    });
                }

                resolve();
            }, reject);
        })]).then(function () {
            // Before finally resolving the dbReadyPromise and this promise,
            // call and await all on('ready') subscribers:
            // Dexie.vip() makes subscribers able to use the database while being opened.
            // This is a must since these subscribers take part of the opening procedure.
            return Dexie.vip(db.on.ready.fire);
        }).then(function () {
            // Resolve the db.open() with the db instance.
            isBeingOpened = false;
            return db;
        }).catch(function (err) {
            try {
                // Did we fail within onupgradeneeded? Make sure to abort the upgrade transaction so it doesnt commit.
                upgradeTransaction && upgradeTransaction.abort();
            } catch (e) {}
            isBeingOpened = false; // Set before calling db.close() so that it doesnt reject openCanceller again (leads to unhandled rejection event).
            db.close(); // Closes and resets idbdb, removes connections, resets dbReadyPromise and openCanceller so that a later db.open() is fresh.
            // A call to db.close() may have made on-ready subscribers fail. Use dbOpenError if set, since err could be a follow-up error on that.
            dbOpenError = err; // Record the error. It will be used to reject further promises of db operations.
            return rejection(dbOpenError, dbUncaught); // dbUncaught will make sure any error that happened in any operation before will now bubble to db.on.error() thanks to the special handling in Promise.uncaught().
        }).finally(function () {
            openComplete = true;
            resolveDbReady(); // dbReadyPromise is resolved no matter if open() rejects or resolved. It's just to wake up waiters.
        });
    };

    this.close = function () {
        var idx = connections.indexOf(db);
        if (idx >= 0) connections.splice(idx, 1);
        if (idbdb) {
            try {
                idbdb.close();
            } catch (e) {}
            idbdb = null;
        }
        autoOpen = false;
        dbOpenError = new exceptions.DatabaseClosed();
        if (isBeingOpened) cancelOpen(dbOpenError);
        // Reset dbReadyPromise promise:
        dbReadyPromise = new Promise(function (resolve) {
            dbReadyResolve = resolve;
        });
        openCanceller = new Promise(function (_, reject) {
            cancelOpen = reject;
        });
    };

    this.delete = function () {
        var hasArguments = arguments.length > 0;
        return new Promise(function (resolve, reject) {
            if (hasArguments) throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
            if (isBeingOpened) {
                dbReadyPromise.then(doDelete);
            } else {
                doDelete();
            }
            function doDelete() {
                db.close();
                var req = indexedDB.deleteDatabase(dbName);
                req.onsuccess = wrap(function () {
                    if (!hasNativeGetDatabaseNames) {
                        globalDatabaseList(function (databaseNames) {
                            var pos = databaseNames.indexOf(dbName);
                            if (pos >= 0) return databaseNames.splice(pos, 1);
                        });
                    }
                    resolve();
                });
                req.onerror = wrap(eventRejectHandler(reject));
                req.onblocked = fireOnBlocked;
            }
        }).uncaught(dbUncaught);
    };

    this.backendDB = function () {
        return idbdb;
    };

    this.isOpen = function () {
        return idbdb !== null;
    };
    this.hasFailed = function () {
        return dbOpenError !== null;
    };
    this.dynamicallyOpened = function () {
        return autoSchema;
    };

    //
    // Properties
    //
    this.name = dbName;

    // db.tables - an array of all Table instances.
    setProp(this, "tables", {
        get: function () {
            /// <returns type="Array" elementType="WriteableTable" />
            return keys(allTables).map(function (name) {
                return allTables[name];
            });
        }
    });

    //
    // Events
    //
    this.on = Events(this, "error", "populate", "blocked", "versionchange", { ready: [promisableChain, nop] });
    this.on.error.subscribe = deprecated("Dexie.on.error", this.on.error.subscribe);
    this.on.error.unsubscribe = deprecated("Dexie.on.error.unsubscribe", this.on.error.unsubscribe);

    this.on.ready.subscribe = override(this.on.ready.subscribe, function (subscribe) {
        return function (subscriber, bSticky) {
            Dexie.vip(function () {
                if (openComplete) {
                    // Database already open. Call subscriber asap.
                    if (!dbOpenError) Promise.resolve().then(subscriber);
                    // bSticky: Also subscribe to future open sucesses (after close / reopen) 
                    if (bSticky) subscribe(subscriber);
                } else {
                    // Database not yet open. Subscribe to it.
                    subscribe(subscriber);
                    // If bSticky is falsy, make sure to unsubscribe subscriber when fired once.
                    if (!bSticky) subscribe(function unsubscribe() {
                        db.on.ready.unsubscribe(subscriber);
                        db.on.ready.unsubscribe(unsubscribe);
                    });
                }
            });
        };
    });

    fakeAutoComplete(function () {
        db.on("populate").fire(db._createTransaction(READWRITE, dbStoreNames, globalSchema));
        db.on("error").fire(new Error());
    });

    this.transaction = function (mode, tableInstances, scopeFunc) {
        /// <summary>
        ///
        /// </summary>
        /// <param name="mode" type="String">"r" for readonly, or "rw" for readwrite</param>
        /// <param name="tableInstances">Table instance, Array of Table instances, String or String Array of object stores to include in the transaction</param>
        /// <param name="scopeFunc" type="Function">Function to execute with transaction</param>

        // Let table arguments be all arguments between mode and last argument.
        var i = arguments.length;
        if (i < 2) throw new exceptions.InvalidArgument("Too few arguments");
        // Prevent optimzation killer (https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments)
        // and clone arguments except the first one into local var 'args'.
        var args = new Array(i - 1);
        while (--i) {
            args[i - 1] = arguments[i];
        } // Let scopeFunc be the last argument and pop it so that args now only contain the table arguments.
        scopeFunc = args.pop();
        var tables = flatten(args); // Support using array as middle argument, or a mix of arrays and non-arrays.
        var parentTransaction = PSD.trans;
        // Check if parent transactions is bound to this db instance, and if caller wants to reuse it
        if (!parentTransaction || parentTransaction.db !== db || mode.indexOf('!') !== -1) parentTransaction = null;
        var onlyIfCompatible = mode.indexOf('?') !== -1;
        mode = mode.replace('!', '').replace('?', ''); // Ok. Will change arguments[0] as well but we wont touch arguments henceforth.

        try {
            //
            // Get storeNames from arguments. Either through given table instances, or through given table names.
            //
            var storeNames = tables.map(function (table) {
                var storeName = table instanceof Table ? table.name : table;
                if (typeof storeName !== 'string') throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
                return storeName;
            });

            //
            // Resolve mode. Allow shortcuts "r" and "rw".
            //
            if (mode == "r" || mode == READONLY) mode = READONLY;else if (mode == "rw" || mode == READWRITE) mode = READWRITE;else throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);

            if (parentTransaction) {
                // Basic checks
                if (parentTransaction.mode === READONLY && mode === READWRITE) {
                    if (onlyIfCompatible) {
                        // Spawn new transaction instead.
                        parentTransaction = null;
                    } else throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
                }
                if (parentTransaction) {
                    storeNames.forEach(function (storeName) {
                        if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                            if (onlyIfCompatible) {
                                // Spawn new transaction instead.
                                parentTransaction = null;
                            } else throw new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction.");
                        }
                    });
                }
            }
        } catch (e) {
            return parentTransaction ? parentTransaction._promise(null, function (_, reject) {
                reject(e);
            }) : rejection(e, dbUncaught);
        }
        // If this is a sub-transaction, lock the parent and then launch the sub-transaction.
        return parentTransaction ? parentTransaction._promise(mode, enterTransactionScope, "lock") : db._whenReady(enterTransactionScope);

        function enterTransactionScope(resolve) {
            var parentPSD = PSD;
            resolve(Promise.resolve().then(function () {
                return newScope(function () {
                    // Keep a pointer to last non-transactional PSD to use if someone calls Dexie.ignoreTransaction().
                    PSD.transless = PSD.transless || parentPSD;
                    // Our transaction.
                    //return new Promise((resolve, reject) => {
                    var trans = db._createTransaction(mode, storeNames, globalSchema, parentTransaction);
                    // Let the transaction instance be part of a Promise-specific data (PSD) value.
                    PSD.trans = trans;

                    if (parentTransaction) {
                        // Emulate transaction commit awareness for inner transaction (must 'commit' when the inner transaction has no more operations ongoing)
                        trans.idbtrans = parentTransaction.idbtrans;
                    } else {
                        trans.create(); // Create the backend transaction so that complete() or error() will trigger even if no operation is made upon it.
                    }

                    // Provide arguments to the scope function (for backward compatibility)
                    var tableArgs = storeNames.map(function (name) {
                        return allTables[name];
                    });
                    tableArgs.push(trans);

                    var returnValue;
                    return Promise.follow(function () {
                        // Finally, call the scope function with our table and transaction arguments.
                        returnValue = scopeFunc.apply(trans, tableArgs); // NOTE: returnValue is used in trans.on.complete() not as a returnValue to this func.
                        if (returnValue) {
                            if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
                                // scopeFunc returned an iterator with throw-support. Handle yield as await.
                                returnValue = awaitIterator(returnValue);
                            } else if (typeof returnValue.then === 'function' && !hasOwn(returnValue, '_PSD')) {
                                throw new exceptions.IncompatiblePromise("Incompatible Promise returned from transaction scope (read more at http://tinyurl.com/znyqjqc). Transaction scope: " + scopeFunc.toString());
                            }
                        }
                    }).uncaught(dbUncaught).then(function () {
                        if (parentTransaction) trans._resolve(); // sub transactions don't react to idbtrans.oncomplete. We must trigger a acompletion.
                        return trans._completion; // Even if WE believe everything is fine. Await IDBTransaction's oncomplete or onerror as well.
                    }).then(function () {
                        return returnValue;
                    }).catch(function (e) {
                        //reject(e);
                        trans._reject(e); // Yes, above then-handler were maybe not called because of an unhandled rejection in scopeFunc!
                        return rejection(e);
                    });
                    //});
                });
            }));
        }
    };

    this.table = function (tableName) {
        /// <returns type="WriteableTable"></returns>
        if (fake && autoSchema) return new WriteableTable(tableName);
        if (!hasOwn(allTables, tableName)) {
            throw new exceptions.InvalidTable('Table ' + tableName + ' does not exist');
        }
        return allTables[tableName];
    };

    //
    //
    //
    // Table Class
    //
    //
    //
    function Table(name, tableSchema, collClass) {
        /// <param name="name" type="String"></param>
        this.name = name;
        this.schema = tableSchema;
        this.hook = allTables[name] ? allTables[name].hook : Events(null, {
            "creating": [hookCreatingChain, nop],
            "reading": [pureFunctionChain, mirror],
            "updating": [hookUpdatingChain, nop],
            "deleting": [hookDeletingChain, nop]
        });
        this._collClass = collClass || Collection;
    }

    props(Table.prototype, {

        //
        // Table Protected Methods
        //

        _trans: function getTransaction(mode, fn, writeLocked) {
            var trans = PSD.trans;
            return trans && trans.db === db ? trans._promise(mode, fn, writeLocked) : tempTransaction(mode, [this.name], fn);
        },
        _idbstore: function getIDBObjectStore(mode, fn, writeLocked) {
            if (fake) return new Promise(fn); // Simplify the work for Intellisense/Code completion.
            var trans = PSD.trans,
                tableName = this.name;
            function supplyIdbStore(resolve, reject, trans) {
                fn(resolve, reject, trans.idbtrans.objectStore(tableName), trans);
            }
            return trans && trans.db === db ? trans._promise(mode, supplyIdbStore, writeLocked) : tempTransaction(mode, [this.name], supplyIdbStore);
        },

        //
        // Table Public Methods
        //
        get: function (key, cb) {
            var self = this;
            return this._idbstore(READONLY, function (resolve, reject, idbstore) {
                fake && resolve(self.schema.instanceTemplate);
                var req = idbstore.get(key);
                req.onerror = eventRejectHandler(reject);
                req.onsuccess = wrap(function () {
                    resolve(self.hook.reading.fire(req.result));
                }, reject);
            }).then(cb);
        },
        where: function (indexName) {
            return new WhereClause(this, indexName);
        },
        count: function (cb) {
            return this.toCollection().count(cb);
        },
        offset: function (offset) {
            return this.toCollection().offset(offset);
        },
        limit: function (numRows) {
            return this.toCollection().limit(numRows);
        },
        reverse: function () {
            return this.toCollection().reverse();
        },
        filter: function (filterFunction) {
            return this.toCollection().and(filterFunction);
        },
        each: function (fn) {
            return this.toCollection().each(fn);
        },
        toArray: function (cb) {
            return this.toCollection().toArray(cb);
        },
        orderBy: function (index) {
            return new this._collClass(new WhereClause(this, index));
        },

        toCollection: function () {
            return new this._collClass(new WhereClause(this));
        },

        mapToClass: function (constructor, structure) {
            /// <summary>
            ///     Map table to a javascript constructor function. Objects returned from the database will be instances of this class, making
            ///     it possible to the instanceOf operator as well as extending the class using constructor.prototype.method = function(){...}.
            /// </summary>
            /// <param name="constructor">Constructor function representing the class.</param>
            /// <param name="structure" optional="true">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
            /// know what type each member has. Example: {name: String, emailAddresses: [String], password}</param>
            this.schema.mappedClass = constructor;
            var instanceTemplate = Object.create(constructor.prototype);
            if (structure) {
                // structure and instanceTemplate is for IDE code competion only while constructor.prototype is for actual inheritance.
                applyStructure(instanceTemplate, structure);
            }
            this.schema.instanceTemplate = instanceTemplate;

            // Now, subscribe to the when("reading") event to make all objects that come out from this table inherit from given class
            // no matter which method to use for reading (Table.get() or Table.where(...)... )
            var readHook = function (obj) {
                if (!obj) return obj; // No valid object. (Value is null). Return as is.
                // Create a new object that derives from constructor:
                var res = Object.create(constructor.prototype);
                // Clone members:
                for (var m in obj) {
                    if (hasOwn(obj, m)) try {
                        res[m] = obj[m];
                    } catch (_) {}
                }return res;
            };

            if (this.schema.readHook) {
                this.hook.reading.unsubscribe(this.schema.readHook);
            }
            this.schema.readHook = readHook;
            this.hook("reading", readHook);
            return constructor;
        },
        defineClass: function (structure) {
            /// <summary>
            ///     Define all members of the class that represents the table. This will help code completion of when objects are read from the database
            ///     as well as making it possible to extend the prototype of the returned constructor function.
            /// </summary>
            /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
            /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>
            return this.mapToClass(Dexie.defineClass(structure), structure);
        }
    });

    //
    //
    //
    // WriteableTable Class (extends Table)
    //
    //
    //
    function WriteableTable(name, tableSchema, collClass) {
        Table.call(this, name, tableSchema, collClass || WriteableCollection);
    }

    function BulkErrorHandlerCatchAll(errorList, done, supportHooks) {
        return (supportHooks ? hookedEventRejectHandler : eventRejectHandler)(function (e) {
            errorList.push(e);
            done && done();
        });
    }

    function bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook) {
        // If hasDeleteHook, keysOrTuples must be an array of tuples: [[key1, value2],[key2,value2],...],
        // else keysOrTuples must be just an array of keys: [key1, key2, ...].
        return new Promise(function (resolve, reject) {
            var len = keysOrTuples.length,
                lastItem = len - 1;
            if (len === 0) return resolve();
            if (!hasDeleteHook) {
                for (var i = 0; i < len; ++i) {
                    var req = idbstore.delete(keysOrTuples[i]);
                    req.onerror = wrap(eventRejectHandler(reject));
                    if (i === lastItem) req.onsuccess = wrap(function () {
                        return resolve();
                    });
                }
            } else {
                var hookCtx,
                    errorHandler = hookedEventRejectHandler(reject),
                    successHandler = hookedEventSuccessHandler(null);
                tryCatch(function () {
                    for (var i = 0; i < len; ++i) {
                        hookCtx = { onsuccess: null, onerror: null };
                        var tuple = keysOrTuples[i];
                        deletingHook.call(hookCtx, tuple[0], tuple[1], trans);
                        var req = idbstore.delete(tuple[0]);
                        req._hookCtx = hookCtx;
                        req.onerror = errorHandler;
                        if (i === lastItem) req.onsuccess = hookedEventSuccessHandler(resolve);else req.onsuccess = successHandler;
                    }
                }, function (err) {
                    hookCtx.onerror && hookCtx.onerror(err);
                    throw err;
                });
            }
        }).uncaught(dbUncaught);
    }

    derive(WriteableTable).from(Table).extend({
        bulkDelete: function (keys$$1) {
            if (this.hook.deleting.fire === nop) {
                return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                    resolve(bulkDelete(idbstore, trans, keys$$1, false, nop));
                });
            } else {
                return this.where(':id').anyOf(keys$$1).delete().then(function () {}); // Resolve with undefined.
            }
        },
        bulkPut: function (objects, keys$$1) {
            var _this = this;

            return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                if (!idbstore.keyPath && !_this.schema.primKey.auto && !keys$$1) throw new exceptions.InvalidArgument("bulkPut() with non-inbound keys requires keys array in second argument");
                if (idbstore.keyPath && keys$$1) throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
                if (keys$$1 && keys$$1.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                if (objects.length === 0) return resolve(); // Caller provided empty list.
                var done = function (result) {
                    if (errorList.length === 0) resolve(result);else reject(new BulkError(_this.name + '.bulkPut(): ' + errorList.length + ' of ' + numObjs + ' operations failed', errorList));
                };
                var req,
                    errorList = [],
                    errorHandler,
                    numObjs = objects.length,
                    table = _this;
                if (_this.hook.creating.fire === nop && _this.hook.updating.fire === nop) {
                    //
                    // Standard Bulk (no 'creating' or 'updating' hooks to care about)
                    //
                    errorHandler = BulkErrorHandlerCatchAll(errorList);
                    for (var i = 0, l = objects.length; i < l; ++i) {
                        req = keys$$1 ? idbstore.put(objects[i], keys$$1[i]) : idbstore.put(objects[i]);
                        req.onerror = errorHandler;
                    }
                    // Only need to catch success or error on the last operation
                    // according to the IDB spec.
                    req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                    req.onsuccess = eventSuccessHandler(done);
                } else {
                    var effectiveKeys = keys$$1 || idbstore.keyPath && objects.map(function (o) {
                        return getByKeyPath(o, idbstore.keyPath);
                    });
                    // Generate map of {[key]: object}
                    var objectLookup = effectiveKeys && arrayToObject(effectiveKeys, function (key, i) {
                        return key != null && [key, objects[i]];
                    });
                    var promise = !effectiveKeys ?

                    // Auto-incremented key-less objects only without any keys argument.
                    table.bulkAdd(objects) :

                    // Keys provided. Either as inbound in provided objects, or as a keys argument.
                    // Begin with updating those that exists in DB:
                    table.where(':id').anyOf(effectiveKeys.filter(function (key) {
                        return key != null;
                    })).modify(function () {
                        this.value = objectLookup[this.primKey];
                        objectLookup[this.primKey] = null; // Mark as "don't add this"
                    }).catch(ModifyError, function (e) {
                        errorList = e.failures; // No need to concat here. These are the first errors added.
                    }).then(function () {
                        // Now, let's examine which items didnt exist so we can add them:
                        var objsToAdd = [],
                            keysToAdd = keys$$1 && [];
                        // Iterate backwards. Why? Because if same key was used twice, just add the last one.
                        for (var i = effectiveKeys.length - 1; i >= 0; --i) {
                            var key = effectiveKeys[i];
                            if (key == null || objectLookup[key]) {
                                objsToAdd.push(objects[i]);
                                keys$$1 && keysToAdd.push(key);
                                if (key != null) objectLookup[key] = null; // Mark as "dont add again"
                            }
                        }
                        // The items are in reverse order so reverse them before adding.
                        // Could be important in order to get auto-incremented keys the way the caller
                        // would expect. Could have used unshift instead of push()/reverse(),
                        // but: http://jsperf.com/unshift-vs-reverse
                        objsToAdd.reverse();
                        keys$$1 && keysToAdd.reverse();
                        return table.bulkAdd(objsToAdd, keysToAdd);
                    }).then(function (lastAddedKey) {
                        // Resolve with key of the last object in given arguments to bulkPut():
                        var lastEffectiveKey = effectiveKeys[effectiveKeys.length - 1]; // Key was provided.
                        return lastEffectiveKey != null ? lastEffectiveKey : lastAddedKey;
                    });

                    promise.then(done).catch(BulkError, function (e) {
                        // Concat failure from ModifyError and reject using our 'done' method.
                        errorList = errorList.concat(e.failures);
                        done();
                    }).catch(reject);
                }
            }, "locked"); // If called from transaction scope, lock transaction til all steps are done.
        },
        bulkAdd: function (objects, keys$$1) {
            var self = this,
                creatingHook = this.hook.creating.fire;
            return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                if (!idbstore.keyPath && !self.schema.primKey.auto && !keys$$1) throw new exceptions.InvalidArgument("bulkAdd() with non-inbound keys requires keys array in second argument");
                if (idbstore.keyPath && keys$$1) throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
                if (keys$$1 && keys$$1.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                if (objects.length === 0) return resolve(); // Caller provided empty list.
                function done(result) {
                    if (errorList.length === 0) resolve(result);else reject(new BulkError(self.name + '.bulkAdd(): ' + errorList.length + ' of ' + numObjs + ' operations failed', errorList));
                }
                var req,
                    errorList = [],
                    errorHandler,
                    successHandler,
                    numObjs = objects.length;
                if (creatingHook !== nop) {
                    //
                    // There are subscribers to hook('creating')
                    // Must behave as documented.
                    //
                    var keyPath = idbstore.keyPath,
                        hookCtx;
                    errorHandler = BulkErrorHandlerCatchAll(errorList, null, true);
                    successHandler = hookedEventSuccessHandler(null);

                    tryCatch(function () {
                        for (var i = 0, l = objects.length; i < l; ++i) {
                            hookCtx = { onerror: null, onsuccess: null };
                            var key = keys$$1 && keys$$1[i];
                            var obj = objects[i],
                                effectiveKey = keys$$1 ? key : keyPath ? getByKeyPath(obj, keyPath) : undefined,
                                keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans);
                            if (effectiveKey == null && keyToUse != null) {
                                if (keyPath) {
                                    obj = deepClone(obj);
                                    setByKeyPath(obj, keyPath, keyToUse);
                                } else {
                                    key = keyToUse;
                                }
                            }
                            req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
                            req._hookCtx = hookCtx;
                            if (i < l - 1) {
                                req.onerror = errorHandler;
                                if (hookCtx.onsuccess) req.onsuccess = successHandler;
                            }
                        }
                    }, function (err) {
                        hookCtx.onerror && hookCtx.onerror(err);
                        throw err;
                    });

                    req.onerror = BulkErrorHandlerCatchAll(errorList, done, true);
                    req.onsuccess = hookedEventSuccessHandler(done);
                } else {
                    //
                    // Standard Bulk (no 'creating' hook to care about)
                    //
                    errorHandler = BulkErrorHandlerCatchAll(errorList);
                    for (var i = 0, l = objects.length; i < l; ++i) {
                        req = keys$$1 ? idbstore.add(objects[i], keys$$1[i]) : idbstore.add(objects[i]);
                        req.onerror = errorHandler;
                    }
                    // Only need to catch success or error on the last operation
                    // according to the IDB spec.
                    req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                    req.onsuccess = eventSuccessHandler(done);
                }
            });
        },
        add: function (obj, key) {
            /// <summary>
            ///   Add an object to the database. In case an object with same primary key already exists, the object will not be added.
            /// </summary>
            /// <param name="obj" type="Object">A javascript object to insert</param>
            /// <param name="key" optional="true">Primary key</param>
            var creatingHook = this.hook.creating.fire;
            return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                var hookCtx = { onsuccess: null, onerror: null };
                if (creatingHook !== nop) {
                    var effectiveKey = key != null ? key : idbstore.keyPath ? getByKeyPath(obj, idbstore.keyPath) : undefined;
                    var keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans); // Allow subscribers to when("creating") to generate the key.
                    if (effectiveKey == null && keyToUse != null) {
                        // Using "==" and "!=" to check for either null or undefined!
                        if (idbstore.keyPath) setByKeyPath(obj, idbstore.keyPath, keyToUse);else key = keyToUse;
                    }
                }
                try {
                    var req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
                    req._hookCtx = hookCtx;
                    req.onerror = hookedEventRejectHandler(reject);
                    req.onsuccess = hookedEventSuccessHandler(function (result) {
                        // TODO: Remove these two lines in next major release (2.0?)
                        // It's no good practice to have side effects on provided parameters
                        var keyPath = idbstore.keyPath;
                        if (keyPath) setByKeyPath(obj, keyPath, result);
                        resolve(result);
                    });
                } catch (e) {
                    if (hookCtx.onerror) hookCtx.onerror(e);
                    throw e;
                }
            });
        },

        put: function (obj, key) {
            /// <summary>
            ///   Add an object to the database but in case an object with same primary key alread exists, the existing one will get updated.
            /// </summary>
            /// <param name="obj" type="Object">A javascript object to insert or update</param>
            /// <param name="key" optional="true">Primary key</param>
            var self = this,
                creatingHook = this.hook.creating.fire,
                updatingHook = this.hook.updating.fire;
            if (creatingHook !== nop || updatingHook !== nop) {
                //
                // People listens to when("creating") or when("updating") events!
                // We must know whether the put operation results in an CREATE or UPDATE.
                //
                return this._trans(READWRITE, function (resolve, reject, trans) {
                    // Since key is optional, make sure we get it from obj if not provided
                    var effectiveKey = key !== undefined ? key : self.schema.primKey.keyPath && getByKeyPath(obj, self.schema.primKey.keyPath);
                    if (effectiveKey == null) {
                        // "== null" means checking for either null or undefined.
                        // No primary key. Must use add().
                        self.add(obj).then(resolve, reject);
                    } else {
                        // Primary key exist. Lock transaction and try modifying existing. If nothing modified, call add().
                        trans._lock(); // Needed because operation is splitted into modify() and add().
                        // clone obj before this async call. If caller modifies obj the line after put(), the IDB spec requires that it should not affect operation.
                        obj = deepClone(obj);
                        self.where(":id").equals(effectiveKey).modify(function () {
                            // Replace extisting value with our object
                            // CRUD event firing handled in WriteableCollection.modify()
                            this.value = obj;
                        }).then(function (count) {
                            if (count === 0) {
                                // Object's key was not found. Add the object instead.
                                // CRUD event firing will be done in add()
                                return self.add(obj, key); // Resolving with another Promise. Returned Promise will then resolve with the new key.
                            } else {
                                return effectiveKey; // Resolve with the provided key.
                            }
                        }).finally(function () {
                            trans._unlock();
                        }).then(resolve, reject);
                    }
                });
            } else {
                // Use the standard IDB put() method.
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = key !== undefined ? idbstore.put(obj, key) : idbstore.put(obj);
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = function (ev) {
                        var keyPath = idbstore.keyPath;
                        if (keyPath) setByKeyPath(obj, keyPath, ev.target.result);
                        resolve(req.result);
                    };
                });
            }
        },

        'delete': function (key) {
            /// <param name="key">Primary key of the object to delete</param>
            if (this.hook.deleting.subscribers.length) {
                // People listens to when("deleting") event. Must implement delete using WriteableCollection.delete() that will
                // call the CRUD event. Only WriteableCollection.delete() will know whether an object was actually deleted.
                return this.where(":id").equals(key).delete();
            } else {
                // No one listens. Use standard IDB delete() method.
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = idbstore.delete(key);
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = function () {
                        resolve(req.result);
                    };
                });
            }
        },

        clear: function () {
            if (this.hook.deleting.subscribers.length) {
                // People listens to when("deleting") event. Must implement delete using WriteableCollection.delete() that will
                // call the CRUD event. Only WriteableCollection.delete() will knows which objects that are actually deleted.
                return this.toCollection().delete();
            } else {
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = idbstore.clear();
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = function () {
                        resolve(req.result);
                    };
                });
            }
        },

        update: function (keyOrObject, modifications) {
            if (typeof modifications !== 'object' || isArray(modifications)) throw new exceptions.InvalidArgument("Modifications must be an object.");
            if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
                // object to modify. Also modify given object with the modifications:
                keys(modifications).forEach(function (keyPath) {
                    setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
                });
                var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
                if (key === undefined) return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"), dbUncaught);
                return this.where(":id").equals(key).modify(modifications);
            } else {
                // key to modify
                return this.where(":id").equals(keyOrObject).modify(modifications);
            }
        }
    });

    //
    //
    //
    // Transaction Class
    //
    //
    //
    function Transaction(mode, storeNames, dbschema, parent) {
        var _this2 = this;

        /// <summary>
        ///    Transaction class. Represents a database transaction. All operations on db goes through a Transaction.
        /// </summary>
        /// <param name="mode" type="String">Any of "readwrite" or "readonly"</param>
        /// <param name="storeNames" type="Array">Array of table names to operate on</param>
        this.db = db;
        this.mode = mode;
        this.storeNames = storeNames;
        this.idbtrans = null;
        this.on = Events(this, "complete", "error", "abort");
        this.parent = parent || null;
        this.active = true;
        this._tables = null;
        this._reculock = 0;
        this._blockedFuncs = [];
        this._psd = null;
        this._dbschema = dbschema;
        this._resolve = null;
        this._reject = null;
        this._completion = new Promise(function (resolve, reject) {
            _this2._resolve = resolve;
            _this2._reject = reject;
        }).uncaught(dbUncaught);

        this._completion.then(function () {
            _this2.on.complete.fire();
        }, function (e) {
            _this2.on.error.fire(e);
            _this2.parent ? _this2.parent._reject(e) : _this2.active && _this2.idbtrans && _this2.idbtrans.abort();
            _this2.active = false;
            return rejection(e); // Indicate we actually DO NOT catch this error.
        });
    }

    props(Transaction.prototype, {
        //
        // Transaction Protected Methods (not required by API users, but needed internally and eventually by dexie extensions)
        //
        _lock: function () {
            assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
            // Temporary set all requests into a pending queue if they are called before database is ready.
            ++this._reculock; // Recursive read/write lock pattern using PSD (Promise Specific Data) instead of TLS (Thread Local Storage)
            if (this._reculock === 1 && !PSD.global) PSD.lockOwnerFor = this;
            return this;
        },
        _unlock: function () {
            assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
            if (--this._reculock === 0) {
                if (!PSD.global) PSD.lockOwnerFor = null;
                while (this._blockedFuncs.length > 0 && !this._locked()) {
                    var fnAndPSD = this._blockedFuncs.shift();
                    try {
                        usePSD(fnAndPSD[1], fnAndPSD[0]);
                    } catch (e) {}
                }
            }
            return this;
        },
        _locked: function () {
            // Checks if any write-lock is applied on this transaction.
            // To simplify the Dexie API for extension implementations, we support recursive locks.
            // This is accomplished by using "Promise Specific Data" (PSD).
            // PSD data is bound to a Promise and any child Promise emitted through then() or resolve( new Promise() ).
            // PSD is local to code executing on top of the call stacks of any of any code executed by Promise():
            //         * callback given to the Promise() constructor  (function (resolve, reject){...})
            //         * callbacks given to then()/catch()/finally() methods (function (value){...})
            // If creating a new independant Promise instance from within a Promise call stack, the new Promise will derive the PSD from the call stack of the parent Promise.
            // Derivation is done so that the inner PSD __proto__ points to the outer PSD.
            // PSD.lockOwnerFor will point to current transaction object if the currently executing PSD scope owns the lock.
            return this._reculock && PSD.lockOwnerFor !== this;
        },
        create: function (idbtrans) {
            var _this3 = this;

            assert(!this.idbtrans);
            if (!idbtrans && !idbdb) {
                switch (dbOpenError && dbOpenError.name) {
                    case "DatabaseClosedError":
                        // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
                        throw new exceptions.DatabaseClosed(dbOpenError);
                    case "MissingAPIError":
                        // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
                        throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
                    default:
                        // Make it clear that the user operation was not what caused the error - the error had occurred earlier on db.open()!
                        throw new exceptions.OpenFailed(dbOpenError);
                }
            }
            if (!this.active) throw new exceptions.TransactionInactive();
            assert(this._completion._state === null);

            idbtrans = this.idbtrans = idbtrans || idbdb.transaction(safariMultiStoreFix(this.storeNames), this.mode);
            idbtrans.onerror = wrap(function (ev) {
                preventDefault(ev); // Prohibit default bubbling to window.error
                _this3._reject(idbtrans.error);
            });
            idbtrans.onabort = wrap(function (ev) {
                preventDefault(ev);
                _this3.active && _this3._reject(new exceptions.Abort());
                _this3.active = false;
                _this3.on("abort").fire(ev);
            });
            idbtrans.oncomplete = wrap(function () {
                _this3.active = false;
                _this3._resolve();
            });
            return this;
        },
        _promise: function (mode, fn, bWriteLock) {
            var self = this;
            var p = self._locked() ?
            // Read lock always. Transaction is write-locked. Wait for mutex.
            new Promise(function (resolve, reject) {
                self._blockedFuncs.push([function () {
                    self._promise(mode, fn, bWriteLock).then(resolve, reject);
                }, PSD]);
            }) : newScope(function () {
                var p_ = self.active ? new Promise(function (resolve, reject) {
                    if (mode === READWRITE && self.mode !== READWRITE) throw new exceptions.ReadOnly("Transaction is readonly");
                    if (!self.idbtrans && mode) self.create();
                    if (bWriteLock) self._lock(); // Write lock if write operation is requested
                    fn(resolve, reject, self);
                }) : rejection(new exceptions.TransactionInactive());
                if (self.active && bWriteLock) p_.finally(function () {
                    self._unlock();
                });
                return p_;
            });

            p._lib = true;
            return p.uncaught(dbUncaught);
        },

        //
        // Transaction Public Properties and Methods
        //
        abort: function () {
            this.active && this._reject(new exceptions.Abort());
            this.active = false;
        },

        tables: {
            get: deprecated("Transaction.tables", function () {
                return arrayToObject(this.storeNames, function (name) {
                    return [name, allTables[name]];
                });
            }, "Use db.tables()")
        },

        complete: deprecated("Transaction.complete()", function (cb) {
            return this.on("complete", cb);
        }),

        error: deprecated("Transaction.error()", function (cb) {
            return this.on("error", cb);
        }),

        table: deprecated("Transaction.table()", function (name) {
            if (this.storeNames.indexOf(name) === -1) throw new exceptions.InvalidTable("Table " + name + " not in transaction");
            return allTables[name];
        })

    });

    //
    //
    //
    // WhereClause
    //
    //
    //
    function WhereClause(table, index, orCollection) {
        /// <param name="table" type="Table"></param>
        /// <param name="index" type="String" optional="true"></param>
        /// <param name="orCollection" type="Collection" optional="true"></param>
        this._ctx = {
            table: table,
            index: index === ":id" ? null : index,
            collClass: table._collClass,
            or: orCollection
        };
    }

    props(WhereClause.prototype, function () {

        // WhereClause private methods

        function fail(collectionOrWhereClause, err, T) {
            var collection = collectionOrWhereClause instanceof WhereClause ? new collectionOrWhereClause._ctx.collClass(collectionOrWhereClause) : collectionOrWhereClause;

            collection._ctx.error = T ? new T(err) : new TypeError(err);
            return collection;
        }

        function emptyCollection(whereClause) {
            return new whereClause._ctx.collClass(whereClause, function () {
                return IDBKeyRange.only("");
            }).limit(0);
        }

        function upperFactory(dir) {
            return dir === "next" ? function (s) {
                return s.toUpperCase();
            } : function (s) {
                return s.toLowerCase();
            };
        }
        function lowerFactory(dir) {
            return dir === "next" ? function (s) {
                return s.toLowerCase();
            } : function (s) {
                return s.toUpperCase();
            };
        }
        function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
            var length = Math.min(key.length, lowerNeedle.length);
            var llp = -1;
            for (var i = 0; i < length; ++i) {
                var lwrKeyChar = lowerKey[i];
                if (lwrKeyChar !== lowerNeedle[i]) {
                    if (cmp(key[i], upperNeedle[i]) < 0) return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
                    if (cmp(key[i], lowerNeedle[i]) < 0) return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
                    if (llp >= 0) return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
                    return null;
                }
                if (cmp(key[i], lwrKeyChar) < 0) llp = i;
            }
            if (length < lowerNeedle.length && dir === "next") return key + upperNeedle.substr(key.length);
            if (length < key.length && dir === "prev") return key.substr(0, upperNeedle.length);
            return llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
        }

        function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
            /// <param name="needles" type="Array" elementType="String"></param>
            var upper,
                lower,
                compare,
                upperNeedles,
                lowerNeedles,
                direction,
                nextKeySuffix,
                needlesLen = needles.length;
            if (!needles.every(function (s) {
                return typeof s === 'string';
            })) {
                return fail(whereClause, STRING_EXPECTED);
            }
            function initDirection(dir) {
                upper = upperFactory(dir);
                lower = lowerFactory(dir);
                compare = dir === "next" ? simpleCompare : simpleCompareReverse;
                var needleBounds = needles.map(function (needle) {
                    return { lower: lower(needle), upper: upper(needle) };
                }).sort(function (a, b) {
                    return compare(a.lower, b.lower);
                });
                upperNeedles = needleBounds.map(function (nb) {
                    return nb.upper;
                });
                lowerNeedles = needleBounds.map(function (nb) {
                    return nb.lower;
                });
                direction = dir;
                nextKeySuffix = dir === "next" ? "" : suffix;
            }
            initDirection("next");

            var c = new whereClause._ctx.collClass(whereClause, function () {
                return IDBKeyRange.bound(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix);
            });

            c._ondirectionchange = function (direction) {
                // This event onlys occur before filter is called the first time.
                initDirection(direction);
            };

            var firstPossibleNeedle = 0;

            c._addAlgorithm(function (cursor, advance, resolve) {
                /// <param name="cursor" type="IDBCursor"></param>
                /// <param name="advance" type="Function"></param>
                /// <param name="resolve" type="Function"></param>
                var key = cursor.key;
                if (typeof key !== 'string') return false;
                var lowerKey = lower(key);
                if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
                    return true;
                } else {
                    var lowestPossibleCasing = null;
                    for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
                        var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
                        if (casing === null && lowestPossibleCasing === null) firstPossibleNeedle = i + 1;else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
                            lowestPossibleCasing = casing;
                        }
                    }
                    if (lowestPossibleCasing !== null) {
                        advance(function () {
                            cursor.continue(lowestPossibleCasing + nextKeySuffix);
                        });
                    } else {
                        advance(resolve);
                    }
                    return false;
                }
            });
            return c;
        }

        //
        // WhereClause public methods
        //
        return {
            between: function (lower, upper, includeLower, includeUpper) {
                /// <summary>
                ///     Filter out records whose where-field lays between given lower and upper values. Applies to Strings, Numbers and Dates.
                /// </summary>
                /// <param name="lower"></param>
                /// <param name="upper"></param>
                /// <param name="includeLower" optional="true">Whether items that equals lower should be included. Default true.</param>
                /// <param name="includeUpper" optional="true">Whether items that equals upper should be included. Default false.</param>
                /// <returns type="Collection"></returns>
                includeLower = includeLower !== false; // Default to true
                includeUpper = includeUpper === true; // Default to false
                try {
                    if (cmp(lower, upper) > 0 || cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)) return emptyCollection(this); // Workaround for idiotic W3C Specification that DataError must be thrown if lower > upper. The natural result would be to return an empty collection.
                    return new this._ctx.collClass(this, function () {
                        return IDBKeyRange.bound(lower, upper, !includeLower, !includeUpper);
                    });
                } catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
            },
            equals: function (value) {
                return new this._ctx.collClass(this, function () {
                    return IDBKeyRange.only(value);
                });
            },
            above: function (value) {
                return new this._ctx.collClass(this, function () {
                    return IDBKeyRange.lowerBound(value, true);
                });
            },
            aboveOrEqual: function (value) {
                return new this._ctx.collClass(this, function () {
                    return IDBKeyRange.lowerBound(value);
                });
            },
            below: function (value) {
                return new this._ctx.collClass(this, function () {
                    return IDBKeyRange.upperBound(value, true);
                });
            },
            belowOrEqual: function (value) {
                return new this._ctx.collClass(this, function () {
                    return IDBKeyRange.upperBound(value);
                });
            },
            startsWith: function (str) {
                /// <param name="str" type="String"></param>
                if (typeof str !== 'string') return fail(this, STRING_EXPECTED);
                return this.between(str, str + maxString, true, true);
            },
            startsWithIgnoreCase: function (str) {
                /// <param name="str" type="String"></param>
                if (str === "") return this.startsWith(str);
                return addIgnoreCaseAlgorithm(this, function (x, a) {
                    return x.indexOf(a[0]) === 0;
                }, [str], maxString);
            },
            equalsIgnoreCase: function (str) {
                /// <param name="str" type="String"></param>
                return addIgnoreCaseAlgorithm(this, function (x, a) {
                    return x === a[0];
                }, [str], "");
            },
            anyOfIgnoreCase: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0) return emptyCollection(this);
                return addIgnoreCaseAlgorithm(this, function (x, a) {
                    return a.indexOf(x) !== -1;
                }, set, "");
            },
            startsWithAnyOfIgnoreCase: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0) return emptyCollection(this);
                return addIgnoreCaseAlgorithm(this, function (x, a) {
                    return a.some(function (n) {
                        return x.indexOf(n) === 0;
                    });
                }, set, maxString);
            },
            anyOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                var compare = ascending;
                try {
                    set.sort(compare);
                } catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
                if (set.length === 0) return emptyCollection(this);
                var c = new this._ctx.collClass(this, function () {
                    return IDBKeyRange.bound(set[0], set[set.length - 1]);
                });

                c._ondirectionchange = function (direction) {
                    compare = direction === "next" ? ascending : descending;
                    set.sort(compare);
                };
                var i = 0;
                c._addAlgorithm(function (cursor, advance, resolve) {
                    var key = cursor.key;
                    while (compare(key, set[i]) > 0) {
                        // The cursor has passed beyond this key. Check next.
                        ++i;
                        if (i === set.length) {
                            // There is no next. Stop searching.
                            advance(resolve);
                            return false;
                        }
                    }
                    if (compare(key, set[i]) === 0) {
                        // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
                        return true;
                    } else {
                        // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                        advance(function () {
                            cursor.continue(set[i]);
                        });
                        return false;
                    }
                });
                return c;
            },

            notEqual: function (value) {
                return this.inAnyRange([[-Infinity, value], [value, maxKey]], { includeLowers: false, includeUppers: false });
            },

            noneOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0) return new this._ctx.collClass(this); // Return entire collection.
                try {
                    set.sort(ascending);
                } catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
                // Transform ["a","b","c"] to a set of ranges for between/above/below: [[-Infinity,"a"], ["a","b"], ["b","c"], ["c",maxKey]]
                var ranges = set.reduce(function (res, val) {
                    return res ? res.concat([[res[res.length - 1][1], val]]) : [[-Infinity, val]];
                }, null);
                ranges.push([set[set.length - 1], maxKey]);
                return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
            },

            /** Filter out values withing given set of ranges.
            * Example, give children and elders a rebate of 50%:
            *
            *   db.friends.where('age').inAnyRange([[0,18],[65,Infinity]]).modify({Rebate: 1/2});
            *
            * @param {(string|number|Date|Array)[][]} ranges
            * @param {{includeLowers: boolean, includeUppers: boolean}} options
            */
            inAnyRange: function (ranges, options) {
                var ctx = this._ctx;
                if (ranges.length === 0) return emptyCollection(this);
                if (!ranges.every(function (range) {
                    return range[0] !== undefined && range[1] !== undefined && ascending(range[0], range[1]) <= 0;
                })) {
                    return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
                }
                var includeLowers = !options || options.includeLowers !== false; // Default to true
                var includeUppers = options && options.includeUppers === true; // Default to false

                function addRange(ranges, newRange) {
                    for (var i = 0, l = ranges.length; i < l; ++i) {
                        var range = ranges[i];
                        if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
                            range[0] = min(range[0], newRange[0]);
                            range[1] = max(range[1], newRange[1]);
                            break;
                        }
                    }
                    if (i === l) ranges.push(newRange);
                    return ranges;
                }

                var sortDirection = ascending;
                function rangeSorter(a, b) {
                    return sortDirection(a[0], b[0]);
                }

                // Join overlapping ranges
                var set;
                try {
                    set = ranges.reduce(addRange, []);
                    set.sort(rangeSorter);
                } catch (ex) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }

                var i = 0;
                var keyIsBeyondCurrentEntry = includeUppers ? function (key) {
                    return ascending(key, set[i][1]) > 0;
                } : function (key) {
                    return ascending(key, set[i][1]) >= 0;
                };

                var keyIsBeforeCurrentEntry = includeLowers ? function (key) {
                    return descending(key, set[i][0]) > 0;
                } : function (key) {
                    return descending(key, set[i][0]) >= 0;
                };

                function keyWithinCurrentRange(key) {
                    return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
                }

                var checkKey = keyIsBeyondCurrentEntry;

                var c = new ctx.collClass(this, function () {
                    return IDBKeyRange.bound(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers);
                });

                c._ondirectionchange = function (direction) {
                    if (direction === "next") {
                        checkKey = keyIsBeyondCurrentEntry;
                        sortDirection = ascending;
                    } else {
                        checkKey = keyIsBeforeCurrentEntry;
                        sortDirection = descending;
                    }
                    set.sort(rangeSorter);
                };

                c._addAlgorithm(function (cursor, advance, resolve) {
                    var key = cursor.key;
                    while (checkKey(key)) {
                        // The cursor has passed beyond this key. Check next.
                        ++i;
                        if (i === set.length) {
                            // There is no next. Stop searching.
                            advance(resolve);
                            return false;
                        }
                    }
                    if (keyWithinCurrentRange(key)) {
                        // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
                        return true;
                    } else if (cmp(key, set[i][1]) === 0 || cmp(key, set[i][0]) === 0) {
                        // includeUpper or includeLower is false so keyWithinCurrentRange() returns false even though we are at range border.
                        // Continue to next key but don't include this one.
                        return false;
                    } else {
                        // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                        advance(function () {
                            if (sortDirection === ascending) cursor.continue(set[i][0]);else cursor.continue(set[i][1]);
                        });
                        return false;
                    }
                });
                return c;
            },
            startsWithAnyOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);

                if (!set.every(function (s) {
                    return typeof s === 'string';
                })) {
                    return fail(this, "startsWithAnyOf() only works with strings");
                }
                if (set.length === 0) return emptyCollection(this);

                return this.inAnyRange(set.map(function (str) {
                    return [str, str + maxString];
                }));
            }
        };
    });

    //
    //
    //
    // Collection Class
    //
    //
    //
    function Collection(whereClause, keyRangeGenerator) {
        /// <summary>
        ///
        /// </summary>
        /// <param name="whereClause" type="WhereClause">Where clause instance</param>
        /// <param name="keyRangeGenerator" value="function(){ return IDBKeyRange.bound(0,1);}" optional="true"></param>
        var keyRange = null,
            error = null;
        if (keyRangeGenerator) try {
            keyRange = keyRangeGenerator();
        } catch (ex) {
            error = ex;
        }

        var whereCtx = whereClause._ctx,
            table = whereCtx.table;
        this._ctx = {
            table: table,
            index: whereCtx.index,
            isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
            range: keyRange,
            keysOnly: false,
            dir: "next",
            unique: "",
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: true, // True if a replayFilter is just a filter that performs a "limit" operation (or none at all)
            isMatch: null,
            offset: 0,
            limit: Infinity,
            error: error, // If set, any promise must be rejected with this error
            or: whereCtx.or,
            valueMapper: table.hook.reading.fire
        };
    }

    function isPlainKeyRange(ctx, ignoreLimitFilter) {
        return !(ctx.filter || ctx.algorithm || ctx.or) && (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
    }

    props(Collection.prototype, function () {

        //
        // Collection Private Functions
        //

        function addFilter(ctx, fn) {
            ctx.filter = combine(ctx.filter, fn);
        }

        function addReplayFilter(ctx, factory, isLimitFilter) {
            var curr = ctx.replayFilter;
            ctx.replayFilter = curr ? function () {
                return combine(curr(), factory());
            } : factory;
            ctx.justLimit = isLimitFilter && !curr;
        }

        function addMatchFilter(ctx, fn) {
            ctx.isMatch = combine(ctx.isMatch, fn);
        }

        /** @param ctx {
         *      isPrimKey: boolean,
         *      table: Table,
         *      index: string
         * }
         * @param store IDBObjectStore
         **/
        function getIndexOrStore(ctx, store) {
            if (ctx.isPrimKey) return store;
            var indexSpec = ctx.table.schema.idxByName[ctx.index];
            if (!indexSpec) throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + store.name + " is not indexed");
            return store.index(indexSpec.name);
        }

        /** @param ctx {
         *      isPrimKey: boolean,
         *      table: Table,
         *      index: string,
         *      keysOnly: boolean,
         *      range?: IDBKeyRange,
         *      dir: "next" | "prev"
         * }
         */
        function openCursor(ctx, store) {
            var idxOrStore = getIndexOrStore(ctx, store);
            return ctx.keysOnly && 'openKeyCursor' in idxOrStore ? idxOrStore.openKeyCursor(ctx.range || null, ctx.dir + ctx.unique) : idxOrStore.openCursor(ctx.range || null, ctx.dir + ctx.unique);
        }

        function iter(ctx, fn, resolve, reject, idbstore) {
            var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
            if (!ctx.or) {
                iterate(openCursor(ctx, idbstore), combine(ctx.algorithm, filter), fn, resolve, reject, !ctx.keysOnly && ctx.valueMapper);
            } else (function () {
                var set = {};
                var resolved = 0;

                function resolveboth() {
                    if (++resolved === 2) resolve(); // Seems like we just support or btwn max 2 expressions, but there are no limit because we do recursion.
                }

                function union(item, cursor, advance) {
                    if (!filter || filter(cursor, advance, resolveboth, reject)) {
                        var key = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
                        if (!hasOwn(set, key)) {
                            set[key] = true;
                            fn(item, cursor, advance);
                        }
                    }
                }

                ctx.or._iterate(union, resolveboth, reject, idbstore);
                iterate(openCursor(ctx, idbstore), ctx.algorithm, union, resolveboth, reject, !ctx.keysOnly && ctx.valueMapper);
            })();
        }
        function getInstanceTemplate(ctx) {
            return ctx.table.schema.instanceTemplate;
        }

        return {

            //
            // Collection Protected Functions
            //

            _read: function (fn, cb) {
                var ctx = this._ctx;
                if (ctx.error) return ctx.table._trans(null, function rejector(resolve, reject) {
                    reject(ctx.error);
                });else return ctx.table._idbstore(READONLY, fn).then(cb);
            },
            _write: function (fn) {
                var ctx = this._ctx;
                if (ctx.error) return ctx.table._trans(null, function rejector(resolve, reject) {
                    reject(ctx.error);
                });else return ctx.table._idbstore(READWRITE, fn, "locked"); // When doing write operations on collections, always lock the operation so that upcoming operations gets queued.
            },
            _addAlgorithm: function (fn) {
                var ctx = this._ctx;
                ctx.algorithm = combine(ctx.algorithm, fn);
            },

            _iterate: function (fn, resolve, reject, idbstore) {
                return iter(this._ctx, fn, resolve, reject, idbstore);
            },

            clone: function (props$$1) {
                var rv = Object.create(this.constructor.prototype),
                    ctx = Object.create(this._ctx);
                if (props$$1) extend(ctx, props$$1);
                rv._ctx = ctx;
                return rv;
            },

            raw: function () {
                this._ctx.valueMapper = null;
                return this;
            },

            //
            // Collection Public methods
            //

            each: function (fn) {
                var ctx = this._ctx;

                if (fake) {
                    var item = getInstanceTemplate(ctx),
                        primKeyPath = ctx.table.schema.primKey.keyPath,
                        key = getByKeyPath(item, ctx.index ? ctx.table.schema.idxByName[ctx.index].keyPath : primKeyPath),
                        primaryKey = getByKeyPath(item, primKeyPath);
                    fn(item, { key: key, primaryKey: primaryKey });
                }

                return this._read(function (resolve, reject, idbstore) {
                    iter(ctx, fn, resolve, reject, idbstore);
                });
            },

            count: function (cb) {
                if (fake) return Promise.resolve(0).then(cb);
                var ctx = this._ctx;

                if (isPlainKeyRange(ctx, true)) {
                    // This is a plain key range. We can use the count() method if the index.
                    return this._read(function (resolve, reject, idbstore) {
                        var idx = getIndexOrStore(ctx, idbstore);
                        var req = ctx.range ? idx.count(ctx.range) : idx.count();
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = function (e) {
                            resolve(Math.min(e.target.result, ctx.limit));
                        };
                    }, cb);
                } else {
                    // Algorithms, filters or expressions are applied. Need to count manually.
                    var count = 0;
                    return this._read(function (resolve, reject, idbstore) {
                        iter(ctx, function () {
                            ++count;return false;
                        }, function () {
                            resolve(count);
                        }, reject, idbstore);
                    }, cb);
                }
            },

            sortBy: function (keyPath, cb) {
                /// <param name="keyPath" type="String"></param>
                var parts = keyPath.split('.').reverse(),
                    lastPart = parts[0],
                    lastIndex = parts.length - 1;
                function getval(obj, i) {
                    if (i) return getval(obj[parts[i]], i - 1);
                    return obj[lastPart];
                }
                var order = this._ctx.dir === "next" ? 1 : -1;

                function sorter(a, b) {
                    var aVal = getval(a, lastIndex),
                        bVal = getval(b, lastIndex);
                    return aVal < bVal ? -order : aVal > bVal ? order : 0;
                }
                return this.toArray(function (a) {
                    return a.sort(sorter);
                }).then(cb);
            },

            toArray: function (cb) {
                var ctx = this._ctx;
                return this._read(function (resolve, reject, idbstore) {
                    fake && resolve([getInstanceTemplate(ctx)]);
                    if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                        // Special optimation if we could use IDBObjectStore.getAll() or
                        // IDBKeyRange.getAll():
                        var readingHook = ctx.table.hook.reading.fire;
                        var idxOrStore = getIndexOrStore(ctx, idbstore);
                        var req = ctx.limit < Infinity ? idxOrStore.getAll(ctx.range, ctx.limit) : idxOrStore.getAll(ctx.range);
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = readingHook === mirror ? eventSuccessHandler(resolve) : wrap(eventSuccessHandler(function (res) {
                            try {
                                resolve(res.map(readingHook));
                            } catch (e) {
                                reject(e);
                            }
                        }));
                    } else {
                        // Getting array through a cursor.
                        var a = [];
                        iter(ctx, function (item) {
                            a.push(item);
                        }, function arrayComplete() {
                            resolve(a);
                        }, reject, idbstore);
                    }
                }, cb);
            },

            offset: function (offset) {
                var ctx = this._ctx;
                if (offset <= 0) return this;
                ctx.offset += offset; // For count()
                if (isPlainKeyRange(ctx)) {
                    addReplayFilter(ctx, function () {
                        var offsetLeft = offset;
                        return function (cursor, advance) {
                            if (offsetLeft === 0) return true;
                            if (offsetLeft === 1) {
                                --offsetLeft;return false;
                            }
                            advance(function () {
                                cursor.advance(offsetLeft);
                                offsetLeft = 0;
                            });
                            return false;
                        };
                    });
                } else {
                    addReplayFilter(ctx, function () {
                        var offsetLeft = offset;
                        return function () {
                            return --offsetLeft < 0;
                        };
                    });
                }
                return this;
            },

            limit: function (numRows) {
                this._ctx.limit = Math.min(this._ctx.limit, numRows); // For count()
                addReplayFilter(this._ctx, function () {
                    var rowsLeft = numRows;
                    return function (cursor, advance, resolve) {
                        if (--rowsLeft <= 0) advance(resolve); // Stop after this item has been included
                        return rowsLeft >= 0; // If numRows is already below 0, return false because then 0 was passed to numRows initially. Otherwise we wouldnt come here.
                    };
                }, true);
                return this;
            },

            until: function (filterFunction, bIncludeStopEntry) {
                var ctx = this._ctx;
                fake && filterFunction(getInstanceTemplate(ctx));
                addFilter(this._ctx, function (cursor, advance, resolve) {
                    if (filterFunction(cursor.value)) {
                        advance(resolve);
                        return bIncludeStopEntry;
                    } else {
                        return true;
                    }
                });
                return this;
            },

            first: function (cb) {
                return this.limit(1).toArray(function (a) {
                    return a[0];
                }).then(cb);
            },

            last: function (cb) {
                return this.reverse().first(cb);
            },

            filter: function (filterFunction) {
                /// <param name="jsFunctionFilter" type="Function">function(val){return true/false}</param>
                fake && filterFunction(getInstanceTemplate(this._ctx));
                addFilter(this._ctx, function (cursor) {
                    return filterFunction(cursor.value);
                });
                // match filters not used in Dexie.js but can be used by 3rd part libraries to test a
                // collection for a match without querying DB. Used by Dexie.Observable.
                addMatchFilter(this._ctx, filterFunction);
                return this;
            },

            and: function (filterFunction) {
                return this.filter(filterFunction);
            },

            or: function (indexName) {
                return new WhereClause(this._ctx.table, indexName, this);
            },

            reverse: function () {
                this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
                if (this._ondirectionchange) this._ondirectionchange(this._ctx.dir);
                return this;
            },

            desc: function () {
                return this.reverse();
            },

            eachKey: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                return this.each(function (val, cursor) {
                    cb(cursor.key, cursor);
                });
            },

            eachUniqueKey: function (cb) {
                this._ctx.unique = "unique";
                return this.eachKey(cb);
            },

            eachPrimaryKey: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                return this.each(function (val, cursor) {
                    cb(cursor.primaryKey, cursor);
                });
            },

            keys: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                var a = [];
                return this.each(function (item, cursor) {
                    a.push(cursor.key);
                }).then(function () {
                    return a;
                }).then(cb);
            },

            primaryKeys: function (cb) {
                var ctx = this._ctx;
                if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                    // Special optimation if we could use IDBObjectStore.getAllKeys() or
                    // IDBKeyRange.getAllKeys():
                    return this._read(function (resolve, reject, idbstore) {
                        var idxOrStore = getIndexOrStore(ctx, idbstore);
                        var req = ctx.limit < Infinity ? idxOrStore.getAllKeys(ctx.range, ctx.limit) : idxOrStore.getAllKeys(ctx.range);
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = eventSuccessHandler(resolve);
                    }).then(cb);
                }
                ctx.keysOnly = !ctx.isMatch;
                var a = [];
                return this.each(function (item, cursor) {
                    a.push(cursor.primaryKey);
                }).then(function () {
                    return a;
                }).then(cb);
            },

            uniqueKeys: function (cb) {
                this._ctx.unique = "unique";
                return this.keys(cb);
            },

            firstKey: function (cb) {
                return this.limit(1).keys(function (a) {
                    return a[0];
                }).then(cb);
            },

            lastKey: function (cb) {
                return this.reverse().firstKey(cb);
            },

            distinct: function () {
                var ctx = this._ctx,
                    idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
                if (!idx || !idx.multi) return this; // distinct() only makes differencies on multiEntry indexes.
                var set = {};
                addFilter(this._ctx, function (cursor) {
                    var strKey = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
                    var found = hasOwn(set, strKey);
                    set[strKey] = true;
                    return !found;
                });
                return this;
            }
        };
    });

    //
    //
    // WriteableCollection Class
    //
    //
    function WriteableCollection() {
        Collection.apply(this, arguments);
    }

    derive(WriteableCollection).from(Collection).extend({

        //
        // WriteableCollection Public Methods
        //

        modify: function (changes) {
            var self = this,
                ctx = this._ctx,
                hook = ctx.table.hook,
                updatingHook = hook.updating.fire,
                deletingHook = hook.deleting.fire;

            fake && typeof changes === 'function' && changes.call({ value: ctx.table.schema.instanceTemplate }, ctx.table.schema.instanceTemplate);

            return this._write(function (resolve, reject, idbstore, trans) {
                var modifyer;
                if (typeof changes === 'function') {
                    // Changes is a function that may update, add or delete propterties or even require a deletion the object itself (delete this.item)
                    if (updatingHook === nop && deletingHook === nop) {
                        // Noone cares about what is being changed. Just let the modifier function be the given argument as is.
                        modifyer = changes;
                    } else {
                        // People want to know exactly what is being modified or deleted.
                        // Let modifyer be a proxy function that finds out what changes the caller is actually doing
                        // and call the hooks accordingly!
                        modifyer = function (item) {
                            var origItem = deepClone(item); // Clone the item first so we can compare laters.
                            if (changes.call(this, item, this) === false) return false; // Call the real modifyer function (If it returns false explicitely, it means it dont want to modify anyting on this object)
                            if (!hasOwn(this, "value")) {
                                // The real modifyer function requests a deletion of the object. Inform the deletingHook that a deletion is taking place.
                                deletingHook.call(this, this.primKey, item, trans);
                            } else {
                                // No deletion. Check what was changed
                                var objectDiff = getObjectDiff(origItem, this.value);
                                var additionalChanges = updatingHook.call(this, objectDiff, this.primKey, origItem, trans);
                                if (additionalChanges) {
                                    // Hook want to apply additional modifications. Make sure to fullfill the will of the hook.
                                    item = this.value;
                                    keys(additionalChanges).forEach(function (keyPath) {
                                        setByKeyPath(item, keyPath, additionalChanges[keyPath]); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                                    });
                                }
                            }
                        };
                    }
                } else if (updatingHook === nop) {
                    // changes is a set of {keyPath: value} and no one is listening to the updating hook.
                    var keyPaths = keys(changes);
                    var numKeys = keyPaths.length;
                    modifyer = function (item) {
                        var anythingModified = false;
                        for (var i = 0; i < numKeys; ++i) {
                            var keyPath = keyPaths[i],
                                val = changes[keyPath];
                            if (getByKeyPath(item, keyPath) !== val) {
                                setByKeyPath(item, keyPath, val); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                                anythingModified = true;
                            }
                        }
                        return anythingModified;
                    };
                } else {
                    // changes is a set of {keyPath: value} and people are listening to the updating hook so we need to call it and
                    // allow it to add additional modifications to make.
                    var origChanges = changes;
                    changes = shallowClone(origChanges); // Let's work with a clone of the changes keyPath/value set so that we can restore it in case a hook extends it.
                    modifyer = function (item) {
                        var anythingModified = false;
                        var additionalChanges = updatingHook.call(this, changes, this.primKey, deepClone(item), trans);
                        if (additionalChanges) extend(changes, additionalChanges);
                        keys(changes).forEach(function (keyPath) {
                            var val = changes[keyPath];
                            if (getByKeyPath(item, keyPath) !== val) {
                                setByKeyPath(item, keyPath, val);
                                anythingModified = true;
                            }
                        });
                        if (additionalChanges) changes = shallowClone(origChanges); // Restore original changes for next iteration
                        return anythingModified;
                    };
                }

                var count = 0;
                var successCount = 0;
                var iterationComplete = false;
                var failures = [];
                var failKeys = [];
                var currentKey = null;

                function modifyItem(item, cursor) {
                    currentKey = cursor.primaryKey;
                    var thisContext = {
                        primKey: cursor.primaryKey,
                        value: item,
                        onsuccess: null,
                        onerror: null
                    };

                    function onerror(e) {
                        failures.push(e);
                        failKeys.push(thisContext.primKey);
                        checkFinished();
                        return true; // Catch these errors and let a final rejection decide whether or not to abort entire transaction
                    }

                    if (modifyer.call(thisContext, item, thisContext) !== false) {
                        // If a callback explicitely returns false, do not perform the update!
                        var bDelete = !hasOwn(thisContext, "value");
                        ++count;
                        tryCatch(function () {
                            var req = bDelete ? cursor.delete() : cursor.update(thisContext.value);
                            req._hookCtx = thisContext;
                            req.onerror = hookedEventRejectHandler(onerror);
                            req.onsuccess = hookedEventSuccessHandler(function () {
                                ++successCount;
                                checkFinished();
                            });
                        }, onerror);
                    } else if (thisContext.onsuccess) {
                        // Hook will expect either onerror or onsuccess to always be called!
                        thisContext.onsuccess(thisContext.value);
                    }
                }

                function doReject(e) {
                    if (e) {
                        failures.push(e);
                        failKeys.push(currentKey);
                    }
                    return reject(new ModifyError("Error modifying one or more objects", failures, successCount, failKeys));
                }

                function checkFinished() {
                    if (iterationComplete && successCount + failures.length === count) {
                        if (failures.length > 0) doReject();else resolve(successCount);
                    }
                }
                self.clone().raw()._iterate(modifyItem, function () {
                    iterationComplete = true;
                    checkFinished();
                }, doReject, idbstore);
            });
        },

        'delete': function () {
            var _this4 = this;

            var ctx = this._ctx,
                range = ctx.range,
                deletingHook = ctx.table.hook.deleting.fire,
                hasDeleteHook = deletingHook !== nop;
            if (!hasDeleteHook && isPlainKeyRange(ctx) && (ctx.isPrimKey && !hangsOnDeleteLargeKeyRange || !range)) // if no range, we'll use clear().
                {
                    // May use IDBObjectStore.delete(IDBKeyRange) in this case (Issue #208)
                    // For chromium, this is the way most optimized version.
                    // For IE/Edge, this could hang the indexedDB engine and make operating system instable
                    // (https://gist.github.com/dfahlander/5a39328f029de18222cf2125d56c38f7)
                    return this._write(function (resolve, reject, idbstore) {
                        // Our API contract is to return a count of deleted items, so we have to count() before delete().
                        var onerror = eventRejectHandler(reject),
                            countReq = range ? idbstore.count(range) : idbstore.count();
                        countReq.onerror = onerror;
                        countReq.onsuccess = function () {
                            var count = countReq.result;
                            tryCatch(function () {
                                var delReq = range ? idbstore.delete(range) : idbstore.clear();
                                delReq.onerror = onerror;
                                delReq.onsuccess = function () {
                                    return resolve(count);
                                };
                            }, function (err) {
                                return reject(err);
                            });
                        };
                    });
                }

            // Default version to use when collection is not a vanilla IDBKeyRange on the primary key.
            // Divide into chunks to not starve RAM.
            // If has delete hook, we will have to collect not just keys but also objects, so it will use
            // more memory and need lower chunk size.
            var CHUNKSIZE = hasDeleteHook ? 2000 : 10000;

            return this._write(function (resolve, reject, idbstore, trans) {
                var totalCount = 0;
                // Clone collection and change its table and set a limit of CHUNKSIZE on the cloned Collection instance.
                var collection = _this4.clone({
                    keysOnly: !ctx.isMatch && !hasDeleteHook }) // load just keys (unless filter() or and() or deleteHook has subscribers)
                .distinct() // In case multiEntry is used, never delete same key twice because resulting count
                // would become larger than actual delete count.
                .limit(CHUNKSIZE).raw(); // Don't filter through reading-hooks (like mapped classes etc)

                var keysOrTuples = [];

                // We're gonna do things on as many chunks that are needed.
                // Use recursion of nextChunk function:
                var nextChunk = function () {
                    return collection.each(hasDeleteHook ? function (val, cursor) {
                        // Somebody subscribes to hook('deleting'). Collect all primary keys and their values,
                        // so that the hook can be called with its values in bulkDelete().
                        keysOrTuples.push([cursor.primaryKey, cursor.value]);
                    } : function (val, cursor) {
                        // No one subscribes to hook('deleting'). Collect only primary keys:
                        keysOrTuples.push(cursor.primaryKey);
                    }).then(function () {
                        // Chromium deletes faster when doing it in sort order.
                        hasDeleteHook ? keysOrTuples.sort(function (a, b) {
                            return ascending(a[0], b[0]);
                        }) : keysOrTuples.sort(ascending);
                        return bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook);
                    }).then(function () {
                        var count = keysOrTuples.length;
                        totalCount += count;
                        keysOrTuples = [];
                        return count < CHUNKSIZE ? totalCount : nextChunk();
                    });
                };

                resolve(nextChunk());
            });
        }
    });

    //
    //
    //
    // ------------------------- Help functions ---------------------------
    //
    //
    //

    function lowerVersionFirst(a, b) {
        return a._cfg.version - b._cfg.version;
    }

    function setApiOnPlace(objs, tableNames, mode, dbschema) {
        tableNames.forEach(function (tableName) {
            var tableInstance = db._tableFactory(mode, dbschema[tableName]);
            objs.forEach(function (obj) {
                tableName in obj || (obj[tableName] = tableInstance);
            });
        });
    }

    function removeTablesApi(objs) {
        objs.forEach(function (obj) {
            for (var key in obj) {
                if (obj[key] instanceof Table) delete obj[key];
            }
        });
    }

    function iterate(req, filter, fn, resolve, reject, valueMapper) {

        // Apply valueMapper (hook('reading') or mappped class)
        var mappedFn = valueMapper ? function (x, c, a) {
            return fn(valueMapper(x), c, a);
        } : fn;
        // Wrap fn with PSD and microtick stuff from Promise.
        var wrappedFn = wrap(mappedFn, reject);

        if (!req.onerror) req.onerror = eventRejectHandler(reject);
        if (filter) {
            req.onsuccess = trycatcher(function filter_record() {
                var cursor = req.result;
                if (cursor) {
                    var c = function () {
                        cursor.continue();
                    };
                    if (filter(cursor, function (advancer) {
                        c = advancer;
                    }, resolve, reject)) wrappedFn(cursor.value, cursor, function (advancer) {
                        c = advancer;
                    });
                    c();
                } else {
                    resolve();
                }
            }, reject);
        } else {
            req.onsuccess = trycatcher(function filter_record() {
                var cursor = req.result;
                if (cursor) {
                    var c = function () {
                        cursor.continue();
                    };
                    wrappedFn(cursor.value, cursor, function (advancer) {
                        c = advancer;
                    });
                    c();
                } else {
                    resolve();
                }
            }, reject);
        }
    }

    function parseIndexSyntax(indexes) {
        /// <param name="indexes" type="String"></param>
        /// <returns type="Array" elementType="IndexSpec"></returns>
        var rv = [];
        indexes.split(',').forEach(function (index) {
            index = index.trim();
            var name = index.replace(/([&*]|\+\+)/g, ""); // Remove "&", "++" and "*"
            // Let keyPath of "[a+b]" be ["a","b"]:
            var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split('+') : name;

            rv.push(new IndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), /\./.test(index)));
        });
        return rv;
    }

    function cmp(key1, key2) {
        return indexedDB.cmp(key1, key2);
    }

    function min(a, b) {
        return cmp(a, b) < 0 ? a : b;
    }

    function max(a, b) {
        return cmp(a, b) > 0 ? a : b;
    }

    function ascending(a, b) {
        return indexedDB.cmp(a, b);
    }

    function descending(a, b) {
        return indexedDB.cmp(b, a);
    }

    function simpleCompare(a, b) {
        return a < b ? -1 : a === b ? 0 : 1;
    }

    function simpleCompareReverse(a, b) {
        return a > b ? -1 : a === b ? 0 : 1;
    }

    function combine(filter1, filter2) {
        return filter1 ? filter2 ? function () {
            return filter1.apply(this, arguments) && filter2.apply(this, arguments);
        } : filter1 : filter2;
    }

    function readGlobalSchema() {
        db.verno = idbdb.version / 10;
        db._dbSchema = globalSchema = {};
        dbStoreNames = slice(idbdb.objectStoreNames, 0);
        if (dbStoreNames.length === 0) return; // Database contains no stores.
        var trans = idbdb.transaction(safariMultiStoreFix(dbStoreNames), 'readonly');
        dbStoreNames.forEach(function (storeName) {
            var store = trans.objectStore(storeName),
                keyPath = store.keyPath,
                dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
            var primKey = new IndexSpec(keyPath, keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== 'string', dotted);
            var indexes = [];
            for (var j = 0; j < store.indexNames.length; ++j) {
                var idbindex = store.index(store.indexNames[j]);
                keyPath = idbindex.keyPath;
                dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
                var index = new IndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== 'string', dotted);
                indexes.push(index);
            }
            globalSchema[storeName] = new TableSchema(storeName, primKey, indexes, {});
        });
        setApiOnPlace([allTables, Transaction.prototype], keys(globalSchema), READWRITE, globalSchema);
    }

    function adjustToExistingIndexNames(schema, idbtrans) {
        /// <summary>
        /// Issue #30 Problem with existing db - adjust to existing index names when migrating from non-dexie db
        /// </summary>
        /// <param name="schema" type="Object">Map between name and TableSchema</param>
        /// <param name="idbtrans" type="IDBTransaction"></param>
        var storeNames = idbtrans.db.objectStoreNames;
        for (var i = 0; i < storeNames.length; ++i) {
            var storeName = storeNames[i];
            var store = idbtrans.objectStore(storeName);
            hasGetAll = 'getAll' in store;
            for (var j = 0; j < store.indexNames.length; ++j) {
                var indexName = store.indexNames[j];
                var keyPath = store.index(indexName).keyPath;
                var dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";
                if (schema[storeName]) {
                    var indexSpec = schema[storeName].idxByName[dexieName];
                    if (indexSpec) indexSpec.name = indexName;
                }
            }
        }
    }

    function fireOnBlocked(ev) {
        db.on("blocked").fire(ev);
        // Workaround (not fully*) for missing "versionchange" event in IE,Edge and Safari:
        connections.filter(function (c) {
            return c.name === db.name && c !== db && !c._vcFired;
        }).map(function (c) {
            return c.on("versionchange").fire(ev);
        });
    }

    extend(this, {
        Collection: Collection,
        Table: Table,
        Transaction: Transaction,
        Version: Version,
        WhereClause: WhereClause,
        WriteableCollection: WriteableCollection,
        WriteableTable: WriteableTable
    });

    init();

    addons.forEach(function (fn) {
        fn(db);
    });
}

var fakeAutoComplete = function () {}; // Will never be changed. We just fake for the IDE that we change it (see doFakeAutoComplete())
var fake = false; // Will never be changed. We just fake for the IDE that we change it (see doFakeAutoComplete())

function parseType(type) {
    if (typeof type === 'function') {
        return new type();
    } else if (isArray(type)) {
        return [parseType(type[0])];
    } else if (type && typeof type === 'object') {
        var rv = {};
        applyStructure(rv, type);
        return rv;
    } else {
        return type;
    }
}

function applyStructure(obj, structure) {
    keys(structure).forEach(function (member) {
        var value = parseType(structure[member]);
        obj[member] = value;
    });
    return obj;
}

function eventSuccessHandler(done) {
    return function (ev) {
        done(ev.target.result);
    };
}

function hookedEventSuccessHandler(resolve) {
    // wrap() is needed when calling hooks because the rare scenario of:
    //  * hook does a db operation that fails immediately (IDB throws exception)
    //    For calling db operations on correct transaction, wrap makes sure to set PSD correctly.
    //    wrap() will also execute in a virtual tick.
    //  * If not wrapped in a virtual tick, direct exception will launch a new physical tick.
    //  * If this was the last event in the bulk, the promise will resolve after a physical tick
    //    and the transaction will have committed already.
    // If no hook, the virtual tick will be executed in the reject()/resolve of the final promise,
    // because it is always marked with _lib = true when created using Transaction._promise().
    return wrap(function (event) {
        var req = event.target,
            result = req.result,
            ctx = req._hookCtx,
            // Contains the hook error handler. Put here instead of closure to boost performance.
        hookSuccessHandler = ctx && ctx.onsuccess;
        hookSuccessHandler && hookSuccessHandler(result);
        resolve && resolve(result);
    }, resolve);
}

function eventRejectHandler(reject) {
    return function (event) {
        preventDefault(event);
        reject(event.target.error);
        return false;
    };
}

function hookedEventRejectHandler(reject) {
    return wrap(function (event) {
        // See comment on hookedEventSuccessHandler() why wrap() is needed only when supporting hooks.

        var req = event.target,
            err = req.error,
            ctx = req._hookCtx,
            // Contains the hook error handler. Put here instead of closure to boost performance.
        hookErrorHandler = ctx && ctx.onerror;
        hookErrorHandler && hookErrorHandler(err);
        preventDefault(event);
        reject(err);
        return false;
    });
}

function preventDefault(event) {
    if (event.stopPropagation) // IndexedDBShim doesnt support this on Safari 8 and below.
        event.stopPropagation();
    if (event.preventDefault) // IndexedDBShim doesnt support this on Safari 8 and below.
        event.preventDefault();
}

function globalDatabaseList(cb) {
    var val,
        localStorage = Dexie.dependencies.localStorage;
    if (!localStorage) return cb([]); // Envs without localStorage support
    try {
        val = JSON.parse(localStorage.getItem('Dexie.DatabaseNames') || "[]");
    } catch (e) {
        val = [];
    }
    if (cb(val)) {
        localStorage.setItem('Dexie.DatabaseNames', JSON.stringify(val));
    }
}

function awaitIterator(iterator) {
    var callNext = function (result) {
        return iterator.next(result);
    },
        doThrow = function (error) {
        return iterator.throw(error);
    },
        onSuccess = step(callNext),
        onError = step(doThrow);

    function step(getNext) {
        return function (val) {
            var next = getNext(val),
                value = next.value;

            return next.done ? value : !value || typeof value.then !== 'function' ? isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) : value.then(onSuccess, onError);
        };
    }

    return step(callNext)();
}

//
// IndexSpec struct
//
function IndexSpec(name, keyPath, unique, multi, auto, compound, dotted) {
    /// <param name="name" type="String"></param>
    /// <param name="keyPath" type="String"></param>
    /// <param name="unique" type="Boolean"></param>
    /// <param name="multi" type="Boolean"></param>
    /// <param name="auto" type="Boolean"></param>
    /// <param name="compound" type="Boolean"></param>
    /// <param name="dotted" type="Boolean"></param>
    this.name = name;
    this.keyPath = keyPath;
    this.unique = unique;
    this.multi = multi;
    this.auto = auto;
    this.compound = compound;
    this.dotted = dotted;
    var keyPathSrc = typeof keyPath === 'string' ? keyPath : keyPath && '[' + [].join.call(keyPath, '+') + ']';
    this.src = (unique ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + keyPathSrc;
}

//
// TableSchema struct
//
function TableSchema(name, primKey, indexes, instanceTemplate) {
    /// <param name="name" type="String"></param>
    /// <param name="primKey" type="IndexSpec"></param>
    /// <param name="indexes" type="Array" elementType="IndexSpec"></param>
    /// <param name="instanceTemplate" type="Object"></param>
    this.name = name;
    this.primKey = primKey || new IndexSpec();
    this.indexes = indexes || [new IndexSpec()];
    this.instanceTemplate = instanceTemplate;
    this.mappedClass = null;
    this.idxByName = arrayToObject(indexes, function (index) {
        return [index.name, index];
    });
}

// Used in when defining dependencies later...
// (If IndexedDBShim is loaded, prefer it before standard indexedDB)
var idbshim = _global.idbModules && _global.idbModules.shimIndexedDB ? _global.idbModules : {};

function safariMultiStoreFix(storeNames) {
    return storeNames.length === 1 ? storeNames[0] : storeNames;
}

function getNativeGetDatabaseNamesFn(indexedDB) {
    var fn = indexedDB && (indexedDB.getDatabaseNames || indexedDB.webkitGetDatabaseNames);
    return fn && fn.bind(indexedDB);
}

// Export Error classes
props(Dexie, fullNameExceptions); // Dexie.XXXError = class XXXError {...};

//
// Static methods and properties
// 
props(Dexie, {

    //
    // Static delete() method.
    //
    delete: function (databaseName) {
        var db = new Dexie(databaseName),
            promise = db.delete();
        promise.onblocked = function (fn) {
            db.on("blocked", fn);
            return this;
        };
        return promise;
    },

    //
    // Static exists() method.
    //
    exists: function (name) {
        return new Dexie(name).open().then(function (db) {
            db.close();
            return true;
        }).catch(Dexie.NoSuchDatabaseError, function () {
            return false;
        });
    },

    //
    // Static method for retrieving a list of all existing databases at current host.
    //
    getDatabaseNames: function (cb) {
        return new Promise(function (resolve, reject) {
            var getDatabaseNames = getNativeGetDatabaseNamesFn(indexedDB);
            if (getDatabaseNames) {
                // In case getDatabaseNames() becomes standard, let's prepare to support it:
                var req = getDatabaseNames();
                req.onsuccess = function (event) {
                    resolve(slice(event.target.result, 0)); // Converst DOMStringList to Array<String>
                };
                req.onerror = eventRejectHandler(reject);
            } else {
                globalDatabaseList(function (val) {
                    resolve(val);
                    return false;
                });
            }
        }).then(cb);
    },

    defineClass: function (structure) {
        /// <summary>
        ///     Create a javascript constructor based on given template for which properties to expect in the class.
        ///     Any property that is a constructor function will act as a type. So {name: String} will be equal to {name: new String()}.
        /// </summary>
        /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
        /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>

        // Default constructor able to copy given properties into this object.
        function Class(properties) {
            /// <param name="properties" type="Object" optional="true">Properties to initialize object with.
            /// </param>
            properties ? extend(this, properties) : fake && applyStructure(this, structure);
        }
        return Class;
    },

    applyStructure: applyStructure,

    ignoreTransaction: function (scopeFunc) {
        // In case caller is within a transaction but needs to create a separate transaction.
        // Example of usage:
        //
        // Let's say we have a logger function in our app. Other application-logic should be unaware of the
        // logger function and not need to include the 'logentries' table in all transaction it performs.
        // The logging should always be done in a separate transaction and not be dependant on the current
        // running transaction context. Then you could use Dexie.ignoreTransaction() to run code that starts a new transaction.
        //
        //     Dexie.ignoreTransaction(function() {
        //         db.logentries.add(newLogEntry);
        //     });
        //
        // Unless using Dexie.ignoreTransaction(), the above example would try to reuse the current transaction
        // in current Promise-scope.
        //
        // An alternative to Dexie.ignoreTransaction() would be setImmediate() or setTimeout(). The reason we still provide an
        // API for this because
        //  1) The intention of writing the statement could be unclear if using setImmediate() or setTimeout().
        //  2) setTimeout() would wait unnescessary until firing. This is however not the case with setImmediate().
        //  3) setImmediate() is not supported in the ES standard.
        //  4) You might want to keep other PSD state that was set in a parent PSD, such as PSD.letThrough.
        return PSD.trans ? usePSD(PSD.transless, scopeFunc) : // Use the closest parent that was non-transactional.
        scopeFunc(); // No need to change scope because there is no ongoing transaction.
    },

    vip: function (fn) {
        // To be used by subscribers to the on('ready') event.
        // This will let caller through to access DB even when it is blocked while the db.ready() subscribers are firing.
        // This would have worked automatically if we were certain that the Provider was using Dexie.Promise for all asyncronic operations. The promise PSD
        // from the provider.connect() call would then be derived all the way to when provider would call localDatabase.applyChanges(). But since
        // the provider more likely is using non-promise async APIs or other thenable implementations, we cannot assume that.
        // Note that this method is only useful for on('ready') subscribers that is returning a Promise from the event. If not using vip()
        // the database could deadlock since it wont open until the returned Promise is resolved, and any non-VIPed operation started by
        // the caller will not resolve until database is opened.
        return newScope(function () {
            PSD.letThrough = true; // Make sure we are let through if still blocking db due to onready is firing.
            return fn();
        });
    },

    async: function (generatorFn) {
        return function () {
            try {
                var rv = awaitIterator(generatorFn.apply(this, arguments));
                if (!rv || typeof rv.then !== 'function') return Promise.resolve(rv);
                return rv;
            } catch (e) {
                return rejection(e);
            }
        };
    },

    spawn: function (generatorFn, args, thiz) {
        try {
            var rv = awaitIterator(generatorFn.apply(thiz, args || []));
            if (!rv || typeof rv.then !== 'function') return Promise.resolve(rv);
            return rv;
        } catch (e) {
            return rejection(e);
        }
    },

    // Dexie.currentTransaction property
    currentTransaction: {
        get: function () {
            return PSD.trans || null;
        }
    },

    // Export our Promise implementation since it can be handy as a standalone Promise implementation
    Promise: Promise,

    // Dexie.debug proptery:
    // Dexie.debug = false
    // Dexie.debug = true
    // Dexie.debug = "dexie" - don't hide dexie's stack frames.
    debug: {
        get: function () {
            return debug;
        },
        set: function (value) {
            setDebug(value, value === 'dexie' ? function () {
                return true;
            } : dexieStackFrameFilter);
        }
    },

    // Export our derive/extend/override methodology
    derive: derive,
    extend: extend,
    props: props,
    override: override,
    // Export our Events() function - can be handy as a toolkit
    Events: Events,
    events: { get: deprecated(function () {
            return Events;
        }) }, // Backward compatible lowercase version.
    // Utilities
    getByKeyPath: getByKeyPath,
    setByKeyPath: setByKeyPath,
    delByKeyPath: delByKeyPath,
    shallowClone: shallowClone,
    deepClone: deepClone,
    getObjectDiff: getObjectDiff,
    asap: asap,
    maxKey: maxKey,
    // Addon registry
    addons: [],
    // Global DB connection list
    connections: connections,

    MultiModifyError: exceptions.Modify, // Backward compatibility 0.9.8. Deprecate.
    errnames: errnames,

    // Export other static classes
    IndexSpec: IndexSpec,
    TableSchema: TableSchema,

    //
    // Dependencies
    //
    // These will automatically work in browsers with indexedDB support, or where an indexedDB polyfill has been included.
    //
    // In node.js, however, these properties must be set "manually" before instansiating a new Dexie().
    // For node.js, you need to require indexeddb-js or similar and then set these deps.
    //
    dependencies: {
        // Required:
        indexedDB: idbshim.shimIndexedDB || _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
        IDBKeyRange: idbshim.IDBKeyRange || _global.IDBKeyRange || _global.webkitIDBKeyRange
    },

    // API Version Number: Type Number, make sure to always set a version number that can be comparable correctly. Example: 0.9, 0.91, 0.92, 1.0, 1.01, 1.1, 1.2, 1.21, etc.
    semVer: DEXIE_VERSION,
    version: DEXIE_VERSION.split('.').map(function (n) {
        return parseInt(n);
    }).reduce(function (p, c, i) {
        return p + c / Math.pow(10, i * 2);
    }),
    fakeAutoComplete: fakeAutoComplete,

    // https://github.com/dfahlander/Dexie.js/issues/186
    // typescript compiler tsc in mode ts-->es5 & commonJS, will expect require() to return
    // x.default. Workaround: Set Dexie.default = Dexie.
    default: Dexie
});

tryCatch(function () {
    // Optional dependencies
    // localStorage
    Dexie.dependencies.localStorage = (typeof chrome !== "undefined" && chrome !== null ? chrome.storage : void 0) != null ? null : _global.localStorage;
});

// Map DOMErrors and DOMExceptions to corresponding Dexie errors. May change in Dexie v2.0.
Promise.rejectionMapper = mapError;

// Fool IDE to improve autocomplete. Tested with Visual Studio 2013 and 2015.
doFakeAutoComplete(function () {
    Dexie.fakeAutoComplete = fakeAutoComplete = doFakeAutoComplete;
    Dexie.fake = fake = true;
});

return Dexie;

})));


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],149:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],150:[function(require,module,exports){
var isFunction = require('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":152}],151:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],152:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],153:[function(require,module,exports){
'use strict';
var toString = Object.prototype.toString;

module.exports = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};

},{}],154:[function(require,module,exports){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      isBuffer = require('is-buffer'),
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if(typeof message == 'undefined')
      return;

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

},{"charenc":144,"crypt":147,"is-buffer":155}],155:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(
    obj != null &&
    obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  )
}

},{}],156:[function(require,module,exports){
var events  = require("events");
var util    = require("util");

/*
* This class a key/value cache on memory.
* A timeout will be added to each entry.
* When a timeout happens for a single entry, the event 'expired'
* will be rised with the pair key/value as argument.
* When an entry was query or updated, its timeout will be reseted.
* @param options {object} Optional configuration options.
*   - timeout               {number}  Optional. Specifies in ms the default timeout for each entry. Default 60000 ms.
*   - doesNotRenewTimeout   {boolean} Optional. Specifies if entries's timeout should be reseted after each query or update. Default false.
*   - timeoutDisabled       {boolean} Optional. Enable/diable timeout feature. If timeout feature is desable, items will not expire. Default false.
* @api public
*/
var Cache = function(options) {

    if (typeof options== 'number') {
        options = { timeout: options};
    } else {
        options = options || {};
    }

    var self = this;        // Self reference
    var cache = {};         // Entries by key
    var _length = 0;        // Internal counter of cache's entries
    var expirations = [];   // Entries sorted ascending by their expiration time and sequence.
    var sequence = 0;       // Internal counter for sorting entries within 'expirations' array.
    var timerId = null;     // Reference to timer
    var config = {          // Global configuration
        timeout: options.timeout || 60000,
        doesNotRenewTimeout: options.doesNotRenewTimeout || false,
        timeoutDisabled: options.timeoutDisabled || false
    };

    /*
    * Returns the number of entries that the cache contains.
    * @api public
    */
    Object.defineProperty(this, "length", {
      enumerable: true,
      get : function(){ return _length; }
    });


    /*
    * Returns all keys.
    * @api public
    */
    Object.defineProperty(this, "keys", {
      enumerable: true,
      get : function(){ return Object.keys(cache); }
    });

    /*
    * Inserts or updates an entry into the cache.
    * @param key        {string} Required.
    * @param value      {any}    Required.
    * @param timeout    {number} Optional. Specifies in milliseconds the timeout for this entry.
    * @api public
    */
    this.set = function (key, value, timeout) {
        var current = cache[key];
        if (current) {
            if (!config.timeoutDisabled) removeExpiration(current);
        } else {
            _length++;
        }


        var item = {
            key: key,
            value: value
        };

        cache[key] = item;

        if (!config.timeoutDisabled) {
            item.timeout = timeout || config.timeout;
            addExpiration(item);
        }
    };

    /*
    * Removes an entry from the cache.
    * @param key    {string} Required.
    * @api public
    */
    this.remove =function (key) {
        var item = cache[key];
        if (!item) return null;

        _length --;
        if (!config.timeoutDisabled) removeExpiration(item);
        delete cache[key];
        return item.value;
    };

    /*
    * Gets an entry's value by its key.
    * @param key    {string}    Required.
    * @return       {any}       Returns entry's value or null if entry was not found
    * @api public
    */
    this.get = function (key) {
        var item = cache[key];
        if (item) {
            if (!config.timeoutDisabled && !config.doesNotRenewTimeout) {
                removeExpiration(item);
                addExpiration(item);
            }
            return item.value;
        }
        return null;
    };

    /*
    * Removes all entries from the cache
    * @public api
    */
    this.clean = function () {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }

        cache = {};
        expirations = [];
        _length = 0;
    };

    // adds an entry to expirations array
    var addExpiration = function (item) {
        item.expires = new Date().getTime() + item.timeout;
        item.sequence = sequence++;

        var index = binaryInsert(item, itemComparer);
        if (index === 0) setItemTimeout(item);
    };

    // removes an entry from expirations array
    var removeExpiration = function (item) {
        var index = binarySearch(item);
        if (index >= 0) {
            if (index === 0 && expirations.length > 1) setItemTimeout(expirations[1]);
            expirations.splice(index, 1);
        }
    };

    // sets expiration timer for an item
    var setItemTimeout = function (item) {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }

        var timeout = item.expires - new Date().getTime();
        timerId = setTimeout(onTimer, timeout < 10 ? 10 : timeout);
    };

    // on timer event, emits one event 'expired' for each entry at expirations array that are expired.
    var onTimer = function() {
        var now = new Date().getTime();
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }

        var itemsToEmit = [];   // Collects all expired items


        for (var index in expirations) {

            // Gets entry from expirations cache
            var item = expirations[index];

            // Stops when find a non expired item
            if (item.expires > now) {

                // Sets timer for no expired item
                setItemTimeout(item);

                // Removes all expired entries from array
                expirations = expirations.slice(index);
                break;
            }
            // All remaining expirations may need to be removed...
            else if( index == expirations.length-1 && item.expires <= now) {
                expirations = expirations.slice(index+1);
            }

            // Adds expired entry to collection of expired items
            itemsToEmit.push(item);

            // Removes expired entry from cache
            delete cache[item.key];
        }

        // Updates length property
        _length -= itemsToEmit.length;

        // Emits 'expired' event for each expired item
        itemsToEmit.forEach( function( item ) {
            self.emit("expired", {
                key: item.key,
                value: item.value
            });
        });
    };

    // Internal function that compares two entries's timeouts
    var itemComparer = function(a, b) {
        if (a && !b) return -1;
        if (!a && b) return 1;
        if (b.expires === a.expires) {
            return a.sequence - b.sequence;
        }

        return a.expires - b.expires;
    };

    // searchs on expirations array
    var binarySearch = function (value) {
         var low = 0, up = expirations.length,  middle, result;

         while ( low <= up ) {

            middle = (low + up)  >> 1;
            result = itemComparer(value, expirations[middle]);

            if (result === 0) return middle;

            if (result > 0) {
                low = middle + 1;
            } else {
                up = middle - 1;
            }
         }

         return -1;
    };

    // inserts on expirations array
    var binaryInsert = function (value) {
         var low = 0, up = expirations.length, count = up, middle, result;

         while ( low <= up ) {

            middle = (low + up)  >> 1;
            result = itemComparer(value, expirations[middle]);

            if (result === 0) return middle;

            if (result > 0 ) {
                low = middle + 1;
            } else {
                up = middle - 1;
            }
         }

         expirations.splice(low, 0, value);
         return low>count ? count : low;
    };

};

// Cache inherits from EventEmitter
util.inherits(Cache, events.EventEmitter);

// Exports Cache class
module.exports = Cache;
},{"events":149,"util":174}],157:[function(require,module,exports){
/*!
 * @name JavaScript/NodeJS Merge v1.2.0
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	/**
	 * Merge one or more objects 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	var Public = function(clone) {

		return merge(clone === true, false, arguments);

	}, publicName = 'merge';

	/**
	 * Merge two or more objects recursively 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	Public.recursive = function(clone) {

		return merge(clone === true, true, arguments);

	};

	/**
	 * Clone the input removing any reference
	 * @param mixed input
	 * @return mixed
	 */

	Public.clone = function(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = Public.clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

				output[index] = Public.clone(input[index]);

		}

		return output;

	};

	/**
	 * Merge two objects recursively
	 * @param mixed input
	 * @param mixed extend
	 * @return mixed
	 */

	function merge_recursive(base, extend) {

		if (typeOf(base) !== 'object')

			return extend;

		for (var key in extend) {

			if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

				base[key] = merge_recursive(base[key], extend[key]);

			} else {

				base[key] = extend[key];

			}

		}

		return base;

	}

	/**
	 * Merge two or more objects
	 * @param bool clone
	 * @param bool recursive
	 * @param array argv
	 * @return object
	 */

	function merge(clone, recursive, argv) {

		var result = argv[0],
			size = argv.length;

		if (clone || typeOf(result) !== 'object')

			result = {};

		for (var index=0;index<size;++index) {

			var item = argv[index],

				type = typeOf(item);

			if (type !== 'object') continue;

			for (var key in item) {

				var sitem = clone ? Public.clone(item[key]) : item[key];

				if (recursive) {

					result[key] = merge_recursive(result[key], sitem);

				} else {

					result[key] = sitem;

				}

			}

		}

		return result;

	}

	/**
	 * Get type of variable
	 * @param mixed input
	 * @return string
	 *
	 * @see http://jsperf.com/typeofvar
	 */

	function typeOf(input) {

		return ({}).toString.call(input).slice(8, -1).toLowerCase();

	}

	if (isNode) {

		module.exports = Public;

	} else {

		window[publicName] = Public;

	}

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
},{}],158:[function(require,module,exports){
'use strict';
var url = require('url');
var punycode = require('punycode');
var queryString = require('query-string');
var prependHttp = require('prepend-http');
var sortKeys = require('sort-keys');
var objectAssign = require('object-assign');

var DEFAULT_PORTS = {
	'http:': 80,
	'https:': 443,
	'ftp:': 21
};

module.exports = function (str, opts) {
	opts = objectAssign({
		normalizeProtocol: true,
		stripFragment: true,
		stripWWW: true
	}, opts);

	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	var hasRelativeProtocol = str.indexOf('//') === 0;

	// prepend protocol
	str = prependHttp(str.trim()).replace(/^\/\//, 'http://');

	var urlObj = url.parse(str);

	// prevent these from being used by `url.format`
	delete urlObj.host;
	delete urlObj.query;

	// remove fragment
	if (opts.stripFragment) {
		delete urlObj.hash;
	}

	// remove default port
	var port = DEFAULT_PORTS[urlObj.protocol];
	if (Number(urlObj.port) === port) {
		delete urlObj.port;
	}

	// remove duplicate slashes
	urlObj.pathname = urlObj.pathname.replace(/\/{2,}/, '/');

	// resolve relative paths
	var domain = urlObj.protocol + '//' + urlObj.hostname;
	var relative = url.resolve(domain, urlObj.pathname);
	urlObj.pathname = relative.replace(domain, '');

	// IDN to Unicode
	urlObj.hostname = punycode.toUnicode(urlObj.hostname).toLowerCase();

	// remove `www.`
	if (opts.stripWWW) {
		urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
	}

	// remove URL with empty query string
	if (urlObj.search === '?') {
		delete urlObj.search;
	}

	// sort query parameters
	urlObj.search = queryString.stringify(sortKeys(queryString.parse(urlObj.search)));

	// decode query parameters
	urlObj.search = decodeURIComponent(urlObj.search);

	// take advantage of many of the Node `url` normalizations
	str = url.format(urlObj);

	// remove ending `/`
	str = str.replace(/\/$/, '');

	// restore relative protocol, if applicable
	if (hasRelativeProtocol && !opts.normalizeProtocol) {
		str = str.replace(/^http:\/\//, '//');
	}

	return str;
};

},{"object-assign":159,"prepend-http":161,"punycode":163,"query-string":164,"sort-keys":168,"url":171}],159:[function(require,module,exports){
'use strict';
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return propIsEnumerable.call(obj, key);
	});
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],160:[function(require,module,exports){
var trim = require('trim')
  , forEach = require('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":150,"trim":170}],161:[function(require,module,exports){
'use strict';
module.exports = function (url) {
	if (typeof url !== 'string') {
		throw new TypeError('Expected a string, got ' + typeof url);
	}

	url = url.trim();

	if (/^\.*\/|^(?!localhost)\w+:/.test(url)) {
		return url;
	}

	return url.replace(/^(?!(?:\w+:)?\/\/)/, 'http://');
};

},{}],162:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],163:[function(require,module,exports){
(function (global){
/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],164:[function(require,module,exports){
'use strict';
var strictUriEncode = require('strict-uri-encode');

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str) {
	if (typeof str !== 'string') {
		return {};
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return {};
	}

	return str.split('&').reduce(function (ret, param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		key = decodeURIComponent(key);

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		if (!ret.hasOwnProperty(key)) {
			ret[key] = val;
		} else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		} else {
			ret[key] = [ret[key], val];
		}

		return ret;
	}, {});
};

exports.stringify = function (obj) {
	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (Array.isArray(val)) {
			return val.sort().map(function (val2) {
				return strictUriEncode(key) + '=' + strictUriEncode(val2);
			}).join('&');
		}

		return strictUriEncode(key) + '=' + strictUriEncode(val);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

},{"strict-uri-encode":169}],165:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],166:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],167:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":165,"./encode":166}],168:[function(require,module,exports){
'use strict';
var isPlainObj = require('is-plain-obj');

module.exports = function (obj, opts) {
	if (!isPlainObj(obj)) {
		throw new TypeError('Expected a plain object');
	}

	opts = opts || {};

	// DEPRECATED
	if (typeof opts === 'function') {
		opts = {compare: opts};
	}

	var deep = opts.deep;
	var seenInput = [];
	var seenOutput = [];

	var sortKeys = function (x) {
		var seenIndex = seenInput.indexOf(x);

		if (seenIndex !== -1) {
			return seenOutput[seenIndex];
		}

		var ret = {};
		var keys = Object.keys(x).sort(opts.compare);

		seenInput.push(x);
		seenOutput.push(ret);

		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var val = x[key];

			ret[key] = deep && isPlainObj(val) ? sortKeys(val) : val;
		}

		return ret;
	};

	return sortKeys(obj);
};

},{"is-plain-obj":153}],169:[function(require,module,exports){
'use strict';
module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

},{}],170:[function(require,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],171:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = this.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      this.hostname = newOut.join('.');
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  Object.keys(this).forEach(function(k) {
    result[k] = this[k];
  }, this);

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    Object.keys(relative).forEach(function(k) {
      if (k !== 'protocol')
        result[k] = relative[k];
    });

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      Object.keys(relative).forEach(function(k) {
        result[k] = relative[k];
      });
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!isNull(result.pathname) || !isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

function isString(arg) {
  return typeof arg === "string";
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return  arg == null;
}

},{"punycode":163,"querystring":167}],172:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],173:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],174:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":173,"_process":162,"inherits":172}],175:[function(require,module,exports){
var window = require("global/window")
var once = require("once")
var parseHeaders = require('parse-headers')

var messages = {
    "0": "Internal XMLHttpRequest Error",
    "4": "4xx Client Error",
    "5": "5xx Server Error"
}

var XHR = window.XMLHttpRequest || noop
var XDR = "withCredentials" in (new XHR()) ? XHR : window.XDomainRequest

module.exports = createXHR

function createXHR(options, callback) {
    if (typeof options === "string") {
        options = { uri: options }
    }

    options = options || {}
    callback = once(callback)

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new XDR()
        }else{
            xhr = new XHR()
        }
    }

    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var key
    var load = options.response ? loadResponse : loadXhr

    if ("json" in options) {
        isJson = true
        headers["Accept"] = "application/json"
        if (method !== "GET" && method !== "HEAD") {
            headers["Content-Type"] = "application/json"
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = load
    xhr.onerror = error
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    // hate IE
    xhr.ontimeout = noop
    xhr.open(method, uri, !sync)
                                    //backward compatibility
    if (options.withCredentials || (options.cors && options.withCredentials !== false)) {
        xhr.withCredentials = true
    }

    // Cannot set timeout with sync request
    if (!sync) {
        xhr.timeout = "timeout" in options ? options.timeout : 5000
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }
    
    if ("beforeSend" in options && 
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr

    function readystatechange() {
        if (xhr.readyState === 4) {
            load()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = null

        if (xhr.response) {
            body = xhr.response
        } else if (xhr.responseType === 'text' || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function getStatusCode() {
        return xhr.status === 1223 ? 204 : xhr.status
    }

    // if we're getting a none-ok statusCode, build & return an error
    function errorFromStatusCode(status) {
        var error = null
        if (status === 0 || (status >= 400 && status < 600)) {
            var message = (typeof body === "string" ? body : false) ||
                messages[String(status).charAt(0)]
            error = new Error(message)
            error.statusCode = status
        }

        return error
    }

    // will load the data & process the response in a special response object
    function loadResponse() {
        var status = getStatusCode()
        var error = errorFromStatusCode(status)
        var response = {
            body: getBody(),
            statusCode: status,
            statusText: xhr.statusText,
            raw: xhr
        }
        if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
            response.headers = parseHeaders(xhr.getAllResponseHeaders())
        } else {
            response.headers = {}
        }

        callback(error, response, response.body)
    }

    // will load the data and add some response properties to the source xhr
    // and then respond with that
    function loadXhr() {
        var status = getStatusCode()
        var error = errorFromStatusCode(status)

        xhr.status = xhr.statusCode = status
        xhr.body = getBody()
        xhr.headers = parseHeaders(xhr.getAllResponseHeaders())

        callback(error, xhr, xhr.body)
    }

    function error(evt) {
        callback(evt, xhr)
    }
}


function noop() {}

},{"global/window":151,"once":176,"parse-headers":160}],176:[function(require,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}

},{}],177:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}]},{},[1]);
