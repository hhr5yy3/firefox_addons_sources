var Tool = (function(){

  const RANKING_DIFFICULTY_ITEMS = 20;
  const TAG_OCCURRENCES = 3;
  const BRANDED_FACTOR = 1.5;


  var source = 'youtub';

  var rootSel = '#masthead > #container, #yt-masthead-content #masthead-search';
  var observer;
  var videosObserver;
  var suggestionsTimer;
  var suggestionsList = {};
  var cachedSuggestions = {};
  var onConfigReceived = null;
  var videoTitle = '';
  var widgetRows = [];
  var tm;
  var videoCache = {order: [], cache: {}};
  var processVideosTimer = null;
  var avgTimer = null;
  var showAdvancedClicked = false;
  var advancedMetricsLoading = false;
  var checkWidgetPositionTimer = null;
  var $widgetsRoot;
  var $widgetsVideoPageRoot;
  var processedVideosCount = 0;

  var lastActiveQuery = '';
  var metricsPromise;

  var $popover;
  var popoverTimeout;


  var init = function(){
    var settings = Starter.getSettings();
    showAdvancedClicked = settings.showYoutubeAdvancedMetrics;
    setTimeout( function(){
      isDarkMode();
      processPage();
      initVideosMutationObserver($('#page-manager')[0]);
    }, 1000 );
    initPopover();
    initSuggestions();
    initWindowMessaging();
    initURLChangeListener(function(url){
      $('.xt-widget-table').remove();
      showVideosSpinner();
      widgetRows = [];
      showAdvancedClicked = settings.showYoutubeAdvancedMetrics;
      processedVideosCount = 0;
      $('#xt-yt-widgets-root > div').text('');
      // resetVideoCache();
      $('.xt-yt-item-advanced-metrics').remove();
      if (videosObserver) {
        clearTimeout(processVideosTimer);
        videosObserver.disconnect();
      }
      setTimeout(checkAndProcessPage, 1500);
    });
  };


  var isVideoPage = function(){
    return document.location.href.indexOf('youtube.com/watch?') !== -1;
  };


  var resetVideoCache = function(){
    processedVideosCount = 0;
    videoCache = {order: [], cache: {}};
  };


  var checkAndProcessPage = function(){
    var $progress = $('yt-page-navigation-progress');
    if ($progress.is(':visible')) {
      setTimeout(function(){
        checkAndProcessPage();
      }, 200);
    }
    else {
      processPage();
      initVideosMutationObserver($('#page-manager')[0]);
    }
  };


  var initSuggestions = function(){
    var timer = setInterval(function(){
      if (!observer) {
        if ($('.gssb_c, .sbdd_a, yt-searchbox')[0]) {
          clearInterval(timer);
          initMutationObserver( $('.gssb_c, .sbdd_a, yt-searchbox')[0] );
        }
      }
    }, 500);
  };


  var getSearchQuery = function(){
    var $input = $('#search-input input#search');
    if (!$input[0]) $input = $('#masthead-search-term');
    if (!$input[0]) return '';
    var query = $input.val();
    return query;
  };


  var isBrandedQuery = function(){
    let branded = false;
    $('ytd-shelf-renderer #title').map(function(i, node){
      if (node.textContent.indexOf('Latest') !== -1) branded = true;
    });
    return branded;
  };


  var isDarkMode = function() {
    var res = document.documentElement.getAttribute('dark') !== null;
    if (res) document.documentElement.setAttribute('dark', true);
    return res;
  };


  var initPopover = function(){
    $popover = $('<div/>', {id: 'xt-popover', class: 'xt-yt-popover'})
      .appendTo( $('body') );
    var hideTimer;

    $('body').on('mouseenter', '.xt-yt-vi-advanced-metrics',
      function(e){
        var html = decodeURIComponent(this.dataset.popover);
        var rect = e.target.getBoundingClientRect();
        $popover.html(html);
        var top = document.documentElement.scrollTop + rect.top + rect.height - 5;
        showPopover($popover, top, e.pageX - 50);
      });
    $('body').on('mouseenter', '.xt-yt-item-advanced-metrics',
      function(e){
        var html = decodeURIComponent(this.dataset.popover);
        var rect = e.target.getBoundingClientRect();
        $popover.html(html);
        var top = document.documentElement.scrollTop + rect.top + rect.height - 5;
        showPopover($popover, top, e.pageX - 50);
      });
    $('body').on('mouseleave', '.xt-yt-item-advanced-metrics',
      function(e){
        clearTimeout(popoverTimeout);
        if ($(e.relatedTarget).closest('#xt-popover')[0] || e.relatedTarget === $popover[0]) return;
        hideTimer = setTimeout(function(){
          $popover.hide();
        }, 500);
      });
    $('body').on('mouseenter', '.xt-popover', function(e){
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = null;
    });

    $popover.mouseleave(function(e){
      $popover.hide();
    });
  };


  var showPopover = function($popover, top, left){
    if (popoverTimeout) clearTimeout(popoverTimeout);
    popoverTimeout = setTimeout(function(){
      $popover
        .show()
        .css('top', top)
        .css('left', left);
    }, 100);
  };


  var processPage = function(){
    $('#xt-yt-widgets-root').remove();
    $widgetsVideoPageRoot = null;
    $widgetsRoot = null;
    var settings = Starter.getSettings();
    var plan = Common.getPlan();
    var config = Common.getConfig();
    var showFreeFeatures = config.yFeaturesFree;
    var hasCredits = Common.getCredits() > 0 || (config.areSubsEnabled && plan.credits > 0);

    injectWidgetsRoot();
    injectVideoPageWidgetsRoot();
    var promoParam = Common.subscriptionPromoCondition();
    if (promoParam) {
      injectFreeuserWidgetsRoot();
      renderPromoIframe(promoParam);
      if (document.location.pathname.indexOf('/watch') === -1 && !showFreeFeatures) return;
    }

    if (document.location.pathname.indexOf('/watch') === 0) {
      getConfig('', function(configs, html){
        processYTConfig(configs, html, promoParam && !showFreeFeatures);
      }); // for video page
      return;
    }

    var query = getSearchQuery();
    if (!query) return;
    runVideosProcessing();
    query = Common.cleanKeyword(query);
    if (!query) return;
    metricsPromise = new Promise((resolve) => {
      chrome.runtime.sendMessage({
        cmd: 'api.getKeywordData',
        data: {
          keywords: [query],
          src: source
        }
      }, function( json ){
        processQueryResponse( json );
        resolve(json);
      });
    });

    if (settings.showAutocompleteButton) {
      addFindLongTailKeywordsBtn();
    }
    if (settings.showGoogleTrendChart && !isVideoPage()) {
      initTrendsChart({
        showVolume: hasCredits,
        query: query,
        metrics: metricsPromise,
        timeRange: settings.googleTrendChartDefaultTime
      });
    }
    if (settings.sourceList.trenkw && !isVideoPage()) {
      getTrendingKeywords();
    }
    if (settings.sourceList.gpasea) {
      getPeopleAlsoSearch();
    }
  };


  var injectWidgetsRoot = function(){
    if ($widgetsRoot && $widgetsRoot.is(':visible')) return;
    var $parent = $('ytd-secondary-search-container-renderer');
    $widgetsRoot = $('<div>', {id: 'xt-yt-widgets-root'});
    $widgetsRoot.prependTo($parent);
    console.log('injectWidgetsRoot', $parent[0], $widgetsRoot);
    $widgetsRoot.html([
      '<div id="xt-yt-freeuser-container"></div>',
      '<div id="xt-yt-widgets-ltk-container"></div>',
      '<div id="xt-yt-widgets-avg-container"></div>',
      '<div id="xt-yt-widgets-chart-container"></div>',
      '<div id="xt-yt-widgets-tags-container"></div>',
      '<div id="xt-yt-widgets-also-container"></div>',
      '<div id="xt-yt-widgets-trending-container"></div>',
      '<div id="xt-yt-widgets-top-container"></div>'
    ].join('\n'));
    checkWidgetPosition($widgetsRoot, $parent);
  };


  var injectVideoPageWidgetsRoot = function(){
    if (!isVideoPage()) return;
    if ($widgetsVideoPageRoot) return;
    var $parent = $('#related');
    $widgetsVideoPageRoot = $('<div>', {id: 'xt-yt-widgets-root'});
    $widgetsVideoPageRoot.prependTo($parent);
    $widgetsVideoPageRoot.html([
      '<div id="xt-yt-transcript-widget"></div>',
      '<div id="xt-yt-freeuser-container"></div>',
      '<div id="xt-yt-widgets-avg-container"></div>',
      '<div id="xt-yt-widgets-tags-container"></div>'
    ].join('\n'));
    checkWidgetPosition($widgetsVideoPageRoot, $parent);
  };


  var checkWidgetsOrder = function(){
    const order = [
      '#xt-yt-freeuser-container',
      '#xt-yt-transcript-widget',
      "#xt-yt-widgets-ltk-container",
      "#xt-yt-widgets-avg-container",
      "#xt-yt-widgets-chart-container",
      "#xt-yt-widgets-tags-container",
      "#xt-yt-widgets-also-container",
      "#xt-yt-widgets-trending-container",
      "#xt-yt-widgets-top-container",
      ];
    const $parent = $('#xt-yt-widgets-root');
    order.map(selector => {
      let $widget = $(selector);
      $parent.append($widget);
    });
  };


  var injectFreeuserWidgetsRoot = function(){
    if ($widgetsVideoPageRoot) return;
    var $parent = $('ytd-secondary-search-container-renderer');
    if ($parent[0]) {
      $parent.removeAttr('hidden');
    }
    if (!$parent[0]) {
      $parent = $('#related');
    }
    $widgetsVideoPageRoot = $('<div>', {id: 'xt-yt-widgets-root'});
    $widgetsVideoPageRoot.prependTo($parent);
    $widgetsVideoPageRoot.html([
      '<div id="xt-yt-freeuser-container" class="xt-ke-card"></div>',
    ].join('\n'));
    checkWidgetPosition($widgetsVideoPageRoot, $parent);
  };


  var getConfig = function(url, cbOnDataReceived){
    if (!url) url = location.href;
    var ytplayerConfig;
    var ytInitialData;
    $.get(url).then(function(response){
      var dom = (new DOMParser()).parseFromString(response, "text/html");
      var scripts = $('#player-wrap script, #player script', dom);
      for (var i = 0, len = scripts.length; i < len; i++) {
        var script = scripts[i];
        var text = script.textContent;
        if (!text.match(/ytplayer.config =/)) continue;
        var matches = text.match(/ytplayer\.config = (.*?});/);
        if (matches) {
          ytplayerConfig = JSON.parse(matches[1]);
        }
      }
      var scripts = $('body > script', dom);
      for (var i = 0, len = scripts.length; i < len; i++) {
        var script = scripts[i];
        var text = $.trim(script.textContent);
        var pattern = 'window["ytInitialData"] = ';
        if (text.indexOf(pattern) === 0) {
          var jsonStr = text.replace(pattern, '');
          jsonStr = jsonStr.replace(/};[\s\S]*/, '}');
          ytInitialData = JSON.parse(jsonStr);
        }
        else if (text.indexOf('var ytInitialData =') !== -1) {
          var jsonStr = text.replace(/var ytInitialData\s*=\s*{/, '{');
          jsonStr = jsonStr.replace(/};[\s\S]*/, '}');
          ytInitialData = JSON.parse(jsonStr);
        }
        if (!ytplayerConfig) {
          if (text.indexOf('var ytInitialPlayerResponse =') !== -1) {
            var jsonStr = text.replace(/var ytInitialPlayerResponse = {/, '{');
            jsonStr = jsonStr.replace(/};[\s\S]*/, '}');
            ytplayerConfig = {args: {player_response: jsonStr}};
          }
        }
      }
      cbOnDataReceived({ytplayerConfig: ytplayerConfig, ytInitialData: ytInitialData}, response);
    });
  };


  var getConfig2 = function( cbOnDataReceived ){
    onConfigReceived = cbOnDataReceived;
    Common.inject(function(cmd){
      var get = function(){
        if (typeof window.ytplayer !== 'undefined' && window.ytplayer.config) {
          return window.ytplayer;
        }
      };
      var send = function(data){
        window.postMessage({cmd: cmd, data: data}, '*');
      };
      var config = get();
      if (config) send(JSON.stringify(config));
      else {
        var count = 100;
        var timer = setInterval(function(){
          config = get();
          if (config) {
            clearInterval(timer);
            send(JSON.stringify(config));
          }
          if (--count <= 0) {
            clearInterval(timer);
            send('');
          }
        }, 100);
      }
    }, ['xt-get-config']);
  };


  var getRenderParams = function(params){
    var target = isVideoPage() ? 'video' : 'serp';
    var title = 'Tags';
    if (target === 'serp') title = 'Most Used Tags';
    if (params.type === 'also') title = 'People Also Search';
    var settings = Starter.getSettings();
    var iframeSrcParam = 'tags';
    var rootSelector = 'xt-yt-keywords';
    var addTo = ['#xt-yt-widgets-tags-container', '#related'];
    if (params.type === 'also') {
      addTo = '#xt-yt-widgets-also-container';
      rootSelector = 'xt-yt-also';
      iframeSrcParam = 'also';
    }
    var excludeCols = [];
    if (target === 'serp') excludeCols = ['cpc', 'comp'];
    var res = {
      settingEnabled: settings.sourceList.youtag,
      query: getSearchQuery(),
      type: 'tags',
      title: title,
      columnName: 'Tag',
      rootSelector: rootSelector,
      addTo: addTo,
      addMethod: 'prependTo',
      excludeCols: excludeCols,
      iframeSrcParam: iframeSrcParam,
      filename: 'yt-' + videoTitle.replace(/\s+/g, '_'),
      darkMode: isDarkMode(),
      fnGenerateLink: function(keywordEnc){
        return document.location.origin + '/results?search_query=' + keywordEnc;
      },
      onAdded: function($root){
        checkWidgetsOrder();
      },
      onClosed: function(){
      },
      loadAll: function(){}
    };
    for (var key in params) {
      res[key] = params[key];
    }
    return res;
  };


  var processYTConfig = function(configs, html, freeuser){
    // console.log(configs);
    if (!configs.ytplayerConfig) return;
    try {
      // console.log(configs);
      var ytplayerConfig = configs.ytplayerConfig;
      var ytInitialData = configs.ytInitialData;
      var response = JSON.parse(ytplayerConfig.args.player_response);
      processCaptions(response);
      videoTitle = response.videoDetails.title || '';
      var videoId = response.videoDetails.videoId;
      if (getVideoIdFromURL() !== videoId) return;
      var keywords = response.videoDetails.keywords;
      if (!keywords) keywords = [];
      injectVideoPageWidgetsRoot();

      // if (freeuser) return;
      var settings = Starter.getSettings();
      getVideoInsights(html).then(function(res){
        renderVideoInsights(res);
      });
      if (!settings.sourceList.youtag) {
        var rows = [];
        for (var keyword of keywords) {
          rows.push({keyword: keyword});
        }
        if (rows.length) {
          Common.renderWidgetTable(rows, getRenderParams({
            json: null,
            loadAll: function(){
              processTags(keywords);
            }
          }));
        }
        return;
      }
      if (keywords.length) processTags(keywords);
    } catch (e) {
      console.log(e);
    }
  };


  var processCaptions = async function(json){
    var tracks = getObjValue(json, '.captions.playerCaptionsTracklistRenderer.captionTracks');
    const title = json.videoDetails.title || '';
    const author = json.videoDetails.author || '';
    var res = {};
    var foundIndex = 0;
    if (tracks) {
      for (var i = 0, len = tracks.length; i < len; i++) {
        var track = tracks[i];
        if (track.languageCode === 'en') {
          foundIndex = i;
          break;
        }
      }
      var res = {
        link: tracks[foundIndex].baseUrl,
        language: tracks[foundIndex].languageCode
      }
      let rawTranscript = await getTranscript(res);
      rawTranscript = rawTranscript.replace(/&#39;/g, "'");
      renderTranscriptWidget({
        text: rawTranscript,
        title: title,
        channelName: author
      });
    }
    else {
      setTimeout(function(){
        renderTranscriptWidget({text: ''});
      }, 1500);
    }
  };


  async function getTranscript(langOption) {
    const rawTranscript = await getRawTranscript(langOption.link);
    const transcript = rawTranscript.map((item) => { return item.text; }).join(' ');
    return transcript;
  }


  async function getRawTranscript(link) {
    const transcriptPageResponse = await fetch(link);
    const transcriptPageXml = await transcriptPageResponse.text();
    const xml = (new DOMParser()).parseFromString(transcriptPageXml, 'text/xml');
    const textNodes = xml.querySelectorAll('text');
    return Array.from(textNodes).map(i => {
      return {
        start: i.getAttribute("start"),
        duration: i.getAttribute("dur"),
        text: i.textContent
      };
    });
  }


  var renderTranscriptWidget = function(params){
    var settings = Starter.getSettings();
    var apiKey = settings.apiKey || '';
    var settingEnabled = settings.sourceList.youtag;
    var query = getSearchQuery();
    var pur = Common.getCredits() > 0 ? 0 : 1;
    var version = chrome.runtime.getManifest().version;
    var buttons = `
      <button class="xt-transcript-summarize-btn xt-ke-btn" data-url="https://chatgpt.com">${ytSVGIcons.chatgpt} Use ChatGPT</button>
      <button class="xt-transcript-summarize-btn xt-ke-btn" data-url="https://claude.ai/chats">${ytSVGIcons.claude} Use Claude</button>
      <button class="xt-transcript-summarize-btn xt-ke-btn" data-url="https://gemini.google.com">${ytSVGIcons.gemini} Use Gemini</button>
    `;
    if (!params.text) buttons = `<div>No transcript found for this video</div>`;
    let html = [
      '<div class="xt-close">✖</div>',
      `<h3><img src="${chrome.runtime.getURL('img/icon64.png')}"> Summarize This Video</h3>`,
      `<div class="xt-transcript-summarize-buttons">
        ${buttons}
      </div>`,
      '<div class="xt-widget-iframe"><iframe src="https://keywordseverywhere.com/ke/widget.php?apiKey=' + apiKey + '&source=yvsummarize&enabled=' + settingEnabled + '&pur=' + pur + '&darkmode=' + isDarkMode() + '&query=' + encodeURIComponent(Common.escapeHtml(query)) + '&country=' + settings.country + '&version=' + version + '" scrolling="no"></div>'
    ].join('\n');
    var selector = 'xt-yt-transcript-widget';
    var $root = $('#' + selector);
    // if (!$root[0] || $root.is(':hidden')) {
    //   var $prependTo = $('#xt-yt-widgets-avg-container');
    //   if (!$prependTo[0]) {
    //     $root = $('<div>', {id: selector, class: "xt-widget-table" }).insertBefore('#xt-yt-freeuser-container');
    //   }
    //   else {
    //     $root = $('<div>', {id: selector, class: "xt-widget-table" }).prependTo($prependTo);
    //   }
    // }
    $root.html(html);
    $root.addClass('xt-ke-card');
    checkWidgetsOrder();
    $root.find('.xt-close').click(function(){
      $root.hide();
    });
    $root.find('.xt-transcript-summarize-btn').click(function(e){
      chrome.runtime.sendMessage({
        cmd: 'yt.transcript.summarize',
        data: {
          url: this.dataset.url,
          text: params.text,
          title: params.title,
          videoUrl: document.location.href,
          channelName: params.channelName
        }
      }, function(){});
    });
  };


  var parseYTInitialData = function(contents){
    if (!contents) return {};
    var videoPrimaryInfoRenderer = contents[0].videoPrimaryInfoRenderer;
    var videoSecondaryInfoRenderer = contents[1].videoSecondaryInfoRenderer;
    var title = getObjValue(videoPrimaryInfoRenderer, '.title.runs[0].text');
    var views = getObjValue(videoPrimaryInfoRenderer, '.viewCount.videoViewCountRenderer.viewCount.simpleText');
    views = views.replace(/,/g, '');
    views = parseInt(views);
    var owner = getObjValue(videoSecondaryInfoRenderer, '.owner.videoOwnerRenderer.title.runs[0].text');
    var subscribersStr = getObjValue(videoSecondaryInfoRenderer, '.owner.videoOwnerRenderer.subscriberCountText');
    var subscribers = 0;
    if (subscribersStr) {
      subscribersStr = subscribersStr.runs[0].text;
      subscribersStr = subscribersStr.replace(/ subscribers/);
      subscribersStr = subscribersStr.replace(/,/g, '');
      var multiplier = 1;
      if (subscribersStr.indexOf('K') !== -1) multiplier = 1000;
      if (subscribersStr.indexOf('M') !== -1) multiplier = 1000000;
      subscribers = parseFloat(subscribersStr) * multiplier;
    }
    var descriptionLines = getObjValue(videoSecondaryInfoRenderer, '.description');
    if (descriptionLines) {
      descriptionLines = descriptionLines.runs.map(function(item){
        return item.text;
      });
    }
    else descriptionLines = [];
    var description = descriptionLines.join(' ');
    var res = {
      title,
      description,
      views,
      subscribers,
      owner
    };
    // console.log(res);
    return res;
  };


  var getObjValue = function(o, s) {
    if (!o) {
      console.log(`Empty object, can't get path ${s}`);
      return '';
    }
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        // console.log(`Unable to find ${s} in `, o, 'failed on ', k);
        return '';
      }
    }
    return o;
  };


  var getVideoInsights = async function(html){
    var dom = (new DOMParser()).parseFromString(html, "text/html");
    let info = await getVideoInfo(dom, html, {
      getTotalVideos: true
    });
    // console.log(info);
    let HDPoints = 2 * calcHDPoints(info.quality);
    let videoLenPoints = 4 * calcVideoLenPoints(info.lengthSeconds);
    let keywordOptimization = {
      sum: 0,
      broadMatchesTitle: 0,
      broadMatchesDescr: 0,
      exactMatchesTitle: 0,
      exactMatchesDescr: 0
    };
    let tags = info.keywords || [];
    tags.map(tag => {
      let res = calcKeywordsOptimizationPoints(tag, info.title, info.description, [10,10,20,10]);
      for (let key in keywordOptimization) {
        if (key !== 'sum' && res[key] > 0) keywordOptimization[key] = res[key];
      }
    });
    for (let key in keywordOptimization) {
      if (key !== 'sum') keywordOptimization.sum  += keywordOptimization[key];
    }
    let tagsLen = (info.keywords || []).length;
    let tagsLenPoints = calcTagsLenPoints(info.keywords);
    let tagsCharsLen = (info.keywords || []).join('').length;
    let tagsCharsLenPoints = calcTagsCharsLenPoints(info.keywords);
    let optimizationScore = HDPoints + videoLenPoints + keywordOptimization.sum + tagsLenPoints + tagsCharsLenPoints;
    let optimizationHint = `
      <table class="xt-video-insights-table">
        <tr><td>Video Quality</td><td class="xt-ke-text-right"><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${HDPoints}/10</span></td></tr>
        <tr><td>Video Length</td><td class="xt-ke-text-right"><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${videoLenPoints}/20</span></td></tr>
        <tr><td>Broad Match in Title</td><td class="xt-ke-text-right"><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${keywordOptimization.broadMatchesTitle}/20</span></td></tr>
        <tr><td>Broad Match in Description</td><td class="xt-ke-text-right"><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${keywordOptimization.broadMatchesDescr}/10</span></td></tr>
        <tr><td>Exact Match in Title</td><td class="xt-ke-text-right"><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${keywordOptimization.exactMatchesTitle}/10</span></td></tr>
        <tr><td>Exact Match in Description</td><td class="xt-ke-text-right"><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${keywordOptimization.exactMatchesTitle}/10</span></td></tr>
        <tr><td>Total Tag Characters (${tagsCharsLen})</td><td class="xt-ke-text-right"><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${tagsCharsLenPoints}/10</span></td></tr>
        <tr><td>Total Tags (${tagsLen})</td><td class="xt-ke-text-right"><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${tagsLenPoints}/10</span></td></tr></tr>
        <tr><td><span class="xt-ke-bold">Total</span></td><td class="xt-ke-text-right"><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px xt-ke-bold">${optimizationScore}/100</span></td></tr>
      </table>
    `;
    let likes = info.likes || 0;
    let dislikes = info.dislikes || 0;
    let viewCount = info.viewCount || 0;
    let approvalScore = 0;
    let engagementScore = 0;
    let commentsCount = info.commentsCount ? info.commentsCount.count : 0;
    if (likes + dislikes > 0) {
      approvalScore = Math.round(likes * 100 / (likes + dislikes));
      engagementScore = Math.round((likes + dislikes + commentsCount) * 100 / viewCount);
    }
    let subscribers = info.subscribers;
    let viewsPerDay = (viewCount / getDaysPublished(info.publishDate));
    if (viewsPerDay < 10) viewsPerDay = viewsPerDay.toFixed(2);
    else viewsPerDay = Math.round(viewsPerDay).toLocaleString();
    let channelTotalViews = info.channelTotalViews || '';
    let country = info.country || '';
    let channelTotalVideos = info.channelTotalVideos || '';
    let expertisePoints = calcExpertisePoints(info.channelId, info.ytInitialData);
    return {
      optimizationScore,
      optimizationHint,
      HDPoints,
      videoLenPoints,
      keywordOptimization,
      tagsLenPoints,
      tagsCharsLenPoints,
      approvalScore,
      engagementScore,
      viewsPerDay,
      expertisePoints,
      subscribers,
      channelTotalVideos,
      channelTotalViews,
      country
    };
  };


  const renderPromoIframe = function(promoParam){
    let query = getSearchQuery();
    var html = Common.renderIframeHTML({
      query: query,
      settingEnabled: true,
      darkMode: isDarkMode(),
      iframeSrcParam: 'freeuser_youtube',
      iframeValidSubParam: promoParam === 'valid_sub'
    });
    let params = {
      parentSelector: '#xt-yt-freeuser-container',
      addMethod: 'prependTo',
      rootId: 'xt-yt-freeuser-container',
      html: html,
      service: 'youtube',
      onAdded: function($root){
        checkWidgetsOrder();
      },
      onReady: function($root){
      }
    };
    $(params.parentSelector).addClass('xt-ke-card');
    let $root = Common.renderGenericWidget(params);
  };


  var renderVideoInsights = function(res){
    var settings = Starter.getSettings();
    var apiKey = settings.apiKey || '';
    var settingEnabled = settings.sourceList.youtag;
    var query = getSearchQuery();
    var pur = Common.getCredits() > 0 ? 0 : 1;
    var version = chrome.runtime.getManifest().version;
    let html = [
      '<div class="xt-close">✖</div>',
      `<h3><img src="${chrome.runtime.getURL('img/icon64.png')}"> Video Insights</h3>`,
      `<table>`,
        `<tr><td class="xt-widget-table-td-keyword"><span class="xt-ke-d-flex xt-ke-align-items-center">Optimization Score <svg class="xt-yt-vi-advanced-metrics" data-popover="${encodeURIComponent(res.optimizationHint)}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info xt-ke-ml-sm"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span></td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${res.optimizationScore}/100</span></td></tr>`,
        // `<tr><td class="xt-widget-table-td-keyword">Approval Score</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${res.approvalScore}%</span></td></tr>`,
        `<tr><td class="xt-widget-table-td-keyword">Engagement Score</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${res.engagementScore}%</span></td></tr>`,
        `<tr><td class="xt-widget-table-td-keyword">Views Per Day</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${res.viewsPerDay}</span></td></tr>`,
        `<tr><td class="xt-widget-table-td-keyword">Topic Expertise</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${res.expertisePoints}%</span></td></tr>`,
        res.subscribers ? `<tr><td class="xt-widget-table-td-keyword">Total Subscribers</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${res.subscribers.toLocaleString()}</span></td></tr>` : '',
        res.channelTotalVideos ? `<tr><td class="xt-widget-table-td-keyword">Total Channel Videos</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${res.channelTotalVideos.toLocaleString()}</span></td></tr>` : '',
        res.channelTotalViews ? `<tr><td class="xt-widget-table-td-keyword">Total Channel Views</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${res.channelTotalViews.toLocaleString()}</span></td></tr>` : '',
        res.country ? `<tr><td class="xt-widget-table-td-keyword">Channel Country</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${res.country}</span></td></tr>` : '',
      `</table>`,
      '<div class="xt-copy-export-row">',
        '<button class="xt-copy-csv xt-ke-btn">' + Common.getIcon('copy') + ' Copy</button>',
        '<button class="xt-export-csv xt-ke-btn">' + Common.getIcon('export') + ' Export</button>',
      '</div>',
      `<div><a href="https://keywordseverywhere.com/youtube-metrics.html" target="_blank">How these metrics are calculated</a></div>`,
      '<div class="xt-widget-iframe"><iframe src="https://keywordseverywhere.com/ke/widget.php?apiKey=' + apiKey + '&source=yvinsights&enabled=' + settingEnabled + '&pur=' + pur + '&darkmode=' + isDarkMode() + '&query=' + encodeURIComponent(Common.escapeHtml(query)) + '&country=' + settings.country + '&version=' + version + '" scrolling="no"></div>'
    ].join('\n');
    var selector = 'xt-yt-avg-widget';
    var $root = $('#' + selector);
    if (!$root[0] || $root.is(':hidden')) {
      $root = $('<div>', {id: selector, class: "xt-widget-table" }).prependTo('#xt-yt-widgets-avg-container');
    }
    $root.html(html);
    checkWidgetsOrder();
    $root.find('.xt-close').click(function(){
      $root.hide();
    });
    $root.find('.xt-copy-csv').click(function(e){
      Common.exportTableToCSV({
        table: $root.find('table'),
        method: 'copy'
      });
    });
    $root.find('.xt-export-csv').click(function(e){
      Common.exportTableToCSV({
        table: $root.find('table'),
        method: 'export',
        filename: 'videoinsights-' + videoTitle.replace(/\s+/g, '_') + '.csv'
      });
    });
  };


  var processTags = function(keywords, usage){
    Common.processKeywords({
        keywords: keywords,
        tableNode: null,
        src: source
      },
      function(json){
        processYTKeywordsResponse( json, keywords, usage );
      }
    );
  };


  var getVideoIdFromURL = function(){
    var res = '';
    var matches = document.location.href.match(/watch\?v=([\w-]+)/);
    if (matches) res = matches[1];
    return res;
  };


  var processYTKeywordsResponse = function( json, keywords, usage ){
    widgetRows = [];
    var data = json.data;
    if (json.error_code === 'NOCREDITS' || json.error_code === 'NO_API_KEY') {
      if ($('#xt-yt-keywords .xt-widget-table-td-keyword').length > 0) return;
      for (var keyword of keywords) {
        var keywordLC = keyword.toLowerCase();
        if (usage) widgetRows.push({keyword: keyword, usage: usage[keywordLC]});
        else widgetRows.push({keyword: keyword});
      }
      Common.renderWidgetTable(widgetRows, getRenderParams({json: null, nocredits: true}));
      return;
    }

    if (typeof json.data !== 'object') return;
    for (var key in json.data) {
      var item = json.data[key];
      var keywordLC = item.keyword.toLowerCase();
      if (usage && typeof usage[keywordLC] !== 'undefined') {
        item.usage = usage[keywordLC];
      }
      else {
        // console.log(item.keyword, usage);
      }
      widgetRows.push(item);
    }
    if (!widgetRows.length) return;
    widgetRows.sort(function(a,b){
      var aUsage = a.usage;
      var bUsage = b.usage;
      let res;
      if (aUsage && bUsage) {
        res = bUsage - aUsage;
      }
      if (res) return res;
      var aVol = parseInt(a.vol.replace(/[,.\s]/g, ''));
      var bVol = parseInt(b.vol.replace(/[,.\s]/g, ''));
      return bVol - aVol;
    });
    Common.renderWidgetTable(widgetRows, getRenderParams({json: json}));
  };


  var initWindowMessaging = function(){
    window.addEventListener("message", function(event){
      var payload = event.data;
      if (typeof payload !== 'object') return;
      var cmd = payload.cmd;
      var data = payload.data;
      if (payload.cmd === 'xt-get-config') {
        var obj;
        if (payload.data) {
          try {
            obj = JSON.parse( payload.data );
            // console.log(obj);
            if (onConfigReceived) onConfigReceived(obj);
          } catch(e) {
            obj = {};
            console.log(payload.data);
            console.error(e);
          }
        }
      }
      else if (cmd === 'xt.resize') {
        var height = data.height;
        var source = data.source;
        var selector = '.xt-widget-iframe';
        if (source === 'youtube' || source === 'yvinsights' || source === 'ysinsights') selector = '#xt-yt-avg-widget .xt-widget-iframe';
        else if (source === 'trend' || source === 'ytrend') selector = '#xt-trend-chart-root .xt-widget-iframe';
        else if (source === 'tags') selector = '#xt-yt-keywords .xt-widget-iframe';
        else if (source === 'yttrendkw') selector = '#xt-yt-trenkw .xt-widget-iframe';
        else if (source === 'yttopkw') selector = '#xt-yt-topkw .xt-widget-iframe';
        else if (source === 'also') selector = '#xt-yt-also .xt-widget-iframe';
        else if (source.indexOf('freeuser') !== -1) selector = '#xt-yt-freeuser-container';
        else if (source === 'yvsummarize') selector = '#xt-yt-transcript-widget';
        if (!selector) return;
        if (height <= 0) return;
        if (data.isEmpty) height = 0;
        $(selector + ' iframe').height(height);
      }
      else if (cmd === 'xt.yt.getVideos') {
        $('#xt-yt-videos-iframe iframe')[0].contentWindow.postMessage({cmd: 'xt.yt.videos', data: videoCache}, '*');
      }
    }, false);
  };


  var processKeywords = function( keywords, table ){
    Common.processKeywords({
        keywords: Object.keys( keywords ),
        tableNode: table,
        src: source
      },
      function(json){
      }
    );
  };


  var processQueryResponse = function( json ){
    var data;
    if (json.data) data = json.data[0];
    var $node = $('#xt-info');
    if (!$node.length) {
      $node = $('<div/>', {
          class: 'xt-youtube-query'
        })
        .attr('id', 'xt-info');
      var settings = Starter.getSettings();
      $node
        .insertAfter( $(rootSel)[0] );
      if ($('.ytSearchboxComponentInputBox, #search-form')[0]){
        $node.css({
          'margin-left': $('.ytSearchboxComponentInputBox, #search-form')[0].getBoundingClientRect().left,
          'top': '-8px'
        });
      }

      if (!$('#xt-' + source + '-offset')[0]) {
        $('<div id="xt-' + source + '-offset"></div>').insertAfter($('#masthead-positioner-height-offset'));
      }
    }
    if (!data) {
      Common.processEmptyData(json, $node);
      return;
    }
    else {
      if(data.vol != '-') {
        Common.addKeywords(data.keyword);
        var html = Common.getResultStrType2(data, {
          darkMode: isDarkMode()
        });
        html = Common.appendStar(html, data);
        html = Common.appendKeg(html, json, data);
        $node.html(html);
        var color = Common.highlight(data);
        if (color) {
          $node.addClass('xt-highlight');
          $node.css({background: color});
        }
      }
      else {
        $node.html('');
      }
    }
  };


  var initURLChangeListener = function( cbProcessPage ){
    var url = document.location.href;
    var timer = setInterval(function(){
      if ( url !== document.location.href ) {
        if (url.indexOf('feature=youtu.be') !== -1) {
          url = document.location.href;
          return;
        }
        url = document.location.href;
        cbProcessPage( url );
      }
    }, 1000);
  };


  var initMutationObserver = function( target ){
    var settings = Starter.getSettings();
    if (!settings.showMetricsForSuggestions) return;
    if (!target) return;
    if (observer) observer.disconnect();
    observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          if (!mutation.addedNodes.length) return;
          // console.log(mutation);
          processChildList(mutation.addedNodes);
        }
      });
    });

    var config = { subtree: true, childList: true, characterData: true };
    observer.observe(target, config);
  };


  var processChildList = function(children){
    for (var i = 0, len = children.length; i < len; i++) {
      var node = children[i];
      var $node = $(node);
      if ($node.hasClass('gsq_a')) {
        delayProcessSuggestions($node);
      }
      else if ($node.attr('role') === 'presentation') {
        delayProcessSuggestions($node);
      }
      else {
        var list = $node.find('ul[role=listbox]')[0];
        if (list) {
          delayProcessSuggestions($node);
        }
      }
    }
  };


  var delayProcessSuggestions = function($node){
    if (!suggestionsTimer) {
      suggestionsList = {};
      $('.xt-suggestions-search').remove();
    }
    if (suggestionsTimer) clearTimeout(suggestionsTimer);
    suggestionsTimer = setTimeout(function(){
      var list = $('.ytSearchboxComponentSuggestionsContainer, .sbdd_a ul[role=listbox]')[0];
      if (list) {
        $(list).find('[role=presentation]').map(function(i, node){
          processSuggestion(node);
        });
        processSuggestionsList();
        suggestionsTimer = null;
      }
    }, 1000);
  };


  var processSuggestion = function(node){
    var $node = $(node);
    var type = 'table';
    var option = $node.find('table tr td')[0];
    if (!option) {
      option = $node.find('div[role=option]')[0];
      type = 'ul';
    }
    if (!option) return;
    // console.log(node.textContent);
    var keyword;
    if (type === 'table') {
      keyword = $(option).find('span').get(0).textContent;
    }
    else {
      keyword = $(option).find('.ytSuggestionComponentLeftContainer > span').get(0).textContent;
      // keyword = $(option).find('.sbqs_c, .sbpqs_a').text();
    }
    keyword = Common.cleanKeyword(keyword);
    suggestionsList[keyword] = option;
  };


  var processSuggestionsList = function(){
    var list = $.extend({}, suggestionsList);
    var key = Object.keys(list).join('');
    if (cachedSuggestions[key]) {
      processSuggestionsListResponse(cachedSuggestions[key], list);
      return;
    }
    suggestionsTimer = null;
    Common.processKeywords({
        keywords: Object.keys( list ),
        tableNode: {},
        src: source
      },
      function(json){
        // console.log(json, list);
        processSuggestionsListResponse( json, list );
        cachedSuggestions[key] = json;
      }
    );
  };


  var processSuggestionsListResponse = function(json, keywords){
    var data = json.data;
    for (var key in data) {
      var item = data[key];
      var node = keywords[ item.keyword ];
      var $node = $(node);
      $node.find('.xt-suggestions-search').remove();
      var $span = $('<span/>').addClass('xt-suggestions-search');
      if (item.vol != '-' && item.vol != '0') {
        var html = Common.getResultStr(item);
        var color = Common.highlight(item);
        if (color) {
          $span.addClass('xt-highlight');
          $span.css({background: color});
        }
        // html = Common.appendStar(html, item);
        // html = Common.appendKeg(html, json, item);
        $span.html(html);
      }
      if ($node.find('.sbqs_c, .sbpqs_a')[0]) $node.find('.sbqs_c, .sbpqs_a').append( $span );
      else $node.append( $span );
    }
    var $parent = $($('ul[role=listbox] li')[0]);
    $parent.css('overflow', 'visible');
    var filename = document.location.host.replace('www.', '') + '-' + getSearchQuery() + '.csv';
    Common.addCopyExportButtons($parent, data, filename);
  };


  var initVideosMutationObserver = function( target ){
    var plan = Common.getPlan();
    if (!plan.plan || !plan.credits) return;
    var settings = Starter.getSettings();
    if (!target) return;
    if (videosObserver) videosObserver.disconnect();

    // if (settings.showYoutubeAdvancedMetrics) return;
    videosObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          if (!mutation.addedNodes.length) return;
          for (var i = 0, len = mutation.addedNodes.length; i < len; i++) {
            var node = mutation.addedNodes[i];
            if (node.tagName === 'YTD-VIDEO-RENDERER' && node.getAttribute('hidden') === null) {
              clearTimeout(processVideosTimer);
              processVideosTimer = setTimeout(function(){
                runVideosProcessing();
              }, 500);
              getAdvancedMetricsForNode(node);
            }
          }
        }
      });
    });

    var config = { subtree: true, childList: true, characterData: true };
    videosObserver.observe(target, config);
  };


  var runVideosProcessing = function(){
    if (processedVideosCount >= 20) return;
    resetVideoCache();
    processVideosList($('YTD-VIDEO-RENDERER'));
    var settings = Starter.getSettings();
    if (settings.showYoutubeAdvancedMetrics) {
      getAdvancedMetricsClickHandler();
    }
  };


  var processVideosList = function(children){
    for (var i = 0, len = children.length; i < len; i++) {
      var node = children[i];
      // var $node = $(node);
      if (node.tagName === 'YTD-VIDEO-RENDERER' && node.getAttribute('hidden') === null) {
        processVideoItem(node);
        processedVideosCount++;
      }
    }
  };


  var processVideoItem = function(node){
    var query = getSearchQuery();
    if (lastActiveQuery !== query) {
      resetVideoCache();
      lastActiveQuery = query;
    }
    var $node = $(node);
    var href = node.querySelector('a').href;
    var res = getVideoData($node);
    if (videoCache.order.indexOf(href) !== -1) {
      if (avgTimer) clearTimeout(avgTimer);
      avgTimer = setTimeout(function(){
        calcAvg();
      }, 100);
      return;
    }
    videoCache.order.push(href);
    var ignore = false;
    if (node.parentNode.id !== 'contents') {
      ignore = true;
      res.ignore = true;
    }
    videoCache.cache[href] = res;
    if (avgTimer) clearTimeout(avgTimer);
    avgTimer = setTimeout(function(){
      calcAvg();
    }, 100);
    return;

    // loading every videos page
    // getConfig(href, function(configs, html){
    //   try {
    //     console.log(configs);
    //     var ytplayerConfig = configs.ytplayerConfig;
    //     var ytInitialData = configs.ytInitialData;
    //     var contents = getObjValue(ytInitialData, '.contents.twoColumnWatchNextResults.results.results.contents');
    //     var initData = parseYTInitialData(contents);
    //     var dom = (new DOMParser()).parseFromString(html, "text/html");
    //     var response = JSON.parse(getObjValue(ytplayerConfig, '.args.player_response'));
    //     var data = getObjValue(response, '.microformat.playerMicroformatRenderer') || {};
    //     console.log(response, data);
    //     var res = {};
    //     res.ignore = ignore;
    //     res.ownerChannelName = initData.owner || data.ownerChannelName;
    //     res.viewCount = initData.views || data.viewCount;
    //     res.uploadDate = data.uploadDate;
    //     res.publishDate = data.publishDate;
    //     var date = new Date(data.publishDate);
    //     var days = Math.floor((Date.now() - date.getTime())/(24*3600*1000));
    //     res.publishedDays = days;
    //     res.publishedYears = (days / 365).toFixed(1);
    //     res.title = initData.title || getObjValue(data, 'title.simpleText');
    //     res.description = initData.description || getObjValue(data, 'description.simpleText');
    //     res.subscribers = initData.subscribers;
    //     var queryLC = getSearchQuery().toLowerCase();
    //     if (res.title.toLowerCase().indexOf(queryLC) !== -1) res.titleHasQuery = true;
    //     if (res.description.toLowerCase().indexOf(queryLC) !== -1) res.descriptionHasQuery = true;
    //     videoCache.cache[href] = res;
    //     // console.log(videoCache);
    //     if (avgTimer) clearTimeout(avgTimer);
    //     avgTimer = setTimeout(function(){
    //       calcAvg();
    //     }, 1000);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // });
  };


  var getVideoData = function($node){
    var title = $node.find('#video-title').attr('title');
    var titleHasQuery = false;
    var queryLC = getSearchQuery().toLowerCase();
    if (title.toLowerCase().indexOf(queryLC) !== -1) titleHasQuery = true;
    var ownerChannelName = $.trim($node.find('#channel-name yt-formatted-string a')[0].textContent);
    var ownerChannelURL = ($node.find('#channel-name yt-formatted-string a')[0] || {}).href || '';
    var verified = !!$node.find('.badge-style-type-verified')[0];
    var viewCount = 0;
    var age = -1;
    var ageStr = '';
    $node.find('#metadata-line .ytd-video-meta-block').map(function(i, block){
        var text = $.trim(block.textContent);
        if (text.indexOf('view') !== -1 || text.indexOf('watching') !== -1) {
          viewCount = parseFloat(text);
          if (!viewCount) viewCount = 0;
          if (text.match(/\dK/)) viewCount *= 1000;
          if (text.match(/\dM/)) viewCount *= 1000000;
        }
        else if (text.indexOf(' ago') !== -1) {
          ageStr = text;
          age = parseInt(text);
          if (text.match(/years? ago/)) age *= 365;
          else if (text.match(/months? ago/)) age = Math.round(age*30.5);
          else if (text.match(/weeks? ago/)) age *= 7;
          else if (text.match(/days? ago/)) {}
          else if (text.match(/hours? ago/)) age = 0;
          else {
            age = -1;
          }
        }
    });
    var addedIn7Days = age >= 0 && age <= 7;
    var addedIn6Weeks = age >= 0 && age <= 7*6;
    var res = {
      ownerChannelName,
      ownerChannelURL,
      verified: verified,
      title,
      titleHasQuery,
      viewCount,
      ageStr,
      publishedDays: age,
      addedIn7Days,
      addedIn6Weeks
    };
    // console.log(res);
    return res;
  };


  var calcAvg = function(params){
    if (!params) params = {};
    var calcDifficulty = params.difficulty;
    // console.log(videoCache);
    var maxViews = 0;
    var sumDays = 0;
    var hasAgeCount = 0;
    var sumViews = 0;
    var sumAddedIn7Days = 0;
    var sumAddedIn6Weeks = 0;
    // var sumSubscribers = 0;
    var owners = {};
    var timesInTitle = 0;
    var timesInDsc;
    var difficultyAvg;
    var difficultyPoints = 0;
    var difficultyCount = 0;
    var query = getSearchQuery();
    var count = 0;
    var advancedCount = 0;
    var countTotalVerified = 0;
    var percentTotalVerified;
    for (var href in videoCache.cache) {
      var item = videoCache.cache[href];
      if (item.advanced && calcDifficulty) {
        let difficulty = getRankingDifficulty(item.advanced);
        item.difficulty = difficulty;
        if (difficulty && difficulty.total >= 0) {
          difficultyPoints += difficulty.total;
          difficultyCount++;
        }
      }
      if (item.ignore) continue;
      count++;
      var viewCount = parseInt(item.viewCount) || 0;
      if (viewCount > maxViews) maxViews = viewCount;
      sumViews += viewCount;
      if (item.addedIn7Days) sumAddedIn7Days++;
      if (item.addedIn6Weeks) sumAddedIn6Weeks++;
      if (item.publishedDays > -1) {
        sumDays += item.publishedDays;
        hasAgeCount++;
      }
      if (!owners[item.ownerChannelName]) {
        // sumSubscribers += item.subscribers;
        owners[item.ownerChannelName] = {videos: 1, views: item.viewCount, index: videoCache.order.indexOf(href), url: item.ownerChannelURL};
      }
      else {
        owners[item.ownerChannelName].videos++;
        owners[item.ownerChannelName].views += item.viewCount;
      }
      if (item.verified) countTotalVerified++;
      var title = item.title.toLowerCase();
      // var description = (item.description || '').toLowerCase();
      if (item.titleHasQuery) timesInTitle++;
      if (item.advanced) {
        advancedCount++;
        if (typeof timesInDsc === 'undefined') timesInDsc = 0;
        if (item.advanced.descriptionHasQuery) timesInDsc++;
      }
      // var re = new RegExp(query, 'g');
      // timesInTitle += (title.match(re) || []).length;
      // timesInDsc += (description.match(re) || []).length;
    }
    var percentInTitle = Math.round((timesInTitle / count) * 100);
    var percentInDsc = Math.round((timesInDsc / advancedCount) * 100);
    percentTotalVerified = Math.round((countTotalVerified / count)*100);
    if (difficultyCount) {
      difficultyAvg = parseInt(difficultyPoints / difficultyCount);
    }
    var topCreator = '';
    Object.keys(owners).map(function(owner){
      var item = owners[owner];
      if (!topCreator) topCreator = owner;
      if (item.videos === owners[topCreator].videos && item.index < owners[topCreator].index) {
        topCreator = owner;
      }
      if (item.videos > owners[topCreator].videos) topCreator = owner;
    });
    var topCreatorShort = topCreator;
    if (topCreatorShort.length > 25) topCreatorShort = topCreatorShort.substr(0, 25) + '...';
    if (Object.keys(owners).length > 0) {
      var topCreatorVideos = owners[topCreator].videos;
      var topCreatorURL = owners[topCreator].url;
    }
    var avgViews = Math.round(sumViews / count);
    var avgDays = Math.round(sumDays / hasAgeCount);
    var avgYears = Math.round(avgDays / 365);
    // var avgSubscribers = Math.round(sumSubscribers / Object.keys(owners).length);
    renderAvg({
      topCreator: topCreator,
      topCreatorShort: topCreatorShort,
      topCreatorVideos: topCreatorVideos,
      topCreatorURL: topCreatorURL,
      countTotalVerified: countTotalVerified,
      percentTotalVerified: percentTotalVerified,
      avgViews: avgViews,
      avgDays: avgDays,
      avgYears: avgYears,
      maxViews: maxViews,
      sumAddedIn7Days: sumAddedIn7Days,
      sumAddedIn6Weeks: sumAddedIn6Weeks,
      percentAddedIn7Days: Math.round(sumAddedIn7Days / count * 100),
      percentAddedIn6Weeks: Math.round(sumAddedIn6Weeks / count * 100),
      timesInTitle: timesInTitle,
      percentInTitle: percentInTitle,
      timesInDsc: timesInDsc,
      percentInDsc: percentInDsc,
      difficultyAvg: difficultyAvg,
      // avgSubscribers: avgSubscribers,
      count: count,
      advancedCount: advancedCount,
      query: query,
      queryEnc: Common.escapeHtml(query),
      url: document.location.href,
      metricsPromise: metricsPromise
    });
  };


  var formatNumber = function(n){
    var res = n;
    if (n >= 1000000000) res = parseFloat((n/1000000000).toFixed(2)) + 'G';
    else if (n >= 1000000) res = parseFloat((n/1000000).toFixed(2)) + 'M';
    else if (n > 1000) res = parseFloat((n/1000).toFixed(2)) + 'K';
    return res;
  };


  var renderAvg = function(data){
    var selector = 'xt-yt-avg-widget';
    var $root = $('#' + selector);
    var $parent = $('ytd-secondary-search-container-renderer').removeAttr('hidden');
    if (!$root[0]) {
      var settings = Starter.getSettings();
      var apiKey = settings.apiKey || '';
      var query = getSearchQuery();
      var pur = Common.getCredits() > 0 ? 0 : 1;
      var version = chrome.runtime.getManifest().version;
      var settingEnabled = settings.sourceList.youtag;
      $root = $('<div>', { id: selector, class: "xt-widget-table" }).prependTo('#xt-yt-widgets-avg-container');
      $root.html([
        '<div class="xt-yt-widgets-avg-body"></div>',
        '<div class="xt-yt-widgets-avg-footer">',
          '<div class="xt-widget-iframe"><iframe src="https://keywordseverywhere.com/ke/widget.php?apiKey=' + apiKey + '&source=ysinsights&enabled=' + settingEnabled + '&pur=' + pur + '&darkmode=' + isDarkMode() + '&query=' + encodeURIComponent(Common.escapeHtml(query)) + '&country=' + settings.country + '&version=' + version + '" scrolling="no"></div>',
        '</div>'
      ].join('\n'));
      checkWidgetsOrder();
    }
    if (data) {
      getAvgHtml(data).then(html => {
        $root.find('.xt-yt-widgets-avg-body').html( html );
        $root.find('.xt-close').click(function(){
          $root.hide();
        });
        $root.find('.xt-yt-avg-full-btn').click(function(){
          let avg = $.extend({}, data);
          delete avg.metricsPromise;
          chrome.runtime.sendMessage({cmd: 'yt.setVideoCache', data: {videoCache: videoCache, avg: avg}});
        });
        $root.find('.xt-yt-avg-advanced-btn').click(function(e){
          getAdvancedMetricsClickHandler($root);
        });
        $root.find('.xt-copy-csv').click(function(e){
          Common.exportTableToCSV({
            table: $root.find('table'),
            method: 'copy'
          });
        });
        $root.find('.xt-export-csv').click(function(e){
          Common.exportTableToCSV({
            table: $root.find('table'),
            method: 'export',
            filename: 'searchinsights-' + data.query.replace(/\s+/g, '_') + '.csv'
          });
        });
      });
    }
    else {
      showVideosSpinner();
    }
  };


  var getAvgHtml = async function(data) {
    var settings = Starter.getSettings();
    var apiKey = settings.apiKey || '';
    var query = getSearchQuery();
    var pur = Common.getCredits() > 0 ? 0 : 1;

    var metrics = await data.metricsPromise;
    var volume;

    try {
      volume = metrics.data[0].vol + '/mo';
    } catch (e) {
      volume = '<a href="https://keywordseverywhere.com/how-to-purchase.html" target="_blank">Buy Credits</a>';
      console.log(e);
    }

    var settingEnabled = settings.sourceList.youtag;
    'maxViews avgViews'.split(' ').map((key) => {
      data[key + 'Fmt'] = formatNumber(data[key]);
    });
    data.topCreatorVideosStr = data.topCreatorVideos + ' video' + (data.topCreatorVideos > 1 ? 's' : '');
    if (data.avgYears > 0) {
      data.avgYearsStr = data.avgYears + ' year' + (data.avgYears > 1 ? 's' : '');
    }
    else {
      data.avgYearsStr = data.avgDays + ' days';
    }
    var advancedBtnHtml = '';
    if (!showAdvancedClicked) {
      advancedBtnHtml = `<button class="xt-ke-btn xt-ke-btn-pr xt-yt-avg-advanced-btn"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> Show Advanced Metrics</button>`;
    }
    if (advancedMetricsLoading) {
      advancedBtnHtml = '<img class="xt-yt-avg-advanced-btn" src="' + chrome.runtime.getURL('img/spinner32.gif') + '"><span class="xt-yt-avg-advanced-status"></span>';
    }
    var html = [
      '<div class="xt-close">✖</div>',
      advancedBtnHtml,
      `<h3><img src="${chrome.runtime.getURL('img/icon64.png')}"> Search Insights</h3>`,
      '<table>',
        typeof data.difficultyAvg !== 'undefined' ? `<tr><td class="xt-widget-table-td-keyword xt-color-suggestive xt-ke-bold">Ranking Difficulty</td><td class="xt-ke-pb-10px"><span class="xt-ke-badge xt-ke-badge-suggestive xt-ke-px-10px xt-ke-bold xt-ke-border-2x">${data.difficultyAvg}/100</span></td></tr>` : '',
        `<tr><td class="xt-widget-table-td-keyword">Query</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${data.queryEnc}</span></td></tr>`,
        `<tr><td class="xt-widget-table-td-keyword">Search Volume</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${volume}</span></td></tr>`,
        `<tr><td class="xt-widget-table-td-keyword">Top Channel</td><td><span><a class="xt-yt-top-channel" href="${data.topCreatorURL}">${data.topCreatorShort}</a></span><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px xt-yt-top-channel-badge">(${data.topCreatorVideosStr})</span></td></tr>`,
        `<tr><td class="xt-widget-table-td-keyword">Maximum Views</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${data.maxViewsFmt}</span></td></tr>`,
        `<tr><td class="xt-widget-table-td-keyword">Average Views</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${data.avgViewsFmt}</span></td></tr>`,
        `<tr><td class="xt-widget-table-td-keyword">Average Age</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${data.avgYearsStr}</span></td></tr>`,
        `<tr><td class="xt-widget-table-td-keyword">Keywords in Title</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${data.percentInTitle}% (${data.timesInTitle} / ${data.count})</span></td></tr>`,
        typeof data.timesInDsc !== 'undefined' ? `<tr><td class="xt-widget-table-td-keyword">Keywords in Description</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${data.percentInDsc}% (${data.timesInDsc} / ${data.advancedCount})</span></td></tr>` : '',
        `<tr><td class="xt-widget-table-td-keyword">Added in last 7 days</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${data.percentAddedIn7Days}% (${data.sumAddedIn7Days} / ${data.count})</span></td></tr>`,
        `<tr><td class="xt-widget-table-td-keyword">Added in last 6 weeks</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${data.percentAddedIn6Weeks}% (${data.sumAddedIn6Weeks} / ${data.count})</span></td></tr>`,
        showAdvancedClicked ? `<tr><td class="xt-widget-table-td-keyword">Total verified channels</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${data.percentTotalVerified}% (${data.countTotalVerified} / ${data.count})</span></td></tr>` : '',
      '</table>',
      '<div class="xt-copy-export-bottom-row-left">',
        '<button class="xt-copy-csv xt-ke-btn">' + Common.getIcon('copy') + ' Copy</button>',
        '<button class="xt-export-csv xt-ke-btn">' + Common.getIcon('export') + ' Export</button>',
      '</div>',
      '<div style="text-align:right"><a class="xt-yt-avg-full-btn" href="' + chrome.runtime.getURL('html/ytstats.html?darkmode=' + isDarkMode()) + '" target="_blank">Detailed Breakdown</a></div>'
    ].join('\n');
    return html;
  };


  var checkWidgetPosition = function($root, $parent){
    // if ($parent.is(':hidden')) return;
    // var $playerAds = $parent.find('#player-ads');
    if ($parent.is(':visible') && $root[0].previousElementSibling) {
      $parent.prepend($root);
    }
    clearTimeout(checkWidgetPositionTimer);
    checkWidgetPositionTimer = setTimeout(function(){
      checkWidgetPosition($root, $parent);
    }, 1000);
  };


  var showVideosSpinner = function(){
    $('#xt-yt-avg-widget').html('<img src="' + chrome.runtime.getURL('img/spinner32.gif') + '">');
  };


  const initTrendsChart = (params) => {
    params.parentSelector = '#xt-yt-widgets-chart-container';
    params.parentClassName = 'xt-yt-google-trends-root';
    params.addMethod = 'appendTo';
    params.rootId = 'xt-trend-chart-root';
    params.property = 'youtube';
    params.title = 'Youtube Trend Data For';
    params.buttonCopy = 'Copy';
    params.buttonExport = 'Export';
    params.query = getSearchQuery();
    params.source = 'ytrend';
    params.darkMode = isDarkMode();
    params.aspectRatio = 3;
    // console.log(params);
    TrendsChart.init(params);
  };


  const addFindLongTailKeywordsBtn = () => {
    let gl = document.documentElement.getAttribute('gl') || 'us';
    let params = {
      parentSelector: '#xt-yt-widgets-ltk-container', //'ytd-secondary-search-container-renderer',
      addMethod: 'prependTo',
      rootId:'xt-ltkbtn-root',
      query: getSearchQuery(),
      title: 'Find YouTube keywords for',
      service: 'youtube',
      lng: gl.toLowerCase()
    };
    Common.renderFindLongTailKeywordsBtn(params);
  };


  var getTrendingKeywords = function(manual){
    var query = getSearchQuery();
    query = Common.cleanKeyword(query);
    let params = {};
    let settings = Starter.getSettings();
    let geo = settings.country.toUpperCase();
    if (!geo) geo = 'US';
    if (geo === 'UK') geo = 'GB';
    params.geo = geo;
    let property = 'youtube';
    let timeRange = '30d';
    chrome.runtime.sendMessage({cmd: 'googleTrendsAPI.relatedsearches', data: {
      keyword: query,
      timeRange: timeRange,
      geo: geo,
      property: property || ''
    }}, (res) => {
      // console.log(res);
      processTrendingKeywordsResponse(res, manual);
    });
  };


  var processTrendingKeywordsResponse = function(res, manual){
    try {
      let top = res.json.default.rankedList[0].rankedKeyword;
      let trending = res.json.default.rankedList[1].rankedKeyword;
      processTrendingKeywords(top, 'top-keywords');
      processTrendingKeywords(trending, 'trending-keywords');
    } catch (e) {
      console.log(e);
    }
  };


  var processTrendingKeywords = function(arr, type){
    var keywords = {};
    var rows = [];
    arr.map(function(item) {
      let keyword = item.query;
      keywords[keyword] = item.value;
    });
    var listLen = Object.keys(keywords).length;
    if (listLen === 0) return;
    var settings = Starter.getSettings();
    if ( (!settings.sourceList.trenkw && !manual) || !settings.apiKey ) {
      for (var keyword in keywords) {
        var item = {keyword: keyword};
        if (type === 'trending-keywords') item.trendingValue = keywords[keyword];
        rows.push(item);
      }
      renderWidgetTable(type, rows, null);
      return;
    }
    if (type === 'trending-keywords') {
      chrome.runtime.sendMessage({
        cmd: 'api.postTrendKeywords',
        data: {
          list: Object.keys(keywords)
        }
      }, function(){});
    }
    Common.processKeywords({
      keywords: Object.keys(keywords),
      tableNode: null,
      src: source,
      from: 'trenkw',
      seed: getSearchQuery(),
      noCheckCredits: true
    }, function(json){
      if (json.error_code === 'NOCREDITS') {
        for (var keyword in keywords) {
          var item = {keyword: keyword};
          if (type === 'trending-keywords') item.trendingValue = keywords[keyword];
          rows.push(item);
        }
        renderWidgetTable(type, rows, null, 'nocredits');
      }
      else {
        // console.log(json, keywords, rows);
        if (typeof json.data !== 'object') return;
        for (var key in json.data) {
          var item = json.data[key];
          if (type === 'trending-keywords') item.trendingValue = keywords[item.keyword];
          rows.push(item);
        }
        if (type === 'trending-keywords') {
          rows.sort(function(a,b){
            var aVal = parseInt(a.trendingValue);
            var bVal = parseInt(b.trendingValue);
            return bVal - aVal;
          });
        } else {
          rows.sort(function(a,b){
            var aVal = parseInt(a.vol.replace(/,/g, ''));
            var bVal = parseInt(b.vol.replace(/,/g, ''));
            return bVal - aVal;
          });
        }
        renderWidgetTable(type, rows, json);
      }
    });
  };


  var getPeopleAlsoSearch = function(){
    var $section = $('ytd-horizontal-card-list-renderer.ytd-item-section-renderer');
    var list = [];
    $section.find('#card-title .ytd-search-refinement-card-renderer').map(function(i, node){
      list.push($.trim(node.textContent));
    });
    if (!list.length) return;
    Common.processKeywords({
        keywords: list,
        tableNode: null,
        src: source
      },
      function(json){
        processPeopleAlsoSearchResponse( json, list );
      }
    );
  };


  var processPeopleAlsoSearchResponse = function( json, keywords ){
    // console.log(json);
    var data = json.data;
    if (json.error_code === 'NOCREDITS' || json.error_code === 'NO_API_KEY') {
      for (var keyword of keywords) {
        widgetRows.push({keyword: keyword});
      }
      Common.renderWidgetTable(widgetRows, getRenderParams({json: null, nocredits: true, type: 'also'}));
      return;
    }

    if (typeof json.data !== 'object') return;
    for (var key in json.data) {
      var item = json.data[key];
      var keywordLC = item.keyword.toLowerCase();
      widgetRows.push(item);
    }
    if (!widgetRows.length) return;
    widgetRows.sort(function(a,b){
      var aVol = parseInt(a.vol.replace(/[,.\s]/g, ''));
      var bVol = parseInt(b.vol.replace(/[,.\s]/g, ''));
      return bVol - aVol;
    });
    Common.renderWidgetTable(widgetRows, getRenderParams({json: json, type: 'also'}));
  };


  var renderWidgetTable = function(type, rows, json, nocredits){
    var query = getSearchQuery();
    var source = '';
    var title = '';
    var rootSelector;
    var addToSelector;
    var iframeSrcParam = '';
    if (type === 'trending-keywords') {
      source = 'trenkw';
      title = 'Trending Keywords';
      iframeSrcParam = 'yttrendkw';
      rootSelector = 'xt-yt-trenkw';
      addToSelector = '#xt-yt-widgets-trending-container';
    }
    if (type === 'top-keywords') {
      source = 'topkw';
      title = 'Related Keywords';
      iframeSrcParam = 'yttopkw';
      rootSelector = 'xt-yt-topkw';
      addToSelector = '#xt-yt-widgets-top-container';
    }
    var settings = Starter.getSettings();
    var params = {
      settingEnabled: settings.sourceList[source],
      source: source,
      query: query,
      title: title,
      json: json,
      type: type,
      columnName: 'Keyword',
      rootSelector: rootSelector,
      addTo: addToSelector, //'ytd-secondary-search-container-renderer',
      addMethod: 'appendTo',
      iframeSrcParam: iframeSrcParam,
      filename: source + '-' + query.replace(/\s+/g, '_'),
      darkMode: isDarkMode(),
      fnGenerateLink: function(keywordEnc){
        return document.location.origin + '/results?search_query=' + keywordEnc;
      },
      onAdded: function($root){
        var $parent = $('ytd-secondary-search-container-renderer').removeAttr('hidden');
        checkWidgetsOrder();
      },
      onClosed: function(){
      },
      loadAll: function(){}
    };
    if (type === 'trending-keywords') {
      params.trendColumnName = '30d inc';
    }
    Common.renderWidgetTable(rows, params);
  };


  /**
   * Advanced metrics
   */

  var getAdvancedMetricsClickHandler = function($root){
    showAdvancedClicked = true;
    // if (videosObserver) videosObserver.disconnect();
    if (!$root) $root = $('body');
    $root.find('.xt-yt-avg-advanced-btn').replaceWith('<img class="xt-yt-avg-advanced-btn" src="' + chrome.runtime.getURL('img/spinner32.gif') + '"><span class="xt-yt-avg-advanced-status"></span>');
    getAdvancedMetrics();
  };


  var getCachedData = function(key){
    return new Promise(function(resolve, reject){
      chrome.runtime.sendMessage({
        cmd: 'cache.get',
        data: {key: key}
      }, function(response){
        resolve(response);
      });
    });
  };


  var getAdvancedMetrics = function(){
    if (tm) tm.stop();
    tm = new TaskManager({
      interval: 1000
    });
    var children = $('YTD-VIDEO-RENDERER');
    var promises = [];
    var count = 0;
    var relatedCount = 0;
    var processedCount = 0;
    advancedMetricsLoading = true;
    children.map(function(i, node){
      if (count >= RANKING_DIFFICULTY_ITEMS) return;
      if (node.parentNode.id !== 'contents') {
        relatedCount++;
        // return;
      }
      else count++;
      if (node.tagName === 'YTD-VIDEO-RENDERER' && node.getAttribute('hidden') === null) {
        promises.push(new Promise(function(resolve, reject){
          let href = node.querySelector('a').href;
          getCachedData(href).then(function(response){
            if (response) {
              let res = response;
              addSERPItemMetrics(node, res);
              let cachedItem = videoCache.cache[res.href];
              if (!cachedItem) {
                console.log('Investigate, no cached item');
              }
              else {
                let cloned = $.extend({}, res);
                delete cloned.ytInitialData;
                delete cloned.ytInitialPlayerResponse;
                cachedItem.advanced = cloned;
              }
              processedCount++;
              updateAdvancedStatus(processedCount, count + relatedCount);
              resolve(res);
            }
            else {
              tm.push(async function(){
                let res = await fetchVideoPage(node);
                addSERPItemMetrics(node, res);
                let cachedItem = videoCache.cache[res.href];
                if (!cachedItem) {
                  console.log('Investigate, no cached item');
                }
                else {
                  let cloned = $.extend({}, res);
                  delete cloned.ytInitialData;
                  delete cloned.ytInitialPlayerResponse;
                  cachedItem.advanced = cloned;
                }
                processedCount++;
                updateAdvancedStatus(processedCount, count + relatedCount);
                resolve(res);
              });
            }
          });
        }));
      }
    });
    Promise.all(promises).then(function(items){
      // console.log(items);
      calcAvg({difficulty: true});
      processAllVideosTags(items);
      advancedMetricsLoading = false;
    });
  };


  var getAdvancedMetricsForNode = function(node){
    let href = node.querySelector('a').href;
    getCachedData(href).then(function(response){
      if (response) {
        let res = response;
        addSERPItemMetrics(node, res);
        let cachedItem = videoCache.cache[res.href];
        if (!cachedItem) {
          console.log('Investigate, no cached item');
        }
        else {
          let cloned = $.extend({}, res);
          delete cloned.ytInitialData;
          delete cloned.ytInitialPlayerResponse;
          cachedItem.advanced = cloned;
        }
      }
      else {
        tm.push(async function(){
          let res = await fetchVideoPage(node);
          addSERPItemMetrics(node, res);
          let cachedItem = videoCache.cache[res.href];
          if (!cachedItem) {
            console.log('Investigate, no cached item');
          }
          else {
            let cloned = $.extend({}, res);
            delete cloned.ytInitialData;
            delete cloned.ytInitialPlayerResponse;
            cachedItem.advanced = cloned;
          }
        });
      }
    });
  };


  var updateAdvancedStatus = function(count, total){
    let percent = Math.round(count * 100 / total);
    let str = `${count} of ${total} (${percent}%)`;
    $('.xt-yt-avg-advanced-status').text(str);
  };


  var addSERPItemMetrics = function(root, data){
    let $root = $(root);
    $root.find('.xt-yt-item-advanced-metrics').remove();
    let $metricsRoot = $('<div>', {class: 'xt-yt-item-advanced-metrics xt-yt-page-metrics'}).insertAfter($root.find('ytd-video-meta-block'));
    let subscribersStr = data.subscribersText || '';
    subscribersStr = subscribersStr.replace('subscribers', 'subs');
    let likes = data.likes || 0;
    let dislikes = data.dislikes || 0;
    let viewCount = data.viewCount || 0;
    let approvalScore = 'n/a';
    let engagementScore = 0;
    let commentsCount = data.commentsCount ? data.commentsCount.count : 0;
    if (likes + dislikes > 0) {
      approvalScore = Math.round(likes * 100 / (likes + dislikes));
      engagementScore = Math.round((likes + dislikes + commentsCount) * 100 / (data.viewCount));
      data.approvalScore = approvalScore;
      data.engagementScore = engagementScore;
    }
    let viewsPerDay = (viewCount / getDaysPublished(data.publishDate));
    if (viewsPerDay < 10) viewsPerDay = viewsPerDay.toFixed(2);
    else viewsPerDay = Math.round(viewsPerDay).toLocaleString();
    data.viewsPerDay = viewsPerDay;
    let seoScore = calcKeywordsOptimizationPoints(getSearchQuery(), data.title, data.description, [30,20,20,10]);
    let titlePoints = calcTitleLenPoints(data.title);
    let descriptionLen = 0;
    if (data.description) {
      let descriptionWords = data.description.match(/[\w-']+/g);
      if (!descriptionWords) {
        descriptionWords = data.description.split(/\s+/);
      }
      descriptionLen = descriptionWords.length;
    }
    let descriptionPoints = calcDescriptionLenPoints(descriptionLen);
    let HDPoints = calcHDPoints(data.quality);
    let seoSum = seoScore.sum + titlePoints + descriptionPoints + HDPoints;
    data.seoScore = seoSum;
    let html = [
      subscribersStr ? `<span class="xt-ke-badge xt-ke-badge-light">${subscribersStr}</span>` : '',
      // `<span class="xt-ke-badge xt-ke-badge-light ${getColorClassByValue(approvalScore)}">Appr: ${approvalScore}%</span>`,
      `<span class="xt-ke-badge xt-ke-badge-light ${getColorClassByValue(engagementScore)}">Enga: ${engagementScore}%</span>`,
      `<span class="xt-ke-badge xt-ke-badge-light ${getColorClassByValue(viewsPerDay)}">VPD: ${viewsPerDay}</span>`,
      `<span class="xt-ke-badge xt-ke-badge-light ${getColorClassByValue(seoSum)}">SEO: ${seoSum}/100</span>`
    ].join('\n');
    let hint = `
      <div class="xt-widget-table xt-ke-mb-xl">
        <table>
          <tr><td>Subscribers</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${(data.subscribers || 'hidden by channel').toLocaleString()}</span></td></tr>
          <tr class="xt-hidden"><td>Approval Score</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${approvalScore}%</span></td></tr>
          <tr><td>Engagement Score</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${engagementScore}%</span></td></tr>
          <tr><td>Views Per Day</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${viewsPerDay}</span></td></tr>
        </table>
      </div>
      <div class="xt-widget-table xt-ke-mb-xl">
        <h3 class="bold">SEO Score</h3>
        <table>
          <tr><td>Keyword Optimization</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${seoScore.sum}/80</span></td>
          <tr><td class="xt-ke-pl-xl">Exact Match Title</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${seoScore.exactMatchesTitle}/30</span></td></tr>
          <tr><td class="xt-ke-pl-xl">Exact Match Description</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${seoScore.exactMatchesDescr}/20</span></td></tr>
          <tr><td class="xt-ke-pl-xl">Broad Match Title</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${seoScore.broadMatchesTitle}/20</span></td></tr>
          <tr><td class="xt-ke-pl-xl">Broad Match Description</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${seoScore.broadMatchesDescr}/10</span></td></tr>
          <tr><td>Title Length</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${titlePoints}/10 (${data.title.length} chars)</span></td></tr>
          <tr><td>Description Length</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${descriptionPoints}/5 (${descriptionLen} words)</span></td></tr>
          <tr><td>Quality</td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px">${HDPoints}/5</span></td></tr>
          <tr><td><strong>Total Score</strong></td><td><span class="xt-ke-badge xt-ke-badge-light xt-ke-px-10px"><strong>${seoSum}/100</strong></span></td></tr>
        </table>
      </div>
      <div><a href="https://keywordseverywhere.com/youtube-metrics.html" target="_blank">How these metrics are calculated</a></div>
    `;
    $metricsRoot.html(html);
    $metricsRoot[0].dataset.popover = encodeURIComponent(hint);
    data.hint = hint;
  };


  var getColorClassByValue = function(val){
    if (val < 30) return 'xt-yt-item-good';
    if (val < 60) return 'xt-yt-item-avg';
    if (val >= 60) return 'xt-yt-item-bad';
  };


  var fetchVideoPage = async function(node){
    let href = node.querySelector('a').href;
    let response = await fetch(href);
    let html = await response.text();
    // console.log(html);
    let dom = (new DOMParser()).parseFromString(html, "text/html");
    let info = await getVideoInfo(dom, html, {});
    info.href = href;
    // console.log(info);
    chrome.runtime.sendMessage({
      cmd: 'cache.set',
      data: {
        key: href,
        res: info
      }
    });
    return info;
  };


  var getVideoInfo = async function(dom, html, params){
    let res = {};
    let matches = html.match(/"XSRF_TOKEN":"(.*?)",/);
    if (matches) {
      res.xsrf = decodeURIComponent(matches[1]);
      res.xsrf = res.xsrf.replace(/\\u003d/g, '=');
    }
    matches = html.match(/"ID_TOKEN":"(.*?)",/);
    if (matches) {
      res.idToken = decodeURIComponent(matches[1]);
      res.idToken = res.idToken.replace(/\\u003d/g, '=');
    }
    matches = html.match(/"INNERTUBE_CLIENT_VERSION":"(.*?)",/);
    if (matches) {
      res.clientVersion = matches[1];
    }
    matches = html.match(/"INNERTUBE_API_KEY":"(.*?)"/);
    if (matches) {
      res.innertubeApiKey = matches[1];
    }
    let promises = $('script', dom).map(async function(i, script){
      let text = script.textContent;
      if (text.indexOf('var ytInitialPlayerResponse = ') !== -1) {
        let jsonText = text.replace('var ytInitialPlayerResponse = ', '');
        jsonText = jsonText.replace(/\};.*$/, '}');
        try {
          let json = JSON.parse(jsonText);
          res.ytInitialPlayerResponse = json;
        } catch (e) {
          console.log(e);
        }
      }
      if (text.indexOf('var ytInitialData = ') !== -1) {
        let jsonText = text.replace('var ytInitialData = ', '');
        jsonText = jsonText.replace(/\};$/, '}');
        try {
          let json = JSON.parse(jsonText);
          console.log(json);
          res.ytInitialData = json;
          res.visitorData = getObjValue(json, '.responseContext.webResponseContextExtensionData.ytConfigData.visitorData');
          // res.clientVersion = getObjValue(json, '.responseContext.serviceTrackingParams[3].params[0]');
          let continuation = getObjValue(json, '.contents.twoColumnWatchNextResults.results.results.contents[2].itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token');
          if (!continuation) {
            continuation = getObjValue(json, '.contents.twoColumnWatchNextResults.results.results.contents[3].itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token');
          }
          if (!continuation) {
            continuation = getObjValue(json, '.header.c4TabbedHeaderRenderer.tagline.channelTaglineRenderer.moreEndpoint.showEngagementPanelEndpoint.engagementPanel.engagementPanelSectionListRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token');
          }
          if (!continuation) {
            // console.log('No continuation. Abort');
            return;
          }
          res.continuation = continuation;
          res.commentsCount = await getComments(res);
        } catch (e) {
          console.log(e);
        }
      }
    });
    await Promise.all(promises);
    processYtInitial(res);
    let channelInfo = await getChannelInfo(res);
    res.channelTotalViews = channelInfo.totalViews;
    res.country = channelInfo.country;
    if (params.getTotalVideos) {
      let cres = await getChannelTotalVideos(res);
      res.channelTotalVideos = cres.totalVideos;
      res.channelTotalViews = cres.totalViews;
    }
    return res;
  };


  var getChannelTotalVideos = async function(res){

    let url = 'https://www.youtube.com/channel/' + res.channelId + '/videos';
    let response = await fetch(url);
    let text = await response.text();

    var dom = (new DOMParser()).parseFromString(text, "text/html");
    let info = await getVideoInfo(dom, text, {
      getTotalVideos: false
    });
    let channelDataURL = `https://www.youtube.com/youtubei/v1/browse?key=${res.innertubeApiKey}&prettyPrint=false`;
    let payload = {
        "context":
        {
            "client":
            {
                "hl": "en",
                "gl": "US",
                "deviceMake": "",
                "deviceModel": "",
                "visitorData": "",
                "userAgent": "",
                "clientName": "WEB",
                "clientVersion": res.clientVersion,
                "osName": "",
                "osVersion": "",
                "originalUrl": "",
                "screenPixelDensity": 1,
                "platform": "DESKTOP",
                "clientFormFactor": "UNKNOWN_FORM_FACTOR",
                "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            }
        },
        "continuation": decodeURIComponent(info.continuation)
    };
    let response2 = await fetch(channelDataURL, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(payload)
    });
    let json = await response2.json();
    let totalViews = getObjValue(json, '.onResponseReceivedEndpoints[0].appendContinuationItemsAction.continuationItems[0].aboutChannelRenderer.metadata.aboutChannelViewModel.viewCountText');
    let totalVideos = getObjValue(json, 'onResponseReceivedEndpoints[0].appendContinuationItemsAction.continuationItems[0].aboutChannelRenderer.metadata.aboutChannelViewModel.videoCountText');
    if (totalViews) totalViews = parseInt(totalViews.replace(/,/g, ''));
    if (totalVideos) totalVideos = parseInt(totalVideos);
    return {
      totalVideos: totalVideos,
      totalViews: totalViews
    }
  };


  var getChannelInfo = async function(res){
    let url = 'https://www.youtube.com/channel/' + res.channelId + '/about';
    let response = await fetch(url);
    let text = await response.text();
    let totalViews, country;
    let matches = text.match(/"viewCountText":\{"simpleText":"([\d,]+) views"\}/);
    if (matches) totalViews = convertToInt(matches[1]);
    matches = text.match(/"country":\{"simpleText":"([\w ]+)"}/);
    if (matches) country = matches[1];
    return {
      totalViews: totalViews,
      country: country
    };
  };


  var processYtInitial = function(res){
    // console.log(res);
    let ytInitialData = res.ytInitialData;
    let ytInitialPlayerResponse = res.ytInitialPlayerResponse;
    try {
      let videoPrimaryInfoRenderer = getObjValue(ytInitialData, '.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer');
      if (!videoPrimaryInfoRenderer) videoPrimaryInfoRenderer = getObjValue(ytInitialData, '.contents.twoColumnWatchNextResults.results.results.contents[1].videoPrimaryInfoRenderer');
      let videoSecondaryInfoRenderer = getObjValue(ytInitialData, '.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer');
      if (!videoSecondaryInfoRenderer) videoSecondaryInfoRenderer = getObjValue(ytInitialData, '.contents.twoColumnWatchNextResults.results.results.contents[2].videoSecondaryInfoRenderer');
      let likes = getObjValue(videoPrimaryInfoRenderer, '.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.likeButton.toggleButtonRenderer.defaultText.simpleText');
      if (!likes) {
        for (var i = 0; i < 6; i++) {
          likes = getObjValue(ytInitialData, '.engagementPanels[' + i + '].engagementPanelSectionListRenderer.content.structuredDescriptionContentRenderer.items[0].videoDescriptionHeaderRenderer.factoid[0].factoidRenderer.value.simpleText');
          if (likes) break;
        }
      }
      res.likes = convertAbbreviatedNumber(likes);
      // convertToInt(likes);
      res.dislikes = 0; //convertToInt(dislikes);
      // let viewsText = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.viewCount.simpleText;
      // res.views = convertToInt(viewsText);
      res.channelId = getObjValue(ytInitialPlayerResponse, '.videoDetails.channelId');
      res.channelName = getObjValue(ytInitialPlayerResponse, 'microformat.playerMicroformatRenderer.ownerChannelName');
      res.viewCount = parseInt(getObjValue(ytInitialPlayerResponse, '.videoDetails.viewCount'));
      if (isNaN(res.viewCount)) {
        res.viewCount = parseInt(getObjValue(ytInitialPlayerResponse, '.microformat.playerMicroformatRenderer.viewCount'));
      }
      res.subscribersText = getObjValue(videoSecondaryInfoRenderer, '.owner.videoOwnerRenderer.subscriberCountText.simpleText');
      res.subscribers = convertAbbreviatedNumber(res.subscribersText);
      res.verified = getObjValue(videoSecondaryInfoRenderer, '.owner.videoOwnerRenderer.badges[0].metadataBadgeRenderer.tooltip') === 'Verified';
      res.title = getObjValue(videoPrimaryInfoRenderer, '.title.runs[0].text');
      res.description = getObjValue(videoSecondaryInfoRenderer, 'attributedDescription.content');
      // let arrDescription = getObjValue(videoSecondaryInfoRenderer, '.description.runs') || [];
      // res.description = arrDescription.map(item => item.text).join('');
      res.keywords = getObjValue(ytInitialPlayerResponse, '.videoDetails.keywords');
      res.lengthSeconds = getObjValue(ytInitialPlayerResponse, '.videoDetails.lengthSeconds');
      res.publishDate = getObjValue(ytInitialPlayerResponse, '.microformat.playerMicroformatRenderer.publishDate');
      let arrFormats = getObjValue(ytInitialPlayerResponse, '.streamingData.adaptiveFormats') || [];
      arrFormats.map(item => {
        if (res.quality) return;
        if (item.qualityLabel) {
          var q = item.qualityLabel;
          q = q.replace(/p.*/, '');
          if (!q.match(/^\d+$/)) return;
          res.quality = parseInt(q);
        }
      });
      let queryLC = getSearchQuery().toLowerCase();
      if (res.description.toLowerCase().indexOf(queryLC) !== -1) res.descriptionHasQuery = true;
    } catch (e) {
      console.log(e);
    }
  };


  var processAllVideosTags = function(items){
    // console.log('processAllVideosTags');
    let usage = {};
    let keywords = [];
    items.map(item => {
      try {
        let list = getObjValue(item, '.ytInitialPlayerResponse.videoDetails.keywords') || [];
        list.map(keyword => {
          let k = keyword.toLowerCase();
          if (!usage[k]) {
            usage[k] = 0;
            keywords.push(keyword);
          }
          usage[k]++;
        });
      } catch (e) {
        console.log(e);
      }
    });
    keywords = keywords.filter(kw => usage[kw.toLowerCase()] >= TAG_OCCURRENCES);
    var settings = Starter.getSettings();
    if (!settings.sourceList.youtag) {
      var rows = [];
      for (var keyword of keywords) {
        let kwLC = keyword.toLowerCase();
        rows.push({keyword: keyword, usage: usage[kwLC]});
      }
      rows.sort(function(a, b){
        return b.usage - a.usage;
      });
      let params = getRenderParams({
        target: 'serp',
        json: null,
        loadAll: function(){
          processTags(keywords, usage);
        }
      });
      Common.renderWidgetTable(rows, params);
      return;
    }
    else processTags(keywords, usage);
  };


  /**
   * Difficulty
   */

  var getRankingDifficulty = function(item){
    try {
      let commentPoints = calcCommentPoints(item.commentsCount);
      let likeRatioPoints = calcLikeRatioPoints(item.likes, item.dislikes);
      let engagementSum = commentPoints + likeRatioPoints;

      let totalViewsPoints = calcTotalViewsPoints(item.viewCount);
      let videoLenPoints = calcVideoLenPoints(item.lengthSeconds);
      let HDPoints = calcHDPoints(item.quality);
      let freshnessPoints = calcFreshnessPoints(item.publishDate);
      let videoDetailsSum = totalViewsPoints + videoLenPoints + HDPoints + freshnessPoints;
      let keywordOptimization = calcKeywordsOptimizationPoints(getSearchQuery(), item.title, item.description, [13,7,7,3]);
      let subscribersPoints = calcSubscribersPoints(item.subscribers) || 0;
      let channelViewPoints = calcChannelViewsPoints(item.channelTotalViews) || 0;
      let channelAuthoritySum = subscribersPoints + channelViewPoints;
      // console.log(item, engagementSum, videoDetailsSum, keywordOptimization, channelAuthoritySum);
      let total = engagementSum + videoDetailsSum + keywordOptimization.sum + channelAuthoritySum;
      let brandedFactor = isBrandedQuery() ? BRANDED_FACTOR : 1;
      total = total * brandedFactor;
      if (total > 100) total = 100;
      else total = Math.round(total);
      let hint = `
        <table>
        <tr><td colspan="6">Video: ${item.title}</td></tr>
        <tr><td colspan="6">Link: <a href="${item.href}" target="_blank">${item.href}</td></tr>
        <tr><td>Engagement</td><td><strong>${engagementSum}/20</strong></td><td>Comments: ${commentPoints}/10</td><td>Like Ratio: ${likeRatioPoints}/10</td><td></td><td></td></tr>
        <tr><td>Video Details:</td><td><strong>${videoDetailsSum}/30</strong></td><td>Total Views: ${totalViewsPoints}/10</td><td>Video Length: ${videoLenPoints}/5</td><td>HD: ${HDPoints}/5</td><td>Freshness: ${freshnessPoints}/10</td></tr>
        <tr><td>Keyword Optimization</td><td><strong>${keywordOptimization.sum}/30</strong></td><td>EMT: ${keywordOptimization.exactMatchesTitle}/13</td><td>EMD: ${keywordOptimization.exactMatchesDescr}/7</td><td>BMT: ${keywordOptimization.broadMatchesTitle}/7</td><td>BMD: ${keywordOptimization.broadMatchesDescr}/3</td></tr>
        <tr><td>Channel Authority</td><td><strong>${channelAuthoritySum}/20</strong></td><td>Total Subscribers: ${subscribersPoints}/10</td><td>Total Channel Views: ${channelViewPoints}/10</td><td></td><td></td></tr>
        <tr><td>Branded Factor</td><td><strong>${brandedFactor}</strong></td><td colspan="4"></td></tr>
        <tr><td>Total Score</td><td colspan="5"><strong>${total}/100</strong></td></tr>
        </table>`;
      return {total: total, hint: hint};
    } catch (e) {
      console.log(e);
    }
  };


  var calcCommentPoints = data => {
    if (!data) return 0;
    let count = data.count;
    if (!count) return 0;
    if (count < 10) return 0;
    if (count < 20) return 1;
    if (count < 100) return 2;
    if (count < 500) return 3;
    if (count < 1000) return 6;
    if (count >= 1000) return 10;
  };


  var calcLikeRatioPoints = (likes, dislikes) => {
    if (typeof likes === 'undefined' || typeof dislikes === 'undefined') return 0;
    let ratio = likes / (likes + dislikes) * 100;
    if (ratio < 80) return 0;
    if (ratio < 85) return 1;
    if (ratio < 90) return 3;
    if (ratio < 95) return 6;
    return 10;
  };


  var calcTotalViewsPoints = views => {
    if (typeof views === 'undefined') return 0;
    if (views < 10000) return 0;
    if (views < 50000) return 1;
    if (views < 70000) return 2;
    if (views < 90000) return 4;
    if (views < 110000) return 6;
    if (views < 130000) return 8;
    return 10;
  };


  var calcVideoLenPoints = len => {
    if (typeof len === 'undefined') return 0;
    if (len < 5*60) return 0;
    if (len < 10*60) return 2;
    if (len < 16*60) return 5;
    if (len < 25*60) return 2;
    if (len >= 25*60) return 0;
  };


  var calcTitleLenPoints = str => {
    if (!str) return 0;
    let len = str.length;
    if (len < 20) return 0;
    if (len < 40) return 5;
    if (len < 50) return 10;
    if (len < 60) return 5;
    if (len >= 60) return 0;
  };


  var calcDescriptionLenPoints = len => {
    if (len < 150) return 0;
    if (len < 250) return 3;
    if (len < 400) return 5;
    if (len < 450) return 3;
    if (len >= 450) return 0;
  };


  var calcTagsCharsLenPoints = keywords => {
    if (!keywords) return 0;
    let len = keywords.join('').length;
    if (len < 50) return 0;
    if (len < 200) return 6;
    if (len < 300) return 10;
    if (len < 600) return 6;
    if (len >= 600) return 0;
  };


  var calcTagsLenPoints = keywords => {
    if (!keywords) return 0;
    let len = keywords.length;
    if (len < 3) return 0;
    if (len < 10) return 5;
    if (len < 40) return 10;
    if (len < 60) return 5;
    if (len >= 60) return 0;
  };



  var calcHDPoints = q => {
    if (q >= 1080) return 5;
    if (q >= 720) return 3;
    if (q >= 480) return 1;
    return 0;
  };


  var getDaysPublished = function(dateStr){
    let date = new Date(dateStr);
    let diff = Date.now() - date.getTime();
    let days = diff / (24*3600*1000);
    return days;
  };


  var calcFreshnessPoints = dateStr => {
    let days = getDaysPublished(dateStr);
    // 6 weeks
    if (days > 6*7) return 10;
    return 0;
  };


  var hasExactMatch = function(str, substr){
    var index = str.indexOf(substr);
    if (index === -1) return false;
    if (index > 0 && str[index - 1].match(/\w/)) return false;
    var nextChar = index + substr.length;
    if (str[nextChar] && str[nextChar].match(/\w/)) return false;
    return true;
  };


  var preprocessWords = function(text, params){
    text = text.toLowerCase();
    let keywords = text.match(/[\w-']+/g);
    if (!keywords) {
      keywords = text.split(/\s+/);
    }
    if (!keywords) return '';
    keywords = keywords.map(function(kw){
      kw = kw.replace(/^'/, '');
      kw = kw.replace(/'$/, '');
      if (params.pluralize) kw = pluralize(kw);
      return kw;
    });
    if (params.split) return keywords;
    else return keywords.join(' ');
  };


  var calcKeywordsOptimizationPoints = (query, title, description, scale) => {
    let exactMatchesTitle = 0, exactMatchesDescr = 0, broadMatchesTitle = 0, broadMatchesDescr = 0;
    if (!title) title = '';
    if (!description) description = '';
    query = preprocessWords(query, {pluralize: true});
    title = preprocessWords(title, {pluralize: true});
    description = preprocessWords(description, {pluralize: true});
    if (hasExactMatch(title, query)) {
      exactMatchesTitle = scale[0];
    }
    if (hasExactMatch(description, query)) {
      exactMatchesDescr = scale[1];
    }
    let keywords = query.split(/\s+/);
    let arrTitle = title.split(/\s+/);
    let arrDscr = description.split(/\s+/);
    let titleHasAll = true;
    let dscrHasAll = true;
    // console.log(description);
    // console.log(arrTitle, arrDscr);
    keywords.map(keyword => {
      if (arrTitle.indexOf(keyword) === -1) titleHasAll = false;
      if (arrDscr.indexOf(keyword) === -1) dscrHasAll = false;
    });
    if (titleHasAll) broadMatchesTitle = scale[2];
    if (dscrHasAll) broadMatchesDescr = scale[3];
    let sum = exactMatchesTitle + exactMatchesDescr + broadMatchesTitle + broadMatchesDescr;
    return {
      sum: sum,
      exactMatchesTitle: exactMatchesTitle,
      exactMatchesDescr: exactMatchesDescr,
      broadMatchesTitle: broadMatchesTitle,
      broadMatchesDescr: broadMatchesDescr,
    };
  };


  var calcSubscribersPoints = val => {
    if (typeof val === 'undefined') return;
    if (val < 1000) return 0;
    if (val < 100000) return 1;
    if (val < 500000) return 4;
    if (val < 1000000) return 6;
    if (val < 1500000) return 8;
    if (val >= 1500000) return 10;
  };


  var calcChannelViewsPoints = val => {
    if (typeof val === 'undefined') return;
    if (val < 10000) return 0;
    if (val < 100000) return 1;
    if (val < 500000) return 3;
    if (val < 5000000) return 5;
    if (val < 10000000) return 8;
    if (val >= 10000000) return 10;
  };


  var calcExpertisePoints = function(channelId, ytInitialData){
    let total = 0;
    let fromChannel = 0;
    let results = getObjValue(ytInitialData, '.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results');
    if (results && results[1] && results[1].itemSectionRenderer) results = results[1].itemSectionRenderer.contents;
    else if (results && results.length >= 20) {}
    else results = [];
    // console.log(results);
    if (!results.length) return 'n/a';
    results.map(result => {
      let id = getObjValue(result, '.compactVideoRenderer.longBylineText.runs[0].navigationEndpoint.browseEndpoint.browseId');
      if (!id) return;
      total++;
      if (id === channelId) fromChannel++;
    });
    let res = Math.round(100 * fromChannel / total);
    return res;
  };


  var getComments = async function(params){
    let url = 'https://www.youtube.com/youtubei/v1/next?key=' + encodeURIComponent(params.innertubeApiKey);
    // let url = 'https://www.youtube.com/comment_service_ajax?action_get_comments=1&pbj=1&ctoken=' + encodeURIComponent(continuation);
    let response = await fetch(url, {
      "headers": {
        "content-type": "application/json",
      },
      "body": `{"context":{"client":{"visitorData":"${params.visitorData}","clientName":"WEB","clientVersion":"${params.clientVersion}"}},"continuation":"${params.continuation}"}`,
      "method": "POST",
      "mode": "cors"
    });
    let json = await response.json();
    // console.log(json);
    let commentsCount;
    let countText;
    try {
      countText = getObjValue(json, '.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.countText.runs[0].text');
      commentsCount = getObjValue(json, '.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.commentsCount.runs[0].text');
    } catch (e) {
      console.log(e);
    }
    return {
      commentsCount: commentsCount,
      countText: countText,
      count: convertToInt(countText)
    };
  };


  var convertToInt = function(text){
    if (!text) return '';
    text = text.replace(/[^\d-]/g, '');
    return parseInt(text);
  };


  var convertAbbreviatedNumber = function(text){
    let matches = text.toLowerCase().match(/([\d.,]+)(k|m|b)?(\s|$)/);
    if (!matches) return '';
    let n = matches[1];
    let suffix = matches[2];
    n = parseFloat(n.replace(/,/g, ''));
    if (suffix === 'k') n = n*1000;
    if (suffix === 'm') n = n*1000000;
    if (suffix === 'b') n = n*1000000000;
    return parseInt(n);
  };


  var getSource = function(){
    return source;
  };


  return {
    init: init,
    getSource: getSource
  };

})();


var ytSVGIcons = {
  chatgpt: `<svg style="filter: brightness(0.8);" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-outside-1_3606_3145" maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22" fill="black">
                <rect fill="white" x="1" y="1" width="22" height="22"></rect>
                <path d="M20.6816 10.1843C20.9588 9.34066 21.0063 8.4399 20.8192 7.57245C20.6321 6.70499 20.217 5.90134 19.6157 5.24216C19.0143 4.58298 18.2478 4.09146 17.393 3.81692C16.5382 3.54238 15.6253 3.49449 14.7459 3.67805C14.1453 3.01747 13.379 2.52468 12.524 2.24931C11.669 1.97394 10.7555 1.92571 9.87559 2.10947C8.99568 2.29324 8.18039 2.70252 7.51181 3.29608C6.84323 3.88965 6.34499 4.64654 6.06725 5.49055C5.18642 5.67292 4.3699 6.08122 3.70003 6.67426C3.03017 7.26731 2.53064 8.02413 2.25182 8.86842C1.97299 9.71271 1.92474 10.6146 2.11192 11.4832C2.2991 12.3517 2.71509 13.1562 3.31795 13.8155C3.09309 14.4899 3.01633 15.2037 3.09278 15.9095C3.16924 16.6154 3.39716 17.2971 3.76139 17.9093C4.30169 18.8351 5.12567 19.568 6.11483 20.0027C7.104 20.4373 8.20738 20.5512 9.26631 20.328C9.74353 20.8568 10.3291 21.2796 10.9844 21.5684C11.6396 21.8571 12.3495 22.0053 13.0672 22.003C14.1516 22.003 15.2081 21.6635 16.0847 21.0334C16.9612 20.4034 17.6125 19.5152 17.9449 18.4968C18.649 18.3539 19.3141 18.0649 19.8962 17.6489C20.4784 17.233 20.9642 16.6997 21.3214 16.0843C21.8585 15.1598 22.0858 14.0915 21.9709 13.032C21.856 11.9724 21.4048 10.9758 20.6816 10.1843ZM13.0798 20.6968C12.191 20.6968 11.3302 20.3894 10.6473 19.828L10.7677 19.7593L14.8029 17.4593C14.9069 17.4047 14.9935 17.3225 15.0528 17.2221C15.1121 17.1216 15.1418 17.0068 15.1386 16.8905V11.2655L16.8427 12.2405C16.8517 12.2441 16.8594 12.2501 16.865 12.2579C16.8706 12.2656 16.8739 12.2748 16.8744 12.2843V16.9343C16.876 17.4289 16.7785 17.9189 16.5875 18.3761C16.3964 18.8333 16.1156 19.2488 15.7611 19.5985C15.4067 19.9482 14.9856 20.2253 14.5222 20.4138C14.0588 20.6023 13.5621 20.6984 13.0608 20.6968H13.0798ZM4.90165 17.2593C4.46164 16.5029 4.3026 15.6189 4.45188 14.7593L4.57224 14.828L8.60749 17.128C8.70379 17.1829 8.81303 17.2118 8.92423 17.2118C9.03543 17.2118 9.14467 17.1829 9.24097 17.128L14.1758 14.3218V16.253C14.1797 16.2608 14.1817 16.2694 14.1817 16.278C14.1817 16.2867 14.1797 16.2953 14.1758 16.303L10.0962 18.628C9.66403 18.8748 9.18685 19.0352 8.69188 19.0999C8.19692 19.1647 7.69387 19.1326 7.21148 19.0055C6.72909 18.8784 6.27681 18.6587 5.88048 18.3591C5.48415 18.0595 5.15154 17.6858 4.90165 17.2593ZM3.83741 8.5843C4.28764 7.82089 4.99655 7.23878 5.83919 6.94055V11.6718C5.83595 11.7857 5.86434 11.8983 5.92128 11.9975C5.97823 12.0966 6.06156 12.1785 6.16227 12.2343L11.0717 15.028L9.36766 16.003C9.34918 16.0092 9.32914 16.0092 9.31065 16.003L5.23106 13.678C4.36041 13.1812 3.72487 12.3642 3.46364 11.4059C3.20242 10.4476 3.33682 9.42624 3.83741 8.56555V8.5843ZM17.8563 11.7968L12.9278 8.9718L14.6319 8.00305C14.6403 7.99741 14.6502 7.99439 14.6604 7.99439C14.6705 7.99439 14.6805 7.99741 14.6889 8.00305L18.7685 10.328C19.3915 10.684 19.8992 11.2072 20.2325 11.8368C20.5659 12.4664 20.7111 13.1764 20.6514 13.8843C20.5916 14.5921 20.3294 15.2687 19.8951 15.8352C19.4608 16.4017 18.8724 16.8349 18.1983 17.0843V12.353C18.1946 12.2391 18.1612 12.1281 18.1013 12.0306C18.0414 11.9332 17.957 11.8527 17.8563 11.7968ZM19.554 9.2968L19.4336 9.2218L15.4047 6.9093C15.3047 6.84846 15.1896 6.81624 15.0721 6.81624C14.9547 6.81624 14.8395 6.84846 14.7396 6.9093L9.8111 9.71555V7.75305C9.8061 7.7445 9.80346 7.7348 9.80346 7.72492C9.80346 7.71505 9.8061 7.70535 9.8111 7.6968L13.897 5.37805C14.5222 5.02257 15.2371 4.85003 15.958 4.88059C16.6789 4.91115 17.3762 5.14356 17.9682 5.55064C18.5601 5.95772 19.0225 6.52265 19.301 7.17939C19.5796 7.83614 19.663 8.55755 19.5413 9.2593L19.554 9.2968ZM8.87989 12.7218L7.1695 11.753C7.15339 11.7405 7.1422 11.7228 7.13782 11.703V7.06555C7.13785 6.35289 7.34371 5.65499 7.73128 5.0536C8.11885 4.45222 8.67209 3.97224 9.32619 3.6699C9.98029 3.36756 10.7082 3.25537 11.4246 3.34647C12.141 3.43757 12.8162 3.7282 13.3712 4.1843L13.2636 4.25305L9.21563 6.55305C9.11158 6.60765 9.02504 6.68981 8.96573 6.79029C8.90642 6.89076 8.87669 7.00557 8.87989 7.1218V12.7218ZM9.80476 10.753L11.9966 9.50305L14.1948 10.753V13.253L11.9966 14.503L9.79843 13.253L9.80476 10.753Z"></path>
                </mask>
                <path d="M20.6816 10.1843C20.9588 9.34066 21.0063 8.4399 20.8192 7.57245C20.6321 6.70499 20.217 5.90134 19.6157 5.24216C19.0143 4.58298 18.2478 4.09146 17.393 3.81692C16.5382 3.54238 15.6253 3.49449 14.7459 3.67805C14.1453 3.01747 13.379 2.52468 12.524 2.24931C11.669 1.97394 10.7555 1.92571 9.87559 2.10947C8.99568 2.29324 8.18039 2.70252 7.51181 3.29608C6.84323 3.88965 6.34499 4.64654 6.06725 5.49055C5.18642 5.67292 4.3699 6.08122 3.70003 6.67426C3.03017 7.26731 2.53064 8.02413 2.25182 8.86842C1.97299 9.71271 1.92474 10.6146 2.11192 11.4832C2.2991 12.3517 2.71509 13.1562 3.31795 13.8155C3.09309 14.4899 3.01633 15.2037 3.09278 15.9095C3.16924 16.6154 3.39716 17.2971 3.76139 17.9093C4.30169 18.8351 5.12567 19.568 6.11483 20.0027C7.104 20.4373 8.20738 20.5512 9.26631 20.328C9.74353 20.8568 10.3291 21.2796 10.9844 21.5684C11.6396 21.8571 12.3495 22.0053 13.0672 22.003C14.1516 22.003 15.2081 21.6635 16.0847 21.0334C16.9612 20.4034 17.6125 19.5152 17.9449 18.4968C18.649 18.3539 19.3141 18.0649 19.8962 17.6489C20.4784 17.233 20.9642 16.6997 21.3214 16.0843C21.8585 15.1598 22.0858 14.0915 21.9709 13.032C21.856 11.9724 21.4048 10.9758 20.6816 10.1843ZM13.0798 20.6968C12.191 20.6968 11.3302 20.3894 10.6473 19.828L10.7677 19.7593L14.8029 17.4593C14.9069 17.4047 14.9935 17.3225 15.0528 17.2221C15.1121 17.1216 15.1418 17.0068 15.1386 16.8905V11.2655L16.8427 12.2405C16.8517 12.2441 16.8594 12.2501 16.865 12.2579C16.8706 12.2656 16.8739 12.2748 16.8744 12.2843V16.9343C16.876 17.4289 16.7785 17.9189 16.5875 18.3761C16.3964 18.8333 16.1156 19.2488 15.7611 19.5985C15.4067 19.9482 14.9856 20.2253 14.5222 20.4138C14.0588 20.6023 13.5621 20.6984 13.0608 20.6968H13.0798ZM4.90165 17.2593C4.46164 16.5029 4.3026 15.6189 4.45188 14.7593L4.57224 14.828L8.60749 17.128C8.70379 17.1829 8.81303 17.2118 8.92423 17.2118C9.03543 17.2118 9.14467 17.1829 9.24097 17.128L14.1758 14.3218V16.253C14.1797 16.2608 14.1817 16.2694 14.1817 16.278C14.1817 16.2867 14.1797 16.2953 14.1758 16.303L10.0962 18.628C9.66403 18.8748 9.18685 19.0352 8.69188 19.0999C8.19692 19.1647 7.69387 19.1326 7.21148 19.0055C6.72909 18.8784 6.27681 18.6587 5.88048 18.3591C5.48415 18.0595 5.15154 17.6858 4.90165 17.2593ZM3.83741 8.5843C4.28764 7.82089 4.99655 7.23878 5.83919 6.94055V11.6718C5.83595 11.7857 5.86434 11.8983 5.92128 11.9975C5.97823 12.0966 6.06156 12.1785 6.16227 12.2343L11.0717 15.028L9.36766 16.003C9.34918 16.0092 9.32914 16.0092 9.31065 16.003L5.23106 13.678C4.36041 13.1812 3.72487 12.3642 3.46364 11.4059C3.20242 10.4476 3.33682 9.42624 3.83741 8.56555V8.5843ZM17.8563 11.7968L12.9278 8.9718L14.6319 8.00305C14.6403 7.99741 14.6502 7.99439 14.6604 7.99439C14.6705 7.99439 14.6805 7.99741 14.6889 8.00305L18.7685 10.328C19.3915 10.684 19.8992 11.2072 20.2325 11.8368C20.5659 12.4664 20.7111 13.1764 20.6514 13.8843C20.5916 14.5921 20.3294 15.2687 19.8951 15.8352C19.4608 16.4017 18.8724 16.8349 18.1983 17.0843V12.353C18.1946 12.2391 18.1612 12.1281 18.1013 12.0306C18.0414 11.9332 17.957 11.8527 17.8563 11.7968ZM19.554 9.2968L19.4336 9.2218L15.4047 6.9093C15.3047 6.84846 15.1896 6.81624 15.0721 6.81624C14.9547 6.81624 14.8395 6.84846 14.7396 6.9093L9.8111 9.71555V7.75305C9.8061 7.7445 9.80346 7.7348 9.80346 7.72492C9.80346 7.71505 9.8061 7.70535 9.8111 7.6968L13.897 5.37805C14.5222 5.02257 15.2371 4.85003 15.958 4.88059C16.6789 4.91115 17.3762 5.14356 17.9682 5.55064C18.5601 5.95772 19.0225 6.52265 19.301 7.17939C19.5796 7.83614 19.663 8.55755 19.5413 9.2593L19.554 9.2968ZM8.87989 12.7218L7.1695 11.753C7.15339 11.7405 7.1422 11.7228 7.13782 11.703V7.06555C7.13785 6.35289 7.34371 5.65499 7.73128 5.0536C8.11885 4.45222 8.67209 3.97224 9.32619 3.6699C9.98029 3.36756 10.7082 3.25537 11.4246 3.34647C12.141 3.43757 12.8162 3.7282 13.3712 4.1843L13.2636 4.25305L9.21563 6.55305C9.11158 6.60765 9.02504 6.68981 8.96573 6.79029C8.90642 6.89076 8.87669 7.00557 8.87989 7.1218V12.7218ZM9.80476 10.753L11.9966 9.50305L14.1948 10.753V13.253L11.9966 14.503L9.79843 13.253L9.80476 10.753Z" fill="#828282"></path>
                <path d="M20.6816 10.1843C20.9588 9.34066 21.0063 8.4399 20.8192 7.57245C20.6321 6.70499 20.217 5.90134 19.6157 5.24216C19.0143 4.58298 18.2478 4.09146 17.393 3.81692C16.5382 3.54238 15.6253 3.49449 14.7459 3.67805C14.1453 3.01747 13.379 2.52468 12.524 2.24931C11.669 1.97394 10.7555 1.92571 9.87559 2.10947C8.99568 2.29324 8.18039 2.70252 7.51181 3.29608C6.84323 3.88965 6.34499 4.64654 6.06725 5.49055C5.18642 5.67292 4.3699 6.08122 3.70003 6.67426C3.03017 7.26731 2.53064 8.02413 2.25182 8.86842C1.97299 9.71271 1.92474 10.6146 2.11192 11.4832C2.2991 12.3517 2.71509 13.1562 3.31795 13.8155C3.09309 14.4899 3.01633 15.2037 3.09278 15.9095C3.16924 16.6154 3.39716 17.2971 3.76139 17.9093C4.30169 18.8351 5.12567 19.568 6.11483 20.0027C7.104 20.4373 8.20738 20.5512 9.26631 20.328C9.74353 20.8568 10.3291 21.2796 10.9844 21.5684C11.6396 21.8571 12.3495 22.0053 13.0672 22.003C14.1516 22.003 15.2081 21.6635 16.0847 21.0334C16.9612 20.4034 17.6125 19.5152 17.9449 18.4968C18.649 18.3539 19.3141 18.0649 19.8962 17.6489C20.4784 17.233 20.9642 16.6997 21.3214 16.0843C21.8585 15.1598 22.0858 14.0915 21.9709 13.032C21.856 11.9724 21.4048 10.9758 20.6816 10.1843ZM13.0798 20.6968C12.191 20.6968 11.3302 20.3894 10.6473 19.828L10.7677 19.7593L14.8029 17.4593C14.9069 17.4047 14.9935 17.3225 15.0528 17.2221C15.1121 17.1216 15.1418 17.0068 15.1386 16.8905V11.2655L16.8427 12.2405C16.8517 12.2441 16.8594 12.2501 16.865 12.2579C16.8706 12.2656 16.8739 12.2748 16.8744 12.2843V16.9343C16.876 17.4289 16.7785 17.9189 16.5875 18.3761C16.3964 18.8333 16.1156 19.2488 15.7611 19.5985C15.4067 19.9482 14.9856 20.2253 14.5222 20.4138C14.0588 20.6023 13.5621 20.6984 13.0608 20.6968H13.0798ZM4.90165 17.2593C4.46164 16.5029 4.3026 15.6189 4.45188 14.7593L4.57224 14.828L8.60749 17.128C8.70379 17.1829 8.81303 17.2118 8.92423 17.2118C9.03543 17.2118 9.14467 17.1829 9.24097 17.128L14.1758 14.3218V16.253C14.1797 16.2608 14.1817 16.2694 14.1817 16.278C14.1817 16.2867 14.1797 16.2953 14.1758 16.303L10.0962 18.628C9.66403 18.8748 9.18685 19.0352 8.69188 19.0999C8.19692 19.1647 7.69387 19.1326 7.21148 19.0055C6.72909 18.8784 6.27681 18.6587 5.88048 18.3591C5.48415 18.0595 5.15154 17.6858 4.90165 17.2593ZM3.83741 8.5843C4.28764 7.82089 4.99655 7.23878 5.83919 6.94055V11.6718C5.83595 11.7857 5.86434 11.8983 5.92128 11.9975C5.97823 12.0966 6.06156 12.1785 6.16227 12.2343L11.0717 15.028L9.36766 16.003C9.34918 16.0092 9.32914 16.0092 9.31065 16.003L5.23106 13.678C4.36041 13.1812 3.72487 12.3642 3.46364 11.4059C3.20242 10.4476 3.33682 9.42624 3.83741 8.56555V8.5843ZM17.8563 11.7968L12.9278 8.9718L14.6319 8.00305C14.6403 7.99741 14.6502 7.99439 14.6604 7.99439C14.6705 7.99439 14.6805 7.99741 14.6889 8.00305L18.7685 10.328C19.3915 10.684 19.8992 11.2072 20.2325 11.8368C20.5659 12.4664 20.7111 13.1764 20.6514 13.8843C20.5916 14.5921 20.3294 15.2687 19.8951 15.8352C19.4608 16.4017 18.8724 16.8349 18.1983 17.0843V12.353C18.1946 12.2391 18.1612 12.1281 18.1013 12.0306C18.0414 11.9332 17.957 11.8527 17.8563 11.7968ZM19.554 9.2968L19.4336 9.2218L15.4047 6.9093C15.3047 6.84846 15.1896 6.81624 15.0721 6.81624C14.9547 6.81624 14.8395 6.84846 14.7396 6.9093L9.8111 9.71555V7.75305C9.8061 7.7445 9.80346 7.7348 9.80346 7.72492C9.80346 7.71505 9.8061 7.70535 9.8111 7.6968L13.897 5.37805C14.5222 5.02257 15.2371 4.85003 15.958 4.88059C16.6789 4.91115 17.3762 5.14356 17.9682 5.55064C18.5601 5.95772 19.0225 6.52265 19.301 7.17939C19.5796 7.83614 19.663 8.55755 19.5413 9.2593L19.554 9.2968ZM8.87989 12.7218L7.1695 11.753C7.15339 11.7405 7.1422 11.7228 7.13782 11.703V7.06555C7.13785 6.35289 7.34371 5.65499 7.73128 5.0536C8.11885 4.45222 8.67209 3.97224 9.32619 3.6699C9.98029 3.36756 10.7082 3.25537 11.4246 3.34647C12.141 3.43757 12.8162 3.7282 13.3712 4.1843L13.2636 4.25305L9.21563 6.55305C9.11158 6.60765 9.02504 6.68981 8.96573 6.79029C8.90642 6.89076 8.87669 7.00557 8.87989 7.1218V12.7218ZM9.80476 10.753L11.9966 9.50305L14.1948 10.753V13.253L11.9966 14.503L9.79843 13.253L9.80476 10.753Z" stroke="#828282" stroke-width="0.2" mask="url(#path-1-outside-1_3606_3145)"></path>
            </svg>`,
  claude: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" class="text-text-000 flex-shrink-0 h-[1.625rem]" fill="currentColor"><path shape-rendering="optimizeQuality" fill="#D97757" d="m7.75 26.27 7.77-4.36.13-.38-.13-.21h-.38l-1.3-.08-4.44-.12-3.85-.16-3.73-.2-.94-.2L0 19.4l.09-.58.79-.53 1.13.1 2.5.17 3.75.26 2.72.16 4.03.42h.64l.09-.26-.22-.16-.17-.16-3.88-2.63-4.2-2.78-2.2-1.6L3.88 11l-.6-.76-.26-1.66L4.1 7.39l1.45.1.37.1 1.47 1.13 3.14 2.43 4.1 3.02.6.5.24-.17.03-.12-.27-.45L13 9.9l-2.38-4.1-1.06-1.7-.28-1.02c-.1-.42-.17-.77-.17-1.2L10.34.21l.68-.22 1.64.22.69.6 1.02 2.33 1.65 3.67 2.56 4.99.75 1.48.4 1.37.15.42h.26v-.24l.21-2.81.39-3.45.38-4.44.13-1.25.62-1.5L23.1.57l.96.46.79 1.13-.11.73-.47 3.05-.92 4.78-.6 3.2h.35l.4-.4 1.62-2.15 2.72-3.4 1.2-1.35 1.4-1.49.9-.71h1.7l1.25 1.86-.56 1.92-1.75 2.22-1.45 1.88-2.08 2.8-1.3 2.24.12.18.31-.03 4.7-1 2.54-.46 3.03-.52 1.37.64.15.65-.54 1.33-3.24.8-3.8.76-5.66 1.34-.07.05.08.1 2.55.24 1.09.06h2.67l4.97.37 1.3.86.78 1.05-.13.8-2 1.02-2.7-.64-6.3-1.5-2.16-.54h-.3v.18l1.8 1.76 3.3 2.98 4.13 3.84.21.95-.53.75-.56-.08-3.63-2.73-1.4-1.23-3.17-2.67h-.21v.28l.73 1.07 3.86 5.8.2 1.78-.28.58-1 .35-1.1-.2L26 33.14l-2.33-3.57-1.88-3.2-.23.13-1.11 11.95-.52.61-1.2.46-1-.76-.53-1.23.53-2.43.64-3.17.52-2.52.47-3.13.28-1.04-.02-.07-.23.03-2.36 3.24-3.59 4.85-2.84 3.04-.68.27-1.18-.61.11-1.09.66-.97 3.93-5 2.37-3.1 1.53-1.79-.01-.26h-.09L6.8 30.56l-1.86.24-.8-.75.1-1.23.38-.4 3.14-2.16Z"></path></svg>`,
  gemini: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 10.0196C14.6358 10.3431 10.3431 14.6358 10.0196 20H9.98042C9.65687 14.6358 5.36425 10.3431 0 10.0196V9.98043C5.36425 9.65688 9.65687 5.36424 9.98042 0H10.0196C10.3431 5.36424 14.6358 9.65688 20 9.98043V10.0196Z" fill="url(#paint0_radial_809_11874)"/><defs><radialGradient id="paint0_radial_809_11874" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-6.13727 9.97493) scale(21.6266 172.607)"><stop offset="0.385135" stop-color="#9E72BA"/><stop offset="0.734299" stop-color="#D65C67"/><stop offset="0.931035" stop-color="#D6635C"/></radialGradient></defs></svg>`
}
