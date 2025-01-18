/**
 * @brief     Function returns station
 * @param     nId       state id 
 * @return    st        state
 */ 
function getStationById(nId) {
    var st = null;
    for (var idx = 0; idx < stations.length; idx++) {
        if (stations[idx].id == nId) {
            st = stations[idx];
            idx = stations.length;
        }
    }
    return st;
}

/**
 * @brief     Function sets new state
 * @param     par       state id
 * @var       elAudio   @see function main() 
 */
function setState(par) {
    if ("string" == typeof par) {
        state.id = par;
        chrome.storage.local.set({ "state" : state });
        var d = (par = getStationById(par)) ? par.url : d;
        d += '?' + Math.random();
        if (elAudio.source.src != d) {
            elAudio.source.src = d;
        }
    }
}

/**
 * @brief     Function runs/stops audio stream in background.
 * @var       state     @see function main()
 * @var       elAudio   @see function main()
 * @var       j         @see function main()
 */
function runAudio() {
    if (state.paused) {
        elAudio.pause();
    } else { 
        elAudio.play();
        j && j();
    }
    j = null;
}


/**
 * @var       elAudio   <audio> element
 * @var       j         function for removing "loading" class
 * @var       state     state
 * @var       stations  Array of default radio stations
 */
var elAudio = null;
var j = null;
var state = {
                id: "",
                paused: true,
                volume: 100,
                install: false
            };
var stations = [
        {
            name: "Disco 80's",
            genre: "Pop",
            type: "mp3",
            url: "http://music.myradio.com.ua:8000/Disco128.mp3"
        }, 
        {
            name: "D FM",
            genre: "Pop",
            type: "aac",
            url: "https://rmgradio.gcdn.co/dfm_m.aac"
        }, 
        {
            name: "Retro FM",
            genre: "Pop",
            type: "mp3",
            url: "http://retroserver.streamr.ru:8043/retro256.mp3"
        }, 
        {
            name: "\u0415\u0432\u0440\u043e\u043f\u0430+",
            genre: "Pop",
            type: "mp3",
            url: "http://ep128server.streamr.ru:8030/ep128"
        },  
        {
            name: "\u041d\u0430\u0448\u0435 \u0420\u0430\u0434\u0438\u043e",
            genre: "Pop",
            type: "mp3",
            url: "https://nashe1.hostingradio.ru:18000/nashe-128.mp3"
        }, 
        {
            name: "\u0420\u0430\u0434\u0438\u043e NRJ",
            genre: "Pop",
            type: "mp3",
            url: "http://ic7.101.ru:8000/a99"
        }, 
        {
            name: "\u0420\u0430\u0434\u0438\u043e RECORD",
            genre: "Pop",
            type: "mp3",
            url: "http://online.radiorecord.ru:8101/rr_128"
        }, 
        {
            name: "\u0420\u0430\u0434\u0438\u043e ULTRA",
            genre: "Pop",
            type: "mp3",
            url: "https://nashe1.hostingradio.ru:18000/ultra-128.mp3"
        }, 
        {
            name: "\u0420\u0443\u0441\u0441\u043a\u043e\u0435 \u0420\u0430\u0434\u0438\u043e",
            genre: "Pop",
            type: "aac",
            url: "http://icecast.russkoeradio.cdnvideo.ru:8000/rr_m.aac"
        }, 
        {
            name: "\u042d\u0445\u043e \u041c\u043e\u0441\u043a\u0432\u044b",
            genre: "Pop",
            type: "mp3",
            url: "http://radio-echo.melodix.ru:8080/echo.mp3"
        }];  

/**
 * @brief     Main function 
 */    
function main() {
    chrome.storage.local.get("state", function(result){
        state = result.state || { id: "", paused: !0, volume: 100, install: !1 }; 
        state.paused = true;
        var b = [];
        chrome.storage.local.get("stations", function(res){
            b = res.stations || [];
            var iStation = null;
            var stUrl = "";
            if (!b.length && !state.install) {
                state.install = !0;
                for (var idx = 0; idx < stations.length; idx++) {
                    stations[idx].id = stations[idx].name.replace(/\s/g, "").toLowerCase();
                }
                chrome.storage.local.set({ "stations" : stations });
            } else {
                stations = b;
            }

            stUrl = (iStation = getStationById(state.id)) ? iStation.url : "";
            !iStation && stations.length && (stUrl = stations[0].url, state.id = stations[0].id);
            chrome.storage.local.set({ "state" : state });
            b = document.createElement("source"); 
            b.src = stUrl;
            b.type = "audio/mpeg";
            if (elAudio) {
                elAudio.children[0].remove(); 
            } else {
                elAudio = document.createElement("audio");
                a = document.body;
                a.appendChild(elAudio);
            }
            elAudio.volume = state.volume / 100;
            elAudio.source = b;
            elAudio.appendChild(b);
            elAudio.addEventListener("canplay", runAudio, false);
            //runAudio();
        });
    });
}
main();
var radioController = {
        getStations: function() {
            return stations;
        },

        getStationById: getStationById,

        addNewStattion: function(b) {
            var b = JSON.parse(JSON.stringify(b));
            var newId = b.name.replace(/\s/g, "").toLowerCase();
            var oldStation = getStationById(b.id);
            var exSt = getStationById(newId);
            var oldId = b.id;
            if (exSt && !oldId)
                return null;
            if (oldStation && !oldId) 
                return null;
            if (oldId) {
                if ((newId != oldId) && exSt)
                    return null;
                if (oldStation)  {
                    b.id = newId;
                    var idx = stations.indexOf(oldStation);
                    stations[idx] = b;
                    if (oldStation.id == state.id) {
                        state.id = b.id;
                        chrome.storage.local.set({ "state" : state });
                    }
                }
            } else {
                b.id = newId;
                stations.push(b);
                1 == stations.length && setState(b.id);
            }
            chrome.storage.local.set({ "stations" : stations });
            return b;
        },

        removeStation: function(stId) {
            var remStations = null;
            for (var idx = 0; idx < stations.length; idx++) {
                if (stations[idx].id == stId) {
                    remStations = stations.splice(idx, 1)[0];
                    idx = stations.length; 
                    chrome.storage.local.set({ "stations" : stations });
                }
            }
            return remStations;
        },

        getState: function() {
            return state;
        },

        setState: setState,

        playAudio: function(b) {
            state.paused = !1;
            chrome.storage.local.set({ "state" : state });
            j = b;
            elAudio.load();
        },
        pauseAudio: function(b) {
            state.paused = !0;
            chrome.storage.local.set({ "state" : state });
            elAudio.pause();
            b();
        },
        changeVolume: function(vol) {
            elAudio.volume = vol / 100;
            state.volume = vol;
            chrome.storage.local.set({ "state" : state });
        },
        changeIndex: function(id, refId, type) {
            var ind = -1, refInd = -1;
            for (var i = 0; i < stations.length; i++) {
                if (stations[i].id == id) {
                    ind = i;
                    if (refInd >= 0) {
                        break;
                    }
                }
                if (stations[i].id == refId) {
                    refInd = i;
                    if (ind >= 0) {
                        refInd--;
                        break;
                    }
                }
            }
            if (type == 'after') {
                refInd++;
            }
            var el = stations.splice(ind, 1)[0];
            stations.splice(refInd, 0, el);
            
            chrome.storage.local.set({ "stations" : stations });
        }
    }