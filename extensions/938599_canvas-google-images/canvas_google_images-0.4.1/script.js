var langViewImage = browser.i18n.getMessage("viewImage");
var langEditImage = browser.i18n.getMessage("editImage");
var langOpenImageNewTab = browser.i18n.getMessage("openInNewTab");
var langSearchImg = browser.i18n.getMessage("searchImg");
var langDownloadImg = browser.i18n.getMessage("downloadImg");
var langSaveImgAs = browser.i18n.getMessage("saveImgAs");
var langCopyImgUrl = browser.i18n.getMessage("copyImgUrl");
var defaultPreferences = { open_image_new_tab: true };
var userPreferences;
var imageModalHtml = '<div id="canvas-ext-modal" class="canvas-ext-modal" style="display:none"><div class="canvas-ext-modal-container"><a class="canvas-ext-modal-image-next" style="display:none"><div class="canvas-ext-icon"><svg viewBox="0 0 574 1024" aria-labelledby="fqsi-ant-right-title" id="si-ant-right" width="100%" height="100%"><path d="M10 9Q0 19 0 32t10 23l482 457L10 969Q0 979 0 992t10 23q10 9 24 9t24-9l506-480q10-10 10-23t-10-23L58 9Q48 0 34 0T10 9z"></path></svg></div></a><a class="canvas-ext-modal-image-previous" style="display:none"><div class="canvas-ext-icon"><svg viewBox="0 0 574 1024" aria-labelledby="easi-ant-left-title" id="si-ant-left" width="100%" height="100%"><path d="M564 9q10 10 10 23t-10 23L82 512l482 457q10 10 10 23t-10 23q-10 9-24 9t-24-9L10 535Q0 525 0 512t10-23L516 9q10-9 24-9t24 9z"></path></svg></div></a><div class="canvas-ext-modal-header" style="display:none"><a class="canvas-modal-ext-image-open-new-tab" target="_blank" rel="noopener noreferrer"><div class="canvas-ext-modal-header-icon"><svg viewBox="0 0 1024 1024" aria-labelledby="fdsi-ant-plus-title" id="si-ant-plus" width="100%" height="100%"><path d="M990 448H544V34q0-14-9.5-24T512 0t-22.5 10-9.5 24v414H34q-14 0-24 9.5T0 480t10 22.5 24 9.5h446v478q0 14 9.5 24t22.5 10 22.5-10 9.5-24V512h446q14 0 24-9.5t10-22.5-10-22.5-24-9.5z"></path></svg></div>open image in new tab</a><a class="canvas-modal-ext-image-edit"><div class="canvas-ext-modal-header-icon"><svg viewBox="0 0 1024 1024" aria-labelledby="fdsi-ant-plus-title" id="si-ant-plus" width="100%" height="100%"><path d="M992 1023H32q-13 0-22.5-9.5T0 991t9.5-22.5T32 959h960q13 0 22.5 9.5t9.5 22.5-9.5 22.5-22.5 9.5zm12-905l-98-98Q886 0 857 0t-49 20L328 501 195 782q-8 18 2.5 34t29.5 16q7 0 15-3l281-133 481-480q20-20 20-49t-20-49zM486 643l-198 93 93-198 348-348 105 105zm472-472l-79 79-105-105 79-79q2-2 4-2t4 2l97 97q2 2 2 4t-2 4z"></path></svg></div>Edit</a><a class="canvas-modal-ext-image-search" target="_blank" rel="noopener noreferrer"><div class="canvas-ext-modal-header-icon"><svg viewBox="0 0 1024 1024" aria-labelledby="fusi-ant-search-title" id="si-ant-search" width="100%" height="100%"><path d="M1015 969L732 687q100-117 100-271 0-172-122-294T416 0 122 122 0 416t122 294 294 122q154 0 271-100l282 283q10 9 23 9t23-9q9-10 9-23t-9-23zM553 740q-65 28-137 28t-137-28q-63-26-112-75T92 553q-28-65-28-137t28-137q26-63 75-112t112-75q65-28 137-28t137 28q63 26 112 75t75 112q28 65 28 137t-28 137q-26 63-75 112t-112 75z"></path></svg></div>search by image</a><a class="canvas-ext-modal-image-copy-url"><div class="canvas-ext-modal-header-icon"><svg viewBox="0 0 1024 1024" aria-labelledby="edsi-ant-link-title" id="si-ant-link" width="100%" height="100%"><path d="M560 525q-14 14-7 32 11 27 11 56 0 63-45 108L322 918q-45 45-108.5 45t-108-44.5-44.5-108T106 702q137-137 192-190 9-9 9-22t-9-22-21.5-9-21.5 9Q61 660 63 660 0 722 0 810.5T63 962q62 62 150.5 62T365 962l197-198q46-46 58.5-109T610 535q-6-15-22-18.5t-28 8.5zm-96-26q14-14 7-32-11-27-11-56 0-63 45-108l198-197q44-45 107.5-45t108 44.5 44.5 108T919 322Q781 459 726 512q-9 9-9 22t9 22 21.5 9 21.5-9l192-192q63-62 63-150.5T961 62Q899 0 810.5 0T660 62L462 260q-46 46-58.5 109T414 489q6 15 22 18.5t28-8.5z"></path></svg></div>copy image url</a><a class="canvas-ext-modal-image-download-in-folder"><div class="canvas-ext-modal-header-icon"><svg viewBox="0 0 1024 896" aria-labelledby="dksi-ant-folder-title" id="si-ant-folder" width="100%" height="100%">icon folder</title><path d="M405 64q5 0 11 5t7 10l19 77v1q5 23 26 39 20 17 45 17h437q10 0 10 11v597q0 5-3 8t-6 3H73q-9 0-9-11V75q0-11 9-11h332zm0-64H73Q43 0 21.5 22T0 75v746q0 31 21.5 53T73 896h878q30 0 51.5-22t21.5-53V224q0-31-21.5-53T951 149H514q-3 0-6-2.5t-4-4.5l-18-77q-7-28-30-46.5T405 0z"></path></svg></div>download in folder</a><a class="canvas-ext-modal-image-download"><div class="canvas-ext-modal-header-icon"><svg viewBox="0 0 1024 1024" aria-labelledby="cnsi-ant-download-title" id="si-ant-download" width="100%" height="100%"><path d="M338 641l181 181q10 10 23 10t23-10l181-181q9-9 9-22.5t-9-22.5q-10-9-23-9t-23 9L574 722V32q0-13-9.5-22.5T542 0t-22.5 9.5T510 32v690L384 596q-10-9-23-9t-23 9q-9 9-9 22.5t9 22.5zm622 95v192q0 13-9.5 22.5T928 960H96q-13 0-22.5-9.5T64 928V736q0-13-9.5-22.5T32 704t-22.5 9.5T0 736v224q0 26 19 45t45 19h896q26 0 45-19t19-45V736q0-13-9.5-22.5T992 704t-22.5 9.5T960 736z"></path></svg></div>download</a><a id="canvas-ext-modal-close" class="canvas-ext-modal-close"><div class="canvas-ext-modal-header-icon"><svg viewBox="0 0 742 742" aria-labelledby="cdsi-ant-cross-title" id="si-ant-cross" width="100%" height="100%"><path d="M733 9q-9-9-22.5-9T688 9L371 326 54 9q-9-9-22.5-9T9 9 0 31.5 9 54l317 317L9 688q-9 9-9 22.5T9 733t22.5 9 22.5-9l317-317 317 317q9 9 22.5 9t22.5-9 9-22.5-9-22.5L416 371 733 54q9-9 9-22.5T733 9z"></path></svg></div>close</a></div><div class="canvas-ext-modal-size-container"><div class="canvas-ext-image-boundary"><div class="canvas-ext-image-container"><div id="canvas-ext-modal-image-error" style="display:none"><div>LOADING FAILED: Image has been deleted from the original link or the owner has restricted to view on external pages.</div><div class="message"></div><div><a target="_blank" rel="noopener noreferrer">Try to open image in new tab</a></div></div><img id="canvas-ext-modal-image" style="display:none"></div></div></div><div class="canvas-ext-modal-footer" style="display:none"><div id="canvas-ext-modal-loading" style="display:none"><div class="canvas-ext-modal-loader"></div>Loading high resolution image...</div><div class="canvas-ext-modal-image-info-resolution"></div><div class="canvas-ext-modal-image-info-extension"></div><a class="canvas-ext-modal-image-info-website" target="_blank" rel="noopener noreferrer"></a></div></div></div>';
var editorlHtml = '<div id="tui-image-editor-container" style="display:none"></div>';
var imageEditor;

$(function() {
	$(document).on('click', '#canvas-ext-modal-close', function(e){
		e.preventDefault();
		closeModal();
	});

	$(document).on('click', '#canvas-ext-modal', function(e){
		if(!$(e.target).is('#canvas-ext-modal a') && !$(e.target).is('#canvas-ext-modal a *')){
			e.preventDefault();
			closeModal();
		}
	});

	$(document).on('click', '.canvas-ext-view-image', function(e){
		e.preventDefault();
		loadImageInModal($(this));
	});

	$(document).on('click', '.canvas-ext-ext-download', function(e){
		e.preventDefault();
		var url = $(this).closest('.canvas-ext-container').find('.canvas-ext-view-image').first().attr('href');
		downloadImage(url);
	});

	$(document).on('click', '.canvas-ext-copy-image-url', function(e){
		e.preventDefault();
		var url = $(this).closest('.canvas-ext-container').find('.canvas-ext-view-image').first().attr('href');
		copyImageUrlToClipboard(url);
	});

	$(document).on('click', '.canvas-ext-download-in-folder', function(e){
		e.preventDefault();
		var url = $(this).closest('.canvas-ext-container').find('.canvas-ext-view-image').first().attr('href');
		downloadImageInFolder(url);
	});

	$(document).on('click', '#canvas-ext-modal .canvas-ext-modal-image-next', function(e){
		e.preventDefault();
		var nextImage = getNextImage();
		loadImageInModal(nextImage);
	});

	$(document).on('click', '#canvas-ext-modal .canvas-ext-modal-image-previous', function(e){
		e.preventDefault();
		var previousImage = getPreviousImage();
		loadImageInModal(previousImage);
	});

	$(document).on('click', '#canvas-ext-modal .canvas-ext-modal-image-copy-url', function(e){
		e.preventDefault();
		copyImageUrlToClipboard($('#canvas-ext-modal').data('url'));
	});

	$(document).on('click', '#canvas-ext-modal .canvas-modal-ext-image-edit', function(e){
		e.preventDefault();
		openEditor($('#canvas-ext-modal').data('url'));
	});

	$(document).on('click', '.tui-image-editor-close-btn', function(e){
		e.preventDefault();
		closeEditor();
	});

	$(document).on('click', '.canvas-ext-edit-image', function(e){
		e.preventDefault();
		var url = $(this).closest('.canvas-ext-container').find('.canvas-ext-view-image').first().attr('href');
		openEditor(url);
	});

	$(document).on('click', '#canvas-ext-modal .canvas-ext-modal-image-download-in-folder', function(e){
		e.preventDefault();
		downloadImageInFolder($('#canvas-ext-modal').data('url'));
	});

	$(document).on('click', '#canvas-ext-modal .canvas-ext-modal-image-download', function(e){
		e.preventDefault();
		downloadImage($('#canvas-ext-modal').data('url'));
	});

	$("body").keydown(function(e) {
		if(e.keyCode == 37) {
			if($('#canvas-ext-modal').is(':visible') && getPreviousImage())
				loadImageInModal(getPreviousImage());
		}
		else if(e.keyCode == 39) {
			if($('#canvas-ext-modal').is(':visible') && getNextImage())
				loadImageInModal(getNextImage());
		}
	});

	loadEditorSVG();
})

function loadEditorSVG()
{
	var svgContainer = document.createElement('div');
	svgContainer.setAttribute('id', 'svg-container');
	svgContainer.style.display = 'none';
	document.body.appendChild(svgContainer);

	var icon_a = new XMLHttpRequest();
	icon_a.open("GET", chrome.runtime.getURL("assets/tui.image-editor/svg/icon-a.svg"), true);
	icon_a.send();
	icon_a.onload = function(e) {
		$('#svg-container').append(icon_a.responseXML.documentElement);
	}

	var icon_b = new XMLHttpRequest();
	icon_b.open("GET", chrome.runtime.getURL("assets/tui.image-editor/svg/icon-b.svg"), true);
	icon_b.send();
	icon_b.onload = function(e) {
		$('#svg-container').append(icon_b.responseXML.documentElement);
	}

	var icon_c = new XMLHttpRequest();
	icon_c.open("GET", chrome.runtime.getURL("assets/tui.image-editor/svg/icon-c.svg"), true);
	icon_c.send();
	icon_c.onload = function(e) {
		$('#svg-container').append(icon_c.responseXML.documentElement);
	}

	var icon_d = new XMLHttpRequest();
	icon_d.open("GET", chrome.runtime.getURL("assets/tui.image-editor/svg/icon-d.svg"), true);
	icon_d.send();
	icon_d.onload = function(e) {
		$('#svg-container').append(icon_d.responseXML.documentElement);
	}
}

function loadImageInModal(targetObject)
{
	var parentContainer = targetObject.closest('.rg_bx');
	var thumbImageUrl = parentContainer.find('img.rg_i').first().attr('src');
	$('.canvas-ext-modal-active').removeClass('canvas-ext-modal-active');
	targetObject.closest('.canvas-ext-container').addClass('canvas-ext-modal-active');
	$('#canvas-ext-modal-image, #canvas-ext-modal .canvas-ext-modal-header, #canvas-ext-modal .canvas-ext-modal-footer, #canvas-ext-modal-image-error').hide()
	$('#canvas-ext-modal').data('url', targetObject.attr('href'));
	$('#canvas-ext-modal .canvas-modal-ext-image-open-new-tab').attr('href', targetObject.attr('href'));
	$('#canvas-ext-modal .canvas-modal-ext-image-search').attr('href', getSearchByImageUrl(targetObject.attr('href')));
	$('#canvas-ext-modal .canvas-ext-modal-image-info-resolution').text(targetObject.data('width') + ' x ' + targetObject.data('height'));
	$('#canvas-ext-modal .canvas-ext-modal-image-info-extension').text(targetObject.data('extension'));
	$('#canvas-ext-modal .canvas-ext-modal-image-info-website').text(getRootUrl(targetObject.data('website')) + '...');
	$('#canvas-ext-modal .canvas-ext-modal-image-info-website').attr('href', targetObject.data('website'));
	$('#canvas-ext-modal-image').attr('src', thumbImageUrl);
	$('#canvas-ext-modal-image, #canvas-ext-modal .canvas-ext-modal-header, #canvas-ext-modal .canvas-ext-modal-footer').fadeIn();

	$('html, body').css('overflow-y', 'hidden');
	$('#canvas-ext-modal').fadeIn();
	$('#canvas-ext-modal-loading').fadeIn();
	$('#canvas-ext-modal-image').on('load', function(event) {
		$('#canvas-ext-modal-loading').hide();

		if(getNextImage())
			$('#canvas-ext-modal .canvas-ext-modal-image-next').show();

		else
			$('#canvas-ext-modal .canvas-ext-modal-image-next').hide();

		if(getPreviousImage())
			$('#canvas-ext-modal .canvas-ext-modal-image-previous').show();

		else
			$('#canvas-ext-modal .canvas-ext-modal-image-previous').hide();
		
		// reset events
		$(this).off('load');
		$(this).off('error');
	}).on('error', function (event) {
		$('#canvas-ext-modal-loading, #canvas-ext-modal-image, #canvas-ext-modal .canvas-ext-modal-header, #canvas-ext-modal .canvas-ext-modal-footer').hide();
		$('#canvas-ext-modal-image-error a').attr('href', targetObject.attr('href'));
		$('#canvas-ext-modal-image-error').show();

		// reset events
		$(this).off('load');
		$(this).off('error');
	}).attr('src', targetObject.attr('href'));
}

function openEditor(imageUrl)
{
	imageUrl = 'https://mayankjani.me/canvas/image?url=' + imageUrl;
	$('#tui-image-editor-container').show();
	var imageEditorOptions = {
		usageStatistics: false,
		includeUI: {
			initMenu: 'filter',
			menuBarPosition: 'bottom'
		},
		cssMaxWidth: 700,
		cssMaxHeight: 500,
		selectionStyle: {
			cornerSize: 20,
			rotatingPointOffset: 70
		}
	}

	imageEditor = new tui.ImageEditor('#tui-image-editor-container', imageEditorOptions);
	imageEditor.loadImageFromURL(imageUrl, 'Canvas Edited Image').then(sizeValue => {
		$('.tui-editor-loading-container').hide();
		imageEditor.ui.activeMenuEvent();
		imageEditor.ui.resizeEditor({imageSize: sizeValue});
	}).catch(e=>{
		console.error("Something went wrong:")
        console.error(e)
		$('.tui-editor-loader').hide();
		$('.tui-editor-loading-error').show();
	});
}

function closeEditor()
{
	$('#tui-image-editor-container').hide();
}

function closeModal()
{
	$('html, body').css('overflow-y', 'scroll');
	$('#canvas-ext-modal').fadeOut();
	$('.canvas-ext-modal-active').removeClass('canvas-ext-modal-active');
}

function copyImageUrlToClipboard(url)
{
	var tempInput = document.createElement('input');
	tempInput.value = url;
	document.body.appendChild(tempInput);
	tempInput.select();
	document.execCommand('copy');
	tempInput.remove();
}

function downloadImageInFolder(url)
{
	browser.runtime.sendMessage({"url": url, "saveAs": true});
}

function downloadImage(url)
{
	browser.runtime.sendMessage({"url": url, "saveAs": false});
}

function downloadEditedImage(dataURL)
{
	var fileExtension = dataURL.substring("data:image/".length, dataURL.indexOf(";base64"));
	var a = document.createElement('a');document.body.appendChild(a);a.download = 'Canvas Edited Image.' + fileExtension;a.href = dataURL;a.click();
}

function getSearchByImageUrl(url)
{
	return '/searchbyimage?&image_url=' + url;
}

function getRootUrl(url)
{
	return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
}

function getFileExtensionFromUrl(url)
{
	var url = url.split(/\#|\?/)[0].split('.').pop().trim();

	//Remove slashes
	var urlAfterSlashRemoval = url.substr(0, url.indexOf('/'));

	return urlAfterSlashRemoval.length > 0 ? urlAfterSlashRemoval : url;
}

function getNextImage()
{
	var currentIndex = $('.canvas-ext-container').index($('.canvas-ext-modal-active'));
	var targetObject = $('.canvas-ext-container').eq(currentIndex + 1).find('.canvas-ext-view-image').first();

	if(targetObject.length <= 0)
		return false; 
	
	return targetObject;
}

function getPreviousImage()
{
	var currentIndex = $('.canvas-ext-container').index($('.canvas-ext-modal-active'));

	if(currentIndex == 0)
		return false; 

	var targetObject = $('.canvas-ext-container').eq(currentIndex - 1).find('.canvas-ext-view-image').first();

	if(targetObject.length <= 0)
		return false; 
	
	return targetObject;
}

function addControls(element)
{
	element.classList.add("canvas-ext-added");
	var meta = element.getElementsByClassName("rg_meta");
	if(meta.length > 0){
		meta = meta[0].innerHTML;
		var json = JSON.parse(meta);
		var imageURL = json.ou;

		var controlsParent = document.createElement('div');
		controlsParent.classList.add("canvas-ext-container");

		var controlsContainer = document.createElement('div');
		controlsContainer.classList.add("canvas-ext-controls");

		var viewImageButton = document.createElement('a');
		viewImageButton.classList.add("canvas-ext-view-image");
		viewImageButton.setAttribute('href', imageURL);
		viewImageButton.setAttribute('title', langViewImage);
		viewImageButton.setAttribute('data-website', json.ru);
		viewImageButton.setAttribute('data-width', json.ow);
		viewImageButton.setAttribute('data-height', json.oh);
		viewImageButton.setAttribute('data-extension', json.ity.length > 0 ? json.ity.toUpperCase() : getFileExtensionFromUrl(imageURL).toUpperCase());

		if(userPreferences.open_image_new_tab){
			viewImageButton.setAttribute('target', '_blank');
			viewImageButton.setAttribute('rel', 'noopener noreferrer');
		}
		
		viewImageButton.innerHTML = '<div class="canvas-ext-controls-icon"><svg viewBox="0 0 1024 750" aria-labelledby="czsi-ant-eye-o-title" id="si-ant-eye-o" width="100%" height="100%"><path d="M512 64q134 0 233 50 80 40 135 109 48 60 78 152-30 92-78 151v1q-55 69-135 109-100 50-233 50t-234-50q-79-40-135-109-48-60-77-152 29-92 77-152 56-69 136-109 100-50 233-50zm0-64Q364 0 250 57q-92 45-156 126-28 35-51.5 82.5t-33 76T0 375t9.5 33.5 33 76T94 567q64 80 156 126 114 57 262 57t262-57q92-46 157-126 27-35 50.5-82.5t33-76 9.5-33.5-9.5-33.5-33-76T931 183q-65-80-157-126Q661 0 512 0zm0 247q53 0 90 37t37 90-37 90-90 37-90-37-37-90 37-90 90-37zm0-64q-79 0-135 56t-56 135 56 135 135 56 135-56 56-135-56-135-135-56z"></path></svg></div>';

		var editButton = document.createElement('a');
		editButton.classList.add("canvas-ext-edit-image");
		editButton.setAttribute('title', langEditImage);

		if(userPreferences.open_image_new_tab){
			editButton.setAttribute('target', '_blank');
			editButton.setAttribute('rel', 'noopener noreferrer');
		}
		
		editButton.innerHTML = '<div class="canvas-ext-controls-icon"><svg viewBox="0 0 1024 750" aria-labelledby="czsi-ant-eye-o-title" id="si-ant-eye-o" width="100%" height="100%"><path d="M992 1023H32q-13 0-22.5-9.5T0 991t9.5-22.5T32 959h960q13 0 22.5 9.5t9.5 22.5-9.5 22.5-22.5 9.5zm12-905l-98-98Q886 0 857 0t-49 20L328 501 195 782q-8 18 2.5 34t29.5 16q7 0 15-3l281-133 481-480q20-20 20-49t-20-49zM486 643l-198 93 93-198 348-348 105 105zm472-472l-79 79-105-105 79-79q2-2 4-2t4 2l97 97q2 2 2 4t-2 4z"></path></svg></div>';

		var searchByImageButton = document.createElement('a');
		searchByImageButton.setAttribute('href', getSearchByImageUrl(imageURL));
		searchByImageButton.setAttribute('title', langSearchImg);
		
		if(userPreferences.open_image_new_tab){
			searchByImageButton.setAttribute('target', '_blank');
			searchByImageButton.setAttribute('rel', 'noopener noreferrer');
		}

		searchByImageButton.innerHTML = '<div class="canvas-ext-controls-icon"><svg viewBox="0 0 1024 1024" aria-labelledby="fusi-ant-search-title" id="si-ant-search" width="100%" height="100%"><path d="M1015 969L732 687q100-117 100-271 0-172-122-294T416 0 122 122 0 416t122 294 294 122q154 0 271-100l282 283q10 9 23 9t23-9q9-10 9-23t-9-23zM553 740q-65 28-137 28t-137-28q-63-26-112-75T92 553q-28-65-28-137t28-137q26-63 75-112t112-75q65-28 137-28t137 28q63 26 112 75t75 112q28 65 28 137t-28 137q-26 63-75 112t-112 75z"></path></svg></div>';

		var downloadImageButton = document.createElement('a');
		downloadImageButton.classList.add('canvas-ext-ext-download');
		downloadImageButton.setAttribute('title', langDownloadImg);
		downloadImageButton.innerHTML = '<div class="canvas-ext-controls-icon"><svg viewBox="0 0 1024 1024" aria-labelledby="cnsi-ant-download-title" id="si-ant-download" width="100%" height="100%"><path d="M338 641l181 181q10 10 23 10t23-10l181-181q9-9 9-22.5t-9-22.5q-10-9-23-9t-23 9L574 722V32q0-13-9.5-22.5T542 0t-22.5 9.5T510 32v690L384 596q-10-9-23-9t-23 9q-9 9-9 22.5t9 22.5zm622 95v192q0 13-9.5 22.5T928 960H96q-13 0-22.5-9.5T64 928V736q0-13-9.5-22.5T32 704t-22.5 9.5T0 736v224q0 26 19 45t45 19h896q26 0 45-19t19-45V736q0-13-9.5-22.5T992 704t-22.5 9.5T960 736z"></path></svg></div>';

		var openImageInNewTabButton = document.createElement('a');
		openImageInNewTabButton.setAttribute('href', imageURL);
		openImageInNewTabButton.setAttribute('target', '_blank');
		openImageInNewTabButton.setAttribute('rel', 'noopener noreferrer');
		openImageInNewTabButton.setAttribute('title', langOpenImageNewTab);
		openImageInNewTabButton.innerHTML = '<div class="canvas-ext-controls-icon"><svg viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M990 448H544V34q0-14-9.5-24T512 0t-22.5 10-9.5 24v414H34q-14 0-24 9.5T0 480t10 22.5 24 9.5h446v478q0 14 9.5 24t22.5 10 22.5-10 9.5-24V512h446q14 0 24-9.5t10-22.5-10-22.5-24-9.5z"></path></svg></div>';

		var moreOptionsButton = document.createElement('a');
		moreOptionsButton.classList.add("canvas-ext-more-options");
		moreOptionsButton.innerHTML = '<div class="canvas-ext-controls-icon"><svg viewBox="0 0 1024 130" aria-labelledby="cpsi-ant-ellipsis-title" id="si-ant-ellipsis" width="100%" height="100%"><path d="M64 130q-26 0-45-18.5T0 66t19-45.5T64 2q27 0 46 18.5T129 66t-19 45.5T64 130zm448 0q-27 0-45.5-19T448 65t18.5-46T512 0t45.5 19T576 65t-18.5 46-45.5 19zm448 0q-27 0-46-18.5T895 66t19-45.5T960 2q26 0 45 18.5t19 45.5-19 45.5-45 18.5z"></path></svg></div>';

		controlsContainer.appendChild(viewImageButton);
		controlsContainer.appendChild(openImageInNewTabButton);
		controlsContainer.appendChild(editButton);
		controlsContainer.appendChild(searchByImageButton);
		controlsContainer.appendChild(downloadImageButton);
		controlsContainer.appendChild(moreOptionsButton);

		controlsParent.appendChild(controlsContainer);

		var moreOptionsMenu = document.createElement('div');
		moreOptionsMenu.classList.add("canvas-ext-more-options-menu");

		var downloadImageInFolderButton = document.createElement('a');
		downloadImageInFolderButton.classList.add('canvas-ext-download-in-folder');
		downloadImageInFolderButton.innerHTML = langSaveImgAs;

		var copyImageUrlButton = document.createElement('a');
		copyImageUrlButton.classList.add('canvas-ext-copy-image-url');
		copyImageUrlButton.innerHTML = langCopyImgUrl;
		
		moreOptionsMenu.appendChild(downloadImageInFolderButton);
		moreOptionsMenu.appendChild(copyImageUrlButton);

		controlsParent.appendChild(moreOptionsMenu);
		$(element).prepend($(controlsParent));
	}
}

document.addEventListener('click', function(e){	
	if(e.target && (e.target.classList.contains('canvas-ext-more-options')) || e.target.closest('.canvas-ext-more-options')){
		var target = e.target.closest('.canvas-ext-more-options');
		var parentContainer = target.closest('.canvas-ext-container');
		var dropdownMenu = parentContainer.getElementsByClassName('canvas-ext-more-options-menu')[0];

		var allMoreOptionsButtons = document.getElementsByClassName('canvas-ext-more-options');
		for (var i = 0; i < allMoreOptionsButtons.length; i++) {
			if(target != allMoreOptionsButtons[i])
				allMoreOptionsButtons[i].classList.remove('active');
		}
		var allMoreOptionsMenus = document.getElementsByClassName('canvas-ext-more-options-menu');
		for (var i = 0; i < allMoreOptionsMenus.length; i++) {
			if(dropdownMenu != allMoreOptionsMenus[i])
				allMoreOptionsMenus[i].classList.remove('open');
		}

		target.classList.toggle('active')
		dropdownMenu.classList.toggle('open')
	}
	else{
		var allMoreOptionsButtons = document.getElementsByClassName('canvas-ext-more-options');
		for (var i = 0; i < allMoreOptionsButtons.length; i++) {
			allMoreOptionsButtons[i].classList.remove('active');
		}
		var allMoreOptionsMenus = document.getElementsByClassName('canvas-ext-more-options-menu');
		for (var i = 0; i < allMoreOptionsMenus.length; i++) {
			allMoreOptionsMenus[i].classList.remove('open');
		}
	}
})

function init()
{
	var imageModal = document.createElement('div');
	imageModal.innerHTML = imageModalHtml;

	var editorModal = document.createElement('div');
	editorModal.innerHTML = editorlHtml;
	document.body.appendChild(imageModal);
	document.body.appendChild(editorModal);

	var images = document.getElementsByClassName("rg_bx");
	for(var i = 0; i < images.length; i++)
	{
		addControls(images.item(i));
	}
}

var observer = new MutationObserver(function (mutations) {
	mutations.forEach((mutation) => {
		if (mutation.addedNodes && mutation.addedNodes.length > 0) {
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				var newNode = mutation.addedNodes[i];
				if (newNode.nodeType === Node.ELEMENT_NODE && newNode.classList.contains('rg_bx'))
					addControls(newNode);
			}
		}
	});
});

observer.observe(document.body, {
	childList: true,
	subtree: true
});

browser.storage.local.get(defaultPreferences, function (items){
	userPreferences = items;
	init();
})