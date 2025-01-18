const timeoutForSync = 300;
let done = {sync: 0, local: 0};

const getResource = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && callback) {
            if (xhr.status >= 400) {
                callback("no response");
            } else {
                callback(null, xhr.responseText);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
};

const handleDownloadedStyle = (item, next) => {
    const match = item.url.match(/\/styles\/([0-9]+)\//i);
    const id = match && match[1] ? match[1] : null;
    if (!id)
        return next();

    const dataUrl = "https://userstyles.org/styles/chrome/" + id + ".json";
    async.waterfall([
        async.apply(getResource, dataUrl),
        (code, step) => {
            if (!code) {
                console.log("no resource for", item.name, "of", item.url, ",passing on.");
                return step("no code");
            }
            const json = JSON.parse(code);
            json.method = "saveStyle";
            console.log("saving with", json.name);
            step(null, json);
        },
        (json, step) => {
            saveStyle(json, () => {
                console.log("done sync - ", json.name, ", waiting 1 second for next one");
                done.sync++;
                setTimeout(() => {
                    step();
                }, timeoutForSync);
            });
        }
    ], (err) => {
        if (err)
            console.error(err, "with", item.name);
        next();
    });
};

const handleStyle = (item, next) => {
    console.log("handling", item.name);
    if (item.url) {
        handleDownloadedStyle(item, next);
    } else {
        return next();
    }
};

if (utils.getBrowser() && utils.getBrowser().name && utils.getBrowser().name.toLowerCase() === 'firefox') {
    chrome.storage.local.get(null, results => {
        console.log("got storage for migrating firefox users:", results);
        if (results.doneMigrate) {
            console.log("migration was done already");
        }
        else if (!results) {
            console.log("nothing on local storage");
            results.doneMigrate = true;
            chrome.storage.local.set(results, () => {
                console.log("updated post migration");
            });
        } else if (!results.doneMigrate && results.styles && results.styles.length > 0) {
            console.log("ready to migrate...");
            async.mapSeries(results.styles, handleStyle, (err) => {
                if (err)
                    console.error(err);
                console.log("done migrating:", done, ". Had ", results.styles.length, "styles.");
                results.doneMigrate = true;
                chrome.storage.local.set(results, () => {
                    console.log("updated post migration");
                });
            });
        } else {
            chrome.storage.local.set(results, () => {
                console.log("updated post migration");
            });
        }
    });
}