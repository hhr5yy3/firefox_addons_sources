function saveOptions(e) {
    document.querySelector("#warning").style.display="none";
  var rotationBehavior = "fixed";
  if(document.querySelector("#rotationBehaviorCurrent").checked){
    rotationBehavior = "current";
  }else if(document.querySelector("#rotationBehaviorAll").checked){
    rotationBehavior = "all";
  }
  var regex = new RegExp("^([1-9]\\d*)(;[1-9]\\d*)*$");
  if (regex.test(document.querySelector("#delay").value)){  
    browser.storage.sync.set({
      delay: document.querySelector("#delay").value,
      reloadTabs: document.querySelector("#reloadTabs").checked,
      startAutomatically: document.querySelector("#startAutomatically").checked,
      rotationBehavior:rotationBehavior
    });
  }else{
    document.querySelector("#warning").style.display="inline";
  }
  e.preventDefault();
}

function restoreOptions() {
  var gettingItem = browser.storage.sync.get('delay');
  gettingItem.then((res) => {
    document.querySelector("#delay").value = res.delay || '5';
  });
  
  gettingItem = browser.storage.sync.get('reloadTabs');
  gettingItem.then((res) => {
    document.querySelector("#reloadTabs").checked = res.reloadTabs || false;
  });
  
  gettingItem = browser.storage.sync.get('startAutomatically');
  gettingItem.then((res) => {
    document.querySelector("#startAutomatically").checked = res.startAutomatically || false;
  });
  
  gettingItem = browser.storage.sync.get('rotationBehavior');
  gettingItem.then((res) => {
    if(res.rotationBehavior=="current"){
	    document.querySelector("#rotationBehaviorCurrent").checked = true;
    }else if(res.rotationBehavior=="all"){
	    document.querySelector("#rotationBehaviorAll").checked = true;
    }else{
	    document.querySelector("#rotationBehaviorFixed").checked = true;
    };
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

document.querySelector("#settings").innerHTML = browser.i18n.getMessage("settings");
document.querySelector("#delay_label").innerHTML = browser.i18n.getMessage("settingsRotationTime");
document.querySelector("#delay_desc").innerHTML = browser.i18n.getMessage("settingsRotationTimeDescription");
document.querySelector("#warning").innerHTML = browser.i18n.getMessage("settingsRotationTimeWarning");
document.querySelector("#reloadTabs_label").innerHTML = browser.i18n.getMessage("settingsReloadTab");
document.querySelector("#reloadTabs_desc").innerHTML = browser.i18n.getMessage("settingsReloadTabDescription");
document.querySelector("#startAutomatically_label").innerHTML = browser.i18n.getMessage("settingsStartRunning");
document.querySelector("#startAutomatically_desc").innerHTML = browser.i18n.getMessage("settingsStartRunningDescription");
document.querySelector("#rotationBehavior_label").innerHTML = browser.i18n.getMessage("rotationBehavior");
document.querySelector("#rotationBehaviorFixed_desc").innerHTML = browser.i18n.getMessage("rotationBehaviorFixed");
document.querySelector("#rotationBehaviorCurrent_desc").innerHTML = browser.i18n.getMessage("rotationBehaviorCurrent");
document.querySelector("#rotationBehaviorAll_desc").innerHTML = browser.i18n.getMessage("rotationBehaviorAll");
document.querySelector("#save").innerHTML = browser.i18n.getMessage("settingsSave");