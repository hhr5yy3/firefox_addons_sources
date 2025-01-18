function setUiActions(data) {
	$("[zzattrPageShow]").unbind().click(function () {
		avwgPopup.pageShow("#" + $(this).attr('zzattrPageShow'));
	});
	$("[zzattrPageClose]").unbind().click(function () {
		avwgPopup.pageClose($(this).attr('zzattrPageClose'));
	});
	$("#zzClose").unbind().click(function () {
		closeWindow();
	});
	$('#zzTagsCont').toggle(!!data.usr);

	$("#zzContLogin").toggle(!data.usr);
	$("#zzBtnLogin").unbind().click(function () {
		avwgPopup.showPage(avwgPopup.CONST_LOGIN_URL);
		closeWindow();
	});
	$("#zzBookmarkCurrentPage").unbind().click(function () {
		avwgPopup.bookmarkCurrentPage();
	});
	$("#zzShowHomePage").unbind().click(function () {
		avwgPopup.showPage(avwgPopup.CONST_HOMEPAGE_URL);
		closeWindow();
	});
	$("#zzShowFavorites").unbind().click(function () {
		avwgPopup.showPage(avwgPopup.CONST_FAVORITES_URL);
		closeWindow();
	});
	$("#zzShowBookmarks").unbind().click(function () {
		avwgPopup.showPage(avwgPopup.CONST_BOOKMARKS_URL);
		closeWindow();
	});
//	$("#idPrefsYes").unbind().click(function () {
//		avwgPopup.cmptAccepted = 1;
//		$("#idPrefsYes").addClass("cui-switch-on");
//		$("#idPrefsNo").removeClass("cui-switch-on");
//	});
//	$("#idPrefsNo").unbind().click(function () {
//		avwgPopup.cmptAccepted = 0;
//		$("#idPrefsYes").removeClass("cui-switch-on");
//		$("#idPrefsNo").addClass("cui-switch-on");
//	});
}

function setUiCmpt(cmptDetails) {
	avwgPopup.cmptDetails = cmptDetails;

	switch (avwgPopup.cmptDetails.cmptState) {
		case 'CMPT_STATE_OFFLINE':
			break;
		case 'CMPT_STATE_STARTED':
			setText("#cmptBtnTxt1", avwgPopup.cmptDetails.cmptBtnTxt1);
			setText("#cmptBtnTxt2", avwgPopup.cmptDetails.cmptBtnTxt2);
			if (avwgPopup.cmptDetails.uiId) {
				$("#cmptBtnCont").toggle(true).unbind().click(function () {
					showPageWithPlId();
				});
			} else {
				$("#cmptBtnCont").toggle(true).unbind().click(function () {
					getPage1();
				});
			}
			break;
		case 'CMPT_STATE_STOPPED':
		case 'CMPT_STATE_WINNER':
			if (avwgPopup.cmptDetails.canParticipate) {
				setText("#cmptBtnTxt1", avwgPopup.cmptDetails.cmptBtnTxt1);
				setText("#cmptBtnTxt2", avwgPopup.cmptDetails.cmptBtnTxt2);
				if (avwgPopup.cmptDetails.uiId) {
					$("#cmptBtnCont").toggle(true).unbind().click(function () {
						showPageWithPlId();
					});
				} else {
					$("#cmptBtnCont").toggle(true).unbind().click(function () {
						getPage1();
					});
				}
			}
			break;
	}
	$("#idPrefsStart").unbind().click(function () {
		showPageDemographicsEdit();
	});
}
