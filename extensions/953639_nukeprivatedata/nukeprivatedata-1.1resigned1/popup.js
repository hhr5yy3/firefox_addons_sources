/**
 * NukeData (C) 2018 Beholder Corporation
 * support@getfoxyproxy.org
 *
 * This source code is proprietary, and released under the EULA available in the
 * LICENSE file at the root of this installation. Do not copy or re-use without
 * written permission.
 */

let keys = {
    cache: true,
    bookmarks: false,
    cookies: true,
    downloads: true,
    formData: false,
    history: true,
    indexedDB: true,
    localStorage: true,
    pluginData: true,
    passwords: false,
    serverBoundCertificates: true,
    serviceWorkers: true }, fr = {firstRun: true};

 document.addEventListener('DOMContentLoaded', function() {
    //browser.storage.sync.clear(); // TODO: remove me
    browser.storage.sync.get(fr).then((items) => {
        console.log(items.firstRun);
        if (items.firstRun) {
            document.getElementById("firstRun").classList.remove("hidden");
            items.firstRun = false;
            browser.storage.sync.set(items);
        }
        else nuke();
    });
 });

 function nuke() {
    browser.storage.sync.get(keys).then((items) => {
        let bookmarks = items.bookmarks;
        delete items.bookmarks;
        browser.browsingData.remove({}, items).then(status(items, bookmarks));
    });    
 }

function status(items, bookmarks) {
    if (bookmarks) {
        items.bookmarks = true;
        browser.bookmarks.getTree().then((tree) => {
            console.log(JSON.stringify(tree[0]));
            showResults(items);
            //if (tree && tree[0])
                //browser.bookmarks.removeTree("root________").then(showResults(items)); // not working
        });
    }
    else showResults(items);
}

function showResults(items) {
    let bomb = "<img src='/images/icons/atomic-bomb-96.png'><h1>Nuked</h1>", itemsHtml = "";
    for (let item in items) {
        if (items[item])
            itemsHtml += item + "<br>";
    }
    document.getElementById("body").innerHTML = bomb + itemsHtml + "</p>";
    setTimeout(() => {window.close()}, 2000);
}

 document.getElementById("body").addEventListener("click", () => {
    window.close();
 });

 document.getElementById("okBtn").addEventListener("click", () => {
    browser.runtime.openOptionsPage();
 });

