let se;
let style = "11";
const language = window.navigator.userLanguage || window.navigator.language || "ru";

const yandex = {
    name: "Yandex",
    mainAddress : "https://yandex.ru/search",
    imageAddress : "https://yandex.ru/images/search",
    videoAddress : "https://yandex.ru/video/search",
    newsAddress : "https://newssearch.yandex.ru/news/search",
    searchParam : "?text=",
};
const bing = {
    name: "Bing",
    mainAddress : "https://www.bing.com/search",
    imageAddress : "https://www.bing.com/images/search",
    videoAddress : "https://www.bing.com/videos/search",
    newsAddress : "https://www.bing.com/news/search",
    searchParam : "?q=",

};
const yahoo ={
    name: "Yahoo",
    mainAddress : "https://search.yahoo.com/search",
    imageAddress : "https://images.search.yahoo.com/search/images",
    videoAddress : "https://video.search.yahoo.com/search/video",
    newsAddress : "https://news.search.yahoo.com/search",
    searchParam : "?p=",
};
const mail ={
    name: "Mail.ru",
    mainAddress : "https://go.mail.ru/search",
    imageAddress : "https://go.mail.ru/search_images",
    videoAddress : "https://go.mail.ru/search_video",
    newsAddress : "https://go.mail.ru/news",
    searchParam : "?q=",
}
const rambler = {
    name: "Rambler",
    mainAddress : "https://nova.rambler.ru/search",
    imageAddress : "https://images.rambler.ru/search",
    videoAddress : "https://nova.rambler.ru/search",
    newsAddress : "https://news.rambler.ru/search/",
    searchParam : "?query=",
}
const aol = {
    name: "Aol.",
    mainAddress : "https://search.aol.com/aol/search",
    imageAddress : "https://search.aol.com/aol/image",
    videoAddress : "https://search.aol.com/aol/video",
    newsAddress : "https://search.aol.com/aol/search",
    searchParam : "?q=",
}
const ask = {
    name: "Ask",
    mainAddress : "https://www.ask.com/web",
    imageAddress : "https://www.ask.com/web",
    videoAddress : "https://www.ask.com/web",
    newsAddress : "https://www.ask.com/web",
    searchParam : "?q=",
}
const excite = {
    name: "Excite",
    mainAddress : "https://results.excite.com/serp?",
    imageAddress : "https://results.excite.com/serp?qc=images&",
    videoAddress : "https://results.excite.com/serp?qc=video&",
    newsAddress : "https://results.excite.com/serp?qc=news&",
    searchParam : "q=",
}
const duck = {
    name: "DuckDuckGo",
    mainAddress : "https://duckduckgo.com/?",
    imageAddress : "https://duckduckgo.com/?",
    videoAddress : "https://duckduckgo.com/?",
    newsAddress : "https://duckduckgo.com/?",
    searchParam : "q=",
}
const rus = {
    title: "Искать в ",

};
const en = {
    title: "Search in ",
};

function getInfo () {
   browser.storage.sync.get("searchEngine", (data) => {
        se = data.searchEngine;

    });

    browser.storage.sync.get("style", (data) => {
        style = data.style;

        if (style === undefined) {
            style = "11";
        }


    });
}

getInfo();

// let head = document.head;
// let boot = document.createElement("link");
// boot.rel = "stylesheet";
// boot.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
// head.append(boot);

function addButton(searchEngine, local, style) {
    let parent = document.querySelector("#sbtc, [jsname=RNNXgb]");
    let button = document.createElement("input");
    button.type = "button";
    button.id = "button" + style;
    button.value = searchEngine.name;
    button.title = local.title + searchEngine.name;
    button.style = style;
    try {
        parent.appendChild(button);
    }
    catch (e) {

    }



    if (document.URL.includes("tbm=isch")) {
        addEventListener("scroll", () => {
            button.style = "max-height: 46px !important;";
            // if (self.pageYOffset > 11) {
            //     button.style = "height: 38px;";
            // }
            //
            // if (self.pageYOffset < 11) {
            //     button.style = "height: 46px;";
            // }
        });

    }

    if (!document.URL.includes("q=")&&(!document.URL.includes("newwindow"))) {
        button.style = "height: 58px;";
    }
    if (document.URL.includes("imghp")) {
        button.style = "margin-top: -2px";
        button.style = "height: 58px;";
    }

    button.onclick = function() {
        let buttonURL = searchEngine.mainAddress;

        if (document.URL.includes("tbm=isch")) {
            buttonURL = searchEngine.imageAddress;
        }
        if (document.URL.includes("tbm=nws")) {
            buttonURL = searchEngine.newsAddress;
        }
        if (document.URL.includes("tbm=vid")) {
            buttonURL = searchEngine.videoAddress;
        }

        let fullURL = buttonURL + searchEngine.searchParam + encodeURIComponent(document.querySelector('input[name=q]').value);

        let newWindow = window.open(fullURL, "_blank");
    };

}

setTimeout(() => {
    let local = language.includes("ru") ? rus : en  ;
    switch (se) {
        case "Yandex":
            addButtonDelayed ( yandex, local, style );
            break;

        case "Bing":
            addButtonDelayed ( bing, local, style );
            break;

        case "Yahoo":
            addButtonDelayed ( yahoo, local, style );
            break;

        case "Mail":
            addButtonDelayed ( mail, local, style );
            break;

        case "Rambler":
            addButtonDelayed ( rambler, local, style );
            break;

        case "Aol":
            addButtonDelayed ( aol, local, style );
            break;

        case "Ask":
            addButtonDelayed ( ask, local, style );
            break;

        case "Excite":
            addButtonDelayed ( excite, local, style );
            break;

        case "Duck":
            addButtonDelayed ( duck, local, style );
            break;


        default:
            addButtonDelayed ( yandex, local, style );
            break;
    }
    }, 10);

function addButtonDelayed (s, l, st) {
    setTimeout(() => {
        addButton(s, l, st);
    }, 10);
}