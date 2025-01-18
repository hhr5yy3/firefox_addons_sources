var background = browser.extension.getBackgroundPage();
//var newSession;
var CrashSession = {};//Добавлено в 2.6.13 массив краш сессий
var DayCrashSession = {};
var CloseWindowSessions = {};
var Setting_n = {};//Массив настроек
var BrowserVersion;

function getMessage(code, obj)
{
    try
    {
        var value = browser.i18n.getMessage(code, obj);
        if (value)
        {
            return value;
        }
    }
    catch (fmt)
    {
        console.error(fmt);
    }
}

function renderList(key)
{
    var camelKey = loadPreviousSession(key);
    showCrashWindow(camelKey);
	$(".sessionLabel1").css("color", "black");
    $(".sessionLabel").css("color", "black");
    $("#" + key).css("color", "green");
}

function renderDayList(key)
{
	console.log(key);
    var camelKey = loadDayPreviousSession(key);
    showCrashWindow(camelKey);
	$(".sessionLabel").css("color", "black");
    $(".sessionLabel1").css("color", "black");
    $("#" + key + "Day").css("color", "green");
}

function renderCloseList(key)
{
    var camelKey = loadCloseWindowSessions(key);
    showCrashWindow(camelKey);
	$(".sessionLabel1").css("color", "black");
    $(".sessionLabel").css("color", "black");
    $("#" + key).css("color", "green");
}

function getSessionDate(key)
{
	var camelKey = loadPreviousSession(key);
	console.log(camelKey);
	var date_n = camelKey.date;
            if (camelKey.created)
            {
                var now = new Date(parseInt(camelKey.created));
                
                date_n = now.getDate() + "/" + (now.getMonth() + 1) + "/" + (now.getYear() + 1900);
				//now.setDate(now.getDate() + 1);
				console.log(now.toDateString() + " " + date_n + " " + now.getDate());
				return now.toLocaleString();
            }
}

function getDaySessionDate(key)
{
	var camelKey = loadDayPreviousSession(key);
	var date_n = camelKey.date;
            if (camelKey.created)
            {
                var now = new Date(parseInt(camelKey.created));
                
                date_n = now.getDate() + "/" + (now.getMonth() + 1) + "/" + (now.getYear() + 1900);
				//now.setDate(now.getDate() + 1);
				console.log(now.toDateString() + " " + date_n + " " + now.getDate());
				return now.toLocaleString();
            }
}

function getCloseSessionDate(key)
{
	var camelKey = loadCloseWindowSessions(key);
	var date_n = camelKey.date;
            if (camelKey.created)
            {
                var now = new Date(parseInt(camelKey.created));
                
                date_n = now.getDate() + "/" + (now.getMonth() + 1) + "/" + (now.getYear() + 1900);
				//now.setDate(now.getDate() + 1);
				console.log(now.toDateString() + " " + date_n + " " + now.getDate());
				return now.toLocaleString();
            }
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
				//console.log(settings);
				//if (value.sessions != undefined) S = value.sessions;
				//else S = {};
				Setting_n = value.settings;
				if (Setting_n === undefined) Setting_n = {};
				console.log(Setting_n);
				resolve();
			});
			}
			catch (ecl)
			{
				console.log(ecl);
			}
			
			console.log(Setting_n);
			//resolve();
		
	});
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
				console.log(CrashSession);
				resolve();
			});
			}
			catch (ecl)
			{
				console.log(ecl);
			}
			
			console.log(Setting_n);
			//resolve();
		
	});
}

function RemoveCrashSession()
{
	delete CrashSession;
	CrashSession = {};
	console.log(CrashSession);
	browser.storage.local.set(
			{
			'CrashSession':CrashSession
			}).then(background.updateCrashSession());
	location.reload();
}

function RemoveDayCrashSession()
{
	delete DayCrashSession;
	DayCrashSession = {};
	console.log(DayCrashSession);
	browser.storage.local.set(
			{
			'DayCrashSession':DayCrashSession
			}).then(background.InitDayCrashSession());
	location.reload();
}

function init()
{
	var gettingInfo = browser.runtime.getBrowserInfo();
	gettingInfo.then(gotBrowserInfo);
	
	Setting_n = background.returnSettings();
	CrashSession = background.returnCrashSession();
	console.log("Снимки сессий");
	console.log(CrashSession);
	DayCrashSession = background.returnDayCrashSession();
	console.log(DayCrashSession);
	CloseWindowSessions = background.returnCloseWindowSession();
	console.log(CloseWindowSessions);
	$( "#removeCrashBtn" )
        .html( getMessage( "removeCrashBtn" ) );
	$( "#removeCrashBtn1" )
        .html( getMessage( "removeCrashBtn1" ) );
    document.title = getMessage("crashRestoreTitle");
    $(textBox).html(getMessage("restorePreviousSession"));
	// InitCrashSession().then(function () {
   
	// console.log(CrashSession);
	
	//Отрисовываю ежедневные сесии
	var prevSession_n = loadDayPreviousSession("prevSession");
    showCrashWindow(prevSession_n);
    if (prevSession_n)
    {
		console.log(prevSession_n);
        if (prevSession_n = getMessage("snapshotHint1"))
        {
			console.log(prevSession_n);
            $(snapshotHint1).html(prevSession_n);
        }
        prevSession_n = $(sessionList1);
		console.log(prevSession_n);
        var i = 0;
        for (; i <= Setting_n.backupPeriodNumber; i++)
        {
            if (DayCrashSession["prevSession-" + i])
            {
				
				let idDay = "prevSession-" + i;
                $("<span/>",
                {
                    "class": "sessionLabel1",
					id: "prevSession-" + i + "Day",
                    text: changeDateFormatLabel(getDaySessionDate("prevSession-" + i)),
                    
                    click: function()
                    {
                        renderDayList(idDay);
                    }
                }).css("color", "red").appendTo(prevSession_n);
				$("<span/>",
                {
                    //"class": "sessionLabel",
					//id: "prevSession-" + i,
                    html: " &int; "//  + getSessionDate("prevSession-" + i),
                    
                    // click: function()
                    // {
                        // renderList(this.id);
                    // }
                }).css("color", "red").appendTo(prevSession_n);
				//getSessionDate("prevSession-" + i);
            }
        }
        $(".sessionLabel1").css("color", "black");
        $("#prevSession1").click(function()
        {
            renderDayList("prevSession");
        }).css("color", "green");
    }
    else
    {
        $(sessionList1).hide();
        $(snapshotHint1).hide();
		$(removeCrashBtn1).hide();
		
    }
	
    var prevSession_n = loadPreviousSession("prevSession");
    showCrashWindow(prevSession_n);
    if (prevSession_n)
    {
		console.log(prevSession_n);
        if (prevSession_n = getMessage("snapshotHint"))
        {
			console.log(prevSession_n);
            $(snapshotHint).html(prevSession_n);
        }
        prevSession_n = $(sessionList);
		console.log(prevSession_n);
        
        for (let i = 0; i <= Setting_n.backupPeriodNumber; i++)
        {
            if (CrashSession["prevSession-" + i])
            {
				
                $("<span/>",
                {
                    "class": "sessionLabel",
					id: "prevSession-" + i,
                    text: changeDateFormatLabel(getSessionDate("prevSession-" + i)),
                    
                    click: function()
                    {
                        renderList(this.id);
						console.log("this.id");
						console.log(this.id);
                    }
                }).css("color", "red").appendTo(prevSession_n);
				$("<span/>",
                {
                    //"class": "sessionLabel",
					//id: "prevSession-" + i,
                    html: " &int; "//  + getSessionDate("prevSession-" + i),
                    
                    // click: function()
                    // {
                        // renderList(this.id);
                    // }
                }).css("color", "red").appendTo(prevSession_n);
				//getSessionDate("prevSession-" + i);
            }
        }
        $(".sessionLabel").css("color", "black");
        $("#prevSession").click(function()
        {
            renderList(this.id);
			console.log("this.id");
			console.log(this.id);
        }).css("color", "green");
    }
    else
    {
        $(sessionList).hide();
        $(snapshotHint).hide();
    }
	
	var prevSession_n = loadCloseWindowSessions(0);
    showCrashWindow(prevSession_n);
    if (prevSession_n)
    {
		console.log(prevSession_n);
        if (prevSession_n = getMessage("snapshotHint2"))
        {
			console.log(prevSession_n);
            $(snapshotHint2).html(prevSession_n);
        }
        prevSession_n = $(sessionList2);
		console.log(prevSession_n);
        
        for (let i = 0; i <= Setting_n.CloseWindowNumber; i++)
        {
            if (CloseWindowSessions[i])
            {
				
                $("<span/>",
                {
                    "class": "sessionLabel2",
					id: i,
                    text: changeDateFormatLabel(getCloseSessionDate(i)),
                    
                    click: function()
                    {
                        renderCloseList(this.id);
						console.log("this.id");
						console.log(this.id);
                    }
                }).css("color", "red").appendTo(prevSession_n);
				$("<span/>",
                {
                    //"class": "sessionLabel",
					//id: "prevSession-" + i,
                    html: " &int; "//  + getSessionDate("prevSession-" + i),
                    
                    // click: function()
                    // {
                        // renderList(this.id);
                    // }
                }).css("color", "red").appendTo(prevSession_n);
				//getSessionDate("prevSession-" + i);
            }
        }
        $(".sessionLabel2").css("color", "black");
        $("#prevSession2").click(function()
        {
            renderCloseList(this.id);
			console.log("this.id");
			console.log(this.id);
        }).css("color", "green");
    }
    else
    {
        //$(sessionList2).hide();
        //$(snapshotHint2).hide();
    }
	
	
	//});
}

function loadPreviousSession(data)
{
    var self;
    var query = CrashSession[data];
	console.log(data);
	console.log(query);
    if (!data || !query)
    {
        return null;
    }
    data = JSON.parse(query);
	console.log(data);
	//console.log(CrashSession);
    var date = new Date();
    query = date.getMonth() + 1;
    var url = date.getDate();
    date = date.getFullYear();
    query = url + "/" + query + "/" + date;
    if (data.tabs)
    {
        self = new background.SessionData(data.title, query);
        data.tabs.forEach(function(added)
        {
            self.addTab(added);
        });
    }
    else
    {
        self = new background.SessionData(getMessage("restoreSessionOn"), query);
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
	
	console.log(self);
    return self;
}

function loadDayPreviousSession(data)
{
    var self;
    var query = DayCrashSession[data];
    if (!data || !query)
    {
        return null;
    }
    data = JSON.parse(query);
	console.log(data);
    var date = new Date();
    query = date.getMonth() + 1;
    var url = date.getDate();
    date = date.getFullYear();
    query = url + "/" + query + "/" + date;
    if (data.tabs)
    {
        self = new background.SessionData(data.title, query);
        data.tabs.forEach(function(added)
        {
            self.addTab(added);
        });
    }
    else
    {
        self = new background.SessionData(getMessage("restoreSessionOn"), query);
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
	
	//console.log(CrashSession);
    return self;
}

function loadCloseWindowSessions(data)
{
    var self;
    var query = CloseWindowSessions[data];
	console.log(query);
	console.log(data);
    if (!query)
    {
        return null;
    }
    data = JSON.parse(query);
	console.log(data);
	data.title = data.date;
			data.tabsCount = data.tabs.length;
    var date = new Date();
    query = date.getMonth() + 1;
    var url = date.getDate();
    date = date.getFullYear();
    query = url + "/" + query + "/" + date;
	console.log(data);
	console.log(query);
    if (data.tabs)
    {
        self = new background.SessionData(data.title, query);
        data.tabs.forEach(function(added)
        {
            self.addTab(added);
        });
		console.log(self);
    }
    else
    {
        self = new background.SessionData(getMessage("restoreSessionOn"), query);
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
		console.log(self);
    }
	//console.log(data.created);
    self.created = data.created;
	self.tabsCount = data.tabs.length;
	
	console.log(self);
    return self;
}

var selectedSession;

function showCrashWindow(data)
{
	console.log(data);
    try
    {
        if ($(crashWindowBox).empty(), !data || data.getWinCount() <= 0)
        {
            $("<div/>",
            {
                html: getMessage("noSessionToRestore")
            }).appendTo($("#crashWindowBox"));
        }
        else
        {
            selectedSession = data;
			console.log("Выбранная сессия");
			console.log(selectedSession);
            var radio = $("#crashWindowBox");
            var name = 1;
            var id;
            for (id in data.windows)
            {
				//console.log(data.windows[id]);
                var element = $("<div/>",
                {
                    "class": "crashSessionDiv"
                }).appendTo(radio);
                var outer = $("<div/>",
                {
                    "class": "titleDiv"
                }).appendTo(element);
                var nameW = $("<div/>",
                {
                    id: "window_" + name,
                    "class": "crashWindow",
                    html: getMessage("savedWindow", ["" + name])
                }).appendTo(outer);
				$( "<span/>",
					{
						"class": "mswspan",
						text:"("+data.windows[id].length+" tabs)"
					} )
					.appendTo( nameW );
                var inner = $("<div/>",
                {
                    "class": "buttonContainer"
                }).appendTo(outer);
                $("<div/>",
                {
                    id: "restoreSession_" + name,
                    html: getMessage("restoreSessionButton"),
                    "class": "sessionbutton",
                    winId: id,
                    title: getMessage("restoreSessionButtonDescription"),
                    click: function(e)
                    {
						console.log(e.button);
                        restoreCrashSession($(this).attr("winId"), e.button);
                    }
                }).appendTo(inner);
                var codeSegments = data.windows[id];
                var i = 0;
                for (; i < codeSegments.length; i++)
                {
                    try
                    {
                        var options = codeSegments[i];
                        var $element = $("<a/>",
                        {
                            "class": "tabbox",
                            href: options.url,
                            title: options.url,
                            target: "_blank"
                        }).appendTo(element);
                        $("<img/>",
                        {
                            //Вернуть сюда нормальную иконку
							src: Setting_n.ShowFavicon ? "https://icons.duckduckgo.com/ip3/" + extractHostname(options.url) + ".ico" : "/img/firefox.png"
							//src: "http://www.google.com/s2/favicons?domain_url=" + extractHostname(options.url)
                        }).appendTo($element);
                        $("<span/>",
                        {
                            text: options.title ? options.title : options.url
                        }).appendTo($element);
                        if (options.pinned)
                        {
                            $("<img/>",
                            {
                                src: "/img/pin.png"
                            }).appendTo($element);
                        }
                    }
                    catch (m)
                    {
                        console.error("restore page render error", m);
                    }
                }
                $("<br/>").appendTo(radio);
                name++;
            }
            var d = data.date;
			console.log(d);
            if (data.created)
            {
                var now = new Date(parseInt(data.created));
                $("<div>",
                {
                    "class": "note",
                    text: "Snapshot taken at " + changeDateFormatLabel(now.toLocaleString())
                }).appendTo(radio);
                d = now.getDate() + "/" + (now.getMonth() + 1) + "/" + (now.getYear() + 1900);
				console.log(d);
            }
            $("<div/>",
            {
                html: getMessage("saveSessionButton"),
                title: getMessage("saveSessionButtonDescription"),
                "class": "sessionbutton",
                click: function()
                {
                    var title = prompt(getMessage("enterSessionName"), getMessage("restoreSessionOn") + changeDateFormat(d));
					console.log(title);
					console.log(data);
                    if (title != null)
                    {
                        data.title = title;
                        data.save(function()
                        {
                            var pauseText = getMessage("sessionCreated", title) || 'Session "' + title + '" is created';
                            $(message).text(pauseText);
                        });
                    }
                }
            }).appendTo(radio);
            $("<span>",
            {
                id: "message"
            }).appendTo(radio);
        }
    }
    catch (bin)
    {
        console.error("showCrashWindow", bin);
        $("<div/>",
        {
            html: getMessage("noSessionToRestore")
        }).appendTo($("#crashWindowBox"));
    }
}

function changeDateFormat(step)
{
    var parts = step.split("/");
    switch (Setting_n.dateFormat)
    {
        case "1":
            step = parts[0] + "/" + parts[1] + "/" + parts[2];
            break;
        case "2":
            step = parts[1] + "/" + parts[0] + "/" + parts[2];
            break;
        case "3":
            step = parts[2] + "-" + parts[1] + "-" + parts[0];
            break;
    }
    return step;
}

function changeDateFormatLabel( baseName )
{
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
    switch ( Setting_n.dateFormat )
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

function restoreCrashSession(fmt, err)
{
	console.log(selectedSession);
	OpenSession = selectedSession;
	opentab = 0;
	browser.tabs.onCreated.addListener(opensort);
	
    console.log(fmt, err);
    if (selectedSession)
    {
        try
        {
            var i = selectedSession.windows[fmt];
            if (i)
            {
                var ret = [];
                var elems = [];
                i.forEach(function(v)
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
				if (ret[0].url.indexOf("about:") > -1 || ret[0].url.indexOf("moz-extension:") > -1)
                        {
                            ret[0].url = null;
                        }
                if (err == 0)
                {
                    browser.windows.getLastFocused(function(opts)
                    {
                        browser.windows.create(
                        {
                            url: ret[0].url,
                            width: opts.width,
                            height: opts.height
                        }, function(tab)
                        {
							if (BrowserVersion >= 63 && Setting_n.Discarded)
							{
								i = 0;
								for (; i < ret.length; i++)
								{
									console.log(ret[i].url);
									browser.tabs.create(
									{
										active: false,
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
							loop(1, ret.length,100); 
         
								function loop(i, l, interval) 
								{      
									setTimeout(
										function() 
										{  
											browser.tabs.create(
											{
												active: false,
												windowId: tab.id,
												url: realURL(ret[i]),
												pinned: ret[i].pinned ? true : false
											});   
											i = i + 1; //     
											if (i < l) { // 
												loop(i, l, interval);
												setIcon(i, l);
											}
										}, interval);
								}
							}
                            // var i = 1;
                            // for (; i < ret.length; i++)
                            // {
                                // browser.tabs.create(
                                // {
									// active: false,
                                    // windowId: tab.id,
                                    // url: ret[i].url,
                                    // pinned: ret[i].pinned ? true : false
                                // });
                            // }
                        });
                    });
                }
                else
                {
                    if (err == 1)
                    {
						if (BrowserVersion >= 63 && Setting_n.Discarded)
						{
							i = 0;
							for (; i < ret.length; i++)
							{
								console.log(ret[i].url);
								browser.tabs.create(
								{
									active: false,
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
						loop(0, ret.length,100); 
         
							function loop(i, l, interval) 
							{      
								setTimeout(
									function() 
									{  
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
											setIcon(i, l);
										}
									}, interval);
							}
						}
                        // i = 0;
                        // for (; i < ret.length; i++)
                        // {
                            // browser.tabs.create(
                            // {
								// active: false,
                                // url: ret[i].url,
                                // pinned: ret[i].pinned ? true : false
                            // });
                        // }
                    }
                }
            }
        }
        catch (consoleText)
        {
            console.error(consoleText);
			alert(consoleText);
        }
    }
}


//Сортирую вкладки в правильном порядке
//================================================
let opentab = 0;
function opensort()
{
	opentab++;
	console.log(opentab);
	console.log(OpenSession.tabsCount);
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

//Меняем иконку во время открытия сессии
function setIcon(nom, len)
{
	if(nom < len-1)
	{
		let number_n = len - nom;
		browser.browserAction.setBadgeText({
		text: number_n.toString(10)
		});
		console.log("Число " + number_n.toString(10));
	}
	else
	{
		browser.browserAction.setBadgeText({
		text: ""
		});
		console.log("Выход ");
	}
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
	if (Setting_n.LazyLoading)
	{
	let ReplaceURL_n;
	//Вернуть сюда нормальную иконку
		if (Setting_n.ShowFavicon == true)
		{
			ReplaceURL_n = returnReplaceURL('redirect', tab.title, tab.url, "https://icons.duckduckgo.com/ip3/" + extractHostname(tab.url) + ".ico");
		}
		else
		{
			ReplaceURL_n = returnReplaceURL('redirect', tab.title, tab.url, "https://static-media-prod-cdn.sumo.mozilla.net/static/sumo/img/favicon-16x16.png");
		}
	//a = returnReplaceURL('redirect', tab.title, tab.url, "http://www.google.com/s2/favicons?domain_url=" + extractHostname(tab.url));
	console.log(ReplaceURL_n);
	return ReplaceURL_n;
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

function gotBrowserInfo(info) {
  
  BrowserVersion = info.version.split(".")[0];
  console.log(BrowserVersion);
}


$(document).ready(function()
{
	$( removeCrashBtn )
            .click( function()
            {
                RemoveCrashSession();
            } );
	$( removeCrashBtn1 )
            .click( function()
            {
                RemoveDayCrashSession();
            } );
    init();
});