


var g = document.body; var ee ;
var j; var jk;var jji;
     var kk = document.querySelectorAll('.ytp-menuitem');
     var ssv = Math.round(localStorage.getItem("ssv"));
     if (ssv == 0){ssv= 4};
     kk[ssv].setAttribute('aria-checked', "true");
     kk[ssv].scrollIntoView();

            g.addEventListener('mousedown', e);
        
            function e (e){ 
              jji= Math.round(localStorage.getItem("ssv"));
              if (jji == 0){jji= 4};
              kk[jji].removeAttribute('aria-checked');
            e=e.target;
            ee= e.parentElement;
            ee.setAttribute('aria-checked', "true");
    
            
              
              if(e.innerText ==="Normal"){j=1; jk=3}
              else{
              j = Number(e.innerText);
                if (j<=2){jk=j/0.25 -1 }else{jk=(j-2)/0.1 +7}}

                localStorage.setItem("ssv",jk)
            
            function logTabs(tabs) {
                for (let tab of tabs) {
          
                  browser.tabs.sendMessage(
                    tab.id,
                    {greeting: j}
                  )
                  };
                }
              
              let querying = browser.tabs.query({currentWindow: true});
              querying.then(logTabs);

            }
        
