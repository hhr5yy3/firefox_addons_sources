/*
*   PureVPN
*   by GZ systems Ltd.
*	Everyone is permitted to copy and distribute verbatim copies
*	of this document, but changing it is not allowed.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
*	copyright 2016 All Rights are Reserved.
*/

(function() {
  'use strict';
  //! Load popup data:
  //! Get all the settings and details to show in the popup.
  pVn.getPopupData = function(iTabId, callback) {
    var result = {};
    var onProxyStatus = function(oDetails) {
      result.proxy = oDetails;
      result.levelOfControl = true;
      var domain =
      (pVn.tabs.lists[iTabId]) ?
        pVn.tabs.lists[iTabId].domain : "";
      result.domain = domain;
      result.exception = false;
      result.exceptionList = pVn.whitelisted;
      result.pause = pVn.systemSettings.pause;
      result.active = (oDetails.value.mode === MODE_PAC);
      result.countries = pVn.systemSettings.countries;
      result.channels = pVn.systemSettings.channels;
      result.cities = pVn.systemSettings.cities;
      result.server_list = pVn.systemSettings.server_list;
      result.cities_favourites = pVn.systemSettings.cities_favourites;
      result.city_hostname = pVn.systemSettings.city_hostname;
      result.server_name = pVn.systemSettings.server_name;
      result.city_checksum = pVn.systemSettings.city_checksum;
      result.default_city = pVn.systemSettings.default_city;
      result.favourites = pVn.systemSettings.countries_favourites;
      result.favouritesCities = pVn.systemSettings.cities_favourites;
      result.favouritesChannels = pVn.systemSettings.channels_favourites;
      result.countryCode = result.defaultCountry =
        pVn.systemSettings.default_country;
      result.countryName = (pVn.systemSettings.serverKey === 'countryCode' ||
      pVn.systemSettings.serverKey === 'cityCode' ||
        pVn.systemSettings.serverKey === 'cityServerCode') ?
        pVn.proxy.getCountryName(
          pVn.systemSettings.default_country) : pVn.proxy.getChannelName(
          pVn.systemSettings.default_country);
      result.channelIcon = (pVn.systemSettings.serverKey === 'purposeCode') ?
        pVn.proxy.getChannelIcon(
          pVn.systemSettings.default_country) : '';
      result.isReady = pVn.isReady;
      result.webRtcLeak = pVn.systemSettings.webRtcLeak;
      result.extensionsLists = pVn.extensionsLists;
      result.extensionsDetails = pVn.extensionsDetails;
      result.user_status = pVn.systemSettings.user_status;
      result.clientUserName = pVn.clientUserName;
      result.clientUserId = pVn.clientUserId;
      result.isFirstRun = pVn.isFirstRun;
      result.site_prefs = pVn.systemSettings.site_prefs;
      result.serverKey = pVn.systemSettings.serverKey;
      result.isProxied = pVn.isProxied;
      result.extVersion = pVn.manifest.version;
      result.client_type = pVn.systemSettings.client_type;
      result.verification_state = pVn.systemSettings.verification_state;
      result.userCredentials = {
        username: pVn.systemSettings.user_name,
        password: pVn.systemSettings.password
      };
      result.userEmailCredentials = {
        username: pVn.systemSettings.user_email,
        password: pVn.systemSettings.user_password
      };
      result.socialLoginStatus = pVn.getSocial;
      result.socialLogins = pVn.systemSettings.socialLogins;
      result.showSignupScreen = pVn.showSignupScreen;
      result.cTaSummarytextChangeState =
       pVn.systemSettings.cTaSummarytextChangeState;
      result.bannerCampaignData = pVn.systemSettings.bannerCampaignData;
      result.signUpError = pVn.signUpError;
      result.showSignUpLoader = pVn.showSignUpLoader;
      result.channelTooltipDetail = pVn.systemSettings.channelToolTiptext_Link;
      result.countryTooltipDetail = pVn.systemSettings.countryToolTiptext_Link;
      result.autoLoginFailedMsg = pVn.autoLoginFailedMsg;
      if (result.client_type === CLIENT_TYPE_FREE) {
        result.campaignData = (pVn.systemSettings.campaignData &&
         pVn.systemSettings.campaignData.popups) ?
          pVn.systemSettings.campaignData.popups : '';
      }
      result.showCampaign = pVn.systemSettings.showCampaign;
      result.showBannerCampaign = pVn.systemSettings.showBannerCampaign;
      result.campaignPopupCount = pVn.systemSettings.campaignPopupCount;
      result.userSignupDetail = pVn.clientSignupDetail;
      result.proxyAutoConnect = pVn.systemSettings.proxyAutoConnect;
      result.allowWhitelistedHosts = pVn.systemSettings.allowWhitelistedHosts;
      result.whitelistedHosts = pVn.systemSettings.whitelistedHosts;
      result.user_unique_id = pVn.systemSettings.user_unique_id;
      result.user_os = pVn.systemSettings.user_os;
      result.first_connect = pVn.systemSettings.first_connect;
      result.proxy_user_unique_id = pVn.systemSettings.proxy_user_unique_id;
      result.country_checksum = pVn.systemSettings.country_checksum;
      result.channel_checksum = pVn.systemSettings.channel_checksum;
      result.missed_events = pVn.systemSettings.missed_events;
      result.user_gateway = pVn.systemSettings.user_gateway;
      result.vpnusernames = pVn.systemSettings.vpnusernames;
      result.allow_multiuser = pVn.systemSettings.allow_multiuser;
      result.use_cloudfront_domain = pVn.systemSettings.use_cloudfront_domain;
      result.user_email = pVn.systemSettings.user_email;
      result.billing_cycle = pVn.systemSettings.billing_cycle;
      result.refer_frnd_avl = pVn.systemSettings.refer_frnd_avl;
      result.refer_frnd_sent = pVn.systemSettings.refer_frnd_sent;
      result.refer_link = pVn.systemSettings.refer_link;
      result.locationSpoofing = pVn.systemSettings.locationSpoofing;
      result.latitude = pVn.systemSettings.latitude;
      result.longitude = pVn.systemSettings.longitude;
      result.spoofingToggle = pVn.systemSettings.spoofingToggle;
      result.webRtcToggle = pVn.systemSettings.webRtcToggle;
      result.desired_outcome = pVn.systemSettings.desired_outcome;
      result.current_session = pVn.systemSettings.current_session;
      result.user_expiry_date = pVn.systemSettings.user_expiry_date;
      //! send back the result to callback
      callback(result);
      return;
    };
    pVn.unblocker.get(onProxyStatus);
  };

  //! toggle service on/off
  pVn.switchServices = function(callback) {
    if (!callback || typeof callback !== "function") {
      callback = pVn.nofunc;
    }
    var finalCallBack = function() {
      pVn.webRtcLeak(callback);
    };
    var onCallback = function() {
      pVn.setUninstallUrl(finalCallBack);
    };
    var getBannerCampaign = function() {
      pVn.bannerCampaign.get();
    };
    var getCampaign = function() {
      pVn.popupCampaign.get();
    };
    var getToolTip = function() {
      pVn.proxy.getToolTipDetails(onCallback);
    };
    var onGetCountries = function() {
      if (pVn.systemSettings.client_type === CLIENT_TYPE_FREE) {
        pVn.proxy.getChannels(getToolTip);
      } else {
        getBannerCampaign();
        pVn.proxy.getChannels(onCallback);
        pVn.proxy.getCities(onCallback);
      }
    };
    var onLoggedInCallback = function() {
      pVn.proxy.getCountries(onGetCountries);
      //pVn.proxy.sendMissedEvents();
      if (pVn.systemSettings.client_type === CLIENT_TYPE_FREE) {
        getCampaign();
        getBannerCampaign();
      }
    };
    pVn.isReady = !(pVn.systemSettings.user_name === "");
    if (pVn.isReady === false) {
      pVn.isFirstRun = true;
      pVn.serviceStop(onCallback);
      return;
    }
    if (pVn.isLoggedIn === false || (
      pVn.isFirstRun === false && pVn.isEmpty(pVn.systemSettings.site_prefs))) {
      onLoggedInCallback();
      return;
    }
    pVn.isFirstRun = false;
    pVn.unblocker.unblock(onLoggedInCallback);
  };

  //! Service Stop
  pVn.serviceStop = function(callback) {
    pVn.isReady = false;
    pVn.unblocker.clear(callback);
  };

  //! call on startup - everytime browser open
  //! Load saved settings and preferences
  pVn.starter = function() {
    // apply default country settings here if found.
    var onAuth = function() {
      if (pVn.isFirstRun) {
        pVn.checkFeedBackStatus = true;
        pVn.storage.set({feedBackStatus: pVn.checkFeedBackStatus}, pVn.nofunc);
      }
      chrome.alarms.get('switchServices', a => {
        if (a) chrome.alarms.clear('switchServices');
        chrome.alarms.create('switchServices', { delayInMinutes: 0.03 });
      });
    };
    //! get auth
    var getAuth = function() {
      //! set Access token
      pVn.auth.refreshAccessToken(onAuth);
    };
    var bindTabs = function() {
      pVn.tabs.bindTabs(getAuth);
    };
    
    var onDFChecker = function() {
      pVn.updateVersion(bindTabs);
    };

    //! set default settings
    var getAllReady = function(oSettings) {
      // all saved storage
      pVn.systemSettings = oSettings;
      if (pVn.systemSettings.proxy_user_unique_id === "" ||
        pVn.systemSettings.proxy_user_unique_id === undefined) {
        pVn.proxy.setProxyUniqueUserId();
      }
      if (pVn.systemSettings.user_id !== "") {
        pVn.clientUserId = pVn.systemSettings.user_id;
      }
      pVn.checkFeedBackStatus = pVn.systemSettings.feedBackStatus;
      chrome.runtime.getPlatformInfo(pVn.proxy.setUserOs);
      //! check domain fronting
      pVn.domainFrontingChecker(onDFChecker);
    };

    var installer = function() {
      // console.log("starter > installer");
      pVn.settingsDefault = pVn.obClone(pVn.systemSettings);
      //! Dafault settings
      pVn.defaultOptions = Object.create(null);
      Object.keys(pVn.systemSettings).forEach(function(key) {
        pVn.defaultOptions[key] = pVn.settingsDefault[key];
      });
      // console.log("defaultOptions > installer:%o", pVn.defaultOptions);
      pVn.data.set(pVn.defaultOptions, getAllReady);
    };
    var onStart = function(oSettings) {
      if (pVn.isEmpty(oSettings) !== false) {
        installer();
        pVn.tabs.openLink(EXT_WELCOME_URL);
        return;
      }
      pVn.isFirstRun = false;
      getAllReady(oSettings);
    };
    // ! Load configs
    //chrome.storage.local.set({fa_migrated: true});
    pVn.storage.get(pVn.basicOptions, onStart);
  };

  //! Get subscription (Account Type) Details
  pVn.getSubscriptionsDetails = function(callback) {
    if (!callback || typeof callback !== "function") {
      callback = pVn.nofunc;
    }
    var oResponse = {};
    var previousType = pVn.systemSettings.client_type;
    var returnUserStatus = function(userStatus) {
      callback(userStatus);
    };
    var onFinish = function() {
      oResponse = {
        status: pVn.systemSettings.client_type
      };
      returnUserStatus(oResponse);
    };
    var onAuth = function() {
      // pVn.systemSettings.client_type = 'paid';
      if (previousType === pVn.systemSettings.client_type) {
        onFinish();
      } else {
        pVn.unblocker.unblock(onFinish);
      }
    };
    if (pVn.systemSettings.client_type === CLIENT_TYPE_PAID) {
      onFinish();
    } else if (pVn.checkUserStatus === true) {
      pVn.auth.refreshAccessToken(onAuth);
      var setToDefault = function() {
        pVn.checkUserStatus = true;
      };
      pVn.checkUserStatus = false;
      var timeToRevert = TIMEOUT_CHECK_USER_STATUS;
      setTimeout(setToDefault, timeToRevert);
    } else {
      onFinish();
    }
  };

  //! WebRtc Leak
  // # WebRTC IP handling policy (Firefox 54+)
  // # Setting:
  // # 1- Use the default public interface only
  // # 2- Use the default public interface and private interface
  // # 3- Disable non-proxied UDP
  pVn.webRtcLeak = function(callback) {
    if (!callback || typeof callback !== "function") {
      callback = pVn.nofunc;
    }
    var status = !pVn.systemSettings.webRtcLeak;
    var config;
    config = (status === false ?
      'proxy_only' : 'default_public_interface_only');
    browser.privacy.network.webRTCIPHandlingPolicy.set({
      value: config
    }, callback);
  };

  //! Click on SKIP button on session rating
  pVn.feedbackSkipButton = function(callback) {
    pVn.systemSettings.desired_outcome.showThankYouMessage = true;
    pVn.systemSettings.current_session.sessionRatingMessageProvided = false;
    // Update local storage
    pVn.storage.set(
      {
        desired_outcome: pVn.systemSettings.desired_outcome,
        current_session: pVn.systemSettings.current_session
      },
      callback(pVn.systemSettings.desired_outcome)
    );
  };
  pVn.submitFeedbackFormResult = function(data, callback) {
    // Update show feedback form status to false.
    pVn.systemSettings.desired_outcome.showFeedbackForm = false;
    pVn.systemSettings.desired_outcome.showThankYouMessage = true;
    pVn.systemSettings.current_session.sessionRatingMessageProvided = true;

    // Update local storage
    pVn.storage.set(
      {
        desired_outcome: pVn.systemSettings.desired_outcome,
        current_session: pVn.systemSettings.current_session
      },
      callback(pVn.systemSettings.desired_outcome)
    );
  };
  pVn.updateDesireOutcome = function(status, options, callback) {
    // Update DO in Settings.
    let extraData = {};
    pVn.systemSettings.desired_outcome.global = true;
    pVn.systemSettings.current_session.desiredOutcomeMessageProvided = true;
    pVn.systemSettings.desiredOutcomeMessageUserInteraction = true;
    // pVn.systemSettings.current_session.desiredOutcomeMessageUserInteraction = true;

    // If status is thumbs up = true
    if (status) {
      // Update feedback visibility status
      pVn.systemSettings.desired_outcome.showFeedbackForm = false;
      // Send Mixpanel Event.
      pVn.proxyPanelNotifications('ProxyExtension_DO', {
        prompt_type: "Yes"
      });
      let userSignupWeek = pVn.userSignupWeeksCheck();
      extraData = pVn.systemSettings.desired_outcome;
      extraData.userSignupWeek = userSignupWeek;
    } else { // If status is thumbs down = false
      // Update feedback visibility status
      // Update feedback visibility status
      pVn.systemSettings.desired_outcome.showFeedbackForm = true;
      extraData = pVn.systemSettings.desired_outcome;
    }
    extraData.rating = status;

    // Update local storage
    pVn.storage.set(
      {
        desired_outcome: pVn.systemSettings.desired_outcome,
        current_session: pVn.systemSettings.current_session
      },
      callback(extraData)
    );
  };
  pVn.updateSessionRating = function(status, options, callback) {
    // Update session rating in Settings.
    pVn.systemSettings.desired_outcome.sessionRating = status;
    // pVn.systemSettings.current_session.sessionRatingMessageUserInteraction = true;
    // If status is thumbs up = true
    if (status) {
      pVn.systemSettings.desired_outcome.showFeedbackForm = false;
    } else { // If status is thumbs down = false
      // Update feedback visibility status
      pVn.systemSettings.desired_outcome.showFeedbackForm = true;
    }
    let extraData = {};
    let userSignupWeek = pVn.userSignupWeeksCheck();
    extraData = pVn.systemSettings.desired_outcome;
    extraData.userSignupWeek = userSignupWeek;

    // Update local storage
    pVn.storage.set(
      {
        desired_outcome: pVn.systemSettings.desired_outcome,
        current_session: pVn.systemSettings.current_session
      },
      callback(extraData)
    );
  };
  pVn.userSignupWeeksCount = function() {
    let signupDateDiff = null;
    if (pVn.systemSettings.user_signup_date &&
      pVn.systemSettings.user_signup_date !== "") {
      // Get signup difference
      signupDateDiff = pVn.getWeeksBetweenTimestamps(
        new Date(),
        new Date(parseInt(
          pVn.systemSettings.user_signup_date,
          10) * 1000)
      );
    }
    return signupDateDiff;
  };
  pVn.updateSessionRatingMessageUserInteraction = function(status, callback) {
    pVn.systemSettings.current_session.sessionRatingMessageUserInteraction =
      status;
    // Update local storage
    pVn.storage.set(
      {
        current_session: pVn.systemSettings.current_session
      },
      callback()
    );
  };
  pVn.disconnectSessionRatingCheck = function(callback) {
    // Get signup difference
    let signupDateDiff = pVn.userSignupWeeksCount();
    callback(signupDateDiff);
  };
  pVn.userSignupWeeksCheck = function() {
    let userSignupWeek = null;
    if (pVn.systemSettings.user_signup_date) {
      // Get signup difference
      let signupDateDiff = pVn.userSignupWeeksCount();
      userSignupWeek = signupDateDiff;
      if (signupDateDiff !== null && signupDateDiff >= 5) {
        if (pVn.systemSettings.desired_outcome.twentyPercentRequirement <= 2) {
          pVn.systemSettings.desired_outcome.showThankYouMessage = false;
          // User has not rated us before
          if (
            !pVn.systemSettings.desired_outcome.hasRatedBefore ||
            pVn.systemSettings.desired_outcome.askForStoreRating
          ) {
            // @ToDo update hasRatedBefore value
            pVn.systemSettings.desired_outcome.askForStoreRating = true;
            // Show thank you message.
            pVn.systemSettings.desired_outcome.showThankYouMessage = true;
          } else if (!pVn.systemSettings.desired_outcome.hasReferredAFriend) {
            // Check if user have referred a friend before if not show referred a friend screen.
            pVn.systemSettings.desired_outcome.showReferredAFriend = true;
            // Show thank you message.
            pVn.systemSettings.desired_outcome.showThankYouMessage = true;
          }
        } else {
          pVn.systemSettings.desired_outcome.askForStoreRating = false;
          // Show thank you message.
          pVn.systemSettings.desired_outcome.showThankYouMessage = true;
        }
      } else {
        pVn.systemSettings.desired_outcome.askForStoreRating = false;
        // Show thank you message.
        pVn.systemSettings.desired_outcome.showThankYouMessage = true;
      }
    }
    return userSignupWeek;
  };
  pVn.updateStoreRatePopup = function(value, callback) {
    switch (value) {
      case "YES":
        pVn.systemSettings.desired_outcome.hasRatedBefore = true;
        pVn.systemSettings.desired_outcome.askForStoreRating = false;
        pVn.systemSettings.current_session.sessionRatingMessageProvided = true;
        break;
      case "CLOSE":
        pVn.systemSettings.desired_outcome.hasRatedBefore = true;
        pVn.systemSettings.desired_outcome.askForStoreRating = false;
        break;
      default:
        pVn.systemSettings.desired_outcome.hasRatedBefore = true;
        pVn.systemSettings.desired_outcome.askForStoreRating = false;
        break;
    }
    // Default show thank you message either thumbs up or down.
    pVn.systemSettings.desired_outcome.showThankYouMessage = true;
    let data = pVn.systemSettings.desired_outcome;
    data.button_value = value;
    // Update local storage
    pVn.storage.set(
      {
        desired_outcome: pVn.systemSettings.desired_outcome,
        current_session: pVn.systemSettings.current_session
      },
      callback(data)
    );
  };
  pVn.talkToSupportPopup = function(value, callback) {
    // Default show thank you message.
    pVn.systemSettings.desired_outcome.showThankYouMessage = true;
    pVn.systemSettings.current_session.sessionRatingMessageProvided = true;
    let data = pVn.systemSettings.desired_outcome;
    data.button_value = value;
    data.sessionRatingMessageProvided = pVn.systemSettings.current_session.sessionRatingMessageProvided;
    // Update local storage
    pVn.storage.set(
      {
        desired_outcome: pVn.systemSettings.desired_outcome,
        current_session: pVn.systemSettings.current_session
      },
      callback(data)
    );
  };
  pVn.updateReferAFriendPopup = function(value, link, callback) {
    switch (value) {
      case "COPY LINK":
        pVn.systemSettings.desired_outcome.hasReferredAFriend = true;
        pVn.systemSettings.desired_outcome.showReferredAFriend = false;
        pVn.systemSettings.current_session.sessionRatingMessageProvided = true;
        break;
      case "CLOSE":
        pVn.systemSettings.desired_outcome.hasReferredAFriend = false;
        pVn.systemSettings.desired_outcome.showReferredAFriend = true;
        break;
      default:
        pVn.systemSettings.desired_outcome.hasReferredAFriend = false;
        pVn.systemSettings.desired_outcome.showReferredAFriend = false;
        break;
    }
    // Default show thank you message either thumbs up or down.
    pVn.systemSettings.desired_outcome.showThankYouMessage = true;
    let data = pVn.systemSettings.desired_outcome;
    data.button_value = value;
    data.button_link = link;

    // Update local storage
    pVn.storage.set(
      {
        desired_outcome: pVn.systemSettings.desired_outcome,
        current_session: pVn.systemSettings.current_session
      },
      callback(data)
    );
  };
  pVn.updateCurrentSession = function(connectionStatus, callback) {
    pVn.systemSettings.current_session.hasRatedSession = false;
    pVn.systemSettings.current_session.disconnectedStarted = false;
    let count = pVn.systemSettings.current_session.counter;
    pVn.systemSettings.current_session.counter = count + 1;
    if (!connectionStatus) { // Is Disconnected
      pVn.systemSettings.current_session.counter = count;
      // Has user rated the session (DO or Rating) if yes than update.
      if (
        pVn.systemSettings.current_session.sessionRatingMessageProvided ||
        pVn.systemSettings.current_session.desiredOutcomeMessageProvided
      ) {
        pVn.systemSettings.current_session.hasRatedSession = true;
      }
      pVn.systemSettings.current_session.desiredOutcomeMessageProvided = false;
      pVn.systemSettings.current_session.sessionRatingMessageProvided = false;
      pVn.systemSettings.current_session.sessionRatingMessageUserInteraction =
        false;
      pVn.systemSettings.current_session.desiredOutcomeMessageUserInteraction =
        false;
      pVn.systemSettings.desired_outcome.showThankYouMessage = false;
      pVn.systemSettings.desired_outcome.showReferredAFriend = false;
      pVn.systemSettings.current_session.disconnectedStarted = true;
    }
    pVn.systemSettings.desired_outcome.twentyPercentRequirement =
      Math.floor((Math.random() * 10) + 1);
    pVn.storage.set(
      {
        desired_outcome: pVn.systemSettings.desired_outcome,
        current_session: pVn.systemSettings.current_session
      }, callback(pVn.systemSettings.current_session.disconnectedStarted)
    );
  };

  //! Set WebRTC
  pVn.setWebRTC = function(bState, callback) {
    pVn.systemSettings.webRtcLeak = bState;
    pVn.systemSettings.webRtcToggle = true;
    var onSet = function() {
      pVn.webRtcLeak(callback);
    };
    pVn.storage.set({webRtcLeak: bState}, onSet);
  };
  pVn.locationSpoofing = function(callback) {
    if (!callback || typeof callback !== "function") {
      callback = pVn.nofunc;
    }
    var onGet = function(oResponse) {
      pVn.systemSettings.locationSpoofing = oResponse.locationSpoofing;
      callback();
    };
    pVn.storage.get("locationSpoofing", onGet);
  };
  //! Set location spoofing
  pVn.setLocationSpoofing = function(bState, callback) {
    pVn.systemSettings.locationSpoofing = bState;
    pVn.systemSettings.spoofingToggle = true;
    var onSet = function() {
      callback();
    };
    pVn.storage.set({
      locationSpoofing: bState,
      spoofingToggle: pVn.systemSettings.spoofingToggle
    }, onSet);
  };

  pVn.toggleLocationSpoofing = function(bState, callback) {
    pVn.systemSettings.spoofingToggle = bState;
    var onSet = function() {
      callback();
    };
    pVn.storage.set({
      spoofingToggle: bState
    }, onSet);
  };

  pVn.toggleWebRtc = function(bState, callback) {
    pVn.systemSettings.webRtcToggle = bState;
    var onSet = function() {
      callback();
    };
    pVn.storage.set({
      webRtcToggle: bState
    }, onSet);
  };

  //! Make us happy Clicked
  pVn.makeUsHappy = function(callback) {
    if (!callback || typeof callback !== "function") {
      callback = pVn.nofunc;
    }
    pVn.makeUsHappyBtn = true;
    chrome.tabs.create({url: STORE_FEEDBACK_URL}, callback);
  };
  /* Explanation
  *  Its open feedback page and reset all condition parameters
  */
  pVn.feedbackRatings = function() {
    // console.log("open page");
    pVn.systemSettings.noOfConnection = 0;
    pVn.storage.set({
      noOfConnection: pVn.systemSettings.noOfConnection
    }, pVn.nofunc);
    pVn.systemSettings.feedBackStatus = pVn.checkFeedBackStatus = false;
    pVn.storage.set({feedBackStatus: pVn.checkFeedBackStatus}, pVn.nofunc);
    clearTimeout(pVn.proxyConnectionInterval);
    var FeedbackUrl = pVn.extUrl(FEEDBACK_URL);
    chrome.tabs.create({url: FeedbackUrl, active: false}, function(response) {
      pVn.tabId = response.id;
    });
  };
  pVn.feedbackSubmit = function(oRatingData) {
    if (oRatingData && pVn.isEmpty(oRatingData) === false) {
      pVn.proxyPanelNotifications('ProxyExtension_Feedback', oRatingData);
      if (oRatingData.feedbackRating === "" ||
        typeof oRatingData.feedbackRating === "undefined") {
        // console.log("here");
        return;
      }
      oRatingData.currentDate = pVn.makeDate();
      // Explanation: set time to one or three month to get feedback again
      oRatingData.updateDate = pVn.makeDate(3650);

      if (oRatingData.hasOwnProperty('feedbackTitle') === false) {
        oRatingData.feedbackTitle = "";
      }
      if (oRatingData.hasOwnProperty('feedbackDescription') === false) {
        oRatingData.feedbackDescription = "";
      }
      pVn.oPopFeedback = oRatingData;
      pVn.systemSettings.feedbackData = pVn.oPopFeedback;

      pVn.storage.set(
        {feedbackData: pVn.systemSettings.feedbackData}, pVn.nofunc);
    }
  };

  //! non fa to fa migration
  pVn.jwtToFusionAuthMigration = async function(callback) {
    if (!callback) {
      callback = pVn.nofunc;
    }
    //! if already updated, lets get out of here
    if (pVn.systemSettings.fa_migrated) {
      callback();
      return;
    }
    //! call the refresh import api
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('fa_user_id', pVn.systemSettings.user_id);
    urlEncodedData.append('fa_app_id', FUSION_AUTH_CLIENT_ID);
    const importOldToken = await fetch(IMPORT_REFRESH_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        "x-auth-token":  pVn.systemSettings.access_token,
        "x-refresh-token": pVn.systemSettings.refresh_token
      },
      body: urlEncodedData
    });

    //! when refresh token update failed
    if (!importOldToken.ok) {
      pVn.systemSettings.fa_migrated = false;
    } else {
      pVn.systemSettings.access_token_time = pVn.makeTime(1);
      pVn.systemSettings.fa_migrated = true;
    }

    const importOldTokenResponse = await importOldToken.json();

    setTimeout(function(){
      pVn.proxyPanelNotifications('ProxyExtension_FusionAuth_Migration', {
        fa_migration_status: pVn.systemSettings.fa_migrated,
        fa_migration_api_response: importOldTokenResponse
      });
    }, 30000);

    //console.log("access_token_time:%s, fa_migrated:%s", pVn.systemSettings.access_token_time, pVn.systemSettings.fa_migrated);

    pVn.storage.set(
      {
        fa_migrated: pVn.systemSettings.fa_migrated,
        access_token_time: pVn.systemSettings.access_token_time
      }, callback
    );
  }

  pVn.domainFrontingChecker = async (callback) => {
    if (!callback) {
      callback = pVn.nofunc;
    }

    //! exist if FA url is already set
    if(pVn.systemSettings.fa_url != "") {
      callback();
      return;
    }

    try {
      const request = await fetch("https://auth.purevpn.com", {method: 'HEAD'});
      //! 500 means api is working
      if (request.status == 200) {
        pVn.systemSettings.use_cloudfront_domain = false;
        pVn.systemSettings.fa_url = FUSION_AUTH_URL; 
      } else {
        pVn.systemSettings.fa_url = FUSION_AUTH_DF_URL;
        pVn.systemSettings.use_cloudfront_domain = true;
      }
    } catch (e) {
      pVn.systemSettings.fa_url = FUSION_AUTH_DF_URL;
      pVn.systemSettings.use_cloudfront_domain = true;
    }
    //const response = await request.json();
    //console.log("code:%s, request:%o, response:%o", request.status, request, response);
    pVn.storage.set({
      use_cloudfront_domain: pVn.systemSettings.use_cloudfront_domain,
      fa_url: pVn.systemSettings.fa_url
    }, callback);
  }; 

  //! update extension version
  pVn.updateVersion = async function(callback) {
    if (!callback || typeof callback !== "function") {
      callback = pVn.nofunc;
    }
    if (pVn.manifest.version === pVn.systemSettings.version) {
      callback();
      return;
    }
    //! Set feedback status to false | upgrade user should not submit the form
    pVn.systemSettings.feedBackStatus = pVn.checkFeedBackStatus = false;
    //! v3.0.0 add channel list
    if (pVn.systemSettings.version.startsWith("1.")) {
      var onGetChannels = function() {
        pVn.storage.set({
          version: pVn.manifest.version,
          serverKey: pVn.systemSettings.serverKey,
          channels_favourites: pVn.systemSettings.channels_favourites,
          client_type: pVn.systemSettings.client_type,
          feedBackStatus: pVn.checkFeedBackStatus
        }, callback);
      };
      pVn.systemSettings.serverKey = 'countryCode';
      pVn.systemSettings.channels_favourites = [];
      if (pVn.systemSettings.user_name.startsWith("purevpn0s") ||
          pVn.systemSettings.user_name.startsWith("purevpn0d")) {
        pVn.systemSettings.client_type = 'paid';
      }
      pVn.proxy.getChannels(onGetChannels);
    } else {
      //! update the old refresh token for 0auth2
      if (pVn.systemSettings.user_id && pVn.systemSettings.refresh_token !== "") {
        // FA migration
        pVn.jwtToFusionAuthMigration();
      }

      pVn.systemSettings.proxyAutoConnect = true;

      if (!pVn.systemSettings.whitelistedHosts) {
        pVn.systemSettings.whitelistedHosts = [];
      }
      if (!pVn.systemSettings.allowWhitelistedHosts) {
        pVn.systemSettings.allowWhitelistedHosts = false;
      }
      if (!pVn.systemSettings.user_os) {
        pVn.systemSettings.user_os = "";
        chrome.runtime.getPlatformInfo(pVn.proxy.setUserOs);
      }
      if (!pVn.systemSettings.user_unique_id) {
        pVn.systemSettings.user_unique_id = "";
      }
      if (!pVn.systemSettings.first_connect) {
        pVn.systemSettings.first_connect = 0;
        pVn.systemSettings.first_connect_username =
        pVn.systemSettings.user_name;
      }
      if (!pVn.systemSettings.showBannerCampaign) {
        pVn.systemSettings.showBannerCampaign = true;
      }

      if (!pVn.systemSettings.session_id) {
        pVn.systemSettings.session_id = "";
      }

      if (!pVn.systemSettings.session_time) {
        pVn.systemSettings.session_time = "";
      }

      pVn.systemSettings.access_token = "";
      pVn.systemSettings.access_token_time = "";

      if (!pVn.systemSettings.country_checksum) {
        pVn.systemSettings.country_checksum = "";
      }

      if (!pVn.systemSettings.channel_checksum) {
        pVn.systemSettings.channel_checksum = "";
      }

      if (!pVn.systemSettings.user_password) {
        pVn.systemSettings.user_password = "";
      }

      if (!pVn.systemSettings.missed_events) {
        pVn.systemSettings.missed_events = [];
      }

      if (!pVn.systemSettings.user_gateway) {
        pVn.systemSettings.user_gateway = "";
      }

      if (!pVn.systemSettings.vpnusernames) {
        pVn.systemSettings.vpnusernames = [];
      }

      if (!pVn.systemSettings.allow_multiuser) {
        pVn.systemSettings.allow_multiuser = true;
      }

      if (!pVn.systemSettings.use_cloudfront_domain) {
        pVn.systemSettings.use_cloudfront_domain = false;
      }

      if (!pVn.systemSettings.user_email) {
        pVn.systemSettings.user_email = "";
      }

      if (!pVn.systemSettings.billing_cycle) {
        pVn.systemSettings.billing_cycle = "";
      }

      if (!pVn.systemSettings.cities) {
        pVn.systemSettings.cities = {};
      }

      if (!pVn.systemSettings.cities_favourites) {
        pVn.systemSettings.cities_favourites = [];
      }

      if (!pVn.systemSettings.default_city) {
        pVn.systemSettings.default_city = "";
      }

      if (!pVn.systemSettings.city_checksum) {
        pVn.systemSettings.city_checksum = "";
      }

      if (!pVn.systemSettings.desired_outcome) {
        pVn.systemSettings.desired_outcome = {
          global: false,
          last_session: false,
          showFeedbackForm: false,
          sessionRating: false,
          hasRatedBefore: false,
          askForStoreRating: false,
          hasReferredAFriend: false,
          showReferredAFriend: false,
          twentyPercentRequirement: Math.floor((Math.random() * 10) + 1),
          current_session: false,
          showThankYouMessage: false
        };
      }

      if (!pVn.systemSettings.current_session) {
        pVn.systemSettings.current_session = {
          desiredOutcomeMessageProvided: false,
          desiredOutcomeMessageUserInteraction: false,
          sessionRatingMessageProvided: false,
          sessionRatingMessageUserInteraction: false,
          hasRatedSession: false,
          disconnectedStarted: false,
          counter: 0
        };
      }

      if (!pVn.systemSettings.user_signup_date) {
        pVn.systemSettings.user_signup_date = Date.now();
      }

      if (!pVn.systemSettings.user_expiry_date) {
        pVn.systemSettings.user_expiry_date = '';
      }

      pVn.storage.set({
        version: pVn.manifest.version,
        feedBackStatus: pVn.checkFeedBackStatus,
        proxyAutoConnect: pVn.systemSettings.proxyAutoConnect,
        allowWhitelistedHosts: pVn.systemSettings.allowWhitelistedHosts,
        whitelistedHosts: pVn.systemSettings.whitelistedHosts,
        user_unique_id: pVn.systemSettings.user_unique_id,
        user_os: pVn.systemSettings.user_os,
        first_connect: pVn.systemSettings.first_connect,
        first_connect_username: pVn.systemSettings.first_connect_username,
        showBannerCampaign: pVn.systemSettings.showBannerCampaign,
        session_id: pVn.systemSettings.session_id,
        session_time: pVn.systemSettings.session_time,
        country_checksum: pVn.systemSettings.country_checksum,
        channel_checksum: pVn.systemSettings.channel_checksum,
        user_password: pVn.systemSettings.user_password,
        missed_events: pVn.systemSettings.missed_events,
        user_gateway: pVn.systemSettings.user_gateway,
        vpnusernames: pVn.systemSettings.vpnusernames,
        allow_multiuser: pVn.systemSettings.allow_multiuser,
        use_cloudfront_domain: pVn.systemSettings.use_cloudfront_domain,
        user_email: pVn.systemSettings.user_email,
        billing_cycle: pVn.systemSettings.billing_cycle,
        cities: pVn.systemSettings.cities,
        cities_favourites: pVn.systemSettings.cities_favourites,
        city_checksum: pVn.systemSettings.city_checksum,
        default_city: pVn.systemSettings.default_city,
        desired_outcome: pVn.systemSettings.desired_outcome,
        user_signup_date: pVn.systemSettings.user_signup_date,
        current_session: pVn.systemSettings.current_session,
        user_expiry_date: pVn.systemSettings.user_expiry_date
      }, callback);
    }
  };

  //! extension uninstall
  pVn.uninstall = function(callback) {
    if (!callback || typeof callback !== 'function') {
      callback = pVn.nofunc;
    }
    var onUninstall = function() {
      // //console.log("on uninstall ");
      if (chrome.runtime.lastError) {
        // //console.log("error > error:%o", chrome.runtime.lastError);
      }
      pVn.storage.get(null, function(oSettings) {
        if (pVn.isEmpty(oSettings)) {
          pVn.setIconBadge(false, 0);
          callback();
        } else {
          pVn.storage.clear(onUninstall);
        }
      });
    };
    pVn.storage.clear(onUninstall);
  };

  //! Service check
  pVn.isServiceAvailable = function(callbackSuccess, callbackError) {
    var img = document.createElement("img");
    img.onload = callbackSuccess;
    img.onerror = callbackError;
    img.src = EXT_PING_URL + (Math.floor(Math.random() * 1000000000));
  };

  //! Offline mode
  pVn.offlineMode = function(callback) {
    // console.log("OFFLINE MODE > INIT");
    var offlinePort = chrome.runtime.connect({name: "offlineStatus"});
    var offlineInterval = setInterval(function() {
      var img = document.createElement("img");

      img.onload = function() {
        // //console.log("OFFLINE MODE > onload");
        clearInterval(offlineInterval);
        pVn.isOnline = true;
        if (chrome.extension.getViews({type: "popup"}).length > 0) {
          try {
            offlinePort.postMessage({isOnline: pVn.isOnline});
          } catch (e) {
            offlinePort.disconnect();
          }
        }

        callback();
        return;
      };

      img.src = EXT_PING_URL + (Math.floor(Math.random() * 1000000000));
    }, 3000);

    offlinePort.postMessage({isOnline: pVn.isOnline});
  };

  pVn.proxyPanelNotifications = function(sNotificationName, oParams, callback) {
    //! confirm the notification name and parameters are not empty
    if (!sNotificationName || sNotificationName === "") {
      return;
    }
    if (!callback || typeof callback !== 'function') {
      callback = pVn.nofunc;
    }
    if ((oParams === null ||
        typeof oParams !== 'object' ||
        pVn.isEmpty(oParams) === true)) {
      oParams = {};
    }
    //! Get default options Object.assign
    var oDefaultParams = Object.assign({
      eventName: sNotificationName}, pVn.appData(), oParams);
    // console.log(oDefaultParams);
    if (oDefaultParams.hasOwnProperty("user_name") === false &&
         (pVn.systemSettings.user_name || pVn.clientUserName)) {
      oDefaultParams.userName = pVn.clientUserName ||
      pVn.systemSettings.user_name;
    }

    if (oDefaultParams.hasOwnProperty("user_id") === false) {
      oDefaultParams.userId = pVn.systemSettings.user_id ||
        pVn.clientUserId || pVn.gaId || chrome.runtime.id;
    }
    if (pVn.systemSettings.client_type) {
      oDefaultParams.client_type = pVn.systemSettings.client_type;
    }
    var onNotifyResponse = function(oResponse) {
      var oNotificationData = {};
      try {
        oNotificationData = JSON.parse(oResponse.content);
      } catch (e) {
        //! console.log(oLoginData instanceof SyntaxError);
      }
      if (Object.keys(oNotificationData).length !== 0) {
        delete oDefaultParams.eventName;
        pVn.systemSettings.missed_events.push({
          event_name: sNotificationName,
          params: oDefaultParams
        });
        pVn.storage.set(
          {missed_events: pVn.systemSettings.missed_events});
      }
    };
    if (oDefaultParams.hasOwnProperty("time") === false) {
      oDefaultParams.time = pVn.makeDate();
    }
    pVn.uri.request(USER_STEPS_URL +
      '?' + pVn.urlDataWithOutEncode(oDefaultParams, true), onNotifyResponse);
    /* console.log("proxyPanelNotifications > notificationName:%s, params:%o, defaultParams:%o",
      sNotificationName, oParams, pVn.urlDataWithOutEncode(oDefaultParams, true));*/
  };

  pVn.setUninstallUrl = function(callback) {
    if (!callback || typeof callback !== 'function') {
      callback = pVn.nofunc;
    }
    var oDefaultParams = pVn.appData();
    if (pVn.systemSettings.user_name !== "" || pVn.clientUserName !== "") {
      oDefaultParams.userName = pVn.clientUserName ||
      pVn.systemSettings.user_name;
    }

    delete oDefaultParams.uuid;
    delete oDefaultParams.email;
    var url = EXT_UNINSTALL_URL + "?" + pVn.encodeData(oDefaultParams, true);
    chrome.runtime.setUninstallURL(url, callback);
  };

  //! Set Proxy Autoconnect
  pVn.setProxyAutoConnect = function(bState, callback) {
    pVn.systemSettings.proxyAutoConnect = bState;

    var proxyPreferences = null;

    if (bState) {
      proxyPreferences = pVn.systemSettings.site_prefs;
    }

    var onSet = function() {
      pVn.proxy.saveLastUsedServer(proxyPreferences, callback);
    };

    pVn.storage.set({proxyAutoConnect: bState}, onSet);
  };

  //! Open other application page
  pVn.openApplicationPage = function(appName) {
    var applicationLink;
    //! get application url by name
    switch (appName) {
      case "apple":
        applicationLink = APPLICATION_PAGE_MAC;
        break;
      case "android":
        applicationLink = APPLICATION_PAGE_ANDROID;
        break;
      case "android-tv":
        applicationLink = APPLICATION_PAGE_ANDROID_TV;
        break;
      case "ios":
        applicationLink = APPLICATION_PAGE_IOS;
        break;
      case "windows":
      default:
        applicationLink = APPLICATION_PAGE_WINDOWS;
        break;
    }

    //! open the link
    pVn.tabs.openLink(applicationLink);

    //! Notify
    pVn.proxyPanelNotifications('ProxyExtension_CTA_APPS', {
      ctaAppName: appName
    });
  };

  pVn.updateWhitelistedHosts = function(hostWhitelisingDetails, callback) {
    pVn.systemSettings.whitelistedHosts = hostWhitelisingDetails.whitelistHosts;
    pVn.storage.set({whitelistedHosts: hostWhitelisingDetails.whitelistHosts},
      callback);
  };

  pVn.updateAllowWhitelistedHosts = function(allowWhitelistedHosts, callback) {
    pVn.systemSettings.allowWhitelistedHosts =
    allowWhitelistedHosts;
    pVn.storage.set({allowWhitelistedHosts: allowWhitelistedHosts}, callback);
  };

  pVn.getWhitelistedHostsDetails = function(callback) {
    pVn.storage.get(['allowWhitelistedHosts', 'whitelistedHosts'], callback);
  };

  pVn.getVpnusername = function(callback) {
    pVn.storage.get(['vpnusernames'], callback);
  };

  pVn.clearUserAccounts = function() {
    pVn.systemSettings.vpnusernames = [];
    pVn.storage.set({vpnusernames: pVn.systemSettings.vpnusernames});
  };

  //! Begin the proxy
  pVn.starter();
})();
