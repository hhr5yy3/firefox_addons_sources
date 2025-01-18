$.expr[':'].textEquals = $.expr[':'].textEquals || function(el, i, m) {
    var searchText = m[3];
    var match = $(el).text().trim().match('^' + searchText + '$');
    return match && match.length > 0;
};

(function() {
	if (window.MoiDokumentiExtensionLoaded === true) {
		return true;
	}

	window.MoiDokumentiExtensionLoaded = true;

	console.log('MoiDokumenti.ru Extension Loaded');

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.action == 'apply-export-data') {
				applyExportData(request);
			}
		}
	);

	function applyExportData(request) {
		for (var key in request.export_data) {
			var item = request.export_data[key];

			console.log(item);

			if (item['actions-before'] !== undefined) {
				try {
					actions($(item.selector), item['actions-before']);
				} catch (e) {
					console.log(e);
				}
			}

			if (item.type === 'radio') {
				try {
					var el = $(item.selector);

					if (item.value !== '') {
						el = el.filter('[value="'+item.value+'"]');
					}

					if (el.length === 0) {
						continue;
					}

					el.prop('checked', true).trigger('click');
				} catch (e) {
					console.log(e);
				}
			} else if (item.type === 'actions') {
				try {
					actions($(item.selector), item.actions);
				} catch (e) {
					console.log(e);
				}
			} else {
				try {
					if ($(item.selector).length === 0) {
						continue;
					}

					if (item.type === 'select') {
						$(item.selector+' option[value="'+item.value+'"]').attr('selected', 'selected');
					}

					$(item.selector).focus().val(item.value).blur();

					if (item.noChangeEvent === undefined) {
						var event = new Event('change', {'bubbles': true, 'cancelable': false});
						$(item.selector)[0].dispatchEvent(event);
					}
				} catch (e) {
					console.log(e);
				}
			}

			if (item['actions-after'] !== undefined) {
				try {
					actions($(item.selector), item['actions-after']);
				} catch (e) {
					console.log(e);
				}
			}
		}
	}

	function actions(el, actions) {
		for (var actions_key in actions) {
			var _el = $(el);
			for (var action_key in actions[actions_key]) {
				var action = actions[actions_key][action_key][0];
				var params = actions[actions_key][action_key][1];
				var params_extra = actions[actions_key][action_key][2];

				if (action === 'next') {
					_el = next(_el, params);
				} else if (action === 'find') {
					_el = find(_el, params);
				} else if (action === 'closest') {
					_el = closest(_el, params);
				} else if (action === 'event') {
					_el = event(_el, params);
				} else if (action === 'keyboardEvent') {
					_el = keyboardEvent(_el, params, params_extra);
				}
			}
		}
	}

	function next(el, selector) {
		return $(el).next(selector);
	}

	function find(el, selector) {
		return $(el).find(selector);
	}

	function closest(el, selector) {
		return $(el).closest(selector);
	}

	function event(el, event) {
		var event = new Event(event, {'bubbles': true, 'cancelable': false});

		$(el)[0].dispatchEvent(event);

		return $(el);
	}

	function keyboardEvent(el, event, params) {
		var event_params = {'bubbles': true, 'cancelable': false};

		for (var key in params) {
			event_params[key] = params[key];
		}

		var event = new KeyboardEvent(event, event_params);
		$(el)[0].dispatchEvent(event);

		return $(el);
	}
})();