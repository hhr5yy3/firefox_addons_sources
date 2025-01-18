var Save_opt = {};
var CrashSession = {};//Добавлено в 2.6.13 массив краш сессий
var OpenSession = {};// Добавлено в 2.10.9 сессия, которая открывается
var DayCrashSession = {};
var ListCrashSession = [];//Добавлено в 2.14.1 список снимком сессий
var CloseWindowSessions = [];//Добавлено в 2.14.2 список сессий при закрытии окна
var ListCloseWindowSessions = [];//Добавлено в 2.14.3 список сесссий при закрытии окна для попап
var sessionsSave = [];// все сессии для сохранения в файл, добавлено в 2.14.4
var CloseWindowTemp;//Временная сессия для сохранения при закрытии окна.
var sessions = [];//Добавлено в 2.5.6 список сохраненных сессий
var sessionFolderId;//Добавлено в 2.5.6 идентификатор папки сохранения в закладках
var BrowserVersion;//Версия браузера
var tablist = []; //Добавлено в 2.10.3 список открытых вкладок
var ShowFav = 1;



function getMessage(a, b) {
    try {
        var c = browser.i18n.getMessage(a, b);
        if (c) return c;
    } catch (d) {}
}

browser.runtime.onInstalled.addListener(function () {
	 if (Save_opt.ShowFaviconTab == undefined)
	 {
		 ShowFav = 0;
    // browser.tabs.create({
        // url: "opt-in.html"
    
	 }
});

function SessionData(mstitle, msdate, mstabsCount, msfolderId)
{
    this.title = mstitle;
    this.date = msdate;
    this.urls = [];
    this.tabsCount = mstabsCount;
    this.folderId = msfolderId;
    this.windows = {};
    this.labels = {};
}
SessionData.prototype = {
    addTab: function(tab)
    {
        try
        {
            this.windows[tab.win] = this.windows[tab.win] || [];
			//console.log(tab);
			//Исправляю данные заголовка\адреса для совместимости LOS и TS
			//console.log(tab);
			tab = ITitleUrl(tab);
			//console.log(tab);
			if (tab.pinned)
            {
                tab.title = tab.title+"&&"+"pinned";

            }
			//console.log(tab);
            var options = {
                title: tab.title,
                url: tab.url
            };
			//console.log(options);
            if (tab.pinned)
            {
                options.pinned = true;

            }
			if ( tab.incognito && Save_opt.ShowPrivate === false )
			{
				console.log(tab);
			}
			else
			{
            this.windows[tab.win].push(options);
            this.tabsCount++;
			}
			//console.log(this.windows[tab.win]);
			//console.log(this.tabsCount);
        }
        catch (fmt)
        {
            console.error(fmt);
        }
    },
    addWinLabel: function(k, val)
    {
        this.labels[k] = val;
    },
    getWinCount: function()
    {
        var getWinCount = 0;
        var windows;
        for (windows in this.windows)
        {
            getWinCount += 1;
        }
        return getWinCount;
    },
    getCount: function()
    {
        var sum = 0;
        var index;
        for (index in this.windows)
        {
            sum += this.windows[index].length;
            console.log("getCount" + sum);
        }
        return this.tabsCount = sum;
    },
    save: function(values, index)
    {
		var self = this;
		console.log(self);
        getSessionFolder(function(parentId)
        {
            console.log(self.title + " (" + self.date + ")--" + self.getCount() + "tabs");
			console.log("Создаем папку SAVE");
            browser.bookmarks.create(
            {
                parentId: parentId,
                index: index || 0,
                title: self.title + " (" + self.date + ")--" + self.getCount() + "tabs"
            }, function(resp)
            {
				console.log(resp);
                if (resp)
                {
                    self.folderId = resp.id;
                    resp = [];
                    var d;
                    for (d in self.windows)
                    {
                        resp.push(d);
                    }
                    self.saveWindow(resp, function()
                    {

                    });
                }
                else
                {
                    if (values)
                    {
                        values(false);
                    }
                }
            });
        });
		//Заново инициируем список сессий при сохранении
		//initSessionList();
		//console.log("Сохранение");
    },
    saveWindow: function(args, fn)
    {
        if (args.length === 0)
        {
            fn();
        }
        else
        {
            var jQuery = this;
            var i = args.pop();
            browser.bookmarks.create(
            {
                parentId: this.folderId,
                index: 0,
                title: "window " + i
            }, function(err)
            {
                var nTokens = jQuery.windows[i].length;
                var ti = 1;
                for (; ti < nTokens + 1; ++ti)
                {
					//Индикация сохранения сессии
					setIcon(ti, nTokens);
					//console.log(jQuery.windows[i]);
					//console.log(jQuery.windows[i][nTokens - ti].url);
                    browser.bookmarks.create(
                    {
						//
                        parentId: err.id,
                        title: jQuery.windows[i][nTokens - ti].title,
                        url: jQuery.windows[i][nTokens - ti].url,
                    });
                }
                jQuery.saveWindow(args, fn);
                
            });
        }
		//Заново инициируем список сессий при сохранении
		initSessionList();
		console.log("Сохранение окна");
    },
    update: function(atts, ms)
    {
        var self = this;
        browser.bookmarks.removeTree(this.folderId, function()
        {
            self.save(atts, Save_opt.editOrder == "false" ? ms : 0);
        });
		//Заново инициируем список сессий при изменении
		initSessionList();
		console.log("Изменение");
    },
    remove: function(keepData)
    {
		console.log(this);
		browser.bookmarks.removeTree(this.folderId, keepData);
    },
    open: function(method)
    {
		// var searching = browser.history.search({text: "", startTime: 0});
		var dep;
		var arr;

		console.log(this);
		OpenSession = this;
		opentab = 0;
		browser.tabs.onCreated.addListener(opensort);
		
        if (this.getWinCount() == 1 && method == 1)
        {
			var j;
			
			
            for (j in this.windows)
            {
                dep = this.windows[j];
                //j = 0;
			}
			console.log(dep);
			//Добавляю свойство прикрепления из заголовка
					 j = 0;
					for (; j < dep.length; j++)
					{
						arr = dep[j].title.split("&&");
						if (arr[1] == "pinned")
						{
							dep[j].pinned = true;
						}
						else
						{
							dep[j].pinned = false;
						}
					}
					//Сортирую вкладки
					var ret = [];
					var elems = [];
					dep.forEach(function(v)
					{
						if (v.pinned)
						{
							elems.push(v);
						}
						else
						{
							ret.push(v);
						}
					});
					if (elems.length > 0)
					{
						ret = ret.concat(elems);
					}
					console.log(ret);
                    //var req = ret.shift();
					//console.log(req);
					if (BrowserVersion >= 63 && Save_opt.Discarded)
					{
						let i = 0;
						console.log("111111111111111111111111111111111111111111111");
						for (; i < ret.length; i++)
						{
							console.log(ret[i].url);
							browser.tabs.create(
							{
								active: false,
								url: ret[i].url,
								//title: ret[i].title,
								title: !ret[i].pinned ? ret[i].title : "",
								//url: realURL(ret[i]),
								discarded: ret[i].pinned ? false : true,
								pinned: ret[i].pinned ? true : false
							});
							setIcon(i, ret.length);
							//setTimeout(console.log(dep[i].url), 1000);
						}

					}
					else
					{
					loop(0, ret.length,100);
					function loop(i, l, interval) 
						{      
							setTimeout(
								function() 
								{  
									console.log(ret);
									browser.tabs.create(
									{
										active: false,
										//url: ret[i].url,
										url: realURL(ret[i]),
										pinned: ret[i].pinned ? true : false
									}); 
									i = i + 1; //     
									if (i < l) { // 
										loop(i, l, interval);
										console.log(interval);
										setIcon(i, l);
									}
								}, interval);
						}
					}

            
        }
		else if (this.getWinCount() == 1 && method == 3)
        {
			var i;
			
            for (i in this.windows)
            {
                dep = this.windows[i];
			}
			console.log(dep);
			//Добавляю свойство прикрепления из заголовка
					 let j = 0;
					for (; j < dep.length; j++)
					{
						arr = dep[j].title.split("&&");
						if (arr[1] == "pinned")
						{
							dep[j].pinned = true;
						}
						else
						{
							dep[j].pinned = false;
						}
					}
					//Сортирую вкладки
					 let ret = [];
					 let elems = [];
					dep.forEach(function(v)
					{
						if (v.pinned)
						{
							elems.push(v);
						}
						else
						{
							ret.push(v);
						}
					});
					if (elems.length > 0)
					{
						ret = ret.concat(elems);
					}
					console.log(ret);
					if (BrowserVersion >= 63 && Save_opt.Discarded)
					{
						i = 0;
						console.log("22222222222222222222222222222222222222222222222222222");
						for (; i < ret.length; i++)
						{
							console.log(ret[i].url);
							browser.tabs.create(
							{
								active: false,
								url: ret[i].url,
								//title: ret[i].title,
								title: !ret[i].pinned ? ret[i].title : "",
								//url: realURL(ret[i]),
								discarded: ret[i].pinned ? false : true,
								pinned: ret[i].pinned ? true : false
							});
							setIcon(i, ret.length);
							//setTimeout(console.log(dep[i].url), 1000);
						}

					}
					else
					{
						i = 0;
						for (; i < ret.length; i++)
						{
							console.log(ret[i].url);
							browser.tabs.create(
							{
								active: false,
								//url: ret[i].url,
								url: realURL(ret[i]),
								pinned: ret[i].pinned ? true : false
							});
							setIcon(i, ret.length);
							//setTimeout(console.log(dep[i].url), 1000);
						}
					}
            
        }
        else
        {
            var replies = [];
            for (dep in this.windows)
            {
                replies.push(this.windows[dep]);
                console.log(replies[0][0]);
				console.log(replies);
            }
            var save = function(replies, callback, value, errorCB)
            {
                if (replies.length === 0)
                {
                    errorCB();
                }
                else
                {
                    var fns = replies.shift();
					console.log(fns);
					console.log(callback);
					console.log(value);
					
					//Добавляю свойство прикрепления из заголовка
					var i = 0;
					for (; i < fns.length; i++)
					{
						arr = fns[i].title.split("&&");
						if (arr[1] == "pinned")
						{
							fns[i].pinned = true;
						}
						else
						{
							fns[i].pinned = false;
						}
					}
					//Сортирую вкладки
					var ret = [];
					var elems = [];
					fns.forEach(function(v)
					{
						if (v.pinned)
						{
							elems.push(v);
						}
						else
						{
							ret.push(v);
						}
					});
					if (elems.length > 0)
					{
						ret = ret.concat(elems);
					}
					console.log(ret);
                    var req = ret.shift();
					console.log(req);
                    try
                    {
                        if (req.url.indexOf("about:") > -1 || req.url.indexOf("moz-extension:") > -1)
                        {
                            req.url = null;
                        }
                        console.log(req.url);
                        browser.windows.create(
                        {
                            url: req.url,
                            state: callback,
                            type: value
							//incognito: true
                        }, function(tab)
                        {
							
							if (BrowserVersion >= 63 && Save_opt.Discarded)
							{
								i = 0;
								console.log("3333333333333333333333333333333333333333333333333333333");
								for (; i < ret.length; i++)
								{
									console.log(ret[i]);
									browser.tabs.create(
									{
										index: i,
										active: false,
										windowId: tab.id,
										url: ret[i].url,
										title: !ret[i].pinned ? ret[i].title : "",
										//url: realURL(ret[i]),
										discarded: ret[i].pinned ? false : true,
										pinned: ret[i].pinned ? true : false
									});
									setIcon(i, ret.length);
									//setTimeout(console.log(dep[i].url), 1000);
								}

							}
							else
							{
								console.log("666666666666");
								if ( method == 2)
								{
									console.log("44444444444444444444444444444444444444444444444444444444444");
									ret.forEach(function(req)
									{
										browser.tabs.create(
										{
											active: false,
											windowId: tab.id,
											url: realURL(req),
											pinned: req.pinned ? true : false
										});
									});
								}
								else
								{
								console.log("5555555555555555555555555555555555555555555555555555555555555555555");
								loop(0, ret.length,100); 
			 
									function loop(i, l, interval) 
									{      
										setTimeout(
											function() 
											{  
												console.log(fns);
												browser.tabs.create(
												{
													//index: i,
													active: false,
													windowId: tab.id,
													url: realURL(ret[i]),
													pinned: ret[i].pinned ? true : false
												});//.then(TabMove);   
												i = i + 1; //     
												if (i < l) { // 
													loop(i, l, interval);
													console.log(interval);
													setIcon(i, l);
												}
											}, interval);
									}
								}
							}
                            save(replies, callback, value, errorCB);
                        });
                    }
                    catch (m)
                    {
                        console.error("Fail to create window", m);
                    }
                }
            };
            browser.windows.getAll(
            {
                populate: false
            }, function(failures)
            {
                var modals = [];
                var value;
                var restoreScript;
                failures.forEach(function(attrs)
                {
                    if (attrs.focused)
                    {
						console.log(attrs);
                        value = attrs.type;
                        restoreScript = attrs.state;
                    }
                    modals.push(attrs.id);
					console.log(attrs.id);
                });
				console.log(restoreScript);
					console.log(value);
                save(replies, restoreScript, value, function()
                {
                    if (method == 1)
                    {
                        modals.forEach(function(key)
                        {
                            browser.windows.remove(key);
                        });
                    }
                });
            });
        }
		
    },
	openprivate: function(method)
    {
		// var searching = browser.history.search({text: "", startTime: 0});
		var arr;
		var dep;

		console.log(this);
		OpenSession = this;
		opentab = 0;
		browser.tabs.onCreated.addListener(opensort);
		
        if (this.getWinCount() == 1 && method == 1)
        {
			var j;
			
            for (j in this.windows)
            {
                dep = this.windows[j];
                //j = 0;
			}
			console.log(dep);
			//Добавляю свойство прикрепления из заголовка
					 j = 0;
					for (; j < dep.length; j++)
					{
						arr = dep[j].title.split("&&");
						if (arr[1] == "pinned")
						{
							dep[j].pinned = true;
						}
						else
						{
							dep[j].pinned = false;
						}
					}
					//Сортирую вкладки
					var ret = [];
					var elems = [];
					dep.forEach(function(v)
					{
						if (v.pinned)
						{
							elems.push(v);
						}
						else
						{
							ret.push(v);
						}
					});
					if (elems.length > 0)
					{
						ret = ret.concat(elems);
					}
					console.log(ret);
                    //var req = ret.shift();
					//console.log(req);
					if (BrowserVersion >= 63 && Save_opt.Discarded)
					{
						let i = 0;
						console.log("111111111111111111111111111111111111111111111");
						for (; i < ret.length; i++)
						{
							console.log(ret[i].url);
							browser.tabs.create(
							{
								active: false,
								url: ret[i].url,
								//title: ret[i].title,
								title: !ret[i].pinned ? ret[i].title : "",
								//url: realURL(ret[i]),
								discarded: ret[i].pinned ? false : true,
								pinned: ret[i].pinned ? true : false
							});
							setIcon(i, ret.length);
							//setTimeout(console.log(dep[i].url), 1000);
						}

					}
					else
					{
					loop(0, ret.length,100);
					function loop(i, l, interval) 
						{      
							setTimeout(
								function() 
								{  
									console.log(ret);
									browser.tabs.create(
									{
										active: false,
										//url: ret[i].url,
										url: realURL(ret[i]),
										pinned: ret[i].pinned ? true : false
									}); 
									i = i + 1; //     
									if (i < l) { // 
										loop(i, l, interval);
										console.log(interval);
										setIcon(i, l);
									}
								}, interval);
						}
					}

            
        }
		else if (this.getWinCount() == 1 && method == 3)
        {
            var i;
            for (i in this.windows)
            {
                dep = this.windows[i];
			}
			console.log(dep);
			//Добавляю свойство прикрепления из заголовка
					 let j = 0;
					for (; j < dep.length; j++)
					{
						arr = dep[j].title.split("&&");
						if (arr[1] == "pinned")
						{
							dep[j].pinned = true;
						}
						else
						{
							dep[j].pinned = false;
						}
					}
					//Сортирую вкладки
					 let ret = [];
					 let elems = [];
					dep.forEach(function(v)
					{
						if (v.pinned)
						{
							elems.push(v);
						}
						else
						{
							ret.push(v);
						}
					});
					if (elems.length > 0)
					{
						ret = ret.concat(elems);
					}
					console.log(ret);
					if (BrowserVersion >= 63 && Save_opt.Discarded)
					{
						i = 0;
						console.log("22222222222222222222222222222222222222222222222222222");
						for (; i < ret.length; i++)
						{
							console.log(ret[i].url);
							browser.tabs.create(
							{
								active: false,
								url: ret[i].url,
								//title: ret[i].title,
								title: !ret[i].pinned ? ret[i].title : "",
								//url: realURL(ret[i]),
								discarded: ret[i].pinned ? false : true,
								pinned: ret[i].pinned ? true : false
							});
							setIcon(i, ret.length);
							//setTimeout(console.log(dep[i].url), 1000);
						}

					}
					else
					{
						i = 0;
						for (; i < ret.length; i++)
						{
							console.log(ret[i].url);
							browser.tabs.create(
							{
								active: false,
								//url: ret[i].url,
								url: realURL(ret[i]),
								pinned: ret[i].pinned ? true : false
							});
							setIcon(i, ret.length);
							//setTimeout(console.log(dep[i].url), 1000);
						}
					}
            
        }
        else
        {
            var replies = [];
            for (dep in this.windows)
            {
                replies.push(this.windows[dep]);
                console.log(replies[0][0]);
            }
            var save = function(replies, callback, value, errorCB)
            {
                if (replies.length === 0)
                {
                    errorCB();
                }
                else
                {
                    var fns = replies.shift();
					console.log(fns);
					
					//Добавляю свойство прикрепления из заголовка
					var i = 0;
					for (; i < fns.length; i++)
					{
						arr = fns[i].title.split("&&");
						if (arr[1] == "pinned")
						{
							fns[i].pinned = true;
						}
						else
						{
							fns[i].pinned = false;
						}
					}
					//Сортирую вкладки
					var ret = [];
					var elems = [];
					fns.forEach(function(v)
					{
						if (v.pinned)
						{
							elems.push(v);
						}
						else
						{
							ret.push(v);
						}
					});
					if (elems.length > 0)
					{
						ret = ret.concat(elems);
					}
					console.log(ret);
                    var req = ret.shift();
					console.log(req);
                    try
                    {
                        if (req.url.indexOf("about:") > -1 || req.url.indexOf("moz-extension:") > -1)
                        {
                            req.url = null;
                        }
                        console.log(req.url);
                        browser.windows.create(
                        {
                            url: req.url,
                            state: callback,
                            type: value,
							incognito: true
                        }, function(tab)
                        {
							
							if (BrowserVersion >= 63 && Save_opt.Discarded)
							{
								i = 0;
								console.log("3333333333333333333333333333333333333333333333333333333");
								for (; i < ret.length; i++)
								{
									console.log(ret[i]);
									browser.tabs.create(
									{
										index: i,
										active: false,
										windowId: tab.id,
										url: ret[i].url,
										title: !ret[i].pinned ? ret[i].title : "",
										//url: realURL(ret[i]),
										discarded: ret[i].pinned ? false : true,
										pinned: ret[i].pinned ? true : false
									});
									setIcon(i, ret.length);
									//setTimeout(console.log(dep[i].url), 1000);
								}

							}
							else
							{
								console.log("666666666666");
								if ( method == 2)
								{
									console.log("44444444444444444444444444444444444444444444444444444444444");
									ret.forEach(function(req)
									{
										browser.tabs.create(
										{
											active: false,
											windowId: tab.id,
											url: realURL(req),
											pinned: req.pinned ? true : false
										});
									});
								}
								else
								{
								console.log("5555555555555555555555555555555555555555555555555555555555555555555");
								loop(0, ret.length,100); 
			 
									function loop(i, l, interval) 
									{      
										setTimeout(
											function() 
											{  
												console.log(fns);
												browser.tabs.create(
												{
													//index: i,
													active: false,
													windowId: tab.id,
													url: realURL(ret[i]),
													pinned: ret[i].pinned ? true : false
												});//.then(TabMove);   
												i = i + 1; //     
												if (i < l) { // 
													loop(i, l, interval);
													console.log(interval);
													setIcon(i, l);
												}
											}, interval);
									}
								}
							}
                            save(replies, callback, value, errorCB);
                        });
                    }
                    catch (m)
                    {
                        console.error("Fail to create window", m);
                    }
                }
            };
            browser.windows.getAll(
            {
                populate: false
            }, function(failures)
            {
                var modals = [];
                var value;
                var restoreScript;
                failures.forEach(function(attrs)
                {
                    if (attrs.focused)
                    {
						console.log(attrs);
                        value = attrs.type;
                        restoreScript = attrs.state;
                    }
                    modals.push(attrs.id);
                });
                save(replies, restoreScript, value, function()
                {
                    if (method == 1)
                    {
                        modals.forEach(function(key)
                        {
                            browser.windows.remove(key);
                        });
                    }
                });
            });
        }
		
    },
    toJson: function()
    {
        var data = {
            title: this.title,
            date: this.date,
            tabs: []
        };
        var index;
        for (index in this.windows)
        {
            this.windows[index].forEach(function(tab)
            {
                var options = {
                    title: tab.title,
                    url: tab.url,
                    win: index
                };
                if (tab.pinned)
                {
                    options.pinned = true;
                }
                data.tabs.push(options);
            });
        }
        data.created = (new Date()).getTime();
        return JSON.stringify(data);
    },
	toList: function()
    {
        var data = {
            title: this.title,
            date: this.date,
            tabs: []
        };
		var list = [];
        var index;
        for (index in this.windows)
        {
            this.windows[index].forEach(function(tab)
            {
                var options = {
                    title: tab.title,
                    url: tab.url,
                    win: index
                };
                if (tab.pinned)
                {
                    options.pinned = true;
                }
                list.push(tab.url);
            });
        }
        data.created = (new Date()).getTime();
		console.log(list);
        return list;
    }
};

//Сортирую вкладки в правильном порядке
//================================================
let opentab = 0;
function opensort()
{
	opentab++;
	console.log(opentab);
	//console.log(OpenSession.tabsCount);
	browser.tabs.onMoved.addListener(handleMoved);
	if (opentab > (OpenSession.tabsCount/2))
	{
		browser.tabs.onCreated.removeListener(opensort);
		browser.tabs.onMoved.removeListener(handleMoved);
		console.log("Отключаю все слушатели");
	}
}

function handleMoved(tabId, moveInfo) {
  console.log("Tab " + tabId +
              " moved from " + moveInfo.fromIndex +
              " to " + moveInfo.toIndex +
			  " in " + moveInfo.windowId);
			  if (moveInfo.fromIndex > moveInfo.toIndex)
			  {
					browser.tabs.move(tabId, {index: moveInfo.fromIndex, windowId: moveInfo.windowId});
			  }
	
}
//========================================================
function TabMove(tab)
{
	console.log(tab);
	if (tab.index == 1 && !tab.pinned)
	{
		tablist.delete;
	tablist = [];
	}
	tablist.push(tab);
	console.log(tablist);
	
	
}

function TabMoveEnd()
{
	tablist.forEach(function(tab)
	{
		if (tablist[tablist.length-1].pinned)
		{
			if (!tab.pinned)
			{
			browser.tabs.move(tab.id, {windowId: tab.windowId, index: tab.index + tablist[tablist.length-1].index + 2});
			console.log(tab.index);
			}
		}
		else
		{
			browser.tabs.move(tab.id, {windowId: tab.windowId, index: tab.index});
			console.log(tab.index);
		}
		console.log(tablist[tablist.length-1].pinned);
	});
}

function openDelayed(methods, method)
{
    setTimeout(function()
    {
        methods.open(method);
    }, 300);
}

function openprivateDelayed(methods, method)
{
    setTimeout(function()
    {
        methods.openprivate(method);
    }, 300);
}

/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
function returnReplaceURL(state, title, url, favIconUrl) {

    let retUrl = "replaced/replaced.html" +
        "?state=" + encodeURIComponent(state) +
        "&title=" + encodeURIComponent(title) +
        "&url=" + encodeURIComponent(url) +
        "&favIconUrl=" + encodeURIComponent(favIconUrl);

    //Reader mode
    if (url.substr(0, 17) == 'about:reader?url=') {
        retUrl = "replaced/replaced.html" +
            "?state=" + encodeURIComponent(state) +
            "&title=" + encodeURIComponent(title) +
            "&url=" + url.substr(17) +
            "&favIconUrl=" + encodeURIComponent(favIconUrl) +
            "&openInReaderMode=true";
    }

    return retUrl;
}

/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
function returnReplaceParameter(url) {
    let parameter = {};
    let paras = url.split('?')[1].split('&');
    for (let p of paras) {
        parameter[p.split('=')[0]] = decodeURIComponent(p.split('=')[1]);
    }
    return parameter;
}

//Возвращает способ открытия вкладок в зависимости от того включена ленивая загрузка или нет
function realURL(tab)
{
	if (Save_opt.LazyLoading)
	{
		
		let a;
		//Вернуть сюда нормальную иконку
		if (Save_opt.ShowFavicon == true)
		{
			a = returnReplaceURL('redirect', tab.title, tab.url, "https://icons.duckduckgo.com/ip3/" + extractHostname(tab.url) + ".ico");
		}
		else
		{
			a = returnReplaceURL('redirect', tab.title, tab.url, "https://static-media-prod-cdn.sumo.mozilla.net/static/sumo/img/favicon-16x16.png");
		}
		
		//a = returnReplaceURL('redirect', tab.title, tab.url, "http://www.google.com/s2/favicons?domain_url=" + extractHostname(tab.url));
		console.log(a);
		return a;
		
	}
	else
	{
		return tab.url;
	}
}

//Возвращает имя домена
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
	console.log(hostname);

    return hostname;
}

// Заменяет заголовок и урл вкладки, если есть проблемы с другими дополнениями ТСМ, Лоад он селект. Возвращает реальный урл при включенной ленивой загрузке
function ITitleUrl(tab)
{
	//var tab1;
	if (tab.url == "about:blank")
	{
		tab.url = "http://" + tab.title;
	}
	if (tab.url.indexOf("/data/suspend/index.html?title") > -1)
	{
		var search = {};
			try {
				search = tab.url
					.substr(1)
					.split('&')
					.map(s => s.split('=')
						.map(s => decodeURIComponent(s)))
					.reduce((p, c) => {
						p[c[0]] = c[1];
						console.log(p);
						return p;
						
					}, {});
			} catch (e) 
			{
				console.log(e);
			}
			tab.title = search.title || tab.title;
			tab.url = search.url || '...';
    }
	if (tab.url.indexOf("/replaced/replaced.html?state=redirect") > -1)
	{
		//console.log(tab.url);
		 let search = {};
			try {
				search = tab.url
					.substr(1)
					.split('&')
					.map(s => s.split('=')
						.map(s => decodeURIComponent(s)))
					.reduce((p, c) => {
						p[c[0]] = c[1];
						//console.log(p);
						return p;
						
					}, {});
			} catch (e) 
			{
				console.log(e);
			}
			//console.log(tab);
			tab.title = search.title || tab.title;
			tab.url = search.url || '...';
			console.log(tab);
			if (tab.url.includes("moz-extension"))
			{
				tab.url = FixBadUrls(tab);
				console.log(tab.url);
			}
    }
	
	//Пробуем вытащить заголовок
	
	
	//=============================
	return tab;
	
}

//Исправляем битые адреса moz-extension
function FixBadUrls(tab)
{
	console.log(tab.url);
	let start;
	let newUrl = tab.url;
	if(tab.url.lastIndexOf("domain_url%3Dhttps%3A//") > 1)
	{
		start = tab.url.lastIndexOf("https%3A//");
		newUrl = "https://" + tab.url.slice(start+10);
		console.log(newUrl);
	}
	else if(tab.url.lastIndexOf("domain_url%3Dhttp%3A//") > 1)
	{
		start = tab.url.lastIndexOf("http%3A//");
		newUrl = "http://" + tab.url.slice(start+9);
		console.log(newUrl);
	}
	return newUrl;
	
}

//Меняем иконку во время открытия сессии
function setIcon(nom, len)
{
	if(nom < len-1)
	{
		let a = len - nom;
		browser.browserAction.setBadgeText({
		text: a.toString(10)
		});
		console.log("Число " + a.toString(10));
	}
	else
	{
		browser.browserAction.setBadgeText({
		text: ""
		});
		console.log("Выход ");
		TabMoveEnd();
	}
}

function InitCrashSession()
{
	return new Promise(function (resolve, reject) 
	{
			//var S = {};
			//Возвращаем ЛС
			try
			{
			browser.storage.local.get(['CrashSession'], function (value) 
			{
				//console.log(settings);
				//if (value.sessions != undefined) S = value.sessions;
				//else S = {};
				CrashSession = value.CrashSession;
				if (CrashSession === undefined) CrashSession = {};
				//console.log(CrashSession);
				resolve();
			});
			}
			catch (e)
			{
				console.log(e);
			}
			
			console.log(Save_opt);
			//resolve();
		
	});
}

//Обновляю список краш сессий
function updateCrashSession()
{
	InitCrashSession().then(function () {
		var files;
   
	console.log(CrashSession.currentSession);
	
    try
    {
		console.log("проверка");
		console.log(CrashSession.prevSession);
        if (CrashSession.currentSession && CrashSession.prevSession && CrashSession.prevSession != CrashSession.currentSession)
        {
			console.log("зашли");
            var param = Save_opt.backupPeriodNumber;
            for (; param >= 0; param--)
            {
                var gdriveLastChangeId = CrashSession["prevSession-" + param];
                console.log(CrashSession.prevSession);
                if (gdriveLastChangeId)
                {
                    CrashSession["prevSession-" + (param + 1)] = gdriveLastChangeId;
                }
            }
            if (CrashSession.prevSession)
            {
                CrashSession["prevSession-0"] = CrashSession.prevSession;
            }
            files = JSON.parse(CrashSession.currentSession);
            CrashSession.prevSession = JSON.stringify(files);
			console.log(CrashSession.prevSession);
        }
		else
		{
			saveBackupSession();
			files = JSON.parse(CrashSession.currentSession);
            CrashSession.prevSession = JSON.stringify(files);
		}
		updateDayCrashSession();
		//ConsCrashSession();
    }
    catch (fmt)
    {
        console.error(fmt);
    }
	});
}

//Собираю объект снимков сессий
async function ConsCrashSession()
{
	InitCrashSession().then(function () {
   
	console.log(CrashSession);
	ListCrashSession = [];
	let data;
	let self;
	
    try
    {
		for(var Crash in CrashSession)
		{
			console.log("Crash");
			console.log(Crash);
			console.log(parseInt(Crash));
			data = JSON.parse(CrashSession[Crash]);
			console.log(data);
			data.title = data.date;
			data.tabsCount = data.tabs.length;
			// var date = new Date;
				// query = date.getMonth() + 1;
				// var url = date.getDate();
				// date = date.getFullYear();
				// query = url + "/" + query + "/" + date;
				if (data.tabs)
				{
					self = new SessionData(data.title, data.date);
					data.tabs.forEach(function(added)
					{
						self.addTab(added);
					});
				}
				else
				{
					self = new SessionData(getMessage("restoreSessionOn"), data.date);
					$.each(data, function(subwin, data)
					{
						data.urls.forEach(function(post)
						{
							self.addTab(
							{
								url: post.url,
								title: post.title,
								win: subwin
							});
						});
					});
				}
				//console.log(data.created);
				self.created = data.created;
				self.tabsCount = data.tabs.length;
			ListCrashSession.push(self);
		}
		console.log(ListCrashSession);
		return ListCrashSession;
    }
    catch (fmt)
    {
        console.error(fmt);
    }
	});
}

//Собираю объект снимков сессий при закрытии окна
async function ConsCloseWindowSessions()
{
	//InitCloseWindowSessions().then(function () {
   
	console.log(CloseWindowSessions);
	ListCloseWindowSessions = [];
	let data;
	let self;
	
    try
    {
		for(var CloseWindow in CloseWindowSessions)
		{
			console.log("CloseWindow");
			console.log(CloseWindow);
			data = JSON.parse(CloseWindowSessions[CloseWindow]);
			//console.log(data);
			data.title = data.date;
			data.tabsCount = data.tabs.length;
			// var date = new Date;
				// query = date.getMonth() + 1;
				// var url = date.getDate();
				// date = date.getFullYear();
				// query = url + "/" + query + "/" + date;
				if (data.tabs)
				{
					self = new SessionData(data.title, data.date);
					data.tabs.forEach(function(added)
					{
						self.addTab(added);
					});
				}
				else
				{
					self = new SessionData(getMessage("restoreSessionOn"), data.date);
					$.each(data, function(subwin, data)
					{
						data.urls.forEach(function(post)
						{
							self.addTab(
							{
								url: post.url,
								title: post.title,
								win: subwin
							});
						});
					});
				}
				//console.log(data.created);
				self.created = data.created;
				self.tabsCount = data.tabs.length;
			ListCloseWindowSessions.push(self);
		}
		console.log(ListCloseWindowSessions);
		return ListCloseWindowSessions;
    }
    catch (fmt)
    {
        console.error(fmt);
    }
	//});
}

function InitDayCrashSession()
{
	return new Promise(function (resolve, reject) 
	{
			//var S = {};
			//Возвращаем ЛС
			try
			{
			browser.storage.local.get(['DayCrashSession'], function (value) 
			{
				//console.log(settings);
				//if (value.sessions != undefined) S = value.sessions;
				//else S = {};
				DayCrashSession = value.DayCrashSession;
				if (DayCrashSession === undefined) DayCrashSession = {};
				console.log(DayCrashSession);
				resolve();
			});
			}
			catch (e)
			{
				console.log(e);
			}
			
			console.log(Save_opt);
			//resolve();
		
	});
}

//Инициация сессий при закрытии окна
function InitCloseWindowSessions()
{
	return new Promise(function (resolve, reject) 
	{
			//var S = {};
			//Возвращаем ЛС
			try
			{
			browser.storage.local.get(['CloseWindowSessions'], function (value) 
			{
				//console.log(settings);
				//if (value.sessions != undefined) S = value.sessions;
				//else S = {};
				CloseWindowSessions = value.CloseWindowSessions;
				if (CloseWindowSessions === undefined) CloseWindowSessions = [];
				console.log(CloseWindowSessions);
				resolve();
			});
			}
			catch (e)
			{
				console.log(e);
			}
			
			//console.log(S);
			//resolve();
		
	});
}

function SaveCloseWindowSessions()
{
	return new Promise(function (resolve, reject) 
	{
			//var S = {};
			//Возвращаем ЛС
			try
			{
				CloseWindowSessions.unshift(CloseWindowTemp);//Добавляем элемент в начало массива
			browser.storage.local.set(
			{
				'CloseWindowSessions':CloseWindowSessions
				
				
			});
			console.log(CloseWindowTemp);
			resolve();
			}
			catch (e)
			{
				console.log(e);
			}
			
			//console.log(S);
			//resolve();
		
	});
}

//Обновляю список ежедневных краш сессий
function updateDayCrashSession()
{
	//Временная заплатка
	//DayCrashSession.currentSession = CrashSession.prevSession;
	// InitDayCrashSession().then(function () {
   
	// console.log(DayCrashSession.currentSession);
	
	if (DayCrashSession.currentSession && CrashSession.currentSession)
	{
		if (CrashSession.prevSession && CrashSession["prevSession-0"])
		{
			let files;
			let PS = JSON.parse(CrashSession.prevSession);
			let PSDate = new Date(PS.created);
			PSDate = PSDate.getDate();
			console.log(PSDate);
			let PS0 = JSON.parse(CrashSession["prevSession-0"]);
			let PS0Date = new Date(PS0.created);
			PS0Date = PS0Date.getDate();
			console.log(PS0Date);
			if (PSDate != PS0Date)
			{
				if (!DayCrashSession.prevSession)
				{
					files = JSON.parse(CrashSession["prevSession-0"]);
					DayCrashSession.prevSession = JSON.stringify(files);
					DayCrashSession.currentSession = CrashSession.currentSession;
					console.log(DayCrashSession.prevSession);
					console.log(DayCrashSession.currentSession);
					
					browser.storage.local.set(
					{
					'DayCrashSession':DayCrashSession
					});
				}
				else if(DayCrashSession.prevSession != CrashSession["prevSession-0"])
				{
					console.log("зашли");
					var param = Save_opt.backupPeriodNumber;
					for (; param >= 0; param--)
					{
						var gdriveLastChangeId = DayCrashSession["prevSession-" + param];
						console.log(DayCrashSession.prevSession);
						if (gdriveLastChangeId)
						{
							DayCrashSession["prevSession-" + (param + 1)] = gdriveLastChangeId;
						}
					}
					if (DayCrashSession.prevSession)
					{
						DayCrashSession["prevSession-0"] = DayCrashSession.prevSession;
					}
					files = JSON.parse(CrashSession["prevSession-0"]);
					DayCrashSession.prevSession = JSON.stringify(files);
					DayCrashSession.currentSession = CrashSession.currentSession;
					console.log(DayCrashSession.prevSession);
					console.log(DayCrashSession.currentSession);
					
					browser.storage.local.set(
					{
					'DayCrashSession':DayCrashSession
					});
				}
			}
			else
			{
				DayCrashSession.currentSession = CrashSession.currentSession;
				//verifiDayCrashSession();
			}
		}
	}
	else
	{
		DayCrashSession.currentSession = CrashSession.currentSession;
		console.log(DayCrashSession.currentSession);
	}
	//});
}

function gotBrowserInfo(info) {
  
  BrowserVersion = info.version.split(".")[0];
  console.log(BrowserVersion);
}

function init()
{
	
	var gettingInfo = browser.runtime.getBrowserInfo();
	gettingInfo.then(gotBrowserInfo);
	
	setSetting();
	//Инициируем список сессий
	initSessionList();//Инициируем список сессий и сохраняем бэкап в файл
	SaveTemp();//Записываем текущую сессию в темп
	
	
	saveBackupSessionFile();//Сохраняем бэкап сессий в файл
	
	InitDayCrashSession();
	updateCrashSession();
    //changeBackupSetting();
	console.log(Save_opt);
    
	
	InitCloseWindowSessions().then(ClearCloseWindowSessions);
	ConsCrashSession();
	
	//createSessionSaveList().then(saveFull);
	
	// initSession( function( dataAndEvents )
    // {
		// console.log("Список");
        // sessions = dataAndEvents;
		// console.log(sessions);
		
       
    // } );



}

function ClearCloseWindowSessions()//Удаляем лишние сессии при закрытии окна
{
	console.log("S.CloseWindowNumber");
	console.log(Save_opt.CloseWindowNumber);
	console.log(CloseWindowSessions.length);
	if (CloseWindowSessions.length > Save_opt.CloseWindowNumber)
			{
				// let i = 1;
				// for (;i < (CloseWindowSessions.length-S.AutoSaveNumber+2); i++)
				// {
					// browser.bookmarks.removeTree(del[del.length-i]);
				// }
				CloseWindowSessions.length = Save_opt.CloseWindowNumber;//Укорачиваем массив с конца (элементы добавляются в начало)
			}
	console.log(CloseWindowSessions);
	ConsCloseWindowSessions();
}

function setSetting()
{
InitSettings().then(function () {
    changeBackupSetting();
	console.log(Save_opt);
	//saveBackupSessionFile();//Сохраняем бэкап сессий в файл
	
	 if (Save_opt.ShowFaviconTab != true && ShowFav == 0)
		 {
			browser.tabs.create({
				url: "opt-in.html"
				
			});
			ShowFav = 1;
		 }
	
});
}

//Инициирует список сессий
async function initSessionList()
{
	await initSession( function( dataAndEvents )
    {
		console.log("Список");
        sessions = dataAndEvents;
		console.log(sessions);
		//Сохраяем бекап в файл
		//createSessionSaveList();
    } );
	
}


//Передает список сессий в попап
function returnSessions()
{
	console.log(sessions);
	return sessions;
}

//возвращает список сессий из попап
function popupSessions(data)
{
	console.log(data);
	sessions = data;
}

//Передает список сессий в попап
function returnCrashSessions()
{
	console.log(ListCrashSession);
	return ListCrashSession;
}//ListCloseWindowSessions

//Передает список сессий в попап
function returnCloseWindowSessions()
{
	console.log(ListCloseWindowSessions);
	return ListCloseWindowSessions;
}//

//Передает список параметров в попап
function returnSettings()
{
	return Save_opt;
}

//Передает список краш сессий в краш рековери
function returnCrashSession()
{
	return CrashSession;
}

//Передает список ежедневных сессий в краш рековери
function returnDayCrashSession()
{
	return DayCrashSession;
}

//Передает список сессий при закрытии окна
function returnCloseWindowSession()
{
	return CloseWindowSessions;
}

function SetDef()
{
	var S = {};
	S.backupPeriod = 5;
	S.AutoSavePeriod = 300;
	S.AutoSaveNumber = 10;
	S.backupPeriodNumber = 50;
	S.crashRestore = true;
	S.ShowAutoSave = true;
	S.ShowFavicon = false;
	S.ShowFaviconTab = false;
	S.ShowPopap = true;
	S.EnablecolorIcon = false;
	S.colorIcon = "#000000";
	S.ListURL = false;
	S.SortTitle = false;
	S.ShowPrivate = false;
	S.ShowHidden = false;
	S.MarkAll = true;
	S.LazyLoading = true;
	S.Discarded = false;
	S.DisableConfirmation = false;
	S.DisableConfirma = false;
	S.AutoSave = false;
	S.CloseWindow = true;
	S.SaveFile = false;
	S.SaveFileName = "MySessions";
	S.SessionList = "_displayAll";
	S.dateFormat = "1";
	S.editOrder = true;
	S.Prefix = false;
	S.Title = false;
	S.Date1 = true;
	S.Time = false;
	S.Suffix = false;
	S.DarkTheme = true;
	S.Stringprefix = " ";
	S.Stringsuffix = " ";
	console.log(S);
		browser.storage.local.set(
		{
		'settings':S
		});
	return S;
}

function InitSettings()
{
	return new Promise(function (resolve, reject) 
	{
			//var S = {};
			//Возвращаем ЛС
			try
			{
			browser.storage.local.get(['settings'], function (value) 
			{
				console.log(value);
				
				//if (value.sessions != undefined) S = value.sessions;
				//else S = {};
				Save_opt = value.settings;
				console.log(value.settings);
				if (Save_opt == undefined) Save_opt = SetDef();
				console.log(Save_opt);
				resolve();
			});
			}
			catch (e)
			{
				console.log(e);
			}
			
			console.log(Save_opt);
			//resolve();
		
	});
}


var backupTimerId;
var AutoSaveTimerId;
var CloseWindowTimerId;

function rgb2hex(rgb) {
 var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hexToRGB(hex) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    console.log(r+g+b);
        return [r,g,b];
    
}

function changeBackupSetting()
{
	
	//InitSettings(S);
	console.log(Save_opt);
	console.log("S.crashRestore",Save_opt.crashRestore);
    if (Save_opt.crashRestore == undefined)
    {
        Save_opt.crashRestore = true;
    }
	if (Save_opt.ShowFavicon == undefined)
    {
        Save_opt.ShowFavicon = false;
    }
	if (Save_opt.ShowFaviconTab == undefined)
    {
        Save_opt.ShowFaviconTab = false;
    }
	if (Save_opt.ShowAutoSave == undefined)
    {
        Save_opt.ShowAutoSave = true;
    }
	if (Save_opt.ShowPrivate == undefined)
    {
        Save_opt.ShowPrivate = false;
    }
	if (Save_opt.ShowHidden == undefined)
    {
        Save_opt.ShowHidden = false;
    }
	if (Save_opt.MarkAll == undefined)
    {
        Save_opt.MarkAll = true;
    }
	if (Save_opt.LazyLoading == undefined)
    {
        Save_opt.LazyLoading = true;
		console.log("S.LazyLoading", Save_opt.LazyLoading);
    }
	if (Save_opt.Discarded == undefined)
    {
        Save_opt.Discarded = false;
		console.log("S.Discarded", Save_opt.Discarded);
    }
	if (Save_opt.ShowPopap == undefined)
    {
        Save_opt.ShowPopap = true;
    }
	//=====================================
	if (Save_opt.Prefix == undefined)
    {
        Save_opt.Prefix = false;
    }
	if (Save_opt.Title == undefined)
    {
        Save_opt.Title = false;
    }
	if (Save_opt.Date1 == undefined)
    {
        Save_opt.Date1 = true;
    }
	if (Save_opt.Time == undefined)
    {
        Save_opt.Time = false;
    }
	if (Save_opt.Suffix == undefined)
    {
        Save_opt.Suffix = false;
    }
	if (Save_opt.DarkTheme == undefined)
    {
        Save_opt.DarkTheme = true;
    }
	if (Save_opt.Stringprefix == undefined)
    {
        Save_opt.Stringprefix = " ";
    }
	if (Save_opt.Stringsuffix == undefined)
    {
        Save_opt.Stringsuffix = " ";
    }
	
	//====================================
	if (Save_opt.EnablecolorIcon == undefined)
    {
        Save_opt.EnablecolorIcon = false;
    }
	if (Save_opt.EnablecolorIcon == true)
    {
        var uniqueColor = rgb2hex(Save_opt.colorIcon);
			uniqueColor = hexToRGB(uniqueColor);
		console.log(Save_opt.colorIcon);

		
		var pixelData = [ 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 52, 0, 0, 0, 100, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 101, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 158, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 252, 0, 0, 0, 174, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 154, 0, 0, 0, 148, 0, 0, 0, 148, 0, 0, 0, 153, 0, 0, 0, 159, 0, 0, 0, 162, 0, 0, 0, 240, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 183, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 98, 0, 0, 0, 95, 0, 0, 0, 45, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 174, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 251, 0, 0, 0, 251, 0, 0, 0, 249, 0, 0, 0, 6, 0, 0, 0, 5, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 187, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 186, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 170, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 176, 0, 0, 0, 10, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 96, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 9, 0, 0, 0, 4, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 104, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 223, 0, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 0, 0, 0, 174, 0, 0, 0, 173, 0, 0, 0, 131, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 195, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 142, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 240, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 237, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 234, 0, 0, 0, 250, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 239, 0, 0, 0, 61, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 62, 0, 0, 0, 239, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 213, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 213, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 215, 0, 0, 0, 38, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 38, 0, 0, 0, 215, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 227, 0, 0, 0, 105, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 105, 0, 0, 0, 227, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 34, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 34, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 218, 0, 0, 0, 55, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 55, 0, 0, 0, 218, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 222, 0, 0, 0, 78, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 78, 0, 0, 0, 222, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 34, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 34, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 99, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 99, 0, 0, 0, 51, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 50, 0, 0, 0, 12, 0, 0, 0, 157, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 252, 0, 0, 0, 175, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 175, 0, 0, 0, 252, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 156, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 52, 0, 0, 0, 99, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 99, 0, 0, 0, 52, 0, 0, 0, 12, 0, 0, 0, 0 ]
		
		var pix = Uint8ClampedArray.from(pixelData);

		for (var i = 0, n = pix.length; i <n; i += 4) {
			  pix[i] = uniqueColor[0];   // Red component
			  pix[i+1] = uniqueColor[1]; // Blue component
			  pix[i+2] = uniqueColor[2]; // Green component
			  /////pix[i+3] is the transparency.
			  console.log(uniqueColor[0]);
		}

		
		var imgd = new ImageData(pix, 38, 38);

			browser.browserAction.setIcon({imageData: imgd});
		
    }
	if (Save_opt.ListURL == undefined)
    {
        Save_opt.ListURL = false;
    }
	if (Save_opt.SortTitle == undefined)
    {
        Save_opt.SortTitle = false;
    }
	if (Save_opt.CloseWindow == undefined)
    {
        Save_opt.CloseWindow = true;
    }
	if (Save_opt.SaveFile == undefined)
	{
		Save_opt.SaveFile = false;
	}
	if (Save_opt.SaveFileName == undefined)
	{
		Save_opt.SaveFileName = "MySessions";
	}
	if (Save_opt.SessionList == undefined)
	{
		Save_opt.SessionList = "_displayAll";
	}
    if (Save_opt.crashRestore == true)
    {
        window.clearInterval(backupTimerId);
        var secs = parseInt(Save_opt.backupPeriod);
        if (isNaN(secs) || (secs < 1 || secs > 1E3))
        {
            secs = 5;
        }
        backupTimerId = window.setInterval(saveBackupSession, 6E4 * secs);
		if (Save_opt.backupPeriodNumber == undefined)
		{
			Save_opt.backupPeriodNumber = 50;
		}
    }
    else
    {
		console.log("S.crashRestore",Save_opt.crashRestore);
        try
        {
            delete CrashSession.currentSession;
            window.clearInterval(backupTimerId);
        }
        catch (fmt)
        {
            console.error(fmt);
        }
    }
	if (Save_opt.AutoSave == true)
    {
		console.log("S.AutoSave", Save_opt.AutoSave, Save_opt.AutoSavePeriod);
        window.clearInterval(AutoSaveTimerId);
        var secs1 = parseInt(Save_opt.AutoSavePeriod);
        if (isNaN(secs1) || (secs1 < 1 || secs1 > 1E3))
        {
            secs1 = 300;
        }
    	//AutoSaveTimerId = window.setInterval(asave, 6E4 * secs1);
    }
    else
    {
		console.log("S.AutoSave",Save_opt.AutoSave);
        try
        {
            //delete localStorage.currentSession;
            window.clearInterval(AutoSaveTimerId);
        }
        catch (fmt)
        {
            console.error(fmt);
        }
    }
	if (Save_opt.CloseWindow == true)
    {
		let secs1;
		console.log("S.CloseWindow", Save_opt.CloseWindow, Save_opt.CloseWindowNumber);
        window.clearInterval(CloseWindowTimerId);
        //var secs1 = parseInt(S.CloseWindowNumber);
        if (isNaN(secs1) || (secs1 < 1 || secs1 > 1E3))
        {
            secs1 = 15000;
        }
        CloseWindowTimerId = window.setInterval(SaveTemp, 30000);
    }
    else
    {
		console.log("S.CloseWindow",Save_opt.CloseWindow);
        try
        {
            //delete localStorage.currentSession;
            window.clearInterval(CloseWindowTimerId);
        }
        catch (fmt)
        {
            console.error(fmt);
        }
    }
	// browser.storage.local.set(
		// {
		// 'settings':S
		// });
}


async function initSession(next)
{
    getSessionFolder(function(rootElement)
    {
        browser.bookmarks.getChildren(rootElement, function(tabs)
        {
            var responseObject = [];
            var i = 0;
			console.log(tabs.length);
            for (; i < tabs.length; i++)
            {
				//Индикация предварительной загрузки данных
				setIcon(i, tabs.length);
                var tags = tabs[i].title.match(/^(.*)\((\d+\/\d+\/\d+\_\d+\:\d+)\)--(\d+)tabs$/i);
				if (tags == null)
				{
					tags = tabs[i].title.match(/^(.*)\((\d+\/\d+\/\d+)\)--(\d+)tabs$/i );
				}
				//console.log(tabs[i].title);
				//console.log(tags);
                if (tabs[i].url != null)
                {
                    console.log("Error: Not a sessions folder:" + tabs[i].title);
					console.log(tabs[i].id);
					browser.bookmarks.remove(tabs[i].id);
                }
                else
                {
                    try
                    {
                        sessionData = new SessionData(tags[1].trim(), tags[2], tags[3], tabs[i].id);
                        responseObject.push(sessionData);
                    }
                    catch (l)
                    {
                        console.log("Error: wrong session format:" + tabs[i].title);
                    }
                }
            }
			console.log("Инит Сесс");
            next(responseObject);
        });
    });
}

function bookmarkPositionWorkaround()
{
    setTimeout(function()
    {
        var otherBookmarksID = 0;
			chrome.bookmarks.getTree(function(tree){
			otherBookmarksID = tree[0].children[2].id;
			console.log(tree);
		}); 
		browser.bookmarks.getChildren('unfiled_____', function(fmt)
        {
            console.log(fmt);
            browser.bookmarks.create(
            {
                parentId: fmt[0].id,
                url: "http://www.example.com"
            }, function(cmp)
            {
                console.log("Reposition default folder");
                browser.bookmarks.remove(cmp.id);
				console.log(cmp.id);
            });
        });
    }, 2E3);
}

function updateSession(data, cb)
{
    browser.bookmarks.getChildren(data.folderId, function(employees)
    {
        browser.bookmarks.update(data.folderId,
        {
            title: data.title + " (" + data.date + ")--" + data.urls.length + "tabs"
        });
        var i = 0;
        for (; i < employees.length; ++i)
        {
            browser.bookmarks.remove(employees[i].id);
        }
        i = 0;
        for (; i < data.urls.length; ++i)
        {
            browser.bookmarks.create(
            {
                parentId: data.folderId,
                title: data.urls[i].title,
                url: data.urls[i].url
            });
        }
        cb();
    });
}

function getSessionFolder($sanitize)
{
    var modId;
    var id;
	console.log(sessionFolderId);
	if (sessionFolderId != undefined)
	{
		console.log(sessionFolderId);
		modId = sessionFolderId;
		$sanitize(modId);
	}
	else
	{
        browser.bookmarks.getChildren('unfiled_____', function(todos)
        {
            var i = 0;
            for (; i < todos.length; i++)
            {
				console.log(modId,i,todos[i].title);
                if (todos[i].title == "MySessions")
                {
                    modId = todos[i].id;
					console.log(modId,i,todos[i].title);
                    break;
                }
            }
            if (modId == null)
            {
				console.log("Создали папку Сессии");
                browser.bookmarks.create(
                {
                    parentId: id,
                    title: "MySessions"
                }, function(map)
                {
                    modId = map.id;
					sessionFolderId = modId;
                    $sanitize(modId);
                });
            }
            else
            {
				sessionFolderId = modId;
                $sanitize(modId);
            }
        });
	}

}

function saveBackupSession()
{
	console.log("Сохраняем бэк");
	console.log(Save_opt);
	var now = new Date();
			now = now.getMinutes();
            //now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			
			if (now < 10)
			{
				now = new Date();
				now = now.getDate() + "/" + (now.getMonth() + 1) + "/" + (now.getYear() + 1900)+"_"+now.getHours()+":" + "0" +now.getMinutes();
			}
			else
			{
				now = new Date();
				now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			}
    var model = new SessionData("currentSession", now);
    browser.windows.getAll(
    {
        populate: true
    }, function(failures)
    {
        failures.forEach(function(win)
        {
            win.tabs.forEach(function(tab)
            {
				//console.log(tab);
				if (Save_opt.ShowHidden == true || !tab.hidden)
				{
					model.addTab(
					{
						url: tab.url,
						title: tab.title,
						win: win.id,
						pinned: tab.pinned
					});
				}
				else
				{
					if(tab.hidden == false || !tab.hidden)
					{
						model.addTab(
						{
							url: tab.url,
							title: tab.title,
							win: win.id,
							pinned: tab.pinned
						});
					}
				}
            });
        });
        if (model.getCount() > 0)
        {
            CrashSession.currentSession = model.toJson();
			browser.storage.local.set(
			{
			'CrashSession':CrashSession
			});
			try
			{
			let cS = JSON.parse(CrashSession.currentSession);
			let pS = JSON.parse(CrashSession.prevSession);
			if (JSON.stringify(pS.tabs) != JSON.stringify(cS.tabs))
			{
				console.log(JSON.stringify(pS.tabs));
				console.log(JSON.stringify(cS.tabs));
				console.log("СЕССИЯ ИЗМЕНИЛАСЬ!!!");
				updateCrashSession();
			}
			else
			{
				console.log("СЕССИЯ НЕ ИЗМЕНИЛАСЬ!!!");
				updateDayCrashSession();
				ConsCrashSession();
			}
			}
			catch (fmt)
			{
				updateCrashSession();
				console.error(fmt);
			}
			//console.log(CrashSession);
        }
    });
	//InitCrashSession();
	//changeBackupSetting();
}

function SaveTemp()
{
	console.log("Сохраняем темп сессию");
	//console.log(S);
	var now = new Date();
			now = now.getMinutes();
            //now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			
			if (now < 10)
			{
				now = new Date();
				now = now.getDate() + "/" + (now.getMonth() + 1) + "/" + (now.getYear() + 1900)+"_"+now.getHours()+":" + "0" +now.getMinutes();
			}
			else
			{
				now = new Date();
				now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			}
    var model = new SessionData("tempSession", now);
    browser.windows.getAll(
    {
        populate: true
    }, function(failures)
    {
        failures.forEach(function(win)
        {
            win.tabs.forEach(function(tab)
            {
				if (Save_opt.ShowHidden == true || !tab.hidden)
				{
					model.addTab(
					{
						url: tab.url,
						title: tab.title,
						win: win.id,
						pinned: tab.pinned
					});
				}
				else
				{
					if(tab.hidden == false || !tab.hidden)
					{
						model.addTab(
						{
							url: tab.url,
							title: tab.title,
							win: win.id,
							pinned: tab.pinned
						});
					}
				}
            });
        });
        if (model.getCount() > 0)
        {
            CloseWindowTemp = model.toJson();
			console.log("CloseWindowTemp");
			//console.log(CloseWindowTemp);
			//console.log(CloseWindowSessions);
        }
    });
	//InitCrashSession();
	//changeBackupSetting();
}

function listSession()
{
	var modId;
    var id;
	if (sessionFolderId != undefined)
	{
		console.log(sessionFolderId);
		modId = sessionFolderId;
		browser.bookmarks.getChildren(modId, function(tabs)
        {
            var responseObject = [];
			var del = [];
            var i = 0;
            for (; i < tabs.length; i++)
            {
                //var tags = tabs[i].title.match(/^(.*)\((\d+\/\d+\/\d+)\)--(\d+)tabs$/i);
				var tags = tabs[i].title.match(/^(.*)\((\d+\/\d+\/\d+\_\d+\:\d+)\)--(\d+)tabs$/i);
				if (tags == null)
				{
					tags = tabs[i].title.match(/^(.*)\((\d+\/\d+\/\d+)\)--(\d+)tabs$/i );
				}
                if (tabs[i].url != null)
                {
                    console.log("Error: Not a sessions folder:" + tabs[i].title);
                }
                else
                {
                    try
                    {
                        sessionData = new SessionData(tags[1].trim(), tags[2], tags[3], tabs[i].id);
                        responseObject.push(sessionData);
						if (~tags[1].indexOf("AutoSave_"))
						{
							del.push(tabs[i].id);
						}
                    }
                    catch (l)
                    {
                        console.log("Error: wrong session format:" + tabs[i].title);
                    }
                }
            }
			console.log(responseObject);
			console.log(del[1]);
			console.log(del.length);
			console.log(Save_opt.AutoSaveNumber);
			if (del.length > Save_opt.AutoSaveNumber)
			{
				i = 1;
				for (;i < (del.length-Save_opt.AutoSaveNumber+2); i++)
				{
					browser.bookmarks.removeTree(del[del.length-i]);
				}
			}
        });
	}
	else
	{
        browser.bookmarks.getChildren('unfiled_____', function(todos)
        {
            var i = 0;
            for (; i < todos.length; i++)
            {
				console.log(modId,i,todos[i].title);
                if (todos[i].title == "MySessions")
                {
                    modId = todos[i].id;
					console.log(modId,i,todos[i].title);
                    break;
                }
            }
			console.log(modId);
        browser.bookmarks.getChildren(modId, function(tabs)
        {
            var responseObject = [];
			var del = [];
            var i = 0;
            for (; i < tabs.length; i++)
            {
                //var tags = tabs[i].title.match(/^(.*)\((\d+\/\d+\/\d+)\)--(\d+)tabs$/i);
				var tags = tabs[i].title.match(/^(.*)\((\d+\/\d+\/\d+\_\d+\:\d+)\)--(\d+)tabs$/i);
				if (tags == null)
				{
					tags = tabs[i].title.match(/^(.*)\((\d+\/\d+\/\d+)\)--(\d+)tabs$/i );
				}
                if (tabs[i].url != null)
                {
                    console.log("Error: Not a sessions folder:" + tabs[i].title);
                }
                else
                {
                    try
                    {
                        sessionData = new SessionData(tags[1].trim(), tags[2], tags[3], tabs[i].id);
                        responseObject.push(sessionData);
						if (~tags[1].indexOf("AutoSave_"))
						{
							del.push(tabs[i].id);
						}
                    }
                    catch (l)
                    {
                        console.log("Error: wrong session format:" + tabs[i].title);
                    }
                }
            }
			console.log(responseObject);
			console.log(del[1]);
			console.log(del.length);
			console.log(Save_opt.AutoSaveNumber);
			if (del.length > Save_opt.AutoSaveNumber)
			{
				i = 1;
				for (;i < (del.length-Save_opt.AutoSaveNumber+2); i++)
				{
					browser.bookmarks.removeTree(del[del.length-i]);
				}
			}
        });
		});
    }
	//getSessionFolder(function(rootElement)
    //{
		
    //});
	
    //return responseObject;
}

function fsave()
{
	qsave("Quick save");
	
}
//Автосохранение
function asave()
{
	var sessions = [];
	var now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();
	if(hours < 10)
	{
		hours = "0" + hours;
	}
	if(minutes < 10)
	{
		minutes = "0" + minutes;
	}
    now = hours + ":" +  minutes;
	qsave("AutoSave"+"_"+now);
	
	listSession();

	
}


function qsave(name)
{
    
        //var name = name;
        //localStorage.lastUsedSessionName = name;
        browser.windows.getAll(
        {
            populate: true
        }, function( failures )
        {
			console.log(failures);
            var now = new Date();
			now = now.getMinutes();
            //now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			
			if (now < 10)
			{
				now = new Date();
				now = now.getDate() + "/" + (now.getMonth() + 1) + "/" + (now.getYear() + 1900)+"_"+now.getHours()+":" + "0" +now.getMinutes();
			}
			else
			{
				now = new Date();
				now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			}
            var that = new SessionData( name, now );
            failures.forEach( function( win )
            {
                win.tabs.forEach( function( tab )
                {

                    if (Save_opt.ShowHidden == true || !tab.hidden)
						{
							that.addTab(
							{
								url: tab.url,
								title: tab.title,
								win: win.id,
								pinned: tab.pinned
							});
						}
						else
						{
							if(tab.hidden == false || !tab.hidden)
							{
								that.addTab(
								{
									url: tab.url,
									title: tab.title,
									win: win.id,
									pinned: tab.pinned
								});
							}
						}
                } );
            } );
			console.log(that);
            if ( that.getCount() == 0 )
            {
                alert( getMessage( "emptySession" ) );
            }
            else
            {
                if ( that.getCount() > 0 )
                {
                    that.save( function( dataAndEvents )
                    {
						console.log(dataAndEvents);
                        if ( !dataAndEvents )
                        {
                            alert( getMessage( "saveFail" ) );
                        }
                    } );
                }
            }
            
        } );
		
    
}


// function CloseTab()
// {
	// console.log(localStorage.tab0);
	// setTimeout(browser.tabs.remove(parseInt(localStorage.tab0, 10)), 5000);
// }

//Убрал иконку из адресной строки
/* function initializePageAction(tab) {

    browser.pageAction.setIcon({tabId: tab.id, path: "img/icon16.png"});
    browser.pageAction.setTitle({tabId: tab.id, title: "MySessions"});
    browser.pageAction.show(tab.id);

}
 */

/* var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
}); */

browser.tabs.onActivated.addListener(function(tabid) {
	console.log(tabid);
	replacePage();
	async function replacePage() {
    // if (IsOpeningSession) return;

    const info = await browser.tabs.query({
        active: true,
        currentWindow: true
    });
	console.log(info);
    // if (info[0] == undefined) return;

    // if (info[0].status != "complete") {
        // setTimeout(replacePage, 500);
        // return;
    // }
	
	if (info[0].url.indexOf("replaced/replaced.html") > 0)
	{
		const parameter = returnReplaceParameter(info[0].url);
		console.log(parameter);
		let updateProperties = {};
        updateProperties.url = parameter.url;
        updateProperties.loadReplace = true;

        browser.tabs.update(info[0].id, updateProperties);
	}
	
	if (info[0].title.indexOf("replaced/replaced.html") > 0)
	{
		const parameter = returnReplaceParameter(info[0].title);
		console.log(parameter);
		let updateProperties = {};
        updateProperties.url = parameter.url;
        updateProperties.loadReplace = true;

        browser.tabs.update(info[0].id, updateProperties);
	}
	console.log(browser.tabs.onUpdated.hasListener(UpdateTab));
	if (browser.tabs.onUpdated.hasListener(UpdateTab) == false)
	{
		browser.tabs.onUpdated.addListener(UpdateTab);
	}

   
}

});
//Преобразование адреса и перезагрузка вкладки
function UpdateTab(tabid)
{
	replacePage();
	async function replacePage() {
  

    const info = await browser.tabs.query({
        active: true,
        currentWindow: true
    });
	
	//console.log(info);
  
	
		if (info[0].url.indexOf("replaced/replaced.html") > 0)
		{
			browser.tabs.onUpdated.removeListener(UpdateTab);
			const parameter = returnReplaceParameter(info[0].url);
			console.log(parameter);
			let updateProperties = {};
			updateProperties.url = parameter.url;
			updateProperties.loadReplace = true;

			browser.tabs.update(info[0].id, updateProperties);
		}
		
		if (info[0].title.indexOf("replaced/replaced.html") > 0)
		{
			browser.tabs.onUpdated.removeListener(UpdateTab);
			const parameter = returnReplaceParameter(info[0].title);
			console.log(parameter);
			let updateProperties = {};
			updateProperties.url = parameter.url;
			updateProperties.loadReplace = true;

			browser.tabs.update(info[0].id, updateProperties);
		}	
	}
}
	
	



browser.tabs.onUpdated.addListener(UpdateTab);

//Реакция на нажатие иконки расширения
browser.browserAction.onClicked.addListener((tab, OnClickData) => {
  // disable the active tab
  console.log(tab);
  console.log(browser.browserAction.getTitle({}));
  // requires the "tabs" or "activeTab" permission
  console.log(OnClickData.button);
  if (OnClickData.button == 1)
  {
	  browser.tabs.create(
		{
		
		url: "popup.html",
		
		});
  }
  
});

//browser.bookmarks.onChanged.addListener(initSessionList);
//browser.bookmarks.onCreated.addListener(initSessionList);
//browser.bookmarks.onRemoved.addListener(initSessionList)

//browser.pageAction.onClicked.addListener(fsave);
/* browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
}); */

//Сохраняем сессию при закрытии окна в локальное хранилище
browser.windows.onRemoved.addListener((windowId) => {
	console.log(CloseWindowTemp);
	if (Save_opt.CloseWindow)
	{
		SaveCloseWindowSessions().then(console.log("Записали сессию при закрытии"));
	}
	ClearCloseWindowSessions();
  console.log("Closed window: " + windowId);
});

//=================================================================================
//Сохранение сессий в файл


async function saveBackupSessionFile()
{
	InitSettings().then(async function () {
    changeBackupSetting();
	console.log(Save_opt);
	//saveBackupSessionFile();//Сохраняем бэкап сессий в файл
	if (Save_opt.SaveFile)
	{
	await initSession( function( dataAndEvents )
    {
		console.log("Список");
        sessions = dataAndEvents;
		console.log(sessions);
		//Сохраяем бекап в файл
		createSessionSaveList();
    } );
	}
	});
	
}

//Формирую список всех сессий
async function createSessionSaveList()
{
	sessionsSave = [];
	let j = 0;
	console.log("sessions");
	console.log(sessions);
	
		for(const session of sessions)
		{
			await loadSessionFromId( session.folderId, function( d )
				{
					
					//console.log(d);
					//console.log(j);
					
					//console.log(d.toJson());
					//sessionsSave.push(d);
					sessionsSave[j] = d;
					j++;
					//Индикация предварительной загрузки
					setIcon(j, sessions.length);
					if (j == sessions.length)
					{
						saveFull();
					}
				} );
			console.log(sessionsSave);
			
		}
	
        // for ( let i = 0; i < sessions.length; i++ )
		// {
			
					
			// loadSessionFromId( sessions[i].folderId, function( d )
				// {
					// j++;
					// console.log(d);
					// console.log(j);
					
					
					// sessionsSave[i] = d;
				// } );		
					
				
			
						
		// }
		console.log(sessionsSave);
}

//Функция сохранения всех сессий
async function saveFull()
{
	const permissionsToRequest = {
	  permissions: ["downloads"]
	};
	browser.permissions.contains(permissionsToRequest).then((result) => {
	  console.log("Разрешение на загрузку" + result);
	  console.log("Сохранять бэкап в файл" + Save_opt.SaveFile);
	  if (result == false && Save_opt.SaveFile == true)
	  {
		browser.tabs.create(
		{
			active: true,
			url: "options.html"
		});// 
	  }
	});
	const downloadUrl = URL.createObjectURL(
			new Blob([JSON.stringify(sessionsSave, null, "    ")], {
			  type: "aplication/json"
			})
		  );
		  console.log(downloadUrl);

		  const folderName = returnBackupFolderName(Save_opt.SaveFileName);
		  const fileName = returnFileName(sessions);
			
		
				await browser.downloads
				.download({
				  url: downloadUrl,
				  filename: `${folderName}${folderName == "" ? "" : "/"}${fileName}.mysessions`,
				  conflictAction: "uniquify",
				  saveAs: false
				})
				.catch(() => {});
		
}

/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
//Возвращаю имя папки для сохранения
function returnBackupFolderName(folderName) {
  
  const specialChars = /\:|\?|\.|"|<|>|\|/g; //
  const slash = /\//g; //
  const spaces = /\s\s+/g; //
  const backSlashs = /\\\\+/g; //
  const sandwich = /(\s\\|\\\s)+(\s|\\)?/g; //
  const beginningEnd = /^(\s|\\)+|(\s|\\)+$/g; //

  folderName = folderName
    .replace(specialChars, "-")
    .replace(slash, "\\")
    .replace(spaces, " ")
    .replace(backSlashs, "\\")
    .replace(sandwich, "\\")
    .replace(beginningEnd, "");

  return folderName;
}

/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
function returnFileName(save) {
  let fileName;
  var now = new Date();
  // console.log(now.toLocaleString());
  // console.log(ownsession[0].title);
  // console.log(ownsession.length.toString());
  
			fileName = `backup - FF${BrowserVersion} - ${sessions.length.toString()} sess - ${changeDateFormatLabel(now.toLocaleString())}`;

  const pattern = /\\|\/|\:|\?|\.|"|<|>|\|/g;
  fileName = fileName.replace(pattern, "-").replace(/^( )+/, "");
  console.log(fileName);
  return fileName;
}

function changeDateFormatLabel( baseName )
{
	console.log(baseName);
    var parts = baseName.split( "." );
	if (!parts[2])
	{
		parts = baseName.split( "/" );
	}
	var Y = parts[2].split(",");
	if (parts[2].indexOf(",") == -1)
	{
		Y = parts[2].split(" ");
	}
	if(Y[1] == undefined)
	{
		Y[1] = "00:00";
	}
    switch ( Save_opt.dateFormat )
    {
        case "1":
            baseName = parts[ 0 ] + "." + parts[ 1 ] + "." + Y[ 0 ] + "," + Y[ 1 ];
            break;
        case "2":
            baseName = parts[ 1 ] + "." + parts[ 0 ] + "." + Y[ 0 ] + "," + Y[ 1 ];
            break;
        case "3":
            baseName = Y[ 0 ] + "-" + parts[ 1 ] + "-" + parts[ 0 ] + "," + Y[ 1 ];
            break;
    }
    return baseName;
}

async function loadSessionFromId( storageKey, getter )
{
    async function save( obj, db, callback )
    {
        if ( obj.length == 0 )
        {
            callback();
        }
        else
        {
            var data = obj.shift();
            if ( data.url )
            {
                db.addTab(
                {
                    id: data.id,
                    url: data.url,
                    title: data.title,
                    win: "_win"
                } );
                save( obj, db, callback );
            }
            else
            {
                await browser.bookmarks.getChildren( data.id, function( failures )
                {
                    db.addWinLabel( data.id, data.title );
                    failures.forEach( function( tab )
                    {
                        db.addTab(
                        {
                            id: tab.id,
                            url: tab.url,
                            title: tab.title,
                            win: data.id,
							pinned: tab.pinned
                        } );
                    } );
                    save( obj, db, callback );
                } );
            }
        }
    }
    await browser.bookmarks.get( storageKey, function( results )
    {
        var tags = results[ 0 ].title.match(/^(.*)\((\d+\/\d+\/\d+\_\d+\:\d+)\)--(\d+)tabs$/i);
		if (tags == null)
		{
			tags = results[ 0 ].title.match(/^(.*)\((\d+\/\d+\/\d+)\)--(\d+)tabs$/i );
		}
		//console.log("tags");
		//console.log(tags);
		//console.log("results");
		//console.log(results[0]);
		
		//Заменяю количество вкладок на "0", чтобы исправить ошибку удвоения вкладок.
        var data = new SessionData( tags[ 1 ].trim(), tags[
            2 ], "0", results[ 0 ].id );
        if ( Save_opt.editOrder == false )
        {
            data.index = results[ 0 ].index;
			console.log("data");
			console.log(data);
        }
        browser.bookmarks.getChildren( results[ 0 ].id, function(
            walkers )
        {
            save( walkers, data, function()
            {
                getter( data );
            } );
        } );
    } );
}


//browser.storage.onChanged.addListener(setSetting);


// window.addEventListener('storage', function(e) {  
 // console.log('Woohoo, someone changed my localstorage va another tab/window!');
// });


init();