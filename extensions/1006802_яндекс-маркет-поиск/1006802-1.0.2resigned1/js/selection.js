"use strict";
document.addEventListener("mouseup", function(event) {
  chrome.extension.sendRequest(
    { 
      action: "updateContextMenu", 
      text: window.getSelection().toString()
    }
  );
});

(function(settings) {
    settings.affId = 4;
    var script = document.createElement('script');
    script.setAttribute('charset', 'UTF-8');
    var params = [];
    params.push('mbr=true');
    params.push('settings=' + encodeURIComponent(JSON.stringify(settings)));
    var src = 'https://yastatic.net/sovetnik/_/js/sovetnik.min.js?' + params.join('&');
    script.setAttribute('src', src);
    document.body.appendChild(script);
})({
    clid: 2328204,
    applicationName: 'Яндекс Маркет Поиск',
    optInImage: 'https://lh3.googleusercontent.com/vhH7IloRG2U7pew2o1kizfYeGB4m1W7lvKPy3mgnvzedRVyjImrHeAwFTBkklQX4ZAbVS5uAZg=w128-h128-e365'
});