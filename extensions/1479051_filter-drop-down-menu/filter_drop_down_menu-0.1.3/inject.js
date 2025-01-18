"use strict";

(function(n) {
  if(n && "htmlFor" in n) {  //<label>
    n = n.getElementsByClassName("select");
    if(n[0]) n = n[0];
  }

  for(let i = 6; (i >= 0) && n; i--) {
    if("options" in n && "selectedIndex" in n) {

      let rand = Math.round(Math.random()*100000);
      n.setAttribute("data-filterid", rand);

      chrome.runtime.sendMessage({
        select: {
          id: rand,
          options: Array.prototype.map.call(n.options, item => item.text.toLowerCase()),
          filter: n.getAttribute("data-filterby") || ""
        }
      });

      break;
    }
    n = n.parentNode;
  }

})(document.activeElement);

function handleFilter(id, selectFilter) {
  let n = document.querySelector(`select[data-filterid="${id}"]`);
  if(n) {
    selectFilter = decodeURIComponent(selectFilter);
    n.setAttribute("data-filterby", selectFilter);

    if(selectFilter) {
      selectFilter = selectFilter.replace(/\n/g, "").replace(/\|\|/g, "\n").split("|").map(s => s.replace(/\n/g, "|"));
      selectFilter = selectFilter.map(s => [s.substr(0, 2), s.substr(2)]);

      let filterLen = selectFilter.length;

      for(let i = n.options.length - 1; i >= 0; i--) {
        let o = n.options[i];
        let str = o.text.toLowerCase();
        let pass = true;

        for(let j = 0; j < filterLen; j++) {
          if(!pass) break;
          switch(selectFilter[j][0]) {
            case "cn": if(str.indexOf(selectFilter[j][1]) < 0) pass = false; break;
            case "nc": if(str.indexOf(selectFilter[j][1]) >= 0) pass = false; break;

            case "bw": if(str.indexOf(selectFilter[j][1]) !== 0) pass = false; break;
            case "nb": if(str.indexOf(selectFilter[j][1]) === 0) pass = false; break;

            case "ew": if(str.substr(-selectFilter[j][1].length) !== selectFilter[j][1]) pass = false; break;
            case "ne": if(str.substr(-selectFilter[j][1].length) === selectFilter[j][1]) pass = false; break;
          }
        }

        if(pass) {        
          o.removeAttribute("filter-hide");
        } else {
          o.setAttribute("filter-hide", "");
        }
      }
      
    } else {
      n.querySelectorAll("*[filter-hide]").forEach(n => n.removeAttribute("filter-hide"));
    }
  }
}