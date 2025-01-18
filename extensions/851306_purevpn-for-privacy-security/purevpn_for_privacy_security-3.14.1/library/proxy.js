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
  var serverByCountry = self.serverByCountry = self.serverByCountry || {};
  //! Proxy class
  pVn.proxy = (function() {
    //! Get Countries / Countries List
    var getCountriesList = function(callback) {
      // console.log("pVn.proxy > getCountriesListLocal");
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }

      var onSet = function() {
        //! If no default country than set now
        if (pVn.systemSettings.default_country === "") {
          //! Loop through list to set default country temporary
          for (var i = 0; i < pVn.systemSettings.countries.length; i++) {
            if (pVn.systemSettings.countries[i].defaultCountry === "1") {
              pVn.systemSettings.default_country =
                pVn.systemSettings.countries[i].code;
            }
          }
        }
        callback(pVn.systemSettings.countries);
      };

      var onCountryListUpdate = function() {
        for (var i = 0; i < pVn.systemSettings.countries.length; i++) {
          if (pVn.systemSettings.countries[i].defaultCountry === "1") {
            pVn.systemSettings.default_country =
              pVn.systemSettings.countries[i].code;
          }
        }
      };

      //! on remote data
      var onCountriesList = function(oResponse) {
        var oCountriesListData = '';
        try {
          oCountriesListData = JSON.parse(oResponse.content);
        } catch (e) {
          // ! nothing todo
        }
        if (oCountriesListData !== "" &&
            oCountriesListData.header.code === 1 &&
            oCountriesListData.body !== null) {
          pVn.systemSettings.countries = Object.values(
            oCountriesListData.body);
          pVn.systemSettings.country_checksum =
              oCountriesListData.header['Server-Checksum'];
          pVn.storage.set({
            countries: pVn.systemSettings.countries,
            country_checksum: oCountriesListData.header['Server-Checksum']
          }, onCountryListUpdate);
        }
      };

      var onLocalList = function(oResponse) {
        // console.log("local list countries -> %o", oResponse);
        var oCountriesListData = JSON.parse(oResponse.content);
        pVn.systemSettings.countries = Object.values(oCountriesListData);
        pVn.storage.set({countries: pVn.systemSettings.countries}, onSet);
        return;
      };

      if (pVn.isEmpty(pVn.systemSettings.countries) === false) {
        onSet();
      } else {
        var fileName = (pVn.systemSettings
          .client_type === CLIENT_TYPE_FREE) ?
          "list_free.json" : "list.json";
        // !Get from local list
        pVn.uri.request(pVn.extUrl("assets/countries/" + fileName),
          onLocalList);
      }

      //! Get from server
      pVn.uri.request(API_COUNTRIES_LIST, onCountriesList);
    };
    //! Get Channels / Channels List
    var getChannelsList = function(callback) {
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }

      var onSet = function() {
        callback(pVn.systemSettings.channels);
      };

      //! on remote data
      var onChannelsList = function(oResponse) {
        var oChannelsListData = '';
        try {
          oChannelsListData = JSON.parse(oResponse.content);
        } catch (e) {
          // ! nothing todo
        }
        if (oChannelsListData !== "" &&
          oChannelsListData.header.code === 1 &&
          oChannelsListData.body !== null) {
          pVn.systemSettings.channels = Object.values(
            oChannelsListData.body);
          pVn.systemSettings.channel_checksum =
            oChannelsListData.header['Server-Checksum'];
          pVn.storage.set({
            channels: pVn.systemSettings.channels,
            channel_checksum: oChannelsListData.header['Server-Checksum']
          });
        }
      };

      var onLocalList = function(oResponse) {
        var oChannelsListData = JSON.parse(oResponse.content);
        pVn.systemSettings.channels = Object.values(oChannelsListData);
        pVn.storage.set({channels: pVn.systemSettings.channels}, onSet);
        return;
      };

      if (pVn.isEmpty(pVn.systemSettings.channels) === false) {
        onSet();
      } else {
        pVn.uri.request(pVn.extUrl("assets/channels/list.json"),
          onLocalList);
      }

      //! Get from server
      pVn.uri.request(API_CHANNELS_LIST, onChannelsList);
      //! Get 01/09/20 - manage bandwidth
      // pVn.uri.request(pVn.extUrl("assets/channels/list.json"),
      //  onLocalList);
    };

    //! Get City List
    var getCitiesList = function(callback) {
      //  console.log('inside city list');
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }

      var onSet = function() {
        //! If no default city than set now
        if (pVn.systemSettings.default_city === "") {
          //! Loop through list to set default country temporary
          for (var i = 0; i < pVn.systemSettings.cities.length; i++) {
            if (pVn.systemSettings.cities[i].defaultCountry === "1") {
              pVn.systemSettings.default_city =
               pVn.systemSettings.cities[i].code;
            }
          }
        }
        callback(pVn.systemSettings.cities);
      };

      var onCityListUpdate = function() {
        for (var i = 0; i < pVn.systemSettings.cities.length; i++) {
          if (pVn.systemSettings.cities[i].defaultCountry === "1") {
            pVn.systemSettings.default_city =
             pVn.systemSettings.cities[i].code;
          }
        }
      };

      //! on remote data
      var onCitiesList = function(oResponse) {
        var oCitiesListData = '';
        try {
          oCitiesListData = JSON.parse(oResponse.content);
        } catch (e) {
          // ! nothing todo
        }

        if (oCitiesListData !== "" &&
          oCitiesListData.header.code === 1 &&
          oCitiesListData.body !== null) {
          pVn.systemSettings.cities = Object.values(oCitiesListData.body);
          pVn.systemSettings.city_checksum =
            oCitiesListData.header['Server-Checksum'];

          pVn.storage.set({
            cities: pVn.systemSettings.cities,
            city_checksum: oCitiesListData.header['Server-Checksum']
          }, onCityListUpdate);
        }
      };

      var onLocalList = function(oResponse) {
        // console.log("local list countries -> %o", oResponse);
        var oCitiesListData = JSON.parse(oResponse.content);
        pVn.systemSettings.cities = Object.values(oCitiesListData);
        pVn.storage.set({cities: pVn.systemSettings.cities}, onSet);
        return;
      };

      if (pVn.isEmpty(pVn.systemSettings.cities) === false) {
        onSet();
      } else {
        var fileName = (pVn.systemSettings
          .client_type === CLIENT_TYPE_FREE) ?
          "list_free.json" : "list.json";
        // !Get from local list
        pVn.uri.request(pVn.extUrl("assets/cities/" + fileName),
          onLocalList);
      }
      //! Get from server
      pVn.uri.request(API_CITIES_LIST, onCitiesList);
    };

    //! Get country failover by country code
    var getCountryFailoverByCode = function(sCountryCode) {
      var i;
      if (pVn.systemSettings.serverKey === 'countryCode') {
        for (i = 0; i < pVn.systemSettings.countries.length; i++) {
          if (pVn.systemSettings.countries[i].code === sCountryCode) {
            return pVn.systemSettings.countries[i];
          }
        }
      } else if (pVn.systemSettings.serverKey === 'cityCode') {
        for (i = 0; i < pVn.systemSettings.cities.length; i++) {
          if (pVn.systemSettings.cities[i].code === sCountryCode) {
            return pVn.systemSettings.cities[i];
          }
        }
      } else {
        for (i = 0; i < pVn.systemSettings.channels.length; i++) {
          if (pVn.systemSettings.channels[i].code === sCountryCode) {
            return pVn.systemSettings.channels[i];
          }
        }
      }

      return false;
    };

    //! Get channels failover by country code

    //! Get country node List
    //! param: country code:required | callback:function:optional
    //! note: if callback not set the response will not be sent.
    var getCountryServer = function(sCountryCode, callback) {
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      // when no country define get out of here with false
      if (!sCountryCode || sCountryCode === "") {
        callback(false);
        return;
      }

      var onCountryServer = function(oResponse) {
        // //console.log("pVn.proxy > getCountryServer > CountryServer > oResponse:%o", oResponse);
        var oCountryServerData = '';
        try {
          oCountryServerData = JSON.parse(oResponse.content);
        } catch (e) {
          // console.log(oCountryServerData instanceof SyntaxError);
        }
        // ! confirm if we get the response
        if (oCountryServerData !== "" &&
          Object.prototype.toString.call(
            oCountryServerData) === '[object Object]') {
          if (oCountryServerData.header.code === 1) {
            pVn.proxyNodes[sCountryCode] = oCountryServerData.body;
            serverByCountry[oCountryServerData.body.proxy_host] = sCountryCode;
            //! Set proxy session id
            pVn.systemSettings.session_id = pVn.proxyNodes[sCountryCode].usid;
            //! return
            callback(pVn.proxyNodes[sCountryCode]);
            return;
          } else if (oCountryServerData.header.code === 403) {
            // ! refresh the access token
            pVn.auth.refreshAccessToken();
          }
        }
        // ! no response from server. ! check failover here.
        var failOverByCountry = getCountryFailoverByCode(sCountryCode);
        if (failOverByCountry !== false &&
            failOverByCountry.failover_host !== "" &&
            failOverByCountry.failover_port !== "") {
          pVn.proxyNodes[sCountryCode] = {
            proxy_host: failOverByCountry.failover_host,
            proxy_port: failOverByCountry.failover_port,
            proxy_port_https: failOverByCountry.failover_port_https
          };
          serverByCountry[failOverByCountry.failover_host] = sCountryCode;
          //! return details

          callback(pVn.proxyNodes[sCountryCode]);
        } else {
          if (pVn.systemSettings.serverKey === 'cityCode') {
            if (failOverByCountry.failover_host_country !== "" &&
             failOverByCountry.failover_port_country !== "") {
              pVn.proxyNodes[sCountryCode] = {
                proxy_host: failOverByCountry.failover_host_country,
                proxy_port: failOverByCountry.failover_port_country,
                proxy_port_https: failOverByCountry.failover_port_https_country
              };
              serverByCountry[failOverByCountry.failover_host_country] =
                sCountryCode;
              callback(pVn.proxyNodes[sCountryCode]);
            }
          }
          // ! no failover
          callback(false);
        }
      };

      //! launch the request
      var params;
      var url;
      var appData = pVn.appData();

      if (pVn.systemSettings.serverKey === 'purposeCode') {
        appData.channelCode = sCountryCode;
        appData.channelName = pVn.proxy.getChannelName(sCountryCode);
      } else if (pVn.systemSettings.serverKey === 'cityCode') {
        appData.cityCode = sCountryCode;
        appData.cityName = pVn.getCityNameByCityCode(sCountryCode);
      } else if (pVn.systemSettings.serverKey === 'cityServerCode') {
        appData.cityCode = sCountryCode;
        appData.cityName = pVn.getCityNameByCityCode(sCountryCode);
        appData.cityHostname = pVn.systemSettings.city_hostname;
      } else {
        appData.countryCode = sCountryCode;
        appData.countryName = pVn.proxy.getCountryName(sCountryCode);
      }

      appData.userName = pVn.systemSettings.user_name;
      appData.bypassProxy = pVn.systemSettings.allowWhitelistedHosts;
      appData.clientType = pVn.systemSettings.client_type;
      appData.userId = pVn.systemSettings.user_id;
      params = pVn.urlDataWithOutEncode(appData, true);

      url = API_NODES + "?" + params;
      pVn.uri.request(url, onCountryServer);
    };

    //! Get country node List
    //! param: country code:required | callback:function:optional
    //! note: if callback not set the response will not be sent.

    //! usefull to show a country when user select a country from list
    var setDefaultCountry =
      function(sCountryCode, serverKey, hostname, serverName, callback) {
        if (!callback || typeof callback !== "function") {
          callback = pVn.nofunc;
        }
        if (!serverKey || typeof serverKey === "undefined") {
          serverKey = (pVn.systemSettings.serverKey === "" ||
            !pVn.systemSettings.serverKey) ?
            'countryCode' : pVn.systemSettings.serverKey;
        }
        pVn.systemSettings.default_country = sCountryCode;
        pVn.systemSettings.serverKey = serverKey;
        pVn.systemSettings.city_hostname = hostname;
        pVn.systemSettings.server_name = serverName;
        pVn.storage.set({
          default_country: pVn.systemSettings.default_country,
          city_hostname: pVn.systemSettings.city_hostname,
          server_name: pVn.systemSettings.server_name,
          serverKey: pVn.systemSettings.serverKey}, callback);
        return;
      };

    //! it will release ip on disconnect
    // Param : user ip
    var releaseIp = function() {
      var uriInterval = "";
      pVn.systemSettings.releaseIpData.forEach(function(item, iIndex, oObject) {
        var ipParams = pVn.encodeData({
          ip: oObject[iIndex].ip,
          port: oObject[iIndex].port
        });
        var requestReleaseIp = function() {
          pVn.uri.request(API_RELEASE_IP,
            onSuccess, false, "POST", ipParams);
        };
        var retryGetResult = function() {
          clearInterval(uriInterval);
          uriInterval = setInterval(function() {
            requestReleaseIp();
          }, 5000);
        };
        /**
         * Trigger on API response.
         * @param {object} oResponse return the response of API .
         * @return {void}
         */
        function onSuccess(oResponse) {
          try {
            var releaseIpResponse = JSON.parse(oResponse.content);
            if (releaseIpResponse.header) {
              // remove value
              var filtered = oObject.filter(function(a) {
                // zero index will be remove
                return (a.ip !== releaseIpResponse.body[0].ip &&
                 a.port !== releaseIpResponse.body[0].port);
              });
              // console.log("filtered %o", filtered);
              pVn.systemSettings.releaseIpData = filtered;
              pVn.storage.set({
                releaseIpData: pVn.systemSettings.releaseIpData
              }, pVn.nofunc);
              clearInterval(uriInterval);
            } else {
              retryGetResult();
            }
          } catch (e) {
            retryGetResult();
          }
        }
        requestReleaseIp();
      });
    };

    //! Save last used server
    var saveLastUsedServer = function(preferences, callback) {
      // ! set proxy preferences to the storage.
      pVn.storage.set({
        site_prefs: preferences,
        session_id: pVn.systemSettings.session_id,
        session_time: pVn.systemSettings.session_time
      },
      callback
      );
    };

    //! Set or unset the country
    //! Domain based | Browser Based
    //! Param: callback [function|optional] | countryCode [optional]
    //! Note: Regular or incognito mode
    var setSitePreferences = function(callback, sCountryCode) {
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      if (sCountryCode && sCountryCode !== "") {
        pVn.systemSettings.site_prefs = {"*": sCountryCode};
      } else {
        var countryCode = pVn.systemSettings.site_prefs["*"];
        if (pVn.proxyNodes[countryCode] &&
         pVn.proxyNodes[countryCode].user_name &&
         pVn.proxyNodes[countryCode].password) {
          // console.log("pVn.proxyNodes[countryCode].proxy_host %s, pVn.proxyNodes[countryCode].proxy_port %s", pVn.proxyNodes[countryCode].proxy_host, pVn.proxyNodes[countryCode].proxy_port);
          if (!pVn.systemSettings.releaseIpData) {
            pVn.systemSettings.releaseIpData = [];
          }
          pVn.systemSettings.releaseIpData.push({
            ip: pVn.proxyNodes[countryCode].proxy_host,
            port: pVn.proxyNodes[countryCode].proxy_port
          });
          pVn.storage.set({
            releaseIpData: pVn.systemSettings.releaseIpData
          }, pVn.nofunc);
          releaseIp();
        }
        delete pVn.systemSettings.site_prefs["*"];
      }

      //! save the latest site preference only when enabled
      if (pVn.systemSettings.proxyAutoConnect === true) {
        saveLastUsedServer(pVn.systemSettings.site_prefs, callback);
      } else {
        saveLastUsedServer(null, callback);
      }
    };

    //! get site prefence? do we really need this function?
    //! we already get the 'pVn.systemSettings.site_prefs' on startup
    //! also whenever we call this variable ['pVn.systemSettings.site_prefs'], we get the updated one.
    var getSitePreferences = function(callback) {
      var onGet = function(oPreference) {
        pVn.systemSettings.site_prefs = oPreference.site_prefs;
        callback(oPreference);
      };
      pVn.data.get("site_prefs", onGet);
      return;
    };

    //! Get Country name by country code
    var getCountryNameByCode = function(sCountryCode) {
      var i;
      for (i = 0; i < pVn.systemSettings.countries.length; i++) {
        if (pVn.systemSettings.countries[i].code === sCountryCode) {
          return pVn.systemSettings.countries[i].name;
        }
      }
      return sCountryCode;
    };

    //! Get Channel name by Channel code
    var getChannelNameByCode = function(sChannelCode) {
      var i;
      for (i = 0; i < pVn.systemSettings.channels.length; i++) {
        if (pVn.systemSettings.channels[i].code === sChannelCode) {
          return pVn.systemSettings.channels[i].name;
        }
      }
      return sChannelCode;
    };

    //! Get city name by city code
    var getCityNameByCode = function(sCityCode) {
      var i;
      for (i = 0; i < pVn.systemSettings.cities.length; i++) {
        if (pVn.systemSettings.cities[i].code === sCityCode) {
          return pVn.systemSettings.cities[i].name;
        }
      }
      return sCityCode;
    };

    //! Get Channel url by Channel code
    var getChannelUrlByCode = function(sChannelCode) {
      var i;
      for (i = 0; i < pVn.systemSettings.channels.length; i++) {
        if (pVn.systemSettings.channels[i].code === sChannelCode) {
          return pVn.systemSettings.channels[i].site_url;
        }
      }
      return sChannelCode;
    };

    //! Get Channel Icon by country code
    var getChannelIconByCode = function(sChannelCode) {
      var i;
      for (i = 0; i < pVn.systemSettings.channels.length; i++) {
        if (pVn.systemSettings.channels[i].code === sChannelCode) {
          return pVn.systemSettings.channels[i].icon;
        }
      }
      return sChannelCode;
    };
    //! Set / unset favourite countries
    var countriesFavourite = function(sCountryCode, bStatus, callback) {
      var onSet = function() {
        callback(pVn.systemSettings.countries_favourites);
      };
      var onGet = function(oResponse) {
        // //console.log("editFavourite > onGet > oResponse:%o", oResponse);
        var favourites = oResponse.countries_favourites;
        var pos = favourites.indexOf(sCountryCode);
        if (bStatus !== false) {
          if (pos === -1) {
            favourites.push(sCountryCode);
          }
        } else if (pos > -1) {
          favourites.splice(pos, 1);
        }
        pVn.systemSettings.countries_favourites = favourites;
        pVn.storage.set({
          countries_favourites: pVn.systemSettings.countries_favourites},
        onSet);
      };
      pVn.storage.get("countries_favourites", onGet);
    };

    //! Set / unset favourite channels
    var channelsFavourite = function(sChannelCode, bStatus, callback) {
      // console.log("channel code", sChannelCode);
      var onSet = function() {
        callback(pVn.systemSettings.channels_favourites);
      };
      var onGet = function(oResponse) {
        // console.log("editFavourite > onGet > oResponse:%o", oResponse);
        var favourites = oResponse.channels_favourites;
        var pos = favourites.indexOf(sChannelCode);
        if (bStatus !== false) {
          if (pos === -1) {
            favourites.push(sChannelCode);
          }
        } else if (pos > -1) {
          favourites.splice(pos, 1);
        }
        pVn.systemSettings.channels_favourites = favourites;
        pVn.storage.set({
          channels_favourites: pVn.systemSettings.channels_favourites},
        onSet);
      };
      pVn.storage.get("channels_favourites", onGet);
    };

    //! Set / unset favourite cities
    var cityFavourite = function(sCity, bStatus, callback) {
      var onSet = function() {
        callback(pVn.systemSettings.cities_favourites);
      };
      var onGet = function(oResponse) {
        var favourites = oResponse.cities_favourites;

        var pos = favourites.indexOf(sCity);
        if (bStatus !== false) {
          if (pos === -1) {
            favourites.push(sCity);
          }
        } else if (pos > -1) {
          favourites.splice(pos, 1);
        }
        pVn.systemSettings.cities_favourites = favourites;
        pVn.storage.set({
          cities_favourites: pVn.systemSettings.cities_favourites},
        onSet);
      };
      pVn.storage.get("cities_favourites", onGet);
    };

    //! Get the proxy detail
    var getProxyDetail = function(sCountryCode, callback) {
      var onGetNode = function(serverDetails) {
        // console.log("onGetNode > serverDetails:%o", serverDetails);
        if (serverDetails && typeof serverDetails === "object" &&
            serverDetails.hasOwnProperty("header") === false) {
          pVn.isOnline = true;
          callback(true);
          return;
        }
        callback(false);
      };

      //! no country code? means to disconnect so return false.
      if (sCountryCode === "" || !sCountryCode) {
        pVn.systemSettings.session_time = new Date().toMysqlFormat();
        callback(false);
        return;
      }
      // pVn.isProxied = true;
      //! Set default country
      pVn.proxyNodes = {};
      var serverKey = pVn.systemSettings.serverKey;
      var hostName = pVn.systemSettings.city_hostname;
      var serverName = pVn.systemSettings.server_name;
      setDefaultCountry(sCountryCode, serverKey, hostName, serverName);
      getCountryServer(sCountryCode, onGetNode);
    };

    //! connect / disconnect service
    //! Country should be empty == '' when to disconnect
    var proxyService = function(sCountryCode, callback) {
      // console.log("proxyService > sCountryCode:%s", sCountryCode);
      var onServiceApply = function() {
        if (pVn.systemSettings.user_status !== USER_STATUS_ACTIVE) {
          var ExpiredConnectEventparams = {};
          ExpiredConnectEventparams.bypassProxy =
          pVn.systemSettings.allowWhitelistedHosts;
          ExpiredConnectEventparams.userOs =
          pVn.systemSettings.user_os;
          pVn.proxyPanelNotifications('ProxyExtension_ExpiredConnect',
            ExpiredConnectEventparams);
        }
        pVn.unblocker.unblock(callback);
      };
      var onSetPreference = function() {
        getProxyDetail(sCountryCode, onServiceApply);
      };
      setSitePreferences(onSetPreference, sCountryCode);
    };
    //! get tool tip and links from api
    var getTooltip = function(callback) {
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      var onToolTipDetails = function(oResponse) {
        var oTooltipData = '';
        try {
          oTooltipData = JSON.parse(oResponse.content);
        } catch (e) {
          // console.log(oTooltipData instanceof SyntaxError);
        }
        if (oTooltipData.header.code === 1) {
          pVn.systemSettings.channelToolTiptext_Link = {
            text: oTooltipData.body.channel_tooltip_text,
            link: oTooltipData.body.channel_tooltip_link
          };
          pVn.systemSettings.countryToolTiptext_Link = {
            text: oTooltipData.body.country_tooltip_text,
            link: oTooltipData.body.country_tooltip_link
          };
          pVn.storage.set({
            channelToolTiptext_Link:
            pVn.systemSettings.channelToolTiptext_Link,
            countryToolTiptext_Link:
            pVn.systemSettings.countryToolTiptext_Link
          });
          callback(oTooltipData.body);
        } else {
          callback(false);
        }
      };
      pVn.uri.request(API_TOOLTIP, onToolTipDetails);
    };
    var openMigrationUrl = function() {
      pVn.proxyPanelNotifications('ProxyExtension_MigrationMessageClicked');
      var memberAreaRedirectPostUrl =
        pVn.extUrl(MEMBER_AREA_REDIRECT_POST_URL) + '?slug=' +
        MEMBER_AREA_MIGRATION_PAGE_SLUG;
      chrome.tabs.create({url: memberAreaRedirectPostUrl, active: true});
    };

    var openUpgradeUrl = function(ele) {
      var usernameParsed = pVn.userNameBase64();
      var oParams = {
        un: usernameParsed
      };
      var linkurl = EXT_PREMIUM_URL;
      if (ele === "country") {
        linkurl = pVn.systemSettings.countryToolTiptext_Link.link;
      } else if (ele === "channel") {
        linkurl = pVn.systemSettings.channelToolTiptext_Link.link;
      } else if (ele === "banner") {
        if (pVn.systemSettings.bannerCampaignData.autologin === 1 &&
          pVn.systemSettings.bannerCampaignData.autologin_url !== null &&
          pVn.systemSettings.bannerCampaignData.autologin_url !== undefined &&
          pVn.systemSettings.bannerCampaignData.autologin_url
            .includes(MEMBER_AREA_HOST_NAME)) {
          linkurl = pVn.systemSettings.bannerCampaignData.autologin_url;
        } else {
          linkurl = pVn.systemSettings.bannerCampaignData.banners[
            pVn.systemSettings.cTaSummarytextChangeState].bttn_link;
        }
      }
      var memberAreaRedirectPostUrl = "";
      if (linkurl.includes(MEMBER_AREA_HOST_NAME)) {
        var parser = document.createElement('a');
        parser.href = linkurl;
        var slug = parser.pathname.replace("/", "");
        memberAreaRedirectPostUrl =
        pVn.extUrl(MEMBER_AREA_REDIRECT_POST_URL) + '?slug=' + slug;
        chrome.tabs.create({url: memberAreaRedirectPostUrl, active: true});
      } else if (pVn.systemSettings.client_type ===
        CLIENT_TYPE_PAID && ele === "") {
        memberAreaRedirectPostUrl =
        pVn.extUrl(MEMBER_AREA_REDIRECT_POST_URL) + '?slug=' +
        MEMBER_AREA_AUTOLOGIN_PAGE_SLUG;
        chrome.tabs.create({url: memberAreaRedirectPostUrl, active: true});
      } else {
        pVn.tabs.openLink(
          pVn.createUrlWithQueryString(
            linkurl, oParams)
        );
      }
    };

    var openMemberAreaUrl = function(slug) {
      var memberAreaRedirectPostUrl =
      pVn.extUrl(MEMBER_AREA_REDIRECT_POST_URL) + '?slug=' +
      slug + '?utm_source=Proxy&utm_medium=Proxy';
      chrome.tabs.create({url: memberAreaRedirectPostUrl, active: true});
    };

    var setUserOs = function(info) {
      if (chrome.runtime.lastError) {
        // ! nothing to do
      }
      pVn.systemSettings.user_os = info.os;
      pVn.storage.set({user_os: info.os});
    };

    var setProxyUniqueUserId = function() {
      /* global UUID */
      pVn.systemSettings.proxy_user_unique_id = UUID.generate();
      pVn.storage.set({proxy_user_unique_id:
        pVn.systemSettings.proxy_user_unique_id});
    };

    var sendMissedEvents = function() {
      if (pVn.isEmpty(pVn.systemSettings.missed_events) === false) {
        for (var i = pVn.systemSettings.missed_events.length - 1; i >= 0; --i) {
          var removedEvent = pVn.systemSettings.missed_events.splice(i, 1);
          pVn.proxyPanelNotifications(removedEvent[0].event_name,
            removedEvent[0].params);
        }
      }
    };

    //! Get server list
    var getServerList = function(cityId, type, callback) {
      var onSet = function() {
        callback(pVn.systemSettings.server_list);
      };

      var onServerList = function(oResponse) {
        var oServerListData = '';
        try {
          oServerListData = JSON.parse(oResponse.content);
        } catch (e) {
          // ! nothing todo
        }

        if (oServerListData !== "" &&
          oServerListData.header.code === 1 &&
          oServerListData.body !== null) {
          pVn.systemSettings.server_list =
            Object.values(oServerListData.body);
          pVn.systemSettings.server_list_checksum =
            oServerListData.header['Server-Checksum'];

          pVn.storage.set({
            server_list: pVn.systemSettings.server_list,
            server_list_checksum: oServerListData.header['Server-Checksum']
          }, onSet);
        }
      };

      //! Get server list
      var clientType = pVn.systemSettings.client_type;
      pVn.uri.request(API_LIST_SERVER +
        '?id=' + cityId + '&client_type=' + clientType, onServerList);
    };

    //! Get refer friend data
    var getReferFriendData = function(callback) {
      var onSet = function() {
        callback(
          {
            remaining: pVn.systemSettings.refer_frnd_avl,
            sent: pVn.systemSettings.refer_frnd_sent,
            refer_link: pVn.systemSettings.refer_link
          });
      };

      var onReferFrndData = function(response) {
        var referFrndData = {
          remaining: 24,
          sent: 0,
          refer_link: ''
        };
        /*var responseData = JSON.parse(response.content);
        if (responseData !== "" &&
          responseData.header.code === 1 &&
          responseData.body !== null) {
          referFrndData.remaining = responseData.body.remaining;
          referFrndData.sent = responseData.body.sent;
          referFrndData.refer_link = responseData.body.apps_token_link;
        }*/

        pVn.systemSettings.refer_frnd_avl = referFrndData.remaining;
        pVn.systemSettings.refer_frnd_sent = referFrndData.sent;
        pVn.systemSettings.refer_link =
          referFrndData.refer_link + '&utm_source=proxy';

        pVn.storage.set({
          refer_frnd_avl: pVn.systemSettings.refer_frnd_avl,
          refer_frnd_sent: pVn.systemSettings.refer_frnd_sent,
          refer_link: pVn.systemSettings.refer_link
        }, onSet);
      };
      var params = pVn.encodeData({
        userId: pVn.systemSettings.user_id,
        vpnusername: pVn.systemSettings.user_name
      });

      /*pVn.uri.request(API_REFER_FRIEND_DATA,
        onReferFrndData, false, 'POST', params);*/
      onReferFrndData();
    };

    return {
      getNodes: getCountryServer,
      getCountries: getCountriesList,
      getChannels: getChannelsList,
      getCities: getCitiesList,
      setCountryCode: setDefaultCountry,
      getPreferences: getSitePreferences,
      setPreferences: setSitePreferences,
      proxyService: proxyService,
      getCountryName: getCountryNameByCode,
      getChannelName: getChannelNameByCode,
      getCityName: getCityNameByCode,
      getChannelIcon: getChannelIconByCode,
      editFavourite: countriesFavourite,
      editFavouriteChannel: channelsFavourite,
      editFavouriteCity: cityFavourite,
      getFailover: getCountryFailoverByCode,
      getChannelUrlByCode: getChannelUrlByCode,
      getProxyDetail: getProxyDetail,
      getToolTipDetails: getTooltip,
      requestUpgradeUrl: openUpgradeUrl,
      saveLastUsedServer: saveLastUsedServer,
      setUserOs: setUserOs,
      setProxyUniqueUserId: setProxyUniqueUserId,
      redirectToMigration: openMigrationUrl,
      sendMissedEvents: sendMissedEvents,
      getServers: getServerList,
      openMemberUrl: openMemberAreaUrl,
      getReferFriend: getReferFriendData
    };
  })();

  //! ublocker class - sets / unset proxy
  //! based on user prefernce
  //! call apply function every time a tab is updated or created
  pVn.unblocker = (function() {
    //! load default properties
    var Proxy = function() {
      this.reset();
    };
    var openChannel = function(sCountryCode) {
      var channelLink = pVn.proxy.getChannelUrlByCode(
        sCountryCode);
      if (sCountryCode &&
         channelLink &&
         channelLink !== sCountryCode) {
        var onResult = function(oResponse) {
          if (oResponse.status === false) {
            pVn.tabs.openLink(channelLink);
          } else {
            pVn.tabs.focusTab(oResponse.id, {active: true},
              oResponse.windowId, pVn.nofunc);
            if (oResponse.active === false) {
              pVn.tabs.reload(oResponse.id);
            }
          }
        };
        pVn.tabs.matchUrl(channelLink, onResult);
      }
    };
    //! create default values
    Proxy.prototype.reset = function() {
      this.rules = null;
      this.country = false;
      this.mode = MODE_DIRECT;
      this.bypass = ["<local>"].concat(pVn.whitelisted);
      return this;
    };

    //! return the proxy status to a callback function
    //! param: callback [function|optional]
    Proxy.prototype.get = function(callback) {
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      // console.log("pVn.proxyDetail %s",pVn.proxyDetail);
      callback(pVn.proxyDetail);
    };

    Proxy.prototype.setIcon = function(sCountryCode, callback) {
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      //! undefined | boolean false
      if (!sCountryCode) {
        sCountryCode = "";
      }

      //! Set icon and title | callback proxy detail
      var titleAferConnection;
      if (pVn.systemSettings.serverKey === 'countryCode') {
        titleAferConnection = (sCountryCode === "" ?
          pVn.i18n("extShortName") :
          pVn.i18n("extTitleConnected",
            pVn.proxy.getCountryName(sCountryCode)));
      } else {
        openChannel(sCountryCode);
        titleAferConnection = (sCountryCode === "" ?
          pVn.i18n("extShortName") :
          pVn.i18n("extTitleConnectedChannel",
            pVn.proxy.getChannelName(sCountryCode)));
      }
      var isoCode = sCountryCode;

      if (pVn.systemSettings.serverKey === 'cityCode' ||
      pVn.systemSettings.serverKey === 'cityServerCode') {
        isoCode = (pVn.getIsoCodeByCityCode(sCountryCode)).iso;
      }
      pVn.setIcons(isoCode);
      chrome.browserAction.setTitle({
        title: titleAferConnection
      });
      pVn.unblocker.get(callback);
    };

    //! Clear the proxy settings
    Proxy.prototype.clear = function(callback) {
      pVn.proxyDetail.levelOfControl = CONTROL_ALLOW;
      pVn.proxyDetail.value.mode = MODE_SYSTEM;

      var onSessionSave = function() {
        pVn.unblocker.setIcon(false, callback);
      };

      if (pVn.isProxied === true || pVn.systemSettings.session_time) {
        if ((browser.proxy.onRequest.hasListener(
          pVn.unblocker.handleProxyRequest))) {
          browser.proxy.onRequest.removeListener(
            pVn.unblocker.handleProxyRequest);
        }
        pVn.isProxied = false;
        pVn.lastConnectState = false;
        var typeCode = 'Country';
        if (pVn.systemSettings.serverKey === 'countryCode') {
          pVn.proxyPanelNotifications('ProxyExtension_Disconnect', {
            locationName: pVn.proxy.getCountryName(
              pVn.systemSettings.default_country),
            type: typeCode,
            locationCode: pVn.systemSettings.default_country,
            bypassProxy: pVn.systemSettings.allowWhitelistedHosts,
            usid: pVn.systemSettings.session_id,
            endTime: pVn.systemSettings.session_time
          });
        } else {
          if (pVn.systemSettings.serverKey === 'cityServerCode') {
            typeCode = 'Server';
          } else if (pVn.systemSettings.serverKey === 'cityCode') {
            typeCode = 'City';
          } else {
            typeCode = 'Channel';
          }

          pVn.proxyPanelNotifications('ProxyExtension_Disconnect', {
            locationName: pVn.proxy.getChannelName(
              pVn.systemSettings.default_country),
            type: typeCode,
            locationCode: pVn.systemSettings.default_country,
            bypassProxy: pVn.systemSettings.allowWhitelistedHosts,
            usid: pVn.systemSettings.session_id,
            endTime: pVn.systemSettings.session_time
          });
        }
        pVn.systemSettings.session_time = '';
        pVn.systemSettings.session_id = '';
      }

      pVn.storage.set({
        session_time: pVn.systemSettings.session_time,
        session_id: pVn.systemSettings.session_id
      }, onSessionSave);
    };
    //! Set proxy settings
    Proxy.prototype.set = function(callback) {
      pVn.proxyDetail.levelOfControl = CONTROL_ACTIVE;
      pVn.proxyDetail.value.mode = MODE_PAC;
      pVn.unblocker.setIcon(pVn.systemSettings.site_prefs["*"], callback);
      pVn.isProxied = true;
      var params;
      if (pVn.systemSettings.serverKey === 'countryCode') {
        params = {
          locationName: pVn.proxy.getCountryName(
            pVn.systemSettings.default_country), type: COUNTRY,
          locationCode: pVn.systemSettings.default_country
        };
      } else {
        params = {
          locationName: pVn.proxy.getChannelName(
            pVn.systemSettings.default_country), type: CHANNEL,
          locationCode: pVn.systemSettings.default_country
        };
        if (pVn.systemSettings.serverKey === 'cityServerCode') {
          params.type = SERVER;
        } else if (pVn.systemSettings.serverKey === 'cityCode') {
          params.type = CITY;
        }
      }
      params.bypassProxy = pVn.systemSettings.allowWhitelistedHosts;
      params.userOs = pVn.systemSettings.user_os;

      if (pVn.systemSettings.first_connect === 1 &&
        pVn.systemSettings.first_connect_username !==
        pVn.systemSettings.user_name
      ) {
        pVn.systemSettings.first_connect = 0;
        pVn.systemSettings.first_connect_username =
        pVn.systemSettings.user_name;
        pVn.storage.set({
          first_connect: pVn.systemSettings.first_connect,
          first_connect_username: pVn.systemSettings.user_name
        }, pVn.nofunc);
        pVn.proxyPanelNotifications('ProxyExtension_FirstConnect', params);
      }

      // match condition for feedback page
      if (pVn.checkFeedBackStatus) {
        // console.log("pVn.checkFeedBackStatus", pVn.checkFeedBackStatus);
        pVn.systemSettings.noOfConnection++;
        var timeToInvoke = 7200;
        pVn.storage.set({
          noOfConnection: pVn.systemSettings.noOfConnection
        }, pVn.nofunc);
        if (pVn.systemSettings.noOfConnection >= 15) {
          timeToInvoke = 1;
        }
        timeToInvoke = parseInt(timeToInvoke, 10) * 1000;
        pVn.proxyConnectionInterval = setTimeout(
          pVn.feedbackRatings, timeToInvoke);
      }
      if (pVn.systemSettings.client_type === CLIENT_TYPE_FREE) {
        if (pVn.systemSettings.bannerCampaignData.banners) {
          pVn.bannerCampaign.cTaSummaryTextChange();
        }
        if (pVn.systemSettings.campaignActive) {
          pVn.popupCampaign.campaignConnectionsCount();
        }
      }
    };

    Proxy.prototype.unblock = function(callback) {
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      // console.log("pureproxy > init pVn.isReady:%s, pVn.isOnline:%s", pVn.isReady, pVn.isOnline);
      if (pVn.isReady === false) {
        // console.log("not ready for unblock yet");
        callback(false);
        return;
      }
      //! confirm if user is not expired
      if (pVn.systemSettings.user_status !== USER_STATUS_ACTIVE) {
        callback({code: 8, message: pVn.i18n("proxyTxtUnAuthorized")});
        return;
      }

      var sCountryCode = '';
      var oProxy = {
        proxy: {}
      };

      //! Get Proxy to get server
      var getProxyServers = function() {
        pVn.proxy.proxyService(sCountryCode, callback);
      };

      //! Read the proxy preferences
      if (pVn.isEmpty(pVn.systemSettings.site_prefs) === true) {
        //! No preferences! let's clear the proxy settings.
        pVn.unblocker.clear(callback);
        return;
      } else if (pVn.isOnline === false) {
        callback({code: 11, message: pVn.i18n("extTxtNoConnection")});
        return;
      }
      sCountryCode = pVn.systemSettings.site_prefs["*"];
      //! no proxy servers information, get it now.
      if (pVn.isEmpty(pVn.proxyNodes)) {
        //! site preferences exist, but nodes not available so go to get the nodes first.
        //! if previously browser closed and session exist? let clear it up first
        if (pVn.systemSettings.session_time) {
          pVn.unblocker.clear(getProxyServers);
        } else {
          if (pVn.systemSettings.serverKey !== 'cityServerCode') {
            getProxyServers();
          }
          if (!(pVn.systemSettings.serverKey !== 'cityServerCode')) {
            return callback(null);
          }
        }
        return;
      }
      //! Set proxy information
      if (pVn.proxyNodes[sCountryCode].proxy_port_https &&
         pVn.proxyNodes[sCountryCode].proxy_port_https !== 0) {
        oProxy.proxy.country_code = sCountryCode;
        oProxy.proxy.protocol = "https";
        oProxy.proxy.host = pVn.proxyNodes[sCountryCode].proxy_host;
        oProxy.proxy.port = pVn.proxyNodes[sCountryCode].proxy_port_https;
      } else {
        oProxy.proxy.country_code = sCountryCode;
        oProxy.proxy.protocol = "PROXY";
        oProxy.proxy.host = pVn.proxyNodes[sCountryCode].proxy_host;
        oProxy.proxy.port = pVn.proxyNodes[sCountryCode].proxy_port;
      }

      //! confirm if we get the channel list along with server
      if (pVn.proxyNodes[sCountryCode].hasOwnProperty("channels") !==
        false) {
        oProxy.channels = pVn.proxyNodes[sCountryCode].channels;
      }

      pVn.unblocker.set(callback);

      oProxy.allowWhitelistedHosts = pVn.systemSettings.allowWhitelistedHosts;
      oProxy.whitelistedHosts = pVn.systemSettings.whitelistedHosts;
      oProxy.regexUrlDomain = REGEX_URL_DOMAIN;

      var rules = "";
      var channels = {};
      var whitelistedHosts = [];
      var wildcardHosts = [];
      var replacer = "[^.]+";
      var pattern = "";
      rules = oProxy.proxy;
      if (oProxy.hasOwnProperty("channels") === true) {
        channels = oProxy.channels;
      }

      whitelistedHosts = [];
      if (oProxy.hasOwnProperty("whitelistedHosts") === true &&
        oProxy.hasOwnProperty("allowWhitelistedHosts") === true &&
        Array.isArray(oProxy.whitelistedHosts) &&
        oProxy.whitelistedHosts.length > 0) {
        if (oProxy.allowWhitelistedHosts === true) {
          var matchingUrlParts = [];
          for (var j = 0; j < oProxy.whitelistedHosts.length; j++) {
            matchingUrlParts =
            oProxy.regexUrlDomain.exec(oProxy.whitelistedHosts[j]);
            if (matchingUrlParts !== null && matchingUrlParts.length === 4) {
              if (matchingUrlParts[2] !== null) {
                whitelistedHosts.push(matchingUrlParts[2]);
              }
            }

            var bypassStr = oProxy.whitelistedHosts[j];
            if (bypassStr !== '' && bypassStr.includes('*')) {
              pattern = bypassStr.replace('*', replacer) + '$';
              wildcardHosts.push(pattern);
            }
          }
        } else {
          whitelistedHosts = [];
        }
      }
      whitelistedHosts.push(PROXY_API_ENDPOINT, PROXY_API_CLOUDFRONT_ENDPOINT);

      // On the request to open a webpage
      Proxy.prototype.handleProxyRequest = function(requestInfo) {
        const url = new URL(requestInfo.url);
        if (
          whitelistedHosts.indexOf(url.hostname) !== -1) {
          return {type: "DIRECT"};
        }

        if (LOCALHOSTS.includes(url.hostname)) {
          return {type: "DIRECT"};
        }

        for (var j = 0; j < wildcardHosts.length; j++) {
          if (url.host.match(pattern) !== null &&
            oProxy.hasOwnProperty("allowWhitelistedHosts") === true) {
            return 'DIRECT';
          }
        }

        if (pVn.isProxied === false) {
          return {type: "DIRECT"};
        }
        var countryServerChannels = Object.values(channels);
        if (countryServerChannels.length > 0) {
          for (var i = 0; i < countryServerChannels.length; i++) {
            if (url.hostname.indexOf(countryServerChannels[i].domain) !== -1) {
              if (countryServerChannels[i].server.proxy_port_https &&
                countryServerChannels[i].server.proxy_port_https !== 0) {
                return {type: "https",
                  host: countryServerChannels[i].server.proxy_host,
                  port: countryServerChannels[i].server.proxy_port_https};
              }
              return {type: "PROXY",
                host: countryServerChannels[i].server.proxy_host,
                port: countryServerChannels[i].server.proxy_port};
            }
          }
        }
        if (oProxy.proxy.country_code !== undefined) {
          return {type: rules.protocol, host: rules.host, port: rules.port};
        }
        return {type: "DIRECT"};
      };

      if (!(browser.proxy.onRequest.hasListener(
        pVn.unblocker.handleProxyRequest))) {
        // Listen for a request to open a webpage
        browser.proxy.onRequest.addListener(pVn.unblocker.handleProxyRequest,
          {urls: ["<all_urls>"]});
      }

      // HTTP errors
      browser.webRequest.onErrorOccurred.addListener(function(details) {
        var error = details.error;

        var params = {
          error: error,
          state: (pVn.isProxied === true) ?
            PROXY_STATES.CONNECTED : PROXY_STATES.DISCONNECTED,
          hostname: (
            details.proxyInfo !== null && details.proxyInfo.host !== null
          ) ? details.proxyInfo.host : '',
          connectedCountry: 'none',
          connectedCity: 'none',
          channelName: 'none'
        };

        if (pVn.lastConnectState !== pVn.isProxied) {
          if (pVn.isProxied === true) {
            if (error === CONNECTION_ERRORS.CONNECTION_TIMEOUT) {
              pVn.proxyPanelNotifications(
                'ProxyExtension_UnableToBrowse', params);
            }

            if (error === CONNECTION_ERRORS.UNKNOWN_PROXY_HOST ||
              error === CONNECTION_ERRORS.NS_ERROR_CONNECTION_REFUSED
            ) {
              pVn.proxyPanelNotifications(
                'ProxyExtension_UnableToConnect', params);
            }
          }
        }
      }, {urls: ["<all_urls>"]});
    };

    return new Proxy();
  })();
})();
