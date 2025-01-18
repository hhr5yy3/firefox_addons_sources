/************************************************************************/
/*                                                                      */
/*      Tile Tabs WE - Generic WebExtension - Save Layout Page          */
/*                                                                      */
/*      Javascript for Save Layout Page                                 */
/*                                                                      */
/*      Last Edit - 02 Sep 2021                                         */
/*                                                                      */
/*      Copyright (C) 2015-2021 DW-dev                                  */
/*                                                                      */
/*      Distributed under the GNU General Public License version 2      */
/*      See LICENCE.txt file and http://www.gnu.org/licenses/           */
/*                                                                      */
/************************************************************************/

/************************************************************************/
/*                                                                      */
/* Refer to Google Chrome developer documentation:                      */
/*                                                                      */
/*  https://developer.chrome.com/extensions/messaging                   */
/*                                                                      */
/*  https://developer.chrome.com/extensions/runtime                     */
/*  https://developer.chrome.com/extensions/storage                     */
/*                                                                      */
/************************************************************************/

"use strict";

/************************************************************************/

/* Global variables */

var isFirefox;

var platformOS;

var replaceState;

/************************************************************************/

/* Listener for save layout page load */

document.addEventListener("DOMContentLoaded",onLoadPage,false);

/************************************************************************/

/* Initialize on page load */

function onLoadPage()
{
    replaceState = 0;
    
    document.body.addEventListener("contextmenu",onContextMenu,false);
    document.addEventListener("mousedown",onMouseDown,false);
    document.getElementById("save-layoutlist-select").addEventListener("change",onSelect,false);
    document.getElementById("save-savetabs-checkbox").addEventListener("click",onSaveTabs,false);
    document.getElementById("save-buttons-save").addEventListener("click",onSave,false);
    document.getElementById("save-buttons-cancel").addEventListener("click",onCancel,false);
    
    chrome.storage.local.get(null,
    function(object)
    {
        var i,j,select,input,savetabs,savescroll,savezoom,layoutName,layoutString,layoutType,windowCount,option;
        var keys = new Array();
        
        /* Load environment */
        
        isFirefox = object["environment-isfirefox"];
        
        platformOS = object["environment-platformos"];
        
        document.body.setAttribute("platformos",platformOS);
        
        select = document.getElementById("save-layoutlist-select");
        input = document.getElementById("save-layoutname-input");
        savetabs = document.getElementById("save-savetabs-checkbox");
        savescroll = document.getElementById("save-savescroll-checkbox");
        savezoom = document.getElementById("save-savezoom-checkbox");
        
        input.focus();
        
        keys = Object.keys(object).sort();
        
        for (i = 0; i < keys.length; i++)
        {
            if (keys[i].substr(0,14) != "layout-string-") continue;
            
            layoutName = keys[i].substr(14);
            
            layoutString = object[keys[i]];
            
            j = layoutString.indexOf(",");
            layoutType = +layoutString.substr(0,j);
            layoutString = layoutString.substr(j+1);
            
            j = layoutString.indexOf(";");
            windowCount = +layoutString.substr(0,j);
            
            option = document.createElement("option");
            
            option.setAttribute("value",layoutName);
            option.setAttribute("title",layoutName.replace(/~/g," "));
            
            if (layoutName.length <= 30)
            {
                option.text = layoutName.replace(/~/g,"\u00A0") + "\u00A0";
                for (j = 0; j < 30-layoutName.length; j++) option.text += "\u00A0";
            }
            else option.text = layoutName.replace(/~/g,"\u00A0").substr(0,30) + "\u2026";
            
            if (windowCount < 10) option.text += "\u00A0";
            
            option.text += "\u00A0\u00A0\u00A0" + windowCount;
            
            if (layoutType == 1 || layoutType == 3 || layoutType >= 5) option.text += "\u00A0\u00A0\u00A0\u00A0" + "\u25CF";
            else option.text += "\u00A0\u00A0\u00A0\u00A0\u00A0";
            
            if (layoutType == 5 || layoutType >= 7) option.text += "\u00A0\u00A0\u00A0\u00A0" + "\u25CF";
            else option.text += "\u00A0\u00A0\u00A0\u00A0\u00A0";
            
            if (layoutType == 6 || layoutType == 8) option.text += "\u00A0\u00A0\u00A0\u00A0" + "\u25CF";
            
            select.appendChild(option);
        }
        
        savetabs.checked = object["layout-savetabs"];
        savescroll.checked = object["layout-savescroll"];
        savezoom.checked = object["layout-savezoom"];
        
        savescroll.disabled = !savetabs.checked;
        savezoom.disabled = !savetabs.checked;
    });
}

/************************************************************************/

/* Disable context menu */

function onContextMenu(event)
{
    event.preventDefault();
}

/************************************************************************/

/* Hide messages */

function onMouseDown(event)
{
    document.getElementById("save-message-1").style.setProperty("display","none","");
    document.getElementById("save-message-2").style.setProperty("display","none","");
    document.getElementById("save-message-3").style.setProperty("display","none","");
    
    if (replaceState == 1)
    {
        document.getElementById("save-buttons-save").innerText = "Save";
        replaceState = 2;
    }
    else if (replaceState == 2) replaceState = 0;
}

/************************************************************************/

/* Select layout */

function onSelect(event)
{
    var select,input;
    
    select = document.getElementById("save-layoutlist-select");
    input = document.getElementById("save-layoutname-input");
    
    input.value = select.options[select.selectedIndex].getAttribute("value").replace(/~/g," ");
    
    input.focus();
}

/************************************************************************/

/* Enable or disable saving of scroll positions */

function onSaveTabs(event)
{
    var savetabs,savescroll,savezoom;
    
    savetabs = document.getElementById("save-savetabs-checkbox");
    savescroll = document.getElementById("save-savescroll-checkbox");
    savezoom = document.getElementById("save-savezoom-checkbox");
    
    savescroll.disabled = !savetabs.checked;
    savezoom.disabled = !savetabs.checked;
}

/************************************************************************/

/* Save layout */

function onSave(event)
{
    var i,select,input,savetabs,savescroll,savezoom,layoutType;
    
    select = document.getElementById("save-layoutlist-select");
    input = document.getElementById("save-layoutname-input");
    savetabs = document.getElementById("save-savetabs-checkbox");
    savescroll = document.getElementById("save-savescroll-checkbox");
    savezoom = document.getElementById("save-savezoom-checkbox");
    
    if (input.value.length == 0)
    {
        document.getElementById("save-message-1").style.setProperty("display","inline","");
        event.preventDefault();
        return;
    }
    
    if (input.value.match(/^[-_ a-zA-Z0-9]+$/) == null)
    {
        document.getElementById("save-message-2").style.setProperty("display","inline","");
        event.preventDefault();
        return;
    }
    
    if (replaceState != 2)
    {
        for (i = 0; i < select.options.length; i++)
        {
            if (input.value.replace(/ /g,"~") == select.options[i].getAttribute("value"))
            {
                document.getElementById("save-message-3").style.setProperty("display","inline","");
                
                document.getElementById("save-buttons-save").innerText = "Replace";
                replaceState = 1;
                
                event.preventDefault();
                return;
            }
        }
    }
    
    chrome.storage.local.set({ "layout-savetabs": savetabs.checked, "layout-savescroll": savescroll.checked, "layout-savezoom": savezoom.checked });
    
    if (savetabs.checked && savescroll.checked && savezoom.checked) layoutType = 8;
    else if (savetabs.checked && savescroll.checked) layoutType = 7;
    else if (savetabs.checked && savezoom.checked) layoutType = 6;
    else if (savetabs.checked) layoutType = 3;
    else layoutType = 2;
    
    chrome.runtime.sendMessage({ type: "saveLayoutReply", layoutname: input.value.replace(/ /g,"~"), layouttype: layoutType, result: true });
}

/************************************************************************/

/* Cancel operation */

function onCancel(event)
{
    chrome.runtime.sendMessage({ type: "saveLayoutReply", result: false });
}

/************************************************************************/
