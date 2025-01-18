function updateClip() {chrome.runtime.sendMessage(null,(function(cr){
        var v=document.getElementById("cr");
        v.textContent = ''; // clear
        if(cr) {
            try {
                for(const t of new DOMParser().parseFromString('<span> '+cr+' </span>','text/html').body.firstChild.childNodes) v.appendChild(t.cloneNode(true));
                var a=v.getElementsByTagName('ruby'),i; for(i=0; i < a.length; i++) if(a[i].title) (function(e){e.addEventListener('click',(function(){alert(e.title)}))})(a[i])
            } catch(err) { console.log(err.message) }
        }
    }))}
function update() {
chrome.runtime.sendMessage(false,function(r) {var i;for(i=-3;i;i++){var e=document.getElementById(""+i);if(i==-r)e.setAttribute('disabled','disabled');else e.removeAttribute('disabled')}});
chrome.runtime.sendMessage(true,function(r) {for(var i=0;i<6;i++){var e=document.getElementById(""+i);if(i==r)e.setAttribute('disabled','disabled');else e.removeAttribute('disabled')}});
chrome.runtime.sendMessage('g',function(r) {document.getElementById("kc").options.selectedIndex=r});document.getElementById("kc").addEventListener("change",function(){chrome.runtime.sendMessage(document.getElementById("kc").options.selectedIndex+.91,function(){})});
if(document.getElementById("cr").firstChild) updateClip()
} update();
document.getElementById("-3").addEventListener("click",function(){chrome.runtime.sendMessage(-3,update)});document.getElementById("-2").addEventListener("click",function(){chrome.runtime.sendMessage(-2,update)});document.getElementById("-1").addEventListener("click",function(){chrome.runtime.sendMessage(-1,update)});document.getElementById("0").addEventListener("click",function(){chrome.runtime.sendMessage(0,update)});document.getElementById("1").addEventListener("click",function(){chrome.runtime.sendMessage(1,update)});document.getElementById("2").addEventListener("click",function(){chrome.runtime.sendMessage(2,update)});document.getElementById("3").addEventListener("click",function(){chrome.runtime.sendMessage(3,update)});document.getElementById("4").addEventListener("click",function(){chrome.runtime.sendMessage(4,update)});document.getElementById("5").addEventListener("click",function(){chrome.runtime.sendMessage(5,update)});document.getElementById("c").addEventListener("click",updateClip)