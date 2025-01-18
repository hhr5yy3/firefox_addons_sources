// ==UserScript==
// @include *://vk.com/*
// ==/UserScript==

var header, wall, nocounters, photo_comments, photo_fullscreen, audio_flash, audio_largeblock, fixed_chrome, round_pics, old_navbar, night_mode;

var browser = browser || chrome
var extension = browser.extension || browser.runtime

if (!extension.onMessage) extension = browser.runtime

browser.storage.local.get(["header", "wall", "nocounters", "photo_comments", "photo_fullscreen", "audio_flash", "audio_largeblock", "old_im", "square_pics", "old_navbar", "night_mode"], function(data) {

   header = data.header == undefined || data.header
   wall = data.wall == undefined || data.wall
   nocounters = data.nocounters != undefined && data.nocounters
   photo_comments = data.photo_comments == undefined || data.photo_comments
   photo_fullscreen = data.photo_fullscreen == undefined || data.photo_fullscreen
   audio_flash = data.audio_flash != undefined && data.audio_flash
   audio_largeblock = data.audio_largeblock != undefined && data.audio_largeblock
   new_im = data.old_im == undefined || !data.old_im
   round_pics = data.square_pics != undefined && !data.square_pics
   old_navbar = data.old_navbar != undefined && data.old_navbar
   night_mode = data.night_mode != undefined && data.night_mode

   addScrollHandler()

   window.vkplus_timer = setInterval(updateAudioData, 1000)

   function nav() {
      checkPhotoviewer()
      checkAudiosBlock()
      checkCountsBlock()
      checkImPage()
   }

   var s = document.createElement('script')
   s.textContent = '(function(history){\
       var pushState = history.pushState;\
       history.pushState = function(state) {\
           setTimeout(function() {\
              var e = new Event("urlchange");\
              window.dispatchEvent(e);\
           }, 10);\
           return pushState.apply(history, arguments);\
       };\
   })(window.history);'
   document.head.appendChild(s)

   window.addEventListener('popstate', nav, false)
   window.addEventListener('urlchange', nav, false)

   nav()

   if (header) document.body.addEventListener('click', shiftClick, false)
   if (photo_comments) enableHideComments()
   if (photo_fullscreen) enableFullscreen()
   if (audio_flash) enableFlash()
   if (nocounters) checkCountsBlock()
   if (audio_largeblock) checkAudiosBlock()

   if (new_im) enableNewIM()

   document.getElementById('page_header_cont').classList.add('newTopBar')

   if (old_navbar) enableOldNavbar()

   if (round_pics) enableRoundAvatars()

   if (night_mode) enableNightMode()

   checkImPage()

   fixAudioVolume()
   addDownloadButton()
   addMuteToggle()

})

function addScrollHandler() {
   window.stop_scroll_timer = null
   window.restore_pos_timer = null
   
   window.onscroll = function() {
      if (window.stop_scroll_timer) {
         clearTimeout(window.stop_scroll_timer)
         window.stop_scroll_timer = null
      }
      if (window.restore_pos_timer) {
         clearTimeout(window.restore_pos_timer)
         window.restore_pos_timer = null
      }
      window.stop_scroll_timer = setTimeout(function() {
         clearInterval(window.scroll_timer)
         window.scroll_timer = null
         if (+(new Date()) - load_time < 500) return
         checkFeedWidth()
         localStorage.pageYOffset = window.pageYOffset
      }, 100)
      if (!window.scroll_timer) window.scroll_timer = setInterval(checkFeedWidth, 500)
   }

   setTimeout(function() {
      if (!document.querySelector('.wall_posts')) return
      checkFeedWidth()
      waitForImgs()
      var wall = document.querySelector('.wall_posts')
      if (wall) wall.addEventListener('DOMSubtreeModified', function() {
         if (!waiting_for_imgs) waitForImgs()
      }, false);
   }, 800)
   
   window.addEventListener("wheel", function() { window.do_not_scroll = true })
   
   function waitForImgs() {
      if (!document.querySelector('.wall_posts')) return
      waiting_for_imgs = true
      var els = document.querySelectorAll('.page_post_sized_thumbs > *:first-child')
      for (var i = 0; i < els.length; i++) {
         if (els[i].style.height == '') {
            setTimeout(arguments.callee, 500)
            return
         }
         els[i].originalHeight = parseInt(els[i].style.height)
      }
      waiting_for_imgs = false
      checkFeedWidth()
      updatePhotoSizes()
   }
}

var do_not_scroll = false
var waiting_for_imgs = false

function fixAudioVolume() {
   var s = document.createElement('script')
   s.textContent = 'Slider.LOGFBASE = ' + (audio_flash ? 13 : 11)
   document.body.appendChild(s)
}

var checkAudioURLTimer = null

function addDownloadButton() {
   var el = getElementsByClass('top_audio_player_title_wrap', document.getElementById('top_nav'), 'div')[0]
   var b = document.createElement('div')
   b.id = 'download_audio_button'
   el.appendChild(b)
   
   var s = document.createElement('script')
   s.textContent = 'window.checkAudioURLTimer = setInterval(function() {\r\n\
      if (!ap || !ap._currentAudio || ap._currentAudio.length < 3) {\r\n\
         ge("top_audio_player").setAttribute("data-audio", "")\r\n\
         return\r\n\
      }\
      ge("top_audio_player").setAttribute("data-audio", JSON.stringify(ap._currentAudio))\r\n\
   }, 1000)\r\n'
   document.body.appendChild(s)

   document.getElementById('download_audio_button').addEventListener('click', function(event) {
      event.stopPropagation()
      if (!this.getAttribute('data-url') || this.getAttribute('data-url') == "") return
      var url = this.getAttribute('data-url')
      if (url.match(/\.m3u8$/)) {
         var re = url.match(/\/u[0-9]+/) ? /(https?:\/\/[^\/]+\/c[0-9]+\/u[0-9]+)\/([^\/]+)((\/audios)?\/[^\/]+)\/index.m3u8(.*)/ : /^(.*)(\/[^\/]+)((\/audios)?\/[^\/]+)\/index.m3u8(.*)/
         var m = url.match(re)
         if (m) url = m[1] + m[3] + '.mp3'
      }
      extension.sendMessage({ operation: "download", url : url, filename: getFileName() })
   }, false)
   document.getElementById('download_audio_button').addEventListener('mousedown', function(event) { event.stopPropagation() }, false)
}

function updateAudioData() {
   if (!document.getElementById('top_audio_player')) return
   var audio = document.getElementById('top_audio_player').dataset.audio
   if (audio) {
      try { audio = JSON.parse(audio) } catch(ex) {}
   }
   if (!audio || audio.length < 3 || !audio[2]) {
      document.getElementById("download_audio_button").style.display = "none"
   } else {
      document.getElementById("download_audio_button").style.display = ""
   }
   if (!audio) return
   if (audio && document.getElementById("download_audio_button").getAttribute("data-id") == audio[1] + "_" + audio[0]) return
   document.getElementById("download_audio_button").setAttribute("data-id", audio ? audio[1] + "_" + audio[0] : "")
   document.getElementById("download_audio_button").setAttribute("data-url", audio ? unmask(audio[2], audio[15].vk_id).split("?")[0] : "")
}

function unmask(str, vk_id) {
   "use strict";
   function index() {
      return window.wbopen && ~(window.open + "").indexOf("wbopen")
   }
   function o(str) {
      if (!index() && ~str.indexOf("audio_api_unavailable")) {
         var url = str.split("?extra=")[1].split("#");
         var hash = (url[1] === "") ? "" : a(url[1]);
         url = a(url[0]);
         if (!url || "string" != typeof hash) return str;
         hash = hash ? hash.split(String.fromCharCode(9)) : [];
         var s, r;
         for (var n = hash.length-1; n >= 0; n--) {
            r = hash[n].split(String.fromCharCode(11));
            s = r.splice(0, 1, url)[0];
            if (!l[s]) return str;
            url = l[s].apply(null, r);
         }
         if (url && url.substr(0, 4) === "http") return url;
      }
      return str
   }
   function a(str) {
      if (!str || str.length % 4 == 1) return 0;
      var a = 0, i, n, s = "", e = 0, o = 0;
      while (i = str.charAt(a++)) {
         i = r.indexOf(i);
         if (~i) {
            e = o % 4 ? 64 * e + i : i;
            n = o++ % 4;
            if (n) s += String.fromCharCode(255 & e >> (-2 * o & 6));
         }
      }
      return s
   }
   function s(str, mask) {
      var len = str.length, o = [];
      if (len) {
         for (var i = len-1, mask = Math.abs(mask); i >= 0; i--) {
            mask = (len * (i + 1) ^ mask + i) % len;
            o[i] = mask;
         }
      }
      return o
   }
   var vk = { id: vk_id }
   var r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/="
   var l = {
      v: function(str) {
         return str.split("").reverse().join("")
      },
      r: function(str, offset) {
         str = str.split("");
         var s = 0;
         for (var i = str.length-1; i > 0; i--) {
            s = r.indexOf(str[i]);
            if (s > 0) str[i] = r.substr(s - offset, 1);
         }
         return str.join("")
      },
      s: function(str, mask) {
         var len = str.length;
         if (len) {
            var o = s(str, mask);
            var str = str.split("");
            for (var i = 1; i < len; i++) {
               str[i] = str.splice(o[len - 1 - i], 1, str[i])[0];
            }
            str = str.join("")
         }
         return str
      },
      i: function(str, mask) {
         return l.s(str, mask ^ vk.id)
      },
      x: function(str, mask) {
         var i = [];
         mask = mask.charCodeAt(0);
         each(str.split(""), function(str, mask) {
            i.push(String.fromCharCode(mask.charCodeAt(0) ^ mask))
         })
         return i.join("")
      }
   }
   return o(str)
}

function getFileName() {
   var title = getElementsByClass('top_audio_player_title', document.getElementById('top_nav'), 'div')[0].innerHTML
   title = title.replace(/\s/g, '_')
   title = title.replace(/–/g, '-')
   title = title.replace(/[:*?"\\\/<>|]/g, '')
   title = title.toLowerCase()
   if (!title.match(/^[a-zA-Z0-9_-]+$/)) {
      var a = ['ч',  'ш',  'щ',   'ж',  'ю',  'я',  'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ы', 'э', 'ъ', 'ь']
      var b = ['ch', 'sh', 'sch', 'zh', 'yu', 'ya', 'a', 'b', 'v', 'g', 'd', 'e', 'e', 'z', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'i', 'e', '',  '']
      for (var i = 0; i < a.length; i++) {
         title = title.replace(new RegExp(a[i], "gi"), b[i]).replace(/—/g, '-').replace(/&amp;/g, '&')
      }
   }
   return title + '.mp3'
}

function addMuteToggle() {
   var st = document.createElement('style')
   st.textContent = '#top_notify_btn { position: relative; }\r\n' +
                  '#top_notify_btn.muted > .top_nav_btn_icon::before {\r\n' +
                  '   display: block;\r\n' +
                  '   content: \'\';\r\n' +
                  '   width: 2px;\r\n' +
                  '   height: 26px;\r\n' +
                  '   position: absolute;\r\n' +
                  '   top: -3px; left: 50%;\r\n' +
                  '   margin-left: -1px;\r\n' +
                  '   margin-top: 11px;\r\n' +
                  '   background: #17395c;\r\n' +
                  '   transform: rotate(45deg);\r\n' +
                  '}\r\n' +
                  '#top_notify_btn.active.muted > .top_nav_btn_icon::before,\r\n' +
                  '#top_notify_btn.has_notify.muted > .top_nav_btn_icon::before {\r\n' +
                  '   background: #fdfdfd;\r\n' +
                  '}\r\n'
   document.head.appendChild(st)
   var s = document.createElement('script')
   s.textContent = '(function() { var btn = document.querySelector(\'#top_notify_btn\')\r\n' +
                 'if (localStorage.noDisturbMode) {\r\n' +
                 '   btn.parentNode.classList.add(\'muted\') \r\n' +
                 '}\r\n' +
                 'var toggle = function(event) {\r\n' +
                 '   if (event && event instanceof Event) {\r\n' +
                 '      if (!event.shiftKey) return\r\n' +
                 '      event.stopPropagation()\r\n' +
                 '      event.preventDefault()\r\n' +
                 '   }\r\n' +
                 '   if (!this.classList.contains(\'muted\')) {\r\n' +
                 '      this.classList.add(\'muted\')\r\n' +
                 '      cur.noDisturbMode = true\r\n' +
                 '      localStorage.noDisturbMode = true\r\n' +
                 '   } else {\r\n' +
                 '      this.classList.remove(\'muted\')\r\n' +
                 '      delete cur.noDisturbMode\r\n' +
                 '      delete localStorage.noDisturbMode\r\n' +
                 '   }\r\n' +
                 '}\r\n' +
                 'btn.addEventListener(\'click\', toggle)\r\n' +
                 'document.addEventListener(\'keydown\', function(event) {\r\n' +
                    'if (event.ctrlKey && event.repeat == 0 && event.keyCode == 77) {\r\n' +
                    '   toggle.call(document.querySelector(\'#top_notify_btn\'))\r\n' +
                    '}\r\n' +
                 '})\r\n' +
                 'btn.addEventListener(\'mousedown\', function(event) {\r\n' +
                 '   event.stopPropagation()\r\n' +
                 '})\r\n' +
                 'setInterval(function() {\r\n' +
                 '   if (localStorage.noDisturbMode) {\r\n' +
                 '      document.querySelector(\'#top_notify_btn\').classList.add(\'muted\')\r\n' +
                 '   } else {\r\n' +
                 '      document.querySelector(\'#top_notify_btn\').classList.remove(\'muted\')\r\n' +
                 '   }\r\n' +
   '}, 1000)\r\n})()\r\n'
   document.body.appendChild(s)
}

extension.onMessage.addListener(function(request, sender, sendResponse) {
   if (request.operation == 'update') {
      for (var field in request.data) {
         switch (field) {
            case 'header':
               if (header && !request.data['header']) {
                  if (document.getElementById('page_header_cont').style.top != '') {
                     shiftClick({ shiftKey: true, target: document.body })
                  }
                  document.body.removeEventListener('click', shiftClick)
               } else if (!header && request.data['header']) {
                  document.body.addEventListener('click', shiftClick, false)
               }
               header = !header
               break;
            case 'wall':
               if (wall && !request.data['wall']) {
                  document.getElementById('narrow_column').classList.remove('hidden')
                  if (timer) {
                     clearTimeout(timer)
                     timer = null
                  }
                  getElementsByClass('wide_column_wrap', document.body, 'div')[0].style.marginRight = ''
                  getElementsByClass('wide_column_wrap', document.body, 'div')[0].style.marginLeft = ''

                  document.getElementById('narrow_column').classList.remove('fixed')
                  document.getElementById('narrow_column').style.bottom = ''

                  resetPhotoSizes()
                  updatePhotoSizes()

                  if (st2) {
                     document.head.removeChild(st2)
                     st2 = null
                  }
                  document.getElementById('narrow_column').style.opacity = ''
                  height = 0
               } else if (!wall && request.data['wall']) {

               }
               wall = !wall
               break;
            case 'old_im':
               new_im = !new_im
               if (new_im) enableNewIM()
               else disableNewIM()
               break;
            case 'square_pics':
               round_pics = !round_pics
               if (round_pics) enableRoundAvatars()
               else disableRoundAvatars()
               break;
            case 'old_navbar':
               old_navbar = !old_navbar
               if (old_navbar) enableOldNavbar()
               else disableOldNavbar()
               break;
            case 'night_mode':
               night_mode = !night_mode
               if (night_mode) enableNightMode()
               else disableNightMode()
               break;   
            case 'nocounters':
               nocounters = !nocounters
               if (document.getElementById('profile')) {
                  getElementsByClass('counts_module', document.getElementById('wide_column'), 'div')[0].style.display = ''
               } else {
                  checkCountsBlock()
               }
               break;
            case 'photo_comments':
               if (photo_comments && !request.data['photo_comments']) {
                  disableHideComments()
               } else if (!photo_comments && request.data['photo_comments']) {
                  enableHideComments()
               }
               photo_comments = !photo_comments
               break;
            case 'photo_fullscreen':
               if (photo_fullscreen && !request.data['photo_fullscreen']) {
                  disableFullscreen()
               } else if (!photo_fullscreen && request.data['photo_fullscreen']) {
                  enableFullscreen()
               }
               photo_fullscreen = !photo_fullscreen
               break;
            case 'audio_flash':
               if (audio_flash && !request.data['audio_flash']) {
                  disableFlash()
                  fixAudioVolume()
               } else if (!audio_flash && request.data['audio_flash']) {
                  enableFlash()
                  fixAudioVolume()
               }
               audio_flash = !audio_flash
               break;
            case 'audio_largeblock':
               audio_largeblock = !audio_largeblock
               checkAudiosBlock()
               break;
         }
      }
   }
})

function checkPhotoviewer() {
   if (navigator.userAgent.indexOf('Chrome/45') != -1 && document.getElementById('pv_photo') && !document.getElementById('bugfix')) {
      var s = document.createElement('script')
      s.id = 'bugfix'
      s.textContent = 'if (!Photoview.updateRightBlock0) { Photoview.updateRightBlock0 = Photoview.updateRightBlock; Photoview.updateRightBlock = function() { this.updateRightBlock0(); removeEvent(geByClass("ui_scroll_outer")[0], "wheel"); addEvent(geByClass("ui_scroll_outer")[0], "wheel", function(event) { geByClass("ui_scroll_outer")[0].scrollTop = geByClass("ui_scroll_outer")[0].scrollTop + event.deltaY }) } }\r\n'
      document.body.appendChild(s)
   }
   if (!photo_comments) return
   if (!document.getElementById('pv_photo')) return

   if (!fixed_chrome) {
      var s = document.createElement('script')
      s.textContent = 'if (document.body.onmouseenter == undefined) { ElementTooltip.prototype._initEvents = function(el) {if (this._opts.autoShow) { addEvent(el, "mouseover", this._onMouseEnter.bind(this)); addEvent(el, "mouseout", this._onMouseLeave.bind(this)); } } }\r\n' + 'vkCache[geByClass("pv_actions_more")[0][vkExpand]]["ett"]._initEvents(geByClass("pv_actions_more")[0])\r\n'
      document.body.appendChild(s)
      fixed_chrome = true
   }

   var c = document.querySelector('#pv_box .pv_like_fs_wrap')
   var btn = c.querySelector('.pv_tc_wrap')
   if (btn) return
   var d = document.createElement('div')
   d.className = 'pv_tc_wrap'
   d.innerHTML = '<div class="pv_tc_btn"><div></div></div>'
   c.appendChild(d)
   d.onmousedown = function(event) {
      var box = document.getElementById('pv_box')
      var photo = document.getElementById('pv_photo')
      var col = getElementsByClass('pv_narrow_column_wrap', box, 'div')[0]
      if (col.style.left == '') {
         if (timer) {
            clearTimeout(timer)
            timer = null
         }
         col.parentNode.style.whiteSpace = 'nowrap'
         col.style.float = 'none'
         col.style.left = col.clientWidth + 'px'
         photo.style.width = box.clientWidth + 'px'
         timer = setTimeout(function() {
            st = document.createElement('style')
            st.textContent = '.pv_cont { width: ' + box.clientWidth + 'px !important } ' +
                                     '#pv_photo { width: ' + box.clientWidth + 'px !important }'
            document.head.appendChild(st)
         }, 800)
      } else {
         if (timer) {
            clearTimeout(timer)
            timer = null
         }
         col.style.left = ''
         if (st) {
            document.head.removeChild(st)
            st = null
         }
         photo.style.width = (box.clientWidth - col.clientWidth) + 'px'
         timer = setTimeout(function() {
            getElementsByClass('pv_narrow_column_wrap', box, 'div')[0].style.float= ''
            col.parentNode.style.whiteSpace = ''
         }, 800)
      }
      event.stopPropagation()
   }
}

function enableHideComments() {
   var els = getElementsByClass('pv_tc_wrap', document.getElementById('pv_box'), 'div')
   if (els.length) {
      els[0].style.display = ''
   }
   var s = document.createElement('script')
   if (!window.resizeHandlerAdded) {
      s.textContent = 'function fixResize(event) { if (!event.ignore && ge("pv_photo")) { ge("pv_photo").style.transition = "width 0s linear 0s"; triggerEvent(window, "resize", { ignore:  true }); setTimeout(function() { ge("pv_photo").style.transition = "" }, 500) } }\r\n'
   }
   s.textContent += 'addEvent(window, "resize", fixResize)'
   document.body.appendChild(s)
   window.resizeHandlerAdded = true
}

function disableHideComments() {
   var els = getElementsByClass('pv_tc_wrap', document.getElementById('pv_box'), 'div')
   if (els.length) {
      els[0].style.display = 'none'
   }
   var s = document.createElement('script')
   s.textContent += 'removeEvent(window, "resize", fixResize)'
   document.body.appendChild(s)
}

var s1 = null, s2 = null

function enableFlash() {
   s1 = document.createElement('script')
   s1.textContent = 'window.override = false; window.audio_timer = setInterval(function() { if (window.AudioPlayerHTML5 && !window.override) { AudioPlayerHTML5.isSupported = function() { return browser.flash <= 0 }; window.override = true; AudioPlayerFlash.prototype.stop = function() { try { this._player && this._player.stopAudio() } catch(ex) {} }; window.ap._initImpl(); } }, 2000); if (window.ap._isPlaying) { window.ap.pause(); }'
   document.body.appendChild(s1)
}

function disableFlash() {
   document.body.removeChild(s1)
   s1 = document.createElement('script')
   s1.textContent = 'window.override = false; clearInterval(window.audio_timer); delete window.audio_timer; if (window.AudioPlayerHTML5) { AudioPlayerHTML5.isSupported = function () { var t = "undefined" != typeof navigator ? navigator.userAgent : ""; if (/(Windows NT 5.1|Windows XP)/.test(t) && (browser.vivaldi || browser.opera || browser.mozilla)) return AudioUtils.debugLog("Force no HTML5 (xp vivaldi / opera / mozilla)"), !1; if (/(Windows 7|Windows NT 6.1)/.test(t) && (browser.vivaldi || browser.opera)) return AudioUtils.debugLog("Force no HTML5 (win7 vivaldi / opera)"), !1; var i = document.createElement("audio"); if (i.canPlayType) { var e = i.canPlayType(\'audio/mpeg; codecs="mp3"\'), o = !!e.replace(/no/, ""); return AudioUtils.debugLog("HTML5 browser support " + (o ? "yes" : "no"), e, t), o } return AudioUtils.debugLog("audio.canPlayType is not available", t), !1 }; if (window.ap._isPlaying) { window.ap.pause(); window.ap.stop(); } window.ap._initImpl(); }'
   document.body.appendChild(s1)
}

function enableFullscreen() {
   if (s2) {
      document.body.removeChild(s2)
   }
   s2 = document.createElement('script')
   s2.textContent = 'function openFullscreen(event) {\r\n' +
                  '   if (!document.getElementById("pv_photo") || document.getElementById("layer_wrap").style.display != "block") return\r\n' +
                  '   var sel = window.getSelection()\r\n' +
                  '   var focusedElement = getSelection().anchorNode\r\n' +
                  '   while (focusedElement && focusedElement.nodeType != 1) {\r\n' +
                  '      focusedElement = focusedElement.parentNode\r\n' +
                  '   }\r\n' +
                  '   if (focusedElement && ((focusedElement.tagName == "INPUT" && focusedElement.type == "text") ||\r\n' +
                  '      focusedElement.tagName == "TEXTAREA" || focusedElement.isContentEditable)) return\r\n' +
                  '   if (event.keyCode == 13) {\r\n' +
                  '      event.preventDefault()\r\n' +
                  '      window.open(Photoview.genData(cur.pvCurPhoto, "w").src)\r\n' +
                  '   }\r\n' +
                  '}\r\n' +
                  'document.body.addEventListener("keydown", openFullscreen, false)\r\n'
   document.body.appendChild(s2)
}

function disableFullscreen() {
   if (s2) {
      document.body.removeChild(s2)
   }
   s2 = document.createElement('script')
   s2.textContent = 'document.body.removeEventListener("keydown", openFullscreen)\r\n'
   document.body.appendChild(s2)
}

function enableNewIM() {
   if (st2) {
      document.head.removeChild(st2)
   }
   st2 = document.createElement('style')
   document.head.appendChild(st2)
   var req = new XMLHttpRequest()
   req.open('GET', extension.getURL('styles/im_new.css'), true)
   req.onload = function() {
      st2.textContent = req.responseText
   }
   req.send()
}

function disableNewIM() {
   if (st2) {
      document.head.removeChild(st2)
   }
   st2 = document.createElement('style')
   document.head.appendChild(st2)
   var req = new XMLHttpRequest()
   req.open('GET', extension.getURL('styles/im_old.css'), true)
   req.onload = function() {
      st2.textContent = req.responseText
   }
   req.send()
}

function enableRoundAvatars() {
   if (st3) return
   st3 = document.createElement('style')
   var content = '.module_body .people_cell_img { border-radius: 50% !important; }\n'
   content += '.nim-peer .nim-peer--photo .im_grid>img, .nim-peer .nim-peer--photo>img { border-radius: 50% !important; }\n'
   content += '.im-page.with_pics .nim-dialog.nim-dialog_classic .nim-dialog--name, .im-page.with_pics .nim-dialog.nim-dialog_classic .nim-dialog--date { margin-top: 1px !important; }\n'
   content += '.im-prebody img { border-radius: 50% !important; }\n'
   content += '.feedback_img { border-radius: 50% !important; }\n'
   content += '.post_img { border-radius: 50% !important; }\n'
   content += '.wall_module .reply_img { border-radius: 50% !important; }\n'
   content += '[dir] img.fc_contact_photo { border-radius: 50% !important; }\n'
   st3.textContent = content
   document.head.appendChild(st3)
}

function disableRoundAvatars() {
   if (!st3) return
   document.head.removeChild(st3)
   st3 = null
}

function enableOldNavbar(force) {
   if (st4 && !force) return
   if (!st4) {
      st4 = document.createElement('style')
      document.head.appendChild(st4)
   }
   document.getElementById('page_header_cont').classList.remove('newTopBar')
   var req = new XMLHttpRequest()
   req.open('GET', extension.getURL('styles/navbar_old.css'), true)
   req.onload = function() {
      var str =  req.responseText + '\r\n'
      
      if (night_mode) {
         str += '.TopNavBtn__notify svg, .TopNavBtn__audio svg {\r\n' +
                '    display: none;\r\n' +
                '}\r\n' +
                '#top_notify_btn::before, #top_audio::before {\r\n' +
                '    display: block;\r\n' +
                '    content: "";\r\n' +
                '    width: 26px;\r\n' +
                '    height: 24px;\r\n' +
                '    position: absolute;\r\n' +
                '    left: 11px;\r\n' +
                '    top: 13px;\r\n' +
                '}\r\n' +
                '[dir] #page_header_cont, #dev_top_nav_wrap {\r\n' +
                '   background-color: #3a4259 !important;\r\n' +
                '   border-bottom: 1px solid #464655 !important;\r\n' +
                '}\r\n' +
                '#ts_input {\r\n' +
                '   background-color: #4d5467 !important;\r\n' +
                '   border: 1px solid #49506392;\r\n' +
                '}\r\n' +
                '[dir="ltr"] body.dev input.dev_top_input {\r\n' +
                '   padding: 8px 6px 6px 29px !important;\r\n' +
                '   background-position: 8px 8px !important;\r\n' +
                '   background-color: #4d5467 !important;\r\n' +
                '   filter: grayscale(0.7) !important;\r\n' +
                '   color: #fff;\r\n' +
                '}\r\n' +
                '[dir] #page_header_cont #top_notify_btn::before {\r\n' +
                '   background: url("data:image/svg+xml,%3Csvg height=\'20\' viewBox=\'0 0 20 20\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'m8 18c-1.35416667 0-2.5-.7-2.5-2h5c0 1.3-1.14583333 2-2.5 2zm5.9956933-7c0 1.5 2.0043067 1.5 2.0043067 2.5 0 .5 0 1.5-2.1044016 1.5h-11.91128855c-1.98430985 0-1.98430985-1-1.98430985-1.5 0-1 1.98430985-1 2-2.5v-3c0-4 2.09724901-6.5 5-6.9v-.1c0-.6.5-1 1-1s1 .4 1 1v.1c2.902751.4 4.9956933 2.9 4.9956933 6.9z\' fill=\'%235a6985\' fill-rule=\'evenodd\' transform=\'translate(2 1)\'/%3E%3C/svg%3E") center center / 23px !important;\r\n' +
                '}\r\n' +
                '[dir] #page_header_cont #top_audio::before {\r\n' +
                '   background: url("data:image/svg+xml,%3Csvg height=\'20\' viewBox=\'0 0 20 20\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'m14 11.1552322v-5.6552322l-7 2v7.7999878s-.00076021-.000114-.00225099-.0003451c-.00469478 1.1500293-1.0157329 2.2529207-2.45934692 2.5862052-1.63053306.3764383-3.19546426-.3714797-3.49537168-1.6705214-.29990741-1.2990417.7787778-2.6572866 2.40931086-3.0337248.53731735-.1240495 1.06751079-.1260016 1.54765873-.0263695v-9.1596547c0-.55074053.42843442-1.11242325.95693506-1.25655979l9.08612984-2.47803542c.5257221-.14337873.9569351.18658106.9569351.73867844v12.30032707c-.000747-.000116-.0014973-.000235-.0022509-.0003569-.0046879 1.1500335-1.015728 2.2529313-2.459347 2.586217-1.6305331.3764383-3.1954643-.3714797-3.4953717-1.6705214s.7787778-2.6572866 2.4093109-3.0337248c.5373173-.1240495 1.0675108-.1260016 1.5476587-.0263695z\' fill=\'%235a6985\' fill-rule=\'evenodd\' transform=\'translate(1 1)\'/%3E%3C/svg%3E") center center / 24px !important;\r\n' +
                '}\r\n' +
                '.TopNavBtn:hover #top_notify_btn::before, .TopNavBtn:hover #top_audio::before {\r\n' +
                '   filter: brightness(1.85);\r\n' +
                '}\r\n' +
                '[dir] #top_notify_count {\r\n' +
                '   border: 2px solid #565252 !important;\r\n' +
                '}\r\n' +
                '.top_notify_header {\r\n' +
                '   color: var(--text_primary) !important;\r\n' +
                '}\r\n' +
                '.top_audio_player .top_audio_player_title {\r\n' +
                '   color: #ddd !important;\r\n' +
                '}\r\n'
         str += '[dir] #page_header_cont #top_notify_btn::before, [dir] #page_header_cont #top_audio::before { filter: brightness(1) }\n'
      }
      st4.textContent = str
   }
   req.send()
}

function disableOldNavbar() {
   if (!st4) return
   document.head.removeChild(st4)
   st4 = null
   document.getElementById('page_header_cont').classList.add('newTopBar')
   if (night_mode) {
      if (st_aux) {
         document.head.removeChild(st_aux)
      }
      st_aux = document.createElement('style')
      document.head.appendChild(st_aux)
      var str = ''
      str += '[dir] #page_header_cont, #dev_top_nav_wrap {\r\n' +
             '   background-color: #3a4259 !important;\r\n' +
             '   border-bottom: 1px solid #464655 !important;\r\n' +
             '}\r\n' +
             '#ts_input {\r\n' +
             '   background-color: #4d5467 !important;\r\n' +
             '   border: 1px solid #49506392;\r\n' +
             '}\r\n' +
             '[dir="ltr"] body.dev input.dev_top_input {\r\n' +
             '   padding: 8px 6px 6px 29px !important;\r\n' +
             '   background-position: 8px 8px !important;\r\n' +
             '   background-color: #4d5467 !important;\r\n' +
             '   filter: grayscale(0.7) !important;\r\n' +
             '   color: #fff;\r\n' +
             '}\r\n' +
             '[dir] #page_header_cont #top_notify_btn::before {\r\n' +
             '   background: url("data:image/svg+xml,%3Csvg height=\'20\' viewBox=\'0 0 20 20\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'m8 18c-1.35416667 0-2.5-.7-2.5-2h5c0 1.3-1.14583333 2-2.5 2zm5.9956933-7c0 1.5 2.0043067 1.5 2.0043067 2.5 0 .5 0 1.5-2.1044016 1.5h-11.91128855c-1.98430985 0-1.98430985-1-1.98430985-1.5 0-1 1.98430985-1 2-2.5v-3c0-4 2.09724901-6.5 5-6.9v-.1c0-.6.5-1 1-1s1 .4 1 1v.1c2.902751.4 4.9956933 2.9 4.9956933 6.9z\' fill=\'%235a6985\' fill-rule=\'evenodd\' transform=\'translate(2 1)\'/%3E%3C/svg%3E") center center / 23px !important;\r\n' +
             '}\r\n' +
             '[dir] #page_header_cont #top_audio::before {\r\n' +
             '   background: url("data:image/svg+xml,%3Csvg height=\'20\' viewBox=\'0 0 20 20\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'m14 11.1552322v-5.6552322l-7 2v7.7999878s-.00076021-.000114-.00225099-.0003451c-.00469478 1.1500293-1.0157329 2.2529207-2.45934692 2.5862052-1.63053306.3764383-3.19546426-.3714797-3.49537168-1.6705214-.29990741-1.2990417.7787778-2.6572866 2.40931086-3.0337248.53731735-.1240495 1.06751079-.1260016 1.54765873-.0263695v-9.1596547c0-.55074053.42843442-1.11242325.95693506-1.25655979l9.08612984-2.47803542c.5257221-.14337873.9569351.18658106.9569351.73867844v12.30032707c-.000747-.000116-.0014973-.000235-.0022509-.0003569-.0046879 1.1500335-1.015728 2.2529313-2.459347 2.586217-1.6305331.3764383-3.1954643-.3714797-3.4953717-1.6705214s.7787778-2.6572866 2.4093109-3.0337248c.5373173-.1240495 1.0675108-.1260016 1.5476587-.0263695z\' fill=\'%235a6985\' fill-rule=\'evenodd\' transform=\'translate(1 1)\'/%3E%3C/svg%3E") center center / 24px !important;\r\n' +
             '}\r\n' +
             '.TopNavBtn:hover #top_notify_btn::before, .TopNavBtn:hover #top_audio::before {\r\n' +
             '   filter: brightness(1.85);\r\n' +
             '}\r\n' +
             '[dir] #top_notify_count {\r\n' +
             '   border: 2px solid #565252 !important;\r\n' +
             '}\r\n' +
             '.top_notify_header {\r\n' +
             '   color: var(--text_primary) !important;\r\n' +
             '}\r\n' +
             '[dir] .top_audio_player .top_audio_player_prev .top_audio_player_btn_icon, [dir] .top_audio_player .top_audio_player_prev::before {\r\n' +
             '   background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22m0%200h24v24h-24z%22%20opacity%3D%22.2%22%2F%3E%3Cpath%20d%3D%22m16%2012.625v3.8653505c0%20.2819967.2259549.5096495.5046844.5096495h.9906312c.2906494%200%20.5046844-.2281779.5046844-.5096495v-8.98070098c0-.28199673-.2259549-.50964952-.5046844-.50964952h-.9906312c-.2906494%200-.5046844.22817786-.5046844.50964952v3.86535048l-6.56988525-4.10617828c-.23754582-.14846614-.43011475-.04116893-.43011475.2408278v8.98070098c0%20.2814716.19775391.3860533.43011475.2408278z%22%20fill%3D%22%23fff%22%20transform%3D%22matrix(-1%200%200%201%2027%200)%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") !important;\r\n' +
             '}\r\n' +
             '[dir] .top_audio_player .top_audio_player_play .top_audio_player_btn_icon, [dir] .top_audio_player .top_audio_player_play::before {\r\n' +
             '   background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22m0%200h24v24h-24z%22%20opacity%3D%22.2%22%2F%3E%3Cpath%20d%3D%22m7%2018.9991283c0%20.5527662.3722949.7526751.8248086.4509993l10.3503828-6.9002552c.4555292-.3036861.4525137-.798069%200-1.0997448l-10.3503828-6.9002552c-.45552921-.30368614-.8248086-.10524154-.8248086.45099926z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") !important;\r\n' +
             '}\r\n' +
             '[dir] .top_audio_player.top_audio_player_playing .top_audio_player_play .top_audio_player_btn_icon, [dir] .top_audio_player.top_audio_player_playing .top_audio_player_play::before {\r\n' +
             '   background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22m0%200h24v24h-24z%22%20opacity%3D%22.2%22%2F%3E%3Cpath%20d%3D%22m7%204.7081449c0-.39109763.31387329-.7081449.69674683-.7081449h2.60650637c.3848026%200%20.6967468.30533409.6967468.7081449v14.5837102c0%20.3910976-.3138733.7081449-.6967468.7081449h-2.60650637c-.38480265%200-.69674683-.3053341-.69674683-.7081449zm6%200c0-.39109763.3138733-.7081449.6967468-.7081449h2.6065064c.3848026%200%20.6967468.30533409.6967468.7081449v14.5837102c0%20.3910976-.3138733.7081449-.6967468.7081449h-2.6065064c-.3848026%200-.6967468-.3053341-.6967468-.7081449z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") !important;\r\n' +
             '}\r\n' +
             '[dir] .top_audio_player .top_audio_player_next .top_audio_player_btn_icon, [dir] .top_audio_player .top_audio_player_next::before {\r\n' +
             '   background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22m0%200h24v24h-24z%22%20opacity%3D%22.2%22%2F%3E%3Cpath%20d%3D%22m13%2012.625v3.8653505c0%20.2819967.2259549.5096495.5046844.5096495h.9906312c.2906494%200%20.5046844-.2281779.5046844-.5096495v-8.98070098c0-.28199673-.2259549-.50964952-.5046844-.50964952h-.9906312c-.2906494%200-.5046844.22817786-.5046844.50964952v3.86535048l-6.56988525-4.10617828c-.23754582-.14846614-.43011475-.04116893-.43011475.2408278v8.98070098c0%20.2814716.19775391.3860533.43011475.2408278z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") !important;\r\n' +
             '}\r\n' +
             '.TopNavBtn__notify svg, .TopNavBtn__audio svg, .top_audio_player button svg {\r\n' +
             '   display: none;\r\n' +
             '}\r\n' +
             '.top_audio_player button::before {\r\n' +
             '    display: block;\r\n' +
             '    content: "";\r\n' +
             '    width: 26px;\r\n' +
             '    height: 24px;\r\n' +
             '}\r\n'
      str += '#top_nav svg > path { fill: #416f99 !important; }\r\n'
      str += '[dir] #page_header_cont #top_notify_btn::before {\r\n    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%22none%22%20height%3D%2224%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%202.1c4%200%206.9%203.3%206.9%207.5v1.6c0%20.3.2.6.7%201.1l.3.3c1%201%201.5%201.7%201.5%202.7%200%20.5%200%20.8-.3%201.2-.4%201-1.4%201.4-2.8%201.4h-2c-.6%202.3-2%203.6-4.3%203.6-2.2%200-3.8-1.3-4.4-3.7v.1H5.7c-1.5%200-2.4-.5-2.9-1.4-.2-.4-.2-.7-.2-1.2%200-1%20.4-1.6%201.5-2.7l.3-.3c.5-.5.7-.8.7-1V9.5C5.1%205.4%208%202.1%2012%202.1zm2.5%2015.8h-5c.5%201.2%201.3%201.8%202.5%201.8s2-.6%202.5-1.8zM12%203.9c-3%200-5.1%202.4-5.1%205.7v1.6c0%20.9-.4%201.5-1.2%202.4l-.3.2c-.8.8-1%201.2-1%201.5v.4c.2.2.5.4%201.3.4h12.6c.8%200%201.1-.2%201.2-.4l.1-.4c0-.3-.2-.7-1-1.5a41%2041%200%2001-.3-.2c-.8-1-1.2-1.5-1.2-2.4V9.6C17.1%206.3%2015%204%2012%204z%22%20fill%3D%22%235a6985%22%2F%3E%3C%2Fsvg%3E") !important;\r\n    background-size: 24px !important\r\n}\r\n'
      str += '[dir] #page_header_cont #top_audio::before {\r\n    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%22none%22%20height%3D%2224%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20clip-rule%3D%22evenodd%22%20d%3D%22M16.7%203.6a17.3%2017.3%200%20011.8-.2c.2%200%20.4.2.5.4v.4l.1%201.3L8.9%207.6v-.5a15.5%2015.5%200%20010-1.4l.5-.5.3-.1%201-.2zm-9.6%2011h-.2a6%206%200%2000-4%201.2c-1%20.8-1.3%201.8-1.3%202.7C1.6%2020.4%203.1%2022%205%2022c.9%200%202-.4%202.7-1.3a6%206%200%20001.2-4V9.5l10.2-2.1v5.2h-.2a6%206%200%2000-4%201.2c-1%20.8-1.3%201.8-1.3%202.7%200%201.9%201.5%203.4%203.4%203.4.9%200%202-.4%202.7-1.3a6%206%200%20001.2-4V5.5%204c0-.4-.2-.8-.4-1.2-.3-.5-.8-1-1.4-1.1-.4-.2-.9-.2-1.3-.1l-1.4.2-6%201.3-1.2.2a3%203%200%2000-.9.5c-.4.3-.7.7-1%201.2a3%203%200%2000-.2%201V7zm9%20.6c-.5.4-.7.9-.7%201.3%200%20.9.7%201.6%201.6%201.6.4%200%201-.2%201.3-.6.4-.5.8-1.4.8-2.9v-.2h-.2c-1.5%200-2.4.4-2.9.8zM3.3%2018.5c0-.4.2-1%20.6-1.3.5-.4%201.4-.8%202.9-.8h.2v.2c0%201.5-.4%202.4-.8%202.9-.4.4-.9.6-1.3.6-.9%200-1.6-.7-1.6-1.6z%22%20fill%3D%22%235a6985%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E") !important;\r\n    background-size: 24px !important;\r\n}\r\n'
      str += '[dir] #page_header_cont #top_notify_btn::before, [dir] #page_header_cont #top_audio::before { filter: brightness(1.08) }\r\n'
      st_aux.textContent = str
   }
}

function enableNightMode() {
   if (st5) return
   st5 = document.createElement('style')
   document.head.appendChild(st5)
   var req = new XMLHttpRequest()
   req.open('GET', extension.getURL('styles/nightmode.css'), true)
   req.onload = function() {
      var str = req.responseText + '\r\n'
      if (!old_navbar) {
         str += '#top_nav svg > path { fill: #416f99 !important; }\r\n'
         str += '[dir] #page_header_cont #top_notify_btn::before {\r\n    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%22none%22%20height%3D%2224%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%202.1c4%200%206.9%203.3%206.9%207.5v1.6c0%20.3.2.6.7%201.1l.3.3c1%201%201.5%201.7%201.5%202.7%200%20.5%200%20.8-.3%201.2-.4%201-1.4%201.4-2.8%201.4h-2c-.6%202.3-2%203.6-4.3%203.6-2.2%200-3.8-1.3-4.4-3.7v.1H5.7c-1.5%200-2.4-.5-2.9-1.4-.2-.4-.2-.7-.2-1.2%200-1%20.4-1.6%201.5-2.7l.3-.3c.5-.5.7-.8.7-1V9.5C5.1%205.4%208%202.1%2012%202.1zm2.5%2015.8h-5c.5%201.2%201.3%201.8%202.5%201.8s2-.6%202.5-1.8zM12%203.9c-3%200-5.1%202.4-5.1%205.7v1.6c0%20.9-.4%201.5-1.2%202.4l-.3.2c-.8.8-1%201.2-1%201.5v.4c.2.2.5.4%201.3.4h12.6c.8%200%201.1-.2%201.2-.4l.1-.4c0-.3-.2-.7-1-1.5a41%2041%200%2001-.3-.2c-.8-1-1.2-1.5-1.2-2.4V9.6C17.1%206.3%2015%204%2012%204z%22%20fill%3D%22%235a6985%22%2F%3E%3C%2Fsvg%3E") !important;\r\n    background-size: 24px !important\r\n}\r\n'
         str += '[dir] #page_header_cont #top_audio::before {\r\n    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%22none%22%20height%3D%2224%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20clip-rule%3D%22evenodd%22%20d%3D%22M16.7%203.6a17.3%2017.3%200%20011.8-.2c.2%200%20.4.2.5.4v.4l.1%201.3L8.9%207.6v-.5a15.5%2015.5%200%20010-1.4l.5-.5.3-.1%201-.2zm-9.6%2011h-.2a6%206%200%2000-4%201.2c-1%20.8-1.3%201.8-1.3%202.7C1.6%2020.4%203.1%2022%205%2022c.9%200%202-.4%202.7-1.3a6%206%200%20001.2-4V9.5l10.2-2.1v5.2h-.2a6%206%200%2000-4%201.2c-1%20.8-1.3%201.8-1.3%202.7%200%201.9%201.5%203.4%203.4%203.4.9%200%202-.4%202.7-1.3a6%206%200%20001.2-4V5.5%204c0-.4-.2-.8-.4-1.2-.3-.5-.8-1-1.4-1.1-.4-.2-.9-.2-1.3-.1l-1.4.2-6%201.3-1.2.2a3%203%200%2000-.9.5c-.4.3-.7.7-1%201.2a3%203%200%2000-.2%201V7zm9%20.6c-.5.4-.7.9-.7%201.3%200%20.9.7%201.6%201.6%201.6.4%200%201-.2%201.3-.6.4-.5.8-1.4.8-2.9v-.2h-.2c-1.5%200-2.4.4-2.9.8zM3.3%2018.5c0-.4.2-1%20.6-1.3.5-.4%201.4-.8%202.9-.8h.2v.2c0%201.5-.4%202.4-.8%202.9-.4.4-.9.6-1.3.6-.9%200-1.6-.7-1.6-1.6z%22%20fill%3D%22%235a6985%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E") !important;\r\n    background-size: 24px !important;\r\n}\r\n'
         str += '[dir] #page_header_cont #top_notify_btn::before, [dir] #page_header_cont #top_audio::before { filter: brightness(1.08) }\r\n'
      }
      st5.textContent = str
   }
   req.send()
}

function disableNightMode() {
   if (!st5) return
   document.head.removeChild(st5)
   st5 = null
   if (st_aux) {
      document.head.removeChild(st_aux)
      st_aux = null
   }
   if (old_navbar) {
      enableOldNavbar(true)
   }
}

function shiftClick(event) {
   if (event.shiftKey) {
      var el = event.target
      while (el && el.classList) {
         if (el.classList.contains('im-mess')) return
         el = el.parentNode
      }
      var focusedElement = getSelection().anchorNode
      while (focusedElement && focusedElement.nodeType != 1) {
         focusedElement = focusedElement.parentNode
      }
      if (focusedElement && ((focusedElement.tagName == 'INPUT' && focusedElement.type == 'text') ||
          focusedElement.tagName == 'TEXTAREA' || focusedElement.isContentEditable)) return
      if (document.getElementById('page_header_cont').style.top == '') {
         var h = document.getElementById('page_header_cont').clientHeight
         document.getElementById('page_header_cont').style.top = - h + 'px'
         document.getElementById('side_bar_inner').style.marginTop = '0px'
         document.getElementById('page_body').style.marginTop = '0px'
         var els = getElementsByClass('im-page', document.body, 'div')
         if (els.length && els[0].className.match(/(^|\s)im-page_classic(\s|$)/)) {
            getElementsByClass('_im_dialogs_search', els[0], 'div')[0].style.marginTop = '-105px'
            getElementsByClass('im-page--chat-header', els[0], 'div')[0].style.marginTop = '-57px'
            getElementsByClass('im-right-menu', els[0].parentNode, 'div')[0].style.top = '0px'
         }
         var s = document.createElement('style')
         s.textContent = '.audio_page_player2.audio_page_player_fixed {\n' +
                         '   top: ' + (- h + 6) + 'px !important;\n' +
                         '}\n'
         s.id = 'player-fixed'
         document.head.appendChild(s)
      } else {
         document.getElementById('page_header_cont').style.top = ''
         document.getElementById('side_bar_inner').style.marginTop = ''
         document.getElementById('page_body').style.marginTop = ''
         var els = getElementsByClass('im-page', document.body, 'div')
         if (els.length) {
            getElementsByClass('_im_dialogs_search', els[0], 'div')[0].style.marginTop = ''
            getElementsByClass('im-page--chat-header', els[0], 'div')[0].style.marginTop = ''
            getElementsByClass('im-right-menu', els[0].parentNode, 'div')[0].style.top = ''
         }
         if (document.getElementById('player-fixed')) {
            document.head.removeChild(document.getElementById('player-fixed'))
         }
      }
   }
}

function isChildOfClass(obj, str) {
   while (obj && obj.classList) {
      if (obj.classList.contains(str)) return true
      obj = obj.parentNode
   }
   return false
}

var timer = null

var load_time = +(new Date())

addEventListener('load', function() {
   width_check_threshold = 500
   var pageY = localStorage.pageYOffset || window.pageYOffset
   setTimeout(function() {
      if (document.getElementById('narrow_column') && window.pageYOffset > document.getElementById('narrow_column').clientHeight + 40) {
         wall = false
         var delta = window.pageYOffset - document.getElementById('narrow_column').clientHeight
         height = 0
         checkFeedWidth(true)
         setTimeout(function() {
            if (document.getElementById('public') || document.getElementById('group') || location.href.indexOf('/feed') != -1) {
               getElementsByClass('wide_column_wrap', document.body, 'div')[0].style.marginRight = '108px'
            } else if (document.getElementById('profile')) {
               getElementsByClass('wide_column_wrap', document.body, 'div')[0].style.marginRight = '130px'
               getElementsByClass('wide_column_wrap', document.body, 'div')[0].style.marginLeft = '-10px'
            }
            document.getElementById('narrow_column').classList.add('hidden')
         }, 300)
         setTimeout(function() {
            wall = true
            width_check_threshold = 800
            if (!window.do_not_scroll) window.scrollTo(0, pageY)
         }, 800)
         if (pageY > 800 && !stop_scroll_timer && !window.do_not_scroll) {
            restore_pos_timer = setTimeout(function() {
               window.scrollTo(0, pageY)
               restore_pos_timer = setTimeout(function() { window.scrollTo(0, pageY) }, 1000)
            }, 2000)
         }
      }
   }, 1000)

}, false)

var st = document.createElement('style')

var req = new XMLHttpRequest()
req.open('GET', extension.getURL('styles/style.css'), true)
req.onload = function() {
   st.textContent = req.responseText
}
req.send()

document.head.appendChild(st)


var st2 = null

disableNewIM()


var st3 = null, st4 = null, st5 = null, st_aux = null

function checkFeedWidth(force_extend) {
   if (!wall || location.href.match(/\/im[^\/]*$/)) return
   if (!document.getElementById('public') && !document.getElementById('group') &&
       !document.getElementById('profile') && location.href.indexOf('/feed') == -1) return
   if (height > 0 && window.pageYOffset < height-100 && (new Date())-last_width_check > width_check_threshold) {
      document.getElementById('narrow_column').classList.remove('hidden')
      last_width_check = new Date()
      if (timer) {
         clearTimeout(timer)
         timer = null
      }
      getElementsByClass('wide_column_wrap', document.body, 'div')[0].style.marginRight = ''
      getElementsByClass('wide_column_wrap', document.body, 'div')[0].style.marginLeft = ''

      document.getElementById('narrow_column').classList.remove('fixed')
      document.getElementById('narrow_column').style.bottom = ''

      if (+(new Date()) - load_time > 500) {
         resetPhotoSizes()
         setTimeout(updatePhotoSizes, 10)
	  }

      if (st2) {
         document.head.removeChild(st2)
         st2 = null
      }
      document.getElementById('narrow_column').style.opacity = ''
      height = 0
      return
   }
   if (force_extend || document.getElementById('narrow_column').classList.contains('fixed') && (new Date())-last_width_check > width_check_threshold) {
      if (window.pageYOffset < document.getElementById('narrow_column').clientHeight + 40) return
      document.getElementById('narrow_column').classList.add('hidden')
      last_width_check = new Date()
      if (height > 0) return
      height = document.getElementById('narrow_column').clientHeight

      timer = setTimeout(function() {
         if (document.getElementById('public') || document.getElementById('group') || location.href.indexOf('/feed') != -1) {
            getElementsByClass('wide_column_wrap', document.body, 'div')[0].style.marginRight = '108px'
         } else if (document.getElementById('profile')) {
            getElementsByClass('wide_column_wrap', document.body, 'div')[0].style.marginRight = '130px'
            getElementsByClass('wide_column_wrap', document.body, 'div')[0].style.marginLeft = '-10px'
         }
         st2 = document.createElement('style')
         var content = '#narrow_column { display: none; opacity: 0 !important } ' +
                       '.wall_text .page_post_sized_thumbs, ' +
                       '.wall_text .page_post_sized_thumbs>a:only-child {' +
                       ' width: 634px !important; height: auto } ' +
                       '.copy_quote .page_post_sized_thumbs {' +
                       ' width: 620px !important; height: auto !important } ' +
                       '.page_gif_large .page_doc_photo_href,' +
                       '.page_gif_large .page_doc_photo_href>.page_doc_photo {' +
                       ' width: 634px !important; height: 326px !important } ' +
                       '.copy_quote .page_gif_large .page_doc_photo_href,' +
                       '.copy_quote .page_gif_large .page_doc_photo_href>.page_doc_photo {' +
                       ' width: 620px !important; height: 320px !important } ' +
                       '.page_post_sized_thumbs>a:only-child {' +
                       'height: 100%; background-size: contain; width: auto !important } ' +
                       '.page_media_thumbed_link img { height: 274px !important }'
         st2.appendChild(document.createTextNode(content))
         document.head.appendChild(st2)
         if (!location.href.match(/\/im[^\/]*$/)) {
            if (+(new Date()) - load_time > 500) {
			   resetPhotoSizes()
               setTimeout(updatePhotoSizes, 10)
			}
         }
      }, 150)
   }
   document.getElementById('narrow_column').style.marginTop = '0px'
}

var last_width_check = 0
var width_check_threshold = 0

function updatePhotoSizes() {
   if (!wall || location.href.match(/\/im[^\/]*$/)) return
   var blocks = getElementsByClass('page_post_sized_thumbs', document.getElementById('page_body'), 'div')
   for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].processed && blocks[i].clientHeight > 0 || blocks[i].clientWidth == 0) continue
      blocks[i].style.height = 'auto'
      var photos = blocks[i].children
      var st = blocks[i].currentStyle || getComputedStyle(blocks[i], '')
      var width = blocks[i].clientWidth - parseInt(st.paddingLeft) - parseInt(st.paddingRight)
      var old_width = parseInt(blocks[i].style.width)
      var delta = Math.round(old_width / 15)
      if (!photos[0].originalHeight) continue
      if (photos.length == 1) {
         if (blocks[i].parentNode.classList.contains('page_post_sized_full_thumb')) continue
         if (photos[0].style.height != '') {
            photos[0].originalHeight = parseInt(photos[0].style.height)
         }
         var height = photos[0].style.height != '' ? parseInt(photos[0].style.height) : photos[0].originalHeight
         var h = Math.round(width / old_width * height)
         h = Math.max(h, 450)
         if (h > height && h > window.innerHeight * 0.8) h *= 0.8
         h = Math.min(h, window.innerHeight * 0.8)
         setTimeout((function(el) { el.style.height = h + 'px' }).bind(null, photos[0]), 500)
         setTimeout((function(el) { el.style.height = h + 'px' }).bind(null, photos[0]), 1000)
         setTimeout((function(el) { el.style.height = h + 'px' }).bind(null, photos[0]), 1500)
      }
      if (photos.length == 2) {
         if (blocks[i].parentNode.classList.contains('page_post_sized_full_thumb')) continue
         if (photos[0].style.height != '') {
            photos[0].originalHeight = parseInt(photos[0].style.height)
         }
         var height = photos[0].style.height != '' ? parseInt(photos[0].style.height) : photos[0].originalHeight
         var h = Math.round(width / old_width * height)
         photos[0].style.width = Math.floor((width-6)/2) + 'px'
         photos[1].style.width = width - parseInt(photos[0].style.width) - 6 + 'px'
         photos[0].style.height = h + 'px'
         photos[1].style.height = h + 'px'
      }
      if (photos.length == 3) {
         if (photos[0].classList.contains('page_post_thumb_last_column')) {
            photos[0].style.width = width + 'px'
            photos[0].style.height = '336px'
            photos[1].style.width = Math.floor((width-6)/2) + 'px'
            photos[1].style.height = '157px'
            photos[2].style.width = Math.ceil((width-6)/2) + 'px'
            photos[2].style.height = '157px'
         } else {
            photos[0].style.width = Math.floor((width-6)*0.6) + 'px'
            photos[0].style.height = '320px'
            photos[1].style.width = Math.ceil((width-6)*0.4) + 'px'
            photos[1].style.height = '157px'
            photos[2].style.width = Math.ceil((width-6)*0.4) + 'px'
            photos[2].style.height = '157px'
         }
      }
      if (blocks[i].parentNode.parentNode.classList.contains('page_album_wrap')) {
         var next_block = getElementsByClass('page_post_sized_thumbs', blocks[i].parentNode.nextElementSibling, 'div')
         if (!next_block.length) continue
         next_block = next_block[0]
         blocks[i].parentNode.parentNode.style.width = '634px'
         var n2 = next_block.children.length
         var width = (blocks[i].parentNode.parentNode.parentNode.clientWidth - 13)
         var w = Math.floor((width - (next_block.children.length-1) * 5) / n2)
         var h0 = parseInt(blocks[i].parentNode.previousElementSibling.children[0].children[0].style.height)
         var h = Math.floor((h0 - 5*(photos.length-1)) / photos.length)
         for (var j = 0; j < photos.length; j++) {
            photos[j].style.width = w + 'px'
            photos[j].style.height = h + 'px'
         }
         blocks[i].style.maxWidth = w + 'px'
         blocks[i].parentNode.previousElementSibling.children[0].children[0].style.width = (width - w - 5) + 'px'
         blocks[i].parentNode.previousElementSibling.children[0].children[0].style.height = h * photos.length + 5 * (photos.length-1) + 'px'
         next_block.style.width = width + 'px'
         for (var j = next_block.children.length-1; j >= 0; j--) {
            next_block.children[j].style.width = j > 0 ? w + 'px' : width - (w+5) * (next_block.children.length-1) + 'px'
            next_block.children[j].style.height = '83px'
         }
         blocks[i].classList.add('processed')
         blocks[i].processed = true
         blocks[i+1].classList.add('processed')
         blocks[i+1].processed = true
         i++
         continue
      }
      if (parseInt(blocks[i].style.width) < 240) {
         blocks[i].classList.add('processed')
         blocks[i].processed = true
         try {
            if (width > old_width) {
               adjustPhotosQuality(blocks[i], width, old_width)
            }
         } catch (ex) {}
         continue
      }
      if (photos.length == 5) {
         if (photos[0].classList.contains('page_post_thumb_last_column')) {
            photos[0].style.width = width + 'px'
            photos[0].style.height = '336px'
            photos[0].classList.add('page_post_thumb_last_column')
            photos[0].classList.remove('page_post_thumb_last_row')
            for (var j = 1; j <= 4; j++) {
               photos[j].style.width = Math.floor((width-18)/4) + 'px'
               photos[j].style.height = '94px'
               photos[j].classList.remove('page_post_thumb_last_column')
               photos[j].classList.add('page_post_thumb_last_row')
            }
            photos[4].classList.add('page_post_thumb_last_column')
         } else {
            for (var j = 0; j <= 1; j++) {
               photos[j].style.width = Math.floor((width-6)/2) + 'px'
               photos[j].style.height = '194px'
               photos[j].classList.remove('page_post_thumb_last_column')
               photos[j].classList.remove('page_post_thumb_last_row')
            }
            photos[1].classList.add('page_post_thumb_last_column')
            
            for (var j = 2; j <= 4; j++) {
               photos[j].style.width = Math.floor((width-12)/3) + 'px'
               photos[j].style.height = '114px'
               photos[j].classList.remove('page_post_thumb_last_column')
               photos[j].classList.add('page_post_thumb_last_row')
            }
            photos[4].classList.add('page_post_thumb_last_column')
         }
      }
      if (photos.length == 6) {
         if (photos[0].classList.contains('page_post_thumb_last_column')) {
            photos[0].style.width = width + 'px'
            photos[0].style.height = '336px'
            photos[0].classList.add('page_post_thumb_last_column')
            photos[0].classList.remove('page_post_thumb_last_row')
            
            for (var j = 1; j <= 5; j++) {
               photos[j].style.width = Math.floor((width-24)/5) + 'px'
               photos[j].style.height = '94px'
               photos[j].classList.remove('page_post_thumb_last_column')
               photos[j].classList.add('page_post_thumb_last_row')
            }
            photos[5].classList.add('page_post_thumb_last_column')
         } else {
            photos[0].style.width = Math.floor((width-6)/2) + 38 + 'px'
            photos[0].style.height = '186px'
            photos[0].classList.remove('page_post_thumb_last_column')
            photos[0].classList.remove('page_post_thumb_last_row')
            photos[1].style.width = Math.ceil((width-6)/2) - 38 + 'px'
            photos[1].style.height = '186px'
            photos[1].classList.add('page_post_thumb_last_column')
            photos[1].classList.remove('page_post_thumb_last_row')
            
            for (var j = 2; j <= 5; j++) {
               photos[j].style.width = Math.floor((width-18)/4) + 'px'
               photos[j].style.height = '114px'
               photos[j].classList.remove('page_post_thumb_last_column')
               photos[j].classList.add('page_post_thumb_last_row')
            }
            photos[5].classList.add('page_post_thumb_last_column')
         }
      }
      if (photos.length == 10) {
         photos[0].style.width = Math.floor((width-6)/2) + 'px'
         photos[0].style.height = '158px'
         photos[0].classList.remove('page_post_thumb_last_column')
         photos[0].classList.remove('page_post_thumb_last_row')
         photos[1].style.width = Math.ceil((width-6)/2) + 'px'
         photos[1].style.height = '158px'
         photos[1].classList.add('page_post_thumb_last_column')
         photos[1].classList.remove('page_post_thumb_last_row')
         
         for (var j = 2; j <= 4; j++) {
            photos[j].style.width = Math.floor((width-12)/3) + 'px'
            photos[j].style.height = '114px'
            photos[j].classList.remove('page_post_thumb_last_column')
            photos[j].classList.remove('page_post_thumb_last_row')
         }
         photos[4].classList.add('page_post_thumb_last_column')
         
         for (var j = 5; j <= 9; j++) {
            photos[j].style.width = Math.floor((width-24)/5) + 'px'
            photos[j].style.height = '83px'
            photos[j].classList.remove('page_post_thumb_last_column')
            photos[j].classList.add('page_post_thumb_last_row')
         }
         photos[9].classList.add('page_post_thumb_last_column')
      }
      if (photos.length == 4 ||
          photos.length == 9 && photos[2].className.match(/page_post_thumb_last_column/) && photos[5].className.match(/page_post_thumb_last_column/)) {
         for (var j = 0; j < photos.length; j++) {
            if (photos.length > 2 && (photos[2].className.match(/page_post_thumb_last_column/) || parseInt(photos[j].style.width) <= Math.round(old_width/3) + delta)) {
               if (parseInt(photos[j].style.width) <= parseInt(photos[j].style.height) * 1.3) {
                  var str = photos[j].getAttribute('onclick').match(/"x_":\["([^"]+)"/)[1]
                  var url = photos[j].style.backgroundImage.match(/\("?([^\)"]+)"?\)/)[1].match(/^https?:\/\/[^\/]+/)[0]
                  url += '/' + str + '.jpg'
                  photos[j].style.backgroundImage = 'url("' + url + '")'
                  photos[j].style.backgroundPositionY = '12%'
               }
               if (photos.length > 4) {
                  photos[j].style.width = Math.floor((width-12)/3) + 'px'
                  photos[j].style.height = '126px'
               }
            } else if (parseInt(photos[j].style.width) <= Math.round(old_width/2) + delta) {
               if (parseInt(photos[j].style.width) <= parseInt(photos[j].style.height) * 1.3) {
                  var str = photos[j].getAttribute('onclick').match(/"x_":\["([^"]+)"/)[1]
                  var url = photos[j].style.backgroundImage.match(/\("?([^\)"]+)"?\)/)[1].match(/^https?:\/\/[^\/]+/)[0]
                  url += '/' + str + '.jpg'
                  photos[j].style.backgroundImage = 'url("' + url + '")'
                  photos[j].style.backgroundPositionY = '12%'
               }
               if (photos.length > 4) {
                  photos[j].style.width = Math.floor((width-6)/2) + 'px'
                  photos[j].style.height = '176px'
               }
            }
         }
      }
      if (photos.length == 4) {
         for (var j = 0; j < photos.length; j++) {
             if (j % 2 == 0) photos[j].classList.remove('page_post_thumb_last_column')
             else photos[j].classList.add('page_post_thumb_last_column')
             photos[j].style.width = Math.floor((width-6)/2) + 'px'
             photos[j].style.height = width > old_width ? '186px' : '168px'
         }
      }
      if (photos.length == 9 && photos[3].className.match(/page_post_thumb_last_column/) ||
          (photos.length >= 7 && photos.length <= 9) && (photos[1].className.match(/page_post_thumb_last_column/) || (photos[2].className.match(/page_post_thumb_last_column/) && !photos[5].className.match(/page_post_thumb_last_column/)))) {
         var n = photos[1].classList.contains('page_post_thumb_last_column') ? 2 : 3  
         
         if (photos.length == 9 && photos[2].className.match(/page_post_thumb_last_column/) && !photos[5].className.match(/page_post_thumb_last_column/)) {
            for (var j = 0; j < photos.length; j++) {
               if (parseInt(photos[j].style.width) <= parseInt(photos[j].style.height) * 1.3) {
                  var str = photos[j].getAttribute('onclick').match(/"x_":\["([^"]+)"/)[1]
                  var url = photos[j].style.backgroundImage.match(/\("?([^\)"]+)"?\)/)[1].match(/^https?:\/\/[^\/]+/)[0]
                  url += '/' + str + '.jpg'
                  photos[j].style.backgroundImage = 'url("' + url + '")'
                  photos[j].style.backgroundPositionY = '12%'
               }
               photos[j].style.width = j < 4 ? Math.floor((width-18)/4) + 'px' : Math.floor((width-24)/5) + 'px'
               photos[j].style.height = width > old_width ? '218px' : '195px'
               if (j != 3 && j != 8) photos[j].classList.remove('page_post_thumb_last_column')
               else photos[j].classList.add('page_post_thumb_last_column')
               if (j < 4) photos[j].classList.remove('page_post_thumb_last_row')
               else photos[j].classList.add('page_post_thumb_last_row')
            }
         } else {
            for (var j = 0; j < photos.length; j++) {
               if (j >= n) photos[j].classList.remove('page_post_thumb_last_column')
               if (parseInt(photos[j].style.width) <= parseInt(photos[j].style.height) * 1.3) {
                  var str = photos[j].getAttribute('onclick').match(/"x_":\["([^"]+)"/)[1]
                  var url = photos[j].style.backgroundImage.match(/\("?([^\)"]+)"?\)/)[1].match(/^https?:\/\/[^\/]+/)[0]
                  url += '/' + str + '.jpg'
                  photos[j].style.backgroundImage = 'url("' + url + '")'
                  photos[j].style.backgroundPositionY = '12%'
               }
               photos[j].style.width = j < n ? Math.floor((width-6*(n-1))/n) + 'px' : Math.floor((width-6*(photos.length-n-1))/(photos.length-n)) + 'px'
               if (j < n) photos[j].style.height = width > old_width ? '218px' : '195px'
               else photos[j].style.height = width > old_width ? '102px' : '83px'
               if (j < n) photos[j].classList.remove('page_post_thumb_last_row')
               else photos[j].classList.add('page_post_thumb_last_row')
            }
         }
      }
      if (photos.length == 7 && photos[0].className.match(/page_post_thumb_last_column/)) {
         photos[0].style.width = width > old_width ? '634px' : '510px'
         photos[0].style.height = width > old_width ? '378px' : '340px'
         for (var j = 1; j < photos.length; j++) {
            if (parseInt(photos[j].style.width) <= parseInt(photos[j].style.height) * 1.3) {
               var str = photos[j].getAttribute('onclick').match(/"x_":\["([^"]+)"/)[1]
               var url = photos[j].style.backgroundImage.match(/\("?([^\)"]+)"?\)/)[1].match(/^https?:\/\/[^\/]+/)[0]
               url += '/' + str + '.jpg'
               photos[j].style.backgroundImage = 'url("' + url + '")'
               photos[j].style.backgroundPositionY = '12%'
            }
            photos[j].style.width = Math.floor((width-30)/6) + 'px'
            photos[j].style.height = width > old_width ? '89px' : '83px'
         }
      }
      photos[photos.length-1].classList.add('page_post_thumb_last_column')
      blocks[i].classList.add('processed')
      blocks[i].processed = true
      if (width > old_width) {
         adjustPhotosQuality(blocks[i], width, old_width)
      }
   }
}

function adjustPhotosQuality(block, new_width, old_width) {
   var photos = block.children
   for (var i = 0; i < photos.length; i++) {
      if (!photos[i].getAttribute('data-original')) {
         photos[i].setAttribute('data-original', photos[i].style.backgroundImage.match(/\("?([^\)"]+)"?\)/)[1])
      }
      var original = photos[i].getAttribute('data-original')
      if (new_width <= old_width) {
         photos[i].style.backgroundImage = 'url("' + original + '")'
      } else {
         var img = new Image()
         img.src = original
         if (new_width > img.width) {
            var a = photos[i].getAttribute('onclick').match(/"x_":\["([^"]+)",([0-9]+),[0-9]+\](,"y_":\["([^"]+)",[0-9]+,[0-9]+\])?/)
            var url = photos[i].style.backgroundImage.match(/\("?([^\)"]+)"?\)/)[1].match(/^https?:\/\/[^\/]+/)[0]
            if (a && a.length > 2) {
               if (a[1]) a[1] = a[1].replace(/\\\//g, '/').replace(/^https:\/\/[a-z0-9-]+\.userapi\.com\//, '')
               if (a[4]) a[4] = a[4].replace(/\\\//g, '/').replace(/^https:\/\/[a-z0-9-]+\.userapi\.com\//, '')
               url += '/' + (a[3] && new_width > parseInt(a[2]) ? a[4] : a[1]) + '.jpg'
               photos[i].style.backgroundImage = 'url("' + url + '")'
            }
         }
      }
   }
}

function resetPhotoSizes() {
   var blocks = getElementsByClass('page_post_sized_thumbs', document.body, 'div')
   for (var i = 0; i < blocks.length; i++) {
      var photos = blocks[i].children
      for (var j = 0; j < photos.length; j++) {
         photos[j].style.width = ''
         photos[j].style.height= ''
      }
      blocks[i].style.height = ''
      blocks[i].classList.remove('processed')
      blocks[i].processed = false
   }
}

document.getElementById('stl_bg').addEventListener('click', checkFeedWidth, false)

var height = 0

function checkAudiosBlock() {
   if (!audio_largeblock && document.getElementById('profile')) {
      var res = document.querySelectorAll('#wide_column aside')
      if (!res.length) return
      if (!res[res.length-1].children[0].classList.contains('audios_module')) return
      var block = res[res.length-1]
      document.getElementById('wide_column').removeChild(block.parentNode)
      document.getElementById('narrow_column').lastElementChild.appendChild(block)
   } else {
      if (!audio_largeblock || !document.getElementById('profile') || !Array.prototype.slice.call(document.querySelectorAll('#narrow_column aside'), -1)) return
      var res = document.querySelectorAll('#narrow_column aside')
      if (res[res.length-1].parentNode.parentNode.id != 'narrow_column' || !res[res.length-1].children[0].classList.contains('audios_module')) return
      var block = document.createElement('div')
      block.className = 'page_block'
      document.getElementById('wide_column').insertBefore(block, document.getElementById('wide_column').children[1])
      block.appendChild(res[res.length-1])
   }
}

function checkCountsBlock() {
   if (!nocounters || !document.getElementById('profile')) return
   var el = getElementsByClass('counts_module', document.getElementById('wide_column'), 'div')[0]
   el.style.display = 'none'
}

function checkImPage() {
   checkDialogs()

   var wrapper = document.querySelector('.im-page')
   if (wrapper) {
      if (new_im) wrapper.classList.add('with_pics')
      else wrapper.classList.remove('with_pics')
   }

   var fields = [getElementsByClass('im-chat-input--text', document.getElementById('im--page'), 'div')[0],
                 getElementsByClass('fc_editable', document.body, 'div')[0],
                 document.getElementById('mail_box_editable')]
   for (var i = 0; i < fields.length; i++) {
      if (!fields[i]) continue
      fields[i].addEventListener('keydown', function(event) {
         event.stopPropagation()
      }, false)
      fields[i].addEventListener('keyup', function(event) {
         event.stopPropagation()
      }, false)
      fields[i].addEventListener('focus', function(event) {
         document.body.classList.remove('no_select')
      }, false)
   }

   document.addEventListener('keydown', function(event) {
      if (event.keyCode == 16) {
         document.body.classList.add('no_select')
      }
   }, false)
   document.addEventListener('keyup', function(event) {
      document.body.classList.remove('no_select')
   }, false)

}

function checkDialogs() {
   if (document.getElementById('im_dialogs')) {
      var els = document.getElementById('im_dialogs').children
      for (var i = 0; i < els.length; i++) {
         if (els[i].processed) continue
         if (parseInt(els[i].getAttribute('data-list-id')) > 2000000000) {
            els[i].classList.add('im_group_chat')
            if (getElementsByClass('im-prebody', els[i], 'div').length > 0) {
               var photos = getElementsByClass('nim-peer--photo', els[i], 'div')[0].getElementsByTagName('img')
               var photo = getElementsByClass('im-prebody', els[i], 'div')[0].getElementsByTagName('img')[0]
               var found = false
               photo.parentNode.style.display = ''
               for (var j = 0; j < photos.length; j++) {
                  if (photos[j].src == photo.src) {
                     var s = document.createElement('span')
                     s.textContent = photos[j].getAttribute('alt') + ':'
                     photo.parentNode.insertBefore(s, photo)
                     found = true
                     break
                  }
               }
               if (!found && !new_im) {
                  var self_photo = getElementsByClass('top_profile_img', document.body, 'img')[0]
                  if (self_photo && photo.src == self_photo.src) {
                     var s = document.createElement('span')
                     s.textContent = 'Вы:'
                     photo.parentNode.insertBefore(s, photo)
                     found = true
                  }
               }
               if ((!found || !new_im) && photo.parentNode.firstElementChild.tagName.toLowerCase() == 'span') {
                  photo.parentNode.removeChild(photo.parentNode.firstElementChild)
                  photo.parentNode.style.display = 'none'
               }
               var c = photo.parentNode.parentNode.parentNode
               if (!found && !new_im && c.childNodes[1].nodeType == 3) {
                  c.removeChild(c.childNodes[1])
               }
            }
         }
         els[i].processed = true
      }
   }
}

function getElementsByClass(searchClass, node, tag) {
   var classElements = new Array();
   if ( node == null )
      node = document;
   if ( tag == null )
      tag = '*';
   var els = node.getElementsByTagName(tag);
   var elsLen = els.length;

   var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
   for (i = 0, j = 0; i < elsLen; i++) {
      if ( pattern.test(els[i].className) ) {
         classElements[j] = els[i];
         j++;
      }
   }
   return classElements;
}