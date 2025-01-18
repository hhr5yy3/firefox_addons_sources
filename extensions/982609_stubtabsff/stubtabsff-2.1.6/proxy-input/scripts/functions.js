function Proxy(protocol, ip, port, username, password) {
  return {
    protocol,
    ip,
    port,
    username,
    password,
  };
}

function addProxyToDom(index, proxy) {
  let htmlString = `<div class="c-row data shadow p-2 px-3 mt-2" id=${index}>
              <div class="index">${index + 1}</div>
              <div class="protocol-name">
                  <select class="form-select w-100 input-el" name="protocol"  data="${index}" aria-label="Default select example">
                      <option value="http" ${
                        proxy.protocol === "http" ? "selected" : ""
                      } >http</option>
                      <option value="https" ${
                        proxy.protocol === "https" ? "selected" : ""
                      }>https</option>
                      <option value="sock5" ${
                        proxy.protocol === "sock5" ? "selected" : ""
                      }>sock5</option>
                  </select></div>
              <div class="ip"><input type="text" name="ip"  value=${
                proxy.ip
              } data="${index}" class="input-el"></div>
              <div class="port"><input class="input-el" type="number" name="port" value="${proxy.port}" data="${index}"></div>
              <div class="username"><input class="input-el" type="text" name="username"  value="${proxy.username}" data="${index}" placeholder="user name"'></div>
              <div class="password"><input class="input-el" type="password" name="password"  value="${proxy.password}" data="${index}" placeholder="password" '><i class="fas fa-eye btn btn-sm show-pass" data="${index}"></i></div>
              <div class="action btn btn-danger rounded delete-btn" data="${index}"'><i class="far fa-trash-alt"></i></div>
          </div>`;
  $("#proxyList").append(htmlString);
}

function deleteProxy(e) {
  let group = handler.deleteProxy(Number(e));
  refeshProxyList();
}


function proxyChange(e, index) {
  handler.editProxy(index, { [e.name]: e.value });
}



function showpass(e, id) {
  let eye = () => {
    $(e).removeClass("fa-eye-slash");
    $(e).addClass("fa-eye");
  };
  let slashEye = () => {
    $(e).removeClass("fa-eye");
    $(e).addClass("fa-eye-slash");
  };
  if ($(e).prev().attr("type") === "password") {
    slashEye();
    $(e).prev().attr("type", "text");
  } else {
    eye();
    $(e).prev().attr("type", "password");
  }
}

function refeshProxyList() { 
  $("#proxyList").html("");
  handler.proxies.forEach((proxy, index) => {
    addProxyToDom(index, proxy);
  });
}

function importError(message) {
    alert(message);
}

function download(filename, text) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

let readTextFile = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      const str = e.target.result;
      resolve(str);
    };
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};