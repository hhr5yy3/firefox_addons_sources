// Transport
var yandex_wordstat_assistant_transport = function(data, callback) {
    if (data.action == 'copy') {
        var a = jQuery('#ywaCopyTextarea');
        if (!a.length) {
            a = jQuery('<textarea/>').attr('id', 'ywaCopyTextarea').css({position: 'absolute', left: '-9999px'}).prependTo('BODY');
        }
        a.val(data.text);
        a.select();
        if (document.execCommand('copy')) {
            callback({result: true});
        } else {
            callback({result: false});
        }
    } else {
        chrome.runtime.sendMessage(data, callback);
    }
};


// Yandex Wordstat Assistant
var yandex_wordstat_assistant_init = function($, window, transport) {
	var version = '1.9.2';


	// Смещение блока
	var offset_block = {
		base: 134,
		scroll: 68
	};

	// Определяем версию WordStat
	var isWordStat2 = document.getElementById('mount') !== null;

	// Определяем, что открыт список фраз
	var isWordsScreen = function () {
		return isWordStat2
			? $('#uniq1').is(':checked') || $('.wordstat__project-description').length > 0
			: $('input[name="search_type"]:checked').val() === 'words';
	}


	/**
	 * Опции
	 */
	var options = {

		// Сортировка
		order: 'abc', // abc, 123
		sort: 'asc', // asc, desc

		// Обесцвечивать выбранные слова
		desaturate_selected_words: true,

		// Удалять «+» из фраз
		remove_plus_from_phrase: false

	};


	// Nano Templates
	$.nano = function(template, data) {
		return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
			var keys = key.split("."), value = data[keys.shift()];
			$.each(keys, function() {
				value = value[this];
			});
			return (value === null || value === undefined) ? "" : value;
		});
	};


	// Множественная форма слова
	function human_plural_form(n, titles) {
		var cases = [2, 0, 1, 1, 1, 2];
		return titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[Math.min(n % 10, 5)]];
	}


	// Добавить пробелы в числах
	function number_spaces(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}


	// Основной блок
	var url = 'http://semantica.in/blog?utm_source=ywa';
	var body_template = '<div class="ywa-body">' +
		'	<div class="ywa-log"><div class="ywa-log_i" /></div>' +
		'	<div class="ywa-header">' +
		'		<a href="http://semantica.in/tools/yandex-wordstat-assistant" class="ywa-header_link" target="_blank">' +
		'           <span class="ywa-header_full">Yandex Wordstat Assistant {version}</span>' +
		'		    <span class="ywa-header_short">YWA {version}</span>' +
		'       </a>' +
		'       <div class="ywa-header_settings" title="Настройки" />' +
		'	</div>' +
		'	<div class="ywa-menu">' +
		'		<i class="ywa-menu_add" title="Добавить фразы"></i>' +
		'		<i class="ywa-menu_copy" title="Копировать список в буфер обмена"></i>' +
		'		<i class="ywa-menu_copyCount" title="Копировать список с частотностью в буфер обмена"></i>' +
		'		<i class="ywa-menu_sort" title="Сортировка"></i>' +
		'		<i class="ywa-menu_clear" title="Очистить список"></i>' +
		'	</div>' +
		'	<div class="ywa-info">' +
		'		<span class="ywa-info_b ywa-info_countWords" title="Количество фраз">...</span>' +
		'		<span class="ywa-info_b ywa-info_count" title="Суммарная частотность">...</span>' +
		'	</div>' +
		'	<ul class="ywa-list" />' +
		'	<div class="ywa-footer">' +
		'       <a href="' + url + '" target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKMAAAAYCAYAAACWYU02AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZEQjlFOEIyQkRDMTExRTU4NzU4RDJBRTIxM0I1RTU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZEQjlFOEIzQkRDMTExRTU4NzU4RDJBRTIxM0I1RTU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkRCOUU4QjBCREMxMTFFNTg3NThEMkFFMjEzQjVFNTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkRCOUU4QjFCREMxMTFFNTg3NThEMkFFMjEzQjVFNTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz68Z53KAAAQG0lEQVR42uRbeXReRRW/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"></a>' +
		'       <div class="ywa-footer_tags">' +
		'           <a href="' + url + '">#SEO</a>' +
		'          &nbsp; <a href="' + url + '">#маркетинг</a>' +
		'          &nbsp; <a href="' + url + '">#реклама</a>' +
		'          &nbsp; <a href="' + url + '">#контент</a>' +
		'          &nbsp; <a href="' + url + '">#трафик</a>' +
		'          &nbsp; <a href="' + url + '">#контекст</a>' +
		'       </div>' +
		'   </div>' +
		'   <div class="ywa-hide">« Свернуть</div>' +
		'   <div class="ywa-show"><b>YWA</b> »</div>' +
		'</div>';
	$('BODY').prepend($.nano(body_template, {
		version: version
	}));
	var body = $('.ywa-body');

	// Показать/скрыть
	$('.ywa-hide').click(function () {
		body.addClass('ywa-body-hide');
	});
	$('.ywa-show').click(function () {
		body.removeClass('ywa-body-hide');
	});

	var banner = '<a href="https://semantica.in/?utm_source=ywa" target="_blank" class="ywa-footer_banner">' +
		'<img style="max-width:200px;" src="data:image/png;base64,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">' +
		'<i><b>-20% новым клиентам</b> на два месяца работ по SEO, SMM или Performance marketing</i>' +
		'</a>';
	$('.ywa-footer').html(banner);


	// Положение блоков в пространстве
	var blockZIndex = 1;


	// Блок ручного добавления фраз
	var blockAdd = {

		// Блоки
		b: {},


		// Шаблон
		tpl: '<div class="ywa-block ywa-blockAdd">' +
		'   <div class="ywa-blockAdd_opacity"></div>' +
		'   <div class="ywa-block_title">{title}</div>' +
		'   <div class="ywa-block_line">' +
		'       <textarea class="ywa-blockAdd_textarea"></textarea>' +
		'   </div>' +
		'   <div class="ywa-block_line ywa-block_btns">' +
		'       <span class="ywa-btn ywa-btn-primary ywa-blockAdd_add">Добавить</span>' +
		'       <span class="ywa-btn ywa-blockAdd_close">Отмена</span>' +
		'   </div>' +
		'</div>',


		// Показать
		show: function() {
			if ((blockAdd.b.container.css('display') != 'none') && (blockAdd.b.container.css('zIndex') == blockZIndex))
				return;
			blockAdd.b.container.css('zIndex', ++blockZIndex).show();
			blockAdd.b.textarea.focus();
			$(document).unbind('keyup.ywaBlockAdd').bind('keyup.ywaBlockAdd', function(e) {
				if (blockAdd.b.container.css('zIndex') != blockZIndex)
					return;
				if (e.keyCode === 27) // Esc
					blockAdd.hide();
				if (e.ctrlKey && (e.keyCode === 13)) // CTRL + Enter
					blockAdd.add();
			});
		},


		// Скрыть
		hide: function() {
			blockZIndex--;
			blockAdd.b.container.hide();
			$(document).unbind('keyup.ywaBlockAdd');
		},


		// Добавить фразы
		add: function() {
			var c = list.data.length;
			var lines = blockAdd.b.textarea.val().split(/\r\n|\r|\n/);
			lines.forEach(function(item) {
				item = item.split('\t');
				list.add(item[0], (item.length > 1) ? item[1] : false);
			});
			blockAdd.hide();
			c = list.data.length - c;
			if (c > 0) {
				log.show('<b>' + c + ' ' + human_plural_form(c, ['фраза', 'фразы', 'фраз']) + '</b> добавлено в список', 'success');
			} else {
				log.show('В список не было добавлено ни одной фразы', 'warning');
			}
		},


		// Инициализация
		init: function() {

			// Добавить блок
			body.append($.nano(this.tpl, {
				title: 'Добавление фраз'
			}));
			this.b.container = $('.ywa-blockAdd');
			this.b.textarea = blockAdd.b.container.find('.ywa-blockAdd_textarea');

			// Прозрачность
			this.b.container.find('.ywa-blockAdd_opacity').hover(
				function() {
					blockAdd.b.container.addClass('ywa-blockAdd-opacity');
				},
				function() {
					blockAdd.b.container.removeClass('ywa-blockAdd-opacity');
				}
			);

			// Поддержка TAB
			this.b.textarea.bind('keydown', function(e) {
				if (e.keyCode == 9) {
					var $this = $(this);
					var value = $this.val();
					$this.val(value.substring(0, this.selectionStart) + "\t" + value.substring(this.selectionEnd));
					this.selectionStart = this.selectionEnd = this.selectionStart + 1;
					e.preventDefault();
				}
			});

			// Показать блок
			$('.ywa-menu_add').click(function() {
				if (blockAdd.b.container.css('display') == 'none') {
					blockAdd.b.textarea.val('');
					blockAdd.show();
				} else {
					if (blockAdd.b.container.css('zIndex') == blockZIndex) {
						blockAdd.hide();
					} else {
						blockAdd.show()
					}
				}
			});

			// Скрыть блок
			blockAdd.b.container.find('.ywa-blockAdd_close').click(blockAdd.hide);

			// Добавить фразы
			blockAdd.b.container.find('.ywa-blockAdd_add').click(blockAdd.add);

		}

	};
	blockAdd.init();


	// Блок настроек
	var blockSettings = {

		// Блоки
		b: {},


		// Шаблон
		tpl: '<div class="ywa-block ywa-blockSettings">' +
		'   <div class="ywa-block_title">{title}</div>' +
		'   <div class="ywa-block_line ywa-blockSettings_body">' +
		'       <div><label><input type="checkbox" name="desaturate_selected_words"> Обесцвечивать выбранные слова</label></div>' +
		'       <div><label><input type="checkbox" name="remove_plus_from_phrase"> Удалять «+» из фраз</label></div>' +
		'   </div>' +
		'   <div class="ywa-block_line ywa-block_btns">' +
		'       <span class="ywa-btn ywa-blockSettings_close">Закрыть</span>' +
		'       <a href="http://semantica.in/tools/yandex-wordstat-assistant" class="ywa-blockSettings_help" target="_blank">Помощь</a>' +
		'   </div>' +
		'</div>',


		// Показать
		show: function() {
			if ((blockSettings.b.container.css('display') != 'none') && (blockSettings.b.container.css('zIndex') == blockZIndex))
				return;
			blockSettings.b.container.css('zIndex', ++blockZIndex).show();
			$(document).unbind('keyup.ywaBlockSettings').bind('keyup.ywaBlockSettings', function(e) {
				if (blockSettings.b.container.css('zIndex') != blockZIndex)
					return;
				if (e.keyCode === 27) // Esc
					blockSettings.hide();
			});
		},


		// Скрыть
		hide: function() {
			blockZIndex--;
			blockSettings.b.container.hide();
			$(document).unbind('keyup.ywaBlockSettings');
		},


		// Инициализация
		init: function() {

			// Добавить блок
			body.append($.nano(this.tpl, {
				title: 'Настройки'
			}));
			this.b.container = $('.ywa-blockSettings');
			this.b.checkboxs = this.b.container.find('INPUT[type="checkbox"]');

			// Показать блок
			$('.ywa-header_settings').click(function() {
				if (blockSettings.b.container.css('display') == 'none') {

					// Обновить данные из хранилища
					storage.load();

					// Первоначальные значения чекбоксов
					blockSettings.b.checkboxs.each(function() {
						$(this).prop('checked', options[$(this).attr('name')]);
					});

					// Показать блок
					blockSettings.show();

				} else {
					if (blockSettings.b.container.css('zIndex') == blockZIndex) {
						blockSettings.hide();
					} else {
						blockSettings.show()
					}
				}
			});

			// Скрыть блок
			blockSettings.b.container.find('.ywa-blockSettings_close').click(function() {
				blockSettings.hide();
			});

			// Изменение чекбоксов
			this.b.checkboxs.change(function() {
				options[$(this).attr('name')] = $(this).prop('checked');
				storage.save();
				applyOptions();
			});

		}

	};
	blockSettings.init();


	// Добавить все
	var blockAddAll = {

		// Блоки
		b: {},

		// Элемент
		el: undefined,

		// Шаблон
		tpl: '<div class="ywa-block ywa-blockAddAll ywa-blockConfirm">' +
		'   <div class="ywa-block_title">Подтверждение</div>' +
		'   <div class="ywa-block_line ywa-blockConfirm_text">' +
		'       Уверены, что хотите добавить в список все фразы из таблицы?' +
		'   </div>' +
		'   <div class="ywa-block_line ywa-block_btns">' +
		'       <span class="ywa-btn ywa-btn-primary ywa-blockAddAll_ok">Добавить</span>' +
		'       <span class="ywa-btn ywa-blockAddAll_close">Отмена</span>' +
		'   </div>' +
		'</div>',

		// Показать
		show: function(el) {
			if ((blockAddAll.b.container.css('display') != 'none') && (blockAddAll.b.container.css('zIndex') == blockZIndex))
				return;
			blockAddAll.el = el;
			blockAddAll.b.container.css('zIndex', ++blockZIndex).show();
			$(document).unbind('keyup.ywaBlockAddAll').bind('keyup.ywaBlockAddAll', function(e) {
				if (blockAddAll.b.container.css('zIndex') != blockZIndex)
					return;
				if (e.keyCode === 27) // Esc
					blockAddAll.hide();
				if (e.keyCode === 13) // Enter
					blockAddAll.doAdd();
			});
		},

		// Скрыть
		hide: function() {
			blockZIndex--;
			blockAddAll.b.container.hide();
			$(document).unbind('keyup.ywaBlockAddAll');
		},

		// Добавить всё
		doAdd: function() {
			var c = list.data.length;
			var $addContainer = isWordStat2
				? blockAddAll.el.parent().next()
				: blockAddAll.el.closest('.b-word-statistics__table-wrapper');
			$addContainer.find('.ywa-add').click();
			c = list.data.length - c;
			if (c > 0) {
				log.show('<b>' + c + ' ' + human_plural_form(c, ['фраза', 'фразы', 'фраз']) + '</b> добавлено в список', 'success');
			} else {
				log.show('В список не было добавлено ни одной фразы', 'warning');
			}
			blockAddAll.hide();
		},

		// Инициализация
		init: function() {

			// Добавить блок
			body.append($.nano(this.tpl));
			this.b.container = $('.ywa-blockAddAll');

			// Отмена
			this.b.container.find('.ywa-blockAddAll_close').click(blockAddAll.hide);

			// Добавить
			this.b.container.find('.ywa-blockAddAll_ok').click(blockAddAll.doAdd);

		}

	};
	blockAddAll.init();


	// Очистить список
	var blockClear = {

		// Блоки
		b: {},

		// Шаблон
		tpl: '<div class="ywa-block ywa-blockClear ywa-blockConfirm">' +
		'   <div class="ywa-block_title">Подтверждение</div>' +
		'   <div class="ywa-block_line ywa-blockConfirm_text">' +
		'       Вы действительно хотите очистить список фраз?' +
		'   </div>' +
		'   <div class="ywa-block_line ywa-block_btns">' +
		'       <span class="ywa-btn ywa-btn-warning ywa-blockClear_ok">Очистить</span>' +
		'       <span class="ywa-btn ywa-blockClear_close">Отмена</span>' +
		'   </div>' +
		'</div>',

		// Показать
		show: function() {
			if ((blockClear.b.container.css('display') != 'none') && (blockClear.b.container.css('zIndex') == blockZIndex))
				return;
			blockClear.b.container.css('zIndex', ++blockZIndex).show();
			$(document).unbind('keyup.ywaBlockClear').bind('keyup.ywaBlockClear', function(e) {
				if (blockClear.b.container.css('zIndex') != blockZIndex)
					return;
				if (e.keyCode === 27) // Esc
					blockClear.hide();
				if (e.keyCode === 13) // Enter
					blockClear.doClear();
			});
		},

		// Скрыть
		hide: function() {
			blockZIndex--;
			blockClear.b.container.hide();
			$(document).unbind('keyup.ywaBlockClear');
		},

		// Очистить
		doClear: function() {
			list.clear();
			blockClear.hide();
		},


		// Инициализация
		init: function() {

			// Добавить блок
			body.append($.nano(this.tpl));
			this.b.container = $('.ywa-blockClear');

			// Отмена
			this.b.container.find('.ywa-blockClear_close').click(blockClear.hide);

			// Добавить
			this.b.container.find('.ywa-blockClear_ok').click(blockClear.doClear);

		}

	};
	blockClear.init();


	// Элемент списка
	var item_template = '<li><b title="Удалить">—</b><span>{word}</span> ({count})</li>';
	$('.ywa-list').on('click', 'B', function() {
		list.remove($(this).next().text());
	});


	// Основной блок содержимого
	var contentBlock = $(isWordStat2 ? '#mount' : '.b-wordstat-content');


	// Добавление элементов управления
	var addElements = function() {
		observer.disconnect();

		var $wordsContainer = $('th.table__column:contains("Формулировка")').closest('.wordstat__table-wrapper');

		var phrases = isWordStat2
			? $wordsContainer.find('.table__content-cell A')
			: $('.b-phrase-link');
		$('.ywa-add, .ywa-remove').remove();
		phrases.each(function () {
			var $phrase = $(this);

			// Кнопки добавления/удаления фраз
			var add_template = '<b class="ywa-add" title="Добавить в список">+</b>';
			var remove_template = '<b class="ywa-remove" title="Удалить из списка">‒</b>';
			$phrase.before(add_template + remove_template);
		});
		$('.ywa-add').click(function() {
			list.add($(this).next().next().text(), $(this).parent().next().text());
		});
		$('.ywa-remove').click(function() {
			list.remove($(this).next().text());
		});

		var $phrasesContainer = isWordStat2 ? $wordsContainer : $('.b-word-statistics__table');
		$('.ywa-addAllWrap').remove();
		if ($phrasesContainer.length) {

			// Добавить все фразы
			var add_all_template = '<div class="ywa-addAllWrap"><b class="ywa-addAll">Добавить все</b></div>';
			$phrasesContainer.before(add_all_template);
			$('.ywa-addAll').click(function() {
				blockAddAll.show($(this));
			});
		}

		var intro = $('.b-word-statistics__info').first();
		if (intro.length && !intro.data('ywaReady')) {
			var str = intro.text();
			var data = str.match(/^[^«]*«(.*)»\s—\s([\d\s,]*).*$/);
			if (data !== null) {
				var el = '<b class="ywa-introAdd" title="Добавить в список">+</b><b class="ywa-introRemove" title="Удалить из списка" >‒</b>';
				str = str.replace('«' + data[1] + '»', el + '«' + data[1] + '»');
				intro.html(str);
				intro.find('.ywa-introAdd')
					.data('word', data[1])
					.click(function() {
						list.add(data[1], data[2]);
					});
				intro.find('.ywa-introRemove').click(function() {
					list.remove(data[1]);
				});
			}
			intro.data('ywaReady', true);
		}

		doObserver();
	};


	/**
	 * Обновить состояние элементов управления
	 */
	var updateStateElements = function() {
		$('.ywa-remove').each(function() {
			if (list.has($(this).next().text())) {
				$(this).parent().parent().addClass('ywa-selected');
			} else {
				$(this).parent().parent().removeClass('ywa-selected');
			}
		});
		$('.ywa-introAdd').each(function() {
			if (list.has($(this).data('word'))) {
				$(this).hide();
				$(this).next().css('display', 'inline-block');
			} else {
				$(this).css('display', 'inline-block');
				$(this).next().hide();
			}
		});
	};


	/**
	 * Применить опции
	 */
	var applyOptions = function() {
		options.desaturate_selected_words ? $('BODY').addClass('ywa-desaturateSelectedWords') : $('BODY').removeClass('ywa-desaturateSelectedWords');
	};


	// Отслеживание изменений
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var observer = new MutationObserver(addElements);
	var doObserver = function() {
		observer.observe(contentBlock.get(0), {childList: true, subtree: true});
	};
	addElements();
	doObserver();


	// Хранилище
	var storage = {

		// Сохранить
		save: function() {
			localStorage['YandexWordstatAssistant'] = JSON.stringify(list.data);
			localStorage['YandexWordstatAssistantOptions'] = JSON.stringify(options);
		},

		// Загрузить
		load: function(update) {

			// Данные
			var data;
			try {
				data = JSON.parse(localStorage['YandexWordstatAssistant']);
			} catch (e) {
				data = [];
			}
			if (!$.isArray(data)) data = [];
			list.data = data;

			// Опции
			var o;
			try {
				o = JSON.parse(localStorage['YandexWordstatAssistantOptions']);
			} catch (e) {
				o = {};
			}
			if (typeof(o) != 'object') o = {};
			options = $.extend(true, {}, options, o);

			// Обновить внешний вид
			if (update)
				list.update();
		}

	};


	// Лог
	var log = {

		// Таймер
		timer: undefined,

		// Показать
		show: function(text, type) {
			$('.ywa-log').attr('class', 'ywa-log ywa-log-' + type);
			$('.ywa-log_i').html(text);
			$('.ywa-log').stop(true, true).show();
			clearTimeout(log.timer);
			log.timer = setTimeout(function() {
				$('.ywa-log').fadeOut(300);
			}, 2000);
		}

	};


	// Действия со списком
	var list = {


		// Данные
		data: [],


		// Обновить
		update: function() {
			if (isWordsScreen()) {
				body.show();
			} else {
				body.hide();
				return;
			}
			var html = '';
			var count = 0;
			var data = list.prepare_data();
			$('.ywa-menu_sort').attr('class', 'ywa-menu_sort ywa-menu_sort-' + options.order + '-' + options.sort);
			$.each(data, function(i, item) {
				html += $.nano(item_template, {
					word: item.word,
					count: item.count > 0 ? number_spaces(item.count) : '?'
				});
				count += item.count;
			});
			if (html != $('.ywa-list').html()) {
				$('.ywa-list').html(html);
				var countWords = $('.ywa-list LI').length;
				$('.ywa-info_countWords').html(countWords == 0 ? '...' : number_spaces(countWords));
				$('.ywa-info_count').html(countWords == 0 ? '...' : number_spaces(count));
                transport({
                    action: 'changeCountItems',
                    count: countWords ? countWords : '',
                });
			}
			updateStateElements();
		},


		/**
		 * Подготовка данных
		 * @returns array
		 */
		prepare_data: function() {

			// Клонируем список
			var data = list.data.slice(0);

			// Сортировка
			switch (options.order) {

				// По алфавиту
				case 'abc':
					data.sort(function(a, b) {
						var compA = a.word.toUpperCase();
						var compB = b.word.toUpperCase();
						return (compA < compB) ? (options.sort == 'asc' ? -1 : 1) : (compA > compB) ? (options.sort == 'asc' ? 1 : -1) : 0;
					});
					break;

				// По порядку добавления
				case '123':
				default:
					if (options.sort == 'desc')
						data.reverse();
					break;

				// По частотности
				case 'frq':
					data.sort(function(a, b) {
						return (a.count < b.count) ? (options.sort == 'asc' ? -1 : 1) : (a.count > b.count) ? (options.sort == 'asc' ? 1 : -1) : 0;
					});
					break;

			}

			// Результат
			return data;
		},


		/**
		 * Добавить фразу
		 * @param t Фраза
		 * @param c Частотность
		 */
		add: function(t, c) {

			// Подготовить фразу
			t = $.trim(t);

			// Удалить «+» из фразы
			if (options.remove_plus_from_phrase)
				t = t.replace(/\+/g, '');

			// Подготовить частотность
			c = parseInt((c + '').replace(/[^\d]/gi, ''));
			if (isNaN(c))
				c = 0;

			// Обновить данные из хранилища
			storage.load();

			// Уже есть в списке?
			if (list.data.some(function(item) {
					return item.word == t;
				})) {
				log.show('<b>' + t + '</b> уже есть в списке', 'warning');
				t = '';
			}

			// Пустая фраза - ничего не делать
			if (t == '')
				return;

			// Добавить фразу в список
			list.data.push({
				word: t,
				count: c
			});

			// Обновить внешний вид
			list.update();

			// Сохранить в хранилище
			storage.save();

			// Сообщение
			log.show('<b>' + t + '</b> добавлено в список', 'success');

		},


		// Удалить фразу
		remove: function(t) {

			// Подготовить фразу
			t = $.trim(t).replace(/\+/g, '');

			// Пустая фраза - ничего не делать
			if (t == '')
				return;

			// Удалить
			list.data = list.data.filter(function(item) {
				return item.word.replace(/\+/g, '') != t;
			});

			// Сообщение
			log.show('<b>' + t + '</b> удалено из списка', 'info');

			// Обновить и сохранить
			list.update();
			storage.save();

		},


		/**
		 * Есть ли слово в списке?
		 * @param t
		 * @returns {boolean}
		 */
		has: function(t) {

			// Подготовить фразу
			t = $.trim(t).replace(/\+/g, '');

			// Пустая фраза - ничего не делать
			if (t == '')
				return false;

			// Ищем слово
			for (var i = 0; i < list.data.length; i++)
				if (list.data[i].word.replace(/\+/g, '') == t)
					return true;

			// Не нашли
			return false;
		},


		// Очистить список
		clear: function() {

			// Очистить
			list.data = [];

			// Сообщение
			log.show('Список очищен', 'info');

			// Сохранить и обновить
			list.update();
			storage.save();
		},


		// Копировать
		copy: function(with_count) {

			// Подготовим текст
			var text = '';
			var data = list.prepare_data();
			$.each(data, function(i, item) {
				if (text != '')
					text += '\n';
				text += item.word + (with_count ? ('\t' + (item.count > 0 ? item.count : '?')) : '');
			});

			// А есть что копировать?
			if (text == '') {
				log.show('Нет фраз для копирования', 'warning');
				return;
			}

			// Копируем
			var config = {
				action: 'copy',
				text: text
			};
			transport(config, function(response) {
				if (response.result) {
					log.show('Список скопирован в буфер обмена', 'success');
				} else {
					log.show('Не удалось скопировать список в буфер обмена', 'error');
				}
			});

		}


	};
	$('.ywa-menu_clear').click(function() {
		blockClear.show();
	});
	$('.ywa-menu_copy').click(function() {
		list.copy(false);
	});
	$('.ywa-menu_copyCount').click(function() {
		list.copy(true);
	});
	$('.ywa-menu_sort').click(function() {

		// Изменить сортировку
		var sorts = [
			['abc', 'asc', 'по алфавиту (А-Я)'],
			['abc', 'desc', 'по алфавиту (Я-А)'],
			['123', 'asc', 'по порядку добавления (новые снизу)'],
			['123', 'desc', 'по порядку добавления (новые сверху)'],
			['frq', 'asc', 'по частотности (по возрастанию)'],
			['frq', 'desc', 'по частотности (по убыванию)']
		];
		for (var i = 0; i < sorts.length; i++)
			if ((sorts[i][0] == options.order) && (sorts[i][1] == options.sort))
				break;
		i++;
		if (i >= sorts.length)
			i = 0;
		options.order = sorts[i][0];
		options.sort = sorts[i][1];

		// Сообщение
		log.show('Включена сортировка <b>' + sorts[i][2] + '</b>', 'info');

		// Обновить внешний вид
		list.update();

		// Сохранить в хранилище
		storage.save();

	});


	// Загрузка и синхронизация
	storage.load(true);
	applyOptions();
	setInterval(function() {
		storage.load(true)
		applyOptions();
	}, 1000);


	// Плавучесть блока
	$(window).scroll(function() {
		if ($(window).scrollTop() > (offset_block.base - offset_block.scroll)) {
			body.css({
				top: offset_block.scroll + 'px',
				position: 'fixed'
			});
		} else {
			body.css({
				top: offset_block.base + 'px',
				position: 'absolute'
			});
		}
	}).scroll();


};
jQuery(function() {
	yandex_wordstat_assistant_init(jQuery, window, yandex_wordstat_assistant_transport);
});


// no conflict
jQuery.noConflict();
