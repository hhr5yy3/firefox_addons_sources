(function () {
  
  var params = {};
  var isLite = window.localStorage.getItem('lite') === 'true' && window.localStorage.getItem('liteOverride') !== 'true';
  var isSwitchedToFullView = window.localStorage.getItem('halfView') === 'true';

  document.addEventListener("DOMContentLoaded", function (event) {
    if (isSwitchedToFullView) {
      document.body.classList.add('initial-full-view');
    }
  });


  function setParams() {
    window.location.hash.substr(1).split('&').forEach(function (item) {
      if (item) {
        var param = item.split('=');
        if (param[0] && param[1]) {
          params[param[0]] = param[1];
        }
      }
    });
  }

  function goToChromeSearch() {
    window.chrome.tabs.getCurrent(function (tab) {
      window.chrome.tabs.update(tab.id, {
        "url": "chrome://new-tab-page"
      });
    });

    window.stop();
  }

  function updateQuickAccess() {

    if (isSwitchedToFullView) {

      var head = document.head,
      link = document.createElement('style');
      link.innerHTML = '#quickAccess { display: block !important;  -webkit-transition: none !important; } #quickAccess .input { display :none }';

      head.appendChild(link);

    }
    
  }

  function checkLogin() {

    if (params.token) {

      if (window.chrome && window.chrome.storage) {
        window.chrome.storage.local.remove("user");
      } else {
        window.localStorage.removeItem("user");
      }

      window.localStorage.token = params.token;
      
      if (params.favorite) {
        window.REGISTERED = 'favorite';
      } else if (params.sources && !params.ftx) {
        window.REGISTERED = 'sources';
      } else if (params.returnTo) {
        window.REGISTERED = params.returnTo;
      } else if (params.sourceFeedPromo) {
        window.REGISTERED = 'sourceFeedPromo';
      } else if (params.ftx) {
        window.REGISTERED = 'ftx';
      } else {
        window.REGISTERED = 'login';
      }

      window.location.hash = '';

      return true;
    }
  }

  function checkTwitter() {
    if (params.twitter) {
      window.localStorage.social_handler = params.twitter;
      window.location.hash = '';
      return true;
    }
  }

  function checkLite() {

    if (window.location.search === '?button') {
      return;
    }

    if (window.location.search === '?lite-check') {
      window.LITE_CHECK = true;
      return;
    }

    if (window.location.search === '?lite-enable') {
      window.history.replaceState({}, document.title, '/index.html');
      window.LITE_ENABLE = true;
      return;
    }

    if (window.location?.search === '?first-open' || window.location.search?.startsWith('?referrer') || !localStorage.alreadyOpened) {
      localStorage.alreadyOpened = true;
      window.FIRST_OPEN = true;
      return;
    }
    
    if (!window.location?.search?.startsWith('?login')) {
      window.DEFAULT_NTP = true;
    }

    if (window.chrome && isLite) {
      goToChromeSearch();
    }

  }

  setParams();
  updateQuickAccess();


  if (checkTwitter()) {
    return;
  }

  if (checkLogin()) {
    return;
  }

  checkLite();

})();
