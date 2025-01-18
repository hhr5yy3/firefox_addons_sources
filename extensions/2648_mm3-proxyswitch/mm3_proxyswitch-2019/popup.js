"use strict";



function onOff(proxy){
  try{
    browser.runtime.sendMessage({onOff:proxy}).catch(err);
  }
  catch(ex){err(ex);}

  window.close();
}



function change(proxy){
  try{
    browser.runtime.sendMessage({change:proxy}).catch(err);
  }
  catch(ex){err(ex);}

  window.close();
}



function goSetting(){
  try{
    browser.runtime.openOptionsPage();
  }
  catch(ex){err(ex);}

  window.close();
}



function init(data){try{

  let proxys=data._proxys;
  if(proxys==null || proxys.length==0){
    goSetting();
    return;
  }
  let setting=data._setting;

  let sName=data.select;
  let sProxy=null;

  let list=document.createElement('ul');

  let hr=document.createElement('li');
  hr.setAttribute('class','empty');
  list.appendChild(hr);

  let s=document.createElement('li');
  s.appendChild(document.createTextNode(browser.i18n.getMessage('active')));
  list.appendChild(s);

  hr=document.createElement('li');
  hr.setAttribute('class','hr');
  list.appendChild(hr);

  proxys.forEach(proxy=>{

    let i=document.createElement('li');
    i.setAttribute('title',proxy2text(proxy,'').replace("<", "‹"));

    if(proxy.n==sName){
      sProxy=proxy;
      i.setAttribute('class','l ' +(data.active ? "on" : "off"));

      let l={};
      symbolW(l,setting);
      symbolW(l,  proxy);

      let c=null;
      if(data.active)c=l.colorActive;
      else           c=l.color;
      if(c!=null)i.setAttribute('style','border-left-color:'+c);

      i.addEventListener('click',()=>{onOff(sProxy);});
    }
    else{
      i.setAttribute('class','l');
      i.addEventListener('click',()=>{change(proxy);});
    }

    i.appendChild(document.createTextNode(proxy.n));

    list.appendChild(i);
  });

  if(sProxy==null)s.setAttribute('class','icon activeOff disable');
  else{
    s.setAttribute('title',sName);
    s.addEventListener('click',()=>{onOff(sProxy);});

    s.setAttribute('class','icon '+(sProxy!=null && data.active ? 'activeOn' : 'activeOff'));
  }

  hr=document.createElement('li');
  hr.setAttribute('class','hr');
  list.appendChild(hr);

  s=document.createElement('li');s.setAttribute('class','icon setting');
  s.addEventListener('click',goSetting);
  s.appendChild(document.createTextNode(browser.i18n.getMessage('setting')));
  list.appendChild(s);

  hr=document.createElement('li');
  hr.setAttribute('class','empty');
  list.appendChild(hr);

  document.getElementsByTagName('body')[0].appendChild(list);

}catch(ex){err(ex);}}

document.addEventListener('DOMContentLoaded',()=>{try{

  browser.runtime.sendMessage({get:'all'}).then(init,err);

}catch(ex){err(ex);}});