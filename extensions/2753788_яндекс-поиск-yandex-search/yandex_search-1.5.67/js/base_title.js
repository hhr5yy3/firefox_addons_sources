
//
// Удаление из заголовка постфикса типа " - Google Search"
//

var separator = " — Яндекс:";
var pieces = document.title.split(separator);

if (pieces.length < 2) {
    separator = " — Yandex:";
    pieces = document.title.split(separator);       
};

if (pieces.length > 1) 
    try { 
        document.title = document.title.substring(0, document.title.length - pieces.pop().length - separator.length); 
    }
    catch(e) { }
