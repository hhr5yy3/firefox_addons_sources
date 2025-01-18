// Team Password Manager Browser Extension login selector script
// (c) 2016-2022 Ferran Barba

var siteUrl = null;

// Page control variables for shared passwords
var currentPage = 0;
var numItems = 0;
var numPages = 0;
var numItemsPerPage = 0;

// Page control variables for personal passwords
var currentMyPage = 0;
var numMyItems = 0;
var numMyPages = 0;
var numMyItemsPerPage = 0;

var areMyPasswordsEnabled = false;

var msgNoPersonalPwds = chrome.i18n.getMessage("lsNotFoundURLPersonal"); // "No personal passwords found for this URL";
var msgNoPersonalPwdsSearch = chrome.i18n.getMessage("lsNotFoundURLStrPersonal"); // "No personal passwords found for this URL and search string";
var msgNoSharedPwds = chrome.i18n.getMessage("lsNotFoundURLShared"); // "No shared passwords found for this URL";
var msgNoSharedPwdsSearch = chrome.i18n.getMessage("lsNotFoundURLStrShared"); // "No shared passwords found for this URL and search string";

var currentTab = "shared";

// Search string
var tpmSearchString = "";

$(document).ready(function(){

	localizeHtmlPage();

	// Get the login fields
	chrome.runtime.sendMessage({id: "TPM_GET_URL"}, function(response) {
		if ( response ) {
			siteUrl = response;
			
			$("#tpmImgWait").show();
			$("#tpmLoginSelectorTitle").text(chrome.i18n.getMessage("lsSearchingPwds")); // Searching passwords...
			$("#tpmLoginSelectorTitle").css("color", "#333");
			$("#tpmLoginSelectorTitle").show();

			// Resize the iframe (for the width only for now)
			chrome.runtime.sendMessage({id: "TPM_CS_RESIZE_IFRAME", numPasswords: 0}, function(response) {
			}); // TPM_CS_RESIZE_IFRAME

			countPasswords();

			// T#612 Select tab depending on saved option
			chrome.runtime.sendMessage({id: "TPM_GET_MY_SHARED"}, function(response) {
				if ( response=="my" ) {
					
					currentTab = "my";

					$("#tpmSelectorSharedLi").removeClass("active");
					$("#tpmSelectorMyLi").addClass("active");


					$(".tpm_my_pagination").hide();
			  		$(".tpm_pagination").hide();
			  		$(".tpm_my_previous_page").hide(); // we go to page 1
			  		$(".tpm_my_next_page").hide();	
					//$("#tpm_img_wait_page").show();
					$("#tpm_no_passwords_tab").hide();
					
					// Get my password list (first page)
					chrome.runtime.sendMessage({id: "TPM_GET_MY_PASSWORDS_URL", url:siteUrl, search: tpmSearchString, page:1}, function(response) {
						var noPwdsFound = true;
						var sharedPwdsFound = false;
						var myPwdsFound = false;

						$(".tpm_my_pagination").show();
						if ( numMyPages > 1 ) {
							$(".tpm_my_next_page").show();	
						}
						$("#tpm_img_wait_page").hide();

						// Check shared passwords				
						if ( response ) {
							if ( response.length > 0 ) {
								$("#tpm_searched_urls").css("display", "block");
								listMyPasswords(response);
								noPwdsFound = false;	
								myPwdsFound = true;
							}
						} // response from TPM_GET_PASSWORDS_URL

						// Check my passwords to see if we have to who the "no shared passwords message"
						if ( noPwdsFound ) {
							chrome.runtime.sendMessage({id: "TPM_GET_PASSWORDS_URL", url:siteUrl, search: tpmSearchString, page:1}, function(response) {
								// Check shared passwords				
								if ( response ) {
									if ( response.length > 0 ) {
										noPwdsFound = false;
										sharedPwdsFound = true;
									} // response.length > 0
								} // response from TPM_MY_PASSWORDS_URL

								// If there aren't any personal passwords, but there are shared, show the "no personal message"
								// (else we show nothing)
								if ( !myPwdsFound ) {
									if ( sharedPwdsFound ) {
										if ( tpmSearchString=="" ) {
											$("#tpm_no_passwords_tab").text(msgNoPersonalPwds);
										} else {
											$("#tpm_no_passwords_tab").text(msgNoPersonalPwdsSearch);	
										}
										$("#tpm_no_passwords_tab").show();
										// Resize the iframe to show the message
										chrome.runtime.sendMessage({id: "TPM_CS_RESIZE_IFRAME", numPasswords: 1}, function(response) { }); // TPM_CS_RESIZE_IFRAME	
									}
								}

								// None found
								if ( noPwdsFound ) {
									$("#tpmLoginSelectorTitle").text(chrome.i18n.getMessage("lsSearchNoPwdsFoundURL")); // "No passwords found for this URL"
								} else {
									$("#tpm_searched_urls").css("display", "block");
								}

								$("#tpmImgWait").hide();

							}); // TPM_GET_MY_PASSWORDS_URL
						} else {
							// Put this inside an else, if not the image disappears but the message "Searching passwords" not
							$("#tpmImgWait").hide();	
						} // noPwdsFound
					}); // TPM_GET_MY_PASSWORDS_URL

				} else {
					currentTab = "shared";

					$("#tpmSelectorMyLi").removeClass("active");
					$("#tpmSelectorSharedLi").addClass("active");
					
					// Get password list (first page)
					chrome.runtime.sendMessage({id: "TPM_GET_PASSWORDS_URL", url:siteUrl, search: tpmSearchString, page:1}, function(response) {
						var noPwdsFound = true;
						var sharedPwdsFound = false;
						var myPwdsFound = false;

						// Check shared passwords				
						if ( response ) {
							if ( response.length > 0 ) {
								$("#tpm_searched_urls").css("display", "block");
								listPasswords(response);
								noPwdsFound = false;	
								sharedPwdsFound = true;
							}
						} // response from TPM_GET_PASSWORDS_URL

						// Check my passwords to see if we have to who the "no shared passwords message"
						if ( noPwdsFound ) {
							chrome.runtime.sendMessage({id: "TPM_GET_MY_PASSWORDS_URL", url:siteUrl, search: tpmSearchString, page:1}, function(response) {
								// Check shared passwords				
								if ( response ) {
									if ( response.length > 0 ) {
										// Switch to my passwords tab automatically
										// $("#tpmSelectorMyTab").tab("show");
										//listMyPasswords(response);
										noPwdsFound = false;
										myPwdsFound = true;

									} // response.length > 0
								} // response from TPM_GET_MY_PASSWORDS_URL

								// If there aren't any shared passwords, but there are personal, show the "no shared message"
								// (else we show nothing)
								if ( !sharedPwdsFound ) {
									if ( myPwdsFound ) {
										if ( tpmSearchString=="" ) {
											$("#tpm_no_passwords_tab").text(msgNoSharedPwds);
										} else {
											$("#tpm_no_passwords_tab").text(msgNoSharedPwdsSearch);	
										}
										$("#tpm_no_passwords_tab").show();
										// Resize the iframe to show the message
										chrome.runtime.sendMessage({id: "TPM_CS_RESIZE_IFRAME", numPasswords: 1}, function(response) { }); // TPM_CS_RESIZE_IFRAME	
									}
								}

								// None found
								if ( noPwdsFound ) {
									$("#tpmLoginSelectorTitle").text(chrome.i18n.getMessage("lsSearchNoPwdsFoundURL")); // "No passwords found for this URL"
								} else {
									$("#tpm_searched_urls").css("display", "block");
								}

								$("#tpmImgWait").hide();

							}); // TPM_GET_MY_PASSWORDS_URL
						} else {
							// Put this inside an else, if not the image disappears but the message "Searching passwords" not
							$("#tpmImgWait").hide();	
						} // noPwdsFound
					}); // TPM_GET_PASSWORDS_URL
				}
			}); // TPM_GET_MY_SHARED
				
		} // response from TPM_GET_URL
	}); // TPM_GET_URL
	
	// Select shared passwords tab
	$('#tpmSelectorSharedTab').click(function (e) {
		e.preventDefault();

		chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
			if ( !response ) {
				showExtensionDisconnected();				
			} else {
				currentTab = "shared";

				// T#612 Save my/shared
				chrome.runtime.sendMessage({id: "TPM_SET_OPTION_MY_SHARED", value:currentTab}, function(response) {});

		  		$("#tpmSelectorMyLi").removeClass("active");
		  		$("#tpmSelectorSharedLi").addClass("active");

		  		$(".tpm_my_pagination").hide();
		  		$(".tpm_pagination").hide();
		  		$(".tpm_previous_page").hide(); // we go to page 1
		  		$(".tpm_next_page").hide();	
				$("#tpm_img_wait_page").show();
				$("#tpm_no_passwords_tab").hide();

				$("#tpmLoginSelectorPasswordsContainer").empty();

		  		// Get the passwords
				chrome.runtime.sendMessage({id: "TPM_GET_PASSWORDS_URL", url:siteUrl, search: tpmSearchString, page:currentPage}, function(response) {

					countPasswords();
					
					$(".tpm_pagination").show();
					if ( numPages > 1 ) {
						$(".tpm_next_page").show();	
					}
					$("#tpm_img_wait_page").hide();

					if ( response ) {
						if ( response.length > 0 ) {
							listPasswords(response);
						} else {
							if ( tpmSearchString=="" ) {
								$("#tpm_no_passwords_tab").text(msgNoSharedPwds);
							} else {
								$("#tpm_no_passwords_tab").text(msgNoSharedPwdsSearch);	
							}
							$("#tpm_no_passwords_tab").show();
						} // response.length > 0
					} else {
						if ( tpmSearchString=="" ) {
							$("#tpm_no_passwords_tab").text(msgNoSharedPwds);
						} else {
							$("#tpm_no_passwords_tab").text(msgNoSharedPwdsSearch);	
						}
						$("#tpm_no_passwords_tab").show();
					} // response from TPM_GET_PASSWORDS_URL
				}); // TPM_GET_PASSWORDS_URL
			}
		});  // is TPM_CONNECTED?

	}) // tpmSelectorSharedTab click

	// Select my passwords tab
	$('#tpmSelectorMyTab').click(function (e) {
		e.preventDefault();

		chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
			if ( !response ) {
				showExtensionDisconnected();				
			} else {
				currentTab = "my";

				// T#612 Save my/shared
				chrome.runtime.sendMessage({id: "TPM_SET_OPTION_MY_SHARED", value:currentTab}, function(response) {});

		  		$("#tpmSelectorSharedLi").removeClass("active");
		  		$("#tpmSelectorMyLi").addClass("active");

		  		$(".tpm_my_pagination").hide();
		  		$(".tpm_pagination").hide();
		  		$(".tpm_my_previous_page").hide(); // we go to page 1
		  		$(".tpm_my_next_page").hide();	
				$("#tpm_img_wait_page").show();
				$("#tpm_no_passwords_tab").hide();

				$("#tpmLoginSelectorPasswordsContainer").empty();

		  		// Get the personal passwords
				chrome.runtime.sendMessage({id: "TPM_GET_MY_PASSWORDS_URL", url:siteUrl, search: tpmSearchString, page:currentMyPage}, function(response) {

					countPasswords();
					
					$(".tpm_my_pagination").show();
					if ( numMyPages > 1 ) {
						$(".tpm_my_next_page").show();	
					}
					$("#tpm_img_wait_page").hide();

					if ( response ) {
						if ( response.length > 0 ) {
							listMyPasswords(response);
						} else {					
							if ( tpmSearchString=="" ) {
								$("#tpm_no_passwords_tab").text(msgNoPersonalPwds);
							} else {
								$("#tpm_no_passwords_tab").text(msgNoPersonalPwdsSearch);	
							}
							$("#tpm_no_passwords_tab").show();
						} // response.length > 0
					} else {				
						if ( tpmSearchString=="" ) {
							$("#tpm_no_passwords_tab").text(msgNoPersonalPwds);
						} else {
							$("#tpm_no_passwords_tab").text(msgNoPersonalPwdsSearch);	
						}
						$("#tpm_no_passwords_tab").show();
					} // response from TPM_GET_MY_PASSWORDS_URL
				}); // TPM_GET_MY_PASSWORDS_URL
			}
		});  // is TPM_CONNECTED?
	}) // tpmSelectorMyTab click

	// Close the login selector
	$("#tpmLoginSelectorClose").click(function () {
		chrome.runtime.sendMessage({id: "TPM_CS_CLOSE_LOGIN_SELECTOR"}, function(response) {
		}); // TPM_CS_CLOSE_LOGIN_SELECTOR		
	}); // tpmLoginSelectorClose.click

	// Next page (shared passwords)
	$(".tpm_next_page").click(function () {

		chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
			if ( !response ) {
				showExtensionDisconnected();				
			} else {
				// Check if can call next page
				if ( numPages > currentPage ) {
					currentPage++;
					// Show / hide page links
					$(".tpm_previous_page").show();
					if ( numPages == currentPage ) {
						$(".tpm_next_page").hide();		
					}

					$(".tpm_pagination").hide();
					$("#tpm_img_wait_page").show();
					$("#tpm_no_passwords_tab").hide();

					$("#tpmLoginSelectorPasswordsContainer").empty();

					// Get the passwords
					chrome.runtime.sendMessage({id: "TPM_GET_PASSWORDS_URL", url:siteUrl, search: tpmSearchString, page:currentPage}, function(response) {

						$(".tpm_pagination").show();
						$("#tpm_img_wait_page").hide();

						if ( response ) {
							if ( response.length > 0 ) {
								listPasswords(response);
							} else {
								if ( tpmSearchString=="" ) {
									$("#tpm_no_passwords_tab").text(msgNoSharedPwds);
								} else {
									$("#tpm_no_passwords_tab").text(msgNoSharedPwdsSearch);	
								}						
								$("#tpm_no_passwords_tab").show();
							} // response.length > 0
						} else {
							if ( tpmSearchString=="" ) {
								$("#tpm_no_passwords_tab").text(msgNoSharedPwds);
							} else {
								$("#tpm_no_passwords_tab").text(msgNoSharedPwdsSearch);	
							}
							$("#tpm_no_passwords_tab").show();
						} // response from TPM_GET_PASSWORDS_URL
					}); // TPM_GET_PASSWORDS_URL
				} else {
					// Just in case
					$(".tpm_next_page").hide();	
					//$(".tpm_next_page").text(numPages + "/" + currentPage);	
				}
			}
		});  // is TPM_CONNECTED?
		
	}); // tpm_next_page.click

	// Previous page (shared passwords)
	$(".tpm_previous_page").click(function () {

		chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
			if ( !response ) {
				showExtensionDisconnected();				
			} else {
				// Check if can call previous page
				if ( currentPage != 1 ) {
					currentPage--;
					// Show / hide page links
					if ( numPages > 1 ) {
						$(".tpm_next_page").show();	
					}
					if ( currentPage == 1 ) {
						$(".tpm_previous_page").hide();		
					}

					$(".tpm_pagination").hide();
					$("#tpm_img_wait_page").show();
					$("#tpm_no_passwords_tab").hide();

					$("#tpmLoginSelectorPasswordsContainer").empty();

					// Get the passwords
					chrome.runtime.sendMessage({id: "TPM_GET_PASSWORDS_URL", url:siteUrl, search: tpmSearchString, page:currentPage}, function(response) {
						
						$(".tpm_pagination").show();
						$("#tpm_img_wait_page").hide();

						if ( response ) {
							if ( response.length > 0 ) {
								listPasswords(response);
							} else {
								if ( tpmSearchString=="" ) {
									$("#tpm_no_passwords_tab").text(msgNoSharedPwds);
								} else {
									$("#tpm_no_passwords_tab").text(msgNoSharedPwdsSearch);	
								}						
								$("#tpm_no_passwords_tab").show();
							} // response.length > 0
						} else {
							if ( tpmSearchString=="" ) {
								$("#tpm_no_passwords_tab").text(msgNoSharedPwds);
							} else {
								$("#tpm_no_passwords_tab").text(msgNoSharedPwdsSearch);	
							}
							$("#tpm_no_passwords_tab").show();
						} // response from TPM_GET_PASSWORDS_URL
					}); // TPM_GET_PASSWORDS_URL
				} else {
					// Just in case
					$(".tpm_previous_page").hide();	
				}
			}
		});  // is TPM_CONNECTED?
		
	}); // tpm_previous_page.click

	// Next page (personal passwords)
	$(".tpm_my_next_page").click(function () {

		chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
			if ( !response ) {
				showExtensionDisconnected();				
			} else {
				// Check if can call next page
				if ( numMyPages > currentMyPage ) {
					currentMyPage++;
					// Show / hide page links
					$(".tpm_my_previous_page").show();
					if ( numMyPages == currentMyPage ) {
						$(".tpm_my_next_page").hide();		
					}

					$(".tpm_my_pagination").hide();
					$("#tpm_img_wait_page").show();
					$("#tpm_no_passwords_tab").hide();

					$("#tpmLoginSelectorPasswordsContainer").empty();

					// Get the passwords
					chrome.runtime.sendMessage({id: "TPM_GET_MY_PASSWORDS_URL", url:siteUrl, search: tpmSearchString, page:currentMyPage}, function(response) {

						$(".tpm_my_pagination").show();
						$("#tpm_img_wait_page").hide();

						if ( response ) {
							if ( response.length > 0 ) {
								listMyPasswords(response);
							} else {
								if ( tpmSearchString=="" ) {
									$("#tpm_no_passwords_tab").text(msgNoPersonalPwds);
								} else {
									$("#tpm_no_passwords_tab").text(msgNoPersonalPwdsSearch);	
								}
								$("#tpm_no_passwords_tab").show();
							} // response.length > 0
						} else {
							if ( tpmSearchString=="" ) {
								$("#tpm_no_passwords_tab").text(msgNoPersonalPwds);
							} else {
								$("#tpm_no_passwords_tab").text(msgNoPersonalPwdsSearch);	
							}
							$("#tpm_no_passwords_tab").show();
						} // response from TPM_GET_MY_PASSWORDS_URL
					}); // TPM_GET_MY_PASSWORDS_URL
				} else {
					// Just in case
					$(".tpm_my_next_page").text(numMyPages + "/" + currentMyPage);	
				}
			}
		});  // is TPM_CONNECTED?
		
	}); // tpm_my_next_page.click

	// Previous page (personal passwords)
	$(".tpm_my_previous_page").click(function () {
		chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
			if ( !response ) {
				showExtensionDisconnected();				
			} else {
				// Check if can call previous page
				if ( currentMyPage != 1 ) {
					currentMyPage--;
					// Show / hide page links
					if ( numMyPages > 1 ) {
						$(".tpm_my_next_page").show();	
					}
					if ( currentMyPage == 1 ) {
						$(".tpm_my_previous_page").hide();		
					}

					$(".tpm_my_pagination").hide();
					$("#tpm_img_wait_page").show();
					$("#tpm_no_passwords_tab").hide();

					$("#tpmLoginSelectorPasswordsContainer").empty();

					// Get the passwords
					chrome.runtime.sendMessage({id: "TPM_GET_MY_PASSWORDS_URL", url:siteUrl, search: tpmSearchString, page:currentMyPage}, function(response) {
						
						$(".tpm_my_pagination").show();
						$("#tpm_img_wait_page").hide();

						if ( response ) {
							if ( response.length > 0 ) {
								listMyPasswords(response);
							} else {
								if ( tpmSearchString=="" ) {
									$("#tpm_no_passwords_tab").text(msgNoPersonalPwds);
								} else {
									$("#tpm_no_passwords_tab").text(msgNoPersonalPwdsSearch);	
								}
								$("#tpm_no_passwords_tab").show();
							} // response.length > 0
						} else {
							if ( tpmSearchString=="" ) {
								$("#tpm_no_passwords_tab").text(msgNoPersonalPwds);
							} else {
								$("#tpm_no_passwords_tab").text(msgNoPersonalPwdsSearch);	
							}
							$("#tpm_no_passwords_tab").show();
						} // response from TPM_GET_MY_PASSWORDS_URL
					}); // TPM_GET_MY_PASSWORDS_URL
				} else {
					// Just in case
					$(".tpm_my_previous_page").hide();	
				}
			}
		});  // is TPM_CONNECTED?
		
	}); // tpm_my_previous_page.click

	// Click on the possible urls
	$(document).on('click', '.tpm-purl', function(e){

		var that = $(this);

		chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
			if ( !response ) {
				showExtensionDisconnected();				
			} else {
				var newUrl = that.attr("data-url");

				// Save URL in background
				chrome.runtime.sendMessage({id: "TPM_SAVE_URL", url:newUrl}, function(response) {
					// Also update siteUrl variable
					siteUrl = newUrl;

					// Not needed, countPasswords() does it: showPossibleUrls();
					countPasswords();

					if ( currentTab == "my" ) {
						$("#tpmSelectorMyTab").click();	
					} else {
						$("#tpmSelectorSharedTab").click();	
					}
				});
			}
		});  // is TPM_CONNECTED?
		
	}); // tpm-purl.click

	// Search
	$('#tpm_search_form_login_selector').on('submit', function(e){
		e.preventDefault();

		chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
			if ( !response ) {
				showExtensionDisconnected();				
			} else {
				tpmSearchString = $('#tpm_search_string').val().trim();

				// Init items and paging
				currentPage = 0;
				numItems = 0;
				numPages = 0;
				numItemsPerPage = 0;

				currentMyPage = 0;
				numMyItems = 0;
				numMyPages = 0;
				numMyItemsPerPage = 0;

				if ( currentTab == "my" ) {
					$("#tpmSelectorMyTab").click();	
				} else {
					$("#tpmSelectorSharedTab").click();	
				}
			}
		});  // is TPM_CONNECTED?

	}); // Search
	
}); // document.ready

function showExtensionDisconnected () {
	// Delete/hide everything from the pane
	$(".tpm_my_pagination").hide();
	$(".tpm_pagination").hide();
	$(".tpm_my_previous_page").hide();
	$(".tpm_my_next_page").hide();	
	$("#tpm_no_passwords_tab").hide();
	$("#tpmLoginSelectorPasswordsContainer").empty();

	var containerElements = document.getElementById("tpmLoginSelectorPasswordsContainer");

	var pwdContainer = document.createElement("div");
	pwdContainer.style = "font-size: 13px";

	var pTitle = document.createElement("p");
	pTitle.style = "color: red";
	pTitle.innerHTML = `<strong>${chrome.i18n.getMessage("lsErrorDisconnected")}</strong>`; // Error: The Team Password Manager extension is disconnected.
	pwdContainer.appendChild(pTitle);
		
	var pMessage = document.createElement("p");
	pMessage.style = "color: black";
	pMessage.innerHTML = `<strong>${chrome.i18n.getMessage("lsReconnect")}</strong>`; // `Please reconnect it to your installation of Team Password Manager <strong>and reload the current page</strong> to fill in the login fields.`;
	pwdContainer.appendChild(pMessage);

	containerElements.appendChild(pwdContainer);
	
	// Resize the iframe
	chrome.runtime.sendMessage({id: "TPM_CS_RESIZE_IFRAME", numPasswords: 1}, function(response) {
	}); // TPM_CS_RESIZE_IFRAME
} // showExtensionDisconnected()

// Does the password count for shared and my passwords
function countPasswords ( ) {
	// Count passwords and set pages
	chrome.runtime.sendMessage({id: "TPM_COUNT_URL", url:siteUrl, search: tpmSearchString}, function(response) {
		// Init variables
		currentPage = 0;
		numItems = 0;
		numPages = 0;
		numItemsPerPage = 0;

		if ( response ) {
			if ( response.numItems > 0 ) {
				
				$("#tpmLogo").hide();
				$("#tpmLoginSelectorTitle").hide();

				$("#tpmLoginSelectorTabs").css("display", "block");

				$("#tpmSharedPasswords").text(chrome.i18n.getMessage("lsCntSharedPwds") + " (" + response.numItems + ")"); // Shared Passwords

				numItems = response.numItems;
				numPages = response.numPages;
				numItemsPerPage = response.numItemsPerPage;
				currentPage = 1;

				// Show next page?
				if ( numPages > 1 ) {
					$(".tpm_next_page").show();
				}
			} // response.numItems (we have shared passwords)
			else {
				$("#tpmSharedPasswords").text(chrome.i18n.getMessage("lsCntSharedPwds") + " (0)"); // Shared Passwords
			}
		} // if response

		// Show the tpm_searched_urls div in the beginning if there are elements
		showPossibleUrls();
	}); // TPM_COUNT_URL

	// Count my passwords and set pages
	chrome.runtime.sendMessage({id: "TPM_MY_COUNT_URL", url:siteUrl, search: tpmSearchString}, function(response) {

		currentMyPage = 0;
		numMyItems = 0;
		numMyPages = 0;
		numMyItemsPerPage = 0;

		if ( response ) {
			if ( response.numItems > 0 ) {		

				$("#tpmLogo").hide();
				$("#tpmLoginSelectorTitle").hide();

				$("#tpmLoginSelectorTabs").css("display", "block");

				$("#tpmMyPasswords").text(chrome.i18n.getMessage("lsCntMyPwds") + " (" + response.numItems + ")"); // My Passwords

				numMyItems = response.numItems;
				numMyPages = response.numPages;
				numMyItemsPerPage = response.numItemsPerPage;
				currentMyPage = 1;

				// Show next page (note that tpm_my_pagination is hidden util the my pwds tab is clicked)
				if ( numMyPages > 1 ) {
					$(".tpm_my_next_page").show();
				}
			} else {
				$("#tpmMyPasswords").text(chrome.i18n.getMessage("lsCntMyPwds") + " (0)"); // My Passwords
			}
		} else {
			$("#tpmMyPasswords").hide();
			$("#tpmLogoMy").hide();
		}

		// Show the tpm_searched_urls div in the beginning if there are elements
		showPossibleUrls();
	}); // TPM_MY_COUNT_URL
} // countPasswords()

// Shows the possible URls in #tpm_searched_urls
function showPossibleUrls ( ) {
	var possibleUrls = [];
	var currentUrl = "";

	// Remove current values: no, it produces flickering
	
	// Get the possible urls
	chrome.runtime.sendMessage({id: "TPM_GET_POSSIBLE_URLS"}, function(response) {
		if ( response ) {
			possibleUrls = response;
			
			// Get current url
			chrome.runtime.sendMessage({id: "TPM_GET_URL"}, function(response) {
				if ( response ) {
					currentUrl = response;

					// Process					
					var bgcolor = "#08c";
					if ( possibleUrls[0]!=currentUrl ) {
						bgcolor = "#999";
					}
					$("#tpm_purl_1").html("<a class='tpm-purl badge badge-info' style='font-weight:normal; background-color: " + bgcolor + "; cursor:pointer' data-url='" + possibleUrls[0] + "'>" + possibleUrls[0] + "</a>");

					if ( possibleUrls.length > 1 ) {
						bgcolor = "#08c";
						if ( possibleUrls[1]!=currentUrl ) {
							bgcolor = "#999";
						}
						$("#tpm_purl_2").html("<a class='tpm-purl badge badge-info' style='font-weight:normal; background-color: " + bgcolor + "; cursor:pointer' data-url='" + possibleUrls[1] + "'>" + possibleUrls[1] + "</a>");
					} else {
						$("#tpm_purl_2").html("");
					}
				}
			}); // TPM_GET_URL
		}
	}); // TPM_GET_POSSIBLE_URLS
} // showPossibleUrls()

// Lists the passwords in pwdList (an array returned from calls to TPM_GET_PASSWORDS_URL)
function listPasswords ( pwdList ) {
	// Create the elements
	var containerElements = document.getElementById("tpmLoginSelectorPasswordsContainer");

	const parser = new DOMParser();

	var numPasswordsList = pwdList.length;
	for ( var i=0; i<numPasswordsList; i++ ) {
		var pId = pwdList[i].id; // Being used below

		// Container for the password item
		var pwdContainer = document.createElement("div");
		pwdContainer.style = "font-size: 13px";
		pwdContainer.className = "tpm-pwd-container";
		pwdContainer.id = "tpm-pwd-container-" + pId;

		// Favorite
		if ( pwdList[i].favorite ) {
			var imgFav = document.createElement("img");
			imgFav.src = "../../img/star_full.png";
			imgFav.style = "float:right; margin-right: 5px";
			pwdContainer.appendChild(imgFav);	
		}

		// Name
		var imgPwd = document.createElement("img");
		imgPwd.src = "../../img/password.png";
		imgPwd.style = "float:left; margin-right: 5px";
		pwdContainer.appendChild(imgPwd);
		
		var pName = document.createElement("p");
		// Locked?
		var pwdLocked = false;
		if ( pwdList[i].locked ) {
			pwdLocked = true;
		}
		
		const pName547 = "<a class='tpm_use_password' id='" + pwdList[i].id + "' href='#'>" + "<strong>" + escapeHtml(pwdList[i].name) + "</strong>" + "</a>";
		const parsed547 = parser.parseFromString(pName547, `text/html`);
		const tags547 = parsed547.getElementsByTagName("body");
		pName.innerHTML = ``;
		for (const tag of tags547) {
			pName.appendChild(tag);
		}

		pName.style = "margin: 0; font-size: 14px";
		pName.onclick = (function(i, pId, pwdLocked){  // Use the password or the unlock form
			return function () {
 				if ( pwdLocked ) {
 					// Locked => show the form to unlock
					$("#tpm-reason-btn-" + i).trigger("click");
		    		return false; // Do not scroll to top
				} else {
					// Not locked => use the password
					chrome.runtime.sendMessage({id: "TPM_CS_USE_PASSWORD", pwdId: pId, pwdReason: ""}, function(response) {
					}); // TPM_CS_USE_PASSWORD	
				}
	    	}
		})(i, pId, pwdLocked);
		pwdContainer.appendChild(pName);
		
		// Project name
		var imgPrj = document.createElement("img");
		imgPrj.src = "../../img/project.png";
		imgPrj.style = "float:left; margin-right: 5px";
		pwdContainer.appendChild(imgPrj);
		
		var pName = document.createElement("p");
		var pwdArchived = "";
		if ( pwdList[i].archived ) {
			pwdArchived = ' <span class="label label-warning tpm-archived">A</span>';
		}
		
		const pName575 = escapeHtml(pwdList[i].project_name) + pwdArchived;
		const parsed575 = parser.parseFromString(pName575, `text/html`);
		const tags575 = parsed575.getElementsByTagName("body");
		pName.innerHTML = ``;
		for (const tag of tags575) {
			pName.appendChild(tag);
		}		

		pName.style.margin = 0;
		pwdContainer.appendChild(pName);
		
		// Username or email and access info, or locked
		if ( pwdList[i].locked ) {
			// Locked

			// Div to enter the reason (hidden)
			var reasonDiv = document.createElement("div");
			reasonDiv.style = "display:none";
			reasonDiv.className = "tpm-reason-div";
			reasonDiv.id = "tpm-reason-div-" + i;

				// Reason text
				var reasonP = document.createElement("p");
				reasonP.textContent = chrome.i18n.getMessage("lsEnterReasonUnlockUse"); // "Enter reason to unlock and use:";
				reasonP.style = "margin-bottom: 6px";
				reasonDiv.appendChild(reasonP);

				// Reason input
				var reasonInput = document.createElement("input");
				reasonInput.type = "text";
				reasonInput.maxLength = 200;
				reasonInput.className = "tpm-reason-input";
				reasonInput.id = "tpm-reason-input-" + i;
				reasonInput.onkeyup = (function(i){ 
					return function (e) {
	     				if (e.keyCode == 13) { // enter
        					$("#tpm-ok-btn-" + i).trigger("click");
    					} else if ( e.keyCode == 27 ) { // esc
    						$("#tpm-cancel-btn-" + i).trigger("click");
    					}
			    	}
	  			})(i);  			
				reasonDiv.appendChild(reasonInput);

				// Button to accept the reason
				var okButton = document.createElement("input");
				okButton.type = "button";
				okButton.value = chrome.i18n.getMessage("lsUnlockUseButton"); // Unlock and use
				okButton.className = "btn btn-small";
				okButton.id = "tpm-ok-btn-" + i;
				// http://stackoverflow.com/questions/30476721/passing-parameter-onclick-in-a-loop
				okButton.onclick = (function(i, pId){ 
					return function () {
	     				// Check if a reason is entered
	     				// http://ecmanaut.blogspot.com.es/2006/07/encoding-decoding-utf8-in-javascript.html
	     				// http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
	     				//var enteredReason = unescape(encodeURIComponent(document.getElementById("tpm-reason-input-" + i).value));
	     				// We don't use unescape here becase we only have to use it when it's "api", not "auto" - see TPM_GET_PASSWORD_ID
	     				var enteredReason = encodeURIComponent(document.getElementById("tpm-reason-input-" + i).value);
	     				if ( enteredReason ) {
	     					// Use the password and close
			    			chrome.runtime.sendMessage({id: "TPM_CS_USE_PASSWORD", pwdId: pId, pwdReason: enteredReason}, function(response) {
							}); // TPM_CS_USE_PASSWORD		
							$("#tpm-reason-div-" + i).hide();
	     					$("#tpm-reason-btn-" + i).show();
	     				}
			    	}
	  			})(i, pId);
			    reasonDiv.appendChild(okButton);

			    // Button to cancel
				var cancelButton = document.createElement("input");
				cancelButton.type = "button";
				cancelButton.value = chrome.i18n.getMessage("generalCancelButton"); // Cancel
				cancelButton.className = "btn btn-small";
				cancelButton.style = "margin-left: 10px"
				cancelButton.id = "tpm-cancel-btn-" + i;
				// http://stackoverflow.com/questions/30476721/passing-parameter-onclick-in-a-loop
				cancelButton.onclick = (function(i){ 
					return function () {
	     				$("#tpm-reason-div-" + i).hide();
	     				$("#tpm-reason-btn-" + i).show();
			    	}
	  			})(i);
			    reasonDiv.appendChild(cancelButton);

			pwdContainer.appendChild(reasonDiv);

			// Button to enter the reason
			var pbutton = document.createElement("input");
			pbutton.type = "button";
			pbutton.value = chrome.i18n.getMessage("lsLockedEnterReasonUnlockUse"); // "Locked: enter reason to unlock and use";
			pbutton.className = "btn btn-small";
			pbutton.id = "tpm-reason-btn-" + i;
			// http://stackoverflow.com/questions/30476721/passing-parameter-onclick-in-a-loop
			pbutton.onclick = (function(i){ 
				return function () {
     				$("#tpm-reason-div-" + i).show();
					$("#tpm-reason-input-" + i).focus();
		    		$(this).hide();
		    	}
  			})(i);
		    pwdContainer.appendChild(pbutton);
		} else {
			// Username or email
			var usernameEmail = "";
			var imgUser = document.createElement("img");
			imgUser.src = "../../img/username.png";
			imgUser.style = "float:left; margin-right: 5px";
			pwdContainer.appendChild(imgUser);
			var pElem = document.createElement("p");
			pElem.style.margin = 0;

			usernameEmail = pwdList[i].username;
			if ( usernameEmail ) {
				if ( pwdList[i].email ) {
					usernameEmail += " / " + pwdList[i].email;
				}
			} else {
				if ( pwdList[i].email ) {
					usernameEmail = pwdList[i].email;
				} else {
					usernameEmail = "(" + chrome.i18n.getMessage("lsNoUsernameEmail") + ")"; // no username or email
				}
			}

			pElem.textContent = usernameEmail; // no need to escapeHtml because it's textContent
			pwdContainer.appendChild(pElem);

			// Access info
			if ( pwdList[i].access_info ) {
				var imgAccess = document.createElement("img");
				imgAccess.src = "../../img/world_go.png";
				imgAccess.style = "float:left; margin-right: 5px";
				pwdContainer.appendChild(imgAccess);
				var pAccess = document.createElement("p");
				pAccess.style = "margin: 0; word-wrap: break-word; font-weight: bold";
				pAccess.textContent = pwdList[i].access_info; // no need to escapeHtml because it's textContent
				pwdContainer.appendChild(pAccess);
			}

			// Tags?
			if ( pwdList[i].tags ) {
				var pTags = document.createElement("p");
				var strCommaTags = pwdList[i].tags;
				var arrTags = strCommaTags.split(',');
				var strTags = "";
				for (var arri = 0; arri < arrTags.length; arri++) {
					strTags += '<span class="label tpm-label-in-list">' + escapeHtml(arrTags[arri]) + '</span>';
				}
				
				const pTags716 = strTags;
				const parsed716 = parser.parseFromString(pTags716, `text/html`);
				const tags716 = parsed716.getElementsByTagName("body");
				pTags.innerHTML = ``;
				for (const tag of tags716) {
					pTags.appendChild(tag);
				}

				pTags.style.margin = 0;
				pwdContainer.appendChild(pTags);
			}
		} // locked?

		// Add the pwdContainer to the container of the list
		containerElements.appendChild(pwdContainer);
	} // foreach password found
	
	// Resize the iframe
	chrome.runtime.sendMessage({id: "TPM_CS_RESIZE_IFRAME", numPasswords: numPasswordsList}, function(response) {
	}); // TPM_CS_RESIZE_IFRAME

} // listPasswords

// Lists the passwords in pwdList (an array returned from calls to TPM_GET_MY_PASSWORDS_URL)
function listMyPasswords ( pwdList ) {
	// Create the elements
	var containerElements = document.getElementById("tpmLoginSelectorPasswordsContainer");

	const parser = new DOMParser();

	var numPasswordsList = pwdList.length;
	for ( var i=0; i<numPasswordsList; i++ ) {
		var pId = pwdList[i].id; // Being used below

		// Container for the password item
		var pwdContainer = document.createElement("div");
		pwdContainer.style = "font-size: 13px";
		pwdContainer.className = "tpm-pwd-container";
		pwdContainer.id = "tpm-pwd-container-" + pId;

		// Name
		var imgPwd = document.createElement("img");
		imgPwd.src = "../../img/password.png";
		imgPwd.style = "float:left; margin-right: 5px";
		pwdContainer.appendChild(imgPwd);
		
		var pName = document.createElement("p");
		
		const pName754 = "<a class='tpm_use_my_password' id='" + pwdList[i].id + "' href='#'>" + "<strong>" + escapeHtml(pwdList[i].name) + "</strong>" + "</a>";
		const parsed754 = parser.parseFromString(pName754, `text/html`);
		const tags754 = parsed754.getElementsByTagName("body");
		pName.innerHTML = ``;
		for (const tag of tags754) {
			pName.appendChild(tag);
		}
		
		pName.style.margin = 0;
		pName.onclick = (function(i, pId){  // Use the password
			return function () {
				chrome.runtime.sendMessage({id: "TPM_CS_USE_MY_PASSWORD", pwdId: pId}, function(response) {});
	    	}
		})(i, pId);
		pwdContainer.appendChild(pName);
	
		// Username or email
		var usernameEmail = "";
		var imgUser = document.createElement("img");
		imgUser.src = "../../img/username.png";
		imgUser.style = "float:left; margin-right: 5px";
		pwdContainer.appendChild(imgUser);
		var pElem = document.createElement("p");
		pElem.style.margin = 0;

		usernameEmail = pwdList[i].username;
		if ( usernameEmail ) {
			if ( pwdList[i].email ) {
				usernameEmail += " / " + pwdList[i].email;
			}
		} else {
			if ( pwdList[i].email ) {
				usernameEmail = pwdList[i].email;
			} else {
				usernameEmail = "(" + chrome.i18n.getMessage("lsNoUsernameEmail") + ")"; // "(no username or email)";
			}
		}

		pElem.textContent = usernameEmail; // no need to escapeHtml because it's textContent
		pwdContainer.appendChild(pElem);

		// Access info
		if ( pwdList[i].access_info ) {
			var imgAccess = document.createElement("img");
			imgAccess.src = "../../img/world_go.png";
			imgAccess.style = "float:left; margin-right: 5px";
			pwdContainer.appendChild(imgAccess);
			var pAccess = document.createElement("p");
			pAccess.style = "margin: 0; word-wrap: break-word; font-weight: bold";
			pAccess.textContent = pwdList[i].access_info; // no need to escapeHtml because it's textContent
			pwdContainer.appendChild(pAccess);
		}

		// Tags?
		if ( pwdList[i].tags ) {
			var pTags = document.createElement("p");
			var strCommaTags = pwdList[i].tags;
			var arrTags = strCommaTags.split(',');
			var strTags = "";
			for (var arri = 0; arri < arrTags.length; arri++) {
				strTags += '<span class="label tpm-label-in-list">' + escapeHtml(arrTags[arri]) + '</span>';
			}
			
			const pTags809 = strTags;
			const parsed809 = parser.parseFromString(pTags809, `text/html`);
			const tags809 = parsed809.getElementsByTagName("body");
			pTags.innerHTML = ``;
			for (const tag of tags809) {
				pTags.appendChild(tag);
			}

			pTags.style.margin = 0;
			pwdContainer.appendChild(pTags);
		}

		// Add the pwdContainer to the container of the list
		containerElements.appendChild(pwdContainer);			
	} // foreach password found
	
	// Resize the iframe
	chrome.runtime.sendMessage({id: "TPM_CS_RESIZE_IFRAME", numPasswords: numPasswordsList}, function(response) {
	}); // TPM_CS_RESIZE_IFRAME

} // listMyPasswords

function localizeHtmlPage() {
    //Localize by replacing __MSG_***__ meta tags
    var objects = document.getElementsByTagName('html');
    for (var j = 0; j < objects.length; j++)
    {
        var obj = objects[j];

        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
        {
            return v1 ? chrome.i18n.getMessage(v1) : "";
        });

        if(valNewH != valStrH)
        {
            obj.innerHTML = valNewH;
        }
    }
}

// http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

