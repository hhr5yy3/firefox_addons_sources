function darkMode() {
    let darkMode = document.getElementById("dark-mode");
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    let main = document.getElementById("main");



    browser.storage.sync.get(["dark_mode"], function (data) {
            if ( data.dark_mode  === "true" ) {
                darkMode.checked = true;
                left.style = "background: black";
                right.style = "background: black";
                main.style = "background: black";


            } else {
                darkMode.checked = false;
                left.style = "background: #ff8080;";
                right.style = "background: #ff8080;";
                main.style = "background: #ff8080";

            }
        }
    );


    darkMode.addEventListener("change", () => {
        if (darkMode.checked) {
            browser.storage.sync.set ( { "dark_mode" : "true" } );
            left.style = "background: black";
            right.style = "background: black";
            main.style = "background: black";

        }
        else {
            browser.storage.sync.set ( { "dark_mode" : "false" } );
            left.style = "background: #ff8080;";
            right.style = "background: #ff8080;";
            main.style =  "background: #ff8080;";
        }
    });
}

darkMode();


function searchEngine() {
    let yandex = document.getElementById("yandex");
    let bing = document.getElementById("bing");
    let yahoo = document.getElementById("yahoo");
    let mail = document.getElementById("mail");
    let rambler = document.getElementById("rambler");
    let aol = document.getElementById("aol");
    let ask = document.getElementById("ask");
    let excite = document.getElementById("excite");
    let duck = document.getElementById("duck");
    let all = document.querySelectorAll("input[name=engine]");

    browser.storage.sync.get(["searchEngine"], (data) => {
        if (data.searchEngine === "Yandex") {
            yandex.checked = true;
        }
        if (data.searchEngine === "Bing") {
            bing.checked = true;

        }
        if (data.searchEngine === "Yahoo") {
            yahoo.checked = true;
        }
        if (data.searchEngine === "Mail") {
            mail.checked = true;
        }
        if (data.searchEngine === "Rambler") {
            rambler.checked = true;
        }
        if (data.searchEngine === "Aol") {
            aol.checked = true;
        }
        if (data.searchEngine === "Ask") {
            ask.checked = true;
        }
        if (data.searchEngine === "Excite") {
            excite.checked = true;
        }
        if (data.searchEngine === "Duck") {
            duck.checked = true;
        }
    });

    all.forEach ( ( s ) => {
        s.addEventListener ( "change" , () => {
            if ( yandex.checked ) {
                browser.storage.sync.set ( { "searchEngine" : "Yandex" } );
            }
            if ( bing.checked ) {
                browser.storage.sync.set ( { "searchEngine" : "Bing" } );

            }
            if ( yahoo.checked ) {
                browser.storage.sync.set ( { "searchEngine" : "Yahoo" } );
            }
            if ( mail.checked ) {
                browser.storage.sync.set ( { "searchEngine" : "Mail" } );
            }
            if ( rambler.checked ) {
                browser.storage.sync.set ( { "searchEngine" : "Rambler" } );
            }
            if ( aol.checked ) {
                browser.storage.sync.set ( { "searchEngine" : "Aol" } );
            }
            if ( ask.checked ) {
                browser.storage.sync.set ( { "searchEngine" : "Ask" } );
            }
            if ( excite.checked ) {
                browser.storage.sync.set ( { "searchEngine" : "Excite" } );
            }
            if ( duck.checked ) {
                browser.storage.sync.set ( { "searchEngine" : "Duck" } );
            }
        } )
    } )

}

searchEngine();

function style () {

    let all = document.querySelectorAll("input[name=style]");

    let [a,b,c, d, e, f, g, h, i, j, k, l ] = all;

    browser.storage.sync.get(["style"], (data) => {
        if (data.style === "0") {
            a.checked = true;
        }
        if (data.style === "1") {
            b.checked = true;

        }
        if (data.style === "2") {
            c.checked = true;
        }
        if (data.style === "3") {
            d.checked = true;
        }
        if (data.style === "4") {
            e.checked = true;
        }
        if (data.style === "5") {
            f.checked = true;
        }
        if (data.style === "6") {
            g.checked = true;
        }
        if (data.style === "7") {
            h.checked = true;
        }
        if (data.style === "8") {
            i.checked = true;
        }
        if (data.style === "9") {
            j.checked = true;
        }
        if (data.style === "10") {
            k.checked = true;
        }
        if (data.style === "11") {
            l.checked = true;
        }
        if (data.style === undefined) {
            l.checked = true;
            browser.storage.sync.set ( { "style" : "11" } );
        }

    });







    all.forEach((s) => {
        s.addEventListener("change", () => {
            if (s.value === "Default") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "0" } );

                }

            }
            if (s.value === "Yandex") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "1" } );

                }

            }
            if (s.value === "Mini") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "2" } );

                }

            }

            if (s.value === "3") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "3" } );

                }
            }
            if (s.value === "4") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "4" } );

                }
            }
            if (s.value === "5") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "5" } );

                }
            }
            if (s.value === "6") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "6" } );

                }
            }
            if (s.value === "7") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "7" } );

                }
            }
            if (s.value === "8") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "8" } );

                }
            }
            if (s.value === "9") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "9" } );

                }
            }
            if (s.value === "10") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "10" } );

                }
            }
            if (s.value === "11") {
                if (s.checked) {
                    browser.storage.sync.set ( { "style" : "11" } );

                }
            }
        })
    })

}

style();

const language = window.navigator.userLanguage || window.navigator.language || "ru";

if (!language.includes("ru")) {
    document.getElementById("SeSetup").innerText = "Search Engine";
    document.getElementById("StSetup").innerText = "Style";
    document.getElementById("OtherSettingsSetup").innerText = "Other";
    document.getElementById("links").innerText = "Useful extensions and themes for chrome";
    document.title = "Settings"
}