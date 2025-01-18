(function() {
  $(function() {
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
    function getManifestVer() {
      if (isEmpty(_manifestData)) {
        _manifestData = chrome.runtime.getManifest();
      }
      return _manifestData.manifest_version;
    }
    function addMetaBtnTagHtml(metaName) {
      if (isEmpty(metaName)) {
        return metaName;
      }
      let defaultTagClass = "meta-tag";
      let metaTypeList = ["og", "robots", "charset", "twitter", "viewport", "theme-color", "http-equiv", "facebook", "fb", "al", "pubdate", "google-site-verification", "msapplication", "article", "format-detection", "generator", "thumbnail", "author", "copyright", "apple-mobile-web-app", "referrer", "color-scheme", "itemprop"];
      let metaNameLow = metaName.toLowerCase();
      $(metaTypeList).each(function(i, metaType) {
        if (isEmpty(metaType)) {
          return true;
        }
        if (metaNameLow.indexOf(metaType + "") === 0) {
          let metaClass = metaType.replaceAll(":", "-");
          metaName = metaNameLow.replace(metaType, "<span class='" + defaultTagClass + " " + metaClass + "'>" + metaType + "</span>");
          return false;
        }
      });
      return metaName;
    }
    async function func_start() {
      let p_run_sync_main = 1;
      let run_sync_main_methodCnt = 14;
      let waits = [];
      addProgressTotalCnt(p_run_sync_main + run_sync_main_methodCnt);
      let tmp = t.initStorageCache();
      waits.push(tmp);
      await Promise.all(waits);
      waits = [];
      let webVitals = getWebVitals();
      waits.push(webVitals);
      calculate_load_times_v2_sync();
      await Promise.all(waits);
      run_sync_main();
      addProgressCnt(p_run_sync_main);
    }
    function run_sync_main() {
      readmoreCnt = 0;
      _seqNumCnt = 0;
      collectJsonLdInfo();
      addProgressCnt();
      collectMicroData();
      addProgressCnt();
      collectRDFaData();
      addProgressCnt();
      speedCheck();
      addProgressCnt();
      resourceCheck();
      addProgressCnt();
      checkCms();
      addProgressCnt();
      initSummaryTab();
      addProgressCnt();
      getHeadlinesDetail();
      addProgressCnt();
      initJsonTab();
      addProgressCnt();
      initMicrodataTab();
      addProgressCnt();
      initRdfaTab();
      addProgressCnt();
      initImagesTab();
      addProgressCnt();
      initSocialTab();
      addProgressCnt();
      initToolTab();
      addProgressCnt();
      sendPageData();
      resultAnalytics();
    }
    function genSeqNum() {
      ++_seqNumCnt;
      return _seqNumCnt;
    }
    function speedCheck() {
      let timing = window.performance.timing;
      let infoList = {};
      let pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      infoList["other"] = timing.domainLookupStart - timing.navigationStart;
      infoList["dns"] = timing.domainLookupEnd - timing.domainLookupStart;
      infoList["tcp"] = timing.connectEnd - timing.connectStart;
      infoList["http"] = timing.responseEnd - timing.requestStart;
      infoList["dom"] = timing.domComplete - timing.domInteractive;
      infoList["load"] = timing.loadEventEnd - timing.loadEventStart;
      infoList["pageLoadTime"] = pageLoadTime;
      infoList["other_logic"] = "domainLookupStart - navigationStart";
      infoList["dns_logic"] = "domainLookupEnd - domainLookupStart";
      infoList["tcp_logic"] = "connectEnd - connectStart";
      infoList["http_logic"] = "responseEnd - requestStart";
      infoList["dom_logic"] = "domComplete - domInteractive";
      infoList["load_logic"] = "loadEventEnd - loadEventStart";
      infoList["pageLoadTime_logic"] = "loadEventEnd - navigationStart";
      _pageSpeedList = infoList;
    }
    function genSpeedListTable() {
      let blockHtml = "";
      let unit = l("mili_sec");
      blockHtml = blockHtml + "<table class='speedTable'>";
      blockHtml = blockHtml + ("<tr class='header'>" + "<th>Title</th><th>Time (ms)</th><th></th>" + "</tr>");
      let list = ["other", "dns", "tcp", "http", "dom", "load", "pageLoadTime"];
      for (let i = 0; i < list.length; i++) {
        let name = list[i];
        let logicStr = _pageSpeedList[name + "_logic"];
        let descStr = l("pagespeed_desc_" + name);
        let infoBtn = getTippyMouseOverInfoBtn("", logicStr);
        blockHtml = blockHtml + ("<tr>" + "<th class='title'>" + l("speed_" + name) + "</th>" + "<td class='val'>" + _pageSpeedList[name].toLocaleString() + " " + unit + "</td>" + "<td>" + infoBtn + " " + descStr + "</td>" + "</tr>");
      }
      blockHtml = blockHtml + "</table>";
      blockHtml = "<div class='speedTableWrap'>" + blockHtml + "</div>";
      blockHtml = blockHtml + ("" + '<div class="tab-footer">\n' + '<a href="https://w3c.github.io/navigation-timing/#processing-model" target="_blank" rel="noopener noreferrer" ><span >W3C Dpc</span></a> | <a href="https://developer.mozilla.org/docs/Web/API/Navigation_timing_API" target="_blank" rel="noopener noreferrer" ><span >MDN Doc</span></a>\n' + "</div>\n" + "");
      return blockHtml;
    }
    function calcTotalDomCount() {
      if (isNotEmpty(totalElementsCnt)) {
        return totalElementsCnt;
      }
      let bodyInnerTags = $("body *").children().length;
      totalElementsCnt = bodyInnerTags;
      return bodyInnerTags;
    }
    function resourceCheck() {
    }
    function calculate_load_times_v2_sync() {
      const results = [];
      let urls = [];
      _resource_fetch_map = {};
      _img_metadata_map = {};
      let setResFetchData = function() {
        return {name:"", encodedBodySize:0, resource:null, contentType:"", fetch:null, blobSize:0, width:0, height:0, time:null};
      };
      let itemCounter = {inRes:0, inImgTag:0, inDataSrc:0, fetchOk:0, fetchNg:0};
      let resources = performance.getEntriesByType("resource");
      for (let i = 0; i < resources.length; i++) {
        if (resources[i].initiatorType !== "img") {
          continue;
        }
        let resource = resources[i];
        let fileName = resource.name;
        let encodedBodySize = resource.encodedBodySize;
        if (_resource_fetch_map[fileName] !== undefined) {
          continue;
        }
        ++itemCounter.inRes;
        urls.push(fileName);
        _resource_fetch_map[fileName] = setResFetchData();
        _resource_fetch_map[fileName].name = fileName;
        _resource_fetch_map[fileName].encodedBodySize = encodedBodySize;
        _resource_fetch_map[fileName].resource = resource;
        let time = {};
        time.total = resource.startTime > 0 ? resource.responseEnd - resource.startTime : 0;
        time.redirect = resource.redirectEnd - resource.redirectStart;
        time.redirectLogic = "redirectEnd - redirectStart";
        time.redirectToFetchStart = resource.fetchStart - resource.redirectEnd;
        time.redirectToDomainLookupStart = resource.domainLookupStart - resource.redirectEnd;
        time.redirectToDomainLookupStartLogic = "domainLookupStart - redirectEnd";
        time.isAppCache = false;
        if (resource.fetchStart === resource.domainLookupStart && resource.fetchStart === resource.domainLookupEnd && resource.domainLookupEnd === resource.connectStart) {
          time.isAppCache = true;
        }
        time.dns = resource.domainLookupEnd - resource.domainLookupStart;
        time.dnsLogic = "domainLookupEnd - domainLookupStart";
        time.dnsToTcp = resource.connectStart - resource.domainLookupEnd;
        time.dnsToTcpLogic = "connectStart - domainLookupEnd";
        time.tcp = resource.connectEnd - resource.connectStart;
        time.tcpLogic = "connectEnd - connectStart";
        time.tcpToRequest = resource.requestStart - resource.connectEnd;
        time.tcpToRequestLogic = "requestStart - connectEnd";
        time.request = resource.responseStart - resource.requestStart;
        time.requestLogic = "responseStart - requestStart";
        time.response = resource.responseEnd - resource.responseStart;
        time.responseLogic = "responseEnd - responseStart";
        time.isIgnoreSlow = resource.responseStart === 0;
        time.total = resource.responseEnd - resource.startTime;
        time.totalLogic = "responseEnd - startTime";
        time.total = resource.responseEnd - resource.redirectStart;
        time.requestResponse = resource.responseEnd - resource.requestStart;
        time.requestResponseLogic = "responseEnd - requestStart";
        time.FetchUntilResponseEnd = resource.responseEnd - resource.fetchStart;
        _resource_fetch_map[fileName].time = time;
      }
      let get = function(url) {
        const headers = {"method":"GET", "mode":"no-cors", headers:{"Accept":"image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"}};
        return fetch(url, headers).then(response => {
          if (response.ok === false) {
            _resource_fetch_map[url].fetch = response;
            ++itemCounter.fetchNg;
          } else {
            ++itemCounter.fetchOk;
            let contentType = response.headers.get("content-type");
            contentType = contentType.replace("image/", "");
            _resource_fetch_map[url].contentType = contentType;
            _resource_fetch_map[url].fetch = response;
            return response.blob();
          }
        }).then(myBlob => {
          let blobSize = 0;
          if (myBlob !== undefined) {
            blobSize = myBlob.size;
            _resource_fetch_map[url].blobSize = blobSize;
            return createImageBitmap(myBlob);
          }
        }).then(bitmap => {
          if (bitmap !== undefined) {
            _resource_fetch_map[url].width = bitmap.width;
            _resource_fetch_map[url].height = bitmap.height;
          }
        }).then(data => {
          addProgressCnt();
        }).catch(error => {
          addProgressCnt();
        });
      };
      getImgTags().each(function() {
        let src = $(this).attr("src");
        if (isEmpty(src)) {
          return true;
        }
        if (src.indexOf("data:image/") === 0) {
          return true;
        }
        src = adjustUrlPath(src);
        let dataSrc = $(this).attr("data-src");
        if (isEmpty(dataSrc)) {
          dataSrc = "";
        } else {
        }
        let fileName = src;
        if (isNotEmpty(dataSrc)) {
          if (_resource_fetch_map[dataSrc] === undefined) {
            ++itemCounter.inDataSrc;
            urls.push(dataSrc);
            _resource_fetch_map[dataSrc] = setResFetchData();
            _resource_fetch_map[dataSrc].name = dataSrc;
          }
        }
        if (_resource_fetch_map[fileName] !== undefined) {
          return true;
        }
        ++itemCounter.inImgTag;
        urls.push(fileName);
        _resource_fetch_map[fileName] = setResFetchData();
        _resource_fetch_map[fileName].name = fileName;
      });
      let fn = urls => {
        return Promise.all(urls.map(get));
      };
      addProgressTotalCnt(urls.length);
      let getImgMeta = function(data) {
        let getMetaVal = function(metaKey, valKey) {
          let metadata = data[metaKey];
          if (metadata === undefined) {
            return null;
          }
          if (isEmpty(metadata[valKey])) {
            return null;
          }
          return metadata[valKey]["description"];
        };
        return {exif:{artist:getMetaVal("exif", "Artist"), copyright:getMetaVal("exif", "Copyright")}, xmp:{xmp_creator:getMetaVal("xmp", "creator"), xmp_credit:getMetaVal("xmp", "Credit"), xmp_right:getMetaVal("xmp", "rights")}, iptc:{iptc_byLine:getMetaVal("iptc", "By-line"), iptc_credit:getMetaVal("iptc", "Credit"), iptc_copyrightnotice:getMetaVal("iptc", "Copyright Notice")}};
      };
      let isExistImgRights = function(data, metaKey) {
        if (data === null) {
          return false;
        }
        if (metaKey === "exif") {
          return ["Artist", "Copyright"].find(function(valKey) {
            if (data[valKey] === undefined) {
              return false;
            }
            return isNotEmpty(data[valKey]);
          });
        }
        if (metaKey === "xmp") {
          return ["creator", "Credit", "rights"].find(function(valKey) {
            if (data[valKey] === undefined) {
              return false;
            }
            return isNotEmpty(data[valKey]);
          });
        }
        if (metaKey === "iptc") {
          return ["By-line", "Credit", "Copyright Notice"].find(function(valKey) {
            if (data[valKey] === undefined) {
              return false;
            }
            return isNotEmpty(data[valKey]);
          });
        }
        return false;
      };
      let getExif = function(url) {
        _img_metadata_map[url] = null;
        return ExifReader.load(url, {expanded:true}).then(data => {
          let isFind = ["exif", "xmp", "iptc"].find(val => {
            let metadata = null;
            if (data[val] !== undefined) {
              metadata = data[val];
            }
            if (metadata === null) {
              return false;
            }
            return isExistImgRights(metadata, val);
          });
          if (isNotEmpty(isFind)) {
            _img_metadata_map[url] = getImgMeta(data);
          }
        }).catch(error => {
        });
      };
      const _sleepTest = ms => {
        return new Promise(resolve => {
          return setTimeout(resolve, ms);
        });
      };
      let loadFileExif = urls => {
        return Promise.all(urls.map(getExif));
      };
      calculate_load_times_delay_send(urls);
    }
    async function calculate_load_times_delay_main(urls) {
      const _sleepTest = ms => {
        return new Promise(resolve => {
          return setTimeout(resolve, ms);
        });
      };
      let itemCounter = {inRes:0, inImgTag:0, inDataSrc:0, fetchOk:0, fetchNg:0};
      let get = function(url) {
        const headers = {"method":"GET", "mode":"no-cors", headers:{"Accept":"image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"}};
        return fetch(url, headers).then(response => {
          if (response.ok === false) {
            _resource_fetch_map[url].fetch = response;
            ++itemCounter.fetchNg;
          } else {
            ++itemCounter.fetchOk;
            let contentType = response.headers.get("content-type");
            contentType = contentType.replace("image/", "");
            _resource_fetch_map[url].contentType = contentType;
            _resource_fetch_map[url].fetch = response;
            return response.blob();
          }
        }).then(myBlob => {
          let blobSize = 0;
          if (myBlob !== undefined) {
            blobSize = myBlob.size;
            _resource_fetch_map[url].blobSize = blobSize;
            return createImageBitmap(myBlob);
          }
        }).then(bitmap => {
          if (bitmap !== undefined) {
            _resource_fetch_map[url].width = bitmap.width;
            _resource_fetch_map[url].height = bitmap.height;
          }
        }).then(data => {
          addProgressCnt();
        }).catch(error => {
          console.log("----- error ---", error);
          addProgressCnt();
        });
      };
      let fn = urls => {
        return Promise.all(urls.map(get));
      };
      addProgressTotalCnt(urls.length);
      let getImgMeta = function(data) {
        let getMetaVal = function(metaKey, valKey) {
          let metadata = data[metaKey];
          if (metadata === undefined) {
            return null;
          }
          if (isEmpty(metadata[valKey])) {
            return null;
          }
          return metadata[valKey]["description"];
        };
        return {exif:{artist:getMetaVal("exif", "Artist"), copyright:getMetaVal("exif", "Copyright")}, xmp:{xmp_creator:getMetaVal("xmp", "creator"), xmp_credit:getMetaVal("xmp", "Credit"), xmp_right:getMetaVal("xmp", "rights")}, iptc:{iptc_byLine:getMetaVal("iptc", "By-line"), iptc_credit:getMetaVal("iptc", "Credit"), iptc_copyrightnotice:getMetaVal("iptc", "Copyright Notice")}};
      };
      let isExistImgRights = function(data, metaKey) {
        if (data === null) {
          return false;
        }
        if (metaKey === "exif") {
          return ["Artist", "Copyright"].find(function(valKey) {
            if (data[valKey] === undefined) {
              return false;
            }
            return isNotEmpty(data[valKey]);
          });
        }
        if (metaKey === "xmp") {
          return ["creator", "Credit", "rights"].find(function(valKey) {
            if (data[valKey] === undefined) {
              return false;
            }
            return isNotEmpty(data[valKey]);
          });
        }
        if (metaKey === "iptc") {
          return ["By-line", "Credit", "Copyright Notice"].find(function(valKey) {
            if (data[valKey] === undefined) {
              return false;
            }
            return isNotEmpty(data[valKey]);
          });
        }
        return false;
      };
      let getExif = function(url) {
        _img_metadata_map[url] = null;
        return ExifReader.load(url, {expanded:true}).then(data => {
          let isFind = ["exif", "xmp", "iptc"].find(val => {
            let metadata = null;
            if (data[val] !== undefined) {
              metadata = data[val];
            }
            if (metadata === null) {
              return false;
            }
            return isExistImgRights(metadata, val);
          });
          if (isNotEmpty(isFind)) {
            _img_metadata_map[url] = getImgMeta(data);
          }
        }).catch(error => {
        });
      };
      let loadFileExif = urls => {
        return Promise.all(urls.map(getExif));
      };
      loadFileExif(urls);
      return fn(urls);
    }
    async function sleep_test(urls) {
      const _sleepTest = ms => {
        return new Promise(resolve => {
          return setTimeout(resolve, ms);
        });
      };
      for (let i = 0; i < 6; i++) {
        await _sleepTest(1000 * 5);
        console.log("++++++++++++++++", "calculate_load_times_delay_send sleep", i);
      }
    }
    async function calculate_load_times_delay_send(urls) {
      await calculate_load_times_delay_main(urls);
      let outputHtml = initImagesTab();
      _pageInfo.imgTabHtml = outputHtml;
      let pageUrl = window.location.href;
      const act = "imgDelayChecked";
      sendMessage({action:act, val:999, tabId:_currentTabId, target:"b", imgTabHtml:outputHtml, page:pageUrl});
      sendMessage({action:act, val:999, tabId:_currentTabId, target:"p", imgTabHtml:outputHtml, page:pageUrl});
      sendMessage({action:act, val:999, tabId:_currentTabId, target:"s", imgTabHtml:outputHtml, page:pageUrl});
    }
    function addProgressTotalCnt(addVal = 1) {
      _progressTotalCnt = _progressTotalCnt + addVal;
      calcAndUpdateProgressBar();
    }
    function addProgressCnt(addVal = 1) {
      _progressCnt = _progressCnt + addVal;
      calcAndUpdateProgressBar();
    }
    function calcAndUpdateProgressBar() {
      let per = _progressCnt / _progressTotalCnt * 100;
      per = Math.round(per);
      sendProgressBarPer(per);
    }
    function getMetaContentByName(mn) {
      let returnContent = "";
      let m = document.getElementsByTagName("meta");
      for (let i in m) {
        try {
          if (m[i].name.toLowerCase() === mn.toLowerCase()) {
            returnContent = m[i].content;
            break;
          }
        } catch (err) {
          continue;
        }
      }
      return returnContent.trim();
    }
    function getMetaContentByNameInHead(name) {
      const metas = document.querySelectorAll("head > meta");
      for (let meta of metas) {
        let $jscomp$optchain$tmp830975390$0;
        if ((($jscomp$optchain$tmp830975390$0 = meta.getAttribute("name")) == null ? void 0 : $jscomp$optchain$tmp830975390$0.toLowerCase()) === name.toLowerCase()) {
          let $jscomp$optchain$tmp830975390$1;
          return (($jscomp$optchain$tmp830975390$1 = meta.getAttribute("content")) == null ? void 0 : $jscomp$optchain$tmp830975390$1.trim()) || "";
        }
      }
      return "";
    }
    function getLinkByRel(rel) {
      var linkTags = document.getElementsByTagName("link");
      for (let i in linkTags) {
        try {
          if (linkTags[i].rel.toLowerCase() === rel) {
            return linkTags[i].href;
          }
        } catch (err) {
        }
      }
      return "";
    }
    function getHeadlinesDetail() {
      let htmlTags = "";
      let output = "<span class='intro-tab'>All headers in order of their appearance in HTML.</span>" + "<hr/>";
      let headersFound = false;
      let h1to6Index = 0;
      let moveMsg = l("moveThisHeadline");
      let headlineBetweenContents = function(first, second) {
        let contentsLength = 0;
        console.log("########", $(first).text(), "######## ===> ", $(second).text());
        let contents = $(first).nextUntil(second);
        console.log(contents);
        console.log(contents.text().trim());
        contentsLength = contents.text().trim().length;
        let htmlTags = "<div>\u6587\u5b57\u6570\uff1a" + contentsLength + "</div>";
        return htmlTags;
      };
      let first = null;
      let second = null;
      $("h1,h2,h3,h4,H4,h5,h6").each(function(i, element) {
        let tagName = $(this).prop("tagName").toLowerCase();
        let tagNameUpper = $(this).prop("tagName").toUpperCase();
        let htagClass = tagName + "title";
        let headlineNum = tagName.replace("h", "");
        let headlineTitle = escapeHtml($(this).text());
        headlineTitle = headlineTitle.replace(/\r?\n/g, "");
        headlineTitle = headlineTitle.replace(/\t/g, "");
        headlineTitle = headlineTitle.trim();
        let dataSource = "";
        let miniBtnCopyId = "";
        let _copyBtnHtml = "" + '<span class="mini-btn tippy move_hl" data-tpy-title="' + moveMsg + '" data-index="' + h1to6Index + '">\n' + '<i class="fa-arrow-down"></i>\n' + "</span>\n";
        htmlTags = htmlTags + ('<div class="headline-item ' + htagClass + '"><div><span class="strong">' + tagNameUpper + '</span> | <span class="headline" data-h-num="' + headlineNum + '">' + headlineTitle + "</span></div><div>" + _copyBtnHtml + "</div></div>");
        headersFound = true;
        ++h1to6Index;
      });
      if (!headersFound) {
        htmlTags = htmlTags + ("<div><span class=''>" + l("m_headlines_tag_notfound") + "</span></div>");
      }
      htmlTags = htmlTags + "<hr />";
      htmlTags = htmlTags + getRowHeadersImagesCounter();
      collectTagCounter();
      output = htmlTags;
      _pageInfo.tabHeadlineCnt = 0;
      for (let i = 1; i <= 6; i++) {
        _pageInfo.tabHeadlineCnt += _hLinkCounter["h" + i];
      }
      _pageInfo.headersTabHtml = output;
    }
    function collectJsonLdInfo() {
      let faqInfo = {};
      let breadInfo = {};
      let isExistFaq = false;
      let isExistBread = false;
      $('script[type="application/ld+json"]').each(function() {
        let contentScript = $(this).html();
        let contentJson = convertJson(contentScript);
        if (contentJson === "") {
          return true;
        }
        let jsonLdType = contentJson["@type"];
        let pushJsonData = function(jsonLdType, contentJson) {
          let info = {};
          let itemCnt = -1;
          let item = null;
          if (isArray(jsonLdType)) {
            jsonLdType = jsonLdType.join(",");
          }
          info.type = jsonLdType;
          info.rawData = contentJson;
          info.seqNum = genSeqNum();
          let level = 0;
          let jsonldList = "";
          jsonldList = createJsonLdList(contentJson, jsonldList, level);
          info.listHtml = jsonldList;
          if (jsonLdType.toLowerCase().indexOf("FAQPage".toLowerCase()) >= 0) {
            itemCnt = contentJson.mainEntity.length;
          } else if (jsonLdType.toLowerCase().indexOf("BreadcrumbList".toLowerCase()) >= 0) {
            itemCnt = contentJson.itemListElement.length;
          } else if (jsonLdType.toLowerCase().indexOf("Review".toLowerCase()) >= 0) {
            info.isExistAuthor = isNotEmpty(contentJson.author);
            info.isExistReviewRating = isNotEmpty(contentJson.reviewRating);
            info.reviewTarget = "";
            if (isNotEmpty(contentJson.itemReviewed)) {
              info.reviewTarget = contentJson.itemReviewed["@type"];
            }
          } else if (jsonLdType.toLowerCase().indexOf("ItemList".toLowerCase()) >= 0) {
            if (isNotEmpty(contentJson.itemListElement)) {
              if (contentJson.itemListElement.length > 0 && isNotEmpty(contentJson.itemListElement[0].item)) {
                item = contentJson.itemListElement[0].item;
                if (isNotEmpty(item["@type"])) {
                  info.itemType = item["@type"];
                }
              } else if (contentJson.itemListElement.length > 0) {
                item = contentJson.itemListElement[0];
                if (isNotEmpty(item["@type"]) && isNotEmpty(item.url)) {
                  info.itemType = "Detail URL List. ";
                }
              }
            }
          }
          info.itemCnt = itemCnt;
          _jsonLd.push(info);
        };
        if (isEmpty(jsonLdType)) {
          let arrayData = null;
          if (contentJson.length > 0) {
            arrayData = contentJson;
          } else if (contentJson["@graph"] !== undefined && contentJson["@graph"].length > 0) {
            arrayData = contentJson["@graph"];
          }
          if (isNotEmpty(arrayData) && arrayData.length > 0) {
            $(arrayData).each(function(i, json) {
              let jsonLdType = json["@type"];
              if (isNotEmpty(jsonLdType)) {
                pushJsonData(jsonLdType, json);
              }
            });
          }
        } else {
          pushJsonData(jsonLdType, contentJson);
        }
      });
      _jsonLd.sort(sortJsonType);
    }
    function convertJson(value) {
      let jsonP = "";
      try {
        jsonP = JSON.parse(value);
      } catch (e) {
        return jsonP;
      }
      return jsonP;
    }
    function getJsonLdTypeList() {
      let typeList = [];
      $(_jsonLd).each(function(i, jsonLd) {
        typeList.push(jsonLd.type);
      });
      if (typeList.length > 0) {
        return typeList.join(", ");
      }
      return getMsgForNormal("JSON-LD");
    }
    function sortJsonType(a, b) {
      return a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1;
    }
    function generateJsonLd() {
      let outputHtml = "";
      $(_jsonLd).each(function(i, info) {
        let type = info.type;
        let miniBtnCodeId = info.seqNum;
        let miniBtnCopyId = info.seqNum;
        let listHtml = info.listHtml;
        listHtml = wrapReadMoreContentsV2(listHtml, 99, "", "jsonLd-" + type);
        let extInfoMsg = "";
        let descAsHtml = l("its_set_up");
        if (type.toLowerCase().indexOf("FAQPage".toLowerCase()) >= 0) {
          descAsHtml = info.itemCnt + " " + l("jsonld_questions");
        }
        if (type.toLowerCase().indexOf("BreadcrumbList".toLowerCase()) >= 0) {
          descAsHtml = info.itemCnt + " " + l("breadcrumbList_levels");
        }
        if (type.toLowerCase().indexOf("Review".toLowerCase()) >= 0) {
          if (isNotEmpty(info.reviewTarget)) {
            descAsHtml = info.reviewTarget + " " + l("jsonld_reviews");
          }
        }
        if (type.toLowerCase().indexOf("ItemList".toLowerCase()) >= 0) {
          if (isNotEmpty(info.itemType)) {
            descAsHtml = info.itemType + "";
          }
        }
        let jsonLdRequiredPropertiesCheck = (type, rawData) => {
          if (RequiredProperties[type] === undefined) {
            return "";
          }
          let notFoundProperties = [];
          let ldData = RequiredProperties[type];
          $.each(ldData, (i, paramName) => {
            if (info.rawData[paramName] === undefined) {
              notFoundProperties.push(paramName);
            }
          });
          if (type === "FAQPage") {
            let res = t.checkJsonLd(type, info.rawData);
            if (res.length > 0) {
              notFoundProperties = notFoundProperties.concat(res);
            }
          } else if (type === "Review") {
            let res = t.checkJsonLd(type, info.rawData);
            if (res.length > 0) {
              notFoundProperties = notFoundProperties.concat(res);
            }
          }
          if (notFoundProperties.length === 0) {
            return "";
          }
          let notFoundPropertyStr = notFoundProperties.join(" , ");
          notFoundPropertyStr = "<span style='font-weight: bold;'>" + notFoundPropertyStr + "</span>";
          const doc_url = getJsonLdDoc(type);
          let add_link_msg = l("check_with_tool");
          let not_found_properties = l("not_found_properties");
          let doc_link = "";
          if (doc_url !== "") {
            add_link_msg = l("check_with_doc_and_tool");
            let documentName = l("document");
            doc_link = " <a href='" + doc_url + "' target='_blank' rel='noreferrer noopener'>" + documentName + "</a>";
            add_link_msg = add_link_msg.replace("__DOC__", doc_link);
          }
          let tool = "<a href='https://search.google.com/test/rich-results' target='_blank' rel='noreferrer noopener'>TOOL</a>";
          add_link_msg = add_link_msg.replace("__TOOL__", tool);
          not_found_properties = not_found_properties.replace("__PARAM__", notFoundPropertyStr);
          notFoundPropertyStr = "<div><span class='error-val'> " + not_found_properties + " </span> " + add_link_msg + "</div>";
          return notFoundPropertyStr;
        };
        let notFoundPropertyStr = jsonLdRequiredPropertiesCheck(type, info.rawData);
        descAsHtml = descAsHtml + notFoundPropertyStr;
        let seqNum = info.seqNum;
        let infoBtnHtml = "";
        let url = getJsonLdDoc(type);
        if (isNotEmpty(url)) {
          infoBtnHtml = generateInfoBtnUrl(url);
        }
        outputHtml = outputHtml + genJsonLdTabItemContentHtml(type, descAsHtml, extInfoMsg, "jsonLd", miniBtnCodeId, miniBtnCopyId, infoBtnHtml, listHtml);
      });
      return outputHtml;
    }
    function _microdataDetail() {
      let isMicrodataRootNode = function(allAttrs) {
        let hasItemScope = allAttrs["itemscope"] !== undefined;
        let hasItemProp = allAttrs["itemprop"] !== undefined;
        if (!hasItemScope) {
          return false;
        }
        if (hasItemProp) {
          return false;
        }
        return true;
      };
      let retrieveHtmlMicrodataAttributes = function(allAttrs) {
        let result = {};
        for (let name in allAttrs) {
          let attribute = allAttrs[name];
          if (name === "itemscope" || name === "itemprop" || name === "itemprop-reverse" || name === "itemtype" || name === "itemref" || name === "itemid") {
            result[name] = attribute;
          }
        }
        return result;
      };
      let checkMicrodata = function($children, microDataItem) {
        for (let i = 0; i < $children.length; i++) {
          let $child = $($children[i]);
          let allAttrs = attrAll($child);
          if (isMicrodataRootNode(allAttrs)) {
            continue;
          }
          let mdAttrs = retrieveHtmlMicrodataAttributes(allAttrs);
          if (isEmptyObj(mdAttrs)) {
            checkMicrodata($child.children("*"), microDataItem);
          } else {
            let val = $child.text().trim().substr(0, 200);
            val = escapeHtml(val);
            if (!isEmpty(allAttrs["content"])) {
              val = allAttrs["content"];
            }
            if (!isEmpty(allAttrs["datetime"])) {
              val = allAttrs["datetime"];
            }
            let item = createItem();
            item.key = allAttrs["itemprop"];
            item.val = val;
            item.type = allAttrs["itemtype"];
            let propVal = getValByItemProp(allAttrs, $child);
            if (isNotEmpty(propVal)) {
              item.val = propVal;
            }
            if (addChildrenItemByItemProp(item, allAttrs, $child)) {
              checkMicrodata($child.children("*"), microDataItem);
              microDataItem.children.push(item);
            } else if (isEmpty(allAttrs["itemtype"])) {
              checkMicrodata($child.children("*"), microDataItem);
              microDataItem.children.push(item);
            } else {
              checkMicrodata($child.children("*"), item);
              microDataItem.children.push(item);
            }
          }
        }
      };
      let getValByItemProp = function(allAttrs, $elem) {
        let ret = "";
        let tagName = "";
        switch(allAttrs["itemprop"]) {
          case "url":
          case "sameAs":
            tagName = $elem.prop("tagName").toLowerCase();
            if (tagName === "a") {
              ret = $elem.attr("href");
            } else if (tagName === "link") {
              ret = $elem.attr("href");
            }
            break;
          case "image":
            tagName = $elem.prop("tagName").toLowerCase();
            if (tagName === "img") {
              ret = $elem.attr("src");
            }
            break;
          case "availability":
            tagName = $elem.prop("tagName").toLowerCase();
            if (tagName === "link") {
              ret = $elem.attr("href");
            }
            break;
          case "applicationCategory":
            tagName = $elem.prop("tagName").toLowerCase();
            if (tagName === "link") {
              ret = $elem.attr("href");
            }
            break;
          default:
            return "";
        }
        return ret;
      };
      let addChildrenItemByItemProp = function(item, allAttrs, $elem) {
        switch(allAttrs["itemprop"]) {
          case "item":
            let tmp = createItem();
            let tagName = $elem.prop("tagName").toLowerCase();
            if (tagName === "a") {
              tmp = createItem();
              tmp.key = "@id";
              tmp.val = $elem.attr("href");
              tmp.type = "";
              item.children.push(tmp);
            }
            item.val = "";
            return true;
          default:
            return false;
        }
      };
      let createItem = function() {
        return {key:null, val:null, type:"", children:[]};
      };
      let collectMicrodataList = [];
      $("[itemscope]").each(function() {
        let itemType = $(this).attr("itemtype");
        let itemscope = $(this).attr("itemscope");
        let allAttrs = attrAll($(this));
        let hasItemScope = allAttrs["itemscope"] !== undefined;
        let hasItemProp = allAttrs["itemprop"] !== undefined;
        if (isMicrodataRootNode(allAttrs)) {
          let rootMicroDataItem = createItem();
          rootMicroDataItem.key = allAttrs["itemprop"];
          rootMicroDataItem.val = "none";
          rootMicroDataItem.type = allAttrs["itemtype"];
          checkMicrodata($(this).children("*"), rootMicroDataItem);
          if (rootMicroDataItem.children.length > 0) {
            collectMicrodataList.push(rootMicroDataItem);
          }
        }
      });
      let genHtml = function(childrenItems, level) {
        let html = "";
        for (let i = 0; i < childrenItems.length; i++) {
          let item = childrenItems[i];
          let dispKey = item.key;
          let dispVal = item.val;
          if (isNotEmpty(item.type)) {
            let keys = item.key;
            keys = keys.split(" ");
            keys = keys.join(", ");
            html = html + generateItemHtml(keys, "", level - 1);
            dispKey = "type";
            dispVal = item.type.replace("http://schema.org/", "");
            dispVal = dispVal.replace("https://schema.org/", "");
            dispVal = dispVal.replace("http://data-vocabulary.org/", "");
          }
          html = html + generateItemHtml(dispKey, dispVal, level);
          if (item.children.length > 0) {
            html = html + genHtml(item.children, level + 1);
          }
        }
        return html;
      };
      let resultHtmlList = [];
      for (let i = 0; i < collectMicrodataList.length; i++) {
        let rootMicroDataItem = collectMicrodataList[i];
        let typeName = rootMicroDataItem.type;
        let item = createMdItem();
        typeName = rootMicroDataItem.type.replace("http://schema.org/", "");
        typeName = typeName.replace("https://schema.org/", "");
        typeName = typeName.replace("http://data-vocabulary.org/", "");
        let level = 0;
        let resultHtml = genHtml(rootMicroDataItem.children, level);
        item.typeName = typeName;
        item.detailHtml = resultHtml;
        item.itemtype = rootMicroDataItem.type;
        let errMsg = "";
        if (rootMicroDataItem.type.indexOf("data-vocabulary.org") > 0) {
          errMsg = "data-vocabulary.org " + l("schema_support_end");
        }
        item.errMsg = errMsg;
        resultHtmlList.push(item);
      }
      _mdList = resultHtmlList;
    }
    function createMdItem() {
      return {typeName:"", itemtype:"", errMsg:"", detailHtml:""};
    }
    function collectMicroData() {
      _microdataDetail();
    }
    function generateMicrodataHtml() {
      let outputHtml = "";
      $(_mdList).each(function(i, item) {
        let miniBtnCodeId = "";
        let miniBtnCopyId = "";
        let typeName = item.typeName;
        let itemtype = item.itemtype;
        let extInfoMsg = "";
        let descAsHtml = l("its_set_up");
        let listHtml = item.detailHtml;
        listHtml = wrapReadMoreContentsV2(listHtml, 99, "", "Microdata-" + typeName);
        descAsHtml = itemtype;
        if (isNotEmpty(item.errMsg)) {
          extInfoMsg = item.errMsg;
        }
        let infoBtnHtml = "";
        outputHtml = outputHtml + genJsonLdTabItemContentHtml(typeName, descAsHtml, extInfoMsg, "microdata", miniBtnCodeId, miniBtnCopyId, infoBtnHtml, listHtml);
      });
      let microdataList = [];
      $(microdataList).each(function(i, item) {
        let miniBtnCodeId = "";
        let miniBtnCopyId = "";
        let typeName = item.typeName;
        let itemtype = item.itemtype;
        let extInfoMsg = "";
        let descAsHtml = l("its_set_up");
        descAsHtml = itemtype;
        if (isNotEmpty(item.errMsg)) {
          extInfoMsg = item.errMsg;
        }
        let infoBtnHtml = "";
        outputHtml = outputHtml + genJsonLdTabItemContentHtml(typeName, descAsHtml, extInfoMsg, "microdata", miniBtnCodeId, miniBtnCopyId, infoBtnHtml, "");
      });
      return outputHtml;
    }
    function sortMicrodataItemType(a, b) {
      return a.itemtype.toLowerCase() > b.itemtype.toLowerCase() ? 1 : -1;
    }
    function collectRDFaData() {
      let rdfaDataList = [];
      let itemTypeCnt = 0;
      $("[vocab]").each(function() {
        let vocab = $(this).attr("vocab");
        if (vocab.indexOf("schema.org") < 1) {
          return true;
        }
        itemTypeCnt++;
        let typeofVal = $(this).attr("typeof");
        if (isEmpty(typeofVal)) {
          typeofVal = "";
        }
        let item = {};
        item.typeofVal = typeofVal;
        rdfaDataList.push(item);
      });
      _rdfaLiteList = rdfaDataList;
    }
    function generateRDFaHtml() {
      let outputHtml = "";
      $(_rdfaLiteList).each(function(i, item) {
        let miniBtnCodeId = "";
        let miniBtnCopyId = "";
        let infoBtnHtml = "";
        let typeName = item.typeofVal;
        let itemtype = "item.itemtype";
        let extInfoMsg = "";
        let descAsHtml = l("its_set_up");
        if (isEmpty(typeName)) {
          typeName = "Unknown";
        }
        outputHtml = outputHtml + genJsonLdTabItemContentHtml(typeName, descAsHtml, extInfoMsg, "rdfa", miniBtnCodeId, miniBtnCopyId, infoBtnHtml, "");
      });
      return outputHtml;
    }
    function initSummaryTab() {
      let output = "";
      let outputHtml = "";
      let blockHtml = "";
      let content = "";
      let fileCnt = 0;
      let msgLengthTxt = "";
      let m_fileCounterUnit_charas = l("m_fileCounterUnit_charas");
      msgLengthTxt = "";
      content = document.title;
      let msgLength = getStringLength(content);
      let msgLengthError = "";
      if (msgLength === 0) {
        content = getMsgForMissing("Title");
      } else {
        if (isLengthCheck(msgLength, 20, 65)) {
          msgLengthTxt = "<span class='good-val'>" + msgLength + " " + m_fileCounterUnit_charas + "</span>";
        } else {
          msgLengthTxt = "<span class='error-val'>" + msgLength + " " + m_fileCounterUnit_charas + "</span>";
        }
        content = escapeHtml(content);
      }
      outputHtml = outputHtml + getTitleAndContentBasicAsHtmlTag("Title", msgLengthTxt, content, "html-desc", "", "cp");
      msgLengthTxt = "";
      content = getMetaContentByNameInHead("description");
      msgLength = getStringLength(content);
      msgLengthError = "";
      if (msgLength === 0) {
        content = getMsgForMissing("Description");
        msgLengthTxt = "";
      } else {
        if (isLengthCheck(msgLength, 1, 120)) {
          msgLengthTxt = "<span class='good-val'>" + msgLength + " " + m_fileCounterUnit_charas + "</span>";
        } else {
          msgLengthTxt = "<span class='error-val'>" + msgLength + " " + m_fileCounterUnit_charas + "</span>";
        }
        content = escapeHtml(content);
      }
      outputHtml = outputHtml + getTitleAndContentBasicAsHtmlTag("Description", msgLengthTxt, content, "html-desc", "", "cp");
      msgLengthTxt = "";
      content = getMetaContentByName("keywords");
      msgLength = getStringLength(content);
      msgLengthError = "";
      let wordsCnt = 0;
      if (msgLength === 0) {
        content = getMsgForNormal("Keywords");
        msgLengthTxt = "";
      } else {
        if (content === "" || content == null || content.trim().length === 0) {
          wordsCnt = 0;
        } else {
          wordsCnt = content.split(",").length;
        }
        let m_fileCounterUnit_words = l("m_fileCounterUnit_words");
        if (content === "" || content == null || content.trim().length === 0) {
          msgLengthTxt = 0 + " " + m_fileCounterUnit_words;
          content = getMsgForNormal("Keywords");
        } else if (isLengthCheck(wordsCnt, 1, 10)) {
          msgLengthTxt = "<span class='good-val'>" + wordsCnt + " " + m_fileCounterUnit_words + "</span>";
        } else {
          msgLengthTxt = "<span class='error-val'>" + wordsCnt + " " + m_fileCounterUnit_words + "</span>";
        }
      }
      outputHtml = outputHtml + getTitleAndContentBasicAsHtmlTag("Keywords", msgLengthTxt, content, "html-desc", "", "cp");
      msgLengthTxt = "";
      if (_cmsInfo.isCmsWp) {
        content = "WordPress.";
        msgLengthTxt = "";
        msgLengthError = "";
        if (_cmsInfo.wpThemes.length > 0) {
          content = content + (l("m_theme_is") + _cmsInfo.wpThemes.join(", ") + ". ");
        }
        outputHtml = outputHtml + getTitleAndContentBasicAsHtmlTag("CMS", msgLengthTxt, content, "html-desc", "", "cp");
      }
      msgLengthTxt = "";
      content = getJsonLdTypeList();
      outputHtml = outputHtml + getTitleAndContent_noExtInfo("JSON-LD", "", "", content, "html-desc", "", "cp");
      content = window.location.href;
      msgLengthTxt = "";
      outputHtml = outputHtml + getTitleAndContent_noExtInfo("URL", "", "", content, "html-desc", "", "cp");
      msgLengthTxt = "";
      content = getLinkByRel("canonical");
      if (getStringLength(content) === 0) {
        content = getMsgForNormal("Canonical URL");
      }
      outputHtml = outputHtml + getTitleAndContent_noExtInfo("Canonical", "", "", content, "html-desc", "", "cp");
      msgLengthTxt = "";
      content = getMetaContentByName("robots");
      if (getStringLength(content) === 0) {
        content = getMsgForMissing("Robots meta tag");
      } else {
        content = getMoreDetailForRobotsTag(content);
      }
      outputHtml = outputHtml + getTitleAndContent_noExtInfo("Robots Tag", "", "", content, "html-desc", "", "cp");
      msgLengthTxt = "";
      content = getAuthorContent();
      if (isNotEmpty(content)) {
        outputHtml = outputHtml + getTitleAndContent_noExtInfo("Author", "", "", content, "html-desc", "", "cp");
      }
      content = getPublisherContent();
      msgLengthTxt = "";
      if (isNotEmpty(content)) {
        outputHtml = outputHtml + getTitleAndContent_noExtInfo("Publisher", "", "", content, "html-desc", "", "cp");
      }
      msgLengthTxt = "";
      content = getHtmlLang();
      outputHtml = outputHtml + getTitleAndContent_noExtInfo("Lang", "", "", content, "html-desc", "", "cp");
      msgLengthTxt = "";
      content = "";
      msgLength = calcTotalDomCount();
      content = msgLength + " " + l("total_dom_elements_cnt_val");
      if (isLengthCheck(msgLength, 0, 1500)) {
      } else {
        content = "<span class='error-val'>" + content + "</span>";
      }
      msgLengthTxt = "";
      outputHtml = outputHtml + getTitleAndContentBasicAsHtmlTag(l("total_dom_elements_cnt"), msgLengthTxt, content, "html-desc", "", "cp");
      let m_fileCounterUnit_ko = l("m_fileCounterUnit_ko");
      let headInfo = getHeadInfo();
      let linksTab = headInfo.linksTab;
      let metasTab = headInfo.metasTab;
      msgLengthTxt = "";
      let styleTab = getStyleTagInfo();
      fileCnt = styleTab.length;
      let styleBytes = 0;
      for (let i = 0; i < fileCnt; i++) {
        styleBytes = styleBytes + styleTab[i];
      }
      content = l("tag_count") + " : " + fileCnt + m_fileCounterUnit_ko + " (" + calcByteAddUnit(styleBytes) + ")";
      outputHtml = outputHtml + getTitleAndContent_noExtInfo(l("style_tag"), "", "", content, "html-desc", "", "cp");
      outputHtml = outputHtml + "<hr/>";
      blockHtml = "";
      blockHtml = blockHtml + "<div class='contents-title'><span class='strong'>Page Speed</span></div>";
      blockHtml = blockHtml + genSpeedListTable();
      blockHtml = wrapReadMoreContents(blockHtml, 0, "rm-speed-table", "speed-table");
      blockHtml = wrapContentsArea(blockHtml, "Page_Speed");
      outputHtml = outputHtml + blockHtml;
      outputHtml = outputHtml + "<hr/>";
      blockHtml = "";
      blockHtml = blockHtml + "<div class='contents-title'><span class='strong'>Core Web Vitals</span></div>";
      blockHtml = blockHtml + genCoreWebVitalsHtml();
      blockHtml = wrapContentsArea(blockHtml, "Core_Web_Vitals");
      outputHtml = outputHtml + blockHtml;
      msgLengthTxt = "";
      linksTab = getLinkTagInfo("stylesheet");
      fileCnt = linksTab.length;
      if (fileCnt > 0) {
        outputHtml = outputHtml + "<hr/>";
        blockHtml = "";
        blockHtml = blockHtml + ("<div class='contents-title'><span class='strong'>ALL StyleSheets</span> (" + fileCnt + m_fileCounterUnit_ko + ")</div>");
        linksTab.sort();
        for (let i in linksTab) {
          blockHtml = blockHtml + linksTab[i];
        }
        blockHtml = wrapReadMoreContents(blockHtml, fileCnt, "rm-all-styleSheets", "all-styleSheets");
        blockHtml = wrapContentsArea(blockHtml, "ALL_StyleSheets");
        outputHtml = outputHtml + blockHtml;
      }
      linksTab = getLinkTagInfo("", ["stylesheet"]);
      fileCnt = linksTab.length;
      if (fileCnt > 0) {
        outputHtml = outputHtml + "<hr/>";
        blockHtml = "";
        blockHtml = blockHtml + ("<div class='contents-title'><span class='strong'>ALL LINKS</span> (" + fileCnt + m_fileCounterUnit_ko + ")</div>");
        linksTab.sort();
        for (let i in linksTab) {
          blockHtml = blockHtml + linksTab[i];
        }
        blockHtml = wrapReadMoreContents(blockHtml, fileCnt, "rm-all-links", "all-links");
        blockHtml = wrapContentsArea(blockHtml, "all_links");
        outputHtml = outputHtml + blockHtml;
      }
      let scriptsTab = getScriptTagInfo();
      msgLengthTxt = "";
      fileCnt = scriptsTab.length;
      if (fileCnt > 0) {
        outputHtml = outputHtml + "<hr/>";
        blockHtml = "";
        blockHtml = blockHtml + ("<div class='contents-title'><span class='strong'>ALL SCRIPTS</span> (" + fileCnt + m_fileCounterUnit_ko + ")</div>");
        scriptsTab.sort();
        for (let i in scriptsTab) {
          blockHtml = blockHtml + scriptsTab[i];
        }
        blockHtml = wrapReadMoreContents(blockHtml, fileCnt, "rm-all-scripts", "all-scripts");
        blockHtml = wrapContentsArea(blockHtml, "all_scripts");
        outputHtml = outputHtml + blockHtml;
      }
      fileCnt = metasTab.length;
      if (fileCnt > 0) {
        outputHtml = outputHtml + "<hr/>";
        blockHtml = "";
        blockHtml = blockHtml + ("<div class='contents-title'><span class='strong'>ALL METAS</span> (" + fileCnt + m_fileCounterUnit_ko + ")</div>");
        metasTab.sort(t.sortText);
        for (let i in metasTab) {
          blockHtml = blockHtml + metasTab[i];
        }
        blockHtml = wrapReadMoreContents(blockHtml, fileCnt, "rm-all-metass", "all-metas");
        blockHtml = wrapContentsArea(blockHtml, "all_metas");
        outputHtml = outputHtml + blockHtml;
      }
      outputHtml = outputHtml + "<hr/>";
      outputHtml = outputHtml + getRowHeadersImagesCounter();
      outputHtml = outputHtml + generateInPageLinkList();
      outputHtml = outputHtml + generateInternalLinkList();
      outputHtml = outputHtml + generateExternalLinkList();
      _pageInfo.sumTabHtml = outputHtml;
    }
    function initJsonTab() {
      let outputHtml = "";
      let jsonLdCnt = 0;
      outputHtml = outputHtml + generateJsonLd();
      if (isNotEmpty(_jsonLd)) {
        jsonLdCnt = _jsonLd.length;
      }
      _pageInfo._jsonLd = _jsonLd;
      _pageInfo.tabJsonLdCnt = jsonLdCnt;
      _pageInfo.jsonLdTabHtml = outputHtml;
    }
    function initMicrodataTab() {
      let outputHtml = "";
      let fileCnt = 0;
      outputHtml = outputHtml + generateMicrodataHtml();
      if (isNotEmpty(_mdList)) {
        fileCnt = _mdList.length;
      }
      _pageInfo._microdataList = _microdataList;
      _pageInfo.tabMicrodataCnt = fileCnt;
      _pageInfo.microdataTabHtml = outputHtml;
    }
    function initRdfaTab() {
      let output = "";
      let outputHtml = "";
      let blockHtml = "";
      let fileCnt = 0;
      outputHtml = outputHtml + generateRDFaHtml();
      let jsonLdCnt = 0;
      if (isNotEmpty(_rdfaLiteList)) {
        fileCnt = _rdfaLiteList.length;
      }
      _pageInfo._rdfaList = _rdfaLiteList;
      _pageInfo.tabRdfaCnt = fileCnt;
      _pageInfo.rdfaTabHtml = outputHtml;
    }
    function initImagesTab() {
      let totalImgCnt = 0;
      let withoutAltImgCnt = 0;
      let loadingLazyImgCnt = 0;
      let loadingEagerImgCnt = 0;
      let noscriptImgCnt = 0;
      let jsLoadImgCnt = 0;
      let withAltImgObjs = [];
      let withoutAltImgObjs = [];
      let loadingLazyImgObjs = [];
      let loadingEagerImgObjs = [];
      let noscriptImgObjs = [];
      let jsLoadImgObjs = [];
      let rightsImgObjs = [];
      let outputHtml = "";
      let blockHtml = "";
      let fileCnt = 0;
      let noscriptSrcList = [];
      let noImgSizeList = [];
      let worstSpeedMs = 20;
      let worstSpeedImgList = [];
      let imgCounter = {noImgSize:0, newGenFormat:0, bigFileSize:0, worstSpeed:0, rights:0};
      let isNewGenFormat = function(contentType) {
        if (isEmpty(contentType)) {
          return false;
        }
        let str = contentType.toLowerCase();
        if (str === "avif") {
          return true;
        } else if (str === "webp") {
          return true;
        }
        return false;
      };
      let createImgLink = function(imgUrl, imgName) {
        let newHref = "<span class='tippy' data-tpy-img-src='" + imgUrl + "'><a href='" + imgUrl + "'  class='' title='" + myStringSlice(imgUrl) + "' target='_blank' rel=\"noopener noreferrer\" >" + imgName + "</a></span>";
        return newHref;
      };
      let createImgLazyLabel = function(labelStr, isEnable) {
        let typeClass = "";
        if (labelStr === "lazy") {
          typeClass = "ldngLazy";
        } else if (labelStr === "eager") {
          typeClass = "ldngEager";
        } else if (labelStr === "noscript img") {
          typeClass = "ldngNoscript";
        } else if (labelStr === "js load") {
          typeClass = "jsLoad";
        }
        let visibleClass = "";
        if (!isEnable) {
          visibleClass = " visibleHidden";
          return "";
        }
        return "<span class='imgLazyLabel " + typeClass + visibleClass + "'>" + labelStr + "</span>";
      };
      let createContentTypeLabel = function(labelStr, isEnable) {
        if (isEmpty(labelStr)) {
          return "";
        }
        labelStr = labelStr.toUpperCase();
        return "<span class='imgContentLabel " + labelStr + "'>" + labelStr + "</span>";
      };
      let speedTableInfoTd = function(infoBtnTxt, info = "") {
        if (isNotEmpty(infoBtnTxt)) {
          infoBtnTxt = getTippyMouseOverInfoBtn("", infoBtnTxt);
        }
        return "<td>" + "" + infoBtnTxt + " " + info + "</td>";
      };
      let imgBlockItem = function(imgObj) {
        let imgSrc = imgObj.src;
        let displayImgSrc = imgObj.src;
        let dataSrc = imgObj.dataSrc;
        let imAlt = imgObj.alt;
        let imageName = imgObj.fileName;
        let dataSrcImageName = getLastRightPartOfUrl(dataSrc);
        let blobSize = "";
        let fileSizeStr = "";
        let imgSizeStr = "";
        let contentType = "";
        let encodedBodySize = "";
        let infoList = [];
        let speedTable = "";
        let ms_unit = l("mili_sec");
        if (imgObj._DLimgData !== null) {
          let fileSize = 0;
          let totalSpeedMs = "";
          contentType = createContentTypeLabel(imgObj._DLimgData.contentType);
          if (isNotEmpty(contentType)) {
            infoList.push(contentType);
          }
          encodedBodySize = imgObj._DLimgData.encodedBodySize;
          blobSize = imgObj._DLimgData.blobSize;
          let time = imgObj._DLimgData.time;
          fileSize = blobSize;
          if (blobSize === 0 && encodedBodySize > 0) {
            fileSize = encodedBodySize;
          }
          if (fileSize > 0) {
            fileSize = calcByteAddUnit(fileSize);
            fileSizeStr = "<span class='imgFileSize'>" + fileSize + "</span>";
            infoList.push(fileSizeStr);
          } else {
            fileSizeStr = "";
          }
          if (imgObj._DLimgData.width > 0 || imgObj._DLimgData.height > 0) {
            imgSizeStr = "<span class='imgSize'>" + imgObj._DLimgData.width + " x " + imgObj._DLimgData.height + "</span>";
            infoList.push(imgSizeStr);
          }
          if (time !== null) {
            if (time.total > 0) {
              let tmp = "<span class=''>" + speedValFormat(time.requestResponse) + " " + ms_unit + "</span>";
              infoList.push(tmp);
              let ms_unit_small_font = "<span class='small_font'> " + ms_unit + "</span>";
              let speedValAndUnit = function(val, tdClass = "") {
                if (val <= 0) {
                  return "<td class='txtr " + tdClass + "'>0</td>";
                }
                return "<td class='txtr " + tdClass + "'>" + speedValFormat(val) + ms_unit_small_font + "</td>";
              };
              speedTable = "" + "<table class='speedTable'>" + "<tr class='header'>" + "<th>Title</th><th>Time (ms)</th>" + "<th></th>" + "</tr>" + "";
              let msgLocale_appCacheUse = l("imgtab_useAppCache");
              let msgLocale_redirect_time = l("imgtab_redirect_time");
              let msgLocale_imgtab_tcp_time = l("imgtab_tcp_time");
              let msgLocale_to_response_time = l("imgtab_to_response_time");
              let msgLocale_dl_time = l("imgtab_dl_time");
              let msgLocale_request_to_response_end = l("imgtab_request_to_response_end");
              let msgLocale_pagespeed_desc_dns = l("pagespeed_desc_dns");
              speedTable = speedTable + ("" + "<tr class=''>" + "<th>Redirect</th>" + speedValAndUnit(time.redirect) + speedTableInfoTd(time.redirectLogic, msgLocale_redirect_time) + "</tr>" + "");
              speedTable = speedTable + ("" + "<tr class=''>" + "<th> | </th>" + speedValAndUnit(time.redirectToDomainLookupStart) + speedTableInfoTd(time.redirectToDomainLookupStartLogic) + "</tr>" + "<tr class=''>" + "<th>DNS</th>" + speedValAndUnit(time.dns) + speedTableInfoTd(time.dnsLogic, msgLocale_pagespeed_desc_dns) + "</tr>" + "<tr class=''>" + "<th> | </th>" + speedValAndUnit(time.dnsToTcp) + speedTableInfoTd(time.dnsToTcpLogic) + "</tr>" + "<tr class=''>" + "<th>TCP</th>" + speedValAndUnit(time.tcp) + 
              speedTableInfoTd(time.tcpLogic, msgLocale_imgtab_tcp_time) + "</tr>" + "<tr class=''>" + "<th> | </th>" + speedValAndUnit(time.tcpToRequest) + speedTableInfoTd(time.tcpToRequestLogic) + "</tr>" + "<tr class=''>" + "<th>Request(TTFB)</th>" + speedValAndUnit(time.request) + speedTableInfoTd(time.requestLogic, msgLocale_to_response_time) + "</tr>" + "<tr class=''>" + "<th>Response</th>" + speedValAndUnit(time.response) + speedTableInfoTd(time.responseLogic, msgLocale_dl_time) + "</tr>" + 
              "<tr class=''>" + "<th class='imgSpeedMain'>Request/Response</th>" + speedValAndUnit(time.requestResponse, "imgSpeedMain") + speedTableInfoTd(time.requestResponseLogic, msgLocale_request_to_response_end) + "</tr>" + "<tr class=''>" + "<th class='imgSpeedTotal'>Total</th>" + speedValAndUnit(time.total, "imgSpeedTotal") + speedTableInfoTd(time.totalLogic) + "</tr>" + "</table>");
            }
          }
        }
        if (isEmpty(imAlt)) {
          imAlt = "<span class='imgLazyLabel altNoneLabel'>" + l("imgtab_no_setting") + "</span>";
        }
        if (isNotEmpty(dataSrc)) {
          displayImgSrc = dataSrc;
        }
        let html = "" + '<div class="dflex imgBlock_root">\n' + '    <div class="imgBlock_img">\n' + '        <img src="' + adjustUrlPath(displayImgSrc) + '" />\n' + "    </div>\n" + '    <div class="imgBlock_info">\n' + "        <div class='imgBlockVal'>\n" + "            " + createImgLink(adjustUrlPath(imgSrc), imageName) + "        </div>\n" + "        <div class='imgBlockVal'>\n" + "            ALT : " + imAlt + "        </div>\n" + "";
        if (isNotEmpty(dataSrc)) {
          html = html + ("" + "<div class='imgBlockVal'>\n" + "    data-src : " + createImgLink(adjustUrlPath(dataSrc), dataSrcImageName) + "</div>\n" + "");
        }
        html = html + ("" + "<div class='imgBlockVal'>\n" + "    " + infoList.join(" | ") + "</div>\n" + "");
        html = html + ("" + "        <div class='imgBlockVal imgDelayTag'>\n" + "            " + l("imgtab_delay_type") + ": " + createImgLazyLabel("lazy", imgObj.isLoadingLazy) + createImgLazyLabel("eager", imgObj.isLoadingEager) + createImgLazyLabel("noscript img", imgObj.isNoscript) + createImgLazyLabel("js load", imgObj.isJsLoad) + "        </div>\n" + "");
        if (imgObj._rightsInfo !== null) {
          let genImgRightsTable = function(rightsInfoList) {
            let tableHtml = "<table class='kodai-table imgRights'>";
            for (let metaMainKey in rightsInfoList) {
              let rightsInfo = rightsInfoList[metaMainKey];
              tableHtml = tableHtml + ('<tr><th colspan="2" class="metakey">' + l("img_rights_mainkey_" + metaMainKey) + "</th></tr>");
              for (let metaKey in rightsInfo) {
                let value = rightsInfo[metaKey];
                value = value === null ? "-" : escapeHtml(value);
                tableHtml = tableHtml + ('<tr><th class="meta-item-key">' + l("img_rights_key_" + metaKey) + '</th><td class="meta-item-val">' + value + "</td></tr>");
              }
            }
            tableHtml = tableHtml + "</table>";
            return tableHtml;
          };
          let rightsTable = genImgRightsTable(imgObj._rightsInfo);
          html = html + ("" + "<div class='imgBlockVal'>\n" + rightsTable + "</div>\n" + "");
        }
        if (isNotEmpty(speedTable)) {
          html = html + speedTable;
        }
        html = html + ("" + "    </div>\n" + "</div>" + "");
        return html;
      };
      getNoscriptTags().each(function() {
        let html = $(this).html();
        let $html = null;
        try {
          $html = $(html);
        } catch (err) {
          return true;
        }
        if ($html[0] === undefined) {
          return true;
        }
        if ($html[0].tagName === "IMG") {
          ++noscriptImgCnt;
          let attrSrc = $($html[0]).attr("src");
          if (!isEmpty(attrSrc)) {
            noscriptSrcList.push(attrSrc);
          }
        }
      });
      getImgTags().each(function() {
        let src = $(this).attr("src");
        if (isEmpty(src)) {
          return true;
        }
        ++totalImgCnt;
        let isImgAlt = true;
        let alt = $(this).attr("alt");
        if (isEmpty(alt)) {
          isImgAlt = false;
          ++withoutAltImgCnt;
        }
        let isJsLoad = false;
        let isLoadingLazy = false;
        let isLoadingEager = false;
        let imgWidth = $(this).attr("width");
        let imgHeight = $(this).attr("height");
        let dataSrc = $(this).attr("data-src");
        if (isEmpty(dataSrc)) {
          dataSrc = "";
        } else {
          isJsLoad = true;
        }
        let loadingAttr = $(this).attr("loading");
        if (isEmpty(loadingAttr)) {
        } else if (loadingAttr === "lazy") {
          ++loadingLazyImgCnt;
          isLoadingLazy = true;
        } else if (loadingAttr === "eager") {
          ++loadingEagerImgCnt;
          isLoadingEager = true;
        }
        let imgObj = createImgObj();
        let imageName = getLastRightPartOfUrl(src);
        imgObj.fileName = imageName;
        imgObj.src = src;
        imgObj.dataSrc = dataSrc;
        imgObj.isJsLoad = isJsLoad;
        imgObj.isLoadingLazy = isLoadingLazy;
        imgObj.isLoadingEager = isLoadingEager;
        let adjustUrlURL = adjustUrlPath(src);
        imgObj._DLimgData = null;
        if (_resource_fetch_map[adjustUrlURL] !== undefined) {
          imgObj._DLimgData = _resource_fetch_map[adjustUrlURL];
        } else {
          let tmp = adjustUrlPath(dataSrc);
          if (isNotEmpty(tmp) && _resource_fetch_map[tmp] !== undefined) {
            imgObj._DLimgData = _resource_fetch_map[tmp];
          }
        }
        imgObj._rightsInfo = null;
        if (_img_metadata_map[adjustUrlURL] !== undefined) {
          imgObj._rightsInfo = _img_metadata_map[adjustUrlURL];
        } else {
          let tmp = adjustUrlPath(dataSrc);
          if (isNotEmpty(tmp) && _img_metadata_map[tmp] !== undefined) {
            imgObj._rightsInfo = _img_metadata_map[tmp];
          }
        }
        if (isImgAlt) {
          imgObj.alt = alt;
        }
        let check = noscriptSrcList.find(value => {
          return value === src;
        });
        if (check) {
          imgObj.isNoscript = true;
        }
        if (imgObj._DLimgData !== null && isNewGenFormat(imgObj._DLimgData.contentType)) {
          ++imgCounter.newGenFormat;
        }
        if (isEmpty(imgObj.genItemHtml)) {
          imgObj.genItemHtml = imgBlockItem(imgObj);
        }
        if (isImgAlt) {
          withAltImgObjs.push(imgObj);
        } else {
          withoutAltImgObjs.push(imgObj);
        }
        if (isLoadingLazy) {
          loadingLazyImgObjs.push(imgObj);
        }
        if (isLoadingEager) {
          loadingEagerImgObjs.push(imgObj);
        }
        if (imgObj.isNoscript) {
          noscriptImgObjs.push(imgObj);
        }
        if (imgObj.isJsLoad) {
          ++jsLoadImgCnt;
          jsLoadImgObjs.push(imgObj);
        }
        if (imgObj._rightsInfo !== null) {
          ++imgCounter.rights;
          rightsImgObjs.push(imgObj);
        }
        if (isEmpty(imgWidth) || isEmpty(imgHeight)) {
          ++imgCounter.noImgSize;
          noImgSizeList.push(imgObj);
        }
        if (imgObj._DLimgData !== null && imgObj._DLimgData.time !== null) {
          if (imgObj._DLimgData.time.requestResponse >= worstSpeedMs) {
            if (imgObj._DLimgData.time.isIgnoreSlow === false) {
              ++imgCounter.worstSpeed;
            }
            worstSpeedImgList.push(imgObj);
          }
        }
      });
      worstSpeedImgList = worstSpeedImgList.sort(function(a, b) {
        let a_isIgnoreSlow = a._DLimgData.time.isIgnoreSlow;
        let b_isIgnoreSlow = b._DLimgData.time.isIgnoreSlow;
        if (a_isIgnoreSlow === true && b_isIgnoreSlow === false) {
          return 1;
        }
        if (a_isIgnoreSlow === false && b_isIgnoreSlow === true) {
          return -1;
        }
        return a._DLimgData.time.requestResponse < b._DLimgData.time.requestResponse ? 1 : -1;
      });
      let imgCounterTableTag = "";
      let genPerImgCntHtml = function(totalCnt, cnt) {
        if (cnt < 1 || totalCnt < 1) {
          return " - ";
        }
        let per = Math.round(cnt / totalCnt * 100);
        return per + "%";
      };
      let countWarningColor = function(count) {
        if (count < 1) {
          return count;
        }
        return "<span class='important-msg'>" + count + "</span>";
      };
      imgCounterTableTag = "" + '<div class="img_count_area">\n' + "<table class='imgCountTable center'>\n" + "    <tr class='header'>\n" + '        <th rowspan="2"><div class="bckgcnon imgTableTitle ">' + l("imgtab_total_img_cnt") + "</div></th>\n" + '        <th rowspan="2"><div class="imgTableTitle bckgcnon">' + l("imgtab_without_alt_img") + "</div></th>\n" + '        <th colspan="2"><div class="imgTableTitle">' + l("imgtab_loading") + "</div></th>\n" + '        <th rowspan="2"><div class="imgTableTitle bckgcnon">' + 
      l("imgtab_js_load") + "</div></th>\n" + '        <th rowspan="2"><div class="imgTableTitle bckgcnon">' + l("imgtab_noscript") + "</div></th>\n" + "    </tr>\n" + "    <tr class='header'>\n" + '        <th><div class="imgTableTitle bckgcnon">' + l("imgtab_eager") + "</div></th>\n" + '        <th><div class="imgTableTitle bckgcnon">' + l("imgtab_lazy") + "</div></th>\n" + "    </tr>\n" + "    <tr>\n" + "        <td class='txtc imgCountVal'>" + totalImgCnt + "</td>\n" + "        <td class='txtc imgCountVal'>" + 
      countWarningColor(withoutAltImgCnt) + "</td>\n" + "        <td class='txtc imgCountVal'>" + loadingEagerImgCnt + "</td>\n" + "        <td class='txtc imgCountVal'>" + loadingLazyImgCnt + "</td>\n" + "        <td class='txtc imgCountVal'>" + jsLoadImgCnt + "</td>\n" + "        <td class='txtc imgCountVal'>" + noscriptImgCnt + "</td>\n" + "    </tr>\n" + "    <tr>\n" + "        <td class='txtc'></td>\n" + "        <td class='txtc'>" + genPerImgCntHtml(totalImgCnt, withoutAltImgCnt) + "</td>\n" + 
      "        <td class='txtc'>" + genPerImgCntHtml(totalImgCnt, loadingEagerImgCnt) + "</td>\n" + "        <td class='txtc'>" + genPerImgCntHtml(totalImgCnt, loadingLazyImgCnt) + "</td>\n" + "        <td class='txtc'>" + genPerImgCntHtml(totalImgCnt, jsLoadImgCnt) + "</td>\n" + "        <td class='txtc'>" + genPerImgCntHtml(totalImgCnt, noscriptImgCnt) + "</td>\n" + "    </tr>\n" + "    <tr>\n" + "        <td></td>\n" + "        <td></td>\n" + '        <td colspan="3" class=\'txtc\'><div class="imgTableTitle">' + 
      genPerImgCntHtml(totalImgCnt, loadingEagerImgCnt + loadingLazyImgCnt + jsLoadImgCnt) + "</div></td>\n" + "        <td></td>\n" + "    </tr>\n" + "</table>\n" + "</div>" + "" + "";
      outputHtml = outputHtml + imgCounterTableTag;
      imgCounterTableTag = "" + '<div class="img_count_area">\n' + "<table class='imgCountTable center'>\n" + "    <tr class='header'>\n" + '        <th><div class="imgTableTitle bckgcnon">' + l("imgtab_no_size_specified") + "</div></th>\n" + '        <th><div class="imgTableTitle bckgcnon">' + l("imgtab_next_gen_format") + "</div></th>\n" + '        <th><div class="imgTableTitle bckgcnon">' + worstSpeedMs + l("imgtab_ms_over") + "</div></th>\n" + '        <th><div class="imgTableTitle bckgcnon">' + 
      l("imgtab_img_rights") + "</div></th>\n" + "    </tr>\n" + "    <tr>\n" + "        <td class='txtc imgCountVal'>" + imgCounter.noImgSize + "</td>\n" + "        <td class='txtc imgCountVal'>" + imgCounter.newGenFormat + "</td>\n" + "        <td class='txtc imgCountVal'>" + imgCounter.worstSpeed + "</td>\n" + "        <td class='txtc imgCountVal'>" + imgCounter.rights + "</td>\n" + "    </tr>\n" + "    <tr>\n" + "        <td class='txtc'>" + genPerImgCntHtml(totalImgCnt, imgCounter.noImgSize) + 
      "</td>\n" + "        <td class='txtc'>" + genPerImgCntHtml(totalImgCnt, imgCounter.newGenFormat) + "</td>\n" + "        <td class='txtc'>" + genPerImgCntHtml(totalImgCnt, imgCounter.worstSpeed) + "</td>\n" + "        <td class='txtc'>" + genPerImgCntHtml(totalImgCnt, imgCounter.rights) + "</td>\n" + "    </tr>\n" + "</table>\n" + "</div>" + "";
      outputHtml = outputHtml + imgCounterTableTag;
      let genImgBlock = function(imgObjs, titleMsg, infoBtn, isDefaultHiddenSpeedTable = false, isHiddenImgRights = true) {
        let genHtml = "";
        let fileCnt = imgObjs.length;
        if (fileCnt <= 0) {
          return genHtml;
        }
        genHtml = genHtml + "<hr/>";
        genHtml = genHtml + ("<div class='contents-title'><span class='strong'>" + titleMsg + "</span> (" + fileCnt + ") " + infoBtn + "</div>");
        for (let i = 0; i < fileCnt; i++) {
          let imgObj = imgObjs[i];
          if (!isDefaultHiddenSpeedTable) {
            genHtml = genHtml + "<div class='defaultHiddenSpeedTable'>";
          }
          if (isHiddenImgRights) {
            genHtml = genHtml + "<div class='hiddenImgRights'>";
          }
          if (isEmpty(imgObj.genItemHtml)) {
            genHtml = genHtml + imgBlockItem(imgObj);
          } else {
            genHtml = genHtml + imgObj.genItemHtml;
          }
          if (isHiddenImgRights) {
            genHtml = genHtml + "</div>";
          }
          if (!isDefaultHiddenSpeedTable) {
            genHtml = genHtml + "</div>";
          }
          if (i + 1 >= fileCnt) {
            continue;
          }
          genHtml = genHtml + "<hr class='imgLine'/>";
        }
        genHtml = wrapReadMoreContents(genHtml, fileCnt, "", "imgBlock(" + titleMsg + ")");
        genHtml = wrapContentsArea(genHtml, titleMsg);
        return genHtml;
      };
      let titleMsg = "";
      let infoBtn = getTippyMouseOverInfoBtn("imgtab_list_no_alt");
      titleMsg = l("imgtab_without_alt_img");
      outputHtml = outputHtml + genImgBlock(withoutAltImgObjs, titleMsg, infoBtn);
      titleMsg = l("imgtab_with_alt_img");
      infoBtn = getTippyMouseOverInfoBtn("imgtab_list_with_alt");
      outputHtml = outputHtml + genImgBlock(withAltImgObjs, titleMsg, infoBtn);
      titleMsg = l("imgtab_title_lazy");
      infoBtn = getTippyMouseOverInfoBtn("imgtab_list_loading_lazy");
      outputHtml = outputHtml + genImgBlock(loadingLazyImgObjs, titleMsg, infoBtn);
      titleMsg = l("imgtab_title_eager");
      infoBtn = getTippyMouseOverInfoBtn("imgtab_list_loading_eager");
      outputHtml = outputHtml + genImgBlock(loadingEagerImgObjs, titleMsg, infoBtn);
      titleMsg = l("imgtab_title_noscript");
      infoBtn = getTippyMouseOverInfoBtn("imgtab_list_noscript");
      outputHtml = outputHtml + genImgBlock(noscriptImgObjs, titleMsg, infoBtn);
      titleMsg = l("imgtab_title_js_load");
      infoBtn = getTippyMouseOverInfoBtn("imgtab_list_js_load");
      outputHtml = outputHtml + genImgBlock(jsLoadImgObjs, titleMsg, infoBtn);
      titleMsg = l("imgtab_no_size_specified_title");
      infoBtn = getTippyMouseOverInfoBtn("imgtab_no_size_specified_desc");
      outputHtml = outputHtml + genImgBlock(noImgSizeList, titleMsg, infoBtn);
      let ms_unit = l("mili_sec");
      titleMsg = worstSpeedMs + ms_unit + l("imgtab_speed_slow_title");
      infoBtn = "";
      outputHtml = outputHtml + genImgBlock(worstSpeedImgList, titleMsg, infoBtn, true);
      titleMsg = l("imgtab_img_rights_title");
      infoBtn = "";
      outputHtml = outputHtml + genImgBlock(rightsImgObjs, titleMsg, infoBtn, false, false);
      _pageInfo.imgTabHtml = "";
      return outputHtml;
    }
    function initSocialTab() {
      let output = "";
      let outputHtml = "";
      let blockHtml = "";
      let tabCnt = 0;
      let socialTags = _headInfo.socialOgTags;
      let socialTwitterTags = _headInfo.socialTwTags;
      let socialFBTags = _headInfo.socialFbTags;
      tabCnt = socialTags.length + socialTwitterTags.length + socialFBTags.length;
      socialTags.sort(sortOgTag);
      socialTwitterTags.sort(sortTwitterTag);
      socialFBTags.sort(sortOgTag);
      let genOpenGraph = function(socialTags, titleKey, noDataTitle) {
        let blockHtml = "";
        let fileCnt = socialTags.length;
        if (fileCnt > 0) {
          blockHtml = "";
          for (let i in socialTags) {
            let metaObj = socialTags[i];
            let titleName = metaObj[titleKey];
            let content = metaObj.content;
            if (isImgExtension(content)) {
              content = content + addJsonLdImgTag(content);
            }
            if (isEmpty(content)) {
              content = "(no data)";
            }
            blockHtml = blockHtml + getTitleAndContent_noExtInfo(titleName, "", "", content, "html-desc", "", "cp");
          }
        } else {
          blockHtml = blockHtml + getMsgForMissing(noDataTitle);
        }
        return blockHtml;
      };
      blockHtml = "";
      blockHtml = blockHtml + "<div class='contents-title social'><span class='strong'>Open Graph(OGP)</span></div>";
      blockHtml = blockHtml + genOpenGraph(socialTags, "property", "OGP");
      blockHtml = wrapContentsArea(blockHtml, "open_graph");
      outputHtml = outputHtml + blockHtml;
      outputHtml = outputHtml + "<hr/>";
      blockHtml = "";
      blockHtml = blockHtml + "<div class='contents-title social'><span class='strong'>Twitter</span></div>";
      blockHtml = blockHtml + genOpenGraph(socialTwitterTags, "name", "Twitter Meta tag");
      blockHtml = wrapContentsArea(blockHtml, "twitter");
      outputHtml = outputHtml + blockHtml;
      outputHtml = outputHtml + "<hr/>";
      blockHtml = "";
      blockHtml = blockHtml + "<div class='contents-title social'><span class='strong'>Facebook</span></div>";
      blockHtml = blockHtml + genOpenGraph(socialFBTags, "property", "Facebook Meta tag");
      blockHtml = wrapContentsArea(blockHtml, "facebook");
      outputHtml = outputHtml + blockHtml;
      _pageInfo._socialList = "";
      _pageInfo.tabSocialCnt = tabCnt;
      _pageInfo.socialTabHtml = outputHtml;
    }
    function initToolTab() {
      let output = "";
      let outputHtml = "";
      let blockHtml = "";
      let tabCnt = 0;
      let createLinkBtn = function(toolUrl, linkUrl, btnTxt, toolId) {
        let tMsg = l("tool_desc_" + toolId);
        if (isEmpty(tMsg)) {
          tMsg = "";
        }
        let favIco = faviconImg(toolUrl, "vam");
        let linkTag = '<a class="btn-flat-border tool toolsBtn tippy" href="' + linkUrl + '" data-tool-id="' + toolId + '" target="_blank" rel="noopener noreferrer"  data-tpy-title="' + tMsg + '">' + favIco + '<span class="btn-tool-flat-text">' + btnTxt + "</span>" + "</a>";
        return linkTag;
      };
      let locationHref = window.location.href;
      let encodeUri = encodeURIComponent(locationHref);
      let $url = $.url(window.location.href);
      let urlHost = $url.attr("host");
      let similarweb_lng = "en";
      if (isJapanese()) {
        similarweb_lng = "ja";
      }
      let tools = [{groupName:"SEO", items:[{id:2, name:"PageSpeed", toolLink:"http://developers.google.com/speed/pagespeed/insights/?url=" + locationHref, iconUrl:"http://developers.google.com"}, {id:3, name:"GTmetrix", toolLink:"http://gtmetrix.com/?url=" + locationHref, iconUrl:"http://gtmetrix.com/"}, {id:1, name:"Google rich snippets validator", toolLink:"https://search.google.com/test/rich-results?url=" + encodeUri + "&user_agent=1", iconUrl:"https://search.google.com/structured-data/testing-tool"}, 
      {id:4, name:"Alexa", toolLink:"http://www.alexa.com/siteinfo/" + urlHost, iconUrl:"http://www.alexa.com/"}, {id:5, name:"Majestic.com", toolLink:"http://www.majesticseo.com/reports/site-explorer/summary/" + urlHost, iconUrl:"http://www.majesticseo.com/"}, {id:6, name:"WMtips(site info)", toolLink:"http://www.wmtips.com/tools/info/?url=" + locationHref, iconUrl:"http://www.wmtips.com/"}, {id:7, name:"WMtips(Keyword)", toolLink:"https://www.wmtips.com/tools/keyword-density-analyzer/?&url=" + 
      locationHref, iconUrl:"https://www.wmtips.com/"}, {id:8, name:"MetricSpot", toolLink:"http://www.metricspot.com/", iconUrl:"http://www.metricspot.com/"}, {id:9, name:"ahrefs", toolLink:"https://app.ahrefs.com/site-explorer/overview/v2/exact/live?target=" + locationHref, iconUrl:"https://app.ahrefs.com/"}, {id:10, name:"similarweb", toolLink:"https://www.similarweb.com/" + similarweb_lng + "/website/" + urlHost, iconUrl:"https://www.similarweb.com/"}, {id:11, name:"SEO cheki", toolLink:"https://seocheki.net/site-check.php?u=" + 
      locationHref, iconUrl:"https://seocheki.net/"}, {id:12, name:"GoogleSearchConsole", toolLink:"https://search.google.com/search-console/performance/search-analytics?resource_id=" + $url.attr("base") + "/&page=*" + $url.attr("path"), iconUrl:"https://search.google.com/search-console/"}]}, {groupName:"HTML", items:[{id:50, name:"Mobile-Friendly Test", toolLink:"https://search.google.com/test/mobile-friendly?referer=seo-extension.com&url=" + encodeUri, iconUrl:"https://search.google.com/test/mobile-friendly"}, 
      {id:51, name:"W3.org - HTML", toolLink:"http://validator.w3.org/nu/?doc=" + locationHref, iconUrl:"http://validator.w3.org/"}, {id:52, name:"W3.org - CSS", toolLink:"https://jigsaw.w3.org/css-validator/validator?uri=" + locationHref, iconUrl:"https://jigsaw.w3.org"}, {id:53, name:"RESPONSINATOR", toolLink:"https://www.responsinator.com/?url=" + locationHref, iconUrl:"https://www.responsinator.com/"}, {id:54, name:"WhatIsMyScreenResolution", toolLink:"http://whatismyscreenresolution.net/multi-screen-test?site-url=" + 
      locationHref + "&w=414&h=736", iconUrl:"http://whatismyscreenresolution.net/"}]}, {groupName:"SNS", items:[{id:70, name:"Facebook debugger", toolLink:"https://developers.facebook.com/tools/debug/?q=" + encodeUri, iconUrl:"https://www.facebook.com/"}, {id:71, name:"Twitter Card Validator", toolLink:"https://cards-dev.twitter.com/validator", iconUrl:"https://twitter.com/"}, {id:72, name:"Pinterest Validator", toolLink:"https://developers.pinterest.com/tools/url-debugger/?link=" + encodeUri, iconUrl:"http://developers.pinterest.com/"}, 
      {id:73, name:"Tweet", toolLink:"https://twitter.com/search?f=tweets&q=" + locationHref, iconUrl:"https://twitter.com/"}]}, {groupName:"Security/Malware", items:[{id:90, name:"McAfee SiteAdvisor", toolLink:"http://www.siteadvisor.com/sites/" + urlHost, iconUrl:"http://www.siteadvisor.com"}, {id:91, name:"Safe Browsing (Google)", toolLink:"http://www.google.com/safebrowsing/diagnostic?site=" + urlHost, iconUrl:"http://www.google.com/"}]}, {groupName:"Others", items:[{id:107, name:"Google search(site:)", 
      toolLink:"https://www.google.com/search?q=site:" + encodeUri + "&gws_rd=cr,ssl", iconUrl:"https://www.google.com"}, {id:101, name:"Similar pages (Google)", toolLink:"https://www.google.com/search?q=related:" + encodeUri + "&gws_rd=cr,ssl", iconUrl:"https://www.google.com"}, {id:102, name:"Links to this page (Google)", toolLink:"https://www.google.com/search?q=link:" + encodeUri + "&gws_rd=cr,ssl", iconUrl:"https://www.google.com"}, {id:103, name:"Google Images", toolLink:"https://www.google.com/search?tbm=isch&q=site:" + 
      locationHref, iconUrl:"https://www.google.com"}, {id:100, name:"dnsquery.org - WHOIS", toolLink:"https://dnsquery.org/whois/" + urlHost.replace("www.", ""), iconUrl:"https://dnsquery.org"}, {id:104, name:"SERPAnalytics.com", toolLink:"http://www.serpanalytics.com/sites/" + urlHost, iconUrl:"http://www.serpanalytics.com"}, {id:105, name:"quantcast.com", toolLink:"https://www.quantcast.com/" + urlHost, iconUrl:"https://www.quantcast.com"}, {id:106, name:"ReactionEngine.com", toolLink:"https://www.reactionengine.com/analyse?keyphrase=&uri=" + 
      encodeUri, iconUrl:"https://www.reactionengine.com"}]}];
      let favoriteItems = t.getFavorites(tools, _toolCnts, 5, 10);
      let createLinkBtnGroup = function(groupItems) {
        let linkBtn = "";
        $(groupItems).each(function(i, toolLinkItem) {
          let toolUrl = toolLinkItem.iconUrl;
          let linkUrl = toolLinkItem.toolLink;
          let btnTxt = toolLinkItem.name;
          if (isEmpty(btnTxt) || btnTxt === "xxxx") {
            return true;
          }
          linkBtn = linkBtn + createLinkBtn(toolUrl, linkUrl, btnTxt, toolLinkItem.id);
        });
        return linkBtn;
      };
      let createToolsHtml = itemList => {
        let html = "";
        $(itemList).each(function(i, group) {
          let titleName = group.groupName;
          if (isEmpty(titleName)) {
            return true;
          }
          let content = createLinkBtnGroup(group.items);
          titleName = titleName + " (" + group.items.length + ")";
          html = html + getTitleAndContent_noExtInfo(titleName, "", "", content, "html-desc", "", "");
          html = html + "<hr />";
        });
        return html;
      };
      if (favoriteItems.length > 0) {
        let f_tools = [{groupName:l("favorite_tool"), items:favoriteItems}];
        blockHtml = blockHtml + createToolsHtml(f_tools);
      }
      blockHtml = blockHtml + createToolsHtml(tools);
      outputHtml = wrapContentsArea(blockHtml, "tools-1");
      _pageInfo.tabToolCnt = tabCnt;
      _pageInfo.toolTabHtml = outputHtml;
    }
    function getTippyMouseOverInfoBtn(msg_id, directMsg = "") {
      let tooltipMsg = "";
      if (isNotEmpty(directMsg)) {
        tooltipMsg = directMsg;
      } else {
        tooltipMsg = l(msg_id);
      }
      return "" + '<span class="mini-btn mini-act-btn info nocursor tippy" data-tpy-title="' + tooltipMsg + '" >' + '    <i class="fa-info-circle"></i>' + "</span>";
    }
    function createImgObj() {
      return {src:"", alt:"", fileName:"", dataSrc:"", isLoadingLazy:false, isLoadingEager:false, isNoscript:false, isJsLoad:false, genItemHtml:""};
    }
    function adjustUrlPath(path) {
      if (isEmpty(path)) {
        return "";
      }
      let protocol = document.location.protocol;
      let domain = document.domain;
      if (path.indexOf("https:") === 0) {
        return path;
      }
      if (path.indexOf("http:") === 0) {
        return path;
      }
      if (path.indexOf("//") === 0) {
        return protocol + path;
      }
      if (path.indexOf("/") === 0) {
        return protocol + "//" + domain + path;
      }
      if (path.indexOf("../") === 0) {
        return protocol + "//" + domain + "/" + path;
      }
      let newFullPath = $("<a>").attr("href", path).get(0).href;
      return newFullPath;
    }
    function getHeadInfo() {
      if (_headInfo !== null && _headInfo !== undefined) {
        return _headInfo;
      }
      _headInfo = {};
      let headElementsObject = $("head").children().sort(sortOnTagName).clone();
      let isSocialMetaObj = function(metaObj, dataId, prefix) {
        if (metaObj === null) {
          return false;
        }
        let checkData = metaObj[dataId];
        if (isEmpty(checkData)) {
          return false;
        }
        checkData = checkData.toLowerCase().trim();
        if (checkData.indexOf(prefix + ":") === 0) {
          return true;
        }
        return false;
      };
      _headInfo.linksTab = [];
      _headInfo.scriptsTab = [];
      _headInfo.metasTab = [];
      _headInfo.socialOgTags = [];
      _headInfo.socialTwTags = [];
      _headInfo.socialFbTags = [];
      _headInfo.styleTab = [];
      let content = "";
      $(headElementsObject).each(function() {
        let tagName = $(this).prop("tagName").toLowerCase();
        switch(tagName) {
          case "link":
            content = getLinkContent(this);
            if (isNotEmpty(content)) {
              _headInfo.linksTab[_headInfo.linksTab.length] = content;
            }
            break;
          case "script":
            content = getScriptContent(this);
            if (content !== "" && content !== undefined && content !== "undefined") {
              _headInfo.scriptsTab[_headInfo.scriptsTab.length] = content;
            }
            break;
          case "meta":
            let metaObj = createMetaObj(this);
            if (metaObj !== null) {
              if (isSocialMetaObj(metaObj, "property", "og")) {
                _headInfo.socialOgTags[_headInfo.socialOgTags.length] = metaObj;
              }
              if (isSocialMetaObj(metaObj, "property", "music")) {
                _headInfo.socialOgTags[_headInfo.socialOgTags.length] = metaObj;
              } else if (isSocialMetaObj(metaObj, "name", "twitter")) {
                _headInfo.socialTwTags[_headInfo.socialTwTags.length] = metaObj;
              } else if (isSocialMetaObj(metaObj, "property", "fb")) {
                _headInfo.socialFbTags[_headInfo.socialFbTags.length] = metaObj;
              }
              content = getMetaContent(this, metaObj);
              if (isNotEmpty(content)) {
                _headInfo.metasTab[_headInfo.metasTab.length] = content;
              }
            }
            break;
          case "style":
            let bytes = getStyleTagContent(this);
            _headInfo.styleTab[_headInfo.styleTab.length] = bytes;
            break;
          case "title":
          case "base":
            break;
          default:
            logging("head tag not support: " + tagName);
        }
      });
      return _headInfo;
    }
    function getStyleTagInfo() {
      let headElementsObject = $("style").sort(sortOnTagName).clone();
      let styleTab = [];
      $(headElementsObject).each(function() {
        let tagName = $(this).prop("tagName").toLowerCase();
        switch(tagName) {
          case "style":
            let bytes = getStyleTagContent(this);
            styleTab[styleTab.length] = bytes;
            break;
          default:
            break;
        }
      });
      return styleTab;
    }
    function getScriptTagInfo() {
      let headElementsObject = $("script").sort(sortOnTagName).clone();
      let scriptsTab = [];
      $(headElementsObject).each(function() {
        let tagName = $(this).prop("tagName").toLowerCase();
        switch(tagName) {
          case "script":
            let ct = getScriptContent(this);
            if (isNotEmpty(ct)) {
              scriptsTab[scriptsTab.length] = ct;
            }
            break;
          default:
            break;
        }
      });
      return scriptsTab;
    }
    function getLinkTagInfo(target, ignores = []) {
      let headElementsObject = $("link").sort(sortOnTagName).clone();
      let tags = [];
      $(headElementsObject).each(function() {
        let tagName = $(this).prop("tagName").toLowerCase();
        switch(tagName) {
          case "link":
            let ct = getLinkContent(this, target, ignores);
            if (isNotEmpty(ct)) {
              tags[tags.length] = ct;
            }
            break;
          default:
            break;
        }
      });
      return tags;
    }
    function checkCms() {
      _cmsInfo = {};
      let isCmsWp = false;
      let wpThemeList = [];
      let srcUrls = [];
      let linkStyleSheets = $("link[rel='stylesheet']");
      $(linkStyleSheets).each(function() {
        let href = $(this).attr("href");
        if (isEmpty(href)) {
          return true;
        }
        let isWpCnt = !(href.indexOf("wp-content") < 0);
        if (!isWpCnt && href.indexOf("wp-includes") < 0) {
          return true;
        }
        isCmsWp = true;
        if (isWpCnt) {
          srcUrls.push(href);
          let wpTheme = getWordPressThemeName(href);
          if (wpTheme !== "" && wpThemeList.indexOf(wpTheme) < 0) {
            wpThemeList.push(wpTheme);
          }
        }
      });
      getImgTags().each(function() {
        let src = $(this).attr("src");
        if (isEmpty(src)) {
          return true;
        }
        let isWpCnt = !(src.indexOf("wp-content") < 0);
        if (!isWpCnt && src.indexOf("wp-includes") < 0) {
          return true;
        }
        isCmsWp = true;
        if (isWpCnt) {
          let wpTheme = getWordPressThemeName(src);
          if (wpTheme !== "" && wpThemeList.indexOf(wpTheme) < 0) {
            wpThemeList.push(wpTheme);
          }
        }
      });
      let wpThemeStyles = function(wpThemeList, styleTagTxt) {
        let result = false;
        $(["has-sango-"]).each(function(i, txt) {
          if (styleTagTxt.indexOf(txt) > 0) {
            wpThemeList.push("sango-theme");
            result = true;
            return false;
          }
        });
        return result;
      };
      if (wpThemeList.length === 0) {
        $("style").each(function() {
          if (wpThemeStyles(wpThemeList, $(this).text())) {
            isCmsWp = true;
            return true;
          }
          let styleTagId = $(this).attr("id");
          if (isEmpty(styleTagId)) {
            return true;
          }
          if (styleTagId.indexOf("sango_theme") >= 0) {
            wpThemeList.push("sango");
          }
        });
      }
      if (isCmsWp && wpThemeList.length === 0) {
        $("script").each(function() {
          let src = $(this).attr("src");
          if (isEmpty(src)) {
            return true;
          }
          let isWpCnt = !(src.indexOf("wp-content") < 0);
          if (!isWpCnt) {
            return true;
          }
          isCmsWp = true;
          if (isWpCnt) {
            let wpTheme = getWordPressThemeName(src);
            if (wpTheme !== "" && wpThemeList.indexOf(wpTheme) < 0) {
              wpThemeList.push(wpTheme);
            }
          }
        });
      }
      if (wpThemeList.length === 0 && srcUrls.length > 0) {
        for (let i = 0; i < srcUrls.length; i++) {
          let url = srcUrls[i];
          let scriptTxt = loadInPageScript(url);
          if (scriptTxt !== "") {
            let wpTheme = getWordPressThemeName(scriptTxt);
            if (wpTheme !== "" && wpThemeList.indexOf(wpTheme) < 0) {
              wpThemeList.push(wpTheme);
            }
          }
        }
      }
      _cmsInfo = {"isCmsWp":isCmsWp, "wpThemes":wpThemeList};
    }
    function getImgTags() {
      if ($_imgTags !== null && $_imgTags !== undefined) {
        return $_imgTags;
      }
      $_imgTags = $("img");
      return $_imgTags;
    }
    function getNoscriptTags() {
      if ($_noscriptTags !== null && $_noscriptTags !== undefined) {
        return $_noscriptTags;
      }
      $_noscriptTags = $("noscript");
      return $_noscriptTags;
    }
    function loadInPageScript(url) {
      let result = "";
      $.ajax({type:"GET", url:url, async:false, success:function(msg) {
        result = msg;
        return msg;
      }, error:function(msg) {
        return "";
      }});
      return result;
    }
    function getWordPressThemeName(urlPath) {
      let result = urlPath.match(/\/wp-content\/themes\/([-_a-zA-Z0-9]+)\//);
      if (result !== null && result.length === 2) {
        return result[1];
      }
      return "";
    }
    function getLinkContent(elmt, target = "", ignoreRels = []) {
      let contentUtil = "";
      if ($(elmt).prop("tagName").toLowerCase() === "link") {
        let href = $(elmt).attr("href");
        let rel = $(elmt).attr("rel");
        let type = $(elmt).attr("type");
        let hreflang = $(elmt).attr("hreflang");
        if (!isAnExtra(rel)) {
          return "";
        }
        rel = lowerTrim(rel);
        type = lowerTrim(type);
        hreflang = lowerTrim(hreflang);
        if (isNotEmpty(target)) {
          if (rel !== target) {
            return "";
          }
        }
        if (ignoreRels.length > 0) {
          if (ignoreRels.includes(rel)) {
            return "";
          }
        }
        let imageName = getLastRightPartOfUrl(href);
        href = getHref(href);
        let hrefSliced = myStringSlice(href);
        let newHref = imageName;
        if (isAnImage(rel)) {
          newHref = "<span class='tippy' data-tpy-img-src='" + href + "'><a href='" + href + "'  class='' title='" + myStringSlice(rel) + "' target='_blank' rel=\"noopener noreferrer\" >" + imageName + "</a></span>";
        } else if (isRelAnLink(rel)) {
          if (rel.toLowerCase() === "alternate" || rel.toLowerCase() === "edituri") {
            hreflang = $(elmt).attr("hreflang");
            if (isNotEmpty(type)) {
              newHref = "<span><a href='" + href + "'  class='' title='" + hrefSliced + "' target='_blank' rel=\"noopener noreferrer\" >" + imageName + "</a> (" + type + ")</span>";
            } else if (isNotEmpty(hreflang)) {
              newHref = "<span><a href='" + href + "'  class='' title='" + hrefSliced + "' target='_blank' rel=\"noopener noreferrer\" >" + imageName + "</a> </span>";
            } else {
              newHref = "<span><a href='" + href + "'  class='' title='" + hrefSliced + "' target='_blank' rel=\"noopener noreferrer\" >" + imageName + "</a></span>";
            }
          } else {
            newHref = "<span ><a href='" + href + "' title='" + hrefSliced + "' target='_blank' class='' rel=\"noopener noreferrer\" >" + imageName + "</a></span>";
          }
        }
        contentUtil = getMetaKeyVal("links", rel, newHref);
      }
      return contentUtil;
    }
    function getScriptContent(elmt) {
      let contentUtil = "";
      if ($(elmt).prop("tagName").toLowerCase() === "script") {
        let src = $(elmt).attr("src");
        let type = $(elmt).attr("type");
        let fileName = getLastRightPartOfUrl(src);
        src = getHref(src);
        if (isEmpty(src)) {
          contentUtil = "";
        } else {
          let ctt = "<span><a href='" + src + "'  title='" + myStringSlice(src) + "' target='_blank' rel=\"noopener noreferrer\" >" + faviconImg(src) + " " + fileName + "</a></span>";
          if (isEmpty(type)) {
            contentUtil = getMetaKeyVal("script", "Script", ctt);
          } else {
            contentUtil = getMetaKeyVal("script", type, ctt);
          }
        }
      }
      return contentUtil;
    }
    function getStyleTagContent(elmt) {
      let bytes = 0;
      if ($(elmt).prop("tagName").toLowerCase() === "style") {
        let str2 = $(elmt).html();
        bytes = calcStrBytes(str2);
      }
      return bytes;
    }
    function createMetaObj(element) {
      if ($(element).prop("tagName").toLowerCase() !== "meta") {
        return null;
      }
      return {charset:$(element).attr("charset"), content:$(element).attr("content"), name:$(element).attr("name"), property:$(element).attr("property"), http_equiv:$(element).attr("http-equiv"), itemprop:$(element).attr("itemprop")};
    }
    function getMetaContent(element, metaObj) {
      let contentUtil = "";
      let charset = metaObj.charset;
      let content = metaObj.content;
      let name = metaObj.name;
      let property = metaObj.property;
      let httpEquiv = metaObj.http_equiv;
      let itemprop = metaObj.itemprop;
      let partLeft = "";
      if (isNotEmpty(name)) {
        partLeft = name.trim();
        if (!isAnExtra(partLeft)) {
          return "";
        }
      } else if (isNotEmpty(property)) {
        partLeft = property.trim();
      } else if (isNotEmpty(charset)) {
        partLeft = "charset";
        content = charset;
      } else if (isNotEmpty(itemprop)) {
        partLeft = "itemprop (" + itemprop.trim() + ")";
      } else if (isNotEmpty(httpEquiv)) {
        partLeft = "http-equiv (" + httpEquiv.trim() + ")";
      } else {
        partLeft = "undefined";
      }
      if (isAnImage(partLeft)) {
        let imageName = getLastRightPartOfUrl(content);
        let href = getHref(content);
        content = "<span class='tippy' data-tpy-img-src='" + href + "'><a href='" + href + "' class='' title='" + myStringSlice(imageName) + "' target='_blank' rel=\"noopener noreferrer\" >" + imageName + "</a></span>";
      } else if (isMetaNameAnLink(partLeft)) {
        let imageName = getLastRightPartOfUrl(content);
        let href = getHref(content);
        content = "<span><a href='" + href + "' title='" + myStringSlice(href) + "' target='_blank'  rel=\"noopener noreferrer\" >" + imageName + "</a></span>";
      }
      partLeft = addMetaBtnTagHtml(partLeft);
      contentUtil = getMetaKeyVal("meta", partLeft, content);
      return contentUtil;
    }
    function isAnImage(rel) {
      if (isEmpty(rel)) {
        return false;
      }
      let newRel = rel.toLowerCase();
      if (newRel.indexOf("height") >= 0 || newRel.indexOf("width") >= 0) {
        return false;
      }
      if (newRel.indexOf("icon") >= 0 || newRel.indexOf("image") >= 0) {
        return true;
      }
      return false;
    }
    function isRelAnLink(rel) {
      if (isEmpty(rel)) {
        return false;
      }
      let newRel = rel.toLowerCase();
      if (newRel.indexOf("stylesheet") >= 0 || newRel.indexOf("link") >= 0 || newRel.indexOf("search") >= 0 || newRel.indexOf("dns") >= 0 || newRel.indexOf("profile") >= 0 || newRel.indexOf("uri") >= 0 || newRel.indexOf("next") >= 0 || newRel.indexOf("previous") >= 0 || newRel.indexOf("publisher") >= 0 || newRel.indexOf("pingback") >= 0 || newRel.indexOf("alternate") >= 0) {
        return true;
      }
      return false;
    }
    function isMetaNameAnLink(rel) {
      if (isEmpty(rel)) {
        return false;
      }
      let newRel = rel.toLowerCase();
      if (newRel.indexOf("url") >= 0) {
        return true;
      }
      return false;
    }
    function getLastRightPartOfUrl(urlIn) {
      if (isEmpty(urlIn)) {
        return "";
      }
      let imageName = $.url(urlIn).segment(-1);
      if ($.trim(imageName) === "") {
        imageName = $.url(urlIn).segment(1);
      }
      if (imageName === "") {
        if (!(urlIn == null || $.trim(urlIn) === "")) {
          imageName = urlIn;
        }
      }
      return imageName;
    }
    function getHref(href) {
      return t.getHref(href);
    }
    function isAnExtra(input) {
      let extras = ["canonical", "description", "keywords"];
      return !t.isExistList(input, extras);
    }
    function getPublisherContent() {
      let content = getLinkByRel("publisher");
      if (getStringLength(content) !== 0) {
        content = "<span><a href='" + content + "'  target='_blank' rel=\"noopener noreferrer\" >" + content + "</a></span>";
      } else {
        content = "";
      }
      return content;
    }
    function getAuthorContent() {
      let content = getLinkByRel("author");
      if (getStringLength(content) !== 0) {
        content = "<span><a href='" + content + "'  target='_blank' rel=\"noopener noreferrer\" >" + content + "</a></span>";
      } else {
        content = "";
      }
      return content;
    }
    function lowerTrim(toTrim) {
      return t.lowerTrim(toTrim);
    }
    function getHtmlLang() {
      let ct = $("html").attr("lang");
      if (isEmpty(ct)) {
        ct = getMsgForMissing("lang");
      }
      return ct;
    }
    async function getWebVitals() {
      addProgressTotalCnt(2);
      let formFactor = "PHONE";
      let pageUrl = window.location.href;
      let waitItems = [];
      _CrUXFieldData = [];
      let getFieldData = function(pageUrl, formFactor) {
        return getCrUXData(pageUrl, formFactor).then(fieldData => {
          parseFieldData(fieldData, formFactor);
        }).catch(e => {
          console.warn("Unable to load any CrUX data", formFactor, e);
        }).finally(a => {
          addProgressCnt(1);
        });
      };
      let parseFieldData = function(fieldData, formFactor) {
        let ret = {};
        ret["key"] = fieldData.record.key;
        ["cls", "fcp", "fid", "lcp"].forEach(function(val, i) {
          ret[val] = {};
          ret[val]["histogram"] = {};
          ret[val]["assessments"] = {};
        });
        if (isNotEmpty(fieldData.record.metrics.cumulative_layout_shift)) {
          ret["cls"]["histogram"] = fieldData.record.metrics.cumulative_layout_shift.histogram;
          ret["cls"]["percentiles"] = fieldData.record.metrics.cumulative_layout_shift.percentiles.p75;
        }
        if (isNotEmpty(fieldData.record.metrics.first_contentful_paint)) {
          ret["fcp"]["histogram"] = fieldData.record.metrics.first_contentful_paint.histogram;
          ret["fcp"]["percentiles"] = fieldData.record.metrics.first_contentful_paint.percentiles.p75;
        }
        if (isNotEmpty(fieldData.record.metrics.first_input_delay)) {
          ret["fid"]["histogram"] = fieldData.record.metrics.first_input_delay.histogram;
          ret["fid"]["percentiles"] = fieldData.record.metrics.first_input_delay.percentiles.p75;
        }
        if (isNotEmpty(fieldData.record.metrics.largest_contentful_paint)) {
          ret["lcp"]["histogram"] = fieldData.record.metrics.largest_contentful_paint.histogram;
          ret["lcp"]["percentiles"] = fieldData.record.metrics.largest_contentful_paint.percentiles.p75;
        }
        let assessmentsCollect = function(histogram) {
          let assessments = {good:0, needs:0, poor:0};
          if (isEmptyObj(histogram)) {
            return assessments;
          }
          assessments = {good:histogram[0]["density"], needs:histogram[1]["density"], poor:histogram[2]["density"]};
          if (assessments.good === undefined) {
            assessments.good = 0;
          }
          if (assessments.needs === undefined) {
            assessments.needs = 0;
          }
          if (assessments.poor === undefined) {
            assessments.poor = 0;
          }
          return assessments;
        };
        ["cls", "fcp", "fid", "lcp"].forEach(function(val, i) {
          ret[val]["assessments"] = assessmentsCollect(ret[val]["histogram"]);
        });
        _CrUXFieldData[formFactor] = ret;
      };
      waitItems.push(getFieldData(pageUrl, formFactor));
      formFactor = "DESKTOP";
      waitItems.push(getFieldData(pageUrl, formFactor));
      return Promise.all(waitItems);
    }
    async function getCrUXData(pageUrl, formFactor) {
      const apiKey = "AIzaSyCl4uYDenZ8qptcZcgMjOpgXy82JE1LMt4";
      const ENDPOINT = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${apiKey}`;
      const urlHelper = new URL(pageUrl);
      const url = urlHelper.href;
      const request = {url, formFactor};
      return fetch(ENDPOINT, {method:"POST", body:JSON.stringify(request)}).then(response => {
        return response.json();
      }).then(response => {
        if (response.error) {
          return Promise.reject(response);
        }
        return response;
      });
    }
    function genCoreWebVitalsHtml() {
      let blockHtml = "";
      let genScoreHtml = function(cwvKey, platForm, fieldData) {
        let scoreHtml = "";
        let goodPer = -1;
        let needsPer = -1;
        let poorPer = -1;
        let isNoScore = true;
        if (!isEmpty(fieldData)) {
          if (!isEmptyObj(fieldData["assessments"])) {
            isNoScore = false;
          }
          if (fieldData["assessments"]["good"] === 0 && fieldData["assessments"]["needs"] === 0 && fieldData["assessments"]["poor"] === 0) {
            isNoScore = true;
          }
        }
        if (!isNoScore) {
          goodPer = Math.round(fieldData["assessments"]["good"] * 100);
          needsPer = Math.round(fieldData["assessments"]["needs"] * 100);
          poorPer = 100 - goodPer - needsPer;
        }
        let genPercentageBar = function(per, cwvKey) {
          let bar = "";
          let perStr = "";
          if (per >= 10) {
            perStr = `<div class="percentage-bar-num">${per}%</div>`;
          }
          let rankLabel = l("cwv_rank_" + cwvKey);
          let tippyMsg = `${rankLabel} : ${per}%`;
          bar = `<div class="percentage-bar tippy" style="flex: ${per};" data-tpy-title="${tippyMsg}">${perStr}</div>`;
          return bar;
        };
        let genNoScorePercentageBar = function() {
          let perStr = `<div class="percentage-bar-num">--%</div>`;
          let bar = `<div class="percentage-bar noScore" style="flex: 100;">${perStr}</div>`;
          return bar;
        };
        if (!isNoScore) {
          scoreHtml = genPercentageBar(goodPer, "good") + genPercentageBar(needsPer, "needs") + genPercentageBar(poorPer, "poor");
        } else {
          scoreHtml = genNoScorePercentageBar();
        }
        let iconClass = "fa-laptop";
        if (platForm === "PHONE") {
          iconClass = "fa-mobile-alt";
        }
        let platFormIcon = `<span class="cwvPlatformIcon"><i class="${iconClass}"></i></span>`;
        scoreHtml = `<div class="percentage-bar-wrap bar-cwv">${platFormIcon}${scoreHtml}</div>`;
        return scoreHtml;
      };
      let genFiledDataScore = function(cwvKey, fieldData_m, fieldData_d) {
        let scoreHtml = "";
        const CWV_TITLES = {"fcp":"First Contentful Paint\uff08FCP\uff09", "fid":"First Input Delay\uff08FID\uff09", "lcp":"Largest Contentful Paint\uff08LCP\uff09", "cls":"Cumulative Layout Shift\uff08CLS\uff09"};
        scoreHtml = scoreHtml + `<div><span class="cwvTitle">${CWV_TITLES[cwvKey]}</span></div>`;
        scoreHtml = scoreHtml + ("" + genScoreHtml(cwvKey, "PHONE", fieldData_m));
        scoreHtml = scoreHtml + ("" + genScoreHtml(cwvKey, "DESKTOP", fieldData_d));
        return scoreHtml;
      };
      blockHtml = blockHtml + `<div class='cwvTitle miniTitleSpace'>${l("cwv_field_data")}</div>`;
      if (isEmptyObj(_CrUXFieldData)) {
        blockHtml = blockHtml + l("cwv_field_data_not_found");
      } else {
        let allCwvHtml = "";
        ["fcp", "fid", "lcp", "cls"].forEach(function(cwvKey, i) {
          let fieldData_m = null;
          let fieldData_d = null;
          if (isNotEmpty(_CrUXFieldData["PHONE"]) && isNotEmpty(_CrUXFieldData["PHONE"][cwvKey])) {
            fieldData_m = _CrUXFieldData["PHONE"][cwvKey];
          }
          if (isNotEmpty(_CrUXFieldData["DESKTOP"]) && isNotEmpty(_CrUXFieldData["DESKTOP"][cwvKey])) {
            fieldData_d = _CrUXFieldData["DESKTOP"][cwvKey];
          }
          let tmp = genFiledDataScore(cwvKey, fieldData_m, fieldData_d);
          allCwvHtml = allCwvHtml + `<div class="fieldDataBlock" >${tmp}</div>`;
        });
        blockHtml = blockHtml + `<div class="fieldDataList" >${allCwvHtml}</div>`;
        let genPercentilesHtml = function(cwvKey, platForm, crUXFieldData) {
          let html = "";
          let fieldData = null;
          const defaultRet = "<div class='cwvPercTile cwv_none_val'>-</div>";
          if (isEmpty(crUXFieldData[platForm]) || isEmpty(crUXFieldData[platForm][cwvKey])) {
            return defaultRet;
          }
          fieldData = crUXFieldData[platForm][cwvKey];
          let percentiles = fieldData["percentiles"];
          if (isEmpty(percentiles)) {
            return defaultRet;
          }
          let cwvRankClass = "";
          const goodPoorThresholds = {"fcp":{good:1800, poor:3000}, "fid":{good:100, poor:300}, "lcp":{good:2500, poor:4000}, "cls":{good:0.10, poor:0.25}};
          let thresholds = goodPoorThresholds[cwvKey];
          if (thresholds.good > percentiles) {
            cwvRankClass = "cwv_good_val";
          } else if (thresholds.poor < percentiles) {
            cwvRankClass = "cwv_poor_val";
          } else {
            cwvRankClass = "cwv_needs_val";
          }
          if (cwvKey === "cls") {
          } else if (cwvKey === "fid") {
          } else {
            percentiles = Math.round(percentiles / 100) / 10;
          }
          let unit = l("cwv_percentiles_unit_" + cwvKey);
          html = html + ("<div class='cwvPercTile " + cwvRankClass + "'>" + percentiles + "<span class='cwvPercentilesUnit'>" + unit + "</span></div>");
          return html;
        };
        let counterPhonesRow = "";
        let counterDesktopRow = "";
        counterPhonesRow = "" + "    <tr>\n" + "        <td class='txtc iconCol'><span class=''><i class='fa-mobile-alt'></i></span></td>\n" + "        <td class='txtr imgCountVal'>" + genPercentilesHtml("fcp", "PHONE", _CrUXFieldData) + "</td>\n" + "        <td class='txtr imgCountVal'>" + genPercentilesHtml("fid", "PHONE", _CrUXFieldData) + "</td>\n" + "        <td class='txtr imgCountVal'>" + genPercentilesHtml("lcp", "PHONE", _CrUXFieldData) + "</td>\n" + "        <td class='txtr imgCountVal'>" + 
        genPercentilesHtml("cls", "PHONE", _CrUXFieldData) + "</td>\n" + "    </tr>\n" + "" + "";
        counterDesktopRow = "" + "    <tr>\n" + "        <td class='txtc iconCol'><span class='__cwvPlatformIcon __iconCol'><i class='fa-laptop'></i></span></td>\n" + "        <td class='txtr imgCountVal'>" + genPercentilesHtml("fcp", "DESKTOP", _CrUXFieldData) + "</td>\n" + "        <td class='txtr imgCountVal'>" + genPercentilesHtml("fid", "DESKTOP", _CrUXFieldData) + "</td>\n" + "        <td class='txtr imgCountVal'>" + genPercentilesHtml("lcp", "DESKTOP", _CrUXFieldData) + "</td>\n" + "        <td class='txtr imgCountVal'>" + 
        genPercentilesHtml("cls", "DESKTOP", _CrUXFieldData) + "</td>\n" + "    </tr>\n" + "" + "";
        let counterTableTag = "" + '<div class="cwvPercTitles_area">\n' + "<table class='imgCountTable center'>\n" + "    <tr class='header'>\n" + "        <td class='iconCol'></td>\n" + '        <th><div class="imgTableTitle bckgcnon tippy" data-tpy-title=\'' + l("cwv_desc_fcp") + "'>FCP</div></th>\n" + '        <th><div class="imgTableTitle bckgcnon tippy" data-tpy-title=\'' + l("cwv_desc_fid") + "'>FID</div></th>\n" + '        <th><div class="imgTableTitle bckgcnon tippy" data-tpy-title=\'' + 
        l("cwv_desc_lcp") + "'>LCP</div></th>\n" + '        <th><div class="imgTableTitle bckgcnon tippy" data-tpy-title=\'' + l("cwv_desc_cls") + "'>CLS</div></th>\n" + "    </tr>\n" + counterPhonesRow + counterDesktopRow + "</table>\n" + "</div>" + "";
        blockHtml = blockHtml + counterTableTag;
      }
      return blockHtml;
    }
    function createJsonLdList(contentJson, addHtml, level, parentName = "") {
      let addHtmlFunc = function(key, val, level) {
        let tmpKey = removeKeyHeadAt(key);
        let html = generateItemHtml(tmpKey, val, level);
        return html;
      };
      let tmpKey = "";
      if (isArray(contentJson)) {
        for (let i = 0; i < contentJson.length; i++) {
          let jsonP = contentJson[i];
          let jsTp = typeof jsonP;
          switch(jsTp) {
            case "string":
              addHtml = addHtml + addHtmlFunc("", jsonP, level);
              break;
            default:
              for (let key in jsonP) {
                let valType = typeof jsonP[key];
                if (valType === "object") {
                  addHtml = addHtml + addHtmlFunc(key, "", level);
                  addHtml = createJsonLdList(jsonP[key], addHtml, level + 1);
                } else {
                  addHtml = addHtml + addHtmlFunc(key, jsonP[key], level);
                }
              }
              break;
          }
        }
        return addHtml;
      }
      for (let contentJsonKey in contentJson) {
        let valType = typeof contentJson[contentJsonKey];
        if (valType === "object") {
          addHtml = addHtml + addHtmlFunc(contentJsonKey, "", level);
          addHtml = createJsonLdList(contentJson[contentJsonKey], addHtml, level + 1);
        } else {
          addHtml = addHtml + addHtmlFunc(contentJsonKey, contentJson[contentJsonKey], level);
        }
      }
      return addHtml;
    }
    function removeKeyHeadAt(keyName) {
      if (keyName.indexOf("@") === 0) {
        keyName = keyName.replace("@", "");
      }
      return keyName;
    }
    function generateItemHtml(key, val, level) {
      let levelClass = "";
      if (level > 0) {
        levelClass = "level_" + level;
      }
      let keyHtml = '<div class="typeLabel">' + key + "</div>";
      if (isEmpty(key)) {
        keyHtml = "<div>" + key + "</div>";
      }
      if (isImgExtension(val)) {
        val = val + addJsonLdImgTag(val);
      }
      return "" + '<div class="jsonldItem">' + '<div class="jldRecord">' + '<div class="jldKey ' + levelClass + '">' + keyHtml + "</div>" + '<div class="jldValue">' + val + "</div>" + "</div>" + "</div>" + "";
    }
    function addJsonLdImgTag(srcTxt) {
      if (srcTxt.indexOf("//") === 0) {
        let protocol = document.location.protocol;
        srcTxt = protocol + "" + srcTxt;
      } else if (srcTxt.indexOf("/") === 0) {
        srcTxt = location.origin + srcTxt;
      }
      return "<div class='jsonldImgWrap'><img class='jsonldImg' src='" + srcTxt + "' alt=''/></div>";
    }
    function getMoreDetailForRobotsTag(content) {
      content = content.toUpperCase();
      if (content === "INDEX") {
        return "<span>" + content + "</span>";
      } else {
        return '<span class="good-val">' + content + "</span>";
      }
    }
    function getMetaKeyVal(groupItem, titleName, description) {
      return "<div class='" + groupItem + "-item'><span class='title'>" + titleName + "</span><span class='delimiter'>:</span><span class='desc'>" + description + "</span></div>";
    }
    function getMsgForNoData(msg) {
      return "<span>" + msg + "</span>";
    }
    function getMsgForMissing(msg) {
      return getMsgForNoData(msg + l("m_isNotSet"));
    }
    function getMsgForNormal(msg) {
      return msg + l("m_isNotSet");
    }
    function getTitleAndContent_noExtInfo(titleName, titleNameTooltip, idOfHelpButton, descAsHtml, dataSource = "", miniBtnCodeId = "", miniBtnCopyId = "", infoBtnHtml = "") {
      let outputHtml = getTitleAndContentBasicAsHtmlTag(titleName, "", descAsHtml, dataSource, miniBtnCodeId, miniBtnCopyId, infoBtnHtml);
      return outputHtml;
    }
    function genJsonLdTabItemContentHtml(titleName, descAsHtml, extInfoMsg, dataSource, miniBtnCodeId, miniBtnCopyId, infoBtnHtml, extInfo2Html) {
      return getTitleAndContentBasicAsHtmlTag(titleName, extInfoMsg, descAsHtml, dataSource, miniBtnCodeId, miniBtnCopyId, infoBtnHtml, extInfo2Html);
    }
    function getTitleAndContentBasicAsHtmlTag(titleName, extInfoMsg, descAsHtml, dataSource = "", miniBtnCodeId = "", miniBtnCopyId = "", infoBtnHtml = "", extInfo2Html = "") {
      let codeBtnHtml = "";
      let copyBtnHtml = "";
      let extHtml = "";
      if (extInfoMsg.replace("\n", "").trim() !== "") {
        extHtml = "" + '    <div class="ext-info important-msg">\n' + "        " + extInfoMsg + "\n" + "    </div>\n";
      }
      if (isNotEmpty(miniBtnCodeId)) {
        codeBtnHtml = "" + '        <span class="mini-btn mini-act-btn tippy code" data-tpy-title="view code in new tab."  data-act-mode="code" data-data-source="' + dataSource + '" data-index="' + miniBtnCodeId + '">\n' + '            <i class="fa-code"></i>\n' + "        </span>\n";
      }
      if (isNotEmpty(miniBtnCopyId)) {
        copyBtnHtml = "" + '        <span class="mini-btn mini-act-btn tippy" data-act-mode="copy" data-tpy-title="copy" data-data-source="' + dataSource + '" data-index="' + miniBtnCopyId + '">\n' + '            <i class="fa-copy"></i>\n' + "        </span>\n";
      }
      let outputHtml = '<div class="sum-info-item">\n' + '<div class="dflex title-wrap">\n' + '    <div class="title strong">\n' + "        " + titleName + "\n" + "    </div>\n" + '    <div class="contents_ext_btns">\n' + infoBtnHtml + codeBtnHtml + copyBtnHtml + "    </div>\n" + "</div>\n" + '    <div class="desc">\n' + "        " + descAsHtml + "\n" + "    </div>\n" + "" + extHtml + "\n" + "" + extInfo2Html + "\n" + "</div>";
      return outputHtml;
    }
    function generateInfoBtnUrl(url) {
      let tooltipMsg = l("open_google_seo_doc");
      return "" + '        <span class="mini-btn mini-act-btn info tippy" data-tpy-title="' + tooltipMsg + '" data-data-source="tag" data-act-mode="link"  data-link-url="' + url + '">\n' + '            <i class="fa-info-circle"></i>\n' + "        </span>\n";
    }
    function wrapReadMoreContents(contents, lineCnt, readMoreWrapId = "", btnLabel = "") {
      if (isEmpty(readMoreWrapId)) {
        readMoreWrapId = "rm-" + genSeqNum();
      }
      readmoreCnt = readmoreCnt + 1;
      let html = "";
      if (lineCnt > 3) {
        html = '<div id="' + readMoreWrapId + '" class="readmore">\n' + '    <input id="readmore-check-' + readmoreCnt + '" class="readmore-check" type="checkbox">\n' + '    <div class="readmore-content">\n' + contents + "    </div>\n" + '    <label class="readmore-btn" for="readmore-check-' + readmoreCnt + '" data-btn="' + btnLabel + '"></label>\n' + "</div>";
      } else {
        html = '<div id="' + readMoreWrapId + '" class="no-readmore" >\n' + "    <div>\n" + contents + "    </div>\n" + "</div>";
      }
      return html;
    }
    function wrapReadMoreContentsV2(contents, lineCnt, readMoreWrapId = "", btnLabel = "") {
      if (isEmpty(readMoreWrapId)) {
        readMoreWrapId = "rm-" + genSeqNum();
      }
      readmoreCnt = readmoreCnt + 1;
      let html = "";
      if (lineCnt > 3) {
        html = '<div id="' + readMoreWrapId + '" class="readmore">\n' + '    <input id="readmore-check-' + readmoreCnt + '" class="readmore-check" type="checkbox">\n' + '    <label class="readmore-btn top" for="readmore-check-' + readmoreCnt + '" data-btn="' + btnLabel + '"></label>\n' + "" + '    <div class="readmore-content jsonld">\n' + contents + "    </div>\n" + '    <label class="readmore-btn bottom" for="readmore-check-' + readmoreCnt + '" data-btn="' + btnLabel + '"></label>\n' + "</div>";
      } else {
        html = '<div id="' + readMoreWrapId + '" class="no-readmore" >\n' + "    <div>\n" + contents + "    </div>\n" + "</div>";
      }
      return html;
    }
    function wrapContentsArea(contents, moovId) {
      return "<div class='moov' id='" + moovId + "'>" + contents + "</div>";
    }
    function getRowHeadersImagesCounter() {
      let output = "";
      collectTagCounter();
      let outCnt = 0;
      let inCnt = 0;
      let inPageCnt = 0;
      let outInnerLinkCount = _hLinkCounter["outInnerLinkCount"];
      outCnt = outInnerLinkCount.outCnt;
      inCnt = outInnerLinkCount.inCnt;
      inPageCnt = outInnerLinkCount.inPageCnt;
      output = output + "<table class='table-h-cnt' style='margin-bottom: 2px;'>";
      output = output + "<thead>";
      output = output + "<tr>";
      for (let i = 1; i <= 6; i++) {
        output = output + ("<th>H" + i + "</th>");
      }
      output = output + ("  <th class='txtr'>" + l("externalLink") + "</th>");
      output = output + ("  <th class='txtr'>" + l("internalLink") + "</th>");
      output = output + ("  <th class='txtr'>" + l("inPageLink") + "</th>");
      output = output + "</tr>";
      output = output + "</thead>";
      output = output + "<tbody>";
      output = output + "<tr>";
      for (let i = 1; i <= 6; i++) {
        let cnt = _hLinkCounter["h" + i];
        if (i === 1 || i === 1) {
          if (cnt === 0) {
            output = output + ("  <td class='txtc'>" + cnt + "</td>");
          } else {
            output = output + ("  <td class='txtc'>" + cnt + "</td>");
          }
        } else {
          output = output + ("  <td class='txtc'>" + cnt + "</td>");
        }
      }
      output = output + ("  <td class='txtr' >" + outCnt + "</td>");
      output = output + ("  <td class='txtr' >" + inCnt + "</td>");
      output = output + ("  <td class='txtr' >" + inPageCnt + "</td>");
      output = output + "</tr>";
      output = output + "</tbody>";
      output = output + "</table>";
      return output;
    }
    function countOutInnerLink() {
      let outCnt = 0;
      let inSiteCnt = 0;
      let inPageCnt = 0;
      let domain = document.domain;
      let currentUrl = document.location.origin + document.location.pathname;
      let protocol = document.location.protocol;
      let $aTag = $("a");
      if ($aTag.length <= 0) {
        return {"outCnt":outCnt, "inCnt":inSiteCnt, "inPageCnt":inPageCnt};
      }
      let relLinkList = [];
      let relLinkMap = [];
      currentUrl = currentUrl.replace(protocol, "");
      $aTag.each(function(i, val) {
        let href = $(val).attr("href");
        if (isEmpty(href)) {
          return true;
        }
        let relInfo = {"rels":[], "relGroupKey":"", "txt":$.trim($(this).text()), "html":$(this).html(), "href":href};
        if (href.indexOf(currentUrl) >= 0) {
          if (href.indexOf("#") > 0) {
            ++inPageCnt;
            _inPageLinks.push(relInfo);
            return true;
          }
        }
        if (href === "#") {
          return true;
        }
        if (href.indexOf("javascript:") === 0) {
          return true;
        }
        if (href.indexOf("#") === 0 && href.length >= 2) {
          ++inPageCnt;
          _inPageLinks.push(relInfo);
          return true;
        }
        if (href.indexOf("?") === 0) {
          ++inSiteCnt;
          linkCollect(this, href, _internalLinkMap);
          return true;
        }
        if (href.indexOf("./") === 0) {
          ++inSiteCnt;
          linkCollect(this, href, _internalLinkMap);
          return true;
        }
        if (href.indexOf("../") === 0) {
          ++inSiteCnt;
          linkCollect(this, href, _internalLinkMap);
          return true;
        }
        if (href === "/" || href.indexOf("/#") === 0 || href.indexOf("/?") === 0) {
          ++inSiteCnt;
          linkCollect(this, href, _internalLinkMap);
          return true;
        }
        if (!href.match("^//") && href.match("^/")) {
          ++inSiteCnt;
          linkCollect(this, href, _internalLinkMap);
          return true;
        }
        href = href.replace("https:", "");
        href = href.replace("http:", "");
        if (href.replace("//www.", "//").indexOf("//" + domain.replace("//www.", "//")) === 0) {
          ++inSiteCnt;
          linkCollect(this, href, _internalLinkMap);
          return true;
        }
        if (isLinkInSite(href)) {
          ++inSiteCnt;
          linkCollect(this, href, _internalLinkMap);
          return true;
        }
        if (href.replace("//www.", "").indexOf(domain.replace("www.", "")) === 0) {
          ++inSiteCnt;
          linkCollect(this, href, _internalLinkMap);
          return true;
        }
        relInfo = {"rels":[], "relGroupKey":"", "txt":"", "href":""};
        let relString = $(this).attr("rel");
        let hrefV2 = getHref(href);
        let txt = $.trim($(this).text());
        if (isEmpty(txt)) {
          if (isNotEmpty(hrefV2)) {
            relInfo.txt = hrefV2;
          } else {
            relInfo.txt = "[ no text ]";
          }
        } else {
          txt = txt.replaceAll("\n", "");
          txt = txt.replaceAll("\t", "");
          let imgsTmp = $(this).find("img");
          if (imgsTmp.length > 0) {
            let imgTag = $(imgsTmp[0]);
            let imgPath = imgTag.attr("src");
            let tippyAttrs = "";
            if (isNotEmpty(imgPath)) {
              tippyAttrs = ' class="tippy" data-tpy-img-src="' + imgPath + '" ';
            }
            txt = imgTag.attr("alt");
            if (isEmpty(txt)) {
              txt = "<span " + tippyAttrs + ">[img]</span>";
            } else {
              txt = "<span " + tippyAttrs + ">[img]" + txt + "</span>";
            }
          }
          relInfo.txt = txt;
        }
        relInfo.href = hrefV2;
        let relGroupKey = "none";
        if (isNotEmpty(relString)) {
          let rels = relString.split(" ");
          rels = rels.filter(function(relVal) {
            return isNotEmpty(relVal);
          });
          rels = rels.sort();
          relInfo.rels = rels;
          relGroupKey = rels.join("__");
        }
        relInfo.relGroupKey = relGroupKey;
        if (relLinkMap[relGroupKey] === undefined) {
          relLinkMap[relGroupKey] = [];
        }
        relLinkMap[relGroupKey].push(relInfo);
        ++outCnt;
      });
      _externalLinkMap = relLinkMap;
      return {"outCnt":outCnt, "inCnt":inSiteCnt, "inPageCnt":inPageCnt};
    }
    function linkCollect(_this, href, relLinkMap) {
      let relInfo = {"rels":[], "relGroupKey":"", "txt":"", "href":""};
      let relString = $(_this).attr("rel");
      let hrefV2 = getHref(href);
      let txt = $.trim($(_this).text());
      if (isEmpty(txt)) {
        if (isNotEmpty(hrefV2)) {
          relInfo.txt = hrefV2;
        } else {
          relInfo.txt = "[ no text ]";
        }
      } else {
        txt = txt.replaceAll("\n", "");
        txt = txt.replaceAll("\t", "");
        let imgsTmp = $(_this).find("img");
        if (imgsTmp.length > 0) {
          let imgTag = $(imgsTmp[0]);
          let imgPath = imgTag.attr("src");
          let tippyAttrs = "";
          if (isNotEmpty(imgPath)) {
            tippyAttrs = ' class="tippy" data-tpy-img-src="' + imgPath + '" ';
          }
          txt = imgTag.attr("alt");
          if (isEmpty(txt)) {
            txt = "<span " + tippyAttrs + ">[img]</span>";
          } else {
            txt = "<span " + tippyAttrs + ">[img]" + txt + "</span>";
          }
        }
        relInfo.txt = txt;
      }
      relInfo.href = hrefV2;
      let relGroupKey = "none";
      if (isNotEmpty(relString)) {
        let rels = relString.split(" ");
        rels = rels.filter(function(relVal) {
          return isNotEmpty(relVal);
        });
        rels = rels.sort();
        relInfo.rels = rels;
        relGroupKey = rels.join("__");
      }
      relInfo.relGroupKey = relGroupKey;
      if (relLinkMap[relGroupKey] === undefined) {
        relLinkMap[relGroupKey] = [];
      }
      relLinkMap[relGroupKey].push(relInfo);
    }
    function generateExternalLinkList() {
      let outputHtml = "";
      let blockHtml = "";
      let genKeyLinkList = function(loopIndex, externalLinkMapKey) {
        if (_externalLinkMap === undefined) {
          return "";
        }
        let relInfoList = _externalLinkMap[externalLinkMapKey];
        if (relInfoList === undefined) {
          return "";
        }
        let blockHtml = "";
        let linkList = [];
        relInfoList.sort(sortOnExtLinkHref);
        $(relInfoList).each(function(i, relInfo) {
          linkList.push("<div class='externalLinkItem'><a href='" + relInfo.href + "' title='" + relInfo.href + "' >" + relInfo.txt + "</a></div>");
        });
        let fileCnt = linkList.length;
        if (fileCnt > 0) {
          if (loopIndex > 0) {
            blockHtml = blockHtml + "<hr class='dashed'/>";
          }
          let title = externalLinkMapKey;
          if (externalLinkMapKey === "none") {
            title = "<span class='ext-link-tag ext-link-rel-none'>" + l("rel_attr_no_set") + "</span>";
          } else {
            let titleHtmlList = [];
            $(title.split("__")).each(function(i, val) {
              titleHtmlList.push("<span class='ext-link-tag ext-link-rel-" + val + "'>" + val + "</span>");
            });
            title = titleHtmlList.join(" ");
          }
          let m_fileCounterUnit_ko = l("m_fileCounterUnit_ko");
          blockHtml = blockHtml + ("<div class='contents-title'><span class='strong'>" + title + "</span> (" + fileCnt + m_fileCounterUnit_ko + ")</div>");
          for (let i in linkList) {
            blockHtml = blockHtml + linkList[i];
          }
          blockHtml = wrapReadMoreContents(blockHtml, fileCnt, "", "rel_attr_no_set");
          blockHtml = "<div class='external-link-contents'>" + blockHtml + "</div>";
          blockHtml = wrapContentsArea(blockHtml, externalLinkMapKey);
        }
        return blockHtml;
      };
      let loopIndex = 0;
      for (let externalLinkMapKey in _externalLinkMap) {
        if (externalLinkMapKey === "none") {
          continue;
        }
        outputHtml = outputHtml + genKeyLinkList(loopIndex, externalLinkMapKey);
        ++loopIndex;
      }
      outputHtml = outputHtml + genKeyLinkList(loopIndex, "none");
      if (outputHtml !== "") {
        let headlineBlock = '<div class="h2-add-mini-btn">\n' + '    <h2 class="mini-btn-h">' + l("externalLink") + "</h2>\n" + '    <div class="contents_ext_btns">\n' + '        <span class="mini-btn mini-act-btn tippy" data-act-mode="copy"  data-tpy-title="copy"  data-data-source="html-external-link" data-index="cp">\n' + '        <i class="fa-copy"></i>\n' + "        </span>\n" + "    </div>\n" + "</div>";
        outputHtml = "<hr/>" + headlineBlock + outputHtml;
      }
      return outputHtml;
    }
    function generateInternalLinkList(targetType = "internal") {
      let outputHtml = "";
      let blockHtml = "";
      let targetLinkMap = [];
      let item_title = "";
      if (targetType === "internal") {
        targetLinkMap = _internalLinkMap;
      } else {
        targetLinkMap = _externalLinkMap;
      }
      item_title = l(targetType + "Link");
      let genKeyLinkList = function(loopIndex, externalLinkMapKey, targetLinkMap, targetType) {
        if (targetLinkMap === undefined) {
          return "";
        }
        let relInfoList = targetLinkMap[externalLinkMapKey];
        if (relInfoList === undefined) {
          return "";
        }
        let blockHtml = "";
        let linkList = [];
        relInfoList.sort(sortOnExtLinkHref);
        $(relInfoList).each(function(i, relInfo) {
          linkList.push("<div class='" + targetType + "LinkItem'><a href='" + relInfo.href + "' title='" + relInfo.href + "' >" + relInfo.txt + "</a></div>");
        });
        let fileCnt = linkList.length;
        if (fileCnt > 0) {
          if (loopIndex > 0) {
            blockHtml = blockHtml + "<hr class='dashed'/>";
          }
          let title = externalLinkMapKey;
          if (externalLinkMapKey === "none") {
            title = "<span class='ext-link-tag ext-link-rel-none'>" + l("rel_attr_no_set") + "</span>";
          } else {
            let titleHtmlList = [];
            $(title.split("__")).each(function(i, val) {
              titleHtmlList.push("<span class='ext-link-tag ext-link-rel-" + val + "'>" + val + "</span>");
            });
            title = titleHtmlList.join(" ");
          }
          let m_fileCounterUnit_ko = l("m_fileCounterUnit_ko");
          blockHtml = blockHtml + ("<div class='contents-title inextLinkMap'><span class='strong'>" + title + "</span> (" + fileCnt + m_fileCounterUnit_ko + ")</div>");
          for (let i in linkList) {
            blockHtml = blockHtml + linkList[i];
          }
          blockHtml = wrapReadMoreContents(blockHtml, fileCnt, "", "rel_attr_no_set");
          blockHtml = "<div class='" + targetType + "-link-contents'>" + blockHtml + "</div>";
          blockHtml = wrapContentsArea(blockHtml, externalLinkMapKey);
        }
        return blockHtml;
      };
      let loopIndex = 0;
      for (let externalLinkMapKey in targetLinkMap) {
        if (externalLinkMapKey === "none") {
          continue;
        }
        outputHtml = outputHtml + genKeyLinkList(loopIndex, externalLinkMapKey, targetLinkMap, targetType);
        ++loopIndex;
      }
      outputHtml = outputHtml + genKeyLinkList(loopIndex, "none", targetLinkMap, targetType);
      if (outputHtml !== "") {
        let headlineBlock = '<div class="h2-add-mini-btn">\n' + '    <h2 class="mini-btn-h">' + item_title + "</h2>\n" + '    <div class="contents_ext_btns">\n' + '        <span class="mini-btn mini-act-btn tippy" data-act-mode="copy"  data-tpy-title="copy"  data-data-source="html-' + targetType + '-link" data-index="cp">\n' + '        <i class="fa-copy"></i>\n' + "        </span>\n" + "    </div>\n" + "</div>";
        outputHtml = "<hr/>" + headlineBlock + outputHtml;
      }
      return outputHtml;
    }
    function generateInPageLinkList() {
      let outputHtml = "";
      let blockHtml = "";
      let genKeyLinkList = function(loopIndex, wrapContentsAreaId) {
        let relInfoList = _inPageLinks;
        if (relInfoList === undefined) {
          return "";
        }
        let blockHtml = "";
        let linkList = [];
        relInfoList.sort(sortOnExtLinkHref);
        $(relInfoList).each(function(i, relInfo) {
          if (relInfo.txt !== "") {
            linkList.push("<div class='inPageLinkItem'><a href='" + relInfo.href + "' title='" + relInfo.href + "' class='copy-target' data-copy-data='normal' >" + relInfo.txt + "</a></div>" + "<div class='inPageLinkItem-url'><span class='inPageLinkItem-url-val'>" + relInfo.href + "</span></div>");
          } else {
            let imgTag = $(relInfo.html).filter("img").first();
            if (imgTag.length > 0) {
              let src = imgTag.attr("src");
              let imageName = getLastRightPartOfUrl(src);
              let img_text_string = ' <span data-tpy-img-src="' + src + '" class="tippy">' + ' <a title="' + relInfo.href + '" class="copy-target" data-copy-data="img"  data-img-src="' + src + '" ' + '  href="' + relInfo.href + '">' + imageName + "</a>" + "</span>";
              linkList.push("<div class='inPageLinkItem'>" + img_text_string + "</div>" + "<div class='inPageLinkItem-url'><span class='inPageLinkItem-url-val'>" + relInfo.href + "</span></div>");
            }
          }
        });
        let fileCnt = linkList.length;
        if (fileCnt > 0) {
          if (loopIndex > 0) {
            blockHtml = blockHtml + "<hr class='dashed'/>";
          }
          let title = "";
          for (let i in linkList) {
            blockHtml = blockHtml + linkList[i];
          }
          blockHtml = wrapReadMoreContents(blockHtml, fileCnt, "", "rel_attr_no_set");
          blockHtml = "<div class='inPage-link-contents'>" + blockHtml + "</div>";
          blockHtml = wrapContentsArea(blockHtml, wrapContentsAreaId);
        }
        return blockHtml;
      };
      let loopIndex = 0;
      let fileCnt = _inPageLinks.length;
      let m_fileCounterUnit_ko = l("m_fileCounterUnit_ko");
      outputHtml = outputHtml + genKeyLinkList(loopIndex, "pageInlLinkAreaKey");
      if (outputHtml !== "") {
        let headlineBlock = '<div class="h2-add-mini-btn">\n' + '    <h2 class="mini-btn-h">' + l("inPageLink") + "</h2> (" + fileCnt + m_fileCounterUnit_ko + ")\n" + '    <div class="contents_ext_btns">\n' + '        <span class="mini-btn mini-act-btn tippy" data-act-mode="copy"  data-tpy-title="copy"  data-data-source="html-inPage-link" data-index="cp">\n' + '        <i class="fa-copy"></i>\n' + "        </span>\n" + "    </div>\n" + "</div>";
        outputHtml = "<hr/>" + headlineBlock + outputHtml;
      }
      return outputHtml;
    }
    function isJapanese() {
      return chrome.i18n.getUILanguage() === "ja";
    }
    function isImgExtension(str) {
      return t.isImgExt(str);
    }
    function faviconImg(src, addClass = "") {
      if (addClass !== "") {
        addClass = ' class="' + addClass + '"';
      }
      return "<img src='https://www.google.com/s2/favicons?domain=" + src + "' " + addClass + "/>";
    }
    function calcStrBytes(str) {
      return t.calcStrBytes(str);
    }
    function speedValFormat(speedVal) {
      return t.numberFormat(speedVal);
    }
    function isDataImage(src) {
      return t.isDataImage(src);
    }
    function isString(obj) {
      return t.isStr(obj);
    }
    function isArray(val) {
      return t.isArray(val);
    }
    function myStringSlice(str) {
      return t.overStringSlice(str);
    }
    function attrAll($thisCurrent) {
      return t.attrAll($thisCurrent);
    }
    function isLengthCheck(number, min, max) {
      return t.isLenCheck(number, min, max);
    }
    function collectTagCounter() {
      if (isEmpty(_hLinkCounter)) {
        _hLinkCounter = {};
        for (let i = 1; i <= 6; i++) {
          let cnt = document.getElementsByTagName("h" + i).length;
          _hLinkCounter["h" + i] = cnt;
        }
        _hLinkCounter["outInnerLinkCount"] = countOutInnerLink();
      }
      return _hLinkCounter;
    }
    function isLinkInSite(url) {
      let pattern1 = /^(\/([a-zA-Z0-9-]{1,}))/g;
      let result1 = pattern1.test(url);
      if (result1) {
        return true;
      } else {
        return false;
      }
    }
    function getJsonLdDoc(type) {
      if (isEmpty(seoJsonLdDocURL[type])) {
        return "";
      }
      return seoJsonLdDocURL[type];
    }
    function isNotEmpty(data) {
      return t.isNotEmpty(data);
    }
    function isEmpty(data) {
      return t.isEmpty(data);
    }
    function isEmptyObj(obj) {
      return t.isEmptyObj(obj);
    }
    function calcByteAddUnit(byte) {
      return t.calcByteAddUnit(byte);
    }
    function getStringLength(input) {
      return t.lenStr(input);
    }
    function sortOnTagName(a, b) {
      return t.sortProp(a, b, "tagName");
    }
    function sortOgTag(a, b) {
      return t.sortObj(a, b, "property");
    }
    function sortTwitterTag(a, b) {
      return t.sortObj(a, b, "name");
    }
    function sortOnAttributeName(a, b) {
      return a.nodeName.toLowerCase() > b.nodeName.toLowerCase() ? 1 : -1;
    }
    function sortOnExtLinkHref(a, b) {
      return t.sortHref(a, b);
    }
    function escapeHtml(string) {
      return t.escapeHtml(string);
    }
    function getBrowser() {
      return chrome;
    }
    function l(msgId) {
      return t.l(msgId);
    }
    function initLoad() {
      sendMessage({action:"initLoad"}, function(response) {
        if (response.aTabId !== undefined && response.action === "initLoad") {
          _currentTabId = response.aTabId;
          _toolCnts = response.toolCnts;
          func_start();
        }
      });
    }
    function sendPageData() {
      sendMessage({action:"pagelog", tabId:_currentTabId, data:_pageInfo}, response => {
      });
      sendMessage({action:"update_sidebar_pagelog", data:_pageInfo, tabId:_currentTabId}, function(response) {
      });
    }
    function resultAnalytics() {
      bw().runtime.sendMessage({action:"resultAnalytics", tabId:_currentTabId}, function(response) {
        if (response.action === "resultAnalytics") {
          sendViewType(response.resData.type);
        }
      });
    }
    function sendProgressBarPer(barPerVal) {
      sendMessage({action:"barUpdate", barVal:barPerVal, tabId:_currentTabId, target:"p"});
      sendMessage({action:"barUpdate", barVal:barPerVal, tabId:_currentTabId, target:"s"});
    }
    function sendMessage(sendData, callback = null) {
      if (isFireFox()) {
        bw().runtime.sendMessage(sendData, function(response) {
          callback && callback(response);
        });
      } else {
        if (getManifestVer() === 3) {
          chrome.runtime.sendMessage(sendData, function(response) {
            callback && callback(response);
          });
        } else {
          chrome.extension.sendMessage(sendData, function(response) {
            callback && callback(response);
          });
        }
      }
    }
    function sendViewType(type) {
      let category = "view_type";
      let action = type;
      t.myEvent(category, type);
    }
    const t = Util();
    let _resource_fetch_map;
    let _img_metadata_map;
    let _manifestData = null;
    let isChromeBrowser = false;
    let isFireFoxBrowser = true;
    if (navigator.userAgent.indexOf("Chrome") !== -1) {
      isChromeBrowser = true;
      isFireFoxBrowser = false;
    }
    const RequiredProperties = {"VideoObject":["description", "name", "thumbnailUrl", "uploadDate"], "FAQPage":["mainEntity"], "BreadcrumbList":["itemListElement"], "DataFeed":["@context", "@type", "dataFeedElement", "dateModified"], "Product":["name"], "Review":["author", "itemReviewed", "reviewRating"], "ItemList":["itemListElement"], "QAPage":["mainEntity"], "Organization":["logo", "url"]};
    let seoJsonLdDocURL = {"NewsArticle":"https://developers.google.com/search/docs/data-types/article", "Article":"https://developers.google.com/search/docs/data-types/article", "VideoObject":"https://developers.google.com/search/docs/data-types/video", "FAQPage":"https://developers.google.com/search/docs/data-types/faqpage", "BreadcrumbList":"https://developers.google.com/search/docs/data-types/breadcrumb", "Person":"", "DataFeed":"https://developers.google.com/search/docs/data-types/book", "Product":"https://developers.google.com/search/docs/data-types/product", 
    "Review":"https://developers.google.com/search/docs/data-types/review-snippet", "ItemList":"https://developers.google.com/search/docs/data-types/carousel", "SiteNavigationElement":"", "QAPage":"https://developers.google.com/search/docs/data-types/qapage", "Organization":"https://developers.google.com/search/docs/data-types/logo", "Car":"https://developers.google.com/search/docs/appearance/structured-data/vehicle-listing"};
    var _pageInfo = {"sumTabHtml":"none", "outputTabHtml":"none", "headersTabHtml":"none"};
    var _cmsInfo = null;
    var output = "";
    var _jsonLd = [];
    var _microdataList = [];
    var _mdList = [];
    var _rdfaLiteList = [];
    var readmoreCnt = 0;
    var _seqNumCnt = 0;
    var _pageSpeedList = {};
    $.extend($.expr[":"], {"containsIN":function(elem, i, match, array) {
      return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }});
    var totalElementsCnt = "";
    let _progressTotalCnt = 0;
    let _progressCnt = 0;
    var _headInfo = null;
    var $_imgTags = null;
    var $_noscriptTags = null;
    let _CrUXFieldData = [];
    var _externalLinkMap = {};
    var _internalLinkMap = {};
    var _inPageLinks = [];
    var _hLinkCounter = null;
    let _currentTabId = 0;
    let _toolCnts = {};
    initLoad();
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      let defaultSettings = {};
      let messageAction = message.action;
      let messageParams = message.params;
      if (messageAction === "load" && messageParams === "m") {
        let res = {action:"loaded", params:"m"};
        sendResponse(res);
      } else if (messageAction === "reLoadImgData") {
        console.log("main.", "messageAction", messageAction);
        calculate_load_times_v2_sync();
        sendResponse({});
      }
    });
  });
})();

