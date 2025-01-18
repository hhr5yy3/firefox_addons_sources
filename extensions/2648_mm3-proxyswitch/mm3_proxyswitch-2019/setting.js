"use strict";

var text=null;

var settingT,infoT,saveB;

const LF='<br>';
const SPACE='&nbsp;&nbsp;';



function setHtml(view, text){
  view.innerHTML=text;
}



function html(text){

  return text.replace("<", "&lt;");
}



function hostH(scheme,v,defPort,err1,err2){

  let hp=hostM(v,true,defPort);

  let out;
       if(err1!=null) out=' e" title="'+browser.i18n.getMessage(err1,err2);
  else if(hp ==null) out=' u';
  else if(hp.e     ) out=' u" title="'+(hp.eh ? hp.eh : hp.ep);
  else               out='';

  out+='">'+scheme+'</span>=';

  if(hp==null){
    if(v!=null)out+=v;
  }
  else{

    out+='<span class="'+hp.m;
    if(hp.e)out+=' e" title="'+(hp.eh ? hp.eh : hp.ep);
    out+='">'+html(hp.host)+'</span>';

    if(hp.port!=null){

      out+=':<span class="p';
      if(hp.e)out+=' e" title="'+(hp.ep ? hp.ep : hp.eh);
      out+='">'+hp.port+'</span>';
    }
  }

  return out;
}



function noProxyH(hosts,err1,err2){try{

  let err=null;
  let hs=noProxyM(hosts).l;
  if(hs.length>0){
    let out=null;
    for(let i=0,l=hs.length;i<l;i++){

      let hp=hs[i];

      if(hp!=null){
        if(out==null)out=''; else out+=', ';

        out+='<span class="'+hp.m;
        if(hp.e){
          let em=hp.eh ? hp.eh : hp.ep;if(err==null)err=em;
          out+=' e" title="'+em;
        }
        out+='">'+html(hp.host)+'</span>';

        if(hp.port!=null){
          out+=(hp.m=='r' ? '/' : ':')+

          '<span class="p';
          if(hp.e){
            let em=hp.ep ? hp.ep : hp.eh;  if(err==null)err=em;
            out+=' e" title="'+em;
          }
          out+='">'+hp.port+'</span>';
        }
      }
    }
    let out2='';
         if(err1!=null)out2=' e" title="'+browser.i18n.getMessage(err1,err2);
    else if(err !=null)out2=' u" title="'+err;

    return out2+'">noProxy</span>='+out;
  }
}catch(ex){err(ex);}return ' e">noProxy</span>='+hosts;}



function yesNoH(v){try{

  let out='<span'; if(yesNoM    (v)==null)out+=' class=" e" title="'+browser.i18n.getMessage('yesNo')     +'"'; out+='>'+v+'</span>'; return out;

}catch(ex){err(ex);}return null;}



function trueFalseH(v){try{

  let out='<span'; if(trueFalseM(v)==null)out+=' class=" e" title="'+browser.i18n.getMessage('trueFalse') +'"'; out+='>'+v+'</span>'; return out;

}catch(ex){err(ex);}return null;}



function clearH(v){try{

  let out='<span'; if(clearM    (v)==null)out+=' class=" e" title="'+browser.i18n.getMessage('clearError')+'"'; out+='>'+v+'</span>'; return out;

}catch(ex){err(ex);}return null;}



function symbolH2(line){
  let l=[];
  if(line!=null) {
    line.split(";").forEach(k=>{

      try{
        let v=null;
        let i=k.indexOf(':');
        if(i!=-1){
          v=k.substring(i+1);
          k=k.substring(0,i);
        }
        let kv={k,v};

        k=k.trim();

        if('color'      ==k
         ||'colorActive'==k){

          kv.ev=false;

          if(v!=null){
            v=v.trim();
            if(v.length==0){}
            else if(v.startsWith('#')){  if(!colorHex (v)){ kv.ev=true; kv.evm=browser.i18n.getMessage('colorHexError'); }}
            else                      { if(!colorName(v)){ kv.ev=true; kv.evm=browser.i18n.getMessage('colorNameUnknown'); }}
          }

        }
        else if('shape'==k){

          kv.ev=false;
          if(v!=null){
            v=v.trim();
            if(v.length>0 && 'square'!=v){
              kv.ev=true;
              kv.evm=browser.i18n.getMessage('shapeError');
            }
          }

        }
        else{
          if(''==k && v==null){
          }
          else {
            kv.ek=true; kv.ekm=browser.i18n.getMessage('symbolError');
            kv.ev=true; kv.evm=kv.ekm;
          }
        }

        l.push(kv);
      }
      catch(ex){err(ex);}
    });
  }

  return l;
}



function symbolH(v){
  let out='';
  let l=symbolH2(v);
  let count=l.length;
  l.forEach(kv=>{
    if(kv.k!=null){

      out+='<span class="k2';
           if(kv.ek)out+=' e " title="'+kv.ekm;
      else if(kv.ev)out+=' u " title="'+kv.evm;
      out+='">'+kv.k+'</span>';

      if(kv.v!=null){

        out+=':<span class="v2';
        if(kv.ev)out+=' e " title="'+kv.evm;
        out+='">'+kv.v+'</span>';
      }
    }
    count--;if(count>0) out+=';';
  });
  return out;
}



function testUrlH(v){

  let obj=testUrlM(v);

  let keyErr=null;

  let out='<span class="d';
  if (obj.urlE){
    keyErr=browser.i18n.getMessage('testUrlProtocolError');
    out+=' e" title="'+keyErr;
  }
  out+='">'+obj.url+'</span>';

  if(obj.modeStr!=null){
    out+=' <span class="';
    if(obj.mode==-1){
      let err1=browser.i18n.getMessage('PossibleData');
      let err2=browser.i18n.getMessage('testUrlModeError');

      keyErr=err1+ (keyErr!=null ? + "URL ": "")+err2;

      out+=' e" title="'+err1+err2;
    }
    out+='">'+obj.modeStr+'</span>';
  }

  let out2='';
  if(keyErr!=null) out2+=' u" title="'+keyErr;
  out2+='">testUrl</span>='+out;

  return out2;

}



function map2html(map){try{
  let out='';
  let d={};
  for(let i=0,l=map.length;i<l;i++){
    let kv=map[i];
    let k=kv.k;
    let v=kv.v;

    if(v==null){
           if(l.length==0)     out+=LF;
      else if(k.charAt(0)=='#')out+='<span class="c">'+k+'</span>'+LF;
      else {
        out+='<span class=u title="'+browser.i18n.getMessage(
          (unsupported.indexOf(k)!=-1 || k.startsWith('config:')) ? 'unsupported'
        : k=='symbol'                                             ? 'symbolError'
                                                                  : 'keywordUnknown')+'">'+k+'</span>'+LF;
      }
    }
    else{
      if(typeof v==='object'){

        let out2='';
        let w={};
        let count=0;
        for(let i2=0,l2=v.length;i2<l2;i2++){
          let obj2=v[i2];
          let k2=obj2.k;
          if(k2.length>0){
            let v2=obj2.v;

            out2+=SPACE+'<span class="';
            if(k2.charAt(0)=='#')out2+='c">'+k2+'</span>';
            else{
              let j;
              out2+='k';
              if(v2==null || v2.length==0){
                let m=null;

                if(w[k2]!=null)m='keywordMultiple';
                else if(keyAll.indexOf(k2)!=-1){

                  m=k2=='active'  ? 'yesNo'
                  : k2=='proxyDNS'? 'trueFalse'
                  : k2=='clear'   ? 'clearError'
                  : k2=='symbol'  ? 'symbolError'
                                  : 'valueMissing';
                }
                else m=unsupported.indexOf(k2)!=-1 || k2.startsWith('config:') ? 'unsupported'
                                                                               : 'keywordUnknown';

                out2+=' u'; if(m!=null) out2+='" title="'+browser.i18n.getMessage(m); out2+='">'+k2+'</span>=';
              }
              else if((j=schemeP.indexOf(k2))!=-1){
                let err=null,err2=null;
                     if(w[k2]!=null)err='keywordMultiple';
                else if('System'==k
                     || 'Auto'  ==k
                                    ){err='errSystemWithX';err2=k2;}
                else if(hasScheme(w,noP))err='onlyProxyScript';

                count++;

                out2+=hostH(k2,v2,schemePPort[j],err,err2);
              }
              else if('all'==k2){
                let err=null,err2=null;
                     if(w[k2]!=null)err='keywordMultiple';
                else if('System'==k
                     || 'Auto'  ==k
                                    ){err='errSystemWithX';err2=k2;}
                else if(hasScheme(w,noAll))err='onlyProxyScript';

                count++;

                out2+=hostH(k2,v2,80,err,err2);
              }
              else if('socks'==k2){
                let err=null,err2=null;
                if(w[k2]!=null)err='keywordMultiple'
                else if('System'==k
                     || 'Auto'  ==k
                                    ){err='errSystemWithX';err2=k2;}
                else if(hasScheme(w,noS5))err='onlyProxyScript';

                count++;

                out2+=hostH(k2,v2,1080,err,err2);
              }
              else if('socks4'==k2){
                let err=null,err2=null;
                     if(w[k2]!=null)err='keywordMultiple';
                else if('System'==k
                     || 'Auto'  ==k
                                    ){err='errSystemWithX';err2=k2;}
                else if(hasScheme(w,noS4))err='onlyProxyScript';

                count++;

                out2+=hostH(k2,v2,1080,err,err2);
              }
              else if('noProxy'==k2){
                let err=null,err2=null;
                     if(w[k2]!=null)err='keywordMultiple';
                else if('System'==k
                     || 'Auto'  ==k
                                    ){err='errSystemWithX';err2=k2;}
                else if(w.url!=null)err='onlyProxyScript';

                out2+=noProxyH(v2,err,err2);
              }
              else if('url'==k2){
                let err=null,err2=null;
                     if(w[k2]!=null)err='keywordMultiple';
                else if('System'==k
                     || 'Auto'  ==k
                                    ){err='errSystemWithX';err2=k2;}
                else if(hasScheme(w,noUrl))err='onlyProxyScript';
                else if(!v2.startsWith('http://')
                     && !v2.startsWith('https://')
                     && !v2.startsWith('ftp://')
                     && !v2.startsWith('file'))err='errScriptUrl';

                count++;

                if(err!=null)out2+=' e" title="'+browser.i18n.getMessage(err,err2);
                out2+='">url</span>=';if(v2!=null)out2+=v2;
              }

              else if('testUrl'==k2)out2+=testUrlH(v2);

              else if(keys.indexOf(k2)!=-1){

                v2=k2=='active'  ? yesNoH    (v2)
                  :k2=='proxyDNS'? trueFalseH(v2)
                  :k2=='clear'   ? clearH    (v2)
                  :k2=='symbol'  ? symbolH   (v2)
                                 :            v2;

                if(w[k2]!=null)out2+=' e';
                out2+='">'+k2+'</span>=';if(v2!=null)out2+=v2;
              }
              else{

                out2+=' u" title="'+browser.i18n.getMessage(unsupported.indexOf(k2)!=-1 || k2.startsWith('config:') ? 'unsupported'
                                                                                                                    : 'keywordUnknown')+'">'+k2+'</span>';
                if(v2!=null)out2+='='+'<span class=uv>'+v2+'</span>';
              }
            }
            w[k2]=' ';
          }
          out2+=LF;

        }

        out+='[<span class="n';

        if(d[k]!=null                  )out+=' u" title="'+browser.i18n.getMessage('nameMultiple');

        else if('System'==k
             || 'Auto'  ==k
                            ){
          if(out2.indexOf(' e"')!=-1)out+=' u" title="'+browser.i18n.getMessage('error');

        }
        else if(count==0               )out+=' u" title="'+browser.i18n.getMessage('noProxyConfiguration');

        else if(out2.indexOf(' e"')!=-1)out+=' u" title="'+browser.i18n.getMessage('error');

        out+='">'+k+'</span>'+LF
            +out2
            +']'+LF;
        d[k]='';
      }
      else if('testUrl'==k)out+='<span class="k'+testUrlH(v)+LF;

      else if('symbol' ==k)out+='<span class=k>'+k+'</span>='+symbolH (v)+LF;

      else out+='<span class=u title="'+browser.i18n.getMessage('unsupported')+'">'+k+'</span>=<span class=uv>'+v+'</span>'+LF;
    }
  }

  return out;

}catch(ex){err(ex);}}



function info(hasError, withTooltip){try{

  let message=' ';
  if(hasError){
    message = "<span class='error'>"+browser.i18n.getMessage('error')+"</span>";

    if(withTooltip) message+=":&nbsp;"+browser.i18n.getMessage('errorInfo');
  }

  setHtml(infoT, message);

}catch(ex){err(ex);}}



function save2(data){try{

  if(data.map!=null)setHtml(settingT, map2html(data.map));

  saveB.disabled=true;

}catch(ex){err(ex);}}



function save(){try{

  browser.runtime.sendMessage({save:settingT.innerText.trim()}).then(save2,save2);

}catch(ex){err(ex);}}



function syntax(t){try{

  let map=text2map(t);

  let x=map2work(map);

  info(x==null || x.e, false);

  return map;

}catch(ex){err(ex);}}



function change(e){try{

  if(e.defaultPrevented)return;

  switch(e.key){
    case "ArrowDown":
    case "ArrowUp":
    case "ArrowLeft":
    case "ArrowRight":
    case "Shift":
    case "Control":
    case "OS":
    case "ContextMenu":
    case "CapsLock":
    case "Insert":
    case "Home":
    case "End":
    case "PageDown":
    case "PageUp":
    case "F1":
    case "F2":
    case "F3":
    case "F4":

    case "F6":
    case "F7":
    case "F8":
    case "F9":
    case "F10":
    case "F11":
    case "F12":

    return;
  }

  let map=syntax(settingT.innerText.trim());
  let textNew=map2text(map);

  if(text==textNew)saveB.setAttribute('disabled','disabled');
  else             saveB.removeAttribute('disabled');

  e.preventDefault();
}catch(ex){err(ex);}}



function init(data){try{

  text=data.text;
  let map=syntax(text);
  setHtml(settingT, map2html(map));

  settingT.addEventListener('keyup',change,true);

}catch(ex){err(ex);}}



function setting(){

  settingT=document.getElementById('setting');
  infoT=document.getElementById('info');

  let b=document.getElementById('help');
  b.innerText=browser.i18n.getMessage('help');
  b.addEventListener('click',()=>{

    browser.tabs.create({url:browser.i18n.getMessage('helpUrl')});
  });

  b=document.getElementById('syntax');
  b.innerText=browser.i18n.getMessage('syntax');
  b.addEventListener('click',()=>{

    let map=text2map(settingT.innerText);

    let x=map2work(map);
    info(x==null || x.e, true);

    setHtml(settingT, map2html(map));

  });

  saveB=document.getElementById('save');
  saveB.innerText=browser.i18n.getMessage('save');
  saveB.addEventListener('click',save);

  document.getElementById('noteTitle').innerText=   browser.i18n.getMessage('noteTitle');
  setHtml(document.getElementById('note'),          browser.i18n.getMessage('note'));

  setHtml(document.getElementById('adChromeTitle'), browser.i18n.getMessage('adChromeTitle'));
  setHtml(document.getElementById('adChrome'),      browser.i18n.getMessage('adChrome'));

  browser.storage.sync.get('text').then(init,err);

}



function incognitoInfo(isAllowed){try{

  if(isAllowed)setting();
  else {

    let text=document.getElementById('incognito');
    setHtml(text, browser.i18n.getMessage('incognito'));

    text.setAttribute('style','display:block');

    document.getElementById('main').setAttribute('style','display:none');

  }

}catch(ex){err(ex);}}

var isInit=true;
document.addEventListener('DOMContentLoaded',()=>{try{

  if(isInit){isInit=false;

    document.title=browser.i18n.getMessage('appTitleLong');

    document.querySelector("link[rel='alternate']").href=browser.i18n.getMessage('feedUrl')

    let b=document.getElementById('headline');
    b.setAttribute('href',browser.i18n.getMessage('homepageUrl'));
    b.setAttribute('title',browser.i18n.getMessage('appTitleLong'));

    document.getElementById('title').innerText=browser.i18n.getMessage('settingTitle');

  browser.extension.isAllowedIncognitoAccess().then(incognitoInfo);

  }

}catch(ex){err(ex);}});