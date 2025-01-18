var siteData;
var siteDataArray;
var htmlBlocks;
var isActive = false;
var globalVars = {};
var lastClickTime = new Date();

checkUrl();

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action == 'tourDeleted' && isActive) {
			tourDeletedFromBg(request);
		} else if (request.action == 'tourDeleted' && location.href.indexOf('https://podborka-turov.ru/cabinet/preview-basket') != -1) {
			if ($('tr[tour-hash="'+request.hash+'"]').length > 0) {
				location.reload();
			}
		} else if (request.action == 'tourAdded' && isActive) {
			tourAddedFromBg(request);
		} else if (request.action == 'tourAdded' && location.href.indexOf('https://podborka-turov.ru/cabinet/preview-basket') != -1) {
			location.reload();
		} else if (request.action == 'basketChanged' && isActive) {
			basketChangedFromBg(request);
		} else if (request.action == 'basketChanged' && location.href.indexOf('https://podborka-turov.ru/cabinet/preview-basket') != -1) {
			location.reload();
		}
	}
);

window.addEventListener('message', function(message) {
	if (message.data.action == 'tourAdded') {
		tourAdded(message);
	} else if (message.data.action == 'tourDeleted') {
		tourDeletedFromCabinet(message);
	} else if (message.data.action == 'basketChanged') {
		basketChangedFromCabinet(message);
	} else if (message.data.action == 'getStats') {
		chrome.runtime.sendMessage({action: 'getStats'}, function(response) { });
	} else if (message.data.action == 'checkPtPlugin') {
		if (location.href.indexOf('https://podborka-turov.ru/') !== -1) {
			window.postMessage('pt_extension_loaded', 'https://podborka-turov.ru/');
		}
	}
});


function checkUrl() {
	chrome.runtime.sendMessage({action: 'checkUrl'}, function(response) {
		if (response.result !== true) {
			return;
		}

		console.log('Loaded OK: podborka-turov.ru');

		isActive = true;
		siteDataArray = response.data;
		if (siteDataArray.length == 1) {
			siteData = siteDataArray[0];
		} else {
			console.log('Checking page conditions...');
			console.log(siteDataArray);
			for (var key in siteDataArray) {
				if (eval(siteDataArray[key]['page-condition'])) {
					console.log('Page condition OK', siteDataArray[key]['page-condition']);
					siteData = siteDataArray[key];
					break;
				}
			}
		}
		htmlBlocks = response.html_blocks;

		if (siteData !== undefined) {
			if (siteData.iframes !== undefined) {
				console.log('Checking iframes...');
				var self_is_iframe_regexp = false;
				//for (var key in siteData.iframes) {
				//	if (siteData.iframes[key].test(location.href)) {
				//		self_is_iframe_regexp = true;
				//	}
				//}

				if (self_is_iframe_regexp == false) {
					$('iframe').each(function() {
						console.log('iframe URL: '+$(this).attr('src'));
						var iframe_url = $(this).attr('src');

						for (var key in siteData.iframes) {
							var url_regexp_string = siteData.iframes[key];
							var url_regexp = new RegExp('^http[s]?:\/\/'+url_regexp_string+'.*','i');
							if (url_regexp.test(iframe_url)) {
								console.log('Redirecting to '+iframe_url);
								location.href = iframe_url;
								return;
							}
						}
					});
				}
			}
		}

		if (siteData !== undefined) {
			if (siteData['urls-actions'] !== undefined) {
				console.log('Checking urls-actions...');

				for (var url_regexp_string in siteData['urls-actions']) {
					var url_regexp = new RegExp('^http[s]?:\/\/'+url_regexp_string+'.*','i');
					if (url_regexp.test(location.href)) {
						console.log('Performing actions...');
						processActions(siteData['urls-actions'][url_regexp_string]);
						return;
					}
				}
			}
		}

		processStartup();
	});
}

function processStartup() {
	setInterval(function() {
		checkNewTours();
	}, 1000);

	if (siteData !== undefined) {
		for (var selector in siteData.css) {
			$(selector).css(siteData.css[selector]);
		}
	}

	$('body').append(htmlBlocks['add-tour-dialog']);

	$(document).on('click touchstart', '.podborka-turov-load-ratings-link-load', loadRatings);
	$(document).on('click touchstart', '.podborka-turov-load-ratings-link-hide', hideRatings);
	$(document).on('click touchstart mouseup', '.podborka-turov-toggle-tour-button:not(.active)', toggleTourEvent);
	$(document).on('click touchstart mouseup', '.podborka-turov-toggle-tour-button-full:not(.active)', toggleTourEvent);
	$(document).on('click touchstart mouseup', '.podborka-turov-export-tour-button', exportTourEvent);
	$(document).on('click touchstart mouseup', '.podborka-turov-export-tour-button-full', exportTourEvent);
	$(document).on('click touchstart mouseup', '.podborka-turov-dialog-close', closeDialog);
	$(document).on('input', '.podborka-turov-load-ratings-filter-input', filterRatings);
}

function checkNewTours() {
	if (siteData === undefined) {
		for (var key in siteDataArray) {
			if (eval(siteDataArray[key]['page-condition'])) {
				console.log('Page condition OK', siteDataArray[key]['page-condition']);
				siteData = siteDataArray[key];

				for (var selector in siteData.css) {
					$(selector).css(siteData.css[selector]);
				}
				break;
			}
		}
	}

	if (siteData === undefined) {
		return false;
	}

	if (siteData['page-condition'] !== undefined) {
		if (!eval(siteData['page-condition'])) {
			for (var key in siteDataArray) {
				if (eval(siteDataArray[key]['page-condition'])) {
					console.log('Page condition OK', siteDataArray[key]['page-condition']);
					siteData = siteDataArray[key];
					break;
				}
			}
		}
	}

	var newHeaders = $(siteData['iframe-selector'] === undefined?document:siteData['iframe-selector']).contents().find(siteData['tour-info-table']['new-header'].selector);
	var newRows = $(siteData['iframe-selector'] === undefined?document:siteData['iframe-selector']).contents().find(siteData['tour-info-table']['new-row'].selector);

	if (newHeaders.length) {
		console.log('New headers found: '+newHeaders.length, newHeaders);
		newHeaders.each(function() {
			processActions(siteData['tour-info-table']['new-header'].actions, $(this));
		});
	}

	if (newRows.length) {
		console.log('New tours found: '+newRows.length);
		newRows.each(function() {
			processActions(siteData['tour-info-table']['new-row'].actions, $(this));
		});

		loadTourInfo(newRows, false);
		loadCssToIFrame();
		loadEventHandlersToIFrame();
	}
}

function loadTourInfo(rows, doRefresh) {
	var operator_id = siteData['operator-id'];
	var tour_country = processActions(siteData.country.actions);
	var tour_departure = processActions(siteData.departure.actions);
	var tour_currency = processActions(siteData.currency.actions);
	var tour_adult = processActions(siteData.adult.actions);
	var tour_children = processActions(siteData.children.actions);

	rows.each(function() {
		if (!$(this).is(siteData['tour-info-row'].selector)) {
			return;
		}

		var tour_hotel_name = processActions(siteData['tour-info-row'].hotel.actions, $(this));
		var tour_hotel_id = processActions(siteData['tour-info-row']['hotel-id'].actions, $(this));
		var tour_hotel_region = processActions(siteData['tour-info-row'].region.actions, $(this));
		var tour_hotel_url = processActions(siteData['tour-info-row']['hotel-url'].actions, $(this));
		var tour_date = processActions(siteData['tour-info-row'].date.actions, $(this));
		var tour_nights = processActions(siteData['tour-info-row'].nights.actions, $(this));
		var tour_nights_ext = processActions(siteData['tour-info-row']['nights-ext'].actions, $(this));
		var tour_meal = processActions(siteData['tour-info-row'].meal.actions, $(this));
		var tour_room = processActions(siteData['tour-info-row'].room.actions, $(this));
		var tour_price = processActions(siteData['tour-info-row'].price.actions, $(this));
		var tour_price_ue = processActions(siteData['tour-info-row']['price-ue'].actions, $(this));
		var tour_is_promo_price = processActions(siteData['tour-info-row']['is-promo-price'].actions, $(this));
		var tour = processActions(siteData['tour-info-row'].tour.actions, $(this));
		var tour_pricelist = processActions(siteData['tour-info-row'].pricelist.actions, $(this));
		var tour_flight_class = processActions(siteData['tour-info-row']['flight-class'].actions, $(this));
		var tour_suboperator_id = processActions(siteData['tour-info-row']['suboperator-id'].actions, $(this));
		var tour_ext_info_1 = processActions(siteData['tour-info-row']['ext-info-1'].actions, $(this));
		var tour_ext_info_2 = processActions(siteData['tour-info-row']['ext-info-2'].actions, $(this));
		var tour_ext_info_3 = processActions(siteData['tour-info-row']['ext-info-3'].actions, $(this));

		$(this).attr('podborka-turov-operator-id', operator_id);
		$(this).attr('podborka-turov-country', tour_country);
		$(this).attr('podborka-turov-departure', tour_departure);
		$(this).attr('podborka-turov-currency', tour_currency);
		$(this).attr('podborka-turov-adult', tour_adult);
		$(this).attr('podborka-turov-children', tour_children);
		$(this).attr('podborka-turov-hotel-name', tour_hotel_name);
		$(this).attr('podborka-turov-hotel-id', tour_hotel_id);
		$(this).attr('podborka-turov-hotel-region', tour_hotel_region);
		$(this).attr('podborka-turov-hotel-url', tour_hotel_url);
		$(this).attr('podborka-turov-date', tour_date);
		$(this).attr('podborka-turov-nights', tour_nights);
		$(this).attr('podborka-turov-nights-ext', tour_nights_ext);
		$(this).attr('podborka-turov-meal', tour_meal);
		$(this).attr('podborka-turov-room', tour_room);
		$(this).attr('podborka-turov-price', tour_price);
		$(this).attr('podborka-turov-price-ue', tour_price_ue);
		$(this).attr('podborka-turov-promo-price', tour_is_promo_price);
		$(this).attr('podborka-turov-tour', tour);
		$(this).attr('podborka-turov-pricelist', tour_pricelist);
		$(this).attr('podborka-turov-flight-class', tour_flight_class);
		$(this).attr('podborka-turov-suboperator-id', tour_suboperator_id);
		$(this).attr('podborka-turov-ext-info-1', tour_ext_info_1);
		$(this).attr('podborka-turov-ext-info-2', tour_ext_info_2);
		$(this).attr('podborka-turov-ext-info-3', tour_ext_info_3);

		var params = {};
		var params_sorted = {};
		$(this).each(function() {
			$.each(this.attributes, function() {
				if (this.specified &&
					this.name.indexOf('podborka-turov-') != -1 &&
					this.name.indexOf('podborka-turov-rating') == -1 &&
					this.name != 'podborka-turov-hash' &&
					this.name != 'podborka-turov-price' &&
					this.name != 'podborka-turov-price-ue' &&
					this.name != 'podborka-turov-currency' &&
					this.name != 'podborka-turov-hotel-url') {
					params[this.name] = this.value;
				}
			});
		});

		Object.keys(params).sort().forEach(function(key, i) {params_sorted[key] = params[key];});
		$(this).attr('podborka-turov-hash', sha256($.param(params_sorted)));
	});

	if (doRefresh === false) {
		if ($('div-pt.podborka-turov-load-ratings-block').length == 0) {
			$(siteData['tour-info-table']['selector-load-ratings']).append(htmlBlocks['load-ratings-block']);
		}

		rows.find(siteData['tour-info-table']['selector-toggle-tour-button']).append(htmlBlocks['toggle-tour-button']);

		if (siteData['tour-info-table']['selector-toggle-tour-button-full'] !== undefined) {
			rows.find(siteData['tour-info-table']['selector-toggle-tour-button-full']).append(htmlBlocks['toggle-tour-button-full']);
		}

		if (siteData['tour-info-table']['selector-export-tour-button'] === undefined) {
			siteData['tour-info-table']['selector-export-tour-button'] = siteData['tour-info-table']['selector-toggle-tour-button'];
		}

		rows.find(siteData['tour-info-table']['selector-export-tour-button']).append(htmlBlocks['export-tour-button']);

		if (siteData['tour-info-table']['selector-export-tour-button-full'] !== undefined) {
			rows.find(siteData['tour-info-table']['selector-export-tour-button-full']).append(htmlBlocks['export-tour-button-full']);
		}
	}

	loadHashes(rows);
}

function processActions(actions, root) {
	try {
		var _current, _prev, _prev_action;

		if (actions == undefined) {
			return '';
		}

		if (actions.length == 0) {
			return '';
		}

		if (!root) {
			root = $('body');
		}

		for (var action_set_key in actions) {
			_current = root;
			for (var action_key in actions[action_set_key]) {
				for (var action in actions[action_set_key][action_key]) {
					var params = actions[action_set_key][action_key][action];

					if (action !== 'eval') {
						if (params == null) {
							_current = _current[action]();
						} else {
							_current = _current[action](params);
						}
					} else {
						_current = eval(params);
					}

					_prev = _current;
				}
			}
			_prev_action = _current;
		}

		return _current;
	} catch (e) {
		console.log('ProcessActions Error: ', e, actions, root);
		return '';
	}
}

function loadRatings() {
	console.log('Loading ratings...');

	$('.podborka-turov-rating-block').remove();
	$('.podborka-turov-load-ratings-link-load').hide();
	$('.podborka-turov-load-ratings-loader-block').show();

	var operator = siteData['operator-id'];
	var country = processActions(siteData.country.actions);
	var hotels = [];
	var hotels_uniq = {};

	console.log('Country: '+country+', operator: '+operator);

	$(siteData['iframe-selector'] === undefined?document:siteData['iframe-selector']).contents().find(siteData['tour-info-row'].selector).each(function() {
		var hotel_name = $(this).attr('podborka-turov-hotel-name');
		var hotel_region = $(this).attr('podborka-turov-hotel-region');

		hotels_uniq[hotel_name] = {"hotel": hotel_name, "region": hotel_region};
	});

	for (var hotel in hotels_uniq) {
		hotels.push({'id': hotel, 'hotel': hotel, 'region': hotels_uniq[hotel]['region']});
	}

	console.log(hotels);

	chrome.runtime.sendMessage({action: 'getRatings', operator: operator, country: country, hotels: hotels}, function(response) {
		if (response.result !== true) {
			$('.podborka-turov-load-ratings-loader-block').hide();
			$('.podborka-turov-load-ratings-filter-block').hide();
			$('.podborka-turov-load-ratings-link-load').show();

			return;
		}

		if (response.data.auth != 'ok') {
			$('.podborka-turov-load-ratings-loader-block').hide();
			$('.podborka-turov-load-ratings-filter-block').hide();
			$('.podborka-turov-load-ratings-link-load').show();

			alert(response.data.message);
			return;
		}

		$('.podborka-turov-load-ratings-loader-block').hide();
		$('.podborka-turov-load-ratings-filter-block').show();

		var hotels_ratings = {};
		for (var key in response.data.hotels) {
			hotels_ratings[response.data.hotels[key].id] = {"hotel-ext-name": response.data.hotels[key].hotel, "rating": response.data.hotels[key].rating, "thid": response.data.hotels[key].thid};
		}

		$(siteData['iframe-selector'] === undefined?document:siteData['iframe-selector']).contents().find(siteData['tour-info-row'].selector).each(function() {
			var hotel_name = $(this).attr('podborka-turov-hotel-name');
			var hotel_region = $(this).attr('podborka-turov-hotel-region');
			var hotel_info = hotels_ratings[$(this).attr('podborka-turov-hotel-name')];
			var rating_parent_node = processActions(siteData['tour-info-row'].rating.actions, $(this));

			$(this).attr('podborka-turov-rating', hotel_info['rating']);
			$(this).attr('podborka-turov-rating-thid', hotel_info['thid']);
			$(this).attr('podborka-turov-rating-hotel-ext-name', hotel_info['hotel-ext-name']);

			if (rating_parent_node.find('.podborka-turov-rating-block').length != 0) {
				return;
			}

			if (hotel_info['hotel-ext-name'] != '') {
				var color;
				if (hotel_info['rating'] >= 80) {
					color = '#8bc34a';
				}
				if (hotel_info['rating'] < 80) {
					color = '#03a9f4';
				}
				if (hotel_info['rating'] < 60) {
					color = '#ff6347';
				}
				if (hotel_info['rating'] == 0) {
					color = '#a4a4a4';
				}

				rating_parent_node.append(htmlBlocks['rating-block'].replace('{color}', color).replace('{rating}', hotel_info['rating']).replace('{thid}', hotel_info['thid']).replace('{hotel-ext-name}', hotel_info['hotel-ext-name']).replace('{yandex-search-text}', encodeURIComponent(country+' '+hotel_name+' '+hotel_region)).replace('{google-search-text}', encodeURIComponent(country+' '+hotel_name+' '+hotel_region)));
			} else {
				rating_parent_node.append(htmlBlocks['no-rating-block'].replace('{yandex-search-text}', encodeURIComponent(country+' '+hotel_name+' '+hotel_region)).replace('{google-search-text}', encodeURIComponent(country+' '+hotel_name+' '+hotel_region)));
			}
		});
		console.log(response.data);
	});

	return;
}

function hideRatings() {
	$('.podborka-turov-load-ratings-filter-input').val(0);
	filterRatings();

	$('.podborka-turov-rating-block').remove();
	$('.podborka-turov-load-ratings-loader-block').hide();
	$('.podborka-turov-load-ratings-filter-block').hide();
	$('.podborka-turov-load-ratings-link-load').show();

	return;
}

function filterRatings() {
	var rating = $('.podborka-turov-load-ratings-filter-input').first().val();

	if (isNaN(rating)) {
		rating = 0;
	} else {
		rating = parseInt(rating);
	}

	$(siteData['iframe-selector'] === undefined?document:siteData['iframe-selector']).contents().find(siteData['tour-info-row'].selector).each(function() {
		if ($(this).attr('podborka-turov-rating') < rating) {
			$(this).hide();
		} else {
			$(this).show();
		}
	});
}

function toggleTourEvent() {
	if (new Date() - lastClickTime > 500) {
		lastClickTime = new Date();
	} else {
		return false;
	}

	var tour_row = $(this).closest(siteData['tour-info-row'].selector);

	loadTourInfo(tour_row, true);

	toggleTour(tour_row);
}

function toggleTour(tour_row) {
	if (!tour_row.is('[podborka-turov-rating]')) {
		loadRating(tour_row);
		return;
	}

	var params = {};
	tour_row.each(function() {
		$.each(this.attributes, function() {
			if(this.specified && this.name.indexOf('podborka-turov-') != -1) {
				params[this.name] = String(this.value);
			}
		});
	});

	setTimeout(function(){
		processActions(siteData['tour-info-row']['hotel-image-url'].actions, tour_row);
	}, 0);

	params['podborka-turov-adult'] = String(processActions(siteData.adult.actions));
	params['podborka-turov-children'] = String(processActions(siteData.children.actions));
	params['podborka-turov-search-link'] = String(processActions(siteData['search-link'].actions));

	console.log(params);

	if (siteData['tour-add-without-dialog'] === true) {
		chrome.runtime.sendMessage({action: 'tourAdd', params: params}, function(response) { });
	} else {
		var query_string = $.param(params);
		$('#podborka-turov-add-tour-frame').attr('src', 'https://podborka-turov.ru/embded/add-tour?'+query_string);
		showDialog($('#podborka-turov-add-tour-dialog'));
	}
}

function exportTourEvent() {
	if (new Date() - lastClickTime > 500) {
		lastClickTime = new Date();
	} else {
		return false;
	}

	var tour_row = $(this).closest(siteData['tour-info-row'].selector);

	loadTourInfo(tour_row, true);

	exportTour(tour_row);
}

function exportTour(tour_row) {
	var params = {};
	tour_row.each(function() {
		$.each(this.attributes, function() {
			if(this.specified && this.name.indexOf('podborka-turov-') != -1) {
				params[this.name] = String(this.value);
			}
		});
	});

	params['podborka-turov-adult'] = String(processActions(siteData.adult.actions));
	params['podborka-turov-children'] = String(processActions(siteData.children.actions));
	params['podborka-turov-search-link'] = String(processActions(siteData['search-link'].actions));

	chrome.storage.sync.get({
		url: ''
	}, function(items) {
		if (items.url === '') {
			chrome.runtime.sendMessage({action: 'openOptionsPage'}, function(response) { });
		} else {
		    var form = document.createElement('form');
		    form.target = '_blank';
		    form.method = 'POST';
		    form.action = 'https://'+items.url+'.moidokumenti.ru/tours/import';
		    form.style.display = 'none';

		    var params_final = {};
			for (var key in params) {
				params_final[key.replace('podborka-turov-hotel-name', 'podborka-turov-hotel').replace('podborka-turov-hotel-region', 'podborka-turov-region').replace('podborka-turov-', 'tour-')] = params[key];
			}

			console.log(params_final);

		    for (var key in params_final) {
		        var input = document.createElement('input');
		        input.type = 'hidden';
		        input.name = key;
		        input.value = params_final[key];
		        form.appendChild(input);
		    }

		    document.body.appendChild(form);
		    form.submit();
		    document.body.removeChild(form);

			console.log('https://'+items.url+'.moidokumenti.ru');
			//chrome.runtime.sendMessage({action: 'tourExport', params: params, url: 'https://'+items.url+'.moidokumenti.ru'}, function(response) { });
		}
	});

	//if (siteData['tour-add-without-dialog'] === true) {
	//	chrome.runtime.sendMessage({action: 'tourExport', params: params}, function(response) { });
	//} else {
	//	var query_string = $.param(params);
	//	$('#podborka-turov-add-tour-frame').attr('src', 'https://podborka-turov.ru/embded/add-tour?'+query_string);
	//	showDialog($('#podborka-turov-add-tour-dialog'));
	//}
}

function loadRating(tour_row) {
	console.log('Loading rating...');

	var operator = tour_row.attr('podborka-turov-operator-id');
	var country = tour_row.attr('podborka-turov-country');
	var hotel_name = tour_row.attr('podborka-turov-hotel-name');
	var hotel_region = tour_row.attr('podborka-turov-hotel-region');

	var hotels = [{'id': hotel_name, 'hotel': hotel_name, 'region': hotel_region}];

	chrome.runtime.sendMessage({action: 'getRatings', operator: operator, country: country, hotels: hotels}, function(response) {
		console.log(response);

		if (response.result !== true) {
			tour_row.attr('podborka-turov-rating', '0');
			tour_row.attr('podborka-turov-rating-thid', '0');
			tour_row.attr('podborka-turov-rating-hotel-ext-name', '');
			toggleTour(tour_row);
			return;
		}

		if (response.data.auth != 'ok') {
			tour_row.attr('podborka-turov-rating', '0');
			tour_row.attr('podborka-turov-rating-thid', '0');
			tour_row.attr('podborka-turov-rating-hotel-ext-name', '');
			toggleTour(tour_row);
			return;
		}

		if (response.result === true && response.data.hotels.length === 0) {
			tour_row.attr('podborka-turov-rating', '0');
			tour_row.attr('podborka-turov-rating-thid', '0');
			tour_row.attr('podborka-turov-rating-hotel-ext-name', '');
			toggleTour(tour_row);
			return;
		}

		var hotels_ratings = {};
		for (var key in response.data.hotels) {
			hotels_ratings[response.data.hotels[key].id] = {"hotel-ext-name": response.data.hotels[key].hotel, "rating": response.data.hotels[key].rating, "thid": response.data.hotels[key].thid};
		}

		$(siteData['iframe-selector'] === undefined?document:siteData['iframe-selector']).contents().find(siteData['tour-info-row'].selector).each(function() {
			if (!hotels_ratings.hasOwnProperty($(this).attr('podborka-turov-hotel-name'))) {
				return;
			}

			var hotel_info = hotels_ratings[$(this).attr('podborka-turov-hotel-name')];

			$(this).attr('podborka-turov-rating', hotel_info['rating']);
			$(this).attr('podborka-turov-rating-thid', hotel_info['thid']);
			$(this).attr('podborka-turov-rating-hotel-ext-name', hotel_info['hotel-ext-name']);
		});

		toggleTour(tour_row);
	});
}

function saveImageUrl(hotel_id, operator_id, url, type = 'HEAD') {
	if (url == undefined || url == 'undefined' || url == '') {
		console.log('No image: ', {hotel_id: hotel_id, operator_id: operator_id, url: url});
		return;
	}

	urlExists(url, function(exists){
		if (exists) {
			console.log('Sending image data: ', {action: 'saveImageUrl', hotel_id: hotel_id, operator_id: operator_id, url: url});
			chrome.runtime.sendMessage({action: 'saveImageUrl', hotel_id: hotel_id, operator_id: operator_id, url: url}, function(response) { });
		} else {
			console.log('No image: ', {hotel_id: hotel_id, operator_id: operator_id, url: url});
		}
	}, type);
}

function showDialog(dialog) {
	$('body').css('overflow', 'hidden');
	dialog.show();
	return;
}

function closeDialog() {
	$('body').css('overflow', 'auto');
	$(this).parents('.podborka-turov-dialog').hide();
	return;
}

function tourAdded(message) {
	var hash = message.data.hash;
	var toursCount = message.data.tours_count;

	$('#podborka-turov-add-tour-dialog').find('.podborka-turov-dialog-close').click();

	$('[podborka-turov-hash="'+hash+'"]:not(.podborka-turov-tour-row-no-bg)').addClass('tour-added-row-bg');
	$('[podborka-turov-hash="'+hash+'"]:not(.podborka-turov-tour-row-no-bg)').children().addClass('tour-added-row-bg');
	$('[podborka-turov-hash="'+hash+'"]').find('div-pt.podborka-turov-toggle-tour-button').addClass('active').attr('title', 'Тур добавлен в подборку');

	setBadge(toursCount);

	var tour_info = {
		hotel_name: $('[podborka-turov-hash="'+hash+'"]').attr('podborka-turov-hotel-name')
	};

	chrome.runtime.sendMessage({action: 'tourAdded', hash: hash, tour_info: tour_info, tours_count: toursCount}, function(response) { });
}

function tourAddedFromBg(message) {
	var hash = message.hash;
	var toursCount = message.tours_count;

	$('[podborka-turov-hash="'+hash+'"]:not(.podborka-turov-tour-row-no-bg)').addClass('tour-added-row-bg');
	$('[podborka-turov-hash="'+hash+'"]:not(.podborka-turov-tour-row-no-bg)').children().addClass('tour-added-row-bg');
	$('[podborka-turov-hash="'+hash+'"]').find('div-pt.podborka-turov-toggle-tour-button').addClass('active').attr('title', 'Тур добавлен в подборку');
}

function tourDeletedFromBg(request) {
	var hash = request.hash;

	$('[podborka-turov-hash="'+hash+'"]:not(.podborka-turov-tour-row-no-bg)').removeClass('tour-added-row-bg');
	$('[podborka-turov-hash="'+hash+'"]:not(.podborka-turov-tour-row-no-bg)').children().removeClass('tour-added-row-bg');
	$('[podborka-turov-hash="'+hash+'"]').find('div-pt.podborka-turov-toggle-tour-button').removeClass('active').attr('title', 'Добавить в подборку');
}

function basketChangedFromBg(request) {
	var hashes = request.hashes;

	$('[podborka-turov-hash]:not(.podborka-turov-tour-row-no-bg)').removeClass('tour-added-row-bg');
	$('[podborka-turov-hash]:not(.podborka-turov-tour-row-no-bg)').children().removeClass('tour-added-row-bg');
	$('[podborka-turov-hash]').find('div-pt.podborka-turov-toggle-tour-button').removeClass('active').attr('title', 'Добавить в подборку');

	for (var key in hashes) {
		$('[podborka-turov-hash="'+hashes[key]+'"]:not(.podborka-turov-tour-row-no-bg)').addClass('tour-added-row-bg');
		$('[podborka-turov-hash="'+hashes[key]+'"]:not(.podborka-turov-tour-row-no-bg)').children().addClass('tour-added-row-bg');
		$('[podborka-turov-hash="'+hashes[key]+'"]').find('div-pt.podborka-turov-toggle-tour-button').addClass('active').attr('title', 'Тур добавлен в подборку');
	}
}

function tourDeletedFromCabinet(message) {
	var hash = message.data.hash;
	var toursCount = message.data.tours_count;

	chrome.runtime.sendMessage({action: 'tourDeleted', tours_count: toursCount, hash: hash}, function(response) { });
}

function basketChangedFromCabinet(message) {
	var basketNumber = message.data.basket_number;
	var toursCount = message.data.tours_count;
	var hashes = message.data.hashes;

	chrome.runtime.sendMessage({action: 'basketChanged', basket_number: basketNumber, tours_count: toursCount, hashes: hashes}, function(response) { });
}

function setBadge(text) {
	chrome.runtime.sendMessage({action: 'setBadge', text: text}, function(response) { });
}

function loadHashes(rows) {
	var hashes = [];

	rows.each(function() {
		hashes.push($(this).attr('podborka-turov-hash'));
	});

	chrome.runtime.sendMessage({action: 'getHashes', hashes: hashes}, function(response) {
		if (response.result !== true) {
			return;
		}

		for (var hash in response.data.hashes) {
			if (response.data.hashes[hash].me > 0) {
				$('[podborka-turov-hash="'+hash+'"]:not(.podborka-turov-tour-row-no-bg)').addClass('tour-added-row-bg');
				$('[podborka-turov-hash="'+hash+'"]:not(.podborka-turov-tour-row-no-bg)').children().addClass('tour-added-row-bg');
				$('[podborka-turov-hash="'+hash+'"]').find('div-pt.podborka-turov-toggle-tour-button').addClass('active').attr('title', 'Тур добавлен в подборку');
			}
		}
	});
}

function urlExists(url, callback, type = 'HEAD'){
	$.ajax({
		type: type,
		url: url,
		success: function(){
			callback(true);
		},
		error: function() {
			callback(false);
		}
	});
}

function loadCssToIFrame() {
	if (siteData['iframe-selector'] !== undefined) {
		var css = [
			"css/libs/cssreset.css",
			"css/basic-elements.css",
			"css/dialog-block.css",
			"css/rating-block.css",
			"css/load-ratings-block.css",
			"css/toggle-tour-button.css",
			"css/export-tour-button.css",
			"css/tour-row.css"
		];

		for (var key in css) {
			var link = chrome.extension.getURL(css[key]);
			$(siteData['iframe-selector']).contents().find('head').append('<link rel="stylesheet" type="text/css" href="'+link+'">');
		}
	}
}

function loadEventHandlersToIFrame() {
	if (siteData['iframe-selector'] !== undefined) {
		$(siteData['iframe-selector']).contents().on('click touchstart', '.podborka-turov-load-ratings-link-load', loadRatings);
		$(siteData['iframe-selector']).contents().on('click touchstart', '.podborka-turov-load-ratings-link-hide', hideRatings);
		$(siteData['iframe-selector']).contents().on('click touchstart mouseup', '.podborka-turov-toggle-tour-button:not(.active)', toggleTourEvent);
		$(siteData['iframe-selector']).contents().on('click touchstart mouseup', '.podborka-turov-toggle-tour-button-full:not(.active)', toggleTourEvent);
		$(siteData['iframe-selector']).contents().on('click touchstart mouseup', '.podborka-turov-export-tour-button', exportTourEvent);
		$(siteData['iframe-selector']).contents().on('click touchstart mouseup', '.podborka-turov-export-tour-button-full', exportTourEvent);
		$(siteData['iframe-selector']).contents().on('input', '.podborka-turov-load-ratings-filter-input', filterRatings);
	}
}