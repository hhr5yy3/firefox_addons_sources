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
  pVn.SocialProviderWindowID = -1;
  pVn.SocialProviderResponse = {};
  pVn.socialResponseCallback = pVn.nofunc;
  var onMessage = function(oRequest, oSender, callback) {
    switch (oRequest.what) {
      // Sync
      case "getVpnPassword":
        pVn.auth.setPostAuthentication(oRequest.data.username, callback)
        return true;
      case "initiateOauth":
        pVn.auth.initiateOauth(oRequest.data, callback)
        return true;
      case "popupData":
        pVn.getPopupData(oRequest.tabId, callback);
        return true;
      case "authUser":
        pVn.auth.refreshAccessToken(callback);
        return true;
      case "logOut":
        pVn.auth.del(oRequest.tabId, oRequest.removeAccounts, callback);
        return true;
      case "regionList":
        pVn.proxy.getCountries(callback);
        return true;
      case "toggleProxyService":
        pVn.proxy.proxyService(oRequest.countryCode, callback);
        return true;
      case "updateSettings":
        pVn.proxy.proxyPreference(oRequest.preference,
          oRequest.region, oRequest.domain, callback);
        return true;
      case "editFavourite":
        pVn.proxy.editFavourite(
          oRequest.countryCode, oRequest.status, callback);
        return true;
      case "editFavouriteChannel":
        pVn.proxy.editFavouriteChannel(oRequest.channelCode,
          oRequest.status, callback);
        return true;
      case "editWebRTC":
        pVn.setWebRTC(oRequest.status, callback);
        return true;
      case "toggleWebRtc":
        pVn.toggleWebRtc(oRequest.status, callback);
        return true;
      case "editFavouriteCity":
        pVn.proxy.editFavouriteCity(oRequest.cityCode,
          oRequest.status, callback);
        return true;
      case "restoreDefaultState":
        pVn.masterReset(callback);
        return true;
      case "defaultCountry":
        pVn.proxy.setCountryCode(oRequest.countryCode,
          oRequest.serverKey, oRequest.cityHostname, oRequest.serverName,
          callback);
        return true;
      case "getUserStatus":
        pVn.userStatus(callback);
        return true;
      case "Feedback_MakeUsHappyCTA":
        pVn.makeUsHappy(callback);
        return true;
      case "userSignup":
        pVn.auth.userSignup(oRequest.email, callback);
        return true;
      case "verifyUser":
        pVn.auth.userVerification(oRequest.verfication_code, callback);
        return true;
      case "resendVerification":
        pVn.auth.resendVerification(callback);
        return true;
      case "getSocial":
        //  pVn.auth.getSocialNetworkProvider(callback);
        return true;
      case "subscriptionStatus":
        pVn.getSubscriptionsDetails(callback);
        return true;
      case "pac_script_start":
        //  pVn.unblocker.pacscript();
        return true;
      case "editProxyAutoConnect":
        pVn.setProxyAutoConnect(oRequest.status, callback);
        return true;
      case "updateDesireOutcome":
        pVn.updateDesireOutcome(oRequest.status, oRequest.options, callback);
        return true;
      case "updateCurrentSession":
        pVn.updateCurrentSession(oRequest.connectionStatus, callback);
        return true;
      case "disconnectSessionRatingCheck":
        pVn.disconnectSessionRatingCheck(callback);
        return true;
      case "updateSessionRating":
        pVn.updateSessionRating(oRequest.status, oRequest.options, callback);
        return true;
      case "updateSessionRatingMessageUserInteraction":
        pVn.updateSessionRatingMessageUserInteraction(
          oRequest.status, callback);
        return true;
      case "submitFeedbackFormResult":
        pVn.submitFeedbackFormResult(oRequest.data, callback);
        return true;
      case "updateStoreRatePopup":
        pVn.updateStoreRatePopup(oRequest.value, callback);
        return true;
      case "talkToSupportPopup":
        pVn.talkToSupportPopup(oRequest.value, callback);
        return true;
      case "updateReferAFriendPopup":
        pVn.updateReferAFriendPopup(oRequest.value, oRequest.link, callback);
        return true;
      case "feedbackSkipButton":
        pVn.feedbackSkipButton(callback);
        return true;
        // ASync
      case "openLink":
        pVn.tabs.openLink(oRequest.url);
        break;
      case "clientUserName":
        pVn.clientUserName = oRequest.clientUserName;
        break;
      case "clientSignupDetail":
        pVn.clientSignupDetail.email = oRequest.email;
        pVn.clientSignupDetail.consent = oRequest.consent;
        break;
      case "openApplicationPage":
        pVn.openApplicationPage(oRequest.appname);
        break;
      case "feedBack":
        pVn.proxyPanelNotifications('ProxyExtension_CTA_FeedBack');
        break;
      case "subscribeStatus":
        pVn.proxyPanelNotifications('ProxyExtension_CTA_Purchase', {
          purchaseMessage: oRequest.subscribeMsg,
          buttonText: oRequest.upgradeText
        });
        break;
      case "showFeedbackPage":
        pVn.feedbackRatings();
        break;
      case "ProxyExtension_Feedback":
        pVn.feedbackSubmit(oRequest.submitData);
        break;
      case "pac_script_resp":
        // why this exist????
        break;
      case "socialSignupResult":
        pVn.SocialProviderResponse = oRequest.oResponse;
        chrome.tabs.remove(oSender.tab.id);
        break;
      case "openUpgradeAccount":
        pVn.proxy.requestUpgradeUrl(oRequest.upgradeFrom);
        pVn.proxyPanelNotifications('ProxyExtension_CTA_Purchase', {
          purchaseMessage: 'Premium_Upgrade',
          buttonText: oRequest.upgradeText
        });
        break;
      case "campaignPopUp":
        pVn.popupCampaign.popupStatus(oRequest.status);
        break;
      case "campaignBanner":
        pVn.bannerCampaign.bannerStatus(oRequest.status);
        break;
      case "showSignupScreen":
        pVn.showSignupScreen = true;
        break;
      case "updateWhitelistedHosts":
        pVn.updateWhitelistedHosts(oRequest, callback);
        return true;
      case "updateAllowWhitelistedHosts":
        pVn.updateAllowWhitelistedHosts(oRequest.allowWhitelistedHosts,
          callback);
        return true;
      case "editLocationSpoofing":
        pVn.setLocationSpoofing(oRequest.status, callback);
        pVn.proxyPanelNotifications('ProxyExtension_HideGpsLocation', {
          gps_status: oRequest.status
        });
        return true;
      case "toggleLocationSpoofing":
        pVn.toggleLocationSpoofing(oRequest.status, callback);
        return true;
      case "getWhitelistedHostsDetails":
        pVn.getWhitelistedHostsDetails(callback);
        return true;
      case "getClientRedirectToken":
        pVn.auth.userMemberAreaRedirectToken(oRequest.slug, callback);
        return true;
      case "getBannerStatus":
        pVn.bannerCampaign.getBannerStatus(callback);
        return true;
      case "authEmail":
        // pVn.auth.verifyEmail(oRequest.data, callback);
        return true;
      case "migrateUser":
        pVn.proxy.redirectToMigration(callback);
        return true;
      case "getVpnusernames":
        pVn.getVpnusername(callback);
        return true;
      case "getVpnusernameDetails":
        pVn.auth.getVpnusernameDetails(oRequest.data, callback);
        return true;
      case "clearUserAccounts":
        pVn.clearUserAccounts();
        return true;
      case "getServers":
        pVn.proxy.getServers(oRequest.city_id, oRequest.type,
          callback);
        return true;
      case "unableToFindServerEvent":
        pVn.proxyPanelNotifications('ProxyExtension_UnableToFindServer', {
          serverHostname: oRequest.serverHostname
        });
        break;
      case "openMemberUrl":
        pVn.proxy.openMemberUrl(oRequest.slug);
        break;
      case "getReferFriend":
        pVn.proxy.getReferFriend(callback);
        return true;
      case "referFriendClickedEvent":
        pVn.proxyPanelNotifications('ProxyExtension_ReferFriendPageClicked',
          {});
        break;
      case "referFriendInviteClickedEvent":
        pVn.proxyPanelNotifications('ProxyExtension_ReferFriendInviteClicked',
          {});
        break;
      case "sendLocationRequest":
        pVn.proxyPanelNotifications('ProxyExtension_LocationRequest', {
          comment: oRequest.comment,
          type: oRequest.type
        });
        break;
      case "referFriendInviteFailedEvent":
        pVn.proxyPanelNotifications('ProxyExtension_ReferInviteFail',
          {});
        break;
      case "connectedEvent":
        var params = {
          session_type: oRequest.sessionType,
          prompt_type: oRequest.promptType,
          connectVia: oRequest.connectVia,
          countryName: "",
          cityName: "",
          channelName: ""
        };
        if (oRequest.connectVia === "Country") {
          params.countryName = oRequest.countryName;
        } else if (oRequest.connectVia === "City" ||
          oRequest.connectVia === "Server") {
          params.cityName = pVn.getCityNameByCityCode(oRequest.countryName);
        } else if (oRequest.connectVia === "Channel") {
          params.channelName = oRequest.countryName;
        }
        pVn.proxyPanelNotifications('ProxyExtension_ViewSessionPrompt', params);
        break;
      case "ratingOrDOFeedbackEvent":
        pVn.proxyPanelNotifications('ProxyExtension_RateSessionPrompt', {
          session_type: oRequest.sessionType,
          prompt_type: oRequest.promptType,
          rating: oRequest.rating
        });
        break;
      case "sessionFeedbackReasonsEvent":
        var countryCode = pVn.systemSettings.site_prefs["*"];
        if (countryCode === undefined) {
          countryCode = oRequest.countryCode;
        }
        var props1 = {
          session_type: oRequest.sessionType,
          prompt_type: oRequest.promptType,
          connectVia: oRequest.connectVia,
          rating: oRequest.rating,
          comment: oRequest.comment,
          proxy_host: pVn.proxyNodes[countryCode].proxy_host,
          reason: oRequest.reason,
          submit: oRequest.submit,
          email: oRequest.userEmail,
          user_full_name: oRequest.userFullName,
          countryName: "",
          cityName: "",
          channelName: ""
        };
        if (oRequest.connectVia === "Country") {
          props1.countryName = oRequest.countryName;
        } else if (oRequest.connectVia === "City" ||
          oRequest.connectVia === "Server") {
          props1.cityName = pVn.getCityNameByCityCode(oRequest.countryName);
        } else if (oRequest.connectVia === "Channel") {
          props1.channelName = oRequest.countryName;
        }
        pVn.proxyPanelNotifications('ProxyExtension_SessionFeedback', props1);
        break;
      case "storeRatePopupEvent":
        pVn.proxyPanelNotifications('ProxyExtension_StoreFeedback', {
          action: oRequest.action,
          prompt_type: oRequest.promptType
        });
        break;
      case "liveChatPopupEvent":
        pVn.proxyPanelNotifications('ProxyExtension_ViewLiveChatPopup', {
          action: oRequest.action
        });
        break;
      case "referredAFriendPopupAppearsEvent":
        pVn.proxyPanelNotifications('ProxyExtension_ViewReferAFriend', {
          session_type: oRequest.sessionType,
          prompt_type: oRequest.promptType
        });
        break;
      case "referredAFriendPopupClickEvent":
        var props2 = {
          connectVia: oRequest.connectVia,
          prompt_type: oRequest.promptType,
          countryName: "",
          cityName: "",
          channelName: ""
        };

        if (oRequest.connectVia === "Country") {
          props2.countryName = oRequest.countryName;
        } else if (oRequest.connectVia === "City" ||
          oRequest.connectVia === "Server") {
          props2.cityName = pVn.getCityNameByCityCode(oRequest.countryName);
        } else if (oRequest.connectVia === "Channel") {
          props2.channelName = oRequest.countryName;
        }
        pVn.proxyPanelNotifications('ProxyExtension_ClickReferAFriend', props2);
        break;
      // skip default case
    }
  };

  //! Social signup
  var initSocialSignup = function(oRequest, callback) {
    if (!callback || typeof callback !== "function") {
      callback = pVn.nofunc;
    }
    var onInit = function(oWindow) {
      pVn.SocialProviderWindowID = oWindow.id;
    };
    browser.windows.create({
      url: oRequest.url,
      type: "popup"
    }, onInit);
  };

  var onPortMessage = function(oPort) {
    //! Post the message to popup
    var postMessage = function(oResponse) {
      if (chrome.extension.getViews({type: "popup"}).length > 0) {
        try {
          oPort.postMessage(oResponse);
        } catch (e) {
          //! nothing todo
        }
      }
    };
    //! Social Signup port message
    var onSocialSignupMessage = function(oRequest) {
      if (oRequest.open) {
        pVn.isReady = false;
        pVn.showSignupScreen = true;
        pVn.showSignUpLoader = true;
        initSocialSignup(oRequest, postMessage);
      }
    };

    switch (oPort.name) {
      case "socialSignup":
        oPort.onMessage.addListener(onSocialSignupMessage);
        pVn.socialResponseCallback = postMessage;
        break;
      case "authUser":
        // why this exist????
        break;
        // skip default case
    }
  };

  chrome.runtime.onMessage.addListener(onMessage);
  //! Fires when a request require authentication of the proxy [node].
  chrome.webRequest.onAuthRequired.addListener(pVn.auth.onAuth, {
    urls: ["<all_urls>"]
  }, ["blocking"]);
  chrome.tabs.onRemoved.addListener(function(iTabId) {
    // ! confirm closed tab id is created by rating feedback
    if (iTabId === pVn.tabId) {
      pVn.systemSettings.feedbackData.currentDate = pVn.makeDate();
      pVn.systemSettings.feedbackData.updateDate = pVn.makeDate(3650);
      pVn.systemSettings.feedBackStatus = pVn.checkFeedBackStatus = false;
      //! Update storage
      pVn.storage.set({
        feedbackData: pVn.systemSettings.feedbackData,
        feedBackStatus: pVn.checkFeedBackStatus
      });
    }
  });
  //! Update tab details
  chrome.tabs.onCreated.addListener(pVn.tabs.add);
  chrome.tabs.onRemoved.addListener(pVn.tabs.del);
  chrome.tabs.onUpdated.addListener(pVn.tabs.update);
  chrome.runtime.onConnect.addListener(onPortMessage);
  chrome.windows.onRemoved.addListener(function(iWindowID) {
    // ! unset proxy when window closes
    if (iWindowID === chrome.windows.WINDOW_ID_NONE) {
      // ! set proxy session time when user still connected
      pVn.systemSettings.session_time = new Date().toMysqlFormat();
      // ! Disconnect when autoconnect is set to false else clear setting
      if (pVn.systemSettings.proxyAutoConnect === false) {
        pVn.proxy.proxyService(false, setTimeout(pVn.nofunc, 2000));
      } else {
        pVn.unblocker.clear(setTimeout(pVn.nofunc, 2000));
      }
    }

    if (iWindowID === pVn.SocialProviderWindowID) {
      var responseMessage = '';
      if (pVn.SocialProviderResponse &&
          pVn.isEmpty(pVn.SocialProviderResponse) === false) {
        if (pVn.SocialProviderResponse.hasOwnProperty("token") === true) {
          setTimeout(function() {
            pVn.auth.socialLoginAuthentication(pVn.SocialProviderResponse,
              pVn.socialResponseCallback);
          }, 2000);
          return;
        }
        responseMessage = pVn.SocialProviderResponse.error_description;
      } else {
        responseMessage = "WINDOW_CLOSED";
        pVn.showSignUpLoader = false;
      }
      setTimeout(function() {
        pVn.socialResponseCallback({
          close: true,
          error: responseMessage
        });
      }, 2000);
    }
  });
  /*chrome.windows.onCreated.addListener(function() {
    pVn.systemSettings.use_cloudfront_domain = false;
  });*/

  // since in MV3, we can not set interval to fire the
  // refresh token callback, so adding alarm so it
  // does the refresh once it invoked
  chrome.alarms.onAlarm.addListener(function(alarm){
    switch (alarm.name) {
    case "silentAccessTokenRefresh":
      pVn.auth.refreshAccessToken();
      break;
    case "switchServices":
      pVn.switchServices();
    }
  });

})();
