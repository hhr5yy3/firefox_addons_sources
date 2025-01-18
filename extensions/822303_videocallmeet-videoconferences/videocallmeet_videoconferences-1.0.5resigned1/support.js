browser.contextMenus.create({
  id: "VideoMeetingEdit",
  title: "Create a videomeeting room",
  contexts: ["selection"]
});


browser.contextMenus.onClicked.addListener(function(info, tab){
    if (info.menuItemId === "VideoMeetingEdit") {
    	//alert(JSON.stringify(info, null, 40));
        var var1 = info.selectionText;
        VideoMeetingEdit(var1);
    }
});

var usernamex = "";

function VideoMeetingEdit(var1) {      
     
     	console.log("bbbb");
    	var usernamex = Math.random().toString(36).substr(2, 9);  
  		var gourl =  "http://www.redcoolmedia.net/provisioning/loginvideomeetings.php?username="+ usernamex ;
    	//window.open(gourl,'_blank');
    	chrome.tabs.create({url: gourl});
  		

}





