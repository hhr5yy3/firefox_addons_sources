(function () {
    var imgs = $('[data-src]');
    $.each(imgs, function (i, e) {
        if ($(e).attr('data-src')) {
            var dataSrc = $(e).attr('data-src');
            $(e).attr('src', dataSrc);
        }
    });
})();

var getKeepChangesTimer;

document.addEventListener('keepChangesNewTab', keepchangesActive);

function keepchangesActive() {
    $('.firefox_cust_overlay').show();
    $('#search-text').blur();
    getKeepChangesTimer = setTimeout(function () {
        $('.firefox_cust_overlay').hide();
        document.dispatchEvent(new Event('KeepChangesArrowClosed'));
        // $("#search-text").focus();
    }, 10000);
}

function attachKeepChangesOverlayListener() {
    $('body').on('click', '.firefox_cust_overlay', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
}

function attachKeepChangesCloseListener() {
    $('.close-ff-arrow').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.firefox_cust_overlay').hide();
        clearTimeout(getKeepChangesTimer);
        document.dispatchEvent(new Event('KeepChangesArrowClosed'));
    });
}

(function () {
    function _setDate(x) {
        var date = x.date || '.date';
        var time = x.time || '.time';

        setInterval(function () {
            document.querySelector(date).textContent = _getTimeAndDate().date;
            document.querySelector(time).textContent = _getTimeAndDate().time;
        }, 1000);
    }

    function _changeTimeFormatTo12Hr(date) {
        var hours = date.getHours(),
            minutes =
                date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var unit = _getMeridianFromHour(hours);
        hours = hours % 12;
        hours = hours == 0 ? 12 : hours;

        return {
            hours: hours,
            minutes: minutes,
            unit: unit
        };
    }

    function _getMeridianFromHour(hour) {
        hour = hour % 24;
        return hour < 12 ? 'am' : 'pm';
    }

    function _getTimeAndDate() {
        var obj = {};
        var monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        var wekdayName = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        var date = new Date();
        obj.date = (
            wekdayName[date.getDay() + 0] +
            ', ' +
            monthNames[date.getMonth() + 0] +
            ' ' +
            date.getDate()
        ).toString();
        obj.time = (
            _changeTimeFormatTo12Hr(date).hours +
            ':' +
            _changeTimeFormatTo12Hr(date).minutes +
            ' ' +
            _changeTimeFormatTo12Hr(date).unit
        ).toString();
        return obj;
    }

    _setDate({
        date: '#cust_date',
        time: '#cust_time'
    });

})();

hideWeatherView();

function hideWeatherView() {
    $('.weatherdata').css({
        opacity: '0',
        'pointer-events': 'none'
    });
}

/* PII js */

// var acceptButton = $('#acceptTerms');
var acceptButton = $('.accept');
var allowWidget = $('.allow-widget');
var acceptTerm = $('.accept-prompt');
// var denyTerms = $('#denytTerms');
var denyTerms = $('.know-more');
var piiAccept = 'piiAccept';
acceptButton.on('click', function (e) {
    // closePiiWidget();
    chrome.runtime.sendMessage(
        { task: 'showOptInPage' },
        function (response) {}
    );
    // document.dispatchEvent(new Event('showOptInPage'));
});

denyTerms.on('click', function (e) {
    closePiiWidget();
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		if (key == 'piiAccept' && newValue == '1') {
			allowWidget.show();
			acceptTerm.hide();
	
			$('[n-widgetaction],[n-widgetclick]').removeClass(
				'active'
			);
			$('.search-adjust').removeClass('sa-active');
			$('.logo-box').removeClass('active');
	
			document.dispatchEvent(
				new CustomEvent('PiiAccept', {
					detail: true
				})
			);
	
		} else if (key == 'piiAccept' && newValue == '-1') {
			allowWidget.hide();
			acceptTerm.show();
	
			document.dispatchEvent(
				new CustomEvent('PiiAccept', {
					detail: false
				})
			);
		}
	}
});

var widgetElement = $('.link-out');

widgetElement.on('click', function (e) {
    checkPiiStored();
});

function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem('piiAccept');
    if (accepted && accepted == 1) {
        allowWidget.show();
        acceptTerm.hide();

        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: true
            })
        );
    } else if (!accepted || accepted == -1) {
        allowWidget.hide();
        acceptTerm.show();

        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: false
            })
        );
    }
}

function closePiiWidget() {
    try {
        document.dispatchEvent(new Event('searchTextChanged'));
        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: 'cancel'
            })
        );
    } catch (e) {
        console.log(e);
    }
}
/* PII js end */

var prevClick = '';

document.addEventListener('DOMContentLoaded', function () {
    storageReplacer.init().then(() => {
		allowWidget.hide();
		checkPiiStored();
		attachKeepChangesOverlayListener();
		attachKeepChangesCloseListener();
		disableTracking();
		var widget = new Widget({
			activateTarget: true,
			firstLoad: {
				attribute: 'crop',
				storage: {
					item: 'onboarding',
					value: 'yes',
				},
			},
		});

		initWidgetFunctionality();

		document.addEventListener('PiiAccept', function (e) {
			var PII_ACCEPT = e.detail;

			switch (PII_ACCEPT) {
				case 'cancel':
					new Widget().removeClass(
						document.querySelectorAll(
							'[n-widgetClick],[n-widgetaction], [n-widgettarget]'
						),
						'active'
					);
					$('.logo-box').removeClass('active');
					break;
				// case true:
				//     if(!storageReplacer.getLocalStorageItem('loaded')){
				//         initWidgetFunctionality();
				//         storageReplacer.setLocalStorageItem('loaded',1);
				//     }
				//     break;
			}
		});

		widget.firstLoadRender(function(o) {
			if (o) {
				$('.search-adjust').addClass('sa-active');
				$('.mainWrapper').addClass('active');
				$('.logo-box').addClass('active');
				document.dispatchEvent(new Event('TutorialShown'));
			}
		});

		document.addEventListener('searchTextChanged', function() {
			widget.removeClass(
				document.querySelectorAll('[n-widgetaction],[n-widgetclick]'),
				'active'
			);
			$('.search-adjust').removeClass('sa-active');
			$('.logo-box').removeClass('active');
		});
	});
});

/*================== Dropdown js ==================*/
function DropDown(el) {
	this.dd = el;
	this.placeholder = this.dd.children('span');
	this.opts = this.dd.find('ul.crop-dd li');
	this.val = '';
	this.index = -1;
	this.initEvents();
}
DropDown.prototype = {
	initEvents: function() {
		var obj = this;

		obj.dd.on('click', function(event) {
			if (!$(event.target).closest('.mCSB_draggerContainer', $(this)).length) {
				$(this).toggleClass('active');
				return false;
			}
		});

		obj.opts.on('click', function() {
			var opt = $(this);
			obj.val = opt.text();
			obj.index = opt.index();
			obj.placeholder.text(obj.val);
			obj.dataId = obj.getIndex();
			getSelectVal(obj.index);
		});
	},
	getValue: function() {
		return this.val;
	},
	getIndex: function() {
		return this.index;
	},
};
$(function() {
	var dd = new DropDown($('#crop_select1'));
	$(document).click(function(e) {
		if (
			!$(event.target).closest('#crop_select1 .mCSB_draggerContainer').length
		) {
			$('.crop-select').removeClass('active');
		}
	});
});
var expo = undefined;
var imgLoaded = false;
var toOpenConfirmation;
var undoStack = [];
var appliedFilter = '';
var isPreviewOn = false;
var redoStack = [];
var baseOriginalCanvas;
var basePreviewCanvas;
var baseEditCanvas;

var heightRatioEditOriginal = 0.0;
var heightRatioPreviewOriginal = 0.0;
var widthRatioEditOriginal = 0.0;
var widthRatioPreviewOriginal = 0.0;

function updateHeightAndWidthRatio() {
	var originalTarget = document.getElementById('original_target');
	var target = document.getElementById('target');
	var previewTarget = document.getElementById('preview_target');
	heightRatioEditOriginal = originalTarget.height / target.height;
	heightRatioPreviewOriginal = originalTarget.height / previewTarget.height;
	widthRatioEditOriginal = originalTarget.width / target.width;
	widthRatioPreviewOriginal = originalTarget.width / previewTarget.width;
	var aspect = target.width / target.height;
	if (aspect < 1) {
		$('.photo-canvas').css('width', '636');
	} else {
		$('.photo-canvas').css('height', '344');
	}
}

function updateDisplayStyles() {
	var originalTarget = document.getElementById('original_target');
	var target = document.getElementById('target');
	var previewTarget = document.getElementById('preview_target');
	originalTarget.style.display = 'none';
	if (isPreviewOn) {
		previewTarget.style.display = 'block';
		if (!!target) {
			target.style.display = 'none';
		}
	} else {
		previewTarget.style.display = 'none';
		if (!!target) {
			target.style.display = 'block';
		}
	}
}

function disableTopOptions() {
	$('#undo, #redo, #revert_all').attr('disabled', 'disabled');
}

function enableTopOptions() {
	$('#undo, #redo, #revert_all').removeAttr('disabled');
}

var check = 0;

function init() {
	var image = document.getElementById('original_target');
	var originalCanvas = getCanvas(image);
	var editCanvas = getCanvas(image);
	var previewCanvas = getCanvas(image);
	editCanvas.style.display = 'block';
	editCanvas.id = 'target';
	previewCanvas.id = 'preview_target';
	originalCanvas.id = 'original_target';
	var previewClose = $('.preview-close').detach();
	var previewLoader = $('#preview_loader').detach();
	$('#preview_overlay')
		.empty()
		.append(previewClose)
		.append(previewLoader);
	$('#edit_container').empty();
	$('#original_container').empty();
	$('.upload-warning').text('');
	document.getElementById('original_container').appendChild(originalCanvas);
	document.getElementById('edit_container').appendChild(editCanvas);
	document.getElementById('preview_overlay').appendChild(previewCanvas);
	undoStack = [];
	check = 1;
	// document.getElementById('undo').getElementsByTagName('svg')[0].style.opacity =
	// 	'0.300012';
	// document
	// 	.getElementById('revert_all')
	// 	.getElementsByTagName('svg')[0].style.opacity = '0.300012';
	document.getElementById('undo').getElementsByTagName('path')[0].style.fill =
		'#9DA3BF';
	document.getElementById('redo').getElementsByTagName('path')[0].style.fill =
		'#9DA3BF';
	document
		.getElementById('revert_all')
		.getElementsByTagName('path')[0].style.fill = '#9DA3BF';
	$('.upload-wrapper').fadeOut(300);
	$('.pic-inner-wrapper, .file-options, .photo-confirm-options').fadeIn(300);
	disableTopOptions();
	enableTracking();
	removeFilterTick();
	resize(636, 344, 'target', function() {
		resize(1000, previewHt, 'preview_target', function() {
			var originalTarget = document.getElementById('original_target');
			var previewTarget = document.getElementById('preview_target');
			var target = document.getElementById('target');
			baseOriginalCanvas = cloneCanvas(originalTarget);
			basePreviewCanvas = cloneCanvas(previewTarget);
			baseEditCanvas = cloneCanvas(target);
			updateHeightAndWidthRatio();
		});
	});
	imgLoaded = true;
}

function getCanvas(image) {
	var canvas = document.createElement('canvas');
	canvas.height = image.height;
	canvas.width = image.width;
	canvas.id = image.id;
	var context = canvas.getContext('2d');
	context.drawImage(image, 0, 0);
	return canvas;
}

function push_to_stacks() {
	var originalTarget = cloneCanvas(document.getElementById('original_target'));
	var target = cloneCanvas(document.getElementById('target'));
	var previewTarget = cloneCanvas(document.getElementById('preview_target'));
	check = 0;
	undoStack.push({
		originalTarget: originalTarget,
		target: target,
		previewTarget: previewTarget,
		appliedFilter: appliedFilter,
		// exposureVal : expo,
	});
	enableTopOptions();
	if (undoStack.length > 0) {
		// document
		// 	.getElementById('undo')
		// 	.getElementsByTagName('svg')[0].style.opacity = '1';
		// document
		// 	.getElementById('revert_all')
		// 	.getElementsByTagName('svg')[0].style.opacity = '1';
		document.getElementById('undo').getElementsByTagName('path')[0].style.fill =
			'#5680FC';
		document
			.getElementById('revert_all')
			.getElementsByTagName('path')[0].style.fill = '#5680FC';
	} else if (undoStack.length === 1) {
		// document
		// 	.getElementById('undo')
		// 	.getElementsByTagName('svg')[0].style.opacity = '0.300012';
		// document
		// 	.getElementById('revert_all')
		// 	.getElementsByTagName('svg')[0].style.opacity = '0.300012';
		document.getElementById('undo').getElementsByTagName('path')[0].style.fill =
			'#9DA3BF';
		document
			.getElementById('revert_all')
			.getElementsByTagName('path')[0].style.fill = '#9DA3BF';
	} else {
		// document
		// 	.getElementById('undo')
		// 	.getElementsByTagName('svg')[0].style.opacity = '0.300012';
		document.getElementById('undo').getElementsByTagName('path')[0].style.fill =
			'#9DA3BF';
	}
	redoStack = [];
	// document.getElementById('redo').getElementsByTagName('svg')[0].style.opacity =
	// 	'0.300012';
	document.getElementById('redo').getElementsByTagName('path')[0].style.fill =
		'#9DA3BF';
}

function applyFilter(callback) {
	if (appliedFilter === 'vintage')
		applyVintage('preview_target', function() {
			applyVintage('target', callback);
		});
	else if (appliedFilter === 'sepia')
		applySepia('preview_target', function() {
			applySepia('target', callback);
		});
	else if (appliedFilter === 'crossProcess')
		applyCrossProcess('preview_target', function() {
			applyCrossProcess('target', callback);
		});
	else if (appliedFilter === 'lomo')
		applyLomo('preview_target', function() {
			applyLomo('target', callback);
		});
	else if (appliedFilter === 'velencia')
		applyVelencia('preview_target', function() {
			applyVelencia('target', callback);
		});
	else if (appliedFilter === 'arzon')
		applyArzon('preview_target', function() {
			applyArzon('target', callback);
		});
	else if (callback) callback.call();
}

function applyOperation(operation) {
	operation('original_target', function() {
		operation('preview_target', function() {
			operation('target', updateHeightAndWidthRatio);
		});
	});
}

function resize(width, height, id, callback) {
	var img = document.getElementById(id);

	var widthRatio = img.width / width;
	var heightRatio = img.height / height;
	var scale = Math.max(widthRatio, heightRatio);
	var resultHeight = img.height / scale;
	var resultWidth = img.width / scale;

	Caman('#' + id, function() {
		if (img.height < height && img.width < width) {
			if (callback) callback();
		} else {
			this.resize({
				height: resultHeight,
				width: resultWidth,
			});
			this.render(callback);
		}
	});
}

function cloneCanvas(oldCanvas) {
	var newCanvas = document.createElement('canvas');
	var context = newCanvas.getContext('2d');

	//set dimensions
	newCanvas.width = oldCanvas.width;
	newCanvas.height = oldCanvas.height;

	//apply the old canvas to the new one
	context.drawImage(oldCanvas, 0, 0);
	newCanvas.style.display = oldCanvas.style.display;
	newCanvas.id = oldCanvas.id;
	return newCanvas;
}

function copyCanvas(fromId, toId) {
	var from = document.getElementById(fromId);
	var canvas = cloneCanvas(from);
	canvas.id = toId;
	var to = document.getElementById(toId);
	canvas.style.display = 'none';
	to.parentNode.replaceChild(canvas, to);
}

function copyOriginalToPreview(callback) {
	copyCanvas('original_target', 'target');
	copyCanvas('original_target', 'preview_target');
	resize(636, 344, 'target', function() {
		resize(1000, previewHt, 'preview_target', function() {
			callback();
			updateDisplayStyles();
		});
	});
}

function applyVintage(id, callback) {
	Caman('#' + id, function() {
		this.vintage();
		if (!!expo) {
			this.exposure(expo);
		}
		this.render(callback);
	});
}

function applySepia(id, callback) {
	Caman('#' + id, function() {
		this.sepia();
		if (!!expo) {
			this.exposure(expo);
		}
		this.render(callback);
	});
}

function applyCrossProcess(id, callback) {
	Caman('#' + id, function() {
		this.crossProcess();
		if (!!expo) {
			this.exposure(expo);
		}
		this.render(callback);
	});
}

function applyLomo(id, callback) {
	Caman('#' + id, function() {
		this.lomo();
		if (!!expo) {
			this.exposure(expo);
		}
		this.render(callback);
	});
}

function applyVelencia(id, callback) {
	Caman('#' + id, function() {
		this.glowingSun();
		if (!!expo) {
			this.exposure(expo);
		}
		this.render(callback);
	});
}

function applyArzon(id, callback) {
	Caman('#' + id, function() {
		this.concentrate();
		if (!!expo) {
			this.exposure(expo);
		}
		this.render(callback);
	});
}

function rotateRight(id, callback) {
	Caman('#' + id, function() {
		this.rotate(90);
		this.render(callback);
	});
}
function rotateLeft(id, callback) {
	Caman('#' + id, function() {
		this.rotate(-90);
		this.render(callback);
	});
}
function flipHorizontal(id, callback) {
	Caman('#' + id, function() {
		this.flipHorizontal();
		this.render(callback);
	});
}
function flipVertical(id, callback) {
	Caman('#' + id, function() {
		this.flipVertical();
		this.render(callback);
	});
}
var newToFilter = false;
document.getElementById('none_filter').onclick = function(e) {
	e.preventDefault();
	if (imgLoaded) {
		showLoader(isPreviewOn);
		if (newToFilter) {
			push_to_stacks();
			newToFilter = false;
		}
		appliedFilter = '';
		removeFilterTick();
		$('#rangeSlider').slider('value', 0);
		// $(this)
		// 	.find('div.filter-check-wrapper')
		// 	.fadeIn(300);
		// $(this).addClass('filter-active');
		removeTempFilterTick();
		$(this).addClass('ftemp-active');
		removeSlider();
		$('#done').removeAttr('disabled');
		// $('.npic-slider-wrap').removeClass('slider-active');
		expo = undefined;
		copyOriginalToPreview(applyFilter);
	}
};
document.getElementById('vintage').onclick = function(e) {
	e.preventDefault();
	if (imgLoaded) {
		if (newToFilter) {
			push_to_stacks();
			newToFilter = false;
		}
		showLoader(isPreviewOn);
		appliedFilter = 'vintage';
		removeFilterTick();
		$('#rangeSlider').slider('value', 0);
		// $(this)
		// 	.find('div.filter-check-wrapper')
		// 	.fadeIn(300);
		// $(this).addClass('filter-active');
		removeTempFilterTick();
		$(this).addClass('ftemp-active');
		showSlider();
		$('#done').attr('disabled', 'disabled');
		blockOnFiter();
		expo = undefined;
		copyOriginalToPreview(applyFilter);
	}
};
document.getElementById('sepia').onclick = function(e) {
	e.preventDefault();
	if (imgLoaded) {
		if (newToFilter) {
			push_to_stacks();
			newToFilter = false;
		}
		showLoader(isPreviewOn);
		appliedFilter = 'sepia';
		removeFilterTick();
		$('#rangeSlider').slider('value', 0);
		// $(this)
		// 	.find('div.filter-check-wrapper')
		// 	.fadeIn(300);
		// $(this).addClass('filter-active');
		removeTempFilterTick();
		$(this).addClass('ftemp-active');
		showSlider();
		$('#done').attr('disabled', 'disabled');
		blockOnFiter();
		expo = undefined;
		copyOriginalToPreview(applyFilter);
	}
};
document.getElementById('crossProcess').onclick = function(e) {
	e.preventDefault();
	if (imgLoaded) {
		if (newToFilter) {
			push_to_stacks();
			newToFilter = false;
		}
		showLoader(isPreviewOn);
		appliedFilter = 'crossProcess';
		removeFilterTick();
		$('#rangeSlider').slider('value', 0);
		// $(this)
		// 	.find('div.filter-check-wrapper')
		// 	.fadeIn(300);
		// $(this).addClass('filter-active');
		removeTempFilterTick();
		$(this).addClass('ftemp-active');
		showSlider();
		$('#done').attr('disabled', 'disabled');
		blockOnFiter();
		expo = undefined;
		copyOriginalToPreview(applyFilter);
	}
};
document.getElementById('lomo').onclick = function(e) {
	e.preventDefault();
	if (imgLoaded) {
		if (newToFilter) {
			push_to_stacks();
			newToFilter = false;
		}
		showLoader(isPreviewOn);
		appliedFilter = 'lomo';
		removeFilterTick();
		$('#rangeSlider').slider('value', 0);
		// $(this)
		// 	.find('div.filter-check-wrapper')
		// 	.fadeIn(300);
		// $(this).addClass('filter-active');
		removeTempFilterTick();
		$(this).addClass('ftemp-active');
		showSlider();
		$('#done').attr('disabled', 'disabled');
		blockOnFiter();
		expo = undefined;
		copyOriginalToPreview(applyFilter);
	}
};
document.getElementById('glowingSun').onclick = function(e) {
	e.preventDefault();
	if (imgLoaded) {
		if (newToFilter) {
			push_to_stacks();
			newToFilter = false;
		}
		showLoader(isPreviewOn);
		appliedFilter = 'velencia';
		removeFilterTick();
		$('#rangeSlider').slider('value', 0);
		removeTempFilterTick();
		$(this).addClass('ftemp-active');
		showSlider();
		$('#done').attr('disabled', 'disabled');
		blockOnFiter();
		expo = undefined;
		copyOriginalToPreview(applyFilter);
	}
};
function showSlider() {
	$('.npic-filter-wrap').addClass('s-active');
	$('.npic-slider-wrap').addClass('slider-active');
}
function removeSlider() {
	$('.npic-filter-wrap').removeClass('s-active');
	$('.npic-slider-wrap').removeClass('slider-active');
}
$(function() {
	$('#rangeSlider').slider({
		range: 'max',
		min: -50,
		max: 50,
		step: 1,
		value: 0,
		slide: function(event, ui) {},
		stop: function(event, ui) {
			expo = ui.value;
			// sendTrackerData('UserClick', 'EffectValueSlide', expo, '');
			showLoader(isPreviewOn);
			// appliedFilter = 'vintage';
			// removeTempFilterTick();
			// $(this).addClass('ftemp-active');
			// $('.npic-slider-wrap').addClass('slider-active');
			copyOriginalToPreview(applyFilter);
		},
	});
});
$('#apply_filter').click(function(e) {
	e.preventDefault();
	removeSlider();
	// $('.npic-slider-wrap').removeClass('slider-active');
	// push_to_stacks();
	$('#done').removeAttr('disabled');
	showLoader(isPreviewOn);
	removeFilterTick();
	newToFilter = true;
	showOnFilter();
	$('.ftemp-active')
		.addClass('filter-active')
		.removeClass('ftemp-active');

	copyOriginalToPreview(applyFilter);
});
$('#reset_filter').click(function(e) {
	e.preventDefault();
	removeSlider();
	// $('.npic-slider-wrap').removeClass('slider-active');
	$('#done').removeAttr('disabled');
	newToFilter = true;
	showOnFilter();
	showLoader(isPreviewOn);
	// appliedFilter = '';
	removeTempFilterTick();
	expo = undefined;
	// copyOriginalToPreview(applyFilter);
	displayFirstFiterCanvas();
});
function removeTempFilterTick() {
	$('.npic-options-filter li a').removeClass('ftemp-active');
}

function displayFirstFiterCanvas() {
	var withOutFilter = undoStack.pop();
	var currentOp = {
		originalTarget: null,
		target: null,
		previewTarget: null,
		appliedFilter: '',
	};
	var currentImage = document.getElementById('original_target');
	currentOp.originalTarget = currentImage;
	if (withOutFilter) {
		currentImage.parentNode.replaceChild(
			withOutFilter.originalTarget,
			currentImage
		);
	}
	currentImage = document.getElementById('target');
	currentOp.target = currentImage;
	if (withOutFilter) {
		currentImage.parentNode.replaceChild(withOutFilter.target, currentImage);
	}
	currentImage = document.getElementById('preview_target');
	currentOp.previewTarget = currentImage;
	if (withOutFilter) {
		currentImage.parentNode.replaceChild(
			withOutFilter.previewTarget,
			currentImage
		);
	}
	currentOp.appliedFilter = appliedFilter;
	if (withOutFilter) {
		appliedFilter = withOutFilter.appliedFilter;
	}
	updateHeightAndWidthRatio();
	updateDisplayStyles();
}
function blockOnFiter() {
	$(
		'.edit-options li a, #preview, .preview-close, .file-options-list li a'
	).css('pointer-events', 'none');
	// $('#apply_rotate').css('pointer-events', 'initial');
	// $('.rotate-list li a, .filter-options li a').css('pointer-events', 'none');
}

function showOnFilter() {
	$(
		'.edit-options li a, #preview, .preview-close, .file-options-list li a'
	).css('pointer-events', 'initial');
	// $('#apply_rotate').css('pointer-events', 'none');
	// $('.rotate-list li a, .filter-options li a').css('pointer-events', 'initial');
}

var newToRotate = false;
$('.npic-rf-wrap').click(function(e) {
	e.preventDefault();
	if (imgLoaded) {
		$('#done').attr('disabled', 'disabled');
		blockOnRotate();
		$('.npic-rf-wrap').removeClass('rf-active');
		$(this).addClass('rf-active');
		$('.npic-rotate-btn-wrap').removeClass('npic-rotate-btn-inactive');
		// data-rf_id
		$('npic-rotate-btn-wrap').removeClass('npic-rotate-btn-inactive');
		tempRotateFlip(parseInt($(this).attr('data-rf_id')));
	}
});
function tempRotateFlip(rf_id) {
	switch (rf_id) {
		case 1:
			if (newToRotate) {
				push_to_stacks();
				newToRotate = false;
			}
			rotateRight('original_target', function() {
				copyOriginalToPreview(applyFilter);
			});
			break;
		case 2:
			if (newToRotate) {
				push_to_stacks();
				newToRotate = false;
			}
			rotateLeft('original_target', function() {
				copyOriginalToPreview(applyFilter);
			});
			break;
		case 3:
			if (newToRotate) {
				push_to_stacks();
				newToRotate = false;
			}
			applyOperation(flipHorizontal);
			break;
		case 4:
			if (newToRotate) {
				push_to_stacks();
				newToRotate = false;
			}
			applyOperation(flipVertical);
			break;
		default:
			break;
	}
}
$('#apply_rotate').click(function(e) {
	e.preventDefault();
	if (imgLoaded) {
		$('.npic-rf-wrap').removeClass('rf-active');
		$('.npic-rotate-btn-wrap').addClass('npic-rotate-btn-inactive');
		$('#done').removeAttr('disabled');
		$('npic-rotate-btn-wrap').addClass('npic-rotate-btn-inactive');
		showOnRotate();
		newToRotate = true;
		// push_to_stacks();
	}
});

$('#reset_rotate').click(function(e) {
	e.preventDefault();
	if (imgLoaded) {
		$('.npic-rf-wrap').removeClass('rf-active');
		$('.npic-rotate-btn-wrap').addClass('npic-rotate-btn-inactive');
		$('#done').removeAttr('disabled');
		$('npic-rotate-btn-wrap').addClass('npic-rotate-btn-inactive');
		newToRotate = true;
		showOnRotate();
		displayFirstRotateCanvas();
	}
});
function blockOnRotate() {
	$(
		'.edit-options li a, #preview, .preview-close, .file-options-list li a'
	).css('pointer-events', 'none');
	// $('#apply_rotate').css('pointer-events', 'initial');
	// $('.rotate-list li a, .filter-options li a').css('pointer-events', 'none');
}

function showOnRotate() {
	$(
		'.edit-options li a, #preview, .preview-close, .file-options-list li a'
	).css('pointer-events', 'initial');
	// $('#apply_rotate').css('pointer-events', 'none');
	// $('.rotate-list li a, .filter-options li a').css('pointer-events', 'initial');
}
function displayFirstRotateCanvas() {
	var withOutRotate = undoStack.pop();
	var currentOp = {
		originalTarget: null,
		target: null,
		previewTarget: null,
		appliedFilter: '',
	};
	var currentImage = document.getElementById('original_target');
	currentOp.originalTarget = currentImage;
	currentImage.parentNode.replaceChild(
		withOutRotate.originalTarget,
		currentImage
	);
	currentImage = document.getElementById('target');
	currentOp.target = currentImage;
	currentImage.parentNode.replaceChild(withOutRotate.target, currentImage);
	currentImage = document.getElementById('preview_target');
	currentOp.previewTarget = currentImage;
	currentImage.parentNode.replaceChild(
		withOutRotate.previewTarget,
		currentImage
	);
	currentOp.appliedFilter = appliedFilter;
	appliedFilter = withOutRotate.appliedFilter;
	updateHeightAndWidthRatio();
	updateDisplayStyles();
}
document.getElementById('revert_all').onclick = function(e) {
	if (imgLoaded) {
		if (check == 1) {
			disableTopOptions();
		} else {
			push_to_stacks();
			// document
			// 	.getElementById('revert_all')
			// 	.getElementsByTagName('svg')[0].style.opacity = '0.300012';
			document
				.getElementById('revert_all')
				.getElementsByTagName('path')[0].style.fill = '#9DA3BF';

			enableTopOptions();
			removeFilterTick();
			var oldImage = document.getElementById('original_target');
			oldImage.parentNode.replaceChild(
				cloneCanvas(baseOriginalCanvas),
				oldImage
			);
			oldImage = document.getElementById('preview_target');
			oldImage.parentNode.replaceChild(
				cloneCanvas(basePreviewCanvas),
				oldImage
			);
			oldImage = document.getElementById('target');
			oldImage.parentNode.replaceChild(cloneCanvas(baseEditCanvas), oldImage);
			appliedFilter = '';
			updateHeightAndWidthRatio();
			updateDisplayStyles();
			applyFilter();
		}
	}
};
document.getElementById('undo').onclick = function(e) {
	if (imgLoaded) {
		if (undoStack.length === 0) {
			return;
		}
		if (undoStack.length > 1) {
			// document
			// 	.getElementById('undo')
			// 	.getElementsByTagName('svg')[0].style.opacity = '1';
			document
				.getElementById('undo')
				.getElementsByTagName('path')[0].style.fill = '#5680FC';
		} else if (undoStack.length <= 1) {
			// document
			// 	.getElementById('undo')
			// 	.getElementsByTagName('svg')[0].style.opacity = '0.300012';
			document
				.getElementById('undo')
				.getElementsByTagName('path')[0].style.fill = '#9DA3BF';
		} else {
			// document
			// 	.getElementById('undo')
			// 	.getElementsByTagName('svg')[0].style.opacity = '0.300012';
			document
				.getElementById('undo')
				.getElementsByTagName('path')[0].style.fill = '#9DA3BF';
		}

		var lastOp = undoStack.pop();
		var currentOp = {
			originalTarget: null,
			target: null,
			previewTarget: null,
			appliedFilter: '',
		};
		var currentImage = document.getElementById('original_target');
		currentOp.originalTarget = currentImage;
		currentImage.parentNode.replaceChild(lastOp.originalTarget, currentImage);
		currentImage = document.getElementById('target');
		currentOp.target = currentImage;
		currentImage.parentNode.replaceChild(lastOp.target, currentImage);
		currentImage = document.getElementById('preview_target');
		currentOp.previewTarget = currentImage;
		currentImage.parentNode.replaceChild(lastOp.previewTarget, currentImage);
		currentOp.appliedFilter = appliedFilter;
		appliedFilter = lastOp.appliedFilter;

		removeFilterTick();
		applyTickOnFilter(appliedFilter);

		redoStack.push(currentOp);
		updateHeightAndWidthRatio();
		updateDisplayStyles();
		document.getElementById('redo').getElementsByTagName('path')[0].style.fill =
			'#5680FC';
	}
};
document.getElementById('redo').onclick = function(e) {
	if (imgLoaded) {
		if (redoStack.length === 0) return;
		var currentOp = {
			originalTarget: null,
			target: null,
			previewTarget: null,
			appliedFilter: '',
		};
		document.getElementById('undo').getElementsByTagName('path')[0].style.fill =
			'#5680FC';

		var nextOp = redoStack.pop();
		var currentImage = document.getElementById('original_target');
		currentOp.originalTarget = currentImage;
		currentImage.parentNode.replaceChild(nextOp.originalTarget, currentImage);

		currentImage = document.getElementById('target');
		currentOp.target = currentImage;
		currentImage.parentNode.replaceChild(nextOp.target, currentImage);

		currentImage = document.getElementById('preview_target');
		currentOp.previewTarget = currentImage;
		currentImage.parentNode.replaceChild(nextOp.previewTarget, currentImage);

		currentOp.appliedFilter = appliedFilter;
		appliedFilter = nextOp.appliedFilter;
		removeFilterTick();
		applyTickOnFilter(appliedFilter);

		undoStack.push(currentOp);
		updateHeightAndWidthRatio();
		updateDisplayStyles();
		// applyFilter();
		if (redoStack.length >= 1) {
			document
				.getElementById('redo')
				.getElementsByTagName('path')[0].style.fill = '#5680FC';
		} else if (redoStack.length < 1) {
			document
				.getElementById('redo')
				.getElementsByTagName('path')[0].style.fill = '#9DA3BF';
		} else {
			document
				.getElementById('redo')
				.getElementsByTagName('path')[0].style.fill = '#9DA3BF';
		}
	}
};
function applyTickOnFilter(typeFilter) {
	var filterId;
	if (typeFilter == 'glowingSun') {
		filterId = 'velencia';
	} else {
		filterId = typeFilter;
	}
	if(filterId) $('#' + filterId).addClass('filter-active');
}
var previewHt = 0;
function getOverlayHt() {
	var mainSectionWrapperHt = $('.mainWrapper').height();
	previewHt = mainSectionWrapperHt - 198;
	$('.preview-overlay').height(previewHt);
	return previewHt;
}

var pic_upload = $('#pic_upload');
// pic_upload.on('click', function() {
// 	this.value = null;
// });

pic_upload.on('change', function () {
    previewFile();
});

function previewFile() {
	var preview = document.getElementById('original_target');
	var file = document.querySelector('input[type=file]').files[0];
	var validImageTypes = ['image/jpeg', 'image/png'];
	var reader = new FileReader();
	var fileName = '';
	// sendTrackerData('UserClick', 'NewImageBtn', file, '');
	reader.onloadend = function() {
		preview.src = reader.result;
	};

	if (file) {
		fileName = file.name;
		getFileName(fileName);
		reader.readAsDataURL(file);
	} else {
		preview.src = '';
	}
	if (!validImageTypes.includes(file.type)) {
		$('.upload-warning')
			.text('Please select either JPG or PNG image')
			.show();
	} else if (file.size > 5242880) {
		$('.upload-warning')
			.text('Maximum image size exceeded: 5 MB')
			.show();
	} else {
		preview.onload = function() {
			getOverlayHt();
			init();
		};
	}
}

function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.dataTransfer.files; // FileList object.
	// files is a FileList of File objects. List some properties.
	if (files.length > 1) {
		$('.upload-warning')
			.text('Please select only 1 file')
			.show();
	} else if (files[0].type !== 'image/jpeg' && files[0].type !== 'image/png') {
		$('.upload-warning')
			.text('Please select either JPG or PNG image')
			.show();
	} else if (files[0].size > 5242880) {
		$('.upload-warning')
			.text('Maximum image size exceeded: 5 MB')
			.show();
	} else {
		passFile(files);
	}
}

function removeFilterTick() {
	// $('.filter-check-wrapper').hide();
	$('.npic-options-filter li a').removeClass('filter-active');
}

function passFile(fileName) {
	var preview = document.getElementById('original_target');
	var file = fileName[0];
	var reader = new FileReader();

	reader.onloadend = function() {
		preview.src = reader.result;
	};

	if (file) {
		getFileName(file.name);
		reader.readAsDataURL(file);
	} else {
		preview.src = '';
	}
	preview.onload = function() {
		getOverlayHt();
		init();
	};
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

var jcrop_api;
var targetCanvas;
var previewTargetCanvas;
function selectCrop(aspect) {
	targetCanvas = cloneCanvas(document.getElementById('target'));
	previewTargetCanvas = cloneCanvas(document.getElementById('preview_target'));
	if (isPreviewOn) {
		$('#preview_target').Jcrop(
			{
				aspectRatio: aspect,
			},
			function() {
				jcrop_api = this;
				jcrop_api.animateTo([0, 0, 80, 45]);
			}
		);
	} else {
		$('#target').Jcrop(
			{
				aspectRatio: aspect,
			},
			function() {
				jcrop_api = this;
				jcrop_api.animateTo([0, 0, 80, 45]);
			}
		);
	}
}

function openPreview() {
	isPreviewOn = !isPreviewOn;
	var topWrapperHt = $('.top-wrapper').height(),
		photoConfirmHt = $('.photo-confirm-options').height(),
		docHt = $(window).height(),
		finalht = docHt - (topWrapperHt + photoConfirmHt);
	$('.pic-inner-flow').addClass('active');
	$('.preview-overlay')
		.fadeIn(300)
		.css('display', 'flex');
	checkPreview();
	$('#preview_target').fadeIn(300);
	$('.mainSection').addClass('toggleUp');
	$('#edit_tabs, .edit-options-tab').css('height', 'auto');
	$(
		'.pic-wrapper-handle, #img_container, .edit-options, footer, .tileswrap'
	).fadeOut(300);
	$('.edit-options-tab').show();
	$('.pic-inner-flow')
		.css('height', finalht)
		.css('background', '#ffffff');
	$('.edit-tab-inner-wrapper').css(
		'border-bottom',
		'1px solid rgba(0,0,0,0.1)'
	);
	$('.edit-options-tab:last-child .edit-tab-inner-wrapper').css(
		'border-bottom',
		'none'
	);
	updateDisplayStyles();
}

function closePreview() {
	isPreviewOn = false;
	checkPreview();
	$('.preview-overlay, #preview_target').fadeOut(300);
	$('.mainSection').removeClass('toggleUp');
	$(
		'.pic-wrapper-handle, #img_container, #target, .edit-options, footer, .tileswrap'
	).fadeIn(300);
	if ($(window).height() < 750) {
		$('.pic-inner-flow')
			.css('height', '210px')
			.css('background', 'transparent');
		$('#edit_tabs').css('height', '210px');
	} else {
		$('.pic-inner-flow')
			.css('height', '350px')
			.css('background', 'transparent');
		$('#edit_tabs').css('height', '350px');
	}
	$('.pic-inner-flow').removeClass('active');
	$('.edit-options-tab').hide();
	$('.edit-options li').removeClass('active');
	$('.edit-options li:first-child').addClass('active');
	$('.edit-options-tab-wrapper > div:first-of-type').show();
	$('.edit-tab-inner-wrapper').css('border-bottom', 'none');
	updateDisplayStyles();
}
$('.npic-crop-dd li a').click(function(e) {
	if (imgLoaded) {
		$('.npic-crop-dd li a').removeClass('cp-active');
		$(this).addClass('cp-active');
		$('#done').attr('disabled', 'disabled');
		getSelectVal(parseInt($(this).attr('data-id')));
	}
});
function getSelectVal(index) {
	$('#crop_control').show();
	//updateDisplayStyles();
	switch (index) {
		case 0:
			$('#apply_crop').css('pointer-events', 'none');
			return;
		case 1:
			selectCrop(0);
			// $('#reset_crop').text('Reset');
			blockOnCrop();
			break;
		case 2:
			selectCrop(1);
			blockOnCrop();
			// $('#reset_crop').text('Reset');
			break;
		case 3:
			selectCrop(16 / 9);
			blockOnCrop();
			// $('#reset_crop').text('Reset');
			break;
		case 4:
			selectCrop(9 / 16);
			blockOnCrop();
			// $('#reset_crop').text('Reset');
			break;
		case 5:
			selectCrop(4 / 5);
			blockOnCrop();
			// $('#reset_crop').text('Reset');
			break;
		case 6:
			selectCrop(2 / 1);
			blockOnCrop();
			// $('#reset_crop').text('Reset');
			break;
		case 7:
			selectCrop(2 / 3);
			blockOnCrop();
			// $('#reset_crop').text('Reset');
			break;
		case 8:
			selectCrop(1 / 2);
			blockOnCrop();
			// $('#reset_crop').text('Reset');
			break;
		default:
			selectCrop(0);
	}
}
$('.crop-select').on('change', function() {
	getSelectVal();
});
$('#apply_crop').css('pointer-events', 'none');
// $('#apply_rotate').css('pointer-events', 'none');
$('#apply_crop').click(function(e) {
	if (imgLoaded) {
		var selection = jcrop_api.tellSelect();
		jcrop_api.destroy();
		$('#done').removeAttr('disabled');
		// $('#reset_crop').text('');
		$('.inner-overlay').hide();
		var target = {};
		if (isPreviewOn) {
			target = {
				x: selection.x * widthRatioPreviewOriginal,
				y: selection.y * heightRatioPreviewOriginal,
				w: selection.w * widthRatioPreviewOriginal,
				h: selection.h * heightRatioPreviewOriginal,
			};
			document
				.getElementById('preview_overlay')
				.appendChild(previewTargetCanvas);
		} else {
			target = {
				x: selection.x * widthRatioEditOriginal,
				y: selection.y * heightRatioEditOriginal,
				w: selection.w * widthRatioEditOriginal,
				h: selection.h * heightRatioEditOriginal,
			};
			document.getElementById('edit_container').appendChild(targetCanvas);
		}
		push_to_stacks();
		Caman('#original_target', function() {
			this.crop(target.w, target.h, target.x, target.y);
			this.render(function() {
				$('#crop_control').hide();
				copyOriginalToPreview(function() {
					updateHeightAndWidthRatio();
					applyFilter(function() {
						jcrop_api = undefined;
					});
				});
			});
		});
		showOnCrop();
		$('.npic-crop-dd li a').removeClass('cp-active');
	}
});
$('#reset_crop').click(function(e) {
	if (imgLoaded) {
		if (!!$('.npic-crop-dd li a.cp-active').length) {
			var index0 = $('.crop-dd')
				.find('li:first-child')
				.children('a')
				.text();
			showOnCrop();
			$('.inner-overlay').hide();
			// $(this).text('');
			$('#crop_select1 span').text(index0);
			if (!jcrop_api) return;
			jcrop_api.destroy();
			if (isPreviewOn) {
				document
					.getElementById('preview_overlay')
					.appendChild(previewTargetCanvas);
			} else {
				document.getElementById('edit_container').appendChild(targetCanvas);
			}
			jcrop_api = undefined;
			$('.npic-crop-dd li a').removeClass('cp-active');
		}
	}
});

function blockOnCrop() {
	$(
		'.edit-options li a, #preview, .preview-close, .file-options-list li a'
	).css('pointer-events', 'none');
	$('#apply_crop').css('pointer-events', 'initial');
	$('.rotate-list li a, .filter-options li a').css('pointer-events', 'none');
}

function showOnCrop() {
	$(
		'.edit-options li a, #preview, .preview-close, .file-options-list li a'
	).css('pointer-events', 'initial');
	$('#apply_crop').css('pointer-events', 'none');
	$('.rotate-list li a, .filter-options li a').css('pointer-events', 'initial');
}

function openNewPrompt() {
	$('.open-overlay')
		.fadeIn(300)
		.css('display', 'flex');
	$('.pictab-wrapper').css('-webkit-filter', 'blur(5px)');
}

$('#cancel').on('click', function(e) {
	e.preventDefault();
	if (imgLoaded) {
		openNewPrompt();
	}
});

function checkPreview() {
	if (!isPreviewOn && $(window).height() <= 800) {
		$('#filter').css('max-height', '180px');
		$('.crop-dd').css('max-height', '90px');
		$('.crop-dd').css('position', 'absolute');
	} else {
		$('#filter, .crop-dd').css('max-height', 'none');
		$('.crop-dd').css('position', 'relative');
	}
}
checkPreview();
$('#done').click(function(e) {
	e.preventDefault();
	e.stopPropagation();
	// sendTrackerData('UserClick', 'SavePictabBtn', '', '');
	if (imgLoaded) {
		if ($(this).attr('disabled') == 'disabled') {
			return;
		} else {
			var uploadContainer = document.getElementById('upload-container');
			var canvas = cloneCanvas(document.getElementById('original_target'));
			canvas.id = 'upload_target';
			if (uploadContainer.childElementCount > 0)
				uploadContainer.removeChild(uploadContainer.childNodes[0]);
			uploadContainer.appendChild(canvas);
			$('.share-overlay')
				.show()
				.css('display', 'flex');
			$('#share_loader').show();
			downloadPreProcess('upload_target', function() {
				showShareOverlay();
				passImageData('upload_target');
			});
		}
	}
});

$('#cancel_share').click(function(e) {
	e.preventDefault();
	cancelShareOverlay();
	$('.share-option-list').hide();
});

function showShareOverlay() {
	$('#share_loader').fadeOut();
	$('.logos, .pic-wrapper-handle').css('pointer-events', 'none');
	$('.pictab-wrapper').css('-webkit-filter', 'blur(5px)');
}

function cancelShareOverlay() {
	$('.pictab-wrapper').css('-webkit-filter', 'blur(0px)');
	$('.share-overlay')
		.fadeOut(300)
		.css('display', 'none');
	$('.logos, .pic-wrapper-handle').css('pointer-events', 'initial');
}
function widgetTabFunc(){
    if (isPreviewOn && $(window).height() <= 730) {
        $('.edit-options-tab, .pic-inner-flow').css('height', 'auto !important');
    } else if (!isPreviewOn && $(window).height() <= 730) {
        $('.edit-options-tab, .pic-inner-flow').css('height', '170px !important');
    }
    if ($(window).height() < 750) {
        $('.pic-inner-flow')
            .css('height', '210px')
            .css('background', 'transparent');
        $('#edit_tabs').css('height', '210px');
        /** npic
        $('.pic-inner-flow').mCustomScrollbar();
        */
    } else {
        $('.pic-inner-flow')
            .css('height', '350px')
            .css('background', 'transparent');
        $('#edit_tabs').css('height', '350px');
    }

    $('#open').on('click', function(e) {
        e.preventDefault();
        if (imgLoaded) {
            if (undoStack.length >= 1) {
                toOpenConfirmation = 'DEPEND';
                openNewPrompt();
            } else {
                $('.open-overlay , .pic-inner-wrapper').hide();
                $('.upload-wrapper').fadeIn(300);
                $('.pictab-wrapper').css('-webkit-filter', 'blur(0px)');
                $('.photo-canvas')
                    .css('width', 'auto')
                    .css('height', 'auto');
                undoStack = [];
                redoStack = [];
                appliedFilter = '';
                $('#pic_upload').val('');
                $('#target, #original_target, #preview_target, #upload_target').remove();
                var originalTargetImg = document.createElement('img');
                originalTargetImg.setAttribute('id', 'original_target');
                document
                    .getElementById('original_container')
                    .appendChild(originalTargetImg);
                imgLoaded = false;
                // disableTracking();
                $('#pic_upload')[0].click();
            }
        } else {
            $('#pic_upload')[0].click();
        }
    });
    $('#open_new').click(function() {
        closePreview();
        $('.open-overlay , .pic-inner-wrapper').hide();
        $('.upload-wrapper').fadeIn(300);
        $('.pictab-wrapper').css('-webkit-filter', 'blur(0px)');
        $('.photo-canvas')
            .css('width', 'auto')
            .css('height', 'auto');
        undoStack = [];
        redoStack = [];
        appliedFilter = '';
        $('#pic_upload').val('');
        $('#target, #original_target, #preview_target, #upload_target').remove();
        var originalTargetImg = document.createElement('img');
        originalTargetImg.setAttribute('id', 'original_target');
        document.getElementById('original_container').appendChild(originalTargetImg);
        imgLoaded = false;
        $('.npic-crop-dd li a').removeClass('cp-active');
        removeFilterTick();
        disableTracking();
        $('.edit-options li a, #preview, .preview-close').css(
            'pointer-events',
            'initial'
        );
        // $(
        // 	'.edit-options li a, #preview, .preview-close, .file-options-list li a'
        // ).css('pointer-events', 'initial');
        document.getElementById('undo').getElementsByTagName('path')[0].style.fill =
            '#9DA3BF';
        document.getElementById('redo').getElementsByTagName('path')[0].style.fill =
            '#9DA3BF';
        document
            .getElementById('revert_all')
            .getElementsByTagName('path')[0].style.fill = '#9DA3BF';
        if (toOpenConfirmation == 'DEPEND') {
            $('#pic_upload')[0].click();
            toOpenConfirmation = undefined;
        }
    });
    $('#dont_open_new').click(function() {
        $('.open-overlay').fadeOut(300);
        $('.pictab-wrapper').css('-webkit-filter', 'blur(0px)');
    });
    /*================== Toggle Editor ==================*/
    var handleName = $('.handle-name').text();
    $('.toggleCloseOpenWidget,.logo-box').click(function() {
        if ($('.pictab_widget_wrap').hasClass('active')) {
            $('[n-widgetclick="crop"]').removeClass('active');
            $('[n-widgetclick="rotate"]').removeClass('active');
        } else if ($('.crop-li').hasClass('active')) {
            $('[n-widgetclick="crop"]').addClass('active');
        } else if ($('.rotate-li').hasClass('active')) {
            $('[n-widgetclick="rotate"]').addClass('active');
        } else if ($('.filter-li').hasClass('active')) {
            $('[n-widgetclick="crop"]').removeClass('active');
            $('[n-widgetclick="rotate"]').removeClass('active');
        }
        $('.pictab-wrapper, .mainWrapper,.pictab_widget_wrap,.logo-box').toggleClass(
            'active'
        );
        $('.search-adjust').toggleClass('sa-active');
        if ($('.pictab-wrapper').hasClass('active')) {
            $('#open_widget').trigger('click');
            $('.handle-name').html(
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" fill-rule="nonzero" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M14.482.656L.57 14.568M.57.656l13.912 13.912"/></g></svg>'
            );
            setTimeout(function() {
                $('.photo-confirm-options').css('right', '0px');
            }, 300);
        } else {
            $('.handle-name').text(handleName);
            $('#close_widget').trigger('click');
            $('.photo-confirm-options').css('right', '-300px');
        }
    });

    /*================== Editor Tabs ==================*/
    $('.edit-options-tab-wrapper > div').hide();
    $('.edit-options-tab-wrapper > div:first-of-type').show();
    $('.edit-options a').click(function(e) {
        e.preventDefault();
        var $this = $(this),
            tabgroup = '#' + $this.parents('.edit-options').data('tabgroup'),
            others = $this.closest('li').siblings(),
            target = $this.attr('href');
        others.removeClass('active');
        $this.parent().addClass('active');
        $(tabgroup)
            .children('div')
            .hide();
        $(target).fadeIn('slow');
        if (target == '#rotate' && imgLoaded) {
            newToRotate = true;
        } else if (target == '#filter' && imgLoaded) {
            newToFilter = true;
        }
    });

    /*================== Preview Functionality==================*/

    $('.preview-icon').on('click', openPreview);
    $('.preview-close').on('click', closePreview);
}
/*================== Download function ==================*/
var ogFileName = '';
function getFileName(fileName) {
	ogFileName = fileName;
}

function showLoader(check) {
	if (!check) {
		$('#target_loader').fadeIn(300);
		setTimeout(function() {
			$('#target_loader').fadeOut(300);
		}, 1500);
	} else {
		$('#preview_loader').fadeIn(300);
		setTimeout(function() {
			$('#preview_loader').fadeOut(300);
		}, 1500);
	}
}

function downloadPreProcess(id, callback) {
	if (appliedFilter === 'vintage') applyVintage(id, callback);
	else if (appliedFilter === 'sepia') applySepia(id, callback);
	else if (appliedFilter === 'crossProcess') applyCrossProcess(id, callback);
	else if (appliedFilter === 'lomo') applyLomo(id, callback);
	else if (appliedFilter === 'velencia') applyVelencia(id, callback);
	else if (appliedFilter === 'arzon') applyArzon(id, callback);
	else if (callback) callback();
}
$('#download_img').on('click', function(e) {
	e.preventDefault();
	cancelShareOverlay();
	var fileExtension = ogFileName.slice(-4);
	if (fileExtension == '.jpg' || fileExtension == '.png') {
		var actualName = ogFileName.substring(0, ogFileName.length - 4);
	}
	download($('#upload_target'), actualName + '-edited.jpg');
});

function download(canvas, filename) {
	var e;
	var lnk = document.createElement('a');

	lnk.download = filename;
	lnk.href = canvas[0].toDataURL('image/jpeg', 0.8);

	if (document.createEvent) {
		e = document.createEvent('MouseEvents');
		e.initMouseEvent(
			'click',
			true,
			true,
			window,
			0,
			0,
			0,
			0,
			0,
			false,
			false,
			false,
			false,
			0,
			null
		);
		lnk.dispatchEvent(e);
	} else if (lnk.fireEvent) {
		lnk.fireEvent('onclick');
	}
}

function passImageData(divName) {
	var printContents = document.getElementById(divName).toDataURL();
	$('.show-div img').attr('src', printContents);
}

/*================== Share Function removed ==================*/
/*================== Share Function removed ==================*/


function disableTracking() {
	$('#undo,#redo,#revert_all,#cancel,#done').addClass('no-impress');
	$('.photo-confirm-save-btn').addClass('not-allowed');
}
function enableTracking() {
	$('#undo,#redo,#revert_all,#cancel,#done').removeClass('no-impress');
	$('.photo-confirm-save-btn').removeClass('not-allowed');
}

function initWidgetFunctionality() {
    
    // widget functionality here
    widgetTabFunc();
    // linkout click
    $('[n-widgetclick="crop"]').click(function(e) {
        e.preventDefault();
        if ($('[n-widgetclick="crop"]').hasClass('active')) {
            $('.search-adjust').removeClass('sa-active');
            $('.logo-box').removeClass('active');
            $('.pictab_widget_wrap ').removeClass('active');
            $('[n-widgetclick="crop"]').removeClass('active');
        } else if ($('.pictab_widget_wrap ').hasClass('active')) {
            $('[n-widgetclick="crop"]').addClass('active');
            $('[n-widgetclick="rotate"]').removeClass('active');
            $('.npic-crop-m').trigger('click');
        } else {
            $('.search-adjust').addClass('sa-active');
            $('.logo-box').addClass('active');
            $('.pictab_widget_wrap ').addClass('active');
            $('[n-widgetclick="crop"]').addClass('active');
            $('[n-widgetclick="rotate"]').removeClass('active');
            $('.npic-crop-m').trigger('click');
        }
    });
    $('[n-widgetclick="rotate"]').click(function(e) {
        e.preventDefault();
        if ($('[n-widgetclick="rotate"]').hasClass('active')) {
            $('.search-adjust').removeClass('sa-active');
            $('.logo-box').removeClass('active');
            $('.pictab_widget_wrap ').removeClass('active');
            $('[n-widgetclick="rotate"]').removeClass('active');
        } else if ($('.pictab_widget_wrap ').hasClass('active')) {
            $('[n-widgetclick="rotate"]').addClass('active');
            $('[n-widgetclick="crop"]').removeClass('active');
            $('.npic-rotate-m').trigger('click');
        } else {
            $('.search-adjust').addClass('sa-active');
            $('.logo-box').addClass('active');
            $('.pictab_widget_wrap ').addClass('active');
            $('[n-widgetclick="rotate"]').addClass('active');
            $('[n-widgetclick="crop"]').removeClass('active');
            $('.npic-rotate-m').trigger('click');
        }
    });

    $('.npic-rotate-m').click(function(e) {
        e.preventDefault();
        $('[n-widgetclick="rotate"]').addClass('active');
        $('[n-widgetclick="crop"]').removeClass('active');
    });

    $('.npic-crop-m').click(function(e) {
        e.preventDefault();
        $('[n-widgetclick="crop"]').addClass('active');
        $('[n-widgetclick="rotate"]').removeClass('active');
    });
    $('.npix-filter-m').click(function(e) {
        e.preventDefault();
        $('[n-widgetclick="crop"]').removeClass('active');
        $('[n-widgetclick="rotate"]').removeClass('active');
    });

    $(document).click(function(e) {
        if (
            !$(event.target).closest('.logo-box,[n-widgetclick],.pictab_widget_wrap')
                .length
        ) {
            // ... clicked on the 'body', but not inside of #menutop
            $('[n-widgetclick],.pictab_widget_wrap').removeClass('active');
            $('.search-adjust').removeClass('sa-active');
            $('.logo-box').removeClass('active');
        }
    });
}