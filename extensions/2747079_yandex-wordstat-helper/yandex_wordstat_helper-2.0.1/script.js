// Transport
var yandex_wordstat_helper_transport = function(data, callback) {
	browser.runtime.sendMessage(data, callback);
};


// Yandex Wordstat Helper
(function($, window, transport) {


	// Версия
	var version = '2.0.1';

	// Проверка версии вордстата
	var isNewVersionWordstat = (document.getElementById('mount') !== null) ? true : false;

	// Смещение блока
	var offset_block = {
		base: 206,
		scroll: 68
	};


	// Nano Templates
	$.nano = function(template, data) {
		return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
			var keys = key.split("."), value = data[keys.shift()];
			$.each(keys, function() {
				value = value[this];
			});
			return (value===null || value===undefined) ? "" : value;
		});
	};


	// Множественная форма слова
	function human_plural_form(n, titles) {
		var cases = [2, 0, 1, 1, 1, 2];
		return titles[(n%100>4 && n%100<20) ? 2 : cases[Math.min(n%10, 5)]];
	}


	// Основной блок
	var body_template = 
			'<div class="ywh-body">' +
				'<div class="ywh-wrapper">' +
					'<div class="ywh-notice">' +
					'</div>' +
					'<div class="ywh-border">' +
						'<div class="ywh-yandex"><span>Y</span>andex Wordstat Helper 2.0</div>' +
						'<div class="ywh-icon">' +
							'<span class="ywh-plus" title="Добавить слово"></span>' +
							'<span class="ywh-copy" title="Копировать список в буфер обмена"></span>' +
							'<span class="ywh-copy_count" title="Копировать список с частотностью в буфер обмена"><i class="ywh-count"></i></span>' +
							'<span class="ywh-delete" title="Очистить список"></span>' +
						'</div>' +
						'<div class="ywh-content">' +
							'<div class="ywh-sort">' +
								'<span class="ywh-sort-abc ywh-sort-active" title="Сортировка по алфавиту"><i class="ywh-sort-txt">А-Я</i><i class="ywh-arrow_desc"></i></span>' +
								'<span class="ywh-sort-123" title="Сортировка по порядку"><i class="ywh-sort-txt">123</i><i class="ywh-arrow_desc"></i></span>' +
								'<span class="ywh-sort-count" title="Сортировка по частотности"><i class="ywh-eyes-wrap"><i class="ywh-eyes"></i></i><i class="ywh-arrow_desc"></i></span>' +
							'</div>' +
							'<ul class="ywh-list">' +
							'</ul>' +
							'<div class="ywh-info">' +
								'<span title="Количество фраз"><i class="ywh-ab"></i><i class="ywh-info-count-words">...</i></span>' +
								'<span title="Суммарная частотность"><i class="ywh-eyes_active"></i><i class="ywh-info-count">...</i></span>' +
							'</div>' +
						'</div>' +
						'<div class="ywh-footer"><img src="data:image/png;base64,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" alt="" class="ywh-logo"> <span>Разработано в <a href="https://arcticlab.ru/?utm_source=wsc" target="_blank">Арктической</a></span></div>'+
					'</div>' +
				'</div>' +
			'</div>';
	$('BODY').prepend($.nano(body_template, {
		version: version
	}));
	var body = $('.ywh-body');

	// Элемент списка
	var item_template = '<li><span>{word}</span>({count_per_month})<i class="ywh-del" title="Удалить из списка"></i></li>';

	$('.ywh-list').on('click', '.ywh-del', function() {
		list.remove($(this).parent().find("span").text());
	});


	// Основной блок содержимого (центральный блок с содержимым)
	var contentBlock = (isNewVersionWordstat)? $('#mount') : $('.b-wordstat-content'); 


	// Добавление элементов управления
	var addElements = function() {
		observer.disconnect();

		// Кнопки добавления / удаления фраз
		var add_template = '<span class="ywh-action">' +
			'<b class="ywh-remove ywh-hidden" title="Удалить из списка">−</b>' +
			'<b class="ywh-add ywh-hidden" title="Добавить в список">+</b>' +
			'</span>';
		if(isNewVersionWordstat){
			$('.ywh-action').remove();
			$('.wordstat__table-wrapper').find('.table__content-cell a').before(add_template);

		}else{
			$('.b-phrase-link').before(add_template);

		}
		
		$('.ywh-action').each(function(){
			var word = $(this).next().text();
			word = $.trim(word);
			var flag = false;
			$.each( list.words, function(i, n){
				if(word == n.word) {
					flag = true;
				}
			});
			if (flag) {
				$('.ywh-remove', this).data('word', word);
				$('.ywh-remove', this).removeClass('ywh-hidden');
			} else {
				$('.ywh-add', this).data('word', word);
				$('.ywh-add', this).removeClass('ywh-hidden');
			}
		});
		$('.ywh-add').click(function() {
			list.add($(this).parent().next().text(), $(this).parent().parent().next().text());
			$(this).parent().find('.ywh-add').addClass('ywh-hidden');
			$(this).parent().find('.ywh-remove').removeClass('ywh-hidden');
		});
		$('.ywh-remove').click(function() {
			list.remove($(this).parent().next().text());
			$(this).parent().find('.ywh-add').removeClass('ywh-hidden');
			$(this).parent().find('.ywh-remove').addClass('ywh-hidden');
		});

		// Добавить все фразы
		var add_all_template = '<div class="ywh-allWrap"><b class="ywh-addAll">Добавить все слова</b>/<b class="ywh-removeAll">Удалить все слова</b></div>';
		if(isNewVersionWordstat){
			$('.ywh-allWrap').remove();
			$('.wordstat__table-wrapper').before(add_all_template)
		}else{
			$('.b-word-statistics__table').before(add_all_template);
		}
		$('.ywh-addAll').click(function() {
			if (confirm('Вы действительно хотите добавить в список все слова из этой таблицы?')) {
				var c = list.words.length;
				if(isNewVersionWordstat){
					$(this).closest('.wordstat__search-result-content-wrapper').find('.ywh-add').click();
				}else{
					$(this).closest('.b-word-statistics__column').find('.ywh-add').click();
				}
				c = list.words.length - c;
				if (c>0) {
					log.show('<b>' + c + ' ' + human_plural_form(c, ['слово', 'слова', 'слов']) + '</b> добавлено в список', 'success');
				} else {
					log.show('В список не было добавлено ни одного слова', 'info');
				}
			}
		});
		$('.ywh-removeAll').click(function() {
			if (confirm('Вы действительно хотите удалить из списка все слова из этой таблицы?')) {
				var c = list.words.length;
				if(isNewVersionWordstat){
					$(this).closest('.wordstat__search-result-content-wrapper').find('.ywh-remove').click();
				}else{
					$(this).closest('.b-word-statistics__column').find('.ywh-remove').click();
				}
				c = c - list.words.length;
				if (c>0) {
					log.show('<b>' + c + ' ' + human_plural_form(c, ['слово', 'слова', 'слов']) + '</b> удалено из списка', 'success');
				} else {
					log.show('Из списка не было удалено ни одного слова', 'info');
				}
			}
		});

		doObserver();
	};


	// Отслеживание изменений
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var observer = new MutationObserver(addElements);
	var doObserver = function() {
		observer.observe(contentBlock.get(0), {childList: true, subtree: true});
	};
	doObserver();


	// Хранилище
	var storage = {

		// Сохранить
		save: function() {
            try {
			    localStorage['YandexWordstatHelper'] = JSON.stringify(list.words);
            } catch (e) {
                log.show(e.name, 'info');
            }
		},

		// Загрузить
		load: function(update) {

			// проверка на актуальность последней установленной версии
			if (localStorage['YandexWordstatHelperVersion'] === undefined) {
				localStorage.clear();
				localStorage['YandexWordstatHelperVersion'] = "2.0";
			}
			if (localStorage['YandexWordstatHelperVersion'] !== "2.0"){
				localStorage.clear();
				localStorage['YandexWordstatHelperVersion'] = "2.0";
			}

			// определение версии вордстата
			if (isNewVersionWordstat) {
				if($('#uniq3').is(':checked')){
					$(".ywh-body").css("display", "block");	
				}
				else{
					$(".ywh-body").css("display", "none");	
				}
			} else {
				var checkTab = $('input[name="search_type"]:checked').val();
				if(checkTab === "words"){
					$(".ywh-body").css("display", "block");	
				}
				else{
					$(".ywh-body").css("display", "none");	
				}
			}
			
			var arr;
			try {
				arr = JSON.parse(localStorage['YandexWordstatHelper']);
			} catch (e) {
				arr = [];
			}
			if (!$.isArray(arr)) arr = [];
			list.words = arr;
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
			var new_show_class = 'ywh-alert-' + type;
			$('.ywh-notice').empty();
			$('.ywh-notice').append('<div class="' + new_show_class + '"></div>'); // success or info
			$('.' + new_show_class).html(text);
			$('.ywh-notice').stop(true, true).show();
			clearTimeout(log.timer);
			log.timer = setTimeout(function() {
				$('.ywh-notice').fadeOut(300);
			}, 2000);
		}

	};



	// Действия со списком
	var list = {


		// Слова
		words: [],


		// Обновить
		update: function() {
			$('.ywh-list').html('');
			var count_sum_views = 0;
			$.each(list.words, function(i, word_obj) {
				$('.ywh-list').append($.nano(item_template, {
					word: word_obj.word,
					count_per_month: word_obj.count	
				}));
				views = word_obj.count.replace(/\s/g, '');
				views = (isNaN(parseInt(views))) ? 0 : parseInt(views);
				count_sum_views += parseInt(views);
			});
			$('.ywh-info-count-words').html($('.ywh-list LI').length);
			$('.ywh-info-count').html(count_sum_views);

			
		},


		// Добавить
		add: function(t, c) {

			// Подготовить фразу
			t = $.trim(t);
			c = $.trim(c);
			i = list.words.length;

			// Обновить данные из хранилища
			storage.load();

			$.each( list.words, function(i, n){
			  if(t == n.word){
				log.show('<b>' + t + '</b><br> уже есть в списке', 'info');
				t = '';
				c = '';
			  }
			});

			// Пустая фраза - ничего не делать
			if (t=='')
				return;
			add_word = { "word": t, "count": c, "index": i };
			// Добавить фразу в список
			list.words.push(add_word);
			list.words.sort(function(a, b) {

				var compA = a.word.toUpperCase();
				var compB = b.word.toUpperCase();

				return (compA<compB) ? -1 : (compA>compB) ? 1 : 0;
			});

			// Обновить внешний вид
			list.update();

			// Сохранить в хранилище
			storage.save();

			// Сообщение
			log.show('<b>' + t + '</b><br> добавлено в список', 'success');

		},


		// Удалить фразу
		remove: function(t) {

			// Подготовить фразу
			t = $.trim(t);

			// Пустая фраза - ничего не делать
			if (t=='')
				return;

			// Сообщение
			log.show('<b>' + t + '</b><br> удалено из списка', 'info');

			// Удалить
			var elem = null;
			$.each( list.words, function(i, n){
			  if(t == n.word){
			  	elem = i;
			  }
			});
			list.words.splice(elem, 1);
			// Обновить и сохранить
			$.each( list.words, function(i, n){
			 	n.index = i;
			});
			list.update();
			storage.save();

			$('.ywh-action').each(function(){
				var word = $(this).next().text();
				word = $.trim(word);
				if(word == t) {
					$('.ywh-add', this).removeClass('ywh-hidden');
					$('.ywh-remove', this).addClass('ywh-hidden');
				}
			});

		},


		// Очистить список
		clear: function() {
			if (confirm('Вы действительно хотите очистить список слов?')) {

				// Очистить
				list.words = [];

				// Сообщение
				log.show('Список очищен', 'info');

				// Сохранить и обновить
				list.update();
				storage.save();

				$('.ywh-action').each(function(){
					$('.ywh-add', this).removeClass('ywh-hidden');
					$('.ywh-remove', this).addClass('ywh-hidden');
				});
			}
		},


		// Копировать
		copy: function() {

			// Подготовим текст
			var text = '';
			$.each(list.words, function(i, elem) {
				if (text!='')
					text += '\n';
				text += elem.word;
			});

			// А есть что копировать?
			if (text=='') {
				log.show('Нет слов для копирования', 'info');
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
					log.show('Не удалось скопировать список в буфер обмена', 'info');
				}
			});
			
		},

		// Копировать текст с показами в месяц  переделать
		copy_count: function() {
			// Подготовим текст
			var text = '';
			$.each(list.words, function(i, elem) {
				if (text!=''){
					text += '\n';
				}
				text += elem.word;
				text += '\t';
				text += elem.count;
			});

			// А есть что копировать?
			if (text=='') {
				log.show('Нет слов для копирования', 'info');
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
					log.show('Не удалось скопировать список в буфер обмена', 'info');
				}
			});

		},

		// Сортировка по алфавиту
		sort_alphabetically: function(s) {
			if (s == "asc") {
				list.words.sort(function(a, b) {
					var compA = a.word.toUpperCase();
					var compB = b.word.toUpperCase();
					return (compA<compB) ? -1 : (compA>compB) ? 1 : 0;
			});
			} else {
				list.words.sort(function(a, b) {
					var compA = a.word.toUpperCase();
					var compB = b.word.toUpperCase();
					return (compA<compB) ? -1 : (compA>compB) ? 1 : 0;
				}).reverse();
			}

			list.update();
			storage.save();
		},

		// Сортировка по порядку
		sort_by_order: function(s) {
			if (s == "asc") {
				list.words.sort(function(a, b) {
					var compA = a.index;
					var compB = b.index;
					return (compA<compB) ? -1 : (compA>compB) ? 1 : 0;
			});
			} else {
				list.words.sort(function(a, b) {
					var compA = a.index;
					var compB = b.index;
					return (compA<compB) ? -1 : (compA>compB) ? 1 : 0;
				}).reverse();
			}

			list.update();
			storage.save();
		},

		// Сортировка по частотности
		sort_by_frequency : function(s) {
			if (s == "asc") {
				list.words.sort(function(a, b) {
					var compA = a.count.replace(/\s/g, '');
					var compB = b.count.replace(/\s/g, '');
					return (parseInt(compA)<parseInt(compB)) ? -1 : (parseInt(compA)>parseInt(compB)) ? 1 : 0;
				});
			} else {
				list.words.sort(function(a, b) {
					var compA = a.count.replace(/\s/g, '');
					var compB = b.count.replace(/\s/g, '');
					return (parseInt(compA)<parseInt(compB)) ? -1 : (parseInt(compA)>parseInt(compB)) ? 1 : 0;
				}).reverse();
			}

			list.update();
			storage.save();
		},
	};
	

	$('.ywh-delete').click(list.clear);
	$('.ywh-copy').click(list.copy);
	$('.ywh-copy_count').click(list.copy_count);

	$('.ywh-plus').click(function() {
		var t = prompt('Введите слово для добавления в список');
		list.add(t);
	});
	
	// Сортировка по алфавиту
	$('.ywh-sort-abc').click(function() {
		var sort_direction = "desc";
		if(!$(this).hasClass( "ywh-sort-active" )) {
			$(this).addClass("ywh-sort-active");
			$(".ywh-sort-count").removeClass("ywh-sort-active");
			$(".ywh-sort-123").removeClass("ywh-sort-active");
		}
		else {
			if($(".ywh-sort-abc").children().last().hasClass("ywh-arrow_desc")){
				$(".ywh-sort-abc").children().last().removeClass("ywh-arrow_desc").addClass("ywh-arrow_asc");
				var sort_direction = "asc";
			}
			else {
				$(".ywh-sort-abc").children().last().removeClass("ywh-arrow_asc").addClass("ywh-arrow_desc");
			}
		}
		list.sort_alphabetically(sort_direction);
	});

	// Сортировка по порядку
	$('.ywh-sort-123').click(function() {
		var sort_direction = "desc";
		if(!$(this).hasClass( "ywh-sort-active" )) {
			$(this).addClass("ywh-sort-active");
			$(".ywh-sort-count").removeClass("ywh-sort-active");
			$(".ywh-sort-abc").removeClass("ywh-sort-active");
		}
		else {
			if($(".ywh-sort-123").children().last().hasClass("ywh-arrow_desc")){
				$(".ywh-sort-123").children().last().removeClass("ywh-arrow_desc").addClass("ywh-arrow_asc");
				var sort_direction = "asc";
			}
			else {
				$(".ywh-sort-123").children().last().removeClass("ywh-arrow_asc").addClass("ywh-arrow_desc");
			}
		}

		list.sort_by_order(sort_direction);
	});

	// Сортировка по частотности
	$('.ywh-sort-count').click(function() {
		var sort_direction = "desc";
		if(!$(this).hasClass( "ywh-sort-active" )) {
			$(this).addClass("ywh-sort-active");
			$(".ywh-sort-abc").removeClass("ywh-sort-active");
			$(".ywh-sort-123").removeClass("ywh-sort-active");
		}
		else {
			if($(".ywh-sort-count").children().last().hasClass("ywh-arrow_desc")){
				$(".ywh-sort-count").children().last().removeClass("ywh-arrow_desc").addClass("ywh-arrow_asc");
				var sort_direction = "asc";
			}
			else {
				$(".ywh-sort-count").children().last().removeClass("ywh-arrow_asc").addClass("ywh-arrow_desc");
			}
		}
		list.sort_by_frequency(sort_direction);
	});


	// Загрузка и синхронизация
	storage.load(true);
	setInterval(function() {
		storage.load(true)
	}, 1000);


	// Плавучесть блока
	$(window).scroll(
			function() {
				if ($(window).scrollTop()>(offset_block.base - offset_block.scroll)) {
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


})(jQuery, window, yandex_wordstat_helper_transport);


// no conflict
jQuery.noConflict();