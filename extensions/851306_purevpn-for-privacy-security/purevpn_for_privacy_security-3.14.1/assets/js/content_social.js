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
  window.addEventListener("message", function(event) {
    if (event.source === window && event.data) {
      browser.runtime.sendMessage({
        what: "socialSignupResult",
        oResponse: event.data
      });
    }
  }, false);
})();
