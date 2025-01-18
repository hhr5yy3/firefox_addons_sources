/*
*   PureVPN
*   by GZ systems Ltd.
*   Everyone is permitted to copy and distribute verbatim copies
*   of this document, but changing it is not allowed.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
*   copyright 2016 All Rights are Reserved.
*/

(function() {
  'use strict';
  pVn.popupCampaign = (function() {
    var campaignSetStorage = function() {
      pVn.storage.set({
        showCampaignCounter: pVn.systemSettings.showCampaignCounter,
        campaignPopupCount: pVn.systemSettings.campaignPopupCount,
        showCampaign: pVn.systemSettings.showCampaign
      }, pVn.nofunc);
    };
    var campaignSetTimer = function() {
      pVn.systemSettings.campaignApplyRuleByHours =
       pVn.addHoursInCurrentTime(pVn.systemSettings.campaignData.time);
      pVn.storage.set({
        campaignApplyRuleByHours: pVn.systemSettings.campaignApplyRuleByHours
      }, pVn.nofunc);
    };
    var resetCounterandSetStorage = function() {
      var onResult = function() {
        campaignSetStorage();
      };
      changePopupAndResetCount(onResult);
    };
    var triggerSetTimeOut = function() {
      var milis = pVn.createMilisByHours(pVn.systemSettings.campaignData.time);
      pVn.campaignInterval = setTimeout(function() {
        resetCounterandSetStorage();
      }, milis);
    };

    var resetConnectionsandPopUpCount = function() {
      pVn.systemSettings.showCampaignCounter = 1;
      pVn.systemSettings.campaignPopupCount = -1;
      pVn.systemSettings.showCampaign = false;
      campaignSetStorage();
    };
    var clearCampaign = function() {
      pVn.systemSettings.campaignData = {};
      pVn.campaignInterval = 0;
      pVn.systemSettings.campaignApplyRuleByHours =
           0;
      pVn.storage.set({
        campaignApplyRuleByHours:
             pVn.systemSettings.campaignApplyRuleByHours,
        campaignData: pVn.systemSettings.campaignData
      }, pVn.nofunc);
      resetConnectionsandPopUpCount();
    };
    var getCampaign = function(callback) {
      var apiCampaign = "";
      var campaignType = 0;
      var params = "";
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      var onResponse = function(oResponse) {
        var oCampaignData = {};
        try {
          oCampaignData = JSON.parse(oResponse.content);
        } catch (e) {
          //! nothing to do
        }
        if (pVn.isEmpty(oCampaignData) === false &&
oCampaignData.header.code === 1) {
          if (pVn.systemSettings.campaignData &&
pVn.systemSettings.campaignData.checksum &&
oCampaignData.body.checksum === pVn.systemSettings.campaignData.checksum) {
            callback(false);
          } else {
            pVn.systemSettings.campaignData = {
              checksum: oCampaignData.body.checksum,
              startDate: oCampaignData.body.start_date,
              connections: oCampaignData.body.lapse_connections,
              time: oCampaignData.body.lapse_hours,
              name: oCampaignData.body.title,
              popups: oCampaignData.body.banners,
              autologin: oCampaignData.body.autologin,
              autologin_url: oCampaignData.body.autologin_url
            };
            pVn.systemSettings.campaignActive = false;
            pVn.storage.set({
              campaignData: pVn.systemSettings.campaignData,
              campaignActive: pVn.systemSettings.campaignActive
            }, pVn.nofunc);
          }
          if (pVn.systemSettings.campaignData &&
           pVn.systemSettings.campaignData.startDate) {
            if (pVn.systemSettings.campaignActive === false) {
              var currentDate = Date.parse(pVn.currentDate(" "));
              currentDate /= 1000;
              var givenDate = pVn.systemSettings.campaignData.startDate;
              givenDate = Date.parse(givenDate.replace(/-/g, ' ')) / 1000;
              if (currentDate >= givenDate) {
                pVn.systemSettings.campaignActive = true;
                pVn.storage.set({
                  campaignActive: pVn.systemSettings.campaignActive
                }, pVn.nofunc);
                var onsetTime = function() {
                  var currentTime = Math.round(new Date() / 1000);
                  if (pVn.systemSettings.campaignApplyRuleByHours <=
                  currentTime) {
                    resetCounterandSetStorage();
                  }
                };
                campaignSetTimer(onsetTime);
                triggerSetTimeOut();
                resetConnectionsandPopUpCount();
              }
            }
          } else {
            clearCampaign();
          }
        } else {
          clearCampaign();
        }
      };
      apiCampaign = API_CAMPAIGN;
      if (pVn.systemSettings.client_type === CLIENT_TYPE_PAID) {
        campaignType = 1;
      }
      if (pVn.systemSettings.campaignData &&
         pVn.systemSettings.campaignData.checksum) {
        params = pVn.encodeData({
          checksum: pVn.systemSettings.campaignData.checksum,
          campaign_type: campaignType
        });
      } else {
        params = pVn.encodeData({
          campaign_type: campaignType
        });
      }
      apiCampaign += "?" + params;
      pVn.uri.request(apiCampaign, onResponse);
    };
    var popupStatus = function(sPopUpAction) {
      var oParams = {
        campaignPopUpName:
        pVn.systemSettings.campaignData.popups[
          pVn.systemSettings.campaignPopupCount
        ].name,
        campaignName: pVn.systemSettings.campaignData.name,
        campaignAction: sPopUpAction,
        campaignLink: pVn.systemSettings.campaignData.popups[
          pVn.systemSettings.campaignPopupCount
        ].link
      };
      pVn.proxyPanelNotifications('ProxyExtension_Campaign',
        oParams);
      var parsedUsername = {
        un: pVn.userNameBase64()
      };
      if (sPopUpAction === 'click') {
        pVn.systemSettings.showCampaign = false;
        if (pVn.systemSettings.campaignData.autologin === 1 &&
          pVn.systemSettings.campaignData.autologin_url !== null &&
          pVn.systemSettings.campaignData.autologin_url
            .includes(MEMBER_AREA_HOST_NAME)
        ) {
          var parser = document.createElement('a');
          parser.href = pVn.systemSettings.campaignData.autologin_url;
          var slug = parser.pathname.replace("/", "");
          chrome.tabs.create(
            {url: pVn.extUrl(MEMBER_AREA_REDIRECT_POST_URL) + '?slug=' + slug,
              active: true});
        } else {
          pVn.tabs.openLink(
            pVn.createUrlWithQueryString(
              oParams.campaignLink, parsedUsername)
          );
        }
      } else if (sPopUpAction === 'close') {
        pVn.systemSettings.showCampaign = false;
      }
      pVn.storage.set({
        showCampaign: pVn.systemSettings.showCampaign
      }, pVn.nofunc);
    };
    /**
     * it will reset counter of connections and increase popup count
     * @return {void}
     */
    function changePopupAndResetCount() {
      pVn.systemSettings.showCampaignCounter = 1;
      var campaignPopupCountForLength =
       pVn.systemSettings.campaignPopupCount + 1;
      pVn.systemSettings.showCampaign = true;
      if (campaignPopupCountForLength >=
       pVn.systemSettings.campaignData.popups.length) {
        pVn.systemSettings.campaignPopupCount = 0;
      } else {
        pVn.systemSettings.campaignPopupCount++;
      }
      campaignSetTimer();
      clearInterval(pVn.campaignInterval);
      triggerSetTimeOut();
    }
    var campaignConnectionsCount = function() {
      if (pVn.systemSettings.campaignData &&
        pVn.systemSettings.campaignData.connections) {
        if (typeof pVn.systemSettings
          .showCampaignCounter === "undefined") {
          pVn.systemSettings.showCampaignCounter = 1;
        }
        if (typeof pVn.systemSettings
          .campaignPopupCount === "undefined") {
          pVn.systemSettings.campaignPopupCount = -1;
        }
        if (pVn.systemSettings.showCampaignCounter <
         pVn.systemSettings.campaignData.connections) {
          pVn.systemSettings.showCampaignCounter++;
        } else {
          changePopupAndResetCount();
        }
        campaignSetStorage();
      } else {
        clearCampaign();
      }
    };
    return {
      get: getCampaign,
      popupStatus: popupStatus,
      campaignConnectionsCount: campaignConnectionsCount
    };
  })();
})();
