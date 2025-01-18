function dout(s){
	console.info(s);
  if(s.stack)console.info(s.stack);
}
function $(id){
  return document.getElementById(id);
}

var exlib;
if(!exlib)exlib={}
exlib.i18nString=function(s){
  return chrome.i18n.getMessage(s);
}

exlib.asyncCount=0;
exlib.loadFile=function(name,func,obj) { //function(data,obj,isLast)
  ++exlib.asyncCount;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange=function(e){
    if(xhr.readyState==4){
      --exlib.asyncCount;
      if(func)func(xhr.status==200?xhr.responseText:null,obj,exlib.asyncCount==0);
    }
  };
  xhr.open('GET', name.indexOf("://")>=0?name:chrome.extension.getURL(name), true);
  xhr.send(null);
}

exlib.loadJSON=function(name,func) {
  exlib.loadFile(name,function(data,xhr){
    if(func)func(JSON.parse(data));
  });
}
