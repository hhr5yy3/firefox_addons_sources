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
  var circularStringify = function(obj) {
    const cache = [];
    const result = JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache.length = 0;
    return result;
  };

  pVn.auth = (function() {
    var options = {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7};
    var authTimeOut;
    var isLogin = false;
    var isFreeUserLogin = false;
    //! Decrypt password
    var getDecryptedPassword = function() {
      var encryptedJson = (typeof pVn.systemSettings.encJson === 'string') ?
        JSON.parse(pVn.systemSettings.encJson) : pVn.systemSettings.encJson;
      var decrypted = CryptoJS.AES.decrypt(encryptedJson,
        pVn.systemSettings.salt, options);
      return decrypted.toString(CryptoJS.enc.Utf8);
    };
    //! Set Alarm for next refresh token
    var setAlarmAccessToken = function(iSeconds, callback) {
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      if (!iSeconds || iSeconds === "") {
        iSeconds = 3600;
      }
      
      chrome.alarms.get('silentAccessTokenRefresh', a => {
        if (a) chrome.alarms.clear('silentAccessTokenRefresh');
        chrome.alarms.create('silentAccessTokenRefresh', { periodInMinutes: (iSeconds/60) });
        callback();
      });
    };
    
    
    //! MD5 For Network Other and remove last characters to return 28chars
    /* eslint new-cap: [2, {"capIsNewExceptions": ["MD5"]}]*/
    var getMd5Chars28 = function(sMessage) {
      var hash = CryptoJS.MD5(sMessage);
      return 'purevpn.' + hash.toString().substring(0, 28);
    };
    //! onAuthRequired - return Auth Credential [node user/pass]
    //! nodeToken must be set at the time of getting node details: otherwise it will throw blank object
    var onAuthRequired = function(details) {
      if (details.isProxy === true) {
        var usernameHost = pVn.systemSettings.user_name;
        var passwordHost = getDecryptedPassword();
        var request = {};
        //! confirm match realm
        if (details.realm === "Web-Proxy") {
          usernameHost = getMd5Chars28(pVn.systemSettings.user_name);
          passwordHost = PASSWORD_HOST;
        }
        //! set request username and password for authentication
        request.authCredentials = {
          username: usernameHost,
          password: passwordHost
        };
        return request;
      }
      return {};
    };

    //! Logout user
    var logout = async function(tabId, removeAccounts, callback) {
      if(removeAccounts ===true) {
        const url = `https://purevpn.fusionauth.io/oauth2/logout?client_id=${FUSION_AUTH_CLIENT_ID}`   
        chrome.identity.launchWebAuthFlow({'url': url, 'interactive': false, }); 
      }
      chrome.alarms.clear('silineAccessTokenRefresh');
      var onWebRTCStop = function() {
        pVn.getPopupData(tabId, callback);
      };
      var onLogout = function() {
        pVn.webRtcLeak(onWebRTCStop);
      };
      var onStopVPN = function() {
        pVn.proxyPanelNotifications('ProxyExtension_Logout');
        pVn.clientUserName = '';
        pVn.clientSignupDetail = {};
        pVn.clientUserId = '';
        pVn.systemSettings.user_name = '';
        pVn.systemSettings.user_id = '';
        pVn.systemSettings.user_email = '';
        pVn.systemSettings.verification_state = false;
        pVn.systemSettings.password = '';
        pVn.systemSettings.salt = '';
        pVn.systemSettings.encJson = {};
        pVn.systemSettings.last_login_active = false;
        pVn.systemSettings.access_token = '';
        pVn.systemSettings.refresh_token = '';
        pVn.systemSettings.access_token_time = '';
        // pVn.systemSettings.countries_favourites = [];
        // pVn.systemSettings.cities_favourites = [];
        pVn.systemSettings.default_city = '';
        // pVn.systemSettings.channels_favourites = [];
        pVn.systemSettings.default_country = '';
        pVn.systemSettings.serverKey = 'countryCode';
        pVn.systemSettings.channel_name = '';
        pVn.systemSettings.site_prefs = {};
        pVn.systemSettings.webRtcLeak = false;
        pVn.systemSettings.client_type = "";
        pVn.systemSettings.channelToolTiptext_Link = {};
        pVn.systemSettings.countryToolTiptext_Link = {};
        pVn.getSocial = false;
        pVn.systemSettings.campaignData = {};
        pVn.systemSettings.showCampaignCounter = 1;
        pVn.systemSettings.campaignPopupCount = -1;
        pVn.systemSettings.showCampaign = false;
        pVn.systemSettings.campaignApplyRuleByHours = 0;
        pVn.systemSettings.campaignActive = false;
        pVn.campaignInterval = 0;
        pVn.systemSettings.bannerCampaignData = {};
        pVn.autoLoginFailedMsg = "";
        pVn.systemSettings.user_unique_id = "";
        pVn.systemSettings.user_gateway = "";
        pVn.systemSettings.first_connect = 1;
        pVn.systemSettings.refer_frnd_avl = 24;
        pVn.systemSettings.refer_frnd_sent = 0;
        pVn.systemSettings.refer_link = '';
        pVn.systemSettings.user_signup_date = '';

        if (removeAccounts === true) {
          pVn.systemSettings.vpnusernames = [];
        }
        pVn.systemSettings.use_cloudfront_domain = false;
        pVn.systemSettings.billing_cycle = "";
        pVn.storage.set({
          user_name: pVn.systemSettings.user_name,
          user_email: pVn.systemSettings.user_email,
          verification_state: pVn.systemSettings.verification_state,
          user_id: pVn.systemSettings.user_id,
          password: pVn.systemSettings.password,
          salt: pVn.systemSettings.salt,
          encJson: pVn.systemSettings.encJson,
          last_login_active: pVn.systemSettings.last_login_active,
          access_token: pVn.systemSettings.access_token,
          refresh_token: pVn.systemSettings.refresh_token,
          access_token_time: pVn.systemSettings.access_token_time,
          countries: pVn.systemSettings.countries,
          countries_favourites: pVn.systemSettings.countries_favourites,
          cities_favourites: pVn.systemSettings.cities_favourites,
          channels: pVn.systemSettings.channels,
          channels_favourites: pVn.systemSettings.channels_favourites,
          default_country: pVn.systemSettings.default_country,
          default_city: pVn.systemSettings.default_city,
          serverKey: pVn.systemSettings.serverKey,
          site_prefs: pVn.systemSettings.site_prefs,
          webRtcLeak: pVn.systemSettings.webRtcLeak,
          client_type: pVn.systemSettings.client_type,
          channelToolTiptext_Link: pVn.systemSettings.channelToolTiptext_Link,
          countryToolTiptext_Link: pVn.systemSettings.countryToolTiptext_Link,
          campaignData: pVn.systemSettings.campaignData,
          showCampaignCounter: pVn.systemSettings.showCampaignCounter,
          campaignPopupCount: pVn.systemSettings.campaignPopupCount,
          showCampaign: pVn.systemSettings.showCampaign,
          campaignApplyRuleByHours: pVn.systemSettings.campaignApplyRuleByHours,
          campaignActive: pVn.systemSettings.campaignActive,
          bannerCampaignData: pVn.systemSettings.bannerCampaignData,
          user_unique_id: pVn.systemSettings.user_unique_id,
          first_connect: pVn.systemSettings.first_connect,
          user_gateway: pVn.systemSettings.user_gateway,
          vpnusernames: pVn.systemSettings.vpnusernames,
          use_cloudfront_domain: pVn.systemSettings.use_cloudfront_domain,
          billing_cycle: pVn.systemSettings.billing_cycle,
          refer_frnd_avl: pVn.systemSettings.refer_frnd_avl,
          refer_frnd_sent: pVn.systemSettings.refer_frnd_sent,
          refer_link: pVn.systemSettings.refer_link,
          user_signup_date: pVn.systemSettings.user_signup_date,
          token: "",
          user: "",
          first_connect_username: "",
          latitude: "",
          longitude: "",
          proxy_user_unique_id: "",
          user_expiry_date: "",
          whitelistedHosts: []
        }, onLogout);
      };
      pVn.serviceStop(onStopVPN);
    };    

    var getUserMemberAreaRedirectToken = function(slug, callback) {
      var userRedirectTokenDetails = {};

      var sendData = function() {
        callback(userRedirectTokenDetails);
      };
      /* global PVPN_TOKEN */
      if (typeof pVn.systemSettings.user_unique_id !== 'undefined' &&
        typeof PVPN_TOKEN !== 'undefined') {
        var userRedirectToken =
      CryptoJS.MD5(pVn.systemSettings.user_unique_id + PVPN_TOKEN);
        userRedirectTokenDetails = {
          token: userRedirectToken.toString(),
          uuid: pVn.systemSettings.user_unique_id,
          redirect_to: slug
        };
        sendData(userRedirectTokenDetails);
      }
    };

    const initiateOauth = async ({code_verifier, code_challenge}, callback) => {
      //! get the authorization code data and initiate the token request
      const generateTokens = async (formData) => {
        // This method calls this /token api to create required tokens
        var urlEncodedData = new URLSearchParams();
        urlEncodedData.append("code", formData.code);
        urlEncodedData.append("grant_type", formData.grant_type);
        urlEncodedData.append("redirect_uri", formData.redirect_uri);
        urlEncodedData.append("client_id", formData.client_id);
        urlEncodedData.append("code_verifier", formData.code_verifier);
        
        //! initiate the request 
        const response = await fetch(pVn.uri.urlParserDF('https://purevpn.fusionauth.io/oauth2/token'),{
          method: 'POST',
          body: urlEncodedData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        //! console.log("token response:%o", response);
        //! catch the response code
        if (!response.ok) {
          //! throw error if not ok
          callback({code: 6, message: pVn.i18n("txtErrorMsg")});
          return;
        }

        //! get the response
        const accessTokenResponse = await response.json();
        //! console.log("accessTokenResponse:%o", accessTokenResponse);
        //! store the access and refresh token
        pVn.systemSettings.access_token = accessTokenResponse.access_token;
        pVn.systemSettings.refresh_token = accessTokenResponse.refresh_token;
        pVn.systemSettings.access_token_time = pVn.makeTime(
                accessTokenResponse.expires_in.toString());
        //! store in the storage
        pVn.storage.set(
          {
            access_token: pVn.systemSettings.access_token,
            refresh_token: pVn.systemSettings.refresh_token,
            access_token_time: pVn.systemSettings.access_token_time
          }, pVn.nofunc
        );

        //! get the latest user details
        const getUserInfoResponse = await fetch(pVn.uri.urlParserDF('https://purevpn.fusionauth.io/oauth2/userinfo'), {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${pVn.systemSettings.access_token}`
          }
        });
        //! console.log("user response:%o", getUserInfoResponse);
        //! catch the response code
        if (!getUserInfoResponse.ok) {
          //! throw error if not ok
          callback({code: 6, message: pVn.i18n("txtErrorMsg")});
          return;
        }

        //! user detail response
        const userInfoResponse = await getUserInfoResponse.json();
        //! console.log("userInfoResponse:%o", userInfoResponse);
        //! grab the subscription data
        var subscriptions = userInfoResponse.user.data.subscription[userInfoResponse.user.data.type];
        //! console.log("subscriptions:%o", subscriptions);
        //! exit if user has no subscription
        if (subscriptions.length === 0) {
          callback({code: 6, message: pVn.i18n("noSubscriptionTxtErrorMsg")});
          return;
        }

        //! list all the username for more than one subscription only so user could choose one
        var userNames = [];
        pVn.systemSettings.user_name = subscriptions[0].vpnusername;
        if (subscriptions.length > 1) {
          pVn.systemSettings.user_name = "";
          var userNames = subscriptions.map(subscription=> subscription.vpnusername);
          var loginData = {
            code: 4,
            message: 'success'
          };
        }

        var onSaveUserDetails = function () {
          if (subscriptions.length === 1) {
            setPostAuthentication(pVn.systemSettings.user_name, callback)
          } else {
            callback(loginData);
          }
        }

        //! store token & user endpoint response in the localstorage.
        localStorage.setItem('user', JSON.stringify(userInfoResponse));
        localStorage.setItem('token', JSON.stringify(accessTokenResponse));

        //! store the user details
        pVn.systemSettings.user_id = userInfoResponse.user.data.accountCode;
        pVn.systemSettings.user_unique_id = pVn.systemSettings.user_id;
        pVn.systemSettings.user_email = userInfoResponse.email || userInfoResponse.user.data.email;
        pVn.systemSettings.vpnusernames = userNames;
        pVn.clientUserName = pVn.systemSettings.user_name;
        //! store data to locastorage
        pVn.storage.set(
          {
            user_id: pVn.systemSettings.user_id,
            user_unique_id: pVn.systemSettings.user_unique_id,
            user_email: pVn.systemSettings.user_email,
            user_name: pVn.systemSettings.user_name,
            vpnusernames: pVn.systemSettings.vpnusernames,
            user: userInfoResponse,
            token: accessTokenResponse
          }, onSaveUserDetails
        );
        
      }

      //This Method Initiates the oAuth process and calls the generate token method
      var redirectUri = chrome.identity.getRedirectURL("oauth2");
      const client_id = FUSION_AUTH_CLIENT_ID;
      const url = `https://purevpn.fusionauth.io/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&scope=offline_access&code_challenge=${code_challenge}&code_challenge_method=S256`;
      chrome.identity.launchWebAuthFlow(
          {'url': url, 'interactive': true, },
        async redirect_url => {
          if(!redirect_url) {
            callback({code: 7, message: pVn.i18n("txtErrorMsg")});
            return;
          }

          try{
            function getQueryParams(url) {
              const paramArr = url.slice(url.indexOf('?') + 1).split('&');
              const params = {};
              paramArr.map(param => {
                  const [key, val] = param.split('=');
                  params[key] = decodeURIComponent(val);
              })
              return params;
            }
            const authorizationCode = getQueryParams(redirect_url)?.code
            const formData = {
                code: authorizationCode,
                grant_type:'authorization_code',
                redirect_uri: redirectUri,
                client_id: client_id,
                code_verifier: code_verifier
              }
              generateTokens(formData, callback)
          } catch(error) {
            callback({code: 3, message: pVn.i18n("txtErrorMsg")});
          }
        }
      );
    }  
    const setPostAuthentication = (username, callback) => {
      //! validate the username
      if (!username) {
        username = pVn.clientUserName || pVn.systemSettings.user_name;
      }
      //! exit if no username
      //! means logout
      if (!username) {
        pVn.serviceStop(callback);
        return;
      }
      const apiResponseMethod = async (oResponse) => {
        const responseData = JSON.parse(oResponse.content);
        //callback({username: responseData.body.userName, password: responseData.body.password })
        //! get user from storage
        //const {user, token} = await pVn.storage.get(['user','token']);
        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));
        //! rebuild the user data
        pVn.systemSettings.user_name = responseData.body.userName;
        pVn.systemSettings.access_token = token.access_token;
        pVn.systemSettings.refresh_token = token.refresh_token;
        pVn.systemSettings.access_token_time = pVn.makeTime(
          token.expires_in.toString());
        pVn.systemSettings.user_id = user.user.data.accountCode;
        pVn.systemSettings.user_unique_id = pVn.systemSettings.user_id;
        pVn.systemSettings.user_email = user.email || user.user.data.email;
        //! loop through the subscription array to get the chosen username details
        let subscriptions = user.user.data.subscription[user.user.data.type];
        for (var i in subscriptions) {
          if (subscriptions[i].vpnusername == pVn.systemSettings.user_name) {
            pVn.systemSettings.user_status = subscriptions[i].status;
            pVn.systemSettings.user_gateway = subscriptions[i].paymentGateway;
            pVn.systemSettings.billing_cycle = subscriptions[i].billingCycle;
            pVn.systemSettings.user_expiry_date = subscriptions[i].expiry;
            pVn.systemSettings.client_type = CLIENT_TYPE_PAID;
          }
        }

        //! enable webrtc protection
        pVn.systemSettings.webRtcLeak = true;

        //! encrypt and save vpn password
        var password = responseData.body.password;
        pVn.systemSettings.salt = CryptoJS.lib.WordArray
          .random(128 / 8).toString();
        //! encrypt
        pVn.systemSettings.encJson = CryptoJS.AES.encrypt(
          password, pVn.systemSettings.salt, options);
        pVn.systemSettings.password = pVn.systemSettings.encJson
          .ciphertext.toString(CryptoJS.enc.Base64);
        // console.log("password:%s, json:%o, ciphertext:%s, salt:%s", password, pVn.systemSettings.encJson, pVn.systemSettings.password, pVn.systemSettings.salt);
        pVn.systemSettings.encJson = circularStringify(
          pVn.systemSettings.encJson);
        
        //! build env data
        pVn.isReady = true;
        pVn.isLoggedIn = true;
        pVn.systemSettings.last_login_active = true;

        //! store data to locastorage
        pVn.data.set(
          {
            user_name: pVn.systemSettings.user_name,
            password: pVn.systemSettings.password,
            salt: pVn.systemSettings.salt,
            encJson: pVn.systemSettings.encJson,
            access_token: pVn.systemSettings.access_token,
            refresh_token: pVn.systemSettings.refresh_token,
            access_token_time: pVn.systemSettings.access_token_time,
            user_id: pVn.systemSettings.user_id,
            user_unique_id: pVn.systemSettings.user_unique_id,
            user_email: pVn.systemSettings.user_email,
            /* subscription details user_status is actually subscription status*/
            user_status: pVn.systemSettings.user_status,
            user_gateway: pVn.systemSettings.user_gateway,
            billing_cycle: pVn.systemSettings.billing_cycle,
            user_expiry_date: pVn.systemSettings.user_expiry_date,
            last_login_active: pVn.systemSettings.last_login_active,
            client_type: pVn.systemSettings.client_type,
            webRtcLeak: pVn.systemSettings.webRtcLeak
          }, pVn.nofunc
        );

        //! get the time difference
        var timeDiff = pVn.timeDiff(pVn.systemSettings.access_token_time);
        //! since the time not arrived yet, lets set the alarm
        pVn.auth.setAlarmAccessToken(timeDiff.seconds);
        //! return the response
        pVn.switchServices(function(){
          callback({code: 1, message: "success" });
        });
      }
      
      const encodedData = new URLSearchParams()
      encodedData.append('user_name', username)  
        pVn.uri.request(API_GET_PASSWORD, apiResponseMethod, false, "POST", encodedData)
    }

    const refreshAccessToken = async (callback) => {
      if (!callback || typeof callback !== "function") {
        callback = pVn.nofunc;
      }
      //! exit if user not logged in
      if (pVn.systemSettings.refresh_token === "") {
        pVn.isReady = false;
        pVn.isLoggedIn = false;
        pVn.systemSettings.last_login_active = false;
        chrome.alarms.clear('silineAccessTokenRefresh');
        pVn.serviceStop(callback);
        return;
      }

      //! exit if token is valid
      if (pVn.systemSettings.access_token !== "" &&
          pVn.systemSettings.access_token_time !== "" && 
          pVn.systemSettings.access_token_time > pVn.makeDate()) {
        //! get the time difference
        var timeDiff = pVn.timeDiff(pVn.systemSettings.access_token_time);
        //! since the time not arrived yet, lets set the alarm
        pVn.auth.setAlarmAccessToken(timeDiff.seconds, callback);
        return;
      }

      try {
        //! initiate the refresh token
        var redirectUri = chrome.identity.getRedirectURL("oauth2");
        //! construct the parameters
        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append('client_id', FUSION_AUTH_CLIENT_ID);
        urlEncodedData.append('redirect_uri', redirectUri);
        urlEncodedData.append('refresh_token', pVn.systemSettings.refresh_token);
        urlEncodedData.append('grant_type', "refresh_token");
        //! initiate the request 
        const response = await fetch(pVn.uri.urlParserDF('https://purevpn.fusionauth.io/oauth2/token'),{
          method: 'POST',
          body: urlEncodedData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        //! catch the response code
        if (!response.ok) {
          //! throw error if not ok
          throw new Error(response);
          return;
        }

        //! get the response
        const refreshTokenResponse = await response.json();
        //! store the access and refresh token
        //pVn.storage.set({'tokens': refreshTokenResponse})
        pVn.systemSettings.access_token = refreshTokenResponse.access_token;
        pVn.systemSettings.refresh_token = refreshTokenResponse.refresh_token;
        pVn.systemSettings.access_token_time = pVn.makeTime(
                refreshTokenResponse.expires_in.toString());
        //! store in the storage
        pVn.storage.set(
          {
            access_token: pVn.systemSettings.access_token,
            refresh_token: pVn.systemSettings.refresh_token,
            access_token_time: pVn.systemSettings.access_token_time
          }, pVn.nofunc
        );

        //! get the latest user details
        const refreshUserResponse = await fetch(pVn.uri.urlParserDF('https://purevpn.fusionauth.io/oauth2/userinfo'), {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${pVn.systemSettings.access_token}`
          }
        });
        //! catch the response code
        if (!refreshUserResponse.ok) {
          //! throw error if not ok
          throw new Error(refreshUserResponse);
          return;
        }

        //! user detail response
        const refreshUserInfoResponse = await refreshUserResponse.json();
        //! store the user details
        pVn.systemSettings.user_id = refreshUserInfoResponse.user.data.accountCode;
        pVn.systemSettings.user_unique_id = pVn.systemSettings.user_id;
        pVn.systemSettings.user_email = refreshUserInfoResponse.email || refreshUserInfoResponse.user.data.email;
        
        //! loop through the subscription array to get the chosen username details
        let subscriptions = refreshUserInfoResponse.user.data.subscription[refreshUserInfoResponse.user.data.type];
        for (var i in subscriptions) {
          //pVn.systemSettings.user_name subscription.vpnusername
          if (subscriptions[i].vpnusername == pVn.systemSettings.user_name) {
            pVn.systemSettings.user_status = subscriptions[i].status;
            pVn.systemSettings.user_gateway = subscriptions[i].paymentGateway;
            pVn.systemSettings.billing_cycle = subscriptions[i].billingCycle;
            pVn.systemSettings.user_expiry_date = subscriptions[i].expiry;
            pVn.systemSettings.client_type = CLIENT_TYPE_PAID;
          }
        } 
        
        //! store data to locastorage
        pVn.storage.set(
          {
            user_id: pVn.systemSettings.user_id,
            user_unique_id: pVn.systemSettings.user_unique_id,
            user_email: pVn.systemSettings.user_email,
            /* subscription details user_status is actually subscription status*/
            user_status: pVn.systemSettings.user_status,
            user_gateway: pVn.systemSettings.user_gateway,
            billing_cycle: pVn.systemSettings.billing_cycle,
            user_expiry_date: pVn.systemSettings.user_expiry_date,
            client_type: pVn.systemSettings.client_type,
            user: refreshUserResponse,
            token: refreshTokenResponse
          }, callback
        );
      } catch (error) {
        //! set the alarm so we could do the refresh again
        pVn.auth.setAlarmAccessToken(30, callback);
      }
    }

    return {
      del: logout,
      onAuth: onAuthRequired,
      userMemberAreaRedirectToken: getUserMemberAreaRedirectToken,
      initiateOauth: initiateOauth,
      setPostAuthentication: setPostAuthentication,
      setAlarmAccessToken: setAlarmAccessToken,
      refreshAccessToken: refreshAccessToken
    };
  })();
})();
