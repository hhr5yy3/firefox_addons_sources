var leaveTags=['SCRIPT','STYLE','TITLE','TEXTAREA','OPTION'], /* we won't scan inside these tags ever */
  
  mergeTags=['EM','I','B','STRONG']; /* we'll merge 2 of these the same if they're leaf elements */
function annotWalk(n,nfOld,nfNew) {
    /* Our main DOM-walking code */
  var c;var nf=!!nfOld,nReal=n,kR=1; if(!nf){
var rShared=false;
for(c=n.firstChild; c; c=c.nextSibling) {
  if(c.nodeType==1) {
    if(c.nodeName=='RUBY') nf=true; else rShared=true
  }
  if(nf&&rShared) { /* put ruby parts in separate span so it can be batched-changed without interfering with event handlers on other elements such as links at same level */
    nf=false; var rubySpan=false; c=n.firstChild;
    while(c) { var c2=c.nextSibling;
      if(!rubySpan && c.nodeType==1 && c.nodeName=='RUBY') {
        rubySpan=document.createElement('span');
        n.insertBefore(rubySpan,c)
      } if(rubySpan) {
        if(c.nodeType!=1 || c.nodeName=='RUBY') {
          n.removeChild(c); rubySpan.appendChild(c)
        } else rubySpan=false
      } c=c2
    }
    break
  }
}if(nf) { nfOld=nReal;n=n.cloneNode(true);nfNew=document.createElement('span');nfNew.className='_adjust0';nfNew.appendChild(n);nfNew.oldHtml=n.outerHTML;kR=document.documentElement.lang.match([/cmn/,/yue/,/^\b$/,/^\b$/,/^\b$/,/^\b$/][document.aType]);if(kR){}else {var zap=function(t){while(1){var r=n.getElementsByTagName(t);if(!r.length)break;r[0].parentNode.removeChild(r[0])}};zap('rt');zap('rp');while(1){var r=n.getElementsByTagName('ruby');if(!r.length)break;r[0].parentNode.replaceChild(document.createTextNode(r[0].innerText),r[0])}}}}
    /* Check for WBR and mergeTags */
    function isTxt(n) { return n && n.nodeType==3 && n.nodeValue && !n.nodeValue.match(/^\s*$/)};
    var c=n.firstChild; while(c) {
      var ps = c.previousSibling, cNext = c.nextSibling;
      if (c.nodeType==1) { if((c.nodeName=='WBR' || (c.nodeName=='SPAN' && c.childNodes.length<=1 && (!c.firstChild || (c.firstChild.nodeValue && c.firstChild.nodeValue.match(/^\s*$/))))) && isTxt(cNext) && isTxt(ps) /* e.g. <span id="page8" class="pageNum">&#160;</span> in mid-word; rm ONLY if non-whitespace text immediately before/after: beware of messing up JS applications */ ) {
        n.removeChild(c);
        cNext.previousSibling.nodeValue+=cNext.nodeValue;
        n.removeChild(cNext); cNext=ps}
      else if(cNext && cNext.nodeType==1 && mergeTags.indexOf(c.nodeName)!=-1 && c.nodeName==cNext.nodeName && c.childNodes.length==1 && cNext.childNodes.length==1 && isTxt(c.firstChild) && isTxt(cNext.firstChild)){
        cNext.firstChild.nodeValue=c.firstChild.nodeValue+cNext.firstChild.nodeValue;
        n.removeChild(c)} }
      c=cNext}

    /* Recurse into nodes, or annotate new text */
    c=n.firstChild; while(c){
      var cNext=c.nextSibling;
      switch(c.nodeType) {
        case 1:
          if(leaveTags.indexOf(c.nodeName)==-1 && c.className!='_adjust0') {annotWalk(c,nfOld,nfNew);
          } break;
        case 3: {var cnv=c.nodeValue.replace(/\u200b/g,'').replace(/\B +\B/g,'');
            if(!cnv.match(/^\s*$/)) {
                (function(n,nfOld,nfNew,c,cnv){
                    var newNode=document.createElement('span');
                    newNode.className='_adjust0';if(!nfNew)newNode.oldTxt=cnv;
    var inline=["SPAN","STRONG","EM","B","I","U","FONT","A","RUBY","RB","RP","RT"]; function cStop(p){return !p||(p.nodeType==1&&inline.indexOf(p.nodeName)==-1)} function cNorm(p){return unescape(encodeURIComponent(p.nodeValue.replace(/\s+/g,'').replace(/^[+*0-9]*$/,'')))} /* omit simple footnote link */
    function contextLeft(p) {
      var accum=""; while(accum.length<15) {
        while(!p.previousSibling){p=p.parentNode;if(cStop(p))return accum}
        p=p.previousSibling;if(cStop(p))return accum;
        while(p.nodeType==1&&p.lastChild){if(inline.indexOf(p.nodeName)==-1)return accum; else if(p.nodeName=="RT"||p.nodeName=="RP") break; p=p.lastChild}
        if(p.nodeType==3) accum=cNorm(p)+accum
      } return accum }
    function contextRight(p) {
      var accum=""; while(accum.length<15) {
        while(!p.nextSibling){p=p.parentNode;if(cStop(p))return accum}
        p=p.nextSibling;if(cStop(p))return accum;
        while(p.nodeType==1&&p.firstChild){if(inline.indexOf(p.nodeName)==-1)return accum; else if(p.nodeName=="RT"||p.nodeName=="RP") break; p=p.firstChild}
        if(p.nodeType==3) accum+=cNorm(p)
      } return accum }
                    chrome.runtime.sendMessage({'t':cnv,'l':contextLeft(c),'r':contextRight(c)},(function(nv){
                        if(nv && (nv!=cnv || nv.trim()!=cnv.trim())) {
                            try {
                                for(const t of new DOMParser().parseFromString('<span> '+nv+' </span>','text/html').body.firstChild.childNodes) newNode.appendChild(t.cloneNode(true));
                                var a=newNode.getElementsByTagName('ruby'),i; for(i=0; i < a.length; i++) if(a[i].title) (function(e){e.addEventListener('click',(function(){alert(e.title)}))})(a[i])
                            } catch(err) { console.log(err.message) }
                            try{n.replaceChild(newNode, c)}catch(err){ /* already done */ }
                            if(nfOld) {
try{nfOld.parentNode.replaceChild(nfNew,nfOld)}catch(err){ /* already done */ }
    /* Fix damage we did to existing ruby, keeping new titles */
      var a=nfNew?nfNew.getElementsByTagName('ruby'): /* not sure how it gets here when nfOld is non-null */ [],i;
      for(i=0; i < a.length; i++) {
        if(i && a[i].previousSibling==a[i-1]) a[i].parentNode.insertBefore(document.createTextNode(" "),a[i]);
        var t=[],chgFmt=0;
        while(1) {
          var r=a[i].getElementsByTagName('ruby');
          if(!r.length) break; r=r[0];
          var tt=r.getAttribute('title');
          if(tt) t.push(tt);
          var rl=r.lastChild;while(rl.previousSibling&&rl.nodeName!="RB"){rl=rl.previousSibling;}
          chgFmt=r.firstChild.nodeName=="RT";
          r.parentNode.replaceChild(document.createTextNode(rl.innerText),r);
        }
        t = t.join(' || '); if(t){a[i].setAttribute('title',t);(function(e){e.addEventListener('click',(function(){alert(e.title)}))})(a[i])}
        if(chgFmt) { /* patch up 3-line */ var rt=document.createElement("rt"); rt.appendChild(document.createTextNode(t.replace(/^to |^[(][^)]*[)] | [(][^)]*[)]|[;/].*/g,""))); a[i].insertBefore(rt,a[i].firstChild); var v=a[i].lastChild;if(v.nodeName=="RT"){a[i].removeChild(v);v.nodeName="RB";a[i].insertBefore(v,a[i].firstChild.nextSibling)} }
      }
}
                        }
                    }))})(n,nfOld,nfNew,c,cnv)}}}c=cNext}}
document.annotWalkOff=1;
chrome.runtime.sendMessage(true,function(r){if(r!=-1){document.aType=r;annotWalk(document)}document.annotWalkOff=(r==-1)});
new window.MutationObserver(function(mut){var i,j;if(!document.annotWalkOff){document.annotWalkOff=1;for(i=0;i<mut.length;i++)if(mut[i].addedNodes)for(j=0;j<mut[i].addedNodes.length;j++){var n=mut[i].addedNodes[j],m=n,ok=1;while(ok&&m&&m!=document.body){ok=m.className!='_adjust0';m=m.parentNode}if(ok)annotWalk(n)}window.setTimeout(function(){document.annotWalkOff=0},10)}}).observe(document.body,{childList:true,subtree:true});
