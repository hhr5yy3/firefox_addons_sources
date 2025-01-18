"use strict";



function err(ex){
  if(ex!=null)console.error(ex,ex.message,browser.runtime.lastError);
  else        console.error(browser.runtime.lastError);
}



function myParseInt(value){try{

  value=value.trim();
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return Number(value);

}catch(ex){err(ex);}return NaN;}



function hostM(host,isProxy,portDef){try{
  let hp={};

  let i=host.lastIndexOf(':');
  if(i!=-1){
    hp.port=host.substring(i+1);

    let em=null,em2=null;

    if(hp.port.length==0){
      if(portDef!=-1)hp.port=portDef;
      else em='notSpecified';
    }
    else{
      let n=myParseInt(hp.port);
           if(isNaN(n)) em='noNumber';
      else if(n<0     ) em='less0';
      else if(n>65535 ){em='largerX'; em2='65535';}
      else hp.port=n;
    }
    if(em!=null){
      hp.e=true;
      hp.ep=browser.i18n.getMessage('port', browser.i18n.getMessage(em,em2));
    }
    host=host.substring(0,i);
  }
  host=host.trim();
  hp.host=host;

  let em=null;
       if(           host.length==0      )em='notSpecified';
  else if(isProxy && host.startsWith("."))em='domainStartDot';
  else if(           host.endsWith("."))em='domainEndDot';
  else if(           host.indexOf(' ')>0
                  || host.indexOf('\t')>0)em='domainSpace';
  if(em!=null){

    hp.e=true;
    hp.eh=browser.i18n.getMessage('domain', browser.i18n.getMessage(em));
  }
  else{
    i=host.lastIndexOf('.');
    if((i!=-1 && !isNaN(myParseInt(host.substring(i+1))))
     ||(i==-1 && !isNaN(myParseInt(host)))){

      hp.m='i';
      let nl=host.split(".");
      let j=nl.length;

      let em=null,em2=null;
      if(( isProxy && j!=4)
       ||(!isProxy && j> 4)){ if(isProxy)em='ipCount4';}
      else{
        host=null;
        for(;j-->0;){
          let n=nl[j].trim();
          if(n.length==0){
            if(isProxy || j>0)em='noNumber';
            break;
          }
          n=myParseInt(n);
               if(isNaN(n)){em='noNumber';        break;}
          else if(n<0     ){em='less0';            break;}
          else if(n>255   ){em='largerX';em2='255';break;}

          else{
            if(host==null)host=""; else host="."+host;
            host=n+host;
          }
        }
        if(em==null) hp.host=host;
      }
      if(em!=null){
        hp.e=true;
        hp.eh=browser.i18n.getMessage('ip', browser.i18n.getMessage(em,em2));
      }

    }
    else hp.m='d';
  }

  return hp;

}catch(ex){err(ex);}}



function noProxyM(hosts){try{

  let l=[];
  let e=false;

  hosts.split(",").forEach(host=>{

    if((host=host.trim()).length>0){
      let hp;

      let i=host.lastIndexOf('/');
      if(i!=-1){
        hp={m:'r'};

        let em=null,em2=null;

        hp.port=host.substring(i+1).trim();
        if(hp.port.length==0)em='notSpecified';
        else{
          let n=myParseInt(hp.port);
               if(isNaN(n)) em='noNumber';
          else if(n<0     ) em='less0';
          else if(n>32    ){em='largerX'; em2='32';}
          else hp.port=n;
        }
        if(em!=null){
          hp.e=true;
          hp.ep=browser.i18n.getMessage('prefixSize',browser.i18n.getMessage(em,em2));
        }

        hp.host=host.substring(0,i).trim();

        em=null,em2=null;
        let nl=hp.host.split(".");
        let j=nl.length;
        if(j!=4)em='ipCount4';
        else{
          for(;j-->0;){
            let n=nl[j].trim();
            if(n.length==0  ){em='notSpecified';      break;}

            n=myParseInt(n);
                 if(isNaN(n)){em='noNumber';          break;}
            else if(n<0     ){em='less0';              break;}
            else if(n>255   ){em='largerX';em2='255';  break;}
          }
        }
        if(em!=null){
          hp.e=true;
          hp.eh=browser.i18n.getMessage('ip', browser.i18n.getMessage(em,em2));
        }
      }
      else{
        hp=hostM(host,false,-1);
        host=hp.host;
        if(hp.eh==null){
          let err=null;
          if(host.charAt(0)=='*'){
            host=host.substring(1);
            if(host.length==0)err='domainOnlyWildcards';
          }
          if(host.indexOf('*')!=-1)err='domainWildcards';

          if(err!=null){
            hp.e=true;
            hp.eh=browser.i18n.getMessage('domain', browser.i18n.getMessage(err));
          }
        }
      }

      if(hp.e)e=true;
      l.push(hp);
    }
  });

  return {l,e};

}catch(ex){err(ex);}}



function yesNoM(v){try{

  if(v.length>0){

    v=v.toLowerCase();

    if('yes'==v || 'true' ==v || 'on' ==v) return 'yes';
    if('no' ==v || 'false'==v || 'off'==v) return 'no';
  }
}catch(ex){err(ex);}return null;}



function trueFalseM(v){try{

  if(v.length>0){

    v=v.toLowerCase();

    if('true' ==v ||'yes'==v) return true;
    if('false'==v || 'no'==v) return false;
  }
}catch(ex){err(ex);}return null;}



function clearM(clear){try{

  if(clear.length>0 && clear.toLowerCase()=='cache') return 'cache';

}catch(ex){err(ex);}return null;}



function text2map(txt){try{

  let lines;
  let row=0;
  let max;

  var is={
    init:function(t){
      lines=t.split('\n');

      max=lines.length;
    },
    readLine:function(){
      if(row==max) return null;
      return lines[row++].trim();
    },
    back:function(){
      row--;
    }
  };
  is.init(txt.trim());

  return load1(is);

}catch(ex){err(ex);}}



function load1(is){try{

  let list=[];

  let line;
  while((line=is.readLine())!=null){
    let length=line.length;

    if(length>=2){
      let c=line.charAt(0);

      if(c=='['){
        line=line.substring(1).trim();
        let l=line.toLowerCase();
             if(l=='auto')   line='Auto';
        else if(l=='system') line='System';
        list.push({k:line,v:load2(is)});
      }
      else if(length>=3 && c!='#'){
        let k,v;
        let i=line.indexOf('=',1);
        if(i>=1){
          k=line.substring(0,i).trim();
          v=line.substring(i+1).trim();
        }
        else{
          k=line;
          v='';
        }
        let kl = k.toLowerCase();
             if(kl=='testurl')           k='testUrl';
        else if(kl.startsWith('config:'))k='config:'+k.substring(7);
        else if(kl.startsWith('style:')) k='style:' +k.substring(6);
        else k=kl;
        list.push({k,v});
      }
      else list.push({k:line});
    }
    else list.push({k:line});
  }

  return list;

}catch(ex){err(ex);}}



function load2(is){try{

  let list=[];

  let line;
  while((line=is.readLine())!=null){
    let length=line.length;
    if(length>=1){
      let c=line.charAt(0);

           if(c==']') return list;
      else if(c=='['){
        is.back();
        return list;
      }
      else if(length>=3 && c!='#'){
        let k,v;
        let i=line.indexOf('=',1);
        if(i>=1){
          k=line.substring(0,i).trim();
          v=line.substring(i+1).trim();
        }
        else{
          k=line;
          v='';
        }

        let kl=k.toLowerCase();
             if(kl=='noproxy')k='noProxy';
        else if(kl=='proxydns')k='proxyDNS';
        else if(kl=='testurl')k='testUrl';
        else if(kl=='ssl')k='https';
        else if(kl=='direct'){k='active'; if(v=='yes')v='no';else if(v=='no')v='yes';}
        else if(kl.startsWith('config:')) k='config:'+k.substring(7).trim();
        else if(kl.startsWith('style:')) k='style:' +k.substring(6).trim();
        else k=kl;

        list.push({k,v});
      }
      else{
        list.push({k:line});
      }
    }
    else{
      list.push({k:''});
    }
  }

  return list;

}catch(ex){err(ex);}}



function map2text(map){try{
  let out='';

  for(let i=0,l=map.length;i<l;i++){
    let kv=map[i];
    let k=kv.k;
    let v=kv.v;

    if(v==null)out+=k+'\n';
    else{
      if(typeof v==='object'){
        out+='['+k+'\n';

        for(let i2=0,l2=v.length;i2<l2;i2++){
          let obj2=v[i2];
          let k2=obj2.k;
          let v2=obj2.v;
          out+='  '+k2; if(v2!=null) out+='='+v2; out+='\n';
        }
        out+=']\n';
      }
      else out+=k+'='+v+'\n';
    }
  }
  return out;

}catch(ex){err(ex);}}

const keys=[
  'proxyDNS',
  'noProxy','active','homepage','clear','symbol'];

const schemeP=['http','https','ftp'];
const schemePPort=[80,443,21];

const schemeS=['socks4','socks'];

const schemeDP=['http','https','ftp','all','socks4','socks'];

const noP  =[                     'all'                 ,'url'];
const noAll=['http','https','ftp'                       ,'url'];
const noS4 =[                                    'socks','url'];
const noS5 =[                           'socks4'        ,'url'];
const noUrl=['http','https','ftp','all','socks4','socks'];

const keyAll=['url',

              'proxyDNS',
                    'http','https','ftp','socks4','socks','all','noProxy','active','homepage','clear','testUrl','symbol'];
const unsupported=[
                  'modifiers','keycode','import'];



function hasScheme(map,test){

  for(let i=test.length;i-->0;){
    if(map[test[i]]!=null) return true;
  }

  return false;
}



function map2work(map){try{

  let p=[];
  let s={};
  let e=false;
  let d={};

  for(let i=0,len=map.length;i<len;i++){
    let kv=map[i];
    let k=kv.k;
    let v=kv.v;

    if(typeof v==='object' && d[k]==null
                                                          ){
      let ok=true;
      let anz=0;
      let w={};

      for(let i2=0,l2=v.length;i2<l2;i2++){
        let kv2=v[i2];
        let k2=kv2.k;
        let v2=kv2.v;

        if(k2.charAt(0)!='#' && v2!=null && v2.length>0){
          if(keyAll.indexOf(k2)==-1){

            if(unsupported.indexOf(k2)!=-1 || k2.startsWith('config:') || k2.startsWith('style:')) continue;

            ok=false;break;
          }

          if(w[k2]!=null){
            ok=false;break;
          }

          let hp=null;

          let j=schemeP.indexOf(k2);

          if(j!=-1){
            if(hasScheme(w,noP)
             || 'System'==k
             || 'Auto'  ==k
             ||(hp=hostM(v2,true,schemePPort[j])).e){
              ok=false;break;
            }
          }
          else if('all'==k2){
            if(hasScheme(w,noAll)
             || 'System'==k
             || 'Auto'  ==k
             ||(hp=hostM(v2,true,80)).e){
              ok=false;break;
            }
          }
          else if('socks4'==k2){
            if(hasScheme(w,noS4)
             || 'System'==k
             || 'Auto'  ==k
             ||(hp=hostM(v2,true,1080)).e){
              ok=false;break;
            }
          }
          else if('socks'==k2){
            if(hasScheme(w,noS5)
             || 'System'==k
             || 'Auto'  ==k
             ||(hp=hostM(v2,true,1080)).e){
              ok=false;break;
            }
          }
          else if('noProxy'==k2){
            if(w.url!=null
             || 'System'==k
             || 'Auto'  ==k
             ||(hp=noProxyM(v2)).e){
              ok=false;break;
            }
            else hp=hp.l;
          }

          else if('url'==k2){
            if(hasScheme(w,noUrl)
             || 'System'==k
             || 'Auto'  ==k
            ){
              ok=false;break;
            }
            else hp=v2;
          }
          else if('active'  ==k2)hp=yesNoM    (v2);
          else if('proxyDNS'==k2)hp=trueFalseM(v2);
          else if('clear'   ==k2)hp=clearM    (v2);
          else hp=v2;

          w[k2]=hp;
          anz++;
        }
      }

      if(ok && (anz>0
              ||(k=='System' && anz==0)
              ||(k=='Auto'   && anz==0))){

        if(ok){
          w.n=k;
          p.push(w);
          d[k]='';
        }
      }

      if(!ok)e=true;
    }

    else if('testUrl'==k){
      s.testUrl=v;
    }
    else if('symbol'==k){
      s.symbol=v;
    }

  }

  return p.length==0 ? null : {e,p,s};

}catch(ex){err(ex);}return null;}



function proxy2text(proxy,tab){try{
  let out='';

  for(let k in proxy){
    if(k!="n"){
      out+=tab+k+'=';
      let v=proxy[k];
      if(v!=null){

        if('noProxy'==k){
          v.forEach(hp=>{
            out+=hp.host;
                 if(hp.m=='r')out+='/'+hp.port;
            else if(hp.port!=null)out+=':'+hp.port;
            out+=' ';
          });
        }
        else if(schemeDP.indexOf(k)!=-1){
          out+=v.host; if(v.port!=null)out+=':'+v.port;
        }
        else out+=v;

        out+='\n';
      }
    }
  }
  return out;

}catch(ex){err(ex);}}



function colorHex(c){try{

  let l=c.length;
  if(l==4 || l==7){
    c=c.substring(1);
    let i=parseInt(c,16);
    let h = i.toString(16);
    c=c.toLowerCase();

    if(h===c) return true;

    h= l==4 ? "000"   .substr(0, 3-h.length)+h
            : "000000".substr(0, 6-h.length)+h;

    return h===c;
  }

}catch(ex){err(ex);}return false;}



function colorName(c){try{

  let testName = /^[A-Za-z]+$/;
  if(testName.test(c)){

    var ele = document.createElement("div");
    ele.style.color = c;

    return c.toLowerCase()==ele.style.color.split(/\s+/).join('').toLowerCase();
  }

}catch(ex){err(ex);}return false;}



function symbolW(l,map){

  if(map!=null){
    let line=map.symbol;
    if(line!=null){

      line.split(";").forEach(k=>{

        try{
          k=k.trim();
          let v=null;
          let i=k.indexOf(':');
          if(i!=-1){
            v=k.substring(i+1).trim(); if(v.length==0)v=null;
            k=k.substring(0,i).trim();
          }

          if('color'      ==k
          || 'colorActive'==k){

            if(v==null)l[k]=null;
            else{

              if(v.startsWith('#')){ if(colorHex (v))l[k]=v;}
              else                   if(colorName(v))l[k]=v;
            }
          }
          else if('shape'==k){
            if(v==null)l[k]=null;
            else{

              if('square'==v)l[k]=v;
            }
          }
        }catch(ex){err(ex);}
      });
    }
  }

}



function testUrlM(url){try{

url=url.replace(/\t/g, " ").replace(/\u00a0/g, " ");

  let modeStr=null;
  let mode=3;

  let i=url.indexOf(' ');
  if(i!=-1){
    modeStr=url.substring(i).trim().toLowerCase();
    url    =url.substring(0, i);

         if(modeStr=='direct')  mode=1;
    else if(modeStr=='proxy')    mode=2;
    else if(modeStr=='both')    mode=3;
    else                        mode=-1;

  }

  let urlLo = url.toLowerCase();
  let urlE=   !urlLo.startsWith("http://")
           && !urlLo.startsWith("https://");

  return {url, urlE, modeStr, mode};

}catch(ex){err('testUrlM',ex);}}