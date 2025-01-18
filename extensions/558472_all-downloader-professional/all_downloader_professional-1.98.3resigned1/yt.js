"use strict";

function YTScan() {
    this.init();
}

YTScan.prototype = {
    aRequests : [],
    running : true,
    mainURL : false,
    mainTitle : false,
    init : function () {
        this.running = true;
    },
    exit : function () {
        this.aRequests.forEach(function (req) {
            req.abort();
            req = 0;
        });
        this.running = false;
        this.aRequests = [];
    },
    VideoSites : [{
            "url" : "http://youtube.com",
            "filterUrl" : "^http:\/\/(?:www\.)?youtube.com\/watch\?",
            "filter" : "youtube.com",
            "name" : "youtube.com"
        }, {
            "url" : "http://youtube.com",
            "filterUrl" : "^https:\/\/(?:www\.)?youtube.com\/watch\?",
            "filter" : "youtube.com",
            "name" : "youtube.com"
        }, {
            "url" : "http://youtube.com",
            "filterUrl" : "^http:\/\/(?:www\.)?youtube.com\/movie\?",
            "filter" : "youtube.com",
            "name" : "youtube.com"
        }, {
            "url" : "http://youtube.com",
            "filterUrl" : "^https:\/\/(?:www\.)?youtube.com\/movie\?",
            "filter" : "youtube.com",
            "name" : "youtube.com"
        }, {
            "url" : "http://youtube.com",
            "filterUrl" : "^http:\/\/(?:www\.)?youtube.com\/embed\?",
            "filter" : "youtube.com",
            "name" : "youtube.com"
        }, {
            "url" : "http://youtube.com",
            "filterUrl" : "^https:\/\/(?:www\.)?youtube.com\/embed\?",
            "filter" : "youtube.com",
            "name" : "youtube.com"
        }, {
            "url" : "http://youtube.com",
            "filterUrl" : "^http:\/\/(?:www\.)?youtube.com\/v\/\?",
            "filter" : "youtube.com",
            "name" : "youtube.com"
        }, {
            "url" : "http://youtube.com",
            "filterUrl" : "^https:\/\/(?:www\.)?youtube.com\/v\/\?",
            "filter" : "youtube.com",
            "name" : "youtube.com"
        }, {
            "url" : "http://vimeo.com",
            "filterUrl" : "^.*(vimeo\.com\/)((channels\/[a-zA-Z0-9]+\/)|(groups\/[a-zA-Z0-9]+\/videos\/))?([0-9]+)",
            "filter" : "vimeo.com",
            "name" : "vimeo.com"
        }, {
            "url" : "http://dailymotion.com",
            "filterUrl" : "^http:\/\/(?:www\.)?dailymotion.com\/video\?",
            "filter" : "dailymotion.com",
            "name" : "dailymotion.com"
        }, {
            "url" : "http://www.collegehumor.com",
            "filterUrl" : "^http:\/\/(?:www\.)?collegehumor.com\/video\?",
            "filter" : "collegehumor.com",
            "name" : "collegehumor.com"
        }
    ],
    
    VideoFormats : {
        5 : {
            resolution : '240p',
            h : 240,
            mime : 'video/x-flv'
        },
        6 : {
            resolution : '270p',
            h : 270,
            mime : 'video/x-flv'
        },
        34 : {
            resolution : '360p',
            h : 360,
            mime : 'video/x-flv'
        },
        35 : {
            resolution : '480p',
            h : 480,
            mime : 'video/x-flv'
        },
        17 : {
            resolution : '144p',
            h : 144,
            mime : 'video/3gp'
        },
        36 : {
            resolution : '240p',
            h : 240,
            mime : 'video/3gp'
        },
        18 : {
            resolution : '360p',
            h : 360,
            mime : 'video/mp4'
        },
        22 : {
            resolution : '720p',
            h : 720,
            mime : 'video/mp4'
        },
        37 : {
            resolution : '1080p',
            h : 1080,
            mime : 'video/mp4'
        },
        38 : {
            resolution : '2304p',
            h : 2304,
            mime : 'video/mp4'
        },
        43 : {
            resolution : '360p',
            h : 360,
            mime : 'video/webm'
        },
        44 : {
            resolution : '854p',
            h : 854,
            mime : 'video/webm'
        },
        45 : {
            resolution : '1280p',
            h : 1280,
            mime : 'video/webm'
        },
        46 : {
            resolution : '1920p',
            h : 1920,
            mime : 'video/webm'
        },
        59 : {
            resolution : '480p',
            h : 480,
            mime : 'video/mp4'
        },
        78 : {
            resolution : '480p',
            h : 480,
            mime : 'video/mp4'
        },
        
        83 : {
            resolution : '240p 3D',
            h : 240,
            mime : 'video/mp4'
        },
        82 : {
            resolution : '360p 3D',
            h : 360,
            mime : 'video/mp4'
        },
        85 : {
            resolution : '520p 3D',
            h : 520,
            mime : 'video/mp4'
        },
        84 : {
            resolution : '720p 3D',
            h : 720,
            mime : 'video/mp4'
        },
        
        100 : {
            resolution : '360p 3D',
            h : 360,
            mime : 'video/webm'
        },
        101 : {
            resolution : '420p 3D',
            h : 480,
            mime : 'video/webm'
        },
        102 : {
            resolution : '720p 3D',
            h : 720,
            mime : 'video/webm'
        },
        
        133 : {
            resolution : '240p',
            h : 240,
            mime : 'video/mp4',
            dash : true
        },
        134 : {
            resolution : '360p',
            h : 360,
            mime : 'video/mp4',
            dash : true
        },
        135 : {
            resolution : '480p',
            h : 480,
            mime : 'video/mp4',
            dash : true
        },
        136 : {
            resolution : '720p',
            h : 720,
            mime : 'video/mp4',
            dash : true
        },
        137 : {
            resolution : '1080p',
            h : 1080,
            mime : 'video/mp4',
            dash : true
        },
        138 : {
            resolution : 'variable',
            h : 1081, 
            mime : 'video/mp4',
            dash : true
        },
        139: {
            resolution: '48kbs ',
            h: 48,
            mime: 'audio/m4a',
            audio: true
        },
        140: {
            resolution: '128kbs',
            h: 128,
            mime: 'audio/m4a',
            audio: true
        },
        141: {
            resolution: '256kbs',
            h: 256,
            mime: 'audio/m4a',
            audio: true

        },
        160 : {
            resolution : '144p',
            h : 144,
            mime : 'video/mp4',
            dash : true
        },
        212 : {
            resolution : '480p',
            mime : 'video/mp4',
            dash : true
        },
        
        167 : {
            resolution : '360p',
            h : 360,
            mime : 'video/webm',
            dash : true
        },
        168 : {
            resolution : '480p',
            h : 480,
            mime : 'video/webm',
            dash : true
        },
        169 : {
            resolution : '720p',
            h : 720,
            mime : 'video/webm',
            dash : true
        },
        170 : {
            resolution : '1080p',
            h : 1080,
            mime : 'video/webm',
            dash : true
        },
        218 : {
            resolution : '480p',
            h : 480,
            mime : 'video/webm',
            dash : true
        },
        219 : {
            resolution : '480p',
            h : 480,
            mime : 'video/webm',
            dash : true
        },
        278 : {
            resolution : '144p',
            h : 144,
            mime : 'video/webm',
            dash : true
        },
        242 : {
            resolution : '240p',
            h : 240,
            mime : 'video/webm',
            dash : true
        },
        243 : {
            resolution : '360p',
            h : 360,
            mime : 'video/webm',
            dash : true
        },
        244 : {
            resolution : '480p',
            h : 480,
            mime : 'video/webm',
            dash : true
        },
        247 : {
            resolution : '720p',
            h : 720,
            mime : 'video/webm',
            dash : true
        },
        
        264 : {
            resolution : '1440p',
            h : 1440,
            mime : 'video/mp4',
            dash : true
        },
        266 : {
            resolution : '2160p',
            h : 2160,
            mime : 'video/mp4',
            dash : true
        },
        248 : {
            resolution : '1080p',
            h : 1080,
            mime : 'video/webm',
            dash : true
        },
        271 : {
            resolution : '1440p',
            h : 1440,
            mime : 'video/webm',
            dash : true
        },
        272 : {
            resolution : '2160p',
            h : 2160,
            mime : 'video/webm',
            dash : true
        },
        298 : {
            resolution : '720p60',
            h : 720,
            mime : 'video/webm',
            dash : true
        },
        299 : {
            resolution : '1080p60',
            h : 1080,
            mime : 'video/mp4',
            dash : true
        },
        
        302 : {
            resolution : '720p60',
            h : 720,
            mime : 'video/webm',
            dash : true
        },
        303 : {
            resolution : '1080p60',
            h : 1080,
            mime : 'video/webm',
            dash : true
        },
        308 : {
            resolution : '1440p60',
            h : 1440,
            mime : 'video/webm',
            dash : true
        },
        313 : {
            resolution : '2160p',
            h : 2160,
            mime : 'video/webm',
            dash : true
        },
        315 : {
            resolution : '1080p',
            h : 1080,
            mime : 'video/webm',
            dash : true
        }

    },
    DownloadTextFile : function (url, options, callback) {
        //const XMLHttpRequest = Components.Constructor("@mozilla.org/xmlextras/xmlhttprequest;1", "nsIXMLHttpRequest");
        var xmlHttpReq = new XMLHttpRequest();
        
        xmlHttpReq.open("GET", url, true);
        if (options && options.beiPad) {
            xmlHttpReq.setRequestHeader('User-Agent', "Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5");
            //xmlHttpReq.setRequestHeader('Cookie', '');
        }
        xmlHttpReq.onreadystatechange = function (data) {
            if (this.readyState != 4)
                return;
            var txt = this.responseText;
            if (callback) {
                callback(txt);
            }
        }
        xmlHttpReq.send(null);
        return xmlHttpReq;
    },
    IsSupportedVideoPage : function (url) {
        if (Object.prototype.toString.call(this.VideoSites) === '[object Array]') {
            for (var i = 0; i < this.VideoSites.length; i++) {
                if (url.match(new RegExp(this.VideoSites[i].filterUrl))) {
                    return true;
                }
            }
        }
        return false;
    },
    CheckVideo : function (video, callback) {
        var playable = this.HasPlayableStreams(video);
        var inst = this;
        if (playable) {
            callback(inst.SortVideos(video));
            return;
        }
        this.DownloadAndParse(video, function (video) {
            playable = inst.HasPlayableStreams(video);
            callback(inst.SortVideos(video));
            return;
        });
    },
    
    SortVideos : function (video) {
        var aStreams = [];
        for (var iTag in video.streams) {
            var stream = video.streams[iTag];
            var bAdd = true;
            if (stream.format.dash || !stream.playable) {
                bAdd = aStreams.every(function (vstream) {
                    if (vstream.format.h == stream.format.h) {
                        return false;
                    }
                    return true;
                });
            }
            if (bAdd) {
                aStreams.push(video.streams[iTag]);
            }
        }
        aStreams.sort(function (a, b) {
            return a.format.h - b.format.h;
        });
        video.streams = aStreams;
        return video;
    },
    ParseStreamMaps2 : function (maps, result) {
        for (var mapName in maps) {
            
            var list = maps[mapName];
            if (typeof (list) != "string") {
                return result;
            }
            list = list.split(",");
            
            var URL = "url=";
            var ITAG = "itag=";
            var SIG = "sig=";
            
            for (var i = 0; i < list.length; i++) {
                var ytVideo = {
                    itag : false,
                    url : false,
                    sig : false,
                };
                
                var p = list[i].split("\\u0026");
                var url = false;
                for (var j = 0; j < p.length; j++) {
                    if (p[j].indexOf(URL) == 0) {
                        ytVideo.url = p[j].split(URL)[1];
                        if (ytVideo.url.toLowerCase().indexOf("https%3a%2f%2f") >= 0 || ytVideo.url.toLowerCase().indexOf("http%3a%2f%2f") >= 0)
                            ytVideo.url = unescape(ytVideo.url);
                    }
                    if (p[j].indexOf(ITAG) == 0) {
                        ytVideo.itag = parseInt(p[j].split(ITAG)[1]);
                    }
                    if (p[j].indexOf(SIG) == 0) {
                        ytVideo.sig = p[j].split(SIG)[1];
                    }
                }
                if (ytVideo.sig && ytVideo.url && ytVideo.url.indexOf("signature") == -1) {
                    ytVideo.url += "&signature=" + ytVideo.sig;
                }
                if (ytVideo.url) {
                    if (result === false) {
                        result = {};
                    }

                    ytVideo.format = this.VideoFormats[ytVideo.itag];
                    if (ytVideo.format) {
                        result[ytVideo.itag] = ytVideo;
                    }
                }
            }
        }
        return result;
    },
    DownloadAndParse : function (video, callback) {
        if (!this.running) {
            return;
        }
        if (typeof (callback) != 'function') {
            return;
        }
        if (!video) {
            callback(video);
            return;
        }
        if (!video.url) {
            return;
        }
        var url = video.url;
        if ((url.indexOf("youtube.com") < 0) 
			 && (url.indexOf("privatesearch.net") < 0)) {
            callback(video);
            return;
        }
        var inst = this;
        if (video) {
            var req = inst.DownloadTextFile(url, video.state ? {
                beiPad : true
            }
					 : {}, function (html) {
                video.state++;
                if (typeof (html) != "string") {
                    return;
                }
                var response = {};
                if (!response.stream_map) {
                    var s = '\"url_encoded_fmt_stream_map\":\"';
                    var j1 = html.indexOf(s);
                    if (j1 >= 0) {
                        j1 += s.length;
                        var j2 = html.indexOf('\"', j1);
                        if (j2 > j1)
                            response.stream_map_txt = html.substr(j1, j2 - j1);
                        else
                            response.stream_map_txt = html.substr(j1);
                    }
                }
                
                if (!response.adaptive_fmts) {
                    var s = '\"adaptive_fmts\":\"';
                    var j1 = html.indexOf(s);
                    if (j1 >= 0) {
                        j1 += s.length;
                        var j2 = html.indexOf('\"', j1);
                        if (j2 > j1)
                            response.adaptive_fmts = html.substr(j1, j2 - j1);
                        else
                            response.adaptive_fmts = html.substr(j1);
                    }
                }
                
                video.streams = inst.ParseStreamMaps2(response, video.streams);
                if (!inst.HasPlayableStreams(video) 
						 && (video.state <= 1)) {
                    inst.DownloadAndParse(video, callback);

                } else {
                    callback(video);
                }
            });
            this.aRequests.push(req);
        }
    },
    ConvertEmbedUrl : function (url) {
        var j = url.toLowerCase().indexOf("/embed/");
        var id;
        if (j >= 0)
            id = url.substr(j + 7);
        else {
            j = url.toLowerCase().indexOf("/v/");
            if (j >= 0)
                id = url.substr(j + 3);
            else
                return false;
        }
        j = id.indexOf('?');
        if (j >= 0)
            id = id.substr(0, j);
        return "https://www.youtube.com/watch?v=" + id;
    },
    ParseStreamMaps : function (maps, result) {
        for (var mapName in maps) {
            var list = maps[mapName];
            if (typeof (list) != "string") {
                return result;
            }
            list = list.split(",");
            
            var URL = "url=";
            var ITAG = "itag=";
            var SIG = "sig=";
            
            for (var i in list) {
                var ytVideo = {
                    itag : false,
                    url : false,
                    sig : false,
                };
                
                list[i] = list[i].replace("\\u0026", "&");
                var p = list[i].split("&");
                var url = false;
                for (var j in p) {
                    if (p[j].indexOf(URL) == 0) {
                        ytVideo.url = p[j].split(URL)[1];
                        ytVideo.url = unescape(ytVideo.url);
                    }
                    if (p[j].indexOf(ITAG) == 0) {
                        ytVideo.itag = parseInt(p[j].split(ITAG)[1]);
                    }
                    if (p[j].indexOf(SIG) == 0) {
                        ytVideo.sig = p[j].split(SIG)[1];
                    }
                }
                if (ytVideo.sig && ytVideo.url && ytVideo.url.indexOf("signature") == -1) {
                    ytVideo.url += "&signature=" + ytVideo.sig;
                }
                if (ytVideo.url) {
                    if (result === false) {
                        result = {};
                    }

                    ytVideo.format = this.VideoFormats[ytVideo.itag];
                    //if (ytVideo.format)
                    //console.log("b " + ytVideo.itag+ "  "+ytVideo.format.mime);
                    if (ytVideo.format) {
                        result[ytVideo.itag] = ytVideo;
                    }
                }
            }
        }
        return result;
    },
    
    HasPlayableStreams : function (video) {
        if (!video) {
            return false;
        }
        if (typeof (video.streams) !== 'object') {
            return false;
        }
        var hasPlayable = false;
        for (var iTag in video.streams) {
            var element = video.streams[iTag];
            if ((element.url) 
				 && (element.url.indexOf("signature=") != -1)) {
                video.streams[iTag].playable = true;
                hasPlayable = true;
            } else {
                video.streams[iTag].playable = false;
            }
        }
        return hasPlayable;
    },
    
    GetVideos : function (data, callback) {
        var aVideos = [];
        /// see if we have stream maps
        if (Object.keys(data.maps).length) {
            var video = {
                url : data.url,
                title : data.title,
                streams : false,
                isYT : true,
                state : 1
            }
            video.streams = this.ParseStreamMaps(data.maps, video.streams);
            aVideos.push(video)
        }
        var inst = this;
        
        if (Object.prototype.toString.call(data.embeds) === '[object Array]') {
            data.embeds.forEach(function (embed) {
                if (inst.IsSupportedVideoPage(embed.url)) {
                    var video = {
                        url : inst.ConvertEmbedUrl(embed.url),
                        title : embed.title,
                        streams : false,
                        isYT : true,
                        state : 0
                    }
                    aVideos.push(video)
                }
            });
        }
        var inst = this;
        if (!aVideos.length) {
            callback(false);
        }
        
        aVideos.forEach(function (video) {
            setTimeout(function () {
                inst.CheckVideo(video, callback);
            }, 20);

        })
    },
}
