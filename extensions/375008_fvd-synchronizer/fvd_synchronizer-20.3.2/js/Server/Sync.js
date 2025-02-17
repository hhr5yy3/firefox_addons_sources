(function() {

  var IS_LOCAL = false;
  var IS_TESTING = false;
  var AUTH_COOKIE_NAME = "auth";
  var SESSION_COOKIE_NAME = "eversessionid";
  var SYNC_ADMIN_URL = "https://everhelper.pro/client";

    //if (window == browser.extension.getBackgroundPage()) { // ff method switch
    if (window.location == browser.extension.getURL("/background.html")) {

    var Sync = function(){

      var self = this;

      var tokensCache = {};

      var _serverQuota = null;

      function notify( data ){
        //browser.extension.sendRequest( data );
        browser.runtime.sendMessage( data ); // ff 
      }

        function addCreadentialsToMessage(message){
        // do anything, because all session data will transfered in cookies
            //message.credentials = self.getCredentials();
        }

        this.currentEverSessionId = function( callback ){

        browser.cookies.get( {
          url: SYNC_ADMIN_URL,
          name: SESSION_COOKIE_NAME
        }, function( cookie ){

          if( cookie && cookie.value ){
            callback( cookie.value );
          }
          else{
            callback( "" );
          }


        } );

       };

      this.preUploadFile = function( params, callback ){

        var f = new FormData();

        if( params.blob ) {
          f.append( "file", params.blob, params.name );
        }
        else if( params.file ) {
          f.append( "file", params.file, params.name );
        }
        else{
          return callback( fvdSynchronizer.Errors.ERROR_WRONG_ARGUMENTS_COUNT );
        }

        fvdSynchronizer.Server.Connection.request( {
          action: "files:preupload"
        }, callback, f );

      };

      this.releaseType = function(){

        if( IS_LOCAL ){
          return "local";
        }
        else if( IS_TESTING ){
          return "testing";
        }

        return "production";

      };

        this.getToken = function( params, callback ){

          self.currentEverSessionId(function( sessionId ){

            if( tokensCache[ sessionId ] ){
              return callback( tokensCache[ sessionId ] );
            }

            self.getTokenForceFromServer( null, function( error, data ){

              if( error ){
                return callback("");
              }

              if( !data || !data.token ){
                return callback("");
              }

              tokensCache[ sessionId ] = data.token;

              callback( data.token );

            } );

          });

        };

        this.getTokenForceFromServer = function( params, callback ){
        var message = {
          action: "user:getToken"
        };

        this.authorizedMessage( message, callback );
        };

      this.acquireSyncLock = function( callback ){
        if(IS_LOCAL) {
          return callback(0);
        }
        self.getToken( null, function( token ){
          fvdSynchronizer.Server.Connection.setCurrentToken( token );

          var message = {
            action: "acquire_lock",
            name: "sync"
          };

          self.authorizedMessage( message, callback );
        } );

      };

      this.releaseSyncLock = function( callback ){

        var message = {
          action: "release_lock",
          name: "sync"
        };

        this.authorizedMessage( message, callback );

      };

      this.authorizedMessage = function( data, callback ){

        self.activityState( function( state ){

          if( state != "logged" ){
            return callback( fvdSynchronizer.Errors.ERROR_NOT_LOGGED );
          }

          addCreadentialsToMessage( data );

          fvdSynchronizer.Server.Connection.request( data, callback );

        } );

      };

      this.getAuthState = function( params, callback ){

        if( typeof params == "function" ){
          callback = params;
          params = null;
        }

        this.authorizedMessage( {
          action: "user:authstate"
        }, function( error, data ){

          if( error ){
            return callback( error );
          }

//          callback( 0, data.authorized );
          callback( 0, data.authorized, data ); // Task #1601


        } );

      };
        
      this.updateSyncAccount = function( ){// Task #1833
          console.info('updateSyncAccount');
          
          this.getAuthState(function (authError, authAuthorized, authData) {
                if(!authError && typeof authData == "object" && authData.login){
                    fvdSynchronizer.Prefs.set("sync_account", authData.login);
                }
          });
      }
        
      this.getAccountPremission = function( callback ){//  Task #1601
            var lastLogin = fvdSynchronizer.Prefs.get("sync_account");
            var premission = true;
          
            this.getAuthState( function( authError, authAuthorized, authData ){//  Task #1601
                if(
                    authError 
                    || typeof authData != "object" 
                    || (
                        authData.login != lastLogin 
                        && 
                        lastLogin != "default"
                    )
                ){
                    premission = false;
                }
                
                if(callback) callback(premission);
            });
      };

      this.notAuthorizedMessage = function( data, callback ){
        fvdSynchronizer.Server.Connection.request( data, callback );
      };

      /* creadentials */

        this.getCredentials = function(){

            return {
                email: fvdSynchronizer.Prefs.get("login"),
                password: fvdSynchronizer.Prefs.get("password")
            };

        };

      this.setCredentials = function( email, password ){
        fvdSynchronizer.Prefs.set( "login", email );
        fvdSynchronizer.Prefs.set( "password", password );

        self.logoutFromAdminPanel(function(){
          self.loginInAdminPanel();
        });
      },

      /* activity state */

      this.activityState = function( callback ){

        if( callback ){

          browser.cookies.get( {
            url: SYNC_ADMIN_URL,
            name: AUTH_COOKIE_NAME
          }, function( cookie ){

            if( cookie && cookie.value ){
              callback( "logged" );
            }
            else{
              callback( "not_logged" );
            }


          } );


        }
        else{
          return fvdSynchronizer.Prefs.get( "activity_state" );
        }

      };

      this.setActivityState = function( state ){          
        fvdSynchronizer.Prefs.set( "activity_state", state );

        notify( {subject: "changeActivityState"} );

        if( state == "not_logged" ){
          // log out from admin panel, if logout from addon

          self.logout( function(){
            //browser.extension.sendMessage({
            browser.runtime.sendMessage( { // ff changed method
              action: "event:logout"
            });
          } );

          self.removeAuthCookie();

          //self.logoutFromAdminPanel();
        }
      };

      this.logout = function( callback ){
        var message = {
          action: "user:logout"
        };
        this.authorizedMessage( message, callback );
      };

      /* sync state */

      this.syncState = function(){

        if( this.isSyncNow() ){
          return "sync";
        }

        if( this.hasDataToSync() ){
          return "hasDataToSync";
        }

        return "normal";
      };

      // must be called by drivers if to sync data changes, or sync state of driver changes
      this.syncStateRefresh = function(){
        fvdSynchronizer.ButtonController.refreshButton();
        notify( {subject: "changeSyncState"} );
      };

      this.isSyncNow = function(){
        for( var driverName in fvdSynchronizer.Driver ){
          if( fvdSynchronizer.Driver[driverName].isSyncNow() ){
            return true;
          }
        }

        return false;
      };

      this.hasDataToSync = function(){

        for( var driverName in fvdSynchronizer.Driver ){
          if( fvdSynchronizer.Driver[driverName].hasToSyncData() ){
            return true;
          }
        }

        return false;

      };


      /* actions with server */

        /* Only checks if user exists
         *  Doesn't make any authorization, only return true of false
         */
        this.userExists = function(email, password, callback){

            self.notAuthorizedMessage({
                action: "user_exists",
                email: email,
                password: password
            }, callback);

        };

        /*
         * Register new user
         */
        this.registerUser = function(email, password, callback){
            self.notAuthorizedMessage({
                action: "user_register",
                email: email,
                password: password
            }, callback);
        };

        this.removeUser = function(callback){
            var data = {
                action: "remove_user"
            };
            self.authorizedMessage(data, callback);
        };

        this.resendConfirmEmail = function(email, callback){
            self.notAuthorizedMessage({
                action: "resend_confirm_email",
                email: email
            }, callback);
        };

        this.confirmRegistration = function(key, callback){
            self.notAuthorizedMessage({
                action: "confirm_registration",
                key: key
            }, callback);
        };

        this.remindPassword = function(email, callback){
            self.notAuthorizedMessage({
                action: "remind_password",
                email: email
            }, callback);
        };

      /* change password */

      this.changePassword = function( newpassword, callback ){

        var data = {
          action: "user_change_password",
          newpassword: newpassword
        };

            self.authorizedMessage(data, callback);

      };

      this.changePasswordConfirm = function( key, callback ){

        var data = {
          action: "user_change_password_confirm",
          key: key
        };

        self.authorizedMessage(data, callback);

      };

      this.getQuota = function( callback ){

        self.authorizedMessage({
          action: "get_quota"
        }, function( error, data ){

          if( error ){
            return callback( error );
          }

          try{
            for( var category in data ){
              for( var type in data[category] ){
                if( !data[category][type] ){
                  data[category][type] = 0;
                }
              }
            }
          }
          catch( ex ){

          }

          return callback( 0, data );

        });

      };

      this.getQuotaByType = function( category, type, callback ){

        if( _serverQuota ){
          return callback( 0, _serverQuota[category][type] );
        }

        self.getQuota( function( error, _data ){

          if( error ){
            return callback( error );
          }

          _serverQuota = _data;

          return callback( 0, _serverQuota[category][type] );
        } );

      };

      this.loginInAdminPanel = function( callback ){

        var credentials = this.getCredentials();

        fvdSynchronizer.Utils.Async.chain([

          function( chainCallback ){

            self.activityState(function( state ){

              if( state != "logged" ){
                return callback( false );
              }

              chainCallback();

            });

          },

          function( chainCallback ){
            fvdSynchronizer.Server.Connection.get( SYNC_ADMIN_URL + "/common/i_am_logged", function( response ){

              if( !response ){
                return callback(false);
              }

              if( response.data.logged ){
                return callback( true );
              }
              else{
                chainCallback();
              }

            } );
          },

          function(){

            fvdSynchronizer.Server.Connection.post( SYNC_ADMIN_URL + "/login", JSON.stringify({
              login: credentials.email,
              password: credentials.password
            }), function( response ){

              if( !response ){
                return callback(false);
              }

              if( !response.error ){
                return callback( true );
              }
              else{
                callback(false);
              }

            } );

          }

        ]);



      };

      this.logoutFromAdminPanel = function( callback ){

        fvdSynchronizer.Server.Connection.post( SYNC_ADMIN_URL + "/common/logout", JSON.stringify({

        }), function( response ){

          if( callback ){
            callback();
          }

        } );

      };

      this.navigateToAdminPanelOptions = function( tab ){

        this.navigateToAdminPage( "/?l=/components/MainOptions/" + tab );

      };

      this.navigateToAdminPage = function( url ){

        url = url || "";

        self.loginInAdminPanel( function(){

          browser.tabs.create({
            url: SYNC_ADMIN_URL + url,
            active: true
          });

        } );

      };

      this.userInfo = function(cb) {
        this.authorizedMessage({
          action: "user:info"
        }, cb);
      };

      this.getLastAccountAuthorizedId = function() {
        return parseInt(fvdSynchronizer.Prefs.get("lastAccountAuthorizedId")) || 0;
      };

      this.setLastAccountAuthorizedId = function(id) {
        fvdSynchronizer.Prefs.set("lastAccountAuthorizedId", id);
      };

      this.clearLastAccountAuthorizedId = function(id) {
        fvdSynchronizer.Prefs.set("lastAccountAuthorizedId", 0);
      };

      this.getAdminUrl = function(){
        return SYNC_ADMIN_URL;
      };
      this.getAuthCookieName = function(){
        return AUTH_COOKIE_NAME;
      };

      this.removeAuthCookie = function(){
        browser.cookies.remove({
          url: SYNC_ADMIN_URL,
          name: AUTH_COOKIE_NAME
        });
      };

      this.getDriversList = function(){

        var drivers = [];
        for( var driver in fvdSynchronizer.Driver ){
          drivers.push( driver );
        }

        return drivers;

      };

    };

    fvdSynchronizer.Server.Sync = new Sync();

    // listen for removing auth cookie
    browser.cookies.onChanged.addListener(function(changeInfo) {
      if(changeInfo.cause === "expired_overwrite" && changeInfo.removed) {
        var cookie = changeInfo.cookie;
        if(cookie.name === AUTH_COOKIE_NAME) {
          fvdSynchronizer.Server.Sync.activityState(function(state) {
            if(state !== "logged") {
              fvdSynchronizer.Observer.fireEvent("event:logout");
            }
          });
        }
      }
    });
  }
  else{
    fvdSynchronizer.Server.Sync = browser.extension.getBackgroundPage().fvdSynchronizer.Server.Sync;
  }

})();

