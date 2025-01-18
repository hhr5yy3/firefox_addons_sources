import {
  compile,
  convertMessageToMarkdown,
  esm_exports2 as esm_exports,
  getArkoseToken,
  is,
  sendLarkBotMessageInBgScript
} from "./JIT7C3KR.js";
import {
  backendApiReportPricingHooks,
  isPermissionCardSceneType
} from "./IHKLZ7RH.js";
import {
  Log_default
} from "./JLH3KCIT.js";
import {
  FREE_AI_MODELS,
  getCacheUserConfig,
  updateCacheUserConfig
} from "./LDFHRBBH.js";
import {
  proxyFetchInBgScript
} from "./U2LMMUIH.js";
import {
  createBackgroundMessageListener,
  createClientMessageListener,
  safeGetBrowserTab
} from "./RBTIXGC2.js";
import {
  USECHATGPT_AUTH_INFO_STORAGE_KEY,
  fetchUserSubscriptionInfo,
  getUseChatGPTAccessToken,
  logoutUseChatGPTAuth
} from "./QVVA4RGO.js";
import {
  ContentScriptConnectionV2
} from "./KFVZFM6T.js";
import {
  APP_FREE_AI_HOST,
  APP_IS_PROD,
  APP_USE_CHAT_GPT_API_HOST,
  APP_USE_CHAT_GPT_HOST,
  APP_VERSION,
  BACKGROUND_SEND_TEXT_SPEED_SETTINGS,
  CHATGPT_3_5_MODEL_NAME,
  CHAT_GPT_MESSAGES_RECOIL_KEY,
  CHROME_EXTENSION_POST_MESSAGE_ID
} from "./XVTLOGGR.js";
import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  cloneDeep_default,
  isEmpty_default,
  random_default
} from "./TOGVC2JX.js";
import {
  v4_default
} from "./2RTBHBIC.js";
import {
  __commonJS,
  __publicField,
  __require,
  __toESM
} from "./ERZ5UWI7.js";

// node_modules/.pnpm/@mozilla+readability@0.4.2/node_modules/@mozilla/readability/Readability.js
var require_Readability = __commonJS({
  "node_modules/.pnpm/@mozilla+readability@0.4.2/node_modules/@mozilla/readability/Readability.js"(exports, module) {
    function Readability2(doc, options) {
      if (options && options.documentElement) {
        doc = options;
        options = arguments[2];
      } else if (!doc || !doc.documentElement) {
        throw new Error("First argument to Readability constructor should be a document object.");
      }
      options = options || {};
      this._doc = doc;
      this._docJSDOMParser = this._doc.firstChild.__JSDOMParser__;
      this._articleTitle = null;
      this._articleByline = null;
      this._articleDir = null;
      this._articleSiteName = null;
      this._attempts = [];
      this._debug = !!options.debug;
      this._maxElemsToParse = options.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE;
      this._nbTopCandidates = options.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES;
      this._charThreshold = options.charThreshold || this.DEFAULT_CHAR_THRESHOLD;
      this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(options.classesToPreserve || []);
      this._keepClasses = !!options.keepClasses;
      this._serializer = options.serializer || function(el) {
        return el.innerHTML;
      };
      this._disableJSONLD = !!options.disableJSONLD;
      this._flags = this.FLAG_STRIP_UNLIKELYS | this.FLAG_WEIGHT_CLASSES | this.FLAG_CLEAN_CONDITIONALLY;
      if (this._debug) {
        let logNode = function(node) {
          if (node.nodeType == node.TEXT_NODE) {
            return `${node.nodeName} ("${node.textContent}")`;
          }
          let attrPairs = Array.from(node.attributes || [], function(attr) {
            return `${attr.name}="${attr.value}"`;
          }).join(" ");
          return `<${node.localName} ${attrPairs}>`;
        };
        this.log = function() {
          if (typeof dump !== "undefined") {
            var msg = Array.prototype.map.call(arguments, function(x) {
              return x && x.nodeName ? logNode(x) : x;
            }).join(" ");
            dump("Reader: (Readability) " + msg + "\n");
          } else if (typeof console !== "undefined") {
            let args = Array.from(arguments, (arg) => {
              if (arg && arg.nodeType == this.ELEMENT_NODE) {
                return logNode(arg);
              }
              return arg;
            });
            args.unshift("Reader: (Readability)");
          }
        };
      } else {
        this.log = function() {
        };
      }
    }
    Readability2.prototype = {
      FLAG_STRIP_UNLIKELYS: 1,
      FLAG_WEIGHT_CLASSES: 2,
      FLAG_CLEAN_CONDITIONALLY: 4,
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
      ELEMENT_NODE: 1,
      TEXT_NODE: 3,
      // Max number of nodes supported by this parser. Default: 0 (no limit)
      DEFAULT_MAX_ELEMS_TO_PARSE: 0,
      // The number of top candidates to consider when analysing how
      // tight the competition is among candidates.
      DEFAULT_N_TOP_CANDIDATES: 5,
      // Element tags to score by default.
      DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),
      // The default number of chars an article must have in order to return a result
      DEFAULT_CHAR_THRESHOLD: 500,
      // All of the regular expressions in use within readability.
      // Defined up here so we don't instantiate them repeatedly in loops.
      REGEXPS: {
        // NOTE: These two regular expressions are duplicated in
        // Readability-readerable.js. Please keep both copies in sync.
        unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
        okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,
        positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
        negative: /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
        extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
        byline: /byline|author|dateline|writtenby|p-author/i,
        replaceFonts: /<(\/?)font[^>]*>/gi,
        normalize: /\s{2,}/g,
        videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
        shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
        nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
        prevLink: /(prev|earl|old|new|<|«)/i,
        tokenize: /\W+/g,
        whitespace: /^\s*$/,
        hasContent: /\S$/,
        hashUrl: /^#.+/,
        srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
        b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
        // See: https://schema.org/Article
        jsonLdArticleTypes: /^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/
      },
      UNLIKELY_ROLES: ["menu", "menubar", "complementary", "navigation", "alert", "alertdialog", "dialog"],
      DIV_TO_P_ELEMS: /* @__PURE__ */ new Set(["BLOCKQUOTE", "DL", "DIV", "IMG", "OL", "P", "PRE", "TABLE", "UL"]),
      ALTER_TO_DIV_EXCEPTIONS: ["DIV", "ARTICLE", "SECTION", "P"],
      PRESENTATIONAL_ATTRIBUTES: ["align", "background", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "hspace", "rules", "style", "valign", "vspace"],
      DEPRECATED_SIZE_ATTRIBUTE_ELEMS: ["TABLE", "TH", "TD", "HR", "PRE"],
      // The commented out elements qualify as phrasing content but tend to be
      // removed by readability when put into paragraphs, so we ignore them here.
      PHRASING_ELEMS: [
        // "CANVAS", "IFRAME", "SVG", "VIDEO",
        "ABBR",
        "AUDIO",
        "B",
        "BDO",
        "BR",
        "BUTTON",
        "CITE",
        "CODE",
        "DATA",
        "DATALIST",
        "DFN",
        "EM",
        "EMBED",
        "I",
        "IMG",
        "INPUT",
        "KBD",
        "LABEL",
        "MARK",
        "MATH",
        "METER",
        "NOSCRIPT",
        "OBJECT",
        "OUTPUT",
        "PROGRESS",
        "Q",
        "RUBY",
        "SAMP",
        "SCRIPT",
        "SELECT",
        "SMALL",
        "SPAN",
        "STRONG",
        "SUB",
        "SUP",
        "TEXTAREA",
        "TIME",
        "VAR",
        "WBR"
      ],
      // These are the classes that readability sets itself.
      CLASSES_TO_PRESERVE: ["page"],
      // These are the list of HTML entities that need to be escaped.
      HTML_ESCAPE_MAP: {
        "lt": "<",
        "gt": ">",
        "amp": "&",
        "quot": '"',
        "apos": "'"
      },
      /**
       * Run any post-process modifications to article content as necessary.
       *
       * @param Element
       * @return void
      **/
      _postProcessContent: function(articleContent) {
        this._fixRelativeUris(articleContent);
        this._simplifyNestedElements(articleContent);
        if (!this._keepClasses) {
          this._cleanClasses(articleContent);
        }
      },
      /**
       * Iterates over a NodeList, calls `filterFn` for each node and removes node
       * if function returned `true`.
       *
       * If function is not passed, removes all the nodes in node list.
       *
       * @param NodeList nodeList The nodes to operate on
       * @param Function filterFn the function to use as a filter
       * @return void
       */
      _removeNodes: function(nodeList, filterFn) {
        if (this._docJSDOMParser && nodeList._isLiveNodeList) {
          throw new Error("Do not pass live node lists to _removeNodes");
        }
        for (var i = nodeList.length - 1; i >= 0; i--) {
          var node = nodeList[i];
          var parentNode = node.parentNode;
          if (parentNode) {
            if (!filterFn || filterFn.call(this, node, i, nodeList)) {
              parentNode.removeChild(node);
            }
          }
        }
      },
      /**
       * Iterates over a NodeList, and calls _setNodeTag for each node.
       *
       * @param NodeList nodeList The nodes to operate on
       * @param String newTagName the new tag name to use
       * @return void
       */
      _replaceNodeTags: function(nodeList, newTagName) {
        if (this._docJSDOMParser && nodeList._isLiveNodeList) {
          throw new Error("Do not pass live node lists to _replaceNodeTags");
        }
        for (const node of nodeList) {
          this._setNodeTag(node, newTagName);
        }
      },
      /**
       * Iterate over a NodeList, which doesn't natively fully implement the Array
       * interface.
       *
       * For convenience, the current object context is applied to the provided
       * iterate function.
       *
       * @param  NodeList nodeList The NodeList.
       * @param  Function fn       The iterate function.
       * @return void
       */
      _forEachNode: function(nodeList, fn) {
        Array.prototype.forEach.call(nodeList, fn, this);
      },
      /**
       * Iterate over a NodeList, and return the first node that passes
       * the supplied test function
       *
       * For convenience, the current object context is applied to the provided
       * test function.
       *
       * @param  NodeList nodeList The NodeList.
       * @param  Function fn       The test function.
       * @return void
       */
      _findNode: function(nodeList, fn) {
        return Array.prototype.find.call(nodeList, fn, this);
      },
      /**
       * Iterate over a NodeList, return true if any of the provided iterate
       * function calls returns true, false otherwise.
       *
       * For convenience, the current object context is applied to the
       * provided iterate function.
       *
       * @param  NodeList nodeList The NodeList.
       * @param  Function fn       The iterate function.
       * @return Boolean
       */
      _someNode: function(nodeList, fn) {
        return Array.prototype.some.call(nodeList, fn, this);
      },
      /**
       * Iterate over a NodeList, return true if all of the provided iterate
       * function calls return true, false otherwise.
       *
       * For convenience, the current object context is applied to the
       * provided iterate function.
       *
       * @param  NodeList nodeList The NodeList.
       * @param  Function fn       The iterate function.
       * @return Boolean
       */
      _everyNode: function(nodeList, fn) {
        return Array.prototype.every.call(nodeList, fn, this);
      },
      /**
       * Concat all nodelists passed as arguments.
       *
       * @return ...NodeList
       * @return Array
       */
      _concatNodeLists: function() {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments);
        var nodeLists = args.map(function(list) {
          return slice.call(list);
        });
        return Array.prototype.concat.apply([], nodeLists);
      },
      _getAllNodesWithTag: function(node, tagNames) {
        if (node.querySelectorAll) {
          return node.querySelectorAll(tagNames.join(","));
        }
        return [].concat.apply([], tagNames.map(function(tag) {
          var collection = node.getElementsByTagName(tag);
          return Array.isArray(collection) ? collection : Array.from(collection);
        }));
      },
      /**
       * Removes the class="" attribute from every element in the given
       * subtree, except those that match CLASSES_TO_PRESERVE and
       * the classesToPreserve array from the options object.
       *
       * @param Element
       * @return void
       */
      _cleanClasses: function(node) {
        var classesToPreserve = this._classesToPreserve;
        var className = (node.getAttribute("class") || "").split(/\s+/).filter(function(cls) {
          return classesToPreserve.indexOf(cls) != -1;
        }).join(" ");
        if (className) {
          node.setAttribute("class", className);
        } else {
          node.removeAttribute("class");
        }
        for (node = node.firstElementChild; node; node = node.nextElementSibling) {
          this._cleanClasses(node);
        }
      },
      /**
       * Converts each <a> and <img> uri in the given element to an absolute URI,
       * ignoring #ref URIs.
       *
       * @param Element
       * @return void
       */
      _fixRelativeUris: function(articleContent) {
        var baseURI = this._doc.baseURI;
        var documentURI = this._doc.documentURI;
        function toAbsoluteURI(uri) {
          if (baseURI == documentURI && uri.charAt(0) == "#") {
            return uri;
          }
          try {
            return new URL(uri, baseURI).href;
          } catch (ex) {
          }
          return uri;
        }
        var links = this._getAllNodesWithTag(articleContent, ["a"]);
        this._forEachNode(links, function(link) {
          var href = link.getAttribute("href");
          if (href) {
            if (href.indexOf("javascript:") === 0) {
              if (link.childNodes.length === 1 && link.childNodes[0].nodeType === this.TEXT_NODE) {
                var text = this._doc.createTextNode(link.textContent);
                link.parentNode.replaceChild(text, link);
              } else {
                var container = this._doc.createElement("span");
                while (link.firstChild) {
                  container.appendChild(link.firstChild);
                }
                link.parentNode.replaceChild(container, link);
              }
            } else {
              link.setAttribute("href", toAbsoluteURI(href));
            }
          }
        });
        var medias = this._getAllNodesWithTag(articleContent, [
          "img",
          "picture",
          "figure",
          "video",
          "audio",
          "source"
        ]);
        this._forEachNode(medias, function(media) {
          var src = media.getAttribute("src");
          var poster = media.getAttribute("poster");
          var srcset = media.getAttribute("srcset");
          if (src) {
            media.setAttribute("src", toAbsoluteURI(src));
          }
          if (poster) {
            media.setAttribute("poster", toAbsoluteURI(poster));
          }
          if (srcset) {
            var newSrcset = srcset.replace(this.REGEXPS.srcsetUrl, function(_, p1, p2, p3) {
              return toAbsoluteURI(p1) + (p2 || "") + p3;
            });
            media.setAttribute("srcset", newSrcset);
          }
        });
      },
      _simplifyNestedElements: function(articleContent) {
        var node = articleContent;
        while (node) {
          if (node.parentNode && ["DIV", "SECTION"].includes(node.tagName) && !(node.id && node.id.startsWith("readability"))) {
            if (this._isElementWithoutContent(node)) {
              node = this._removeAndGetNext(node);
              continue;
            } else if (this._hasSingleTagInsideElement(node, "DIV") || this._hasSingleTagInsideElement(node, "SECTION")) {
              var child = node.children[0];
              for (var i = 0; i < node.attributes.length; i++) {
                child.setAttribute(node.attributes[i].name, node.attributes[i].value);
              }
              node.parentNode.replaceChild(child, node);
              node = child;
              continue;
            }
          }
          node = this._getNextNode(node);
        }
      },
      /**
       * Get the article title as an H1.
       *
       * @return string
       **/
      _getArticleTitle: function() {
        var doc = this._doc;
        var curTitle = "";
        var origTitle = "";
        try {
          curTitle = origTitle = doc.title.trim();
          if (typeof curTitle !== "string")
            curTitle = origTitle = this._getInnerText(doc.getElementsByTagName("title")[0]);
        } catch (e) {
        }
        var titleHadHierarchicalSeparators = false;
        function wordCount(str) {
          return str.split(/\s+/).length;
        }
        if (/ [\|\-\\\/>»] /.test(curTitle)) {
          titleHadHierarchicalSeparators = / [\\\/>»] /.test(curTitle);
          curTitle = origTitle.replace(/(.*)[\|\-\\\/>»] .*/gi, "$1");
          if (wordCount(curTitle) < 3)
            curTitle = origTitle.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, "$1");
        } else if (curTitle.indexOf(": ") !== -1) {
          var headings = this._concatNodeLists(
            doc.getElementsByTagName("h1"),
            doc.getElementsByTagName("h2")
          );
          var trimmedTitle = curTitle.trim();
          var match = this._someNode(headings, function(heading) {
            return heading.textContent.trim() === trimmedTitle;
          });
          if (!match) {
            curTitle = origTitle.substring(origTitle.lastIndexOf(":") + 1);
            if (wordCount(curTitle) < 3) {
              curTitle = origTitle.substring(origTitle.indexOf(":") + 1);
            } else if (wordCount(origTitle.substr(0, origTitle.indexOf(":"))) > 5) {
              curTitle = origTitle;
            }
          }
        } else if (curTitle.length > 150 || curTitle.length < 15) {
          var hOnes = doc.getElementsByTagName("h1");
          if (hOnes.length === 1)
            curTitle = this._getInnerText(hOnes[0]);
        }
        curTitle = curTitle.trim().replace(this.REGEXPS.normalize, " ");
        var curTitleWordCount = wordCount(curTitle);
        if (curTitleWordCount <= 4 && (!titleHadHierarchicalSeparators || curTitleWordCount != wordCount(origTitle.replace(/[\|\-\\\/>»]+/g, "")) - 1)) {
          curTitle = origTitle;
        }
        return curTitle;
      },
      /**
       * Prepare the HTML document for readability to scrape it.
       * This includes things like stripping javascript, CSS, and handling terrible markup.
       *
       * @return void
       **/
      _prepDocument: function() {
        var doc = this._doc;
        this._removeNodes(this._getAllNodesWithTag(doc, ["style"]));
        if (doc.body) {
          this._replaceBrs(doc.body);
        }
        this._replaceNodeTags(this._getAllNodesWithTag(doc, ["font"]), "SPAN");
      },
      /**
       * Finds the next node, starting from the given node, and ignoring
       * whitespace in between. If the given node is an element, the same node is
       * returned.
       */
      _nextNode: function(node) {
        var next = node;
        while (next && next.nodeType != this.ELEMENT_NODE && this.REGEXPS.whitespace.test(next.textContent)) {
          next = next.nextSibling;
        }
        return next;
      },
      /**
       * Replaces 2 or more successive <br> elements with a single <p>.
       * Whitespace between <br> elements are ignored. For example:
       *   <div>foo<br>bar<br> <br><br>abc</div>
       * will become:
       *   <div>foo<br>bar<p>abc</p></div>
       */
      _replaceBrs: function(elem) {
        this._forEachNode(this._getAllNodesWithTag(elem, ["br"]), function(br) {
          var next = br.nextSibling;
          var replaced = false;
          while ((next = this._nextNode(next)) && next.tagName == "BR") {
            replaced = true;
            var brSibling = next.nextSibling;
            next.parentNode.removeChild(next);
            next = brSibling;
          }
          if (replaced) {
            var p = this._doc.createElement("p");
            br.parentNode.replaceChild(p, br);
            next = p.nextSibling;
            while (next) {
              if (next.tagName == "BR") {
                var nextElem = this._nextNode(next.nextSibling);
                if (nextElem && nextElem.tagName == "BR")
                  break;
              }
              if (!this._isPhrasingContent(next))
                break;
              var sibling = next.nextSibling;
              p.appendChild(next);
              next = sibling;
            }
            while (p.lastChild && this._isWhitespace(p.lastChild)) {
              p.removeChild(p.lastChild);
            }
            if (p.parentNode.tagName === "P")
              this._setNodeTag(p.parentNode, "DIV");
          }
        });
      },
      _setNodeTag: function(node, tag) {
        this.log("_setNodeTag", node, tag);
        if (this._docJSDOMParser) {
          node.localName = tag.toLowerCase();
          node.tagName = tag.toUpperCase();
          return node;
        }
        var replacement = node.ownerDocument.createElement(tag);
        while (node.firstChild) {
          replacement.appendChild(node.firstChild);
        }
        node.parentNode.replaceChild(replacement, node);
        if (node.readability)
          replacement.readability = node.readability;
        for (var i = 0; i < node.attributes.length; i++) {
          try {
            replacement.setAttribute(node.attributes[i].name, node.attributes[i].value);
          } catch (ex) {
          }
        }
        return replacement;
      },
      /**
       * Prepare the article node for display. Clean out any inline styles,
       * iframes, forms, strip extraneous <p> tags, etc.
       *
       * @param Element
       * @return void
       **/
      _prepArticle: function(articleContent) {
        this._cleanStyles(articleContent);
        this._markDataTables(articleContent);
        this._fixLazyImages(articleContent);
        this._cleanConditionally(articleContent, "form");
        this._cleanConditionally(articleContent, "fieldset");
        this._clean(articleContent, "object");
        this._clean(articleContent, "embed");
        this._clean(articleContent, "footer");
        this._clean(articleContent, "link");
        this._clean(articleContent, "aside");
        var shareElementThreshold = this.DEFAULT_CHAR_THRESHOLD;
        this._forEachNode(articleContent.children, function(topCandidate) {
          this._cleanMatchedNodes(topCandidate, function(node, matchString) {
            return this.REGEXPS.shareElements.test(matchString) && node.textContent.length < shareElementThreshold;
          });
        });
        this._clean(articleContent, "iframe");
        this._clean(articleContent, "input");
        this._clean(articleContent, "textarea");
        this._clean(articleContent, "select");
        this._clean(articleContent, "button");
        this._cleanHeaders(articleContent);
        this._cleanConditionally(articleContent, "table");
        this._cleanConditionally(articleContent, "ul");
        this._cleanConditionally(articleContent, "div");
        this._replaceNodeTags(this._getAllNodesWithTag(articleContent, ["h1"]), "h2");
        this._removeNodes(this._getAllNodesWithTag(articleContent, ["p"]), function(paragraph) {
          var imgCount = paragraph.getElementsByTagName("img").length;
          var embedCount = paragraph.getElementsByTagName("embed").length;
          var objectCount = paragraph.getElementsByTagName("object").length;
          var iframeCount = paragraph.getElementsByTagName("iframe").length;
          var totalCount = imgCount + embedCount + objectCount + iframeCount;
          return totalCount === 0 && !this._getInnerText(paragraph, false);
        });
        this._forEachNode(this._getAllNodesWithTag(articleContent, ["br"]), function(br) {
          var next = this._nextNode(br.nextSibling);
          if (next && next.tagName == "P")
            br.parentNode.removeChild(br);
        });
        this._forEachNode(this._getAllNodesWithTag(articleContent, ["table"]), function(table) {
          var tbody = this._hasSingleTagInsideElement(table, "TBODY") ? table.firstElementChild : table;
          if (this._hasSingleTagInsideElement(tbody, "TR")) {
            var row = tbody.firstElementChild;
            if (this._hasSingleTagInsideElement(row, "TD")) {
              var cell = row.firstElementChild;
              cell = this._setNodeTag(cell, this._everyNode(cell.childNodes, this._isPhrasingContent) ? "P" : "DIV");
              table.parentNode.replaceChild(cell, table);
            }
          }
        });
      },
      /**
       * Initialize a node with the readability object. Also checks the
       * className/id for special names to add to its score.
       *
       * @param Element
       * @return void
      **/
      _initializeNode: function(node) {
        node.readability = { "contentScore": 0 };
        switch (node.tagName) {
          case "DIV":
            node.readability.contentScore += 5;
            break;
          case "PRE":
          case "TD":
          case "BLOCKQUOTE":
            node.readability.contentScore += 3;
            break;
          case "ADDRESS":
          case "OL":
          case "UL":
          case "DL":
          case "DD":
          case "DT":
          case "LI":
          case "FORM":
            node.readability.contentScore -= 3;
            break;
          case "H1":
          case "H2":
          case "H3":
          case "H4":
          case "H5":
          case "H6":
          case "TH":
            node.readability.contentScore -= 5;
            break;
        }
        node.readability.contentScore += this._getClassWeight(node);
      },
      _removeAndGetNext: function(node) {
        var nextNode = this._getNextNode(node, true);
        node.parentNode.removeChild(node);
        return nextNode;
      },
      /**
       * Traverse the DOM from node to node, starting at the node passed in.
       * Pass true for the second parameter to indicate this node itself
       * (and its kids) are going away, and we want the next node over.
       *
       * Calling this in a loop will traverse the DOM depth-first.
       */
      _getNextNode: function(node, ignoreSelfAndKids) {
        if (!ignoreSelfAndKids && node.firstElementChild) {
          return node.firstElementChild;
        }
        if (node.nextElementSibling) {
          return node.nextElementSibling;
        }
        do {
          node = node.parentNode;
        } while (node && !node.nextElementSibling);
        return node && node.nextElementSibling;
      },
      // compares second text to first one
      // 1 = same text, 0 = completely different text
      // works the way that it splits both texts into words and then finds words that are unique in second text
      // the result is given by the lower length of unique parts
      _textSimilarity: function(textA, textB) {
        var tokensA = textA.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
        var tokensB = textB.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
        if (!tokensA.length || !tokensB.length) {
          return 0;
        }
        var uniqTokensB = tokensB.filter((token) => !tokensA.includes(token));
        var distanceB = uniqTokensB.join(" ").length / tokensB.join(" ").length;
        return 1 - distanceB;
      },
      _checkByline: function(node, matchString) {
        if (this._articleByline) {
          return false;
        }
        if (node.getAttribute !== void 0) {
          var rel = node.getAttribute("rel");
          var itemprop = node.getAttribute("itemprop");
        }
        if ((rel === "author" || itemprop && itemprop.indexOf("author") !== -1 || this.REGEXPS.byline.test(matchString)) && this._isValidByline(node.textContent)) {
          this._articleByline = node.textContent.trim();
          return true;
        }
        return false;
      },
      _getNodeAncestors: function(node, maxDepth) {
        maxDepth = maxDepth || 0;
        var i = 0, ancestors = [];
        while (node.parentNode) {
          ancestors.push(node.parentNode);
          if (maxDepth && ++i === maxDepth)
            break;
          node = node.parentNode;
        }
        return ancestors;
      },
      /***
       * grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
       *         most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
       *
       * @param page a document to run upon. Needs to be a full document, complete with body.
       * @return Element
      **/
      _grabArticle: function(page) {
        this.log("**** grabArticle ****");
        var doc = this._doc;
        var isPaging = page !== null;
        page = page ? page : this._doc.body;
        if (!page) {
          this.log("No body found in document. Abort.");
          return null;
        }
        var pageCacheHtml = page.innerHTML;
        while (true) {
          this.log("Starting grabArticle loop");
          var stripUnlikelyCandidates = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS);
          var elementsToScore = [];
          var node = this._doc.documentElement;
          let shouldRemoveTitleHeader = true;
          while (node) {
            if (node.tagName === "HTML") {
              this._articleLang = node.getAttribute("lang");
            }
            var matchString = node.className + " " + node.id;
            if (!this._isProbablyVisible(node)) {
              this.log("Removing hidden node - " + matchString);
              node = this._removeAndGetNext(node);
              continue;
            }
            if (this._checkByline(node, matchString)) {
              node = this._removeAndGetNext(node);
              continue;
            }
            if (shouldRemoveTitleHeader && this._headerDuplicatesTitle(node)) {
              this.log("Removing header: ", node.textContent.trim(), this._articleTitle.trim());
              shouldRemoveTitleHeader = false;
              node = this._removeAndGetNext(node);
              continue;
            }
            if (stripUnlikelyCandidates) {
              if (this.REGEXPS.unlikelyCandidates.test(matchString) && !this.REGEXPS.okMaybeItsACandidate.test(matchString) && !this._hasAncestorTag(node, "table") && !this._hasAncestorTag(node, "code") && node.tagName !== "BODY" && node.tagName !== "A") {
                this.log("Removing unlikely candidate - " + matchString);
                node = this._removeAndGetNext(node);
                continue;
              }
              if (this.UNLIKELY_ROLES.includes(node.getAttribute("role"))) {
                this.log("Removing content with role " + node.getAttribute("role") + " - " + matchString);
                node = this._removeAndGetNext(node);
                continue;
              }
            }
            if ((node.tagName === "DIV" || node.tagName === "SECTION" || node.tagName === "HEADER" || node.tagName === "H1" || node.tagName === "H2" || node.tagName === "H3" || node.tagName === "H4" || node.tagName === "H5" || node.tagName === "H6") && this._isElementWithoutContent(node)) {
              node = this._removeAndGetNext(node);
              continue;
            }
            if (this.DEFAULT_TAGS_TO_SCORE.indexOf(node.tagName) !== -1) {
              elementsToScore.push(node);
            }
            if (node.tagName === "DIV") {
              var p = null;
              var childNode = node.firstChild;
              while (childNode) {
                var nextSibling2 = childNode.nextSibling;
                if (this._isPhrasingContent(childNode)) {
                  if (p !== null) {
                    p.appendChild(childNode);
                  } else if (!this._isWhitespace(childNode)) {
                    p = doc.createElement("p");
                    node.replaceChild(p, childNode);
                    p.appendChild(childNode);
                  }
                } else if (p !== null) {
                  while (p.lastChild && this._isWhitespace(p.lastChild)) {
                    p.removeChild(p.lastChild);
                  }
                  p = null;
                }
                childNode = nextSibling2;
              }
              if (this._hasSingleTagInsideElement(node, "P") && this._getLinkDensity(node) < 0.25) {
                var newNode = node.children[0];
                node.parentNode.replaceChild(newNode, node);
                node = newNode;
                elementsToScore.push(node);
              } else if (!this._hasChildBlockElement(node)) {
                node = this._setNodeTag(node, "P");
                elementsToScore.push(node);
              }
            }
            node = this._getNextNode(node);
          }
          var candidates = [];
          this._forEachNode(elementsToScore, function(elementToScore) {
            if (!elementToScore.parentNode || typeof elementToScore.parentNode.tagName === "undefined")
              return;
            var innerText = this._getInnerText(elementToScore);
            if (innerText.length < 25)
              return;
            var ancestors2 = this._getNodeAncestors(elementToScore, 5);
            if (ancestors2.length === 0)
              return;
            var contentScore = 0;
            contentScore += 1;
            contentScore += innerText.split(",").length;
            contentScore += Math.min(Math.floor(innerText.length / 100), 3);
            this._forEachNode(ancestors2, function(ancestor, level) {
              if (!ancestor.tagName || !ancestor.parentNode || typeof ancestor.parentNode.tagName === "undefined")
                return;
              if (typeof ancestor.readability === "undefined") {
                this._initializeNode(ancestor);
                candidates.push(ancestor);
              }
              if (level === 0)
                var scoreDivider = 1;
              else if (level === 1)
                scoreDivider = 2;
              else
                scoreDivider = level * 3;
              ancestor.readability.contentScore += contentScore / scoreDivider;
            });
          });
          var topCandidates = [];
          for (var c = 0, cl = candidates.length; c < cl; c += 1) {
            var candidate = candidates[c];
            var candidateScore = candidate.readability.contentScore * (1 - this._getLinkDensity(candidate));
            candidate.readability.contentScore = candidateScore;
            this.log("Candidate:", candidate, "with score " + candidateScore);
            for (var t = 0; t < this._nbTopCandidates; t++) {
              var aTopCandidate = topCandidates[t];
              if (!aTopCandidate || candidateScore > aTopCandidate.readability.contentScore) {
                topCandidates.splice(t, 0, candidate);
                if (topCandidates.length > this._nbTopCandidates)
                  topCandidates.pop();
                break;
              }
            }
          }
          var topCandidate = topCandidates[0] || null;
          var neededToCreateTopCandidate = false;
          var parentOfTopCandidate;
          if (topCandidate === null || topCandidate.tagName === "BODY") {
            topCandidate = doc.createElement("DIV");
            neededToCreateTopCandidate = true;
            while (page.firstChild) {
              this.log("Moving child out:", page.firstChild);
              topCandidate.appendChild(page.firstChild);
            }
            page.appendChild(topCandidate);
            this._initializeNode(topCandidate);
          } else if (topCandidate) {
            var alternativeCandidateAncestors = [];
            for (var i = 1; i < topCandidates.length; i++) {
              if (topCandidates[i].readability.contentScore / topCandidate.readability.contentScore >= 0.75) {
                alternativeCandidateAncestors.push(this._getNodeAncestors(topCandidates[i]));
              }
            }
            var MINIMUM_TOPCANDIDATES = 3;
            if (alternativeCandidateAncestors.length >= MINIMUM_TOPCANDIDATES) {
              parentOfTopCandidate = topCandidate.parentNode;
              while (parentOfTopCandidate.tagName !== "BODY") {
                var listsContainingThisAncestor = 0;
                for (var ancestorIndex = 0; ancestorIndex < alternativeCandidateAncestors.length && listsContainingThisAncestor < MINIMUM_TOPCANDIDATES; ancestorIndex++) {
                  listsContainingThisAncestor += Number(alternativeCandidateAncestors[ancestorIndex].includes(parentOfTopCandidate));
                }
                if (listsContainingThisAncestor >= MINIMUM_TOPCANDIDATES) {
                  topCandidate = parentOfTopCandidate;
                  break;
                }
                parentOfTopCandidate = parentOfTopCandidate.parentNode;
              }
            }
            if (!topCandidate.readability) {
              this._initializeNode(topCandidate);
            }
            parentOfTopCandidate = topCandidate.parentNode;
            var lastScore = topCandidate.readability.contentScore;
            var scoreThreshold = lastScore / 3;
            while (parentOfTopCandidate.tagName !== "BODY") {
              if (!parentOfTopCandidate.readability) {
                parentOfTopCandidate = parentOfTopCandidate.parentNode;
                continue;
              }
              var parentScore = parentOfTopCandidate.readability.contentScore;
              if (parentScore < scoreThreshold)
                break;
              if (parentScore > lastScore) {
                topCandidate = parentOfTopCandidate;
                break;
              }
              lastScore = parentOfTopCandidate.readability.contentScore;
              parentOfTopCandidate = parentOfTopCandidate.parentNode;
            }
            parentOfTopCandidate = topCandidate.parentNode;
            while (parentOfTopCandidate.tagName != "BODY" && parentOfTopCandidate.children.length == 1) {
              topCandidate = parentOfTopCandidate;
              parentOfTopCandidate = topCandidate.parentNode;
            }
            if (!topCandidate.readability) {
              this._initializeNode(topCandidate);
            }
          }
          var articleContent = doc.createElement("DIV");
          if (isPaging)
            articleContent.id = "readability-content";
          var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * 0.2);
          parentOfTopCandidate = topCandidate.parentNode;
          var siblings = parentOfTopCandidate.children;
          for (var s = 0, sl = siblings.length; s < sl; s++) {
            var sibling = siblings[s];
            var append2 = false;
            this.log("Looking at sibling node:", sibling, sibling.readability ? "with score " + sibling.readability.contentScore : "");
            this.log("Sibling has score", sibling.readability ? sibling.readability.contentScore : "Unknown");
            if (sibling === topCandidate) {
              append2 = true;
            } else {
              var contentBonus = 0;
              if (sibling.className === topCandidate.className && topCandidate.className !== "")
                contentBonus += topCandidate.readability.contentScore * 0.2;
              if (sibling.readability && sibling.readability.contentScore + contentBonus >= siblingScoreThreshold) {
                append2 = true;
              } else if (sibling.nodeName === "P") {
                var linkDensity = this._getLinkDensity(sibling);
                var nodeContent = this._getInnerText(sibling);
                var nodeLength = nodeContent.length;
                if (nodeLength > 80 && linkDensity < 0.25) {
                  append2 = true;
                } else if (nodeLength < 80 && nodeLength > 0 && linkDensity === 0 && nodeContent.search(/\.( |$)/) !== -1) {
                  append2 = true;
                }
              }
            }
            if (append2) {
              this.log("Appending node:", sibling);
              if (this.ALTER_TO_DIV_EXCEPTIONS.indexOf(sibling.nodeName) === -1) {
                this.log("Altering sibling:", sibling, "to div.");
                sibling = this._setNodeTag(sibling, "DIV");
              }
              articleContent.appendChild(sibling);
              siblings = parentOfTopCandidate.children;
              s -= 1;
              sl -= 1;
            }
          }
          if (this._debug)
            this.log("Article content pre-prep: " + articleContent.innerHTML);
          this._prepArticle(articleContent);
          if (this._debug)
            this.log("Article content post-prep: " + articleContent.innerHTML);
          if (neededToCreateTopCandidate) {
            topCandidate.id = "readability-page-1";
            topCandidate.className = "page";
          } else {
            var div = doc.createElement("DIV");
            div.id = "readability-page-1";
            div.className = "page";
            while (articleContent.firstChild) {
              div.appendChild(articleContent.firstChild);
            }
            articleContent.appendChild(div);
          }
          if (this._debug)
            this.log("Article content after paging: " + articleContent.innerHTML);
          var parseSuccessful = true;
          var textLength = this._getInnerText(articleContent, true).length;
          if (textLength < this._charThreshold) {
            parseSuccessful = false;
            page.innerHTML = pageCacheHtml;
            if (this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) {
              this._removeFlag(this.FLAG_STRIP_UNLIKELYS);
              this._attempts.push({ articleContent, textLength });
            } else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) {
              this._removeFlag(this.FLAG_WEIGHT_CLASSES);
              this._attempts.push({ articleContent, textLength });
            } else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
              this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY);
              this._attempts.push({ articleContent, textLength });
            } else {
              this._attempts.push({ articleContent, textLength });
              this._attempts.sort(function(a, b) {
                return b.textLength - a.textLength;
              });
              if (!this._attempts[0].textLength) {
                return null;
              }
              articleContent = this._attempts[0].articleContent;
              parseSuccessful = true;
            }
          }
          if (parseSuccessful) {
            var ancestors = [parentOfTopCandidate, topCandidate].concat(this._getNodeAncestors(parentOfTopCandidate));
            this._someNode(ancestors, function(ancestor) {
              if (!ancestor.tagName)
                return false;
              var articleDir = ancestor.getAttribute("dir");
              if (articleDir) {
                this._articleDir = articleDir;
                return true;
              }
              return false;
            });
            return articleContent;
          }
        }
      },
      /**
       * Check whether the input string could be a byline.
       * This verifies that the input is a string, and that the length
       * is less than 100 chars.
       *
       * @param possibleByline {string} - a string to check whether its a byline.
       * @return Boolean - whether the input string is a byline.
       */
      _isValidByline: function(byline) {
        if (typeof byline == "string" || byline instanceof String) {
          byline = byline.trim();
          return byline.length > 0 && byline.length < 100;
        }
        return false;
      },
      /**
       * Converts some of the common HTML entities in string to their corresponding characters.
       *
       * @param str {string} - a string to unescape.
       * @return string without HTML entity.
       */
      _unescapeHtmlEntities: function(str) {
        if (!str) {
          return str;
        }
        var htmlEscapeMap = this.HTML_ESCAPE_MAP;
        return str.replace(/&(quot|amp|apos|lt|gt);/g, function(_, tag) {
          return htmlEscapeMap[tag];
        }).replace(/&#(?:x([0-9a-z]{1,4})|([0-9]{1,4}));/gi, function(_, hex, numStr) {
          var num = parseInt(hex || numStr, hex ? 16 : 10);
          return String.fromCharCode(num);
        });
      },
      /**
       * Try to extract metadata from JSON-LD object.
       * For now, only Schema.org objects of type Article or its subtypes are supported.
       * @return Object with any metadata that could be extracted (possibly none)
       */
      _getJSONLD: function(doc) {
        var scripts = this._getAllNodesWithTag(doc, ["script"]);
        var metadata;
        this._forEachNode(scripts, function(jsonLdElement) {
          if (!metadata && jsonLdElement.getAttribute("type") === "application/ld+json") {
            try {
              var content = jsonLdElement.textContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "");
              var parsed = JSON.parse(content);
              if (!parsed["@context"] || !parsed["@context"].match(/^https?\:\/\/schema\.org$/)) {
                return;
              }
              if (!parsed["@type"] && Array.isArray(parsed["@graph"])) {
                parsed = parsed["@graph"].find(function(it) {
                  return (it["@type"] || "").match(
                    this.REGEXPS.jsonLdArticleTypes
                  );
                });
              }
              if (!parsed || !parsed["@type"] || !parsed["@type"].match(this.REGEXPS.jsonLdArticleTypes)) {
                return;
              }
              metadata = {};
              if (typeof parsed.name === "string" && typeof parsed.headline === "string" && parsed.name !== parsed.headline) {
                var title = this._getArticleTitle();
                var nameMatches = this._textSimilarity(parsed.name, title) > 0.75;
                var headlineMatches = this._textSimilarity(parsed.headline, title) > 0.75;
                if (headlineMatches && !nameMatches) {
                  metadata.title = parsed.headline;
                } else {
                  metadata.title = parsed.name;
                }
              } else if (typeof parsed.name === "string") {
                metadata.title = parsed.name.trim();
              } else if (typeof parsed.headline === "string") {
                metadata.title = parsed.headline.trim();
              }
              if (parsed.author) {
                if (typeof parsed.author.name === "string") {
                  metadata.byline = parsed.author.name.trim();
                } else if (Array.isArray(parsed.author) && parsed.author[0] && typeof parsed.author[0].name === "string") {
                  metadata.byline = parsed.author.filter(function(author) {
                    return author && typeof author.name === "string";
                  }).map(function(author) {
                    return author.name.trim();
                  }).join(", ");
                }
              }
              if (typeof parsed.description === "string") {
                metadata.excerpt = parsed.description.trim();
              }
              if (parsed.publisher && typeof parsed.publisher.name === "string") {
                metadata.siteName = parsed.publisher.name.trim();
              }
              return;
            } catch (err) {
              this.log(err.message);
            }
          }
        });
        return metadata ? metadata : {};
      },
      /**
       * Attempts to get excerpt and byline metadata for the article.
       *
       * @param {Object} jsonld — object containing any metadata that
       * could be extracted from JSON-LD object.
       *
       * @return Object with optional "excerpt" and "byline" properties
       */
      _getArticleMetadata: function(jsonld) {
        var metadata = {};
        var values = {};
        var metaElements = this._doc.getElementsByTagName("meta");
        var propertyPattern = /\s*(dc|dcterm|og|twitter)\s*:\s*(author|creator|description|title|site_name)\s*/gi;
        var namePattern = /^\s*(?:(dc|dcterm|og|twitter|weibo:(article|webpage))\s*[\.:]\s*)?(author|creator|description|title|site_name)\s*$/i;
        this._forEachNode(metaElements, function(element) {
          var elementName = element.getAttribute("name");
          var elementProperty = element.getAttribute("property");
          var content = element.getAttribute("content");
          if (!content) {
            return;
          }
          var matches2 = null;
          var name = null;
          if (elementProperty) {
            matches2 = elementProperty.match(propertyPattern);
            if (matches2) {
              name = matches2[0].toLowerCase().replace(/\s/g, "");
              values[name] = content.trim();
            }
          }
          if (!matches2 && elementName && namePattern.test(elementName)) {
            name = elementName;
            if (content) {
              name = name.toLowerCase().replace(/\s/g, "").replace(/\./g, ":");
              values[name] = content.trim();
            }
          }
        });
        metadata.title = jsonld.title || values["dc:title"] || values["dcterm:title"] || values["og:title"] || values["weibo:article:title"] || values["weibo:webpage:title"] || values["title"] || values["twitter:title"];
        if (!metadata.title) {
          metadata.title = this._getArticleTitle();
        }
        metadata.byline = jsonld.byline || values["dc:creator"] || values["dcterm:creator"] || values["author"];
        metadata.excerpt = jsonld.excerpt || values["dc:description"] || values["dcterm:description"] || values["og:description"] || values["weibo:article:description"] || values["weibo:webpage:description"] || values["description"] || values["twitter:description"];
        metadata.siteName = jsonld.siteName || values["og:site_name"];
        metadata.title = this._unescapeHtmlEntities(metadata.title);
        metadata.byline = this._unescapeHtmlEntities(metadata.byline);
        metadata.excerpt = this._unescapeHtmlEntities(metadata.excerpt);
        metadata.siteName = this._unescapeHtmlEntities(metadata.siteName);
        return metadata;
      },
      /**
       * Check if node is image, or if node contains exactly only one image
       * whether as a direct child or as its descendants.
       *
       * @param Element
      **/
      _isSingleImage: function(node) {
        if (node.tagName === "IMG") {
          return true;
        }
        if (node.children.length !== 1 || node.textContent.trim() !== "") {
          return false;
        }
        return this._isSingleImage(node.children[0]);
      },
      /**
       * Find all <noscript> that are located after <img> nodes, and which contain only one
       * <img> element. Replace the first image with the image from inside the <noscript> tag,
       * and remove the <noscript> tag. This improves the quality of the images we use on
       * some sites (e.g. Medium).
       *
       * @param Element
      **/
      _unwrapNoscriptImages: function(doc) {
        var imgs = Array.from(doc.getElementsByTagName("img"));
        this._forEachNode(imgs, function(img) {
          for (var i = 0; i < img.attributes.length; i++) {
            var attr = img.attributes[i];
            switch (attr.name) {
              case "src":
              case "srcset":
              case "data-src":
              case "data-srcset":
                return;
            }
            if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
              return;
            }
          }
          img.parentNode.removeChild(img);
        });
        var noscripts = Array.from(doc.getElementsByTagName("noscript"));
        this._forEachNode(noscripts, function(noscript) {
          var tmp = doc.createElement("div");
          tmp.innerHTML = noscript.innerHTML;
          if (!this._isSingleImage(tmp)) {
            return;
          }
          var prevElement = noscript.previousElementSibling;
          if (prevElement && this._isSingleImage(prevElement)) {
            var prevImg = prevElement;
            if (prevImg.tagName !== "IMG") {
              prevImg = prevElement.getElementsByTagName("img")[0];
            }
            var newImg = tmp.getElementsByTagName("img")[0];
            for (var i = 0; i < prevImg.attributes.length; i++) {
              var attr = prevImg.attributes[i];
              if (attr.value === "") {
                continue;
              }
              if (attr.name === "src" || attr.name === "srcset" || /\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
                if (newImg.getAttribute(attr.name) === attr.value) {
                  continue;
                }
                var attrName = attr.name;
                if (newImg.hasAttribute(attrName)) {
                  attrName = "data-old-" + attrName;
                }
                newImg.setAttribute(attrName, attr.value);
              }
            }
            noscript.parentNode.replaceChild(tmp.firstElementChild, prevElement);
          }
        });
      },
      /**
       * Removes script tags from the document.
       *
       * @param Element
      **/
      _removeScripts: function(doc) {
        this._removeNodes(this._getAllNodesWithTag(doc, ["script"]), function(scriptNode) {
          scriptNode.nodeValue = "";
          scriptNode.removeAttribute("src");
          return true;
        });
        this._removeNodes(this._getAllNodesWithTag(doc, ["noscript"]));
      },
      /**
       * Check if this node has only whitespace and a single element with given tag
       * Returns false if the DIV node contains non-empty text nodes
       * or if it contains no element with given tag or more than 1 element.
       *
       * @param Element
       * @param string tag of child element
      **/
      _hasSingleTagInsideElement: function(element, tag) {
        if (element.children.length != 1 || element.children[0].tagName !== tag) {
          return false;
        }
        return !this._someNode(element.childNodes, function(node) {
          return node.nodeType === this.TEXT_NODE && this.REGEXPS.hasContent.test(node.textContent);
        });
      },
      _isElementWithoutContent: function(node) {
        return node.nodeType === this.ELEMENT_NODE && node.textContent.trim().length == 0 && (node.children.length == 0 || node.children.length == node.getElementsByTagName("br").length + node.getElementsByTagName("hr").length);
      },
      /**
       * Determine whether element has any children block level elements.
       *
       * @param Element
       */
      _hasChildBlockElement: function(element) {
        return this._someNode(element.childNodes, function(node) {
          return this.DIV_TO_P_ELEMS.has(node.tagName) || this._hasChildBlockElement(node);
        });
      },
      /***
       * Determine if a node qualifies as phrasing content.
       * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
      **/
      _isPhrasingContent: function(node) {
        return node.nodeType === this.TEXT_NODE || this.PHRASING_ELEMS.indexOf(node.tagName) !== -1 || (node.tagName === "A" || node.tagName === "DEL" || node.tagName === "INS") && this._everyNode(node.childNodes, this._isPhrasingContent);
      },
      _isWhitespace: function(node) {
        return node.nodeType === this.TEXT_NODE && node.textContent.trim().length === 0 || node.nodeType === this.ELEMENT_NODE && node.tagName === "BR";
      },
      /**
       * Get the inner text of a node - cross browser compatibly.
       * This also strips out any excess whitespace to be found.
       *
       * @param Element
       * @param Boolean normalizeSpaces (default: true)
       * @return string
      **/
      _getInnerText: function(e, normalizeSpaces) {
        normalizeSpaces = typeof normalizeSpaces === "undefined" ? true : normalizeSpaces;
        var textContent = e.textContent.trim();
        if (normalizeSpaces) {
          return textContent.replace(this.REGEXPS.normalize, " ");
        }
        return textContent;
      },
      /**
       * Get the number of times a string s appears in the node e.
       *
       * @param Element
       * @param string - what to split on. Default is ","
       * @return number (integer)
      **/
      _getCharCount: function(e, s) {
        s = s || ",";
        return this._getInnerText(e).split(s).length - 1;
      },
      /**
       * Remove the style attribute on every e and under.
       * TODO: Test if getElementsByTagName(*) is faster.
       *
       * @param Element
       * @return void
      **/
      _cleanStyles: function(e) {
        if (!e || e.tagName.toLowerCase() === "svg")
          return;
        for (var i = 0; i < this.PRESENTATIONAL_ATTRIBUTES.length; i++) {
          e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[i]);
        }
        if (this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.indexOf(e.tagName) !== -1) {
          e.removeAttribute("width");
          e.removeAttribute("height");
        }
        var cur = e.firstElementChild;
        while (cur !== null) {
          this._cleanStyles(cur);
          cur = cur.nextElementSibling;
        }
      },
      /**
       * Get the density of links as a percentage of the content
       * This is the amount of text that is inside a link divided by the total text in the node.
       *
       * @param Element
       * @return number (float)
      **/
      _getLinkDensity: function(element) {
        var textLength = this._getInnerText(element).length;
        if (textLength === 0)
          return 0;
        var linkLength = 0;
        this._forEachNode(element.getElementsByTagName("a"), function(linkNode) {
          var href = linkNode.getAttribute("href");
          var coefficient = href && this.REGEXPS.hashUrl.test(href) ? 0.3 : 1;
          linkLength += this._getInnerText(linkNode).length * coefficient;
        });
        return linkLength / textLength;
      },
      /**
       * Get an elements class/id weight. Uses regular expressions to tell if this
       * element looks good or bad.
       *
       * @param Element
       * @return number (Integer)
      **/
      _getClassWeight: function(e) {
        if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES))
          return 0;
        var weight = 0;
        if (typeof e.className === "string" && e.className !== "") {
          if (this.REGEXPS.negative.test(e.className))
            weight -= 25;
          if (this.REGEXPS.positive.test(e.className))
            weight += 25;
        }
        if (typeof e.id === "string" && e.id !== "") {
          if (this.REGEXPS.negative.test(e.id))
            weight -= 25;
          if (this.REGEXPS.positive.test(e.id))
            weight += 25;
        }
        return weight;
      },
      /**
       * Clean a node of all elements of type "tag".
       * (Unless it's a youtube/vimeo video. People love movies.)
       *
       * @param Element
       * @param string tag to clean
       * @return void
       **/
      _clean: function(e, tag) {
        var isEmbed = ["object", "embed", "iframe"].indexOf(tag) !== -1;
        this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(element) {
          if (isEmbed) {
            for (var i = 0; i < element.attributes.length; i++) {
              if (this.REGEXPS.videos.test(element.attributes[i].value)) {
                return false;
              }
            }
            if (element.tagName === "object" && this.REGEXPS.videos.test(element.innerHTML)) {
              return false;
            }
          }
          return true;
        });
      },
      /**
       * Check if a given node has one of its ancestor tag name matching the
       * provided one.
       * @param  HTMLElement node
       * @param  String      tagName
       * @param  Number      maxDepth
       * @param  Function    filterFn a filter to invoke to determine whether this node 'counts'
       * @return Boolean
       */
      _hasAncestorTag: function(node, tagName18, maxDepth, filterFn) {
        maxDepth = maxDepth || 3;
        tagName18 = tagName18.toUpperCase();
        var depth = 0;
        while (node.parentNode) {
          if (maxDepth > 0 && depth > maxDepth)
            return false;
          if (node.parentNode.tagName === tagName18 && (!filterFn || filterFn(node.parentNode)))
            return true;
          node = node.parentNode;
          depth++;
        }
        return false;
      },
      /**
       * Return an object indicating how many rows and columns this table has.
       */
      _getRowAndColumnCount: function(table) {
        var rows = 0;
        var columns = 0;
        var trs = table.getElementsByTagName("tr");
        for (var i = 0; i < trs.length; i++) {
          var rowspan = trs[i].getAttribute("rowspan") || 0;
          if (rowspan) {
            rowspan = parseInt(rowspan, 10);
          }
          rows += rowspan || 1;
          var columnsInThisRow = 0;
          var cells = trs[i].getElementsByTagName("td");
          for (var j = 0; j < cells.length; j++) {
            var colspan = cells[j].getAttribute("colspan") || 0;
            if (colspan) {
              colspan = parseInt(colspan, 10);
            }
            columnsInThisRow += colspan || 1;
          }
          columns = Math.max(columns, columnsInThisRow);
        }
        return { rows, columns };
      },
      /**
       * Look for 'data' (as opposed to 'layout') tables, for which we use
       * similar checks as
       * https://searchfox.org/mozilla-central/rev/f82d5c549f046cb64ce5602bfd894b7ae807c8f8/accessible/generic/TableAccessible.cpp#19
       */
      _markDataTables: function(root) {
        var tables = root.getElementsByTagName("table");
        for (var i = 0; i < tables.length; i++) {
          var table = tables[i];
          var role = table.getAttribute("role");
          if (role == "presentation") {
            table._readabilityDataTable = false;
            continue;
          }
          var datatable = table.getAttribute("datatable");
          if (datatable == "0") {
            table._readabilityDataTable = false;
            continue;
          }
          var summary = table.getAttribute("summary");
          if (summary) {
            table._readabilityDataTable = true;
            continue;
          }
          var caption = table.getElementsByTagName("caption")[0];
          if (caption && caption.childNodes.length > 0) {
            table._readabilityDataTable = true;
            continue;
          }
          var dataTableDescendants = ["col", "colgroup", "tfoot", "thead", "th"];
          var descendantExists = function(tag) {
            return !!table.getElementsByTagName(tag)[0];
          };
          if (dataTableDescendants.some(descendantExists)) {
            this.log("Data table because found data-y descendant");
            table._readabilityDataTable = true;
            continue;
          }
          if (table.getElementsByTagName("table")[0]) {
            table._readabilityDataTable = false;
            continue;
          }
          var sizeInfo = this._getRowAndColumnCount(table);
          if (sizeInfo.rows >= 10 || sizeInfo.columns > 4) {
            table._readabilityDataTable = true;
            continue;
          }
          table._readabilityDataTable = sizeInfo.rows * sizeInfo.columns > 10;
        }
      },
      /* convert images and figures that have properties like data-src into images that can be loaded without JS */
      _fixLazyImages: function(root) {
        this._forEachNode(this._getAllNodesWithTag(root, ["img", "picture", "figure"]), function(elem) {
          if (elem.src && this.REGEXPS.b64DataUrl.test(elem.src)) {
            var parts = this.REGEXPS.b64DataUrl.exec(elem.src);
            if (parts[1] === "image/svg+xml") {
              return;
            }
            var srcCouldBeRemoved = false;
            for (var i = 0; i < elem.attributes.length; i++) {
              var attr = elem.attributes[i];
              if (attr.name === "src") {
                continue;
              }
              if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
                srcCouldBeRemoved = true;
                break;
              }
            }
            if (srcCouldBeRemoved) {
              var b64starts = elem.src.search(/base64\s*/i) + 7;
              var b64length = elem.src.length - b64starts;
              if (b64length < 133) {
                elem.removeAttribute("src");
              }
            }
          }
          if ((elem.src || elem.srcset && elem.srcset != "null") && elem.className.toLowerCase().indexOf("lazy") === -1) {
            return;
          }
          for (var j = 0; j < elem.attributes.length; j++) {
            attr = elem.attributes[j];
            if (attr.name === "src" || attr.name === "srcset" || attr.name === "alt") {
              continue;
            }
            var copyTo = null;
            if (/\.(jpg|jpeg|png|webp)\s+\d/.test(attr.value)) {
              copyTo = "srcset";
            } else if (/^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/.test(attr.value)) {
              copyTo = "src";
            }
            if (copyTo) {
              if (elem.tagName === "IMG" || elem.tagName === "PICTURE") {
                elem.setAttribute(copyTo, attr.value);
              } else if (elem.tagName === "FIGURE" && !this._getAllNodesWithTag(elem, ["img", "picture"]).length) {
                var img = this._doc.createElement("img");
                img.setAttribute(copyTo, attr.value);
                elem.appendChild(img);
              }
            }
          }
        });
      },
      _getTextDensity: function(e, tags) {
        var textLength = this._getInnerText(e, true).length;
        if (textLength === 0) {
          return 0;
        }
        var childrenLength = 0;
        var children = this._getAllNodesWithTag(e, tags);
        this._forEachNode(children, (child) => childrenLength += this._getInnerText(child, true).length);
        return childrenLength / textLength;
      },
      /**
       * Clean an element of all tags of type "tag" if they look fishy.
       * "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
       *
       * @return void
       **/
      _cleanConditionally: function(e, tag) {
        if (!this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY))
          return;
        this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(node) {
          var isDataTable = function(t) {
            return t._readabilityDataTable;
          };
          var isList = tag === "ul" || tag === "ol";
          if (!isList) {
            var listLength = 0;
            var listNodes = this._getAllNodesWithTag(node, ["ul", "ol"]);
            this._forEachNode(listNodes, (list) => listLength += this._getInnerText(list).length);
            isList = listLength / this._getInnerText(node).length > 0.9;
          }
          if (tag === "table" && isDataTable(node)) {
            return false;
          }
          if (this._hasAncestorTag(node, "table", -1, isDataTable)) {
            return false;
          }
          if (this._hasAncestorTag(node, "code")) {
            return false;
          }
          var weight = this._getClassWeight(node);
          this.log("Cleaning Conditionally", node);
          var contentScore = 0;
          if (weight + contentScore < 0) {
            return true;
          }
          if (this._getCharCount(node, ",") < 10) {
            var p = node.getElementsByTagName("p").length;
            var img = node.getElementsByTagName("img").length;
            var li = node.getElementsByTagName("li").length - 100;
            var input = node.getElementsByTagName("input").length;
            var headingDensity = this._getTextDensity(node, ["h1", "h2", "h3", "h4", "h5", "h6"]);
            var embedCount = 0;
            var embeds = this._getAllNodesWithTag(node, ["object", "embed", "iframe"]);
            for (var i = 0; i < embeds.length; i++) {
              for (var j = 0; j < embeds[i].attributes.length; j++) {
                if (this.REGEXPS.videos.test(embeds[i].attributes[j].value)) {
                  return false;
                }
              }
              if (embeds[i].tagName === "object" && this.REGEXPS.videos.test(embeds[i].innerHTML)) {
                return false;
              }
              embedCount++;
            }
            var linkDensity = this._getLinkDensity(node);
            var contentLength = this._getInnerText(node).length;
            var haveToRemove = img > 1 && p / img < 0.5 && !this._hasAncestorTag(node, "figure") || !isList && li > p || input > Math.floor(p / 3) || !isList && headingDensity < 0.9 && contentLength < 25 && (img === 0 || img > 2) && !this._hasAncestorTag(node, "figure") || !isList && weight < 25 && linkDensity > 0.2 || weight >= 25 && linkDensity > 0.5 || (embedCount === 1 && contentLength < 75 || embedCount > 1);
            return haveToRemove;
          }
          return false;
        });
      },
      /**
       * Clean out elements that match the specified conditions
       *
       * @param Element
       * @param Function determines whether a node should be removed
       * @return void
       **/
      _cleanMatchedNodes: function(e, filter) {
        var endOfSearchMarkerNode = this._getNextNode(e, true);
        var next = this._getNextNode(e);
        while (next && next != endOfSearchMarkerNode) {
          if (filter.call(this, next, next.className + " " + next.id)) {
            next = this._removeAndGetNext(next);
          } else {
            next = this._getNextNode(next);
          }
        }
      },
      /**
       * Clean out spurious headers from an Element.
       *
       * @param Element
       * @return void
      **/
      _cleanHeaders: function(e) {
        let headingNodes = this._getAllNodesWithTag(e, ["h1", "h2"]);
        this._removeNodes(headingNodes, function(node) {
          let shouldRemove = this._getClassWeight(node) < 0;
          if (shouldRemove) {
            this.log("Removing header with low class weight:", node);
          }
          return shouldRemove;
        });
      },
      /**
       * Check if this node is an H1 or H2 element whose content is mostly
       * the same as the article title.
       *
       * @param Element  the node to check.
       * @return boolean indicating whether this is a title-like header.
       */
      _headerDuplicatesTitle: function(node) {
        if (node.tagName != "H1" && node.tagName != "H2") {
          return false;
        }
        var heading = this._getInnerText(node, false);
        this.log("Evaluating similarity of header:", heading, this._articleTitle);
        return this._textSimilarity(this._articleTitle, heading) > 0.75;
      },
      _flagIsActive: function(flag) {
        return (this._flags & flag) > 0;
      },
      _removeFlag: function(flag) {
        this._flags = this._flags & ~flag;
      },
      _isProbablyVisible: function(node) {
        return (!node.style || node.style.display != "none") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1);
      },
      /**
       * Runs readability.
       *
       * Workflow:
       *  1. Prep the document by removing script tags, css, etc.
       *  2. Build readability's DOM tree.
       *  3. Grab the article content from the current dom tree.
       *  4. Replace the current DOM tree with the new one.
       *  5. Read peacefully.
       *
       * @return void
       **/
      parse: function() {
        if (this._maxElemsToParse > 0) {
          var numTags = this._doc.getElementsByTagName("*").length;
          if (numTags > this._maxElemsToParse) {
            throw new Error("Aborting parsing document; " + numTags + " elements found");
          }
        }
        this._unwrapNoscriptImages(this._doc);
        var jsonLd = this._disableJSONLD ? {} : this._getJSONLD(this._doc);
        this._removeScripts(this._doc);
        this._prepDocument();
        var metadata = this._getArticleMetadata(jsonLd);
        this._articleTitle = metadata.title;
        var articleContent = this._grabArticle();
        if (!articleContent)
          return null;
        this.log("Grabbed: " + articleContent.innerHTML);
        this._postProcessContent(articleContent);
        if (!metadata.excerpt) {
          var paragraphs = articleContent.getElementsByTagName("p");
          if (paragraphs.length > 0) {
            metadata.excerpt = paragraphs[0].textContent.trim();
          }
        }
        var textContent = articleContent.textContent;
        return {
          title: this._articleTitle,
          byline: metadata.byline || this._articleByline,
          dir: this._articleDir,
          lang: this._articleLang,
          content: this._serializer(articleContent),
          textContent,
          length: textContent.length,
          excerpt: metadata.excerpt,
          siteName: metadata.siteName || this._articleSiteName
        };
      }
    };
    if (typeof module === "object") {
      module.exports = Readability2;
    }
  }
});

// node_modules/.pnpm/@mozilla+readability@0.4.2/node_modules/@mozilla/readability/Readability-readerable.js
var require_Readability_readerable = __commonJS({
  "node_modules/.pnpm/@mozilla+readability@0.4.2/node_modules/@mozilla/readability/Readability-readerable.js"(exports, module) {
    var REGEXPS = {
      // NOTE: These two regular expressions are duplicated in
      // Readability.js. Please keep both copies in sync.
      unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
      okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i
    };
    function isNodeVisible(node) {
      return (!node.style || node.style.display != "none") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1);
    }
    function isProbablyReaderable(doc, options = {}) {
      if (typeof options == "function") {
        options = { visibilityChecker: options };
      }
      var defaultOptions = { minScore: 20, minContentLength: 140, visibilityChecker: isNodeVisible };
      options = Object.assign(defaultOptions, options);
      var nodes = doc.querySelectorAll("p, pre, article");
      var brNodes = doc.querySelectorAll("div > br");
      if (brNodes.length) {
        var set = new Set(nodes);
        [].forEach.call(brNodes, function(node) {
          set.add(node.parentNode);
        });
        nodes = Array.from(set);
      }
      var score = 0;
      return [].some.call(nodes, function(node) {
        if (!options.visibilityChecker(node)) {
          return false;
        }
        var matchString = node.className + " " + node.id;
        if (REGEXPS.unlikelyCandidates.test(matchString) && !REGEXPS.okMaybeItsACandidate.test(matchString)) {
          return false;
        }
        if (node.matches("li p")) {
          return false;
        }
        var textContentLength = node.textContent.trim().length;
        if (textContentLength < options.minContentLength) {
          return false;
        }
        score += Math.sqrt(textContentLength - options.minContentLength);
        if (score > options.minScore) {
          return true;
        }
        return false;
      });
    }
    if (typeof module === "object") {
      module.exports = isProbablyReaderable;
    }
  }
});

// node_modules/.pnpm/@mozilla+readability@0.4.2/node_modules/@mozilla/readability/index.js
var require_readability = __commonJS({
  "node_modules/.pnpm/@mozilla+readability@0.4.2/node_modules/@mozilla/readability/index.js"(exports, module) {
    var Readability2 = require_Readability();
    var isProbablyReaderable = require_Readability_readerable();
    module.exports = {
      Readability: Readability2,
      isProbablyReaderable
    };
  }
});

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/commonjs/perf_hooks.cjs
var require_perf_hooks = __commonJS({
  "node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/commonjs/perf_hooks.cjs"(exports) {
    try {
      const { performance: performance2 } = __require("perf_hooks");
      exports.performance = performance2;
    } catch (fallback) {
      exports.performance = { now() {
        return +new Date();
      } };
    }
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/StyleSheet.js
var require_StyleSheet = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/StyleSheet.js"(exports) {
    var CSSOM = {};
    CSSOM.StyleSheet = function StyleSheet() {
      this.parentStyleSheet = null;
    };
    exports.StyleSheet = CSSOM.StyleSheet;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSRule.js
var require_CSSRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSRule.js"(exports) {
    var CSSOM = {};
    CSSOM.CSSRule = function CSSRule() {
      this.parentRule = null;
      this.parentStyleSheet = null;
    };
    CSSOM.CSSRule.UNKNOWN_RULE = 0;
    CSSOM.CSSRule.STYLE_RULE = 1;
    CSSOM.CSSRule.CHARSET_RULE = 2;
    CSSOM.CSSRule.IMPORT_RULE = 3;
    CSSOM.CSSRule.MEDIA_RULE = 4;
    CSSOM.CSSRule.FONT_FACE_RULE = 5;
    CSSOM.CSSRule.PAGE_RULE = 6;
    CSSOM.CSSRule.KEYFRAMES_RULE = 7;
    CSSOM.CSSRule.KEYFRAME_RULE = 8;
    CSSOM.CSSRule.MARGIN_RULE = 9;
    CSSOM.CSSRule.NAMESPACE_RULE = 10;
    CSSOM.CSSRule.COUNTER_STYLE_RULE = 11;
    CSSOM.CSSRule.SUPPORTS_RULE = 12;
    CSSOM.CSSRule.DOCUMENT_RULE = 13;
    CSSOM.CSSRule.FONT_FEATURE_VALUES_RULE = 14;
    CSSOM.CSSRule.VIEWPORT_RULE = 15;
    CSSOM.CSSRule.REGION_STYLE_RULE = 16;
    CSSOM.CSSRule.prototype = {
      constructor: CSSOM.CSSRule
      //FIXME
    };
    exports.CSSRule = CSSOM.CSSRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSStyleRule.js
var require_CSSStyleRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSStyleRule.js"(exports) {
    var CSSOM = {
      CSSStyleDeclaration: require_CSSStyleDeclaration().CSSStyleDeclaration,
      CSSRule: require_CSSRule().CSSRule
    };
    CSSOM.CSSStyleRule = function CSSStyleRule() {
      CSSOM.CSSRule.call(this);
      this.selectorText = "";
      this.style = new CSSOM.CSSStyleDeclaration();
      this.style.parentRule = this;
    };
    CSSOM.CSSStyleRule.prototype = new CSSOM.CSSRule();
    CSSOM.CSSStyleRule.prototype.constructor = CSSOM.CSSStyleRule;
    CSSOM.CSSStyleRule.prototype.type = 1;
    Object.defineProperty(CSSOM.CSSStyleRule.prototype, "cssText", {
      get: function() {
        var text;
        if (this.selectorText) {
          text = this.selectorText + " {" + this.style.cssText + "}";
        } else {
          text = "";
        }
        return text;
      },
      set: function(cssText) {
        var rule = CSSOM.CSSStyleRule.parse(cssText);
        this.style = rule.style;
        this.selectorText = rule.selectorText;
      }
    });
    CSSOM.CSSStyleRule.parse = function(ruleText) {
      var i = 0;
      var state = "selector";
      var index;
      var j = i;
      var buffer = "";
      var SIGNIFICANT_WHITESPACE = {
        "selector": true,
        "value": true
      };
      var styleRule = new CSSOM.CSSStyleRule();
      var name, priority = "";
      for (var character; character = ruleText.charAt(i); i++) {
        switch (character) {
          case " ":
          case "	":
          case "\r":
          case "\n":
          case "\f":
            if (SIGNIFICANT_WHITESPACE[state]) {
              switch (ruleText.charAt(i - 1)) {
                case " ":
                case "	":
                case "\r":
                case "\n":
                case "\f":
                  break;
                default:
                  buffer += " ";
                  break;
              }
            }
            break;
          case '"':
            j = i + 1;
            index = ruleText.indexOf('"', j) + 1;
            if (!index) {
              throw '" is missing';
            }
            buffer += ruleText.slice(i, index);
            i = index - 1;
            break;
          case "'":
            j = i + 1;
            index = ruleText.indexOf("'", j) + 1;
            if (!index) {
              throw "' is missing";
            }
            buffer += ruleText.slice(i, index);
            i = index - 1;
            break;
          case "/":
            if (ruleText.charAt(i + 1) === "*") {
              i += 2;
              index = ruleText.indexOf("*/", i);
              if (index === -1) {
                throw new SyntaxError("Missing */");
              } else {
                i = index + 1;
              }
            } else {
              buffer += character;
            }
            break;
          case "{":
            if (state === "selector") {
              styleRule.selectorText = buffer.trim();
              buffer = "";
              state = "name";
            }
            break;
          case ":":
            if (state === "name") {
              name = buffer.trim();
              buffer = "";
              state = "value";
            } else {
              buffer += character;
            }
            break;
          case "!":
            if (state === "value" && ruleText.indexOf("!important", i) === i) {
              priority = "important";
              i += "important".length;
            } else {
              buffer += character;
            }
            break;
          case ";":
            if (state === "value") {
              styleRule.style.setProperty(name, buffer.trim(), priority);
              priority = "";
              buffer = "";
              state = "name";
            } else {
              buffer += character;
            }
            break;
          case "}":
            if (state === "value") {
              styleRule.style.setProperty(name, buffer.trim(), priority);
              priority = "";
              buffer = "";
            } else if (state === "name") {
              break;
            } else {
              buffer += character;
            }
            state = "selector";
            break;
          default:
            buffer += character;
            break;
        }
      }
      return styleRule;
    };
    exports.CSSStyleRule = CSSOM.CSSStyleRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSStyleSheet.js
var require_CSSStyleSheet = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSStyleSheet.js"(exports) {
    var CSSOM = {
      StyleSheet: require_StyleSheet().StyleSheet,
      CSSStyleRule: require_CSSStyleRule().CSSStyleRule
    };
    CSSOM.CSSStyleSheet = function CSSStyleSheet() {
      CSSOM.StyleSheet.call(this);
      this.cssRules = [];
    };
    CSSOM.CSSStyleSheet.prototype = new CSSOM.StyleSheet();
    CSSOM.CSSStyleSheet.prototype.constructor = CSSOM.CSSStyleSheet;
    CSSOM.CSSStyleSheet.prototype.insertRule = function(rule, index) {
      if (index < 0 || index > this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
      }
      var cssRule = CSSOM.parse(rule).cssRules[0];
      cssRule.parentStyleSheet = this;
      this.cssRules.splice(index, 0, cssRule);
      return index;
    };
    CSSOM.CSSStyleSheet.prototype.deleteRule = function(index) {
      if (index < 0 || index >= this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
      }
      this.cssRules.splice(index, 1);
    };
    CSSOM.CSSStyleSheet.prototype.toString = function() {
      var result = "";
      var rules = this.cssRules;
      for (var i = 0; i < rules.length; i++) {
        result += rules[i].cssText + "\n";
      }
      return result;
    };
    exports.CSSStyleSheet = CSSOM.CSSStyleSheet;
    CSSOM.parse = require_parse().parse;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/MediaList.js
var require_MediaList = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/MediaList.js"(exports) {
    var CSSOM = {};
    CSSOM.MediaList = function MediaList() {
      this.length = 0;
    };
    CSSOM.MediaList.prototype = {
      constructor: CSSOM.MediaList,
      /**
       * @return {string}
       */
      get mediaText() {
        return Array.prototype.join.call(this, ", ");
      },
      /**
       * @param {string} value
       */
      set mediaText(value) {
        var values = value.split(",");
        var length = this.length = values.length;
        for (var i = 0; i < length; i++) {
          this[i] = values[i].trim();
        }
      },
      /**
       * @param {string} medium
       */
      appendMedium: function(medium) {
        if (Array.prototype.indexOf.call(this, medium) === -1) {
          this[this.length] = medium;
          this.length++;
        }
      },
      /**
       * @param {string} medium
       */
      deleteMedium: function(medium) {
        var index = Array.prototype.indexOf.call(this, medium);
        if (index !== -1) {
          Array.prototype.splice.call(this, index, 1);
        }
      }
    };
    exports.MediaList = CSSOM.MediaList;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSImportRule.js
var require_CSSImportRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSImportRule.js"(exports) {
    var CSSOM = {
      CSSRule: require_CSSRule().CSSRule,
      CSSStyleSheet: require_CSSStyleSheet().CSSStyleSheet,
      MediaList: require_MediaList().MediaList
    };
    CSSOM.CSSImportRule = function CSSImportRule() {
      CSSOM.CSSRule.call(this);
      this.href = "";
      this.media = new CSSOM.MediaList();
      this.styleSheet = new CSSOM.CSSStyleSheet();
    };
    CSSOM.CSSImportRule.prototype = new CSSOM.CSSRule();
    CSSOM.CSSImportRule.prototype.constructor = CSSOM.CSSImportRule;
    CSSOM.CSSImportRule.prototype.type = 3;
    Object.defineProperty(CSSOM.CSSImportRule.prototype, "cssText", {
      get: function() {
        var mediaText = this.media.mediaText;
        return "@import url(" + this.href + ")" + (mediaText ? " " + mediaText : "") + ";";
      },
      set: function(cssText) {
        var i = 0;
        var state = "";
        var buffer = "";
        var index;
        for (var character; character = cssText.charAt(i); i++) {
          switch (character) {
            case " ":
            case "	":
            case "\r":
            case "\n":
            case "\f":
              if (state === "after-import") {
                state = "url";
              } else {
                buffer += character;
              }
              break;
            case "@":
              if (!state && cssText.indexOf("@import", i) === i) {
                state = "after-import";
                i += "import".length;
                buffer = "";
              }
              break;
            case "u":
              if (state === "url" && cssText.indexOf("url(", i) === i) {
                index = cssText.indexOf(")", i + 1);
                if (index === -1) {
                  throw i + ': ")" not found';
                }
                i += "url(".length;
                var url = cssText.slice(i, index);
                if (url[0] === url[url.length - 1]) {
                  if (url[0] === '"' || url[0] === "'") {
                    url = url.slice(1, -1);
                  }
                }
                this.href = url;
                i = index;
                state = "media";
              }
              break;
            case '"':
              if (state === "url") {
                index = cssText.indexOf('"', i + 1);
                if (!index) {
                  throw i + `: '"' not found`;
                }
                this.href = cssText.slice(i + 1, index);
                i = index;
                state = "media";
              }
              break;
            case "'":
              if (state === "url") {
                index = cssText.indexOf("'", i + 1);
                if (!index) {
                  throw i + `: "'" not found`;
                }
                this.href = cssText.slice(i + 1, index);
                i = index;
                state = "media";
              }
              break;
            case ";":
              if (state === "media") {
                if (buffer) {
                  this.media.mediaText = buffer.trim();
                }
              }
              break;
            default:
              if (state === "media") {
                buffer += character;
              }
              break;
          }
        }
      }
    });
    exports.CSSImportRule = CSSOM.CSSImportRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSGroupingRule.js
var require_CSSGroupingRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSGroupingRule.js"(exports) {
    var CSSOM = {
      CSSRule: require_CSSRule().CSSRule
    };
    CSSOM.CSSGroupingRule = function CSSGroupingRule() {
      CSSOM.CSSRule.call(this);
      this.cssRules = [];
    };
    CSSOM.CSSGroupingRule.prototype = new CSSOM.CSSRule();
    CSSOM.CSSGroupingRule.prototype.constructor = CSSOM.CSSGroupingRule;
    CSSOM.CSSGroupingRule.prototype.insertRule = function insertRule(rule, index) {
      if (index < 0 || index > this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
      }
      var cssRule = CSSOM.parse(rule).cssRules[0];
      cssRule.parentRule = this;
      this.cssRules.splice(index, 0, cssRule);
      return index;
    };
    CSSOM.CSSGroupingRule.prototype.deleteRule = function deleteRule(index) {
      if (index < 0 || index >= this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
      }
      this.cssRules.splice(index, 1)[0].parentRule = null;
    };
    exports.CSSGroupingRule = CSSOM.CSSGroupingRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSConditionRule.js
var require_CSSConditionRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSConditionRule.js"(exports) {
    var CSSOM = {
      CSSRule: require_CSSRule().CSSRule,
      CSSGroupingRule: require_CSSGroupingRule().CSSGroupingRule
    };
    CSSOM.CSSConditionRule = function CSSConditionRule() {
      CSSOM.CSSGroupingRule.call(this);
      this.cssRules = [];
    };
    CSSOM.CSSConditionRule.prototype = new CSSOM.CSSGroupingRule();
    CSSOM.CSSConditionRule.prototype.constructor = CSSOM.CSSConditionRule;
    CSSOM.CSSConditionRule.prototype.conditionText = "";
    CSSOM.CSSConditionRule.prototype.cssText = "";
    exports.CSSConditionRule = CSSOM.CSSConditionRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSMediaRule.js
var require_CSSMediaRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSMediaRule.js"(exports) {
    var CSSOM = {
      CSSRule: require_CSSRule().CSSRule,
      CSSGroupingRule: require_CSSGroupingRule().CSSGroupingRule,
      CSSConditionRule: require_CSSConditionRule().CSSConditionRule,
      MediaList: require_MediaList().MediaList
    };
    CSSOM.CSSMediaRule = function CSSMediaRule() {
      CSSOM.CSSConditionRule.call(this);
      this.media = new CSSOM.MediaList();
    };
    CSSOM.CSSMediaRule.prototype = new CSSOM.CSSConditionRule();
    CSSOM.CSSMediaRule.prototype.constructor = CSSOM.CSSMediaRule;
    CSSOM.CSSMediaRule.prototype.type = 4;
    Object.defineProperties(CSSOM.CSSMediaRule.prototype, {
      "conditionText": {
        get: function() {
          return this.media.mediaText;
        },
        set: function(value) {
          this.media.mediaText = value;
        },
        configurable: true,
        enumerable: true
      },
      "cssText": {
        get: function() {
          var cssTexts = [];
          for (var i = 0, length = this.cssRules.length; i < length; i++) {
            cssTexts.push(this.cssRules[i].cssText);
          }
          return "@media " + this.media.mediaText + " {" + cssTexts.join("") + "}";
        },
        configurable: true,
        enumerable: true
      }
    });
    exports.CSSMediaRule = CSSOM.CSSMediaRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSSupportsRule.js
var require_CSSSupportsRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSSupportsRule.js"(exports) {
    var CSSOM = {
      CSSRule: require_CSSRule().CSSRule,
      CSSGroupingRule: require_CSSGroupingRule().CSSGroupingRule,
      CSSConditionRule: require_CSSConditionRule().CSSConditionRule
    };
    CSSOM.CSSSupportsRule = function CSSSupportsRule() {
      CSSOM.CSSConditionRule.call(this);
    };
    CSSOM.CSSSupportsRule.prototype = new CSSOM.CSSConditionRule();
    CSSOM.CSSSupportsRule.prototype.constructor = CSSOM.CSSSupportsRule;
    CSSOM.CSSSupportsRule.prototype.type = 12;
    Object.defineProperty(CSSOM.CSSSupportsRule.prototype, "cssText", {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push(this.cssRules[i].cssText);
        }
        return "@supports " + this.conditionText + " {" + cssTexts.join("") + "}";
      }
    });
    exports.CSSSupportsRule = CSSOM.CSSSupportsRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSFontFaceRule.js
var require_CSSFontFaceRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSFontFaceRule.js"(exports) {
    var CSSOM = {
      CSSStyleDeclaration: require_CSSStyleDeclaration().CSSStyleDeclaration,
      CSSRule: require_CSSRule().CSSRule
    };
    CSSOM.CSSFontFaceRule = function CSSFontFaceRule() {
      CSSOM.CSSRule.call(this);
      this.style = new CSSOM.CSSStyleDeclaration();
      this.style.parentRule = this;
    };
    CSSOM.CSSFontFaceRule.prototype = new CSSOM.CSSRule();
    CSSOM.CSSFontFaceRule.prototype.constructor = CSSOM.CSSFontFaceRule;
    CSSOM.CSSFontFaceRule.prototype.type = 5;
    Object.defineProperty(CSSOM.CSSFontFaceRule.prototype, "cssText", {
      get: function() {
        return "@font-face {" + this.style.cssText + "}";
      }
    });
    exports.CSSFontFaceRule = CSSOM.CSSFontFaceRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSHostRule.js
var require_CSSHostRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSHostRule.js"(exports) {
    var CSSOM = {
      CSSRule: require_CSSRule().CSSRule
    };
    CSSOM.CSSHostRule = function CSSHostRule() {
      CSSOM.CSSRule.call(this);
      this.cssRules = [];
    };
    CSSOM.CSSHostRule.prototype = new CSSOM.CSSRule();
    CSSOM.CSSHostRule.prototype.constructor = CSSOM.CSSHostRule;
    CSSOM.CSSHostRule.prototype.type = 1001;
    Object.defineProperty(CSSOM.CSSHostRule.prototype, "cssText", {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push(this.cssRules[i].cssText);
        }
        return "@host {" + cssTexts.join("") + "}";
      }
    });
    exports.CSSHostRule = CSSOM.CSSHostRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSKeyframeRule.js
var require_CSSKeyframeRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSKeyframeRule.js"(exports) {
    var CSSOM = {
      CSSRule: require_CSSRule().CSSRule,
      CSSStyleDeclaration: require_CSSStyleDeclaration().CSSStyleDeclaration
    };
    CSSOM.CSSKeyframeRule = function CSSKeyframeRule() {
      CSSOM.CSSRule.call(this);
      this.keyText = "";
      this.style = new CSSOM.CSSStyleDeclaration();
      this.style.parentRule = this;
    };
    CSSOM.CSSKeyframeRule.prototype = new CSSOM.CSSRule();
    CSSOM.CSSKeyframeRule.prototype.constructor = CSSOM.CSSKeyframeRule;
    CSSOM.CSSKeyframeRule.prototype.type = 8;
    Object.defineProperty(CSSOM.CSSKeyframeRule.prototype, "cssText", {
      get: function() {
        return this.keyText + " {" + this.style.cssText + "} ";
      }
    });
    exports.CSSKeyframeRule = CSSOM.CSSKeyframeRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSKeyframesRule.js
var require_CSSKeyframesRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSKeyframesRule.js"(exports) {
    var CSSOM = {
      CSSRule: require_CSSRule().CSSRule
    };
    CSSOM.CSSKeyframesRule = function CSSKeyframesRule() {
      CSSOM.CSSRule.call(this);
      this.name = "";
      this.cssRules = [];
    };
    CSSOM.CSSKeyframesRule.prototype = new CSSOM.CSSRule();
    CSSOM.CSSKeyframesRule.prototype.constructor = CSSOM.CSSKeyframesRule;
    CSSOM.CSSKeyframesRule.prototype.type = 7;
    Object.defineProperty(CSSOM.CSSKeyframesRule.prototype, "cssText", {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push("  " + this.cssRules[i].cssText);
        }
        return "@" + (this._vendorPrefix || "") + "keyframes " + this.name + " { \n" + cssTexts.join("\n") + "\n}";
      }
    });
    exports.CSSKeyframesRule = CSSOM.CSSKeyframesRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSValue.js
var require_CSSValue = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSValue.js"(exports) {
    var CSSOM = {};
    CSSOM.CSSValue = function CSSValue() {
    };
    CSSOM.CSSValue.prototype = {
      constructor: CSSOM.CSSValue,
      // @see: http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
      set cssText(text) {
        var name = this._getConstructorName();
        throw new Error('DOMException: property "cssText" of "' + name + '" is readonly and can not be replaced with "' + text + '"!');
      },
      get cssText() {
        var name = this._getConstructorName();
        throw new Error('getter "cssText" of "' + name + '" is not implemented!');
      },
      _getConstructorName: function() {
        var s = this.constructor.toString(), c = s.match(/function\s([^\(]+)/), name = c[1];
        return name;
      }
    };
    exports.CSSValue = CSSOM.CSSValue;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSValueExpression.js
var require_CSSValueExpression = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSValueExpression.js"(exports) {
    var CSSOM = {
      CSSValue: require_CSSValue().CSSValue
    };
    CSSOM.CSSValueExpression = function CSSValueExpression(token, idx) {
      this._token = token;
      this._idx = idx;
    };
    CSSOM.CSSValueExpression.prototype = new CSSOM.CSSValue();
    CSSOM.CSSValueExpression.prototype.constructor = CSSOM.CSSValueExpression;
    CSSOM.CSSValueExpression.prototype.parse = function() {
      var token = this._token, idx = this._idx;
      var character = "", expression = "", error = "", info, paren = [];
      for (; ; ++idx) {
        character = token.charAt(idx);
        if (character === "") {
          error = "css expression error: unfinished expression!";
          break;
        }
        switch (character) {
          case "(":
            paren.push(character);
            expression += character;
            break;
          case ")":
            paren.pop(character);
            expression += character;
            break;
          case "/":
            if (info = this._parseJSComment(token, idx)) {
              if (info.error) {
                error = "css expression error: unfinished comment in expression!";
              } else {
                idx = info.idx;
              }
            } else if (info = this._parseJSRexExp(token, idx)) {
              idx = info.idx;
              expression += info.text;
            } else {
              expression += character;
            }
            break;
          case "'":
          case '"':
            info = this._parseJSString(token, idx, character);
            if (info) {
              idx = info.idx;
              expression += info.text;
            } else {
              expression += character;
            }
            break;
          default:
            expression += character;
            break;
        }
        if (error) {
          break;
        }
        if (paren.length === 0) {
          break;
        }
      }
      var ret;
      if (error) {
        ret = {
          error
        };
      } else {
        ret = {
          idx,
          expression
        };
      }
      return ret;
    };
    CSSOM.CSSValueExpression.prototype._parseJSComment = function(token, idx) {
      var nextChar = token.charAt(idx + 1), text;
      if (nextChar === "/" || nextChar === "*") {
        var startIdx = idx, endIdx, commentEndChar;
        if (nextChar === "/") {
          commentEndChar = "\n";
        } else if (nextChar === "*") {
          commentEndChar = "*/";
        }
        endIdx = token.indexOf(commentEndChar, startIdx + 1 + 1);
        if (endIdx !== -1) {
          endIdx = endIdx + commentEndChar.length - 1;
          text = token.substring(idx, endIdx + 1);
          return {
            idx: endIdx,
            text
          };
        } else {
          var error = "css expression error: unfinished comment in expression!";
          return {
            error
          };
        }
      } else {
        return false;
      }
    };
    CSSOM.CSSValueExpression.prototype._parseJSString = function(token, idx, sep) {
      var endIdx = this._findMatchedIdx(token, idx, sep), text;
      if (endIdx === -1) {
        return false;
      } else {
        text = token.substring(idx, endIdx + sep.length);
        return {
          idx: endIdx,
          text
        };
      }
    };
    CSSOM.CSSValueExpression.prototype._parseJSRexExp = function(token, idx) {
      var before2 = token.substring(0, idx).replace(/\s+$/, ""), legalRegx = [
        /^$/,
        /\($/,
        /\[$/,
        /\!$/,
        /\+$/,
        /\-$/,
        /\*$/,
        /\/\s+/,
        /\%$/,
        /\=$/,
        /\>$/,
        /<$/,
        /\&$/,
        /\|$/,
        /\^$/,
        /\~$/,
        /\?$/,
        /\,$/,
        /delete$/,
        /in$/,
        /instanceof$/,
        /new$/,
        /typeof$/,
        /void$/
      ];
      var isLegal = legalRegx.some(function(reg) {
        return reg.test(before2);
      });
      if (!isLegal) {
        return false;
      } else {
        var sep = "/";
        return this._parseJSString(token, idx, sep);
      }
    };
    CSSOM.CSSValueExpression.prototype._findMatchedIdx = function(token, idx, sep) {
      var startIdx = idx, endIdx;
      var NOT_FOUND = -1;
      while (true) {
        endIdx = token.indexOf(sep, startIdx + 1);
        if (endIdx === -1) {
          endIdx = NOT_FOUND;
          break;
        } else {
          var text = token.substring(idx + 1, endIdx), matched = text.match(/\\+$/);
          if (!matched || matched[0] % 2 === 0) {
            break;
          } else {
            startIdx = endIdx;
          }
        }
      }
      var nextNewLineIdx = token.indexOf("\n", idx + 1);
      if (nextNewLineIdx < endIdx) {
        endIdx = NOT_FOUND;
      }
      return endIdx;
    };
    exports.CSSValueExpression = CSSOM.CSSValueExpression;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/MatcherList.js
var require_MatcherList = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/MatcherList.js"(exports) {
    var CSSOM = {};
    CSSOM.MatcherList = function MatcherList() {
      this.length = 0;
    };
    CSSOM.MatcherList.prototype = {
      constructor: CSSOM.MatcherList,
      /**
       * @return {string}
       */
      get matcherText() {
        return Array.prototype.join.call(this, ", ");
      },
      /**
       * @param {string} value
       */
      set matcherText(value) {
        var values = value.split(",");
        var length = this.length = values.length;
        for (var i = 0; i < length; i++) {
          this[i] = values[i].trim();
        }
      },
      /**
       * @param {string} matcher
       */
      appendMatcher: function(matcher) {
        if (Array.prototype.indexOf.call(this, matcher) === -1) {
          this[this.length] = matcher;
          this.length++;
        }
      },
      /**
       * @param {string} matcher
       */
      deleteMatcher: function(matcher) {
        var index = Array.prototype.indexOf.call(this, matcher);
        if (index !== -1) {
          Array.prototype.splice.call(this, index, 1);
        }
      }
    };
    exports.MatcherList = CSSOM.MatcherList;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSDocumentRule.js
var require_CSSDocumentRule = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSDocumentRule.js"(exports) {
    var CSSOM = {
      CSSRule: require_CSSRule().CSSRule,
      MatcherList: require_MatcherList().MatcherList
    };
    CSSOM.CSSDocumentRule = function CSSDocumentRule() {
      CSSOM.CSSRule.call(this);
      this.matcher = new CSSOM.MatcherList();
      this.cssRules = [];
    };
    CSSOM.CSSDocumentRule.prototype = new CSSOM.CSSRule();
    CSSOM.CSSDocumentRule.prototype.constructor = CSSOM.CSSDocumentRule;
    CSSOM.CSSDocumentRule.prototype.type = 10;
    Object.defineProperty(CSSOM.CSSDocumentRule.prototype, "cssText", {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push(this.cssRules[i].cssText);
        }
        return "@-moz-document " + this.matcher.matcherText + " {" + cssTexts.join("") + "}";
      }
    });
    exports.CSSDocumentRule = CSSOM.CSSDocumentRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/parse.js"(exports) {
    var CSSOM = {};
    CSSOM.parse = function parse3(token) {
      var i = 0;
      var state = "before-selector";
      var index;
      var buffer = "";
      var valueParenthesisDepth = 0;
      var SIGNIFICANT_WHITESPACE = {
        "selector": true,
        "value": true,
        "value-parenthesis": true,
        "atRule": true,
        "importRule-begin": true,
        "importRule": true,
        "atBlock": true,
        "conditionBlock": true,
        "documentRule-begin": true
      };
      var styleSheet = new CSSOM.CSSStyleSheet();
      var currentScope = styleSheet;
      var parentRule;
      var ancestorRules = [];
      var hasAncestors = false;
      var prevScope;
      var name, priority = "", styleRule, mediaRule, supportsRule, importRule, fontFaceRule, keyframesRule, documentRule, hostRule;
      var atKeyframesRegExp = /@(-(?:\w+-)+)?keyframes/g;
      var parseError = function(message) {
        var lines = token.substring(0, i).split("\n");
        var lineCount = lines.length;
        var charCount = lines.pop().length + 1;
        var error = new Error(message + " (line " + lineCount + ", char " + charCount + ")");
        error.line = lineCount;
        error["char"] = charCount;
        error.styleSheet = styleSheet;
        throw error;
      };
      for (var character; character = token.charAt(i); i++) {
        switch (character) {
          case " ":
          case "	":
          case "\r":
          case "\n":
          case "\f":
            if (SIGNIFICANT_WHITESPACE[state]) {
              buffer += character;
            }
            break;
          case '"':
            index = i + 1;
            do {
              index = token.indexOf('"', index) + 1;
              if (!index) {
                parseError('Unmatched "');
              }
            } while (token[index - 2] === "\\");
            buffer += token.slice(i, index);
            i = index - 1;
            switch (state) {
              case "before-value":
                state = "value";
                break;
              case "importRule-begin":
                state = "importRule";
                break;
            }
            break;
          case "'":
            index = i + 1;
            do {
              index = token.indexOf("'", index) + 1;
              if (!index) {
                parseError("Unmatched '");
              }
            } while (token[index - 2] === "\\");
            buffer += token.slice(i, index);
            i = index - 1;
            switch (state) {
              case "before-value":
                state = "value";
                break;
              case "importRule-begin":
                state = "importRule";
                break;
            }
            break;
          case "/":
            if (token.charAt(i + 1) === "*") {
              i += 2;
              index = token.indexOf("*/", i);
              if (index === -1) {
                parseError("Missing */");
              } else {
                i = index + 1;
              }
            } else {
              buffer += character;
            }
            if (state === "importRule-begin") {
              buffer += " ";
              state = "importRule";
            }
            break;
          case "@":
            if (token.indexOf("@-moz-document", i) === i) {
              state = "documentRule-begin";
              documentRule = new CSSOM.CSSDocumentRule();
              documentRule.__starts = i;
              i += "-moz-document".length;
              buffer = "";
              break;
            } else if (token.indexOf("@media", i) === i) {
              state = "atBlock";
              mediaRule = new CSSOM.CSSMediaRule();
              mediaRule.__starts = i;
              i += "media".length;
              buffer = "";
              break;
            } else if (token.indexOf("@supports", i) === i) {
              state = "conditionBlock";
              supportsRule = new CSSOM.CSSSupportsRule();
              supportsRule.__starts = i;
              i += "supports".length;
              buffer = "";
              break;
            } else if (token.indexOf("@host", i) === i) {
              state = "hostRule-begin";
              i += "host".length;
              hostRule = new CSSOM.CSSHostRule();
              hostRule.__starts = i;
              buffer = "";
              break;
            } else if (token.indexOf("@import", i) === i) {
              state = "importRule-begin";
              i += "import".length;
              buffer += "@import";
              break;
            } else if (token.indexOf("@font-face", i) === i) {
              state = "fontFaceRule-begin";
              i += "font-face".length;
              fontFaceRule = new CSSOM.CSSFontFaceRule();
              fontFaceRule.__starts = i;
              buffer = "";
              break;
            } else {
              atKeyframesRegExp.lastIndex = i;
              var matchKeyframes = atKeyframesRegExp.exec(token);
              if (matchKeyframes && matchKeyframes.index === i) {
                state = "keyframesRule-begin";
                keyframesRule = new CSSOM.CSSKeyframesRule();
                keyframesRule.__starts = i;
                keyframesRule._vendorPrefix = matchKeyframes[1];
                i += matchKeyframes[0].length - 1;
                buffer = "";
                break;
              } else if (state === "selector") {
                state = "atRule";
              }
            }
            buffer += character;
            break;
          case "{":
            if (state === "selector" || state === "atRule") {
              styleRule.selectorText = buffer.trim();
              styleRule.style.__starts = i;
              buffer = "";
              state = "before-name";
            } else if (state === "atBlock") {
              mediaRule.media.mediaText = buffer.trim();
              if (parentRule) {
                ancestorRules.push(parentRule);
              }
              currentScope = parentRule = mediaRule;
              mediaRule.parentStyleSheet = styleSheet;
              buffer = "";
              state = "before-selector";
            } else if (state === "conditionBlock") {
              supportsRule.conditionText = buffer.trim();
              if (parentRule) {
                ancestorRules.push(parentRule);
              }
              currentScope = parentRule = supportsRule;
              supportsRule.parentStyleSheet = styleSheet;
              buffer = "";
              state = "before-selector";
            } else if (state === "hostRule-begin") {
              if (parentRule) {
                ancestorRules.push(parentRule);
              }
              currentScope = parentRule = hostRule;
              hostRule.parentStyleSheet = styleSheet;
              buffer = "";
              state = "before-selector";
            } else if (state === "fontFaceRule-begin") {
              if (parentRule) {
                fontFaceRule.parentRule = parentRule;
              }
              fontFaceRule.parentStyleSheet = styleSheet;
              styleRule = fontFaceRule;
              buffer = "";
              state = "before-name";
            } else if (state === "keyframesRule-begin") {
              keyframesRule.name = buffer.trim();
              if (parentRule) {
                ancestorRules.push(parentRule);
                keyframesRule.parentRule = parentRule;
              }
              keyframesRule.parentStyleSheet = styleSheet;
              currentScope = parentRule = keyframesRule;
              buffer = "";
              state = "keyframeRule-begin";
            } else if (state === "keyframeRule-begin") {
              styleRule = new CSSOM.CSSKeyframeRule();
              styleRule.keyText = buffer.trim();
              styleRule.__starts = i;
              buffer = "";
              state = "before-name";
            } else if (state === "documentRule-begin") {
              documentRule.matcher.matcherText = buffer.trim();
              if (parentRule) {
                ancestorRules.push(parentRule);
                documentRule.parentRule = parentRule;
              }
              currentScope = parentRule = documentRule;
              documentRule.parentStyleSheet = styleSheet;
              buffer = "";
              state = "before-selector";
            }
            break;
          case ":":
            if (state === "name") {
              name = buffer.trim();
              buffer = "";
              state = "before-value";
            } else {
              buffer += character;
            }
            break;
          case "(":
            if (state === "value") {
              if (buffer.trim() === "expression") {
                var info = new CSSOM.CSSValueExpression(token, i).parse();
                if (info.error) {
                  parseError(info.error);
                } else {
                  buffer += info.expression;
                  i = info.idx;
                }
              } else {
                state = "value-parenthesis";
                valueParenthesisDepth = 1;
                buffer += character;
              }
            } else if (state === "value-parenthesis") {
              valueParenthesisDepth++;
              buffer += character;
            } else {
              buffer += character;
            }
            break;
          case ")":
            if (state === "value-parenthesis") {
              valueParenthesisDepth--;
              if (valueParenthesisDepth === 0)
                state = "value";
            }
            buffer += character;
            break;
          case "!":
            if (state === "value" && token.indexOf("!important", i) === i) {
              priority = "important";
              i += "important".length;
            } else {
              buffer += character;
            }
            break;
          case ";":
            switch (state) {
              case "value":
                styleRule.style.setProperty(name, buffer.trim(), priority);
                priority = "";
                buffer = "";
                state = "before-name";
                break;
              case "atRule":
                buffer = "";
                state = "before-selector";
                break;
              case "importRule":
                importRule = new CSSOM.CSSImportRule();
                importRule.parentStyleSheet = importRule.styleSheet.parentStyleSheet = styleSheet;
                importRule.cssText = buffer + character;
                styleSheet.cssRules.push(importRule);
                buffer = "";
                state = "before-selector";
                break;
              default:
                buffer += character;
                break;
            }
            break;
          case "}":
            switch (state) {
              case "value":
                styleRule.style.setProperty(name, buffer.trim(), priority);
                priority = "";
              case "before-name":
              case "name":
                styleRule.__ends = i + 1;
                if (parentRule) {
                  styleRule.parentRule = parentRule;
                }
                styleRule.parentStyleSheet = styleSheet;
                currentScope.cssRules.push(styleRule);
                buffer = "";
                if (currentScope.constructor === CSSOM.CSSKeyframesRule) {
                  state = "keyframeRule-begin";
                } else {
                  state = "before-selector";
                }
                break;
              case "keyframeRule-begin":
              case "before-selector":
              case "selector":
                if (!parentRule) {
                  parseError("Unexpected }");
                }
                hasAncestors = ancestorRules.length > 0;
                while (ancestorRules.length > 0) {
                  parentRule = ancestorRules.pop();
                  if (parentRule.constructor.name === "CSSMediaRule" || parentRule.constructor.name === "CSSSupportsRule") {
                    prevScope = currentScope;
                    currentScope = parentRule;
                    currentScope.cssRules.push(prevScope);
                    break;
                  }
                  if (ancestorRules.length === 0) {
                    hasAncestors = false;
                  }
                }
                if (!hasAncestors) {
                  currentScope.__ends = i + 1;
                  styleSheet.cssRules.push(currentScope);
                  currentScope = styleSheet;
                  parentRule = null;
                }
                buffer = "";
                state = "before-selector";
                break;
            }
            break;
          default:
            switch (state) {
              case "before-selector":
                state = "selector";
                styleRule = new CSSOM.CSSStyleRule();
                styleRule.__starts = i;
                break;
              case "before-name":
                state = "name";
                break;
              case "before-value":
                state = "value";
                break;
              case "importRule-begin":
                state = "importRule";
                break;
            }
            buffer += character;
            break;
        }
      }
      return styleSheet;
    };
    exports.parse = CSSOM.parse;
    CSSOM.CSSStyleSheet = require_CSSStyleSheet().CSSStyleSheet;
    CSSOM.CSSStyleRule = require_CSSStyleRule().CSSStyleRule;
    CSSOM.CSSImportRule = require_CSSImportRule().CSSImportRule;
    CSSOM.CSSGroupingRule = require_CSSGroupingRule().CSSGroupingRule;
    CSSOM.CSSMediaRule = require_CSSMediaRule().CSSMediaRule;
    CSSOM.CSSConditionRule = require_CSSConditionRule().CSSConditionRule;
    CSSOM.CSSSupportsRule = require_CSSSupportsRule().CSSSupportsRule;
    CSSOM.CSSFontFaceRule = require_CSSFontFaceRule().CSSFontFaceRule;
    CSSOM.CSSHostRule = require_CSSHostRule().CSSHostRule;
    CSSOM.CSSStyleDeclaration = require_CSSStyleDeclaration().CSSStyleDeclaration;
    CSSOM.CSSKeyframeRule = require_CSSKeyframeRule().CSSKeyframeRule;
    CSSOM.CSSKeyframesRule = require_CSSKeyframesRule().CSSKeyframesRule;
    CSSOM.CSSValueExpression = require_CSSValueExpression().CSSValueExpression;
    CSSOM.CSSDocumentRule = require_CSSDocumentRule().CSSDocumentRule;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSStyleDeclaration.js
var require_CSSStyleDeclaration = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/CSSStyleDeclaration.js"(exports) {
    var CSSOM = {};
    CSSOM.CSSStyleDeclaration = function CSSStyleDeclaration2() {
      this.length = 0;
      this.parentRule = null;
      this._importants = {};
    };
    CSSOM.CSSStyleDeclaration.prototype = {
      constructor: CSSOM.CSSStyleDeclaration,
      /**
       *
       * @param {string} name
       * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
       * @return {string} the value of the property if it has been explicitly set for this declaration block.
       * Returns the empty string if the property has not been set.
       */
      getPropertyValue: function(name) {
        return this[name] || "";
      },
      /**
       *
       * @param {string} name
       * @param {string} value
       * @param {string} [priority=null] "important" or null
       * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
       */
      setProperty: function(name, value, priority) {
        if (this[name]) {
          var index = Array.prototype.indexOf.call(this, name);
          if (index < 0) {
            this[this.length] = name;
            this.length++;
          }
        } else {
          this[this.length] = name;
          this.length++;
        }
        this[name] = value + "";
        this._importants[name] = priority;
      },
      /**
       *
       * @param {string} name
       * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
       * @return {string} the value of the property if it has been explicitly set for this declaration block.
       * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
       */
      removeProperty: function(name) {
        if (!(name in this)) {
          return "";
        }
        var index = Array.prototype.indexOf.call(this, name);
        if (index < 0) {
          return "";
        }
        var prevValue = this[name];
        this[name] = "";
        Array.prototype.splice.call(this, index, 1);
        return prevValue;
      },
      getPropertyCSSValue: function() {
      },
      /**
       *
       * @param {String} name
       */
      getPropertyPriority: function(name) {
        return this._importants[name] || "";
      },
      /**
       *   element.style.overflow = "auto"
       *   element.style.getPropertyShorthand("overflow-x")
       *   -> "overflow"
       */
      getPropertyShorthand: function() {
      },
      isPropertyImplicit: function() {
      },
      // Doesn't work in IE < 9
      get cssText() {
        var properties = [];
        for (var i = 0, length = this.length; i < length; ++i) {
          var name = this[i];
          var value = this.getPropertyValue(name);
          var priority = this.getPropertyPriority(name);
          if (priority) {
            priority = " !" + priority;
          }
          properties[i] = name + ": " + value + priority + ";";
        }
        return properties.join(" ");
      },
      set cssText(text) {
        var i, name;
        for (i = this.length; i--; ) {
          name = this[i];
          this[name] = "";
        }
        Array.prototype.splice.call(this, 0, this.length);
        this._importants = {};
        var dummyRule = CSSOM.parse("#bogus{" + text + "}").cssRules[0].style;
        var length = dummyRule.length;
        for (i = 0; i < length; ++i) {
          name = dummyRule[i];
          this.setProperty(dummyRule[i], dummyRule.getPropertyValue(name), dummyRule.getPropertyPriority(name));
        }
      }
    };
    exports.CSSStyleDeclaration = CSSOM.CSSStyleDeclaration;
    CSSOM.parse = require_parse().parse;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/clone.js
var require_clone = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/clone.js"(exports) {
    var CSSOM = {
      CSSStyleSheet: require_CSSStyleSheet().CSSStyleSheet,
      CSSRule: require_CSSRule().CSSRule,
      CSSStyleRule: require_CSSStyleRule().CSSStyleRule,
      CSSGroupingRule: require_CSSGroupingRule().CSSGroupingRule,
      CSSConditionRule: require_CSSConditionRule().CSSConditionRule,
      CSSMediaRule: require_CSSMediaRule().CSSMediaRule,
      CSSSupportsRule: require_CSSSupportsRule().CSSSupportsRule,
      CSSStyleDeclaration: require_CSSStyleDeclaration().CSSStyleDeclaration,
      CSSKeyframeRule: require_CSSKeyframeRule().CSSKeyframeRule,
      CSSKeyframesRule: require_CSSKeyframesRule().CSSKeyframesRule
    };
    CSSOM.clone = function clone(stylesheet) {
      var cloned = new CSSOM.CSSStyleSheet();
      var rules = stylesheet.cssRules;
      if (!rules) {
        return cloned;
      }
      for (var i = 0, rulesLength = rules.length; i < rulesLength; i++) {
        var rule = rules[i];
        var ruleClone = cloned.cssRules[i] = new rule.constructor();
        var style = rule.style;
        if (style) {
          var styleClone = ruleClone.style = new CSSOM.CSSStyleDeclaration();
          for (var j = 0, styleLength = style.length; j < styleLength; j++) {
            var name = styleClone[j] = style[j];
            styleClone[name] = style[name];
            styleClone._importants[name] = style.getPropertyPriority(name);
          }
          styleClone.length = style.length;
        }
        if (rule.hasOwnProperty("keyText")) {
          ruleClone.keyText = rule.keyText;
        }
        if (rule.hasOwnProperty("selectorText")) {
          ruleClone.selectorText = rule.selectorText;
        }
        if (rule.hasOwnProperty("mediaText")) {
          ruleClone.mediaText = rule.mediaText;
        }
        if (rule.hasOwnProperty("conditionText")) {
          ruleClone.conditionText = rule.conditionText;
        }
        if (rule.hasOwnProperty("cssRules")) {
          ruleClone.cssRules = clone(rule).cssRules;
        }
      }
      return cloned;
    };
    exports.clone = CSSOM.clone;
  }
});

// node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/cssom@0.5.0/node_modules/cssom/lib/index.js"(exports) {
    "use strict";
    exports.CSSStyleDeclaration = require_CSSStyleDeclaration().CSSStyleDeclaration;
    exports.CSSRule = require_CSSRule().CSSRule;
    exports.CSSGroupingRule = require_CSSGroupingRule().CSSGroupingRule;
    exports.CSSConditionRule = require_CSSConditionRule().CSSConditionRule;
    exports.CSSStyleRule = require_CSSStyleRule().CSSStyleRule;
    exports.MediaList = require_MediaList().MediaList;
    exports.CSSMediaRule = require_CSSMediaRule().CSSMediaRule;
    exports.CSSSupportsRule = require_CSSSupportsRule().CSSSupportsRule;
    exports.CSSImportRule = require_CSSImportRule().CSSImportRule;
    exports.CSSFontFaceRule = require_CSSFontFaceRule().CSSFontFaceRule;
    exports.CSSHostRule = require_CSSHostRule().CSSHostRule;
    exports.StyleSheet = require_StyleSheet().StyleSheet;
    exports.CSSStyleSheet = require_CSSStyleSheet().CSSStyleSheet;
    exports.CSSKeyframesRule = require_CSSKeyframesRule().CSSKeyframesRule;
    exports.CSSKeyframeRule = require_CSSKeyframeRule().CSSKeyframeRule;
    exports.MatcherList = require_MatcherList().MatcherList;
    exports.CSSDocumentRule = require_CSSDocumentRule().CSSDocumentRule;
    exports.CSSValue = require_CSSValue().CSSValue;
    exports.CSSValueExpression = require_CSSValueExpression().CSSValueExpression;
    exports.parse = require_parse().parse;
    exports.clone = require_clone().clone;
  }
});

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/commonjs/canvas-shim.cjs
var require_canvas_shim = __commonJS({
  "node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/commonjs/canvas-shim.cjs"(exports, module) {
    var Canvas2 = class {
      constructor(width, height) {
        this.width = width;
        this.height = height;
      }
      getContext() {
        return null;
      }
      toDataURL() {
        return "";
      }
    };
    module.exports = {
      createCanvas: (width, height) => new Canvas2(width, height)
    };
  }
});

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/commonjs/canvas.cjs
var require_canvas = __commonJS({
  "node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/commonjs/canvas.cjs"(exports, module) {
    try {
      module.exports = __require("canvas");
    } catch (fallback) {
      module.exports = require_canvas_shim();
    }
  }
});

// src/features/auth/background/index.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());
var AuthStatusMessageInit = () => {
  let lastFocusTabId = void 0;
  let authClientTabsId = void 0;
  createBackgroundMessageListener(async (runtime, event, data, sender) => {
    var _a;
    if (runtime === "client") {
      switch (event) {
        case "Client_authDone": {
          if (authClientTabsId) {
            authClientTabsId = void 0;
          }
          if (lastFocusTabId) {
            if (!APP_IS_PROD) {
              await import_webextension_polyfill.default.tabs.update(lastFocusTabId, {
                active: true
              });
            }
            import_webextension_polyfill.default.tabs.sendMessage(lastFocusTabId, {
              id: CHROME_EXTENSION_POST_MESSAGE_ID,
              event: "Client_authDone",
              data
            });
            lastFocusTabId = void 0;
          }
          return {
            success: true,
            message: "ok",
            data: {}
          };
          break;
        }
        case "Client_openAuthClientTab": {
          if (sender.tab && sender.tab.id) {
            lastFocusTabId = sender.tab.id;
          }
          const authClientTab = await import_webextension_polyfill.default.tabs.create({
            active: true,
            url: APP_IS_PROD ? `${APP_USE_CHAT_GPT_HOST}/login-webchatgpt?ref=${data.ref}` : `${APP_USE_CHAT_GPT_HOST}/login-webchatgpt?ref=${data.ref}`
          });
          if (authClientTab) {
            authClientTabsId = authClientTab.id;
          }
          return {
            success: true,
            message: "ok",
            data: {}
          };
          break;
        }
        case "Client_updateUseChatGPTAuthInfo": {
          const { accessToken, refreshToken, email } = data;
          if (accessToken && refreshToken) {
            await import_webextension_polyfill.default.storage.local.set({
              [USECHATGPT_AUTH_INFO_STORAGE_KEY]: {
                accessToken,
                refreshToken,
                userInfo: null
              }
            });
            const result = await fetchUserSubscriptionInfo();
            const authInfo = {
              accessToken,
              refreshToken,
              userInfo: { ...result, email }
            };
            await import_webextension_polyfill.default.storage.local.set({
              [USECHATGPT_AUTH_INFO_STORAGE_KEY]: authInfo
            });
            return {
              success: true,
              message: "ok",
              data: authInfo
            };
          } else {
            return {
              success: false,
              message: "not find accessToken",
              data: null
            };
          }
          break;
        }
        case "Client_logoutUseChatGPTAuth": {
          await import_webextension_polyfill.default.storage.local.set({
            [USECHATGPT_AUTH_INFO_STORAGE_KEY]: {
              accessToken: null,
              refreshToken: null,
              userInfo: null
            }
          });
          if (sender.tab && ((_a = sender.tab) == null ? void 0 : _a.id)) {
            import_webextension_polyfill.default.tabs.sendMessage(sender.tab.id, {
              id: CHROME_EXTENSION_POST_MESSAGE_ID,
              event: "Client_logoutUseChatGPTAuth"
            });
          }
          return {
            success: true,
            message: "ok",
            data: {}
          };
          break;
        }
        case "Client_emitPricingHooks": {
          const { action, name } = data;
          if (name) {
            await backendApiReportPricingHooks({
              action,
              name
            });
          }
          return {
            success: true,
            data: true,
            message: "ok"
          };
        }
        default:
          break;
      }
    }
    return void 0;
  });
  import_webextension_polyfill.default.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("chatgpt.com")) {
      cacheLimitWebAccessCount();
    }
  });
  cacheLimitWebAccessCount();
};
var LIMIT_WEB_ACCESS_COUNT_STORAGE_KEY = "LIMIT_WEB_ACCESS_COUNT_STORAGE_KEY";
var saveLimitWebAccessCount = async (value) => {
  await import_webextension_polyfill.default.storage.local.set({
    [LIMIT_WEB_ACCESS_COUNT_STORAGE_KEY]: value
  });
};
async function cacheLimitWebAccessCount() {
  try {
    await saveLimitWebAccessCount(-1);
  } catch (e) {
  }
}

// src/background/src/chat/UseChatGPTChat/index.ts
var import_webextension_polyfill2 = __toESM(require_browser_polyfill());

// node_modules/.pnpm/eventsource-parser@1.0.0/node_modules/eventsource-parser/dist/index.js
function createParser(onParse) {
  let isFirstChunk;
  let buffer;
  let startingPosition;
  let startingFieldLength;
  let eventId;
  let eventName;
  let data;
  reset();
  return {
    feed,
    reset
  };
  function reset() {
    isFirstChunk = true;
    buffer = "";
    startingPosition = 0;
    startingFieldLength = -1;
    eventId = void 0;
    eventName = void 0;
    data = "";
  }
  function feed(chunk) {
    buffer = buffer ? buffer + chunk : chunk;
    if (isFirstChunk && hasBom(buffer)) {
      buffer = buffer.slice(BOM.length);
    }
    isFirstChunk = false;
    const length = buffer.length;
    let position = 0;
    let discardTrailingNewline = false;
    while (position < length) {
      if (discardTrailingNewline) {
        if (buffer[position] === "\n") {
          ++position;
        }
        discardTrailingNewline = false;
      }
      let lineLength = -1;
      let fieldLength = startingFieldLength;
      let character;
      for (let index = startingPosition; lineLength < 0 && index < length; ++index) {
        character = buffer[index];
        if (character === ":" && fieldLength < 0) {
          fieldLength = index - position;
        } else if (character === "\r") {
          discardTrailingNewline = true;
          lineLength = index - position;
        } else if (character === "\n") {
          lineLength = index - position;
        }
      }
      if (lineLength < 0) {
        startingPosition = length - position;
        startingFieldLength = fieldLength;
        break;
      } else {
        startingPosition = 0;
        startingFieldLength = -1;
      }
      parseEventStreamLine(buffer, position, fieldLength, lineLength);
      position += lineLength + 1;
    }
    if (position === length) {
      buffer = "";
    } else if (position > 0) {
      buffer = buffer.slice(position);
    }
  }
  function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
    if (lineLength === 0) {
      if (data.length > 0) {
        onParse({
          type: "event",
          id: eventId,
          event: eventName || void 0,
          data: data.slice(0, -1)
          // remove trailing newline
        });
        data = "";
        eventId = void 0;
      }
      eventName = void 0;
      return;
    }
    const noValue = fieldLength < 0;
    const field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
    let step = 0;
    if (noValue) {
      step = lineLength;
    } else if (lineBuffer[index + fieldLength + 1] === " ") {
      step = fieldLength + 2;
    } else {
      step = fieldLength + 1;
    }
    const position = index + step;
    const valueLength = lineLength - step;
    const value = lineBuffer.slice(position, position + valueLength).toString();
    if (field === "data") {
      data += value ? "".concat(value, "\n") : "\n";
    } else if (field === "event") {
      eventName = value;
    } else if (field === "id" && !value.includes("\0")) {
      eventId = value;
    } else if (field === "retry") {
      const retry = parseInt(value, 10);
      if (!Number.isNaN(retry)) {
        onParse({
          type: "reconnect-interval",
          value: retry
        });
      }
    }
  }
}
var BOM = [239, 187, 191];
function hasBom(buffer) {
  return BOM.every((charCode, index) => buffer.charCodeAt(index) === charCode);
}

// src/features/chatgpt/core/stream-async-inerable.ts
async function* streamAsyncIterable(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

// src/features/chatgpt/core/fetch-sse.ts
var fetchSSE = async (resource, options) => {
  const { onMessage, ...fetchOptions } = options;
  const resp = await fetch(resource, fetchOptions);
  if (!resp.ok) {
    const error = await resp.json().catch(() => ({}));
    throw new Error(
      JSON.stringify(
        !isEmpty_default(error) ? error : { message: `${resp.status} ${resp.statusText}`, detail: "" }
      )
    );
  }
  if (fetchOptions.body) {
    const body = JSON.parse(fetchOptions.body);
    if (body.streaming === false) {
      const response = await resp.json();
      return response;
    }
  }
  const parser = createParser((event) => {
    if (event.type === "event") {
      onMessage(event.data);
    }
  });
  for await (const chunk of streamAsyncIterable(resp.body)) {
    const str = new TextDecoder().decode(chunk);
    parser.feed(str);
  }
};

// src/background/src/chat/BaseChat.ts
var BaseChat = class {
  constructor(name) {
    __publicField(this, "log");
    __publicField(this, "status", "needAuth");
    __publicField(this, "active", false);
    __publicField(this, "taskList", {});
    this.log = new Log_default("Background/Chat/" + name);
  }
  async auth(tabId) {
    this.active = true;
    await this.updateClientStatus("success");
  }
  async destroy() {
    await this.updateClientStatus("needAuth");
    this.active = false;
  }
  async updateClientStatus(status) {
    if (this.active) {
      this.status = status;
      this.log.info("updateStatus", this.status);
    }
  }
  async abortTask(taskId) {
    if (this.taskList[taskId]) {
      this.taskList[taskId]();
      delete this.taskList[taskId];
      return true;
    }
    return true;
  }
};
var BaseChat_default = BaseChat;

// src/background/src/chat/UseChatGPTChat/types.ts
var USE_CHAT_GPT_PLUS_MODELS = [
  {
    title: "gpt-3.5-turbo",
    titleTag: "",
    value: "gpt-3.5-turbo",
    maxTokens: 4096,
    tags: [],
    descriptions: [
      {
        label: "client:provider__model__tooltip_card__label__max_token",
        value: "client:provider__model__tooltip_card__label__max_token__suffix"
      },
      {
        label: "client:provider__model__tooltip_card__label__description",
        value: "client:provider__chatgpt__model__gpt_3_5__description"
      }
      // {
      //   label: (t) => t('client:provider__model__tooltip_card__label__training_date'),
      //   value: `Up to ${dayjs('2021-09-01').format('MMM YYYY')}`,
      // },
    ]
  },
  {
    title: "gpt-4",
    titleTag: "",
    value: "gpt-4",
    maxTokens: 8192,
    tags: [],
    descriptions: [
      {
        label: "client:provider__model__tooltip_card__label__max_token",
        value: "client:provider__model__tooltip_card__label__max_token__suffix"
      },
      {
        label: "client:provider__model__tooltip_card__label__description",
        value: "client:provider__chatgpt__model__gpt_4__description"
      }
    ]
  },
  {
    title: "gpt-3.5-turbo-16k",
    titleTag: "",
    value: "gpt-3.5-turbo-16k",
    maxTokens: 16384,
    tags: [],
    descriptions: [
      {
        label: "client:provider__model__tooltip_card__label__max_token",
        value: "client:provider__model__tooltip_card__label__max_token__suffix"
      },
      {
        label: "client:provider__model__tooltip_card__label__description",
        value: `client:provider__chatgpt__model__gpt_3_5_16k__description`
      }
    ]
  }
];

// src/background/src/chat/UseChatGPTChat/index.ts
var log = new Log_default("Background/Chat/UseChatGPTPlusChat");
var UseChatGPTPlusChat = class extends BaseChat_default {
  constructor() {
    super("UseChatGPTPlusChat");
    __publicField(this, "status", "needAuth");
    __publicField(this, "lastActiveTabId");
    __publicField(this, "token");
    __publicField(this, "conversationId");
    this.init();
  }
  init() {
    log.info("init");
  }
  async preAuth() {
    this.active = true;
    await this.checkTokenAndUpdateStatus();
  }
  async auth(authTabId) {
    this.active = true;
    this.lastActiveTabId = authTabId;
    await this.checkTokenAndUpdateStatus();
    if (this.status === "needAuth") {
      await import_webextension_polyfill2.default.tabs.create({
        active: true,
        url: APP_USE_CHAT_GPT_HOST
      });
    }
    await this.updateClientStatus();
  }
  async checkTokenAndUpdateStatus() {
    const prevStatus = this.status;
    this.token = await this.getToken();
    this.status = this.token ? "success" : "needAuth";
    if (prevStatus !== this.status) {
      log.info("checkTokenAndUpdateStatus", this.status, this.lastActiveTabId);
      this.lastActiveTabId = void 0;
    }
    await this.updateClientStatus();
  }
  createConversation() {
    this.conversationId = v4_default();
    return this.conversationId;
  }
  removeConversation() {
    this.conversationId = void 0;
  }
  /**
   * 获取回答
   * @param question 问题
   * @param options
   * @param onMessage 回调
   * @param options.doc_id 大文件聊天之前上传的上下文的documentId
   * @param options.chat_history 聊天历史
   * @param options.backendAPI 后端api
   * @param options.streaming 是否流式
   * @param options.taskId 任务id
   */
  async askChatGPT(question, options, onMessage) {
    await this.checkTokenAndUpdateStatus();
    if (this.status !== "success") {
      onMessage && onMessage({
        type: "error",
        done: true,
        error: "Your session has expired. Please log in.",
        data: {
          text: "",
          conversationId: ""
        }
      });
      return;
    }
    const {
      taskId,
      doc_id,
      backendAPI = "webchatgpt_gpt_response",
      streaming = true,
      chat_history = [],
      model
    } = options || {};
    const postBody = Object.assign(
      {
        chat_history,
        streaming,
        message_content: question,
        chrome_extension_version: APP_VERSION,
        model_name: model || USE_CHAT_GPT_PLUS_MODELS[0].value,
        temperature: 0
      },
      doc_id ? { doc_id } : {}
    );
    if (backendAPI === "chat_with_document") {
      postBody.model_name = "gpt-3.5-turbo-16k";
    }
    if (backendAPI === "webchatgpt_gpt_response") {
      postBody.model_name = "claude-3-haiku";
    }
    const controller = new AbortController();
    const signal = controller.signal;
    if (taskId) {
      this.taskList[taskId] = () => controller.abort();
    }
    log.info("streaming start", postBody);
    let messageResult = "";
    let isEnd = false;
    let hasError = false;
    let sentTextLength = 0;
    let conversationId = this.conversationId || "";
    const sendTextSettings = await import_webextension_polyfill2.default.storage.local.get(
      BACKGROUND_SEND_TEXT_SPEED_SETTINGS
    );
    const settings = sendTextSettings[BACKGROUND_SEND_TEXT_SPEED_SETTINGS] || {};
    const interval = settings.interval || 50;
    const echoTextRate = settings.rate || 0.5;
    const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
    const throttleEchoText = async () => {
      if (hasError) {
        return;
      }
      if (isEnd && sentTextLength === messageResult.length) {
        log.info("streaming end success");
        onMessage && onMessage({
          done: true,
          type: "message",
          error: "",
          data: { text: "", conversationId }
        });
        return;
      }
      let currentSendTextTextLength = 0;
      const waitSendTextLength = Math.floor(
        messageResult.length - sentTextLength
      );
      if (!isEnd) {
        const needSendTextLength = Math.floor(waitSendTextLength * echoTextRate);
        currentSendTextTextLength = messageResult.slice(
          sentTextLength,
          needSendTextLength + sentTextLength
        ).length;
      } else {
        const needSendTextLength = Math.max(
          Math.floor(messageResult.length * 0.1),
          10
        );
        currentSendTextTextLength = messageResult.slice(
          sentTextLength,
          needSendTextLength + sentTextLength
        ).length;
      }
      if (currentSendTextTextLength > 0) {
        log.debug(
          "streaming echo message",
          isEnd ? "\u4E00\u79D2\u53D1\u9001\u5B8C\u5269\u4E0B\u7684\u6587\u672C" : `\u6BCF${interval}\u6BEB\u79D2\u53D1\u9001\u5269\u4F59\u6587\u672C\u7684${(echoTextRate * 100).toFixed(
            0
          )}%`,
          sentTextLength,
          currentSendTextTextLength,
          messageResult.length
        );
        sentTextLength += currentSendTextTextLength;
        onMessage && onMessage({
          type: "message",
          done: false,
          error: "",
          data: {
            text: messageResult.slice(0, sentTextLength),
            conversationId
          }
        });
      }
      await delay(isEnd ? 100 : interval);
      await throttleEchoText();
    };
    throttleEchoText();
    let isTokenExpired = false;
    await fetchSSE(`${APP_USE_CHAT_GPT_API_HOST}/gpt/${backendAPI}`, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        "x-version": `webchatgpt_${import_webextension_polyfill2.default.runtime.getManifest().version}`
      },
      body: JSON.stringify(postBody),
      onMessage: (message) => {
        try {
          const messageData = JSON.parse(message);
          if (messageData == null ? void 0 : messageData.conversation_id) {
            conversationId = messageData.conversation_id;
          }
          if (messageData == null ? void 0 : messageData.text) {
            messageResult += messageData.text;
          }
          log.debug("streaming on message", messageResult);
        } catch (e) {
          log.error("parse message.data error: 	", e);
        }
      }
    }).then((res) => {
      if (res.status === "OK" && res.text) {
        onMessage && onMessage({
          done: true,
          type: "error",
          error: "",
          data: { text: res.text, conversationId }
        });
      } else {
        onMessage && onMessage({
          done: true,
          type: "error",
          error: res.msg || "Network error.",
          data: { text: "", conversationId }
        });
      }
    }).catch((err) => {
      log.info("streaming end error", err);
      isEnd = true;
      hasError = true;
      if ((err == null ? void 0 : err.message) === "BodyStreamBuffer was aborted" || (err == null ? void 0 : err.message) === "The user aborted a request.") {
        onMessage && onMessage({
          type: "error",
          error: "manual aborted request.",
          done: true,
          data: { text: "", conversationId }
        });
        return;
      }
      try {
        const error = JSON.parse(err.message || err);
        if (error.msg && isPermissionCardSceneType(error.msg)) {
          onMessage && onMessage({
            type: "error",
            error: error.msg,
            done: true,
            data: { text: "", conversationId }
          });
          return;
        }
        if ((error == null ? void 0 : error.code) === 401) {
          isTokenExpired = true;
        }
        log.error("sse error", err);
        onMessage && onMessage({
          done: true,
          type: "error",
          error: error.message || error.detail || "Network error.",
          data: { text: "", conversationId }
        });
      } catch (e) {
        onMessage && onMessage({
          done: true,
          type: "error",
          error: "Network error.",
          data: { text: "", conversationId }
        });
      }
    });
    if (!isEnd && streaming) {
      log.info("streaming end success");
      if (messageResult === "") {
        sendLarkBotMessageInBgScript(
          "[API] response empty string.",
          JSON.stringify(
            {
              model: postBody.model_name,
              promptTextLength: postBody.message_content.length
            },
            null,
            2
          ),
          {
            uuid: "6f02f533-def6-4696-b14e-1b00c2d9a4df"
          }
        );
        onMessage && onMessage({
          done: true,
          type: "error",
          error: "Something went wrong, please try again. If this issue persists, contact us via email.",
          data: { text: "", conversationId }
        });
      } else {
        isEnd = true;
      }
    }
    if (isTokenExpired) {
      log.info("user token expired");
      this.status = "needAuth";
      await logoutUseChatGPTAuth();
      await this.updateClientStatus();
    }
  }
  async abortTask(taskId) {
    if (this.taskList[taskId]) {
      this.taskList[taskId]();
      delete this.taskList[taskId];
      return true;
    }
    return true;
  }
  async destroy() {
    log.info("destroy");
    this.status = "needAuth";
    this.active = false;
  }
  async getToken() {
    return await getUseChatGPTAccessToken();
  }
  async updateClientStatus() {
    if (this.active) {
    }
  }
};

// node_modules/.pnpm/destr@1.2.2/node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function jsonParseTransform(key2, value) {
  if (key2 === "__proto__") {
    return;
  }
  if (key2 === "constructor" && value && typeof value === "object" && "prototype" in value) {
    return;
  }
  return value;
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _lval = value.toLowerCase().trim();
  if (_lval === "true") {
    return true;
  }
  if (_lval === "false") {
    return false;
  }
  if (_lval === "null") {
    return null;
  }
  if (_lval === "nan") {
    return Number.NaN;
  }
  if (_lval === "infinity") {
    return Number.POSITIVE_INFINITY;
  }
  if (_lval === "undefined") {
    return void 0;
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

// node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs
var r = String.fromCharCode;
var HASH_RE = /#/g;
var AMPERSAND_RE = /&/g;
var SLASH_RE = /\//g;
var EQUAL_RE = /=/g;
var PLUS_RE = /\+/g;
var ENC_CARET_RE = /%5e/gi;
var ENC_BACKTICK_RE = /%60/gi;
var ENC_PIPE_RE = /%7c/gi;
var ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch (e) {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key2 = decodeQueryKey(s[1]);
    if (key2 === "__proto__" || key2 === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key2] === void 0) {
      object[key2] = value;
    } else if (Array.isArray(object[key2])) {
      object[key2].push(value);
    } else {
      object[key2] = [object[key2], value];
    }
  }
  return object;
}
function encodeQueryItem(key2, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key2);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key2)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key2)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query2) {
  return Object.keys(query2).filter((k) => query2[k] !== void 0).map((k) => encodeQueryItem(k, query2[k])).filter(Boolean).join("&");
}
var PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
var PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
var PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
var TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
var JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withQuery(input, query2) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query2 };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
var protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

// node_modules/.pnpm/ofetch@1.0.1/node_modules/ofetch/dist/shared/ofetch.502a4799.mjs
var FetchError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "FetchError";
  }
};
function createFetchError(request, error, response) {
  let message = "";
  if (error) {
    message = error.message;
  }
  if (request && response) {
    message = `${message} (${response.status} ${response.statusText} (${request.toString()}))`;
  } else if (request) {
    message = `${message} (${request.toString()})`;
  }
  const fetchError = new FetchError(message);
  Object.defineProperty(fetchError, "request", {
    get() {
      return request;
    }
  });
  Object.defineProperty(fetchError, "response", {
    get() {
      return response;
    }
  });
  Object.defineProperty(fetchError, "data", {
    get() {
      return response && response._data;
    }
  });
  Object.defineProperty(fetchError, "status", {
    get() {
      return response && response.status;
    }
  });
  Object.defineProperty(fetchError, "statusText", {
    get() {
      return response && response.statusText;
    }
  });
  Object.defineProperty(fetchError, "statusCode", {
    get() {
      return response && response.status;
    }
  });
  Object.defineProperty(fetchError, "statusMessage", {
    get() {
      return response && response.statusText;
    }
  });
  return fetchError;
}
var payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
var textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
var retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
function createFetch(globalOptions) {
  const { fetch: fetch3, Headers: Headers2 } = globalOptions;
  function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && retryStatusCodes.has(responseCode)) {
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(
      context.request,
      context.error,
      context.response
    );
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: { ...globalOptions.defaults, ..._options },
      response: void 0,
      error: void 0
    };
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
      if (context.options.body && isPayloadMethod(context.options.method) && isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers2(context.options.headers);
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      }
    }
    context.response = await fetch3(
      context.request,
      context.options
    ).catch(async (error) => {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return onError(context);
    });
    const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
    if (responseType === "json") {
      const data = await context.response.text();
      const parseFunction = context.options.parseResponse || destr;
      context.response._data = parseFunction(data);
    } else if (responseType === "stream") {
      context.response._data = context.response.body;
    } else {
      context.response._data = await context.response[responseType]();
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return onError(context);
    }
    return context.response;
  };
  const $fetch = function $fetch2(request, options) {
    return $fetchRaw(request, options).then((r2) => r2._data);
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = fetch3;
  $fetch.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

// node_modules/.pnpm/ofetch@1.0.1/node_modules/ofetch/dist/index.mjs
var _globalThis = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
var fetch2 = _globalThis.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!")));
var Headers = _globalThis.Headers;
var ofetch = createFetch({ fetch: fetch2, Headers });

// src/background/src/chat/BardChat/utils.ts
function extractFromHTML(variableName, html) {
  const regex = new RegExp(`"${variableName}":"([^"]+)"`);
  const match = regex.exec(html);
  return match == null ? void 0 : match[1];
}
var fetchBardRequestParams = async () => {
  try {
    const html = await ofetch("https://bard.google.com/faq", {
      cache: "reload"
    });
    const atValue = extractFromHTML("SNlM0e", html);
    const blValue = extractFromHTML("cfb2h", html);
    return { atValue, blValue };
  } catch (error) {
    return { atValue: null, blValue: null };
  }
};
var parseBardResponse = (resp) => {
  const data = JSON.parse(resp.split("\n")[3]);
  const payload = JSON.parse(data[0][2]);
  if (!payload) {
    return {
      text: "",
      error: "Failed to access Bard\nTry again, or visit [bard.google.com](https://bard.google.com) for more information.",
      ids: ["", "", ""]
    };
  }
  const text = payload[4][0][1][0];
  return {
    text,
    error: "",
    ids: [...payload[1], payload[4][0][0]]
  };
};

// src/background/src/chat/BardChat/index.ts
function generateReqId() {
  return Math.floor(Math.random() * 9e5) + 1e5;
}
var BardChat = class extends BaseChat_default {
  constructor() {
    super("BardChat");
    __publicField(this, "token");
    __publicField(this, "contextIds", ["", "", ""]);
    __publicField(this, "conversationId");
    this.token = void 0;
  }
  async checkAuth() {
    this.active = true;
  }
  async auth() {
    this.active = true;
  }
  async askChatGPT(question, options, onMessage) {
    if (!this.conversationId) {
      this.conversationId = v4_default();
    }
    const {
      taskId
      // include_history = false,
      // streaming = true,
      // regenerate = false,
      // max_history_message_cnt = 0,
    } = options || {};
    const controller = new AbortController();
    const signal = controller.signal;
    let isAbort = false;
    if (taskId) {
      this.taskList[taskId] = () => controller.abort();
    }
    if (!await this.syncBardToken() || !this.token) {
      onMessage && onMessage({
        type: "error",
        error: "UNAUTHORIZED",
        done: true,
        data: { text: "", conversationId: "" }
      });
      return;
    }
    try {
      if (!this.active) {
        return;
      }
      const result = await ofetch(
        "https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate",
        {
          method: "POST",
          signal,
          query: {
            bl: this.token.blValue,
            _reqid: generateReqId(),
            rt: "c"
          },
          body: new URLSearchParams({
            at: this.token.atValue,
            "f.req": JSON.stringify([
              null,
              `[[${JSON.stringify(question)}],null,${JSON.stringify(
                this.contextIds
              )}]`
            ])
          }),
          parseResponse: (txt) => txt
        }
      ).catch((err) => {
        if (err == null ? void 0 : err.message.includes("The user aborted a request.")) {
          isAbort = true;
          onMessage && onMessage({
            type: "error",
            error: "manual aborted request.",
            done: true,
            data: { text: "", conversationId: "" }
          });
          return;
        }
      });
      const { text, ids, error } = parseBardResponse(result);
      this.log.debug("result", result, text, ids);
      if (ids) {
        if (isAbort) {
          return;
        }
        if (error) {
          onMessage && onMessage({
            type: "message",
            done: true,
            error,
            data: {
              text: "",
              conversationId: this.conversationId || ""
            }
          });
        } else if (text) {
          onMessage && onMessage({
            type: "message",
            done: false,
            error: "",
            data: {
              text,
              conversationId: this.conversationId || ""
            }
          });
          onMessage && onMessage({
            type: "message",
            done: true,
            error: "",
            data: {
              text,
              conversationId: this.conversationId || ""
            }
          });
          this.contextIds = ids;
        }
      } else {
        onMessage && onMessage({
          type: "error",
          done: true,
          error: "BardChat: Unknown Error",
          data: {
            text: "",
            conversationId: this.conversationId
          }
        });
      }
    } catch (e) {
      this.log.error(e);
    }
  }
  async syncBardToken() {
    try {
      const { atValue, blValue } = await fetchBardRequestParams();
      if (!atValue || !blValue) {
        this.token = void 0;
        return false;
      }
      this.token = { atValue, blValue };
      return true;
    } catch (error) {
      return false;
    }
  }
  reset() {
    this.conversationId = "";
    this.contextIds = ["", "", ""];
  }
  // removeConversation(conversationId: string) {
  //   if(conversationId) {
  //   }
  // }
};

// src/background/src/chat/BingChat/bing/api.ts
function randomIP() {
  return `13.${random_default(104, 107)}.${random_default(0, 255)}.${random_default(0, 255)}`;
}
var API_ENDPOINT = "https://www.bing.com/turing/conversation/create";
async function createConversation() {
  var _a;
  const headers = {
    "x-ms-client-request-id": v4_default(),
    "x-ms-useragent": "azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.3 OS/macOS"
  };
  let rawResponse;
  try {
    rawResponse = await ofetch.raw(API_ENDPOINT, {
      headers,
      redirect: "error"
    });
    if (!((_a = rawResponse._data) == null ? void 0 : _a.result)) {
      throw new Error(
        `Please sign in to [bing.com](https://bing.com/), complete any required verifications, then try again.`
      );
    }
  } catch (err) {
    rawResponse = await ofetch.raw(API_ENDPOINT, {
      headers: { ...headers, "x-forwarded-for": randomIP() },
      redirect: "error"
    });
    if (!rawResponse._data) {
      throw new Error(
        `Please sign in to [bing.com](https://bing.com/), complete any required verifications, then try again.`
      );
    }
  }
  const data = rawResponse._data;
  if (data.result.value !== "Success") {
    let message = `${data.result.value}: ${data.result.message}

Please sign in to [bing.com](http://bing.com/), complete any required verifications, then try again.`;
    if (data.result.value === "UnauthorizedRequest") {
      message += "\n[Log into bing.com to continue.](https://www.bing.com/)";
    }
    if (data.result.value === "Forbidden") {
      message += "\n[Log into bing.com to continue.](https://www.bing.com/)";
    }
    throw new Error(message);
  }
  const conversationSignature = rawResponse.headers.get(
    "x-sydney-conversationsignature"
  );
  const encryptedConversationSignature = rawResponse.headers.get("x-sydney-encryptedconversationsignature") || void 0;
  data.conversationSignature = data.conversationSignature || conversationSignature;
  data.encryptedConversationSignature = encryptedConversationSignature;
  return data;
}

// src/background/src/chat/util.ts
var getThirdProviderSettings = async (thirdProviderKey) => {
  try {
    const settings = await getCacheUserConfig();
    const thirdProviderSetting = settings.thirdProviderSettings;
    if (thirdProviderSetting && thirdProviderSetting[thirdProviderKey]) {
      return thirdProviderSetting[thirdProviderKey];
    }
    return void 0;
  } catch (e) {
    return void 0;
  }
};
var askChatGPTQuestionWithProvider = async (provider, question, options, {
  onMessage,
  onError
}) => {
  const port = new ContentScriptConnectionV2({
    runtime: "client"
  });
  return new Promise((resolve) => {
    const taskId = question.messageId;
    const destroyListener = createClientMessageListener(async (event, data) => {
      var _a;
      if (event === "Client_askChatGPTQuestionResponse" && data.taskId === taskId) {
        if (data.error) {
          onError == null ? void 0 : onError(data.error);
        } else if ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.text) {
          onMessage == null ? void 0 : onMessage(data.data);
        }
        if (data.done) {
          resolve(true);
          port.postMessage({
            event: "Client_askChatGPTQuestionWithProviderDone",
            data: {}
          });
          destroyListener();
          return {
            success: true,
            message: "ok",
            data: {}
          };
        }
        return {
          success: true,
          message: "ok",
          data: {}
        };
      }
      return void 0;
    });
    port.postMessage({
      event: "Client_askChatGPTQuestionWithProvider",
      data: {
        provider,
        taskId,
        question,
        options
      }
    });
  });
};
var askChatGPTQuestionWithFreeAI = async (provider, question, options, {
  onMessage,
  onError
}) => {
  const port = new ContentScriptConnectionV2({
    runtime: "client"
  });
  return new Promise((resolve) => {
    const taskId = question.messageId;
    const destroyListener = createClientMessageListener(async (event, data) => {
      var _a;
      if (event === "Client_askChatGPTQuestionResponse" && data.taskId === taskId) {
        if (data.error) {
          onError == null ? void 0 : onError(data.error);
        } else if ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.text) {
          onMessage == null ? void 0 : onMessage(data.data);
        }
        if (data.done) {
          resolve(true);
          port.postMessage({
            event: "Client_askChatGPTQuestionWithProviderDone",
            data: {}
          });
          destroyListener();
          return {
            success: true,
            message: "ok",
            data: {}
          };
        }
        return {
          success: true,
          message: "ok",
          data: {}
        };
      }
      return void 0;
    });
    port.postMessage({
      event: "Client_askChatGPTQuestionWithProvider",
      data: {
        provider,
        taskId,
        question,
        options
      }
    });
  });
};

// src/background/utils/clientProxyWebsocket/background.ts
var import_webextension_polyfill3 = __toESM(require_browser_polyfill());
var ClientProxyWebSocket = class {
  constructor(url, options) {
    __publicField(this, "id");
    __publicField(this, "clientTabId");
    __publicField(this, "options");
    __publicField(this, "url");
    __publicField(this, "unpackListeners", []);
    __publicField(this, "closeListeners", []);
    __publicField(this, "messageListeners", []);
    __publicField(this, "clearListener");
    this.id = v4_default();
    this.url = url;
    this.options = options || {};
  }
  async init(clientTabId) {
    var _a;
    const propTab = await safeGetBrowserTab(clientTabId);
    const currentTab = (_a = await import_webextension_polyfill3.default.tabs.query({
      active: true
    })) == null ? void 0 : _a[0];
    this.clientTabId = (propTab == null ? void 0 : propTab.id) || (currentTab == null ? void 0 : currentTab.id);
    this.clearListener = createBackgroundMessageListener(
      async (runtime, event, data) => {
        if (runtime === "client") {
          if (event === "Client_ListenProxyWebsocketResponse") {
            const { taskId, listenerType, data: responseData } = data;
            if (taskId === this.id) {
              switch (listenerType) {
                case "onUnpackedMessage":
                  {
                    for (const listener of this.unpackListeners) {
                      listener(responseData);
                    }
                  }
                  break;
                case "onClose":
                  {
                    for (const listener of this.closeListeners) {
                      listener(responseData);
                    }
                  }
                  break;
                case "onMessage": {
                  for (const listener of this.messageListeners) {
                    listener(responseData);
                  }
                }
              }
              return {
                success: true,
                message: "ok",
                data: true
              };
            }
          }
        }
        return void 0;
      }
    );
  }
  async open(mode) {
    await this.sendMessageToClient("Open", {
      url: this.url,
      mode
    });
  }
  async close() {
    var _a;
    this.removeAllListeners();
    await this.sendMessageToClient("Close", {
      url: this.url
    });
    (_a = this.clearListener) == null ? void 0 : _a.call(this);
  }
  async sendPacked(data) {
    await this.sendMessageToClient("SendPacked", data);
  }
  removeAllListeners() {
    this.onMessage.removeAllListeners();
    this.onUnpackedMessage.removeAllListeners();
    this.onClose.removeAllListeners();
  }
  get onUnpackedMessage() {
    return {
      addListener: (fn) => {
        this.unpackListeners.push(fn);
      },
      removeListener: (fn) => {
        this.unpackListeners = this.unpackListeners.filter((f) => f !== fn);
      },
      removeAllListeners: () => {
        this.unpackListeners = [];
      }
    };
  }
  get onMessage() {
    return {
      addListener: (fn) => {
        this.messageListeners.push(fn);
      },
      removeListener: (fn) => {
        this.messageListeners = this.messageListeners.filter((f) => f !== fn);
      },
      removeAllListeners: () => {
        this.messageListeners = [];
      }
    };
  }
  get onClose() {
    return {
      addListener: (fn) => {
        this.closeListeners.push(fn);
      },
      removeListener: (fn) => {
        this.closeListeners = this.closeListeners.filter((f) => f !== fn);
      },
      removeAllListeners: () => {
        this.closeListeners = [];
      }
    };
  }
  async sendMessageToClient(type, data) {
    if (this.clientTabId) {
      try {
        const result = await import_webextension_polyfill3.default.tabs.sendMessage(this.clientTabId, {
          id: CHROME_EXTENSION_POST_MESSAGE_ID,
          data: {
            taskId: this.id,
            type,
            data
          },
          event: "Client_ListenProxyWebsocket"
        });
        return result;
      } catch (e) {
        await this.close();
        return null;
      }
    }
  }
};

// src/background/src/chat/BingChat/bing/index.ts
var styleOptionMap = {
  ["balanced" /* Balanced */]: "",
  ["creative" /* Creative */]: "h3imaginative",
  ["precise" /* Precise */]: "h3precise"
};
var OPTIONS_SETS = [
  "nlu_direct_response_filter",
  "deepleo",
  "disable_emoji_spoken_text",
  "responsible_ai_policy_235",
  "enablemm",
  "dv3sugg",
  "iyxapbing",
  "iycapbing",
  "galileo",
  "saharagenconv5",
  "log2sph",
  "savememfilter",
  "uprofgen",
  "uprofupd",
  "uprofupdasy",
  "vidsumsnip"
];
var SLICE_IDS = [
  "tnaenableux",
  "adssqovr",
  "tnaenable",
  "arankc_1_9_3",
  "rankcf",
  "0731ziv2s0",
  "926buffall",
  "inosanewsmob",
  "wrapnoins",
  "prechr",
  "sydtransl",
  "806log2sph",
  "927uprofasy",
  "919vidsnip",
  "829suggtrims0"
];
var BingWebBot = class {
  constructor() {
    __publicField(this, "conversationContext");
  }
  buildChatRequest(conversation, message, imageUrl) {
    const requestId = v4_default();
    const styleOption = styleOptionMap[conversation.conversationStyle];
    const optionsSets = OPTIONS_SETS.concat(styleOption || []);
    return {
      arguments: [
        {
          source: "cib",
          optionsSets,
          allowedMessageTypes: [
            "Chat",
            "InternalSearchQuery",
            "Disengaged",
            "InternalLoaderMessage",
            "SemanticSerp",
            "GenerateContentQuery",
            "SearchQuery"
          ],
          sliceIds: SLICE_IDS,
          verbosity: "verbose",
          scenario: "SERP",
          plugins: [],
          isStartOfSession: conversation.invocationId === 0,
          message: {
            timestamp: new Date().toISOString(),
            author: "user",
            inputMethod: "Keyboard",
            text: message,
            imageUrl,
            messageType: "Chat",
            requestId,
            messageId: requestId
          },
          requestId,
          conversationId: conversation.conversationId,
          conversationSignature: conversation.conversationSignature,
          participant: { id: conversation.clientId }
        }
      ],
      invocationId: conversation.invocationId.toString(),
      target: "chat",
      type: 4 /* StreamInvocation */
    };
  }
  async doSendMessage(params) {
    var _a;
    if (!this.conversationContext) {
      try {
        const conversation2 = await createConversation();
        const bingSettings = await getThirdProviderSettings("BING");
        this.conversationContext = {
          conversationId: conversation2.conversationId,
          conversationSignature: conversation2.conversationSignature,
          encryptedConversationSignature: conversation2.encryptedConversationSignature,
          clientId: conversation2.clientId,
          invocationId: 0,
          conversationStyle: (bingSettings == null ? void 0 : bingSettings.conversationStyle) || "balanced" /* Balanced */
        };
      } catch (e) {
        params.onEvent({
          type: "ERROR",
          error: e.message || e
        });
        return;
      }
    }
    const conversation = this.conversationContext;
    const wsp = new ClientProxyWebSocket(
      conversation.encryptedConversationSignature ? `wss://sydney.bing.com/sydney/ChatHub?sec_access_token=${encodeURIComponent(
        conversation.encryptedConversationSignature
      )}` : "wss://sydney.bing.com/sydney/ChatHub"
    );
    await wsp.init(params.clientTabId);
    wsp.onUnpackedMessage.addListener((events) => {
      var _a2, _b, _c, _d, _e, _f, _g;
      for (const event of events) {
        if (JSON.stringify(event) === "{}") {
          wsp.sendPacked({ type: 6 });
          wsp.sendPacked(
            this.buildChatRequest(conversation, params.prompt, params.imageUrl)
          );
          conversation.invocationId += 1;
        } else if (event.type === 6) {
          wsp.sendPacked({ type: 6 });
        } else if (event.type === 3) {
          params.onEvent({
            type: "DONE",
            data: {
              conversationId: conversation.conversationId
            }
          });
          wsp.removeAllListeners();
          wsp.close();
        } else if (event.type === 1) {
          const message = (_b = (_a2 = event.arguments[0]) == null ? void 0 : _a2.messages) == null ? void 0 : _b[0];
          const text = message ? convertMessageToMarkdown(message) : "";
          if (text) {
            params.onEvent({
              type: "UPDATE_ANSWER",
              data: { text, conversationId: conversation.conversationId }
            });
          }
        } else if (event.type === 2) {
          const messages = ((_c = event == null ? void 0 : event.item) == null ? void 0 : _c.messages) || [];
          const errorMessage = (_e = (_d = event == null ? void 0 : event.item) == null ? void 0 : _d.result) == null ? void 0 : _e.error;
          let hasError = false;
          const limited = messages.some(
            (message) => message.contentOrigin === "TurnLimiter"
          );
          if (limited) {
            hasError = true;
            params.onEvent({
              type: "ERROR",
              error: `Sorry, you have reached chat turns limit in this conversation.`
            });
          }
          if (errorMessage === "User needs to solve CAPTCHA to continue.") {
            hasError = true;
            const bingChallengeUrl = `

Please visit [bing.com/turing/captcha/challenge](https://www.bing.com/turing/captcha/challenge), complete any required verifications, then try again.`;
            params.onEvent({
              type: "ERROR",
              error: errorMessage + bingChallengeUrl
            });
          }
          if (messages.length === 0) {
            if (((_g = (_f = event == null ? void 0 : event.item) == null ? void 0 : _f.result) == null ? void 0 : _g.value) === "UnauthorizedRequest") {
              hasError = true;
              params.onEvent({
                type: "ERROR",
                error: errorMessage + `

Please sign in to [bing.com](http://bing.com/), complete any required verifications, then try again.`
              });
              return;
            }
          }
          if (errorMessage === "InvalidRequest") {
            hasError = true;
            params.onEvent({
              type: "ERROR",
              error: errorMessage
            });
          }
          if (hasError) {
            this.conversationContext = void 0;
          }
        } else if (event.type === void 0 && event.error === "Handshake was canceled.") {
          params.onEvent({
            type: "ERROR",
            error: `Please sign in to [bing.com](http://bing.com/), complete any required verifications, then try again.`
          });
          return;
        }
      }
    });
    wsp.onClose.addListener(() => {
      params.onEvent({
        type: "DONE",
        data: { conversationId: conversation.conversationId }
      });
    });
    (_a = params.signal) == null ? void 0 : _a.addEventListener("abort", () => {
      wsp.removeAllListeners();
      wsp.close();
      params.onEvent({
        type: "ERROR",
        error: "manual aborted request."
      });
    });
    await wsp.open("bing");
    await wsp.sendPacked({ protocol: "json", version: 1 });
  }
  resetConversation() {
    this.conversationContext = void 0;
  }
};

// src/background/src/chat/BingChat/index.ts
var BingChat = class extends BaseChat_default {
  constructor() {
    super("BingChat");
    __publicField(this, "bingLib");
    this.bingLib = new BingWebBot();
    this.status = "success";
  }
  async init() {
    this.log.info("init");
  }
  async auth() {
    this.active = true;
    await this.updateClientStatus("success");
  }
  async askChatGPT(question, options, onMessage) {
    const { taskId, clientTabId } = options || {};
    this.log.info("askChatGPT");
    const controller = new AbortController();
    const signal = controller.signal;
    if (taskId) {
      this.taskList[taskId] = () => controller.abort();
    }
    await this.bingLib.doSendMessage({
      prompt: question,
      signal,
      clientTabId,
      onEvent(event) {
        if (event.type === "ERROR") {
          onMessage == null ? void 0 : onMessage({
            type: "error",
            done: true,
            error: event.error,
            data: {
              text: "",
              conversationId: ""
            }
          });
        } else if (event.type === "UPDATE_ANSWER") {
          onMessage == null ? void 0 : onMessage({
            type: "message",
            done: false,
            error: "",
            data: {
              text: event.data.text,
              conversationId: event.data.conversationId
            }
          });
        } else if (event.type === "DONE") {
          onMessage == null ? void 0 : onMessage({
            type: "message",
            done: true,
            error: "",
            data: {
              text: "",
              conversationId: event.data.conversationId
            }
          });
        }
      }
    });
  }
  async removeConversation(conversationId) {
    this.bingLib.resetConversation();
    return Promise.resolve(true);
  }
  async destroy() {
    this.bingLib.resetConversation();
  }
};

// src/background/src/chat/ChatSystem.ts
var import_webextension_polyfill4 = __toESM(require_browser_polyfill());
var log2 = new Log_default("Background/Chat/ChatSystem");
var ChatSystem = class {
  constructor() {
    __publicField(this, "lastTimeProvider");
    __publicField(this, "currentProvider");
    __publicField(this, "adapters", {});
    __publicField(this, "sendQuestion", (taskId, sender, data, options) => {
      var _a;
      return ((_a = this.currentAdapter) == null ? void 0 : _a.sendQuestion(taskId, sender, data, options)) || Promise.resolve();
    });
    this.initChatSystem();
  }
  get status() {
    if (this.currentAdapter) {
      return this.currentAdapter.status;
    }
    return "needAuth";
  }
  get currentAdapter() {
    return this.currentProvider ? this.adapters[this.currentProvider] : void 0;
  }
  initChatSystem() {
    createBackgroundMessageListener(async (runtime, event, data, sender) => {
      var _a, _b;
      if (runtime === "client") {
        switch (event) {
          case "Client_switchChatGPTProvider":
            {
              const { provider } = data;
              await this.switchAdapter(provider);
              return {
                success: true,
                data: {
                  provider
                },
                message: ""
              };
            }
            break;
          case "Client_authChatGPTProvider": {
            const { provider } = data;
            await this.switchAdapter(provider);
            await this.auth(((_a = sender.tab) == null ? void 0 : _a.id) || 0);
            return {
              success: true,
              data: {},
              message: ""
            };
          }
          case "Client_checkChatGPTStatus": {
            return {
              success: true,
              data: {
                status: this.status
              },
              message: ""
            };
          }
          case "Client_createChatGPTConversation": {
            const conversationId = await this.createConversation();
            if (conversationId) {
              return {
                success: true,
                data: {
                  conversationId
                },
                message: ""
              };
            } else {
              return {
                success: false,
                data: {
                  conversationId
                },
                message: "create conversation failed"
              };
            }
          }
          case "Client_askChatGPTQuestion":
            {
              const { taskId, question, options } = data;
              await this.sendQuestion(taskId, sender, question, options);
            }
            break;
          case "Client_removeChatGPTConversation": {
            const { conversationId } = data;
            const success = await this.removeConversation(conversationId || "");
            return {
              success,
              data: {},
              message: ""
            };
          }
          case "Client_abortAskChatGPTQuestion": {
            const { messageId } = data;
            await this.abortAskQuestion(messageId);
            return {
              success: true,
              data: {},
              message: ""
            };
          }
          case "Client_destroyWithLogout": {
            await this.destroy();
            return {
              success: true,
              data: {},
              message: ""
            };
          }
          case "Client_askChatGPTQuestionWithProvider":
            {
              const { provider, taskId, question, options } = data;
              await this.switchAdapter(provider);
              await this.auth(((_b = sender.tab) == null ? void 0 : _b.id) || 0);
              await this.sendQuestion(taskId, sender, question, options);
            }
            break;
          case "Client_askChatGPTQuestionWithProviderDone":
            {
              if (this.lastTimeProvider && this.lastTimeProvider !== this.currentProvider) {
                await this.destroy();
                await this.switchAdapter(this.lastTimeProvider);
                this.lastTimeProvider = void 0;
              }
            }
            break;
          default:
            break;
        }
      }
      return void 0;
    });
    getCacheUserConfig().then(async (userConfig) => {
      if (userConfig.currentProvider) {
        await this.switchAdapter(userConfig.currentProvider);
      }
    });
  }
  addAdapter(provider, adapter2) {
    this.adapters[provider] = adapter2;
  }
  async switchAdapter(provider) {
    if (provider === this.currentProvider) {
      log2.info("switchAdapter", "same provider no need to switch");
      return;
    }
    this.lastTimeProvider = this.currentProvider;
    if (this.currentAdapter) {
      await this.currentAdapter.destroy();
    }
    this.currentProvider = provider;
    await updateCacheUserConfig({
      currentProvider: provider
    });
    await this.preAuth();
    return this.currentAdapter;
  }
  async auth(authTabId) {
    if (this.currentAdapter) {
      await this.currentAdapter.auth(authTabId);
    }
  }
  async preAuth() {
    if (this.currentAdapter) {
      await this.currentAdapter.preAuth();
    }
  }
  async abortAskQuestion(messageId) {
    if (this.currentAdapter) {
      return await this.currentAdapter.abortAskQuestion(messageId);
    }
    return false;
  }
  async createConversation() {
    var _a;
    if (!this.currentAdapter) {
      return "";
    }
    return await ((_a = this.currentAdapter) == null ? void 0 : _a.createConversation()) || "";
  }
  async removeConversation(conversationId) {
    var _a;
    if (!this.currentAdapter) {
      return false;
    }
    const result = await ((_a = this.currentAdapter) == null ? void 0 : _a.removeConversation(conversationId));
    return result;
  }
  async destroy() {
    var _a;
    await import_webextension_polyfill4.default.storage.local.set({
      [CHAT_GPT_MESSAGES_RECOIL_KEY]: JSON.stringify([])
    });
    await ((_a = this.currentAdapter) == null ? void 0 : _a.destroy());
  }
};

// src/features/chatgpt/core/util.ts
var mappingToMessages = (currentNode, mapping) => {
  const messages = [];
  let nodeId = currentNode;
  while (mapping[nodeId]) {
    const node = mapping[nodeId];
    if (!node.message) {
      break;
    }
    const text = node.message.content.parts.join("");
    if (!text) {
      break;
    }
    messages.push({
      messageId: node.id,
      parentMessageId: node.parent,
      text
    });
    nodeId = node.parent;
  }
  return messages;
};

// src/features/chatgpt/core/index.ts
var CHAT_GPT_PROXY_HOST = `https://chatgpt.com`;
var CHAT_TITLE = "WebChatGPT";
var chatGptRequest = (token, method, path, data) => {
  return fetch(`${CHAT_GPT_PROXY_HOST}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: data === void 0 ? void 0 : JSON.stringify(data)
  });
};
var getConversationList = async (params) => {
  try {
    const { token, offset = 0, limit = 100, order = "updated" } = params;
    const resp = await chatGptRequest(
      token,
      "GET",
      `/backend-api/conversations?offset=${offset}&limit=${limit}&order=${order}`
    );
    const data = await resp.json();
    return (data == null ? void 0 : data.items) || [];
  } catch (e) {
    return [];
  }
};
var sendModerationRequest = async ({
  token,
  conversationId,
  messageId,
  input
}) => {
  try {
    await chatGptRequest(token, "POST", "/backend-api/moderations", {
      conversation_id: conversationId,
      message_id: messageId,
      input,
      model: "text-moderation-playground"
    });
  } catch (e) {
  }
};
var setConversationProperty = async (token, conversationId, propertyObject) => {
  await chatGptRequest(
    token,
    "PATCH",
    `/backend-api/conversation/${conversationId}`,
    propertyObject
  );
};
var getChatGPTAccessToken = async (notCatchError = false) => {
  const resp = await fetch("https://chatgpt.com/api/auth/session");
  if (resp.status === 403 && !notCatchError) {
    throw new Error("CLOUDFLARE");
  }
  const data = await resp.json().catch(() => ({}));
  if (!data.accessToken && !notCatchError) {
    throw new Error("UNAUTHORIZED");
  }
  return (data == null ? void 0 : data.accessToken) || "";
};
var ChatGPTConversation = class {
  constructor(props) {
    __publicField(this, "id");
    __publicField(this, "token");
    __publicField(this, "model");
    __publicField(this, "conversationId");
    // regenerate last question answer - parent message id
    __publicField(this, "lastChatGPTAnswerMessageId");
    __publicField(this, "conversationInfo");
    // 是否在删除历史会话
    __publicField(this, "isCleaningCache", false);
    this.token = props.token;
    this.model = props.model;
    this.lastChatGPTAnswerMessageId = v4_default();
    this.id = v4_default();
    this.conversationId = props.conversationId || void 0;
    this.conversationInfo = {
      title: "",
      messages: []
    };
  }
  async updateTitle(title) {
    if (!this.conversationId || this.conversationInfo.title === title) {
      return;
    }
    await setConversationProperty(this.token, this.conversationId, {
      title
    });
    this.conversationInfo.title = title;
  }
  async fetchHistoryAndConfig() {
    if (!this.conversationId) {
      return;
    }
    try {
      const result = await chatGptRequest(
        this.token,
        "GET",
        `/backend-api/conversation/${this.conversationId}`
      );
      const chatGPTConversationRaw = await result.json();
      this.conversationInfo = {
        title: chatGPTConversationRaw.title,
        messages: mappingToMessages(
          chatGPTConversationRaw.current_node,
          chatGPTConversationRaw.mapping
        ),
        raw: chatGPTConversationRaw
      };
      if (chatGPTConversationRaw.title !== CHAT_TITLE) {
        await this.updateTitle(CHAT_TITLE);
      }
      this.lastChatGPTAnswerMessageId = chatGPTConversationRaw.current_node;
    } catch (e) {
      this.lastChatGPTAnswerMessageId = v4_default();
      this.conversationId = void 0;
      this.conversationInfo = {
        title: "",
        messages: []
      };
    }
  }
  async generateAnswer(params, regenerate = false) {
    const questionId = params.messageId || v4_default();
    const parentMessageId = params.parentMessageId || this.lastChatGPTAnswerMessageId || v4_default();
    let isSend = false;
    let resultText = "";
    let resultMessageId = "";
    const conversation_mode_kind = "primary_assistant";
    const postMessage = {
      action: regenerate ? "variant" : "next",
      messages: [
        {
          id: questionId,
          author: {
            role: "user"
          },
          content: {
            content_type: "text",
            parts: [params.prompt]
          }
        }
      ],
      model: this.model,
      parent_message_id: parentMessageId,
      timezone_offset_min: new Date().getTimezoneOffset(),
      history_and_training_disabled: false,
      force_nulligen: false,
      force_paragen: false,
      force_paragen_model_slug: "",
      force_rate_limit: false,
      reset_rate_limits: false,
      suggestions: [],
      websocket_request_id: v4_default(),
      conversation_mode: { kind: conversation_mode_kind }
    };
    if (this.conversationId) {
      postMessage.conversation_id = this.conversationId;
    }
    if (params.streaming === false) {
      postMessage.streaming = false;
    }
    const { arkoseToken, chatRequirementsToken, dx, proofToken } = await getArkoseToken();
    if (arkoseToken) {
      postMessage.arkose_token = arkoseToken;
    }
    if (params.meta) {
      postMessage.messages[0].metadata = params.meta;
    }
    await fetchSSE(`${CHAT_GPT_PROXY_HOST}/backend-api/conversation`, {
      method: "POST",
      signal: params.signal,
      headers: {
        Accept: "text/event-stream",
        "Oai-Language": "en-US",
        "Content-Type": "application/json",
        "Openai-Sentinel-Arkose-Token": arkoseToken || "",
        Authorization: `Bearer ${this.token}`,
        "Openai-Sentinel-Chat-Requirements-Token": chatRequirementsToken,
        "Openai-Sentinel-Proof-Token": proofToken
      },
      body: JSON.stringify(Object.assign(postMessage)),
      onMessage: (message) => {
        var _a, _b, _c, _d, _e;
        if (message === "[DONE]") {
          if (resultText && this.conversationId && resultMessageId) {
            this.updateTitle(CHAT_TITLE);
            sendModerationRequest({
              token: this.token,
              conversationId: this.conversationId,
              messageId: resultMessageId,
              input: resultText
            });
          }
          params.onEvent({ type: "done" });
          return;
        }
        let data;
        try {
          data = JSON.parse(message);
        } catch (err) {
          return;
        }
        const text = ((_c = (_b = (_a = data.message) == null ? void 0 : _a.content) == null ? void 0 : _b.parts) == null ? void 0 : _c[0]) || ((_e = (_d = data.message) == null ? void 0 : _d.content) == null ? void 0 : _e.text);
        if (text) {
          resultText = text;
          resultMessageId = data.message.id;
          this.conversationId = data.conversation_id;
          this.lastChatGPTAnswerMessageId = data.message.id;
          if (this.conversationId && !isSend) {
            isSend = true;
            sendModerationRequest({
              token: this.token,
              conversationId: this.conversationId,
              messageId: questionId,
              input: params.prompt
            });
          }
          params.onEvent({
            type: "answer",
            data: {
              text,
              messageId: data.message.id,
              conversationId: data.conversation_id,
              parentMessageId: questionId
            }
          });
        } else if (data.error) {
          params.onEvent({
            type: "error",
            data: { message: data.error, detail: data }
          });
        }
      }
    }).then((data) => {
      if (data == null ? void 0 : data.wss_url) {
        if (data.conversation_id) {
          this.conversationId = data.conversation_id;
        }
        return;
      }
    }).catch((err) => {
      try {
        if ((err == null ? void 0 : err.message) === "The user aborted a request." || (err == null ? void 0 : err.message) === "BodyStreamBuffer was aborted") {
          params.onEvent({
            type: "error",
            data: { message: "manual aborted request.", detail: "" }
          });
          return;
        }
        const error = JSON.parse(err.message || err);
        params.onEvent({
          type: "error",
          data: { message: error.message, detail: error.detail }
        });
      } catch (e) {
        params.onEvent({
          type: "error",
          data: { message: "Network error.", detail: "" }
        });
      }
    });
  }
  async close() {
    if (this.conversationId) {
      await setConversationProperty(this.token, this.conversationId, {
        is_visible: false
      });
      this.conversationInfo = {
        title: "",
        messages: []
      };
    }
  }
  async removeCacheConversation() {
    if (this.isCleaningCache) {
      return;
    }
    if (this.token) {
      const conversations = await getConversationList({
        token: this.token
      });
      const cacheConversations = conversations.filter(
        (conversation) => {
          return conversation.title === CHAT_TITLE && conversation.id !== this.conversationId;
        }
      );
      if (cacheConversations.length === 0) {
        return;
      }
      this.isCleaningCache = true;
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      for (let i = 0; i < cacheConversations.length; i++) {
        try {
          await setConversationProperty(this.token, cacheConversations[i].id, {
            is_visible: false
          });
          await delay(3e3);
        } catch (e) {
        }
      }
      this.isCleaningCache = false;
    }
  }
  setConversationId(conversationId) {
    this.conversationId = conversationId;
  }
};
var ChatGPTDaemonProcess = class {
  constructor() {
    __publicField(this, "token");
    __publicField(this, "conversations");
    __publicField(this, "abortFunctions");
    __publicField(this, "models");
    __publicField(this, "plugins");
    this.conversations = [];
    this.abortFunctions = {};
    this.plugins = [];
    this.token = void 0;
    this.models = [];
  }
  async fetchModels(token) {
    if (this.models.length > 0) {
      return this.models;
    }
    const resp = await chatGptRequest(token, "GET", "/backend-api/models").then(
      (r2) => r2.json()
    );
    if ((resp == null ? void 0 : resp.models) && resp.models.length > 0) {
      this.models = resp.models;
    }
    return resp.models;
  }
  async fetchPlugins(token) {
    if (this.plugins.length > 0) {
      return this.plugins;
    }
    const resp = await chatGptRequest(
      token,
      "GET",
      "/backend-api/aip/p?offset=0&limit=100&statuses=approved"
    ).then((r2) => r2.json());
    if ((resp == null ? void 0 : resp.items) && resp.items.length > 0) {
      this.plugins = resp.items;
    }
    return resp.items;
  }
  async getModelName(token, selectModel) {
    try {
      const models = await this.fetchModels(token);
      if ((models == null ? void 0 : models.length) > 0) {
        if (selectModel) {
          const model = models.find((m) => m.slug === selectModel);
          if (model) {
            return model.slug;
          }
        }
        return models[0].slug;
      }
      return CHATGPT_3_5_MODEL_NAME;
    } catch (err) {
      return CHATGPT_3_5_MODEL_NAME;
    }
  }
  async getAllModels() {
    if (this.models.length > 0) {
      return this.models;
    }
    try {
      const token = this.token || await getChatGPTAccessToken();
      if (token) {
        this.token = token;
      }
      return await this.fetchModels(token);
    } catch (e) {
      return [];
    }
  }
  async getAllPlugins() {
    if (this.plugins.length > 0) {
      return this.plugins;
    }
    try {
      const token = this.token || await getChatGPTAccessToken();
      if (token) {
        this.token = token;
      }
      return await this.fetchPlugins(token);
    } catch (e) {
      return [];
    }
  }
  async createConversation(conversationId, selectedModel, removeCacheConversation = true) {
    if (this.conversations.length > 0) {
      return this.conversations[0];
    }
    try {
      const token = this.token || await getChatGPTAccessToken();
      if (token) {
        this.token = token;
      }
      const model = await this.getModelName(token, selectedModel);
      const conversationInstance = new ChatGPTConversation({
        token,
        model,
        conversationId
      });
      this.conversations = [conversationInstance];
      removeCacheConversation && conversationInstance.removeCacheConversation();
      await conversationInstance.fetchHistoryAndConfig();
      return conversationInstance;
    } catch (error) {
      return void 0;
    }
  }
  getConversation(conversationId) {
    return this.conversations.find(
      (c) => c.id === conversationId || c.conversationId === conversationId
    );
  }
  getConversations() {
    return this.conversations;
  }
  async closeConversation(conversationId) {
    try {
      const conversation = this.getConversation(conversationId);
      if (conversation) {
        this.conversations = this.conversations.filter(
          (conversation2) => conversation2.conversationId !== conversationId && conversation2.id !== conversationId
        );
        await conversation.close();
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  addAbortWithMessageId(messageId, abortFunction) {
    this.abortFunctions[messageId] = abortFunction;
  }
  removeAbortWithMessageId(messageId) {
    delete this.abortFunctions[messageId];
  }
  abortWithMessageId(messageId) {
    try {
      if (this.abortFunctions[messageId]) {
        this.abortFunctions[messageId]();
        delete this.abortFunctions[messageId];
      }
    } catch (e) {
    }
  }
  removeCacheConversation() {
    var _a, _b;
    return (_b = (_a = this.conversations) == null ? void 0 : _a[0]) == null ? void 0 : _b.removeCacheConversation();
  }
  removeConversationWithId(conversationId) {
    const willDeleConversation = this.conversations.find(
      (conversation) => conversation.conversationId === conversationId
    );
    if (!willDeleConversation) {
      return;
    }
    willDeleConversation.close();
  }
};

// src/background/src/chat/OpenAiChat/socket.ts
var CHAT_GPT_PROXY_HOST2 = `https://chatgpt.com`;
var chatGptRequest2 = (token, method, path, data) => {
  return fetch(`${CHAT_GPT_PROXY_HOST2}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: data === void 0 ? void 0 : JSON.stringify(data)
  });
};
var getConversationFileUrl = async (params) => {
  const { token, conversationId, message_id, sandbox_path } = params;
  const fallbackUrl = `https://chatgpt.com/c/${conversationId}`;
  try {
    const resp = await chatGptRequest2(
      token,
      "GET",
      `/backend-api/conversation/${conversationId}/interpreter/download?message_id=${message_id}&sandbox_path=${sandbox_path}`
    );
    const data = await resp.json();
    if ((data == null ? void 0 : data.status) === "error") {
      return {
        success: false,
        data: fallbackUrl,
        error: "File Expired"
      };
    }
    return {
      success: true,
      data: (data == null ? void 0 : data.download_url) || fallbackUrl
    };
  } catch (e) {
    return {
      success: false,
      data: fallbackUrl,
      error: "Network Error"
    };
  }
};
var getConversationDownloadFile = async (params) => {
  const { token, uuid } = params;
  try {
    const resp = await chatGptRequest2(
      token,
      "GET",
      `/backend-api/files/${uuid}/download`
    );
    const data = await resp.json();
    return {
      success: true,
      data: data == null ? void 0 : data.download_url
    };
  } catch (e) {
    return {
      success: false,
      data: ""
    };
  }
};
var SequenceAckTask = class {
  constructor(task, interval) {
    __publicField(this, "functionToExecute");
    __publicField(this, "abortController");
    __publicField(this, "interval");
    this.functionToExecute = task;
    this.abortController = new AbortController();
    this.interval = interval;
    this.start();
  }
  abort() {
    try {
      this.abortController.abort();
    } catch (e) {
    }
  }
  async start() {
    const signal = this.abortController.signal;
    while (!signal.aborted) {
      try {
        await this.functionToExecute();
      } catch (e) {
      } finally {
        await new Promise((resolve) => setTimeout(resolve, this.interval));
      }
    }
  }
};
var SequenceIdTracker = class {
  constructor() {
    __publicField(this, "currentSequenceId");
    __publicField(this, "isUpdated");
    this.currentSequenceId = 0;
    this.isUpdated = false;
  }
  tryUpdate(newSequenceId) {
    this.isUpdated = true;
    if (newSequenceId > this.currentSequenceId) {
      this.currentSequenceId = newSequenceId;
      return true;
    }
    return false;
  }
  tryGetSequenceId() {
    if (this.isUpdated) {
      this.isUpdated = false;
      return [true, this.currentSequenceId];
    }
    return [false, null];
  }
  reset() {
    this.currentSequenceId = 0;
    this.isUpdated = false;
  }
};
var chatGPTWebappSocketSequenceIdTracker = new SequenceIdTracker();
var ChatGPTSocketService = class {
  constructor() {
    __publicField(this, "token", null);
    __publicField(this, "status", "disconnected");
    __publicField(this, "socket", null);
    __publicField(this, "isDetected", false);
    __publicField(this, "isSocketService", false);
    __publicField(this, "messageListeners", /* @__PURE__ */ new Map());
    __publicField(this, "sequenceAckTask", null);
    __publicField(this, "socketIdMessageMap", /* @__PURE__ */ new Map());
  }
  init(token) {
    this.token = token;
  }
  async connect() {
    if (this.status === "connected") {
      return true;
    }
    await this.disconnect();
    this.status = "connecting";
    const result = await this.registerWebSocket();
    if (result && result.wss_url) {
      return await this.createWebSocket(result.wss_url);
    }
    return false;
  }
  async disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.status = "disconnected";
    this.isDetected = false;
    this.isSocketService = false;
    return true;
  }
  async registerWebSocket() {
    const response = await chatGptRequest2(
      this.token,
      "POST",
      "/backend-api/register-websocket",
      {}
    );
    return response.json();
  }
  createWebSocket(url) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        if (this.socket) {
          this.socket.close();
          this.status = "disconnected";
        }
        resolve(false);
      }, 5e3);
      this.socket = new WebSocket(url, "json.reliable.webpubsub.azure.v1");
      this.socket.binaryType = "arraybuffer";
      this.socket.onopen = () => {
        this.sequenceAckTask = new SequenceAckTask(async () => {
          var _a;
          const [isUpdated, sequenceId] = chatGPTWebappSocketSequenceIdTracker.tryGetSequenceId();
          if (isUpdated && sequenceId) {
            (_a = this.socket) == null ? void 0 : _a.send(
              JSON.stringify({
                sequenceId,
                type: "sequenceAck"
              })
            );
          }
        }, 1e3);
      };
      this.socket.onerror = (error) => {
        var _a;
        (_a = this.sequenceAckTask) == null ? void 0 : _a.abort();
      };
      this.socket.onclose = () => {
        var _a;
        this.status = "disconnected";
        chatGPTWebappSocketSequenceIdTracker.reset();
        (_a = this.sequenceAckTask) == null ? void 0 : _a.abort();
      };
      this.socket.onmessage = async (event) => {
        try {
          const handleSocketMessage = await this.handleSocketMessage(event);
          if (handleSocketMessage) {
            if (handleSocketMessage.type === "system") {
              if (handleSocketMessage.kind === "connected") {
                clearTimeout(timer);
                this.status = "connected";
                resolve(true);
              } else if (handleSocketMessage.kind === "disconnected") {
                clearTimeout(timer);
                this.status = "disconnected";
                resolve(false);
              }
            } else if (handleSocketMessage.type === "message") {
              this.onSocketMessage(handleSocketMessage).then().catch();
            }
          }
        } catch (e) {
        }
      };
    });
  }
  async handleSocketMessage(event) {
    const eventData = Array.isArray(event.data) ? chatGPTWebappMergeBuffers(event.data) : event.data;
    if (typeof eventData === "string") {
      if (!eventData) {
        throw new Error("ChatGPTWebapp Socket [Message]: message data empty");
      }
      const jsonData = JSON.parse(eventData);
      if (jsonData.type === "system") {
        if (jsonData.event === "connected") {
          return Object.assign({}, jsonData, {
            kind: "connected"
          });
        } else if (jsonData.event === "disconnected") {
          return Object.assign({}, jsonData, {
            kind: "disconnected"
          });
        }
      } else if (jsonData.type === "message") {
        if (jsonData.from === "group") {
          const socketData = chatGPTWebappTransformData(
            jsonData.data,
            jsonData.dataType
          );
          if (socketData === null) {
            return null;
          }
          return Object.assign({}, jsonData, {
            data: socketData,
            message: chatGPTWebappHandleMessageText(socketData.body),
            kind: "groupData"
          });
        } else if (jsonData.from === "server") {
          const socketData = chatGPTWebappTransformData(
            jsonData.data,
            jsonData.dataType
          );
          if (socketData === null) {
            return null;
          }
          return Object.assign({}, jsonData, {
            data: socketData,
            message: chatGPTWebappHandleMessageText(socketData.body),
            kind: "serverData"
          });
        } else if (jsonData.from === "ack") {
          return Object.assign({}, jsonData, {
            kind: "ack"
          });
        }
      } else {
        throw new Error("socket message data type error");
      }
      return null;
    } else {
      throw new Error("socket message data type error");
    }
  }
  async detectChatGPTWebappIsSocket() {
    var _a, _b, _c;
    if (this.isDetected) {
      return this.isSocketService;
    }
    if (this.token) {
      let isSSE = false;
      try {
        const result = await fetch(
          `${CHAT_GPT_PROXY_HOST2}/backend-api/accounts/check/v4-2023-04-27`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`
            }
          }
        );
        if (result.ok && result.status === 200) {
          this.isDetected = true;
          const data = await result.json();
          const features = [];
          (_a = data == null ? void 0 : data.account_ordering) == null ? void 0 : _a.forEach((userId) => {
            var _a2, _b2, _c2, _d;
            if ((_b2 = (_a2 = data == null ? void 0 : data.accounts) == null ? void 0 : _a2[userId]) == null ? void 0 : _b2.features) {
              features.push(...(_d = (_c2 = data == null ? void 0 : data.accounts) == null ? void 0 : _c2[userId]) == null ? void 0 : _d.features);
            }
          });
          features.push(...((_c = (_b = data == null ? void 0 : data.accounts) == null ? void 0 : _b.default) == null ? void 0 : _c.features) || []);
          if (features.includes("shared_websocket")) {
            this.isSocketService = true;
            isSSE = true;
          }
        }
      } catch (e) {
      }
      return isSSE;
    }
    return this.isSocketService;
  }
  onMessageIdListener(messageId, listener) {
    this.messageListeners.set(messageId, listener);
  }
  async onSocketMessage(chatGPTSocketServiceMessage) {
    if ((chatGPTSocketServiceMessage == null ? void 0 : chatGPTSocketServiceMessage.kind) === "serverData" || (chatGPTSocketServiceMessage == null ? void 0 : chatGPTSocketServiceMessage.kind) === "groupData") {
      this.processMessage(chatGPTSocketServiceMessage, (message) => {
        var _a;
        if ((_a = message == null ? void 0 : message.ChatGPTSocketRawData) == null ? void 0 : _a.sequenceId) {
          chatGPTWebappSocketSequenceIdTracker.tryUpdate(
            message.ChatGPTSocketRawData.sequenceId
          );
        }
        this.messageListeners.forEach((listener, messageId) => {
          if (message.parentMessageId === messageId) {
            listener(message.parentMessageId, message);
          }
        });
      });
    }
  }
  async processMessage(chatGPTSocketServiceMessage, onMessage) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    if (!chatGPTSocketServiceMessage.message || chatGPTSocketServiceMessage.message === "") {
      return;
    }
    if (chatGPTSocketServiceMessage.message === "[DONE]") {
      const socketId = (_a = chatGPTSocketServiceMessage.data) == null ? void 0 : _a.response_id;
      if (socketId && this.socketIdMessageMap.has(socketId)) {
        const cache = this.socketIdMessageMap.get(socketId);
        let newResultText = cache.text;
        if (this.token && cache.displayImages.length > 0) {
          const imageUrls = await Promise.all(
            cache.displayImages.map(async (displayImageId) => {
              return await getConversationDownloadFile({
                token: this.token,
                uuid: displayImageId
              });
            })
          );
          imageUrls.forEach((image) => {
            if (image.success && image.data) {
              newResultText = `![image](${image.data})
${newResultText}`;
            }
          });
        }
        const markdownLinks = newResultText.match(/\[.*?\]\(.*?\)/g);
        if (cache.conversationId && cache.messageId && markdownLinks && markdownLinks.length > 0) {
          const replaceDataList = await Promise.all(
            markdownLinks.map(async (markdownLink) => {
              const parts = markdownLink.split("](");
              if (parts.length !== 2) {
                return void 0;
              }
              const text = parts[0].slice(1);
              const url = parts[1].slice(0, -1);
              if (!url.startsWith("sandbox:")) {
                return void 0;
              }
              const downloadFile = await getConversationFileUrl({
                token: this.token,
                conversationId: cache.conversationId,
                message_id: cache.messageId,
                sandbox_path: url.replace("sandbox:", "")
              });
              if (downloadFile.success) {
                return {
                  original: markdownLink,
                  new: `[${text}](${downloadFile.data})`
                };
              } else {
                return void 0;
              }
            })
          );
          replaceDataList.forEach((replaceData) => {
            if (replaceData) {
              newResultText = newResultText.replace(
                replaceData.original,
                replaceData.new
              );
            }
          });
        }
        onMessage({
          parentMessageId: cache.parentMessageId,
          messageId: cache.messageId,
          conversationId: cache.conversationId,
          text: newResultText,
          error: "",
          done: true,
          ChatGPTSocketRawData: chatGPTSocketServiceMessage,
          ChatGPTMessageRawData: cache.rawMessage
        });
        this.socketIdMessageMap.delete(socketId);
        this.messageListeners.delete(cache.parentMessageId);
      }
      return;
    }
    try {
      const rawMessage = JSON.parse(
        chatGPTSocketServiceMessage.message
      );
      const messageId = ((_b = rawMessage == null ? void 0 : rawMessage.message) == null ? void 0 : _b.id) || "";
      const parentMessageId = ((_d = (_c = rawMessage == null ? void 0 : rawMessage.message) == null ? void 0 : _c.metadata) == null ? void 0 : _d.parent_id) || "";
      const socketId = (_e = chatGPTSocketServiceMessage.data) == null ? void 0 : _e.response_id;
      if (!messageId || !socketId || !parentMessageId) {
        return;
      }
      if (!this.socketIdMessageMap.has(socketId)) {
        this.socketIdMessageMap.set(socketId, {
          messageId,
          parentMessageId,
          conversationId: rawMessage.conversation_id,
          displayImages: [],
          text: "",
          rawMessage
        });
      }
      const cache = this.socketIdMessageMap.get(socketId);
      if (rawMessage.error) {
        onMessage({
          messageId,
          // 因为parentMessageId和messageId都会变，只有socketId不会变，所以在第一次socketIdMessageMap之后，就不能改parentMessageId
          parentMessageId: cache.parentMessageId,
          conversationId: rawMessage.conversation_id,
          text: "",
          error: rawMessage.error,
          done: true,
          ChatGPTSocketRawData: chatGPTSocketServiceMessage,
          ChatGPTMessageRawData: rawMessage
        });
        return;
      }
      let text = ((_h = (_g = (_f = rawMessage.message) == null ? void 0 : _f.content) == null ? void 0 : _g.parts) == null ? void 0 : _h[0]) || ((_j = (_i = rawMessage.message) == null ? void 0 : _i.content) == null ? void 0 : _j.text) || "";
      if (typeof text === "string" && text.includes(`<<ImageDisplayed>>`)) {
        const imageFileUrl = ((_o = (_n = (_m = (_l = (_k = rawMessage.message) == null ? void 0 : _k.metadata) == null ? void 0 : _l.aggregate_result) == null ? void 0 : _m.messages) == null ? void 0 : _n[0]) == null ? void 0 : _o.image_url) || "";
        const imageFileId = ((_p = imageFileUrl.split("//")) == null ? void 0 : _p[1]) || "";
        if (imageFileId && !cache.displayImages.find((imageFileId2) => imageFileId2)) {
          cache.displayImages.push(imageFileId);
        }
      }
      if (((_r = (_q = rawMessage.message) == null ? void 0 : _q.content) == null ? void 0 : _r.content_type) === "multimodal_text") {
        if (((_t = (_s = rawMessage.message.content.parts) == null ? void 0 : _s[0]) == null ? void 0 : _t.content_type) === "image_asset_pointer") {
          text = "Creating image";
          const assetPointer = ((_x = (_w = (_v = (_u = rawMessage.message.content.parts) == null ? void 0 : _u[0]) == null ? void 0 : _v.asset_pointer) == null ? void 0 : _w.split("//")) == null ? void 0 : _x[1]) || "";
          if (assetPointer) {
            if (cache.displayImages.find((item) => item === assetPointer)) {
              return;
            }
            cache.displayImages.push(assetPointer);
          }
        }
      }
      cache.text = text;
      this.socketIdMessageMap.set(socketId, cache);
      onMessage({
        messageId,
        // 因为parentMessageId和messageId都会变，只有socketId不会变，所以在第一次socketIdMessageMap之后，就不能改parentMessageId
        parentMessageId: cache.parentMessageId,
        done: false,
        conversationId: rawMessage.conversation_id,
        text: cache.text,
        error: "",
        ChatGPTSocketRawData: chatGPTSocketServiceMessage,
        ChatGPTMessageRawData: rawMessage
      });
    } catch (e) {
    }
  }
};
function chatGPTWebappTransformData(Y, dataType) {
  if (dataType === "text") {
    if (typeof Y !== "string") {
      throw new TypeError("Message must be a string when dataType is text");
    }
    return Y;
  }
  if (dataType === "json") {
    return Y;
  }
  if (dataType !== "binary" && dataType !== "protobuf") {
    return null;
  }
  const buffer = Buffer.from(Y, "base64");
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
}
function chatGPTWebappHandleMessageText(body) {
  try {
    let jsonText = atob(body).trim();
    if (jsonText.startsWith("data: ")) {
      jsonText = jsonText.replace("data: ", "");
    }
    return jsonText;
  } catch (err) {
    return "";
  }
}
function chatGPTWebappMergeBuffers(bufferList) {
  let totalLength;
  if (!Array.isArray(bufferList))
    throw new TypeError('"bufferList" argument must be an Array of Buffers');
  if (bufferList.length === 0)
    return Buffer.alloc(0);
  if (typeof totalLength === "undefined") {
    totalLength = 0;
    for (let i = 0; i < bufferList.length; ++i)
      totalLength += bufferList[i].length;
  }
  const mergedBuffer = Buffer.allocUnsafe(totalLength);
  let offset = 0;
  for (let i = 0; i < bufferList.length; ++i) {
    let currentBuffer = bufferList[i];
    if (currentBuffer instanceof Uint8Array) {
      if (offset + currentBuffer.length > mergedBuffer.length) {
        if (!Buffer.isBuffer(currentBuffer))
          currentBuffer = Buffer.from(currentBuffer);
        currentBuffer.copy(mergedBuffer, offset);
      } else {
        Uint8Array.prototype.set.call(mergedBuffer, currentBuffer, offset);
      }
    } else if (Buffer.isBuffer(currentBuffer)) {
      currentBuffer.copy(mergedBuffer, offset);
    } else {
      throw new TypeError('"bufferList" argument must be an Array of Buffers');
    }
    offset += currentBuffer.length;
  }
  return mergedBuffer;
}
var _ChatGPTSocketManager = class {
  static get socketService() {
    if (!_ChatGPTSocketManager.instance) {
      _ChatGPTSocketManager.instance = new ChatGPTSocketService();
    }
    return _ChatGPTSocketManager.instance;
  }
};
var ChatGPTSocketManager = _ChatGPTSocketManager;
__publicField(ChatGPTSocketManager, "instance");
var socket_default = ChatGPTSocketManager;

// src/background/src/chat/OpenAiChat/index.ts
var log3 = new Log_default("ChatGPT/OpenAIChat");
var CHAT_TITLE2 = "WebChatGPT";
var OpenAIChat = class extends BaseChat_default {
  constructor() {
    super("OpenAIChat");
    __publicField(this, "openAILib");
    __publicField(this, "status", "success");
    __publicField(this, "conversation");
    this.openAILib = new ChatGPTDaemonProcess();
    this.conversation = void 0;
    this.init();
  }
  init() {
    this.log.info("init");
  }
  async preAuth() {
    this.log.info("preAuth");
  }
  async auth(authTabId) {
    this.active = true;
    this.status = "success";
    await this.updateClientStatus();
  }
  async createConversation() {
    this.conversation = await this.openAILib.createConversation();
    return this.conversation;
  }
  async removeConversation(conversationId) {
    return await this.openAILib.closeConversation(conversationId);
  }
  async askChatGPT(question, options, onMessage) {
    if (this.conversation && (options == null ? void 0 : options.newConversation)) {
      await this.removeConversation(this.conversation.conversationId);
      this.conversation = void 0;
    }
    try {
      await this.createConversation();
    } catch (error) {
      onMessage == null ? void 0 : onMessage({
        type: "error",
        done: true,
        error: error.message || "conversation is not created",
        data: {
          text: "",
          conversationId: ""
        }
      });
    }
    if (!this.openAILib.token) {
      onMessage == null ? void 0 : onMessage({
        type: "error",
        done: true,
        error: "UNAUTHORIZED",
        data: {
          text: "",
          conversationId: ""
        }
      });
      return;
    }
    if (!this.conversation) {
      onMessage == null ? void 0 : onMessage({
        type: "error",
        done: true,
        error: "conversation is not created",
        data: {
          text: "",
          conversationId: ""
        }
      });
      return;
    }
    const openAILib = this.openAILib;
    const conversation = this.conversation;
    const { taskId } = options || {};
    this.log.info("askChatGPT");
    const controller = new AbortController();
    const signal = controller.signal;
    if (taskId) {
      this.taskList[taskId] = () => controller.abort();
    }
    socket_default.socketService.init(this.openAILib.token || "");
    const isSocket = await socket_default.socketService.detectChatGPTWebappIsSocket();
    if (isSocket) {
      const isConnectSuccess = await socket_default.socketService.connect();
      if (isConnectSuccess) {
        const messageId = v4_default();
        socket_default.socketService.onMessageIdListener(
          messageId,
          async (messageId2, event) => {
            if (event.done) {
              taskId && openAILib.removeAbortWithMessageId(taskId);
              onMessage == null ? void 0 : onMessage({
                type: "message",
                done: true,
                error: "",
                data: {
                  text: "",
                  conversationId: conversation.conversationId
                }
              });
              conversation.updateTitle(CHAT_TITLE2).catch(console.error);
            } else {
              onMessage == null ? void 0 : onMessage({
                type: "message",
                done: false,
                error: "",
                data: {
                  text: event.text,
                  conversationId: event.conversationId
                }
              });
            }
          }
        );
        await this.conversation.generateAnswer(
          {
            prompt: question,
            messageId,
            signal,
            streaming: false,
            onEvent(event) {
              log3.info("generateAnswer", event, options);
            }
          },
          (options == null ? void 0 : options.regenerate) === true
        );
      } else {
        onMessage == null ? void 0 : onMessage({
          type: "error",
          done: true,
          error: "WS Connection failed",
          data: {
            text: "",
            conversationId: ""
          }
        });
      }
    } else {
      await this.conversation.generateAnswer(
        {
          prompt: question,
          signal,
          onEvent(event) {
            log3.info("generateAnswer", event, options);
            if (event.type === "error") {
              log3.info("error");
              log3.info("abort Controller remove", taskId);
              taskId && openAILib.removeAbortWithMessageId(taskId);
              onMessage == null ? void 0 : onMessage({
                type: "error",
                done: true,
                error: event.data.message || event.data.detail || "",
                data: {
                  text: "",
                  conversationId: ""
                }
              });
              return;
            }
            if (event.type === "done") {
              log3.info("abort Controller remove", taskId);
              taskId && openAILib.removeAbortWithMessageId(taskId);
              onMessage == null ? void 0 : onMessage({
                type: "message",
                done: true,
                error: "",
                data: {
                  text: "",
                  conversationId: conversation.conversationId
                }
              });
              return;
            }
            onMessage == null ? void 0 : onMessage({
              type: "message",
              done: false,
              error: "",
              data: {
                text: event.data.text,
                conversationId: conversation.conversationId
              }
            });
          }
        },
        (options == null ? void 0 : options.regenerate) === true
      );
    }
  }
  async abortAskQuestion(messageId) {
    if (this.taskList[messageId]) {
      this.taskList[messageId]();
      delete this.taskList[messageId];
    }
    return this.openAILib.abortWithMessageId(messageId);
  }
  async destroy() {
    this.openAILib.removeCacheConversation();
  }
  async updateClientStatus() {
    if (this.active) {
    }
  }
};

// src/background/src/chat/MaxAIClaudeChat/index.ts
var import_webextension_polyfill5 = __toESM(require_browser_polyfill());
var log4 = new Log_default("Background/Chat/MaxAIClaudeChat");
var MaxAIClaudeChat = class extends BaseChat_default {
  constructor() {
    super("MaxAIClaudeChat");
    __publicField(this, "status", "needAuth");
    __publicField(this, "lastActiveTabId");
    __publicField(this, "token");
    __publicField(this, "conversationId");
    this.init();
  }
  init() {
    log4.info("init");
  }
  async preAuth() {
    this.active = true;
    await this.checkTokenAndUpdateStatus();
  }
  async auth(authTabId) {
    this.active = true;
    this.lastActiveTabId = authTabId;
    await this.checkTokenAndUpdateStatus();
    if (this.status === "needAuth") {
      await import_webextension_polyfill5.default.tabs.create({
        active: true,
        url: APP_USE_CHAT_GPT_HOST
      });
    }
    await this.updateClientStatus();
  }
  async checkTokenAndUpdateStatus() {
    const prevStatus = this.status;
    this.token = await this.getToken();
    this.status = this.token ? "success" : "needAuth";
    if (prevStatus !== this.status) {
      log4.info("checkTokenAndUpdateStatus", this.status, this.lastActiveTabId);
      this.lastActiveTabId = void 0;
    }
    await this.updateClientStatus();
  }
  createConversation() {
    this.conversationId = v4_default();
    return this.conversationId;
  }
  removeConversation() {
    this.conversationId = void 0;
  }
  /**
   * 获取回答
   * @param question 问题
   * @param options
   * @param onMessage 回调
   * @param options.regenerate 是否重新生成
   * @param options.streaming 是否流式
   * @param options.taskId 任务id
   */
  async askChatGPT(question, options, onMessage) {
    await this.checkTokenAndUpdateStatus();
    if (this.status !== "success") {
      onMessage && onMessage({
        type: "error",
        done: true,
        error: "Your session has expired. Please log in.",
        data: {
          text: "",
          conversationId: ""
        }
      });
      return;
    }
    const {
      taskId,
      streaming = true,
      regenerate = false,
      chat_history = [],
      model
    } = options || {};
    const postBody = Object.assign(
      {
        chat_history,
        regenerate,
        streaming,
        message_content: question,
        chrome_extension_version: APP_VERSION,
        model_name: model || "claude-3-haiku"
        // TODO: 界面还没做
        // temperature: isNumber(userConfig?.temperature)
        //   ? userConfig!.temperature
        //   : 1,
      }
      // { conversation_id: this.conversation?.id || '' },
    );
    const controller = new AbortController();
    const signal = controller.signal;
    if (taskId) {
      this.taskList[taskId] = () => controller.abort();
    }
    log4.info("streaming start", postBody);
    let messageResult = "";
    let isEnd = false;
    let hasError = false;
    let sentTextLength = 0;
    let conversationId = this.conversationId || "";
    const sendTextSettings = await import_webextension_polyfill5.default.storage.local.get(
      BACKGROUND_SEND_TEXT_SPEED_SETTINGS
    );
    const settings = sendTextSettings[BACKGROUND_SEND_TEXT_SPEED_SETTINGS] || {};
    const interval = settings.interval || 50;
    const echoTextRate = settings.rate || 0.5;
    const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
    const throttleEchoText = async () => {
      if (hasError) {
        return;
      }
      if (isEnd && sentTextLength === messageResult.length) {
        log4.info("streaming end success");
        onMessage && onMessage({
          done: true,
          type: "message",
          error: "",
          data: { text: "", conversationId }
        });
        return;
      }
      let currentSendTextTextLength = 0;
      const waitSendTextLength = Math.floor(
        messageResult.length - sentTextLength
      );
      if (!isEnd) {
        const needSendTextLength = Math.floor(waitSendTextLength * echoTextRate);
        currentSendTextTextLength = messageResult.slice(
          sentTextLength,
          needSendTextLength + sentTextLength
        ).length;
      } else {
        const needSendTextLength = Math.max(
          Math.floor(messageResult.length * 0.1),
          10
        );
        currentSendTextTextLength = messageResult.slice(
          sentTextLength,
          needSendTextLength + sentTextLength
        ).length;
      }
      if (currentSendTextTextLength > 0) {
        log4.debug(
          "streaming echo message",
          isEnd ? "\u4E00\u79D2\u53D1\u9001\u5B8C\u5269\u4E0B\u7684\u6587\u672C" : `\u6BCF${interval}\u6BEB\u79D2\u53D1\u9001\u5269\u4F59\u6587\u672C\u7684${(echoTextRate * 100).toFixed(
            0
          )}%`,
          sentTextLength,
          currentSendTextTextLength,
          messageResult.length
        );
        sentTextLength += currentSendTextTextLength;
        onMessage && onMessage({
          type: "message",
          done: false,
          error: "",
          data: {
            text: messageResult.slice(0, sentTextLength),
            conversationId
          }
        });
      }
      await delay(isEnd ? 100 : interval);
      await throttleEchoText();
    };
    throttleEchoText();
    let isTokenExpired = false;
    await fetchSSE(`${APP_USE_CHAT_GPT_API_HOST}/gpt/webchatgpt_gpt_response`, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        "x-version": `webchatgpt_${import_webextension_polyfill5.default.runtime.getManifest().version}`
      },
      body: JSON.stringify(postBody),
      onMessage: (message) => {
        try {
          const messageData = JSON.parse(message);
          if (messageData == null ? void 0 : messageData.conversation_id) {
            conversationId = messageData.conversation_id;
          }
          if (messageData == null ? void 0 : messageData.text) {
            messageResult += messageData.text;
          }
          log4.debug("streaming on message", messageResult);
        } catch (e) {
          log4.error("parse message.data error: 	", e);
        }
      }
    }).then((res) => {
      if (res.status === "OK" && res.text) {
        onMessage && onMessage({
          done: true,
          type: "error",
          error: "",
          data: { text: res.text, conversationId }
        });
      } else {
        onMessage && onMessage({
          done: true,
          type: "error",
          error: res.msg || "Network error.",
          data: { text: "", conversationId }
        });
      }
    }).catch((err) => {
      log4.info("streaming end error", err);
      isEnd = true;
      hasError = true;
      if ((err == null ? void 0 : err.message) === "BodyStreamBuffer was aborted" || (err == null ? void 0 : err.message) === "The user aborted a request.") {
        onMessage && onMessage({
          type: "error",
          error: "manual aborted request.",
          done: true,
          data: { text: "", conversationId }
        });
        return;
      }
      try {
        const error = JSON.parse(err.message || err);
        if (error.msg && isPermissionCardSceneType(error.msg)) {
          onMessage && onMessage({
            type: "error",
            error: error.msg,
            done: true,
            data: { text: "", conversationId }
          });
          return;
        }
        if ((error == null ? void 0 : error.code) === 401) {
          isTokenExpired = true;
        }
        log4.error("sse error", err);
        onMessage && onMessage({
          done: true,
          type: "error",
          error: error.message || error.detail || "Network error.",
          data: { text: "", conversationId }
        });
      } catch (e) {
        onMessage && onMessage({
          done: true,
          type: "error",
          error: "Network error.",
          data: { text: "", conversationId }
        });
      }
    });
    if (!isEnd && streaming) {
      log4.info("streaming end success");
      if (messageResult === "") {
        sendLarkBotMessageInBgScript(
          "[API] response empty string.",
          JSON.stringify(
            {
              model: postBody.model_name,
              promptTextLength: postBody.message_content.length
            },
            null,
            2
          ),
          {
            uuid: "6f02f533-def6-4696-b14e-1b00c2d9a4df"
          }
        );
        onMessage && onMessage({
          done: true,
          type: "error",
          error: "Something went wrong, please try again. If this issue persists, contact us via email.",
          data: { text: "", conversationId }
        });
      } else {
        isEnd = true;
      }
    }
    if (isTokenExpired) {
      log4.info("user token expired");
      this.status = "needAuth";
      await logoutUseChatGPTAuth();
      await this.updateClientStatus();
    }
  }
  async abortTask(taskId) {
    if (this.taskList[taskId]) {
      this.taskList[taskId]();
      delete this.taskList[taskId];
      return true;
    }
    return true;
  }
  async destroy() {
    log4.info("destroy");
    this.status = "needAuth";
    this.active = false;
  }
  async getToken() {
    return await getUseChatGPTAccessToken();
  }
  async updateClientStatus() {
    if (this.active) {
    }
  }
};

// src/background/src/chat/FreeAIChat/index.ts
var import_webextension_polyfill6 = __toESM(require_browser_polyfill());
var log5 = new Log_default("Background/Chat/UseChatGPTPlusChat");
var FreeAIChat = class extends BaseChat_default {
  constructor() {
    super("FreeAIChat");
    __publicField(this, "status", "success");
    __publicField(this, "lastActiveTabId");
    __publicField(this, "token");
    __publicField(this, "conversationId");
    this.init();
  }
  init() {
    log5.info("init");
  }
  async preAuth() {
    this.active = true;
    await this.checkTokenAndUpdateStatus();
  }
  async auth(authTabId) {
    this.active = true;
    this.lastActiveTabId = authTabId;
    await this.checkTokenAndUpdateStatus();
    if (this.status === "needAuth") {
      await import_webextension_polyfill6.default.tabs.create({
        active: true,
        url: APP_USE_CHAT_GPT_HOST
      });
    }
    await this.updateClientStatus();
  }
  async checkTokenAndUpdateStatus() {
    const prevStatus = this.status;
    this.token = await this.getToken();
    this.status = "success";
    if (prevStatus !== this.status) {
      log5.info("checkTokenAndUpdateStatus", this.status, this.lastActiveTabId);
      this.lastActiveTabId = void 0;
    }
    await this.updateClientStatus();
  }
  createConversation() {
    this.conversationId = v4_default();
    return this.conversationId;
  }
  removeConversation() {
    this.conversationId = void 0;
  }
  /**
   * 获取回答
   * @param question 问题
   * @param options
   * @param onMessage 回调
   * @param options.doc_id 大文件聊天之前上传的上下文的documentId
   * @param options.chat_history 聊天历史
   * @param options.backendAPI 后端api
   * @param options.streaming 是否流式
   * @param options.taskId 任务id
   */
  async askChatGPT(question, options, onMessage) {
    await this.checkTokenAndUpdateStatus();
    if (this.status !== "success") {
      onMessage && onMessage({
        type: "error",
        done: true,
        error: "Your session has expired. Please log in.",
        data: {
          text: "",
          conversationId: ""
        }
      });
      return;
    }
    const {
      taskId,
      doc_id,
      backendAPI = "get_freeai_web_response",
      streaming = true,
      chat_history = [],
      model
    } = options || {};
    const postBody = Object.assign(
      {
        chat_history,
        streaming,
        message_content: question,
        chrome_extension_version: APP_VERSION,
        model_name: model || FREE_AI_MODELS[0].value,
        temperature: 0
      },
      doc_id ? { doc_id } : {}
    );
    const controller = new AbortController();
    const signal = controller.signal;
    if (taskId) {
      this.taskList[taskId] = () => controller.abort();
    }
    log5.info("streaming start", postBody);
    let messageResult = "";
    let isEnd = false;
    let hasError = false;
    let sentTextLength = 0;
    let conversationId = this.conversationId || "";
    const sendTextSettings = await import_webextension_polyfill6.default.storage.local.get(
      BACKGROUND_SEND_TEXT_SPEED_SETTINGS
    );
    const settings = sendTextSettings[BACKGROUND_SEND_TEXT_SPEED_SETTINGS] || {};
    const interval = settings.interval || 50;
    const echoTextRate = settings.rate || 0.5;
    const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
    const throttleEchoText = async () => {
      if (hasError) {
        return;
      }
      if (isEnd && sentTextLength === messageResult.length) {
        log5.info("streaming end success");
        onMessage && onMessage({
          done: true,
          type: "message",
          error: "",
          data: { text: "", conversationId }
        });
        return;
      }
      let currentSendTextTextLength = 0;
      const waitSendTextLength = Math.floor(
        messageResult.length - sentTextLength
      );
      if (!isEnd) {
        const needSendTextLength = Math.floor(waitSendTextLength * echoTextRate);
        currentSendTextTextLength = messageResult.slice(
          sentTextLength,
          needSendTextLength + sentTextLength
        ).length;
      } else {
        const needSendTextLength = Math.max(
          Math.floor(messageResult.length * 0.1),
          10
        );
        currentSendTextTextLength = messageResult.slice(
          sentTextLength,
          needSendTextLength + sentTextLength
        ).length;
      }
      if (currentSendTextTextLength > 0) {
        log5.debug(
          "streaming echo message",
          isEnd ? "\u4E00\u79D2\u53D1\u9001\u5B8C\u5269\u4E0B\u7684\u6587\u672C" : `\u6BCF${interval}\u6BEB\u79D2\u53D1\u9001\u5269\u4F59\u6587\u672C\u7684${(echoTextRate * 100).toFixed(
            0
          )}%`,
          sentTextLength,
          currentSendTextTextLength,
          messageResult.length
        );
        sentTextLength += currentSendTextTextLength;
        onMessage && onMessage({
          type: "message",
          done: false,
          error: "",
          data: {
            text: messageResult.slice(0, sentTextLength),
            conversationId
          }
        });
      }
      await delay(isEnd ? 100 : interval);
      await throttleEchoText();
    };
    throttleEchoText();
    let isTokenExpired = false;
    await fetchSSE(`${APP_FREE_AI_HOST}/gpt/${backendAPI}`, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify(postBody),
      onMessage: (message) => {
        try {
          const messageData = JSON.parse(message);
          if (messageData == null ? void 0 : messageData.conversation_id) {
            conversationId = messageData.conversation_id;
          }
          if (messageData == null ? void 0 : messageData.text) {
            messageResult += messageData.text;
          }
          log5.debug("streaming on message", messageResult);
        } catch (e) {
          log5.error("parse message.data error: 	", e);
        }
      }
    }).then((res) => {
      if (res.status === "OK" && res.text) {
        onMessage && onMessage({
          done: true,
          type: "error",
          error: "",
          data: { text: res.text, conversationId }
        });
      } else {
        onMessage && onMessage({
          done: true,
          type: "error",
          error: res.msg || "Network error.",
          data: { text: "", conversationId }
        });
      }
    }).catch((err) => {
      log5.info("streaming end error", err);
      isEnd = true;
      hasError = true;
      if ((err == null ? void 0 : err.message) === "BodyStreamBuffer was aborted" || (err == null ? void 0 : err.message) === "The user aborted a request.") {
        onMessage && onMessage({
          type: "error",
          error: "manual aborted request.",
          done: true,
          data: { text: "", conversationId }
        });
        return;
      }
      try {
        const error = JSON.parse(err.message || err);
        if (error.msg && isPermissionCardSceneType(error.msg)) {
          onMessage && onMessage({
            type: "error",
            error: error.msg,
            done: true,
            data: { text: "", conversationId }
          });
          return;
        }
        if ((error == null ? void 0 : error.code) === 401) {
          isTokenExpired = true;
          onMessage && onMessage({
            done: true,
            type: "error",
            error,
            data: { text: "", conversationId }
          });
          return;
        }
        log5.error("sse error", err);
        onMessage && onMessage({
          done: true,
          type: "error",
          error: error.message || error.detail || "Network error.",
          data: { text: "", conversationId }
        });
      } catch (e) {
        onMessage && onMessage({
          done: true,
          type: "error",
          error: "Network error.",
          data: { text: "", conversationId }
        });
      }
    });
    if (!isEnd && streaming) {
      log5.info("streaming end success");
      if (messageResult === "") {
        sendLarkBotMessageInBgScript(
          "[API] response empty string.",
          JSON.stringify(
            {
              model: postBody.model_name,
              promptTextLength: postBody.message_content.length
            },
            null,
            2
          ),
          {
            uuid: "6f02f533-def6-4696-b14e-1b00c2d9a4df"
          }
        );
        onMessage && onMessage({
          done: true,
          type: "error",
          error: "Something went wrong, please try again. If this issue persists, contact us via email.",
          data: { text: "", conversationId }
        });
      } else {
        isEnd = true;
      }
    }
    if (isTokenExpired) {
      log5.info("user token expired");
      this.status = "needAuth";
      await logoutUseChatGPTAuth();
      await this.updateClientStatus();
    }
  }
  async abortTask(taskId) {
    if (this.taskList[taskId]) {
      this.taskList[taskId]();
      delete this.taskList[taskId];
      return true;
    }
    return true;
  }
  async destroy() {
    log5.info("destroy");
    this.status = "needAuth";
    this.active = false;
  }
  async getToken() {
    return await getUseChatGPTAccessToken();
  }
  async updateClientStatus() {
    if (this.active) {
    }
  }
};

// src/background/src/chat/GeminiChat/utils.ts
function extractFromHTML2(variableName, html) {
  const regex = new RegExp(`"${variableName}":"([^"]+)"`);
  const match = regex.exec(html);
  return match == null ? void 0 : match[1];
}
var fetchGeminiRequestParams = async () => {
  try {
    const html = await ofetch("https://gemini.google.com/faq", {
      cache: "reload"
    });
    const atValue = extractFromHTML2("SNlM0e", html);
    const blValue = extractFromHTML2("cfb2h", html);
    return { atValue, blValue };
  } catch (error) {
    return { atValue: null, blValue: null };
  }
};
var parseGeminiResponse = (resp) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  try {
    const dataList = resp.split("\n").filter((str) => str.startsWith(`[["wrb.fr"`)) || [];
    let payload;
    for (let dataStr of dataList) {
      const data = JSON.parse(dataStr);
      const itemPayload = JSON.parse((_a = data == null ? void 0 : data[0]) == null ? void 0 : _a[2]);
      if ((_d = (_c = (_b = itemPayload == null ? void 0 : itemPayload[4]) == null ? void 0 : _b[0]) == null ? void 0 : _c[1]) == null ? void 0 : _d[0]) {
        payload = itemPayload;
        break;
      }
    }
    if (!payload) {
      return {
        text: "",
        error: "Please log into [gemini.google.com](https://gemini.google.com) and try again.",
        ids: ["", "", ""]
      };
    }
    let text = payload[4][0][1][0];
    const images = ((_h = (_g = (_f = (_e = payload == null ? void 0 : payload[4]) == null ? void 0 : _e[0]) == null ? void 0 : _f[12]) == null ? void 0 : _g[7]) == null ? void 0 : _h[0]) || [];
    const imageTextHistory = [];
    if (images.length > 0) {
      images.map((image) => {
        var _a2, _b2, _c2;
        const imageUrl = (_b2 = (_a2 = image == null ? void 0 : image[0]) == null ? void 0 : _a2[3]) == null ? void 0 : _b2[3];
        const imageText = (_c2 = image == null ? void 0 : image[1]) == null ? void 0 : _c2[0];
        if (imageUrl && imageText && !imageTextHistory.includes(imageText)) {
          imageTextHistory.push(imageText);
          text = text.replace(imageText, `!${imageText}(${imageUrl})`);
        } else {
          text += `!${imageText}(${imageUrl})`;
        }
      });
    }
    return {
      text,
      error: "",
      ids: [...payload[1], payload[4][0][0]]
    };
  } catch (e) {
    return {
      text: "",
      error: `Something went wrong. Please try again.`,
      ids: ["", "", ""]
    };
  }
};

// src/background/src/chat/GeminiChat/index.ts
function generateReqId2() {
  return Math.floor(Math.random() * 9e5) + 1e5;
}
var GeminiChat = class extends BaseChat_default {
  constructor() {
    super("GeminiChat");
    __publicField(this, "token");
    __publicField(this, "contextIds", ["", "", ""]);
    __publicField(this, "conversationId");
    this.token = void 0;
  }
  async checkAuth() {
    this.active = true;
  }
  async auth() {
    this.active = true;
  }
  async askChatGPT(question, options, onMessage) {
    if (!this.conversationId) {
      this.conversationId = v4_default();
    }
    const {
      taskId
      // include_history = false,
      // streaming = true,
      // regenerate = false,
      // max_history_message_cnt = 0,
    } = options || {};
    const controller = new AbortController();
    const signal = controller.signal;
    let isAbort = false;
    if (taskId) {
      this.taskList[taskId] = () => controller.abort();
    }
    if (!await this.syncGeminiToken() || !this.token) {
      onMessage && onMessage({
        type: "error",
        error: "UNAUTHORIZED",
        done: true,
        data: { text: "", conversationId: "" }
      });
      return;
    }
    try {
      if (!this.active) {
        return;
      }
      const result = await ofetch(
        "https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate",
        {
          method: "POST",
          signal,
          query: {
            bl: this.token.blValue,
            _reqid: generateReqId2(),
            rt: "c"
          },
          body: new URLSearchParams({
            at: this.token.atValue,
            "f.req": JSON.stringify([
              null,
              `[[${JSON.stringify(question)}],null,${JSON.stringify(
                this.contextIds
              )}]`
            ])
          }),
          parseResponse: (txt) => txt
        }
      ).catch((err) => {
        if (err == null ? void 0 : err.message.includes("The user aborted a request.")) {
          isAbort = true;
          onMessage && onMessage({
            type: "error",
            error: "manual aborted request.",
            done: true,
            data: { text: "", conversationId: "" }
          });
          return;
        }
      });
      const { text, ids, error } = parseGeminiResponse(result);
      this.log.debug("result", result, text, ids);
      if (ids) {
        this.conversationId = ids[0].replace("c_", "");
        if (isAbort) {
          return;
        }
        if (error) {
          onMessage && onMessage({
            type: "message",
            done: true,
            error,
            data: {
              text: "",
              conversationId: this.conversationId || ""
            }
          });
        } else if (text) {
          onMessage && onMessage({
            type: "message",
            done: false,
            error: "",
            data: {
              text,
              conversationId: this.conversationId || ""
            }
          });
          onMessage && onMessage({
            type: "message",
            done: true,
            error: "",
            data: {
              text,
              conversationId: this.conversationId || ""
            }
          });
          this.contextIds = ids;
        }
      } else {
        onMessage && onMessage({
          type: "error",
          done: true,
          error: "GeminiChat: Unknown Error",
          data: {
            text: "",
            conversationId: this.conversationId
          }
        });
      }
    } catch (e) {
      this.log.error(e);
    }
  }
  async syncGeminiToken() {
    try {
      const { atValue, blValue } = await fetchGeminiRequestParams();
      if (!atValue || !blValue) {
        this.token = void 0;
        return false;
      }
      this.token = { atValue, blValue };
      return true;
    } catch (error) {
      return false;
    }
  }
  reset() {
    this.conversationId = "";
    this.contextIds = ["", "", ""];
  }
  /**
   * 删除conversation，根据传入的conversationID
   * @param conversationId
   */
  async removeConversation(conversationId) {
    if (conversationId && this.token) {
      const result = await ofetch(
        "https://gemini.google.com/_/BardChatUi/data/batchexecute",
        {
          method: "POST",
          query: {
            rpcids: "GzXR5e",
            bl: this.token.blValue,
            _reqid: generateReqId2(),
            rt: "c",
            "source-path": "/app"
          },
          body: new URLSearchParams({
            at: this.token.atValue,
            "f.req": JSON.stringify([
              [["GzXR5e", `["c_${conversationId}"]`, null, "generic"]]
            ])
          }),
          parseResponse: (txt) => txt
        }
      ).catch((err) => {
      });
    }
  }
};

// src/background/src/chat/ClaudeChat/claude/api.ts
var getClaudeOrganizationId = async () => {
  var _a;
  try {
    const response = await fetch("https://claude.ai/api/organizations", {
      redirect: "error",
      cache: "no-cache"
    });
    const organization = await response.json();
    return (_a = organization == null ? void 0 : organization[0]) == null ? void 0 : _a.uuid;
  } catch (e) {
    return "";
  }
};
var createClaudeConversation = async (organizationId, name) => {
  try {
    if (!organizationId) {
      return void 0;
    }
    const conversationId = v4_default();
    const response = await fetch(
      `https://claude.ai/api/organizations/${organizationId}/chat_conversations`,
      {
        method: "POST",
        // or 'PUT
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name || "",
          uuid: conversationId
        })
      }
    );
    if (response.status === 201 || response.status === 200) {
      const body = await response.json();
      if (body.uuid) {
        return body;
      }
      return void 0;
    } else {
      return void 0;
    }
  } catch (e) {
    return void 0;
  }
};
var getAllClaudeConversations = async (organizationId) => {
  try {
    const response = await fetch(
      `https://claude.ai/api/organizations/${organizationId}/chat_conversations`,
      {
        method: "GET"
      }
    );
    if (response.status === 200) {
      const body = await response.json();
      if (body.length) {
        return body;
      }
      return [];
    }
    return [];
  } catch (e) {
    return [];
  }
};
var removeAllCacheClaudeConversation = async (organizationId, conversationName) => {
  let allClaudeConversations = await getAllClaudeConversations(organizationId);
  allClaudeConversations = allClaudeConversations.filter(
    (conversation) => conversation.name === conversationName
  );
  let deleteConversationIdGroup = [];
  while (allClaudeConversations.length) {
    deleteConversationIdGroup = allClaudeConversations.splice(0, 5).map((conversation) => conversation.uuid);
    await Promise.all(
      deleteConversationIdGroup.map(
        (conversationId) => deleteClaudeConversation(organizationId, conversationId)
      )
    );
    await new Promise((resolve) => setTimeout(resolve, 5e3));
  }
};
var deleteClaudeConversation = async (organizationId, conversationId) => {
  try {
    const response = await fetch(
      `https://claude.ai/api/organizations/${organizationId}/chat_conversations/${conversationId}`,
      {
        method: "DELETE"
      }
    );
    if (response.status === 204 || response.status === 200) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
var uploadClaudeAttachment = async (organizationId, file, fileName) => {
  const formData = new FormData();
  formData.append("file", file, fileName || (file == null ? void 0 : file.name) || "");
  formData.append("orgUuid", organizationId);
  const response = await fetch("https://claude.ai/api/convert_document", {
    method: "POST",
    body: formData
  });
  if (response.status === 200) {
    const body = await response.json();
    if (body.extracted_content) {
      body.file_name = fileName || (file == null ? void 0 : file.name) || body.file_name || "";
      return {
        success: true,
        data: body,
        error: ""
      };
    }
  }
  let errorMessage = "Upload failed.";
  if (response.status === 429) {
    errorMessage = "Exceeded file upload rate limit";
  }
  return {
    success: false,
    data: void 0,
    error: errorMessage
  };
};

// src/background/src/chat/ClaudeChat/claude/index.ts
var Claude = class {
  constructor(organizationId) {
    __publicField(this, "conversation");
    __publicField(this, "abortController");
    __publicField(this, "organizationId");
    __publicField(this, "attachments", []);
    this.organizationId = organizationId;
  }
  get conversationId() {
    var _a;
    return (_a = this.conversation) == null ? void 0 : _a.uuid;
  }
  async createConversation(name) {
    var _a;
    if (!this.organizationId) {
      this.organizationId = await getClaudeOrganizationId();
    }
    if (this.organizationId) {
      this.conversation = await createClaudeConversation(
        this.organizationId,
        name
      );
    }
    return ((_a = this.conversation) == null ? void 0 : _a.uuid) || "";
  }
  async sendMessage(text, options) {
    var _a;
    const { regenerate = false, onMessage } = options || {};
    let conversationId = (_a = this.conversation) == null ? void 0 : _a.uuid;
    if (!conversationId || !this.organizationId) {
      conversationId = await this.createConversation();
      if (!conversationId || !this.organizationId) {
        onMessage == null ? void 0 : onMessage({
          completion: "",
          log_id: "",
          messageLimit: {
            type: "within_limit"
          },
          model: "",
          stop: true,
          // stop_reason:
          //   'Please log into [Claude.ai](https://claude.ai/chats) and try again.',
          stop_reason: "UNAUTHORIZED"
        });
        return;
      }
      return;
    }
    this.abortController = new AbortController();
    const signal = this.abortController.signal;
    const apiHost = regenerate ? `https://claude.ai/api/organizations/${this.organizationId}/chat_conversations/${conversationId}/retry_completion` : `https://claude.ai/api/organizations/${this.organizationId}/chat_conversations/${conversationId}/completion`;
    if (regenerate) {
      text = "";
    }
    await fetchSSE(apiHost, {
      signal,
      method: "POST",
      // provider: 'CLAUDE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        attachments: this.attachments.map((attachment) => {
          const originalAttachment = cloneDeep_default(attachment);
          delete originalAttachment.id;
          return originalAttachment;
        }),
        files: [],
        //暂时不知道 claude 这个字段是干什么的
        // model: CLAUDE_MODELS[0].value, // claude升级不需要这个参数了
        prompt: text,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }),
      onMessage: (message) => {
        try {
          const data = JSON.parse(message);
          if (data.log_id) {
            onMessage == null ? void 0 : onMessage(data);
          }
        } catch (e) {
        }
      }
    }).then(() => {
    }).catch((err) => {
      var _a2;
      if ((err == null ? void 0 : err.message.includes("The user aborted a request.")) || (err == null ? void 0 : err.message.includes("BodyStreamBuffer was aborted"))) {
        onMessage == null ? void 0 : onMessage({
          completion: "",
          log_id: "",
          messageLimit: {
            type: "within_limit"
          },
          model: "",
          stop: true,
          stop_reason: "The user aborted a request."
        });
        return;
      }
      try {
        const errorData = JSON.parse(err.message);
        const errorMessage = ((_a2 = errorData == null ? void 0 : errorData.error) == null ? void 0 : _a2.message) || (errorData == null ? void 0 : errorData.message) || "Network Error";
        onMessage == null ? void 0 : onMessage({
          completion: "",
          log_id: "",
          messageLimit: {
            type: "within_limit"
          },
          model: "",
          stop: true,
          stop_reason: errorMessage
        });
      } catch (e) {
        onMessage == null ? void 0 : onMessage({
          completion: "",
          log_id: "",
          messageLimit: {
            type: "within_limit"
          },
          model: "",
          stop: true,
          stop_reason: "Network Error"
        });
      }
    });
    this.resetAttachments();
  }
  abortSendMessage() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
  }
  async resetConversation() {
    var _a;
    if (((_a = this.conversation) == null ? void 0 : _a.uuid) && this.organizationId) {
      const result = await deleteClaudeConversation(
        this.organizationId,
        this.conversation.uuid
      );
    }
    this.conversation = void 0;
    return true;
  }
  async uploadAttachment(file, fileName) {
    if (!this.organizationId) {
      this.organizationId = await getClaudeOrganizationId();
      if (!this.organizationId) {
        return {
          success: false,
          error: "organization id not found",
          data: void 0
        };
      }
    }
    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        error: "file size too large",
        data: void 0
      };
    }
    const attachmentResult = await uploadClaudeAttachment(
      this.organizationId,
      file,
      fileName || file.name
    );
    if (attachmentResult.success && attachmentResult.data) {
      const attachment = attachmentResult.data;
      attachment.id = v4_default();
      this.attachments.push(attachment);
      return {
        success: true,
        error: void 0,
        data: attachment
      };
    } else {
      return {
        success: false,
        error: attachmentResult.error || "Upload failed.",
        data: void 0
      };
    }
  }
  resetAttachments() {
    this.attachments = [];
    return true;
  }
  removeAttachment(attachmentId) {
    const index = this.attachments.findIndex(
      (attachment) => attachment.id === attachmentId
    );
    if (index > -1) {
      this.attachments.splice(index, 1);
    }
    return true;
  }
};

// src/background/src/chat/ClaudeChat/index.ts
var import_webextension_polyfill7 = __toESM(require_browser_polyfill());
var cacheTokenKey = "CHROME_EXTENSION_LOCAL_STORAGE_CLAUDE_TOKEN_KEY";
var CLAUDE_CONVERSATION_NAME = "WebChatGPT";
var ClaudeChat = class extends BaseChat_default {
  constructor() {
    super("ClaudeChat");
    __publicField(this, "claude");
    this.claude = new Claude();
    this.status = "success";
  }
  async init() {
    this.log.info("init");
  }
  async preAuth() {
    this.active = true;
    const cache = await import_webextension_polyfill7.default.storage.local.get(cacheTokenKey);
    if (cache[cacheTokenKey]) {
      this.claude.organizationId = cache[cacheTokenKey];
    }
    this.status = this.claude.organizationId ? "success" : "needAuth";
  }
  async auth() {
    this.active = true;
    this.claude.organizationId = await getClaudeOrganizationId();
    if (this.claude.organizationId) {
      this.status = "success";
      await import_webextension_polyfill7.default.storage.local.set({
        [cacheTokenKey]: this.claude.organizationId
      });
      await this.updateClientStatus("success");
    } else {
    }
  }
  async createConversation() {
    if (this.claude.conversationId) {
      return this.claude.conversationId;
    }
    const conversationId = await this.claude.createConversation(
      CLAUDE_CONVERSATION_NAME
    );
    if (this.claude.organizationId) {
      await import_webextension_polyfill7.default.storage.local.set({
        [cacheTokenKey]: this.claude.organizationId
      });
    } else {
      await import_webextension_polyfill7.default.storage.local.remove(cacheTokenKey);
      this.status = "needAuth";
      await this.updateClientStatus("needAuth");
    }
    return conversationId;
  }
  async askChatGPT(question, options, onMessage) {
    const { regenerate } = options || {};
    let partOfMessageText = "";
    this.log.info("ClaudeChat send");
    await this.claude.sendMessage(question, {
      regenerate,
      onMessage: (claudeMessage) => {
        if (!claudeMessage.stop) {
          partOfMessageText += claudeMessage.completion || "";
          onMessage == null ? void 0 : onMessage({
            type: "message",
            done: false,
            error: "",
            data: {
              text: partOfMessageText,
              conversationId: this.claude.conversationId
            }
          });
        } else {
          if (claudeMessage.stop_reason === "stop_sequence") {
            onMessage == null ? void 0 : onMessage({
              type: "message",
              done: true,
              error: "",
              data: {
                text: partOfMessageText,
                conversationId: this.claude.conversationId
              }
            });
          } else if (claudeMessage.stop_reason === "The user aborted a request.") {
            onMessage == null ? void 0 : onMessage({
              type: "error",
              error: "manual aborted request.",
              done: true,
              data: { text: "", conversationId: this.claude.conversationId }
            });
          } else {
            onMessage == null ? void 0 : onMessage({
              type: "error",
              done: true,
              error: claudeMessage.stop_reason || "Network Error",
              data: {
                text: partOfMessageText,
                conversationId: this.claude.conversationId
              }
            });
          }
        }
      }
    });
  }
  async abortTask(taskId) {
    this.claude.abortSendMessage();
    return true;
  }
  async removeConversation(conversationId) {
    await this.claude.resetConversation();
    if (this.claude.organizationId) {
      removeAllCacheClaudeConversation(
        this.claude.organizationId,
        CLAUDE_CONVERSATION_NAME
      ).then().catch();
    }
    return;
  }
};

// src/features/shortcuts/utils/webHelper.ts
var import_readability = __toESM(require_readability());

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/symbols.js
var CHANGED = Symbol("changed");
var CLASS_LIST = Symbol("classList");
var CUSTOM_ELEMENTS = Symbol("CustomElements");
var CONTENT = Symbol("content");
var DATASET = Symbol("dataset");
var DOCTYPE = Symbol("doctype");
var DOM_PARSER = Symbol("DOMParser");
var END = Symbol("end");
var EVENT_TARGET = Symbol("EventTarget");
var GLOBALS = Symbol("globals");
var IMAGE = Symbol("image");
var MIME = Symbol("mime");
var MUTATION_OBSERVER = Symbol("MutationObserver");
var NEXT = Symbol("next");
var OWNER_ELEMENT = Symbol("ownerElement");
var PREV = Symbol("prev");
var PRIVATE = Symbol("private");
var SHEET = Symbol("sheet");
var START = Symbol("start");
var STYLE = Symbol("style");
var UPGRADE = Symbol("upgrade");
var VALUE = Symbol("value");

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/constants.js
var NODE_END = -1;
var ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = 2;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = 11;
var BLOCK_ELEMENTS = /* @__PURE__ */ new Set(["ARTICLE", "ASIDE", "BLOCKQUOTE", "BODY", "BR", "BUTTON", "CANVAS", "CAPTION", "COL", "COLGROUP", "DD", "DIV", "DL", "DT", "EMBED", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "UL", "OL", "P"]);
var SHOW_ALL = -1;
var SHOW_ELEMENT = 1;
var SHOW_TEXT = 4;
var SHOW_COMMENT = 128;
var DOCUMENT_POSITION_DISCONNECTED = 1;
var DOCUMENT_POSITION_PRECEDING = 2;
var DOCUMENT_POSITION_FOLLOWING = 4;
var DOCUMENT_POSITION_CONTAINS = 8;
var DOCUMENT_POSITION_CONTAINED_BY = 16;
var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/object.js
var {
  assign,
  create,
  defineProperties,
  entries,
  getOwnPropertyDescriptors,
  keys,
  setPrototypeOf
} = Object;

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/utils.js
var $String = String;
var getEnd = (node) => node.nodeType === ELEMENT_NODE ? node[END] : node;
var ignoreCase = ({ ownerDocument }) => ownerDocument[MIME].ignoreCase;
var knownAdjacent = (prev, next) => {
  prev[NEXT] = next;
  next[PREV] = prev;
};
var knownBoundaries = (prev, current, next) => {
  knownAdjacent(prev, current);
  knownAdjacent(getEnd(current), next);
};
var knownSegment = (prev, start, end, next) => {
  knownAdjacent(prev, start);
  knownAdjacent(getEnd(end), next);
};
var knownSiblings = (prev, current, next) => {
  knownAdjacent(prev, current);
  knownAdjacent(current, next);
};
var localCase = ({ localName, ownerDocument }) => {
  return ownerDocument[MIME].ignoreCase ? localName.toUpperCase() : localName;
};
var setAdjacent = (prev, next) => {
  if (prev)
    prev[NEXT] = next;
  if (next)
    next[PREV] = prev;
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/shadow-roots.js
var shadowRoots = /* @__PURE__ */ new WeakMap();

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/custom-element-registry.js
var reactive = false;
var Classes = /* @__PURE__ */ new WeakMap();
var customElements = /* @__PURE__ */ new WeakMap();
var attributeChangedCallback = (element, attributeName, oldValue, newValue) => {
  if (reactive && customElements.has(element) && element.attributeChangedCallback && element.constructor.observedAttributes.includes(attributeName)) {
    element.attributeChangedCallback(attributeName, oldValue, newValue);
  }
};
var createTrigger = (method, isConnected2) => (element) => {
  if (customElements.has(element)) {
    const info = customElements.get(element);
    if (info.connected !== isConnected2 && element.isConnected === isConnected2) {
      info.connected = isConnected2;
      if (method in element)
        element[method]();
    }
  }
};
var triggerConnected = createTrigger("connectedCallback", true);
var connectedCallback = (element) => {
  if (reactive) {
    triggerConnected(element);
    if (shadowRoots.has(element))
      element = shadowRoots.get(element).shadowRoot;
    let { [NEXT]: next, [END]: end } = element;
    while (next !== end) {
      if (next.nodeType === ELEMENT_NODE)
        triggerConnected(next);
      next = next[NEXT];
    }
  }
};
var triggerDisconnected = createTrigger("disconnectedCallback", false);
var disconnectedCallback = (element) => {
  if (reactive) {
    triggerDisconnected(element);
    if (shadowRoots.has(element))
      element = shadowRoots.get(element).shadowRoot;
    let { [NEXT]: next, [END]: end } = element;
    while (next !== end) {
      if (next.nodeType === ELEMENT_NODE)
        triggerDisconnected(next);
      next = next[NEXT];
    }
  }
};
var CustomElementRegistry = class {
  /**
   * @param {Document} ownerDocument
   */
  constructor(ownerDocument) {
    this.ownerDocument = ownerDocument;
    this.registry = /* @__PURE__ */ new Map();
    this.waiting = /* @__PURE__ */ new Map();
    this.active = false;
  }
  /**
   * @param {string} localName the custom element definition name
   * @param {Function} Class the custom element **Class** definition
   * @param {object?} options the optional object with an `extends` property
   */
  define(localName, Class, options = {}) {
    const { ownerDocument, registry, waiting } = this;
    if (registry.has(localName))
      throw new Error("unable to redefine " + localName);
    if (Classes.has(Class))
      throw new Error("unable to redefine the same class: " + Class);
    this.active = reactive = true;
    const { extends: extend } = options;
    Classes.set(Class, {
      ownerDocument,
      options: { is: extend ? localName : "" },
      localName: extend || localName
    });
    const check = extend ? (element) => {
      return element.localName === extend && element.getAttribute("is") === localName;
    } : (element) => element.localName === localName;
    registry.set(localName, { Class, check });
    if (waiting.has(localName)) {
      for (const resolve of waiting.get(localName))
        resolve(Class);
      waiting.delete(localName);
    }
    ownerDocument.querySelectorAll(
      extend ? `${extend}[is="${localName}"]` : localName
    ).forEach(this.upgrade, this);
  }
  /**
   * @param {Element} element
   */
  upgrade(element) {
    if (customElements.has(element))
      return;
    const { ownerDocument, registry } = this;
    const ce = element.getAttribute("is") || element.localName;
    if (registry.has(ce)) {
      const { Class, check } = registry.get(ce);
      if (check(element)) {
        const { attributes, isConnected: isConnected2 } = element;
        for (const attr of attributes)
          element.removeAttributeNode(attr);
        const values = entries(element);
        for (const [key2] of values)
          delete element[key2];
        setPrototypeOf(element, Class.prototype);
        ownerDocument[UPGRADE] = { element, values };
        new Class(ownerDocument, ce);
        customElements.set(element, { connected: isConnected2 });
        for (const attr of attributes)
          element.setAttributeNode(attr);
        if (isConnected2 && element.connectedCallback)
          element.connectedCallback();
      }
    }
  }
  /**
   * @param {string} localName the custom element definition name
   */
  whenDefined(localName) {
    const { registry, waiting } = this;
    return new Promise((resolve) => {
      if (registry.has(localName))
        resolve(registry.get(localName).Class);
      else {
        if (!waiting.has(localName))
          waiting.set(localName, []);
        waiting.get(localName).push(resolve);
      }
    });
  }
  /**
   * @param {string} localName the custom element definition name
   * @returns {Function?} the custom element **Class**, if any
   */
  get(localName) {
    const info = this.registry.get(localName);
    return info && info.Class;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/parse-from-string.js
var { Parser } = esm_exports;
var notParsing = true;
var append = (self2, node, active) => {
  const end = self2[END];
  node.parentNode = self2;
  knownBoundaries(end[PREV], node, end);
  if (active && node.nodeType === ELEMENT_NODE)
    connectedCallback(node);
  return node;
};
var attribute = (element, end, attribute2, value, active) => {
  attribute2[VALUE] = value;
  attribute2.ownerElement = element;
  knownSiblings(end[PREV], attribute2, end);
  if (attribute2.name === "class")
    element.className = value;
  if (active)
    attributeChangedCallback(element, attribute2.name, null, value);
};
var parseFromString = (document, isHTML, markupLanguage) => {
  const { active, registry } = document[CUSTOM_ELEMENTS];
  let node = document;
  let ownerSVGElement = null;
  notParsing = false;
  const content = new Parser({
    // <!DOCTYPE ...>
    onprocessinginstruction(name, data) {
      if (name.toLowerCase() === "!doctype")
        document.doctype = data.slice(name.length).trim();
    },
    // <tagName>
    onopentag(name, attributes) {
      let create3 = true;
      if (isHTML) {
        if (ownerSVGElement) {
          node = append(node, document.createElementNS(SVG_NAMESPACE, name), active);
          node.ownerSVGElement = ownerSVGElement;
          create3 = false;
        } else if (name === "svg" || name === "SVG") {
          ownerSVGElement = document.createElementNS(SVG_NAMESPACE, name);
          node = append(node, ownerSVGElement, active);
          create3 = false;
        } else if (active) {
          const ce = name.includes("-") ? name : attributes.is || "";
          if (ce && registry.has(ce)) {
            const { Class } = registry.get(ce);
            node = append(node, new Class(), active);
            delete attributes.is;
            create3 = false;
          }
        }
      }
      if (create3)
        node = append(node, document.createElement(name), false);
      let end = node[END];
      for (const name2 of keys(attributes))
        attribute(node, end, document.createAttribute(name2), attributes[name2], active);
    },
    // #text, #comment
    oncomment(data) {
      append(node, document.createComment(data), active);
    },
    ontext(text) {
      append(node, document.createTextNode(text), active);
    },
    // </tagName>
    onclosetag() {
      if (isHTML && node === ownerSVGElement)
        ownerSVGElement = null;
      node = node.parentNode;
    }
  }, {
    lowerCaseAttributeNames: false,
    decodeEntities: true,
    xmlMode: !isHTML
  });
  content.write(markupLanguage);
  content.end();
  notParsing = true;
  return document;
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/register-html-class.js
var htmlClasses = /* @__PURE__ */ new Map();
var registerHTMLClass = (names, Class) => {
  for (const name of [].concat(names)) {
    htmlClasses.set(name, Class);
    htmlClasses.set(name.toUpperCase(), Class);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/document.js
var import_perf_hooks = __toESM(require_perf_hooks(), 1);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/jsdon.js
var loopSegment = ({ [NEXT]: next, [END]: end }, json) => {
  while (next !== end) {
    switch (next.nodeType) {
      case ATTRIBUTE_NODE:
        attrAsJSON(next, json);
        break;
      case TEXT_NODE:
      case COMMENT_NODE:
        characterDataAsJSON(next, json);
        break;
      case ELEMENT_NODE:
        elementAsJSON(next, json);
        next = getEnd(next);
        break;
      case DOCUMENT_TYPE_NODE:
        documentTypeAsJSON(next, json);
        break;
    }
    next = next[NEXT];
  }
  const last = json.length - 1;
  const value = json[last];
  if (typeof value === "number" && value < 0)
    json[last] += NODE_END;
  else
    json.push(NODE_END);
};
var attrAsJSON = (attr, json) => {
  json.push(ATTRIBUTE_NODE, attr.name);
  const value = attr[VALUE].trim();
  if (value)
    json.push(value);
};
var characterDataAsJSON = (node, json) => {
  const value = node[VALUE];
  if (value.trim())
    json.push(node.nodeType, value);
};
var nonElementAsJSON = (node, json) => {
  json.push(node.nodeType);
  loopSegment(node, json);
};
var documentTypeAsJSON = ({ name, publicId, systemId }, json) => {
  json.push(DOCUMENT_TYPE_NODE, name);
  if (publicId)
    json.push(publicId);
  if (systemId)
    json.push(systemId);
};
var elementAsJSON = (element, json) => {
  json.push(ELEMENT_NODE, element.localName);
  loopSegment(element, json);
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/mutation-observer.js
var createRecord = (type, target, addedNodes, removedNodes, attributeName, oldValue) => ({ type, target, addedNodes, removedNodes, attributeName, oldValue });
var queueAttribute = (observer, target, attributeName, attributeFilter, attributeOldValue, oldValue) => {
  if (!attributeFilter || attributeFilter.includes(attributeName)) {
    const { callback, records, scheduled } = observer;
    records.push(createRecord(
      "attributes",
      target,
      [],
      [],
      attributeName,
      attributeOldValue ? oldValue : void 0
    ));
    if (!scheduled) {
      observer.scheduled = true;
      Promise.resolve().then(() => {
        observer.scheduled = false;
        callback(records.splice(0), observer);
      });
    }
  }
};
var attributeChangedCallback2 = (element, attributeName, oldValue) => {
  const { ownerDocument } = element;
  const { active, observers } = ownerDocument[MUTATION_OBSERVER];
  if (active) {
    for (const observer of observers) {
      for (const [
        target,
        {
          childList,
          subtree,
          attributes,
          attributeFilter,
          attributeOldValue
        }
      ] of observer.nodes) {
        if (childList) {
          if (subtree && (target === ownerDocument || target.contains(element)) || !subtree && target.children.includes(element)) {
            queueAttribute(
              observer,
              element,
              attributeName,
              attributeFilter,
              attributeOldValue,
              oldValue
            );
            break;
          }
        } else if (attributes && target === element) {
          queueAttribute(
            observer,
            element,
            attributeName,
            attributeFilter,
            attributeOldValue,
            oldValue
          );
          break;
        }
      }
    }
  }
};
var moCallback = (element, parentNode) => {
  const { ownerDocument } = element;
  const { active, observers } = ownerDocument[MUTATION_OBSERVER];
  if (active) {
    for (const observer of observers) {
      for (const [target, { subtree, childList, characterData }] of observer.nodes) {
        if (childList) {
          if (parentNode && (target === parentNode || subtree && target.contains(parentNode)) || !parentNode && (subtree && (target === ownerDocument || target.contains(element)) || !subtree && target[characterData ? "childNodes" : "children"].includes(element))) {
            const { callback, records, scheduled } = observer;
            records.push(createRecord(
              "childList",
              target,
              parentNode ? [] : [element],
              parentNode ? [element] : []
            ));
            if (!scheduled) {
              observer.scheduled = true;
              Promise.resolve().then(() => {
                observer.scheduled = false;
                callback(records.splice(0), observer);
              });
            }
            break;
          }
        }
      }
    }
  }
};
var MutationObserverClass = class {
  constructor(ownerDocument) {
    const observers = /* @__PURE__ */ new Set();
    this.observers = observers;
    this.active = false;
    this.class = class MutationObserver {
      constructor(callback) {
        this.callback = callback;
        this.nodes = /* @__PURE__ */ new Map();
        this.records = [];
        this.scheduled = false;
      }
      disconnect() {
        this.records.splice(0);
        this.nodes.clear();
        observers.delete(this);
        ownerDocument[MUTATION_OBSERVER].active = !!observers.size;
      }
      /**
       * @param {Element} target
       * @param {MutationObserverInit} options
       */
      observe(target, options = {
        subtree: false,
        childList: false,
        attributes: false,
        attributeFilter: null,
        attributeOldValue: false,
        characterData: false
        // TODO: not implemented yet
        // characterDataOldValue: false
      }) {
        if ("attributeOldValue" in options || "attributeFilter" in options)
          options.attributes = true;
        options.childList = !!options.childList;
        options.subtree = !!options.subtree;
        this.nodes.set(target, options);
        observers.add(this);
        ownerDocument[MUTATION_OBSERVER].active = true;
      }
      /**
       * @returns {MutationRecord[]}
       */
      takeRecords() {
        return this.records.splice(0);
      }
    };
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/attributes.js
var emptyAttributes = /* @__PURE__ */ new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "class",
  "contenteditable",
  "controls",
  "default",
  "defer",
  "disabled",
  "draggable",
  "formnovalidate",
  "hidden",
  "id",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
  "style",
  "truespeed"
]);
var setAttribute = (element, attribute2) => {
  const { [VALUE]: value, name } = attribute2;
  attribute2.ownerElement = element;
  knownSiblings(element, attribute2, element[NEXT]);
  if (name === "class")
    element.className = value;
  attributeChangedCallback2(element, name, null);
  attributeChangedCallback(element, name, null, value);
};
var removeAttribute = (element, attribute2) => {
  const { [VALUE]: value, name } = attribute2;
  knownAdjacent(attribute2[PREV], attribute2[NEXT]);
  attribute2.ownerElement = attribute2[PREV] = attribute2[NEXT] = null;
  if (name === "class")
    element[CLASS_LIST] = null;
  attributeChangedCallback2(element, name, value);
  attributeChangedCallback(element, name, value, null);
};
var booleanAttribute = {
  get(element, name) {
    return element.hasAttribute(name);
  },
  set(element, name, value) {
    if (value)
      element.setAttribute(name, "");
    else
      element.removeAttribute(name);
  }
};
var numericAttribute = {
  get(element, name) {
    return parseFloat(element.getAttribute(name) || 0);
  },
  set(element, name, value) {
    element.setAttribute(name, value);
  }
};
var stringAttribute = {
  get(element, name) {
    return element.getAttribute(name) || "";
  },
  set(element, name, value) {
    element.setAttribute(name, value);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/event-target.js
var wm = /* @__PURE__ */ new WeakMap();
function dispatch(event, listener) {
  if (typeof listener === "function")
    listener.call(event.target, event);
  else
    listener.handleEvent(event);
  return event._stopImmediatePropagationFlag;
}
function invokeListeners({ currentTarget, target }) {
  const map = wm.get(currentTarget);
  if (map && map.has(this.type)) {
    const listeners = map.get(this.type);
    if (currentTarget === target) {
      this.eventPhase = this.AT_TARGET;
    } else {
      this.eventPhase = this.BUBBLING_PHASE;
    }
    this.currentTarget = currentTarget;
    this.target = target;
    for (const [listener, options] of listeners) {
      if (options && options.once)
        listeners.delete(listener);
      if (dispatch(this, listener))
        break;
    }
    delete this.currentTarget;
    delete this.target;
    return this.cancelBubble;
  }
}
var DOMEventTarget = class {
  constructor() {
    wm.set(this, /* @__PURE__ */ new Map());
  }
  /**
   * @protected
   */
  _getParent() {
    return null;
  }
  addEventListener(type, listener, options) {
    const map = wm.get(this);
    if (!map.has(type))
      map.set(type, /* @__PURE__ */ new Map());
    map.get(type).set(listener, options);
  }
  removeEventListener(type, listener) {
    const map = wm.get(this);
    if (map.has(type)) {
      const listeners = map.get(type);
      if (listeners.delete(listener) && !listeners.size)
        map.delete(type);
    }
  }
  dispatchEvent(event) {
    let node = this;
    event.eventPhase = event.CAPTURING_PHASE;
    while (node) {
      if (node.dispatchEvent)
        event._path.push({ currentTarget: node, target: this });
      node = event.bubbles && node._getParent && node._getParent();
    }
    event._path.some(invokeListeners, event);
    event._path = [];
    event.eventPhase = event.NONE;
    return !event.defaultPrevented;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/node-list.js
var NodeList = class extends Array {
  item(i) {
    return i < this.length ? this[i] : null;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/node.js
var getParentNodeCount = ({ parentNode }) => {
  let count = 0;
  while (parentNode) {
    count++;
    parentNode = parentNode.parentNode;
  }
  return count;
};
var Node = class extends DOMEventTarget {
  static get ELEMENT_NODE() {
    return ELEMENT_NODE;
  }
  static get ATTRIBUTE_NODE() {
    return ATTRIBUTE_NODE;
  }
  static get TEXT_NODE() {
    return TEXT_NODE;
  }
  static get COMMENT_NODE() {
    return COMMENT_NODE;
  }
  static get DOCUMENT_NODE() {
    return DOCUMENT_NODE;
  }
  static get DOCUMENT_FRAGMENT_NODE() {
    return DOCUMENT_FRAGMENT_NODE;
  }
  static get DOCUMENT_TYPE_NODE() {
    return DOCUMENT_TYPE_NODE;
  }
  constructor(ownerDocument, localName, nodeType) {
    super();
    this.ownerDocument = ownerDocument;
    this.localName = localName;
    this.nodeType = nodeType;
    this.parentNode = null;
    this[NEXT] = null;
    this[PREV] = null;
  }
  get ELEMENT_NODE() {
    return ELEMENT_NODE;
  }
  get ATTRIBUTE_NODE() {
    return ATTRIBUTE_NODE;
  }
  get TEXT_NODE() {
    return TEXT_NODE;
  }
  get COMMENT_NODE() {
    return COMMENT_NODE;
  }
  get DOCUMENT_NODE() {
    return DOCUMENT_NODE;
  }
  get DOCUMENT_FRAGMENT_NODE() {
    return DOCUMENT_FRAGMENT_NODE;
  }
  get DOCUMENT_TYPE_NODE() {
    return DOCUMENT_TYPE_NODE;
  }
  get baseURI() {
    const ownerDocument = this.nodeType === DOCUMENT_NODE ? this : this.ownerDocument;
    if (ownerDocument) {
      const base = ownerDocument.querySelector("base");
      if (base)
        return base.getAttribute("href");
      const { location } = ownerDocument.defaultView;
      if (location)
        return location.href;
    }
    return null;
  }
  /* c8 ignore start */
  // mixin: node
  get isConnected() {
    return false;
  }
  get nodeName() {
    return this.localName;
  }
  get parentElement() {
    return null;
  }
  get previousSibling() {
    return null;
  }
  get previousElementSibling() {
    return null;
  }
  get nextSibling() {
    return null;
  }
  get nextElementSibling() {
    return null;
  }
  get childNodes() {
    return new NodeList();
  }
  get firstChild() {
    return null;
  }
  get lastChild() {
    return null;
  }
  // default values
  get nodeValue() {
    return null;
  }
  set nodeValue(value) {
  }
  get textContent() {
    return null;
  }
  set textContent(value) {
  }
  normalize() {
  }
  cloneNode() {
    return null;
  }
  contains() {
    return false;
  }
  /**
   * Inserts a node before a reference node as a child of this parent node.
   * @param {Node} newNode The node to be inserted.
   * @param {Node} referenceNode The node before which newNode is inserted. If this is null, then newNode is inserted at the end of node's child nodes.
   * @returns The added child
   */
  // eslint-disable-next-line no-unused-vars
  insertBefore(newNode, referenceNode) {
    return newNode;
  }
  /**
   * Adds a node to the end of the list of children of this node.
   * @param {Node} child The node to append to the given parent node.
   * @returns The appended child.
   */
  appendChild(child) {
    return child;
  }
  /**
   * Replaces a child node within this node
   * @param {Node} newChild The new node to replace oldChild.
   * @param {Node} oldChild The child to be replaced.
   * @returns The replaced Node. This is the same node as oldChild.
   */
  replaceChild(newChild, oldChild) {
    return oldChild;
  }
  /**
   * Removes a child node from the DOM.
   * @param {Node} child A Node that is the child node to be removed from the DOM.
   * @returns The removed node.
   */
  removeChild(child) {
    return child;
  }
  toString() {
    return "";
  }
  /* c8 ignore stop */
  hasChildNodes() {
    return !!this.lastChild;
  }
  isSameNode(node) {
    return this === node;
  }
  // TODO: attributes?
  compareDocumentPosition(target) {
    let result = 0;
    if (this !== target) {
      let self2 = getParentNodeCount(this);
      let other = getParentNodeCount(target);
      if (self2 < other) {
        result += DOCUMENT_POSITION_FOLLOWING;
        if (this.contains(target))
          result += DOCUMENT_POSITION_CONTAINED_BY;
      } else if (other < self2) {
        result += DOCUMENT_POSITION_PRECEDING;
        if (target.contains(this))
          result += DOCUMENT_POSITION_CONTAINS;
      } else if (self2 && other) {
        const { childNodes } = this.parentNode;
        if (childNodes.indexOf(this) < childNodes.indexOf(target))
          result += DOCUMENT_POSITION_FOLLOWING;
        else
          result += DOCUMENT_POSITION_PRECEDING;
      }
      if (!self2 || !other) {
        result += DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
        result += DOCUMENT_POSITION_DISCONNECTED;
      }
    }
    return result;
  }
  isEqualNode(node) {
    if (this === node)
      return true;
    if (this.nodeType === node.nodeType) {
      switch (this.nodeType) {
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE: {
          const aNodes = this.childNodes;
          const bNodes = node.childNodes;
          return aNodes.length === bNodes.length && aNodes.every((node2, i) => node2.isEqualNode(bNodes[i]));
        }
      }
      return this.toString() === node.toString();
    }
    return false;
  }
  /**
   * @protected
   */
  _getParent() {
    return this.parentNode;
  }
  getRootNode() {
    let root = this;
    while (root.parentNode)
      root = root.parentNode;
    return root.nodeType === DOCUMENT_NODE ? root.documentElement : root;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/attr.js
var QUOTE = /"/g;
var Attr = class extends Node {
  constructor(ownerDocument, name, value = "") {
    super(ownerDocument, "#attribute", ATTRIBUTE_NODE);
    this.ownerElement = null;
    this.name = $String(name);
    this[VALUE] = $String(value);
    this[CHANGED] = false;
  }
  get value() {
    return this[VALUE];
  }
  set value(newValue) {
    const { [VALUE]: oldValue, name, ownerElement } = this;
    this[VALUE] = $String(newValue);
    this[CHANGED] = true;
    if (ownerElement) {
      attributeChangedCallback2(ownerElement, name, oldValue);
      attributeChangedCallback(ownerElement, name, oldValue, this[VALUE]);
    }
  }
  cloneNode() {
    const { ownerDocument, name, [VALUE]: value } = this;
    return new Attr(ownerDocument, name, value);
  }
  toString() {
    const { name, [VALUE]: value } = this;
    return emptyAttributes.has(name) && !value ? name : `${name}="${value.replace(QUOTE, "&quot;")}"`;
  }
  toJSON() {
    const json = [];
    attrAsJSON(this, json);
    return json;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/node.js
var isConnected = ({ ownerDocument, parentNode }) => {
  while (parentNode) {
    if (parentNode === ownerDocument)
      return true;
    parentNode = parentNode.parentNode || parentNode.host;
  }
  return false;
};
var parentElement = ({ parentNode }) => {
  if (parentNode) {
    switch (parentNode.nodeType) {
      case DOCUMENT_NODE:
      case DOCUMENT_FRAGMENT_NODE:
        return null;
    }
  }
  return parentNode;
};
var previousSibling = ({ [PREV]: prev }) => {
  switch (prev ? prev.nodeType : 0) {
    case NODE_END:
      return prev[START];
    case TEXT_NODE:
    case COMMENT_NODE:
      return prev;
  }
  return null;
};
var nextSibling = (node) => {
  const next = getEnd(node)[NEXT];
  return next && (next.nodeType === NODE_END ? null : next);
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/mixin/non-document-type-child-node.js
var nextElementSibling = (node) => {
  let next = nextSibling(node);
  while (next && next.nodeType !== ELEMENT_NODE)
    next = nextSibling(next);
  return next;
};
var previousElementSibling = (node) => {
  let prev = previousSibling(node);
  while (prev && prev.nodeType !== ELEMENT_NODE)
    prev = previousSibling(prev);
  return prev;
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/mixin/child-node.js
var asFragment = (ownerDocument, nodes) => {
  const fragment = ownerDocument.createDocumentFragment();
  fragment.append(...nodes);
  return fragment;
};
var before = (node, nodes) => {
  const { ownerDocument, parentNode } = node;
  if (parentNode)
    parentNode.insertBefore(
      asFragment(ownerDocument, nodes),
      node
    );
};
var after = (node, nodes) => {
  const { ownerDocument, parentNode } = node;
  if (parentNode)
    parentNode.insertBefore(
      asFragment(ownerDocument, nodes),
      getEnd(node)[NEXT]
    );
};
var replaceWith = (node, nodes) => {
  const { ownerDocument, parentNode } = node;
  if (parentNode) {
    parentNode.insertBefore(
      asFragment(ownerDocument, nodes),
      node
    );
    node.remove();
  }
};
var remove = (prev, current, next) => {
  const { parentNode, nodeType } = current;
  if (prev || next) {
    setAdjacent(prev, next);
    current[PREV] = null;
    getEnd(current)[NEXT] = null;
  }
  if (parentNode) {
    current.parentNode = null;
    moCallback(current, parentNode);
    if (nodeType === ELEMENT_NODE)
      disconnectedCallback(current);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/character-data.js
var CharacterData = class extends Node {
  constructor(ownerDocument, localName, nodeType, data) {
    super(ownerDocument, localName, nodeType);
    this[VALUE] = $String(data);
  }
  // <Mixins>
  get isConnected() {
    return isConnected(this);
  }
  get parentElement() {
    return parentElement(this);
  }
  get previousSibling() {
    return previousSibling(this);
  }
  get nextSibling() {
    return nextSibling(this);
  }
  get previousElementSibling() {
    return previousElementSibling(this);
  }
  get nextElementSibling() {
    return nextElementSibling(this);
  }
  before(...nodes) {
    before(this, nodes);
  }
  after(...nodes) {
    after(this, nodes);
  }
  replaceWith(...nodes) {
    replaceWith(this, nodes);
  }
  remove() {
    remove(this[PREV], this, this[NEXT]);
  }
  // </Mixins>
  // CharacterData only
  /* c8 ignore start */
  get data() {
    return this[VALUE];
  }
  set data(value) {
    this[VALUE] = $String(value);
    moCallback(this, this.parentNode);
  }
  get nodeValue() {
    return this.data;
  }
  set nodeValue(value) {
    this.data = value;
  }
  get textContent() {
    return this.data;
  }
  set textContent(value) {
    this.data = value;
  }
  get length() {
    return this.data.length;
  }
  substringData(offset, count) {
    return this.data.substr(offset, count);
  }
  appendData(data) {
    this.data += data;
  }
  insertData(offset, data) {
    const { data: t } = this;
    this.data = t.slice(0, offset) + data + t.slice(offset);
  }
  deleteData(offset, count) {
    const { data: t } = this;
    this.data = t.slice(0, offset) + t.slice(offset + count);
  }
  replaceData(offset, count, data) {
    const { data: t } = this;
    this.data = t.slice(0, offset) + data + t.slice(offset + count);
  }
  /* c8 ignore stop */
  toJSON() {
    const json = [];
    characterDataAsJSON(this, json);
    return json;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/comment.js
var Comment = class extends CharacterData {
  constructor(ownerDocument, data = "") {
    super(ownerDocument, "#comment", COMMENT_NODE, data);
  }
  cloneNode() {
    const { ownerDocument, [VALUE]: data } = this;
    return new Comment(ownerDocument, data);
  }
  toString() {
    return `<!--${this[VALUE]}-->`;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/matches.js
var { isArray } = Array;
var isTag = ({ nodeType }) => nodeType === ELEMENT_NODE;
var existsOne = (test, elements) => elements.some(
  (element) => isTag(element) && (test(element) || existsOne(test, getChildren(element)))
);
var getAttributeValue = (element, name) => name === "class" ? element.classList.value : element.getAttribute(name);
var getChildren = ({ childNodes }) => childNodes;
var getName = (element) => {
  const { localName } = element;
  return ignoreCase(element) ? localName.toLowerCase() : localName;
};
var getParent = ({ parentNode }) => parentNode;
var getSiblings = (element) => {
  const { parentNode } = element;
  return parentNode ? getChildren(parentNode) : element;
};
var getText = (node) => {
  if (isArray(node))
    return node.map(getText).join("");
  if (isTag(node))
    return getText(getChildren(node));
  if (node.nodeType === TEXT_NODE)
    return node.data;
  return "";
};
var hasAttrib = (element, name) => element.hasAttribute(name);
var removeSubsets = (nodes) => {
  let { length } = nodes;
  while (length--) {
    const node = nodes[length];
    if (length && -1 < nodes.lastIndexOf(node, length - 1)) {
      nodes.splice(length, 1);
      continue;
    }
    for (let { parentNode } = node; parentNode; parentNode = parentNode.parentNode) {
      if (nodes.includes(parentNode)) {
        nodes.splice(length, 1);
        break;
      }
    }
  }
  return nodes;
};
var findAll = (test, nodes) => {
  const matches2 = [];
  for (const node of nodes) {
    if (isTag(node)) {
      if (test(node))
        matches2.push(node);
      matches2.push(...findAll(test, getChildren(node)));
    }
  }
  return matches2;
};
var findOne = (test, nodes) => {
  for (let node of nodes)
    if (test(node) || (node = findOne(test, getChildren(node))))
      return node;
  return null;
};
var adapter = {
  isTag,
  existsOne,
  getAttributeValue,
  getChildren,
  getName,
  getParent,
  getSiblings,
  getText,
  hasAttrib,
  removeSubsets,
  findAll,
  findOne
};
var prepareMatch = (element, selectors) => compile(
  selectors,
  {
    context: selectors.includes(":scope") ? element : void 0,
    xmlMode: !ignoreCase(element),
    adapter
  }
);
var matches = (element, selectors) => is(
  element,
  selectors,
  {
    strict: true,
    context: selectors.includes(":scope") ? element : void 0,
    xmlMode: !ignoreCase(element),
    adapter
  }
);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/text-escaper.js
var { replace } = "";
var ca = /[<>&\xA0]/g;
var esca = {
  "\xA0": "&nbsp;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
var pe = (m) => esca[m];
var escape = (es) => replace.call(es, ca, pe);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/text.js
var Text = class extends CharacterData {
  constructor(ownerDocument, data = "") {
    super(ownerDocument, "#text", TEXT_NODE, data);
  }
  get wholeText() {
    const text = [];
    let { previousSibling: previousSibling2, nextSibling: nextSibling2 } = this;
    while (previousSibling2) {
      if (previousSibling2.nodeType === TEXT_NODE)
        text.unshift(previousSibling2[VALUE]);
      else
        break;
      previousSibling2 = previousSibling2.previousSibling;
    }
    text.push(this[VALUE]);
    while (nextSibling2) {
      if (nextSibling2.nodeType === TEXT_NODE)
        text.push(nextSibling2[VALUE]);
      else
        break;
      nextSibling2 = nextSibling2.nextSibling;
    }
    return text.join("");
  }
  cloneNode() {
    const { ownerDocument, [VALUE]: data } = this;
    return new Text(ownerDocument, data);
  }
  toString() {
    return escape(this[VALUE]);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/mixin/parent-node.js
var isNode = (node) => node instanceof Node;
var insert = (parentNode, child, nodes) => {
  const { ownerDocument } = parentNode;
  for (const node of nodes)
    parentNode.insertBefore(
      isNode(node) ? node : new Text(ownerDocument, node),
      child
    );
};
var ParentNode = class extends Node {
  constructor(ownerDocument, localName, nodeType) {
    super(ownerDocument, localName, nodeType);
    this[PRIVATE] = null;
    this[NEXT] = this[END] = {
      [NEXT]: null,
      [PREV]: this,
      [START]: this,
      nodeType: NODE_END,
      ownerDocument: this.ownerDocument,
      parentNode: null
    };
  }
  get childNodes() {
    const childNodes = new NodeList();
    let { firstChild } = this;
    while (firstChild) {
      childNodes.push(firstChild);
      firstChild = nextSibling(firstChild);
    }
    return childNodes;
  }
  get children() {
    const children = new NodeList();
    let { firstElementChild } = this;
    while (firstElementChild) {
      children.push(firstElementChild);
      firstElementChild = nextElementSibling(firstElementChild);
    }
    return children;
  }
  /**
   * @returns {NodeStruct | null}
   */
  get firstChild() {
    let { [NEXT]: next, [END]: end } = this;
    while (next.nodeType === ATTRIBUTE_NODE)
      next = next[NEXT];
    return next === end ? null : next;
  }
  /**
   * @returns {NodeStruct | null}
   */
  get firstElementChild() {
    let { firstChild } = this;
    while (firstChild) {
      if (firstChild.nodeType === ELEMENT_NODE)
        return firstChild;
      firstChild = nextSibling(firstChild);
    }
    return null;
  }
  get lastChild() {
    const prev = this[END][PREV];
    switch (prev.nodeType) {
      case NODE_END:
        return prev[START];
      case ATTRIBUTE_NODE:
        return null;
    }
    return prev === this ? null : prev;
  }
  get lastElementChild() {
    let { lastChild } = this;
    while (lastChild) {
      if (lastChild.nodeType === ELEMENT_NODE)
        return lastChild;
      lastChild = previousSibling(lastChild);
    }
    return null;
  }
  get childElementCount() {
    return this.children.length;
  }
  prepend(...nodes) {
    insert(this, this.firstChild, nodes);
  }
  append(...nodes) {
    insert(this, this[END], nodes);
  }
  replaceChildren(...nodes) {
    let { [NEXT]: next, [END]: end } = this;
    while (next !== end && next.nodeType === ATTRIBUTE_NODE)
      next = next[NEXT];
    while (next !== end) {
      const after2 = getEnd(next)[NEXT];
      next.remove();
      next = after2;
    }
    if (nodes.length)
      insert(this, end, nodes);
  }
  getElementsByClassName(className) {
    const elements = new NodeList();
    let { [NEXT]: next, [END]: end } = this;
    while (next !== end) {
      if (next.nodeType === ELEMENT_NODE && next.hasAttribute("class") && next.classList.has(className))
        elements.push(next);
      next = next[NEXT];
    }
    return elements;
  }
  getElementsByTagName(tagName18) {
    const elements = new NodeList();
    let { [NEXT]: next, [END]: end } = this;
    while (next !== end) {
      if (next.nodeType === ELEMENT_NODE && (next.localName === tagName18 || localCase(next) === tagName18))
        elements.push(next);
      next = next[NEXT];
    }
    return elements;
  }
  querySelector(selectors) {
    const matches2 = prepareMatch(this, selectors);
    let { [NEXT]: next, [END]: end } = this;
    while (next !== end) {
      if (next.nodeType === ELEMENT_NODE && matches2(next))
        return next;
      next = next[NEXT];
    }
    return null;
  }
  querySelectorAll(selectors) {
    const matches2 = prepareMatch(this, selectors);
    const elements = new NodeList();
    let { [NEXT]: next, [END]: end } = this;
    while (next !== end) {
      if (next.nodeType === ELEMENT_NODE && matches2(next))
        elements.push(next);
      next = next[NEXT];
    }
    return elements;
  }
  appendChild(node) {
    return this.insertBefore(node, this[END]);
  }
  contains(node) {
    let parentNode = node;
    while (parentNode && parentNode !== this)
      parentNode = parentNode.parentNode;
    return parentNode === this;
  }
  insertBefore(node, before2 = null) {
    if (node === before2)
      return node;
    if (node === this)
      throw new Error("unable to append a node to itself");
    const next = before2 || this[END];
    switch (node.nodeType) {
      case ELEMENT_NODE:
        node.remove();
        node.parentNode = this;
        knownBoundaries(next[PREV], node, next);
        moCallback(node, null);
        connectedCallback(node);
        break;
      case DOCUMENT_FRAGMENT_NODE: {
        let { [PRIVATE]: parentNode, firstChild, lastChild } = node;
        if (firstChild) {
          knownSegment(next[PREV], firstChild, lastChild, next);
          knownAdjacent(node, node[END]);
          if (parentNode)
            parentNode.replaceChildren();
          do {
            firstChild.parentNode = this;
            moCallback(firstChild, null);
            if (firstChild.nodeType === ELEMENT_NODE)
              connectedCallback(firstChild);
          } while (firstChild !== lastChild && (firstChild = nextSibling(firstChild)));
        }
        break;
      }
      case TEXT_NODE:
      case COMMENT_NODE:
        node.remove();
      default:
        node.parentNode = this;
        knownSiblings(next[PREV], node, next);
        moCallback(node, null);
        break;
    }
    return node;
  }
  normalize() {
    let { [NEXT]: next, [END]: end } = this;
    while (next !== end) {
      const { [NEXT]: $next, [PREV]: $prev, nodeType } = next;
      if (nodeType === TEXT_NODE) {
        if (!next[VALUE])
          next.remove();
        else if ($prev && $prev.nodeType === TEXT_NODE) {
          $prev.textContent += next.textContent;
          next.remove();
        }
      }
      next = $next;
    }
  }
  removeChild(node) {
    if (node.parentNode !== this)
      throw new Error("node is not a child");
    node.remove();
    return node;
  }
  replaceChild(node, replaced) {
    const next = getEnd(replaced)[NEXT];
    replaced.remove();
    this.insertBefore(node, next);
    return replaced;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/mixin/non-element-parent-node.js
var NonElementParentNode = class extends ParentNode {
  getElementById(id) {
    let { [NEXT]: next, [END]: end } = this;
    while (next !== end) {
      if (next.nodeType === ELEMENT_NODE && next.id === id)
        return next;
      next = next[NEXT];
    }
    return null;
  }
  cloneNode(deep) {
    const { ownerDocument, constructor } = this;
    const nonEPN = new constructor(ownerDocument);
    if (deep) {
      const { [END]: end } = nonEPN;
      for (const node of this.childNodes)
        nonEPN.insertBefore(node.cloneNode(deep), end);
    }
    return nonEPN;
  }
  toString() {
    const { childNodes, localName } = this;
    return `<${localName}>${childNodes.join("")}</${localName}>`;
  }
  toJSON() {
    const json = [];
    nonElementAsJSON(this, json);
    return json;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/document-fragment.js
var DocumentFragment = class extends NonElementParentNode {
  constructor(ownerDocument) {
    super(ownerDocument, "#document-fragment", DOCUMENT_FRAGMENT_NODE);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/document-type.js
var DocumentType = class extends Node {
  constructor(ownerDocument, name, publicId = "", systemId = "") {
    super(ownerDocument, "#document-type", DOCUMENT_TYPE_NODE);
    this.name = name;
    this.publicId = publicId;
    this.systemId = systemId;
  }
  cloneNode() {
    const { ownerDocument, name, publicId, systemId } = this;
    return new DocumentType(ownerDocument, name, publicId, systemId);
  }
  toString() {
    const { name, publicId, systemId } = this;
    const hasPublic = 0 < publicId.length;
    const str = [name];
    if (hasPublic)
      str.push("PUBLIC", `"${publicId}"`);
    if (systemId.length) {
      if (!hasPublic)
        str.push("SYSTEM");
      str.push(`"${systemId}"`);
    }
    return `<!DOCTYPE ${str.join(" ")}>`;
  }
  toJSON() {
    const json = [];
    documentTypeAsJSON(this, json);
    return json;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/mixin/inner-html.js
var getInnerHtml = (node) => node.childNodes.join("");
var setInnerHtml = (node, html) => {
  const { ownerDocument } = node;
  const { constructor } = ownerDocument;
  const document = new constructor();
  document[CUSTOM_ELEMENTS] = ownerDocument[CUSTOM_ELEMENTS];
  const { childNodes } = parseFromString(document, ignoreCase(node), html);
  node.replaceChildren(...childNodes.map(setOwnerDocument, ownerDocument));
};
function setOwnerDocument(node) {
  node.ownerDocument = this;
  switch (node.nodeType) {
    case ELEMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      node.childNodes.forEach(setOwnerDocument, this);
      break;
  }
  return node;
}

// node_modules/.pnpm/uhyphen@0.1.0/node_modules/uhyphen/esm/index.js
var esm_default = (camel) => camel.replace(/(([A-Z0-9])([A-Z0-9][a-z]))|(([a-z])([A-Z]))/g, "$2$5-$3$6").toLowerCase();

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/dom/string-map.js
var refs = /* @__PURE__ */ new WeakMap();
var key = (name) => `data-${esm_default(name)}`;
var prop = (name) => name.slice(5).replace(/-([a-z])/g, (_, $1) => $1.toUpperCase());
var handler = {
  get(dataset, name) {
    if (name in dataset)
      return refs.get(dataset).getAttribute(key(name));
  },
  set(dataset, name, value) {
    dataset[name] = value;
    refs.get(dataset).setAttribute(key(name), value);
    return true;
  },
  deleteProperty(dataset, name) {
    if (name in dataset)
      refs.get(dataset).removeAttribute(key(name));
    return delete dataset[name];
  }
};
var DOMStringMap = class {
  /**
   * @param {Element} ref
   */
  constructor(ref) {
    for (const { name, value } of ref.attributes) {
      if (/^data-/.test(name))
        this[prop(name)] = value;
    }
    refs.set(this, ref);
    return new Proxy(this, handler);
  }
};
setPrototypeOf(DOMStringMap.prototype, null);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/dom/token-list.js
var { add } = Set.prototype;
var addTokens = (self2, tokens) => {
  for (const token of tokens) {
    if (token)
      add.call(self2, token);
  }
};
var update = ({ [OWNER_ELEMENT]: ownerElement, value }) => {
  const attribute2 = ownerElement.getAttributeNode("class");
  if (attribute2)
    attribute2.value = value;
  else
    setAttribute(
      ownerElement,
      new Attr(ownerElement.ownerDocument, "class", value)
    );
};
var DOMTokenList = class extends Set {
  constructor(ownerElement) {
    super();
    this[OWNER_ELEMENT] = ownerElement;
    const attribute2 = ownerElement.getAttributeNode("class");
    if (attribute2)
      addTokens(this, attribute2.value.split(/\s+/));
  }
  get length() {
    return this.size;
  }
  get value() {
    return [...this].join(" ");
  }
  /**
   * @param  {...string} tokens
   */
  add(...tokens) {
    addTokens(this, tokens);
    update(this);
  }
  /**
   * @param {string} token
   */
  contains(token) {
    return this.has(token);
  }
  /**
   * @param  {...string} tokens
   */
  remove(...tokens) {
    for (const token of tokens)
      this.delete(token);
    update(this);
  }
  /**
   * @param {string} token
   * @param {boolean?} force
   */
  toggle(token, force) {
    if (this.has(token)) {
      if (force)
        return true;
      this.delete(token);
      update(this);
    } else if (force || arguments.length === 1) {
      super.add(token);
      update(this);
      return true;
    }
    return false;
  }
  /**
   * @param {string} token
   * @param {string} newToken
   */
  replace(token, newToken) {
    if (this.has(token)) {
      this.delete(token);
      super.add(newToken);
      update(this);
      return true;
    }
    return false;
  }
  /**
   * @param {string} token
   */
  supports() {
    return true;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/css-style-declaration.js
var refs2 = /* @__PURE__ */ new WeakMap();
var getKeys = (style) => [...style.keys()].filter((key2) => key2 !== PRIVATE);
var updateKeys = (style) => {
  const attr = refs2.get(style).getAttributeNode("style");
  if (!attr || attr[CHANGED] || style.get(PRIVATE) !== attr) {
    style.clear();
    if (attr) {
      style.set(PRIVATE, attr);
      for (const rule of attr[VALUE].split(/\s*;\s*/)) {
        let [key2, ...rest] = rule.split(":");
        if (rest.length > 0) {
          key2 = key2.trim();
          const value = rest.join(":").trim();
          if (key2 && value)
            style.set(key2, value);
        }
      }
    }
  }
  return attr;
};
var handler2 = {
  get(style, name) {
    if (name in prototype)
      return style[name];
    updateKeys(style);
    if (name === "length")
      return getKeys(style).length;
    if (/^\d+$/.test(name))
      return getKeys(style)[name];
    return style.get(esm_default(name));
  },
  set(style, name, value) {
    if (name === "cssText")
      style[name] = value;
    else {
      let attr = updateKeys(style);
      if (value == null)
        style.delete(esm_default(name));
      else
        style.set(esm_default(name), value);
      if (!attr) {
        const element = refs2.get(style);
        attr = element.ownerDocument.createAttribute("style");
        element.setAttributeNode(attr);
        style.set(PRIVATE, attr);
      }
      attr[CHANGED] = false;
      attr[VALUE] = style.toString();
    }
    return true;
  }
};
var CSSStyleDeclaration = class extends Map {
  constructor(element) {
    super();
    refs2.set(this, element);
    return new Proxy(this, handler2);
  }
  get cssText() {
    return this.toString();
  }
  set cssText(value) {
    refs2.get(this).setAttribute("style", value);
  }
  getPropertyValue(name) {
    const self2 = this[PRIVATE];
    return handler2.get(self2, name);
  }
  setProperty(name, value) {
    const self2 = this[PRIVATE];
    handler2.set(self2, name, value);
  }
  removeProperty(name) {
    const self2 = this[PRIVATE];
    handler2.set(self2, name, null);
  }
  [Symbol.iterator]() {
    const keys2 = getKeys(this[PRIVATE]);
    const { length } = keys2;
    let i = 0;
    return {
      next() {
        const done = i === length;
        return { done, value: done ? null : keys2[i++] };
      }
    };
  }
  get [PRIVATE]() {
    return this;
  }
  toString() {
    const self2 = this[PRIVATE];
    updateKeys(self2);
    const cssText = [];
    self2.forEach(push, cssText);
    return cssText.join(";");
  }
};
var { prototype } = CSSStyleDeclaration;
function push(value, key2) {
  if (key2 !== PRIVATE)
    this.push(`${key2}:${value}`);
}

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/event.js
var BUBBLING_PHASE = 3;
var AT_TARGET = 2;
var CAPTURING_PHASE = 1;
var NONE = 0;
var GlobalEvent = class {
  static get BUBBLING_PHASE() {
    return BUBBLING_PHASE;
  }
  static get AT_TARGET() {
    return AT_TARGET;
  }
  static get CAPTURING_PHASE() {
    return CAPTURING_PHASE;
  }
  static get NONE() {
    return NONE;
  }
  constructor(type, eventInitDict = {}) {
    this.type = type;
    this.bubbles = !!eventInitDict.bubbles;
    this.cancelBubble = false;
    this._stopImmediatePropagationFlag = false;
    this.cancelable = !!eventInitDict.cancelable;
    this.eventPhase = this.NONE;
    this.timeStamp = Date.now();
    this.defaultPrevented = false;
    this.originalTarget = null;
    this.returnValue = null;
    this.srcElement = null;
    this.target = null;
    this._path = [];
  }
  get BUBBLING_PHASE() {
    return BUBBLING_PHASE;
  }
  get AT_TARGET() {
    return AT_TARGET;
  }
  get CAPTURING_PHASE() {
    return CAPTURING_PHASE;
  }
  get NONE() {
    return NONE;
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
  // simplified implementation, should be https://dom.spec.whatwg.org/#dom-event-composedpath
  composedPath() {
    return this._path;
  }
  stopPropagation() {
    this.cancelBubble = true;
  }
  stopImmediatePropagation() {
    this.stopPropagation();
    this._stopImmediatePropagationFlag = true;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/named-node-map.js
var NamedNodeMap = class extends Array {
  constructor(ownerElement) {
    super();
    this.ownerElement = ownerElement;
  }
  getNamedItem(name) {
    return this.ownerElement.getAttributeNode(name);
  }
  setNamedItem(attr) {
    this.ownerElement.setAttributeNode(attr);
    this.unshift(attr);
  }
  removeNamedItem(name) {
    const item = this.getNamedItem(name);
    this.ownerElement.removeAttribute(name);
    this.splice(this.indexOf(item), 1);
  }
  item(index) {
    return index < this.length ? this[index] : null;
  }
  /* c8 ignore start */
  getNamedItemNS(_, name) {
    return this.getNamedItem(name);
  }
  setNamedItemNS(_, attr) {
    return this.setNamedItem(attr);
  }
  removeNamedItemNS(_, name) {
    return this.removeNamedItem(name);
  }
  /* c8 ignore stop */
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/shadow-root.js
var ShadowRoot = class extends NonElementParentNode {
  constructor(host) {
    super(host.ownerDocument, "#shadow-root", DOCUMENT_FRAGMENT_NODE);
    this.host = host;
  }
  get innerHTML() {
    return getInnerHtml(this);
  }
  set innerHTML(html) {
    setInnerHtml(this, html);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/element.js
var attributesHandler = {
  get(target, key2) {
    return key2 in target ? target[key2] : target.find(({ name }) => name === key2);
  }
};
var create2 = (ownerDocument, element, localName) => {
  if ("ownerSVGElement" in element) {
    const svg = ownerDocument.createElementNS(SVG_NAMESPACE, localName);
    svg.ownerSVGElement = element.ownerSVGElement;
    return svg;
  }
  return ownerDocument.createElement(localName);
};
var isVoid = ({ localName, ownerDocument }) => {
  return ownerDocument[MIME].voidElements.test(localName);
};
var Element = class extends ParentNode {
  constructor(ownerDocument, localName) {
    super(ownerDocument, localName, ELEMENT_NODE);
    this[CLASS_LIST] = null;
    this[DATASET] = null;
    this[STYLE] = null;
  }
  // <Mixins>
  get isConnected() {
    return isConnected(this);
  }
  get parentElement() {
    return parentElement(this);
  }
  get previousSibling() {
    return previousSibling(this);
  }
  get nextSibling() {
    return nextSibling(this);
  }
  get namespaceURI() {
    return "http://www.w3.org/1999/xhtml";
  }
  get previousElementSibling() {
    return previousElementSibling(this);
  }
  get nextElementSibling() {
    return nextElementSibling(this);
  }
  before(...nodes) {
    before(this, nodes);
  }
  after(...nodes) {
    after(this, nodes);
  }
  replaceWith(...nodes) {
    replaceWith(this, nodes);
  }
  remove() {
    remove(this[PREV], this, this[END][NEXT]);
  }
  // </Mixins>
  // <specialGetters>
  get id() {
    return stringAttribute.get(this, "id");
  }
  set id(value) {
    stringAttribute.set(this, "id", value);
  }
  get className() {
    return this.classList.value;
  }
  set className(value) {
    const { classList } = this;
    classList.clear();
    classList.add(...value.split(/\s+/));
  }
  get nodeName() {
    return localCase(this);
  }
  get tagName() {
    return localCase(this);
  }
  get classList() {
    return this[CLASS_LIST] || (this[CLASS_LIST] = new DOMTokenList(this));
  }
  get dataset() {
    return this[DATASET] || (this[DATASET] = new DOMStringMap(this));
  }
  get nonce() {
    return stringAttribute.get(this, "nonce");
  }
  set nonce(value) {
    stringAttribute.set(this, "nonce", value);
  }
  get style() {
    return this[STYLE] || (this[STYLE] = new CSSStyleDeclaration(this));
  }
  get tabIndex() {
    return numericAttribute.get(this, "tabindex") || -1;
  }
  set tabIndex(value) {
    numericAttribute.set(this, "tabindex", value);
  }
  // </specialGetters>
  // <contentRelated>
  get innerText() {
    const text = [];
    let { [NEXT]: next, [END]: end } = this;
    while (next !== end) {
      if (next.nodeType === TEXT_NODE) {
        text.push(next.textContent.replace(/\s+/g, " "));
      } else if (text.length && next[NEXT] != end && BLOCK_ELEMENTS.has(next.tagName)) {
        text.push("\n");
      }
      next = next[NEXT];
    }
    return text.join("");
  }
  /**
   * @returns {String}
   */
  get textContent() {
    const text = [];
    let { [NEXT]: next, [END]: end } = this;
    while (next !== end) {
      if (next.nodeType === TEXT_NODE)
        text.push(next.textContent);
      next = next[NEXT];
    }
    return text.join("");
  }
  set textContent(text) {
    this.replaceChildren();
    if (text)
      this.appendChild(new Text(this.ownerDocument, text));
  }
  get innerHTML() {
    return getInnerHtml(this);
  }
  set innerHTML(html) {
    setInnerHtml(this, html);
  }
  get outerHTML() {
    return this.toString();
  }
  set outerHTML(html) {
    const template = this.ownerDocument.createElement("");
    template.innerHTML = html;
    this.replaceWith(...template.childNodes);
  }
  // </contentRelated>
  // <attributes>
  get attributes() {
    const attributes = new NamedNodeMap(this);
    let next = this[NEXT];
    while (next.nodeType === ATTRIBUTE_NODE) {
      attributes.push(next);
      next = next[NEXT];
    }
    return new Proxy(attributes, attributesHandler);
  }
  focus() {
    this.dispatchEvent(new GlobalEvent("focus"));
  }
  getAttribute(name) {
    if (name === "class")
      return this.className;
    const attribute2 = this.getAttributeNode(name);
    return attribute2 && attribute2.value;
  }
  getAttributeNode(name) {
    let next = this[NEXT];
    while (next.nodeType === ATTRIBUTE_NODE) {
      if (next.name === name)
        return next;
      next = next[NEXT];
    }
    return null;
  }
  getAttributeNames() {
    const attributes = new NodeList();
    let next = this[NEXT];
    while (next.nodeType === ATTRIBUTE_NODE) {
      attributes.push(next.name);
      next = next[NEXT];
    }
    return attributes;
  }
  hasAttribute(name) {
    return !!this.getAttributeNode(name);
  }
  hasAttributes() {
    return this[NEXT].nodeType === ATTRIBUTE_NODE;
  }
  removeAttribute(name) {
    if (name === "class" && this[CLASS_LIST])
      this[CLASS_LIST].clear();
    let next = this[NEXT];
    while (next.nodeType === ATTRIBUTE_NODE) {
      if (next.name === name) {
        removeAttribute(this, next);
        return;
      }
      next = next[NEXT];
    }
  }
  removeAttributeNode(attribute2) {
    let next = this[NEXT];
    while (next.nodeType === ATTRIBUTE_NODE) {
      if (next === attribute2) {
        removeAttribute(this, next);
        return;
      }
      next = next[NEXT];
    }
  }
  setAttribute(name, value) {
    if (name === "class")
      this.className = value;
    else {
      const attribute2 = this.getAttributeNode(name);
      if (attribute2)
        attribute2.value = value;
      else
        setAttribute(this, new Attr(this.ownerDocument, name, value));
    }
  }
  setAttributeNode(attribute2) {
    const { name } = attribute2;
    const previously = this.getAttributeNode(name);
    if (previously !== attribute2) {
      if (previously)
        this.removeAttributeNode(previously);
      const { ownerElement } = attribute2;
      if (ownerElement)
        ownerElement.removeAttributeNode(attribute2);
      setAttribute(this, attribute2);
    }
    return previously;
  }
  toggleAttribute(name, force) {
    if (this.hasAttribute(name)) {
      if (!force) {
        this.removeAttribute(name);
        return false;
      }
      return true;
    } else if (force || arguments.length === 1) {
      this.setAttribute(name, "");
      return true;
    }
    return false;
  }
  // </attributes>
  // <ShadowDOM>
  get shadowRoot() {
    if (shadowRoots.has(this)) {
      const { mode, shadowRoot } = shadowRoots.get(this);
      if (mode === "open")
        return shadowRoot;
    }
    return null;
  }
  attachShadow(init) {
    if (shadowRoots.has(this))
      throw new Error("operation not supported");
    const shadowRoot = new ShadowRoot(this);
    shadowRoot.append(...this.childNodes);
    shadowRoots.set(this, {
      mode: init.mode,
      shadowRoot
    });
    return shadowRoot;
  }
  // </ShadowDOM>
  // <selectors>
  matches(selectors) {
    return matches(this, selectors);
  }
  closest(selectors) {
    let parentElement2 = this;
    const matches2 = prepareMatch(parentElement2, selectors);
    while (parentElement2 && !matches2(parentElement2))
      parentElement2 = parentElement2.parentElement;
    return parentElement2;
  }
  // </selectors>
  // <insertAdjacent>
  insertAdjacentElement(position, element) {
    const { parentElement: parentElement2 } = this;
    switch (position) {
      case "beforebegin":
        if (parentElement2) {
          parentElement2.insertBefore(element, this);
          break;
        }
        return null;
      case "afterbegin":
        this.insertBefore(element, this.firstChild);
        break;
      case "beforeend":
        this.insertBefore(element, null);
        break;
      case "afterend":
        if (parentElement2) {
          parentElement2.insertBefore(element, this.nextSibling);
          break;
        }
        return null;
    }
    return element;
  }
  insertAdjacentHTML(position, html) {
    const template = this.ownerDocument.createElement("template");
    template.innerHTML = html;
    this.insertAdjacentElement(position, template.content);
  }
  insertAdjacentText(position, text) {
    const node = this.ownerDocument.createTextNode(text);
    this.insertAdjacentElement(position, node);
  }
  // </insertAdjacent>
  cloneNode(deep = false) {
    const { ownerDocument, localName } = this;
    const addNext = (next2) => {
      next2.parentNode = parentNode;
      knownAdjacent($next, next2);
      $next = next2;
    };
    const clone = create2(ownerDocument, this, localName);
    let parentNode = clone, $next = clone;
    let { [NEXT]: next, [END]: prev } = this;
    while (next !== prev && (deep || next.nodeType === ATTRIBUTE_NODE)) {
      switch (next.nodeType) {
        case NODE_END:
          knownAdjacent($next, parentNode[END]);
          $next = parentNode[END];
          parentNode = parentNode.parentNode;
          break;
        case ELEMENT_NODE: {
          const node = create2(ownerDocument, next, next.localName);
          addNext(node);
          parentNode = node;
          break;
        }
        case ATTRIBUTE_NODE: {
          const attr = next.cloneNode(deep);
          attr.ownerElement = parentNode;
          addNext(attr);
          break;
        }
        case TEXT_NODE:
        case COMMENT_NODE:
          addNext(next.cloneNode(deep));
          break;
      }
      next = next[NEXT];
    }
    knownAdjacent($next, clone[END]);
    return clone;
  }
  // <custom>
  toString() {
    const out = [];
    const { [END]: end } = this;
    let next = { [NEXT]: this };
    let isOpened = false;
    do {
      next = next[NEXT];
      switch (next.nodeType) {
        case ATTRIBUTE_NODE: {
          const attr = " " + next;
          switch (attr) {
            case " id":
            case " class":
            case " style":
              break;
            default:
              out.push(attr);
          }
          break;
        }
        case NODE_END: {
          const start = next[START];
          if (isOpened) {
            if ("ownerSVGElement" in start)
              out.push(" />");
            else if (isVoid(start))
              out.push(ignoreCase(start) ? ">" : " />");
            else
              out.push(`></${start.localName}>`);
            isOpened = false;
          } else
            out.push(`</${start.localName}>`);
          break;
        }
        case ELEMENT_NODE:
          if (isOpened)
            out.push(">");
          if (next.toString !== this.toString) {
            out.push(next.toString());
            next = next[END];
            isOpened = false;
          } else {
            out.push(`<${next.localName}`);
            isOpened = true;
          }
          break;
        case TEXT_NODE:
        case COMMENT_NODE:
          out.push((isOpened ? ">" : "") + next);
          isOpened = false;
          break;
      }
    } while (next !== end);
    return out.join("");
  }
  toJSON() {
    const json = [];
    elementAsJSON(this, json);
    return json;
  }
  // </custom>
  /* c8 ignore start */
  getAttributeNS(_, name) {
    return this.getAttribute(name);
  }
  getElementsByTagNameNS(_, name) {
    return this.getElementsByTagName(name);
  }
  hasAttributeNS(_, name) {
    return this.hasAttribute(name);
  }
  removeAttributeNS(_, name) {
    this.removeAttribute(name);
  }
  setAttributeNS(_, name, value) {
    this.setAttribute(name, value);
  }
  setAttributeNodeNS(attr) {
    return this.setAttributeNode(attr);
  }
  /* c8 ignore stop */
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/svg/element.js
var classNames = /* @__PURE__ */ new WeakMap();
var handler3 = {
  get(target, name) {
    return target[name];
  },
  set(target, name, value) {
    target[name] = value;
    return true;
  }
};
var SVGElement = class extends Element {
  constructor(ownerDocument, localName, ownerSVGElement = null) {
    super(ownerDocument, localName);
    this.ownerSVGElement = ownerSVGElement;
  }
  get className() {
    if (!classNames.has(this))
      classNames.set(this, new Proxy({ baseVal: "", animVal: "" }, handler3));
    return classNames.get(this);
  }
  /* c8 ignore start */
  set className(value) {
    const { classList } = this;
    classList.clear();
    classList.add(...value.split(/\s+/));
  }
  /* c8 ignore stop */
  get namespaceURI() {
    return "http://www.w3.org/2000/svg";
  }
  getAttribute(name) {
    return name === "class" ? [...this.classList].join(" ") : super.getAttribute(name);
  }
  setAttribute(name, value) {
    if (name === "class")
      this.className = value;
    else if (name === "style") {
      const { className } = this;
      className.baseVal = className.animVal = value;
    }
    super.setAttribute(name, value);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/facades.js
var illegalConstructor = () => {
  throw new TypeError("Illegal constructor");
};
function Attr2() {
  illegalConstructor();
}
setPrototypeOf(Attr2, Attr);
Attr2.prototype = Attr.prototype;
function CharacterData2() {
  illegalConstructor();
}
setPrototypeOf(CharacterData2, CharacterData);
CharacterData2.prototype = CharacterData.prototype;
function Comment2() {
  illegalConstructor();
}
setPrototypeOf(Comment2, Comment);
Comment2.prototype = Comment.prototype;
function DocumentFragment2() {
  illegalConstructor();
}
setPrototypeOf(DocumentFragment2, DocumentFragment);
DocumentFragment2.prototype = DocumentFragment.prototype;
function DocumentType2() {
  illegalConstructor();
}
setPrototypeOf(DocumentType2, DocumentType);
DocumentType2.prototype = DocumentType.prototype;
function Element2() {
  illegalConstructor();
}
setPrototypeOf(Element2, Element);
Element2.prototype = Element.prototype;
function Node2() {
  illegalConstructor();
}
setPrototypeOf(Node2, Node);
Node2.prototype = Node.prototype;
function ShadowRoot2() {
  illegalConstructor();
}
setPrototypeOf(ShadowRoot2, ShadowRoot);
ShadowRoot2.prototype = ShadowRoot.prototype;
function Text2() {
  illegalConstructor();
}
setPrototypeOf(Text2, Text);
Text2.prototype = Text.prototype;
function SVGElement2() {
  illegalConstructor();
}
setPrototypeOf(SVGElement2, SVGElement);
SVGElement2.prototype = SVGElement.prototype;
var Facades = {
  Attr: Attr2,
  CharacterData: CharacterData2,
  Comment: Comment2,
  DocumentFragment: DocumentFragment2,
  DocumentType: DocumentType2,
  Element: Element2,
  Node: Node2,
  ShadowRoot: ShadowRoot2,
  Text: Text2,
  SVGElement: SVGElement2
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/element.js
var Level0 = /* @__PURE__ */ new WeakMap();
var level0 = {
  get(element, name) {
    return Level0.has(element) && Level0.get(element)[name] || null;
  },
  set(element, name, value) {
    if (!Level0.has(element))
      Level0.set(element, {});
    const handlers = Level0.get(element);
    const type = name.slice(2);
    if (handlers[name])
      element.removeEventListener(type, handlers[name], false);
    if (handlers[name] = value)
      element.addEventListener(type, value, false);
  }
};
var HTMLElement = class extends Element {
  static get observedAttributes() {
    return [];
  }
  constructor(ownerDocument = null, localName = "") {
    super(ownerDocument, localName);
    const ownerLess = !ownerDocument;
    let options;
    if (ownerLess) {
      const { constructor: Class } = this;
      if (!Classes.has(Class))
        throw new Error("unable to initialize this Custom Element");
      ({ ownerDocument, localName, options } = Classes.get(Class));
    }
    if (ownerDocument[UPGRADE]) {
      const { element, values } = ownerDocument[UPGRADE];
      ownerDocument[UPGRADE] = null;
      for (const [key2, value] of values)
        element[key2] = value;
      return element;
    }
    if (ownerLess) {
      this.ownerDocument = this[END].ownerDocument = ownerDocument;
      this.localName = localName;
      customElements.set(this, { connected: false });
      if (options.is)
        this.setAttribute("is", options.is);
    }
  }
  /* c8 ignore start */
  /* TODO: what about these?
  offsetHeight
  offsetLeft
  offsetParent
  offsetTop
  offsetWidth
  */
  blur() {
    this.dispatchEvent(new GlobalEvent("blur"));
  }
  click() {
    this.dispatchEvent(new GlobalEvent("click"));
  }
  // Boolean getters
  get accessKeyLabel() {
    const { accessKey } = this;
    return accessKey && `Alt+Shift+${accessKey}`;
  }
  get isContentEditable() {
    return this.hasAttribute("contenteditable");
  }
  // Boolean Accessors
  get contentEditable() {
    return booleanAttribute.get(this, "contenteditable");
  }
  set contentEditable(value) {
    booleanAttribute.set(this, "contenteditable", value);
  }
  get draggable() {
    return booleanAttribute.get(this, "draggable");
  }
  set draggable(value) {
    booleanAttribute.set(this, "draggable", value);
  }
  get hidden() {
    return booleanAttribute.get(this, "hidden");
  }
  set hidden(value) {
    booleanAttribute.set(this, "hidden", value);
  }
  get spellcheck() {
    return booleanAttribute.get(this, "spellcheck");
  }
  set spellcheck(value) {
    booleanAttribute.set(this, "spellcheck", value);
  }
  // String Accessors
  get accessKey() {
    return stringAttribute.get(this, "accesskey");
  }
  set accessKey(value) {
    stringAttribute.set(this, "accesskey", value);
  }
  get dir() {
    return stringAttribute.get(this, "dir");
  }
  set dir(value) {
    stringAttribute.set(this, "dir", value);
  }
  get lang() {
    return stringAttribute.get(this, "lang");
  }
  set lang(value) {
    stringAttribute.set(this, "lang", value);
  }
  get title() {
    return stringAttribute.get(this, "title");
  }
  set title(value) {
    stringAttribute.set(this, "title", value);
  }
  // DOM Level 0
  get onabort() {
    return level0.get(this, "onabort");
  }
  set onabort(value) {
    level0.set(this, "onabort", value);
  }
  get onblur() {
    return level0.get(this, "onblur");
  }
  set onblur(value) {
    level0.set(this, "onblur", value);
  }
  get oncancel() {
    return level0.get(this, "oncancel");
  }
  set oncancel(value) {
    level0.set(this, "oncancel", value);
  }
  get oncanplay() {
    return level0.get(this, "oncanplay");
  }
  set oncanplay(value) {
    level0.set(this, "oncanplay", value);
  }
  get oncanplaythrough() {
    return level0.get(this, "oncanplaythrough");
  }
  set oncanplaythrough(value) {
    level0.set(this, "oncanplaythrough", value);
  }
  get onchange() {
    return level0.get(this, "onchange");
  }
  set onchange(value) {
    level0.set(this, "onchange", value);
  }
  get onclick() {
    return level0.get(this, "onclick");
  }
  set onclick(value) {
    level0.set(this, "onclick", value);
  }
  get onclose() {
    return level0.get(this, "onclose");
  }
  set onclose(value) {
    level0.set(this, "onclose", value);
  }
  get oncontextmenu() {
    return level0.get(this, "oncontextmenu");
  }
  set oncontextmenu(value) {
    level0.set(this, "oncontextmenu", value);
  }
  get oncuechange() {
    return level0.get(this, "oncuechange");
  }
  set oncuechange(value) {
    level0.set(this, "oncuechange", value);
  }
  get ondblclick() {
    return level0.get(this, "ondblclick");
  }
  set ondblclick(value) {
    level0.set(this, "ondblclick", value);
  }
  get ondrag() {
    return level0.get(this, "ondrag");
  }
  set ondrag(value) {
    level0.set(this, "ondrag", value);
  }
  get ondragend() {
    return level0.get(this, "ondragend");
  }
  set ondragend(value) {
    level0.set(this, "ondragend", value);
  }
  get ondragenter() {
    return level0.get(this, "ondragenter");
  }
  set ondragenter(value) {
    level0.set(this, "ondragenter", value);
  }
  get ondragleave() {
    return level0.get(this, "ondragleave");
  }
  set ondragleave(value) {
    level0.set(this, "ondragleave", value);
  }
  get ondragover() {
    return level0.get(this, "ondragover");
  }
  set ondragover(value) {
    level0.set(this, "ondragover", value);
  }
  get ondragstart() {
    return level0.get(this, "ondragstart");
  }
  set ondragstart(value) {
    level0.set(this, "ondragstart", value);
  }
  get ondrop() {
    return level0.get(this, "ondrop");
  }
  set ondrop(value) {
    level0.set(this, "ondrop", value);
  }
  get ondurationchange() {
    return level0.get(this, "ondurationchange");
  }
  set ondurationchange(value) {
    level0.set(this, "ondurationchange", value);
  }
  get onemptied() {
    return level0.get(this, "onemptied");
  }
  set onemptied(value) {
    level0.set(this, "onemptied", value);
  }
  get onended() {
    return level0.get(this, "onended");
  }
  set onended(value) {
    level0.set(this, "onended", value);
  }
  get onerror() {
    return level0.get(this, "onerror");
  }
  set onerror(value) {
    level0.set(this, "onerror", value);
  }
  get onfocus() {
    return level0.get(this, "onfocus");
  }
  set onfocus(value) {
    level0.set(this, "onfocus", value);
  }
  get oninput() {
    return level0.get(this, "oninput");
  }
  set oninput(value) {
    level0.set(this, "oninput", value);
  }
  get oninvalid() {
    return level0.get(this, "oninvalid");
  }
  set oninvalid(value) {
    level0.set(this, "oninvalid", value);
  }
  get onkeydown() {
    return level0.get(this, "onkeydown");
  }
  set onkeydown(value) {
    level0.set(this, "onkeydown", value);
  }
  get onkeypress() {
    return level0.get(this, "onkeypress");
  }
  set onkeypress(value) {
    level0.set(this, "onkeypress", value);
  }
  get onkeyup() {
    return level0.get(this, "onkeyup");
  }
  set onkeyup(value) {
    level0.set(this, "onkeyup", value);
  }
  get onload() {
    return level0.get(this, "onload");
  }
  set onload(value) {
    level0.set(this, "onload", value);
  }
  get onloadeddata() {
    return level0.get(this, "onloadeddata");
  }
  set onloadeddata(value) {
    level0.set(this, "onloadeddata", value);
  }
  get onloadedmetadata() {
    return level0.get(this, "onloadedmetadata");
  }
  set onloadedmetadata(value) {
    level0.set(this, "onloadedmetadata", value);
  }
  get onloadstart() {
    return level0.get(this, "onloadstart");
  }
  set onloadstart(value) {
    level0.set(this, "onloadstart", value);
  }
  get onmousedown() {
    return level0.get(this, "onmousedown");
  }
  set onmousedown(value) {
    level0.set(this, "onmousedown", value);
  }
  get onmouseenter() {
    return level0.get(this, "onmouseenter");
  }
  set onmouseenter(value) {
    level0.set(this, "onmouseenter", value);
  }
  get onmouseleave() {
    return level0.get(this, "onmouseleave");
  }
  set onmouseleave(value) {
    level0.set(this, "onmouseleave", value);
  }
  get onmousemove() {
    return level0.get(this, "onmousemove");
  }
  set onmousemove(value) {
    level0.set(this, "onmousemove", value);
  }
  get onmouseout() {
    return level0.get(this, "onmouseout");
  }
  set onmouseout(value) {
    level0.set(this, "onmouseout", value);
  }
  get onmouseover() {
    return level0.get(this, "onmouseover");
  }
  set onmouseover(value) {
    level0.set(this, "onmouseover", value);
  }
  get onmouseup() {
    return level0.get(this, "onmouseup");
  }
  set onmouseup(value) {
    level0.set(this, "onmouseup", value);
  }
  get onmousewheel() {
    return level0.get(this, "onmousewheel");
  }
  set onmousewheel(value) {
    level0.set(this, "onmousewheel", value);
  }
  get onpause() {
    return level0.get(this, "onpause");
  }
  set onpause(value) {
    level0.set(this, "onpause", value);
  }
  get onplay() {
    return level0.get(this, "onplay");
  }
  set onplay(value) {
    level0.set(this, "onplay", value);
  }
  get onplaying() {
    return level0.get(this, "onplaying");
  }
  set onplaying(value) {
    level0.set(this, "onplaying", value);
  }
  get onprogress() {
    return level0.get(this, "onprogress");
  }
  set onprogress(value) {
    level0.set(this, "onprogress", value);
  }
  get onratechange() {
    return level0.get(this, "onratechange");
  }
  set onratechange(value) {
    level0.set(this, "onratechange", value);
  }
  get onreset() {
    return level0.get(this, "onreset");
  }
  set onreset(value) {
    level0.set(this, "onreset", value);
  }
  get onresize() {
    return level0.get(this, "onresize");
  }
  set onresize(value) {
    level0.set(this, "onresize", value);
  }
  get onscroll() {
    return level0.get(this, "onscroll");
  }
  set onscroll(value) {
    level0.set(this, "onscroll", value);
  }
  get onseeked() {
    return level0.get(this, "onseeked");
  }
  set onseeked(value) {
    level0.set(this, "onseeked", value);
  }
  get onseeking() {
    return level0.get(this, "onseeking");
  }
  set onseeking(value) {
    level0.set(this, "onseeking", value);
  }
  get onselect() {
    return level0.get(this, "onselect");
  }
  set onselect(value) {
    level0.set(this, "onselect", value);
  }
  get onshow() {
    return level0.get(this, "onshow");
  }
  set onshow(value) {
    level0.set(this, "onshow", value);
  }
  get onstalled() {
    return level0.get(this, "onstalled");
  }
  set onstalled(value) {
    level0.set(this, "onstalled", value);
  }
  get onsubmit() {
    return level0.get(this, "onsubmit");
  }
  set onsubmit(value) {
    level0.set(this, "onsubmit", value);
  }
  get onsuspend() {
    return level0.get(this, "onsuspend");
  }
  set onsuspend(value) {
    level0.set(this, "onsuspend", value);
  }
  get ontimeupdate() {
    return level0.get(this, "ontimeupdate");
  }
  set ontimeupdate(value) {
    level0.set(this, "ontimeupdate", value);
  }
  get ontoggle() {
    return level0.get(this, "ontoggle");
  }
  set ontoggle(value) {
    level0.set(this, "ontoggle", value);
  }
  get onvolumechange() {
    return level0.get(this, "onvolumechange");
  }
  set onvolumechange(value) {
    level0.set(this, "onvolumechange", value);
  }
  get onwaiting() {
    return level0.get(this, "onwaiting");
  }
  set onwaiting(value) {
    level0.set(this, "onwaiting", value);
  }
  get onauxclick() {
    return level0.get(this, "onauxclick");
  }
  set onauxclick(value) {
    level0.set(this, "onauxclick", value);
  }
  get ongotpointercapture() {
    return level0.get(this, "ongotpointercapture");
  }
  set ongotpointercapture(value) {
    level0.set(this, "ongotpointercapture", value);
  }
  get onlostpointercapture() {
    return level0.get(this, "onlostpointercapture");
  }
  set onlostpointercapture(value) {
    level0.set(this, "onlostpointercapture", value);
  }
  get onpointercancel() {
    return level0.get(this, "onpointercancel");
  }
  set onpointercancel(value) {
    level0.set(this, "onpointercancel", value);
  }
  get onpointerdown() {
    return level0.get(this, "onpointerdown");
  }
  set onpointerdown(value) {
    level0.set(this, "onpointerdown", value);
  }
  get onpointerenter() {
    return level0.get(this, "onpointerenter");
  }
  set onpointerenter(value) {
    level0.set(this, "onpointerenter", value);
  }
  get onpointerleave() {
    return level0.get(this, "onpointerleave");
  }
  set onpointerleave(value) {
    level0.set(this, "onpointerleave", value);
  }
  get onpointermove() {
    return level0.get(this, "onpointermove");
  }
  set onpointermove(value) {
    level0.set(this, "onpointermove", value);
  }
  get onpointerout() {
    return level0.get(this, "onpointerout");
  }
  set onpointerout(value) {
    level0.set(this, "onpointerout", value);
  }
  get onpointerover() {
    return level0.get(this, "onpointerover");
  }
  set onpointerover(value) {
    level0.set(this, "onpointerover", value);
  }
  get onpointerup() {
    return level0.get(this, "onpointerup");
  }
  set onpointerup(value) {
    level0.set(this, "onpointerup", value);
  }
  /* c8 ignore stop */
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/template-element.js
var tagName = "template";
var HTMLTemplateElement = class extends HTMLElement {
  constructor(ownerDocument) {
    super(ownerDocument, tagName);
    const content = this.ownerDocument.createDocumentFragment();
    (this[CONTENT] = content)[PRIVATE] = this;
  }
  get content() {
    if (this.hasChildNodes() && !this[CONTENT].hasChildNodes()) {
      for (const node of this.childNodes)
        this[CONTENT].appendChild(node.cloneNode(true));
    }
    return this[CONTENT];
  }
};
registerHTMLClass(tagName, HTMLTemplateElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/html-element.js
var HTMLHtmlElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "html") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/text-element.js
var { toString } = HTMLElement.prototype;
var TextElement = class extends HTMLElement {
  get innerHTML() {
    return this.textContent;
  }
  set innerHTML(html) {
    this.textContent = html;
  }
  toString() {
    const outerHTML = toString.call(this.cloneNode());
    return outerHTML.replace(/></, `>${this.textContent}<`);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/script-element.js
var tagName2 = "script";
var HTMLScriptElement = class extends TextElement {
  constructor(ownerDocument, localName = tagName2) {
    super(ownerDocument, localName);
  }
  get type() {
    return stringAttribute.get(this, "type");
  }
  set type(value) {
    stringAttribute.set(this, "type", value);
  }
  get src() {
    return stringAttribute.get(this, "src");
  }
  set src(value) {
    stringAttribute.set(this, "src", value);
  }
  get defer() {
    return booleanAttribute.get(this, "defer");
  }
  set defer(value) {
    booleanAttribute.set(this, "defer", value);
  }
  get crossOrigin() {
    return stringAttribute.get(this, "crossorigin");
  }
  set crossOrigin(value) {
    stringAttribute.set(this, "crossorigin", value);
  }
  get nomodule() {
    return booleanAttribute.get(this, "nomodule");
  }
  set nomodule(value) {
    booleanAttribute.set(this, "nomodule", value);
  }
  get referrerPolicy() {
    return stringAttribute.get(this, "referrerpolicy");
  }
  set referrerPolicy(value) {
    stringAttribute.set(this, "referrerpolicy", value);
  }
  get nonce() {
    return stringAttribute.get(this, "nonce");
  }
  set nonce(value) {
    stringAttribute.set(this, "nonce", value);
  }
  get async() {
    return booleanAttribute.get(this, "async");
  }
  set async(value) {
    booleanAttribute.set(this, "async", value);
  }
  get text() {
    return this.textContent;
  }
  set text(content) {
    this.textContent = content;
  }
};
registerHTMLClass(tagName2, HTMLScriptElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/frame-element.js
var HTMLFrameElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "frame") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/i-frame-element.js
var tagName3 = "iframe";
var HTMLIFrameElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName3) {
    super(ownerDocument, localName);
  }
  /* c8 ignore start */
  get src() {
    return stringAttribute.get(this, "src");
  }
  set src(value) {
    stringAttribute.set(this, "src", value);
  }
  get srcdoc() {
    return stringAttribute.get(this, "srcdoc");
  }
  set srcdoc(value) {
    stringAttribute.set(this, "srcdoc", value);
  }
  get name() {
    return stringAttribute.get(this, "name");
  }
  set name(value) {
    stringAttribute.set(this, "name", value);
  }
  get allow() {
    return stringAttribute.get(this, "allow");
  }
  set allow(value) {
    stringAttribute.set(this, "allow", value);
  }
  get allowFullscreen() {
    return booleanAttribute.get(this, "allowfullscreen");
  }
  set allowFullscreen(value) {
    booleanAttribute.set(this, "allowfullscreen", value);
  }
  get referrerPolicy() {
    return stringAttribute.get(this, "referrerpolicy");
  }
  set referrerPolicy(value) {
    stringAttribute.set(this, "referrerpolicy", value);
  }
  get loading() {
    return stringAttribute.get(this, "loading");
  }
  set loading(value) {
    stringAttribute.set(this, "loading", value);
  }
  /* c8 ignore stop */
};
registerHTMLClass(tagName3, HTMLIFrameElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/object-element.js
var HTMLObjectElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "object") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/head-element.js
var HTMLHeadElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "head") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/body-element.js
var HTMLBodyElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "body") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/style-element.js
var import_cssom = __toESM(require_lib(), 1);
var tagName4 = "style";
var HTMLStyleElement = class extends TextElement {
  constructor(ownerDocument, localName = tagName4) {
    super(ownerDocument, localName);
    this[SHEET] = null;
  }
  get sheet() {
    const sheet = this[SHEET];
    if (sheet !== null) {
      return sheet;
    }
    return this[SHEET] = (0, import_cssom.parse)(this.textContent);
  }
  get innerHTML() {
    return super.innerHTML || "";
  }
  set innerHTML(value) {
    super.textContent = value;
    this[SHEET] = null;
  }
  get innerText() {
    return super.innerText || "";
  }
  set innerText(value) {
    super.textContent = value;
    this[SHEET] = null;
  }
  get textContent() {
    return super.textContent || "";
  }
  set textContent(value) {
    super.textContent = value;
    this[SHEET] = null;
  }
};
registerHTMLClass(tagName4, HTMLStyleElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/time-element.js
var HTMLTimeElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "time") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/field-set-element.js
var HTMLFieldSetElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "fieldset") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/embed-element.js
var HTMLEmbedElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "embed") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/hr-element.js
var HTMLHRElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "hr") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/progress-element.js
var HTMLProgressElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "progress") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/paragraph-element.js
var HTMLParagraphElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "p") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/table-element.js
var HTMLTableElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "table") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/frame-set-element.js
var HTMLFrameSetElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "frameset") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/li-element.js
var HTMLLIElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "li") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/base-element.js
var HTMLBaseElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "base") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/data-list-element.js
var HTMLDataListElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "datalist") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/input-element.js
var tagName5 = "input";
var HTMLInputElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName5) {
    super(ownerDocument, localName);
  }
  /* c8 ignore start */
  get autofocus() {
    return booleanAttribute.get(this, "autofocus") || -1;
  }
  set autofocus(value) {
    booleanAttribute.set(this, "autofocus", value);
  }
  get disabled() {
    return booleanAttribute.get(this, "disabled");
  }
  set disabled(value) {
    booleanAttribute.set(this, "disabled", value);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(value) {
    this.setAttribute("name", value);
  }
  get placeholder() {
    return this.getAttribute("placeholder");
  }
  set placeholder(value) {
    this.setAttribute("placeholder", value);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(value) {
    this.setAttribute("type", value);
  }
  get value() {
    return stringAttribute.get(this, "value");
  }
  set value(value) {
    stringAttribute.set(this, "value", value);
  }
  /* c8 ignore stop */
};
registerHTMLClass(tagName5, HTMLInputElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/param-element.js
var HTMLParamElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "param") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/media-element.js
var HTMLMediaElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "media") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/audio-element.js
var HTMLAudioElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "audio") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/heading-element.js
var tagName6 = "h1";
var HTMLHeadingElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName6) {
    super(ownerDocument, localName);
  }
};
registerHTMLClass([tagName6, "h2", "h3", "h4", "h5", "h6"], HTMLHeadingElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/directory-element.js
var HTMLDirectoryElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "dir") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/quote-element.js
var HTMLQuoteElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "quote") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/canvas-element.js
var import_canvas = __toESM(require_canvas(), 1);
var { createCanvas } = import_canvas.default;
var tagName7 = "canvas";
var HTMLCanvasElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName7) {
    super(ownerDocument, localName);
    this[IMAGE] = createCanvas(300, 150);
  }
  get width() {
    return this[IMAGE].width;
  }
  set width(value) {
    numericAttribute.set(this, "width", value);
    this[IMAGE].width = value;
  }
  get height() {
    return this[IMAGE].height;
  }
  set height(value) {
    numericAttribute.set(this, "height", value);
    this[IMAGE].height = value;
  }
  getContext(type) {
    return this[IMAGE].getContext(type);
  }
  toDataURL(...args) {
    return this[IMAGE].toDataURL(...args);
  }
};
registerHTMLClass(tagName7, HTMLCanvasElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/legend-element.js
var HTMLLegendElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "legend") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/option-element.js
var tagName8 = "option";
var HTMLOptionElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName8) {
    super(ownerDocument, localName);
  }
  /* c8 ignore start */
  get value() {
    return stringAttribute.get(this, "value");
  }
  set value(value) {
    stringAttribute.set(this, "value", value);
  }
  /* c8 ignore stop */
  get selected() {
    return booleanAttribute.get(this, "selected");
  }
  set selected(value) {
    var _a;
    const option = (_a = this.parentElement) == null ? void 0 : _a.querySelector("option[selected]");
    if (option && option !== this)
      option.selected = false;
    booleanAttribute.set(this, "selected", value);
  }
};
registerHTMLClass(tagName8, HTMLOptionElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/span-element.js
var HTMLSpanElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "span") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/meter-element.js
var HTMLMeterElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "meter") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/video-element.js
var HTMLVideoElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "video") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/table-cell-element.js
var HTMLTableCellElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "td") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/title-element.js
var tagName9 = "title";
var HTMLTitleElement = class extends TextElement {
  constructor(ownerDocument, localName = tagName9) {
    super(ownerDocument, localName);
  }
};
registerHTMLClass(tagName9, HTMLTitleElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/output-element.js
var HTMLOutputElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "output") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/table-row-element.js
var HTMLTableRowElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "tr") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/data-element.js
var HTMLDataElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "data") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/menu-element.js
var HTMLMenuElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "menu") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/select-element.js
var tagName10 = "select";
var HTMLSelectElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName10) {
    super(ownerDocument, localName);
  }
  get options() {
    let children = new NodeList();
    let { firstElementChild } = this;
    while (firstElementChild) {
      if (firstElementChild.tagName === "OPTGROUP")
        children.push(...firstElementChild.children);
      else
        children.push(firstElementChild);
      firstElementChild = firstElementChild.nextElementSibling;
    }
    return children;
  }
  /* c8 ignore start */
  get disabled() {
    return booleanAttribute.get(this, "disabled");
  }
  set disabled(value) {
    booleanAttribute.set(this, "disabled", value);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(value) {
    this.setAttribute("name", value);
  }
  /* c8 ignore stop */
  get value() {
    var _a;
    return (_a = this.querySelector("option[selected]")) == null ? void 0 : _a.value;
  }
};
registerHTMLClass(tagName10, HTMLSelectElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/br-element.js
var HTMLBRElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "br") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/button-element.js
var tagName11 = "button";
var HTMLButtonElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName11) {
    super(ownerDocument, localName);
  }
  /* c8 ignore start */
  get disabled() {
    return booleanAttribute.get(this, "disabled");
  }
  set disabled(value) {
    booleanAttribute.set(this, "disabled", value);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(value) {
    this.setAttribute("name", value);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(value) {
    this.setAttribute("type", value);
  }
  /* c8 ignore stop */
};
registerHTMLClass(tagName11, HTMLButtonElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/map-element.js
var HTMLMapElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "map") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/opt-group-element.js
var HTMLOptGroupElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "optgroup") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/d-list-element.js
var HTMLDListElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "dl") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/text-area-element.js
var tagName12 = "textarea";
var HTMLTextAreaElement = class extends TextElement {
  constructor(ownerDocument, localName = tagName12) {
    super(ownerDocument, localName);
  }
  /* c8 ignore start */
  get disabled() {
    return booleanAttribute.get(this, "disabled");
  }
  set disabled(value) {
    booleanAttribute.set(this, "disabled", value);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(value) {
    this.setAttribute("name", value);
  }
  get placeholder() {
    return this.getAttribute("placeholder");
  }
  set placeholder(value) {
    this.setAttribute("placeholder", value);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(value) {
    this.setAttribute("type", value);
  }
  get value() {
    return this.textContent;
  }
  set value(content) {
    this.textContent = content;
  }
  /* c8 ignore stop */
};
registerHTMLClass(tagName12, HTMLTextAreaElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/font-element.js
var HTMLFontElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "font") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/div-element.js
var HTMLDivElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "div") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/link-element.js
var tagName13 = "link";
var HTMLLinkElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName13) {
    super(ownerDocument, localName);
  }
  /* c8 ignore start */
  // copy paste from img.src, already covered
  get disabled() {
    return booleanAttribute.get(this, "disabled");
  }
  set disabled(value) {
    booleanAttribute.set(this, "disabled", value);
  }
  get href() {
    return stringAttribute.get(this, "href");
  }
  set href(value) {
    stringAttribute.set(this, "href", value);
  }
  get hreflang() {
    return stringAttribute.get(this, "hreflang");
  }
  set hreflang(value) {
    stringAttribute.set(this, "hreflang", value);
  }
  get media() {
    return stringAttribute.get(this, "media");
  }
  set media(value) {
    stringAttribute.set(this, "media", value);
  }
  get rel() {
    return stringAttribute.get(this, "rel");
  }
  set rel(value) {
    stringAttribute.set(this, "rel", value);
  }
  get type() {
    return stringAttribute.get(this, "type");
  }
  set type(value) {
    stringAttribute.set(this, "type", value);
  }
  /* c8 ignore stop */
};
registerHTMLClass(tagName13, HTMLLinkElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/slot-element.js
var HTMLSlotElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "slot") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/form-element.js
var HTMLFormElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "form") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/image-element.js
var tagName14 = "img";
var HTMLImageElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName14) {
    super(ownerDocument, localName);
  }
  /* c8 ignore start */
  get alt() {
    return stringAttribute.get(this, "alt");
  }
  set alt(value) {
    stringAttribute.set(this, "alt", value);
  }
  get sizes() {
    return stringAttribute.get(this, "sizes");
  }
  set sizes(value) {
    stringAttribute.set(this, "sizes", value);
  }
  get src() {
    return stringAttribute.get(this, "src");
  }
  set src(value) {
    stringAttribute.set(this, "src", value);
  }
  get srcset() {
    return stringAttribute.get(this, "srcset");
  }
  set srcset(value) {
    stringAttribute.set(this, "srcset", value);
  }
  get title() {
    return stringAttribute.get(this, "title");
  }
  set title(value) {
    stringAttribute.set(this, "title", value);
  }
  get width() {
    return numericAttribute.get(this, "width");
  }
  set width(value) {
    numericAttribute.set(this, "width", value);
  }
  get height() {
    return numericAttribute.get(this, "height");
  }
  set height(value) {
    numericAttribute.set(this, "height", value);
  }
  /* c8 ignore stop */
};
registerHTMLClass(tagName14, HTMLImageElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/pre-element.js
var HTMLPreElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "pre") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/u-list-element.js
var HTMLUListElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "ul") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/meta-element.js
var tagName15 = "meta";
var HTMLMetaElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName15) {
    super(ownerDocument, localName);
  }
  /* c8 ignore start */
  get name() {
    return stringAttribute.get(this, "name");
  }
  set name(value) {
    stringAttribute.set(this, "name", value);
  }
  get httpEquiv() {
    return stringAttribute.get(this, "http-equiv");
  }
  set httpEquiv(value) {
    stringAttribute.set(this, "http-equiv", value);
  }
  get content() {
    return stringAttribute.get(this, "content");
  }
  set content(value) {
    stringAttribute.set(this, "content", value);
  }
  get charset() {
    return stringAttribute.get(this, "charset");
  }
  set charset(value) {
    stringAttribute.set(this, "charset", value);
  }
  get media() {
    return stringAttribute.get(this, "media");
  }
  set media(value) {
    stringAttribute.set(this, "media", value);
  }
  /* c8 ignore stop */
};
registerHTMLClass(tagName15, HTMLMetaElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/picture-element.js
var HTMLPictureElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "picture") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/area-element.js
var HTMLAreaElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "area") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/o-list-element.js
var HTMLOListElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "ol") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/table-caption-element.js
var HTMLTableCaptionElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "caption") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/anchor-element.js
var tagName16 = "a";
var HTMLAnchorElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName16) {
    super(ownerDocument, localName);
  }
  /* c8 ignore start */
  // copy paste from img.src, already covered
  get href() {
    return encodeURI(stringAttribute.get(this, "href"));
  }
  set href(value) {
    stringAttribute.set(this, "href", decodeURI(value));
  }
  get download() {
    return encodeURI(stringAttribute.get(this, "download"));
  }
  set download(value) {
    stringAttribute.set(this, "download", decodeURI(value));
  }
  get target() {
    return stringAttribute.get(this, "target");
  }
  set target(value) {
    stringAttribute.set(this, "target", value);
  }
  get type() {
    return stringAttribute.get(this, "type");
  }
  set type(value) {
    stringAttribute.set(this, "type", value);
  }
  /* c8 ignore stop */
};
registerHTMLClass(tagName16, HTMLAnchorElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/label-element.js
var HTMLLabelElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "label") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/unknown-element.js
var HTMLUnknownElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "unknown") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/mod-element.js
var HTMLModElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "mod") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/details-element.js
var HTMLDetailsElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "details") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/source-element.js
var tagName17 = "source";
var HTMLSourceElement = class extends HTMLElement {
  constructor(ownerDocument, localName = tagName17) {
    super(ownerDocument, localName);
  }
  /* c8 ignore start */
  get src() {
    return stringAttribute.get(this, "src");
  }
  set src(value) {
    stringAttribute.set(this, "src", value);
  }
  get srcset() {
    return stringAttribute.get(this, "srcset");
  }
  set srcset(value) {
    stringAttribute.set(this, "srcset", value);
  }
  get sizes() {
    return stringAttribute.get(this, "sizes");
  }
  set sizes(value) {
    stringAttribute.set(this, "sizes", value);
  }
  get type() {
    return stringAttribute.get(this, "type");
  }
  set type(value) {
    stringAttribute.set(this, "type", value);
  }
  /* c8 ignore stop */
};
registerHTMLClass(tagName17, HTMLSourceElement);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/track-element.js
var HTMLTrackElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "track") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/marquee-element.js
var HTMLMarqueeElement = class extends HTMLElement {
  constructor(ownerDocument, localName = "marquee") {
    super(ownerDocument, localName);
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/html-classes.js
var HTMLClasses = {
  HTMLElement,
  HTMLTemplateElement,
  HTMLHtmlElement,
  HTMLScriptElement,
  HTMLFrameElement,
  HTMLIFrameElement,
  HTMLObjectElement,
  HTMLHeadElement,
  HTMLBodyElement,
  HTMLStyleElement,
  HTMLTimeElement,
  HTMLFieldSetElement,
  HTMLEmbedElement,
  HTMLHRElement,
  HTMLProgressElement,
  HTMLParagraphElement,
  HTMLTableElement,
  HTMLFrameSetElement,
  HTMLLIElement,
  HTMLBaseElement,
  HTMLDataListElement,
  HTMLInputElement,
  HTMLParamElement,
  HTMLMediaElement,
  HTMLAudioElement,
  HTMLHeadingElement,
  HTMLDirectoryElement,
  HTMLQuoteElement,
  HTMLCanvasElement,
  HTMLLegendElement,
  HTMLOptionElement,
  HTMLSpanElement,
  HTMLMeterElement,
  HTMLVideoElement,
  HTMLTableCellElement,
  HTMLTitleElement,
  HTMLOutputElement,
  HTMLTableRowElement,
  HTMLDataElement,
  HTMLMenuElement,
  HTMLSelectElement,
  HTMLBRElement,
  HTMLButtonElement,
  HTMLMapElement,
  HTMLOptGroupElement,
  HTMLDListElement,
  HTMLTextAreaElement,
  HTMLFontElement,
  HTMLDivElement,
  HTMLLinkElement,
  HTMLSlotElement,
  HTMLFormElement,
  HTMLImageElement,
  HTMLPreElement,
  HTMLUListElement,
  HTMLMetaElement,
  HTMLPictureElement,
  HTMLAreaElement,
  HTMLOListElement,
  HTMLTableCaptionElement,
  HTMLAnchorElement,
  HTMLLabelElement,
  HTMLUnknownElement,
  HTMLModElement,
  HTMLDetailsElement,
  HTMLSourceElement,
  HTMLTrackElement,
  HTMLMarqueeElement
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/mime.js
var voidElements = { test: () => true };
var Mime = {
  "text/html": {
    docType: "<!DOCTYPE html>",
    ignoreCase: true,
    voidElements: /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i
  },
  "image/svg+xml": {
    docType: '<?xml version="1.0" encoding="utf-8"?>',
    ignoreCase: false,
    voidElements
  },
  "text/xml": {
    docType: '<?xml version="1.0" encoding="utf-8"?>',
    ignoreCase: false,
    voidElements
  },
  "application/xml": {
    docType: '<?xml version="1.0" encoding="utf-8"?>',
    ignoreCase: false,
    voidElements
  },
  "application/xhtml+xml": {
    docType: '<?xml version="1.0" encoding="utf-8"?>',
    ignoreCase: false,
    voidElements
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/custom-event.js
var CustomEvent = class extends GlobalEvent {
  constructor(type, eventInitDict = {}) {
    super(type, eventInitDict);
    this.detail = eventInitDict.detail;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/input-event.js
var InputEvent = class extends GlobalEvent {
  constructor(type, inputEventInit = {}) {
    super(type, inputEventInit);
    this.inputType = inputEventInit.inputType;
    this.data = inputEventInit.data;
    this.dataTransfer = inputEventInit.dataTransfer;
    this.isComposing = inputEventInit.isComposing || false;
    this.ranges = inputEventInit.ranges;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/image.js
var ImageClass = (ownerDocument) => (
  /**
   * @implements globalThis.Image
   */
  class Image extends HTMLImageElement {
    constructor(width, height) {
      super(ownerDocument);
      switch (arguments.length) {
        case 1:
          this.height = width;
          this.width = width;
          break;
        case 2:
          this.height = height;
          this.width = width;
          break;
      }
    }
  }
);

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/range.js
var deleteContents = ({ [START]: start, [END]: end }, fragment = null) => {
  setAdjacent(start[PREV], end[NEXT]);
  do {
    const after2 = getEnd(start);
    const next = after2 === end ? after2 : after2[NEXT];
    if (fragment)
      fragment.insertBefore(start, fragment[END]);
    else
      start.remove();
    start = next;
  } while (start !== end);
};
var Range = class {
  constructor() {
    this[START] = null;
    this[END] = null;
    this.commonAncestorContainer = null;
  }
  /* TODO: this is more complicated than it looks
    setStart(node, offset) {
      this[START] = node.childNodes[offset];
    }
  
    setEnd(node, offset) {
      this[END] = getEnd(node.childNodes[offset]);
    }
    //*/
  insertNode(newNode) {
    this[END].parentNode.insertBefore(newNode, this[START]);
  }
  selectNode(node) {
    this[START] = node;
    this[END] = getEnd(node);
  }
  surroundContents(parentNode) {
    parentNode.replaceChildren(this.extractContents());
  }
  setStartBefore(node) {
    this[START] = node;
  }
  setStartAfter(node) {
    this[START] = node.nextSibling;
  }
  setEndBefore(node) {
    this[END] = getEnd(node.previousSibling);
  }
  setEndAfter(node) {
    this[END] = getEnd(node);
  }
  cloneContents() {
    let { [START]: start, [END]: end } = this;
    const fragment = start.ownerDocument.createDocumentFragment();
    while (start !== end) {
      fragment.insertBefore(start.cloneNode(true), fragment[END]);
      start = getEnd(start);
      if (start !== end)
        start = start[NEXT];
    }
    return fragment;
  }
  deleteContents() {
    deleteContents(this);
  }
  extractContents() {
    const fragment = this[START].ownerDocument.createDocumentFragment();
    deleteContents(this, fragment);
    return fragment;
  }
  createContextualFragment(html) {
    const template = this.commonAncestorContainer.createElement("template");
    template.innerHTML = html;
    this.selectNode(template.content);
    return template.content;
  }
  cloneRange() {
    const range = new Range();
    range[START] = this[START];
    range[END] = this[END];
    return range;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/tree-walker.js
var isOK = ({ nodeType }, mask) => {
  switch (nodeType) {
    case ELEMENT_NODE:
      return mask & SHOW_ELEMENT;
    case TEXT_NODE:
      return mask & SHOW_TEXT;
    case COMMENT_NODE:
      return mask & SHOW_COMMENT;
  }
  return 0;
};
var TreeWalker = class {
  constructor(root, whatToShow = SHOW_ALL) {
    this.root = root;
    this.currentNode = root;
    this.whatToShow = whatToShow;
    let { [NEXT]: next, [END]: end } = root;
    if (root.nodeType === DOCUMENT_NODE) {
      const { documentElement } = root;
      next = documentElement;
      end = documentElement[END];
    }
    const nodes = [];
    while (next !== end) {
      if (isOK(next, whatToShow))
        nodes.push(next);
      next = next[NEXT];
    }
    this[PRIVATE] = { i: 0, nodes };
  }
  nextNode() {
    const $ = this[PRIVATE];
    this.currentNode = $.i < $.nodes.length ? $.nodes[$.i++] : null;
    return this.currentNode;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/interface/document.js
var query = (method, ownerDocument, selectors) => {
  let { [NEXT]: next, [END]: end } = ownerDocument;
  return method.call({ ownerDocument, [NEXT]: next, [END]: end }, selectors);
};
var globalExports = assign(
  {},
  Facades,
  HTMLClasses,
  {
    CustomEvent,
    Event: GlobalEvent,
    EventTarget: DOMEventTarget,
    InputEvent,
    NamedNodeMap,
    NodeList
  }
);
var window2 = /* @__PURE__ */ new WeakMap();
var Document = class extends NonElementParentNode {
  constructor(type) {
    super(null, "#document", DOCUMENT_NODE);
    this[CUSTOM_ELEMENTS] = { active: false, registry: null };
    this[MUTATION_OBSERVER] = { active: false, class: null };
    this[MIME] = Mime[type];
    this[DOCTYPE] = null;
    this[DOM_PARSER] = null;
    this[GLOBALS] = null;
    this[IMAGE] = null;
    this[UPGRADE] = null;
  }
  /**
   * @type {globalThis.Document['defaultView']}
   */
  get defaultView() {
    if (!window2.has(this))
      window2.set(this, new Proxy(globalThis, {
        set: (target, name, value) => {
          switch (name) {
            case "addEventListener":
            case "removeEventListener":
            case "dispatchEvent":
              this[EVENT_TARGET][name] = value;
              break;
            default:
              target[name] = value;
              break;
          }
          return true;
        },
        get: (globalThis2, name) => {
          switch (name) {
            case "addEventListener":
            case "removeEventListener":
            case "dispatchEvent":
              if (!this[EVENT_TARGET]) {
                const et = this[EVENT_TARGET] = new DOMEventTarget();
                et.dispatchEvent = et.dispatchEvent.bind(et);
                et.addEventListener = et.addEventListener.bind(et);
                et.removeEventListener = et.removeEventListener.bind(et);
              }
              return this[EVENT_TARGET][name];
            case "document":
              return this;
            case "navigator":
              return {
                userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
              };
            case "window":
              return window2.get(this);
            case "customElements":
              if (!this[CUSTOM_ELEMENTS].registry)
                this[CUSTOM_ELEMENTS] = new CustomElementRegistry(this);
              return this[CUSTOM_ELEMENTS];
            case "performance":
              return import_perf_hooks.performance;
            case "DOMParser":
              return this[DOM_PARSER];
            case "Image":
              if (!this[IMAGE])
                this[IMAGE] = ImageClass(this);
              return this[IMAGE];
            case "MutationObserver":
              if (!this[MUTATION_OBSERVER].class)
                this[MUTATION_OBSERVER] = new MutationObserverClass(this);
              return this[MUTATION_OBSERVER].class;
          }
          return this[GLOBALS] && this[GLOBALS][name] || globalExports[name] || globalThis2[name];
        }
      }));
    return window2.get(this);
  }
  get doctype() {
    const docType = this[DOCTYPE];
    if (docType)
      return docType;
    const { firstChild } = this;
    if (firstChild && firstChild.nodeType === DOCUMENT_TYPE_NODE)
      return this[DOCTYPE] = firstChild;
    return null;
  }
  set doctype(value) {
    if (/^([a-z:]+)(\s+system|\s+public(\s+"([^"]+)")?)?(\s+"([^"]+)")?/i.test(value)) {
      const { $1: name, $4: publicId, $6: systemId } = RegExp;
      this[DOCTYPE] = new DocumentType(this, name, publicId, systemId);
      knownSiblings(this, this[DOCTYPE], this[NEXT]);
    }
  }
  get documentElement() {
    return this.firstElementChild;
  }
  get isConnected() {
    return true;
  }
  /**
   * @protected
   */
  _getParent() {
    return this[EVENT_TARGET];
  }
  createAttribute(name) {
    return new Attr(this, name);
  }
  createComment(textContent) {
    return new Comment(this, textContent);
  }
  createDocumentFragment() {
    return new DocumentFragment(this);
  }
  createDocumentType(name, publicId, systemId) {
    return new DocumentType(this, name, publicId, systemId);
  }
  createElement(localName) {
    return new Element(this, localName);
  }
  createRange() {
    const range = new Range();
    range.commonAncestorContainer = this;
    return range;
  }
  createTextNode(textContent) {
    return new Text(this, textContent);
  }
  createTreeWalker(root, whatToShow = -1) {
    return new TreeWalker(root, whatToShow);
  }
  createNodeIterator(root, whatToShow = -1) {
    return this.createTreeWalker(root, whatToShow);
  }
  createEvent(name) {
    const event = create(name === "Event" ? new GlobalEvent("") : new CustomEvent(""));
    event.initEvent = event.initCustomEvent = (type, canBubble = false, cancelable = false, detail) => {
      defineProperties(event, {
        type: { value: type },
        canBubble: { value: canBubble },
        cancelable: { value: cancelable },
        detail: { value: detail }
      });
    };
    return event;
  }
  cloneNode(deep = false) {
    const {
      constructor,
      [CUSTOM_ELEMENTS]: customElements2,
      [DOCTYPE]: doctype
    } = this;
    const document = new constructor();
    document[CUSTOM_ELEMENTS] = customElements2;
    if (deep) {
      const end = document[END];
      const { childNodes } = this;
      for (let { length } = childNodes, i = 0; i < length; i++)
        document.insertBefore(childNodes[i].cloneNode(true), end);
      if (doctype)
        document[DOCTYPE] = childNodes[0];
    }
    return document;
  }
  importNode(externalNode) {
    const deep = 1 < arguments.length && !!arguments[1];
    const node = externalNode.cloneNode(deep);
    const { [CUSTOM_ELEMENTS]: customElements2 } = this;
    const { active } = customElements2;
    const upgrade = (element) => {
      const { ownerDocument, nodeType } = element;
      element.ownerDocument = this;
      if (active && ownerDocument !== this && nodeType === ELEMENT_NODE)
        customElements2.upgrade(element);
    };
    upgrade(node);
    if (deep) {
      switch (node.nodeType) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE: {
          let { [NEXT]: next, [END]: end } = node;
          while (next !== end) {
            if (next.nodeType === ELEMENT_NODE)
              upgrade(next);
            next = next[NEXT];
          }
          break;
        }
      }
    }
    return node;
  }
  toString() {
    return this.childNodes.join("");
  }
  querySelector(selectors) {
    return query(super.querySelector, this, selectors);
  }
  querySelectorAll(selectors) {
    return query(super.querySelectorAll, this, selectors);
  }
  /* c8 ignore start */
  getElementsByTagNameNS(_, name) {
    return this.getElementsByTagName(name);
  }
  createAttributeNS(_, name) {
    return this.createAttribute(name);
  }
  createElementNS(nsp, localName, options) {
    return nsp === SVG_NAMESPACE ? new SVGElement(this, localName, null) : this.createElement(localName, options);
  }
  /* c8 ignore stop */
};
setPrototypeOf(
  globalExports.Document = function Document2() {
    illegalConstructor();
  },
  Document
).prototype = Document.prototype;

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/html/document.js
var createHTMLElement = (ownerDocument, builtin, localName, options) => {
  if (!builtin && htmlClasses.has(localName)) {
    const Class = htmlClasses.get(localName);
    return new Class(ownerDocument, localName);
  }
  const { [CUSTOM_ELEMENTS]: { active, registry } } = ownerDocument;
  if (active) {
    const ce = builtin ? options.is : localName;
    if (registry.has(ce)) {
      const { Class } = registry.get(ce);
      const element = new Class(ownerDocument, localName);
      customElements.set(element, { connected: false });
      return element;
    }
  }
  return new HTMLElement(ownerDocument, localName);
};
var HTMLDocument = class extends Document {
  constructor() {
    super("text/html");
  }
  get all() {
    const nodeList = new NodeList();
    let { [NEXT]: next, [END]: end } = this;
    while (next !== end) {
      switch (next.nodeType) {
        case ELEMENT_NODE:
          nodeList.push(next);
          break;
      }
      next = next[NEXT];
    }
    return nodeList;
  }
  /**
   * @type HTMLHeadElement
   */
  get head() {
    const { documentElement } = this;
    let { firstElementChild } = documentElement;
    if (!firstElementChild || firstElementChild.tagName !== "HEAD") {
      firstElementChild = this.createElement("head");
      documentElement.prepend(firstElementChild);
    }
    return firstElementChild;
  }
  /**
   * @type HTMLBodyElement
   */
  get body() {
    const { head } = this;
    let { nextElementSibling: nextElementSibling2 } = head;
    if (!nextElementSibling2 || nextElementSibling2.tagName !== "BODY") {
      nextElementSibling2 = this.createElement("body");
      head.after(nextElementSibling2);
    }
    return nextElementSibling2;
  }
  /**
   * @type HTMLTitleElement
   */
  get title() {
    const { head } = this;
    let title = head.getElementsByTagName("title").shift();
    return title ? title.textContent : "";
  }
  set title(textContent) {
    const { head } = this;
    let title = head.getElementsByTagName("title").shift();
    if (title)
      title.textContent = textContent;
    else {
      head.insertBefore(
        this.createElement("title"),
        head.firstChild
      ).textContent = textContent;
    }
  }
  createElement(localName, options) {
    const builtin = !!(options && options.is);
    const element = createHTMLElement(this, builtin, localName, options);
    if (builtin)
      element.setAttribute("is", options.is);
    return element;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/svg/document.js
var SVGDocument = class extends Document {
  constructor() {
    super("image/svg+xml");
  }
  toString() {
    return this[MIME].docType + super.toString();
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/xml/document.js
var XMLDocument = class extends Document {
  constructor() {
    super("text/xml");
  }
  toString() {
    return this[MIME].docType + super.toString();
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/dom/parser.js
var DOMParser = class {
  /** @typedef {{ "text/html": HTMLDocument, "image/svg+xml": SVGDocument, "text/xml": XMLDocument }} MimeToDoc */
  /**
   * @template {keyof MimeToDoc} MIME
   * @param {string} markupLanguage
   * @param {MIME} mimeType
   * @returns {MimeToDoc[MIME]}
   */
  parseFromString(markupLanguage, mimeType, globals = null) {
    let isHTML = false, document;
    if (mimeType === "text/html") {
      isHTML = true;
      document = new HTMLDocument();
    } else if (mimeType === "image/svg+xml")
      document = new SVGDocument();
    else
      document = new XMLDocument();
    document[DOM_PARSER] = DOMParser;
    if (globals)
      document[GLOBALS] = globals;
    if (isHTML && markupLanguage === "...")
      markupLanguage = "<!doctype html><html><head></head><body></body></html>";
    return markupLanguage ? parseFromString(document, isHTML, markupLanguage) : document;
  }
};

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/shared/parse-json.js
var { parse: parse2 } = JSON;

// node_modules/.pnpm/linkedom@0.14.23/node_modules/linkedom/esm/index.js
var parseHTML = (html, globals = null) => new DOMParser().parseFromString(
  html,
  "text/html",
  globals
).defaultView;
function Document3() {
  illegalConstructor();
}
setPrototypeOf(Document3, Document).prototype = Document.prototype;

// src/features/shortcuts/utils/webHelper.ts
var cleanText = (text) => text.trim().replace(/(\n){4,}/g, "\n\n\n").replace(/ {3,}/g, "  ").replace(/\t/g, "").replace(/\n+(\s*\n)*/g, "\n");
var parseDocumentToReadabilityData = (doc) => {
  if (!doc) {
    return {
      title: "Could not parse the page.",
      body: "Could not parse the page.",
      success: false
    };
  }
  const parsed = new import_readability.Readability(doc).parse();
  if (!parsed || !parsed.textContent) {
    return {
      title: "Could not parse the page.",
      body: "Could not parse the page.",
      success: false
    };
  }
  const text = cleanText(cloneDeep_default(parsed.textContent));
  return { title: parsed.title, body: text, success: true };
};
async function getWebpageTitleAndText(url, html_str = "", withSnapshot = false) {
  let html = html_str;
  if (!html) {
    const fetchResponse = await fetchHtmlContent(url, {
      withSnapshot,
      autoFixUrl: true
    });
    if (fetchResponse.success) {
      html = fetchResponse.html;
    } else {
      return {
        title: "Could not fetch the page.",
        body: fetchResponse.html || `Could not fetch the page: Make sure the URL is correct.`,
        url,
        success: false
      };
    }
  }
  const doc = parseHTML(html).document;
  const result = parseDocumentToReadabilityData(doc);
  return {
    url,
    ...result
  };
}
async function fetchHtmlContent(url, options = {}) {
  const { withSnapshot, autoFixUrl } = options;
  let html = "";
  let response;
  try {
    let fixedUrl = url.startsWith("http") ? url : `https://${url}`;
    if (autoFixUrl) {
      const apiUrlObj = new URL(fixedUrl);
      const apiUrlHost = apiUrlObj.host;
      if (apiUrlHost.split(".").length === 2 && !apiUrlHost.startsWith("www")) {
        apiUrlObj.host = `www.${apiUrlObj.host}`;
        fixedUrl = apiUrlObj.toString();
      }
    }
    if (withSnapshot) {
      const snapshotData = await getSnapshotContent(fixedUrl);
      if (snapshotData.success) {
        html = snapshotData.content;
        return {
          html,
          success: true
        };
      }
    }
    let redirect_value = "error";
    if (fixedUrl.startsWith("http://www.baidu.com/link?url=") || fixedUrl.startsWith("https://www.baidu.com/link?url=")) {
      redirect_value = "follow";
    }
    response = await fetch(fixedUrl, {
      redirect: redirect_value
    });
  } catch (e) {
    if (autoFixUrl) {
      return fetchHtmlContent(url, { withSnapshot, autoFixUrl: false });
    }
    return {
      html: `Could not fetch the page: ${e}.
Make sure the URL is correct.`,
      success: false
    };
  }
  if (!response.ok) {
    return {
      html: `Could not fetch the page: ${response.status} ${response.statusText}`,
      success: false
    };
  }
  html = await response.text();
  return {
    html,
    success: true
  };
}
async function getSnapshotContent(url) {
  try {
    const host = new URL(url).host;
    if (host.includes("youtube") || host.includes("facebook") || host.includes("instagram")) {
      return {
        success: false,
        content: `Unable to request the snapshot of this url`
      };
    }
    const apiUrl = "https://webcache.googleusercontent.com/search?&strip=1&vwsrc=0&q=cache:" + encodeURIComponent(url);
    const response = await fetch(apiUrl, {
      redirect: "error"
    });
    if (response.ok && response.status === 200) {
      const resText = await response.text();
      return {
        success: true,
        content: resText
      };
    } else {
      return {
        success: false,
        content: `Unable to request the snapshot of this url`
      };
    }
  } catch (error) {
    return {
      success: false,
      content: `Unable to request the snapshot of this url`
    };
  }
}
var getWebpageUrlContent = async (url, proxyFetch = true) => {
  try {
    if (proxyFetch) {
      const response = await proxyFetchInBgScript(
        url,
        { redirect: "follow" },
        {
          responseType: "text",
          proxyTargetHost: url.includes("bing.com") ? "https://bing.com" : void 0
        }
      );
      const responseInfo = response.responseInfo || {};
      if (!responseInfo.ok) {
        const statusCode = responseInfo.type === "opaqueredirect" ? 301 : responseInfo.status;
        throw {
          status: statusCode,
          statusText: `Failed to fetch: ${statusCode} ${responseInfo.statusText}`
        };
      }
      return {
        status: responseInfo.status,
        html: response.data,
        url: responseInfo.url || url,
        success: true
      };
    } else {
      const response = await fetch(url, { redirect: "follow" });
      if (!response.ok) {
        const statusCode = response.type === "opaqueredirect" ? 301 : response.status;
        throw {
          status: statusCode,
          statusText: `Failed to fetch: ${statusCode} ${response.statusText}`
        };
      }
      return {
        status: response.status,
        html: await response.text(),
        url: response.url,
        success: true
      };
    }
  } catch (e) {
    if (e.status === 301 || e.status === 429) {
      return {
        status: 301,
        html: ``,
        url,
        success: false
      };
    }
    return {
      status: 404,
      html: `Could not fetch the page: ${e.message}.
Make sure the URL is correct.`,
      url,
      success: false
    };
  }
};
async function getWebpageOriginHtml(url) {
  let html = "";
  try {
    const htmlContent = await fetchHtmlContent(url, { autoFixUrl: true });
    html = htmlContent.html;
    html = cleanText(html);
    if (html.length > 8e3) {
      html = html.slice(0, 8e3);
    }
    return {
      html,
      url,
      success: true
    };
  } catch (error) {
    return {
      html: `Could not fetch the page: ${error}.
Make sure the URL is correct.`,
      url,
      success: false
    };
  }
}

export {
  parseHTML,
  parseDocumentToReadabilityData,
  getWebpageTitleAndText,
  getWebpageUrlContent,
  getWebpageOriginHtml,
  AuthStatusMessageInit,
  LIMIT_WEB_ACCESS_COUNT_STORAGE_KEY,
  UseChatGPTPlusChat,
  BardChat,
  askChatGPTQuestionWithProvider,
  askChatGPTQuestionWithFreeAI,
  BingChat,
  ChatSystem,
  getChatGPTAccessToken,
  ChatGPTDaemonProcess,
  socket_default,
  OpenAIChat,
  MaxAIClaudeChat,
  FreeAIChat,
  GeminiChat,
  ClaudeChat
};
