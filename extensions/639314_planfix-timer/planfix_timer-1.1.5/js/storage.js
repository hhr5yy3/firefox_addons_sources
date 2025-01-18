var ExtensionStorage = {
	commonTimerOptions: [
		'projectGroup',
		'projectTitle',
		'taskTitle',
		'startDate',
		'typeOfWork',
		'taskId',
		'typeOfWorkId',
		'generalId',
		'timeZoneOffset',
		'savedDateState'
	],
	
    set: function(data) {
	    browser.storage.local.set({
            projectGroup: data.projectGroup,
            projectTitle: data.projectTitle,
            taskTitle: data.taskTitle,
            typeOfWork: data.typeOfWork,
            typeOfWorkId: data.typeOfWorkId,
            taskId: data.taskId,
            generalId: data.generalId,
			timeZoneOffset: typeof(data.timeZoneOffset) === 'undefined' ? -new Date().getTimezoneOffset() : data.timeZoneOffset
        });
    },

    /**
    * @param Object data {taskId, typeOfWorkId, typeOfWork}
    */
    addTypeOfWorkTask: function(data) {
        this.getTypeOfWorkTaskObj(function(res) {
            var arr;
            if (typeof(res.typeOfWorkTask) == 'undefined') {
                arr = [];
            } else {
                arr = res.typeOfWorkTask;
            }

            if (arr.length > 100) {
                // Delete last item
                arr.shift();
            }

            var wasUpdated = false;
            arr.forEach(function(o,i) {
                if (o.taskId == data.taskId) {
                    wasUpdated = true;
                    o.typeOfWorkId = data.typeOfWorkId;
                    o.typeOfWork = data.typeOfWork;
                }
            });

            if (!wasUpdated) {
                arr.push(data);
            }

            // Save back
	        browser.storage.local.set({'typeOfWorkTask': arr});
        })
    },

    /**
    * @param Integer $taskId
    *
    * Return null if task was not found
    */
    getTypeOfWorkTask: function(taskId) {
		var self = this;
		
		return new Promise(function(resolve, reject) {
			self.getTypeOfWorkTaskObj(function (res) {
				var arr;
				if (res.typeOfWorkTask == undefined) {
					arr = [];
				} else {
					arr = res.typeOfWorkTask;
				}

				var work = {};
				arr.forEach(function (o, i) {
					if (o.taskId == taskId) {
						if (parseInt(o.typeOfWorkId) >= 0) {
							work.typeOfWorkId = o.typeOfWorkId;
							work.typeOfWork = o.typeOfWork;	
						}
					}
				})

				// Есть данные по последней работе по этой задаче
				if (Object.keys(work).length > 1) {
					resolve(work);
				} 
				else {
					// Берём просто последнию работу
					self.getLastWork().then((res) => {
						if (Object.keys(res).length > 1) {
							if (parseInt(res.id_last_work) >= 0) {
								work.typeOfWorkId = res.id_last_work;
								work.typeOfWork = res.last_work;
								resolve(work);
							}
							else {
								resolve(null);
							}
						}
						else {
							resolve(null);
						}
					});
				}
			});
		});
    },

    getTypeOfWorkTaskObj: function(handler) {
	    browser.storage.local.get(['typeOfWorkTask']).then((res) => {
        	handler(res);
	    });
    },
    
    setStartDate: function(data) {
	    browser.storage.local.set({startDate: data});
    },
	
	saveDateState: function(data) {
		browser.storage.local.set({savedDateState: data})
	},

    set_save_message_data: function(data) {
	    browser.storage.local.set({"saveMessageData": data})
    },

    get_save_message_data: function() {
    	return browser.storage.local.get(['saveMessageData']);
    },

    remove_save_message_data: function() {
	    browser.storage.local.remove(["saveMessageData"]);
    },
    
    get: function(callback) {
    	return browser.storage.local.get(this.commonTimerOptions).then(callback);
    },

    rememberLastWork: function(work, id) {
	    browser.storage.local.set({
            last_work: work,
            id_last_work: id
        });
    },

    getLastWork: function() {
    	return browser.storage.local.get(["last_work", "id_last_work"]);
    },

    getTypesOfWorks: function(handler) {
    	return browser.storage.local.get(['worksList']);
    },

    setTypesOfWorks: function(data) {
	    browser.storage.local.set({"worksList": data});
    },
    
    clear: function() {
	    browser.storage.local.remove(this.commonTimerOptions);
    },
    
    is_set: function(callback) {
    	this.get().then((res) => {
		    if (Object.keys(res).length > 0) {
			    callback(true);
		    }
		    else {
			    callback(false);
		    }
	    });
    }
};