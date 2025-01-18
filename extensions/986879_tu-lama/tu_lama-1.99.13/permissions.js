function addOrigin(origin,checked){
  var node = document.createElement("LI");
  var nodeText = document.createTextNode(" "+origin);
  var checkBox = document.createElement("input");
  checkBox.type = 'checkbox';
  checkBox.checked = checked;
  checkBox.dataset.origin=origin;
  if (origin == "*://*.alma.exlibrisgroup.com/*" || origin == "*://*.userservices.exlibrisgroup.com/*")
    checkBox.disabled = true;
  else
    checkBox.addEventListener('change', processChange);
  node.appendChild(checkBox);
  node.appendChild(nodeText);
  document.getElementById("origins").appendChild(node);
}

function updatePermissions() {
  browser.permissions.getAll()
  .then((permissions) => {
    document.getElementById('permissions').innerText = permissions.permissions.join(', ');
    document.getElementById("origins").innerHTML = '';
    for (let origin of permissions.origins) {
      addOrigin(origin,true);
    }
    browser.storage.local.get(['apiURL','bmsUrl','loansUrl','tuwsysUrl','locationIPURL','gndUrl','lobidUrl','tissorcUrl','tuwSeen','acList']).then((urls) => {
      var re = /^(https?):\/\/([^\/]*)(\/.*)?$/;
      var match;
      var origins = [];
      // var permissions = [];
      for (let url in urls) {
        if (url == 'tuwSeen' && urls[url])
          origins.push('https://tiss.tuwien.ac.at/');
        else if (url == 'acList' && urls[url]){
          for (acConf in urls[url])
            if (match = re.exec(urls[url][acConf].url))
              origins.push(match[1]+'://'+match[2]+'/*');
        } else if (match = re.exec(urls[url])){
          origins.push(match[1]+'://'+match[2]+'/*');
        }
        // if (url == 'locationIPURL') permissions.push("webRequestBlocking");
      }
      origins = Array.from(new Set(origins));
      for (let origin in origins) {
        browser.permissions.contains({origins:[origins[origin]]}).then((result) => {
          if (!result) addOrigin(origins[origin],false);
        });
      }
      /* for (let permission in permissions) {
        browser.permissions.contains({permissions:[permissions[permission]]}).then((result) => {
          if (!result) addOrigin(permissions[permission],false);
        });
      } */
    });
  });
}

async function processChange(event) {
  var origin = event.target.dataset.origin;
  // if (origin == 'webRequestBlocking')
  //  var permission = {permissions: [origin]};
  // else
    var permission = {origins: [origin]};
  let result = document.getElementById('result');

  try {
    if (event.target.checked) {
      await browser.permissions.request(permission)
      .then((response) => {
        result.className = 'bg-success';
        result.textContent = (lang=='de')?'Host origin hinzugefügt':'Host origin added';
      })
      .catch((err) => {
        // Catch the case where the permission cannot be granted.
        result.className = 'bg-warning';
        result.textContent = err.message;
      });
    } else {
      console.log(permission);
      browser.permissions.remove(permission)
      .then((response) => {
        result.className = 'bg-success';
        // if (origin == 'webRequestBlocking')
        //  result.textContent = (lang=='de')?'"webRequestBlocking" permission gelöscht':'"webRequestBlocking" permission deleted';
        // else
          result.textContent = (lang=='de')?'Host origin gelöscht':'Host origin deleted';
      });
    }
  } catch(err) {
    // Catch the case where the permission is completely wrong.
    result.className = 'bg-danger';
    result.textContent = err.message;
  }
  result.style.display = 'block';
  updatePermissions();
  event.preventDefault();
}

var lang = browser.i18n.getUILanguage().substr(0,2);
document.getElementById('body').classList.add(lang);
updatePermissions();
