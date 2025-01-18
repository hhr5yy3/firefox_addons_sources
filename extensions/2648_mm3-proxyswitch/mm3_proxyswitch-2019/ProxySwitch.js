"use strict";

var _proxys=null;
var select=null;

var active=false;
var _setting={};



function hp2(hp,def){
  return hp.host+':'+(hp.port!=null ? hp.port : def);
}



function psSymbol(proxy){

  let l={};
  symbolW(l,_setting);
  symbolW(l,   proxy);

  let canvas = document.createElement("canvas");
  let ctx16  = canvas.getContext("2d");

  canvas = document.createElement("canvas");
  let ctx32 = canvas.getContext("2d");

  let c=null;
  if(active){c=l.colorActive;if(c==null)c="#900";}
  else      {c=l.color;      if(c==null)c="#808080";}

  ctx16.fillStyle=c;
  ctx32.fillStyle=c;

  if('square'==l.shape){
    ctx16.fillRect(0,0,16,16);
    ctx32.fillRect(0,0,32,32);
  }
  else{
    ctx16.fill(new Path2D("M0,0 0,7  2,7  2,3  3,3  3,7  5,7  5,3  6,3  6,7  9,7  9,0z"));
    ctx16.fill(new Path2D("M0,9 0,16 2,16 2,12 3,12 3,16 5,16 5,12 6,12 6,16 9,16 9,9z"));
    ctx16.fill(new Path2D("M16,0 16,16 10,16 10,14 14,14 14,9 10,9 10,7 13,7 13,2 11,2 11,0z"));

    ctx32.fill(new Path2D("M5,4  5,14 7,14 7,8  9,8  9,14 11,14 11,8  13,8  13,14 17,14 17,4z"));
    ctx32.fill(new Path2D("M5,16 5,26 7,26 7,20 9,20 9,26 11,26 11,20 13,20 13,26 17,26 17,16z"));
    ctx32.fill(new Path2D("M21,4 27,4 27,26 19,26 19,24 25,24 25,16 19,16 19,14 23,14 23,6 21,6z"));
  }

  return {16:ctx16.getImageData(0,0,16,16),
          32:ctx32.getImageData(0,0,32,32)};
}



function errPrivateMode(error){try{

  let incognito=browser.extension.isAllowedIncognitoAccess();
  incognito.then((isAllowed)=>{

    if(isAllowed)err(error);
    else init2();
  });

}catch(ex){err(ex);}}



function on(proxy){try{

  let ps={};

       if(proxy.n=='System')ps.proxyType='system';
  else if(proxy.n=='Auto')ps.proxyType='autoDetect';
  else if(proxy.url!=null){
    ps.proxyType='autoConfig';
    ps.autoConfigUrl=proxy.url;
  }
  else{
    ps.proxyType='manual';

    let p=proxy.all;
    if(p!=null){
      ps.http=hp2(p,80);
      ps.httpProxyAll=true;
    }
    else if(hasScheme(proxy,schemeP)){

      p=proxy.http;

      if(p!=null && proxy.https!=null
                 && proxy.ftp  !=null
                 && proxy.socks!=null && p.host==proxy.https.host && p.port==proxy.https.port
                                      && p.host==proxy.ftp  .host && p.port==proxy.ftp  .port
                                      && p.host==proxy.socks.host && p.port==proxy.socks.port){

        ps.http=hp2(p,80);
        ps.httpProxyAll=true;
      }
      else{

        if(p          !=null)ps.http=hp2(p,           80);
        if(proxy.https!=null)ps.ssl =hp2(proxy.https,443);
        if(proxy.ftp  !=null)ps.ftp =hp2(proxy.ftp,   21);

        if(proxy.socks!=null){
          ps.socks=hp2(proxy.socks,1080);
          ps.socksVersion=5;
        }
        else if(proxy.socks4!=null){
          ps.socks=hp2(proxy.socks4,1080);
          ps.socksVersion=4;
        }
      }
    }
    else if(proxy.socks !=null){
      ps.socks=hp2(proxy.socks,1080);
      ps.socksVersion=5;
    }
    else if(proxy.socks4!=null){
      ps.socks=hp2(proxy.socks4,1080);
      ps.socksVersion=4;
    }

    if(proxy.noProxy!=null){

      let noProxy=null;
      proxy.noProxy.forEach(hp=>{
        let out=hp.host;
        if(hp.m=='r')out+='/'+hp.port;
        else if(hp.port!=null)out+=':'+hp.port;

        if(noProxy==null)noProxy='';else noProxy+=',';
        noProxy+=out;
      });
      ps.passthrough=noProxy;
    }
  }

  if(proxy.proxyDNS)ps.proxyDNS=true;

  browser.proxy.settings.set({value:ps}).then(onAfter(proxy),errPrivateMode);

}catch(ex){err(ex);}}



function onAfter(proxy){

  browser.browserAction.setIcon({imageData:psSymbol(proxy)}).catch(err);

  if(proxy.clear=='cache'){

    browser.browsingData.removeCache({}).then(()=>{
      onAfter2(proxy);
    }).catch(err);

  }
  else onAfter2(proxy);
}



function onAfter2(proxy){

  if(proxy.homepage){

    browser.tabs.create({url:proxy.homepage}).then(()=>{
        switchEnd(proxy);
      }).catch(err);

  }
  else switchEnd(proxy);
}



function off(proxy){try{

  let ps={};
  ps.proxyType='none';

 browser.proxy.settings.set({value:ps}).then(()=>{

      browser.browserAction.setIcon({imageData:psSymbol(proxy)}).then(()=>{
        switchEnd(proxy);
      }).catch(err);
    },
    errPrivateMode
  );

}catch(ex){err(ex);}}



function switchEnd(proxy){

  if(_setting!=null && _setting.isTestUrl){
    _setting.isTestUrl=false;
    testUrl(proxy);
  }
}



function onOff(proxy){

  if(active) on (proxy);
  else       off(proxy);
}



function change(proxy,set){try{

  select=proxy.n;

  if(set>0){
    if(typeof proxy.active!=='undefined'){
      active=proxy.active=='yes';
    }
    else if(set==2){
      active=true;
    }
  }

  onOff(proxy);
  browser.browserAction.setTitle({title:select});

}catch(ex){err(ex);}}



function find(set){try{

  let l;
  let title='MM3-ProxySwitch';
  if(_proxys!=null && (l=_proxys.length)>0){
    if(select!=null){

      for(let i=0;i<l;i++){
        let proxy=_proxys[i];
        if(proxy.n==select){
          change(proxy,set);
          return;
        }
      }
    }

    if(select==null){
      if(l==1){
        select=_proxys[0].n;
        title=select;
      }
      else title=browser.i18n.getMessage('noSelect')
    }
    else title=browser.i18n.getMessage('unknownProxy',select);
  }

  active=false;
  off(null);
  browser.browserAction.setTitle({title});

}catch(ex){err(ex);}}



function testUrl(proxy){try{

            let url=   proxy.testUrl;
  if(url==null) url=_setting.testUrl;
  if(url==null) return;

  var obj=testUrlM(url);
  if(obj.mode==-1) return;

  if(active){
    if(obj.mode==1){
      return;
    }
  }
  else{
    if(obj.mode==2){
      return;
    }
  }

  var req=new XMLHttpRequest();
  req.timeout=2000;
  req.onreadystatechange=function(){
    if(req.readyState==4){
      if(req.status==200){ if(!active){ active=true;  find(1); browser.storage.sync.set({active});}}
      else               { if( active){ active=false; find(1); browser.storage.sync.set({active});}}
    }
  };
  req.open('HEAD',obj.url,true);
  req.send(null);
}catch(ex){err('testUrl',ex);}}

const def='[MM3-WebAssistant\nhttp=127.0.0.1:8080\nhttps=127.0.0.1:8080\nftp=127.0.0.1:8080\nhomepage=https://Proxy-Offline-Browser.'+browser.i18n.getMessage('topLevel')+'\n]';



browser.runtime.onMessage.addListener((request,sender,sendResponse)=>{try{

  if(request.get){

    sendResponse({_proxys,select,active,_setting});

  }
  else if(request.onOff){

    active=!active;
    onOff(request.onOff);

    browser.storage.sync.set({active});
  }

  else if(request.change){

    change(request.change,2);

    browser.storage.sync.set({select,active});
  }

  else if(request.save){

    let text=request.save;
    let map=text2map(text);
    text=map2text(map);

    let x=map2work(map);

    if(x!=null){
      _proxys =x.p;
      _setting=x.s;
    }
    else{
      _proxys =null;
      _setting={};
    }

    sendResponse({map});

    browser.storage.sync.set({text});
    find(0);
  }
  else if(request.save==""){

    let text=def;
    let map=text2map(text);
    _proxys =map2work(map).p;
    _setting={};
    select='MM3-WebAssistant';
    active=false;
    browser.storage.sync.set({text,select,active});

    off(null);

    sendResponse({map});
  }

}catch(ex){err(ex);}});



function init2(){try{
  browser.runtime.openOptionsPage();
}catch(ex){err(ex);}}



function init(data){try{

  if(data.text==null || data.text==''){
    let text=def;

    _proxys=map2work(text2map(text)).p;
    _setting={};
    select='MM3-WebAssistant';
    active=false;
    browser.storage.sync.set({text,select,active}).then(init2,err);

  }
  else{
    let x=map2work(text2map(data.text));
    if(x!=null){
      _proxys =x.p;
      _setting=x.s;
      _setting.isTestUrl=true;
    }

    select=data.select;
    active=data.active;

    find(1);

  }

  browser.commands.onCommand.addListener(function(command){

    if(_proxys!=null){
      let l=_proxys.length;
      if(l>0 && command.startsWith("ProxySwitch-")){
        let nr=command.charCodeAt(12)-49;

        if(nr<l){
          let proxy = _proxys[nr];
          if(proxy.n==select){
            active=!active;
            onOff(proxy);
            browser.storage.sync.set({active});
          }
          else{
            change(proxy,2);

            browser.storage.sync.set({select,active});
          }
        }
      }
    }
  });

}catch(ex){err(ex);}}

document.addEventListener('DOMContentLoaded',()=>{try{

  browser.storage.sync.get(['text','select','active']).then(init,err);

}catch(ex){err(ex);}});