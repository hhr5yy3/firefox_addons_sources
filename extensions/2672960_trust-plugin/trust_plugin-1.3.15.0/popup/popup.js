let _downloadButton = null;
let _meta = null;

/*
     actions
*/
const _actions = [{ 
          link: "module_to_main_link",
          tab: "main"
     },
     {
          link: "about_to_main_link",
          tab: "main"
     },
     {
          link: "main_to_module_link",
          tab: "module"
     },
     {
          link: "main_to_about_link",
          tab: "about"
     }];


/*
     utilities
*/
function bindAction(id, action, func) {
     let element = document.getElementById(id);
     if (element) {
          element.addEventListener(action, func);
     }
     return !!element;
};


function сhangeTab(tab) {
     $("div.anchor").removeClass('active');
     $("div.anchor" + "#" + tab).addClass('active');
};

/*
     compare versions
*/
function compareVersions(lhs, rhs) {
     if (lhs === rhs) {
          return 0;
     }
     const lhsNumbers = lhs.split(".").map(Number);
     const rhsNumbers = rhs.split(".").map(Number);
     const lhsNumbersLength = lhsNumbers.length;
     const rhsNumbersLength = rhsNumbers.length;
     const minLength = Math.min(lhsNumbersLength, rhsNumbersLength);
     for (let i = 0; i < minLength; i++) {
          if (lhsNumbers[i] !== rhsNumbers[i]) {
               return lhsNumbers[i] > rhsNumbers[i] ? 1 : -1;
          }
     }
     return lhsNumbersLength - rhsNumbersLength;
};

/*
     load
*/
$(document).ready(function () {
     /*
          menu actions
     */
     _actions.forEach(function (each) {
          const link = each.link;
          const tab = each.tab;

          bindAction(link, "click", function () {
               сhangeTab(tab);
          });
     });
});


function downloadInstaller() {
     window.open(_meta.link);
}

function updateDownloadButton(title) {
     if (_downloadButton) {
          _downloadButton.title = _meta.link;
          _downloadButton.value = title || _downloadButton.value;

          if (_meta.link.length) _downloadButton.style.display="block";
          else                         _downloadButton.style.display="none";
     }
     _downloadButton.innerHTML = title || _downloadButton.innerHTML;
}

document.addEventListener("DOMContentLoaded", function () {

     _downloadButton = document.getElementById("download");
     _downloadButton.addEventListener("click", downloadInstaller);

     browser.storage.local.get('install', data => {
          if (!browser.runtime.lastError) {
               if (data.install) {
                    _meta = JSON.parse(data.install.update);

                    if     ( 'install' == data.install.reason ) updateDownloadButton("Скачать&#160;инсталлятор");
                    else if( 'update'  == data.install.reason ) updateDownloadButton("Скачать&#160;обновление");
               }
          }
     });

     browser.storage.local.get('style', data => {
          if (!browser.runtime.lastError) {
               if (data.style) {

                    var elements = document.getElementsByTagName('style')
                    while (elements.length > 0) elements[0].remove();

                    const popupStyle = document.createElement('style');
                    popupStyle.append(data.style);
                    document.head.appendChild(popupStyle);

                    console.log("popup load stylesheet: " + data.style);
               }
          }
     });

     browser.runtime.sendMessage(new Message("popup", "system", "config", "", "", ""));
});


browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {

     const IGNORED_STATES = [
          error_handler.CODES.PROTOCOL_CONNECTION_CLOSED,
          error_handler.CODES.PROTOCOL_HOST_NOT_FOUND,
          error_handler.CODES.PROTOCOL_NATIVE_HOST_LOST,
          error_handler.CODES.PROTOCOL_NATIVE_HOST_NOT_FOUND,
          error_handler.CODES.PROTOCOL_WEB_SOCKET_NOT_FOUND
     ];

     const moduleType = message.module.type;
     const methodType = message.method.type;
     const messageError = message.error;
     const messageResult = message.method.result;

     if ( moduleType == "system" ) {
          if( methodType == "config" && !IGNORED_STATES.includes(+message.code) ) {

              let element = document.getElementById("modules");
              let template = document.createElement("div");

              element.innerHTML = '';

              _downloadButton.style.display = "none";

              document.getElementById("support_version_message").style.display = "none";
              document.getElementById("obsolete_version_message").style.display = "none";
              document.getElementById("error_version_message").style.display = "none";

              if (message.error && message.error.length) {
                   const moduleNotFoundInfo = document.createElement('p');
                   moduleNotFoundInfo.classList.add('text');
                   moduleNotFoundInfo.textContent = 'данные не получены';
                   template.appendChild(moduleNotFoundInfo);
                   document.getElementById("error_version_message").style.display = "block";
                   document.getElementById("error_text").textContent = message.error;
              } else {
                        let result = JSON.parse(messageResult);

                   result.forEach(function (each) {
                        const moduleInfo = document.createElement('p');
                        moduleInfo.classList.add('text');
                        moduleInfo.textContent = each.format.type + ': ' + each.format.version;
                        template.appendChild(moduleInfo);

                        if (each.format.type == "core") {

                             let version = each.format.version;

                             document.getElementById("program-version").textContent = version;

                             let result = compareVersions( _meta.release, version );
                             if ( result == 0 ) {
                                  // nothing to do
                             } else if ( compareVersions( version, _meta.min ) >= 0 ) {
                                  document.getElementById("support_version_message").style.display = "block";
                                  updateDownloadButton("Скачать&#160;обновление");
                             } else {
                                  document.getElementById("obsolete_version_message").style.display = "block";
                                  updateDownloadButton("Скачать&#160;обновление");
                             }
                        }
                   });
              }
              element.appendChild(template);

              document.getElementById("main_to_module_link").style.display = "block"; 
         }
         else if (methodType == "style") {

               if (messageError && messageError.length) {
                  console.log("getting style file failed: " + message.error);
               }
               else {

                     let result = JSON.parse(messageResult);
                     let stylesheet = result.content;

                     if (result.contentEncoding == "base64") {
                          stylesheet = Base64.decode(stylesheet);
                     }

                     browser.storage.local.set({ style: stylesheet });

                     var elements = document.getElementsByTagName('style')
                     while (elements.length > 0) elements[0].remove();

                     const popupStyle = document.createElement('style');
                     popupStyle.append(stylesheet);
                     document.head.appendChild(popupStyle);

                     console.info("popup actualized stylesheet: " +stylesheet);
                }
          }
     }
     sendResponse(null);
});
