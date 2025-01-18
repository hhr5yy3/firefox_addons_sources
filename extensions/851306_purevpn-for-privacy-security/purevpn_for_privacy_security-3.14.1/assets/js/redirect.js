/*
*   PureVPN
*   by GZ systems Ltd.
* Everyone is permitted to copy and distribute verbatim copies
* of this document, but changing it is not allowed.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
* copyright 2017 All Rights are Reserved.
*/
(function() {
  'use strict';
  /* global EXT_MEMBER_AREA_AUTOLOGIN_URL*/
  pVn.userRedirect = (function() {
    var clientAreaAutoLogin = function() {
      var getClientRedirectTokenResponse = function(oResponse) {
        if (oResponse !== undefined) {
          var redirectUrl =
          pVn.createUrlWithQueryString(
            EXT_MEMBER_AREA_AUTOLOGIN_URL, oResponse);
          window.location.replace(redirectUrl);
        } else if (oResponse === undefined) {
          window.close();
        }
      };
      var urlParams = new URLSearchParams(window.location.search);
      chrome.runtime.sendMessage({what: 'getClientRedirectToken',
        slug: urlParams.get('slug')},
      getClientRedirectTokenResponse);
    };
    return {
      clientAreaAutoLogin: clientAreaAutoLogin
    };
  })();

  pVn.userRedirect.clientAreaAutoLogin();
})();
