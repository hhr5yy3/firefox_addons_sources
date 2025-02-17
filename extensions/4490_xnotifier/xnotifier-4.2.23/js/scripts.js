var changed;
function onLoad(){
  $("fileEm").addEventListener("change",function(){handleFile(this.files[0]);});
  $("btn-add").addEventListener("click",onAdd);
  $("btn-delete").addEventListener("click",onDelete);
  $("btn-ok").addEventListener("click",onAccept);
  changed=false;
  
  var scr=exlib.loadPrefs("scripts",{}); 
  for(var i in scr){
    var s=exlib.loadUserscript(i);
    if(s)addScript(i,getScriptVer(s));
  }
}
function getScriptVer(s){
  var fnd=s.match(/var\s+ver\s*=\s*['"](\S+?)['"]/);      
  return fnd?fnd[1]:null;
}
function onAdd(){
  $("fileEm").value="";
  $("fileEm").click();
}
function handleFile(file) { 
  if(!file)return;
  var reader = new FileReader();
  reader.onloadend = function(evt) {
    scriptLoaded(file.name,this.result);
  };
  reader.readAsText(file);
}

function scriptLoaded(url,s){
  var fnd=url.match(/(\S+?)\.js/);
  if(fnd){
    var id=fnd[1];  
    addScript(id,getScriptVer(s));
    parent.addScript(id,s);    
    changed=true;
  }
}
function addScript(id,ver){
  var name=id+(ver?"("+ver+")":"");
  var em=$("list");
  for(var i=0;i<em.childNodes.length;i++){
    var o=em.childNodes[i];
    if(o.value==id)em.removeChild(o);
  }
  em.add(new Option(name,id));
}
function onDelete(){
  var em=$("list");
  if(em.selectedIndex>=0){
    var id=em.value;
    var scr=exlib.loadPrefs("scripts",{});     
    delete scr[id];
    exlib.savePrefs("scripts",scr);  
    main.delLocalStorage("scripts."+id);
    main.delLocalStorage("db."+id);   

    var acc=exlib.loadAccounts();
    var nAcc=[];
    for(var i in acc){
      if(acc[i].id!=id)nAcc.push(acc[i]);
    }     
    exlib.saveAccounts(nAcc);
    var val=exlib.loadPrefs("defaults",{});
    delete val[id];
    exlib.savePrefs("defaults",val);
    em.removeChild(em.childNodes[em.selectedIndex]);
    changed=true;    
  }
}
function onAccept(){
  parent.$("popup").style.display="none";
  if(changed){
    parent.restart();
  }
}
window.addEventListener("load",onLoad);