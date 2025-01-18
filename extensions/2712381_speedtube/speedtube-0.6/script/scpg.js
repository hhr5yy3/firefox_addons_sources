"use strict";

browser.runtime.onMessage.addListener(request => {
    hv= Number(request.greeting);
    pbr=hv;
  localStorage.setItem("pbr", hv);
  ptpp();
});
var i;
var hv;var f = 0;var gggh; var hjk; var gojn=0; var f =0;
var pbr =localStorage.getItem("pbr");

const newDivv = document.createElement("div");
            newDivv.id = "toch";
            newDivv.style.display="flex";
           newDivv.style.position = "absolute";
           newDivv.style.width="25px";
           newDivv.style.height="25px";
           newDivv.style.top="15%";
           newDivv.style.left="5%";
           newDivv.style.cursor= "pointer";
           newDivv.style.backgroundColor="rgba(145, 145, 145, 0.36)";
           newDivv.style.userSelect = "none"

          


const newDiv = document.createElement("div");
            newDiv.id = "menu";
           newDiv.style.display= "none";
           newDiv.style.position= "absolute";
           newDiv.style.top="15%";
           newDiv.style.backgroundColor="#f00"
           newDiv.style.width="100px";
           newDiv.style.height="100px";
           newDiv.style.overflow ="auto";
            newDiv.style.cursor= "pointer";
            newDiv.style.userSelect = "none"

           newDivv.addEventListener('mouseup',gkj);
           newDiv.addEventListener('mouseup',gkj2);

           function gkj(){
            newDivv.style.display= "none";
            newDiv.style.display= "flow-root";
           }

           function gkj2(e){
            newDiv.style.display= "none";
            newDivv.style.display = "flex";
            
               e=e.target; 
               pbr= Number(e.textContent);
            ptpp();
           }
    for(i=0;i<28;i++){
      let gggh = document.createElement("div")
         gggh.textContent=f.toFixed(1);
          if(f>=2){f+=0.1}else{f+=0.25;}
            newDiv.append(gggh)
        }

if(pbr===null){pbr= 3;}
ptpp();

function ptpp(){
    if(pbr==5){}else{
var matches331 = document.querySelectorAll("video");

if(matches331.length>0){
for(i=0;i<matches331.length;i++){
    matches331[i].playbackRate = pbr;
    matches331[i].addEventListener('playing',otp);
    matches331[i].addEventListener('loadstart',otp);

}}

var matches334 = document.querySelectorAll("iframe");
if(matches334.length>0){
matches334.forEach(function(userItem) {
    var matches33421 = userItem.contentDocument.querySelectorAll("iframe");
    var matches33 = userItem.contentDocument.querySelectorAll("video");
    if(matches33.length>0){
    for(i=0;i<matches33.length;i++){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        matches33[i].playbackRate = pbr;
        matches33[i].addEventListener('playing',otp);
        matches33[i].addEventListener('loadstart',otp);
    }}
    if(matches33421.length>0){
    matches33421.forEach(function(userItem) {
        matches33421 = userItem.contentDocument.querySelectorAll("iframe");
        matches33 = userItem.contentDocument.querySelectorAll("video");
        if(matches33.length>0){
        for(i=0;i<matches33.length;i++){
            matches33[i].playbackRate = pbr;
            matches33[i].addEventListener('playing',otp);
            matches33[i].addEventListener('loadstart',otp);
        }}
        if(matches33421.length>0){
        var matches33422 = userItem.contentWindow.document.querySelectorAll("iframe");
        matches33422.forEach(function(userItem) {
            var matches33421 = userItem.contentDocument.querySelectorAll("iframe");
             matches33 = userItem.contentDocument.querySelectorAll("video");
            if(matches33.length>0){
            for(i=0;i<matches33.length;i++){
                matches33[i].playbackRate = pbr;
                matches33[i].addEventListener('playing',otp);
                matches33[i].addEventListener('loadstart',otp);
            }}
            if(matches33421.length>0){
            var matches33423 = userItem.contentWindow.document.querySelectorAll("iframe");
            matches33423.forEach(function(userItem) {
                 matches33421 = userItem.contentDocument.querySelectorAll("iframe");
                 matches33 = userItem.contentDocument.querySelectorAll("video");
                if(matches33.length>0){
                for(i=0;i<matches33.length;i++){
                    matches33[i].playbackRate = pbr;
                    matches33[i].addEventListener('playing',otp);
                    matches33[i].addEventListener('loadstart',otp);
                }}
              });

          }});
        
        }});
    
    }});


}}}

function otp(e){
    var matches = e.target;
    
    
        if(e.type == "playing"){
           hjk = matches.parentNode;
           hjk= hjk.parentNode;
           try{
           var marh = hjk.getElementById('toch');}
           catch{
           hjk.append(newDivv,newDiv);}
        }
        
        if(e.type == "loadstart"){
        ptpp();
        }
    matches.playbackRate = pbr;
}



