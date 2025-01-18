browser.runtime.onMessage.addListener(function(request,sender,callback){
    if (request.action == 'getSeeRobotsTag'){
		
        var metatag = '';
        var metas = document.getElementsByTagName('meta');
        
        for (var x=0,y=metas.length; x<y; x++) { 
            if (metas[x].name.toLowerCase() == "robots") {
				var content = metas[x].getAttribute("content").toString();
				
                metatag = metatag + ' ' + content.toLowerCase();
            } 
        }
		       
        callback(metatag);
    } 
});