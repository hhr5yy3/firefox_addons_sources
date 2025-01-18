(function(){

  this.Background = new function(){

    window.addEventListener( "load", function(){

      // refresh setting tabs
      browser.tabs.query({
        //url: browser.extension.getURL("options.html") // ff disabled due "Invalid match pattern"
      }, function( tabs ){
        //var needUrl = browser.extension.getURL("/eversync/options.html"); // ff
        var needUrl = browser.extension.getURL("/options.html"); // ff
        for(var i = tabs.length-1; i >= 0; i--) if(tabs.url != needUrl) tabs.splice(i, 1); // ff
          
        tabs.forEach(function( tab ){
          browser.tabs.reload( tab.id );
        });

      });

      if( fvdSynchronizer.Utils.isVersionChanged() ){
        // reset display chrome sync message
        fvdSynchronizer.Prefs.set( "dont_display_ds_chromesync_message", false );
      }

      fvdSynchronizer.Localizer.localizeCurrentPage();

      function mainSyncChangeListener() {
      }

      // listen driver change state
      for (var driverName in fvdSynchronizer.Driver) {

        if(fvdSynchronizer.Driver[driverName].addChangeMainSyncStateListener){

          fvdSynchronizer.Driver[driverName].addChangeMainSyncStateListener( mainSyncChangeListener );

        }
      }

      function setSyncAfterLogin() {
        for (var driverName in fvdSynchronizer.Driver) {
          if(fvdSynchronizer.Driver[driverName].setFirstSyncAfter){
            fvdSynchronizer.Driver[driverName].setFirstSyncAfter( "login" );
          }
        }
      }

      function processRegisterEvent() {
        // user has been registered
        // upload data of all drivers to the server
        var drivers = Object.keys(fvdSynchronizer.Driver);
        fvdSynchronizer.Utils.Async.arrayProcess(drivers, function(driverName, next) {
          var driver = fvdSynchronizer.Driver[driverName];
          driver.isAllowed(function(allowed) {
            if(!allowed) {
              return next();
            }
              
              fvdSynchronizer.Server.Sync.getAccountPremission( function( accountPremission ){//  Task #1601
                if(accountPremission){
                    fvdSynchronizer.Utils.getOptionsPagesOpenedTabsIds(function(err, tabsIds) {
                      if(!tabsIds || !tabsIds.length) {
                        driver.overwriteServerData(function() {
                          next();
                        });
                      }
                      else {
                        browser.tabs.sendMessage(tabsIds[0], {
                          action: "runSync",
                          driver: driverName,
                          type: "overwriteServerData"
                        }, function() {
                          next();
                        });
                      }
                    });
                }else{
                    console.warn('Sync is not allowed');
                    next();
                }
              });
          });
        }, function() {
            //finish
        });
      }

      fvdSynchronizer.Observer.registerCallback("event:login", setSyncAfterLogin);
      fvdSynchronizer.Observer.registerCallback("event:register", processRegisterEvent);
      fvdSynchronizer.Observer.registerCallback("event:logout", setSyncAfterLogin);
                
      fvdSynchronizer.Observer.registerCallback( "event:openURL", function( data ){
            chrome.tabs.create({
                url: data.url,
                active: true
            });
          
      } );

      fvdSynchronizer.Server.Sync.getAuthState( function( error, authorized ){

        if( !authorized ){
          // user not authorized - be sure that auth cookie is removed
          browser.cookies.remove({
            url: fvdSynchronizer.Server.Sync.getAdminUrl(),
            name: fvdSynchronizer.Server.Sync.getAuthCookieName()
          });
        }

      } );

    }, false );

  };

}).apply( fvdSynchronizer );
