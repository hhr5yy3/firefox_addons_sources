const brandAppName = 'Communicator';
const applicationName = (typeof brandAppName !== 'undefined') ? brandAppName : "Application";

function removeSome(nodes) {
    for(var i=0;i<nodes.length;) {
        nodeVal = nodes[i].nodeValue;
        var isNotNumber = /\d/.test(nodeVal) == false;
        if(isNotNumber) {
            nodes.splice(i,1);
            continue;
        }
        i++;
    }
}


function getAllTextNodes() {
    var resultArray = [];

    function isSeekingNode(el) {
        return el.nodeType === 3 //text node
            && /\S/.test(el.nodeValue)
            && el.parentNode.nodeName !== 'SCRIPT'
            && el.parentNode.nodeName !== 'NOSCRIPT'
            && el.parentNode.nodeName !== 'BUTTON'
            && el.parentNode.nodeName !== 'TEXTAREA'
            && el.parentNode.nodeName !== 'STYLE'
            && el.parentNode.nodeName !== 'INPUT'
            && el.parentNode.nodeName !== 'TITLE';
    }

    function isBannedContainer(item) {
        if(item.classList && item.classList.contains("CodeMirror")) {
            return true;
        }

        if(item.isContentEditable) {
            return true;
        }

        return item.id=='click_to_dial_wrapper';
    }

    function recurse(element){
        if (!isBannedContainer(element))
        {
            if (element.childNodes.length > 0) {
                for(var i = 0; i < element.childNodes.length; i++) {
                    recurse(element.childNodes[i]);
                }
            } else if(element.contentDocument && element.contentDocument.childNodes.length > 0) {
                for(var i = 0; i < element.contentDocument.childNodes.length; i++) {
                    recurse(element.contentDocument.childNodes[i]);
                }
            }
            if(isSeekingNode(element)) {
                resultArray.push(element);
            }
        }

    }

    recurse(document.body);
    return resultArray;
};

function logArray(array) {
    for(var i=0; i<array.length;i++)
        console.log(array[i].nodeValue);
}

async function addHrefToArray(array) {
    for(var i=0; i< array.length; i++) {
        var shouldReplace = false;
        var nodeVal = array[i].nodeValue;
        if(nodeVal.includes("http"))
            continue;

        var numbers = nodeVal.match(/\+?(([\d\s]*[(][\d\s]+[)][\d\s-\/.‑–]+)|([\d\s-\/.‑–]{6,}))/g);
        if(numbers === null)
            continue;

        var isCommitHash = /[a-z0-9]{40}/.test(nodeVal);
        if(isCommitHash)
            continue;

        var div = document.createElement('div');
        div.style.display = "inline-block";
        div.id = "click_to_dial_wrapper";
        var endedAt = 0;

        for(var j=0; j<numbers.length; j++) {
            var num = numbers[j];
            num = num.trim();

            if(isNaN(num[num.length-1]) && num[num.length-1] !== ')') {
                num = num.slice(0,-1);
                num = num.trim();
            }

            var isValid = true;
            
            if(num.length < 6) 
                isValid = false;

            var isIpAdress = (num.split(".").length - 1) >= 3;
            if(isIpAdress)
                isValid = false;

            var isDateYYYYMMDD = /([12]\d{3}[-|/|.](0?[1-9]|1[0-2])[-|/|.](0?[1-9]|[12]\d|3[01]))/.test(num)
            if(isDateYYYYMMDD)
                isValid = false;

            var isDateDDMMYYYY = /((0?[1-9]|[12]\d|3[01])[-|/|.](0?[1-9]|1[0-2])[-|/|.][12]\d{3})/.test(num)
            if(isDateDDMMYYYY)
                isValid = false;

            var isDateMMDDYYYY = /((0?[1-9]|1[0-2])[-|/|.](0?[1-9]|[12]\d|3[01])[-|/|.][12]\d{3})/.test(num)
            if(isDateMMDDYYYY)
                isValid = false;

            var isRealNumber = /[+]?[(][0-9]{3}[)][\s]*[\/]?[\s]*[0-9]{3}[-]?[0-9]{4}/.test(num);

            if(isValid && (isRealNumber || isValidNumber(num, 'US') || isValidNumber(num, 'GB') || isValidNumber(num, 'CA'))){
                var index = nodeVal.indexOf(num);
                var beginString = '';
                var endString = '';
                beginString = nodeVal.slice(endedAt,index);
                if((j+1)<numbers.length) {
                    var nextNumberIndex = nodeVal.indexOf(numbers[j+1]);

                    while(index < endedAt) {
                        index = index + num.length + nodeVal.slice(index+num.length, nodeVal.length).indexOf(num);
                    }

                    if(index >= nodeVal.indexOf(numbers[j+1])) {
                        nextNumberIndex = index + num.length + nodeVal.slice(index+num.length, nodeVal.length).indexOf(numbers[j+1]);
                    }

                    endString = nodeVal.slice(index + num.length, nextNumberIndex);
                    endedAt = nextNumberIndex;

                }
                else {
                    var beginSliceIndex = index+num.length;
                    if(index < endedAt)
                        beginSliceIndex = endedAt+num.length;

                    endString = nodeVal.slice(beginSliceIndex, nodeVal.length);
                }

                var textBefore = document.createTextNode(beginString);
                var textAfter = document.createTextNode(endString);
                var a = document.createElement('a');

                var hrefNum = num.replace(/[^0-9+]/g, '');

                let storedOptionApp = await getFromStorage("app");
                if (!storedOptionApp || storedOptionApp === 'desktop') {
                    a.href = 'glocom://' + hrefNum;
                }
                else {
                    a.href = 'web+glocom://' + hrefNum;
                    if (navigator.userAgent.indexOf("Firefox") !== -1) {
                        a.setAttribute('target', '_blank');
                    }
                    else {
                        a.setAttribute('target', 'webapp');
                    }
                }
                
                a.title = "Click to dial with " + applicationName;
                var imgUrl = '';
                if(typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined' && typeof chrome.runtime.getURL !== 'undefined') {
                    imgUrl = chrome.runtime.getURL('glocom_icon.jpg');
                }
                else if(typeof browser !== 'undefined' && typeof browser.extension !== 'undefined' && typeof browser.extension.getURL !== 'undefined') {
                    imgUrl = browser.extension.getURL('glocom_icon.jpg');
                }
                else if(typeof safari !== 'undefined' && safari.extension !== 'undefined' && safari.extension.baseURI !== 'undefined') {
                    imgUrl = safari.extension.baseURI + 'glocom_icon.jpg';
                }
                if(imgUrl.length != 0) {
                    a.appendChild(document.createTextNode(num));
                    var imageDiv = document.createElement('div');
                    imageDiv.style.backgroundImage = "url('" + imgUrl + "')";
                    imageDiv.style.backgroundSize = "100%";
                    imageDiv.style.backgroundRepeat = "no-repeat";
                    imageDiv.style.width = "12px";
                    imageDiv.style.height = "12px";
                    imageDiv.style.marginLeft = "5px";
                    imageDiv.style.display = "inline-block";
                    a.appendChild(imageDiv);
                }
                else
                    a.appendChild(document.createTextNode(num));

                a.style.color = "inherit";
                a.style.textDecoration = "underline";
                a.style.pointerEvents = "auto";
                
                div.appendChild(textBefore);
                div.appendChild(a);
                div.appendChild(textAfter);
                shouldReplace = true;

            } else {
                var index = endedAt;

                if((j+1)<numbers.length) {

                    var nextNumberIndex = nodeVal.indexOf(numbers[j+1]);

                    if(index >= nodeVal.indexOf(numbers[j+1])) {
                        nextNumberIndex = index + numbers[j].length + nodeVal.slice(index+numbers[j].length, nodeVal.length).indexOf(numbers[j+1]);
                    }

                    endString = nodeVal.slice(index, nextNumberIndex);
                    endedAt = nextNumberIndex;

                }
                else {
                    var beginSliceIndex = index;
                    if(index < endedAt)
                        beginSliceIndex = endedAt;

                    endString = nodeVal.slice(beginSliceIndex, nodeVal.length);
                }


                var textAfter = document.createTextNode(endString);
                div.appendChild(textAfter);

            }
        }
        if(shouldReplace && array[i].parentNode != undefined && array[i].parentNode != null) { 

            if(!(div.innerText.trim() == array[i].nodeValue.trim())) {
                console.log("COPY THIS TO YOUR SUPPORT TICKET. EXTENSION: \"" + div.innerText + "\". ORIGINAL: \"" + array[i].nodeValue + "\"");
            }

            array[i].parentNode.replaceChild(div, array[i]);

            div.onclick = function() {
                if (typeof this.closest === 'function') {
                    var closestLink = this.closest("a");
                    if (closestLink && closestLink.nodeName === "A") {
                        setTimeout(function(){closestLink.click();}, 100);
                    }
                }
            }
            
        }
    }
}

async function getFromStorage(key) {
    return new Promise((resolve) => {
        if (navigator.userAgent.indexOf("Chrome") != -1) {
            chrome.storage.sync.get(key, resolve);
        }
        else if (navigator.userAgent.indexOf("Firefox") != -1) {
            browser.storage.sync.get(key, resolve);
        }

    })
    .then(result => { return result[key]; });
}

var clicktodialObj = {
    refreshedAt: 0,
    executionTook: 0,
    docBody: document.getElementsByTagName("BODY")[0]
}

var clickToDial = function () {
    t1 = performance.now();
    var nodes = [];
    nodes = getAllTextNodes();
    removeSome(nodes);
    addHrefToArray(nodes);
    t2 = performance.now();
    clicktodialObj.executionTook = t2-t1;
}

if (clicktodialObj.docBody && clicktodialObj.docBody.readyState == "loaded") {
    clickToDial();
} else {
    if (window.addEventListener) {
        window.addEventListener("load", clickToDial, false);
    } else {
        window.attachEvent("onload", clickToDial);
    }
}

window.addEventListener("refreshClickToDial", function(data) {
    var minimumTime = (3*clicktodialObj.executionTook);
    if(minimumTime < 200)
        minimumTime = 200;

    var date = new Date();
    if(date.getTime() - clicktodialObj.refreshedAt >= minimumTime) {
        clicktodialObj.refreshedAt = date.getTime();
        clickToDial();
        
    }
}, false);

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var minimumTime = (3*clicktodialObj.executionTook);
        if(minimumTime < 200)
            minimumTime = 200;

        var date = new Date();
        if(mutation.addedNodes.length > 0 && date.getTime() - clicktodialObj.refreshedAt >= minimumTime) {
            clicktodialObj.refreshedAt = date.getTime();
            clickToDial();
        }
         
    });    
});
 
var observerConfig = {
    attributes: false, 
    childList: true, 
    characterData: true,
    subtree: true
};

var targetNode = document.body;
observer.observe(targetNode, observerConfig);


var s = document.createElement('script');
if(typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined' && typeof chrome.runtime.getURL !== 'undefined') {
    s.src = chrome.runtime.getURL('detectAjax.js');
}
else if(typeof browser !== 'undefined' && typeof browser.extension !== 'undefined' && typeof browser.extension.getURL !== 'undefined') {
    s.src = browser.extension.getURL('detectAjax.js');
}
else if(typeof safari !== 'undefined' && safari.extension !== 'undefined' && safari.extension.baseURI !== 'undefined') {
    s.src = safari.extension.baseURI + 'detectAjax.js';
}
s.onload = function() {
    this.remove();
};

(document.head || document.documentElement).appendChild(s);
