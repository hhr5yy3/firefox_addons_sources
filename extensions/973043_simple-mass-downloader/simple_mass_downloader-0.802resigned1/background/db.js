

var db;
var idbSupported = false;
var fileIcons = {};

function initDB(postAction) {
    if ("indexedDB" in window) {

        idbSupported = true;
    }

    if (idbSupported) {
        var openRequest = indexedDB.open("smdDB", 4);

        openRequest.onupgradeneeded = function (e) {
            createDatabaseObjects(e.target.result);
        };

        openRequest.onsuccess = function (e) {
            db = e.target.result;
            getFileIcons();
            if (postAction) postAction();
        };

        openRequest.onerror = function (/* e */) {

        };

    }
}

function createDatabaseObjects(db) {
    try {
        if (db == null) {
            console.log("Can't create database objects; the database is not open.");
        }
        else {
            var oOptions = { keyPath: "recordID", autoIncrement: true };

            var oIxOptions = { unique: false, multiEntry: false };
            var oIxOptions2 = { unique: true, multiEntry: false };

            if (!db.objectStoreNames.contains("Main")) {
                let oStore = db.createObjectStore("Main", oOptions);
                oStore.createIndex("IxByCreated", "created", oIxOptions2);
                oStore.createIndex("IxByUrl", "url", oIxOptions);
                oStore.createIndex("IxByPath", "path", oIxOptions);
                oStore.createIndex("IxByExt", "ext", oIxOptions);
                oStore.createIndex("IxByDCount", "count", oIxOptions);
            }

            if (!db.objectStoreNames.contains("FileIcons")) {
                let oStore = db.createObjectStore("FileIcons", oOptions);
                oStore.createIndex("IconsByExt", "ext", oIxOptions2);
            }
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

function addOrUpdateItem(data, endAction) {
    if (!db) return;
    if(data.mainUrl.length > 500) return; 
    let info = { path: data.path, url: data.initialUrl, created: (new Date()).getTime(), ext: data.ext, size: data.size };
    data.history = info;
    let transaction = db.transaction(["Main"], "readwrite");
    let mainStore = transaction.objectStore("Main");
    let index = mainStore.index("IxByUrl");
    let range = IDBKeyRange.only(data.initialUrl);
    if (!index) return;

    let firstRequest = index.getAll(range);
    firstRequest.onsuccess = function (event) {
        let results = event.target.result;
        if (results.length > 0 && results[0]) {
            let record = results[0];
            for (var p of Object.keys(info)) record[p] = info[p];
            record.count = record.count + 1;
            mainStore.put(record);
        }
        else {
            info.count = 1;
            mainStore.add(info);
        }
    };

    firstRequest.onerror = function (event) {
        console.log(event);
    };

    firstRequest.oncomplete = function (/* event */) {
        if (endAction) endAction();
    };
}

function addHistoryInfo(info, endAction) {
    if (!db) return;
    let transaction = db.transaction(["Main"], "readwrite");
    let mainStore = transaction.objectStore("Main");
    let index = mainStore.index("IxByUrl");
    if (!index) return;
    let L = info.newRids;
    let D = L.map((rid) => datacenter[rid]);
    for (let data of D) {
        let range = IDBKeyRange.only(data.initialUrl);

        let firstRequest = index.getAll(range);
        firstRequest.onsuccess = function (event) {
            let results = event.target.result;
            if (results.length > 0) {
                data.history = results[0];
            }

        };

        firstRequest.onerror = function (event) {
            console.log(event);
        };
    }

    transaction.oncomplete = function (/* event */) {

        if (endAction) endAction(L);
        if(info.batchId){
            xout(session.activeBatches, info.batchId);
            if(session.activeBatches.length === 0) send({ type: "hide loader" });
        }
    };
}

function getFileIcons(){
    if (!db) return;
    let transaction = db.transaction(["FileIcons"], "readwrite");
    let iconStore = transaction.objectStore("FileIcons");

    let firstRequest = iconStore.getAll();
    firstRequest.onsuccess = function (event) {
        let results = event.target.result;

        for(let result of results){
            if(result) fileIcons[result.ext] = result.icon;
        }

        setTimeout(() => initAfterOpendingDB(), 300);

    };

    firstRequest.onerror = function (event) {
        console.log(event);
    };

    transaction.oncomplete = function (/* event */) {

    };
}

function addOrUpdateIcons(info){
    for(let ext of info.exts) addOrUpdateIcon({ext: ext, icon: info.icon});
}

function addOrUpdateIcon(info, endAction) {
    if (!db || !info || !info.ext || !info.icon) return;  
    let transaction = db.transaction(["FileIcons"], "readwrite");
    let iconStore = transaction.objectStore("FileIcons");
    let index = iconStore.index("IconsByExt");
    if (!index) return;
    let range = IDBKeyRange.only(info.ext);

    let firstRequest = index.getAll(range);
    firstRequest.onsuccess = function (event) {
        let results = event.target.result;
        if (results.length > 0) {
            let record = results[0];
            if(record){
                record.icon = info.icon;
                iconStore.put(record);
            }

        }
        else {
            iconStore.add(info);
        }

        fileIcons[info.ext] = info.icon;
    };

    firstRequest.onerror = function (event) {
        console.log(event);
    };

    firstRequest.oncomplete = function (/* event */) {
        if (endAction) endAction();
    };
}

//initDB();