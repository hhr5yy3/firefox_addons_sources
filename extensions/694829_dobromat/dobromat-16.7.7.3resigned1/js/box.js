

	
	var box = { wrapId : "#dobromat-extension-iframe-wrap" };	


	var domMessage = function(msg) {
		if (!msg.data || !msg.data.action) return;

		console.log("box.js / domMessage");
		console.log(msg);

		if (msg.data.action == "loaded") {
			
			box.msg.action = "fill";
			box.iframe[0].contentWindow.postMessage( box.msg, "*" );

		} else if (msg.data.action == "filled") {

			window.setTimeout( function() { $(box.wrapId).fadeIn(); }, 500 );

		} else if (msg.data.action == "close") {

			$(box.wrapId).fadeOut();
			
		} else if (msg.data.action == "sendMessage") {
			//because iframe can't access chrome object in ff 45
			console.log("box.js / sending message to background: ");			
			
			var tmp = $.extend(true, {}, msg.data.message);
			console.log(tmp);		

			chrome.runtime.sendMessage(tmp);					
		}
	};
	
	var createBox = function(msg) {
		
		console.log("creating box");

		box.msg = msg;
		var wrap = $(box.wrapId);

		if (wrap.length) {
			
			if (msg.force) {
				wrap.fadeIn();
			}

		} else {		

			var url = chrome.extension.getURL("/box/box.html");
			var iframeUrl =  chrome.extension.getURL("/box/iframe.html");

			/*
			there is probably a bug in the api and this calls can't get html

			A promise chain failed to handle a rejection. Did you forget to '.catch', or did you forget to 'return'?
			See https://developer.mozilla.org/Mozilla/JavaScript_code_modules/Promise.jsm/Promise

			Date: Tue Mar 29 2016 17:58:11 GMT+0200 (Central Europe Standard Time)
			Full Message: TypeError: this._addon is null
			Full Stack: BrowserAddonActor.prototype.id@resource://gre/modules/commonjs/toolkit/loader.js -> resource://devtools/server/actors/addon.js:50:5
			....
			*/

			/*
			$.get(url, function(html) {																
				$('body').append(html);
				box.iframe = $(box.wrapId + " > iframe").attr("src", iframeUrl);											
			});
			*/

			//hack this bug
			$('body').append('<div id="dobromat-extension-iframe-wrap" '
				+'style="position: fixed; right: 20px;	top: 40px;	width: 50%;	min-width: 400px; max-width: 700px;	height: 400px; '
				+'border: none;	background: transparent; display: none;	z-index: 9999999; padding: 0; margin: 0;">'
				+ '<iframe src="" border="0" width="100%" height="100%" style="margin:0; padding:0; border:none" scrolling="no"/></div>'
			);

			box.iframe = $(box.wrapId + " > iframe").attr("src", iframeUrl);
					
		}

	};


	var bgMessage = function(msg, _, _) {

		console.log("received bg message");
		console.log(msg);
		
		if (msg.action == "show") {

			createBox(msg);

		} else if (msg.action == "goShopping") {
			
			if (msg.redirect) {
				window.location.href = msg.redirect;
			} else {
				box.iframe[0].contentWindow.postMessage( { action: "goShoppingCallback", response: false}, "*" );
			}

		}
	};


	//message from iframe
	window.addEventListener("message", domMessage);
	
	//message from background page
	chrome.runtime.onMessage.addListener(bgMessage);
