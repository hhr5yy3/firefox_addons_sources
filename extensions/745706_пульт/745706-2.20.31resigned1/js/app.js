(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$chrome", function($chrome) {
    return $chrome.runtime.getManifest().version;
}];
},{}],2:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        ENTER: 13,
        ESCAPE: 27,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40
    };
};
},{}],3:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$provide", function($provide) {
    $provide.decorator('$window', ["$delegate", function($delegate) {
        var KEY = 'isTestPromo';

        Object.defineProperty($delegate, 'testPromo', {
            enumerable: false,
            set: function(value) {
                this.localStorage.setItem(KEY, !!value);
            },
            get: function() {
                return JSON.parse(this.localStorage.getItem(KEY) || 'false');
            }
        });

        return $delegate;
    }]);
}];
},{}],4:[function(require,module,exports){
"use strict";

/*@ngInject*/
AddTileButton.$inject = ["$scope", "metricService", "boardsService", "ngDialog", "selectionManager"];
function AddTileButton($scope, metricService, boardsService, ngDialog, selectionManager) {
    this.modalDialog = null;

    this.noFreeTiles = () => {
        return boardsService.boardsList.hasNoPlaceToAdd;
    };

    this.add = () => {
        $scope.$emit('element:action');

        this.modalDialog = ngDialog.open({
            template: '<add-tile-modal></add-tile-modal>',
            plain: true,
            className: 'add-tile',
            appendTo: 'body'
        });

        this.modalDialog.closePromise.then(data => {
            const value = data.value;

            if (Array.isArray(value)) {

                const isAdded = boardsService.addMultipleTiles(value);
                boardsService.sync();

                if (isAdded) {
                    $scope.$emit('hints:newTile');
                }
            }

            this.modalDialog = null;
        }).finally(() => {
            selectionManager.clear();
        });

        metricService.send('add_tile_click', [ ]);
    };
}

module.exports = {
    template: `
        <button class="add-button" ng-click="vm.add()" ng-hide="vm.noFreeTiles()">
            <img draggable="false" class="plus-icon" src="/img/plus.png">
        </button>
    `,
    bindings: {

    },
    controller: AddTileButton,
    controllerAs: 'vm'
};
},{}],5:[function(require,module,exports){
"use strict";

/*@ngInject*/
AddTileModal.$inject = ["$scope", "$q", "$sce", "$timeout", "tileFactory", "boardsService", "showcaseService", "tabService", "recentSitesService", "widgetService", "searchService", "metricService", "selectionManager", "localizeFilter"];
function AddTileModal($scope, $q, $sce, $timeout, tileFactory, boardsService, showcaseService, tabService,
                      recentSitesService, widgetService, searchService, metricService, selectionManager, localizeFilter) {
    const vm = this;
    const LOAD_TIMEOUT = 350;
    const SHOWCASE_LOAD_TIMEOUT = 250;

    const mapper = (source) => {
        return tileFactory.create(source);
    };

    const addWidgetsLazy = (widgets, rowsBefore) => {
        $timeout(() => {
            vm.widgets = widgets;
        }, rowsBefore * LOAD_TIMEOUT);
    };

    const addShowcaseLazy = (showcase, rowsBefore) => {
        showcase.forEach((row, index) => {
            $timeout(() => {
                vm.showcase.push(row);
            }, rowsBefore * LOAD_TIMEOUT + index * SHOWCASE_LOAD_TIMEOUT);
        });
    };

    const showEmptyResultsMessage = () => {
        vm.error = true;
        vm.errorMessage = localizeFilter('add_nothingWasFound');
    };

    const showAlreadyAddedMessage = () => {
        vm.error = true;
        vm.errorMessage = localizeFilter('add_siteAlreadyAdded');
    };

    const clearErrorMessage = () => {
        vm.error = false;
        vm.errorMessage = null;
    };

    vm.search = (url, valid) => {
        const term = url.trim().toLowerCase();

        vm.searchMode = (term !== '');

        if (term.length < 2) {
            vm.searchResults = [];
            clearErrorMessage();
            return;
        }

        if (vm.searchMode) {
            searchService.search(url).then(results => {
                if (results.length === 0) {
                    vm.searchResults = [];
                    showEmptyResultsMessage();
                    return;
                }

                vm.searchResults = boardsService.filterSites(results).slice(0, 24);

                if (vm.searchResults.length < 1) {
                    showAlreadyAddedMessage();
                } else {
                    clearErrorMessage();
                }
            });
        }
    };

    vm.tabChanged = (index) => {
        vm.selectedTab = index;
    };

    vm.selectedTileCount = () => {
        return selectionManager.itemsCount;
    };

    vm.hideConfirmBlock = () => {
        vm.confirmBlockHidden = true;
    };

    vm.cancelTilesAdd = () => {
        selectionManager.clear();
    };

    vm.closeWindow = () => {
        vm.closeThisDialog(selectionManager.items.map(item => item.tile));
    };

    vm.$onInit = () => {
        vm.confirmBlockHidden = false;
        vm.showTabMenu = false;

        vm.lastSelectedTab = 0;
        vm.selectedTab = 0;

        vm.recentSites = [];
        vm.currentTabs = [];
        vm.widgets = [];

        vm.showcase = [];

        vm.tabs = [];
        vm.searchMode = false;
        vm.searchResults = [];

        vm.error = false;
        vm.errorMessage = null;

        // ngDialog parameters
        vm.closeThisDialog = $scope.$parent.closeThisDialog;
        vm.dialogId = $scope.$parent.ngDialogId;

        $q.all([
            tabService.getOpenTabs(),
            showcaseService.getShowcases('add'),
            recentSitesService.getRecentSites(),
            widgetService.getWidgets()
            // restore last opened tab menu item
        ]).then(results => {
            return {
                currentTabs: boardsService.filterSites(results[0].map(mapper)),
                recentSites: boardsService.filterSites(results[2].map(mapper)),
                widgets: boardsService.filterSites(results[3].map(mapper)),
                showcase: results[1].map(row => {
                    row.filteredItems = boardsService.filterSites(row.tiles);
                    return row;
                })
            };
        }).then(results => {
            vm.currentTabs = results.currentTabs;
            vm.recentSites = results.recentSites;

            vm.tabs = [];

            const hasRecentSites = vm.recentSites.length > 0;
            const hasCurrentTabs = vm.currentTabs.length > 0;
            const hasWidgets = results.widgets.length > 0;

            if (hasRecentSites) {
                vm.tabs.push({ label: localizeFilter('add_recentSites'), hasCounter: false });
            }

            if (hasCurrentTabs) {
                vm.tabs.push({ label: localizeFilter('add_openedTabs'), hasCounter: true, counterValue: vm.currentTabs.length });
            }

            vm.selectedTab = hasRecentSites ? 0 : (hasCurrentTabs ? 1 : 0);

            vm.showTabMenu = hasCurrentTabs || hasRecentSites;

            let rowsBefore = 0;

            if (hasRecentSites || hasCurrentTabs) {
                rowsBefore++;
            }

            addWidgetsLazy(results.widgets, rowsBefore);

            if (hasWidgets) {
                rowsBefore++;
            }

            addShowcaseLazy(results.showcase, rowsBefore);
        }).then(() => {
            $scope.$emit('hints:popUp');
        });
    };
}

module.exports = {
    template: `
        <dialog-wrapper dialog-id="vm.dialogId">
            <div class="dialog-content search" ng-click="vm.handleDialogClick($event)" tabindex="-1">

                <span class="dialog-title">{{::'add_header'|localize}}</span>

                <url-input
                    value="{{vm.selectedTitle}}"
                    placeholder="{{::'urlOrTitle'|localize}}"
                    on-change="vm.search(url, valid)">
                </url-input>

                <div ng-show="vm.searchMode">
                    <grid-list
                        tiles="vm.searchResults"
                        category="{{::'searchResults'|localize}}"
                    ></grid-list>

                    <label ng-if="vm.error" class="dialog-error" ng-bind="vm.errorMessage"></label>
                </div>

                <div ng-hide="vm.searchMode">
                    <div ng-show="vm.showTabMenu">
                        <tab-bar
                            tabs="vm.tabs"
                            default-tab="0"
                            on-change="vm.tabChanged(index)"
                        ></tab-bar>

                        <div class="row">
                            <paginated-list
                                ng-show="vm.selectedTab == 0"
                                tiles="vm.recentSites"
                                category="{{::'recentSites'|localize}}"
                            ></paginated-list>

                            <paginated-list
                                ng-show="vm.selectedTab == 1"
                                tiles="vm.currentTabs"
                                category="{{::'currentTabs'|localize}}"
                            ></paginated-list>
                        </div>
                    </div>

                    <div class="row">
                        <showcase-row
                            title="{{::'apps'|localize}}"
                            tile-size="medium"
                            tiles="vm.widgets"
                            category="{{::'apps'|localize}}"
                        >
                        </showcase-row>
                    </div>

                    <div class="row repeat-row" ng-repeat="row in vm.showcase">
                        <showcase-row
                            title="{{::row.title}}"
                            tile-size="{{::row.tileSize}}"
                            tiles="row.filteredItems"
                            category="{{::row.title}}"
                        >
                        </showcase-row>
                    </div>
                </div>

                <selected-tiles-panel
                    ng-show="vm.selectedTileCount() &gt; 0"
                    tiles-count="vm.selectedTileCount()"
                    on-confirm="vm.closeWindow()"
                    on-cancel="vm.cancelTilesAdd()"
                >
                </selected-tiles-panel>
            </div>
        </dialog-wrapper>
    `,
    bindings: {},
    controller: AddTileModal,
    controllerAs: 'vm'
};
},{}],6:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["urlUtils", function(urlUtils) {

    /*@ngInject*/
    UrlInput.$inject = ["$scope"];
    function UrlInput($scope) {

        const isValid = () => {
            return this.url.trim() !== '' && urlUtils.isValidUrl(this.url);
        };

        const resetValidation = () => {
            if (!this.valid) {
                this.valid = true;
            }
        };

        this.url = '';
        this.valid = true;
        this.focused = false;

        this.click = $event => {
            $event.stopPropagation();
            $scope.$emit('element:action');
        };

        this.validateUrl = () => {
            this.valid = isValid();
        };

        this.changeHandler = () => {
            $scope.$emit('element:action');
            resetValidation();
            this.onChange({
                url: this.url,
                valid: isValid()
            });
        };

        this.submitHandler = event => {
            event.preventDefault();

            $scope.$emit('element:action');

            /*
            // TODO Submit handler is not required anymore
            if (!this.onSubmit) {
                return;
            }
            
            this.onSubmit({
                url: this.url,
                valid: isValid(),
                event
            }).catch(() => {
                this.valid = false;
            });
            */
        };

        const unwatch = $scope.$watch(() => this.value, newVal => {
            this.url = newVal || '';
            this.valid = true;
        });

        $scope.$on('$destroy', () => {
            unwatch();
        });
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <form class="add-site-form search-form" ng-submit="urlInput.submitHandler($event)"
                  ng-class="{ invalid: !urlInput.valid, focused: urlInput.focused }">
                <input class="add-site-input search-input"
                       type="search"
                       tabindex="-1"
                       focus-id="search"
                       placeholder="{{::urlInput.placeholder}}"
                       ng-model="urlInput.url"
                       ng-change="urlInput.changeHandler()"
                       ng-click="urlInput.click($event)"
                       ng-model-options="{ updateOn: 'default blur customPaste', debounce: { customPaste: 0, blur: 0, default: 200 } }"
                       custom-paste
                       custom-autofocus
                       ng-focus="urlInput.focused = true"
                       ng-blur="urlInput.focused = false">
            </form>
        `,
        scope: {
            value: '@',
            placeholder: '@',
            onChange: '&'
            //,onSubmit: '&'
        },
        controller: UrlInput,
        controllerAs: 'urlInput',
        bindToController: true
    };
}];
},{}],7:[function(require,module,exports){
module.exports = /*@ngInject*/ ["$rootScope", "authProxyService", "metricService", function($rootScope, authProxyService, metricService) {
    function AuthController() {
        this.authorized = false;
        this.user = null;
        this.showProfile = false;
        this.showSelf = false;

        let removeAuthWatcher;

        this.$onInit = () => {
            checkLoginStatus()
                .then((authorized) => {
                    removeAuthWatcher = $rootScope.$on('auth:login', () => this.onLogin());

                    if (authorized) {
                        this.authorized = authorized;
                        return getUser()
                            .then((user) => {
                                if (user === null) {
                                    this.authorized = false;
                                }
                                this.user = user;
                            });
                    }
                })
                .then(() => showLogin())
                .then((show) => this.showSelf = show);
        };

        this.$onDestroy = () => {
            if (removeAuthWatcher !== undefined) {
                removeAuthWatcher();
            }
        };

        const showLogin = () => {
            return authProxyService.showLogin().catch(() => false);
        };

        const checkLoginStatus = () => {
            return authProxyService.isAuthorized(true).catch(() => false);
        };

        const login = () => {
            return authProxyService.login().catch(() => false);
        };

        const logout = () => {
            return authProxyService.logout();
        };

        const getUser = () => {
            return authProxyService.getCurrentUser();
        };

        const toggleProfile = () => {
            this.showProfile = !this.showProfile;
        };

        const externalAuthWatcher = (event, authorized) => {
            this.showProfile = false;
            this.authorized = authorized;
            if (authorized) {
                return getUser()
                    .then((user) => {
                        if (user === null) {
                            this.authorized = false;
                        }
                        this.user = user;
                    });
            } else {
                this.authorized = false;
                this.user = null;
            }
        };

        this.onProfileClick = () => {
            toggleProfile();
        };

        this.onLogin = () => {
            login().then((success) => {
                if (success) {
                    return getUser()
                        .then((user) => {
                            this.authorized = true;
                            this.user = user;
                        })
                        .then(() => $rootScope.$emit('auth:login_changed', true))
                        .then(() => metricService.send('login', [ 'ok', this.user.uid ]))
                        .catch(() => {
                            this.authorized = false;
                            this.user = null;
                        });
                }
                this.authorized = false;
                this.user = null;
            });
        };

        this.onLogout = () => {
            logout()
                .then(() => $rootScope.$emit('auth:login_changed', false))
                .then(() => metricService.send('logout', [ 'ok', this.user.uid ]))
                .then(() => {
                    this.showProfile = false;
                    this.authorized = false;
                    this.user = null;
                });
        };
    }

    return {
        restrict: 'E',
        template: `
            <div class="auth-block" ng-show="$ctrl.showSelf == true">
                <div ng-if="$ctrl.authorized == true">
                    <button ng-if="$ctrl.showProfile == false" class="login-button" type="button" ng-click="$ctrl.onProfileClick()" ng-style="{ 'backgroundImage': 'url(' + $ctrl.user.pic50x50 + ')' }">
                    </button>
                    <div ng-if="$ctrl.showProfile == true" class="profile-block">
                        <div class="avatar-container">
                            <img class="avatar avatar-large" alt="{{::$ctrl.user.name}}" ng-src="{{::$ctrl.user.pic50x50}}">
                            <i class="ok-badge"></i>
                        </div>
                        <p class="name-block">{{::$ctrl.user.first_name}}<br>{{::$ctrl.user.last_name}}</p>
                        <button class="logout-button link-btn" ng-click="$ctrl.onLogout()" ng-bind="::'ok_authLogout'|localize"></button>
                        <close-icon class="close-profile" ng-click="$ctrl.onProfileClick()"></close-icon>
                    </div>
                </div>
                <div ng-if="$ctrl.authorized == false">
                    <button class="login-button" type="button" ng-click="$ctrl.onLogin()"></button>
                </div>
            </div>
        `,
        scope: false,
        controller: AuthController,
        controllerAs: '$ctrl',
        bindToController: true
    };
}];

},{}],8:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    BoardSwitcher.$inject = ["$scope", "$rootScope", "boardsService", "boardsSettingsService"];
    function BoardSwitcher($scope, $rootScope, boardsService, boardsSettingsService) {

        const refresh = () => {
            const boardsList = boardsService.boardsList;

            this.boardDots = new Array(boardsList.boardsCount);
            this.activeBoardIndex = boardsSettingsService.activeBoardIndex;
        };

        const off = $rootScope.$on('grid:loaded', refresh);
        const offBoards = $rootScope.$on('boards:update', refresh);

        $scope.$on('$destroy', () => {
            off();
            offBoards();
        });

        this.choose = index => {
            if (index !== this.activeBoardIndex) {
                boardsService.choose(index, true);
            }
        };

        this.next = () => {
            boardsService.chooseNext();
        };

        this.prev = () => {
            boardsService.choosePrev();
        };

        this.handleBoardSwitcherClick = () => {
            $scope.$emit('element:action');
        };

        this.moreThanOneBoard = () => {
            return this.boardDots.length > 1;
        };

        refresh();
    }

    return {
        restrict: 'E',
        template: `
            <div class="board-switcher" ng-if="boardSwitcher.moreThanOneBoard()" ng-click="boardSwitcher.handleBoardSwitcherClick()">

                <div class="board-switch-container">
                    <div class="board-switch-zone left" ng-click="boardSwitcher.prev()"></div>
                </div>
                <ul class="dots-container">
                  <li class="board-dot"
                       ng-repeat="dot in boardSwitcher.boardDots track by $index"
                       ng-class="{active: $index === boardSwitcher.activeBoardIndex}"
                       ng-click="boardSwitcher.choose($index)">
                      <div class="board-dot-image "></div>
                  </li>
                </ul>
                <div class="board-switch-container">
                    <div class="board-switch-zone right" ng-click="boardSwitcher.next()"></div>
                </div>
            </div>
        `,
        scope: { },
        controller: BoardSwitcher,
        controllerAs: 'boardSwitcher',
        bindToController: true
    };
};


},{}],9:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "$window", "$timeout", "tileLayoutConfig", "boardsService", "boardsSettingsService", function($rootScope, $window, $timeout, tileLayoutConfig, boardsService, boardsSettingsService) {
    return {
        restrict: 'A',
        link: (scope, element) => {

            const PADDING = 10;
            const GAP = 10;
            const ANIMATION_DURATION = 400;
            let page = 0;

            const preventMouseEventsDuringAnimation = () => {
                element.addClass('no-mouse-events');

                $timeout(() => {
                    element.removeClass('no-mouse-events');
                }, ANIMATION_DURATION);
            };

            const shift = noAnimation => {
                const config = tileLayoutConfig.getConfig();
                const leftShift = 4 * config.large.width + 3 * PADDING + GAP;

                page = boardsSettingsService.activeBoardIndex;

                if (noAnimation) {
                    element.addClass('no-animation');
                    element.css({ left: -leftShift*page+ 'px' });

                    //HACK explanation here http://stackoverflow.com/questions/11131875/what-is-the-cleanest-way-to-disable-css-transition-effects-temporarily
                    element[0].offsetHeight; // jshint ignore:line

                    element.removeClass('no-animation');
                    return;
                }

                preventMouseEventsDuringAnimation();
                element.css({ left: -leftShift*page+ 'px' });
            };

            const shiftLater = noAnimation => {
                $window.requestAnimationFrame(() => {
                    shift(noAnimation);
                });
            };

            $rootScope.$on('boards:update', (event, noAnimation) => shiftLater(noAnimation));
            $rootScope.$on('grid:loaded', (event, noAnimation) => shiftLater(noAnimation));
            scope.$on('resize', () => shiftLater(true));
        }
    };
}];
},{}],10:[function(require,module,exports){
"use strict";

const tileType = require('../../../common/models/tile-type');
const extensionIds = require('./../../../common/constants/extension-ids');

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    Grid.$inject = ["$scope", "$rootScope", "linkHandler", "authProxyService", "metricService", "extensionService", "boardsService", "themesService", "ngDialog", "boardsSettingsService"];
    function Grid($scope, $rootScope, linkHandler, authProxyService, metricService, extensionService,
                  boardsService, themesService, ngDialog, boardsSettingsService) {
        const sendTileClickedMetric = url => {
            return metricService.send('tile_clicked', [ url, boardsSettingsService.activeBoardIndex ]);
        };

        const openSite = (url, data) => {
            sendTileClickedMetric(url).finally(() => {
                linkHandler.handleAction('expand-and-open', url, data);
            });
        };

        const openMusic = tile => {
            if (tile.isApp) {
                return sendTileClickedMetric('music_app').then(() => {
                    return extensionService.launchApp(extensionIds.MUSIC_APP);
                });
            }

            return sendTileClickedMetric('music_ext').then(() => {
                return extensionService.launchTabExtension('chrome://sticky');
            });
        };

        const openShowcase = data => {
            return sendTileClickedMetric('games_widget').then(() => {
                let showcaseDialog = ngDialog.open({
                    template: data.template,
                    plain: true,
                    className: data.className,
                    appendTo: 'body'
                });

                showcaseDialog.closePromise.then(data => {
                    showcaseDialog = null;
                });
            });
        };

        this.getBoards = () => {
            const boardsList = boardsService.boardsList;

            this.boards = boardsList.visibleBoards;
            this.activeBoard = boardsList.activeBoard;
        };

        this.boards = [];

        this.choose = (tile, data) => {
            $scope.$emit('element:action');
            return authProxyService.isAuthorized().then((authorized) => {
                const url = authorized ? (tile.rbAuthUrl || tile.url) : (tile.rbUrl || tile.url);

                if (tile.type === tileType.MUSIC) {
                    return openMusic(tile);
                }

                if (tile.type === tileType.SHOWCASE || tile.displayType === tileType.OK_GAMES) {
                    if (tile.displayType === tileType.OK_GAMES) {
                        metricService.fetchRbPixel(authorized ? tile.authBannerId : tile.bannerId);
                    }
                    return openShowcase(data);
                }
                return openSite(url, data);
            });
        };

        this.remove = tile => {
            boardsService.removeTile(tile);
            boardsService.sync().then(() => {
                return metricService.send('tile_removed', [ tile.url, boardsSettingsService.activeBoardIndex ]);
            });
        };

        this.refresh = first => {
            boardsService.load().finally(() => {
                this.getBoards();
                $scope.$emit('grid:loaded', first === true);
            }).catch(err => {
                console.error('Error Loading tiles', err);
            }).finally(() => {
                if (first === true) {
                    const activeBoard = this.activeBoard;
                    let tilesCount = 0;
                    if (activeBoard && activeBoard.tiles) {
                        tilesCount = activeBoard.tiles.length;
                    }

                    metricService.send('open', [
                        tilesCount,
                        boardsService.boardsList.boardsCount,
                        themesService.activeThemeName,
                        boardsService.boardsList.allTilesCount,
                        boardsSettingsService.currentMode
                    ]);
                }
            });
        };

        this.boardSwitch = () => {
            this.getBoards();
        };

        this.isEmpty = () => {
            return boardsService.boardsList.isEmpty;
        };

        $rootScope.$on('boards:update', () => { this.getBoards(); });
        $scope.$on('background:tiles-changed', () => { this.refresh(); });

        this.refresh(true);
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="grid">
                <div ng-show="!grid.isEmpty()" class="boards-outer-wrapper">
                    <div class="boards-inner-wrapper">
                        <div class="boards-list" boards-list>
                            <div class="board-container" ng-repeat="board in grid.boards track by $index">
                                <ul class="board-tiles"
                                    tile-layout
                                    ng-show="board === grid.activeBoard"
                                    ng-if="board !== undefined"
                                    ng-class="{active: board === grid.activeBoard}">
                                    <tile-component
                                        class="tile-item ripple-container"
                                        ng-repeat="tile in board.displayedTiles"
                                        ng-class="{'draggable-item': tile.dragOptions.hidden, 'draggable-fix': tile.dragOptions.sizeFix, elastic: tile.type !== 'blank'}"
                                        tile="tile"
                                        data-highlight="{{tile.id}}"
                                        draggable-tile="{{tile.type !== 'blank'}}"
                                        droppable-tile="{{tile.type !== 'blank'}}"
                                        choose="grid.choose(tile, data)"
                                        remove="grid.remove(tile)"
                                        no-controls="false">
                                    </tile-component>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        scope: { },
        controller: Grid,
        controllerAs: 'grid',
        bindToController: true
    };

};
},{"../../../common/models/tile-type":259,"./../../../common/constants/extension-ids":230}],11:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    SwitchZone.$inject = ["boardsService", "switchZoneService"];
    function SwitchZone(boardsService, switchZoneService) {
        this.switchPrev = () => {
            boardsService.choosePrev();
        };

        this.switchNext = () => {
            boardsService.chooseNext();
        };

        this.isEnabled = () => {
            return switchZoneService.enabled && boardsService.boardsList.boardsCount > 1;
        };
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="switch-zone-wrapper">
                <div class="switch-zone-container" ng-if="switchZone.isEnabled()">
                    <div class="switch-zone-clickable left" ng-click="switchZone.switchPrev()">
                        <div class="switch-zone">
                            <svg class="switch-figure" viewBox="0 0 100 1000" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient class="switch-gradient" id="leftGradient">
                                        <stop offset="0%"  stop-color="black" stop-opacity="1"/>
                                        <stop class="mutable-edge" offset="100%" stop-color="black" stop-opacity=".3"/>
                                    </linearGradient>
                                </defs>
                                <path fill="url(#leftGradient)"
                                      d="M 0 0 h 0 C 0 290 100 350 100 500 C 100 650 0 710 0 1000 h 0 v -1000">
                                </path>
                            </svg>
                            <div class="arrow switch-arrow"></div>
                        </div>
                    </div>
                    <div class="switch-zone-clickable right" ng-click="switchZone.switchNext()">
                        <div class="switch-zone">
                            <svg class="switch-figure" viewBox="0 0 100 1000" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient class="switch-gradient" id="rightGradient">
                                        <stop class="mutable-edge" offset="0%"  stop-color="black" stop-opacity=".3"/>
                                        <stop offset="100%" stop-color="black" stop-opacity="1"/>
                                    </linearGradient>
                                </defs>
                                <path fill="url(#rightGradient)"
                                      d="M 100 0 h 0 C 100 290 0 350 0 500 C 0 650 100 710 100 1000 h 0 v -1000">
                                </path>
                            </svg>
                            <div class="arrow switch-arrow"></div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        scope: { },
        controller: SwitchZone,
        controllerAs: 'switchZone',
        bindToController: true
    };

};
},{}],12:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$window", "$timeout", "$rootScope", "tileLayoutService", "dragService", function($window, $timeout, $rootScope, tileLayoutService, dragService) {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            const el = element[0];

            const applyStyles = () => {
                const children = el.children;
                const numChildren = children.length;

                if (numChildren === 0) {
                    return;
                }

                angular.forEach(children, (child, index) => {
                    const options = tileLayoutService.getOptions(index, numChildren);

                    if (options) {
                        angular.element(child)
                            .removeClass('large small medium')
                            .addClass(options.cls)
                            .css({
                                width: options.size.width + 'px',
                                height: options.size.height + 'px',
                                top: options.position.row + 'px',
                                left: options.position.col + 'px'
                            });
                    }
                });

                scope.$emit('tiles:rendered');
            };

            const applyStylesLater = () => {
                $window.requestAnimationFrame(applyStyles, el);
            };

            const applyStylesAfterDragging = () => {
                $timeout(applyStyles, 1000/60); //TODO - requestAnimationFrame bug in Chrome >40
            };

            const resizeHandler = () => {
                applyStylesLater();
            };

            const getParent = () => {
                return element.parent()[0];
            };

            const dragOverHandler = event => {
                event.preventDefault();
                event.dataTransfer.dropEffect = dragService.dragging ? 'move' : 'none';
            };

            const unwatchCollection = scope.$watch(() => element.children().length, applyStylesLater);

            const offGridLoaded = $rootScope.$on('grid:loaded', applyStylesLater);
            const offBoardsUpdate = $rootScope.$on('boards:update', applyStylesLater);
            const offTileMoved = $rootScope.$on('boards:tile-moved', applyStylesAfterDragging);

            element.on('dragover', dragOverHandler);

            scope.$on('$destroy', () => {
                unwatchCollection();
                offGridLoaded();
                offBoardsUpdate();
                offTileMoved();
                $window.removeResizeListener(getParent(), resizeHandler);
                element.off('dragover', dragOverHandler);
            });

            $window.addResizeListener(getParent(), resizeHandler);

            applyStylesLater();
        }
    };
}];
},{}],13:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "$window", "$pageVisibility", "$animate", "boardsService", "dragService", "overlayService", "themesService", "keyCodes", "ngDialog", function($rootScope, $window, $pageVisibility, $animate, boardsService,
                                        dragService, overlayService, themesService, keyCodes, ngDialog) {
    return {
        restrict: 'A',
        link: (scope, element) => {

            const el = element[0];

            const clickHandler = () => {
                if (element.hasClass('ngdialog-open')) { // don't count click in modals as body click
                    $rootScope.$broadcast('modal:click');
                    return;
                }
                $rootScope.$broadcast('body:click');
            };

            const focusHandler = () => {
                $rootScope.$broadcast('body:focus');
            };

            const notifyAboutResizing = () => {
                $rootScope.$broadcast('resize');
            };

            const keyUpHandler = event => {
                let onBody = true;

                if (event.target !== el || overlayService.visible || themesService.panelOpened) {
                    onBody = false;
                }

                switch (event.which) {
                    case keyCodes.LEFT_ARROW:
                        if (onBody) {
                            boardsService.choosePrev();
                        }
                        $rootScope.$broadcast('body:left-arrow');
                        break;
                    case keyCodes.RIGHT_ARROW:
                        if (onBody) {
                            boardsService.chooseNext();
                        }
                        $rootScope.$broadcast('body:right-arrow');
                        break;
                }

                scope.$apply();
            };

            const dragOverHandler = event => {
                if (dragService.dragging) {
                    event.preventDefault();
                    dragService.dragX = event.clientX;
                }
            };

            const handleTileDrop = () => {
                dragService.off();
                boardsService.removeDraggingOptions();
                boardsService.sync();
            };

            const dropHandler = event => {
                if (dragService.dragging) {
                  event.preventDefault();

                    switch (dragService.dragType) {
                        case 'tile':
                            handleTileDrop();
                            break;
                        default:
                            handleTileDrop();
                    }

                    scope.$apply();
                }
            };

            const didLeaveViewport = (event) => {
              const pageX = event.pageX;
              const pageY = event.pageY;

              return (
                pageX >= window.innerWidht || pageX <= 0 ||
                pageY >= window.innerHeight || pageY <= 0
              );
            };

            const dragLeaveHandler = event => {
                if (dragService.dragging && didLeaveViewport(event)) {
                    dropHandler(event);
                }
            };

            $window.addEventListener('resize', notifyAboutResizing);

            $rootScope.$on('ngDialog.closing', () => {
                const dialogs = ngDialog.getOpenDialogs();

                /*
                 * if it's last dialog remove 'ngdialog-open' class
                 * during closing for proper animation
                  */
                if (dialogs.length <= 1) {
                    element.removeClass('ngdialog-open');
                }
            });

            $pageVisibility.$on('pageFocused', function(){
                $animate.enabled(true);
            });

            $pageVisibility.$on('pageBlurred', function(){
                $animate.enabled(false); //FIXME - hack for https://jira.mail.ru/browse/AMIGO-5595 , should be removed after updating to angular 1.5
            });

            element
                .on('click', clickHandler)
                .on('focus', focusHandler)
                .on('keyup', keyUpHandler)
                .on('dragend', dropHandler)
                .on('dragover', dragOverHandler)
                .on('dragleave', dragLeaveHandler)
                .on('drop', dropHandler);

        }
    };
}];

},{}],14:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "$q", function($rootScope, $q) {
    return {
        restrict: 'A',
        priority: 999,
        link: (scope, element) => {
            element[0].style.opacity = 0;

            const createListenerPromise = () => {
                return event => {
                    return $q(resolve => {
                        $rootScope.$on(event, resolve);
                    });
                };
            };

            $q.all([
                createListenerPromise()('grid:loaded'),
                createListenerPromise()('themes:loaded')
            ]).then(() => {
                element[0].style.opacity = 1.0;
                $rootScope.$emit('page:loaded');
            });
        }
    };
}];
},{}],15:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "$timeout", "boardsService", "overlayService", "themesService", function($rootScope, $timeout, boardsService, overlayService, themesService) {
    return {
        restrict: 'A',
        link: () => {

            const SHOW_HINT_TIMEOUT = 2000;

            const checkIfHintNeeded = () => {
                $timeout(() => {
                    if (!overlayService.visible ) {
                        $rootScope.$emit('hints:canDragTile');
                        $rootScope.$emit('hints:moreThemes');

                        if (!boardsService.boardsList.hasNoPlaceToAdd) {
                            $rootScope.$emit('hints:addTile');
                        }
                    }
                }, SHOW_HINT_TIMEOUT);
            };

            checkIfHintNeeded();

        }
    };
}];
},{}],16:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    PageTheme.$inject = ["$scope", "$element", "themesService", "dragService", "boardsService", "themesImagesLoadService"];
    function PageTheme($scope, $element, themesService, dragService, boardsService, themesImagesLoadService) {

        function getBackgroundImageString(url) {
            return `url(${url})`;
        }

        const classes = {
            dark: 'dark',
            light: 'light',
            own: 'own'
        };

        let first = true;
        
        function changeColorScheme(colorScheme) {
            var newColorClass = classes[colorScheme];
            Object.keys(classes).forEach(classKey => {
                var colorClass = classes[classKey];
                if (colorClass !== newColorClass) {
                    $element.removeClass(colorClass);
                } else {
                    if (!$element.hasClass(newColorClass)) {
                        $element.addClass(newColorClass);
                    }
                }
            });
        }

        function hasTheme() {
            return themesService.activeTheme !== undefined;
        }

        const setTheme = () => {
            const lowerLayer = angular.element(document.querySelector('.page-background-lower-layer'));
            const upperLayer = angular.element(document.querySelector('.page-background-upper-layer'));

            if (hasTheme()) {
                const activeTheme = themesService.activeTheme;

                // refactored to support indexedDb used in FIREFOX version
                themesService.getActiveThemeImages().then(activeThemeImages => {
                    console.log('ACTIVE THEME IMAGES', activeThemeImages);
                    //set color scheme on body
                    changeColorScheme(activeTheme.colorScheme);

                    if (activeTheme.noImage) {
                        upperLayer.css({
                            backgroundColor: activeTheme.bgColor,
                            backgroundImage: 'none'
                        });
                        return;
                    }

                    if (activeTheme.own) {
                        $element.addClass('own');
                    }

                    const fullImage = getBackgroundImageString(activeThemeImages.full);
                    const localImage = activeThemeImages.local ? `${getBackgroundImageString(activeThemeImages.local)}, ` : '';
                    const previewImage = getBackgroundImageString(activeThemeImages.preview);
                    const transitionStr = 'background-image .1s ease, -webkit-filter .4s .2s ease, filter .4s .2s ease';
                    const loadedTransitionStr = 'background-image .25s ease';

                    lowerLayer.css({
                        backgroundImage: previewImage
                    });

                    if (!localImage) {
                        // if no local image yet, set preview as background
                        upperLayer.css({
                            backgroundImage: previewImage,
                            backgroundColor: ''
                        }).addClass('blurred');

                        // and start to load full image
                        themesImagesLoadService.loadActiveThemeImage().then(dataUrl => {
                            upperLayer.css({
                                backgroundImage: getBackgroundImageString(dataUrl),
                                backgroundColor: ''
                            }).removeClass('blurred');
                        });
                    } else {
                        themesImagesLoadService.stopLoading();

                        upperLayer.css({
                            backgroundImage: localImage + fullImage,
                            backgroundColor: ''
                        });
                    }
                });
            } else {
                // if no theme clear background and container
                changeColorScheme('dark');

                lowerLayer.css({
                    backgroundImage: 'none'
                });

                upperLayer.css({
                    backgroundImage: 'none',
                    backgroundColor: ''
                });
            }
        };

        this.isDragging = () => {
            return dragService.dragging;
        };

        this.isSimpleMode = () => {
            return boardsService.boardsList.isEmpty;
        };

        this.loadingTheme = () => {
            return themesImagesLoadService.isLoading();
        };

        $scope.$on('theme:changed', () => {
            setTheme();

            if (first) {
                first = false;
            }
        });
    }

    return {
        restrict: 'A',
        controller: PageTheme,
        controllerAs: 'pageTheme'
    };
};
},{}],17:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    DragZoneContainer.$inject = ["$rootScope", "boardsService", "dragService", "objectUtils"];
    function DragZoneContainer($rootScope, boardsService, dragService, objectUtils) {

        const updateDragZones = () => {
            const boardsList = boardsService.boardsList;

            this.leftZoneAvailable = boardsList.hasFreeSpaceOnTheLeft();
            this.rightZoneAvailable = boardsList.hasFreeSpaceOnTheRight();
        };

        const move = (condition, direction) => {
            if (condition) {
                const oldTileInfo = dragService.dragData;
                const newTileInfo = boardsService.moveTileToBoardWithFreeSpace(oldTileInfo.tileIndex, oldTileInfo.boardIndex, direction);

                if (objectUtils.isObject(newTileInfo)) {
                    boardsService.choose(newTileInfo.newBoardIndex);
                    dragService.setDragData({
                        tileIndex: newTileInfo.newTileIndex,
                        boardIndex: newTileInfo.newBoardIndex
                    });
                }
            }
        };

        this.movePrev = () => {
            const condition = boardsService.boardsList.boardsCount > 1 && this.leftZoneAvailable && dragService.dragging;
            move(condition, 'prev');
        };

        this.moveNext = () => {
            const condition = this.rightZoneAvailable && dragService.dragging;
            move(condition, 'next');
        };

        $rootScope.$on('boards:update', updateDragZones);
        $rootScope.$on('grid:loaded', updateDragZones);
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="drag-zone-wrapper">
                <div class="drag-zone-container">
                    <drag-zone class="left"
                               on-drag-enter="vm.movePrev()"
                               ng-class="{available: vm.leftZoneAvailable}"></drag-zone>
                    <drag-zone class="right"
                               on-drag-enter="vm.moveNext()"
                               ng-class="{available: vm.rightZoneAvailable}"></drag-zone>
                </div>
            </div>
        `,
        scope: { },
        controller: DragZoneContainer,
        controllerAs: 'vm',
        bindToController: true
    };

};
},{}],18:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/  function() {

    /*@ngInject*/
    DragZone.$inject = ["$scope", "$interval", "$element"];
    function DragZone($scope, $interval, $element) {
        let dragInterval;
        const switchInterval = 1000;

        const dragEnterHandler = event => {
            event.preventDefault();
            event.stopPropagation();
            $element.addClass('dragged-in');
            $scope.$emit('element:action');
            this.onDragEnter();
            dragInterval = $interval(() => {
                this.onDragEnter();
            }, switchInterval);
        };

        const dragLeaveHandler = event => {
            $element.removeClass('dragged-in');
            $interval.cancel(dragInterval);
        };

        const dragOverHandler = event => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        };

        $element
            .on('dragenter', dragEnterHandler)
            .on('dragleave', dragLeaveHandler)
            .on('dragover', dragOverHandler)
            .on('drop', dragLeaveHandler);

        $scope.$on('$destroy', event => {
            $element
                .off('dragenter', dragEnterHandler)
                .off('dragleave', dragLeaveHandler)
                .off('dragover', dragOverHandler)
                .off('drop', dragLeaveHandler);

            $interval.cancel(dragInterval);
        });
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="drag-zone">
                <svg class="drag-slider" viewBox="0 0 150 1000" preserveAspectRatio="none"></svg>
                <img src="/img/boards-icon.png" class="drag-arrow">
            </div>
        `,
        scope: {
            onDragEnter: '&'
        },
        controller: DragZone,
        controllerAs: 'dragZone',
        bindToController: true
    };
};
},{}],19:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/  ["$timeout", "boardsSettingsService", "dragService", function($timeout, boardsSettingsService, dragService) {

    return {
        restrict: 'A',
        link: (scope, element, attrs) => {

            const el = element[0];
            el.draggable = (attrs.draggableTile == 'true');

            const dragStartHandler = event => {
                dragService.on('tile');

                dragService.setDragData({
                    url: scope.tile.url,
                    initialTileIndex: scope.$index,
                    initialBoardIndex: boardsSettingsService.activeBoardIndex,
                    tileIndex: scope.$index,
                    boardIndex: boardsSettingsService.activeBoardIndex
                });

                scope.tile.dragOptions = {
                    hidden: true,
                    sizeFix: true
                };
                scope.$apply();

                event.dataTransfer.effectAllowed = 'all';
                event.dataTransfer.setDragImage(el, event.offsetX, event.offsetY);

                scope.$emit('element:action');
                scope.$emit('drag:start');
                scope.$emit('hints:draggingTile');
            };

            if (el.draggable) {
                element.on('dragstart', dragStartHandler);
            }

            scope.$on('$destroy', () => {
                element.off('dragstart', dragStartHandler);
            });
        }
    };
}];
},{}],20:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/  ["boardsService", "boardsSettingsService", "dragService", function(boardsService, boardsSettingsService, dragService) {

    return {
        restrict: 'A',
        link: (scope, element, attrs) => {

            const dragOverTile = event => {
                if (!dragService.dragging) {
                    event.dataTransfer.dropEffect = 'none';
                    return;
                }
                event.dataTransfer.dropEffect = 'move';
                const elIndex = scope.$index;
                const boardIndex = boardsSettingsService.activeBoardIndex;
                const startPosition = dragService.dragData;

                const boardsList = boardsService.boardsList;

                if (!dragService.isDragOverEnabled || //if dragover disabled
                    (elIndex === startPosition.tileIndex && boardIndex === startPosition.boardIndex) || //if tile is over itself
                    !boardsList.activeBoard.tiles[elIndex]) { //if over tile, which is not exist on this board
                    return;
                }

                dragService.disableDragOver();

                if (Number.isInteger(startPosition.tileIndex) && Number.isInteger(startPosition.boardIndex) &&
                    !(startPosition.boardIndex !== boardIndex && boardsList.getBoard(boardIndex).isFull)) {
                    const moved = boardsService.moveTile(startPosition.tileIndex, elIndex, startPosition.boardIndex, boardIndex);

                    if (moved) {
                        dragService.setDragData({
                            tileIndex: elIndex,
                            boardIndex: boardIndex
                        });
                        scope.$emit('boards:tile-moved');
                    }
                }
            };

            const dropTile = event => {
                event.preventDefault();
            };

            const handlers = {
                tile: {
                    dragOver: dragOverTile,
                    drop: dropTile
                }
            };

            const dragOverHandler = event => {
                if (handlers[dragService.dragType]) {
                    handlers[dragService.dragType].dragOver(event);
                }
            };

            const dropHandler = event => {
                if (handlers[dragService.dragType]) {
                    handlers[dragService.dragType].drop(event);
                }
            };

            const el = element[0];
            el.droppable = (attrs.droppableTile == 'true');

            if (el.droppable) {
                element
                    .on('drop', dropHandler)
                    .on('dragover', dragOverHandler);
            }

            scope.$on('$destroy', () => {
                element
                    .off('drop', dropHandler)
                    .off('dragover', dragOverHandler);
            });
        }
    };
}];
},{}],21:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        scope: {
            onDrop: "&"
        },
        link(scope, element, attrs) {
            element.bind('dragover', event => {
                event.preventDefault();
                event.stopPropagation();
            });

            element.bind('dragenter', event => {
                event.preventDefault();
                event.stopPropagation();

                element.addClass('dropzone-over');
            });

            element.bind('dragleave', event => {
                event.preventDefault();
                event.stopPropagation();

                element.removeClass('dropzone-over');
            });

            element.bind('drop', event => {
                event.preventDefault();
                event.stopPropagation();

                element.removeClass('dropzone-over');

                scope.$apply(() => {
                    const filesArr = Array.from(event.dataTransfer.files, file => new Blob([file], { type: file.type }));
                    console.log('DROP FILES', filesArr);
                    scope.onDrop({ data: filesArr });
                });
            });
        }
    };
};
},{}],22:[function(require,module,exports){
"use strict";

/*@ngInject*/
GamesShowcase.$inject = ["$scope", "$rootScope", "$timeout", "linkHandler", "showcaseService", "metricService"];
function GamesShowcase($scope, $rootScope, $timeout, linkHandler, showcaseService, metricService) {
    const vm = this;
    const LOAD_TIMEOUT = 250;

    const sendTileClickedMetric = url => {
        return metricService.send('game_tile_clicked', [ url ]);
    };

    const addShowcasesLazy = showcases => {
        showcases.forEach((row, index) => {
            $timeout(() => {
                vm.showcases.push(row);
            }, index * LOAD_TIMEOUT);
        });
    };

    vm.handleNavigation = (tile, data) => {
        $rootScope.$emit('element:action'); // TODO Refactor to remove duplicate code (copy/paste from <grid /> directive)
        sendTileClickedMetric(tile.url).finally(() => {
            linkHandler.handleAction('expand-and-open', tile.url, data);
        });
    };

    vm.$onInit = () => {
        vm.showcases = [];
        vm.recentGames = [];
        vm.dialogId = $scope.$parent.ngDialogId;

        showcaseService
            .getShowcases('games')
            .then(addShowcasesLazy);
    };
}

module.exports = {
    template: `
        <dialog-wrapper dialog-id="vm.dialogId">
            <div class="dialog-content search" tabindex="-1">
                <span class="dialog-title">{{::'games_header'|localize}}</span>

                <div class="row" ng-show="vm.recentGames.length &gt; 0">
                    <paginated-list tiles="vm.recentGames"></paginated-list>
                </div>

                <div class="row repeat-row" ng-repeat="row in vm.showcases">
                    <showcase-row
                        navigate="{{::true}}"
                        title="{{::row.title}}"
                        tile-size="{{::row.tileSize}}"
                        tiles="row.tiles"
                        on-navigate="vm.handleNavigation(tile, data)">
                    </showcase-row>
                </div>
            </div>
        </dialog-wrapper>
    `,
    bindings: {},
    controller: GamesShowcase,
    controllerAs: 'vm'
};
},{}],23:[function(require,module,exports){
"use strict";
OKGamesShowcase.$inject = ["$scope", "$rootScope", "$timeout", "linkHandler", "tileFactory", "localizeFilter", "authProxyService", "messagingService", "metricService"];
const guid = require('../../../common/utils/guid');


/*@ngInject*/
function OKGamesShowcase($scope, $rootScope, $timeout, linkHandler, tileFactory, localizeFilter, authProxyService, messagingService, metricService) {
    const vm = this;
    const LOAD_TIMEOUT = 250;

    const sendTileClickedMetric = url => {
        return metricService.send('game_tile_clicked', [ url ]);
    };

    const addShowcasesLazy = showcases => {
        showcases.forEach((row, index) => {
            $timeout(() => {
                vm.showcases.push(row);
            }, index * LOAD_TIMEOUT);
        });
    };

    const convertRbGamePreviews = (response) => {
        return [{
            title: localizeFilter('ok_gamesRecommendations'),
            tileSize: 'medium',
            tiles: response.map((game) => tileFactory.create({
                id: guid(),
                type: 'site',
                url: game.url,
                title: game.title,
                extendedInfo: {
                    type: 'content',
                    image: game.iconUrl,
                    theme: 'light',
                    overlay: '0, 0, 0'
                }
            }))
        }];
    };

    const convertShowcases = (response) => {
        return response.nodes
            .filter(node => node.totalCount > 0)
            .map(node => ({
                title: node.localized_node,
                tileSize: 'small',
                tiles: node.apps.map(app => (tileFactory.create({
                    id: guid(),
                    type: 'site',
                    url: `http://ok.ru/games/${app.appId}`,
                    title: app.name,
                    extendedInfo: {
                        type: 'content',
                        image: app.pic128x128,
                        theme: 'light',
                        overlay: '0, 0, 0'
                    }
                })))
            }));
    };

    vm.handleNavigation = (tile, data) => {
        $rootScope.$emit('element:action');
        sendTileClickedMetric(tile.url).finally(() => {
            linkHandler.handleAction('expand-and-open', tile.url, data);
        });
    };

    vm.$onInit = () => {
        vm.showcases = [];
        vm.recentGames = [];
        vm.dialogId = $scope.$parent.ngDialogId;

        Promise.all([
            messagingService.send({ type: 'get_ok_games_widget' }).then(convertRbGamePreviews),
            authProxyService.getShowcases().then(convertShowcases)
        ])
            .then(results => results[0].concat(results[1]))
            .then(addShowcasesLazy);
    };
}

module.exports = {
    template: `
        <dialog-wrapper dialog-id="vm.dialogId">
            <div class="dialog-content search" tabindex="-1">
                <span class="dialog-title" ng-bind="::'ok_gamesShowcaseTitle'|localize"></span>

                <div class="row" ng-show="vm.recentGames.length &gt; 0">
                    <paginated-list tiles="vm.recentGames"></paginated-list>
                </div>

                <div class="row repeat-row" ng-repeat="row in vm.showcases">
                    <showcase-row
                        navigate="{{::true}}"
                        title="{{::row.title}}"
                        tile-size="{{::row.tileSize}}"
                        tiles="row.tiles"
                        on-navigate="vm.handleNavigation(tile, data)">
                    </showcase-row>
                </div>
            </div>
        </dialog-wrapper>
    `,
    bindings: {},
    controller: OKGamesShowcase,
    controllerAs: 'vm'
};
},{"../../../common/utils/guid":277}],24:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    Hint.$inject = ["$scope", "$rootScope", "$timeout", "hintsService"];
    function Hint($scope, $rootScope, $timeout, hintsService) {
        console.log('HINT', this.data);

        const HINT_ACTION_TIMEOUT = 200;
        const HINT_RESIZE_TIMEOUT = 250;

        const timers = [];
        const offSwitchers = [];

        const eventCallback = type => {
            const timer = $timeout(() => {
                hintsService.handleAction(this.data, type);
            }, HINT_ACTION_TIMEOUT);

            timers.push(timer);
        };

        const subscribeOnEvents = () => {
            const events = this.data.events;

            Object.keys(events).forEach(eventType => {
                if (Array.isArray(events[eventType])) {
                    const offs = events[eventType].map(eventName => {
                        return $rootScope.$on('hints:' + eventName, () => {
                            eventCallback(eventType);
                        });
                    });

                    offSwitchers.concat(offs);
                    return;
                }

                const off = $rootScope.$on('hints:' + events[eventType], function () {
                    eventCallback(eventType);
                });
                offSwitchers.push(off);
            });

            const offResize = $scope.$on('resize', () => {
                if (this.data.visible) {
                    $timeout(() => {
                        this.data.getPositionFromConfig();
                    }, HINT_RESIZE_TIMEOUT);
                }
            });

            offSwitchers.push(offResize);
        };

        subscribeOnEvents();

        $scope.$on('$destroy', () => {
            timers.forEach(timer => {
                $timeout.cancel(timer);
            });
            offSwitchers.forEach(off => {
                off();
            });
        });
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="guide hint-guide ng-hide {{::hint.data.className}}"
                 ng-style="{left: hint.data.position.left, top: hint.data.position.top}"
                 ng-show="hint.data.visible">

                <div class="guide-container">
                    <img class="guide-arrow">
                    <div class="bubble guide-bubble">
                        <div class="bubble-content">
                            <div class="bubble-normal-state">
                                <div class="bubble-icon" ng-if="hint.data.imgUrl">
                                    <img class="bubble-icon-image" ng-src="{{::hint.data.imgUrl}}">
                                    <div class="bubble-spacer"></div>
                                </div>
                                <label class="bubble-label" ng-bind-html="hint.data.description | sanitize | safeHtml"></label>
                            </div>
                            <div class="bubble-hover-state">
                                <div class="bubble-action-button">
                                    <label class="bubble-label" ng-bind-html="::'hints_close' | localize | sanitize | safeHtml"></label>
                                </div>
                                <div class="bubble-spacer"></div>
                                <div class="bubble-close-button">
                                    <div class="bubble-close-overlay"></div>
                                    <i class="bubble-close-cross"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        `,
        scope: {
            data: '='
        },
        controller: Hint,
        controllerAs: 'hint',
        bindToController: true
    };

};
},{}],25:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    Hints.$inject = ["$scope", "$rootScope", "hintsService"];
    function Hints($scope, $rootScope, hintsService) {
        this.hints = [ ];

        hintsService.load().then(hints => {
            this.hints = hints || [ ];
        });

        const offBodyClick = $scope.$on('body:click', () => {
            this.hints.forEach(hint => hint.hide());
            $scope.$apply();
        });

        const offModalClick = $scope.$on('modal:click', () => {
            this.hints.forEach(hint => hint.hide());
            $scope.$apply();
        });

        const offElementClick = $rootScope.$on('element:action', () => {
            this.hints.forEach(hint => hint.hide());
        });

        $scope.$on('$destroy', () => {
            offBodyClick();
            offModalClick();
            offElementClick();
        });
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div>
                <div ng-repeat="hint in hintsContainer.hints">
                    <hint-guide data="hint"></hint-guide>
                </div>
            </div>
        `,
        scope: { },
        controller: Hints,
        controllerAs: 'hintsContainer',
        bindToController: true
    };

};
},{}],26:[function(require,module,exports){
"use strict";

/*@ngInject*/
OnboardingControl.$inject = ["$rootScope", "localizeFilter"];
function OnboardingControl($rootScope, localizeFilter) {
    this.slides = [
        {
            type: 'themes',
            component: 'themes-slide',
            title: localizeFilter('guides_chooseBackgroundTitle'),
            description: localizeFilter('guides_chooseBackgroundDescription')
        },
        {
            type: 'tiles',
            component: 'tiles-slide',
            title: localizeFilter('guides_addSitesTitle'),
            description: localizeFilter('guides_addSitesDescription')
        }
    ];

    const switchSlide = shift => {
        this.activeSlide = this.slides[this.activeSlideIndex += shift];
    };

    this.next = () => {
        if (this.activeSlideIndex < this.slides.length - 1) {
            switchSlide(1);
        } else {
            this.closeOnboarding();
        }
    };

    this.skip = () => {
        $rootScope.$emit('slide:next', false);
    };

    this.continue = () => {
        $rootScope.$emit('slide:next', true);
    };

    this.closeOnboarding = () => {
        this.close();
    };

    this.$onInit = () => {
        this.activeSlideIndex = 0;
        this.activeSlide = this.slides[this.activeSlideIndex];
    };
}

module.exports = {
    template: `
        <div class="onboarding-control">
            <div class="onboarding-slides">
                <div ng-repeat="slide in vm.slides" ng-if="$index === vm.activeSlideIndex">
                    <div ng-switch="slide.type">
                        <themes-slide ng-switch-when="themes" on-close="vm.next()"></themes-slide>
                        <tiles-slide ng-switch-when="tiles" on-close="vm.next()"></tiles-slide>
                    </div>
                </div>
            </div>

            <div class="onboarding-handler">
                <div class="onboarding-content">
                    <header class="onboarding-header">
                        <span class="onboarding-title" ng-bind="vm.activeSlide.title"></span>
                        <span class="onboarding-progress" ng-bind="vm.activeSlideIndex | onboardingProgress : vm.slides.length"></span>
                    </header>
                    <div class="onboarding-description">
                        <span class="onboarding-description-text" ng-bind="vm.activeSlide.description"></span>
                    </div>
                    <div class="onboarding-buttons">
                        <button class="onboarding-button" ng-click="vm.skip()">{{::'onboarding_skip'|localize}}</button>
                        <button class="onboarding-button" ng-click="vm.continue()">{{::'onboarding_continue'|localize}}</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    bindings: {
        close: '&'
    },
    controller: OnboardingControl,
    controllerAs: 'vm'
};
},{}],27:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    OnboardingGuide.$inject = ["$scope", "$timeout"];
    function OnboardingGuide($scope, $timeout) {
        const GUIDE_RESIZE_TIMEOUT = 250;

        const offResize = $scope.$on('resize', () => {
            $timeout(() => {
                this.data.getPositionFromConfig();
            }, GUIDE_RESIZE_TIMEOUT);
        });

        $scope.$on('$destroy', () => {
            offResize();
        });

        this.data.getPositionFromConfig();
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="guide onboarding-guide {{::onboardingGuide.data.className}}"
                 ng-style="{left: onboardingGuide.data.position.left, top: onboardingGuide.data.position.top}"
                 ng-show="onboardingGuide.data.visible">

                <div class="guide-container">
                    <img class="guide-arrow">
                    <div class="bubble">
                        <div class="bubble-content">
                            <div class="bubble-normal-state">
                                <div class="bubble-icon" ng-if="onboardingGuide.data.imgUrl">
                                    <img class="bubble-icon-image" ng-src="{{::onboardingGuide.data.imgUrl}}">
                                    <div class="bubble-spacer"></div>
                                </div>
                                <label class="bubble-label" ng-bind="onboardingGuide.data.description"></label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        `,
        scope: {
            data: '='
        },
        controller: OnboardingGuide,
        controllerAs: 'onboardingGuide',
        bindToController: true
    };
};
},{}],28:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    OnboardingHandler.$inject = ["$timeout"];
    function OnboardingHandler($timeout) {
        const FIRST_GUIDE_APPEARANCE_DELAY = 500;

        const switchGuide = shift => {
            this.activeGuide.visible = false;
            this.activeGuide = this.guides[this.activeGuideIndex += shift];
            this.activeGuide.visible = true;
        };

        const init = () => {
            $timeout(() => {
                this.activeGuide.visible = true;
            }, FIRST_GUIDE_APPEARANCE_DELAY);
        };

        this.activeGuideIndex = 0;
        this.activeGuide = this.guides[this.activeGuideIndex];

        this.next = () => {
            if (this.activeGuideIndex < this.guides.length - 1) {
                switchGuide(1);
            } else {
                this.closeOnboarding();
            }
        };

        this.prev = () => {
            if (this.activeGuideIndex > 0) {
                switchGuide(-1);
            }
        };

        this.nextButtonImage = () => {
            return this.activeGuideIndex === this.guides.length - 1 ?
                '/img/onboarding/onboarding-done.png' :
                '/img/onboarding/onboarding-arrow.png';
        };

        this.closeOnboarding = () => {
            this.close();
        };

        init();
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="onboarding-handler">
                <div class="onboarding-content">
                    <header class="onboarding-header">
                        <span class="onboarding-title" ng-bind="onboardingHandler.activeGuide.helpTitle"></span>
                        <span class="onboarding-progress" ng-bind="onboardingHandler.activeGuideIndex | onboardingProgress : onboardingHandler.guides.length"></span>
                    </header>
                    <div class="onboarding-description">
                        <span class="onboarding-description-text" ng-bind="onboardingHandler.activeGuide.helpText"></span>
                    </div>
                    <div class="onboarding-buttons">
                        <button class="onboarding-button" ng-click="onboardingHandler.prev()" ng-if="onboardingHandler.activeGuideIndex > 0">{{::'onboarding_return'|localize}}</button>
                        <div class="onboarding-divider" ng-if="onboardingHandler.activeGuideIndex > 0"></div>
                        <button class="onboarding-button" ng-click="onboardingHandler.closeOnboarding()">{{::'onboarding_closeGuides'|localize}}</button>
                    </div>
                </div>
                <button class="onboarding-next-button" ng-click="onboardingHandler.next()">
                    <img ng-src="{{onboardingHandler.nextButtonImage()}}">
                </button>
            </div>
        `,
        scope: {
            guides: '=',
            close: '&'
        },
        controller: OnboardingHandler,
        controllerAs: 'onboardingHandler',
        bindToController: true
    };
};
},{}],29:[function(require,module,exports){
"use strict";

/*@ngInject*/
Onboarding.$inject = ["$scope", "$rootScope", "onboardingService", "tabService"];
function Onboarding($scope, $rootScope, onboardingService, tabService) {
    const ONBOARDING_FLAG = 'onboarding-opened';
    const switchSlide = shift => {
        const activeSlideIndex = this.activeSlideIndex + shift;
        const activeSlide = this.slides[activeSlideIndex];

        if (activeSlide.type === 'url') {
            tabService.update({
                url: activeSlide.data.url
            });
            return;
        }

        this.activeSlideIndex = activeSlideIndex;
        this.activeSlide = activeSlide;
    };

    this.isOpened = false;

    this.close = () => {
        onboardingService.close();
        this.isOpened = false;

        document.body.classList.remove(ONBOARDING_FLAG);
    };

    this.handleOnboardingClick = event => {
        event.preventDefault();
        event.stopPropagation();
    };

    this.next = () => {
        if (this.activeSlideIndex < this.slides.length - 1) {
            switchSlide(1);
        } else {
            this.close();
        }
    };

    this.skip = () => {
        $rootScope.$emit('slide:next', false);
    };

    this.continue = () => {
        $rootScope.$emit('slide:next', true);
    };

    this.$onInit = () => {
        $scope.$on('body:click', this.close);
        $rootScope.$on('element:action', this.close);

        $rootScope.$on('page:loaded', () => {
            onboardingService.checkIfShouldOpen().then(should => {
                if (should) {
                    this.isOpened = true;

                    onboardingService.getSlides().then(slides => {
                        if (slides.length === 0) {
                            this.close();
                            return;
                        }

                        this.slides = slides;
                        this.activeSlideIndex = 0;
                        this.activeSlide = this.slides[this.activeSlideIndex];
                    });

                    document.body.classList.add(ONBOARDING_FLAG);
                } else {
                    // because at first opening this flag is set as true in preload.js file
                    document.body.classList.remove(ONBOARDING_FLAG);
                }
            });
        });
    };
}

module.exports = {
    template: `
        <div>
            <div ng-if="vm.isOpened && vm.slides.length > 0" class="onboarding" ng-click="vm.handleOnboardingClick($event)">

                <div class="onboarding-slides">
                    <div ng-repeat="slide in vm.slides" ng-if="$index === vm.activeSlideIndex">
                        <div ng-switch="slide.type">
                            <themes-slide ng-switch-when="themes" on-close="vm.next()"></themes-slide>
                            <tiles-slide ng-switch-when="tiles" on-close="vm.next()"></tiles-slide>
                        </div>
                    </div>
                </div>

                <div class="onboarding-control">
                    <div class="onboarding-content">
                        <header class="onboarding-header">
                            <span class="onboarding-title" ng-bind="vm.activeSlide.title"></span>
                            <span class="onboarding-progress" ng-bind="vm.activeSlideIndex | onboardingProgress : vm.slides.length"></span>
                        </header>
                        <div class="onboarding-description">
                            <span class="onboarding-description-text" ng-bind="vm.activeSlide.description"></span>
                        </div>
                    </div>
                    <div class="onboarding-buttons">
                        <button class="onboarding-skip-button action-button secondary-button" ng-click="vm.skip()">{{::'onboarding_skip'|localize}}</button>
                        <button class="onboarding-continue-button action-button primary-button" ng-click="vm.continue()" ng-bind="vm.activeSlide.actionText"></button>
                    </div>
                </div>
            </div>
        </div>
    `,
    bindings: { },
    controller: Onboarding,
    controllerAs: 'vm'
};
},{}],30:[function(require,module,exports){
"use strict";

/*@ngInject*/
ThemesSlide.$inject = ["$rootScope", "themesService"];
function ThemesSlide($rootScope, themesService) {
    let offSlideNext;

    this.selectTheme = index => {
        this.selectedThemeIndex = index;
        this.applySelected();
    };

    this.applySelected = () => {
        const themeName = this.themes[this.selectedThemeIndex].name;
        themesService.activeTheme = themesService.getThemeByName(themeName);
    };

    this.$onInit = () => {
        this.selectedThemeIndex = 0;
        this.themes = themesService.onboardingThemes;

        if (themesService.onboardingThemes.length === 0 ) {
            this.onClose();
            return;
        }

        offSlideNext = $rootScope.$on('slide:next', ($event, apply) => {
            if (!apply) {
                this.selectTheme(0);
            }

            this.onClose();
        });
    };

    this.$onDestroy = () => {
        if (offSlideNext) {
            offSlideNext();
        }
    };
}

module.exports = {
    template: `
        <div class="slide-content">
            <span class="slide-title">{{::'onboarding_settingsHeader'|localize}}</span>
            <div class="slide-items">
                <div
                    class="slide-item themes-slide-item selectable-item"
                    ng-repeat="theme in vm.themes"
                >
                    <theme-preview
                        ng-click="vm.selectTheme($index)"
                        theme-image="{{theme.image}}">
                    </theme-preview>
                    <div ng-if="$index === vm.selectedThemeIndex" class="selectable-item-overlay">
                        <div class="selectable-item-overlay-check">
                            <checkmark></checkmark>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    bindings: {
        onClose: '&'
    },
    controller: ThemesSlide,
    controllerAs: 'vm'
};
},{}],31:[function(require,module,exports){
"use strict";

/*@ngInject*/
TilesSlide.$inject = ["$rootScope", "boardsService", "siteSerializer"];
function TilesSlide($rootScope, boardsService, siteSerializer) {
    const TILES_FOR_BOARD = 12;
    let offSlideNext;

    this.isSelected = index => {
        return this.selected.includes(index);
    };

    this.toggleTile = tileIndex => {
        const position = this.selected.indexOf(tileIndex);

        if (position !== -1) {
            this.selected.splice(position, 1);
            return;
        }

        this.selected.push(tileIndex);
    };

    this.applySelected = () => {
        const newTiles = siteSerializer.serialize(this.tiles.filter((tile, index) => this.isSelected(index)));
        const boards = [];

        while (newTiles.length > 0) {
            boards.push({ tiles: newTiles.splice(0, TILES_FOR_BOARD) });
        }

        boardsService.boardsList.resetBoards(boards);
        boardsService.sync();
    };

    this.$onInit = () => {
        // mark selected first 12 tiles
        this.selected = new Array(TILES_FOR_BOARD).fill(null).map((item, index) => index);
        this.tiles = boardsService.boardsList.getAllTiles();

        offSlideNext = $rootScope.$on('slide:next', ($event, apply) => {
            if (apply) {
                this.applySelected();
            }

            this.onClose();
        });
    };

    this.$onDestroy = () => {
        offSlideNext();
    };
}

module.exports = {
    template: `
        <div class="slide-content">
            <span class="slide-title">{{::'onboarding_settingsHeader'|localize}}</span>
            <ul class="slide-items" suggests-tile-layout="medium">
                <li class="tile-item medium recommendation-tile recommendation-repeat slide-item selectable-item"
                    ng-repeat="tile in vm.tiles"
                    ng-click="vm.toggleTile($index)">
                    <tile-component tile="tile" no-controls="true"></tile-component>
                    <div ng-if="vm.isSelected($index)" class="selectable-item-overlay">
                        <div class="selectable-item-overlay-check">
                            <checkmark></checkmark>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    `,
    bindings: {
        onClose: '&'
    },
    controller: TilesSlide,
    controllerAs: 'vm'
};
},{}],32:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    ShortcutMenu.$inject = ["$scope", "$rootScope", "tabService", "themesService", "ngDialog", "localizeFilter"];
    function ShortcutMenu($scope, $rootScope, tabService, themesService, ngDialog, localizeFilter) {
        this.linkItems = [
            { title: localizeFilter('menu_history'), url: 'chrome://history', itemClass: 'history' },
            { title: localizeFilter('menu_downloads'), url: 'chrome://downloads', itemClass: 'downloads' },
            { title: localizeFilter('menu_bookmarks'), url: 'chrome://bookmarks/#1', itemClass: 'favorites' }
        ];

        this.openLink = url => {
            $scope.$emit('element:action');

            tabService.update({ url });
        };

        this.openSettings = $event => {
            $event.stopPropagation();
            $scope.$emit('element:action');

            let settingsDialog = ngDialog.open({
                template: '<settings-dialog></settings-dialog>',
                plain: true,
                className: 'settings-dialog',
                appendTo: 'body'
            });

            settingsDialog.closePromise.then(data => {
                settingsDialog = null;
            });
        };

        this.hasThemes = () => {
            return themesService.hasThemes;
        };
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="shortcut-menu-wrapper">
                <menu class="shortcut-menu">
                    <li class="shortcut-link settings-shortcut">
                        <button class="shortcut-title" ng-click="vm.openSettings($event)">{{::'menu_settings'|localize}}</button>
                    </li>
                </menu>
            </div>
        `,
        scope: { },
        controller: ShortcutMenu,
        controllerAs: 'vm',
        bindToController: true
    };
};
},{}],33:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    function ContentOverlay() {
        this.handleNoCloseZoneClick = $event => {
            $event.preventDefault();
            $event.stopPropagation();
        };
    }

    return {
        restrict: 'E',
        template: `
            <div class="content-overlay">
                <div class="no-close-zone" ng-click="contentOverlay.handleNoCloseZoneClick($event);"></div>
                <div class="dialog-close-button"></div>
            </div>
        `,
        replace: true,
        scope: {},
        controller: ContentOverlay,
        controllerAs: 'contentOverlay',
        bindToController: true
    };
};

},{}],34:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/  function() {

    /*@ngInject*/
    ExpandableOverlay.$inject = ["$scope", "$element", "$snap", "$rootScope", "$window"];
    function ExpandableOverlay($scope, $element, $snap, $rootScope, $window) {

        const surf = $snap('.expandable-overlay');

        const screenSize = () => {
            const screenWidth = $window.innerWidth;
            const screenHeight = $window.innerHeight;
            return Math.sqrt(screenWidth*screenWidth + screenHeight*screenHeight);
        };

        const expand = (x, y, color) => {
            const circle = surf.circle(x, y, 20);
            circle.attr({
                fill: color
            });
            circle.animate({
                cx: x,
                cy: y,
                r: screenSize(),
                fill: 'white'
            }, 160);
        };

        const off = $rootScope.$on('tile:expand', (event, data) => {
            const tileInfo = data.tileEvent;
            const color = data.color;
            const x = tileInfo.clientX - tileInfo.layerX + tileInfo.target.clientWidth/2;
            const y = tileInfo.clientY - tileInfo.layerY + tileInfo.target.clientHeight/2;
            $element.addClass('visible');
            expand(x, y, color);
        });

        $scope.$on('$destroy', event => {
            off();
        });
    }

    return {
        restrict: 'E',
        template: '<svg xmlns="http://www.w3.org/2000/svg" class="expandable-overlay" style="width: 100%; height: 100%"></svg>',
        replace: true,
        scope: {},
        controller: ExpandableOverlay,
        controllerAs: 'expandableOverlay',
        bindToController: true
    };
};
},{}],35:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    function ConfirmTileAddBlock() {

    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="restore-block confirm-tile-add-block">
                <span>{{'confirm_addedCount' | localize | replaceCount:vm.addedCount}}</span>
                <button type="button" class="link" ng-click="vm.onCancel()">{{::'confirm_cancel'|localize}}</button>
                <button type="button" class="link" ng-click="vm.onCloseWindow()">{{::'confirm_add'|localize}}</button>
                <button class="close" type="button" ng-click="vm.onHide()"></button>
            </div>
        `,
        scope: {
            addedCount: '@',
            onHide: '&',
            onCancel: '&',
            onCloseWindow: '&'
        },
        controller: ConfirmTileAddBlock,
        controllerAs: 'vm',
        bindToController: true
    };
};
},{}],36:[function(require,module,exports){
"use strict";

/*@ngInject*/
DialogWrapper.$inject = ["$scope", "$rootScope", "$element", "ngDialog"];
function DialogWrapper($scope, $rootScope, $element, ngDialog) {
    const SCROLLBAR_SAFE_ZONE_SIZE = 30;
    const el = $element[0];

    const hasScrollbar = () => {
        return el.scrollHeight > el.clientHeight;
    };

    this.onContentClick = event => {
        event.stopPropagation();
        $rootScope.$emit('dialog:click');
    };

    this.close = () => {
        ngDialog.close(this.dialogId);
    };

    this.onWrapperClick = event => {
        if (hasScrollbar() && window.innerWidth - event.clientX <= SCROLLBAR_SAFE_ZONE_SIZE) {
            return;
        }

        this.close();
    };
}

module.exports = {
    transclude: true,
    template: `
        <div class="dialog-wrapper" ng-click="vm.onWrapperClick($event)">
            <close-icon class="dialog-close-button" ng-click="vm.close()"></close-icon>
            <header class="dialog-header"></header>
            <main class="dialog-main">
                <aside class="dialog-left-side"></aside>
                <div class="dialog-content-wrapper" ng-click="vm.onContentClick($event)">
                    <ng-transclude></ng-transclude>
                </div>
                <aside class="dialog-right-side"></aside>
            </main>
        </div>
    `,
    bindings: {
        dialogId: '@'
    },
    controller: DialogWrapper,
    controllerAs: 'vm'
};
},{}],37:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    RestoreBlock.$inject = ["$rootScope", "$scope", "$q", "boardsService"];
    function RestoreBlock($rootScope, $scope, $q, boardsService) {
        let visible = false;
        let deletedTiles = [];

        const offRemove = $rootScope.$on('grid:remove', ($event, tileInfo) => {

            deletedTiles.unshift(tileInfo);

            this.show();

            if (deletedTiles.length === 2) {
                $scope.$emit('hints:restoreTile');
            }
        });

        const offClick = $rootScope.$on('element:action', () => {
            if (visible) {
                this.hide();
            }
        });

        $scope.$on('$destroy', () => {
            offRemove();
            offClick();
        });

        this.multiple = () => {
            return deletedTiles.length > 1;
        };

        this.visible = () => {
            return visible;
        };

        this.show = () => {
            visible = true;
        };

        this.hide = () => {
            deletedTiles = [];
            visible = false;
            boardsService.sync();
        };

        this.restore = () => {
            const last = deletedTiles.shift();

            boardsService.restoreTile(last);

            if (deletedTiles.length === 0) {
                this.hide();
            }

            return boardsService.sync();
        };

        this.restoreAll = () => {
            deletedTiles.forEach(deleted => boardsService.restoreTile(deleted));
            this.hide();
        };
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="restore-block" ng-show="restoreBlock.visible()">
                <span>{{::'restore_header'|localize}}</span>
                <span class="h-spacer-20"></span>
                <button type="button" class="link" ng-click="restoreBlock.restore()">{{::'restore_cancel'|localize}}</button>
                <span class="h-spacer-20"></span>
                                <span ng-if="restoreBlock.multiple()">
                                    <button type="button" class="link" ng-click="restoreBlock.restoreAll()">{{::'restore_restoreAll'|localize}}</button>
                                    <span class="h-spacer-20"></span>
                                </span>
                <button class="close" type="button" ng-click="restoreBlock.hide()"></button>
            </div>
        `,
        scope: { },
        controller: RestoreBlock,
        controllerAs: 'restoreBlock',
        bindToController: true
    };
};
},{}],38:[function(require,module,exports){
"use strict";

/*@ngInject*/
PresetOnboardingSwitcher.$inject = ["$scope", "$rootScope", "authProxyService", "localizeFilter", "presetOnboardingSwithcerService"];
function PresetOnboardingSwitcher($scope, $rootScope, authProxyService, localizeFilter, presetOnboardingSwithcerService) {
    this.isShowOnboarding = false;
    this.onboardingDescription = {};

    this.showOnboarding = () => {
        this.isShowOnboarding = true;
    };

    this.hideOnboarding = () => {
        this.isShowOnboarding = false;
    };

    this.setOnboardingDescription = description => {
        this.onboardingDescription = description;
        this.showOnboarding();
    };

    this.clearOnboardingDescription = () => {
        this.onboardingDescription = {};
        this.hideOnboarding();
    };

    this.getDescriptionOnboardingByPreset = preset => {
        switch (preset) {
          case 'okru':
              return {
                  title: localizeFilter('ok_presetTitle'),
                  description: localizeFilter('ok_presetDescription'),
                  primaryBtnTitle: localizeFilter('ok_presetLogin'),
                  primaryBtnClickHandler: () => {
                      $rootScope.$emit('auth:login');
                      this.clearOnboardingDescription();
                  },
                  secondaryBtnTitle: localizeFilter('ok_presetSkip'),
                  secondaryBtnClickHandler: () => {
                    this.clearOnboardingDescription();
                  }
              };
        }
    };

    $rootScope.$on('themes:loaded', event => {
        presetOnboardingSwithcerService.isFirstOpening().then(isFirstOpeningFlag => {
            if (!isFirstOpeningFlag) return;
            return presetOnboardingSwithcerService.getLastInstalledPresetInfo().then(presetInfo => {
                if (presetInfo != null) {
                  const presetId = presetInfo.id;
                  const description = this.getDescriptionOnboardingByPreset(presetId);
                  if (description != null) {
                      this.setOnboardingDescription(description);
                  }
                }
            });
        });
    });
}

module.exports = {
    template: `
        <div class="preset-onboarding-switcher" ng-if="vm.isShowOnboarding">
            <preset-onboarding
                onboarding-title="vm.onboardingDescription.title"
                onboarding-description="vm.onboardingDescription.description"
                primary-btn-title="vm.onboardingDescription.primaryBtnTitle"
                primary-btn-click-handler="vm.onboardingDescription.primaryBtnClickHandler"
                secondary-btn-title="vm.onboardingDescription.secondaryBtnTitle"
                secondary-btn-click-handler="vm.onboardingDescription.secondaryBtnClickHandler">
            </preset-onboarding>
        </div>
    `,
    bindings: { },
    controller: PresetOnboardingSwitcher,
    controllerAs: 'vm'
};

},{}],39:[function(require,module,exports){
"use strict";

/*@ngInject*/
function PresetOnboarding() {

}

module.exports = {
    template: `
        <div class="preset-onboarding">
            <div class="preset-onboarding-content">
                <header class="preset-onboarding-header">
                    <span class="preset-onboarding-title" ng-bind="vm.onboardingTitle"></span>
                </header>
                <div class="preset-onboarding-description">
                    <span class="preset-onboarding-description-text" ng-bind="vm.onboardingDescription"></span>
                </div>
            </div>
            <div class="preset-onboarding-controls">
                <button class="preset-onboarding-button-secondary action-button secondary-button"
                    ng-click="vm.secondaryBtnClickHandler()"
                    ng-bind="vm.secondaryBtnTitle">
                </button>
                <button class="preset-onboarding-button-primary action-button primary-button"
                    ng-click="vm.primaryBtnClickHandler()"
                    ng-bind="vm.primaryBtnTitle">
                </button>
            </div>
        </div>
    `,
    bindings: {
        onboardingTitle: '=',
        onboardingDescription: '=',
        primaryBtnTitle: '=',
        primaryBtnClickHandler: '<',
        secondaryBtnTitle: '=',
        secondaryBtnClickHandler: '<'
    },
    controller: PresetOnboarding,
    controllerAs: 'vm'
};

},{}],40:[function(require,module,exports){
"use strict";

/*@ngInject*/
function PresetPreview() {

}

module.exports = {
    template: `
        <div class="preset-preview">
            <div class="preset-preview-image" ng-style="{ backgroundImage: (vm.preset.preview | bgImage)}">
                <div class="preset-preview-expander"></div>
            </div>
            <div class="preset-preview-new-label" ng-if="vm.preset.isNew">
                <div class="new-label-container">
                    <span class="new-label-text">{{::'presetPreview_new'|localize}}</span>
                </div>
            </div>
            <span class="preset-preview-title" ng-bind="vm.preset.title"></span>
            <span class="preset-preview-description"
                ng-bind="vm.preset.description"
                title="{{vm.preset.description}}"
            ></span>
        </div>
    `,
    bindings: {
        preset: '<'
    },
    controller: PresetPreview,
    controllerAs: 'vm'
};
},{}],41:[function(require,module,exports){
"use strict";

/*@ngInject*/
Presets.$inject = ["$rootScope", "presetsService"];
function Presets($rootScope, presetsService) {

    const loadPresets = () => {
        return presetsService.load();
    };

    let offPageLoaded;
    let offPresetsApplied;

    this.$onInit = () => {
        offPageLoaded = $rootScope.$on('page:loaded', loadPresets);
        offPresetsApplied = $rootScope.$on('presets:applied', loadPresets);
    };

    this.$onDestroy = () => {
        offPresetsApplied();
        offPageLoaded();
    };
}

module.exports = {
    template: `
        <div></div>
    `,
    bindings: { },
    controller: Presets,
    controllerAs: 'vm'
};
},{}],42:[function(require,module,exports){
"use strict";

/*@ngInject*/
PresetsDialog.$inject = ["$scope", "imageLoader", "localizeFilter"];
function PresetsDialog($scope, imageLoader, localizeFilter) {
    const loadImage = () => {
        const image = this.presetInfo.preview;

        if (!image) {
            this.noImage = true;
            this.backgroundStyle = { };
            this.loading = false;
            return;
        }

        imageLoader.load(image).then(imageUrl => {
            this.noImage = false;
            this.backgroundStyle = {
                backgroundImage: `url(${imageUrl})`
            };
        }).catch(() => {
            this.noImage = true;
            this.backgroundStyle = { };
        }).finally(() => {
            this.loading = false;
        });
    };

    this.$onInit = () => {
        this.presetInfo = $scope.$parent.presetInfo;
        this.closeThisDialog = $scope.$parent.closeThisDialog; //ng-dialog method

        this.loading = true;
        this.noImage = false;
        this.backgroundStyle = {

        };

        if (this.presetInfo.alreadyApplied) {
            this.title = localizeFilter('preset_alreadyInstalled');
            this.installButtonText = localizeFilter('preset_installAgain');
        } else {
            this.title = localizeFilter('preset_askInstall');
            this.installButtonText = localizeFilter('preset_install');
        }

        loadImage();
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="presets-content dialog-content">
            <close-icon class="dialog-close-button presets-close-button" ng-click="vm.closeThisDialog()"></close-icon>
            <div class="presets-preview" ng-style="vm.backgroundStyle" ng-class="{'no-image': vm.noImage}">
                <div class="spinner" ng-if="vm.loading"></div>
            </div>
            <div class="presets-description">
                <span class="presets-description-title" ng-bind="::vm.title"></span>
                <span class="presets-description-text">{{::'presetDialog_description'|localize}}</span>
                <div class="presets-buttons">
                    <button class="action-button primary-button" ng-click="vm.closeThisDialog('ok')" ng-bind="::vm.installButtonText"></button>
                    <button class="action-button secondary-button" ng-click="vm.closeThisDialog()">{{::'presetDialog_cancel'|localize}}</button>
                </div>
            </div>
        </div>
    `,
    bindings: { },
    controller: PresetsDialog,
    controllerAs: 'vm'
};
},{}],43:[function(require,module,exports){
"use strict";

/*@ngInject*/
SearchForm.$inject = ["$q", "Suggests", "searchSuggestsService", "searchFavoritesService", "searchExampleService", "overlayService", "tabService", "linkHandler"];
function SearchForm($q, Suggests, searchSuggestsService, searchFavoritesService, searchExampleService, overlayService,
                    tabService, linkHandler) {
    const getExample = () => {
        return searchExampleService.getExample().then(example => {
            this.example = example;
        });
    };

    this.refreshSuggests = () => {
        return $q.all([
            searchSuggestsService.createSuggestsForQuery(this.formInfo.query),
            searchFavoritesService.getFavoritesByQuery(this.formInfo.query)
        ]).then(data => {
            this.suggests = new Suggests({ items: data[0] });
            this.favorites = data[1];
        });
    };

    this.clearSuggests = () => {
        this.favorites = [];
        this.suggests = new Suggests({ items: searchSuggestsService.initSuggestsWithQuery(this.formInfo.query) });
    };

    this.chooseSuggest = index => {
        let suggest;

        // When choosing first suggest (i.e that one which was created from user's input)
        // update it manually with the newest value (so don't wait other suggests update)
        if (index === 0) {
            suggest = searchSuggestsService.getFirstSuggest(this.formInfo.query);
        } else {
            suggest = this.suggests.getItem(index);
        }

        const url = suggest.getUrl();

        this.clearSuggests();
        tabService.update({ url });
    };

    this.chooseFavorite = (tile, data) => {
        linkHandler.handleAction('expand-and-open', tile.url, data);
    };

    this.changeFocus = value => {
        this.formInfo.focused = value;
    };

    this.changeOverlay = value => {
        this.formInfo.hasOverlay = value;
    };

    this.changeQuery = value => {
        this.formInfo.query = value;
    };

    this.handleOverlayClick = $event => {
        $event.stopPropagation();
        this.unfocus();
    };

    this.handleContentClick = $event => {
        $event.stopPropagation();
        this.formInfo.focused = false;
    };

    this.unfocus = () => {
        this.clearSuggests();
        this.formInfo.focused = false;
        this.formInfo.hasOverlay = false;
        overlayService.hide('search');
    };

    this.hasSuggests = () => {
        return this.suggests.length + this.favorites.length > 1;
    };

    this.$onInit = () => {
        this.suggests = new Suggests({ items: searchSuggestsService.initSuggestsWithQuery('') });
        this.favorites = [];
        getExample();

        this.formInfo = {
            query: '',
            focused: false,
            hasOverlay: false
        };
    };
}

module.exports = {
    template: `
        <div>
            <div class="search internet-search"
                ng-class="{'with-overlay': vm.formInfo.hasOverlay}"
                ng-click="vm.handleContentClick($event)">
                <search-input suggests="vm.suggests"
                              form-info="vm.formInfo"
                              example="vm.example"
                              refresh-suggests="vm.refreshSuggests()"
                              clear-suggests="vm.clearSuggests()"
                              choose-suggest="vm.chooseSuggest(index)"
                              change-focus="vm.changeFocus(value)"
                              change-overlay="vm.changeOverlay(value)"
                              change-query="vm.changeQuery(value)">
                </search-input>
                <search-suggests ng-show="vm.hasSuggests()"
                                 suggests="vm.suggests"
                                 favorites="vm.favorites"
                                 choose-suggest="vm.chooseSuggest(index)"
                                 choose-favorite="vm.chooseFavorite(tile, data)">
                </search-suggests>
            </div>
            <content-overlay ng-if="vm.formInfo.hasOverlay" ng-click="vm.handleOverlayClick($event)"></content-overlay>
        </div>
    `,
    bindings: { },
    controller: SearchForm,
    controllerAs: 'vm'
};
},{}],44:[function(require,module,exports){
"use strict";

/*@ngInject*/
SearchInput.$inject = ["$rootScope", "$element", "$timeout", "$window", "overlayService", "keyCodes", "arrayUtils", "watchService", "tabService", "metricService", "specificValues"];
function SearchInput($rootScope, $element, $timeout, $window, overlayService, keyCodes,
                     arrayUtils, watchService, tabService, metricService, specificValues) {
    const self = this;
    let changedInputFlag = false;
    let inputEl;

    const onQueryChange = query => {
        this.changeQuery({ value: query });

        if (changedInputFlag || query === '') {
            if (!this.isEmptyQuery()) {
                this.changeOverlay({ value: true });
                overlayService.show('search');
            } else {
                this.changeOverlay({ value: false });
                overlayService.hide('search');
            }

            $window.requestAnimationFrame(() => {
                this.refreshSuggests();
            });

            changedInputFlag = false;
        }
    };

    const inputDispatch = eventName => {
        if (!inputEl) {
            inputEl = $element.find('input')[0];
        }

        inputEl.dispatchEvent(new CustomEvent(eventName));
    };

    this.makeSelected = index => {
        this.suggests.selectItem(index);
        this.query = this.suggests.getItem(index).text;
    };

    this.handleInputKeyDown = $event => {
        $event.stopPropagation();
        switch ($event.which) {
            case keyCodes.LEFT_ARROW:
                break;
            case keyCodes.RIGHT_ARROW:
                console.log('RIGHT_ARROW', this);
                if (this.suggests.selectedIndex !== 0) {
                    this.refreshSuggests();
                }
                break;
            case keyCodes.UP_ARROW:
                $event.preventDefault();
                this.makeSelected(arrayUtils.getPrevIndex(this.suggests.length, this.suggests.selectedIndex));
                break;

            case keyCodes.DOWN_ARROW:
                $event.preventDefault();
                this.makeSelected(arrayUtils.getNextIndex(this.suggests.length, this.suggests.selectedIndex));
                break;

            case keyCodes.ENTER:
                $event.preventDefault();
                this.chooseSuggest({ index: this.suggests.selectedIndex });
                break;

            case keyCodes.ESCAPE:
                $event.preventDefault();
                if (this.suggests.length > 1) {
                    this.makeSelected(0);
                    this.clearSuggests();
                } else {
                    changedInputFlag = true;
                    this.query = '';
                }
                break;
            default:
                if (this.isEmptyQuery()) {
                    $timeout(() => {
                        inputDispatch('changeEmpty');
                    });
                }
                changedInputFlag = true;
                break;
        }
    };

    this.handleInputPaste = $event => {
        $event.stopPropagation();
        changedInputFlag = true;
    };

    this.handleInputClick = $event => {
        $event.stopPropagation();
        $rootScope.$emit('element:action');
    };

    this.handleInputFocus = $event => {
        $event.stopPropagation();
        this.changeFocus({ value: true });
    };

    this.handleInputBlur = $event => {
        $event.stopPropagation();
        this.changeFocus({ value: false });
    };

    this.submitSelectedSuggest = $event => {
        $event.preventDefault();
        $event.stopPropagation();
        this.chooseSuggest({ index: this.suggests.selectedIndex });
    };

    this.isEmptyQuery = () => {
        return this.query === '';
    };

    this.hasExample = () => {
        const example = this.example;
        return example && example.text && example.text !== '';
    };

    this.openExample = event => {
        event.preventDefault();

        const gp = specificValues.getValue('RFR_VALUE');
        const params = gp ? [ gp ] : [ ];

        return metricService.send('search_example_click', params).then(() => {
            const url = this.example.link;
            const which = event.which;

            if (which === 1) {
                tabService.update({ url });
            } else if (which === 2) {
                tabService.create({ url });
            }
        });
    };

    this.$onInit = () => {
        watchService.addWatchedProperty({
            obj: self,
            propName: 'query',
            initialValue: '',
            onChange: onQueryChange
        });
    };
}

module.exports = {
    template: `
        <form class="search-form" method="get" action="https://go.mail.ru/search" name="searchForm" ng-class="{'form-shadow': vm.formInfo.focused, 'focused': vm.formInfo.focused}">
            <div class="search-input-wrapper">
                <input class="search-input" id="q" name="q" type="search" autocomplete="off"
                       mutable-placeholder="focused ? '' : 'search_internet' | localize"
                       ng-model="vm.query"
                       custom-paste
                       press-enter
                       ng-model-options="{ updateOn: 'default changeEmpty customPaste enter', debounce: { default: 200, changeEmpty: 0, customPaste: 0, enter: 0 } }"
                       ng-trim="false"
                       ng-keydown="vm.handleInputKeyDown($event)"
                       ng-click="vm.handleInputClick($event)"
                       ng-focus="vm.handleInputFocus($event)"
                       ng-paste="vm.handleInputPaste($event)"
                       ng-blur="vm.handleInputBlur($event)">
                <span class="search-example" ng-if="vm.isEmptyQuery() && vm.hasExample()">
                    {{::'searchExample_text'|localize}} <a class="search-example-link" ng-href="{{vm.example.link}}" ng-bind="vm.example.text" ng-click="vm.openExample($event)"></a>
                </span>
            </div>
            <button class="search-button" ng-click="vm.submitSelectedSuggest($event)">
                <span class="search-icon"></span>
            </button>
        </form>
    `,
    bindings: {
        suggests: '<',
        formInfo: '<',
        example: '<',
        refreshSuggests: '&',
        clearSuggests: '&',
        chooseSuggest: '&',
        changeFocus: '&',
        changeOverlay: '&',
        changeQuery: '&'
    },
    controller: SearchInput,
    controllerAs: 'vm'
};
},{}],45:[function(require,module,exports){
"use strict";

/*@ngInject*/
function SearchSuggests() {
    this.selectSuggest = index => {
        this.chooseSuggest({ index });
    };

    this.selectFavorite = (tile, data) => {
        this.chooseFavorite({ tile, data });
    };
}

module.exports = {
    template: `
        <div class="suggests-container">
            <div class="favorites-container" ng-if="vm.favorites.length > 0">
                <ul class="favorites" suggests-tile-layout="medium">
                    <tile-component
                        class="favorite-tile tile-item elastic medium"
                        ng-repeat="tile in vm.favorites"
                        tile="tile"
                        choose="vm.selectFavorite(tile, data)"
                        no-controls="true">
                    </tile-component>
                </ul>
            </div>
            <div ng-repeat="suggest in vm.suggests.getAllItems()" ng-switch="suggest.type" ng-hide="$index === 0">
                <site-suggest ng-switch-when="site" suggest="suggest" select="vm.selectSuggest($index)"></site-suggest>
                <suggest ng-switch-default suggest="suggest" select="vm.selectSuggest($index)"></suggest>
            </div>
        </div>
    `,
    bindings: {
        suggests: '<',
        favorites: '<',
        chooseSuggest: '&',
        chooseFavorite: '&'
    },
    controller: SearchSuggests,
    controllerAs: 'vm'
};
},{}],46:[function(require,module,exports){
"use strict";

/*@ngInject*/
function SiteSuggest() {

}

module.exports = {
    template: `
        <div class="suggest-item site-suggest selectable" ng-class="{'selected-suggest': vm.suggest.selected}" ng-click="vm.select()">
            <div class="site-suggest-info">
                <img class="site-suggest-favicon" ng-src="data:image/png;base64,{{vm.suggest.favicon}}">
                <span class="site-suggest-title">{{vm.suggest.description}}</span>
            </div>
            <p class="site-suggest-url" ng-bind-html="vm.suggest.text | sanitize | formatSuggest:vm.suggest.query:true"></p>
        </div>
    `,
    bindings: {
        suggest: '<',
        index: '<',
        select: '&'
    },
    controller: SiteSuggest,
    controllerAs: 'vm'
};
},{}],47:[function(require,module,exports){
"use strict";

/*@ngInject*/
Suggest.$inject = ["$scope", "$element", "$window"];
function Suggest($scope, $element, $window) {
    const el = $element[0];
    const off = $scope.$watch('vm.suggest.selected', (newValue, oldValue) => {
        if (newValue === true && newValue !== oldValue) {
            return this.index === 0 ? $window.scroll($window.scrollX, 0) : el.scrollIntoView(false);
        }
    });

    this.$onDestroy = () => {
        off();
    };
}

module.exports = {
    template: `
        <div class="suggest-item selectable" ng-class="{'selected-suggest': vm.suggest.selected}" ng-click="vm.select()">
            <span class="suggest-item-text" ng-bind-html="vm.suggest.text | sanitize | formatSuggest:vm.suggest.query"></span>
        </div>
    `,
    bindings: {
        suggest: '<',
        index: '<',
        select: '&'
    },
    controller: Suggest,
    controllerAs: 'vm'
};
},{}],48:[function(require,module,exports){
"use strict";

PresetsSettings.$inject = ["presetsService", "presetsDialogService", "metricService", "localizeFilter"];
const presetsDialogOpeners = require('./../../../common/constants/presets-dialog-openers');

/*@ngInject*/
function PresetsSettings(presetsService, presetsDialogService, metricService, localizeFilter) {
    let contentEl;

    const scrollToTop = () => {
        contentEl.scrollTop = 0;
    };

    this.ALL_CATEGORY = {
        name: 'all',
        text: localizeFilter('settings_allPresets')
    };

    this.chooseCategory = category => {
        this.activeCategory = category;
        scrollToTop();

        if (category.name === this.ALL_CATEGORY.name) {
            this.displayedPresets = presetsService.presets;
            return;
        }

        this.displayedPresets = presetsService.getPresetsByCategory(category.name);
    };

    this.choosePreset = preset => {
        presetsDialogService.open(preset.id, presetsDialogOpeners.COLLECTIONS);
    };

    this.handleCategoryClick = category => {
        metricService.send('collections_category_clicked', [category.name]);
        this.chooseCategory(category);
    };

    this.$onInit = () => {
        this.displayedPresets = presetsService.presets;
        this.categories = presetsService.categories;
        this.categories.unshift(this.ALL_CATEGORY);
        this.activeCategory = this.ALL_CATEGORY;

        presetsService.markPresetsVisited();
        contentEl = document.querySelector('.presets-settings-content');
    };

    this.$onDestroy = () => {

    };
}

module.exports = {
    template: `
        <div class="presets-settings settings-layout">
            <div class="presets-settings-left settings-left">
                <img src="img/settings/presets-description-icon.svg">
                <span class="presets-settings-title" ng-bind="::'presetSettings_title' | localize"></span>
                <span class="presets-settings-description" ng-bind="::'presetSettings_description' | localize"></span>
            </div>
            <div class="presets-settings-right settings-right">
                <settings-categories
                    categories="vm.categories"
                    active-category="vm.activeCategory"
                    choose-category="vm.handleCategoryClick(category)"
                >
                </settings-categories>
                <div class="presets-settings-content">
                    <div class="presets-previews">
                        <preset-preview
                            ng-repeat="preset in vm.displayedPresets track by preset.id"
                            ng-click="vm.choosePreset(preset)"
                            preset="preset"
                        >
                        </preset-preview>
                    </div>
                </div>
            </div>
        </div>
    `,
    bindings: { },
    controller: PresetsSettings,
    controllerAs: 'vm'
};
},{"./../../../common/constants/presets-dialog-openers":231}],49:[function(require,module,exports){
"use strict";

/*@ngInject*/
function SettingsCategories() {
    this.choose = category => {
        this.chooseCategory({ category });
    };

    this.$onInit = () => {

    };

    this.$onDestroy = () => {

    };
}

module.exports = {
    transclude: true,
    template: `
        <div class="settings-categories">
            <ul class="settings-categories-list">
                <li class="settings-category"
                    ng-repeat="category in vm.categories"
                    ng-class="{active: category === vm.activeCategory}"
                    ng-click="vm.choose(category)"
                    ng-bind="category.text"
                >
                </li>
            </ul>
            <div class="settings-additionals" ng-transclude></div>
        </div>
    `,
    bindings: {
        categories: '<',
        activeCategory: '<',
        chooseCategory: '&'
    },
    controller: SettingsCategories,
    controllerAs: 'vm'
};
},{}],50:[function(require,module,exports){
"use strict";

/*@ngInject*/
SettingsDialog.$inject = ["$scope", "$rootScope", "presetsService", "themesService", "metricService", "localizeFilter"];
function SettingsDialog($scope, $rootScope, presetsService, themesService, metricService, localizeFilter) {
    const tabs = [
        {
            name: 'backgrounds',
            label: localizeFilter('settings_backgroundsTab'),
            icon: 'img/settings/themes-icon.svg#themesIcon',
            className: 'themes-tab',
            haveUpdates: angular.noop
        },
        {
            name: 'collections',
            label: localizeFilter('settings_collectionsTab'),
            icon: 'img/settings/collections-icon.svg#collectionsIcon',
            className: 'collections-tab',
            haveUpdates: presetsService.haveUpdates
        },
        {
            name: 'modes',
            label: localizeFilter('settings_modesTab'),
            icon: 'img/settings/modes-icon.svg#modesIcon',
            className: 'modes-tab',
            haveUpdates: angular.noop
        }
    ];

    this.closeSettings = () => {
        $scope.$parent.closeThisDialog(); //ngDialog method
    };

    this.onContentClick = event => {
        $rootScope.$emit('dialog:click');
    };

    this.tabChanged = index => {
        this.selectedTab = index;
        return metricService.send('settings', [ this.tabs[this.selectedTab].name ]);
    };

    this.$onInit = () => {
        this.selectedTab = 0;
        this.tabs = [ tabs[0] ];

        // show collections tab only if there is something to show
        if (presetsService.presets.length > 0) {
            this.tabs.push(tabs[1]);
        }

        return metricService.send('settings', [ this.tabs[this.selectedTab].name ]);
    };
}

module.exports = {
    template: `
        <div class="settings-content dialog-content" ng-click="vm.onContentClick($event)">
            <div class="settings-header">
                <span class="settings-header-title">{{::'settingsDialog_title'|localize}}</span>
                <settings-tab-bar
                    ng-if="vm.tabs.length > 1"
                    tabs="vm.tabs"
                    default-tab="0"
                    on-change="vm.tabChanged(index)"
                ></settings-tab-bar>
                <div class="settings-close-block">
                    <close-icon class="settings-close-button dialog-close-button" ng-click="vm.closeSettings()"></close-icon>
                </div>
            </div>
            <div class="settings-pages">
                <themes-settings ng-if="vm.selectedTab === 0"></themes-settings>
                <presets-settings ng-if="vm.selectedTab === 1"></presets-settings>
                <!--<tiles-settings ng-if="vm.selectedTab === 2"></tiles-settings>-->
            </div>
        </div>
    `,
    bindings: { },
    controller: SettingsDialog,
    controllerAs: 'vm'
};
},{}],51:[function(require,module,exports){
"use strict";

/*@ngInject*/
ThemesSettings.$inject = ["$scope", "$rootScope", "$timeout", "themesService", "watchService", "themesUploadService", "messagingService", "metricService", "localizeFilter"];
function ThemesSettings($scope, $rootScope, $timeout, themesService, watchService,
                        themesUploadService, messagingService, metricService, localizeFilter) {
    const self = this;
    let contentEl;

    const updateActiveTheme = () => {
        this.activeTheme = themesService.isRandom() ? undefined : themesService.activeTheme;
    };

    const scrollToTop = () => {
        contentEl.scrollTop = 0;
    };

    this.customCategories = {
        ALL_CATEGORY: {
            name: 'all',
            text: localizeFilter('settings_allBackgrounds')
        },
        LOADED_CATEGORY: {
            name: 'loaded',
            text: localizeFilter('settings_uploadedBackgrounds')
        },
        AUTHORS_CATEGORY: {
            name: 'authors',
            text: localizeFilter('settings_authorsInfo')
        }
    };

    this.onUpload = uploadDataArr => {
        if (Array.isArray(uploadDataArr) && uploadDataArr.length > 0) {
            this.chooseCategory(this.customCategories.LOADED_CATEGORY);
            themesUploadService.addThemes(uploadDataArr).then(result => {
                const error = result.error;
                if (error.isError) {
                    this.error = {
                        isError: true,
                        message: error.message
                    };
                }
            });
        }
    };

    this.chooseTheme = theme => {
        themesService.activeTheme = theme;
        updateActiveTheme();
    };

    this.removeTheme = theme => {
        return messagingService.send({ type: 'remove_theme', themeName: theme.name });
    };

    this.chooseCategory = (category, noScroll) => {
        this.activeCategory = category;

        if (!noScroll) {
            scrollToTop();
        }

        if (category.name === this.customCategories.ALL_CATEGORY.name) {
            this.displayedThemes = themesService.themes;
            return;
        }

        if (category.name === this.customCategories.LOADED_CATEGORY.name) {
            this.displayedThemes = themesService.loadedThemes;
            return;
        }

        if (category.name === this.customCategories.AUTHORS_CATEGORY.name) {
            this.displayedThemes = [];
            return;
        }

        this.displayedThemes = themesService.getThemesByCategory(category);
    };

    this.disableThemes = () => {
        themesService.disableThemes();
        updateActiveTheme();
    };

    this.randomizeThemes = () => {
        themesService.randomizeThemes();
        updateActiveTheme();
    };

    this.toggleRandom = () => {
        if (this.isRandom()) {
            this.chooseTheme(themesService.activeTheme);
        } else {
            this.randomizeThemes();
        }
    };

    this.isRandom = () => {
        return themesService.isRandom();
    };

    this.hasDisplayedThemes = () => {
        return this.displayedThemes.length > 0;
    };

    this.isAllCategory = () => {
        return this.activeCategory === this.customCategories.ALL_CATEGORY;
    };

    this.isLoadedCategory = () => {
        return this.activeCategory === this.customCategories.LOADED_CATEGORY;
    };

    this.isAuthorsCategory = () => {
        return this.activeCategory === this.customCategories.AUTHORS_CATEGORY;
    };

    this.isEmptyLoaded = () => {
        return !this.hasDisplayedThemes() && this.isLoadedCategory();
    };

    this.clearError = () => {
        this.error.isError = false;
    };

    this.handleErrorClick = event => {
        event.stopPropagation();
    };

    this.handleThemeClick = theme => {
        metricService.send('theme_click', [theme.name]);
        this.chooseTheme(theme);
    };

    this.handleCategoryClick = category => {
        metricService.send('themes_category_clicked', [category.name]);
        this.chooseCategory(category);
    };

    watchService.addWatchedProperty({
        obj: self,
        propName: 'uploadData',
        initialValue: null,
        onChange: self.onUpload
    });

    const offThemeChanged = $rootScope.$on('theme:changed', () => {
        this.chooseCategory(this.activeCategory, true); // update themes for current category if themes changed
        updateActiveTheme();
    });

    const offDialogClick = $rootScope.$on('dialog:click', () => {
        this.clearError();
    });

    this.$onInit = () => {
        this.displayedThemes = themesService.themes;
        this.oneThemeAuthors = themesService.authors.filter(author => author.themes.length === 1);
        this.manyThemesAuthors = themesService.authors.filter(author => author.themes.length > 1);

        this.categories = themesService.categories.slice();
        this.categories.unshift(this.customCategories.ALL_CATEGORY);
        this.categories.push(this.customCategories.LOADED_CATEGORY);
        this.activeCategory = this.customCategories.ALL_CATEGORY;

        this.error = {
            isError: false,
            message: ''
        };

        updateActiveTheme();
        contentEl = document.querySelector('.themes-content');
    };

    this.$onDestroy = () => {
        offThemeChanged();
        offDialogClick();
    };
}

module.exports = {
    template: `
        <div class="themes-settings settings-layout">

            <div class="themes-buttons settings-left">
                <label for="uploadTheme" class="themes-button themes-upload-button" file-drop-zone on-drop="vm.onUpload(data)">
                    <img class="themes-button-icon" src="img/themes/upload.svg">
                    <span class="themes-button-title">{{::'backgroundSettings_customBackgroundTitle'|localize}}</span>
                    <span class="themes-button-description">{{::'backgroundSettings_customBackgroundDescription'|localize}}</span>
                    <span class="themes-button-action">{{::'backgroundSettings_upload'|localize}}</span>
                    <input id="uploadTheme" type="file" fileread="vm.uploadData" multiple accept="image/jpeg,image/png,image/gif">
                </label>
                <div class="themes-button" ng-click="vm.toggleRandom()" ng-class="{ active: vm.isRandom() }">
                    <img class="themes-button-icon" src="img/themes/shuffle.svg">
                    <span class="themes-button-title">{{::'backgroundSettings_randomBackgroundTitle'|localize}}</span>
                    <span class="themes-button-description">{{::'backgroundSettings_randomBackgroundDescription'|localize}}</span>
                    <span class="themes-button-action" ng-bind="vm.isRandom() ? 'settings_randomBackgroundOff' : 'settings_randomBackgroundOn' | localize"></span>
                </div>
            </div>

            <div class="themes-right settings-right" ng-class="{ 'with-error': vm.error.isError }">
                <div class="themes-error ng-hide" ng-show="vm.error.isError">
                    <div class="themes-error-container" ng-click="vm.handleErrorClick($event)">
                        <img class="themes-error-icon" src="img/themes/error.svg">
                        <span class="themes-error-message" ng-bind="vm.error.message"></span>
                        <button class="cross-button themes-error-close" ng-click="vm.clearError()"></button>
                    </div>
                </div>
                <div class="themes-right-content">
                    <settings-categories
                        categories="vm.categories"
                        active-category="vm.activeCategory"
                        choose-category="vm.handleCategoryClick(category)"
                    >
                        <div class="authors-category"
                            ng-class="{active: vm.isAuthorsCategory()}"
                            ng-click="vm.handleCategoryClick(vm.customCategories.AUTHORS_CATEGORY)"
                            ng-if="!vm.isLoadedCategory()"
                        >
                            <img class="authors-category-icon" src="img/themes/authors-info.svg">
                            <span class="authors-category-text" ng-bind-html="::backgroundSettings_aboutAuthors | localize | sanitize | safeHtml"></span>
                        </div>
                    </settings-categories>

                    <div class="themes-content" ng-class="{ 'empty-loaded': vm.isEmptyLoaded() }">

                        <div class="themes-container" ng-if="vm.hasDisplayedThemes()">
                            <theme-preview
                                ng-click="vm.disableThemes()"
                                ng-if="vm.isAllCategory()"
                                theme-classes="['theme-action no-theme-action', { active: !vm.activeTheme && !vm.isRandom() }]"
                            >
                                <span class="theme-action-title">{{::'backgroundSettings_noBackground'|localize}}</span>
                            </theme-preview>
                            <theme-preview
                                ng-repeat="theme in vm.displayedThemes track by theme.name"
                                ng-click="vm.handleThemeClick(theme)"
                                theme-classes="{active: theme.name === vm.activeTheme.name, loaded: vm.isLoadedCategory()}"
                                theme="theme"
                            >
                                <tile-controls
                                    class="theme-controls light"
                                    ng-if="theme.own"
                                    close="vm.removeTheme(theme)"
                                >
                                </tile-controls>
                            </theme-preview>
                            <theme-preview
                                ng-if="vm.isLoadedCategory()"
                                theme-classes="'theme-action upload-theme-action'"
                            >
                                <label for="uploadTheme">
                                    <img class="theme-action-icon" src="img/themes/upload.svg">
                                    <span class="theme-action-title">{{::'backgroundSettings_upload'|localize}}</span>
                                </label>
                            </theme-preview>
                        </div>

                        <div class="empty-loaded-category" ng-if="vm.isEmptyLoaded()">
                            <img class="empty-loaded-icon" src="img/themes/loaded-empty.png">
                            <span class="empty-loaded-title" ng-bind-html="::'backgroundSettings_noCustomBackground' | localize | sanitize | safeHtml"></span>
                            <span class="empty-loaded-description" ng-bind-html="::'backgroundSettings_uploadCustomBackround' | localize | sanitize | safeHtml"></span>
                            <label for="uploadTheme" class="empty-loaded-action action-button primary-button">
                                <img class="empty-loaded-action-icon" src="img/themes/upload.svg">
                                <span class="empty-loaded-action-text">{{::'backgroundSettings_upload'|localize}}</span>
                            </button>
                        </div>

                        <div class="authors-content" ng-if="vm.isAuthorsCategory()">
                            <div class="authors-block one-theme-authors">
                                <author-block ng-repeat="author in vm.oneThemeAuthors" author="author"></author-block>
                            </div>
                            <div class="authors-block many-themes-authors">
                                <author-block ng-repeat="author in vm.manyThemesAuthors" author="author"></author-block>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    `,
    bindings: { },
    controller: ThemesSettings,
    controllerAs: 'vm'
};
},{}],52:[function(require,module,exports){
"use strict";

/*@ngInject*/
TilesSettings.$inject = ["boardsService", "boardsSettingsService", "metricService"];
function TilesSettings(boardsService, boardsSettingsService, metricService) {
    const setActiveModeName = () => {
        this.activeModeName = boardsSettingsService.currentMode;
    };

    this.chooseMode = modeName => {
        boardsSettingsService.setMode(modeName);
        boardsService.boardsList.recalculateBoards();
        boardsService.sync();

        setActiveModeName();
    };

    this.$onInit = () => {
        this.modes = boardsSettingsService.modesList;
        setActiveModeName();
    };

    this.$onDestroy = () => {

    };
}

module.exports = {
    template: `
        <div class="tiles-settings">
            <div class="tiles-settings-block left">
                <span class="tiles-settings-title">{{::'tileSettings_title'|localize}}</span>
                <span class="tiles-settings-description">{{::'tileSettings_description'|localize}}</span>
                <ul class="tiles-modes">
                    <li class="tile-mode"
                        ng-repeat="mode in vm.modes"
                        ng-click="vm.chooseMode(mode.name)"
                        ng-class="{ active: mode.name === vm.activeModeName }"
                    >
                        <div class="tile-mode-image" ng-style="{ backgroundImage: (mode.image | bgImage) }"></div>
                        <span class="tile-mode-name" ng-bind="::mode.title"></span>
                    </li>
                </ul>
            </div>
            <div class="tiles-settings-block right">
                <img src="img/tiles-settings/mode-switch.gif">
            </div>
        </div>
    `,
    bindings: { },
    controller: TilesSettings,
    controllerAs: 'vm'
};
},{}],53:[function(require,module,exports){
"use strict";

/*@ngInject*/
GridList.$inject = ["$scope"];
function GridList($scope) {

}

module.exports = {
    template: `
        <ul class="showcase-row-tiles recommendations-container" suggests-tile-layout="small">
            <li ng-repeat="tile in vm.tiles track by tile.id" class="tile-item showcase-tile-item small">
                <selectable-tile data="{ tile: tile, category: vm.category }"></selectable-tile>
            </li>
        </ul>
    `,
    bindings: {
        tiles: '<',
        category: '@',
        onToggleSelection: '&'
    },
    controller: GridList,
    controllerAs: 'vm'
};

},{}],54:[function(require,module,exports){
"use strict";

/*@ngInject*/
PaginatedList.$inject = ["$scope"];
function PaginatedList($scope) {
    const vm = this;

    let currentItems = [];
    let total = 0;
    let offset = 0;
    let pageSize = 8;
    let currentIndex = 0;

    const update = () => {
        if (!vm.tiles) {
            return;
        }

        currentItems = vm.tiles.slice(offset, offset + pageSize);

        total = vm.tiles.length;

        const n = currentItems.length;

        if (currentIndex > n - 1) {
            currentIndex = n - 1;
        }
    };

    // API
    vm.prev = () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else if (this.hasPrev()) {
            offset--;
            currentIndex = 0;
        }

        update();
    };

    vm.next = () => {
        let correctPageSize = (total < pageSize) ? total : pageSize; // If page size is greater than total

        if (currentIndex < correctPageSize - 1) {
            currentIndex++;
        } else if (this.hasNext()) {
            offset++;
            currentIndex = pageSize - 1;
        }

        update();
    };

    vm.prevPage = () => {
        if (offset < pageSize) {
            offset = 0;
        } else {
            offset -= pageSize;
        }

        update();
    };

    vm.nextPage = () => {
        let nextOffset = offset + pageSize;

        if (total - nextOffset < pageSize) {
            offset = total - pageSize;
        } else {
            offset = nextOffset;
        }

        update();
    };

    vm.hasPrev = () => {
        return offset > 0;
    };

    vm.hasNext = () => {
        return (offset + pageSize) < total;
    };

    vm.currentItems = () => {
        return currentItems;
    };

    vm.currentIndex = () => {
        return currentIndex;
    };

    vm.$onChanges = changes => {
        total = Array.isArray(vm.tiles) ? vm.tiles.length : 0;
        offset = 0;
        currentIndex = 0;

        update();
    };
}

module.exports = {
    template: `
        <div class="recommendations" ng-keydown="vm.handleKeyDown($event)">
            <ul class="recommendations-container" suggests-tile-layout="small" ng-if="vm.currentItems().length">
                <li ng-repeat="tile in vm.currentItems() track by tile.id"
                    class="tile-item small recommendation-tile recommendations-repeat">

                     <selectable-tile data="{ tile: tile, category: vm.category }"></selectable-tile>
                </li>
            </ul>

            <button ng-if="vm.hasPrev()" class="recommendations-arrow arrow left-arrow" ng-click="vm.prevPage()" tabindex="-1"></button>
            <button ng-if="vm.hasNext()" class="recommendations-arrow arrow right-arrow" ng-click="vm.nextPage()" tabindex="-1"></button>
        </div>
    `,
    bindings: {
        tiles: '<',
        category: '@',
        onToggleSelection: '&',
        onScroll: '&',
        onBrowse: '&'
    },
    controller: PaginatedList,
    controllerAs: 'vm'
};
},{}],55:[function(require,module,exports){
"use strict";

module.exports = function(selectionManagerFactory) {
    class SelectableComponent {
        constructor() {
            this.__selectionManager = selectionManagerFactory.createInstance();
        }

        isSelected(tile) {
            return this.__selectionManager.has(tile);
        }

        handleSelection(selected, tile) {
            if (this.onToggleSelection) {
                if (selected) {
                    this.__selectionManager.add(tile);
                } else {
                    this.__selectionManager.remove(tile);
                }

                this.onToggleSelection({ tile: tile, selected: selected });
            }
        }
    }

    return SelectableComponent;
};
},{}],56:[function(require,module,exports){
"use strict";

/*@ngInject*/
SelectableTile.$inject = ["$scope", "selectionManager", "metricService"];
function SelectableTile($scope, selectionManager, metricService) {
    this.isSelected = () => {
        return selectionManager.has(this.tile.id);
    };

    this.handleClick = ($event) => {
        $event.preventDefault();
        $event.stopPropagation();

        const selected = !this.isSelected();

        if (selected) {
            selectionManager.add(this.tile.id, this.data);
        } else {
            selectionManager.remove(this.tile.id);
        }

        $scope.$emit('element:action');

        return metricService.send('showcase_tile_toggle', [ this.tile.url, selected, this.data.category ]);
    };

    this.$onInit = () => {
        this.tile = this.data.tile;
    };
}

module.exports = {
    transclude: true,
    template: `
        <div ng-click="vm.handleClick($event)" class="selectable-item">
            <tile-component tile="vm.tile" no-controls="true"></tile-component>
            <div ng-if="vm.isSelected()" class="selectable-item-overlay">
                <div class="selectable-item-overlay-check">
                    <checkmark></checkmark>
                </div>
            </div>
        </div>
    `,
    bindings: {
        data: '<'
    },
    controller: SelectableTile,
    controllerAs: 'vm'
};
},{}],57:[function(require,module,exports){
"use strict";

/*@ngInject*/
SelectedTilesPanel.$inject = ["$element", "selectionManager", "metricService"];
function SelectedTilesPanel($element, selectionManager, metricService) {
    let selectedTilesEl = null;

    this.$onInit = () => {
        this.contentHeight = 0;
    };

    this.$onChanges = changes => {
        this.contentHeight = selectedTilesEl ? selectedTilesEl.getBoundingClientRect().height : 0;
        this.tiles = selectionManager.items.map(item => item.tile);
    };

    this.$postLink = () => {
        selectedTilesEl = $element[0].querySelector('.selected-tiles');
    };

    this.remove = tile => {
        const data = selectionManager.getItem(tile.id);
        selectionManager.remove(tile.id);

        return metricService.send('showcase_tile_toggle', [ tile.url, false, data.category ]);
    };
}

module.exports =  {
    template: `
        <div class="selected-tiles-container">
            <div class="selected-tiles">
                <div class="selected-tiles-content">
                    <ul class="selected-tiles-items">
                        <li class="selected-tile-item"
                            ng-click="vm.remove(tile)"
                            ng-repeat="tile in vm.tiles track by tile.id"
                        >
                            <tile-component
                                class="tile-item special-size"
                                tile="tile"
                                no-controls="true"
                            >
                            </tile-component>
                            <div class="selected-tile-overlay">
                                <close-icon class="selected-tile-close"></close-icon>
                            </div>
                        </li>
                    </ul>

                    <div class="selected-tiles-controls">
                        <button ng-click="vm.onCancel()" type="button" class="link-btn">{{::'addShowcasePanel_cancel'|localize}}</button>
                        <button ng-click="vm.onConfirm()" type="button" class="action-button primary-button">{{::'addShowcasePanel_add'|localize}}</button>
                    </div>
                </div>
            </div>
            <div class="selected-tiles-placeholder" ng-style="{ height: vm.contentHeight + 'px' }"></div>
        </div>
    `,
    bindings: {
        tilesCount: '<',
        onConfirm: '&',
        onCancel: '&',
        onRemove: '&'
    },
    controller: SelectedTilesPanel,
    controllerAs: 'vm'
};
},{}],58:[function(require,module,exports){
"use strict";

/*@ngInject*/
function ShowcaseRow() {
    const vm = this;

    const getTilesPerRow = s => s === 'small' ? 8 : 4;

    let displayedRows = 1;

    vm.expand = () => {
        vm.expanded = true;
    };

    vm.getTilesCountBySize = () => {
        if (!vm.tiles || vm.tiles.length === 0) {
            return [];
        }

        return vm.tiles.slice(0, getTilesPerRow(vm.tileSize) * displayedRows);
    };

    vm.hasMore = () => {
        if (!vm.tiles) {
            return false;
        }

        return (displayedRows * getTilesPerRow(vm.tileSize)) < vm.tiles.length;
    };

    vm.showMore = () => displayedRows += 1;

    vm.isEmpty = () => {
        return !vm.tiles || vm.tiles.length === 0;
    };

    vm.handleNavigation = (tile, data) => {
        if (vm.onNavigate) {
            vm.onNavigate({ tile, data });
        }
    };
}

module.exports = {
    template: `
        <div class="showcase-row" ng-hide="vm.isEmpty()">
            <header class="showcase-row-header">{{::vm.title}}</header>
            <ul class="showcase-row-tiles recommendations-container" suggests-tile-layout="{{::vm.tileSize}}">
                <li ng-repeat="tile in vm.getTilesCountBySize() track by tile.id"
                    ng-class="{ small: vm.tileSize === 'small', medium: vm.tileSize === 'medium', large: vm.tileSize === 'large' }"
                    class="tile-item showcase-tile-item">

                    <tile-component ng-if="vm.navigate == 'true'" tile="tile" no-controls="true" choose="vm.handleNavigation(tile, data)"></tile-component>

                    <selectable-tile ng-if="vm.navigate != 'true'" data="{ tile: tile, category: vm.category }"></selectable-tile>
                </li>
            </ul>
            <div class="showcase-row-more" ng-if="vm.hasMore()">
                <button class="action-button primary-button more-btn" ng-click="vm.showMore()" type="button" ng-bind="::'showcase_more'|localize"></button>
            </div>
        </div>
    `,
    bindings: {
        navigate: '@', // true|false
        title: '@',
        tileSize: '@', // small|medium|large
        category: '@',
        tiles: '<',
        onNavigate: '&',
        onToggleSelection: '&'
    },
    controller: ShowcaseRow,
    controllerAs: 'vm'
};
},{}],59:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$timeout", function($timeout) {

    /*@ngInject*/
    Countdown.$inject = ["$scope", "$element", "$timeout"];
    function Countdown($scope, $element, $timeout) {
        const setData = () => {
            this.data = {
                current: this.currentData,
                next: this.nextData
            };
        };

        const ANIMATION_DURATION = 1000;

        setData();

        $scope.$watch(() => this.currentData, (newValue, oldValue) => {
            if (oldValue === undefined && newValue !== undefined) {
                setData();
                return;
            }

            if (newValue !== this.data.current && newValue !== oldValue) {
                if (newValue !== this.data.next) {
                    this.data.next = newValue;
                }
                $element.addClass('flip');

                $timeout(() => {
                    setData();
                    $element.removeClass('flip');
                }, ANIMATION_DURATION);
            } else {
                setData();
            }
        });
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="countdown-item {{::countdown.countdownType}}">
                <div class="countdown-face">
                    <div class="countdown-content">
                        <span class="countdown-value" ng-bind="countdown.data.current"></span>
                        <span class="countdown-unit" ng-bind="countdown.data.current | formatCountdown : countdown.countdownType"></span>
                    </div>
                </div>
                <div class="countdown-front">
                    <div class="countdown-up">
                        <div class="countdown-content">
                            <span class="countdown-value" ng-bind="countdown.data.current"></span>
                            <span class="countdown-unit" ng-bind="countdown.data.current | formatCountdown : countdown.countdownType"></span>
                        </div>
                    </div>
                    <div class="countdown-down">
                        <div class="countdown-content">
                            <span class="countdown-value" ng-bind="countdown.data.next"></span>
                            <span class="countdown-unit" ng-bind="countdown.data.next | formatCountdown : countdown.countdownType"></span>
                        </div>
                    </div>
                </div>
                <div class="countdown-back">
                    <div class="countdown-up">
                        <div class="countdown-content">
                            <span class="countdown-value" ng-bind="countdown.data.next"></span>
                            <span class="countdown-unit" ng-bind="countdown.data.next | formatCountdown : countdown.countdownType"></span>
                        </div>
                    </div>
                    <div class="countdown-down">
                        <div class="countdown-content">
                            <span class="countdown-value" ng-bind="countdown.data.current"></span>
                            <span class="countdown-unit" ng-bind="countdown.data.current | formatCountdown : countdown.countdownType"></span>
                        </div>
                    </div>
                </div>
            </div>
        `,
        scope: {
            currentData: '=',
            nextData: '=',
            countdownType: '@'
        },
        controller: Countdown,
        controllerAs: 'countdown',
        bindToController: true
    };
}];

},{}],60:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    IframeTile.$inject = ["$sce", "$timeout"];
    function IframeTile($sce, $timeout) {

        const IFRAME_LOADING_TIMEOUT = 500;

        const init = () => {
            $timeout(() => {
                this.loading = false;
                this.url = $sce.trustAsResourceUrl(this.data.url);
            }, IFRAME_LOADING_TIMEOUT);
        };

        this.loading = true;
        this.ntpContext = true;

        this.switchCursorContext = () => {
            this.ntpContext = !this.ntpContext;
        };

        this.handleClick = $event => {
            $event.preventDefault();

            if (this.canChoose) {
                const data = {
                    event: $event,
                    color: 'rgba(0, 0, 0, .6)'
                };

                this.choose({tile: this.data, data});
            }
        };

        init();
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="tile-component iframe-tile animated-tile">
                <a class="tile-link" ng-href="{{vm.url}}" ng-click="vm.handleClick($event)">
                    <div class="tile-content light">
                        <div class="spinner" ng-if="vm.loading"></div>

                        <div class="iframe-overlay" ng-if="vm.ntpContext"></div>

                        <iframe class="iframe-content" ng-src="{{vm.url}}" ng-if="!vm.loading" webkitallowfullscreen allowfullscreen></iframe>
                        <tile-controls class="light"
                                       ng-if="!vm.noControls"
                                       close="vm.remove(data)"
                                       with-settings="true"
                                       open-settings="vm.switchCursorContext()"></tile-controls>
                    </div>
                </a>
            </div>
        `,
        scope: {
            data: '=',
            noControls: '=',
            canChoose: '=',
            choose: '&',
            remove: '&'
        },
        controller: IframeTile,
        controllerAs: 'vm',
        bindToController: true
    };
};
},{}],61:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    Fireworks.$inject = ["$scope", "$element", "$timeout"];
    function Fireworks($scope, $element, $timeout) {

        const el = $element[0];
        const fireworksIframe = el.querySelector('iframe');
        const DELAY_BEFORE_SHOWING_LOADING_SPINNER = 300;

        const timeoutId = $timeout(() => {
            this.loading = true;
        }, DELAY_BEFORE_SHOWING_LOADING_SPINNER);

        const handleIframeLoad = () => {
            $scope.$apply(() => {
                this.loading = false;
                $timeout.cancel(timeoutId);
            });
        };

        fireworksIframe.addEventListener('load', handleIframeLoad);

        $scope.$on('$destroy', () => {
            fireworksIframe.removeEventListener('load', handleIframeLoad);
            $timeout.cancel(timeoutId);
        });
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="new-year-fireworks special-animate">
                <div class="spinner" ng-if="fireworks.loading">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
                <iframe src="http://data.amigo.mail.ru/fireworks/index.html" class="new-year-fireworks"></iframe>
                <div class="dialog-close" ng-click="fireworks.disable()"></div>
                <span class="copyright">&copy; 2015 by Jack Rugile (
                    <a href="http://codepen.io/jackrugile/pen/acAgx">http://codepen.io/jackrugile/pen/acAgx</a> )</span>
            </div>
        `,
        scope: {
            disable: '&'
        },
        controller: Fireworks,
        controllerAs: 'fireworks',
        bindToController: true
    };
};

},{}],62:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    NewYearTile.$inject = ["$scope", "$interval", "specialService", "localizeFilter"];
    function NewYearTile($scope, $interval, specialService, localizeFilter) {
        const msInDay = 1000 * 3600 * 24;
        const msInHour = 1000 * 3600;
        const msInMinute = 1000 * 60;

        const getCountdown = time => {
            const currentTime = time || Date.now();
            const currentYear = new Date(currentTime).getFullYear();
            const newYearTime = new Date(currentYear + 1, 0, 1).getTime();
            const timeBeforeNewYear = newYearTime - currentTime;
            const daysBeforeNewYear = Math.floor(timeBeforeNewYear / msInDay);
            const hoursBeforeNewYear = Math.floor((timeBeforeNewYear - (daysBeforeNewYear * msInDay)) / msInHour);
            const minutesBeforeNewYear = Math.floor((timeBeforeNewYear - (daysBeforeNewYear * msInDay + hoursBeforeNewYear * msInHour)) / msInMinute);

            return {
                days: daysBeforeNewYear,
                hours: hoursBeforeNewYear,
                minutes: minutesBeforeNewYear
            };
        };

        const updateCountdown = () => {
            const now = Date.now();
            const nowObj = new Date(now);
            const newYearPeriod = nowObj.getMonth() === 0 && nowObj.getDate() < 15;

            if (newYearPeriod) {
                this.newYearMode = true;
                this.yearNumber = nowObj.getFullYear();
                this.fullLabel = localizeFilter('ny_congratulationsFull').replace('{{vm.yearNumber}}', this.yearNumber);
            } else {
                this.newYearMode = false;
                this.countdown = {
                    current: getCountdown(now),
                    next: getCountdown(now + msInMinute)
                };
            }
        };

        const countdownRefresh = 10000;
        const countdownInterval = $interval(updateCountdown, countdownRefresh);

        this.enableFireworks = () => {
            specialService.enableFireworks();
        };

        this.handleClick = $event => {
            $event.preventDefault();

            if (this.canChoose) {
                const data = {
                    event: $event,
                    color: 'rgba(0, 0, 0, .6)'
                };

                this.choose({tile: this.data, data: data});
            } else {
                this.enableFireworks();
            }
        };

        $scope.$on('$destroy', () => {
            $interval.cancel(countdownInterval);
        });

        updateCountdown();
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="tile-component new-year-tile animated-tile">
                <a class="tile-link" href="#" ng-click="vm.handleClick($event)">
                    <div class="tile-content light">
                        <div class="tile-layout new-year-layout">
                            <div class="countdown-area" ng-if="!vm.newYearMode">
                                <span class="countdown-title full">{{::'ny_remainingFull'|localize}}</span>
                                <span class="countdown-title short">{{::'ny_remainingShort'|localize}}</span>
                                <div class="countdown">
                                    <countdown-item current-data="vm.countdown.current.days"
                                                    next-data="vm.countdown.next.days"
                                                    countdown-type="days">
                                    </countdown-item>

                                    <countdown-item current-data="vm.countdown.current.hours"
                                                    next-data="vm.countdown.next.hours"
                                                    countdown-type="hours">
                                    </countdown-item>

                                    <countdown-item current-data="vm.countdown.current.minutes"
                                                    next-data="vm.countdown.next.minutes"
                                                    countdown-type="minutes">
                                    </countdown-item>
                                </div>
                            </div>
                            <div class="new-year-area" ng-if="vm.newYearMode">
                                <span class="new-year-title full" ng-bind-html="::vm.fullLabel | sanitize | safeHtml"></span>
                                <span class="new-year-title short" ng-bind-html="::'ny_congratulationsShort' | localize | sanitize | safeHtml"></span>
                            </div>
                            <div class="tile-title-container">
                                <span class="tile-title">{{::vm.data.title}}</span>
                            </div>
                        </div>

                        <tile-controls class="dark" ng-if="!vm.noControls" close="vm.remove(data)"></tile-controls>
                    </div>
                </a>
            </div>
        `,
        scope: {
            data: '=',
            noControls: '=',
            canChoose: '=',
            choose: '&',
            remove: '&'
        },
        controller: NewYearTile,
        controllerAs: 'vm',
        bindToController: true
    };
};

},{}],63:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    SpecialContainer.$inject = ["specialService"];
    function SpecialContainer(specialService) {
        this.isFireworksEnabled = () => {
            return specialService.fireworksEnabled;
        };

        this.disableFireworks = () => {
            return specialService.disableFireworks();
        };
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div>
                <new-year-fireworks ng-if="specialContainer.isFireworksEnabled()" disable="specialContainer.disableFireworks()"></new-year-fireworks>
            </div>
        `,
        scope: { },
        controller: SpecialContainer,
        controllerAs: 'specialContainer',
        bindToController: true
    };
};

},{}],64:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    SpecialTile.$inject = ["$attrs"];
    function SpecialTile($attrs) {
        this.canBeChosen = $attrs.choose !== undefined;

        this.chooseTile = (tile, data) => {
            this.choose({ tile, data });
        };
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div ng-switch="specialTile.tile.type" class="special-tile">
                <new-year-tile ng-switch-when="new-year"
                    data="specialTile.tile"
                    remove="specialTile.remove(tile)"
                    choose="specialTile.chooseTile(tile, data)"
                    no-controls="specialTile.noControls"
                    can-choose="specialTile.canBeChosen">
                </new-year-tile>
                <iframe-tile ng-switch-when="iframe"
                    data="specialTile.tile"
                    remove="specialTile.remove(tile)"
                    choose="specialTile.chooseTile(tile, data)"
                    no-controls="specialTile.noControls"
                    can-choose="specialTile.canBeChosen">
                </iframe-tile>
            </div>
        `,
        scope: {
            tile: '=',
            noControls: '=',
            choose: '&',
            remove: '&'
        },
        controller: SpecialTile,
        controllerAs: 'specialTile',
        bindToController: true
    };
};

},{}],65:[function(require,module,exports){
"use strict";

module.exports = {
    template: `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="checkmark" x="0" y="0" viewBox="0 0 16 16">
            <path d="M2,7 l5,5 l8,-8" />
        </svg>
    `
};
},{}],66:[function(require,module,exports){
"use strict";

module.exports = {
    template: `
        <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
            <path d="M14.992,13.095 L13.086,15.011 L7.518,9.415 L1.950,15.011 L0.007,13.058 L5.575,7.463 L0.081,1.942 L1.987,0.026 L7.481,5.547 L13.012,-0.011 L14.955,1.942 L9.424,7.500 L14.992,13.095 Z"/>
        </svg>
    `
};
},{}],67:[function(require,module,exports){
"use strict";

module.exports =  function() {
    return {
        restrict: 'E',
        replace: true,
        template: `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <defs>
                <style>
                  .cls-1 {
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-width: 2px;
                    fill-rule: evenodd;
                  }
                </style>
              </defs>
              <path class="cls-1" d="M15,8A7,7,0,1,1,8,1"/>
            </svg>
        `
    };
};
},{}],68:[function(require,module,exports){
"use strict";

/*@ngInject*/
function SvgContainer() {

}

module.exports = {
    restrict: 'E',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <use xlink:href="" ng-href="{{ vm.image }}"></use>
        </svg>
    `,
    bindings: {
        image: '<'
    },
    controller: SvgContainer,
    controllerAs: 'vm'
};
},{}],69:[function(require,module,exports){
"use strict";

/*@ngInject*/
TabBar.$inject = ["$scope", "$element", "$timeout"];
function TabBar($scope, $element, $timeout) {
    let tabElements = [];
    let offFns = [];
    let el = null;
    let selectedMarkEl = null;

    const setSelectedStyle = () => {
        const tabEl = tabElements[this.selectedTab];
        const elRect = el.getBoundingClientRect();
        const tabElRect = tabEl.getBoundingClientRect();

        const width = tabElRect.width + 1; // 1px for overlapping tab border
        const left = tabElRect.left - elRect.left;

        selectedMarkEl.css({
            width: `${width}px`,
            left: `${left}px`
        });
    };

    this.isSelected = index => {
        return index === this.selectedTab;
    };

    this.handleTabClick = index => {
        if (index !== this.selectedTab) {
            this.selectedTab = index;
            this.onChange({ index });
            setSelectedStyle();
        }
    };

    this.$onInit = () => {
        this.selectedTab = this.defaultTab;

        const off = $scope.$on('resize', () => setSelectedStyle());
        offFns.push(off);
    };

    this.$postLink = () => {
        $timeout(() => {
            el = $element[0];
            tabElements = el.querySelectorAll('.settings-tab');
            selectedMarkEl = angular.element(el.querySelector('.tabbar-selected-mark'));
            setSelectedStyle();
        });
    };

    this.$onDestroy = () => {
        offFns.forEach(offFn => offFn());
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <ul class="settings-tabbar">
            <li class="settings-tab {{::tab.className}}"
                ng-repeat="tab in vm.tabs"
                ng-click="vm.handleTabClick($index)"
                ng-class="{ selected: vm.isSelected($index) }"
            >
                <svg-container class="tab-icon" image="tab.icon"></svg-container>
                <span class="tab-label" ng-class="{ 'have-updates': tab.haveUpdates() }">{{::tab.label}}</span>
            </li>
            <div class="tabbar-selected-mark" ng-style="vm.selectedStyle"></div>
        </ul>
    `,
    bindings: {
        tabs: '<',
        defaultTab: '<',
        onChange: '&'
    },
    controller: TabBar,
    controllerAs: 'vm'
};
},{}],70:[function(require,module,exports){
"use strict";

/*@ngInject*/
function Tab() {
    this.handleClick = () => {
        if (this.selected != 'true') {
            this.onClick({ index: this.index });
        }
    };
}

module.exports = {
    restrict: 'E',
    transclude: true,
    template: `
        <li class="tab" ng-class="{ 'selected': vm.selected == 'true' }" ng-click="vm.handleClick()">
            <ng-transclude></ng-transclude>
        </li>
    `,
    bindings: {
        index: '@',
        selected: '@',
        onClick: '&'
    },
    controller: Tab,
    controllerAs: 'vm'
};
},{}],71:[function(require,module,exports){
"use strict";

/*@ngInject*/
function TabBar() {
    this.isSelected = index => {
        return index === this.selectedTab;
    };

    this.handleTabClick = index => {
        if (index !== this.selectedTab) {
            this.selectedTab = index;
            this.onChange({ index });
        }
    };

    this.$onInit = () => {
        this.selectedTab = this.defaultTab;
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <ul class="tabbar">
            <li class="tab"
                ng-repeat="tab in vm.tabs"
                ng-click="vm.handleTabClick($index)"
                ng-class="{ selected: vm.isSelected($index) }"
            >
                <span class="tab-label">{{::tab.label}}</span>
                <span ng-if="::tab.hasCounter" class="tab-counter">{{::tab.counterValue}}</span>
            </li>
        </ul>
    `,
    bindings: {
        tabs: '<',
        defaultTab: '<',
        onChange: '&'
    },
    controller: TabBar,
    controllerAs: 'vm'
};
},{}],72:[function(require,module,exports){
"use strict";

/*@ngInject*/
AuthorBlock.$inject = ["themesService"];
function AuthorBlock(themesService) {

}

module.exports = {
    // TODO - change 'url({{ theme.previewImage }})' to (theme.previewImage | bgImage) after merge with 2.14
    template: `
        <div class="author-block">
            <span class="author-name" ng-bind="::vm.author.name"></span>
            <a ng-href="{{::vm.author.link}}" class="author-link" ng-bind="::vm.author.link | hostname"></a>
            <ul class="author-themes">
                <li class="author-theme"
                    ng-repeat="theme in vm.author.themes track by theme.name"
                    ng-style="{ backgroundImage: 'url({{ theme.previewImage }})' }"
                >
                </li>
            </ul>
        </div>
    `,
    controller: AuthorBlock,
    controllerAs: 'vm',
    bindings: {
        author: '<'
    }
};
},{}],73:[function(require,module,exports){
"use strict";

/*@ngInject*/
ThemePreview.$inject = ["$scope", "themesService"];
function ThemePreview($scope, themesService) {
    // refactored to support indexedDb used in FIREFOX version
    this.$onInit = () => {
        this.bgStyle = { };

        if (this.theme) {
            if (this.theme.bgColor && this.theme.bgColor.length > 0) {
                this.bgStyle.backgroundColor = this.themeColor;
                return;
            }

            themesService.getPreviewImage(this.theme).then(image => {
                this.bgStyle.backgroundImage = `url(${image})`;

                $scope.$digest();
            });
        }
    };
}

module.exports = {
    transclude: true,
    template: `
        <div class="theme" ng-class="vm.themeClasses">
            <div class="theme-outer-wrapper">
                <div class="theme-inner-wrapper">
                    <div class="theme-background" ng-style="vm.bgStyle"></div>
                    <div class="theme-content">
                        <ng-transclude></ng-transclude>
                    </div>
                </div>
            </div>
        </div>
    `,
    bindings: {
        theme: '<',
        themeClasses: '<'
    },
    controller: ThemePreview,
    controllerAs: 'vm'
};
},{}],74:[function(require,module,exports){
"use strict";

/*@ngInject*/
Themes.$inject = ["$rootScope", "$q", "themesService"];
function Themes($rootScope, $q, themesService) {
    let isLoading = false;
    const loadThemes = first => {
        console.log('LOAD THEMES', isLoading);
        if (isLoading) {
            return $q.when(true);
        }

        isLoading = true;
        return themesService.load().then(() => {
            isLoading = false;
            if (first === true) {
                $rootScope.$broadcast('themes:loaded');
            }
        });
    };

    const offThemesUpdated = $rootScope.$on('background:themes-updated', loadThemes);
    const offThemeChanged = $rootScope.$on('background:preset-theme-applied', () => loadThemes(false));

    this.$onInit = () => {
        loadThemes(true);
    };

    this.$onDestroy = () => {
        offThemesUpdated();
        offThemeChanged();
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div></div>
    `,
    bindings: { },
    controller: Themes,
    controllerAs: 'vm'
};
},{}],75:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    ThemesOpenButton.$inject = ["$scope", "themesService"];
    function ThemesOpenButton($scope, themesService) {
        this.open = $event => {
            $event.stopPropagation();
            const isOpen = themesService.panelOpened;
            $scope.$emit('element:action');

            if (!isOpen) {
                themesService.openPanel();
            }
        };

        this.hasThemes = () => {
            return themesService.hasThemes;
        };
    }

    return {
        restrict: 'E',
        template: `
            <div class="themes-open-button" ng-if="hasThemes()">
                <span class="button-text" ng-click="open($event)">{{::'themesOpenBtn_changeBackground'|localize}}</span>
            </div>
        `,
        scope: {

        },
        controller: ThemesOpenButton,
        controllerAs: 'themesOpenButton',
        bindToController: true
    };
};
},{}],76:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    ThemesPanel.$inject = ["$scope", "$rootScope", "$timeout", "themesService", "themesConfig", "ngDialog"];
    function ThemesPanel($scope, $rootScope, $timeout, themesService, themesConfig, ngDialog) {

        let page = 0;
        let config = themesConfig.getConfig();

        const updateActiveTheme = () => {
            this.activeTheme = themesService.isRandom() ? undefined : themesService.activeTheme;
        };

        const getItemsLength = () => {
            return this.themes.length + 2; //plus "authors" and "random" buttons
        };

        const shift = () => {
            config = themesConfig.getConfig();
            const visibleCount = config.themes.count;
            const leftShift = config.themes.width;

            if (page > getItemsLength() - visibleCount) {
                page = getItemsLength() - visibleCount;
            }

            this.position.left = -(leftShift+10)*page + 'px';
        };

        this.position = {
            left: 0
        };

        this.isOpened = () => {
            return themesService.panelOpened;
        };

        this.chooseTheme = theme => {
            themesService.activeTheme = theme;
            updateActiveTheme();
        };

        this.disableThemes = () => {
            themesService.disableThemes();
            updateActiveTheme();
        };

        this.randomizeThemes = () => {
            themesService.randomizeThemes();
            updateActiveTheme();
        };

        this.isRandom = () => {
            return themesService.isRandom();
        };

        this.handleThemesBlockClick = $event => {
            $event.stopPropagation();
        };

        this.openAuthors = () => {
            ngDialog.open({
                template: '<authors></authors>',
                plain: true,
                className: 'authors',
                appendTo: 'body'
            });
        };

        this.hasPrev = () => {
            return page > 0;
        };

        this.hasNext = () => {
            const visibleCount = config.themes.count;
            return page < getItemsLength() - visibleCount;
        };

        this.prev = () => {
            if (this.hasPrev()) {
                page--;
                shift();
            }
        };

        this.next = () => {
            if (this.hasNext()) {
                page++;
                shift();
            }
        };

        const offBodyClick = $scope.$on('body:click', () => {
            $scope.$applyAsync(themesService.closePanel);
        });

        const offElementClick = $rootScope.$on('element:action', () => {
            themesService.closePanel();
        });

        const offLeftArrow = $scope.$on('body:left-arrow', this.prev);
        const offRightArrow = $scope.$on('body:right-arrow', this.next);

        const offResize = $scope.$on('resize', function() {
            $timeout(shift);
        });

        $scope.$on('$destroy', () => {
            offBodyClick();
            offElementClick();
            offResize();
            offLeftArrow();
            offRightArrow();
        });

        updateActiveTheme();
    }

    return {
        restrict: 'E',
        template: `
            <div class="themes-footer" ng-click="vm.handleThemesBlockClick($event)">
                <div class="themes-layout">
                    <div class="theme-button no-theme-button" ng-click="vm.disableThemes()">
                        <span class="theme-button-title">{{::'themesPanel_noBackground'|localize}}</span>
                    </div>
                    <div class="themes-list-container">
                        <div class="themes-list-viewport">
                                <ul class="themes-container" ng-style="vm.position">
                                    <li class="theme theme-button themes-list-button"
                                        ng-click="vm.randomizeThemes()"
                                        ng-class="{active: vm.isRandom()}">
                                        <div class="themes-random activatable">
                                            <div class="image-area">
                                                <img src="/img/themes/random.png">
                                            </div>
                                            <span class="theme-button-title themes-random-title">{{::'themesPanel_random'|localize}}</span>
                                        </div>
                                    </li>

                                    <li class="theme"
                                        ng-repeat="theme in vm.themes track by $index"
                                        ng-click="vm.chooseTheme(theme)"
                                        ng-class="{active: theme === vm.activeTheme}"
                                        ng-style="{'background-image': 'url({{ theme.previewImage }})', 'background-color': '#d8d6d6'}">
                                        <div class="theme-overlay activatable">
                                            <!--<div class="spinner" ng-if="theme === vm.activeTheme && vm.loading()"></div>-->
                                        </div>
                                    </li>

                                    <li class="theme theme-button themes-list-button" ng-click="vm.openAuthors()">
                                        <div class="themes-authors">
                                            <span class="theme-button-title" ng-bind-html="::'themesPanel_authorInfo' | localize | sanitize | safeHtml"></span>
                                        </div>
                                    </li>
                                </ul>
                        </div>

                        <button ng-if="vm.hasPrev()" class="themes-arrow arrow left-arrow" ng-click="vm.prev()"></button>
                        <button ng-if="vm.hasNext()" class="themes-arrow arrow right-arrow" ng-click="vm.next()"></button>
                    </div>
                </div>
            </div>
        `,
        scope: {
            themes: '='
        },
        controller: ThemesPanel,
        controllerAs: 'vm',
        bindToController: true
    };
};
},{}],77:[function(require,module,exports){
"use strict";

/*@ngInject*/
ContentTile.$inject = ["$rootScope", "imageLoader", "colorUtils"];
function ContentTile($rootScope, imageLoader, colorUtils) {
    let removeAuthListener;

    const createGradient = overlay => {
        const colorObj = (typeof overlay === 'string') ? colorUtils.getRgbFromString(overlay || '0, 0, 0') : overlay;

        return {
            start: colorUtils.createRgbaString(colorObj.r, colorObj.g, colorObj.b, 1),
            stop: colorUtils.createRgbaString(colorObj.r, colorObj.g, colorObj.b, 0)
        };
    };

    const setImage = () => {
        const gradient = createGradient(this.tileInfo.overlay);

        this.backgroundStyle = {
            backgroundImage: `linear-gradient(to top, ${gradient.start}, ${gradient.stop} 40%), url(${this.tileInfo.image})`
        };
    };

    const loadImage = () => {
        imageLoader
            .load(this.tileInfo.image)
            .then(() => {
                this.tile.setExtendedInfo(Object.assign({}, this.tileInfo, { imageOk: true }));
                setImage();
            })
            .catch(() => {
                this.tile.regressToOrdinaryTile();
            });
    };

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event
        };

        this.choose({ tile: this.tile, data });
    };

    this.$onInit = () => {
        this.tileInfo = this.tile.extendedInfo;
        this.theme = this.tileInfo.theme;
        this.title = this.tileInfo.title || (this.tile.title !== '' ? this.tile.title : this.tile.hostname);

        if (this.tileInfo.imageOk) {
            setImage();
        } else {
            loadImage();
        }

        /* crutch for odnoklassniki */
        function isOk(hostname) {
            return /(ok|odnoklassniki).ru/.test(hostname);
        }

        if (isOk(this.tile.hostname)) {
            removeAuthListener = $rootScope.$on('auth:login_changed', (event, isLogin) => {
                if (isLogin) {
                    this.tile.revokeRegressToOrdinaryTile();
                }
            });
        }
        /* end crutch for odnoklassniki */
    };

    this.$onDestroy = () => {
        if (removeAuthListener !== undefined) {
            removeAuthListener();
        }
    }
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component content-tile">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background" ng-style="vm.backgroundStyle"></div>
                    <a class="tile-link" ng-href="{{::vm.tile.url}}" ng-click="vm.handleClick($event)">
                        <div class="tile-content" ng-class="{ light: vm.theme === 'light', dark: vm.theme !== 'light' }">

                            <div class="tile-layout content-tile-layout">
                                <div class="tile-title-container">
                                    <span class="tile-title" ng-bind-html="::vm.title | sanitize | insertNbsp:true"></span>
                                </div>
                            </div>

                            <tile-controls ng-class="{ light: vm.theme === 'light', dark: vm.theme !== 'light' }"
                                ng-if="!vm.noControls" close="vm.remove(site)"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        remove: '&',
        choose: '&'
    },
    controller: ContentTile,
    controllerAs: 'vm'
};
},{}],78:[function(require,module,exports){
"use strict";

/*@ngInject*/
CurrencyTile.$inject = ["$interval", "currencyService"];
function CurrencyTile($interval, currencyService) {
    const CURRENCY_UPDATE_INTERVAL = 60 * 1000;
    let currencyIntervalId;

    const updateCurrencies = () => {
        currencyService.request().then(currencies => {
            if (currencies !== undefined) {
                this.currencies = currencies;
                this.noData = false;
            }
            this.loading = false;
        });
    };

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: 'rgba(0, 0, 0, .6)'
        };

        this.choose({tile: this.tile, data});
    };

    this.$onInit = () => {
        this.loading = true;
        this.noData = true;
        this.currencies = {
            USD: {
                rate: '0.00',
                badTrend: false
            },
            EUR: {
                rate: '0.00',
                badTrend: false
            }
        };

        updateCurrencies();
        currencyIntervalId = $interval(updateCurrencies, CURRENCY_UPDATE_INTERVAL);
    };

    this.$onDestroy = () => {
        $interval.cancel(currencyIntervalId);
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component currency-tile" ng-class="{'no-data': vm.noData}">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background"></div>
                    <a class="tile-link" ng-href="{{::vm.tile.url}}" ng-click="vm.handleClick($event)">
                        <div class="tile-content light">

                            <div class="spinner" ng-if="vm.loading"></div>

                            <div class="tile-layout currency-layout" ng-if="!vm.loading">
                                <div class="currencies-area" ng-if="!vm.noData">
                                    <div class="currency usd">
                                        <span class="currency-name">USD</span>
                                        <div class="currency-rate">
                                            <span class="currency-rate-number" ng-bind="vm.currencies.USD.rate | formatCurrency"></span>
                                            <div class="currency-arrow-container" ng-class="{'bad-trend': vm.currencies.USD.badTrend}">
                                                <img class="currency-arrow">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="currency-divider"></div>
                                    <div class="currency euro">
                                        <span class="currency-name">EUR</span>
                                        <div class="currency-rate">
                                            <span class="currency-rate-number" ng-bind="vm.currencies.EUR.rate | formatCurrency"></span>
                                            <div class="currency-arrow-container" ng-class="{'bad-trend': vm.currencies.EUR.badTrend}">
                                                <img class="currency-arrow">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="no-data-area" ng-if="vm.noData">
                                    <img class="no-data-icon" src="/img/no-int-big-white.png">
                                </div>

                                <div class="tile-title-container">
                                    <span class="tile-title">{{::vm.tile.title}}</span>
                                </div>
                            </div>
                            <tile-controls class="light" ng-if="!vm.noControls" close="vm.remove(data)"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        choose: '&',
        remove: '&'
    },
    controller: CurrencyTile,
    controllerAs: 'vm'
};
},{}],79:[function(require,module,exports){
"use strict";

/*@ngInject*/
EmailTile.$inject = ["$attrs", "emailboxFactory", "imageLoader", "linkHandler", "objectUtils"];
function EmailTile($attrs, emailboxFactory, imageLoader, linkHandler, objectUtils) {
    const unloadAvatar = () => {
        imageLoader.unload(this.emailData.avatar);
    };

    const processEmailData = data => {
        unloadAvatar();
        this.emailData = data.emailData;
        this.noData = false;
    };

    const setNoData = data => {
        unloadAvatar();
        this.emailData = {
            avatar: '/img/extensions/at-sign.png',
            email: this.tile.title
        };
        this.noData = true;
    };

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: 'rgb(22, 141, 226)'
        };

        this.choose({tile: this.tile, data});
    };

    this.handleComposeClick = $event => {
        $event.stopPropagation();
        $event.preventDefault();
        const data = {
            event: $event,
            color: '#ff9c00'
        };

        linkHandler.handleAction('expand-and-open', 'https://e.mail.ru/compose/', data);
    };

    this.$onInit = () => {
        this.emailBox = { };
        this.emailData = { };
        this.noData = true;

        console.log('ON EMAIL INIT', this.choose);

        emailboxFactory.create().then(emailBox => {
            this.emailBox = emailBox;
            this.emailBox.setDataListener(processEmailData, setNoData);
        });
    };

    this.$onDestroy = () => {
        if (!objectUtils.isEmpty(this.emailBox)) {
            this.emailBox.removeDataListener();
            this.emailBox = null;
        }
    };
}

module.exports = {
        restrict: 'E',
        template: `
            <div class="tile-component email-tile">
                <div class="tile-content-outer-wrapper">
                    <div class="tile-content-inner-wrapper">
                        <div class="tile-background"></div>
                        <a class="tile-link" ng-href="{{::vm.tile.url}}" ng-click="vm.handleClick($event)">
                            <div class="tile-content light">
                                <div class="tile-layout email-layout">
                                    <div class="emaildata-area">
                                        <img class="email-avatar" ng-src="{{vm.emailData.avatar}}" ng-class="{'no-data': vm.noData}">
                                    </div>
                                    <div class="tile-title-container">
                                        <span class="tile-title">{{vm.emailData.email}}</span>
                                    </div>
                                </div>

                                <tile-controls class="light" ng-if="!vm.noControls" close="vm.remove(data)"></tile-controls>
                            </div>
                        </a>
                    </div>
                </div>
                <button class="email-button {{vm.emailData.mailCountClass}}"
                    ng-class="{'no-mail-count': vm.emailData.mailCount < 1}"
                    ng-if="!vm.noData && !vm.noControls"
                    ng-click="vm.handleComposeClick($event)"
                >
                    <span class="mail-count" ng-bind="vm.emailData.mailCount | notificationCount"></span>
                    <div class="compose-image-container">
                        <img class="compose-image" src="/img/pencil.png">
                    </div>
                </button>
            </div>
        `,
        bindings: {
            tile: '<',
            noControls: '<',
            choose: '&',
            remove: '&'
        },
        controller: EmailTile,
        controllerAs: 'vm'
    };
},{}],80:[function(require,module,exports){
"use strict";

/*@ngInject*/
HoroTile.$inject = ["horoService", "ngDialog", "localizeFilter"];
function HoroTile(horoService, ngDialog, localizeFilter) {
    const processDataCallback = data => {
        this.horo = data;
        this.horo.zodiac = horoService.getZodiacById(data.id);
        this.tile.setUrl(data.url);
        this.title = this.horo.zodiac.name;
        this.noData = false;
        this.loading = false;
    };

    const noDataCallback = () => {
        this.noData = true;
        this.loading = false;
        this.title = this.tile.title;
    };

    this.openSettings = () => {
        this.settingsDialog = ngDialog.open({
            template: '<horo-settings></horo-settings>',
            plain: true,
            className: 'horo-settings',
            appendTo: 'body'
        });

        this.settingsDialog.closePromise.then(data => {
            this.settingsDialog = null;
        });
    };

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: '#3F1782'
        };

        this.choose({ tile: this.tile, data });
    };

    this.$onInit = () => {
        this.loading = true;
        this.noData = true;
        this.horo = {
            url: this.tile.url
        };
        this.title = this.tile.title;
        this.predictionReplacer = localizeFilter('horoSettings_today');

        horoService.setDataListener(processDataCallback, noDataCallback);
    };

    this.$onDestroy = () => {
        horoService.removeDataListener();
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component horo-tile" ng-class="{'no-data': vm.noData, 'with-image': !vm.loading && !vm.noData}">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background" ng-class="{'with-image': !vm.loading && !vm.noData}"></div>
                    <a class="tile-link" ng-href="{{vm.horo.url}}" ng-click="vm.handleClick($event)">
                        <div class="tile-content light">

                            <div class="spinner" ng-if="vm.loading"></div>

                            <div class="tile-layout" ng-if="!vm.loading">
                                <div class="horo-image-area" ng-if="!vm.noData">
                                    <img ng-src="{{vm.horo.zodiac.image}}" class="square image">
                                </div>

                                <div class="prediction-area" ng-if="!vm.noData">
                                    <span class="prediction prediction-full" ng-bind-html="vm.horo.prediction | sanitize | capitalize | insertNbsp"></span>
                                    <span class="prediction prediction-medium" ng-bind-html="vm.predictionReplacer | sanitize | addDate | capitalize | insertNbsp"></span>
                                    <span class="prediction prediction-short" ng-bind-html="vm.predictionReplacer | sanitize | capitalize | insertNbsp"></span>
                                </div>

                                <div class="no-data-area" ng-if="vm.noData">
                                    <img class="no-data-icon" src="/img/no-int-big-white.png">
                                </div>

                                <div class="tile-title-container horo-title-container">
                                    <span class="tile-title horo-title">{{vm.title}}</span>
                                </div>
                            </div>

                            <tile-controls class="light" ng-if="!vm.noControls"
                                           close="vm.remove(site)"
                                           with-settings="!vm.noData"
                                           open-settings="vm.openSettings()"></tile-controls>

                        </div>

                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        choose: '&',
        remove: '&'
    },
    controller: HoroTile,
    controllerAs: 'vm'
};
},{}],81:[function(require,module,exports){
"use strict";

/*@ngInject*/
MediaTile.$inject = ["mediaService", "arrayUtils", "imageLoader"];
function MediaTile(mediaService, arrayUtils, imageLoader) {
    const checkMediaItemsImagesAndRemoveIfNoImage = () => {
        const promises = this.data.mediaItems.map(item => {
            return imageLoader.load(item.image)
                .then(url => {
                    return true;
                }).catch(() => {
                    return false;
                });
        });

        return Promise.all(promises).then(data => {
            this.data.mediaItems = this.data.mediaItems.filter((item, index) => {
                return data[index];
            });

            if (this.data.mediaItems.length === 0) {
                this.tile.regressToOrdinaryTile();
            }
        });
    };

    const updateMedia = () => {
        mediaService.request(this.tile.mediaType, this.tile.apiUrl)
            .then(data => {
                if (data && data.mediaItems.length > 0) {
                    this.data = data;
                    this.setActiveItem(0);
                    this.dots = new Array(data.mediaItems.length);
                    checkMediaItemsImagesAndRemoveIfNoImage();
                } else {
                    this.tile.regressToOrdinaryTile();
                }
            })
            .catch(() => {
                this.tile.regressToOrdinaryTile();
            })
            .finally(() => {
                this.loading = false;
            });
    };

    this.setActiveItem = index => {
        this.activeIndex = index;

        this.activeItem = this.data.mediaItems[this.activeIndex];
        this.tile.setUrl(this.activeItem.url);
    };

    this.next = event => {
        event.stopPropagation();
        event.preventDefault();

        this.setActiveItem(arrayUtils.getNextIndex(this.data.mediaItems.length, this.activeIndex));
    };

    this.prev = event => {
        event.stopPropagation();
        event.preventDefault();

        this.setActiveItem(arrayUtils.getPrevIndex(this.data.mediaItems.length, this.activeIndex));
    };

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: this.tile.mainColor
        };

        this.choose({ tile: this.tile, data });
    };

    this.$onInit = () => {
        this.loading = true;
        this.data = { };
        this.activeIndex = 0;
        this.activeItem = { };

        updateMedia();
    };

    this.$onDestroy = () => {

    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component media-tile {{vm.tile.className}}" ng-class="{ loading: vm.loading}">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background media-tile-background"></div>
                    <div class="tile-background media-tile-background media-small-tile-background"
                        ng-style="{ backgroundImage: (vm.activeItem.image | bgImage) }">
                    </div>
                    <a class="tile-link media-tile-link" ng-href="{{vm.tile.url || vm.tile.defaultUrl}}" ng-click="vm.handleClick($event)">
                        <div class="tile-content media-content light">
                            <div class="spinner" ng-if="vm.loading"></div>

                            <div class="tile-layout media-layout" ng-if="!vm.loading">
                                <div class="media-header">
                                    <div class="media-title-image media-title-image-left"></div>
                                    <span class="media-title" ng-bind="::vm.tile.title"></span>
                                    <div class="media-title-image media-title-image-right"></div>
                                </div>
                                <div class="media-items-container">
                                    <ul class="media-items">
                                        <li class="media-item"
                                            ng-repeat="item in vm.data.mediaItems"
                                            ng-class="{ active: $index === vm.activeIndex }"
                                            ng-style="{ backgroundImage: (item.image | bgImage) }">
                                            <span class="media-item-text" ng-bind-html="item.title | sanitize | capitalize | insertNbsp"></span>
                                        </li>
                                    </ul>

                                    <img class="media-arrow media-arrow-left" src="img/media-tile/media-arrow-left.svg" ng-click="vm.prev($event)">
                                    <img class="media-arrow media-arrow-right" src="img/media-tile/media-arrow-right.svg" ng-click="vm.next($event)">
                                </div>
                                <div class="media-active-item-container">
                                    <div class="media-active-item">
                                        <span class="media-item-text" ng-bind="vm.activeItem.title | capitalize | insertNbsp"></span>
                                    </div>
                                    <div class="tile-title-container media-description-container">
                                        <span class="tile-title media-description" ng-bind="::vm.tile.title"></span>
                                    </div>
                                </div>
                            </div>

                            <tile-controls class="dark" ng-if="!vm.noControls" close="vm.remove()"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        choose: '&',
        remove: '&'
    },
    controller: MediaTile,
    controllerAs: 'vm'
};
},{}],82:[function(require,module,exports){
"use strict";

/*@ngInject*/
function MusicTile() {
    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event
        };

        this.choose({tile: this.tile, data});
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component music-tile">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background"></div>
                    <a class="tile-link" href="#" ng-click="vm.handleClick($event)">
                        <div class="tile-content light">
                            <div class="tile-layout music-layout">
                                <div class="tile-title-container">
                                    <span class="tile-title">{{::vm.tile.title}}</span>
                                </div>
                            </div>

                            <tile-controls class="light" ng-if="!vm.noControls" close="vm.remove(data)"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        choose: '&',
        remove: '&'
    },
    controller: MusicTile,
    controllerAs: 'vm'
};
},{}],83:[function(require,module,exports){
"use strict";

/*@ngInject*/
MediaTile.$inject = ["$element", "mywidgetService"];
function MediaTile($element, mywidgetService) {
    const loadRecommendation = () => {
        this.loading = true;
        mywidgetService.request(this.tile.cid, this.tile.referer)
            .then(recommendation => {
                this.recommendation = recommendation;
                this.tile.setUrl(recommendation.url);
            })
            .then(() => {
                mywidgetService.fetchPxt(this.recommendation.wshow);
            })
            .then(() => {
                return mywidgetService.checkInversion(this.tile.cid, this.tile.initialStatus, this.tile.updateInterval).then(status => {
                    if (!status.needsInversion) {
                        this.inverse = status.inverted;
                        return;
                    }
                    this.inverse = !status.inverted;
                    return mywidgetService.setInversion(this.tile.cid, this.inverse);
                });
            })
            .catch(() => {
                this.tile.regressToOrdinaryTile();
            })
            .finally(() => {
                this.loading = false;
                const style = $element[0].style;
                style.setProperty('--text-color', this.tile.textColor);
                style.setProperty('--overlay-color', this.tile.themeColor);
            });
    };

    this.handleClick = $event => {
        $event.preventDefault();
        mywidgetService.fetchPxt(this.recommendation.wclick).finally(() => {
            const data = {
                event: $event,
                color: this.tile.themeColor
            };
            this.choose({ tile: this.tile, data });
        });
    };

    this.$onInit = () => {
        this.loading = false;
        this.inverse = false;
        this.recommendation = null;
        loadRecommendation();
    };

    this.$onDestroy = () => {

    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component media-tile mywidget-tile" ng-class="{loading: vm.loading, inverse:vm.inverse}">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background media-tile-background"></div>
                    <div class="tile-background media-tile-background media-small-tile-background"
                        ng-style="{ backgroundImage: 'url(' + vm.recommendation.image + ')' }">
                    </div>
                    <a class="tile-link media-tile-link" ng-href="{{vm.tile.url}}" ng-click="vm.handleClick($event)">
                        <div class="tile-content media-content light">
                            <div class="spinner" ng-if="vm.loading"></div>

                            <div class="tile-layout media-layout" ng-if="!vm.loading">
                                <div class="media-header">
                                    <div class="media-title-image media-title-image-left" ng-style="{ backgroundImage: 'url(' + vm.tile.icon + ')' }"></div>
                                    <span class="media-title" ng-bind="::vm.tile.title"></span>
                                    <div class="media-title-image media-title-image-right" ng-style="{ backgroundImage: 'url(' + vm.tile.icon + ')' }"></div>
                                </div>
                                <div class="media-items-container">
                                    <ul class="media-items">
                                        <li class="media-item active"
                                            ng-style="{ backgroundImage: 'url(' + vm.recommendation.image + ')'}">
                                            <span class="media-item-text" ng-bind-html="::vm.recommendation.text | sanitize | insertNbsp"></span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="media-active-item-container">
                                    <div class="media-active-item">
                                        <span class="media-item-text" ng-bind="vm.recommendation.text | insertNbsp"></span>
                                    </div>
                                    <div class="tile-title-container media-description-container">
                                        <span class="tile-title media-description" ng-bind="::vm.tile.title"></span>
                                    </div>
                                </div>
                            </div>

                            <tile-controls class="dark" ng-if="!vm.noControls" close="vm.remove()"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        choose: '&',
        remove: '&'
    },
    controller: MediaTile,
    controllerAs: 'vm'
};
},{}],84:[function(require,module,exports){
"use strict";

/*@ngInject*/
OKGamesTile.$inject = ["$rootScope", "authProxyService", "showcaseFactory", "objectUtils"];
function OKGamesTile($rootScope, authProxyService, showcaseFactory, objectUtils) {
    let removeAuthWatcher;

    const authWatcher = ($event, isAuthorized) => {
        if (!isAuthorized) {
            this.tile.regressToOrdinaryTile();
        }
    };

    this.getStyleForImage = index => {
        const preview = this.preview;
        return {
            backgroundImage: `url(${preview.images[index]}), url(${preview.fallbackImages[index]})`
        };
    };

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: 'rgba(0, 0, 0, .6)',
            template: this.showcaseService.template,
            className: this.showcaseService.className
        };

        this.choose({ tile: this.tile, data });
    };

    this.$onInit = () => {
        removeAuthWatcher = $rootScope.$on('auth:login_changed', authWatcher);

        this.loading = true;

        authProxyService.isAuthorized()
            .then(authorized => {
                if (!authorized) {
                    return this.tile.regressToOrdinaryTile();
                }

                this.showcaseService = showcaseFactory.create(this.tile.showcaseType);
                this.noData = false;

                return this.showcaseService.getImagesForPreview()
                    .then(preview => {
                        if (objectUtils.isObject(preview)) {
                            this.preview = preview;
                            this.noData = false;
                        } else {
                            this.noData = true;
                        }
                    })
                    .catch(() => {
                        this.noData = true;
                    });

            })
            .then(() => {
                this.loading = false;
            });
    };

    this.$onDestroy = () => {
        this.showcaseService = null;
        removeAuthWatcher();
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component showcase-tile">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background"></div>
                    <a class="tile-link" ng-href="#" ng-click="vm.handleClick($event)">
                        <div class="tile-content light">
                            <div class="tile-layout">
                                <div class="showcase-images-area" ng-if="!vm.noData">
                                    <div class="showcase-preview"
                                        ng-repeat="image in vm.preview.images track by $index"
                                        ng-style="vm.getStyleForImage($index)">
                                    </div>
                                </div>

                                <div class="no-data-area" ng-if="vm.noData">
                                    <img class="no-data-icon" src="/img/no-int-big-white.png">
                                </div>

                                <div class="tile-title-container">
                                    <span class="tile-title" ng-bind="vm.tile.title"></span>
                                </div>
                            </div>

                            <tile-controls class="light" ng-if="!vm.noControls" close="vm.remove(site)">
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        choose: '&',
        remove: '&'
    },
    controller: OKGamesTile,
    controllerAs: 'vm'
};
},{}],85:[function(require,module,exports){
"use strict";

/*@ngInject*/
OkGiftsTile.$inject = ["$rootScope", "authProxyService", "metricService"];
function OkGiftsTile($rootScope, authProxyService, metricService) {
    this.loading = false;

    const WIDGET_ID = 'ok:gifts';

    let gifts = [];
    let currentIndex = -1;
    let removeAuthWatcher = null;

    const authWatcher = ($event, isAuthorized) => {
        if (!isAuthorized) {
            this.tile.regressToOrdinaryTile();
        }
    };

    this.getCurrentGift = () => gifts[currentIndex];

    this.next = ($event) => {
        $event.stopImmediatePropagation();
        $event.preventDefault();
        if (currentIndex === gifts.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        metricService.send('carousel_switch', [ 1, WIDGET_ID ]);
    };

    this.previous = ($event) => {
        $event.stopImmediatePropagation();
        $event.preventDefault();
        if (currentIndex === 0) {
            currentIndex = gifts.length - 1;
        } else {
            currentIndex--;
        }
        metricService.send('carousel_switch', [ -1, WIDGET_ID ]);
    };

    this.$onInit = () => {
        removeAuthWatcher = $rootScope.$on('auth:login_changed', authWatcher);

        this.loading = true;

        authProxyService.isAuthorized()
            .then(authorized => {
                if (!authorized) {
                    return this.tile.regressToOrdinaryTile();
                }
                return authProxyService.getGifts()
                    .then((response) => {
                        if (!response) {
                            return this.tile.regressToOrdinaryTile();
                        }

                        gifts = response.section.items.sort(() => Math.random() > 0.5).map((item) => ({
                            url: `https://ok.ru/sendPresent/${item.present_type.id}`,
                            pic: item.present_type.pic128x128,
                            price: item.price === undefined ? item.old_price : item.price
                        }));
                        currentIndex = 0;
                    });
            })
            .then(() => {
                this.loading = false;
            });
    };

    this.$onDestroy = () => {
        removeAuthWatcher();
    };

    this.handleClick = ($event) => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: { r: 255, g: 255, b: 255, a: 1.0 }
        };

        this.tile._url = this.getCurrentGift().url;

        this.choose({tile: this.tile, data});
    }
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component ok-widget ok-gifts-tile">
             <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background" ng-class="{ 'ok-gifts-bg': !$ctrl.loading }"></div>
                    <a class="tile-link" ng-href="{{$ctrl.getCurrentGift().url}}" ng-click="$ctrl.handleClick($event)">
                        <div class="tile-content dark">
                            <div class="spinner" ng-if="$ctrl.loading"></div>
                            <div class="tile-layout" ng-if="!$ctrl.loading">
                                <div class="domain-image-area">
                                    <img class="image" ng-src="{{$ctrl.getCurrentGift().pic}}">
                                </div>
                                <div class="ok-widget-gift-price">{{$ctrl.getCurrentGift().price}}&nbsp;OK</div>
                                <button class="ok-widget-arrow ok-widget-arrow__left" type="button" ng-click="$ctrl.previous($event)"></button>
                                <button class="ok-widget-arrow ok-widget-arrow__right" type="button" ng-click="$ctrl.next($event)"></button>
                                <div class="tile-title-container">
                                    <span class="tile-title" ng-bind="::'ok_sendGift'|localize"></span>
                                </div>
                            </div>
                            <tile-controls class="light" ng-if="!$ctrl.noControls" close="$ctrl.remove(data)"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        remove: '&',
        choose: '&'
    },
    controller: OkGiftsTile
};
},{}],86:[function(require,module,exports){
"use strict";

/*@ngInject*/
OkNotificationsTile.$inject = ["$rootScope", "authProxyService", "siteImageService", "objectUtils"];
function OkNotificationsTile($rootScope, authProxyService, siteImageService, objectUtils) {

    this.totalNotificationsCount = 0;

    let removeAuthListener, originalTitle = null;

    const populateMeta = site => {
        const meta = site.meta;
        const DEFAULT_BACKGROUND = 'rgba(0, 0, 0, 0.6)';

        if (originalTitle !== null) {
            this.title = originalTitle;
        } else if (site.isDomain) {
            if (meta.customTile === true && meta.title) {
                this.title = meta.title;
            } else {
                this.title = site.hostname;
            }
        } else {
            this.title = meta.title || site.hostname;
        }

        this.displayAsDomain = site.isDomain || (meta.customTile === true && meta.imageForUrl === true);

        if (meta.image) {
            this.image = meta.image;
        }

        if (meta.favicon === true && meta.image !== undefined) {
            this.color = DEFAULT_BACKGROUND;
            this.theme = 'light';
        } else {
            this.color = meta.color || DEFAULT_BACKGROUND;
            this.theme = meta.theme || 'light';
        }

        this.square = meta.square === true;
        this.border = meta.border === true;
        this.favicon = meta.favicon === true;

        if (objectUtils.isObject(meta.extendedInfo)) {
            site.setExtendedInfo(meta.extendedInfo);
        }
    };

    const loadTileMeta = (site, silentMode) => {
        this.loading = !silentMode;

        siteImageService.getMeta(site.url).then(meta => {
            console.log('META for', site.url, meta);
            site.setMeta(meta);

            populateMeta(site);
        }).finally(() => {
            this.loading = false;
        });
    };

    const update = site => {
        if (!site) {
            this.loading = false;
        }

        console.log('Site', site);

        if (site.hasMeta) {
            console.log('tile for `%s` has meta', site.url, site.meta);

            if (site.meta.hasOwnProperty('temporary') && site.meta.temporary === true) {
                loadTileMeta(site, true);
            }

            populateMeta(site);
        } else {
            loadTileMeta(site, false);
        }
    };

    const updateNotifications = () => {
        return authProxyService.getNotifications(this.tile.type).then(response => {
            const count = (response || []).reduce((total, event) => (total + parseInt(event.number)), 0);
            console.log('COUNT', count);
            this.totalNotificationsCount = count;
        });
    };

    this.hasImage = () => {
        return this.image !== undefined;
    };

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: this.color
        };

        this.choose({tile: this.tile, data});
    };

    this.$onChanges = changes => {
        // cause we handle initialization of value in $onInit handler
        if (!changes.tile.isFirstChange()) {
            update(changes.tile.currentValue);
        }
    };

    this.$onInit = () => {
        this.loading = true;

        /* crutch for odnoklassniki */
        function isOk(hostname) {
            return /(ok|odnoklassniki).ru/.test(hostname);
        }

        if (isOk(this.tile.hostname)) {
            originalTitle = this.tile.title;
            removeAuthListener = $rootScope.$on('auth:login_changed', (event, isLogin) => {
                if (isLogin) {
                    updateNotifications();
                } else {
                    this.totalNotificationsCount = 0;
                }
            });
        }

        authProxyService
            .isAuthorized()
            .then(authorized => {
                if (authorized) {
                    return updateNotifications();
                }
            })
            .then(() => {
                this.loading = false;
            });
        /* end crutch for odnoklassniki */

        update(this.tile);
    };

    this.$onDestroy = () => {
        if (removeAuthListener !== undefined) {
            removeAuthListener();
        }
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component site-tile">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background" ng-style="{ 'background-color': vm.color }"></div>
                    <a class="tile-link" ng-href="{{::vm.tile.url}}" ng-click="vm.handleClick($event)">
                        <div class="tile-content" ng-class="{ light: vm.theme === 'light', dark: vm.theme !== 'light' }">

                            <div class="spinner" ng-if="vm.loading"></div>

                            <div class="tile-layout site-domain-layout" ng-if="!vm.loading && vm.displayAsDomain">
                                <div class="domain-image-area">
                                    <img ng-class="{ square: vm.square, image: vm.favicon !== true, favicon: vm.favicon === true }"
                                        ng-src="{{::vm.image}}" ng-if="vm.hasImage()">
                                    <span class="domain-text" ng-if="!vm.hasImage()" ng-bind-html="::vm.tile.hostname | sanitize | removeTopDomain | insertWraps | insertNbHyphen | safeHtml"></span>
                                </div>
                                <div class="tile-title-container">
                                    <span class="tile-title" ng-bind-html="vm.title | sanitize | insertNbsp:true"></span>
                                </div>
                            </div>

                            <div class="tile-layout site-page-layout" ng-if="!vm.loading && !vm.displayAsDomain">
                                <div class="page-image-area">
                                    <img ng-class="{ square: vm.square, image: vm.favicon !== true, favicon: vm.favicon === true }"
                                        ng-src="{{::vm.image}}" ng-if="vm.hasImage()">
                                    <div class="page-text-container" ng-if="!vm.hasImage()">
                                        <span class="page-text" ng-bind-html="::vm.tile.hostname | sanitize | removeTopDomain | insertWraps | insertNbHyphen | safeHtml"></span>
                                    </div>
                                </div>
                                <div class="page-title-container">
                                    <span class="page-title" ng-bind-html="vm.title | sanitize | insertNbsp"></span>
                                </div>
                            </div>
                            <tile-controls ng-class="{ light: vm.theme === 'light', dark: vm.theme !== 'light' }" ng-if="!vm.noControls" close="vm.remove(site)"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>
            <span class="counter counter__ok" ng-if="vm.totalNotificationsCount &gt; 0" ng-bind="vm.totalNotificationsCount | notificationCount"></span>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        remove: '&',
        choose: '&'
    },
    controller: OkNotificationsTile,
    controllerAs: 'vm'
};

},{}],87:[function(require,module,exports){
"use strict";

/*@ngInject*/
OKStreamsTile.$inject = ["$rootScope", "authProxyService", "metricService"];
function OKStreamsTile($rootScope, authProxyService, metricService) {
    this.loading = false;

    const WIDGET_ID = 'ok:streams';
    let streams = [];
    let currentIndex = -1;

    let removeAuthWatcher = null;

    const authWatcher = ($event, isAuthorized) => {
        if (!isAuthorized) {
            this.tile.regressToOrdinaryTile();
        }
    };

    this.getCurrentStream = () => streams[currentIndex];

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: { r: 255, g: 255, b: 255, a: 1 }
        };

        this.choose({tile: this.tile, data});
    };

    this.next = ($event) => {
        $event.stopImmediatePropagation();
        $event.preventDefault();
        if (currentIndex === streams.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        metricService.send('carousel_switch', [ 1, WIDGET_ID ]);
    };

    this.previous = ($event) => {
        $event.stopImmediatePropagation();
        $event.preventDefault();
        if (currentIndex === 0) {
            currentIndex = streams.length - 1;
        } else {
            currentIndex--;
        }
        metricService.send('carousel_switch', [ -1, WIDGET_ID ]);
    };

    this.$onInit = () => {
        removeAuthWatcher = $rootScope.$on('auth:login_changed', authWatcher);

        this.loading = true;

        authProxyService.isAuthorized()
            .then(authorized => {
                if (!authorized) {
                    return this.tile.regressToOrdinaryTile();
                }
                return authProxyService.getStreams()
                    .then((response) => {
                        if (!response) {
                            return this.tile.regressToOrdinaryTile();
                        }

                        streams = response.videos.sort(() => Math.random() > 0.5).map((item) => ({
                            pic: item.thumbnail_url,
                            url: item.permalink,
                            title: item.title
                        }));
                        currentIndex = 0;
                    });
            })
            .then(() => {
                this.loading = false;
            });
    };

    this.$onDestroy = () => {
        removeAuthWatcher();
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component ok-widget ok-widget__streams">
             <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background" ng-style="{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 40%), url(' + $ctrl.getCurrentStream().pic + ')' }"></div>
                    <a class="tile-link" ng-href="{{$ctrl.getCurrentStream().url}}" ng-click="$ctrl.handleClick($event)">
                        <div class="tile-content light">
                            <div class="spinner" ng-if="$ctrl.loading"></div>
                            <div class="tile-layout content-tile-layout ok-widget-layout ok-widget-layout__streams" ng-if="!$ctrl.loading">
                                <button class="ok-widget-arrow ok-widget-arrow__left" type="button" ng-click="$ctrl.previous($event)"></button>
                                <button class="ok-widget-arrow ok-widget-arrow__right" type="button" ng-click="$ctrl.next($event)"></button>
                                <i class="ok-widget-stream-play"></i>
                                <i class="ok-widget-stream-label"></i>
                                <div class="tile-title-container">
                                    <span class="tile-title">{{$ctrl.getCurrentStream().title}}</span>
                                </div>
                            </div>
                            <tile-controls class="light" ng-if="!$ctrl.noControls" close="$ctrl.remove(data)"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        remove: '&',
        choose: '&'
    },
    controller: OKStreamsTile
};
},{}],88:[function(require,module,exports){
"use strict";

/*@ngInject*/
ShowcaseTile.$inject = ["$scope", "showcaseFactory", "objectUtils"];
function ShowcaseTile($scope, showcaseFactory, objectUtils) {
    this.getStyleForImage = index => {
        const preview = this.preview;
        return {
            backgroundImage: `url(${preview.images[index]}), url(${preview.fallbackImages[index]})`
        };
    };

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: 'rgba(0, 0, 0, .6)',
            template: this.showcaseService.template,
            className: this.showcaseService.className
        };

        this.choose({ tile: this.tile, data });
    };

    this.$onInit = () => {
        this.showcaseService = showcaseFactory.create(this.tile.showcaseType);
        this.noData = false;

        this.showcaseService.getImagesForPreview()
            .then(preview => {
                if (objectUtils.isObject(preview)) {
                    this.preview = preview;
                    this.noData = false;
                } else {
                    this.noData = true;
                }
            })
            .catch(() => {
                this.noData = true;
            });
    };

    this.$onDestroy = () => {
        this.showcaseService = null;
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component showcase-tile">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background"></div>
                    <a class="tile-link" ng-href="#" ng-click="vm.handleClick($event)">
                        <div class="tile-content light">
                            <div class="tile-layout">
                                <div class="showcase-images-area" ng-if="!vm.noData">
                                    <div class="showcase-preview"
                                        ng-repeat="image in vm.preview.images track by $index"
                                        ng-style="vm.getStyleForImage($index)">
                                    </div>
                                </div>

                                <div class="no-data-area" ng-if="vm.noData">
                                    <img class="no-data-icon" src="/img/no-int-big-white.png">
                                </div>

                                <div class="tile-title-container">
                                    <span class="tile-title" ng-bind="vm.tile.title"></span>
                                </div>
                            </div>

                            <tile-controls class="light" ng-if="!vm.noControls" close="vm.remove(site)">
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        choose: '&',
        remove: '&'
    },
    controller: ShowcaseTile,
    controllerAs: 'vm'
};
},{}],89:[function(require,module,exports){
"use strict";

/*@ngInject*/
SiteTile.$inject = ["$rootScope", "siteImageService", "objectUtils"];
function SiteTile($rootScope, siteImageService, objectUtils) {

    let removeAuthListener, originalTitle = null;

    const populateMeta = site => {
        const meta = site.meta;
        const DEFAULT_BACKGROUND = 'rgba(0, 0, 0, 0.6)';

        if (originalTitle !== null) {
            this.title = originalTitle;
        } else if (site.isDomain) {
            if (meta.customTile === true && meta.title) {
                this.title = meta.title;
            } else {
                this.title = site.hostname;
            }
        } else {
            this.title = meta.title || site.hostname;
        }

        this.displayAsDomain = site.isDomain || (meta.customTile === true && meta.imageForUrl === true);

        if (meta.image) {
            this.image = meta.image;
        }

        if (meta.favicon === true && meta.image !== undefined) {
            this.color = DEFAULT_BACKGROUND;
            this.theme = 'light';
        } else {
            this.color = meta.color || DEFAULT_BACKGROUND;
            this.theme = meta.theme || 'light';
        }

        this.square = meta.square === true;
        this.border = meta.border === true;
        this.favicon = meta.favicon === true;

        if (objectUtils.isObject(meta.extendedInfo)) {
            site.setExtendedInfo(meta.extendedInfo);
        }
    };

    const loadTileMeta = (site, silentMode) => {
        this.loading = !silentMode;

        siteImageService.getMeta(site.url).then(meta => {
            console.log('META for', site.url, meta);
            site.setMeta(meta);

            populateMeta(site);
        }).finally(() => {
            this.loading = false;
        });
    };

    const update = site => {
        if (!site) {
            this.loading = false;
        }

        console.log('Site', site);

        if (site.hasMeta) {
            console.log('tile for `%s` has meta', site.url, site.meta);

            if (site.meta.hasOwnProperty('temporary') && site.meta.temporary === true) {
                loadTileMeta(site, true);
            }

            populateMeta(site);
        } else {
            loadTileMeta(site, false);
        }
    };

    this.hasImage = () => {
        return this.image !== undefined;
    };

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: this.color
        };

        this.choose({tile: this.tile, data});
    };

    this.$onChanges = changes => {
        // cause we handle initialization of value in $onInit handler
        if (!changes.tile.isFirstChange()) {
            update(changes.tile.currentValue);
        }
    };

    this.$onInit = () => {
        this.loading = false;

        /* crutch for odnoklassniki */
        function isOk(hostname) {
            return /(ok|odnoklassniki).ru/.test(hostname);
        }

        if (isOk(this.tile.hostname)) {
            if (this.tile.title && this.tile.title.trim() !== '') {
                originalTitle = this.tile.title;
            }
            removeAuthListener = $rootScope.$on('auth:login_changed', (event, isLogin) => {
                if (isLogin) {
                    this.tile.revokeRegressToOrdinaryTile();
                }
            });
        }

        update(this.tile);
        /* end crutch for odnoklassniki */
    };

    this.$onDestroy = () => {
        if (removeAuthListener !== undefined) {
            removeAuthListener();
        }
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component site-tile">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background" ng-style="{ 'background-color': vm.color }"></div>
                    <a class="tile-link" ng-href="{{::vm.tile.url}}" ng-click="vm.handleClick($event)">
                        <div class="tile-content" ng-class="{ light: vm.theme === 'light', dark: vm.theme !== 'light' }">

                            <div class="spinner" ng-if="vm.loading"></div>

                            <div class="tile-layout site-domain-layout" ng-if="!vm.loading && vm.displayAsDomain">
                                <div class="domain-image-area">
                                    <img ng-class="{ square: vm.square, image: vm.favicon !== true, favicon: vm.favicon === true }"
                                        ng-src="{{::vm.image}}" ng-if="vm.hasImage()">
                                    <span class="domain-text" ng-if="!vm.hasImage()" ng-bind-html="::vm.tile.hostname | sanitize | removeTopDomain | insertWraps | insertNbHyphen | safeHtml"></span>
                                </div>
                                <div class="tile-title-container">
                                    <span class="tile-title" ng-bind-html="vm.title | sanitize | insertNbsp:true"></span>
                                </div>
                            </div>

                            <div class="tile-layout site-page-layout" ng-if="!vm.loading && !vm.displayAsDomain">
                                <div class="page-image-area">
                                    <img ng-class="{ square: vm.square, image: vm.favicon !== true, favicon: vm.favicon === true }"
                                        ng-src="{{::vm.image}}" ng-if="vm.hasImage()">
                                    <div class="page-text-container" ng-if="!vm.hasImage()">
                                        <span class="page-text" ng-bind-html="::vm.tile.hostname | sanitize | removeTopDomain | insertWraps | insertNbHyphen | safeHtml"></span>
                                    </div>
                                </div>
                                <div class="page-title-container">
                                    <span class="page-title" ng-bind-html="vm.title | sanitize | insertNbsp"></span>
                                </div>
                            </div>
                            <tile-controls ng-class="{ light: vm.theme === 'light', dark: vm.theme !== 'light' }" ng-if="!vm.noControls" close="vm.remove(site)"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        remove: '&',
        choose: '&'
    },
    controller: SiteTile,
    controllerAs: 'vm'
};

},{}],90:[function(require,module,exports){
"use strict";

/*@ngInject*/
SocialTile.$inject = ["$rootScope", "$interval", "socialService", "linkHandler", "metricService"];
function SocialTile($rootScope, $interval, socialService, linkHandler, metricService) {
    const SOCIAL_DATA_INTERVAL = 30 * 1000;
    let socialDataIntervalId;

    const getColorForNetwork = network => {
        const colors = {
            vk: '#34689B',
            mm: '#168DE2',
            ok: '#F57527',
            tw: '#00ACED'
        };

        return colors[network];
    };

    const getSocialMeta = () => {
        const fullInfo = Object.assign({}, { url: this.tile.url }, this.tile.extendedInfo);
        return socialService.getDataForTile(fullInfo)
            .then(meta => {
                console.log('SOCIAL META', meta);
                if (meta) {
                    if (!meta.error) {
                        this.title = meta.name;
                        this.avatar = meta.image;
                        this.online = meta.online;
                        this.network = meta.network;
                        this.userId = meta.userId;
                        this.current = meta.current;

                        this.isOK = meta.network === 'ok';
                        this.isVK = meta.network === 'vk';
                        this.isMM = meta.network === 'mm';

                    } else if (meta.error === 'not_social') {
                        this.tile.regressToOrdinaryTile();
                        // this.tile.revertToOrdinaryTile();
                    }
                } else {
                    this.tile.regressToOrdinaryTile();
                }
            }).catch(() => {
                this.tile.regressToOrdinaryTile();
            }).then(() => {
                this.loading = false;
            });
    };

    this.handleClick = $event => {
        $event.preventDefault();

        if (this.choose !== undefined) {
            const data = {
                event: $event,
                color: getColorForNetwork(this.network)
            };

            this.choose({ tile: this.tile, data });
        }
    };

    this.chooseSecondaryAction = (url, $event) =>{
        const data = {
            event: $event,
            color: '#292929'
        };
        metricService.send('tile_clicked', [ url, -1 ])
            .then(() => linkHandler.handleAction('expand-and-open', url, data));
    };

    this.handleClickPayment = $event => {
        $event.preventDefault();
        this.chooseSecondaryAction('https://ok.ru/payment', $event);
    };

    this.handleClickGift = $event => {
        $event.preventDefault();
        this.chooseSecondaryAction(`https://ok.ru/gifts?user=${this.userId}&or=PULT`, $event);
    };

    this.$onInit = () => {
        this.loading = true;
        getSocialMeta();
        socialDataIntervalId = $interval(getSocialMeta, SOCIAL_DATA_INTERVAL);

        /* crutch for odnoklassniki */
        $rootScope.$on('auth:login_changed', (event, isLogin) => {
            if (!isLogin) {
                getSocialMeta();
            }
        });
        /* end crutch for odnoklassniki */
    };

    this.$onDestroy = () => {
        $interval.cancel(socialDataIntervalId);
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component social-tile {{::vm.network}}">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background"></div>
                    <a class="tile-link" ng-href="{{::vm.tile.url}}" ng-click="vm.handleClick($event)">
                        <div class="tile-content light">

                            <div class="spinner" ng-if="vm.loading"></div>

                            <div class="tile-layout social-layout" ng-if="!vm.loading">
                                <div class="social-avatar-area">
                                    <div class="social-avatar-container">
                                        <img class="social-avatar" ng-src="{{vm.avatar}}" ng-class="{'no-data': vm.noData}">
                                        <div ng-if="vm.online" class="is-online"></div>
                                        <div class="network-logo"></div>
                                    </div>
                                </div>
                                <div class="tile-title-container">
                                    <span class="tile-title">{{vm.title}}</span>
                                </div>
                            </div>

                            <tile-controls class="light" ng-if="!vm.noControls" close="vm.remove(data)"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>

            <div ng-if="vm.isOK && !vm.noControls" class="tile-secondary-action-container">
                <a ng-if="vm.current" class="tile-secondary-action" ng-href="https://ok.ru/payment" ng-click="vm.handleClickPayment($event)">
                    <img class="tile-secondary-action-image" src="/img/odnoklassniki/ok.png">
                </a>
                <a ng-if="!vm.current" class="tile-secondary-action" ng-href="https://ok.ru/gifts?user={{vm.userId}}&or=PULT" ng-click="vm.handleClickGift($event)">
                    <img class="tile-secondary-action-image" src="/img/odnoklassniki/gift.png">
                </a>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        choose: '&',
        remove: '&'
    },
    controller: SocialTile,
    controllerAs: 'vm'
};

},{}],91:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    BirthdayPicker.$inject = ["$scope", "localizeFilter"];
    function BirthdayPicker($scope, localizeFilter) {
        const determineZodiacId = (day, month) => {
            if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
                return 1;
            } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
                return 2;
            } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
                return 3;
            } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
                return 4;
            } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
                return 5;
            } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
                return 6;
            } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
                return 7;
            } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
                return 8;
            } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
                return 9;
            } else if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
                return 10;
            } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
                return 11;
            } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
                return 12;
            }
        };

        const createDaysArray = size => {
            return Array.apply(null, new Array(size || 31)).map((item, index) => {
                return { id: index + 1 };
            });
        };

        this.monthDays = createDaysArray(this.bday.month.days);

        this.months = [
            {
                id: 1,
                name: localizeFilter('months_january'),
                days: 31
            },
            {
                id: 2,
                name: localizeFilter('months_february'),
                days: 29
            },
            {
                id: 3,
                name: localizeFilter('months_march'),
                days: 31
            },
            {
                id: 4,
                name: localizeFilter('months_april'),
                days: 30
            },
            {
                id: 5,
                name: localizeFilter('months_may'),
                days: 31
            },
            {
                id: 6,
                name: localizeFilter('months_june'),
                days: 30
            },
            {
                id: 7,
                name: localizeFilter('months_july'),
                days: 31
            },
            {
                id: 8,
                name: localizeFilter('months_august'),
                days: 31
            },
            {
                id: 9,
                name: localizeFilter('months_september'),
                days: 30
            },
            {
                id: 10,
                name: localizeFilter('months_october'),
                days: 31
            },
            {
                id: 11,
                name: localizeFilter('months_november'),
                days: 30
            },
            {
                id: 12,
                name: localizeFilter('months_december'),
                days: 31
            }
        ];

        const offGroup = $scope.$watchCollection(() => {
            return [this.bday.day, this.bday.month];
        }, (newValues, oldValues) => {
            const day = newValues[0];
            const month = newValues[1];

            if (month.id !== oldValues[1].id) {
                this.monthDays = createDaysArray(month.days);

                if (this.monthDays.length < this.bday.day.id) {
                    this.bday.day.id = this.monthDays.length;
                }
            }

            if (day.id && month.id) {
                this.onChange({id: determineZodiacId(day.id, month.id)});
            }
        });

        $scope.$on('destroy', () => {
            offGroup();
        });
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="birthday-picker">
                <dropdown class="birthday-days"
                          items="birthdayPicker.monthDays"
                          disp-prop="'id'"
                          name="'date_day'|localize"
                          dd-model="birthdayPicker.bday.day">
                </dropdown>

                <dropdown class="birthday-months"
                          items="birthdayPicker.months"
                          disp-prop="'name'"
                          name="'date_month'|localize"
                          dd-model="birthdayPicker.bday.month">
                </dropdown>
            </div>
        `,
        scope: {
            onChange: '&',
            bday: '='
        },
        controller: BirthdayPicker,
        controllerAs: 'birthdayPicker',
        bindToController: true
    };
};

},{}],92:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    function Dropdown() {
        this.dropped = false;

        this.drop = () =>{
            this.dropped = true;
        };

        this.pick = () => {
            this.dropped = false;
        };

        this.handleLabelClick = () => {
            if (this.dropped) {
                this.pick();
            } else {
                this.drop();
            }
        };

        this.select = item => {
            this.ddModel = item;
            this.pick();
        };
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div tabindex="-1" ng-blur="dropdown.pick()" class="dropdown-wrapper" ng-class="{'dropped': dropdown.dropped}">
                <div class="dropdown-label" ng-click="dropdown.handleLabelClick()">
                  <span class="dropdown-label-text" ng-bind="dropdown.ddModel[dropdown.dispProp] || dropdown.name"></span>
                  <img class="dropdown-arrow" src="/img/drop-arrow.png">
                </div>
                <div class="dropdown" ng-if="dropdown.dropped">
                    <div class="dropdown-container">
                        <ul class="dropdown-list">
                            <li class="dropdown-item" ng-repeat="item in dropdown.items" ng-click="dropdown.select(item)">
                                <span class="dropdown-item-text" ng-bind="item[dropdown.dispProp]"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `,
        scope: {
            items: '=',
            name: '=',
            dispProp: '=',
            ddModel: '=',
            onSelect: '&'
        },
        controller: Dropdown,
        controllerAs: 'dropdown',
        bindToController: true
    };
};
},{}],93:[function(require,module,exports){
"use strict";

/*@ngInject*/
HoroSettings.$inject = ["$scope", "horoService"];
function HoroSettings($scope, horoService) {
    this.selectZodiac = id => {
        this.settings.id = id;

        this.selectedZodiac = this.zodiacs.find(zodiac => {
            return zodiac.id === this.settings.id;
        });
    };

    this.handleTileClick = zodiacId => {
        this.selectZodiac(zodiacId);
        this.settings.bday = { day: {}, month: {} };
    };

    this.save = () => {
        horoService.updateDataManually(this.settings).then(this.closeThisDialog);
    };

    this.$onInit = () => {
        this.horo = horoService.data;
        this.selectedZodiac = this.horo.zodiac;

        this.settings = {
            bday: angular.copy(this.horo.bday) || { day: {}, month: {} },
            id: this.horo.id,
            manually: true
        };

        this.zodiacs = horoService.zodiacs;
        this.dialogId = $scope.$parent.ngDialogId;
    };
}

module.exports = {
    template: `
        <dialog-wrapper dialog-id="vm.dialogId">
            <div class="dialog-content horo-dialog-content" ng-click="horoSettings.handleDialogClick($event)">
                <div class="horo-tile-block">
                  <div class="tile-component horo-tile horo-settings-tile">
                      <div class="tile-content light">
                          <div class="tile-layout">
                              <div class="horo-image-area">
                                  <img ng-src="{{horoSettings.selectedZodiac.image}}" class="square image">
                              </div>
                              <div class="prediction-area">
                                   <span class="prediction prediction-short">{{::'horoSettings_today'|localize}}</span>
                              </div>
                          </div>
                      </div>
                  </div>

                </div>
                <div class="horo-settings-block">
                    <span class="dialog-title horo-settings-title">{{::'horoSettings_settings'|localize}}</span>
                    <div class="horo-settings-spacer-30"></div>

                    <div class="horo-settings-content">
                        <div class="birthday">
                            <span class="birthday-text">{{::'horoSettings_chooseSign'|localize}}</span>
                            <birthday-picker on-change="horoSettings.selectZodiac(id)" bday="horoSettings.settings.bday"></birthday-picker>
                        </div>

                        <div class="horo-settings-spacer-30"></div>

                        <div class="zodiac-container">
                            <div class="tile-component zodiac-tile"
                                 ng-click="horoSettings.handleTileClick(zodiac.id)"
                                 ng-repeat="zodiac in horoSettings.zodiacs"
                                 ng-class="{'selected': zodiac.id === horoSettings.settings.id}">
                                <div class="tile-content zodiac-tile-content">
                                    <div class="tile-layout">
                                        <div class="zodiac-image-area">
                                            <img class="zodiac-image" ng-src="{{zodiac.imageDark}}">
                                        </div>
                                        <div class="tile-title-container">
                                            <span class="tile-title zodiac-name">{{zodiac.name}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="horo-settings-spacer-30"></div>

                        <button class="action-button primary-button" ng-click="horoSettings.save()">{{::'horoSettings_save'|localize}}</button>
                    </div>
                </div>
            </div>
        </dialog-wrapper>
    `,
    controller: HoroSettings,
    controllerAs: 'horoSettings'
};
},{}],94:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    function MediaItems() {

        this.activeIndex = 0;

        const shift = () => {
            this.position.left = `${-100 * this.activeIndex}%`;
        };

        this.position = {
            left: 0
        };

        this.dots = new Array(this.items.length);

        this.handleDotsClick = event => {
            event.stopPropagation();
            event.preventDefault();
        };

        this.choose = index => {
            this.activeIndex = index;
            this.onChange({ index: this.activeIndex });
        };
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div class="media-items-container">
                <ul class="media-items">
                    <li class="media-item"
                        ng-repeat="item in vm.items"
                        ng-class="{ active: $index === vm.activeIndex }"
                        ng-style="{ backgroundImage: item.image }">
                        <span class="media-item-text" ng-bind="::item.title"></span>
                    </li>
                </ul>
                <ul class="media-dots" ng-click="vm.handleDotsClick($event)">
                    <li class="media-dot"
                        ng-class="{ active: $index === vm.activeIndex }"
                        ng-repeat="dot in vm.dots track by $index"
                        ng-click="vm.choose($index)">
                    </li>
                </ul>
            </div>
        `,
        scope: {
            items: '=',
            onChange: '&'
        },
        controller: MediaItems,
        controllerAs: 'vm',
        bindToController: true
    };
};
},{}],95:[function(require,module,exports){
"use strict";

const TileType = require('../../../common/models/tile-type');

module.exports = /*@ngInject*/ function() {

    /*@ngInject*/
    TileComponent.$inject = ["$attrs"];
    function TileComponent($attrs) {
        this.choose = data => {
            if (angular.isDefined($attrs.choose)) {
                this.chooseTile({ tile: this.tile, data });
            }
        };

        this.remove = () => {
            if (angular.isDefined($attrs.remove)) {
                this.removeTile({ tile: this.tile });
            }
        };
    }

    return {
        restrict: 'E',
        replace: true,
        template: `
            <div ng-switch="vm.tile.displayType">
                <!-- EMail tile -->
                <email-tile ng-switch-when="${TileType.EMAIL}" tile="vm.tile" data-highlight="{{vm.tile.id}}" choose="vm.choose(data)" remove="vm.remove()" no-controls="vm.noControls"></email-tile>
                <!-- Music tile -->
                <music-tile ng-switch-when="${TileType.MUSIC}" tile="vm.tile" data-highlight="{{vm.tile.id}}" choose="vm.choose()" remove="vm.remove()" no-controls="vm.noControls"></music-tile>
                <!-- Currency tile -->
                <currency-tile ng-switch-when="${TileType.CURRENCY}" tile="vm.tile" data-highlight="{{vm.tile.id}}" choose="vm.choose(data)" remove="vm.remove()" no-controls="vm.noControls"></currency-tile>
                <!-- Weather tile -->
                <weather-tile ng-switch-when="${TileType.WEATHER}" tile="vm.tile" data-highlight="{{vm.tile.id}}" choose="vm.choose(data)" remove="vm.remove()" no-controls="vm.noControls"></weather-tile>
                <!-- Horo tile -->
                <horo-tile ng-switch-when="${TileType.HORO}" tile="vm.tile" data-highlight="{{vm.tile.id}}" choose="vm.choose(data)" remove="vm.remove()" no-controls="vm.noControls"></horo-tile>
                <!-- Content tile -->
                <content-tile ng-switch-when="content" tile="vm.tile" data-highlight="{{vm.tile.id}}" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></content-tile>
                <!-- Showcase tile -->
                <showcase-tile ng-switch-when="${TileType.SHOWCASE}" tile="vm.tile" data-highlight="{{vm.tile.id}}" choose="vm.choose(data)" remove="vm.remove()" no-controls="vm.noControls"></showcase-tile>
                <!-- Social tile -->
                <social-tile ng-switch-when="social" tile="vm.tile" data-highlight="{{vm.tile.id}}" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></social-tile>
                <!-- Media tile -->
                <media-tile ng-switch-when="${TileType.MEDIA}" tile="vm.tile" data-highlight="{{vm.tile.id}}" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></media-tile>
                <!-- Site tile -->
                <site-tile ng-switch-when="${TileType.SITE}" tile="vm.tile" data-highlight="{{vm.tile.id}}" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></site-tile>
                <!-- Special -->
                <special-tile ng-switch-when="special" tile="vm.tile" data-highlight="{{vm.tile.id}}" remove="vm.remove()" no-controls="vm.noControls"></special-tile>
                <!-- MyWidget -->
                <mywidget-tile ng-switch-when="${TileType.MYWIDGET}" tile="vm.tile" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></mywidget-tile>
                <!-- OK Gifts -->
                <ok-gifts-tile ng-switch-when="${TileType.OK_GIFTS}" tile="vm.tile" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></ok-gifts-tile>
                <!-- OK Games -->
                <ok-games-tile ng-switch-when="${TileType.OK_GAMES}" tile="vm.tile" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></ok-games-tile>
                <!-- OK Streams -->
                <ok-streams-tile ng-switch-when="${TileType.OK_STREAMS}" tile="vm.tile" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></ok-streams-tile>
                <!-- OK Notifications -->
                <ok-notifications-tile ng-switch-when="${TileType.OK_MARKS}" tile="vm.tile" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></ok-notifications-tile>
                <ok-notifications-tile ng-switch-when="${TileType.OK_GUESTS}" tile="vm.tile" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></ok-notifications-tile>
                <ok-notifications-tile ng-switch-when="${TileType.OK_MESSAGES}" tile="vm.tile" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></ok-notifications-tile>
                <ok-notifications-tile ng-switch-when="${TileType.OK_NOTIFICATIONS}" tile="vm.tile" remove="vm.remove()" choose="vm.choose(data)" no-controls="vm.noControls"></ok-notifications-tile>
                <!-- Blank -->
                <div ng-switch-default class="blank-tile"></div>
            </div>
        `,
        scope: {
            tile: '=',
            noControls: '=',
            chooseTile: '&choose',
            removeTile: '&remove'
        },
        controller: TileComponent,
        controllerAs: 'vm',
        bindToController: true
    };
};
},{"../../../common/models/tile-type":259}],96:[function(require,module,exports){
"use strict";

/*@ngInject*/
function TileControls() {
    this.closeClick = $event => {
        $event.stopPropagation();
        $event.preventDefault();
        this.close();
    };

    this.pinClick = $event => {
        $event.stopPropagation();
        $event.preventDefault();
        this.pin();
    };

    this.unpinClick = $event => {
        $event.stopPropagation();
        $event.preventDefault();
        this.unpin();
    };

    this.settingsClick = $event => {
        $event.stopPropagation();
        $event.preventDefault();
        this.openSettings();
    };
}

module.exports = {
    restrict: 'E',
    // buttons changed to divs to correspond to html specs and to be rendered correctly in FIREFOX
    template: `
        <ul class="tile-controls fader">
            <li class="tile-control">
                <div class="tile-control-button remove" type="button" ng-click="vm.closeClick($event)"></div>
            </li>
            <li class="tile-control" ng-if="vm.withPin">
                <div class="tile-control-button pin" type="button" ng-click="vm.pinClick($event)" ng-if="!vm.pinned"></div>
                <div class="tile-control-button unpin" type="button" ng-click="vm.unpinClick($event)" ng-if="vm.pinned"></div>
            </li>
            <li class="tile-control" ng-if="vm.withSettings">
                <div class="tile-control-button options" type="button" ng-click="vm.settingsClick($event)"></div>
            </li>
        </ul>
    `,
    bindings: {
        close: '&',
        pin: '&',
        unpin: '&',
        withPin: '<',
        pinned: '<',
        openSettings: '&',
        withSettings: '<'
    },
    controller: TileControls,
    controllerAs: 'vm'
};
},{}],97:[function(require,module,exports){
"use strict";

/*@ngInject*/
WeatherTile.$inject = ["$interval", "weatherService"];
function WeatherTile($interval, weatherService) {
    const WEATHER_UPDATE_INTERVAL = 5 * 60 * 1000;
    let weatherInterval;

    const updateWeather = () => {
        weatherService.request().then(weather => {
            if (weather !== undefined) {
                this.weather = weather;
                this.title = this.weather.city;
                this.noData = false;
            }

            this.loading = false;
        });
    };

    this.isAboveZero = () => {
        return this.weather.temperature > 0;
    };

    this.handleClick = $event => {
        $event.preventDefault();

        const data = {
            event: $event,
            color: this.weather.temperatureColor
        };

        this.choose({ tile: this.tile, data });
    };

    this.$onInit = () => {
        this.loading = true;
        this.noData = true;
        this.weather = { };
        this.title = this.tile.title;

        updateWeather();
        weatherInterval = $interval(updateWeather, WEATHER_UPDATE_INTERVAL);
    };

    this.$onDestroy = () => {
        $interval.cancel(weatherInterval);
    };
}

module.exports = {
    restrict: 'E',
    template: `
        <div class="tile-component weather-tile" ng-class="{'no-data': vm.noData}">
            <div class="tile-content-outer-wrapper">
                <div class="tile-content-inner-wrapper">
                    <div class="tile-background" ng-style="{backgroundColor: vm.weather.temperatureColor }"></div>
                    <a class="tile-link" ng-href="{{::vm.tile.url}}" ng-click="vm.handleClick($event)">
                        <div class="tile-content light">
                            <div class="spinner" ng-if="vm.loading"></div>

                            <div class="tile-layout weather-layout" ng-if="!vm.loading">
                                <div class="weather-area" ng-if="!vm.noData">
                                    <div class="weather">
                                        <div class="weather-icon {{vm.weather.weatherIconClass}}"></div>
                                        <div class="weather-divider"></div>
                                        <div class="temperature">
                                            <span class="plus-sign" ng-if="vm.isAboveZero()">+</span>
                                            <span class="temperature-value" ng-bind="vm.weather.temperature | formatTemperature"></span>
                                        </div>
                                    </div>
                                </div>

                                <div class="no-data-area" ng-if="vm.noData">
                                    <img class="no-data-icon" src="/img/no-int-big-white.png">
                                </div>

                                <div class="tile-title-container">
                                    <span class="tile-title" ng-bind-html="vm.title | sanitize | insertNbHyphen | safeHtml"></span>
                                </div>
                            </div>

                            <tile-controls class="light" ng-if="!vm.noControls" close="vm.remove()"></tile-controls>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `,
    bindings: {
        tile: '<',
        noControls: '<',
        choose: '&',
        remove: '&'
    },
    controller: WeatherTile,
    controllerAs: 'vm'
};
},{}],98:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$document", "$q", function($document, $q) {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            const makeRgba = colors => {
                return ['rgba(', colors[0], ',', colors[1], ',', colors[2], ',', colors[3], ')'].join('');
            };

            const createContext = () => {
                return $document[0].createElement('canvas').getContext('2d');
            };

            const isTransparent = data => {
                return data[3] === 0;
            };

            const getDominantColor = data => {
                return [255, 255, 255, 1];
            };

            const loadImage = src => {
                return $q(resolve => {
                    const img = new Image();

                    if (src.substring(0, 5) !== 'data:') {
                        img.crossOrigin = 'Anonymous';
                    }

                    img.onload = () => {
                        const context = createContext();
                        context.drawImage(img, 0, 0);

                        return resolve(context.getImageData(0, 0, img.width, img.height).data);
                    };

                    img.src = src;
                });
            };

            const unwatch = attrs.$observe('bgColor', value => {
                if (value) {
                    loadImage(value).then(data => {
                        if (!isTransparent(data)) {
                            return element.css('background-color', makeRgba(data));
                        }

                        const dominantColor = getDominantColor(data);
                        element.css('background-color', makeRgba(dominantColor));
                    });
                }
            });

            scope.$on('$destroy', unwatch);
        }
    };
}];
},{}],99:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["imageLoader", function(imageLoader) {
    return {
        priority: 99,
        restrict: 'A',
        scope: {
            cspSrc: '@cspSrc'
        },
        link: (scope, element) => {
            let blobRef;

            const unwatch = scope.$watch('cspSrc', src => {
                if (!src) {
                    return;
                }

                imageLoader.get(src).then(blob => {
                    blobRef = blob;
                    element.attr('src', blob);
                });
            });

            scope.$on('$destroy', () => {
                unwatch();

                if (blobRef) {
                    imageLoader.unload(blobRef);
                }
            });
        }
    };
}];
},{}],100:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'A',
        link: (scope, element) => {
            element[0].focus();
        }
    };
};
},{}],101:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$timeout", function($timeout) {
    return {
        restrict: 'A',
        link: (scope, element) => {
            const el = element[0];

            const pasteHandler = () => {
                $timeout(() => {
                    el.dispatchEvent(new CustomEvent('customPaste'));
                });
            };

            el.addEventListener('paste', pasteHandler);

            scope.$on('$destroy', () => {
                el.removeEventListener('paste', pasteHandler);
            });
        }
    };
}];
},{}],102:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        scope: {
            fileread: "="
        },
        link(scope, element, attrs) {
            element.bind('change', changeEvent => {
                scope.$apply(() => {
                    scope.fileread = Array.from(changeEvent.target.files, file => new Blob([file], { type: file.type }));
                });
            });
        }
    };
};
},{}],103:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "focusService", function($rootScope, focusService) {
    return {
        restrict: 'A',
        link: (scope, element, attributes) => {
            const id = attributes.focusId;
            focusService.register(id, element[0]);

            const focusHandler  = event => {
                event.stopPropagation();
                $rootScope.$broadcast('focus:focus', id);
            };

            const blurHandler  = event => {
                event.stopPropagation();
                $rootScope.$broadcast('focus:blur', id);
            };

            element
                .on('focusin', focusHandler)
                .on('focusout', blurHandler);

            scope.$on('$destroy', () => {
                focusService.unregister(id);

                element
                    .off('focusin', focusHandler)
                    .off('focusout', blurHandler);
            });
        }
    };
}];
},{}],104:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'A',
        scope: {
            placeholder: '=mutablePlaceholder'
        },
        link: (scope, element) => {
            const el = element[0];

            scope.$watch('placeholder', () => {
                el.placeholder = scope.placeholder;
            });
        }
    };
};
},{}],105:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["keyCodes", function(keyCodes) {
    return {
        restrict: 'A',
        link: (scope, element) => {
            const el = element[0];

            const keyDownHandler = event => {
                if (event.keyCode === keyCodes.ENTER) {
                    el.dispatchEvent(new CustomEvent('enter'));
                }
            };

            el.addEventListener('keydown', keyDownHandler);

            scope.$on('$destroy', () => {
                el.removeEventListener('keydown', keyDownHandler);
            });
        }
    };
}];
},{}],106:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'A',
        link: (scope, element) => {
            const focus = () => {
                element[0].focus();
            };

            element.on('blur', focus);

            scope.$on('$destroy', () => {
                element.off('blur', focus);
            });
        }
    };
};
},{}],107:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rgbaster", function($rgbaster) {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            const unwatch = attrs.$observe('rgbaster', value => {
                if (value) {
                    $rgbaster.colors(value, {
                        success: payload => {
                            element.css('background-color', payload.dominant);/*payload.dominant === 'rgb(0,0,0)' ? 'rgb(255,255,255)' : payload.dominant)*/
                        }
                    });
                }
            });

            scope.$on('$destroy', unwatch);
        }
    };
}];
},{}],108:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$window", "$timeout", "$rootScope", "tileLayoutConfig", function($window, $timeout, $rootScope, tileLayoutConfig) {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {

            const el = element[0];
            const size = attrs.suggestsTileLayout || 'small';

            const getChildren = () => el.querySelectorAll('.tile-component');

            const applyStyles = () => {
                const children = getChildren();
                const numChildren = children.length;

                if (numChildren === 0) {
                    return;
                }

                const config = tileLayoutConfig.getConfig();

                angular.forEach(children, child => {
                    angular.element(child)
                        .css({
                            width: config[size].width + 'px',
                            height: config[size].height + 'px'
                        });
                });
            };

            const applyStylesLater = () => {
                $window.requestAnimationFrame(applyStyles, el);
            };

            const resizeHandler = () => {
                applyStylesLater();
            };

            const getParent = () => {
                return element.parent()[0];
            };

            const unwatchCollection = scope.$watchCollection(() => getChildren(), applyStylesLater);

            scope.$on('$destroy', () => {
                unwatchCollection();
                $window.removeResizeListener(getParent(), resizeHandler);
            });

            $window.addResizeListener(getParent(), resizeHandler);

        }
    };
}];
},{}],109:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["localizeFilter", function(localizeFilter) {
    return function(input) {
        if (!input) {
            return input;
        }

        var date = new Date();
        var month = localizeFilter('months_all').split(',');
        return input + ' ' + date.getDate() + ' ' + month[date.getMonth()];
    };
}];
},{}],110:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["tileFactory", function(tileFactory) {
    return function(items, minCount) {
        var newItems = items ? items.slice(0) : [];

        while (newItems.length < minCount) {
            newItems.push(tileFactory.create({ type: 'blank' }));
        }

        return newItems;
    };
}];
},{}],111:[function(require,module,exports){
"use strict";

module.exports = function() {
    return function(input) {
        if (!input) {
            return input;
        }

        return `url(${decodeURIComponent(input)})`;
    };
};
},{}],112:[function(require,module,exports){
"use strict";

module.exports = function() {
    return function(input) {
        if (!input) {
            return input;
        }

        return input.substr(0, 1).toUpperCase().concat(input.substr(1));
    };
};
},{}],113:[function(require,module,exports){
"use strict";

module.exports = function() {
    return function(input) {
        return 'chrome://favicon/' + input;
    };
};
},{}],114:[function(require,module,exports){
module.exports = function() {
    return function(input, count) {
        return input.replace(/( N )/g, ` ${count} `);
    };
};
},{}],115:[function(require,module,exports){
"use strict";

module.exports = function() {
    var MAX_LENGTH = 7;

    function compact(numberStr, precision) {
        var tempStr = Number(numberStr).toPrecision(precision);

        if (tempStr.length > MAX_LENGTH && precision > 1) {
            tempStr = compact(numberStr, precision - 1);
        }

        return tempStr;
    }

    return function(value) {
        value = Number(value).toFixed(2);
        if (value.length > MAX_LENGTH) {
            value = compact(value, MAX_LENGTH-1);
        }
        return value;
    };
};
},{}],116:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$sce", function($sce) {
    function formatSuggestText(text, query) {
        var startIndex = text.indexOf(query);
        if (startIndex !== 0) {
            return $sce.trustAsHtml('<strong>' + text + '</strong>');
        }

        var differentPart = text.slice(query.length);

        return $sce.trustAsHtml(query + '<strong>' + differentPart + '</strong>');
    }

    function formatSiteSuggestText(text, query) {
        var startIndex = text.indexOf(query);
        if (startIndex < 0) {
            return $sce.trustAsHtml(text);
        }
        var endIndex = startIndex + query.length;

        var firstPart = text.slice(0, startIndex);
        var secondPart = query;
        var thirdPart = text.slice(endIndex);

        return $sce.trustAsHtml(firstPart + '<strong>' + secondPart + '</strong>' + thirdPart);
    }


    return function(text, query, invert) {
        return invert ? formatSiteSuggestText(text, query) : formatSuggestText(text, query);
    };
}];
},{}],117:[function(require,module,exports){
"use strict";

module.exports = function() {
    return function(value) {
        return value + '°';
    };
};
},{}],118:[function(require,module,exports){
"use strict";

module.exports = function() {
    return function(input) {
        var subdomains = input.split('.');
        var count = subdomains.length;

        if (count === 2) {
            return subdomains[0];
        }

        return input;
    };
};
},{}],119:[function(require,module,exports){
"use strict";

var urlUtils = require('../../common/utils/url-utils');

module.exports = function() {
    return urlUtils.getHostname.bind(urlUtils);
};
},{"../../common/utils/url-utils":284}],120:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$sce", function($sce) {
    return function(input) {
        if (input === undefined) {
            return '';
        }

        return input.replace(/‐|-/gi, '&#8209;').trim();
    };
}];

},{}],121:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$sce", function($sce) {
    return function(input, simple) {
        if (!input) {
            return '';
        }

        var nbsp = '\u00a0';

        if (simple === true) {
            return $sce.trustAsHtml(input.trim().replace(/\s+/gi, nbsp));
        }

        return $sce.trustAsHtml(input
            .trim()
            //nbsp before any type of hyphen
            .replace(/(( )(‐|\-|‒|–|—|―))/gi, nbsp + '$3')
            //nbsp before russian etcetera abbreviation
            .replace(/(\s(и)\s(т.)(\s?)(д.|п.))/gi, function(match, p1, p2, p3, p4, p5) {
                var spaceReplacer = p4 === ' ' ? nbsp : p4;
                return nbsp + p2 + nbsp + p3 + spaceReplacer + p5;
            })
            //nbsp after all short words(less then 4 letters) situated after 8 position in string
            .replace(/((\s|^)([^‐\-‒–—―\d\s]{1,3})(?=\s))/gi, function(match, p1, p2, p3, offset) {
                return offset > 7 ? p2 + p3 + nbsp : p1;
            })
            //nbsp after all numbers
            .replace(/((\s|^|-)(\d+[,.]\d+|\d+)(?=\s))/gi, '$2$3' + nbsp)
            //if nbsp and space are nearby - replace it by only nbsp
            .replace(/\u00a0\s+|\s+\u00a0/g, nbsp));
    };
}];
},{}],122:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$sce", function($sce) {
    return function(input) {
        if (input == null) {
            return '';
        }

        return input.replace('.', '.&#8203;').trim();
    };
}];
},{}],123:[function(require,module,exports){
"use strict";
const localize = require('../../common/services/localize-service');

module.exports = function() {
    return function(input) {
        if (!input) {
            return input;
        }
        return localize(input);
    };
};
},{"../../common/services/localize-service":262}],124:[function(require,module,exports){
"use strict";

module.exports = function() {
    return function(count) {
        return count > 99 ? '99+' : count;
    };
};
},{}],125:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["localizeFilter", function(localizeFilter) {
    return function(activeIndex, guidesLength) {
        return (activeIndex + 1) + ' ' + localizeFilter('onboarding_progressOf') + ' ' + guidesLength;
    };
}];
},{}],126:[function(require,module,exports){
"use strict";

module.exports = function() {
    return function(input) {
        return input.replace(/<br>/gi, ' ');
    };
};
},{}],127:[function(require,module,exports){
"use strict";

module.exports = function() {
    return function(input) {
        if (input == null) {
            return '';
        }

        var parts = input.split('.').slice(0, -1);

        if (parts.length < 1) {
            return input;
        }

        return parts.join('.');
    };
};
},{}],128:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$sce", function($sce) {
    return function(input) {
        if (input === undefined) {
            return '';
        }
        return $sce.trustAsHtml(input.toString().trim());
    };
}];
},{}],129:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$sanitize", function($sanitize) {
    return function(input) {
        if (input === undefined) {
            return '';
        }
        return $sanitize(input);
    };
}];
},{}],130:[function(require,module,exports){
"use strict";

var SHORT = 16;
var LONG = 45;

module.exports = function() {
    return function(input) {
        if (!input) {
            return input;
        }

        var words = input.split(' ').length;
        var length;

        if (words === 1) {
            length = SHORT;
        } else {
            length = LONG;
        }

        if (input.length < length) {
            return input;
        }

        return input.substr(0, length).concat('...');
    };
};
},{}],131:[function(require,module,exports){
"use strict";

module.exports = function() {
    return function(input, length) {
        if (!input || input.length < length) {
            return input;
        }

        return input.substr(0, length - 3).concat('...');
    };
};
},{}],132:[function(require,module,exports){
"use strict";

function chooseCorrectFormOfWordByRelatedNumber(number, forms) {
    var modulo = number % 10;

    if ((number >= 11 && number <= 20) || [0, 5, 6, 7, 8, 9].indexOf(modulo) !== -1) {
        return forms.common;
    }

    if ([2, 3, 4].indexOf(modulo) !== -1) {
        return forms.rare;
    }

    if (modulo === 1) {
        return forms.unique;
    }
}

module.exports = function(localizeFilter) {
    return function (value, type) {

        switch (type) {
            case 'days':
                return chooseCorrectFormOfWordByRelatedNumber(value, {
                    common: localizeFilter('special_daysCommon'),
                    rare: localizeFilter('special_daysRare'),
                    unique: localizeFilter('special_daysUnique')
                });
            case 'hours':
                return chooseCorrectFormOfWordByRelatedNumber(value, {
                    common: localizeFilter('special_hoursCommon'),
                    rare: localizeFilter('special_hoursRare'),
                    unique: localizeFilter('special_hoursUnique')
                });
            case 'minutes':
                return chooseCorrectFormOfWordByRelatedNumber(value, {
                    common: localizeFilter('special_minutesCommon'),
                    rare: localizeFilter('special_minutesRare'),
                    unique: localizeFilter('special_minutesUnique')
                });
        }

    };
};
},{}],133:[function(require,module,exports){
"use strict";

var polyfills = require('../common/utils/polyfills');
polyfills.array();
polyfills.string();
polyfills.object();
polyfills.canvas();

angular.module('boards', [ 'messaging', 'site' ])
    .factory('Board', require('./models/boards/board'))
    .factory('BoardsList', require('./models/boards/boards-list'))
    .factory('boardsService', require('./services/boards/boards-service'))
    .factory('gridUtils', require('./services/boards/grid-utils'))
    .factory('switchZoneService', require('./services/boards/switch-zone-service'))
    .provider('tileLayoutConfig', require('./services/boards/tile-layout-config'))
    .factory('tileLayoutService', require('./services/boards/tile-layout-service'))
    .directive('tileLayout', require('./directives/boards/tile-layout'))
    .directive('grid', require('./directives/boards/grid'))
    .directive('switchZone', require('./directives/boards/switch-zone'))
    .directive('boardSwitcher', require('./directives/boards/board-switcher'))
    .directive('boardsList', require('./directives/boards/boards-list'))
    .config([ 'tileLayoutConfigProvider', function(tileLayoutConfigProvider) {
        tileLayoutConfigProvider.configMap({
            'only screen and (max-width: 1279px), (max-height: 600px)': {
                large: { width: 196, height: 145 },
                medium: { width: 196, height: 93 },
                small: { width: 93, height: 93 },
                hintSize: { width: 125, height: 125 },
                themes: { count: 9, width: 84 }
            },
            'only screen and (min-width: 1280px) and (min-height: 601px)': {
                large: { width: 230, height: 170 },
                medium: { width: 230, height: 110 },
                small: { width: 110, height: 110 },
                hintSize: { width: 155, height: 155 },
                themes: { count: 10, width: 100 }
            },
            'only screen and (min-width: 1440px) and (min-height: 661px)': {
                large: { width: 258, height: 191 },
                medium: { width: 258, height: 124 },
                small: { width: 124, height: 124 },
                hintSize: { width: 165, height: 165 },
                themes: { count: 11, width: 100 }
            },
            'only screen and (min-width: 1600px) and (min-height: 717px)': {
                large: { width: 280, height: 208 },
                medium: { width: 280, height: 135 },
                small: { width: 135, height: 135 },
                hintSize: { width: 180, height: 180 },
                themes: { count: 12, width: 100 }
            },
            'only screen and (min-width: 1920px) and (min-height: 831px)': {
                large: { width: 330, height: 245 },
                medium: { width: 330, height: 160 },
                small: { width: 160, height: 160 },
                hintSize: { width: 190, height: 190 },
                themes: { count: 14, width: 100 }
            }
        });
    } ]);

angular.module('tiles', [])
    .factory('emailboxFactory', require('./services/tiles/emailbox-factory'))
    .factory('emailDataService', require('./services/tiles/email-data-service'))
    .factory('emailService', require('./services/tiles/email-service'))
    .factory('mailCheckerService', require('./services/tiles/mail-checker-service'))
    .factory('currencyService', require('./services/tiles/currency-service'))
    .factory('weatherService', require('./services/tiles/weather-service'))
    .factory('horoService', require('./services/tiles/horo-service'))
    .factory('customTileDataService', require('./services/tiles/custom-tile-data-service'))
    .factory('gamesShowcaseService', require('./services/tiles/games-showcase-service'))
    .factory('showcaseFactory', require('./services/tiles/showcase-factory'))
    .factory('mediaService', require('./services/tiles/media-service'))
    .component('tileControls', require('./directives/tiles/tile-controls'))
    .component('emailTile', require('./directives/tiles/email-tile'))
    .component('musicTile', require('./directives/tiles/music-tile'))
    .component('currencyTile', require('./directives/tiles/currency-tile'))
    .component('weatherTile', require('./directives/tiles/weather-tile'))
    .component('horoTile', require('./directives/tiles/horo-tile'))
    .component('contentTile', require('./directives/tiles/content-tile'))
    .component('showcaseTile', require('./directives/tiles/showcase-tile'))
    .component('siteTile', require('./directives/tiles/site-tile'))
    .component('mediaTile', require('./directives/tiles/media-tile'))
    .directive('tileComponent', require('./directives/tiles/tile-component'))
    .directive('restoreBlock', require('./directives/popups/restore-block'))
    .directive('mediaItems', require('./directives/tiles/tile-additions/media-items'));

angular.module('mywidget', [])
    .component('mywidgetTile', require('./directives/tiles/mywidget-tile'))
    .factory('mywidgetService', require('./services/mywidget/mywidget-service'));

angular.module('add-tile', [])
    .component('addTileButton', require('./directives/add-tile/add-tile-button'))
    .component('addTileModal', require('./directives/add-tile/add-tile-modal-new'))
    .directive('confirmTileAddBlock', require('./directives/popups/confirm-tile-add'))
    .factory('recentSitesService', require('./services/add-tile/recent-sites-service'))
    .factory('widgetService', require('./services/add-tile/widget-service'))
    .factory('searchService', require('./services/add-tile/search-service'));

angular.module('utils', [])
    .directive('hideLoading', require('./directives/body/hide-loading'))
    .directive('pressEnter', require('./directives/utils/press-enter'))
    .directive('customPaste', require('./directives/utils/custom-paste'))
    .directive('customAutofocus', require('./directives/utils/custom-autofocus'))
    .directive('preventBlur', require('./directives/utils/prevent-blur'))
    .directive('bodyEvents', require('./directives/body/body-events'))
    .directive('hintsEvents', require('./directives/body/hints-events'))
    .directive('contentOverlay', require('./directives/overlays/content-overlay'))
    .directive('expandableOverlay', require('./directives/overlays/expandable-overlay'))
    .directive('mutablePlaceholder', require('./directives/utils/mutable-placeholder'))
    .component('dialogWrapper', require('./directives/popups/dialog-wrapper'))
    .directive('fileread', require('./directives/utils/fileread'))
    .factory('LazyFilteredList', require('./models/helpers/lazy-filtered-list'))
    .factory('linkHandler', require('./services/utils/link-handler'))
    .factory('highlightService', require('./services/utils/highlight-service'))
    .factory('guid', require('./services/wrappers/guid-factory'))
    .factory('urlUtils', require('./services/wrappers/url-utils-factory'))
    .factory('arrayUtils', require('./services/wrappers/array-utils-factory'))
    .factory('objectUtils', require('./services/wrappers/object-utils-factory'))
    .factory('colorUtils', require('./services/wrappers/color-utils-factory'))
    .factory('imageUtils', require('./services/wrappers/image-utils-factory'))
    .factory('overlayService', require('./services/utils/overlay-service'))
    .factory('asyncForEach', require('./services/wrappers/async-foreach-factory'))
    .factory('$snap', require('./services/wrappers/snap-factory'))
    .factory('arrayUtils', require('./services/wrappers/array-utils-factory'))
    .factory('urlParamsService', require('./services/utils/url-params-service'))
    .factory('watchService', require('./services/utils/watch-service'))
    .factory('fileSystem', require('./services/wrappers/file-system-factory'))
    .factory('specificValues', require('./services/utils/specific-values-service'))
    .factory('extensionInfo', require('./services/wrappers/extension-info'));

angular.module('drag', [])
    .factory('dragService', require('./services/drag/drag-service'))
    .factory('DragZone', require('./models/drag/drag-zone'))
    .factory('TileDragging', require('./models/drag/tile-dragging'))
    .factory('dragZoneFactory', require('./services/drag/drag-zone-factory'))
    .factory('dragModelFactory', require('./services/drag/drag-model-factory'))
    .directive('dragZoneContainer', require('./directives/drag/drag-zone-container'))
    .directive('dragZone', require('./directives/drag/drag-zone'))
    .directive('draggableTile', require('./directives/drag/draggable-tile'))
    .directive('droppableTile', require('./directives/drag/droppable-tile'))
    .directive('fileDropZone', require('./directives/drag/file-drop-zone'));

angular.module('messaging', [ 'chrome', 'utils' ])
    .factory('messagingService', require('./services/utils/messaging-service'));

angular.module('metrics', [ 'messaging' ])
    .factory('metricService', require('./services/metrics/metrics-service'));

angular.module('site', [])
    .factory('siteImageService', require('./services/tiles/site-image-service'))
    .factory('siteSerializer', require('./services/wrappers/site-serializer'))
    .factory('tileFactory', require('./services/tiles/tile-factory'));

angular.module('csp', [])
    .factory('imageLoader', require('./services/utils/image-loader'))
    .directive('cspSrc', require('./directives/utils/csp-src'));

angular.module('chrome', [])
    .factory('$chrome', require('./services/wrappers/chrome-factory'));

angular.module('chrome-services', [ 'chrome' ])
    .factory('extensionService', require('./services/tiles/extension-service'))
    .factory('tabService', require('./services/utils/tab-service'));

angular.module('rgbaster', [])
    .factory('$rgbaster', require('./services/wrappers/rgbaster'))
    .directive('rgbaster', require('./directives/utils/rgbaster'))
    .directive('bgColor', require('./directives/utils/bg-color'));

angular.module('add-site', [])
    .directive('urlInput', require('./directives/add-tile/url-input'))
    .factory('recommendedSitesService', require('./services/add-tile/recommended-sites-service'))
    .factory('tileStorageFactory', require('./services/add-tile/tile-storage-factory'));

angular.module('widgets-settings', [])
    .component('horoSettings', require('./directives/tiles/tile-additions/horo-settings'))
    .directive('dropdown', require('./directives/tiles/tile-additions/dropdown'))
    .directive('birthdayPicker', require('./directives/tiles/tile-additions/birthday-picker'));

angular.module('suggests', [])
    .factory('Suggest', require('./models/suggests/suggest'))
    .factory('SiteSuggest', require('./models/suggests/site-suggest'))
    .factory('Suggests', require('./models/suggests/suggests'))
    .factory('suggestsFactory', require('./services/search/suggests-factory'))
    .factory('mathService', require('./services/search/math-service'))
    .factory('suggestsService', require('./services/search/suggests-service'))
    .factory('searchSuggestsService', require('./services/search/search-suggests-service'))
    .factory('searchFavoritesService', require('./services/search/search-favorites-service'))
    .factory('searchExampleService', require('./services/search/search-example-service'))
    .component('suggest', require('./directives/search/suggest'))
    .component('siteSuggest', require('./directives/search/site-suggest'))
    //.directive('suggestsList', require('./directives/search/suggests-list'))
    .component('searchForm', require('./directives/search/search-form'))
    .component('searchInput', require('./directives/search/search-input'))
    .component('searchSuggests', require('./directives/search/search-suggests'))
    .directive('suggestsTileLayout', require('./directives/utils/suggests-tile-layout'));

angular.module('guides', [])
    .factory('GuideType', require('./models/guides/guide-type'))
    .factory('GuideRuleType', require('./models/guides/guide-rule-type'))
    .factory('BaseRule', require('./models/guides/rules/base-rule'))
    .factory('CountRule', require('./models/guides/rules/count-rule'))
    .factory('TimeRule', require('./models/guides/rules/time-rule'))
    .factory('BaseGuide', require('./models/guides/base-guide'))
    .factory('HintGuide', require('./models/guides/hint-guide'))
    .factory('OnboardingGuide', require('./models/guides/onboarding-guide'))
    .factory('guideRuleFactory', require('./services/guides/guide-rule-factory'))
    .factory('guideFactory', require('./services/guides/guide-factory'))
    .factory('hintsService', require('./services/guides/hints-service'))
    .factory('hintSerializer', require('./services/guides/hint-serializer'))
    .directive('hintsContainer', require('./directives/guides/hints-container'))
    .directive('onboardingGuide', require('./directives/guides/onboarding-guide'))
    .directive('hintGuide', require('./directives/guides/hint-guide'));

angular.module('themes', [])
    .provider('themesConfig', require('./services/themes/themes-config'))
    .factory('themesService', require('./services/themes/themes-service'))
    .factory('themesImagesLoadService', require('./services/themes/themes-images-load-service'))
    .factory('themesUploadService', require('./services/themes/themes-upload-service'))
    .factory('themeImageService', require('./services/wrappers/theme-image-service'))
    .component('themesContainer', require('./directives/themes/themes-container'))
    .directive('themesPanel', require('./directives/themes/themes-panel'))
    .component('authorBlock', require('./directives/themes/author-block'))
    .component('themePreview', require('./directives/themes/theme-preview'))
    .directive('pageTheme', require('./directives/body/page-theme'))
    .directive('themesOpenButton', require('./directives/themes/themes-open-button'))
    .config([ 'themesConfigProvider', function(themesConfigProvider) {
        themesConfigProvider.configMap({
            'only screen and (min-width: 1024px)': {
                themes: { count: 9, width: 84 }
            },
            'only screen and (min-width: 1280px)': {
                themes: { count: 10, width: 100 }
            },
            'only screen and (min-width: 1440px)': {
                themes: { count: 11, width: 100 }
            },
            'only screen and (min-width: 1600px)': {
                themes: { count: 12, width: 100 }
            },
            'only screen and (min-width: 1920px)': {
                themes: { count: 14, width: 100 }
            }
        });
    } ]);

angular.module('onboarding', [])
    .factory('onboardingService', require('./services/guides/onboarding-service'))
    .factory('onboardingGuidesCreator', require('./services/guides/onboarding-guides-creator'))
    .directive('onboardingHandler', require('./directives/guides/onboarding-handler'))
    .component('onboardingControl', require('./directives/guides/onboarding-control'))
    .component('themesSlide', require('./directives/guides/themes-slide'))
    .component('tilesSlide', require('./directives/guides/tiles-slide'))
    .component('onboarding', require('./directives/guides/onboarding'));

angular.module('filters', [])
    .filter('capitalize', require('./filters/capitalize'))
    .filter('hostname', require('./filters/hostname'))
    .filter('favicon', require('./filters/favicon'))
    .filter('shorten', require('./filters/shorten'))
    .filter('shortenExt', require('./filters/shorten-ext'))
    .filter('formatTitle', require('./filters/format-title'))
    .filter('insertWraps', require('./filters/insert-wraps'))
    .filter('insertNbsp', require('./filters/insert-nbsp'))
    .filter('insertNbHyphen', require('./filters/insert-nb-hyphen'))
    .filter('removeTopDomain', require('./filters/remove-top-domain'))
    .filter('formatTemperature', require('./filters/format-temperature'))
    .filter('formatCurrency', require('./filters/format-currency'))
    .filter('addDate', require('./filters/add-date'))
    .filter('safeHtml', require('./filters/safe-html'))
    .filter('sanitize', require('./filters/sanitize'))
    .filter('appendPlaceholders', require('./filters/append-placeholders'))
    .filter('formatSuggest', require('./filters/format-suggest'))
    .filter('onboardingProgress', require('./filters/onboarding-progress'))
    .filter('removeBr', require('./filters/remove-br'))
    .filter('bgImage', require('./filters/bg-image'));

angular.module('constants', [ 'chrome' ])
    .factory('appVersion', require('./constants/app-version'))
    .factory('keyCodes', require('./constants/key-codes'));

angular.module('focus', [])
    .directive('focusId', require('./directives/utils/focus-id'))
    .factory('focusService', require('./services/add-tile/focus-service'));


angular.module('menus', [])
    .directive('shortcutMenu', require('./directives/menus/shortcut-menu'));

angular.module('social', [])
    .factory('okSocialService', require('./services/tiles/ok-social-service'))
    .factory('socialService', require('./services/tiles/social-service'))
    .component('socialTile', require('./directives/tiles/social-tile'));

angular.module('special', [])
    .factory('specialService', require('./services/special/special-service'))
    .filter('formatCountdown', require('./filters/special/format-countdown'))
    .directive('specialContainer', require('./directives/special/special-container'))
    .directive('specialTile', require('./directives/special/special-tile'))
    .directive('newYearTile', require('./directives/special/ny-tile'))
    .directive('newYearFireworks', require('./directives/special/ny-fireworks'))
    .directive('countdownItem', require('./directives/special/countdown-item'))
    .directive('iframeTile', require('./directives/special/iframe-tile'));

angular.module('presets', [])
    .factory('presetsService', require('./services/presets/presets-service'))
    .factory('presetsDialogService', require('./services/presets/presets-dialog-service'))
    .factory('presetOnboardingSwithcerService', require('./services/presets/preset-onboarding-swithcer-service'))
    .component('presetsContainer', require('./directives/presets/presets-container'))
    .component('presetPreview', require('./directives/presets/preset-preview'))
    .component('presetsDialog', require('./directives/presets/presets-dialog'))
    .component('presetOnboarding', require('./directives/presets/preset-onboarding'))
    .component('presetOnboardingSwitcher', require('./directives/presets/preset-onboarding-switcher'));

angular.module('tabbar', [])
    .component('tabBar', require('./directives/tabbar/tabbar'))
    .component('settingsTabBar', require('./directives/tabbar/settings-tabbar'))
    .component('tab', require('./directives/tabbar/tab'));

angular.module('showcase', [])
    .factory('showcaseService', require('./services/showcase/showcase-service'))
    .factory('SelectableComponent', require('./directives/showcase/selectable-component'))
    .factory('selectionManager', require('./services/showcase/selection-manager'))
    .component('paginatedList', require('./directives/showcase/paginated-list'))
    .component('gridList', require('./directives/showcase/grid-list'))
    .component('showcaseRow', require('./directives/showcase/showcase-row'))
    .component('selectableTile', require('./directives/showcase/selectable-tile'))
    .component('selectedTilesPanel', require('./directives/showcase/selected-tiles-panel'))
    .component('gamesShowcase', require('./directives/games/games-showcase'));

angular.module('settings', [])
    .factory('boardsSettingsService', require('./services/settings/boards-settings-service'))
    .component('themesSettings', require('./directives/settings/themes-settings'))
    .component('tilesSettings', require('./directives/settings/tiles-settings'))
    .component('presetsSettings', require('./directives/settings/presets-settings'))
    .component('settingsDialog', require('./directives/settings/settings-dialog'))
    .component('settingsCategories', require('./directives/settings/settings-categories'));

angular.module('svg', [])
    .directive('spinner', require('./directives/svg/spinner'))
    .component('svgContainer', require('./directives/svg/svg-container'))
    .component('checkmark', require('./directives/svg/checkmark'))
    .component('closeIcon', require('./directives/svg/close-icon'));

angular.module('i18n', [])
    .filter('formatCount', require('./filters/format-count'))
    .filter('localize', require('./filters/localize'));

angular.module('auth', [])
    .directive('authBlock', require('./directives/auth/auth-block'))
    .factory('authProxyService', require('./services/auth/auth-proxy-service'));

angular.module('ok-widgets', [])
    .filter('notificationCount', require('./filters/notification-count'))
    .component('okGiftsTile', require('./directives/tiles/ok-gifts'))
    .component('okGamesTile', require('./directives/tiles/ok-games'))
    .component('okStreamsTile', require('./directives/tiles/ok-streams'))
    .component('okNotificationsTile', require('./directives/tiles/ok-notifications'))
    .component('okGamesShowcase', require('./directives/games/ok-games-showcase'))
    .factory('okGamesShowcaseService', require('./services/tiles/ok-games-showcase-service'));

var app = angular.module('app',
    [
        'angular-page-visibility',
        'ngSanitize',
        'ngAnimate',
        'constants',
        'tiles',
        'drag',
        'site',
        'metrics',
        'boards',
        'chrome-services',
        'add-site',
        'widgets-settings',
        'suggests',
        'guides',
        'themes',
        'onboarding',
        'ngDialog',
        'focus',
        'add-tile',
        'menus',
        'filters',
        'rgbaster',
        'csp',
        'special',
        'social',
        'showcase',
        'tabbar',
        'social',
        'presets',
        'settings',
        'svg',
        'mywidget',
        'auth',
        'ok-widgets',
        'i18n'
    ]);

app.config(require('./decorators/window-decorator'));

// FIREFOX
app.config(["$compileProvider", function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(?:https?|ftps?|mailto|chrome|chrome-extension|moz-extension):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(?:https?|chrome|blob|chrome-extension|moz-extension):|data:image\//);
}]);

app.config(["$animateProvider", function($animateProvider) {
    const classesArr = [
        'body',
        'recommendations-container',
        'recommendations-repeat',
        'guide-core',
        'restore-block',
        'guide',
        'onboarding',
        'content-overlay',
        'email-button',
        'themes-wrapper',
        'boards-wrapper',
        'boards-panel-preview',
        'board-switcher',
        'board-tiles',
        'special-animate',
        'search-example',
        'suggests-container',
        'counter',
        'themes-error',
        'settings-right',
        //'tile-item'
        'showcase-row',
        'repeat-row',
        'selected-tile-item',
        'page-background-container'
    ];

    $animateProvider.classNameFilter(new RegExp(classesArr.join('|')));
}]);

app.config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        plain: true,
        showClose: false
    });
}]);

app.run(["$window", "boardsService", function($window, boardsService) {
    $window.onbeforeunload = function() {
        if (boardsService.loaded) {
            boardsService.sync(true);
        }
    };
}]);

app.run(["$rootScope", "presetsDialogService", function($rootScope, presetsDialogService) {
    presetsDialogService.init();
}]);

app.run(["$rootScope", "appVersion", function($rootScope, appVersion) {
    $rootScope.appVersion = appVersion;
}]);

},{"../common/utils/polyfills":281,"./constants/app-version":1,"./constants/key-codes":2,"./decorators/window-decorator":3,"./directives/add-tile/add-tile-button":4,"./directives/add-tile/add-tile-modal-new":5,"./directives/add-tile/url-input":6,"./directives/auth/auth-block":7,"./directives/boards/board-switcher":8,"./directives/boards/boards-list":9,"./directives/boards/grid":10,"./directives/boards/switch-zone":11,"./directives/boards/tile-layout":12,"./directives/body/body-events":13,"./directives/body/hide-loading":14,"./directives/body/hints-events":15,"./directives/body/page-theme":16,"./directives/drag/drag-zone":18,"./directives/drag/drag-zone-container":17,"./directives/drag/draggable-tile":19,"./directives/drag/droppable-tile":20,"./directives/drag/file-drop-zone":21,"./directives/games/games-showcase":22,"./directives/games/ok-games-showcase":23,"./directives/guides/hint-guide":24,"./directives/guides/hints-container":25,"./directives/guides/onboarding":29,"./directives/guides/onboarding-control":26,"./directives/guides/onboarding-guide":27,"./directives/guides/onboarding-handler":28,"./directives/guides/themes-slide":30,"./directives/guides/tiles-slide":31,"./directives/menus/shortcut-menu":32,"./directives/overlays/content-overlay":33,"./directives/overlays/expandable-overlay":34,"./directives/popups/confirm-tile-add":35,"./directives/popups/dialog-wrapper":36,"./directives/popups/restore-block":37,"./directives/presets/preset-onboarding":39,"./directives/presets/preset-onboarding-switcher":38,"./directives/presets/preset-preview":40,"./directives/presets/presets-container":41,"./directives/presets/presets-dialog":42,"./directives/search/search-form":43,"./directives/search/search-input":44,"./directives/search/search-suggests":45,"./directives/search/site-suggest":46,"./directives/search/suggest":47,"./directives/settings/presets-settings":48,"./directives/settings/settings-categories":49,"./directives/settings/settings-dialog":50,"./directives/settings/themes-settings":51,"./directives/settings/tiles-settings":52,"./directives/showcase/grid-list":53,"./directives/showcase/paginated-list":54,"./directives/showcase/selectable-component":55,"./directives/showcase/selectable-tile":56,"./directives/showcase/selected-tiles-panel":57,"./directives/showcase/showcase-row":58,"./directives/special/countdown-item":59,"./directives/special/iframe-tile":60,"./directives/special/ny-fireworks":61,"./directives/special/ny-tile":62,"./directives/special/special-container":63,"./directives/special/special-tile":64,"./directives/svg/checkmark":65,"./directives/svg/close-icon":66,"./directives/svg/spinner":67,"./directives/svg/svg-container":68,"./directives/tabbar/settings-tabbar":69,"./directives/tabbar/tab":70,"./directives/tabbar/tabbar":71,"./directives/themes/author-block":72,"./directives/themes/theme-preview":73,"./directives/themes/themes-container":74,"./directives/themes/themes-open-button":75,"./directives/themes/themes-panel":76,"./directives/tiles/content-tile":77,"./directives/tiles/currency-tile":78,"./directives/tiles/email-tile":79,"./directives/tiles/horo-tile":80,"./directives/tiles/media-tile":81,"./directives/tiles/music-tile":82,"./directives/tiles/mywidget-tile":83,"./directives/tiles/ok-games":84,"./directives/tiles/ok-gifts":85,"./directives/tiles/ok-notifications":86,"./directives/tiles/ok-streams":87,"./directives/tiles/showcase-tile":88,"./directives/tiles/site-tile":89,"./directives/tiles/social-tile":90,"./directives/tiles/tile-additions/birthday-picker":91,"./directives/tiles/tile-additions/dropdown":92,"./directives/tiles/tile-additions/horo-settings":93,"./directives/tiles/tile-additions/media-items":94,"./directives/tiles/tile-component":95,"./directives/tiles/tile-controls":96,"./directives/tiles/weather-tile":97,"./directives/utils/bg-color":98,"./directives/utils/csp-src":99,"./directives/utils/custom-autofocus":100,"./directives/utils/custom-paste":101,"./directives/utils/fileread":102,"./directives/utils/focus-id":103,"./directives/utils/mutable-placeholder":104,"./directives/utils/press-enter":105,"./directives/utils/prevent-blur":106,"./directives/utils/rgbaster":107,"./directives/utils/suggests-tile-layout":108,"./filters/add-date":109,"./filters/append-placeholders":110,"./filters/bg-image":111,"./filters/capitalize":112,"./filters/favicon":113,"./filters/format-count":114,"./filters/format-currency":115,"./filters/format-suggest":116,"./filters/format-temperature":117,"./filters/format-title":118,"./filters/hostname":119,"./filters/insert-nb-hyphen":120,"./filters/insert-nbsp":121,"./filters/insert-wraps":122,"./filters/localize":123,"./filters/notification-count":124,"./filters/onboarding-progress":125,"./filters/remove-br":126,"./filters/remove-top-domain":127,"./filters/safe-html":128,"./filters/sanitize":129,"./filters/shorten":131,"./filters/shorten-ext":130,"./filters/special/format-countdown":132,"./models/boards/board":134,"./models/boards/boards-list":135,"./models/drag/drag-zone":136,"./models/drag/tile-dragging":137,"./models/guides/base-guide":138,"./models/guides/guide-rule-type":139,"./models/guides/guide-type":140,"./models/guides/hint-guide":141,"./models/guides/onboarding-guide":142,"./models/guides/rules/base-rule":143,"./models/guides/rules/count-rule":144,"./models/guides/rules/time-rule":145,"./models/helpers/lazy-filtered-list":146,"./models/suggests/site-suggest":147,"./models/suggests/suggest":148,"./models/suggests/suggests":149,"./services/add-tile/focus-service":150,"./services/add-tile/recent-sites-service":151,"./services/add-tile/recommended-sites-service":152,"./services/add-tile/search-service":153,"./services/add-tile/tile-storage-factory":154,"./services/add-tile/widget-service":155,"./services/auth/auth-proxy-service":156,"./services/boards/boards-service":157,"./services/boards/grid-utils":158,"./services/boards/switch-zone-service":159,"./services/boards/tile-layout-config":160,"./services/boards/tile-layout-service":161,"./services/drag/drag-model-factory":162,"./services/drag/drag-service":163,"./services/drag/drag-zone-factory":164,"./services/guides/guide-factory":165,"./services/guides/guide-rule-factory":166,"./services/guides/hint-serializer":167,"./services/guides/hints-service":168,"./services/guides/onboarding-guides-creator":169,"./services/guides/onboarding-service":170,"./services/metrics/metrics-service":171,"./services/mywidget/mywidget-service":172,"./services/presets/preset-onboarding-swithcer-service":173,"./services/presets/presets-dialog-service":174,"./services/presets/presets-service":175,"./services/search/math-service":176,"./services/search/search-example-service":177,"./services/search/search-favorites-service":178,"./services/search/search-suggests-service":179,"./services/search/suggests-factory":180,"./services/search/suggests-service":181,"./services/settings/boards-settings-service":182,"./services/showcase/selection-manager":183,"./services/showcase/showcase-service":184,"./services/special/special-service":185,"./services/themes/themes-config":186,"./services/themes/themes-images-load-service":187,"./services/themes/themes-service":188,"./services/themes/themes-upload-service":189,"./services/tiles/currency-service":190,"./services/tiles/custom-tile-data-service":191,"./services/tiles/email-data-service":192,"./services/tiles/email-service":193,"./services/tiles/emailbox-factory":194,"./services/tiles/extension-service":195,"./services/tiles/games-showcase-service":196,"./services/tiles/horo-service":197,"./services/tiles/mail-checker-service":198,"./services/tiles/media-service":199,"./services/tiles/ok-games-showcase-service":200,"./services/tiles/ok-social-service":201,"./services/tiles/showcase-factory":202,"./services/tiles/site-image-service":203,"./services/tiles/social-service":204,"./services/tiles/tile-factory":205,"./services/tiles/weather-service":206,"./services/utils/highlight-service":207,"./services/utils/image-loader":208,"./services/utils/link-handler":209,"./services/utils/messaging-service":210,"./services/utils/overlay-service":211,"./services/utils/specific-values-service":212,"./services/utils/tab-service":213,"./services/utils/url-params-service":214,"./services/utils/watch-service":215,"./services/wrappers/array-utils-factory":216,"./services/wrappers/async-foreach-factory":217,"./services/wrappers/chrome-factory":218,"./services/wrappers/color-utils-factory":219,"./services/wrappers/extension-info":220,"./services/wrappers/file-system-factory":221,"./services/wrappers/guid-factory":222,"./services/wrappers/image-utils-factory":223,"./services/wrappers/object-utils-factory":224,"./services/wrappers/rgbaster":225,"./services/wrappers/site-serializer":226,"./services/wrappers/snap-factory":227,"./services/wrappers/theme-image-service":228,"./services/wrappers/url-utils-factory":229}],134:[function(require,module,exports){
"use strict";

var TileType = require('../../../common/models/tile-type');

module.exports = /*@ngInject*/ ["$q", "$chrome", "$window", "boardsSettingsService", "tileFactory", "siteSerializer", "urlUtils", "objectUtils", function($q, $chrome, $window, boardsSettingsService,
                                        tileFactory, siteSerializer, urlUtils, objectUtils) {

    class Board {
        constructor(source) {
            source = source || { };
            this._tiles = siteSerializer.deserialize(source.tiles || [ ]);
            this._maxCount = boardsSettingsService.maxTilesCount || 24;
            console.log('NEW BOARD', this);
        }

        get tiles() {
            return this._tiles;
        }

        get displayedTiles() {
            return this._tiles;
        }

        get isFull() {
            return this._tiles.length >= this._maxCount;
        }

        get isEmpty() {
            return this._tiles.length === 0;
        }

        get tilesCount() {
            return this._tiles.length;
        }

        contains(tile) {
            return this._tiles.indexOf(tile) !== -1;
        }

        indexOf(tile) {
            return this._tiles.findIndex(item => item.id === tile.id);
        }

        add(tile, addIndex) {
            if (!this.isFull) {
                if (addIndex !== undefined) {
                    this._tiles.splice(addIndex, 0, tile);
                } else {
                    this._tiles.push(tile);
                }
                return true;
            }

            return false;
        }

        addMany(tiles) {
            let addedCount = 0;

            tiles.forEach(tile => {
                const isAdded = this.add(tile);
                if (isAdded) {
                    addedCount++;
                }
            });

            return addedCount > 0;
        }

        remove(tile) {
            this._tiles.splice(this.indexOf(tile), 1);
            return this;
        }

        cutByIndex(index) {
            return this._tiles.splice(index, 1)[0];
        }

        sort(oldIndex, newIndex) {
            this._tiles.splice(newIndex, 0, this._tiles.splice(oldIndex, 1)[0]);
            return this;
        }

        filterSites(sites) {
            if (!sites) {
                return [ ];
            }

            const userSites = Array.isArray(sites) ? sites : [ sites ];

            return userSites.filter(userSite => {
                const userSiteUrl = userSite.url;
                const userSiteHostname = urlUtils.getHostname(userSiteUrl);
                const userSiteIsDomain = urlUtils.isDomain(userSiteUrl);
                const userSiteType =
                    userSite.type === TileType.PROMO ?
                        (userSite.src.type || TileType.SITE) :
                        userSite.type;

                return !this._tiles.some(tile => {
                    return tile.compare({
                        url: userSiteUrl,
                        hostname: userSiteHostname,
                        isDomain: userSiteIsDomain,
                        type: userSiteType,
                        id: userSite.id,
                        tile: userSite
                    });
                });
            });
        }

        findTileBySource(source) {
            const sourceUrl = source.url;
            const sourceHostname = urlUtils.getHostname(sourceUrl);
            const sourceIsDomain = urlUtils.isDomain(sourceUrl);
            const sourceType =
                source.type === TileType.PROMO ?
                    (source.src.type || TileType.SITE) :
                    source.type;

            return this._tiles.find(tile => {
                return tile.compare({
                    url: sourceUrl,
                    hostname: sourceHostname,
                    isDomain: sourceIsDomain,
                    type: sourceType,
                    id: source.id,
                    tile: source
                });
            });
        }

        getTileIdByUrl(url) {
            const userSiteUrl = urlUtils.createCorrectUrl(url);
            const userSiteHostname = urlUtils.getHostname(userSiteUrl);
            const userSiteIsDomain = urlUtils.isDomain(userSiteUrl);

            const targetTile = this._tiles.find(tile => {
                if (tile.type === TileType.SITE && userSiteUrl != null) {
                    const tileUrl = tile.url;
                    const tileIsDomain = urlUtils.isDomain(tileUrl);
                    const tileHostname = urlUtils.getHostname(tileUrl);

                    if (userSiteIsDomain && tileIsDomain) {
                        return tileHostname === userSiteHostname;
                    }

                    return urlUtils.compare(tileUrl, userSiteUrl);
                } else {
                    return false;
                }
            });

            return targetTile ? targetTile.id : undefined;
        }

        serialize() {
            return {
                tiles: siteSerializer.serialize(this._tiles)
            };
        }
    }

    return Board;
}];
},{"../../../common/models/tile-type":259}],135:[function(require,module,exports){
"use strict";

const tileConstants = require('../../../common/models/tile-constants');
const MAX_BOARDS_COUNT = tileConstants.MAX_BOARDS_COUNT;
const MAX_TILES_COUNT = tileConstants.MAX_TILES_COUNT;
const ABSOLUTELY_MAX_TILES_COUNT = tileConstants.ABSOLUTELY_MAX_TILES_COUNT;

module.exports = /*@ngInject*/ ["Board", "objectUtils", "boardsSettingsService", function(Board, objectUtils, boardsSettingsService) {

    class BoardsList {
        constructor(source) {
            source = source || { };
            const boards = Array.isArray(source.boards) ? source.boards : [];
            this._boards = boards.map(board => new Board(board));
            this.recalculateBoards();
            this._visibleBoards = [];
        }

        resetBoards(boards) {
            boards = Array.isArray(boards) ? boards : [];

            this._boards = boards.map(board => new Board(board));
            this._visibleBoards = [];
        }

        get activeBoard() {
            return this._boards[boardsSettingsService.activeBoardIndex];
        }

        get activeBoardTilesCount() {
            return this.activeBoard.tilesCount;
        }

        get boardsCount() {
            return this._boards.length;
        }

        get allTilesCount() {
            return this._boards.reduce((prev, currBoard) => {
                return prev + currBoard.tilesCount;
            }, 0);
        }

        get hasNoPlaceToAdd() {
            return this.boardsCount >= MAX_BOARDS_COUNT && this.activeBoard.isFull && !this.hasFreeSpaceOnTheRight();
        }

        get isEmpty() {
            const noBoards = this.boardsCount === 0;
            const noTilesOnSingleBoard = this.boardsCount === 1 && this._boards[0].tilesCount === 0;

            return noBoards || noTilesOnSingleBoard;
        }

        get visibleBoards() {
            const activeBoardIndex = boardsSettingsService.activeBoardIndex;
            this._visibleBoards = new Array(this.boardsCount);
            this._visibleBoards[activeBoardIndex] = this._boards[activeBoardIndex];
            //this._visibleBoards = this._visibleBoards.slice(0, this.boardsCount);
            return this._visibleBoards;
        }

        isCorrectIndex(index) {
            return Number.isInteger(index) && index >= 0 && index < this.boardsCount;
        }

        getBoard(index) {
            return this._boards[index];
        }

        findBoardIndex(condition) {
            return this._boards.findIndex(condition);
        }

        reduce(fn, initial) {
            return this._boards.reduce(fn, initial);
        }

        getAllTiles() {
            return this._boards.reduce((prev, currBoard) => {
                return prev.concat(currBoard.tiles);
            }, []);
        }

        addTileToNewBoard(tile) {
            this.addBoards([{ tiles: [] }]);

            const lastIndex = this.boardsCount - 1;
            this.getBoard(lastIndex).add(tile);
            boardsSettingsService.setActiveBoardIndex(lastIndex, this.boardsCount);

            return true;
        }

        addTile(tile, options) {
            options = options || {};

            const boardIndex = options.boardIndex;
            const tileIndex = options.tileIndex;

            if (this.boardsCount === 0 || boardIndex >= this.boardsCount) {
                return this.addTileToNewBoard(tile);
            }

            const boardToAdd = this.getBoard(boardIndex) || this.activeBoard;

            if (!boardToAdd.isFull) {
                return boardToAdd.add(tile, tileIndex);
            }

            const boardWithFreeSpaceIndex = this.findBoardWithFreeSpaceOnTheRight();

            if (boardWithFreeSpaceIndex === undefined) {
                return false;
            }

            if (boardWithFreeSpaceIndex !== this.boardsCount) {
                const isAdded = this.getBoard(boardWithFreeSpaceIndex).add(tile);
                if (isAdded) {
                    boardsSettingsService.setActiveBoardIndex(boardWithFreeSpaceIndex, this.boardsCount);
                }

                return isAdded;
            }

            return this.addTileToNewBoard(tile);
        }

        addBoards(boardsToAdd, index) {
            const newBoards = boardsToAdd.map(board => new Board(board));
            const indexToAdd = index !== undefined ? index : this.boardsCount;

            this._boards.splice.apply(this._boards, [indexToAdd, 0].concat(newBoards));

            if (indexToAdd <= boardsSettingsService.activeBoardIndex) {
                boardsSettingsService.setActiveBoardIndex(boardsSettingsService.activeBoardIndex + newBoards.length, this.boardsCount);
            }
        }

        removeEmptyBoards() {
            let shift = 0;
            const activeBoardIndex = boardsSettingsService.activeBoardIndex;

            this._boards = this._boards.filter((board, index) => {
                if (board.isEmpty && index <= activeBoardIndex) {
                    shift++;
                }

                return !board.isEmpty;
            });

            const newActiveBoardIndex = shift <= activeBoardIndex ? activeBoardIndex - shift : 0;
            boardsSettingsService.setActiveBoardIndex(newActiveBoardIndex, this.boardsCount);
        }

        serializeBoards() {
            return this._boards.map(board => board.serialize());
        }

        hasFreeSpaceOnTheRight() {
            return this.findBoardWithFreeSpaceOnTheRight() !== undefined;
        }

        hasFreeSpaceOnTheLeft() {
            return this.findBoardWithFreeSpaceOnTheLeft() !== undefined;
        }

        findBoardWithFreeSpaceOnTheLeft() {
            const boardWithFreeSpaceIndex = this._boards.slice().reverse().findIndex((board, index) => {
                return index >= this.boardsCount - boardsSettingsService.activeBoardIndex && !board.isFull;
            });

            return boardWithFreeSpaceIndex !== -1 ? (this.boardsCount - boardWithFreeSpaceIndex - 1) : undefined;
        }

        findBoardWithFreeSpaceOnTheRight() {
            const boardWithFreeSpaceIndex = this._boards.findIndex((board, index) => {
                return index > boardsSettingsService.activeBoardIndex && !board.isFull;
            });

            if (boardWithFreeSpaceIndex !== -1) {
                return boardWithFreeSpaceIndex;
            }

            if (this.boardsCount < MAX_BOARDS_COUNT &&
                (this.activeBoard && this.activeBoardTilesCount > 1)) {
                return this.boardsCount;
            }

            return undefined;
        }

        recalculateBoards() {
            const maxTilesCount = boardsSettingsService.maxTilesCount;
            const newBoards = [];
            const oldBoards = this._boards.slice();

            while (oldBoards.length > 0) {
                const oldBoard = oldBoards.shift();

                if (oldBoard.tilesCount <= maxTilesCount) {
                    const newBoard = new Board(oldBoard.serialize());
                    newBoards.push(newBoard);
                } else {
                    const oldBoardTiles = oldBoard.tiles;

                    while (oldBoardTiles.length > 0) {
                        const newBoard = new Board();
                        const tilesForBoard = oldBoardTiles.splice(0, maxTilesCount);
                        newBoard.addMany(tilesForBoard);
                        newBoards.push(newBoard);
                    }
                }
            }

            this._boards = newBoards;

            if (boardsSettingsService.activeBoardIndex >= this.boardsCount) {
                boardsSettingsService.setActiveBoardIndex(this.boardsCount - 1, this.boardsCount);
            }
        }
    }

    return BoardsList;
}];
},{"../../../common/models/tile-constants":258}],136:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$window", "$snap", function($window, $snap) {

    class DragZone {
        constructor(source) {
            this._zone = angular.element($window.document.querySelector(source.zoneSelector));
            this._surf = $snap(source.svgSelector);
            this._gradient = this._surf.gradient(source.gradient);
            this._calculateGradient = source.calculateGradient;
            this._endingCondition = source.endingCondition;
            this._startingPath = source.path;
            this._endingPath = source.endingPath;
            this._path = this._surf.path(this._startingPath);

            this._path.attr({
                fill: this._gradient
            });

            this._calculateZoneSize = source.calculateZoneSize;
        }

        rerender(x) {
            if (this._endingCondition(x)) {
                return this._path.attr({
                    d: this._endingPath
                }, 50);
            }

            const newGradient = this._surf.gradient(this._calculateGradient(x));

            this._path.attr({
                fill: newGradient
            });

            this._path.attr({
                d: this._startingPath
            }, 50);

            this._gradient.remove();
            this._gradient = newGradient;

            this._zone.css({
                width: this._calculateZoneSize(x) + 'px'
            });
        }

        clear() {
            this._surf.clear();
        }

        show() {
            this._zone.addClass('visible');
        }

        hide() {
            this._zone.removeClass('visible');
        }
    }

    return DragZone;
}];
},{}],137:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$window", "$timeout", "$rootScope", "dragZoneFactory", "boardsService", "metricService", function($window, $timeout, $rootScope, dragZoneFactory, boardsService, metricService) {

    const ZONE_CLEAR_TIMEOUT = 250;

    class TileDragging {
        constructor() {
            this._leftZone = dragZoneFactory.create('left');
            this._rightZone = dragZoneFactory.create('right');
        }

        onDragXChange(newDragX, oldDragX) {
            const halfWidth = 0.5 * $window.innerWidth;
    
            if (newDragX <= halfWidth) {
                if (oldDragX > halfWidth || oldDragX === undefined) {
                    this._leftZone.show();
                    this._rightZone.hide();
                }

                this._leftZone.rerender(newDragX);
            } else {
                if (oldDragX <= halfWidth || oldDragX === undefined) {
                    this._leftZone.hide();
                    this._rightZone.show();
                    if (boardsService.boardsList.hasFreeSpaceOnTheRight(true)) {
                        $rootScope.$emit('hints:dragTile');
                    }
                }

                this._rightZone.rerender(newDragX);
            }
        }

        onDragFinished(dragData) {
            $timeout(() => {
                this._leftZone.clear();
                this._rightZone.clear();
            }, ZONE_CLEAR_TIMEOUT);

            this._leftZone.hide();
            this._rightZone.hide();

            const samePosition = dragData.initialTileIndex === dragData.tileIndex &&
                dragData.initialBoardIndex === dragData.boardIndex;

            if (!samePosition) {
                metricService.send('tile_moved', [
                    dragData.url,
                    dragData.initialTileIndex,
                    dragData.tileIndex,
                    dragData.initialBoardIndex,
                    dragData.boardIndex
                ]);
            }
        }
    }

    return TileDragging;
}];
},{}],138:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["GuideType", "tileLayoutConfig", function(GuideType, tileLayoutConfig) {

    class Guide {
        constructor(source) {
            this._type = source.type || GuideType.DEFAULT;
            this._selector = source.selector;
            this._className = source.className;
            this._description = source.description;
            this._visible = false;
            this._position = {
                width: source.width || 0,
                height: source.height || 0
            };
            this._positioningMode = source.positioningMode; //how element positions relative to target
            this._shift = source.shift;
            this._imgUrl = source.imgUrl;
        }

        get type() {
            return this._type;
        }

        get x() {
            return this._x;
        }

        get y() {
            return this._y;
        }

        get target() {
            return this._target;
        }

        get className() {
            return this._className;
        }

        get description() {
            return this._description;
        }

        get position() {
            const pos = { };
            for (let key in this._position) {
                if (this._position.hasOwnProperty(key)) {
                    pos[key] = Math.round(this._position[key]) + 'px';
                }
            }
            return pos;
        }

        get imgUrl() {
            return this._imgUrl;
        }

        get visible() {
            return this._visible;
        }

        set visible(visibility) {
            this._visible = visibility;
        }

        getTargetCoordinates() {
            return {
                x: this.x,
                y: this.y
            };
        }

        calculateShiftValue() {
            let leftShift,
                topShift;

            switch (this._shift.left.unit) {
                case 'px':
                    leftShift = this._shift.left.value;
                    break;
                case '%':
                    leftShift = this._shift.left.value / 100 * this._position.width;
                    break;
            }

            switch (this._shift.top.unit) {
                case 'px':
                    topShift = this._shift.top.value;
                    break;
                case '%':
                    topShift = this._shift.top.value / 100 * this._position.height;
                    break;
            }

            return {
                left: leftShift,
                top: topShift
            };
        }

        calculateWindowEdgesCorrection() { //only for top and bottom edges
            const topEdge = this._position.top - window.scrollY;
            const bottomEdge = topEdge + this._position.height;
            const innerHeight = window.innerHeight;

            const correction = {
                top: 0
            };

            if (bottomEdge > innerHeight) {
                correction.top = innerHeight - bottomEdge;
            }

            if (topEdge < 0) {
                correction.top = -topEdge;
            }

            return correction;
        }

        setPosition(positioningMode, width, height, x, y) {
            this._target = document.querySelector(this._selector);

            if (positioningMode) {
                this._positioningMode = positioningMode;
            }

            if (width) {
                this._position.width = width;
            }

            if (height) {
                this._position.height = height;
            }

            const boundingRect = this.target.getBoundingClientRect();
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;

            switch (this._positioningMode) {
                case 'center':
                    this._x = scrollX + boundingRect.left + boundingRect.width / 2;
                    this._y = scrollY + boundingRect.top + boundingRect.height / 2;
                    break;
                case 'left':
                    this._x = scrollX + boundingRect.left;
                    this._y = scrollY + boundingRect.top + boundingRect.height / 2;
                    break;
                case 'left-bottom':
                    this._x = scrollX + boundingRect.left;
                    this._y = scrollY + boundingRect.top + boundingRect.height;
                    break;
                case 'right':
                    this._x = scrollX + boundingRect.right;
                    this._y = scrollY + boundingRect.top + boundingRect.height / 2;
                    break;
                case 'right-top':
                    this._x = scrollX + boundingRect.right;
                    this._y = scrollY + boundingRect.top;
                    break;
                case 'right-bottom':
                    this._x = scrollX + boundingRect.right;
                    this._y = scrollY + boundingRect.top + boundingRect.height;
                    break;
                case 'right-left': //to locate guide-block over right side of element
                    this._x = scrollX + boundingRect.right - this._position.width;
                    this._y = scrollY + boundingRect.top + boundingRect.height / 2;
                    break;
                case 'top':
                    this._x = scrollX + boundingRect.left + boundingRect.width / 2;
                    this._y = scrollY + boundingRect.top;
                    break;
            }

            if (x) { this._x = x; }
            if (y) { this._y = y; }

            const shift = this.calculateShiftValue();

            this._position.left = this._x - this._position.width / 2 + shift.left;
            this._position.top = this._y - this._position.height / 2 + shift.top;

            const correction = this.calculateWindowEdgesCorrection();

            this._position.top += correction.top;
        }

        getPositionFromConfig() {
            const config = tileLayoutConfig.getConfig();
            this.setPosition(null, config.hintSize.width, config.hintSize.height);
        }
    }

    return Guide;
}];
},{}],139:[function(require,module,exports){
"use strict";

var RuleType = require('../../../common/models/guide-rule-type');

module.exports = /*@ngInject*/ function() {
    return RuleType;
};
},{"../../../common/models/guide-rule-type":245}],140:[function(require,module,exports){
"use strict";

var GuideType = require('../../../common/models/guide-type');

module.exports = /*@ngInject*/ function() {
    return GuideType;
};
},{"../../../common/models/guide-type":246}],141:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["GuideType", "BaseGuide", "guideRuleFactory", function(GuideType, BaseGuide, guideRuleFactory) {

    class HintGuide extends BaseGuide {
        constructor(source) {
            super(source);

            this._type = GuideType.HINT;
            this._events = source.events;
            this._displayRule = guideRuleFactory.create(Object.assign({}, source.displayRule, {
                displayInfo: source.displayInfo
            }));
            this._disabled = source.disabled || false;
        }

        get events() {
            return this._events;
        }

        disable() {
            this._disabled = true;
        }

        enable() {
            this._disabled = false;
        }

        show() {
            if (this._disabled) {
                return false;
            }

            if (this._displayRule.checkIfShouldBeDisplayed()) {
                this.getPositionFromConfig();
                this.visible = true;
                return true;
            }

            return false;
        }

        hide() {
            this.visible = false;
        }

        json() {
            return {
                type: this._type,
                events: this._events,
                disabled: this._disabled,
                selector: this._selector,
                positioningMode: this._positioningMode,
                width: this._position.width,
                height: this._position.height,
                shift: this._shift,
                className: this._className,
                description: this._description,
                imgUrl: this._imgUrl,
                displayRule: this._displayRule.json(),
                displayInfo: this._displayRule.displayInfo
            };
        }
    }

    return HintGuide;
}];

},{}],142:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["GuideType", "BaseGuide", function(GuideType, BaseGuide) {

    class OnboardingGuide extends BaseGuide {
        constructor(source) {
            super(source);

            this._helpTitle = source.helpTitle || '';
            this._helpText = source.helpText || '';
            this._type = GuideType.ONBOARDING;
        }

        get helpTitle() {
            return this._helpTitle;
        }

        get helpText() {
            return this._helpText;
        }
    }

    return OnboardingGuide;
}];

},{}],143:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    class Rule {
        constructor(source) {
            this._type = source.type;
            this._data = source.data;
            this._displayInfo = source.displayInfo || Object.assign({}, source.data);
        }

        get displayInfo() {
            return this._displayInfo;
        }

        checkIfShouldBeDisplayed() {

        }

        json() {
            return {
                type: this._type,
                data: this._data
            };
        }
    }

    return Rule;
};
},{}],144:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["BaseRule", function(BaseRule) {

    class CountRule extends BaseRule {
        constructor(source) {
            super(source);
        }

        checkIfShouldBeDisplayed() {
            this._displayInfo.currentDisplayCount =
                    this._displayInfo.currentDisplayCount !== undefined ?
                    this._displayInfo.currentDisplayCount :
                    0;

            const should = this._displayInfo.currentDisplayCount < this._data.maxDisplayCount;

            if (should) {
                this._displayInfo.currentDisplayCount++;
            }

            return should;
        }
    }

    return CountRule;
}];
},{}],145:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["BaseRule", function(BaseRule) {

    class TimeRule extends BaseRule {
        constructor(source) {
            super(source);
        }

        checkIfShouldBeDisplayed() {
            const currentTime =  Date.now();
            this._displayInfo.createTime = this._displayInfo.createTime || currentTime;

            const should = !this._displayInfo.displayed && (currentTime - this._displayInfo.createTime > this._data.timeUntilDisplay);

            if (should) {
                this._displayInfo.displayed = true;
            }

            return should;
        }
    }

    return TimeRule;
}];
},{}],146:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    class LazyFilteredList {
        constructor(source) {
            source = source || {};
            this._items = source.items || [];
            this._filterFn = source.filterFn;
            this._reserveSize = source.reserveSize || 10;
            this._filterStep = source.filterStep || 10;
            this._filteredItems = source.alreadyFiltered ? source.items : [];
            this._allFiltered = source.alreadyFiltered ? true : false;
            this._lastFilteredIndex = 0;
            this.getItemsFromRange(0, 0);
        }

        get rawItems() {
            return this._items;
        }

        get items() {
            return this._filteredItems;
        }

        get itemsCount() {
            return this._filteredItems.length;
        }

        get allFiltered() {
            return this._allFiltered;
        }

        getItemsFromRange(start, end) {
            while (!this._allFiltered && (this._filteredItems.length < end + this._reserveSize)) {
                if (this._lastFilteredIndex > this._items.length) {
                    this._allFiltered = true;
                    continue;
                }

                const filtered = this._filterFn(this._items.slice(this._lastFilteredIndex, this._lastFilteredIndex + this._filterStep));
                this._filteredItems = this._filteredItems.concat(filtered);
                this._lastFilteredIndex += this._filterStep;
            }

            return this._filteredItems.slice(start, end);
        }
    }

    return LazyFilteredList;
};
},{}],147:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["Suggest", "urlUtils", function(Suggest, urlUtils) {

    class SiteSuggest extends Suggest {
        constructor(source) {
            super(source);

            this._text = source.text ? urlUtils.getCleanUrl(source.text) : '';
            this._favicon = source.favicon;
            this._description = source.desc || source.site;
            this._link = source.golink;
            this._params.fr2 = 'suggest';
        }

        get favicon() {
            return this._favicon;
        }

        get description() {
            return this._description;
        }

        get link() {
            return this._link;
        }

        getUrl() {
            return this._link + '&' + this.getParams();
        }
    }

    return SiteSuggest;
}];

},{}],148:[function(require,module,exports){
"use strict";

const storage = require('../../../common/factory/localstorage-factory')();

module.exports = /*@ngInject*/ ["$q", "specificValues", function($q, specificValues) {

    function formatQuery(text) {
        return encodeURIComponent(text).replace(/%20/g, '+');
    }

    class Suggest {
        constructor(source) {
            this._type = source.type || 'suggest';
            this._text = source.text || '';
            this._query = source.query;
            this._selected = source.selected || false;

            this._params = {
                fr2: source.isQuery ? 'query' : 'suggest',
                q: formatQuery(this._text)
            };
        }

        get type() {
            return this._type;
        }

        get text() {
            return this._text;
        }

        set text(newText) {
            this._text = newText;
            this._params.q = formatQuery(newText);
        }

        get selected() {
            return this._selected;
        }

        set selected(selected) {
            this._selected = selected;
        }

        get query() {
            return this._query;
        }

        getParams() {
            const gp = specificValues.getValue('RFR_VALUE');
            const fr = specificValues.getValue('FR_VALUE');
            const fr3 = specificValues.getValue('FR3_VALUE');

            const params = this._params;

            if (gp) {
                params.gp = gp;
            }

            if (fr) {
                params.fr = fr;
            }

            if (fr3) {
                params.fr3 = fr3;
            }

            const paramsStr = Object.keys(params).reduce((prev, currKey) => {
                return `${prev + currKey}=${params[currKey]}&`;
            }, '');

            return paramsStr.slice(0, -1);
        }

        getUrl() {
            return 'https://go.mail.ru/search?' + this.getParams();
        }

    }

    return Suggest;
}];
},{"../../../common/factory/localstorage-factory":236}],149:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    class Suggests {
        constructor(source) {
            this._items = source.items || [];
            if (this._items.length > 0) {
                this._items[0].selected = true;
            }
        }

        get selectedIndex() {
            return this._items.findIndex(item => item.selected);
        }

        get length() {
            return this._items.length;
        }

        getItem(index) {
            return this._items[index];
        }

        getAllItems() {
            return this._items;
        }

        selectItem(index) {
            this._items[this.selectedIndex].selected = false;
            this._items[index].selected = true;
        }

    }

    return Suggests;
};

},{}],150:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    var focusElements = {};

    return {
        clearFocus: function(id) {
            if (!this.has(id)) {
                throw new Error('No element is registered under this id:', id);
            }

            var el = focusElements[id];
            el.blur();
        },
        focus: function(id) {
            if (!this.has(id)) {
                throw new Error('No element is registered under this id:', id);
            }

            var el = focusElements[id];
            el.focus();
        },
        has: function(id) {
            return focusElements.hasOwnProperty(id);
        },
        register: function(id, element) {
            if (focusElements.hasOwnProperty(id)) {
                throw new Error('Another element has already been registered under this id:', id);
            }

            focusElements[id] = element;
        },
        unregister: function(id) {
            focusElements[id] = null;
            delete focusElements[id];
        }
    };
};
},{}],151:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "$chrome", function($q, $chrome) {
    return {
        getRecentSites: () => {
            return $q(resolve => {
                resolve([]);
                // FIREFOX not supports this
                //$chrome.topSites.get(results => resolve(results));
            });
        }
    };
}];
},{}],152:[function(require,module,exports){
"use strict";

var SiteArrayBuilder = require('../../../common/utils/site-array-builder');
var strings = require('../../../common/utils/strings');

module.exports = /*@ngInject*/ ["$q", "suggestsService", "siteSerializer", "urlUtils", "messagingService", function($q, suggestsService, siteSerializer, urlUtils, messagingService) {

    function filterSitesByUrl(sites, url) {
        return sites
            .filter(function(site) {
                return site.hostname && site.hostname.includes(url);
            })
            .map(function(site) {
                site.similarity = strings.score(site.hostname, url, 1);
                return site;
            })
            .sort(function(a, b) {
                return a.similarity >= b.similarity ? -1 : 1;
            });
    }



    function suggest(url) {
        return suggestsService
            .request(url)
            .then(convertSuggestedSites)
            .catch(function() {
                return [];
            });
    }

    function searchPredefined(url) {
        return $q.when(filterSitesByUrl(recommendedSites, url));
    }

    function convertSuggestedSites(response) {
        var converted = (response.sites || [ ]).map(function(item) {
            return {
                type: 'site',
                title: item.desc,
                url: item.link
            };
        });

        return siteSerializer.deserialize(converted);
    }

    function search(url) {
        return suggest(url).then(function(suggestedResults) {
            return searchPredefined(url)
                .then(function(jsonResults) {
                    return new SiteArrayBuilder()
                        .setSource(suggestedResults)
                        .filterSiteList(jsonResults)
                        .prepend(jsonResults)
                        .build();
                });
        });
    }

    var recommendedSites;

    return {
        getRecommendedSites: function() {
            if (recommendedSites) {
                return Promise.resolve(recommendedSites);
            }

            return messagingService.send({type: 'get_all_recommendations'}).then(function(results) {
                recommendedSites = siteSerializer.deserialize(results);
                return recommendedSites;
            });
        },
        removeFromRecommends: function(site) {
            var siteIndex = recommendedSites.findIndex(function(recSite) {
                return recSite.url === site.url;
            });
            if (siteIndex !== -1) {
                recommendedSites.splice(siteIndex, 1);
            }
        },
        clear: function() {
            recommendedSites = undefined;
        },
        search: search,
        searchPredefined: function(pattern) {
            return searchPredefined(pattern);
        }
    };
}];

},{"../../../common/utils/site-array-builder":282,"../../../common/utils/strings":283}],153:[function(require,module,exports){
"use strict";

const strings = require('../../../common/utils/strings');
const arrayUtils = require('../../../common/utils/array');

module.exports = /*@ngInject*/ ["$q", "$cacheFactory", "tileFactory", "suggestsService", "siteSerializer", "urlUtils", "messagingService", function($q, $cacheFactory, tileFactory, suggestsService, siteSerializer, urlUtils, messagingService) {

    const KEY = 'predefined';
    const cache = $cacheFactory('predefined_cache');

    function suggest(url) {
        return suggestsService
            .request(url)
            .then(convertSuggestedSites)
            .catch(function() {
                return [];
            });
    }

    function convertSuggestedSites(response) {
        var converted = (response.sites || [ ]).map(item => {
            return { type: 'site', title: item.desc, url: item.link };
        });

        return siteSerializer.deserialize(converted);
    }

    function getPredefinedSites() {
        let predefined = cache.get(KEY);

        if (predefined) {
            return $q.when(predefined);
        }

        return messagingService.send({ type: 'get_all_recommendations' })
            .then(results => {
                predefined = siteSerializer.deserialize(results);

                cache.put(KEY, predefined);
                return predefined;
            });
    }

    function searchPredefined(term) {
        return getPredefinedSites().then(predefined => {
            return predefined
                .filter(item => item.hostname && item.hostname.includes(term))
                .map(item => {
                    item.similarity = strings.score(item.hostname, term, 1);
                    return item;
                })
                .sort((a, b) => a.similarity >= b.similarity ? -1 : 1);
        });
    }

    return {
        search: function(term) {
            return $q.all([
                suggest(term),
                searchPredefined(term)
            ]).then(results => {
                return results[0].concat(results[1]);
            }).then(results => {
                if (urlUtils.isValidUrl(term)) {
                    return [
                        tileFactory.create({
                            type: 'site',
                            url: urlUtils.createCorrectUrl(term)
                        })
                    ].concat(results);
                }

                return results;
            }).then(results => {
                return results.sort((a, b) => {
                    return a.url < b.url; // HACK Sort results so that https sites go first
                });
            }).then(results => {
                return arrayUtils.uniq(results, item => urlUtils.stripHttpHttps(urlUtils.normalize(item.url)));
            });
        }
    };
}];
},{"../../../common/utils/array":271,"../../../common/utils/strings":283}],154:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "$cacheFactory", "siteSerializer", "messagingService", function($q, $cacheFactory, siteSerializer, messagingService) {
    function TileStorage(key) {
        this.__key = key;
        this.__cache = $cacheFactory(key);
    }

    TileStorage.prototype = {
        get: function() {
            var self = this;

            var cachedResult = self.__cache.get(self.__key);

            if (cachedResult) {
                return $q.when(cachedResult);
            }

            return messagingService
                .send({ type: this.__key })
                .then(function (data) {
                    return siteSerializer.deserialize(data || []);
                })
                .then(function(data) {
                    self.__cache.put(self.__key, data);
                    return data;
                });
        }
    };

    return {
        create: function(key) {
            return new TileStorage(key);
        }
    };
}];
},{}],155:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["messagingService", function(messagingService) {
    return {
        getWidgets: () => {
            return messagingService.send({ type: 'widgets' });
        }
    };
}];
},{}],156:[function(require,module,exports){
module.exports = /*@ngInject*/ ["messagingService", function(messagingService) {
    function isAuthorized(enableAutoLogin) {
        return messagingService.send({ type: 'auth:is_authorized', skipAutoLogin: (enableAutoLogin !== true) });
    }

    function showLogin() {
        return messagingService.send({ type: 'auth:show_login' });
    }

    function login() {
        return messagingService.send({ type: 'auth:login' });
    }

    function logout() {
        return messagingService.send({ type: 'auth:logout' });
    }

    function getCurrentUser() {
        return messagingService.send({ type: 'auth:get_current_user' });
    }

    function getGifts() {
        return messagingService.send({ type: 'auth:get_gifts' });
    }

    function getStreams() {
        return messagingService.send({ type: 'auth:get_streams' });
    }

    function getShowcases() {
        return messagingService.send({ type: 'auth:get_showcases' });
    }

    function getUserById(id) {
        return messagingService.send({ type: 'auth:get_user_by_id', id: id }).then(data => data[0]);
    }

    function getNotifications(tileType) {
        return messagingService.send({ type: 'auth:get_notifications', tileType: tileType });
    }

    return {
        showLogin,
        isAuthorized,
        login,
        logout,
        getCurrentUser,
        getGifts,
        getStreams,
        getShowcases,
        getNotifications,
        getUserById
    };
}];

},{}],157:[function(require,module,exports){
"use strict";

const tileConstants = require('../../../common/models/tile-constants');
const arrayUtils = require('../../../common/utils/array');
const guid = require('./../../../common/utils/guid');

module.exports = /*@ngInject*/ ["$rootScope", "messagingService", "BoardsList", "$q", "$timeout", "metricService", "boardsSettingsService", function($rootScope, messagingService, BoardsList, $q, $timeout, metricService, boardsSettingsService) {
    let boardsList = { isEmpty: true };
    let loaded = false;

    return {
        get loaded() {
            return loaded;
        },

        get boardsList() {
            return boardsList;
        },

        load() {
            return messagingService.send({ type: 'get_boards' }).then(response => {
                boardsSettingsService.init(response);
                boardsList = new BoardsList(response);
                loaded = true;

                return boardsList;
            });
        },

        sync(noReply) {
            boardsList.removeEmptyBoards();

            if (!noReply) {
                $rootScope.$emit('boards:update');
            }

            return messagingService.send({
                type: 'save_boards',
                boards: boardsList.serializeBoards(),
                noReply: noReply ? true : false
            });
        },

        syncSettings() {
            return messagingService.send({ type: 'save_boards_settings', settings: boardsList.settings });
        },

        choose(index, withMetric) {
            boardsSettingsService.setActiveBoardIndex(index, boardsList.boardsCount).then(() => {
                if (withMetric) {
                    metricService.send('switch', [
                        boardsList.activeBoardTilesCount,
                        boardsList.boardsCount,
                        boardsSettingsService.activeBoardIndex
                    ]);
                }
            });

            $rootScope.$emit('boards:update');
        },

        chooseNext() {
            return boardsSettingsService.activeBoardIndex >= boardsList.boardsCount - 1 ? this.choose(0, true) : this.choose(boardsSettingsService.activeBoardIndex + 1, true);
        },

        choosePrev() {
            return boardsSettingsService.activeBoardIndex <= 0 ? this.choose(boardsList.boardsCount - 1, true) : this.choose(boardsSettingsService.activeBoardIndex - 1, true);
        },

        addMultipleTiles(tiles) {
            let addedCount = 0;
            const addId = guid();

            tiles.forEach(tile => {
                const isAdded = this.addTile(tile);
                if (isAdded) {
                    addedCount++;

                    metricService.send('tile_added', [
                        tile.url,
                        boardsSettingsService.activeBoardIndex,
                        addId
                    ]);
                }
            });

            return addedCount > 0;
        },

        addTile(tile, options) {
            const isAdded = boardsList.addTile(tile, options);

            if (isAdded) {
                $rootScope.$emit('grid:add');
            }

            return isAdded;
        },

        addTileSilently(tile) {
            const isAdded = this.addTile(tile);

            if (isAdded) {
                messagingService.send({
                    type: 'save_boards',
                    boards: boardsList.serializeBoards(),
                    silently: true
                });
            }

            return isAdded;
        },

        restoreTile(tileInfo) {
            if (tileInfo.wasLastOnBoard) {
                boardsList.addBoards([{ }], tileInfo.boardIndex);
            }

            boardsSettingsService.setActiveBoardIndex(tileInfo.boardIndex, boardsList.boardsCount);

            return this.addTile(tileInfo.tile, {
                tileIndex: tileInfo.tileIndex,
                boardIndex: tileInfo.boardIndex
            });
        },

        removeTile(tile) {
            const activeBoard = boardsList.activeBoard;
            const tileIndex = activeBoard.indexOf(tile);
            const boardIndex = boardsSettingsService.activeBoardIndex;

            activeBoard.remove(tile);

            const wasLastOnBoard = activeBoard.isEmpty ? true : false;

            $rootScope.$emit('grid:remove', { tile, tileIndex, boardIndex, wasLastOnBoard });
        },

        moveTile(oldIndex, newIndex, from, to) {
            const movedTile = boardsList.getBoard(from).cutByIndex(oldIndex);
            if (!movedTile) {
                return false;
            }

            return this.addTile(movedTile, { boardIndex: to, tileIndex: newIndex });
        },

        moveTileToBoardWithFreeSpace(oldTileIndex, oldBoardIndex, direction) {
            const boardWithFreeSpaceIndex = direction === 'next' ?
                boardsList.findBoardWithFreeSpaceOnTheRight() :
                boardsList.findBoardWithFreeSpaceOnTheLeft();

            const newBoardIndex = boardWithFreeSpaceIndex !== undefined ?
                boardWithFreeSpaceIndex :
                boardsSettingsService.activeBoardIndex;

            const newBoard = boardsList.getBoard(newBoardIndex);
            const newTileIndex = newBoard ? newBoard.tilesCount : 0;
            const moved = this.moveTile(oldTileIndex, newTileIndex, oldBoardIndex, newBoardIndex);

            return moved ? { newTileIndex, newBoardIndex } : undefined;
        },

        findTileInfo(src) {
            const boardIndex = boardsList.findBoardIndex(board => board.findTileBySource(src));

            if (boardIndex === -1) {
                return undefined;
            }

            const tile = boardsList.getBoard(boardIndex).findTileBySource(src);

            return {
                boardIndex,
                tileId: tile.id
            };
        },

        filterSites(sites) {
            return boardsList.reduce((prev, board) => board.filterSites(prev), sites);
        },

        removeDraggingOptions() {
            // HACK - to prevent animating beetwen sizeFix and normal state,
            // first remove sizeFix, then (in the next digest cycle) other drag options
            boardsList
                .getAllTiles()
                .forEach(tile => tile.dragOptions.sizeFix = false);

            $timeout(function() {
                boardsList
                    .getAllTiles()
                    .forEach(tile => tile.dragOptions = { });
            });
        }
    };
}];
},{"../../../common/models/tile-constants":258,"../../../common/utils/array":271,"./../../../common/utils/guid":277}],158:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    // Новая логика оставлена до лучших времен
    //return {
    //    convertIndex(index, total, max) {
    //        return max - Math.min(total, max) + index;
    //    },
    //    calculateMediumBoxCount(total, max) {
    //        return (total - max) * 3;
    //    },
    //    calculateSmallBoxCount(total, max) {
    //        return (total - max) * 2;
    //    },
    //    calculateLargePosition(index) {
    //        return { row: Math.floor(index / 4), col: index % 4 };
    //    },
    //    calculateMediumPosition(index) {
    //        return { row: Math.floor(index / 4), col: index % 4 };
    //    },
    //    calculateSmallPosition(index) {
    //        return { row: Math.floor(index / 8), col: index % 8 };
    //    },
    //    calculatePositionByMode(mode, index) {
    //        switch(mode) {
    //            case 'small':
    //                return this.calculateSmallPosition(index);
    //            case 'medium':
    //                return this.calculateMediumPosition(index);
    //            case 'large':
    //                return this.calculateLargePosition(index);
    //        }
    //    }
    //};

    return {
        convertIndex: function (index, total, max) {
            return max - Math.min(total, max) + index;
        },
        calculateMediumBoxCount: function (total, max) {
            return (total - max) * 3;
        },
        calculateSmallBoxCount: function (total, max) {
            return (total - max) * 2;
        },
        calculateLargePosition: function (index) {
            return { row: (index % 2), col: Math.floor(index / 2) };
        },
        calculateMediumPosition: function (index) {
            return { row: (index % 3), col: Math.floor(index / 3) };
        },
        calculateSmallPosition: function (index) {
            var row = Math.floor((index % 6) / 2);
            var col = (index % 2) + 2 * (Math.floor(index / 6));

            return {
                row: row,
                col: col
            };
        }
    };
};
},{}],159:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    var enabled = true;

    return {
        get enabled() {
            return enabled;
        },
        enable: function() {
            enabled = true;
        },
        disable: function() {
            enabled = false;
        }
    };
};

},{}],160:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    var configMap = { };

    this.configMap = function(map) {
        configMap = map;
    };

    this.$get = [ '$window', function($window) {
        return {
            getConfig: function() {
                var matchedSize;

                for (var size in configMap) {
                    if (configMap.hasOwnProperty(size) && $window.matchMedia(size).matches) {
                        matchedSize = configMap[size];
                    }
                }

                if (matchedSize === undefined) {
                    matchedSize = configMap[Object.keys(configMap)[0]];
                }

                return matchedSize;
            }
        };
    } ];
};
},{}],161:[function(require,module,exports){
"use strict";

const tilesModes = require('./../../../common/constants/tiles-modes');

module.exports = /*@ngInject*/ ["$window", "tileLayoutConfig", "gridUtils", "boardsSettingsService", function($window, tileLayoutConfig, gridUtils, boardsSettingsService) {
    return {
        getOptions(index, total) {
            const MAX_LARGE_COUNT = tilesModes.large.maxCount;
            const MAX_MEDIUM_COUNT = tilesModes.medium.maxCount;
            const MAX_SMALL_COUNT = tilesModes.small.maxCount;
            const PADDING = 10;

            const config = tileLayoutConfig.getConfig();
            const mode = boardsSettingsService.currentMode;
            const mixMode = boardsSettingsService.currentMode === tilesModes.mix.name;

            function multiplyPositionBy(source, rowSpan, colSpan, padding) {
                return {
                    row: source.row * rowSpan + padding * source.row,
                    col: source.col * colSpan + padding * source.col
                };
            }

            function createLgBox(index) {
                var defaultPosition = gridUtils.calculateLargePosition(index);

                return {
                    cls: 'large',
                    size: config.large,
                    position: multiplyPositionBy(defaultPosition, config.large.height, config.large.width, PADDING)
                };
            }

            function createMdBox(index, total) {
                var defaultPosition = gridUtils.calculateMediumPosition(
                    gridUtils.convertIndex(index, total, MAX_MEDIUM_COUNT)
                );
                //var defaultPosition = gridUtils.calculateMediumPosition(index);

                return {
                    cls: 'medium',
                    size: config.medium,
                    position: multiplyPositionBy(defaultPosition, config.medium.height, config.medium.width, PADDING)
                };
            }

            function createSmBox(index, total) {
                var defaultPosition = gridUtils.calculateSmallPosition(
                    gridUtils.convertIndex(index, total, MAX_SMALL_COUNT)
                );

                return {
                    cls: 'small',
                    size: config.small,
                    position: multiplyPositionBy(defaultPosition, config.small.height, config.small.width, PADDING)
                };
            }

            function createBox(index) {
                var defaultPosition = gridUtils.calculatePositionByMode(mode, index);
                const modeConfig = config[mode];

                return {
                    cls: mode,
                    size: modeConfig,
                    position: multiplyPositionBy(defaultPosition, modeConfig.height, modeConfig.width, PADDING)
                };
            }

            if (!mixMode) {
                return createBox(index);
            }

            if (total < MAX_LARGE_COUNT) {
                return createLgBox(index);
            }

            //if (total <= MAX_MEDIUM_COUNT) {
            //    return createMdBox(index, total);
            //}

            if (total < MAX_MEDIUM_COUNT) {
                var mediumCount = gridUtils.calculateMediumBoxCount(total, MAX_LARGE_COUNT);

                if (index < (total - mediumCount)) {
                    return createLgBox(index);
                }

                return createMdBox(index, total);
            }

            var smallCount = gridUtils.calculateSmallBoxCount(total, MAX_MEDIUM_COUNT);

            if (index < (total - smallCount)) {
                return createMdBox(index, total);
            }

            return createSmBox(index, total);
        }
    };
}];
},{"./../../../common/constants/tiles-modes":234}],162:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["TileDragging", function(TileDragging) {
    return {
        create: function (type) {
            var draggingModel;

            switch (type) {
                case 'tile':
                    draggingModel = new TileDragging();
                    break;
            }

            return draggingModel;
        }
    };
}];
},{}],163:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$timeout", "dragModelFactory", function($timeout, dragModelFactory) {

    const dragOverSilenceDuration = 200;
    let dragging = false;
    let dragOverEnabled = true;
    let dragX;
    let dragOverTimeout;
    let draggingItemType;
    let dragData = { };
    let draggingModel;

    return {
        get dragging() {
            return dragging;
        },

        get isDragOverEnabled() {
            return dragOverEnabled;
        },

        get dragType() {
            return draggingItemType;
        },

        get dragData() {
            return dragData;
        },

        get dragX() {
            return dragX;
        },

        set dragX(x) {
            draggingModel.onDragXChange(x, dragX);
            dragX = x;
        },

        setDragData(data) {
            dragData = Object.assign({}, dragData, data);
        },

        off() {
            dragging = false;
            dragX = undefined;
            draggingModel.onDragFinished(dragData);
        },

        on(type, data) {
            dragging = true;
            draggingItemType = type;
            dragData = data;
            draggingModel = dragModelFactory.create(type);
        },

        enableDragOver() {
            dragOverEnabled = true;
        },

        disableDragOver(timeout) {
            dragOverEnabled = false;

            $timeout.cancel(dragOverTimeout);

            dragOverTimeout = $timeout(() => {
                dragOverEnabled = true;
            }, timeout || dragOverSilenceDuration);
        }
    };
}];
},{}],164:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["DragZone", function(DragZone) {

    var MAX_ZONE_SIZE = 150;

    function createLeftZone() {
        return new DragZone({
            zoneSelector: '.drag-zone:first-child',
            svgSelector: '.drag-zone:first-child > .drag-slider',
            path: 'M 0 0 h 0 C 0 290 150 350 150 500 C 150 650 0 710 0 1000 h 0 v -1000',
            gradient: 'l(0, 0.5, 1, 0.5)rgba(0,0,0,.5)-rgba(170,170,170,.15)',
            endingPath: 'M 0 0 h 150 C 150 290 150 350 150 500 S 150 710 150 1000 h -150 v -1000',
            calculateGradient: function(x) {
                var factor = (0.8 - 0.6*x/window.innerWidth);
                var leftEdgeOpacity = factor;
                var rightEdgeOpacity = 0.3*factor;
                return 'l(0, 0.5, 1, 0.5)rgba(0,0,0,' + leftEdgeOpacity + ')-rgba(0,0,0,' + rightEdgeOpacity + ')';
            },
            endingCondition: function(x) {
                return x <= MAX_ZONE_SIZE;
            },
            calculateZoneSize: function(x) {
                var windowWidth = window.innerWidth;
                return Math.floor( MAX_ZONE_SIZE*(1/3*MAX_ZONE_SIZE + 2/3*x - 1/2*windowWidth) /
                (MAX_ZONE_SIZE - 1/2*windowWidth) );
            }
        });
    }

    function createRightZone() {
        return new DragZone({
            zoneSelector: '.drag-zone:last-child',
            svgSelector: '.drag-zone:last-child > .drag-slider',
            path: 'M 150 0 h 0 C 150 290 0 350 0 500 C 0 650 150 710 150 1000 h 0 v -1000',
            gradient: 'l(0, 0.5, 1, 0.5)rgba(170,170,170,.15)-rgba(0,0,0,.5)',
            endingPath: 'M 150 0 h -150 C 0 290 0 350 0 500 S 0 710 0 1000 h 150 v -1000',
            calculateGradient: function(x) {
                var factor = (0.2 + 0.6*x/window.innerWidth);
                var leftEdgeOpacity = 0.3*factor;
                var rightEdgeOpacity = factor;
                return 'l(0, 0.5, 1, 0.5)rgba(0,0,0,' + leftEdgeOpacity + ')-rgba(0,0,0,' + rightEdgeOpacity + ')';
            },
            endingCondition: function(x) {
                return window.innerWidth - x <= MAX_ZONE_SIZE;
            },
            calculateZoneSize: function(x) {
                var windowWidth = window.innerWidth;
                return Math.floor( MAX_ZONE_SIZE*(1/6*windowWidth + 1/3*MAX_ZONE_SIZE - 2/3*x) /
                (MAX_ZONE_SIZE - 1/2*windowWidth) );
            }
        });
    }

    return {
        create: function (type) {
            var zone;

            switch (type) {
                case 'left':
                    zone = createLeftZone();
                    break;
                case 'right':
                    zone = createRightZone();
                    break;
                default:
                    zone = createLeftZone();
            }

            return zone;
        }
    };
}];
},{}],165:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["GuideType", "BaseGuide", "HintGuide", "OnboardingGuide", function(GuideType, BaseGuide, HintGuide, OnboardingGuide) {
    return {
        create: function (source) {
            var guide;

            switch (source.type) {
                case GuideType.HINT:
                    guide = new HintGuide(source);
                    break;
                case GuideType.ONBOARDING:
                    guide = new OnboardingGuide(source);
                    break;
                default:
                    guide = new BaseGuide(source);
            }

            return guide;
        }
    };
}];
},{}],166:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["GuideRuleType", "CountRule", "TimeRule", function(GuideRuleType, CountRule, TimeRule) {
    return {
        create: function (source) {
            var rule;

            switch (source.type) {
                case GuideRuleType.COUNT:
                    rule = new CountRule(source);
                    break;
                case GuideRuleType.TIME:
                    rule = new TimeRule(source);
                    break;
                default:
                    rule = new CountRule(source);
            }

            return rule;
        }
    };
}];
},{}],167:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["guideFactory", function(guideFactory) {
    return {
        deserialize: function(hints) {
            return hints.map(function(hintJson) {
                return guideFactory.create(hintJson);
            });
        },
        serialize: function(hints) {
            return hints.map(function(hintInstance) {
                return hintInstance.json();
            });
        }
    };
}];
},{}],168:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["messagingService", "hintSerializer", function(messagingService, hintSerializer) {
    let hints = [];
    let activeHint;

    return {
        get hints() {
            return hints;
        },

        get hintDisplayed() {
            return activeHint && activeHint.visible;
        },

        handleAction(hint, eventType) {
            switch (eventType) {
                case 'show':
                    if (!(this.hintDisplayed)) {
                        const actionExecuted = hint.show();

                        if (actionExecuted) {
                            activeHint = hint;
                        }
                    }
                    break;
                case 'disable':
                    hint.disable();
                    break;
                case 'enable':
                    hint.enable();
                    break;
            }

            this.sync();
        },

        load() {
            return messagingService.send({type: 'get_hints'}).then(response => {
                hints = hintSerializer.deserialize(response.hints || []);
                return hints;
            });
        },

        sync() {
            return messagingService.send({type: 'save_hints', hints: hintSerializer.serialize(hints)});
        }
    };
}];
},{}],169:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["guideFactory", "GuideType", "localizeFilter", function(guideFactory, GuideType, localizeFilter) {
    var guides = [ //TODO - refactor onboarding source
        {
            type: GuideType.ONBOARDING,
            selector: 'footer menu',
            positioningMode: 'left',
            shift: {
                left: {
                    value: -30,
                    unit: '%'
                },
                top: {
                    value: -70,
                    unit: '%'
                }
            },
            className: 'menu-guide',
            description: localizeFilter('onboarding_title'),
            helpTitle: localizeFilter('onboarding_quickAccessMenu'),
            helpText: localizeFilter('onboarding_oneClickMenu'),
            imgUrl: '/img/onboarding/menu.png'
        },
        {
            type: GuideType.ONBOARDING,
            selector: '.search',
            positioningMode: 'right',
            shift: {
                left: {
                    value: -150,
                    unit: '%'
                },
                top: {
                    value: -35,
                    unit: '%'
                }
            },
            className: 'search-guide',
            description: localizeFilter('onboarding_internetSearch'),
            helpTitle: localizeFilter('onboarding_fastSearch'),
            helpText: localizeFilter('onboarding_internetSearchHelp'),
            imgUrl: '/img/onboarding/search.png'
        },
        {
            type: GuideType.ONBOARDING,
            selector: '.grid',
            positioningMode: 'right-bottom',
            shift: {
                left: {
                    value: 40,
                    unit: '%'
                },
                top: {
                    value: -50,
                    unit: '%'
                }
            },
            className: 'adding-guide',
            description: localizeFilter('onboarding_addFavoriteSites'),
            helpTitle: localizeFilter('onboarding_favoriteSites'),
            helpText: localizeFilter('onboarding_userSitesFastInternet'),
            imgUrl: '/img/onboarding/adding.png'
        }
    ];

    return {
        createGuides: function () {
            return guides.map(function(guideSource) {
                return guideFactory.create(guideSource);
            });
        }
    };
}];
},{}],170:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$window", "$http", "onboardingGuidesCreator", "urlParamsService", "messagingService", "overlayService", "extensionInfo", "localizeFilter", function($window, $http, onboardingGuidesCreator, urlParamsService, messagingService,
                                        overlayService, extensionInfo, localizeFilter) {
    let visible = false;
    const predefinedSlides = [
        {
            type: 'themes',
            title: localizeFilter('onboarding_chooseBackgroundTitle'),
            description: localizeFilter('onboarding_chooseBackgroundDescription'),
            actionText: localizeFilter('onboarding_continue')
        },
        {
            type: 'tiles',
            title: localizeFilter('onboarding_addSitesTitle'),
            description: localizeFilter('onboarding_addSitesDescription'),
            actionText: localizeFilter('onboarding_add')
        }
    ];
    const slots = {
        main: '47044',
        test: '47045'
    };

    function loadSlides() {
        const currentSlot = $window.testPromo ? slots.test : slots.main;

        return $http({
            method: 'GET',
            cache: true,
            url: `http://ad.mail.ru/adi/${currentSlot}?extid=${extensionInfo.extensionId}&version=${extensionInfo.version}&rnd=` + Date.now().toString()
        }).then(response => {
            console.log('ONBOARDING RESPONSE', response);
            const data = response.data;
            const slides = Array.isArray(data.slides) ? data.slides.slice() : [];

            slides.forEach(slide => {
                const predefinedSlide = predefinedSlides.find(prSlide => prSlide.type === slide.type);

                if (predefinedSlide) {
                    Object.assign(slide, predefinedSlide);
                }
            });

            return slides;
        }).catch(() => {
            return [ ];
        });
    }

    return {
        get visible() {
            return visible;
        },
        getSlides() {
            return loadSlides();
        },
        checkIfShouldOpen: function() {
            return messagingService.send({type: 'check_onboarding_is_required'}).then(function(isRequired) {
                if (isRequired || urlParamsService.getParam('onboarding') === 'true') {

                    visible = true;
                    overlayService.show('onboarding');
                } else {
                    visible = false;
                }
                return visible;
            });
        },
        close: function() {
            visible = false;
            overlayService.hide('onboarding');
        }
    };
}];
},{}],171:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$http", "messagingService", function($http, messagingService) {
    return {
        send: function(metric, params) {
            return messagingService.send({ type: 'send_metric', metric: metric, params: params });
        },
        fetchRbPixel: function(bannerId) {
            return $http.get(`http://rs.mail.ru/g${bannerId}.gif`);
        }
    };
}];
},{}],172:[function(require,module,exports){
module.exports = /*@ngInject*/ ["$http", "messagingService", function($http, messagingService) {
    const API_URL = 'https://likemore-fe.go.mail.ru/';

    return {
        request: function(cid, referer) {
            return $http.get(`${API_URL}?cid=${cid}&n=1&referer=${encodeURIComponent(referer)}`)
                .then(response => response.data)
                .then(response => {
                    if (response.error_code !== 0) {
                        throw new Error('Ошибка ' + response.error_code);
                    }
                    if (response.list.length === 0) {
                        throw new Error('Нет рекомендаций');
                    }
                    return response;
                })
                .then(response => {
                    const content = response.list[0].content;
                    const wshow = response.pxt.find(item => item.hasOwnProperty('wshow'));
                    const wclick = content.pxt.find(item => item.hasOwnProperty('wclick'));
                    return {
                        url: content.url,
                        text: content.title,
                        image: content.preview.url,
                        wshow: wshow.wshow,
                        wclick: wclick.wclick
                    };
                });
        },
        setInversion(cid, inverted) {
            const params = {
                type: 'set_mywidget_status',
                cid: cid,
                inverted: inverted,
                date: Date.now()
            };
            return messagingService
                .send(params);
        },
        checkInversion(cid, initialStatus, intervalInHours) {
            const params = { type: 'get_mywidget_status', initialStatus: initialStatus, cid: cid };
            return messagingService.send(params)
                .then((result) => {
                    const diff = (Date.now() - result.date) / (1000 * 60 * 60);
                    return {
                        inverted: result.inverted,
                        needsInversion: diff > intervalInHours
                    };
                });
        },
        fetchPxt(url) {
            return $http.get(url);
        }
    };
}];
},{}],173:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["messagingService", function(messagingService) {
    return {
        isFirstOpening() {
            return messagingService.send({type: 'is_first_opening'});
        },
        getLastInstalledPresetInfo() {
          return messagingService.send({type: 'get_last_installed_preset_info'});
        }
    };
}];

},{}],174:[function(require,module,exports){
"use strict";

const presetsDialogOpeners = require('./../../../common/constants/presets-dialog-openers');

module.exports = /*@ngInject*/ ["$rootScope", "presetsService", "boardsService", "urlParamsService", "messagingService", "ngDialog", "metricService", function($rootScope, presetsService, boardsService, urlParamsService, messagingService, ngDialog, metricService) {
    const PRESET_ID = 'presetid';

    function open(presetId, openedBy) {
        return presetsService.getPresetInfo(presetId).then(presetInfo => {
            if (presetInfo) {
                const scope = $rootScope.$new();
                scope.presetInfo = presetInfo;

                let presetsDialog = ngDialog.open({
                    template: `<presets-dialog></presets-dialog>`,
                    plain: true,
                    className: 'presets-dialog',
                    appendTo: 'body',
                    scope
                });

                metricService.send('preset_dialog_show', [presetId, openedBy]);

                presetsDialog.closePromise.then(data => {
                    let ok = 0;

                    if (data.value === 'ok') {
                        ok = 1;
                        presetsService.addPreset(presetId);
                        ngDialog.closeAll();
                    }

                    metricService.send('preset_dialog_close', [presetId, ok, openedBy]);

                    scope.$destroy();
                    urlParamsService.removeParam(PRESET_ID);
                });
            }
        });
    }

    function checkIfpageWithPresetDialog() {
        const presetId = urlParamsService.getParam(PRESET_ID);

        if (presetId) {
            open(presetId, presetsDialogOpeners.URL);
        }
    }

    return {
        open,
        init: checkIfpageWithPresetDialog
    };
}];
},{"./../../../common/constants/presets-dialog-openers":231}],175:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["messagingService", function(messagingService) {
    let presets = null;
    let categories = null;
    let haveUpdates = false;

    function load() {
        return messagingService.send({ type: 'get_presets_data' }).then(data => {
            presets = data.presets;
            categories = data.categories;
            haveUpdates = data.haveUpdates;
        });
    }

    return {
        // presets that should be displayed in collections dialog
        get presets() {
            return presets.filter(preset => {
                return categories.some(category => category.presets.includes(preset.id));
            });
        },

        get allPresets() {
            return presets;
        },

        get categories() {
            return categories.map(category => {
                return {
                    name: category.name,
                    text: category.text
                };
            });
        },

        haveUpdates() {
            return haveUpdates;
        },

        load,

        getPresetsByCategory(categoryName) {
            const category = categories.find(ctgry => ctgry.name === categoryName);

            if (category) {
                return presets.filter(preset => category.presets.includes(preset.id));
            }

            return [];
        },

        addPreset(presetId) {
            return messagingService.send({ type: 'apply_preset', presetId });
        },

        getPresetInfo(presetId) {
            if (Array.isArray(presets)) {
                const presetInfo = presets.find(preset => preset.id === presetId);

                if (presetInfo) {
                    return Promise.resolve(presetInfo);
                }
            }

            return messagingService.send({ type: 'get_preset_info', presetId });
        },

        markPresetsVisited() {
            haveUpdates = false;
            return messagingService.send({ type: 'mark_presets_visited' });
        }
    };
}];
},{}],176:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$window", function($window) {
    return {
        evaluate: function(expression) {
            var solution;

            try {
                solution = $window.Parser.evaluate(expression);
            } catch (e) {
                return null;
            }

            if (Number.isNaN(parseFloat(solution))) {
                return null;
            }

            return Number(solution);
        }
    };
}];
},{}],177:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$http", "specificValues", function($http, specificValues) {
    const EXAMPLE_URL = 'http://ad.mail.ru/adi/63767?_SITEZONE=1';

    return {
        getExample() {
            let fullUrl = EXAMPLE_URL;

            return specificValues.getValueAsync('RFR_VALUE').then(fr => {
                if (fr) {
                    fullUrl += `&fr=${fr}`;
                }

                return $http.get(fullUrl).then(response => {
                    const data = response.data;

                    const range = document.createRange();
                    range.selectNode(document.body);
                    const el = range.createContextualFragment(data).querySelector('a');

                    return el ? {
                        link: el.href,
                        text: el.textContent
                    } : null;
                });
            });
        }
    };
}];

},{}],178:[function(require,module,exports){
"use strict";
var strings = require('../../../common/utils/strings');

module.exports = /*@ngInject*/ ["tileStorageFactory", "tileFactory", function(tileStorageFactory, tileFactory) {
    function isNotEmpty(query) {
        return query !== undefined && query !== null && query !== '' && query !== ' ';
    }

    function isLongerThan(query, num) {
        return query.length > num;
    }

    function filterSitesByQuery(sites, query, limit) {
        var lowercasedQuery = query.toLowerCase();
        return sites
            .filter(function(site) {
                return site.url && (site.url.toLowerCase().includes(lowercasedQuery) || site.title.toLowerCase().includes(lowercasedQuery));
            })
            .map(function(site) {
                site.similarity = Math.max(strings.score(site.url, query, 1), strings.score(site.title, query, 1));
                return site;
            })
            .sort(function(a, b) {
                return a.similarity >= b.similarity ? -1 : 1;
            })
            .slice(0, limit);
    }

    var favorites = tileStorageFactory.create('favorites');

    return {
        getFavoritesByQuery: function(query) {
            return favorites.get().then(function(sites) {
                if (!isNotEmpty(query) || !isLongerThan(query, 2)) {
                    return [];
                }

                return filterSitesByQuery(sites, query, 4);
            });
        }
    };
}];

},{"../../../common/utils/strings":283}],179:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$http", "$q", "suggestsFactory", "suggestsService", "mathService", function($http, $q, suggestsFactory, suggestsService, mathService) {
    function createSuggestFromQuery(query) {
        if (firstSuggest === null) {
            firstSuggest = suggestsFactory.create({text: query || '', isQuery: true, selected: true});
        } else {
            firstSuggest.text = query || '';
            firstSuggest.selected = true;
        }
        return [firstSuggest];
    }

    function createMathEvaluationSuggest(query) {
        var solution = mathService.evaluate(query);
        var result = [];

        if (solution) {
            solution = "= " + solution.toFixed(2);
            result.push(suggestsFactory.create({text: solution, query: query}));
        }
        return result;
    }

    function createServerSuggests(query) {
        return suggestsService.request(query)
            .then(function (data) {
                var sites = data.sites.map(function(site) {
                    site.type = 'site';
                    site.query = query;
                    return suggestsFactory.create(site);
                });
                var items = data.items.map(function(item) {
                    return suggestsFactory.create({text: item.textMarked, query: query});
                });
                //add mail.ru suggests
                return sites.concat(items);
            }, function() {
                return [];
            });
    }

    var firstSuggest = null;

    return {
        getFirstSuggest(query) {
            return createSuggestFromQuery(query)[0];
        },
        initSuggestsWithQuery: function(query) {
            return createSuggestFromQuery(query);
        },
        createSuggestsForQuery: function(query) {
            var inputData = createSuggestFromQuery(query);
            var mathData = createMathEvaluationSuggest(query);

            return createServerSuggests(query)
                .then(function(suggestsData) {
                    return inputData.concat(mathData, suggestsData);
                });
        }
    };
}];

},{}],180:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["Suggest", "SiteSuggest", function(Suggest, SiteSuggest) {
    return {
        create: function(source) {
            var suggest;
            switch (source.type) {
                case 'site':
                    suggest = new SiteSuggest(source);
                    break;
                default:
                    suggest = new Suggest(source);
                    break;
            }
            return suggest;
        }
    };
}];
},{}],181:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$http", "$q", function($http, $q) {

    return {
        request: function (query) {
            var config = {
                method: 'GET',
                url: 'http://suggests.go.mail.ru/sg_u',
                params: {
                    q: query
                }
            };
            return $http(config).
                then(function (response) {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        return $q.reject(response);
                    }
                }, function() {
                    return $q.reject();
                });
        }
    };
}];
},{}],182:[function(require,module,exports){
"use strict";

const tilesModes = require('./../../../common/constants/tiles-modes');

module.exports = /*@ngInject*/ ["$window", "$rootScope", "$q", "objectUtils", "messagingService", function($window, $rootScope, $q, objectUtils, messagingService) {
    let settings = { };

    function isCorrectIndex(index, boardsCount) {
        return Number.isInteger(index) && index >= 0 && index < boardsCount;
    }

    return {
        get modesList() {
            return Object.values(tilesModes);
        },

        get activeBoardIndex() {
            return settings.activeBoardIndex || 0;
        },

        get currentMode() {
            return settings.mode || tilesModes.mix.name;
        },

        get maxTilesCount() {
            const mode = this.getModeByName(settings.mode);
            return mode ? mode.maxCount : 8;
        },

        setActiveBoardIndex(index, boardsCount) {
            if (index !== settings.activeBoardIndex) {
                settings.activeBoardIndex = isCorrectIndex(index, boardsCount) ? index : settings.activeBoardIndex;
                console.log('SET ACTIVE BOARD INDEX', settings);
                return this.sync();
            }

            return $q.reject();
        },

        setMode(modeName) {
            if (modeName !== settings.mode) {
                settings.mode = modeName;
                console.log('SET MODE', settings);
                return this.sync();
            }

            return $q.reject();
        },

        getModeByName(modeName) {
            return tilesModes[modeName];
        },

        init(boardsData) {
            boardsData = boardsData || { };
            const boards = Array.isArray(boardsData.boards) ? boardsData.boards : [];
            settings = objectUtils.isObject(boardsData.settings) ? boardsData.settings : { };

            const activeBoardIndex = settings.activeBoardIndex;
            settings.activeBoardIndex = isCorrectIndex(activeBoardIndex, boards.length) ? activeBoardIndex : 0;

            console.log('BOARDS SETTINGS', this);
        },

        sync() {
            return messagingService.send({ type: 'save_boards_settings', settings });
        }
    };
}];
},{"./../../../common/constants/tiles-modes":234}],183:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    class SelectionManager {
        constructor() {
            this._items = new Map();
        }

        get items() {
            return Array.from(this._items.values());
        }

        get itemsCount() {
            return this._items.size;
        }

        getItem(id) {
            return this._items.get(id);
        }

        add(id, item) {
            this._items.set(id, item);
        }

        remove(id) {
            this._items.delete(id);
        }

        has(id) {
            return this._items.has(id);
        }

        clear() {
            this._items.clear();
        }
    }



    return new SelectionManager();
};
},{}],184:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "$cacheFactory", "messagingService", "tileFactory", function($q, $cacheFactory, messagingService, tileFactory) {
    let globalId = 0;

    const mapper = (prefix) => (item) => {
        return tileFactory.create({
            id: `showcase_${prefix}_${globalId++}`,
            type: 'site',
            url: item
        });
    };

    const cache = $cacheFactory('showcase');

    return {
        getShowcases: function(showcase) {
            const cachedValue = cache.get(showcase);

            if (cachedValue) {
                return $q.when(cachedValue.rows);
            }

            return messagingService.send({ type: 'get_showcase', showcase: showcase }).then(res => {
                if (!res) {
                    return [];
                }

                const processedShowcase = {
                    rows: []
                };

                res.rows.forEach(row => {
                    processedShowcase.rows.push({
                        title: row.title,
                        tileSize: row.tileSize,
                        tiles: row.tiles.map(mapper(showcase))
                    });
                });

                cache.put(showcase, processedShowcase);

                return processedShowcase.rows;
            });
        }
    };
}];
},{}],185:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    var newYear = {
        fireworksEnabled: false
    };

    return {
        get fireworksEnabled() {
            return newYear.fireworksEnabled;
        },
        enableFireworks: function() {
            newYear.fireworksEnabled = true;
        },
        disableFireworks: function() {
            newYear.fireworksEnabled = false;
        }
    };
};
},{}],186:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    var configMap = { };

    this.configMap = function(map) {
        configMap = map;
    };

    this.$get = [ '$window', function($window) {
        return {
            getConfig: function() {
                var matchedSize;

                for (var size in configMap) {
                    if (configMap.hasOwnProperty(size) && $window.matchMedia(size).matches) {
                        matchedSize = configMap[size];
                    }
                }

                if (matchedSize === undefined) {
                    matchedSize = configMap[Object.keys(configMap)[0]];
                }

                return matchedSize;
            }
        };
    } ];
};

},{}],187:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "$q", "$http", "$window", "themesService", "imageLoader", "fileSystem", "messagingService", function($rootScope, $q, $http, $window, themesService, imageLoader, fileSystem, messagingService) {

    let themesLoading = false;
    let canceller = null;

    return {
        isLoading() {
            return themesLoading;
        },

        stopLoading() {
            if (themesLoading && canceller) {
                canceller.resolve();
            }

            themesLoading = false;
            canceller = null;
        },

        loadActiveThemeImage() {
            if (themesLoading && canceller) {
                canceller.resolve();
            }

            themesLoading = true;
            canceller = $q.defer();

            const activeTheme = themesService.activeTheme;
            const themeName = activeTheme.name;

            return themesService.getFullImage(activeTheme).then(themeImage => {
                return imageLoader.loadBlob(themeImage, canceller.promise).then(response => {
                    return fileSystem.saveFile(response.data, themeName).then(() => {
                        return fileSystem.getUrl(themeName);
                    }).then(imageUrl => {
                        messagingService.send({ type: 'add_theme_local_image', themeName, imageUrl: themeName });

                        themesLoading = false;
                        return imageUrl;
                    });
                });
            });
        }
    };
}];
},{}],188:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "$q", "$http", "$window", "messagingService", "fileSystem", "urlUtils", function($rootScope, $q, $http, $window, messagingService, fileSystem, urlUtils) {

    let themesData = setEmptyThemesData();
    let activeTheme;

    function getRandomTheme() {
        const availableThemes = themesData.themes.filter(theme => !theme.hidden);
        return availableThemes[Math.floor(Math.random() * availableThemes.length)];
    }

    function findActiveTheme() {
        return themesData.themes.find(theme => theme.id === themesData.settings.activeId);
    }

    function setEmptyThemesData() {
        return {
            themes: [ ],
            authors: [ ],
            categories: [ ],
            onboardingThemes: [ ],
            settings: { }
        };
    }

    function getLocalImage(theme) {
        const themeName = theme.name;
        const localImages = themesData.settings.localImages;

        if (localImages && localImages[themeName]) {
            return fileSystem.getUrl(localImages[themeName]);
        }

        return Promise.resolve();
    }

    function getFullImage(theme) {
        const fullImage = theme.fullImage;

        if (urlUtils.isValidUrlSimple(fullImage)) {
            return Promise.resolve(fullImage);
        }

        return fileSystem.getUrl(fullImage);
    }

    function getPreviewImage(theme) {
        const previewImage = theme.previewImage;

        if (urlUtils.isValidUrlSimple(previewImage)) {
            return Promise.resolve(previewImage);
        }

        return fileSystem.getUrl(previewImage);
    }

    return {
        get themes() {
            return themesData.themes.filter(theme => !theme.hidden);
        },

        get loadedThemes() {
            return this.themes.filter(theme => theme.own);
        },

        get hasThemes() {
            return themesData.themes.length > 0;
        },

        get activeTheme() {
            return activeTheme;
        },

        getFullImage,
        getPreviewImage,
        getLocalImage,

        getActiveThemeImages() {
          return Promise.all([
              getFullImage(activeTheme),
              getPreviewImage(activeTheme),
              getLocalImage(activeTheme)
          ]).then(images => {
              return {
                  full: images[0],
                  preview: images[1],
                  local: images[2]
              };
          });
        },

        get activeThemeName() {
            if (this.isRandom()) {
                return 'shuffle';
            }

            if (this.activeTheme === undefined) {
                return 'none';
            }

            return activeTheme.name;
        },

        set activeTheme(theme) {
            themesData.settings = Object.assign({}, themesData.settings, {
                random: false,
                activeId: theme.id
            });

            activeTheme = theme;
            this.sync();
        },

        get authors() {
            return themesData.authors.map(author => {
                const authorThemes = themesData.themes.filter(theme => author.themes.includes(theme.id));

                return {
                    id: author.id,
                    name: author.name,
                    link: author.link,
                    themes: authorThemes
                };
            });
        },

        get categories() {
            return themesData.categories || [];
        },

        get onboardingThemes() {
            return themesData.onboardingThemes || [];
        },

        getThemeByName(name) {
            return themesData.themes.find(theme => theme.name === name);
        },

        getThemesByCategory(category) {
            const categoryObj = themesData.categories.find(ctgry => category.name === ctgry.name);
            return categoryObj ? this.themes.filter(theme => categoryObj.themes.includes(theme.name)) : [];
        },

        disableThemes() {
            themesData.settings = Object.assign({}, themesData.settings, {
                random: false,
                activeId: -1
            });

            activeTheme = undefined;
            this.sync();
        },

        randomizeThemes() {
            activeTheme = getRandomTheme();

            themesData.settings = Object.assign({}, themesData.settings, {
                random: true,
                activeId: activeTheme.id
            });

            this.sync();
        },

        isRandom() {
            return themesData.settings.random;
        },

        load() {
            return messagingService.send({ type: 'get_themes' })
                .then(response => {
                    console.log('THEMES RESPONSE', response);
                    themesData = response || setEmptyThemesData();
                    activeTheme = findActiveTheme();
                    $rootScope.$broadcast('theme:changed');
                })
                .catch(() => {
                    themesData = setEmptyThemesData();
                });
        },

        sync() {
            $rootScope.$broadcast('theme:changed');
            return messagingService.send({ type: 'save_themes_settings', themesData });
        }
    };
}];

},{}],189:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "themesService", "themeImageService", "messagingService", "metricService", "asyncForEach", "guid", "localizeFilter", function($q, themesService, themeImageService, messagingService,
                                        metricService, asyncForEach, guid, localizeFilter) {
    const validMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif'
    ];

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mb

    const invalidFileMessages = {
        type: localizeFilter('background_unsupportedFormat'),
        size: localizeFilter('background_limitExceeded')
    };

    function checkIsFileValid(file) {
        const result = {
            valid: true
        };

        if (!validMimeTypes.includes(file.type)) {
            result.valid = false;
            result.message = invalidFileMessages.type;
        }

        if (file.size > MAX_FILE_SIZE) {
            result.valid = false;
            result.message = invalidFileMessages.size;
        }

        return result;
    }

    function createTheme(file, notActive) {
        const validationObj = checkIsFileValid(file);

        if (!validationObj.valid) {
            return $q.reject(validationObj.message);
        }

        const id = guid();
        const name = 'custom' + id;

        return $q.all([
            themeImageService.createFullImage(file, name),
            themeImageService.createPreviewImage(file, name)
        ]).then(data => {
            const fullImage = data[0];
            const previewImage = data[1];

            // though fullImage for own themes is local, we should also add this image to localImages list
            // because it's marker for other code that this theme is already loaded
            messagingService.send({ type: 'add_theme_local_image', name, imageUrl: name });

            const theme = {
                id,
                name,
                fullImage,
                previewImage,
                colorScheme: 'light',
                hidden: false,
                own: true // flag for user's own themes
            };

            messagingService.send({ type: 'add_theme', theme, notActive });
            metricService.send('own_theme_upload', [theme.name]);
            return theme;
        });
    }

    return {
        addThemes(files) {
            return $q(resolve => {
                const themes = [];
                const error = {
                    isError: false,
                    message: ''
                };
                let notActive = false;

                asyncForEach(files, (file, index, next) => {
                    createTheme(file, notActive).then(theme => {
                        themes.push(theme);
                        notActive = true;
                        next();
                    }, errorMessage => {
                        error.isError = true;

                        if (errorMessage) {
                            error.message = errorMessage;
                        }

                        next();
                    });
                }, () => {
                    themes.forEach(theme => {
                        //messagingService.send({ type: 'add_theme', theme });
                    });

                    resolve({ error });
                });
            });
        }
    };
}];
},{}],190:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["customTileDataService", "objectUtils", function(customTileDataService, objectUtils) {
    function isBadTrend(increment) {
        return increment === 'minus';
    }

    function formatCurrenciesData(data) {
        var currencies = objectUtils.getPropertyByPath(data, 'data.currency');

        if (currencies === null) {
            return undefined;
        }

        var formattedCurrencies = { };

        currencies.forEach(function (currency) {
            formattedCurrencies[currency.currencyType] = {
                rate: currency.rate,
                badTrend: isBadTrend(currency.increment)
            };
        });

        return formattedCurrencies;
    }

    return {
        request: function () {

            return customTileDataService
                .request('currency', 'http://ad.mail.ru/adi/5262')
                .then(formatCurrenciesData);
        }
    };
}];
},{}],191:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$http", "messagingService", "objectUtils", function($http, messagingService, objectUtils) {

    const version = 2; //in version 2 changed format of data and update algorithm, so old data sholud be removed from storage

    const getData = name => {
        return messagingService.send({ type: 'get_custom_tile_data', name }).then(data => {
            const tileData = data[name];
            return (tileData && tileData.version === version) ? tileData : undefined;
        }).catch(() => {
            return undefined;
        });
    };

    const updateData = (name, data) => {
        return messagingService.send({ type: 'update_custom_tile_data', name, data });
    };

    return {
        request(name, url, params, transformFn, noSave) {
            const config = {
                method: 'GET',
                url: url,
                params: params || {}
            };

            return $http(config).then(response => {
                    if (response.status === 200 && objectUtils.isObject(response.data)) {
                        const transformedData = typeof transformFn === 'function' ? transformFn(response.data) : response.data;

                        if (!transformedData) {
                            return getData(name);
                        }

                        transformedData.version = version;

                        return noSave ?
                            transformedData :
                            updateData(name, transformedData).then(() => getData(name));
                    } else {
                        return getData(name);
                    }
                }, () => {
                    return getData(name);
                });
        },
        getData(name) {
            return getData(name);
        },
        updateData(name, data) {
            data.version = version;
            return updateData(name, data);
        }
    };
}];
},{}],192:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "imageLoader", function($q, imageLoader) {
    function determineMailCountClass(mailCount) {
        if (mailCount > 99) {
            return 'three-letters';
        } else if (mailCount > 9) {
            return 'two-letters';
        }
        return '';
    }

    function createAvatar(email) {
        var src = 'https://filin.mail.ru/pic?from=splash&email=' + email + '&width=180&height=180&name=';
        return imageLoader.load(src);
    }

    return {
        formatEmailData: function (emailData) {
            return $q(function (resolve, reject) {
                var resultData = {
                    emailData: { }
                };

                if (emailData.email) {
                    createAvatar(emailData.email)
                        .then(function (avatar) {
                            resultData.emailData = {
                                email: emailData.email,
                                avatar: avatar,
                                mailCount: emailData.mail_cnt,
                                mailCountClass: determineMailCountClass(emailData.mail_cnt)
                            };
                            resolve(resultData);
                        },function() {
                            reject(resultData);
                        });
                } else {
                    reject(resultData);
                }
            });
        }
    };
}];
},{}],193:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$http", "$rootScope", "$window", "$interval", "emailDataService", "metricService", function($http, $rootScope, $window, $interval, emailDataService, metricService) {

    function request() {
        var config = {
            method: 'GET',
            url: 'http://swa.mail.ru/cgi-bin/counters'
        };
        return $http(config).
            then(function (response) {
                if (response.status === 200) {
                    return response.data.data;
                } else {
                    var emptyData = {};
                    return emptyData;
                }
            });
    }

    var emailDataRefresh = 60000;
    var emailDataInterval;

    return {
        isApp: false,
        setDataListener: function (processDataCallback, noDataCallback) {
            function emailDataChain() {
                request()
                    .then(emailDataService.formatEmailData)
                    .then(processDataCallback)
                    .catch(noDataCallback);
            }

            emailDataChain();

            emailDataService.formatEmailData({}).catch(noDataCallback); //default state

            emailDataInterval = $interval(function() {
                emailDataChain();
            }, emailDataRefresh);
        },

        removeDataListener: function() {
            $interval.cancel(emailDataInterval);
        },

        openMailBox: function(isMiddle) {
            var mailUrl = 'https://e.mail.ru';

            metricService.send('tile_clicked', [ mailUrl ]).finally(function() {
                var targetWindow = isMiddle ? '_blank' : '_self';
                $window.open(mailUrl, targetWindow);
            });
        }
    };
}];
},{}],194:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["emailService", "mailCheckerService", "messagingService", function(emailService, mailCheckerService, messagingService) {

    return {
        create: function() {
            //return messagingService.send({ type: 'check_has_mail_checker' }).then(function(isApp) {
            //    return false ? mailCheckerService : emailService;
            //});

            return Promise.resolve(emailService);
        }
    };
}];


},{}],195:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "$chrome", "tabService", function($q, $chrome, tabService) {
    return {
        launchApp: function(id) {
            return $q(function(resolve) {
                $chrome.management.launchApp(id, function() {
                    resolve(true);
                });
            });
        },
        launchTabExtension: function(url) {
            return tabService.create({ url: url });
        }
    };
}];
},{}],196:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "$cacheFactory", "messagingService", function($q, $cacheFactory, messagingService) {
    const KEY = 'games_widget_images';
    const cache = $cacheFactory('games_widget');

    const TILES_ON_SHOWCASE_COUNT = 6;

    const fallbackImagesRoot = '../img/showcase-placeholders/games/';
    const fallbackImages = [
        fallbackImagesRoot + '1.jpg',
        fallbackImagesRoot + '2.jpg',
        fallbackImagesRoot + '3.jpg',
        fallbackImagesRoot + '4.jpg',
        fallbackImagesRoot + '5.jpg',
        fallbackImagesRoot + '6.jpg'
    ];

    function createPreview(images) {
        images =
            images.length >= TILES_ON_SHOWCASE_COUNT ?
            images :
            images.concat(new Array(TILES_ON_SHOWCASE_COUNT));

        return {
            images: images.slice(0, TILES_ON_SHOWCASE_COUNT),
            fallbackImages: fallbackImages.slice(0, TILES_ON_SHOWCASE_COUNT)
        };
    }

    return {
        template: '<games-showcase></games-showcase>',
        className: 'add-tile games-showcase',
        getImagesForPreview: function() {
            const cachedValue = cache.get(KEY);

            if (cachedValue) {
                return $q.when(createPreview(cachedValue.images));
            }

            return messagingService.send({ type: 'get_games_widget' }).then(res => {
                if (!res) {
                    return createPreview([]);
                }

                cache.put(KEY, res);

                return createPreview(res.images);
            });
        }
    };
}];
},{}],197:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "$http", "$interval", "customTileDataService", "objectUtils", function($q, $http, $interval, customTileDataService, objectUtils) {

    const zodiacs = [
        {
            id: 1,
            name: 'овен',
            image: '/img/horo/aries.png',
            imageDark: '/img/horo/aries-dark.png'
        },
        {
            id: 2,
            name: 'телец',
            image: '/img/horo/taurus.png',
            imageDark: '/img/horo/taurus-dark.png'
        },
        {
            id: 3,
            name: 'близнецы',
            image: '/img/horo/gemini.png',
            imageDark: '/img/horo/gemini-dark.png'
        },
        {
            id: 4,
            name: 'рак',
            image: '/img/horo/cancer.png',
            imageDark: '/img/horo/cancer-dark.png'
        },
        {
            id: 5,
            name: 'лев',
            image: '/img/horo/leo.png',
            imageDark: '/img/horo/leo-dark.png'
        },
        {
            id: 6,
            name: 'дева',
            image: '/img/horo/virgo.png',
            imageDark: '/img/horo/virgo-dark.png'
        },
        {
            id: 7,
            name: 'весы',
            image: '/img/horo/libra.png',
            imageDark: '/img/horo/libra-dark.png'
        },
        {
            id: 8,
            name: 'скорпион',
            image: '/img/horo/scorpio.png',
            imageDark: '/img/horo/scorpio-dark.png'
        },
        {
            id: 9,
            name: 'стрелец',
            image: '/img/horo/sagittarius.png',
            imageDark: '/img/horo/sagittarius-dark.png'
        },
        {
            id: 10,
            name: 'козерог',
            image: '/img/horo/capricorn.png',
            imageDark: '/img/horo/capricorn-dark.png'
        },
        {
            id: 11,
            name: 'водолей',
            image: '/img/horo/aquarius.png',
            imageDark: '/img/horo/aquarius-dark.png'
        },
        {
            id: 12,
            name: 'рыбы',
            image: '/img/horo/pisces.png',
            imageDark: '/img/horo/pisces-dark.png'
        }
    ];

    const API_URL = 'http://ad.mail.ru/adi/20818';
    const horoType = 'horo';
    const horoRefresh = 600000;
    const horoDataCallbacks = {
        process: null,
        nodata: null
    };

    let horoData;
    let horoInterval;

    function getRandomSign() {
        return Math.floor(Math.random() * 12 + 1);
    }

    function getSign() {
        return customTileDataService.getData(horoType).then(data => {
            return (data && data.id && data.manually) ? data.id : NaN;
        });
    }

    function formatHoroData(dataObj) {
        const data = objectUtils.getPropertyByPath(dataObj, 'data');

        if (!objectUtils.isObject(data)) {
            return undefined;
        }

        const currentZodiacName = data.zodiac.toLowerCase();
        const zodiacData = zodiacs.find(zodiac => zodiac.name === currentZodiacName);

        return {
            id: zodiacData.id,
            url: data.url,
            prediction: /^<p>(.*)<\/p>/.exec(data.description)[1].substr(0, 100).toLowerCase()
        };
    }

    function makeRequest(params, noSave) {
        return customTileDataService.request(horoType, API_URL, params, formatHoroData, noSave);
    }

    function getPrediction(id) {
        if (!isNaN(id)) {
            return makeRequest({ _SITEZONE: id });
        }

        return makeRequest({ }).then(data => {
            return data !== undefined ? data : makeRequest({ _SITEZONE: getRandomSign() }, true);
        }, () => {
            return makeRequest({ _SITEZONE: getRandomSign() }, true);
        });
    }

    function horoDataChain() {
        getSign()
            .then(getPrediction)
            .then(data => {
                if (data && data.id) {
                    horoData = data;
                    return data;
                } else {
                    return $q.reject();
                }
            })
            .then(horoDataCallbacks.process)
            .catch(horoDataCallbacks.nodata);
    }

    return {
        get data() {
            return horoData;
        },

        get zodiacs() {
            return zodiacs;
        },

        getZodiacById(id) {
            return zodiacs.find(zodiac => zodiac.id === id);
        },

        setDataListener(processDataCallback, noDataCallback) {
            horoDataCallbacks.process = processDataCallback;
            horoDataCallbacks.nodata = noDataCallback;

            horoDataChain();

            horoInterval = $interval(() => {
                horoDataChain();
            }, horoRefresh);
        },

        removeDataListener() {
            horoDataCallbacks.process = null;
            horoDataCallbacks.nodata = null;

            $interval.cancel(horoInterval);
        },

        updateDataManually(data) {
            return customTileDataService.updateData(horoType, data).then(() => horoDataChain());
        }
    };
}];
},{}],198:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "$window", "messagingService", "emailDataService", "metricService", function($rootScope, $window, messagingService, emailDataService, metricService) {
    var dataListenerOff;

    return {
        isApp: true,
        request: function () {
            messagingService.send({ type: 'checker_get_info' });
        },
        setDataListener: function (processDataCallback, noDataCallback) {
            this.request();

            dataListenerOff = $rootScope.$on('email:info', function(event, data) {
                emailDataService.formatEmailData(data)
                    .then(processDataCallback)
                    .catch(noDataCallback);
            });

            emailDataService.formatEmailData({}).catch(noDataCallback); //default state
        },
        removeDataListener: function() {
            dataListenerOff();
        },
        //openMailBox: function() {
        //    messagingService.send(mailCheckerAppId, {type: 'checker_start_app', key: tabId}).then(function(data) {
        //        if (data.status) {
        //            metricService.send('tile_clicked', [ 'checker_app' ]);
        //        } else {
        //            metricService.send('tile_clicked', [ 'https://e.mail.ru' ]).finally(this.openMailInTab);
        //        }
        //    }.bind(this));
        //},
        openMailInTab: function() {
            $window.open('https://e.mail.ru', '_self');
        },
        openSettings: function() {
            messagingService.send({ type: 'checker_open_settings' });
        },
        attachMailChecker: function() {
            messagingService.send({ type: 'checker_attach' });
        },
        detachMailChecker: function() {
            messagingService.send({ type: 'checker_detach' });
        }
    };
}];

},{}],199:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["customTileDataService", function(customTileDataService) {

    const RECOMMENDATIONS_MAX_COUNT = 3;

    function isNotEmptyString(str) {
        return str && str.length > 0;
    }

    function transformMediaData(data) {
        if (data && Array.isArray(data.list)) {
            const mediaItems = data.list.map(item => ({
                url: decodeURIComponent(item.content.url),
                title: decodeURIComponent(isNotEmptyString(item.content.title) ? item.content.title : item.content.description),
                image: item.content.preview.url
            })).slice(0, RECOMMENDATIONS_MAX_COUNT);

            return {
                mediaItems
            };
        }

        return undefined;
    }

    return {
        request(type, apiUrl) {
            return customTileDataService.request(type, apiUrl, { }, transformMediaData);
        }
    };
}];
},{}],200:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "$cacheFactory", "messagingService", function($q, $cacheFactory, messagingService) {
    const KEY = 'ok_games_widget_images';
    const cache = $cacheFactory('ok_games_widget');

    const TILES_ON_SHOWCASE_COUNT = 6;

    const fallbackImagesRoot = '../img/showcase-placeholders/games/';
    const fallbackImages = [
        fallbackImagesRoot + '1.jpg',
        fallbackImagesRoot + '2.jpg',
        fallbackImagesRoot + '3.jpg',
        fallbackImagesRoot + '4.jpg',
        fallbackImagesRoot + '5.jpg',
        fallbackImagesRoot + '6.jpg'
    ];

    function createPreview(games) {
        const urls = games.map(game => game.iconUrl);
        const images =
            urls.length >= TILES_ON_SHOWCASE_COUNT ?
                urls :
                urls.concat(new Array(TILES_ON_SHOWCASE_COUNT));

        return {
            images: images.slice(0, TILES_ON_SHOWCASE_COUNT).sort(() => Math.random() > 0.5),
            fallbackImages: fallbackImages.slice(0, TILES_ON_SHOWCASE_COUNT)
        };
    }

    return {
        template: '<ok-games-showcase></ok-games-showcase>',
        className: 'add-tile games-showcase games-showcase--ok',
        getImagesForPreview: function() {
            const cachedValue = cache.get(KEY);

            if (cachedValue) {
                return $q.when(createPreview(cachedValue));
            }

            return messagingService.send({ type: 'get_ok_games_widget' }).then(res => {
                if (!res) {
                    return createPreview([]);
                }

                cache.put(KEY, res);

                return createPreview(res);
            });
        }
    };
}];
},{}],201:[function(require,module,exports){
'use strict';

module.exports = /*@ngInject*/ ["siteImageService", "authProxyService", function(siteImageService, authProxyService) {
    function isOkType(info) {
        return info.network === 'ok';
    }

    function isMainOkPage(info) {
        const regex = /^(https?:\/\/)?(www\.)?(odnoklassniki\.|ok\.)ru\/?$/;
        return isOkType(info) && regex.test(info.url);
    }

    function isProfileUserPage(info) {
        const regex = /^(https?:\/\/)?(www\.)?(odnoklassniki\.|ok\.)ru\/profile\/[0-9]+$/;
        return isOkType(info) && regex.test(info.url);
    }

    function getUserIdFromUrl(url) {
        return url.split('/').pop();
    }

    return {
        getData(info) {
            function returnNothing() {
                return Promise.resolve();
            }

            function formatUserData(userData) {
                return {
                    name: userData.name,
                    userId: userData.uid,
                    image: userData.pic128x128,
                    online: userData.online != null,
                    current: userData.current || false
                };
            }

            /* add flag if user is current and authorized */
            function makeUserCurrent(userData) {
                userData.current = true;
                userData.online = false; //
                return userData;
            }

            if (isOkType(info)) {
                return authProxyService.isAuthorized().then(isAuthorized => {
                    if (isAuthorized) {
                        if (isProfileUserPage(info)) {
                            const userId = getUserIdFromUrl(info.url);

                            return authProxyService.getCurrentUser().then(userData => {
                                if (userData.uid === userId) {
                                    return makeUserCurrent(userData);
                                }
                                return authProxyService.getUserById(userId);
                            })
                            .then(userData => {
                                if (userData != null) {
                                    return Object.assign(info, formatUserData(userData));
                                }
                                return returnNothing();
                            });
                        } else if (isMainOkPage(info)) {
                            return authProxyService.getCurrentUser().then(userData => {
                                if (userData != null) {
                                    return Object.assign(info, formatUserData(makeUserCurrent(userData)));
                                }
                                return returnNothing();
                            });
                        }
                    }
                    return returnNothing();
                }).catch(() => returnNothing());
            }
            return returnNothing();
        }
    };
}];

},{}],202:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["gamesShowcaseService", "okGamesShowcaseService", function(gamesShowcaseService, okGamesShowcaseService) {

    const servicesObj = {
        games: gamesShowcaseService,
        ok_games: okGamesShowcaseService
    };

    return {
        create(type) {
            return servicesObj[type];
        }
    };
}];
},{}],203:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["messagingService", function(messagingService) {
    return {
        getMeta: function(hostname) {
            return messagingService.send({ type: 'get_meta', hostname: hostname });
        },
        saveMetaForPromo: function(meta) {
            return messagingService.send({ type: 'save_meta_for_promo', meta: meta });
        }
    };
}];
},{}],204:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "$interval", "messagingService", "objectUtils", "okSocialService", function($q, $interval, messagingService, objectUtils, okSocialService) {

    function getAllRecords() {
        return messagingService.send({ type: 'get_social_records' }).then(function(rcrds) {
            if (objectUtils.isObject(rcrds)) {
                records = rcrds;
            }
        });
    }

    function findRecord(info) {
        var networkRecords = records[info.network];
        var hasNetworkRecords = Array.isArray(networkRecords);

        if (hasNetworkRecords) {
            return networkRecords.find(function(record) {
                return record.screenName === info.screenName;
            });
        }
    }

    function initRequestingData() {
        if (!socialDataIntervalId) {
            socialDataIntervalId = $interval(getAllRecords, SOCIAL_DATA_INTERVAL);
        }
    }

    var SOCIAL_DATA_INTERVAL = 60000;
    var socialDataIntervalId;
    var records = {};

    getAllRecords();

    return {
        getDataForTile: function(info) {
            return okSocialService.getData(info).then(tileOkData => {
                if (tileOkData != null) {
                    return tileOkData;
                }

                initRequestingData();

                var recordData = findRecord(info);

                if (recordData) {
                    return Promise.resolve(recordData);
                }

                return messagingService.send({type: 'get_data_for_social_tile', info: info});
            });
        }
    };
}];

},{}],205:[function(require,module,exports){
"use strict";

var tileFactory = require('../../../common/factory/tile-factory');

module.exports = /*@ngInject*/ function() {
    return tileFactory;
};
},{"../../../common/factory/tile-factory":238}],206:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["customTileDataService", function(customTileDataService) {

    function determineClassByWeatherStatus(weatherStatus, weatherPrefix) {
        var className = '';

        switch(weatherStatus){
            case 1:
            case 11:
            case 14:
            case 15:
            case 20:
            case 21:
            case 23:
                className = 'weather-3';
                break;
            case 4:
                className = 'weather-7';
                break;
            case 2:
            case 3:
            case 12:
            case 13:
            case 17:
            case 27:
            case 30:
            case 33:
            case 41:
            case 42:
            case 43:
                className = 'weather-11';
                break;
            case 5:
            case 16:
            case 22:
            case 24:
            case 26:
            case 28:
            case 31:
            case 32:
                className = 'weather-2';
                break;
            case 6:
            case 9:
            case 10:
            case 18:
            case 25:
            case 48:
                className = weatherPrefix === 'n' ? 'weather-2' : 'weather-5';
                break;
            case 7:
                className = 'weather-1';
                break;
            case 8:
            case 19:
            case 29:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 40:
            case 44:
            case 45:
            case 46:
            case 47:
                className = 'weather-4';
                break;

        }

        return className;
    }

    function determineColorByTemperature(value) {

        if (value < -30) {
            return '#1e0278';
        }
        if (value >= -30 && value < -27) {
            return '#0613a0';
        }
        if (value >= -27 && value < -24) {
            return '#071ac5';
        }
        if (value >= -24 && value < -21) {
            return '#0a21ec';
        }
        if (value >= -21 && value < -18) {
            return '#074eed';
        }
        if (value >= -18 && value < -15) {
            return '#146ef4';
        }
        if (value >= -15 && value < -12) {
            return '#0c81e4';
        }
        if (value >= -12 && value < -9) {
            return '#0f90da';
        }
        if (value >= -9 && value < -6) {
            return '#0fa8e1';
        }
        if (value >= -6 && value < -3) {
            return '#1bbde5';
        }
        if (value >= -3 && value < 0) {
            return '#17cde8';
        }
        if (value === 0) {
            return '#bbbaba';
        }
        if (value > 0 && value <= 3) {
            return '#c3da00';
        }
        if (value > 3 && value <= 6) {
            return '#cfcd02';
        }
        if (value > 6 && value <= 9) {
            return '#e3ba18';
        }
        if (value > 9 && value <= 12) {
            return '#eda01a';
        }
        if (value > 12 && value <= 15) {
            return '#ec8a17';
        }
        if (value > 15 && value <= 18) {
            return '#f17109';
        }
        if (value > 18 && value <= 21) {
            return '#f1580c';
        }
        if (value > 21 && value <= 24) {
            return '#e63702';
        }
        if (value > 24 && value <= 27) {
            return '#c92602';
        }
        if (value > 27 && value <= 30) {
            return '#ab0e00';
        }
        if (value > 30) {
            return '#8a0118';
        }

    }

    function formatWeatherData(data) {
        if (data === undefined) {
            return undefined;
        }

        return {
            city: data.city,
            temperature: data.weather_now,
            weatherIconClass: determineClassByWeatherStatus(data.weather_status, data.weather_icon_prefix),
            temperatureColor: determineColorByTemperature(data.weather_now)
        };
    }

    return {
        request: function () {

            return customTileDataService
                .request('weather', 'http://ad.mail.ru/adi/5261')
                .then(formatWeatherData);
        }
    };
}];
},{}],207:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$window", "$timeout", "boardsService", "boardsSettingsService", function($window, $timeout, boardsService, boardsSettingsService) {

    function highlight(key, effect) {
        var element = $window.document.querySelector('*[data-highlight="'+ key +'"] .tile-component');

        if (element) {
            element.classList.add(effect);
            $timeout(function () {
                element.classList.remove(effect);
            }, 2000);
        }
    }

    return {
        highlightTile(tileInfo) {
            if (tileInfo.boardIndex === boardsSettingsService.activeBoardIndex) {
                highlight(tileInfo.tileId, 'ripple');
            } else {
                boardsService.choose(tileInfo.boardIndex);
                $timeout(function() {
                    highlight(tileInfo.tileId, 'ripple');
                }, 200);
            }
        }
    };
}];
},{}],208:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$window", "$http", function($window, $http) {
    return {
        loadBlob(url, timeout) {
            return $http.get(url, {
                responseType: 'blob',
                cache: true,
                timeout
            });
        },
        load(url, timeout) {
            return this.loadBlob(url, timeout).then(function(response) {
                return $window.URL.createObjectURL(response.data);
            });
        },
        unload(blob) {
            return blob && $window.URL.revokeObjectURL(blob);
        }
    };
}];
},{}],209:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "$timeout", "tabService", function($rootScope, $timeout, tabService) {

    function expandAndOpen(url, data) {
        if (data.event.which === 2) {
            return tabService.create({ url: url, active: false });
        }

        $rootScope.$emit('tile:expand', {tileEvent: data.event, color: data.color});
        $timeout(function() {
            tabService.update({url: url});
        }, 160); //160 - duration of tile expanding animation
    }

    return {
        handleAction: function(action, url, data) {
            switch (action) {
                case 'expand-and-open':
                    expandAndOpen(url, data);
                    break;
                default:
                    expandAndOpen(url, data);
                    break;
            }
        }
    };
}];
},{}],210:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "$timeout", "$q", "$chrome", "guid", function($rootScope, $timeout, $q, $chrome, guid) {

    function getSenderId() {
        return $q(resolve => {
            $chrome.tabs.getCurrent(tab => resolve(tab.id));
        });
    }

    $chrome.runtime.onMessage.addListener(function(message) {
        getSenderId().then(senderId => {
            if (message.originatorId && message.originatorId !== senderId) {
                switch (message.type) {
                    case 'checker_info':
                        $rootScope.$broadcast('email:info', message.data);
                        break;
                    case 'themes_updated':
                        $rootScope.$broadcast('background:themes-updated', message.data);
                        break;
                    case 'custom_theme_applied':
                        $rootScope.$broadcast('background:preset-theme-applied');
                        break;
                    case 'preset_tiles_applied':
                        $rootScope.$broadcast('background:tiles-changed');
                        break;
                    case 'preset_applied':
                        $rootScope.$emit('presets:applied');
                        break;
                    default:
                        $rootScope.$broadcast('background:tiles-changed');
                        break;
                }
            }
        });

        return false;
    });

    function send(/*optional*/extensionId, message) {
        var args = arguments;

        return $q(function (resolve, reject) {
            function callback(response) {
                if ($chrome.runtime.lastError) {
                    return reject($chrome.runtime.lastError);
                }

                return resolve(response);
            }

            var parameters = [].slice.call(args).concat(callback);
            $chrome.runtime.sendMessage.apply(this, parameters);
        });
    }

    function sendWithRetry(/*optional*/extensionId, message) {
        var args = arguments;

        return send.apply(null, args)
            .then(function(results) {
                return results;
            })
            .catch(function(err) {
                console.error('Error sending message', err, extensionId.type);

                return $q(function(resolve, reject) {
                    $timeout(function() {
                        console.log('Retry...');
                        sendWithRetry.apply(null, args).then(resolve).catch(reject);
                    }, 50);
                });
            });
    }

    return {
        send: sendWithRetry
    };
}];
},{}],211:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$rootScope", "switchZoneService", function($rootScope, switchZoneService) {
    var overlays = {
        onboarding: false,
        search: false,
        modal: false
    };

    $rootScope.$on('ngDialog.opened', function() {
        overlays.modal = true;
    });

    $rootScope.$on('ngDialog.closed', function() {
        overlays.modal = false;
    });

    return {
        get visible() {
            return Object.keys(overlays).some(function(overlayType) {
                return overlays[overlayType] === true;
            });
        },

        show: function(type) {
            overlays[type] = true;
            switchZoneService.disable();
        },

        hide: function(type) {
            overlays[type] = false;
            switchZoneService.enable();
        }
    };
}];
},{}],212:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["messagingService", function(messagingService) {
    let values = { };
    let valuesPromise;

    function load() {
        valuesPromise = messagingService.send({ type: 'get_specific_values' }).then(_values => {
            values = _values;
        });
    }

    load();

    return {
        getValue(name) {
            return values[name];
        },
        getValueAsync(name) {
            return valuesPromise.then(() => this.getValue(name));
        }
    };
}];
},{}],213:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$q", "$chrome", function($q, $chrome) {
    return {
        update: function(options) {
            return $q(function(resolve) {
                $chrome.tabs.update(options, function(tab) {
                    resolve(tab);
                });
            });
        },
        create: function(options) {
            return $q(function(resolve) {
                $chrome.tabs.create(options, function(tab) {
                    resolve(tab);
                });
            });
        },
        getOpenTabs: function(windowId) {
            const re = /^(chrome|chrome-extension)/i;

            return $q(resolve => {
                resolve([]);
                // FIREFOX does not support this
                //$chrome.tabs.getAllInWindow(windowId, tabs => {
                //    resolve(tabs.filter(item => {
                //        return !(re.test(item.url));
                //    }));
                //});
            });
        }
    };
}];
},{}],214:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$location", function($location) {
    const params = $location.search();

    return {
        getParam(key) {
            const hasParam = params.hasOwnProperty(key);

            if (hasParam) {
                return params[key];
            }

            return undefined;
        },
        removeParam(key) {
            const hasParam = params.hasOwnProperty(key);

            if (hasParam) {
                $location.search(key, null);
            }
        }
    };
}];
},{}],215:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {

    return {
        addWatchedProperty(options) {
            options = options || { };

            const privateName = `_${options.propName}`;

            Object.defineProperty(options.obj, privateName, {
                value: options.initialValue,
                writable: true,
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(options.obj, options.propName, {
                get() {
                    return this[privateName];
                },
                set(newValue) {
                    this[privateName] = newValue;

                    //Call method on update
                    options.onChange(this[privateName]);
                },
                enumerable: true,
                configurable: true
            });
        }
    };
};
},{}],216:[function(require,module,exports){
"use strict";

var arrayUtils = require('../../../common/utils/array');

module.exports = /*@ngInject*/ function() {
    return arrayUtils;
};
},{"../../../common/utils/array":271}],217:[function(require,module,exports){
"use strict";

var fn = require('../../../common/utils/async-foreach');

module.exports = function() {
    return fn;
};
},{"../../../common/utils/async-foreach":272}],218:[function(require,module,exports){
"use strict";

var chromeFactory = require('../../../common/factory/chrome-factory');

module.exports = /*@ngInject*/ chromeFactory;
},{"../../../common/factory/chrome-factory":235}],219:[function(require,module,exports){
"use strict";

const colorUtils = require('../../../common/utils/color-utils');

module.exports = /*@ngInject*/ function() {
    return colorUtils;
};

},{"../../../common/utils/color-utils":273}],220:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$chrome", function($chrome) {
    const details = {}; //$chrome.app.getDetails();
    return {
        extensionId: details.id,
        version: details.version
    };
}];

},{}],221:[function(require,module,exports){
"use strict";

var fileSystem = require('../../../common/utils/file-system');

module.exports = /*@ngInject*/ function() {
    return fileSystem;
};

},{"../../../common/utils/file-system":276}],222:[function(require,module,exports){
"use strict";

var guid = require('../../../common/utils/guid');

module.exports = /*@ngInject*/ function() {
    return guid;
};
},{"../../../common/utils/guid":277}],223:[function(require,module,exports){
"use strict";

const imageUtils = require('../../../common/utils/image-utils');

module.exports = /*@ngInject*/ function() {
    return imageUtils;
};

},{"../../../common/utils/image-utils":278}],224:[function(require,module,exports){
"use strict";

var objectUtils = require('../../../common/utils/object-utils');

module.exports = /*@ngInject*/ function() {
    return objectUtils;
};

},{"../../../common/utils/object-utils":280}],225:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ function() {
    return window.RGBaster;
};
},{}],226:[function(require,module,exports){
"use strict";

var siteSerializer = require('../../../common/serialization/tile-serializer');

module.exports = /*@ngInject*/ function() {
    return siteSerializer;
};
},{"../../../common/serialization/tile-serializer":261}],227:[function(require,module,exports){
"use strict";

module.exports = /*@ngInject*/ ["$window", function($window) {
    return $window.Snap;
}];
},{}],228:[function(require,module,exports){
"use strict";

const themeImageService = require('../../../common/services/theme-image-service');

module.exports = /*@ngInject*/ function() {
    return themeImageService;
};

},{"../../../common/services/theme-image-service":264}],229:[function(require,module,exports){
"use strict";

var urlUtils = require('../../../common/utils/url-utils');

module.exports = /*@ngInject*/ function() {
    return urlUtils;
};
},{"../../../common/utils/url-utils":284}],230:[function(require,module,exports){
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
},{}],231:[function(require,module,exports){
module.exports = {
    URL: 'url',
    COLLECTIONS: 'collections',
    NOTIFICATIONS: 'notifications',
    PROMO: 'promo'
};
},{}],232:[function(require,module,exports){
module.exports = {
    VK: 'vk',
    MM: 'mm',
    OK: 'ok',
    TW: 'tw'
};
},{}],233:[function(require,module,exports){
module.exports = {
    MAX_FULL_IMAGE_WIDTH: 2560,
    MAX_FULL_IMAGE_HEIGHT: 1440,
    MAX_PREVIEW_WIDTH: 135,
    MAX_PREVIEW_HEIGHT: 76,
    MAX_ACCEPTABLE_RATIO_DIFF: 0.1,
    COMMON_RATIO: 16 / 9
};
},{}],234:[function(require,module,exports){
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
},{"../services/localize-service":262}],235:[function(require,module,exports){
"use strict";

module.exports = function() {
    return window.chrome || window.browser;
};
},{}],236:[function(require,module,exports){
"use strict";

module.exports = function() {
    return window.localStorage;
};
},{}],237:[function(require,module,exports){
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

},{"../../common/mixins/rb-url":239,"../../common/utils/mix":279,"../constants/social-networks":232,"../models/decorated-site-tile":243,"../models/ok-games-tile":251,"../models/ok-gifts-tile":252,"../models/ok-notifications-tile":253,"../models/ok-streams-tile":254,"../models/tile-type":259}],238:[function(require,module,exports){
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
},{"../models/blank-tile":241,"../models/currency-tile":242,"../models/decorated-site-tile":243,"../models/email-tile":244,"../models/horo-tile":247,"../models/media-tile":248,"../models/music-tile":249,"../models/mywidget-tile":250,"../models/promo-tile":255,"../models/showcase-tile":256,"../models/tile-type":259,"../models/weather-tile":260,"../services/social-service":263,"../utils/url-utils":284,"./../special/special-tile-factory":267,"./ok-tile-factory":237}],239:[function(require,module,exports){
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
},{"../utils/url-utils":284}],240:[function(require,module,exports){
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
},{"../utils/guid":277,"./../utils/url-utils":284,"./tile-type":259}],241:[function(require,module,exports){
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
},{"./base-tile":240,"./tile-type":259}],242:[function(require,module,exports){
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

},{"./base-tile":240,"./tile-type":259}],243:[function(require,module,exports){
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
},{"./site-tile":257,"./tile-type":259}],244:[function(require,module,exports){
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
},{"./base-tile":240,"./tile-type":259}],245:[function(require,module,exports){
"use strict";

module.exports = {
    COUNT: 'count',
    TIME: 'time',
    DEFAULT: 'default'
};
},{}],246:[function(require,module,exports){
"use strict";

module.exports = {
    HINT: 'hint',
    ONBOARDING: 'onboarding',
    DEFAULT: 'default'
};
},{}],247:[function(require,module,exports){
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

},{"./base-tile":240,"./tile-type":259}],248:[function(require,module,exports){
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

},{"../../common/utils/url-utils":284,"./decorated-site-tile":243,"./tile-type":259}],249:[function(require,module,exports){
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
},{"./base-tile":240,"./tile-type":259}],250:[function(require,module,exports){
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

},{"./base-tile":240,"./tile-type":259}],251:[function(require,module,exports){
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
},{"./decorated-site-tile":243,"./tile-type":259}],252:[function(require,module,exports){
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

},{"./decorated-site-tile":243,"./tile-type":259}],253:[function(require,module,exports){
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

},{"./decorated-site-tile":243,"./tile-type":259}],254:[function(require,module,exports){
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

},{"./decorated-site-tile":243,"./tile-type":259}],255:[function(require,module,exports){
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
},{"../../common/utils/object-utils":280,"../services/localize-service":262,"./site-tile":257,"./tile-type":259}],256:[function(require,module,exports){
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
},{"./base-tile":240,"./tile-type":259}],257:[function(require,module,exports){
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

},{"../../common/utils/url-utils":284,"./base-tile":240,"./tile-type":259}],258:[function(require,module,exports){
"use strict";

module.exports = {
    MAX_BOARDS_COUNT: 20,
    MAX_TILES_COUNT: 12,
    ABSOLUTELY_MAX_TILES_COUNT: 24
};
},{}],259:[function(require,module,exports){
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
},{}],260:[function(require,module,exports){
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

},{"./base-tile":240,"./tile-type":259}],261:[function(require,module,exports){
"use strict";

var factory = require('../factory/tile-factory');

module.exports = {
    deserialize: function(tiles) {
        return tiles.map(function(tileJson) {
            return factory.create(tileJson);
        });
    },
    serialize: function(tiles) {
        return tiles.map(function(tileInstance) {
            return tileInstance ? tileInstance.json() : '';
        });
    }
};
},{"../factory/tile-factory":238}],262:[function(require,module,exports){
module.exports = function(key) {
    return chrome.i18n.getMessage(key);
};
},{}],263:[function(require,module,exports){
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

},{"../constants/social-networks":232,"../utils/url-utils":284}],264:[function(require,module,exports){
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
},{"./../constants/themes":233,"./../utils/file-system":276,"./../utils/image-utils":278}],265:[function(require,module,exports){
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
},{"./special-tile":269}],266:[function(require,module,exports){
"use strict";

const SpecialTile = require('./special-tile');

class NewYearTile extends SpecialTile {
    constructor(source) {
        super(source);
    }
}

module.exports = NewYearTile;
},{"./special-tile":269}],267:[function(require,module,exports){
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
},{"./iframe-tile":265,"./ny-tile":266,"./special-tile-type":268}],268:[function(require,module,exports){
"use strict";

module.exports = {
    DEFAULT: 'special',
    NEW_YEAR: 'new-year',
    IFRAME: 'iframe'
};
},{}],269:[function(require,module,exports){
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
},{"./../models/base-tile":240,"./special-tile-type":268}],270:[function(require,module,exports){
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
},{"../../common/utils/url-utils":284}],271:[function(require,module,exports){
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
},{"./async-foreach":272}],272:[function(require,module,exports){
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
},{}],273:[function(require,module,exports){
"use strict";

module.exports = {

    createRgbaString(r, g, b, a) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    },

    getRgbFromString(colorStr) {

        function hexToDecimal(hex) {
            return parseInt(hex, 16);
        }

        //check rgb case: rgb(255, 255, 255) or 255, 255, 255

        const rgbMatchArr = colorStr.match(/\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/i);

        if (Array.isArray(rgbMatchArr) && rgbMatchArr.length > 3) {
            return {
                r: rgbMatchArr[1],
                g: rgbMatchArr[2],
                b: rgbMatchArr[3]
            };
        }

        //check 6-digits hexadecimal case: #ffffff

        const hex6MatchArr = colorStr.match(/#([\dabcdef]{6})/i);

        if (Array.isArray(hex6MatchArr) && hex6MatchArr.length > 1) {
            const color6 = hex6MatchArr[1];
            return {
                r: hexToDecimal(color6.substring(0, 2)),
                g: hexToDecimal(color6.substring(2, 4)),
                b: hexToDecimal(color6.substring(4, 6))
            };
        }

        //check 3-digits hexadecimal case: #fff

        const hex3MatchArr = colorStr.match(/#([\dabcdef]{3})/i);

        if (Array.isArray(hex3MatchArr) && hex3MatchArr.length > 1) {
            const color3 = hex3MatchArr[1];
            return {
                r: hexToDecimal(color3[0] + color3[0]),
                g: hexToDecimal(color3[1] + color3[1]),
                b: hexToDecimal(color3[2] + color3[2])
            };
        }
    }
};

},{}],274:[function(require,module,exports){
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
},{}],275:[function(require,module,exports){
"use strict";

function extend(Parent, Child) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

module.exports = extend;
},{}],276:[function(require,module,exports){
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
},{"dexie":285}],277:[function(require,module,exports){
"use strict";

module.exports = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};
},{}],278:[function(require,module,exports){
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
},{"./dominant-color":274}],279:[function(require,module,exports){
module.exports = function mix(SuperClass) {
    return {
        with: function() {
            return Array.prototype.slice.call(arguments)
                .reduce((c, mixin) => mixin(c), SuperClass);
        }
    };
};

},{}],280:[function(require,module,exports){
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

},{}],281:[function(require,module,exports){
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
},{}],282:[function(require,module,exports){
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
},{"./array-builder":270,"./extend":275,"./url-utils":284}],283:[function(require,module,exports){
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
},{}],284:[function(require,module,exports){
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
},{"normalize-url":287,"punycode":290}],285:[function(require,module,exports){
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
},{}],286:[function(require,module,exports){
'use strict';
var toString = Object.prototype.toString;

module.exports = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};

},{}],287:[function(require,module,exports){
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

},{"object-assign":288,"prepend-http":289,"punycode":290,"query-string":291,"sort-keys":295,"url":297}],288:[function(require,module,exports){
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

},{}],289:[function(require,module,exports){
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

},{}],290:[function(require,module,exports){
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
},{}],291:[function(require,module,exports){
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

},{"strict-uri-encode":296}],292:[function(require,module,exports){
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

},{}],293:[function(require,module,exports){
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

},{}],294:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":292,"./encode":293}],295:[function(require,module,exports){
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

},{"is-plain-obj":286}],296:[function(require,module,exports){
'use strict';
module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

},{}],297:[function(require,module,exports){
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

},{"punycode":290,"querystring":294}]},{},[133]);
