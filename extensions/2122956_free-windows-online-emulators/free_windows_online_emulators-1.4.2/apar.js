(function(){
  var apps_urls = {
    creapp: "https://www.onworks.net/runos/create-os.html?os=ReactOS-0.4.11&home=init",
    files: "https://www.onworks.net/myfiles.html",
    usersettings: "https://www.onworks.net/onworkschangeuser.html",
  };

  
  aaa = encodeURIComponent("https://www.onworks.net/myfiles.html");
  document.getElementById("usersettings").firstElementChild.href = "https://www.onworks.net/onworkschangeuser.html?ira=" + aaa;
  
  document.getElementById('situation').innerText = `Using Windows online emulators with the free hosting provider OnWorks`;
    
  
  document.querySelector(`#files .label`).innerText = "File Manager";
  document.querySelector(`#usersettings .label`).innerText = "Set userid";
  
})();
