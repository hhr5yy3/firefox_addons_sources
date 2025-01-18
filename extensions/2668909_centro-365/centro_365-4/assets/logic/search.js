//	Name:			search.js
//	Description:	Search feature
//	Author:			Sean O'Sullivan

// Variables - Load from storage and set accordingly.
var searchInput = document.getElementById('input_search');
var divNotificationBanner = document.getElementById('container_flex_notificationbanner_searching');
var searchHelper = document.getElementById('container_focusedsearch_helper')
var option_searchstyle // What search style are we using?
var divNoMoreResults = document.getElementsByClassName('nomoreresults'); // Used for show/hide the 'nomoreresults' DIVs on a Global search

// Load settings from storage.
chrome.storage.sync.get({
	searchstyle: 'global'
	}, function(items) {
		// Set the variable.
		option_searchstyle = items.searchstyle;
		
		// Call the setSearchStyle function, now we have the users search style from chrome storage.
		// console.log('Loaded from storage');
		setSearchStyle();
});

// SEARCH STYLE
// Put the search input element into focus, and change our behaviour depending on the users search style.
function setSearchStyle() {
	
	// Set focus on the input element.
	searchInput.focus();
		
	// What mode does the user want?
	if (option_searchstyle === 'global') {
		// console.log('Switching to Global Search style');
		
		// Add an input event listener to the input element
		searchInput.addEventListener('input', function () {
			
			// Check if the input field is empty.
			if (searchInput.value.trim() !== '') {
				
				// We have something.
				// Call the showForGlobalSearch function from admincentres.js to show everything
				showForGlobalSearch();
				
				// Do we need to hide or show any of the admin centre sections?
				// If there are no items left, hide.
				searchShowHideAdminCentreSections();
				
				// Set the UI
				document.getElementById("container_frame_left_menu").style.display = 'none';
				document.getElementById("container_frame_left_searchcontrols").style.display = 'block';
				for (var i = 0; i < divNoMoreResults.length; i++) {
					divNoMoreResults[i].style.display = 'block'; // Show the nomoreresults DIV
				};
			} else {
				
				// If empty, hide the notification banner
				// Let us revert to showing the in focus Admin Centre, from admincentres.js
				window[admincentre_infocus]();
				document.getElementById("container_frame_left_menu").style.display = 'block';
				document.getElementById("container_frame_left_searchcontrols").style.display = 'none';
				for (var i = 0; i < divNoMoreResults.length; i++) {
					divNoMoreResults[i].style.display = 'none'; // Hide the nomoreresults DIV
				}
			}
		});
		
	} else if (option_searchstyle === 'focused') {
		// console.log('SEARCH - Switching to Focused Search style');
			
		// Add an input event listener to the input element
		searchInput.addEventListener('input', function () {
			
			// Check if the input field is empty
			if (searchInput.value.trim() !== '') {
				
				// We have something, so display the notification banner.
				divNotificationBanner.style.display = 'flex';
				searchHelper.style.display = 'block';
				document.getElementById("container_frame_left_searchcontrols").style.display = 'block';
				document.getElementById("container_frame_left_searchcontrols").classList.add('container_frame_left_searchcontrols_border');
			} else {
				
				// If empty, hide the notification banner
				divNotificationBanner.style.display = 'none';
				searchHelper.style.display = 'none';
				document.getElementById("container_frame_left_searchcontrols").style.display = 'none';
				document.getElementById("container_frame_left_searchcontrols").classList.remove('container_frame_left_searchcontrols_border');
			}
		});
		
	} else {
		// console.log('SEARCH - No user preference. Defaulting to Global Search style');
		// console.log('Switching to Global Search style');
		
		// Fallback - Either we cannot detect what option_searchstyle is set to, or it's neither 'global' or 'focused'
			
		// Add an input event listener to the input element
		searchInput.addEventListener('input', function () {
			
			// Check if the input field is empty.
			if (searchInput.value.trim() !== '') {
				
				// We have something.
				// Call the showForGlobalSearch function from admincentres.js to show everything
				showForGlobalSearch();
				
				// Do we need to hide or show any of the admin centre sections?
				// If there are no items left, hide.
				searchShowHideAdminCentreSections();
				
				// Set the UI
				document.getElementById("container_frame_left_menu").style.display = 'none';
				document.getElementById("container_frame_left_searchcontrols").style.display = 'block';
				for (var i = 0; i < divNoMoreResults.length; i++) {
					divNoMoreResults[i].style.display = 'block'; // Show the nomoreresults DIV
				};
			} else {
				
				// If empty, hide the notification banner
				// Let us revert to showing the in focus Admin Centre, from admincentres.js
				window[admincentre_infocus]();
				document.getElementById("container_frame_left_menu").style.display = 'block';
				document.getElementById("container_frame_left_searchcontrols").style.display = 'none';
				for (var i = 0; i < divNoMoreResults.length; i++) {
					divNoMoreResults[i].style.display = 'none'; // Hide the nomoreresults DIV
				}
			}
		});
	}
};

// FUZZY SEARCHING
// Hide items that don't match the users input
// Any UL items with the class 'notsearchable' are excluded 
document.getElementById('input_search').addEventListener('input', function () {
	const filterText = this.value.toLowerCase();
	
	// Loop through each list and filter its items
    const lists = document.querySelectorAll('ul');
	
	// Skip lists with the class "notsearchable"
	lists.forEach(list => {
		if (list.classList.contains('notsearchable')) {
			return;
		}

	const items = list.querySelectorAll('li');
	let found = false; // Flag to check if at least one item is found

	items.forEach(item => {
		const text = item.textContent.toLowerCase();
		if (text.includes(filterText)) {
			item.classList.remove('filtered');
			found = true;
		} else {
			item.classList.add('filtered');
		}
	});

	// Hide the parent div if no items were found
	const parentDiv = list.parentElement;
	if (!found) {
		parentDiv.style.display = 'none';
	} else {
		parentDiv.style.display = 'block';
	}
});
});

// CANCELLING SEARCH SESSION
// If the close icon on the search notification banner or sidebar search controls are clicked, lets reset everything.
document.getElementById('container_flex_notificationbanner_searching_right').addEventListener('click', function () {
	document.getElementById('input_search').value = ''; // Clear the input with ID 'input_search'
	document.getElementById("container_flex_notificationbanner_searching").style.display = 'none';
	document.getElementById("container_focusedsearch_helper").style.display = 'none';
	window[admincentre_infocus]();
	
	// Trigger input event after clearing the value
	document.getElementById('input_search').dispatchEvent(new Event('input'));
});

document.getElementById('container_frame_left_searchcontrols').addEventListener('click', function () {
	document.getElementById('input_search').value = ''; // Clear the input with ID 'input_search'
	document.getElementById("container_flex_notificationbanner_searching").style.display = 'none';
	document.getElementById("container_focusedsearch_helper").style.display = 'none';
	window[admincentre_infocus]();
	
	// Trigger input event after clearing the value
	document.getElementById('input_search').dispatchEvent(new Event('input'));
	window[admincentre_infocus]();
	document.getElementById("container_frame_left_menu").style.display = 'block';
	document.getElementById("container_frame_left_supportmeicon").style.display = 'block';
	document.getElementById("container_frame_left_searchcontrols").style.display = 'none';
});



// SHOW OR HIDE ADMIN CENTRES (GLOBAL SEARCH ONLY)
// If an admin centre has all of its list items hidden, hide the admin centre itself
// Call the function initially and whenever the visibility of child divs changes
// searchShowHideAdminCentreSections();
function searchShowHideAdminCentreSections() {
	
	// Hide the Favourites as it's always excluded from search C365-312
	document.getElementById("admincentre_section_favourites").style.display = 'none';
	
	// Logic
	var adminCentreSectionGrandparents = document.getElementsByClassName('admincentre_section');
	for (var i = 0; i < adminCentreSectionGrandparents.length; i++) {
		var adminCentreSectionGrandparent = adminCentreSectionGrandparents[i];
		var childDivsadminCentreSectionGrandparent = adminCentreSectionGrandparent.getElementsByClassName('container_body_menu');
		
		// Check if all child divs are hidden
		var allHidden = Array.from(childDivsadminCentreSectionGrandparent).every(function(childDiv) {
			return window.getComputedStyle(childDiv).display === 'none';
		});
		
		// Hide the adminCentreSectionGrandparent if all child divs are hidden
		if (allHidden) {
			adminCentreSectionGrandparent.style.display = 'none';
		} else {
			adminCentreSectionGrandparent.style.display = 'block';
		}
	}
}
 
   