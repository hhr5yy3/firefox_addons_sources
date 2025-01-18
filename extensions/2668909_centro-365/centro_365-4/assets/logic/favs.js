//	Name:			favs.js
//	Description:	Show and hide the users defined favourites
//	Author:			Sean O'Sullivan

// Define the variables up front
var fav_1_title = ""
var fav_1_url = ""
var fav_2_title = ""
var fav_2_url = ""
var fav_3_title = ""
var fav_3_url = ""
var fav_4_title = ""
var fav_4_url = ""
var fav_5_title = ""
var fav_5_url = ""
var fav_6_title = ""
var fav_6_url = ""
var fav_7_title = ""
var fav_7_url = ""
var fav_8_title = ""
var fav_8_url = ""
var fav_9_title = ""
var fav_9_url = ""
var fav_10_title = ""
var fav_10_url = ""

// Load our users favourites from storage
// If they have never set a favourite before, the variable won't exist in their storage

chrome.storage.sync.get({
    fav_1_title: fav_1_title,
	fav_1_url: fav_1_url,
	fav_2_title: fav_2_title,
	fav_2_url: fav_2_url,
	fav_3_title: fav_3_title,
	fav_3_url: fav_3_url,
	fav_4_title: fav_4_title,
	fav_4_url: fav_4_url,
	fav_5_title: fav_5_title,
	fav_5_url: fav_5_url,
	fav_6_title: fav_6_title,
	fav_6_url: fav_6_url,
	fav_7_title: fav_7_title,
	fav_7_url: fav_7_url,
	fav_8_title: fav_8_title,
	fav_8_url: fav_8_url,
	fav_9_title: fav_9_title,
	fav_9_url: fav_9_url,
	fav_10_title: fav_10_title,
	fav_10_url: fav_10_url
  }, function(favs) {

	var fav_1_title = favs.fav_1_title;
    var fav_1_url = favs.fav_1_url;
	var fav_2_title = favs.fav_2_title;
    var fav_2_url = favs.fav_2_url;
	var fav_3_title = favs.fav_3_title;
    var fav_3_url = favs.fav_3_url;
	var fav_4_title = favs.fav_4_title;
    var fav_4_url = favs.fav_4_url;
	var fav_5_title = favs.fav_5_title;
    var fav_5_url = favs.fav_5_url;
	var fav_6_title = favs.fav_6_title;
    var fav_6_url = favs.fav_6_url;
	var fav_7_title = favs.fav_7_title;
    var fav_7_url = favs.fav_7_url;
	var fav_8_title = favs.fav_8_title;
    var fav_8_url = favs.fav_8_url;
	var fav_9_title = favs.fav_9_title;
    var fav_9_url = favs.fav_9_url;
	var fav_10_title = favs.fav_10_title;
    var fav_10_url = favs.fav_10_url;
	
	// First - What favourites are we showing?

	if(fav_1_title === '') {
		// console.info('Fav_1 is empty so DELETE the item')
		document.getElementById("list_fav_1").remove();
	}
	else {
		// console.info('Fav_1 has content so SHOW the item');
		document.getElementById("fav_1").href = fav_1_url;
		document.getElementById("fav_1").textContent = fav_1_title;
	};

	if(fav_2_title === '') {
		// console.info('Fav_2 is empty so HIDE the item')
		document.getElementById("list_fav_2").remove();
	}	
	else {
		// console.info('Fav_2 has content so SHOW the item');
		document.getElementById("fav_2").href = fav_2_url;
		document.getElementById("fav_2").textContent = fav_2_title;
	};

	if(fav_3_title === '') {
		// console.info('Fav_3 is empty so HIDE the item')
		document.getElementById("list_fav_3").remove();
	}	
	else {
		// console.info('Fav_3 has content so SHOW the item');
		document.getElementById("fav_3").href = fav_3_url;
		document.getElementById("fav_3").textContent = fav_3_title;
	};

	if(fav_4_title === '') {
		// console.info('Fav_4 is empty so HIDE the item')
		document.getElementById("list_fav_4").remove();
	}	
	else {
		// console.info('Fav_4 has content so SHOW the item');
		document.getElementById("fav_4").href = fav_4_url;
		document.getElementById("fav_4").textContent = fav_4_title;
	};

	if(fav_5_title === '') {
		// console.info('Fav_5 is empty so HIDE the item')
		document.getElementById("list_fav_5").remove();
	}	
	else {
		// console.info('Fav_5 has content so SHOW the item');
		document.getElementById("fav_5").href = fav_5_url;
		document.getElementById("fav_5").textContent = fav_5_title;
	};

	if(fav_6_title === '') {
		// console.info('Fav_6 is empty so HIDE the item')
		document.getElementById("list_fav_6").remove();
	}	
	else {
		// console.info('Fav_6 has content so SHOW the item');
		document.getElementById("fav_6").href = fav_6_url;
		document.getElementById("fav_6").textContent = fav_6_title;
	};

	if(fav_7_title === '') {
		// console.info('Fav_7 is empty so HIDE the item')
		document.getElementById("list_fav_7").remove();
	}	
	else {
		// console.info('Fav_7 has content so SHOW the item');
		document.getElementById("fav_7").href = fav_7_url;
		document.getElementById("fav_7").textContent = fav_7_title;
	};

	if(fav_8_title === '') {
		// console.info('Fav_8 is empty so HIDE the item')
		document.getElementById("list_fav_8").remove();
	}	
	else {
		// console.info('Fav_8 has content so SHOW the item');
		document.getElementById("fav_8").href = fav_8_url;
		document.getElementById("fav_8").textContent = fav_8_title;
	};

	if(fav_9_title === '') {
		// console.info('Fav_9 is empty so HIDE the item')
		document.getElementById("list_fav_9").remove();
	}	
	else {
		// console.info('Fav_9 has content so SHOW the item');
		document.getElementById("fav_9").href = fav_9_url;
		document.getElementById("fav_9").textContent = fav_9_title;
	};

	if(fav_10_title === '') {
		// console.info('Fav_10 is empty so HIDE the item')
		document.getElementById("list_fav_10").remove();
	}	
	else {
		// console.info('Fav_10 has content so SHOW the item');
		document.getElementById("fav_10").href = fav_10_url;
		document.getElementById("fav_10").textContent = fav_10_title;
	};

	// Are ALL the favourites empty? If so, lets show the welcome information

	if( fav_1_title === '' && 
		fav_2_title === '' && 
		fav_3_title === '' && 
		fav_4_title === '' && 
		fav_5_title === '' && 
		fav_6_title === '' && 
		fav_7_title === '' && 
		fav_8_title === '' && 
		fav_9_title === '' && 
		fav_10_title === '' ) {
		
		// console.info('EVERYTHING IS EMPTY so show the welcome information');
		document.getElementById("list_fav").style.display = 'none';
		document.getElementById("list_fav_none").style.display = 'block';
		// Add the 'notsearchable' class to the Favourite List UL as there are no items for searching through
		document.getElementById("fav_list").classList.add('notsearchable');
	}
	else {
		// console.info('There is at least one favourite so HIDE the welcome information')
	};


  });
