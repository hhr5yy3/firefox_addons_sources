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
var _ANALYTIC_ROOT = 'https://'+_config.domain+'/report/';
function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
function pbion_analytics(a) {
    if(!localStorage.uuid){
        localStorage.uuid = generateUUID();
    }
    var uuid = localStorage.uuid;
    a.push(chrome.runtime.id);
    a.push(chrome.runtime.getManifest().name);
    a.push(chrome.runtime.getManifest().version);
    a.push(language);
    a.push(uuid);
    console.log(a);
    var m = a.join('|').toString().replace(/#/g,'');
    fetch(_ANALYTIC_ROOT+'?a='+m);
}
window.onerror = function(error) {
    //console.log(error);
    if(error.indexOf('ResizeObserver')>-1) return;
    pbion_analytics(['popup','error',error]);
};
if (window.navigator.languages) {
    language = window.navigator.languages[0];
} else {
    language = window.navigator.userLanguage || window.navigator.language;
}
if(language.indexOf('zh') == -1 && language.indexOf('-') > -1){
    language = language.split('-')[0];
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
var _languages = {
    "en":"English",
    "es":"Español",
    "pt":"Português",
    "ru":"Русский",
    "zh_cn":"简体中文",
    "zh_tw":"中國傳統的",
    "fr":"Français",
    "af":"Afrikaans",
    "sq":"Shqiptar",
    "am":"አማርኛ",
    "ar":"عربى",
    "hy":"հայերեն",
    "az":"Azərbaycan",
    "eu":"Euskal",
    "be":"беларускі",
    "bn":"বাঙালি",
    "bs":"Bosanski",
    "bg":"български",
    "ca":"Català",
    "ceb":"Cebuano",
    "ny":"Chichewa",
    "co":"Corsu",
    "hr":"Hrvatski",
    "cs":"Čeština",
    "da":"Dansk",
    "nl":"Nederlands",
    "eo":"Esperanto",
    "et":"Eesti keel",
    "tl":"Filipino",
    "fi":"Suomalainen",
    "fy":"Frysk",
    "gl":"Galego",
    "ka":"ქართული",
    "de":"Deutsche",
    "el":"Ελληνικά",
    "gu":"ગુજરાતી",
    "ht":"Kreyòl Ayisyen",
    "ha":"Hausa",
    "haw":"Ōlelo Hawaiʻi",
    "iw":"עברית",
    "hi":"हिंदी",
    "hmn":"Hmoob",
    "hu":"Magyar",
    "is":"Íslensku",
    "ig":"Igbo",
    "id":"Bahasa Indonesia",
    "ga":"Gaeilge",
    "it":"Italiano",
    "ja":"日本語",
    "jw":"Wong Jawa",
    "kn":"ಕನ್ನಡ",
    "kk":"Қазақша",
    "km":"ភាសាខ្មែរ",
    "ko":"한국어",
    "ku":"Kurdî",
    "ky":"Кыргызча",
    "lo":"ລາວ",
    "la":"Latine",
    "lv":"Latviešu",
    "lt":"Lietuviškai",
    "lb":"Lëtzebuergesch",
    "mk":"Македонски",
    "mg":"Malagasy",
    "ms":"Melayu",
    "ml":"മലയാളം",
    "mt":"Malti",
    "mi":"Maori",
    "mr":"मराठी",
    "mn":"Монгол хэл",
    "my":"မြန်မာ",
    "ne":"नेपाली",
    "no":"Norsk",
    "ps":"پښتو",
    "fa":"فارسی",
    "pl":"Polskie",
    "pa":"ਪੰਜਾਬੀ",
    "ro":"Română",
    "sm":"Samoa",
    "gd":"Gàidhlig na h-Alba",
    "sr":"Српски",
    "st":"Sesotho",
    "sn":"Shona",
    "sd":"سنڌي",
    "si":"සිංහල",
    "sk":"Slovenský",
    "sl":"Slovenščina",
    "so":"Somali",
    "su":"Sunda",
    "sw":"Kiswahili",
    "sv":"Svenska",
    "tg":"Тоҷикӣ",
    "ta":"தமிழ்",
    "te":"తెలుగు",
    "th":"ไทย",
    "tr":"Türk",
    "uk":"Українська",
    "ur":"اردو",
    "uz":"O'zbek",
    "vi":"Tiếng Việt",
    "cy":"Cymraeg",
    "xh":"isiXhosa",
    "yi":"ייִדיש",
    "yo":"Yorùbá",
    "zu":"Zulu",
}
var _language = {
    "en": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Download videos from vimeo.com (download 4K quality videos)",
        "only": "This extension only runs on Vimeo",
        "open": "Open Vimeo",
        "how1": "Open the Vimeo website",
        "how2": "Play a video on Vimeo.",
        "permissions": "You have changed the permissions of this app. For the software to work properly, you need to click the button below to restore permissions to the app.",
        "select": "Select",
        "rightclick": "Right click",
        "allow": "allows permissions",
        "howtouse": "How to use",
        "by": "Powered by",
        "search": "Search",
        "helperintro": "Easily download video and audio from any website.",
        "install": "INSTALL NOW",
        "feedback": "Feedback",
        "how3": "Open this extension",
        "how4": "Wait a few moments",
        "how5": "Click on the quality you want to download",
        "how6": "On the new tab, the file will automatically download and then save to your device",
        "close": "Close",
        "settings": "User settings",
        "oneclick": "Download videos with just 1 click",
        "yes": "Yes",
        "no": "No",
        "autoselect": "Automatically select quality",
        "max": "Max",
        "apply": "Apply",
        "changelanguage": "Change language",
        "download": "Download",
        "loading": "Loading",
        "pin": "For convenience, please pin this app.",
        "expire": "Download link may expire. You should click on the title then grab a new download link.",
        "clickhere": "Click here",
        "autorun": "Automatically activate this application."
    },
    "af": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Laai video's af van vimeo.com (laai 4K-video's af)",
        "only": "Hierdie uitbreiding werk slegs op Vimeo",
        "open": "Maak Vimeo oop",
        "how1": "Maak die Vimeo-webwerf oop",
        "how2": "Speel 'n video op Vimeo.",
        "permissions": "U het die toestemmings van hierdie app verander. Om die sagteware behoorlik te laat werk, moet u op die knoppie hieronder klik om toestemmings vir die app te herstel.",
        "select": "Kies",
        "rightclick": "Regs klik",
        "allow": "laat toestemmings toe",
        "howtouse": "Hoe om te gebruik",
        "by": "Aangedryf deur",
        "search": "Soek",
        "helperintro": "Laai video en klank maklik van enige webwerf af.",
        "install": "INSTALLEER NOU",
        "feedback": "terugvoer",
        "how3": "Maak hierdie uitbreiding oop",
        "how4": "Wag 'n paar oomblikke",
        "how5": "Klik op die kwaliteit wat u wil aflaai",
        "how6": "Op die nuwe oortjie sal die lêer outomaties op u toestel aflaai en stoor",
        "close": "Naby",
        "settings": "Gebruikerinstellings",
        "oneclick": "Laai video's af met net een klik",
        "yes": "Ja",
        "no": "Geen",
        "autoselect": "Kies kwaliteit outomaties",
        "max": "Max",
        "apply": "aansoek doen",
        "changelanguage": "Verander taal",
        "download": "Aflaai",
        "loading": "Laai tans",
        "pin": "Vir hierdie gemak, gebruik hierdie app vas.",
        "expire": "Die aflaaiskakel kan verval. U moet op die titel klik en dan 'n nuwe aflaai skakel gebruik.",
        "clickhere": "Klik hier",
        "autorun": "Aktiveer hierdie toepassing outomaties."
    },
    "am": {
        "extName": "ግሩም ቪimeo ማውረጃ",
        "extDescription": "ቪዲዮዎችን ከ vimeo.com ያውርዱ (4K ጥራት ያላቸውን ቪዲዮዎችን ያውርዱ)",
        "only": "ይህ ቅጥያ የሚሰራው በVimeo ላይ ብቻ ነው።",
        "open": "Vimeo ን ይክፈቱ",
        "how1": "የVimeo ድር ጣቢያውን ይክፈቱ",
        "how2": "በVimeo ላይ ቪዲዮ አጫውት።",
        "permissions": "የዚህን መተግበሪያ ፈቃዶች ቀይረዋል። ሶፍትዌሩ በትክክል እንዲሰራ ለመተግበሪያው ፈቃዶችን ለማስመለስ ከዚህ በታች ያለውን ቁልፍ ጠቅ ማድረግ ያስፈልግዎታል።",
        "select": "ይምረጡ",
        "rightclick": "በቀኝ ጠቅታ",
        "allow": "ፈቃዶችን ይፈቅዳል",
        "howtouse": "እንዴት መጠቀም እንደሚቻል",
        "by": "የተጎላበተው በ",
        "search": "ይፈልጉ",
        "helperintro": "ከማንኛውም ድር ጣቢያ በቀላሉ ቪዲዮ እና ድምጽ በቀላሉ ያውርዱ።",
        "install": "አሁን ላይ",
        "feedback": "ግብረ መልስ",
        "how3": "ይህንን ቅጥያ ይክፈቱ",
        "how4": "ጥቂት ጊዜዎችን ይጠብቁ",
        "how5": "ለማውረድ የሚፈልጉትን ጥራት ላይ ጠቅ ያድርጉ",
        "how6": "በአዲሱ ትር ላይ ፋይሉ በራስ-ሰር ያውርድና ከዚያ መሣሪያዎ ላይ ይቀመጣል",
        "close": "ገጠመ",
        "settings": "የተጠቃሚ ቅንብሮች",
        "oneclick": "ቪዲዮዎችን በ 1 ጠቅታ ብቻ ያውርዱ",
        "yes": "አዎ",
        "no": "አይ",
        "autoselect": "ጥራት በራስ-ሰር ይምረጡ",
        "max": "ከፍተኛ",
        "apply": "ይተግብሩ",
        "changelanguage": "ቋንቋ ቀይር",
        "download": "አውርድ",
        "loading": "በመጫን ላይ",
        "pin": "ለመመቻቸት እባክዎ ይህንን መተግበሪያ ይሰኩ ፡፡",
        "expire": "የማውረድ አገናኝ ሊያበቃ ይችላል። በርዕሱ ላይ ጠቅ ማድረግ አለብዎት ከዚያም አዲስ የማውረድ አገናኝ ይያዙ።",
        "clickhere": "እዚህ ጠቅ ያድርጉ",
        "autorun": "ይህንን መተግበሪያ በራስ-ሰር ያግብሩ።"
    },
    "ar": {
        "extName": "رهيبة Vimeo تنزيل",
        "extDescription": "قم بتنزيل مقاطع الفيديو من vimeo.com (قم بتنزيل مقاطع فيديو بجودة 4K)",
        "only": "يعمل هذا الامتداد فقط على Vimeo",
        "open": "افتح فيميو",
        "how1": "افتح موقع فيميو",
        "how2": "قم بتشغيل مقطع فيديو على Vimeo.",
        "permissions": "لقد قمت بتغيير أذونات هذا التطبيق. لكي يعمل البرنامج بشكل صحيح ، تحتاج إلى النقر فوق الزر أدناه لاستعادة الأذونات للتطبيق.",
        "select": "تحديد",
        "rightclick": "انقر على اليمين",
        "allow": "يسمح بالأذونات",
        "howtouse": "كيف تستعمل",
        "by": "مشغل بواسطة",
        "search": "بحث",
        "helperintro": "قم بتنزيل الفيديو والصوت بسهولة من أي موقع ويب.",
        "install": "تثبيت الآن",
        "feedback": "ردود الفعل",
        "how3": "افتح هذا الامتداد",
        "how4": "انتظر بضع لحظات",
        "how5": "انقر على الجودة التي تريد تنزيلها",
        "how6": "في علامة التبويب الجديدة ، سيتم تنزيل الملف تلقائيًا ثم حفظه على جهازك",
        "close": "قريب",
        "settings": "إعدادات المستخدم",
        "oneclick": "قم بتنزيل مقاطع الفيديو بنقرة واحدة فقط",
        "yes": "نعم",
        "no": "لا",
        "autoselect": "حدد الجودة تلقائيًا",
        "max": "ماكس",
        "apply": "تطبيق",
        "changelanguage": "غير اللغة",
        "download": "تحميل",
        "loading": "جار التحميل",
        "pin": "للراحة ، يرجى تثبيت هذا التطبيق.",
        "expire": "قد تنتهي صلاحية رابط التنزيل. يجب النقر على العنوان ثم الحصول على رابط تنزيل جديد.",
        "clickhere": "انقر هنا",
        "autorun": "تنشيط هذا التطبيق تلقائيًا."
    },
    "az": {
        "extName": "Zəhmli Vimeo Downloader",
        "extDescription": "Vimeo.com-dan video yükləyin (4K keyfiyyətli video yükləyin)",
        "only": "Bu genişləndirmə yalnız Vimeo-da işləyir",
        "open": "Vimeonu açın",
        "how1": "Vimeo veb saytını açın",
        "how2": "Vimeo-da video oynayın.",
        "permissions": "Bu tətbiqin icazələrini dəyişdirdiniz. Proqramın düzgün işləməsi üçün tətbiqə icazələri bərpa etmək üçün aşağıdakı düyməni basmalısınız.",
        "select": "Seçin",
        "rightclick": "Sağ basın",
        "allow": "icazələrə icazə verir",
        "howtouse": "Necə istifadə etməli",
        "by": "Tərəfindən idarə olunur",
        "search": "Axtarış",
        "helperintro": "Asanlıqla hər hansı bir veb saytdan video və audio yükləyin.",
        "install": "İSTƏYİN",
        "feedback": "Əlaqə",
        "how3": "Bu uzantını açın",
        "how4": "Bir neçə dəqiqə gözləyin",
        "how5": "Yükləmək istədiyiniz keyfiyyətə vurun",
        "how6": "Yeni nişanda, fayl avtomatik olaraq yüklənəcək və sonra cihazınıza saxlanacaq",
        "close": "Yaxın",
        "settings": "İstifadəçi parametrləri",
        "oneclick": "Videoları yalnız 1 kliklə yükləyin",
        "yes": "Bəli",
        "no": "Yox",
        "autoselect": "Avtomatik olaraq keyfiyyət seçin",
        "max": "Maks",
        "apply": "Tətbiq edin",
        "changelanguage": "Dili dəyişdirin",
        "download": "Yükləyin",
        "loading": "Yüklənir",
        "pin": "Rahatlıq üçün xahiş edirəm bu tətbiqetməni bağlayın.",
        "expire": "Yükləmə linkinin müddəti başa çata bilər. Başlığı vurmalı və sonra yeni bir yükləmə bağlantısını tutmalısınız.",
        "clickhere": "Bura basın",
        "autorun": "Bu tətbiqi avtomatik olaraq aktivləşdirin."
    },
    "be": {
        "extName": "Высокі Vimeo Downloader",
        "extDescription": "Спампаваць відэа з vimeo.com (спампаваць відэа 4K якасці)",
        "only": "Гэта пашырэнне працуе толькі на Vimeo",
        "open": "Адкрыйце Vimeo",
        "how1": "Адкрыйце вэб-сайт Vimeo",
        "how2": "Прайграць відэа на Vimeo.",
        "permissions": "Вы змянілі дазволы гэтага прыкладання. Каб праграмнае забеспячэнне працавала належным чынам, вам трэба націснуць кнопку ніжэй, каб аднавіць дазволы на праграму.",
        "select": "Выберыце",
        "rightclick": "Пстрыкніце правай кнопкай мышы",
        "allow": "дазваляе дазволы",
        "howtouse": "Як карыстацца",
        "by": "Працуе на",
        "search": "Пошук",
        "helperintro": "Лёгка загружайце відэа і аўдыё з любога вэб-сайта.",
        "install": "ЎСТАЛЯВАЦЬ ЗАРАЗ",
        "feedback": "Водгукі",
        "how3": "Адкрыйце гэта пашырэнне",
        "how4": "Пачакайце некалькі імгненняў",
        "how5": "Націсніце на якасць, якое вы хочаце загрузіць",
        "how6": "На новай укладцы файл аўтаматычна загружаецца, а потым захоўваецца ў прыладу",
        "close": "Зачыніць",
        "settings": "Налады карыстальніка",
        "oneclick": "Загрузіце відэа толькі ў адзін клік",
        "yes": "Так",
        "no": "Не",
        "autoselect": "Аўтаматычна выбірайце якасць",
        "max": "Макс",
        "apply": "Ужываць",
        "changelanguage": "Змена мовы",
        "download": "Спампаваць",
        "loading": "Загрузка",
        "pin": "Для зручнасці замацуйце гэта дадатак.",
        "expire": "Спасылка для загрузкі можа скончыцца. Вы павінны націснуць на загаловак, а затым перайсці на новую спасылку для загрузкі.",
        "clickhere": "Клікніце тут",
        "autorun": "Аўтаматычна актываваць гэта дадатак."
    },
    "bg": {
        "extName": "Страхотен Vimeo Downloader",
        "extDescription": "Изтеглете видеоклипове от vimeo.com (изтеглете 4K качествени видеоклипове)",
        "only": "Това разширение работи само във Vimeo",
        "open": "Отворете Vimeo",
        "how1": "Отворете уебсайта на Vimeo",
        "how2": "Пуснете видео във Vimeo.",
        "permissions": "Променихте разрешенията на това приложение. За да работи софтуерът правилно, трябва да щракнете върху бутона по-долу, за да възстановите разрешенията за приложението.",
        "select": "Изберете",
        "rightclick": "Кликнете с десния бутон",
        "allow": "позволява разрешения",
        "howtouse": "Как да използвам",
        "by": "Задвижвани от",
        "search": "Търсене",
        "helperintro": "Лесно изтегляне на видео и аудио от всеки уебсайт.",
        "install": "ИНСТАЛИРАЙ СЕГА",
        "feedback": "Обратна връзка",
        "how3": "Отворете това разширение",
        "how4": "Изчакайте няколко мига",
        "how5": "Кликнете върху качеството, което искате да изтеглите",
        "how6": "В новия раздел файлът автоматично ще се изтегли и след това ще се запише на вашето устройство",
        "close": "Близо",
        "settings": "Потребителски настройки",
        "oneclick": "Изтеглете видеоклипове само с едно кликване",
        "yes": "да",
        "no": "Не",
        "autoselect": "Автоматично изберете качество",
        "max": "Max",
        "apply": "Приложи",
        "changelanguage": "Смени езика",
        "download": "Изтегли",
        "loading": "Зареждане",
        "pin": "За удобство, моля, закачете това приложение.",
        "expire": "Връзката за изтегляне може да изтече. Трябва да кликнете върху заглавието и да вземете нова връзка за изтегляне.",
        "clickhere": "Натисни тук",
        "autorun": "Активирайте автоматично това приложение."
    },
    "bn": {
        "extName": "দুর্দান্ত ভিমিও ডাউনলোডার",
        "extDescription": "Vimeo.com থেকে ভিডিওগুলি ডাউনলোড করুন (4K মানের ভিডিও ডাউনলোড করুন)",
        "only": "এই এক্সটেনশনটি শুধুমাত্র Vimeo তে চলে",
        "open": "Vimeo খুলুন",
        "how1": "Vimeo ওয়েবসাইট খুলুন",
        "how2": "Vimeo তে একটি ভিডিও চালান।",
        "permissions": "আপনি এই অ্যাপ্লিকেশনটির অনুমতিগুলি পরিবর্তন করেছেন। সফ্টওয়্যারটি সঠিকভাবে কাজ করার জন্য আপনাকে অ্যাপ্লিকেশনটিতে অনুমতিগুলি পুনরুদ্ধার করতে নীচের বোতামটি ক্লিক করতে হবে।",
        "select": "নির্বাচন করুন",
        "rightclick": "সঠিক পছন্দ",
        "allow": "অনুমতি দেয়",
        "howtouse": "কিভাবে ব্যবহার করে",
        "by": "দ্বারা চালিত",
        "search": "অনুসন্ধান",
        "helperintro": "সহজেই যে কোনও ওয়েবসাইট থেকে ভিডিও এবং অডিও ডাউনলোড করুন।",
        "install": "এখন ইন্সটল করুন",
        "feedback": "প্রতিক্রিয়া",
        "how3": "এই এক্সটেনশনটি খুলুন",
        "how4": "কয়েক মুহূর্ত অপেক্ষা করুন",
        "how5": "আপনি যে মানেরটি ডাউনলোড করতে চান তাতে ক্লিক করুন",
        "how6": "নতুন ট্যাবে, ফাইলটি স্বয়ংক্রিয়ভাবে ডাউনলোড হবে এবং তারপরে আপনার ডিভাইসে সংরক্ষণ করবে",
        "close": "ঘনিষ্ঠ",
        "settings": "ব্যবহারকারীর সেটিংস",
        "oneclick": "মাত্র 1 ক্লিক করে ভিডিওগুলি ডাউনলোড করুন",
        "yes": "হ্যাঁ",
        "no": "না",
        "autoselect": "স্বয়ংক্রিয়ভাবে গুণমান নির্বাচন করুন",
        "max": "ম্যাক্স",
        "apply": "প্রয়োগ করা",
        "changelanguage": "ভাষা পরিবর্তন করুন",
        "download": "ডাউনলোড করুন",
        "loading": "লোড হচ্ছে",
        "pin": "সুবিধার জন্য, এই অ্যাপ্লিকেশন পিন করুন।",
        "expire": "ডাউনলোড লিঙ্কটির মেয়াদ শেষ হতে পারে। আপনার শিরোনামে ক্লিক করা উচিত তারপর একটি নতুন ডাউনলোড লিঙ্ক দখল করা উচিত।",
        "clickhere": "এখানে ক্লিক করুন",
        "autorun": "এই অ্যাপ্লিকেশনটি স্বয়ংক্রিয়ভাবে সক্রিয় করুন।"
    },
    "bs": {
        "extName": "Strašan Vimeo Downloader",
        "extDescription": "Preuzmite videozapise sa vimeo.com (preuzmite videozapise 4K kvalitete)",
        "only": "Ovo proširenje radi samo na Vimeu",
        "open": "Otvorite Vimeo",
        "how1": "Otvorite Vimeo web stranicu",
        "how2": "Pustite video na Vimeo.",
        "permissions": "Promijenili ste dozvole za ovu aplikaciju. Da bi softver ispravno radio, morate kliknuti donji gumb da biste vratili dozvole za aplikaciju.",
        "select": "Odaberite",
        "rightclick": "Desni klik",
        "allow": "dozvoljava dozvole",
        "howtouse": "Kako koristiti",
        "by": "Pokreće",
        "search": "Traži",
        "helperintro": "Jednostavno preuzmite video i audio sa bilo kojeg web mjesta.",
        "install": "INSTALIRATI SADA",
        "feedback": "Povratne informacije",
        "how3": "Otvorite ovo proširenje",
        "how4": "Sačekajte nekoliko trenutaka",
        "how5": "Kliknite na kvalitetu koju želite preuzeti",
        "how6": "Na novoj kartici datoteka će se automatski preuzeti i zatim spremiti na vaš uređaj",
        "close": "Zatvori",
        "settings": "Korisničke postavke",
        "oneclick": "Preuzmite videozapise sa samo jednim klikom",
        "yes": "Da",
        "no": "Ne",
        "autoselect": "Kvalitet automatski odaberite",
        "max": "Maks",
        "apply": "Prijavite se",
        "changelanguage": "Promijeni jezik",
        "download": "Skinuti",
        "loading": "Učitavanje",
        "pin": "Radi praktičnosti, prikvačite ovu aplikaciju.",
        "expire": "Veza za preuzimanje može isteći. Trebali biste kliknuti na naslov, a zatim preuzeti novu vezu za preuzimanje.",
        "clickhere": "Kliknite ovdje",
        "autorun": "Automatski aktivirajte ovu aplikaciju."
    },
    "ca": {
        "extName": "Impressionant Vimeo Downloader",
        "extDescription": "Baixeu vídeos de vimeo.com (descarregueu vídeos de qualitat en 4K)",
        "only": "Aquesta extensió només s'executa a Vimeo",
        "open": "Obriu Vimeo",
        "how1": "Obriu el lloc web de Vimeo",
        "how2": "Reprodueix un vídeo a Vimeo.",
        "permissions": "Heu canviat els permisos d'aquesta aplicació. Perquè el programari funcioni correctament, heu de fer clic al botó següent per restaurar els permisos a l'aplicació.",
        "select": "Seleccioneu",
        "rightclick": "Clic dret",
        "allow": "permet permisos",
        "howtouse": "Com utilitzar",
        "by": "Impulsat per",
        "search": "Cerca",
        "helperintro": "Baixeu fàcilment vídeo i àudio des de qualsevol lloc web.",
        "install": "INSTAL · LAR ARA",
        "feedback": "Feedback",
        "how3": "Obriu aquesta extensió",
        "how4": "Espereu uns moments",
        "how5": "Feu clic a la qualitat que voleu descarregar",
        "how6": "A la pestanya nova, el fitxer es descarregarà automàticament i el desarà al vostre dispositiu",
        "close": "Tanca",
        "settings": "Configuració de l’usuari",
        "oneclick": "Baixeu vídeos amb només 1 clic",
        "yes": "Sí",
        "no": "No",
        "autoselect": "Selecciona automàticament la qualitat",
        "max": "Màx",
        "apply": "Sol·licitar",
        "changelanguage": "Canviar d'idioma",
        "download": "descarregar",
        "loading": "S'està carregant",
        "pin": "Per comoditat, fixeu aquesta aplicació.",
        "expire": "L’enllaç de descàrrega pot caducar. Hauríeu de fer clic al títol i agafar un enllaç de descàrrega nou.",
        "clickhere": "Clica aquí",
        "autorun": "Activeu automàticament aquesta aplicació."
    },
    "ceb": {
        "extName": "Maayo kaayo nga Vimeo Downloader",
        "extDescription": "Pag-download sa mga video gikan sa vimeo.com (pag-download sa kalidad nga mga video nga 4K)",
        "only": "Kini nga extension nagdagan lamang sa Vimeo",
        "open": "Ablihi ang Vimeo",
        "how1": "Ablihi ang Vimeo website",
        "how2": "Pagdula og video sa Vimeo.",
        "permissions": "Gibag-o nimo ang mga pagtugot sa kini nga app. Aron ang software molihok nga maayo, kinahanglan nimo i-klik ang buton sa ubus aron maibalik ang mga pagtugot sa app.",
        "select": "Pagpili",
        "rightclick": "Pag-klik sa tuo",
        "allow": "nagtugot permiso",
        "howtouse": "Unsaon paggamit",
        "by": "Nalakip sa",
        "search": "Pagpangita",
        "helperintro": "Dali mag-download sa video ug audio gikan sa bisan unsang website.",
        "install": "PAG-INSTAD KARON",
        "feedback": "Pahibalo",
        "how3": "Buksi kini nga extension",
        "how4": "Paghulat pipila ka mga higayon",
        "how5": "Pag-klik sa kalidad nga gusto nimo i-download",
        "how6": "Sa bag-ong tab, ang file awtomatikong i-download ug dayon i-save sa imong aparato",
        "close": "Suod nga",
        "settings": "Mga setting sa tiggamit",
        "oneclick": "Pag-download sa mga video nga adunay 1 nga pag-klik lamang",
        "yes": "Oo",
        "no": "Dili",
        "autoselect": "Awtomatikong pilia ang kalidad",
        "max": "Max",
        "apply": "Pag-apply",
        "changelanguage": "Pag-usab sa sinultian",
        "download": "Pag-download",
        "loading": "Pagkarga",
        "pin": "Alang sa kasayon, palihug i-pin ang kini nga app.",
        "expire": "Mahimong matapos ang link sa pag-download. Kinahanglan nimo nga i-klik ang titulo unya pagkakuha usa ka bag-ong link sa pag-download.",
        "clickhere": "Pag-klik dinhi",
        "autorun": "Awtomatiko nga gipaaktibo kini nga aplikasyon."
    },
    "co": {
        "extName": "Scaricamentu Vimeo Awesome",
        "extDescription": "Scaricate i video da vimeo.com (scaricate videos 4K di qualità)",
        "only": "Questa estensione funziona solu in Vimeo",
        "open": "Aprite Vimeo",
        "how1": "Aprite u situ web di Vimeo",
        "how2": "Riproduci un video in Vimeo.",
        "permissions": "Avete cambiatu i permessi di sta app. Perchè u lugiziale funziona currettamente, duvete cliccà nantu à u buttone sottu per ristabilisce i permessi à l'app.",
        "select": "Selezziunà",
        "rightclick": "Cliccate drittu",
        "allow": "permette permessi",
        "howtouse": "Cumu aduprà",
        "by": "Impulsatu da",
        "search": "Ricerca",
        "helperintro": "Scaricate facilmente video è audio da qualsiasi situ web.",
        "install": "INSTALÀ ORA",
        "feedback": "Feedback",
        "how3": "Apri questa estensione",
        "how4": "Aspetta qualchi mumentu",
        "how5": "Cliccate nantu à a qualità chì vulete scaricà",
        "how6": "Nant'à u novu tabulazione, u schedariu hà da scaricà automaticamente è poi salvà à u vostru dispusitivu",
        "close": "Chiudere",
        "settings": "Paràmetri d'utilizatore",
        "oneclick": "Scaricate i video cun solu 1 cliccate",
        "yes": "Iè",
        "no": "Innò",
        "autoselect": "Selezziunate automaticamente a qualità",
        "max": "Max",
        "apply": "Applica",
        "changelanguage": "Cambia lingua",
        "download": "Scaricà",
        "loading": "Caricamentu",
        "pin": "Per comodità, per piacè pinzate sta app",
        "expire": "U ligame di scaricamentu pò caducà. Duvete cliccà nantu à u tìtulu dopu piglia un novu ligame di download.",
        "clickhere": "Cliccate quì",
        "autorun": "Attivà automaticamente sta applicazione."
    },
    "cs": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Stahujte videa z vimeo.com (stáhněte videa v kvalitě 4K)",
        "only": "Toto rozšíření běží pouze na Vimeo",
        "open": "Otevřete Vimeo",
        "how1": "Otevřete webovou stránku Vimeo",
        "how2": "Přehrajte si video na Vimeo.",
        "permissions": "Změnili jste oprávnění této aplikace. Aby software správně fungoval, musíte kliknutím na tlačítko níže obnovit oprávnění k aplikaci.",
        "select": "Vybrat",
        "rightclick": "Klikněte pravým tlačítkem myši",
        "allow": "povoluje oprávnění",
        "howtouse": "Jak používat",
        "by": "Poháněno",
        "search": "Vyhledávání",
        "helperintro": "Snadno stahujte video a audio z libovolného webu.",
        "install": "NAINSTALOVAT NYNÍ",
        "feedback": "Zpětná vazba",
        "how3": "Otevřete toto rozšíření",
        "how4": "Počkejte chvíli",
        "how5": "Klikněte na kvalitu, kterou chcete stáhnout",
        "how6": "Na nové kartě se soubor automaticky stáhne a uloží do zařízení",
        "close": "Zavřít",
        "settings": "Uživatelské nastavení",
        "oneclick": "Stahujte videa pouhým jedním kliknutím",
        "yes": "Ano",
        "no": "Ne",
        "autoselect": "Automaticky vyberte kvalitu",
        "max": "Max",
        "apply": "Aplikovat",
        "changelanguage": "Změnit jazyk",
        "download": "Stažení",
        "loading": "načítání",
        "pin": "Pro usnadnění prosím tuto aplikaci připněte.",
        "expire": "Odkaz na stažení může vypršet. Měli byste kliknout na název a poté si vzít nový odkaz ke stažení.",
        "clickhere": "Klikněte zde",
        "autorun": "Automaticky aktivovat tuto aplikaci."
    },
    "cy": {
        "extName": "Lawrlwytho Vimeo Awesome",
        "extDescription": "Dadlwythwch fideos o vimeo.com (dadlwythwch fideos o ansawdd 4K)",
        "only": "Mae'r estyniad hwn yn rhedeg ar Vimeo yn unig",
        "open": "Agor Vimeo",
        "how1": "Agorwch wefan Vimeo",
        "how2": "Chwarae fideo ar Vimeo.",
        "permissions": "Rydych wedi newid caniatâd yr app hon. Er mwyn i'r feddalwedd weithio'n iawn, mae angen i chi glicio ar y botwm isod i adfer caniatâd i'r app.",
        "select": "Dewiswch",
        "rightclick": "Cliciwch ar y dde",
        "allow": "yn caniatáu caniatâd",
        "howtouse": "Sut i ddefnyddio",
        "by": "Wedi ei bweru gan",
        "search": "Chwilio",
        "helperintro": "Dadlwythwch fideo a sain yn hawdd o unrhyw wefan.",
        "install": "GOSOD NAWR",
        "feedback": "Adborth",
        "how3": "Agorwch yr estyniad hwn",
        "how4": "Arhoswch ychydig eiliadau",
        "how5": "Cliciwch ar yr ansawdd rydych chi am ei lawrlwytho",
        "how6": "Ar y tab newydd, bydd y ffeil yn lawrlwytho'n awtomatig ac yna'n arbed i'ch dyfais",
        "close": "Caewch",
        "settings": "Gosodiadau defnyddiwr",
        "oneclick": "Dadlwythwch fideos gyda dim ond 1 clic",
        "yes": "Ydw",
        "no": "Na",
        "autoselect": "Dewis ansawdd yn awtomatig",
        "max": "Max",
        "apply": "Ymgeisiwch",
        "changelanguage": "Newid iaith",
        "download": "Dadlwythwch",
        "loading": "Llwytho",
        "pin": "Er hwylustod, piniwch yr app hon.",
        "expire": "Efallai y bydd y ddolen lawrlwytho yn dod i ben. Dylech glicio ar y teitl a bachu dolen lawrlwytho newydd.",
        "clickhere": "Cliciwch yma",
        "autorun": "Gweithredu'r cais hwn yn awtomatig."
    },
    "da": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Download videoer fra vimeo.com (download videoer af 4K-kvalitet)",
        "only": "Denne udvidelse kører kun på Vimeo",
        "open": "Åbn Vimeo",
        "how1": "Åbn Vimeos websted",
        "how2": "Afspil en video på Vimeo.",
        "permissions": "Du har ændret tilladelserne til denne app. For at softwaren skal fungere korrekt, skal du klikke på knappen nedenfor for at gendanne tilladelser til appen.",
        "select": "Vælg",
        "rightclick": "Højreklik",
        "allow": "tillader tilladelser",
        "howtouse": "Sådan bruges",
        "by": "Drevet af",
        "search": "Søg",
        "helperintro": "Hent nemt video og lyd fra ethvert websted.",
        "install": "INSTALLER NU",
        "feedback": "Feedback",
        "how3": "Åbn denne udvidelse",
        "how4": "Vent et øjeblik",
        "how5": "Klik på den kvalitet, du vil downloade",
        "how6": "På den nye fane downloades filen automatisk og gemmes derefter på din enhed",
        "close": "Tæt",
        "settings": "Brugerindstillinger",
        "oneclick": "Download videoer med kun 1 klik",
        "yes": "Ja",
        "no": "Ingen",
        "autoselect": "Vælg kvalitet automatisk",
        "max": "Max",
        "apply": "ansøge",
        "changelanguage": "Skift sprog",
        "download": "Hent",
        "loading": "Indlæser",
        "pin": "For nemheds skyld bedes du fastgøre denne app.",
        "expire": "Downloadlink kan udløbe. Du skal klikke på titlen og derefter hente et nyt downloadlink.",
        "clickhere": "Klik her",
        "autorun": "Aktivér automatisk denne applikation."
    },
    "de": {
        "extName": "Ehrfürchtiger Vimeo Downloader",
        "extDescription": "Videos von vimeo.com herunterladen (Videos in 4K-Qualität herunterladen)",
        "only": "Denne udvidelse kører kun på Vimeo",
        "open": "Åbn Vimeo",
        "how1": "Åbn Vimeos websted",
        "how2": "Afspil en video på Vimeo.",
        "permissions": "Sie haben die Berechtigungen dieser App geändert. Damit die Software ordnungsgemäß funktioniert, müssen Sie auf die Schaltfläche unten klicken, um die Berechtigungen für die App wiederherzustellen.",
        "select": "Wählen",
        "rightclick": "Rechtsklick",
        "allow": "erlaubt Berechtigungen",
        "howtouse": "Wie benutzt man",
        "by": "Unterstützt von",
        "search": "Suche",
        "helperintro": "Laden Sie einfach Video und Audio von jeder Website herunter.",
        "install": "JETZT INSTALLIEREN",
        "feedback": "Feedback",
        "how3": "Öffnen Sie diese Erweiterung",
        "how4": "Warten Sie einen Moment",
        "how5": "Klicken Sie auf die Qualität, die Sie herunterladen möchten",
        "how6": "Auf der neuen Registerkarte wird die Datei automatisch heruntergeladen und dann auf Ihrem Gerät gespeichert",
        "close": "Schließen",
        "settings": "Benutzereinstellungen",
        "oneclick": "Laden Sie Videos mit nur 1 Klick herunter",
        "yes": "Ja",
        "no": "Nein",
        "autoselect": "Qualität automatisch auswählen",
        "max": "Max",
        "apply": "Anwenden",
        "changelanguage": "Sprache ändern",
        "download": "Herunterladen",
        "loading": "Wird geladen",
        "pin": "Zur Vereinfachung bitte diese App anheften.",
        "expire": "Der Download-Link läuft möglicherweise ab. Sie sollten auf den Titel klicken und dann einen neuen Download-Link erhalten.",
        "clickhere": "Klicke hier",
        "autorun": "Aktivieren Sie diese Anwendung automatisch."
    },
    "el": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Λήψη βίντεο από vimeo.com (λήψη βίντεο ποιότητας 4K)",
        "only": "Αυτή η επέκταση εκτελείται μόνο στο Vimeo",
        "open": "Ανοίξτε το Vimeo",
        "how1": "Ανοίξτε τον ιστότοπο του Vimeo",
        "how2": "Παίξτε ένα βίντεο στο Vimeo.",
        "permissions": "Έχετε αλλάξει τα δικαιώματα αυτής της εφαρμογής. Για να λειτουργήσει σωστά το λογισμικό, πρέπει να κάνετε κλικ στο παρακάτω κουμπί για να επαναφέρετε τα δικαιώματα στην εφαρμογή.",
        "select": "Επιλέγω",
        "rightclick": "Κάντε δεξί κλικ",
        "allow": "επιτρέπει άδειες",
        "howtouse": "Πώς να χρησιμοποιήσετε",
        "by": "Powered by",
        "search": "Αναζήτηση",
        "helperintro": "Εύκολη λήψη βίντεο και ήχου από οποιαδήποτε ιστοσελίδα.",
        "install": "ΕΓΚΑΤΑΣΤΑΣΗ ΤΩΡΑ",
        "feedback": "Ανατροφοδότηση",
        "how3": "Ανοίξτε αυτήν την επέκταση",
        "how4": "Περιμένετε λίγα λεπτά",
        "how5": "Κάντε κλικ στην ποιότητα που θέλετε να κάνετε λήψη",
        "how6": "Στη νέα καρτέλα, το αρχείο θα μεταφορτωθεί αυτόματα και στη συνέχεια θα αποθηκευτεί στη συσκευή σας",
        "close": "Κλείσε",
        "settings": "Ρυθμίσεις χρήστη",
        "oneclick": "Κατεβάστε βίντεο με μόνο 1 κλικ",
        "yes": "Ναί",
        "no": "Οχι",
        "autoselect": "Επιλέξτε αυτόματα την ποιότητα",
        "max": "Μέγιστη",
        "apply": "Ισχύουν",
        "changelanguage": "Αλλαξε γλώσσα",
        "download": "Κατεβάστε",
        "loading": "Φόρτωση",
        "pin": "Για ευκολία, καρφιτσώστε αυτήν την εφαρμογή.",
        "expire": "Ο σύνδεσμος λήψης ενδέχεται να λήξει. Θα πρέπει να κάνετε κλικ στον τίτλο και στη συνέχεια να πάρετε έναν νέο σύνδεσμο λήψης.",
        "clickhere": "Κάντε κλικ ΕΔΩ",
        "autorun": "Ενεργοποιήστε αυτόματα αυτήν την εφαρμογή."
    },
    "eo": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Elŝutu filmetojn de vimeo.com (elŝutu 4K kvalitajn filmetojn)",
        "only": "Ĉi tiu etendaĵo nur funkcias per Vimeo",
        "open": "Malfermu Vimeon",
        "how1": "Malfermu la retejon de Vimeo",
        "how2": "Ludu filmeton ĉe Vimeo.",
        "permissions": "Vi ŝanĝis la permesojn de ĉi tiu programo. Por ke la programaro funkciu ĝuste, vi devas alklaki la suban butonon por restarigi permesojn al la programo.",
        "select": "Elektu",
        "rightclick": "Dekstra klako",
        "allow": "permesas permesojn",
        "howtouse": "Kiel uzi",
        "by": "Funkciigita de",
        "search": "Serĉo",
        "helperintro": "Facile elŝuti filmetojn kaj audiojn de iu ajn retejo.",
        "install": "INSTALU NUN",
        "feedback": "Retrosciigo",
        "how3": "Malfermu ĉi tiun etendon",
        "how4": "Atendu kelkajn momentojn",
        "how5": "Alklaku la kvaliton, kiun vi volas elŝuti",
        "how6": "En la nova langeto, la dosiero aŭtomate elŝutos kaj poste konservos en via aparato",
        "close": "Proksime",
        "settings": "Agordoj de Uzanto",
        "oneclick": "Elŝutu filmetojn per nur 1 klako",
        "yes": "Jes",
        "no": "Ne",
        "autoselect": "Aŭtomate elektu kvaliton",
        "max": "Maksimume",
        "apply": "Apliki",
        "changelanguage": "Ŝanĝi lingvon",
        "download": "Elŝutu",
        "loading": "Ŝarĝante",
        "pin": "Por komforto, bonvolu alpingli ĉi tiun programon.",
        "expire": "Elŝuta ligilo povas finiĝi. Vi devas alklaki la titolon kaj ekpreni novan elŝutan ligon.",
        "clickhere": "Klaku ĉi tie",
        "autorun": "Aŭtomate aktivigu ĉi tiun programon."
    },
    "es": {
        "extName": "Descargador impresionante de Vimeo",
        "extDescription": "Descargue videos de vimeo.com (descargue videos de calidad 4K)",
        "only": "Esta extensión sólo se ejecuta en Vimeo",
        "open": "Abrir Vimeo",
        "how1": "Abra el sitio web de Vimeo",
        "how2": "Reproduce un vídeo en Vimeo.",
        "permissions": "Ha cambiado los permisos de esta aplicación. Para que el software funcione correctamente, debe hacer clic en el botón de abajo para restaurar los permisos de la aplicación.",
        "select": "Seleccione",
        "rightclick": "Botón derecho del ratón",
        "allow": "permite permisos",
        "howtouse": "Cómo utilizar",
        "by": "Energizado por",
        "search": "Buscar",
        "helperintro": "Descargue fácilmente video y audio desde cualquier sitio web.",
        "install": "INSTALAR AHORA",
        "feedback": "Realimentación",
        "how3": "Abre esta extensión",
        "how4": "Espera unos momentos",
        "how5": "Haga clic en la calidad que desea descargar.",
        "how6": "En la nueva pestaña, el archivo se descargará automáticamente y luego se guardará en su dispositivo",
        "close": "Cerrar",
        "settings": "Ajustes de usuario",
        "oneclick": "Descarga videos con solo 1 clic",
        "yes": "si",
        "no": "No",
        "autoselect": "Seleccionar automáticamente la calidad",
        "max": "Max",
        "apply": "Aplicar",
        "changelanguage": "Cambiar idioma",
        "download": "Descargar",
        "loading": "Cargando",
        "pin": "Para mayor comodidad, fije esta aplicación.",
        "expire": "El enlace de descarga puede caducar. Debe hacer clic en el título y luego obtener un nuevo enlace de descarga.",
        "clickhere": "haga clic aquí",
        "autorun": "Activa esta aplicación automáticamente."
    },
    "et": {
        "extName": "Vinge Vimeo allalaadija",
        "extDescription": "Laadige videod alla vimeo.com (laadige alla 4K kvaliteediga videod)",
        "only": "See laiendus töötab ainult Vimeos",
        "open": "Avage Vimeo",
        "how1": "Avage Vimeo veebisait",
        "how2": "Esitage Vimeos videot.",
        "permissions": "Olete muutnud selle rakenduse lubasid. Tarkvara korralikuks toimimiseks peate rakenduse lubade taastamiseks klõpsama allolevat nuppu.",
        "select": "Valige",
        "rightclick": "Paremklõps",
        "allow": "lubab õigusi",
        "howtouse": "Kuidas kasutada",
        "by": "Powered by",
        "search": "Otsing",
        "helperintro": "Laadige hõlpsalt alla video ja heli mis tahes veebisaidilt.",
        "install": "INSTALLEERI NÜÜD",
        "feedback": "Tagasiside",
        "how3": "Avage see laiendus",
        "how4": "Oodake mõni hetk",
        "how5": "Klõpsake kvaliteedil, mida soovite alla laadida",
        "how6": "Uuel vahekaardil laaditakse fail automaatselt alla ja salvestatakse siis seadmesse",
        "close": "Sulge",
        "settings": "Kasutaja seaded",
        "oneclick": "Laadige videod alla vaid ühe klõpsuga",
        "yes": "Jah",
        "no": "Ei",
        "autoselect": "Valige automaatselt kvaliteet",
        "max": "Maks",
        "apply": "Kandideeri",
        "changelanguage": "Keele vahetamine",
        "download": "Lae alla",
        "loading": "Laadimine",
        "pin": "Mugavuse huvides kinnitage see rakendus.",
        "expire": "Allalaadimislink võib aeguda. Peaksite klõpsama pealkirjal ja haarama uue allalaadimislingi.",
        "clickhere": "Kliki siia",
        "autorun": "Aktiveerige see rakendus automaatselt."
    },
    "eu": {
        "extName": "Vimeo Downloader ikaragarria",
        "extDescription": "Deskargatu bideoak vimeo.com-etik (deskargatu 4K kalitatezko bideoak)",
        "only": "Luzapen hau Vimeon bakarrik exekutatzen da",
        "open": "Ireki Vimeo",
        "how1": "Ireki Vimeo webgunea",
        "how2": "Erreproduzitu bideo bat Vimeon.",
        "permissions": "Aplikazio honen baimenak aldatu dituzu. Softwareak ondo funtziona dezan, beheko botoian klik egin behar duzu aplikazioari baimenak leheneratzeko.",
        "select": "Aukeratu",
        "rightclick": "Egin klik eskuineko botoiaz",
        "allow": "baimenak onartzen ditu",
        "howtouse": "Nola erabili",
        "by": "Nork eginda",
        "search": "Search",
        "helperintro": "Deskargatu bideoa eta audioa edozein webgunetatik.",
        "install": "INSTALATU ORAIN",
        "feedback": "feedback",
        "how3": "Ireki luzapen hau",
        "how4": "Itxaron une batzuk",
        "how5": "Egin klik deskargatu nahi duzun kalitatean",
        "how6": "Fitxa berrian, fitxategia automatikoki deskargatuko da eta gero zure gailuan gordeko da",
        "close": "Itxi",
        "settings": "Erabiltzailearen ezarpenak",
        "oneclick": "Deskargatu bideoak klik bakar batekin",
        "yes": "Bai",
        "no": "Ez",
        "autoselect": "Aukeratu kalitatea automatikoki",
        "max": "Max",
        "apply": "aplikatu",
        "changelanguage": "Hizkuntza aldatu",
        "download": "Deskargatu",
        "loading": "Kargatzen",
        "pin": "Erosotasunagatik, jarri aplikazio hau.",
        "expire": "Deskargatzeko esteka iraungi daiteke. Izenburuan klik egin beharko zenuke eta deskargatzeko esteka berria hartu.",
        "clickhere": "Klikatu hemen",
        "autorun": "Aktibatu aplikazio hau automatikoki."
    },
    "fa": {
        "extName": "دانلود کننده عالی Vimeo",
        "extDescription": "بارگیری فیلم ها از vimeo.com (دانلود فیلم های با کیفیت 4K)",
        "only": "این افزونه فقط در Vimeo اجرا می شود",
        "open": "Vimeo را باز کنید",
        "how1": "وب سایت Vimeo را باز کنید",
        "how2": "یک ویدیو در Vimeo پخش کنید.",
        "permissions": "شما مجوزهای این برنامه را تغییر داده اید. برای اینکه نرم افزار به درستی کار کند ، باید دکمه زیر را کلیک کنید تا مجوزها را به برنامه برگردانید.",
        "select": "انتخاب کنید",
        "rightclick": "کلیک راست",
        "allow": "اجازه ها را می دهد",
        "howtouse": "نحوه استفاده",
        "by": "طراحی شده توسط",
        "search": "جستجو",
        "helperintro": "به راحتی ویدیو و صدا را از هر وب سایت بارگیری کنید.",
        "install": "الآن نصب کن",
        "feedback": "بازخورد",
        "how3": "این برنامه افزودنی را باز کنید",
        "how4": "چند لحظه صبر کنید",
        "how5": "روی کیفیتی که می خواهید بارگیری کنید کلیک کنید",
        "how6": "در برگه جدید ، فایل به طور خودکار بارگیری و سپس در دستگاه شما ذخیره می شود",
        "close": "نزدیک",
        "settings": "تنظیمات کاربر",
        "oneclick": "فقط 1 کلیک فیلم ها را بارگیری کنید",
        "yes": "آره",
        "no": "نه",
        "autoselect": "کیفیت را به طور خودکار انتخاب کنید",
        "max": "حداکثر",
        "apply": "درخواست دادن",
        "changelanguage": "تغییر زبان",
        "download": "دانلود",
        "loading": "بارگذاری",
        "pin": "برای راحتی ، لطفا این برنامه را پین کنید.",
        "expire": "لینک دانلود ممکن است منقضی شود. شما باید روی عنوان کلیک کرده و سپس لینک دانلود جدید را بگیرید.",
        "clickhere": "اینجا کلیک کنید",
        "autorun": "این برنامه را به صورت خودکار فعال کنید."
    },
    "fi": {
        "extName": "Mahtava Vimeo Downloader",
        "extDescription": "Lataa videoita vimeo.com-sivustosta (lataa 4K-laatuiset videot)",
        "only": "Tämä laajennus toimii vain Vimeossa",
        "open": "Avaa Vimeo",
        "how1": "Avaa Vimeon verkkosivusto",
        "how2": "Toista video Vimeossa.",
        "permissions": "Olet muuttanut tämän sovelluksen käyttöoikeuksia. Jotta ohjelmisto toimisi oikein, sinun on napsautettava alla olevaa painiketta palauttaaksesi sovelluksen käyttöoikeudet.",
        "select": "Valitse",
        "rightclick": "Oikealla painikkeella",
        "allow": "sallii käyttöoikeudet",
        "howtouse": "Kuinka käyttää",
        "by": "Powered by",
        "search": "Hae",
        "helperintro": "Lataa video ja ääni helposti mistä tahansa verkkosivustosta.",
        "install": "ASENNA NYT",
        "feedback": "palaute",
        "how3": "Avaa tämä laajennus",
        "how4": "Odota hetki",
        "how5": "Napsauta laatua, jonka haluat ladata",
        "how6": "Uudessa välilehdessä tiedosto latautuu ja tallennetaan sitten laitteellesi",
        "close": "kiinni",
        "settings": "Käyttäjäasetukset",
        "oneclick": "Lataa videoita yhdellä napsautuksella",
        "yes": "Joo",
        "no": "Ei",
        "autoselect": "Valitse laatu automaattisesti",
        "max": "max",
        "apply": "Käytä",
        "changelanguage": "Vaihda kieltä",
        "download": "ladata",
        "loading": "Ladataan",
        "pin": "Kiinnitä mukavuus, kiinnitä tämä sovellus.",
        "expire": "Latauslinkki voi vanhentua. Sinun tulisi napsauttaa otsikkoa ja napata uusi latauslinkki.",
        "clickhere": "Klikkaa tästä",
        "autorun": "Aktivoi tämä sovellus automaattisesti."
    },
    "fr": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Télécharger des vidéos de vimeo.com (télécharger des vidéos de qualité 4K)",
        "only": "Cette extension ne fonctionne que sur Vimeo",
        "open": "Ouvrir Viméo",
        "how1": "Ouvrez le site Vimeo",
        "how2": "Jouez une vidéo sur Vimeo.",
        "permissions": "Vous avez modifié les autorisations de cette application. Pour que le logiciel fonctionne correctement, vous devez cliquer sur le bouton ci-dessous pour restaurer les autorisations sur l'application.",
        "select": "Sélectionner",
        "rightclick": "Clic-droit",
        "allow": "autorise les autorisations",
        "howtouse": "Comment utiliser",
        "by": "Alimenté par",
        "search": "Chercher",
        "helperintro": "Téléchargez facilement des vidéos et de l'audio à partir de n'importe quel site Web.",
        "install": "INSTALLER MAINTENANT",
        "feedback": "Retour d'information",
        "how3": "Ouvrir cette extension",
        "how4": "Attends quelques instants",
        "how5": "Cliquez sur la qualité que vous souhaitez télécharger",
        "how6": "Sur le nouvel onglet, le fichier sera automatiquement téléchargé puis sauvegardé sur votre appareil.",
        "close": "proche",
        "settings": "Paramètres utilisateur",
        "oneclick": "Télécharger des vidéos en 1 clic",
        "yes": "Oui",
        "no": "Non",
        "autoselect": "Sélectionner automatiquement la qualité",
        "max": "Max",
        "apply": "Appliquer",
        "changelanguage": "Changer de langue",
        "download": "Télécharger",
        "loading": "Chargement",
        "pin": "Pour plus de commodité, veuillez épingler cette application.",
        "expire": "Le lien de téléchargement peut expirer. Vous devez cliquer sur le titre puis saisir un nouveau lien de téléchargement.",
        "clickhere": "Cliquez ici",
        "autorun": "Activez automatiquement cette application."
    },
    "fy": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Download fideo's fan vimeo.com (download 4K-fideo's fan kwaliteit)",
        "only": "Dizze tafoeging rint allinich op Vimeo",
        "open": "Iepenje Vimeo",
        "how1": "Iepenje de webside fan Vimeo",
        "how2": "Spielje in fideo op Vimeo.",
        "permissions": "Jo hawwe de tagongsrjochten fan dizze app feroare. Om de software goed te wurkjen, moatte jo op de knop hjirûnder klikke om tagongsrjochten foar de app te herstellen.",
        "select": "Útkieze",
        "rightclick": "Rjochts klikke",
        "allow": "jout tagongsrjochten",
        "howtouse": "Hoe te brûken",
        "by": "Mei mooglik makke troch",
        "search": "Sykje",
        "helperintro": "Download fideo en audio maklik fan elke webside.",
        "install": "YNSTALLEARJE NO",
        "feedback": "Tebekwurd",
        "how3": "Iepenje dizze tafoeging",
        "how4": "Wachtsje in pear mominten",
        "how5": "Klikje op 'e kwaliteit dy't jo downloade wolle",
        "how6": "Op it nije ljepblêd sil it bestân automatysk downloade en dan opslaan op jo apparaat",
        "close": "Slute",
        "settings": "Brûkerynstellingen",
        "oneclick": "Download fideo's mei mar 1 klik",
        "yes": "ja",
        "no": "Nee",
        "autoselect": "Selektearje automatysk kwaliteit",
        "max": "Maks",
        "apply": "Tapasse",
        "changelanguage": "Taal feroarje",
        "download": "Download",
        "loading": "Oan it laden",
        "pin": "Foar it gemak kinne jo dizze app pinje.",
        "expire": "Downloadlink kin ferrinne. Jo moatte op de titel klikke en dan in nije downloadlink opnimme.",
        "clickhere": "Klik hjir",
        "autorun": "Aktivearje dizze applikaasje automatysk."
    },
    "ga": {
        "extName": "Uamhnach Vimeo Downloader",
        "extDescription": "Íoslódáil físeáin ó vimeo.com (íoslódáil físeáin ardchaighdeáin 4K)",
        "only": "Ní ritheann an síneadh seo ach ar Vimeo",
        "open": "Oscail Vimeo",
        "how1": "Oscail láithreán gréasáin Vimeo",
        "how2": "Seinn físeán ar Vimeo.",
        "permissions": "Tá ceadanna an aip seo athraithe agat. Ionas go n-oibreoidh na bogearraí i gceart, ní mór duit an cnaipe thíos a chliceáil chun ceadanna don aip a athbhunú.",
        "select": "Roghnaigh",
        "rightclick": "Cliceáil ar dheis",
        "allow": "ceadaíonn sé ceadanna",
        "howtouse": "Conas é a úsáid",
        "by": "Cumhachtaithe ag",
        "search": "Cuardaigh",
        "helperintro": "Go héasca íoslódáil físeáin agus fuaime ó aon láithreán gréasáin.",
        "install": "SHUITEÁIL ANOIS",
        "feedback": "Aiseolas",
        "how3": "Oscail an síneadh seo",
        "how4": "Fan cúpla nóiméad",
        "how5": "Cliceáil ar an gcaighdeán is mian leat a íoslódáil",
        "how6": "Sa chluaisín nua, íoslódálfaidh an comhad go huathoibríoch agus ansin sábhálfaidh sé ar do ghléas é",
        "close": "Dún",
        "settings": "Socruithe úsáideora",
        "oneclick": "Íoslódáil físeáin le 1 cliceáil amháin",
        "yes": "Is féidir",
        "no": "Níl",
        "autoselect": "Roghnaigh cáilíocht go huathoibríoch",
        "max": "Max",
        "apply": "Cuir iarratas isteach",
        "changelanguage": "Athraigh an teanga",
        "download": "Íoslódáil",
        "loading": "Ag luchtú",
        "pin": "Ar mhaithe le caoithiúlacht, bioráin an aip seo le do thoil.",
        "expire": "Féadfaidh an nasc íoslódála dul in éag. Ba cheart duit cliceáil ar an teideal agus greim a fháil ar nasc nua íoslódála.",
        "clickhere": "Cliceáil anseo",
        "autorun": "Cuir an feidhmchlár seo i ngníomh go huathoibríoch."
    },
    "gd": {
        "extName": "Luchdaich sìos uamhasach Vimeo",
        "extDescription": "Luchdaich sìos bhideothan bho vimeo.com (luchdaich sìos bhideothan càileachd 4K)",
        "only": "Chan eil an leudachadh seo a’ ruith ach air Vimeo",
        "open": "Fosgail Vimeo",
        "how1": "Fosgail làrach-lìn Vimeo",
        "how2": "Cluich bhidio air Vimeo.",
        "permissions": "Tha thu air ceadan an aplacaid seo atharrachadh. Gus am bi am bathar-bog ag obair mar bu chòir, feumaidh tu briogadh air a ’phutan gu h-ìosal gus ceadan a thoirt air ais don aplacaid.",
        "select": "Tagh",
        "rightclick": "Cliog deas",
        "allow": "a ’ceadachadh ceadan",
        "howtouse": "Mar a chleachdas tu",
        "by": "Le cumhachd",
        "search": "Rannsaich",
        "helperintro": "Luchdaich sìos bhidio agus claisneachd gu furasta bho làrach-lìn sam bith.",
        "install": "INSTALL A-NIS",
        "feedback": "Beachdan air ais",
        "how3": "Fosgail an leudachadh seo",
        "how4": "Fuirich beagan mhionaidean",
        "how5": "Cliog air a ’chàileachd a tha thu airson a luchdachadh sìos",
        "how6": "Air an taba ùr, bidh am faidhle a ’luchdachadh sìos gu fèin-ghluasadach agus an uairsin ga shàbhaladh don inneal agad",
        "close": "Dùin",
        "settings": "Roghainnean cleachdaiche",
        "oneclick": "Luchdaich sìos bhideothan le dìreach 1 cliog",
        "yes": "Tha",
        "no": "Chan eil",
        "autoselect": "Tagh càileachd gu fèin-ghluasadach",
        "max": "Max",
        "apply": "Cuir a-steach",
        "changelanguage": "Atharraich cànan",
        "download": "Luchdaich sìos",
        "loading": "A ’luchdachadh",
        "pin": "Airson goireasachd, feuch an pin thu an aplacaid seo.",
        "expire": "Thig an ceangal luchdaich sìos gu crìch. Bu chòir dhut briogadh air an tiotal agus an uairsin grèim fhaighinn air ceangal luchdaich sìos ùr.",
        "clickhere": "Cliog an seo",
        "autorun": "Cuir an gnìomh an tagradh seo gu fèin-ghluasadach."
    },
    "gl": {
        "extName": "Impresionante Vimeo Downloader",
        "extDescription": "Descarga vídeos de vimeo.com (descarga vídeos de calidade 4K)",
        "only": "Esta extensión só funciona en Vimeo",
        "open": "Abre Vimeo",
        "how1": "Abre o sitio web de Vimeo",
        "how2": "Reproduce un vídeo en Vimeo.",
        "permissions": "Cambiaches os permisos desta aplicación. Para que o software funcione correctamente, fai clic no botón de abaixo para restaurar os permisos da aplicación.",
        "select": "Selecciona",
        "rightclick": "Fai clic co botón dereito",
        "allow": "permite permisos",
        "howtouse": "Como empregar",
        "by": "Impulsado por",
        "search": "Busca",
        "helperintro": "Descarga facilmente vídeo e audio desde calquera sitio web.",
        "install": "INSTALAR AGORA",
        "feedback": "Comentarios",
        "how3": "Abre esta extensión",
        "how4": "Agarde uns momentos",
        "how5": "Fai clic na calidade que desexe descargar",
        "how6": "Na nova pestana, o ficheiro descargarase automaticamente e logo gardarao no teu dispositivo",
        "close": "Pechar",
        "settings": "Configuración do usuario",
        "oneclick": "Descarga vídeos con só 1 clic",
        "yes": "Si",
        "no": "Non",
        "autoselect": "Selecciona automaticamente a calidade",
        "max": "Máx",
        "apply": "Solicitar",
        "changelanguage": "Cambia de idioma",
        "download": "Descargar",
        "loading": "Cargando",
        "pin": "Por comodidade, fixa esta aplicación.",
        "expire": "A ligazón de descarga pode caducar. Deberías facer clic no título para coller unha nova ligazón de descarga.",
        "clickhere": "Pulse AQUÍ",
        "autorun": "Active automaticamente esta aplicación."
    },
    "gu": {
        "extName": "અદ્ભુત Vimeo ડાઉનલોડર",
        "extDescription": "Vimeo.com પરથી વિડિઓઝ ડાઉનલોડ કરો (4K ગુણવત્તાવાળા વિડિઓઝ ડાઉનલોડ કરો)",
        "only": "આ એક્સ્ટેંશન ફક્ત Vimeo પર ચાલે છે",
        "open": "Vimeo ખોલો",
        "how1": "Vimeo વેબસાઇટ ખોલો",
        "how2": "Vimeo પર વિડિઓ ચલાવો.",
        "permissions": "તમે આ એપ્લિકેશનની પરવાનગી બદલી છે. સ theફ્ટવેર યોગ્ય રીતે કાર્ય કરવા માટે, તમારે એપ્લિકેશનમાં પરવાનગીને પુનર્સ્થાપિત કરવા માટે નીચેના બટનને ક્લિક કરવાની જરૂર છે.",
        "select": "પસંદ કરો",
        "rightclick": "જમણું બટન દબાવો",
        "allow": "પરવાનગી પરવાનગી આપે છે",
        "howtouse": "કેવી રીતે વાપરવું",
        "by": "દ્વારા સંચાલિત",
        "search": "શોધો",
        "helperintro": "કોઈપણ વેબસાઇટ પરથી વિડિઓ અને audioડિઓ સરળતાથી ડાઉનલોડ કરો.",
        "install": "હમણાં સ્થાપિત કરો",
        "feedback": "પ્રતિસાદ",
        "how3": "આ એક્સ્ટેંશન ખોલો",
        "how4": "થોડી ક્ષણો રાહ જુઓ",
        "how5": "તમે ડાઉનલોડ કરવા માંગો છો તે ગુણવત્તા પર ક્લિક કરો",
        "how6": "નવા ટ tabબ પર, ફાઇલ આપમેળે ડાઉનલોડ થશે અને તે પછી તમારા ઉપકરણ પર સાચવશે",
        "close": "બંધ",
        "settings": "વપરાશકર્તા સેટિંગ્સ",
        "oneclick": "ફક્ત 1 ક્લિક સાથે વિડિઓઝ ડાઉનલોડ કરો",
        "yes": "હા",
        "no": "ના",
        "autoselect": "આપમેળે ગુણવત્તા પસંદ કરો",
        "max": "મહત્તમ",
        "apply": "લાગુ કરો",
        "changelanguage": "ભાષા બદલો",
        "download": "ડાઉનલોડ કરો",
        "loading": "લોડ કરી રહ્યું છે",
        "pin": "સગવડ માટે, કૃપા કરીને આ એપ્લિકેશનને પિન કરો.",
        "expire": "ડાઉનલોડ લિંક સમાપ્ત થઈ શકે છે. તમારે શીર્ષક પર ક્લિક કરવું જોઈએ અને પછી નવી ડાઉનલોડ લિંકને પકડવી જોઈએ.",
        "clickhere": "અહીં ક્લિક કરો",
        "autorun": "આ એપ્લિકેશનને આપમેળે સક્રિય કરો."
    },
    "ha": {
        "extName": "Awani Vimeo Mai Saukewa",
        "extDescription": "Zazzage bidiyo daga vimeo.com (sauke bidiyo masu inganci na 4K)",
        "only": "Wannan kari yana aiki akan Vimeo kawai",
        "open": "Bude Vimeo",
        "how1": "Bude gidan yanar gizon Vimeo",
        "how2": "Kunna bidiyo akan Vimeo.",
        "permissions": "Kun canza izinin wannan aikin. Domin software ɗin tayi aiki daidai, kuna buƙatar danna maɓallin da ke ƙasa don dawo da izini ga aikin.",
        "select": "Zaɓi",
        "rightclick": "Danna dama",
        "allow": "damar izini",
        "howtouse": "Yadda ake amfani",
        "by": "An ƙarfafa ta",
        "search": "Bincika",
        "helperintro": "A sauƙaƙe zazzage bidiyo da sauti daga kowane rukunin yanar gizo.",
        "install": "SAURARA NAN",
        "feedback": "Bayani",
        "how3": "Bude wannan kara",
        "how4": "Dakata 'yan lokuta",
        "how5": "Danna kan ingancin da kake son saukarwa",
        "how6": "A kan sabon shafin, fayel zai sauke ta atomatik sannan a adana shi zuwa na'urarka",
        "close": "Rufe",
        "settings": "Saitunan mai amfani",
        "oneclick": "Zazzage bidiyo tare da dannawa 1",
        "yes": "Haka ne",
        "no": "A'a",
        "autoselect": "Ta atomatik zaɓi inganci",
        "max": "Max",
        "apply": "Aiwatar",
        "changelanguage": "Canza yare",
        "download": "Zazzagewa",
        "loading": "Ana loda",
        "pin": "Don saukakawa, don Allah a saka wannan manhaja.",
        "expire": "Zazzage hanyar saukarwa na iya wucewa. Yakamata danna kan taken sannan sai a dauko wani sabon hanyar saukarwa.",
        "clickhere": "Danna nan",
        "autorun": "Kunna wannan aikin ta atomatik"
    },
    "haw": {
        "extName": "Mea Hoʻohāleʻa Vimeo Kākoʻo",
        "extDescription": "Hoʻoiho i nā wikiō mai vimeo.com (hoʻoiho i nā wikiō 4K maikaʻi)",
        "only": "Holo wale kēia hoʻonui ma Vimeo",
        "open": "E wehe iā Vimeo",
        "how1": "E wehe i ka pūnaewele Vimeo",
        "how2": "E pāʻani i kahi wikiō ma Vimeo.",
        "permissions": "Ua hoʻololi ʻoe i nā ʻae o kēia polokalamu. No ka hana pono ʻana o ka polokalamu, pono ʻoe e kaomi i ka pihi ma lalo e hoʻihoʻi i nā ʻae i ka polokalamu.",
        "select": "Koho",
        "rightclick": "Kaomi ʻākau",
        "allow": "ʻae i nā ʻae",
        "howtouse": "Pehea e ho ohana",
        "by": "Kukona ʻia e",
        "search": "Huli",
        "helperintro": "E maʻalahi e hoʻoiho i ke wikiō a me ka leo leo mai kekahi pūnaewele.",
        "install": "INXIE MAUI",
        "feedback": "Kauohaʻi",
        "how3": "E wehe i kēia hana hoʻonui",
        "how4": "E kali i kekahi mau manawa",
        "how5": "Kaomi ma luna o ka maikaʻi āu e makemake ai e hoʻoiho",
        "how6": "Ma ka pahu pākē hou, e hoʻoiho hou ka waihona a mālama iā i kāu kamepiula",
        "close": "Hoʻopili",
        "settings": "Nā hoʻonohonoho hoʻohana",
        "oneclick": "Hoʻoiho i nā wikiō me ke kiʻi hoʻokahi",
        "yes": "ae",
        "no": "Aʻole",
        "autoselect": "E koho koho i ka maikaʻi",
        "max": "Max",
        "apply": "Holaiia",
        "changelanguage": "Hoʻololi i ka ʻōlelo",
        "download": "Hoʻoiho",
        "loading": "Hoʻouka nei",
        "pin": "No ka maʻalahi, e ʻoluʻolu e pin i kēia polokalamu.",
        "expire": "E pau ka loulou kaomi. Pono ʻoe e kaomi ma ke poʻo a laila hopu i kahi loulou hou.",
        "clickhere": "Kaomi ma aneʻi",
        "autorun": "Hoʻoikaika aunoa i kēia noi."
    },
    "hi": {
        "extName": "बहुत बढ़िया Vimeo डाउनलोडर",
        "extDescription": "Vimeo.com से वीडियो डाउनलोड करें (4K गुणवत्ता वाले वीडियो डाउनलोड करें)",
        "only": "यह एक्सटेंशन केवल Vimeo पर चलता है",
        "open": "वीमियो खोलें",
        "how1": "Vimeo वेबसाइट खोलें",
        "how2": "Vimeo पर एक वीडियो चलाएं.",
        "permissions": "आपने इस ऐप की अनुमतियां बदल दी हैं। सॉफ्टवेयर ठीक से काम करने के लिए, आपको एप्लिकेशन को अनुमतियाँ पुनर्स्थापित करने के लिए नीचे दिए गए बटन पर क्लिक करने की आवश्यकता है।",
        "select": "चुनते हैं",
        "rightclick": "दाएँ क्लिक करें",
        "allow": "अनुमति देता है",
        "howtouse": "कैसे इस्तेमाल करे",
        "by": "द्वारा संचालित",
        "search": "खोज",
        "helperintro": "किसी भी वेबसाइट से आसानी से वीडियो और ऑडियो डाउनलोड करें।",
        "install": "अभी स्थापित करें",
        "feedback": "प्रतिपुष्टि",
        "how3": "इस एक्सटेंशन को खोलें",
        "how4": "कुछ पल रुकिए",
        "how5": "उस गुणवत्ता पर क्लिक करें जिसे आप डाउनलोड करना चाहते हैं",
        "how6": "नए टैब पर, फ़ाइल स्वचालित रूप से डाउनलोड हो जाएगी और फिर आपके डिवाइस पर सहेजेगी",
        "close": "बंद करे",
        "settings": "उपयोगकर्ता सेटिंग",
        "oneclick": "सिर्फ 1 क्लिक के साथ वीडियो डाउनलोड करें",
        "yes": "हाँ",
        "no": "नहीं",
        "autoselect": "स्वचालित रूप से गुणवत्ता का चयन करें",
        "max": "मैक्स",
        "apply": "लागू",
        "changelanguage": "भाषा बदलो",
        "download": "डाउनलोड",
        "loading": "लोड हो रहा है",
        "pin": "सुविधा के लिए, कृपया इस ऐप को पिन करें।",
        "expire": "डाउनलोड लिंक समाप्त हो सकता है। आपको शीर्षक पर क्लिक करना चाहिए फिर एक नया डाउनलोड लिंक लेना चाहिए।",
        "clickhere": "यहाँ क्लिक करें",
        "autorun": "इस एप्लिकेशन को स्वचालित रूप से सक्रिय करें।"
    },
    "hmn": {
        "extName": "Txaus Vimeo Downloader",
        "extDescription": "Rub tawm cov yeeb yaj kiab los ntawm vimeo.com (rub tawm cov yeeb yaj duab 4K zoo)",
        "only": "Qhov kev txuas ntxiv no tsuas yog khiav ntawm Vimeo",
        "open": "Qhib Vimeo",
        "how1": "Qhib Vimeo lub vev xaib",
        "how2": "Ua yeeb yaj kiab ntawm Vimeo.",
        "permissions": "Koj tau hloov cov kev tso cai ntawm no app. Txhawm rau cov software kom ua haujlwm zoo, koj yuav tsum nyem lub pob hauv qab no los rov tso cai rau lub.",
        "select": "Xaiv",
        "rightclick": "Txoj nyem",
        "allow": "tso cai",
        "howtouse": "Yuav siv li cas",
        "by": "Tsim los ntawm",
        "search": "Tshawb Fawb",
        "helperintro": "Yooj yim rub tawm video thiab audio los ntawm txhua lub vev xaib.",
        "install": "INSTALL TAM SIM NO",
        "feedback": "Tswv yim",
        "how3": "Qhib cov ntawv txuas ntxiv no",
        "how4": "Tos me ntsis",
        "how5": "Nyem rau ntawm qhov zoo koj xav mus download tau",
        "how6": "Ntawm qhov tshiab tab, cov ntaub ntawv yuav cia li rub tawm thiab tom qab khaws tseg rau koj ntaus ntawv",
        "close": "Kaw",
        "settings": "Neeg siv tej chaw",
        "oneclick": "Rub tawm cov yeeb yaj duab nrog xwb 1 nyem",
        "yes": "Yog lawm",
        "no": "Tsis yog",
        "autoselect": "Xaiv qhov zoo",
        "max": "Max",
        "apply": "Thov",
        "changelanguage": "Hloov lus",
        "download": "Rub",
        "loading": "Chaw thau khoom",
        "pin": "Kev yooj yim, thov nawj tus app no.",
        "expire": "Txuas txuas yuav tas sij hawm. Koj yuav tsum nyem rau ntawm lub npe ces lob txuas tshiab rub tawm.",
        "clickhere": "Nyem qhov no",
        "autorun": "Yuav qhib daim ntawv thov no."
    },
    "hr": {
        "extName": "Strašan Vimeo Downloader",
        "extDescription": "Preuzmite videozapise s vimeo.com (preuzmite videozapise 4K kvalitete)",
        "only": "Ovo proširenje radi samo na Vimeu",
        "open": "Otvorite Vimeo",
        "how1": "Otvorite web mjesto Vimeo",
        "how2": "Reproducirajte video na Vimeu.",
        "permissions": "Promijenili ste dozvole za ovu aplikaciju. Da bi softver ispravno radio, morate kliknuti gumb u nastavku da biste vratili dozvole za aplikaciju.",
        "select": "Izaberi",
        "rightclick": "Desni klik",
        "allow": "dopušta dozvole",
        "howtouse": "Kako koristiti",
        "by": "Pokreće ga",
        "search": "traži",
        "helperintro": "Jednostavno preuzmite video i audio sa bilo kojeg web mjesta.",
        "install": "SADA INSTALIRATI",
        "feedback": "Povratne informacije",
        "how3": "Otvorite ovo proširenje",
        "how4": "Pričekajte nekoliko trenutaka",
        "how5": "Kliknite kvalitetu koju želite preuzeti",
        "how6": "Na novoj kartici datoteka će se automatski preuzeti i spremiti na vaš uređaj",
        "close": "Zatvoriti",
        "settings": "Korisničke postavke",
        "oneclick": "Preuzmite videozapise sa samo jednim klikom",
        "yes": "Da",
        "no": "Ne",
        "autoselect": "Automatski odaberite kvalitetu",
        "max": "maksimum",
        "apply": "primijeniti",
        "changelanguage": "Promijeni jezik",
        "download": "preuzimanje datoteka",
        "loading": "Učitavam",
        "pin": "Radi praktičnosti prikvačite ovu aplikaciju.",
        "expire": "Veza za preuzimanje može isteći. Trebali biste kliknuti na naslov, a zatim zgrabiti novu vezu za preuzimanje.",
        "clickhere": "Kliknite ovdje",
        "autorun": "Automatski aktiviraj ovu aplikaciju."
    },
    "ht": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Download videyo soti nan vimeo.com (telechaje videyo kalite 4K)",
        "only": "Ekstansyon sa a sèlman kouri sou Vimeo",
        "open": "Louvri Vimeo",
        "how1": "Louvri sit entènèt Vimeo a",
        "how2": "Jwe yon videyo sou Vimeo.",
        "permissions": "Ou chanje otorizasyon yo nan app sa a. Pou lojisyèl an travay byen, ou bezwen klike sou bouton ki anba a pou retabli otorizasyon nan app a.",
        "select": "Chwazi",
        "rightclick": "Dwa klike sou",
        "allow": "pèmèt autorisations",
        "howtouse": "Kouman pou itilize",
        "by": "Patrone pa",
        "search": "Rechèch",
        "helperintro": "Fasil download videyo ak odyo soti nan nenpòt ki sit entènèt.",
        "install": "Enstalasyon kounye a",
        "feedback": "Feedback",
        "how3": "Louvri ekstansyon sa a",
        "how4": "Tann yon ti moman",
        "how5": "Klike sou bon jan kalite a ou vle telechaje",
        "how6": "Sou nouvo tab la, dosye a pral otomatikman telechaje epi sove sou aparèy ou an",
        "close": "Fèmen",
        "settings": "Anviwònman itilizatè",
        "oneclick": "Download videyo ak jis 1 klike sou",
        "yes": "Wi",
        "no": "Non",
        "autoselect": "Otomatikman chwazi bon jan kalite",
        "max": "Max",
        "apply": "Aplike",
        "changelanguage": "Chanje langaj",
        "download": "Telechaje",
        "loading": "Chaje",
        "pin": "Pou konvenyans, tanpri PIN app sa a.",
        "expire": "Lyen download ka ekspire. Ou ta dwe klike sou tit la Lè sa a, gen tan pwan yon nouvo lyen download.",
        "clickhere": "Klike la a",
        "autorun": "Aktive aplikasyon sa otomatikman."
    },
    "hu": {
        "extName": "Félelmetes Vimeo Downloader",
        "extDescription": "Töltse le videókat a vimeo.com webhelyről (töltse le a 4K minőségű videókat)",
        "only": "Ez a bővítmény csak a Vimeo-n fut",
        "open": "Nyissa meg a Vimeo-t",
        "how1": "Nyissa meg a Vimeo webhelyet",
        "how2": "Videó lejátszása a Vimeo-n.",
        "permissions": "Megváltoztatta az alkalmazás engedélyeit. A szoftver megfelelő működéséhez kattintson az alábbi gombra az alkalmazás engedélyeinek visszaállításához.",
        "select": "Válassza a lehetőséget",
        "rightclick": "Jobb klikk",
        "allow": "engedélyeket engedélyez",
        "howtouse": "Hogyan kell használni",
        "by": "Powered by",
        "search": "Keresés",
        "helperintro": "Könnyen letölthet videót és audiót bármely webhelyről.",
        "install": "TELEPÍTÉS MOST",
        "feedback": "Visszacsatolás",
        "how3": "Nyissa meg ezt a kiterjesztést",
        "how4": "Várjon néhány percet",
        "how5": "Kattintson a letölthető minőségre",
        "how6": "Az új lapon a fájl automatikusan letöltődik, majd elmenti az eszközére",
        "close": "Bezárás",
        "settings": "Felhasználói beállítások",
        "oneclick": "Töltsön le videókat egyetlen kattintással",
        "yes": "Igen",
        "no": "Nem",
        "autoselect": "A minőség automatikus kiválasztása",
        "max": "Max",
        "apply": "Alkalmaz",
        "changelanguage": "Válts nyelvet",
        "download": "Letöltés",
        "loading": "Betöltés",
        "pin": "A kényelem érdekében kérjük, rögzítse ezt az alkalmazást.",
        "expire": "A letöltési link lejárhat. Kattintson a címre, majd ragadjon meg egy új letöltési linket.",
        "clickhere": "Kattints ide",
        "autorun": "Automatikusan aktiválja ezt az alkalmazást."
    },
    "hy": {
        "extName": "Awesome Vimeo ներբեռնիչ",
        "extDescription": "Ներբեռնեք տեսանյութերը vimeo.com- ից (ներբեռնեք 4K որակի տեսանյութեր)",
        "only": "Այս ընդլայնումն աշխատում է միայն Vimeo-ում",
        "open": "Բացեք Vimeo-ն",
        "how1": "Բացեք Vimeo կայքը",
        "how2": "Տեսահոլովակ նվագարկեք Vimeo-ում:",
        "permissions": "Դուք փոխել եք այս ծրագրի թույլտվությունները: Theրագրակազմը պատշաճ աշխատելու համար հարկավոր է կտտացնել ներքևի կոճակին ՝ հավելվածներին թույլտվությունները վերականգնելու համար:",
        "select": "Ընտրեք",
        "rightclick": "Աջ կտտոցով",
        "allow": "թույլ է տալիս թույլտվություններ",
        "howtouse": "Ինչպես օգտագործել",
        "by": "Powered by",
        "search": "Որոնել",
        "helperintro": "Հեշտությամբ ներբեռնեք վիդեո և աուդիո ցանկացած կայքից:",
        "install": "ՏԵՂԱԴՐԵԼ ՀԻՄԱ",
        "feedback": "Հետադարձ կապ",
        "how3": "Բացեք այս ընդլայնումը",
        "how4": "Սպասեք մի քանի վայրկյան",
        "how5": "Կտտացրեք այն որակը, որը ցանկանում եք ներբեռնել",
        "how6": "Նոր ներդիրում ֆայլը ինքնաբերաբար ներբեռնելու է, այնուհետև կփրկվի ձեր սարքին",
        "close": "փակել",
        "settings": "Օգտագործողի կարգաբերություններ",
        "oneclick": "Ներբեռնեք տեսանյութերը ընդամենը 1 կտտոցով",
        "yes": "Այո",
        "no": "Ոչ",
        "autoselect": "Ավտոմատ կերպով ընտրեք որակ",
        "max": "Մաքս",
        "apply": "Դիմել",
        "changelanguage": "Փոխել լեզուն",
        "download": "Ներբեռնում",
        "loading": "Բեռնվում է",
        "pin": "Հարմարության համար կապեք այս ծրագիրը:",
        "expire": "Ներբեռնման հղումը կարող է լրանալ: Դուք պետք է սեղմեք վերնագիրը, ապա բեռնելու նոր հղում:",
        "clickhere": "Սեղմեք այստեղ",
        "autorun": "Ավտոմատ ակտիվացրեք այս ծրագիրը:"
    },
    "id": {
        "extName": "Pengunduh Vimeo yang Luar Biasa",
        "extDescription": "Unduh video dari vimeo.com (unduh video berkualitas 4K)",
        "only": "Ekstensi ini hanya berjalan di Vimeo",
        "open": "Buka Vimeo",
        "how1": "Buka situs web Vimeo",
        "how2": "Putar video di Vimeo.",
        "permissions": "Anda telah mengubah izin aplikasi ini. Agar perangkat lunak berfungsi dengan baik, Anda perlu mengklik tombol di bawah ini untuk memulihkan izin ke aplikasi.",
        "select": "Pilih",
        "rightclick": "Klik kanan",
        "allow": "mengizinkan izin",
        "howtouse": "Cara Penggunaan",
        "by": "Dipersembahkan oleh",
        "search": "Cari",
        "helperintro": "Unduh video dan audio dengan mudah dari situs web mana pun.",
        "install": "INSTAL SEKARANG",
        "feedback": "Umpan balik",
        "how3": "Buka ekstensi ini",
        "how4": "Tunggu beberapa saat",
        "how5": "Klik kualitas yang ingin Anda unduh",
        "how6": "Pada tab baru, file akan secara otomatis mengunduh dan kemudian menyimpan ke perangkat Anda",
        "close": "Dekat",
        "settings": "Pengaturan pengguna",
        "oneclick": "Unduh video hanya dengan 1 klik",
        "yes": "Iya",
        "no": "Tidak",
        "autoselect": "Pilih kualitas secara otomatis",
        "max": "Maks",
        "apply": "Menerapkan",
        "changelanguage": "Ganti BAHASA",
        "download": "Unduh",
        "loading": "Memuat",
        "pin": "Untuk kenyamanan, harap sematkan aplikasi ini.",
        "expire": "Tautan unduhan mungkin kedaluwarsa. Anda harus mengklik pada judul lalu ambil tautan unduhan baru.",
        "clickhere": "Klik disini",
        "autorun": "Aktifkan aplikasi ini secara otomatis."
    },
    "ig": {
        "extName": "Nwa Vimeo mara mma Downloader",
        "extDescription": "Budata vidiyo site na vimeo.com (budata vidiyo nke 4K dị mma)",
        "only": "Mgbatị a na-arụ naanị na Vimeo",
        "open": "Mepee Vimeo",
        "how1": "Mepee webụsaịtị Vimeo",
        "how2": "Kpọọ vidiyo na Vimeo.",
        "permissions": "Have gbanwewo ikike nke ngwa a. N'ihi na software na-arụ ọrụ nke ọma, mkpa ka ị pịa bọtịnụ n'okpuru iji weghachi ikikere na ngwa.",
        "select": "Họrọ",
        "rightclick": "Right pịa",
        "allow": "na-enye ohere ikikere",
        "howtouse": "Otu esi eji ya",
        "by": "Kwadoro site na",
        "search": "Chọọ",
        "helperintro": "Mfe web na vidiyo na ọdịyo na weebụsaịtị ọ bụla.",
        "install": "WOWBOW N’AD N",
        "feedback": "Nzaghachi",
        "how3": "Mepee ndọtị a",
        "how4": "Chere obere oge",
        "how5": "Pịa na njiri mara ịchọrọ ibudata",
        "how6": "Na taabụ ọhụrụ, faịlụ ahụ ga-ebudata na akpaghị aka wee chebe na ngwaọrụ gị",
        "close": "Mechie",
        "settings": "Ntọala onye ọrụ",
        "oneclick": "Budata vidiyo naanị pịa 1",
        "yes": "Ee",
        "no": "Mba",
        "autoselect": "Na-akpaghị aka họrọ mma",
        "max": "Max",
        "apply": "Tinye",
        "changelanguage": "Gbanwee asụsụ",
        "download": "Budata",
        "loading": "Na-adọnye",
        "pin": "Maka mma, biko tụlee ngwa a.",
        "expire": "Njikọ nbudata nwere ike ekubi ume. Shouldkwesiri pịa isi okwu ahu wee jide uzo nbudata ohuru.",
        "clickhere": "Pịa ebe a",
        "autorun": "Na-akpaghị aka rụọ ọrụ a na ngwa."
    },
    "is": {
        "extName": "Ógnvekjandi Vimeo niðurhal",
        "extDescription": "Sæktu myndbönd frá vimeo.com (halaðu niður 4K myndbandsgæði)",
        "only": "Þessi viðbót keyrir aðeins á Vimeo",
        "open": "Opnaðu Vimeo",
        "how1": "Opnaðu vefsíðu Vimeo",
        "how2": "Spilaðu myndband á Vimeo.",
        "permissions": "Þú hefur breytt heimildum þessa forrits. Til að hugbúnaðurinn virki rétt þarftu að smella á hnappinn hér að neðan til að endurheimta heimildir fyrir forritinu.",
        "select": "Veldu",
        "rightclick": "Hægrismella",
        "allow": "leyfir heimildir",
        "howtouse": "Hvernig skal nota",
        "by": "Knúið af",
        "search": "Leitaðu",
        "helperintro": "Hladdu niður vídeó og hljóð á hvaða vefsíðu sem er.",
        "install": "SETJA UPP NÚNA",
        "feedback": "Endurgjöf",
        "how3": "Opnaðu þessa viðbót",
        "how4": "Bíddu í smá stund",
        "how5": "Smelltu á gæði sem þú vilt hlaða niður",
        "how6": "Á nýja flipanum halar skráin sjálfkrafa niður og vistar síðan í tækið",
        "close": "Loka",
        "settings": "Notandastillingar",
        "oneclick": "Hladdu niður myndböndum með aðeins einum smelli",
        "yes": "Já",
        "no": "Nei",
        "autoselect": "Veldu gæði sjálfkrafa",
        "max": "Hámark",
        "apply": "Sækja um",
        "changelanguage": "Skipta um tungumál",
        "download": "Sækja",
        "loading": "Hleðsla",
        "pin": "Til þæginda skaltu pinna þetta forrit.",
        "expire": "Niðurhalstengill kann að renna út. Þú ættir að smella á titilinn og grípa síðan í nýjan niðurhalstengil.",
        "clickhere": "Ýttu hér",
        "autorun": "Virkja þetta forrit sjálfkrafa."
    },
    "it": {
        "extName": "Fantastico Vimeo Downloader",
        "extDescription": "Scarica video da vimeo.com (scarica video di qualità 4K)",
        "only": "Questa estensione funziona solo su Vimeo",
        "open": "Apri Vimeo",
        "how1": "Apri il sito web di Vimeo",
        "how2": "Riproduci un video su Vimeo.",
        "permissions": "Hai modificato le autorizzazioni di questa app. Affinché il software funzioni correttamente, è necessario fare clic sul pulsante in basso per ripristinare le autorizzazioni per l'app.",
        "select": "Selezionare",
        "rightclick": "Fare clic con il tasto destro",
        "allow": "consente le autorizzazioni",
        "howtouse": "Come usare",
        "by": "Offerto da",
        "search": "Ricerca",
        "helperintro": "Scarica facilmente video e audio da qualsiasi sito Web.",
        "install": "INSTALLA ORA",
        "feedback": "Risposta",
        "how3": "Apri questa estensione",
        "how4": "Aspetta qualche istante",
        "how5": "Fai clic sulla qualità che desideri scaricare",
        "how6": "Nella nuova scheda, il file verrà scaricato automaticamente e quindi salvato sul dispositivo",
        "close": "Vicino",
        "settings": "Impostazioni utente",
        "oneclick": "Scarica video con un solo clic",
        "yes": "sì",
        "no": "No",
        "autoselect": "Seleziona automaticamente la qualità",
        "max": "Max",
        "apply": "Applicare",
        "changelanguage": "Cambia lingua",
        "download": "Scarica",
        "loading": "Caricamento in corso",
        "pin": "Per comodità, aggiungi questa app.",
        "expire": "Il link per il download potrebbe scadere. Dovresti fare clic sul titolo, quindi prendere un nuovo link per il download.",
        "clickhere": "Clicca qui",
        "autorun": "Attiva automaticamente questa applicazione."
    },
    "iw": {
        "extName": "הורד Vimeo מדהים",
        "extDescription": "הורידו סרטונים מ- vimeo.com (הורידו סרטוני וידאו באיכות 4K)",
        "only": "הרחבה זו פועלת רק על Vimeo",
        "open": "פתח את Vimeo",
        "how1": "פתח את אתר Vimeo",
        "how2": "הפעל סרטון ב-Vimeo.",
        "permissions": "שינית את ההרשאות של יישום זה. כדי שהתוכנה תפעל כהלכה, עליך ללחוץ על הכפתור למטה כדי לשחזר את ההרשאות לאפליקציה.",
        "select": "בחר",
        "rightclick": "מקש ימני",
        "allow": "מאפשר הרשאות",
        "howtouse": "איך להישתמש",
        "by": "נתמך על ידי",
        "search": "לחפש",
        "helperintro": "הורד בקלות וידאו ושמע מכל אתר אינטרנט.",
        "install": "להתקין עכשיו",
        "feedback": "משוב",
        "how3": "פתח סיומת זו",
        "how4": "חכה כמה רגעים",
        "how5": "לחץ על האיכות שאתה רוצה להוריד",
        "how6": "בכרטיסייה החדשה, הקובץ יוריד אוטומטית ואז ישמור במכשיר שלך",
        "close": "סגור",
        "settings": "הגדרות משתמש",
        "oneclick": "הורד סרטונים בלחיצה אחת בלבד",
        "yes": "כן",
        "no": "לא",
        "autoselect": "בחר באופן אוטומטי באיכות",
        "max": "מקסימום",
        "apply": "להגיש מועמדות",
        "changelanguage": "שנה שפה",
        "download": "הורד",
        "loading": "טעינה",
        "pin": "מטעמי נוחות, אנא הצמיד את האפליקציה הזו.",
        "expire": "קישור ההורדה עשוי לפוג. עליך ללחוץ על הכותרת ואז לתפוס קישור להורדה חדש.",
        "clickhere": "לחץ כאן",
        "autorun": "הפעל יישום זה באופן אוטומטי."
    },
    "ja": {
        "extName": "素晴らしいVimeoダウンローダー",
        "extDescription": "vimeo.comからビデオをダウンロード（4K品質のビデオをダウンロード）",
        "only": "この拡張機能は Vimeo でのみ実行されます",
        "open": "Vimeoを開く",
        "how1": "Vimeo ウェブサイトを開く",
        "how2": "Vimeo でビデオを再生します。",
        "permissions": "このアプリの権限を変更しました。 ソフトウェアが正しく機能するためには、下のボタンをクリックしてアプリへのアクセス許可を復元する必要があります。",
        "select": "選択する",
        "rightclick": "右クリック",
        "allow": "権限を許可します",
        "howtouse": "使い方",
        "by": "搭載",
        "search": "調べる",
        "helperintro": "どのWebサイトからでもビデオとオーディオを簡単にダウンロードできます。",
        "install": "今すぐインストール",
        "feedback": "フィードバック",
        "how3": "この拡張機能を開きます",
        "how4": "ちょっと待って",
        "how5": "ダウンロードしたい品質をクリックしてください",
        "how6": "新しいタブで、ファイルが自動的にダウンロードされ、デバイスに保存されます",
        "close": "閉じる",
        "settings": "ユーザー設定",
        "oneclick": "ワンクリックで動画をダウンロード",
        "yes": "はい",
        "no": "番号",
        "autoselect": "品質を自動的に選択する",
        "max": "マックス",
        "apply": "適用する",
        "changelanguage": "言語を変えてください",
        "download": "ダウンロード",
        "loading": "読み込み中",
        "pin": "便宜上、このアプリをピン留めしてください。",
        "expire": "ダウンロードリンクが期限切れになる場合があります。 タイトルをクリックしてから、新しいダウンロードリンクを取得する必要があります。",
        "clickhere": "ここをクリック",
        "autorun": "このアプリケーションを自動的にアクティブ化します。"
    },
    "jw": {
        "extName": "Downloader Vimeo Apik tenan",
        "extDescription": "Download video saka vimeo.com (download video kualitas 4K)",
        "only": "Ekstensi iki mung mlaku ing Vimeo",
        "open": "Bukak Vimeo",
        "how1": "Bukak situs web Vimeo",
        "how2": "Puter video ing Vimeo.",
        "permissions": "Sampeyan wis ngganti ijin app iki. Supaya piranti lunak bisa digunakake kanthi bener, sampeyan kudu klik tombol ing ngisor iki kanggo mulihake idin menyang aplikasi kasebut.",
        "select": "Pilih",
        "rightclick": "Klik tengen",
        "allow": "ngidini ijin",
        "howtouse": "Cara nggunakake",
        "by": "Didukung karo",
        "search": "Telusuri",
        "helperintro": "Gampang ndownload video lan audio saka situs web.",
        "install": "INFIN SAIKI",
        "feedback": "Tanggepan",
        "how3": "Bukak extension iki",
        "how4": "Ngenteni sawetara wektu",
        "how5": "Klik ing kualitas sing pengin didownload",
        "how6": "Ing tab anyar, file bakal kanthi otomatis download banjur disimpen menyang piranti",
        "close": "Nutup",
        "settings": "Setelan pangguna",
        "oneclick": "Download video kanthi mung 1 klik",
        "yes": "Ya",
        "no": "Ora",
        "autoselect": "Pilih kualitas kanthi otomatis",
        "max": "Max",
        "apply": "Nglamar",
        "changelanguage": "Ngganti basa",
        "download": "Download",
        "loading": "Ngunggah",
        "pin": "Kanggo penak, monggo pin app iki.",
        "expire": "Download link bisa entek. Sampeyan kudu klik judhul banjur entuk link download anyar.",
        "clickhere": "Klik kene",
        "autorun": "Aktifake aplikasi iki kanthi otomatis."
    },
    "ka": {
        "extName": "გასაოცარია Vimeo Downloader",
        "extDescription": "ჩამოტვირთეთ ვიდეო vimeo.com (ჩამოტვირთეთ 4K ხარისხის ვიდეო)",
        "only": "ეს გაფართოება მუშაობს მხოლოდ Vimeo-ზე",
        "open": "გახსენით Vimeo",
        "how1": "გახსენით Vimeo ვებსაიტი",
        "how2": "ვიდეოს დაკვრა Vimeo-ზე.",
        "permissions": "თქვენ შეცვალეთ ამ აპის უფლებები. იმისათვის, რომ პროგრამული უზრუნველყოფა გამართულად იმუშაოს, აპისთვის ნებართვების აღსადგენად უნდა დააჭიროთ ქვემოთ მოცემულ ღილაკს.",
        "select": "აირჩიეთ",
        "rightclick": "დააჭირეთ მარჯვენა ღილაკს",
        "allow": "უფლებას იძლევა",
        "howtouse": "Როგორ გამოვიყენო",
        "by": "პროგრამით",
        "search": "ძებნა",
        "helperintro": "ადვილად გადმოწერეთ ვიდეო და აუდიო ნებისმიერი ვებ – გვერდიდან.",
        "install": "ახლავე დააინსტალირეთ",
        "feedback": "გამოხმაურება",
        "how3": "გახსენით ეს გაფართოება",
        "how4": "დაელოდეთ რამდენიმე წამს",
        "how5": "დააჭირეთ იმ ხარისხს, რომლის ჩამოტვირთვაც გსურთ",
        "how6": "ახალ ჩანართზე, ფაილი ავტომატურად გადმოწერს და შემდეგ შეინახება თქვენს მოწყობილობაში",
        "close": "დახურვა",
        "settings": "მომხმარებლის პარამეტრები",
        "oneclick": "ჩამოტვირთეთ ვიდეო მხოლოდ 1 დაჭერით",
        "yes": "დიახ",
        "no": "არა",
        "autoselect": "ავტომატურად შეარჩიეთ ხარისხი",
        "max": "მაქსიმ",
        "apply": "მიმართვა",
        "changelanguage": "Ენის შეცვლა",
        "download": "გადმოწერა",
        "loading": "Ჩატვირთვა",
        "pin": "მოხერხებულობისთვის, გთხოვთ, დააჭიროთ ამ აპს.",
        "expire": "ჩამოტვირთვა ბმული შეიძლება ამოიწურება. თქვენ უნდა დააჭიროთ სათაურს, შემდეგ აითვისოთ ახალი ჩამოტვირთვა ბმული.",
        "clickhere": "Დააკლიკე აქ",
        "autorun": "ავტომატურად გაააქტიურეთ ეს პროგრამა."
    },
    "kk": {
        "extName": "Керемет Vimeo Downloader",
        "extDescription": "Vimeo.com сайтынан бейнелерді жүктеу (4K сапалы бейнелерді жүктеу)",
        "only": "Бұл кеңейтім тек Vimeo жүйесінде жұмыс істейді",
        "open": "Vimeo ашыңыз",
        "how1": "Vimeo веб-сайтын ашыңыз",
        "how2": "Vimeo-да бейнені ойнату.",
        "permissions": "Сіз бұл қолданбаның рұқсаттарын өзгерттіңіз. Бағдарламалық жасақтама дұрыс жұмыс істеуі үшін бағдарламаға рұқсаттарды қалпына келтіру үшін төмендегі батырманы басу керек.",
        "select": "Таңдаңыз",
        "rightclick": "Тінтуірдің оң жағын басыңыз",
        "allow": "рұқсаттарға рұқсат береді",
        "howtouse": "Қалай қолдану керек",
        "by": "Көмегімен",
        "search": "Іздеу",
        "helperintro": "Кез-келген веб-сайттан бейне және дыбысты оңай жүктеп алыңыз.",
        "install": "ҚАЗІР ОРНАТУ",
        "feedback": "Кері байланыс",
        "how3": "Бұл кеңейтімді ашыңыз",
        "how4": "Бірнеше минут күтіңіз",
        "how5": "Жүктегіңіз келетін сапаны таңдаңыз",
        "how6": "Жаңа қойындыда файл автоматты түрде жүктеледі, содан кейін құрылғыға сақталады",
        "close": "Жабық",
        "settings": "Пайдаланушы параметрлері",
        "oneclick": "Видеоларды бір нұқумен жүктеңіз",
        "yes": "Иә",
        "no": "Жоқ",
        "autoselect": "Автоматты түрде сапаны таңдаңыз",
        "max": "Макс",
        "apply": "Қолдану",
        "changelanguage": "Тілді өзгерту",
        "download": "Жүктеу",
        "loading": "Жүктеу",
        "pin": "Ыңғайлы болу үшін осы қолданбаны бекітіп қойыңыз.",
        "expire": "Жүктеу сілтемесінің мерзімі аяқталуы мүмкін. Тақырыпты нұқып, жаңа жүктеу сілтемесін алыңыз.",
        "clickhere": "Мында басыңыз",
        "autorun": "Бұл қолданбаны автоматты түрде қосыңыз."
    },
    "km": {
        "extName": "កម្មវិធីទាញយកវីមេអូល្អមែនទែន",
        "extDescription": "ទាញយកវីដេអូពី vimeo.com (ទាញយកវីដេអូគុណភាព 4K)",
        "only": "កម្មវិធីបន្ថែមនេះដំណើរការតែលើ Vimeo ប៉ុណ្ណោះ។",
        "open": "បើក Vimeo",
        "how1": "បើកគេហទំព័រ Vimeo",
        "how2": "ចាក់វីដេអូនៅលើ Vimeo ។",
        "permissions": "អ្នកបានផ្លាស់ប្តូរសិទ្ធិរបស់កម្មវិធីនេះ។ ដើម្បីឱ្យកម្មវិធីដំណើរការបានត្រឹមត្រូវអ្នកត្រូវចុចប៊ូតុងខាងក្រោមដើម្បីស្តារសិទ្ធិអនុញ្ញាតទៅកម្មវិធី។",
        "select": "ជ្រើសរើស",
        "rightclick": "ចុចខាងស្តាំ",
        "allow": "អនុញ្ញាតឱ្យមានការអនុញ្ញាត",
        "howtouse": "របៀបប្រើ",
        "by": "ឧបត្ថម្ភដោយ",
        "search": "ស្វែងរក",
        "helperintro": "ទាញយកវីដេអូនិងសំឡេងយ៉ាងងាយស្រួលពីគេហទំព័រណាមួយ។",
        "install": "ដំឡើងឥឡូវនេះ",
        "feedback": "មតិប្រតិកម្ម",
        "how3": "បើកផ្នែកបន្ថែមនេះ",
        "how4": "រង់ចាំមួយភ្លែត",
        "how5": "ចុចលើគុណភាពដែលអ្នកចង់ទាញយក",
        "how6": "នៅលើផ្ទាំងថ្មីឯកសារនឹងទាញយកដោយស្វ័យប្រវត្តិហើយរក្សាទុកនៅក្នុងឧបករណ៍របស់អ្នក",
        "close": "បិទ",
        "settings": "ការកំណត់អ្នកប្រើ",
        "oneclick": "ទាញយកវីដេអូដោយគ្រាន់តែចុចតែម្តង",
        "yes": "ត្រូវហើយ",
        "no": "ទេ",
        "autoselect": "ជ្រើសរើសគុណភាពដោយស្វ័យប្រវត្តិ",
        "max": "អតិបរមា",
        "apply": "អនុវត្ត",
        "changelanguage": "ប្ដូរ​ភាសា",
        "download": "ទាញយក",
        "loading": "កំពុងផ្ទុក",
        "pin": "ដើម្បីភាពងាយស្រួលសូមគូសកម្មវិធីនេះ។",
        "expire": "តំណទាញយកអាចផុតកំណត់។ អ្នកគួរតែចុចលើចំណងជើងបន្ទាប់មកចាប់យកតំណទាញយកថ្មី។",
        "clickhere": "ចុច​ទីនេះ",
        "autorun": "ដំណើរការកម្មវិធីនេះដោយស្វ័យប្រវត្តិ។"
    },
    "kn": {
        "extName": "ಅದ್ಭುತ ವಿಮಿಯೋ ಡೌನ್ಲೋಡರ್",
        "extDescription": "Vimeo.com ನಿಂದ ವೀಡಿಯೊಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (4K ಗುಣಮಟ್ಟದ ವೀಡಿಯೊಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ)",
        "only": "ಈ ವಿಸ್ತರಣೆಯು ವಿಮಿಯೋನಲ್ಲಿ ಮಾತ್ರ ಚಲಿಸುತ್ತದೆ",
        "open": "ವಿಮಿಯೋ ತೆರೆಯಿರಿ",
        "how1": "ವಿಮಿಯೋ ವೆಬ್‌ಸೈಟ್ ತೆರೆಯಿರಿ",
        "how2": "Vimeo ನಲ್ಲಿ ವೀಡಿಯೊವನ್ನು ಪ್ಲೇ ಮಾಡಿ.",
        "permissions": "ಈ ಅಪ್ಲಿಕೇಶನ್‌ನ ಅನುಮತಿಗಳನ್ನು ನೀವು ಬದಲಾಯಿಸಿದ್ದೀರಿ. ಸಾಫ್ಟ್‌ವೇರ್ ಸರಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಲು, ಅಪ್ಲಿಕೇಶನ್‌ಗೆ ಅನುಮತಿಗಳನ್ನು ಮರುಸ್ಥಾಪಿಸಲು ನೀವು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಕಾಗುತ್ತದೆ.",
        "select": "ಆಯ್ಕೆ ಮಾಡಿ",
        "rightclick": "ಬಲ ಕ್ಲಿಕ್",
        "allow": "ಅನುಮತಿಗಳನ್ನು ಅನುಮತಿಸುತ್ತದೆ",
        "howtouse": "ಬಳಸುವುದು ಹೇಗೆ",
        "by": "ನಡೆಸುತ್ತಿದೆ",
        "search": "ಹುಡುಕಿ Kannada",
        "helperintro": "ಯಾವುದೇ ವೆಬ್‌ಸೈಟ್‌ನಿಂದ ವೀಡಿಯೊ ಮತ್ತು ಆಡಿಯೊವನ್ನು ಸುಲಭವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
        "install": "ಈಗ ಸ್ಥಾಪಿಸಿ",
        "feedback": "ಪ್ರತಿಕ್ರಿಯೆ",
        "how3": "ಈ ವಿಸ್ತರಣೆಯನ್ನು ತೆರೆಯಿರಿ",
        "how4": "ಕೆಲವು ಕ್ಷಣಗಳು ಕಾಯಿರಿ",
        "how5": "ನೀವು ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಬಯಸುವ ಗುಣಮಟ್ಟದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ",
        "how6": "ಹೊಸ ಟ್ಯಾಬ್‌ನಲ್ಲಿ, ಫೈಲ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತದೆ ಮತ್ತು ನಂತರ ನಿಮ್ಮ ಸಾಧನಕ್ಕೆ ಉಳಿಸುತ್ತದೆ",
        "close": "ಮುಚ್ಚಿ",
        "settings": "ಬಳಕೆದಾರರ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
        "oneclick": "ಕೇವಲ 1 ಕ್ಲಿಕ್‌ನಲ್ಲಿ ವೀಡಿಯೊಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
        "yes": "ಹೌದು",
        "no": "ಇಲ್ಲ",
        "autoselect": "ಗುಣಮಟ್ಟವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಆಯ್ಕೆಮಾಡಿ",
        "max": "ಗರಿಷ್ಠ",
        "apply": "ಅನ್ವಯಿಸು",
        "changelanguage": "ಭಾಷೆ ಬದಲಿಸಿ",
        "download": "ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
        "loading": "ಲೋಡ್ ಆಗುತ್ತಿದೆ",
        "pin": "ಅನುಕೂಲಕ್ಕಾಗಿ, ದಯವಿಟ್ಟು ಈ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಪಿನ್ ಮಾಡಿ.",
        "expire": "ಡೌನ್‌ಲೋಡ್ ಲಿಂಕ್ ಅವಧಿ ಮುಗಿಯಬಹುದು. ನೀವು ಶೀರ್ಷಿಕೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ ನಂತರ ಹೊಸ ಡೌನ್‌ಲೋಡ್ ಲಿಂಕ್ ಅನ್ನು ಪಡೆದುಕೊಳ್ಳಿ.",
        "clickhere": "ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ",
        "autorun": "ಈ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸಿ."
    },
    "ko": {
        "extName": "굉장한 Vimeo 다운로더",
        "extDescription": "vimeo.com에서 비디오 다운로드 (4K 품질 비디오 다운로드)",
        "only": "이 확장 프로그램은 Vimeo에서만 실행됩니다.",
        "open": "비메오 열기",
        "how1": "Vimeo 웹사이트 열기",
        "how2": "Vimeo에서 동영상을 재생해 보세요.",
        "permissions": "이 앱의 권한을 변경했습니다. 소프트웨어가 제대로 작동하려면 아래 버튼을 클릭하여 앱에 대한 권한을 복원해야합니다.",
        "select": "고르다",
        "rightclick": "마우스 오른쪽 버튼으로 클릭",
        "allow": "권한 허용",
        "howtouse": "사용하는 방법",
        "by": "에 의해 구동",
        "search": "검색",
        "helperintro": "모든 웹 사이트에서 비디오 및 오디오를 쉽게 다운로드하십시오.",
        "install": "지금 설치",
        "feedback": "피드백",
        "how3": "이 확장을 엽니 다",
        "how4": "잠깐만 기다려",
        "how5": "다운로드하려는 품질을 클릭하십시오",
        "how6": "새 탭에서 파일이 자동으로 다운로드되어 장치에 저장됩니다",
        "close": "닫기",
        "settings": "사용자 설정",
        "oneclick": "클릭 한 번으로 비디오 다운로드",
        "yes": "예",
        "no": "아니",
        "autoselect": "품질 자동 선택",
        "max": "맥스",
        "apply": "대다",
        "changelanguage": "언어 변경",
        "download": "다운로드",
        "loading": "로딩 중",
        "pin": "편의를 위해이 앱을 고정하세요.",
        "expire": "다운로드 링크가 만료 될 수 있습니다. 제목을 클릭 한 다음 새 다운로드 링크를 가져와야합니다.",
        "clickhere": "여기를 클릭하세요",
        "autorun": "이 애플리케이션을 자동으로 활성화합니다."
    },
    "ku": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Vîdyoyên ji vimeo.com dakêşin (vîdyoyên kalîteya 4K dakêşin)",
        "only": "Ev pêvek tenê li Vimeo dimeşe",
        "open": "Vimeo vekin",
        "how1": "Malpera Vimeo vekin",
        "how2": "Vîdyoyek li ser Vimeo bilîzin.",
        "permissions": "We destûrên vê sepanê guherand. Ji bo ku nermalav bi rêkûpêk bixebite, hûn hewce ne ku bişkoja jêrîn bikirtînin da ku destûrnameyên sepanê vegerînin.",
        "select": "Neqandin",
        "rightclick": "Rast bitikînin",
        "allow": "destûran dihêle",
        "howtouse": "Meriv çawa bikar tîne",
        "by": "Powered by",
        "search": "Gerr",
        "helperintro": "Ji her malperê bi hêsanî vîdyoy û bihîstbar dakêşin.",
        "install": "INSTALL NOW",
        "feedback": "Bersiv",
        "how3": "Vê dirêjkirinê veke",
        "how4": "Momentsend nîvan bisekinin",
        "how5": "Li ser kalîteya ku hûn dixwazin dakêşin bikirtînin",
        "how6": "Li ser tabloya nû, pel dê bixweber dakêşîne û piştre li amûrê xwe tomar bike",
        "close": "Nêzîkî",
        "settings": "Mîhengên bikarhêner",
        "oneclick": "Vîdyoyê bi tenê 1 klîk dakêşin",
        "yes": "Erê",
        "no": "Na",
        "autoselect": "Qalîteya bixweber hilbijêrin",
        "max": "Max",
        "apply": "Bikaranîn",
        "changelanguage": "Ziman biguhezînin",
        "download": "Dakêşînin",
        "loading": "Barkirin",
        "pin": "Ji bo hêsaniyê, ji kerema xwe vê sepanê pin bikin.",
        "expire": "Girêdana dakêşandinê dibe ku betal bibe. Pêdivî ye ku hûn sernavê bikirtînin û piştre girêdanek dakêşandina nû bistînin.",
        "clickhere": "Vira bikirtînin",
        "autorun": "Vê serîlêdanê bixweber çalak bikin."
    },
    "ky": {
        "extName": "Сонун Vimeo жүктөөчү",
        "extDescription": "vimeo.com тартып Videos Download (жүктөп 4K сапаты Videos)",
        "only": "Бул кеңейтүү Vimeoда гана иштейт",
        "open": "Vimeo ачуу",
        "how1": "Vimeo веб-сайтын ачыңыз",
        "how2": "Vimeoдо видео ойнотуу.",
        "permissions": "Бул колдонмонун уруксаттарын өзгөрттүңүз. Программанын туура иштеши үчүн, колдонмонун уруксаттарын калыбына келтирүү үчүн төмөнкү баскычты басуу керек.",
        "select": "Тандоо",
        "rightclick": "Оң баскычты чыкылдатыңыз",
        "allow": "уруксат берет",
        "howtouse": "Кантип пайдалануу керек",
        "by": "Powered менен",
        "search": "издөө",
        "helperintro": "Каалаган сайтынан жана көрмө жүктөп алуу.",
        "install": "Азыр орнотуу",
        "feedback": "Кайрылуу",
        "how3": "Бул узартуу ачуу",
        "how4": "Бир аз убакыт күтүп,",
        "how5": "Сиз жүктөп келет сапатына Click",
        "how6": "жаңы кошумча барагындагы, билэ жазуусу жүктөп жана анда түзмөккө сактап калат",
        "close": "жакын",
        "settings": "Колдонуучунун настройкалары",
        "oneclick": "эле 1 чыкылдатуу менен Videos Download",
        "yes": "Ооба",
        "no": "Жок",
        "autoselect": "Жазуусу тандоо сапаты",
        "max": "Макс",
        "apply": "колдонуу",
        "changelanguage": "тилди өзгөртүү",
        "download": "Жүктөө",
        "loading": "Жүктөө",
        "pin": "Ыңгайлуу болуш үчүн, ушул колдонмону кадап коюңуз.",
        "expire": "Download шилтемеси аяктайт мүмкүн. Сиз аталышы боюнча андан кийин жаңы жүктөп шилтемесин басып чыкылдатуу керек.",
        "clickhere": "Бул жерди чыкылдатыңыз",
        "autorun": "Бул колдонмону автоматтык түрдө жандырыңыз."
    },
    "la": {
        "extName": "Download Video horribilis",
        "extDescription": "Download videos de vimeo.com (qualis 4K download videos)",
        "only": "Haec extensio solum decurrit Vimeo",
        "open": "Open Vimeo",
        "how1": "Aperi Vimeo website",
        "how2": "Ludere video Vimeo.",
        "permissions": "Tu mihi facultates concedere mutavit huius app. Nam software ad bene operandum, vos postulo ut click in puga pyga infra restituet permissiones in app.",
        "select": "select",
        "rightclick": "Vox click",
        "allow": "concedit permissiones",
        "howtouse": "Quam utor",
        "by": "nectunt",
        "search": "Quaerere",
        "helperintro": "Facile download video et audio de ulla website.",
        "install": "NUNC INSTALL",
        "feedback": "feedback",
        "how3": "Aperi haec extensio",
        "how4": "Exspecta paulisper",
        "how5": "Click qualis vis in download",
        "how6": "De novus tab, quod sponte download Gloria Patri et animam tuam fabrica",
        "close": "prope",
        "settings": "User occasus",
        "oneclick": "Iustus click in I download videos",
        "yes": "Ita",
        "no": "nullum",
        "autoselect": "Qualis electis automatically",
        "max": "max",
        "apply": "Applicare",
        "changelanguage": "mutatione linguarum",
        "download": "download",
        "loading": "loading",
        "pin": "Nam commodo, velit id suspenderet app.",
        "expire": "Download link sit exspirare. Si ergo vos click in titulus capto novam download link.",
        "clickhere": "Clige hic",
        "autorun": "Statim excitant hoc application."
    },
    "lb": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Luet Videoen vum vimeo.com eroflueden (4K Qualitéitsvideoen eroflueden)",
        "only": "Dës Extensioun leeft nëmmen op Vimeo",
        "open": "Vimeo opmaachen",
        "how1": "Öffnen der Vimeo Websäit",
        "how2": "Spillt e Video op Vimeo.",
        "permissions": "Dir hutt d'Rechter vun dëser App geännert. Fir datt d'Software richteg funktionnéiert, musst Dir op de Knäppchen hei ënnendrënner klicken fir d'Rechter fir d'App ze restauréieren.",
        "select": "Wielt",
        "rightclick": "Riets klickt",
        "allow": "erlaabt Permissiounen",
        "howtouse": "Wéi benotzen",
        "by": "Bereetgestallt vun",
        "search": "Sich",
        "helperintro": "Einfach Video an Audio vun all Websäit eroflueden.",
        "install": "Installéieren elo",
        "feedback": "Feedback",
        "how3": "Dës Extensioun opmaachen",
        "how4": "Waart e puer Momenter",
        "how5": "Klickt op d'Qualitéit déi Dir erofluede wëllt",
        "how6": "Op der neier Tab wäert d'Datei automatesch eroflueden an duerno op Ärem Apparat späicheren",
        "close": "Zoumaachen",
        "settings": "Benotzer Astellunge",
        "oneclick": "Luet Videoe mat just engem Klick erof",
        "yes": "Jo",
        "no": "Nee",
        "autoselect": "Wielt automatesch Qualitéit",
        "max": "Max",
        "apply": "Asëtzen",
        "changelanguage": "Sprooch änneren",
        "download": "Eroflueden",
        "loading": "Luede",
        "pin": "Fir d'Bequemlechkeet, klickt dës App un.",
        "expire": "Eroflueden Link kann oflafen. Dir sollt op den Tittel klickt da gräift en neien Downloadlink un.",
        "clickhere": "Klickt hei",
        "autorun": "Aktivéiert dës Applikatioun automatesch."
    },
    "lo": {
        "extName": "ດາວໂລດ Vimeo ທີ່ດີເລີດ",
        "extDescription": "ດາວໂຫລດວິດີໂອຈາກ vimeo.com (ດາວໂຫລດວິດີໂອທີ່ມີຄຸນນະພາບ 4K)",
        "only": "ສ່ວນຂະຫຍາຍນີ້ໃຊ້ພຽງແຕ່ໃນ Vimeo ເທົ່ານັ້ນ",
        "open": "ເປີດ Vimeo",
        "how1": "ເປີດເວັບໄຊທ໌ Vimeo",
        "how2": "ຫຼິ້ນວິດີໂອໃນ Vimeo.",
        "permissions": "ທ່ານໄດ້ປ່ຽນສິດອະນຸຍາດຂອງແອັບ this ນີ້ແລ້ວ. ເພື່ອໃຫ້ໂປແກຼມເຮັດວຽກໄດ້ຖືກຕ້ອງ, ທ່ານ ຈຳ ເປັນຕ້ອງກົດປຸ່ມຂ້າງລຸ່ມນີ້ເພື່ອຟື້ນຟູສິດອະນຸຍາດໃຫ້ກັບແອັບ app.",
        "select": "ເລືອກ",
        "rightclick": "ກົດຂວາ",
        "allow": "ອະນຸຍາດໃຫ້ອະນຸຍາດ",
        "howtouse": "ວິທີການ ນຳ ໃຊ້",
        "by": "ສະ​ຫນັບ​ສະ​ຫນູນ​ໂດຍ",
        "search": "ຄົ້ນຫາ",
        "helperintro": "ດາວໂຫລດວີດີໂອແລະສຽງຈາກເວັບໄຊທ໌ໃດກໍ່ໄດ້ງ່າຍ.",
        "install": "ຕິດຕັ້ງດຽວນີ້",
        "feedback": "ຄຳ ຕິຊົມ",
        "how3": "ເປີດສ່ວນຂະຫຍາຍນີ້",
        "how4": "ລໍຖ້າສອງສາມນາທີ",
        "how5": "ໃຫ້ຄລິກໃສ່ຄຸນນະພາບທີ່ທ່ານຕ້ອງການດາວໂຫລດ",
        "how6": "ໃນແຖບ ໃໝ່, ເອກະສານຈະດາວໂຫລດໂດຍອັດຕະໂນມັດແລະຫຼັງຈາກນັ້ນບັນທຶກລົງໃນອຸປະກອນຂອງທ່ານ",
        "close": "ປິດ",
        "settings": "ການຕັ້ງຄ່າຜູ້ໃຊ້",
        "oneclick": "ດາວໂຫລດວິດີໂອໂດຍໃຊ້ພຽງ 1 ຄັ້ງ",
        "yes": "ແມ່ນແລ້ວ",
        "no": "ບໍ່",
        "autoselect": "ເລືອກຄຸນນະພາບໂດຍອັດຕະໂນມັດ",
        "max": "ສູງສຸດທີ່ເຄຍ",
        "apply": "ສະ ໝັກ",
        "changelanguage": "ປ່ຽນ​ພາ​ສາ",
        "download": "ດາວໂຫລດ",
        "loading": "ກຳ ລັງໂຫລດ",
        "pin": "ເພື່ອຄວາມສະດວກ, ກະລຸນາໃສ່ແອັບນີ້.",
        "expire": "ລິ້ງດາວໂຫລດອາດຈະ ໝົດ ອາຍຸ. ທ່ານຄວນກົດໃສ່ຫົວຂໍ້ແລ້ວຈັບລິງດາວໂຫລດ ໃໝ່.",
        "clickhere": "ກົດ​ບ່ອນ​ນີ້",
        "autorun": "ກະຕຸ້ນ ຄຳ ຮ້ອງສະ ໝັກ ນີ້ໂດຍອັດຕະໂນມັດ."
    },
    "lt": {
        "extName": "Nuostabus „Vimeo Downloader“",
        "extDescription": "Atsisiųskite vaizdo įrašus iš vimeo.com (atsisiųskite 4K kokybės vaizdo įrašus)",
        "only": "Šis plėtinys veikia tik „Vimeo“.",
        "open": "Atidarykite „Vimeo“.",
        "how1": "Atidarykite Vimeo svetainę",
        "how2": "Paleiskite vaizdo įrašą „Vimeo“.",
        "permissions": "Pakeitėte šios programos leidimus. Kad programinė įranga tinkamai veiktų, turite spustelėti žemiau esantį mygtuką, kad atkurtumėte programos leidimus.",
        "select": "Pasirinkite",
        "rightclick": "Dešiniuoju pelės mygtuku spustelėkite",
        "allow": "leidžia leidimus",
        "howtouse": "Kaip naudoti",
        "by": "Powered by",
        "search": "Paieška",
        "helperintro": "Lengvai atsisiųskite vaizdo įrašą ir garso įrašą iš bet kurios svetainės.",
        "install": "ĮDIEGTI DABAR",
        "feedback": "Atsiliepimas",
        "how3": "Atidarykite šį plėtinį",
        "how4": "Palaukite keletą akimirkų",
        "how5": "Spustelėkite norimą atsisiųsti kokybę",
        "how6": "Naujame skirtuke failas bus automatiškai atsisiųstas ir išsaugotas jūsų įrenginyje",
        "close": "Uždaryti",
        "settings": "Vartotojo nustatymai",
        "oneclick": "Atsisiųskite vaizdo įrašus vos vienu paspaudimu",
        "yes": "Taip",
        "no": "Ne",
        "autoselect": "Automatiškai pasirinkti kokybę",
        "max": "Maks",
        "apply": "Taikyti",
        "changelanguage": "Pakeisti KALBĄ",
        "download": "parsisiųsti",
        "loading": "Įkeliama",
        "pin": "Kad būtų patogiau, prispauskite šią programą.",
        "expire": "Atsisiuntimo nuoroda gali nebegalioti. Turėtumėte spustelėti pavadinimą, tada patraukti naują atsisiuntimo nuorodą.",
        "clickhere": "Paspauskite čia",
        "autorun": "Automatiškai suaktyvinti šią programą."
    },
    "lv": {
        "extName": "Satriecošs Vimeo Downloader",
        "extDescription": "Lejupielādējiet videoklipus no vimeo.com (lejupielādējiet 4K kvalitātes videoklipus)",
        "only": "Šis paplašinājums darbojas tikai Vimeo",
        "open": "Atveriet Vimeo",
        "how1": "Atveriet Vimeo vietni",
        "how2": "Atskaņojiet video vietnē Vimeo.",
        "permissions": "Jūs esat mainījis šīs lietotnes atļaujas. Lai programmatūra darbotos pareizi, jums ir jānoklikšķina uz tālāk redzamās pogas, lai atjaunotu lietotnes atļaujas.",
        "select": "Atlasiet",
        "rightclick": "Ar peles labo pogu noklikšķiniet",
        "allow": "atļauj atļaujas",
        "howtouse": "Kā izmantot",
        "by": "Darbina",
        "search": "Meklēt",
        "helperintro": "Ērti lejupielādējiet video un audio no jebkuras vietnes.",
        "install": "INSTALĒT TAGAD",
        "feedback": "Atsauksmes",
        "how3": "Atveriet šo paplašinājumu",
        "how4": "Pagaidiet dažus mirkļus",
        "how5": "Noklikšķiniet uz kvalitātes, kuru vēlaties lejupielādēt",
        "how6": "Jaunajā cilnē fails tiks automātiski lejupielādēts un pēc tam saglabāts jūsu ierīcē",
        "close": "Aizveriet",
        "settings": "Lietotāja iestatījumi",
        "oneclick": "Lejupielādējiet videoklipus tikai ar vienu klikšķi",
        "yes": "Jā",
        "no": "Nē",
        "autoselect": "Automātiski atlasiet kvalitāti",
        "max": "Maks",
        "apply": "Piesakies",
        "changelanguage": "Mainīt VALODU",
        "download": "Lejupielādēt",
        "loading": "Notiek ielāde",
        "pin": "Ērtības labad, lūdzu, piespraudiet šo lietotni.",
        "expire": "Lejupielādes saites derīguma termiņš var beigties. Jums vajadzētu noklikšķināt uz nosaukuma un pēc tam satvert jaunu lejupielādes saiti.",
        "clickhere": "Noklikšķiniet šeit",
        "autorun": "Automātiski aktivizēt šo lietojumprogrammu."
    },
    "mg": {
        "extName": "Tsara ny Vimeo Downloader",
        "extDescription": "Misintona horonantsary avy ao amin'ny vimeo.com (misintona horonantsary 4K kalitao)",
        "only": "Ity fanitarana ity dia mandeha amin'ny Vimeo ihany",
        "open": "Sokafy ny Vimeo",
        "how1": "Sokafy ny tranokala Vimeo",
        "how2": "Alefaso video ao amin'ny Vimeo.",
        "permissions": "Nanova ny fahazoan-dàlan'ity fampiharana ity ianao. Raha te hiasa tsara ny rindrambaiko dia mila tsindrio ny bokotra etsy ambany hamerenana ny fahazoan-dàlana amin'ny fampiharana.",
        "select": "Select",
        "rightclick": "Tsindrio havanana",
        "allow": "mamela alalana",
        "howtouse": "Ny fomba fampiasana",
        "by": "Ampandehanin'i",
        "search": "Search",
        "helperintro": "Misintona feo sy audio mora foana avy amin'ny tranokala rehetra.",
        "install": "INSTALL Now",
        "feedback": "Feedback",
        "how3": "Sokafy ity fanitarana ity",
        "how4": "Andraso fotoana kely",
        "how5": "Kitiho ny kalitao tianao alaina",
        "how6": "Ao amin'ny tabilao vaovao, ny rakitra dia hisintona ho azy avy eo ary alao amin'ny fitaovanao",
        "close": "Close",
        "settings": "Tetikasa mpampiasa",
        "oneclick": "Misintona horonantsary miaraka amin'ny pika iray monja",
        "yes": "Eny",
        "no": "No",
        "autoselect": "Misafidiana kalitao mivantana",
        "max": "Max",
        "apply": "Ampiharo",
        "changelanguage": "Manova fiteny",
        "download": "Download",
        "loading": "Loading",
        "pin": "Mba hahamora, azafady apetaho ity rindrambaiko ity.",
        "expire": "Mety ho lany ny rohy download. Tokony tsindrio eo amin'ilay lohateny ianao vao haka rohy download vaovao.",
        "clickhere": "kitiho eto",
        "autorun": "Ataovy mandeha ho azy ity rindranasa ity."
    },
    "mi": {
        "extName": "Awatea Kaituku Vimeo",
        "extDescription": "Tangohia nga ataata mai i te vimeo.com (tango i nga ataata kounga 4K)",
        "only": "Ka rere noa tenei toronga ki Vimeo",
        "open": "Whakatuwheratia a Vimeo",
        "how1": "Whakatuwheratia te paetukutuku Vimeo",
        "how2": "Whakatangihia he ataata ki Vimeo.",
        "permissions": "Kua hurihia e koe nga mana o tenei taupānga. Kia pai ai te mahi a te raupaparorohiko, me patene te paatene i raro nei hei whakaora i nga whakaaetanga ki te taupānga.",
        "select": "Tohua",
        "rightclick": "Paato matau",
        "allow": "āhei whakaaetanga",
        "howtouse": "Me pehea te whakamahi",
        "by": "Nā E",
        "search": "Rapu",
        "helperintro": "Tena te tango ataata me te oro mai i tetahi paetukutuku.",
        "install": "INSTAL inaianei",
        "feedback": "Urupare",
        "how3": "Whakatūwherahia tenei taapiri",
        "how4": "Taria he wa iti",
        "how5": "Paatohia te kounga e hiahia ana koe ki te tango",
        "how6": "I te ripa hou, ka tangohia te konae me te penapena ki to taputapu",
        "close": "Katia",
        "settings": "Tautuhinga kaiwhakamahi",
        "oneclick": "Tangohia nga ataata me te 1 noa te paato",
        "yes": "Ae",
        "no": "Kore kau",
        "autoselect": "Tohu tikahia te kounga",
        "max": "Max",
        "apply": "Tono",
        "changelanguage": "Huria te reo",
        "download": "Tangohia",
        "loading": "Kei te utaina",
        "pin": "Hei waatea, tohua koa tenei taupānga.",
        "expire": "Ka mutu te hono download. Me paatoo koe ki te taitara ka hopu i tetahi hononga download hou.",
        "clickhere": "Patohia a konei",
        "autorun": "Whakahohe aunoatia tenei tono."
    },
    "mk": {
        "extName": "Прекрасен симнувач на Вимео",
        "extDescription": "Преземете видеа од vimeo.com (преземете видеа со квалитет од 4K)",
        "only": "Оваа екстензија работи само на Vimeo",
        "open": "Отворете Vimeo",
        "how1": "Отворете ја веб-страницата на Vimeo",
        "how2": "Пуштете видео на Vimeo.",
        "permissions": "Ги сменивте дозволите на оваа апликација. За софтверот да работи правилно, треба да кликнете на копчето подолу за да ги вратите дозволите на апликацијата.",
        "select": "Изберете",
        "rightclick": "Десен клик",
        "allow": "дозволува дозволи",
        "howtouse": "Како да се користи",
        "by": "Поддржано од",
        "search": "Пребарај",
        "helperintro": "Лесно преземете видео и аудио од која било веб-страница.",
        "install": "ИНСТАЛИРАТЕ СЕГА",
        "feedback": "Повратна информација",
        "how3": "Отворете го ова продолжение",
        "how4": "Чекај неколку моменти",
        "how5": "Кликнете на квалитетот што сакате да го преземете",
        "how6": "На новото јазиче, датотеката автоматски ќе ја преземе и потоа ќе се зачува на вашиот уред",
        "close": "Затвори",
        "settings": "Кориснички поставки",
        "oneclick": "Преземете видеа со само 1 клик",
        "yes": "Да",
        "no": "Не",
        "autoselect": "Автоматски изберете квалитет",
        "max": "Макс",
        "apply": "Аплицирај",
        "changelanguage": "Промени го јазикот",
        "download": "Преземи",
        "loading": "Се вчитува",
        "pin": "За погодност, ве молиме закачете ја оваа апликација.",
        "expire": "Врската за преземање може да истече. Треба да кликнете на насловот, потоа да имате нова врска за преземање.",
        "clickhere": "Кликни тука",
        "autorun": "Автоматски активирајте ја оваа апликација."
    },
    "ml": {
        "extName": "ആകർഷണീയമായ വിമിയോ ഡൗൺലോഡർ",
        "extDescription": "Vimeo.com ൽ നിന്ന് വീഡിയോകൾ ഡ Download ൺലോഡ് ചെയ്യുക (4 കെ നിലവാരമുള്ള വീഡിയോകൾ ഡ download ൺലോഡ് ചെയ്യുക)",
        "only": "ഈ വിപുലീകരണം വിമിയോയിൽ മാത്രം പ്രവർത്തിക്കുന്നു",
        "open": "വിമിയോ തുറക്കുക",
        "how1": "Vimeo വെബ്സൈറ്റ് തുറക്കുക",
        "how2": "വിമിയോയിൽ ഒരു വീഡിയോ പ്ലേ ചെയ്യുക.",
        "permissions": "ഈ അപ്ലിക്കേഷന്റെ അനുമതികൾ നിങ്ങൾ മാറ്റി. സോഫ്റ്റ്വെയർ ശരിയായി പ്രവർത്തിക്കുന്നതിന്, അപ്ലിക്കേഷനിലേക്കുള്ള അനുമതികൾ പുന restore സ്ഥാപിക്കാൻ നിങ്ങൾ ചുവടെയുള്ള ബട്ടൺ ക്ലിക്കുചെയ്യേണ്ടതുണ്ട്.",
        "select": "തിരഞ്ഞെടുക്കുക",
        "rightclick": "വലത് ക്ലിക്കിൽ",
        "allow": "അനുമതികൾ അനുവദിക്കുന്നു",
        "howtouse": "എങ്ങനെ ഉപയോഗിക്കാം",
        "by": "പ്രായോജകർ",
        "search": "തിരയുക",
        "helperintro": "ഏത് വെബ്‌സൈറ്റിൽ നിന്നും വീഡിയോയും ഓഡിയോയും എളുപ്പത്തിൽ ഡൗൺലോഡുചെയ്യുക.",
        "install": "ഇപ്പോൾ ഇൻസ്റ്റാൾ ചെയ്യുക",
        "feedback": "ഫീഡ്‌ബാക്ക്",
        "how3": "ഈ വിപുലീകരണം തുറക്കുക",
        "how4": "കുറച്ച് നിമിഷങ്ങൾ കാത്തിരിക്കുക",
        "how5": "നിങ്ങൾ ഡ .ൺലോഡ് ചെയ്യാൻ ആഗ്രഹിക്കുന്ന ഗുണനിലവാരത്തിൽ ക്ലിക്കുചെയ്യുക",
        "how6": "പുതിയ ടാബിൽ, ഫയൽ സ്വപ്രേരിതമായി ഡ download ൺലോഡ് ചെയ്യുകയും നിങ്ങളുടെ ഉപകരണത്തിലേക്ക് സംരക്ഷിക്കുകയും ചെയ്യും",
        "close": "അടയ്‌ക്കുക",
        "settings": "ഉപയോക്തൃ ക്രമീകരണങ്ങൾ",
        "oneclick": "വെറും 1 ക്ലിക്കിലൂടെ വീഡിയോകൾ ഡൺലോഡ് ചെയ്യുക",
        "yes": "അതെ",
        "no": "ഇല്ല",
        "autoselect": "ഗുണമേന്മ സ്വയമേവ തിരഞ്ഞെടുക്കുക",
        "max": "പരമാവധി",
        "apply": "പ്രയോഗിക്കുക",
        "changelanguage": "ഭാഷ മാറ്റുക",
        "download": "ഡൗൺലോഡ്",
        "loading": "ലോഡിംഗ്",
        "pin": "സ For കര്യത്തിനായി, ദയവായി ഈ അപ്ലിക്കേഷൻ പിൻ ചെയ്യുക.",
        "expire": "ഡൗൺലോഡ് ലിങ്ക് കാലഹരണപ്പെടാം. നിങ്ങൾ ശീർഷകത്തിൽ ക്ലിക്കുചെയ്‌ത് ഒരു പുതിയ ഡൗൺലോഡ് ലിങ്ക് നേടുക.",
        "clickhere": "ഇവിടെ ക്ലിക്ക് ചെയ്യുക",
        "autorun": "ഈ അപ്ലിക്കേഷൻ യാന്ത്രികമായി സജീവമാക്കുക."
    },
    "mn": {
        "extName": "Гайхалтай Vimeo татаж авагч",
        "extDescription": "Vimeo.com дээрээс видеог татаж авах (4K чанарын видеог татаж авах)",
        "only": "Энэ өргөтгөл нь зөвхөн Vimeo дээр ажилладаг",
        "open": "Vimeo-г нээх",
        "how1": "Vimeo вэбсайтыг нээнэ үү",
        "how2": "Vimeo дээр видео тоглуулаарай.",
        "permissions": "Та энэ аппын зөвшөөрлийг өөрчилсөн. Програмыг зөв ажиллуулахын тулд та доорх товчийг дарж програмын зөвшөөрлийг сэргээнэ үү.",
        "select": "Сонгох",
        "rightclick": "Баруун дээр дарна уу",
        "allow": "зөвшөөрлийг зөвшөөрдөг",
        "howtouse": "Яаж хэрэглэх вэ",
        "by": "Хүргэж өгсөн",
        "search": "Хайлт хийх",
        "helperintro": "Видео болон аудиог дурын вэбсайтаас хялбархан татаж аваарай.",
        "install": "ОДОО СУУЛГАХ",
        "feedback": "Санал хүсэлт өгөх",
        "how3": "Энэ өргөтгөлийг нээнэ үү",
        "how4": "Хэдэн хором хүлээнэ үү",
        "how5": "Татаж авахыг хүсч буй чанар дээрээ дарна уу",
        "how6": "Шинэ таб дээр файл автоматаар татаж аваад дараа нь таны төхөөрөмжид хадгалагдана",
        "close": "Хаах",
        "settings": "Хэрэглэгчийн тохиргоо",
        "oneclick": "Нэг товшилтоор видео татаж аваарай",
        "yes": "Тийм шүү",
        "no": "Үгүй шүү",
        "autoselect": "Чанарыг автоматаар сонгох",
        "max": "Хамгийн их",
        "apply": "Хэрэглэх",
        "changelanguage": "Хэл өөрчлөх",
        "download": "Татаж авах",
        "loading": "Ачаалж байна",
        "pin": "Тохиромжтой болгохын тулд энэ програмыг зүүнэ үү.",
        "expire": "Татаж авах холбоосын хугацаа дууссан байж магадгүй. Та гарчиг дээр дараад шинэ татаж авах холбоосыг татаж аваарай.",
        "clickhere": "Энд дар",
        "autorun": "Энэ програмыг автоматаар идэвхжүүлнэ үү."
    },
    "mr": {
        "extName": "अप्रतिम Vimeo डाउनलोडर",
        "extDescription": "Vimeo.com वरून व्हिडिओ डाउनलोड करा (4K गुणवत्ता व्हिडिओ डाउनलोड करा)",
        "only": "हा विस्तार फक्त Vimeo वर चालतो",
        "open": "Vimeo उघडा",
        "how1": "Vimeo वेबसाइट उघडा",
        "how2": "Vimeo वर व्हिडिओ प्ले करा.",
        "permissions": "आपण या अ‍ॅपच्या परवानग्या बदलल्या आहेत. सॉफ्टवेअर योग्य प्रकारे कार्य करण्यासाठी, अ‍ॅपला परवानग्या पुनर्संचयित करण्यासाठी आपल्याला खालील बटणावर क्लिक करणे आवश्यक आहे.",
        "select": "निवडा",
        "rightclick": "राईट क्लिक",
        "allow": "परवानगी परवानगी देते",
        "howtouse": "कसे वापरावे",
        "by": "द्वारा समर्थित",
        "search": "शोधा",
        "helperintro": "कोणत्याही वेबसाइटवरून व्हिडिओ आणि ऑडिओ सहजपणे डाउनलोड करा.",
        "install": "स्थापित करा",
        "feedback": "अभिप्राय",
        "how3": "हा विस्तार उघडा",
        "how4": "काही क्षण थांबा",
        "how5": "आपण डाउनलोड करू इच्छित गुणवत्तेवर क्लिक करा",
        "how6": "नवीन टॅबवर, फाईल स्वयंचलितपणे डाउनलोड होईल आणि नंतर आपल्या डिव्हाइसवर जतन होईल",
        "close": "बंद",
        "settings": "वापरकर्ता सेटिंग्ज",
        "oneclick": "फक्त 1 क्लिक करून व्हिडिओ डाउनलोड करा",
        "yes": "होय",
        "no": "नाही",
        "autoselect": "स्वयंचलितपणे गुणवत्ता निवडा",
        "max": "कमाल",
        "apply": "अर्ज करा",
        "changelanguage": "भाषा बदला",
        "download": "डाउनलोड करा",
        "loading": "लोड करीत आहे",
        "pin": "सोयीसाठी, कृपया हा अ‍ॅप पिन करा.",
        "expire": "डाउनलोड दुवा कालबाह्य होऊ शकेल. आपण शीर्षक वर क्लिक करावे आणि नंतर नवीन डाउनलोड दुवा हस्तगत करावा.",
        "clickhere": "इथे क्लिक करा",
        "autorun": "हा अनुप्रयोग स्वयंचलितपणे सक्रिय करा."
    },
    "ms": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Muat turun video dari vimeo.com (muat turun video berkualiti 4K)",
        "only": "Sambungan ini hanya berjalan pada Vimeo",
        "open": "Buka Vimeo",
        "how1": "Buka laman web Vimeo",
        "how2": "Mainkan video di Vimeo.",
        "permissions": "Anda telah menukar kebenaran aplikasi ini. Agar perisian berfungsi dengan baik, anda perlu mengklik butang di bawah untuk memulihkan kebenaran ke aplikasi.",
        "select": "Pilih",
        "rightclick": "Klik kanan",
        "allow": "membenarkan kebenaran",
        "howtouse": "Bagaimana nak guna",
        "by": "Dikuasai oleh",
        "search": "Carian",
        "helperintro": "Mudah memuat turun video dan audio dari mana-mana laman web.",
        "install": "INSTALL SEKARANG",
        "feedback": "Maklumbalas",
        "how3": "Buka pelanjutan ini",
        "how4": "Tunggu beberapa saat",
        "how5": "Klik pada kualiti yang anda mahu muat turun",
        "how6": "Pada tab baharu, fail itu akan memuat turun secara automatik dan kemudian disimpan ke peranti anda",
        "close": "Tutup",
        "settings": "Tetapan pengguna",
        "oneclick": "Muat turun video dengan hanya 1 klik",
        "yes": "Ya",
        "no": "Tidak",
        "autoselect": "Pilih kualiti secara automatik",
        "max": "Maks",
        "apply": "Sapukan",
        "changelanguage": "Tukar bahasa",
        "download": "Muat turun",
        "loading": "Memuatkan",
        "pin": "Untuk kemudahan, sila pasangkan aplikasi ini.",
        "expire": "Pautan muat turun boleh tamat tempoh. Anda perlu klik pada tajuk kemudian ambil pautan muat turun yang baru.",
        "clickhere": "Tekan di sini",
        "autorun": "Aktifkan aplikasi ini secara automatik."
    },
    "mt": {
        "extName": "Tal-biża ’Vimeo Downloader",
        "extDescription": "Niżżel il-vidjows minn vimeo.com (niżżel vidjos ta 'kwalità 4K)",
        "only": "Din l-estensjoni taħdem biss fuq Vimeo",
        "open": "Iftaħ Vimeo",
        "how1": "Iftaħ il-websajt ta' Vimeo",
        "how2": "Ilgħab vidjo fuq Vimeo.",
        "permissions": "Biddilt il-permessi ta 'din l-app. Biex is-softwer jaħdem sew, trid tikklikkja l-buttuna hawn taħt biex tirrestawra l-permessi għall-app.",
        "select": "Agħżel",
        "rightclick": "Ikklikkja lemin",
        "allow": "jippermetti permessi",
        "howtouse": "Kif tuża",
        "by": "Mħaddem minn",
        "search": "Fittex",
        "helperintro": "Tniżżel faċilment vidjo u awdjo minn kwalunkwe websajt.",
        "install": "STALLA ISSA",
        "feedback": "Rispons",
        "how3": "Iftaħ din l-estensjoni",
        "how4": "Stenna ftit mumenti",
        "how5": "Ikklikkja fuq il-kwalità li trid tniżżel",
        "how6": "Fit-tab il-ġdida, il-fajl se jniżżel awtomatikament u mbagħad isalva fit-tagħmir tiegħek",
        "close": "Qrib",
        "settings": "Is-settings tal-utent",
        "oneclick": "Niżżel il-vidjows bi klikk waħda biss",
        "yes": "Iva",
        "no": "Le",
        "autoselect": "Tagħżel awtomatikament il-kwalità",
        "max": "Max",
        "apply": "Applika",
        "changelanguage": "Ibdel il-lingwa",
        "download": "Niżżel",
        "loading": "Tagħbija",
        "pin": "Għall-konvenjenza, jekk jogħġbok pin din l-app.",
        "expire": "Il-link tad-download jista 'jiskadi. Għandek tikklikkja fuq it-titlu imbagħad aqbad rabta ta 'tniżżil ġdida.",
        "clickhere": "Għafas hawn",
        "autorun": "Attiva din l-applikazzjoni awtomatikament."
    },
    "my": {
        "extName": "အံ့သြဖွယ် Vimeo Downloader",
        "extDescription": "vimeo.com မှဗီဒီယိုများကူးယူပါ (4K အရည်အသွေးရှိသောဗီဒီယိုများကိုဒေါင်းလုပ်ဆွဲပါ)",
        "only": "ဤတိုးချဲ့မှုသည် Vimeo တွင်သာအလုပ်လုပ်သည်။",
        "open": "Vimeo ကိုဖွင့်ပါ။",
        "how1": "Vimeo ဝဘ်ဆိုဒ်ကိုဖွင့်ပါ။",
        "how2": "Vimeo တွင် ဗီဒီယိုတစ်ခုဖွင့်ပါ။",
        "permissions": "သငျသညျဤ app ၏ခွင့်ပြုချက်ကိုပြောင်းလဲပါပြီ။ ဆော့ဖ်ဝဲကောင်းကောင်းအလုပ်လုပ်ရန်၊ အက်ပလီကေးရှင်းကိုခွင့်ပြုချက်ပြန်ယူရန်အောက်ပါခလုတ်ကိုနှိပ်ပါ။",
        "select": "ရွေးချယ်ပါ",
        "rightclick": "Right Click နှိပ်ပါ",
        "allow": "ခွင့်ပြုချက်ကိုခွင့်ပြုပါတယ်",
        "howtouse": "အသုံးပြုနည်း",
        "by": "မှပံ့ပိုးသည်",
        "search": "ရှာပါ",
        "helperintro": "မည်သည့် website မှမဆိုဗီဒီယိုနှင့်အသံများကိုအလွယ်တကူ download လုပ်ပါ။",
        "install": "အခု install လုပ်ပါ",
        "feedback": "တုံ့ပြန်ချက်",
        "how3": "ဒီ extension ကိုဖွင့်ပါ",
        "how4": "ခဏစောင့်ပါ",
        "how5": "သင် download လုပ်ချင်သောအရည်အသွေးကိုနှိပ်ပါ",
        "how6": "tab အသစ်တွင်ဖိုင်သည်အလိုအလျောက် download လုပ်ပြီးသင်၏ device ထဲသို့သိမ်းဆည်းလိမ့်မည်",
        "close": "ပိတ်",
        "settings": "အသုံးပြုသူဆက်တင်များ",
        "oneclick": "တစ်ချက်နှိပ်ရုံဖြင့်ဗီဒီယိုများကူးယူပါ",
        "yes": "ဟုတ်တယ်",
        "no": "မဟုတ်ဘူး",
        "autoselect": "အရည်အသွေးအလိုအလျောက်ရွေးချယ်ပါ",
        "max": "မက်စ်",
        "apply": "လျှောက်ထားပါ",
        "changelanguage": "ဘာသာစကားပြောင်းပါ",
        "download": "ဒေါင်းလုပ်",
        "loading": "တင်နေသည်",
        "pin": "အဆင်ပြေစေရန်ဒီ app ကို pin လုပ်ပါ",
        "expire": "ဒေါင်းလုပ်လင့်ခ်သည်သက်တမ်းကုန်ဆုံးနိုင်သည် ခေါင်းစဉ်ပေါ်တွင်သင် နှိပ်၍ download link အသစ်တစ်ခုကိုရယူပါ။",
        "clickhere": "ဤနေရာကိုကလစ်နှိပ်ပါ",
        "autorun": "ဤလျှောက်လွှာကိုအလိုအလျောက်သက်ဝင်စေပါ။"
    },
    "ne": {
        "extName": "अद्भुत Vimeo डाउनलोडर",
        "extDescription": "Vimeo.com बाट भिडियोहरू डाउनलोड गर्नुहोस् (KK गुणवत्ता भिडियोहरू डाउनलोड गर्नुहोस्)",
        "only": "यो विस्तार Vimeo मा मात्र चल्छ",
        "open": "Vimeo खोल्नुहोस्",
        "how1": "Vimeo वेबसाइट खोल्नुहोस्",
        "how2": "Vimeo मा भिडियो प्ले गर्नुहोस्।",
        "permissions": "तपाईंले यस अनुप्रयोगको अनुमतिहरू परिवर्तन गर्नुभयो। सफ्टवेयरले राम्रोसँग काम गर्नका लागि तपाईले तलको बटनमा क्लिक गर्नुपर्दछ अनुप्रयोगमा अनुमतिहरू पुनर्स्थापित गर्न।",
        "select": "चयन गर्नुहोस्",
        "rightclick": "दायाँ क्लिक गर्नुहोस्",
        "allow": "अनुमति अनुमति दिन्छ",
        "howtouse": "कसरी प्रयोग गर्ने",
        "by": "द्वारा संचालित",
        "search": "खोज्नुहोस्",
        "helperintro": "सजिलैसँग कुनै वेबसाइटबाट भिडियो र अडियो डाउनलोड गर्नुहोस्।",
        "install": "अब स्थापना गर्नुहोस्",
        "feedback": "प्रतिक्रिया",
        "how3": "यो विस्तार खोल्नुहोस्",
        "how4": "केहि क्षण प्रतिक्षा गर्नुहोस्",
        "how5": "तपाईले डाउनलोड गर्न चाहानु भएको गुणमा क्लिक गर्नुहोस्",
        "how6": "नयाँ ट्याबमा, फाईल स्वत: डाउनलोड हुनेछ र तपाईंको उपकरणमा बचत हुनेछ",
        "close": "बन्द",
        "settings": "प्रयोगकर्ता सेटिंग्स",
        "oneclick": "केवल १ क्लिकको साथ भिडियोहरू डाउनलोड गर्नुहोस्",
        "yes": "हो",
        "no": "होईन",
        "autoselect": "स्वचालित रूपमा गुणवत्ता चयन गर्नुहोस्",
        "max": "अधिकतम",
        "apply": "निवेदन गर्नु",
        "changelanguage": "भाषा परिवर्तन गर्नुहोस्",
        "download": "डाउनलोड गर्नुहोस्",
        "loading": "लोड हुँदै",
        "pin": "सुविधाको लागि, कृपया यस अनुप्रयोगलाई पिन गर्नुहोस्।",
        "expire": "डाउनलोड लिंकको म्याद सकिन्छ। तपाईंले शीर्षकमा क्लिक गर्नुपर्छ त्यसपछि नयाँ डाउनलोड लिंक लिनुहोस्।",
        "clickhere": "यहाँ क्लिक गर्नुहोस्",
        "autorun": "यस अनुप्रयोगलाई स्वचालित रूपमा सक्रिय गर्नुहोस्।"
    },
    "nl": {
        "extName": "Geweldige Vimeo Downloader",
        "extDescription": "Download video's van vimeo.com (download video's van 4K kwaliteit)",
        "only": "Deze extensie draait alleen op Vimeo",
        "open": "Vimeo openen",
        "how1": "Open de Vimeo-website",
        "how2": "Speel een video af op Vimeo.",
        "permissions": "Je hebt de rechten van deze app gewijzigd. Om de software correct te laten werken, moet u op de onderstaande knop klikken om de machtigingen voor de app te herstellen.",
        "select": "Selecteer",
        "rightclick": "Klik met de rechtermuisknop",
        "allow": "staat permissies toe",
        "howtouse": "Hoe te gebruiken",
        "by": "Aangedreven door",
        "search": "Zoeken",
        "helperintro": "Download eenvoudig video en audio van elke website.",
        "install": "INSTALLEER NU",
        "feedback": "terugkoppeling",
        "how3": "Open deze extensie",
        "how4": "Wacht even",
        "how5": "Klik op de kwaliteit die u wilt downloaden",
        "how6": "Op het nieuwe tabblad wordt het bestand automatisch gedownload en vervolgens op uw apparaat opgeslagen",
        "close": "Dichtbij",
        "settings": "Gebruikersinstellingen",
        "oneclick": "Download video's met slechts 1 klik",
        "yes": "Ja",
        "no": "Nee",
        "autoselect": "Selecteer automatisch kwaliteit",
        "max": "Max",
        "apply": "Van toepassing zijn",
        "changelanguage": "Verander de taal",
        "download": "Downloaden",
        "loading": "Bezig met laden",
        "pin": "Zet deze app voor het gemak vast.",
        "expire": "Downloadlink kan verlopen. Klik op de titel en pak een nieuwe downloadlink.",
        "clickhere": "Klik hier",
        "autorun": "Activeer deze applicatie automatisch."
    },
    "no": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Last ned videoer fra vimeo.com (last ned 4K-videoer)",
        "only": "Denne utvidelsen kjører bare på Vimeo",
        "open": "Åpne Vimeo",
        "how1": "Åpne Vimeo-nettstedet",
        "how2": "Spill av en video på Vimeo.",
        "permissions": "Du har endret tillatelsene til denne appen. For at programvaren skal fungere skikkelig, må du klikke på knappen nedenfor for å gjenopprette tillatelsene til appen.",
        "select": "Plukke ut",
        "rightclick": "Høyreklikk",
        "allow": "tillater tillatelser",
        "howtouse": "Hvordan å bruke",
        "by": "Drevet av",
        "search": "Søk",
        "helperintro": "Last ned video og lyd enkelt fra ethvert nettsted.",
        "install": "INSTALLERE NÅ",
        "feedback": "Tilbakemelding",
        "how3": "Åpne denne utvidelsen",
        "how4": "Vent noen øyeblikk",
        "how5": "Klikk på kvaliteten du vil laste ned",
        "how6": "I den nye fanen vil filen automatisk lastes ned og deretter lagres på enheten din",
        "close": "Lukk",
        "settings": "Brukerinstillinger",
        "oneclick": "Last ned videoer med bare ett klikk",
        "yes": "Ja",
        "no": "Nei",
        "autoselect": "Velg kvalitet automatisk",
        "max": "Max",
        "apply": "Søke om",
        "changelanguage": "Skifte språk",
        "download": "nedlasting",
        "loading": "Laster inn",
        "pin": "For enkelhets skyld, vennligst fest denne appen.",
        "expire": "Nedlastingslenken kan utløpe. Du må klikke på tittelen og deretter ta en ny nedlastingslenke.",
        "clickhere": "Klikk her",
        "autorun": "Aktiver automatisk dette programmet."
    },
    "ny": {
        "extName": "Chosangalatsa Vimeo",
        "extDescription": "Tsitsani makanema kuchokera vimeo.com (tsitsani makanema apamwamba a 4K)",
        "only": "Kuwonjezera uku kumangoyenda pa Vimeo",
        "open": "Tsegulani Vimeo",
        "how1": "Tsegulani tsamba la Vimeo",
        "how2": "Sewerani kanema pa Vimeo.",
        "permissions": "Mwasintha zilolezo za pulogalamuyi. Kuti pulogalamuyi igwire bwino ntchito, muyenera dinani batani pansipa kuti mubwezeretse zilolezo ku pulogalamuyi.",
        "select": "Sankhani",
        "rightclick": "Dinani kumanja",
        "allow": "amalola zilolezo",
        "howtouse": "Momwe mungagwiritsire ntchito",
        "by": "Mothandizidwa ndi",
        "search": "Sakani",
        "helperintro": "Tsitsani kanema ndi zomvetsera kuchokera patsamba lililonse.",
        "install": "LANGANI TSOPANO",
        "feedback": "Mayankho",
        "how3": "Tsegulani izi",
        "how4": "Yembekezani mphindi zochepa",
        "how5": "Dinani pa mtundu womwe mukufuna kutsitsa",
        "how6": "Pa tabu yatsopano, fayiloyo imangotsitsa ndikusunga ku chipangizo chanu",
        "close": "Tsekani",
        "settings": "Zokonda pa ogwiritsa ntchito",
        "oneclick": "Tsitsani makanema ndikungodinanso kamodzi",
        "yes": "Inde",
        "no": "Ayi",
        "autoselect": "Sankhani zokha mtundu",
        "max": "Max",
        "apply": "Lemberani",
        "changelanguage": "Sinthani chilankhulo",
        "download": "Tsitsani",
        "loading": "Kutsegula",
        "pin": "Kuti mukhale kosavuta, chonde ikani pulogalamuyi.",
        "expire": "Tsitsani ulalo ungathe. Muyenera dinani pamutuwo ndiye kuti mutenganso ulalo wotsitsa watsopano.",
        "clickhere": "Dinani apa",
        "autorun": "Yambitsani ntchitoyi."
    },
    "pa": {
        "extName": "ਬਹੁਤ ਵਧੀਆ Vimeo ਡਾerਨਲੋਡਰ",
        "extDescription": "Vimeo.com ਤੋਂ ਵੀਡੀਓ ਡਾ Downloadਨਲੋਡ ਕਰੋ (4K ਕੁਆਲਿਟੀ ਦੇ ਵੀਡੀਓ ਡਾ downloadਨਲੋਡ ਕਰੋ)",
        "only": "ਇਹ ਐਕਸਟੈਂਸ਼ਨ ਸਿਰਫ਼ Vimeo 'ਤੇ ਚੱਲਦਾ ਹੈ",
        "open": "Vimeo ਖੋਲ੍ਹੋ",
        "how1": "Vimeo ਵੈਬਸਾਈਟ ਖੋਲ੍ਹੋ",
        "how2": "Vimeo 'ਤੇ ਵੀਡੀਓ ਚਲਾਓ।",
        "permissions": "ਤੁਸੀਂ ਇਸ ਐਪ ਦੀ ਅਨੁਮਤੀ ਬਦਲ ਦਿੱਤੀ ਹੈ. ਸਾੱਫਟਵੇਅਰ ਦੇ ਸਹੀ workੰਗ ਨਾਲ ਕੰਮ ਕਰਨ ਲਈ, ਐਪ ਨੂੰ ਅਨੁਮਤੀਆਂ ਨੂੰ ਬਹਾਲ ਕਰਨ ਲਈ ਤੁਹਾਨੂੰ ਹੇਠਾਂ ਦਿੱਤੇ ਬਟਨ ਨੂੰ ਦਬਾਉਣ ਦੀ ਜ਼ਰੂਰਤ ਹੈ.",
        "select": "ਚੁਣੋ",
        "rightclick": "ਸੱਜਾ ਕਲਿੱਕ ਕਰੋ",
        "allow": "ਅਧਿਕਾਰ ਦਿੰਦਾ ਹੈ",
        "howtouse": "ਇਹਨੂੰ ਕਿਵੇਂ ਵਰਤਣਾ ਹੈ",
        "by": "ਦੁਆਰਾ ਸੰਚਾਲਿਤ",
        "search": "ਖੋਜ",
        "helperintro": "ਕਿਸੇ ਵੀ ਵੈਬਸਾਈਟ ਤੋਂ ਅਸਾਨੀ ਨਾਲ ਵੀਡੀਓ ਅਤੇ ਆਡੀਓ ਡਾ downloadਨਲੋਡ ਕਰੋ.",
        "install": "ਹੁਣ ਸਥਾਪਤ ਕਰੋ",
        "feedback": "ਸੁਝਾਅ",
        "how3": "ਇਸ ਐਕਸਟੈਂਸ਼ਨ ਨੂੰ ਖੋਲ੍ਹੋ",
        "how4": "ਕੁਝ ਪਲ ਉਡੀਕ ਕਰੋ",
        "how5": "ਜਿਸ ਕੁਆਲਟੀ ਨੂੰ ਤੁਸੀਂ ਡਾ toਨਲੋਡ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਉਸ ਤੇ ਕਲਿਕ ਕਰੋ",
        "how6": "ਨਵੀਂ ਟੈਬ ਤੇ, ਫਾਈਲ ਆਪਣੇ ਆਪ ਡਾਉਨਲੋਡ ਕੀਤੀ ਜਾਏਗੀ ਅਤੇ ਫਿਰ ਤੁਹਾਡੀ ਡਿਵਾਈਸ ਤੇ ਸੁਰੱਖਿਅਤ ਕੀਤੀ ਜਾਏਗੀ",
        "close": "ਬੰਦ ਕਰੋ",
        "settings": "ਉਪਭੋਗਤਾ ਸੈਟਿੰਗਾਂ",
        "oneclick": "ਸਿਰਫ 1 ਕਲਿਕ ਨਾਲ ਵੀਡੀਓ ਡਾਉਨਲੋਡ ਕਰੋ",
        "yes": "ਹਾਂ",
        "no": "ਨਹੀਂ",
        "autoselect": "ਆਪਣੇ ਆਪ ਕੁਆਲਟੀ ਦੀ ਚੋਣ ਕਰੋ",
        "max": "ਅਧਿਕਤਮ",
        "apply": "ਲਾਗੂ ਕਰੋ",
        "changelanguage": "ਭਾਸ਼ਾ ਬਦਲੋ",
        "download": "ਡਾ .ਨਲੋਡ",
        "loading": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ",
        "pin": "ਸਹੂਲਤ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ਇਸ ਐਪ ਨੂੰ ਪਿੰਨ ਕਰੋ.",
        "expire": "ਡਾਉਨਲੋਡ ਲਿੰਕ ਦੀ ਮਿਆਦ ਖਤਮ ਹੋ ਸਕਦੀ ਹੈ. ਤੁਹਾਨੂੰ ਸਿਰਲੇਖ ਤੇ ਕਲਿਕ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ ਫਿਰ ਇੱਕ ਨਵਾਂ ਡਾਉਨਲੋਡ ਲਿੰਕ ਪ੍ਰਾਪਤ ਕਰੋ.",
        "clickhere": "ਇੱਥੇ ਕਲਿੱਕ ਕਰੋ",
        "autorun": "ਇਸ ਐਪਲੀਕੇਸ਼ਨ ਨੂੰ ਆਟੋਮੈਟਿਕ ਐਕਟੀਵੇਟ ਕਰੋ."
    },
    "pl": {
        "extName": "Niesamowity Vimeo Downloader",
        "extDescription": "Pobierz filmy z vimeo.com (pobierz filmy w jakości 4K)",
        "only": "To rozszerzenie działa tylko na Vimeo",
        "open": "Otwórz Vimeo",
        "how1": "Otwórz witrynę Vimeo",
        "how2": "Odtwórz wideo na Vimeo.",
        "permissions": "Zmieniłeś uprawnienia tej aplikacji. Aby oprogramowanie działało poprawnie, musisz kliknąć przycisk poniżej, aby przywrócić uprawnienia do aplikacji.",
        "select": "Wybierz",
        "rightclick": "Kliknij prawym przyciskiem myszy",
        "allow": "zezwala na uprawnienia",
        "howtouse": "Jak używać",
        "by": "Obsługiwane przez",
        "search": "Szukaj",
        "helperintro": "Z łatwością pobieraj wideo i audio z dowolnej strony internetowej.",
        "install": "ZAINSTALUJ TERAZ",
        "feedback": "Informacje zwrotne",
        "how3": "Otwórz to rozszerzenie",
        "how4": "Poczekaj chwilę",
        "how5": "Kliknij jakość, którą chcesz pobrać",
        "how6": "Na nowej karcie plik zostanie automatycznie pobrany, a następnie zapisany na urządzeniu",
        "close": "Blisko",
        "settings": "Ustawienia użytkownika",
        "oneclick": "Pobierz filmy za pomocą jednego kliknięcia",
        "yes": "tak",
        "no": "Nie",
        "autoselect": "Automatycznie wybierz jakość",
        "max": "Max",
        "apply": "Zastosować",
        "changelanguage": "Zmień język",
        "download": "Pobieranie",
        "loading": "Ładowanie",
        "pin": "Dla wygody przypnij tę aplikację.",
        "expire": "Link do pobrania może wygasnąć. Kliknij tytuł, a następnie pobierz nowy link do pobrania.",
        "clickhere": "Kliknij tutaj",
        "autorun": "Automatycznie aktywuj tę aplikację."
    },
    "ps": {
        "extName": "ډیر ښه Vimeo ډاونلوډر",
        "extDescription": "له vimeo.com څخه ویډیوګانې ډاونلوډ کړئ (د 4K کیفیت لرونکي ویډیو ډاونلوډ کړئ)",
        "only": "دا توسیع یوازې په Vimeo کې پرمخ ځي",
        "open": "Vimeo خلاص کړئ",
        "how1": "د Vimeo ویب پاڼه پرانیزئ",
        "how2": "په Vimeo کې ویډیو پلی کړئ.",
        "permissions": "تاسو د دې ایپ اجازې بدل کړې دي. د سافټویر په سمه توګه کار کولو لپاره ، تاسو اړتیا لرئ غوښتنلیک ته د اجازې بیرته ورکولو لپاره لاندې ت buttonۍ کلیک وکړئ.",
        "select": "وټاکئ",
        "rightclick": "ښي ټک",
        "allow": "اجازه اجازه ورکوي",
        "howtouse": "څنګه یی استعمال کړو",
        "by": "د",
        "search": "لټون",
        "helperintro": "په اسانۍ سره له هرې ویب پا fromې څخه ویډیو او آډیو ډاونلوډ کړئ.",
        "install": "همدا اوس ولګوه",
        "feedback": "فیډبیک",
        "how3": "دا غزونه پرانیزه",
        "how4": "یو څو شېبې انتظار وکړئ",
        "how5": "په هغه کیفیت کلیک وکړئ چې غواړئ ډاونلوډ یې کړئ",
        "how6": "په نوي ټب کې ، فایل به په اوتومات ډول ډاونلوډ او بیا ستاسو وسیله ته خوندي کړي",
        "close": "بندول",
        "settings": "د کارن امستنې",
        "oneclick": "یوازې 1 کلیک سره ویډیوګانې ډاونلوډ کړئ",
        "yes": "هو",
        "no": "نه",
        "autoselect": "په اوتومات ډول کیفیت غوره کړئ",
        "max": "اعظمي",
        "apply": "غوښتنه وکړئ",
        "changelanguage": "ژبه بدل کړئ",
        "download": "ډاونلوډ",
        "loading": "بارول",
        "pin": "د اسانتیا لپاره ، مهرباني وکړئ دا اپلیټ پین کړئ.",
        "expire": "د ډاونلوډ لینک ممکن پای ته ورسي. تاسو باید په سرلیک کلیک وکړئ بیا د نوي ډاونلوډ لینک ونیسئ.",
        "clickhere": "دلته زور ورکړی",
        "autorun": "دا غوښتنلیک په اتومات ډول فعال کړئ."
    },
    "pt": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Baixe vídeos do vimeo.com (baixe vídeos com qualidade 4K)",
        "only": "Esta extensão só funciona no Vimeo",
        "open": "Abra o Vimeo",
        "how1": "Abra o site do Vimeo",
        "how2": "Reproduza um vídeo no Vimeo.",
        "permissions": "Você alterou as permissões deste aplicativo. Para que o software funcione corretamente, você precisa clicar no botão abaixo para restaurar as permissões para o aplicativo.",
        "select": "Selecione",
        "rightclick": "Clique com o botão direito",
        "allow": "permite permissões",
        "howtouse": "Como usar",
        "by": "Distribuído por",
        "search": "Procurar",
        "helperintro": "Baixe facilmente vídeo e áudio de qualquer site.",
        "install": "INSTALE AGORA",
        "feedback": "Comentários",
        "how3": "Abra esta extensão",
        "how4": "Aguarde alguns instantes",
        "how5": "Clique na qualidade que você deseja baixar",
        "how6": "Na nova guia, o arquivo será baixado automaticamente e salvo no seu dispositivo",
        "close": "Fechar",
        "settings": "Configurações do Usuário",
        "oneclick": "Baixe vídeos com apenas um clique",
        "yes": "sim",
        "no": "Não",
        "autoselect": "Selecionar automaticamente a qualidade",
        "max": "Máx.",
        "apply": "Aplique",
        "changelanguage": "Mudar idioma",
        "download": "Baixar",
        "loading": "Carregando",
        "pin": "Por conveniência, fixe este aplicativo.",
        "expire": "O link para download pode expirar. Você deve clicar no título e pegar um novo link para download.",
        "clickhere": "Clique aqui",
        "autorun": "Ative automaticamente este aplicativo."
    },
    "ro": {
        "extName": "Minunat Vimeo Downloader",
        "extDescription": "Descărcați videoclipuri de pe vimeo.com (descărcați videoclipuri de calitate 4K)",
        "only": "Această extensie rulează numai pe Vimeo",
        "open": "Deschide Vimeo",
        "how1": "Deschide site-ul web Vimeo",
        "how2": "Redați un videoclip pe Vimeo.",
        "permissions": "Ați modificat permisiunile acestei aplicații. Pentru ca software-ul să funcționeze corect, trebuie să faceți clic pe butonul de mai jos pentru a restabili permisiunile aplicației.",
        "select": "Selectați",
        "rightclick": "Click dreapta",
        "allow": "permite permisiuni",
        "howtouse": "Cum se folosește",
        "by": "Cu sprijinul",
        "search": "Căutare",
        "helperintro": "Descărcați cu ușurință video și audio de pe orice site web.",
        "install": "INSTALEAZA ACUM",
        "feedback": "Părere",
        "how3": "Deschideți această extensie",
        "how4": "Așteptați câteva momente",
        "how5": "Faceți clic pe calitatea pe care doriți să o descărcați",
        "how6": "În noua filă, fișierul se va descărca automat și apoi va fi salvat pe dispozitiv",
        "close": "Închide",
        "settings": "Setarile utilizatorului",
        "oneclick": "Descărcați videoclipuri cu doar 1 clic",
        "yes": "da",
        "no": "Nu",
        "autoselect": "Selectați automat calitatea",
        "max": "Max",
        "apply": "aplica",
        "changelanguage": "Schimbă limba",
        "download": "Descarca",
        "loading": "Se încarcă",
        "pin": "Pentru comoditate, vă rugăm să fixați această aplicație.",
        "expire": "Link-ul de descărcare poate expira. Ar trebui să faceți clic pe titlu, apoi să apucați un nou link de descărcare.",
        "clickhere": "Click aici",
        "autorun": "Activați automat această aplicație."
    },
    "ru": {
        "extName": "Удивительный Vimeo Downloader",
        "extDescription": "Скачать видео с vimeo.com (скачать видео 4K качества)",
        "only": "Это расширение работает только на Vimeo.",
        "open": "Открыть Вимео",
        "how1": "Откройте сайт Vimeo",
        "how2": "Воспроизведите видео на Vimeo.",
        "permissions": "Вы изменили разрешения этого приложения. Чтобы программное обеспечение работало правильно, вам нужно нажать кнопку ниже, чтобы восстановить разрешения для приложения.",
        "select": "Выбрать",
        "rightclick": "Щелкните правой кнопкой мыши",
        "allow": "разрешает разрешения",
        "howtouse": "Как пользоваться",
        "by": "Питаться от",
        "search": "Поиск",
        "helperintro": "Легко скачивайте видео и аудио с любого сайта.",
        "install": "УСТАНОВИТЬ СЕЙЧАС",
        "feedback": "Обратная связь",
        "how3": "Откройте это расширение",
        "how4": "Подожди несколько минут",
        "how5": "Нажмите на качество, которое вы хотите скачать",
        "how6": "На новой вкладке файл будет автоматически загружен, а затем сохранен на ваше устройство.",
        "close": "близко",
        "settings": "Пользовательские настройки",
        "oneclick": "Скачать видео всего одним кликом",
        "yes": "да",
        "no": "нет",
        "autoselect": "Автоматически выбирать качество",
        "max": "Максимум",
        "apply": "Применять",
        "changelanguage": "изменение языка",
        "download": "Скачать",
        "loading": "Загрузка",
        "pin": "Для удобства закрепите это приложение.",
        "expire": "Ссылка для скачивания может истечь. Вы должны нажать на название, а затем получить новую ссылку для скачивания.",
        "clickhere": "кликните сюда",
        "autorun": "Активируйте это приложение автоматически."
    },
    "sd": {
        "extName": "بهترين Vimeo Downloader",
        "extDescription": "ويڊيو تان وڊيوز ڊائون لوڊ ڪريو (4K قابليت وڊيوز)",
        "only": "هي واڌارو صرف Vimeo تي هلندو آهي",
        "open": "Vimeo کوليو",
        "how1": "Vimeo ويب سائيٽ کوليو",
        "how2": "Vimeo تي هڪ وڊيو کيڏيو.",
        "permissions": "توھان ھن ائپ جي اجازتن کي تبديل ڪري ڇڏيو آھي. صحيح طريقي سان ڪم ڪرڻ لاءِ سافٽويئر ، توهان کي ايپ تي اجازت بحال ڪرڻ لاءِ هيٺ ڏنل بٽڻ کي دٻائڻ جي ضرورت آهي.",
        "select": "چونڊيو",
        "rightclick": "صحيح ڪلڪ ڪريو",
        "allow": "اجازتن جي اجازت ڏئي ٿو",
        "howtouse": "ڪيئن استعمال ڪجي",
        "by": "وي طرفان",
        "search": "ڳولھيو",
        "helperintro": "آسانی سان ڪنهن به ويب سائيٽ کان وڊيو ۽ آڊيو ڊائونلوڊ ڪريو.",
        "install": "NOW INSTALL",
        "feedback": "راء",
        "how3": "هي واڌارو کوليو",
        "how4": "ڪجهه لمحات رکو",
        "how5": "جيڪي معيار تي توهان کي ڊائونلوڊ ڪرڻ چاهيو ٿا ڪلڪ ڪريو",
        "how6": "نئين ٽئب تي، فائيل خودڪار طريقي سان ڊائون لوڊ ڪندي ۽ پوء توهان جي ڊوائيس تائين محفوظ ڪندو",
        "close": "بند ڪريو",
        "settings": "استعمال ڪندڙ جي سيٽنگ",
        "oneclick": "صرف 1 ڪلڪ سان وڊيوز ڊائونلوڊ ڪريو",
        "yes": "ها",
        "no": "نه",
        "autoselect": "خودڪار چونڊيو معيار کي",
        "max": "وڌو",
        "apply": "درخواست ڏيو",
        "changelanguage": "ٻولي تبديل ڪريو",
        "download": "ڊائون لوڊ ڪريو",
        "loading": "لوڊ ڪري رهيو آهي",
        "pin": "سهولت جي لاءِ ، مهرباني ڪري هن ايپ کي پن ڪريو.",
        "expire": "ڊائون لوڊ ڪٽجي سگھي ٿو. توھان کي ڪلڪ ڪري عنوان تي ڪلڪ ڪريو وري نئين ڊائون لوڊ ڪڙي وٺو.",
        "clickhere": "هتي ڪلڪ ڪريو",
        "autorun": "انهي ايپليڪيشن کي پاڻمرادو چالو ڪيو وڃي."
    },
    "si": {
        "extName": "නියමයි Vimeo Downloader",
        "extDescription": "Vimeo.com වෙතින් වීඩියෝ බාගන්න (4K ගුණාත්මක වීඩියෝ බාගන්න)",
        "only": "මෙම දිගුව Vimeo මත පමණක් ධාවනය වේ",
        "open": "Vimeo විවෘත කරන්න",
        "how1": "Vimeo වෙබ් අඩවිය විවෘත කරන්න",
        "how2": "Vimeo හි වීඩියෝවක් වාදනය කරන්න.",
        "permissions": "ඔබ මෙම යෙදුමේ අවසරයන් වෙනස් කර ඇත. මෘදුකාංගය නිසියාකාරව ක්‍රියාත්මක වීමට නම්, යෙදුමට අවසර ප්‍රතිෂ් restore ාපනය කිරීම සඳහා පහත බොත්තම ක්ලික් කළ යුතුය.",
        "select": "තෝරන්න",
        "rightclick": "දකුණු ක්ලික් කරන්න",
        "allow": "අවසර ලබා දේ",
        "howtouse": "භාවිතා කරන්නේ කෙසේද",
        "by": "බල ගැන්වුයේ",
        "search": "සෙවීම",
        "helperintro": "ඕනෑම වෙබ් අඩවියකින් වීඩියෝ සහ ශ්රව්ය උපකරණ පහසුවෙන් බාගත කරන්න.",
        "install": "දැන් ස්ථාපනය කරන්න",
        "feedback": "ප්‍රතිපෝෂණය",
        "how3": "මෙම දිගුව විවෘත කරන්න",
        "how4": "මොහොතක් ඉන්න",
        "how5": "ඔබට බාගත කිරීමට අවශ්‍ය ගුණාත්මකභාවය මත ක්ලික් කරන්න",
        "how6": "නව පටිත්තෙහි, ගොනුව ස්වයංක්‍රීයව බාගත කර ඔබගේ උපාංගයට සුරකිනු ඇත",
        "close": "වසන්න",
        "settings": "පරිශීලක සැකසුම්",
        "oneclick": "1 ක්ලික් කිරීමකින් වීඩියෝ බාගන්න",
        "yes": "ඔව්",
        "no": "නැත",
        "autoselect": "ගුණාත්මකභාවය ස්වයංක්‍රීයව තෝරන්න",
        "max": "උපරිම",
        "apply": "අයදුම් කරන්න",
        "changelanguage": "භාෂාව වෙනස් කරන්න",
        "download": "බාගත",
        "loading": "පූරණය වෙමින් පවතී",
        "pin": "පහසුව සඳහා, කරුණාකර මෙම යෙදුම පින් කරන්න.",
        "expire": "බාගත කිරීමේ සබැඳිය කල් ඉකුත් විය හැක. ඔබ මාතෘකාව මත ක්ලික් කර නව බාගත කිරීමේ සබැඳියක් ලබා ගත යුතුය.",
        "clickhere": "මෙහි ක්ලික් කරන්න",
        "autorun": "මෙම යෙදුම ස්වයංක්‍රීයව ක්‍රියාත්මක කරන්න."
    },
    "sk": {
        "extName": "Úžasné Vimeo Downloader",
        "extDescription": "Stiahnite si videá z vimeo.com (stiahnite si videá v kvalite 4K)",
        "only": "Toto rozšírenie beží iba na Vimeo",
        "open": "Otvorte Vimeo",
        "how1": "Otvorte webovú stránku Vimeo",
        "how2": "Prehrajte si video na Vimeo.",
        "permissions": "Zmenili ste povolenia tejto aplikácie. Aby softvér správne fungoval, musíte kliknutím na tlačidlo nižšie obnoviť povolenia pre aplikáciu.",
        "select": "Vyberte",
        "rightclick": "Kliknite pravým tlačidlom myši",
        "allow": "povoľuje povolenia",
        "howtouse": "Ako použiť",
        "by": "Poháňaný",
        "search": "Vyhľadávanie",
        "helperintro": "Ľahko sťahujte video a audio z ľubovoľnej webovej stránky.",
        "install": "NAINŠTALOVAŤ TERAZ",
        "feedback": "spätná väzba",
        "how3": "Otvorte toto rozšírenie",
        "how4": "Počkajte chvíľu",
        "how5": "Kliknite na kvalitu, ktorú chcete stiahnuť",
        "how6": "Na novej karte sa súbor automaticky stiahne a potom uloží do vášho zariadenia",
        "close": "Zavrieť",
        "settings": "Používateľské nastavenia",
        "oneclick": "Sťahujte videá jediným kliknutím",
        "yes": "Áno",
        "no": "žiadny",
        "autoselect": "Automaticky vyberať kvalitu",
        "max": "Max",
        "apply": "platiť",
        "changelanguage": "Zmeniť jazyk",
        "download": "Stiahnuť ▼",
        "loading": "Načítava",
        "pin": "Pre pohodlie si túto aplikáciu pripnite.",
        "expire": "Môže uplynúť platnosť odkazu na stiahnutie. Mali by ste kliknúť na názov a potom získať nový odkaz na stiahnutie.",
        "clickhere": "Kliknite tu",
        "autorun": "Automaticky aktivovať túto aplikáciu."
    },
    "sl": {
        "extName": "Osupljiv Vimeo Downloader",
        "extDescription": "Prenesite videoposnetke z vimeo.com (prenesite videoposnetke 4K kakovosti)",
        "only": "Ta razširitev deluje samo na Vimeu",
        "open": "Odprite Vimeo",
        "how1": "Odprite spletno mesto Vimeo",
        "how2": "Predvajaj video na Vimeo.",
        "permissions": "Spremenili ste dovoljenja za to aplikacijo. Da bo programska oprema delovala pravilno, kliknite spodnji gumb, da obnovite dovoljenja za aplikacijo.",
        "select": "Izberite",
        "rightclick": "Desni klik",
        "allow": "dovoljuje dovoljenja",
        "howtouse": "Kako uporabiti",
        "by": "Poganja ga",
        "search": "Iskanje",
        "helperintro": "Preprosto prenesite video in avdio s katerega koli spletnega mesta.",
        "install": "NAMESTITI ZDAJ",
        "feedback": "Povratne informacije",
        "how3": "Odprite to razširitev",
        "how4": "Počakajte nekaj trenutkov",
        "how5": "Kliknite kakovost, ki jo želite prenesti",
        "how6": "Na novem zavihku se bo datoteka samodejno prenesla in shranila v vašo napravo",
        "close": "Zapri",
        "settings": "Uporabniške nastavitve",
        "oneclick": "Prenesite videoposnetke s samo enim klikom",
        "yes": "Da",
        "no": "Ne",
        "autoselect": "Samodejno izberite kakovost",
        "max": "Najv",
        "apply": "Prijavite se",
        "changelanguage": "Spremeni jezik",
        "download": "Prenesi",
        "loading": "nalaganje",
        "pin": "Za udobje pripnite to aplikacijo.",
        "expire": "Povezava za prenos lahko poteče. Kliknite naslov in nato zgrabite novo povezavo za prenos.",
        "clickhere": "Klikni tukaj",
        "autorun": "Samodejno aktiviraj to aplikacijo."
    },
    "sm": {
        "extName": "Downloader Vimeo mataʻutia",
        "extDescription": "Sii maia vitio mai vimeo.com (download 4K vitio lelei)",
        "only": "O lenei faʻaopoopoga e naʻo le Vimeo",
        "open": "Tatala Vimeo",
        "how1": "Tatala le upega tafaʻilagi Vimeo",
        "how2": "Ta'alo se vitio i luga o Vimeo.",
        "permissions": "Ua e suia faʻatagaina o lenei polokalama. Mo le polokalama e galue lelei, oe manaʻomia le kiliki le faamau i lalo e toefuatai faʻatagaga i le polokalama.",
        "select": "Filifili",
        "rightclick": "Kiliki taumatau",
        "allow": "faʻatagaina faʻatagaina",
        "howtouse": "Auala e faʻaoga ai",
        "by": "Faʻaaoga e",
        "search": "Suʻe",
        "helperintro": "Faigofie ona sii mai vitio ma faalogologo mai so o se website.",
        "install": "faatuina TAIMI NEI",
        "feedback": "Manatu faaalia",
        "how3": "Tatala lenei faʻaopoopoga",
        "how4": "Faatali sina taimi",
        "how5": "Kiliki i le maualuga e te manaʻo e sii mai",
        "how6": "I luga o le lisi fou, o le a otometi ona download ma faila le faila i lau masini",
        "close": "Katia",
        "settings": "Faʻamaumauga a tagata",
        "oneclick": "Faʻasaʻo vitio ma na o le 1 le kiliki",
        "yes": "ioe",
        "no": "leai",
        "autoselect": "Filifili saʻo le lelei",
        "max": "Max",
        "apply": "Faaaoga",
        "changelanguage": "Sui gagana",
        "download": "Lalotoso",
        "loading": "Utaina",
        "pin": "Mo faigofie, faʻamolemole pin lenei polokalama.",
        "expire": "E mafai ona muta le sootaga. E tatau ona e kiliki i luga o le ulutala ona uu lea o se sootaga fou download.",
        "clickhere": "Kiliki ii",
        "autorun": "Otometi faʻagaoioia lenei tusi talosaga."
    },
    "sn": {
        "extName": "Zvinotyisa Vimeo Downloader",
        "extDescription": "Download mavhidhiyo kubva vimeo.com (download 4K mhando mavhidhiyo)",
        "only": "Iyi yekuwedzera inongoshanda paVimeo",
        "open": "Vhura Vimeo",
        "how1": "Vhura iyo Vimeo webhusaiti",
        "how2": "Tamba vhidhiyo paVimeo.",
        "permissions": "Washandura mvumo yeapp iyi. Kuti software ishande nemazvo, unofanirwa kubaya bhatani pazasi kuti udzore mvumo kuapp.",
        "select": "Sarudza",
        "rightclick": "Dzvanya kurudyi",
        "allow": "inobvumira mvumo",
        "howtouse": "Kushandisa sei",
        "by": "Powered by",
        "search": "Tsvaga",
        "helperintro": "Rodha nyore vhidhiyo uye odhiyo kubva chero webhusaiti.",
        "install": "PINDA IZVOZVO",
        "feedback": "Mhinduro",
        "how3": "Vhura kuwedzera ichi",
        "how4": "Mirira nguva shoma",
        "how5": "Dzvanya pane zvemhando yaunoda kurodha",
        "how6": "Pane iyo tabhu nyowani, iyo faira ichaerekana yodha uye wozoisa kune yako kifaa",
        "close": "Pedyo",
        "settings": "Zvirongwa zvevashandisi",
        "oneclick": "Dhawunirodha mavhidhiyo nekungobaya chete 1",
        "yes": "Hongu",
        "no": "Aihwa",
        "autoselect": "Sarudza otomatiki mhando",
        "max": "Max",
        "apply": "Nyorera",
        "changelanguage": "Chinja mutauro",
        "download": "Download",
        "loading": "Loading",
        "pin": "Kuti zvive nyore, ndokumbira ubaye iyi app.",
        "expire": "Dhawunirodha reki rinogona kupera. Iwe unofanirwa kudzvanya pamusoro wenyaya wobva wabata iyo yekutsvaira download link.",
        "clickhere": "Dzvanya apa",
        "autorun": "Gonesa chishandiso ichi."
    },
    "so": {
        "extName": "Cajiib Vimeo Downloader",
        "extDescription": "Ka soo degso fiidiyowyada vimeo.com (kala soo bixi fiidiyowyo tayo leh 4K)",
        "only": "Kordhintani waxay ku socotaa oo keliya Vimeo",
        "open": "Fur Vimeo",
        "how1": "Fur shabakada Vimeo",
        "how2": "Ku daar muuqaal Vimeo",
        "permissions": "Waxaad badashay rukhsadaha barnaamijkan. Si softwareku uu si sax ah ugu shaqeeyo, waxaad u baahan tahay inaad gujiso badhanka hoose si aad u soo celiso rukhsadaha barnaamijka.",
        "select": "Xullo",
        "rightclick": "Midig guji",
        "allow": "ogolaanaya rukhsadaha",
        "howtouse": "Sida loo isticmaalo",
        "by": "Awooda",
        "search": "Raadin",
        "helperintro": "Si fudud uga soo dejiso fiidiyow iyo maqal degel kasta.",
        "install": "HALKAN KA DHAGEYSO",
        "feedback": "Jawaab celin",
        "how3": "Fur dheereytan",
        "how4": "Sug xoogaa daqiiqado ah",
        "how5": "Guji tayada aad rabto inaad soo dejiso",
        "how6": "Dhinaca cusub, feylku si otomaatig ah ayuu u soo dejisan doonaa ka dibna u keydin doonaa qalabkaaga",
        "close": "Xidh",
        "settings": "Dejinta isticmaalaha",
        "oneclick": "Ku soo dejiso fiidiyowyo hal guji",
        "yes": "Haa",
        "no": "Maya",
        "autoselect": "Si otomaatig ah u dooro tayada",
        "max": "Max",
        "apply": "Codso",
        "changelanguage": "Luqadda beddelo",
        "download": "Soo Degso",
        "loading": "Raadinta",
        "pin": "Si laguugu sahlo, fadlan ku dheji barnaamijkan.",
        "expire": "Xiriirka soo degsiga ayaa dhici kara. Waa inaad gujisaa cinwaanka kadibna qabataa xiriiriye cusub oo soo degso ah.",
        "clickhere": "Halkan guji",
        "autorun": "Si otomatig ah u hawlgeli codsigan."
    },
    "sq": {
        "extName": "Shkarkues Awesome Vimeo",
        "extDescription": "Shkarkoni video nga vimeo.com (shkarkoni video me cilësi 4K)",
        "only": "Kjo shtesë funksionon vetëm në Vimeo",
        "open": "Hapni Vimeo",
        "how1": "Hapni faqen e internetit të Vimeo",
        "how2": "Luaj një video në Vimeo.",
        "permissions": "Ju keni ndryshuar lejet e këtij aplikacioni. Që programi të funksionojë si duhet, duhet të klikoni në butonin më poshtë për të rivendosur lejet në aplikacion.",
        "select": "Zgjidhni",
        "rightclick": "Kliko me të djathtën",
        "allow": "lejon lejet",
        "howtouse": "Si të përdorim",
        "by": "Mundësuar nga",
        "search": "kërkim",
        "helperintro": "Shkarkoni lehtësisht video dhe audio nga çdo faqe në internet.",
        "install": "INSTALOJE TANI",
        "feedback": "reagim",
        "how3": "Hapeni këtë shtesë",
        "how4": "Prisni disa momente",
        "how5": "Klikoni në cilësinë që dëshironi të shkarkoni",
        "how6": "Në skedën e re, skedari automatikisht do të shkarkohet dhe pastaj do të ruhet në pajisjen tuaj",
        "close": "afër",
        "settings": "Cilësimet e përdoruesit",
        "oneclick": "Shkarkoni video me vetëm 1 klik",
        "yes": "po",
        "no": "jo",
        "autoselect": "Zgjidhni automatikisht cilësinë",
        "max": "Max",
        "apply": "aplikoni",
        "changelanguage": "Ndryshoni gjuhën",
        "download": "Shkarko",
        "loading": "Po ngarkohet",
        "pin": "Për lehtësi, ju lutemi vendosni këtë aplikacion.",
        "expire": "Lidhja e shkarkimit mund të skadojë. Ju duhet të klikoni në titull, pastaj të kapni një lidhje të re për shkarkim.",
        "clickhere": "Kliko këtu",
        "autorun": "Aktivizoni automatikisht këtë aplikacion."
    },
    "sr": {
        "extName": "Страшан Вимео Довнлоадер",
        "extDescription": "Преузмите видео записе са вимео.цом (преузмите видео записе 4К квалитета)",
        "only": "Ово проширење ради само на Вимеу",
        "open": "Отворите Вимео",
        "how1": "Отворите веб локацију Вимео",
        "how2": "Пустите видео на Вимео.",
        "permissions": "Променили сте дозволе за ову апликацију. Да би софтвер исправно радио, потребно је да кликнете на доње дугме да бисте вратили дозволе за апликацију.",
        "select": "Изаберите",
        "rightclick": "Десни клик",
        "allow": "дозвољава дозволе",
        "howtouse": "Како се користи",
        "by": "Покреће га",
        "search": "Претрага",
        "helperintro": "Једноставно преузмите видео и аудио са било које веб локације.",
        "install": "ИНСТАЛИ САДА",
        "feedback": "Повратна информација",
        "how3": "Отворите ово проширење",
        "how4": "Сачекајте неколико тренутака",
        "how5": "Кликните на квалитет који желите да преузмете",
        "how6": "На новој картици ће се датотека аутоматски преузети и затим сачувати у ваш уређај",
        "close": "Близу",
        "settings": "Подешавања корисника",
        "oneclick": "Преузмите видео записе са само једним кликом",
        "yes": "да",
        "no": "Не",
        "autoselect": "Квалитет аутоматски одаберите",
        "max": "Макс",
        "apply": "Применити",
        "changelanguage": "Промените језик",
        "download": "Преузимање",
        "loading": "Лоадинг",
        "pin": "Ради удобности, закачите ову апликацију.",
        "expire": "Веза за преузимање може истећи. Требали бисте кликнути на наслов, а затим преузети нову везу за преузимање.",
        "clickhere": "Кликните овде",
        "autorun": "Аутоматски активирајте ову апликацију."
    },
    "st": {
        "extName": "Ketsahalo e Ntle ea Vimeo",
        "extDescription": "Khoasolla livideo ho tsoa vimeo.com (jarolla livideo tsa boleng ba 4K)",
        "only": "Katoloso ena e sebetsa feela ho Vimeo",
        "open": "Bula Vimeo",
        "how1": "Bula webosaete ea Vimeo",
        "how2": "Bapala video ho Vimeo.",
        "permissions": "O fetotse tumello ea sesebelisoa sena. Hore software e sebetse hantle, o lokela ho tobetsa konopo e ka tlase ho khutlisa litumello ho sesebelisoa.",
        "select": "Kgetha",
        "rightclick": "Tlanya ka ho le letona",
        "allow": "e lumella litumello",
        "howtouse": "Mokhoa oa ho sebelisa",
        "by": "E tsamaisoa ke",
        "search": "Batla",
        "helperintro": "Jarolla video le audio habonolo ho tsoa webosaeteng leha e le efe.",
        "install": "TS'ELISO MOSA",
        "feedback": "Tlhahiso",
        "how3": "Bula katoloso ena",
        "how4": "Emang nakoana",
        "how5": "Tobetsa ho boleng boo u batlang ho bo jarolla",
        "how6": "Ho tabo e ncha, file e tla jarolla ka boeona ebe e boloka ho sesebelisoa sa hau",
        "close": "Haufi",
        "settings": "Litlhophiso tsa mosebelisi",
        "oneclick": "Theolisa livideo ka ho penya tse 1 feela",
        "yes": "Ho joalo",
        "no": "Che",
        "autoselect": "Khetha boleng ka bohona",
        "max": "Max",
        "apply": "Etsa kopo",
        "changelanguage": "Fetola puo",
        "download": "Khoasolla",
        "loading": "Loading",
        "pin": "Molemong oa boiketlo, ka kopo tlanya sesebelisoa sena",
        "expire": "Khoebo ea download e ka felloa ke nako. U lokela ho tobetsa ka sehlooho ebe u nka khokahano e ncha ea download.",
        "clickhere": "tlanya mona",
        "autorun": "Kenya ts'ebetsong sesebelisoa ka kotloloho."
    },
    "su": {
        "extName": "Heboh Vimeo Downloader",
        "extDescription": "Unduh pidéo tina vimeo.com (unduh pidéo kualitas 4K)",
        "only": "Ekstensi ieu ngan ukur dijalankeun dina Vimeo",
        "open": "Buka Vimeo",
        "how1": "Buka situs wéb Vimeo",
        "how2": "Puter pidéo dina Vimeo.",
        "permissions": "Anjeun parantos ngarobih idin tina aplikasi ieu. Agar parangkat lunak tiasa leres, anjeun kedah mencét tombol di handap pikeun mulangkeun idin kana aplikasi.",
        "select": "Pilih",
        "rightclick": "Pencét katuhu",
        "allow": "ngamungkinkeun idin",
        "howtouse": "Kumaha carana nganggo",
        "by": "Ditanagaan ku",
        "search": "Milarian",
        "helperintro": "Gampang ngundeur pidio sareng audio tina situs wéb.",
        "install": "INSTAL AYEUNA",
        "feedback": "Eupan balik",
        "how3": "Buka ekstensi ieu",
        "how4": "Antosan sababaraha waktos",
        "how5": "Klik dina kualitas anu anjeun hoyong unduh",
        "how6": "Dina tab anyar, file bakal otomatis diunduh teras disimpen kana alat anjeun",
        "close": "Tutupkeun",
        "settings": "Setélan pangguna",
        "oneclick": "Unduh pidéo nganggo ngan 1 klik",
        "yes": "Leres",
        "no": "Henteu",
        "autoselect": "Milih kualitas sacara otomatis",
        "max": "Max",
        "apply": "Panawaran",
        "changelanguage": "Ngarobih bahasa",
        "download": "Unduh",
        "loading": "Ngamuat",
        "pin": "Pikeun genah, punten pin aplikasi ieu.",
        "expire": "Tautan unduh tiasa tamat. Anjeun kedah klik judulna teras cokot tautan undeuran anu énggal.",
        "clickhere": "klik di dieu",
        "autorun": "Otomatis aktipkeun aplikasi ieu."
    },
    "sv": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Ladda ner videor från vimeo.com (ladda ner 4K-videokvalitet)",
        "only": "Detta tillägg körs endast på Vimeo",
        "open": "Öppna Vimeo",
        "how1": "Öppna Vimeos webbplats",
        "how2": "Spela upp en video på Vimeo.",
        "permissions": "Du har ändrat behörigheterna för den här appen. För att programvaran ska fungera korrekt måste du klicka på knappen nedan för att återställa behörigheter till appen.",
        "select": "Välj",
        "rightclick": "Högerklicka",
        "allow": "tillåter behörigheter",
        "howtouse": "Hur man använder",
        "by": "Drivs av",
        "search": "Sök",
        "helperintro": "Ladda ner video och ljud enkelt från vilken webbplats som helst.",
        "install": "INSTALLERA NU",
        "feedback": "Återkoppling",
        "how3": "Öppna detta tillägg",
        "how4": "Vänta några ögonblick",
        "how5": "Klicka på den kvalitet du vill ladda ner",
        "how6": "På den nya fliken hämtar filen automatiskt och sparas sedan på din enhet",
        "close": "Stänga",
        "settings": "Användarinställningar",
        "oneclick": "Ladda ner videor med bara ett klick",
        "yes": "Ja",
        "no": "Nej",
        "autoselect": "Välj kvalitet automatiskt",
        "max": "Max",
        "apply": "Tillämpa",
        "changelanguage": "Ändra språk",
        "download": "Ladda ner",
        "loading": "Läser in",
        "pin": "För enkelhets skull, vänligen fäst den här appen.",
        "expire": "Nedladdningslänken kan löpa ut. Du bör klicka på titeln och sedan ta en ny nedladdningslänk.",
        "clickhere": "Klicka här",
        "autorun": "Aktivera den här applikationen automatiskt."
    },
    "sw": {
        "extName": "Ajabu ya kupakua Vimeo",
        "extDescription": "Pakua video kutoka vimeo.com (pakua video za ubora wa 4K)",
        "only": "Kiendelezi hiki kinatumia Vimeo pekee",
        "open": "Fungua Vimeo",
        "how1": "Fungua tovuti ya Vimeo",
        "how2": "Cheza video kwenye Vimeo.",
        "permissions": "Umebadilisha ruhusa za programu hii. Ili programu ifanye kazi vizuri, unahitaji kubofya kitufe hapa chini ili urejeshe ruhusa kwa programu.",
        "select": "Chagua",
        "rightclick": "Bonyeza kulia",
        "allow": "inaruhusu ruhusa",
        "howtouse": "Jinsi ya kutumia",
        "by": "Kinatumia",
        "search": "Tafuta",
        "helperintro": "Pakua kwa urahisi video na sauti kutoka kwa wavuti yoyote.",
        "install": "Ingiza sasa",
        "feedback": "Majibu",
        "how3": "Fungua kiendelezi hiki",
        "how4": "Subiri dakika chache",
        "how5": "Bonyeza kwa ubora unaotaka kupakua",
        "how6": "Kwenye kichupo kipya, faili itapakua kiotomatiki kisha ihifadhi kwenye kifaa chako",
        "close": "Karibu",
        "settings": "Mipangilio ya watumiaji",
        "oneclick": "Pakua video na bonyeza 1 tu",
        "yes": "Ndio",
        "no": "Hapana",
        "autoselect": "Chagua moja kwa moja ubora",
        "max": "Max",
        "apply": "Omba",
        "changelanguage": "Badilisha lugha",
        "download": "Pakua",
        "loading": "Inapakia",
        "pin": "Kwa urahisi, tafadhali piga programu hii.",
        "expire": "Kiungo cha kupakua kinaweza kumalizika. Unapaswa kubonyeza kichwa kisha kunyakua kiunga cha kupakua mpya.",
        "clickhere": "Bonyeza hapa",
        "autorun": "Washa programu tumizi kiotomatiki."
    },
    "ta": {
        "extName": "அற்புதமான விமியோ டவுன்லோடர்",
        "extDescription": "Vimeo.com இலிருந்து வீடியோக்களைப் பதிவிறக்குக (4K தரமான வீடியோக்களைப் பதிவிறக்குக)",
        "only": "இந்த நீட்டிப்பு விமியோவில் மட்டுமே இயங்கும்",
        "open": "விமியோவைத் திறக்கவும்",
        "how1": "விமியோ வலைத்தளத்தைத் திறக்கவும்",
        "how2": "விமியோவில் வீடியோவை இயக்கவும்.",
        "permissions": "இந்த பயன்பாட்டின் அனுமதிகளை மாற்றியுள்ளீர்கள். மென்பொருள் சரியாக வேலை செய்ய, பயன்பாட்டிற்கான அனுமதிகளை மீட்டமைக்க கீழே உள்ள பொத்தானைக் கிளிக் செய்ய வேண்டும்.",
        "select": "தேர்ந்தெடு",
        "rightclick": "வலது கிளிக்",
        "allow": "அனுமதிகளை அனுமதிக்கிறது",
        "howtouse": "எப்படி உபயோகிப்பது",
        "by": "இயக்கப்படுகிறது",
        "search": "தேடல்",
        "helperintro": "எந்தவொரு வலைத்தளத்திலிருந்தும் வீடியோ மற்றும் ஆடியோவை எளிதாக பதிவிறக்கவும்.",
        "install": "இப்போது நிறுவ",
        "feedback": "பின்னூட்டம்",
        "how3": "இந்த நீட்டிப்பைத் திறக்கவும்",
        "how4": "சில கணங்கள் காத்திருங்கள்",
        "how5": "நீங்கள் பதிவிறக்க விரும்பும் தரத்தில் சொடுக்கவும்",
        "how6": "புதிய தாவலில், கோப்பு தானாகவே பதிவிறக்கம் செய்யப்பட்டு பின்னர் உங்கள் சாதனத்தில் சேமிக்கப்படும்",
        "close": "நெருக்கமான",
        "settings": "பயனர் அமைப்புகள்",
        "oneclick": "1 கிளிக்கில் வீடியோக்களைப் பதிவிறக்கவும்",
        "yes": "ஆம்",
        "no": "இல்லை",
        "autoselect": "தரத்தை தானாகத் தேர்ந்தெடுக்கவும்",
        "max": "மேக்ஸ்",
        "apply": "விண்ணப்பிக்கவும்",
        "changelanguage": "மொழியை மாற்றவும்",
        "download": "பதிவிறக்க Tamil",
        "loading": "ஏற்றுகிறது",
        "pin": "வசதிக்காக, இந்த பயன்பாட்டை பின்செய்யவும்.",
        "expire": "பதிவிறக்க இணைப்பு காலாவதியாகலாம். நீங்கள் தலைப்பில் கிளிக் செய்து புதிய பதிவிறக்க இணைப்பைப் பிடிக்க வேண்டும்.",
        "clickhere": "இங்கே கிளிக் செய்க",
        "autorun": "இந்த பயன்பாட்டை தானாகவே செயல்படுத்தவும்."
    },
    "te": {
        "extName": "అద్భుతం Vimeo Downloader",
        "extDescription": "Vimeo.com నుండి వీడియోలను డౌన్‌లోడ్ చేయండి (4K నాణ్యమైన వీడియోలను డౌన్‌లోడ్ చేయండి)",
        "only": "ఈ పొడిగింపు Vimeoలో మాత్రమే నడుస్తుంది",
        "open": "Vimeoని తెరవండి",
        "how1": "Vimeo వెబ్‌సైట్‌ను తెరవండి",
        "how2": "Vimeoలో వీడియోని ప్లే చేయండి.",
        "permissions": "మీరు ఈ అనువర్తనం యొక్క అనుమతులను మార్చారు. సాఫ్ట్‌వేర్ సరిగ్గా పనిచేయడానికి, మీరు అనువర్తనానికి అనుమతులను పునరుద్ధరించడానికి క్రింది బటన్‌ను క్లిక్ చేయాలి.",
        "select": "ఎంచుకోండి",
        "rightclick": "కుడి క్లిక్ చేయండి",
        "allow": "అనుమతులను అనుమతిస్తుంది",
        "howtouse": "ఎలా ఉపయోగించాలి",
        "by": "ద్వారా ఆధారితం",
        "search": "వెతకండి",
        "helperintro": "ఏదైనా వెబ్‌సైట్ నుండి వీడియో మరియు ఆడియోను సులభంగా డౌన్‌లోడ్ చేసుకోండి.",
        "install": "ఇప్పుడు ఇన్‌స్టాల్ చేయండి",
        "feedback": "అభిప్రాయం",
        "how3": "ఈ పొడిగింపును తెరవండి",
        "how4": "కొన్ని క్షణాలు వేచి ఉండండి",
        "how5": "మీరు డౌన్‌లోడ్ చేయదలిచిన నాణ్యతపై క్లిక్ చేయండి",
        "how6": "క్రొత్త ట్యాబ్‌లో, ఫైల్ స్వయంచాలకంగా డౌన్‌లోడ్ అవుతుంది మరియు తరువాత మీ పరికరంలో సేవ్ అవుతుంది",
        "close": "Close",
        "settings": "వినియోగదారు సెట్టింగులు",
        "oneclick": "కేవలం 1 క్లిక్‌తో వీడియోలను డౌన్‌లోడ్ చేయండి",
        "yes": "అవును",
        "no": "తోబుట్టువుల",
        "autoselect": "నాణ్యతను స్వయంచాలకంగా ఎంచుకోండి",
        "max": "మాక్స్",
        "apply": "వర్తించు",
        "changelanguage": "భాష మార్చు",
        "download": "డౌన్‌లోడ్",
        "loading": "లోడ్",
        "pin": "సౌలభ్యం కోసం, దయచేసి ఈ అనువర్తనాన్ని పిన్ చేయండి.",
        "expire": "డౌన్‌లోడ్ లింక్ గడువు ముగియవచ్చు. మీరు శీర్షికపై క్లిక్ చేసి, ఆపై క్రొత్త డౌన్‌లోడ్ లింక్‌ను పొందండి.",
        "clickhere": "ఇక్కడ నొక్కండి",
        "autorun": "ఈ అనువర్తనాన్ని స్వయంచాలకంగా సక్రియం చేయండి."
    },
    "tg": {
        "extName": "Бузург Vimeo Downloader",
        "extDescription": "Видеоҳоро аз vimeo.com зеркашӣ кунед (зеркашии 4К видео)",
        "only": "Ин васеъшавӣ танҳо дар Vimeo кор мекунад",
        "open": "Vimeo-ро кушоед",
        "how1": "Вебсайти Vimeo -ро кушоед",
        "how2": "Видеоро дар Vimeo бозӣ кунед.",
        "permissions": "Шумо иҷозатномаҳои ин барномаро тағир додед. Барои он, ки нармафзор дуруст кор кунад, шумо бояд кнопкаро зер кунед, то иҷозатҳоро ба барнома барқарор кунед.",
        "select": "-Ро интихоб кунед",
        "rightclick": "Тугмаи ростро пахш кунед",
        "allow": "иҷозат медиҳад",
        "howtouse": "Тарзи истифода",
        "by": "Нерӯмандшуда аз тарафи",
        "search": "Ҷустуҷӯ",
        "helperintro": "Ба осонӣ видео ва аудиониро аз ягон вебсайт зеркашӣ кунед.",
        "install": "НОМАИ НАВ",
        "feedback": "Андеша",
        "how3": "Ин паҳнкуниро кушоед",
        "how4": "Чанд лаҳза интизор шавед",
        "how5": "Сифати онро зеркашӣ кунед",
        "how6": "Дар ҷадвали нав, файл ба таври худкор зеркашӣ карда мешавад ва пас дар дастгоҳи шумо захира мешавад",
        "close": "Пӯшед",
        "settings": "Танзимоти корбар",
        "oneclick": "Видеоро танҳо бо 1 клик зеркашӣ кунед",
        "yes": "Бале",
        "no": "Не",
        "autoselect": "Ба таври худкор сифатро интихоб кунед",
        "max": "Макс",
        "apply": "Муроҷиат кунед",
        "changelanguage": "Тағири забон",
        "download": "Боргирӣ",
        "loading": "Боркунӣ",
        "pin": "Барои осонӣ, лутфан ин барномаро пинҳон кунед.",
        "expire": "Истинод зеркашӣ метавонад ба итмом расад. Шумо бояд сарлавҳаро пахш кунед ва баъд истинод навро зеркашӣ кунед.",
        "clickhere": "ин ҷоро ангушт зан",
        "autorun": "Ин барномаро ба таври худкор фаъол созед."
    },
    "th": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "ดาวน์โหลดวิดีโอจาก vimeo.com (ดาวน์โหลดวิดีโอคุณภาพระดับ 4K)",
        "only": "ส่วนขยายนี้ทำงานบน Vimeo เท่านั้น",
        "open": "เปิดวิมีโอ",
        "how1": "เปิดเว็บไซต์ Vimeo",
        "how2": "เล่นวิดีโอบน Vimeo",
        "permissions": "คุณได้เปลี่ยนการอนุญาตของแอพนี้ เพื่อให้ซอฟต์แวร์ทำงานได้อย่างถูกต้องคุณต้องคลิกปุ่มด้านล่างเพื่อคืนค่าการอนุญาตให้แอป",
        "select": "เลือก",
        "rightclick": "คลิกขวา",
        "allow": "อนุญาตการอนุญาต",
        "howtouse": "วิธีใช้",
        "by": "ขับเคลื่อนโดย",
        "search": "ค้นหา",
        "helperintro": "ดาวน์โหลดวิดีโอและเสียงจากเว็บไซต์ใด ๆ ได้อย่างง่ายดาย",
        "install": "ติดตั้งในขณะนี้",
        "feedback": "ผลตอบรับ",
        "how3": "เปิดส่วนขยายนี้",
        "how4": "รอสักครู่",
        "how5": "คลิกที่คุณภาพที่คุณต้องการดาวน์โหลด",
        "how6": "บนแท็บใหม่ไฟล์จะดาวน์โหลดโดยอัตโนมัติแล้วบันทึกลงในอุปกรณ์ของคุณ",
        "close": "ปิด",
        "settings": "การตั้งค่าผู้ใช้",
        "oneclick": "ดาวน์โหลดวิดีโอด้วยการคลิกเพียงครั้งเดียว",
        "yes": "ใช่",
        "no": "ไม่",
        "autoselect": "เลือกคุณภาพโดยอัตโนมัติ",
        "max": "แม็กซ์",
        "apply": "ใช้",
        "changelanguage": "เปลี่ยนภาษา",
        "download": "ดาวน์โหลด",
        "loading": "กำลังโหลด",
        "pin": "เพื่อความสะดวกโปรดปักหมุดแอปนี้",
        "expire": "ลิงก์ดาวน์โหลดอาจหมดอายุ คุณควรคลิกที่ชื่อแล้วหยิบลิงค์ดาวน์โหลดใหม่",
        "clickhere": "คลิกที่นี่",
        "autorun": "เปิดใช้งานแอปพลิเคชันนี้โดยอัตโนมัติ"
    },
    "tl": {
        "extName": "Kahanga-hanga Vimeo Downloader",
        "extDescription": "Mag-download ng mga video mula sa vimeo.com (i-download ang mga kalidad na 4K video)",
        "only": "Ang extension na ito ay tumatakbo lamang sa Vimeo",
        "open": "Buksan ang Vimeo",
        "how1": "Buksan ang website ng Vimeo",
        "how2": "Mag-play ng video sa Vimeo.",
        "permissions": "Binago mo ang mga pahintulot ng app na ito. Upang gumana nang maayos ang software, kailangan mong i-click ang pindutan sa ibaba upang maibalik ang mga pahintulot sa app.",
        "select": "Pumili",
        "rightclick": "Pag-right click",
        "allow": "pinapayagan ang mga pahintulot",
        "howtouse": "Paano gamitin",
        "by": "Pinatatakbo ng",
        "search": "Paghahanap",
        "helperintro": "Madaling mag-download ng video at audio mula sa anumang website.",
        "install": "INSTALL NGAYON",
        "feedback": "Feedback",
        "how3": "Buksan ang extension na ito",
        "how4": "Maghintay ng ilang sandali",
        "how5": "Mag-click sa kalidad na nais mong i-download",
        "how6": "Sa bagong tab, ang file ay awtomatikong i-download at pagkatapos ay i-save sa iyong aparato",
        "close": "Isara",
        "settings": "Mga setting ng gumagamit",
        "oneclick": "I-download ang mga video na may isang pag-click lamang",
        "yes": "Oo",
        "no": "Hindi",
        "autoselect": "Awtomatikong pumili ng kalidad",
        "max": "Max",
        "apply": "Mag-apply",
        "changelanguage": "Baguhin ang wika",
        "download": "Mag-download",
        "loading": "Naglo-load",
        "pin": "Para sa kaginhawaan, mangyaring i-pin ang app na ito.",
        "expire": "Maaaring mag-expire ang link sa pag-download. Dapat mong mag-click sa pamagat pagkatapos ay kumuha ng isang bagong link sa pag-download.",
        "clickhere": "Pindutin dito",
        "autorun": "Awtomatikong buhayin ang application na ito."
    },
    "tr": {
        "extName": "Müthiş Vimeo İndiricisi",
        "extDescription": "Vimeo.com adresinden videolar indirin (4K kalitesinde videolar indirin)",
        "only": "Bu uzantı yalnızca Vimeo'da çalışır",
        "open": "Vimeo'yu aç",
        "how1": "Vimeo web sitesini açın",
        "how2": "Vimeo'da bir video oynatın.",
        "permissions": "Bu uygulamanın izinlerini değiştirdiniz. Yazılımın düzgün çalışması için, uygulamaya izinleri geri yüklemek için aşağıdaki düğmeye tıklamanız gerekir.",
        "select": "Seçiniz",
        "rightclick": "Sağ tık",
        "allow": "izinlere izin verir",
        "howtouse": "Nasıl kullanılır",
        "by": "Tarafından desteklenmektedir",
        "search": "Ara",
        "helperintro": "Herhangi bir web sitesinden kolayca video ve ses indirin.",
        "install": "ŞİMDİ KUR",
        "feedback": "geri bildirim",
        "how3": "Bu uzantıyı aç",
        "how4": "Birkaç dakika bekle",
        "how5": "İndirmek istediğiniz kaliteyi tıklayın",
        "how6": "Yeni sekmede, dosya otomatik olarak indirilir ve sonra cihazınıza kaydedilir.",
        "close": "Kapat",
        "settings": "Kullanıcı ayarları",
        "oneclick": "Sadece 1 tıklama ile videoları indirin",
        "yes": "Evet",
        "no": "Hayır",
        "autoselect": "Kaliteyi otomatik seç",
        "max": "maksimum",
        "apply": "Uygulamak",
        "changelanguage": "Dili değiştir",
        "download": "İndir",
        "loading": "Yükleniyor",
        "pin": "Kolaylık sağlamak için lütfen bu uygulamayı sabitleyin.",
        "expire": "İndirme bağlantısının süresi dolmuş olabilir. Başlığa tıkladıktan sonra yeni bir indirme bağlantısı almalısınız.",
        "clickhere": "Buraya Tıkla",
        "autorun": "Bu uygulamayı otomatik olarak etkinleştirin."
    },
    "uk": {
        "extName": "Awesome Vimeo Downloader",
        "extDescription": "Завантажуйте відео з vimeo.com (завантажуйте відео із якістю 4К)",
        "only": "Це розширення працює лише на Vimeo",
        "open": "Відкрийте Vimeo",
        "how1": "Відкрийте веб-сайт Vimeo",
        "how2": "Відтворити відео на Vimeo.",
        "permissions": "Ви змінили дозволи цього додатка. Щоб програмне забезпечення працювало належним чином, потрібно натиснути кнопку нижче, щоб відновити дозволи для програми.",
        "select": "Виберіть",
        "rightclick": "Клацніть правою кнопкою миші",
        "allow": "дозволяє дозволи",
        "howtouse": "Як користуватись",
        "by": "Працює на",
        "search": "Пошук",
        "helperintro": "Легко завантажуйте відео та аудіо з будь-якого веб-сайту.",
        "install": "ВСТАНОВИТИ ЗАРАЗ",
        "feedback": "Відгуки",
        "how3": "Відкрийте це розширення",
        "how4": "Почекайте кілька моментів",
        "how5": "Клацніть на якість, яку ви хочете завантажити",
        "how6": "На новій вкладці файл автоматично завантажується, а потім зберігається на вашому пристрої",
        "close": "Закрити",
        "settings": "Налаштування користувача",
        "oneclick": "Завантажте відео лише в один клік",
        "yes": "Так",
        "no": "Немає",
        "autoselect": "Автоматично вибирайте якість",
        "max": "Макс",
        "apply": "Застосувати",
        "changelanguage": "Змінити мову",
        "download": "Завантажити",
        "loading": "Завантаження",
        "pin": "Для зручності закріпіть цей додаток.",
        "expire": "Посилання для завантаження може закінчитися. Вам слід натиснути на назву, а потім перейти на нове посилання для завантаження.",
        "clickhere": "Натисніть тут",
        "autorun": "Автоматично активувати цю програму."
    },
    "ur": {
        "extName": "بہت اچھے Vimeo ڈاؤنلوڈر",
        "extDescription": "vimeo.com سے ویڈیوز ڈاؤن لوڈ کریں (4K معیار کی ویڈیوز ڈاؤن لوڈ کریں)",
        "only": "یہ توسیع صرف Vimeo پر چلتی ہے۔",
        "open": "Vimeo کھولیں۔",
        "how1": "Vimeo ویب سائٹ کھولیں۔",
        "how2": "Vimeo پر ایک ویڈیو چلائیں۔",
        "permissions": "آپ نے اس ایپ کی اجازتیں تبدیل کردی ہیں۔ سافٹ ویئر کے صحیح طریقے سے کام کرنے کے ل you ، آپ کو ایپ میں اجازت بحال کرنے کے لئے نیچے دیئے گئے بٹن پر کلک کرنے کی ضرورت ہے۔",
        "select": "منتخب کریں",
        "rightclick": "دائیں کلک کریں",
        "allow": "اجازت دیتا ہے",
        "howtouse": "استعمال کرنے کا طریقہ",
        "by": "از: وی بلیٹن",
        "search": "تلاش کریں",
        "helperintro": "آسانی سے کسی بھی ویب سائٹ سے ویڈیو اور آڈیو ڈاؤن لوڈ کریں۔",
        "install": "اب انسٹال",
        "feedback": "آراء",
        "how3": "اس توسیع کو کھولیں",
        "how4": "کچھ لمحے انتظار کریں",
        "how5": "آپ جس معیار کو ڈاؤن لوڈ کرنا چاہتے ہیں اس پر کلک کریں",
        "how6": "نئے ٹیب پر ، فائل خود بخود ڈاؤن لوڈ ہوگی اور پھر آپ کے آلے میں محفوظ ہوجائے گی",
        "close": "بند کریں",
        "settings": "صارف کی ترتیبات",
        "oneclick": "صرف 1 کلک کے ساتھ ویڈیوز ڈاؤن لوڈ کریں",
        "yes": "جی ہاں",
        "no": "نہیں",
        "autoselect": "خود بخود معیار منتخب کریں",
        "max": "زیادہ سے زیادہ",
        "apply": "درخواست دیں",
        "changelanguage": "زبان تبدیل کریں",
        "download": "ڈاؤن لوڈ کریں",
        "loading": "لوڈ ہو رہا ہے",
        "pin": "سہولت کے ل please ، براہ کرم اس ایپ کو پن کریں۔",
        "expire": "ڈاؤن لوڈ لنک کی میعاد ختم ہوسکتی ہے۔ آپ کو ٹائٹل پر کلک کرنا چاہئے پھر ڈاؤن لوڈ کا نیا لنک اپنائیں۔",
        "clickhere": "یہاں کلک کریں",
        "autorun": "خود بخود اس ایپلی کیشن کو چالو کریں۔"
    },
    "uz": {
        "extName": "Ajoyib Vimeo Downloader",
        "extDescription": "Videolarni vimeo.com saytidan yuklab oling (4K sifatli video yuklab oling)",
        "only": "Ushbu kengaytma faqat Vimeo-da ishlaydi",
        "open": "Vimeo-ni oching",
        "how1": "Vimeo veb-saytini oching",
        "how2": "Vimeo-da videoni o'ynang.",
        "permissions": "Siz ushbu ilovaning ruxsatlarini o'zgartirdingiz. Dasturiy ta'minotning to'g'ri ishlashi uchun dasturga ruxsatlarni tiklash uchun quyidagi tugmani bosishingiz kerak.",
        "select": "Tanlang",
        "rightclick": "O'ng tugmani bosing",
        "allow": "ruxsatlarga ruxsat beradi",
        "howtouse": "Qanday ishlatish",
        "by": "Tomonidan qo'llab-quvvatlanadi",
        "search": "Qidirmoq",
        "helperintro": "Osonlik bilan har qanday veb-saytdan video va audio yuklab oling.",
        "install": "HOZIR O'RNATISH",
        "feedback": "Fikr-mulohaza",
        "how3": "Ushbu kengaytmani oching",
        "how4": "Biroz kuting",
        "how5": "Siz yuklab olmoqchi bo'lgan sifatni bosing",
        "how6": "Yangi yorliqda fayl avtomatik ravishda yuklab olinadi va keyin qurilmangizga saqlanadi",
        "close": "Yopish",
        "settings": "Foydalanuvchi sozlamalari",
        "oneclick": "Videolarni faqat bir marta bosish bilan yuklab oling",
        "yes": "Ha",
        "no": "Yo'q",
        "autoselect": "Avtomatik ravishda sifatni tanlang",
        "max": "Maks",
        "apply": "Qo'llash",
        "changelanguage": "Tilni o'zgartirish",
        "download": "Yuklash",
        "loading": "Yuklanmoqda",
        "pin": "Qulaylik uchun, iltimos, ushbu ilovani pin qiling.",
        "expire": "Yuklab olish havolasi muddati tugashi mumkin. Sarlavhani bosishingiz kerak va keyin yangi yuklab olish havolasini oling.",
        "clickhere": "bu yerni bosing",
        "autorun": "Ushbu dasturni avtomatik ravishda faollashtiring."
    },
    "vi": {
        "extName": "Trình tải xuống Vimeo tuyệt vời",
        "extDescription": "Tải xuống video từ vimeo.com (tải xuống video chất lượng 4K)",
        "only": "Tiện ích mở rộng này chỉ chạy trên Vimeo",
        "open": "Mở Vimeo",
        "how1": "Mở trang web Vimeo",
        "how2": "Phát video trên Vimeo.",
        "permissions": "Bạn đã thay đổi các quyền của ứng dụng này. Để phần mềm hoạt động bình thường, bạn cần nhấp vào nút bên dưới để khôi phục quyền cho ứng dụng.",
        "select": "Lựa chọn",
        "rightclick": "Kích chuột phải",
        "allow": "cho phép quyền",
        "howtouse": "Cách sử dụng",
        "by": "Cung cấp bởi",
        "search": "Tìm kiếm",
        "helperintro": "Dễ dàng tải xuống video và âm thanh từ bất kỳ trang web.",
        "install": "CÀI ĐẶT NGAY",
        "feedback": "Phản hồi",
        "how3": "Mở phần mở rộng này",
        "how4": "Đợi một lát",
        "how5": "Bấm vào chất lượng bạn muốn tải xuống",
        "how6": "Trên tab mới, tệp sẽ tự động tải xuống và sau đó lưu vào thiết bị của bạn",
        "close": "Đóng",
        "settings": "Thiết lập người dùng",
        "oneclick": "Tải xuống video chỉ với 1 cú nhấp chuột",
        "yes": "Đúng",
        "no": "Không",
        "autoselect": "Tự động chọn chất lượng",
        "max": "Tối đa",
        "apply": "Ứng dụng",
        "changelanguage": "Thay đổi ngôn ngữ",
        "download": "Tải xuống",
        "loading": "Đang tải",
        "pin": "Để thuận tiện, vui lòng ghim ứng dụng này.",
        "expire": "Liên kết tải xuống có thể hết hạn. Bạn nên nhấp vào tiêu đề sau đó lấy một liên kết tải xuống mới.",
        "clickhere": "Bấm vào đây",
        "autorun": "Tự động kích hoạt ứng dụng này."
    },
    "xh": {
        "extName": "Umnxeba owoyikekayo weVimeo",
        "extDescription": "Khuphela iividiyo kwiVimeo.com (khuphela iividiyo ezisemgangathweni eziyi-4K)",
        "only": "Olu lwandiso lusebenza kuphela kwiVimeo",
        "open": "Vula iVimeo",
        "how1": "Vula iwebhusayithi yeVimeo",
        "how2": "Dlala ividiyo kwiVimeo.",
        "permissions": "Utshintshe iimvume zolu setyenziso. Ukuze isoftware isebenze kakuhle, kuya kufuneka ucofe iqhosha elisezantsi ukubuyisela iimvume kwi-app.",
        "select": "Khetha",
        "rightclick": "Cofa ekunene",
        "allow": "ivumela iimvume",
        "howtouse": "Kusetyenziswa kwanjani",
        "by": "Ixhaswa ngu",
        "search": "Khangela",
        "helperintro": "Ukukhuphela ngokulula ividiyo kunye nevidiyo kuyo nayiphi na iwebhusayithi.",
        "install": "Faka ngoku",
        "feedback": "Ingxelo",
        "how3": "Vula olu lwandiso",
        "how4": "Ndilinde imizuzwana embalwa",
        "how5": "Cofa kumgangatho ofuna ukuwukhuphela",
        "how6": "Kwithebhu entsha, ifayile iya kukhuphela ngokuzenzekelayo uze ugcine kwifowuni yakho",
        "close": "Vala",
        "settings": "Useto lomsebenzisi",
        "oneclick": "Khuphela iividiyo ngokuchofoza nje oku-1",
        "yes": "Ewe",
        "no": "Hayi",
        "autoselect": "Khetha ngokuzenzekelayo umgangatho",
        "max": "UMax",
        "apply": "Faka isicelo",
        "changelanguage": "Guqula ulwimi",
        "download": "Khuphela",
        "loading": "Iyalayisha",
        "pin": "Ukulungiselela, nceda ucofe le app.",
        "expire": "Ikhonkco lokukhuphela linokuphelelwa. Kuya kufuneka ucofe isihloko uze ubambe ikhonkco elitsha lokukhuphela.",
        "clickhere": "Cofa apha",
        "autorun": "Yenza ngokuzenzekelayo esi sicelo."
    },
    "yi": {
        "extName": "אָסאַם ווימעאָ דאָוונלאָאַדער",
        "extDescription": "אראפקאפיע ווידיאס פֿון vimeo.com (אראפקאפיע 4K ווידיאס קוואַליטעט)",
        "only": "די פאַרלענגערונג לויפט בלויז אויף Vimeo",
        "open": "עפֿענען Vimeo",
        "how1": "עפֿענען די Vimeo וועבזייטל",
        "how2": "שפּיל אַ ווידעא אויף Vimeo.",
        "permissions": "איר האָט געביטן די פּערמישאַנז פון דעם אַפּ. פֿאַר די ווייכווארג צו אַרבעטן רעכט, איר דאַרפֿן צו גיט די קנעפּל אונטן צו ומקערן דערלויבעניש צו די אַפּ.",
        "select": "סעלעקטירן",
        "rightclick": "רעכט גיט",
        "allow": "אַלאַוז פּערמישאַנז",
        "howtouse": "וויאזוי צו ניצן",
        "by": "פּאַוערד דורך",
        "search": "זוך",
        "helperintro": "לייכט אָפּלאָדירן ווידעא און אַודיאָ פון קיין וועבזייטל.",
        "install": "ינסטאַלירן איצט",
        "feedback": "באַמערקונגען",
        "how3": "עפֿן דעם פאַרלענגערונג",
        "how4": "וואַרטן אַ ביסל מאָומאַנץ",
        "how5": "דריקט אויף די קוואַליטעט איר ווילן צו אָפּלאָדירן",
        "how6": "אויף די נייַ קוויטל, דער טעקע וועט אויטאָמאַטיש אראפקאפיע און שפּאָרן אויף דיין מיטל",
        "close": "נאָענט",
        "settings": "באַניצער סעטטינגס",
        "oneclick": "אראפקאפיע ווידיאס מיט בלויז 1 קליקינג",
        "yes": "יאָ",
        "no": "ניין",
        "autoselect": "אויטאָמאַטיש סעלעקטירן קוואַליטעט",
        "max": "מאַקס",
        "apply": "צולייגן",
        "changelanguage": "טוישן שפּראַך",
        "download": "אראפקאפיע",
        "loading": "Loading",
        "pin": "ביטע נוצן דעם אַפּ פֿאַר קאַנוויניאַנס.",
        "expire": "אראפקאפיע לינק קען ויסגיין. איר זאָל גיט דעם טיטל און כאַפּן אַ נייַע אראפקאפיע לינק.",
        "clickhere": "דריק דא",
        "autorun": "אויטאָמאַטיש אַקטאַווייט דעם אַפּלאַקיישאַן."
    },
    "yo": {
        "extName": "Oniwa Vimeo Oniyi",
        "extDescription": "Ṣe igbasilẹ awọn fidio lati vimeo.com (gbasilẹ awọn fidio didara 4)",
        "only": "Ifaagun yii nṣiṣẹ lori Vimeo nikan",
        "open": "Ṣii Vimeo",
        "how1": "Ṣii oju opo wẹẹbu Vimeo",
        "how2": "Mu fidio ṣiṣẹ lori Vimeo.",
        "permissions": "O ti yi awọn igbanilaaye ti ohun elo yii pada. Fun sọfitiwia naa lati ṣiṣẹ daradara, o nilo lati tẹ bọtini ni isalẹ lati mu awọn igbanilaaye pada si ohun elo naa.",
        "select": "Yan",
        "rightclick": "Ọtun tẹ",
        "allow": "gba awọn igbanilaaye",
        "howtouse": "Bi o ṣe le lo",
        "by": "Agbara lati owo",
        "search": "Ṣewadii",
        "helperintro": "Ni irọrun ṣe igbasilẹ fidio ati ohun lati eyikeyi oju opo wẹẹbu.",
        "install": "Bayi NIKAN",
        "feedback": "Esi",
        "how3": "Ṣi itẹsiwaju yii",
        "how4": "Duro awọn igba diẹ",
        "how5": "Tẹ lori didara ti o fẹ gbasilẹ",
        "how6": "Lori taabu tuntun, faili naa yoo gba lati ayelujara laifọwọyi ati lẹhinna fipamọ si ẹrọ rẹ",
        "close": "Pade",
        "settings": "Eto olumulo",
        "oneclick": "Ṣe igbasilẹ awọn fidio pẹlu titẹ 1 kan",
        "yes": "Bẹẹni",
        "no": "Rara",
        "autoselect": "Laifọwọyi yan Didara",
        "max": "Max",
        "apply": "Waye",
        "changelanguage": "Yi ede",
        "download": "Ṣe igbasilẹ",
        "loading": "Ikojọpọ",
        "pin": "Fun irọrun, jọwọ pin ohun elo yii.",
        "expire": "Ọna asopọ igbasilẹ lati ayelujara le pari. O yẹ ki o tẹ lori akọle lẹhinna ja ọna asopọ igbasilẹ tuntun kan.",
        "clickhere": "Kiliki ibi",
        "autorun": "Laifọwọyi mu ohun elo yii ṣiṣẹ."
    },
    "zu": {
        "extName": "Isimanga Vimeo Downloader",
        "extDescription": "Landa amavidiyo ku-vimeo.com (landa amavidiyo wekhwalithi we-4K)",
        "only": "Lesi sandiso sisebenza kuphela ku-Vimeo",
        "open": "Vula i-Vimeo",
        "how1": "Vula iwebhusayithi ye-Vimeo",
        "how2": "Dlala ividiyo ku-Vimeo.",
        "permissions": "Ushintshe izimvume zalolu hlelo lokusebenza. Ukuze isoftware isebenze kahle, udinga ukuchofoza inkinobho engezansi ukubuyisela izimvume kuhlelo lokusebenza.",
        "select": "Khetha",
        "rightclick": "Qhafaza kwesokudla",
        "allow": "ivumela izimvume",
        "howtouse": "Isetshenziswa kanjani",
        "by": "Inikezwe amandla yi",
        "search": "Sesha",
        "helperintro": "Landa kalula ividiyo nomsindo kusuka kunoma iyiphi iwebhusayithi.",
        "install": "Faka MANJE",
        "feedback": "Impendulo",
        "how3": "Vula lesi sandiso",
        "how4": "Linda izikhathi ezimbalwa",
        "how5": "Chofoza kwikhwalithi ofuna ukuyilanda",
        "how6": "Kuthebhu entsha, ifayela lizolanda ngokuzenzakalelayo bese liligcina kudivayisi yakho",
        "close": "Vala",
        "settings": "Izilungiselelo zomsebenzisi",
        "oneclick": "Landa amavidiyo ngokuchofoza okukodwa nje",
        "yes": "Yebo",
        "no": "Cha",
        "autoselect": "Khetha ikhwalithi ngokuzenzakalela",
        "max": "UMax",
        "apply": "Faka isicelo",
        "changelanguage": "Guqula ulimi",
        "download": "Landa",
        "loading": "Iyalayisha",
        "pin": "Ukuze kube lula, sicela ufake lolu hlelo lokusebenza.",
        "expire": "Isixhumanisi sokulanda singaphelelwa yisikhathi. Kufanele uchofoze isihloko bese ubamba isixhumanisi esisha sokulanda.",
        "clickhere": "Chofoza lapha",
        "autorun": "Sebenzisa lolu hlelo ngokuzenzakalela."
    },
    "zh_cn": {
        "extName": "很棒的Vimeo下载器",
        "extDescription": "从vimeo.com下载视频（下载4K质量的视频）",
        "only": "此扩展仅在 Vimeo 上运行",
        "open": "打开 Vimeo",
        "how1": "打开 Vimeo 网站",
        "how2": "在 Vimeo 上播放视频。",
        "permissions": "您已更改了此应用的权限。 为了使软件正常运行，您需要单击下面的按钮以还原该应用程序的权限。",
        "select": "选择",
        "rightclick": "右键点击",
        "allow": "允许权限",
        "howtouse": "如何使用",
        "by": "供电",
        "search": "搜索",
        "helperintro": "从任何网站轻松下载视频和音频。",
        "install": "现在安装",
        "feedback": "反馈",
        "how3": "打开此扩展程序",
        "how4": "等一下",
        "how5": "点击您要下载的质量",
        "how6": "在新标签上，文件将自动下载，然后保存到您的设备中",
        "close": "关",
        "settings": "用户设置",
        "oneclick": "一键下载视频",
        "yes": "是",
        "no": "没有",
        "autoselect": "自动选择质量",
        "max": "最高",
        "apply": "应用",
        "changelanguage": "改变语言",
        "download": "下载",
        "loading": "载入中",
        "pin": "为了方便起见，请固定此应用。",
        "expire": "下载链接可能已过期。 您应该单击标题，然后获取新的下载链接。",
        "clickhere": "点击这里",
        "autorun": "自动激活此应用程序。"
    },
    "zh_tw": {
        "extName": "很棒的Vimeo下載器",
        "extDescription": "從vimeo.com下載視頻（下載4K質量的視頻）",
        "only": "此擴充僅在 Vimeo 上運行",
        "open": "打開 Vimeo",
        "how1": "開啟 Vimeo 網站",
        "how2": "在 Vimeo 上播放影片。",
        "permissions": "您已更改了此應用的權限。 為了使軟件正常運行，您需要單擊下面的按鈕以恢復該應用程序的權限。",
        "select": "選擇",
        "rightclick": "右鍵點擊",
        "allow": "允許權限",
        "howtouse": "如何使用",
        "by": "供電",
        "search": "搜索",
        "helperintro": "從任何網站輕鬆下載視頻和音頻。",
        "install": "現在安裝",
        "feedback": "反饋",
        "how3": "打開此擴展程序",
        "how4": "等一下",
        "how5": "點擊您要下載的質量",
        "how6": "在新標籤上，文件將自動下載，然後保存到您的設備中",
        "close": "關",
        "settings": "用戶設置",
        "oneclick": "一鍵下載視頻",
        "yes": "是",
        "no": "沒有",
        "autoselect": "自動選擇質量",
        "max": "最高",
        "apply": "應用",
        "changelanguage": "改變語言",
        "download": "下載",
        "loading": "載入中",
        "pin": "為了方便起見，請固定此應用。",
        "expire": "下載鏈接可能已過期。 您應該單擊標題，然後獲取新的下載鏈接。",
        "clickhere": "點擊這裡",
        "autorun": "自動激活此應用程序。"
    }
}

function pbion_popup_loading_show(){
    pbion_display('#loading','block');
}
function pbion_popup_loading_hide(){
    pbion_display('#loading','none');
}
function pbion_popup_icon(quality){
    quality = quality.toLowerCase();
    var svg = '';
    if(quality=='2160p') svg = '4k';
    else if(quality=='1080p') svg = '1080';
    else if(quality=='hd') svg = 'hd';
    else if(quality=='audio') svg = 'audio';
    else if(quality=='720p') svg = '720';
    else if(quality=='sd') svg = 'download-smile';
    else if(quality=='video') svg = 'download-smile';
    else if(quality=='auto') svg = 'download-smile';
    else if(quality=='gif') svg = 'gif';
    else if(quality=='subtitles') svg = 'subtitles';
    else if(quality=='photo') svg = 'photo';
    else if(quality=='jpg') svg = 'download-smile';
    else if(quality=='small') svg = 'small';
    else if(quality=='medium') svg = 'medium';
    else if(quality=='large') svg = 'large';
    else if(quality=='thumbnail') svg = 'thumbnail';
    else if(quality=='live') svg = 'download-smile';
    else if(quality=='avatar') svg = 'avatar';
    else if(quality=='banner') svg = 'banner';
    else if(quality=='huge') svg = 'photo';
    else if(quality=='zip') svg = 'zip';
    else if(quality=='mp3') svg = 'mp3';
    else if(quality=='flv') svg = 'flv';
    else if(quality=='comment') svg = 'comment';
    return svg;
}
function pbion_popup_template_link(o,a){
    var links = '';
    var c = 0;
    for (var i = 0; i < a.length; i++) {
        var s = a[i];
        if(s.hide!=undefined){
            if(s.hide==1) continue;
        }
        c++;
        var template = pbion_value_get('#template_link');
        var svg = pbion_popup_icon(s.format);
        if(svg == '') var ic = '<div>'+s.format+'</div>';
        else var ic = '<img src="img/'+svg+'.svg">';
        template = template.replace('{icon}',ic);
        var url = (s.url!=undefined)?s.url:s.stream;
        var b = pbion_json_return(o);
        b.download = s.format;
        template = template.replace('{domain}',_config.domain);
        template = template.replace('{slug}',_config.slug);
        template = template.replace('{lang}',pbion.language);
        template = template.replace('{json}',JSON.stringify(b).replace(/"/g,'%22'));
        template = template.replace('{quality}',s.format);
        links += template;
        if(c>=6 || a.length-1 == i){
            var template = pbion_value_get('#template_link');
            template = template.replace('{icon}','<img src="img/threedots.svg">');
            template = template.replace('{domain}',_config.domain);
            template = template.replace('{slug}',_config.slug);
            template = template.replace('{lang}',pbion.language);
            b.download = '';
            template = template.replace('{json}',JSON.stringify(b).replace(/"/g,'%22'));
            template = template.replace('{quality}','more');
            links += template;
        }
    }
    return links;
}
function pbion_popup_template_video(a){
    var template = pbion_value_get('#template_video');
    template = template.replace('{title}',a.title);
    template = template.replace(/{link}/g,a.link);
    var array_links = a.streams.concat(a.formats)
    var links = pbion_popup_template_link(a,array_links);
    template = template.replace(/{links}/g,links);
    var images = [];
    for(var img in a.thumbnails) {
        images.push(a.thumbnails[img]);
    }
    var thumbnail_data = {
        images: images,
        u: a.link
    };
    template = template.replace('{thumbnail_data}',JSON.stringify(thumbnail_data).replace(/"/g,'%22'));
    var bg = a.poster;
    template = template.replace(/{background}/g,bg);
    template = template.replace(/{domain}/g,_config.domain);
    template = template.replace(/{lang}/g,pbion.language);
    return template;
}
function pbion_popup_image_zoom(){
    pbion_event('.expand','click', function(e){
        var img = pbion_attr_get(e.target.parentNode,'data-img');
        var t = pbion_find(e.target.parentNode.parentNode.parentNode,'.fullsize');
        pbion_html(t,'<img src="'+img+'">')
        pbion_display(t,'block');
        pbion_display(pbion_find(e.target.parentNode.parentNode,'.expand'),'none');
        pbion_display(pbion_find(e.target.parentNode.parentNode,'.focus'),'block');
    });
    pbion_event('.focus','click', function(e){
        var img = pbion_attr_get(e.target.parentNode,'data-img');
        var t = pbion_find(e.target.parentNode.parentNode.parentNode,'.fullsize');
        pbion_empty(t);
        pbion_display(t,'none');
        pbion_display(pbion_find(e.target.parentNode.parentNode,'.focus'),'none');
        pbion_display(pbion_find(e.target.parentNode.parentNode,'.expand'),'block');
    });
}
function pbion_popup_resize(){
    if(navigator.userAgent.indexOf('Android') == -1) return;
    var zoom = window.screen.width/400;
    pbion_css('body','zoom', zoom);
    pbion_css('body','-moz-transform', 'scale('+zoom+')');
    var h1 = pbion_outer_height('#header');
    //var h1 = $('#header').outerHeight(true);
    var hm = pbion_outer_height('#menu');
    //var hm = $('#menu').outerHeight(true);
    var hs = pbion_outer_height('#scroll');
    //var hs = $('#scroll').outerHeight(true);
    var ho = pbion_height_get('#scroll');
    //var ho = $('#scroll').height();
    var h = window.screen.height - h1 - hm - 22;
    if(h < 450) h = 450;
    //var h = window.innerHeight - document.body.scrollHeight;
    pbion_height_get('#scroll',h);
    //$('#scroll').height(h);
    pbion_text('#screen',window.screen.width+'x'+window.screen.height);
}
function pbion_popup_get_data(p){
    if(pbion.verify_permissions==0){
        pbion_display('#permissions','block');
        pbion_display('#only','none');
    }
    DBGetAll(pbion_popup_show_data,p);
}
function pbion_popup_show_data(response){
    var a = response.data;
    if(a.length>0 && response.next>1) pbion_css('#pages','display','block');
    var no = 0;
    pbion_empty('#videos2');
    for (var i = a.length - 1; i >= 0; i--) {
    //for (var i = 0; i < a.length; i++) {
        if(a[i].hide!=undefined) continue;
        no++;
        var video = pbion_popup_template_video(a[i]);
        pbion_prepend('#videos2',video);
        if(no==2 || no == a.length){
            var expire = '<p class="notice"><span style="color:red;">⚠</span> <span class="_text_expire">'+pbion_string('#_text_expire')+'</span></p>';
            pbion_prepend('#videos2',expire);
        }
        pbion_popup_image_zoom();
    }
    pbion_attr_set('#next','data-page',response.next);
    pbion_attr_set('#prev','data-page',response.prev);
}
function pbion_popup_search(){
    var keyword = pbion_value_get('#keyword');
    if(keyword==''){
        pbion_popup_suggestion_random(keyword);
        return;
    }
    else if(keyword.indexOf('//') > -1){
        var e = keyword.split('/')[2].toLowerCase().trim();
        if(_config.input_domains.indexOf(e) > -1){
            pbion_popup_loading_show();
            pbion_empty('#suggestqueries');
            pbion_display('#closesuggest','none');
            __a({action: "loader",url:keyword,popup:1},'');
            return;
        }
        else return;
    }
    sg = popup.suggestqueries.join(',').toString().replace(/\s/ig,'_');
    window.open('https://'+_config.domain+'/'+pbion.language+'/'+_config.slug+'.html?search='+keyword.replace(/\s/ig,'+')+'&sg='+sg);
}
function pbion_popup_suggestion_random(keyword) {
    if(keyword!='') return;
    var k           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    var length = (Math.random()<0.7)?2:3;
    for ( var i = 0; i < length; i++ ) {
        k += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    pbion_value_set('#keyword',k);
    document.querySelector('#keyword').select();
    pbion_popup_suggest_queries(k);
}
function pbion_popup_suggest_queries(q) {
    if(q.indexOf('://')>-1) return;
    pbion_get('https://suggestqueries.google.com/complete/search?client=chrome&ds=yt&q='+q,function (data) {
        o = JSON.parse(data);
        if(o[1]!=undefined){
            if(o[1].length>0){
                popup.suggestqueries = [];
                var sq = ''
                if(popup.presuggest!=''); sq += '<div>'+popup.presuggest+'</div>';
                for (var i = 0; i < o[1].length; i++) {
                    o1 = o[1][i];
                    if(q!=o1 && popup.suggestqueries.indexOf(o1)==-1) popup.suggestqueries.push(o1);
                    sq += '<div>'+o1+'</div>';
                }
                pbion_html('#suggestqueries',sq);
                pbion_display('#closesuggest','block');
                pbion_event('#suggestqueries div','click', function(){
                    var q2 = pbion_string(this);
                    pbion_value_set('#keyword',q2);
                    pbion_popup_suggest_queries(q2);
                    popup.presuggest = q;
                });
            }
        }
    });
}
function pbion_popup_settings_display(){
    pbion_a('.setting_value',function(e){
        var s = pbion_attr_get(e,'data-setting');
        var v = pbion_attr_get(e,'data-value');
        var l = (localStorage[s]!=undefined)?localStorage[s]:'';
        var icon = (v==l)?'checked':'close';
        pbion_html(pbion_find(e,'.checkbox'),'<img src="img/'+icon+'.svg">');
    });
}
function pbion_popup_events() {
    if(window.location.hash) {
        var h = window.location.hash;
        if(h!=''){
            pbion_value_set('#keyword',h.substring(1))
            pbion_popup_search();
        }
    }
    document.title = _config.name;
    pbion_text('#domain_copyright',_config.domain);
    pbion_attr_set('#visit_pbion','data-url','https://'+_config.domain+'/'+pbion.language+'/'+_config.slug+'.html');
    pbion_attr_set('#contact_us','data-url','https://'+_config.domain+'/contact-us.html?ref='+_config.slug);
    pbion_event('#next','click',function(){
        pbion_popup_get_data(pbion_attr_get('#next','data-page'));
    });
    pbion_event('#prev','click',function(){
        pbion_popup_get_data(pbion_attr_get('#prev','data-page'));
    });
    pbion_event('.shorturl','click', function(e){
        var shorturl = 'https://'+_config.domain+'/shorturl/'+pbion_attr_get(this,'data-shorturl');
        window.open(shorturl);
    });
    pbion_a('.visit_site',function(e) {
        pbion_attr_set(e,'data-url',_config.visit_site);
        pbion_attr_set(e,'title','Visit '+_config.visit_site);
    })
    pbion_event('.openurl','click', function(e){
        var url = pbion_attr_get(this,'data-url').replace('{lang}',pbion.language);
        window.open(url);
    });
    pbion_event('.openmodal','click', function(e){
        var _for = pbion_attr_get(this,'data-for');
        pbion_display('#modal_'+_for,'table-cell');
        if(_for=='settings'){
            pbion_popup_settings_display();
        }
    });
    pbion_event('.modal.autoclose','click', function(e){
        pbion_display('.modal','none');
    });
    pbion_event('.modal .close','click', function(e){
        pbion_display('.modal','none');
    });
    pbion_event('.star','mouseover',function(e){
        var star = pbion_attr_get(this,'data-star');
        for (var i = 1; i <= 5; i++) {
            if(i>star) pbion_html('.star[data-star="'+i+'"]','☆');
            else pbion_html('.star[data-star="'+i+'"]','★');
        }
    });
    pbion_event('.downloadswindow','click', function(e){
        pbion.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var t = 'chrome://downloads/';
        if(pbion.isFirefox) t = 'about:downloads';
        chrome.tabs.create({
            url: t
        });
    });
    pbion_event('#search','click', function(e){
        pbion_popup_search();
    });
    pbion_event("#keyword","keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            pbion_popup_search();
        }
    });
    pbion_event('#clearkeyword','click', function(e){
        pbion_value_set('#keyword','');
    });
    pbion_event('#keyword','click', function(e){
        this.select();
        var keyword = pbion_value_get('#keyword');
        pbion_popup_suggestion_random(keyword);
    });
    pbion_event('#keyword','keypress', function(){
        var q = pbion_value_get(this);
        if(q=='') {
            pbion_empty('#suggestqueries');
            pbion_display('#closesuggest','none');
            return;
        }
        pbion_popup_suggest_queries(q);
    });
    pbion_event('#closesuggest','click', function(){
        pbion_empty('#suggestqueries');
        pbion_display(this,'none');
        pbion_e('#keyword').focus();
    });
    pbion_event('.setting_value','click', function(e){
        var s = pbion_attr_get(this,'data-setting');
        var v = pbion_attr_get(this,'data-value');
        var l = localStorage[s];
        if(l==undefined) l == 'on';
        localStorage[s] = v;
        pbion_html('.setting_value[data-setting="'+s+'"] .checkbox','<img src="img/close.svg">');
        pbion_html(pbion_find(this,'.checkbox'),'<img src="img/checked.svg">');
        chrome.runtime.sendMessage({action: "localStorage",data:JSON.parse(JSON.stringify(localStorage))}, function(response) {
        });
    });
    pbion_event('.iconbuttons','click', function(e){
        var b = pbion_attr_get(this,'data-action');
        if(b=='eraser') {
            pbion_empty('#videos1');
            pbion_empty('#videos2');
        }
        else if(b=='permissions'){
            chrome.permissions.request({
                origins: _config.permissions
            }, function(granted) {
                if(granted) {
                    pbion_display('#permissions','none');
                } else {
                    pbion_display('#permissions','block');
                }
            });
            return;
        }
        var o = {action: b};
        var p = pbion_attr_get(this,'data-page');
        if(p!=undefined) o.page = p;
        chrome.runtime.sendMessage(o, function(response) {
        });
    });
}
function pbion_popup_show_language(extlanguage){
    var readlang = (_language[extlanguage]!=undefined)?_language[extlanguage]:_language.en;
    for (var key in readlang) {
        pbion_text('._text_'+key,readlang[key])
    }
}
function pbion_popup_change_language() {
    if(!localStorage.language) var extlanguage = pbion.language.toLowerCase().replace(/\-/g,'_');
    else var extlanguage = localStorage.language;
    var language_list = '';
    for (var key in _languages) {
        var langselected = (extlanguage!=key)?'':' langselected';
        language_list += '<p class="btn changelanguage'+langselected+'" data-value="'+key+'">'+_languages[key]+'</p>';
    }
    pbion_html('#language_list',language_list);
    pbion_event('.changelanguage','click', function(e){
        if(extlanguage == pbion_attr_get(this,'data-value')) return;
        extlanguage = pbion_attr_get(this,'data-value');
        localStorage.language = extlanguage;
        pbion_popup_show_language(extlanguage);
        pbion_popup_text_fit();
        pbion_a('.changelanguage',function(e) {
            pbion_class_remove(e,'langselected');
        })
        pbion_class_add(this,'langselected');
        chrome.runtime.sendMessage({action: "localStorage",data:JSON.parse(JSON.stringify(localStorage))}, function(response) {
        });
    });
    pbion_popup_show_language(extlanguage);
    pbion.language = extlanguage;
    pbion_popup_text_fit();
}
function pbion_popup_text_fit(){
    pbion_a('.fit',function(e){
        var fontsize = parseInt(pbion_attr_get(e,'data-size'));
        var padding = parseInt(pbion_css_get(e,'padding-left'));
        var m = e.scrollWidth;
        var w = pbion_width_get(e);
        var z = parseInt(w/(m - padding)*fontsize);
        if(z > fontsize) z = fontsize;
        pbion_css(e,'font-size',z+'px');
    });
}
function pbion_popup_ads() {
    b = '';
    c = pbion_shuffle(_config.ads);
    for (var i = 0; i < 1; i++) {
        b += c[i].replace('{link}','https://'+_config.domain+'/'+pbion.language+'/').replace('{ref}','?ref=avd');
    }
    pbion_html('#bn',b);
}
function log(value){
    if(typeof value === 'object') {
        var obj = {log:value}
        var res = JSON.stringify(obj);
    }
    else var res = value;
    pbion_display('#log','block');
    pbion_e('#console').value = res;
}

pbion_update_language();
//pbion_popup_ads();
window.addEventListener("load", function() {
    pbion_popup_resize();
    window.addEventListener('resize', function () {
        pbion_popup_resize();
    });
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if(chrome.scripting!=undefined){
            chrome.scripting.insertCSS({
                target: {tabId: tabs[0].id},
                files: ['player.css']
            },
            function() {
                //log(chrome.runtime.lastError);
                if(chrome.runtime.lastError!=undefined && pbion.isFirefox==false) {
                    pbion_display('#only','block');
                    pbion_popup_loading_hide();
                    return;
                }
                chrome.scripting.executeScript({
                    files: ['content.exe.js'],
                    target: {tabId: tabs[0].id, allFrames: true}
                },
                function(response) {
                    if(response==undefined){
                        pbion_popup_loading_hide();
                        return;
                    }
                    if(pbion.isFirefox && response!=undefined){
                        if(response[0]==null){
                            pbion_display('#only','block');
                            pbion_popup_loading_hide();
                            return;
                        }
                    }
                    var message = '';
                    var done = false;
                    response.forEach(function(result) {
                        if(result==undefined) {
                            message = 'undefined';
                            pbion_popup_loading_hide();
                            return;
                        }
                        if (result.status === 'loader_processing') {
                            message = 'Processing...';
                        } else if (result.status === 'loader_done') {
                            message = 'Done!';
                            pbion_popup_loading_hide();
                        } else if (result.status === 'buttons_added') {
                            message = 'Added!';
                            pbion_popup_loading_hide();
                        } else if (result.status === 'player_undefined') {
                            message = 'Added!';
                            pbion_popup_loading_hide();
                        } else if (result.status === 'script_undefined') {
                            message = 'Added!';
                            pbion_popup_loading_hide();
                        }
                        else {
                            pbion_popup_loading_hide();
                        }
                        return;
                    });
                })
            });
        }
        else{
            chrome.tabs.insertCSS(tabs[0].id,{
                file: 'player.css',
                allFrames: true
            },
            function() {
                if(chrome.runtime.lastError!==undefined && !pbion.isFirefox) {
                    pbion_display('#only','block');
                    pbion_popup_loading_hide();
                    return;
                }
                chrome.tabs.executeScript(tabs[0].id,{
                    file: 'content.exe.js',
                    allFrames: true
                },
                function(response) {
                    if(response==undefined){
                        pbion_popup_loading_hide();
                        return;
                    }
                    if(pbion.isFirefox && response!=undefined){
                        if(response[0]==null){
                            pbion_display('#only','block');
                            pbion_popup_loading_hide();
                            return;
                        }
                    }
                    var message = '';
                    var done = false;
                    response.forEach(function(result) {
                        if(result==undefined) {
                            message = 'undefined';
                            pbion_popup_loading_hide();
                            return;
                        }
                        if (result.status === 'loader_processing') {
                            message = 'Processing...';
                        } else if (result.status === 'loader_done') {
                            message = 'Done!';
                            pbion_popup_loading_hide();
                        } else if (result.status === 'buttons_added') {
                            message = 'Added!';
                            pbion_popup_loading_hide();
                        } else if (result.status === 'player_undefined') {
                            message = 'Added!';
                            pbion_popup_loading_hide();
                        } else if (result.status === 'script_undefined') {
                            message = 'Added!';
                            pbion_popup_loading_hide();
                        }
                        else {
                            pbion_popup_loading_hide();
                        }
                        return;
                    });
                })
            });

        }
    });
    chrome_permissions();
    setTimeout(function(){
        pbion_popup_get_data(1);
    },500);
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "loader"){
        pbion_popup_loading_show();
        request.popup = 1;
        __a(request,'');
    }
    else if (request.action == "done"){
        pbion_popup_loading_hide();
    }
});

pbion_popup_change_language();
pbion_popup_events();

/*setTimeout(function(){
    pbion_analytics(['popup','open']);
},100);*/

function removed_window(argument) {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}