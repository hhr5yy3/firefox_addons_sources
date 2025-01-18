function updateRobots(value, tabId, isTabBtn, url) {
	//console.log("updateRobots");
    if(value.ok == true){
        var output = (value.index == false?'no':'')+'index / '+(value.follow == false?'no':'')+'follow';
        var icon = 'images/'+(value.index == false?'no':'')+'index-'+(value.follow == false?'no':'')+'follow.png'; 
        
        var realoutput = '<p class="'+(value.index == false?'no':'yes')+'">'+(value.index == false?'no':'')+'index</p>';
        realoutput += '<p class="'+(value.follow == false?'no':'yes')+'">'+(value.follow == false?'no':'')+'follow</p>';
        
        if(value.not_set)
            realoutput += '<p><br />('+browser.i18n.getMessage("not_found")+')</p>';
    } else {
        var output = browser.i18n.getMessage("no_valid_url");
        var icon = 'images/noresult.png'; 
        
        var realoutput = output;
    }
    
    if (isTabBtn) {
        browser.browserAction.setTitle({
            title: output,
            'tabId': tabId
        });
        browser.browserAction.setIcon({
            path: icon,
            'tabId': tabId
        });
    }
    
    var robotoutput = document.getElementById("robotoutput");
    if(robotoutput != null){
        robotoutput.innerHTML = realoutput+'<p id="xheader"></p>';
        
        if(url != null){
            var xheader = document.getElementById("xheader");
            getXHeader(xheader, url);    
        }
    }
}


function viewRobots(source, tabId, isTabBtn, url) {
	
	//console.log("viewRobots");
        
    var value = {
        ok: false,
        not_set: false,
        index: false,
        follow: false                                    
                
    };
    
    if(source == undefined) {
        value.ok = false;
    } else {
        value.ok = true;
        
        var robots = source.toString();                    
        
        if(robots == '')
        {
            value.not_set = true;
            value.index = true;
            value.follow = true;
        }
        else
        {   
            value.not_set = false;
            
            value.index = (robots.indexOf('noindex') != -1 || robots == 'noindex'?false:true);
            value.follow = (robots.indexOf('nofollow') != -1 || robots == 'nofollow'?false:true);
        }
    }
    
    updateRobots(value, tabId, isTabBtn, url);
}


function getXHeader(xheader, url){
	
	//console.log("getXHeader");
	
    if (url.substr(0, 7) != 'http://' && url.substr(0, 8) != 'https://')
        return false;
    
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function() {
	    
		if (xhr.readyState == 4) {
			switch (xhr.status) {
				case 0:
					break;
				default:
					var headers = xhr.getAllResponseHeaders().split("\n");
					if (headers.length > 0 && headers[0] != '') {
				        var xheader_found = false;
						
						headers.forEach(function(line) {
							if (line != '') {
								var header_name = line.substring(0, line.indexOf(': ')).replace(/(<([^>]+)>)/ig,"").toLowerCase();
								var header_value = line.substring(line.indexOf(': ')+2, line.length-1).replace(/(<([^>]+)>)/ig,"");
								
                                if(header_name == 'x-robots-tag' || header_name == 'x-robots'){
                                    xheader.innerHTML = 'X-Robots: '+header_value;
                                    xheader_found = true;
                                }   
							}
						});
					
                        if(!xheader_found)
                            xheader.innerHTML = '(X-Robots: N/A)';
					} 
					break;
			}
		}
	}
	xhr.send();
}