var colorInputOpts={};
var lastColorInputField = null;
var colorInputsHaveRun = false;

function loadColorInputPrefs(cbf){
	// we can't import options_prefs as it may be added twice.. we really only need to parse one option here
	var defaults = {
		supportColorInputs: (navigator.platform.substr(0,3).toLowerCase()=='mac'?'false':'true')
	}
	var storage = chrome.storage.local;
	storage.get(defaults, function(obj) {
		if(chrome.runtime.lastError)console.log(chrome.runtime.lastError.message);
		obj = obj || {};
		for( var prop in defaults ){
			if( obj[prop] && obj[prop] !== 'false' ){
				colorInputOpts[prop] = true;
			}else{
				colorInputOpts[prop] = false;
			}
		}
		if(typeof(cbf)=='function')cbf();
	});
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// this listener is maybe duplicate in teh tab space... so lets not respond to most messages here.... (at least not by default)
	//console.log('we got a message in color-input... ', request);
	if( request.disableColorPicker ){
		// lets reset our input field, not tracking anythign now....
		lastColorInputField = null;

		// we can scan for more fields, no harm in it AFAIK....
		beginColorInputProcessing();

	}else if(request.hexValueWasSelected && lastColorInputField){
		lastColorInputField.value = '#'+request.hexValueWasSelected;
		lastColorInputField.dispatchEvent(new Event('change', {'bubbles':true}));
		lastColorInputField = null;
		chrome.runtime.sendMessage({disableColorPicker:true},function(r){});
		sendResponse({result:true});
	}

	//sendResponse({result:true});
});


function getClickListenerForColorInput(inputColor){
	return function(ev){
		var targ = ev.target;
		lastColorInputField = inputColor;
		try{
			chrome.runtime.sendMessage({activateForInput:true}, function(response){});
		}catch(e){
			alert("Sorry - the page must be reloaded for ColorPick extension to work. This can occcur when the extension updates or is reloaded. " + e);
			targ.remove();
			removeColorPickInputTriggers(document);
		}
	}
}

function removeColorPickInputTriggers(context){
	var triggers = context.querySelectorAll('.colorpick-eyedropper-input-trigger');
	if( triggers && triggers.length ){
		for( var t=0; t<triggers.length; t++ ){
			triggers[t].remove();
		}
	}
}

function beginColorInputProcessing(){

	// we'll call this mulitple times... it should be able to both activate AND de-activate our features on any field....

	loadColorInputPrefs(function(){

		// first check our prefs and see.... also some delay won't hurt if dynamic dom is being processed....

		if( !colorInputsHaveRun && !colorInputOpts.supportColorInputs ){
			colorInputsHaveRun=true;// next time we'll still run... but only after ext is triggered, otherwise lets save some CPUs
			return;
		}

		var colorInputs = document.querySelectorAll('input[type=color]');
		if( !colorInputs || !colorInputs.length ) return;

		var toolTipMessage=chrome.i18n.getMessage('selectWithExt')+' - '+chrome.i18n.getMessage('seeAdvOption')+': "'+chrome.i18n.getMessage('supportColorInputs')+'"';

		for( var i=0,l=colorInputs.length; i<l; i++ ){

			if( colorInputs[i].getAttribute('colorpick-skip') ){
				continue;
			}

			if( colorInputs[i].getAttribute('colorpick-eyedropper-active') ){

				if( !colorInputOpts.supportColorInputs ){
					// de-activate time....
					removeColorPickInputTriggers(colorInputs[i].parentNode);
					colorInputs[i].removeAttribute('colorpick-eyedropper-active')
				}

				continue;
			}

			if( !colorInputOpts.supportColorInputs ) continue;

			var modeAfter = colorInputs[i].getAttribute('colorpick-after');

			var btn = Cr.elm('img',{
				style:'min-width:16px;min-height:16px;box-sizing:unset;box-shadow:none;background:unset;padding:'+(modeAfter?'0 0 0 6px':'0 6px 0 0')+';cursor:pointer;',
				src:chrome.runtime.getURL('img/icon16.png'),
				title:toolTipMessage,
				class:'colorpick-eyedropper-input-trigger',
				event:['click',getClickListenerForColorInput(colorInputs[i]),true]
			});

			if( modeAfter ){
				Cr.insertNode(btn, colorInputs[i].parentNode, colorInputs[i].nextSibling);
			}else{
				Cr.insertNode(btn, colorInputs[i].parentNode, colorInputs[i]);
			}

			colorInputs[i].setAttribute('colorpick-eyedropper-active', true);
		}

		colorInputsHaveRun=true;

	});

}

beginColorInputProcessing();
