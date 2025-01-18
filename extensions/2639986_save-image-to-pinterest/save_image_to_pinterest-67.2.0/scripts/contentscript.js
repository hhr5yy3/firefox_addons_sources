var PinterestPinButton={
	pinImage:function(imgSrc,doc,alt,gContextMenu,window){
		var document=window.document;
		var screen=window.screen;	
		var width=775;
		var height=562;
		var left = (screen.width/2)-(width/2);
		var top = (screen.height/2)-(height/2);		  
		var docURL = doc.location.href;
        chrome.runtime.sendMessage({'openurl': "http://www.pinterest.com/pin/create/bookmarklet/?media="+encodeURIComponent(imgSrc)+"&url="+encodeURIComponent(docURL)+(alt ? ("&description="+encodeURIComponent(alt)) : ("&description="+doc.location.href))}, function(response) {}); 
    
	},
	openPanel:function(){
		var doc=document;
		if(doc.getElementById("ppb_panel")){
			doc.body.classList.remove("ppb_overflow_hidden");
			doc.getElementById("ppb_panel").parentNode.removeChild(doc.getElementById("ppb_panel"));
			return;
		}
		var paddingLeft=(doc.body.clientWidth%261)/2;
		doc.body.classList.add("ppb_overflow_hidden");
		var div=doc.createElement("div");
		div.setAttribute("id","ppb_panel");
		div.style.setProperty("padding-left",paddingLeft+"px", "important");
		div.addEventListener("click",function(event){
			if(event.target==event.currentTarget) {
				this.ownerDocument.body.classList.remove("ppb_overflow_hidden");
				this.parentNode.removeChild(this);
			}
		},false);
		var images=doc.getElementsByTagName("img");
		var noDuplicates=[];
		var imageSrcArray=[];
		for(var i=0; i< images.length; i++) {			
			if(imageSrcArray.length==0) {
				imageSrcArray.push(images[i].src);
				noDuplicates.push(images[i]);
			}
			else if(imageSrcArray.indexOf(images[i].src)==-1) {
				imageSrcArray.push(images[i].src);
				noDuplicates.push(images[i]);
			}
		}
		var imageArray=noDuplicates;
		var imagedimensions = [];
		for(var i=0; i< imageArray.length; i++) {
			imagedimensions.push([imageArray[i].naturalWidth, imageArray[i].naturalHeight, imageArray[i]]);
		}
		imagedimensions.sort(function (a, b) {
			if (b[0] - a[0] === 0) return b[1] - a[1];
			return b[0] - a[0];     
		});
		for(var i=0;i<imagedimensions.length;i++){
			var img=imagedimensions[i][2].cloneNode(true);
			var thumbdiv=doc.createElement("div");
			thumbdiv.setAttribute("class","ppb_thumb_image");
			thumbdiv.setAttribute("imgsrc",imagedimensions[i][2].src);
			thumbdiv.setAttribute("imgalt",imagedimensions[i][2].alt);			
			thumbdiv.setAttribute("imgdims",imagedimensions[i][2].naturalWidth+"x"+imagedimensions[i][2].naturalHeight);
			thumbdiv.style.setProperty("background-image","url('"+img.src+"')", "important");
			thumbdiv.addEventListener("click",function(event){
				var chromeWin=event.currentTarget.ownerDocument.defaultView;
				var imgSrc=event.currentTarget.getAttribute("imgsrc");
				var doc=event.currentTarget.ownerDocument;
				var alt=event.currentTarget.getAttribute("imgalt");
				PinterestPinButton.pinImage(imgSrc,doc,alt,null,chromeWin);
			},false);			
			div.appendChild(thumbdiv);
		}
		doc.documentElement.appendChild(div);		
	}	
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == 'share_button_for_pinterest_open_panel_request') {
		try{
			PinterestPinButton.openPanel();
		}catch(e){
			alert(e);
		}
	}
	if (request.action == 'share_button_for_pinterest_request_pin_image') {
		try{
			var chromeWin=window;
			var imgSrc=request.setup.srcUrl;
			var doc=document;
			var alt=request.setup.alt;
			PinterestPinButton.pinImage(imgSrc,doc,alt,null,chromeWin);			
		}
		catch(e){
			alert(e);
		}
	}	
});