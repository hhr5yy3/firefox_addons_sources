var main;
if(main==null)main=chrome.extension.getBackgroundPage().main;
exlib.loadPrefs=function(name,def){
  var o=main.localStorage[name];
  if(o==null){
    if(def)o={};
    else return null;
  }
  if(def){
    for(var i in def){
      if(typeof o[i]=="undefined")o[i]=def[i];
    }
  }
  return o;
}
exlib.savePrefs=function(name,o){
  main.setLocalStorage(name,o);
}

exlib.loadAccounts=function(){
  if(main.localStorage["s"]==null)return [];
  var key=main.localStorage["s"]+"app";
  var ac=main.localStorage["accounts"];
  if(ac==null)return [];
  var accounts=JSON.parse(JSON.stringify(ac));//clone
  for(var i=0;i<accounts.length;i++){
    var o=accounts[i];
    var data=AesCtr.decrypt(o.data,key,256);
    data=data.split("\t");
    if(data.length!=3)continue;
    o.id=data[0];
    o.user=data[1];
    o.password=data[2];
    o.noPwd=o.password=="";
    delete o.data;
    /////////////////////////////////
    o.showFolders=true;
    /////////////////////////////////
    ////delete later/////////////////
    if(o.includeSpam===true)o.includeSpam=2;
    /////////////////////////////////
  }
  return accounts;
}
exlib.saveAccounts=function(accounts){
  if(main.localStorage["s"]==null){
    main.localStorage["s"]=Math.random().toString().substring(2);
    main.setLocalStorage("s",main.localStorage["s"]);
  }
  var key=main.localStorage["s"]+"app";
  for(var i=0;i<accounts.length;i++){
    var o=accounts[i];
    o.data=AesCtr.encrypt(o.id+"\t"+o.user+"\t"+o.password,key,256);
    delete o.id;
    delete o.user;
    delete o.password;
    ////delete later/////////////////
    if(o.includeSpam===true)o.includeSpam=2;
    /////////////////////////////////
  }
  main.setLocalStorage("accounts",accounts);
}

exlib.loadUserscript=function(id){
  var s=main.localStorage["scripts."+id];
  return s;
}
exlib.saveUserscript=function(id,s){
  main.setLocalStorage("scripts."+id,s);
}