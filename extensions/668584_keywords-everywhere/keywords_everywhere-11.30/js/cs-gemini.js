var Tool = (function(){

  var source = 'gemini';

  var rootSel = '.header__search';
  var observer;
  var suggestionsTimer;
  var suggestionsList = {};
  var cachedSuggestions = {};
  var darkMode = false;


  var init = async function(){
    setTimeout(checkPendingRequests, 1000);
    await headerReady();
    addWidgetButton();
    initBodyClassObserver();
    initMutationObserver(document.body);
    initWindowMessaging();
    var settings = Starter.getSettings();
    if (settings.showChatGPTactions) {
      addPersuasions();
    }
  };


  var checkPendingRequests = function(){
    let limit = 31847;
    chrome.runtime.sendMessage({
      cmd: 'yt.transcript.summarize.get'
    }, function(data){
      if (!data) return;
      let points = data.text.length > 2000 ? 10 : 5;
      let prompt = `Summarize the transcript of a YouTube video in ${points} bullet points - ${data.videoUrl}`;
      prompt = prompt.substr(0, limit);
      chooseTemplate({
        prompt: prompt
      });
    });
    chrome.runtime.sendMessage({
      cmd: 'prompt_pending.get'
    }, function(prompt){
      if (!prompt) return;
      prompt = prompt.substr(0, limit);
      chooseTemplate({
        prompt: prompt
      });
    });
  };


  const headerReady = function(){
    return new Promise(resolve => {
      let attempt = 100;
      let timer = setInterval(() => {
        if (attempt-- <= 0) {
          clearInterval(timer);
          resolve();
        }
        let div = document.querySelector('side-nav-action-button[mattooltip="Help"]');
        if (div) {
          resolve(div);
          clearInterval(timer);
        }
      }, 600);
    });
  };


  var initBodyClassObserver = function(){
    const body = document.body;
    const onClassChange = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (mutation.target.className.indexOf('-theme') !== -1) {
            OpenaiWidgetController.post('darkmode', isDarkMode());
          }
        }
      }
    };
    const observer = new MutationObserver(onClassChange);
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });
  };


  var initMutationObserver = function( target ){
    if (observer) observer.disconnect();
    observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          if (!mutation.addedNodes.length) return;
          for (var i = 0, len = mutation.addedNodes.length; i < len; i++) {
            var node = mutation.addedNodes[i];
            // console.log(node);
            if (node.nodeType === Node.ELEMENT_NODE && node.querySelector('nav')) {
              addWidgetButton();
            }
          }
        }
      });
    });
    var config = { subtree: true, childList: true};
    observer.observe(target, config);
  };


  var initWindowMessaging = function(){
    // console.log('initWindowMessaging');
    window.addEventListener("message", function(event){
      var payload = event.data;
      if (typeof payload !== 'object') return;
      var cmd = payload.cmd;
      var data = payload.data;
      if (!cmd) return;
      if (cmd === 'xt.resize') {
        var height = data.height;
        var source = data.source;
        var selector = '#xt-openai-widget';
        if (!selector) return;
        if (height <= 0) return;
        $(selector + ' iframe').height(height + 10);
      }
      else if (cmd === 'xt-openai-choose-template') {
        chooseTemplate(data);
      }
      else if (cmd === 'xt-openai-get-settings') {
        OpenaiWidgetController.post('settings', {
          plan: Common.getPlan(),
          settings: Starter.getSettings()
        });
      }
    }, false);
  };


  var chooseTemplate = function(data){
    const $form = $('input-area-v2');
    if ($form[0]) {
      let $textarea = $form.find('.ql-editor.textarea p');
      let $button = $form.find('button.send-button');
      $textarea.text(data.prompt);
      setTimeout(function(){
        $button.click();
      }, 500);
    }
  };


  var waitSidebarReady = function(){
    return new Promise(resolve => {
      let attempt = 10;
      let timer = setInterval(() => {
        if (attempt-- <= 0) {
          clearInterval(timer);
          resolve();
        }
        let sidebar = document.querySelector('side-nav-action-button[mattooltip="Help"]');
        if (sidebar) {
          resolve(sidebar);
          clearInterval(timer);
        }
      }, 500);
    });
  };


  var menuItemTemplate = function(darkmode){
    if (!darkmode) LOGO_SVG = LOGO_SVG.replace(/#fff/g, '#000');
    return `
      <side-nav-action-button icon="help" data-test-id="desktop-support-control" mattooltip="Templates" mattooltipposition="right" class="xt-gemini-btn mat-mdc-tooltip-trigger mat-mdc-menu-trigger" aria-haspopup="menu" aria-expanded="false"><button mat-list-item="" class="mat-mdc-list-item mdc-list-item side-nav-action-button explicit-gmat-override mat-mdc-list-item-interactive mdc-list-item--with-leading-icon mat-mdc-list-item-single-line mdc-list-item--with-one-line ng-star-inserted" type="button" aria-label="Templates" aria-disabled="false" style=""><mat-icon role="img" data-test-id="side-nav-action-button-icon" matlistitemicon="" class="mat-icon notranslate mat-mdc-list-item-icon google-symbols mat-icon-no-color mdc-list-item__start" aria-hidden="true" data-mat-icon-type="font">${LOGO_SVG}</mat-icon><span class="mdc-list-item__content"><span class="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text"><span data-test-id="side-nav-action-button-content" class="gmat-subtitle-2"> Templates </span></span></span><div class="mat-mdc-focus-indicator"></div></button></side-nav-action-button>
    `;
  };


  var addWidgetButton = function() {
    if ($('.xt-gemini-btn')[0]) return;
    darkMode = isDarkMode();
    let $modeButton = $( $('side-nav-action-button[mattooltip="Help"]')[0] );
    let $btn = $(menuItemTemplate(darkMode)).insertBefore($modeButton);
    $btn.click(function(e) {
      toggleWidget();
    });
  };


  var addPersuasions = function(){
    chrome.runtime.sendMessage({
      cmd: 'api.openAIfetchPersuasions',
      data: ''
    }, function(response){
      if (typeof response !== 'object') return;
      let $div = $('<div>');
      for (const key in response) {
        const value = response[key];
        $div.append(`<a data-prompt="${value}">${key}</a>`);
      }
      $('.xt-icon').append($div).find('a').click(function(){
        const prompt = this.dataset.prompt;
        chooseTemplate({prompt: prompt});
      });
    });
  };


  var isDarkMode = function() {
    return document.body.classList.contains('dark-theme');
  };


  var toggleWidget = function(){
    OpenaiWidgetController.toggle({
      darkMode: darkMode,
      source: source
    });
  };


  var initURLChangeListener = function( cbProcessPage ){
    var url = document.location.href;
    var timer = setInterval(function(){
      if ( url !== document.location.href ) {
        url = document.location.href;
        cbProcessPage( url );
      }
    }, 1000);
  };


  var getSource = function(){
    return source;
  };


  let LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 262.77 262.77"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g><circle cx="131.38" cy="131.38" r="126.38" style="fill: none;stroke: #fff;stroke-miterlimit: 10;stroke-width: 10px"/><path d="M109.38,106.42c7.54-9,14-17.2,20.94-25,7.63-8.58,15.73-16.73,23.48-25.2,4.32-4.72,9.2-5.71,14.78-2.85,5.07,2.59,10,5.43,14.34,7.81-12.71,12-24.57,23.42-36.64,34.59-4.92,4.56-5.87,9.38-3.45,15.63,11.36,29.37,23.23,58.47,41.41,84.49.95,1.35,2,2.62,3.47,4.5C180.2,206.74,172,210.94,162.14,211c-1.48,0-3.48-2-4.39-3.54-5-8.63-10.36-17.12-14.36-26.2-6.75-15.37-12.57-31.15-18.78-46.77-1-2.6-2-5.22-3.51-9.14-5.47,8.17-12.51,14.31-12.51,23.93,0,16.81.38,33.63.91,50.44.11,3.63-.92,5.56-4.32,6.67-6.73,2.18-13.44,3.46-20.58,2.12-2.79-.52-3.69-1.83-3.77-4.22-.12-3.32-.23-6.65-.16-10q.93-41.44,1.94-82.89c.08-3.33.33-6.65.56-10,.84-11.8-.41-23.09-6-33.86-3.1-5.92-2.59-6.68,3.77-8.25a151.63,151.63,0,0,1,22.45-4c6.93-.64,7.1-.1,7,6.71-.23,12.48-.62,25-.93,37.44C109.34,101.33,109.38,103.16,109.38,106.42Z" style="fill: #fff"/></g></g></g></svg>`;


  return {
    init: init,
    getSource: getSource
  };

})();
