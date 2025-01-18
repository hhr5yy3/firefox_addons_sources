((XMLDocReader) => {
   XMLDocReader = {
      browser: typeof InstallTrigger !== 'undefined' ? browser : chrome,
      isFF: typeof InstallTrigger !== 'undefined' ? true : false,
      userinfo: { email : '', phone : '', avatar: null},
      enabled: true,        // додаток активний / неактивний
      autorefresh: true,    // автооновлення сесії
      addonstyle: true,     // стилі спливаючих вікон додатку
      addonmaps: true,      // додаткові шари карти додатку
      keystore: false,      // збереження даних ключа та паролю до сховища (checkbox)
      codepage: '',         // кодова сторінка вихідних файлів
      privateinfo: { key: null, pass: null, mode: null, type: null, cert: [], name: null },
      usersection: {},      // секція для різних типів даних
      manifest: {},
      debug: true,
      log: console.log.bind(console||window.console, '%c[XMLDocReader]', 'color: #0000FF;'),
      timer: {
         duration  : 1200000,
         limit     : 300000,  // (+/-  5хв) 300000
         _duration : 1200000, // 20 хв 1200000
         _generate: () => { return XMLDocReader.timer._duration + (Math.random() * (Math.random() < 0.5 ? -1 : 1) * XMLDocReader.timer.limit); },
         update: () => {
            XMLDocReader.timer.startTime  = new Date();
            XMLDocReader.timer.duration   = XMLDocReader.timer._generate();
         },
         startTime : new Date(),
         flag : false,
         timeoutId: null,
         timeoutCounter: 0,
         active: () => {
            return (typeof XMLDocReader.timer.timeoutId === 'number');
         },
         start: () => {
            if (!XMLDocReader.timer.active()) {
               XMLDocReader.timer.startTime = new Date();
               XMLDocReader.timer.timeoutId = setInterval(XMLDocReader.timer.onTimer, 1000);
            }
         },
         stop: () => {
            if (XMLDocReader.timer.active()) {
               clearInterval(XMLDocReader.timer.timeoutId);
               XMLDocReader.timer.timeoutId = null;
            }
         },
         onTimer: async () => {
            try {
               await XMLDocReader.browser.tabs.query({url: 'https://e.land.gov.ua/*',status: 'complete'}).then((tabs) => {
                  let counter = new Date().getTime() - XMLDocReader.timer.startTime.getTime();
                  let degrees = Math.round(counter*360/XMLDocReader.timer.duration);
                  let updateFlag = false;
                  if(counter >= XMLDocReader.timer.duration)
                     updateFlag = true;
                  let timerTab = false;
                  tabs.forEach(tab => {
                     if (updateFlag && !timerTab) {
                        timerTab = true;
                        fetch(tab.url, { method : 'GET', mode:'cors', credentials:'same-origin', headers : { 
                           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                           'Content-Type': 'text/html; charset=UTF-8'} }).then((r) => {
                              XMLDocReader.timer.update();
                              XMLDocReader.timer.flag = true;
                              let date = new Date();
                              date.setTime(XMLDocReader.timer.startTime.getTime() + XMLDocReader.timer.duration);
                              var updateTime = XMLDocReader.timer.util.formatDate(date);
                              XMLDocReader.log(`.timer.onTimer Session updated ${XMLDocReader.timer.util.formatDate(XMLDocReader.timer.startTime)}. Next update time: ${updateTime} (after ${XMLDocReader.timer.util.msToTime(XMLDocReader.timer.duration)} min)`);
                           }, (e) => {
                              XMLDocReader.log('.timer.onTimer fetch request error: ', e);
                           })
                     }

                     XMLDocReader.browser.tabs.sendMessage(tab.id, {message: "XMLOnTimer", data: {counter: counter, degrees: degrees, duration: XMLDocReader.timer.duration } }).catch((e)=>{ 
                        XMLDocReader.log(e);
                     });
                  });
               }).catch( (e) => {
                  XMLDocReader.log('.onTimer.tabs.query error: ', e);
               });
            } catch(e) {
               XMLDocReader.log('.onTimer error: ', e);
            }
         },
         util: {
            formatDate : (date, mode=false) => {
               let showData = false;
               var hours = date.getHours();
               var minutes = date.getMinutes();
               var seconds = date.getSeconds();
               var ampm = hours >= 12 ? 'pm' : 'am';
               if (mode) {
                 hours = hours % 12;
                 hours = hours ? hours : 12; // the hour '0' should be '12'
               }

               var strTime = ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2) + (mode?' ' + ampm:'');
               return (showData ? (("0" + (date.getMonth()+1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "/" + date.getFullYear() + " "):'') + strTime;
            },
            msToTime : (val) => {
               var ms = val % 1000;
               val = (val - ms) / 1000;
               var seconds = val % 60;
               val = (val - seconds) / 60;
               var minutes = val % 60;
               var hours   = (val - minutes) / 60;
               hours       = hours   < 10 ? "0" + hours   : hours; 
               minutes     = minutes < 10 ? "0" + minutes : minutes; 
               seconds     = seconds < 10 ? "0" + seconds : seconds; 
               return hours + ':' + minutes + ':' + seconds;
            }
         }
      },
      util: {
         isJsonString: (str) => {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
         },
         checkPermissions: async () => {
            const permissions = { origins: XMLDocReader.manifest.host_permissions };
            let granted = await XMLDocReader.browser.permissions.contains(permissions);
            if (!granted) {
               XMLDocReader.enabled = false;
               let message = `Для користування додатком необхідно надати дозвіл доступу в налаштуваннях до сайту ${XMLDocReader.manifest.host_permissions}!`;
               let request = { data: {'alert': message } };
               XMLDocReader.browser.notifications.create({
                  "type": "basic",
                  "iconUrl": request.data.alert?XMLDocReader.browser.runtime.getURL("/src/images/icons/alert-48.png"):XMLDocReader.browser.runtime.getURL("/src/images/icons/error-48.png"),
                  "title": request.data.alert?'Повiдомлення!':'Помилка!',
                  "message": request.data.alert?request.data.alert:request.data.error
               }); 
            }
            return granted;
         }
      },
      iconUpdate: (tabActive) => {
         tabActive ? XMLDocReader.browser.action.enable() : XMLDocReader.browser.action.disable();
         if (tabActive) {
            if (XMLDocReader.enabled) {
               XMLDocReader.browser.action.setIcon({ path : {"16": "/src/images/action/edit-16.png", "24": "/src/images/action/edit-24.png", "32": "/src/images/action/edit-32.png", "64": "/src/images/action/edit-64.png" }});
            } else {
               XMLDocReader.browser.action.setIcon({ path : {"16": "/src/images/action/edit-16s.png", "24": "/src/images/action/edit-24s.png", "32": "/src/images/action/edit-32s.png", "64": "/src/images/action/edit-64s.png" }}); 
            };
         } else {
            XMLDocReader.browser.action.setIcon({ path : {"16": "/src/images/action/edit-16b.png", "24": "/src/images/action/edit-24b.png", "32": "/src/images/action/edit-32b.png", "64": "/src/images/action/edit-64b.png" }});
         }
      },
      onInstalled: (details) => {
         XMLDocReader.log('.onInstalled event:', details.reason);
         XMLDocReader.browser.tabs.create({ url: 'https://addons.mozilla.org/uk/firefox/addon/xmldocreader/versions/' });
      },
      onDisabled: (info) => {
         XMLDocReader.log('.onDisabled event trigger info:', JSON.stringify(info));
      },
      onPermissions: async (permissions) => {
         await XMLDocReader.reloadPages();
         XMLDocReader.timerUpdate();
         XMLDocReader.onActivated();
      },
      onMessage: (request, sender, sendResponse) => { 
         XMLDocReader.log(`.onMessage.${request.message} event trigger.`);
         if (request.message === "XMLDocReaderNotify") {
            // mode='system' for system messaging inside background script (if tab content script contains errors)
            if (request.type === "message") {
               if (XMLDocReader.addonstyle && request.mode != 'system') {
                   XMLDocReader.browser.tabs.query({active: true, currentWindow: true}, function(tabs) { var tab = tabs[0]; XMLDocReader.browser.tabs.sendMessage(tab.id, request, function(response) { }); });
               } else {
                   XMLDocReader.browser.notifications.create({
                      "type": "basic",
                      "iconUrl": (request.data.utype == 0 ? XMLDocReader.browser.runtime.getURL("/src/images/icons/user-48.png"): XMLDocReader.browser.runtime.getURL("/src/images/icons/comp-48.png")),
                      "title": (request.data.utype == 0 ? (request.data.uowner == false?'Фiзична особа (*)':'Фiзична особа'):'Юридична особа'),
                      "message": request.data.uname + '\r\n' + (request.data.uinn!=null?request.data.uinn:'') + '\r\n' + (request.data.uaddr!=null?request.data.uaddr:'')
                   });
               }
               sendResponse({response: "Response message from background script"});
            } else {
               setTimeout (function () {
                  if (XMLDocReader.addonstyle && request.mode != 'system') {
                     XMLDocReader.browser.tabs.query({active: true, currentWindow: true}, function(tabs) { var tab = tabs[0]; XMLDocReader.browser.tabs.sendMessage(tab.id, request, function(response) { }); });
                  } else  {

                     XMLDocReader.browser.notifications.create({
                        "type": "basic",
                        "iconUrl": request.data.alert?XMLDocReader.browser.runtime.getURL("/src/images/icons/alert-48.png"):XMLDocReader.browser.runtime.getURL("/src/images/icons/error-48.png"),
                        "title": request.data.alert?'Повiдомлення!':'Помилка!',
                        "message": request.data.alert?request.data.alert:request.data.error
                     }); 
                  }
               }, 1000);
            }
         } else if (request.message === "PDFfile") {
            if (XMLDocReader.addonstyle) {
               XMLDocReader.browser.tabs.query({active: true, currentWindow: true}, function(tabs) { var tab = tabs[0]; XMLDocReader.browser.tabs.sendMessage(tab.id, request, function(response) {  }); });
            } else  {
               XMLDocReader.browser.notifications.create({
                  "type": "basic",
                  "iconUrl": (request.data.size > 15000000 ? XMLDocReader.browser.runtime.getURL("/src/images/icons/alert-48.png") : XMLDocReader.browser.runtime.getURL("/src/images/icons/PDF-icon-48.png")),
                  "title": (request.data.size > 15000000 ? 'Розмiр файлу перевищує 15Mb (' + (request.data.size / 1000000).toFixed(2) + 'Mb)':'Файл PDF'),
                  "message": ((request.data.pages?`Кiлькiсть сторiнок документу: ${request.data.pages}\r\n` : '') + 'Розмiр файлу: ' + (request.data.size / 1000000).toFixed(2) + 'Mb')
               });
            }
         } else if (request.message === "XMLDocReaderSetTitle") {
            if (request.data.error) {
                XMLDocReader.browser.action.setTitle({title: request.data.error});
                XMLDocReader.browser.action.setBadgeText({text: 'ERR'});
                XMLDocReader.browser.action.setBadgeBackgroundColor({color:"#f00"});
            } else {
                var title = "XMLDocReader"
                XMLDocReader.browser.action.setTitle({title: title});
                XMLDocReader.browser.action.setBadgeText({text: request.data.btext});
                XMLDocReader.browser.action.setBadgeBackgroundColor({color:"#0000FF"});
            }
         } else if (request.message === "XMLDocReaderGetOptions") {
            sendResponse(XMLDocReader);
         } else if (request.message === "XMLDocReaderSetOptions") {
            XMLDocReader.log('.onMessage.XMLDocReaderSetOptions key=' + request.key);
            // *{ https://stackoverflow.com/questions/53024819 }
            async function processMessage(request) {
               if (typeof request.object === 'object') {
                  let filter = ['enabled', 'userinfo', 'autorefresh', 'addonstyle', 'addonmaps', 'keystore', 'privateinfo', 'usersection', 'codepage'];
                  let sections = [];
                  const oldXMLDocReader = XMLDocReader;
                  for(var key in request.object ) {
                     if (filter.includes(key)) {
                        if (JSON.stringify(XMLDocReader[key]) !== JSON.stringify(request.object[key])) {
                           XMLDocReader[key] = request.object[key];
                           sections.push(key);
                           XMLDocReader.log('.onMessage.XMLDocReaderSetOptions. updated element with key: ' + key);
                        }
                     }
                  }

                  let reload = false;
                  let options = {};
                  if (sections.includes('enabled')) {
                     XMLDocReader.enabled ? await XMLDocReader.scripts.main.set() : await XMLDocReader.scripts.main.unset();
                     if (!XMLDocReader.enabled) {
                        await XMLDocReader.scripts.map.unset();
                     } else {
                        XMLDocReader.addonmaps ?  await XMLDocReader.scripts.map.set() :  await XMLDocReader.scripts.map.unset();
                     }

                     if (XMLDocReader.enabled && !XMLDocReader.timer.active())
                        XMLDocReader.timer.start();

                     if (!XMLDocReader.enabled && XMLDocReader.timer.active())
                        XMLDocReader.timer.stop();

                     reload = true;
                  } else if (sections.includes('addonmaps')) {
                     XMLDocReader.addonmaps ?  await XMLDocReader.scripts.map.set() :  await XMLDocReader.scripts.map.unset(); options.url=XMLDocReader.scripts.map.urls
                     reload = true;
                  } 
                  if (sections.includes('userinfo')) {
                     let func = (XMLDocReader) => {
                        const pref = (window.location.href.startsWith('https://e.land.gov.ua/back/parcel_registration') ? 'parcel_registration' : 
                           (window.location.href.startsWith('https://e.land.gov.ua/back/divide_parcel') ? 'back_bundle_divide_parcel_form_type' : 
                           (window.location.href.startsWith('https://e.land.gov.ua/back/parcel_error_correction') ? 'parcel_correction' : 
                           (window.location.href.startsWith('https://e.land.gov.ua/back/dzk_object') ? 'dzk_o': 
                           (window.location.href.startsWith('https://e.land.gov.ua/back/requests') ? 'request_excerpt' : null) ) ) ) );
                        if (!pref) return;
   
                        let email = document.getElementById(pref + '_type_user_email');
                        let phone = document.getElementById(pref + '_type_user_tel');
   
                        if (email) email.value = XMLDocReader.userinfo.email || '';
                        if (phone) { 
                           if (phone.readOnly) return;
                           phone.value = XMLDocReader.userinfo.phone || '';
                           phone.dispatchEvent(new Event('input', {bubbles:true}));
                        }
                     }
                     await XMLDocReader.remoteScriptExecute({function: func, args: XMLDocReader});
                  } 
                  if (sections.includes('autorefresh')) {
                     let func = (XMLDocReader) => {
                        const timerDiv = document.getElementById("XMLDocReaderTimer");
                        if (timerDiv) timerDiv.style.display = XMLDocReader.autorefresh ? '' : 'none';
                     }
                     await XMLDocReader.remoteScriptExecute({function: func, args: XMLDocReader}).then((r)=>{ XMLDocReader.timerUpdate(); });
                  }
                  if (reload) XMLDocReader.reloadPages(options);
               } else if (typeof request.value === 'object') {
                  for(var key in request.value ) {
                     if (Object.keys(XMLDocReader[request.key]).indexOf(key) == -1) {
                        XMLDocReader.log('.onMessage.XMLDocReaderSetOptions.' + request.key + ' added new element with key: ' + key);
                     } else
                        XMLDocReader.log('.onMessage.XMLDocReaderSetOptions.' + request.key + ' updated element with key: ' + key);
                     XMLDocReader[request.key][key] = request.value[key];
                  }
               } else {
                  XMLDocReader.log('.onMessage.XMLDocReaderSetOptions. updated element with key: ' + request.key);
                  XMLDocReader[request.key] = request.value;
               }
            }
            processMessage(request).then(
               XMLDocReader.storeconfig(request.message).then(() => {
                  sendResponse(XMLDocReader);
               })
            )
            return true; //* { https://stackoverflow.com/questions/52087734/make-promise-wait-for-a-chrome-runtime-sendmessage }
         }
         return true;
      },
      storeconfig: async (m = null) => {
         const config = {
            userinfo         : XMLDocReader.userinfo,
            enabled          : XMLDocReader.enabled,        // додаток активний / неактивний
            autorefresh      : XMLDocReader.autorefresh,    // автооновлення сесії
            addonstyle       : XMLDocReader.addonstyle,     // стилі спливаючих вікон додатку
            addonmaps        : XMLDocReader.addonmaps,      // додаткові шари карти додатку
            keystore         : XMLDocReader.keystore,       // збереження даних ключа та паролю до сховища (checkbox)
            codepage         : XMLDocReader.codepage,
            privateinfo      : XMLDocReader.privateinfo,
            usersection      : XMLDocReader.usersection     // секція для різних типів даних
         };
         return await XMLDocReader.browser.storage.local.set({'XMLDocReader': config}).then(() => {
            XMLDocReader.log('.storeconfig Settings updated successfully' + (m ? '(module: ' + m + ')' : '') );
         }, (e)=>{XMLDocReader.log('.storeconfig Settings updating error: ' + e); });

      },
      readconfig: async () => {
         return await XMLDocReader.browser.storage.local.get(['XMLDocReader']).then((r) => {
            if (typeof r.XMLDocReader === 'undefined') return {status : 'firsttime'};
            var config = (typeof r.XMLDocReader=='object') ? r.XMLDocReader : XMLDocReader.util.isJsonString(r.XMLDocReader) ? JSON.parse(r.XMLDocReader) : [];
            XMLDocReader.userinfo         = config.userinfo ?? XMLDocReader.userinfo;
            XMLDocReader.enabled          = config.enabled  ?? XMLDocReader.enabled;          // додаток активний / неактивний
            XMLDocReader.autorefresh      = config.autorefresh ?? XMLDocReader.autorefresh;   // автооновлення сесії
            XMLDocReader.addonstyle       = config.addonstyle ?? XMLDocReader.addonstyle;     // стилі спливаючих вікон додатку
            XMLDocReader.addonmaps        = config.addonmaps ?? XMLDocReader.addonmaps;       // додаткові шари карти додатку
            XMLDocReader.keystore         = config.keystore ?? XMLDocReader.keystore;         // збереження даних ключа та паролю до сховища (checkbox)
            XMLDocReader.codepage         = config.codepage ?? XMLDocReader.codepage;         // 
            XMLDocReader.privateinfo      = config.privateinfo ?? XMLDocReader.privateinfo;    
            XMLDocReader.usersection      = config.usersection ?? XMLDocReader.usersection;   // секція для різних типів даних
            return {status : 'success'};
         }).catch((e)=>{ throw e; });
      },
      onFocusChanged: () => {
         XMLDocReader.log('.onFocusChanged event trigger.');
         XMLDocReader.onActivated();
      },
      onActivated: async (activeInfo) => {
         XMLDocReader.browser.tabs.query({active: true, currentWindow: true, status: 'complete', windowType: 'normal'}).then((tabs) => {
            let tab = tabs.pop();
            if (!tab) return;
            XMLDocReader.log('.onActivated event trigger.');

            if (tab.url.startsWith('https://e.land.gov.ua/')) {
               XMLDocReader.iconUpdate(true);
               if (!XMLDocReader.enabled) {
                  XMLDocReader.onMessage({message: "XMLDocReaderSetTitle", data: {"btext": ''} });
               } else {
                  XMLDocReader.browser.tabs.sendMessage(tab.id, {method: "XMLDocReaderGetTitle", url : tab.url } )
                     .then((r) => { 
                        XMLDocReader.onMessage({message: "XMLDocReaderSetTitle", data: {"btext": r.btext || '' } })
                     })
                     .catch((e) => { XMLDocReader.log(e); });
               }
            } else { 
               XMLDocReader.onMessage({message: "XMLDocReaderSetTitle", data: {"btext": ''} }); XMLDocReader.iconUpdate(false); 
            }
         })
      },
      loadScript: async (id) => {
         let granted = await XMLDocReader.util.checkPermissions();
         if (!granted) return;

          XMLDocReader.log(`.loadScript event tab ${id}.`);
          return await XMLDocReader.browser.scripting.executeScript({ target: {tabId: id}, files: [ 'src/js/lib.min.js' ]}).then(async(r) => {
            if (r.pop().result) {
               return await XMLDocReader.browser.scripting.executeScript({ target: {tabId: id}, func : XMLDocReader.contentscript, args : [ XMLDocReader ] }).then((r) => {
                   if (r.pop().result)  XMLDocReader.log(`.loadScript script loading into the tab ${id} complete.`);
                   return true;
               }).catch((e)=>{ throw e; });
            } else
               throw 'Помилка читання бібліотеки сценарію, він може бути пошкоджений або відсутній.';
          }).catch((e)=>{ 
             throw e; 
          });
      },
      reloadPages: async (options={}) => {
         const url = options.url ?? 'https://e.land.gov.ua/*';
         await XMLDocReader.browser.tabs.query({url: url}).then(async (tabs) => {
            for (const tab of tabs) { //* { https://habr.com/ru/articles/435084/ }
               await XMLDocReader.browser.tabs.update(tab.id, {url: tab.url.replace(/#$/g,'') });
               XMLDocReader.log(`.reloadPages * url: ${tab.url}.`);
            }
         })
      },
      updatePage: async (id) => {
         return await XMLDocReader.loadScript(id).then((r) => {
            XMLDocReader.log('.updatePage event trigger.');
            if (!XMLDocReader.autorefresh) return;
            let date = new Date();
            if (!XMLDocReader.timer.flag) {
               XMLDocReader.timer.update();
               date.setTime(XMLDocReader.timer.startTime.getTime() + XMLDocReader.timer.duration);
               var updateTime = XMLDocReader.timer.util.formatDate(date);
               XMLDocReader.log(`.updatePage Page updated ${XMLDocReader.timer.util.formatDate(XMLDocReader.timer.startTime)}. Next update time: ${updateTime} (after ${XMLDocReader.timer.util.msToTime(XMLDocReader.timer.duration)} min)`);
            } else {
               XMLDocReader.timer.flag = false;
            }
         }).catch((e) => {
            XMLDocReader.log('.updatePage function error in loadScript module: ', e); 
            XMLDocReader.onMessage({message: "XMLDocReaderNotify", type: 'notify', mode: 'system', data: {"error": `XMLDocReader.updatePage. ${e}` } });
         });
      },
      timerUpdate: async () => {
         if (XMLDocReader.autorefresh) {
           if (!XMLDocReader.timer.active())
              XMLDocReader.timer.start();
         } else {
           if (XMLDocReader.timer.active())
              XMLDocReader.timer.stop();
         }
         XMLDocReader.log(`.timer event trigger (status: ${XMLDocReader.timer.active()}).`);
      },
      onUpdated: (tabId, changeInfo, tabInfo) => {
         if (!XMLDocReader.enabled) return;
         if (changeInfo.status === 'complete' && tabInfo.url) {
            if (tabInfo.url.startsWith('https://e.land.gov.ua/')) {
               XMLDocReader.log('.onUpdated event trigger.');
               XMLDocReader.updatePage(tabId).then((r)=>{
                  if (tabInfo.active) {
                     XMLDocReader.onActivated();
                  }
               })
            } else { 
               if (tabInfo.active) {
                  XMLDocReader.onMessage({message: "XMLDocReaderSetTitle", data: {"btext": ''} }); XMLDocReader.iconUpdate(false); 
               }
            }
         }
         return true;
      },
      remoteScriptExecute: async (options={}) => {
         const url = options.url ?? 'https://e.land.gov.ua/*';
         const func = options.function ?? (()=>{});
         const args = options.args ?? null;
         await XMLDocReader.browser.tabs.query({url: url}).then(async (tabs) => {
            for (const tab of tabs) { //* { https://habr.com/ru/articles/435084/ }
                await XMLDocReader.browser.scripting.executeScript({ target: {tabId: tab.id}, func : func, args : [ args ] }).then((r) => {
                   XMLDocReader.log(`.remoteScriptExecute loading into the tab ${tab.id} complete.`);
               }).catch((e)=>{ throw e; });
            }
         })
      },
      contentscript: (XMLDocReader) => {
         XMLDocReader.update = (response) => {
            for(var e in XMLDocReader) {
               if (typeof XMLDocReader[e] === 'function') 
                  response[e] = XMLDocReader[e];
            }
            response.popupContainer = XMLDocReader.popupContainer;
            response.pageContainer = XMLDocReader.pageContainer;
            response.contentScript = XMLDocReader.contentScript;
            response.browser = XMLDocReader.isFF ? browser : chrome;
            response.classes = XMLDocReader.classes;
            XMLDocReader = response;
         }
         XMLDocReader.setoptions = async (options) => {
            return await XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderSetOptions", key: options.key, value: options.value });
         }
         XMLDocReader.log = console.log.bind(console||window.console, '%c[XMLDocReader]', 'color: #0000FF;');
         XMLDocReader.browser = XMLDocReader.isFF ? browser : chrome;
         XMLDocReader.classes = {
            // message popup class
            MBox : class {
               constructor () {
                  this.__container();
               }
               __container() {
                  var iframe;
                  iframe = document.createElement('div'); 
                  iframe.style.cssText  = "pointer-events: none;";
                  iframe.style.height   = "100%";
                  iframe.style.width    = "350px";
                  iframe.style.position = "fixed";
                  iframe.style.top      = "0px";
                  iframe.style.right    = "0px";
                  iframe.style.zIndex   = "900000";
                  iframe.frameBorder    = "none"; 
            
                  this.container = document.createElement('div');
                  this.container.style.cssText = "position: absolute; right: 20px; bottom: 0;width:100%;";
                  iframe.appendChild(this.container);
                  document.body.appendChild(iframe);
            
               }
            
               __addText (node, text) {
                  text = text.replace(/,(?=[^\s])/g, ", ");
                  var t=text.split(/\s*<br ?\/?>\s*/i),i;
                  if(t[0].length>0){         
                    node.appendChild(document.createTextNode(t[0]));
                  }
                  for(i=1;i<t.length;i++){
                     node.appendChild(document.createElement('BR'));
                     if(t[i].length>0){
                       node.appendChild(document.createTextNode(t[i]));
                     }
                  } 
               }
            
               msgBoxAdd(type='basic',message='',tMessage='',iconUrl='') {
                  var cont = document.createElement('div');
                  cont.style.zIndex = "900001";
                  cont.style.cssText = "pointer-events: auto; padding: 5px;opacity: 0; transform: translate(75%);";
                  setTimeout(()=>{ cont.style.cssText += "opacity: .8; transform: translate(0%); transition: opacity 1s, transform .5s;"; }, 100);

                  var title = document.createElement('div');
                  title.style.cssText = "padding: 0 0 0 10px; background-color: #244D67; color: white; line-height: 30px; width: 100%; border-radius: 8px 8px 0 0;cursor: default;";
                  title.appendChild(document.createTextNode(tMessage));
                  cont.appendChild(title);

                  var mbox = document.createElement('div');
                  mbox.style.cssText = "padding: 10px; background-color: #F1F1F1; color: #000000; width: 100%; height: 120px; border:2px solid #244D67; border-radius: 0 0 8px 8px;";
                  cont.appendChild(mbox);
            
                  var img = document.createElement('img');
                  img.style.cssText = "width: 48px; height: 48px; float: left; margin: 5px;";
                  img.src=iconUrl;
                  mbox.appendChild(img);
            
                  var text = document.createElement('div');
                  text.style.cssText = "font-size: 12px;";
            
                  this.__addText(text, message);
                  mbox.appendChild(text);
            
                  var cbt = document.createElement('span');
                  cbt.onmouseover   = (e)=>{ e.target.style.color='black'; }
                  cbt.onmouseout    = (e)=>{ e.target.style.color='white'; }
                  cbt.onclick       = (e)=>{ e.target.parentElement.parentElement.style.display='none'; } 
                  cbt.style.cssText = "margin: 5px 10px; color: white; font-weight: bold; float: right; font-size: 22px; line-height: 20px; cursor: pointer; transition: 0.3s;";
                  cbt.innerHTML = "&times;"
                  title.appendChild(cbt);
            
                  this.container.appendChild(cont);
                  setTimeout(()=>{ cont.parentNode.removeChild(cont); }, 15000); 
                  setTimeout(()=>{ cont.style.cssText += "opacity: 0; transition: opacity 1s;"; }, 14000);
                  return cont;
               }
            },
            PContainer : class {
               constructor() {
                  this.pages = [];
               }
               add (text, id, url, desc) {
                  if (this._check(url)) return false;
                  var object = []; 
                  object.id = id, object.url = url, object.desc = desc, object.text = text;
                  this.pages.push(object);
                  return true;
               }
               _check(url) {
                  for (var i = 0; i < this.pages.length; i++) {
                     if (url===this.pages[i].url) return true;
                  }
                  return false;
               }
               get (url, mode=0) {
                  for (var i = 0; i < this.pages.length; i++) {
                     if (url===this.pages[i].url) { this.pages[i].same=true; return this.pages[i]; }
                  }
                  for (var i = 0; i < this.pages.length; i++) {
                     if (url.startsWith(this.pages[i].url)) { this.pages[i].same=false; return this.pages[i]; }
                  }
                  return null;
               }
               linkExists (url) {
                  for (var i = 0; i < this.pages.length; i++) {
                     if (url.startsWith(this.pages[i].url)) return true;
                  }
                  return false;
               }
            },
            XMLClass: class {
               constructor () {
                  this.coordsys = [];
                  this.cadastreNumber = '';
               }
            
               norm(el) { if (el.normalize) { el.normalize(); } return el; }
               get(x, y)  { try {return x.getElementsByTagName(y);} catch(e) {return null;} };
               get1(x, y) { try {var n = this.get(x, y); return n.length ? n[0] : null; } catch(e) {return null;} };
               nodeVal(x) {
                  if (x) { this.norm(x); }
                  return (x && x.firstChild && x.firstChild.nodeValue) || '';
               }
            
               addVal( s, t, n)  {
                  if (this.get1( t, n)) { 
                      var str = this.nodeVal( this.get1( t, n));
                      if (str.length > 0) {
                          if (s.length > 0) s += ", ";
                          s += str;
                      }
                  };
                  return s;
               }
            
               getXmlStr(xml) {
                  if (window.ActiveXObject) { return xml.xml; }
                  var str = new XMLSerializer().serializeToString(xml);
                  str = str.split(" ").join("");
                  return '<xmp>' +str +'</xmp>';
               }
            
               xmlCoords(lines, lands, points) {
                  var size = 500000, coords = [];
                  var line = this.get( lines, 'Line');
                  
                  for (var l = 0; l < line.length; l++) {
                      var ln = line[ l];
                      var ulid = this.get1( ln, 'ULID').textContent,
                          fp   = this.get1( ln, 'FP') ? this.get1( ln, 'FP').textContent : 0,
                          tp   = this.get1( ln, 'TP') ? this.get1( ln, 'TP').textContent : 0,
                          land = lands[ ulid];
                  
                      if (fp != tp && fp == land[ land.length -1]) {
                          for (var j = land.length -1; j >= 0; j--) {
                              if (coords.length == 0 || (coords[coords.length - 1][0] != points[ land[j]].x || coords[coords.length - 1][1] != points[ land[j]].y)) { 
                                 coords.push( [points[ land[j]].x, points[ land[j]].y]);
                              }
                          }
                      } else {
                          for (var j = 0; j < land.length; j++) {
                              if (coords.length == 0 || (coords[coords.length - 1][0] != points[ land[j]].x || coords[coords.length - 1][1] != points[ land[j]].y)) { 
                                 coords.push( [points[ land[j]].x, points[ land[j]].y]);
                              }
                          }
                      }
                  }
                  var id=0, name='';
                  switch(this.coordsys.name.toUpperCase()) {
                     case    'SC42': id=   '-42'; name='СК-42 (x, y) стандартні 6° зони'; break;
                     case    'SC63': id=   '-63'; name='СК-63 (x, y) район Х стандартні зони'; break;
                     case 'USC2000': id= '-2000'; name='УСК-2000 (x, y) стандартні 6° зони'; break;
                     case  'МСК-01': id='700001'; name='(АР Крим)'; break;
                     case  'МСК-05': id='700002'; name='(Вінницька область)'; break;
                     case  'МСК-07': id='700003'; name='(Волинська область)'; break;
                     case  'МСК-12': id='700004'; name='(Дніпропетровська область)'; break;
                     case  'МСК-14': id='700005'; name='(Донецька область)'; break;
                     case  'МСК-18': id='700006'; name='(Житомирська область)'; break;
                     case  'МСК-21': id='700007'; name='(Закарпатська область)'; break;
                     case  'МСК-23': id='700008'; name='(Запорізька область)'; break;
                     case  'МСК-26': id='700009'; name='(Івано-Франківська область)'; break;
                     case  'МСК-35': id='700010'; name='(Кіровоградська область)'; break;
                     case  'МСК-32': id='700011'; name='(Київська область)'; break;
                     case  'МСК-44': id='700013'; name='(Луганська область)'; break;
                     case  'МСК-46': id='700014'; name='(Львівська область)'; break;
                     case  'МСК-48': id='700015'; name='(Миколаївська область)'; break;
                     case  'МСК-51': id='700016'; name='(Одеська область)'; break;
                     case  'МСК-53': id='700017'; name='(Полтавська область)'; break;
                     case  'МСК-56': id='700018'; name='(Рівненська область)'; break;
                     case  'МСК-59': id='700019'; name='(Сумська область)'; break;
                     case  'МСК-61': id='700020'; name='(Тернопільська область)'; break;
                     case  'МСК-63': id='700021'; name='(Харківська область)'; break;
                     case  'МСК-65': id='700022'; name='(Херсонська область)'; break;
                     case  'МСК-68': id='700023'; name='(Хмельницька область)'; break;
                     case  'МСК-71': id='700024'; name='(Черкаська область)'; break;
                     case  'МСК-73': id='700025'; name='(Чернівецька область)'; break;
                     case  'МСК-74': id='700026'; name='(Чернігівська область)'; break;
                     case  'МСК-80': id='700012'; name='(м. Київ)'; break;
                     case  'МСК-84': id='700027'; name='(м. Севастополь)'; break;
                     default:        id='0'; name='Мiсцева система координат';
                  }
                  this.coordsys.id = id, this.coordsys.desc = name;
                  return coords;
               };

               getSK63ZoneProj4(x) {
                  var size = 500000, lon0 = 0, x0 = 0;
                  if (x >= 1300000 -size && x < 1300000 +size) {lon0 = '23.5'; x0 = 1300000;}
                  if (x >= 2300000 -size && x < 2300000 +size) {lon0 = '26.5'; x0 = 2300000;}
                  if (x >= 3300000 -size && x < 3300000 +size) {lon0 = '29.5'; x0 = 3300000;}
                  if (x >= 4300000 -size && x < 4300000 +size) {lon0 = '32.5'; x0 = 4300000;}
                  if (x >= 5300000 -size && x < 5300000 +size) {lon0 = '35.5'; x0 = 5300000;}
                  if (x >= 6300000 -size && x < 6300000 +size) {lon0 = '38.5'; x0 = 6300000;}
                  if (x >= 7300000 -size && x < 7300000 +size) {lon0 = '41.5'; x0 = 7300000;}
                  if (x0 > 0) return "+proj=tmerc +ellps=krass +lon_0=" + lon0 +" +lat_0=0 +k=1 +x_0=" + x0 +" +y_0=-9214.69 +towgs84=25,-141,-78.5,0,0.35,0.736,0 +units=m +no_defs";
                  else return null;
               };
            
               async checkInObject(coords) {
                  var minx, miny, maxx, maxy, crc, dst;
                  for (var i=0;i<coords.length;i++){
                     crc = this.getSK63ZoneProj4(coords[i][1]);
                     if (!crc) return {'error':'Система координат є відмінною від СК-63\r\nПошук інформації про перетин здійснюється виключно за координатами в СК-63' };
                     dst = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
                     var ll = proj4(crc, dst, [ coords[i][1], coords[i][0] ]);
                     crc = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
                     dst = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +no_defs";
                     ll = proj4(crc, dst, [ ll[0], ll[1] ]); 
                  
                     if (i===0) { minx=maxx=ll[1]; miny=maxy=ll[0]; }
                     else { minx=(ll[1]<minx)?ll[1]:minx; maxx=(ll[1]>maxx)?ll[1]:maxx; miny=(ll[0]<miny)?ll[0]:miny; maxy=(ll[0]>maxy)?ll[0]:maxy; }
                  }
                  var cenx = (minx+maxx)/2, ceny = (miny+maxy)/2;
                  
                  async function getFDataPage(url = '', formData = {}) {
                     const _url = new URL(url);
                     var response;
                     let headers = new Headers({"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0", 
                                                "X-Requested-With"  : "XMLHttpRequest"
                                              });
                     response = await fetch(_url, { method: 'POST', mode:'cors', credentials:'same-origin', body: formData, headers: headers }); 
                     if (response.ok) { return await response.text();} 
                     else {
                        return {'error':'Помилка читання інформації зі сторінки'};
                  }}
                  
                  var formData = new FormData();
                  formData.append('x', cenx );
                  formData.append('y', ceny );
                  formData.append('zoom','16' );
                  formData.append('actLayers[]','kadastr');
                  return getFDataPage('https://e.land.gov.ua/back/parcel_registration/get_feature_info', formData).then((request) => {
                     try {
                        var json = JSON.parse(request);
                     } catch (error) {
                        return {"error" : "Критична помилка (1001)<br>" + error.message };
                     }
            
                     if (json['Інфо про ділянку']) {
                        return {'message': json['Інфо про ділянку'][0]['Кадастровий номер'] , 'desc' : 'information_available' };
                     } return {'message':'Інформація про ділянку за даними координатами відсутня', 'desc' : 'no_information_available' };
                  });
               }
            
               getUserInfo (au) {
                  function getAddress(sender, elm) {
                     var ad = sender.get1( elm, 'Address');
                     var e, result = '';
                     if (ad) {
                        if (e = sender.nodeVal( sender.get1( ad, 'Country')))      result = result === ''? e: result + ',' + e; 
                        if (e = sender.nodeVal( sender.get1( ad, 'ZIP')))          result = result === ''? e: result + ',' + e; 
                        if (e = sender.nodeVal( sender.get1( ad, 'Region')))       result = result === ''? e: result + ',' + e; 
                        if (e = sender.nodeVal( sender.get1( ad, 'District')))     result = result === ''? e: result + ',' + e; 
                        if (e = sender.nodeVal( sender.get1( ad, 'Settlement')))   result = result === ''? e: result + ',' + e; 
                        if (e = sender.nodeVal( sender.get1( ad, 'Street')))       result = result === ''? e: result + ',' + e; 
                        if (e = sender.nodeVal( sender.get1( ad, 'Building')))     result = result === ''? e: result + ',' + e; 
                        if (e = sender.nodeVal( sender.get1( ad, 'Block')))        result = result === ''? e: result + ',' + e; 
                        if (e = sender.nodeVal( sender.get1( ad, 'BuildingUnit'))) result = result === ''? e: result + ',' + e; 
                     }  return result;
                  }
            
                  var user = {};
                  var np = this.get1( au, 'NaturalPerson');
                  var le = this.get1( au, 'LegalEntity');
            
                  user.type = np?'NaturalPerson':'LegalEntity';
                  user.user_name = '';
                  if (np) {
                      var fn = this.get1( np, 'FullName');
                      if (fn) {
                          if (this.get1( fn, 'LastName')) { user.user_lname = this.nodeVal( this.get1( fn, 'LastName')); user.user_name += (user.user_name==''?'':' ')+user.user_lname; }
                          if (this.get1( fn, 'FirstName')) { user.user_fname = this.nodeVal( this.get1( fn, 'FirstName')); user.user_name += (user.user_name==''?'':' ')+user.user_fname; }
                          if (this.get1( fn, 'MiddleName')) { user.user_mname = this.nodeVal( this.get1( fn, 'MiddleName')); user.user_name += (user.user_name==''?'':' ')+user.user_mname; }
                      }
                      user.user_inn = this.get1( np, 'TaxNumber')?this.nodeVal( this.get1( np, 'TaxNumber')):'';
                      var ps = this.get1( np, 'Passport');
                      if (ps) {
                         user.user_document_type = this.get1( ps, 'DocumentType')?this.nodeVal( this.get1( ps, 'DocumentType')):'';
                         user.user_document_series = this.get1( ps, 'PassportSeries')?this.nodeVal( this.get1( ps, 'PassportSeries')):'';
                         user.user_document_number = this.get1( ps, 'PassportNumber')?this.nodeVal( this.get1( ps, 'PassportNumber')):'';
                         user.user_document_dateIssue = this.get1( ps, 'PassportIssuedDate')?this.nodeVal( this.get1( ps, 'PassportIssuedDate')).replace( /(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1"):'';
                      }
                  }                                            
                  if (le) {
                      user.user_lname = (this.get1( le, 'Name'))?this.nodeVal( this.get1( le, 'Name')):'';
                      user.user_inn = (this.get1( le, 'EDRPOU'))?this.nodeVal( this.get1( le, 'EDRPOU')):''; 
                  }
                  user.user_address = getAddress(this, np?np:le);
            
                  return user;
               }
               //* { http://gisfile.com/js/leaflet.togeojson.js }
               Read(xml, opt) {
                  var parser, doc;
                  if (parser = new DOMParser()) {
                     if (doc = parser.parseFromString(xml, "application/xml")) {
                        // main procedure
                        var ukr = this.get(doc, 'UkrainianCadastralExchangeFile');
                        if (ukr != undefined && ukr.length > 0) {
                           try {
                              var cs = this.get(doc, 'CoordinateSystem')[0].childNodes[1];
                              this.coordsys.name = (cs.nodeName === 'Local')?this.nodeVal(cs):cs.nodeName;
                           } catch(e) {
                              throw 'Неможливо визначити систему координат поточного файлу!';
                           }
            
                           var pt = this.get(doc, 'Point'),
                               pl = this.get(doc, 'PL'),
                               points = [],
                               lands  = [];
                        
                           for (var t in pt) {
                               if (pt[t].nodeName != undefined && pt[t].nodeName == 'Point') {
                                   var id = this.get1( pt[ t], 'UIDP').textContent;
                                   var n  = this.get1( pt[ t], 'PN') ? this.get1( pt[ t], 'PN').textContent : '';
                                   var x  = parseFloat(this.get1( pt[ t], 'X').textContent);
                                   var y  = parseFloat(this.get1( pt[ t], 'Y').textContent);
                                   var d  = this.get1( pt[ t], 'Description') ? this.get1( pt[ t], 'Description').textContent : '';
                                   points[ id] = {'x':x, 'y':y, 'n':n, 'd':d};
                               }
                           }
                        
                           for (var l in pl) {
                               if (pl[l].nodeName != undefined && pl[l].nodeName == 'PL') {
                                   var id  = this.get1( pl[ l], 'ULID').textContent;
                                   var pnt = this.get( pl[ l], 'P');
                                   lands[ id] = [];
                                   
                                   for (var p in pnt) {
                                       if (pnt[p].nodeName != undefined && pnt[p].nodeName == 'P') {
                                           lands[ id].push( pnt[ p].textContent);
                                       }
                                   }
                               }
                           }
                           
                           var polygons = [];
                           if (pl.length > 0) {
                              var czi = this.get( doc, 'CadastralZoneInfo');
                              for (var z = 0; z < czi.length; z++) {
                                 var cqi = this.get( czi[z], 'CadastralQuarterInfo');
                                 for (var q = 0; q < cqi.length; q++) {
                                    var pi = this.get( cqi[q], 'ParcelInfo');
                                    for (var o = 0; o < pi.length; o++) {
                                       var metrics = this.get( pi[ o], 'ParcelMetricInfo');
                                       var poly = [];
                                       var prop = {};
                                       // Ділянка
                                       try {
                                          for (var p = 0; p < metrics.length; p++) {
                                             var externals = this.get( metrics[ p], 'Externals');
                                             for (var e = 0; e < externals.length; e++) {
                                                var boundary = this.get( externals[ e], 'Boundary');
                                                for (var b = 0; b < boundary.length; b++) {
                                                   var lines = this.get1( boundary[ b], 'Lines');
                                                   var coords = this.xmlCoords( lines, lands, points);
                                                   poly.push( coords);
                                                }
                                                var internals = this.get( externals[ e], 'Internals');
                                                for (var e = 0; e < internals.length; e++) {
                                                   var boundary = this.get( internals[ e], 'Boundary');
                                                   for (var b = 0; b < boundary.length; b++) {
                                                       var lines = this.get1( boundary[ b], 'Lines');
                                                       var coords = this.xmlCoords( lines, lands, points);
                                                       poly.push( coords);
                                                   }
                                                }
                                             }
                                          }
                        
                                          var pmi = this.get1( pi[ o], 'ParcelMetricInfo');
                        
                                          if (pmi) {
                                             var ikn = this.nodeVal( this.get1( czi[z], 'KOATUU'));
                                             ikn += ":" +this.nodeVal( this.get1( czi[z], 'CadastralZoneNumber'));
                                             ikn += ":" +this.nodeVal( this.get1( cqi[q], 'CadastralQuarterNumber'));
                                             ikn += ":" +this.nodeVal( this.get1( pmi, 'ParcelID'));
                                             if (!opt.isEditor)
                                                prop[ "Кадастр.номер"] = ikn;
                                             else
                                                prop[ "IKN"] = ikn;
                        
                                             var cpi = this.get1( pi[ o], 'CategoryPurposeInfo');
                                             if (cpi) {
                                                var use = this.nodeVal( this.get1( cpi, 'Purpose'));
                                                use += " " +this.nodeVal( this.get1( cpi, 'Use'));
                                                if (!opt.isEditor)
                                                   prop[ "Цільове призначення"] = use;
                                                else
                                                   prop[ "CV"] = use;
                                             }
                        
                                             var area = this.get1( pmi, 'Area');
                                             if (area) {
                                                var s = this.nodeVal( this.get1( area, 'Size'));
                                                s += " " +this.nodeVal( this.get1( area, 'MeasurementUnit'));
                                                if (!opt.isEditor)
                                                   prop[ "Площа"] = s;
                                                else
                                                   prop[ "AS"] = s;
                                             }
                        
                                             var pri = this.get( pi[ o], 'ProprietorInfo');
                                             for (var r = 0; r < pri.length; r++) {
                                                var au = this.get1( pri[r], 'Authentication');
                                                if (au) {
                                                   var user = prop["UserInfo"] = this.getUserInfo(au);
                                                   if ('user_name' in user) {
                                                      if (!opt.isEditor)
                                                         prop[ "Власник"] = user.user_name;
                                                      else
                                                         prop[ "NM"] = user.user_name;
                                                   }
                                                }
                                             }
                                             var Company = {};
                                             var ilw = this.get1(doc, 'InfoLandWork'); // next node
                                             if (ilw) var exc = this.get1(ilw, 'Executor'); // next node
                                             if (exc) {
                                                t = this.nodeVal(this.get1( exc, 'CompanyName'));
                                                Company["FirmName"] = t;
                                                t = this.nodeVal(this.get1( exc, 'TaxNumber'));
                                                if (!t || t == '') { 
                                                   Company["type"] = 'NaturalPerson'; 
                                                   t = this.nodeVal(this.get1( exc, 'EDRPOU')); 
                                                } else {
                                                   Company["type"] = 'LegalEntity'; 
                                                }
                                                Company["FirmCode"] = t;
            
                                                var shf = this.get1(exc, 'Chief');
                                                if (shf) {
                                                   var fn = this.get1( shf, 'ChiefName');
                                                   if (fn) {
                                                      var nm = {};
                                                      if (this.get1( fn, 'LastName')) { nm["LastName"] = this.nodeVal( this.get1( fn, 'LastName'));  }
                                                      if (this.get1( fn, 'FirstName')) { nm["FirstName"] = this.nodeVal( this.get1( fn, 'FirstName')); }
                                                      if (this.get1( fn, 'MiddleName')) { nm["MiddleName"] = this.nodeVal( this.get1( fn, 'MiddleName')); }
                                                      Company["Chief"] = nm;
                                                   }
                                                }
                                                var e, result = '', adr = this.get1(exc, 'Address');
                                                if (adr) {
                                                   if (e = this.nodeVal( this.get1( adr, 'Country')))      result = result === ''? e: result + ',' + e; 
                                                   if (e = this.nodeVal( this.get1( adr, 'ZIP')))          result = result === ''? e: result + ',' + e; 
                                                   if (e = this.nodeVal( this.get1( adr, 'Region')))       result = result === ''? e: result + ',' + e; 
                                                   if (e = this.nodeVal( this.get1( adr, 'District')))     result = result === ''? e: result + ',' + e; 
                                                   if (e = this.nodeVal( this.get1( adr, 'Settlement')))   result = result === ''? e: result + ',' + e; 
                                                   if (e = this.nodeVal( this.get1( adr, 'Street')))       result = result === ''? e: result + ',' + e; 
                                                   if (e = this.nodeVal( this.get1( adr, 'Building')))     result = result === ''? e: result + ',' + e; 
                                                   if (e = this.nodeVal( this.get1( adr, 'Block')))        result = result === ''? e: result + ',' + e; 
                                                   if (e = this.nodeVal( this.get1( adr, 'BuildingUnit'))) result = result === ''? e: result + ',' + e; 
                                                   Company["Address"] = result;
                                                }
                                                exc = this.get1(exc, 'Executor');
                                             }
            
                                             if (exc) {
                                                var en = this.get1(exc, 'ExecutorName');
                                                if (en) {
                                                   var nm = {};
                                                   if (this.get1( en, 'LastName')) { nm["LastName"] = this.nodeVal( this.get1( en, 'LastName'));  }
                                                   if (this.get1( en, 'FirstName')) { nm["FirstName"] = this.nodeVal( this.get1( en, 'FirstName')); }
                                                   if (this.get1( en, 'MiddleName')) { nm["MiddleName"] = this.nodeVal( this.get1( en, 'MiddleName')); }
                                                   Company["Executor"] = nm;
                                                }
                                                var cti = this.get1(exc, 'ContactInfo');
                                                if (cti) {
                                                   var phone = this.nodeVal(this.get1(cti, 'Phone'));
                                                   var email = this.nodeVal(this.get1(cti, 'Email'));
                                                   if (email) Company["Email"] = email;
                                                   if (phone) {
                                                      phone = phone.replace( /[^\d]/g,'');
                                                      phone = (phone.length < 12) ? phone = '380322450000'.substring(0, 12 - phone.length) + phone:phone;
                                                      phone = phone.replace( /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, "$2$3$4$5");
                                                      Company["phone"] = phone;
                                                      if (prop["UserInfo"]) prop["UserInfo"]["user_tel"] = phone;
                                                  }
                                                }
                                             }
                                             prop["Company"] = Company;
            
                                             var dtype = this.get1( pi[ o], 'TechnicalDocumentationInfo');
                                             if (dtype) {
                                                t = this.nodeVal(this.get1( dtype, 'DocumentationType'));
                                                prop[ "doctype"] = t;
                                             }
            
                                             if (!opt.isEditor) {
                                                var users = this.get1( pi[ o], 'Proprietors');
                                                if (users) {
                                                    prop[ "XML"] = this.getXmlStr( users);
                                                }
                                             } else {
                                                prop[ "name"] = opt.filename;
                                                var osi = this.get1( pi[ o], 'OwnershipInfo');
                                                if (osi) {
                                                   var code = this.nodeVal( this.get1( osi, 'Code'));
                                                   prop[ "PF"] = code;
                                                }
                                                var pli = this.get1( pi[ o], 'ParcelLocationInfo');
                                                if (pli) {
                                                   var adr = "";
                                                   adr = this.addVal( adr, pli, 'Settlement');
                                                   var pa = this.get1( pli, 'ParcelAddress');
                                                   if (pa) {
                                                      adr = this.addVal( adr, pa, 'StreetType');
                                                      adr = this.addVal( adr, pa, 'StreetName');
                                                      adr = this.addVal( adr, pa, 'Building');
                                                      adr = this.addVal( adr, pa, 'Block');
                                                   }
                                                   adr = this.addVal( adr, pli, 'District');
                                                   adr = this.addVal( adr, pli, 'Region');
                                                   prop[ "AD"] = adr.trim();
                                                }
                                                
                                                var pri = this.get1( pi[ o], 'ProprietorInfo');
                                                if (pri) {
                                                   var dec = "";
                                                   var aib = this.get1( pri, 'AdditionalInfoBlock');
                                                   if (aib) {
                                                       //AdditionalInfo
                                                   }
                                                   var paj = this.get1( pri, 'PropertyAcquisitionJustification');
                                                   if (paj) {
                                                      //Document
                                                      dec = this.addVal( dec, paj, 'DocumentDate');
                                                      dec = this.addVal( dec, paj, 'DocumentNumber');
                                                      dec = this.addVal( dec, paj, 'ApprovalAuthority');
                                                   }
                                                   prop[ "PZ"] = dec.trim();
                                                }
                                             }
                                          }
                                          var polygon = { type: 'Parcels',
                                                          properties: prop,
                                                          styles: {color:'Black',weight:3,fillOpacity:0.3},
                                                          geometry: {
                                                              type: 'Polygon',
                                                              coordinates: poly
                                                          }
                                                        };
                        
                                          polygons.push( polygon);
                                       } catch (err) {
                                          console.log( err);
                                       }
                        
                                       // Вгіддя
                                       if (!opt.isEditor)
                                       try {
                                          var lpi = this.get( pi[ o], 'LandParcelInfo');
                                          for (var r = 0; r < lpi.length; r++) {                                    
                                             var lmi = this.get1( lpi[ r], 'MetricInfo');
                                             if (lmi) {
                                                poly = [];
                                                prop = {};
                                                var landcode = this.get1( lpi[ r], 'LandCode');
                                                if (landcode) {
                                                   prop[ "Код угіддя"] = this.nodeVal( landcode);
                                                }
                                                var area = this.get1( lmi, 'Area');
                                                if (area) {
                                                   var s = this.nodeVal( this.get1( area, 'Size'));
                                                   s += " " +this.nodeVal( this.get1( area, 'MeasurementUnit'));
                                                   prop[ "Площа"] = s;
                                                }
                                                var len = this.get1( lmi, 'Perimeter');
                                                if (len) {
                                                   prop[ "Периметр"] = this.nodeVal( len) +" м";
                                                }
                                                var externals = this.get( lpi[ r], 'Externals');
                                                for (var e = 0; e < externals.length; e++) {
                                                   var boundary = this.get( externals[ e], 'Boundary');
                                                   for (var b = 0; b < boundary.length; b++) {
                                                      var lines = this.get1( boundary[ b], 'Lines');
                                                      var coords = this.xmlCoords( lines, lands, points);
                                                      poly.push( coords);
                                                   }
                                                   var internals = this.get( externals[ e], 'Internals');
                                                   for (var e = 0; e < internals.length; e++) {
                                                      var boundary = this.get( internals[ e], 'Boundary');
                        
                                                      for (var b = 0; b < boundary.length; b++) {
                                                         var lines = this.get1( boundary[ b], 'Lines');
                                                         var coords = this.xmlCoords( lines, lands, points);
                                                         poly.push( coords);
                                                      }
                                                   }
                                                }
                        
                                                var polygon = { type: 'LandParcel',
                                                                properties: prop,
                                                                styles: {color:'Blue',weight:2,fillOpacity:0.3,fill:"false"},
                                                                geometry: {
                                                                    type: 'Polygon',
                                                                    coordinates: poly
                                                                }
                                                              };
                                                polygons.push( polygon);
                                             }
                                          }
                                       } catch (err) {
                                           console.log( err);
                                       }
                                       
                                       // Суміжники
                                       if (!opt.isEditor)
                                       try {
                                          var au = this.get( pi[ o], 'AdjacentUnits');
                                          for (var u = 0; u < au.length; u++) {
                                             var aui = this.get( au[ u], 'AdjacentUnitInfo');
                                             for (var ui = 0; ui < aui.length; ui++) {
                                                var unit = aui[ ui];
                                                poly = [];
                                                prop = {};
                                                var boundary = this.get( unit, 'AdjacentBoundary');
                                                for (var b = 0; b < boundary.length; b++) {
                                                   var lines = this.get1( boundary[ b], 'Lines');
                                                   var coords = this.xmlCoords( lines, lands, points);
                                                   poly.push( coords);
                                                }
                                                var cadn = this.get1( unit, 'CadastralNumber');
                                                if (cadn) {
                                                   var s = this.nodeVal( cadn);
                                                   prop[ "CadastralNumber"] = s;
                                                }          
                                                var users = this.get1( unit, 'Proprietor');
                                                if (users) {
                                                   prop[ "XML"] = this.getXmlStr(users);
                                                }
                                                var polygon = { type: 'AdjacentUnits',
                                                                properties: prop,
                                                                styles: {color:'Black',weight:1,fillOpacity:0.3},
                                                                geometry: {
                                                                    type: 'LineString',
                                                                    coordinates: poly[0]
                                                                }
                                                              };
                        
                                                polygons.push( polygon);
                                             }
                                          }
                                       } catch (err) {
                                           console.log( err);
                                       }
                                    }
                                 }
                              }
                           }
                           this.Polygons = polygons;
                           return polygons;
                        }
                     }
                  }
               }
            },
            PageParser: class {
               constructor (html) {
                  this.html = html.replace(/(?:\r\n|\r|\n)/g,'');
                  this.blocks = this.makeIdxArray();
                  this.in4body = null;
                  this.codepage = null;
               }
            
               getBlock (array, value) {
                  return array.filter(element => element[0].indexOf(value)===0);
               }
               
               getElement (array, value) {
                  var res = [];
                  array.forEach( function (e) {
                    let index = e[1].findIndex(element => value.find(e => element[0].indexOf(e)===0));
                    index>=0?res.push(e[1][index][1]):res.push(null);
                  });
                  return res;
               }
            
               makeIdxArray () {
                  var result = {}, s, s1, m, p;
                  let header = this.parseHeader();
                  let specrep = (e) => {return e?e.replace(/(&nbsp;|<br>|&#160;)/g,'').replace(/(&amp;|&#038;|&#38;)/g, '&').replace(/(&gt;|&#062;|&#62;)/g, '>').replace(/(&lt;|&#060;|&#60;)/g, '<').replace(/(&quot;|&#034;|&#34;)/g, '"').replace(/(&apos;|&#039;|&#39;)/g, '\''):''};
                  let fquotes = (e) => {return e?e.replace(/(?:\")/g,'\\"'):'';};
                  // Блок "Відомості про земельну ділянку"
                  s = this.getBlock(header, 'Відомості про земельну ділянку');
                  if (s.length>0) {
                     m = this.getElement(s, ['Кадастровий номер']);    result['KN'] = m[0].match(/(\d{10}:\d{2}:\d{3}:\d{4})/m)?.[1]?.split(':') || '';
                     m = this.getElement(s, ['Цільове призначення']);  result['CV'] = fquotes(specrep(m[0]));
                     m = this.getElement(s, ['Категорія земель']);     result['KZ'] = specrep(m[0]);
                     m = this.getElement(s, ['Вид використання']);     result['TX'] = fquotes(specrep(m[0]));
                     m = this.getElement(s, ['Форма власності']);      result['PF'] = specrep(m[0]);
                     m = this.getElement(s, ['Площа земельної ділянки']);
                      p = specrep(m[0]).split(' ');
                      result['AS'] = p&&p.length>1&&p[0]>0?p[0]:'0.0000';
                      result['SZ'] = p&&p.length>1?p[1].indexOf('га')===0?'га':'кв.м':'га';
                     m = this.getElement(s, ['Місце розташування']);   result['AD'] = fquotes(specrep(m[0]));
                  }
                  // Блок "Інформація про документацію із землеустрою на земельну ділянку"
                  s = this.getBlock(header, 'Інформація про документацію із землеустрою');
                  if (s.length>0) {
                     p = [];
                     m = this.getElement(s, ['Документація із землеустрою']);  p.push(fquotes(specrep(m[0])));
                     m = this.getElement(s, ['Дата документації']);            p.push(m[0]);
                     s1 = this.getBlock(header, 'Відомості про сертифікованого інженера - землевпорядника (БЕЗПОСЕРЕДНІЙ ВИКОНАВЕЦЬ)');
                     if (s1.length>0) {
                        m = this.getElement(s1, ['Місце роботи']);             p.push(fquotes(specrep(m[0])));
                        m = this.getElement(s1, ['ПІБ інженера']);             p.push(fquotes(specrep(m[0])));
                     }
                     result['TD'] = p;
                  }
                  // Блок "Відомості про суб'єктів права власності на земельну ділянку"
                  s = this.getBlock(header, 'Відомості про суб\'єктів права власності');
                  if (s.length>0) {
                     m = this.getElement(s, ['Прізвище, ім\'я та по батькові', 'Найменування юридичної особи']);
                      result['NM'] = fquotes(specrep(m.join('|')));
                      result['VP'] = (m.map(e =>  '1\/' + m.length)).join('|');
                     m = this.getElement(s, ['Код ЄДРПОУ']);
                      if (m.length==1&&m[0]) result['KU'] = m.join('|');
                  }
                  // Блок "Відомості про суб'єкта речового права на земельну ділянку"
                  s = this.getBlock(header, 'Відомості про суб\'єкта речового права');
                  if (s.length>0) {
                     m = this.getElement(s, ['Вид речового права']);  result['LR'] = fquotes(m.join('|'));
                     m = this.getElement(s, ['Прізвище, ім\'я та по батькові', 'Найменування юридичної особи']); result['LN'] = fquotes(specrep(m.join('|')));
                     m = this.getElement(s, ['Код ЄДРПОУ']);          result['LU'] = m.join('|');
                     m = this.getElement(s, ['Площа']);               result['LA'] = m.join('|');
                     m = this.getElement(s, ['Дата державної реєстрації права (в державному реєстрі прав)']); result['LD'] = m.join('|');
                     m = this.getElement(s, ['Розмір плати за користування']); result['LP'] = m.join('|');
                  }
                  // Блок "Відомості про зареєстроване обмеження у використанні земельної ділянки"
                  s = this.getBlock(header, 'Відомості про зареєстроване обмеження');
                  if (s.length>0) {
                     m = this.getElement(s, ['Вид обмеження']);       result['LS'] = fquotes(specrep(m.join('|')));
                  }
                  // Угіддя
                  s = this.getBlock(header, 'explication');
                  if (s.length>0) {
                     let an=[], aa=[];
                     for (let i=0;i<s[0][1].length;i++) {
                        an.push(fquotes(s[0][1][i][1].charAt(0).toUpperCase() + s[0][1][i][1].slice(1)));
                        aa.push(parseFloat(s[0][1][i][2]).toFixed(4));
                     }
                     result['XN'] = an.join('|');                 result['XA'] = aa.join('|');
                  }
                  return result;
               }
            
               parseHeader () {
                  var ainfo = [], name = '', html = this.html, section, rows, cells, expl, line, e_name, e_value;
                  while (html)  {
                     if (section = html.match(/<td colspan="2"(?:[^>]*)>(.*?)<\/td>(.*)/im )) {
                        name   = section[1].trim()===''?name:section[1].trim();
                        html   = section[2];
                        var ae = [], iblock;
                  
                        iblock = html.match( /(.*?)<td colspan="2"(?:[^>]*)>(?:.*?)<\/td>/im );
                        iblock = (iblock===null?[null, html]:iblock); // якщо останнiй елемент
                        if (rows = iblock[1].match( /<tr>\s*<td>\s*([^<]*)<\/td>\s*<td>\s*(?:<a\s+[^>]*>\s*)?(.*?)(?:\s*<\/a>)?\s*<\/td>\s*<\/tr>/ig )) {
                           for (let j=0; j< rows.length; j++) {
                              //line    = rows[j].match( /<tr>\s*<td>\s*([^<]*)<\/td>\s*<td>\s*([^<]*)<\/td>\s*<\/tr>/im );
                              line    = rows[j].match( /<tr>\s*<td>\s*([^<]*)<\/td>\s*<td>\s*(?:<a\s+[^>]*>\s*)?(.*?)(?:\s*<\/a>)?\s*<\/td>\s*<\/tr>/im );
                              e_name  = line[1].trim();
                              e_value = line[2].trim();
                              ae.push([e_name, e_value]);
                           }
                        }
                        ainfo.push([name, ae]);
                     } else {
                        // експлiкацiя угiдь
                        expl = html.match(/<tr\s+id="explication"(?:[^>]*)>(.*?)<\/tr>(.*)/im);
                        if (expl) {
                           section = expl[0].match(/<table(.*?)<\/table>/im);
                           if (section) {
                              rows = section[0].match(/<tr>\s*<td(.*?)<\/tr>/ig);
                              if (rows) {
                                 var at = [], ar = [], numb, name, area;
                                 for (let j=0; j< rows.length; j++) {
                                   cells = rows[j].match(/<td(?:[^>]*)>([^<]*)<\/td>\s*<td(?:[^>]*)>([^<]*)<\/td>\s*<td(?:[^>]*)>([^<]*)<\/td>\s*/im);
                                   if (cells) {
                                     numb = cells[1].trim();
                                     name = cells[2].trim();
                                     area = cells[3].trim();
                                     ar.push([j, name, area]);
                                   }
                                 }
                                 ainfo.push(['explication', ar]);
                              }
                           }
                        } 
                        html = null;
                     } 
                  }
                  return ainfo;
               }
            
               createIn4 (json, codepage) {
                  let padl = (pos, val, len, padString) => {
                    len = len>>0; //floor if number or convert non-number to 0;
                    val = String(val);
                    padString = String(padString || ' ');
                    if (val.length > len) {
                        return val;
                    } else {
                       len = len-val.length;
                       if (len > padString.length) {
                          padString += padString.repeat(len/padString.length); //append to original to ensure we are longer than needed
                       }
                       return (pos=='l'||pos=='L')?padString.slice(0,len) + val:val + padString.slice(0,len);
                    }
                  }
                  // формування списку координат
                  var coord = '', res;
                  try {
                     //var json = JSON.parse(str), swap=false;
                     for (var i = 0; i < json.coordinates.length; i++) {
                       var n = 1, jl = json.coordinates[i].length;
                       // jl = к-сть контурів
                       for (var j = 0; j < jl; j++) {
                         var kl = json.coordinates[i][j].length;
                         for (var k = 0; k < kl; k++) {
                           var x = json.coordinates[i][j][k][1], y = json.coordinates[i][j][k][0], s = `N=${n},NP="${padl('l',n,6,'0')}",X=${x},Y=${y},MX=0.05,MY=0.05`;
                           if (jl==1 && k==kl-2) { coord += `${s}\r\n`; break; }
                           coord += `${s},\r\n`;
                           n++;
                         }
                       }
               
                       for (var j = jl-1; j > 0; j--) {
                          var x = json.coordinates[i][j][0][1],  y = json.coordinates[i][j][0][0];
                          var s = `N=${n},NP="${padl('l',n,6,'0')}",X=${x},Y=${y},MX=0.05,MY=0.05`;
                          coord += `${s}${j>1?',':''}\r\n`;
                          n++;
                       }
                     }
                     
                     res = `BL,\r\nDS="${this.blocks.KN[0]}",\r\nSD="${this.blocks.KN[1]}",\r\nBC="${this.blocks.KN[2]}",\r\nSZ="${this.blocks.SZ}.",\r\nCS="0,Baltic77",\r\nHS="2",\r\nAB=${this.blocks.AS},\r\nMB=0.0005,\r\n`;
                     res += coord;
                     res += `SR,\r\nSC="${this.blocks.KN[2]}${this.blocks.KN[3]}",\r\nAD="${this.blocks.AD?this.blocks.AD:'-'}",\r\nNM="${this.blocks.NM?this.blocks.NM:'-'}",\r\nTX="${this.blocks.TX?this.blocks.TX:'-'}",\r\nPF="${this.blocks.PF?this.blocks.PF:'-'}",\r\nKF="${this.blocks.KF?this.blocks.KF:'-'}",\r\nKU="${this.blocks.KU?this.blocks.KU:'-'}",\r\nKZ="${this.blocks.KZ?this.blocks.KZ:'-'}",\r\nMP="0",\r\nVP="${this.blocks.VP?this.blocks.VP:'-'}",\r\nPZ="${this.blocks.PZ?this.blocks.PZ:'-'}",\r\nCV="${this.blocks.CV?this.blocks.CV:'-'}",\r\nTD="${this.blocks.TD?this.blocks.TD:'-'}",\r\nLS="${this.blocks.LS?this.blocks.LS:'-'}",\r\nLR="${this.blocks.LR?this.blocks.LR:'-'}",\r\nLN="${this.blocks.LN?this.blocks.LN:'-'}",\r\nLU="${this.blocks.LU?this.blocks.LU:'-'}",\r\nLD="${this.blocks.LD?this.blocks.LD:'-'}",\r\nLP="${this.blocks.LP?this.blocks.LP:'-'}",\r\nLA="${this.blocks.LA?this.blocks.LA:'-'}",\r\nAS=${this.blocks.AS},\r\nMS=0.0005,\r\n`;
                     res += coord;
                     if (this.blocks.XN) {
                        res += `CL,\r\nLC="1",\r\nXN="${this.blocks.XN?this.blocks.XN:'-'}",\r\nXA="${this.blocks.XA?this.blocks.XA:'-'}",\r\nML=0.0005,\r\n`;
                        res += coord;
                     }

                     this.codepage = ['Dos (866)','Win (1251)','Utf8 (65001)'].includes(codepage) ? codepage : 'Utf8 (65001)';
                     this.in4body = this.convertCodepage(res, this.codepage);
                     return true;
                  } catch (e) {
                     throw e;
                  }
                  return false;
               }
               convertCodepage (fileData, codePage) {
                  let cp = ['Dos (866)','Win (1251)','Utf8 (65001)'].includes(codePage) ? codePage : 'Utf8 (65001)';
                  //* { https://stackoverflow.com/questions/2696481/ }
                  function UnicodeToWin1251(s) {
                     var DMap = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49, 50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59, 60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65, 66: 66, 67: 67, 68: 68, 69: 69, 70: 70, 71: 71, 72: 72, 73: 73, 74: 74, 75: 75, 76: 76, 77: 77, 78: 78, 79: 79, 80: 80, 81: 81, 82: 82, 83: 83, 84: 84, 85: 85, 86: 86, 87: 87, 88: 88, 89: 89, 90: 90, 91: 91, 92: 92, 93: 93, 94: 94, 95: 95, 96: 96, 97: 97, 98: 98, 99: 99, 100: 100, 101: 101, 102: 102, 103: 103, 104: 104, 105: 105, 106: 106, 107: 107, 108: 108, 109: 109, 110: 110, 111: 111, 112: 112, 113: 113, 114: 114, 115: 115, 116: 116, 117: 117, 118: 118, 119: 119, 120: 120, 121: 121, 122: 122, 123: 123, 124: 124, 125: 125, 126: 126, 127: 127, 1027: 129, 8225: 135, 1046: 198, 8222: 132, 1047: 199, 1168: 165, 1048: 200, 1113: 154, 1049: 201, 1045: 197, 1050: 202, 1028: 170, 160: 160, 1040: 192, 1051: 203, 164: 164, 166: 166, 167: 167, 169: 169, 171: 171, 172: 172, 173: 173, 174: 174, 1053: 205, 176: 176, 177: 177, 1114: 156, 181: 181, 182: 182, 183: 183, 8221: 148, 187: 187, 1029: 189, 1056: 208, 1057: 209, 1058: 210, 8364: 136, 1112: 188, 1115: 158, 1059: 211, 1060: 212, 1030: 178, 1061: 213, 1062: 214, 1063: 215, 1116: 157, 1064: 216, 1065: 217, 1031: 175, 1066: 218, 1067: 219, 1068: 220, 1069: 221, 1070: 222, 1032: 163, 8226: 149, 1071: 223, 1072: 224, 8482: 153, 1073: 225, 8240: 137, 1118: 162, 1074: 226, 1110: 179, 8230: 133, 1075: 227, 1033: 138, 1076: 228, 1077: 229, 8211: 150, 1078: 230, 1119: 159, 1079: 231, 1042: 194, 1080: 232, 1034: 140, 1025: 168, 1081: 233, 1082: 234, 8212: 151, 1083: 235, 1169: 180, 1084: 236, 1052: 204, 1085: 237, 1035: 142, 1086: 238, 1087: 239, 1088: 240, 1089: 241, 1090: 242, 1036: 141, 1041: 193, 1091: 243, 1092: 244, 8224: 134, 1093: 245, 8470: 185, 1094: 246, 1054: 206, 1095: 247, 1096: 248, 8249: 139, 1097: 249, 1098: 250, 1044: 196, 1099: 251, 1111: 191, 1055: 207, 1100: 252, 1038: 161, 8220: 147, 1101: 253, 8250: 155, 1102: 254, 8216: 145, 1103: 255, 1043: 195, 1105: 184, 1039: 143, 1026: 128, 1106: 144, 8218: 130, 1107: 131, 8217: 146, 1108: 186, 1109: 190};
                     var L = [];for (var i=0; i<s.length; i++) {var ord = s.charCodeAt(i);if (!(ord in DMap))throw "Character "+s.charAt(i)+" isn't supported by win1251!";L.push(DMap[ord]);}return new Uint8Array(L);
                  }
                  
                  function UnicodeToDos866(s) {
                     var DMap = {0: 0, 1: 1, 10: 10, 100: 100, 101: 101, 102: 102, 1025: 240, 1026: 128, 1027: 129, 1028: 242, 1029: 189, 103: 103, 1030: 73, 1031: 244, 1032: 163, 1033: 138, 1034: 140, 1035: 142, 1036: 141, 1038: 161, 1039: 143, 104: 104, 1040: 128, 1041: 129, 1042: 130, 1043: 131, 1044: 132, 1045: 133, 1046: 134, 1047: 135, 1048: 136, 1049: 137, 105: 105, 1050: 138, 1051: 139, 1052: 140, 1053: 141, 1054: 142, 1055: 143, 1056: 144, 1057: 145, 1058: 146, 1059: 147, 106: 106, 1060: 148, 1061: 149, 1062: 150, 1063: 151, 1064: 152, 1065: 153, 1066: 154, 1067: 155, 1068: 156, 1069: 157, 107: 107, 1070: 158, 1071: 159, 1072: 160, 1073: 161, 1074: 162, 1075: 163, 1076: 164, 1077: 165, 1078: 166, 1079: 167, 108: 108, 1080: 168, 1081: 169, 1082: 170, 1083: 171, 1084: 172, 1085: 173, 1086: 174, 1087: 175, 1088: 224, 1089: 225, 109: 109, 1090: 226, 1091: 227, 1092: 228, 1093: 229, 1094: 230, 1095: 231, 1096: 232, 1097: 233, 1098: 234, 1099: 235, 11: 11, 110: 110, 1100: 236, 1101: 237, 1102: 238, 1103: 239, 1105: 241, 1106: 144, 1107: 131, 1108: 243, 1109: 190, 111: 111, 1110: 105, 1111: 245, 1112: 188, 1113: 154, 1114: 156, 1115: 158, 1116: 157, 1118: 162, 1119: 159, 112: 112, 113: 113, 114: 114, 115: 115, 116: 116, 1168: 165, 1169: 180, 117: 117, 118: 118, 119: 119, 12: 12, 120: 120, 121: 121, 122: 122, 123: 123, 124: 124, 125: 125, 126: 126, 127: 127, 13: 13, 14: 14, 15: 15, 16: 16, 160: 160, 164: 164, 166: 166, 167: 167, 169: 169, 17: 17, 171: 171, 172: 172, 173: 173, 174: 174, 176: 176, 177: 177, 18: 18, 181: 181, 182: 182, 183: 183, 187: 187, 19: 19, 2: 2, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 3: 3, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 4: 4, 40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49, 5: 5, 50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59, 6: 6, 60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65, 66: 66, 67: 67, 68: 68, 69: 69, 7: 7, 70: 70, 71: 71, 72: 72, 73: 73, 74: 74, 75: 75, 76: 76, 77: 77, 78: 78, 79: 79, 8: 8, 80: 80, 81: 81, 82: 82, 8211: 150, 8212: 151, 8216: 145, 8217: 146, 8218: 130, 8220: 147, 8221: 148, 8222: 132, 8224: 134, 8225: 135, 8226: 149, 8230: 133, 8240: 137, 8249: 139, 8250: 155, 83: 83, 8364: 136, 84: 84, 8470: 185, 8482: 153, 85: 85, 86: 86, 87: 87, 88: 88, 89: 89, 9: 9, 90: 90, 91: 91, 92: 92, 93: 93, 94: 94, 95: 95, 96: 96, 97: 97, 98: 98, 99: 99};
                     var L = [];for (var i=0; i<s.length; i++) {var ord = s.charCodeAt(i);if (!(ord in DMap))throw "Character "+s.charAt(i)+" isn't supported by dos866!";L.push(DMap[ord]);}return new Uint8Array(L);
                  }

                  switch (cp) {
                    case 'Dos (866)':
                       return UnicodeToDos866(fileData);
                       break;
                    case 'Win (1251)':
                       return UnicodeToWin1251(fileData);
                       break;
                    default: {
                       return '\ufeff' + fileData;
                    }
                  }
               }

               getCadastreNumber(separator='') {
                  return `${this.blocks.KN[0]}${separator}${this.blocks.KN[1]}${separator}${this.blocks.KN[2]}${separator}${this.blocks.KN[3]}`;
               }

               toBlob () {
                  switch (this.codepage) {
                    case 'Dos (866)':
                       return new Blob([this.in4body], {type: "text/plain;charset=cp866"});
                       break;
                    case 'Win (1251)':
                       return new Blob([this.in4body], {type: "text/plain;charset=windows-1251"});
                       break;
                    default:
                       //* { https://stackoverflow.com/questions/18925210 }
                       return new Blob([this.in4body], {type:"text/plain;charset=utf-8"});
                  }
               }

               saveToFile (fileName) {
                  saveAs(this.toBlob(), fileName);
               }
            }
         }
         XMLDocReader.onMessage = (request, sender, sendResponse) => { 
            if (request.method && request.method === 'XMLDocReaderGetTitle') {
               if (XMLDocReader.enabled) {
                  var page = XMLDocReader.pageContainer.get(request.url);
                  if (page) sendResponse({status: 'success', 'btext': page.text });
               }
               sendResponse({status: 'success', 'btext': ''});
            // request message from background for generate custom popup message
            } else if(request.message == "XMLDocReaderNotify") {
               if (request.type === "message") {
                  var type    = "basic",
                      iconUrl = request.data.utype == 0 ? XMLDocReader.browser.runtime.getURL("/src/images/icons/user-48.png"): XMLDocReader.browser.runtime.getURL("/src/images/icons/comp-48.png"),
                      title   = request.data.utype == 0 ? (request.data.uowner == false?'Фiзична особа (*)':'Фiзична особа'):'Юридична особа',
                      message = request.data.uname + '<br>' + (request.data.uinn!=null?request.data.uinn:'') + '<br>' + (request.data.uaddr!=null?request.data.uaddr:'');
                      if (XMLDocReader.popupContainer.msgBoxAdd(type,message,title,iconUrl)) sendResponse('success');
               } else {
                  var type    = "basic",
                      iconUrl = request.data.alert?XMLDocReader.browser.runtime.getURL("/src/images/icons/alert-48.png"):XMLDocReader.browser.runtime.getURL("/src/images/icons/error-48.png"),
                      title   = request.data.alert?'Повiдомлення!':'Помилка!',
                      message = request.data.alert?request.data.alert:request.data.error;
                      if (XMLDocReader.popupContainer.msgBoxAdd(type,message,title,iconUrl)) sendResponse('success');
               }
            } else if(request.message == "PDFfile") {
               var type    = "basic",
                   iconUrl = request.data.size > 15000000 ? XMLDocReader.browser.runtime.getURL("/src/images/icons/alert-48.png") : XMLDocReader.browser.runtime.getURL("/src/images/icons/PDF-icon-48.png"),
                   title   = request.data.size > 15000000 ? 'Розмiр файлу перевищує 15Mb (' + (request.data.size / 1000000).toFixed(2) + 'Mb)':'Файл PDF',
                   message = (request.data.pages ? `Кiлькiсть сторiнок документу: ${request.data.pages}<br>` : '') + 'Розмiр файлу: ' + (request.data.size / 1000000).toFixed(2) + 'Mb';
                   if (XMLDocReader.popupContainer.msgBoxAdd(type,message,title,iconUrl)) sendResponse('success');
            } else if(request.message == "XMLOnTimer") {
               const timerDiv = document.getElementById("XMLDocReaderTimer");
               if (!timerDiv) return;
               timerDiv.style.backgroundImage = `conic-gradient(#FFA500 ${request.data.degrees}deg, #808080 ${request.data.degrees}deg)`;
               timerDiv.firstChild.innerText = Math.ceil(10 - 10 * request.data.degrees / 360);
            }
            return true;
         }

         XMLDocReader.util = {
            isEmpty: (obj) => { for(var prop in obj) { if(Object.prototype.hasOwnProperty.call(obj, prop)) { return false; } }  return JSON.stringify(obj) === JSON.stringify({}); }
         }

         XMLDocReader.contentScript = {
            ecpContainer: {
               init: () => {
                  var submission_list_page = document.querySelector("a[href='/back/parcel_registration/list']");
                  if (submission_list_page) submission_list_page.addEventListener('click', (e)=>{ 
                      let parcel_registration_list = localStorage.getItem('DataTables_DataTables_Table_0_/back/parcel_registration/list');
                      let atab = parcel_registration_list?JSON.parse(parcel_registration_list):null;
                      let order = atab?.order;

                      if (order) {
                         atab.time = Date.now();
                         const listData = XMLDocReader?.usersection?.parcel_registration_list;
                         try {
                            if (!listData) throw 'null data!';
                            atab.order = [listData.sort_column ?? 3, listData.sorting ?? 'desc'];
                         } catch(e){
                            atab.order = [3,'desc'];
                         }
                         localStorage.setItem('DataTables_DataTables_Table_0_/back/parcel_registration/list', JSON.stringify(atab));
                      }
                  }, false);
                  
                  var observer = new MutationObserver(function( mutations ) {
                     for(let mutation of mutations) {
                        for(let node of mutation.addedNodes) {
                           let control = node.querySelector("div.input-group>input.form-control");
                           if (control) {
                              ecp_container_update('ecp_container');
                           }
                        }
                     }
                  });
                  ecp_containers = document.querySelectorAll("[id^='ecp_container']");
                  ecp_containers.forEach((e) => {  
                     observer.observe(e, { childList: true });
                  });
                  
                  
                  function ecp_container_update (cname) {
                     var element = document.getElementById(cname);
                        // якщо головна сторінка
                        if (document.location.href === 'https://e.land.gov.ua/ecp_auth') {
                           var storeInfo = function(e) {
                              //* { https://stackoverflow.com/questions/32701374/load-a-file-automatically-without-using-a-click-button }
                              e.preventDefault();
                              var state = document.getElementById("login-lifetime")?document.getElementById("login-lifetime").checked:false;
                              XMLDocReader.keystore = state;
                  
                              var info = {keystore: XMLDocReader.keystore, privateinfo : {mode: null, type: null, cert: [], key : null, name: null, pass : null } };
                              if (state) {
                                 var auth_type=null, abtn=null, pbtn=null, fbtn=null, tbtn=null;
                                 auth_type  = 'ecp_file_form';
                                 abtn = document.getElementById("ca_key_file") || null;                 // input (certificate type)
                                 fbtn = document.getElementById("filestyle-0") || null;                 // input (key binary)
                                 tbtn = document.getElementsByName("key_file_password")[0]  || null;    // input (password)
                                 //var cbtn = document.getElementById("key_certs_file");                    // input (certificate key)
                                 if (abtn == null && fbtn == null && tbtn == null) {
                                    auth_type = 'ecp_nki_form';
                                    abtn = document.getElementById("ca_key_nki") || null;                 // input (certificate type)
                                    pbtn = document.getElementById("nki_type") || null;                   // input (type)
                                    nbtn = document.getElementById("nki_name") || null;                   // input (name)
                                    tbtn = document.getElementById("key_password") || null;               // input (password)
                                 }
                                 info.privateinfo.mode = auth_type;
                                 if (fbtn && auth_type == 'ecp_file_form') {
                                    //* { https://stackoverflow.com/questions/27810163/blob-from-javascript-binary-string }
                                    var bkey = fbtn.files[0];
                                    if (!bkey) {
                                       let nbtn = element.querySelector("div.input-group>input.form-control");
                                       if (nbtn) nbtn.value = "";
                                       XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', type: 'notify', data: {'alert': 'Помилка читання даних ключа підпису. Переважно помилка виникає у старих браузерах, які не підтримують деякі функції.' } });
                                       return; // старі версії не підтримують дану опцію
                                    }
                                    var fReader = new FileReader();
                                    fReader.onload = function(e){
                                       info.privateinfo.cert = abtn.selectedIndex;
                                       info.privateinfo.key  = e.target.result;
                                       info.privateinfo.name = 'key-6.dat'; //nbtn.value
                                       info.privateinfo.pass = tbtn.value;
                                       XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderSetOptions", key: 'keystore', value: info.keystore}).then(()=>{XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderSetOptions", key: 'privateinfo', value: info.privateinfo}).then((response)=>{XMLDocReader.update(response);})});
                                    }
                                    fReader.readAsBinaryString(bkey);
                                 } else if (auth_type == 'ecp_nki_form') {
                                       info.privateinfo.cert = abtn.value;
                                       info.privateinfo.type = pbtn.value;
                                       info.privateinfo.name = nbtn.value;
                                       info.privateinfo.pass = tbtn.value;
                                       XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderSetOptions", key: 'keystore', value: info.keystore}).then(()=>{XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderSetOptions", key: 'privateinfo', value: info.privateinfo}).then((response)=>{XMLDocReader.update(response);})});
                                 }
                              }
                           };
                        
                           var sbtn = document.getElementsByName("ecp_action")[0];
                           sbtn.value = 'Вхiд до системи';
                        
                           var form_check, lifetime, label_lifetime;
                           form_check = document.createElement('div');
                           form_check.classList.add('form-check');
                           lifetime = document.createElement('input');
                           lifetime.classList.add('form-check-input');
                           lifetime.id = 'login-lifetime';
                           lifetime.name = 'lifetime';
                           lifetime.value = 'alltime';
                           lifetime.type = 'checkbox';
                           label_lifetime = document.createElement('label');
                           label_lifetime.classList.add('form-check-label');
                           label_lifetime.style.cssText  = 'padding-left:5px;';
                           label_lifetime.setAttribute('for', lifetime.id);
                           label_lifetime.innerText = 'Запам\'ятати iнформацiю для входу на сторiнку';
                           sbtn.parentElement.appendChild(form_check).appendChild(lifetime);
                           sbtn.parentElement.appendChild(form_check).appendChild(label_lifetime);
                           sbtn.addEventListener('click', storeInfo, false);
                           sbtn.focus();
                           document.getElementById('login-lifetime').checked = XMLDocReader.keystore;
                        }
                  
                        if (XMLDocReader.keystore) {
                           var data = XMLDocReader.privateinfo;
                           const OldVer = (data.cert != null && data.key != null && data.name != null && data.pass != null);
                           if (data.mode == 'ecp_file_form' || OldVer) {
                              var i, d, l, array;
                              d = data.key;
                              l = d.length;
                              array = new Uint8Array(l);
                              for (var i = 0; i < l; i++){
                                  array[i] = d.charCodeAt(i);
                              }
                              // *** ACSK type field
                              var abtn = element.querySelector("[id='ca_key_file']");
                              abtn.selectedIndex = data.cert || 0;
                              
                              // *** password field
                              var tbtn = element.querySelector("[name='key_file_password']");
                              tbtn.value = data.pass;  // set input password
                              
                              var blob = new Blob([array], { type: "application/octet-stream" } );
                              var url = window.URL.createObjectURL(blob);
                              var fileBlob = new File( [blob], data.name, { type: "", lastModified: Date.now(), lastModifiedDate: Date.now() } );
                              
                              const dT = new ClipboardEvent('').clipboardData || // Firefox < 62 workaround exploiting //* { https://bugzilla.mozilla.org/show_bug.cgi?id=1422655 }
                                         new DataTransfer(); // specs compliant (as of March 2018 only Chrome)
                              dT.items.add(fileBlob);
                              let fbtn = element.querySelector("[name='key_file']");
                              fbtn.files = dT.files;
                              let nbtn = element.querySelector("div.input-group>input.form-control");
                              if (nbtn) nbtn.value = data.name;
                           } else {
                              var abtn = element.querySelector("[id='ca_key_nki']");
                              abtn.value = data.cert || '';
                  
                              var pbtn = element.querySelector("[id='nki_type']");
                              pbtn.value = data.type || '';
                  
                              var nbtn = element.querySelector("[id='nki_name']");
                              nbtn.value = data.name || '';
                  
                              var tbtn = element.querySelector("[id='key_password']");
                              tbtn.value = data.pass || '';
                           }
                  
                       }
                  }
               }
            },
            historyRegistrationPage: {
               init: () => {
                  try {
                     let theadTh = document.querySelectorAll('div.dataTables_scrollHead table>thead>tr>th');
                     if (!theadTh) return;
                     for (var i = 0; i < theadTh.length; i++) {
                        let list = theadTh[i].className.split(' ');
                        for (e in list) {
                           if (/^(sorting|sorting_asc|sorting_desc)$/im.test(list[e])) {
                              theadTh[i].addEventListener('click', async (e) => {
                                 let index = Array.from(e.target.parentNode.childNodes).indexOf(e.target) || -1;
                                 const sorting = e.target.classList.contains('sorting_desc') ? 'asc' : e.target.classList.contains('sorting_asc') ? 'desc' : 'asc';
                                 const data = {parcel_registration_list : { sort_column : index , sorting : sorting } };
                                 let response = await XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderSetOptions", key: 'usersection', value: data } );
                                 await XMLDocReader.update(response);
                              }, false);
                              break;
                           }
                        }
                     }
                  } catch(e) {
                     XMLDocReader.log(`XMLDocReaderNotify.historyRegistrationPage error: ${e.message}`);
                     XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', type: 'notify', mode: 'system', data: {'error': `XMLDocReaderNotify.historyRegistrationPage error: ${e.message}` } });
                  }
               }
            },
            profilePage: {
               init: () => {
                  try {
                     let referenceDiv = document.querySelector('div.box-body').querySelector('div.form-group');
                     if (referenceDiv) {
                        let parentDiv = referenceDiv.parentNode;
                        let imageSrc = XMLDocReader.contentScript.profilePage.getImageSrc();
                        let label = document.createElement('label');
                        label.classList.add('col-lg-3', 'col-sm-3', 'control-label');
                        label.innerHTML = 'Аватар';
                        let div = document.createElement('div');
                        div.classList.add('col-lg-9', 'col-sm-9');
                        let childDiv = document.createElement('div');
                        childDiv.style.cssText = 'display: flex;justify-content: center;align-items: center;flex-direction: column;width: 100px;height: 100px;outline: 2px dashed #5d5d5d;outline-offset: -5px;background-color: #e0f2f7;font-family: \'Segoe UI\';color: #1f3c44;';
                        let timerId=null,click=(e)=>{document.getElementById('file-input').click();timerId=clearTimeout(timerId);timerId=null;},
                        dblclick=async(e)=>{if(e.target.tagName!=="IMG")return;document.getElementById('upload-image').src=await XMLDocReader.browser.runtime.getURL('src/images/big_eye.gif'); XMLDocReader.userinfo.avatar=await XMLDocReader.browser.runtime.getURL('src/images/big_eye.gif');await XMLDocReader.setoptions({key: 'userinfo', value: XMLDocReader.userinfo});XMLDocReader.contentScript.profilePage.updateAvatar();};
                        childDiv.onclick = (e)=>{  if (!timerId) { timerId = setTimeout(() => { click(e) }, 200); } else { timerId=clearTimeout(timerId);timerId=null;dblclick(e) } };
                        let img = document.createElement('img');
                        img.id = 'upload-image';
                        img.src = imageSrc;
                        img.style.cssText = 'width: 40%;margin-bottom: 10px;user-select: none;';
                        let input = document.createElement('input');
                        input.id = 'file-input';
                        input.setAttribute('type', 'file');
                        input.setAttribute('name', 'file');
                        input.style.cssText = 'display:none;';
                        input.onchange = (e)=>{function x(a){a=(a.target||window.event.srcElement).files;if(FileReader&&a&&a.length){var b=new FileReader;b.onload=async () => {document.getElementById('upload-image').src=b.result; XMLDocReader.userinfo.avatar = b.result; await XMLDocReader.setoptions({key: 'userinfo', value: XMLDocReader.userinfo}); XMLDocReader.contentScript.profilePage.updateAvatar(); };b.readAsDataURL(a[0])}};x(e);}
                        let childLabel = document.createElement('label');
                        childLabel.id = 'avatar-clear';
                        childLabel.style.cssText = 'font-size: 12px;cursor: pointer; text-decoration: underline;';
                        childLabel.innerHTML = 'Видалити';
                     
                        div.appendChild(childDiv);
                        childDiv.appendChild(img);
                        childDiv.appendChild(input);
                        childDiv.appendChild(childLabel);
                     
                        referenceDiv.insertBefore(div, referenceDiv.firstChild);
                        referenceDiv.insertBefore(label, referenceDiv.firstChild);
                     
                        let openIcon = document.getElementById('file-input');
                        openIcon.addEventListener('change', (e) => { 
                            function x(a){a=(a.target||window.event.srcElement).files;if(FileReader&&a&&a.length){var b=new FileReader;b.onload=async () => {document.getElementById('upload-image').src=b.result; XMLDocReader.userinfo.avatar = b.result; await XMLDocReader.setoptions({key: 'userinfo', value: XMLDocReader.userinfo}); XMLDocReader.contentScript.profilePage.updateAvatar(); };b.readAsDataURL(a[0])}};x(e);
                        }, false);
                        let clearIcon = document.getElementById('avatar-clear');
                        clearIcon.addEventListener('click', (e) => {
                            async function x(a){a.stopPropagation(); XMLDocReader.userinfo.avatar='default'; await XMLDocReader.setoptions({key:'userinfo', value: XMLDocReader.userinfo}); document.getElementById('upload-image').src = XMLDocReader.browser.runtime.getURL('src/images/logo.png'); XMLDocReader.contentScript.profilePage.updateAvatar();}x(e);
                        }, false);
                        return true;
                     } else throw new Error('Помилка аналізу сторінки, можливо, вона була змінена власником або неправильно відкрита.'); // Page parsing error, it may have been changed by the owner or opened incorrectly
                  } catch(e) {
                     XMLDocReader.log(`Error: ${e.message}`);
                     XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', type: 'notify', mode: 'system', data: {'error': e.message } });
                  }
               },
               getImageSrc: () => {
                  return !XMLDocReader.userinfo.avatar?XMLDocReader.browser.runtime.getURL('src/images/big_eye.gif'):(XMLDocReader.userinfo.avatar === 'default')?XMLDocReader.browser.runtime.getURL('src/images/user2-160x160.jpg'):XMLDocReader.userinfo.avatar;
               },
               updateAvatar: () => {
                  let imageSrc = XMLDocReader.contentScript.profilePage.getImageSrc();
                  document.querySelectorAll("img[alt='User Image']").forEach(function(element) { element.src = imageSrc });
               }
            },
            mapPage: {
               init: () => {
                  let element = document.querySelector('div.panel>ul');
                  if (!element) return;
               }
            },
            requestsPage: {
               init: () => {
                 XMLDocReader.contentScript.util.storageContainerButtons(async r => {
                    XMLDocReader.log('XMLDocReader.contentScript.util.requestsPage (storageContainerButtons)');
                    let choise = document.getElementById('request_excerpt_requestType');
                    if (choise) choise.addEventListener('change', async (e) => {
                       await XMLDocReader.contentScript.util.getPageDataFromStorage(true);
                    })

                    await XMLDocReader.contentScript.util.collectDataFromPage();
                    XMLDocReader.log('XMLDocReader.contentScript.util.requestsPage (collectDataFromPage)');
                    let res = await XMLDocReader.contentScript.util.getPageDataFromStorage();
                    XMLDocReader.log('XMLDocReader.contentScript.util.requestsPage (getPageDataFromStorage)', res);

                 });
               }
            },
            stateRegistrationPage: {
               init: () => {
                  XMLDocReader.contentScript.util.storageContainerButtons(async r => {
                     XMLDocReader.log('XMLDocReader.contentScript.util.stateRegistrationPage (storageContainerButtons)');
                     await XMLDocReader.contentScript.util.collectDataFromPage();
                     XMLDocReader.log('XMLDocReader.contentScript.util.stateRegistrationPage (collectDataFromPage)');
                     await XMLDocReader.contentScript.util.getPageDataFromStorage().catch(e=>{XMLDocReader.log('.contentScript.stateRegistrationPage error', e)});
                     XMLDocReader.log('XMLDocReader.contentScript.util.stateRegistrationPage (getPageDataFromStorage)');

                     let element = document.getElementById('parcel_registration_xml');
                     if (!element) return;
                     element.addEventListener('change', XMLDocReader.contentScript.stateRegistrationPage.pageComplete, false);
                     XMLDocReader.contentScript.stateRegistrationPage.mapButton(element);

                     // сторінка завантаження документації із землеустрою
                     let techDoc = document.getElementById('parcel_registration_techDoc');
                     if (!techDoc) return;
                     techDoc.addEventListener('change', XMLDocReader.contentScript.util.pdfPageAnalise, false);
                 });
               },
               mapButton: (e) => {
                  let a = document.createElement('a');
                  a.classList.add('btn','btn-default','btn-flat','fancy-view-map');
                  a.setAttribute('type', 'button');
                  a.style.display = 'none';

                  a.onclick = (e)=>{e.preventDefault();let target=(e.target.tagName.toLowerCase()==='i')?e.target.parentNode:e.target;if (target.href) window.open(target.href);};
                  let i = document.createElement('i');
                  i.classList.add('fa', 'fa-map');
                  a.appendChild(i);
                  e.parentNode.insertBefore(a, e.parentNode.firstChild);
               },
               pageComplete: (e) => {
                  e.preventDefault();
                  const fileId = e.target.value ?? null;
                  if (fileId) {
                     let a = e.target.parentNode.querySelector('a.fancy-view-map');
                     if (a) {
                        a.style.display = fileId ? '' : 'none';
                        a.href = `/back/parcel_registration/project_to_map/${fileId}?requestType=29`;
                     }
                     XMLDocReader.contentScript.util.readCheckedXML(fileId).then(async (r) => {
                        var file = new File([r.blob], r.filename);
                        await XMLDocReader.contentScript.util.read(file, async (t, a) => {
                           if (t.type != 'XML') {
                              XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", type: 'notify', data: {"error": 'Тип вибраного файлу не вiдповiдає формату XML !'} } );
                           } else if (XML = new XMLDocReader.classes.XMLClass()) {
                              var opt=[]; opt.isEditor = true; opt.filename = '';
                              var doc = XML.Read(a, opt), parcels = null, info = null;
                              await XMLDocReader.contentScript.util.checkFileIntersections({'file' : file, 'id': fileId}, async (result) => {
                                 if (doc) {
                                    for (var l in doc) {
                                       if (doc[l].type == 'Parcels') {
                                         parcels = doc[l];
                                         break;
                                    }}
                                    var info;
                                    if (parcels && parcels.properties && parcels.properties.UserInfo) {
                                       info = parcels.properties.UserInfo;
                                       await XMLDocReader.contentScript.util.saveInfoToStorage(info);
                                       await XMLDocReader.contentScript.util.getPageDataFromStorage().then( async (r) => {
                                          var fromStorage = r ?? false;
                                          await XMLDocReader.contentScript.util.setElementsCustomData(info, !fromStorage, true);
                                       });
                                    } else {
                                       XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", type: 'notify', data: {"alert": 'Блок даних користувача відсутній'} });
                                    }
                                 }
                              });
                           }
                        });
                     })
                  }
               }
            },
            divideParcelPage:{
               init: () => {
                  XMLDocReader.contentScript.util.storageContainerButtons(async r => {
                     XMLDocReader.log('XMLDocReader.contentScript.util.divideParcelPage (storageContainerButtons)');
                     await XMLDocReader.contentScript.util.collectDataFromPage();
                     XMLDocReader.log('XMLDocReader.contentScript.util.divideParcelPage (collectDataFromPage)');
                     await XMLDocReader.contentScript.util.getPageDataFromStorage().catch(e=>{XMLDocReader.log('.contentScript.divideParcelPage error', e)});
                     XMLDocReader.log('XMLDocReader.contentScript.util.divideParcelPage (getPageDataFromStorage)');

                     let element = document.getElementById('back_bundle_divide_parcel_form_type_xmlPackage');
                     if (!element) return;
                     element.addEventListener('change', XMLDocReader.contentScript.divideParcelPage.pageComplete, false);

                     // сторінка завантаження документації із землеустрою
                     let techDoc = document.getElementById('back_bundle_divide_parcel_form_type_techDoc');
                     if (!techDoc) return;
                     techDoc.addEventListener('change', XMLDocReader.contentScript.util.pdfPageAnalise, false);
                 });
               },
               pageComplete: (e) => {
                  e.preventDefault();
                  if (e.target.files.length != 0) {
                     XMLDocReader.contentScript.util.read(e.target.files[0], async (t, a) => {
                        if (t.type != 'XML') {
                           XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": (t.type !== 'Unknown' ? t.text : 'Тип вибраного файлу не вiдповiдає формату XML !') } } );
                        } else if (XML = new XMLDocReader.classes.XMLClass()) {
                           var opt=[]; opt.isEditor = true; opt.filename = '';
                           var doc = XML.Read(a, opt), parcels = null, info = null;
                           if (doc) {
                              for (var l in doc) {
                                 if (doc[l].type == 'Parcels') {
                                   parcels = doc[l];
                                   break;
                              }}
                              if (parcels && parcels.properties && parcels.properties.UserInfo) {
                                 var info = parcels.properties.UserInfo;
                                 await XMLDocReader.contentScript.util.saveInfoToStorage(info);
         
                                 await XMLDocReader.contentScript.util.getPageDataFromStorage().then( async (r) => {
                                    var fromStorage = r ?? false;

                                    await XMLDocReader.contentScript.util.setElementsCustomData(info, !fromStorage, true).then(r => { 
                                       if (r) {
                                          // пошук кадастрового номера ділянки
                                          XML.checkInObject(parcels.geometry.coordinates[0]).then( (a) => { 
                                             if (a.desc === 'information_available') {
                                                XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', data: {'alert': 'Знайдено перетин (співпадіння) з ділянкою:\r\n' + a.message } });
                                                XMLDocReader.contentScript.util.setInputMaskVal('back_bundle_divide_parcel_form_type_parcelForDivide', a.message);
                                             } else if (a.error)
                                                XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', data: {'alert': a.error } });
                                          } );
                                          // назва пакету
                                          document.getElementById('back_bundle_divide_parcel_form_type_packageName').value = info.user_lname + (info.type=='NaturalPerson'?' '+info.user_fname+' '+info.user_mname:'');
                                       } else {
                                          XMLDocReader.log('Виникла помилка виконання у функції "setElementsCustomData" (USER_INFO)');
                                          XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": 'Виникла помилка виконання у функції "setElementsCustomData" (USER_INFO)'} });
                                       }

                                    });
                                 });
                              } else {
                                 XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"alert": 'Блок даних користувача відсутній'} });
                              }
                           }
                        }
                     });
                  }
               }
            },
            errorCorrectionPage: {
               init: () => {
                  XMLDocReader.contentScript.util.storageContainerButtons(async r => {
                     XMLDocReader.log('XMLDocReader.contentScript.util (errorCorrectionPage)', r);
                     await XMLDocReader.contentScript.util.getPageDataFromStorage();
                     XMLDocReader.log('XMLDocReader.contentScript.util (getPageDataFromStorage)', r);

                     let element = document.getElementById('parcel_correction_xml');
                     if (!element) return;
                     element.addEventListener('change', XMLDocReader.contentScript.errorCorrectionPage.pageComplete, false);

                     // сторінка завантаження документації із землеустрою
                     let techDoc = document.getElementById('parcel_correction_techDoc');
                     if (!techDoc) return;
                     techDoc.addEventListener('change', XMLDocReader.contentScript.util.pdfPageAnalise, false);
                 });
               },
               pageComplete: (e) => {
                  e.preventDefault();
                  if (file_id = e.target.value) {
                     XMLDocReader.contentScript.util.readCheckedXML(file_id).then((r) => {
                        let file = new File([r.blob], r.filename);
                        XMLDocReader.contentScript.util.read(file, async (t, a) => {
                           if (t.type != 'XML') {
                              XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": 'Тип вибраного файлу не вiдповiдає формату XML !'} } );
                           } else if (XML = new XMLDocReader.classes.XMLClass()) {
                              var opt=[]; opt.isEditor = true; opt.filename = '';
                              var doc = XML.Read(a, opt), parcels = null, info = null; 
                              if (doc) {
                                 for (var l in doc) {
                                    if (doc[l].type == 'Parcels') {
                                      parcels = doc[l];
                                      break;
                                 }}
                                 var info;
                                 if (parcels && parcels.properties && parcels.properties.UserInfo) {
                                    info = parcels.properties.UserInfo;
                                    await XMLDocReader.contentScript.util.saveInfoToStorage(info);
                                    await XMLDocReader.contentScript.util.getPageDataFromStorage().then( async (r) => {
                                       var fromStorage = r ?? false;
                                       await XMLDocReader.contentScript.util.setElementsCustomData(info, !fromStorage, true);
                                    })
                                 } else {
                                    XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"alert": 'Блок даних користувача відсутній'} });
                                 }
                              }
                           }
                        });
                     })
                  }


               }
            },
            dzkObjectPage: {
               init: () => {
                  XMLDocReader.contentScript.util.storageContainerButtons(async r => {
                     XMLDocReader.log('XMLDocReader.contentScript.util (dzkObjectPage)', r);
                     await XMLDocReader.contentScript.util.getPageDataFromStorage();
                     XMLDocReader.log('XMLDocReader.contentScript.util (getPageDataFromStorage)', r);

                     let element = document.getElementById('dzk_o_requestType');
                     if (!element) return;
                     element.addEventListener('change', XMLDocReader.contentScript.dzkObjectPage.pageComplete, false);

                     // сторінка завантаження документації із землеустрою
                     let techDoc = document.getElementById('dzk_o_techDoc');
                     if (!techDoc) return;
                     techDoc.addEventListener('change', XMLDocReader.contentScript.util.pdfPageAnalise, false);
                 });
               },
               pageComplete: (e) => {
                  var observer = new MutationObserver(function( mutations ) {
                     observer.disconnect();
                     // сторінка завантаження документації із землеустрою
                     let techDoc = document.getElementById('dzk_o_techDoc');
                     if (!techDoc) return;
                     techDoc.addEventListener('change', XMLDocReader.contentScript.util.pdfPageAnalise, false);
                  });
                  observer.observe(document.getElementById('files'), { childList: true });
               }
            },
            xmlCheckPage: {
               init: () => {
                  let element = document.getElementById('check_xml_file');
                  if (!element) return;
                  element.addEventListener('change', XMLDocReader.contentScript.xmlCheckPage.pageComplete, false);
               },
               pageComplete: (e) => {
                  e.preventDefault();
                  if (e.target.files.length != 0) {
                     var file = e.target.files[0];
                     XMLDocReader.contentScript.util.read(e.target.files[0], function(t, a) {
                        if (t.type != 'XML') {
                           XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": 'Тип вибраного файлу не вiдповiдає формату XML !'} } );
                        } else if (XML = new XMLDocReader.classes.XMLClass()) {
                           try {
                              var opt=[]; opt.isEditor = true; opt.filename = '';
                              var doc = XML.Read(a, opt), parcels = null, info = null;
      
                              if (doc) {
                                 XMLDocReader.log(`Система координат: ${XML.coordsys.name} (${XML.coordsys.desc} id:${XML.coordsys.id}`);
                                 for (var l in doc) {
                                    if (doc[l].type == 'Parcels') {
                                      parcels = doc[l];
                                      break;
                                 }}
      
                                 if (parcels && parcels.properties) {
                                    var addr = parcels.properties.AD || "Default address";
                                    var size = parcels.properties.AS || "*";
                                    if (info = parcels.properties.UserInfo) {
                                       document.getElementById('check_xml_comment').value = info.user_lname + (info.type=='NaturalPerson'?' '+info.user_fname+' '+info.user_mname:'') + (addr?' (' + addr + (size?' - ' + size:'') + ')':'');
                                       XMLDocReader.contentScript.util.showmessage(info, []);
                                    } else {
                                       document.getElementById('check_xml_comment').value = addr?addr:'XML файл';
                                    }
                                 }
                              }
                           } catch (e) {
                              XMLDocReader.log("Error detail (2001): ", e);
                              XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": `Помилка при зчитуваннi файлу XML (код помилки 2001): ' ${e.message}` } } );
                           }
                        }
                     });
                  }
               }
            },
            findByCadaster: {
               init: () => {
                  let element = document.querySelector('.box-primary');
                  if (!element) return;
                  new MutationObserver((mutations, observer) => {
                     if (document.querySelector("div.box-footer>a[href*='/cadaster/coords/']")) {
                        observer.disconnect();
                        XMLDocReader.contentScript.findByCadaster.pageComplete();
                     }
                  }).observe(element,{childList: true});
               },
               pageComplete: async () => {
                  const jsonButton = document.querySelector("div.box-footer>a[href*='/cadaster/coords/']");
                  const pdfButton = document.querySelector("div.box-footer>a[href*='/cadaster/pdf/']");
                  if (!jsonButton) {
                     XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": 'function: findByCadaster. Помилка роботи додатку (можливо сторінку змінено).'} });
                     XMLDocReader.log('function: findByCadaster. Помилка роботи додатку (можливо сторінку змінено).');
                     return;
                  }
                  let codePage = XMLDocReader.codepage;
                  if (!codePage || (codePage!='Dos (866)' && codePage!='Win (1251)' && codePage!='Utf8 (65001)')) {
                     codePage = 'Utf8 (65001)';
                     await XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderSetOptions", key: 'codepage', value: codePage}).then(async (response)=>{await XMLDocReader.update(response);});
                  }

                  let dtTags = document.querySelectorAll('table.table td');
                  for (var i = 0; i < dtTags.length; i++) {
                     if (dtTags[i].innerHTML.trim() == 'Кадастровий номер земельної ділянки') {
                        let cnum = dtTags[i].nextElementSibling;
                        if (cnum.innerHTML.match(/\d{10}:\d{2}:\d{3}:\d{4}/)) {
                           let a = document.createElement('a');
                           a.href = jsonButton.href;
                           a.setAttribute('target', '_blank');
                           let i = document.createElement('i');
                           i.classList.add('fa', 'fa-map');
                           i.style.float = 'right';
                           a.appendChild(i);
                           cnum.appendChild(a);
                           a.onclick = (e) => {e.preventDefault(); if (e.currentTarget.nodeName !== 'A') return; XMLDocReader.contentScript.findByCadaster.viewMapButtonClick(e.currentTarget.href) };
                        }
                     }
                  }

                  jsonButton.id = 'jsonbtn';
                  let div = document.createElement('div');
                  div.style.cssText = 'position: relative;';
                  div.classList.add('btn', 'btn-primary', 'fancy', 'fancybox.ajax');
                  let a = document.createElement('a');
                  a.style.cssText = 'color: inherit;';
                  a.href = jsonButton.href;
                  a.id = 'in4btn';
                  a.innerHTML = 'Завантажити файл In4';
                  let select = document.createElement('select');
                  select.style.cssText = 'color: #444; font-size: 9px; font-weight: 700; position: relative; top: -8px;right: -10px;';
                  select.onchange = (e) => {
                     XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderSetOptions', key: 'codepage', value: values[e.target.value]}).then( (response)=>{XMLDocReader.update(response);});
                  };
                  var values = ['Dos (866)','Win (1251)','Utf8 (65001)'];
                  for (var value in values ) {
                     let option = document.createElement('option');
                     if (codePage === values[value]) option.setAttribute('selected', 'selected');
                     option.value = value;
                     option.text = values[value];
                     select.appendChild(option);
                  }
                  div.appendChild(a);
                  div.appendChild(select);
                  jsonButton.parentElement.appendChild(div);
                  a.addEventListener('click', XMLDocReader.contentScript.findByCadaster.in4ButtonClick, false);
                  jsonButton.addEventListener('click', XMLDocReader.contentScript.findByCadaster.jsonButtonClick, false);
                  if (pdfButton) pdfButton.addEventListener('click', XMLDocReader.contentScript.findByCadaster.pdfButtonClick, false);
               },
               in4ButtonClick: async (e) => {
                  e.preventDefault();
                  var html = document.body.innerHTML;
                  let parser = new XMLDocReader.classes.PageParser(html);
                  let json = await XMLDocReader.contentScript.findByCadaster.getJson(e.target.href);
                  json = (typeof json =='object') ? json : JSON.parse(json);
                  if (json) {
                     let cnum = parser.getCadastreNumber();
                     if (cnum) {
                        let fileName = `${cnum}.in4`;
                        parser.createIn4(json, XMLDocReader.codepage);
                        parser.saveToFile(fileName);
                     }
                  }
               },
               showJsonObjectOnMap: (url) => {
                  XMLDocReader.contentScript.findByCadaster.getJson(url).then(async (json) => {
                     try {
                        var jsonObj = (typeof json =='object') ? json : JSON.parse(json);
                        let XML = new XMLDocReader.classes.XMLClass();
                        const coords = jsonObj.coordinates;
                        let src = XML.getSK63ZoneProj4(coords[0][0][0][0]);
                        let dst = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs";

                        for (var i = 0; i < coords.length; i++) {
                          var jl = coords[i].length;
                          // jl = к-сть контурів
                          for (var j = 0; j < jl; j++) {
                            var kl = coords[i][j].length;
                            for (var k = 0; k < kl; k++) {
                               let point = proj4(src, dst, coords[i][j][k]);
                               coords[i][j][k][0] = point[0];
                               coords[i][j][k][1] = point[1];
                            }
                          }
                        }
                        let polygon = JSON.stringify(coords); // .join(',')
                        
                        let url = 'https://e.land.gov.ua/back/parcel_registration';
                        let headers = new Headers({'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 'Content-Type': 'text/html; charset=UTF-8'});
                        const response = await fetch(url, { method : 'GET', mode:'cors', credentials:'same-origin', headers : headers });
                        let html = await response.text();
                        let matches = html.match(/<select id="parcel_registration_xml".*?<option value="(?<id>[0-9a-f]{24})"/im);
                        if (matches?.groups?.id) {
                           const href = `https://e.land.gov.ua/back/parcel_registration/project_to_map/${matches.groups.id}?requestType=29&viewMode=1&polygon=${polygon}`;
                           window.open(href,'_blank');
                        }
                     } catch(error) {
                        throw error;
                     }
                  }).catch((e) => { XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": 'Помилка формування даних для перегляду ' + e.message} }); });
               },
               viewMapButtonClick: (href) => {
                  XMLDocReader.contentScript.findByCadaster.showJsonObjectOnMap(href);
               },
               pdfFileFormat: (url, html) => {
                  html = html.replace(/(?:\r\n|\r|\n)/g,'');
                  cnum = html.match(/<td\s*>\s*Кадастровий номер земельної ділянки\s*<\/td>\s*<td\s*>\s*(\d{10}:\d{2}:\d{3}:\d{4})/m)?.[1] || '';
                  XMLDocReader.contentScript.findByCadaster.getPdf(url).then((response) => {
                     var fname = cnum !== '' ? cnum.replace(/[^0-9]/g, '') : 'noname';
                     saveAs(new Blob([response], { type: 'application/pdf' }), fname + '.pdf');
                  })
               },
               // потрібно аналіз html, якщо запит зі списку !!!
               jsonFileFormat: (url, html) => {
                  html = html.replace(/(?:\r\n|\r|\n)/g,'');
                  cnum = html.match(/<td\s*>\s*Кадастровий номер земельної ділянки\s*<\/td>\s*<td\s*>\s*(\d{10}:\d{2}:\d{3}:\d{4})/m)?.[1] || '';
                  XMLDocReader.contentScript.findByCadaster.getJson(url).then((json) => {
                     try {
                        var jsonObj = (typeof json =='object') ? json : JSON.parse(json);
                        if (cnum !== '' && jsonObj && jsonObj.properties)
                            jsonObj.properties.cadnum = cnum;

                        var fname = cnum !== '' ? cnum.replace(/[^0-9]/g, '') : 'noname';
                        saveAs(new File(['\ufeff', JSON.stringify(jsonObj)], fname + '.json', {type:"text/plain;charset=utf-8"}));
                     } catch(error) {
                        throw error;
                     }
                  }).catch((e) => { XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": 'Помилка форматування вихідного файлу ' + e.message} }); });
               },
               pdfButtonClick: (e) => {
                  e.preventDefault();
                  var html = document.body.innerHTML;
                  XMLDocReader.contentScript.findByCadaster.pdfFileFormat(e.target.href, html);
               },
               jsonButtonClick: (e) => {
                  e.preventDefault();
                  var html = document.body.innerHTML;
                  XMLDocReader.contentScript.findByCadaster.jsonFileFormat(e.target.href, html);
               },
               getJson: async (u) => {
                  try {
                     let headers = new Headers({"Accept" : "application/json, text/javascript, */*; q=0.01"});
                     const response = await fetch(u, { method : 'GET', mode:'cors', credentials:'same-origin', headers : headers });
                     return await response.json();
                  } catch(error) {
                     throw error;
                  }
               },
               getPdf: async (u) => {
                  try {
                     let headers = new Headers({"Accept" : "application/pdf"});
                     const response = await fetch(u, { method : 'GET', mode:'cors', credentials:'same-origin', headers : headers });
                     return await response.blob();
                  } catch(error) {
                     throw error;
                  }
               }
            },
            util : {
               showmessage : (info, error) => {
                  var index = 0; // тип власника 0-фiзична/1-юридична особа
                  if (info.type === 'NaturalPerson') {
                     const isLive = info.user_document_type !== 'Свідоцтво про смерть';
                     XMLDocReader.log('Фiзична особа: ' + info.user_lname + ' ' + info.user_fname + ' ' + info.user_mname + ' phone:' + info.user_tel + (isLive ? ' IНН: ' + info.user_inn : '' ) +
                                 (isLive ? ' паспорт: ' : ' свідоцтво про смерть: ') + info.user_document_series + ' ' + info.user_document_number + ' вiд ' + info.user_document_dateIssue + '\r\n[' + error.join(', ') + ']');
                     if (isLive) {
                        XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", type: 'message', data: {"utype": index, "uname": info.user_lname + ' ' + info.user_fname + ' ' + info.user_mname, "uinn": info.user_inn, "uaddr": info.user_address, "uowner": true} },
                           function(response){
                              if (error.length > 0) XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", type: 'notify', data: {"alert": error.join('\r\n')} });
                           }
                        );
                     } else {
                        XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", type: 'message', data: {"utype": index, "uname": info.user_lname + ' ' + info.user_fname + ' ' + info.user_mname, "uowner": false} },
                           function (response) {
                              if (error.length > 0) XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", type: 'notify', data: {"alert": error.join('\r\n')} });
                           } 
                        );
                     }
                  } else {
                     index = 1;
                     XMLDocReader.log('Юридична особа: ' + info.user_lname + ' ЕДРПОУ: ' + info.user_inn);
                     XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", type: 'message', data: {"utype": index, "uname": info.user_lname, "uinn": info.user_inn, "uaddr": info.user_address, "uowner": true} },
                        function(response){
                           if (error.length) XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", type: 'notify', data: {"alert": error.join('\r\n')} });
                        }
                     );
                  }
               },
               readCheckedXML: async (id) => {
                  function getFilename (str) {
                     var result = "noname.xml.p7s";
                     if (xmatch = str.match(/filename[^;=\n]*=(?:utf-8'')([^;\n'"]*)/im))         result = xmatch[1];
                     else if (xmatch = str.match(/filename[^=]*=(['"])([^\1]*)\1/im))   result = xmatch[2];
                     return result;
                  }
                  let headers = new Headers({"Accept" : "*/*", "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0" });
                  const response = await fetch('https://e.land.gov.ua/back/check_xml/dovload_file/' + id, { method : 'GET', mode:'cors', credentials:'same-origin', headers : headers });
                  const header = response.headers.get('Content-Disposition');
                  var fname = getFilename(header);
                  const blob = await response.blob();
                  return {"filename" : fname, "blob" : blob};
               },
               pdfPageAnalise: async (e) => {
                  e.preventDefault();
                  if (e.target.files.length != 0) {
                     let parent = e.target;
                     await XMLDocReader.contentScript.util.read(e.target.files[0], function(t, a) {
                        if (t.type != 'PDF') {
                           XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", type: 'notify', data: {"error": 'Тип вибраного файлу не вiдповiдає формату PDF !'} } );
                        } else {
                           try {
                              var pages = 0;
                              if (pages = a.match(/\/Type\s+\/Pages(?:[\s\S]*)\/Count\s+(\d+)/im))
                                 pages = pages[1];
                              else pages = a.match(/\/Type[\s]*\/Page[^s]/gim)?.length || 0;
                              if (pages>0) {
                                 switch(parent.id) {
                                    case  'parcel_registration_techDoc': break;
                                    case  'document_approve_techDoc': document.getElementById('document_approve_numberSheets').value = pages; break;
                                    case  'back_bundle_divide_parcel_form_type_techDoc': break;
                                 }
                              }
                              XMLDocReader.browser.runtime.sendMessage({message: "PDFfile", data: {"pages": pages, "size": a.length} } );
                              XMLDocReader.log(`.pdfPageAnalise Total pages: ${pages}`);
                           } catch(e) {  
                              XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", type: 'notify', data: {"alert": `Помилка читання файлу PDF: ${e.message}`} });
                              XMLDocReader.log('.pdfPageAnalise File read error', e);
                           }
                        }
                     });
                  }
               },
               checkFileIntersections: (fileStruct, callback) => {
                  var XML = this.XML || null;
                  // пошук пересічення за ідентифікатором файлу (сторінка реєстрації земельної ділянки)
                  function standardCheck (callback) {
                     if (fileID = fileStruct.id) {
                        try {
                           var _tokenE = document.getElementById('parcel_registration__token');
                           if (_tokenE) {
                              const t = _tokenE.value;
                              var formData = new FormData();
                              formData.append('parcel_registration[xml]', fileID);
                              formData.append('parcel_registration[requestType]', '28');
                              formData.append('action', 'modify');
                              formData.append('parcel_registration[_token]', t);
                              // посилаємо повідомлення для отримання токену
                              window.postMessage({message: 'XDR_RECAPTCHA_GET', action: 'parcel_registration_modify'}, '*');
                              window.addEventListener('XDR_RECAPTCHA_TOKEN', function getMessage (e) {
                                 window.removeEventListener('XDR_RECAPTCHA_TOKEN', getMessage, false);
                                 formData.append('parcel_registration[recaptcha]', "parcel_registration_modify;" + e.detail.token);
                                 async function intersectionInfoGet() {
                                    let headers = new Headers({"Accept" : "*/*", 
                                                    "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0", 
                                                    "X-Requested-With"  : "XMLHttpRequest"
                                    });
                                    const response = await fetch('https://e.land.gov.ua/back/parcel_registration', { method: 'POST', body: formData , mode:'cors', credentials:'same-origin', headers: headers } );
                                    if (response.status === 400) {
                                       return await response.json();
                                    } else {
                                       return await response.text();
                                    }
                                 }
                                 intersectionInfoGet().then(s => {
                                    if (typeof s == 'object') {
                                       if (s.errors) {
                                          XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', type: 'notify', data: {'alert': s.errors.join()} });
                                          callback(true);
                                       } else
                                          callback(false);
                                    } else {
                                       var t = s.match(/name="parcel_registration\[parcelsForUnion\]\[\]" value="([^"]*)"\s*\/>\s*([^<]*)/ig);
                                       if (t && t.length>0) {
                                          var a = [];
                                          t.forEach(function(e) { 
                                             var c = e.match(/name="parcel_registration\[parcelsForUnion\]\[\]" value="([^"]*)"\s*\/>\s*([^<]*)/im);
                                             if (c.length===3) {
                                                var p = c[2].match(/(\d+\.)?\d+\%/im);
                                                // a[c[1]] = (p&&p[0])?p[0]:'error';
                                                a.push(c[1] + ((p&&p[0])?' ('+p[0]+')':'error') );
                                             }
                                          });
                                          XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', type: 'notify', data: {'alert': 'Знайдено перетин з ділянк' + (a.length==1?'ою':'ами') + ':\r\n' + a.join('\r\n') } }); // ('наступн' + (a.length==1?'ою':'ими') )
                                          callback(true);
                                       } else
                                          callback(false);
                                    }
                                 });
                           
                              }, false);
                           } else {
                              XMLDocReader.log('Error parsing page "https://e.land.gov.ua/back/parcel_registration"');
                              callback(false);
                           }
                        } catch(e) {
                           callback(false);
                        }
                     } 
                  }
                  // пошук пересічення в середині контуру (опція додатку)
                  async function addonCheck() {
                     try {
                        // пошук кадастрового номера ділянки
                        var doc = XML.Polygons || null, parcels = null;
                        if (XML && doc) {
                           for (var l in doc) {
                              if (doc[l].type == 'Parcels') {
                                parcels = doc[l];
                                break;
                           }}
                           if (parcels)  {
                              XML.checkInObject(parcels.geometry.coordinates[0]).then( (a) => {
                                 if (a.desc === 'information_available')
                                    XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', type: 'notify', data: {'alert': 'Знайдено перетин (співпадіння) з ділянкою:\r\n' + a.message } });
                                 if (a.desc === 'no_information_available')
                                    XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', type: 'notify', data: {'alert': 'Перетинів з ділянками не знайдено.' } });
                                 else if (a.error)
                                    XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', type: 'notify', data: {'alert': a.error } });
                              });
                           }
                        }
                        return true;
                     } catch(e) {
                        return false;
                     }
                  }
                  standardCheck((r1)=>{ if (!r1) addonCheck(); callback(true); });
               },
               getPref : (options={}) => {
                  const type = options.type ?? 'default';
                  return (window.location.href.startsWith('https://e.land.gov.ua/back/parcel_registration') ? 'parcel_registration' : 
                         (window.location.href.startsWith('https://e.land.gov.ua/back/divide_parcel') ? (type !== 'pagename' ? 'back_bundle_divide_parcel_form_type' : 'divide_parcel') : 
                         (window.location.href.startsWith('https://e.land.gov.ua/back/parcel_error_correction') ? 'parcel_correction' : 
                         (window.location.href.startsWith('https://e.land.gov.ua/back/dzk_object') ? (type !== 'pagename' ? 'dzk_o' :'parcel_information') : 
                         (window.location.href.startsWith('https://e.land.gov.ua/back/requests') ? 'request_excerpt' : null) ) ) ) );
               },
               // запис масиву 'info', отриманого з вхідного файлу до сховища (в тимчасову змінну 'def_userdata')
               saveInfoToStorage: async (info, page_name = null) => {
                  page_name = page_name ?? XMLDocReader.contentScript.util.getPref();
                  if (!page_name) return;
                  var jsonS = {}, jsonP = {};
                  jsonP.name = page_name;
                  jsonS.active     = true;
                  jsonS.user_type  = info.type === 'NaturalPerson' ? 0 : 1;
                  if (jsonS.user_type == 0) {
                     jsonS.user_lname      = info.user_lname;
                     jsonS.user_fname      = info.user_fname;
                     jsonS.user_mname      = info.user_mname;
                     jsonS.user_inn        = info.user_inn;
                     jsonS.user_addr       = info.user_address;
                     jsonS.user_tel        = info.user_tel;
                     jsonS.doc_type        = info.user_document_number.length === 6 ? 0 : 1;
                     jsonS.document_series = info.user_document_series;
                     jsonS.document_number = info.user_document_number;
                     jsonS.document_date   = info.user_document_dateIssue;
                  } else {
                     jsonS.user_lname = info.user_lname;
                     jsonS.user_inn   = info.user_inn;
                     jsonS.user_addr  = info.user_address;
                     jsonS.user_tel   = info.user_tel;
                  }
                  jsonP.def_userdata = jsonS;
                  await XMLDocReader.contentScript.util.storageSetValue( jsonP );
               },

               storageContainerButtons: (callback) => {
                  let storageContainerButtonAdd = (target, boxId) => {
                     // заповнюємо поле з номером телефону
                     let phone = document.getElementById(pref + '_type_user_tel');
                     if (phone) { 
                        phone.value = XMLDocReader.userinfo.phone || '';
                        phone.dispatchEvent(new Event('input', {bubbles:true}));
                     }
                     const mainDiv = document.getElementById( boxId );
                     if (target && !mainDiv) {
                        let addDiv = (cBoxId) => {
                           var result = {};
                           var divItem  = document.createElement('div');
                           var cboxItem = document.createElement('input');
                           cboxItem.id  = cBoxId;
                           cboxItem.type = 'checkbox';
                           cboxItem.onchange = (e) => {
                              XMLDocReader.contentScript.util.dataStorageSave(e).then(r => {
                                 reloadItem.disabled = e.target.checked;
                                 if (e.target.checked) {
                                    e.target.nextSibling.firstElementChild.src = XMLDocReader.browser.runtime.getURL('src/images/locked-icon_24.png');
                                 } else {
                                    e.target.nextSibling.firstElementChild.src  = XMLDocReader.browser.runtime.getURL('src/images/unlock-icon_24.png');
                                 }
                              });
                           }
                           cboxItem.style.display = 'none';
                           divItem.append(cboxItem);
                        
                           var cboxItemLabel  = document.createElement('label');
                           cboxItemLabel.style.cssText = 'float: left; cursor:pointer;';
                           cboxItemLabel.setAttribute('for', cBoxId);
                           cboxItemLabel.style.marginRight = '5px';
                           var iLabelImg  = document.createElement('img');
                           iLabelImg.src  = XMLDocReader.browser.runtime.getURL('src/images/unlock-icon_24.png');
                           cboxItemLabel.appendChild(iLabelImg);
                           divItem.append(cboxItemLabel);
                        
                           var reloadItem  = document.createElement('input');
                           reloadItem.type = 'image';
                           reloadItem.src  = XMLDocReader.browser.runtime.getURL('src/images/reload-icon_24.png');
                           divItem.append(reloadItem);
                     
                           reloadItem.addEventListener('click', (e) => {
                              e.preventDefault();
                              let page_name = XMLDocReader.contentScript.util.getPref({type: 'pagename'});
                              let t = e.target.parentElement?.firstChild?.id;
                              let name = t ==='user_choice_item'?'def_userdata':t==='regn_choice_item'?'def_cnapdata':null;
                              if (!name) return;
                              let page = XMLDocReader.contentScript.util.getPage(page_name);
                              if (page && page[name]) {
                                  XMLDocReader.contentScript.util.pageDataUpdate(page[name]);
                              }
                           }, false);
                     
                           result.loaded    = false;
                           result.container = divItem;
                           result.choice    = cboxItem;
                           result.refresh   = reloadItem;
                           return result;
                        }
                        
                        if (target.parentElement && target.previousElementSibling) {
                           var box = addDiv( boxId );
                           target.parentElement.insertBefore(box.container, target.previousElementSibling);
                           return box;
                        }
                     } else if (mainDiv) {
                        var result = {};
                        result.loaded     = true;
                        result.container  = mainDiv.parentElement;
                        result.choice     = mainDiv;
                        result.refresh    = mainDiv.nextSibling.nextSibling;
                        return result;
                     }
                     return null;
                  }
                  const pref = XMLDocReader.contentScript.util.getPref();
                  // панель над заявником
                  var user_choice = document.getElementById(`${pref}_type_user_choice`);
                  var user_choice_box = storageContainerButtonAdd(user_choice, 'user_choice_item');
                  var user_profile = document.getElementById('user_profile');
                  if (user_profile) {
                     var observer = new MutationObserver(function( mutations ) {
                        var user_choice = document.getElementById(`${pref}_type_user_choice`);
                        var regn_choice = document.getElementById(`${pref}_region`);
                        storageContainerButtonAdd(user_choice, 'user_choice_item');
                        if (regn_choice) storageContainerButtonAdd(regn_choice, 'regn_choice_item');
                     });
                     observer.observe(user_profile, { childList: true });
                  }
                  // панель над ЦНАП
                  var regn_choice = document.getElementById(`${pref}_region`);
                  var regn_choice_box = storageContainerButtonAdd(regn_choice, 'regn_choice_item');
                  callback({'user_box' : user_choice_box, 'cnap_box' : regn_choice_box});
               },
               // формування даних сторінки для запису до сховища
               dataStorageSave : async (e) => {
                  var pref = '',
                  markAsReadOnly = (e, mode) => {
                     var isHidden = (el) => { var style = window.getComputedStyle(el); return ((style.display === 'none') || (style.visibility === 'hidden')) };
                     var pref = XMLDocReader.contentScript.util.getPref();
            
                     if (pref) {
                        if (e.target.id == 'user_choice_item') {
                           var user_choice = document.getElementById(`${pref}_type_user_choice`);
                           user_choice.style.backgroundColor = (mode ? '#eee' : '');
                           XMLDocReader.contentScript.util.setSelectOptionsIdx(`${pref}_type_user_choice`, user_choice.selectedIndex, (mode ? false : true));
                           
                           var container = document.querySelector('div[id="user_profile"]');
                           // блокуємо select (поле тип документу)
                           var sel = document.getElementById(`${pref}_type_user_type_document`);
                           if (sel) { 
                              XMLDocReader.contentScript.util.setSelectOptionsIdx(`${pref}_type_user_type_document`, sel.selectedIndex);
                              sel.style.backgroundColor = (mode ? '#eee' : '');
                           }
                           var divs = container.querySelectorAll('div > input,textarea');
                           for (var i = 0; i < divs.length; i++) {
                             divs[i].style.backgroundColor = (mode ? '#eee' : '');
                             divs[i].readOnly = (mode ? true : false);
                           }
                        } else if (e.target.id == 'regn_choice_item') {
                           var regn_choice = document.getElementById(`${pref}_region`);
                           var cnap_choice = document.getElementById(`${pref}_cnap`);
                           regn_choice.style.backgroundColor = (mode ? '#eee' : '');
                           cnap_choice.style.backgroundColor = (mode ? '#eee' : ''); 
                           XMLDocReader.contentScript.util.setSelectOptionsIdx(`${pref}_region`, regn_choice.selectedIndex, (mode ? false : true) );
                           XMLDocReader.contentScript.util.setSelectOptionsIdx(`${pref}_cnap`, cnap_choice.selectedIndex, (mode ? false : true) );
                        }
                     }
                  }
            
                  try {
                     if (e.target.id == 'user_choice_item') {
                        if (e.target.checked) {
                           // перевірка сторінки на помилки
                           if (XMLDocReader.contentScript.util.checkPageErrors(e)) {
                              e.target.checked = !e.target.checked;
                              return false;
                           }
                           XMLDocReader.contentScript.util.collectDataFromPage({'default' : false, 'collectdata' : ['user'], 'active': true });
                           markAsReadOnly(e, true);
                        } else {
                           XMLDocReader.contentScript.util.collectDataFromPage({'default' : false, 'collectdata' : ['user'], 'active': false });
                           markAsReadOnly(e, false);
                        }
                        return true;
                     } else if (e.target.id == 'regn_choice_item') {
                        if (e.target.checked) {
                           // перевірка сторінки на помилки
                           if (XMLDocReader.contentScript.util.checkPageErrors(e)) {
                              e.target.checked = !e.target.checked;
                              return false;
                           }
                           XMLDocReader.contentScript.util.collectDataFromPage({'default' : false, 'collectdata' : ['cnap'], 'active': true });
                           markAsReadOnly(e, true);
                        } else {
                           XMLDocReader.contentScript.util.collectDataFromPage({'default' : false, 'collectdata' : ['cnap'], 'active': false });
                           markAsReadOnly(e, false);
                        }
                        return true;
                     }
                  } catch (err) {
                     XMLDocReader.log ('.util.dataStorageSave Помилка збереження даних: ', err);
                  }
               },
               // 'груба' перевірка сторінки на наявність пустих даних (input, select, textarea)
               checkPageErrors: (e) => {
                  var err  = false,
                      pref = XMLDocReader.contentScript.util.getPref(),
                      isHidden = (el) => { var style = window.getComputedStyle(el); return ((style.display === 'none') || (style.visibility === 'hidden')) };
            
                  if (pref) {
                     if (e.target.id == 'user_choice_item') {
                        var user_profile = document.getElementById("user_profile");
                        var elem = user_profile.querySelectorAll('div[id="user_profile"] > div[class="form-group"] > select[required="required"],textarea[required="required"]:not([id="parcel_correction_additionalInfo"]),input[id^="' + pref + '"][required="required"]:not([type="hidden"])');
                        for (var i = 1; i < elem.length; i++) {
                           if (!isHidden(elem[i])) {
                              (elem[i].value == '') ? elem[i].parentElement.classList.add('has-error') : elem[i].parentElement.classList.remove('has-error');
                              if (elem[i].value == '' && !err) err = true;
                           }
                        }
                     } else if (e.target.id == 'regn_choice_item') {
                        var regn_choice = document.getElementById(pref + '_region');
                        var cnap_choice = document.getElementById(pref + '_cnap');
                        regn_choice.selectedIndex == 0 ? regn_choice.parentElement.classList.add('has-error') : regn_choice.parentElement.classList.remove('has-error');
                        cnap_choice.selectedIndex == 0 ? cnap_choice.parentElement.classList.add('has-error') : cnap_choice.parentElement.classList.remove('has-error');
                        if (regn_choice.selectedIndex == 0 || cnap_choice.selectedIndex == 0) 
                           err = true;
                     }
                  }  
                  return err;
               },
               // ф-ція збереження даних сторінки до сховища
               collectDataFromPage: async (options) => {

                  // значення за замовчуванням у разі відсутності даних параметра
                  options = (typeof options !== 'undefined') ? options : {};
                  options.active = (typeof options.active !== 'undefined') ? options.active : true;
                  options.default = (typeof options.default !== 'undefined') ? options.default : true;
                  options.collectdata = options.collectdata ? options.collectdata : ['user', 'cnap'];
                  // перевірка коректності вхідних даних
                  if (options.collectdata.length > 2 || ( (options.collectdata.length == 2) &&  (options.collectdata[0] === options.collectdata[1] || 
                       (options.collectdata[0].toLowerCase() != 'user' && options.collectdata[1].toLowerCase() != 'user') ||
                       (options.collectdata[0].toLowerCase() != 'cnap' && options.collectdata[1].toLowerCase() != 'cnap') ) ) || 
                       ( options.collectdata.length == 1 && options.collectdata[0].toLowerCase() != 'user' && options.collectdata[0].toLowerCase() != 'cnap') ) {
                     XMLDocReader.log('.util.collectDataFromPage Options parameters error:', options);
                     return;
                  }
            
                  const pref = XMLDocReader.contentScript.util.getPref();
                  const page_name = XMLDocReader.contentScript.util.getPref({type: 'pagename'});
                  if (page_name) {
                     // блок користувача
                     if (options.collectdata.includes('user')) {
                        XMLDocReader.log(`.collectDataFromPage Collect USER data from page "${page_name}" to ${options.default ? 'default' : 'main'} storage`);
                        var user_choice = document.getElementById(pref + '_type_user_choice');
                        if (user_choice) {
                           var jsonS = {}, jsonP = {};
                           jsonP.name = page_name;
                        
                           jsonS.active          = options.active;
                           jsonS.user_type  = user_choice.selectedIndex;
                           if (user_choice.selectedIndex == 0) {   // фізична особа
                              jsonS.user_lname      = document.getElementById(pref + '_type_user_lname').value;
                              jsonS.user_fname      = document.getElementById(pref + '_type_user_fname').value;
                              jsonS.user_mname      = document.getElementById(pref + '_type_user_mname').value;
                              jsonS.user_inn        = document.getElementById(pref + '_type_user_inn').value;
                              jsonS.user_addr       = document.getElementById(pref + '_type_user_address').value;
                              jsonS.doc_type        = document.getElementById(pref + '_type_user_type_document').selectedIndex;
                              jsonS.document_series = jsonS.doc_type == 0 ? document.getElementById(pref + '_type_user_document_series').value : '';
                              jsonS.document_number = document.getElementById(pref + '_type_user_document_number').value;
                              jsonS.document_date   = document.getElementById(pref + '_type_user_document_dateIssue').value;
                           } else { // юридична особа
                              jsonS.user_lname = document.getElementById(pref + '_type_user_orgName').value;
                              jsonS.user_inn   = document.getElementById(pref + '_type_user_edrpou').value;
                              jsonS.user_addr  = document.getElementById(pref + '_type_user_address').value;
                           }
                           jsonP[options.default ? "def_userdata" : "userdata"] = jsonS;
                           await XMLDocReader.contentScript.util.storageSetValue( jsonP );
                        }
                     }
                     // блок ЦНАП
                     if (options.collectdata.includes('cnap')) {
                        XMLDocReader.log(`.collectDataFromPage Collect CNAP data from page "${page_name}" to ${options.default ? 'default' : 'main'} storage`);
                        var regn_choice = document.getElementById(pref + '_region');
                        var cnap_choice = document.getElementById(pref + '_cnap');
                        if (regn_choice && cnap_choice) {
                           var jsonS = {}, jsonP = {};
                           jsonP.name = page_name;
                           jsonS.active = options.active;
                           jsonS.region = regn_choice.selectedIndex;
                           jsonS.cnap   = cnap_choice.selectedIndex;
                           jsonS.region_text = regn_choice.options[regn_choice.selectedIndex].text;
                           jsonS.cnap_text   = cnap_choice.options[cnap_choice.selectedIndex].text;
                           jsonP[options.default ? "def_cnapdata" : "cnapdata"] = jsonS;
                           await XMLDocReader.contentScript.util.storageSetValue( jsonP );
                        }
                     }
                  }
               },
               storageSetValue: async (data) => {
                  let f = false;
                  for (var key in XMLDocReader.usersection.pagesStoreData) {
                     if (XMLDocReader.usersection.pagesStoreData[key].name === data.name) {
                        XMLDocReader.usersection.pagesStoreData[key] = {...XMLDocReader.usersection.pagesStoreData[key], ...data};
                        f = true; break;
                     }
                  }

                  if (!f) {
                     if (typeof XMLDocReader.usersection.pagesStoreData !== 'object') XMLDocReader.usersection.pagesStoreData = [];
                     XMLDocReader.usersection.pagesStoreData.push(data);
                  }
                  await XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderSetOptions", key: 'usersection', value: XMLDocReader.usersection } ).then((response)=>{XMLDocReader.update(response);});
               },
               requestState: async (elm, event_box) => {
                  return await new Promise((res, rej) => {
                     if (elm === 'skip request') { return res(true); }
                     var element = document.getElementById(elm);
                     var container = document.getElementById(event_box);
                     if (!container || !element) {return res(false); }
                     var observer = new MutationObserver(( mutations ) => {
                        clearTimeout(timeoutId);
                        observer.disconnect();
                        return res(true);
                     });
               
                     let timeoutId = setTimeout(()=>{ XMLDocReader.log('.requestState timeout 3000ms'); observer.disconnect(); res(false); }, 3000);
                     observer.observe(container, {childList: true, characterData: true });
                     // викликаємо подію regn_choice для оновлення cnap_choice
                     element.dispatchEvent(new Event('change', {bubbles:true})); // , {bubbles:true}
                  })
               },
               // ф-цiя присвоєння текстових даних елементу
               setInputMaskVal: (elemId, value) => {
                  var element = document.getElementById(elemId);
                  if (!element) return;
                  element.value = value;
                  element.selectionStart = element.selectionEnd = element.value.length;
               
                  var event  = new Event('input', {bubbles:true});
                  element.dispatchEvent(event);
               },
               // заповнення елементів сторінки даними користувача
               setElementsCustomData: async (info, elementsSet, dataCheck) => {
                  var pref = XMLDocReader.contentScript.util.getPref();
                  if (!pref) {
                     XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', data: {'error': 'Помилка виконання функції "setElementsCustomData": сторінку для обробки не знайдено'} });
                     return false;
                  }
                  var index = info.type === 'NaturalPerson' ? 0 : 1;
                  var parcel_type = document.getElementById(pref + '_type_user_choice');
                  if (parcel_type) {
                     if (elementsSet) parcel_type.selectedIndex = index;
                     if (await XMLDocReader.contentScript.util.requestState(elementsSet ? pref + '_type_user_choice' : 'skip request', 'user_profile')) {
                        var error = [];
                        if (info.type === 'NaturalPerson') {
                           const isLive = info.user_document_type !== 'Свідоцтво про смерть';
                           if (isLive) {
                              if (elementsSet) {
                                 XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_lname',   info.user_lname);
                                 XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_fname',   info.user_fname);
                                 XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_mname',   info.user_mname);
                                 XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_address', info.user_address);
                                 XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_inn',     info.user_inn);
                              }
                              // перевiрка паспортних даних, iнакше помилка
                              if (info.user_document_number && (info.user_document_number.length == 6 || info.user_document_number.length == 9)){
                                 var indexDocType = info.user_document_number.length === 6 ? 0 : 1;
                                 if (elementsSet) document.getElementById(pref + "_type_user_type_document").selectedIndex = indexDocType;
                                 if (await XMLDocReader.contentScript.util.requestState(elementsSet ? pref + '_type_user_type_document' : 'skip request', 'user_document')) {
                                    if (indexDocType == 0) // серiя тiльки для паспорту громадянина України
                                       if (elementsSet) XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_document_series', info.user_document_series);
                                    
                                    if (elementsSet) XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_document_number', info.user_document_number);
                                    if (elementsSet) XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_document_dateIssue', info.user_document_dateIssue);
                                    
                                    if (dataCheck) XMLDocReader.contentScript.util.showmessage(info, error);
                                    return true;
                                 } else {
                                    XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": 'Помилка заповнення даних документу. Можливо сторінку змінено чи немає зв\'язку з сайтом. Спробуйте оновити сторінку.'} });
                                    XMLDocReader.log('function: util.setElementsCustomData(requestState 2). Помилка заповнення даних документу. Можливо сторінку змінено чи немає зв\'язку з сайтом. Спробуйте оновити сторінку.');
                                    return false;
                                 }

                              } else {
                                 if (error.indexOf('Номер паспорта') == -1) error.push('Номер паспорта');
                                 if (dataCheck) XMLDocReader.contentScript.util.showmessage(info, error);
                                 return false;
                              }
                           } else {  // спадкоємець
                              if (dataCheck) XMLDocReader.contentScript.util.showmessage(info, error);
                              return true;
                           }
            
                        } else {
                           // обробка помилок файлу
                           if (dataCheck) if (/^\d{8}$/.test(info.user_inn) === false) error.push('Код ЕДРПОУ');
                           if (elementsSet) {
                              XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_orgName', info.user_lname);
                              XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_edrpou',  info.user_inn);
                              XMLDocReader.contentScript.util.setInputMaskVal(pref + '_type_user_address', info.user_address);
                           }
                           if (dataCheck) {
                              if (info.user_lname   == '') error.push('Назва організації');
                              if (info.user_inn     == '') error.push('Код ЕДРПОУ');
                              if (info.user_address == '') error.push('Адреса');
                              XMLDocReader.contentScript.util.showmessage(info, error);
                           }
                           return error.length===0 ? true : false;
                        }
                     } else {
                        XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": 'Помилка заповнення даних документу. Можливо сторінку змінено чи відсутній зв\'язок з кабінетом. Спробуйте оновити сторінку.'} });
                        XMLDocReader.log('function: util.setElementsCustomData(requestState 1). Помилка заповнення даних документу. Можливо сторінку змінено чи немає зв\'язку з сайтом. Спробуйте оновити сторінку.');
                        return false;
                     }
                  }
            
               },
               pageDataUpdate: async (data, lockButton=false) => {
                  let userSection = (typeof data.user_type !== 'undefined') ? true : false;
                  if (userSection) {
                     let info = {
                        type: data.user_type === 0 ? 'NaturalPerson' : 'LegalEntity',
                        user_lname: data.user_lname, user_fname: data.user_fname, user_mname: data.user_mname,
                        user_address: data.user_addr,
                        user_inn: data.user_inn,
                        doc_type: data.doc_type,
                        user_document_number: data.document_number,
                        user_document_series: data.document_series,
                        user_document_dateIssue: data.document_date}

                     if (await XMLDocReader.contentScript.util.setElementsCustomData (info, true, false) && lockButton) {
                        var user_choice_item_btn = document.getElementById('user_choice_item');
                        user_choice_item_btn.checked = true;
                        user_choice_item_btn.dispatchEvent(new Event("change", {bubbles:true}));
                     }
                  } else {
                     var pref = XMLDocReader.contentScript.util.getPref();
                     var regn_choice = document.getElementById(pref + '_region');
                     var cnap_choice = document.getElementById(pref + '_cnap');
                     regn_choice.selectedIndex = data.region;
                     cnap_choice.selectedIndex = data.cnap;
                  }
               },
               getPage: (name)=> {
                  for (var key in XMLDocReader.usersection.pagesStoreData) {
                     let page = XMLDocReader.usersection.pagesStoreData[key];
                     if (page.name === name) return page;
                  }
                  return null;
               },
               getPageDataFromStorage: async (requestTypeChecked=false) => {
                  try {
                     var jsonO = [];
                     const pref = XMLDocReader.contentScript.util.getPref();
                     const page_name = XMLDocReader.contentScript.util.getPref({type: 'pagename'});
                     if (typeof XMLDocReader.usersection.pagesStoreData !== 'object') XMLDocReader.usersection.pagesStoreData = [];
                     let isPageActive = false;
                     
                     let page = XMLDocReader.contentScript.util.getPage(page_name);
                     if (page) {
                        if (!requestTypeChecked) {
                           let userAccept = document.getElementById(`${pref}_type_user_accept`);
                           if (userAccept) {
                              userAccept.checked = page.userAccept ?? false;
                              userAccept.onclick=async(e)=>{
                                 const page_name=XMLDocReader.contentScript.util.getPref({type:'pagename'});let page=XMLDocReader.contentScript.util.getPage(page_name);if(page){page.userAccept = userAccept.checked;await XMLDocReader.contentScript.util.storageSetValue(page);}
                              }
                           }

                           let transmitAs = document.getElementById(`${pref}_transmitAs`) || document.getElementById(`${pref}_transmit_as`);
                           if (transmitAs) {
                              transmitAs.onclick=async(e)=>{
                                 let transmitAsChecked = e.target.querySelector(`input`);
                                 if (transmitAsChecked) {
                                    const page_name=XMLDocReader.contentScript.util.getPref({type:'pagename'});
                                    let page=XMLDocReader.contentScript.util.getPage(page_name);
                                    if(page){page.transmitAs=transmitAsChecked?.value||1;await XMLDocReader.contentScript.util.storageSetValue(page);} 
                                 }
                              }
                              const val = page.transmitAs ?? 1;
                              let transmitAsChecked = transmitAs.querySelector(`input[value='${val}']`);
                              if (transmitAsChecked) {
                                 transmitAsChecked.checked = true; 
                                 transmitAsChecked.dispatchEvent(new Event('change', {bubbles:true}))
                              };
                           }
                        }

                        let updateUserInfo = async () => {
                           if (page.userdata && page.userdata.active) {
                              await XMLDocReader.contentScript.util.pageDataUpdate(page.userdata, true);
                              isPageActive = true;
                           } else {
                              document.getElementById(pref + '_type_user_email').value = XMLDocReader.userinfo.email || '';
                              let phone = document.getElementById(pref + '_type_user_tel');
                              phone.value = XMLDocReader.userinfo.phone || '';
                              phone.dispatchEvent(new Event('input', {bubbles:true}));
                           }
                        }

                        let updateCnapInfo = (r) => {
                           let regn_choice = document.getElementById(pref + '_region');
                           let cnap_choice = document.getElementById(pref + '_cnap');
                           let regn_choice_item_btn = document.getElementById('regn_choice_item');
                           if (!page.cnapdata || !page.cnapdata.active || !regn_choice || !cnap_choice || !regn_choice_item_btn) return;

                           regn_choice_item_btn.checked = false;
                           regn_choice.selectedIndex = page.cnapdata.region;
                           let cObserver = new MutationObserver(function( mutations ) {
                              cObserver.disconnect();
                              cnap_choice.selectedIndex = page.cnapdata.cnap;
                              var errorId = false;
                              if (regn_choice.options[regn_choice.selectedIndex].text != page.cnapdata.region_text || cnap_choice.options[cnap_choice.selectedIndex].text != page.cnapdata.cnap_text) {
                                 XMLDocReader.browser.runtime.sendMessage({message: 'XMLDocReaderNotify', data: {'error': 'Змінено порядковість відображення даних або назву територіального підрозділу ЦНАП, перезбережіть інформацію до сховища!'} });
                                 regn_choice.selectedIndex = cnap_choice.selectedIndex = 0;
                                 errorId = true;
                              }
                           
                              if (!errorId && regn_choice_item_btn) {
                                 regn_choice_item_btn.checked = true;
                                 regn_choice_item_btn.dispatchEvent(new Event("change", {bubbles:true}));
                              }
                           });
                           cObserver.observe(cnap_choice, { attributes: true, childList: true, subtree: true, characterData: true });
                           // викликаємо подію regn_choice для оновлення cnap_choice
                           regn_choice.dispatchEvent(new Event("change", {bubbles:true})); // , {bubbles:true}
                        }

                        if (requestTypeChecked) {
                           let responseWaiting = new Promise((res, rej) => {
                              var data = { region_control: null, user_control: null};
                              let eObserver = new MutationObserver(( mutations ) => {
                                 //* { https://stackoverflow.com/questions/384286/ }
                                 let isElement = (o) => { return (  typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"); }
                                 for(let mutation of mutations) {
                                    for(let node of mutation.addedNodes) {
                                       if (!isElement(node)) continue;
                                       if (node.querySelector(`select#${pref}_region`))
                                          data.region_control = true;
                                       else if (node.querySelector(`select#${pref}_type_user_choice`))
                                          data.user_control = true;
                                       if (data.region_control && data.user_control) {
                                          clearTimeout(timeoutId);
                                          eObserver.disconnect();
                                          return res({state: 'success', data: data});
                                       }
                                    }
                                 }

                              });
                              let timeoutId = setTimeout(()=>{ eObserver.disconnect(); return res({state: 'timeout', data: data}); }, 5000);
                              eObserver.observe(document.documentElement, { childList: true, subtree: true });
                           });
                           await responseWaiting.then((r)=>{
                              if (!r.data?.user_control && !r.data?.region_control) {
                                 throw `Response data (${pref}_type_user_choice, ${pref}_region) is empty`;
                              } else {
                                 if (r.data?.user_control) updateUserInfo();
                                 if (r.data?.region_control) updateCnapInfo();
                              }

                           }).catch((e)=>{ XMLDocReader.log('.getPageDataFromStorage.MutationObserver error:', e); });

                        } else {
                           await updateUserInfo();
                           await updateCnapInfo();
                        }
                     }
                     return isPageActive;
                  } catch(e) {
                     throw e;
                  }
               },
               setSelectOptionsIdx: (n, d, e) => {
                  var esel = document.getElementById(n);
                  if (esel) {
                     var selo = esel.getElementsByTagName("option");
                     if (selo) {
                        for (var i = 0; i < selo.length; i++) {
                              if (i == d) { 
                                 selo[i].setAttribute('selected', 'selected');
                                 selo[i].removeAttribute('disabled');
                              } else {
                                 selo[i].removeAttribute('selected');
                                 e ? selo[i].removeAttribute('disabled') : selo[i].setAttribute('disabled', 'disabled');
                              }
                        }
                     }   
                  }
               },
               read(f, callback) {
                  // ф-цiя отримання iнформацiї про вхiдний файл
                  var getFileInfo = function (e, callback) {
                     if (typeof window.FileReader !== 'function') {
                        XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": 'Ваш браузер не підтримує використання API функцій'} });
                        throw 'The file API isn\'t supported on this browser yet.';
                     }
                     var r = new FileReader();
                     var fileType = null;
                     r.onloadend = function () {
                        if (r.error) {
                           XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderNotify", data: {"error": `Ваш браузер не зміг прочитати вказаний файл (код помилки ${r.error.code})`} });
                           throw `Your browser couldn't read the specified file (error code ${r.error.code})`;
                        } else {
                           var bin = r.result,
                              decode = function (str) { //  Ф-цiя отримання вмiсту файлу без пiдпису(iв) 
                                 try {
                                    var asn = ASN1.decode(str),
                                       getAsnContent = function (a) { // Ф-цiя отримання тегу з iнформацiєю про вмiст файлу
                                          var count = 0,found = false, result = [], key = 'SEQUENCE', klevel = 3,
                                          recurse = function (asn, level) {
                                             if (asn.sub !== null) {
                                                if (asn.typeName() === key) level++;
                                                for (var i = 0, max = asn.sub.length; i < max; ++i) {
                                                   if (klevel === level && asn.sub[i].typeName() === 'OCTET_STRING')
                                                   {  if (asn.sub[i].sub !== null)  {     // коли пiдписано декiлькома пiдписами
                                                         level = 0;
                                                         recurse(asn.sub[i], level);      // повторюємо цикл
                                                         break;
                                                      }
                                                      result.push(asn.sub[i]);
                                                      found = true;
                                                      break;
                                                   } else {
                                                      recurse(asn.sub[i], level);
                                                   }
                                                }
                                             }
                                          };
                                          recurse(a, 0);
                                          return result;
                                       },
                                       buf = getAsnContent(asn);
                                       if (buf.length) {
                                          var start = buf[0].stream.pos + buf[0].header,
                                              end = start + buf[0].length,
                                              bin = buf[0].stream.enc.slice(start, end);
                                          return bin;
                                       }
                                 } catch (e) { console.log('Cannot decode file. e: ' + e); throw 'Cannot decode file. e: ' + e}
                              };
            
                           if (e.name.match(/\.p7s$/,"im" )) bin = decode(bin);
            
                           var id = 'message', type = null, text = '';
                           if (bin.substr(0,4) === '\x25\x50\x44\x46') {  // pdf file signature \x25\x50\x44\x46 (%PDF)
                              type = 'PDF';
                           } else if (bin.substr(0,2) === '\x50\x4B') {   // zip file signature \x50\x4B (%PK)
                              type = 'ZIP';
                           } else if (bin.indexOf('<?xml version=') >= 0) {  
                              type = 'XML';
                           } else {
                              if (bin.substr(0,6) === '\x37\x7A\xBC\xAF\x27\x1C') {  // 7z file signature
                                 id = 'error';
                                 type = '7z';
                                 text = 'Архів ' + e.name + ' являється архівом 7z, який не підтримується системою. Заархівуйте файли архіватором ZIP і завантажте повторно.';
                              } else {
                                 id = 'error';
                                 type = 'Unknown';
                                 text = 'Невiдомий тип файлу: ' + e.name;
                              }   
                              console.log('Невiдомий тип файлу: ' + e.name);
                           }
                           callback({'id' : id, 'type': type, 'text' : text}, bin);
                        }
                     }
                     r.readAsBinaryString(e);
                  }
                  getFileInfo(f, (msg, bin) => {
                     var utf8_decode = (data) => {
                       var utftext = '', i = 0, c = c1 = c2 = 0;
                       for (;i < data.length;) {
                         c = data.charCodeAt (i);
                         if (c < 128) {
                           utftext += String.fromCharCode (c);
                           i++;
                         } else {
                           if (c > 191 && c < 224) {
                             c2 = data.charCodeAt (i + 1);
                             utftext += String.fromCharCode ((c & 31) << 6 | c2 & 63);
                             i += 2;
                           } else {
                             c2 = data.charCodeAt (i + 1);
                             c3 = data.charCodeAt (i + 2);
                             utftext += String.fromCharCode ((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                             i += 3;
                           }
                         }
                       }
                       return utftext;
                     }, checkBOM = (b) => { return utf8_decode((b.substr(0,3) === '\xEF\xBB\xBF') ? b.substr(3) : b);};
                     if (msg.type ==='XML' || msg.type === 'ZIP') {
                        if (msg.type === 'XML') {
                           bin = checkBOM(bin);
                           callback(msg, bin);
                        } else {
                           var oone = true,
                              unzip = function(bin, callback) {
                                 try {
                                    var zip = new JSZip();
                                    zip.loadAsync(bin, {checkCRC32: true}).then(function (zip) {
                                       var fcount = Object.keys(zip.files).length; // к-сть файлiв в архiвi
                                       zip.forEach(function (relativePath, zipEntry) {
                                         zipEntry.async("blob").then(function (data) {
                                            data.name = zipEntry.name;
                                            getFileInfo(data, function (msg, bin) {
                                               fcount--;
                                               callback (msg, bin, fcount);
                                            });
                                         });
                                       });
                                    }, function (e) { throw 'Corrupted zip : CRC32 mismatch' + ': ' + e; } );
                                 } catch (e) { throw 'Cannot unzip file. ' + ': ' + e; }
                              }, 
                              bss = unzip(bin, function (msg, bin, index) { 
                                 if (msg.type==='XML') {
                                    bin = checkBOM(bin);
                                    if (oone) {   // перший файл
                                       oone = false;
                                       callback(msg, bin);
                                    } 
                                 } else if (index==0) {  // якщо не XML i останнiй елемент index==0 тодi вертаємо 'XXX'
                                    callback(msg, bin);
                                 }
                              });
                        }
                     } else {
                        callback(msg, bin);
                     }
                  });
               }
            }
         }
         XMLDocReader.init = async () => {
            XMLDocReader.popupContainer = new XMLDocReader.classes.MBox;
            XMLDocReader.pageContainer = new XMLDocReader.classes.PContainer;
            // 2000 - Електронні сервіси
            XMLDocReader.pageContainer.add('ЕС',2010,'https://e.land.gov.ua/ecp_auth','Електронні сервіси (головна)');  //+
            XMLDocReader.pageContainer.add('ПФ',2020,'https://e.land.gov.ua/profile/','Профайл (дані користувача)');    //+
            XMLDocReader.pageContainer.add('MP',2030,'https://e.land.gov.ua/back/parcel_registration/project_to_map','Карта'); //+
            // 1030
            XMLDocReader.pageContainer.add('НВ',1031,'https://e.land.gov.ua/back/requests/','Заява про надання відомостей з Державного земельного кадастру'); //+
            // 1040
            XMLDocReader.pageContainer.add('ІН',1041,'https://e.land.gov.ua/back/cadaster/','Пошук інформації за кадастровим номером про суб\'єктів права власності та речових прав на земельну ділянку');
            // 1050 - Реєстрація ЗД
            XMLDocReader.pageContainer.add('РС',1051,'https://e.land.gov.ua/back/parcel_registration','Подача заяви щодо державної реєстрації земельної ділянки'); //+
            XMLDocReader.pageContainer.add('ІС',1052,'https://e.land.gov.ua/back/parcel_registration/list','Історія сформованих заяв щодо державної реєстрації земельної ділянки');
            XMLDocReader.pageContainer.add('ПД',1053,'https://e.land.gov.ua/back/divide_parcel','Подача заяви щодо державної реєстрації земельної ділянки, утвореної шляхом поділу раніше сформованої'); //+
            XMLDocReader.pageContainer.add('ІП',1054,'https://e.land.gov.ua/back/divide_parcel/list_package','Історія сформованих пакетів щодо поділу земельних ділянок');
            // 1060 - Виправлення/Внесення змін
            XMLDocReader.pageContainer.add('ВЗ',1061,'https://e.land.gov.ua/back/parcel_error_correction','Заява про внесення до ДЗК відомостей/змін до відомостей/виправлених відомостей'); //+
            // 1070 - Внесення відомостей
            XMLDocReader.pageContainer.add('ВВ',1071,'https://e.land.gov.ua/back/dzk_object/','Внесення відомостей змін до відомостей про об\'єкт ДЗК за винятком земельної ділянки'); //+
            // 1130 - Перевірка XML
            XMLDocReader.pageContainer.add('XM',1131,'https://e.land.gov.ua/back/check_xml','Перевірка електронного документа XML'); //+

            await XMLDocReader.browser.runtime.onMessage.addListener(XMLDocReader.onMessage);

            window.addEventListener('XDR_MAIN_MESSAGE', async (e) => {
               if (e?.detail?.action === 'view_json_on_map') {
                  XMLDocReader.contentScript.findByCadaster.showJsonObjectOnMap(e.detail.url);
               } else if (e?.detail?.action === 'download_pdf_file') {
                  XMLDocReader.contentScript.findByCadaster.pdfFileFormat(e.detail.url, e.detail.html);
               } else if (e?.detail?.action === 'download_json_file') {
                  XMLDocReader.contentScript.findByCadaster.jsonFileFormat(e.detail.url, e.detail.html);
               } else if (e?.detail?.action === 'download_in4_file') {
                  var html = e?.detail?.html ?? null;
                  var url = e?.detail?.url ?? null;
                  if (!html || !url) return;
                  let parser = new XMLDocReader.classes.PageParser(html);
                  let json = await XMLDocReader.contentScript.findByCadaster.getJson(url);
                  json = (typeof json =='object') ? json : JSON.parse(json);
                  if (json) {
                     let cnum = parser.getCadastreNumber();
                     if (cnum) {
                        let fileName = `${cnum}.in4`;
                        if (parser.createIn4(json, XMLDocReader.codepage)) {
                           parser.saveToFile(fileName);
                        }
                     }
                  }
               } else if (e?.detail?.action === 'download_pdf_files_zip') {
                  let list = e.detail.objects;
                  var zip = new JSZip();
                  window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'show', text: 'Формування PDF архіву', min: 0, max: list.length, position: 0 } } ));
                  let binaryDownload = async (url) => {return await new JSZip.external.Promise(function (resolve, reject) {JSZipUtils.getBinaryContent(url, function(err, data) {if (err) { reject(err);} else {resolve(data);} }); }); } //throw new Error('XXX'); 
                  for (var i=0;i<list.length;i++) {
                     let html = list[i]?.html || null;
                     if (html) {
                        let matches = html.match(/class="box-footer"[\s\S]*?<a href="(?<pdf>[^"]*)[\s\S]*?<a href="(?<json>[^"]*)/im);
                        let url = matches?.groups?.pdf||null;
                        let cadnum = list[i]?.cadnum || null;
                        if (url && cadnum) {
                           const filename = cadnum.replace(/[^0-9]*/gi,'') + ".pdf";
                           let data = await binaryDownload(url);
                           zip.file(filename, data, {binary:true});
                        }
                     }
                     window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'update', position: i } } ));
                  }
                  zip.generateAsync({type: 'blob',compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blob) { 
                     window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'hide'} } ));
                     saveAs(blob, 'archivePdf.zip'); 
                  });
               } else if (e?.detail?.action === 'download_json_files_zip') {
                  let list = e.detail.objects;
                  var zip = new JSZip();
                  window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'show', text: 'Формування JSON архіву', min: 0, max: list.length, position: 0 } } ));
                  for (var i=0;i<list.length;i++) {
                     let html = list[i]?.html || null;
                     if (html) {
                        let matches = html.match(/class="box-footer"[\s\S]*?<a href="(?<pdf>[^"]*)[\s\S]*?<a href="(?<json>[^"]*)/im);
                        let url = matches?.groups?.json||null;
                        let cadnum = list[i]?.cadnum || null;
                        if (url && cadnum) {
                           const filename = cadnum.replace(/[^0-9]*/gi,'') + ".json";
                           let parser = new XMLDocReader.classes.PageParser(html);
                           let json = await XMLDocReader.contentScript.findByCadaster.getJson(url);
                           json = (typeof json =='object') ? json : JSON.parse(json);
                           if (json) {
                              json.properties.cadnum = cadnum;
                              json.properties.owner = parser?.blocks?.NM ? parser.blocks.NM : '';
                              zip.file(filename, '\ufeff' + JSON.stringify(json), {binary:false});
                           }
                        }
                     }
                     window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'update', position: i } } ));
                  }
                  zip.generateAsync({type: 'blob',compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blob) { 
                     window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'hide'} } ));
                     saveAs(blob, 'archiveJson.zip'); 
                  });
               } else if (e?.detail?.action === 'download_in4_files_zip') {
                  let list = e.detail.objects;
                  var zip = new JSZip();
                  window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'show', text: 'Формування IN4 архіву', min: 0, max: list.length, position: 0 } } ));

                  for (var i=0;i<list.length;i++) {
                     let html = list[i]?.html || null;
                     if (html) {
                        let matches = html.match(/class="box-footer"[\s\S]*?<a href="(?<pdf>[^"]*)[\s\S]*?<a href="(?<json>[^"]*)/im);
                        let url = matches?.groups?.json||null;
                        let cadnum = list[i]?.cadnum || null;
                        if (url && cadnum) {
                           const filename = cadnum.replace(/[^0-9]*/gi,'') + ".in4";
                           let parser = new XMLDocReader.classes.PageParser(html);
                           let json = await XMLDocReader.contentScript.findByCadaster.getJson(url);
                           json = (typeof json =='object') ? json : JSON.parse(json);
                           if (json) {
                              if (parser.createIn4(json, XMLDocReader.codepage)) {
                                 zip.file(filename, parser.in4body);
                              }
                           }
                        }
                     }
                     window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'update', position: i } } ));
                  }
                  zip.generateAsync({type: 'blob',compression: "DEFLATE", compressionOptions: { level: 9 } }).then(function (blob) {
                     window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'hide'} } ));
                     saveAs(blob, 'archiveIn4.zip');
                  });
               } else {
                  XMLDocReader.log('.XDR_MAIN_MESSAGE unknown message:', e);
               }
            })

            if (XMLDocReader.enabled) {
               XMLDocReader.contentScript.ecpContainer.init();
               XMLDocReader.contentScript.profilePage.updateAvatar();
               const timerDiv = document.getElementById("XMLDocReaderTimer");
               if (timerDiv) timerDiv.style.display = XMLDocReader.autorefresh ? '' : 'none';
         
               var page = XMLDocReader.pageContainer.get(document.location.href);
               if (page) {
                  switch (page.id) {
                     case 2010:
                        break;
                     case 2020:
                        if (page.same) XMLDocReader.contentScript.profilePage.init();
                        break;
                     case 2030:
                        XMLDocReader.contentScript.mapPage.init();
                        break;
                     case 1031:
                        if (page.same) XMLDocReader.contentScript.requestsPage.init();
                        break;
                     case 1041:
                        XMLDocReader.contentScript.findByCadaster.init();
                        break;
                     case 1051:
                        if (page.same) XMLDocReader.contentScript.stateRegistrationPage.init();
                        break;
                     case 1052:
                        if (page.same) XMLDocReader.contentScript.historyRegistrationPage.init();
                        break;
                     case 1053:
                        if (page.same) XMLDocReader.contentScript.divideParcelPage.init();
                        break;
                     case 1061:
                        if (page.same) XMLDocReader.contentScript.errorCorrectionPage.init();
                        break;
                     case 1071:
                        if (page.same) XMLDocReader.contentScript.dzkObjectPage.init();
                        break;
                     case 1131:
                        if (page.same) XMLDocReader.contentScript.xmlCheckPage.init();
                        break;
                     default:
                  }
               }
            }
         }

         XMLDocReader.init(); 

         setTimeout(function() {
            var script = document.createElement('script');
            script.src = chrome.runtime.getURL('src/js/lib.message.js');
            script.onload = function () { this.remove(); };
            (document.head || document.documentElement).appendChild(script);
         }, 500);

         XMLDocReader.log('Script content is loaded successfully');
         return true;
      },
      scripts: {
         uuidv4: () => { return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) ); }, //* { https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid/2117523#2117523 }
         map: {
            scriptId: null,
            urls: ["https://e.land.gov.ua/back/parcel_registration/project_to_map/*","https://e.land.gov.ua/back/divide_parcel/project_to_map/*"],
            set: async ()=>{
               XMLDocReader.scripts.map.scriptId = `XMLDocReader.map_${XMLDocReader.scripts.uuidv4()}`;
               let scripts = {
                  allFrames : false,
                  id: XMLDocReader.scripts.map.scriptId,
                  js : ["src/js/lib.map.js"],
                  matches : XMLDocReader.scripts.map.urls,
                  persistAcrossSessions: false,
                  runAt : "document_start",
               }
               return await  XMLDocReader.browser.scripting.registerContentScripts([scripts]).then(()=>{
                     XMLDocReader.log(`.registerContentScripts.map ${XMLDocReader.scripts.map.scriptId}`);
                  })
                  .catch((e) => {
                     XMLDocReader.log(`.registerContentScripts.map ${XMLDocReader.scripts.map.scriptId} error`, e);
                     throw e;
                  });
            },
            unset: async ()=> {
               if (XMLDocReader.scripts.map.scriptId) {
                  await XMLDocReader.browser.scripting.unregisterContentScripts({ids: [XMLDocReader.scripts.map.scriptId]})
                  .then(() => {
                     XMLDocReader.log(`.unregisterContentScripts.map ${XMLDocReader.scripts.map.scriptId}`);
                  })
                  .catch((e) => {
                     XMLDocReader.log(`.unregisterContentScripts.map ${XMLDocReader.scripts.map.scriptId} error`, e);
                     throw e;
                  });
                  XMLDocReader.scripts.map.scriptId = null;
                  return true;
               }
            }
         },
         main: {
            scriptId: null,
            set: async ()=>{
               XMLDocReader.scripts.main.scriptId = `XMLDocReader.main_${XMLDocReader.scripts.uuidv4()}`;
               let scripts = {
                  allFrames : false,
                  id: XMLDocReader.scripts.main.scriptId,
                  js : ["src/js/lib.main.js"],
                  matches : ["https://e.land.gov.ua/*"],
                  persistAcrossSessions: false,
                  runAt : "document_start",
               };
               return await  XMLDocReader.browser.scripting.registerContentScripts([scripts]).then(()=>{
                     XMLDocReader.log(`.registerContentScripts.main ${XMLDocReader.scripts.main.scriptId}`);
                  })
                  .catch((e) => {
                     XMLDocReader.log(`.registerContentScripts.main ${XMLDocReader.scripts.main.scriptId} error`, e);
                  });
            },
            unset: async ()=> {
               if (XMLDocReader.scripts.main.scriptId) {
                  await XMLDocReader.browser.scripting.unregisterContentScripts({ids: [XMLDocReader.scripts.main.scriptId]})
                  .then(() => {
                     XMLDocReader.log(`.unregisterContentScripts.main ${XMLDocReader.scripts.main.scriptId}`);
                  })
                  .catch((e) => {
                     XMLDocReader.log(`.unregisterContentScripts.main ${XMLDocReader.scripts.main.scriptId} error`, e);
                  });
                  XMLDocReader.scripts.main.scriptId = null;
                  return true;
               }
            }
         }
      },
      init: async () => {
         await XMLDocReader.readconfig().then(
            async (r) => {
               try {
                  if (r.status === 'firsttime')
                     XMLDocReader.log('Extension launched for the first time, enjoy using it!');
                  else if (r.status === 'success')
                     XMLDocReader.log('.init Settings has been successfully read and applied.');

                  XMLDocReader.manifest = await XMLDocReader.browser.runtime.getManifest();
                  XMLDocReader.browser.tabs.onUpdated.addListener(XMLDocReader.onUpdated);
                  XMLDocReader.browser.runtime.onMessage.addListener(XMLDocReader.onMessage);
                  XMLDocReader.browser.tabs.onActivated.addListener(XMLDocReader.onActivated);
                  XMLDocReader.browser.windows.onFocusChanged.addListener(XMLDocReader.onFocusChanged);
                  XMLDocReader.browser.management.onDisabled.addListener(XMLDocReader.onDisabled);
                  XMLDocReader.browser.permissions.onAdded.addListener(XMLDocReader.onPermissions);
                  XMLDocReader.browser.permissions.onRemoved.addListener(XMLDocReader.onPermissions);
                  XMLDocReader.browser.runtime.onInstalled.addListener(XMLDocReader.onInstalled);

                  let granted = await XMLDocReader.util.checkPermissions();
                  XMLDocReader.enabled = granted ? XMLDocReader.enabled : false;
                  if (XMLDocReader.enabled) {
                     await XMLDocReader.scripts.main.set();
                     if (XMLDocReader.addonmaps) await XMLDocReader.scripts.map.set();
                     await XMLDocReader.reloadPages();
                     XMLDocReader.timerUpdate();
                     XMLDocReader.onActivated();
                  } else {
                     XMLDocReader.log('XMLDocReader disabled.');
                  }
               } catch (e) {
                  throw e;
               }
            }
         ).catch((e)=>{ XMLDocReader.log(e); });
      }
   }

   XMLDocReader.init();
})({});
