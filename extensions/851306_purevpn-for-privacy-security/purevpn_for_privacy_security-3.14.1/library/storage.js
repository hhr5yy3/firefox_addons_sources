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
  pVn.data = (function() {
    //! get data from local storage
    //! Params: item:[string,array:null]:required | callback:function:required
    var get = function(item, callback) {
      var onGet = function(oResponse) {
        pVn.nofuncE(callback, oResponse);
      };
      pVn.storage.get(item, onGet);
    };
    var set = function(oItem, callback, message) {
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      if (typeof message === "undefined") {
        message = oItem;
      }
      var onGet = function(oResponse) {
        pVn.systemSettings = oResponse;
        callback(message);
      };
      var change = function() {
        pVn.data.get(pVn.basicOptions, onGet);
      };
      var onSet = function() {
        pVn.nofuncE(change);
      };
      pVn.storage.set(oItem, onSet);
    };
    return {
      get: get,
      set: set
    };
  })();
})();
