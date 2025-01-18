fvdSynchronizer.PremiumForShare = new function(){
  function isAuthorizedOnServer(cb) {
      // Disabled
      /*
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://everhelper.pro/shareforpremium/can.php");
    xhr.onload = function() {
        
        try{// ff added 'try' because wrong answer format
          var resp = JSON.parse(xhr.responseText);
          if(!resp.can){
            cb(false);
          }
          else{
            cb(true);
          }
        }catch(err){
            cb(false);
        }
        
    };
    xhr.send(JSON.stringify({
      action: "user:authstate"
    }));
    */
  }

  this.canDisplay = function(params, cb) {
    if(typeof params == "function"){
      cb = params;
      params = {};
    }
    var installTime = parseInt(fvdSynchronizer.Prefs.get("install.time"));
    // remove '&& false'
    if(new Date().getTime() - installTime < 3600 * 24 * 7 * 1000 && false){
      return cb(false);
    }

    isAuthorizedOnServer(function(authorized) {
      if(!authorized){
        return cb(false);
      }
      cb(true);
    });
  };
}();
