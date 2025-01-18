var Planfix = (function() {
	function Planfix() {};

	Planfix.prototype.getTaskPromise = null;
	Planfix.prototype.getWorksPromise = null;
	Planfix.prototype.loginedPromise = null;
	Planfix.prototype.getSettingsPromise = null;
	Planfix.prototype.checkAnaliticPromise = null;

	Planfix.prototype.saveMessageData = null;
	Planfix.prototype.saveTimerHandlerActive = false;

	Planfix.prototype.savedAnalitics = [];

	/**
	 * @param {boolean} force открывать вкладку если не нашли
	 * @returns {Promise}
	 *
	 * @todo: подхватывает tab с blog.planfix.ru
	 */
	Planfix.prototype.findPlanfixTab = function(force) {
		var self = this;
		var company = localStorage.getItem("company_name");
		var pfTab = null;

		if (typeof(force) === 'undefined') {
			force = false;
		}

		return new Promise(function(resolve, reject) {
			queryToChromeTabs({status: "complete"}).then(function(tabs) {
				for (var i = 0; i < tabs.length; i++) {
					var url = $.url(tabs[i].url);
					var host = url.attr('host');
					var matches = /(.*)?\.(dplanfix\-row|planfix|)\.(ru|com|ua)\/?(.*)?/.exec(host);

					if (matches !== null) {
						if (company !== null) {
							if (matches[1] == company) {
								// dev версия
								if (matches[2] == "dplanfix-row") {
									if (pfTab === null) {
										pfTab = tabs[i];
									}
								}
								else if (tabs[i].active) {
									pfTab = tabs[i];
								}
								else if (pfTab === null) {
									pfTab = tabs[i];
								}
							}
						}
						else {
							pfTab = tabs[i];
						}
					}
				}

				if (pfTab === null && force) {
					var taskUrl = '';

					// Только открыли таймер (перезапустили) и надо сохраниться. 
					// timer.currentParams не инициализированы
					if (typeof(timer.currentParams.generalId) == 'undefined' && self.saveMessageData !== null) {
						taskUrl = "?action=task&id=" + self.saveMessageData.taskId;
					}
					else {
						taskUrl = 'task/' + timer.currentParams.generalId;
					}

					var url = "https://" + company + ".planfix.ru/" + taskUrl;
					browser.tabs.create({url: url, active: false}).then((tab) => {
						var wasResolved = false;
						var wasRemoved = false;

						browser.tabs.onUpdated.addListener(onUpdate);
						browser.tabs.onRemoved.addListener(onRemoved);

						function onUpdate(id, info) {
							if (id == tab.id && info.status == 'complete') {
								wasResolved = true;
								resolve(tab);
								browser.tabs.onUpdated.removeListener(onUpdate);
							}

							if (wasRemoved) {
								browser.tabs.onUpdated.removeListener(onUpdate);
							}
						}

						function onRemoved(id, info) {
							if (id == tab.id) {
								wasRemoved = true;
								if (!wasResolved) {
									resolve(null);
								}
								browser.tabs.onRemoved.removeListener(onRemoved);
							}
						}
					});
				}
				else {
					resolve(pfTab);
				}
			});
		});
	};

	Planfix.prototype.isPlanfixTab = function(tab) {
		var url = $.url(tab.url);
		var host = url.attr('host');
		var matches = /(.*)?\.(dplanfix\-row|planfix|)\.(ru|com|ua)\/?(.*)?/.exec(host);

		return matches !== null;
	};

	Planfix.prototype.getTask = function() {
		var self = this;

		return new Promise(function (resolve, reject) {
			if (self.getTaskPromise === null) {
				self.getTaskPromise = {};
			}
			self.getTaskPromise.resolve = resolve;
			self.getTaskPromise.reject = reject;

			self.currentTab().then(function (tab) {
				if (tab !== null) {
					sendTabMessage(tab.id, {
						type: 'planfixTimerExtensionRequest',
						command: 'getTask',
						reqId: Date.now()
					})
				}
			});
		});
	};

	Planfix.prototype.getWorks = function() {
		var self = this;

		return new Promise(function (resolve, reject) {
			if (self.getWorksPromise === null) {
				self.getWorksPromise = {};
			}
			self.getWorksPromise.resolve = resolve;
			self.getWorksPromise.reject = reject;

			self.currentTab().then(function (tab) {
				if (tab !== null) {
					sendTabMessage(tab.id, {
						type: 'planfixTimerExtensionRequest',
						command: 'getTypeList',
						reqId: Date.now()
					});
				}
			});
		});
	};

	Planfix.prototype.checkAnaliticAccess = function() {
		var self = this;

		return new Promise(function(resolve, reject) {
			if (self.checkAnaliticPromise === null) {
				self.checkAnaliticPromise = {};
			}
			self.checkAnaliticPromise.resolve = resolve;
			self.checkAnaliticPromise.reject = reject;

			self.currentTab().then(function(tab) {
				if (tab !== null) {
					sendTabMessage(tab.id, {
						type: 'planfixTimerExtensionRequest',
						command: 'checkAnaliticAccess',
						reqId: Date.now()
					})
				}
			});
		});
	};

	Planfix.prototype.getSettings = function() {
		var self = this;

		return new Promise(function(resolve, reject) {
			if (self.getSettingsPromise === null) {
				self.getSettingsPromise = {};
			}

			self.getSettingsPromise.resolve = resolve;
			self.getSettingsPromise.reject = reject;

			self.currentTab().then(function(tab) {
				if (tab !== null) {
					sendTabMessage(tab.id, {
						type: 'planfixTimerExtensionRequest',
						reqId: Date.now(),
						command: 'getSettings'
					});
				}
			})
		});
	}

	Planfix.prototype.userIsAuthed = function() {
		var self = this;

		return new Promise(function(resolve, reject) {
			self.findPlanfixTab().then(function (tab) {
				if (tab !== null) {
					if (self.loginedPromise === null) {
						self.loginedPromise = {};
					}

					self.loginedPromise.resolve = resolve;
					self.loginedPromise.reject = reject;

					sendTabMessage(tab.id, {
						type: 'planfixTimerExtensionRequest',
						reqId: Date.now(),
						command: 'logined'
					});

					self.setTimeoutForPfRequest(2800, [self.loginedPromise]);
				}
				else {
					resolve(false);
				}
			});
		});
	};

	Planfix.prototype.currentTab = function() {
		return new Promise(function (resolve, reject) {
			queryToChromeTabs({active: true, currentWindow: true}).then(function(tabs) {
				if (!tabs.length) {
					queryToChromeTabs({active: true}).then(function(tabs) {
						if (!tabs.length) {
							resolve(null);
						}
						else {
							resolve(tabs[0]);
						}
					});
				}
				else {
					resolve(tabs[0]);
				}
			});
		});
	};

	/**
	 * Режектит промиcы после определенного времени и ставит null
	 * @param {int} после которого промисы буду режектится
	 * @param {[Promise]} promises
	 * @returns {undefined}
	 */
	Planfix.prototype.setTimeoutForPfRequest = function(timeout, promises) {
		setTimeout(function () {
			for (var i = 0; i < promises.length; i++) {
				if (promises[i] != null) {
					promises[i].reject();
					promises[i] = null;
				}
			}
		}, timeout);
	}

	Planfix.prototype.setSaveHandler = function() {
		if (!this.saveTimerHandlerActive) {
			browser.tabs.onUpdated.addListener(this.sendSaveTimerMessage);
			this.saveTimerHandlerActive = true;
		}
	};

	Planfix.prototype.removeSaveHandler = function() {
		browser.tabs.onUpdated.removeListener(this.sendSaveTimerMessage);
		this.saveTimerHandlerActive = false;
	};

	Planfix.prototype.saveTimer = function() {
		var self = this;

		timer.needSave = true;

		if (!this.saveTimerHandlerActive) {
			this.findPlanfixTab(true).then(function(tab) {
				self.userIsAuthed().then(function(authed) {
					if (authed) {
						self.sendSaveTimerMessage(tab.id);
					}
					else {
						self.setSaveHandler();
						sendRuntimeMessage({type: MessageType.SHOW_GET_AUTH});
					}
				})
				// Ответ не пришел
					.catch(function() {
						self.setSaveHandler();
						sendRuntimeMessage({type: MessageType.SHOW_GET_AUTH});
					});
			})
		}
	};

	Planfix.prototype.sendSaveTimerMessage = function(tabId, changeInfo, tab) {
		var self = planfix;

		if (self.saveMessageData === null || self.savedAnalitics.indexOf(self.getSavedAnaliticHash()) === 0) {
			return;
		}

		// Если подписались
		if (typeof(tab) !== 'undefined' && (changeInfo.status !== "complete" || !self.isPlanfixTab(tab))) {
			return;
		}

		localStorage["tabIdSaved"] = tabId;

		var message = JSON.parse(JSON.stringify(self.saveMessageData));

		// Есть разница в днях
		if (self.saveMessageData.days > 0) {
			var start = new Date(self.saveMessageData.begin);

			for (var i = 0; i <= self.saveMessageData.days; i++) {
				var date = new Date(start);
				date.setDate(date.getDate() + i); // Add day

				// Начинаем формировать сообщение
				message.date = date.format("dd-mm-yyyy");

				// Первый проход. Время начала остаётся таким же 
				if (i <= 0) {
					message.begin = start.format("HH:MM");
					message.end = "24:00";
					sendTabMessage(tabId, message);
					continue;
				}

				// Не последний проход. Время конца 0:00
				if (self.saveMessageData.days > i) {
					message.begin = "00:00";
					message.end = "24:00";

					// Последний проход. Время конца остаётся таким же
				} else {
					message.begin = "00:00";
					message.end = self.saveMessageData.end;
				}

				sendTabMessage(tabId, message);
			}
		}
		else {
			message.begin = new Date(self.saveMessageData.begin).format("HH:MM");
			sendTabMessage(tabId, message);
		}
	};

	Planfix.prototype.onSaveSuccess = function() {
		this.savedAnalitics.push(this.getSavedAnaliticHash());

		// remove storage data
		ExtensionStorage.remove_save_message_data();
		localStorage["saved"] = true;
		this.saveMessageData = null;

		this.showSaveAlert(true);
		var seconds = timer.date.getTime() / 1000 - (timer.date.getTimezoneOffset() * 60);

		timer.needSave = false;
		timer.date = new Date(1970,0,1); // Reset.
	};

	Planfix.prototype.onSaveError = function() {

		// remove storage data
		ExtensionStorage.remove_save_message_data();
		localStorage["saved"] = true;
		this.saveMessageData = null;

		this.showSaveAlert(false);

		timer.needSave = false;
	};

	Planfix.prototype.getSavedAnaliticHash = function () {
		return this.saveMessageData.taskId + this.saveMessageData.date + this.saveMessageData.begin + this.saveMessageData.end;
	};

	Planfix.prototype.showSaveAlert = function(saved) {
		var tabIdSaved = localStorage["tabIdSaved"];
		var type = saved ? "SHOW_SAVE_SUCCESS_ALERT" : "SHOW_SAVE_ERROR_ALERT";

		if (tabIdSaved) {
			sendTabMessage(Number(tabIdSaved), {type: type});
		}
		else {
			queryToChromeTabs({active: true}).then(function (tab) {
				sendTabMessage(tab[0].id, {type: type});
			});
		}
	};

	return Planfix;
})();

var planfix = new Planfix();

browser.runtime.onMessage.addListener(function (msg, type, sendResponse) {
	switch (msg.type) {
		case MessageType.GET_DEF_TIMER_OPTIONS:
			Promise.all([planfix.getTask(), planfix.getWorks(), planfix.getSettings()]).then(function(res) {
				timer.parseOptionsFromPlanFix(res, true).then(function(options) {
					timer.currentParams = options;
					sendResponse(options);
				});
			})
			.catch(function () {
				sendResponse(null);
			});

			planfix.setTimeoutForPfRequest(1500, [planfix.getTaskPromise, planfix.getWorksPromise, planfix.getSettingsPromise]);
			break;
		case MessageType.GET_WORKS:
			planfix.getWorks().then(function(worksList) {
				timer.parseOptionsFromPlanFix([worksList]).then(function(options) {
					// Кэшируем
					ExtensionStorage.setTypesOfWorks(options.worksList);
					sendResponse(options.worksList);
				});
			})
			.catch(function() {
				ExtensionStorage.getTypesOfWorks().then((worksList) => {
					sendResponse(worksList.worksList);
				});
			})
			
			planfix.setTimeoutForPfRequest(1500, [planfix.getWorksPromise]);
			break;
		case MessageType.CHECK_ANALITIC_ACCESS:
			planfix.checkAnaliticAccess().then(function(res) {
				sendResponse(res);
			})
			.catch(function() {
				sendResponse(null);
			});
			
			planfix.setTimeoutForPfRequest(1500, [planfix.checkAnaliticPromise]);
			break;
		case MessageType.SAVE_TIMER:
			var localTimezoneOffset = -new Date().getTimezoneOffset();
			var timeZoneDiff = 0;

			if (typeof(timer.currentParams.timeZoneOffset) !== 'undefined') {
				timeZoneDiff = (timer.currentParams.timeZoneOffset - localTimezoneOffset) * 60 * 1000;
			}

			var startDate = new Date(timer.currentParams.startDate);
			startDate.setTime(startDate.getTime() + timeZoneDiff);

			if (ExtensionSettings.stopTimerOnBrowserClose && timer.currentParams.savedDateState) {
				// Разница
				var addToStartTime = Math.abs(new Date(1960,0,1).getTime() - new Date(timer.currentParams.savedDateState).getTime() + timeZoneDiff);
				var endDate = new Date(startDate.getTime() + addToStartTime);
			}
			else {
				var endDate = new Date();
				endDate.setTime(endDate.getTime() + timeZoneDiff);
			}

			var utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
			var utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

			// Compute difference
			var days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));

			if (days == 0) {
				var dif = endDate.getDate() - startDate.getDate();

				// Прошло меньше 24 часов но день поменялся
				if (dif != 0) {
					days = 1;
				}
			}

			var date = new Date();
			date.setTime(date.getTime() + timeZoneDiff);

			// Баг при котором в типе работы сидит название работы
			if (isNaN(parseInt(timer.currentParams.typeOfWorkId))) {
				ExtensionStorage.getTypesOfWorks().then((res) => {
					var workList = res.worksList;
					for (var i=0; i<workList.length; i++) {
						var item = workList[i];

						if (item.name == timer.currentParams.typeOfWorkId) {
							timer.currentParams.typeOfWorkId = item.id;
							save();
							return true;
						}
					}

					// Не нашли - берем самый первый тип работы
					for (var i=0; i<workList.length; i++) {
						var item = workList[i];
						if (item.isGroup) {
							continue;
						}

						timer.currentParams.typeOfWork = item.name;
						timer.currentParams.typeOfWorkId = item.id;

						save();
						return true;
					}

					// Как один из вариантов
					save();
					return true;
				});
			}
			else {
				save();
			}

		function save() {
			planfix.saveMessageData = {
				type: 'planfixTimerExtensionRequest',
				command: 'commit',
				reqId: Date.now(),
				taskId: timer.currentParams.taskId,
				date: date.format('dd-mm-yyyy'),
				begin: startDate.toString(),
				end: endDate.format("HH:MM"),
				work: timer.currentParams.typeOfWorkId,
				days: days
			};

			ExtensionStorage.set_save_message_data(planfix.saveMessageData); // Запоминаем
			localStorage["saved"] = false;

			planfix.saveTimer();
		}
			break;
		case MessageType.IS_USER_AUTHED:
			planfix.userIsAuthed().then(function(authed) {
				sendResponse(authed);
			})
			.catch(function() {
				sendResponse(false);
			})
			break;
		// Проверка на то, ждем ли мы когда пользователь авторизуется что бы сохранить результат?
		case MessageType.CHECK_IF_NEED_SAVE:
			if (typeof (localStorage["saved"]) !== 'undefined' && localStorage["saved"] == "false") {
				ExtensionStorage.get_save_message_data().then((data) => {
					if (Object.keys(data).length > 0) {
						planfix.saveMessageData = data.saveMessageData;

						// Подписываемся
						if (!planfix.saveTimerHandlerActive) {
							planfix.saveTimer();
						}
					}
					sendResponse(timer.needSave);
				});
			}
			else {
				sendResponse(false);
			}

			break;
		case "planfixTimerExtensionResponse":
			if (msg.command == "getTask" && planfix.getTaskPromise !== null) {
				planfix.getTaskPromise.resolve(msg);
				planfix.getTaskPromise = null;
			}
			else if (msg.command == 'getTypeList' && planfix.getWorksPromise !== null) {
				planfix.getWorksPromise.resolve(msg);
				planfix.getWorksPromise = null;
			}
			else if (msg.command == 'getSettings' && planfix.getSettingsPromise !== null) {
				planfix.getSettingsPromise.resolve(msg);
				planfix.getSettingsPromise = null;
			}
			else if (msg.command == 'commit') {
				planfix.removeSaveHandler();
				if (timer.needSave) {
					if (msg.saved) {
						DEBUG.log('timer SAVED!');
						planfix.onSaveSuccess();
					}
					else {
						DEBUG.error('timer not SAVED!');
						planfix.onSaveError();
					}
				}
				browser.runtime.sendMessage({type: MessageType.TIMER_WAS_SAVED, saved: msg.saved});
			}
			else if (msg.command == 'logined' && planfix.loginedPromise !== null) {
				DEBUG.log("Авторизован!");
				// Авторизован
				planfix.loginedPromise.resolve(true);
				planfix.loginedPromise = null;
			}
			else if (msg.command == 'checkAnaliticAccess' && planfix.checkAnaliticPromise !== null) {
				planfix.checkAnaliticPromise.resolve(msg);
				planfix.checkAnaliticPromise = null;
			}

			break;
	}

	return true;
});