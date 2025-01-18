// Team Password Manager Browser Extension content script
// (c) 2016-2020 Ferran Barba

// Login fields and form
var loginFields = null;
var loginForm = null;	// To handle the submit event

// Both need to be true for the password saver to activate
var askToSave = true; // Will ask to save the password (set to false if a password is being used)
var offerToSave = true; // Will offer to save the password (user setting from popup)

// The extension is connected and ready to work (true). false if not connected.
var canWork = false;

var selectorOpened = false;
var selectorLoaded = false;
var selectorOpenedError = false;

// tpm lock icon for input box (img/small_lock.png)
var tpmLockIcon = "data:image/png;base64,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"; 

// tpm lock icon for password box (img/small_lock_pwd.png)
var tpmLockIconPwd = "data:image/png;base64,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";

// wait.gif
var tpmHourglass = "data:image/gif;base64,R0lGODlhEAAQAPQAAP///ypdsPj6/FiAwZiw2C9gsUl1u9zk8bbH4zxqtoyn1H+dz+jt9qi93s/a7GaKxnGTygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAAKAAEALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkEAAoAAgAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkEAAoAAwAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAAKAAQALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAAKAAUALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==";

// Observer for newly created login forms
var observer = null;

function elementIsHidden ( el ) {
	return (el.offsetParent === null);
} 

// Returns [username/email, password] fields if the form has them or null if not
function tpmGetLoginFieldsForm ( form ) {
	var usernameEmailField = null;
	var passwordField = null;

	// First the password field
	// Loop through the elements of the form and put the password(s) in an array
	var formPasswords = [];
	for (var i=0; i < form.elements.length; i++ ) {

		// PREVIOUS
		/*if (form.elements[i].type != "password") {
			continue;
		}
		formPasswords[formPasswords.length] = { idx: i, fld: form.elements[i]};*/

		// Possible cases for password
		// type=password
		// autocomplete=new-password or current-password
		// Must be visible
		if (form.elements[i].type == "password" || form.elements[i].autocomplete == "new-password" || form.elements[i].autocomplete == "current-password") {
			// Is it visible?
			if ( !elementIsHidden(form.elements[i]) ) {
				formPasswords[formPasswords.length] = { idx: i, fld: form.elements[i]};
			}
		}

	}

	// If there's only one password we return it, otherwise null
	if ( formPasswords.length == 1 ) {
		passwordField = formPasswords[0].fld;

		// Now the username/email
		// To get it search backwards from the passwordField, 
		// assuming the first text field is the username/email
		for ( var i = formPasswords[0].idx - 1; i >= 0; i-- ) {
            if ( form.elements[i].type == "text" || form.elements[i].type == "email" ) {
                usernameEmailField = form.elements[i];
                break;
            }
        }

        // If we have a username/mail field, we return it and the password field, otherwise null
        if ( usernameEmailField ) {
        	return [usernameEmailField, passwordField];
        } else {
        	return null;
        }
	} else {
		return null;
	}
} // tpmGetLoginFieldsForm()

// Returns [username/email, password] fields if a pair of username/password fields are found in the document
// To be called if tpmGetLoginFieldsForm() doesn't return any, as some pages do not have <form>
function tpmGetLoginFieldsNoForm ( ) {
	var usernameEmailField = null;
	var passwordField = null;

	var inputs = document.body.getElementsByTagName('input')

	// First the password field
	// Loop through the elements of the form and put the password(s) in an array
	var docPasswords = [];
	for (var i=0; i < inputs.length; i++ ) {
		/*console.log("inputs[i].type: " + inputs[i].type);
		if (inputs[i].type != "password") {
			continue;
		}
		docPasswords[docPasswords.length] = { idx: i, fld: inputs[i]};
		*/

		if (inputs[i].type == "password" || inputs[i].autocomplete == "new-password" || inputs[i].autocomplete == "current-password") {
			// Is it visible?
			if ( !elementIsHidden(inputs[i]) ) {
				docPasswords[docPasswords.length] = { idx: i, fld: inputs[i]};
				break;
			}
		}
	}

	// If there's only one password we return it, otherwise null
	if ( docPasswords.length == 1 ) {
		passwordField = docPasswords[0].fld;

		// Now the username/email
		// To get it search backwards from the passwordField, 
		// assuming the first text field is the username/email
		for ( var i = docPasswords[0].idx - 1; i >= 0; i-- ) {
            if ( inputs[i].type == "text" || inputs[i].type == "email" ) {
                usernameEmailField = inputs[i];
                break;
            }
        }

        // If we have a username/mail field, we return it and the password field, otherwise null
        if ( usernameEmailField ) {
        	return [usernameEmailField, passwordField];
        } else {
        	return null;
        }
	} else {
		return null;
	}
} // tpmGetLoginFieldsNoForm()

// Iterates the forms of the page and 
// returns [username/email, password, form] fields for the first form that has them
// Returns null if no forms have any
function tpmGetLoginFields ( ) {
	var ret = null;
	var pageForms = document.forms;

	// Loop through each form
	for ( var idxf=0; idxf < pageForms.length; idxf++ ) {
		var form = pageForms[idxf];
		ret = tpmGetLoginFieldsForm(form);
		if ( ret ) {
			// Insert the form into the array of fields
			ret.push(form); 
			break;
		}
	}

	// Login fields without form
	if ( !ret ) {
		ret = tpmGetLoginFieldsNoForm();
		if ( ret ) {
			ret.push(null);
		}
	}

	return ret;
} // tpmGetLoginFields()

/* PREVIOUS FUNCTION
function tpmGetLoginFields() {
    var fieldPairs = [],
        pswd = (function(){
            var inputs = document.getElementsByTagName('input'),
                len = inputs.length,
                ret = [];
            while (len--) {
                if (inputs[len].type === 'password') {
                    ret[ret.length] = inputs[len];
                }
            }
            return ret;
        })(),
        pswdLength = pswd.length,
		parentForm = function(elem) {
		    while (elem.parentNode) {
		        if(elem.parentNode.nodeName.toLowerCase() === 'form') {
		            return elem.parentNode;
		        }
		        elem = elem.parentNode;
		    }
		};
    while (pswdLength--) {
        var curPswdField = pswd[pswdLength],
            parentForm1 = parentForm(curPswdField),
            curField = curPswdField;

        if (parentForm1) {
            var inputs = parentForm1.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i] !== curPswdField && (inputs[i].type === 'text' || inputs[i].type === 'email')) {
                    fieldPairs[fieldPairs.length] = [inputs[i], curPswdField];
                    break;
                }
            }
        }
    }
    return fieldPairs;
}
*/

/* NOT USED ANYMORE
function getParentForm ( elem ) {
	while (elem.parentNode) {
        if(elem.parentNode.nodeName.toLowerCase() === 'form') {
            return elem.parentNode;
        }
        elem = elem.parentNode;
    }
    return null;
}
*/

// Proxy to possibleSearchUrls()
function tpmSiteUrl ( ) {
	//Previously: return document.domain;

	return possibleSearchUrls(document.domain);
}

// Checks if the string is a IPv4
// Does it by splitting by ., checking if it has 4 segments and checking if each segment is between 0 and 255
function isIPv4 ( str ) {
	var ret = false;

	var arr_str = str.split(".");

	if ( arr_str.length != 4 ) {
		ret = false;
	} else {
		ret = true; // default
		var i;
		for (i = 0; i < 4; i++) {
			if (  ! (arr_str[i] >= 0 && arr_str[i] <= 255) ) {
				ret = false;
				break;
			} 
		}
	}

	return ret;
} // isIPv4()

// Returns an array with two possible values:
// 	1. document_domain_str if the string has no dots (eg. localhost) or is an IPv4 address
//  2. domain and subdomain. First the domain.
// Examples: 
// 	1.2.3.4 => ['1.2.3.4']
// 	localhost => ['localhost']
//	::1 => ['::1']
// 	mail.test.co.uk => ['test.co.uk', 'mail.test.co.uk']
// 	test.com => ['test.com']
// For local domains:
//  test.local => ['test.local']
//  mail.test.local => ['test.local', 'mail.test.local']
function possibleSearchUrls ( document_domain_str ) {
	var arrUrls = [];

	// Check if it has dots
	if ( document_domain_str.indexOf(".") > -1 ) {
		// Check if it's an IPv4 address
		if ( isIPv4(document_domain_str) ) {
			arrUrls.push(document_domain_str);
		} else {
			// Domain and subdomain
			// Get the domain
			// T#614 correction for urls like tsep.localhost
			// For local domains psl doesn't work (returns null for the domain and subdomain)
			// In this case (local domains), we separate the domain from the subdomain manually
			var parsed = psl.parse(document_domain_str);
			var parsed_domain = parsed.domain
			if ( parsed_domain ) {
				// Normal domains, eg. test.com
				arrUrls.push(parsed_domain);
				if ( parsed_domain!=document_domain_str) {
					// Push the string
					arrUrls.push(document_domain_str);
				}
			} else {
				// "Local domains", eg. test.local
				// Get the domain (eg. subdomain.test.local => test.local)
				arr = document_domain_str.split(".");
				parsed_domain = arr[arr.length-2] + '.' + arr[arr.length-1];
				arrUrls.push(parsed_domain);
				if ( parsed_domain!=document_domain_str) {
					// Push the string
					arrUrls.push(document_domain_str);
				}
			}
		}
	} else {
		// No dots
		arrUrls.push(document_domain_str);
	}

	return arrUrls;
} // possibleSearchUrls()


// https://stackoverflow.com/questions/39301819/how-to-change-the-html-content-as-its-loading-on-the-page/39334319#39334319
function onMutation ( mutations ) {
  	// Check if we have a login form and fields in the current DOM
	loginFields = tpmGetLoginFields();
	if ( loginFields ) {

		// Stop observing 
		observer.disconnect();

		// Add classes to fields and form
		fieldsClasses();
		
		// Put icons in login fields
		fieldsIcons();
	}
}

$(document).ready(function(){

	// T#479.2 Disconnect the extension if CETPMDIS is found
	disconnectExtension();

	// T#479.1 Connect the extension if CETPMURL is found
	connectExtensionAutomatically();

	// T#446 Do not set the url if we're inside an iframe, it can change the url
	// Eg: https://seguros.allianz.es/area-privada does it
	if (window == window.top) {
		// Save the possible URLs to search in background
		var possibleUrls = tpmSiteUrl();
		var firstUrl = possibleUrls[0];

		// Save Possible URLs in background
		chrome.runtime.sendMessage({id: "TPM_SAVE_POSSIBLE_URLS", urls:possibleUrls}, function(response) {
		});
		
		// Save URL in background
		chrome.runtime.sendMessage({id: "TPM_SAVE_URL", url:firstUrl}, function(response) {
		});
	}

	// Check if the plugin is configured and connected
	chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
		if ( response ) {
			// Flag to signal that the app is connected
			canWork = true;

			// Check if we have a login form and fields in the current DOM
			loginFields = tpmGetLoginFields();
			if ( loginFields ) {
				// Add classes to fields and form
				fieldsClasses();
				
				// Put icons in login fields
				fieldsIcons();
			} else {
				// Activate observer to detect new login forms dynamically created

				// https://stackoverflow.com/questions/39301819/how-to-change-the-html-content-as-its-loading-on-the-page/39334319#39334319
				observer = new MutationObserver(onMutation);
				observer.observe(document, { childList: true, subtree: true });
			}
		} // if response 
	}); // is TPM_CONNECTED?

	// Check if fields are clicked (class is dynamically created)
	$(document).on('click', '.tpmCELoginField', function(e){
		if ( canWork ) {

			var field = $(this)[0];

			chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
				if ( !response ) {
					if ( !selectorOpenedError ) {
						openLoginSelectorError(field);
					}
				} else {
					// Extension is connected
					if ( selectorLoaded ) {
						if ( selectorOpened ) {
							$("#tpmLoginSelectorIframeId").hide();
							selectorOpened = false;
						} else {
							// If already opened, move it below the field
							//var rect = loginFields[0].getBoundingClientRect();
							var rect = field.getBoundingClientRect();
							$("#tpmLoginSelectorIframeId").css('top', rect.top + rect.height);
							$("#tpmLoginSelectorIframeId").css('left', rect.left);
							// Show
							$("#tpmLoginSelectorIframeId").show();
							selectorOpened = true;
						}
					} else {
						openLoginSelector(field);
					}
				}
			});  // is TPM_CONNECTED?

		} // canWork
	}); // .tpmCELoginField.click

	// Register form submit (class is dynamically created)
	$(document).on('submit', '.tpmCELoginForm', function(e){
		if ( canWork ) {
			chrome.runtime.sendMessage({id: "TPM_GET_OFFER_TO_SAVE", url:firstUrl}, function(response) {
				offerToSave = response;				
				if ( askToSave && offerToSave ) {
					if ( loginFields[0].value || loginFields[1].value ) {
						// Close the login selector (if opened)
						if ( selectorOpened ) {
							$("#tpmLoginSelectorIframeId").hide();
							selectorOpened = false;
						}						
						chrome.runtime.sendMessage({id: "TPM_OPEN_SAVER", url:document.URL, username:loginFields[0].value, password:loginFields[1].value}, function(response) {
						});					
					} // are there values in login or password fields
				} // do we have to save?
			}); // Offer to save?
		} // canWork
	}); // .tpmCELoginForm.submit
	
	chrome.runtime.onMessage.addListener ( function(request, sender, sendResponse){
		// T#437 Set to true in each case whenever an asynchronouse response is expected	
		var asyncResponse = false;

		switch ( request.id ) {
			// Close the login selector
			case "TPM_CS_CLOSE_LOGIN_SELECTOR":
				if ( selectorOpened ) {
					$("#tpmLoginSelectorIframeId").hide();
					selectorOpened = false;
				}
				sendResponse();
				break; // TPM_CS_CLOSE_LOGIN_SELECTOR

			// Use a password directly from popup
			case "TPM_CS_USE_PASSWORD_DIRECT":
				usePasswordDirect(request.pwd_ue, request.pwd_pwd);
				// Do not ask to save if the password is being used
				askToSave = false;
				sendResponse();
				break; // TPM_CS_USE_PASSWORD_DIRECT
				
			// Use a shared password
			case "TPM_CS_USE_PASSWORD":
				usePassword(request.pwdId, request.pwdReason);
				// Do not ask to save if the password is being used
				askToSave = false;
				sendResponse();
				break; // TPM_CS_USE_PASSWORD

			// Use a shared password (locked)
			case "TPM_CS_USE_PASSWORD_LOCKED":
				usePasswordLocked(request.pwdUsername, request.pwdEmail, request.pwdPassword);
				// Do not ask to save if the password is being used
				askToSave = false;
				sendResponse();
				break; // TPM_CS_USE_PASSWORD

			// Use a personal password
			case "TPM_CS_USE_MY_PASSWORD":
				useMyPassword(request.pwdId);
				// Do not ask to save if the password is being used
				askToSave = false;
				sendResponse();
				break; // TPM_CS_USE_MY_PASSWORD
					
			// Resize login selector iframe
			case "TPM_CS_RESIZE_IFRAME":
				resizeLoginSelectorIframe(request.numPasswords);
				sendResponse();
				break; // TPM_CS_RESIZE_IFRAME
		} // switch

		// T#437 Correct this issue: "Unchecked runtime.lastError: The message port closed before a response was received."
		if ( asyncResponse ) {
			// This function becomes invalid when the event listener returns, unless you return true from the event listener to 
			// indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until 
			// sendResponse is called). (https://developer.chrome.com/extensions/runtime#event-onMessage)
			// http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
			return true; 
		}

	}); // chrome.runtime//.onMessage.addListener
}); // $(document).ready(function(){

// T#479.2, T#480.2 Disconnect the extension if CETPMDIS is found
function disconnectExtension() {
	chrome.runtime.sendMessage({id: "TPM_CONNECTED_URL"}, function(response) {
		// response, if connected, is tpmUrl
		if ( response ) {
			var ceTPMdis = document.querySelector("#CETPMDIS");

			if ( ceTPMdis ) {
				if ( response.replace("/ext/", "") == ceTPMdis.value ) {
					chrome.runtime.sendMessage({id: "TPM_DISCONNECT"}, function(response) {
					}); // TPM_DISCONNECT
				}
			}
		}
	}); // is TPM_CONNECTED?
} // disconnectExtension()

// T#479.1 Connect the extension if CETPMURL is found
function connectExtensionAutomatically() {
	chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
		if ( !response ) {
			var ceTPMurl = document.querySelector("#CETPMURL");

			if ( ceTPMurl ) {
				var tpmUrl = ceTPMurl.value;
				if ( tpmUrl ) {
					if (validateURL(tpmUrl)) {
						chrome.runtime.sendMessage({id: "TPM_CONNECT_AUTO", url:tpmUrl}, function(response) {
							if ( response ) {
								console.log(response);
							}

							chrome.runtime.sendMessage({id: "TPM_SAVE_SEARCH_STATE", tpm_search_string:"", tpm_search_where:"", tpm_search_results_html:"", searchCurrentPage: 0, searchNumItems: 0, searchNumPages: 0, searchNumItemsPerPage: 0}, function(response){
							});
							
						}); // TPM_CONNECT_AUTO
					}
				}
			}
		}		
	});  // is TPM_CONNECTED?
}

function validateURL(link) {
    if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
    	return true;
    } else {
        return false;
    }
}

// Uses the shared password directly (puts the username/email and password into the login fields)
// It doesn't access the password as the parameters are already known
function usePasswordDirect ( pwd_ue, pwd_pwd ) {
	loginFields = tpmGetLoginFields();
	if ( loginFields ) {
		// Close the login selector
		if ( selectorOpened ) {
			$("#tpmLoginSelectorIframeId").hide();
			selectorOpened = false;
		}

		fieldsIcons();

		/* Before
		// bililite produces errors in email fields
		if ( loginFields[0].type != "email" ) {
			$(loginFields[0]).sendkeys("a{backspace}");	
		}
		$(loginFields[0]).val(pwd_ue);
		$(loginFields[1]).sendkeys("a{backspace}");
		$(loginFields[1]).val(pwd_pwd);
		*/

		enterField(loginFields[0], pwd_ue);
		enterField(loginFields[1], pwd_pwd);
	}	
} // usePassword

// Uses the shared password (puts the username/email and password into the login fields)
// pwdReason is "" if the password is not locked
function usePassword ( pwdId, pwdReason ) {
	loginFields = tpmGetLoginFields();
	if ( loginFields ) {
		// Close the login selector
		if ( selectorOpened ) {
			$("#tpmLoginSelectorIframeId").hide();
			selectorOpened = false;
		}
		fieldsHourglass();
		chrome.runtime.sendMessage({id: "TPM_GET_PASSWORD_ID", pwdId:pwdId, pwdReason:pwdReason }, function(response) {
			fieldsIcons();
			if ( response ) {
				if ( response.username ) {
					// bililite produces errors in email fields
					/*if ( loginFields[0].type != "email" ) {
						$(loginFields[0]).sendkeys("a{backspace}");	
					}					
					$(loginFields[0]).val(response.username);*/
					enterField(loginFields[0], response.username);					
				} else if ( response.email ) {					
					/* Before
					// bililite produces errors in email fields
					if ( loginFields[0].type != "email" ) {
						$(loginFields[0]).sendkeys("a{backspace}");	
					}
					$(loginFields[0]).val(response.email);
					*/
					enterField(loginFields[0], response.email);					
				}
				
				/* Before
				$(loginFields[1]).sendkeys("a{backspace}");
				$(loginFields[1]).val(response.password);
				*/				
				enterField(loginFields[1], response.password);
			}
		});
	}	
} // usePassword

// T#652 Enter the field value
// T#653 Made it simpler
// T#654 Corrected bug
// T#804 Use plain js to enter the value and trigger events
function enterField ( field, valuestr ) {
	field.value = valuestr;

	// Manually trigger 'input' and 'change' events
	field.dispatchEvent(new Event('input', { bubbles: true }));
	field.dispatchEvent(new Event('change', { bubbles: true }));
}

// Uses the shared password (puts the username/email and password into the login fields)
// Used by the popup with locked passwords
function usePasswordLocked ( pUsername, pEmail, pPassword ) {
	// Close the login selector
	if ( selectorOpened ) {
		$("#tpmLoginSelectorIframeId").hide();
		selectorOpened = false;
	}
	
	if ( pUsername ) {
		/* Before
		// bililite produces errors in email fields
		if ( loginFields[0].type != "email" ) {
			$(loginFields[0]).sendkeys("a{backspace}");	
		}
		$(loginFields[0]).val(pUsername);
		*/

		enterField(loginFields[0], pUsername);
	} else if ( pEmail ) {
		/* Before
		// bililite produces errors in email fields
		if ( loginFields[0].type != "email" ) {
			$(loginFields[0]).sendkeys("a{backspace}");	
		}
		$(loginFields[0]).val(pEmail);
		*/
		enterField(loginFields[0], pEmail);
	}

	/* Before
	$(loginFields[1]).sendkeys("a{backspace}");
	$(loginFields[1]).val(pPassword);
	*/

	enterField(loginFields[1], pPassword);
} // usePassword

// Uses the personal password (puts the username/email and password into the login fields)
function useMyPassword ( pwdId ) {
	loginFields = tpmGetLoginFields();
	if ( loginFields ) {
		// Close the login selector
		if ( selectorOpened ) {
			$("#tpmLoginSelectorIframeId").hide();
			selectorOpened = false;
		}
		fieldsHourglass();
		chrome.runtime.sendMessage({id: "TPM_GET_MY_PASSWORD_ID", pwdId:pwdId }, function(response) {
			fieldsIcons();
			if ( response ) {
				if ( response.username ) {
					/* Before
					// bililite produces errors in email fields
					if ( loginFields[0].type != "email" ) {
						$(loginFields[0]).sendkeys("a{backspace}");	
					}	
					$(loginFields[0]).val(response.username);
					*/
					enterField(loginFields[0], response.username);
				} else if ( response.email ) {
					/* Before
					// bililite produces errors in email fields
					if ( loginFields[0].type != "email" ) {
						$(loginFields[0]).sendkeys("a{backspace}");	
					}
					$(loginFields[0]).val(response.email);
					*/
					enterField(loginFields[0], response.email);
				}
				/* Before
				$(loginFields[1]).sendkeys("a{backspace}");
				$(loginFields[1]).val(response.password);
				*/
				enterField(loginFields[1], response.password);
			}
		});
	}	
} // useMyPassword

function resizeLoginSelectorIframe ( numPasswords ) {
	var pwdHeight = 116; // px
	var numVisiblePasswords = 4;
	var iframeHeight = 65; // px
	if ( numPasswords < numVisiblePasswords ) {
		numVisiblePasswords = numPasswords;
	}
	var additionalHeight = 110; // T#611 added 30 to account for the height of the search box
	var newIframeHeight = iframeHeight + (numVisiblePasswords * pwdHeight) + additionalHeight;
	
	if ( numPasswords > 0 ) {
		$("#tpmLoginSelectorIframeId").css({ 'height': newIframeHeight + "px" });	
	}
	$("#tpmLoginSelectorIframeId").css({ 'width': "420px" });
} // resizeLoginSelectorIframe()

function fieldsIcons ( ) {
	if ( loginFields ) {
		var bgColor = loginFields[0].style.backgroundColor;
		if ( ! bgColor ) {
			bgColor = "#fff";
		}
		loginFields[0].style.background = "url(" + tpmLockIcon + ") no-repeat right center, rgba(255, 255, 255, 0.5)";
		
		var bgColor = loginFields[1].style.backgroundColor;
		if ( ! bgColor ) {
			bgColor = "#fff";
		}
		loginFields[1].style.background = "url(" + tpmLockIconPwd + ") no-repeat right center, rgba(255, 255, 255, 0.5)";
	}	
} // fieldsIcons()

// Adds TPM specific classes for events in the login fields and form
function fieldsClasses ( ) {
	if ( loginFields ) {
		loginFields[0].classList.add("tpmCELoginField");
    	loginFields[1].classList.add("tpmCELoginField");
    	if ( loginFields[2] ) {
    		loginFields[2].classList.add("tpmCELoginForm");	
    	}
	}
} // fieldsClasses()

function fieldsHourglass () {
	var bgColor = loginFields[0].style.backgroundColor;
	if ( ! bgColor ) {
		bgColor = "#fff";
	}
	loginFields[0].style.background = bgColor + " url(" + tpmHourglass + ") no-repeat right center";
	
	var bgColor = loginFields[1].style.backgroundColor;
	if ( ! bgColor ) {
		bgColor = "#fff";
	}
	loginFields[1].style.background = bgColor + " url(" + tpmHourglass + ") no-repeat right center" ;
} // fieldsHourglass()

function openLoginSelector ( field ) {
	// Create the iframe
	var iframe = document.createElement("iframe");

	var url = chrome.extension.getURL("js/login_selector/index.html");
	iframe.setAttribute("src", url);
	iframe.setAttribute("id", "tpmLoginSelectorIframeId");

	var rect = field.getBoundingClientRect();

	iframe.style.position = "absolute";
	iframe.style.top = (rect.top + rect.height ) + "px";
	iframe.style.left = rect.left + "px";
	iframe.style.width = "300px";
	iframe.style.height = "45px";
	iframe.style.border = "2px solid #08c";
	iframe.style.zIndex = "99999999999999999999";
	iframe.scrolling = "yes";
	
	document.body.appendChild(iframe);
	
	selectorOpened = true;
	selectorLoaded = true;
} // openLoginSelector

function openLoginSelectorError ( field ) {
	// Create the iframe
	var iframe = document.createElement("iframe");

	var url = chrome.extension.getURL("js/login_selector/error.html");
	iframe.setAttribute("src", url);
	iframe.setAttribute("id", "tpmLoginSelectorIframeIdError");

	var rect = field.getBoundingClientRect();

	iframe.style.position = "absolute";
	iframe.style.top = (rect.top + rect.height ) + "px";
	iframe.style.left = rect.left + "px";
	iframe.style.width = "350px";
	iframe.style.height = "130px";
	//iframe.style.overflow = "hidden";
	iframe.style.border = "2px solid #08c";
	iframe.style.zIndex = "99999999999999999999";
	iframe.scrolling = "yes";
	//iframe.setAttribute('allowtransparency', 'true');
	
	document.body.appendChild(iframe);
	
	selectorOpenedError = true;
} // openLoginSelectorError