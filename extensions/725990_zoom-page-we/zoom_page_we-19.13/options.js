/************************************************************************/
/*                                                                      */
/*      Zoom Page WE - Generic WebExtension - Options Page              */
/*                                                                      */
/*      Javascript for Options Page                                     */
/*                                                                      */
/*      Last Edit - 16 Apr 2023                                         */
/*                                                                      */
/*      Copyright (C) 2016-2023 DW-dev                                  */
/*                                                                      */
/*      Distributed under the GNU General Public License version 2      */
/*      See LICENCE.txt file and http://www.gnu.org/licenses/           */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Refer to Google Chrome developer documentation:                     */
/*                                                                      */
/*  https://developer.chrome.com/extensions/optionsV2                   */
/*                                                                      */
/*  https://developer.chrome.com/extensions/storage                     */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/*  Zoom Mode Options                                                   */
/*                            options-zoommode                          */
/*                            per-site  per-tab                         */
/*                                                                      */
/*  options-browserpersite       Y         N                            */
/*  options-applyautofit         Y         Y                            */
/*  options-imagepertab          Y         N                            */
/*  options-cssfullzoom          Y         Y                            */
/*  options-separatesites        Y         N                            */
/*  options-allowsubsites        Y         N                            */
/*  options-resetonload          N         Y                            */
/*                                                                      */
/*  options-zoommode and options-browserpersite determine:              */
/*  - value of browser.zoom.siteSpecific in Firefox                     */
/*  - value of zoomSettings.scope in Chrome                             */
/*                                                                      */
/************************************************************************/

"use strict";

/************************************************************************/

/* Global variables */

var isFirefox;
var ffVersion;

var platformOS;

var chromeLevels = "25 33 50 67 75 80 90 100 110 125 150 175 200 250 300 400 500";
var firefoxLevels = "30 50 67 80 90 100 110 120 133 150 170 200 240 300";

var initialSizes = "0 9 10 11 12 13 14 15 16 17 18 20 22 24 26 28";

/************************************************************************/

/* Listener for options page load */

document.addEventListener("DOMContentLoaded",onLoadPage,false);

/************************************************************************/

/* Initialize on page load */

function onLoadPage(event)
{
    /* Load options from local storage */
    
    chrome.storage.local.get(null,
    function(object)
    {
        var zoommode,browserpersite;
        
        /* Load environment */
        
        isFirefox = object["environment-isfirefox"];
        
        if (isFirefox) ffVersion = object["environment-ffversion"];
	    
        platformOS = object["environment-platformos"];
        
        if (isFirefox) document.body.setAttribute("isfirefox","");
        
        if (isFirefox && ffVersion >= 60) document.body.setAttribute("shortcuts","");
        
        if (platformOS == "win") document.body.setAttribute("windows","");
        
        /* General options */
        
        document.getElementById("options-zoommode").elements["mode"].value = object["options-zoommode"];
        document.getElementById("options-browserpersite").checked = object["options-browserpersite"];
        document.getElementById("options-applyautofit").checked = object["options-applyautofit"];
        document.getElementById("options-imagepertab").checked = object["options-imagepertab"];
        document.getElementById("options-cssfullzoom").checked = object["options-cssfullzoom"];
        document.getElementById("options-separatesites").checked = object["options-separatesites"];
        document.getElementById("options-allowsubsites").checked = object["options-allowsubsites"];
        document.getElementById("options-resetonload").checked = object["options-resetonload"];
        
        document.getElementById("options-zoomtype").elements["type"].value = object["options-defaulttype"];
        
        document.getElementById("options-enablescaling").checked = object["options-enablescaling"];
        document.getElementById("options-onloadscaling").checked = object["options-onloadscaling"];
        
        document.getElementById("options-showbadge").checked = object["options-showbadge"];
        document.getElementById("options-showstates").checked = object["options-showstates"];
        document.getElementById("options-showsubmenu").checked = object["options-showsubmenu"];
        document.getElementById("options-enablectrl789").checked = object["options-enablectrl789"];
        document.getElementById("options-enablerightwheel").checked = (platformOS == "win") ? object["options-enablerightwheel"] : false;
        document.getElementById("options-modifyctrlwheel").checked = object["options-modifyctrlwheel"];
        document.getElementById("options-ignorebrowserzoom").checked = object["options-ignorebrowserzoom"];
        
        zoommode = document.getElementById("options-zoommode").elements["mode"].value;
        browserpersite = document.getElementById("options-browserpersite").checked;
        
        document.getElementById("options-browserpersite").disabled = (zoommode == 1);
        document.getElementById("options-applyautofit").disabled = (zoommode == 0) && browserpersite;
        document.getElementById("options-imagepertab").disabled = (zoommode == 1) || browserpersite;
        document.getElementById("options-cssfullzoom").disabled = (zoommode == 0) && browserpersite;
        document.getElementById("options-separatesites").disabled = (zoommode == 1) || browserpersite;
        document.getElementById("options-allowsubsites").disabled = (zoommode == 1) || browserpersite;
        document.getElementById("options-resetonload").disabled = (zoommode == 0);
        document.getElementById("options-onloadscaling").disabled = !document.getElementById("options-enablescaling").checked;
        document.getElementById("options-enablerightwheel").disabled = (platformOS != "win");
        
        /* Zoom Levels & Font Size options */
        
        document.getElementById("options-zoomlevels").value = object["options-zoomlevels"].join(" ");
        
        document.getElementById("options-defaultfulllevel").value = object["options-defaultfulllevel"];
        document.getElementById("options-defaulttextlevel").value = object["options-defaulttextlevel"];
        document.getElementById("options-defaultotherlevel").value = object["options-defaultotherlevel"];
        document.getElementById("options-autominlevel").value = object["options-autominlevel"];
        document.getElementById("options-automaxlevel").value = object["options-automaxlevel"];
        
        document.getElementById("options-zoomaction").elements["action"].value = object["options-zoomaction"];
        document.getElementById("options-fixedvalue").value = object["options-fixedvalue"];
        document.getElementById("options-smalladjust").checked = object["options-smalladjust"];
        document.getElementById("options-smallvalue").value = object["options-smallvalue"];
        
        document.getElementById("options-fontsizes").value = object["options-fontsizes"].join(" ");
        
        document.getElementById("options-defaultsize").value = object["options-defaultsize"];
        
        document.getElementById("options-adjusttextfont").checked = object["options-adjusttextfont"];
        document.getElementById("options-textfontfamily").value = object["options-textfontfamily"];
        
        document.getElementById("options-adjustlinespace").checked = object["options-adjustlinespace"];
        document.getElementById("options-linespacefactor").value = object["options-linespacefactor"];
        
        document.getElementById("options-applytodynamic").checked = object["options-applytodynamic"];
        
        document.getElementById("options-fixedvalue").disabled = document.getElementById("options-nextlevel").checked;
        document.getElementById("options-smallvalue").disabled = !document.getElementById("options-smalladjust").checked;
        document.getElementById("options-textfontfamily").disabled = !document.getElementById("options-adjusttextfont").checked;
        document.getElementById("options-linespacefactor").disabled = !document.getElementById("options-adjustlinespace").checked;
        
        /* Keyboard shortcuts */
        
        if (isFirefox && ffVersion >= 60)
        {
            chrome.commands.getAll(
            function(commands)
            {
                var i;
                
                for (i = 0; i < commands.length; i++)
                {
                    if (commands[i].name == "_execute_browser_action") document.getElementById("options-shortcuts-browseraction").value = commands[i].shortcut;
                }
            });
        }
        
        /* Add listeners for click on tab buttons */
        
        document.getElementById("options-tabbar-general").addEventListener("click",showGeneralTab,false);
        document.getElementById("options-tabbar-zoomlevels").addEventListener("click",showZoomLevelsTab,false);
        document.getElementById("options-tabbar-persitedata").addEventListener("click",showPerSiteDataTab,false);
        document.getElementById("options-tabbar-shortcuts").addEventListener("click",showShortcutsTab,false);
        
        /* Add listeners for click on per-site and per-tab radio buttons */
        
        document.getElementById("options-persite").addEventListener("click",onClickZoomMode,false);
        document.getElementById("options-pertab").addEventListener("click",onClickZoomMode,false);
        
        /* Add listener for click on let browser manage per-site full zoom checkbox */
        
        document.getElementById("options-browserpersite").addEventListener("click",onClickBrowserPerSite,false);
        
        /* Add listener for click on enable scaling checkbox */
        
        document.getElementById("options-enablescaling").addEventListener("click",onClickEnableScaling,false);
        
        /* Add listeners for click on next-level and fixed-step radio buttons */
        
        document.getElementById("options-nextlevel").addEventListener("click",onClickZoomAction,false);
        document.getElementById("options-fixedstep").addEventListener("click",onClickZoomAction,false);
        
        /* Add listener for click on press shift for small adjustment checkbox */
        
        document.getElementById("options-smalladjust").addEventListener("click",onClickSmallAdjust,false);
        
        /* Add listener for click on adjust text font checkbox */
        
        document.getElementById("options-adjusttextfont").addEventListener("click",onClickAdjustTextFont,false);
        
        /* Add listener for click on adjust line space checkbox */
        
        document.getElementById("options-adjustlinespace").addEventListener("click",onClickAdjustLineSpace,false);
        
        /* Add listener for click on export button */
        
        document.getElementById("options-export-button").addEventListener("click",onClickExport,false);
        
        /* Add listener for click on import button */
        
        document.getElementById("options-import-button").addEventListener("click",onClickImport,false);
        
        /* Add listener for click on clear all button */
        
        document.getElementById("options-clearall-button").addEventListener("click",onClickClearAll,false);
        
        /* Add listener for click on save button */
        
        document.getElementById("options-save-button").addEventListener("click",onClickSaveCheck,false);
        
        /* Add listener for click on reset all button */
        
        document.getElementById("options-resetall-button").addEventListener("click",onClickResetAll,false);
        
        /* Wait for page layout to complete */
        
        window.setTimeout(
        function()
        {
            var width1,width2,width3,width4,height1,height2,height3,height4;
            
            /* Equalize widths of tabs */
            
            width1 = window.getComputedStyle(document.getElementById("options-tab-general"),null).getPropertyValue("width");
            width2 = window.getComputedStyle(document.getElementById("options-tab-zoomlevels"),null).getPropertyValue("width");
            width3 = window.getComputedStyle(document.getElementById("options-tab-persitedata"),null).getPropertyValue("width");
            width4 = window.getComputedStyle(document.getElementById("options-tab-shortcuts"),null).getPropertyValue("width");
            
            width1 = width1.substr(0,width1.length-2);
            width2 = width2.substr(0,width2.length-2);
            width3 = width3.substr(0,width3.length-2);
            width4 = width4.substr(0,width4.length-2);
            
            width1 = Math.max(width1,width2,width3,width4);
            
            document.getElementById("options-tab-general").style.setProperty("width",width1 + "px","");
            document.getElementById("options-tab-zoomlevels").style.setProperty("width",width1 + "px","");
            document.getElementById("options-tab-persitedata").style.setProperty("width",width1 + "px","");
            document.getElementById("options-tab-shortcuts").style.setProperty("width",width1 + "px","");
            
            /* Equalize heights of tabs */
            
            height1 = window.getComputedStyle(document.getElementById("options-tab-general"),null).getPropertyValue("height");
            height2 = window.getComputedStyle(document.getElementById("options-tab-zoomlevels"),null).getPropertyValue("height");
            height3 = window.getComputedStyle(document.getElementById("options-tab-persitedata"),null).getPropertyValue("height");
            height4 = window.getComputedStyle(document.getElementById("options-tab-shortcuts"),null).getPropertyValue("height");
            
            height1 = height1.substr(0,height1.length-2);
            height2 = height2.substr(0,height2.length-2);
            height3 = height3.substr(0,height3.length-2);
            height4 = height4.substr(0,height4.length-2);
            
            height1 = Math.max(height1,height2,height3,height4);
            
            document.getElementById("options-tab-general").style.setProperty("height",height1 + "px","");
            document.getElementById("options-tab-zoomlevels").style.setProperty("height",height1 + "px","");
            document.getElementById("options-tab-persitedata").style.setProperty("height",height1 + "px","");
            document.getElementById("options-tab-shortcuts").style.setProperty("height",height1 + "px","");
            
            /* Show general tab */
            
            showGeneralTab();
            
            document.getElementById("options").style.setProperty("opacity","1","");
        },50);
    });
}


/************************************************************************/

/* Select tab */

function showGeneralTab(event)
{
    document.getElementById("options-tabbar-general").setAttribute("selected","");
    document.getElementById("options-tabbar-zoomlevels").removeAttribute("selected");
    document.getElementById("options-tabbar-persitedata").removeAttribute("selected");
    document.getElementById("options-tabbar-shortcuts").removeAttribute("selected");
    
    document.getElementById("options-tab-general").style.setProperty("display","block","");
    document.getElementById("options-tab-zoomlevels").style.setProperty("display","none","");
    document.getElementById("options-tab-persitedata").style.setProperty("display","none","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","none","");
}

function showZoomLevelsTab(event)
{
    document.getElementById("options-tabbar-general").removeAttribute("selected");
    document.getElementById("options-tabbar-zoomlevels").setAttribute("selected","");
    document.getElementById("options-tabbar-persitedata").removeAttribute("selected");
    document.getElementById("options-tabbar-shortcuts").removeAttribute("selected");
    
    document.getElementById("options-tab-general").style.setProperty("display","none","");
    document.getElementById("options-tab-zoomlevels").style.setProperty("display","block","");
    document.getElementById("options-tab-persitedata").style.setProperty("display","none","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","none","");
}

function showPerSiteDataTab(event)
{
    document.getElementById("options-tabbar-general").removeAttribute("selected");
    document.getElementById("options-tabbar-zoomlevels").removeAttribute("selected");
    document.getElementById("options-tabbar-persitedata").setAttribute("selected","");
    document.getElementById("options-tabbar-shortcuts").removeAttribute("selected");
    
    document.getElementById("options-tab-general").style.setProperty("display","none","");
    document.getElementById("options-tab-zoomlevels").style.setProperty("display","none","");
    document.getElementById("options-tab-persitedata").style.setProperty("display","block","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","none","");
}

function showShortcutsTab(event)
{
    document.getElementById("options-tabbar-general").removeAttribute("selected");
    document.getElementById("options-tabbar-zoomlevels").removeAttribute("selected");
    document.getElementById("options-tabbar-persitedata").removeAttribute("selected");
    document.getElementById("options-tabbar-shortcuts").setAttribute("selected","");
    
    document.getElementById("options-tab-general").style.setProperty("display","none","");
    document.getElementById("options-tab-zoomlevels").style.setProperty("display","none","");
    document.getElementById("options-tab-persitedata").style.setProperty("display","none","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","block","");
}

/************************************************************************/

/* Enable or Disable options */

function onClickZoomMode(event)
{
    var zoommode,browserpersite;
    
    zoommode = document.getElementById("options-zoommode").elements["mode"].value;
    browserpersite = document.getElementById("options-browserpersite").checked;

    document.getElementById("options-browserpersite").disabled = (zoommode == 1);
    document.getElementById("options-applyautofit").disabled = (zoommode == 0) && browserpersite;
    document.getElementById("options-imagepertab").disabled = (zoommode == 1) || browserpersite;
    document.getElementById("options-cssfullzoom").disabled = (zoommode == 0) && browserpersite;
    document.getElementById("options-separatesites").disabled = (zoommode == 1) || browserpersite;
    document.getElementById("options-allowsubsites").disabled = (zoommode == 1) || browserpersite;
    document.getElementById("options-resetonload").disabled = (zoommode == 0);
}

function onClickBrowserPerSite(event)
{
    var zoommode,browserpersite;
    
    zoommode = document.getElementById("options-zoommode").elements["mode"].value;
    browserpersite = document.getElementById("options-browserpersite").checked;
    
    document.getElementById("options-applyautofit").disabled = (zoommode == 0) && browserpersite;
    document.getElementById("options-imagepertab").disabled = (zoommode == 1) || browserpersite;
    document.getElementById("options-cssfullzoom").disabled = (zoommode == 0) && browserpersite;
    document.getElementById("options-separatesites").disabled = (zoommode == 1) || browserpersite;
    document.getElementById("options-allowsubsites").disabled = (zoommode == 1) || browserpersite;
    document.getElementById("options-resetonload").disabled = (zoommode == 0);
}

function onClickEnableScaling(event)
{
    document.getElementById("options-onloadscaling").disabled = !document.getElementById("options-enablescaling").checked;
}

function onClickZoomAction(event)
{
    document.getElementById("options-fixedvalue").disabled = document.getElementById("options-nextlevel").checked;
}

function onClickSmallAdjust(event)
{
    document.getElementById("options-smallvalue").disabled = !document.getElementById("options-smalladjust").checked;
}

function onClickAdjustTextFont(event)
{
    document.getElementById("options-textfontfamily").disabled = !document.getElementById("options-adjusttextfont").checked;
}

function onClickAdjustLineSpace(event)
{
    document.getElementById("options-linespacefactor").disabled = !document.getElementById("options-adjustlinespace").checked;
}

/************************************************************************/

/* Save options */

function onClickSaveCheck(event)
{
    /* Check Firefox browser.zoom.siteSpecific preference is correctly set */
    
    if (isFirefox && ffVersion <= 74)
    {
        chrome.tabs.query({ lastFocusedWindow: true, active: true },
        function(tabs)
        {
            chrome.tabs.getZoomSettings(tabs[0].id,
            function(zoomSettings)
            {
                var zoommode,browserpersite;
                
                zoommode = document.getElementById("options-zoommode").elements["mode"].value;
                browserpersite = document.getElementById("options-browserpersite").checked;
                
                if (zoomSettings.scope == "per-origin" && (zoommode == 1 || !browserpersite))
                {
                    alert("Zoom Page WE\n\n"+
                          "When 'Let browser manage per-site full zoom' is not applied,\n"+
                          "please set 'browser.zoom.siteSpecific' to 'false'\n" +
                          "in 'about:config' preferences.\n ");
                }
                else if (zoomSettings.scope == "per-tab" && (zoommode == 0 && browserpersite))
                {
                    alert("Zoom Page WE\n\n"+
                          "When 'Let browser manage per-site full zoom' is applied,\n"+
                          "please set 'browser.zoom.siteSpecific' to 'true'\n" +
                          "in 'about:config' preferences.\n ");
                }
                else onClickSave(event);
            });
        });
    }
    else onClickSave(event);
}

function onClickSave(event)
{
    var i,list,level,value,size;
    var levels = new Array();
    var sizes = new Array();
    
    /* Validate zoom levels */
    
    list = document.getElementById("options-zoomlevels").value;
    
    list = list.replace(/[^0-9 ]/g,"");
    list = list.replace(/ +/g," ");
    list = list.replace(/^ +/g,"");
    list = list.replace(/ +$/g,"");
    
    levels = list.split(" ");
    
    for (i = 0; i < levels.length; i++) levels[i] = levels[i].replace(/^0+/g,"");
    
    for (i = 0; i < levels.length; i++) if (levels[i] == "") { levels.splice(i,1); i--; }
    
    if (levels.indexOf("100") < 0) levels.push("100");
    
    levels.sort(function(a,b){ return a-b; });
    
    for (i = 0; i < levels.length; i++) if (i > 0 && levels[i] == levels[i-1]) { levels.splice(i,1); i--; }
    
    list = levels.join(" ");
    
    document.getElementById("options-zoomlevels").value = list;
    
    for (i = 0; i < levels.length; i++) levels[i] = +levels[i];
    
    /* Validate minimum font sizes */
    
    list = document.getElementById("options-fontsizes").value;
    
    list = list.replace(/[^0-9 ]/g,"");
    list = list.replace(/ +/g," ");
    list = list.replace(/^ +/g,"");
    list = list.replace(/ +$/g,"");
    
    sizes = list.split(" ");
    
    for (i = 0; i < sizes.length; i++) sizes[i] = sizes[i].replace(/^0+/g,"");
    
    for (i = 0; i < sizes.length; i++) if (sizes[i] == "") { sizes.splice(i,1); i--; }
    
    if (sizes.indexOf("0") < 0) sizes.push("0");
    
    sizes.sort(function(a,b){ return a-b; });
    
    for (i = 0; i < sizes.length; i++) if (i > 0 && sizes[i] == sizes[i-1]) { sizes.splice(i,1); i--; }
    
    list = sizes.join(" ");
    
    document.getElementById("options-fontsizes").value = list;
    
    for (i = 0; i < sizes.length; i++) sizes[i] = +sizes[i];
    
    /* Validate other fields */
    
    level = document.getElementById("options-defaultfulllevel").value.replace(/[^0-9]/g,"");
    if (+level == 0) level = "100";
    document.getElementById("options-defaultfulllevel").value = level;
    
    level = document.getElementById("options-defaulttextlevel").value.replace(/[^0-9]/g,"");
    if (+level == 0) level = "100";
    document.getElementById("options-defaulttextlevel").value = level;
    
    level = document.getElementById("options-defaultotherlevel").value.replace(/[^0-9]/g,"");
    if (+level == 0) level = "100";
    document.getElementById("options-defaultotherlevel").value = level;
    
    level = document.getElementById("options-autominlevel").value.replace(/[^0-9]/g,"");
    if (+level == 0) level = "67";
    document.getElementById("options-autominlevel").value = level;
    
    level = document.getElementById("options-automaxlevel").value.replace(/[^0-9]/g,"");
    if (+level == 0) level = "150";
    document.getElementById("options-automaxlevel").value = level;
    
    value = document.getElementById("options-fixedvalue").value.replace(/[^0-9]/g,"");
    if (+value == 0) value = "10";
    document.getElementById("options-fixedvalue").value = value;
    
    value = document.getElementById("options-smallvalue").value.replace(/[^0-9]/g,"");
    if (+value == 0) value = "5";
    document.getElementById("options-smallvalue").value = value;
    
    size = document.getElementById("options-defaultsize").value.replace(/[^0-9]/g,"");
    if (+size == 0) size = "0";
    document.getElementById("options-defaultsize").value = size;
    
    /* Save options to local storage */
    
    chrome.storage.local.set(
    {
        /* General options */
        
        "options-zoommode": +document.getElementById("options-zoommode").elements["mode"].value,
        "options-browserpersite": document.getElementById("options-browserpersite").checked,
        "options-applyautofit": document.getElementById("options-applyautofit").checked,
        "options-imagepertab": document.getElementById("options-imagepertab").checked,
        "options-cssfullzoom": document.getElementById("options-cssfullzoom").checked,
        "options-separatesites": document.getElementById("options-separatesites").checked,
        "options-allowsubsites": document.getElementById("options-allowsubsites").checked,
        "options-resetonload": document.getElementById("options-resetonload").checked,
        
        "options-defaulttype": +document.getElementById("options-zoomtype").elements["type"].value,
        
        "options-enablescaling": document.getElementById("options-enablescaling").checked,
        "options-onloadscaling": document.getElementById("options-onloadscaling").checked,
        
        "options-showbadge": document.getElementById("options-showbadge").checked,
        "options-showstates": document.getElementById("options-showstates").checked,
        "options-showsubmenu": document.getElementById("options-showsubmenu").checked,
        "options-enablectrl789": document.getElementById("options-enablectrl789").checked,
        "options-enablerightwheel": document.getElementById("options-enablerightwheel").checked,
        "options-modifyctrlwheel": document.getElementById("options-modifyctrlwheel").checked,
        "options-ignorebrowserzoom": document.getElementById("options-ignorebrowserzoom").checked,
        
        /* Zoom Levels & Font Size options */
        
        "options-zoomlevels": levels,
        
        "options-defaultfulllevel": +document.getElementById("options-defaultfulllevel").value,
        "options-defaulttextlevel": +document.getElementById("options-defaulttextlevel").value,
        "options-defaultotherlevel": +document.getElementById("options-defaultotherlevel").value,
        "options-autominlevel": +document.getElementById("options-autominlevel").value,
        "options-automaxlevel": +document.getElementById("options-automaxlevel").value,
        
        "options-zoomaction": +document.getElementById("options-zoomaction").elements["action"].value,
        "options-fixedvalue": +document.getElementById("options-fixedvalue").value,
        "options-smalladjust": document.getElementById("options-smalladjust").checked,
        "options-smallvalue": +document.getElementById("options-smallvalue").value,
        
        "options-fontsizes": sizes,
        
        "options-defaultsize": +document.getElementById("options-defaultsize").value,
        
        "options-adjusttextfont": document.getElementById("options-adjusttextfont").checked,
        "options-textfontfamily": document.getElementById("options-textfontfamily").value,
        
        "options-adjustlinespace": document.getElementById("options-adjustlinespace").checked,
        "options-linespacefactor": +document.getElementById("options-linespacefactor").value,
        
        "options-applytodynamic": document.getElementById("options-applytodynamic").checked
    });
    
    /* Keyboard shortcuts */
    
    if (isFirefox && ffVersion >= 60)
    {
        try
        {
            chrome.commands.update({ name: "_execute_browser_action", shortcut: document.getElementById("options-shortcuts-browseraction").value });
        }
        catch (e)
        {
            chrome.commands.reset("_execute_browser_action");
            document.getElementById("options-shortcuts-browseraction").value = "Alt+Z";
        }
    }
    
    /* Display saved status for short period */
    
    document.getElementById("options-save-button").innerText = "Saved";
    document.getElementById("options-save-button").style.setProperty("font-weight","bold","");
    
    window.setTimeout(function()
    {
        document.getElementById("options-save-button").innerText = "Save";
        document.getElementById("options-save-button").style.setProperty("font-weight","normal","");
    }
    ,1000);
}

/************************************************************************/

/* Reset All options */

function onClickResetAll(event)
{
    /* General options */
    
    document.getElementById("options-zoommode").elements["mode"].value = 0;
    document.getElementById("options-browserpersite").checked = false;
    document.getElementById("options-applyautofit").checked = false;
    document.getElementById("options-imagepertab").checked = false;
    document.getElementById("options-cssfullzoom").checked = !isFirefox;
    document.getElementById("options-separatesites").checked = !isFirefox;
    document.getElementById("options-allowsubsites").checked = false;
    document.getElementById("options-resetonload").checked = !isFirefox;
    
    document.getElementById("options-zoomtype").elements["type"].value = 0;
    
    document.getElementById("options-enablescaling").checked = true;
    document.getElementById("options-onloadscaling").checked = false;
    
    document.getElementById("options-showbadge").checked = true;
    document.getElementById("options-showstates").checked = true;
    document.getElementById("options-showsubmenu").checked = true;
    document.getElementById("options-enablectrl789").checked = true;
    document.getElementById("options-enablerightwheel").checked = false;
    document.getElementById("options-modifyctrlwheel").checked = false;
    document.getElementById("options-ignorebrowserzoom").checked = false;
    
    document.getElementById("options-browserpersite").disabled = false;
    document.getElementById("options-applyautofit").disabled = false;
    document.getElementById("options-imagepertab").disabled = false;
    document.getElementById("options-cssfullzoom").disabled = false;
    document.getElementById("options-separatesites").disabled = false;
    document.getElementById("options-allowsubsites").disabled = false;
    document.getElementById("options-resetonload").disabled = true;
    document.getElementById("options-onloadscaling").disabled = false;
    document.getElementById("options-enablerightwheel").disabled = (platformOS != "win");
    
    /* Zoom Levels & Font Size options */
    
    document.getElementById("options-zoomlevels").value = isFirefox ? firefoxLevels : chromeLevels;
    
    document.getElementById("options-defaultfulllevel").value = 100;
    document.getElementById("options-defaulttextlevel").value = 100;
    document.getElementById("options-defaultotherlevel").value = 100;
    document.getElementById("options-autominlevel").value = 67;
    document.getElementById("options-automaxlevel").value = 150;
    
    document.getElementById("options-zoomaction").elements["action"].value = 0;
    document.getElementById("options-fixedvalue").value = 10;
    document.getElementById("options-smalladjust").checked = false;
    document.getElementById("options-smallvalue").value = 5;
    
    document.getElementById("options-fontsizes").value = initialSizes;

    document.getElementById("options-defaultsize").value = 0;
    
    document.getElementById("options-adjusttextfont").checked = false;
    document.getElementById("options-textfontfamily").value = "Arial";
    
    document.getElementById("options-adjustlinespace").checked = false;
    document.getElementById("options-linespacefactor").value = 1.2;
    
    document.getElementById("options-applytodynamic").checked = true;
    
    document.getElementById("options-fixedvalue").disabled = true;
    document.getElementById("options-smallvalue").disabled = true;
    document.getElementById("options-textfontfamily").disabled = true;
    document.getElementById("options-linespacefactor").disabled = true;
    
    /* Keyboard shortcuts */
    
    if (isFirefox && ffVersion >= 60)
    {
        document.getElementById("options-shortcuts-browseraction").value = "Alt+Z";
    }
    
    /* Display reset status for short period */
    
    document.getElementById("options-resetall-button").innerText = "Reset";
    document.getElementById("options-resetall-button").style.setProperty("font-weight","bold","");
    
    window.setTimeout(function()
    {
        document.getElementById("options-resetall-button").innerText = "Reset All";
        document.getElementById("options-resetall-button").style.setProperty("font-weight","normal","");
    }
    ,1000);
}

/************************************************************************/

/* Export per-site data */

function onClickExport(event)
{
    chrome.runtime.sendMessage({ type: "getsitedata" },
    function(object)
    {
        var textBlob,objectURL,link;
        
        textBlob = new Blob([object.text], { type : "text/plain" });
        
        objectURL = window.URL.createObjectURL(textBlob);
        
        link = document.createElement("a");
        link.download = "zoompagewe-persitedata.json";
        link.href = objectURL;
        
        link.addEventListener("click",handleClick,true);
        
        link.dispatchEvent(new MouseEvent("click"));
        
        link.removeEventListener("click",handleClick,true);
        
        function handleClick(event)
        {
            event.stopPropagation();
        }
    });
    
    document.getElementById("options-export-button").blur();
    
    event.preventDefault();
}

/************************************************************************/

/* Import per-site data */

function onClickImport(event)
{
    var input;
    
    input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.value = "";
    
    input.addEventListener("change",handleChange,true);
    
    input.addEventListener("click",handleClick,true);
    
    input.dispatchEvent(new MouseEvent("click"));
    
    input.removeEventListener("click",handleClick,true);
    
    function handleClick(event)
    {
        event.stopPropagation();
    }
    
    function handleChange()
    {
        var file,filereader;
        
        file = this.files[0];
        
        if (typeof file != "undefined" && file.name != "" && file.type == "application/json")
        {
            filereader = new FileReader();
            filereader.onload = handleLoad;
            filereader.readAsText(file);
        }
        else showImportStatus("Invalid File");
        
        function handleLoad()
        {
            var text;
            
            text = this.result;
            
            chrome.runtime.sendMessage({ type: "setsitedata", text: text },
            function(object)
            {
                showImportStatus(object.imported ? "Imported" : "Invalid Data");
            });
        }
        
        function showImportStatus(status)
        {
            /* Display imported status for short period */
            
            document.getElementById("options-import-button").innerText = status;
            document.getElementById("options-import-button").style.setProperty("font-weight","bold","");
            
            window.setTimeout(function()
            {
                document.getElementById("options-import-button").innerText = "Import Per-Site Data";
                document.getElementById("options-import-button").style.setProperty("font-weight","normal","");
            }
            ,1000);
        }
    }
    
    document.getElementById("options-import-button").blur();
    
    event.preventDefault();
}

/************************************************************************/

/* Clear All per-site data */

function onClickClearAll(event)
{
    chrome.runtime.sendMessage({ type: "clearsitedata" });
    
    /* Display cleared status for short period */
    
    document.getElementById("options-clearall-button").innerText = "Cleared";
    document.getElementById("options-clearall-button").style.setProperty("font-weight","bold","");
    
    window.setTimeout(function()
    {
        document.getElementById("options-clearall-button").innerText = "Clear All Per-Site Data";
        document.getElementById("options-clearall-button").style.setProperty("font-weight","normal","");
    }
    ,1000);
    
    document.getElementById("options-clearall-button").blur();
    
    event.preventDefault();
}

/************************************************************************/
