// Creates <div class="item-wrap"> ... </div> element with unique parameters for each radio-line
// q - gif image (loading)
// с - name of radio station (f.e. : disco80's)
// a.name - name of radio station (f.e. : Disco80's)
// b - ??? reponse for actions ???
/**
 * @brief     Function creates a div element and adds event listeners onRemove, onEdit, onClick on it
 * @param     a         ???
 * @param     c         ???
 * @param     b         ???
 * @return    div       <div class="play-wrap"> ... </div>
 */
function createElementDivPlayWrap(a, c, b) {
    var div = document.createElement("div");
    div.classList.add("item-wrap");
    
    var play_wrap = document.createElement("div");
    play_wrap.classList.add("play-wrap");
    var play_new = document.createElement("div");
    play_new.classList.add("play-new");
    play_wrap.appendChild(play_new);
    
    var item_title = document.createElement("div");
    item_title.classList.add("item-title");
    item_title.textContent = a.name;
    
    var loading_img = document.createElement("img");
    loading_img.setAttribute("src", q);
    
    var actions = document.createElement("div");
    actions.classList.add("actions");
    var audio_remove_wrap = document.createElement("div");
    audio_remove_wrap.classList.add("audio-remove-wrap");
    audio_remove_wrap.id = "remove" + c;
    var audio_remove = document.createElement("div");
    audio_remove.classList.add("audio-remove");
    audio_remove_wrap.appendChild(audio_remove);
    var audio_edit_wrap = document.createElement("div");
    audio_edit_wrap.classList.add("audio-edit-wrap");
    audio_edit_wrap.id = "edit" + c;
    var audio_edit = document.createElement("div");
    audio_edit.classList.add("audio-edit");
    audio_edit_wrap.appendChild(audio_edit);
    actions.appendChild(audio_remove_wrap);
    actions.appendChild(audio_edit_wrap);
    
    div.appendChild(play_wrap);
    div.appendChild(item_title);
    div.appendChild(loading_img);
    div.appendChild(actions);
    
    div.id = a.id;
    div.setAttribute("name", a.name);
    //<div class="item-wrap" id='c' name='a.name'> ... <div>
    var click_flag = false;
    div.addEventListener("mousedown", function() {
        click_flag = true;
    }); 
    div.addEventListener("mousemove", function() {
        click_flag && (click_flag = false);
    }); 
    div.addEventListener("mouseup", function(e) {
        if (click_flag && e.target != audio_remove && e.target != audio_edit) {
            b.onClick.apply(this, arguments);
        }
    }); 
    div.querySelector(".audio-remove-wrap").addEventListener("click", b.onRemove);
    div.querySelector(".audio-edit-wrap").addEventListener("click", b.onEdit);
    return div;
}

/**
 * @brief     Function resizes the popup
 */
function resizePopup() {}

/**
 * @brief     Function displays/hides div elements <div class="item-wrap"> ... </div>
 * @param     str       innerText of .item-title element
 */
function displayElementDivItemWrap(str) {
    // c - itemwraps
    var itemWraps = document.querySelector(".radio-list").children;
    for (var idx = 0; idx < itemWraps.length; idx++) {
        var divTxtIT = itemWraps[idx].querySelector(".item-title").innerText;
        itemWraps[idx].style.display = (-1 < divTxtIT.toLowerCase().indexOf(str.toLowerCase())) ? "block" : "none";
    }
    resizePopup();
}

/**
 * @brief     Function changes the current station
 * @param     stId      item-wrap's id (station name)
 */
function switchStation(stId) {
    var divASN = document.querySelector(".ac-station-name");
    var itemWraps = document.querySelector(".radio-list").children;
    if (stId && stId.length) {
        for (var idx = 0; idx < itemWraps.length; idx++) {
            // TODO : watch logic (removeClass in for {})
            itemWraps[idx].classList.remove("current");
            if (itemWraps[idx].id == stId) {
                itemWraps[idx].classList.add("current");
                i.setState(stId);
                divASN.textContent = itemWraps[idx].getAttribute("name");
            }
        }
    } else {
        divASN.textContent = "";
        i.setState("");
    }
}

/**
 * @brief     Function removes 'loading' class
 */
function removeLoading() {
    var itemWraps = document.querySelector(".radio-list").children;
    for (var idx = 0; idx < itemWraps.length; idx++){
        itemWraps[idx].classList.remove("loading");
    }
}

/**
 * @brief     Function adds 'playing' class / play on
 * @param     divCurIt  an div element item-wrap with class .current
 */
function playAudio(e) { // e := divCurIt
    var divRL = document.querySelector(".radio-list");
    var divAPB = document.querySelector(".ac-play-btn");
    //divCurIt || (divCurIt = document.querySelector(".current")); 
    var divCurIt = document.querySelector(".current");
    //divCurIt.classList.add("loading");
    divCurIt.classList.add("loading");
    i.playAudio(function() {
        removeLoading();
    });
    divRL.classList.add("playing");
    divAPB.classList.add("playing");
}

/**
 * @brief     Function removes 'playing' class / pause
 */
function pauseAudio() {
    var divRL = document.querySelector(".radio-list");
    var divAPB = document.querySelector(".ac-play-btn");
    i.pauseAudio(function() {
        removeLoading();
    });
    divRL.classList.remove("playing");
    divAPB.classList.remove("playing");
}

/**
 * @brief     Function plays the current radio station.
 */
function playStation() {
    if (this.classList.contains("current")) {
        document.querySelector(".ac-play-btn").click(); 
    } else {
        switchStation(this.id);
        playAudio(this); 
    }
}

/**
 * @brief     Function shows / hides Search Box
 */
function displayAddNew() {
    var divNewIt = document.querySelector(".new-item");
    var divSW = document.querySelector(".search-wrap");
    var divBG = document.querySelector(".background");
    var divInputs = divNewIt.querySelectorAll("input");
    divNewIt.removeAttribute("change");
    divSW.classList.contains("active") && showSearch();
    if (divNewIt.classList.contains("active")) {
        divNewIt.classList.remove("active"); 
        divBG.classList.remove("active");
    } else {
        divNewIt.classList.add("active");
        divBG.classList.add("active");
        divInputs[0].value = "";
        divInputs[1].value = "";
        divInputs[0].focus();
    }
    resizePopup();
}

/**
 * @brief     Function edits station's properties
 * @param     el        @see onClick event
 */
function editStation(el) {
    el.stopPropagation();
    var divNewIt = document.querySelector(".new-item");
    var divSW = document.querySelector(".search-wrap");
    var divBG = document.querySelector(".background");
    var divInputs = divNewIt.querySelectorAll("input");
    divSW.classList.contains("active") && showSearch();
    divNewIt.classList.add("active");
    divBG.classList.add("active");
    divSW = this.id.match(/edit([\s\S]*)/)[1];
    divBG = i.getStationById(divSW);
    divNewIt.setAttribute("change", divSW);
    divInputs[0].value = divBG.name;
    divInputs[1].value = divBG.url;
    divInputs[0].focus();
    resizePopup();
}

/**
 * @brief     Function removes station's properties
 * @param     el        @see onClick event
 */
function removeStation(el) {
    el.stopPropagation();
    var divId = this.id.match(/remove([\s\S]*)/)[1];
    var divAPB = document.querySelector(".ac-play-btn");
    var divRL = document.querySelector(".radio-list");
    var ddiv = document.getElementById(divId);
    var eId = i.getState().id;
    divRL.removeChild(ddiv);
    i.removeStation(divId);
    if (divRL.children.length) {
        if (ddiv.id == eId) {
            var div = divRL.children[0];
            switchStation(div.id);
            div.classList.remove("current");
        }
    } else { 
        switchStation(""); 
    }
    divRL.classList.contains("playing") && ddiv.classList.contains("current") && divAPB.click();
    resizePopup();
}

/**
 * @brief     Function closes .err-msg
 */
function deactiveErrMsg() {

    document.querySelector(".err-msg").classList.remove("active");
}

/**
 * @brief     Function saves properies of new station
 */
function saveProperties() {
    var divNewIt = document.querySelector(".new-item");
    var divInputs = divNewIt.querySelectorAll("input");
    var divErrMsg = divNewIt.querySelector(".err-msg");
    var divBG = document.querySelector(".background");
    var e = false;
    if ("" == divInputs[0].value || "" == divInputs[1].value) {
        divErrMsg.setAttribute("type", "0");
        e = true;
    } else if (/^(https?):\/\//.test(divInputs[1].value)) {
        var g = null;
        var f = divNewIt.getAttribute("change");
        if (g = i.addNewStattion({
            name: divInputs[0].value,
            url: divInputs[1].value,
            id: f
        })) {

            var divRL = document.querySelector(".radio-list");
                g = createElementDivPlayWrap(g, g.id, {
                    onClick: playStation,
                    onEdit: editStation,        
                    onRemove: removeStation
                });
            if (f) { 
                var divF = document.getElementById(f);
                g.className = divF.className;
                divRL.replaceChild(g, divF); 
            } else {
                divRL.appendChild(g);
            }
            divInputs[0].value = divInputs[1].value = "";
            divNewIt.classList.remove("active");
            divBG.classList.remove("active")
        } else{ 
            divErrMsg.setAttribute("type", "2");
            e = true;
        }
    } else { 
        divErrMsg.setAttribute("type", "1"); 
        e = true; 
    }
    if (e) {
        var strLc = chrome.i18n.getMessage("appErrMsg" + divErrMsg.getAttribute("type"));
        divErrMsg.textContent = strLc;
        divErrMsg.classList.add("active");
    }
    resizePopup();
}

/**
 * @brief     Function shows / hides Search Box (again?)
 */
function showSearch() {
    var divSW = document.querySelector(".search-wrap");
    var divRL = document.querySelector(".radio-list");
    if (divSW.classList.contains("active")) {
        divSW.classList.remove("active");
        divRL.classList.remove("search");
        displayElementDivItemWrap("");
    } else {
        divSW.classList.add("active");
        divRL.classList.add("search");
        divSW.querySelector("input").focus();
    }
    resizePopup();
}

/**
 * @brief     Function displays all results
 */
function displaySearchResult() {

    displayElementDivItemWrap(this.value);
}

/**
 * @brief     Function goes on prev/next station on click
 * @param     el         div element (prev or next arrow)
 */ 
function neighborStation(el) {
    var divACs = document.querySelectorAll(".ac-ctrl");
    var divRL = document.querySelector(".radio-list");
    var div = document.getElementById(i.getState().id);
    var e = 0;
    if (div) {
        if (el.target == divACs[0]) {
            el = div.previousSibling;
            el || (e = divRL.children.length - 1, el = divRL.children[e]);
        } else {
            (el = div.nextSibling) || (el = divRL.children[e]);
        }
        if (divRL.classList.contains("playing")) {
            playStation.apply(el);                                              // TODO : r ? 
        } else {
            switchStation(el.id);
        }
    }
}

/**
 * @brief     Function ???
 * @param     div            <div class="radio-container"> ... </div>
 * @var       divVTW         <div class = "volume-tip-wrap">
 * @var       divVSHandle    <div class="volume-slider-handle">
 * @var       divVS          <div class="volume-slider">
 * @var       divVSRange     <div class="volume-slider-range">
 * @var       h              capture-flag for volume-slider
 * @var       x              pageX value
 * @var       cx             offsetWidth value
 */
function H(div) {
    /**
     * @brief   Function sets volume
     * @param   vol       volume  [0;100]
     * @var     divVTW    @see function H(div)
     * @var     divVS     @see function H(div)
     */
    function setVolume(vol) { 
        var divVT = divVTW.querySelector(".volume-tip");
        var divVTA = divVTW.querySelector(".volume-tip-arrow");
        divVTW.style.display = "block";
        divVT.innerText = parseInt(vol) + "%";
        divVTA.style.left = divVTW.offsetWidth / 2 - divVTA.offsetWidth / 2 + "px";
        divVTW.style.left = -divVTW.offsetWidth / 2 + vol * divVS.offsetWidth / 100 + "px"
    }

    /**
     * @brief   Function changes volume
     * @param   el         ???
     * @var     divVSHandle  @see function H(div)
     * @var     divVSRange   @see function H(div)
     * @var     divVS        @see function H(div)   
     * @var     h            @see function H(div)
     * @var     x            @see function H(div)
     * @var     cx            @see function H(div)  
     */
    function changeVolume(el) {
        if (0 == el.button) {
            var vol = 100 * (divVSRange.offsetWidth / divVS.offsetWidth);
            if (el.target == divVSHandle) {
                el.stopPropagation() 
            } else {
                vol = 100 * (el.layerX / divVS.offsetWidth);
                divVSRange.style.width = vol + "%";
                divVSHandle.style.left = vol + "%";
                i.changeVolume(vol);
            }
            h = !0;
            x = el.pageX;
            cx = divVSRange.offsetWidth;                                     
            divVSHandle.style.display = "block";
            setVolume(vol);   
        }
    }

    var divVS = div.querySelector(".volume-slider");
    var divVSRange = div.querySelector(".volume-slider-range");
    var divVSHandle = div.querySelector(".volume-slider-handle");
    var divVTW = div.querySelector(".volume-tip-wrap");
    var h = !1;
    var x;
    var cx;
    
    divVS.addEventListener("mousedown", changeVolume);
    divVSHandle.addEventListener("mousedown", changeVolume);
    
    document.addEventListener("mouseup", function() {
        h = !1;
        divVTW.style.display = "none";
        divVSHandle.style.display = "none"
    });

    document.addEventListener("mousemove", function(a) {
        if (h) {
            a = 100 * ((cx + (a.pageX - x)) / divVS.offsetWidth);
            a = (a < 0) ? 0 : a;
            a = (a > 100) ? 100 : a;
            divVSRange.style.width = a + "%", setVolume(a);
            divVSHandle.style.left = a + "%", setVolume(a);
            i.changeVolume(a);
        }
    })
}

/**
 * @brief     Function deactivates new-item element
 */
function deactivateNewIt() {
    this.classList.remove("active");
    document.querySelector(".new-item").classList.remove("active");
    resizePopup();
}

/**
 * @brief     Function  localizes UI
 */
function localize() {
    var divNewIt = document.querySelector(".new-item");
    errMsgUI = divNewIt.querySelector(".err-msg");
    nameUI = divNewIt.querySelector('.title[type="name"]');
    urlUI = divNewIt.querySelector('.title[type="url"]');
    saveBtnUI = divNewIt.querySelector(".ac-save-btn");
    searchUI = document.querySelector("input.search");
    var strLc = chrome.i18n.getMessage("appErrMsg" + errMsgUI.getAttribute("type"));
    errMsgUI.textContent = strLc;
    strLc = chrome.i18n.getMessage("appTitleName") + ":";
    nameUI.textContent = strLc;
    strLc = chrome.i18n.getMessage("appTitleUrl") + ":";
    urlUI.textContent = strLc;
    strLc = chrome.i18n.getMessage("appSaveBtn");
    saveBtnUI.textContent = strLc;
    strLc = chrome.i18n.getMessage("appSearchPlaceHolder");
    searchUI.placeholder = strLc;
    resizePopup();
}

// @var       q         gif loading
var q = "data:image/gif;base64,R0lGODlhUABQAOZ/ANrh67/BwqiyvdPU1PX+/7q8wMrLzNvb27zd9vb29uLq9MzS2v39/YTC/vn5+ez1/+ny/6bS/n249MPExay5w8HFyZequ3u171mw9aLM98Lk/cXK0tPa5PHx8eDg4e7u7vD5/4G9+JzF77S6wWel1+Xm5unq6szO0efw/7rV6J7I85651Mns/+Tt98bIyYS26LPH1omqyuv0/3Wix7C4v7u9v1Kl5ry+wZ2zyPL8/+73/9bd6KHF6lOp7Vat8b7CyN3l8ImlvIiu1JGqw93e34Wx3Pb//9DV3Pv//1us69bX17u/xOjw+aGvvWOp4MXo/9L2/73e97/g+rbO4K62vtDX4FKn6Z/B45682cfa6sLi916j2LHCzn6jwF2p5c3x/+z1+uzy9ri8wOLj456+3a7AzW6jzl24/r7b8G2exK/C0a3b/16m4OTk5MnO18LHzk2l6mGv7a69yPP9/+jo6PT09PLy8+fn59/n7+vr6+zs7HWmzY2v0Iafsubv/////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNl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";
        
var i; // object from background.js

function initDragNDrop() {
    var canStartDrag = false;
    var realEl = null;
    var draggedEl = null;
    var hoveredEl = null;
    var insertType = null;
    var deltaPos = {x: 0, y: 0};
    var list_wrap = document.querySelector('.radio-list-wrap');
    
    function getHoveredItem(x, y) {
        var all_els = document.elementsFromPoint(x, y);
        for (var i = 0; i < all_els.length; i++) {
            if (all_els[i].classList.contains('item-wrap') && !all_els[i].classList.contains('dragging') && !all_els[i].classList.contains('temp')) {
                return all_els[i];
            }
        }
        return null;
    }
    
    document.addEventListener('mousedown', function(e) {
        if (e.button == 0 && (e.target.classList.contains('item-wrap') || e.target.parentNode.classList.contains('item-wrap'))) {
            canStartDrag = true;
        }
    });
    document.addEventListener('mousemove', function(e) {
        if (canStartDrag) {
            canStartDrag = false;
            realEl = e.target.classList.contains('item-wrap') ? e.target : e.target.parentNode;
            draggedEl = realEl.cloneNode(true);
            draggedEl.classList.add('dragging');
            realEl.parentNode.insertBefore(draggedEl, realEl);
            realEl.classList.add('temp');
            var rect = draggedEl.getBoundingClientRect();
            deltaPos = {
                x: e.clientX - rect.left,
                y: e.clientY - (rect.top - list_wrap.scrollTop)
            };
        }
        
        if (draggedEl) {
            draggedEl.style.left = (e.clientX - deltaPos.x) + 'px';
            draggedEl.style.top = (e.clientY - deltaPos.y) + 'px';
            var rect = draggedEl.getBoundingClientRect();
            hoveredEl = getHoveredItem(5, rect.top + rect.height / 2) || hoveredEl;
            if (hoveredEl) {
                var hovered_rect = hoveredEl.getBoundingClientRect();
                if (rect.top + rect.height / 2 > hovered_rect.top + hovered_rect.height / 2) {
                    insertType = 'after';
                    hoveredEl.parentNode.insertBefore(realEl, hoveredEl.nextSibling);
                }
                else {
                    insertType = 'before';
                    hoveredEl.parentNode.insertBefore(realEl, hoveredEl);
                }
                var list_wrap_rect = list_wrap.getBoundingClientRect();
                if (rect.top < list_wrap_rect.top) {
                    list_wrap.scrollTop -= 10;
                }
                else if (rect.top + rect.height > list_wrap_rect.top + list_wrap_rect.height) {
                    list_wrap.scrollTop += 10;
                }
            }
        }
    });
    document.addEventListener('mouseup', function(e) {
        canStartDrag = false;
        if (realEl && hoveredEl && insertType && realEl.id != hoveredEl.id) {
            i.changeIndex(realEl.id, hoveredEl.id, insertType);
        }
        if (draggedEl) {
            draggedEl.remove();
            draggedEl = null;
        }
        if (realEl) {
            realEl.classList.remove('temp');
        }
        insertType = null;
        hoveredEl = null;
    });
}

function main() {
    chrome.storage.local.get( "stations", function(result){
        var a = result.stations;
        chrome.storage.local.get("state", function(res){    
            var c = res.state;                                          
            var divMC = document.querySelector(".main-container");
            var divRC = document.querySelector(".radio-container");
            var divRL = divRC.querySelector(".radio-list");
            var divAPB = divRC.querySelector(".ac-play-btn");
            var divAI = divRC.querySelector(".add-icon");
            var divSI = divRC.querySelector(".search-icon");
            var divSearch = divRC.querySelector(".search");
            var divNewIt = divRC.querySelector(".new-item");
            var divASB = divRC.querySelector(".ac-save-btn");
            var divVSRange = divRC.querySelector(".volume-slider-range");
            var divVSHandle = divRC.querySelector(".volume-slider-handle");
            var t = document.createElement("div");                                /**< <div class="background"></div>*/
            t.classList.add("background");
            t.addEventListener("click", deactivateNewIt);             
            divMC.appendChild(divRC);                                   // <div class="main-container"> <div class="radio-container"> ... </div> </div>
            document.body.appendChild(divMC);                       // <body> <div class="main-container"> ... </div> </body>
            document.body.appendChild(t);                       // <body> ... <div class="background"></div> </body> if not active - dont display
            divVSRange.style.width = divVSHandle.style.left = c.volume + "%";
            c.paused || (divAPB.classList.add("playing"), divRL.classList.add("playing"));
    
            divAPB.addEventListener("click", function() {
                chrome.storage.local.get("state", function(result){
                    c = result.state;
                    divAPB.classList.contains("playing") ? pauseAudio() : divRL.children.length && (switchStation(c.id), playAudio());
                });
            });

            divAI.addEventListener("click", displayAddNew);
            divASB.addEventListener("click", saveProperties);
            divSI.addEventListener("click", showSearch);
            divSearch.addEventListener("keyup", displaySearchResult);
            // not divMC := b
            var divInputs = divNewIt.querySelectorAll("input"); 
            divInputs[0].addEventListener("focus", deactiveErrMsg);
            divInputs[1].addEventListener("focus", deactiveErrMsg);
            var divACs = document.querySelectorAll(".ac-ctrl"); // << and >> btn 
            divACs[0].addEventListener("click", neighborStation); 
            divACs[1].addEventListener("click", neighborStation);

            // @see function H(div)
            H(divRC);

            // not divRC := d
            for (var idx = 0; idx < a.length; idx++) { 
                var nId = a[idx].id;
                var divPW = createElementDivPlayWrap(a[idx], nId, { 
                                                onClick: playStation,
                                                onEdit: editStation, 
                                                onRemove: removeStation
                                                   
                    });
                divRL.appendChild(divPW);
                if (nId == c.id) {
                    switchStation(c.id);
                    c.paused && divPW.classList.remove("current");
                }
            }
    
            resizePopup();
            localize();  
            initDragNDrop();
        }); // chrome.storage.local.get("state", ...)  END
    }); // chrome.storage.local.get("stations", ...)  END
}

function start() {
    i = chrome.extension.getBackgroundPage().radioController;
    if (i) {
        main();
    }
    else {
        setTimeout(function() {
            start();
        }, 100);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    start();
});