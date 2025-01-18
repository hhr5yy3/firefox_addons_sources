var sdta = {
	clicked: false,
	srvUrl: null,
	tagsAll: null
};

var avwgPopup = {};

avwgPopup.CONST_LOGIN_URL = cnf.serverUrl + '/sign-in';
avwgPopup.CONST_HOMEPAGE_URL = cnf.serverUrl + '/app/home?extref=home';
avwgPopup.CONST_FAVORITES_URL = cnf.serverUrl + '/app/myfavs/fdir/all?r=a';
avwgPopup.CONST_BOOKMARKS_URL = cnf.serverUrl + '/app/myfavs/fbmk/all?r=a';
avwgPopup.CONST_COMPETITION_URL = cnf.serverUrl + '/competition/';
avwgPopup.CONST_DEMOGRAPHICS_URL = cnf.serverUrl + '/app/home?extref=demographics';

avwgPopup.tabUrl = null;
avwgPopup.usr = null;
avwgPopup.showHome = false;
avwgPopup.divStack = [];
avwgPopup.cmptDetails = null;

function divShowLast() {
	var id = avwgPopup.divStack[0];
	zzFadeIn(id);
}

function zzFadeOut(id, bInstant) {
	$(id).fadeOut(bInstant ? 0 : 400);
}

function zzFadeIn(id) {
//$(id).css('visibility', bExpand ? 'visible' : 'hidden');
//$(id).css('height', bExpand ? 'auto' : '0');
	$(id).css('visibility', 'visible');
	$(id).fadeIn();
}

function divHideLast(bInstant) {
	var id = avwgPopup.divStack[0];
	zzFadeOut(id, bInstant);
}

avwgPopup.pageShow = function (id) {
	if (avwgPopup.divStack.length > 0) {
		divHideLast(true);
	}
	avwgPopup.divStack.unshift(id);
	divShowLast();
};

avwgPopup.pageClose = function (nPages, bSkipShowLast) {
	nPages = parseInt(nPages);
	for (var i = 1; i <= nPages; i++) {
		divHideLast(true);
		avwgPopup.divStack.shift();
	}
//	else {
//		divHideLast(false);
//		avwgPopup.divStack.shift();
//	}

	if (!bSkipShowLast && avwgPopup.divStack.length > 0) {
		divShowLast();
	}
};

function popupInit() {
	console.log('popupInit');
	chrome.tabs.query({
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
	}, function (tabs) {
		avwgPopup.tabUrl = tabs[0].url;
		chrome.runtime.sendMessage({
			action: 'mainInitExt',
			data: {
				linkUrl: tabs[0].url
			}
		}, function (res) {
			var data = res.data;
			setUiActions(data);
			//console.log("===data",data)
			setUiCmpt(data.cmptDetails);
			if (data.usr) {
				avwgPopup.usr = data.usr;
				if (data.pageExists) {
					zzMessage('Αυτή η σελίδα έχει ήδη αποθηκευτεί στα αποκόμματά σας.');
					sdta.clicked = true;
				} else {
					sdta.srvUrl = cnf.serverUrl;
					if (avwgPopup.usr && avwgPopup.usr.mylinks) {
						sdta.tagsAll = $.map(avwgPopup.usr.mylinks.tags, function (obj) {
							obj = obj.name;
							return obj;
						});
					} else {
						sdta.tagsAll = [];
					}
					$('#zzTags').select2({
						maximumSelectionLength: 4,
						maximumInputLength: 30,
						placeholder: '',
						data: sdta.tagsAll,
						tags: true
					});
				}
			}
			avwgPopup.pageShow('#divHome');
		});
	});
}

avwgPopup.showPage = function (url) {
	var p = {
		url: url
	};
	chrome.tabs.create(p);
};

function showPageWithPlId() {
	chrome.runtime.sendMessage({
		action: 'internalPlId',
		data: {}//need this to return plId
	}, function (res) {
		avwgPopup.showPage(avwgPopup.CONST_COMPETITION_URL + avwgPopup.cmptDetails.uiId);
		//avwgPopup.showPage(avwgPopup.CONST_COMPETITION_URL + avwgPopup.cmptDetails.uiId + res);
		closeWindow();
	});
}

function showPageDemographicsEdit() {
//	chrome.runtime.sendMessage({
//		action: 'internalPlId',
//		data: {}//need this to return plId
//	}, function (res) {
	avwgPopup.showPage(avwgPopup.CONST_DEMOGRAPHICS_URL);
	closeWindow();
//	});
}

function zzMessage(s) {
	$('#zzTagsCont').toggle(false);
	$('#zzMessage')
		.toggle(true)
		.text(s);
}

function zzShow(id, bShow) {
	$(id).css('visibility', bShow ? 'visible' : 'hidden');
}

function zzExpand(id, bVisible) {
	$(id).css('visibility', bVisible ? 'visible' : 'hidden');
	$(id).css('height', bVisible ? 'auto' : '0');
}

function noClick(id, bNoClick) {
	$(id).css('pointer-events', bNoClick ? 'none' : 'auto');
	$(id).css('opacity', bNoClick ? 0.2 : 1);
}

function closeWindow() {
	window.close();
}

function setText(eId, sHtml) {
	document.querySelector(eId).textContent = sHtml;
}

avwgPopup.bookmarkCurrentPage = function () {
	if (sdta.clicked) return;
	sdta.clicked = true;
	zzShow('#zzBusy', true);
	var tagNames = $('#zzTags').val();
	zzMessage('Παρακαλώ περιμένετε...');
	chrome.runtime.sendMessage({
		action: 'usrMyLinksLinkSaveExt',
		data: {
			url: avwgPopup.tabUrl,
			tagNames: tagNames
		}
	}, function (resp) {
		zzShow('#zzBusy', false);
		if (zzok(resp)) {
			zzMessage('Η σελίδα αποθηκεύτηκε στα αποκόμματά σας.');
			setTimeout(function () {
				closeWindow();
			}, 2500);
		} else if (zzer(resp)) {
			zzMessage(resp.data);
		}
	});
};

$(document).ready(function () {
	popupInit();
}
);

