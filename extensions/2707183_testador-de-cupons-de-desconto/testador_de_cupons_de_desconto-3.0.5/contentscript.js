// qua 09 jun 2021 14:49:59 -03

/**
Cookies
**/
var Cookie = {
  create: function createCookie(name,value,seconds) {
      if (seconds) {
          var date = new Date();
          date.setTime(date.getTime()+(seconds*1000));
          var expires = "; expires="+date.toGMTString();
      }
      else var expires = "";
      document.cookie = name+"="+value+expires+"; path=/";
  },
  get: function getCookie(c_name){
    var i,x,y,ARRcookies=document.cookie.split(";");
      for (i=0;i<ARRcookies.length;i++){
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name){
       return unescape(y);
      }
    }
  }
};


function httpGetAsync(theUrl, callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4)
      callback(xmlHttp);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

/**
Barrinha
**/
function ReduzaBarrinha(url, store){
  var self = this,
      productJson;

  this.url = url;
  this.store = store;

  this.placeholder = this._createPlaceholder();
  //this.companyLogo = this._createLogo();

  this.listen();

  httpGetAsync('https://api2.reduza.com.br/products/byurl?url=' + encodeURIComponent(this.url), function(resp){
    if(resp.status >= 200 && resp.status < 300){
      productJson = resp.responseText;
      self.prependIframe(productJson, store)
    }else{
      console.log('REDUZA:', resp.statusText)
    }
  })

}

// listen to events in window
ReduzaBarrinha.prototype.listen = function(){
  var self = this;

  window.addEventListener("message", function(event, ev){
    var ev;

    try {
      ev = JSON.parse(event.data);

      if(ev.reduzaEvent && ev.reduzaEvent instanceof Array && ev.reduzaEvent.length > 0){
        var args = ev.reduzaEvent,
            fnName = 'on' + args[0];

        args.splice(0, 1);

        if(typeof self[fnName] == 'function'){
          self[fnName].apply(self, args);
        }else{
          console.log('REDUZA: Event handler ' + fnName + ' não encontrado')
        }
      }
    }catch(e){
      // not our message
    }
  });
}
ReduzaBarrinha.prototype.prependIframe = function(productJson, store){
  try {
    var iframe = this._createIframe(productJson, store);

    document.documentElement.appendChild(iframe);
    document.documentElement.insertBefore(this.placeholder,document.documentElement.childNodes[0]);

    this.iframe = iframe;
  }catch(e){
    console.log('REDUZA NAO PODE CARREGAR AINDA: ', e.stack)
    setTimeout(this.prependIframe.bind(this, productJson, store), 1000)
  }
}

ReduzaBarrinha.prototype._createIframe = function(productJson, store){
  var iframe = document.createElement('iframe');

  iframe.src = 'https://www.reduza.com.br/ext?id_whitelabel=cupomdesconto&url=' + encodeURIComponent(this.url) + '&store='+encodeURIComponent(JSON.stringify(store)) + '&product='+encodeURIComponent(productJson);

  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.style.zIndex = '2147483646';
  iframe.style.backgroundColor = "transparent";
  iframe.scrolling = "no";
  iframe.style.top = ReduzaBarrinha.getBaixouOffset() + 'px';
  iframe.style.left = '0';
  iframe.style.position = 'fixed';

  iframe.frameBorder = "0";
  iframe.allowTransparency = "true";

  return iframe;
}

ReduzaBarrinha.prototype.pushFixedElementsToBottom = function(){
  var nodes = document.getElementsByTagName( '*' );

  for(var i in nodes){
    var child = nodes[i],
        style;

    if(child instanceof HTMLElement){
      style = getComputedStyle(child)
    }else{
      continue;
    }

    if(style.position == 'fixed' && parseInt(style.top ? style.top : 0) == 0 && child !== this.iframe){
      child.style.top = '88px'
    }
  }
}

ReduzaBarrinha.prototype._createLogo = function(){
  var logoBase64 = 'data:image/png;base64,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'
  var img = document.createElement('img');
  img.src = logoBase64;
  img.style.zIndex = '2147483647';
  img.style.top = (15 + ReduzaBarrinha.getBaixouOffset()) + 'px';
  img.style.left = '51px';
  img.style.display = 'none';
  img.style.position = 'fixed';
  return img;
}

ReduzaBarrinha.prototype._createPlaceholder = function(){
  var placeholder = document.createElement('div');
  placeholder.id = 'reduza-placeholder';
  return placeholder;
}

ReduzaBarrinha.getBaixouOffset = function(){
  var el = document.getElementById('baixouDivEspaco');
  if(!el) return 0;
  var top = parseInt(el.style.height)
  return isNaN(top) ? 0 : top;
}

/**
Iframe event handlers
**/

ReduzaBarrinha.prototype.onresize = function(width, height){
  // start placeholder
  if(!this.placeholder.style.height){
    this.placeholder.style.height = '88px';
  }

  this.width = this.iframe.style.width = width;
  this.height = this.iframe.style.height = height;
  this.pushFixedElementsToBottom();
}

ReduzaBarrinha.prototype.onbackgroundmessage = function(){
  chrome.runtime.sendMessage(Object.values(arguments));
}

ReduzaBarrinha.prototype.onclose = function(){
  this.placeholder.parentNode.removeChild(this.placeholder)
  this.companyLogo.parentNode.removeChild(this.companyLogo)
  this.iframe.parentNode.removeChild(this.iframe);
}

var tlds = ['.com.br', '.com', '.net', '.org.br', '.org']
function getDomainName(host){
  var hostNoTld = host;

  for(var i in tlds){
    var tld = tlds[i];
    if(host.endsWith(tld)){
      hostNoTld = hostNoTld.replace(tld, '');
      break;
    }
  }

  return hostNoTld.split('.').pop();
}

// identify plugin
if(document.location.hostname.indexOf('.reduza.com.br') !== -1){
  Cookie.create('reduza_extension_installed', 1, 3600);
}

/**
Initialization code
**/
var xhr;


(function before(){
  if(!xhr){ // just in case the browser tries to execute the main routine more than once for whatever reason...

    xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      var shouldOpenReduza = false;

      if (xhr.readyState == 4) {
        if(xhr.status > 399){
          console.log('REDUZA: Error getting store data ' + xhr.statusText);
        }else{

          try {
            try {
              var stores = JSON.parse(xhr.responseText),
                  store;

              var host = window.location.hostname;

              var domain = getDomainName(host);

              for(var i in stores){
                if(domain == stores[i].hostname){
                  store = stores[i];
                  shouldOpenReduza = true;
                  break;
                }
              }

            }catch(e){
              shouldOpenReduza = false;
            }

            if(shouldOpenReduza){
              new ReduzaBarrinha(document.location.href, store); // start reduza
            }
          }catch(e){
            console.log('REDUZA: ' + e);
            console.log(e.stack);
          }
        }
      }
    }

    xhr.open('GET', 'https://api2.reduza.com.br/stores', true); // get list of known domains
    xhr.send(null);
  }
})();
