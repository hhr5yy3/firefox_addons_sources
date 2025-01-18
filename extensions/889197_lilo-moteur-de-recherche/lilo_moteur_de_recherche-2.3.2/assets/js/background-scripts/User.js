/**
 * User related function 
 */
var User = { 
	userkey: null,

    getUserKey: function (callback) {
        if (this.userkey != null) {
            callback(this.userkey);
        } else {
            if (browser.storage) {
                browser.storage.local.get("userkey", function (result) {
                    User.userkey = result.userkey;
                    callback(result.userkey);
                });
            }
        }
    },
	
	setUserKey: function(ukey){
		if(ukey != this.userkey){
			log("Set userkey: "+ ukey);
			this.userkey = ukey;
			browser.storage.local.set({"userkey":ukey});
		}
	}
}