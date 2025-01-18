function encode(string) {
    var result = "";

    var s = string.replace(/\r\n/g, "\n");

    for(var index = 0; index < s.length; index++) {
        var c = s.charCodeAt(index);

        if(c < 128) {
            result += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            result += String.fromCharCode((c >> 6) | 192);
            result += String.fromCharCode((c & 63) | 128);
        }
        else {
            result += String.fromCharCode((c >> 12) | 224);
            result += String.fromCharCode(((c >> 6) & 63) | 128);
            result += String.fromCharCode((c & 63) | 128);
        }
    }

    return result;
};


function decode(string) {
    var result = "";

    var index = 0;
    var c = c1 = c2 = 0;

    while(index < string.length) {
        c = string.charCodeAt(index);

        if(c < 128) {
            result += String.fromCharCode(c);
            index++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = string.charCodeAt(index + 1);
            result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            index += 2;
        }
        else {
            c2 = string.charCodeAt(index + 1);
            c3 = string.charCodeAt(index + 2);
            result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            index += 3;
        }
    }

    return result;
};

var passwordEncrypt=function(string) {
    result=btoa(encode(string));
    //console.log("passwordEncrypt=["+result+"]");
    return result;
}; //btoa;
var passwordDecrypt=function(string){
    result=decode(atob(string));
    //console.log("passwordDecrypt=["+result+"]");
    return result;
};//atob;
var valueBeforeSave;
var PARAM;



function toBackground(message, optionObject)
{
  if (chrome)
  {
    var request=message;
    if (optionObject && optionObject.channel)
      request['channel']=""+optionObject.channel;
    chrome.runtime.sendMessage(request);
  }
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function statusError(message)
{
  var status = document.getElementById('statusBox');
  status.className="alert visible error";
  status.opacity="0";
  status = document.getElementById('statusMessage');
  status.textContent = message;
}

function statusOK(message)
{
  var status = document.getElementById('statusBox');
  status.className="alert visible success";
  status.opacity="1";
  status = document.getElementById('statusMessage');
  status.textContent = message;
}

function checkAndSave(username, password, cgu, oneClickOption, REMINDER, REMINDER_FREQUENCY, URLDETECT)
{
var options= {
  "email": username,
  "password": passwordEncrypt(password),
  "userAuthentified": false,
  "cgu": cgu,
  "oneClickOption": oneClickOption,
  "NOURLDETECT":!URLDETECT,
  "URLDETECT":URLDETECT,
  "REMINDER":REMINDER,
  "REMINDER_FREQUENCY":parseInt(REMINDER_FREQUENCY)
};  

  try {
    var xmlhttp=new XMLHttpRequest;
    //unescape(encodeURIComponent(options.email+':'+atob(options.password)))
    //xmlhttp.open("POST",PARAM.REPORT_API.SCHEME+encodeURIComponent(username)+":"+encodeURIComponent(password)+"@"+PARAM.REPORT_API.HOSTNAME+PARAM.REPORT_API.PATHNAME,true);
    //console.log('Check credentials with '+PARAM.REPORT_API.SCHEME+PARAM.REPORT_API.HOSTNAME+PARAM.REPORT_API.PATHNAME);
    xmlhttp.withCredentials=true;

    xmlhttp.open("OPTIONS",PARAM.REPORT_API.SCHEME+PARAM.REPORT_API.HOSTNAME+PARAM.REPORT_API.PATHNAME,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Authorization","Basic "+passwordEncrypt(username+':'+password));
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.setRequestHeader('X-User-Agent','Plugin Navigateur - Version '+chrome.runtime.getManifest().name+' '+chrome.runtime.getManifest().version+' - '+window.navigator.userAgent+' - User Setup');
    xmlhttp.timeout=8000;

    xmlhttp.onreadystatechange=function()
    {
      if (xmlhttp.readyState==4)
      {
        //clearTimeout(xmlHttpTimeout);
        if (xmlhttp.status>=200 && xmlhttp.status<300) 
        {
          options.userAuthentified=true;
          saveOptions(options);
        }
        else
        {
          options.userAuthentified=false;
          statusError(verifrom.locales.getMessage("options_invalidCredentials"));
        }
      }
    }
  } catch (err)
  {
      console.log('Exception while checking credentials',err);
      statusError(verifrom.locales.getMessage("options_errorVerifyingCredentials"));
        //"Erreur - impossible de vérifier le nom d'utilisateur et le mot de passe.");
      //verifrom.message.toAllTabs({response:'&nbsp;ECHEC&nbsp;'}, {channel: "PayloadPosted"});     
  }
  xmlhttp.send("");
}

function enableSave() {
  document.getElementById('save').setAttribute('style','opacity:1.0; cursor:pointer;');
  document.getElementById('save').addEventListener('click',validateAndSave);
}

function disableSave() {
    document.getElementById('save').setAttribute('style','opacity:0.2; cursor:not-allowed;');
    document.getElementById('save').removeEventListener('click',validateAndSave);
}

function checkOptionChange() {
  var changed;
    changed=false;
    if (document.getElementById('email').value!==valueBeforeSave.email)
        changed=true;
    if (document.getElementById('password').value!==passwordDecrypt(valueBeforeSave.password))
        changed=true;
    if (document.getElementById('oneClickOption').checked!==valueBeforeSave.oneClickOption)
        changed=true;
    if (document.getElementById('URLDETECT').checked!==valueBeforeSave.URLDETECT)
        changed=true;
    if (parseInt(document.getElementById('frequencyRange').value)!==valueBeforeSave.REMINDER_FREQUENCY)
        changed=true;
    if (document.getElementById('myonoffswitch').checked!==valueBeforeSave.REMINDER)
        changed=true;
    if (changed)
      enableSave();
    else disableSave();
}

// Saves options to chrome.storage
function saveOptions(options) {

  chrome.storage.sync.get(PARAM.USER_SETTINGS.DEFAULT, 
    function(items) {
      options.REMINDER_LASTDISPLAYED=items.REMINDER_LASTDISPLAYED;
      chrome.storage.sync.set(options, function() {
        // Update status to let user know options were saved.
          valueBeforeSave=options;
          disableSave();
          statusOK(verifrom.locales.getMessage("options_saved"));
          setTimeout(function() {
              this.close();
            }, 1200);
      });
    }
  );
}

function restore_options() {
    verifrom.dbStorage.init().then(()=>{
        PARAM = verifrom.dbStorage.get(extensionConfig.appInfo.extensionName+'PARAMS');
        chrome.storage.sync.get(PARAM.USER_SETTINGS.DEFAULT, function(items) {
            document.getElementById('email').value = items.email;
            document.getElementById('password').value = passwordDecrypt(items.password);
            document.getElementById('validCGU').checked = items.cgu;
            document.getElementById('oneClickOption').checked = items.oneClickOption;
            document.getElementById('URLDETECT').checked = items.URLDETECT;
            document.getElementById('myonoffswitch').checked = items.REMINDER;
            document.getElementById('frequencyRange').value = items.REMINDER_FREQUENCY;
            document.getElementById('frequency').innerText= items.REMINDER_FREQUENCY;
            valueBeforeSave=items;
        });
        disableSave();
    }).catch(reason=>{
        console.error("Could not load params");
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('email').onchange=checkOptionChange;
document.getElementById('email').onkeyup=checkOptionChange;
document.getElementById('email').onkeyup=checkOptionChange;
document.getElementById('email').onmouseout=checkOptionChange;
document.getElementById('password').onchange=checkOptionChange;
document.getElementById('password').onkeyup=checkOptionChange;
document.getElementById('password').onblur=checkOptionChange;
document.getElementById('password').onmouseout=checkOptionChange;
document.getElementById('oneClickOption').onchange=checkOptionChange;
document.getElementById('URLDETECT').onchange=checkOptionChange;
document.getElementById('myonoffswitch').onchange=checkOptionChange;

document.getElementById('frequencyRange').addEventListener('change', function(e) {
    document.getElementById('frequency').innerText= document.getElementById('frequencyRange').value;
    checkOptionChange(e);
});

document.getElementById('CGU').addEventListener('click', function(e) {
  var cgu = document.getElementById('validCGU').checked;
    if (cgu) {
      var status = document.getElementById('status');
      document.getElementById('CGU').setAttribute('style','color:black;');
      enableSave();
    }
    else {
      var status = document.getElementById('status');
      statusError(verifrom.locales.getMessage("options_validateAgreement"));// "Vous devez accepter les conditions générales d'utilisation";
      document.getElementById('CGU').setAttribute('style','color:red;');
      disableSave();
    }
});

function validateAndSave(e) {
  var cgu = document.getElementById('validCGU').checked;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var status = document.getElementById('status');
  var oneClickOption = document.getElementById('oneClickOption').checked;
  var REMINDER = document.getElementById('myonoffswitch').checked;
  var REMINDER_FREQUENCY = document.getElementById('frequencyRange').value;
  var URLDETECT = document.getElementById('URLDETECT').checked;

    if (email.length===0)
    {
      statusError(verifrom.locales.getMessage("options_invalidUserId"));
      document.getElementById('email').setAttribute('style','border-color:red;');
      document.getElementById('email').focus();
      return;
    }
    if (password.length===0)
    {
      statusError(verifrom.locales.getMessage("options_missingPassword"));
      document.getElementById('password').setAttribute('style','border-color:red;');
      document.getElementById('password').focus();
      return;
    }
    if (cgu)    
      checkAndSave(email, password, cgu, oneClickOption, REMINDER, REMINDER_FREQUENCY, URLDETECT);
    else {
      statusError(verifrom.locales.getMessage("options_validateAgreement"));
      //"Vous devez accepter les conditions générales d'utilisation";
      document.getElementById('CGU').setAttribute('style','color:red;');
    }
}

window.addEventListener('load', function() {
  var query=location.search.split(/[\?\&]/);
  if (query.indexOf('invalidpassword=true')>=0)
  {  
    statusError(verifrom.locales.getMessage("options_invalidCredentials")); // "Le nom d'utilisateur Signal Spam et/ou le mot de passe correspondant ne sont pas valides. Ces informations doivent &ecirc;tre valides pour proc&eacute;der &agrave; un signalement. Merci de bien vouloir mettre &agrave; jour les informations ci-dessous.";
  }
}, true);

var closeBtns = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < closeBtns.length; i++) {
    closeBtns[i].onclick = function(){
        var div = this.parentElement;
        setTimeout(function(){ div.className="alert notvisible" }, 200);
    }
}