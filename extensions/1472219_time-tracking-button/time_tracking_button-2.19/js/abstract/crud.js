/*
	Definir cuales son importantes y en que circunstancias
	Manejar el uncatched de una unica forma
	Resolver subtasks donde se puede crear y se puede sincronizar despues
*/

//AGREGAR EVENTOS
/*
	dispatchLoading

	params = {
		data :
		callback :
		errorCallback :
		blockLoading :
		extraParams :
		priority
	}

	parametros personalizados del ajax para manejo de errores

	method_title : "LOGIN",
    params : params,
    dispatch_remove_loading : true,
    track_ajax_call : true,
    error_event : {
				event_name : "Login Error",
				prop : { category : 'account' },
			    intercom : false,
			    mixpanel : true,
				ga : true
	},
*/

function returnClientDeviceID(){

  if( typeof(websocket) != "undefined" && typeof(websocket.connectionID) != "undefined"){
    return websocket.connectionID;
  }else{
    return "unknown";
  }

}

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return 'Basic ' + hash;
}

function getApiURL() {
  return API_VERSION + currentUser.getCurrentAccount().account_id + "/";
}

function getConnnectURL() {
  return API_VERSION + 'connect/' + currentUser.getCurrentAccount().account_id + "/";
}

$(document).ready(function() {
  if (CORS) {
    ORIG_API_VERSION = API_VERSION;
    $.ajaxSetup({
      crossDomain: true,
      type: "GET",
      async: true,
      timeout: AJAX_TIMEOUT,
      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader('Authorization', make_base_auth(currentUser.get().email, currentUser.get().token));
        var user = (currentUser.get() == null) ? "anon" : currentUser.get().id;
        try {
          if (settings.url.indexOf("?") > -1) {
            settings.url += "&ClientApp=TrackingTime" + getAppVersion() + ":u=" + user+"&ClientID="+returnClientDeviceID();
          } else {
            settings.url += "?ClientApp=TrackingTime" + getAppVersion() + ":u=" + user+"&ClientID="+returnClientDeviceID();
          }
          xhr.setRequestHeader("ClientApp", "TrackingTime " + getAppVersion());
          xhr.setRequestHeader("ClientID", returnClientDeviceID()) ;
        } catch (err) {

        }
      },
      error: function(x, t, m) {

        var data = {
          x: x,
          t: t,
          m: m,
          ajax: this
        };
        if (m === 'aborted') {
          console.log('was aborted by user');
          return false;
        }
        if (typeof(this.params) != "undefined") {
          var params = this.params;
        } else {
          var params = "";
        }

        if (typeof(this.method_title) != "undefined") {
          var title = this.method_title + "_ERROR";
        } else {
          var title = this.url;
        }

        if (this.dispatch_remove_loading === true) {
          dispatchRemoveLoading('error');
        }
        if (typeof(this.error_event) != "undefined") {
          eventTrack(this.error_event);
        }


        trackApiError(this, data);

        if (typeof(params.errorCallback) != "undefined") {
          params.errorCallback(returnParsedTextError(data), params);
          try{
            if (data.x.status === 0) {
              dispatchOfflinedError();
            }
          }catch(e){ }
        }

        // TRABA

        if (typeof(params.errorCallbackPreventDefault) != "undefined" && isJsonResponse(data)) {
          params.errorCallbackPreventDefault(returnParsedTextError(data), params);
          try{
            if (data.x.status === 0) {
              dispatchOfflinedError();
            }
          }catch(e){ }
          return false;
        }

        if (typeof(params.errorCallbackPreventDefault) != "undefined") {
          params.errorCallbackPreventDefault(returnParsedTextError(data), params);
          try{
            if (data.x.status === 0) {
              dispatchOfflinedError();
            }
          }catch(e){ }
          return false;
        }

        if (typeof(params.priority) == "undefined" || params.priority != "low") {
          dispatchUncatchedError(title, data);
        } else
        if (data.x.status == 401 || data.x.status == 429) {
          dispatchUncatchedError(title, data);
        }

      }

    });
  } else {
    $.ajaxSetup({
      async: false,
    })
  }
  // MANAGES
  $( document ).ajaxComplete(function(event, xhr, setting){
    try{
      var response = JSON.parse(xhr.responseText);
      if(response.response.note_type != null && response.response.note_type != 'ghost_error' && response.response.note != null){

        if(response.response.note_type ==  "WARNING | ERROR | ALERT" ){
          var evt = new CustomEvent('ON_UNCTACHED_ERROR', {
            'detail': {
              title: "",
              message: response.response.note
            }
          });
          document.dispatchEvent(evt);
        }else{
          dispatchSuccessMessage(response.response.note )
        }
      }
    }catch(er){
      console.log(er);
    }
  })
});

function nonHttpStatusErrorHandler(xhr, data) {
  if (typeof(xhr.params) != "undefiend") {
    var params = xhr.params;
  } else {
    var params = "";
  }

  if (typeof(xhr.method_title) != "undefiend") {
    var title = xhr.method_title + "_ERROR";
  } else {
    var title = xhr.url;
  }

  if (xhr.dispatch_remove_loading === true) {
    dispatchRemoveLoading('error');
  }
  if (typeof(xhr.error_event) != "undefined") {
    eventTrack(xhr.error_event);
  }

  trackApiError(xhr, data);

  if (typeof(params.errorCallback) != "undefined") {
    params.errorCallback(data, params);
  }
  // TRABA
  if (typeof(params.errorCallbackPreventDefault) != "undefined") {
    params.errorCallbackPreventDefault(data, params);
    return false;
  }
  if (typeof(params.priority) == "undefined" || params.priority != "low") {
    dispatchError(title, data);
  }
}

function verifyApiVersion(data) {

  try {
    if (typeof(data.response.version) != "undefined") {
      var tmp_version = Number(data.response.version);
      // restart


      if (CURRENT_API_VERSION != "" && tmp_version > API_VERSION_SUPPORT) {
        forceUpdate();
      }

      if (CURRENT_API_VERSION != "" && tmp_version != CURRENT_API_VERSION) {
        restartApp();
      }

      CURRENT_API_VERSION = tmp_version;
    }
  } catch (err) {
    trackJavaScriptError(err);
  }


}

function eventTrack(data) {
  /*
  {
  	event_name : "",
  	intercom_object : {},
  	mixpanel_object : {},
  	ga_object : {}
  }
  	object : "" no manda a intercom
  	formato:
  	- APP
  	- Category
  	- Integration
  	-
  	categorias:
  		commercial
  		use
  		account
  */

  //intercom
  try {
    if (typeof(data.prop) != "undefined") {
      data.prop["app_version"] = getAppVersion();

      if (data.event_name == "Page View" && data.ga == true) {
        ga('send', 'pageview', data.prop.url);
        if(data.mkt === true){
          data.event_name += " " + data.prop.url;
          ga('appTracker.send', 'pageview', "app/"+data.prop.url);
        }
      }


      if (data.intercom === true) {
        var intercom_event_name = (typeof(data.intercom_event_name) != "undefined") ? data.intercom_event_name : data.event_name;
        Intercom('trackEvent', intercom_event_name, data.prop);
      }

      if (data.event_name != "Page View" && data.ga == true) {
        //trial 1 : SUBS 2 : Free : 0
        var status = 0;
        var account_status = "";
        if (currentUser.getCurrentAccount() == null) {

        } else {
          if (currentUser.getCurrentAccountStatus().indexOf("TRIAL") > -1) {
            status = 1;
          }
          if (currentUser.getCurrentAccountStatus().indexOf("SUBSCRIBED") > -1) {
            status = 2;
          }
          if (currentUser.getCurrentAccountStatus().indexOf("FREE") > -1) {
            status = 3;
          }
          var account_status = currentUser.getCurrentAccountStatus();
        }

        ga('send', {
          hitType: 'event',
          eventCategory: (typeof(data.prop.category) == "undefined" || data.prop.category == "account" || data.prop.category == "use" || data.prop.category == "commercial" || data.prop.category == "paid_feature") ? currentUser.getCurrentAccountStatus() : data.prop.category ,
          eventAction: data.event_name,
          eventLabel: (typeof(data.prop.section) == "undefined") ? "" : data.prop.section,
          eventValue: status,
          dimension1: PLATFORM,
          dimension2: getAppVersion(),
          dimension3: account_status,
          dimension4: (currentUser.getCurrentAccount() != null) ? currentUser.getCurrentAccount().role : ""
        });

        if (data.mkt == true) {
          ga('appTracker.send', {
            hitType: 'event',
            eventCategory: (typeof(data.prop.category) == "undefined" || data.prop.category == "account" || data.prop.category == "use" || data.prop.category == "commercial" || data.prop.category == "paid_feature") ? currentUser.getCurrentAccountStatus() : data.prop.category ,
            eventAction: data.event_name,
            eventLabel: (typeof(data.prop.section) == "undefined") ? "" : data.prop.section,
            eventValue: status,
            dimension1: PLATFORM,
            dimension2: getAppVersion(),
            dimension3: account_status,
            dimension4: (currentUser.getCurrentAccount() != null) ? currentUser.getCurrentAccount().role : ""
          });
        }

      }
      if (data.mixpanel === true && typeof(shouldBeTracked) == "function" && shouldBeTracked() ) {
        mixpanel.track(data.event_name, data.prop);
      }
    }
  } catch (err) {
    trackJavaScriptError(err);
  }

}

var dispatchError = function(title, data) {

  title = DEBUG_MODE ? title : _t("Something went wrong");

  var obj = {
    title: title,
    message: data.response.message
  };

  if (data.response.note_type == "ghost_error") {
    obj.ghost_error = data.response.note;
  }

  if (data.response.status == 401 || data.response.status == '401') {
    message = _t('Access denied, please login.');
    setTimeout(function() {
      var err_evt = new CustomEvent('ON_ACCESS_DENIED');
      document.dispatchEvent(err_evt);
    }, 4000);

    obj.title = _t(title);
    obj.message = message + " <small>(" + title + ")</small>";

    var evt = new CustomEvent('ON_UNCTACHED_ERROR', {
      'detail': obj
    });
    document.dispatchEvent(evt);
  }
  if (data.response.status == 402 || data.response.status == '402') {
    var evt = new CustomEvent('ON_PAYMENT_REQUIRED', {
      'detail': obj
    });
    document.dispatchEvent(evt);
  } else {
    var evt = new CustomEvent('ON_ERROR', {
      'detail': obj
    });
    document.dispatchEvent(evt);

    if(data.response.note_type != null ){
      if(data.response.note_type ==  "tasks limit" || data.response.note_type ==  "users limit"  || data.response.note_type ==  "projects limit" ){
        var evt = {
          event_name: data.response.note_type+" reached",
          prop: {
            category: 'account'
          },
          intercom: true,
          ga: true,
        }
        eventTrack(evt);

        var evt = new CustomEvent('ON_LIMIT_REACHED', {
          'detail': {type:data.response.note_type}
        });
        document.dispatchEvent(evt);

      }
    }

  }
}

var dispatchUncatchedError = function(title, error) {
  if (typeof(error) !== "undefined" && error.x.statusText == "abort") {
    return false;
  }
  var message = "UNDEFINED ERROR";

  if (error !== "" && typeof(error) !== "undefined") {
    /*asi se manejaria el error si no fuese jsonP*/

    try {
      var msg_json = JSON.parse(error.x.responseText);
      dispatchError(title, msg_json);
    } catch (err) {

      if (error.x.status === 0) {
        //message = _t('Make sure your internet connection is working or try again in a few moments.');
        //verifyNetworkElseThrowError(title, _t('Service is unavailble or there is a problem with your internet connection. Please try in a few mintues. Sorry!') );
        dispatchOfflinedError();
        return false;

      } else if (error.x.status == 404) {
        message = _t('Requested page not found');
      } else if (error.x.status == 500) {
        message = _t('Internal Server Error.');
      } else if (error.t === 'parsererror') {
        message = _t('Requested JSON parse failed');
      } else if (error.t === 'timeout') {
        message = _t('The request timed out');
      } else if (error.t === 'abort') {
        message = _t('Ajax request aborted');
      } else if (error.x.status == 429) {
        message = _t("You've made too many requests, and your account has been blocked. Please contact support@trackingtime.co");
        setTimeout(function() {
          var err_evt = new CustomEvent('ON_ACCESS_DENIED');
          document.dispatchEvent(err_evt);
        }, 4000);
      } else if (error.x.status == 503) {
        message = _t('Service is unavailble, please try in a few mintues. Sorry!');
      } else if (error.x.status == 502) {
        message = _t('Service is unavailble, please try in a few mintues. Sorry!');
      } else if (error.x.status == 401) {
        message = _t('Access denied, please login.');
        setTimeout(function() {
          var err_evt = new CustomEvent('ON_ACCESS_DENIED');
          document.dispatchEvent(err_evt);
        }, 4000);
      } else {
        message = _t('Unexpected error') + " " + error.t;
      }

      obj = {
        title: _t(title),
        message: message + " <small>(" + title + ")</small>"
      };

      var evt = new CustomEvent('ON_UNCTACHED_ERROR', {
        'detail': obj
      });
      document.dispatchEvent(evt);
    }
  }
}

var dispatchOfflinedError = function(ajax) {
  obj = {
    title: "OFLINE",
    message: _t('Make sure your internet connection is working or try again in a few moments.'),
    ajax: (typeof(ajax) !== "undefined") ? ajax : ""
  };
  var evt = new CustomEvent('ON_OFFLINE_ERROR', {
    'detail': obj
  });
  document.dispatchEvent(evt);
}

var returnUncatchedError = function(error) {

  if (error.x.statusText == "abort") {
    return false;
  }
  var error = "";

  if (error !== "" && typeof(error) !== "undefined") {
    /*asi se manejaria el error si no fuese jsonP*/
    if (error.x.status === 0) {
      var error = "internet";
    } else if (error.x.status == 500) {
      var error = "server";
    } else if (error.t === 'timeout') {
      var error = "server"
    }
  }

}

var dispatchLoading = function(params) {
  var block = false;
  var dispacth = true;
  if (typeof(params) != "undefined") {
    block = typeof params.blockLoading != "undefined" ? params.blockLoading : block;
    dispacth = typeof params.dispacthLoading != "undefined" ? params.dispacthLoading : dispacth;
  }
  if (dispacth) {
    var evt = new CustomEvent('LOADING', {
      'detail': block
    });
    document.dispatchEvent(evt);
  }
};

var dispatchRemoveLoading = function(message) {
  var evt = new CustomEvent('REMOVE_LOADING', {
    'detail': message
  });
  document.dispatchEvent(evt);
}

var dispatchSuccessMessage = function(message) {

  obj = {
    message: message,
    timeout: 2000
  };

  var evt = new CustomEvent('ON_SUCCESS', {
    'detail': obj
  });
  document.dispatchEvent(evt);

}

var verifyNetworkElseThrowError = function(title, message) {

  $.ajax({
    type: 'HEAD',
    async: true,
    url: PRODUCTION_DOMAIN + "offline-verification/icon.png?" + new Date().getTime(),
    headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
    beforeSend: function(xhr) {},
    complete: function(xhr) {
      if (xhr.status == 0) {
        dispatchOfflinedError();
      }

      if (xhr.status == 200 && typeof(message) != "undefined") {
        obj = {
          title: _t(title),
          message: message + " <small>(" + title + ")</small>"
        };
        var evt = new CustomEvent('ON_UNCTACHED_ERROR', {
          'detail': obj
        });
        document.dispatchEvent(evt);
      }
    },
    error: function(x, t, m) {
      dispatchOfflinedError();
    }
  });
}

var returnParsedTextError = function(error) {
  try {
    var msg_json = JSON.parse(error.x.responseText);
    return msg_json;
  } catch (err) {
    return error;
  }
}

var isJsonResponse = function(error) {
  try {
    var msg_json = JSON.parse(error.x.responseText);
    return true;
  } catch (err) {
    return false;
  }
}

var Session = function() {
  var _ = this;

  this.login = function(params) { //post_data,callback

    dispatchLoading(params);

    var post_url = DOMAIN + NON_CORS_API_VERSION + 'login';

    if (params.preventAjax == true) {
      submitForm(post_url, params.data);
      return false;
    }

    if (currentUser.getCurrentAccount() != null) {
      params.data['account_id'] = currentUser.getCurrentAccount().account_id;
    }

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "LOGIN",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Login Error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {

        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }

          var evt = {
            event_name: "Login",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }

          eventTrack(evt);

          var evt = new CustomEvent('LOGIN', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();

        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  }

  this.loginWithToken = function(params) { //token,callback

    var post_url = DOMAIN + NON_CORS_API_VERSION + 'login';

    if (params.preventAjax == true) {
      submitForm(post_url, params.data);
      return false;
    }

    if (currentUser.getCurrentAccount() != null && currentUser.getCurrentAccount().account_id != null) {
      params.data['account_id'] = currentUser.getCurrentAccount().account_id;
    }
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "LOGIN_ON_BACKGROUND",
      params: params,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      success: function(data) {
        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params)
          }
          var evt = new CustomEvent('LOGIN_ON_BACKGROUND', {
            'detail': data
          });
          document.dispatchEvent(evt);
          var evt = {
            event_name: "Login",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }
          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

  this.logout = function(callback) {
    var post_url = DOMAIN + getApiURL() + 'logout';
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      success: function(data) {

      },
      error: function(x, t, m) {

      }

    });

  }

  this.signup = function(params) { //data,callback

    dispatchLoading(params);
    var post_url = DOMAIN + NON_CORS_API_VERSION + 'signup';

    if (params.preventAjax == true) {
      submitForm(post_url, params.data);
      return false;
    }

    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      type: "POST",
      cache: CACHE_ON,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      //
      method_title: "SIGNUP",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Signup Error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true,
        mkt : true
      },
      success: function(data) {
        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }

          var evt = {
            event_name: "Signup",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }

          eventTrack(evt);
          mixIdentifyForSignup(data.data.email, data.data.id, getAppVersion());
          var evt = new CustomEvent('SIGNED_UP', {  });
          document.dispatchEvent(evt);

          dispatchRemoveLoading();
        } else {

          nonHttpStatusErrorHandler(this, data);

        }

      }
    });
  }

  this.recoverPass = function(params) {

    dispatchRemoveLoading();
    var post_url = DOMAIN + NON_CORS_API_VERSION + 'users/recover_password';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "RECOVER_PASSWORD",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Forgot Password Error",
        prop: {
          category: 'account'
        },
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
          dispatchSuccessMessage(data.response.message);
          var evt = {
            event_name: "Forgot Password OK",
            prop: {
              category: 'account'
            },
            ga: true,
            mixpanel: true,
            intercom : true
          }

          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  }

  this.loginAndCreateSession = function(params) { //post_data,callback


    dispatchLoading(params);

    var post_url = DOMAIN + NON_CORS_API_VERSION + 'login';

    if (currentUser.getCurrentAccount() != null && currentUser.getCurrentAccount().account_id != null) {
      params.data['account_id'] = currentUser.getCurrentAccount().account_id;
    }

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: 'jsonp',
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      //
      method_title: "LOGIN_AND_CREATE_SESSION",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          currentUser.set(data.data);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

  this.verifyToken = function(params) { //token y action
    var post_url = DOMAIN + API_VERSION + 'users/verify_token';

    $.ajax({
      url: post_url,
      data: "token="+params.token+"&service="+params.service,
      dataType: extension,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: params.action,
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: params.action+" error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = {
            event_name: "Email signup",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }
          eventTrack(evt);

          var evt = new CustomEvent('TT_SIGNED_UP', {
              'detail': data
          });
          document.dispatchEvent(evt);
          mixIdentifyForSignup(data.data.email, data.data.id, getAppVersion())

          dispatchRemoveLoading();

        } else {
          try {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut();
          } catch (e) {

          }
          nonHttpStatusErrorHandler(this, data);
        }

      },
      error: function(x, t, m) {

        var data = {
          x: x,
          t: t,
          m: m,
          ajax: this
        };
        dispatchUncatchedError("LOGIN_GOOGLE", data);
        try {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut();
        } catch (e) {

        }
      }
    });

  }

  this.verifyUserToken = function(params) { //data: token, action, service
    var post_url = DOMAIN + API_VERSION + 'users/verify_token';

    params.data = typeof params.data != 'undefined' ? params.data : {};

    var method_title = !!params.data.action ? params.data.action.toUpperCase() : '';
    method_title += !!params.data.service ? '_WITH_' + params.data.service.toUpperCase() : '';
    console.log(method_title);

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      headers: { ClientApp: 'TrackingTime ' + getAppVersion() },
      beforeSend: function() {},
      cache: CACHE_ON,
      type: 'POST',
      method_title: method_title,
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: params.data.service + ' ' + params.data.action + ' error',
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);

          if (typeof params.callback != "undefined") {
            params.callback(data, params);
          }

          if (params.data.action == 'email_signup') {
            var evt = {
              event_name: 'Email signup',
              prop: {
                category: 'account'
              },
              intercom: true,
              mixpanel: true,
              ga: true,
              mkt: true
            };
            eventTrack(evt);

            var evt = new CustomEvent('TT_SIGNED_UP', { detail: data });
            document.dispatchEvent(evt);
            mixIdentifyForSignup(data.data.email, data.data.id, getAppVersion());
          }

          if (!!params.data.service) {
            if(params.data.service == "TrackingTime"){
              var evt = {
                event_name: 'Signup',
                prop: {
                  category: 'account'
                },
                intercom: true,
                mixpanel: true,
                ga: true,
                mkt: true
              };
              eventTrack(evt);
              mixIdentifyForSignup(data.data.email, data.data.id, getAppVersion());
              var evt = new CustomEvent('SIGNED_UP', { detail: {data: data, params: params }});
              document.dispatchEvent(evt);
            } else {
              var evt = {
                event_name: params.data.service + ' ' + params.data.action,
                prop: {
                  category: 'account'
                },
                intercom: true,
                mixpanel: true,
                ga: true,
                mkt: true
              };
              eventTrack(evt);

              var service_evt = params.data.service.toUpperCase();

              if (params.data.action == "login") {
                service_evt += '_LOGGED_IN';
              } else
              if (params.data.action == "signup") {
                service_evt += '_SIGNED_UP';
                mixIdentifyForSignup(data.data.email, data.data.id, getAppVersion());
              } else
              if (params.data.action == "accept_invite") {
                service_evt += '_ACCEPT_INVITE';
              } else
              if (params.data.action == "link_account") {
                service_evt += '_ACCOUNT_LINKED';
                dispatchSuccessMessage(_t('Your ' + params.data.service + ' Account has been connected.'));
              }
              var evt = new CustomEvent(service_evt, { detail: {data: data, params: params }});
              document.dispatchEvent(evt);
            }
          }

          dispatchRemoveLoading();

        } else {
          try {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut();
          } catch (e) {}
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.requestJoinAccount = function(params) {

    dispatchRemoveLoading();
    var post_url = DOMAIN + API_VERSION + 'account/join/';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "JOIN_ACCOUNT",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Join Account Error",
        prop: {
          category: 'account'
        },
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
          dispatchSuccessMessage(data.response.message);
          var evt = {
            event_name: "Join Account OK",
            prop: {
              category: 'account'
            },
            ga: true,
            mixpanel: true,
            intercom : true
          }
          eventTrack(evt);
          mixUpdateUserAttribute({"is_owner":false});
          mixUpdateUserAttribute({"requested_to_join":true});
          mixUpdateUserAttribute({"requested_to_join_to":params.data.owner_email});
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  }
}

function onGoogleNothing() {
  // catch del evento del botón que no tocaron.
}

function onGoogleLogin(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  googleSignin.login(id_token, googleUser);

}

function onGoogleAcceptInvite(googleUser,params) {
  var id_token = googleUser.getAuthResponse().id_token;
  params.data["idtoken"] = id_token;
  googleSignin.acceptInvite(params);

}

function onGoogleSignup(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  googleSignin.signup(id_token, googleUser);
}

function onGoogleLinkAccount(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  googleSignin.linkAccount(id_token, googleUser);
}
/**
 * @deprecated use returnProviderURL instead with action, redirect_to, provider. Ex: returnProviderURL('login', localhost, 'google')
 */
function returnGoogleSigninURL(action,redirect_to){
    var google_signin_url =  DOMAIN + NON_CORS_API_VERSION + "google/signin?action="+action+"&redirect_to="+redirect_to;
    return google_signin_url;
}

var GoogleSignin = function() {
  var _ = this;

  this.verifyToken = function(params) { //token y action
    var post_url = DOMAIN + API_VERSION + 'users/verify_token';

    $.ajax({
      url: post_url,
      data: "token="+params.token,
      dataType: extension,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: params.action+"_WITH_GOOGLE",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Google "+params.action+" error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = {
            event_name: "Google " +params.action,
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }
          eventTrack(evt);
          if( params.action == "login"){
            var evt = new CustomEvent('GOOGLE_LOGGED_IN', {
              'detail': data
            });
          }
          if( params.action == "signup"){
            var evt = new CustomEvent('GOOGLE_SIGNED_UP', {
              'detail': data
            });
            mixIdentifyForSignup(data.data.email, data.data.id, getAppVersion())
          }
          if( params.action == "accept_invite"){
            var evt = new CustomEvent('ACCEPT_INVITE_GOOGLE', {
              'detail': data
            });
          }
          if( params.action == "link_account"){
            var evt = new CustomEvent('GOOGLE_ACCOUNT_LINKED', {
              'detail': data
            });
              dispatchSuccessMessage(_t("Your Google Account has been connected."));
          }
          document.dispatchEvent(evt);
          dispatchRemoveLoading();

        } else {
          try {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut();
          } catch (e) {

          }
          nonHttpStatusErrorHandler(this, data);
        }

      },
      error: function(x, t, m) {

        var data = {
          x: x,
          t: t,
          m: m,
          ajax: this
        };
        dispatchUncatchedError("LOGIN_GOOGLE", data);
        try {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut();
        } catch (e) {

        }
      }
    });

  }

  this.login = function(id_token) { //post_data,callback
    var params = {
      "data": {
        "idtoken": id_token,
        "action": "login"
      }
    };
    var post_url = DOMAIN + API_VERSION + 'google/signin';
    if (currentUser.getCurrentAccount() != null) {
      params.data['account_id'] = currentUser.getCurrentAccount().account_id;

    }

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "LOGIN_WITH_GOOGLE",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Google login error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = {
            event_name: "Google " + data.response.message,
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }
          eventTrack(evt);
          var evt = new CustomEvent('GOOGLE_LOGGED_IN', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();

        } else {
          try {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut();
          } catch (e) {

          }
          nonHttpStatusErrorHandler(this, data);
        }

      },
      error: function(x, t, m) {

        var data = {
          x: x,
          t: t,
          m: m,
          ajax: this
        };
        dispatchUncatchedError("LOGIN_GOOGLE", data);
        try {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut();
        } catch (e) {

        }
      }
    });

  }

  this.signup = function(id_token) { //post_data,callback
    var params = {
      "data": {
        "idtoken": id_token,
        "action": "signup"
      }
    };
    var post_url = DOMAIN + API_VERSION + 'google/signin';
    if (currentUser.getCurrentAccount() != null) {
      params.data['account_id'] = currentUser.getCurrentAccount().account_id;
    }

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "SIGNUP_WITH_GOOGLE",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Google signup error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {

        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = {
            event_name: "Google " + data.response.message,
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }

          eventTrack(evt);
          mixIdentifyForSignup(data.data.email, data.data.id, getAppVersion())
          var evt = new CustomEvent('GOOGLE_SIGNED_UP', {
            'detail': data
          });
          document.dispatchEvent(evt);



          dispatchRemoveLoading();

        } else {
          try {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut();
          } catch (e) {

          }
          nonHttpStatusErrorHandler(this, data);
        }

      },
      error: function(x, t, m) {

        var data = {
          x: x,
          t: t,
          m: m,
          ajax: this
        };
        dispatchUncatchedError("SIGNUP_WITH_GOOGLE", data);
        try {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut();
        } catch (e) {

        }
      }
    });

  }

  this.acceptInvite = function( params) { //post_data,callback

    var post_url = DOMAIN + API_VERSION + 'google/signin';


    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      beforeSend: function() {},
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "accept_invite_WITH_GOOGLE",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Google accept invite error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = {
            event_name: "Google accept invite",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true
          }
          eventTrack(evt);
          var evt = new CustomEvent('ACCEPT_INVITE_GOOGLE', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();

        } else {
          try {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut();
          } catch (e) {

          }
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  }

  this.unlinkAccount = function(params) { //post_data,callback
    _.disconnect();
    var post_url = DOMAIN + API_VERSION + 'google/unlink_account';
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      type: "GET",
      //
      method_title: "UNLINK_GOOGLE_ACCOUNT",
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Google unlink account error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }

          var evt = {
            event_name: "Google unlink account",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true
          }

          eventTrack(evt);
          dispatchRemoveLoading();

        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  }

  this.linkAccount = function(params) { //post_data,callback

    var post_url = DOMAIN + API_VERSION + 'google/link_account';

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "LINK_GOOGLE_ACCOUNT",
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Google link account error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {

        if (data.response.status == 200) {

          var evt = {
            event_name: "Google link account",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true
          }
          eventTrack(evt);
          var evt = new CustomEvent('GOOGLE_ACCOUNT_LINKED', {
            'detail': data
          });
          document.dispatchEvent(evt);

          dispatchRemoveLoading();
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }else{
              document.location.href = data.data.redirect_uri;
          }

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.disconnect = function() {

    try {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut();
    } catch (e) {

    }
  }
}

/**
 * @deprecated use returnProviderURL instead with action, redirect_to, provider. Ex: returnProviderURL('login', localhost, 'google')
 */
function returnMicrosoftSigninURL(action, redirect_to){
  try{
    if(action === undefined || redirect_to === undefined) throw new Error('Missing arguments')
    return DOMAIN + API_VERSION + "microsoft/signin?action="+action+"&redirect_to="+redirect_to;;
  } catch(err){
    console.error(err)
  }
}

const MicrosoftSignin = function(){
  const _ = this
  const post_url = DOMAIN + API_VERSION + 'microsoft'

  this.verifyToken = function(params) { //token y action
    var post_url = DOMAIN + API_VERSION + 'users/verify_token';

    $.ajax({
      url: post_url,
      data: "token=" + params.token+ "&service=" + params.service,
      dataType: extension,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: params.action+"_WITH_MICROSOFT",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Microsoft " + params.action + " error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = {
            event_name: "Microsoft " + params.action,
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }
          eventTrack(evt);
          if(params.action == "login"){
            var evt = new CustomEvent('MICROSOFT_LOGGED_IN', {
              'detail': data
            });
          }
          if(params.action == "signup"){
            var evt = new CustomEvent('MICROSOFT_SIGNED_UP', {
              'detail': data
            });
          }
          if(params.action == "accept_invite"){
            var evt = new CustomEvent('ACCEPT_INVITE_MICROSOFT', {
              'detail': data
            });
          }
          if(params.action == "link_account"){
            var evt = new CustomEvent('MICROSOFT_ACCOUNT_LINKED', {
              'detail': data
            });
            dispatchSuccessMessage(_t("Your Microsoft Account has been connected."));
          }
          document.dispatchEvent(evt);
          dispatchRemoveLoading();

        } else {
          try {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut();
          } catch (e) {

          }
          nonHttpStatusErrorHandler(this, data);
        }

      },
      error: function(x, t, m) {
        var data = {
          x: x,
          t: t,
          m: m,
          ajax: this
        };
        dispatchUncatchedError("LOGIN_GOOGLE", data);
        try {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut();
        } catch (e) {

        }
      }
    });
  }

  this.login = function(params){
  }

  this.signup = function(params){
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      headers: {"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "SIGNUP_WITH_MICROSOFT",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Microsoft signup error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = {
            event_name: "Microsoft " + data.response.message,
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }
          eventTrack(evt);
          mixIdentifyForSignup(data.data.email, data.data.id, getAppVersion())
          var evt = new CustomEvent('MICROSOFT_SIGNED_UP', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      },
      error: function(x, t, m) {
        var data = {
          x: x,
          t: t,
          m: m,
          ajax: this
        };
        dispatchUncatchedError("SIGNUP_WITH_MICROSOFT", data);
      }
    });
  }

  this.linkAccount = function(params) {
    $.ajax({
      url: post_url + '/link_account',
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "LINK_MICROSOFT_ACCOUNT",
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Microsoft link account error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {

        if (data.response.status == 200) {

          var evt = {
            event_name: "Microsoft link account",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true
          }
          eventTrack(evt);
          var evt = new CustomEvent('MICROSOFT_ACCOUNT_LINKED', {
            'detail': data
          });
          document.dispatchEvent(evt);

          dispatchRemoveLoading();
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }else{
              document.location.href = data.data.redirect_uri;
          }

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.unlinkAccount = function(params) { //post_data,callback
    //_.disconnect();
    let post_url = DOMAIN + getApiURL() + 'microsoft'
    $.ajax({
      url: post_url + '/unlink_account',
      dataType: extension,
      cache: CACHE_ON,
      type: "GET",
      //
      method_title: "UNLINK_MICROSOFT_ACCOUNT",
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Microsoft unlink account error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            const newData = {
              ...data,
              data: {
                service: 'microsoft',
              }
            }
            params.callback(newData, params);
          }

          var evt = {
            event_name: "Microsoft unlink account",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true
          }

          eventTrack(evt);
          dispatchRemoveLoading();

        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  }

};

/**
 * @deprecated use returnProviderURL instead with action, redirect_to, provider. Ex: returnProviderURL('login', localhost, 'google')
 */
function returnAppleSigninURL(action, redirect_to){
  try{
    if(action === undefined || redirect_to === undefined) throw new Error('Missing arguments')
    return DOMAIN + API_VERSION + "apple/signin?action="+action+"&redirect_to="+redirect_to;;
  } catch(err){
    console.error(err)
  }
}

function returnProviderURL(action, redirect_to, provider){
  try{
    if(action === undefined || redirect_to === undefined || provider === undefined) throw new Error('Missing arguments')
    return DOMAIN + API_VERSION + provider.toLowerCase() + "/signin?action="+action+"&redirect_to="+redirect_to;
  } catch(err){
    console.error(err)
  }
}

const AppleSignin = function(){
  const _ = this
  const post_url = DOMAIN + API_VERSION + 'apple'

  this.verifyToken = function(params) { //token y action
    var post_url = DOMAIN + API_VERSION + 'users/verify_token';

    $.ajax({
      url: post_url,
      data: "token=" + params.token+ "&service=" + params.service,
      dataType: extension,
      headers :{"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: params.action+"_WITH_APPLE",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Apple " + params.action + " error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = {
            event_name: "Apple " + params.action,
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }
          eventTrack(evt);
          if(params.action == "login"){
            var evt = new CustomEvent('APPLE_LOGGED_IN', {
              'detail': data
            });
          }
          if(params.action == "signup"){
            var evt = new CustomEvent('APPLE_SIGNED_UP', {
              'detail': data
            });
          }
          if(params.action == "accept_invite"){
            var evt = new CustomEvent('ACCEPT_INVITE_APPLE', {
              'detail': data
            });
          }
          if(params.action == "link_account"){
            var evt = new CustomEvent('APPLE_ACCOUNT_LINKED', {
              'detail': data
            });
            dispatchSuccessMessage(_t("Your Apple Account has been connected."));
          }
          document.dispatchEvent(evt);
          dispatchRemoveLoading();

        } else {
          try {
            //var auth2 = gapi.auth2.getAuthInstance();
            //auth2.signOut();
          } catch (e) {

          }
          nonHttpStatusErrorHandler(this, data);
        }

      },
      error: function(x, t, m) {
        var data = {
          x: x,
          t: t,
          m: m,
          ajax: this
        };
        dispatchUncatchedError("LOGIN_APPLE", data);
        try {
          //var auth2 = gapi.auth2.getAuthInstance();
          //auth2.signOut();
        } catch (e) {

        }
      }
    });
  }

  this.login = function(params){
  }

  this.signup = function(params){
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      headers: {"ClientApp" : "TrackingTime " + getAppVersion()},
      beforeSend: function() {},
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "SIGNUP_WITH_APPLE",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Apple signup error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {
        if (data.response.status == 200) {
          currentUser.set(data.data);
          verifyApiVersion(data);
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = {
            event_name: "Apple " + data.response.message,
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true,
            mkt : true
          }
          eventTrack(evt);
          mixIdentifyForSignup(data.data.email, data.data.id, getAppVersion())
          var evt = new CustomEvent('APPLE_SIGNED_UP', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      },
      error: function(x, t, m) {
        var data = {
          x: x,
          t: t,
          m: m,
          ajax: this
        };
        dispatchUncatchedError("SIGNUP_WITH_APPLE", data);
      }
    });
  }

  this.linkAccount = function(params) {
    $.ajax({
      url: post_url + '/link_account',
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      type: "POST",
      //
      method_title: "LINK_APPLE_ACCOUNT",
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Apple link account error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {

        if (data.response.status == 200) {

          var evt = {
            event_name: "Apple link account",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true
          }
          eventTrack(evt);
          var evt = new CustomEvent('APPLE_ACCOUNT_LINKED', {
            'detail': data
          });
          document.dispatchEvent(evt);

          dispatchRemoveLoading();
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }else{
              document.location.href = data.data.redirect_uri;
          }

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.unlinkAccount = function(params) { //post_data,callback
    //_.disconnect();
    let post_url = DOMAIN + getApiURL() + 'apple'
    $.ajax({
      url: post_url + '/unlink_account',
      dataType: extension,
      cache: CACHE_ON,
      type: "GET",
      //
      method_title: "UNLINK_APPLE_ACCOUNT",
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Apple unlink account error",
        prop: {
          category: 'account'
        },
        intercom: false,
        mixpanel: true,
        ga: true
      },
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            const newData = {
              ...data,
              data: {
                service: 'apple',
              }
            }
            params.callback(newData, params);
          }

          var evt = {
            event_name: "Apple unlink account",
            prop: {
              category: 'account'
            },
            intercom: true,
            mixpanel: true,
            ga: true
          }

          eventTrack(evt);
          dispatchRemoveLoading();

        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  }

};

var Invoices = function() {
  var _ = this;

  var post_url = DOMAIN + getApiURL() + 'invoices'

  this.getList = function(params) {

    let status = ''
    if(params.status){
      status = `/?status=${params.status}`
    }

    $.ajax({
      url: post_url + status,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      //
      method_title: "GET_INVOICES",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.delete = function(params) {
    $.ajax({
      url: post_url + '/' +  params.invoiceId + '/delete/',
      dataType: extension,
      cache: CACHE_ON,
      method_title: "DELETE_INVOICE",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.add = function(params) {
    $.ajax({
      url: post_url + '/add',
      data: params.data,
      type: 'POST',
      dataType: extension,
      cache: CACHE_ON,
      //
      method_title: "ADD_INVOICES",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.getNextNumber = function (params) {
    $.ajax({
      url: post_url + '/next_number',
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      //
      method_title: "INVOICES_NEXT_NUMBER",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };
};

var ConnectAPI = function () {

  var _ = this;

  this.auth = function(params) {
    var post_url = DOMAIN + getConnnectURL() +  `/${params.service}/connect/?redirect_to=${params.redirect_url}`;
    console.warn(post_url)
    fetch(post_url, { mode: 'cors', headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': make_base_auth(currentUser.get().email, currentUser.get().token)
        },
      })
      .then(response => response.json())
      .then(function(res) {

        if(res.data.redirect_uri){
          window.location.href = res.data.redirect_uri;
        } else if(res.data.redirectUri){
          window.location.href = res.data.redirectUri;
        }
      })
      .catch(function(error) {
        nonHttpStatusErrorHandler(params.service + '_error', error);
      });


/*     $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      //
      method_title: "TRELLO_CONNECT",
      params: params,
      success: function(data) {
        console.log(data)
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });  */

  };

  this.disconnect = function(params) {
    //var post_url = CONNECT_URL + CONNECT_API_VERSION +  `/${params.service}/disconnect/`;
    var post_url = DOMAIN + getConnnectURL() +  `${params.service}/disconnect/${params.redirect_url ? '?redirect_to=' + params.redirect_url : ''}`;

    fetch(post_url, { mode: 'cors', headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': make_base_auth(currentUser.get().email, currentUser.get().token)
        },
      })
      .then(response => response.json())
      .then(function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        }
      })
      .catch(function(error) {
        console.log(error)
        nonHttpStatusErrorHandler(this, error);
      });

/*      $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      //
      method_title: params.service + "_DISCONNECT",
      params: params,
      success: function(data) {
        console.log(data)
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });   */

  };

  this.refreshToken = function(params) {
    const post_url = DOMAIN + getConnnectURL() +  `${params.service}`;
    const refreshToken = `/auth/refresh_token?refresh_token=${params.refresh_token}`
    $.ajax({
      url: post_url + refreshToken,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      //
      method_title: "REFRESH_TOKEN_" + params.service.toUpperCase(),
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.listEntities = function(params) {
    const base_url = DOMAIN + getConnnectURL() +  `${params.service}`;
    const url = `/list/?entity=${params.entity}`
    $.ajax({
      url: base_url + url,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      //
      method_title: `LIST_${params.entity.toUpperCase()}_${params.service.toUpperCase()}`,
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {

            const newData = {
              data: {
                entity: params.entity,
                service:params.service,
                calendar: data.data.calendar
              }
            }

            params.callback( {...data, ...newData });
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.syncCalendars = function(params){
    const base_url = DOMAIN + getConnnectURL() +  `${params.service}`;
    const url = `${base_url}/sync_calendars`
    $.ajax({
      url,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      //
      method_title: `LIST_SYNC_${params.service.toUpperCase()}`,
      params,
      success(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

};

var ThirdParty = function() {
  var _ = this;

  this.list = function(params) {
    const post_url = DOMAIN + getApiURL() + 'thirdparty';
    const url = `${post_url}/${params.service}/${params.item}/`
    const data = params.data ? params.data : JSON.stringify({})
    $.ajax({
      url,
      dataType: dType,
      data,
      cache: CACHE_ON,
      method: "POST",
      method_title: `LIST_${params.item.toUpperCase()}_${params.service.toUpperCase()}`,
      params,
      dispatch_remove_loading: true,
      success(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            let newData = data.data.map((item) => {
              return {
                ...item,
                service: params.service,
              }
            })
            params.callback({...data, data: newData}, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }
}

var Events = function() {
  var _ = this;

  this.get = function(params) {
    var post_url = DOMAIN + getApiURL() + 'events';
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      //
      method_title: "GET_EVENTS",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.getSingle = function(params) { //id,callback

    dispatchLoading(params);
    var custom_fields = params.include_custom_fields ? '/?include_custom_fields=true' : '';
    var post_url = DOMAIN + getApiURL() + 'events/' + params.event_id + custom_fields;
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: dType,
      cache: CACHE_ON,
      method_title: "GET_EVENT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  };

  this.update = function(params) { //timeentry_data,id,callback,block_loading

    var loading_ev = new CustomEvent('EVENT_IS_BEEN_UPDATED', {
      'detail': params.event_id
    });
    document.dispatchEvent(loading_ev);

    dispatchLoading(params);

    try {
      if (!APIsupportsSharedTasks()) {
        var params_to_json = urlParamToJson(params.data);
        var error_msg = "";

        if (typeof(params_to_json.project_id) != "undefined") {
          error_msg += " Update event with project id.";
        }

        if (error_msg != "") {
          var message = _t("You are trying to use an API method that is not available yet.") + " " + error_msg;
          var evt = new CustomEvent('ON_ERROR', {
            'detail': {
              title: "API",
              message: message
            }
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading('error');
          return false;
        }
      }
    } catch (err) {
      trackJavaScriptError(err);
    }

    params.data['timezone'] = "GMT" + moment().format("Z");
    var custom_fields = params.include_custom_fields ? '/?include_custom_fields=true' : '';
    var post_url = DOMAIN + getApiURL() + 'events/update/' + params.event_id + custom_fields;

    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,

      method_title: "UPDATE_EVENT",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = new CustomEvent('EVENT_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(evt);
          eventsStore.update(data, params);

          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.add = function(params) { //timeentry_data,callback,block_loading

    dispatchLoading(params);
    var custom_fields = params.include_all_custom_fields ? '?include_all_custom_fields=true' : '';
    var post_url = DOMAIN + getApiURL() + 'events/add/' + custom_fields;
    params.data['timezone'] = "GMT" + moment().format("Z");

    try {
      if (!APIsupportsSharedTasks()) {
        var params_to_json = urlParamToJson(params.data);
        var error_msg = "";

        if (typeof(params_to_json.project_id) != "undefined") {
          error_msg += " Update event with project id.";
        }

        if (error_msg != "") {
          var message = _t("You are trying to use an API method that is not available yet.") + " " + error_msg;
          var evt = new CustomEvent('ON_ERROR', {
            'detail': {
              title: "API",
              message: message
            }
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading('error');
          return false;
        }
      }
    } catch (err) {
      trackJavaScriptError(err);
    }


    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "ADD_EVENT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }

          var detail = {data:data.data, params : params}
            if (params.include_all_custom_fields == true) {
              detail.available_custom_fields = data.available_custom_fields;
              detail.set_custom_fields = data.set_custom_fields;
            }

          if(params.data.repeat != "undefined" && params.data.repeat != "" && params.data.repeat != null){
            eventsStore.clearEventsCache();
            var evt = new CustomEvent('REPEATING_EVENT_ADDED', {
              'detail': detail
            });
          }else{
            eventsStore.add(data, params);
            var evt = new CustomEvent('EVENT_ADDED', {
              'detail': detail
            });
          }

          document.dispatchEvent(evt);
          dispatchRemoveLoading();

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.remove = function(params) { //id,callback,block_loading

    dispatchLoading(params);
    var loading_ev = new CustomEvent('EVENT_IS_BEEN_UPDATED', {
      'detail': params.event_id
    });
    document.dispatchEvent(loading_ev);

    var post_url = DOMAIN + getApiURL() + 'events/delete/' + params.event_id;

    if (typeof(params.data) != "undefined") {
      var post_data = params.data;
    } else {
      var post_data = "";
    }

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: post_data,
      method_title: "REMOVE_EVENT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          eventsStore.remove(data, params);
          var evt = new CustomEvent('EVENT_DELETED', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.removeDefault = function(params) { //id,callback,block_loading

    dispatchLoading(params);

    var post_url = DOMAIN + getApiURL() + 'events/delete_default/'

    var post_data = typeof(params.event_data) != "undefined" ? params.event_data : '';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: post_data,
      method_title: "REMOVE_DEFAULT_EVENT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = new CustomEvent('DEFAULT_EVENT_DELETED', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.removeBatch = function(params) { //params.data,callback,block_loading

    var post_url = DOMAIN + getApiURL() + 'events/delete?data=' + JSON.stringify(params.data);

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "REMOVE_EVENTS",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
            var evt = new CustomEvent('EVENT_BATCH_DELETED', {
              'detail': {
                'data': data,
                'params': params
              }
            });
            document.dispatchEvent(evt);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.bill = function(params) { //ids,callback,block_loading

    dispatchLoading(params);
    // TODO: revisar este custom event
    var loading_ev = new CustomEvent('EVENTs_ARE_BEING_UPDATED', {
      'detail': params.ids
    });
    document.dispatchEvent(loading_ev);

    var object_ids = params.ids.map(function(i){ return {id:i};});
    var post_data = {data: JSON.stringify(object_ids) };

    var post_url = DOMAIN + getApiURL() + 'events/billed/';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: post_data,
      method_title: "BILL_EVENTS",
      params: params,
      dispatch_remove_loading: true,
      method: "POST",
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          eventsStore.update(data, params);
          var evt = new CustomEvent('EVENTS_BILLED', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.not_bill = function(params) { //ids,callback,block_loading

    dispatchLoading(params);
    // TODO: revisar este custom event
    var loading_ev = new CustomEvent('EVENTS_ARE_BEING_UPDATED', {
      'detail': params.ids
    });
    document.dispatchEvent(loading_ev);

    var object_ids = params.ids.map(function(i){ return {id:i};});
    var post_data = {data: JSON.stringify(object_ids) };

    var post_url = DOMAIN + getApiURL() + 'events/not_billed/';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: post_data,
      method_title: "NOT_BILL_EVENTS",
      params: params,
      dispatch_remove_loading: true,
      method: "POST",
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          eventsStore.update(data, params);
          var evt = new CustomEvent('EVENTS_NOT_BILLED', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };


  this.import = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/import_data/json';
    $.ajax({
      url: post_url,
      //dataType : extension,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: params.data,
      type: "POST",
      cache: CACHE_ON,
      method_title: "IMPORT_EVENT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var evt = new CustomEvent('EVENTS_IMPORT', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  };

  this.get.min = function(params) {
    var custom_fields = params.include_custom_fields ? '/?include_custom_fields=true' : '';
    var post_url = DOMAIN + getApiURL() + 'events/min' + custom_fields;
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      //
      method_title: "GET_EVENTS_MIN",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            data.data = unminify.events(data.data);
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.summary = function(params) { // {from, to, [{"id":1},{"id":2}]}
    var post_url = DOMAIN + getApiURL() + 'events/summary';
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      //
      method_title: "GET_EVENTS_SUMMARY",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };
}

var CustomFields = function () {
	this.get = function (params) {
		var method_title = 'CUSTOM_FIELDS'
    var url = DOMAIN + getApiURL() + 'custom_fields/?include_enum_options=true';

    $.ajax({
      url,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      //
      method_title,
      params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
	}
}

var Tasks = function() {

  var _ = this;
  _.performing_get_tracking_tasks = false;

  _.getting_tracking_tasks_callback_queue = [];

  this.getUserTasks = function(params) { //id,obj,priority
    // if id undefined gets all
    // returns task json
    var custom_fields = params.include_custom_fields == true ? '/?include_custom_fields=true' : '';
    var post_url = DOMAIN + getApiURL() + 'users/' + params.user_id + '/tasks/opt' + custom_fields;//opt

    $.ajax({
      url: post_url,
      dataType: dType,
      cache: CACHE_ON,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_SHORT,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'user_tasks_' + params.user_id,
      method_title: "GET_USER_TASKS",
      params: params,
      //
      success: function(data) {

        if (data.response.status == 200) {
          verifyApiVersion(data);
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          }
          var userTasksUpdated = new CustomEvent('USER_TASKS_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(userTasksUpdated);



        } else {
          nonHttpStatusErrorHandler(this, data); // no anda
        }
      }
    });

  };


  this.getUserArchivedTasks = function(params) { //id,obj,priority
    // if id undefined gets all
    // returns task json
    var post_url = DOMAIN + getApiURL() + 'users/' + params.user_id + '/tasks/opt';//opt
    var loadingUserTasksEvt = new CustomEvent('LOADING_USER_TASK');
    document.dispatchEvent(loadingUserTasksEvt);
    dispatchLoading(params);
    $.ajax({
      url: post_url,
      dataType: dType,
      cache: CACHE_ON,
      data: "filter=ARCHIVED",

      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'user_tasks_archived_' + params.user_id,

      method_title: "GET_USER_ARCHIVED_TASKS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.getUserRecentTasks = function(params) { //id,obj,priority
    // if id undefined gets all
    // returns task json
    var post_url = DOMAIN + getApiURL() + 'users/' + params.user_id + '/tasks/recent';
    var loadingUserTasksEvt = new CustomEvent('LOADING_USER_TASK');
    document.dispatchEvent(loadingUserTasksEvt);
    dispatchLoading(params);

    $.ajax({
      url: post_url,
      dataType: dType,
      cache: CACHE_ON,
      //data: "filter=RECENT",

      method_title: "GET_USER_RECENT_TASKS",
      params: params,
      data: params.data,

      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  }

  this.getSingleTask = function(params) { //id,callback
    if (typeof(params.task_id) == "undefined") {
      if (DEBUG_MODE) {
        console.info("Tying to get a single task without ID")
      }
      return false;
    }
    if(params.dispacthLoading == true){
      dispatchLoading();
    }
    var custom_fields = params.include_custom_fields == true ? '/?include_custom_fields=true' : '';
    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id + custom_fields;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_SHORT,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'task_' + params.task_id,

      method_title: "GET_TASK",
      params: params,

      dispatch_remove_loading: params.dispacthLoading == true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var evt = new CustomEvent('TASK_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  }

  this.close = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/close/' + params.task_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "CLOSE_TASK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          tasksStore.close(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();

          var evt = {
            event_name: "Task Closed",
            prop: {
              category: 'use'
            },
            ga: true
          }
          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);

        }
      }
    });
  }

  this.open = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/open/' + params.task_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "OPEN_TASK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          tasksStore.open(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          var evt = {
            event_name: "Task Opened",
            prop: {
              category: 'use'
            },
            ga: true
          }

          eventTrack(evt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.remove = function(params) { //id,obj
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/delete/' + params.task_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "REMOVE_TASK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          tasksStore.remove(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.update = function(params) { //task_data,id,callback

    dispatchLoading(params);
    var custom_fields = params.include_custom_fields == true ? '/?include_custom_fields=true' : '';
    var post_url = DOMAIN + getApiURL() + 'tasks/update/' + params.task_id + custom_fields;

    try {
      if (!APIsupportsSharedTasks()) {
        var params_to_json = urlParamToJson(params.data);
        var error_msg = "";

        // normalizes users
        if (typeof(params_to_json.users) != "undefined" && params_to_json.users != "") {
          var p_users = JSON.parse(params_to_json.users);
          if (p_users.length > 0) {
            params_to_json["user_id"] = p_users[0].id;
          }
          delete params_to_json.users;
        }

        if (params_to_json.user_id === null || params_to_json.user_id === "") {
          error_msg += " USER NULL";
        }

        if (typeof(params_to_json.type) != "undefined") {
          params_to_json.type = "PERSONAL";
        }

        if (error_msg != "") {
          var message = _t("You are trying to use an API method that is not available yet.") + " " + error_msg;
          var evt = new CustomEvent('ON_ERROR', {
            'detail': {
              title: "API",
              message: message
            }
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
          return false;
        }

        params.data = params_to_json;
      }
    } catch (err) {
      trackJavaScriptError(err);
    }


    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "UPDATE_TASK",
      params: params,
      dispatch_remove_loading: true,
      type: 'POST',
      success: function(data) {

        if (data.response.status == 200) {

          tasksStore.update(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.priority = function(params) { //task_data,id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/sort/';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "SET_TASK_PRIORITY",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          tasks.getTaskFromServer({
            task_id: params.task_id
          });
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.getTaskFromServer = function(params) { //id,callback
    if (typeof(params.task_id) == "undefined") {
      if (DEBUG_MODE) {
        console.info("Tying to get a single task without ID")
      }
      return false;
    }
    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id + '?include_custom_fields=true';
    $.ajax({
      url: post_url,
      //data : post_data,

      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "GET_TASK_FROM_SERVER",
      params: params,

      success: function(data) {

        if (data.response.status == 200) {

          tasksStore.update(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.add = function(params) {
    if (APIsupportsSharedTasks()) {
      _.share(params);
    } else {
      _.add_single_user(params);
    }
  }

  this.add_single_user = function(params) { //task_data,callback
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/add/';



    try {
      var params_to_json = urlParamToJson(params.data);
      // normalizes users
      if (typeof(params_to_json.users) != "undefined" && params_to_json.users != "") {
        var p_users = JSON.parse(params_to_json.users);
        if (p_users.length > 0) {
          params_to_json["user_id"] = p_users[0].id;
        }
        delete params_to_json.users;
      }

      if (typeof(params_to_json.user_id) == "undefined" || params_to_json.user_id == null || params_to_json.user_id == "") {
        var message = _t("Select a user.") + " " + _t("You are trying to use an API method that is not available yet.");
        var evt = new CustomEvent('ON_ERROR', {
          'detail': {
            title: "API",
            message: message
          }
        });
        document.dispatchEvent(evt);
        dispatchRemoveLoading('error');
        return false;
      }

      params.data = params_to_json;
    } catch (err) {
      trackJavaScriptError(err);
    }



    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method: "POST",
      method_title: "ADD_TASK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          tasksStore.add(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          var evt = {
            event_name: "Task Added",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true,
            mixpanel: true
          }

          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.share = function(params) { //task_data,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/share/';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method: "POST",
      method_title: "ADD_TASK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          tasksStore.add(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          var evt = {
            event_name: "Task Added",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true,
            mixpanel: true
          }

          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.changeTasklist = function(params) { //task_data,id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/update/' + params.task_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,

      method_title: "SIGNUP",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          tasksStore.changeList(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  }

  this.order = function(params) { //task_data,id,callback

    dispatchLoading(params);

    var post_url = DOMAIN + getApiURL() + 'projects/' + params.project_id + '/task_lists/sort/' + params.list_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,

      type: 'POST',
      method_title: "ORDER_TASKS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          tasksStore.order(data, params);
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.getTrackingTasks = function(params) { //id,obj,priority
    // if id undefined gets all
    // returns task json

    if (typeof(params.priority) !== "undefined" && params.priority != "low") {
      dispatchLoading(params);
    }

    if (typeof(params) !== "undefined" && typeof(params.callback) !== "undefined" && _.getting_tracking_tasks_callback_queue.indexOf(params.callback) == -1) {
      _.getting_tracking_tasks_callback_queue.push(params.callback);
    }

    if (_.performing_get_tracking_tasks == true) {
      return false;
    } else {
      _.performing_get_tracking_tasks = true;
    }


    var post_url = DOMAIN + getApiURL() + 'tasks?filter=TRACKING';


    $.ajax({
      url: post_url,
      dataType: dType,
      cache: CACHE_ON,

      method_title: "GET_TRACKING_TASKS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {
          for (var k in _.getting_tracking_tasks_callback_queue) {
            try {
              _.getting_tracking_tasks_callback_queue[k](data, params);
            } catch (err) {
              trackJavaScriptError(err);
            }
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);

        }

      },
      complete: function() {
        _.performing_get_tracking_tasks = false;
        _.getting_tracking_tasks_callback_queue = [];
      }
    });

  }

  this.clone = function(params) { //id,callback
    if (typeof(params.task_id) == "undefined") {
      if (DEBUG_MODE) {
        console.info("Tying to get a single task without ID")
      }
      return false;
    }
    cache.removeCachedItemByName("task");
    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id;
    $.ajax({
      url: post_url,
      //data : post_data,

      dataType: extension,
      cache: CACHE_ON,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_SHORT,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'task_' + params.task_id,

      method_title: "CLONE_TASK",
      params: params,

      success: function(data) {

        if (data.response.status == 200) {

          var cloned_users = [];
          for(var j in data.data.users ){
            if( data.data.users[j].status == "ACTIVE"){
              cloned_users.push(data.data.users[j])
            }
          }
          var clone_task_params = {
            data: {
              name: data.data.name,
              due_date: data.data.due_date,
              estimated_time: data.data.estimated_time,
              priority: data.data.priority,
              project_id: data.data.project_id,
              list_id: data.data.list_id,
              list_position: data.data.list_position,
              type: data.data.type,
              user_id: data.data.user_id,
              users: JSON.stringify(cloned_users)
            }
          }
          if(data.data.billing != null ){
            clone_task_params.data["is_billable"] = data.data.billing.is_billable;
            clone_task_params.data["hourly_rate"] =   data.data.billing.hourly_rate;
          }


          if (typeof(params.callback) !== "undefined") {
            clone_task_params["callback"] = params.callback;
          }
          clone_task_params["notify_by_email"] = false;
          tasks.add(clone_task_params);


          var evt = new CustomEvent('TASK_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(evt);

          var evt = {
            event_name: "Task duplicated",
            prop: {
              section: 'context_menu',
              category: 'paid_feature'
            },
            ga: true,
            mixpanel: true
          }
          eventTrack(evt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.search = function(params) { // "[{'project_name':'','task_name':''}]"

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/search?data=' + encodeURIComponent(JSON.stringify(params.data));
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "SEARCH_TASKS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.getTimes = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/times';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      type: 'POST',
      cache: CACHE_ON,
      method_title: "TASKS_TIMES",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

}

var TaskLists = function() {

  this.order = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/' + params.project_id + '/task_lists/sort/';

    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      type: 'POST',
      method_title: "ORDER_TASKLISTS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          tasklistsStore.order(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.add = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/' + params.project_id + '/task_lists/add/';

    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,

      method_title: "ADD_TASKLIST",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          tasklistsStore.add(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);

        }
      }
    });
  }

  this.update = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/' + params.project_id + '/task_lists/update/' + params.task_list_id;

    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,

      method_title: "UPDATE_TASKLIST",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          tasklistsStore.update(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.remove = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/' + params.project_id + '/task_lists/delete/' + params.task_list_id;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "REMOVE_TASKLIST",
      params: params,
      dispatch_remove_loading: true,


      success: function(data) {

        if (data.response.status == 200) {

          tasklistsStore.remove(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.close = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/' + params.project_id + '/task_lists/close/' + params.task_list_id;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "CLOSE_TASKLIST",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          tasklistsStore.close(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.open = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/' + params.project_id + '/task_lists/open/' + params.task_list_id;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "OPEN_TASKLIST",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          tasklistsStore.open(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.move = function(params) { // params.data= {project_id}

    dispatchLoading(params);

    var post_url = DOMAIN + getApiURL() + 'projects/task_lists/' + params.task_list_id + '/move/';

    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,

      method_title: "MOVE_TASKLIST",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          tasklistsStore.move(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }
}

var Subtasks = function() {
  var _ = this;

  this.remove = function(params) { //params,callback

    dispatchLoading(params);

    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id + '/subtasks/delete/' + params.data.subtask_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "REMOVE_SUBTASK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          subtasksStore.remove(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  }

  this.update = function(params) { //params,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id + '/subtasks/update/' + params.data.subtask_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: "name=" + params.data.name,
      cache: CACHE_ON,

      method_title: "UPDATE_SUBTASK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          subtasksStore.update(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.open = function(params) { //params,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id + '/subtasks/open/' + params.data.subtask_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "OPEN_SUBTASK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          subtasksStore.open(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.close = function(params) { //params,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id + '/subtasks/close/' + params.data.subtask_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "CLOSE_SUBTASK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          subtasksStore.close(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.add = function(params) { //params,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id + '/subtasks/add';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: "name=" + params.data.name,
      cache: CACHE_ON,

      method_title: "ADD_SUBTASK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          subtasksStore.add(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          var evt = {
            event_name: "Subtask Added",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true
          }

          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.sort = function(params) { //task_id,params,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id + '/subtasks/sort';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: "data=" + params.data.order,
      cache: CACHE_ON,
      type: 'POST',

      method_title: "SORT_SUBTASKS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          subtasksStore.sort(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

}

var Comments = function() {
  var _ = this;

  this.remove = function(params) { //params,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id + '/comments/delete/' + params.data.comment_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: {},
      cache: CACHE_ON,

      method_title: "DELETE_COMMENT",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          commentsStore.remove(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();

          var evt = {
            event_name: "Comment Deleted",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true
          }

          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

  this.update = function(params) {

  }

  this.add = function(params) { //params,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'tasks/' + params.task_id + '/comments/add';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: "text=" + params.data.text + "&is_file=" + params.data.is_file + "&user_id=" + params.data.user_id + "&created_at=" + moment().format("YYYY-MM-DD HH:mm:ss") + "&notify_users=" + params.data.notify,
      cache: CACHE_ON,

      method_title: "ADD_COMMENT",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          commentsStore.add(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();

          var evt = {
            event_name: "Comment Added",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true
          }

          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

}

var Projects = function() {
  var _ = this;
  _.performing_get_projects = false;
  _.getting_projects_callback_queue = [];


  this.get = function(params) { //obj,priority
    // if id undefined gets all
    // returns task json
    var post_url = DOMAIN + getApiURL() + 'projects/';
    if(typeof(params.min) != "undefined" && params.min == true){
          post_url = DOMAIN + getApiURL() + 'projects/min';
        }
    if (typeof(params) !== "undefined" && typeof(params.callback) !== "undefined" && _.getting_projects_callback_queue.indexOf(params.callback) == -1) {
      _.getting_projects_callback_queue.push(params.callback);
    }

    if (_.performing_get_projects == true) {
      return false;
    } else {
      _.performing_get_projects = true;
    }

    dispatchLoading(params);

    $.ajax({
      url: post_url,
      data: (typeof(params.extra_params) !== "undefined") ? params.extra_params : "",
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_VERY_LONG,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'projects',
      dataType: extension,
      cache: CACHE_ON,

      method_title: "GET_PROJECTS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        _.performing_get_projects = false;
        if (data.response.status == 200) {

          for (var k in _.getting_projects_callback_queue) {
            try {
              _.getting_projects_callback_queue[k](data, params);
            } catch (err) {
              trackJavaScriptError(err);
            }
          }
          var projectsUpdated = new CustomEvent('PROJECTS_UPDATED', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          document.dispatchEvent(projectsUpdated);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      },
      complete: function() {
        _.performing_get_projects = false;
        _.getting_projects_callback_queue = [];
      }
    });

  }

  this.getEverything = function(params) { //obj,priority
    // if id undefined gets all
    // returns task json
    var post_url = DOMAIN + getApiURL() + 'projects/';

    $.ajax({
      url: post_url,
      data: "include_project_null=true&include_tasks=true&include_task_lists=true&include_stats=false",
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'all-projects',
      dataType: extension,
      cache: CACHE_ON,

      method_title: "GET_PROJECTS_EVERYTHING",
      params: params,

      success: function(data) {
        if (data.response.status == 200) {
          ALL_PROJECTS = data;
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var projectsUpdated = new CustomEvent('ALL_PROJECTS_UPDATED', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          document.dispatchEvent(projectsUpdated);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  }

  this.getArchived = function(params) { //obj,priority
    // if id undefined gets all
    // returns task json
    var custom_fields = params.include_custom_fields ? '&include_custom_fields=true' : '';
    var post_url = DOMAIN + getApiURL() + 'projects/?filter=ARCHIVED&include_stats=false' + custom_fields;
    if(typeof(params.min) != "undefined" && params.min == true){
          post_url = DOMAIN + getApiURL() + 'projects/min?filter=ARCHIVED&include_stats=false' + custom_fields;
    }

    $.ajax({
      url: post_url,
      data: (typeof(params.extra_params) != "undefined") ? params.extra_params : "",
      //
      dataType: extension,
      cache: CACHE_ON,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'archived-projects',

      method_title: "GET_ARCHIVED_PROJECTS",
      params: params,

      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var projectsUpdated = new CustomEvent('ARCHIVED_PROJECTS_UPDATED', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          document.dispatchEvent(projectsUpdated);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

  this.getSingleProject = function(params) { //id,callback
    var min = params.min == true ? '/min' : '';
    var custom_fields = '';
    if (params.include_custom_fields && params.include_task_custom_fields) {
      custom_fields = '/?include_custom_fields=true&include_task_custom_fields=true';
    }
    else if (params.include_custom_fields && !params.include_task_custom_fields) {
      custom_fields = '/?include_custom_fields=true';
    }
    else if (params.include_task_custom_fields && !params.include_custom_fields) {
      custom_fields = '/?include_task_custom_fields=true';
    }

    var post_url = DOMAIN + getApiURL() + 'projects/' + params.project_id + min + custom_fields;

    $.ajax({
      url: post_url,
      data: 'include_tasks=true&include_task_lists=true&include_stats=false&include_subtasks=false&include_comments=false&include_ghost_tasks=true',
      //
      dataType: extension,
      cache: CACHE_ON,

      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_SHORT,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'project_' + params.project_id,
      method_title: "GET_PROJECT_AND_TASKS",
      params: params,

      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          var project_updated = [{
            "id": data.data.id,
            "accumulated_time": data.data.accumulated_time,
            "loc_worked_hours": data.data.loc_worked_hours
          }]

          var projectsDurationUpdated = new CustomEvent('PROJECTS_DURATION_UPDATED', {
            'detail': {
              'data': project_updated
            }
          });
          document.dispatchEvent(projectsDurationUpdated);

          projectsStore.update(data, params)

        } else {
          nonHttpStatusErrorHandler(this, data);

        }
      }
    });
  }

  this.getSingleProject.min = function(params) { //id,callback
    params.min = true;
    _.getSingleProject(params);
  }

  this.getJustProject = function(params) { //id,callback
    if(params.dispacthLoading == true){
      dispatchLoading();
    }
    var min = params.min == true ? '/min' : '';
    var custom_fields = params.include_custom_fields ? '/?include_custom_fields=true' : '';
    var post_url = DOMAIN + getApiURL() + 'projects/' + params.project_id + min + custom_fields;
    $.ajax({
      url: post_url,
      data: 'include_tasks=false&include_task_lists=false&include_stats=false',
      //
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_PROJECT_ONLY",
      params: params,
      dispatch_remove_loading: params.dispacthLoading == true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.getJustProject.min = function(params) { //id,callback
    params.min = true;
    _.getJustProject(params);
  };

  this.getUsersAssigned = function(params) { //obj,priority
    // if id undefined gets all
    // returns task json
    var post_url = DOMAIN + getApiURL() + 'projects/' + params.project_id + '/users';

    $.ajax({
      url: post_url,
      cache: CACHE_ON,

      method_title: "GET_PROJECTS_ASSIGNEES",
      params: params,

      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var projectsUpdated = new CustomEvent('ON_GOT_ASSIGNED_USERS', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          document.dispatchEvent(projectsUpdated);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

  this.getTaskListFromProject = function(params) { //id, callback, filter
    const url = DOMAIN + getApiURL() + 'projects/' + params.project_id + '/task_lists' + `${params.filter !== undefined? '?filter=' + params.filter : ''}`;

    $.ajax({
      url,
      cache: CACHE_ON,
      method_title: "GET_TASKS_LIST",
      params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.remove = function(params) { //id,obj

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/delete/' + params.project_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "REMOVE_PROJECT",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          projectsStore.remove(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.close = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/close/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "CLOSE_PROJECT",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          projectsStore.close(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.open = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/open/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "OPEN_PROJECT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {

          projectsStore.open(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.follow = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/follow/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "FOLLOW_PROJECT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {

          projectsStore.follow(data, params);

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          var evt = {
            event_name: "Project Followed",
            prop: {
              category: 'use'
            },
            ga: true
          }

          eventTrack(evt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.unfollow = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/unfollow/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "UNFOLLOW_PROJECT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {

          projectsStore.unfollow(data, params);
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.update = function(params) { //project_data,id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/update/' + params.project_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "UPDATE_PROJECT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          projectsStore.update(data, params)

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.updatePreferences = function(params) { //project_data,id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/update_preferences/' + params.project_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "UPDATE_PROJECT_PREFERENCES",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          projectsStore.updatePreferences(data, params)

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.add = function(params) { //project_data,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/add/';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "ADD_PROJECT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {


        if (data.response.status == 200) {

          projectsStore.add(data, params)


          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }

          dispatchRemoveLoading();

          var evt = {
            event_name: "Project Added",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true
          }
          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

  this.duplicate = function(params) { //project_data,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/add/';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,

      method_title: "DUPLICATE_PROJECT",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {


        if (data.response.status == 200) {

          projectsStore.add(data, params)

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }

          dispatchRemoveLoading();
          var evt = {
            event_name: "Project duplicated",
            prop: {
              section: 'context_menu',
              category: 'paid_feature'
            },
            ga: true,
            mixpanel: true
          }
          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  }

  this.getDurations = function(params) { //obj,priority
    // if id undefined gets all
    // returns task json
    var post_url = DOMAIN + getApiURL() + 'projects/times';

    if (typeof(params.priority) !== "undefined" && params.priority != "low") {
      dispatchLoading(params);
    }

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_PROJECTS_DURATION",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          projectsStore.updateDurations(data);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  }

  this.search = function(params) { //obj,priority
    // if id undefined gets all
    // returns task json
    var post_url = DOMAIN + getApiURL() + 'projects/search';

    $.ajax({
      url: post_url,
      data: params.data,
      localCache: false,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "SEARCH_PROJECTS_AND_TASKS",
      params: params,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  }

  this.merge = function(params) { // obj

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/merge/' + params.project_id;
    $.ajax({
      url: post_url,
      data: params.data,
      localCache: false,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "MERGE_PROJECTS",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {

          projectsStore.merge(data, params);

          if (typeof params.callback !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();

          var evt = {
            event_name: "Project merged",
            prop: {
              section: 'context_menu',
              category: 'paid_feature'
            },
            ga: true,
            mixpanel: true
          }
          eventTrack(evt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  };

  this.getTimes = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/times';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      type: 'POST',
      cache: CACHE_ON,
      method_title: "PROJECTS_TIMES",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.listDeleted = function(params) {
    var post_url = DOMAIN + getApiURL() + 'projects/deleted';
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "PROJECTS_LIST_DELETED",
      params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.restore = function(params) {
    dispatchLoading(params);
    console.warn(params)
    var post_url = DOMAIN + getApiURL() + 'projects/restore/' + params.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "PROJECT_RESTORE",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.deletePermanently = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'projects/delete/' + params.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      type: 'POST',
      cache: CACHE_ON,
      method_title: "PROJECT_DELETE",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

}

var Tracker = function() {
  var _ = this;
  _.current_xhr = "";
  _.sync_xhr = "";
  _.performing_current = false;
  _.current_callback_queue = [];


  this.track = function(params) {
    console.warn(params)
    var post_url = DOMAIN + getApiURL() + 'tasks/track/';

    var service = !!params.data.service ? '&service=' + params.data.service + '&service_task_id=' + params.data.id : '';
    service += service && !!params.data.project_id ? '&service_project_id=' + params.data.project_id : '';
    
    if (!service) {
      post_url += params.data.id;
    }

    var custom_fields = params.data.custom_fields ? '&custom_fields=' + params.data.custom_fields : '';
    var notes = typeof params.data.notes != "undefined" ? "&notes=" + params.data.notes : "";

    var date = "&date=";
    date += moment(params.data.date, "YYYY-MM-DD HH:mm:ss").isValid() ? params.data.date : moment().format("YYYY-MM-DD HH:mm:ss");
    var timezone = "&timezone=GMT" + moment().format("Z");

    dispatchLoading(params);

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "TRACK",
      params: params,
      dispatch_remove_loading: true,
      data: "stop_running_task=true&return_task=true" + date + timezone + notes + custom_fields + service,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var evt = new CustomEvent('TASK_STARTED', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
          verifyApiVersion(data);
          var evt = {
            gtag_data : {
              name: "Start Tracking"
            },
            gtag : true
          }
          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.createAndTrack = function(params) {
    var post_url = DOMAIN + getApiURL() + 'tasks/track/';
    var t_name = (typeof(params.data.task_name) != "undefined") ? "&task_name=" + params.data.task_name : "";
    var p_name = (typeof(params.data.project_name) != "undefined") ? "&project_name=" + params.data.project_name : "";
    var p_json = (typeof(params.data.json) != "undefined") ? "&json=" + JSON.stringify(params.data.json) : "";
    var e_time = (typeof(params.data.estimated_time) != "undefined") ? "&estimated_time=" + params.data.estimated_time : "";
    var d_date = (typeof(params.data.due_date) != "undefined") ? "&due_date=" + params.data.due_date : "";
    var t_project = (typeof(params.data.project_id) != "undefined") ? "&project_id=" + params.data.project_id : "";
    var notes = (typeof(params.data.notes) != "undefined" && params.data.notes != "") ? "&notes=" + params.data.notes : "";
    var date = moment().format("YYYY-MM-DD HH:mm:ss");
    if(typeof params.data.date == 'string'){
      date = moment(params.data.date, "YYYY-MM-DD HH:mm:ss").isValid() ? params.data.date : date;
    }
    dispatchLoading(params);

    try {
      if (!APIsupportsSharedTasks()) {
        if (t_project != "") {
          var message = _t("You are trying to use an API method that is not available yet.") + " Tracking a project";
          var evt = new CustomEvent('ON_ERROR', {
            'detail': {
              title: "API",
              message: message
            }
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading('error');
          return false;
        }
      }
    } catch (err) {
      trackJavaScriptError(err);
    }



    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: "stop_running_task=true&date=" + date + "&timezone=GMT" + moment().format("Z") + "&return_task=true" + t_name + p_name + p_json + e_time + d_date + t_project + notes,
      method_title: "CREATE_AND_TRACK",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {
          tasksStore.add(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          }
          var evt = new CustomEvent('TASK_STARTED', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
          verifyApiVersion(data);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.stop = function(params) {
    if (typeof(params.account_id) != "undefined") {
      var post_url = DOMAIN + API_VERSION + params.account_id + '/tasks/stop/' + params.data.id;
    } else {
      var post_url = DOMAIN + getApiURL() + 'tasks/stop/' + params.data.id;
    }
    var post_data = "date=" + moment().format("YYYY-MM-DD HH:mm:ss") + "&timezone=GMT" + moment().format("Z") + "&return_task=true";

    if (typeof(params.data.id) == "undefined") {
      trackCustomJavaScriptError("Tratando de hacer stop sin pasar id en tracker.stop");
      return false;
    }
    dispatchLoading(params);

    $.ajax({
      url: post_url,
      dataType: extension,

      data: post_data,
      cache: CACHE_ON,
      method_title: "STOP_TRACKING",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            if (typeof(params.callback_params) !== "undefined") {
              params.callback(params.callback_params);
            } else {
              params.callback(data);
            }

          }
          dispatchRemoveLoading();
          var evt = new CustomEvent('TASK_STOPPED', {
            'detail': data
          });
          document.dispatchEvent(evt);
          var evt = {
            event_name: "Stopped Tracking",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true,
            mixpanel: true
          }

          eventTrack(evt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  };

  this.sync = function(params) {

    if (typeof(params.account_id) != "undefined") {
      var post_url = DOMAIN + API_VERSION + params.account_id + '/tasks/sync/' + params.data.id;
    } else {
      var post_url = DOMAIN + getApiURL() + 'tasks/sync/' + params.data.id;
    }

    if (typeof(params.data.id) == "undefined") {
      trackCustomJavaScriptError("Tratando de hacer sync sin pasar id en tracker.sync");
      return false;
    }

    _.sync_xhr = $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: "date=" + moment().format("YYYY-MM-DD HH:mm:ss") + "&event_id=" + params.data.evt_id + "&timezone=GMT" + moment().format("Z") + "&return_task=true",
      method_title: "SYNC",
      params: params,
      success: function(data) {
        //SUCCESS
        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };

          var evt = new CustomEvent('TASK_SYNCED', {
            'detail': data
          });
          document.dispatchEvent(evt);

          var evt = new CustomEvent('TASK_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(evt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      },
      complete: function() {
        _.sync_xhr = "";
      }

    });
  };

  this.current = function(params) {
    if (!isOnline()) {
      if (typeof(params.priority) !== "undefined" && params.priority !== "low") {
        dispatchOfflinedError();
      }
      return false;
    }

    if (typeof(params) !== "undefined" && typeof(params.callback) !== "undefined" && _.current_callback_queue.indexOf(params.callback) == -1) {
      _.current_callback_queue.push(params.callback);
    }

    if (_.performing_current == true) {
      return false;
    } else {
      _.performing_current = true;
    }

    var post_url = DOMAIN + getApiURL() + 'users/' + currentUser.get().id + '/tasks/tracking';
    _.current_xhr = $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_CURRENT_TRACKING_TASK",
      params: params,

      success: function(data) {
        _.performing_current = false;
        if (data.response.status == 200) {

          for (var k in _.current_callback_queue) {
            try {
              _.current_callback_queue[k](data.data[0]);

              if (data.data.length > 1) {
                var message = _t("More than one tracking task.");
                var evt = new CustomEvent('ON_ERROR', {
                  'detail': {
                    title: "API",
                    message: message
                  }
                });
                document.dispatchEvent(evt);
                trackCustomJavaScriptError("More than one trackng event found.");
              }


            } catch (err) {
              trackJavaScriptError(err);
            }
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      },
      complete: function() {
        _.performing_current = false;
        _.current_callback_queue = [];
        _.current_xhr = "";
      }
    });
  };

  this.current_old = function(params) {
    if (!isOnline()) {
      if (typeof(params.priority) !== "undefined" && params.priority !== "low") {
        dispatchOfflinedError();
      }
      return false;
    }

    if (typeof(params) !== "undefined" && typeof(params.callback) !== "undefined" && _.current_callback_queue.indexOf(params.callback) == -1) {
      _.current_callback_queue.push(params.callback);
    }

    if (_.performing_current == true) {
      return false;
    } else {
      _.performing_current = true;
    }

    var post_url = DOMAIN + getApiURL() + 'users/' + currentUser.get().id + '/tasks?filter=TRACKING';
    _.current_xhr = $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_CURRENT_TRACKING_TASK",
      params: params,

      success: function(data) {
        _.performing_current = false;
        if (data.response.status == 200) {
          var task_tracking_event = {
            id: false
          };
          for (var p in data.data.projects) {
            var ts = data.data.projects[p].tasks;
            for (var t in ts) {
              if (ts[t].tracking_event != null) {
                task_tracking_event = ts[t];
              }
            }
          }
          for (var k in _.current_callback_queue) {
            try {
              _.current_callback_queue[k](task_tracking_event);
            } catch (err) {
              trackJavaScriptError(err);
            }
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      },
      complete: function() {
        _.performing_current = false;
        _.current_callback_queue = [];
        _.current_xhr = "";
      }
    });
  };
}

var Users = function() {
  var _ = this;

  _.getting_users_callbacks = [];

  this.get = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/?include_stats=false&include_billing=false';
    $.ajax({
      url: post_url,
      //data : post_data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'users',
      method_title: "GET_USERS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          usersStore.setActivedStore(data);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          var usersUpdated = new CustomEvent('USERS_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(usersUpdated);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

  this.getArchived = function(params) {
    var post_url = DOMAIN + getApiURL() + 'users/';
    $.ajax({
      url: post_url,
      data: "filter=ARCHIVED",
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'archived-users',
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_ARCHIVED_USERS",
      params: params,

      success: function(data) {
        if (data.response.status == 200) {
          usersStore.setArchivedStore(data);
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.getAll = function(params) {
    var post_url = DOMAIN + getApiURL() + 'users/';
    $.ajax({
      url: post_url,
      data: "filter=ALL&include_stats=false",
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'all-users',
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_ALL_USERS",
      params: params,

      success: function(data) {
        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.getTrackables = function(params) { //id,obj,priority
    // if id undefined gets all
    // returns task json
    var include_tasks = typeof params.include_tasks == "undefined" ? true : params.include_tasks;
    var project_id = typeof params.project_id == "undefined" ? false : params.project_id;

    var post_url = DOMAIN + getApiURL() + 'users/' + params.user_id + '/trackables';

    post_url += '?include_tasks=' + include_tasks;
    post_url += project_id ? '&project_id=' + project_id : '';

    $.ajax({
      url: post_url,
      dataType: dType,
      cache: CACHE_ON,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_SHORT,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'user_trackables_' + params.user_id + (include_tasks ? '_' + include_tasks : '') + (project_id ? '_' + project_id : ''),
      method_title: "GET_USER_TRACKABLES",
      params: params,
      //
      success: function(data) {
        if (data.response.status == 200) {
          verifyApiVersion(data);
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var userTasksUpdated = new CustomEvent('USER_TRACKABLES_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(userTasksUpdated);
        } else {
          nonHttpStatusErrorHandler(this, data); // no anda
        }
      }
    });

  };

  this.trackables_filtered = {
    abort: function() {}
  };

  this.abortTrackablesFiltered = function() {
    _.trackables_filtered.abort();
  };

  this.getTrackablesFiltered = function(params) { //id,obj,priority

    params = typeof params == 'undefined' ? {} : params;
    params.filter = typeof params.filter == "string" ? params.filter : '';

    var post_url = DOMAIN + getApiURL() + 'users/' + params.user_id + '/trackables';
    post_url += params.filter ? '?filter=' + params.filter : '';

    _.abortTrackablesFiltered();

    _.trackables_filtered = $.ajax({
        url: post_url,
        dataType: dType,
        cache: CACHE_ON,
        localCache: true,
        cacheTTL: LOCAL_STORAGE_CACHE_DURATION_SHORT,
        cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'user_trackables_filtered_' + params.user_id + '_' + params.filter,
        method_title: "GET_USER_TRACKABLES_FILTERED",
        params: params,
        //
        success: function(data) {
          if (data.response.status == 200) {
            verifyApiVersion(data);
            if (typeof(params.callback) !== "undefined") {
              params.callback(data, params);
            }
            var userTasksUpdated = new CustomEvent('USER_TRACKABLES_FILTERED_UPDATED', {
              'detail': data
            });
            document.dispatchEvent(userTasksUpdated);
          } else {
            nonHttpStatusErrorHandler(this, data); // no anda
          }
        }
      });

  };

  this.getSingle = function(params) { //id,callback

    if (typeof _.getting_users_callbacks[params.data.id] == "undefined") {
      _.getting_users_callbacks[params.data.id] = [];
    }
    _.getting_users_callbacks[params.data.id].push(params.callback);

    if (_.getting_users_callbacks[params.data.id].length > 1) {
      return false;
    }

    var custom_fields = params.include_custom_fields ? '/?include_custom_fields=true' : '';

    var post_url = DOMAIN + getApiURL() + 'users/' + params.data.id + custom_fields;
    $.ajax({
      url: post_url,
      //data : post_data,

      dataType: extension,
      cache: CACHE_ON,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'user_' + params.data.id,
      method_title: "GET_USER",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {

          for (var k in _.getting_users_callbacks[params.data.id]) {
            if (typeof _.getting_users_callbacks[params.data.id][k] != "undefined") {
              _.getting_users_callbacks[params.data.id][k](data, params);
            }
          }
          delete _.getting_users_callbacks[params.data.id];
            /*
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          */

          var usersUpdated = new CustomEvent('USERS_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(usersUpdated);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.close = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/close/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "CLOSE_USER",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          usersStore.close(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(params.data.id);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.open = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/open/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "OPEN_USER",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          usersStore.open(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(params.data.id);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
        dispatchRemoveLoading();
      }
    });
  };

  this.getProfileImage = function(params) { //id,callback
    var post_url = DOMAIN + getApiURL() + 'users/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_USER_AVATAR",
      params: params,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          }

          var evt = new CustomEvent('USERS_IMAGE_GETTED', {
            'detail': data
          });
          document.dispatchEvent(evt);

          if (data.data.id == currentUser.get().id) {
            cache.clearUsersData();
          }

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.updateHideMessage = function(params) { //user_data,id,callback

    dispatchLoading(params);


    var post_url = DOMAIN + getApiURL() + 'users/update/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: "show_message=false",
      cache: CACHE_ON,
      method_title: "UPDATE_USER_SHOW_MESSAGE",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          currentUser.get().settings.show_message=false;

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          if (typeof(params.success_message) !== "undefined") {
            dispatchSuccessMessage(params.success_message)
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  };

  this.profileUpdate = function(params) { //user_data,id,callback

    dispatchLoading(params);

    if (typeof(params.json) != "undefined") {
      var post_data = ""
      for (var k in params.data) {
        post_data += "&" + k + "=" + params.data[k]
      }
      post_data += "&json=" + JSON.stringify(params.json);
    } else {
      var post_data = params.data;
    }
    var post_url = DOMAIN + getApiURL() + 'users/update/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: post_data,
      cache: CACHE_ON,
      method_title: "UPDATE_USER_PROFILE",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {
          usersStore.update(data, params);
          if (data.data.id == currentUser.get().id) {
            currentUser.set(data.data);
          }

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          if (typeof(params.success_message) !== "undefined") {
            dispatchSuccessMessage(params.success_message)
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.update = function(params) { //user_data,id,callback

    dispatchLoading(params);

    if (typeof(params.json) != "undefined") {
      var post_data = ""
      for (var k in params.data) {
        post_data += "&" + k + "=" + params.data[k]
      }
      post_data += "&json=" + JSON.stringify(params.json);
    } else {
      var post_data = params.data;
    }
    var post_url = DOMAIN + getApiURL() + 'users/update/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: post_data,
      cache: CACHE_ON,
      method_title: "UPDATE_USER",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          usersStore.update(data, params);

          /*
	                if(data.data.id == currentUser.get().id){
		                currentUser.set(data.data);
	                }
	                */
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          if (typeof(params.success_message) !== "undefined") {
            dispatchSuccessMessage(params.success_message)
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  };

  this.updatePassword = function(params) { //pass,id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/update/' + params.data.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: "password=" + params.data.pass,
      cache: CACHE_ON,
      method_title: "UPDATE_USER_PASSWORD",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          usersStore.update(data, params);
          if (data.data.id == currentUser.get().id) {
            currentUser.set(data.data);
          }

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          if (typeof(params.success_message) !== "undefined") {
            dispatchSuccessMessage(params.success_message)
          }
          var evt = new CustomEvent('USER_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.add = function(params) { //user_data,callback

    dispatchLoading(params);
    var loadingUsers = new CustomEvent('LOADING_USERS');
    document.dispatchEvent(loadingUsers);
    var post_url = DOMAIN + getApiURL() + 'users/add';
    $.ajax({
      url: post_url,
      //data : post_data,

      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "ADD_USER",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          usersStore.add(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.invite = function(params) { //user_data,callback,errorCallback

    var loadingUsers = new CustomEvent('LOADING_USERS');
    document.dispatchEvent(loadingUsers);
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/invite';

    $.ajax({
      url: post_url,
      //data : post_data,

      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "INVITE_USER",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Invite User Error",
        prop: {
          category: 'account'
        },
        mixpanel: true,
        intercom: true,
        ga: true
      },
      success: function(data) {

        if (data.response.status == 200) {

          usersStore.invite(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          var evt = {
            event_name: "Invite User",
            prop: {
              category: 'account'
            },
            mixpanel: true,
            intercom: true,
            ga: true
          }

          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.batchInvite = function(params) { //user_data,callback,errorCallback

    var loadingUsers = new CustomEvent('LOADING_USERS');
    document.dispatchEvent(loadingUsers);
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/batch_invite';

    $.ajax({
      url: post_url,
      //data : post_data,

      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "BATCH_INVITE_USER",
      params: params,
      dispatch_remove_loading: true,
      error_event: {
        event_name: "Invite User Error",
        prop: {
          category: 'account'
        },
        mixpanel: true,
        intercom: true,
        ga: true
      },
      success: function(data) {

        if (data.response.status == 200) {

          usersStore.invite(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();

          for (var h in data.data) {
            var evt = {
              event_name: "Invite User",
              prop: {
                category: 'account'
              },
              mixpanel: true,
              intercom: true,
              ga: true
            }

            eventTrack(evt);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.resendInvite = function(params) { //params,callback,errorCallback

    var post_url = DOMAIN + getApiURL() + 'users/resend_invite';

    $.ajax({
      url: post_url,

      data: params.data,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "RESEND_USER_INVITE",
      params: params,

      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.resetCalendarToken = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/icalendar/reset_token';
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "RESET_USER_CALENDAR_TOKEN",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {
          if (data.data.id == currentUser.get().id) {
            currentUser.set(data.data);
          }
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.resetUserToken = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/reset_token';
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,

      method_title: "RESET_USER_TOKEN",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {
          if (data.data.id == currentUser.get().id) {
            currentUser.set(data.data);
          }
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.getAssignedProjects = function(params) { //id,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/' + params.user_id + "/projects";
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_USER_ASSIGNED_PROJECTS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        dispatchRemoveLoading();
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

  this.getAssignedTasks = function(params) {
    dispatchLoading(params);
    var custom_fields = params.include_custom_fields ? '/?include_custom_fields=true' : '';
    var post_url = DOMAIN + getApiURL() + 'users/' + params.user_id + "/assigned_tasks" + custom_fields;

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_USER_ASSIGNED_TASKS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        dispatchRemoveLoading();
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

  this.removeFromProjects = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/' + params.user_id + "/remove_projects";
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "REMOVE_USER_ASSIGNED_PROJECTS",
      params: params,
      method: "POST",
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  }

  this.assignToProjects = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/' + params.user_id + "/assign_projects";
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "ASSIGN_USER_TO_PROJECTS",
      params: params,
      method: "POST",
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.updatePermissions = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/update_permissions/' + params.user_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "UPDATE_USER_PERMISSIONS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          usersStore.update(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }


      }
    });
  }

}

var WorkSchedules = function() {
  var _ = this;

  this.get = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'schedules/'
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "GET_WORK_SCHEDULES",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }

    });
  };

  this.getSingle = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'schedules/' + params.ws_id
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "GET_WORK_SCHEDULES",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }

    });
  };

  this.add = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'schedules/add';
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "ADD_WORK_SCHEDULES",
      params: params,
      method: "POST",
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          usersStore.clear();
          var evt = new CustomEvent('WORK_SCHEDULE_ADDED', {
            'detail': { data: data.data, params: params }
          });
          document.dispatchEvent(evt);

          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

  this.remove = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'schedules/delete/' + params.ws_id;
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "REMOVE_WORK_SCHEDULES",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          usersStore.clear();
          var evt = new CustomEvent('WORK_SCHEDULE_REMOVED', {
            'detail': { data: data.data, params: params }
          });
          document.dispatchEvent(evt);

          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.update = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'schedules/update/' + params.ws_id;
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "UPDATE_WORKPLAN",
      params: params,
      method: "POST",
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          usersStore.clear();
          var evt = new CustomEvent('WORK_SCHEDULE_UPDATED', {
            'detail': { data: data.data, params: params }
          });
          document.dispatchEvent(evt);

          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

  this.addUsers = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'schedules/' + params.ws_id + "/users/add";
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "ADD_USERS_TO_WORKPLAN",
      params: params,
      dispatch_remove_loading: true,
      method: "POST",
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

}

var UserGroups = function() {
  var _ = this;

  this.get = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/groups/'
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "GET_USER_GROUPS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }

    });
  };

  this.getSingle = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/groups/' + params.id
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "GET_USER_GROUP",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }

    });
  };

  this.add = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/groups/add';
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "ADD_USER_GROUP",
      params: params,
      method: "POST",
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

  this.remove = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/groups/delete/' + params.id;
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "REMOVE_USER_GROUP",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.update = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'users/groups/update/' + params.id;
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      method_title: "UPDATE_USER_GROUP",
      params: params,
      dispatch_remove_loading: true,
      method: "POST",
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };
}

var Customers = function() {
  var _ = this;

  this.get = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'customers/';
    if(params.include_custom_fields){
      post_url = DOMAIN + getApiURL() + 'customers/?include_custom_fields=true' ;
    }
    $.ajax({
      url: post_url,

      dataType: extension,
      cache: CACHE_ON,
      localCache: false, //modifique esto porque si el cliente setea un nuevo default custom field, no te lo mostraba
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'customers',

      method_title: "GET_CUSTOMERS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var updateEvt = new CustomEvent('CUSTOMERS_UPDATED', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          document.dispatchEvent(updateEvt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  }

  this.remove = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'customers/delete/' + params.customer_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "REMOVE_CUSTOMER",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          customersStore.remove(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.update = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'customers/update/' + params.customer_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "UPDATE_CUSTOMER",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          customersStore.update(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.add = function(params) { //user_data,callback)

    dispatchLoading(params);

    var post_url = DOMAIN + getApiURL() + 'customers/add';
    $.ajax({
      url: post_url,
      //data : post_data,

      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "ADD_CUSTOMER",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          customersStore.add(data, params);
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          var evt = {
            event_name: "Customer Added",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true,
            mixpanel: true
          }

          eventTrack(evt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

}

var Services = function() {
  var _ = this;

  this.get = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'services/';
    $.ajax({
      url: post_url,
      //data : post_data,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'services',
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_SERVICES",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var updateEvt = new CustomEvent('SERVICES_UPDATED', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          dispatchRemoveLoading();
          document.dispatchEvent(updateEvt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.remove = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'services/delete/' + params.service_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "REMOVE_SERVICE",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {

          servicesStore.remove(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.update = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'services/update/' + params.service_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "UPDATE_SERVICE",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          servicesStore.update(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.add = function(params) { //user_data,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'services/add';
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "ADD_SERVICE",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          servicesStore.add(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          var evt = {
            event_name: "Service Added",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true,
            mixpanel: true
          }

          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

}

var Account = function() {
  var _ = this;

  this.get = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/';
    $.ajax({
      url: post_url,
      //data : post_data,
      cache: CACHE_ON,
      dataType: extension,
      method_title: "GET_ACCOUNT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          var usersUpdated = new CustomEvent('ACCOUNT_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(usersUpdated);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.update = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/update';
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "UPDATE_ACCOUNT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          usersStore.updateSettings(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          if (typeof(params.success_message) !== "undefined") {
            dispatchSuccessMessage(params.success_message)
          }
          dispatchRemoveLoading();
          var usersUpdated = new CustomEvent('ACCOUNT_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(usersUpdated);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.setStatusFree = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/update/status?status=FREE';
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "SET_STATUS_FREE",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          usersStore.updateSettings(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          if (typeof(params.success_message) !== "undefined") {
            dispatchSuccessMessage(params.success_message)
          }
          dispatchRemoveLoading();
          var usersUpdated = new CustomEvent('ACCOUNT_STATUS_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(usersUpdated);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.cancel = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/cancel';
    $.ajax({
      url: post_url,
      //data : post_data,
      cache: CACHE_ON,
      dataType: extension,
      method_title: "CANCEL_ACCOUNT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };

          var usersUpdated = new CustomEvent('ACCOUNT_CANCEL', {
            'detail': data
          });
          document.dispatchEvent(usersUpdated);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.updatePolicy = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/policy/update';
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "UPDATE_ACCOUNT_POLICY",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };
  
  this.add = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/add';
    $.ajax({
      url: post_url,
      data: params.data,
      cache: CACHE_ON,
      dataType: extension,
      method_title: "ADD_ACCOUNT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof params.callback !== "undefined") {
            params.callback(data);
          }
          var evt = new CustomEvent('ACCOUNT_ADDED', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };
  
  // public version
  this.add_account = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + API_VERSION + 'add_account/?company=' + params.data.company + '&token=' + currentUser.get().token;
    $.ajax({
      url: post_url,
      //data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "ADD_ACCOUNT",
      params: params,
      dispatch_remove_loading: true,
      beforeSend: function(xhr) {},
      success: function(data) {
        if (data.response.status == 200) {
          usersStore.updateSettings(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          if (typeof(params.success_message) !== "undefined") {
            dispatchSuccessMessage(params.success_message)
          }
          dispatchRemoveLoading();
          var usersUpdated = new CustomEvent('ACCOUNT_ADDED', {
            'detail': data
          });
          document.dispatchEvent(usersUpdated);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };
  
  this.reactivate = function(params) {
    dispatchLoading(params);
    
    var post_url = DOMAIN + API_VERSION + params.data.account_id + '/account/update_status?status=ON_TRIAL&token=' + currentUser.get().token;
    $.ajax({
      url: post_url,
      //data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "REACTIVATE_ACCOUNT",
      params: params,
      dispatch_remove_loading: true,
      beforeSend: function(xhr) {},
      success: function(data) {
        if (data.response.status == 200) {
          usersStore.updateSettings(data, params);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          if (typeof(params.success_message) !== "undefined") {
            dispatchSuccessMessage(params.success_message)
          }
          dispatchRemoveLoading();
          var usersUpdated = new CustomEvent('ACCOUNT_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(usersUpdated);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

}

var Webhooks = function() {

  this.get = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'webhooks/';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_WEBHOOKS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.add = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'webhooks/add';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "ADD_WEBHOOK",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var webhookEvt = new CustomEvent('WEBHOOK_ADDED', {
            'detail': {
              data: data,
              params: params
            }
          });
          document.dispatchEvent(webhookEvt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.update = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'webhooks/update/' + params.webhook_id;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "UPDATE_WEBHOOK",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.remove = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'webhooks/delete/' + params.webhook_id;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "REMOVE_WEBHOOK",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.resetToken = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'webhooks/reset_token/' + params.webhook_id;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "RESET_WEBHOOK_TOKEN",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });
  };
}

var Stats = function() {

  this.getTeamHours = function(params) {
    var post_url = DOMAIN + getApiURL() + 'dashboard/team_hours';
    $.ajax({
      url: post_url,

      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_TEAM_HOURS",
      params: params,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var updateEvt = new CustomEvent('TEAM_HOURS_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(updateEvt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

  this.getCompanyHours = function(params) {
    var loadingEv = new CustomEvent('LOADING_COMPANY_HOURS');
    document.dispatchEvent(loadingEv);
    var post_url = DOMAIN + getApiURL() + 'dashboard/company_hours';
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_COMPANY_HOURS",
      params: params,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var updateEvt = new CustomEvent('COMPANY_HOURS_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(updateEvt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  }
}

var Reports = function() {
  this.getEvents = function(params) { //post_data,callback , errorCallback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'events/min';
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      localCache: false,
      data: params.data,
      method_title: "GET_REPORTS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            data.data = unminify.events(data.data);
            params.callback(data);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);

        }
      }
    });

  };

  this.getEventsWithCache = function(params) { //post_data,callback , errorCallback
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'events/min';
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_LONG,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'events-' + params.data.from + params.data.to + params.data.filter + params.data.id + params.data.page + params.data.page_size,
      data: params.data,
      method_title: "GET_REPORTS_WITH_CACHE",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        dispatchRemoveLoading();
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            data.data = unminify.events(data.data);
            params.callback(data);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.getUserReport = function(params) { //post_data,callback , errorCallback

    var post_url = DOMAIN + getApiURL() + 'reports/users';
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_LONG,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'user-report-' + params.data.from + params.data.to + params.data.filter,
      data: params.data,
      method_title: "GET_USER_REPORTS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

}

var Timesheets = function() {

  this.get = function(params) { //post_data,callback , errorCallback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'timesheets';
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      localCache: false,
      data: params.data,
      method_title: "GET_TIMESHEETS",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.getSingle = function(params) { //post_data,callback , errorCallback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'timesheets/' + params.timesheet_id;
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      localCache: false,
      data: params.data,
      method_title: "GET_TIMESHEET",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };

  this.add = function(params) { //task_data,callback

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'timesheets/add/';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method: "POST",
      method_title: "ADD_TIMESHEET",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {

          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          var evt = {
            event_name: "Timesheet Added",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true,
            mixpanel: true
          }

          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

}

var Bookmarks = function() {
  var _ = this;

  this.get = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'bookmarks/';
    params.type = typeof params.type != "undefined" ? params.type : '';
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_BOOKMARKS",
      params: params,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'bookmarks'+ (params.type ? '-' + params.type : ''),
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (params.type) {
            var parsed_data = [];
            for (var k in data.data) {
              if (data.data[k].type == params.type) {
                parsed_data.push(data.data[k])
              }
            }
            data.data = parsed_data;
          }

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };

          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

  this.add = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'bookmarks/add/';
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "ADD_BOOKMARK",
      type: "POST",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          bookmarksStore.clear();
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.update = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'bookmarks/update/' + params.bookmark_id;
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "UPDATE_BOOKMARK",
      type: "POST",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          bookmarksStore.clear();
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

  this.save = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'bookmarks/save/';
    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "SAVE_BOOKMARK",
      type: "POST",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          bookmarksStore.clear();
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

  this.remove = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'bookmarks/delete/' + params.bookmark_id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "REMOVE_BOOKMARK",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          bookmarksStore.clear();
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

}

var Integrations = function() {
  var _ = this;

  this.get = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'integrations/';
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_INTEGRATIONS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  };

  this.remove = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'integrations/delete/' + params.id;
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "REMOVE_INTEGRATIONS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data);
          };
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };
}

var Teams = function() {

  this.switchTeam = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + ORIG_API_VERSION + 'teams/switch';
    $.ajax({
      url: post_url,

      data: "account_id=" + params.data.account_id,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "SWITCH_TEAM",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          currentUser.set(data.data);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }

          var updateEvt = new CustomEvent('TEAM_SELECT', {
            'detail': data
          });
          document.dispatchEvent(updateEvt);
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

  this.getTeams = function(params) {

    var post_url = DOMAIN + getApiURL() + 'teams';
    $.ajax({
      url: post_url,

      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_TEAMS",
      params: params,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var updateEvt = new CustomEvent('TEAMS_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(updateEvt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

  this.changeDefaultTeam = function(params) {

    var post_url = DOMAIN + getApiURL() + "users/update/" + currentUser.get().id;
    $.ajax({
      url: post_url,
      dataType: extension,
      data: "default_team_id=" + params.data.team_id,
      cache: CACHE_ON,
      method_title: "CHANGE_DEFAULT_TEAM",
      params: params,

      success: function(data) {
        if (data.response.status == 200) {

          currentUser.set(data.data);

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var updateEvt = new CustomEvent('DEFAULT_TEAM_CHANGED', {
            'detail': data
          });
          document.dispatchEvent(updateEvt);

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  }

}

var Notifications = function() {
  var _ = this;
  _.performing_get_notifications = false;
  _.get_notifications_callback_queue = [];

  this.get = function(params) {
    if (typeof(params) !== "undefined" && typeof(params.callback) !== "undefined" && _.get_notifications_callback_queue.indexOf(params.callback) == -1) {
      _.get_notifications_callback_queue.push(params.callback);
    }

    if (_.performing_get_notifications == true) {
      return false;
    } else {
      _.performing_get_notifications = true;
    }

    var post_url = DOMAIN + getApiURL() + 'notifications/';

    $.ajax({
      url: post_url,
      //data : post_data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_NOTIFICATIONS",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          for (var k in _.get_notifications_callback_queue) {
            try {
              _.get_notifications_callback_queue[k](data, params);
            } catch (err) {
              trackJavaScriptError(err);
            }
          }
          var updateEvt = new CustomEvent('NOTIFICATIONS', {
            'detail': {
              'data': data,
              'params': params
            }
          });
          document.dispatchEvent(updateEvt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      },
      complete: function(x, t, m) {
        _.performing_get_notifications = false;
        _.get_notifications_callback_queue = [];
      }
    });
  };

  this.read = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'notifications/read/';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      type: "POST",
      method_title: "READ_NOTIFICATIONS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {

          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

}

var Subscription = function() {
  var _ = this;

  this.get = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/subscription/';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_SUBSCRIPTION",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.getCard = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/subscription/card';

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_CARD",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.updateCard = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/subscription/card/update';

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "UPDATE_CARD",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        dispatchRemoveLoading();
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.cancelSubscription = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/subscription/cancel';

    $.ajax({
      url: post_url,
      data: "cancel_account=true",
      dataType: extension,
      cache: CACHE_ON,
      method_title: "CANCEL_SUBSCRIPTION",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }else{
            dispatchSuccessMessage(data.response.message);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.downgrade = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/subscription/cancel';

    $.ajax({
      url: post_url,
      data: "cancel_account=false",
      dataType: extension,
      cache: CACHE_ON,
      method_title: "DOWNGRADE",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          } else {
            dispatchSuccessMessage(data.response.message);
          }

          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.addCard = function(params) {
    if (!isOnline()) {
      return false;
    }
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/subscription/card/add';

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "ADD_CARD",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.add = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/subscription/add';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "ADD_SUBSCRIPTION",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.getAccountSubscritionData = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + 'v3/subscriptions/' + params.a_token + '/' + params.u_token;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_SUBSCRIPTION_DATA",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }

    });
  }

  this.getInvoices = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/subscription/invoices';

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_INVOICES",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.printInvoice = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/subscription/invoices/print?id=' + params.data.id;

    $.ajax({
      url: post_url,
      type: "GET",
      processData: false,
      method_title: "PRINT_INVOICE",
      /*
            contentType: "text/plain",
			dataType: "text",
			headers:{'Content-Type':'text/plain'},
			*/
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (typeof(params.callback) !== "undefined") {
          params.callback(data, params);
        }
        /*
				saveAs(
					new Blob(
						[data]
						, {type: "text/xml"}
					)
					, params.file_name
				);
				*/
        dispatchRemoveLoading();
      }
    });
  }

  this.switchPlan = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/subscription/switch';

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "SWITCH_PLAN",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.extendTrial = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/extend_trial';

    $.ajax({
      url: post_url,
      data: params.data,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "EXTEND_TRIAL",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var evt = {
            event_name: "Extend Trial",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true,
            mixpanel: false
          }
          eventTrack(evt);

          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }
}
var TimeCards = function() {
  var _ = this;

  this.get = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'timecards';
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      //
      method_title: "GET_TIMECARD",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };
  this.day = {};
  this.day.save = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'timecards/days/save';
    $.ajax({
      url: post_url,
      type: 'POST',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "SAVE_TIMECARD_DAY",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };
  this.entry = {};
  this.entry.remove = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'timecards/entries/delete/'+params.data.id;
    $.ajax({
      url: post_url,
      type: 'GET',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      //
      method_title: "DELETE_TIMECARD_ENTRY",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });

  };
}

var Applications = function() {
    var _ = this;

    this.get = function(params) {

      dispatchLoading(params);
      var post_url = DOMAIN + getApiURL() + 'apps/?release_status=ga,dev,qa,custom';

      $.ajax({
        url: post_url,
        dataType: extension,
        cache: CACHE_ON,
        data: params.data,
        method_title: "GET_APPS",
        params: params,
        dispatch_remove_loading: true,
        success: function(data) {

          if (data.response.status == 200) {
            currentUser.setApps(data.data);
            if (typeof(params.callback) !== "undefined") {
              params.callback(data, params);
            }
            dispatchRemoveLoading();
          } else {
            nonHttpStatusErrorHandler(this, data);
          }
        }
      });
    }

    this.toggle = function(params) {

      dispatchLoading(params);
      if(params.data.turn_on == true){
        var toggle_url = "on";
      }else{
        var toggle_url = "off";
      }

      var post_url = DOMAIN + getApiURL() + 'apps/'+params.data.key+"/"+toggle_url+"/" + `${params.data.unlink_full !== undefined ? '?unlink_full='+params.data.unlink_full : ''}`;

      $.ajax({
        url: post_url,
        dataType: extension,
        cache: CACHE_ON,
        method_title: toggle_url+"_APP",
        params: params,
        dispatch_remove_loading: true,
        success: function(data) {

          if (data.response.status == 200) {
            currentUser.updateAppStatus(data);
            if (typeof(params.callback) !== "undefined") {
              params.callback(data, params);
            }
            dispatchRemoveLoading();
          } else {
            nonHttpStatusErrorHandler(this, data);
          }
        }
      });
    }

    this.update = function(params) {

      dispatchLoading(params);
      let linked_workspaces = params.linked_workspaces !== undefined ?
      '?linked_workspaces=' + JSON.stringify(params.linked_workspaces)
      : ''
      var post_url = DOMAIN + getApiURL() + 'apps/'+params.key+"/update/" + linked_workspaces;

      $.ajax({
        url: post_url,
        dataType: extension,
        data : params.data,
        cache: CACHE_ON,
        method_title: "UPDATE_APP",
        params: params,
        dispatch_remove_loading: true,
        success: function(data) {

          if (data.response.status == 200) {
            currentUser.updateAppStatus(data);
            if (typeof(params.callback) !== "undefined") {
              params.callback(data, params);
            }
            dispatchRemoveLoading();
          } else {
            nonHttpStatusErrorHandler(this, data);
          }
        }
      });
    }
}

var Logs = function() {
  var _ = this;
  this.getUserLogs = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'logs/user/' + params.user_id;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "GET_USER_LOGS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.getAccountLogs = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() +'logs/';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "GET_USER_LOGS",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.getSingleAccountLog = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() +'logs/'+params.log_id;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "GET_SINGLE_LOG",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }
}

var Search = function(){
  var _ = this;

  this.projectsAndTasks = function(params){

    var post_url = DOMAIN + getApiURL() + '/search';

    $.ajax({
      url: post_url,
      data: params.data,
      localCache: false,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "SEARCH_PROJECTS_AND_TASKS",
      params: params,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  }

}

var FileUpload = function() {
  var _ = this;

  this.avatar = function(params) {


    dispatchLoading(params);

    var post_url = DOMAIN + getApiURL() + 'files/upload/';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      contentType: false,
      processData: false,
      type: 'POST',
      method_title: "UPDLOAD_AVATAR",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        dispatchRemoveLoading();
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.csv = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'account/import_data/csv/';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      contentType: false,
      processData: false,
      type: 'POST',
      method_title: "UPDLOAD_CSV",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        dispatchRemoveLoading();
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.report = function(params) { //form_data[FormData], extension [xlsx|pdf], callback , errorCallback

    dispatchLoading(params);

    var post_url = DOMAIN + getApiURL() + 'files/upload/report?extension=' + params.extension;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.form_data,
      contentType: false,
      processData: false,
      type: 'POST',
      method_title: "UPLOAD_REPORT",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        dispatchRemoveLoading();
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

}

var Files = function() {
  this.add = function(params) {
    dispatchLoading(params);

    var query = typeof params.data != "undefined" ? '?' + $.param(params.data) : '';
    var post_url = DOMAIN + getApiURL() + 'files/add/' + query;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.form_data,
      contentType: false,
      processData: false,
      type: 'POST',
      method_title: "FILE_ADD",
      params: params,
      dispatch_remove_loading: true,

      success: function(data) {
        dispatchRemoveLoading();
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var evt = new CustomEvent('FILE_UPLOADED', {
            'detail': data
          });
          document.dispatchEvent(evt);
          broadcast('SEARCH_FILES')

        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

  this.get = function(params){

    var post_url = DOMAIN + getApiURL() + 'files/';

    $.ajax({
      url: post_url,
      data: params.data,
      localCache: false,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "FILES_GET",
      params: params,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  }

  this.download = function(params){

    const response_json = params.response_json !== undefined ? params.response_json : true
    var post_url = DOMAIN + getApiURL() + 'files/'+ params.id + '/download/?response_json=' + response_json;

    $.ajax({
      url: post_url,
      data: params.data,
      localCache: false,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "FILE_DOWNLOAD",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var evt = new CustomEvent('FILE_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(evt);
          dispatchRemoveLoading();
          broadcast('SEARCH_FILES')
        } else {
          nonHttpStatusErrorHandler(this, data);
        }

      }
    });

  };

  this.getFileData = function(params){
    var post_url = DOMAIN + getApiURL() + 'files/'+ params.id +'/download_data' + `${params.data && params.data.w !== undefined ? '?w=' + params.data.w + '&h=' + params.data.h : ''}`;

    fetch(post_url, { headers:{
      'Authorization': make_base_auth(currentUser.get().email, currentUser.get().token)
      }
    })
    .then(function(response) {
      return response.blob()
    })
    .then(function(data) {
      if(data){
        if (typeof(params.callback) !== "undefined") {
          const file = {
            url: getFileUrlFromBlob(data),
            id: params.id,
            width: params.data ? params.data.w : undefined,
            height: params.data ? params.data.h : undefined,
          }
          params.callback(file, params);
        }
        dispatchRemoveLoading();
      } else {
        //nonHttpStatusErrorHandler(this, data);
      }
    });
    /*
    $.ajax({
      url: post_url,
      method_title: "FILE_DOWNLOAD",
      params: params,
      xhrFields:{
        responseType: 'blob'
      },
      success(data) {
        if(data){
          const blob = new Blob([data], {type: 'image/jpg;charset=utf-8;'})
          console.warn(blob)
          if (typeof(params.callback) !== "undefined") {
            params.callback(getFileUrlFromBlob(blob), params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      },
    });
    */
  };

  this.delete = function(params) {
    dispatchLoading(params);

    var post_url = DOMAIN + getApiURL() + 'files/'+ params.id +'/delete/'

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      contentType: false,
      processData: false,
      type: 'GET',
      method_title: "FILE_DELETE",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        dispatchRemoveLoading();
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var evt = new CustomEvent('FILE_REMOVED', {
            'detail': data
          });
          document.dispatchEvent(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  };

}

var Device = function() {

  this.register = function(params) {

    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() +'devices/register';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "REGISTER",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {

        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }
}

const Dictionary = function() {

  this.list = function(params) {
    var post_url = DOMAIN + getApiURL();
    dispatchLoading(params);
    $.ajax({
      url: post_url + '/dictionaries',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "LIST_DICTIONARIES",
      params,
      dispatch_remove_loading: true,
      success(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.add = function(params) {
    //dispatchLoading(params);
    var post_url = DOMAIN + getApiURL();
    $.ajax({
      url: post_url + '/dictionary/add',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "ADD_DICTIONARY",
      params,
      dispatch_remove_loading: true,
      success(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          //dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }
}

var Docs = function() {

  var _ = this;

  this.getList = function(params) { //id,callback

    var post_url = DOMAIN + getApiURL() + 'docs/'
    params = !!params ? params : {};

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      localCache: false,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_SHORT,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'docs',
      method_title: "GET_DOCS_LIST",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.get = function(params) { //id,callback

    var post_url = DOMAIN + getApiURL() + 'docs/' + params.id;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_SHORT,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'doc_' + params.id,
      method_title: "GET_DOC",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          var evt = new CustomEvent('DOC_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.add = function(params) {
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'docs/add/';
    params.data.status = 'PENDING_APPROVAL';
    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method: "POST",
      method_title: "ADD_DOC",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
          var evt = {
            event_name: "Doc Added",
            prop: {
              category: 'use'
            },
            intercom: true,
            ga: true,
            mixpanel: currentUser.getCurrentAccountStatus() == "TRIAL"
          }
          eventTrack(evt);
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.remove = function(params) { //id,obj
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'docs/' + params.id + '/delete';
    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      method_title: "REMOVE_DOC",
      params: params,
      dispatch_remove_loading: true,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.update = function(params) { //data,id,callback
    dispatchLoading(params);
    var post_url = DOMAIN + getApiURL() + 'docs/' + params.id + '/update';

    $.ajax({
      url: post_url,
      dataType: extension,
      data: params.data,
      cache: CACHE_ON,
      method_title: "UPDATE_DOC",
      params: params,
      dispatch_remove_loading: true,
      type: 'POST',
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) != "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }


  this.getPublic = function(params) { //id,callback

    var post_url = DOMAIN + PUB_VERSION + '/docs/' + params.public_token;

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_SHORT,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'doc_public_' + params.id,
      method_title: "GET_DOC_PUBLIC",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          /*
          var evt = new CustomEvent('DOC_UPDATED', {
            'detail': data
          });
          document.dispatchEvent(evt);
          */
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

  this.getVersions = function(params) { //id,callback

    var post_url = DOMAIN + getApiURL() + 'docs/' + params.id + '/versions';

    $.ajax({
      url: post_url,
      dataType: extension,
      cache: CACHE_ON,
      localCache: true,
      cacheTTL: LOCAL_STORAGE_CACHE_DURATION_SHORT,
      cacheKey: currentUser.getCurrentAccount().account_id + '-' + 'doc_' + params.id,
      method_title: "GET_DOC_VERSIONS",
      params: params,
      success: function(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }

}

const ExportData = function() {
  this.createFiles = function(params) {
    console.warn(params)
    var post_url = DOMAIN + getApiURL();
    dispatchLoading(params);
    $.ajax({
      url: post_url + 'exports/create_files',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "EXPORT_CREATE_FILES",
      params,
      method: "POST",
      dispatch_remove_loading: true,
      success(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }
  this.list = function(params) {
    var post_url = DOMAIN + getApiURL();
    dispatchLoading(params);
    $.ajax({
      url: post_url + 'exports',
      dataType: extension,
      cache: CACHE_ON,
      data: params.data,
      method_title: "LIST_EXPORTED_FILES",
      params,
      dispatch_remove_loading: true,
      success(data) {
        if (data.response.status == 200) {
          if (typeof(params.callback) !== "undefined") {
            params.callback(data, params);
          }
          dispatchRemoveLoading();
        } else {
          nonHttpStatusErrorHandler(this, data);
        }
      }
    });
  }
}

//TRACKING DE ERRORES Y API
function trackJavaScriptError(e) {
  try {
    var ie = window.event || {},
      errMsg = e.message || ie.errorMessage;
    var errSrc = (e.filename || ie.errorUrl) + ': ' + (e.lineno || ie.errorLine);
    ga('send', 'event', 'JavaScript Error ' + getAppVersion(), errMsg, errSrc, {
      'nonInteraction': 1,
      dimension1: PLATFORM,
      dimension2: getAppVersion(),
      dimension3: (currentUser.getCurrentAccount() != null) ? currentUser.getCurrentAccountStatus() : "",
      dimension4: (currentUser.getCurrentAccount() != null) ? currentUser.getCurrentAccount().role : ""
    });


  } catch (err) {
    console.log("Error on trackJavaScriptError")
  }
}

function trackCustomJavaScriptError(errMsg) {
  ga('send', 'event', 'JavaScript Error ' + getAppVersion(), errMsg, '', {
    'nonInteraction': 1,
    dimension1: PLATFORM,
    dimension2: getAppVersion(),
    dimension3: (currentUser.getCurrentAccount() != null) ? currentUser.getCurrentAccountStatus() : "",
    dimension4: (currentUser.getCurrentAccount() != null) ? currentUser.getCurrentAccount().role : ""
  })
}

window.addEventListener('error', trackJavaScriptError, false);

function trackApiError(xhr, data) {

  console.log("TRACKING API ERROR");
  try {
    //URL
    var url = xhr.url;
    url = removeURLParameter(url, "email");
    url = removeURLParameter(url, "token");
    url = removeURLParameter(url, "password");
    url = removeURLParameter(url, "account_token");
    url = removeURLParameter(url, "a_token");
    url = removeURLParameter(url, "u_token");

    var category = 'Api Error ' + getAppVersion();

    var http_status = "";
    var json_status = "";

    if (typeof(data.x) != "undefined") {
      if (isJsonResponse(data)) {
        var message = returnParsedTextError(data).response.message;
        var json_status = returnParsedTextError(data).response.status;
        var http_status = data.x.status;

      } else {
        if (isOnline()) {
          var message = "server error";
        } else {
          var message = "offline";
        }
        var http_status = data.x.status;
        var json_status = "-";
      }
    } else {
      // error status 200
      var message = data.response.message;
      var json_status = data.response.status;
      var http_status = "200";
    }

    var label = xhr.method_title + " http:" + http_status + " | json:" + json_status + " | " + message;

    ga('send', 'event', category, label, url, {
      dimension1: PLATFORM,
      dimension2: getAppVersion(),
      dimension3: (currentUser.getCurrentAccount() != null) ? currentUser.getCurrentAccountStatus() : "",
      dimension4: (currentUser.getCurrentAccount() != null) ? currentUser.getCurrentAccount().role : ""
    });

  } catch (err) {
    trackJavaScriptError(err)
  }
}

function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {

    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + '?' + pars.join('&');
    return url;
  } else {
    return url;
  }
}

function testErrorCallback(data) {
  console.log("TEST ERROR CALLBACK");
  console.log(data);
  console.log("TEST ERROR CALLBACK FIN");
}

function submitForm(post_url, query) {
  var form = document.createElement("form");
  form.method = "POST";
  form.action = post_url;
  if (typeof query == 'object') {
    for (var i in query) {
      var input = createInput(i, query[i]);
      form.appendChild(input);
    }
  } else
  if (typeof query == 'string') {
    var pairs = query.split('&');
    pairs.forEach(function(pair) {
      pair = pair.split('=');
      var input = createInput(pair[0], pair[1]);
      form.appendChild(input);
    });
  }
  document.body.appendChild(form);
  form.submit();

  function createInput(name, value) {
    var input = document.createElement("input");
    input.name = name;
    input.value = decodeURIComponent(value || '');
    return input;
  }
}

var unminify = {
  events : function(data){
    for (var i in data) {
      data[i] = this.event(data[i]);
    }
    return data;
  },
  event : function(event){
    return {
      id: event.id,
      start: event.s,
      end: event.e,
      duration: event.d,
      service: event.se,
      service_id: event.seid,
      service_color_index: event.sci,
      customer: event.c,
      customer_id: event.cid,
      customer_color_index: event.cci,
      project: event.p,
      project_id: event.pid,
      project_is_favorite: event.pif,
      task: event.t,
      task_id: event.tid,
      task_type: event.tt,
      task_visibility: event.tv,
      task_list: event.tl,
      due_date: event.dd,
      estimated_time: event.et,
      is_archived: event.a,
      user: event.u,
      user_id: event.uid,
      user_avatar: event.uau,
      user_color_index: event.uci,
      timezone: event.tz,
      notes: event.n,
      color: event.co,
      hourly_rate: event.r,
      is_billable: event.b,
      is_billed: event.bd,
      user_groups: event.g,
      user_hourly_cost: event.uhc,
      user_hourly_rate: event.uhr,
      repeat: event.er,
      repeat_every: event.re,
      frequency: event.rf,
      event_type: event.ety
    };
  }
}
