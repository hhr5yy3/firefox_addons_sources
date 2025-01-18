
// @ts-check

(function() {

	const DEBUG = false;


const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

function faviconChange() {
    let str = decodeURI(document.documentURI);

    // Отбрасывание префикса
    if (str.startsWith("http://")) {
        str = str.slice(7);
    };

    if (str.startsWith("https://")) {
        str = str.slice(8);
    };    

    document.body.setAttribute('uri', str);

    let regexp = /(?<=&p=)[0-9]+/gm;
    if (regexp.test(str)) {
        document.body.setAttribute('page', str.match(regexp)[0]);
    };

    let host = document.location.hostname;

    //console.log("host", host);
    document.body.setAttribute('host', host);

    str = str.slice(host.length + 1); // отбрасывание домена и слеша после него

    if ((str.startsWith("search")) || (str.length < 2) || (host=="ya.ru")) {
        var favicon_link_html = document.createElement('link');
        favicon_link_html.rel = 'icon';
        // Сейчас вместо внешней загрузки использую встроенную в плагин иконку
        //favicon_link_html.href = 'https://...';
        /*
        if ((host == "yandex.com") || (host == "yandex.com.tr")) {
            favicon_link_html.href = chrome.extension.getURL('icon/icon-en-96.png');
        } else {
            favicon_link_html.href = chrome.extension.getURL('icon/icon-96.png')
        }
        */

        // @ts-ignore
        favicon_link_html.href = chrome.extension.getURL('icon/icon-96.png')

        favicon_link_html.type = 'image/x-icon';

        try { 
        document.getElementsByTagName('head')[0].appendChild( favicon_link_html ); 
        }
        catch(e) { }
    }

  



}



async function main_function() {
    await pause(700); // через паузу
    faviconChange();
}

// Смена иконки вызывается 2 раза - сразу и через паузу, т.к. на ya.ru сразу затирается и нужна пауза
console.log('favicon.js');
faviconChange();
main_function();

}());