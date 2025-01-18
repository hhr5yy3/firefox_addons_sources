var background = browser.extension.getBackgroundPage();
var sessions = [];
var CrashSessions = [];
var CloseWindowSessions = [];//Добавлено в 2.14.3 список сессий при закрытии окна
var editedSession;
var editedBlock;
var allWindows = [];
var Sett = {};
var SessionTitle = " ";
var optionlist = "";

function getMessage( type, elems )
{
    try
    {
        var ret = browser.i18n.getMessage( type, elems );
        if ( ret )
        {
            return ret;
        }
    }
    catch ( dic )
    {
		console.log(dic);
	}
}

function populateWin( data, id, dataAndEvents, mark )
{
    var hiddentab;
    var tit = $( "#" + id );
	var IdWin = id + "Wrapper" + data.id;
    var li = $( "<div/>",
    {
        "class": "winWrapper",
        winId: data.id,
        id: id + "Wrapper" + data.id
    } );
    if ( mark )
    {
        li.prependTo( tit );
    }
    else
    {
        li.appendTo( tit );
    }
    tit = $( "<div/>",
        {
            "class": "mswinline"
        } )
        .appendTo( li );
    var $input = $( "<input/>",
        {
            id: id + "_win_" + data.id,
            "class": "mswincheck",
            type: "checkbox",
            checked: dataAndEvents,
            change: function()
            {
                if ( $( this )
                    .prop( "checked" ) === true )
                {
                    li.find( ".mscheck" )
                        .prop( "checked", true );
                }
                else
                {
                    li.find( ".mscheck" )
                        .prop( "checked", false );
                }
            }
        } )
        .appendTo( tit );
		console.log("checked: dataAndEvents " + dataAndEvents);
		
    var wspan = $( "<span/>",
        {
            "class": "msWinblabel",
            text: data.label || ( mark ? "Current Window" :
                "window(" + data.id + ")" ),
			mousedown: HideList
        } )
        .appendTo( tit );
	let dataid = data.id;
	data = data.tabs;
	console.log(data);
	console.log(Sett.ShowHidden);
	if (Sett.ShowHidden == true)
	{
		hiddentab = 0;
	}
	else
	{
	//Считаю количество скрытых вкладок
	hiddentab = HiddenTab(data);
	console.log(hiddentab);
	//Выбираю только нескрытые вкладки
	data = NoHiddenTab(data);
	}
	console.log(hiddentab);
	if (hiddentab < 1)
	{
		$( "<span/>",
			{
				"class": "mswspan",
				text:"("+data.length+" tabs)"
			} )
			.appendTo( wspan );
    }
	else
	{
		$( "<span/>",
			{
				"class": "mswspan",
				text:"("+data.length+" tabs)" + "("+ hiddentab + "  hidden tabs)"
			} )
			.appendTo( wspan );
	}
    tit = 0;
    for ( ; tit < data.length; tit++ )
    {
        var ecs = data[ tit ];
			ecs = background.ITitleUrl(ecs);//Исправляю заголовок и урл
        var rightDiv = $( "<div/>",
            {
                "class": "mstabline",
                title: ecs.title == ecs.url ? ecs.title : ecs.title + " : " + ecs.url
            } )
            .appendTo( li );
		var img = $("<img/>",
                {
					"class": "msicon",
					//Вернуть сюда нормальную иконку
					src: Sett.ShowFavicon ? "https://icons.duckduckgo.com/ip3/" + extractHostname(ecs.url) + ".ico" : "/img/firefox.png"
                    //src: "http://www.google.com/s2/favicons?domain_url=" + extractHostname(e.url)
					//src: e.favIconUrl
                }).appendTo( rightDiv );
				//console.log("FAVICON "+e.favIconUrl);
        $( "<input/>",
            {
                id: "tabcheck_" + ecs.id,
                "class": "mscheck",
                type: "checkbox",
                checked: dataAndEvents,
                change: function()
                {
                    if ( $( this )
                        .prop( "checked" ) === true )
                    {
                        $input.prop( "checked", true );
                    }
                }
				
            } )
            .appendTo( rightDiv )[ 0 ].tab = ecs;
			
		
			
        if ( id == "mslistoriginal" )
        {
            $( "<span/>",
                {
                    "class": "mstablabel",
                    text: ecs.title,
                    link: ecs.url,
                    click: function()
                    {
                        browser.tabs.create(
                        {
							active: false,
                            url: $( this )
                                .attr( "link" )
                        } );
                    }
                } )
                .appendTo( rightDiv );
        }
        else
        {
            $( "<span/>",
                {
					id: dataid + "_" + ecs.id,
                    "class": "mstablabel",
                    text: ecs.title,
					click: moveToTab
                } )
                .appendTo( rightDiv );
			$( "<div/>",
                {
					id: dataid + "__" + ecs.id,
                    "class": "msdeltab",
					click: closeTab
                } )
                .appendTo( rightDiv );
        }
    }
    $( '#mssavebase input[type="checkbox"]' )
        .change( function()
        {
            var copyProp = $( "#mssavebase .mscheck:checked" )
                .length === 0;
            $( "#mssavebutton" )
                .prop( "disabled", copyProp );
        } );
}
//Считаем скрытые вкладки
function HiddenTab(data)
{
	let i_n = 0;
	console.log(data[0].hidden);
	if (data[0].hidden == undefined)
	{
		return i_n;
	}
	data.forEach(function(tab)
	{
		console.log(tab.hidden);
		if (tab.hidden == true)
		{
			i_n = i_n+1;
		}
	});
	console.log('Скрытые вкладки');
	console.log(i_n);
	return i_n;
}

//Создаем новый массив нескрытых вкладок
function NoHiddenTab(data)
{
	var tabs = [];
	console.log(data[0].hidden);
	if (data[0].hidden == undefined)
	{
		return data;
	}
	data.forEach(function(tab)
	{
		console.log(tab.hidden);
		if (tab.hidden == false || !tab.hidden)
		{
			tabs.push(tab);
		}
	});
	console.log('Некрытые вкладки');
	console.log(tabs.length);
	return tabs;
}

// InitSettings().then(function () {
   
	// console.log(S);
// });

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
	//console.log(hostname);

    return hostname;
}

function moveToTab(e)
{
	console.log(e.target.id);
	chrome.windows.update(parseInt(e.target.id.split("_")[0]), {
        focused: true
    });
    chrome.tabs.update(parseInt(e.target.id.split("_")[1]), {
        active: true
    });
}

function closeTab(e)
{
	console.log(e.target.parentElement);
	console.log(e.target.id);
	chrome.windows.update(parseInt(e.target.id.split("__")[0]), {
        focused: true
    });
    chrome.tabs.remove(parseInt(e.target.id.split("__")[1]));
	
	e.target.parentElement.style.display = 'none'; 
}

//Сворачивает/разворачивает список вкладок в сессии
function HideList(e)
{
	console.log(e.target.parentElement.parentElement.id);
	console.log(HideList);
	$('#'+e.target.parentElement.parentElement.id).children("div.mstabline").toggle("slow");
	//$('.mstabline').toggle("fast");
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
				Sett = value.settings;
				if (Sett === undefined) Sett = {};
				console.log(Sett);
				resolve();
			});
			}
			catch (ecl)
			{
				console.log(ecl);
			}
			
			console.log(Sett);
			//resolve();
		
	});
}

function setSetting()
{
InitSettings().then(function () {
    changeBackupSetting();
	console.log(Sett);
});
}

function init()
{
	
	Sett = background.returnSettings();
	$("select").val(Sett.SessionList);
	optionlist = $("select").val();
	console.log(Sett);
	
	//Устанавливаем тему
	console.log(Sett.DarkTheme);
	if(Sett.DarkTheme == true)
	{
		document.documentElement.setAttribute('theme', 'dark');
	}
	else
	{
		document.documentElement.removeAttribute('theme');
	}
    // $( "#stringUpdatedMessage" )
        // .html( getMessage( "updatedMessage" ) );
    $( "#stringSaveSession" )
        .html( getMessage( "saveSession" ) );
    $( "#savetitle" )
        .val( SessionTitle );
    $( "#mssavelist" )
        .attr( "title", getMessage( "msSaveList" ) );
    $( "#mssavetoggle" )
        .attr( "title", getMessage( "msSaveToggle" ) );
    $( "#mseditnewtoggle" )
        .attr( "title", getMessage( "msSaveToggle" ) );
    $( "#mseditsavedtoggle" )
        .attr( "title", getMessage( "msSaveToggle" ) );
    $( "#msrestorelabel" )
        .html( getMessage( "restoreSession" ) );
    $( "#msrestorelabel2" )
        .html( getMessage( "restoreSession2" ) );
    $( "#msheadingtitle" )
        .html( getMessage( "msHeadingTitle" ) );
    $( "#msheadingnew" )
        .html( getMessage( "msHeadingNew" ) );
	$( "#msselecttab" )
        .html( getMessage( "AddCurrentWindow" ) );
    $( "#msheadingnew" )
        .attr( "title", getMessage( "msHeadingNewTitle" ) );
    $( "#msheadingsaved" )
        .html( getMessage( "msHeadingSaved" ) );
    $( "#mseditsave" )
        .attr( "value", getMessage( "msEditSave" ) );
    $( "#mseditcancel" )
        .attr( "value", getMessage( "msEditCancel" ) );
    $( "#mseditremove" )
        .attr( "value", getMessage( "remove" ) );
    $( "#options" )
        .html( getMessage( "options" ) );
    $( "#sessionTextBoxCloseBtn" )
        .attr( "title", getMessage( "sessionTextBoxClose" ) );
    $( "#importSessionBtn" )
        .attr( "title", getMessage( "sessionTextBoxImport" ) );
	$( "#mssavebutton" )
        .attr( "title", getMessage( "save" ) );
	$( "#msrestoreicon2" )
        .attr( "title", getMessage( "options" ) );
	$( "#msopentab" )
        .attr( "title", getMessage( "msopentab" ) );
	$( "#SMBtn" )
        .attr( "title", getMessage( "SessionManagement" ) );
    $( "#selectAll" )
        .text( getMessage( "selectAll" ) );
		
	
	$( "#displayAlltext" )
        .html( getMessage( "displayAlltext" ) );
	$( "#usertext" )
        .html( getMessage( "usertext" ) );
	$( "#autotext" )
        .html( getMessage( "autotext" ) );
	$( "#quicktext" )
        .html( getMessage( "quicktext" ) );
	$( "#closetext" )
        .html( getMessage( "closetext" ) );
	$( "#crashtext" )
        .html( getMessage( "crashtext" ) );
    // if ( localStorage.lastUsedSessionName )
    // {
        // $( "#savetitle" )
            // .val( localStorage.lastUsedSessionName );
    // }

    var dataAndEvents_n = false;
    var marc_n;
    browser.windows.getLastFocused( function( item )
    {
        browser.windows.getAll(
        {
            populate: true
        }, function( results )
        {
            results.forEach( function( act )
            {
				console.log(act);
                if ( item.id == act.id )
                {
                    marc_n = true;
					dataAndEvents_n = true;
                }
				else
				{
					marc_n = false;
					dataAndEvents_n = false;
				}
				if ( act.incognito && Sett.ShowPrivate === false )
				{
					console.log(act);
				}
				else
				{
					if( Sett.MarkAll === true)
					{
						dataAndEvents_n = true;
						populateWin( act, "mssavelist", dataAndEvents_n, marc_n );
						console.log("check"+item.id);
						SetHeight(act);
					}
					else
					{
						populateWin( act, "mssavelist", dataAndEvents_n, marc_n );
						console.log("check"+item.id);
						SetHeight(act);
					}
					
				}
            } );
            if ( results.length == 1 )
            {
                $( "#mssaveToggleH4" )
                    .hide();
            }
            if ( !dataAndEvents_n )
            {
                console.error(
                    "Cannot find last focused window" );
                $( "#mssavelistWrapper" + results[ 0 ].id +
                        " input[type=checkbox]" )
                    .prop( "checked", true );
            }
        } );
    } );
	
	console.log("233");
    // background.initSession( function( dataAndEvents )
    // {
		// console.log("Список");
        // sessions = dataAndEvents;
		// console.log(sessions);
		
        // createSessionList();
    // } );
	
	sessions = background.returnSessions();
	createSessionList();
	console.log("Сессии");
	console.log(sessions);
	console.log("243");
	
	
	
    var hig = document.getElementById( "savetitle" );
    hig.focus();
    hig.select();
	
	
    hig.addEventListener( "keypress", function( event )
    {
        if ( event.keyCode == 13 )
        {
            save();
        }
    } );
    if ( Sett.crashRestore === true )
    {
        $( "#msrestorecrash" )
            .attr( "title", getMessage( "restorePreviousSession" ) );
        $( "#msrestorecrashoff" )
            .hide();
    }
    else
    {
        $( "#msrestorecrash" )
            .attr( "title", getMessage( "enableCrashRecovery" ) );
        $( "#msrestorecrashon" )
            .hide();
    }
	
     // h = browser.window.innerHeight;
	 // console.log(h);
    // if ( h < 1 )
    // {
        // $( "body" )
            // .css( "zoom", h );
        // $( "body" )
            // .height( 480 * h );
        // $( "html" )
    // }
	$( "#mssavetoggle" )
		.prop( "checked", true );
	saveToggle();
	
	$('#mssavelist input[type="checkbox"]')
			.each(function() {
				console.log($(this));
					
			});
	$('#mssavelist input[type="checkbox"]')
			.on('mousedown mouseenter click', function() {
				
				console.log(11);        
						$(this)
							.click();
				   
			});
		 
}

//Меняет размер попап в зависимости от размера окна
function SetHeight(act)
{
	if (act.focused)
	{
		console.log(act.height);
		if(act.height < 700)
		{
		$( "body" )
            .height( act.height - 150 );
        console.log(act.height);
		}
		if(act.width < 900)
		{
		$( "body" )
            .width( act.width - 150 );
        console.log(act.width);
		}
	}
	
	////////////////////////////////////////////////////////////////
	// Проверяю, попап открыт в табе или нет, если в табе - меняем боди.
	function onGot(tabInfo) {
		if (tabInfo != undefined)
		{
			$( "body" )
            .height( "100%" );
			$( "body" )
            .width( "100%" );
			console.log($(".mssessiontitle").css({'max-width': '800px'}));
		}
		  console.log(tabInfo);
		}

		function onError(error) {
		  console.log(`Error: ${error}`);
		}

		var gettingCurrent = browser.tabs.getCurrent();
		gettingCurrent.then(onGot, onError);

	//////////////////////////////////////////////////////////////
	
	
	
	
}

function crashRestore()
{
    if ( Sett.crashRestore === true )
    {
        browser.tabs.create(
        {
            url: "crashRestore.html"
        } );
    }
    else
    {
        browser.tabs.create(
        {
            url: "options.html"
        } );
    }
    window.close();
}

function dateConvert(date)
{
	var date1 = date.split("_");
	//console.log(date1);
	var date2 = date1[0].split("/");
	if (date2[ 0 ] < 10)
	{
		date2[ 0 ] = "0"+date2[ 0 ];
	}
	if (date2[ 1 ] < 10)
	{
		date2[ 1 ] = "0"+date2[ 1 ];
	}
	if (!date1[1])
	{
		date1[1] = "00:00";
	}
	var date22 = date1[1].split(":");
	if (date22[ 0 ] < 10)
	{
		date22[ 0 ] = "0"+date22[ 0 ];
	}
	var date3 = date2[2]+"-"+date2[1]+"-"+date2[0]+"T"+date22[0]+":"+date22[1];
	date3 = Date.parse(date3);
	//console.log(date3);
	return date3;
}

//функция сравнения title сессий
function compare(a,b) {
  if (a.title < b.title)
    return -1;
  if (a.title > b.title)
    return 1;
  return 0;
}

function compareDate(a,b) {
	a = dateConvert(a.date);
	b = dateConvert(b.date);
  if (a > b)
    return -1;
  if (a < b)
    return 1;
  return 0;
}

function separateSession(data)//Разделяет списки сессий
{
	sessions = background.returnSessions();//Забираем список сессий из бэкграунд
	CrashSessions = background.returnCrashSessions();//Забираем список краш сессий
    CloseWindowSessions = background.returnCloseWindowSessions();//Забираем список сессий при закрытии
    var newArray;
	switch(data) {
	  case '_displayAll': 
		return sessions;
		

	  case '_user':  // 
		 newArray = sessions.filter( function(item){ return (item.title.indexOf("AutoSave_") != 0 && item.title.indexOf("Quick save") != 0); } );
		console.log(newArray);
		return newArray;
		
		
	  case '_auto':  // 
		 newArray = sessions.filter( function(item){ return item.title.indexOf("AutoSave_") === 0; } );
		console.log(newArray);
		return newArray;
		
		
	  case '_quick':
		 newArray = sessions.filter( function(item){ return item.title.indexOf("Quick save") === 0; } );
		console.log(newArray);
		return newArray;
		
		
	case '_crash':  // 
		 newArray = CrashSessions;
		console.log(newArray);
		return newArray;
		
		
	case '_close':  // 
		 newArray = CloseWindowSessions;
		console.log(newArray);
		return newArray;
		

	  default:
		return sessions;
		
	}
}

function createSessionList()
{
    sessions = [];
    var queue;
	sessions = separateSession(optionlist);//Забираем список сессий из бэкграунд
	console.log(sessions);
	if (Sett.SortTitle)
	{
		console.log("сортировка");
		sessions.sort(compare);
	}
	else
	{
		console.log("сортировка по дате");
		sessions.sort(compareDate);
		console.log(sessions);
	}
	console.log(sessions);
    var elem = $( "#msrestorelist" );
    if ( sessions.length === 0 )
    {
         queue = $( "<div/>",
            {
                "class": "nosessionsaved",
                text: getMessage( "noSessionSaved" )
            } )
            .appendTo( elem );
    }
    else
    {
        var i_n = 0;
        
        for ( ; i_n < sessions.length; i_n++ )
        {
            var nav;
            var menu;
			var user = sessions[ i_n ];
			//console.log(dateConvert(user.date));
			//console.log(user);
			//console.log(S.ShowAutoSave);
			//console.log(user.title.indexOf("AutoSave_"));
			
				
				queue = $( "<div/>",
					{
						id: "session_" + i_n,
						"class": "mssessionblock",
						title: getMessage( "clickToRestore", [ user.title ] ),
						mousedown: stopDragEffect
					} )
					.appendTo( elem );
				queue[ 0 ].sessionId = i_n;
				//Добавляем меню к каждой сессии
				nav = $( "<div/>",
					{
						id: "nav"+"session_" + i_n,
						"class": "nav",
						style: "display:none;",
						title: getMessage("LeftSequentiallyMiddleTogether"),
						mousedown: restoreSession
					} )
					.appendTo( elem );
				menu = $( "<div/>",
					{
						id: i_n,
						"class": "msmenu",
						text: getMessage("OpenNewWindow"),
						mousedown : OpenNewWindow
					} )
					.appendTo( nav );
				$( "<div/>",
					{
						id: i_n,
						"class": "msmenu",
						text: getMessage("OpenCurrentWindow"),
						mousedown: OpenCurrentWindow
					} )
					.appendTo( nav );
				$( "<div/>",
					{
						id: i_n,
						"class": "msmenu",
						text: getMessage("AddCurrentWindow"),
						mousedown: AddCurrentWindow
					} )
					.appendTo( nav );
				$( "<div/>",
					{
						id: i_n,
						"class": "msmenu",
						text: getMessage("OpenPrivateWindow"),
						mousedown : OpenPrivateWindow
					} )
					.appendTo( nav );
				$( "<div/>",
					{
						id: i_n,
						"class": "msmenu",
						text: getMessage("SaveHere"),
						mousedown: SaveHere
					} )
					.appendTo( nav );
				$( "<div/>",
					{
						id: i_n,
						"class": "msmenu",
						text: getMessage("SelectTabs"),
						mousedown: SelectTabs
					} )
					.appendTo( nav );
				//Конец меню
				var session_q = $( "<div/>",
					{
						"class": "mssessionlabel",
						mousedown: restoreSession
					} )
					.appendTo( queue );
				$( "<div/>",
					{
						"class": "mssessiontitle",
						text: user.title
					} )
					.appendTo( session_q );
				$( "<div/>",
					{
						"class": "mssessioncount",
						text: getMessage( "tabsCount", [ user.tabsCount.toString() ] )
					} )
					.appendTo( session_q );
				$( "<div/>",
					{
						"class": "mssessiontimelabel",
						text: changeDateFormat( user.date ),
						mousedown: restoreSession
					} )
					.appendTo( queue );
				queue = $( "<div/>",
					{
						"class": "controls"
					} )
					.appendTo( queue );
				$( "<div/>",
					{
						"class": "control mssessionremove",
						title: getMessage( "remove" ),
						click: remove
					} )
					.appendTo( queue );
				$( "<div/>",
					{
						"class": "control mssessionedit",
						title: getMessage( "edit" ),
						click: edit
					} )
					.appendTo( queue );
				$( "<div/>",
					{
						"class": "control mssessionexport",
						title: getMessage( "export" ),
						click: exportSession
					} )
					.appendTo( queue );
					
				//
				
			
        }
		$( ".nosessionsaved" )
        .hide();
    }
	$( "#savetitle" )
        .val( SessionTitle );
	
	//Скрываем лишнее экспорт, редактировать, удалить
	try
    {
        if(!sessions[0].folderId)
		{
			$(".controls").hide();
		}
    }
    catch ( dic )
    {
		console.log(dic);
	}
}

function changeDateFormat( baseName )
{
    var parts = baseName.split( "/" );
	//Исправляю формат даты
	if (parts[ 0 ] < 10)
	{
		parts[ 0 ] = "0"+parts[ 0 ];
	}
	if (parts[ 1 ] < 10)
	{
		parts[ 1 ] = "0"+parts[ 1 ];
	}
	var Y_time = parts[2].split("_");
	if(Y_time[1] == undefined)
	{
		Y_time[1] = "00:00";
	}
    switch ( Sett.dateFormat )
    {
        case "1":
            baseName = parts[ 0 ] + "/" + parts[ 1 ] + "/" + Y_time[ 0 ] + "__" + Y_time[ 1 ];
            break;
        case "2":
            baseName = parts[ 1 ] + "/" + parts[ 0 ] + "/" + Y_time[ 0 ] + "__" + Y_time[ 1 ];
            break;
        case "3":
            baseName = Y_time[ 0 ] + "-" + parts[ 1 ] + "-" + parts[ 0 ] + "__" + Y_time[ 1 ];
            break;
    }
    return baseName;
}

function changeDateFormatNoHours( baseName )
{
    var parts = baseName.split( "/" );
	//Исправляю формат даты
	if (parts[ 0 ] < 10)
	{
		parts[ 0 ] = "0"+parts[ 0 ];
	}
	if (parts[ 1 ] < 10)
	{
		parts[ 1 ] = "0"+parts[ 1 ];
	}
    switch ( Sett.dateFormat )
    {
        case "1":
            baseName = parts[ 0 ] + "/" + parts[ 1 ] + "/" + parts[ 2 ];
            break;
        case "2":
            baseName = parts[ 1 ] + "/" + parts[ 0 ] + "/" + parts[ 2 ];
            break;
        case "3":
            baseName = parts[ 2 ] + "-" + parts[ 1 ] + "-" + parts[ 0 ];
            break;
    }
    return baseName;
}

function save()
{
    if ( $( "#mssavebutton" )
        .prop( "disabled" ) )
    {
        console.log( "no tab selected" );
    }
    else
    {
        var name = $( "#savetitle" )
            .val() || "MySession";
        //localStorage.lastUsedSessionName = name;
        browser.windows.getAll(
        {
            populate: true
        }, function( failures )
        {
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
            var that = new background.SessionData( name, now );
            failures.forEach( function( win )
            {
                win.tabs.forEach( function( tab )
                {
                    var inputsPlugin = $( "#tabcheck_" +
                        tab.id );
						//console.log(tab);
                    if ( inputsPlugin )
                    {
                        if ( inputsPlugin.prop(
                                "checked" ) )
                        {
                            that.addTab(
                            {
                                url: tab.url,
                                title: tab.title,
                                win: win.id,
								pinned: tab.pinned,
								incognito: tab.incognito
                            } );
                        }
                    }
                } );
            } );
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
                        if ( !dataAndEvents )
                        {
                            alert( getMessage( "saveFail" ) );
                        }
                    } );
                }
            }
            window.close();
			createSessionList();
        } );
    }
	
}

async function closeAllTabs() 
{
    try 
	{
		//var tab0;
		let query = 
		{
            currentWindow: true
        };
        let tabs = await browser.tabs.query(query);
		
        browser.tabs.create({},function(tab)
			{
				console.log(tab.id);
				//localStorage.tab0 = tab.id;
				
			});
        
        for (let tab of tabs) {
            browser.tabs.remove(tab.id);
        }
		//console.log(tab0);
		
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

function OpenNewWindow(e)
{
    var window_n;
	console.log(e.target.id);
	if (e.originalEvent.which == 2)
			{
				window_n = 2;
			}
			else //Заглушка
			{
				window_n = 0;
			}
	try
    {
        var docSession = sessions[ e.target.id ];
		console.log(docSession);
		console.log(e );
        if ( docSession )
        {
			if(docSession.folderId)
			{
            loadSessionFromId( docSession.folderId, function( d )
            {
                    background.openDelayed( d, window_n );
                    window.close();
            } );
			}
			else
			{
			background.openDelayed( docSession, window_n );
                    window.close();
			}
        }
    }
    catch ( fmt )
    {
        console.error( fmt );
    }
}

function OpenPrivateWindow(e)
{
    var window_n;
	console.log(e.target.id);
	if (e.originalEvent.which == 2)
			{
				 window_n = 2;
			}
			else //Заглушка
			{
				 window_n = 0;
			}
	try
    {
        var docSession = sessions[ e.target.id ];
        if ( docSession )
        {
            loadSessionFromId( docSession.folderId, function( d )
            {
                    background.openprivateDelayed( d, window_n );
                    window.close();
            } );
        }
    }
    catch ( fmt )
    {
        console.error( fmt );
    }
}

function OpenCurrentWindow(e)
{
	console.log(e.target.id);
	//var tab0;
	closeAllTabs();
	AddCurrentWindow(e);
	
	
}

function AddCurrentWindow(e)
{
	console.log(e.target.id);
	try
    {
        var docSession = sessions[ e.target.id ];
        if ( docSession )
        {
            var window_n;
			if (e.originalEvent.which == 2)
			{
				 window_n = 3;
			}
			else
			{
				 window_n = 1;
			}
			console.log(window_n);
            loadSessionFromId( docSession.folderId, function( d )
            {
                if ( window_n == 1 && d.getWinCount() > 1 )
                {
                    if (Sett.DisableConfirm == false)
					{
						if ( confirm( getMessage( "confirmClose" ) ) )
						{
							d.open( window_n );
						}
					}
					else
					{
						d.open( window_n );
					}
                }
                else
                {
					console.log("Одно окно");
                    background.openDelayed( d, window_n );
					//setTimeout(browser.tabs.remove(parseInt(localStorage.tab0, 10)), 5000);
                    window.close();
                }
            } );
        }
		
    }
    catch ( fmt )
    {
        console.error( fmt );
    }
}

function SaveHere(e)
{
	console.log(e);
	console.log(e.target.parentNode.previousElementSibling);
	editedBlock = e.target.parentNode.previousElementSibling;
	editedSession = sessions[ e.target.id ];
	loadSessionFromId( editedSession.folderId, function( data )
    {
		console.log(data.title);
		$( "#savetitle" ).val(data.title);
		
		var udataCur = "Are you sure to replace this sessions?";
		//udataCur = getMessage( "confirmDeleteQuestion" );
		console.log("688");
		renderConfirmBox( udataCur, function( selfObj )
		{
			console.log(selfObj);
			if ( selfObj )
			{
				//var self = closest( e.target, "mssessionblock" );
				selfObj = sessions[ e.target.id ];
				$( "#msrestorelist .mssessionblock" )
					.remove();
				$( "#msrestorelist .nav" )
                .remove();
				if ( selfObj )
				{
					selfObj.remove( function()
					{
						sessions.splice( self.sessionId, 1 );
						createSessionList();
					} );
				}
				background.qsave(data.title);
			}
		} );
		
	});
	
	
}

async function GetSess() 
{
    try 
	{
		var stored = await browser.sessions.getRecentlyClosed({});
		console.log(stored);
		
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

function SelectTabs(e)
{
	//console.log(e.target.id);
	//var tab0;
	// closeAllTabs();
	// AddCurrentWindow(e);
	//GetSess();
	//browser.sessions.restore("5");
	editedSession = sessions[ e.target.id ];
	$( "#mseditlist1" )
        .empty();
	
	$( "#mslistoriginal" )
        .empty();
	loadSessionFromId( editedSession.folderId, function( data )
    {
        $( "#mseditsave" )
            .prop( "index", data.index );
        var i_window;
        for ( i_window in data.windows )
        {
            populateWin(
            {
                id: i_window,
                tabs: data.windows[ i_window ],
                label: data.labels[ i_window ]
            }, "mslistoriginal", true );
        }
        $( "#mslistoriginal input[type=checkbox]" )
            .prop( "checked", true );
        $( "#msrestorelist" )
            .hide();
        $( "#mseditsession" )
            .show()
            .animate(
            {
                left: "0%"
            }, 250, "swing", function()
            {
                $( "#mstitle" )
                    .val( data.title )
                    .focus()
                    .select();
            } );
		//Скрываем лишнее
		$( ".h4" )
            .hide();
		$( "#msheadingtitle" )
            .hide();
		$( "#mstitle" )
            .hide();
		$( "#msheadingsaved" )
            .hide();
		$( "#mseditsavedtoggle" )
            .hide();
		$( ".mseditHead" )
            .hide();
		$( "#mseditlist1" )
            .hide();
		$( "#mseditsave" )
            .hide();
		$( "#mseditremove" )
            .hide();
		//
        $( '#mseditsession input[type="checkbox"]' )
            .change( function()
            {
                var copyProp = $( "#mseditsession .mscheck:checked" )
                    .length == 0;
                $( "#mseditsave" )
                    .prop( "disabled", copyProp );
            } );
        $( function()
        {
            $( "#mseditlist1, #mslistoriginal" )
                .sortable(
                {
                    items: ".mstabline",
                    connectWith: ".mseditlist",
					helper: "clone"
                } )
                .disableSelection();
        } );
    } );
	
	
}

function AddCurrentWindowSelect()
{
	console.log("AddCurrentWindowSelect");
	if ( !$( "#mseditsave" )
        .prop( "disabled" ) && $( "#mstitle" )
        .val() )
    {
		console.log("AddCurrentWindowSelect1");
        var now = new Date();
			now = now.getMinutes();
            // now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			
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
        var self = new background.SessionData( $( "#mstitle" )
            .val(), now, 0, editedSession.folderId );
        $.each( $( "#mseditsession .winWrapper" ), function( dataAndEvents,
             elem )
        {
			console.log(dataAndEvents, elem, editedSession);
			//let len = 0;
            var $elem = $( elem );
            var windows = $elem.attr( "winId" );
            $.each( $elem.find( ".mscheck" ), function( dataAndEvents,
                 e )
            {
				console.log("111", e.length, elem.length, $.length);
				//background.setIcon(len++, editedSession.tabsCount);
                if ( e.checked )
                {
                    var tab = e.tab;
					console.log(tab);
                    if ( tab )
                    {
						
                        self.addTab(
                        {
                            url: tab.url,
                            title: tab.title,
                            win: windows,
							pinned: tab.pinned
                        } );
                    }
                }
            } );
        } );
		var cle = self.getCount();
        if ( cle > 0 )
        {
			background.openDelayed( self, 1 );
        }
        else
        {
			console.log("Ошибка добавления");
        }
        //editCancel();
        window.location.reload();
    }
        
}


function OpenNewWindowSelect()
{
	
}

function restoreSession( e )
{
	console.log(e);
	console.log(e.originalEvent.which);
	var e_button = e.button;
	var self = closest( e.target, "mssessionblock" );
	console.log(self);
	//localStorage.EditBlock = self;
	//console.log(localStorage.EditBlock);
	
	
  // if($('#nav'+self.id).css("display")=="block"){
				// $('#nav'+self.id).css("display", "none");
			// }
			// else{
				// $('#nav'+self.id).css("display", "block");
			// }
	if (e.originalEvent.which != 2)	//Если нажата не средняя кнопка
	{
		$('#nav'+self.id).toggle("fast");
		

		console.log($('.nav'));	

		$('.nav').not('#nav'+self.id).css("display", "none");
		//$('#nav'+self.id).toggle("fast");
		console.log($('#nav'+self.id)[0].clientHeight);
		
		if ($('#nav'+self.id)[0].clientHeight < 3)
		{
			console.log($('#nav'+self.id)[0].childNodes[5]);
			$( "#mssavelist" )
			.empty();
			
			self = closest( e.target, "mssessionblock" );
			console.log(self.nextSibling.childNodes);
			var editedSession = sessions[ self.sessionId ];
			//editedSession = sessions[ e.target.id ];
			console.log(e);
			console.log(editedSession);
		
			
			if(editedSession.folderId)
			{
			loadSessionFromId( editedSession.folderId, function( data )
			{
				// $( "#mseditsave" )
					// .prop( "index", data.index );
				var i_n;
				for ( i_n in data.windows )
				{
					populateWin(
					{
						id: i_n,
						tabs: data.windows[ i_n ],
						label: data.labels[ i_n ]
					}, "mssavelist", true );
				}
				
				//Скрываем лишнее
				 $( ".mscheck" )//Убираю чекбоксы рядом с вкладками
					 .hide();
				$( ".msdeltab" )//Убираю чекбоксы рядом с вкладками
					 .hide();
					 
				queue = $( "<div/>",
							{
								id: "session_",
								"class": "msmenu",
								text: editedSession.title,
								mousedown: stopDragEffect
							} )
							.prependTo( "#mssavelist" );	 
					 
				 
			} );
			}
			else
			{
				var i_n;
				for ( i_n in editedSession.windows )
				{
					populateWin(
					{
						id: i_n,
						tabs: editedSession.windows[ i_n ],
						label: editedSession.labels[ i_n ]
					}, "mssavelist", true );
				}
				
				//Скрываем лишнее
				 $( ".mscheck" )//Убираю чекбоксы рядом с вкладками
					 .hide();
				$( ".msdeltab" )//Убираю чекбоксы рядом с вкладками
					 .hide();
				for(i_n=2;i_n<6;i_n++)
				{
					$(self.nextSibling.childNodes[i_n]).hide();
				}
				//Скрываем лишнее
				$(".controls").hide();
					 
				queue = $( "<div/>",
							{
								id: "session_",
								"class": "msmenu",
								text: editedSession.title,
								mousedown: stopDragEffect
							} )
							.prependTo( "#mssavelist" );
			}
		}
			else
			{
				//init();
				$( "#mssavelist" )
					.empty();
				 var marcall = false;
    browser.windows.getLastFocused( function( item )
    {
        browser.windows.getAll(
        {
            populate: true
        }, function( results )
        {
            let act;
            results.forEach( function( act )
            {
                if ( item.id == act.id )
                {
                    act = true;
                }
				else
				{
					act = false;
				}
				if ( act.incognito && Sett.ShowPrivate == false )
				{
					console.log(act);
				}
				else
				{
					if( Sett.MarkAll == true)
					{
						marcall = true;
					}
					populateWin( act, "mssavelist", marcall, act );
					console.log("check"+item.id);
				}
            } );
            if ( results.length == 1 )
            {
                $( "#mssaveToggleH4" )
                    .hide();
            }
            if ( !marcall )
            {
                console.error(
                    "Cannot find last focused window" );
                $( "#mssavelistWrapper" + results[ 0 ].id +
                        " input[type=checkbox]" )
                    .prop( "checked", true );
            }
        } );
    } );
			}
		
		
	}
	else
	{
    try
    {
        var self = closest( e.target, "mssessionblock" );
        var docSession = sessions[ self.sessionId ];
        if ( docSession )
        {
            var e_button = e.button;
			console.log(e.button);
            if ( e.ctrlKey || e.metaKey )
            {
                e_button = 1;
            }
			else //Заглушка
			{
				e_button = 0;
			}
			console.log(e_button);
            loadSessionFromId( docSession.folderId, function( d )
            {
                if ( e_button == 1 && d.getWinCount() > 1 )
                {
					if (Sett.DisableConfirm == false)
					{
						if ( confirm( getMessage( "confirmClose" ) ) )
						{
							d.open( e_button );
						}
					}
					else
					{
						d.open( e_button );
					}
                }
                else
                {
                    background.openDelayed( d, e_button );
                    window.close();
                }
            } );
        }
    }
    catch ( fmt )
    {
        console.error( fmt );
    }
	}
}

function stopDragEffect( event )
{
    event.preventDefault();
    event.stopPropagation();
}

function showTooltip( e )
{
    var marginDiv = closest( e.target, "mssessionblock" )
        .querySelector( ".tooltip" );
    marginDiv.textContent = e.target.getAttribute( "title" );
    marginDiv.style.marginRight = e.target.parentNode.offsetWidth - e.target.offsetLeft -
        16 + "px";
}

function hideTooltip( e )
{
    closest( e.target, "mssessionblock" )
        .querySelector( ".tooltip" )
        .textContent = "";
}

function renameChange( deepDataAndEvents )
{
    if ( deepDataAndEvents.keyCode == 13 )
    {
        editSave( deepDataAndEvents );
    }
}

function loadSessionFromId( storageKey, getter )
{
    function save( obj, db, callback )
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
                browser.bookmarks.getChildren( data.id, function( failures )
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
    browser.bookmarks.get( storageKey, function( results )
    {
        var tags = results[ 0 ].title.match(/^(.*)\((\d+\/\d+\/\d+\_\d+\:\d+)\)--(\d+)tabs$/i);
		if (tags == null)
		{
			tags = results[ 0 ].title.match(/^(.*)\((\d+\/\d+\/\d+)\)--(\d+)tabs$/i );
		}
        var data = new background.SessionData( tags[ 1 ].trim(), tags[
            2 ], tags[ 3 ], results[ 0 ].id );
        if ( Sett.editOrder == false )
        {
            data.index = results[ 0 ].index;
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

function edit( e )
{
	e = closest( e.target, "mssessionblock" );
    editedSession = sessions[ e.sessionId ];
    editedBlock = e;
    $( "#mseditlist1" )
        .empty();
	//Скрываем лишнее (возвращаем)
		$( ".h4" )
            .show();
		$( "#msheadingtitle" )
            .show();
		$( "#mstitle" )
            .show();
		$( "#msheadingsaved" )
            .show();
		$( "#mseditsavedtoggle" )
            .show();
		$( ".mseditHead" )
            .show();
		$( "#mseditlist1" )
            .show();
		$( "#mseditsave" )
            .show();
		$( "#mseditremove" )
            .show();
			
			
		//
    browser.windows.getLastFocused( function( item )
    {
        browser.windows.getAll(
        {
            populate: true
        }, function( failures )
        {
            failures.forEach( function( act )
            {
				console.log(act);
                populateWin( act, "mseditlist1", item.id ==
                    act.id );
            } );
            $( "#mseditlist1 input[type=checkbox]" )
                .prop( "checked", false );
        } );
    } );
    $( "#mslistoriginal" )
        .empty();
    loadSessionFromId( editedSession.folderId, function( data )
    {
        $( "#mseditsave" )
            .prop( "index", data.index );
        var i_n;
        for ( i_n in data.windows )
        {
            populateWin(
            {
                id: i_n,
                tabs: data.windows[ i_n ],
                label: data.labels[ i_n ]
            }, "mslistoriginal", true );
        }
        $( "#mslistoriginal input[type=checkbox]" )
            .prop( "checked", true );
        $( "#msrestorelist" )
            .hide();
        $( "#mseditsession" )
            .show()
            .animate(
            {
                left: "0%"
            }, 250, "swing", function()
            {
                $( "#mstitle" )
                    .val( data.title )
                    .focus()
                    .select();
            } );
        $( '#mseditsession input[type="checkbox"]' )
            .change( function()
            {
                var copyProp = $( "#mseditsession .mscheck:checked" )
                    .length == 0;
                $( "#mseditsave" )
                    .prop( "disabled", copyProp );
            } );
        $( function()
        {
            $( "#mseditlist1, #mslistoriginal" )
                .sortable(
                {
                    items: ".mstabline",
                    connectWith: ".mseditlist",
					helper: "clone"
                } )
                .disableSelection();
        } );
    } );
	$( "<div/>",
					{
						// id: i
						 "class": "msmenu",
						text: getMessage("Add to current window."),
						mousedown: AddCurrentWindowSelect
					} ).hide();
}

function editSave()
{
    if ( !$( "#mseditsave" )
        .prop( "disabled" ) && $( "#mstitle" )
        .val() )
    {
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
        var self = new background.SessionData( $( "#mstitle" )
            .val(), now, 0, editedSession.folderId );
        $.each( $( "#mseditsession .winWrapper" ), function( dataAndEvents, elem )
        {
			console.log("111", $, dataAndEvents, elem);
            var $elem = $( elem );
            var windows = $elem.attr( "winId" );
            $.each( $elem.find( ".mscheck" ), function( dataAndEvents, e )
            {
				console.log("222", $, dataAndEvents, e);
                if ( e.checked )
                {
                    var tab = e.tab;
					console.log(tab);
                    if ( tab )
                    {
                        self.addTab(
                        {
                            url: tab.url,
                            title: tab.title,
                            win: windows,
							pinned: tab.pinned,
							incognito: tab.incognito
                        } );
                    }
                }
            } );
        } );
        var get_count = self.getCount();
        if ( get_count > 0 )
        {
            self.update( function( dataAndEvents )
                {
                    if ( dataAndEvents )
                    {
                        $( editedBlock )
                            .find( ".mssessiontitle" )
                            .text( self.title );
                        $( editedBlock )[ 0 ].sessionId = self.id;
                        $( editedBlock )
                            .find( ".mssessioncount" )
                            .text( getMessage( "tabsCount", [ get_count ] ) );
                        delete sessions[ editedSession.id ];
                        sessions[ self.sessionId ] = self;
                    }
                    else
                    {
                        alert( "Update faile, try again later." );
                    }
                }, $( "#mseditsave" )
                .prop( "index" ) );
        }
        else
        {
            remove(
            {
                target: editedBlock
            } );
        }
        editCancel();
        window.location.reload();
    }
}

function editCancel()
{
    $( "#mseditsession" )
        .animate(
        {
            left: "100%"
        }, 250, "swing", function()
        {
            $( "#mseditsession" )
                .hide();
            $( "#msrestorelist" )
                .show();
        } );
		//init();
}

function editRemove()
{
    remove(
    {
        target: editedBlock
    } );
    editCancel();
}

function sortSessions(sessions)//Сортируем сессии
{
	if (Sett.SortTitle)
	{
		console.log("сортировка");
		sessions.sort(compare);
	}
	else
	{
		console.log("сортировка по дате");
		sessions.sort(compareDate);
		console.log(sessions);
	}
}

function findSession(selfObj)// Поиск и удаление сессии из закладок и массива в бэкграунде
{
	sessions = background.returnSessions();//Забираем список сессий из бэкграунд
	console.log(sessions);
	sortSessions(sessions);//Сортируем сессии
	for (var i = 0; i < sessions.length; i++)
	{
		console.log(i);
		//console.log(session);
		if (sessions[i].folderId == selfObj.folderId)
		{
			//return i;
			console.log(i);
			
			browser.bookmarks.removeTree(selfObj.folderId);
				console.log('Удаляемая сессия');
				console.log(sessions[i]);
				sessions.splice( i, 1 );
				console.log(sessions);
				background.popupSessions(sessions);
				createSessionList();
			
		}
	}
}

function remove( e )
{
	//sessions = background.returnSessions();//Забираем список сессий из бэкграунд
	console.log(sessions);
	if (Sett.DisableConfirmation == true)
	{
		var self = closest( e.target, "mssessionblock" );
		console.log(self);
        var selfObj = sessions[ self.sessionId ];
		console.log(selfObj);
        
		findSession(selfObj);
        if ( selfObj )
		{
			//browser.bookmarks.removeTree(selfObj.folderId);
			
			// selfObj.remove( function()
			// {
				// sessions.splice( self.sessionId, 1 );
				// console.log('Удаляемая сессия');
				// console.log(sessions[ self.sessionId ]);
				// createSessionList();
			// } );
		}
        $( "#msrestorelist .mssessionblock" )
            .remove();
		$( "#msrestorelist .nav" )
                .remove();
		createSessionList();
	}
	else
	{
    var udataCur = "Are you sure to remove this sessions?";
    udataCur = getMessage( "confirmDeleteQuestion" );
    renderConfirmBox( udataCur, function( selfObj )
    {
        if ( selfObj )
        {
            var self = closest( e.target, "mssessionblock" );
			console.log(self);
            selfObj = sessions[ self.sessionId ];
			console.log(selfObj);
            
			findSession(selfObj);
            if ( selfObj )
            {
				//sessions = background.returnSessions();//Забираем список сессий из бэкграунд
                // selfObj.remove( function()
                // {
					// console.log(sessions);
                    // sessions.splice( self.sessionId, 1 );
                    // createSessionList();
                // } );
            }
            $( "#msrestorelist .mssessionblock" )
                .remove();
			$( "#msrestorelist .nav" )
                .remove();
			createSessionList();
        }
    } );
	}
}

function renderConfirmBox( value, $sanitize )
{
    var container = $( "#msrestorebase" );
    var pres = $( "<div>",
        {
            "class": "confirmBox",
            style: "display:none"
        } )
        .appendTo( container );
    pres.fadeIn();
    container = $( "<div>",
    {
        "class": "messageBox"
    } );
    container.html( value );
    container.appendTo( pres );
    container = $( "<div>",
    {
        "class": "confirmButton"
    } );
    container.html( getMessage( "confirm" ) );
    container.click( function()
    {
        $sanitize( true );
        pres.remove();
    } );
    container.appendTo( pres );
    container = $( "<div>",
    {
        "class": "cancelButton"
    } );
    container.html( getMessage( "cancel" ) );
    container.click( function()
    {
        $sanitize( false );
        pres.remove();
    } );
    container.appendTo( pres );
}

function closest( el, type )
{
    for ( ; el && el.className.indexOf( type ) < 0; )
    {
        el = el.parentNode;
    }
    return el;
}

function saveToggle()
{
    var inputsPlugin = $( '#mssavelist input[type="checkbox"]' );
    if ( $( mssavetoggle )
        .prop( "checked" ) )
    {
        inputsPlugin.prop( "checked", true );
    }
    else
    {
        inputsPlugin.prop( "checked", false );
    }
    $( "#mssavebase .mscheck" )
        .change();

}

function exportSession( e )
{
    e = closest( e.target, "mssessionblock" );
    if ( e = sessions[ e.sessionId ] )
    {
        loadSessionFromId( e.folderId, function( deepDataAndEvents )
		{
			if(Sett.ListURL)
			{
				deepDataAndEvents = deepDataAndEvents.toList();
				showExportedSessionAsText( deepDataAndEvents );
			}
			else
			{
				deepDataAndEvents = deepDataAndEvents.toJson();
				showExportedSessionAsText( deepDataAndEvents );
			}
        } );
    }
}

function showExportedSessionAsText( deepDataAndEvents )
{
    $( "#sessionTextBoxTips" )
        .html( getMessage( "exportedSessionCopyTips" ) );
    $( "#importSessionBtn" )
        .hide();
    $( "#sessionTextBox" )
        .fadeIn();
		if (Sett.ListURL)
		{
			let deepDataAndEvents_n = 0;
			let str = "";
            for (; deepDataAndEvents_n < deepDataAndEvents.length; deepDataAndEvents_n++)
			{
				str = str + deepDataAndEvents[deepDataAndEvents_n] + "\n";
				console.log(str);
			}
			console.log(str);
			$( "#sessionTextBoxTextArea" )[ 0 ].value = str;
		}
		else
		{
			$( "#sessionTextBoxTextArea" )[ 0 ].value = deepDataAndEvents;
		}
    
    $( "#sessionTextBoxTextArea" )[ 0 ].select();
}

function importSession()
{
    var sessionTextBox_n = $( "#sessionTextBoxTextArea" )
        .val();
    var model;
    var data_sessions;
    try
    {
        data_sessions = JSON.parse( sessionTextBox_n );
        model = new background.SessionData( data_sessions.title, data_sessions.date );
        data_sessions.tabs.forEach( function( scope )
        {
            model.addTab( scope );
        } );
    }
    catch ( dic )
    {
        
		model = new background.SessionData();
        sessionTextBox_n = sessionTextBox_n.split( "\n" );
        data_sessions = new Date();
        
			data_sessions = data_sessions.getMinutes();
			
			if (data_sessions < 10)
			{
				data_sessions = new Date();
				data_sessions = data_sessions.getDate() + "/" + (data_sessions.getMonth() + 1) + "/" + (data_sessions.getYear() + 1900)+"_"+data_sessions.getHours()+":" + "0" +data_sessions.getMinutes();
			}
			else
			{
				data_sessions = new Date();
				data_sessions = data_sessions.getDate() + "/" + ( data_sessions.getMonth() + 1 ) + "/" + ( data_sessions.getYear() + 1900 )+"_"+data_sessions.getHours()+":"+data_sessions.getMinutes();
			}
        var title_sess = "";
        var url_sess = "";
        var i_n = 0;
        for ( ; i_n < sessionTextBox_n.length; i_n++ )
        {
            if ( sessionTextBox_n[ i_n ].indexOf( "Name: " ) > -1 )
            {
                model.title = sessionTextBox_n[ i_n ].replace( "Name: ", "" ) ||
                    "imported session";
            }
            else
            {
                if ( sessionTextBox_n[ i_n ].indexOf( "Date: " ) > -1 )
                {
                    model.date = sessionTextBox_n[ i_n ].replace( "Date: ", "" ) || data_sessions;
                }
                else
                {
                    if ( sessionTextBox_n[ i_n ].indexOf( "Title: " ) > -1 )
                    {
                        title_sess = sessionTextBox_n[ i_n ].replace( "Title: ", "" );
                    }
                    else
                    {
                        if ( sessionTextBox_n[ i_n ].indexOf( "Url: " ) > -1 )
                        {
                            url_sess = sessionTextBox_n[ i_n ].replace( "Url: ", "" );
                        }
                    }
                }
            }
            if ( title_sess != "" )
            {
                if ( url_sess != "" )
                {
                    model.addTab(
                    {
                        url: url_sess,
                        title: title_sess,
                        win: "_win"
						
                    } );
                    title_sess = url_sess = "";
                }
            }
        }
    }
    model.save();
    $( "#sessionTextBox" )
        .fadeOut();
    window.close();
}

//browser.storage.onChanged.addListener(InitSettings);

function showImportSessionBox()
{
    $( "#sessionTextBoxTips" )
        .html( getMessage( "importedSessionTips" ) );
    $( "#importSessionBtn" )
        .show();
    $( "#sessionTextBoxTextArea" )
        .val( "" );
    $( "#sessionTextBox" )
        .fadeIn();
    $( "#sessionTextBoxTextArea" )
        .focus();
}


function searchHighlight()
{
	$('#msrestorelistwrapper').removeHighlight();
		 let txt = $('#savetitle').val();
		 if (txt == '') return;
		 $('#msrestorelistwrapper').highlight(txt);
		 console.log($('#msrestorelistwrapper span.highlight').length);
		 //var search_count = $('#msrestorelistwrapper .highlight').length - 1;
		// var count_text = search_count + 1;
		 //var search_number = 0;
}

//Берем название вкладки
async function getCurrentTabName() {
  let tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  });

  if (tabs[0] == undefined) return "";

  
    return await tabs[0].title;
  
}

async function GetSessionTitle()
{
    var Time;
	SessionTitle = " ";
	let tabname = await getCurrentTabName();
	let Date1 = new Date();
	Date1 = Date1.getDate() + "/" + (Date1.getMonth() + 1) + "/" + (Date1.getYear() + 1900);
	let now = new Date();
	now = now.getMinutes();
	if (now < 10)
			{
				 Time = new Date();
				Time = Time.getHours()+":" + "0" +Time.getMinutes();
				console.log(Time);
			}
			else
			{
				 Time = new Date();
				Time = Time.getHours()+":"+Time.getMinutes();
				console.log(Time);
			}
	console.log(SessionTitle);
	console.log(changeDateFormatNoHours(Date1));
	console.log(Time);
	console.log(tabname);
	if(Sett.Prefix == false && Sett.Title == false && Sett.Date1 == false && Sett.Time == false && Sett.Suffix == false)
	{
		SessionTitle = "MySession";
		console.log(SessionTitle);
	}
	if (Sett.Prefix == true)
	{
		SessionTitle = SessionTitle + Sett.Stringprefix;
	}
	console.log(Sett.Title);
	if (Sett.Title == true)
	{
		if (Sett.Prefix == true)
		{
			SessionTitle = SessionTitle + "_" + tabname;
		}
		else
		{
			SessionTitle = SessionTitle + tabname;
			console.log(SessionTitle);
		}
	}
	console.log(SessionTitle);
	if(Sett.Date1 == true)
	{
		if (Sett.Prefix == true || Sett.Title == true)
		{
			SessionTitle = SessionTitle + "_" + changeDateFormatNoHours(Date1);
		}
		else
		{
			SessionTitle = SessionTitle + changeDateFormatNoHours(Date1);
		}
	}
	if(Sett.Time == true)
	{
		if (Sett.Prefix == true || Sett.Title == true || Sett.Date1 == true)
		{
			SessionTitle = SessionTitle + "_" + Time;
		}
		else
		{
			SessionTitle = SessionTitle + Time;
		}
	}
	if(Sett.Suffix == true)
	{
		if (Sett.Prefix == true || Sett.Title == true || Sett.Date1 == true || Sett.Time == true)
		{
			SessionTitle = SessionTitle + "_" + Sett.Stringsuffix;
		}
		else
		{
			SessionTitle = SessionTitle + Sett.Stringsuffix;
		}
	}
	console.log(SessionTitle);
}

//======================================================================================
//Групповое выделение чекбоксов
var mdown = false;//Левая кнопка мыши (не нажата)

$(document)
    .on('mousedown', function() {
        
            mdown = true;//Левая кнопка мыши нажата.
        
    });
$(document)
    .on('mouseup', function() {
        mdown = false;//Левая кнопка мыши не нажата.
    });
$( document )
    .on('mouseenter', 'input[type="checkbox"]', function() {
        
            if (mdown) {
                $(this)
                    .click();
            }
        
    });
$( document )
    .on('mouseenter', '.mstabline', function() {
        
            if (mdown) {
                $(this.childNodes[1])
                    .click();
            }
        
    });
// $( document ).on('mousedown mouseenter click', 'input[type="checkbox"]', function() {
				
				// console.log(11);        
						// $(this)
							// .click();
				   
			// });

$( document )
    .ready( function()
    {
        $( "#mssavebutton" )
            .click( function()
            {
                save();
            } );
		$( "select" )
            .change( function()
            {
                console.log($("select").val());
				optionlist = $("select").val();
				$( "#msrestorelist .mssessionblock" )
                .remove();
				$( "#msrestorelist .nav" )
                .remove();
				createSessionList();
				//separateSession($("select").val());
            } );
        $( "#mssavetoggle" )
            .click( function()
            {
                saveToggle();
            } );
        $( "#mstitle" )
            .keypress( function( deepDataAndEvents )
            {
                renameChange( deepDataAndEvents );
            } );
        $( "#mseditnewtoggle" )
            .click( function()
            {
                var isChecked = $( this )
                    .prop( "checked" );
                $( '#mseditlist1 input[type="checkbox"]' )
                    .prop( "checked", isChecked );
                $( "#mseditsession .mscheck" )
                    .change();
            } );
        $( "#mseditsavedtoggle" )
            .click( function()
            {
                var isChecked = $( this )
                    .prop( "checked" );
                $( '#mslistoriginal input[type="checkbox"]' )
                    .prop( "checked", isChecked );
                $( "#mseditsession .mscheck" )
                    .change();
            } );
        $( "#mseditsave" )
            .click( function()
            {
                editSave();
            } );
        $( "#mseditcancel" )
            .click( function()
            {
                editCancel();
            } );
        $( "#mseditremove" )
            .click( function()
            {
                editRemove();
            } );
		$( "#msselecttab" )
            .click( function()
            {
                AddCurrentWindowSelect();
            } );
        $( "#msrestoreicon2" )
            .click( function()
            {
                browser.tabs.create(
                {
                    url: "options.html"
                } );
				window.close();
            } );
		$( "#msopentab" )
            .click( function()
            {
                browser.tabs.create(
                {
                    url: "popup.html"
                } );
				window.close();
            } );
		$( "#ChangeTheme" )
            .click( function()
            {
				let theme;
				if(Sett.DarkTheme == true)
				{
					theme = "light";
					Sett.DarkTheme = false;
				  }
				  else{
					theme = "dark";
					Sett.DarkTheme = true;
				  }
				console.log(theme);
                document.documentElement.classList.add('color-theme-in-transition');
				document.documentElement.setAttribute('theme', theme);
				window.setTimeout(function() {
				  document.documentElement.classList.remove('color-theme-in-transition');
				}, 1000);
				console.log(document.documentElement);
				console.log(Sett);
				browser.storage.local.set(
				{
				'settings':Sett
				});
            } );
		$( "#qu" )
            .click( function()
            {
                browser.tabs.create(
                {
                    url: "logo.html"
                } );
				window.close();
            } );
        $( "#importBtn" )
            .click( function()
            {
                showImportSessionBox();
            } );
        $( "#msrestorecrash" )
            .click( function()
            {
                crashRestore();
            } );
        $( "#sessionTextBoxCloseBtn" )
            .click( function()
            {
                $( "#sessionTextBox" )
                    .fadeOut();
            } );
        $( "#importSessionBtn" )
            .click( function()
            {
                importSession();
            } );
		$( "#importSessionBtnf" )
            .click( function()
            {
				browser.tabs.create(
                {
                    url: "load.html"
                } );
				window.close();
            } );
		$( "#SMBtn" )
            .click( function()
            {
				browser.tabs.create(
                {
                    url: "sm2.html"
                } );
				window.close();
            } );
		//setSetting();
		//SessionTitle = GetSessionTitle();
		Sett = background.returnSettings();
		GetSessionTitle().then(init);
        //init();
		$('#msrestorelistwrapper').highlight('MySession');
		$('#savetitle').bind('keyup oncnange mousemove', function() {
			searchHighlight();
		 // $('#msrestorelistwrapper').removeHighlight();
		 // txt = $('#savetitle').val();
		 // if (txt == '') return;
		 // $('#msrestorelistwrapper').highlight(txt);
		 // console.log($('#msrestorelistwrapper span.highlight').length);
		 // var search_count = $('#msrestorelistwrapper .highlight').length - 1;
		 // var count_text = search_count + 1;
		 // var search_number = 0;
		 //$('#msrestorelistwrapper').selectHighlight(search_number);
		 //if ( search_count &gt;= 0 ) scroll_to_word();
		 //$('#count').html('Найдено: &lt;b&gt;'+count_text+'&lt;/b&gt;');
		 });
		 
		 // $('input[type="checkbox"]')
			// .each(function() {
				// console.log($(this));
					
			// });
		 
		 // $('input[type="checkbox"]')
			// .mouseenter(function() {
				// console.log(1);
						// $(this)
							// .click();
				  
			// });
			
		// $('#mssavelist input[type="checkbox"]')
			// .on('mousedown mouseenter click', 'input[type="checkbox"]', function() {
				
				// console.log(11);        
						// $(this)
							// .click();
				   
			// });
			
		// $('input[type="checkbox"]')
			// .click(function(e) {
				// console.log(111);
					// $(this)
						// .click();
		// });
       
    
    } );

