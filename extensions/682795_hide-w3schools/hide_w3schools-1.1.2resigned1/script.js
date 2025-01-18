var observer = new MutationObserver(function(){    
    var results;
    results = document.getElementsByTagName('a');
    var re = /[a-z]+:\/\/(www.)?w3schools(\w*)/;

    for (var i = 0, l = results.length; i < l; i++) {
        if (results[i] != null && results[i].href.match(re) != null){
            var g = results[i].closest('.g');
            g.parentElement.removeChild(g);
        }
    }

});

var config = { childList: true, attributes: true, characterData: true, subtree: true };

observer.observe(document.body, config);

var results;
results = document.getElementsByTagName('a');
var re = /[a-zA-Z]+:\/\/(www.)?w3schools(\w*)/;

for (var i = 0, l = results.length; i < l; i++) {
    if (results[i] != null && results[i].href.match(re) != null){
        var g = results[i].closest('.g');
        g.parentElement.removeChild(g);
     }
}

