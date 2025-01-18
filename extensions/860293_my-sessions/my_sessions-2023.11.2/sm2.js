var background = browser.extension.getBackgroundPage();
var sessions = [];
var sessionsSave = [];// все сессии
var ownsession = [];//Выбранные сессии
console.log("222");
//var editedSession;
//var editedBlock;
//var allWindows = [];
var Setting_n = {};
var importkey = false;

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
	console.log(data);
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
	$( "<span/>",
        {
            "class": "mswspan",
            text:"("+data.length+" tabs)"
        } )
        .appendTo( wspan );
    
    tit = 0;
    for ( ; tit < data.length; tit++ )
    {
        var ecli = data[ tit ];
			ecli = background.ITitleUrl(ecli);//Исправляю заголовок и урл
        var rightDiv = $( "<div/>",
            {
                "class": "mstabline",
                title: ecli.title == ecli.url ? ecli.title : ecli.title + " : " + ecli.url
            } )
            .appendTo( li );
		var img = $("<img/>",
                {
					"class": "msicon",
					//Вернуть сюда нормальную иконку
					src: Setting_n.ShowFavicon ? "https://icons.duckduckgo.com/ip3/" + extractHostname(ecli.url) + ".ico" : "/img/firefox.png"
                    //src: "http://www.google.com/s2/favicons?domain_url=" + extractHostname(e.url)
					//src: e.favIconUrl
                }).appendTo( rightDiv );
				//console.log("FAVICON "+e.favIconUrl);
        $( "<input/>",
            {
                id: "tabcheck_" + ecli.id,
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
            .appendTo( rightDiv )[ 0 ].tab = ecli;
		
			
        if ( id == "mslistoriginal" )
        {
            $( "<span/>",
                {
                    "class": "mstablabel",
                    text: ecli.title,
                    link: ecli.url,
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
					id: dataid + "_" + ecli.id,
                    "class": "mstablabel",
                    text: ecli.title,
					click: moveToTab
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

function setSetting()
{
InitSettings().then(function () {
    changeBackupSetting();
	console.log(Setting_n);
});
}

function init()
{
	Setting_n = background.returnSettings();
	console.log(Setting_n);
    $( "#spanimportfile" )
        .html( getMessage( "spanimportfile" ) );
    $( "#exportmsfile" )
        .html( getMessage( "exportmsfile" ) );
    $( "#deletsessions" )
        .html( getMessage( "deletsessions" ) );
    $( "#savetostorage" )
        .html( getMessage( "savetostorage" ) );
    $( "#SM" )
        .html( getMessage( "SM" ) );
	$( "#WARNING" )
        .html( getMessage( "WARNING" ) );
    // $( "#mseditnewtoggle" )
        // .attr( "title", getMessage( "msSaveToggle" ) );
    // $( "#mseditsavedtoggle" )
        // .attr( "title", getMessage( "msSaveToggle" ) );
    // $( "#msrestorelabel" )
        // .html( getMessage( "restoreSession" ) );
    // $( "#msrestorelabel2" )
        // .html( getMessage( "restoreSession2" ) );
    // $( "#msheadingtitle" )
        // .html( getMessage( "msHeadingTitle" ) );
    // $( "#msheadingnew" )
        // .html( getMessage( "msHeadingNew" ) );
	// $( "#msselecttab" )
        // .html( getMessage( "AddCurrentWindow" ) );
    // $( "#msheadingnew" )
        // .attr( "title", getMessage( "msHeadingNewTitle" ) );
    // $( "#msheadingsaved" )
        // .html( getMessage( "msHeadingSaved" ) );
    // $( "#mseditsave" )
        // .attr( "value", getMessage( "msEditSave" ) );
    // $( "#mseditcancel" )
        // .attr( "value", getMessage( "msEditCancel" ) );
    // $( "#mseditremove" )
        // .attr( "value", getMessage( "remove" ) );
    // $( "#options" )
        // .html( getMessage( "options" ) );
    // $( "#sessionTextBoxCloseBtn" )
        // .attr( "title", getMessage( "sessionTextBoxClose" ) );
    // $( "#importSessionBtn" )
        // .attr( "title", getMessage( "sessionTextBoxImport" ) );
	// $( "#mssavebutton" )
        // .attr( "title", getMessage( "save" ) );
	// $( "#msrestoreicon2" )
        // .attr( "title", getMessage( "options" ) );
	// $( "#msopentab" )
        // .attr( "title", getMessage( "msopentab" ) );
    // $( selectAll )
        // .text( getMessage( "selectAll" ) );
    // if ( localStorage.lastUsedSessionName )
    // {
        // $( "#savetitle" )
            // .val( localStorage.lastUsedSessionName );
    // }

    // var a = false;
    // browser.windows.getLastFocused( function( item )
    // {
        // browser.windows.getAll(
        // {
            // populate: true
        // }, function( results )
        // {
            // results.forEach( function( act )
            // {
				// console.log(act);
                // if ( item.id == act.id )
                // {
                    // b = true;
					// a = true;
                // }
				// else
				// {
					// b = false;
					// a = false;
				// }
				// if ( act.incognito && S.ShowPrivate === false )
				// {
					// console.log(act);
				// }
				// else
				// {
					// if( S.MarkAll === true)
					// {
						// a = true;
						// populateWin( act, "mssavelist", a, b );
						// console.log("check"+item.id);
						// SetHeight(act);
					// }
					// else
					// {
						// populateWin( act, "mssavelist", a, b );
						// console.log("check"+item.id);
						// SetHeight(act);
					// }
					
				// }
            // } );
            // if ( results.length == 1 )
            // {
                // $( mssaveToggleH4 )
                    // .hide();
            // }
            // if ( !a )
            // {
                // console.error(
                    // "Cannot find last focused window" );
                // $( "#mssavelistWrapper" + results[ 0 ].id +
                        // " input[type=checkbox]" )
                    // .prop( "checked", true );
            // }
        // } );
    // } );
	
	console.log("233");
    // background.initSession( function( dataAndEvents )
    // {
		// console.log("Список");
        // sessions = dataAndEvents;
		// console.log(sessions);
		
        // createSessionList();
    // } );
	$( "#savetostorage" )
         .hide();
	$( "#progressbar" )
         .hide();
	$( "#progressDiv" )
         .hide();
	$( "#exportmsfile" )
         .show();
	$( "#deletsessions" )
         .show();
	sessions = background.returnSessions();
	createSessionList();
	$("#loader-identity").show("slow");
	setTimeout(function(){$("#loader-identity").hide()}, 10000);
	createSessionSaveList();
	// $( "#mssavetoggle" )
		// .prop( "checked", true );
	//saveToggle();
	console.log(sessions);
	console.log("243");
	document.getElementById("import").addEventListener("change", importSessions, false);
	document.getElementById("importTSM").addEventListener("change", importSessionsTSM, false);
	
	
    
}



function dateConvert(date)
{
	if (typeof date === "number")
	{
		console.log(date);
		return date;
	}
	var date1 = date.split("_");
	console.log(date1);
	var date2 = date1[0].split("/");
	if (date2[ 0 ] < 10)
	{
		date2[ 0 ] = "0"+date2[ 0 ];
	}
	if (date2[ 1 ] < 10)
	{
		date2[ 1 ] = "0"+date2[ 1 ];
	}
	console.log(date2);
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
	console.log(date3);
	date3 = Date.parse(date3);
	console.log(date3);
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
	console.log(a);
	b = dateConvert(b.date);
	console.log(b);
  if (a > b)
    return -1;
  if (a < b)
    return 1;
  return 0;
}


function createSessionList()
{
	$( "#msrestorelist" )
        .empty();
	
	$( "#mslistoriginal" )
        .empty();
	
	if (importkey)
	{
		sessions = sessionsSave;
	}
	else
	{
	sessions = background.returnSessions();//Забираем список сессий из бэкграунд
	}
	console.log(sessions);
	if (Setting_n.SortTitle)
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
        var queue = $( "<div/>",
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
			var user = sessions[ i_n ];
			//console.log(dateConvert(user.date));
			//console.log(user);
			//console.log(S.ShowAutoSave);
			//console.log(user.title.indexOf("AutoSave_"));
			if ((Setting_n.ShowAutoSave != true )  && user.title.indexOf("AutoSave_") === 0)
			{
				console.log("AS");
			}
			else
			{
				
				queue = $( "<div/>",
					{
						id: "session_" + i_n,
						"class": "mssessionblock"
						//, title: getMessage( "clickToRestore", [ user.title ] )
						//, mousedown: stopDragEffect
					} )
					.appendTo( elem );
				queue[ 0 ].sessionId = i_n;
				//Добавляем меню к каждой сессии
				// nav = $( "<div/>"
					// , {
						// id: "nav"+"session_" + i
						// , "class": "nav"
						// , style: "display:none;"
						// , title: getMessage("LeftSequentiallyMiddleTogether")
						// , mousedown: restoreSession
					// } )
					// .appendTo( elem );
				// menu = $( "<div/>"
					// , {
						// id: i
						// , "class": "msmenu"
						// , text: getMessage("OpenNewWindow")
						// , mousedown : OpenNewWindow
					// } )
					// .appendTo( nav );
				// $( "<div/>"
					// , {
						// id: i
						// , "class": "msmenu"
						// , text: getMessage("OpenCurrentWindow")
						// , mousedown: OpenCurrentWindow
					// } )
					// .appendTo( nav );
				// $( "<div/>"
					// , {
						// id: i
						// , "class": "msmenu"
						// , text: getMessage("AddCurrentWindow")
						// , mousedown: AddCurrentWindow
					// } )
					// .appendTo( nav );
				// $( "<div/>"
					// , {
						// id: i
						// , "class": "msmenu"
						// , text: getMessage("SaveHere")
						// , mousedown: SaveHere
					// } )
					// .appendTo( nav );
				// $( "<div/>"
					// , {
						// id: i
						// , "class": "msmenu"
						// , text: getMessage("SelectTabs")
						// , mousedown: SelectTabs
					// } )
					// .appendTo( nav );
				//Конец меню
				var check = $( "<div/>"
					, {
						//"class": "mssessionlabel"
						//, mousedown: showTabs
					} )
					.appendTo( queue );
				$( "<input/>",
					{
						id: "tabcheck_" + i_n,
						"class": "mscheck",
						type: "checkbox",
						checked: false,
						change: function()
						{
							if ( $( this )
								.prop( "checked" ) === true )
							{
								$("#mssavetoggle").prop( "checked", true );
							}
						}
					} )
					.appendTo( check );
				var q_ssessionlabel = $( "<div/>",
					{
						"class": "mssessionlabel",
						mousedown: showTabs
					} )
					.appendTo( queue );
				
				$( "<div/>",
					{
						"class": "mssessiontitle",
						text: user.title
					} )
					.appendTo( q_ssessionlabel );
				$( "<div/>",
					{
						"class": "mssessioncount",
						text: getMessage( "tabsCount", [ user.tabsCount.toString() ] )
					} )
					.appendTo( q_ssessionlabel );
				$( "<div/>",
					{
						"class": "mssessiontimelabel",
						text: changeDateFormat( user.date ),
						mousedown: showTabs
					} )
					.appendTo( queue );
				// queue = $( "<div/>"
					// , {
						// "class": "controls"
					// } )
					// .appendTo( queue );
				// $( "<div/>"
					// , {
						// "class": "control mssessionremove"
						// , title: getMessage( "remove" )
						// , click: remove
					// } )
					// .appendTo( queue );
				// $( "<div/>"
					// , {
						// "class": "control mssessionedit"
						// , title: getMessage( "edit" )
						// , click: edit
					// } )
					// .appendTo( queue );
				// $( "<div/>"
					// , {
						// "class": "control mssessionexport"
						// , title: getMessage( "export" )
						// , click: exportSession
					// } )
					// .appendTo( queue );
					
				//
				
			}
        }
    }
	$( "#savetitle" )
        .val( getMessage( "mySession" ) );
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
    switch ( Setting_n.dateFormat )
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

function changeDateFormatLabel( baseName )
{
	console.log(baseName);
    var parts = baseName.split( "." );
	if (!parts[2])
	{
		parts = baseName.split( "/" );
	}
	var Y_time = parts[2].split(",");
	if (parts[2].indexOf(",") == -1)
	{
		Y_time = parts[2].split(" ");
	}
	if(Y_time[1] == undefined)
	{
		Y_time[1] = "00:00";
	}
    switch ( Setting_n.dateFormat )
    {
        case "1":
            baseName = parts[ 0 ] + "." + parts[ 1 ] + "." + Y_time[ 0 ] + "," + Y_time[ 1 ];
            break;
        case "2":
            baseName = parts[ 1 ] + "." + parts[ 0 ] + "." + Y_time[ 0 ] + "," + Y_time[ 1 ];
            break;
        case "3":
            baseName = Y_time[ 0 ] + "-" + parts[ 1 ] + "-" + parts[ 0 ] + "," + Y_time[ 1 ];
            break;
    }
    return baseName;
}

//Формирую список всех сессий
async function createSessionSaveList()
{
	sessionsSave = [];
	let j = 0;
	
        for ( let i = 0; i < sessions.length; i++ )
		{
			
					
			loadSessionFromId( sessions[i].folderId, function( d )
				{
					j++;
					console.log(d);
					console.log(j);
					if (j == 1 && sessions.length > 3)
					{
						$("#loader-identity").show("slow");
					}
					if (j == sessions.length-1)
					{
						$("#loader-identity").hide();
					}
					//console.log(d.toJson());
					//sessionsSave.push(d);
					sessionsSave[i] = d;
				} );		
				//	
				
			
						
		}
		console.log(sessionsSave);
}

//Формирую список выделенных сессии
function createListSessions()
{
	ownsession = [];
	console.log(sessions);
	
	var i = 0;
	var j = 0;
        for ( ; i < sessions.length; i++ )
		{
			var inputsPlugin = $( "#tabcheck_" + i );
			if(inputsPlugin)
			{
				if ( inputsPlugin.prop(
                                "checked" ) )
				{
					console.log(inputsPlugin);
		
						ownsession.push(sessionsSave[i]);
						console.log(ownsession);
					
					j++;
					console.log(j);
				}
			}
						
		}
	return ownsession;
}

//Сохраняю выделенные сессии
async function createSave(saveAs)
{
	
	const permissionsToRequest = {
	  permissions: ["downloads"]
	};
	
	
	createListSessions();
		
	console.log(sessionsSave);
	console.log(ownsession[0]);
	console.log(JSON.stringify(ownsession, null, "    "));
	// listS().then(()=>
	// {
		// console.log(ownsession);
		// console.log(JSON.stringify(ownsession));
		// let data = JSON.stringify(ownsession);
		// console.log(JSON.parse(data));
		// console.log(Date.parse("15/6/2018_10:37"));
		////toJsonS(sessionsSave)
		
	try
	{	
		const downloadUrl = URL.createObjectURL(
			new Blob([JSON.stringify(ownsession, null, "    ")], {
			  type: "aplication/json"
			})
		  );
		  console.log(downloadUrl);
	

		  const fileName = returnFileName(saveAs);
		if (browser.permissions.request(permissionsToRequest))
		{
		  browser.downloads
			.download({
			  url: downloadUrl,
			  filename: `${fileName}.mysessions`,
			  conflictAction: "uniquify",
			  saveAs: saveAs
			})
			.catch(() => {});
		}
	}
		catch (fmt)
    {
        console.error(fmt);
    }
	
			//saveFull();
}

//Функция сохранения всех сессий
async function saveFull()
{
	const downloadUrl = URL.createObjectURL(
			new Blob([JSON.stringify(sessionsSave, null, "    ")], {
			  type: "aplication/json"
			})
		  );
		  console.log(downloadUrl);

		  //const fileName = returnFileName(sessions);

		  await browser.downloads
			.download({
			  url: downloadUrl,
			  filename: `Full.mysessions`,
			  conflictAction: "uniquify",
			  saveAs: true
			})
			.catch(() => {});
}

let tabsCount = 0;
function saveToStorage()
{
	createListSessions();
	console.log(ownsession);
	ownsession.forEach( function(ssession)
	{
		tabsCount = tabsCount + parseInt(ssession.tabsCount);
		console.log(tabsCount);
		console.log(ssession.tabsCount);
	});
	ownsession.forEach( function(ssession)
	{
		console.log(ssession);
		var that = new background.SessionData(ssession.title, ssession.date, ssession.tabsCount);
		that.windows = ssession.windows;
		console.log(ssession);
		that.save( function( dataAndEvents )
                    {
						console.log(dataAndEvents);
                        if ( !dataAndEvents )
                        {
                            alert( getMessage( "saveFail" ) );
                        }
                    } );
	});
	//location.reload();
	// $('#progressDiv').progressbar({
                // value: 21
            // });
	$( "#progressbar" )
         .show();
	$( "#progressDiv" )
         .show();
	browser.bookmarks.onCreated.addListener(handleCreated);
}
let Nbookmarks = 0;
function handleCreated()
{
	Nbookmarks++;
	console.log(Nbookmarks);
	console.log(tabsCount);
	$("#loader-identity").show("slow");
	$('#progressDiv').progressbar({
                value: ~~((Nbookmarks*100)/tabsCount)
            });
	if (Nbookmarks > tabsCount)
	{
		$("#loader-identity").hide();
		$( "#progressbar" )
         .hide();
		$( "#progressDiv" )
         .hide();
		tabsCount = 0;
		Nbookmarks = 0;
		browser.bookmarks.onCreated.removeListener(handleCreated);
	}
}

async function deletSessions()
{
	createSave(false);
	
	let deletsession = [];
	var sessionId = [];
	
	var i = 0;
	var j = 0;
        for ( ; i < sessions.length; i++ )
		{
			var inputsPlugin = $( "#tabcheck_" + i );
			if(inputsPlugin)
			{
				if ( inputsPlugin.prop(
                                "checked" ) )
				{
					console.log(inputsPlugin);
					console.log(i);
		
						sessionId.push(i);
						deletsession.push(sessionsSave[i]);
						console.log(deletsession);
						console.log(sessionId);
					
					j++;
					console.log(j);
				}
			}
						
		}
		console.log(sessions);
		i = sessionId.length - 1;
		for ( ; i > -1; i-- )
		{
			// var selfObj = sessions[ sessionId[i] ];
			// $( "#msrestorelist .mssessionblock" )
				// .remove();
			// if ( selfObj )
			// {
				// console.log(selfObj);
				// console.log(sessionId[i]);
				// selfObj.remove( async function()
				// {
					// sessions.splice( sessionId[i], 1 );
					// console.log(sessionId);
					// console.log(sessions);
					// createSessionList();
				// } );
			// }
			browser.bookmarks.removeTree(deletsession[i].folderId);
			sessions.splice( sessionId[i], 1 );
			console.log(sessionId[i]);
			console.log(sessions);
			//createSessionList();
		}
		createSessionList();
		//background.initSession();
		//init();
	// createListSessions();
	// ownsession.forEach( function(ssession)
	// {
		// console.log(ssession);
		// browser.bookmarks.removeTree(ssession.folderId);
		
	// });
}


// function save()
// {
    // if ( $( "#mssavebutton" )
        // .prop( "disabled" ) )
    // {
        // console.log( "no tab selected" );
    // }
    // else
    // {
        // var name = $( "#savetitle" )
            // .val() || "MySession";
        //localStorage.lastUsedSessionName = name;
        // browser.windows.getAll(
        // {
            // populate: true
        // }, function( failures )
        // {
            // var now = new Date();
			// now = now.getMinutes();
            //now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			
			// if (now < 10)
			// {
				// now = new Date();
				// now = now.getDate() + "/" + (now.getMonth() + 1) + "/" + (now.getYear() + 1900)+"_"+now.getHours()+":" + "0" +now.getMinutes();
			// }
			// else
			// {
				// now = new Date();
				// now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			// }
            // var that = new background.SessionData( name, now );
            // failures.forEach( function( win )
            // {
                // win.tabs.forEach( function( tab )
                // {
                    // var inputsPlugin = $( "#tabcheck_" +
                        // tab.id );
						//console.log(tab);
                    // if ( inputsPlugin )
                    // {
                        // if ( inputsPlugin.prop(
                                // "checked" ) )
                        // {
                            // that.addTab(
                            // {
                                // url: tab.url,
                                // title: tab.title,
                                // win: win.id,
								// pinned: tab.pinned,
								// incognito: tab.incognito
                            // } );
                        // }
                    // }
                // } );
            // } );
            // if ( that.getCount() == 0 )
            // {
                // alert( getMessage( "emptySession" ) );
            // }
            // else
            // {
                // if ( that.getCount() > 0 )
                // {
                    // that.save( function( dataAndEvents )
                    // {
                        // if ( !dataAndEvents )
                        // {
                            // alert( getMessage( "saveFail" ) );
                        // }
                    // } );
                // }
            // }
            // window.close();
        // } );
    // }
// }

//Импорт файла
///////////////////////////////////////////////////////////////////////
//document.getElementById("import").addEventListener("change", importSessions, false);
/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
function parseSession(file) {
  for (let session of file) {
    //ver1.9.2以前のセッションのタグを配列に変更
    if (!Array.isArray(session.tag)) {
      session.tag = session.tag.split(" ");
    }

    //ver1.9.2以前のセッションにUUIDを追加 タグからauto, userを削除
    if (!session["id"]) {
      session["id"] = UUID.generate();

      session.tag = session.tag.filter(element => {
        return !(element == "user" || element == "auto");
      });
    }

    //windowsNumberを追加
    if (session.windowsNumber === undefined) {
      session.windowsNumber = Object.keys(session.windows).length;
    }
	console.log(session);
	console.log(new Date(session.date).toLocaleString());
	console.log(new Date(session.sessionStartTime));
	session.tabsCount = session.tabsNumber;
	session.title = session.name;
	//Меняю формат даты
	var t_sessiondate = new Date(session.date);
			t_sessiondate = t_sessiondate.getMinutes();
			
			if (t_sessiondate < 10)
			{
				t_sessiondate = new Date(session.date);
				t_sessiondate = t_sessiondate.getDate() + "/" + (t_sessiondate.getMonth() + 1) + "/" + (t_sessiondate.getYear() + 1900)+"_"+t_sessiondate.getHours()+":" + "0" +t_sessiondate.getMinutes();
			}
			else
			{
				t_sessiondate = new Date(session.date);
				t_sessiondate = t_sessiondate.getDate() + "/" + ( t_sessiondate.getMonth() + 1 ) + "/" + ( t_sessiondate.getYear() + 1900 )+"_"+t_sessiondate.getHours()+":"+t_sessiondate.getMinutes();
			}
			console.log(t_sessiondate);
	session.date = t_sessiondate;
	console.log(session.windows[5]);
	console.log(Object.values(session.windows));
	session.labels = {};
	//Конвертируем объект табов в массив табов
	let i;
        for ( i in session.windows )
        {
			console.log(session.windows[ i ]);
			session.windows[ i ] = Object.values(session.windows[ i ]);
			session.labels[ i ] = i;
			console.log(session.windows[ i ]);
            // populateWin(
            // {
                // id: i
                // , tabs: winsession.windows[ i ]
                //, label: winsession.labels[ i ]
            // }, "mssavelist", true );
        }
		console.log(session);
		
	//session.labels = session.windowsInfo;
	// let i;
	// let j = 0;
        // for ( i in session.windowsNumber )
        // {
			// console.log(i);
			// session.labels[j] = i;
			// j++;
        // }
  }
  console.log(file);
  return file;
}


let ImportSessions = [];
/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
async function importSessions() {
	
  let files = document.getElementById("import").files;
  console.log(files[0]);
  if (files == undefined) return;

  for (let file of files) {
    const session = await fileOpen(file);
	console.log(session);
	sessionsSave = session;
	importkey = true;
	createSessionList();
	$( "#exportmsfile" )
         .hide();
	$( "#deletsessions" )
         .hide();
	$( "#savetostorage" )
         .show();
	
    // showImportFile(file.name, session);
    // Array.prototype.push.apply(ImportSessions, session);
  }
  
}

async function importSessionsTSM() {
	
  let files = document.getElementById("importTSM").files;
  console.log(files[0]);
  if (files == undefined) return;

  for (let file of files) {
    const session = await fileOpen(file);
	console.log(session);
	sessionsSave = session;
	importkey = true;
	createSessionList();
	$( "#exportmsfile" )
         .hide();
	$( "#deletsessions" )
         .hide();
	$( "#savetostorage" )
         .show();
	
    // showImportFile(file.name, session);
    // Array.prototype.push.apply(ImportSessions, session);
  }
  
}

/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
function fileOpen(file) {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    reader.onload = function(event) {
      if (file.name.toLowerCase().endsWith(".mysessions")) {
        if (!isJSON(reader.result)) {
			console.log(reader.result);
          //jsonの構文を判定
          resolve(); //失敗
        } else {
			console.log(reader.result);
          let jsonFile = JSON.parse(reader.result);
		  console.log(jsonFile);
          //if (checkImportFile(jsonFile)) {
            //データの構造を判定
            // jsonFile = parseSession(jsonFile);
             resolve(jsonFile);
           //} else {
           // resolve(); //失敗
          //}
        }
      }
	  else if (file.name.toLowerCase().endsWith(".json")) {
        if (!isJSON(reader.result)) {
			console.log(reader.result);
          //jsonの構文を判定
          resolve(); //失敗
        } else {
          let jsonFile = JSON.parse(reader.result);
          if (checkImportFile(jsonFile)) {
			  console.log(jsonFile);
            //データの構造を判定
            jsonFile = parseSession(jsonFile);
			console.log(jsonFile);
            resolve(jsonFile);
          } else {
            resolve(); //失敗
          }
        }
      }
	  else if (file.name.toLowerCase().endsWith(".session")) {
        resolve(parseOldSession(reader.result));
      } else {
        resolve();
      }
    };
    reader.readAsText(file);
  });
}

/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
function isJSON(arg) {
  arg = typeof arg === "function" ? arg() : arg;
  if (typeof arg !== "string") {
    return false;
  }
  try {
    arg = !JSON ? eval("(" + arg + ")") : JSON.parse(arg);
    return true;
  } catch (ecl) {
    return false;
  }
}

/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
function isArray(o) {
  return Object.prototype.toString.call(o) === "[object Array]";
}

/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
function checkImportFile(file) {
	console.log(!isArray(file));
  if (!isArray(file)) return false;

  const correctKeys = ["windows", "tabsNumber", "name", "date", "tag", "sessionStartTime"];

  for (let session of file) {
    const sessionKeys = Object.keys(session);
    const isIncludes = value => {
      return sessionKeys.includes(value);
    };

    if (!correctKeys.every(isIncludes)) return false;
  }

  return true;
}

/* The original code of Sienori https://github.com/sienori/Tab-Session-Manager.*/
function returnFileName(save) {
  let fileName;
  var now = new Date();
  console.log(now.toLocaleString());
  console.log(ownsession[0].title);
  console.log(ownsession.length.toString());
  if (save == true)
  {
		  if (ownsession.length == 1) {
			fileName = `${ownsession[0].title} - ${changeDateFormatLabel(now.toLocaleString())}`;
		  } else {
			//const sessionsLabel = browser.i18n.getMessage("sessionsLabel");
			fileName = `save - ${ownsession.length.toString()} sess - ${changeDateFormatLabel(now.toLocaleString())}`;
		  }
  }
  else if (save == false)
  {
	  fileName = `Delete Sessions - ${changeDateFormatLabel(now.toLocaleString())}`;
  }
  const pattern = /\\|\/|\:|\?|\.|"|<|>|\|/g;
  fileName = fileName.replace(pattern, "-").replace(/^( )+/, "");
  console.log(fileName);
  return fileName;
}
////////////////////////////////////////////////////////////////////////////////////

//Показывает список табов в сессии
function showTabs(e)
{
	$( "#mssavelist" )
		.empty();
	console.log(e);
	console.log(e.currentTarget.parentElement.id);
	// console.log(e.originalEvent.which);
	// var w = e.button;
	// var self = closest( e.target, "mssessionblock" );
	// console.log(self);
	var self = closest( e.target, "mssessionblock" );
    var editedSession = sessions[ self.sessionId ];
	let namberSession = parseInt(e.currentTarget.parentElement.id.replace(/\D+/g,""));
	let winsession = sessionsSave[namberSession];
	console.log(winsession);
	let i;
        for ( i in winsession.windows )
        {
            populateWin(
            {
                id: i,
                tabs: winsession.windows[ i ],
                label: winsession.labels[ i ]
            }, "mssavelist", true );
        }
		//Скрываем лишнее
		 $( "#mssavelist .mscheck" )//Убираю чекбоксы рядом с вкладками
             .hide();
			 
		queue = $( "<div/>",
					{
						id: "session_",
						"class": "msmenu",
						text: editedSession.title,
						mousedown: stopDragEffect
					} )
					.prependTo( "#mssavelist" );
}

// function restoreSession( e )
// {
	// console.log(e);
	// console.log(e.originalEvent.which);
	// var w = e.button;
	// var self = closest( e.target, "mssessionblock" );
	// console.log(self);
	// localStorage.EditBlock = self;
	// console.log(localStorage.EditBlock);
	
	
  // if($('#nav'+self.id).css("display")=="block"){
				// $('#nav'+self.id).css("display", "none");
			// }
			// else{
				// $('#nav'+self.id).css("display", "block");
			// }
	// if (e.originalEvent.which != 2)	//Если нажата не средняя кнопка
	// {
		// $('#nav'+self.id).toggle("fast");
		

		// console.log($('.nav').length);	

		// $('.nav').not('#nav'+self.id).css("display", "none");
		//$('#nav'+self.id).toggle("fast");
		// console.log($('#nav'+self.id)[0].clientHeight);
		
		// if ($('#nav'+self.id)[0].clientHeight < 3)
		// {
		// console.log($('#nav'+self.id)[0].clientHeight);
		// $( "#mssavelist" )
        // .empty();
		
		// var self = closest( e.target, "mssessionblock" );
        // var editedSession = sessions[ self.sessionId ];
		//editedSession = sessions[ e.target.id ];
		// console.log(e);
		// console.log(editedSession);
	
		
		
	// loadSessionFromId( editedSession.folderId, function( data )
    // {
        //$( "#mseditsave" )
            //.prop( "index", data.index );
        // var i;
        // for ( i in data.windows )
        // {
            // populateWin(
            // {
                // id: i,
                // tabs: data.windows[ i ],
                // label: data.labels[ i ]
            // }, "mssavelist", true );
        // }
        
		//Скрываем лишнее
		 // $( ".mscheck" )//Убираю чекбоксы рядом с вкладками
             // .hide();
			 
		// queue = $( "<div/>",
					// {
						// id: "session_",
						// "class": "msmenu",
						// text: editedSession.title,
						// mousedown: stopDragEffect
					// } )
					// .prependTo( "#mssavelist" );	 
			 
		 
    // } );
		// }
			// else
			// {
				//init();
				// $( "#mssavelist" )
					// .empty();
				 // var a = false;
    // browser.windows.getLastFocused( function( item )
    // {
        // browser.windows.getAll(
        // {
            // populate: true
        // }, function( results )
        // {
            // let b;
            // results.forEach( function( act )
            // {
                // if ( item.id == act.id )
                // {
                    // b = true;
                // }
				// else
				// {
					// b = false;
				// }
				// if ( act.incognito && S.ShowPrivate == false )
				// {
					// console.log(act);
				// }
				// else
				// {
					// if( S.MarkAll == true)
					// {
						// a = true;
					// }
					// populateWin( act, "mssavelist", a, b );
					// console.log("check"+item.id);
				// }
            // } );
            // if ( results.length == 1 )
            // {
                // $( mssaveToggleH4 )
                    // .hide();
            // }
            // if ( !a )
            // {
                // console.error(
                    // "Cannot find last focused window" );
                // $( "#mssavelistWrapper" + results[ 0 ].id +
                        // " input[type=checkbox]" )
                    // .prop( "checked", true );
            // }
        // } );
    // } );
			// }
		
		
	// }
	// else
	// {
    // try
    // {
        // var self = closest( e.target, "mssessionblock" );
        // var docSession = sessions[ self.sessionId ];
        // if ( docSession )
        // {
            // var w = e.button;
			// console.log(e.button);
            // if ( e.ctrlKey || e.metaKey )
            // {
                // w = 1;
            // }
			// else //Заглушка
			// {
				// w = 0;
			// }
			// console.log(w);
            // loadSessionFromId( docSession.folderId, function( d )
            // {
                // if ( w == 1 && d.getWinCount() > 1 )
                // {
                    // if ( confirm( getMessage( "confirmClose" ) ) )
                    // {
                        // d.open( w );
                    // }
                // }
                // else
                // {
                    // background.openDelayed( d, w );
                    // window.close();
                // }
            // } );
        // }
    // }
    // catch ( fmt )
    // {
        // console.error( fmt );
    // }
	// }
// }

function stopDragEffect( event )
{
    event.preventDefault();
    event.stopPropagation();
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
		console.log("tags");
		console.log(tags);
		console.log("results");
		console.log(results[0]);
		
		//Заменяю количество вкладок на "0", чтобы исправить ошибку удвоения вкладок.
        var data = new background.SessionData( tags[ 1 ].trim(), tags[
            2 ], "0", results[ 0 ].id );
        if ( Setting_n.editOrder == false )
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

// function edit( e )
// {
	// e = closest( e.target, "mssessionblock" );
    // editedSession = sessions[ e.sessionId ];
    // editedBlock = e;
    // $( "#mseditlist1" )
        // .empty();
	//Скрываем лишнее (возвращаем)
		// $( ".h4" )
            // .show();
		// $( "#msheadingtitle" )
            // .show();
		// $( "#mstitle" )
            // .show();
		// $( "#msheadingsaved" )
            // .show();
		// $( "#mseditsavedtoggle" )
            // .show();
		// $( ".mseditHead" )
            // .show();
		// $( "#mseditlist1" )
            // .show();
		// $( "#mseditsave" )
            // .show();
		// $( "#mseditremove" )
            // .show();
			
			
		
    // browser.windows.getLastFocused( function( item )
    // {
        // browser.windows.getAll(
        // {
            // populate: true
        // }, function( failures )
        // {
            // failures.forEach( function( act )
            // {
                // populateWin( act, "mseditlist1", item.id ==
                    // act.id );
            // } );
            // $( "#mseditlist1 input[type=checkbox]" )
                // .prop( "checked", false );
        // } );
    // } );
    // $( "#mslistoriginal" )
        // .empty();
    // loadSessionFromId( editedSession.folderId, function( data )
    // {
        // $( "#mseditsave" )
            // .prop( "index", data.index );
        // var i;
        // for ( i in data.windows )
        // {
            // populateWin(
            // {
                // id: i,
                // tabs: data.windows[ i ],
                // label: data.labels[ i ],
            // }, "mslistoriginal", true );
        // }
        // $( "#mslistoriginal input[type=checkbox]" )
            // .prop( "checked", true );
        // $( "#msrestorelist" )
            // .hide();
        // $( "#mseditsession" )
            // .show()
            // .animate(
            // {
                // left: "0%"
            // }, 250, "swing", function()
            // {
                // $( "#mstitle" )
                    // .val( data.title )
                    // .focus()
                    // .select();
            // } );
        // $( '#mseditsession input[type="checkbox"]' )
            // .change( function()
            // {
                // var copyProp = $( "#mseditsession .mscheck:checked" )
                    // .length == 0;
                // $( "#mseditsave" )
                    // .prop( "disabled", copyProp );
            // } );
        // $( function()
        // {
            // $( "#mseditlist1, #mslistoriginal" )
                // .sortable(
                // {
                    // items: ".mstabline",
                    // connectWith: ".mseditlist",
					// helper: "clone"
                // } )
                // .disableSelection();
        // } );
    // } );
	// $( "<div/>",
					// {
						//id: i
						 // "class": "msmenu",
						// text: getMessage("Add to current window."),
						// mousedown: AddCurrentWindowSelect
					// } ).hide();
// }

// function editSave()
// {
    // if ( !$( "#mseditsave" )
        // .prop( "disabled" ) && $( "#mstitle" )
        // .val() )
    // {
        // var now = new Date();
			// now = now.getMinutes();
            //now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			
			// if (now < 10)
			// {
				// now = new Date();
				// now = now.getDate() + "/" + (now.getMonth() + 1) + "/" + (now.getYear() + 1900)+"_"+now.getHours()+":" + "0" +now.getMinutes();
			// }
			// else
			// {
				// now = new Date();
				// now = now.getDate() + "/" + ( now.getMonth() + 1 ) + "/" + ( now.getYear() + 1900 )+"_"+now.getHours()+":"+now.getMinutes();
			// }
        // var self = new background.SessionData( $( "#mstitle" )
            // .val(), now, 0, editedSession.folderId );
        // $.each( $( "#mseditsession .winWrapper" ), function( dataAndEvents,
             // elem )
        // {
			// console.log("111", $, dataAndEvents, elem);
            // var $elem = $( elem );
            // var windows = $elem.attr( "winId" );
            // $.each( $elem.find( ".mscheck" ), function( dataAndEvents,
                 // e )
            // {
				// console.log("222", $, dataAndEvents, e);
                // if ( e.checked )
                // {
                    // var tab = e.tab;
					// console.log(tab);
                    // if ( tab )
                    // {
                        // self.addTab(
                        // {
                            // url: tab.url,
                            // title: tab.title,
                            // win: windows,
							// pinned: tab.pinned,
							// incognito: tab.incognito
                        // } );
                    // }
                // }
            // } );
        // } );
        // var c = self.getCount();
        // if ( c > 0 )
        // {
            // self.update( function( dataAndEvents )
                // {
                    // if ( dataAndEvents )
                    // {
                        // $( editedBlock )
                            // .find( ".mssessiontitle" )
                            // .text( self.title );
                        // $( editedBlock )[ 0 ].sessionId = self.id;
                        // $( editedBlock )
                            // .find( ".mssessioncount" )
                            // .text( getMessage( "tabsCount", [ c ] ) );
                        // delete sessions[ editedSession.id ];
                        // sessions[ self.sessionId ] = self;
                    // }
                    // else
                    // {
                        // alert( "Update faile, try again later." );
                    // }
                // }, $( "#mseditsave" )
                // .prop( "index" ) );
        // }
        // else
        // {
            // remove(
            // {
                // target: editedBlock
            // } );
        // }
        // editCancel();
        // window.location.reload();
    // }
// }

// function editCancel()
// {
    // $( "#mseditsession" )
        // .animate(
        // {
            // left: "100%"
        // }, 250, "swing", function()
        // {
            // $( "#mseditsession" )
                // .hide();
            // $( "#msrestorelist" )
                // .show();
        // } );
		
// }

// function editRemove()
// {
    // remove(
    // {
        // target: editedBlock
    // } );
    // editCancel();
// }

// function remove( e )
// {
	// if (S.DisableConfirmation == true)
	// {
		// var self = closest( e.target, "mssessionblock" );
        // var selfObj = sessions[ self.sessionId ];
        // $( "#msrestorelist .mssessionblock" )
            // .remove();
        // if ( selfObj )
		// {
			// selfObj.remove( function()
			// {
				// sessions.splice( self.sessionId, 1 );
				// createSessionList();
			// } );
		// }
	// }
	// else
	// {
    // var udataCur = "Are you sure to remove this sessions?";
    // udataCur = getMessage( "confirmDeleteQuestion" );
    // renderConfirmBox( udataCur, function( selfObj )
    // {
        // if ( selfObj )
        // {
            // var self = closest( e.target, "mssessionblock" );
            // selfObj = sessions[ self.sessionId ];
            // $( "#msrestorelist .mssessionblock" )
                // .remove();
            // if ( selfObj )
            // {
                // selfObj.remove( function()
                // {
                    // sessions.splice( self.sessionId, 1 );
                    // createSessionList();
                // } );
            // }
        // }
    // } );
	// }
// }

// function renderConfirmBox( value, $sanitize )
// {
    // var container = $( "#msrestorebase" );
    // var p = $( "<div>",
        // {
            // "class": "confirmBox",
            // style: "display:none"
        // } )
        // .appendTo( container );
    // p.fadeIn();
    // container = $( "<div>",
    // {
        // "class": "messageBox"
    // } );
    // container.html( value );
    // container.appendTo( p );
    // container = $( "<div>",
    // {
        // "class": "confirmButton"
    // } );
    // container.html( getMessage( "confirm" ) );
    // container.click( function()
    // {
        // $sanitize( true );
        // p.remove();
    // } );
    // container.appendTo( p );
    // container = $( "<div>",
    // {
        // "class": "cancelButton"
    // } );
    // container.html( getMessage( "cancel" ) );
    // container.click( function()
    // {
        // $sanitize( false );
        // p.remove();
    // } );
    // container.appendTo( p );
// }

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
    var inputsPlugin = $( '#msrestorelist input[type="checkbox"]' );
    if ( $( "#mssavetoggle" )
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


// function importSession()
// {
    // var s = $( "#sessionTextBoxTextArea" )
        // .val();
    // var model;
    // var t;
    // try
    // {
        // t = JSON.parse( s );
        // model = new background.SessionData( t.title, t.date );
        // t.tabs.forEach( function( scope )
        // {
            // model.addTab( scope );
        // } );
    // }
    // catch ( d )
    // {
        
		// model = new background.SessionData();
        // s = s.split( "\n" );
        // t = new Date();
        
			// t = t.getMinutes();
			
			// if (t < 10)
			// {
				// t = new Date();
				// t = t.getDate() + "/" + (t.getMonth() + 1) + "/" + (t.getYear() + 1900)+"_"+t.getHours()+":" + "0" +t.getMinutes();
			// }
			// else
			// {
				// t = new Date();
				// t = t.getDate() + "/" + ( t.getMonth() + 1 ) + "/" + ( t.getYear() + 1900 )+"_"+t.getHours()+":"+t.getMinutes();
			// }
        // var x = "";
        // var u = "";
        // var i = 0;
        // for ( ; i < s.length; i++ )
        // {
            // if ( s[ i ].indexOf( "Name: " ) > -1 )
            // {
                // model.title = s[ i ].replace( "Name: ", "" ) ||
                    // "imported session";
            // }
            // else
            // {
                // if ( s[ i ].indexOf( "Date: " ) > -1 )
                // {
                    // model.date = s[ i ].replace( "Date: ", "" ) || t;
                // }
                // else
                // {
                    // if ( s[ i ].indexOf( "Title: " ) > -1 )
                    // {
                        // x = s[ i ].replace( "Title: ", "" );
                    // }
                    // else
                    // {
                        // if ( s[ i ].indexOf( "Url: " ) > -1 )
                        // {
                            // u = s[ i ].replace( "Url: ", "" );
                        // }
                    // }
                // }
            // }
            // if ( x != "" )
            // {
                // if ( u != "" )
                // {
                    // model.addTab(
                    // {
                        // url: u,
                        // title: x,
                        // win: "_win"
						
                    // } );
                    // x = u = "";
                // }
            // }
        // }
    // }
    // model.save();
    // $( "#sessionTextBox" )
        // .fadeOut();
    // window.close();
// }

//browser.storage.onChanged.addListener(InitSettings);

// function showImportSessionBox()
// {
    // $( "#sessionTextBoxTips" )
        // .html( getMessage( "importedSessionTips" ) );
    // $( "#importSessionBtn" )
        // .show();
    // $( "#sessionTextBoxTextArea" )
        // .val( "" );
    // $( "#sessionTextBox" )
        // .fadeIn();
    // $( "#sessionTextBoxTextArea" )
        // .focus();
// }


function searchHighlight()
{
	$('#msrestorelistwrapper').removeHighlight();
		 let txt = $('#savetitle').val();
		 if (txt == '') return;
		 $('#msrestorelistwrapper').highlight(txt);
		 console.log($('#msrestorelistwrapper span.highlight').length);
		 //var search_count = $('#msrestorelistwrapper .highlight').length - 1;
		 //var count_text = search_count + 1;
		 //var search_number = 0;
}

function numberOfMscheck()
{
	var check = document.getElementsByClassName('mscheck');
		console.log(check);
		let i = 0;
		for (let j=0; j < check.length; j++)
			//check.forEach(function (checked)
			{
				if (check[j].checked)
				{
					i++;
				}
			}
		$("#check").text(i);	
}

document.addEventListener('change', function (e) {
	console.log(e);
	console.log(e.target.className);
    switch (e.target.className) {
        case "mscheck":
            numberOfMscheck();
             break;
     }
});

$( document )
    .ready( function()
    {
        $( "#exportmsfile" )
            .click( function()
            {
                createSave(true);
            } );
        $( "#mssavetoggle" )
            .click( function()
            {
                saveToggle();
            } );
		$( "#savetostorage" )
            .click( function()
            {
                saveToStorage();
            } );
		$( "#deletsessions" )
            .click( function()
            {
                deletSessions();
            } );
		var check = document.getElementById('mssavetoggle');
		console.log(check);
			check.addEventListener('change', function() {
			  console.log(this.value);
			  numberOfMscheck();
			 }, false);
        // $( mstitle )
            // .keypress( function( deepDataAndEvents )
            // {
                // renameChange( deepDataAndEvents );
            // } );
        // $( mseditnewtoggle )
            // .click( function()
            // {
                // var isChecked = $( this )
                    // .prop( "checked" );
                // $( '#mseditlist1 input[type="checkbox"]' )
                    // .prop( "checked", isChecked );
                // $( "#mseditsession .mscheck" )
                    // .change();
            // } );
        // $( mseditsavedtoggle )
            // .click( function()
            // {
                // var isChecked = $( this )
                    // .prop( "checked" );
                // $( '#mslistoriginal input[type="checkbox"]' )
                    // .prop( "checked", isChecked );
                // $( "#mseditsession .mscheck" )
                    // .change();
            // } );
        // $( mseditsave )
            // .click( function()
            // {
                // editSave();
            // } );
        // $( mseditcancel )
            // .click( function()
            // {
                // editCancel();
            // } );
        // $( mseditremove )
            // .click( function()
            // {
                // editRemove();
            // } );
		// $( msselecttab )
            // .click( function()
            // {
                // AddCurrentWindowSelect();
            // } );
        // $( msrestoreicon2 )
            // .click( function()
            // {
                // browser.tabs.create(
                // {
                    // url: "options.html"
                // } );
				// window.close();
            // } );
		// $( msopentab )
            // .click( function()
            // {
                // browser.tabs.create(
                // {
                    // url: "popup.html"
                // } );
				// window.close();
            // } );
		// $( qu )
            // .click( function()
            // {
                // browser.tabs.create(
                // {
                    // url: "logo.html"
                // } );
				// window.close();
            // } );
        // $( importBtn )
            // .click( function()
            // {
                // showImportSessionBox();
            // } );
        // $( msrestorecrash )
            // .click( function()
            // {
                // crashRestore();
            // } );
        // $( sessionTextBoxCloseBtn )
            // .click( function()
            // {
                // $( sessionTextBox )
                    // .fadeOut();
            // } );
        // $( importSessionBtn )
            // .click( function()
            // {
                // importSession();
            // } );
		// $( importSessionBtnf )
            // .click( function()
            // {
				// browser.tabs.create(
                // {
                    // url: "load.html"
                // } );
				// window.close();
            // } );
		// $( SMBtn )
            // .click( function()
            // {
				// browser.tabs.create(
                // {
                    // url: "sm.html"
                // } );
				// window.close();
            // } );
		//setSetting();
        init();
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
    } );