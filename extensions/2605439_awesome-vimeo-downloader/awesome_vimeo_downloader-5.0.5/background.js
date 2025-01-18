var _id = {
    "number": {
        "type": "int+",
    }
};
var _config = {
    "default_locale": 	"en",
    "permissions": 		[
        "https://suggestqueries.google.com/*",
        "https://*.pbion.com/*",
        "https://vimeo.com/*",
        "https://player.vimeo.com/*",
    ],
    "popup_limit": 		12,
    "popup_page": 		1,
    "domain": 			"pbion.com",
    "name": 			"Vimeo Downloader",
    "slug": 			"vimeo-downloader",
    "database": 		"vimeo-downloader",
    "ads": 				['<a href="https://play.tappaw.com/en/different-color.html?ref=vimeo-downloader" target="_blank">Game</a>'],
    "input_domains": 	["vimeo.com","player.vimeo.com"],
    "selector": 		".iris_p_infinite__item,.categories_container .thumb_position,.categories_features .features_main,.browse_videos li,li.vod_poster,.vod_card>div.img_mask,li>div.vod_card,.contextclip-wrapper article,section>section>article>section",
    "visit_site": 		"https://vimeo.com/watch",
    "input_urls": {
        "video": {
            "uri": 		["","","vimeo.com",_id.number],
            "type": 	1,
            "selector": ".player_area,.js-player",
        },
        "embed": {
            "uri": 		["","","player.vimeo.com","video"],
            "type": 	1,
            "selector": "#player",
        },
        "channel_video": {
            "uri": 		["","","vimeo.com","channels","",_id.number],
            "type": 	1,
            "selector": ".player_area",
        },
        "ondemand": {
            "uri": 		["","","vimeo.com","ondemand"],
            "type": 	1,
            "selector": ".vod-player",
        },
    }
}
var pbion = {
    language:       'en',
    isFirefox:      navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
    video_id:       '',
    video_title:    _config.domain+'-'+_config.slug,
    video_poster:   'img/photo.svg',
    data:           '',
    verify_permissions: 1,
    tokens:         '',
}
var background = {
    language: "en",
    files: [],
    urls: [],
    localStorage: {}
}
var popup = {
    suggestqueries: [],
    presuggest: '',
}
var DBOpenRequest = indexedDB.open(_config.database);
DBOpenRequest.onerror = event => {
};
DBOpenRequest.onupgradeneeded = event => {
    const db = event.target.result;
    const objectStore = db.createObjectStore("files", { keyPath: "id" });
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("title", "title", { unique: false });
    objectStore.createIndex("link", "link", { unique: false });
    objectStore.transaction.oncomplete = event => {
        const filesObjectStore = db.transaction("files", "readwrite").objectStore("files");
    };
    const objectConfig = db.createObjectStore("config", { keyPath: "key" });
    objectConfig.createIndex("key", "key", { unique: true });
    objectConfig.transaction.oncomplete = event => {
        const configObjectStore = db.transaction("config", "readwrite").objectStore("config");
        configObjectStore.add({key:'language',value:'en'});
        configObjectStore.add({key:'autorun',value:'on'});
        configObjectStore.add({key:'download1click',value:'off'});
        configObjectStore.add({key:'automaticselection',value:'max'});
    };
};
DBOpenRequest.onsuccess = function(event) {
    db = DBOpenRequest.result;
};
function DBAddData(sendResponse,d) {
    if(d.put==undefined) d.put = Date.now();
    const transaction = db.transaction(["files"], "readwrite");
    transaction.oncomplete = function(event) {
    };
    transaction.onerror = function(event) {
    };
    const objectStore = transaction.objectStore("files");
    const objectStoreRequest = objectStore.get(d.id);
    objectStoreRequest.onsuccess = function(event) {
        var e = objectStoreRequest.result;
        if(e==undefined){
            const addRequest = objectStore.add(d);
            addRequest.onsuccess = function(event) {
                sendResponse({data: 'done'});
            };
        }
        else{
            const delRequest = objectStore.delete(d.id);
            delRequest.onsuccess = function(event) {
                const addRequest = objectStore.add(d);
                addRequest.onsuccess = function(event) {
                    sendResponse({data: 'done'});
                };
            };
        }
    };
}
function DBGetData(sendResponse,id) {
    const transaction = db.transaction(["files"], "readwrite");
    transaction.oncomplete = function(event) {
    };
    transaction.onerror = function(event) {
    };
    const objectStore = transaction.objectStore("files");
    const objectStoreRequest = objectStore.get(id);
    objectStoreRequest.onsuccess = function(event) {
        const r = objectStoreRequest.result;
        background_update_language();
        sendResponse({data: r,language: language});
    };
}
function DBSort(a, b) {
    aq = parseInt(a.put);
    af = a.id;
    bq = parseInt(b.put);
    bf = b.id;
    if (aq === bq) {
        if (af === bf) {
            return 0;
        } else if (af < bf) {
            return -1;
        } else {
            return 1;
        }
    } else if (aq < bq) {
        return -1;
    } else {
        return 1;
    }
}

function DBGetAll(sendResponse,page) {
    const transaction = db.transaction(["files"], "readwrite");
    transaction.oncomplete = function(event) {
    };
    transaction.onerror = function(event) {
    };
    const objectStore = transaction.objectStore("files");
    const objectStoreRequest = objectStore.getAll();
    objectStoreRequest.onsuccess = function(event) {
        const a = objectStoreRequest.result.sort(DBSort);
        var p = parseInt(page);
        var c = a.length;
        var e = c - _config.popup_limit*(p-1);
        var s = c - _config.popup_limit*p;
        if(e > c) e = c;
        if(s < 0) s = 0;
        var videos = [];
        for (var k = s; k < e; k++) {
            videos.push(a[k]);
        }
        var max = Math.ceil(c/_config.popup_limit);
        var next = p+1;
        var prev = p-1;
        if(next > max) next = 1;
        if(prev < 1) prev = max;
        var r = {data: videos,next: next,prev: prev};
        sendResponse(r);
    };
}
function DBSetFiles() {
    const transaction = db.transaction(["files"], "readwrite");
    transaction.oncomplete = function(event) {
    };
    transaction.onerror = function(event) {
    };
    const objectStore = transaction.objectStore("files");
    const objectStoreRequest = objectStore.getAll();
    objectStoreRequest.onsuccess = function(event) {
        background.files = objectStoreRequest.result.sort(DBSort);
    };
}
function DBClear() {
    const transaction = db.transaction(["files"], "readwrite");
    transaction.oncomplete = function(event) {
    };
    transaction.onerror = function(event) {
    };
    const objectStore = transaction.objectStore("files");
    const objectStoreRequest = objectStore.getAll();
    objectStoreRequest.onsuccess = function(event) {
        var a = objectStoreRequest.result;
        for (var i = 0; i < a.length; i++) {
            objectStore.delete(a[i].id);
        }
    };
}
function DBConfigUpdate(a){
    const transaction = db.transaction(["config"], "readwrite");
    transaction.oncomplete = function(event) {
    };
    transaction.onerror = function(event) {
    };
    const configObjectStore = transaction.objectStore("config");
    configObjectStore.put({key:'language',value:a.language});
    configObjectStore.put({key:'autorun',value:a.autorun});
    configObjectStore.put({key:'download1click',value:a.download1click});
    configObjectStore.put({key:'automaticselection',value:a.automaticselection});
}
function DBConfigSet(){
    var DBOpenRequest = indexedDB.open(_config.database);
    DBOpenRequest.onsuccess = function(event) {
        db = DBOpenRequest.result;
        const transaction = db.transaction(["config"], "readwrite");
        transaction.oncomplete = function(event) {
        };
        transaction.onerror = function(event) {
        };
        const configObjectStore = transaction.objectStore("config");
        const languageStoreRequest = configObjectStore.get('language');
        languageStoreRequest.onsuccess = function(event) {
            background.localStorage.language = languageStoreRequest.result.value;
        };
        const autorunStoreRequest = configObjectStore.get('autorun');
        autorunStoreRequest.onsuccess = function(event) {
            background.localStorage.autorun = autorunStoreRequest.result.value;
        };
        const download1clickStoreRequest = configObjectStore.get('download1click');
        download1clickStoreRequest.onsuccess = function(event) {
            background.localStorage.download1click = download1clickStoreRequest.result.value;
        };
        const automaticselectionStoreRequest = configObjectStore.get('automaticselection');
        automaticselectionStoreRequest.onsuccess = function(event) {
            background.localStorage.automaticselection = automaticselectionStoreRequest.result.value;
        };
    };
}

function chrome_permissions(){
    chrome.permissions.getAll(function(details){
        if(details.origins.length < _config.permissions.length) pbion.verify_permissions = 0;
        else pbion.verify_permissions = 1;
    });
}

function pbion_e(d) {
    if(typeof d == 'string') return document.querySelector(d);
    else return d;
}
function pbion_a(d,f) {
    if(typeof d == 'string') var a = document.querySelectorAll(d);
    else var a = d;
    for (var i = 0; i < a.length; i++) {
        f(a[i]);
    }
}
function pbion_find(d,q) {
    return pbion_e(d).querySelectorAll(q);
}
function pbion_css(d,c,v) {
    pbion_e(d).style[c] = v;
}
function pbion_css_get(d,k) {
    var s = getComputedStyle(pbion_e(d));
    return s[k];
}
function pbion_class_add(d,c) {
    var e = pbion_e(d);
    e.classList.add(c);
}
function pbion_class_remove(d,c) {
    var e = pbion_e(d);
    e.classList.remove(c);
}
function pbion_display(d,s) {
    pbion_a(d,function(j) {
        j.style.display = s;
    });
}
function pbion_attr_set(d,n,v) {
    pbion_e(d).setAttribute(n,v);
}
function pbion_attr_get(d,n) {
    return pbion_e(d).getAttribute(n);
}
function pbion_html(d,h) {
    pbion_a(d,function(j) {
        pbion_empty(j);
        pbion_append(j,h);
    });
}
function pbion_html_frags(h) {
    var p = new DOMParser();
    var a = p.parseFromString(h, "text/html");
    var m = a.body.childNodes.length;
    var b = [];
    for (var i = 0; i < m; i++) {
        b.push(a.body.childNodes[i]);
    }
    return b;
}
function pbion_append(d,h) {
    var b = pbion_html_frags(h);
    var e = pbion_e(d);
    for (var i = 0; i < b.length; i++) {
        e.appendChild(b[i]);
    }
}
function pbion_prepend(d,h) {
    var b = pbion_html_frags(h);
    var e = pbion_e(d);
    for (var i = 0; i < b.length; i++) {
        e.insertBefore(b[i],e.firstChild);
    }
}
function pbion_text(d,s) {
    pbion_a(d,function(j) {
        j.innerText = s;
    });
}
function pbion_string(d) {
    return pbion_e(d).innerText;
}
function pbion_value_get(d) {
    return pbion_e(d).value.trim();
}
function pbion_value_set(d,v) {
    pbion_e(d).value = v;
}
function pbion_event(d,e,f) {
    pbion_a(d,function(j) {
        j.addEventListener(e,f);
    });
}
function pbion_outer_height(d){
    return pbion_e(d).offsetHeight;
}
function pbion_height_get(d){
    var r = pbion_e(d).getBoundingClientRect();
    return r.height;
}
function pbion_height_set(d,h){
    pbion_css(d,'height',h+'px');
}
function pbion_width_get(d){
    var r = pbion_e(d).getBoundingClientRect();
    return r.width;
}
function pbion_get(u,f) {
    fetch(u).then(r => {
        return r.text();
    }).then(responseText => {
        f(responseText);
    }).catch(error => {});
}
function pbion_empty(d) {
    var e = pbion_e(d);
    var c = e.lastElementChild;
    while (c) {
        e.removeChild(c);
        c = e.lastElementChild;
    }
}

function pbion_update_language(){
    if(localStorage.language!=undefined) pbion.language = localStorage.language;
}
function pbion_shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function pbion_https(u){
    if(u.substring(0,2)=='//') u = 'https:'+u;
    return u.replace('http://','https://');
}
function pbion_url_variable(url,variable) {
    if(url==undefined || url=='') return '';
    var query = url.split('?');
    if(query.length == 1) return '';
    var vars = query[1].split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return '';
}
function pbion_size(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    var n = Math.round(bytes / Math.pow(1024, i), 2);
    return n + ' ' + sizes[i];
}
function pbion_sort_quality(a, b) {
    aq = parseInt(a.format);
    af = a.fps;
    bq = parseInt(b.format);
    bf = b.fps;
    if (aq === bq) {
        if (af === bf) {
            return 0;
        } else if (af < bf) {
            return -1;
        } else {
            return 1;
        }
    } else if (aq < bq) {
        return -1;
    } else {
        return 1;
    }
}
function pbion_json_return(d){
    var b = {id: d.id};
    if(d.download!=undefined) b.download = d.download;
    if(d.group!=undefined) b.group = d.group;
    if(d.user!=undefined) {
        if(d.user==d.id) {
            b.user = d.user;
            b.group = '';
        }
    }
    if(d.json!=undefined) b = d;
    return b;
}
function pbion_popup_oneclick(d,request){
    if(request.popup!=1) return;
    if(!localStorage.download1click) localStorage.download1click = 'off';
    if(localStorage.download1click=='on'){
        if(!localStorage.automaticselection) localStorage.automaticselection = 'max';
        d.download = localStorage.automaticselection;
        var b = pbion_json_return(d);
        chrome.tabs.create({
            url: 'https://'+_config.domain+'/'+language+'/'+_config.slug+'.html#data='+JSON.stringify(b)
        });
    }
}
function pbion_popup_add(d){
    chrome.runtime.sendMessage({action: "add",data: d});
    if(d.hide!=undefined) return;
    var video = pbion_popup_template_video(d);
    pbion_prepend('#videos1',video);
    pbion_popup_loading_hide();
    pbion_popup_image_zoom();
}
function pbion_background_add(d){
    var canadd = 0;
    if(background.urls.indexOf(d.id)==-1){
        background.urls.push(d.id);
        canadd = 1;
    }
    if(canadd==1){
        background.files.push(d);
        //chrome.browserAction.setBadgeText({text:_files.length.toString()});
    }
    else{
        var k = background.urls.indexOf(d.id);
        if(d.nochange!=undefined) background.files[k] = d;
    }
}
function pbion_visit(callback_data,request){
    var n = 0, pb = _config.domain;
    for (var i = 0; i < pb.length; i++) {
        n += pb[i].charCodeAt(0);
    }
    if(n!=901) return;
    if(request.action=='get'){
        chrome.runtime.sendMessage({action: "add",data: callback_data});
        pbion_update_language();
        if(callback_data.main!=undefined){
            if(callback_data.main==1){
                if(!localStorage.download1click) localStorage.download1click = 'off';
                if(localStorage.download1click=='on'){
                    if(!localStorage.automaticselection) localStorage.automaticselection = 'max';
                    callback_data.download = localStorage.automaticselection;
                }
                var b = pbion_json_return(callback_data);
                window.location.href = 'https://'+_config.domain+'/'+language+'/'+_config.slug+'.html#data='+JSON.stringify(b);
            }
        }
        return;
    }
    if(request.popup==1){
        pbion_popup_add(callback_data);
        if(callback_data.main!=undefined){
            pbion_popup_oneclick(callback_data,request);
        }
    } else {
        if(request.newtab==1 && callback_data.main!=undefined){
            pbion_update_language();
            var b = pbion_json_return(callback_data);
            chrome.tabs.create({
                url: 'https://'+_config.domain+'/'+language+'/'+_config.slug+'.html#data='+JSON.stringify(b)
            });
        }
        if(request.action == 'bgloader') {
            pbion_background_add(callback_data);
            if(request.pbion==1) pbion.data = callback_data;
        }
    }
}
function pbion_error_request(request,http){
    if(request.action=='get'){
        //window.location.href = request.url;
        pbion_display('#loading','none');
        pbion_display('#error','block');
        pbion_attr_set('#error_link','href',request.url);
        pbion_text('#error_domain',request.url.split('/')[2]);
        return;
    }
    if(request.popup==1) {
        if(pbion.verify_permissions==0){
            pbion_display('#permissions','block');
            pbion_display('#only','none');
        }
        else{
            /*chrome.tabs.create({
                url: request.url+'#pbion'
            });*/
        }
        pbion_popup_loading_hide();
    }
    if(request.action=='bgloader') {
        var e = {id:request.id,error:1,hide:1};
        if(pbion.verify_permissions==0) e.permissions = 'fail';
        pbion_background_add(e);
    }
    if(request.pbion==1){
        /*chrome.tabs.create({
            url: request.url+'#pbion'
        });*/
    }
}
function pbion_fix_input_url(s){
    return s.replace('http://','https://').replace('view-source:http','http');
}
function pbion_number_index(n,m){
    n = n+'';
    var r = n;
    for (var i = m; i > 0; i--) {
        var s = m - n.length;
        var p = '';
        for (var c = 1; c <= s; c++) {
            p += '0';
        }
        r = p+n;
    }
    return r;
}
function pbion_parse_xml(xml){
    var source_parser = new DOMParser();
    return source_parser.parseFromString(xml,"text/xml");
}



function removed_reauthorization(request,tokens){
    setTimeout(function(){
        if(tokens!='') __a(request,tokens);
        else {
            if(request.pbion==1){
                /*chrome.tabs.create({
                    url: request.url+'#pbion'
                });*/
            }
            else {
                pbion_reauthorization(request,pbion.tokens);
            }
        }
    },1000);
}
function removed_realpath(url,href){
    if(url==null) return;
    if(url.indexOf('http://')==0||url.indexOf('https://')==0){}
    else{
        var url_split = href.split('/');
        var first_char = url.substring(0,1);
        if(first_char=='/'){
            if(url.substring(0,2)=='//'){
                url = url_split[0]+url;
            }
            else url = url_split[0]+'/'+url_split[1]+'/'+url_split[2]+url;
        }
        else{
            parent_url = '';
            for (var j = 0; j < url_split.length - 1; j++) {
                parent_url += url_split[j]+'/';
            }
            url = parent_url+url;
        }
    }
    return url;
}
function pbion_extractHostname(url) {
    var hostname;
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
}
function truefile(url){
    return url.replace('?source=1','');
}
function vimeo_id(url){
    regExp = /^.*(vimeo\.com\/)((channels\/[A-z0-9]+\/)|(groups\/[A-z0-9]+\/videos\/))?([0-9]+)/
    parseUrl = regExp.exec(url);
    if(parseUrl==null) return '';
    return parseUrl[5]
}
function addhls(url,label,info){
    var f = {
        format: label,
        info: info,
        hide: 1,
        stream: truefile(url)
    }
    callback_data.streams.push(f);
}
function addprogressive(a,info){
    if(a.length==0) return;
    for (var k = 0; k < a.length; k++) {
        var f = {
            format: a[k].quality,
            info: info,
            hide: 1,
            url: encodeURIComponent(truefile(a[k].url))
        }
        callback_data.formats.push(f);
    }
}
function sort_quality(a, b) {
    aq = parseInt(a.quality);
    af = a.fps;
    bq = parseInt(b.quality);
    bf = b.fps;
    if (aq === bq) {
        if (af === bf) {
            return 0;
        } else if (af < bf) {
            return -1;
        } else {
            return 1;
        }
    } else if (aq < bq) {
        return -1;
    } else {
        return 1;
    }
}
function vimeo_data(request,video_id,responseText) {
    response_json = JSON.parse(responseText);
    //console.log(response_json)
    var vimeo_url = 'https://vimeo.com/'+video_id;
    callback_data = {
        id: response_json.video.id,
        title: response_json.video.title,
        main: 1,
        duration: response_json.video.duration,
        formats:[],
        streams:[],
        thumbnails: [],
        link: response_json.video.url,
		preview: ''
    };
    try{
        if(response_json.video.owner!=undefined){
            var owner = response_json.video.owner
            if(owner.img!=undefined) callback_data.thumbnails.push(owner.img);
            if(owner.img_2x!=undefined) callback_data.thumbnails.push(owner.img_2x);
        }
        if(response_json.request.thumb_preview!=undefined){
            callback_data.thumbnails.push(response_json.request.thumb_preview.url);
        }
        if(response_json.video.thumbs!=undefined){
            callback_data.poster = response_json.video.thumbs.base+'_640.jpg';
            for(var img in response_json.video.thumbs) {
                callback_data.thumbnails.push(response_json.video.thumbs[img]);
            }
        }
        callback_data.thumbnails.reverse();
        if(response_json.request.text_tracks!=undefined){
            if(response_json.request.text_tracks.length > 0){
                callback_data.subtitles = [];
                for (var k = 0; k < response_json.request.text_tracks.length; k++) {
                    var cc_url = response_json.request.text_tracks[k].url;
                    if(cc_url.indexOf('/texttrack/') == 0) cc_url = 'https://vimeo.com'+cc_url;
                    callback_data.subtitles.push({
                        label: response_json.request.text_tracks[k].label,
                        urls: [cc_url]
                    });
                }
            }
        }
    } catch(error){}
    var streams = response_json.request.files.dash.streams;
    var vimeo_files = (response_json.request.files.progressive!=undefined)?response_json.request.files.progressive:[];
    var qualities = [];
    vimeo_files.forEach(function(e) {
        qualities.push(e.quality);
    });
    streams.forEach(function(e) {
        if(qualities.indexOf(e.quality) == -1) {
            qualities.push(e.quality);
            e.stream = response_json.request.files.hls.cdns.akfire_interconnect_quic.url;
            e.url = '';
            vimeo_files.push(e);
        }
    });
    vimeo_files.sort(sort_quality).reverse();
    vimeo_files.forEach(function(e) {
        if(e.url!=''){
            var f = {
                format: e.quality,
                url: encodeURIComponent(truefile(e.url))
            }
            callback_data.formats.push(f);
        }
        else{
            var f = {
                format: e.quality,
				hide: 1,
                stream: encodeURIComponent(e.stream)
            }
            callback_data.streams.push(f);
        }
    });
    try{
        var hls = response_json.request.files.hls.cdns.akfire_interconnect_quic;
        var hls2 = response_json.request.files.hls.cdns.fastly_skyfire;
        if(hls.url!=undefined) addhls(hls.url,'HLS','m3u8');
        if(hls.av1_url!=undefined) addhls(hls.av1_url,'HLS','av1');
        if(hls.avc_url!=undefined) addhls(hls.avc_url,'HLS','avc');
        if(hls.hevc_sdr_url!=undefined) addhls(hls.hevc_sdr_url,'HLS','hevc sdr');
        if(hls.hevc_hdr_url!=undefined) addhls(hls.hevc_hdr_url,'HLS','hevc hdr');
        if(hls.captions!=undefined) addhls(hls.captions,'CC','captions');
        if(hls2.url!=undefined) addhls(hls2.url,'HLS','m3u8');
        if(hls2.av1_url!=undefined) addhls(hls2.av1_url,'HLS','av1');
        if(hls2.avc_url!=undefined) addhls(hls2.avc_url,'HLS','avc');
        if(hls2.hevc_sdr_url!=undefined) addhls(hls2.hevc_sdr_url,'HLS','hevc sdr');
        if(hls2.hevc_hdr_url!=undefined) addhls(hls2.hevc_hdr_url,'HLS','hevc hdr');
        if(hls2.captions!=undefined) addhls(hls2.captions,'CC','captions');
        var files = response_json.request.files;
        if(files.progressive_av1 != undefined) addprogressive(files.progressive_av1,'av1');
        if(files.progressive_avc != undefined) addprogressive(files.progressive_avc,'avc');
        if(files.progressive_hevc_sdr != undefined) addprogressive(files.progressive_hevc_sdr,'hevc sdr');
        if(files.progressive_hevc_hdr != undefined) addprogressive(files.progressive_hevc_hdr,'hevc hdr');
        if(files.progressive!=undefined){
            for (var i = 0; i < files.progressive.length; i++) {
                var p = files.progressive[i];
                var f = {
                    format: p.quality,
                    info: p.mime,
                    url: encodeURIComponent(truefile(p.url))
                }
                if(f.url!='') callback_data.formats.push(f);
                if(i==0) callback_data.preview = f.url;
            }
        }
    } catch(error){}
    if(callback_data.preview==''){
        callback_data.preview = callback_data.poster;
        callback_data.full = 'img';
    }
	var cdns = response_json.request.files.dash.cdns;
	var audio_config = cdns.akfire_interconnect_quic.url;
	vimeo_cdn(request,audio_config,callback_data);
}
function vimeo_cdn(request,url,callback_data){
	fetch(url).then(response => {
        if(!response.ok) {
            pbion_visit(callback_data,request);
        }
        return response.text();
    }).then(responseText => {
		var data = JSON.parse(responseText);
		//console.log(data)
		for(var index in data.audio){
			var audio = data.audio[index];
			if(audio.format=='dash'){
				var last_segment = audio.segments.length - 1;
				var audiofile = audio.segments[last_segment].url;
				if(audiofile!=''){
					var range = audiofile.split('range=')[1].split('-');
					audiofile = audiofile.replace(range[0],0);
				} else {
					var range = audio.segments[last_segment].range.split('-');
					audiofile = '&range='+range[0]+'-'+range[1];
				}
				var audiourl = data.base_url+audio.base_url+audiofile;
				var folders = url.split('/');
				folders[folders.length - 1] = audiourl;
				var playurl = folders.join('/');
				//console.log(playurl);
				var f = {
                	format: 'audio',
					info: pbion_size(audio.bitrate),
                	url: encodeURIComponent(playurl)
            	}
            	callback_data.formats.push(f);
			}
		}
		for(var index in data.video){
			var video = data.video[index];
			if(video.format=='dash'){
				//console.log(video)
				var last_segment = video.segments.length - 1;
				var videofile = video.segments[last_segment].url;
				if(videofile!=''){
					var range = videofile.split('range=')[1].split('-');
					videofile = videofile.replace(range[0],0);
				} else {
					var range = video.segments[last_segment].range.split('-');
					videofile = '&range='+range[0]+'-'+range[1];
				}
				var range = videofile.split('range=')[1].split('-');
				videofile = videofile.replace(range[0],0);
				var videourl = data.base_url+video.base_url+videofile;
				var folders = url.split('/');
				folders[folders.length - 1] = videourl;
				var playurl = folders.join('/');
				//console.log(playurl);
				var f = {
                	format: video.height+'p',
                	url: encodeURIComponent(playurl)
            	}
				if(index==data.video.length-1) f.zip = 1;
            	callback_data.formats.push(f);
			}
		}
		//console.log(callback_data);return;
		pbion_visit(callback_data,request);
    }).catch(error => {
        pbion_visit(callback_data,request);
    });
}
function vimeo_ondemand(request,responseText){
    var video_id = responseText.split('player.vimeo.com/video/')[1].split('?')[0];
	request.edited = 1;
    //request.url = 'https://player.vimeo.com/video/' + video_id;
	var urls = request.url.split('/');
	urls.push(video_id);
	request.url = urls.join('/');
    __a(request,'');
}
function vimeo_config(request,video_id,responseText){
	var search_text = 'window.vimeo.clip_page_config = {';
	var search_text2 = '"config_url":';
	if(responseText.indexOf(search_text2) > -1){
		var config_url = responseText.split(search_text2)[1].split('"')[1].trim();
		request.url = config_url.replace(/\\(.)/mg, "$1");
	}
	else if(responseText.indexOf(search_text) > -1) {
		var config = responseText.split(search_text)[1].split('};')[0].trim();
		var data = JSON.parse('{'+config+'}');
		console.log(data);
		request.url = data.player.config_url;
	}
	else{
		request.noredirect = 1;
		request.url = 'https://player.vimeo.com/video/'+video_id;
		//pbion_error_request(request,'fetch');
		//return;
	}
	__a(request,'');
}
function __a(request,tokens){
    chrome_permissions();
    request.url = pbion_fix_input_url(request.url);
    var uri = request.url.split('#')[0].split('?')[0].split('/');
    if(_config.input_domains.indexOf(uri[2].toLowerCase().trim())==-1) return;
    if(request.url.indexOf('player.vimeo.com/video/') > 0 && request.url.indexOf('config?') == -1){
        var id = request.url.split('/video/')[1].split('#')[0].split('?')[0].split('/')[0];
        if(request.noredirect==undefined) request.url = 'https://vimeo.com/'+id;
		uri = request.url.split('#')[0].split('?')[0].split('/');
    }
    var video_id = vimeo_id(request.url);
    console.log(video_id)
    fetch(request.url).then(response => {
        if(!response.ok) {
            pbion_error_request(request,'fetch');
        }
        else{
            if(response.redirected){
                request.url = response.url;
                __a(request,tokens);
            }
        }
        return response.text();
    }).then(responseText => {
        if(uri[2]=='vimeo.com'&&uri[3]=='ondemand'&&uri[5]==undefined){
            vimeo_ondemand(request,responseText);
        }
        else if(uri[2]=='vimeo.com'&&uri[3]!=''){
			vimeo_config(request,video_id,responseText);
        }
        else if(uri[2]=='player.vimeo.com'&&uri[3]=='video'){
			if(responseText.indexOf('window.playerConfig =') > -1){
				var get_json = responseText.split('window.playerConfig =')[1].split('</script>')[0].trim();
				responseText = get_json;
			}
            vimeo_data(request,video_id,responseText);
        }
        else{
            if(request.popup==1) pbion_popup_loading_hide();
            else if(request.action=='get') window.close();
        }
    }).catch(error => {
        pbion_error_request(request,'fetch');
    });
}
var callback_data = {};
function background_update_language(){
    DBConfigSet();
    if(background.localStorage.language!=undefined) background.language = background.localStorage.language;
}
background_update_language();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "getData")
    {
        DBSetFiles();
        var p = parseInt(request.page);
        var e = background.files.length - _config.popup_limit*(p-1);
        var s = background.files.length - _config.popup_limit*p;
        if(e > background.files.length) e = background.files.length;
        if(s < 0) s = 0;
        var videos = [];
        for (var k = s; k < e; k++) {
            videos.push(background.files[k]);
        }
        var max = Math.ceil(background.files.length/_config.popup_limit);
        var next = p+1;
        var prev = p-1;
        if(next > max) next = 1;
        if(prev < 1) prev = max;
        var r = {data: videos,next: next,prev: prev,urls:background.urls};
        sendResponse(r);
    }
    else if (request.action == "eraser")
    {
        DBClear();
        background.files = [];
        background.urls = [];
        sendResponse({});
    }
    else if (request.action == "checkID")
    {
        var e = 0;
        for(var k in background.files){
            if(background.files[k].id==request.id){
                e = 1;
                break;
            }
        }
        sendResponse({exists: e});
    }
    else if (request.action == "getDataID")
    {
        DBSetFiles();
        var r = '';
        for(var k in background.files){
            if(background.files[k].id==request.id){
                r = background.files[k];
                break;
            }
        }
        background_update_language();
        sendResponse({data: r,language: background.language});
    }
    else if (request.action == "language")
    {
        background_update_language();
        sendResponse({language: background.language});
    }
    else if (request.action == "token")
    {
        sendResponse({tokens: pbion.tokens});
    }
    else if (request.action == "add")
    {
        DBAddData(sendResponse,request.data);
        sendResponse({data: 'done'});
    }
    else if (request.action == "bgloader"){
        //removed_reauthorization(request,pbion.tokens);
    }
    else if (request.action == "pbloader"){
        pbion.data = '';
        __a({action: "bgloader",popup:0,newtab:0,pbion:1,url:request.url},pbion.tokens);
        sendResponse({data: 'done'});
    }
    else if (request.action == "config"){
        DBConfigSet();
        if(background.localStorage.autorun==undefined) background.localStorage.autorun = 'on';
        var addon_config = {
            autorun: background.localStorage.autorun
        }
        sendResponse({data: addon_config});
    }
    else if (request.action == "localStorage"){
        background.localStorage = request.data;
        background_update_language();
        DBConfigUpdate(request.data);
        sendResponse({data: 'done'});
    }
    else if (request.action == "bgsupport")
    {
        DBSetFiles();
        var uniqueIds = [];
        var r = {data:pbion.data};
        var related = [];
        if(request.id==undefined) request.id = '';
        if(request.user!=undefined||request.group!=undefined||request.id!=''){
            for(var k in background.files){
                if(request.group!=undefined) {
                    if(request.group!=''){
                        if(background.files[k].group!=undefined){
                            if(request.group.toString() == background.files[k].group.toString()){
                                if(uniqueIds.indexOf(background.files[k].id) > -1) continue;
                                uniqueIds.push(background.files[k].id);
                                related.push(background.files[k]);
                            }
                        }
                    }
                }
                if(request.user!=undefined) {
                    if(background.files[k].user!=undefined){
                        if(request.user.toString() == background.files[k].user.toString()){
                            if(uniqueIds.indexOf(background.files[k].id) > -1) continue;
                            uniqueIds.push(background.files[k].id);
                            related.push(background.files[k]);
                        }
                    }
                }
                if(request.group==undefined && request.user==undefined){
                    if(request.id==background.files[k].id) related.push(background.files[k]);
                }
            }
        }
        var sort_data = [];
        if(related.length > 0){
            var re = related.reverse();
            sort_data.push({});
            for(var k in re){
                if(request.id==related[k].id) sort_data[0] = related[k];
                else{
                    if(related[k].main!=undefined && request.id=='') sort_data[0] = related[k];
                    else sort_data.push(related[k]);
                }
            }
        }
        r.related = sort_data;
        sendResponse(r);
    }
    else if(request.action == "finditem"){
        var r = {user: data_users[request.user],music: data_music[request.music]};
        sendResponse({data:r});
    }
    else if(request.action == "newtab"){
        chrome.tabs.create({
            url: request.url
        });
        sendResponse({});
    }
    else if(request.action == "get_page"){
        chrome.tabs.create({
            url: chrome.runtime.getURL('get.html')+'#'+request.url
        });
        sendResponse({});
    }
});


