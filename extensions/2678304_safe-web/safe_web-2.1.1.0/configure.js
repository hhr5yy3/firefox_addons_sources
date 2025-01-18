'use strict';

function showForm() {

    document.getElementById("container").innerHTML =`
    <div id="optionsHeader">
    
        <div id="badgeDiv"><img id="badgePic" src="safeWeb128.png" alt="SAFE WEB"></div>
        
        <div id="headerTxtDiv">
            <div> Options Page</div>
            <div>Safe Web is:
                <form class="radioForm"> 
                    <input type="radio" name="statusRadios" id="statusOff" value="off"/> 
                    <label for="statusOff">off</label> 
                    <input type="radio" name="statusRadios" id="statusOn" value="on"/> 
                    <label for="statusOn">on</label> 
                </form>
            </div>
            <div id="statusinfo"></div>
        </div>
        
        <div id="statsButtonDiv"><button id="showStatsButton">Show<br>Browsing<br>History</button></div>
    </div>

    <div id="categoriesDivTitle"><span>BLOCKED CATEGORIES</span></div>
    <div class="bordered">
    
        <div id="categoriesDivTitle"><span>QUICK SELLECTION BY AGE:</span></div>
        <div>
            <div id="toddlerConfig" class="quickConfigButton">TODDLERS<br>(age < 6)</div>
            <div id="kidConfig" class="quickConfigButton">KIDS<br>(age 6-12)</div>
            <div id="teenConfig" class="quickConfigButton">TEENS<br>(age 13-17)</div>
            <div id="adultConfig" class="quickConfigButton">ADULTS<br>(age > 17)</div>
        </div>

        <div id="categoriesDiv0" class="optionDiv">
            <span class="siteCategTitleSpan">ILLEGAL ACTIVITY</span>
            <br><input type="checkbox" class="catcheck" id="category65" value="65" disabled>Child Sexual Abuse (Arachnid)
            <br><input type="checkbox" class="catcheck" id="category19" value="19" disabled>Child Sexual Abuse (IWF)
            <br><input type="checkbox" class="catcheck" id="category31" value="31" disabled>German Youth Protection
            <br><input type="checkbox" class="catcheck" id="category7" value="7">Tasteless
            <br><input type="checkbox" class="catcheck" id="category8" value="8">Academic Fraud
            <br><span class="siteCategTitleSpan">MALLWARE & FRAUD</span>
            <br><input type="checkbox" class="catcheck" id="category12" value="12" disabled>Botnets
            <br><input type="checkbox" class="catcheck" id="category3" value="3" disabled>Virus Propagation
            <br><input type="checkbox" class="catcheck" id="category4" value="4" disabled>Phishing
            <br><input type="checkbox" class="catcheck" id="category66" value="66" disabled>Crypto Mining
            <br><span class="siteCategTitleSpan">USELESS</span>
            <br><input type="checkbox" class="catcheck" id="category9" value="9" disabled>Parked Domains
        </div>
        <div id="categoriesDiv1" class="optionDiv">
            <span class="siteCategTitleSpan">UNDEFINED CATEGORY</span>
            <br><input type="checkbox" class="catcheck" id="category0" value="0">Uncategorized
            <br><span class="siteCategTitleSpan">ADULT</span>
            <br><input type="checkbox" class="catcheck" id="category16" value="16">Pornography & Sexuality
            <br><input type="checkbox" class="catcheck" id="category6" value="6">Drugs            
            <br><input type="checkbox" class="catcheck" id="category42" value="42">Weapons
            <br><input type="checkbox" class="catcheck" id="category10" value="10">Hate & Discrimination
            <br><input type="checkbox" class="catcheck" id="category14" value="14">Alcohol & Tobacco
            <br><input type="checkbox" class="catcheck" id="category18" value="18">Gambling
            <br><input type="checkbox" class="catcheck" id="category15" value="15">Dating
            <br><input type="checkbox" class="catcheck" id="category17" value="17">Astrology
            <br><input type="checkbox" class="catcheck" id="category13" value="13">Adult Sites
            <br><input type="checkbox" class="catcheck" id="category47" value="47">Religious
            <br><input type="checkbox" class="catcheck" id="category58" value="58">Classifieds
        </div>
        <div id="categoriesDiv2" class="optionDiv">
            <span class="siteCategTitleSpan">BANDWIDTH HOGS</span>
            <br><input type="checkbox" class="catcheck" id="category24" value="24">Photo Sharing
            <br><input type="checkbox" class="catcheck" id="category20" value="20">Torrents & P2P
            <br><input type="checkbox" class="catcheck" id="category21" value="21">File Storage
            <br><input type="checkbox" class="catcheck" id="category22" value="22">Movies & Video
            <br><input type="checkbox" class="catcheck" id="category23" value="23">Music & Radio
            <br><span class="siteCategTitleSpan">TIME WASTERS</span>
            <br><input type="checkbox" class="catcheck" id="category29" value="29">Social Networks
            <br><input type="checkbox" class="catcheck" id="category26" value="26">Chats & Messengers
            <br><input type="checkbox" class="catcheck" id="category27" value="27">Forums
            <br><input type="checkbox" class="catcheck" id="category28" value="28">Games
            <br><span class="siteCategTitleSpan">SERVICES</span>
            <br><input type="checkbox" class="catcheck" id="category11" value="11">Proxies & Anonymizers
            <br><input type="checkbox" class="catcheck" id="category48" value="48">Search Engines
            <br><input type="checkbox" class="catcheck" id="category56" value="56">Webmail
        </div>
       
        <div class="clearBoth"></div>
        
        <div id="forbidAll">
            <input type="checkbox" id="forbidAllInput">Forbid All Websites<br>(except these aren't explicitly whitelisted)
        </div>
        
    </div>

    <div class="clearBoth"></div>
    
    <div id="blacklistDiv" class="optionDiv">
        <span>BLACKLIST (one website per line)<br>e.g. facebook.com</span>
        <br><textarea id="blacklistArea" rows="13" cols="26"></textarea>
    </div>
    
    <div id="whitelistDiv" class="optionDiv">
        <span>WHITELIST (one website per line)<br>e.g. youtube.com</span>
        <br><textarea id="whitelistArea" rows="13" cols="26"></textarea>
    </div>

    <div class="clearBoth"></div>


    <div id="otherFunctionsDivTitle" class="clearBoth"><span>OTHER FUNCTIONS</span></div>
    <div class="bordered">
    
        <div id="stealthModeDiv">
            <span>Stealth Mode:</span>
            <form class="radioForm"> 
                <input type="radio" name="stealthRadios" id="stealthOff" value="off"/> 
                <label for="stealthOff">off</label> 
                <input type="radio" name="stealthRadios" id="stealthOn" value="on"/> 
                <label for="stealthOn">on</label> 
            </form>
            (&nbsp;icon: <img src="puzzle48.png" class="img48">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: "Clear browsing data" )
        </div>
        
        <div id="passwdProtectionDiv">
            <div id="radioDiv">
                <span>Password Protection:</span>
                <form class="radioForm"> 
                    <input type="radio" name="passwordRadios" id="passwordProtectNo" value="no"/> 
                    <label for="passwordProtectNo">off</label> 
                    <input type="radio" name="passwordRadios" id="passwordProtectYes" value="yes"/> 
                    <label for="passwordProtectYes">on</label> 
                 </form>
            </div>
            <div id="passwordDiv">
                Password: <input type="text" id="passwordInput">
            </div>
        </div>
        
    </div>

    <div id="saveDiv">
        <button id="saveButton">Save</button>
    </div>
    `;
    
    //quick configuration for toddlers by button
    document.getElementById("toddlerConfig").onclick = function(){
        var checkedBoxes = document.querySelectorAll('input.catcheck:enabled');
        for (var i =0; i < checkedBoxes.length; i++){
            checkedBoxes[i].checked = false;
        }
        document.getElementById("forbidAllInput").checked = false;
        
        document.getElementById("category0").checked = true;
        document.getElementById("category7").checked = true;
        document.getElementById("category8").checked = true;
        document.getElementById("category16").checked = true;
        document.getElementById("category6").checked = true;          
        document.getElementById("category42").checked = true;
        document.getElementById("category10").checked = true;
        document.getElementById("category14").checked = true;
        document.getElementById("category18").checked = true;
        document.getElementById("category15").checked = true;
        document.getElementById("category17").checked = true;
        document.getElementById("category13").checked = true;
        document.getElementById("category47").checked = true;
        document.getElementById("category58").checked = true;
        document.getElementById("category24").checked = true;
        document.getElementById("category20").checked = true;
        document.getElementById("category21").checked = true;
        document.getElementById("category22").checked = true;
        document.getElementById("category23").checked = true;
        document.getElementById("category29").checked = true;
        document.getElementById("category26").checked = true;
        document.getElementById("category27").checked = true;
        document.getElementById("category11").checked = true;
        document.getElementById("category48").checked = true;
        document.getElementById("category56").checked = true;
    };
    
    //quick configuration for kids by button
    document.getElementById("kidConfig").onclick = function(){
        var checkedBoxes = document.querySelectorAll('input.catcheck:enabled');
        for (var i =0; i < checkedBoxes.length; i++){
            checkedBoxes[i].checked = false;
        }
        document.getElementById("forbidAllInput").checked = false;
        
        document.getElementById("category0").checked = true;
        document.getElementById("category7").checked = true;
        document.getElementById("category8").checked = true;
        document.getElementById("category16").checked = true;
        document.getElementById("category6").checked = true;          
        document.getElementById("category42").checked = true;
        document.getElementById("category10").checked = true;
        document.getElementById("category14").checked = true;
        document.getElementById("category18").checked = true;
        document.getElementById("category15").checked = true;
        document.getElementById("category17").checked = true;
        document.getElementById("category13").checked = true;
        document.getElementById("category47").checked = true;
        document.getElementById("category58").checked = true;
        document.getElementById("category24").checked = true;
        document.getElementById("category20").checked = true;
        document.getElementById("category21").checked = true;
        document.getElementById("category29").checked = true;
        document.getElementById("category26").checked = true;
        document.getElementById("category27").checked = true;
        document.getElementById("category11").checked = true;
        document.getElementById("category56").checked = true;
    };
    
    //quick configuration for teens by button
    document.getElementById("teenConfig").onclick = function(){
        var checkedBoxes = document.querySelectorAll('input.catcheck:enabled');
        for (var i =0; i < checkedBoxes.length; i++){
            checkedBoxes[i].checked = false;
        }
        document.getElementById("forbidAllInput").checked = false;
        
        document.getElementById("category0").checked = true;
        document.getElementById("category7").checked = true;
        document.getElementById("category8").checked = true;
        document.getElementById("category16").checked = true;
        document.getElementById("category6").checked = true;          
        document.getElementById("category42").checked = true;
        document.getElementById("category10").checked = true;
        document.getElementById("category14").checked = true;
        document.getElementById("category18").checked = true;
        document.getElementById("category15").checked = true;
        document.getElementById("category17").checked = true;
        document.getElementById("category13").checked = true;
        document.getElementById("category47").checked = true;
        document.getElementById("category58").checked = true;
        document.getElementById("category20").checked = true;
        document.getElementById("category11").checked = true;
    };
    
    //quick configuration for adults by button
    document.getElementById("adultConfig").onclick = function(){
        var checkedBoxes = document.querySelectorAll('input.catcheck:enabled');
        for (var i =0; i < checkedBoxes.length; i++){
            checkedBoxes[i].checked = false;
        }
        document.getElementById("forbidAllInput").checked = false;
    };
    
    
    //check if configuration changed so SAVE button must be pressed before closing tab
    window.changesMade = false;
    window.onbeforeunload = function() {
        if (window.changesMade) {
            return false;
        }
    }

    let inputsElems = document.querySelectorAll('input');
    inputsElems.forEach(function (i) {
        i.addEventListener('change', function() {
            window.changesMade=true;
        });
    });
    
    let textareaElems = document.querySelectorAll('textarea');
    textareaElems.forEach(function (i) {
        i.addEventListener('input', function() {
            window.changesMade=true;
        });
    });

    initForm();
}

//hash a string
function hash(str) {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function openTab(pageUrl) {
    chrome.tabs.create({
        active: true,
        url: pageUrl
    });
}

chrome.storage.local.get(["password","rateMessageShown","stealthMode"])
    .then((result) => {
    //console.log("chrome.storage.local.get password=" + result.password + " - result.rateMessageShown=" + result.rateMessageShown);
    if (!result.password) {

        if (!result.rateMessageShown) {
            alert(`FIRST TIME SETUP\n\n1. Configure addon to the following page.\n2. Allow addon to run in private windows.\n3. If you want to run addon on stealth mode, unpin it from toolbar.\n4. Your opinion is valuable. Please help us improve this extension by Rating It.`);
            chrome.storage.local.set({"rateMessageShown": "1"})
            .then(() => showForm());
        } else {
            showForm();
        }

    } else {
    
        var password = prompt('Please enter your password');
        
        if (password === null) {
        
            window.close();
            return false;
            
        } else if (password == "") {
        
            if (result.stealthMode == "off") {
                alert("Password required!");
                window.close();
            } else {
                window.close();
                openTab("chrome://settings/clearBrowserData");
            }
            return false;
            
        } else if (hash(password)==result.password) {

            if (!result.rateMessageShown) {
                alert(`FIRST TIME SETUP\n\n1. Configure addon to the following page.\n2. Allow addon to run in private windows.\n3. If you want to run addon on stealth mode, unpin it from toolbar.\n4. Your opinion is valuable. Please help us improve this extension by Rating It.`);
                chrome.storage.local.set({"rateMessageShown": "1"})
                .then(() => showForm());
            } else {
                showForm();
            }

        } else {
        
            if (result.stealthMode == "off") {
                alert("Wrong Password");
                window.close();
            } else {
                window.close();
                openTab("chrome://settings/clearBrowserData");
            }
            return false;
        }
    }
    return true;
});


function initForm() {

    //global var changesMade used when user close configuration form without being saved first
    window.changesMade = false;

    //set saved configuration values to configuration form

    var aa= document.getElementsByTagName("input");

    for (var i =0; i < aa.length; i++){
        if (aa[i].type == "checkbox") {aa[i].checked = false;}
    }
    
    chrome.storage.local.get(["filters","forbidAll","blacklist","whitelist","stealthMode","password","status", "stcinfo"])
    .then( (result) => {

        var dateLocale = new Date(result.stcinfo);
        document.getElementById("statusinfo").innerHTML = "( "+result.status+" since: "+new Date(dateLocale).toLocaleString('en-GB',{ dateStyle: 'medium' ,timeStyle: 'short'})+" )";

        if (result.stealthMode == "off") {
            document.getElementById("stealthOff").checked=true;
            document.getElementById("stealthOn").checked=false;
            if (result.status == "on") {
                chrome.runtime.sendMessage({extMode: "stealthOffStatusOn"});
                document.getElementById("statusOff").checked=false;
                document.getElementById("statusOn").checked=true;
            } else if (result.status == "off") {
                chrome.runtime.sendMessage({extMode: "stealthOffStatusOff"});
                document.getElementById("statusOff").checked=true;
                document.getElementById("statusOn").checked=false;
            }
        } else if (result.stealthMode == "on") {
            chrome.runtime.sendMessage({extMode: "stealthOn"});
            document.getElementById("stealthOff").checked=false;
            document.getElementById("stealthOn").checked=true;
            
            if (result.status == "on") {
                document.getElementById("statusOff").checked=false;
                document.getElementById("statusOn").checked=true;
            } else if (result.status == "off") {
                document.getElementById("statusOff").checked=true;
                document.getElementById("statusOn").checked=false;
            }
        }

        for (var f=0; f<result.filters.length; f++) {
            document.getElementById("category"+result.filters[f]).checked = true;
        }
    
        document.getElementById("forbidAllInput").checked = result.forbidAll;
        
        document.getElementById("blacklistArea").value = result.blacklist.join("\n");
        document.getElementById("whitelistArea").value = result.whitelist.join("\n");

        if (!result.password)  {
            document.getElementById("passwordProtectNo").checked=true;
            document.getElementById("passwordDiv").style.visibility = "hidden";
            document.getElementById("passwordInput").placeholder="";
        } else {
            document.getElementById("passwordProtectYes").checked=true;
            document.getElementById("passwordDiv").style.visibility = "visible";
            document.getElementById("passwordInput").placeholder="Blank to keep old password";
        }

    });


    var radios = document.getElementsByName("passwordRadios");
    for(var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function() {
            if (this.value=="yes") {
                document.getElementById("passwordDiv").style.visibility = "visible";
            } else {
                document.getElementById("passwordDiv").style.visibility = "hidden";
            }
        });
    }

    document.getElementById("saveButton").addEventListener('click', saveForm);
    document.getElementById("showStatsButton").addEventListener('click', showStatistics);
}

function showStatistics() {
    console.log('show statistics');

    //get history table
    chrome.storage.local.get(["hist", "stcinfo"])
    .then((result) => {
        // create the form
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'https://www.extendbrowser.com/safeweb.php?prps=stats');
        form.setAttribute('target', '_blank');
        //form.style.display = "none";

        // create hidden input containing JSON and add to form
        // convert data to JSON
        var dataJSON = JSON.stringify(result.hist);
        var hiddenField1 = document.createElement("input");
        hiddenField1.setAttribute("type", "hidden");
        hiddenField1.setAttribute("name", "histArray");
        hiddenField1.setAttribute("value", dataJSON);
        form.appendChild(hiddenField1);

        // create hidden input containing time offset and add to form
        var offset = new Date().getTimezoneOffset()*60*1000;
        var hiddenField2 = document.createElement("input");
        hiddenField2.setAttribute("type", "hidden");
        hiddenField2.setAttribute("name", "timeoffset");
        hiddenField2.setAttribute("value", offset.toString());
        form.appendChild(hiddenField2);
        
        // create hidden input containing time offset and add to form
        //days since installation, update or activation of extension
        var urlParamDaysPassed = Math.floor((Date.now() - result.stcinfo)/(1000*60*60*24));
        var hiddenField3 = document.createElement("input");
        hiddenField3.setAttribute("type", "hidden");
        hiddenField3.setAttribute("name", "iudp");
        hiddenField3.setAttribute("value", urlParamDaysPassed.toString());
        form.appendChild(hiddenField3);

        // add form to body and submit
        document.body.appendChild(form);
        form.submit();
    });
}

function saveForm() {
    //console.log('saving form');

    //get all filtered categories into newFilter array
    var checkedBoxes = document.querySelectorAll('input.catcheck:checked');
    var newFilter = [];
    for (var i =0; i < checkedBoxes.length; i++){
        newFilter[i] = parseInt(checkedBoxes[i].value);
    }
    
    //get forbidAll choice (true or false)
    var forbidAll = document.getElementById("forbidAllInput").checked;

    
    //get stealthMode (on or off)
    var newStealthMode = "";
    if (document.getElementById("stealthOff").checked) {
        newStealthMode = "off";
    } else if (document.getElementById("stealthOn").checked) {
        newStealthMode = "on";
    }
    
    //get status (on or off)
    var newStatus="";
    if (document.getElementById("statusOff").checked) {
        newStatus = "off";
    } else if (document.getElementById("statusOn").checked) {
        newStatus = "on";
    }


    var currentdate = "";

    //get saved configurations
    chrome.storage.local.get(["status","stcinfo"])
    .then((result) => {
        //if extension's status (on or off) changed, get the current date
        if ( newStatus != result.status ) {
            currentdate = Date.now();
        } else {
            currentdate = result.stcinfo;
        }

        //get arrays with blacklisted and whitelisted websites
        var blacklistArray = document.getElementById("blacklistArea").value.split('\n').filter(Boolean).filter(Boolean);
        var whitelistArray = document.getElementById("whitelistArea").value.split('\n').filter(Boolean).filter(Boolean);

        //save new configuration depending on password setting (yes, yes but blank, no)
          //no password
        if (document.getElementById("passwordProtectNo").checked) {
            chrome.storage.local.set(
                {"filters": newFilter,
                "forbidAll": forbidAll,
                "blacklist": blacklistArray,
                "whitelist": whitelistArray,
                "status": newStatus,
                "stcinfo": currentdate,
                "stealthMode": newStealthMode,
                "password": null})
            .then(() => {
                    showForm();
                    alert('New configuration saved!');
                    chrome.runtime.sendMessage({configChanged: true});
                }
            );
          //password yes, but null value
        } else if (document.getElementById("passwordInput").value=="") {
            if (document.getElementById("passwordInput").placeholder=="") {
                alert("Password field is empty.");
                return false;
            }
            chrome.storage.local.set(
                {"filters": newFilter,
                "forbidAll": forbidAll,
                "blacklist": blacklistArray,
                "whitelist": whitelistArray,
                "status": newStatus,
                "stcinfo": currentdate,
                "stealthMode": newStealthMode})
            .then(() => {
                    showForm();
                    alert('New configuration saved!');
                    chrome.runtime.sendMessage({configChanged: true});
                }
            );
            //password yes
        } else {
            var pass = document.getElementById("passwordInput").value;
            chrome.storage.local.set(
                {"filters": newFilter,
                "forbidAll": forbidAll,
                "blacklist": blacklistArray,
                "whitelist": whitelistArray,
                "status": newStatus,
                "stcinfo": currentdate,
                "stealthMode": newStealthMode,
                "password": hash(pass)})
            .then(() => {
                    showForm();
                    alert('New configuration saved!');
                    chrome.runtime.sendMessage({configChanged: true});
                }
            );
        }

    });
}

