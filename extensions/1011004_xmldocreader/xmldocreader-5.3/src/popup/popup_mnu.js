((XMLDocReader) => {
   XMLDocReader.log = console.log.bind(console||window.console, '%c[XMLDocReader]', 'color: #FF69B4;');
   XMLDocReader.url = window.location.href;
   XMLDocReader.browser = typeof InstallTrigger !== 'undefined' ? browser : chrome;
   XMLDocReader.log('Popup content is loaded successfully');

   if (XMLDocReader.url.includes('settings.html')) {
      XMLDocReader.getoptions = async () => {
         try {
            XMLDocReader = {...await XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderGetOptions"}), ...XMLDocReader}; 
            let enabled = document.getElementById("cb_auto");
            let autorefresh = document.getElementById("cb_autorefresh");
            let addonstyle = document.getElementById("cb_msg");
            let addonmaps = document.getElementById("cb_maps");
            let userinfo_email = document.getElementById("user_email");
            let userinfo_phone = document.getElementById("user_phone");
            //* { https://github.com/mdn/webextensions-examples/blob/main/dnr-redirect-url/popup.js }
            const permissions = { origins: XMLDocReader.manifest.host_permissions };
            
            const checkbox_host_permission = document.getElementById("cb_host");
            checkbox_host_permission.onchange = async () => {
              if (checkbox_host_permission.checked) {
                let granted = await XMLDocReader.browser.permissions.request(permissions);
                if (!granted) {
                  // Permission request was denied by the user.
                  checkbox_host_permission.checked = false;
                }
              } else {
                checkbox_host_permission.checked = true;
              }
            };
            let granted = await XMLDocReader.browser.permissions.contains(permissions);
            checkbox_host_permission.checked = granted;


            userinfo_phone.addEventListener('blur', function (e) { //* { https://stackoverflow.com/questions/17651207/ }
               var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{2})(\d{2})/);
               e.target.value = x ? ('(' + x[1] + ') ' + x[2] + '-' + x[3] + '-' + x[4]) : '';
            });

            let subbutton = document.getElementById("cb_button");

            enabled.checked = XMLDocReader.enabled ?? false;
            autorefresh.checked = XMLDocReader.autorefresh ?? false;
            addonstyle.checked = XMLDocReader.addonstyle ?? false;
            addonmaps.checked = XMLDocReader.addonmaps ?? false;
            userinfo_email.value = XMLDocReader.userinfo.email ?? '';

            userinfo_phone.value = XMLDocReader.userinfo.phone ?? '';
            userinfo_phone.dispatchEvent(new Event('blur'));
            let visibilitySet = (state) => {
               // addon buttons visibility state
               var cboxes = document.querySelectorAll('fieldset.cb_settings > input');
               for (var i = 0; i < cboxes.length; i++) {
                 state ? cboxes[i].removeAttribute('disabled') : cboxes[i].setAttribute('disabled', 'disabled');
               }
               state ? userinfo_email.removeAttribute('disabled') : userinfo_email.setAttribute('disabled', 'disabled');
               state ? userinfo_phone.removeAttribute('disabled') : userinfo_phone.setAttribute('disabled', 'disabled');
            }

            visibilitySet(XMLDocReader.enabled);
            cb_auto.addEventListener('click', (e) => {
               visibilitySet(e.target.checked);
            })

            subbutton.addEventListener('click', async (e) => {
               XMLDocReader.userinfo.email = document.getElementById("user_email").value;
               XMLDocReader.userinfo.phone = document.getElementById("user_phone").value;
               XMLDocReader.enabled     = document.getElementById("cb_auto").checked;
               XMLDocReader.autorefresh = document.getElementById("cb_autorefresh").checked;
               XMLDocReader.addonstyle  = document.getElementById("cb_msg").checked;
               XMLDocReader.addonmaps   = document.getElementById("cb_maps").checked;
               await XMLDocReader.browser.runtime.sendMessage({message: "XMLDocReaderSetOptions", object: JSON.parse(JSON.stringify(XMLDocReader)) });
               window.close();
            }, false);
   
            return true;
         } catch(e) {
            throw e;
         }
      };
      XMLDocReader.getoptions().then(r=>XMLDocReader.log('.getoptions initialise success')).catch(e=>XMLDocReader.log('.getoptions initialise error', e));
   }

   const popupmenu = document.querySelector('[data-behaviour="toggle-menu-icon"]');
   if (popupmenu) popupmenu.addEventListener('click', function () { 
       this.classList.toggle('menu-icon--open');
       document.querySelector('[data-element="toggle-nav"]').classList.toggle('nav--active');
   }, false);

   if (manifest = chrome.runtime.getManifest())
      document.getElementById("mlink").innerHTML = '<div class="menu-text"><b>' + manifest.name + ' ' + manifest.version + '</b><br>R.Parkhuts 2018-2024</div>';
})({});