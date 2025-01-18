"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS({
    "node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js"(exports, module) {
      !function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
      }(exports, function() {
        "use strict";
        var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
          var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
          return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
        } }, m = function(t2, e2, n2) {
          var r2 = String(t2);
          return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
        }, v = { s: m, z: function(t2) {
          var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
          return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
        }, m: function t2(e2, n2) {
          if (e2.date() < n2.date()) return -t2(n2, e2);
          var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
          return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
        }, a: function(t2) {
          return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
        }, p: function(t2) {
          return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t2) {
          return void 0 === t2;
        } }, g = "en", D = {};
        D[g] = M;
        var p = "$isDayjsObject", S = function(t2) {
          return t2 instanceof _ || !(!t2 || !t2[p]);
        }, w = function t2(e2, n2, r2) {
          var i2;
          if (!e2) return g;
          if ("string" == typeof e2) {
            var s2 = e2.toLowerCase();
            D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
            var u2 = e2.split("-");
            if (!i2 && u2.length > 1) return t2(u2[0]);
          } else {
            var a2 = e2.name;
            D[a2] = e2, i2 = a2;
          }
          return !r2 && i2 && (g = i2), i2 || !r2 && g;
        }, O = function(t2, e2) {
          if (S(t2)) return t2.clone();
          var n2 = "object" == typeof e2 ? e2 : {};
          return n2.date = t2, n2.args = arguments, new _(n2);
        }, b = v;
        b.l = w, b.i = S, b.w = function(t2, e2) {
          return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
        };
        var _ = function() {
          function M2(t2) {
            this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
          }
          var m2 = M2.prototype;
          return m2.parse = function(t2) {
            this.$d = function(t3) {
              var e2 = t3.date, n2 = t3.utc;
              if (null === e2) return /* @__PURE__ */ new Date(NaN);
              if (b.u(e2)) return /* @__PURE__ */ new Date();
              if (e2 instanceof Date) return new Date(e2);
              if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                var r2 = e2.match($);
                if (r2) {
                  var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                  return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                }
              }
              return new Date(e2);
            }(t2), this.init();
          }, m2.init = function() {
            var t2 = this.$d;
            this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
          }, m2.$utils = function() {
            return b;
          }, m2.isValid = function() {
            return !(this.$d.toString() === l);
          }, m2.isSame = function(t2, e2) {
            var n2 = O(t2);
            return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
          }, m2.isAfter = function(t2, e2) {
            return O(t2) < this.startOf(e2);
          }, m2.isBefore = function(t2, e2) {
            return this.endOf(e2) < O(t2);
          }, m2.$g = function(t2, e2, n2) {
            return b.u(t2) ? this[e2] : this.set(n2, t2);
          }, m2.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m2.valueOf = function() {
            return this.$d.getTime();
          }, m2.startOf = function(t2, e2) {
            var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
              var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
              return r2 ? i2 : i2.endOf(a);
            }, $2 = function(t3, e3) {
              return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
            switch (f2) {
              case h:
                return r2 ? l2(1, 0) : l2(31, 11);
              case c:
                return r2 ? l2(1, M3) : l2(0, M3 + 1);
              case o:
                var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
              case a:
              case d:
                return $2(v2 + "Hours", 0);
              case u:
                return $2(v2 + "Minutes", 1);
              case s:
                return $2(v2 + "Seconds", 2);
              case i:
                return $2(v2 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m2.endOf = function(t2) {
            return this.startOf(t2, false);
          }, m2.$set = function(t2, e2) {
            var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
            if (o2 === c || o2 === h) {
              var y2 = this.clone().set(d, 1);
              y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
            } else l2 && this.$d[l2]($2);
            return this.init(), this;
          }, m2.set = function(t2, e2) {
            return this.clone().$set(t2, e2);
          }, m2.get = function(t2) {
            return this[b.p(t2)]();
          }, m2.add = function(r2, f2) {
            var d2, l2 = this;
            r2 = Number(r2);
            var $2 = b.p(f2), y2 = function(t2) {
              var e2 = O(l2);
              return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
            };
            if ($2 === c) return this.set(c, this.$M + r2);
            if ($2 === h) return this.set(h, this.$y + r2);
            if ($2 === a) return y2(1);
            if ($2 === o) return y2(7);
            var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
            return b.w(m3, this);
          }, m2.subtract = function(t2, e2) {
            return this.add(-1 * t2, e2);
          }, m2.format = function(t2) {
            var e2 = this, n2 = this.$locale();
            if (!this.isValid()) return n2.invalidDate || l;
            var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
              return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
            }, d2 = function(t3) {
              return b.s(s2 % 12 || 12, t3, "0");
            }, $2 = f2 || function(t3, e3, n3) {
              var r3 = t3 < 12 ? "AM" : "PM";
              return n3 ? r3.toLowerCase() : r3;
            };
            return r2.replace(y, function(t3, r3) {
              return r3 || function(t4) {
                switch (t4) {
                  case "YY":
                    return String(e2.$y).slice(-2);
                  case "YYYY":
                    return b.s(e2.$y, 4, "0");
                  case "M":
                    return a2 + 1;
                  case "MM":
                    return b.s(a2 + 1, 2, "0");
                  case "MMM":
                    return h2(n2.monthsShort, a2, c2, 3);
                  case "MMMM":
                    return h2(c2, a2);
                  case "D":
                    return e2.$D;
                  case "DD":
                    return b.s(e2.$D, 2, "0");
                  case "d":
                    return String(e2.$W);
                  case "dd":
                    return h2(n2.weekdaysMin, e2.$W, o2, 2);
                  case "ddd":
                    return h2(n2.weekdaysShort, e2.$W, o2, 3);
                  case "dddd":
                    return o2[e2.$W];
                  case "H":
                    return String(s2);
                  case "HH":
                    return b.s(s2, 2, "0");
                  case "h":
                    return d2(1);
                  case "hh":
                    return d2(2);
                  case "a":
                    return $2(s2, u2, true);
                  case "A":
                    return $2(s2, u2, false);
                  case "m":
                    return String(u2);
                  case "mm":
                    return b.s(u2, 2, "0");
                  case "s":
                    return String(e2.$s);
                  case "ss":
                    return b.s(e2.$s, 2, "0");
                  case "SSS":
                    return b.s(e2.$ms, 3, "0");
                  case "Z":
                    return i2;
                }
                return null;
              }(t3) || i2.replace(":", "");
            });
          }, m2.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m2.diff = function(r2, d2, l2) {
            var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
              return b.m(y2, m3);
            };
            switch (M3) {
              case h:
                $2 = D2() / 12;
                break;
              case c:
                $2 = D2();
                break;
              case f:
                $2 = D2() / 3;
                break;
              case o:
                $2 = (g2 - v2) / 6048e5;
                break;
              case a:
                $2 = (g2 - v2) / 864e5;
                break;
              case u:
                $2 = g2 / n;
                break;
              case s:
                $2 = g2 / e;
                break;
              case i:
                $2 = g2 / t;
                break;
              default:
                $2 = g2;
            }
            return l2 ? $2 : b.a($2);
          }, m2.daysInMonth = function() {
            return this.endOf(c).$D;
          }, m2.$locale = function() {
            return D[this.$L];
          }, m2.locale = function(t2, e2) {
            if (!t2) return this.$L;
            var n2 = this.clone(), r2 = w(t2, e2, true);
            return r2 && (n2.$L = r2), n2;
          }, m2.clone = function() {
            return b.w(this.$d, this);
          }, m2.toDate = function() {
            return new Date(this.valueOf());
          }, m2.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m2.toISOString = function() {
            return this.$d.toISOString();
          }, m2.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        }(), k = _.prototype;
        return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
          k[t2[1]] = function(e2) {
            return this.$g(e2, t2[0], t2[1]);
          };
        }), O.extend = function(t2, e2) {
          return t2.$i || (t2(e2, _, O), t2.$i = true), O;
        }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
          return O(1e3 * t2);
        }, O.en = D[g], O.Ls = D, O.p = {}, O;
      });
    }
  });

  // src/constants.ts
  var DEFAULT_FILENAME_FORMAT = `{username}-{datetime}-{id}`;
  var DEFAULT_DATETIME_FORMAT = "YYYYMMDD_HHmmss";
  var CLASS_CUSTOM_BUTTON = "custom-btn";

  // src/content/highlights.ts
  var import_dayjs2 = __toESM(require_dayjs_min(), 1);

  // src/content/utils.ts
  var import_dayjs = __toESM(require_dayjs_min(), 1);
  function openInNewTab(url) {
    try {
      chrome.runtime.sendMessage({ type: "open_url", data: url });
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }
  async function forceDownload(blob, filename, extension) {
    const { setting_format_replace_jpeg_with_jpg } = await chrome.storage.sync.get(["setting_format_replace_jpeg_with_jpg"]);
    if (setting_format_replace_jpeg_with_jpg) {
      extension = extension.replace("jpeg", "jpg");
    }
    const a = document.createElement("a");
    a.download = filename + "." + extension;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  function getMediaName(url) {
    const name = url.split("?")[0].split("/").pop();
    return name ? name.substring(0, name.lastIndexOf(".")) : url;
  }
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash >>> 0;
  }
  async function downloadResource({ url, username, datetime, fileId }) {
    console.log(`Downloading ${url}`);
    const {
      setting_format_datetime = DEFAULT_DATETIME_FORMAT,
      setting_format_filename = DEFAULT_FILENAME_FORMAT,
      setting_format_use_hash_id
    } = await chrome.storage.sync.get(["setting_format_datetime", "setting_format_filename", "setting_format_use_hash_id"]);
    if (setting_format_use_hash_id && fileId) {
      fileId = hashCode(fileId).toString();
    }
    let filename = fileId;
    if (username && datetime && fileId) {
      console.log(`username: ${username}, datetime: ${datetime}, fileId: ${fileId}`);
      datetime = (0, import_dayjs.default)(datetime).format(setting_format_datetime);
      filename = setting_format_filename.replace(/{username}/g, username).replace(/{datetime}/g, datetime).replace(/{id}/g, fileId);
    }
    if (!filename) {
      filename = getMediaName(url);
    }
    if (url.startsWith("blob:")) {
      forceDownload(url, filename, "mp4");
      return;
    }
    fetch(url, {
      headers: new Headers({
        Origin: location.origin
      }),
      mode: "cors"
    }).then((response) => response.blob()).then((blob) => {
      const extension = blob.type.split("/").pop();
      const blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename, extension || "jpg");
    }).catch((e) => console.error(e));
  }
  var mediaInfoCache = /* @__PURE__ */ new Map();
  var mediaIdCache = /* @__PURE__ */ new Map();
  var findAppId = () => {
    const appIdPattern = /"X-IG-App-ID":"([\d]+)"/;
    const bodyScripts = document.querySelectorAll("body > script");
    for (let i = 0; i < bodyScripts.length; ++i) {
      const match = bodyScripts[i].text.match(appIdPattern);
      if (match) return match[1];
    }
    console.log("Cannot find app id");
    return null;
  };
  function findPostId(articleNode) {
    const pathname = window.location.pathname;
    if (pathname.startsWith("/reels/")) {
      return pathname.split("/")[2];
    } else if (pathname.startsWith("/stories/")) {
      return pathname.split("/")[3];
    } else if (pathname.startsWith("/reel/")) {
      return pathname.split("/")[2];
    }
    const postIdPattern = /^\/p\/([^/]+)\//;
    const aNodes = articleNode.querySelectorAll("a");
    for (let i = 0; i < aNodes.length; ++i) {
      const link = aNodes[i].getAttribute("href");
      if (link) {
        const match = link.match(postIdPattern);
        if (match) return match[1];
      }
    }
    return null;
  }
  var findMediaId = async (postId) => {
    const mediaIdPattern = /instagram:\/\/media\?id=(\d+)|["' ]media_id["' ]:["' ](\d+)["' ]/;
    const match = window.location.href.match(/www.instagram.com\/stories\/[^/]+\/(\d+)/);
    if (match) return match[1];
    if (!mediaIdCache.has(postId)) {
      const postUrl = `https://www.instagram.com/p/${postId}/`;
      const resp = await fetch(postUrl);
      const text = await resp.text();
      const idMatch = text.match(mediaIdPattern);
      if (!idMatch) return null;
      let mediaId = null;
      for (let i = 0; i < idMatch.length; ++i) {
        if (idMatch[i]) mediaId = idMatch[i];
      }
      if (!mediaId) return null;
      mediaIdCache.set(postId, mediaId);
    }
    return mediaIdCache.get(postId);
  };
  var getImgOrVedioUrl = (item) => {
    if ("video_versions" in item) {
      return item.video_versions[0].url;
    } else {
      return item.image_versions2.candidates[0].url;
    }
  };
  var getUrlFromInfoApi = async (articleNode, mediaIdx = 0) => {
    try {
      const appId = findAppId();
      if (!appId) {
        console.log("Cannot find appid");
        return null;
      }
      const postId = findPostId(articleNode);
      if (!postId) {
        console.log("Cannot find post id");
        return null;
      }
      const mediaId = await findMediaId(postId);
      if (!mediaId) {
        console.log("Cannot find media id");
        return null;
      }
      if (!mediaInfoCache.has(mediaId)) {
        const url = "https://i.instagram.com/api/v1/media/" + mediaId + "/info/";
        const resp = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "*/*",
            "X-IG-App-ID": appId
          },
          credentials: "include",
          mode: "cors"
        });
        if (resp.status !== 200) {
          console.log(`Fetch info API failed with status code: ${resp.status}`);
          return null;
        }
        const respJson = await resp.json();
        mediaInfoCache.set(mediaId, respJson);
      }
      const infoJson = mediaInfoCache.get(mediaId);
      const data = infoJson.items[0];
      if ("carousel_media" in data) {
        const item = data.carousel_media[Math.max(mediaIdx, 0)];
        return {
          ...item,
          url: getImgOrVedioUrl(item),
          taken_at: data.taken_at,
          owner: item.owner?.username || data.owner.username,
          coauthor_producers: data.coauthor_producers?.map((i) => i.username) || []
        };
      } else {
        return {
          ...data,
          url: getImgOrVedioUrl(data),
          owner: data.owner.username,
          coauthor_producers: data.coauthor_producers?.map((i) => i.username) || []
        };
      }
    } catch (e) {
      console.log(`Uncatched in getUrlFromInfoApi(): ${e}
${e.stack}`);
      return null;
    }
  };
  function adjustVideoButton(btns) {
    btns.forEach((i) => {
      const btn = i.parentNode?.parentNode?.parentNode?.parentNode;
      if (btn instanceof HTMLElement) {
        btn.style.zIndex = "999";
        btn.style.bottom = "3rem";
      }
    });
  }
  function getParentArticleNode(node) {
    if (node === null) return null;
    if (node.tagName === "ARTICLE") {
      return node;
    }
    return getParentArticleNode(node.parentElement);
  }
  function getParentSectionNode(node) {
    if (node === null) return null;
    if (node.tagName === "SECTION") {
      return node;
    }
    return getParentSectionNode(node.parentElement);
  }
  async function handleVideo() {
    const { setting_enable_video_controls } = await chrome.storage.sync.get(["setting_enable_video_controls"]);
    if (!setting_enable_video_controls) return;
    const videos = document.querySelectorAll("video");
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].controls === true) continue;
      videos[i].style.zIndex = "1";
      videos[i].style.position = "relative";
      videos[i].controls = true;
      videos[i].onvolumechange = () => {
        const isMutingBtn = videos[i].parentElement?.querySelector(
          'path[d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z"]'
        );
        const isUnmutingBtn = videos[i].parentElement?.querySelector(
          'path[d="M16.636 7.028a1.5 1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0 1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981 8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59 8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0 0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0 0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1 0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0 1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z"]'
        );
        if (videos[i].muted === false && isMutingBtn) {
          isMutingBtn.parentElement?.parentElement?.parentElement?.click();
        }
        if (videos[i].muted === true && isUnmutingBtn) {
          isUnmutingBtn.parentElement?.parentElement?.parentElement?.click();
        }
      };
      const btns = videos[i].parentNode?.querySelectorAll("button svg path");
      if (btns) {
        adjustVideoButton(btns);
      }
    }
  }
  var checkType = () => {
    if (navigator && navigator.userAgent && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      if (navigator && navigator.userAgent && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return "ios";
      } else {
        return "android";
      }
    } else {
      return "pc";
    }
  };
  async function fetchHtml() {
    const resp = await fetch(window.location.href, {
      referrerPolicy: "no-referrer"
    });
    const content = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    return doc.querySelectorAll("script");
  }

  // src/content/highlights.ts
  function getSectionNode(target) {
    let sectionNode = target;
    while (sectionNode.tagName !== "SECTION" && sectionNode.parentElement) {
      sectionNode = sectionNode.parentElement;
    }
    return sectionNode;
  }
  function findHighlight(obj) {
    for (const key in obj) {
      if (key === "xdt_api__v1__feed__reels_media__connection") {
        return obj[key];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        const result = findHighlight(obj[key]);
        if (result) {
          return result;
        }
      }
    }
  }
  async function highlightsOnClicked(target) {
    const sectionNode = getSectionNode(target);
    const pathname = window.location.pathname;
    const pathnameArr = pathname.split("/");
    const final = (url, filenameObj) => {
      if (target.className.includes("download-btn")) {
        if (filenameObj) {
          downloadResource({
            url,
            ...filenameObj
          });
        } else {
          let posterName = "highlights";
          for (const item of sectionNode.querySelectorAll("a[role=link]")) {
            const hrefArr = item.getAttribute("href")?.split("/").filter((_) => _);
            if (hrefArr?.length === 1) {
              posterName = hrefArr[1];
              break;
            }
          }
          const postTime = [...sectionNode.querySelectorAll("time")].find((i) => i.classList.length !== 0)?.getAttribute("datetime");
          downloadResource({
            url,
            username: posterName,
            datetime: postTime,
            fileId: getMediaName(url)
          });
        }
      } else {
        openInNewTab(url);
      }
    };
    const handleMeidas = (data) => {
      const media = data.items[mediaIndex];
      const url = media.video_versions?.[0].url || media.image_versions2.candidates[0].url;
      final(url, {
        username: data.user.username,
        datetime: import_dayjs2.default.unix(media.taken_at),
        fileId: getMediaName(url)
      });
    };
    let mediaIndex = 0;
    target.parentElement?.firstElementChild?.querySelectorAll(":scope>div").forEach((i, idx) => {
      if (i.childNodes.length === 1) {
        mediaIndex = idx;
      }
    });
    if (checkType() === "android") {
      sectionNode.querySelectorAll("header>div:nth-child(1)>div").forEach((item, index) => {
        item.querySelectorAll("div").forEach((i) => {
          if (i.classList.length === 2) {
            mediaIndex = index;
          }
        });
      });
      const { reels_media } = await chrome.storage.local.get(["reels_media"]);
      const itemOnAndroid = (reels_media || []).find((i) => i.id === "highlight:" + pathnameArr[3]);
      if (itemOnAndroid) {
        handleMeidas(itemOnAndroid);
        return;
      }
      for (const item of sectionNode.querySelectorAll("img")) {
        if (item.srcset !== "") {
          final(item.src);
          return;
        }
      }
    }
    const { highlights_data } = await chrome.storage.local.get(["highlights_data"]);
    const localData = new Map(highlights_data).get("highlight:" + pathnameArr[3]);
    if (localData) {
      handleMeidas(localData);
      return;
    }
    for (const script of window.document.scripts) {
      try {
        const innerHTML = script.innerHTML;
        const data = JSON.parse(innerHTML);
        if (innerHTML.includes("xdt_api__v1__feed__reels_media__connection")) {
          const res = findHighlight(data);
          if (res) {
            handleMeidas(res.edges[0].node);
            return;
          }
        }
      } catch {
      }
    }
    const videoUrl = sectionNode.querySelector("video")?.getAttribute("src");
    if (videoUrl) {
      final(videoUrl);
      return;
    }
    for (const item of sectionNode.querySelectorAll('img[referrerpolicy="origin-when-cross-origin"]')) {
      if (item.classList.length > 1) {
        final(item.src);
        return;
      }
    }
    alert("download highlights failed!");
  }

  // src/content/post.ts
  var import_dayjs3 = __toESM(require_dayjs_min(), 1);
  async function fetchVideoURL(articleNode, videoElem) {
    const poster = videoElem.getAttribute("poster");
    const timeNodes = articleNode.querySelectorAll("time");
    const posterUrl = timeNodes[timeNodes.length - 1].parentNode.parentNode.href;
    const posterPattern = /\/([^/?]*)\?/;
    const posterMatch = poster?.match(posterPattern);
    const postFileName = posterMatch?.[1];
    const resp = await fetch(posterUrl);
    const content = await resp.text();
    const pattern = new RegExp(`${postFileName}.*?video_versions.*?url":("[^"]*")`, "s");
    const match = content.match(pattern);
    let videoUrl = JSON.parse(match?.[1] ?? "");
    videoUrl = videoUrl.replace(/^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/g, "https://scontent.cdninstagram.com");
    videoElem.setAttribute("videoURL", videoUrl);
    return videoUrl;
  }
  var getVideoSrc = async (articleNode, videoElem) => {
    let url = videoElem.getAttribute("src");
    if (videoElem.hasAttribute("videoURL")) {
      url = videoElem.getAttribute("videoURL");
    } else if (url === null || url.includes("blob")) {
      url = await fetchVideoURL(articleNode, videoElem);
    }
    return url;
  };
  async function postGetUrl(articleNode) {
    let url, res;
    let mediaIndex = 0;
    if (articleNode.querySelectorAll("li[style][class]").length === 0) {
      res = await getUrlFromInfoApi(articleNode);
      url = res?.url;
      if (!url) {
        const videoElem = articleNode.querySelector("article  div > video");
        const imgElem = articleNode.querySelector("article  div[role] div > img");
        if (videoElem) {
          if (videoElem) {
            url = await getVideoSrc(articleNode, videoElem);
          }
        } else if (imgElem) {
          url = imgElem.getAttribute("src");
        } else {
          console.log("Err: not find media at handle post single");
        }
      }
    } else {
      const isPostView = window.location.pathname.startsWith("/p/");
      let dotsList;
      if (isPostView) {
        dotsList = articleNode.querySelectorAll(`:scope > div > div > div > div:nth-child(2)>div`);
      } else {
        if (checkType() === "pc") {
          dotsList = articleNode.querySelector("ul")?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.nextElementSibling?.childNodes || [];
        } else {
          dotsList = articleNode.querySelectorAll(`:scope > div > div:nth-child(2) > div>div>div>div>div>div:nth-child(2)>div`);
        }
      }
      if (dotsList.length === 0) {
        const imgList = articleNode.querySelectorAll(`${isPostView ? ":scope>div>div:nth-child(1)" : ""} li img`);
        const { x, right } = articleNode.getBoundingClientRect();
        for (const item of [...imgList]) {
          const rect = item.getBoundingClientRect();
          if (rect.x > x && rect.right < right) {
            url = item.getAttribute("src");
            return { url };
          }
        }
        return null;
      }
      mediaIndex = [...dotsList].findIndex((i) => i.classList.length === 2);
      res = await getUrlFromInfoApi(articleNode, mediaIndex);
      url = res?.url;
      if (!url) {
        const listElements = [
          ...articleNode.querySelectorAll(
            `:scope > div > div:nth-child(${isPostView ? 1 : 2}) > div > div:nth-child(1) ul li[style*="translateX"]`
          )
        ];
        const listElementWidth = Math.max(...listElements.map((element) => element.clientWidth));
        const positionsMap = listElements.reduce((result, element) => {
          const position = Math.round(Number(element.style.transform.match(/-?(\d+)/)?.[1]) / listElementWidth);
          return { ...result, [position]: element };
        }, {});
        const node = positionsMap[mediaIndex];
        const videoElem = node.querySelector("video");
        const imgElem = node.querySelector("img");
        if (videoElem) {
          url = await getVideoSrc(articleNode, videoElem);
        } else if (imgElem) {
          url = imgElem.getAttribute("src");
        }
      }
    }
    return { url, res };
  }
  async function postOnClicked(target) {
    try {
      const articleNode = getParentArticleNode(target);
      if (!articleNode) throw new Error("Cannot find article node");
      const data = await postGetUrl(articleNode);
      if (!data?.url) throw new Error("Cannot get url");
      const { url, res } = data;
      console.log("post url=", url);
      if (target.className.includes("download-btn")) {
        let postTime, posterName;
        if (res) {
          posterName = res.owner;
          postTime = res.taken_at * 1e3;
        } else {
          postTime = articleNode.querySelector("time")?.getAttribute("datetime");
          posterName = articleNode.querySelector("a")?.getAttribute("href")?.replace(/\//g, "");
          const tagNode = document.querySelector(
            'path[d="M21.334 23H2.666a1 1 0 0 1-1-1v-1.354a6.279 6.279 0 0 1 6.272-6.272h8.124a6.279 6.279 0 0 1 6.271 6.271V22a1 1 0 0 1-1 1ZM12 13.269a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6Z"]'
          );
          if (tagNode) {
            const name = document.querySelector("article header>div:nth-child(2) span");
            if (name) {
              posterName = name.innerText || posterName;
            }
          }
        }
        downloadResource({
          url,
          username: posterName,
          datetime: (0, import_dayjs3.default)(postTime),
          fileId: getMediaName(url)
        });
      } else {
        openInNewTab(url);
      }
    } catch (e) {
      alert("post get media failed!");
      console.log(`Uncatched in postOnClicked(): ${e}
${e.stack}`);
    }
  }

  // src/content/post-detail.ts
  var import_dayjs4 = __toESM(require_dayjs_min(), 1);
  async function fetchVideoURL2(containerNode, videoElem) {
    const poster = videoElem.getAttribute("poster");
    const timeNodes = containerNode.querySelectorAll("time");
    const posterUrl = timeNodes[timeNodes.length - 1].parentNode.parentNode.href;
    const posterPattern = /\/([^/?]*)\?/;
    const posterMatch = poster?.match(posterPattern);
    const postFileName = posterMatch?.[1];
    const resp = await fetch(posterUrl);
    const content = await resp.text();
    const pattern = new RegExp(`${postFileName}.*?video_versions.*?url":("[^"]*")`, "s");
    const match = content.match(pattern);
    let videoUrl = JSON.parse(match?.[1] ?? "");
    videoUrl = videoUrl.replace(/^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/g, "https://scontent.cdninstagram.com");
    videoElem.setAttribute("videoURL", videoUrl);
    return videoUrl;
  }
  var getVideoSrc2 = async (containerNode, videoElem) => {
    let url = videoElem.getAttribute("src");
    if (videoElem.hasAttribute("videoURL")) {
      url = videoElem.getAttribute("videoURL");
    } else if (url === null || url.includes("blob")) {
      url = await fetchVideoURL2(containerNode, videoElem);
    }
    return url;
  };
  async function getUrl() {
    const containerNode = document.querySelector("section main");
    if (!containerNode) return;
    const pathnameList = window.location.pathname.split("/").filter((e) => e);
    const isPostDetailWithNameInUrl = pathnameList.length === 3 && pathnameList[1] === "p";
    const mediaList = containerNode.querySelectorAll("li[style][class]");
    let url, res;
    if (mediaList.length === 0) {
      res = await getUrlFromInfoApi(containerNode);
      url = res?.url;
      if (!url) {
        const videoElem = containerNode.querySelector("article  div > video");
        const imgElem = containerNode.querySelector("article  div[role] div > img");
        if (videoElem) {
          if (videoElem) {
            url = await getVideoSrc2(containerNode, videoElem);
          }
        } else if (imgElem) {
          url = imgElem.getAttribute("src");
        } else {
          console.log("Err: not find media at handle post single");
        }
      }
    } else {
      let dotsList;
      if (checkType() === "pc") {
        dotsList = isPostDetailWithNameInUrl ? containerNode.querySelectorAll("article>div>div:nth-child(1)>div>div:nth-child(2)>div") : containerNode.querySelectorAll("div[role=button]>div>div>div>div:nth-child(2)>div");
      } else {
        dotsList = containerNode.querySelectorAll(`div[role=button][aria-hidden="true"][tabindex="0"]>div>div>div>div:nth-child(2)>div`);
      }
      const mediaIndex = [...dotsList].findIndex((i) => i.classList.length === 2);
      res = await getUrlFromInfoApi(containerNode, mediaIndex);
      url = res?.url;
      if (!url) {
        const listElements = [
          ...containerNode.querySelectorAll(
            `:scope > div > div:nth-child(1) > div > div:nth-child(1) ul li[style*="translateX"]`
          )
        ];
        const listElementWidth = Math.max(...listElements.map((element) => element.clientWidth));
        const positionsMap = listElements.reduce((result, element) => {
          const position = Math.round(Number(element.style.transform.match(/-?(\d+)/)?.[1]) / listElementWidth);
          return { ...result, [position]: element };
        }, {});
        const node = positionsMap[mediaIndex];
        const videoElem = node.querySelector("video");
        const imgElem = node.querySelector("img");
        if (videoElem) {
          url = await getVideoSrc2(containerNode, videoElem);
        } else if (imgElem) {
          url = imgElem.getAttribute("src");
        }
      }
    }
    return { url, res };
  }
  async function postDetailOnClicked(target) {
    try {
      const data = await getUrl();
      if (!data?.url) throw new Error("Cannot get url");
      const { url, res } = data;
      console.log("url", url);
      if (target.className.includes("download-btn")) {
        let postTime, posterName;
        if (res) {
          posterName = res.owner;
          postTime = res.taken_at * 1e3;
        } else {
          postTime = document.querySelector("time")?.getAttribute("datetime");
          const name = document.querySelector(
            "section main>div>div>div>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div>div"
          );
          if (name) {
            posterName = name.innerText || posterName;
          }
        }
        downloadResource({
          url,
          username: posterName,
          datetime: (0, import_dayjs4.default)(postTime),
          fileId: getMediaName(url)
        });
      } else {
        openInNewTab(url);
      }
    } catch (e) {
      alert("Post Detail Download Failed!");
      console.log(`Uncatched in postDetailOnClicked(): ${e}
${e.stack}`);
    }
  }

  // src/content/profile.ts
  async function profileOnClicked(target) {
    const { user_profile_pic_url } = await chrome.storage.local.get(["user_profile_pic_url"]);
    const data = new Map(user_profile_pic_url);
    const arr = window.location.pathname.split("/").filter((e) => e);
    const username = arr.length === 1 ? arr[0] : document.querySelector("main header h2")?.textContent;
    const url = data.get(username) || document.querySelector("header img")?.getAttribute("src");
    if (typeof url === "string") {
      if (target.className.includes("download-btn")) {
        downloadResource({
          url,
          fileId: username
        });
      } else {
        openInNewTab(url);
      }
    }
  }

  // src/content/profile-reel.ts
  var import_dayjs5 = __toESM(require_dayjs_min(), 1);
  async function fetchVideoURL3(containerNode, videoElem) {
    const poster = videoElem.getAttribute("poster");
    const timeNodes = containerNode.querySelectorAll("time");
    const posterUrl = timeNodes[timeNodes.length - 1].parentNode.parentNode.href;
    const posterPattern = /\/([^/?]*)\?/;
    const posterMatch = poster?.match(posterPattern);
    const postFileName = posterMatch?.[1];
    const resp = await fetch(posterUrl);
    const content = await resp.text();
    const pattern = new RegExp(`${postFileName}.*?video_versions.*?url":("[^"]*")`, "s");
    const match = content.match(pattern);
    let videoUrl = JSON.parse(match?.[1] ?? "");
    videoUrl = videoUrl.replace(/^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/g, "https://scontent.cdninstagram.com");
    videoElem.setAttribute("videoURL", videoUrl);
    return videoUrl;
  }
  var getVideoSrc3 = async (containerNode, videoElem) => {
    let url = videoElem.getAttribute("src");
    if (videoElem.hasAttribute("videoURL")) {
      url = videoElem.getAttribute("videoURL");
    } else if (url === null || url.includes("blob")) {
      url = await fetchVideoURL3(containerNode, videoElem);
    }
    return url;
  };
  async function getUrl2() {
    const containerNode = document.querySelector("section main");
    if (!containerNode) return;
    const pathnameList = window.location.pathname.split("/").filter((e) => e);
    const isPostDetailWithNameInUrl = pathnameList.length === 3 && pathnameList[1] === "p";
    const mediaList = containerNode.querySelectorAll("li[style][class]");
    let url, res;
    if (mediaList.length === 0) {
      res = await getUrlFromInfoApi(containerNode);
      url = res?.url;
      if (!url) {
        const videoElem = containerNode.querySelector("article  div > video");
        const imgElem = containerNode.querySelector("article  div[role] div > img");
        if (videoElem) {
          if (videoElem) {
            url = await getVideoSrc3(containerNode, videoElem);
          }
        } else if (imgElem) {
          url = imgElem.getAttribute("src");
        } else {
          console.log("Err: not find media at handle post single");
        }
      }
    } else {
      let dotsList;
      if (checkType() === "pc") {
        dotsList = isPostDetailWithNameInUrl ? containerNode.querySelectorAll("article>div>div:nth-child(1)>div>div:nth-child(2)>div") : containerNode.querySelectorAll("div[role=button]>div>div>div>div:nth-child(2)>div");
      } else {
        dotsList = containerNode.querySelectorAll(`div[role=button][aria-hidden="true"][tabindex="0"]>div>div>div>div:nth-child(2)>div`);
      }
      const mediaIndex = [...dotsList].findIndex((i) => i.classList.length === 2);
      res = await getUrlFromInfoApi(containerNode, mediaIndex);
      url = res?.url;
      if (!url) {
        const listElements = [
          ...containerNode.querySelectorAll(
            `:scope > div > div:nth-child(1) > div > div:nth-child(1) ul li[style*="translateX"]`
          )
        ];
        const listElementWidth = Math.max(...listElements.map((element) => element.clientWidth));
        const positionsMap = listElements.reduce((result, element) => {
          const position = Math.round(Number(element.style.transform.match(/-?(\d+)/)?.[1]) / listElementWidth);
          return { ...result, [position]: element };
        }, {});
        const node = positionsMap[mediaIndex];
        const videoElem = node.querySelector("video");
        const imgElem = node.querySelector("img");
        if (videoElem) {
          url = await getVideoSrc3(containerNode, videoElem);
        } else if (imgElem) {
          url = imgElem.getAttribute("src");
        }
      }
    }
    return { url, res };
  }
  async function handleProfileReel(target) {
    const code = window.location.pathname.split("/").at(-2);
    const final = (obj) => {
      if (target.className.includes("download-btn")) {
        downloadResource(obj);
      } else {
        openInNewTab(obj.url);
      }
    };
    async function getDataFromLocal() {
      const { profile_reels_edges_data, id_to_username_map } = await chrome.storage.local.get([
        "profile_reels_edges_data",
        "id_to_username_map"
      ]);
      const media = new Map(profile_reels_edges_data).get(code);
      if (media) {
        const url = media.video_versions?.[0].url || media.image_versions2.candidates[0].url;
        const times = target.parentElement?.parentElement?.parentElement?.querySelectorAll("time");
        const time = times ? times[times.length - 1]?.getAttribute("datetime") : void 0;
        final({
          url,
          username: new Map(id_to_username_map).get(media.user.id) || document.querySelector("a")?.getAttribute("href")?.replace(/\//g, ""),
          datetime: time ? (0, import_dayjs5.default)(time) : void 0,
          fileId: getMediaName(url)
        });
        return true;
      }
    }
    async function getDataFromScripts() {
      function findReel(obj) {
        for (const key in obj) {
          if (key === "xdt_api__v1__media__shortcode__web_info") {
            return obj[key];
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            const result = findReel(obj[key]);
            if (result) {
              return result;
            }
          }
        }
      }
      for (const script of [...window.document.scripts]) {
        try {
          const innerHTML = script.innerHTML;
          const data = JSON.parse(innerHTML);
          if (innerHTML.includes("xdt_api__v1__media__shortcode__web_info")) {
            const res = findReel(data);
            if (res) {
              for (const media of res.items) {
                if (media.code === code) {
                  const url = media.video_versions?.[0].url || media.image_versions2.candidates[0].url;
                  final({
                    url,
                    username: media.user.username,
                    datetime: import_dayjs5.default.unix(media.taken_at),
                    fileId: getMediaName(url)
                  });
                  return;
                }
              }
            }
          }
        } catch {
        }
      }
    }
    try {
      const data = await getUrl2();
      if (!data?.url) throw new Error("Cannot get url");
      const { url, res } = data;
      console.log("url", url);
      if (target.className.includes("download-btn")) {
        let postTime, posterName;
        if (res) {
          posterName = res.owner;
          postTime = res.taken_at * 1e3;
        } else {
          postTime = document.querySelector("time")?.getAttribute("datetime");
          const name = document.querySelector(
            "section main>div>div>div>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div>div"
          );
          if (name) {
            posterName = name.innerText || posterName;
          }
        }
        downloadResource({
          url,
          username: posterName,
          datetime: (0, import_dayjs5.default)(postTime),
          fileId: getMediaName(url)
        });
      } else {
        openInNewTab(url);
      }
    } catch {
      const res = await getDataFromLocal();
      if (res !== true) {
        if (!document.querySelector("div[role=dialog]")) {
          getDataFromScripts();
        } else {
          alert("profile reel get media failed!");
        }
      }
    }
  }

  // src/content/reels.ts
  var import_dayjs6 = __toESM(require_dayjs_min(), 1);
  function findReels(obj) {
    for (const key in obj) {
      if (key === "xdt_api__v1__clips__home__connection_v2") {
        return obj[key];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        const result = findReels(obj[key]);
        if (result) {
          return result;
        }
      }
    }
  }
  async function reelsOnClicked(target) {
    const final = (obj) => {
      if (target.className.includes("download-btn")) {
        downloadResource(obj);
      } else {
        openInNewTab(obj.url);
      }
    };
    const handleMedia2 = (media2) => {
      const url = media2.video_versions?.[0].url || media2.image_versions2.candidates[0].url;
      final({
        url,
        username: media2.user.username,
        datetime: import_dayjs6.default.unix(media2.taken_at),
        fileId: getMediaName(url)
      });
    };
    const { reels_edges_data } = await chrome.storage.local.get(["reels_edges_data"]);
    const code = window.location.pathname.split("/").at(-2);
    const media = new Map(reels_edges_data).get(code);
    if (media) {
      handleMedia2(media);
      return;
    }
    const scripts = await fetchHtml();
    for (const script of [...window.document.scripts, ...scripts]) {
      try {
        const innerHTML = script.innerHTML;
        const data = JSON.parse(innerHTML);
        if (innerHTML.includes("xdt_api__v1__clips__home__connection_v2")) {
          const res = findReels(data);
          if (res) {
            for (const item of res.edges) {
              if (item.node.media.code === code) {
                handleMedia2(item.node.media);
                return;
              }
            }
          }
        }
      } catch {
      }
    }
    const wrapperNode = target.parentNode.parentNode;
    try {
      const res = await getUrlFromInfoApi(wrapperNode);
      if (!res) return;
      console.log("url", res.url);
      final({
        url: res.url,
        username: res.owner,
        datetime: import_dayjs6.default.unix(res.taken_at),
        fileId: getMediaName(res.url)
      });
    } catch (e) {
      alert("Reels Download Failed!");
      console.log(`Uncatched in postDetailOnClicked(): ${e}
${e.stack}`);
      return;
    }
  }

  // src/content/stories.ts
  var import_dayjs7 = __toESM(require_dayjs_min(), 1);
  async function storyGetUrl(target, sectionNode) {
    const res = await getUrlFromInfoApi(target);
    let url = res?.url;
    if (!url) {
      if (sectionNode.querySelector("video > source")) {
        url = sectionNode.querySelector("video > source").getAttribute("src");
      } else if (sectionNode.querySelector('img[decoding="sync"]')) {
        const img = sectionNode.querySelector('img[decoding="sync"]');
        url = img.srcset.split(/ \d+w/g)[0].trim();
        if (url && url.length > 0) {
          return url;
        }
        url = sectionNode.querySelector('img[decoding="sync"]').getAttribute("src");
      } else if (sectionNode.querySelector("video")) {
        url = sectionNode.querySelector("video").getAttribute("src");
      }
    }
    return url;
  }
  function findRootView(obj) {
    for (const key in obj) {
      if (key === "rootView") {
        return obj[key];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        const result = findRootView(obj[key]);
        if (result) {
          return result;
        }
      }
    }
  }
  function findStories(obj) {
    for (const key in obj) {
      if (key === "xdt_api__v1__feed__reels_media") {
        return obj[key];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        const result = findStories(obj[key]);
        if (result) {
          return result;
        }
      }
    }
  }
  async function storyOnClicked(target) {
    const pathname = window.location.pathname;
    const pathnameArr = pathname.split("/").filter((e) => e);
    const posterName = pathnameArr[1];
    const handleMedia2 = (item, mediaIndex) => {
      const media = item.items[mediaIndex];
      if (!media) return false;
      if (import_dayjs7.default.unix(media.expiring_at).isBefore((0, import_dayjs7.default)())) {
        return false;
      }
      const url = media.video_versions?.[0].url || media.image_versions2.candidates[0].url;
      if (target.className.includes("download-btn")) {
        downloadResource({
          url,
          username: item.user.username,
          datetime: import_dayjs7.default.unix(media.taken_at),
          fileId: getMediaName(url)
        });
      } else {
        openInNewTab(url);
      }
      return true;
    };
    const { stories_reels_media } = await chrome.storage.local.get(["stories_reels_media"]);
    const stories_reels_media_data = new Map(stories_reels_media);
    if (pathnameArr.length === 2) {
      let mediaIndex = 0;
      const steps = target.parentElement.firstElementChild.querySelectorAll(":scope>div");
      if (steps.length > 1) {
        steps.forEach((item, index) => {
          if (item.childNodes.length === 1) {
            mediaIndex = index;
          }
        });
      }
      if (window.history.length <= 2) {
        for (const script of window.document.scripts) {
          try {
            const innerHTML = script.innerHTML;
            const data = JSON.parse(innerHTML);
            if (innerHTML.includes("xdt_api__v1__feed__reels_media")) {
              const res = findStories(data);
              if (res) {
                handleMedia2(res.reels_media[0], mediaIndex);
                return;
              }
            }
          } catch {
          }
        }
      }
      const { stories_user_ids } = await chrome.storage.local.get(["stories_user_ids"]);
      const user_id = new Map(stories_user_ids).get(posterName);
      if (typeof user_id === "string") {
        const item = stories_reels_media_data.get(user_id);
        if (item && steps.length === item.items.length) {
          const result = handleMedia2(item, mediaIndex);
          if (result) return;
        }
      }
      for (const script of window.document.scripts) {
        try {
          const innerHTML = script.innerHTML;
          const data = JSON.parse(innerHTML);
          if (innerHTML.includes("rootView")) {
            const rootViewData = findRootView(data);
            const id = rootViewData?.props.media_owner_id || rootViewData?.props.id;
            const item = stories_reels_media_data.get(id);
            if (item) {
              handleMedia2(item, mediaIndex);
              return;
            }
          }
        } catch {
        }
      }
    } else {
      const mediaId = pathnameArr.at(-1);
      for (const item2 of [...stories_reels_media_data.values()]) {
        for (let i = 0; i < item2.items.length; i++) {
          if (item2.items[i].pk === mediaId) {
            const result = handleMedia2(item2, i);
            if (result) return;
          }
        }
      }
      for (const script of window.document.scripts) {
        try {
          const innerHTML = script.innerHTML;
          const data = JSON.parse(innerHTML);
          if (innerHTML.includes("xdt_api__v1__feed__reels_media")) {
            const res = findStories(data);
            if (res) {
              handleMedia2(
                res.reels_media[0],
                res.reels_media[0].items.findIndex((i) => i.pk === mediaId)
              );
              return;
            }
          }
        } catch {
        }
      }
      const { reels_media } = await chrome.storage.local.get(["reels_media"]);
      const item = (reels_media || []).find((i) => i.media_ids?.includes(mediaId));
      if (item) {
        handleMedia2(item, item.media_ids.indexOf(mediaId));
        return;
      }
      const sectionNode = getParentSectionNode(target);
      if (!sectionNode) return;
      const url = await storyGetUrl(target, sectionNode);
      if (url) {
        const postTime = sectionNode.querySelector("time")?.getAttribute("datetime");
        if (target.className.includes("download-btn")) {
          downloadResource({
            url,
            username: posterName,
            datetime: (0, import_dayjs7.default)(postTime),
            fileId: getMediaName(url)
          });
        } else {
          openInNewTab(url);
        }
      }
    }
  }

  // src/content/threads/post.ts
  var import_dayjs8 = __toESM(require_dayjs_min(), 1);
  function findFeedDataEdges(obj) {
    if (obj) {
      if (Array.isArray(obj.edges)) {
        return obj.edges;
      }
      if (Array.isArray(obj.relatedPosts?.threads)) {
        return obj.relatedPosts.threads;
      }
    }
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        const result = findFeedDataEdges(obj[key]);
        if (result) {
          return result;
        }
      } else if (Array.isArray(obj[key])) {
        for (const item of obj[key]) {
          const result = findFeedDataEdges(item);
          if (result) {
            return result;
          }
        }
      }
    }
    return null;
  }
  function handleMedia(post, action) {
    const { giphy_media_info, carousel_media, image_versions2, video_versions } = post;
    if (giphy_media_info?.first_party_cdn_proxied_images?.fixed_height?.webp) {
      const url = giphy_media_info?.first_party_cdn_proxied_images?.fixed_height?.webp;
      if (action === "download") {
        downloadResource({
          url,
          username: post.user.username,
          datetime: import_dayjs8.default.unix(post.taken_at),
          fileId: getMediaName(url)
        });
      } else {
        openInNewTab(url);
      }
    }
    if (carousel_media) {
      carousel_media.forEach((item) => {
        const url = item.video_versions?.[0]?.url || item.image_versions2?.candidates?.[0]?.url;
        console.log("url", post, url);
        if (!url) return;
        if (action === "download") {
          downloadResource({
            url,
            username: post.user.username,
            datetime: import_dayjs8.default.unix(post.taken_at),
            fileId: getMediaName(url)
          });
        } else {
          openInNewTab(url);
        }
      });
    } else {
      const url = video_versions?.[0]?.url || image_versions2?.candidates?.[0]?.url;
      console.log("url", post, url);
      if (!url) return;
      if (action === "download") {
        downloadResource({
          url,
          username: post.user.username,
          datetime: import_dayjs8.default.unix(post.taken_at),
          fileId: getMediaName(url)
        });
      } else {
        openInNewTab(url);
      }
    }
  }
  async function handleThreadsPost(container, action) {
    const postCode = [...container.querySelectorAll("a")].find((i) => /\w+\/post\/\w+/.test(i.href))?.href.split("/post/")[1];
    const { threads } = await chrome.storage.local.get(["threads"]);
    const data = new Map(threads);
    const thread = data.get(postCode);
    if (thread) {
      const { post } = thread;
      handleMedia(post, action);
    } else {
      for (const script of window.document.scripts) {
        try {
          const innerHTML = script.innerHTML;
          const data2 = JSON.parse(innerHTML);
          if (innerHTML.includes("thread_items")) {
            const arr = findFeedDataEdges(data2);
            if (Array.isArray(arr)) {
              const data3 = arr.map(
                (i) => i.node?.text_post_app_thread?.thread_items || i.node?.thread_items || i.node?.thread?.thread_items || i.text_post_app_thread?.thread_items || i.thread_items
              ).flat().find((i) => i?.post.code === postCode);
              if (data3) {
                const { post } = data3;
                handleMedia(post, action);
                return;
              }
            }
          }
        } catch {
        }
      }
    }
  }

  // src/content/threads/button.ts
  function findContainerNode(target) {
    let node = target.parentElement;
    while (node && node.getAttribute("data-pressable-container") !== "true") {
      node = node.parentElement;
    }
    return node;
  }
  function handleThreadsButton(target) {
    const action = target.className.includes("download-btn") ? "download" : "open";
    const container = findContainerNode(target);
    if (container instanceof HTMLDivElement) {
      handleThreadsPost(container, action);
    }
  }

  // src/content/button.ts
  var svgDownloadBtn = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="24" width="24"
viewBox="0 0 477.867 477.867" fill="currentColor" xml:space="preserve">
<g>
	 <path d="M443.733,307.2c-9.426,0-17.067,7.641-17.067,17.067v102.4c0,9.426-7.641,17.067-17.067,17.067H68.267
			 c-9.426,0-17.067-7.641-17.067-17.067v-102.4c0-9.426-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v102.4
			 c0,28.277,22.923,51.2,51.2,51.2H409.6c28.277,0,51.2-22.923,51.2-51.2v-102.4C460.8,314.841,453.159,307.2,443.733,307.2z"/>
</g>
<g>
	 <path d="M335.947,295.134c-6.614-6.387-17.099-6.387-23.712,0L256,351.334V17.067C256,7.641,248.359,0,238.933,0
			 s-17.067,7.641-17.067,17.067v334.268l-56.201-56.201c-6.78-6.548-17.584-6.36-24.132,0.419c-6.388,6.614-6.388,17.099,0,23.713
			 l85.333,85.333c6.657,6.673,17.463,6.687,24.136,0.031c0.01-0.01,0.02-0.02,0.031-0.031l85.333-85.333
			 C342.915,312.486,342.727,301.682,335.947,295.134z"/>
</g>
</svg>`;
  var svgNewtabBtn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="140 -820 680 680" width="24" height="24" fill="currentColor">
	<path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h222.3q12.77 0 21.39 8.62 8.61 8.61 8.61 21.38T456-768.62q-8.62 8.62-21.39 8.62h-222.3q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-222.3q0-12.77 8.62-21.39 8.61-8.61 21.38-8.61t21.38 8.61q8.62 8.62 8.62 21.39v222.3Q820-182 799-161q-21 21-51.31 21H212.31ZM760-717.85 409.85-367.69q-8.31 8.3-20.89 8.5-12.57.19-21.27-8.5-8.69-8.7-8.69-21.08 0-12.38 8.69-21.08L717.85-760H590q-12.77 0-21.38-8.62Q560-777.23 560-790t8.62-21.38Q577.23-820 590-820h193.84q15.47 0 25.81 10.35Q820-799.31 820-783.84V-590q0 12.77-8.62 21.38Q802.77-560 790-560t-21.38-8.62Q760-577.23 760-590v-127.85Z" />
</svg>`;
  function onClickHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    const { currentTarget } = e;
    if (currentTarget instanceof HTMLAnchorElement) {
      if (window.location.origin === "https://www.threads.net") {
        handleThreadsButton(currentTarget);
        return;
      }
      const pathPrefix = window.location.pathname;
      const pathnameList = pathPrefix.split("/").filter((e2) => e2);
      const isPostDetailWithNameInUrl = pathnameList.length === 3 && pathnameList[1] === "p";
      const isReelDetailWithNameInUrl = pathnameList.length === 3 && pathnameList[1] === "reel";
      let fn = postOnClicked;
      if (document.querySelector("section>main>div>header>section:nth-child(2)")?.contains(currentTarget)) {
        fn = profileOnClicked;
      } else if (pathPrefix.startsWith("/reels/")) {
        fn = reelsOnClicked;
      } else if (pathPrefix.startsWith("/stories/highlights/")) {
        fn = highlightsOnClicked;
      } else if (pathPrefix.startsWith("/stories/")) {
        fn = storyOnClicked;
      } else if (pathPrefix.startsWith("/reel/")) {
        fn = handleProfileReel;
      } else if (pathPrefix.startsWith("/p/")) {
        if (document.querySelector('div[role="dialog"]')) {
          fn = postOnClicked;
        } else {
          fn = postDetailOnClicked;
        }
      } else if (isPostDetailWithNameInUrl || isReelDetailWithNameInUrl) {
        fn = postDetailOnClicked;
      }
      fn(currentTarget);
    }
  }
  function createCustomBtn(svg, iconColor, className) {
    const newBtn = document.createElement("a");
    newBtn.innerHTML = svg;
    newBtn.className = CLASS_CUSTOM_BUTTON + " " + className;
    newBtn.setAttribute("style", `cursor: pointer;padding:8px;z-index: 0;color:${iconColor}`);
    newBtn.onmouseenter = () => {
      newBtn.style.setProperty("filter", "drop-shadow(0px 0px 10px deepskyblue)");
    };
    newBtn.onmouseleave = () => {
      newBtn.style.removeProperty("filter");
    };
    if (className === "newtab-btn") {
      newBtn.setAttribute("title", "Open In New Tab");
      newBtn.setAttribute("target", "_blank");
      newBtn.setAttribute("rel", "noopener,noreferrer");
    } else {
      newBtn.setAttribute("title", "Download");
    }
    newBtn.addEventListener("click", onClickHandler);
    return newBtn;
  }
  async function addCustomBtn(node, iconColor, position = "after") {
    const { setting_show_open_in_new_tab_icon } = await chrome.storage.sync.get(["setting_show_open_in_new_tab_icon"]);
    const newtabBtn = createCustomBtn(svgNewtabBtn, iconColor, "newtab-btn");
    const downloadBtn = createCustomBtn(svgDownloadBtn, iconColor, "download-btn");
    if (position === "before") {
      if (!(checkType() !== "pc" && window.location.pathname.startsWith("/stories/"))) {
        if (setting_show_open_in_new_tab_icon) {
          node.insertBefore(newtabBtn, node.firstChild);
        }
      }
      node.insertBefore(downloadBtn, node.firstChild);
    } else {
      if (!(checkType() !== "pc" && window.location.pathname.startsWith("/stories/"))) {
        if (setting_show_open_in_new_tab_icon) {
          node.appendChild(newtabBtn);
        }
      }
      node.appendChild(downloadBtn);
    }
  }
  function addVideoDownloadCoverBtn(node) {
    const newBtn = document.createElement("a");
    newBtn.innerHTML = svgDownloadBtn;
    newBtn.className = CLASS_CUSTOM_BUTTON;
    newBtn.setAttribute("style", "cursor: pointer;position:absolute;left:4px;top:4px;color:white");
    newBtn.setAttribute("title", "Download Video Cover");
    newBtn.onmouseenter = () => {
      newBtn.style.setProperty("scale", "1.1");
    };
    newBtn.onmouseleave = () => {
      newBtn.style.removeProperty("scale");
    };
    newBtn.onclick = (e) => {
      e.stopPropagation();
      if (window.location.pathname.split("/")[2] === "reels") {
        const bgEl = node.querySelector('[style*="background-image"]');
        if (bgEl) {
          const url = window.getComputedStyle(bgEl).getPropertyValue("background-image").match(/url\((.*)\)/)?.[1];
          if (url) {
            downloadResource({
              url: JSON.parse(url)
            });
          }
        }
      } else {
        const imgSrc = node.querySelector("img")?.getAttribute("src");
        if (imgSrc) {
          downloadResource({
            url: imgSrc
          });
        }
      }
    };
    node.appendChild(newBtn);
  }

  // src/content/threads/index.ts
  function handleList(list) {
    const iconColor = window.getComputedStyle(document.body).backgroundColor === "rgb(0, 0, 0)" ? "white" : "black";
    list.forEach((n) => {
      const node = n.firstElementChild?.firstElementChild;
      if (!node) return;
      if (node.querySelector("picture") || node.querySelector("video")) {
        node.querySelectorAll(
          'path[d="M1.34375 7.53125L1.34375 7.54043C1.34374 8.04211 1.34372 8.76295 1.6611 9.65585C1.9795 10.5516 2.60026 11.5779 3.77681 12.7544C5.59273 14.5704 7.58105 16.0215 8.33387 16.5497C8.73525 16.8313 9.26573 16.8313 9.66705 16.5496C10.4197 16.0213 12.4074 14.5703 14.2232 12.7544C15.3997 11.5779 16.0205 10.5516 16.3389 9.65585C16.6563 8.76296 16.6563 8.04211 16.6562 7.54043V7.53125C16.6562 5.23466 15.0849 3.25 12.6562 3.25C11.5214 3.25 10.6433 3.78244 9.99228 4.45476C9.59009 4.87012 9.26356 5.3491 9 5.81533C8.73645 5.3491 8.40991 4.87012 8.00772 4.45476C7.35672 3.78244 6.47861 3.25 5.34375 3.25C2.9151 3.25 1.34375 5.23466 1.34375 7.53125Z"]'
        ).forEach((likeBtn) => {
          const btnContainer = likeBtn.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
          if (btnContainer && btnContainer.getElementsByClassName(CLASS_CUSTOM_BUTTON).length === 0) {
            addCustomBtn(btnContainer, iconColor);
          }
        });
      }
    });
  }
  function handleThreads() {
    const pathname = window.location.pathname;
    const pathnameList = pathname.split("/").filter((e) => e);
    const isPostDetailPage = pathnameList.length === 3 && pathnameList[1] === "post";
    if (pathname === "/") {
      const wrapperNode = document.querySelector(
        "div[id=barcelona-page-layout] div[role=region]>div:nth-child(1)>div:nth-child(4)>div>div"
      );
      if (wrapperNode) {
        handleList(Array.from(wrapperNode.children));
      }
    } else if (pathname === "/search") {
      const layout = document.querySelectorAll("#barcelona-page-layout");
      let wrapper;
      for (const item of layout) {
        if (item.parentElement?.hidden) {
          continue;
        } else {
          wrapper = item;
          break;
        }
      }
      const list = wrapper?.querySelector("div[role=region] div[role=toolbar]")?.nextElementSibling?.querySelector(":scope>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)")?.children;
      if (list) {
        handleList(Array.from(list));
      }
    } else if (isPostDetailPage) {
      const layout = document.querySelectorAll("#barcelona-page-layout");
      let wrapper;
      for (const item of layout) {
        if (item.parentElement?.hidden) {
          continue;
        } else {
          wrapper = item;
          break;
        }
      }
      const list = wrapper?.querySelector("div[role=region]>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)")?.children;
      if (list) {
        handleList(Array.from(list));
      }
    } else if (pathname.startsWith("/@")) {
      const layout = document.querySelectorAll("#barcelona-page-layout");
      let wrapper;
      for (const item of layout) {
        if (item.parentElement?.hidden) {
          continue;
        } else {
          wrapper = item;
          break;
        }
      }
      let list;
      if (wrapper) {
        list = wrapper.querySelector("div[role=region]>div>div:nth-child(4)>div:nth-child(1)>div:nth-child(1)")?.children;
      } else {
        list = document.querySelector("header")?.nextElementSibling?.querySelector("#barcelona-page-layout>div:nth-child(3)")?.children;
      }
      if (list) {
        handleList(Array.from(list));
      }
    } else {
      const progressbar = document.querySelector("div[role=progressbar]");
      const list = progressbar?.parentElement?.parentElement?.parentElement?.querySelectorAll(
        ":scope>div>div>div>div>div:nth-child(2)"
      );
      if (list) {
        handleList(Array.from(list));
      }
    }
  }

  // src/content/index.ts
  setInterval(() => {
    if (window.location.origin === "https://www.threads.net") {
      chrome.storage.sync.get(["setting_enable_threads"]).then((result) => {
        if (result.setting_enable_threads) {
          handleThreads();
        }
      });
      return;
    }
    if (window.location.origin !== "https://www.instagram.com") return;
    const iconColor = getComputedStyle(document.body).backgroundColor === "rgb(0, 0, 0)" ? "white" : "black";
    const pathname = window.location.pathname;
    const pathnameList = pathname.split("/").filter((e) => e);
    const isFeedPage = pathnameList.length === 2 && pathnameList[1] === "feed";
    const isPostDetailWithNameInUrl = pathnameList.length === 3 && pathnameList[1] === "p";
    const isReelDetailWithNameInUrl = pathnameList.length === 3 && pathnameList[1] === "reel";
    if (pathname === "/" || isFeedPage) {
      handleVideo();
      const articleList = document.querySelectorAll("article");
      for (let i = 0; i < articleList.length; i++) {
        const tagNode = articleList[i].querySelector(
          'path[d="M21.334 23H2.666a1 1 0 0 1-1-1v-1.354a6.279 6.279 0 0 1 6.272-6.272h8.124a6.279 6.279 0 0 1 6.271 6.271V22a1 1 0 0 1-1 1ZM12 13.269a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6Z"]'
        );
        if (tagNode) {
          articleList[i].querySelectorAll("ul li img").forEach((img) => {
            const emptyNode = img.parentElement?.nextElementSibling;
            if (emptyNode instanceof HTMLDivElement && emptyNode.childNodes.length === 0) {
              emptyNode.style.zIndex = "-1";
            }
          });
        } else {
          articleList[i].querySelectorAll(":scope img").forEach((img) => {
            img.style.zIndex = "999";
          });
        }
        const likeBtn = articleList[i].querySelector(
          'path[d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"]'
        );
        if (likeBtn && articleList[i].getElementsByClassName(CLASS_CUSTOM_BUTTON).length === 0) {
          addCustomBtn(likeBtn.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode, iconColor);
        }
      }
    }
    if (pathname.startsWith("/p/") || isPostDetailWithNameInUrl || isReelDetailWithNameInUrl) {
      handleVideo();
      const dialogNode = document.querySelector('div[role="dialog"]');
      const tagNode = document.querySelector(
        'path[d="M21.334 23H2.666a1 1 0 0 1-1-1v-1.354a6.279 6.279 0 0 1 6.272-6.272h8.124a6.279 6.279 0 0 1 6.271 6.271V22a1 1 0 0 1-1 1ZM12 13.269a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6Z"]'
      );
      if (tagNode) {
        const node = dialogNode ?? document.querySelector("section main");
        if (node) {
          node.querySelectorAll("ul li img").forEach((img) => {
            const emptyNode = img.parentElement?.nextElementSibling;
            if (emptyNode instanceof HTMLDivElement && emptyNode.childNodes.length === 0) {
              emptyNode.style.zIndex = "-1";
            }
          });
        }
      } else if (dialogNode) {
        dialogNode.querySelectorAll("img").forEach((img) => {
          img.style.zIndex = "999";
        });
      } else {
        document.querySelector("main > div > div")?.querySelectorAll("img").forEach((img) => img.style.zIndex = "999");
      }
      const replyBtn = document.querySelector('path[d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"]');
      const btnsContainer = document.querySelector('div[role="presentation"] section') || replyBtn?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode;
      if (btnsContainer instanceof HTMLElement && btnsContainer.getElementsByClassName(CLASS_CUSTOM_BUTTON).length === 0) {
        addCustomBtn(btnsContainer, iconColor);
      }
    }
    if (pathname.startsWith("/stories/")) {
      const node = document.querySelector("section")?.querySelector('img[decoding="sync"]')?.nextSibling;
      if (node instanceof HTMLDivElement) {
        node.style.zIndex = "-1";
      }
      const blockDiv = [...document.querySelectorAll("body>div:not(#splash-screen)>div>div>div>div")].find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      const storyMenuBtn = blockDiv?.querySelector("svg circle");
      if (storyMenuBtn && blockDiv?.getElementsByClassName(CLASS_CUSTOM_BUTTON).length === 0) {
        addCustomBtn(storyMenuBtn.parentNode?.parentNode?.parentNode?.parentNode?.parentNode, "white");
      }
      chrome.storage.sync.get(["setting_enable_video_controls"]).then((result) => {
        if (!result.setting_enable_video_controls) return;
        const videos = document.querySelectorAll("video");
        for (let i = 0; i < videos.length; i++) {
          if (videos[i].controls === true) continue;
          videos[i].style.zIndex = "1";
          videos[i].style.position = "relative";
          videos[i].setAttribute("controls", "true");
          videos[i].onvolumechange = () => {
            const isMutingBtn = document.querySelector(
              'section path[d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z"]'
            );
            const isUnmutingBtn = document.querySelector(
              'section path[d="M16.636 7.028a1.5 1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0 1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981 8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59 8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0 0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0 0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1 0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0 1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z"]'
            );
            if (videos[i].muted === false && isMutingBtn) {
              isMutingBtn.parentElement?.parentElement?.parentElement?.click();
            }
            if (videos[i].muted === true && isUnmutingBtn) {
              isUnmutingBtn.parentElement?.parentElement?.parentElement?.click();
            }
          };
        }
      });
    }
    if (pathname.startsWith("/reels/")) {
      chrome.storage.sync.get(["setting_enable_video_controls"]).then((result) => {
        if (!result.setting_enable_video_controls) return;
        const videos = document.querySelectorAll("video");
        for (let i = 0; i < videos.length; i++) {
          if (videos[i].controls === true) continue;
          videos[i].style.zIndex = "1";
          videos[i].style.position = "relative";
          videos[i].controls = true;
          videos[i].onvolumechange = () => {
            const isMutingBtn = videos[i].parentElement?.querySelector(
              'path[d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z"]'
            );
            const isUnmutingBtn = videos[i].nextElementSibling?.querySelector(
              'path[d="M16.636 7.028a1.5 1.5 0 10-2.395 1.807 5.365 5.365 0 011.103 3.17 5.378 5.378 0 01-1.105 3.176 1.5 1.5 0 102.395 1.806 8.396 8.396 0 001.71-4.981 8.39 8.39 0 00-1.708-4.978zm3.73-2.332A1.5 1.5 0 1018.04 6.59 8.823 8.823 0 0120 12.007a8.798 8.798 0 01-1.96 5.415 1.5 1.5 0 002.326 1.894 11.672 11.672 0 002.635-7.31 11.682 11.682 0 00-2.635-7.31zm-8.963-3.613a1.001 1.001 0 00-1.082.187L5.265 6H2a1 1 0 00-1 1v10.003a1 1 0 001 1h3.265l5.01 4.682.02.021a1 1 0 001.704-.814L12.005 2a1 1 0 00-.602-.917z"]'
            );
            if (videos[i].muted === false && isMutingBtn) {
              isMutingBtn.parentElement?.parentElement?.click();
            }
            if (videos[i].muted === true && isUnmutingBtn) {
              isUnmutingBtn.parentElement?.parentElement?.click();
            }
          };
          const btnEl = videos[i].nextElementSibling?.querySelector("div[role=button]");
          if (btnEl) {
            btnEl.style.paddingBottom = "3rem";
            btnEl.childNodes.forEach((i2) => i2 instanceof HTMLDivElement && (i2.style.zIndex = "999"));
          }
        }
      });
      const reelsList = checkType() === "pc" ? document.querySelectorAll("section>main>div>div") : document.querySelectorAll("section>main>div>div>div");
      for (const item of reelsList) {
        const likeBtn = item.querySelector(
          'path[d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"]'
        );
        if (likeBtn && item.getElementsByClassName(CLASS_CUSTOM_BUTTON).length === 0) {
          addCustomBtn(
            likeBtn.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode,
            checkType() === "pc" ? iconColor : "white",
            "before"
          );
        }
      }
    }
    if (pathname.startsWith("/reel/")) {
      handleVideo();
      const dialogNode = document.querySelector('div[role="dialog"]');
      const node = dialogNode || document;
      const commentBtn = node.querySelector('path[d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"]');
      if (commentBtn && node.getElementsByClassName(CLASS_CUSTOM_BUTTON).length === 0) {
        addCustomBtn(commentBtn.parentNode?.parentNode?.parentNode?.parentNode?.parentNode, iconColor, "before");
      }
    }
    const profileHeader = document.querySelector("section>main>div>header>section:nth-child(2)");
    if (profileHeader && profileHeader.getElementsByClassName(CLASS_CUSTOM_BUTTON).length === 0) {
      const profileBtn = profileHeader.querySelector("svg circle");
      if (profileBtn) {
        addCustomBtn(profileBtn.parentNode?.parentNode?.parentNode, iconColor);
      }
    }
    if (pathnameList.length === 1 || pathnameList.length === 2 && ["tagged", "reels"].includes(pathnameList[1])) {
      const postsRows = document.querySelector('div[role="tablist"]')?.nextElementSibling?.querySelectorAll(`:scope>div>div ${pathnameList.length === 1 ? "" : ">div"}`);
      postsRows?.forEach((row) => {
        row.childNodes.forEach((item) => {
          if (item instanceof HTMLDivElement && item.getElementsByClassName(CLASS_CUSTOM_BUTTON).length === 0) {
            const videoSvg = item.querySelector(
              'path[d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z"]'
            );
            if (videoSvg || pathnameList.includes("reels")) {
              addVideoDownloadCoverBtn(item);
            }
          }
        });
      });
    }
  }, 1500);
})();
