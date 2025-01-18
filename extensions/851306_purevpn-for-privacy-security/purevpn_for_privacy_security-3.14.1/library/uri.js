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
  pVn.uri = (function() {
    var uriInterval;
    //! return url or protocol when non http/https url.
    var removeUrlProtocol = function(sUrl) {
      return sUrl.replace(RE_PROTO, '');
    };
    var get = function(sUrl, bStrict) {
      sUrl = sUrl.trim();
      var protocol = RE_PROTOCOL.exec(sUrl);
      if (protocol === null) {
        return sUrl;
      }

      if (protocol[0].startsWith("http")) {
        return sUrl;
      }
      if (!bStrict) {
        return protocol[0];
      }
      return sUrl;
    };

    //! extract host from url
    var getHost = function(sUrl, bNowww) {
      var sHost;
      if (sUrl === "" || sUrl === false || typeof sUrl === "undefined") {
        return false;
      }
      sUrl = sUrl.trim();
      // Check for system schemes
      if (new RegExp("^(" + pVn.systemSchemes.join("|") + ")").test(sUrl)) {
        // return pVn.browserScheme;
        return sUrl;
      }
      // find & remove protocol (http, ftp, etc.) and get host
      if (sUrl.indexOf("://") > -1) {
        sHost = sUrl.split('/')[2];
      } else {
        sHost = sUrl.split('/')[0];
      }

      sHost = sHost.split(':')[0];
      if (bNowww) {
        sHost = removeUrlProtocol(sHost);
      }

      return sHost;
    };

    var getDomain = function(sUrl) {
      return getHost(sUrl, true);
    };

    var domainMatch = function(sDomainA, sDomainB) {
      //! match host tail and either match length or backward char if it a . (dot)
      //! assume ads.example.com should match with example.com as well
      return sDomainA.endsWith(sDomainB) &&
      (sDomainA.length === sDomainB.length ||
        sDomainA.charAt(sDomainA.length - sDomainB.length - 1) === '.');
    };

    //! Url parser for domain fronting to be used
    var urlParserDF = function (sUrl) {
      if (pVn.systemSettings.use_cloudfront_domain === true) {
        var oUrl = new URL(sUrl);
        if (oUrl.href.indexOf(PROXY_API_ENDPOINT) !== -1) {
          oUrl.hostname = PROXY_API_CLOUDFRONT_ENDPOINT;
          sUrl = oUrl.href;
        }

        if (oUrl.href.indexOf(FUSION_AUTH_PRIMARY) !== -1) {
          oUrl.hostname = FUSION_AUTH_SECONDARY;
          sUrl = oUrl.href;
        }
      }
      return sUrl;
    }

    //! Request webservice call
    var request = function(sUrl, callback, bSync, sMethod, params,
      timeout = 5000) {
      if (pVn.systemSettings.use_cloudfront_domain === true) {
        var oUrl = new URL(sUrl);
        if (oUrl.href.indexOf(PROXY_API_ENDPOINT) !== -1) {
          oUrl.hostname = PROXY_API_ENDPOINT;
          sUrl = oUrl.href;
        }
      }
      if (!sMethod || sMethod === "") {
        sMethod = "GET";
      }
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      if (!params || params === "") {
        params = '';
      }
      // console.log("sUrl:%s, callback , bSync,sMethod,params", sUrl, callback, bSync, sMethod, params);
      var xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      /**
       * Handle xhr request object.
       * @param {object} oResponse The first number.
       * @return {void}
      */
      function handleRequest(oResponse) {
        // console.log("handleRequest %o",oResponse)
        var oResult = {
          url: sUrl,
          method: sMethod,
          status: oResponse.type,
          response: oResponse};
        // console.log("connection:%o, NetworkInformation:%o", connection, NetworkInformation.connection);
        // console.log("navigator.onLine:%o, oResponse:%o", navigator, oResponse);
        switch (oResponse.type) {
          case "progress":
            if (bSync) {
              oResult.percentage = oResponse.percentage;
              oResult.code = 2;
              callback(oResult);
            }
            break;
          case "timeout":
          case "error":
          case "abort":
            pVn.isOnline = false;
            // console.log("request > handleRequest > error|abort > oResponse:%o", oResponse);
            oResult.code = 0;
            if (oResponse.target.responseText === "" &&
                sUrl === USER_STEPS_URL) {
              //! not a valid error | net::ERR_SPDY_PROTOCOL_ERROR
              clearInterval(uriInterval);
              uriInterval = setTimeout(function() {
                request(sUrl, callback, bSync, sMethod, params);
              }, 5000);
            } else {
              callback(oResult);
            }
            break;
          case "load":
            pVn.isOnline = true;
            oResult.content = oResponse.target.responseText;
            oResult.code = (
              oResponse.target.status === 200
            ) ? 1 : oResponse.target.status;
            callback(oResult);
            break;
          // skip default case
        }
      }

      /**
       * Handle xhr progress event.
       * @typedef {object} ProgressEvent
       * @param {ProgressEvent} evt ProgressEvent parameter
       * @return {void}
      */
      function onProgress(evt) {
        var percentComplete = (evt.lengthComputable) ?
          evt.loaded / evt.total : 100;
        evt.percentage = percentComplete;
        handleRequest(evt);
      }
      /**
       * Handle xhr load event.
       * @param {object} evt LoadEvent parameter
       * @return {void}
      */
      function onLoad(evt) {
        handleRequest(evt);
      }
      // console.log("xhr printed",xhr)
      xhr.addEventListener("progress", onProgress);
      xhr.addEventListener("error", onLoad);
      xhr.addEventListener("abort", onLoad);
      xhr.addEventListener("load", onLoad);
      xhr.addEventListener("timeout", onLoad);
      xhr.open(sMethod, sUrl, true);
      if (pVn.systemSettings.access_token !== "" &&
        (sUrl.startsWith(SCHEME_SSL + PROXY_API_ENDPOINT) === true ||
          sUrl.startsWith(SCHEME_SSL + PROXY_API_CLOUDFRONT_ENDPOINT) ===
          true)) {
        xhr.setRequestHeader('X-Auth-Token', pVn.systemSettings.access_token);
      }
      if (pVn.systemSettings.refresh_token !== "" &&
        (sUrl.startsWith(SCHEME_SSL + PROXY_API_ENDPOINT) === true ||
        sUrl.startsWith(SCHEME_SSL + PROXY_API_CLOUDFRONT_ENDPOINT) === true) &&
          sUrl.indexOf(API_TOKEN_REFRESH) !== -1) {
        xhr.setRequestHeader('X-REFRESH-TOKEN',
          pVn.systemSettings.refresh_token);
      }
      if ((sUrl.startsWith(SCHEME_SSL + PROXY_API_ENDPOINT) === true ||
        sUrl.startsWith(SCHEME_SSL + PROXY_API_CLOUDFRONT_ENDPOINT) === true) &&
        (sUrl.indexOf(API_COUNTRIES_LIST) !== -1 ||
          sUrl.indexOf(API_CHANNELS_LIST) !== -1 ||
          sUrl.indexOf(API_CITIES_LIST) !== -1)) {
        if (sUrl.indexOf(API_COUNTRIES_LIST) !== -1) {
          xhr.setRequestHeader('Server-Checksum',
            pVn.systemSettings.country_checksum);
        }
        if (sUrl.indexOf(API_CHANNELS_LIST) !== -1) {
          xhr.setRequestHeader('Server-Checksum',
            pVn.systemSettings.channel_checksum);
        }

        if (sUrl.indexOf(API_CITIES_LIST) !== -1) {
          xhr.setRequestHeader('Server-Checksum',
            pVn.systemSettings.city_checksum);
        }
      }

      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      try {
        xhr.send(params);
      } catch (e) {
        // console.log("e:%o", e);
        handleRequest({type: "error"});
      }
    };

    return {
      getUrl: get,
      request: request,
      getHost: getHost,
      getDomain: getDomain,
      domainMatch: domainMatch,
      urlParserDF: urlParserDF
    };
  })();
})();
