let i18n = {};
$(function() {
  function isFireFox() {
    return isFireFoxBrowser;
  }
  function isPageCacheUse() {
    const getPageCacheStatus = function() {
      let pageCacheStatus = _storageCache["PageCacheStatus"];
      if (pageCacheStatus === null || pageCacheStatus === undefined) {
        pageCacheStatus = 1;
      } else {
        pageCacheStatus = parseInt(pageCacheStatus);
      }
      return pageCacheStatus;
    };
    return getPageCacheStatus() === 1;
  }
  function getAllStorageSyncData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(t.getStorageKeys(), items => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(items);
      });
    });
  }
  function clearHtml() {
    let msg = l("process_start");
    let progressBarHtml = '<div><progress class=\'mainProgressBar\' value="1" max="100">1%</progress></div>';
    $(["base_info_contents", "headlines_list", "json-ld_list", "microdata_list", "rdfa_list", "img_content_list", "social_content_list", "tool_content_list"]).each(function(i, id) {
      $("#" + id).html('<div class=\'research-start\'><span class="kaiten"><i class="fa-spinner kaiten-icon"></i></span> ' + msg + progressBarHtml + "</div>");
    });
    $(["tab-counter-headline", "tab-counter-jsonld", "tab-counter-microdata", "tab-counter-RDFa", "tab-counter-img", "tab-counter-structured-data", "tab-counter-social", "tab-counter-tool"]).each(function(i, id) {
      $("#" + id).html("");
    });
  }
  function getBrowser() {
    return chrome;
  }
  function l(msgId) {
    if (!isExt) {
      return t.l(msgId);
    } else {
      return msgId;
    }
  }
  function assignMessages() {
    let appVer = getManifestData("version");
    document.getElementById("popup_title").textContent = "SEO META 1 COPY(v" + appVer + ")";
    document.getElementById("footer-ver").textContent = "ver. " + appVer;
    document.querySelectorAll(".mlcl").forEach(function(element) {
      element.textContent = l(element.getAttribute("data-mid"));
    });
  }
  function setDefaultTab() {
    let option_default_tab = _storageCache["option_default_tab"];
    if (option_default_tab !== null) {
      let tabId = "";
      if (option_default_tab === 99 || option_default_tab === "99") {
        tabId = _storageCache["last_click_tab"];
      } else {
        let tmpList = {1:"summary", 2:"headlines", 3:"structured-datachk", 4:"imgchk", 5:"socialchk", 6:"toolchk"};
        tabId = tmpList[option_default_tab];
      }
      if (isNotEmpty(tabId)) {
        $("#" + tabId).prop("checked", true);
      }
    }
  }
  function updatePageInfoHtml() {
    let html = _pageData.sumTabHtml;
    html = html + "<hr>";
    let $jsonLdList = $("#json-ld_list");
    let $microdataList = $("#microdata_list");
    let $rdfaList = $("#rdfa_list");
    let $img_content_list = $("#img_content_list");
    let $social_content_list = $("#social_content_list");
    let $tool_content_list = $("#tool_content_list");
    $("#base_info_contents").html(html);
    $("#headlines_list").html(_pageData.headersTabHtml);
    $jsonLdList.html(_pageData.jsonLdTabHtml);
    $microdataList.html(_pageData.microdataTabHtml);
    $rdfaList.html(_pageData.rdfaTabHtml);
    $social_content_list.html(_pageData.socialTabHtml);
    $tool_content_list.html(_pageData.toolTabHtml);
    if (_pageData.imgTabHtml !== "") {
      $img_content_list.html(_pageData.imgTabHtml);
    }
    $("#tab-counter-headline").html(genTabCountBadge(_pageData.tabHeadlineCnt));
    $("#tab-counter-structured-data").html(genTabCountBadge(_pageData.tabJsonLdCnt + _pageData.tabMicrodataCnt + _pageData.tabRdfaCnt));
    $("#tab-counter-social").html(genTabCountBadge(_pageData.tabSocialCnt));
    let genSubTabBtn = function(itemId, itemName, count) {
      let countBadge = genSubTabCountBadge(count);
      let subBtnInnerTxt = '<span class="btn-social-flat-text">' + itemName + "</span>" + countBadge;
      let $subTabBtnHtml = $("#" + itemId);
      if (count <= 0) {
        $subTabBtnHtml.addClass("disable");
      }
      $subTabBtnHtml.html(subBtnInnerTxt);
    };
    genSubTabBtn("subTab_jsonld", "JSON-LD", _pageData.tabJsonLdCnt);
    genSubTabBtn("subTab_microdata", "Microdata", _pageData.tabMicrodataCnt);
    genSubTabBtn("subTab_rdfa", "RDFa", _pageData.tabRdfaCnt);
    let subBtnDefaultChecked = function(jsonLdCnt, microdataCnt, rdfaCnt) {
      let checkedId = "structured-jsonld";
      if (jsonLdCnt > 0) {
        checkedId = "structured-jsonld";
      } else if (microdataCnt > 0) {
        checkedId = "structured-microdata";
      } else if (rdfaCnt > 0) {
        checkedId = "structured-rdfa";
      }
      $("input#" + checkedId).prop("checked", true);
    };
    subBtnDefaultChecked(_pageData.tabJsonLdCnt, _pageData.tabMicrodataCnt, _pageData.tabRdfaCnt);
    if (_pageData.tabHeadlineCnt < 1) {
      $("#headlines_content > div.headlines_head_btns > .dataNoneHidden").css("visibility", "hidden");
    }
    if (_pageData.tabJsonLdCnt < 1) {
      $("#jsonldchk_content > div.headlines_head_btns > .dataNoneHidden").css("visibility", "hidden");
      $jsonLdList.html("<div><span class=''>JSON-LD " + l("m_isMissing") + "</span></div>");
    }
    if (_pageData.tabMicrodataCnt < 1) {
      $("#microdatachk_content > div.headlines_head_btns > .dataNoneHidden").css("visibility", "hidden");
      $microdataList.html("<div><span class=''>Microdata " + l("m_isMissing") + "</span></div>");
    }
    if (_pageData.tabRdfaCnt < 1) {
      $("#RDFachk_content > div.headlines_head_btns > .dataNoneHidden").css("visibility", "hidden");
      $rdfaList.html("<div><span class=''>RDFa " + l("m_isMissing") + "</span></div>");
    }
  }
  function imgTabContentsUpdate(imgTabHtml) {
    let $img_content_list = $("#img_content_list");
    $img_content_list.html(imgTabHtml);
  }
  function updateMainProgressBar(progressPer) {
    $(".mainProgressBar").each(function(i, v) {
      $(this).val(progressPer);
    });
  }
  function setUpTippy() {
    tippy(".tippy", {content:"Loading...", onShow(instance) {
      let $tag = $(instance.reference);
      let tpyTitle = $tag.data("tpy-title");
      let tpyImgSrc = $tag.data("tpy-img-src");
      if (tpyImgSrc !== undefined) {
        let contents = "<img src='" + tpyImgSrc + "' alt='' class='tippyImg' />";
        instance.setContent(contents);
        instance.setProps({theme:"tippyImgTheme"});
      } else {
        instance.setContent(tpyTitle + "");
      }
    }, allowHTML:true});
  }
  function genTabCountBadge(cnt) {
    let noneClass = "";
    if (cnt < 1) {
      noneClass = " none";
    }
    return ' <span class="m-badge' + noneClass + '">' + cnt + "</span>";
  }
  function genSubTabCountBadge(cnt) {
    if (cnt < 1) {
      return "";
    }
    let noneClass = "";
    return ' <span class="m-badge sub ' + noneClass + '">' + cnt + "</span>";
  }
  function isChromeUndefined() {
    return typeof chrome === "undefined";
  }
  function isExtension() {
    if (isChromeUndefined()) {
      return true;
    }
    if (chrome.runtime === undefined) {
      return true;
    }
    return false;
  }
  function bw() {
    if (isFireFox()) {
      return browser;
    } else {
      return chrome;
    }
  }
  function browserChromeTabs() {
    if (t.isV3()) {
      return chrome.scripting;
    } else {
      return bw().tabs;
    }
  }
  function logging(...log) {
    if (isExt === undefined || isExt) {
      console.log(log);
    } else {
      bw().runtime.sendMessage({action:"logging", log:log}, function(response) {
      });
    }
  }
  function loadToolCnt(callback) {
    _toolCnts = {};
    if (isExt === undefined || isExt) {
      _toolCnts = {};
      callback();
    } else {
      bw().runtime.sendMessage({action:"getToolCnt"}, function(response) {
        _toolCnts = response.resData;
        callback();
      });
    }
  }
  function setPageCache(page, tabId, data) {
    if (isExt === undefined || isExt) {
      return;
    }
    bw().runtime.sendMessage({action:"saveLog", page:page, cacheData:data}, function(response) {
    });
  }
  function sendContents(page, tabId, data) {
    let send_data = {sendTo:"ct", action:"new_saveLog", page:page, cacheData:data};
    chrome.tabs.sendMessage(tabId, send_data, receive => {
    });
  }
  function getManifestVer() {
    if (_manifestData === null) {
      _manifestData = chrome.runtime.getManifest();
    }
    return _manifestData.manifest_version;
  }
  function afterInitCache(storageCache) {
    _storageCache = storageCache;
    setDefaultTab();
    loadToolCnt(function() {
      _buildPopupDisplay(false);
    });
  }
  function execCopyForArray(arr) {
    if (arr.length > 0) {
      let copyTxt = arr.join("\n");
      execCopyTextarea(copyTxt);
    }
  }
  function execCopyTextarea(string) {
    let clipboard = $("<textarea></textarea>");
    clipboard.val(string);
    $("body").append(clipboard);
    clipboard.select();
    document.execCommand("copy");
    clipboard.remove();
  }
  function genHeadlinesTabCopyList(indentStr = "  ", markdownListStyle = "", copyFormat = "", isHeadTagName = false) {
    let copyTxtArr = [];
    let copyTxt = "";
    if (markdownListStyle === "*") {
      indentStr = "  ";
    }
    $(".headline-item").each(function() {
      let headlines = $(this).find(".headline");
      if (headlines.length > 0) {
        let $headline = $(headlines[0]);
        let headlineNum = $headline.data("h-num");
        let tabs = "";
        let addListStyle = "";
        let tagName = "";
        if (isHeadTagName) {
          tagName = "H" + headlineNum + " | ";
        }
        if (copyFormat === "markdown") {
          if (markdownListStyle !== "") {
            addListStyle = addListStyle + markdownListStyle;
          }
        }
        for (let loopIndex = 1; loopIndex < headlineNum; ++loopIndex) {
          tabs = tabs + indentStr;
          if (copyFormat === "markdown") {
            if (markdownListStyle === "#") {
              addListStyle = addListStyle + markdownListStyle;
            }
          }
        }
        if (markdownListStyle !== "") {
          addListStyle = addListStyle + " ";
        }
        copyTxtArr.push(tabs + addListStyle + tagName + $headline.text());
      }
    });
    return copyTxtArr;
  }
  function genBaseTabCopyList(indentStr = "  ", listType = "") {
    let copyTxtArr = [];
    let copyTxt = "";
    if (listType !== "") {
      listType = listType + " ";
    }
    $("#base_info_contents .sum-info-item").each(function() {
      let title = $(this).find(".title");
      let descs = $(this).find(".desc");
      let extInfos = $(this).find(".ext-info");
      let desc = "";
      let extInfo = "";
      if (descs.length > 0) {
        desc = $(descs[0]).text().trim();
      }
      if (extInfos.length > 0) {
        extInfo = $(extInfos[0]).text().trim();
      }
      if (title.length > 0) {
        title = $(title[0]).text().trim();
        copyTxtArr.push(listType + title);
        copyTxtArr.push(indentStr + listType + desc);
        if (extInfo !== "") {
          copyTxtArr.push(indentStr + listType + extInfo);
        }
      }
    });
    return copyTxtArr;
  }
  function closeAllDropDownMenu() {
    if (!isDropDownMenuOpen) {
      return true;
    }
    $(".dropdown_menu").each(function(i, v) {
      if ($(this).css("display") !== "none") {
        $(this).toggle();
      }
    });
    isDropDownMenuOpen = false;
  }
  function getExternalLinkContents() {
    return t.getExternalLinkContents(null, "external");
  }
  function openNewTab(text) {
    let url = URL.createObjectURL(new Blob([text], {type:"text/plain"}));
    let myWindow = window.open(url, "_blank");
  }
  function openUrlNewTab(url) {
    let myWindow = window.open(url, "_blank");
  }
  function reverseJsonToString(json, space = "") {
    return t.reverseJsonToString(json, space);
  }
  function getJsonLdData(seqNum) {
    let data = "";
    $(_pageData._jsonLd).each(function(i, jsonInfo) {
      if (jsonInfo.seqNum === seqNum) {
        data = jsonInfo;
        return false;
      }
    });
    return data;
  }
  const t = Util();
  var _pageData;
  let _currentPageUrl = "";
  var isChromeBrowser = false;
  var isFireFoxBrowser = true;
  if (navigator.userAgent.indexOf("Chrome") !== -1) {
    isChromeBrowser = true;
    isFireFoxBrowser = false;
  }
  let _storageCache = {};
  const initStorageCache = function() {
    return getAllStorageSyncData().then(items => {
      Object.assign(_storageCache, items);
      afterInitCache();
    });
  };
  let isNotEmpty = function(data) {
    return data !== "" && data !== undefined && data !== "undefined" && data !== null;
  };
  let pageLoadCnt = 0;
  let firstLoadJs = true;
  var isExt = isExtension();
  let _buildPopupDisplay = function(isRefresh) {
  };
  if (!isChromeUndefined() && !isExt) {
    let generatePage = () => {
      updatePageInfoHtml();
      setUpTippy();
    };
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === "barUpdate") {
        if (request.target !== undefined && request.target === "p") {
          updateMainProgressBar(request.barVal);
        }
        return;
      }
      if (request.action === "h1to6Index") {
        sendResponse({action:"h1to6Index", h1to6Index:h1to6Index});
        return;
      }
      if (request.action === "imgDelayChecked") {
        if (request.target !== undefined && request.target === "p") {
          let imgTabHtml = request.imgTabHtml;
          _pageData.imgTabHtml = imgTabHtml;
          imgTabContentsUpdate(imgTabHtml);
          setPageCache(_currentPageUrl, request.tabId, _pageData);
          sendResponse({action:"imgDelayChecked_res", page:_currentPageUrl});
        }
        return;
      }
      if (request.action !== "pagelog") {
        return;
      }
      pageLoadCnt++;
      if (pageLoadCnt > 1) {
        return;
      }
      _pageData = request.data;
      setPageCache(_currentPageUrl, request.tabId, request.data);
      generatePage();
    });
    _buildPopupDisplay = function(isRefresh) {
      function executeScripts(tabId, injectDetailsArray, lastCallback) {
        function getCallback(tabId, injectDetails, innerCallback) {
          return () => {
            browserChromeTabs().executeScript(tabId, injectDetails, innerCallback);
          };
        }
        let callback = lastCallback;
        for (let i = injectDetailsArray.length - 1; i >= 0; --i) {
          callback = getCallback(tabId, injectDetailsArray[i], callback);
        }
        callback && callback();
      }
      function tmpCallBack(tabId) {
        return () => {
        };
      }
      const startMainJs = () => {
        chrome.windows.getCurrent(function(currentWindow) {
          chrome.tabs.query({active:true, windowId:currentWindow.id}, function(activeTabs) {
            let tabId = activeTabs[0].id;
            let addJsFilePath = "";
            if (isFireFox()) {
              addJsFilePath = "../";
            }
            let scripts = [{file:addJsFilePath + "plugin/jquery.js"}, {file:addJsFilePath + "plugin/purl.js"}, {file:addJsFilePath + "plugin/ExifReader/exif-reader.js"}, {file:addJsFilePath + "rep/g.js"}, {file:addJsFilePath + "js/util.js"}, {file:addJsFilePath + "js/main.js"}];
            if (!firstLoadJs) {
              scripts = scripts.filter(script => {
                return script.file !== addJsFilePath + "js/util.js" && script.file !== addJsFilePath + "rep/g.js";
              });
            }
            scripts && t.executeScripts(tabId, scripts, tmpCallBack(tabId));
            firstLoadJs = false;
          });
        });
      };
      if (!isRefresh) {
        isRefresh = !isPageCacheUse();
      }
      const imgTagEmpty = cData => {
        return cData.imgTabHtml === undefined || cData.imgTabHtml === "";
      };
      chrome.tabs.query({"active":true, "lastFocusedWindow":true}, tabs => {
        _currentPageUrl = tabs[0].url;
        if (isRefresh) {
          startMainJs();
          return;
        }
        bw().runtime.sendMessage({action:"getCache", page:_currentPageUrl}, function(response) {
          if (response.resData === undefined || response.resData === "" || imgTagEmpty(response.resData)) {
            startMainJs();
          } else {
            _pageData = response.resData;
            generatePage();
          }
        });
        let send_data = {sendTo:"ct", action:"new_getCache", page:_currentPageUrl};
      });
    };
  }
  let _toolCnts = {};
  let _manifestData = null;
  const getManifestData = data => {
    if (isExt) {
      return "0.0";
    }
    return t.getManifestData(data);
  };
  $(document).ready(function() {
    if (!isExt) {
      clearHtml();
    }
    assignMessages();
    t.initStorageCache(afterInitCache);
  });
  $(document).on("click", ".copyBtnBasic", function() {
    let target = $(this).data("target");
    let copyTxtArr = [];
    let copyTxt = "";
    let tabStr = "\t";
    tabStr = "  ";
    if (target === "headlines") {
      copyTxtArr = genHeadlinesTabCopyList();
    } else if (target === "baseInfo") {
      copyTxtArr = genBaseTabCopyList();
    } else if (target === "jsonLdInfo") {
      $("#json-ld_list .sum-info-item").each(function() {
        let titles = $(this).find(".title");
        let title = "";
        let descs = $(this).find(".desc");
        let desc = "";
        if (titles.length > 0) {
          title = $(titles[0]).text().trim();
          copyTxtArr.push(title);
        }
        if (descs.length > 0) {
          desc = $(descs[0]).text().trim();
          copyTxtArr.push(tabStr + desc);
        }
      });
    }
    execCopyForArray(copyTxtArr);
  });
  $(document).on("change", "input.tabChange", function() {
    if (index => {
      return 0;
    }) {
      ++pageLoadCnt;
    }
    t.onClickMainTab(this, null);
    _storageCache["last_click_tab"] = $(this).attr("id");
  });
  $(document).on("click", ".tab_item", function() {
    let forVal = $(this).attr("for");
    t.pEv({action:"sendEvent", message:"tab", type:"p-" + forVal + ""});
  });
  $(document).on("click", ".readmore-btn", function() {
    let btnLabel = $(this).data("btn");
    if (btnLabel === undefined) {
      btnLabel = "";
    }
    if (btnLabel === "") {
      return;
    }
  });
  let moovedList = {};
  $(document).on("mouseenter", ".moov", function() {
    let moovId = $(this).attr("id");
    if (moovId === undefined) {
      return;
    } else if (moovId === "") {
      return;
    }
    if (moovedList[moovId] !== undefined) {
      return;
    }
    moovedList[moovId] = moovId;
  });
  let isDropDownMenuOpen = false;
  $(document).on("click", ".compact_btn.doropmenu", function(event) {
    isDropDownMenuOpen = true;
    let find = $(this).parent().find(".dropdown_menu");
    find.toggle();
    let drpMenuId = find.find("ul").attr("id");
  });
  $(document).on("click", "#base_dmenu > li", function() {
    let listType = $(this).data("list-type");
    let copyFormat = $(this).data("copy-format");
    let tagName = $(this).data("tag-name");
    let target = $(this).data("target");
    let indentStr = $(this).data("list-indent");
    let dataList = [];
    let copyTxtArr = [];
    let copyTxt = "";
    let $readmore = $("#readmore-check-1 .links-item");
    if (target === "all") {
      indentStr = "  ";
      listType = "";
    }
    copyTxtArr = genBaseTabCopyList(indentStr, listType);
    if (target === "all") {
      $(["rm-all-styleSheets", "rm-all-links", "rm-all-scripts", "rm-all-metass"]).each(function(i, rootId) {
        let itemClass = "links";
        switch(rootId) {
          case "rm-all-scripts":
            itemClass = "script";
            break;
          case "rm-all-metass":
            itemClass = "meta";
            break;
          default:
            break;
        }
        copyTxtArr.push("");
        let ctTitle = $("#" + rootId + " .contents-title")[0];
        ctTitle = $(ctTitle).text().trim();
        copyTxtArr.push(ctTitle);
        $("#" + rootId + " ." + itemClass + "-item").each(function(i, val) {
          let title = $($(val).find(".title")[0]).text().trim();
          let desc = $($(val).find(".desc")[0]).text().trim();
          if ($(val).find(".desc a").length > 0) {
            desc = $($(val).find(".desc a")[0]).attr("href");
          }
          let item = title + "\t" + desc;
          copyTxtArr.push(item);
        });
      });
      let inPageLinkCopyTxtArr = t.getInPageLinkContents(null, "inPage");
      if (inPageLinkCopyTxtArr.length > 0) {
        copyTxtArr = copyTxtArr.concat(inPageLinkCopyTxtArr);
      }
      let internalLinkCopyTxtArr = t.getExternalLinkContents(null, "internal");
      if (internalLinkCopyTxtArr.length > 0) {
        copyTxtArr = copyTxtArr.concat(internalLinkCopyTxtArr);
      }
      let extLinkCopyTxtArr = getExternalLinkContents();
      if (extLinkCopyTxtArr.length > 0) {
        copyTxtArr = copyTxtArr.concat(extLinkCopyTxtArr);
      }
    }
    execCopyForArray(copyTxtArr);
  });
  $(document).on("click", "#headline_dmenu > li", function() {
    let listType = $(this).data("list-type");
    let copyFormat = $(this).data("copy-format");
    let tagName = $(this).data("tag-name");
    let indentStr = $(this).data("list-indent");
    let dataList = [];
    if (indentStr === undefined) {
      indentStr = "";
    } else if (indentStr === "space") {
      indentStr = "  ";
    } else if (indentStr === "tab") {
      indentStr = "\t";
    }
    let copyTxtArr = [];
    let copyTxt = "";
    let isHeadTagName = tagName === "head";
    copyTxtArr = genHeadlinesTabCopyList(indentStr, listType, copyFormat, isHeadTagName);
    execCopyForArray(copyTxtArr);
  });
  $(document).on("click", "#jsonld_dmenu > li", function() {
    if (_pageData === undefined) {
      return true;
    }
    if (_pageData._jsonLd === undefined) {
      return true;
    }
    let target = $(this).data("target");
    let copyFormat = $(this).data("copy-format");
    let dataList = [];
    if (target === "all" && copyFormat === "json-ld") {
      $(_pageData._jsonLd).each(function(i, jsonInfo) {
        let rawData = jsonInfo.rawData;
        dataList.push(rawData);
      });
      if (dataList.length < 1) {
        return true;
      }
      let rawDataTxt = reverseJsonToString(dataList, "\t");
      rawDataTxt = '<script type="application/ld+json">' + "\n" + rawDataTxt + "\n";
      rawDataTxt = rawDataTxt + "\x3c/script>\n";
      execCopyTextarea(rawDataTxt);
    }
  });
  $(document).click(function(event) {
    if ($(event.target).hasClass("compact_btn")) {
      return true;
    }
    closeAllDropDownMenu();
  });
  $(document).on("click", ".mini-act-btn", function(event) {
    t.onClickMiniActBtn(this);
  });
  let h1to6Index = 0;
  let isInsertCss = false;
  $(document).on("click", ".move_hl", function() {
    let parent1 = $(this).parent().find(".headline").html();
    h1to6Index = $(this).data("index");
    if (isExt === undefined || isExt) {
    } else {
      chrome.windows.getCurrent(function(currentWindow) {
        chrome.tabs.query({active:true, windowId:currentWindow.id}, function(activeTabs) {
          let addJsFilePath = "";
          if (isFireFox()) {
            addJsFilePath = "../";
          }
          let myconfig = {h1to6Index:h1to6Index};
          if (!isInsertCss) {
            t.insertCssFile(activeTabs[0].id, {file:addJsFilePath + "css/style.css"});
            isInsertCss = true;
          }
          let scripts = [{file:addJsFilePath + "js/scroll.js"}];
          if (t.isV3()) {
            t.executeScripts(activeTabs[0].id, scripts, function() {
            });
          } else {
            browserChromeTabs().executeScript(activeTabs[0].id, {code:"var config = " + JSON.stringify(myconfig)}, () => {
              t.executeScripts(activeTabs[0].id, scripts, function() {
              });
            });
          }
        });
      });
    }
  });
  $(document).on("click", ".info-refresh", function() {
    let btnLabel = $(this).data("btn");
    if (btnLabel === undefined) {
      btnLabel = "";
    }
    closeAllDropDownMenu();
    clearHtml();
    pageLoadCnt = 0;
    _buildPopupDisplay(true);
  });
  $(document).on("click", ".toolsBtn", function() {
    let toolId = $(this).data("tool-id");
    if (toolId === undefined || toolId === "" || toolId === "0") {
      return;
    }
    let btnTxt = $(this).text();
    let sndType = toolId + "-" + btnTxt;
    sndType = ("000" + toolId).slice(-4) + "-" + btnTxt;
    bw().runtime.sendMessage({action:"FavoriteTool", toolId:toolId}, function(response) {
    });
  });
});

