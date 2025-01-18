var View = (function() {
	function View() {	
	};
	
	/**
	 * @type PopupView
	 */
	View.prototype.current = -1;
	
	View.prototype.access = function() {
		var self = this;
		
		this.current = ViewType.Access;
		sendRuntimeMessage({type: MessageType.IS_USER_AUTHED}).then(function(isAuthed) {
			self.render('access');
			$('#centered p.info').text(chrome.i18n.getMessage('app_info2'));
			$('#login-link').text(chrome.i18n.getMessage('app_action1'));
			$('#signup-link').text(chrome.i18n.getMessage('app_action2'));

			if (isAuthed) {
				$('#login').on('click', 'a', function() {
					browser.tabs.create({url: $(this).attr('href')});
					return false;
				});

				var firefoxTimerAnaliticLogin = '/?utm_source=planfix&utm_medium=content-text&utm_content=signin&utm_campaign=firefoxtimer';
				var loginLink = '';
				if (localStorage.getItem('company_name') !== null) {
					loginLink = "https://" + localStorage.getItem('company_name') + ".planfix.ru" + firefoxTimerAnaliticLogin;
				}
				else {
					loginLink = "https://www.planfix.ru/enter/" + firefoxTimerAnaliticLogin;
				}

				$('#login-link').attr('href', loginLink)
			}
		});
	};
	
	View.prototype.auth = function() {
		this.current = ViewType.Auth;
		this.render('auth');
		$('p.info').text(chrome.i18n.getMessage('app_info6'));
	};
	
	View.prototype.listOfWorks = function() {
		this.current = ViewType.listOfWorks;
		this.render('listOfWorks');
		$('#search').attr('placeholder', chrome.i18n.getMessage("app_action10"));

		// partial js
		var isSearch = false;
		var searchWorks = [];
		var current = -1;

		// Focus input search
		$('#search').focus();

		$('.field ').on('click', '.type-of-work-clickable', function() {
			popup.timerOptions.typeOfWork = $(this).text();
			popup.timerOptions.typeOfWorkId = $(this).attr('id');

			sendRuntimeMessage({type: MessageType.UPDATE_DEF_TYPE_OF_WORK, work: $(this).text(), id: $(this).attr('id')});

			popup.startTimer(popup.timerOptions);

			// Remove key down event handler
			$(document).off("keydown", keyDownEventHandler);
		});

		$('.field').on('input', '#search', function(e) {
			isSearch = true;
			var search_type_of_works = popup.timerOptions.worksList;
			var search = $('#search').val();
			var matchWorks = [];

			if (search.length <= 0) {
				searchWorks = [];
				isSearch = false;
				current = -1;
				showWorks(search_type_of_works);
				return;
			}

			for (var i=0; i < search_type_of_works.length; i++) {
				if (search_type_of_works[i].isGroup)
					continue;
				if (search_type_of_works[i].name.toLowerCase().startsWith(search.toLowerCase())) {
					matchWorks.push({
						name: search_type_of_works[i].name,
						id: search_type_of_works[i].id,
						isGroup: 0,
						level: 0
					});
				}
			}

			searchWorks = matchWorks;
			showWorks(matchWorks);
		});

		// Event for keys while searching
		// 40 - down; 38 - up
		$(document).keydown(keyDownEventHandler);

		function keyDownEventHandler(e) {
			debugger;
			// Если искать нечего...
			if (!searchWorks.length > 0)
				return;

			// KEY UP
			if (e.which == 38) {

				if (searchWorks.length > current - 1 && current > 0) {
					setSelected(--current);
				}
			}

			// KEY DOWN
			if (e.which == 40) {

				if (searchWorks.length > current + 1) {
					setSelected(++current);
				}
			}

			// TAB
			if (e.which == 9) {
				e.preventDefault();

				if (searchWorks.length > current + 1) {
					setSelected(++current);
				}
			}

			// Enter
			if (e.which == 13) {
				e.preventDefault();

				popup.timerOptions.typeOfWork = searchWorks[current].name;
				popup.timerOptions.typeOfWorkId = searchWorks[current].name;

				sendRuntimeMessage({
					type: MessageType.UPDATE_DEF_TYPE_OF_WORK,
					work: popup.timerOptions.typeOfWork,
					id: popup.timerOptions.typeOfWorkId
				});

				popup.setViewForTimer();

				// Remove key down event handler
				$(document).off("keydown", keyDownEventHandler);
			}
		}

		function setSelected(num) {
			var id = searchWorks[num].id;

			$('.type-of-work-clickable').each(function(k,v) {
				$(v).removeClass('selected');
			})

			$('.wrapper-list-of-works').find('#' + id).addClass('selected');
		}

		function showWorks(types_of_works) {
			console.trace();
			$('.wrapper-list-of-works').text(''); // Clear content area
			for (var i=0; i < types_of_works.length; i++) {
				var level = types_of_works[i].level;
				var cls = "level-" + level;
				var clickableWork = "type-of-works-group";

				if (!types_of_works[i].isGroup)
					clickableWork = "type-of-work-clickable";

				$('<p>', {
					html: types_of_works[i].name,
					'class': cls + " " + clickableWork + " types-of-works",
					id: types_of_works[i].id,
				}).appendTo( $('.wrapper-list-of-works') );
			}
		}

		showWorks(popup.timerOptions.worksList);

		$("#flag").on('click', this, function() {
			popup.setViewForTimer();

			// Remove key down event handler
			$(document).off("keydown", keyDownEventHandler);
		});

		$('.wrapper-list-of-works').scroll(function() {
			var isBottom = $(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight;

			if ( $(this).scrollTop() ) {
				$('#top-shadow').css('visibility', "visible");
			} else {
				$('#top-shadow').css('visibility', "hidden");
			}

			if (isBottom)
				$('#bottom-shadow').css('visibility', 'hidden');
			else
				$('#bottom-shadow').css('visibility', 'visible');
		});
	};
	
	View.prototype.loading = function() {
		this.current = ViewType.Loading;
		this.render('loading');
		$('p.info').text(chrome.i18n.getMessage('app_system8'));
	};
	
	View.prototype.saving = function() {
		this.current = ViewType.Saving;
		this.render('saving');
		$('p.info.pad2lr').html(chrome.i18n.getMessage('app_action11'));
	};
	
	View.prototype.success = function() {
		this.current = ViewType.Success;
		this.render('success', 'green');

		// partial js
		$('#elapsed-time').text(chrome.i18n.getMessage("app_time1") + " " + popup.time);
		$('#task').text(popup.timerOptions.taskTitle);
		$('p.info-w.success').text(chrome.i18n.getMessage("app_system4").toLowerCase());

		// Add functional "go to task page"
		if (popup.timerOptions.generalId !== undefined && localStorage["company_name"] !== undefined) {
			$('#task').on('click', this, function() {
				var url = "https://" + localStorage["company_name"] + ".planfix.ru/task/" + popup.timerOptions.generalId;
				browser.tabs.create({url: url});
			});
		}
	};
	
	View.prototype.timer = function() {
		var self = this;
		this.current = ViewType.Timer;

		self.render('timer');
		$('span.task-option.task-option-project').html(chrome.i18n.getMessage("app_system6").toLowerCase());
		$('span.task-option.task-option-task').text(chrome.i18n.getMessage("app_system5").toLowerCase());
		$('div.start>span').text(chrome.i18n.getMessage("app_action8"));
		$('div.stop>span').text(chrome.i18n.getMessage("app_action9"));
		$('div.reset-btn>span').text(chrome.i18n.getMessage("app_action4"));
		$('div.reset-btn').attr('title', chrome.i18n.getMessage("app_info7"));
		$('div.field.to-list-of-work-view>span.task-option').text(chrome.i18n.getMessage("app_system7").toLowerCase());

		// partial js
		$('.clock').on('click', '.play-stop-btn', function() {
			if ($(this).hasClass('stopped')) {
				popup.timerIsRunning = true;
				popup.startTimer(popup.timerOptions);
				window.close();
			}
			else {
				popup.stopTimer();
			}
		});

		$('.clock').on('click', '.reset-btn', function() {
			if ($(this).hasClass('active')) {
				popup.resetTimer();
			}
		});

		// Add functional "go to task page"
		if (typeof(popup.timerOptions.generalId) !== 'undefined' && localStorage["company_name"] !== undefined) {
			$('#_task').on('click', this, function() {
				var url = "https://" + localStorage["company_name"] + ".planfix.ru/task/" + popup.timerOptions.generalId;
				browser.tabs.create({url: url});
			});
		}

		$('.to-list-of-work-view').on('click', this, function() {
			popup.view.loading();

			sendRuntimeMessage({type: MessageType.GET_WORKS}).then(function(worksList) {
				console.log(worksList);
				if (typeof(worksList) !== 'undefined') {
					popup.timerOptions.worksList = worksList;
					popup.view.listOfWorks();
				}
				else {
					popup.view.access();
				}
			});
		});

		function isElipsisActive(jQueryObj) {
			return (jQueryObj.outerWidth() < jQueryObj[0].scrollWidth);
		}

		function setTitles() {
			if ( isElipsisActive( $('#_task') ) ) {
				$('#_task').prop('title', $('#_task').text());
			}

			if ( isElipsisActive( $('#_project-name') ) ) {
				$('#_project-name').prop('title', $('#_project-name').text())
			}

			if ( isElipsisActive( $('#_type_of_work') ) ) {
				$('#_type_of_work').prop('title', $('#_type_of_work').text());
			}
		}
	};
	
	View.prototype.error = function() {
		this.current = ViewType.Error;
		this.render('error');
		$('p.info').text(chrome.i18n.getMessage('app_error2'));
	};
	
	View.prototype.accessToAnalitic = function() {
		this.current = ViewType.AccessToAnalitic;
		this.render('accessToAnalitic');
		$('p.info').text(chrome.i18n.getMessage('app_info8'));
	};
	
	View.prototype.savingError = function() {
		if (this.current != ViewType.Success) {
			this.current = ViewType.SavingError;
			this.render('savingError');
			$('p.info').html(chrome.i18n.getMessage('app_info3') + '<br>' + chrome.i18n.getMessage('app_info4'));
		}
		else {
			DEBUG.error("Do not show saving error view (current view is success)");
		}
	};
	
	View.prototype.confNotFound = function() {
		this.current = ViewType.ConfNotFound;
		this.render('confNotFound');
		$('p.info').text(chrome.i18n.getMessage('app_info5'));
	};

	View.prototype.render = function(template, cl) {
		if (TemplateJS[template] !== undefined) {
			console.log('render ' + template);
			$('.content').html(TemplateJS[template]);
			$('body').removeClass();
			if(cl) {
				$('body').addClass(cl);
			}
			$('.content').hide().show(0);
		}
	};
	
	return View;
})();

var ViewType = {
	Access: 0,
	Auth: 1,
	listOfWorks: 2,
	Loading: 3,
	Saving: 4,
	Success: 5,
	Timer: 6,
	Error: 7,
	AccessToAnalitic: 8,
	SavingError: 9,
	ConfNotFound: 10
};

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}