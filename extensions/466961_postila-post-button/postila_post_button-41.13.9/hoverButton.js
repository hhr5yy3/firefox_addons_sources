var postilaExtForFotostrana = {
    namespace: 'postila',
    forDomain: ['fotostrana.ru'],
    searchSelectors: [
        'img'
    ],
    getHoverButtonOffset: function (img, $) {
        return this.getOffset(img);
    },
    activeImageGripper: function (img, $, options) {
        var srcUrl = img.getAttribute('src'),
            $root,
            canPost = false,
            linkUrl = null,
            message = null;

        try {
            var width = img.clientWidth;
            var height = img.clientHeight;
            if (width < options.filter.width || height < options.filter.height) {
                return {
                    canPost: false
                };
            }

            linkUrl = window.location.href;
            message = document.title;

            if ($(img).closest('.pin-content').length) {
                var wrapper = $(img).closest('.pin-content').get(0);
                if ($(wrapper).down('.pin-text').length > 0) {
                    message = $(wrapper).down('.pin-text').get(0).innerText.trim();
                }
            }

            if ($(img).closest('#fs6-content-box').length) {
                var wrapper = $(img).closest('#fs6-content-box').get(0);
                if ($(wrapper).down('.fs6-question-wrap').length > 0) {
                    var questionWrapper = $(wrapper).down('.fs6-question-wrap').get(0);
                    if ($(questionWrapper).down('.fs6-question-a-block').length > 0) {
                        message = $(questionWrapper).down('.fs6-question-a-block').get(0).innerText.trim();
                    }
                }
            }

            if ($(img).closest('.related-pin-item-container').length) {
                var wrapper = $(img).closest('.related-pin-item-container').get(0);
                if ($(wrapper).down('.pin-text').length > 0) {
                    message = $(wrapper).down('.pin-text').get(0).innerText.trim();
                }
            }

            if (message && linkUrl && srcUrl) {
                canPost = true;
            }
        } catch (e) {
            message = document.title;
            linkUrl = window.location.href;
        }

        return {
            srcUrl: srcUrl,
            linkUrl: linkUrl,
            message: message,
            canPost: canPost
        }
    },

    mainImageGripper: function (options) {
        var $ = traversty,
            _this = this,
            mainImages = [],
            images = $('div#fs6-content-box img');
        for (var i in images) {
            if (typeof images[i] != 'object') {
                continue;
            }
            var image = _this.activeImageGripper(images[i], $, options);
            if (image && image.srcUrl) {
                mainImages.push(image);
            }
        }
        return mainImages;
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = postilaExtForFotostrana;
} else {
    window.postila = window.postila || {};
    window.postila.domainsExt = window.postila.domainsExt || [];
    window.postila.domainsExt.push(postilaExtForFotostrana);
}

var postilaExtForInstagramm = {
    namespace: 'postila',
    forDomain: ['instagram.com'],
    searchSelectors: [
        'a div'
    ],
    activeImageGripper: function (img, $) {
        var $srcImage = null,
            $rootEl = null,
            canPost = false,
            srcUrl = null,
            linkUrl = window.location.href,
            message = null;

        try {
            $rootEl = $(img).prev().down('img');

            if ($rootEl.length) {
                $srcImage = $rootEl[0];

                if ($srcImage.getAttribute('alt')) {
                    message = $srcImage.getAttribute('alt');
                }

                if ($srcImage.getAttribute('src')) {
                    srcUrl = $srcImage.getAttribute('src');
                }
            }

            if (message && linkUrl && srcUrl) {
                canPost = true;
            }
        } catch (e) {
            console.error(e);

            message = document.title;
            linkUrl = window.location.href;
        }

        return {
            srcUrl: srcUrl,
            linkUrl: linkUrl,
            message: message,
            canPost: canPost
        }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = postilaExtForInstagramm;
} else {
    window.postila = window.postila || {};
    window.postila.domainsExt = window.postila.domainsExt || [];
    window.postila.domainsExt.push(postilaExtForInstagramm);
}

var postilaExtForLiveinternetMobile = {
    namespace: 'postila',
    forDomain: ['li.ru'],
    searchSelectors: [
        '.pda-post'
    ],
    activeImageGripper: function (img, $) {
        var $srcImage = null,
            canPost = false,
            srcUrl = null,
            linkUrl = window.location.href,
            message = null;

        try {
            if ($(img).is('.pda-post')) {
                message = $(img).down('.pda-post_hdr strong').get(0).innerText.trim();
                srcUrl = $(img).down('.pda-post_body img').next().get(0).getAttribute('href').split('action=redirect&url=')[1];
            }

            if (message && linkUrl && srcUrl) {
                canPost = true;
            }
        } catch (e) {
            console.error(e);

            message = document.title;
            linkUrl = window.location.href;
        }

        return {
            srcUrl: srcUrl,
            linkUrl: linkUrl,
            message: message,
            canPost: canPost
        }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = postilaExtForLiveinternetMobile;
} else {
    window.postila = window.postila || {};
    window.postila.domainsExt = window.postila.domainsExt || [];
    window.postila.domainsExt.push(postilaExtForLiveinternetMobile);
}

var postilaExtForMirtesen = {
    namespace: 'postila',
    forDomain: ['mirtesen.ru'],
    getHoverButtonOffset: function (img, $) {
        var $ = traversty,
            $img = $(img),
            _this = this,
            offset = _this.getOffset(img);

        if ($img.closest('[data-id]').length) {
            offset = _this.getOffset($img.closest('[data-id]')[0]);
        }

        return offset;
    },
    searchSelectors: [
        '[data-id]'
    ],
    activeImageGripper: function (img, $) {
        var $root = null,
            srcUrl = null,
            canPost = false,
            linkUrl = null,
            message = null;

        try {
            if ($(img).closest('[data-id]').length) {
                $root = $(img).closest('[data-id]').eq(0);

                srcUrl = $root.down('.post-image').get(0).getAttribute('src');
                linkUrl = $root.children('a').get(0).getAttribute('href');
                message = $root.down('.condensed').get(0).childNodes[0].nodeValue.trim();

                if (message.length > 500) {
                    message = message.substr(0, 497) + '...';
                }
            }
        } catch (e) {
            message = document.title;
            linkUrl = window.location.href;
        }

        if (message && linkUrl && srcUrl) {
            canPost = true;
        }

        return {
            srcUrl: srcUrl,
            linkUrl: linkUrl,
            message: message,
            canPost: canPost
        }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = postilaExtForMirtesen;
} else {
    window.postila = window.postila || {};
    window.postila.domainsExt = window.postila.domainsExt || [];
    window.postila.domainsExt.push(postilaExtForMirtesen);
}

var postilaExtForOK = {
    namespace: 'postila',
    forDomain: ['odnoklassniki.ru', 'ok.ru'],
    searchSelectors: [
        'img',
        'video.gif_video',
        '[data-module="OKVideo"]'
    ],
    getHoverButtonOffset: function (img, $) {
        var $ = traversty,
            $img = $(img),
            _this = this,
            offset = _this.getOffset(img);

        if ($(img).closest('.vid-card').length) {
            offset = _this.getOffset($(img).closest('.vid-card').get(0));
        }
        
        if (img.closest('[data-module="OKVideo"]')) {
            offset = _this.getOffset(img.closest('[data-module="OKVideo"]'));
        }

        // Photo album item
        if ($(img).is('.photo-sc_i_cnt_a_img')) {
            offset = _this.getOffset($(img).closest('.photo-sc_i_cnt').get(0));
        }

        return offset;
    },
    activeImageGripper: function (img, $, options) {
        var filter = options.filter,
            srcUrl = img.getAttribute('src'),
            $root,
            canPost = false,
            linkUrl = null,
            message = null;

        try {
            var getPostDataFromVideoOptions = function (options) {
                var data = {
                    srcUrl: '',
                    linkUrl: '',
                    message: ''
                };
                
                try {
                    if (options && options.flashvars) {
                        var metadata = options.flashvars.metadata;
                        
                        if (metadata) {
                            var parsedMetadata = JSON.parse(metadata);
                            
                            if (parsedMetadata.movie) {
                                data.srcUrl = parsedMetadata.movie.poster;
                                data.linkUrl = parsedMetadata.movie.url;
                                data.message = parsedMetadata.movie.title;
                            }
                        }
                    }
                } catch (e) {
                    
                }
                
                return data;
            };
            var extractVideoDataFromElement = function (el) {
                var options = JSON.parse(el.getAttribute('data-options'));            
                var postData = getPostDataFromVideoOptions(options);
                
                if (postData.srcUrl) {
                    linkUrl = postData.linkUrl;
                    srcUrl = postData.srcUrl;
                    message = postData.message;
                } else {
                    if (options.poster) {
                        srcUrl = options.poster;
                    }
                    
                    try {
                        var root = el.closest('.media-video');
                        
                        linkUrl = root.querySelector('.video-card_n').href;
                        message = root.querySelector('.video-card_n').innerText;
                    } catch (err) {
                        console.info(err);
                    }
                }                
            };
            
            // Video popup
            if (img.getAttribute('data-module') == 'OKVideo') {
                extractVideoDataFromElement(img);
            } else if (img.closest('[data-module="OKVideo"]')) {
                extractVideoDataFromElement(img.closest('[data-module="OKVideo"]'));
            } else {        
                if (img.width < filter.width || img.height < filter.height) {
                    return {
                        canPost: false
                    };
                }
            }

            //Image from popup
            if ($(img).is('.media-photos_img')) {
                canPost = true;
                try {
                    linkUrl = window.location.href;

                    if ($(img).closest('.media-layer').length) {
                        message = $(img).closest('.media-layer').down('.media-text_cnt_tx').get(0).innerText.trim();
                    }
                } catch (e) {
                    linkUrl = window.location.href;
                }
            }

            // Photo from feed
            if ($(img).up().is('.collage_cnt')) {
                canPost = true;

                try {
                    if ($(img).up().up().get(0).getAttribute('href').indexOf('/topic/') >= 0) {
                        linkUrl = window.location.origin + $(img).up().up().get(0).getAttribute('href');
                    }

                    if ($(img).closest('.feed').length) {
                        message = $(img).closest('.feed').down('.media-text_cnt_tx').get(0).innerText.trim();
                    }

                    if (!message) {
                        message = $(img).closest('.feed-i').down('.media-media-text_a').get(0).innerText.trim();
                    }
                } catch (e) {
                    linkUrl = window.location.href;
                }
            } else if ($(img).is('.collage_i')) {
                canPost = true;

                // group album photo
                try {
                    var attr;
                    var data;

                    $root = $(img).closest('.feed').eq(0);
                    attr = $root[0].getAttribute('data-log-click');

                    data = JSON.parse(JSON.parse(attr).feedDetails);

                    linkUrl = window.location.href + '/album/' + data.resources.GROUP_ALBUM[0] + '/' + data.resources.GROUP_PHOTO[0];

                    srcUrl = $(img).down('img')[0].getAttribute('src');

                    message = document.title;
                } catch (e) {
                    linkUrl = window.location.href;
                }
            }

            // GIF video
            if (img.classList.contains('gif_video')) {
                $root = $(img).closest('.gif[data-module="Gif"]');
                
                message = $root.closest('.feed').down('.media-text_cnt_tx').get(0).innerText.trim();
                srcUrl = `https:${$root[0].getAttribute('data-gifsrc')}`;
                linkUrl = `${location.origin}${$root.closest('a')[0].getAttribute('href')}`;
            }

            // Photos from post
            if (img.getAttribute('itemprop') == 'image') {
                // Post with one photo
                $root = $(img).closest('.feed-i_post');
                if ($root.length) {
                    message = $root.get(0).innerText.trim();
                    linkUrl = $root.down('.rev_cnt_a').get(0).href;
                }

                // Photo album
                $root = $(img).closest('.ufeed-photo');
                if ($root.length) {
                    message = $root.down('.feed-i_action').get(0).innerText.trim();
                    linkUrl = $root.down('.feed-i_action a').get(1).href;
                }
            }

            // Photo in album
            if ($(img).up().is('.photo-card_cnt')) {
                canPost = true;
                message = document.querySelector('.photo-h_cnt_t').innerText.trim();
                linkUrl = window.location.href;
            }

            if ($(img).is('.video-card_img')) {
                $root = $(img).closest('.video-card');
                message = $root.down('.video-card_n').get(0).innerText.trim();
                linkUrl = window.location.origin + $root.down('.video-card_n').get(0).getAttribute('href');
            }

            // Zoomed photo
            if ($(img).is('.plp_photo')) {
                $root = $(img).closest('.pl_cw');
                message = $root.down('.pl_right_w').get(0).innerText.trim();
                linkUrl = $root.down('#showLinkInput').get(0).value;
            }

            if (message && linkUrl && srcUrl) {
                canPost = true;
            }
        } catch (e) {
            console.info(e);
            message = document.title;
            linkUrl = window.location.href;
        }

        return {
            srcUrl: srcUrl,
            linkUrl: linkUrl,
            message: message,
            canPost: canPost
        }
    },
    mainImageGripper: function (options) {
        var $ = traversty,
            _this = this,
            mainImages = [],
            images = $('.media-layer img');
        
        for (var i in images) {
            if (typeof images[i] != 'object') {
                continue;
            }
            var image = _this.activeImageGripper(images[i], $, options);
            
            if (image && image.srcUrl) {
                mainImages.push(image);
            }
        }
        
        return mainImages;
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = postilaExtForOK;
} else {
    window.postila = window.postila || {};
    window.postila.domainsExt = window.postila.domainsExt || [];
    window.postila.domainsExt.push(postilaExtForOK);
}

var postilaExtForPinme = {
    namespace: 'postila',
    forDomain: ['pinme.ru'],
    getHoverButtonOffset: function (img, $) {
        var $img = $(img),
            _this = this,
            offset = _this.getOffset(img);

        if ($('.pinImageMain').length) {
            offset = _this.getOffset($('.pinImageMain')[0]);
        } else if($('.sysPinPhotoOriginal').length) {
            offset = _this.getOffset($('.sysPinPhotoOriginal')[0]);
        } else if($('.photoLabel').length) {
            offset = _this.getOffset($('.photoLabel')[0]);
        }

        return offset;
    },
    searchSelectors: [
        '.sysPinItemContainer .sysPinImg'
    ],
    activeImageGripper: function (img, $) {
        var $root = null,
            srcUrl = null,
            canPost = false,
            linkUrl = null,
            urlStartPosition,
            filter = {
                minWidth: 230,
                minHeight: 100
            },
            message = null;

        var grabAttr = function (attrName, $elements) {
            var attrValue = '';

            $elements.forEach(function ($element) {
                try {
                    attrValue = attrValue || $element.get(0).getAttribute(attrName);
                } catch (e) { }
            });

            return attrValue;
        };

        var grabText = function ($elements) {
            var text = '';

            $elements.forEach(function ($element) {
                try {
                    text = text || $element.get(0).childNodes[0].nodeValue.trim();
                } catch (e) { }
            });

            return text;
        };

        try {
            if ($(img).closest('.sysPinItemContainer').length) {
                $root = $(img).closest('.sysPinItemContainer').eq(0);

                linkUrl = grabAttr('href', [
                    $root.down('.ImgLink')
                ]);

                if (!linkUrl) {
                    linkUrl = window.location.href;
                } else {
                    linkUrl = window.location.origin + linkUrl;
                }

                message = grabText([
                    $root.down('.sysPinDescr')
                ]);

                if (message.length > 500) {
                    message = message.substr(0, 497) + '...';
                }

                if ($(img).hasClass('pinCloseupImage')) {
                    srcUrl = $root.down('.sysPinImg')[0].getAttribute('src');
                } else {
                    srcUrl = $root.down('.sysPinImg')[0].getAttribute('bigsrc');
                }

                if (!message) {
                    message = document.title;
                }
            }
        } catch (e) {
            message = document.title;
            linkUrl = window.location.href;
        }

        if (message && linkUrl && srcUrl) {
            canPost = true;
        }

        return {
            srcUrl: srcUrl,
            linkUrl: linkUrl,
            message: message,
            canPost: canPost
        }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = postilaExtForPinme;
} else {
    window.postila = window.postila || {};
    window.postila.domainsExt = window.postila.domainsExt || [];
    window.postila.domainsExt.push(postilaExtForPinme);
}

var postilaExtForPinterest = {
    namespace: 'postila',
    forDomain: ['pinterest.'],
    searchSelectors: [
        'img',
        '.pinWrapper'
    ],
    getHoverButtonOffset: function (img, $) {
        if (img.closest('.Pin')) {        
            return this.getOffset(img.closest('.Pin'), 2, {
                top: 50,
                left: -9
            });
        }
        
        if (img.closest('.imageLink')) {
            return this.getOffset(img.closest('.imageLink').parentNode);
        }
    },
    activeImageGripper: function (img, $, options) {
        var srcUrl = null,
            canPost = false,
            $root,
            linkUrl = null,
            message = null;

        var checkImageForMinSize = function (img) {
            var filter = options.filter;
            var width = img.naturalWidth ? img.naturalWidth : img.clientWidth;
            var height = img.naturalHeight ? img.naturalHeight : img.clientHeight;

            return (width >= filter.width && height >= filter.height);
        };

        /*var grabAttr = function (attrName, $elements) {
            var attrValue = '';

            $elements.forEach(function ($element) {
                try {
                    attrValue = attrValue || $element.get(0).getAttribute(attrName);
                } catch (e) { }
            });

            return attrValue;
        };*/

        /*var grabText = function ($elements) {
            var text = '';

            function textUnder (el) {
                var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
                while(n=walk.nextNode()) a.push(walk.currentNode.textContent);
                return a.join();
            }

            $elements.forEach(function ($element) {
                try {
                    text = text || textUnder($element.get(0));
                } catch (e) { }
            });

            return text;
        };*/

        try {
            const srcSet = img.getAttribute('srcset');
            srcUrl = img.getAttribute('src');

            if ($('div.richPinInformation span').length) {
                message = $('div.richPinInformation span')[0].innerText;
            }
            if (!message) {
                message = img.getAttribute('alt');
            }
            if (!message.trim() && $('h1').length) {
                message = $('h1')[0].innerText;
            }
            if (!message) {
                message = document.title;
            }

            if (!srcSet && checkImageForMinSize(img) === false) {
                return ({
                    canPost: false
                });
            }

            if (srcSet) {
                var allSrcSets = srcSet.split(', ');

                srcUrl = allSrcSets[allSrcSets.length - 1].split(' ')[0];
            }

            $root = img.closest('a');
            if ($root) {
                // Pin
                linkUrl = location.origin + $root.getAttribute('href');
            } else {
                // Pin page
                linkUrl = window.location.href;
            }
        } catch (e) {
            message = document.title;
            linkUrl = window.location.href;
        }

        if (message && linkUrl && srcUrl) {
            canPost = true;
        }

        return {
            srcUrl: srcUrl,
            linkUrl: linkUrl,
            message: message,
            canPost: canPost
        }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = postilaExtForPinterest;
} else {
    window.postila = window.postila || {};
    window.postila.domainsExt = window.postila.domainsExt || [];
    window.postila.domainsExt.push(postilaExtForPinterest);
}

var postilaExtForTwitter = {
    namespace: 'postila',
    forDomain: ['twitter.com'],
    searchSelectors: [
        '.tweet'
    ],
    getHoverButtonOffset: function (img, $) {
        var $img = $(img),
            _this = this,
            offset = _this.getOffset(img),
            $mediaThumbnail = $img.up('.media-thumbnail'),
            mediaThumbnail = $mediaThumbnail.get(0);

        if ($mediaThumbnail.length) {
            if (img.offsetWidth < mediaThumbnail.offsetWidth || img.offsetHeight < mediaThumbnail.offsetHeight) {
                offset = _this.getOffset(img);
            } else {
                offset = _this.getOffset(mediaThumbnail);
            }
        }

        if ($img.is('.GalleryNav')) {
            offset = _this.getOffset($(img).closest('.Gallery-content').get(0));
        }

        return offset;
    },
    activeImageGripper: function (img, $, options) {
        var filter = options.filter,
            srcUrl = img.getAttribute('src'),
            $root,
            canPost = false,
            linkUrl = null,
            message = null;

        try {
            if (img.width < filter.width || img.height < filter.height) {
                return {
                    canPost: false
                };
            } else {
                linkUrl = location.href;
                message = document.title;
            }

            // Stream photo
            if ($(img).closest('.media').length) {
                $root = $(img).closest('.content').eq(0);

                if ($root.length == 0) {
                    $root = $(img).closest('.permalink-tweet').eq(0);
                }

                srcUrl = $root.down('.media-thumbnail img').get(0).getAttribute('src');
                message = $root.down('.js-tweet-text').get(0).childNodes[0].nodeValue.trim();
                try {
                    linkUrl = $root.down('.twitter-timeline-link').get(0).getAttribute('data-expanded-url') || $root.down('.twitter-timeline-link').get(0).innerText.trim();
                } catch (e) {
                    linkUrl = null;
                }
            }

            // Stream video
            if (($(img).closest('.tweet').length || $(img).is('.tweet')) && $(img).closest('.tweet').down('.AdaptiveMedia-video').length) {
                var playerContainer;

                $root = $(img).closest('.tweet');

                try {
                    playerContainer = $(img).down('.PlayableMedia-player')[0];

                    message = $root.down('.js-tweet-text').get(0).childNodes[0].nodeValue.trim();

                    if (playerContainer) {
                        srcUrl = playerContainer.style.backgroundImage.split('"')[1];
                    }

                    linkUrl = "https://twitter.com" + $root[0].getAttribute('data-permalink-path');
                } catch (e) {
                   message = null;
                   srcUrl = null;
                   linkUrl = null;
               }
            }

            // Stream photo
            if ($(img).is('.TwitterPhoto-mediaSource')) {
                $root = $(img).closest('.StreamItem');

                message = $root.down('.js-tweet-text').get(0).childNodes[0].nodeValue.trim();
                try {
                    linkUrl = $root.down('.twitter-timeline-link').get(0).getAttribute('data-expanded-url') || $root.down('.twitter-timeline-link').get(0).innerText.trim();
                } catch (e) {
                    linkUrl = null;
                }
            }

            // Gallery photo
            if ($(img).is('.GalleryNav') || $(img).closest('.Gallery-media').length) {
                $root = $(img).closest('.Gallery-content');

                srcUrl = $root.down('.media-image').get(0).getAttribute('src');
                message = $root.down('.js-tweet-text').get(0).childNodes[0].nodeValue.trim();
                try {
                    linkUrl = $root.down('.twitter-timeline-link').get(0).getAttribute('data-expanded-url') || $root.down('.twitter-timeline-link').get(0).innerText.trim();
                } catch (e) {
                    linkUrl = null;
                }
            }

            if (message && linkUrl && srcUrl) {
                canPost = true;
            }
        } catch (e) {
            message = document.title;
            linkUrl = window.location.href;
        }

        return {
            srcUrl: srcUrl,
            linkUrl: linkUrl,
            message: message,
            canPost: canPost
        }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = postilaExtForTwitter;
} else {
    window.postila = window.postila || {};
    window.postila.domainsExt = window.postila.domainsExt || [];
    window.postila.domainsExt.push(postilaExtForTwitter);
}

var postilaExtForVK = {
    namespace: 'postila',
    forDomain: ['vk.com'],
    searchSelectors: [
        'img, a.image_cover, video.pages_gif_img'
    ],
    getHoverButtonOffset: function (img) {
        return this.getOffset(img);
    },
    activeImageGripper: function (img, $, options) {
        var filter = options.filter,
            srcUrl = img.getAttribute('src'),
            $root,
            canPost = false,
            linkUrl = null,
            message = null;

        try {
            var width = img.clientWidth;
            var height = img.clientHeight;
            if (width < filter.width || height < filter.height) {
                return {
                    canPost: false
                };
            }

            var getPostInfo = function(post) {
                //get message
                try {
                    if ($(post).down('.wall_post_text').length > 0) {
                        message = $(post).down('.wall_post_text').get(0).innerText.trim();
                    } else {
                        var header = $(post).down('.post_header');
                        if (header.length > 0 && $(header).down('a.author').length > 0) {
                            message = $(header).down('a.author').get(0).innerText.trim();
                        }
                    }
                } catch (e) {
                   message = document.title;
                }
                
                //get post url
                var postId = $(post).down('._wall_post_cont').get(0).id;
                postId = postId.replace('wpt', 'wall');
                linkUrl = 'https://vk.com/feed?w=' + postId;
                
                console.info('getPostInfo');
                console.info('message', message);
                console.info('linkUrl', linkUrl);
            };

            var getBackgroudImage = function(img) {
                srcUrl = img.style.backgroundImage; //"url("https://cs7056.vk.me/c635103/v635103262/5eed8/XLWpf9knEF4.jpg")"
                srcUrl = srcUrl.replace(/url/g,"");
                srcUrl = srcUrl.replace(/"/g,"");
                srcUrl = srcUrl.replace(/\(/g,"");
                srcUrl = srcUrl.replace(/\)/g,"");
            }

            // a.image_cover from feed post
            if ($(img).is('a.image_cover') && $(img).closest('.post').length) {
                getPostInfo($(img).closest('.post').get(0));
                getBackgroudImage(img);
            }

            // img from feed post
            if ($(img).is('img.page_media_link_img') && $(img).closest('.post').length) {
                getPostInfo($(img).closest('.post').get(0));
                srcUrl = img.src;
            }

            // a.image_cover from post popup
            if ($(img).is('a.image_cover') && $(img).closest('.wl_post').length) {
                getPostInfo($(img).closest('.wl_post').get(0));
                getBackgroudImage(img);
            }

            // img from post popup
            if ($(img).is('img.page_media_link_img') && $(img).closest('.wl_post').length) {
                getPostInfo($(img).closest('.wl_post').get(0));
                srcUrl = img.src;
            }
            
            // video from post popup
            if ($(img).is('video.pages_gif_img') && $(img).closest('.wl_post').length) {
                getPostInfo($(img).closest('.wl_post').get(0));
                
                srcUrl = img.getAttribute('poster');
            }
            
            // gif from post popup
            if ($(img).is('img.pages_gif_img') && $(img).closest('.wl_post').length) {
                getPostInfo($(img).closest('.wl_post').get(0));
                
                srcUrl = img.src;
            }

            //img from zoomed image popup
            if ($(img).is('img') && $(img).closest('.pv_photo_wrap').length) {
                srcUrl = img.src;
                var wrapper = $(img).closest('.pv_photo_wrap').get(0);
                if ($(wrapper).down('.pv_desc_cont').length > 0) {
                    message = $(wrapper).down('.pv_desc_cont').get(0).innerText.trim();
                } else {
                    var authorName = $(wrapper).down('.pv_author_info');
                    if (authorName.length > 0 && $(authorName).down('a.group_link').length > 0) {
                        message = $(authorName).down('a.group_link').get(0).innerText.trim();
                    }
                }
                if ($(img).up().is('a#pv_photo')) {
                    linkUrl = 'https://vk.com/' + $(img).up().get(0).href;
                }
            }

            if (message && linkUrl && srcUrl) {
                canPost = true;
            }
        } catch (e) {
            message = document.title;
            linkUrl = window.location.href;
        }

        return {
            srcUrl: srcUrl,
            linkUrl: linkUrl,
            message: message,
            canPost: canPost
        }
    },
    mainImageGripper: function (options) {
        var $ = traversty,
            _this = this,
            mainImages = [],
            images = $('#wk_layer a.image_cover, #wk_layer img.page_media_link_img');
        for (var i in images) {
            if (typeof images[i] != 'object') {
                continue;
            }
            
            var image = _this.activeImageGripper(images[i], $, options);
            
            if (image && image.srcUrl) {
                mainImages.push(image);
            }
        }
        
        return mainImages;
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = postilaExtForVK;
} else {
    window.postila = window.postila || {};
    window.postila.domainsExt = window.postila.domainsExt || [];
    window.postila.domainsExt.push(postilaExtForVK);
}

var postilaExtForYoutube = {
    namespace: 'postila',
    forDomain: ['youtube.com'],
    searchSelectors: [
        '.ytd-page-manager[role="main"] [data-vid]',
        '.ytd-page-manager[role="main"] .yt-lockup-video',
        '.ytd-page-manager[role="main"] video',
        '.ytd-page-manager[role="main"] yt-img-shadow'
    ],
    activeImageGripper: function (img, $) {
        var getOffset = function (el) {
                var box = el.getBoundingClientRect(),
                    docElem = document.documentElement;

                return {
                    top: Math.round(box.top + window.pageYOffset - docElem.clientTop),
                    left: Math.round(box.left + window.pageXOffset - docElem.clientLeft)
                }
            },
            getParamFromUrl = function (param, url) {
                var params = url.split('?')[1].split('&'),
                    result = false;

                params.forEach(function (paramWithValue) {
                    paramWithValue = paramWithValue.split('=');

                    if (param == paramWithValue[0]) {
                        result = paramWithValue[1];
                    }
                });

                return result;
            },
            srcUrl = img.getAttribute('src'),
            youtubeDomain = 'https://www.youtube.com/',
            youtubeVideoLink = youtubeDomain + 'watch?v={id}',
            srcUrlPattern = 'https://img.youtube.com/vi/{id}/0.jpg#video#youtube#{id}',
            videoID = '',
            $root,
            offset = null,
            canPost = false,
            linkUrl = null,
            message = null;

        try {
            // Mobile version player
            if (window.location.hostname == 'm.youtube.com' && window.location.pathname == '/watch') {
                videoID = getParamFromUrl('v', window.location.href);

                if (videoID) {
                    srcUrl = srcUrlPattern.replace(/{id}/g, videoID);
                    message = document.title;
                    linkUrl = window.location.href;
                }
            }

            // Old Player
            if ($(img).closest('#player-api').length) {
                try {
                    $root = $(img).closest('#player-api').eq(0);

                    offset = getOffset($root[0]);

                    videoID = getParamFromUrl('v', window.location.href);

                    if (videoID) {
                        srcUrl = srcUrlPattern.replace(/{id}/g, videoID);
                        message = $('#eow-title').get(0).childNodes[0].nodeValue.trim();
                        linkUrl = window.location.href;
                    }


                } catch (e) {
                    linkUrl = null;
                    message = null;
                }
            }

            // Player
            if ($(img).closest('.html5-video-player').length) {
                try {
                    $root = $(img).closest('.html5-video-player').eq(0);

                    offset = getOffset($root[0]);

                    videoID = getParamFromUrl('v', window.location.href);

                    if (videoID) {
                        srcUrl = srcUrlPattern.replace(/{id}/g, videoID);                    
                        message = document.querySelector('ytd-video-primary-info-renderer h1.title yt-formatted-string').textContent;
                        linkUrl = window.location.href;
                    }


                } catch (e) {
                    linkUrl = null;
                    message = null;
                }
            }

            // Old Related videos
            if ($(img).closest('.video-list-item').length) {
                try {
                    $root = $(img).closest('.video-list-item').eq(0);

                    offset = getOffset($root[0]);

                    try {
                        videoID = $root.down('[data-vid]').get(0).getAttribute('data-vid').trim();
                    } catch (e) {
                        try {
                            videoID = getParamFromUrl('v', $root.down('a.ux-thumb-wrap').get(0).getAttribute('href').trim());
                        } catch (e) {
                            videoID = null;
                        }
                    }

                    if (videoID) {
                        srcUrl = srcUrlPattern.replace(/{id}/g, videoID);
                        message = $root.down('.title, .snippet-action-content a').get(0).childNodes[0].nodeValue.trim();
                        linkUrl = youtubeVideoLink.replace(/{id}/g, videoID);
                    }
                } catch (e) {
                    linkUrl = null;
                    message = null;
                }
            }

            // Small videos
            const smallVideo = $(img).closest('ytd-grid-video-renderer, ytd-compact-video-renderer');

            if (smallVideo.length) {
                try {
                    $root = smallVideo.eq(0);

                    offset = getOffset($root[0]);

                    try {
                        videoID = getParamFromUrl('v', $root.down('#thumbnail').get(0).getAttribute('href').trim());
                    } catch (e) {
                        videoID = null;
                    }

                    if (videoID) {
                        srcUrl = srcUrlPattern.replace(/{id}/g, videoID);
                        message = $root.down('#video-title').get(0).childNodes[0].nodeValue.trim();
                        linkUrl = youtubeVideoLink.replace(/{id}/g, videoID);
                    }
                } catch (e) {
                    linkUrl = null;
                    message = null;
                }
            }

            // Homepage videos
            if ($(img).closest('.yt-lockup-video').length) {
                try {
                    $root = $(img).closest('.yt-lockup-video').eq(0);

                    offset = getOffset($root[0]);

                    videoID = getParamFromUrl('v', $root.down('a.spf-link').get(0).getAttribute('href'));

                    if (videoID) {
                        srcUrl = srcUrlPattern.replace(/{id}/g, videoID);
                        message = $root.down('.yt-lockup-title a').get(0).childNodes[0].nodeValue.trim();
                        linkUrl = youtubeDomain + $root.down('a.spf-link').get(0).getAttribute('href').substr(1);
                    }
                } catch (e) {
                    linkUrl = null;
                    message = null;
                }
            }

            if (message && linkUrl && srcUrl) {
                canPost = true;
            }
        } catch (e) {
            message = document.title;
            linkUrl = window.location.href;
        }

        return {
            srcUrl,
            linkUrl,
            message,
            canPost,
            offset
        }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = postilaExtForYoutube;
} else {
    window.postila = window.postila || {};
    window.postila.domainsExt = window.postila.domainsExt || [];
    window.postila.domainsExt.push(postilaExtForYoutube);
}

(function () {
    var _this = {},
        $;

    _this.namespace = 'postila';

    _this.settings = {
        version: '41.13.9',
        messages: {
            post: 'post'
        },
        positionShift: {
            left: 10,
            top: 10
        },
        imageFilter: {
            width: 336,
            height: 100
        },
        disableOnHosts: [
            'postila.ru',
            'postila.io',
            'postila.co',
            'e.mail.ru',
            'mail.yandex.ru',
            'mail.google.com',
            'mail.google.ru'
        ]
    };

    _this.options = {
        hoverButton: true
    };

    _this.hostname = window.location.hostname.replace('www.', '');

    _this.button = undefined;
    _this.buttonHoverEvent = undefined;

    _this.activeImage = {};

    _this.createButton = function () {
        _this.button = document.createElement('span');
        document.body.appendChild(_this.button);
        _this.button.className = _this.namespace +  '_hoverButton';

        var lang = _this.settings.lang;

        _this.button.style.backgroundImage = 'url(' + chrome.extension.getURL('images/post25_' + lang + '.png') +')';

        _this.button.addEventListener('click', _this.onButtonClick);
    };

    _this.removeButton = function () {
        try {
            document.body.removeChild(_this.button);
        } catch (e) {}
    };

    _this.sendMessage = function (message) {
        try {
            if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
                chrome.runtime.sendMessage(message);
            }
        } catch (e) {}
    };

    _this.clearActiveImage = function () {
        _this.button.classList.remove('postila_hoverButton-show');

        _this.sendMessage({
            activeImage: null
        });
    };

    _this.buttonHoverEvent = function (e) {
        var el = e.target,
            url = window.location.href,
            offset,
            id,
            src,
            canPost = true,
            elOffset = _this.getOffset(el),
            filter = _this.settings.imageFilter,
            clearActiveImage = function () {
                _this.clearActiveImage();

                canPost = false;
            };

        if ($('html').hasClass('postila_screenshot__page') || $('body').hasClass('postila__post')) {
            clearActiveImage();
            return;
        }

        // if hoverButton -> exit
        if (el.isEqualNode(_this.button) || !_this.options.hoverButton) {
            return;
        }

        // if we have site extension
        if ('activeImageGripper' in _this) {
            _this.activeImage = _this.activeImageGripper(el, $, {
                filter: filter
            });
            canPost = _this.activeImage.canPost;

            if ('offset' in _this.activeImage && _this.activeImage.offset) {
                elOffset = _this.activeImage.offset;
            }

            if (!canPost) {
                clearActiveImage();
            }
            // if embed youtube video
        } else if ($(el).is('iframe[src^="//www.youtube.com/embed/"], embed[src^="//www.youtube.com/v/"]')) {
            try {
                src = el && el.getAttribute ? el.getAttribute('src') : '';

                if (src.indexOf('/embed/') > 0) {
                    id = src.substr(24, 11);
                } else {
                    id = src.substr(20, 11);
                }

                _this.activeImage.srcUrl = 'http://img.youtube.com/vi/{id}/0.jpg#video#youtube#{id}'.replace(/{id}/g, id);
                _this.activeImage.linkUrl = 'http://www.youtube.com/watch?v={id}'.replace(/{id}/g, id);
                _this.activeImage.message = document.title;
                _this.activeImage.canPost = true;
            } catch (e) {
                clearActiveImage();
            }
        } else {
            // if non image -> exit
            if (el.nodeName != 'IMG') {
                clearActiveImage();
            }

            // if image has data-postila-hover="0" -> exit
            if (el.dataset && 'postilaHover' in el.dataset && !~~el.dataset.postilaHover) {
                clearActiveImage();
            }

            // if small image -> exit
            if (el.naturalWidth < filter.width || el.naturalHeight < filter.height) {
                clearActiveImage();
            }

            // if logotype -> exit
            if (el.getAttribute && el.getAttribute('src') && el.getAttribute('src').indexOf('logo') != -1) {
                clearActiveImage();
            }

            _this.activeImage.linkUrl = document.location.href;
            _this.activeImage.message = document.title;
            _this.activeImage.canPost = true;
        }

        if (!canPost) {
            return;
        }

        if (!('activeImageGripper' in _this)) {
            // if image with wrapped link
            if (el.parentNode && el.parentNode.href && _this.isNotImageLink(el.parentNode)) {
                try {
                    url = el.parentNode.href;

                    _this.activeImage.linkUrl = url;
                } catch (e) {
                    clearActiveImage();
                }
            }

            try {
                _this.activeImage.srcUrl = el.src;
            } catch (e) {
                clearActiveImage();
            }
        }

        if (_this.options.hoverButton) {
            offset = elOffset;

            if ('getHoverButtonOffset' in _this) {
                offset = _this.getHoverButtonOffset(el, $);
            }

            offset.left += _this.settings.positionShift.left;
            offset.top += _this.settings.positionShift.top;

            _this.button.style.left = offset.left + 'px';
            _this.button.style.top = offset.top + 'px';
            _this.button.classList.add('postila_hoverButton-show');
            
            /*setTimeout(() => {
                _this.button.classList.add('postila_hoverButton-hidden');
            }, 3300);*/
        }

        _this.sendMessage({
            activeImage: _this.activeImage
        });
    };

    _this.buttonMoveEvent = function (e) {
        /*if (_this.activeImage && _this.button.classList.contains('postila_hoverButton-hidden') && _this.button.classList.contains('postila_hoverButton-show')) {

            _this.button.classList.remove('postila_hoverButton-show');
            _this.button.classList.remove('postila_hoverButton-hidden');

            setTimeout(() => {
                _this.button.classList.add('postila_hoverButton-show');

                setTimeout(() => {
                    _this.button.classList.add('postila_hoverButton-hidden');
                }, 3300);
            }, 100);
        }*/
    }

    _this.isNotImageLink = function (a) {
        var pathname = a.pathname,
            pathnameSections;

        if (pathname) {
            pathnameSections = pathname.split('.');
            return ['jpg', 'png', 'gif', 'jpeg'].indexOf(pathnameSections[pathnameSections.length - 1]) == -1;
        } else {
            return true;
        }
    };

    _this._attachEvent = function () {
        document.addEventListener('mouseover', _this.buttonHoverEvent);
        document.addEventListener('mousemove', _this.buttonMoveEvent);
    };

    _this._detachEvent = function () {
        try {
            document.removeEventListener(_this.buttonHoverEvent);
            document.removeEventListener(_this.buttonMoveEvent);
        } catch (e) {}
    };

    _this.options = {
        hoverButton: true
    };

    _this.status = {
        onSite: false
    };

    _this.onButtonClick = function () {
        var sendOptions = {
            newImagePost: _this.activeImage,
            mArgument: 'h'
        };

        _this.sendMessage(sendOptions);
    };

    _this.loadSettings = function (callback) {
        chrome.storage.sync.get({
            hoverButton: true,
            locale: 'en'
        }, function(options) {
            _this.options.hoverButton = options.hoverButton;
            _this.settings.lang = options.locale;

            callback && callback();
        });

        chrome.storage.onChanged.addListener(function (options) {
            if (!options.hoverButton) {
                return;
            }

            _this.options.hoverButton = options.hoverButton.newValue;

            if (_this.options.hoverButton) {
                _this.createButton();
                _this._attachEvent();
            } else {
                _this._detachEvent();
                _this.removeButton();
            }
        });
    };

    _this.detectFullScreenMode = function (clb) {
        var detect = function (isFullscreen, clb) {
            clb(!!isFullscreen);
        };

        document.addEventListener("fullscreenchange", function () {
            detect(document.fullscreen, clb);
        }, false);

        document.addEventListener("mozfullscreenchange", function () {
            detect(document.mozFullScreen, clb);
        }, false);

        document.addEventListener("webkitfullscreenchange", function () {
            detect(document.webkitIsFullScreen, clb);
        }, false);

        document.addEventListener("msfullscreenchange", function () {
            detect(document.msFullscreenElement, clb);
        }, false);
    };

    _this.start = function () {
        var canStart = true;

        _this.settings.disableOnHosts.forEach(function (host) {
            if (window.location.host.indexOf(host) >= 0) {
                canStart = false;
            }
        });

        if (canStart) {
            _this.loadSettings(function () {
                _this.createButton();
                _this._attachEvent();
            });

            _this.options.hoverButton && _this.detectFullScreenMode(function (isFullScreenMode) {
                if (isFullScreenMode) {
                    _this.options.hoverButton = false;
                    _this.clearActiveImage();
                } else {
                    chrome.storage.sync.get({
                        hoverButton: true
                    }, function(options) {
                        _this.options.hoverButton = options.hoverButton;

                        if (_this.options.hoverButton) {
                            _this.createButton();
                            _this._attachEvent();
                        } else {
                            _this._detachEvent();
                            _this.removeButton();
                        }
                    });
                }
            });

            chrome.runtime.onMessage.addListener(function (msg) {
                if (msg.namespace == 'postila') {
                    if (msg.action == 'reloadHoverButton') {
                        _this._detachEvent();
                        _this.removeButton();

                        _this.createButton();
                        _this._attachEvent();
                    }
                }
            });

            if (window.postila && window.postila.domainsExt) {
                window.postila.domainsExt.forEach(function (domainExt) {
                    if (domainExt.forDomain.indexOf(_this.hostname) >= 0) {
                        if ('activeImageGripper' in domainExt) {
                            _this.activeImageGripper = domainExt.activeImageGripper;
                        }

                        if ('getHoverButtonOffset' in domainExt) {
                            _this.getHoverButtonOffset = domainExt.getHoverButtonOffset;
                        }
                    }
                });
            }
        }
    };

    _this.getOffset = function (el, position, shift) {
        var buttonSize = {
            width: 73,
            height: 25
        };
        var box = el.getBoundingClientRect && el.getBoundingClientRect(),
            docElem = document.documentElement;

            // hover button size 73 x 25

        // console.info(el, position);
        // console.info(box);
        
        if (!shift) {
            shift = {
                top: 0,
                left: 0
            };
        }

        if (box) {
            switch (position) {
                case 2:
                    // right top corner
                    return {
                        top: Math.round(box.top + shift.top + window.pageYOffset - docElem.clientTop),
                        left: Math.round(box.left + shift.left + box.width - buttonSize.width - 8 + window.pageXOffset - docElem.clientLeft)
                    }
                    break;
                case 3:
                    // right bottom corner
                    return {
                        top: Math.round(box.top + box.height - buttonSize.height - 8 + window.pageYOffset - docElem.clientTop),
                        left: Math.round(box.left + box.width - buttonSize.width - 8 + window.pageXOffset - docElem.clientLeft)
                    }
                    break;
                default:
                    return {
                        top: Math.round(box.top + window.pageYOffset - docElem.clientTop),
                        left: Math.round(box.left + window.pageXOffset - docElem.clientLeft)
                    }
            }
        } else {
            return {
                top: 0,
                left: 0
            }
        }
    };

    _this.parseUrl = function (url) {
        var parser = document.createElement('a');

        parser.href = url;

        return parser;
    };

    _this.start();

    /***************************************************************
     * Traversty: A DOM collection management and traversal utility
     * (c) Rod Vagg (@rvagg) 2012
     * https://github.com/rvagg/traversty
     * License: MIT
     */
    (function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=n():typeof define=="function"&&define.amd?define(n):t[e]=n()})("traversty",this,function(){var e=this,t=e.traversty,n=window.document,r=n.documentElement,i=Object.prototype.toString,s=Array.prototype,o=s.slice,u=function(e,t,n,r,i){while(r<t.length)if(e[i=t[r++]+n])return i}(r,["msM","webkitM","mozM","oM","m"],"atchesSelector",0),a=function(){return!1},f=function(e){return i.call(e)==="[object Number]"},l=function(e){return i.call(e)==="[object String]"},c=function(e){return i.call(e)==="[object Function]"},h=function(e){return e===void 0},p=function(e){return e&&e.nodeType===1},d=function(e,t){return h(e)&&!f(t)?0:f(e)?e:f(t)?t:null},v=function(e){return l(e)?e:"*"},m=function(e,t){return o.call(t.querySelectorAll(e),0)},g=function(e,t){return e==="*"||(t[u]&&t[u](e))},y=m,b=g,w=function(e,t){return function(n,r){if(/,/.test(n)){var i=[],s=-1,o=r.getElementsByTagName("*");while(++s<o.length)p(o[s])&&t(n,o[s])&&i.push(o[s]);return i}return e(n,r)}},E="compareDocumentPosition"in r?function(e,t){return(t.compareDocumentPosition(e)&16)==16}:"contains"in r?function(e,t){return t=t.nodeType===9||t==window?r:t,t!==e&&t.contains(e)}:function(e,t){while(e=e.parentNode)if(e===t)return 1;return 0},S=function(e){var t=[],n=-1,r,i;while(++n<e.length){r=-1,i=!1;while(++r<t.length)if(t[r]===e[n]){i=!0;break}i||t.push(e[n])}return t},x=function(e,t){var n=[],r,i=0,s,o=e.length,u;while(i<o){s=0,u=(r=t(e[i],i++)).length;while(s<u)n.push(r[s++])}return n},T=function(e,t,n,r,i){return r=d(n,r),n=v(n),x(e,function(e,s){var o=r||0,u=[];i||(e=e[t]);while(e&&(r===null||o>=0))p(e)&&(!i||i===!0||i(e,s))&&b(n,e)&&(r===null||o--===0)&&(r===null&&t!="nextSibling"&&t!="parentNode"?u.unshift(e):u.push(e)),e=e[t];return u})},N=function(e,t,n){return t<0&&(t=e+t),t<0||t>=e?null:!t&&t!==0?n:t},C=function(e,t){var n=[],r=0,i=e.length;for(;r<i;r++)t(e[r],r)&&n.push(e[r]);return n},k=function(e){var t;return p(e)?function(t){return t===e}:(t=typeof e)=="function"?function(t,n){return e.call(t,n)}:t=="string"&&e.length?function(t){return b(e,t)}:a},L=function(e){return function(){return!e.apply(this,arguments)}},A=function(){function r(e){this.length=0;if(e){e=S(!e.nodeType&&!h(e.length)?e:[e]);var t=this.length=e.length;while(t--)this[t]=e[t]}}function i(e){return new r(l(e)?y(e,n):e)}return r.prototype={down:function(e,t){return t=d(e,t),e=v(e),A(x(this,function(n){var r=y(e,n);return t===null?r:[r[t]]||[]}))},up:function(e,t){return A(T(this,"parentNode",e,t))},parents:function(){return r.prototype.up.apply(this,arguments.length?arguments:["*"])},closest:function(e,t){if(f(e))t=e,e="*";else{if(!l(e))return A([]);f(t)||(t=0)}return A(T(this,"parentNode",e,t,!0))},previous:function(e,t){return A(T(this,"previousSibling",e,t))},next:function(e,t){return A(T(this,"nextSibling",e,t))},siblings:function(e,t){var n=this,r=o.call(this,0),i=0,s=r.length;for(;i<s;i++){r[i]=r[i].parentNode.firstChild;while(!p(r[i]))r[i]=r[i].nextSibling}return h(e)&&(e="*"),A(T(r,"nextSibling",e||"*",t,function(e,t){return e!==n[t]}))},children:function(e,t){return A(T(r.prototype.down.call(this),"nextSibling",e||"*",t,!0))},first:function(){return r.prototype.eq.call(this,0)},last:function(){return r.prototype.eq.call(this,-1)},eq:function(e){return A(this.get(e))},get:function(e){return this[N(this.length,e,0)]},slice:function(e,t){var n=t,r=this.length,i=[];e=N(r,Math.max(-this.length,e),0),n=N(t<0?r:r+1,t,r),t=n===null||n>r?t<0?0:r:n;while(e!==null&&e<t)i.push(this[e++]);return A(i)},filter:function(e){return A(C(this,k(e)))},not:function(e){return A(C(this,L(k(e))))},has:function(e){return A(C(this,p(e)?function(t){return E(e,t)}:typeof e=="string"&&e.length?function(t){return y(e,t).length}:a))},is:function(e){var t=0,n=this.length,r=k(e);for(;t<n;t++)if(r(this[t],t))return!0;return!1},toArray:function(){return s.slice.call(this)},size:function(){return this.length},each:function(e,t){var n=0,r=this.length;for(;n<r;n++)e.call(t||this[n],this[n],n,this);return this},push:s.push,sort:s.sort,splice:s.splice},r.prototype.prev=r.prototype.previous,i.aug=function(e){var t,n;for(t in e)n=e[t],typeof n=="function"&&(r.prototype[t]=n)},i.setSelectorEngine=function(e){var t,r,s,o,u,a=n.createElement("p"),f=e.select||e.sel||e;a.innerHTML="<a/><i/><b/>",s=a.firstChild;try{o=c(e.matching)?function(t,n){return e.matching([n],t).length>0}:c(e.is)?function(t,n){return e.is(n,t)}:c(e.matchesSelector)?function(t,n){return e.matchesSelector(n,t)}:c(e.match)?function(t,n){return e.match(n,t)}:c(e.matches)?function(t,n){return e.matches(n,t)}:null,o||(t=e("a",a),o=c(t._is)?function(t,n){return e(n)._is(t)}:c(t.matching)?function(t,n){return e(n).matching(t).length>0}:c(t.is)&&!t.is.__ignore?function(t,n){return e(n).is(t)}:c(t.matchesSelector)?function(t,n){return e(n).matchesSelector(t)}:c(t.match)?function(t,n){return e(n).match(t)}:c(t.matches)?function(t,n){return e(n).matches(t)}:null);if(!o)throw new Error("Traversty: couldn't find selector engine's `matchesSelector`");if(o("x,y",a)||!o("a,p",a))throw new Error("Traversty: couldn't make selector engine's `matchesSelector` work");if((r=f("b,a",a)).length!==2)throw new Error("Traversty: don't know how to use this selector engine");u=r[0]===s?f:w(f,o);if((r=u("b,a",a)).length!==2||r[0]!==s)throw new Error("Traversty: couldn't make selector engine work");b=o,y=u}catch(h){throw l(h)?h:new Error("Traversty: error while figuring out how the selector engine works: "+(h.message||h))}finally{a=null}return i},i.noConflict=function(){return e.traversty=t,this},i}();return A})

    traversty.aug({
        remove: function () {
            this.each(function (el) {
                el.parentNode.removeChild(el);
            });
        },
        hasClass: function (className) {
            var hasClass = true;

            this.each(function (el) {
                hasClass = el.classList.contains(className);

                if (!hasClass) {
                    return false;
                }
            });

            return hasClass;
        },
        addClass: function (className) {
            return this.each(function (el) {
                el.classList.add(className);
            });
        },
        removeClass: function (className) {
            return this.each(function (el) {
                el.classList.remove(className);
            });
        }
    });

    $ = traversty;

    return _this;
})();
