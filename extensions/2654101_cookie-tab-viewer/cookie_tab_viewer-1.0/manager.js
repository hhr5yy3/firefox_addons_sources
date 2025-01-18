if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

function setClipboard(value) {
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

function createButton(params) {
    var button = document.createElement('button');
    button.innerText = params.label;
    button.style = "width: 100%";

    button.onclick = function () {
        try {
            params.callback()
            button.innerText = "done!";
            setTimeout(function () {
                try {
                    button.innerText = params.label;
                } catch (err){}
            }, 3000)
        } catch (err) {
            console.error('Fallback: Oops', err);
        }
    };
    return button;
}

function createCopyButton(cookie) {
    return createButton({label : "Copy",
                         callback : function() {
                             setClipboard(cookie.value);
                         }
                        })
}

function createCopyAndDeleteButton(cookie, params) {
    return createButton({label : "Copy&Delete",
                         callback : function() {
                             setClipboard(cookie.value);
                             chrome.cookies.remove(params);
                         }
                        })
}

function reloadCookieTable(tabUrl, cookies) {
  var table = document.querySelector("#cookies");

  cookies.forEach(function (cookie) {
    var row = table.insertRow(-1);
    var nameCell = row.insertCell(-1);
    nameCell.innerText = cookie.name;

    row.insertCell(-1).appendChild(createCopyButton(cookie));

    var cookieDeleteParams = {url : tabUrl,
                              name : cookie.name};

    row.insertCell(-1).appendChild(createCopyAndDeleteButton(cookie, cookieDeleteParams));

    var valueCell = row.insertCell(-1);
    valueCell.innerText = cookie.value;
  })
}

function onload(tabUrl) {
  chrome.cookies.getAll({ url: tabUrl }, function (cookies) {
    reloadCookieTable(tabUrl, cookies);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    onload(tabs[0].url);
  });
});
