// Team Password Manager Browser Extension popup script
// (c) 2016-2022 Ferran Barba

// Page control variables for search
var searchCurrentPage = 0;
var searchNumItems = 0;
var searchNumPages = 0;
var searchNumItemsPerPage = 0;

var tpmSearchString = "";
var tpmSearchWhere = "";

$(document).ready(function(){ 

	localizeHtmlPage();

	// popBE=BROWSER EXTENSION
	$('#tpm_extension_version').text(chrome.i18n.getMessage("popBE") + " v. " + chrome.runtime.getManifest().version); 

	// If connected, show connection data, otherwise connection form
	chrome.runtime.sendMessage({id: "TPM_CONNECTED"}, function(response) {
		if ( response ) {
			hideConnectionInstructions();
			hideLoginForm();
			// which tab is "active"?
			chrome.runtime.sendMessage({id: "TPM_GET_POPUP_TAB"}, function(response) {
				if ( response=="options" ) {
					showOptionsTab();
				} else {
					showSearchTab();
					// T#434 Get previously cached results
					get_cached_search_results();					
				}
			});			
		} else {
			showConnectionInstructions();
		}
	}); // is TPM_CONNECTED?

	$('#tpm_api_connect').on('click', function(){
   		showLoginForm();
   	});

	// Connect (login form submit)
   	$('#tpm_login_form').on('submit', function(e){
   		e.preventDefault();
   		throwError("")
   		var tpmUsername = $('#tpm_username').val();
   		var tpmUrl = $('#tpm_url').val();
   		var tpmPassword = $('#tpm_password').val();
   		var tpmSavePassword = $('#tpm_save_password').is(':checked');
   		var tpmOffer = $('#tpm_offer').is(':checked');
   		var tpmArchived = $('#tpm_archived').is(':checked');

   		if (!tpmUsername){
   			throwError(chrome.i18n.getMessage("popLoginErrorUsername")); // Please enter a username
   		} else if (!tpmPassword){
   			throwError(chrome.i18n.getMessage("popLoginErrorPassword")); // Please enter a password
   		} else if (!tpmUrl){
   			throwError(chrome.i18n.getMessage("popLoginErrorURL")); // Please enter the URL of your installation of Team Password Manager
   		} else {
   			chrome.runtime.sendMessage({id: "TPM_CONNECT", url:tpmUrl, username:tpmUsername, password:tpmPassword, save_password: tpmSavePassword, offer:tpmOffer, archived:tpmArchived}, function(response) {
				if ( response ) {
					throwError(response);	
				} else {
					hideLoginForm();
					// T#434 Cache empty search results
					cache_empty_search_results();					
					showSearchTab();
				}
			}); // TPM_CONNECT
   		} // TPM_CONNECT
   	});

   	$('#tpm_btn_disconnect').on('click', function(){
   		chrome.runtime.sendMessage({id: "TPM_DISCONNECT"}, function(response) {	});
   		window.close();
   	});

   	$('#tpm_btn_close').on('click', function(){
   		window.close();
   	});

   	// Select search tab
	$('#tpmPopupSearchTab').on('click', function(e){
		// T#435
		set_latest_visited_password();

		e.preventDefault();
		showSearchTab();
		// T#434 Get previously cached results
		get_cached_search_results();
		// Save current tab
		chrome.runtime.sendMessage({id: "TPM_SET_POPUP_TAB", tab:"search"}, function(response) {});
	}); // tpmPopupSearchTab click

   	// Select options tab
	$('#tpmPopupOptionsTab').on('click', function(e){
		// T#435
		set_latest_visited_password();

		e.preventDefault();
		showOptionsTab();		
		// Save current tab
		chrome.runtime.sendMessage({id: "TPM_SET_POPUP_TAB", tab:"options"}, function(response) {});
	}); // tpmPopupOptionsTab click

	// Search
   	$('#tpm_search_form').on('submit', function(e){
   		e.preventDefault();
   		throwError("")
   		tpmSearchString = $('#tpm_search_string').val();
   		tpmSearchWhere = $('#tpm_search_where').val();

   		if ( tpmSearchString ) {
   			set_latest_visited_password();

   			$("#tpm_search_results").show();
   			$("#tpm_search_results_main").show();
			emptySearchResults();
   			$("#tpm_img_wait_search").show();
   			$("#tpm_no_pwds_found").hide();
   			$("#tpm_num_passwords_found").hide();
   			$(".tpm_next_page").hide();
   			$(".tpm_previous_page").hide();

   			// Init variables
			searchCurrentPage = 0;
			searchNumItems = 0;
			searchNumPages = 0;
			searchNumItemsPerPage = 0;

   			// Count passwords and set pages
			chrome.runtime.sendMessage({id: "TPM_COUNT_SEARCH", search_string:tpmSearchString, search_where: tpmSearchWhere}, function(response) {

				if ( response ) {
					if ( response.numItems > 0 ) {

						searchNumItems = response.numItems;
						searchNumPages = response.numPages;
						searchNumItemsPerPage = response.numItemsPerPage;
						
						// Get password list from search (first page)
						chrome.runtime.sendMessage({id: "TPM_SEARCH", search_string:tpmSearchString, search_where: tpmSearchWhere, page:1}, function(response) {				

							$("#tpm_img_wait_search").hide();

							if ( response ) {
								if ( response.length > 0 ) {

									/*pwdLblStr = 'passwords';
									if ( response.length == 1 ) {
										pwdLblStr = 'password';
									}*/		
									$("#tpm_num_passwords_found").html(chrome.i18n.getMessage("popPasswordsFound") + ": <strong>" + searchNumItems + "</strong>");							
									$("#tpm_num_passwords_found").show();

									searchCurrentPage = 1;

									// Show next page?
									if ( searchNumPages > 1 ) {
										$(".tpm_next_page").show();
									}

									listSearch(response);

									// T#435 Set window position
									set_latest_visited_password();

									// T#434 Cache search results
									cache_search_results();
								}
							} // response from TPM_SEARCH
						}); // TPM_SEARCH

					} else {
						$("#tpm_img_wait_search").hide();
						$("#tpm_no_pwds_found").show();
						cache_empty_search_results();
					} // response.numItems
				} else {
					$("#tpm_img_wait_search").hide();
					$("#tpm_no_pwds_found").show();
					cache_empty_search_results();
				} // if response
			}); // TPM_COUNT_SEARCH

   		} else {
   			$("#tpm_search_results_main").hide();
   			// T#434 Cache empty search results
   			cache_empty_search_results();
   		}
   	}); // Search

   	// Next page
	$(document).on('click', '.tpm_next_page', function(e){
		// Check if can call next page
		if ( searchNumPages > searchCurrentPage ) {
			searchCurrentPage++;
			// Show / hide page links
			$(".tpm_previous_page").show();
			if ( searchNumPages == searchCurrentPage ) {
				$(".tpm_next_page").hide();		
			}

			$(".tpm_pagination").hide();
			$("#tpm_img_wait_page").show();
			
			emptySearchResults();

			// Get password list from search (first page)
			chrome.runtime.sendMessage({id: "TPM_SEARCH", search_string:tpmSearchString, search_where: tpmSearchWhere, page:searchCurrentPage}, function(response) {				

				$(".tpm_pagination").show();
				$("#tpm_img_wait_page").hide();

				if ( response ) {
					if ( response.length > 0 ) {
						if ( searchNumPages == searchCurrentPage ) {
							$(".tpm_next_page").hide();		
						} else {
							$(".tpm_next_page").show();		
						}

						listSearch(response);

						// T#434 Cache search results
						cache_search_results();
					}
				} // response from TPM_SEARCH
			}); // TPM_SEARCH

		} else {
			// Just in case
			$(".tpm_next_page").hide();	
		}
	}); // tpm_next_page.click

	// Previous page
	$(document).on('click', '.tpm_previous_page', function(e){
		// Check if can call previous page
		if ( searchCurrentPage != 1 ) {
			searchCurrentPage--;
			// Show / hide page links
			if ( searchNumPages > 1 ) {
				$(".tpm_next_page").show();	
			}
			if ( searchCurrentPage == 1 ) {
				$(".tpm_previous_page").hide();		
			}

			$(".tpm_pagination").hide();
			$("#tpm_img_wait_page").show();
			
			emptySearchResults();

			// Get password list from search (first page)
			chrome.runtime.sendMessage({id: "TPM_SEARCH", search_string:tpmSearchString, search_where: tpmSearchWhere, page:searchCurrentPage}, function(response) {				

				$(".tpm_pagination").show();
				$("#tpm_img_wait_page").hide();

				if ( response ) {
					if ( response.length > 0 ) {
						if ( searchNumPages == searchCurrentPage ) {
							$(".tpm_next_page").hide();		
						} else {
							$(".tpm_next_page").show();		
						}

						listSearch(response);

						// T#434 Cache search results
						cache_search_results();
					}
				} // response from TPM_SEARCH
			}); // TPM_SEARCH


		} else {
			// Just in case
			$(".tpm_previous_page").hide();	
		}
	}); // tpm_next_page.click

	$("#tpm_archived_check").change(function(){
		var tpmACState = false;
		if ( $("#tpm_archived_check").is(":checked") ) {
			tpmACState = true;
		}
		chrome.runtime.sendMessage({id: "TPM_SET_OPTION_ARCHIVED", value:tpmACState}, function(response) {});
	});

	$("#tpm_offer_check").change(function(){
		var tpmOState = false;
		if ( $("#tpm_offer_check").is(":checked") ) {
			tpmOState = true;
		}
		chrome.runtime.sendMessage({id: "TPM_SET_OPTION_OFFER", value:tpmOState}, function(response) {});
	});

	$("#tpm_search_where").change(function(){
		var tpmMyShared = $("#tpm_search_where").val();
		chrome.runtime.sendMessage({id: "TPM_SET_OPTION_MY_SHARED", value:tpmMyShared}, function(response) {});
	});

	// ***************** Events on the passwords list *****************

	// Click on URL 
	// The id of the password is the id of the element (class tpm_open_page_pwd)
	// The URL is in the title of the element
	$(document).on('click', '.tpm_open_page_pwd', function(e){
		e.preventDefault(); // If not, the position goes to the top of the page
		var actionOpenURL = "TPM_OPEN_URL";
		if ( tpmSearchWhere == "my" ) {
			actionOpenURL = "TPM_OPEN_MY_URL";
		}	
		var pId = $(this).attr("id");

		// T#435 Set window position
		set_latest_visited_password();

		var pUrl = $(this).attr("title");
		chrome.runtime.sendMessage({id:actionOpenURL, pwd_url:pUrl, pwd_id: pId, pwd_reason: ""}, function(response){});
	}); // tpm_open_page_pwd.click

	// Click on URL when the password is shown in full (not just the title/project)
	// In this case we take the aue (username/email) and apwd (password) from the data parameters to use them directly
	// The URL is in the title of the element
	$(document).on('click', '.tpm_open_page_pwd_shown', function(e){
		e.preventDefault(); // If not, the position goes to the top of the page
		
		// T#435 Set window position
		set_latest_visited_password();

		var pUrl = $(this).attr("title");
		var aue = $(this).attr("data-aue");
		var apwd = $(this).attr("data-apwd");
		chrome.runtime.sendMessage({id:"TPM_OPEN_URL_DIRECT", pwd_url:pUrl, pwd_ue: aue, pwd_pwd: apwd}, function(response){});
	}); // tpm_open_page_pwd_shown.click	

	// Expand (click no the more button) a password to show all the data
	$(document).on('click', '.tpm-more-btn', function(e){
		var i = $(this).attr("data-i");
		var pId = $(this).attr("data-pid");
		var isLocked = $(this).attr("data-locked");

		if ( isLocked=="1" ) {
			$("#tpm-unlock-btn-" + i).trigger("click");
		} else {
			// T#435 Set window position
			set_latest_visited_password();

			$(this).hide();
		    $("#tpm-morewait-" + i).show();
		    showPasswordInformation(i, pId);
		    // cache_search_results() must be called from within showPasswordInformation() as this function uses sendMessage	
		}

	}); // tpm-more-btn.click

	// Click on the less button of a password to hide all the data
	$(document).on('click', '.tpm-less-btn', function(e){
		var i = $(this).attr("data-i");
		var pId = $(this).attr("data-pid");
		var isLocked = $(this).attr("data-locked");

		if ( isLocked=="1" ) {
			$("#tpm-unlock-btn-" + i).show();
		}

		// T#435 Set window position
		set_latest_visited_password();

		$(this).hide();
		$("#tpm-more-btn-" + i).show();
		$("#tpm-info-div-" + i).empty();

		// T#434
	    cache_search_results();
	}); // tpm-less-btn.click	

	// Data tab
	$(document).on('click', '.tpmInfoTabDataA', function(e){
		var i = $(this).attr("data-i");

		$("#tpmInfoTabNotesA-" + i).css("line-height", "9px");
		$("#tpmInfoTabDataA-" + i).css("line-height", "10px");

		$("#tpm-infoData-" + i).show();
		$("#tpm-infoNotes-" + i).hide();

		$("#tpmInfoTabDataLi-" + i).addClass("active");
		$("#tpmInfoTabNotesLi-" + i).removeClass("active");

		// T#435 Set window position
		set_latest_visited_password();

		// T#434
	    cache_search_results();
	}); // tpmInfoTabDataA.click

	// Notes tab
	$(document).on('click', '.tpmInfoTabNotesA', function(e){
		var i = $(this).attr("data-i");

		$("#tpmInfoTabNotesA-" + i).css("line-height", "10px");
		$("#tpmInfoTabDataA-" + i).css("line-height", "9px");

		$("#tpm-infoData-" + i).hide();
		$("#tpm-infoNotes-" + i).show();

		$("#tpmInfoTabDataLi-" + i).removeClass("active");
		$("#tpmInfoTabNotesLi-" + i).addClass("active");

		// T#435 Set window position
		set_latest_visited_password();

		// T#434
	    cache_search_results();
	}); // tpmInfoTabDataA.click

	// More of notes fields
	$(document).on('click', '.tpm-notes-more', function(e){
		var av = $(this).attr("data-av");

		$("#tpm-notes-" + av).hide();
		$("#tpm-notes-less-" + av).show();
		document.getElementById("tpm-focus-btn-" + av).focus(); // so that focus doesn't go to the end of the notes

		// T#435 Set window position
		set_latest_visited_password();

		// T#434
	    cache_search_results();
	}); // tpm-notes-more.click

	// Less of notes fields
	$(document).on('click', '.tpm-notes-less', function(e){
		var av = $(this).attr("data-av");
		
		$("#tpm-notes-" + av).show();
		$("#tpm-notes-less-" + av).hide();		
		document.getElementById("tpm-focus-btn-" + av).focus();  // so that focus doesn't go to the end of the notes
		
		// T#435 Set window position
		set_latest_visited_password();

		// T#434
	    cache_search_results();
	}); // tpm-notes-less.click	

	// Show password fields
	$(document).on('click', '.tpm-pshow-a', function(e){
		var av = $(this).attr("data-av");
		
		$("#tpm-pshow-" + av).hide();
		// Don't use show as it will put the "hide" button in the next line
		$("#tpm-phide-" + av).css("display", "inline");

		// T#435 Set window position
		set_latest_visited_password();

		// T#434
	    cache_search_results();
	}); // tpm-pshow.click

	// Hide password fields
	$(document).on('click', '.tpm-phide-a', function(e){
		var av = $(this).attr("data-av");

		$("#tpm-phide-" + av).hide();
		// Don't use show as it will put the "hide" button in the next line
		$("#tpm-pshow-" + av).css("display", "inline");

		// T#435 Set window position
		set_latest_visited_password();

		// T#434
	    cache_search_results();
	}); // tpm-phide.click

	// Keep the position when the user scrolls
	$(window).scroll(function(){
		// T#435 Set window position
		set_latest_visited_password();
	});

	// T#436 Copy to clipboard
	var clipboard = new ClipboardJS('.tpm-cc');

	clipboard.on('success', function(e) {
	    $(e.trigger).tooltip('destroy');
		$(e.trigger).tooltip({title:chrome.i18n.getMessage("ccCopied"), placement:'right'}); // Copied
		$(e.trigger).tooltip('show');

	    e.clearSelection();
	});

	clipboard.on('error', function(e) {
	    $(e.trigger).tooltip('destroy');
		$(e.trigger).tooltip({title:chrome.i18n.getMessage("ccError"), placement:'right'}); // Error copying to clipboard
		$(e.trigger).tooltip('show');
	});

	// T#436 Tooltips when entering and leaving a tpm-cc icon
	$(document).on('mouseenter', '.tpm-cc', function(e){
		$(this).tooltip('destroy');
		$(this).tooltip({title:chrome.i18n.getMessage("ccCopy"), placement:'right'}); // Copy to clipboard
		$(this).tooltip('show');
	}); // tpm-cc.mouseenter

	$(document).on('mouseleave', '.tpm-cc', function(e){
		$(this).tooltip('destroy');
	}); // tpm-cc.mouseleave

	// Unlock button
	$(document).on('click', '.tpm-unlock-btn', function(e){
		var i = $(this).attr("data-i");

		$(this).hide();
		$("#tpm-reason-div-" + i).show();
		$("#tpm-reason-input-" + i).focus();

		// T#435 Set window position
		set_latest_visited_password();

		// T#434
	    cache_search_results();
	}); // tpm-unlock-btn.click

	// Keyup on reason input: enter (unlock)
	$(document).on('keyup', '.tpm-reason-input', function(e){
		var i = $(this).attr("data-i");

		if (e.keyCode == 13) { // enter
			$("#tpm-ok-btn-" + i).trigger("click");
		}

		// T#435 Set window position
		set_latest_visited_password();

		// T#434
	    cache_search_results();
	}); // tpm-reason-input.keyup

	// Cancel reason
	$(document).on('click', '.tpm-cancel-btn', function(e){
		var i = $(this).attr("data-i");

		$("#tpm-reason-div-" + i).hide();
		$("#tpm-unlock-btn-" + i).show();

		// T#435 Set window position
		set_latest_visited_password();

		// T#434
	    cache_search_results();
	}); // tpm-cancel-btn.click

	// Ok reason
	$(document).on('click', '.tpm-ok-btn', function(e){
		var i = $(this).attr("data-i");
		var pId = $(this).attr("data-pid");

		// Check if a reason is entered
		// http://ecmanaut.blogspot.com.es/2006/07/encoding-decoding-utf8-in-javascript.html
		// http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
		//var enteredReason = unescape(encodeURIComponent(document.getElementById("tpm-reason-input-" + i).value));
		// We don't use unescape here becase we only have to use it when it's "api", not "auto" - see TPM_GET_PASSWORD_ID
		var enteredReason = encodeURIComponent(document.getElementById("tpm-reason-input-" + i).value);
		if ( enteredReason ) {
			// Use the password and close
			$("#tpm-reason-div-" + i).hide();
			$("#tpm-more-btn-" + i).hide();
	    	$("#tpm-morewait-" + i).show();
	    	showPasswordInformation(i, pId, enteredReason);
	    }

		// T#435 Set window position
		set_latest_visited_password();

		// T#434
	    cache_search_results();
	}); // tpm-ok-btn.click
	
}); // $(document).ready(function(){ 

// T#434 Caches the html of the search results so that
// they can be shown when reopening the popup with get_cached_search_results()
function cache_search_results() {
	tpmSearchResultsHtml = $("#tpm_search_results_main").html();
	chrome.runtime.sendMessage({id: "TPM_SAVE_SEARCH_STATE", tpm_search_string:tpmSearchString, tpm_search_where:tpmSearchWhere, tpm_search_results_html:tpmSearchResultsHtml, searchCurrentPage: searchCurrentPage, searchNumItems: searchNumItems, searchNumPages: searchNumPages, searchNumItemsPerPage: searchNumItemsPerPage}, function(response){ });
}

// T#434 Cache empty search results
function cache_empty_search_results() {
	set_latest_visited_password();
	chrome.runtime.sendMessage({id: "TPM_SAVE_SEARCH_STATE", tpm_search_string:"", tpm_search_where:"", tpm_search_results_html:"", searchCurrentPage: 0, searchNumItems: 0, searchNumPages: 0, searchNumItemsPerPage: 0}, function(response){ });
}

// T#434 Get previously cached search results
function get_cached_search_results() {
	chrome.runtime.sendMessage({id: "TPM_GET_SEARCH_STATE"}, function(response) {
		if ( response ) {
			if ( response.tpm_search_string ) {
				$('#tpm_search_string').val(response.tpm_search_string);
				$('#tpm_search_where').val(response.tpm_search_where);
				$("#tpm_search_results_main").html(response.tpm_search_results_html);

				tpmSearchString = response.tpm_search_string;
				tpmSearchWhere = response.tpm_search_where;

				searchCurrentPage = response.searchCurrentPage;
				searchNumItems = response.searchNumItems;
				searchNumPages = response.searchNumPages;
				searchNumItemsPerPage = response.searchNumItemsPerPage;

				// T#435 Go to the latest visited position
				goto_latest_visited_password();
			}							
		}	
	}); // TPM_GET_SEARCH_STATE
}

// T#435 Keeps track of the scroll position to go to it when the pop up is reopened
// It's called when some interaction occurs in a password (Expand, collapse, copy to clipboard, open, etc.)
// See get_cached_search_results() and goto_latest_visited_password()
function set_latest_visited_password ( ) {
	var spos = $(window).scrollTop();
	chrome.runtime.sendMessage({id: "TPM_SET_LATEST_VISITED_PWD", latest_visited_password:spos}, function(response){ });
}

// T#435 Puts the latest visited password into view (in fact, it puts the saved scroll position)
// See set_latest_visited_password()
function goto_latest_visited_password ( ) {
	chrome.runtime.sendMessage({id: "TPM_GET_LATEST_VISITED_PWD"}, function(response) {
		if ( response ) {
			$(window).scrollTop(response || 0)
		}	
	}); // TPM_GET_LATEST_VISITED_PWD
}


function throwError(error){
	$('#tpm_errors').html('<p class="error">' + error + '</p>');
	return false;
}

function hideLoginForm() {
	$('#tpm_login_form').hide();
}

function showLoginForm() {
	chrome.runtime.sendMessage({id: "TPM_CONNECTION_DATA"}, function(response) {
		$("#tpm_url").val(response.url);
		$("#tpm_username").val(response.username);
		$("#tpm_password").val(response.password_to_save);
		$("#tpm_save_password").prop('checked', response.save_password);
		$("#tpm_offer").prop('checked', response.offer);
		$("#tpm_archived").prop('checked', response.archived);
	}); // TPM_CONNECTION_DATA

	$('#tpm_login_form').show();

	$('#tpm_connection_instructions').hide();
	$('#tpmPopupTabs').hide();
	$('#tpm_connection_data').hide();
	$('#tpm_search').hide();
}

function hideConnectionInstructions() {
	$('#tpm_connection_instructions').hide();
}

function showConnectionInstructions() {
	$('#tpm_connection_instructions').show();
	$('#tpm_login_form').hide();
	$('#tpmPopupTabs').hide();
	$('#tpm_connection_data').hide();
	$('#tpm_search').hide();
}

function showOptionsTab ( ) {
	$('#tpmPopupTabs').show();
	$("#tpmPopupSearchLi").removeClass("active");
	$("#tpmPopupOptionsLi").addClass("active");

	$('#tpm_connection_data').show();

	$('#tpm_search').hide();
	showConnectionData();
}

function showSearchTab ( ) {
	$('#tpmPopupTabs').show();
	$("#tpmPopupSearchLi").addClass("active");
	$("#tpmPopupOptionsLi").removeClass("active");

	// Save current tab
	chrome.runtime.sendMessage({id: "TPM_SET_POPUP_TAB", tab:"search"}, function(response) {});

	// Check if personal passwords are allowed
	chrome.runtime.sendMessage({id: "TPM_MY_ALLOWED"}, function(response) {
		if ( ! response ) {
			$("#tpm_search_where").hide();
			$("#tpm_search_string").width("200px");
		} else {
			// T#612 Set my/shared depending on the saved option
			chrome.runtime.sendMessage({id: "TPM_GET_MY_SHARED"}, function(response) {
				if ( response=="my" ) {
					$("#tpm_search_where").val("my"); // my/shared	
				} else {
					$("#tpm_search_where").val("shared");
				}
			}); // TPM_GET_MY_SHARED
		}
	}); // TPM_MY_ALLOWED

	$('#tpm_connection_data').hide();
	$('#tpm_search').show();

	$("#tpm_search_string").focus();
}

function showConnectionData() {
	chrome.runtime.sendMessage({id: "TPM_CONNECTION_DATA"}, function(response) {
		$("#tpm_cd_url").html('<a target="_blank" href="' + response.url + '">' + response.url + '</a>');
		$("#tpm_cd_username").html(response.username);
		if ( response.readOnly ) {
			$("#tpm_cd_offer").text("(cannot be changed: read only user)");
			$("#tpm_offer_check").prop("checked", false);
			$("#tpm_offer_check").attr("disabled", true);
		} else {
			if ( response.offer ) {
				$("#tpm_offer_check").prop("checked", true);
			} else {
				$("#tpm_offer_check").prop("checked", false);
			}	
		}	
		if ( response.archived ) {
			$("#tpm_archived_check").prop("checked", true);
		} else {
			$("#tpm_archived_check").prop("checked", false);
		}	
		$("#tpm_btn_disconnect").show();
	}); // TPM_CONNECTION_DATA
} // showConnectionData()

function emptySearchResults ( ) {
	$("#tpm_search_results").empty();
}

function listSearch ( pwdList ) {
	// Create the elements
	var containerElements = document.getElementById("tpm_search_results");

	// To parse the elements for T#467
	const parser = new DOMParser();

	var numPasswordsList = pwdList.length;
	for ( var i=0; i<numPasswordsList; i++ ) {
		var pId = pwdList[i].id; // Being used below

		// Container for the password item
		var pwdContainer = document.createElement("div");
		pwdContainer.style = "font-size: 13px";
		pwdContainer.className = "tpm-pwd-container";
		pwdContainer.id = "tpm-pwd-container-" + i;

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
		pName.style = "float:left; font-size: 14px; font-weight: bold";
		pName.id = "pwd" + pwdList[i].id;
		var urlTitle = "";
		// Locked?
		var pwdLocked = false;
		if ( pwdList[i].locked ) {
			pwdLocked = true;
			urlTitle = "(" + chrome.i18n.getMessage("generalLocked") + ")"; // locked
		} else {
			urlTitle = pwdList[i].access_info;
		}
		if ( pwdList[i].access_info ) {
			var arrUrl = urlTitle.split("/");
			var protUrl = arrUrl[0].toLowerCase();
			if ( protUrl=="http:" || protUrl=="https:" || protUrl=="ftp:" || protUrl=="ftps:" || protUrl=="sftp:" ) {

				// T#782 Only use the first url
				let urlsTitle = urlTitle.split(",");
				let firstUrl = urlsTitle[0];
				
				// T#467
				const pName765 = "<a class='tpm_open_page_pwd' id='" + pwdList[i].id + "' title='" + escapeHtml(firstUrl) + "' href='#'>" + escapeHtml(pwdList[i].name) + "</a>";
				const parsed765 = parser.parseFromString(pName765, `text/html`);
				const tags765 = parsed765.getElementsByTagName("body");
				pName.innerHTML = ``;
				for (const tag of tags765) {
					pName.appendChild(tag);
				}

			} else {
				pName.textContent = pwdList[i].name;
			}
		} else {
			pName.textContent = pwdList[i].name;
		}
		pName.style.margin = 0;
		pwdContainer.appendChild(pName);

		// Expand
		var pMore = document.createElement("input");
		pMore.type = "button";
		pMore.value = "+";
		pMore.style="margin-left: 5px; margin-bottom: 3px; background-image:none; font-weight: bold; font-size: 12px; line-height: 15px; padding-left: 5px; padding-right: 5px; padding-bottom: 2px";
		pMore.className = "tpm-more-btn btn btn-mini";
		pMore.id = "tpm-more-btn-" + i;
		pMore.setAttribute("data-pid", pId.toString());
		pMore.setAttribute("data-i", i.toString());
		if ( pwdList[i].locked ) {
			pMore.setAttribute("data-locked", "1");
		} else {
			pMore.setAttribute("data-locked", "0");
		}
	    pwdContainer.appendChild(pMore);

	    // Collapse
	    var pLess = document.createElement("input");
		pLess.type = "button";
		pLess.value = "-";
		pLess.style="display:none; margin-left: 5px; margin-bottom: 3px; background-image:none; font-weight: bold; font-size: 12px; line-height: 15px; padding-left: 5px; padding-right: 5px; padding-bottom: 2px";
		pLess.className = "tpm-less-btn btn btn-mini";
		pLess.id = "tpm-less-btn-" + i;
		pLess.setAttribute("data-pid", pId.toString());
		pLess.setAttribute("data-i", i.toString());
		if ( pwdList[i].locked ) {
			pLess.setAttribute("data-locked", "1");
		} else {
			pLess.setAttribute("data-locked", "0");
		}
	    pwdContainer.appendChild(pLess);

	    // Wait icon when expand is pressed
	    var imgMoreWait = document.createElement("img");
	    imgMoreWait.id = "tpm-morewait-" + i;
		imgMoreWait.src = "../../img/wait.gif";
		// "margin-bottom: 3px" prevents a little jump up of the project name when the expand button is pressed
		imgMoreWait.style = "margin-left: 5px; padding-bottom: 3px; display: none; margin-bottom: 3px";
		pwdContainer.appendChild(imgMoreWait);	

		var divClearFloat = document.createElement("div");
		divClearFloat.style="float:none";
		pwdContainer.appendChild(divClearFloat);
		
		// Project name
		if ( tpmSearchWhere != "my" ) {
			var imgPrj = document.createElement("img");
			imgPrj.src = "../../img/project.png";
			imgPrj.style = "float:left; margin-right: 5px";
			pwdContainer.appendChild(imgPrj);
			
			var pName = document.createElement("p");
			var pwdArchived = "";
			if ( pwdList[i].archived ) {
				pwdArchived = ' <span class="label label-warning tpm-archived">A</span>';
			}
			
			// T#467 
			const pName841 = escapeHtml(pwdList[i].project_name) + pwdArchived;
			const parsed841 = parser.parseFromString(pName841, `text/html`);
			const tags841 = parsed841.getElementsByTagName("body");
			pName.innerHTML = ``;
			for (const tag of tags841) {
				pName.appendChild(tag);
			}

			pName.style.margin = 0;
			pwdContainer.appendChild(pName);
		}
		
		// Locked?
		if ( pwdList[i].locked ) {
			// Locked

			// Div to enter the reason (hidden)
			var reasonDiv = document.createElement("div");
			reasonDiv.style = "display:none; margin-top: 3px; padding: 14px 14px 16px 14px; background-color: #eee;";
			reasonDiv.className = "tpm-reason-div";
			reasonDiv.id = "tpm-reason-div-" + i;
			reasonDiv.setAttribute("data-i", i.toString());

				// Reason text
				var reasonP = document.createElement("p");
				reasonP.textContent = chrome.i18n.getMessage("generalEnterReasonUnlock"); // "Enter reason to unlock:";
				reasonP.style = "margin-bottom: 6px; font-size: 13px";
				reasonDiv.appendChild(reasonP);

				// Reason input
				var reasonInput = document.createElement("input");
				reasonInput.type = "text";
				reasonInput.maxLength = 200;
				reasonInput.style = "margin-bottom: 0; font-size: 13px; width: 265px;";
				reasonInput.className = "tpm-reason-input";
				reasonInput.id = "tpm-reason-input-" + i;
				reasonInput.setAttribute("data-i", i.toString());		
				reasonDiv.appendChild(reasonInput);

				// Button to accept the reason
				var okButton = document.createElement("input");
				okButton.type = "button";
				okButton.value = chrome.i18n.getMessage("generalUnlockButton"); // "Unlock";
				okButton.className = "btn btn-small1 tpm-ok-btn";
				okButton.style = "margin-left: 10px; font-size: 13px"
				okButton.id = "tpm-ok-btn-" + i;
				okButton.setAttribute("data-i", i.toString());
				okButton.setAttribute("data-pid", pId.toString());
			    reasonDiv.appendChild(okButton);

			    // Button to cancel
				var cancelButton = document.createElement("input");
				cancelButton.type = "button";
				cancelButton.value = chrome.i18n.getMessage("generalCancelButton"); // "Cancel";
				cancelButton.className = "btn tpm-cancel-btn";
				cancelButton.style = "margin-left: 10px; font-size: 13px"
				cancelButton.id = "tpm-cancel-btn-" + i;
				cancelButton.setAttribute("data-i", i.toString());
			    reasonDiv.appendChild(cancelButton);

			pwdContainer.appendChild(reasonDiv);

			// Button to enter the reason
			var pbutton = document.createElement("input");
			pbutton.type = "button";
			pbutton.value = chrome.i18n.getMessage("generalUnlockButtonEnterReason"); //"Locked: enter reason to unlock";
			pbutton.className = "btn btn-small tpm-unlock-btn";
			pbutton.style = "margin-top: 3px";
			pbutton.id = "tpm-unlock-btn-" + i;
			pbutton.setAttribute("data-i", i.toString());
		    pwdContainer.appendChild(pbutton);
		} else {
			// Tags?
			if ( pwdList[i].tags ) {
				var pTags = document.createElement("p");
				pTags.style="margin:0; padding-top: 3px";
				var strCommaTags = pwdList[i].tags;
				var arrTags = strCommaTags.split(',');
				var strTags = "";
				for (var arri = 0; arri < arrTags.length; arri++) {
					strTags += '<span class="label tpm-label-in-list">' + escapeHtml(arrTags[arri]) + '</span>';
				}
				
				// T#467 
				const pTags916 = strTags;
				const parsed916 = parser.parseFromString(pTags916, `text/html`);
				const tags916 = parsed916.getElementsByTagName("body");
				pTags.innerHTML = ``;
				for (const tag of tags916) {
					pTags.appendChild(tag);
				}

				pwdContainer.appendChild(pTags);
			}			
		} // locked?	

		// Password information when expanded
		var infoDiv = document.createElement("div");
		infoDiv.style = "display:none";
		infoDiv.className = "tpm-info-div";
		infoDiv.id = "tpm-info-div-" + i;
		pwdContainer.appendChild(infoDiv);	

		// Add the pwdContainer to the container of the list
		containerElements.appendChild(pwdContainer);	

	} // foreach password found

} // listSearch

/* Creates the password tabs:
	<ul id="tpmInfoTab-i" class="nav nav-tabs">
		<li id="tpmInfoTabDataLi-i" class="active">
		 	<a id="tpmInfoTabDataA-i" style="cursor:pointer">Data</a>
		</li>
		<li id="tpmInfoTabNotesLi-i">
			<a id="tpmInfoTabNotesA-i" style="cursor:pointer">Notes</a>
		</li>
	</ul>
*/
function createPasswordTabs ( i, hasNotes, infoDivShow ) {

	var ulTab = document.createElement("ul");
	ulTab.id = "tpmInfoTab-" + i;
	ulTab.className = "nav nav-tabs";
	ulTab.style = "margin-top: 9px; margin-bottom: 7px";

		// Data
		var liTabData = document.createElement("li");
		liTabData.id = "tpmInfoTabDataLi-" + i;
		liTabData.className = "active";		

			var aTabData = document.createElement("a");
			aTabData.id = "tpmInfoTabDataA-" + i;
			aTabData.className = "tpmInfoTabDataA";
			aTabData.setAttribute("data-i", i.toString());
			aTabData.style="background-color:white; line-height: 10px; cursor:pointer";
			var textData = document.createTextNode(chrome.i18n.getMessage("pwdTabData")); // Data
            aTabData.appendChild(textData);
            liTabData.appendChild(aTabData);

		ulTab.appendChild(liTabData);

		// Notes
		if ( hasNotes ) {
			var liTabNotes = document.createElement("li");
			liTabNotes.id = "tpmInfoTabNotesLi-" + i;
			
				var aTabNotes = document.createElement("a");
				aTabNotes.id = "tpmInfoTabNotesA-" + i;
				aTabNotes.className = "tpmInfoTabNotesA";
				aTabNotes.setAttribute("data-i", i.toString());
				aTabNotes.style="background-color: white; line-height: 9px; cursor:pointer";
				var textNotes = document.createTextNode(chrome.i18n.getMessage("pwdTabNotes")); // Notes
	            aTabNotes.appendChild(textNotes);
	            liTabNotes.appendChild(aTabNotes);

			ulTab.appendChild(liTabNotes);

		} // hasNotes

	infoDivShow.appendChild(ulTab);	

} // createPasswordTabs

// T#782 Gets the access field url, for each of the urls (separated by comma)
// Called only from showPasswordField()
function getAccessField ( urlValue, aue, apwd ) {
	// Stripe the leading \n if any
	let fieldValue = urlValue.replace('\n', '').trim();

	let arrUrl = fieldValue.split("/");
	let protUrl = arrUrl[0].toLowerCase();

	// T#436 Copy to clipboard
	let strCC = "<a class='tpm-cc' data-clipboard-text='" + escapeHtml(fieldValue) + "' style='cursor:pointer; margin-left: 5px;'><img style='margin-bottom: 3px' src='../../img/copyclipboard.png' /></a>";
	let pValue1130 = "";

	if ( protUrl=="http:" || protUrl=="https:" || protUrl=="ftp:" || protUrl=="ftps:" || protUrl=="sftp:" ) {	
		pValue1130 = "<a class='tpm_open_page_pwd_shown' data-aue='" + aue + "' data-apwd='" + apwd + "' title='" + escapeHtml(fieldValue) + "' href='#'>" + escapeHtml(fieldValue) + "</a>" + strCC + "<br/>";
	} else {
		pValue1130 = escapeHtml(fieldValue) + strCC + "<br/>";
	}

	return pValue1130;
} // getAccessField

// Shows a password field (access, username, etc.)
// Called from showPasswordInformation()
// fieldType:
// 		normal: don't do any treatment to the field (just escapeHtml)
//		access_info: access_info field, check http/s and functionality to open url
// 		password: password field (font and show button)
// 		additionalValue: any other additional value
//		accessUE, accessPwd: only for access field: username/email and password
// Returns: 0=no value is shown (fieldValue), 1=a value is shown
function showPasswordField ( imageField, labelField, fieldValue, containerDiv, fieldType="normal", additionalValue=null, accessUE=null, accessPwd=null) {
	var ret = 0;

	// To parse the elements for T#467
	const parser = new DOMParser();

	if ( fieldValue ) {
		ret = 1;

		if ( imageField ) {
			var imgIcon = document.createElement("img");
			imgIcon.src = "../../img/" + imageField;	
			imgIcon.style = "float:left; margin-right: 5px";
			containerDiv.appendChild(imgIcon);
		}
		
		var lbl = document.createElement("p");
		lbl.style = "float:left; margin-bottom: 0; line-height: 18px; font-weight: bold; margin-right: 5px";
		lbl.textContent = labelField + ":";
		containerDiv.appendChild(lbl);

		// Button to receive focus when less is pressed
		if ( fieldType=="notes" ) {
			if ( fieldValue.length > 30 ) {
				var bFocus = document.createElement("input");
				bFocus.type = "button";
				bFocus.style = "float:left; height:0px; width:0px; border: 0; opacity: 0; padding: 0; margin: 0";
				bFocus.id = "tpm-focus-btn-" + additionalValue;
				containerDiv.appendChild(bFocus);
			}
		}

		// Value (give bottom margin to avoid the fields being tabbed)
		var pValue = null;
		if ( fieldType != "password") {
			pValue = document.createElement("p");
			pValue.style = "margin-bottom: 3px";
		}		

		// T#436 Copy to clipboard (different in each field)
		var strCC = "";

		if ( fieldType == "access_info" ) {
			pValue.id = "tpm-access-" + additionalValue;
			pValue.innerHTML = ``;

			var aue = "";
			var apwd = "";
			if ( accessUE ) {
				aue = escapeHtml(accessUE);
			}
			if ( accessPwd ) {
				apwd = escapeHtml(accessPwd);
			}

			// T#782 Split each url by comma and show it
			let urlsAccess = fieldValue.split(",");
			let pValue1130 = "";
			let parsed1130;
			let tags1130;

			urlsAccess.forEach((element) => {
				if ( element ) {
					pValue1130 = getAccessField(element, aue, apwd);

					parsed1130 = parser.parseFromString(pValue1130, `text/html`);
					tags1130 = parsed1130.getElementsByTagName("body");					
					for (const tag of tags1130) {
						tag.style = "background-color: rgb(245, 245, 245); font-size: 13px";
						pValue.appendChild(tag);
					}		
				}			
			});

		} else if ( fieldType == "password" ) {
			//pValue.style = "margin-bottom: 3px; font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; display:none";
			//pValue.id = "tpm-pwd-datum-" + additionalValue;
			//pValue.textContent = fieldValue;

			// DO NOTHING, MANAGED BELOW

		} else if ( fieldType == "expiry" ) {
			expiry_label = ""
			switch ( additionalValue ) {
				case 1:
					expiry_label = '&nbsp;<span style="font-weight: normal" class="label label-important">' + chrome.i18n.getMessage("generalExpiresToday") + '</span>'; // Expires today
					break;
				case 2:
					expiry_label = '&nbsp;<span style="font-weight: normal" class="label label-important">' + chrome.i18n.getMessage("generalExpired") + '</span>'; // Expired
					break;
				case 3:
					expiry_label = '&nbsp;<span style="font-weight: normal" class="label label-warning">' + chrome.i18n.getMessage("generalWillExpireSoon") + '</span>'; // Will expire soon
					break;
			}

			// T#467
			const pValue1151 = escapeHtml(fieldValue) + expiry_label;
			const parsed1151 = parser.parseFromString(pValue1151, `text/html`);
			const tags1151 = parsed1151.getElementsByTagName("body");
			pValue.innerHTML = ``;
			for (const tag of tags1151) {
				tag.style = "background-color: rgb(245, 245, 245); font-size: 13px";
				pValue.appendChild(tag);
			}

		} else if ( fieldType == "notes" ) {
			pValue.id = "tpm-notes-" + additionalValue;
			if ( fieldValue.length > 30 ) {
				pValue.style = "margin-bottom: 3px;";
				pValue.setAttribute("data-av", additionalValue);
				
				// T#467
				const pValue1204 = escapeHtml(fieldValue).substring(0,30) + "...&nbsp;<a class='tpm-notes-more' data-av='" + additionalValue + "' style='cursor:pointer'>" + chrome.i18n.getMessage("generalMore") + " >></a>"; // more
				const parsed1204 = parser.parseFromString(pValue1204, `text/html`);
				const tags1204 = parsed1204.getElementsByTagName("body");
				pValue.innerHTML = ``;
				for (const tag of tags1204) {
					tag.style = "background-color: rgb(245, 245, 245); font-size: 13px";
					pValue.appendChild(tag);
				}

			} else {
				pValue.style = "margin-bottom: 3px;";
				pValue.textContent = fieldValue;
			}
		} else {
			// T#436 Copy to clipboard
			strCC = "<a class='tpm-cc' data-clipboard-text='" + escapeHtml(fieldValue) + "' style='cursor:pointer; margin-left: 5px;'><img style='margin-bottom: 3px' src='../../img/copyclipboard.png' /></a>";
			
			// T#467
			const pValue1157 = escapeHtml(fieldValue) + strCC;
			const parsed1157 = parser.parseFromString(pValue1157, `text/html`);
			const tags1157 = parsed1157.getElementsByTagName("body");
			pValue.innerHTML = ``;
			for (const tag of tags1157) {
				tag.style = "background-color: rgb(245, 245, 245); font-size: 13px";
				pValue.appendChild(tag);
			}

		}

		if ( fieldType != "password") {
			containerDiv.appendChild(pValue);
		}

		// More/Less for notes if length > 30
		if ( fieldType=="notes" ) {
			if ( fieldValue.length > 30 ) {
				// Show full notes and the less link
				var lessNotes = document.createElement("p");
				lessNotes.id = "tpm-notes-less-" + additionalValue;
				lessNotes.style = "margin-bottom: 3px; display:none";
				lessNotes.setAttribute("data-av", additionalValue);

				// T#467
				const lessNotes1167 = nl2br(escapeHtml(fieldValue)) + "&nbsp;<a class='tpm-notes-less' data-av='" + additionalValue + "' style='cursor:pointer'><< " + chrome.i18n.getMessage("generalLess") + "</a>"; // less
				const parsed1167 = parser.parseFromString(lessNotes1167, `text/html`);
				const tags1167 = parsed1167.getElementsByTagName("body");
				lessNotes.innerHTML = ``;
				for (const tag of tags1167) {
					tag.style = "background-color: rgb(245, 245, 245); font-size: 13px";
					lessNotes.appendChild(tag);
				}

				containerDiv.appendChild(lessNotes);	
			} // if ( fieldValue > 30 )
		} // fieldType=="notes"

		// Show/hide for passwords
		if ( fieldType == "password" ) {
			// Show button
			var pShow = document.createElement("p");
			pShow.id = "tpm-pshow-" + additionalValue;
			pShow.className = "tpm-pshow";
			pShow.setAttribute("data-av", additionalValue);
			pShow.style = "margin-bottom: 5px; display:inline";

			// T#436 Copy to clipboard
			strCC = "<a class='tpm-cc' data-clipboard-text='" + escapeHtml(fieldValue) + "' style='cursor:pointer; margin-left: 5px;'><img style='margin-bottom: 3px' src='../../img/copyclipboard.png' /></a>";
			
			// T#467
			// Do not use href='#' as it will jump to the top of page when clicking
			const pShow1179 = "<a data-av='" + additionalValue + "' class='tpm-pshow-a badge badge-info' style='font-weight:normal; background-color: #08c; cursor:pointer'>" + chrome.i18n.getMessage("generalShow") + "</a>" + strCC; // Show
			const parsed1179 = parser.parseFromString(pShow1179, `text/html`);
			const tags1179 = parsed1179.getElementsByTagName("body");
			pShow.innerHTML = ``;
			for (const tag of tags1179) {
				tag.style = "background-color: rgb(245, 245, 245); font-size: 13px";
				pShow.appendChild(tag);
			}

			containerDiv.appendChild(pShow);

			// Hide button
			var pHide = document.createElement("p");
			pHide.id = "tpm-phide-" + additionalValue;
			pHide.className = "tpm-phide";
			pHide.setAttribute("data-av", additionalValue);
			pHide.style = "margin-bottom: 5px; display:none; margin-left: 3px";
			
			strPwdValue = "<span id='tpm-pwd-datum-" + additionalValue + "' style='margin-right: 3px; font-family: Menlo, Monaco, Consolas, monospace'>" + escapeHtml(fieldValue) + "</span>";
			
			// T#467
			// Do not use href='#' as it will jump to the top of page when clicking
			const pHide1278 = strPwdValue + "<a data-av='" + additionalValue + "' class='tpm-phide-a badge badge-info' style='font-weight:normal; background-color: #999; cursor:pointer'>" + chrome.i18n.getMessage("generalHide") + "</a>" + strCC; // Hide
			const parsed1278 = parser.parseFromString(pHide1278, `text/html`);
			const tags1278 = parsed1278.getElementsByTagName("body");
			pHide.innerHTML = ``;
			for (const tag of tags1278) {
				// display:inline so that the password doesn't jump to the next line
				tag.style = "background-color: rgb(245, 245, 245); font-size: 13px; display: inline";
				pHide.appendChild(tag);
			}

			containerDiv.appendChild(pHide);

			var divClearFloat = document.createElement("div");
			divClearFloat.style="float:none; margin-bottom: 3px";
			containerDiv.appendChild(divClearFloat);
		} // fieldType == "password"	

	} // if fieldvalue

	return ret
} // showPasswordField()

// Shows the password information in tpm-info-div-i
// Called from the tpm-more-btn.click event (dynamic) and tpm-ok-btn.click event (dynamic)
function showPasswordInformation ( i, pId, enteredReason="" ) {

	var where_id = "TPM_GET_PASSWORD_ID";
	if ( tpmSearchWhere == "my" ) {
		where_id = "TPM_GET_MY_PASSWORD_ID";
	}

	// To parse the elements for T#467
	const parser = new DOMParser();

	chrome.runtime.sendMessage({id: where_id, pwdId:pId, pwdReason:enteredReason }, function(response) {
		
		// Hide + button, show - button, get info div
		$("#tpm-morewait-" + i).hide();
		var infoDivShow = document.getElementById("tpm-info-div-" + i);
		$("#tpm-less-btn-" + i).show();

		if ( response ) {

			// Tabs
			hasNotes = false;
			if ( response.notes ) {
				hasNotes = true;
			}
			createPasswordTabs(pId, hasNotes, infoDivShow);

			// Increment for each value when we show a field (showPasswordField() returns 1 if it shows a value)
			// At the end, if numValues is still 0 we show the message "(This password doesn't have any data)"
			var numValues = 0;

			// Data Div
			var infoDivDataShow = document.createElement("div");
			infoDivDataShow.id = "tpm-infoData-" + pId;
			infoDivDataShow.style = "background-color: #f5f5f5; padding: 10px 7px 7px 7px";

			// Basic fields
			var aue = ""
			var apwd = ""
			if ( response.username ) {
				aue = response.username;
			} else {
				if ( response.email ) {
					aue = response.email;
				}
			}
			if ( response.password ) {
				apwd = response.password;
			}
			numValues += showPasswordField("world_go.png", chrome.i18n.getMessage("pwdAccess"), response.access_info, infoDivDataShow, "access_info", pId, aue, apwd);
			numValues += showPasswordField("username.png", chrome.i18n.getMessage("pwdUsername"), response.username, infoDivDataShow);
			numValues += showPasswordField("email.png", chrome.i18n.getMessage("pwdEmail"), response.email, infoDivDataShow);
			numValues += showPasswordField("key.png", chrome.i18n.getMessage("pwdPassword"), response.password, infoDivDataShow, "password", pId);

			if ( tpmSearchWhere != "my" ) {
				if ( response.expiry_date ) {
					numValues++;

					// https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
					expd = new Date(response.expiry_date)
					exp_ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(expd);
					exp_mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(expd);
					exp_da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(expd);
					
					showPasswordField("expiry_date.png", chrome.i18n.getMessage("pwdExpiryDate"), exp_mo + " " + exp_da + ", " + exp_ye, infoDivDataShow, "expiry", response.expiry_status);
				}

				// Custom fields
				hr_shown = false;
				for ( field_i=1; field_i<=10; field_i++ ) {
					if ( response["custom_field" + field_i] ) {
						if ( response["custom_field" + field_i].data ) {
							if ( !hr_shown ) {
								// Show a hr separator
								var hrCustom = document.createElement("hr");
								hrCustom.style = "margin: 5px 0";
								infoDivDataShow.appendChild(hrCustom);

								hr_shown = true;
							}
							switch ( response["custom_field" + field_i].type ) {
								case "cf_text":
								case "Text": // T#781 type when using the API
									numValues += showPasswordField("", response["custom_field" + field_i].label, response["custom_field" + field_i].data, infoDivDataShow);
									break;
								case "cf_enc_text":
								case "Encrypted text": // T#781 type when using the API
									numValues += showPasswordField("lock.png", response["custom_field" + field_i].label, response["custom_field" + field_i].data, infoDivDataShow);
									break;
								case "cf_pwd":
								case "Password": // T#781 type when using the API
									numValues += showPasswordField("key.png", response["custom_field" + field_i].label, response["custom_field" + field_i].data, infoDivDataShow, "password", pId.toString()+ "-" + field_i.toString());
									break;
								case "cf_email":
								case "E-mail": // T#781 type when using the API
									numValues += showPasswordField("email.png", response["custom_field" + field_i].label, response["custom_field" + field_i].data, infoDivDataShow);
									break;
								case "cf_notes":
								case "cf_enc_notes":
								case "Notes": // T#781 type when using the API
								case "Encrypted notes": // T#781 type when using the API
									var cfIcon = "";
									if ( response["custom_field" + field_i].type == "cf_enc_notes" || response["custom_field" + field_i].type == "Encrypted notes" ) {
										cfIcon = "lock.png";
									}
									numValues += showPasswordField(cfIcon, response["custom_field" + field_i].label, response["custom_field" + field_i].data, infoDivDataShow, "notes", pId.toString()+ "-" + field_i.toString());
									break;
							}
						}	
					}
				} // custom fields for loop

			} // Shared passwords only (expiry and custom fields)

			// The password doesn't have any data? 
			if ( numValues==0 ) {
				var lblNoData = document.createElement("p");
				lblNoData.style = "margin-bottom: 3px; line-height: 18px";
				lblNoData.textContent = "(" + chrome.i18n.getMessage("pwdNoData") + ")"; // "This password doesn't have any data";
				infoDivDataShow.appendChild(lblNoData);
			}
							
			infoDivShow.appendChild(infoDivDataShow);		

			// Notes Div (hidden by default)
			if ( hasNotes ) {
				var infoDivNotesShow = document.createElement("div");
				infoDivNotesShow.id = "tpm-infoNotes-" + pId;
				infoDivNotesShow.style = "display:none";

				var pNotes = document.createElement("p");
				pNotes.style = "background-color: #f5f5f5; padding: 7px";
				
				// T#467
				const pNotes1437 = nl2br(escapeHtml(response.notes));
				const parsed1437 = parser.parseFromString(pNotes1437, `text/html`);
				const tags1437 = parsed1437.getElementsByTagName("body");
				pNotes.innerHTML = ``;
				for (const tag of tags1437) {
					tag.style = "background-color: rgb(245, 245, 245); font-size: 13px";
					pNotes.appendChild(tag);
				}

				infoDivNotesShow.appendChild(pNotes);

				infoDivShow.appendChild(infoDivNotesShow);

			} // hasNotes

		} else {
			// Show error instead			
			var pError = document.createElement("p");
			pError.style = "margin: 5px 5px 5px 0; color: red; font-weight: bold";
			pError.textContent = chrome.i18n.getMessage("pwdLoadError"); // "Error: it hasn't been possible to load the password data";
			infoDivShow.appendChild(pError);
		}

		// Let's show it
		$("#tpm-info-div-" + i).show();

		// T#434
		cache_search_results();
	}); // TPM_GET_PASSWORD_ID
} // showPasswordInformation()

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

// https://stackoverflow.com/questions/7467840/nl2br-equivalent-in-javascript
function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
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
