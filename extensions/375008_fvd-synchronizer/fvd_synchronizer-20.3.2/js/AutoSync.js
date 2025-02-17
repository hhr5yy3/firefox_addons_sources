(function(){

	function DriversAutoUpdater( drivers ){

		var timer = null;

		function _startTimer(){

			setTimeout(function() {

        fvdSynchronizer.Utils.Async.chain([
          function(next) {
            // do something before auto sync
            next();
          },
          function() {
            fvdSynchronizer.Utils.Async.arrayProcess( drivers, function( dInfo, apCallback ) {
                fvdSynchronizer.Server.Sync.getAccountPremission( function( accountPremission ){//  Task #1601, #1833

                    var driver = dInfo.driver;
                    var driverName = dInfo.name;

                    if( !accountPremission || !_b( fvdSynchronizer.Prefs.get(driverName.toLowerCase() + ".enable_autosync") ) ){
                        console.log( driverName + ": Skip autosync" );
                        return apCallback();
                    }

                    console.log( driverName + ": Start autosync" );

                    driver.startAutoSync( null, function( error ) {
                    console.log( driverName + ": Sync completed with: " + error );
                    apCallback();
                    } );
                    
                });
            }, function() {
              _startTimer();
            } );
          }
        ]);

			}, fvdSynchronizer.Config.AUTOSYNC_EVERY);

		}

		_startTimer();

	}

	var __fvdSynchronizerAutoSync = function(){

		var drivers = [];

		fvdSynchronizer.eachDriver(function( driver, name ){

			if( driver.startAutoSync ){

				drivers.push({
					driver: driver,
					name: name
				});

			}

		});

		var autoUpdater = new DriversAutoUpdater( drivers );

	};

	fvdSynchronizer.AutoSync = new __fvdSynchronizerAutoSync();

})();