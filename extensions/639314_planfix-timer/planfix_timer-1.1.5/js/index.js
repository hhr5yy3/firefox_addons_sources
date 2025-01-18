DEBUG.log("index.js just opened");

var Popup = (function() {
	function Popup() {
		this.view = new View();
	};
	
	Popup.prototype.timerIsRunning = false;
	Popup.prototype.timerOptions = {};
	Popup.prototype.time = '';
	
	Popup.prototype.init = function() {
		var self = this;
		$('#header-logo').text(chrome.i18n.getMessage("app_system3"));
		
		this.view.loading();
		
		if (localStorage["saved"] == "false") {
			DEBUG.log("Timer not saved!");
		}
		
		// Таймер работает?
		sendRuntimeMessage({type: MessageType.CHECH_FOR_RUNNING}).then(function(isRunning) {
			self.timerIsRunning = isRunning;
			if (isRunning) {
				DEBUG.log("Таймер работает...");
				self.startTimer();
			}
			else {
				DEBUG.log("Таймер не работает...");
				// Надо сохраниться?
				sendRuntimeMessage({type: MessageType.CHECK_IF_NEED_SAVE}).then(function (needSave) {
					if (needSave) {
						DEBUG.log("Надо сохраниться...");
						self.view.auth();
					}
					else {
						DEBUG.log("Сохраняться не надо...");
						// Проверяем текущую вкладку
						self.checkCurrentTab();
					}
				});
			}
		});
	};
	
	Popup.prototype.checkCurrentTab = function() {
		var self = this;
		return new Promise(function(resolve, reject) {
			queryToChromeTabs({active: true, currentWindow: true}).then(function (tabs) {
				var tab = tabs[0];
				var url = $.url(tab.url);
				var host = url.attr('host');

				// matches[1] - company domain
				// matches[2] - planfix 
				var matches = /(.*)?\.(dplanfix\-row|planfix)\./.exec(host);

				// Страница с задачей?
				if (matches !== null) {
					if (matches[1] !== "blog") {
						localStorage["company_name"] = matches[1];
					}
					
					// Приходят в уже нормальном виде, в Timer ещё не добавлены
					sendRuntimeMessage({type: MessageType.GET_DEF_TIMER_OPTIONS}).then(function(options) {
						if (typeof(options) !== "undefined" && options !== null && options.isTaskCard) {
							if (options.noConfiguration) {
								self.view.confNotFound();
							}
							else {
								
								// Проверяем доступ к аналитики
								sendRuntimeMessage({type: MessageType.CHECK_ANALITIC_ACCESS}).then(function(res) {
									// Ответ не пришел или есть доступ
									if (res == null || res.hasAccess) {
										DEBUG.log("Показываю окно таймера...");
										self.startTimer(options);
									}
									else {
										self.view.accessToAnalitic();
									}
								});
							}	
						}
						else {
							self.view.access();
						}
					});
				}
				else {
					self.view.access();
				}
			});
		});
	};
	
	Popup.prototype.startTimer = function(options) {
		var self = this;
		
		// Берем с другово места
		if (typeof(options) === 'undefined') {
			sendRuntimeMessage({type: MessageType.GET_TIMER_OPTIONS}).then(function(res) {
				
				// #195187 - savedDateState остается в сторедже
				if (res.hasOwnProperty("taskId")) {
					self.timerOptions = res;
					if (typeof(self.timerOptions.startDate) === 'undefined') {
						self.timerOptions.startDate = Date.now();
					}
					
					self.setViewForTimer();
				}
			});
		} 
		else {
			this.timerOptions = options;
			if (options.startDate == undefined) {
				this.timerOptions.startDate = Date.now();	
			}

			browser.browserAction.setTitle({title: escapeHTML(this.timerOptions.taskTitle)});
			this.setViewForTimer();
		} 
	};
	
	Popup.prototype.setViewForTimer = function() {
		var self = this;

		this.view.timer();

		if (!$.isEmptyObject(self.timerOptions)) {
			self.setTimeOptionsToView();
		}

		if (self.timerIsRunning) {
			$('.play-stop-btn').removeClass('stopped').addClass('started');
			$('.reset-btn').addClass('active');
			browser.browserAction.setTitle({title: escapeHTML(self.timerOptions.taskTitle)});
		}
		else {
			$('#timer').text("00:00:00");
			$('.play-stop-btn').removeClass('started').addClass('stopped');
			$('.reset-btn').removeClass('active');
		}

		// We need running timer
		if (this.timerIsRunning) {
			// Start timer and save timer_options in the background
			sendRuntimeMessage({type: MessageType.START_TIMER, data: this.timerOptions});

			// For fast display time
			sendRuntimeMessage({type: MessageType.GET_TIME_FORMAT}).then(function(time) {
				$('#timer').text(time);
			});
		}
	};
	
	Popup.prototype.setTimeOptionsToView = function() {
		// Задача без проекта
		if ($.isEmptyObject(this.timerOptions.projectTitle)) {
			$('#_project-group').text("");
			$('#_project-name').text(chrome.i18n.getMessage('app_system2'));
		} 
		else {
			$('#_project-group').text(this.timerOptions.projectGroup);
			$('#_project-name').text(this.timerOptions.projectTitle);
		}

		$('#_task').html(this.timerOptions.taskTitle);
		
		$('#_type_of_work').text(this.timerOptions.typeOfWork);

		// Ф-ия в шаблоне
		// setTitles();
	};
	
	Popup.prototype.stopTimer = function() {
		this.time = $('#timer').text();
		this.timerIsRunning = false;

		sendRuntimeMessage({type: MessageType.RESET_TIMER});
		
		$('.clock').removeClass('run').addClass('stop');
		$('.play-stop-btn').removeClass('started').addClass('stopped');

		this.view.saving();
		sendRuntimeMessage({type: MessageType.SAVE_TIMER, time: this.time});
	};
	
	Popup.prototype.resetTimer = function() {
		this.timerIsRunning = false;
		sendRuntimeMessage({type: MessageType.RESET_TIMER});
		$('.clock').removeClass('run').addClass('stop');
		$('.play-stop-btn').removeClass('started').addClass('stopped');
		$('.reset-btn').removeClass('active');
		$('#timer').text("00:00:00");

		delete this.timerOptions.startDate;
	};
	
	return Popup;
})();

var popup = new Popup();
$(document).ready(function () {
	DEBUG.log("index.js onReady()");
	
	popup.init();

	// Handler for exit by click to icon
	$('#header-bg').on('click', '#close-icon', function () {
		window.close();
	})

	if (localStorage["company_name"] != undefined) {
		$(document.body).on('click', '.goto-planfix', function () {
			browser.tabs.create({url: "https://" + localStorage["company_name"] + ".planfix.ru/?action=planfix"});
		})
	}

	browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
		switch (msg.type) {
			case MessageType.SET_VIEW_FOR_TIMER:
				setViewForTimer(msg.timer_options, msg.is_running);
				break;

			case "planfixTimerExtensionResponse":
				if (msg.command == "checkAnaliticAccess") {
					console.log(msg.hasAccess);
					// Нету доступа к аналитике
					if (!msg.hasAccess) {
						popup.view.accessToAnalitics();
					}
				}
				break;

			case MessageType.TIME_FORMAT:
				this.time = msg.time;
				$('#timer').text(msg.time);
				break;
				
			case MessageType.SHOW_GET_AUTH:
				popup.view.auth();
				break;
			case MessageType.SHOW_SUCCESS:
				popup.view.success();
				break;
			case MessageType.GET_ACCESS:
				popup.view.access();
				break;
			case MessageType.SERVER_ERROR:
				popup.view.error();
				break;
			case MessageType.SAVE_ERROR:
				popup.view.savingError();
				break;
			case MessageType.TIMER_WAS_SAVED:
				if (msg.saved) {
					popup.view.success();
				}
				else {
					popup.view.savingError();
				}
				setTimeout(function() {
					delete popup.timerOptions.startDate;
					popup.setViewForTimer();
				}, 2000);
				break;
		}

		return true;
	});
});