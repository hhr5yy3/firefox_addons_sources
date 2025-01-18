/************************************************************************/
/*                                                                      */
/*      Tile Tabs WE - Generic WebExtension - Delete Layouts Page       */
/*                                                                      */
/*      Javascript for Delete Layouts Page                              */
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

/************************************************************************/

/* Listener for delete layouts page load */

document.addEventListener("DOMContentLoaded",onLoadPage,false);

/************************************************************************/

/* Initialize on page load */

function onLoadPage()
{
    document.body.addEventListener("contextmenu",onContextMenu,false);
    document.addEventListener("mousedown",onMouseDown,false);
    document.getElementById("delete-buttons-delete").addEventListener("click",onDelete,false);
    document.getElementById("delete-buttons-cancel").addEventListener("click",onCancel,false);
    
    chrome.storage.local.get(null,
    function(object)
    {
        var i,j,select,layoutName,layoutString,layoutType,windowCount,option;
        var keys = new Array();
        
        /* Load environment */
        
        isFirefox = object["environment-isfirefox"];
        
        platformOS = object["environment-platformos"];
        
        document.body.setAttribute("platformos",platformOS);
        
        select = document.getElementById("delete-layoutlist-select");
        
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
    });
}

/************************************************************************/

/* Disable context menu */

function onContextMenu(event)
{
    event.preventDefault();
}

/************************************************************************/

/* Hide message */

function onMouseDown(event)
{
    document.getElementById("delete-message-1").style.setProperty("display","none","");
}

/************************************************************************/

/* Delete layouts */

function onDelete(event)
{
    var i,select;
    var layoutNames = new Array();
    
    select = document.getElementById("delete-layoutlist-select");
    
    if (select.options.length == 0 || select.selectedIndex == -1)
    {
        document.getElementById("delete-message-1").style.setProperty("display","inline","");
        event.preventDefault();
        return;
    }
    
    for (i = 0; i < select.options.length; i++)
    {
        if (select.options[i].selected) layoutNames.push(select.options[i].getAttribute("value"));
    }
    
    chrome.runtime.sendMessage({ type: "deleteLayoutsReply", layoutnames: layoutNames, result: true });
}

/************************************************************************/

/* Cancel operation */

function onCancel(event)
{
    chrome.runtime.sendMessage({ type: "deleteLayoutsReply", result: false });
}

/************************************************************************/
