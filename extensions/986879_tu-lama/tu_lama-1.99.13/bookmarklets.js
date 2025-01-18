/* 
  TU lAma - let Alma be more adroit

  popup menu
 
  Copyright (C) 2019 Leo Zachl, Technische Universität Wien, Bibliothek

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

function listenForClicks() {
  document.addEventListener("click", (e) => {
    var id = e.target.id;
    var target;
    if (e.target.nodeName == 'SPAN'){
      target = $(e.target).parent();
    } else {
      target = $(e.target);
    }
    let puc = $('#popup-content');
    console.log(target);
    console.log(puc);
    let enabled = !puc.hasClass('not_alma') && 
                ( !target.hasClass('mde') && !target.hasClass('nmde') 
                || target.hasClass('mde') && puc.hasClass('mde')
                || target.hasClass('nmde') && puc.hasClass('nmde'));
    if (enabled && id != '' && id != 'version'){
      var xhr = new XMLHttpRequest();
      console.log('clicked ' + id);
      xhr.open("GET", config.bmsUrl + id + ".js?nocache_" + (new Date()).getTime());
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var scriptToExecute = '(function(){' + xhr.responseText + '})();';
          // console.log('script: ' + scriptToExecute);
          if (id.startsWith('unlock') && !!config.unlockPriKey)
            scriptToExecute = scriptToExecute.replace('__UNLOCK_PRIVATE_KEY__',config.unlockPriKey);
          if (id.startsWith('lock') && !!config.lockPriKey)
            scriptToExecute = scriptToExecute.replace('__LOCK_PRIVATE_KEY__',config.lockPriKey);
          var gettingCurrent = browser.tabs.query({currentWindow: true, active: true, url: "*://*.alma.exlibrisgroup.com/*"});
          gettingCurrent.then(function (tabs) {
            console.log(tabs);
            for (let tab of tabs) {
              console.log('script: ' + id);
              browser.tabs.executeScript(tab.id, {
                code: "(function (scriptBase64) { var scriptElement = document.createElement(\"script\"); scriptElement.innerHTML = atob(scriptBase64); scriptElement.type = \"text/javascript\"; document.body.appendChild(scriptElement); }(\"" + btoa(scriptToExecute) + "\"));"
              },function(){window.close();});
            }
          });
        }
      };
      xhr.send(null);
    } else {
      var gettingCurrent = browser.tabs.query({currentWindow: true, active: true, url: "*://*.alma.exlibrisgroup.com/*"});
      gettingCurrent.then(function (tabs) {
        if (id == 'version'){
          for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, {
              action: "shownews"
            });
          }
        } else {
          var message = "Wie kann das sein?";
          if (!puc.hasClass('nmde') && !puc.hasClass('mde')) message = "Dieses Script funktioniert nur im MDE. Bitte öffnen.";
          else if (puc.hasClass('nmde') && !target.hasClass('nmde')) message = "Dieses Script funktioniert NICHT im neuen MDE.";
          else if (puc.hasClass('mde') && !target.hasClass('mde')) message = "Dieses Script funktioniert NUR im neuen MDE.";
          else {
            console.log(target);
            console.log(puc);
          }
          for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, {
              action: "toast",
              message: message,
              color: '#ffff8f',
              duration: 5
            });
          }
        }
      });
    }
  });
}

browser.storage.local.get().then(function(result){
  config = result;
  if (!config.bmsUrl && !!config.tuwSeen || config.bmsUrl == "https://almagw.ub.tuwien.ac.at/ubintern/bmls/"){
    config.bmsUrl = "https://almagw.ub.tuwien.ac.at/tulama/bmls/";
    browser.storage.local.set({bmsUrl: config.bmsUrl});
  }
  if (!result.disabledBmlsCats){ result.disabledBmlsCats = [ 'onetime','hss','stb','erw' ]; }
  if (!!config.bmsUrl){
    if (config.bmsUrl.substr(-1) != '/')
      var permissions = {
        origins: [config.bmsUrl + '/']
      };
    else
      var permissions = {
        origins: [config.bmsUrl]
      };

    browser.permissions.contains(permissions).then((permitted) => {
      if (permitted){
        var xhr = new XMLHttpRequest();
        console.log('load bookmarklets menue from ' + config.bmsUrl);
        xhr.open("GET", config.bmsUrl + "menu.html?nocache_"+(new Date()).getTime());
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var bmls = $(xhr.responseText);
            if (!!result.disabledBmlsCats) result.disabledBmlsCats.forEach(function(cat){bmls.filter('.'+cat).hide();});
            $('#popup-content').empty().append(bmls);
            listenForClicks();
            var cats = [];
            var menu = $(xhr.responseText).filter('div.bookmarklet');
            menu.each(function(){
              var classes = this.className.split(' ');
              console.log(classes);
              classes.shift();
              classes.shift();
              classes.forEach(function(cat){
                if (!!cat && cat != 'mde' && cat != 'nmde' && cats.find(function(dog){ return (dog.cat == cat);}) == undefined){
                  cats.push({cat: cat, tit: $('div.'+cat+' strong').text()});
                }
              });
            });
            browser.storage.local.set({bmlsCats: cats});
          }
        };
        xhr.send(null);
      } else {
        var bmsUrl = config.bmsUrl;
        var urlRe = /^(https?):\/\/([^\/]*)(\/.*)?$/;
        var match = urlRe.exec(bmsUrl);
        $('#popup-content').empty().append($('<h3>Neue Berechtigung notwendig</h3><p style="padding: 10px;">Bitte erlauben Sie das Nachladen der Bookmarklets von<br/><b>'+match[1] + '://' + match[2] +'/</b><br/><button>Berechtigungen verwalten</button></p>'));
        $('#popup-content button').click(function(){
          browser.tabs.create({
            url: browser.runtime.getURL("permissions.html")
          });
        });
      }
    });
  }
});

$('div#version').text(' lAma v' + browser.runtime.getManifest().version);

var gettingCurrent = browser.tabs.query({currentWindow: true, active: true, url: "*://*.exlibrisgroup.com/*"});
gettingCurrent.then(function (tabs) {
  console.log(tabs);
  if (tabs.length == 0){
    $('#popup-content').addClass('not_alma');
  } else {
    for (let tab of tabs) {
      browser.tabs.executeScript(tab.id, {
        code: `if ($('iframe#yardsNgWrapper').length > 0) ret = "nmde"
        else if ($("iframe[title='MDEditor']").length > 0) ret = "mde"
        else ret = null;
        ret;`
      }).then(res => {
        if (!!res[0])
          $('#popup-content').addClass(res[0]);
        else
          $('#popup-content').removeClass("mde nmde");
        });
    }
    $('#popup-content').removeClass('not_alma');
  }
});