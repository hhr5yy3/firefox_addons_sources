/**
 * Default FBrowserInjectChrome ctor.
 * Creates instance of FBrowserInjectChrome class that contains ALL Chrome browser-specific implementation  
 *         of the core browser functionality required for the rest of the code.
 *
 * @param {String} siteDomain The domain name of the site.
 */



function FBrowserInjectChrome() {
	this.initFBrowserInjectChrome();
}
	
FBrowserInjectChrome.prototype = FExtension.extend(FBrowserInject.prototype, FBrowserInjectChrome);

FBrowserInjectChrome.prototype.inlinerPort = null;

FBrowserInjectChrome.prototype.getBrowserName = function(){
    return 'firefox';
}

FBrowserInjectChrome.prototype.inlinerPortListener = function(callback) {
//	this.inlinerPort = browser.extension.connect({name: "iminliner"});
	this.inlinerPort = browser.runtime.connect({name: "iminliner"});
	this.inlinerPort.onMessage.addListener(callback);
}

FBrowserInjectChrome.prototype.inlinerPostMessage = function(data) {
	this.inlinerPort.postMessage(data);
}

FBrowserInjectChrome.prototype.stopInlinerPort = function(port, callback) {
	if (typeof this.inlinerPort != "undefined" && this.inlinerPort != null) {
		this.inlinerPort.disconnect();
	}
}

FBrowserInjectChrome.prototype.initFBrowserInjectChrome = function() {
	// Call parent class implementation first
	this.initFBrowserInject();
}

FBrowserInjectChrome.prototype.isLocalStoragePreset = function() {
	return true;
};

FBrowserInjectChrome.prototype.openNewTab = function(url) {
	browser.tabs.create({"url": url});
}

FBrowserInjectChrome.prototype.runtimeSendMessage = function(msg, callback) {
	browser.runtime.sendMessage(msg, callback);
}

FBrowserInjectChrome.prototype.extensionSendMessage = function(msg, callback) {
	browser.runtime.sendMessage(msg, callback);
}

FBrowserInjectChrome.prototype.setEvent = function(e) {
}

FBrowserInjectChrome.prototype.getDocument = function() {
    try{
        var text = document.getSelection().toString();
        if (text == "") {
            if(self.frames.length > 0){
                var selectedTexts = [];
                Array.prototype.forEach.call(window.frames, function(frameWin) {
                    selectedTexts.push( frameWin.getSelection().toString() );
                });
                for(var i = 0; i < self.frames.length; i++){
                    if(self.frames[i].getSelection){
                        text = self.frames[i].getSelection() + "";
                        if(text != ""){
                            return self.frames[i].document;
                        }
                    }
                }
            }
        }
        return document;
    }catch(e){
        return document;
    }
}

FBrowserInjectChrome.prototype.getDocuments = function() {
    var docs = [];
    docs.push(document);
    //var browser = gBrowser.getBrowserAtIndex(gBrowser.mTabContainer.selectedIndex);
    //var doc= browser.docShell.document;
    try{
        if(window.frames.length > 0){
            for(var i = 0; i < window.frames.length; i++){
                docs.push(window.frames[i].document);
            }
        }
        return docs;
    }catch(e){
        return docs;
    }
}

FBrowserInjectChrome.prototype.getSelectionText = function() {
    try{
      if(window){
        var text = window.getSelection().toString();
        if (text == "") {
            var selectedTexts = [];
            Array.prototype.forEach.call(window.frames, function(frameWin) {
                selectedTexts.push( frameWin.getSelection().toString() );
            });
            if(self.frames.length > 0){
                for(var i = 0; i < self.frames.length; i++){
                    text = self.frames[i].getSelection() + "";
                    if(text != ""){
                        break;
                    }
                }
            }
        }
        return text;
      }
    }catch(e){
        return text;
    }
}

FBrowserInjectChrome.prototype.getSelection = function(doc) {
    try{
        var text = doc.getSelection().toString();
        if (text == "") {
            if(self.frames.length > 0){
                var selectedTexts = [];
                Array.prototype.forEach.call(window.frames, function(frameWin) {
                    selectedTexts.push( frameWin.getSelection().toString() );
                });
                for(var i = 0; i < self.frames.length; i++){
                    if(self.frames[i].getSelection){
                        text = self.frames[i].getSelection() + "";
                        if(text != ""){
                            return self.frames[i].getSelection();
                        }
                    }
                }
            }
        }
        selection = doc.getSelection();
    }catch(e){
        selection = doc.getSelection();
    }
    return selection;
}

FBrowserInjectChrome.prototype.setStyle = function(){}

FBrowserInjectChrome.prototype.getURL = function(filePath, opt) {
	if(typeof opt == "undefined"){
		return browser.runtime.getURL(filePath);
	}
	if(opt){
		return browser.runtime.getURL("content/html/options/" + filePath);
	}else{
		return browser.runtime.getURL("content/html/options/" + filePath);
	}
	//return browser.extension.getURL(filePath);
}

/*
FBrowserInjectChrome.prototype.extensionSendRequest = function(data, callback) {
	browser.runtime.sendRequest(data, callback);
}

FBrowserInjectChrome.prototype.addOnRequestListener = function(onRequestListener) {
	browser.runtime.onRequest.addListener(onRequestListener);
}
*/
FBrowserInjectChrome.prototype.addOnMessageListener = function(onMessageListener) {
	browser.runtime.onMessage.addListener(onMessageListener);
}

FBrowserInjectChrome.prototype.modifySentence__ = function (selection, doc, replace) {

    var sentence = "", sent = "";
    if (doc.arraySentence && doc.arraySentence.length > 0) {
        sentence = doc.arraySentence[0];
        sent = sentence;
        sentence = escape(sentence.toLowerCase().trim()).replace(/%A0%3A/g, '%20%3A').replace(/%20%0D%0A%20/g, '%20');
    }
    var originalRange = selection.getRangeAt(0).cloneRange();
    FExtension.browserInject.refreshSelection(selection, originalRange);

    var sel = escape(selection.toString().replace(/[^\S\r\n]+/g, ' ').trim());
    
    var sel1 = sel.replace(/%0A%20/g, '%0A%A0');
    var i = 0;

    while (sel != sentence && sel1 != sentence) {// || sentence.length <= selection.toString().replace(/[^\S\r\n]+/g, ' ').trim().length + 2) {//sentence.length >= selection.toString().length &&

        i = sel == "" ? i + 1 : 0;
        selection.modify('extend', 'forward', 'character');
        sel = escape(selection.toString().toLowerCase().replace(/[^\S\r\n]+/g, ' ').trim());
        sel1 = sel.replace(/%0A%20/g, '%0A%A0');
        if (i > 100) {
            this.getNextNodeByParent(selection);
            //return;
        }
        if (sel.length > sentence.length + 100) {
            selection.collapseToStart();
            return;
        }      
    }


    if(replace){
//        if(sel.length <= googleText.length && googleText.indexOf(sel) > -1){
  //          googleText = googleText.replace(sel, "");
    //    }else{
            var originalRange = selection.getRangeAt(0).cloneRange();

            selection.collapseToStart();
            selection.modify('extend', 'forward', 'character');
            sel = selection.toString();
            while(googleText.indexOf(sel) > -1){
                selection.modify('extend', 'forward', 'character');
                sel = selection.toString();
                console.log(sel);
            }
            selection.modify('extend', 'backward', 'character');
            googleText = "";
      //  }
    }


    return sel;
}

FBrowserInjectChrome.prototype.modifySentence = function(selection, doc, replace) {
    var sentence = "", sent = "";
    if (doc.arraySentence && doc.arraySentence.length > 0) {
        sentence = doc.arraySentence[0];
        sent = sentence;
        sentence = escape(sentence.toLowerCase().trim()).replace(/%A0%3A/g, '%20%3A').replace(/%20%0D%0A%20/g, '%20');
    }

    var originalRange = selection.getRangeAt(0).cloneRange();
    FExtension.browserInject.refreshSelection(selection, originalRange);
    var sel = escape(selection.toString().replace(/[^\S\r\n]+/g, ' ').trim());
    var sel1 = sel.replace(/%0A%20/g, '%0A%A0');
    var i = 0;
    
    while (sel != sentence && sel1 != sentence) {// || sentence.length <= selection.toString().replace(/[^\S\r\n]+/g, ' ').trim().length + 2) {//sentence.length >= selection.toString().length &&
        i = sel == "" ? i + 1 : 0;
        selection.modify('extend', 'forward', 'character');
        sel = escape(selection.toString().toLowerCase().replace(/[^\S\r\n]+/g, ' ').trim());
        sel1 = sel.replace(/%0A%20/g, '%0A%A0');
        if (i > 100) {
            this.getNextNodeByParent(selection);
            //return;
        }
        if (sel.length > sentence.length + 100) {
            selection.collapseToStart();
            return;
        }
    }
    return sel;
}

FBrowserInjectChrome.prototype.modifySentence__ = function (selection, doc, replace) {
    var sentence = "", sent = "";
    if (doc.arraySentence && doc.arraySentence.length > 0) {
        sentence = doc.arraySentence[0];
        sent = sentence;
        sentence = escape(sentence.toLowerCase().trim()).replace(/%A0%3A/g, '%20%3A').replace(/%20%0D%0A%20/g, '%20');
    }
    var originalRange = selection.getRangeAt(0).cloneRange();
    FExtension.browserInject.refreshSelection(selection, originalRange);

    var sel = escape(selection.toString().replace(/[^\S\r\n]+/g, ' ').trim());
    
    var sel1 = sel.replace(/%0A%20/g, '%0A%A0');
    var i = 0;



    while (sel != sentence && sel1 != sentence) {// || sentence.length <= selection.toString().replace(/[^\S\r\n]+/g, ' ').trim().length + 2) {//sentence.length >= selection.toString().length &&

        i = sel == "" ? i + 1 : 0;
        selection.modify('extend', 'forward', 'character');
        sel = escape(selection.toString().toLowerCase().replace(/[^\S\r\n]+/g, ' ').trim());
        sel1 = sel.replace(/%0A%20/g, '%0A%A0');
        if (i > 100) {
            this.getNextNodeByParent(selection);
            //return;
        }

        if (sel.length > (sentence.length + 100)) {

//           sel = FBrowserInjectChrome.prototype.BACKWARD(selection,sel,doc, replace);
		this.getNextNodeByParent(selection);
           sel.collapseToStart();
//		FBrowserInjectChrome.prototype.modifySentence(LS_SEL, doc, replace);
		
           return;
        }      
    }
                
    return sel;
}



FBrowserInjectChrome.prototype.BACKWARD = function(selection, sel, doc, replace) {
            var originalRange = selection.getRangeAt(0).cloneRange();
            selection.collapseToStart();
            selection.modify('extend', 'forward', 'character');
            sel = selection.toString();

            while(googleText.indexOf(sel) > -1){
                selection.modify('extend', 'forward', 'character');
                sel = selection.toString();

                if(sel.length>1){
			LS_SEL=sel;
	                this.getNextNodeByParent(selection);
		}
            }

            selection.modify('extend', 'backward', 'character');
            googleText = "";
            return (sel);
}

FBrowserInjectChrome.prototype.refreshSelection = function(selection, originalRange) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
}

FBrowserInjectChrome.prototype.getSentence = function(doc, selection){

    if (doc.arraySentence && doc.arraySentence.length > 0) {
        sentence = doc.arraySentence[0];
        if (doc.arraySentence.length > 0 && (sentence == "" || sentence == "\r" || sentence == "\n" || sentence == " \r")) {
            while (doc.arraySentence.length > 0 && (sentence == "" || sentence == "\r" || sentence == "\n" || sentence == " \r")) {
                doc.arraySentence.splice(0, 1);
                var text = selection.focusNode.textContent;
                if (!inlinerInjectBefore && text[0] == "" && text[0] == "\r" && text[0] == "\r" && text[0] == " \r") {
                    for (var i = 0; i < sentence.length; i++) {
                        selection.modify('move', 'forward', 'character');
                    }
                }
                if (doc.arraySentence.length == 0) {
                    sentence = "";
                    break;
                }
                sentence = doc.arraySentence[0];
            }
        }
        return escape(sentence.trim().toLowerCase()).replace(/%A0%3A/g, '%20%3A').replace(/%20%0D%0A%20/g, '%20');
    }
    return "";

}


FBrowserInjectChrome.prototype.getNextNodeByParent = function (selection) {
//if(selection=="") seletion = LS_SEL;
    var parent = selection.focusNode.parentElement;
    //if(parent && (parent.style.display == "none" || parent.className == "im-inliner-orig-text")){
    while (parent) {
        if (parent && (parent.style.display == "none" || parent.className == "im-inliner-orig-text")) {
            var is_none = parent.style.display == "none";
            if (is_none) {
                parent.style.display = "";
            }
            var old_parent = parent;
            var node = selection.focusNode;
            while (node == selection.focusNode) {
                selection.modify('move', 'forward', 'character');
                parent = selection.focusNode.parentElement;
            }
            if (is_none) {
                old_parent.style.display = "none";
                is_none = false;
            }
        }
        parent = parent.parentElement;
    }
}


FBrowserInjectChrome.prototype.getNextNode = function (doc) {
    var selection = FExtension.browserInject.getSelection(doc);
    if (inlinerInjectHideTranslation=="true" && inlinerInjectBefore=="true" && doc.currentSentence
        || !doc.currentSentence && selection.focusNode && selection.focusNode.parentElement && selection.focusNode.parentElement.style.display == "none") {
        /*for(var i = 0; i < doc.currentSentence.length; i++){
         selection.modify('move', 'forward', 'character');
         }*/
        var node = selection.focusNode;
        while (node == selection.focusNode) {
            selection.modify('move', 'forward', 'character');
        }
        FExtension.browserInject.getNextNodeByParent(selection);
        /*if(selection.focusNode.parentElement &&
         (selection.focusNode.parentElement.style.display == "none"
         || selection.focusNode.parentElement.className == "im-inliner-orig-text")){
         var node = selection.focusNode;
         while(node == selection.focusNode){
         selection.modify('move', 'forward', 'character');
         }
         }*/
        doc.currentSentence = null;
    }
}



FExtension.browserInject = new FBrowserInjectChrome();
FExtension.browser = FExtension.browserInject;