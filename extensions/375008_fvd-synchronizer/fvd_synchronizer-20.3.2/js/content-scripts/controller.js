fvdSynchronizer.ContentScriptsController = new function(){
    ///return; // ff disabled for union
    
	//chrome.extension.onMessage.addListener(function( msg, sender, callback ){ // ff switch to runtime
	//browser.extension.onMessage.addListener(function( msg, sender, callback ){
    
    
    browser.runtime.onMessage.addListener(function( msg, sender, callback ){
        if(typeof msg != "object" || !msg.action || msg.action == "_response") return;
        
        //if(msg.action.indexOf('web:') === 0) 
        msg.action = msg.action.replace('web:', ''); // ff Task #789, Task #782

        if (msg.action.indexOf("event:") !== -1) {
           var timeout = 0;
           
           if (msg.action == "event:login") {
               // wait for cookie handling
               timeout = 1000;//500; // Task #921
           }
           setTimeout(function () {
               fvdSynchronizer.Observer.fireEvent(msg.action, [msg.data]);
           }, timeout);
           return;
        }

        switch (msg.action) {
           case "getCurrentUsage":

               var result = {};

               fvdSynchronizer.Utils.Async.arrayProcess(fvdSynchronizer.Server.Sync.getDriversList(), function (driverName, apc) {

                   var d = fvdSynchronizer.Driver[driverName];

                   if (!d.isAllowed) {
                       result[driverName] = -1;
                       return apc();
                   }
                   d.isAllowed(function (allowed) {
                       if (allowed) {
                           d.totalItemsCount(function (count) {
                               result[driverName] = count;
                               apc();
                           });
                       } else {
                           result[driverName] = -1;
                           return apc();
                       }
                   });

               }, function () {

                   callback(result);

               });

               return true;

               break;

           case "connect":

               callback({});

               return true;

               break;

           case "_response":



           break;


           default:
               if(String(msg.action).indexOf("web") !== -1){
                   callback({});
                   return true;
               }

               /*
               */
           break;

        }

	});

}
