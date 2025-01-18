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
if(document.URL.indexOf(_config.slug+'.html') > -1){
    function pbion_hash_loader(){
        var h = window.location.hash.substring(1);
        if(h.indexOf('data=')==-1){
            var x = h.split('/');
            if(x[2]!=undefined){
                if(_config.input_domains.indexOf(x[2]) > -1) chrome.runtime.sendMessage({action: 'pbloader',id:'',url:h});
            }
        }
    }
    var e = document.getElementById('extension');
    if(e!=undefined){
        e.value = _config.slug;
        setInterval(function(){
            var request = {action: "bgsupport"};
            if(e.hasAttribute('data-user')) request.user = e.getAttribute('data-user');
            if(e.hasAttribute('data-group')) request.group = e.getAttribute('data-group');
            if(e.hasAttribute('data-id')) request.id = e.getAttribute('data-id');
            chrome.runtime.sendMessage(request,function(r){
                e.setAttribute('data-related',JSON.stringify(r.related));
                if(r.data=='') return;
                r.data.preview = decodeURIComponent(r.data.preview);
                for (var i = 0; i < r.data.formats.length; i++) {
                    r.data.formats.url = decodeURIComponent(r.data.formats.url);
                }
                for (var i = 0; i < r.data.streams.length; i++) {
                    r.data.streams.stream = decodeURIComponent(r.data.streams.stream);
                }
                e.setAttribute('data-json',JSON.stringify(r.data));
            });
        },1000);
    }
    var latestversion = document.getElementById('latestversion');
    if(latestversion!=null){
        var o = 0;
        var v1 = latestversion.innerText.split('.');
        var v2 = chrome.runtime.getManifest().version;
        if(v1[0] < v2[0]) o = 1;
        else if(v1[1] < v2[1]) o = 1;
        else if(v1[2] < v2[2]) o = 1;
        if(o==1){
            document.getElementById('olderversion').style.display = 'none';
        }
    }
    window.addEventListener('hashchange',function(){
        pbion_hash_loader();
    });
    pbion_hash_loader();
}
