var Timer = (function() {
	function Timer() {};

	Timer.prototype.taskParams = null;
	Timer.prototype.worksList = null;
	Timer.prototype.currentParams = {};
	Timer.prototype.date = new Date(1970, 0, 1);
	Timer.prototype.timerIter = false;
	Timer.prototype.needSave = false;
	Timer.prototype.running = false;
	Timer.prototype.storageWasCheckedForRunning = false;

	Timer.prototype.parseOptionsFromPlanFix = function(options, initTypeOfWork) {
		var self = this;

		if (typeof(initTypeOfWork) === 'undefined') {
			initTypeOfWork = false;
		}

		return new Promise(function(resolve, reject) {
			try {
				var res = {};
				for (var i = 0; i < options.length; i++) {
					switch (options[i].command) {
						case "getTask":
							res.projectTitle = options[i].projectTitle;
							res.taskTitle = options[i].taskTitle;
							res.taskId = options[i].taskId;
							res.generalId = options[i].generalId;

							if (typeof (options[i].isTaskCard) !== 'undefined') {
								res.isTaskCard = options[i].isTaskCard;
							}
							break;
						case "getTypeList":
							res.worksList = self.parseWorksList(options[i]);
							if (typeof (options[i].noConfiguration) !== 'undefined') {
								res.noConfiguration = options[i].noConfiguration;
							}
							break;
						case "getSettings":
							res.timeZoneOffset = options[i].timeZoneOffset;
							break;
					}
				}
			}
			catch (e) {
				DEBUG.error("Error while parsing response from PlanFix! " + e + " Response: " + options);
				reject();
			}

			// Тип работы
			if (initTypeOfWork) {
				ExtensionStorage.getTypeOfWorkTask(res.taskId).then(function (work) {
					if (work !== null && typeOfWorkExists(res.worksList, work.typeOfWorkId)) {
						res.typeOfWork = work.typeOfWork;
						res.typeOfWorkId = work.typeOfWorkId;
					}
					else {
						if (res.worksList.length > 0) {
							for (var i=0; i<res.worksList.length; i++) {

								// Первая аналитика (не группа)
								if (res.worksList[i].isGroup) {
									continue;
								}

								res.typeOfWork = res.worksList[i].name;
								res.typeOfWorkId = res.worksList[i].id;
								break;
							}
						}
					}

					resolve(res);
				});
			}
			else {
				resolve(res);
			}
		});

		function typeOfWorkExists(typesOfWork, id) {
			for (var i=0; i<typesOfWork.length; i++) {
				if (typesOfWork[i].id == id) {
					return true;
				}
			}

			return false;
		}
	};

	Timer.prototype.parseWorksList = function(worksList) {
		var works = worksList.typeList;
		var result = [];
		for (var i = 0; i < works.length; i++) {
			if (parseInt(works[i].Key) >= 0) {
				result.push({
					id: works[i].Key,
					parentId: works[i].ParentKey,
					name: works[i].Search,
					isGroup: works[i].IsGroup
				});

				var parentId = works[i].ParentKey;

				if (parentId == 0) {
					result[i].level = 0;
				} else {
					var level = findById(result, parentId);
					result[i].level = ++level;
				}
			}
		}

		if (!result.length) {
			result.push({
				id: 0,
				parentId: 0,
				name: chrome.i18n.getMessage('app_system1'),
				isGroup: 0,
				level: 0
			});
		}

		return result;

		function findById(works, id) {
			for (var i = 0; i < works.length; i++) {
				if (works[i].id == id) {
					return works[i].level;
				}
			}
		}
	};

	Timer.prototype.start = function(data) {
		var self = this;

		if (typeof(data) !== 'undefined' && !$.isEmptyObject(data)) {
			this.currentParams = data;

			// If data in storage is set, then timer is not new
			ExtensionStorage.is_set(function (res) {

				// @todo: каждый раз при открытии попапа, если таймер работает - перезаписываю сторедж
				ExtensionStorage.set(self.currentParams);
				if (!res) {
					ExtensionStorage.setStartDate(new Date().getTime()); // In Miliseconds
				}
			});
		}

		// New timer?
		DEBUG.log("timer_iter is", this.timerIter);
		if (this.timerIter === false) {
			self.getTimerOptions().then(function(options) {

				// #195187 - savedDateState остается в сторедже
				if (options.hasOwnProperty('taskId')) {
					// Отсутствует время в сторедже
					if (typeof (self.currentParams.startDate) === 'undefined') {
						DEBUG.log("startDate not exists!");
						self.currentParams.startDate = new Date();
						ExtensionStorage.setStartDate(self.currentParams.startDate.getTime());
					}

					// Отключаем таймер при выключении браузера?
					if (ExtensionSettings.stopTimerOnBrowserClose && options.savedDateState) {
						self.date = new Date(options.savedDateState);
					}
					else {
						var diff = (Date.now() - self.currentParams.startDate);
						self.date.setMilliseconds(diff);
					}

					self.renderBadge();

					// Send fast time (not waiting for interval message)
					browser.runtime.sendMessage({type: MessageType.TIME_FORMAT, time: self.date.format("HH:MM:ss")});
				}
				else {
					self.renderBadge();
				}
			});

			this.running = true;
			this.setIcon(true);

			// Сохранение даты в сторедж каждые 30сек
			var dateStateSaved = false;

			// Обновление даты каждую секунду
			this.timerIter = setInterval(function () {
				if (typeof (self.currentParams.startDate) === 'undefined') {
					self.date.setMilliseconds(1000);
				} else {
					var diff = (Date.now() - self.currentParams.startDate);
					self.date = new Date(1970, 0, 1);
					self.date.setMilliseconds(diff);
				}

				if (ExtensionSettings.showBadge) {
					self.renderBadge();
				}

				if (!dateStateSaved) {
					dateStateSaved = true;
					setTimeout(function() {
						if (self.running) {
							DEBUG.log("save date state " + self.date);
							ExtensionStorage.saveDateState(self.date.getTime());
						}
						dateStateSaved = false;
					}, 30000);
				}

				// Send time format to view (index.js)
				browser.runtime.sendMessage({type: MessageType.TIME_FORMAT, time: self.date.format("HH:MM:ss")});
			}, 1000);
		}
	};

	Timer.prototype.renderBadge = function() {
		var setBadge = browser.browserAction.setBadgeText;

		var h = this.date.getHours();
		var m = this.date.getMinutes();
		var s = this.date.getSeconds();

		// Format
		var mf = this.date.format("MM");
		var sf = this.date.format("ss");

		if (h > 0) {
			if (h > 9) {
				setBadge({text: h + "."});
			} else {
				setBadge({text: h + '.' + mf})
			}
		} else if (m > 0) {
			setBadge({text: mf + ":"})
		} else if (s >= 0) {
			setBadge({text: ":" + sf});
		}
	}

	Timer.prototype.stop = function(isReset) {
		// Set default title
		browser.browserAction.setTitle({title: browser.runtime.getManifest().name});
		browser.browserAction.setBadgeText({text: ""});
		this.needSave = true;
		clearInterval(this.timerIter);
		this.timerIter = false;
		this.running = false;
		this.setIcon(false);

		// При сохранении дата обнуляется в Planfix::onSaveSuccess
		if (isReset) {
			this.date = new Date(1970, 0, 1)
		}

		ExtensionStorage.clear();
		ExtensionStorage.rememberLastWork(this.currentParams.typeOfWork, this.currentParams.typeOfWorkId);
	};

	Timer.prototype.setIcon = function() {
		this.isRunning().then(function(running) {
			if (running) {
				browser.browserAction.setIcon({
					path: "images/extension-running.png"
				});
			}
			else {
				browser.browserAction.setIcon({
					path: "images/extension-icon.png"
				});
			}
		});
	};

	/**
	 * Иницилизирует this.running
	 * @returns {Promise}
	 */
	Timer.prototype.isRunning = function() {
		var self = this;

		return new Promise(function(resolve, reject) {
			if (self.running === false) {
				// Storage not cheked
				if (!self.storageWasCheckedForRunning) {
					self.storageWasCheckedForRunning = true;
					ExtensionStorage.is_set(function (res) {
						if (res) {
							self.getTimerOptions().then(function(options) {
								// #195187 - savedDateState остается в сторедже
								if (options.hasOwnProperty('taskId')) {
									self.running = true;
									resolve(true);
								}
								else {
									resolve(false);
								}
							});
						}
						else {
							resolve(false)
						}
					});
				}
				else {
					resolve(false)
				}
			}
			else {
				resolve(true);
			}
		});
	};

	/**
	 * Если берем со стороджа - устанавливает this.currentParams
	 * @returns {Promise}
	 */
	Timer.prototype.getTimerOptions = function() {
		var self = this;

		return new Promise(function(resolve, reject) {
			if ($.isEmptyObject(self.currentParams)) {
				ExtensionStorage.get((params) => {
					self.currentParams = params;

					DEBUG.log("got timer options from storage " + JSON.stringify(params));

					resolve(self.currentParams);
				});
			}
			else {
				resolve(self.currentParams);
			}
		});
	};

	return Timer;
})();

var timer = new Timer();

timer.isRunning().then(function(isRunning) {
	if (isRunning) {
		timer.start();
	}
});

browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.type == "planfixTimerExtensionRequest") {
		return false;
	}

	if(msg.type == undefined) {
		return false;
	}

	if (msg.type != MessageType.TIME_FORMAT) {
		DEBUG.log("Receive message " + getHumanMessageType(msg.type) + ":" + JSON.stringify(msg));
	}

	switch (msg.type) {
		case MessageType.GET_TIME_FORMAT:
			sendResponse(timer.date.format("HH:MM:ss"));
			break;
		case MessageType.START_TIMER:
			timer.start(msg.data);
			break;
		case MessageType.RESET_TIMER:
			timer.stop();
			break;
		case MessageType.CHECH_FOR_RUNNING:
			timer.isRunning().then(function(isRunning) {
				sendResponse(isRunning);
			});
			break;
		case MessageType.GET_TIMER_OPTIONS:
			timer.getTimerOptions().then(function(options) {
				sendResponse(options);
			});
			break;
		case MessageType.UPDATE_DEF_TYPE_OF_WORK:
			// Запоминаем последний вид работы как для отдельной задачи, так и в целом
			if (parseInt(msg.id) >= 0) {
				ExtensionStorage.rememberLastWork(msg.work, msg.id);
				ExtensionStorage.addTypeOfWorkTask({
					taskId: timer.currentParams.taskId,
					typeOfWorkId: msg.id,
					typeOfWork: msg.work
				});
			}
			break;

		case MessageType.INFO_FOR_DEVELOPE:
			browser.storage.local.get(function (chromeStorageSync) {
				var variables = {
					date: timer.date.toString(),
					needSave: timer.needSave,
					saveTimerHandlerActive: planfix.saveTimerHandlerActive,
					saveMessageData: planfix.saveMessageData
				};

				var manifest = browser.runtime.getManifest();
				var others = {
					version: manifest.version
				};

				sendResponse([localStorage, chromeStorageSync, variables, others]);
			});

			break;

	}
	return true;
});