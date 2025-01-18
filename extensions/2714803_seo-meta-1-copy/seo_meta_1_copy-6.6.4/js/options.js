$(function() {
  function getPageCacheStatus() {
    let pageCacheStatus = _storageCache["PageCacheStatus"];
    if (pageCacheStatus === null || pageCacheStatus === undefined) {
      pageCacheStatus = 1;
    } else {
      pageCacheStatus = parseInt(pageCacheStatus);
    }
    return pageCacheStatus;
  }
  function isPageCacheUse() {
    return getPageCacheStatus() === 1;
  }
  function setPageCacheStatus(radioId) {
    let flag = 0;
    if (radioId === "pageCacheUse") {
      flag = 1;
    }
    setStorage("PageCacheStatus", flag);
  }
  function setOptionViewType(val) {
    setStorage("option_view_type", val);
  }
  function l(msgId) {
    return _c.l(msgId);
  }
  function getAllStorageSyncData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(cStorageKeys, items => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(items);
      });
    });
  }
  function loadPage() {
    initStorageCache(init);
  }
  function init() {
    $(".mlcl").each(function() {
      let mId = $(this).data("mid");
      $(this).html(l(mId));
    });
    if (isPageCacheUse()) {
      $("input#pageCacheUse").prop("checked", true);
    } else {
      $("input#pageCacheNotUse").prop("checked", true);
    }
    let option_default_tab = _storageCache["option_default_tab"];
    if (option_default_tab !== undefined) {
      $("#option_default_tab").val(option_default_tab);
    }
    let option_view_type = _storageCache["option_view_type"];
    if (option_view_type === undefined) {
      option_view_type = 1;
    }
    $("input#option_view_type_" + option_view_type).prop("checked", true);
    const $field = $("#shortcuts");
    chrome.commands.getAll(commands => {
      $(commands).each((i, command) => {
        let desc = command.description;
        let shortcut = command.shortcut;
        if (desc === "" && command.name === "_execute_action") {
          desc = l("_execute_action");
        }
        if (shortcut === "") {
          shortcut = " no set ";
        }
        const tag = $('<div class="pure-control-group"><label>' + desc + '</label><input type="text" value="' + shortcut + '" readonly/></div>');
        $field.append(tag);
      });
    });
    if (isFireFox()) {
      $(".firefox_only").show();
    } else {
      $(".chrome_only").show();
    }
  }
  function getBrowser() {
    return chrome;
  }
  function isFireFox() {
    return isFireFoxBrowser;
  }
  function bw() {
    if (isFireFox()) {
      return browser;
    } else {
      return chrome;
    }
  }
  function logging(...log) {
    bw().runtime.sendMessage({action:"logging", log:log}, function(response) {
    });
  }
  function setStorage(key, data) {
    let keyVal = {};
    keyVal[key] = data;
    chrome.storage.local.set(keyVal, function() {
    });
  }
  const _L_HEAD = "[SMI opt]";
  const _COM = function() {
    function l(msgId) {
      return chrome.i18n.getMessage(msgId);
    }
    const extensionId = chrome.runtime.id;
    const l_key = "toolFav";
    const cStorageKeys = ["uid", "last_click_tab", "option_default_tab", "PageCacheStatus", "option_view_type", "initialSidePanelWidth", "toolFav"];
    return {l, getURL:function(path) {
      return chrome.runtime.getURL(path);
    }, getCashStorageKeys:function() {
      return cStorageKeys;
    }, getToolFavKey:function() {
      return l_key;
    }};
  };
  const _c = _COM();
  const _storageCache = {};
  const cStorageKeys = _c.getCashStorageKeys();
  const initStorageCache = function(loadedCallback) {
    return getAllStorageSyncData().then(items => {
      Object.assign(_storageCache, items);
      loadedCallback();
    });
  };
  $(document).on("change", ".pageCacheRadio", function() {
    let radioCheck = $(this).attr("id");
    setPageCacheStatus(radioCheck);
  });
  $(document).on("change", ".viewTypeRadio", function() {
    let val = $(this).val();
    setOptionViewType(val);
  });
  $(document).on("change", "#option_default_tab", function() {
    let val = $(this).val();
    setStorage("option_default_tab", val);
  });
  $(document).on("click", "#editShortCuts", function() {
    const open_url = "chrome://extensions/shortcuts";
    chrome.tabs.create({url:open_url});
  });
  var isChromeBrowser = false;
  var isFireFoxBrowser = true;
  if (navigator.userAgent.indexOf("Chrome") !== -1) {
    isChromeBrowser = true;
    isFireFoxBrowser = false;
  }
  loadPage();
});

