const sideBarDocService = function() {
  function updateI18n(i18n) {
    _i18n = i18n;
  }
  function createSideBarPanel(shadowRoot, callbackFn, onOpenCallback = () => {
  }) {
    function close() {
      documentsSelector.classList.remove(selectorOpenClass);
    }
    function toggle(event) {
      if (listOfDocuments.children.length === 1) {
        return;
      }
      event && event.stopPropagation();
      documentsSelector.classList.toggle(selectorOpenClass);
      onOpenCallback();
    }
    function getPageAnaData() {
      return _pageData;
    }
    function updateDocuments(shadowRoot, documents, callbackFn) {
      _pageData = documents.data;
      updatePageInfoHtml();
      callbackFn();
    }
    function updatePageInfoHtml() {
      let $jsonLdList = $("#json-ld_list");
      let $microdataList = $("#microdata_list");
      let $rdfaList = $("#rdfa_list");
      let $img_content_list = $("#img_content_list");
      let $social_content_list = $("#social_content_list");
      let $tool_content_list = $("#tool_content_list");
      let html = _pageData.sumTabHtml;
      html = html + "<hr>";
      updateHtml("base_info_contents", html);
      updateHtml("headlines_list", _pageData.headersTabHtml);
      updateHtml("json-ld_list", _pageData.jsonLdTabHtml);
      updateHtml("microdata_list", _pageData.microdataTabHtml);
      updateHtml("rdfa_list", _pageData.rdfaTabHtml);
      if (_pageData.imgTabHtml !== "") {
        updateHtml("img_content_list", _pageData.imgTabHtml);
      }
      updateHtml("social_content_list", _pageData.socialTabHtml);
      updateHtml("tool_content_list", _pageData.toolTabHtml);
      updateHtml("tab-counter-headline", genTabCountBadge(_pageData.tabHeadlineCnt));
      updateHtml("tab-counter-jsonld", genTabCountBadge(_pageData.tabJsonLdCnt));
      updateHtml("tab-counter-microdata", genTabCountBadge(_pageData.tabMicrodataCnt));
      updateHtml("tab-counter-RDFa", genTabCountBadge(_pageData.tabRdfaCnt));
      updateHtml("tab-counter-structured-data", genTabCountBadge(_pageData.tabJsonLdCnt + _pageData.tabMicrodataCnt + _pageData.tabRdfaCnt));
      updateHtml("tab-counter-social", genTabCountBadge(_pageData.tabSocialCnt));
      let genSubTabBtn = function(itemId, itemName, count) {
        let countBadge = genSubTabCountBadge(count);
        let subBtnInnerTxt = '<span class="btn-social-flat-text">' + itemName + "</span>" + countBadge;
        let option = {};
        if (count <= 0) {
          option.addClass = "disable";
        }
        updateHtml(itemId, subBtnInnerTxt, option);
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
        checkedInput(checkedId);
      };
      subBtnDefaultChecked(_pageData.tabJsonLdCnt, _pageData.tabMicrodataCnt, _pageData.tabRdfaCnt);
      if (_pageData.tabHeadlineCnt < 1) {
        $("#headlines_content > div.headlines_head_btns > .dataNoneHidden").css("visibility", "hidden");
      }
      if (_pageData.tabJsonLdCnt < 1) {
        $("#jsonldchk_content > div.headlines_head_btns > .dataNoneHidden").css("visibility", "hidden");
        updateHtml("json-ld_list", "<div><span class=''>JSON-LD " + l("m_isMissing") + "</span></div>");
      }
      if (_pageData.tabMicrodataCnt < 1) {
        $("#microdatachk_content > div.headlines_head_btns > .dataNoneHidden").css("visibility", "hidden");
        updateHtml("microdata_list", "<div><span class=''>Microdata " + l("m_isMissing") + "</span></div>");
      }
      if (_pageData.tabRdfaCnt < 1) {
        $("#RDFachk_content > div.headlines_head_btns > .dataNoneHidden").css("visibility", "hidden");
        updateHtml("rdfa_list", "<div><span class=''>RDFa " + l("m_isMissing") + "</span></div>");
      }
      let btns = $(_shadowRoot).find(".mini-act-btn");
      btns.each(function() {
        this.onclick = () => {
          t.onClickMiniActBtn(this, _shadowRoot, getPageAnaData);
        };
      });
      btns = $(_shadowRoot).find(".move_hl");
      btns.each(function() {
        this.onclick = () => {
          t.onClickMoveHlBtn(this, _shadowRoot);
        };
      });
      btns = $(_shadowRoot).find("input.tabChange");
      btns.each(function() {
        this.onclick = () => {
          t.onClickMainTab(this, _shadowRoot);
        };
      });
      let last_click_tab = _storageCache["last_click_tab"];
      let main_tabId = "summary";
      let option_default_tab = _storageCache["option_default_tab"];
      if (option_default_tab !== null) {
        if (option_default_tab === 99 || option_default_tab === "99") {
          main_tabId = _storageCache["last_click_tab"];
        } else {
          let tmpList = {1:"summary", 2:"headlines", 3:"structured-datachk", 4:"imgchk", 5:"socialchk", 6:"toolchk"};
          main_tabId = tmpList[option_default_tab];
        }
      }
      checkedInput(main_tabId);
      $(_shadowRoot).find(".readmore-btn").each(function() {
        this.onclick = () => {
          let btnLabel = $(this).data("btn");
          if (btnLabel === undefined) {
            btnLabel = "";
          }
          if (btnLabel === "") {
            return true;
          }
        };
      });
      $(_shadowRoot).find(".toolsBtn").each(function() {
        this.onclick = () => {
          t.onClickTool(this);
        };
      });
      $(_shadowRoot).find(".moov").each(function() {
        $(this).mouseenter(function() {
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
      });
      let isDropDownMenuOpen = false;
      $(_shadowRoot).find(".compact_btn.doropmenu").each(function() {
        this.onclick = () => {
          isDropDownMenuOpen = true;
          let find = $(this).parent().find(".dropdown_menu");
          find.toggle();
          let drpMenuId = find.find("ul").attr("id");
        };
      });
      $(_shadowRoot).find("#headline_dmenu > li").each(function() {
        this.onclick = () => {
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
          copyTxtArr = t.genHeadlinesTabCopyList(indentStr, listType, copyFormat, isHeadTagName, _shadowRoot);
          t.execCopyForArray(copyTxtArr);
        };
      });
      $(_shadowRoot).find(".tab_item").each(function() {
        this.onclick = () => {
          let forVal = $(this).attr("for");
          t.myEvent("tab", "s-" + forVal + "");
        };
      });
      $(_shadowRoot).find("#base_dmenu > li").each(function() {
        this.onclick = () => {
          let listType = $(this).data("list-type");
          let copyFormat = $(this).data("copy-format");
          let tagName = $(this).data("tag-name");
          let target = $(this).data("target");
          let indentStr = $(this).data("list-indent");
          let dataList = [];
          let copyTxtArr = [];
          let copyTxt = "";
          if (target === "all") {
            indentStr = "  ";
            listType = "";
          }
          copyTxtArr = t.genBaseTabCopyList(indentStr, listType, _shadowRoot);
          if (target === "all") {
            t.jSelector(["rm-all-styleSheets", "rm-all-links", "rm-all-scripts", "rm-all-metass"], _shadowRoot).each(function(i, rootId) {
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
              let ctTitle = t.jSelector("#" + rootId + " .contents-title", _shadowRoot)[0];
              ctTitle = $(ctTitle).text().trim();
              copyTxtArr.push(ctTitle);
              t.jSelector("#" + rootId + " ." + itemClass + "-item", _shadowRoot).each(function(i, val) {
                let title = $($(val).find(".title")[0]).text().trim();
                let desc = $($(val).find(".desc")[0]).text().trim();
                if ($(val).find(".desc a").length > 0) {
                  desc = $($(val).find(".desc a")[0]).attr("href");
                }
                let item = title + "\t" + desc;
                copyTxtArr.push(item);
              });
            });
            let inPageLinkCopyTxtArr = t.getInPageLinkContents(_shadowRoot, "inPage");
            if (inPageLinkCopyTxtArr.length > 0) {
              copyTxtArr = copyTxtArr.concat(inPageLinkCopyTxtArr);
            }
            let internalLinkCopyTxtArr = t.getExternalLinkContents(_shadowRoot, "internal");
            if (internalLinkCopyTxtArr.length > 0) {
              copyTxtArr = copyTxtArr.concat(internalLinkCopyTxtArr);
            }
            let extLinkCopyTxtArr = t.getExternalLinkContents(_shadowRoot);
            if (extLinkCopyTxtArr.length > 0) {
              copyTxtArr = copyTxtArr.concat(extLinkCopyTxtArr);
            }
          }
          t.execCopyForArray(copyTxtArr);
        };
      });
      $(_shadowRoot).find("#jsonld_dmenu > li").each(function() {
        this.onclick = () => {
          if (getPageAnaData() === undefined) {
            return true;
          }
          if (getPageAnaData()._jsonLd === undefined) {
            return true;
          }
          let target = $(this).data("target");
          let copyFormat = $(this).data("copy-format");
          let dataList = [];
          if (target === "all" && copyFormat === "json-ld") {
            $(getPageAnaData()._jsonLd).each(function(i, jsonInfo) {
              let rawData = jsonInfo.rawData;
              dataList.push(rawData);
            });
            if (dataList.length < 1) {
              return true;
            }
            let rawDataTxt = t.reverseJsonToString(dataList, "\t");
            rawDataTxt = '<script type="application/ld+json">' + "\n" + rawDataTxt + "\n";
            rawDataTxt = rawDataTxt + "\x3c/script>\n";
            t.execCopyTextarea(rawDataTxt);
          }
        };
      });
      $(_shadowRoot).find(".copyBtnBasic").each(function() {
        this.onclick = e => {
          e.preventDefault();
          let target = $(this).data("target");
          let copyTxtArr = [];
          let copyTxt = "";
          let tabStr = "\t";
          tabStr = "  ";
          if (target === "headlines") {
            copyTxtArr = t.genHeadlinesTabCopyList("  ", "", "", false, _shadowRoot);
          } else if (target === "baseInfo") {
            copyTxtArr = t.genBaseTabCopyList("  ", "", _shadowRoot);
          } else if (target === "jsonLdInfo") {
            copyTxtArr = t.genJsonLdTabCopyList("  ", "", "", false, _shadowRoot);
          }
          t.execCopyForArray(copyTxtArr);
        };
      });
      $(_shadowRoot).find(".dropdown_menu").each(function() {
        $(this).mouseleave(function() {
          t.closeAllDropDownMenu(_shadowRoot);
        });
      });
      toolTip(_shadowRoot);
    }
    function getTipContents($tag) {
      let ct = "";
      let tpyTitle = $tag.data("tpy-title");
      let tpyImgSrc = $tag.data("tpy-img-src");
      ct = tpyTitle;
      if (tpyImgSrc !== undefined) {
        let contents = "<img src='" + tpyImgSrc + "' alt='' class='tippyImg' />";
        ct = contents;
      }
      return ct;
    }
    function toolTip(_shadowRoot) {
      let seometa1copyToolTip = getIdContent(_shadowRoot, "#seometa1copyToolTip");
      seometa1copyToolTip = $(seometa1copyToolTip);
      let _mouseY = 0;
      $(_shadowRoot).find(".tab_content").each(function() {
        let _this = this;
        $(this).mousemove(function(e) {
          let e_pageY = e.pageY;
          let o_t = $(_this).offset().top;
          let calc_y = e_pageY - o_t;
          _mouseY = calc_y;
        });
      });
      $(_shadowRoot).find(".tippy").each(function() {
        $(this).mouseenter(function() {
          let _this = $(this);
          let tip_ct = getTipContents(_this);
          seometa1copyToolTip.html(tip_ct);
          seometa1copyToolTip.show();
        });
        $(this).mouseleave(function() {
          seometa1copyToolTip.hide();
        });
        $(this).mousemove(function(e) {
          let padding = 20;
          var mousex = e.clientX + padding;
          var tipWidth = seometa1copyToolTip.width() + padding;
          var tipHeight = seometa1copyToolTip.height() + padding;
          let shadowRootWidth = _storageCache["initialSidePanelWidth"];
          if (t.isEmpty(shadowRootWidth)) {
            shadowRootWidth = t.getDefaultSideBarWidth();
          }
          let windowWidth = $(window).width();
          let windowHeight = $(window).height();
          let mainAreaWidth = windowWidth - shadowRootWidth;
          let mousePositionXinSide = e.clientX - mainAreaWidth;
          if (mousePositionXinSide + tipWidth > shadowRootWidth) {
            mousePositionXinSide = mousePositionXinSide - (tipWidth + 25);
          }
          if (tipWidth * 3 >= shadowRootWidth) {
            mousePositionXinSide = 0;
            if (windowHeight / 2 > e.pageY) {
              _mouseY = _mouseY + 100;
            } else {
              _mouseY = _mouseY - (tipHeight + 0);
              if (_mouseY < 10) {
                _mouseY = 10;
              }
            }
          }
          seometa1copyToolTip.css({top:_mouseY, left:mousePositionXinSide});
        });
      });
    }
    function updateLmsg(html) {
      $(html).find(".mlcl").each(function() {
        let dataMid = $(this).data("mid");
      });
    }
    function updateBar(shadowRoot, documents, callbackFn) {
      function updateMainProgressBar(progressPer) {
        $(shadowRoot).find(".mainProgressBar").each(function() {
          $(this).val(progressPer);
        });
      }
      let barVal = documents.barVal;
      updateMainProgressBar(barVal);
      callbackFn();
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
      return ' <span class="m-badge-inner sub ' + noneClass + '">' + cnt + "</span>";
    }
    function getBrowser() {
      return chrome;
    }
    function l(msgId) {
      return _i18n[msgId];
    }
    _shadowRoot = shadowRoot;
    const documentsSelector = {};
    documentsSelector.updateDocuments = (shadowRoot, documents) => {
      updateDocuments(shadowRoot, documents, callbackFn);
    };
    documentsSelector.updateBar = (shadowRoot, documents) => {
      updateBar(shadowRoot, documents, callbackFn);
    };
    documentsSelector.updateImgContents = (shadowRoot, documents) => {
      updateHtml("img_content_list", documents.imgTabHtml);
      if (_pageData !== undefined) {
        _pageData.imgTabHtml = documents.imgTabHtml;
      }
    };
    documentsSelector.open = () => {
      documentsSelector.classList.add(selectorOpenClass);
    };
    documentsSelector.close = close;
    return documentsSelector;
  }
  function updateHtml(id, html, option = {}) {
    let ct = getIdContent(_shadowRoot, "#" + id);
    if (ct !== null) {
      let cleanHTML = DOMPurify.sanitize(html, {SAFE_FOR_JQUERY:true, ADD_ATTR:["target"]});
      $(ct).html(cleanHTML);
      if (option.addClass !== undefined) {
        $(ct).addClass(option.addClass);
      }
    }
  }
  function checkedInput(checkedId) {
    let ct = getIdContent(_shadowRoot, "input#" + checkedId);
    if (ct !== null) {
      $(ct).prop("checked", true);
    }
  }
  function getIdContent(_sr, hashAndId) {
    let tmp = $(_sr).find(hashAndId);
    if (tmp.length === 1) {
      return tmp[0];
    }
    return null;
  }
  function clearHtml(shadowRoot, i18n, callbackFn) {
    _shadowRoot = shadowRoot;
    let msg = i18n.process_start;
    let progressBarHtml = '<div><progress class=\'mainProgressBar\' value="1" max="100">1%</progress></div>';
    $(["base_info_contents", "headlines_list", "json-ld_list", "microdata_list", "rdfa_list", "img_content_list", "social_content_list", "tool_content_list"]).each(function(i, id) {
      updateHtml(id, '<div class=\'research-start\'><span class="kaiten"><i class="fa-spinner kaiten-icon"></i></span> ' + msg + progressBarHtml + "</div>");
    });
    $(["tab-counter-headline", "tab-counter-jsonld", "tab-counter-microdata", "tab-counter-RDFa", "tab-counter-img", "tab-counter-structured-data", "tab-counter-social", "tab-counter-tool"]).each(function(i, id) {
      updateHtml(id, "");
    });
    let appVer = t.getManifestData("version");
    updateHtml("footer-ver", "ver. " + appVer);
  }
  const t = Util();
  let _pageData;
  let _shadowRoot;
  let _i18n;
  let moovedList = {};
  const selectorOpenClass = "open";
  return {createSideBarPanel, clearHtml, updateI18n};
};

