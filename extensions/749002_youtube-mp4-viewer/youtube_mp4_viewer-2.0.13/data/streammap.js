var $ytmp4 = jQuery.noConflict(true);

var cipherVar = {
	f1:function(a,b){a.splice(0,b)},
	f2:function(a){a.reverse()},
	f3:function(a,b){var c=a[0];a[0]=a[b%a.length];a[b%a.length]=c}
};

var cipherFuncParts = new Array();

var cipherFunc = function(a) {
	if(typeof a != 'undefined') {
		for(var i=0; i<cipherFuncParts.length; i++) {
			var func = cipherFuncParts[i].func;
			var value = cipherFuncParts[i].value;

			if (func == 'f1') {
				cipherVar.f1(a, value);
			} else if (func == 'f2') {
				cipherVar.f2(a, value);
			} else if (func == 'f3') {
				cipherVar.f3(a, value);
			} else if (func == 'split') {
				a=a.split('');
			} else if (func == 'return') {
				return a.join('');
			}
		}
	}
	return '';
};

function checkPlayerBase() {
	var scripts = document.getElementsByTagName('script');
	for(i=0; i<scripts.length; i++){
		var scriptSrc = scripts[i].src;
		
		// check if base.js is available for the currently viewed YouTube player
		if (scriptSrc.indexOf('player') != -1 && scriptSrc.indexOf('base.js') != -1) {
			
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					var jsCode = this.responseText;  
					
					var found = jsCode.match(/set[(].*["]signature["],([$a-zA-Z0-9]*)[(].*[)][)][;]/i);

					// do alternative check to find signature call
					if (!found) {
						found = jsCode.match(/d[.]set[(]b,encodeURIComponent[(]([$a-zA-Z0-9]*)[(].*[)][)][;]/i);
					}
					
					if (found) {
						var cipherFuncName = found[1];
						
						cipherFuncName = cipherFuncName.replace('$', '[$]');
						
						var regExp = new RegExp('[^.]'+cipherFuncName+'=function[(](.*)[)][{](.*)[}][;]');

						found = jsCode.match(regExp);
						
						if (found) {
							var cipherFuncParam = found[1];	
							var cipherFuncCode = found[2];	
							
							found = cipherFuncCode.match(/[;]([a-zA-Z0-9]*)[.]/);
							
							if (found) {
								var cipherVarName = found[1];
								
								regExp = new RegExp('(var '+cipherVarName+'=(.|\n)*?[}][;])', 'm');

								found = jsCode.match(regExp);
								
								if (found) {
									var cipherVarCode = found[1];	
									
									regExp = new RegExp('([$a-zA-Z0-9]){2}[:]function[(](.*)[)][{](.*)[}]', 'mg');

									found = cipherVarCode.match(regExp);
									
									if (found) {
										var f1Name = found[0].substring(0, 2);
										var f1Mapping = 'f1';
										
										if (found[0].indexOf('splice') != -1) {
											f1Mapping = 'f1';
										} else if (found[0].indexOf('reverse') != -1) {
											f1Mapping = 'f2';
										} else if (found[0].indexOf('length') != -1) {
											f1Mapping = 'f3';
										}
										
										var f2Name = found[1].substring(0, 2);
										var f2Mapping = 'f2';
										
										if (found[1].indexOf('splice') != -1) {
											f2Mapping = 'f1';
										} else if (found[1].indexOf('reverse') != -1) {
											f2Mapping = 'f2';
										} else if (found[1].indexOf('length') != -1) {
											f2Mapping = 'f3';
										}
																				
										var f3Name = found[2].substring(0, 2);
										var f3Mapping = 'f3';
										
										if (found[2].indexOf('splice') != -1) {
											f3Mapping = 'f1';
										} else if (found[2].indexOf('reverse') != -1) {
											f3Mapping = 'f2';
										} else if (found[2].indexOf('length') != -1) {
											f3Mapping = 'f3';
										}
										
										cipherFuncParts = new Array();
										
										var parts = cipherFuncCode.split(';');
										
										for(j=0; j<parts.length; j++){
											var part = parts[j];
											
											if (part.indexOf(cipherVarName+'.'+f1Name) != -1) {
												cipherFuncParts.push({func:f1Mapping, value:part.split(',')[1].replace( /[^0-9]/g, '')});
											} else if (part.indexOf(cipherVarName+'.'+f2Name) != -1) {
												cipherFuncParts.push({func:f2Mapping, value:part.split(',')[1].replace( /[^0-9]/g, '')});
											} else if (part.indexOf(cipherVarName+'.'+f3Name) != -1) {
												cipherFuncParts.push({func:f3Mapping, value:part.split(',')[1].replace( /[^0-9]/g, '')});
											} else if (part.indexOf('split') != -1) {
												cipherFuncParts.push({func:'split'});
											} else if (part.indexOf('return') != -1) {
												cipherFuncParts.push({func:'return'});
											}
										}
										
										checkStreamMap();
									}
								}
							}
						}
					} else {
						// check stream map even if no cipher func is found
						checkStreamMap();
					}
				}
			};
			
			xhttp.open("GET", scriptSrc, true);
			xhttp.overrideMimeType('text/plain');
			xhttp.send();
		}
	}
}

var videos = new Array();

function checkStreamMap() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			var scriptCode = this.responseText;
			
			if (scriptCode.indexOf('url_encoded_fmt_stream_map') != -1) {
				videos = [];
				
				var spattern = '"url_encoded_fmt_stream_map":"';
						
				var spos = scriptCode.indexOf(spattern);
				
				if (spos != -1) {
					spos = spos+spattern.length;
					
					var epos = scriptCode.indexOf('",', spos);
					
					if (epos != -1) {
						var streamMapStr = scriptCode.substr(spos, epos-spos);
						
						var lines = streamMapStr.split(",");
						
						for(j=0; j<lines.length; j++) {
							var params = lines[j].split("\\u0026");
							
							var video = new Array();					
													
							var title = document.title.replace(' - YouTube', '').trim();
							
							if (typeof title == 'undefined') {
								title = 'Download';
							}
								
							video['title'] = title;
							
							for(k=0; k<params.length; k++) {
								
								var keyValues = params[k].split("=");
								if (keyValues.length == 2) {
									if (keyValues[0] == 'quality') {
										video['quality'] = keyValues[1];
									}
									
									if (keyValues[0] == 'type') {
										if (keyValues[1].indexOf('3gpp') != -1) {
											video['type'] = '3GPP';
										} else if (keyValues[1].indexOf('mp4') != -1) {
											video['type'] = 'MP4';
										} else if (keyValues[1].indexOf('webm') != -1) {
											video['type'] = 'WebM';
										}
									}
									
									if (keyValues[0] == 'url') {
										video['url'] = unescape(keyValues[1]);
									}
									
									if (keyValues[0] == 's') {
										video['s'] = keyValues[1];
									}
								}
							}
							
							if (typeof video['s'] != 'undefined') {
								var signature = cipherFunc(video['s']);
								video['url'] = video['url'] + '&sig=' + encodeURIComponent(signature);
							}
							
							if (video['type'] == 'MP4') {
								videos.push(video);
							}
						}
					}
				}
				
				checkDownloadButton();
			}
		}
	};
	
	xhttp.open("GET", location.href, true);
	xhttp.overrideMimeType('text/plain');
	xhttp.send();
}

function checkDownloadButton() {
	var button = $ytmp4('#youtube-download-button');
	
	if (!button.length) {
		setTimeout(checkDownloadButton, 2000);
	}
	
	browser.runtime.sendMessage({'action': 'getDOMChanges'});
}

checkPlayerBase();

function streammapHandleMessage(message) {
	if (message.action == 'applyDOMChanges') {
		if (message.type == 'change') {
			var element = $ytmp4(message.selector);
			if (element) {
				element.html(message.content);
			}
		} else if (message.type == 'append') {
			var element = $ytmp4(message.selector);
			var existing = $ytmp4('#'+message.content_id).length;
			if (element && !existing) {
				element.append(message.content);
			}
		} else if (message.type == 'remove') {
			var element = $ytmp4(message.selector);
			if (element) {
				element.remove();
			}
		}
	} else if (message.action == 'applyDOMActions') {
		var button = $ytmp4('#youtube-download-button');
		button.unbind('click');
		button.click(function(event) {
			var title = document.title.replace(' - YouTube', '').trim();
			
			$ytmp4('.ytmp4-ul li').slice(1).remove();
			
			for(var i=0; i<videos.length; i++) {
				var downloadItem = $ytmp4('#download-item-0');
				
				if (i > 0) {
					if (!$ytmp4('#download-item-'+i).length) {
						downloadItem = $ytmp4('#download-item-0').clone();
						downloadItem.attr('id', 'download-item-'+i);
						downloadItem.appendTo($ytmp4('#download-item-0').parent());
					}
				}
				
				var downloadButton = $ytmp4('#download-item-'+i+' button');
				var downloadTitle = $ytmp4('#download-item-'+i+' button span');
							
				downloadButton.attr('download-url', videos[i]['url']);
				downloadTitle.text('Download ' + videos[i]['type'] + ' [' + videos[i]['quality'] +  ']');
				
				downloadButton.off();
				
				downloadButton.unbind('click');
				downloadButton.click(function(event) {
					browser.runtime.sendMessage({'action': 'doDownload', 'url': $ytmp4(this).attr('download-url')});
				});
			}
			
			var buttonOffset = $ytmp4('#youtube-download-button').offset();
			var panelTop = buttonOffset.top + $ytmp4('#youtube-download-button').height();
			var panelLeft = buttonOffset.left;
			
			$ytmp4('#youtube-download-panel').css({top: panelTop, left: panelLeft});
			$ytmp4('#youtube-download-panel').toggle();
		});
		
		$ytmp4(document).click(function(event) {
			if (event.target.getAttribute('id') != 'youtube-download-button') {
				$ytmp4('#youtube-download-panel').hide();
			}
		});
	}
}

browser.runtime.onMessage.addListener(streammapHandleMessage);

function scrollToDownloadPanel() {
	if ($ytmp4('#youtube-download-button').length) {
		$ytmp4('#youtube-download-button').click();
		$ytmp4('html, body').animate({
			scrollTop: $ytmp4("#youtube-download-button").offset().top-50
		}, 1000);
	} else {
		setTimeout(function() { scrollToDownloadPanel(); }, 1000);
	}
}

$ytmp4(document).ready(function() {
    if (location.href.indexOf('feature=ytmp4') != -1) {
		scrollToDownloadPanel();
	}
});

var oldUrl = location.href;

function checkReload() {
	if (oldUrl != location.href) {
		videos = [];
		$ytmp4('#youtube-download-button').remove();
		checkPlayerBase();
		oldUrl = location.href;
	}
}

// create an observer instance
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		checkReload();
	});
});
 
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };
 
// pass in the target node, as well as the observer options
observer.observe(document.body, config);

