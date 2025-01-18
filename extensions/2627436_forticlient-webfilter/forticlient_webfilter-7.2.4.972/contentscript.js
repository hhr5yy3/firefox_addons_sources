/** @format */

//var MyNamespace = MyNamespace ||
(function () {
  var unprocessed_list = {};

  var YOUTUBE_CUSTOM_CHANNELS = [
    'UC-9-kyTW8ZkZNDHQJ6FgpwQ',
    'UCYfdidRxbB8Qhf0Nx7ioOYw',
    'UCrpQ4p1Ql_hG8rKXIKM1MOQ',
    'UCtFRv9O2AHqOZjjynzrv-xg',
    'UC4R8DWoMoI7CAwX8_LjQHig',
    'UCEgdi0XIXXZ-qJOFPf4JSKw',
  ];

  var CHANNEL_PAGE_CHANNEL_NAME_ELEMENT =
    '#text';

  var VIDEO_PAGE_MAIN_VIDEO_ELEMENT = 'video.html5-main-video';

  var VIDEO_PAGE_CHANNEL_NAME_ELEMENT = '#text > a';

  var CHANNEL_AUTOPLAY_VIDEO_ELEMENT =
    'ytd-page-manager ytd-browse ytd-channel-video-player-renderer video';

  var MINI_PLAYER_VIDEO_ELEMENT = 'ytd-miniplayer video.html5-main-video';

  var GET_VIDEO_FROM_CHANNEL_ELEMENT =
    'div#content ytd-shelf-renderer div#scroll-container ytd-grid-video-renderer a';

  var WATCH_PAGE_VIDEO_NAME =
    '#title > h1 > yt-formatted-string';

  var CHANNEL_PREFIX_REGEX = /^(\/channel\/|\/c\/|\/user\/|\/@)/;

  var CHANNEL_ID_REGEX = /^\/(channel|c|user)\/([^/]*)\/?.*?/;

  var WAIT_FOR_YT_APP_INTERVAL = 10;
  //document.addEventListener('DOMContentLoaded', function() {
  var root_url;

  /**
   * youtube channel filtering logic on youtube
   * @param youtubeApp the youtube main app DOM element
   */
  function ytFilterProcess(youtubeApp) {
    var action = 'youtubeFilter';

    var videoElement;
    var channelAnchorElement;

    /**
     * This manager component will be toggled hidden and visible
     * inbetween the time extension takes to rate youtube channel
     */
    var pageManager = youtubeApp.querySelector('ytd-page-manager');

    if (!pageManager) {
      window.setTimeout(function () {
        ytFilterProcess(youtubeApp);
      }, WAIT_FOR_YT_APP_INTERVAL);
      return;
    }

    // get url of current page
    var urlObj;
    try {
      urlObj = new URL(window.location.href);
    } catch (err) {
      console.log('Errornous urlObj' + window.location.href);
      return;
    }

    /**
     * In the case that user opens a youtube channel page
     * from new tab, some youtube events may not fire.
     * We have to check this situation.
     * If the tab is a channel page, rate the channel page.
     */
    var isYoutubeChannel = CHANNEL_PREFIX_REGEX.exec(urlObj.pathname);

    if (isYoutubeChannel) {
      // hide page content while extension rates channel
      pageManager.style.visibility = 'hidden';

      var channelNameElement = youtubeApp.querySelector(
        CHANNEL_PAGE_CHANNEL_NAME_ELEMENT
      );

      if (
        urlObj.pathname.startsWith('/channel') ||
        urlObj.pathname.startsWith('/@') ||
        urlObj.pathname.startsWith('/c')
      ) {
        var channelUrl = url.toString();

        var isCustomYoutubeChannel = false;

        for (var i = 0; i < YOUTUBE_CUSTOM_CHANNELS.length; i++) {
          if (channelUrl.includes(YOUTUBE_CUSTOM_CHANNELS[i])) {
            isCustomYoutubeChannel = true;
            break;
          }
        }

        if (!isCustomYoutubeChannel) {
          var channelNameElement = youtubeApp.querySelector(
            CHANNEL_PAGE_CHANNEL_NAME_ELEMENT
          );
          var channelName = '';
          if (channelNameElement) {
            channelName = channelNameElement.textContent;
          }

          var message = {
            action: action,
            channelUrl: channelUrl,
            channelName: channelName,
            videoUrl: '',
            videoName: '',
          };
          console.log(message);

          chrome.runtime.sendMessage(message, function (response) {
            if (!response.block) {
              pageManager.style.visibility = 'initial';
              var video = pageManager.querySelector(
                CHANNEL_AUTOPLAY_VIDEO_ELEMENT
              );
              if (video) {
                video.play().catch(function (err) {
                  console.log('Could not play video: ' + err);
                });
              }
            }
          });
        } else {
          pageManager.style.visibility = 'initial';
          var video = pageManager.querySelector(CHANNEL_AUTOPLAY_VIDEO_ELEMENT);
          if (video) {
            video.play().catch(function (err) {
              console.log('Could not play video: ' + err);
            });
          }
        }
      }
    } else {
      pageManager.style.visibility = 'initial';
    }

    /** Youtube navigation start event, fired when page changes url */
    youtubeApp.addEventListener('yt-navigate-start', function () {
      console.log('yt-navigate-start');

      pageManager.style.visibility = 'hidden';
      videoElement = youtubeApp.querySelector(VIDEO_PAGE_MAIN_VIDEO_ELEMENT);
      if (videoElement) {
        videoElement.pause();
      }
    });

    youtubeApp.addEventListener('yt-navigate-finish', function () {
      console.log('yt-navigate-finish');

      var href = window.location.href;

      chrome.runtime.sendMessage({ action: 'yt-navigate-finish', url: href });
    });

    /**
     * Youtube page type changed event, fired when navigation
     * between video <-> channel <-> menu pages.
     */
    youtubeApp.addEventListener('yt-page-type-changed', function () {
      console.log('yt-page-type-changed');

      videoElement = youtubeApp.querySelector(VIDEO_PAGE_MAIN_VIDEO_ELEMENT);
      if (videoElement) {
        videoElement.pause();
      }
    });

    /**
     * Youtube video updated event, fired when the html5 video
     * finished fetching video data.
     */
    youtubeApp.addEventListener('yt-player-updated', function (e) {
      console.log('yt-player-updated');

      var channelAutoPlayVideoElement = youtubeApp.querySelector(
        CHANNEL_AUTOPLAY_VIDEO_ELEMENT
      );
      if (channelAutoPlayVideoElement) {
        channelAutoPlayVideoElement.pause();
        setTimeout(function () {
          channelAutoPlayVideoElement.pause();
        }, 500);
      }

      /**
       * rate mini player, by time yt-player-updated,
       * the video element should exist in DOM.
       */
      var miniplayerElement = youtubeApp.querySelector('ytd-miniplayer');

      function checkMiniplayerPlaylistChannels() {
        // var miniplayerChannel = miniplayerElement.querySelectorAll(
        //   'ytd-playlist-panel-video-renderer span#byline'
        // );

        var miniplayerVideoUrl = miniplayerElement.querySelector(
          'ytd-playlist-panel-video-renderer a#wc-endpoint'
        );

        if (!miniplayerVideoUrl) {
          window.setTimeout(function () {
            checkMiniplayerPlaylistChannels();
          }, WAIT_FOR_YT_APP_INTERVAL);
          return;
        }

        miniplayerVideoUrl = miniplayerVideoUrl.href;

        var pos = miniplayerVideoUrl.indexOf('&list=');

        var videoUrl = miniplayerVideoUrl.slice(0, pos);

        fetch(miniplayerVideoUrl)
          .then(function (res) {
            return res.text();
          })
          .then(function (data) {
            var pos = data.indexOf('/channel/');
            var startPos = pos + '/channel/'.length;
            var endPos = startPos + 24;
            var channelId = data.slice(startPos, endPos);
            var channelUrl = 'https://www.youtube.com/channel/' + channelId;
            var message = {
              action: action,
              channelUrl: channelUrl,
              videoUrl: videoUrl,
            };
            console.log(message);

            chrome.runtime.sendMessage(message, function (response) {
              if (!response.block) {
                miniplayerElement.style.visibility = 'initial';
                var miniplayerVideoElement = document.querySelector(
                  MINI_PLAYER_VIDEO_ELEMENT
                );
                if (miniplayerVideoElement) {
                  console.log('video play');
                  miniplayerVideoElement.play().catch(function (err) {
                    console.log('Could not play video: ' + err);
                  });
                }
              }
            });
          });
      }

      function checkMiniplayerPlaylist() {
        var miniplayerPlaylist = miniplayerElement.querySelector('div#items');

        if (!miniplayerPlaylist) {
          window.setTimeout(function () {
            checkMiniplayerPlaylist();
          }, WAIT_FOR_YT_APP_INTERVAL);
          return;
        }

        var config = { childList: true };

        var miniplayerObServer = new MutationObserver(
          checkMiniplayerPlaylistChannels
        );

        checkMiniplayerPlaylistChannels();

        miniplayerObServer.observe(miniplayerPlaylist, config);
      }

      if (miniplayerElement) {
        miniplayerElement.style.visibility = 'hidden';
        if (miniplayerElement.querySelector('video')) {
          miniplayerElement.querySelector('video').pause();
        }

        checkMiniplayerPlaylist();
      }
    });

    youtubeApp.addEventListener('yt-page-data-updated', function () {
      console.log('yt-page-data-updated');

      videoElement = youtubeApp.querySelector(VIDEO_PAGE_MAIN_VIDEO_ELEMENT);
      if (videoElement) {
        videoElement.pause();
      }

      // get new URL after page change
      var url = new URL(window.location.href);

      if (url.pathname.startsWith('/watch')) {
        channelAnchorElement = youtubeApp.querySelector(
          VIDEO_PAGE_CHANNEL_NAME_ELEMENT
        );
        if (!channelAnchorElement) {
          var videoUnavailable = pageManager.querySelector(
            'yt-player-error-message-renderer'
          );
          if (videoUnavailable) {
            pageManager.style.visibility = 'initial';
            return;
          }
        }
        var channelURL = '';
        var channelName = '';
        if (channelAnchorElement) {
          channelURL = new URL(channelAnchorElement.href);
          channelName = channelAnchorElement.textContent;
        }
        var videoNameElement = pageManager.querySelector(WATCH_PAGE_VIDEO_NAME);
        var videoName = '';
        if (videoNameElement) {
          videoName = videoNameElement.textContent;
        }

        var pos = url.toString().indexOf('&');
        var videoUrl = url.toString();

        if (pos !== -1) {
          videoUrl = url.toString().slice(0, pos);
        }

        var message = {
          action: action,
          channelUrl: channelURL.toString(),
          channelName: channelName,
          videoUrl: videoUrl,
          videoName: videoName,
        };
        console.log(message);

        chrome.runtime.sendMessage(message, function (response) {
          if (!response.block) {
            pageManager.style.visibility = 'initial';
            if (videoElement) {
              console.log('video play');
              videoElement.play().catch(function (err) {
                console.log('Could not play video: ' + err);
              });
            }
          }
          if (response.hideComment) {
            youtubeApp.querySelector('ytd-comments').style.visibility =
              'hidden';
          }
        });
      } else if (CHANNEL_PREFIX_REGEX.exec(url.pathname)) {
        if (
          url.pathname.startsWith('/channel') ||
          url.pathname.startsWith('/@') ||
          url.pathname.startsWith('/c')
        ) {
          var channelUrl = url.toString();

          var isCustomYoutubeChannel = false;

          for (var i = 0; i < YOUTUBE_CUSTOM_CHANNELS.length; i++) {
            if (channelUrl.includes(YOUTUBE_CUSTOM_CHANNELS[i])) {
              isCustomYoutubeChannel = true;
              break;
            }
          }

          if (!isCustomYoutubeChannel) {
            var channelNameElement = youtubeApp.querySelector(
              CHANNEL_PAGE_CHANNEL_NAME_ELEMENT
            );

            var channelName = channelNameElement.textContent;
            var message = {
              action: action,
              channelUrl: channelUrl,
              channelName: channelName,
              videoUrl: '',
              videoName: '',
            };

            console.log(message);
            chrome.runtime.sendMessage(message, function (response) {
              if (!response.block) {
                pageManager.style.visibility = 'initial';
              }
            });
          } else {
            pageManager.style.visibility = 'initial';
          }
        } else {
          var channelNameElement = youtubeApp.querySelector(
            CHANNEL_PAGE_CHANNEL_NAME_ELEMENT
          );
          var channelName = '';
          if (channelNameElement) {
            channelName = channelNameElement.textContent;
          }

          var videoFromChannelLink = pageManager.querySelector(
            GET_VIDEO_FROM_CHANNEL_ELEMENT
          );

          var videoFromChannelHref = videoFromChannelLink.href;

          var videoFromChannelUrl = videoFromChannelHref;

          fetch(videoFromChannelUrl)
            .then(function (res) {
              return res.text();
            })
            .then(function (data) {
              var pos = data.indexOf('/channel/');
              var startPos = pos + '/channel/'.length;
              var endPos = startPos + 24;
              var channelId = data.slice(startPos, endPos);
              var channelUrl = 'https://www.youtube.com/channel/' + channelId;
              var message = {
                action: action,
                channelUrl: channelUrl,
                channelName: channelName,
                videoUrl: '',
                videoName: '',
              };
              console.log(message);

              chrome.runtime.sendMessage(message, function (response) {
                if (!response.block) {
                  pageManager.style.visibility = 'initial';
                  var channelVideoElement = pageManager.querySelector(
                    CHANNEL_AUTOPLAY_VIDEO_ELEMENT
                  );
                  if (channelVideoElement) {
                    channelVideoElement.play().catch(function (err) {
                      console.log('Could not play video: ' + err);
                    });
                  }
                }
              });
            });
        }
      } else {
        pageManager.style.visibility = 'initial';
      }
    });
  }

  function ytEmbedFilterProcess() {
    var action = 'youtubeFilter';

    if (document.body.style.visibility !== 'hidden') {
      document.body.style.visibility = 'hidden';
    }
    var videoUrl = '';
    var channelUrl = '';
    var link = document.querySelector('link[rel=canonical]');
    console.log(link);
    if (!link) {
      setTimeout(ytEmbedFilterProcess, 500);
      return;
    }
    videoUrl = link.href;

    link = document.querySelector('a.ytp-title-channel-logo');
    console.log(link);
    if (!link) {
      setTimeout(ytEmbedFilterProcess, 500);
      return;
    }
    channelUrl = link.href;

    var message = {
      action: action,
      channelUrl: channelUrl,
      videoUrl: videoUrl,
    };

    console.log(message);
    chrome.runtime.sendMessage(message, function (response) {
      if (!response.block) {
        document.body.style.visibility = 'initial';
      }
    });
  }

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    //console.log("block url:" + decodeURIComponent(request.block_url) + ", action url:" + request.action_url);
    //console.log("block url:" + decodeURIComponent(request.block_url));
    var result = false;
    sendResponse({ message: 'done' });
    if (root_url == request.block_url) {
      //console.log("root node:" + document.getRootNode());//.style.visibility = "hidden";
      document.getRootNode().documentElement.style.visibility = 'hidden';
      if (document.getRootNode().documentElement.src)
        document.getRootNode().documentElement.src = request.action_url;
      //console.log("****** found block url ******:" + root_url);
    } else {
      result = hiddenHyperlinkElement(request.block_url, request.action_url);
      if (!result) {
        result = hiddenImageElement(request.block_url, request.action_url);
        if (!result) {
          result = hiddenIFrameElement(request.block_url, request.action_url);
          if (!result) {
            // console.log("****** did not found block url: ******" + request.block_url);
            // save unprocessed url for later process
            unprocessed_list[request.block_url] = {
              action_url: request.action_url,
            };
          }
        }
      }
    }
  });

  // get tab id
  var url = window.location.href;
  var position;
  var tabid;

  root_url = url;
  console.log('content script, url:' + url);
  //});

  function unprocessListTimer() {
    var url_list_keys = [];
    var result = false;

    for (url in unprocessed_list) {
      result = hiddenHyperlinkElement(url, unprocessed_list[url].action_url);
      if (!result)
        result = hiddenImageElement(url, unprocessed_list[url].action_url);
      if (!result)
        result = hiddenIFrameElement(url, unprocessed_list[url].action_url);
      if (result) url_list_keys.push(url);
    }

    for (var i = 0; i < url_list_keys.length; i++) {
      delete unprocessed_list[url_list_keys[i]];
    }
  }

  setInterval(function () {
    unprocessListTimer();
  }, 500);

  function hiddenHyperlinkElement(url, action_url) {
    var hyperlinks = document.getElementsByTagName('A');
    var count = hyperlinks.length;
    var i;
    var found = false;

    //console.log("search link:" + searchlink);
    for (i = 0; i < count; i++) {
      //console.log("hyperlink:" + decodeURIComponent(hyperlinks[i].href));
      if (hyperlinks[i].href.length != 0) {
        try {
          if (url == decodeURIComponent(hyperlinks[i].href)) {
            hyperlinks[i].style.visibility = 'hidden';
            hyperlinks[i].href = action_url;
            found = true;
            //console.log("found link");
          }
        } catch (err) {
          console.log('error:' + err);
          console.log('wrong hyper link:' + hyperlinks[i].href);
        }
      }
      //console.log("hyperlink:" + decodeURIComponent(hyperlinks[i].href));
    }
    return found;
  }

  function hiddenImageElement(url, action_url) {
    var imagelinks = document.getElementsByTagName('IMG');
    var count = imagelinks.length;
    var i;
    var found = false;

    //console.log("search link:" + searchlink);
    for (i = 0; i < count; i++) {
      //console.log("hyperlink:" + decodeURIComponent(hyperlinks[i].href));
      if (imagelinks[i].src.length != 0) {
        try {
          //var test = decodeURIComponent(imagelinks[i].src);
          //if (test.indexOf("144x60-green.gif") != -1 && url.indexOf("144x60-green.gif") != -1){
          //    console.log("****** found link 144x60-green.gif ******:" + test);
          //}
          if (url == decodeURIComponent(imagelinks[i].src)) {
            imagelinks[i].style.visibility = 'hidden';
            imagelinks[i].src = action_url;
            found = true;
            //console.log("found link");
          }
        } catch (err) {
          //console.log("error:" + err);
          //console.log("wrong hyper link:" + imagelinks[i].src);
        }
      }
      //console.log("hyperlink:" + decodeURIComponent(hyperlinks[i].href));
    }
    return found;
  }

  function hiddenIFrameElement(url, action_url) {
    var iframelinks = document.getElementsByTagName('IFRAME');
    var count = iframelinks.length;
    var i;
    var found = false;
    //console.log("search link:" + searchlink);
    for (i = 0; i < count; i++) {
      //console.log("hyperlink:" + decodeURIComponent(hyperlinks[i].href));
      if (iframelinks[i].src.length != 0) {
        try {
          if (url == decodeURIComponent(iframelinks[i].src)) {
            //console.log("iframe source:" + decodeURIComponent(iframelinks[i].src));
            //console.log("found link");
            iframelinks[i].style.visibility = 'hidden';
            iframelinks[i].src = action_url;
            found = true;
          }
        } catch (err) {
          //console.log("error:" + err);
          //console.log("wrong hyper link:" + iframelinks[i].src);
        }
      }
      //console.log("hyperlink:" + decodeURIComponent(hyperlinks[i].href));
    }
    return found;
  }

  window.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded');

    // look for youtube app DOM element
    var youtubeApp = window.document.querySelector('ytd-app');

    if (youtubeApp) {
      ytFilterProcess(youtubeApp);
    }

    var youtubeEmbed =
      window.location.href.indexOf('youtube.com/embed/') !== -1;

    if (youtubeEmbed) {
      ytEmbedFilterProcess();
    }
  });
})();
