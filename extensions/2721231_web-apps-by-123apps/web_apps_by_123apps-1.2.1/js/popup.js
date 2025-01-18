const d = document;

document.addEventListener("DOMContentLoaded", function () {
    let locale

    const search_box = d.getElementById('search_box'),
        content = d.querySelector('body .content'),
        i18n_supported = typeof chrome == 'object' && chrome.hasOwnProperty('i18n')

    if (i18n_supported) {

        // i18n
        locale = chrome.i18n.getMessage('@@ui_locale').split(/[-_]/)[0].toLowerCase();

        var allowed_locales = ['en','pt', 'it', 'es', 'de', 'fr', 'ru', 'pl', 'tr', 'ja', 'ko', 'cn', 'tw', 'vi', 'th', 'id'];

        // Localize app names
        d.querySelectorAll('[data-locale]').forEach(el => {
            el.innerText = chrome.i18n.getMessage(el.dataset.locale)
        })

        // Localize search placeholder
        search_box.placeholder = chrome.i18n.getMessage(search_box.dataset.locale);

        // a href click
        d.querySelectorAll('a').forEach(el => {

            // language specific links
            if (locale && locale != 'en' && allowed_locales.includes(locale)) {
                const url = new URL(el.href);
                el.href = url.origin + '/' + locale + url.pathname
            }

            // a on click
            if (el.href) {
                el.addEventListener('click', event => {
                    chrome.tabs.create({url: el.href})
                });
            }
        });
    }
    else echo("No chrome or i18n");


    /* SEARCH */

    // search_box focus
    search_box.addEventListener('focus', event => {
        d.getElementById('search_container').classList.add('focus');
    });

    // search_box blur
    search_box.addEventListener('blur', event => {
        d.getElementById('search_container').classList.remove('focus');
    });

    // search_box focus on popup open
    window.onload = function() {
        search_box.focus();
    }


    // Populate search dictionary with keywords
    let dict = [];

    d.querySelectorAll('a.item').forEach(el => {
        const app_id = el.dataset.app_id
        const item = {
            id: app_id,
            el: el,
        }

        item.keywords = i18n_supported ? chrome.i18n.getMessage(app_id + '_keywords') : el.dataset.keywords
        item.keywords = item.keywords + ' ' + el.innerText;  // add title to keywords

        if (el.dataset.formats) {
            item.formats = el.dataset.formats;
        }

        dict.push(item)
    })

    // init MiniSearch
    let miniSearch = new MiniSearch({
        fields: ['keywords', 'formats'],
        storeFields: ['el']
    })

    // add dictionary to MiniSearch
    miniSearch.addAll(dict)

    // Perform search on keyup
    search_box.addEventListener('keyup', event => {
        const value = search_box.value;

        if (value.length) {
            content.classList.add('search-active')

            let results = miniSearch.search(value, {
                prefix: true,
                combineWith: 'AND',
                fuzzy: term => term.length > 4 ? 0.2 : null
            })

            reset_found()

            results.forEach(item => {
                item.el.classList.add('found')
            })
        }
        else {
            reset_found()
            content.classList.remove('search-active')
        }
    })

    function reset_found() {
        d.querySelectorAll('a.item').forEach(el => {
            el.classList.remove('found')
        })
    }
});

function echo(msg) {
    if (typeof console == "object") {
        console.log(msg)
    }
    else {
        // var body = d.querySelector('body');
        // if (typeof msg == 'object') {
        //     msg = JSON.stringify(msg, null, 2)
        // }
        // body.innerHTML = ("<pre>" + msg + "</pre>") + body.innerHTML;
    }
}

