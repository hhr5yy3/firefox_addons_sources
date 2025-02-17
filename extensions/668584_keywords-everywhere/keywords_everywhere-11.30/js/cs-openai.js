var Tool = (function(){

  var source = 'openai';

  var rootSel = '.header__search';
  var observer;
  var suggestionsTimer;
  var suggestionsList = {};
  var cachedSuggestions = {};
  var darkMode = false;
  var limit3_5 = 24500;


  var init = function(){
    chrome.runtime.sendMessage({cmd: 'api.getConfig'}, function(json){
      if (!json.error && json.data && json.data.openai) {
        limit3_5 = json.data.openai.limit3_5;
      }
      setTimeout(function(){
        checkPendingRequests();
      }, 1000);
    });
    addWidgetButton();
    setInterval(function(){
      addWidgetButton();
    }, 3000);
    initMutationObserver(document.body);
    initWindowMessaging();
    var settings = Starter.getSettings();
    if (settings.showChatGPTactions) {
      addPersuasions();
    }
    // processPage();
    // initURLChangeListener(function(){
    //   processPage();
    // });
  };


  var checkPendingRequests = function(){
    let limit = limit3_5;
    chrome.runtime.sendMessage({
      cmd: 'yt.transcript.summarize.get'
    }, async function(data){
      if (!data) return;
      let points = data.text.length > 2000 ? 10 : 5;
      let prompt = `Summarize the transcript of a YouTube video in ${points} bullet points. The video is by ${data.channelName} and is titled ${data.title}. The entire transcript is given below.\n` + data.text;
      // let version = await waitVersion();
      await waitInput();
      // if (version === '4') limit = 256000;
      prompt = prompt.substr(0, limit);
      chooseTemplate({
        prompt: prompt
      });
    });
    chrome.runtime.sendMessage({
      cmd: 'prompt_pending.get'
    }, function(prompt){
      console.log(prompt);
      if (!prompt) return;
      prompt = prompt.substr(0, limit);
      chooseTemplate({
        prompt: prompt
      });
    });
  };


  var initMutationObserver = function( target ){
    if (observer) observer.disconnect();
    observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          if (!mutation.addedNodes.length) return;
          for (var i = 0, len = mutation.addedNodes.length; i < len; i++) {
            var node = mutation.addedNodes[i];
            if (node.nodeType === Node.ELEMENT_NODE && node.querySelector('nav')) {
              addWidgetButton();
            }
            if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('h-full')) {
              addWidgetButton();
            }
            if (node.nodeType === Node.ELEMENT_NODE && node.dataset.testid === 'profile-button') {
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
    const $form = $('main form');
    if ($form[0]) {
      let $textarea = $form.find('textarea');
      if ($textarea[0] && $textarea.is(':visible')) {
        $textarea[0].value = data.prompt.replace(/\n/g, '\r\n');
        $textarea[0].dispatchEvent(new Event('input', {bubbles: true}));
      }
      else {
        var html = data.prompt;
        html = html.replace(/\n/g, '</p><p>');
        var $prompt = $form.find('#prompt-textarea');
        // $prompt.html('<p>' + html + '</p>');
        // $prompt.html(html);
        $prompt[0].innerHTML = html;
        $prompt[0].dispatchEvent(new Event('input', {bubbles: true}));
      }
      setTimeout(function(){
        let $button = $form.find('button');
        if ($button.length >= 2 && $form.find('[data-testid="send-button"]')[0]) {
          $button = $form.find('[data-testid="send-button"]');
        }
        else if ($button.length === 3) {
          $button = $($button[2]);
        }
        else if ($button.length === 2) {
          $button = $($button[1]);
        }
        $button.removeAttr('disabled').click();
      }, 100);
      setTimeout(function(){
        $form.find('[data-testid="send-button"]').click();
      }, 500);
      setTimeout(function(){
        Array.from(document.querySelectorAll('main button svg path')).map(item => {
          const d = item.getAttribute('d');
          if (d.startsWith("M15.1918 8.90615C15.6381")) {
            item.parentNode.parentNode.click();
          }
        })
      }, 4000);
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
        let sidebar = document.querySelector('nav > .flex-col');
        if (sidebar) {
          resolve(sidebar);
          clearInterval(timer);
        }
      }, 500);
    });
  };


  var waitInput = function(){
    if ($('main form textarea, #prompt-textarea')[0]) {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      let attempt = 20;
      let timer = setInterval(() => {
        if (attempt-- <= 0) {
          clearInterval(timer);
          resolve();
        }
        if ($('main form textarea, #prompt-textarea')[0]) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  };


  var waitVersion = function(){
    return new Promise(resolve => {
      let attempt = 20;
      let timer = setInterval(() => {
        if (attempt-- <= 0) {
          clearInterval(timer);
          resolve();
        }
        let version3_5 = $('div[type=button]').text().match(/ChatGPT 3\.5/);
        let version4 = $('div[type=button]').text().match(/ChatGPT 4/);
        if (version3_5 || version4) {
          if (version3_5) resolve('3.5');
          else if (version4) resolve('4');
          clearInterval(timer);
        }
      }, 500);
    });
  };


  var menuItemTemplate = function(darkmode, sec){
    var className = 'xt-openai-templates-btn';
    if (sec) className = 'xt-openai-templates-btn-sec';
    if (!darkmode) LOGO_SVG = LOGO_SVG.replace(/#fff/g, '#000');
    return `<a target="_blank" class="${className} flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 ${ darkmode ? 'text-white' : ''} cursor-pointer text-sm">${LOGO_SVG}Templates</a>`;
  };


  var addWidgetButton = function() {
    darkMode = isDarkMode();
    let $modeButton = $( $('nav > .flex-col')[0] );
    let $logoMenu = $( $('main [aria-haspopup="menu"]')[0] );
    let $loginBtn = $( $('main [data-testid="login-button"]')[0] );
    let $profileBtn = $( $('main [data-testid="profile-button"]')[0] );
    let $btn;
    let $secBtn;
    if (!$('.xt-openai-templates-btn')[0] && $modeButton[0]) {
      $btn = $(menuItemTemplate(darkMode)).insertAfter($modeButton);
      $btn.click(function(e) {
        toggleWidget();
      });
    }
    if (!$('.xt-openai-templates-btn-sec')[0]) {
      // if ($logoMenu[0]) $secBtn = $(menuItemTemplate(darkMode)).insertAfter($logoMenu);
      if ($loginBtn[0]) $secBtn = $(menuItemTemplate(darkMode, true)).insertBefore($loginBtn);
      if ($profileBtn[0]) $secBtn = $(menuItemTemplate(darkMode, true)).insertBefore($profileBtn);
      if ($secBtn) {
        $secBtn.click(function(e) {
          toggleWidget();
        });
      }
    }
    $('nav > a').map((i, node) => {
      if (node.textContent.match(/(Light|Dark) mode/)) {
        $(node).click(function(e){
          OpenaiWidgetController.post('darkmode', !isDarkMode());
        });
      }
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
    return document.documentElement.classList.contains('dark');
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
