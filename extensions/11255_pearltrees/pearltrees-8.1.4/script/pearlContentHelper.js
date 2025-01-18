if (window.top === window && typeof PearltreesContentHelper === 'undefined') { //not in an iframe

    PearltreesContentHelper = {

        //AppClient.PearlClientType
        IMAGE_LAYOUT : "image",
        INVALID_IMAGE_LAYOUT : "unvalidImage",
        TEXT_LAYOUT : "note",
        VIDEO_EMBED_LAYOUT : "embed",
        VIDEO_LAYOUT : "video",
        LINK_LAYOUT: "link",

        IMG_EXT : ["bmp", "jpg", "jpeg", "png", "gif", "webp"],
        IMG_MIN_SIZE : 89,
        IMG_MAX_SIZE : 10000,
        TEXT_MIN_SIZE : 15,

        pearlerType : "chrome",

        /* LINK */

        isLinkPearlabled: function(target) {
            if (target == null) {
                return "";
            }
            for (k in PTAddonConfig.CS_LINK_PATTERN) {
                var matchingPattern = PTAddonConfig.CS_LINK_PATTERN[k];
                var url = matchingPattern.getUrl(document.URL, target)
                if (url != null) {
                    return url;
                }
            }
            var link = jUtils.getAttr(target, "data-href") || jUtils.getAttr(target, "data-expanded-url");
            if (!link) {
                link = jUtils.getAttr(target, "href");
            }
            if (!link) {
                if (target.tagName == "body") {
                    return "";
                }
                return PearltreesContentHelper.isLinkPearlabled(target.parentNode);
            }
            if (link.indexOf("pearltrees.com") > 0 || link.indexOf("broceliand.fr") > 0) {
                return "";
            }
            return link;
        },

        isExcludedSite : function (url) {
            for (var i = 0; i < PTAddonConfig.CS_EXCLUDED_PATTERN.length; i++) {
                if (url.match(PTAddonConfig.CS_EXCLUDED_PATTERN[i])) {
                    return true;
                }
            }
            var test = url.split('/');
            var domain;
            if (test[2]) {
                domain = test[2];
            }
            else {
                domain = url;
            }
            for (var i = 0; i < PTAddonConfig.CS_EXCLUDED_DOMAINS.length; i++) {
                if (domain.match(PTAddonConfig.CS_EXCLUDED_DOMAINS[i])) {
                    return true;
                }
            }
            var metaPearltrees = jUtils.getWithFilter('meta', 'name', 'pearltrees');
            if (metaPearltrees === null) {
                return false;
            }
            if (jUtils.getAttr(metaPearltrees, "content") === "ignore") {
                return true;
            }
            return false;
        },

        /* VIDEO */
        isVideoPearlabled : function(target, origin, callbackYes, callbackNo) {
            for (var k in PTAddonConfig.CS_VIDEO_PATTERNS) {
                var matchingPattern = PTAddonConfig.CS_VIDEO_PATTERNS[k];
                var result = matchingPattern.getUrl(document.URL, target);
                if (result != null) {
                    var r = result.url;
                    var p = result.pageUrl;
                    if (r != null) {
                        var l = result.layout;
                        callbackYes(target, r, l, p, origin, PTAddonConfig.CS_VIDEO_PATTERNS[k].specialOffset ? PTAddonConfig.CS_VIDEO_PATTERNS[k].specialOffset(target, PearltreesContentHelper.pearlerType) : null);
                        return;
                    }
                }
            }
            if (target.tagName === 'VIDEO') {
                var videoUrl = null;
                var layout;
                if (jUtils.getAttr(target, "data-youtube-id") != null) {
                    videoUrl = "https://www.youtube.com/watch?v=" + jUtils.getAttr(target, "data-youtube-id");
                    layout = PearltreesContentHelper.VIDEO_EMBED_LAYOUT;
                }
                if (PTAddonConfig.getHtml5Video) {
                    if (videoUrl == null) {
                        videoUrl = jUtils.getAttr(target, "src");
                    }
                    if (videoUrl === null) {
                        var videoChildren = target.childNodes;
                        for (var i=0; i < videoChildren.length; i++) {
                            var child = videoChildren[i];
                            if (child.tagName === "SOURCE") {
                                videoUrl = child.getAttr(target, "src");
                                break;
                            }
                        }
                    }
                    if (typeof layout === 'undefined') {
                        layout = PearltreesContentHelper.VIDEO_LAYOUT;
                    }
                }
                if (videoUrl !== null && videoUrl.substring(0, "http".length) === "http") {
                    videoUrl = videoUrl.split('?')[0];
                    callbackYes(target, videoUrl, document.URL, layout, document.URL, origin);
                    return;
                }
            }
            callbackNo();
        },

        /* IMAGE */

        isSpecialSiteImage : function(img, callback, origin, acceptSmallImage) {
        	if (typeof img.clientWidth !== 'undefined' && typeof img.clientHeight !== 'undefined') {
            	if (img.clientWidth <= PearltreesContentHelper.IMG_MIN_SIZE || img.clientHeight <= PearltreesContentHelper.IMG_MIN_SIZE) {
            		return false;
            	}
            }
            for (var k in PTAddonConfig.CS_SPECIAL_SITE) {
                var matchingPattern = PTAddonConfig.CS_SPECIAL_SITE[k];
                var result = matchingPattern.getUrl(document.URL, img);
                if (result != null) {
                    var r = result.url;
                    var l = result.layout;
                    var p = result.pageUrl;
                    var overrideMargins = typeof matchingPattern.overrideMargins !== 'undefined' && (matchingPattern.overrideMargins || false);
                    if (r != null) {
                        if (l == PearltreesContentHelper.IMAGE_LAYOUT) {
                            var testImg = new Image();
                            var loaded = false;
                            jUtils.listen(testImg, 'load',
                                function() {
                                    PealtreesPearlItButton.log("image loaded" + this.width + " / " + this.height);
                                    var isImageBigEnough = this.width >= PearltreesContentHelper.IMG_MIN_SIZE && this.height >= PearltreesContentHelper.IMG_MIN_SIZE;
                                    var isImageSmallEnough = this.width <= PearltreesContentHelper.IMG_MAX_SIZE && this.height <= PearltreesContentHelper.IMG_MAX_SIZE;
                                    if (!loaded) {
                                        loaded = true;
                                        if ((isImageBigEnough || acceptSmallImage) && isImageSmallEnough) {
                                            var left = 0;
                                            var top = 0;
                                            if (typeof matchingPattern.specialOffset !== 'undefined' && matchingPattern.specialOffset != null) {
                                                var specialOffset = matchingPattern.specialOffset(img, PearltreesContentHelper.pearlerType);
                                                left = specialOffset.left;
                                                top = specialOffset.top;
                                            }
                                            callback(img, r, l, p, origin, PealtreesPearlItButton.getOffsetForImageSize(overrideMargins ? 500 : this.width, overrideMargins ? 500 : this.height, left, top));
                                        }
                                    }
                                    else if (!isImageSmallEnough) {
                                        callback(img, r, PearltreesContentHelper.INVALID_IMAGE_LAYOUT, p, origin, PealtreesPearlItButton.getOffsetForImageSize(overrideMargins ? 500 : this.width, overrideMargins ? 500 : this.height, left, top));
                                    }
                                }
                            );
                            testImg.src = r;
                            setTimeout(function() {
                                if (!loaded) {
                                    loaded = true;
                                    var left = 0;
                                    var top = 0;
                                    if (typeof matchingPattern.specialOffset !== 'undefined' && matchingPattern.specialOffset != null) {
                                        var specialOffset = matchingPattern.specialOffset(img, PearltreesContentHelper.pearlerType);
                                        left = specialOffset.left;
                                        top = specialOffset.top;
                                    }
                                    callback(img, r, l, p, origin, PealtreesPearlItButton.getOffsetForImageSize(500, 500, left, top));
                                }
                            },150);
                        }
                        else {
                            setTimeout(function() {
                                callback(img, r, l, p, origin, matchingPattern.specialOffset ? matchingPattern.specialOffset(img, PearltreesContentHelper.pearlerType) : null);
                            },100);
                        }
                        return true;
                    }
                }
            }
            return false;
        },

        isImagePearlabled: function(target, callbackYes, callbackNo, acceptSmallImage) {
            if (target.tagName !== 'IMG') {
                callbackNo();
                return "";
            }
            var imageUrl = jUtils.getAttr(target, "src");
            PearltreesContentHelper.isImagePearlabledInternal(imageUrl, callbackYes, callbackNo, acceptSmallImage);
            return imageUrl;
        },

        isImagePearlabledInternal: function(imageUrl, callbackYes, callbackNo, acceptSmallImage) {
            var fileExt = PearltreesContentHelper.getFileExtension(imageUrl);
            if (fileExt) {
                fileExt = fileExt.toLowerCase();
            }
            if (typeof fileExt === 'undefined' || PearltreesContentHelper.IMG_EXT.indexOf(fileExt) < 0) {
                callbackNo();
                return;
            }
            var testImg = new Image();
            jUtils.listen(testImg, 'load',
                function() {
                    PealtreesPearlItButton.log("image loaded" + this.width + " / " + this.height);
                    var isImageBigEnough = this.width >= PearltreesContentHelper.IMG_MIN_SIZE && this.height >= PearltreesContentHelper.IMG_MIN_SIZE;
                    var isImageSmallEnough = this.width <= PearltreesContentHelper.IMG_MAX_SIZE && this.height <= PearltreesContentHelper.IMG_MAX_SIZE;
                    if ((isImageBigEnough || acceptSmallImage) && isImageSmallEnough) {
                        callbackYes(testImg, imageUrl);
                    }
                    else {
                        callbackNo();
                    }
                }
            );
            testImg.src = imageUrl;
        },

        getFileExtension : function(imageUrl) {
            var extension = imageUrl.split('.').pop();
            var i = extension.indexOf("?"); //Remove query string
            if (i > 0) {
                return extension.slice(0, i);
            }
            return extension;
        }
    }

	if (typeof PealtreesPearlItButton !== 'undefined') {
		PealtreesPearlItButton.init();
	}
	if (typeof PearltreesContextItem !== 'undefined') {
		PearltreesContextItem.init();
	}
}
