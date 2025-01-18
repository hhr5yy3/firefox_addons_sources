/************************************************************************/
/*                                                                      */
/*      Tile Tabs WE - Generic WebExtension - Options Page              */
/*                                                                      */
/*      Javascript for Options Page                                     */
/*                                                                      */
/*      Last Edit - 28 Feb 2023                                         */
/*                                                                      */
/*      Copyright (C) 2015-2023 DW-dev                                  */
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

"use strict";

/************************************************************************/

/* Global variables */

var isFirefox;
var ffVersion;

var platformOS;

/************************************************************************/

/* Listener for options page load */

document.addEventListener("DOMContentLoaded",onLoadPage,false);

/************************************************************************/

/* Load options */

function onLoadPage(event)
{
    /* Load options from local storage */
    
    chrome.storage.local.get(null,
    function(object)
    {
        /* Load environment */
        
        isFirefox = object["environment-isfirefox"];
        
        if (isFirefox) ffVersion = object["environment-ffversion"];
	    
        platformOS = object["environment-platformos"];
        
        if (isFirefox) document.body.setAttribute("isfirefox","");
        
        if (isFirefox && ffVersion >= 60) document.body.setAttribute("shortcuts","");
        
        if (platformOS == "win") document.body.setAttribute("windows","");
        
        /* General options */
        
        document.getElementById("options-doubleclose").checked = object["options-doubleclose"];
        document.getElementById("options-showsubmenu").checked = object["options-showsubmenu"];
        document.getElementById("options-showalltabs").checked = object["options-showalltabs"];
        document.getElementById("options-showquickmenu").checked = object["options-showquickmenu"];
        document.getElementById("options-quickmenuposn").value = object["options-quickmenuposn"];
        document.getElementById("options-showquickmenuctrl").checked = object["options-showquickmenuctrl"];
        document.getElementById("options-showtoolbars").checked = object["options-showtoolbars"];
        document.getElementById("options-removetwotiles").checked = object["options-removetwotiles"];
        document.getElementById("options-togglealltiles").checked = object["options-togglealltiles"];
        
        document.getElementById("options-assignexist").checked = object["options-assignexist"];
        document.getElementById("options-assignleft").checked = object["options-assignleft"];
        document.getElementById("options-autoclosenew").checked = object["options-autoclosenew"];
        document.getElementById("options-autocloseopen").checked = object["options-autocloseopen"];
        document.getElementById("options-autocloseuser").checked = object["options-autocloseuser"];
        
        document.getElementById("options-opendefault").checked = object["options-opendefault"];
        
        document.getElementById("options-quickmenuposn").disabled = !document.getElementById("options-showquickmenu").checked;
        
        /* Page Settings options */
        
        document.getElementById("options-defaulttype").elements["type"].value = object["options-defaulttype"];
        document.getElementById("options-customurl").value = object["options-customurl"];
        
        document.getElementById("options-openlinks").elements["clicks"].value = object["options-openlinks"];
        
        document.getElementById("options-reloadpages").checked = object["options-reloadpages"];
        
        document.getElementById("options-syncactive").checked = object["options-syncactive"];
        
        document.getElementById("options-zoompertab").checked = object["options-zoompertab"];
        
        document.getElementById("options-customurl").disabled = !document.getElementById("options-custompage").checked;
        
        /* Advanced options */
        
        document.getElementById("options-topmargin").value = object["options-topmargin"];
        document.getElementById("options-lrbmarginnormal").value = object["options-lrbmarginnormal"];
        document.getElementById("options-lrbmarginpopup").value = object["options-lrbmarginpopup"];
        document.getElementById("options-maxadjust").value = object["options-maxadjust"];
        
        document.getElementById("options-openscrolldelay").value = object["options-openscrolldelay"];
        document.getElementById("options-openzoomdelay").value = object["options-openzoomdelay"];
        
        document.getElementById("options-reapplyscrolllock").checked = object["options-reapplyscrolllock"];
        
        /* Keyboard shortcuts */
        
        if (isFirefox && ffVersion >= 60)
        {
            chrome.commands.getAll(
            function(commands)
            {
                var i;
                
                for (i = 0; i < commands.length; i++)
                {
                    if (commands[i].name == "newcloselayout") document.getElementById("options-shortcuts-newcloselayout").value = commands[i].shortcut;
                    else if (commands[i].name == "hideshowlayout") document.getElementById("options-shortcuts-hideshowlayout").value = commands[i].shortcut;
                    else if (commands[i].name == "refreshlayout") document.getElementById("options-shortcuts-refreshlayout").value = commands[i].shortcut;
                    else if (commands[i].name == "toggletoolbars") document.getElementById("options-shortcuts-toggletoolbars").value = commands[i].shortcut;
                }
            });
        }
        
        /* Add listeners for click on tab buttons */
        
        document.getElementById("options-tabbar-general").addEventListener("click",showGeneralTab,false);
        document.getElementById("options-tabbar-pagesettings").addEventListener("click",showPageSettingsTab,false);
        document.getElementById("options-tabbar-advanced").addEventListener("click",showAdvancedTab,false);
        document.getElementById("options-tabbar-shortcuts").addEventListener("click",showShortcutsTab,false);
        
        /* Add listeners for click on show quick menu checkbox */
        
        document.getElementById("options-showquickmenu").addEventListener("click",onClickShowQuickMenu,false);
        
        /* Add listeners for click on default page radio buttons */
        
        document.getElementById("options-newtabpage").addEventListener("click",onClickDefaultType,false);
        document.getElementById("options-blankpage").addEventListener("click",onClickDefaultType,false);
        document.getElementById("options-custompage").addEventListener("click",onClickDefaultType,false);
        document.getElementById("options-currentpage").addEventListener("click",onClickDefaultType,false);
        
        /* Add listener for click on export button */
        
        document.getElementById("options-export-button").addEventListener("click",onClickExport,false);
        
        /* Add listener for click on import button */
        
        document.getElementById("options-import-button").addEventListener("click",onClickImport,false);
        
        /* Add listener for click on save button */
        
        document.getElementById("options-save-button").addEventListener("click",onClickSave,false);
        
        /* Add listener for click on reset all button */
        
        document.getElementById("options-resetall-button").addEventListener("click",onClickResetAll,false);
        
        /* Wait for page layout to complete */
        
        window.setTimeout(
        function()
        {
            var width1,width2,width3,width4,height1,height2,height3,height4;
            
            /* Equalize widths of tabs */
            
            width1 = window.getComputedStyle(document.getElementById("options-tab-general"),null).getPropertyValue("width");
            width2 = window.getComputedStyle(document.getElementById("options-tab-pagesettings"),null).getPropertyValue("width");
            width3 = window.getComputedStyle(document.getElementById("options-tab-advanced"),null).getPropertyValue("width");
            width4 = window.getComputedStyle(document.getElementById("options-tab-shortcuts"),null).getPropertyValue("width");
            
            width1 = width1.substr(0,width1.length-2);
            width2 = width2.substr(0,width2.length-2);
            width3 = width3.substr(0,width3.length-2);
            width4 = width4.substr(0,width4.length-2);
            
            width1 = Math.max(width1,width2,width3,width4);
            
            document.getElementById("options-tab-general").style.setProperty("width",width1 + "px","");
            document.getElementById("options-tab-pagesettings").style.setProperty("width",width1 + "px","");
            document.getElementById("options-tab-advanced").style.setProperty("width",width1 + "px","");
            document.getElementById("options-tab-shortcuts").style.setProperty("width",width1 + "px","");
            
            /* Equalize heights of tabs */
            
            height1 = window.getComputedStyle(document.getElementById("options-tab-general"),null).getPropertyValue("height");
            height2 = window.getComputedStyle(document.getElementById("options-tab-pagesettings"),null).getPropertyValue("height");
            height3 = window.getComputedStyle(document.getElementById("options-tab-advanced"),null).getPropertyValue("height");
            height4 = window.getComputedStyle(document.getElementById("options-tab-shortcuts"),null).getPropertyValue("height");
            
            height1 = height1.substr(0,height1.length-2);
            height2 = height2.substr(0,height2.length-2);
            height3 = height3.substr(0,height3.length-2);
            height4 = height4.substr(0,height4.length-2);
            
            height1 = Math.max(height1,height2,height3,height4);
            
            document.getElementById("options-tab-general").style.setProperty("height",height1 + "px","");
            document.getElementById("options-tab-pagesettings").style.setProperty("height",height1 + "px","");
            document.getElementById("options-tab-advanced").style.setProperty("height",height1 + "px","");
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
    document.getElementById("options-tabbar-pagesettings").removeAttribute("selected");
    document.getElementById("options-tabbar-advanced").removeAttribute("selected");
    document.getElementById("options-tabbar-shortcuts").removeAttribute("selected");
    
    document.getElementById("options-tab-general").style.setProperty("display","block","");
    document.getElementById("options-tab-pagesettings").style.setProperty("display","none","");
    document.getElementById("options-tab-advanced").style.setProperty("display","none","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","none","");
}

function showPageSettingsTab(event)
{
    document.getElementById("options-tabbar-general").removeAttribute("selected");
    document.getElementById("options-tabbar-pagesettings").setAttribute("selected","");
    document.getElementById("options-tabbar-advanced").removeAttribute("selected");
    document.getElementById("options-tabbar-shortcuts").removeAttribute("selected");
    
    document.getElementById("options-tab-general").style.setProperty("display","none","");
    document.getElementById("options-tab-pagesettings").style.setProperty("display","block","");
    document.getElementById("options-tab-advanced").style.setProperty("display","none","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","none","");
}

function showAdvancedTab(event)
{
    document.getElementById("options-tabbar-general").removeAttribute("selected");
    document.getElementById("options-tabbar-pagesettings").removeAttribute("selected");
    document.getElementById("options-tabbar-advanced").setAttribute("selected","");
    document.getElementById("options-tabbar-shortcuts").removeAttribute("selected","");
    
    document.getElementById("options-tab-general").style.setProperty("display","none","");
    document.getElementById("options-tab-pagesettings").style.setProperty("display","none","");
    document.getElementById("options-tab-advanced").style.setProperty("display","block","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","none","");
}

function showShortcutsTab(event)
{
    document.getElementById("options-tabbar-general").removeAttribute("selected");
    document.getElementById("options-tabbar-pagesettings").removeAttribute("selected");
    document.getElementById("options-tabbar-advanced").removeAttribute("selected");
    document.getElementById("options-tabbar-shortcuts").setAttribute("selected","");
    
    document.getElementById("options-tab-general").style.setProperty("display","none","");
    document.getElementById("options-tab-pagesettings").style.setProperty("display","none","");
    document.getElementById("options-tab-advanced").style.setProperty("display","none","");
    document.getElementById("options-tab-shortcuts").style.setProperty("display","block","");
}

/************************************************************************/

/* Enable or Disable options */

function onClickShowQuickMenu(event)
{
    document.getElementById("options-quickmenuposn").disabled = !document.getElementById("options-showquickmenu").checked;
}

function onClickDefaultType(event)
{
    document.getElementById("options-customurl").disabled = !document.getElementById("options-custompage").checked;
}

/************************************************************************/

/* Save options */

function onClickSave(event)
{
    chrome.storage.local.set(
    {
        /* General options */
        
        "options-doubleclose": document.getElementById("options-doubleclose").checked,
        "options-showsubmenu": document.getElementById("options-showsubmenu").checked,
        "options-showalltabs": document.getElementById("options-showalltabs").checked,
        "options-showquickmenu": document.getElementById("options-showquickmenu").checked,
        "options-quickmenuposn": document.getElementById("options-quickmenuposn").value,
        "options-showquickmenuctrl": document.getElementById("options-showquickmenuctrl").checked,
        "options-showtoolbars": document.getElementById("options-showtoolbars").checked,
        "options-removetwotiles": document.getElementById("options-removetwotiles").checked,
        "options-togglealltiles": document.getElementById("options-togglealltiles").checked,
        
        "options-assignexist": document.getElementById("options-assignexist").checked,
        "options-assignleft": document.getElementById("options-assignleft").checked,
        "options-autoclosenew": document.getElementById("options-autoclosenew").checked,
        "options-autocloseopen": document.getElementById("options-autocloseopen").checked,
        "options-autocloseuser": document.getElementById("options-autocloseuser").checked,
        
        "options-opendefault": document.getElementById("options-opendefault").checked,
        
        /* Page Settings options */
        
        "options-defaulttype": document.getElementById("options-defaulttype").elements["type"].value,
        "options-customurl": document.getElementById("options-customurl").value,
        
        "options-openlinks": document.getElementById("options-openlinks").elements["clicks"].value,
        
        "options-reloadpages": document.getElementById("options-reloadpages").checked,
        
        "options-syncactive": document.getElementById("options-syncactive").checked,
        
        "options-zoompertab": document.getElementById("options-zoompertab").checked,
        
        /* Advanced options */
        
        "options-topmargin": +document.getElementById("options-topmargin").value,
        "options-lrbmarginnormal": +document.getElementById("options-lrbmarginnormal").value,
        "options-lrbmarginpopup": +document.getElementById("options-lrbmarginpopup").value,
        "options-maxadjust": +document.getElementById("options-maxadjust").value,
        
        "options-openscrolldelay": +document.getElementById("options-openscrolldelay").value,
        "options-openzoomdelay": +document.getElementById("options-openzoomdelay").value,
        
        "options-reapplyscrolllock": document.getElementById("options-reapplyscrolllock").checked
    });
    
    /* Keyboard shortcuts */
    
    if (isFirefox && ffVersion >= 60)
    {
        try
        {
            chrome.commands.update({ name: "newcloselayout", shortcut: document.getElementById("options-shortcuts-newcloselayout").value });
        }
        catch (e)
        {
            chrome.commands.reset("newcloselayout");
            document.getElementById("options-shortcuts-newcloselayout").value = (platformOS == "mac") ? "MacCtrl+Shift+Up" : "Alt+Shift+Up";
        }
        
        try
        {
            chrome.commands.update({ name: "hideshowlayout", shortcut: document.getElementById("options-shortcuts-hideshowlayout").value });
        }
        catch (e)
        {
            chrome.commands.reset("hideshowlayout");
            document.getElementById("options-shortcuts-hideshowlayout").value = (platformOS == "mac") ? "MacCtrl+Shift+Down" : "Alt+Shift+Down";
        }
        
        try
        {
            chrome.commands.update({ name: "refreshlayout", shortcut: document.getElementById("options-shortcuts-refreshlayout").value });
        }
        catch (e)
        {
            chrome.commands.reset("refreshlayout");
            document.getElementById("options-shortcuts-refreshlayout").value = (platformOS == "mac") ? "MacCtrl+Shift+Left" : "Alt+Shift+Left";
        }
        
        try
        {
            chrome.commands.update({ name: "toggletoolbars", shortcut: document.getElementById("options-shortcuts-toggletoolbars").value });
        }
        catch (e)
        {
            chrome.commands.reset("toggletoolbars");
            document.getElementById("options-shortcuts-toggletoolbars").value = (platformOS == "mac") ? "MacCtrl+Shift+Right" : "Alt+Shift+Right";
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
    
    document.getElementById("options-doubleclose").checked = true;
    document.getElementById("options-showsubmenu").checked = true;
    document.getElementById("options-showalltabs").checked = false;
    document.getElementById("options-showquickmenu").checked = true;
    document.getElementById("options-quickmenuposn").value = "0";
    document.getElementById("options-showquickmenuctrl").checked = true;
    document.getElementById("options-showtoolbars").checked = true;
    document.getElementById("options-removetwotiles").checked = true;
    document.getElementById("options-togglealltiles").checked = false;
    
    document.getElementById("options-assignexist").checked = true;
    document.getElementById("options-assignleft").checked = false;
    document.getElementById("options-autoclosenew").checked = false;
    document.getElementById("options-autocloseopen").checked = false;
    document.getElementById("options-autocloseuser").checked = false;
    
    document.getElementById("options-opendefault").checked = false;
    
    document.getElementById("options-quickmenuposn").disabled = false;
    
    /* Page Settings options */
    
    document.getElementById("options-defaulttype").elements["type"].value = 0;
    document.getElementById("options-customurl").value = "";
    
    document.getElementById("options-openlinks").elements["clicks"].value = 3;
    
    document.getElementById("options-reloadpages").checked = false;
    
    document.getElementById("options-syncactive").checked = false;
    
    document.getElementById("options-zoompertab").checked = false;
    
    document.getElementById("options-customurl").disabled = true;
    
    /* Advanced options */
    
    if (platformOS == "win")
    {
        document.getElementById("options-topmargin").value = 0;
        document.getElementById("options-lrbmarginnormal").value = 7;
        document.getElementById("options-lrbmarginpopup").value = 7;
        document.getElementById("options-maxadjust").value = 1;
    }
    else  /* "linux", "mac" or other platform */
    {
        document.getElementById("options-topmargin").value = 0;
        document.getElementById("options-lrbmarginnormal").value = 0;
        document.getElementById("options-lrbmarginpopup").value = 0;
        document.getElementById("options-maxadjust").value = 0;
    }
    
    document.getElementById("options-openscrolldelay").value = 0.0;
    document.getElementById("options-openzoomdelay").value = 0.0;
    
    document.getElementById("options-reapplyscrolllock").checked = false;
    
    /* Keyboard shortcuts */
    
    if (isFirefox && ffVersion >= 60)
    {
        document.getElementById("options-shortcuts-newcloselayout").value = (platformOS == "mac") ? "MacCtrl+Shift+Up" : "Alt+Shift+Up";
        document.getElementById("options-shortcuts-hideshowlayout").value = (platformOS == "mac") ? "MacCtrl+Shift+Down" : "Alt+Shift+Down";
        document.getElementById("options-shortcuts-refreshlayout").value = (platformOS == "mac") ? "MacCtrl+Shift+Left" : "Alt+Shift+Left";
        document.getElementById("options-shortcuts-toggletoolbars").value = (platformOS == "mac") ? "MacCtrl+Shift+Right" : "Alt+Shift+Right";
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

/* Export layouts */

function onClickExport(event)
{
    chrome.storage.local.get(null,
    function(object)
    {
        var i,j,text,textBlob,objectURL,link;
        var keys = new Array();
        var textStrings = new Array();
        
        keys = Object.keys(object).sort();
        
        j = 0;
        textStrings[j] = "{";
        
        for (i = 0; i < keys.length; i++)
        {
            if (keys[i].substr(0,14) == "layout-string-")
            {
                textStrings[++j] = "  \"" + keys[i] + "\": \"" + object[keys[i]] + "\",";
            }
        }
        
        if (j > 0) textStrings[j] = textStrings[j].substr(0,textStrings[j].length-1);
        textStrings[++j] = "}";
        
        text = textStrings.join("\n");
        
        textBlob = new Blob([text], { type : "text/plain" });
        
        objectURL = window.URL.createObjectURL(textBlob);
        
        link = document.createElement("a");
        link.download = "tiletabswe-layouts.json";
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

/* Import layouts */

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
            var object = new Object();
            
            try
            {
                object = JSON.parse(this.result);
                
                chrome.storage.local.set(object);
                
                showImportStatus("Imported");
            }
            catch (e) { showImportStatus("Invalid Data"); }
        }
        
        function showImportStatus(status)
        {
            /* Display imported status for short period */
            
            document.getElementById("options-import-button").innerText = status;
            document.getElementById("options-import-button").style.setProperty("font-weight","bold","");
            
            window.setTimeout(function()
            {
                document.getElementById("options-import-button").innerText = "Import Layouts";
                document.getElementById("options-import-button").style.setProperty("font-weight","normal","");
            }
            ,1000);
        }
    }
    
    document.getElementById("options-import-button").blur();
    
    event.preventDefault();
}

/************************************************************************/
