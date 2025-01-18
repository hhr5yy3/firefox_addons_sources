PTAddonConfig = {
    CS_EXCLUDED_DOMAINS: [
        /^(.*?\.|)pearltrees\.com/,
        /^(.*?\.|)broceliand\.com/,
        /^(.*?\.|)broceliand\.fr/,
        /^(.*?\.|)dropbox\.com/,
        /^(.*?\.|)mail\.google\.com/,
        /^(.*?\.|)gmail\.com/
    ],
    CS_EXCLUDED_PATTERN: [
        /^(.)*_\/chrome\/newtab(.)*/
    ],
    CS_NEED_SCROLL_LIST: [
        /^(.*?\.|)pinterest\.com/
    ],
    CS_ALLOWED_TAG_LIST: [
        "DIV",
        "IFRAME",
        "EMBED",
        "IMG",
        "OBJECT",
        "VIDEO"
    ],
    CS_RESTRICT_BY_TAG_LIST: [
        {
            tagName : "DIV",
            isAllowed : function(pageUrl, target) {
                var patterns = [
                    /youtube.com\/watch\?(?=.*v=\w+)(?:\S+)?$/,
                    /vimeo\.com\/([^\&\?\/]+)/
                ];
                for (var j = 0; j < patterns.length; j++) {
                    if (pageUrl != null && pageUrl.match(patterns[j])) {
                        return true;
                    }
                }
                return false;
            }
        },
        {
            tagName : "IMG",
            isAllowed: function(pageUrl, target) {
                var youtubeRegex = /youtube.com\/watch\?(?=.*v=\w+)(?:\S+)?$/;
                if (pageUrl.match(youtubeRegex)) { //exclude for mini image inside youtube video
                    var isPromoOfOtherVideo = target.parentNode.className.indexOf("iv-promo-img") >= 0;
                    var isThumbnailBeforeSkippingAd = target.parentNode.className.indexOf("videoAdUiPreSkipThumbnail") >= 0;
                    return !isPromoOfOtherVideo && !isThumbnailBeforeSkippingAd;
                }
                var srcUrl = PTAddonConfig.getAttr(target, "src"); //exclude gif file
                if (srcUrl && srcUrl.substring(srcUrl.length - 4) == ".gif") {
                    return false;
                }
                return true;
            }
        }
    ],
    //Only getUrl must be used by client scripts
    CS_VIDEO_PATTERNS : [ //Embeds
        //YOUTUBE
        {
            getUrl : function(pageUrl, target) {
                var tag = "IFRAME";
                var layout = "embed";
                var urlPattern = /youtube\.com\/embed\/([^\&\?\/]+)/;
                if (target.tagName !== tag) {
                    return null;
                }
                var targetUrl = PTAddonConfig.getAttr(target, "src");
                if (targetUrl.match(urlPattern)) {
                    var id;
                    var url = targetUrl.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                    var isPlaylist = targetUrl.indexOf("videoseries") > 0;
                    if (url[2] !== undefined) {
                    	if (isPlaylist) {
                    		id = url[2].split(/[\?=&]/);
                    		id = id[2];
                    	}
                    	else {
                    		id = url[2].split(/[^0-9a-z_-]/i);
                    		id = id[0];
                    	}
                    }
                    else {
                        id = url;
                    }
                    if (isPlaylist) {
                    	return {url: "https://www.youtube.com/playlist?list=" + id, layout: layout};
                    }
                    return {url: "https://www.youtube.com/watch?v=" + id, layout: layout};
                }
                return null;
            },
            specialOffset: function(target, browser) {
                if (browser == "firefox") {
                    return {top: 0, left: -40}; //outside video
                }
                return {top: 30, left: 0}; //do not hide the title
            }
        },
        //DAILYMOTION
        {
            getUrl : function(pageUrl, target) {
                var tag =  "IFRAME";
                var layout = "embed";
                var urlPattern = /dailymotion\.com\/embed\/video\/([^\&\?\/]+)/;
                if (target.tagName !== tag) {
                    return null;
                }
                var targetUrl = PTAddonConfig.getAttr(target, "src");
                if (targetUrl.match(urlPattern)) {
                    var id;
                    var m = targetUrl.match(/^.+dailymotion.com\/embed\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                    if (m !== null) {
                        id = m[2];
                        return {url: "http://www.dailymotion.com/video/" + id, layout: layout};
                    }
                }
                return null;
            },
            specialOffset: function(target, browser) {
                return {top: 0, left: -40}; //outside video
            }
        },
        //VIMEO
        {
            getUrl : function(pageUrl, target) {
                var tag = "EMBED";
                var layout = "embed";
                var urlPattern = /vimeo\.com\/(?:watch\?v=)?(.*?)(?:\z|$|&)/;
                if (target.tagName !== tag) {
                    return null;
                }
                var targetUrl = PTAddonConfig.getAttr(target, "src");
                if (targetUrl.match(urlPattern)) {
                    return {url: targetUrl, layout: layout};
                }
                return null;
            },
            specialOffset: function(target, browser) {
                if (browser == "firefox") {
                    return {top: 0, left: -40}; //outside video
                }
                return null;
            }
        },
        {
            getUrl : function(pageUrl, target) {
                var tag = "IFRAME";
                var layout = "embed";
                var urlPattern = /vimeo\.com\/video\/([^\&\?\/]+)/;
                if (target.tagName !== tag) {
                    return null;
                }
                var targetUrl = PTAddonConfig.getAttr(target, "src");
                if (targetUrl.match(urlPattern)) {
                    var m = targetUrl.match(urlPattern);
                    if (m[1]) {
                        return {url: "http://vimeo.com/" + m[1], layout: layout};
                    }
                }
                return null;
            },
            specialOffset: function(target, browser) {
                if (browser == "firefox") {
                    return {top: 0, left: -40}; //outside video
                }
                return null;
            }
        },
        {
            getUrl : function(pageUrl, target) {
                var tag = "IFRAME";
                var layout = "embed";
                var urlPattern = /twitter\.com/;
                var iframePattern = /twitter\.com\/i\/cards/;
                if (target.tagName !== tag) {
                    return null;
                }
                if (!pageUrl.match(urlPattern)) {
                	return null;
                }
                var targetUrl = PTAddonConfig.getAttr(target, "src");
                if (targetUrl.match(iframePattern)) {
                	var links = this.getLinks(target)
                	for (var i = 0; i < links.length; i++) {
                		if (typeof links[i] !== 'undefined' && links[i]) {
                			var url = links[i];
                			if (url && (url.indexOf("youtube") > 0 || url.indexOf("youtu.be") > 0 || url.indexOf("dai.ly") > 0 || url.indexOf("dailymotion.com") > 0 || url.indexOf("vimeo.com") > 0 || url.indexOf("vine.co") > 0)) {
                				return {url: url, layout: layout};
                			}
                		}
                	}
                }
                return null;
            },
            getLinks : function(target) {
            	var parentNode = null;
            	try {
            		parentNode = target.parentNode.parentNode.parentNode;
            	}
            	catch(e){ }
            	if (parentNode != null) {
            		try {
                		var links = parentNode.getElementsByClassName('twitter-timeline-link');
                		var resLinks = new Array(links.length);
                		for (var i = 0; i < links.length; i++) {
	                		if (typeof links[i] !== 'undefined' && links[i]) {
	                			var url = PTAddonConfig.getAttr(links[i], "data-expanded-url");
	                			resLinks[i] = url;
	                		}
	            		}
                		return resLinks;
            		}
            		catch (e) {	
            		}
            	}
            	return null;
            },
            specialOffset: function(target, browser) {
            	var links = this.getLinks(target)
            	for (var i = 0; i < links.length; i++) {
            		if (typeof links[i] !== 'undefined' && links[i]) {
            			var url = links[i];
            			if (url && (url.indexOf("youtube") > 0 || url.indexOf("youtu.be")) > 0) {
            				return {top: 60, left: 0};
            				
            			} else if (url && (url.indexOf("dai.ly") > 0 || url.indexOf("dailymotion.com") > 0 || url.indexOf("vimeo.com")) > 0 || url.indexOf("vine.co") > 0) {
            				return {top: 35, left: 0};
            			}
            		}
            	}
            	return {top: 0, left: 0};
        	}
        }
    ],
    getHtml5Video: false,
    bingBeforeOverContent : "",
    bingBeforeOverId : "",
    CS_SPECIAL_SITE : [
        //GOOGLE IMAGE
        {
            specialOffset : function(target, browser) {
                var style = target.currentStyle || window.getComputedStyle(target);
                return {top: -1 * parseInt(style.marginTop, 10), left: -1 * parseInt(style.marginLeft, 10)};
            },
            overrideMargins : true,
            getUrl : function(pageUrl, target) {
                var urlPattern = /^https?:\/\/www\.google\.fr\/search(.*&tbm=isch.*)/;
                var layout = "image";
                if (pageUrl.match(urlPattern)) {
                    if (target.tagName === "IMG") {
                        var ahrefNode = target.parentNode;
                        if (ahrefNode.tagName === "A") {
                            var meta = PTAddonConfig.getAttr(ahrefNode, "href");
                            if (meta) {
                                meta = meta.split("imgrefurl=");
                                if (meta[1]) {
                                    var url = meta[0].split('imgurl=');
                                    if (url[1]) {
                                        return {url: decodeURIComponent(url[1].split('&')[0].replace(/%2525/g, "%25")), layout: layout};
                                    }
                                }
                            }
                        }
                    }
                }
                return null;
            }
        },
        //BING IMAGE
        {
            overrideMargins : false,
            getUrl : function(pageUrl, target) {
                var urlPattern = /^https?:\/\/www\.bing\.com\/images\/search\?q=/;
                var layout = "image";
                if (pageUrl.match(urlPattern)) {
                    if (target.tagName === "IMG") {
                        var ahrefNode = target.parentNode;
                        if (ahrefNode.tagName === "A") {
                            var meta = PTAddonConfig.getAttr(ahrefNode, "m");
                            if (meta) {
                                PTAddonConfig.bingBeforeOverId = PTAddonConfig.getAttr(ahrefNode, "ihk");
                                var split = meta.split('imgurl:"');
                                if (split[1]) {
                                    PTAddonConfig.bingBeforeOverContent = split[1].split('"')[0];
                                    return {url: PTAddonConfig.bingBeforeOverContent, layout: layout};
                                }
                            }
                        }
                        var imgUrl = PTAddonConfig.getAttr(target, "src");
                        if (imgUrl.indexOf(PTAddonConfig.bingBeforeOverId) >= 0) {
                            return {url: PTAddonConfig.bingBeforeOverContent, layout: layout};
                        }
                    }
                }
                return null;
            }
        },
        //YOUTUBE
        {
            overrideMargins : false,
            getUrl : function(pageUrl, target) {
                var urlPattern = /youtube.com\/watch\?(?=.*v=\w+)(?:\S+)?$/;
                var layout = "embed";
                if (pageUrl.match(urlPattern)) {
                    if (target.tagName === "OBJECT") {
                        return {url: pageUrl, layout: layout};
                    }
                    if (target.tagName === "EMBED") {
                        return {url: pageUrl, layout: layout};
                    }
                    if (target.tagName === "DIV" && PTAddonConfig.getAttr(target, 'class') === 'html5-video-container') {
                        return {url: pageUrl, layout: layout};
                    }
                    if (target.tagName === "VIDEO" && PTAddonConfig.getAttr(target, 'class') ===  'video-stream html5-main-video') {
                        return {url: pageUrl, layout: layout};
                    }
                }
                return null;
            }
        },
        //YOUTUBE
        {
        	specialOffset : function(target, browser) {
        		if (target.tagName === "IMG" && target.parentNode) {
        			if (target.parentNode.tagName === "SPAN") {
        				return {top: 12, left: 0};
        			}
        			return null;
        		}
        	},
            overrideMargins : false,
            getUrl : function(pageUrl, target) {
                var urlPattern = /youtube\.com/;
                var layout = "embed";
                if (pageUrl.match(urlPattern)) {
                    if (target.tagName === "IMG" && target.parentNode) {
                        var grandPaNode = target.parentNode.parentNode;
                        if (grandPaNode && grandPaNode.tagName === "A") {
                            var meta = PTAddonConfig.getAttr(grandPaNode, "href");
                            if (meta && meta.indexOf("/watch?") > 0) {
                                var url = meta;
                                if (meta.indexOf("http") !== 0) {
                                    url = "http://www.youtube.com" + meta;
                                }
                                return {url: url, layout: layout};
                            }
                        }
                    }
                    return null;
                }
            }
        },
        //DAILYMOTION
        {
            overrideMargins : false,
            getUrl : function(pageUrl, target) {
                var urlPattern = /dailymotion\.com\/video\/([^\&\?\/]+)/;
                var layout = "embed";
                if (pageUrl.match(urlPattern)) {
                    if (target.tagName === "OBJECT") {
                        return {url: pageUrl, layout: layout};
                    }
                }
                return null;
            }
        },
        //VIMEO
        {
            overrideMargins : false,
            getUrl : function(pageUrl, target) {
                var urlPattern = /vimeo\.com\/([^\&\?\/]+)/;
                var layout = "embed";
                if (pageUrl.match(urlPattern)) {
                    if (target.tagName === "DIV" && PTAddonConfig.getAttr(target, "class") != null && PTAddonConfig.getAttr(target, "class").indexOf("video") >= 0) {
                        return {url: pageUrl, layout: layout};
                    }
                }
                return null;
            }
        },
        //TWITTER
        {
            overrideMargins : false,
            getUrl : function(pageUrl, target) {
                var urlPattern = /twitter\.com/;
                if (pageUrl.match(urlPattern) && target && target.tagName === "IMG") {
                    var overridePageUrl = pageUrl;
                    if (target.parentNode.parentNode && target.parentNode.parentNode.tagName === "A") {
                        overridePageUrl = target.parentNode.parentNode.getAttribute("href");
                        if (overridePageUrl.indexOf("//") == 0) {
                            overridePageUrl = window.location.protocol + overridePageUrl;
                        }
                    }
                    return {url: target.getAttribute("src"), layout: "image", pageUrl: overridePageUrl}
                }
            },
            specialOffset : function(target, browser) {
            	var parentClass = null;
            	try {
            		parentClass = PTAddonConfig.getAttr(target.parentNode, "class");
            	}
            	catch (e) {}
            	if (parentClass != null && parentClass.indexOf("Gallery-media") >= 0) {
            		return {top: window.pageYOffset, left: 0};
            	}
                var style = target.currentStyle || window.getComputedStyle(target);
                return {top: -1 * parseInt(style.marginTop, 10), left: 0};
            }
        },
        //AMAZON
        {
            getUrl : function(pageUrl, target) {
                var urlPattern = /:\/\/www.amazon\./;
                if (pageUrl.match(urlPattern) && target.tagName == "IMG") {
                    var aTagParentNode = PTAddonConfig.findATagParentNode(target);
                    if (aTagParentNode && PTAddonConfig.getAttr(aTagParentNode, "href")) {
                        var productLink = PTAddonConfig.getAttr(aTagParentNode, "href");
                        if (productLink) {
                            return {url: productLink, layout: "link", pageUrl: pageUrl};
                        }
                    }
                }
                return null;
            }
        }
    ],
    //For sites which need special positioning
    CS_OFFSET_SITE : [
        //Twitter
        {
            getOffsets: function(pageUrl, target) {
                var urlPattern = /twitter\.com/;
                if (pageUrl.match(urlPattern)) {
                    var style = target.currentStyle || window.getComputedStyle(target);
                    return {top: -1 * parseInt(style.marginTop, 10), left: 0};
                }
                return null;
            }
        },
        //Youtube embed
        {
            getOffsets: function(pageUrl, target) {

            }
        }
    ],
    //For sites which need overridden permissions for PearlItButton
    CS_BUTTON_PERMISSION_OVERRIDE : [
        //Twitter
        {
            //ex
            getPermission: function(pageUrl) {
                var urlPattern = /^https?:\/\/www\.google\.fr\/search(.*&tbm=isch.*)/;
                if (pageUrl.match(urlPattern)) {
                    return {imAllow:true, vidAllow:true, textAllow:true, rightClick:true, imButLayout:"none"};
                }
                return null;
            }
        }
    ],

    CS_LINK_PATTERN: [
        //TWITTER
        {
            getUrl: function(pageUrl, target) {
                var tag = "SPAN";
                var documentUrlPattern = /twitter\.com/;
                if (target.tagName === tag) {
                    if (pageUrl.match(documentUrlPattern)) {
                        if (target.className == "js-display-url") {
                            return PTAddonConfig.getAttr(target.parentElement, "data-expanded-url");
                        }
                    }
                }
                return null;
            }
        },
        //GOOGLE
        {
            getUrl: function(pageUrl, target) {
                var tag = "A";
                var documentUrlPattern = /google\..+\/.+q=/;
                if (pageUrl.match(documentUrlPattern) && target && target.getAttribute) {
                    var dirtyLink = target.getAttribute("href");
                    if (dirtyLink) {
                        var encodedPrettyLinkPattern = /url?.*&url=(.*)&ei=/;
                        var matches = dirtyLink.match(encodedPrettyLinkPattern);
                        if (matches && matches.length >= 2) {
                            var encodedPrettyLink = matches[1];
                            var prettyLink = decodeURIComponent(encodedPrettyLink);
                            return prettyLink;
                        }
                    }
                }
                return null;
            }
        }
    ],

    getAttr : function(el, att) {
        var res = null;
        if (typeof el[att] === 'string') {
            res = el[att];
        }
        else {
            res = el.getAttribute(att);
        }
        return res;
    },

    findATagParentNode: function(target) {
        if (!target) {
            return null;
        }
        if (target.tagName && target.tagName.toLowerCase() == "a") {
            return target;
        }
        if (target.parentNode) {
            return PearltreesContextItem.findATagParentNode(target.parentNode);
        }
        return null;
    }
}