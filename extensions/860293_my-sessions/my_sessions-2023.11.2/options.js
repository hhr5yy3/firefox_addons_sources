var background = browser.extension.getBackgroundPage();
var hiddentab = 0;
var idIntervals;

function getMessage(a, b) {
    try {
        var cle = browser.i18n.getMessage(a, b);
        if (cle) return cle;
    } catch (d_n) {}
}

var Save_opt = {};

function save_options() {
    var backupPeriod_n = $("#backupPeriod"),
        backupPeriod_int = parseInt(backupPeriod_n.val());
    isNaN(backupPeriod_int) && (backupPeriod_n.val(5), backupPeriod_int = 5);
	var AutoSavePeriod_n = $("#AutoSavePeriod"),
        AutoSavePeriod_int = parseInt(AutoSavePeriod_n.val());
    isNaN(AutoSavePeriod_int) && (AutoSavePeriod_n.val(15), AutoSavePeriod_int = 300);
	var AutoSaveNumber_n = $("#AutoSaveNumber"),
        AutoSaveNumber_int = parseInt(AutoSaveNumber_n.val());
    isNaN(AutoSaveNumber_int) && (AutoSaveNumber_n.val(10), AutoSaveNumber_int = 10);
	var backupPeriodNumber_n = $("#backupPeriodNumber"),
        backupPeriodNumber_int = parseInt(backupPeriodNumber_n.val());
    isNaN(backupPeriodNumber_int) && (backupPeriodNumber_n.val(50), backupPeriodNumber_int = 50);
	var CloseWindowNumber_n = $("#CloseWindowNumber"),
        CloseWindowNumber_int = parseInt(CloseWindowNumber_n.val());
    isNaN(CloseWindowNumber_int) && (CloseWindowNumber_n.val(10), CloseWindowNumber_int = 10);
	var prefix1 = $("#Stringprefix").val();
	var suffix1 = $("#Stringsuffix").val();
    (backupPeriod_int < 1 || backupPeriod_int > 999) && (AutoSavePeriod_int < 1 || AutoSavePeriod_int > 999) && (AutoSaveNumber_int < 1 || AutoSaveNumber_int > 999) && (backupPeriodNumber_int < 1 || backupPeriodNumber_int > 999)? alert(getMessage("optionsBackupPeriodOutOfRange")) : (Save_opt.backupPeriod = backupPeriod_int,
		Save_opt.AutoSavePeriod = AutoSavePeriod_int, Save_opt.AutoSaveNumber = AutoSaveNumber_int, Save_opt.backupPeriodNumber = backupPeriodNumber_int, Save_opt.CloseWindowNumber = CloseWindowNumber_int, Save_opt.crashRestore = $("#crashRestore")
        .prop("checked"), Save_opt.ShowAutoSave = $("#ShowAutoSave")
        .prop("checked"), Save_opt.ShowFaviconTab = $("#ShowFaviconTab")
        .prop("checked"), Save_opt.ShowFavicon = $("#ShowFavicon")
        .prop("checked"), Save_opt.LazyLoading = $("#LazyLoading")
        .prop("checked"), Save_opt.Discarded = $("#Discarded")
        .prop("checked"), Save_opt.AutoSave = false
        , Save_opt.ShowPopap = $("#ShowPopap")
        .prop("checked"), Save_opt.ListURL = $("#ListURL")
        .prop("checked"), Save_opt.SortTitle = $("#SortTitle")
        .prop("checked"), Save_opt.EnablecolorIcon = $("#EnablecolorIcon")
        .prop("checked"), Save_opt.ShowPrivate = $("#ShowPrivate")
        .prop("checked"), Save_opt.ShowHidden = $("#ShowHidden")
        .prop("checked"), Save_opt.CloseWindow = $("#CloseWindow")
        .prop("checked"), Save_opt.SaveFile = $("#SaveFile")
        .prop("checked"), Save_opt.MarkAll = $("#MarkAll")
        .prop("checked"), Save_opt.DisableConfirmation = $("#DisableConfirmation")
        .prop("checked"), Save_opt.DisableConfirm = $("#DisableConfirm")
        .prop("checked"), Save_opt.Prefix = $("#Prefix")
        .prop("checked"), Save_opt.Title = $("#Title")
        .prop("checked"), Save_opt.Date1 = $("#Date1")
        .prop("checked"), Save_opt.Time = $("#Time")
        .prop("checked"), Save_opt.Suffix = $("#Suffix")
        .prop("checked"), Save_opt.DarkTheme = $("#DarkTheme")
        .prop("checked"), 
		Save_opt.Stringprefix = prefix1,
		Save_opt.Stringsuffix = suffix1,
		Save_opt.SaveFileName = $("#SaveFileName").val(),
		Save_opt.SessionList = $("select").val(),
		//browser.extension.getBackgroundPage().InitSettings(), 
		$("#options-saved")
        .show(), Save_opt.dateFormat = $("#dateFormatSelect option:selected")
        .val(), Save_opt.colorIcon = $( "#icon" )
		.css('background-color'));
		// , S.editOrder = $(editOrder)
        // .prop("checked"));
		
		console.log(Save_opt);
		console.log(window.location.title);
		browser.storage.local.set(
		{
		'settings':Save_opt
		}).then (background.setSetting());
		background.initSessionList();
		// browser.extension.getBackgroundPage()
        // .InitSettings();
		// browser.extension.getBackgroundPage()
        // .changeBackupSetting();
		console.log(Save_opt);
		setTimeout((function(){$("#options-saved").hide()}), 1000);
		//$("#options-saved").hide();
}

// GetHiddenTab().then(function () {
	// $( "#optionsHidden2" )
        // .text( hiddentab.toString() + "hidden tabs" );
		// console.log("Привлыли ------------------------------");
// });

InitSettings().then(function () {
    restoreSetting();
	GetSessionTitle();
	ShowAlert();
	console.log(Save_opt);
});

//Показать предупреждение о включении разрешения на загрузку файлов
function ShowAlert()
{
	const permissionsToRequest = {
	  permissions: ["downloads"]
	};
	browser.permissions.contains(permissionsToRequest).then((result) => {
		console.log(result);
	console.log("Разрешение на загрузку" + result);
	  console.log("Сохранять бэкап в файл" + Save_opt.SaveFile);
	if (result == false && Save_opt.SaveFile == true)
	{
		alert(getMessage( "AlertPermissions" ));
		
       idIntervals = setInterval(spectrum ,400);
		
		
	}
});
}

//Проверить включено ли разрешение
function CheckDownloadPermissions()
{
	const permissionsDownload = {
	  permissions: ["downloads"]
	};
	browser.permissions.contains(permissionsDownload).then((result) => {
		console.log(result);
		if (result == true)
		{
			$( "#DownloadPermissions" )
				.text( " Enabled " );
		}
		else
		{
			$( "#DownloadPermissions" )
				.text( " Disabled " );
		}
		});
}

var hue = 'rgb(255,0,0)';
var hue1 = 'rgb(0,0,0)';

function spectrum() {
        $('#optionsEnableSaveFile').animate({ color: hue}, 200).animate({color: hue1},200);
		$('#optionPermissions').animate({ color: hue}, 200).animate({color: hue1},200);
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
				Save_opt = value.settings;
				if (Save_opt === undefined) Save_opt = {};
				// browser.extension.getBackgroundPage()
					// .changeBackupSetting();
				console.log(Save_opt);
				resolve();
			});
			}
			catch (ecl)
			{
				console.log(ecl);
			}
			
			//console.log(S);
			//resolve();
		
	});
}

function restoreSetting() {
    Save_opt.crashRestore === true ? ($("#crashRestore")
        .prop("checked", !0), $("#backupPeriod")
		.prop("disabled", !1), $("#backupPeriodNumber")
        .prop("disabled", !1)) : ($("#crashRestore")
        .prop("checked", !1), $("#backupPeriod")
		.prop("disabled", !0), $("#backupPeriodNumber")
        .prop("disabled", !0));
	Save_opt.ShowAutoSave === true ? ($("#ShowAutoSave")
        .prop("checked", !0)) : ($("#ShowAutoSave")
        .prop("checked", !1));
	Save_opt.ShowFavicon === true ? ($("#ShowFavicon")
        .prop("checked", !0)) : ($("#ShowFavicon")
        .prop("checked", !1));
	Save_opt.ShowFaviconTab === true ? ($("#ShowFaviconTab")
        .prop("checked", !0)) : ($("#ShowFaviconTab")
        .prop("checked", !1));
	Save_opt.LazyLoading === true ? ($("#LazyLoading")
        .prop("checked", !0)) : ($("#LazyLoading")
        .prop("checked", !1));
	Save_opt.Discarded === true ? ($("#Discarded")
        .prop("checked", !0)) : ($("#Discarded")
        .prop("checked", !1));
	Save_opt.ShowPopap === true ? ($("#ShowPopap")
        .prop("checked", !0)) : ($("#ShowPopap")
        .prop("checked", !1));
	Save_opt.ListURL === true ? ($("#ListURL")
        .prop("checked", !0)) : ($("#ListURL")
        .prop("checked", !1));
	Save_opt.SortTitle === true ? ($("#SortTitle")
        .prop("checked", !0)) : ($("#SortTitle")
        .prop("checked", !1));
	Save_opt.EnablecolorIcon === true ? ($("#EnablecolorIcon")
        .prop("checked", !0)) : ($("#EnablecolorIcon")
        .prop("checked", !1));
	Save_opt.ShowPrivate === true ? ($("#ShowPrivate")
        .prop("checked", !0)) : ($("#ShowPrivate")
        .prop("checked", !1));
	Save_opt.ShowHidden === true ? ($("#ShowHidden")
        .prop("checked", !0)) : ($("#ShowHidden")
        .prop("checked", !1));
	Save_opt.CloseWindow === true ? ($("#CloseWindow")
        .prop("checked", !0)) : ($("#CloseWindow")
        .prop("checked", !1));
	Save_opt.SaveFile === true ? ($("#SaveFile")
        .prop("checked", !0)) : ($("#SaveFile")
        .prop("checked", !1));
	Save_opt.MarkAll === true ? ($("#MarkAll")
        .prop("checked", !0)) : ($("#MarkAll")
        .prop("checked", !1));
	//Имя сессии по умолчанию, 2.11.1
	Save_opt.Prefix === true ? ($("#Prefix")
        .prop("checked", !0)) : ($("#Prefix")
        .prop("checked", !1));
	Save_opt.Title === true ? ($("#Title")
        .prop("checked", !0)) : ($("#Title")
        .prop("checked", !1));
	Save_opt.Date1 === true ? ($("#Date1")
        .prop("checked", !0)) : ($("#Date1")
        .prop("checked", !1));
	//==============================
	if (Save_opt.Date1 == undefined)
	{
		$("#Date1")
        .prop("checked", !0);
	}
	if (Save_opt.CloseWindow == undefined)
	{
		$("#CloseWindow")
        .prop("checked", !0);
	}
	if (Save_opt.SaveFile == undefined)
	{
		$("#SaveFile")
        .prop("checked", !1);
	}
	if (Save_opt.SaveFileName == undefined)
	{
		$("#SaveFileName")
        .val("MySessions");
	}
	if (Save_opt.SessionList == undefined)
	{
		$("select")
        .val("_displayAll");
	}
	//==============================
	Save_opt.Time === true ? ($("#Time")
        .prop("checked", !0)) : ($("#Time")
        .prop("checked", !1));
	Save_opt.Suffix === true ? ($("#Suffix")
        .prop("checked", !0)) : ($("#Suffix")
        .prop("checked", !1));
	Save_opt.DarkTheme === true ? ($("#DarkTheme")
        .prop("checked", !0)) : ($("#DarkTheme")
        .prop("checked", !1));
	if (Save_opt.DarkTheme == undefined)
	{
		$("#DarkTheme")
        .prop("checked", !0);
	}
		
	//====================================
	Save_opt.DisableConfirmation === true ? ($("#DisableConfirmation")
        .prop("checked", !0)) : ($("#DisableConfirmation")
        .prop("checked", !1));
	Save_opt.DisableConfirm === true ? ($("#DisableConfirm")
        .prop("checked", !0)) : ($("#DisableConfirm")
        .prop("checked", !1));
	Save_opt.AutoSave === true ? ($("#AutoSave")
        .prop("checked", !0), $("#AutoSavePeriod")
        .prop("disabled", !1), $("#AutoSaveNumber")
		.prop("disabled", !1)): ($("#AutoSave")
        .prop("checked", !1), $("#AutoSavePeriod")
		.prop("disabled", !0), $("#AutoSaveNumber")
        .prop("disabled", !0));
	Save_opt.CloseWindow === true ? ($("#CloseWindow")
        .prop("checked", !0), $("#CloseWindowNumber")
		.prop("disabled", !1)): ($("#CloseWindow")
        .prop("checked", !1),  $("#CloseWindowNumber")
        .prop("disabled", !0));
	Save_opt.SaveFile === true ? ($("#SaveFile")
        .prop("checked", !0), $("#SaveFileName")
		.prop("disabled", !1)): ($("#SaveFile")
        .prop("checked", !1),  $("#SaveFileName")
        .prop("disabled", !0));
    Save_opt.editOrder === false && $(editOrder)
        .prop("checked", !1);
    $("#backupPeriod")
        .val(Save_opt.backupPeriod ? Save_opt.backupPeriod : 5);
	$("#AutoSavePeriod")
        .val(Save_opt.AutoSavePeriod ? Save_opt.AutoSavePeriod : 15);
	$("#AutoSaveNumber")
        .val(Save_opt.AutoSaveNumber ? Save_opt.AutoSaveNumber : 10);
	$("#backupPeriodNumber")
        .val(Save_opt.backupPeriodNumber ? Save_opt.backupPeriodNumber : 50);
	$("#CloseWindowNumber")
        .val(Save_opt.CloseWindowNumber ? Save_opt.CloseWindowNumber : 10);
	$("#SaveFileName")
        .val(Save_opt.SaveFileName ? Save_opt.SaveFileName : "MySessions");
	console.log(Save_opt.SessionList);
	$("select")
        .val(Save_opt.SessionList ? Save_opt.SessionList : "_displayAll");
	console.log(Save_opt.SessionList);
	console.log($("select").val());
	$("#Stringprefix")
        .val(Save_opt.Stringprefix ? Save_opt.Stringprefix : " ");
	$("#Stringsuffix")
        .val(Save_opt.Stringsuffix ? Save_opt.Stringsuffix : " ");
    $("#dateFormatSelect")
        .val(Save_opt.dateFormat || 1);
	$( "#icon" )
		.css('background-color', Save_opt.colorIcon || "#000000");
	 //console.log(localStorage);
	// Settings = localStorage;
	console.log(Save_opt);
	// browser.storage.local.set({AutoSavePeriod:localStorage.AutoSavePeriod});
}

function init() {
	GetHiddenTab().then(function () {
	$( "#optionsHidden2" )
        .text( hiddentab.toString() + " hidden tabs " );
		console.log("Привлыли ------------------------------");
	});
	
	//var Setting = {};
	//localStorage = browser.storage.local.get({Settings:localStorage});
    if (getMessage("optionsPageTitle")) document.title = getMessage("optionsPageTitle"), $("#pagetitle")
        .html(getMessage("optionsPageTitle")), $("#optionsEnableCrashRecovery")
        .html(getMessage("optionsEnableCrashRecovery")), $("#optionsBackupPeriod")
        .html(getMessage("optionsBackupPeriod")), $("#optionsDateFormat")
        .html(getMessage("optionsDateFormat")), $("#stringSave")
        .html(getMessage("save")), $("#options-saved")
        .html(getMessage("optionsSaved")), $("#stringMinutes")
        .html(getMessage("minutes")),$("#optionsNewUserTips")
        .html(getMessage("optionsNewUserTips"));
		// , $(optionsReorder)
         // .html(getMessage("optionsReorder"));
	
    $("#crashRestore")
        .change(function() {
            $(this)
                .prop("checked") ? ($("#backupPeriod")
				.prop("disabled", !1), $("#backupPeriodNumber")
                .prop("disabled", !1)) : ($("#backupPeriod")
				.prop("disabled", !0), $("#backupPeriodNumber")
                .prop("disabled", !0));
        });
	$("#AutoSave")
        .change(function() {
            $(this)
                .prop("checked") ? ($("#AutoSavePeriod")
                .prop("disabled", !1), $("#AutoSaveNumber")
				.prop("disabled", !1)) : ($("#AutoSavePeriod")
				.prop("disabled", !0), $("#AutoSaveNumber")
                .prop("disabled", !0));
        });
	$("#SaveFile")
        .change(function() {
            $(this)
                .prop("checked") ? ($("#SaveFileName")
                .prop("disabled", !1)) : ($("#SaveFileName")
				.prop("disabled", !0));
				
			if ($(this).prop("checked") == false)
			{
				clearInterval(idIntervals);
			}
			console.log($(this).prop("checked"));	
        });
	$("#CloseWindow")
        .change(function() {
            $(this)
                .prop("checked") ? ($("#CloseWindowNumber")
                .prop("disabled", !1)) : ($("#CloseWindowNumber")
				.prop("disabled", !0));
        });
	$( "#optionsEnableAutoSave" )
        .html( getMessage( "optionsEnableAutoSave" ) );
	$( "#stringMinutesAutoSave" )
        .html( getMessage( "stringMinutesAutoSave" ) );
	$( "#stringMinutesbackupPeriod" )
        .html( getMessage( "stringMinutesbackupPeriod" ) );
	$( "#optionsShowAutoSave" )
        .html( getMessage( "optionsShowAutoSave" ) );
	$( "#optionsShowPopap" )
        .html( getMessage( "optionsShowPopap" ) );
	$( "#optionsShowPrivate" )
        .html( getMessage( "optionsShowPrivate" ) );
	$( "#optionsShowHidden" )
        .html( getMessage( "optionsShowHidden" ) );
	$( "#optionsHidden1" )
        .html( getMessage( "optionsHidden1" ) );
	$( "#optionsMarkAll" )
        .html( getMessage( "optionsMarkAll" ) );
	$( "#removeCrashBtn" )
        .html( getMessage( "removeCrashBtn" ) );
	$( "#optionsDisableConfirmation" )
        .html( getMessage( "optionsDisableConfirmation" ) );
	$( "#optionsDisableConfirm" )
        .html( getMessage( "optionsDisableConfirm" ) );
	$( "#DefaultSessionTitle" )
        .html( getMessage( "DefaultSessionTitle" ) );
	$( "#attention1" )
        .html( getMessage( "attention1" ) );
	$( "#attention2" )
        .html( getMessage( "attention2" ) );
	$( "#optionsLazyLoading" )
        .html( getMessage( "optionsLazyLoading" ) );
	$( "#optionsDiscarded" )
        .html( getMessage( "optionsDiscarded" ) );
	$( "#optionsSortTitle" )
        .html( getMessage( "optionsSortTitle" ) );
	$( "#stringSortTitle" )
        .html( getMessage( "stringSortTitle" ) );
	$( "#optionsListURL" )
        .html( getMessage( "optionsListURL" ) );
	$( "#optionsEnablecolorIcon" )
        .html( getMessage( "optionsEnablecolorIcon" ) );
		
	$( "#optionsShowFavicon" )
        .html( getMessage( "optionsShowFavicon" ) );
	$( "#Privacy" )
        .html( getMessage( "Privacy" ) );
	$( "#optionsShowFaviconTab" )
        .html( getMessage( "optionsShowFaviconTab" ) );
	$( "#optionsDiscarded1" )
        .html( getMessage( "optionsDiscarded1" ) );
	$( "#optionsDiscarded2" )
        .html( getMessage( "optionsDiscarded2" ) );
	$( "#optionsDiscarded3" )
        .html( getMessage( "optionsDiscarded3" ) );
	$( "#optionsDiscarded4" )
        .html( getMessage( "optionsDiscarded4" ) );
	$( "#optionsEnableCloseWindow" )
        .html( getMessage( "optionsEnableCloseWindow" ) );
	$( "#stringCloseWindow" )
        .html( getMessage( "stringCloseWindow" ) );	
	$( "#Stringtitle" )
        .html( getMessage( "Stringtitle" ) );
	$( "#Stringdate" )
        .html( getMessage( "Stringdate" ) );
	$( "#Stringtime" )
        .html( getMessage( "Stringtime" ) );
	$( "#stringHidden" )
        .html( getMessage( "stringHidden" ) );
	$( "#optionsHidden3" )
        .html( getMessage( "optionsHidden3" ) );
	$( "#optionsEnableSaveFile" )
        .html( getMessage( "optionsEnableSaveFile" ) );
	$( "#optionSaveFile" )
        .html( getMessage( "optionSaveFile" ) );
	$( "#DefaultSessionList" )
        .html( getMessage( "DefaultSessionList" ) );
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
	$( "#stringEnablePermissions" )
        .html( getMessage( "stringEnablePermissions" ) );
	$( "#stringDisablePermissions" )
        .html( getMessage( "stringDisablePermissions" ) );
	$( "#optionPermissions" )
        .html( getMessage( "optionPermissions" ) );
	$( "#optionsDarkTheme" )
        .html( getMessage( "optionsDarkTheme" ) );
	$( "#optionsPopupNewTab" )
        .html( getMessage( "optionsPopupNewTab" ) );
		
	console.log($( "#icon" ).css('background-image'));
	GetSessionTitle();
	// $( "#optionsHidden2" )
        // .text( hiddentab.toString() + "hidden tabs" );
}

//browser.storage.onChanged.addListener(InitSettings);

// var canvas = document.getElementById("canvas"),
    // ctx = canvas.getContext("2d"),
    // image = document.getElementById("testImage");
    // console.log(image);

// ctx.drawImage(image,0,0);
    
//var imgd = ctx.getImageData(0, 0, 38, 38),
    // pix = imgd.data,
    // uniqueColor = [100,60,255]; // Blue for an example, can change this value to be anything.
    // console.log(imgd);

/// Loops through all of the pixels and modifies the components.
// for (var i = 0, n = pix.length; i <n; i += 4) {
      // pix[i] = uniqueColor[0];   // Red component
      // pix[i+1] = uniqueColor[1]; // Blue component
      // pix[i+2] = uniqueColor[2]; // Green component
      ///pix[i+3] is the transparency.
// }

// ctx.putImageData(imgd, 0, 0);


// var savedImageData = document.getElementById("imageData");
// savedImageData.src = canvas.toDataURL("image/png");

var colorIcon;
var defaultColor = "#000000";

window.addEventListener("load", startup, false);
function startup() {
  colorIcon = document.querySelector("#colorIcon");
  colorIcon.value = defaultColor;
  colorIcon.addEventListener("input", updateFirst, false);
  colorIcon.addEventListener("change", updateAll, false);
  colorIcon.select();
}

function hexToRGB(hex) {
    var red = parseInt(hex.slice(1, 3), 16),
        green = parseInt(hex.slice(3, 5), 16),
        blue = parseInt(hex.slice(5, 7), 16);

    console.log(red+green+blue);
        return [red,green,blue];
    
}

function updateFirst(event)
{
	$( "#icon" ).css('background-color', event.target.value);
}


function updateAll(event) {
	
	//console.log(hexToRGB('#ffff00'));
    // var canvas = document.getElementById("canvas"),
		// ctx = canvas.getContext("2d"),
		// image = document.getElementById("testImage");
		
		// ctx.drawImage(image,0,0);

	
	
	// var imgd = ctx.getImageData(0, 0, 38, 38);
	
      // pix = imgd.data;
    let uniqueColor = hexToRGB(event.target.value); 
	console.log(event.target.value);
	// console.log(Array.from(imgd.data));
	// console.log(Uint8ClampedArray.from(Array.from(imgd.data)));
    // console.log(imgd);
	
	var pixelData = [ 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 52, 0, 0, 0, 100, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 105, 0, 0, 0, 101, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 158, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 252, 0, 0, 0, 174, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 159, 0, 0, 0, 154, 0, 0, 0, 148, 0, 0, 0, 148, 0, 0, 0, 153, 0, 0, 0, 159, 0, 0, 0, 162, 0, 0, 0, 240, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 183, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 98, 0, 0, 0, 95, 0, 0, 0, 45, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 174, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 251, 0, 0, 0, 251, 0, 0, 0, 249, 0, 0, 0, 6, 0, 0, 0, 5, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 187, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 186, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 170, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 176, 0, 0, 0, 10, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 96, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 9, 0, 0, 0, 4, 0, 0, 0, 188, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 104, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 223, 0, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 0, 0, 0, 174, 0, 0, 0, 173, 0, 0, 0, 131, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 195, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 142, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 240, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 237, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 231, 0, 0, 0, 234, 0, 0, 0, 250, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 250, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 239, 0, 0, 0, 61, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 62, 0, 0, 0, 239, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 213, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 213, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 215, 0, 0, 0, 38, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 38, 0, 0, 0, 215, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 227, 0, 0, 0, 105, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 83, 0, 0, 0, 105, 0, 0, 0, 227, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 34, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 34, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 218, 0, 0, 0, 55, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 25, 0, 0, 0, 55, 0, 0, 0, 218, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 222, 0, 0, 0, 78, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 54, 0, 0, 0, 78, 0, 0, 0, 222, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 103, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 34, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 34, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 103, 0, 0, 0, 99, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 99, 0, 0, 0, 51, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 214, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 214, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 50, 0, 0, 0, 12, 0, 0, 0, 157, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 252, 0, 0, 0, 175, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 161, 0, 0, 0, 175, 0, 0, 0, 252, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 156, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 52, 0, 0, 0, 99, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 99, 0, 0, 0, 52, 0, 0, 0, 12, 0, 0, 0, 0 ];
	
	var pix = Uint8ClampedArray.from(pixelData);
	console.log($("#EnablecolorIcon").prop("checked"));
	
	// var base64_string = 'iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gUbBikp2tk08gAAAeNJREFUWMPt2D1rFFEUxvHf7M6uEaKGFKZSsJE0ohD8BL6UioUWIohapLKw9UMI2mtpKWghCn4GNSCiNqKFhSDEl+CSbLIWOYFBZtadyc64xR64MMwM9/nPOc89d2YS2zGLRZxARzPRx0Os5V1MAuoermXOb+IJvpcU28B6HHfQRRvncCDn/me4gm95ky1h8Nd4i8MVsnAI13EVx+Jcihc5GjvjUV6V0ihfXrQrgH2OEsEW9oX4sLiApzibvbcVcOOMNEa3xMOdxvMsS8vkxJlYDPNqyNZu42Jk+nLL5MV5XBoGNhiTUJV5ZopKubfiqryNk5mW8zvm2lPlYZYL+ssdzIwhYzewOqSP5Y3lYea/FY1yfRdQbcxV2eb+tSrn/9cKmMRVOQWbgk3BpmDjbLAbNet3yoKtxgfEy5rBlvA4tq2RwL7E+/tazWCfQmtuVI8lDfmvFVqlzD9oAGxQ1mNJvHt3awbrFmWsCGwWp/C1ZrCDoTUy2M/4zvtYM9gR3Czbx7Ya8NlWlc6fNGD+pKz506h/rwGPpWXBFhoo5UJZsB7eNGT+XhFYf0jzqztjRfP3W3hdcHGzAfMXabxK8R4PbP8J3ImjuIsfNYPtD61s3MeHJNPpF3G84j+LcWVvBe/w6w8sUWgLywkEHwAAAABJRU5ErkJggg==';
	// console.log(window.atob(base64_string).length);
	// console.log(Uint8Array.from(atob(base64_string), c => c.charCodeAt(0)));
	
	
	///// Loops through all of the pixels and modifies the components.
	for (var i = 0, n = pix.length; i <n; i += 4) {
		  pix[i] = uniqueColor[0];   // Red component
		  pix[i+1] = uniqueColor[1]; // Blue component
		  pix[i+2] = uniqueColor[2]; // Green component
		  /////pix[i+3] is the transparency.
		  console.log(uniqueColor[0]);
	}

	//ctx.putImageData(imgd, 0, 0);
	
	var imgd = new ImageData(pix, 38, 38);


	//var savedImageData = document.getElementById("imageData");
	//savedImageData.src = canvas.toDataURL("image/png");
	if ($("#EnablecolorIcon").prop("checked") == true)
	{
		browser.browserAction.setIcon({imageData: imgd});
		save_options();
	}
}

//Берем название вкладки
// async function getCurrentTabName() {
  // let tabs = await browser.tabs.query({
    // active: true,
    // currentWindow: true
  // });

  // if (tabs[0] == undefined) return "";

  
    // return await tabs[0].title;
  
// }

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
    switch ( Save_opt.dateFormat )
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

function GetSessionTitle()
{
	let SessionTitle = " ";
	//let SessionTitle = await getCurrentTabName();
	console.log(SessionTitle);
	let Date1 = new Date();
	Date1 = Date1.getDate() + "/" + (Date1.getMonth() + 1) + "/" + (Date1.getYear() + 1900);
	let now = new Date();
	now = now.getMinutes();
	var Time;
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
	//console.log(tabname);
	if($("#Prefix").prop("checked") == false && $("#Title").prop("checked") == false && $("#Date1").prop("checked") == false && $("#Time").prop("checked") == false && $("#Suffix").prop("checked") == false)
	{
		SessionTitle = "MySession";
		console.log(SessionTitle);
	}
	if ($("#Prefix").prop("checked") == true)
	{
		SessionTitle = SessionTitle + $("#Stringprefix").val();
	}
	console.log($("#Title").prop("checked"));
	if ($("#Title").prop("checked") == true)
	{
		if ($("#Prefix").prop("checked") == true)
		{
			SessionTitle = SessionTitle + "_" + "{Tab_Title}";
		}
		else
		{
			SessionTitle = SessionTitle + "{Tab_Title}";
			console.log(SessionTitle);
		}
	}
	console.log(SessionTitle);
	if($("#Date1").prop("checked") == true)
	{
		if ($("#Prefix").prop("checked") == true || $("#Title").prop("checked") == true)
		{
			SessionTitle = SessionTitle + "_" + changeDateFormatNoHours(Date1);
		}
		else
		{
			SessionTitle = SessionTitle + changeDateFormatNoHours(Date1);
		}
	}
	if($("#Time").prop("checked") == true)
	{
		if ($("#Prefix").prop("checked") == true || $("#Title").prop("checked") == true || $("#Date1").prop("checked") == true)
		{
			SessionTitle = SessionTitle + "_" + Time;
		}
		else
		{
			SessionTitle = SessionTitle + Time;
		}
	}
	if($("#Suffix").prop("checked") == true)
	{
		if ($("#Prefix").prop("checked") == true || $("#Title").prop("checked") == true || $("#Date1").prop("checked") == true || $("#Time").prop("checked") == true)
		{
			SessionTitle = SessionTitle + "_" + $("#Stringsuffix").val();
		}
		else
		{
			SessionTitle = SessionTitle + $("#Stringsuffix").val();
		}
	}
	console.log(SessionTitle);
	console.log($( "#SessionTitle" ));
	$( "#SessionTitle" )
        .text( SessionTitle );
}

// async function GetHiddenTab()
// {
	// var i = 0;
	// browser.windows.getAll(
    // {
        // populate: true
    // }, function(failures)
    // {
        // failures.forEach(function(win)
        // {
			// console.log(win);
            // win.tabs.forEach(function(tab)
            // {
				// console.log(tab);
                // if (tab.hidden == true)
				// {
					// i = i + 1;
					// console.log(i);
				// }
            // });
        // });
		// hiddentab = i;
		// console.log(hiddentab);
	// });
	
// }

function GetHiddenTab()
{
	return new Promise(function (resolve, reject) 
	{
			//var S = {};
			//Возвращаем ЛС
			try
			{
			var i_n = 0;
				browser.windows.getAll(
				{
					populate: true
				}, function(failures)
				{
					failures.forEach(function(win)
					{
						console.log(win);
						win.tabs.forEach(function(tab)
						{
							//console.log(tab);
							if (tab.hidden == true)
							{
								i_n = i_n + 1;
								console.log(i_n);
							}
						});
					});
					hiddentab = i_n;
					//console.log(hiddentab);
					resolve();
				});
				
			}
			catch (ecl)
			{
				console.log(ecl);
			}
			
			//console.log(S);
			//resolve();
		
	});
}

document.addEventListener('click', function (e) {
	console.log(e.target.nodeName);
    switch (e.target.nodeName) {
        case "INPUT":
			GetSessionTitle();
            save_options();
            break;
    }
});

document.addEventListener('keyup', function (e) {
	console.log(e.target.nodeName);
    switch (e.target.nodeName) {
        case "INPUT":
			GetSessionTitle();
            save_options();
            break;
    }
});

function CloseHiddenTab()
{
	console.log(CloseHiddenTab);
	browser.windows.getAll(
				{
					populate: true
				}, function(failures)
				{
					failures.forEach(function(win)
					{
						console.log(win);
						win.tabs.forEach(function(tab)
						{
							console.log(tab);
							if (tab.hidden == true)
							{
								browser.tabs.remove(tab.id);
								
							}
						});
					});
				});
}

const permissionsToRequest = {
  permissions: ["downloads"]
};

function EnablePermissions() {

  function onResponse(response) {
    if (response) {
      console.log("Permission was granted");
	  CheckDownloadPermissions();
    } else {
      console.log("Permission was refused");
    }
    return browser.permissions.getAll();  
  }

  browser.permissions.request(permissionsToRequest)
    .then(onResponse)
    .then((currentPermissions) => {
    console.log(`Current permissions:`, currentPermissions);
  }).then(ReturnPermissions);
}

function DisablePermissions() {
	
	function onResponse(response) {
    if (response) {
      console.log("Permission was granted");
    } else {
      console.log("Permission was refused");
    }
    return browser.permissions.getAll();  
  }
  
  console.log("removing");
  browser.permissions.remove(permissionsToRequest)
  .then(onResponse)
   .then((currentPermissions) => {
    console.log(`Current permissions:`, currentPermissions);
  }).then(ReturnPermissions);
  
}

// function DisablePermissions() {
  // console.log("removing");
  // browser.permissions.remove(permissionsToRequest).then(result => {
    // console.log(result);
  // }).then((currentPermissions) => {
    // console.log(`Current permissions:`, currentPermissions);
  // }).then(browser.permissions.contains(permissionsToRequest).then((result) => {
  // console.log("Включено?");
  // console.log(result);   // 
// }));
  
// }

function ReturnPermissions()
{
	browser.permissions.contains(permissionsToRequest).then((result) => {
  console.log("Включено?");
  console.log(result);   // 
});
}

browser.permissions.contains(permissionsToRequest).then((result) => {
  console.log("Включено?");
  console.log(result);   // 
});


$(document)
    .ready(function() {
		
        init();
        InitSettings();
		GetSessionTitle();
		CheckDownloadPermissions();
		//GetHiddenTab();
		
		var ant = document.getElementById('dateFormatSelect');
			ant.addEventListener('change', function() {
			  console.log(this.value);
			  save_options();
			}, false);
		
		//console.log(localStorage);
        $("#saveBtn")
            .click(function() {
                save_options();
            });
		$("#closeHidden")
            .click(function() {
                CloseHiddenTab();
            });
		$("#enablePermissions")
            .click(function() {
                EnablePermissions();
				CheckDownloadPermissions();
            });
		$("#disablePermissions")
            .click(function() {
                DisablePermissions();
				CheckDownloadPermissions();
            });
		$( "#select" )
            .change( function()
            {
                console.log($("select").val());
				save_options();
            } );
		
		
    });
