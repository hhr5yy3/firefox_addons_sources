(function() {

    favoritesController.$inject = ['$scope', '$rootScope', '$timeout', 'fetchService', 'userService', 'trackService'];

    function favoritesController($scope, $rootScope, $timeout, fetchService, userService, trackService) {

        window.muzli.pageChange();
        $rootScope.initScrollTracking($scope);
        $rootScope.areHomeImagesLoaded = true;

        trackService.track({
            category: 'Sidebar',
            action: 'Click',
            label: 'Source: favorites'
        });

        $rootScope.feedVisibleClass = 'full-view';
        $rootScope.initialLoading = 'loading-complete';

        fetchService
        .fetch('favorites', 300)
        .then(function(res) {
            
            $scope.items = res.data;

        }).catch(function(error) {

            console.error(error);

            $rootScope.setError($scope, 'error');

        });

        $rootScope.clearAllFavorites = function() {
            userService.clearFavorites();
            $scope.items = [];
            $rootScope.user.favoriteCount = 0;
        }
    }

    config.$inject = ['$httpProvider', '$stateProvider'];

    function config($httpProvider, $stateProvider) {

        $stateProvider.state('favorites', {
            templateUrl: 'modules/user/favorites.html',
            controller: favoritesController
        });

        $httpProvider.interceptors.push(['$q', 'server', '$rootScope', '$injector', 'storage',
          function($q, server, $rootScope, $injector, storage) {

            var token = storage.getSync('token');

            return {

                request: async function(config) {

                    
                    if (config.skipAuth || config.url.indexOf(server()) !== 0) {
                        return config;
                    }
                    
                    // Anonymous users
                    if (!token) {
                        const storageResponse = await storage.get('UUID');
                        config.params = config.params || {};
                        config.params.userId = storageResponse.UUID;
                        return config;
                    }

                    if (config.method === "GET") {
                        config.params = config.params || {};
                        config.params.Authorization = 'Bearer ' + token;
                    } else {
                        config.headers.Authorization = 'Bearer ' + token;
                    }

                    return config;
                },

                responseError: function(rejection) {

                    if (rejection.status === 404) {
                        return $q.reject(rejection);
                    }

                    //Falback to Heroku API if it fails
                    if (window.MUZLI_SERVER_INITIAL !== window.MUZLI_SERVER && rejection.status !== -1 && !rejection.config.isFallback) {

                        console.warn('GAMMA request failed. Falling back to BETA');
                        
                        rejection.config.url = rejection.config.url.replace(window.MUZLI_SERVER, window.MUZLI_SERVER_INITIAL)
                        rejection.config.isFallback = true;

                        window.MUZLI_SERVER = window.MUZLI_SERVER_INITIAL

                        var $http = $injector.get('$http');
                        return $http(rejection.config);
                    }
                    
                    if (rejection.status === 401) {
                        $rootScope.$broadcast('http:401');
                    }

                    return $q.reject(rejection);
                }
            };
        }]);
    }

    run.$inject = ['$state', 'trackService', 'userService', '$rootScope', '$timeout', '$q', 'storage', 'socialService', 'chrome'];

    function run($state, trackService, userService, $rootScope, $timeout, $q, storage, socialService, chromeService) {

        $rootScope.resolveUser = $q.defer();
        $rootScope.vm = $rootScope.vm || {};
        $rootScope.enableGoogleApps = localStorage.enableGoogleApps === 'true';

        /*=============================================
        =            Resolve user from API            =
        =============================================*/

        //Set user from local storage to render UI more fluently
        try {
            $rootScope.user = JSON.parse(localStorage.getItem('user')) || {};
        } catch (e) {
            $rootScope.user = {}
        }

        userService.fetch().then((user) => {

            Object.assign($rootScope.user, user);
            localStorage.setItem('user', JSON.stringify($rootScope.user));

            $rootScope.resolveUser.resolve(user);
            $rootScope.isUserResolved = true;
            $rootScope.areAdsDisabled = user.areAdsDisabled;
            $rootScope.isAdsToggleEnabled = user.referralsActivated >= window.MUZLI_MIN_REFERRALS;

            if (user.id && !user.anonymous) {

                //Init state after user signs up
                switch (window.REGISTERED) {

                    case 'ftx':

                        $rootScope.vm.ftxLeft = ['settings', 'scroll', 'shortcuts', 'sidebar'];

                        // Push corresponding FTX step according to experiment bucket
                        // Enable speed dial view for FTX
                        if (!window.isMuzliSafari) {

                            $rootScope.useSpeedDial = true;

                            userService.setData({
                                useSpeedDial: true,
                                topSitesDisabled: true,
                            });

                            $rootScope.vm.ftxLeft.push('speed-dial');
                        }
                        
                        storage.set({
                            ftxLeft: $rootScope.vm.ftxLeft,
                            showedBundles: true,
                        })

                        if ($rootScope.vm.ftxLeft.indexOf('speed-dial') !== -1) {
                            trackService.track({
                                category: 'Speed dial',
                                action: 'FTX show',
                            });
                        } else {
                            $rootScope.vm.showFtx = 'scroll';
                        }

                        break;

                    case 'favorite':

                        $state.go('favorites');

                    case 'speed-dial':

                        $state.go('speed-dial');

                    //Default tab open w/o redirect from server
                    case undefined:

                        storage.get(['ftxLeft', 'showedBundles', 'useSpeedDial']).then(function (res) {
                            //Set FTX dialogs still left unseen
                            $rootScope.vm.ftxLeft = res.ftxLeft || [];
                        })

                        break;

                    default:

                        storage.set({
                            lastLoginProvider: user.provider.toLowerCase(),
                            lastLogin: new Date().toString(),
                        })

                        break;
                }

                //If user didn't provided email, show error
                if (!window.REGISTERED && user.provider && user.provider.toLowerCase() === 'facebook' && !user.email) {
                    $rootScope.$broadcast('userError', 'missing_email');
                } 

            } 

            //Logged out states
            if (!user.id || user.anonymous) {

                // Break experience if user is installing Muzli for the second time as Lite
                if (window.LITE_ENABLE) {
                    return;
                }

                //Trigger FTX
                storage
                .get(['ftxLeft', 'showedBundles'])
                .then(async (res) => {

                    //Show MOST VISITED FTX id main FTX has passed
                    if (res.showedBundles) {

                        //Set FTX dialogs still left unseen
                        $rootScope.vm.ftxLeft = res.ftxLeft || [];

                        return;
                    }   

                    //Engage FTX
                    if (!res.showedBundles) {

                        // Fallback if user just ignores FTX
                        if (parseInt(localStorage.sessionCounter || '0') > 30) {
                            return;
                        }
                        
                        if ($rootScope.flags?.useSkipFtx) {

                            trackService.trackPageView('/ftx/v3/welcome/skip', 'Welcome Skip Sign in');

                            $rootScope.vm.ftxLeft = ['settings', 'scroll', 'shortcuts', 'sidebar'];


                            if (!window.isMuzliSafari) {
                                
                                $rootScope.useSpeedDial = true;

                                userService.setData({
                                    useSpeedDial: true,
                                    topSitesDisabled: true,
                                });

                                $rootScope.vm.ftxLeft.push('speed-dial');

                                if (chromeService.browserName === 'chrome') {
                                    $rootScope.vm.showKeepItPrepDialog = true;
                                }
                                
                            } 

                            storage.set({
                                ftxLeft: $rootScope.vm.ftxLeft,
                                showedBundles: true,
                            })
                            
                            if ($rootScope.vm.ftxLeft.indexOf('speed-dial') !== -1) {
                                trackService.track({
                                    category: 'Speed dial',
                                    action: 'FTX show',
                                });
                            } else {
                                $rootScope.vm.showFtx = 'scroll';
                            }

                            return;


                        }

                        $rootScope.vm.ftx = true;

                        if (window.isMuzliSafari) {
                            $state.go('safari')
                        } else {
                            $state.go('welcome');
                        }   

                    }
                });

            }

        })



        /*======================================
        =            User functions            =
        ======================================*/

        $rootScope.shareAfterLogin = function(channel) {

            socialService.share(channel, {
                'twitter': 'https://muz.li?utm_source=social&utm_medium=social&utm_campaign=extension_share',
                'facebook': 'https://muz.li?utm_source=social&utm_medium=social&utm_campaign=extension_share',
                'linkedin': 'https://muz.li?utm_source=social&utm_medium=social&utm_campaign=extension_share'
            }[channel], "Lovin' Muzli! Design inspiration on tap. Check it out.");

            trackService.track({
                category: 'Share Promote Dialog',
                action: channel,
                label: 'https://muz.li/'
            });
        };

        $rootScope.clickOutsideBubble = function($event) {
            if ($rootScope.userError) {
                $rootScope.hideUserError = true;
            }
        };

        $rootScope.clickUser = function() {
            
            var user = $rootScope.user;

            if (user.provider && user.provider.toLowerCase() === 'facebook' && !user.email) {
                userService.rerequest();
            } else {
                $state.go('favorites', {}, { reload: true });
            }
        };

        $rootScope.logOut = function() {
            userService.logOut();
        };

        $rootScope.loginFacebook = function(from) {

           if (from) {
            trackService.track({
                category: 'SignIn',
                    action: from,
                label: 'facebook'
            });
            }

            userService.login('facebook');
        };

        $rootScope.loginTwitter = function(from) {

            if (from) {
            trackService.track({
                category: 'SignIn',
                    action: from,
                label: 'twitter'
            });
            }

            userService.login('twitter');
        };

        $rootScope.loginGoogle = function(from) {

            if (from) {
            trackService.track({
                category: 'SignIn',
                    action: from,
                label: 'google'
            });
            }

            userService.login('google');
        };

        function syncLocalToUserData() {

            userService
            .getData()
            .then((user) => {

                const initialUserSettings = {
                    theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'white',
                    enableSharebleLinks: false,
                    enablePalettes: true,
                    enableTrendingTile: true, 
                    halfView: false, 
                    enableShorts: !user.selectedBundle || user.selectedBundle === 'design',
                    defaultSearch: 'muzli',
                    syncSDLinks: user.anonymous ? false : true,
                    searchEngine: 'google',
                    useSpeedDial: $rootScope?.vm?.ftxLeft?.includes('speed-dial'),
                    topSitesDisabled: true,
                    enableGoogleApps: true,
                }

                if (!user) {
                    user = {};
                }

                $('body').removeClass('theme');

                storage.get(Object.keys(initialUserSettings)).then((storageData) => {

                    Object.keys(initialUserSettings).forEach(key => {

                        // Prefer settings that comes from API
                        if (user[key] != null) {
                            $rootScope[key] = user[key]

                            // Override local settings with the ones saved on server, if they don't match
                            if (user[key] != storageData[key]) {
                                console.log('UPDATING LOCAL SETTINGS:', key, user[key])
                                storage.set({
                                    [key]: user[key],
                                })

                                // Update view if it is different from storage one
                                if (key === 'halfView') {
                                    $rootScope.$broadcast('muzliSetView');
                                }
                            }

                        // If API has no settings, try setting them from storage
                        } else if (storageData[key] != null) {
                            $rootScope[key] = storageData[key]

                        // Else fallback to setting defaults
                        } else {

                            // Wait for some flags to resolve to change initial settings based on experiments
                            if (['searchEngine', 'defaultSearch'].includes(key)) {
                                
                                const flagsObserver = $rootScope.$watch('flags', (flags) => {

                                    // Initial search A/B
                                    if (key === 'searchEngine', flags?.useDefaultBing) {
                                        initialUserSettings.searchEngine = 'bing';
                                    }

                                    // Initial search A/B
                                    if (key === 'defaultSearch', flags?.useDefaultWebSearch) {
                                        initialUserSettings.defaultSearch = 'web';
                                    }

                                    // Unregister observer
                                    flagsObserver();

                                    $rootScope[key] = initialUserSettings[key];

                                    storage.set({
                                        [key]: initialUserSettings[key],
                                    })

                                }, true);

                            } else {

                                $rootScope[key] = initialUserSettings[key];
    
                                storage.set({
                                    [key]: initialUserSettings[key],
                                })

                            }
                            

                        }

                    })

                })

            });
        }

        syncLocalToUserData();
    }

    angular.module('user', []).config(config).run(run);

    angular.module('user').controller('emailAuthController', ['$scope', '$rootScope', 'trackService', 'userService',
        
        function ($scope, $rootScope, trackService, userService) {

            function validateEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }

            $scope.state = $rootScope.user.hasUserLogin ? 'sign-in' : 'sign-up';

            $scope.signUpModel = {
                email: '',
                name: '',
                verification: [],
                sendNewsletter: true,
            }

            $scope.isLoading = false;

            $scope.switchState = function (state, $event) {

                if ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                }

                $scope.state = state;
            }

            $scope.emailSignUp = function() {

                trackService.track({
                    category: 'SignIn',
                    action: 'Form Submit',
                });

                $scope.doesNotExist = false;

                if (!$scope.signUpModel.email) {
                    $scope.emptyError = true;
                    return;
                }

                if (!validateEmail($scope.signUpModel.email)) {
                    $scope.badEmail = true;
                    return;
                }

                //Set state to figure out which action user took 
                $scope.signUpModel.action = $scope.state;

                userService
                .loginEmail($scope.signUpModel)
                .then((data) => {
                        
                    if (data.error === 'not_exist') {
                        $scope.doesNotExist = true;
                        return;
                    }

                    //If no error returned, jump to verify state
                    $scope.state = 'verify';


                    // if (item.badLink) {
                    //     $scope.isLoading = false;
                    //     $scope.badUrl = true;
                    // }

                    // if (item.dribbbleProhibited) {
                    //     $scope.isLoading = false;
                    //     $scope.dribbbleProhibited = true;
                    // }

                    // if (item.itemAlreadyExists) {
                    //     $scope.isLoading = false;
                    //     $scope.alreadyExist = true;
                    //     $scope.existingUrl = MUZLI_SEARCH_URL + '/' + btoa(item.itemId).slice(0,10);
                    // }

                    // if (item.id) {
                    //     window.location.href = MUZLI_SEARCH_URL + '/' + btoa(item.id).slice(0,10) + '?success=true';
                    // } else {
                    //     $scope.isLoading = false;
                    // }

                })
            };

            $scope.emailVerify = function(link) {

                trackService.track({
                    category: 'SignIn',
                    action: 'Form Verify',
                });

                $scope.tooManyAttempts = false;
                $scope.badVerification = false;

                if (!$scope.signUpModel.email) {
                    $scope.emptyError = true;
                    return;
                }

                if ($scope.signUpModel.verification.length !== 6) {
                    $scope.badVerification = true;
                    return;
                }

                userService
                .verifyEmail($scope.signUpModel)
                .then((data) => {

                    if (data.error === 'bad_verification') {
                        $scope.badVerification = true;
                        return;
                    }

                    if (data.error === 'too_many_attempts') {
                        $scope.tooManyAttempts = true;
                        $scope.badVerification = false;
                        return;
                    }

                    if (data.status === 'ok' && data.redirect) {
                        window.location = data.redirect;
                        return;
                    }

                })
            };

            $scope.emailResend = function($event) {

                if ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                }

                trackService.track({
                    category: 'SignIn',
                    action: 'Form Resend',
                });

                if (!$scope.signUpModel.email) {
                    $scope.emptyError = true;
                    return;
                }

                if (!validateEmail($scope.signUpModel.email)) {
                    $scope.badEmail = true;
                    return;
                }

                userService
                .loginEmail($scope.signUpModel)
                .then((data) => {

                    if (data.status === 'ok') {

                       $scope.signUpModel.isResending = true;

                       setTimeout(() => {
                           $scope.signUpModel.isResending = false;
                       }, 15 * 1000);

                    }

                })
            };


    }]);


})();
