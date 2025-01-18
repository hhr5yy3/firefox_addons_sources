(function() {
  'use strict'
  
  browser.runtime.onConnect.addListener(function (extensionPort) {
  
    var driverPort;
    var driverPresent = 0;
    
    	extensionPort.onDisconnect.addListener(
        function() {
        	if(driverPort) {
    		driverPort.postMessage("<closedriver/>");
    	}
	});

    	extensionPort.onMessage.addListener(
        function (message) {
      switch(message.type) {
case 'HELLO_JS_RTCC':
              var messagetoext = {};
              messagetoext.type = 'HELLO_JS_RTCC_OK';
              extensionPort.postMessage(messagetoext);
              return;

        case 'CONNECT_JS_RTCC':
			var hostName = "com.sightcall.firefox.driver";
			
      if (driverPort !== undefined && driverPresent === 1){
          var messagetoext = {};
          messagetoext.type = 'CONNECT_JS_RTCC_OK';
          extensionPort.postMessage(messagetoext);
          return;
      }
			driverPort = browser.runtime.connectNative(hostName);
 			
       	      driverPort.onMessage.addListener(
                function (message) {
				var messagetoext = {};
      				if(message.text === "<readyforconnection/>") {
					driverPresent = 1;
					messagetoext.type = 'CONNECT_JS_RTCC_OK';
					extensionPort.postMessage(messagetoext);
      				} else if(message.text === "<reset/>") {
					driverPresent = 1;
					driverPort.postMessage("<closedriver/>");
					messagetoext.type = 'DISCONNECT_JS_RTCC';
					extensionPort.postMessage(messagetoext);
      				} else {
					// messages from driver
					messagetoext.type = 'TO_JS_RTCC';
	          		messagetoext.msg = message.text;
					extensionPort.postMessage(messagetoext);
      					if(message.text === "<updating/>") {
						driverPort.postMessage("<closedriver/>");
					}
				}
		    });

  		        driverPort.onDisconnect.addListener(
                   function() {
		    	driverPort = undefined;
		    	var messagetoext = {};
        		    	if(driverPresent === 0) {
		    		messagetoext.type = 'RTCC_PLUGIN_MISSING';
        		    	} else {
		    		messagetoext.type = 'DISCONNECT_JS_RTCC';
		    	}
				extensionPort.postMessage(messagetoext);
		    });
            break;

        case 'FROM_JS_RTCC':
          driverPort.postMessage(message.msg);
          break;
      }
    });
   });
   
})();

