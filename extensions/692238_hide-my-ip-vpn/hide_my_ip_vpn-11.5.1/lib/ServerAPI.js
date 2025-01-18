var get = chrome.i18n.getMessage;

var ServerAPI = {
  serviceUrl: 'https://my-safe-net.com/misc/proxylistpro/action',
  knownProxy: new Array(),
  requstIndex: 0,
  debugMode: false,

  messages: {
    Authenticate: {
      '-1': get('auth_incorrect_msg'),
      '-2': get('auth_approve_msg'),
      '-3': get('auth_disabled_msg'),
      '-4': get('auth_wait_msg'),
      '-5': get('auth_error_msg'),
      '-6': get('auth_not_exist_msg'),
      '-777': get('auth_unexpect_msg')
    },
    RegisterUser: {
      '-1': get('reg_invalid_msg'),
      '-2': get('reg_cannot_msg'),
      '-3': get('reg_exist_msg'),
      '-777': get('reg_unexpect_msg')
    },
    GetProxyList: {
      '-1': get('list_invalid_msg'),
      '-2': get('list_not_have_msg'),
      '-777': get('list_unexpect_msg')
    },
    Logout: {
      '-1': get('logout_invalid_msg'),
      '-777': get('logout_unexpect_msg')
    },
    IdentifyProxy: {
      '-1': get('identify_noproxy_msg'),
      '-777': get('identify_unexpect_msg')
    },
    SendMessage: {
      '-1': get('ticket_invalid_msg'),
      '1': get('ticket_created_msg'),
      '2': get('ticket_emailed_msg'),
      '-777': get('ticket_unexpect_msg')
    },
    RecoverPassword: {
      '-1': get('recover_not_exist_msg'),
      '1': get('recover_emailed_msg'),
    },
    GeoInformatoin: {
      '-1': get('geo_cannot_msg'),
      '-777': get('geo_unexpect_msg')
    }
  },

  /* private methods: start */
  Callback: function(fn, ctx) {
    return function() {
      fn.apply(ctx, arguments);
    }
  },

  Request: function(options) {
    // decorator: compatibility with Firefox/Chrome
    options.content.source = get('app_short_name');

    var postData = new Array();
    for (key in options.content)
      postData.push(encodeURIComponent(key)+'='+encodeURIComponent(options.content[key]));

    var requestObject = new XMLHttpRequest();
    requestObject.open('POST', options.url, true);
    requestObject.onreadystatechange = this.Callback(function() {
      if (requestObject.readyState == 4) {
        if (this.debugMode) console.log('Reply for request #'+requestObject.requstIndex+', last request #'+this.requstIndex);
        if (requestObject.requstIndex == this.requstIndex)
          try { var json = JSON.parse(requestObject.responseText)} catch(err) { json = null };
          options.onComplete({
            text: requestObject.responseText,
            json: json,
            status: requestObject.status,
            statusText: requestObject.statusText
          });
      }
    }, this);
    requestObject.requstIndex = ++this.requstIndex;
    requestObject.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    requestObject.send(postData.join('&'));
  },


  ExtractMessage: function(operation, data) {
    var errorCode = -777;
    var errorMessage = 'Unknown message "' + data + '"';

    if (operation in this.messages) {
      var data = data.split(':');
      errorCode = (data[1] in this.messages[operation]) ? data[1] : -777;
      errorMessage = this.messages[operation][errorCode]
    }

    return {
      code: errorCode,
      message: errorMessage
    }
  },

  ExtractServerProxyList: function(data, isFreeProxy) {
    var proxyList = new Array();
    rawProxyList = data.split("\r\n");
    if (rawProxyList.length)
      for(var i in rawProxyList) {
        // de|Germany, Berlin|144.76.243.97:110
        // de|Germany, Berlin|144.76.243.97:110|domain.proxylistpro.com:110
        proxyData = rawProxyList[i].split('|');
        countryCityData = proxyData[1].split(', ');
        hostPortData = proxyData[2].split(':');
        var proxy = {
          proxy: hostPortData[0]+':'+hostPortData[1],
          host: hostPortData[0],
          port: hostPortData[1],
          countryCode: proxyData[0],
          countryName: countryCityData[0],
          cityName: countryCityData[1],
          isUserProxy: false,
          isFreeProxy: isFreeProxy
        }
        if (proxyData.length == 4) {
          hostPortData = proxyData[3].split(':');
          proxy.domain_host = hostPortData[0];
          proxy.domain_port = hostPortData[1];
        }
        proxyList.push(proxy);
      }
    return proxyList;
  },

  ExtractUserProxyList: function(data) {
    var result = new Array();
    var matches = data.match(/(\w+:\w+@)?\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{2,5}/g);
    if (matches && matches.length)
      for (var i in matches) {
        if (matches[i].indexOf('@') > 0) {
          var host = matches[i].split('@')[1].split(':')[0];
          var port = matches[i].split('@')[1].split(':')[1];
          var user = matches[i].split('@')[0].split(':')[0];
          var password = matches[i].split('@')[0].split(':')[1];
        } else {
          var host = matches[i].split(':')[0];
          var port = matches[i].split(':')[1];
          var user = password = null;
        }
        result.push({
          host: host,
          port: port,
          user: user,
          password: password
        });
      }
    return result;
  },

  GetHostGeoData: function(host, geoData) {
    if (geoData.length)
      for (var i in geoData)
        if (geoData[i].host == host)
          return geoData[i];
    return false;
  },

  GetProxyAuthData: function(proxy, authData) {
    if (authData.length)
      for (var i in authData)
        if (authData[i].proxy == proxy) {
          return authData[i];
        }
    return false;
  },
  /* private methods: end */

  AbortRequst: function() {
    this.requstIndex += 1;
  },

  Authenticate: function(email, pass, success, fail) {
    if (this.debugMode) console.log('Authentication with "' + email + ':' + pass + '" (ServerAPI.Authenticate)');
    this.Request({
      url: this.serviceUrl,
      content: {
        'op': 'check',
        'email': email,
        'password': pass
      },
      onComplete: this.Callback(function(response) {
        if (this.debugMode) console.log('Authentication result "' + response.text + '" (ServerAPI.Authenticate)');
        response = response.text;
        if (response.substring(0, 2) == 'OK') {
          response = response.split(':');
          success(response[1], response[2], response[3]);
        } else {
          response = this.ExtractMessage('Authenticate', response);
          fail(response.code, response.message);
        }
      }, this)
    });

  },

  RegisterUser: function(email, pass, success, fail) {
    if (this.debugMode) console.log('Creating account with "' + email + ':' + pass + '" (ServerAPI.RegisterUser)');
    this.Request({
      url: this.serviceUrl,
      content: {
        'op': 'add',
        'email': email,
        'password': pass
      },
      onComplete: this.Callback(function(response) {
        if (this.debugMode) console.log('Creating account result "' + response.text + '" (ServerAPI.Authenticate)');
        response = response.text;
        if (response.substring(0, 2) == 'OK') {
          success();
        } else {
          response = this.ExtractMessage('RegisterUser', response);
          fail(response.code, response.message);
        }
      }, this)
    });
  },

  GetProxyList: function(email, password, isDemo, success, fail) {
    if (this.debugMode) console.log('Getting proxy list for "' + email + '" (ServerAPI.GetProxyList)');
    this.Request({
      url: this.serviceUrl,
      content: {
        'op': 'listpaid',
        'email': email
      },
      onComplete: this.Callback(function(response) {
        if (this.debugMode) console.log('Getting proxy list result "' + response.text + '" (ServerAPI.Authenticate)');
        response = response.text;
        if (response.substring(0, 2) == 'ER') {
          response = this.ExtractMessage('GetProxyList', response);
          fail(response.code, response.message);
        } else {
          var proxyList = this.ExtractServerProxyList(response, false);
          for (var i in proxyList) {
            proxyList[i].user = email;
            proxyList[i].password = password;
          }
          success(proxyList);
        }
      }, this)
    });
  },

  GetFreeProxyList: function(email, password, success) {
    if (this.debugMode) console.log('Getting free proxy list (ServerAPI.GetFreeProxyList)');
    this.Request({
      url: this.serviceUrl,
      content: {
        'op': 'listfree',
      },
      onComplete: this.Callback(function(response) {
        if (this.debugMode) console.log('Getting free proxy list result "' + response.text + '" (ServerAPI.GetFreeProxyList)');
        response = response.text;
        var proxyList = this.ExtractServerProxyList(response, true);
        for (var i in proxyList) {
          proxyList[i].user = email;
          proxyList[i].password = password;
        }
        success(proxyList);
      }, this)
    });
  },

  Logout: function(email, success, fail) {
    if (this.debugMode) console.log('Loging out for "' + email + '" (ServerAPI.Logout)');
    this.Request({
      url: this.serviceUrl,
      content: {
        'op': 'logout',
        'email': email
      },
      onComplete: this.Callback(function(response) {
        if (this.debugMode) console.log('Loging out result "' + response.text + '" (ServerAPI.Authenticate)');
        response = response.text;
        if (response.substring(0, 2) == 'ER') {
          response = this.ExtractMessage('Logout', response);
          fail(response.code, response.message);
        } else {
          success();
        }
      }, this)
    });
  },

  SendMessage: function(email, pass, subject, message, success, fail) {
    if (this.debugMode) console.log('Sending message with subject "' + subject + '" for "' + email + ':' + pass + '" (ServerAPI.SendMessage)');
    this.Request({
      url: this.serviceUrl,
      content: {
        'op': 'ticket',
        'email': email,
        'password': pass,
        'subject': subject,
        'message': message
      },
      onComplete: this.Callback(function(response) {
        if (this.debugMode) console.log('Sending message result "' + response.text + '" (ServerAPI.Authenticate)');
        response = response.text;
        if (response.substring(0, 2) == 'ER') {
          response = this.ExtractMessage('SendMessage', response);
          fail(response.code, response.message);
        } else {
          response = this.ExtractMessage('SendMessage', response);
          success(response.code, response.message);
        }
      }, this)
    });
  },

  RecoverPassword: function(email, success, fail) {
    if (this.debugMode) console.log('Recovere passwrod for "' + email + '" (ServerAPI.RecoverPassword)');
    this.Request({
      url: this.serviceUrl,
      content: {
        'op': 'recover',
        'email': email
      },
      onComplete: this.Callback(function(response) {
        if (this.debugMode) console.log('Recovere passwrod result "' + response.text + '" (ServerAPI.RecoverPassword)');
        response = response.text;
        if (response.substring(0, 2) == 'ER') {
          response = this.ExtractMessage('RecoverPassword', response);
          fail(response.code, response.message);
        } else {
          response = this.ExtractMessage('RecoverPassword', response);
          success(response.code, response.message);
        }
      }, this)
    });
  },

  IdentifyProxy: function(data, geoData, success, fail) {
    var rawList = this.ExtractUserProxyList(data);
    if (rawList.length) {
      // trying to identify proxy with local cache
      this.knownProxy = new Array();
      var needsIdentification = new Array();
      var authData = new Array();
      for (var i in rawList) {
        var hostGeoData = this.GetHostGeoData(rawList[i].host, geoData);
        if (hostGeoData !== false) {
          hostGeoData.port = rawList[i].port;
          hostGeoData.proxy = rawList[i].host+':'+rawList[i].port;
          hostGeoData.user = rawList[i].user;
          hostGeoData.password = rawList[i].password;
          hostGeoData.isUserProxy = true;
          hostGeoData.isFreeProxy = false;
          this.knownProxy.push(hostGeoData);
        } else {
          authData.push({
            proxy: rawList[i].host+''+rawList[i].port,
            user: rawList[i].user,
            password: rawList[i].password
          });
          needsIdentification.push(rawList[i].host+':'+rawList[i].port);
        }
      }

      // all proxy identified with help of local cache
      if (!needsIdentification.length) {
        if (this.debugMode) console.log('All proxy identified with help of cached GeoData (ServerAPI.IdentifyProxy)');
        success(this.knownProxy, geoData);
        return;
      }

      // identify remaining proxy on server side
      data = needsIdentification.join("\r\n");
      if (this.debugMode) console.log('Identifying proxy "' + data.substring(0, 40) + ' ..." (ServerAPI.IdentifyProxy)');
      this.Request({
        url: this.serviceUrl,
        content: {
          'op': 'identify',
          'data': data
        },
        onComplete: this.Callback(function(response) {
          if (this.debugMode) console.log('Identifying proxy result "' + response.text + '" (ServerAPI.Authenticate)');
          response = response.text;
          if (response.substring(0, 2) == 'ER') {
            response = this.ExtractMessage('IdentifyProxy', response);
            fail(response.code, response.message);
          } else {
            var proxyList = this.ExtractServerProxyList(response, false);
            if (proxyList.length)
              for(var i in proxyList) {
                proxyList[i].proxy = proxyList[i].host+''+proxyList[i].port;
                // restore password for given proxy
                var proxyAuthData = this.GetProxyAuthData(proxyList[i].host+''+proxyList[i].port, authData);
                if (proxyAuthData !== false) {
                  proxyList[i].user = proxyAuthData.user;
                  proxyList[i].password = proxyAuthData.password;
                } else {
                  proxyList[i].user = proxyList[i].password = null;
                }
                proxyList[i].isUserProxy = true;
                proxyList[i].isFreeProxy = false;
                this.knownProxy.push(proxyList[i]);
                var hostGeoData = this.GetHostGeoData(proxyList[i].host, geoData);
                if (hostGeoData === false) {
                  geoData.push({
                    host: proxyList[i].host,
                    countryCode: proxyList[i].countryCode,
                    countryName: proxyList[i].countryName,
                    cityName: proxyList[i].cityName
                  });
                }
              }
            success(this.knownProxy, geoData);
          }
        }, this)
      });
    } else {
      success(new Array(), geoData);
    }
  },

  GeoInformatoin: function(success, fail) {
    if (this.debugMode) console.log('Identifying GEO information for user (SendMessage.GeoInformatoin)');
    this.Request({
      url: this.serviceUrl,
      content: {
        'op': 'geo'
      },
      onComplete: this.Callback(function(response) {
        if (this.debugMode) console.log('Identifying GEO information for user result "' + response.text + '" (ServerAPI.Authenticate)');
        response = response.text;
        if (response.substring(0, 2) == 'OK') {
          response = response.split(':');
          success(response[1], response[2], response[3], response[4]);
        } else {
          response = this.ExtractMessage('GeoInformatoin', response);
          fail(response.code, response.message);
        }
      }, this)
    });
  }
}