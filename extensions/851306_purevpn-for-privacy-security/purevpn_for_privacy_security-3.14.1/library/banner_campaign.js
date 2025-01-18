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
  pVn.bannerCampaign = (function() {
    var cTaSummaryTextChange = function() {
      if (typeof pVn.systemSettings
        .connectionsForTextChange === "undefined") {
        pVn.systemSettings.connectionsForTextChange = 0;
      }
      if (typeof pVn.systemSettings
        .cTaSummarytextChangeState === "undefined") {
        pVn.systemSettings.cTaSummarytextChangeState = 0;
      }
      pVn.systemSettings.connectionsForTextChange++;

      if (pVn.systemSettings.connectionsForTextChange >=
       pVn.systemSettings.bannerCampaignData.lapse_connection) {
        pVn.systemSettings
          .cTaSummarytextChangeState++;
        if (pVn.systemSettings.cTaSummarytextChangeState >
         pVn.systemSettings.bannerCampaignData.banners.length - 1) {
          pVn.systemSettings.cTaSummarytextChangeState = 0;
        }
        pVn.systemSettings.connectionsForTextChange =
         0;
      }

      pVn.storage.set({
        connectionsForTextChange:
          pVn.systemSettings.connectionsForTextChange,
        cTaSummarytextChangeState:
          pVn.systemSettings.cTaSummarytextChangeState
      }, pVn.nofunc);
    };
    var clearCampaign = function() {
      pVn.systemSettings.bannerCampaignData = {};
      pVn.systemSettings.connectionsForTextChange = 0;
      pVn.systemSettings.cTaSummarytextChangeState = 0;
      pVn.storage.set({
        bannerCampaignData: pVn.systemSettings.bannerCampaignData,
        connectionsForTextChange: pVn.systemSettings.connectionsForTextChange,
        cTaSummarytextChangeState: pVn.systemSettings.cTaSummarytextChangeState
      }, pVn.nofunc);
    };
    var getCampaign = function(callback) {
      var apiCampaign = "";
      var campaignType = 0;
      var params = "";
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      var onResponse = function(oResponse) {
        var obannerCampaignData = {};
        try {
          obannerCampaignData = JSON.parse(oResponse.content);
        } catch (e) {
          //! nothing to do
        }
        if (pVn.isEmpty(obannerCampaignData) === false &&
             obannerCampaignData.header.code === 1) {
          if (pVn.systemSettings.bannerCampaignData &&
               pVn.systemSettings.bannerCampaignData.checksum &&
               obannerCampaignData.body.checksum ===
               pVn.systemSettings.bannerCampaignData.checksum) {
            callback(false);
          } else {
            pVn.systemSettings.bannerCampaignData = {
              checksum: obannerCampaignData.body.checksum,
              campaign_title: obannerCampaignData.body.title,
              lapse_connection: obannerCampaignData.body.lapse_connections,
              banner_bg_clr: obannerCampaignData.body.banner_bg_color,
              btn_bg_clr: obannerCampaignData.body.bttn_bg_color,
              btn_bg_hover_clr: obannerCampaignData.body.bttn_bg_hover_color,
              btn_txt_clr: obannerCampaignData.body.bttn_text_color,
              heading_txt_clr: obannerCampaignData.body.heading_text_color,
              banners: obannerCampaignData.body.banners,
              autologin: obannerCampaignData.body.autologin,
              autologin_url: obannerCampaignData.body.autologin_url
            };
            pVn.systemSettings.connectionsForTextChange = 0;
            pVn.systemSettings.cTaSummarytextChangeState = 0;
            pVn.storage.set({
              bannerCampaignData: pVn.systemSettings.bannerCampaignData,
              connectionsForTextChange:
               pVn.systemSettings.connectionsForTextChange,
              cTaSummarytextChangeState:
               pVn.systemSettings.cTaSummarytextChangeState
            }, pVn.nofunc);
          }
        } else {
          clearCampaign();
        }
      };
      apiCampaign = API_BANNER;

      if (pVn.systemSettings.client_type === CLIENT_TYPE_PAID) {
        campaignType = 1;
      }

      if (pVn.systemSettings.bannerCampaignData &&
           pVn.systemSettings.bannerCampaignData.checksum) {
        params = pVn.encodeData({
          checksum: pVn.systemSettings.bannerCampaignData.checksum,
          campaign_type: campaignType,
          payment_gateway: pVn.systemSettings.user_gateway
        });
      } else {
        params = pVn.encodeData({
          campaign_type: campaignType,
          payment_gateway: pVn.systemSettings.user_gateway
        });
      }
 
      //! temporary exiting from here to prevent the api call
      callback(false); return;
 
      apiCampaign += "?" + params;
      pVn.uri.request(apiCampaign, onResponse);
    };

    var bannerStatus = function(sBannerAction) {
      if (sBannerAction === 'close') {
        pVn.systemSettings.showBannerCampaign = false;
      }
      pVn.storage.set({
        showBannerCampaign: pVn.systemSettings.showBannerCampaign
      }, pVn.nofunc);
    };

    var getBannerStatus = function(callback) {
      pVn.storage.get(['showBannerCampaign'], callback);
    };

    return {
      get: getCampaign,
      cTaSummaryTextChange: cTaSummaryTextChange,
      bannerStatus: bannerStatus,
      getBannerStatus: getBannerStatus
    };
  })();
})();
