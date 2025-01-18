function background(){
  var $intern_0 = '', $intern_24 = '" for "gwt:onLoadErrorFn"', $intern_22 = '" for "gwt:onPropertyErrorFn"', $intern_7 = '"><\/script>', $intern_9 = '#', $intern_11 = '/', $intern_6 = '<script id="', $intern_19 = '=', $intern_10 = '?', $intern_21 = 'Bad handler "', $intern_27 = 'DOMContentLoaded', $intern_8 = 'SCRIPT', $intern_25 = 'Single-script hosted mode not yet implemented. See issue ', $intern_5 = '__gwt_marker_background', $intern_4 = 'background', $intern_12 = 'base', $intern_14 = 'clear.cache.gif', $intern_18 = 'content', $intern_1 = 'gwt.codesvr=', $intern_2 = 'gwt.hosted=', $intern_3 = 'gwt.hybrid', $intern_23 = 'gwt:onLoadErrorFn', $intern_20 = 'gwt:onPropertyErrorFn', $intern_17 = 'gwt:property', $intern_26 = 'http://code.google.com/p/google-web-toolkit/issues/detail?id=2079', $intern_13 = 'img', $intern_15 = 'meta', $intern_16 = 'name';
  var $wnd = window, $doc = document, gwtOnLoad, bodyDone, base = $intern_0, metaProps = {}, values = [], providers = [], answers = [], onLoadErrorFunc, propertyErrorFunc;
  if (!$wnd.__gwt_stylesLoaded) {
    $wnd.__gwt_stylesLoaded = {};
  }
  if (!$wnd.__gwt_scriptsLoaded) {
    $wnd.__gwt_scriptsLoaded = {};
  }
  function isHostedMode(){
    var result = false;
    try {
      var query = $wnd.location.search;
      return (query.indexOf($intern_1) != -1 || (query.indexOf($intern_2) != -1 || $wnd.external && $wnd.external.gwtOnLoad)) && query.indexOf($intern_3) == -1;
    }
     catch (e) {
    }
    isHostedMode = function(){
      return result;
    }
    ;
    return result;
  }

  function maybeStartModule(){
    if (gwtOnLoad && bodyDone) {
      gwtOnLoad(onLoadErrorFunc, $intern_4, base);
    }
  }

  function computeScriptBase(){
    var thisScript, markerId = $intern_5, markerScript;
    $doc.write($intern_6 + markerId + $intern_7);
    markerScript = $doc.getElementById(markerId);
    thisScript = markerScript && markerScript.previousSibling;
    while (thisScript && thisScript.tagName != $intern_8) {
      thisScript = thisScript.previousSibling;
    }
    function getDirectoryOfFile(path){
      var hashIndex = path.lastIndexOf($intern_9);
      if (hashIndex == -1) {
        hashIndex = path.length;
      }
      var queryIndex = path.indexOf($intern_10);
      if (queryIndex == -1) {
        queryIndex = path.length;
      }
      var slashIndex = path.lastIndexOf($intern_11, Math.min(queryIndex, hashIndex));
      return slashIndex >= 0?path.substring(0, slashIndex + 1):$intern_0;
    }

    ;
    if (thisScript && thisScript.src) {
      base = getDirectoryOfFile(thisScript.src);
    }
    if (base == $intern_0) {
      var baseElements = $doc.getElementsByTagName($intern_12);
      if (baseElements.length > 0) {
        base = baseElements[baseElements.length - 1].href;
      }
       else {
        base = getDirectoryOfFile($doc.location.href);
      }
    }
     else if (base.match(/^\w+:\/\//)) {
    }
     else {
      var img = $doc.createElement($intern_13);
      img.src = base + $intern_14;
      base = getDirectoryOfFile(img.src);
    }
    if (markerScript) {
      markerScript.parentNode.removeChild(markerScript);
    }
  }

  function processMetas(){
    var metas = document.getElementsByTagName($intern_15);
    for (var i = 0, n = metas.length; i < n; ++i) {
      var meta = metas[i], name = meta.getAttribute($intern_16), content;
      if (name) {
        if (name == $intern_17) {
          content = meta.getAttribute($intern_18);
          if (content) {
            var value, eq = content.indexOf($intern_19);
            if (eq >= 0) {
              name = content.substring(0, eq);
              value = content.substring(eq + 1);
            }
             else {
              name = content;
              value = $intern_0;
            }
            metaProps[name] = value;
          }
        }
         else if (name == $intern_20) {
          content = meta.getAttribute($intern_18);
          if (content) {
            try {
              propertyErrorFunc = eval(content);
            }
             catch (e) {
              alert($intern_21 + content + $intern_22);
            }
          }
        }
         else if (name == $intern_23) {
          content = meta.getAttribute($intern_18);
          if (content) {
            try {
              onLoadErrorFunc = eval(content);
            }
             catch (e) {
              alert($intern_21 + content + $intern_24);
            }
          }
        }
      }
    }
  }

  background.onScriptLoad = function(gwtOnLoadFunc){
    background = null;
    gwtOnLoad = gwtOnLoadFunc;
    maybeStartModule();
  }
  ;
  if (isHostedMode()) {
    alert($intern_25 + $intern_26);
    return;
  }
  computeScriptBase();
  processMetas();
  var onBodyDoneTimerId;
  function onBodyDone(){
    if (!bodyDone) {
      bodyDone = true;
      maybeStartModule();
      if ($doc.removeEventListener) {
        $doc.removeEventListener($intern_27, onBodyDone, false);
      }
      if (onBodyDoneTimerId) {
        clearInterval(onBodyDoneTimerId);
      }
    }
  }

  if ($doc.addEventListener) {
    $doc.addEventListener($intern_27, function(){
      onBodyDone();
    }
    , false);
  }
  var onBodyDoneTimerId = setInterval(function(){
    if (/loaded|complete/.test($doc.readyState)) {
      onBodyDone();
    }
  }
  , 50);
}

background();
(function () {var $gwt_version = "2.1.0";var $wnd = window;var $doc = $wnd.document;var $moduleName, $moduleBase;var $stats = $wnd.__gwtStatsEvent ? function(a) {$wnd.__gwtStatsEvent(a)} : null;var $strongName = '78AC52C0C25A2235AB316C8C512DE9FC';var $intern_16 = '', $intern_143 = '\n', $intern_137 = '\n ', $intern_207 = ' ', $intern_209 = ' \t\r\n', $intern_247 = ' GMT', $intern_168 = ' cannot be empty', $intern_169 = ' cannot be null', $intern_165 = ' is invalid or violates the same-origin security restriction', $intern_167 = ' ms', $intern_260 = '"', $intern_15 = '#', $intern_88 = '&N-f=1_', $intern_89 = '&N-fa=', $intern_87 = '&N-s=1_', $intern_86 = '&N-u=1_', $intern_48 = '&hasMaj=', $intern_47 = '&hasMaj=0', $intern_50 = '&installHashId=', $intern_49 = '&installVersion=', $intern_44 = '&pearlbar=', $intern_46 = '&rightsState=0', $intern_45 = '&rightsState=1', $intern_172 = "'", $intern_138 = '(', $intern_265 = ')', $intern_139 = '): ', $intern_39 = '*://*/*', $intern_171 = '+', $intern_267 = ', ', $intern_275 = ', Size: ', $intern_253 = '-', $intern_252 = '-9223372036854775808', $intern_264 = '.', $intern_70 = '.png', $intern_85 = '/N-reveal=1', $intern_121 = '/id', $intern_14 = '/s/file', $intern_124 = '/s/signup', $intern_53 = '/s/windowCloser', $intern_90 = '0', $intern_93 = '0,', $intern_266 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', $intern_2 = '1', $intern_236 = '1st quarter', $intern_4 = '2', $intern_237 = '2nd quarter', $intern_91 = '3', $intern_238 = '3rd quarter', $intern_92 = '4', $intern_239 = '4th quarter', $intern_142 = ':', $intern_130 = ': ', $intern_272 = '=', $intern_0 = '@', $intern_177 = 'A', $intern_166 = 'A request timeout has expired after ', $intern_213 = 'AD', $intern_230 = 'AM', $intern_362 = 'AbstractCollection', $intern_385 = 'AbstractHashMap', $intern_387 = 'AbstractHashMap$EntrySet', $intern_388 = 'AbstractHashMap$EntrySetIterator', $intern_390 = 'AbstractHashMap$MapEntryNull', $intern_391 = 'AbstractHashMap$MapEntryString', $intern_363 = 'AbstractList', $intern_392 = 'AbstractList$IteratorImpl', $intern_393 = 'AbstractList$ListIteratorImpl', $intern_384 = 'AbstractMap', $intern_394 = 'AbstractMap$1', $intern_395 = 'AbstractMap$1$1', $intern_396 = 'AbstractMap$2', $intern_397 = 'AbstractMap$2$1', $intern_389 = 'AbstractMapEntry', $intern_386 = 'AbstractSet', $intern_269 = 'Add not supported on this collection', $intern_276 = 'Add not supported on this list', $intern_146 = 'An event type', $intern_211 = 'Anno Domini', $intern_294 = 'AppClient$1', $intern_295 = 'AppClient$2', $intern_291 = 'AppClient$PearlClient$PearlClientErrorCode', $intern_293 = 'AppClient$PearlClient$PearlClientErrorCode;', $intern_197 = 'Apr', $intern_185 = 'April', $intern_368 = 'ArithmeticException', $intern_364 = 'ArrayList', $intern_370 = 'ArrayStoreException', $intern_200 = 'Aug', $intern_189 = 'August', $intern_212 = 'BC', $intern_22 = 'BG_CHROME_PROMO_INTERVAL', $intern_24 = 'BG_CONFIG_POLLING', $intern_23 = 'BG_EXCLUDED_DOMAINS_FOR_CS', $intern_25 = 'BG_PROMOTION_INTERVAL', $intern_26 = 'BG_PROMOTION_POLLING', $intern_280 = 'BackgroundServerConfig$1', $intern_210 = 'Before Christ', $intern_281 = 'BrowserTab', $intern_282 = 'BrowserTab$1', $intern_283 = 'BrowserTab$2', $intern_284 = 'BrowserTab$3', $intern_261 = "Can't overwrite cause", $intern_148 = 'Cannot add a handler with a null type', $intern_149 = 'Cannot add a null handler', $intern_150 = 'Cannot fire null event', $intern_115 = 'Chrome', $intern_372 = 'Class', $intern_373 = 'ClassCastException', $intern_328 = 'CloseEvent', $intern_398 = 'Collections$EmptyList', $intern_160 = 'Content-Type', $intern_28 = 'Content-type', $intern_181 = 'D', $intern_153 = 'DELETE', $intern_351 = 'Date', $intern_353 = 'DateRecord', $intern_354 = 'DateTimeFormat', $intern_355 = 'DateTimeFormat$PatternPart', $intern_349 = 'DateTimeFormatInfoImpl', $intern_204 = 'Dec', $intern_193 = 'December', $intern_347 = 'DefaultDateTimeFormatInfo', $intern_374 = 'Double', $intern_205 = 'EEE, dd MMM yyyy HH:mm:ss zzz', $intern_98 = 'ERROR_DELETED_TREE', $intern_96 = 'ERROR_INVALID_TREE', $intern_100 = 'ERROR_IS_NOT_OWNER', $intern_95 = 'ERROR_MESSAGE', $intern_108 = 'EXTEND', $intern_289 = 'Enum', $intern_242 = 'Etc/GMT', $intern_244 = 'Etc/GMT+', $intern_243 = 'Etc/GMT-', $intern_147 = 'Event type', $intern_329 = 'EventBus', $intern_309 = 'Exception', $intern_175 = 'F', $intern_106 = 'FACEBOOK', $intern_195 = 'Feb', $intern_183 = 'February', $intern_118 = 'Firefox', $intern_259 = 'For input string: "', $intern_228 = 'Fri', $intern_221 = 'Friday', $intern_154 = 'GET', $intern_240 = 'GMT', $intern_305 = 'GwtEvent', $intern_326 = 'GwtEvent$Type', $intern_208 = 'GyMLdkHmsSEcDahKzZv', $intern_155 = 'HEAD', $intern_306 = 'HandlerManager', $intern_399 = 'HashMap', $intern_400 = 'HashSet', $intern_116 = 'IE', $intern_30 = 'If-Modified-Since', $intern_375 = 'IllegalArgumentException', $intern_376 = 'IllegalStateException', $intern_274 = 'Index: ', $intern_369 = 'IndexOutOfBoundsException', $intern_377 = 'Integer', $intern_378 = 'Integer;', $intern_174 = 'J', $intern_194 = 'Jan', $intern_182 = 'January', $intern_323 = 'JavaScriptException', $intern_324 = 'JavaScriptObject$', $intern_199 = 'Jul', $intern_188 = 'July', $intern_198 = 'Jun', $intern_187 = 'June', $intern_401 = 'LinkedHashMap', $intern_403 = 'LinkedHashMap$ChainEntry', $intern_404 = 'LinkedHashMap$EntrySet', $intern_405 = 'LinkedHashMap$EntrySet$EntryIterator', $intern_110 = 'Loaded', $intern_356 = 'LocaleInfo', $intern_359 = 'LongLibBase$LongEmul', $intern_361 = 'LongLibBase$LongEmul;', $intern_176 = 'M', $intern_206 = 'MLydhHmsSDkK', $intern_254 = 'MSXML2.XMLHTTP.3.0', $intern_287 = 'MainButton$1', $intern_402 = 'MapEntryImpl', $intern_196 = 'Mar', $intern_184 = 'March', $intern_186 = 'May', $intern_255 = 'Microsoft.XMLHTTP', $intern_173 = "Missing trailing '", $intern_224 = 'Mon', $intern_217 = 'Monday', $intern_180 = 'N', $intern_123 = 'N-f=1_', $intern_120 = 'N-fa=', $intern_122 = 'N-s=1_', $intern_104 = 'NEW_TREE', $intern_105 = 'NEW_TREE_PRIVATE', $intern_406 = 'NoSuchElementException', $intern_111 = 'Not loaded', $intern_203 = 'Nov', $intern_192 = 'November', $intern_379 = 'NullPointerException', $intern_371 = 'Number', $intern_380 = 'NumberFormatException', $intern_179 = 'O', $intern_278 = 'Object', $intern_383 = 'Object;', $intern_202 = 'Oct', $intern_191 = 'October', $intern_131 = 'One or more exceptions caught, see full set in UmbrellaException#getCauses', $intern_102 = 'PEARLED', $intern_103 = 'PEARLED_PRIVATE', $intern_231 = 'PM', $intern_156 = 'POST', $intern_19 = 'PTBackgroundConfigFile', $intern_21 = 'PTBackgroundConfigFileLastModified', $intern_11 = 'PTButtonParameters', $intern_75 = 'PTConfigFile', $intern_76 = 'PTConfigFileLastModified', $intern_73 = 'PTPromoLastPolled', $intern_157 = 'PUT', $intern_296 = 'PearledType', $intern_297 = 'PearledType;', $intern_64 = 'PearltreesMenuItemClicked', $intern_270 = 'Put not supported on this map', $intern_232 = 'Q1', $intern_233 = 'Q2', $intern_234 = 'Q3', $intern_235 = 'Q4', $intern_336 = 'Request', $intern_338 = 'Request$1', $intern_339 = 'Request$3', $intern_340 = 'RequestBuilder', $intern_342 = 'RequestBuilder$1', $intern_341 = 'RequestBuilder$Method', $intern_343 = 'RequestException', $intern_344 = 'RequestPermissionException', $intern_345 = 'RequestTimeoutException', $intern_337 = 'Response', $intern_310 = 'RuntimeException', $intern_178 = 'S', $intern_117 = 'Safari', $intern_229 = 'Sat', $intern_222 = 'Saturday', $intern_312 = 'Scheduler', $intern_314 = 'SchedulerImpl', $intern_129 = 'Self-causation not permitted', $intern_201 = 'Sep', $intern_190 = 'September', $intern_288 = 'ServerConfig$1', $intern_330 = 'SimpleEventBus', $intern_331 = 'SimpleEventBus$1', $intern_332 = 'SimpleEventBus$2', $intern_315 = 'StackTraceCreator$Collector', $intern_320 = 'StackTraceCreator$CollectorChrome', $intern_319 = 'StackTraceCreator$CollectorMoz', $intern_316 = 'StackTraceElement', $intern_318 = 'StackTraceElement;', $intern_133 = 'String', $intern_325 = 'String;', $intern_381 = 'StringBuffer', $intern_321 = 'StringBufferImpl', $intern_322 = 'StringBufferImplAppend', $intern_223 = 'Sun', $intern_216 = 'Sunday', $intern_298 = 'SyncModel$SyncService', $intern_299 = 'SyncModel$SyncService;', $intern_214 = 'T', $intern_107 = 'TWITTER', $intern_164 = 'The URL ', $intern_308 = 'Throwable', $intern_333 = 'Throwable;', $intern_227 = 'Thu', $intern_220 = 'Thursday', $intern_357 = 'TimeZone', $intern_286 = 'Timer', $intern_365 = 'Timer$1', $intern_225 = 'Tue', $intern_218 = 'Tuesday', $intern_241 = 'UTC', $intern_245 = 'UTC+', $intern_246 = 'UTC-', $intern_334 = 'UmbrellaException', $intern_152 = 'Unable to read XmlHttpRequest.status; likely causes are a networking error or bad cross-domain request. Please see https://bugzilla.mozilla.org/show_bug.cgi?id=238559 for more details', $intern_262 = 'Unknown', $intern_263 = 'Unknown source', $intern_382 = 'UnsupportedOperationException', $intern_301 = 'UserTrees', $intern_302 = 'UserTrees$1', $intern_215 = 'W', $intern_226 = 'Wed', $intern_219 = 'Wednesday', $intern_366 = 'Window$ClosingEvent', $intern_367 = 'Window$WindowHandlers', $intern_151 = 'XmlHttpRequest.status == undefined, please see Safari bug http://bugs.webkit.org/show_bug.cgi?id=3810 for more details', $intern_145 = '[', $intern_300 = '[C', $intern_303 = '[D', $intern_307 = '[I', $intern_292 = '[Lcom.broceliand.pearlbar.gwt.client.common.', $intern_360 = '[Lcom.google.gwt.lang.', $intern_317 = '[Ljava.lang.', $intern_268 = ']', $intern_18 = 'about:blank', $intern_56 = 'addByContextMenu', $intern_83 = 'addJson', $intern_141 = 'anonymous', $intern_144 = 'at ', $intern_62 = 'audio', $intern_158 = 'callback', $intern_17 = 'chrome://newtab/', $intern_258 = 'class ', $intern_27 = 'collector/addonBGConfig.json', $intern_77 = 'collector/addonConfig.js', $intern_279 = 'com.broceliand.pearlbar.gwt.client.background.firefox.', $intern_251 = 'com.broceliand.pearlbar.gwt.client.background.firefox.BackgroundMain', $intern_290 = 'com.broceliand.pearlbar.gwt.client.common.', $intern_311 = 'com.google.gwt.core.client.', $intern_313 = 'com.google.gwt.core.client.impl.', $intern_327 = 'com.google.gwt.event.logical.shared.', $intern_304 = 'com.google.gwt.event.shared.', $intern_335 = 'com.google.gwt.http.client.', $intern_346 = 'com.google.gwt.i18n.client.', $intern_352 = 'com.google.gwt.i18n.client.impl.', $intern_348 = 'com.google.gwt.i18n.client.impl.cldr.', $intern_358 = 'com.google.gwt.lang.', $intern_285 = 'com.google.gwt.user.client.', $intern_33 = 'complete', $intern_170 = 'decodedURLComponent', $intern_256 = 'divide by zero', $intern_59 = 'editable', $intern_82 = 'errorCookies', $intern_99 = 'errorDeletedTree', $intern_97 = 'errorInvalidTree', $intern_101 = 'errorIsNotOwner', $intern_81 = 'errorSafariCookies', $intern_80 = 'errorSafariWindowsCookies', $intern_94 = 'errorServer', $intern_79 = 'errorUnavailable', $intern_7 = 'extHashKey', $intern_140 = 'function', $intern_114 = 'gettreesandcurrentuser?version=', $intern_52 = 'go', $intern_13 = 'hasAuthFirstTime', $intern_3 = 'hasMajFirstTime8000', $intern_1 = 'hasRunFirstTime', $intern_31 = 'header', $intern_55 = 'http://', $intern_126 = 'http://www.google', $intern_162 = 'httpMethod', $intern_54 = 'https://', $intern_127 = 'https://www.google', $intern_60 = 'image', $intern_69 = 'image/chromeButton/', $intern_51 = 'in', $intern_6 = 'installVersion', $intern_257 = 'interface ', $intern_277 = 'java.lang.', $intern_350 = 'java.util.', $intern_32 = 'last-modified', $intern_42 = 'lastSentStatKey', $intern_58 = 'link', $intern_74 = 'localeId', $intern_9 = 'login', $intern_135 = 'message', $intern_249 = 'moduleStartup', $intern_71 = 'must be positive', $intern_134 = 'name', $intern_72 = 'none', $intern_132 = 'null', $intern_250 = 'onModuleLoadStart', $intern_10 = 'open', $intern_40 = 'openStat?type=', $intern_57 = 'page', $intern_65 = 'pearl-2', $intern_66 = 'pearl-3', $intern_67 = 'pearl-4', $intern_68 = 'pearl-5', $intern_84 = 'pollPromo', $intern_41 = 'promoStat?type=', $intern_5 = 's/collectorFirefox/createAccount', $intern_125 = 's/gettingStarted', $intern_8 = 'savePTButtonParameters', $intern_35 = 'script/addonConfig.js', $intern_34 = 'script/jqueryUtils.js', $intern_36 = 'script/pearlContentHelper.js', $intern_38 = 'script/pearlContextItem.js', $intern_37 = 'script/pearlItButton.js', $intern_63 = 'selection', $intern_43 = 'sendstats?version=', $intern_128 = 'sourceid=chrome-instant', $intern_248 = 'startup', $intern_78 = 'text/javascript', $intern_29 = 'text/json', $intern_161 = 'text/plain; charset=utf-8', $intern_136 = 'toString', $intern_20 = 'undefined', $intern_163 = 'url', $intern_109 = 'userTreeStored', $intern_159 = 'value', $intern_61 = 'video', $intern_119 = 'win', $intern_271 = '{', $intern_12 = '{"imAllow":true,"vidAllow":true,"textAllow":true,"rightClick":true,"imButLayout":"tl"}', $intern_112 = '{"treeList":', $intern_273 = '}', $intern_113 = '}}';
var _, P0_longLit = {l:0, m:0, h:0}, P3e8_longLit = {l:1000, m:0, h:0}, Pbb8_longLit = {l:3000, m:0, h:0};
function nullMethod(){
}

function java_lang_Object(){
}

_ = java_lang_Object.prototype = {};
_.equals__Ljava_lang_Object_2Z$ = function java_lang_Object_equals__Ljava_lang_Object_2Z(other){
  return this === other;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_lang_Object_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Object_12_1classLit;
}
;
_.hashCode__I$ = function java_lang_Object_hashCode__I(){
  return this.$H || (this.$H = ++com_google_gwt_core_client_impl_Impl_sNextHashId);
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Object_toString__Ljava_lang_String_2(){
  return (this.java_lang_Object_typeMarker$ == nullMethod || this.java_lang_Object_castableTypeMap$ && !!this.java_lang_Object_castableTypeMap$[1]?this.getClass__Ljava_lang_Class_2$():com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1JavaScriptObject_12_1classLit).java_lang_Class_typeName + $intern_0 + java_lang_Integer_toPowerOfTwoString__IILjava_lang_String_2(this.java_lang_Object_typeMarker$ == nullMethod || this.java_lang_Object_castableTypeMap$ && !!this.java_lang_Object_castableTypeMap$[1]?this.hashCode__I$():this.$H || (this.$H = ++com_google_gwt_core_client_impl_Impl_sNextHashId));
}
;
_.toString = function(){
  return this.toString__Ljava_lang_String_2$();
}
;
_.java_lang_Object_typeMarker$ = nullMethod;
_.java_lang_Object_castableTypeMap$ = {};
function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_checkFirstRun__V(){
  var id;
  if (com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_1) == null) {
    com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_1, $intern_2);
    com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_3, $intern_4);
    !!com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getPearltreesTab__Lcom_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_2() && (chrome.tabs.create({url:(com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsPremium__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2V($wnd.getUserTreesData())))?$wnd.PEARLTREES_URL:$wnd.PEARLTREES_URL_HTTP) + $intern_5, active:true}) , undefined);
  }
   else {
    com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_3) == null && com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_3, $intern_2);
  }
  com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_6) == null && com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_6, (com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , $wnd.pearlerVersion));
  if (com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_7) == null) {
    id = com_broceliand_pearlbar_gwt_client_common_UUID_uuid__Ljava_lang_String_2();
    com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_7, id);
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_exports__V(){
  $wnd.getBackgroundUserTreesData = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_getUserTreesData__Lcom_google_gwt_core_client_JavaScriptObject_2);
  $wnd.setUserTrees = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_setUserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2V);
  $wnd.pearlContent = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_pearlContent__Ljava_lang_String_2Ljava_lang_String_2IDDLjava_lang_String_2IZZLjava_lang_String_2Ljava_lang_String_2V);
  $wnd.backgroundReveal = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_reveal__DDV);
  $wnd.backgroundOpenInNewTab = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_openInNewTab__Ljava_lang_String_2V);
  $wnd.onPopupRefresh = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_onPopupRefresh__ZV);
  $wnd.getSelectedTreeId = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_getSelectedTreeId__D);
  $wnd.getSelectedAssoId = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_getSelectedAssoId__D);
  $wnd.setSelectedTreeId = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_setSelectedTreeId__DV);
  $wnd.setSelectedAssoId = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_setSelectedAssoId__DV);
  $wnd.refreshUI = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_refreshUI__V);
  $wnd.saveButtonParameters = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_saveButtonParameters__Ljava_lang_String_2V);
  $wnd.getButtonParameters = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_getButtonParameters__Lcom_google_gwt_core_client_JavaScriptObject_2V);
  $wnd.storeBackgroundButtonParameters = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_storeBackgroundButtonParameters__Ljava_lang_String_2V);
  $wnd.getBackgroundButtonParameters = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_getBackgroundButtonParameters__Ljava_lang_String_2);
  $wnd.isExcludedSite = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isExcludedSite__Ljava_lang_String_2Z);
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    var parts = message.split($intern_0);
    var eventName = parts[0];
    var eventData = parts[1];
    if (eventName === $intern_8) {
      $wnd.storeBackgroundButtonParameters(eventData);
      sendResponse();
    }
     else if (eventName === $intern_9) {
      $wnd.refreshTrees(false);
      sendResponse();
    }
     else if (eventName === $intern_10) {
      $wnd.refreshTrees(false);
      $wnd.refreshUI();
    }
  }
  );
  $wnd.getButtonParameters($wnd.storeBackgroundButtonParameters);
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_getBackgroundButtonParameters__Ljava_lang_String_2(){
  return com_broceliand_pearlbar_gwt_client_background_firefox_AppState_currentButtonConfig;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_getButtonParameters__Lcom_google_gwt_core_client_JavaScriptObject_2V(callback){
  chrome.storage.local.get($intern_11, function(data){
    typeof data.PTButtonParameters !== undefined && data.PTButtonParameters != null?callback(data.PTButtonParameters):callback($intern_12);
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_getSelectedAssoId__D(){
  return com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedAssoId;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_getSelectedTreeId__D(){
  return com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedTreeId;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_getUserTreesData__Lcom_google_gwt_core_client_JavaScriptObject_2(){
  return com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isExcludedSite__Ljava_lang_String_2Z(url){
  var es, excluded, excluded$array, excluded$index, excluded$max;
  if (com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_hasAValidConfigFile) {
    es = com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getExcludedSites___3Ljava_lang_String_2();
    if (es != null) {
      for (excluded$array = com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getExcludedSites___3Ljava_lang_String_2() , excluded$index = 0 , excluded$max = excluded$array.length; excluded$index < excluded$max; ++excluded$index) {
        excluded = excluded$array[excluded$index];
        if (url.indexOf(excluded) > 0) {
          return true;
        }
      }
      return false;
    }
  }
  return true;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_navigateTo__ILjava_lang_String_2V(tabId, toUrl){
  chrome.tabs.update(tabId, toUrl?{url:toUrl, active:true}:{active:true});
  browser.tabs.get(tabId).then(function(tab){
    browser.windows.update(tab.windowId, {focused:true}).then();
  }
  );
  var view = $wnd.getPopupView();
  view && view.close();
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_onPopupRefresh__ZV(login){
  login && com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_13) == null && com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_13, $intern_2);
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_openInNewTab__Ljava_lang_String_2V(href){
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_hasRevealed |= (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , href != null && (href.indexOf($wnd.PEARLTREES_URL) == 0 || href.indexOf($wnd.PEARLTREES_URL_HTTP) == 0 || href.indexOf($wnd.PEARLTREES_URL_BASE) != -1 || href.indexOf($wnd.PEAR_LY_URL) == 0) && href.indexOf($intern_14) < 0);
  chrome.tabs.create({url:href, active:true});
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_pearlContent__Ljava_lang_String_2Ljava_lang_String_2IDDLjava_lang_String_2IZZLjava_lang_String_2Ljava_lang_String_2V(url, title, index, treeId, parentTreeId, newTreeName, newTreeVisibility, shareOnFb, shareOnTw, layout, text){
  var com_broceliand_pearlbar_gwt_client_common_UserTrees_$isTeam__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2IZ_tree_0;
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_lastPearled = new java_util_Date_Date__V;
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$getTreeTitle__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2ILjava_lang_String_2(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees, index);
  com_broceliand_pearlbar_gwt_client_common_AppClient_pearlContent__Ljava_lang_String_2Ljava_lang_String_2IDDLjava_lang_String_2IZZLjava_lang_String_2ZLcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClientType_2Ljava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient_2ZV(url, title, com_broceliand_pearlbar_gwt_client_common_UserTrees_getTreeVisibility__Lcom_google_gwt_core_client_JavaScriptObject_2I(com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, index)), treeId, parentTreeId, newTreeName, newTreeVisibility, shareOnFb, shareOnTw, text, index != 1 && (com_broceliand_pearlbar_gwt_client_common_UserTrees_$isTeam__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2IZ_tree_0 = com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, index) , (com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_UserTrees_$isTeam__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2IZ_tree_0.assoId) == com_broceliand_pearlbar_gwt_client_common_UserTrees_$isTeam__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2IZ_tree_0.treeID));
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_refreshUI__V(){
  var view = $wnd.getPopupView();
  view && view.refreshUI();
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_reveal__DDV(treeId, assoId){
  var ct, hash, pt;
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_hasRevealed = true;
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_lastPearled = null;
  treeId <= 0 && (treeId = com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedTreeId);
  assoId <= 0 && (assoId = com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedAssoId);
  hash = com_broceliand_pearlbar_gwt_client_common_AppClient_buildRevealHash__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2DDLjava_lang_String_2(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees, treeId, assoId);
  ct = (com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_$clinit__V() , com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getById__Ljava_lang_Integer_2Lcom_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_2(java_lang_Integer_valueOf__ILjava_lang_Integer_2(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_currentTabId)));
  if (com_broceliand_pearlbar_gwt_client_common_WebContent_isInPearltrees__Ljava_lang_String_2Z(ct.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url)) {
    if (com_broceliand_pearlbar_gwt_client_common_WebContent_isUrlNotMutableInPearltrees__Ljava_lang_String_2Z(ct.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url)) {
      return;
    }
    hash != null && com_broceliand_pearlbar_gwt_client_background_firefox_AppState_navigateTo__ILjava_lang_String_2V(ct.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_id, com_broceliand_pearlbar_gwt_client_common_WebContent_getUnanchoredUrl__Ljava_lang_String_2Ljava_lang_String_2(ct.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url) + $intern_15 + hash);
    return;
  }
  pt = com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getPearltreesTab__Lcom_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_2();
  if (!pt) {
    ct.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url == null || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(ct.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url, $intern_16) || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(ct.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url, $intern_17) || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(ct.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url, $intern_18)?com_broceliand_pearlbar_gwt_client_background_firefox_AppState_navigateTo__ILjava_lang_String_2V(ct.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_id, (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsPremium__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2V($wnd.getUserTreesData())))?$wnd.PEARLTREES_URL:$wnd.PEARLTREES_URL_HTTP) + (hash == null?$intern_16:$intern_15 + hash)):(chrome.tabs.create({url:(com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsPremium__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2V($wnd.getUserTreesData())))?$wnd.PEARLTREES_URL:$wnd.PEARLTREES_URL_HTTP) + (hash == null?$intern_16:$intern_15 + hash), active:true}) , undefined);
    return;
  }
  if (com_broceliand_pearlbar_gwt_client_common_WebContent_isUrlNotMutableInPearltrees__Ljava_lang_String_2Z(pt.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url)) {
    return;
  }
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_navigateTo__ILjava_lang_String_2V(pt.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_id, hash == null?null:com_broceliand_pearlbar_gwt_client_common_WebContent_getUnanchoredUrl__Ljava_lang_String_2Ljava_lang_String_2(pt.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url) + $intern_15 + hash);
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_saveButtonParameters__Ljava_lang_String_2V(data){
  chrome.storage.local.set({PTButtonParameters:data}, function(){
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_setSelectedAssoId__DV(value){
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedAssoId = value;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_setSelectedTreeAndAssoFromUrl__Ljava_lang_String_2V(url){
  var res;
  res = com_broceliand_pearlbar_gwt_client_common_WebContent_getCurrentLocation__Ljava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2_3D(url, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees);
  if (res != null) {
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedTreeId = res[0];
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedAssoId = res[1];
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_setSelectedTreeId__DV(value){
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedTreeId = value;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_setUserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2V(jsut){
  var hasChanged, ut, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_onUserTreesChanged__V_view_0;
  ut = new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2V(jsut);
  hasChanged = com_broceliand_pearlbar_gwt_client_common_UserTrees_$hasChanged__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees, ut);
  if (hasChanged) {
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees = ut;
    com_broceliand_pearlbar_gwt_client_common_UserTrees_$saveInLocalStorage__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2V(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees);
  }
  if (hasChanged || com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_13) == null) {
    (com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.status) == 1 && com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_13) == null && com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_13, $intern_2);
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_onUserTreesChanged__V_view_0 = $wnd.getPopupView();
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_onUserTreesChanged__V_view_0 && com_broceliand_pearlbar_gwt_client_background_firefox_AppState_onUserTreesChanged__V_view_0.onUserTreesChanged();
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState_storeBackgroundButtonParameters__Ljava_lang_String_2V(paramString){
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_currentButtonConfig = paramString;
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_saveButtonParameters__Ljava_lang_String_2V(paramString);
}

var com_broceliand_pearlbar_gwt_client_background_firefox_AppState_currentButtonConfig = null, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_hasRevealed = false, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isInPearltrees = false, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isWebUrl = false, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_lastPearled = null, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedAssoId = 0, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedTreeId = 0, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees = null;
function com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onError__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_2Ljava_lang_String_2V(errorCode, msg){
  errorCode != (com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1MESSAGE) && (msg = $wnd.getMessage(errorCode.com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_key));
  $wnd.alert(msg);
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onPearled__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2DV(newTreeId){
  var com_broceliand_pearlbar_gwt_client_background_firefox_AppState_showPearledUi__ZV_view_0, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_showPearledUi__ZV_view_1;
  if (newTreeId > 0) {
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedTreeId = newTreeId;
    com_broceliand_pearlbar_gwt_client_common_UserTrees_refreshTrees__ZV(true);
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_showPearledUi__ZV_view_0 = $wnd.getPopupView();
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_showPearledUi__ZV_view_0 && com_broceliand_pearlbar_gwt_client_background_firefox_AppState_showPearledUi__ZV_view_0.showPearledUI(true);
  }
   else {
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_showPearledUi__ZV_view_1 = $wnd.getPopupView();
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_showPearledUi__ZV_view_1 && com_broceliand_pearlbar_gwt_client_background_firefox_AppState_showPearledUi__ZV_view_1.showPearledUI(false);
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$resetRevealed__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2Z(){
  if (com_broceliand_pearlbar_gwt_client_background_firefox_AppState_hasRevealed) {
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState_hasRevealed = false;
    return true;
  }
  return false;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_exports__V(){
  $wnd.pollBackgroundConfigFileIfNecessary = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_pollBackgroundConfigFileIfNecessary__V);
  $wnd.initBackgroundConfigFile = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_initBackgroundConfigFile__Ljava_lang_String_2V);
  $wnd.getBackgroundConfigFileLastModified = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getBackgroundConfigFileLastModified__Lcom_google_gwt_core_client_JavaScriptObject_2V);
  $wnd.getBackgroundConfigFile = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getBackgroundConfigFile__Lcom_google_gwt_core_client_JavaScriptObject_2V);
  $wnd.saveAndPersistBackgroundConfigFileLastModified = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_saveAndPersistBackgroundConfigFileLastModified__DV);
  $wnd.saveAndInitBackgroundConfigFile = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_saveAndInitBackgroundConfigFile__Ljava_lang_String_2V);
  $wnd.getChromePromoInterval = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getChromePromoInterval__D);
  $wnd.getPremiumPromoDisplayInterval = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getPremiumPromoDisplayInterval__D);
  $wnd.getBackgroundConfigFile(function(data){
    if (data != null) {
      $wnd.saveAndInitBackgroundConfigFile(data);
      $wnd.getBackgroundConfigFileLastModified(function(data){
        $wnd.saveAndPersistBackgroundConfigFileLastModified(data);
        $wnd.pollBackgroundConfigFileIfNecessary();
      }
      );
    }
     else {
      $wnd.pollBackgroundConfigFileIfNecessary();
    }
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getBackgroundConfigFile__Lcom_google_gwt_core_client_JavaScriptObject_2V(callback){
  chrome.storage.local.get($intern_19, function(data){
    typeof data.PTBackgroundConfigFile !== $intern_20 && data.PTConfigFile != null?callback(data.PTBackgroundConfigFile):callback(null);
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getBackgroundConfigFileLastModified__Lcom_google_gwt_core_client_JavaScriptObject_2V(callback){
  chrome.storage.local.get($intern_21, function(data){
    typeof data.PTBackgroundConfigFileLastModified !== $intern_20 && data.PTBackgroundConfigFileLastModified != null?callback(data.PTBackgroundConfigFileLastModified + 0):callback(0);
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getChromePromoInterval__D(){
  if (com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig) {
    return com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig[$intern_22];
  }
  return 86400;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getExcludedSites___3Ljava_lang_String_2(){
  if (com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig) {
    return com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig[$intern_23];
  }
  return null;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getPollingInterval__D(){
  if (com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig) {
    return com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig[$intern_24];
  }
  return 3600000;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getPremiumPromoDisplayInterval__D(){
  if (com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig) {
    return com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig[$intern_25];
  }
  return 3600000;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getPremiumPromoPollingInterval__D(){
  if (com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig) {
    return com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig[$intern_26];
  }
  return 1800000;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_initBackgroundConfigFile__Ljava_lang_String_2V(data){
  com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig = $wnd.JSON.parse(data);
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_pollBackgroundConfigFile__V(){
  var $e0, builder, lastModDate, url;
  url = (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , $wnd.PEARLTREES_URL) + $intern_27;
  lastModDate = new java_util_Date_Date__JV(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_lastModifiedConfigFile);
  builder = new com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V((com_google_gwt_http_client_RequestBuilder_$clinit__V() , com_google_gwt_http_client_RequestBuilder_GET), url);
  com_google_gwt_http_client_RequestBuilder_$setHeader__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Ljava_lang_String_2V(builder, $intern_28, $intern_29);
  com_google_gwt_http_client_RequestBuilder_$setHeader__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Ljava_lang_String_2V(builder, $intern_30, com_google_gwt_i18n_client_DateTimeFormat_$format__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_util_Date_2Ljava_lang_String_2((com_google_gwt_i18n_client_DateTimeFormat_$clinit__V() , com_google_gwt_i18n_client_DateTimeFormat_getFormat__Ljava_lang_String_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2Lcom_google_gwt_i18n_client_DateTimeFormat_2(com_google_gwt_i18n_client_LocaleInfo_$getDateTimeFormatInfo__Lcom_google_gwt_i18n_client_LocaleInfo_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2((com_google_gwt_i18n_client_LocaleInfo_$clinit__V() , com_google_gwt_i18n_client_LocaleInfo_$clinit__V() , com_google_gwt_i18n_client_LocaleInfo_instance)))), lastModDate));
  try {
    com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(builder, null, new com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig$1_BackgroundServerConfig$1__V);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 2))
      throw $e0;
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_pollBackgroundConfigFileIfNecessary__V(){
  var currentTime, pollingInterval;
  currentTime = com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2((new java_util_Date_Date__V).java_util_Date_jsdate.getTime());
  pollingInterval = com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getPollingInterval__D());
  if (com_google_gwt_lang_LongLib_gt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(com_google_gwt_lang_LongLib_sub__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(currentTime, com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_lastPolledConfigFile), pollingInterval)) {
    com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_lastPolledConfigFile = currentTime;
    com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_pollBackgroundConfigFile__V();
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_saveAndInitBackgroundConfigFile__Ljava_lang_String_2V(data){
  if (data != null) {
    com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_hasAValidConfigFile = true;
    com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig = $wnd.JSON.parse(data);
    com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_saveBackgroundConfigFile__Ljava_lang_String_2V(data);
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_saveAndPersistBackgroundConfigFileLastModified__DV(millTime){
  com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_lastModifiedConfigFile = com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(millTime);
  com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_saveBackgroundConfigFileLastModified__DV(millTime);
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_saveBackgroundConfigFile__Ljava_lang_String_2V(data){
  chrome.storage.local.set({PTBackgroundConfigFile:data}, function(){
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_saveBackgroundConfigFileLastModified__DV(millTime){
  chrome.storage.local.set({PTBackgroundConfigFileLastModified:millTime}, function(){
  }
  );
}

var com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_backgroundConfig = null, com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_hasAValidConfigFile = false, com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_lastModifiedConfigFile = P0_longLit, com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_lastPolledConfigFile = P0_longLit;
function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig$1_BackgroundServerConfig$1__V(){
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig$1(){
}

_ = com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig$1_BackgroundServerConfig$1__V.prototype = com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig$1.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1BackgroundServerConfig$1_12_1classLit;
}
;
_.onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V = function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig$1_onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V(request, exception){
}
;
_.onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V = function com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig$1_onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(request, response){
  var d, lastModified, statusCode, text;
  statusCode = response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.status;
  if (statusCode == 200) {
    lastModified = (com_google_gwt_http_client_StringValidator_throwIfEmptyOrNull__Ljava_lang_String_2Ljava_lang_String_2V($intern_31, $intern_32) , response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.getResponseHeader($intern_32));
    d = com_google_gwt_i18n_client_DateTimeFormat_$parse__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2ZLjava_util_Date_2((com_google_gwt_i18n_client_DateTimeFormat_$clinit__V() , com_google_gwt_i18n_client_DateTimeFormat_getFormat__Ljava_lang_String_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2Lcom_google_gwt_i18n_client_DateTimeFormat_2(com_google_gwt_i18n_client_LocaleInfo_$getDateTimeFormatInfo__Lcom_google_gwt_i18n_client_LocaleInfo_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2((com_google_gwt_i18n_client_LocaleInfo_$clinit__V() , com_google_gwt_i18n_client_LocaleInfo_$clinit__V() , com_google_gwt_i18n_client_LocaleInfo_instance)))), lastModified);
    text = response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.responseText;
    com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_saveAndInitBackgroundConfigFile__Ljava_lang_String_2V(text);
    com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_saveAndPersistBackgroundConfigFileLastModified__DV(com_google_gwt_lang_LongLib_toDouble__Lcom_google_gwt_lang_LongLibBase$LongEmul_2D(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(d.java_util_Date_jsdate.getTime())));
  }
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_$clinit__V(){
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_$clinit__V = nullMethod;
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_tabs = new java_util_LinkedHashMap_LinkedHashMap__V;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_BrowserTab__V(){
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_askPermissionIfNeeded__Lcom_google_gwt_core_client_JavaScriptObject_2ZZV(callbackYes, notFromAd, isNewInstall){
  $wnd.setHasGivenRights(true);
  if (typeof callbackYes !== $intern_20 && callbackYes != null) {
    try {
      callbackYes.callback();
    }
     catch (e) {
      typeof callbackYes.data !== $intern_20 && callbackYes.data != null && $wnd.storeBackgroundButtonParameters(callbackYes.data);
    }
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_exports__V(){
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_$clinit__V();
  $wnd.setHasGivenRights = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_setHasGivenRights__ZV);
  $wnd.getHasGivenRights = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getHasGivenRights__Z);
  $wnd.sendStatsRequest = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_sendStatsRequest__V);
  $wnd.getPermissionString = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getPermissionString__Ljava_lang_String_2);
  $wnd.askPermissionIfNeeded = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_askPermissionIfNeeded__Lcom_google_gwt_core_client_JavaScriptObject_2ZZV);
  $wnd.sendOpenedStatsRequest = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_sendOpenedStatsRequest__V);
  $wnd.sendPromoStatsRequest = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_sendPromoStatsRequest__V);
  function onUpdateTab(isSelection){
    var querying = browser.tabs.query({currentWindow:true, active:true});
    querying.then(function(tabs){
      var tab = tabs[0];
      $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_setCurrentTab__ZILjava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2V)(isSelection, tab.id, tab.url, tab);
    }
    );
  }

  chrome.windows.onFocusChanged.addListener(function(windowId){
    onUpdateTab(true);
  }
  );
  browser.tabs.onActivated.addListener(function(selectInfo){
    onUpdateTab(true);
  }
  );
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    onUpdateTab(false);
  }
  );
  chrome.tabs.onCreated.addListener(function(tab){
    onUpdateTab(false);
  }
  );
  chrome.tabs.onRemoved.addListener(function(tabId){
    $entry(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_onRemoved__IV)(tabId);
  }
  );
  onUpdateTab(false);
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if (changeInfo.status == $intern_33) {
      if (!$wnd.isExcludedSite(tab.url) && tab.url != $intern_18) {
        chrome.tabs.executeScript(tab.id, {file:$intern_34});
        chrome.tabs.executeScript(tab.id, {file:$intern_35});
        chrome.tabs.executeScript(tab.id, {file:$intern_36});
        chrome.tabs.executeScript(tab.id, {file:$intern_37});
        chrome.tabs.executeScript(tab.id, {file:$intern_38});
      }
    }
  }
  );
  $wnd.setHasGivenRights(true);
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getById__Ljava_lang_Integer_2Lcom_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_2(id){
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_$clinit__V();
  var t;
  t = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_LinkedHashMap_$get__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_tabs, id), 3);
  if (!t) {
    t = new com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_BrowserTab__V;
    t.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_id = id.java_lang_Integer_value;
    t.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_creation = new java_util_Date_Date__V;
    java_util_LinkedHashMap_$put__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_tabs, id, t);
  }
  return t;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getHasGivenRights__Z(){
  return com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_hasGivenRights;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getPearltreesTab__Lcom_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_2(){
  var java_util_AbstractMap$2_$iterator__Ljava_util_AbstractMap$2_2Ljava_util_Iterator_2_outerIter_0;
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_$clinit__V();
  var t, t$iterator;
  for (t$iterator = (java_util_AbstractMap$2_$iterator__Ljava_util_AbstractMap$2_2Ljava_util_Iterator_2_outerIter_0 = new java_util_LinkedHashMap$EntrySet$EntryIterator_LinkedHashMap$EntrySet$EntryIterator__Ljava_util_LinkedHashMap$EntrySet_2V(java_util_AbstractMap_$values__Ljava_util_AbstractMap_2Ljava_util_Collection_2(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_tabs).java_util_AbstractMap$2_val$entrySet) , new java_util_AbstractMap$2$1_AbstractMap$2$1__Ljava_util_AbstractMap$2_2V(java_util_AbstractMap$2_$iterator__Ljava_util_AbstractMap$2_2Ljava_util_Iterator_2_outerIter_0)); java_util_LinkedHashMap$EntrySet$EntryIterator_$hasNext__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Z(t$iterator.java_util_AbstractMap$2$1_val$outerIter);) {
    t = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_LinkedHashMap$EntrySet$EntryIterator_$next__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Ljava_util_Map$Entry_2(t$iterator.java_util_AbstractMap$2$1_val$outerIter).java_util_MapEntryImpl_value, 3);
    if (com_broceliand_pearlbar_gwt_client_common_WebContent_isInPearltrees__Ljava_lang_String_2Z(t.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url)) {
      return t;
    }
  }
  return null;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getPermissionString__Ljava_lang_String_2(){
  return $intern_39;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_onRemoved__IV(tabId){
  java_util_LinkedHashMap_$remove__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_tabs, java_lang_Integer_valueOf__ILjava_lang_Integer_2(tabId));
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getPearltreesTab__Lcom_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_2();
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_sendOpenedStatsRequest__V(){
  var $e0, builder, service;
  service = (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , $wnd.COLLECTOR_URL) + $intern_40 + com_google_gwt_http_client_URL_encodeQueryString__Ljava_lang_String_2Ljava_lang_String_2((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , $wnd.pearlerType));
  builder = new com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V((com_google_gwt_http_client_RequestBuilder_$clinit__V() , com_google_gwt_http_client_RequestBuilder_GET), service);
  try {
    com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(builder, $intern_16, new com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$2_BrowserTab$2__V);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 2))
      throw $e0;
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_sendPromoStatsRequest__V(){
  var $e0, builder, service;
  service = (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , $wnd.COLLECTOR_URL) + $intern_41 + com_google_gwt_http_client_URL_encodeQueryString__Ljava_lang_String_2Ljava_lang_String_2((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , $wnd.pearlerType));
  builder = new com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V((com_google_gwt_http_client_RequestBuilder_$clinit__V() , com_google_gwt_http_client_RequestBuilder_GET), service);
  try {
    com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(builder, $intern_16, new com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$3_BrowserTab$3__V);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 2))
      throw $e0;
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_sendStatsIfNeeded__V(){
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_$clinit__V();
  var currentTime, lastSent, lastSentTime, shouldSend;
  lastSent = com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_42);
  if (lastSent == null) {
    shouldSend = true;
  }
   else {
    currentTime = com_google_gwt_lang_LongLib_toInt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(com_google_gwt_lang_LongLibBase_divMod__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZLcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2((new java_util_Date_Date__V).java_util_Date_jsdate.getTime()), P3e8_longLit, false));
    lastSentTime = java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(lastSent);
    shouldSend = currentTime - lastSentTime > 86400;
  }
  if (shouldSend) {
    $wnd.sendStatsRequest();
    com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_42, $intern_16 + com_google_gwt_lang_LongLib_toString__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Ljava_lang_String_2(com_google_gwt_lang_LongLibBase_divMod__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZLcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2((new java_util_Date_Date__V).java_util_Date_jsdate.getTime()), P3e8_longLit, false)));
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_sendStatsRequest__V(){
  var $e0, builder, service;
  service = (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , $wnd.COLLECTOR_URL) + $intern_43 + com_google_gwt_http_client_URL_encodeQueryString__Ljava_lang_String_2Ljava_lang_String_2((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , $wnd.pearlerVersion));
  service += $intern_44 + com_google_gwt_http_client_URL_encodeQueryString__Ljava_lang_String_2Ljava_lang_String_2($wnd.pearlerType);
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_hasGivenRights?(service += $intern_45):(service += $intern_46);
  com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_3) == null?(service += $intern_47):(service += $intern_48 + com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_3));
  service += $intern_49 + com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_6);
  service += $intern_50 + com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_7);
  builder = new com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V((com_google_gwt_http_client_RequestBuilder_$clinit__V() , com_google_gwt_http_client_RequestBuilder_GET), service);
  try {
    com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(builder, $intern_16, new com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$1_BrowserTab$1__V);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 2))
      throw $e0;
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_setCurrentTab__ZILjava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2V(isSelection, tabId, url, tab){
  var t;
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_sendStatsIfNeeded__V();
  t = com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getById__Ljava_lang_Integer_2Lcom_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_2(java_lang_Integer_valueOf__ILjava_lang_Integer_2(tabId));
  isSelection && (com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_currentTabId = tabId);
  t.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url = url;
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isWebUrl = com_broceliand_pearlbar_gwt_client_common_WebContent_isWebUrl__Ljava_lang_String_2Z(url);
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isInPearltrees = com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isWebUrl && (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , url != null && (url.indexOf($wnd.PEARLTREES_URL) == 0 || url.indexOf($wnd.PEARLTREES_URL_HTTP) == 0 || url.indexOf($wnd.PEARLTREES_URL_BASE) != -1 || url.indexOf($wnd.PEAR_LY_URL) == 0) && url.indexOf($intern_14) < 0);
  com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_go = false;
  com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_animPhase == 0 && com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_setIcon__Ljava_lang_String_2V(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isWebUrl && !com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isInPearltrees?$intern_51:$intern_52);
  isSelection && com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isInPearltrees && com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedTreeId > 0 && !!com_broceliand_pearlbar_gwt_client_background_firefox_AppState_lastPearled && java_util_Date_$before__Ljava_util_Date_2Ljava_util_Date_2Z(t.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_creation, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_lastPearled)?com_broceliand_pearlbar_gwt_client_background_firefox_AppState_reveal__DDV(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedTreeId, com_broceliand_pearlbar_gwt_client_background_firefox_AppState_selectedAssoId):com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isInPearltrees && (url.lastIndexOf($intern_53) != -1 && url.lastIndexOf($intern_53) == url.length - $intern_53.length?(chrome.tabs.remove(t.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_id) , undefined):com_broceliand_pearlbar_gwt_client_background_firefox_AppState_setSelectedTreeAndAssoFromUrl__Ljava_lang_String_2V(url));
  com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_pollConfigFileIfNecessary__V();
  com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_pollBackgroundConfigFileIfNecessary__V();
  com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_pollPromoIfNecessary__V();
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_setHasGivenRights__ZV(hasGiven){
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_hasGivenRights = hasGiven;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab(){
}

_ = com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_BrowserTab__V.prototype = com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1BrowserTab_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {3:1};
_.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_creation = null;
_.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_id = 0;
_.com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_url = null;
var com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_currentTabId = 0, com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_hasGivenRights = true, com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_tabs;
function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$1_BrowserTab$1__V(){
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$1(){
}

_ = com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$1_BrowserTab$1__V.prototype = com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$1.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1BrowserTab$1_12_1classLit;
}
;
_.onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V = function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$1_onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V(request, exception){
}
;
_.onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V = function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$1_onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(request, response){
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$2_BrowserTab$2__V(){
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$2(){
}

_ = com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$2_BrowserTab$2__V.prototype = com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$2.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$2_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1BrowserTab$2_12_1classLit;
}
;
_.onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V = function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$2_onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V(request, exception){
}
;
_.onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V = function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$2_onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(request, response){
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$3_BrowserTab$3__V(){
}

function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$3(){
}

_ = com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$3_BrowserTab$3__V.prototype = com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$3.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$3_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1BrowserTab$3_12_1classLit;
}
;
_.onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V = function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$3_onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V(request, exception){
}
;
_.onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V = function com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab$3_onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(request, response){
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_broceliand_pearlbar_gwt_client_background_firefox_ContextMenus_exports__V(){
  var pearltreesContextMenuItem = null;
  chrome.tabs.onUpdated.addListener(updateContextMenuItem);
  chrome.tabs.onActivated.addListener(updateContextMenuItem);
  function updateContextMenuItem(){
    chrome.tabs.query({active:true, lastFocusedWindow:true}, function(tabs){
      var currentUrl;
      currentUrl = tabs[0].url;
      $wnd.getButtonParameters(function(params){
        var isRightClickEnabled = $wnd.JSON.parse(params).rightClick;
        var isAWebsite = currentUrl.indexOf($intern_54) >= 0 || currentUrl.indexOf($intern_55) >= 0;
        var isNotExcludedWebsite = !$wnd.isExcludedSite(currentUrl);
        isRightClickEnabled && isAWebsite && isNotExcludedWebsite?addContextMenuItem():removeContextMenuItem();
      }
      );
    }
    );
  }

  function addContextMenuItem(){
    !pearltreesContextMenuItem && (pearltreesContextMenuItem = chrome.contextMenus.create({title:$wnd.getMessage($intern_56), onclick:onClickPearltrees, contexts:[$intern_57, $intern_58, $intern_59, $intern_60, $intern_61, $intern_62, $intern_63]}));
  }

  function removeContextMenuItem(){
    if (pearltreesContextMenuItem) {
      chrome.contextMenus.remove(pearltreesContextMenuItem);
      pearltreesContextMenuItem = null;
    }
  }

  function onClickPearltrees(info, tab){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {action:$intern_64, info:info}, function(response){
      }
      );
    }
    );
  }

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    request.messageKey && sendResponse({message:$wnd.getMessage(request.messageKey)});
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_nextPhase__V(){
  var t;
  ++com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_animPhase;
  switch (com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_animPhase) {
    case 1:
    case 7:
      com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_setIcon__Ljava_lang_String_2V($intern_65);
      break;
    case 2:
    case 6:
      com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_setIcon__Ljava_lang_String_2V($intern_66);
      break;
    case 3:
    case 5:
      com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_setIcon__Ljava_lang_String_2V($intern_67);
      break;
    case 4:
      com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_setIcon__Ljava_lang_String_2V($intern_68);
      break;
    default:com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_animPhase = 0;
  }
  if (com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_animPhase == 0) {
    com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_setIcon__ZZV(com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_go, false);
  }
   else {
    t = new com_broceliand_pearlbar_gwt_client_background_firefox_MainButton$1_MainButton$1__V;
    com_google_gwt_user_client_Timer_$schedule__Lcom_google_gwt_user_client_Timer_2IV(t, 200);
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_setIcon__ZZV(forceGo, startAnim){
  com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_go = forceGo;
  com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_animPhase == 0 && (startAnim?com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_nextPhase__V():com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_setIcon__Ljava_lang_String_2V(forceGo || !(com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isWebUrl && !com_broceliand_pearlbar_gwt_client_background_firefox_AppState_isInPearltrees)?$intern_52:$intern_51));
}

function com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_setIcon__Ljava_lang_String_2V(name){
  if (!java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(name, com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_currentIcon)) {
    chrome.browserAction.setIcon({path:chrome.extension.getURL($intern_69 + name + $intern_70)});
    com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_currentIcon = name;
  }
}

var com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_animPhase = 0, com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_currentIcon = null, com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_go = false;
function com_google_gwt_user_client_Timer_$clinit__V(){
  com_google_gwt_user_client_Timer_$clinit__V = nullMethod;
  com_google_gwt_user_client_Timer_timers = new java_util_ArrayList_ArrayList__V;
  com_google_gwt_user_client_Window_addCloseHandler__Lcom_google_gwt_event_logical_shared_CloseHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(new com_google_gwt_user_client_Timer$1_Timer$1__V);
}

function com_google_gwt_user_client_Timer_$cancel__Lcom_google_gwt_user_client_Timer_2V(this$static){
  this$static.com_google_gwt_user_client_Timer_isRepeating?($wnd.clearInterval(this$static.com_google_gwt_user_client_Timer_timerId) , undefined):($wnd.clearTimeout(this$static.com_google_gwt_user_client_Timer_timerId) , undefined);
  java_util_ArrayList_$remove__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(com_google_gwt_user_client_Timer_timers, this$static);
}

function com_google_gwt_user_client_Timer_$schedule__Lcom_google_gwt_user_client_Timer_2IV(this$static, delayMillis){
  if (delayMillis <= 0) {
    throw new java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V($intern_71);
  }
  this$static.com_google_gwt_user_client_Timer_isRepeating?($wnd.clearInterval(this$static.com_google_gwt_user_client_Timer_timerId) , undefined):($wnd.clearTimeout(this$static.com_google_gwt_user_client_Timer_timerId) , undefined);
  java_util_ArrayList_$remove__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(com_google_gwt_user_client_Timer_timers, this$static);
  this$static.com_google_gwt_user_client_Timer_isRepeating = false;
  this$static.com_google_gwt_user_client_Timer_timerId = com_google_gwt_user_client_Timer_createTimeout__Lcom_google_gwt_user_client_Timer_2II(this$static, delayMillis);
  java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(com_google_gwt_user_client_Timer_timers, this$static);
}

function com_google_gwt_user_client_Timer_createTimeout__Lcom_google_gwt_user_client_Timer_2II(timer, delay){
  return $wnd.setTimeout($entry(function(){
    timer.fire__V();
  }
  ), delay);
}

function com_google_gwt_user_client_Timer(){
}

_ = com_google_gwt_user_client_Timer.prototype = new java_lang_Object;
_.fire__V = function com_google_gwt_user_client_Timer_fire__V(){
  this.com_google_gwt_user_client_Timer_isRepeating || java_util_ArrayList_$remove__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(com_google_gwt_user_client_Timer_timers, this);
  this.run__V();
}
;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_user_client_Timer_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Timer_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {16:1};
_.com_google_gwt_user_client_Timer_isRepeating = false;
_.com_google_gwt_user_client_Timer_timerId = 0;
var com_google_gwt_user_client_Timer_timers;
function com_broceliand_pearlbar_gwt_client_background_firefox_MainButton$1_MainButton$1__V(){
  com_google_gwt_user_client_Timer_$clinit__V();
}

function com_broceliand_pearlbar_gwt_client_background_firefox_MainButton$1(){
}

_ = com_broceliand_pearlbar_gwt_client_background_firefox_MainButton$1_MainButton$1__V.prototype = com_broceliand_pearlbar_gwt_client_background_firefox_MainButton$1.prototype = new com_google_gwt_user_client_Timer;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_background_firefox_MainButton$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1MainButton$1_12_1classLit;
}
;
_.run__V = function com_broceliand_pearlbar_gwt_client_background_firefox_MainButton$1_run__V(){
  com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_nextPhase__V();
}
;
_.java_lang_Object_castableTypeMap$ = {16:1};
function com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_exports__V(){
  $wnd.pollPromoIfNecessary = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_pollPromoIfNecessary__V);
  $wnd.getPromoLastPolled = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_getPromoLastPolled__Lcom_google_gwt_core_client_JavaScriptObject_2V);
  $wnd.getCurrentPromoWithCallback = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_getCurrentPromoWithCallback__Lcom_google_gwt_core_client_JavaScriptObject_2V);
  $wnd.getCurrentPromo = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_getCurrentPromo__Lcom_google_gwt_core_client_JavaScriptObject_2);
  $wnd.saveAndPersistPromoLastPolled = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_saveAndPersistPromoLastPolled__DV);
  $wnd.saveAndInitCurrentPromo = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_saveAndInitCurrentPromo__Lcom_google_gwt_core_client_JavaScriptObject_2V);
  $wnd.invalidateCurrentPromo = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_invalidateCurrentPromo__V);
  $wnd.getPromoLastPolled(function(data){
    $wnd.saveAndPersistPromoLastPolled(data);
    $wnd.pollPromoIfNecessary();
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_getCurrentPromo__Lcom_google_gwt_core_client_JavaScriptObject_2(){
  return !!com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_currentPromo && com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_hasAValidCurrentPromo?com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_currentPromo:{promoType:$intern_72};
}

function com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_getCurrentPromoWithCallback__Lcom_google_gwt_core_client_JavaScriptObject_2V(callback){
  callback($wnd.getCurrentPromo);
}

function com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_getPromoLastPolled__Lcom_google_gwt_core_client_JavaScriptObject_2V(callback){
  chrome.storage.local.get($intern_73, function(data){
    typeof data.PTPromoLastPolled !== $intern_20 && data.PTPromoLastPolled != null?callback(data.PTPromoLastPolled + 0):callback(0);
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_invalidateCurrentPromo__V(){
  com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_hasAValidCurrentPromo = false;
  com_broceliand_pearlbar_gwt_client_common_AppClient_$requestPromoInternal__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2Ljava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PromoClient_2V($wnd.getMessage($intern_74));
}

function com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_pollPromoIfNecessary__V(){
  var currentTime, pollingInterval;
  currentTime = com_google_gwt_lang_LongLib_toDouble__Lcom_google_gwt_lang_LongLibBase$LongEmul_2D(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2((new java_util_Date_Date__V).java_util_Date_jsdate.getTime()));
  pollingInterval = com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getPremiumPromoPollingInterval__D();
  if (currentTime - com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_lastPolledPromo > pollingInterval && !com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_hasAValidCurrentPromo) {
    com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_lastPolledPromo = currentTime;
    com_broceliand_pearlbar_gwt_client_common_AppClient_$requestPromoInternal__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2Ljava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PromoClient_2V($wnd.getMessage($intern_74));
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_saveAndInitCurrentPromo__Lcom_google_gwt_core_client_JavaScriptObject_2V(data){
  if (data) {
    com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_hasAValidCurrentPromo = true;
    com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_currentPromo = data;
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_saveAndPersistPromoLastPolled__DV(millTime){
  com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_savePromoLastPolled__DV(millTime);
  com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_lastPolledPromo = millTime;
}

function com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_savePromoLastPolled__DV(millTime){
  chrome.storage.local.set({PTPromoLastPolled:millTime}, function(){
  }
  );
}

var com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_currentPromo = null, com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_hasAValidCurrentPromo = false, com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_lastPolledPromo = 0;
function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_exports__V(){
  $wnd.pollConfigFileIfNecessary = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_pollConfigFileIfNecessary__V);
  $wnd.getConfigFileLastModified = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_getConfigFileLastModified__Lcom_google_gwt_core_client_JavaScriptObject_2V);
  $wnd.getConfigFile = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_getConfigFile__Lcom_google_gwt_core_client_JavaScriptObject_2V);
  $wnd.saveAndPersistConfigFileLastModified = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_saveAndPersistConfigFileLastModified__DV);
  $wnd.saveAndInitConfigFile = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_saveAndInitConfigFile__Ljava_lang_String_2V);
  $wnd.getConfigFile(function(data){
    if (data != null) {
      $wnd.saveAndInitConfigFile(data);
      $wnd.getConfigFileLastModified(function(data){
        $wnd.saveAndPersistConfigFileLastModified(data);
        $wnd.pollConfigFileIfNecessary();
      }
      );
    }
     else {
      $wnd.pollConfigFileIfNecessary();
    }
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_getConfigFile__Lcom_google_gwt_core_client_JavaScriptObject_2V(callback){
  chrome.storage.local.get($intern_75, function(data){
    typeof data.PTConfigFile !== $intern_20 && data.PTConfigFile != null?callback(data.PTConfigFile):callback(null);
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_getConfigFileLastModified__Lcom_google_gwt_core_client_JavaScriptObject_2V(callback){
  chrome.storage.local.get($intern_76, function(data){
    typeof data.PTConfigFileLastModified !== $intern_20 && data.PTConfigFileLastModified != null?callback(data.PTConfigFileLastModified + 0):callback(0);
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_pollConfigFile__V(){
  var $e0, builder, lastModDate, url;
  url = (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , $wnd.PEARLTREES_URL) + $intern_77;
  lastModDate = new java_util_Date_Date__JV(com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_lastModifiedConfigFile);
  builder = new com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V((com_google_gwt_http_client_RequestBuilder_$clinit__V() , com_google_gwt_http_client_RequestBuilder_GET), url);
  com_google_gwt_http_client_RequestBuilder_$setHeader__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Ljava_lang_String_2V(builder, $intern_28, $intern_78);
  com_google_gwt_http_client_RequestBuilder_$setHeader__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Ljava_lang_String_2V(builder, $intern_30, com_google_gwt_i18n_client_DateTimeFormat_$format__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_util_Date_2Ljava_lang_String_2((com_google_gwt_i18n_client_DateTimeFormat_$clinit__V() , com_google_gwt_i18n_client_DateTimeFormat_getFormat__Ljava_lang_String_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2Lcom_google_gwt_i18n_client_DateTimeFormat_2(com_google_gwt_i18n_client_LocaleInfo_$getDateTimeFormatInfo__Lcom_google_gwt_i18n_client_LocaleInfo_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2((com_google_gwt_i18n_client_LocaleInfo_$clinit__V() , com_google_gwt_i18n_client_LocaleInfo_$clinit__V() , com_google_gwt_i18n_client_LocaleInfo_instance)))), lastModDate));
  try {
    com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(builder, null, new com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig$1_ServerConfig$1__V);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 2))
      throw $e0;
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_pollConfigFileIfNecessary__V(){
  var currentTime, pollingInterval;
  currentTime = com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2((new java_util_Date_Date__V).java_util_Date_jsdate.getTime());
  pollingInterval = com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_getPollingInterval__D());
  if (com_google_gwt_lang_LongLib_gt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(com_google_gwt_lang_LongLib_sub__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(currentTime, com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_lastPolledConfigFile), pollingInterval)) {
    com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_lastPolledConfigFile = currentTime;
    com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_pollConfigFile__V();
  }
}

function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_saveAndInitConfigFile__Ljava_lang_String_2V(data){
  data != null && com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_saveConfigFile__Ljava_lang_String_2V(data);
}

function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_saveAndPersistConfigFileLastModified__DV(millTime){
  com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_lastModifiedConfigFile = com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(millTime);
  com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_saveConfigFileLastModified__DV(millTime);
}

function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_saveConfigFile__Ljava_lang_String_2V(data){
  chrome.storage.local.set({PTConfigFile:data}, function(){
  }
  );
}

function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_saveConfigFileLastModified__DV(millTime){
  chrome.storage.local.set({PTConfigFileLastModified:millTime}, function(){
  }
  );
}

var com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_lastModifiedConfigFile = P0_longLit, com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_lastPolledConfigFile = P0_longLit;
function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig$1_ServerConfig$1__V(){
}

function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig$1(){
}

_ = com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig$1_ServerConfig$1__V.prototype = com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig$1.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1ServerConfig$1_12_1classLit;
}
;
_.onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V = function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig$1_onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V(request, exception){
}
;
_.onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V = function com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig$1_onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(request, response){
  var d, lastModified, statusCode, text;
  statusCode = response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.status;
  if (statusCode == 200) {
    lastModified = (com_google_gwt_http_client_StringValidator_throwIfEmptyOrNull__Ljava_lang_String_2Ljava_lang_String_2V($intern_31, $intern_32) , response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.getResponseHeader($intern_32));
    d = com_google_gwt_i18n_client_DateTimeFormat_$parse__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2ZLjava_util_Date_2((com_google_gwt_i18n_client_DateTimeFormat_$clinit__V() , com_google_gwt_i18n_client_DateTimeFormat_getFormat__Ljava_lang_String_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2Lcom_google_gwt_i18n_client_DateTimeFormat_2(com_google_gwt_i18n_client_LocaleInfo_$getDateTimeFormatInfo__Lcom_google_gwt_i18n_client_LocaleInfo_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2((com_google_gwt_i18n_client_LocaleInfo_$clinit__V() , com_google_gwt_i18n_client_LocaleInfo_$clinit__V() , com_google_gwt_i18n_client_LocaleInfo_instance)))), lastModified);
    text = response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.responseText;
    text != null && com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_saveConfigFile__Ljava_lang_String_2V(text);
    com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_saveAndPersistConfigFileLastModified__DV(com_google_gwt_lang_LongLib_toDouble__Lcom_google_gwt_lang_LongLibBase$LongEmul_2D(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(d.java_util_Date_jsdate.getTime())));
  }
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(statusCode){
  if (statusCode == 503) {
    return $wnd.getMessage($intern_79);
  }
  if (statusCode == 303 && (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_WebContent_isOnSafari)) {
    if (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_WebContent_isOnWindows) {
      return $wnd.getMessage($intern_80);
    }
    return $wnd.getMessage($intern_81);
  }
  if (statusCode == 303 || statusCode == 12150 || statusCode == 12017) {
    return $wnd.getMessage($intern_82);
  }
  return $wnd.getMessage($intern_79);
}

function com_broceliand_pearlbar_gwt_client_common_AppClient_$pearlContentInternal__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2Ljava_lang_String_2Ljava_lang_String_2IDDLjava_lang_String_2IZZLjava_lang_String_2ZLcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClientType_2Ljava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient_2ZV(url, title, treeVisibility, treeId, parentTreeId, newTreeName, newTreeVisibility, shareOnFb, shareOnTw, text){
  var $e0, builder, requestData, service, shareFb, shareTw;
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  newTreeName != null?newTreeVisibility == 2 || treeVisibility == 2?(com_broceliand_pearlbar_gwt_client_common_PearledType_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_PearledType_NEW_1TREE_1PRIVATE):(com_broceliand_pearlbar_gwt_client_common_PearledType_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_PearledType_NEW_1TREE):newTreeVisibility == 2 || treeVisibility == 2?(com_broceliand_pearlbar_gwt_client_common_PearledType_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_PearledType_PEARLED_1PRIVATE):(com_broceliand_pearlbar_gwt_client_common_PearledType_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_PearledType_PEARLED);
  service = (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , $wnd.COLLECTOR_URL) + $intern_83;
  shareFb = shareOnFb?1:0;
  shareTw = shareOnTw?1:0;
  requestData = $wnd.JSON.stringify(com_broceliand_pearlbar_gwt_client_common_AppClient_buildRequestDataDict__Ljava_lang_String_2Ljava_lang_String_2DDLjava_lang_String_2IZIILjava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2(url, title, treeId, parentTreeId, newTreeName, newTreeVisibility, com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$resetRevealed__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2Z(), shareFb, shareTw, $intern_16, text));
  builder = new com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V((com_google_gwt_http_client_RequestBuilder_$clinit__V() , com_google_gwt_http_client_RequestBuilder_POST), service);
  try {
    com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(builder, requestData, new com_broceliand_pearlbar_gwt_client_common_AppClient$1_AppClient$1__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2V);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 2)) {
      com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onError__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_2Ljava_lang_String_2V((com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1MESSAGE), com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(0));
    }
     else 
      throw $e0;
  }
}

function com_broceliand_pearlbar_gwt_client_common_AppClient_$requestPromoInternal__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2Ljava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PromoClient_2V(localeId){
  var $e0, builder, requestData, service;
  service = (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , $wnd.COLLECTOR_URL) + $intern_84;
  requestData = $wnd.JSON.stringify({locale:localeId});
  builder = new com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V((com_google_gwt_http_client_RequestBuilder_$clinit__V() , com_google_gwt_http_client_RequestBuilder_POST), service);
  try {
    com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(builder, requestData, new com_broceliand_pearlbar_gwt_client_common_AppClient$2_AppClient$2__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2V);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 2)) {
      com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(0);
    }
     else 
      throw $e0;
  }
}

function com_broceliand_pearlbar_gwt_client_common_AppClient_buildRequestDataDict__Ljava_lang_String_2Ljava_lang_String_2DDLjava_lang_String_2IZIILjava_lang_String_2Ljava_lang_String_2Lcom_google_gwt_core_client_JavaScriptObject_2(url, title, treeId, parentTreeId, newTreeName, newTreeVisibility, resetRevealed, shareFb, shareTw, type, text){
  requestData = {url:url, title:title};
  if (treeId > 0) {
    requestData.treeID = treeId;
  }
   else {
    requestData.isStart = true;
    requestData.newTreeName = newTreeName;
    requestData.parentTreeID = parentTreeId;
    requestData.visibility = newTreeVisibility;
  }
  resetRevealed && (requestData.dup = 1);
  requestData.sharePearlsFb = shareFb;
  requestData.sharePearlsTw = shareTw;
  requestData.layout = type;
  requestData.text = text;
  return requestData;
}

function com_broceliand_pearlbar_gwt_client_common_AppClient_buildRevealHash__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2DDLjava_lang_String_2(userTrees, treeId, assoId){
  var hash;
  if ((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, 0).treeID) == treeId) {
    return null;
  }
  hash = $intern_16;
  if (treeId > 0 || assoId > 0 || (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_WebContent_isOnIpad)) {
    hash += $intern_85;
    hash += $intern_86 + userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.currentUser.userID;
  }
  if (treeId > 0) {
    hash += $intern_87 + treeId;
    hash += $intern_88 + treeId;
  }
  assoId > 0 && (hash += $intern_89 + assoId);
  return hash;
}

function com_broceliand_pearlbar_gwt_client_common_AppClient_pearlContent__Ljava_lang_String_2Ljava_lang_String_2IDDLjava_lang_String_2IZZLjava_lang_String_2ZLcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClientType_2Ljava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient_2ZV(url, title, treeVisibility, treeId, parentTreeId, newTreeName, newTreeVisibility, shareOnFb, shareOnTw, text){
  com_broceliand_pearlbar_gwt_client_common_AppClient_$pearlContentInternal__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2Ljava_lang_String_2Ljava_lang_String_2IDDLjava_lang_String_2IZZLjava_lang_String_2ZLcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClientType_2Ljava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient_2ZV(url, title, treeVisibility, treeId, parentTreeId, newTreeName, newTreeVisibility, shareOnFb, shareOnTw, text);
}

function com_broceliand_pearlbar_gwt_client_common_AppClient$1_AppClient$1__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2V(){
}

function com_broceliand_pearlbar_gwt_client_common_AppClient$1(){
}

_ = com_broceliand_pearlbar_gwt_client_common_AppClient$1_AppClient$1__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2V.prototype = com_broceliand_pearlbar_gwt_client_common_AppClient$1.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_common_AppClient$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1AppClient$1_12_1classLit;
}
;
_.onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V = function com_broceliand_pearlbar_gwt_client_common_AppClient$1_onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V(request, exception){
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onError__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_2Ljava_lang_String_2V((com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1MESSAGE), com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(0));
}
;
_.onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V = function com_broceliand_pearlbar_gwt_client_common_AppClient$1_onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(request, response){
  var newTreeId;
  if (response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.status == 200) {
    if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_90, response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.responseText)) {
      com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onPearled__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2DV(0);
    }
     else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_4, response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.responseText)) {
      com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onError__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_2Ljava_lang_String_2V((com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1INVALID_1TREE), null);
    }
     else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_91, response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.responseText)) {
      com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onError__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_2Ljava_lang_String_2V((com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1DELETED_1TREE), null);
    }
     else if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_92, response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.responseText)) {
      com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onError__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_2Ljava_lang_String_2V((com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1IS_1NOT_1OWNER), null);
    }
     else if (response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.responseText.indexOf($intern_93) == 0) {
      newTreeId = (new java_lang_Double_Double__DV(java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.responseText, 2)))).java_lang_Double_value;
      com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onPearled__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2DV(newTreeId);
    }
     else {
      com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onError__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_2Ljava_lang_String_2V((com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1MESSAGE), $wnd.getMessage($intern_94));
    }
  }
   else {
    com_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_$onError__Lcom_broceliand_pearlbar_gwt_client_background_firefox_AppState$1_2Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_2Ljava_lang_String_2V((com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1MESSAGE), com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.status));
  }
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_broceliand_pearlbar_gwt_client_common_AppClient$2_AppClient$2__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2V(){
}

function com_broceliand_pearlbar_gwt_client_common_AppClient$2(){
}

_ = com_broceliand_pearlbar_gwt_client_common_AppClient$2_AppClient$2__Lcom_broceliand_pearlbar_gwt_client_common_AppClient_2V.prototype = com_broceliand_pearlbar_gwt_client_common_AppClient$2.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_common_AppClient$2_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1AppClient$2_12_1classLit;
}
;
_.onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V = function com_broceliand_pearlbar_gwt_client_common_AppClient$2_onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V(request, exception){
  com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(0);
}
;
_.onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V = function com_broceliand_pearlbar_gwt_client_common_AppClient$2_onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(request, response){
  response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.status == 200?(com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_saveAndInitCurrentPromo__Lcom_google_gwt_core_client_JavaScriptObject_2V($wnd.JSON.parse(response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.responseText)) , com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_saveAndPersistPromoLastPolled__DV(com_google_gwt_lang_LongLib_toDouble__Lcom_google_gwt_lang_LongLibBase$LongEmul_2D(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2((new java_util_Date_Date__V).java_util_Date_jsdate.getTime())))):(com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.status) , undefined);
}
;
_.java_lang_Object_castableTypeMap$ = {};
function java_lang_Enum(){
}

_ = java_lang_Enum.prototype = new java_lang_Object;
_.equals__Ljava_lang_Object_2Z$ = function java_lang_Enum_equals__Ljava_lang_Object_2Z(other){
  return this === other;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_lang_Enum_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Enum_12_1classLit;
}
;
_.hashCode__I$ = function java_lang_Enum_hashCode__I(){
  return this.$H || (this.$H = ++com_google_gwt_core_client_impl_Impl_sNextHashId);
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Enum_toString__Ljava_lang_String_2(){
  return this.java_lang_Enum_name;
}
;
_.java_lang_Object_castableTypeMap$ = {23:1, 25:1, 26:1};
_.java_lang_Enum_name = null;
function com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V(){
  com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V = nullMethod;
  com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1MESSAGE = new com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_AppClient$PearlClient$PearlClientErrorCode__Ljava_lang_String_2ILjava_lang_String_2V($intern_95, null);
  com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1INVALID_1TREE = new com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_AppClient$PearlClient$PearlClientErrorCode__Ljava_lang_String_2ILjava_lang_String_2V($intern_96, $intern_97);
  com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1DELETED_1TREE = new com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_AppClient$PearlClient$PearlClientErrorCode__Ljava_lang_String_2ILjava_lang_String_2V($intern_98, $intern_99);
  com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1IS_1NOT_1OWNER = new com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_AppClient$PearlClient$PearlClientErrorCode__Ljava_lang_String_2ILjava_lang_String_2V($intern_100, $intern_101);
  com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$VALUES = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1AppClient$PearlClient$PearlClientErrorCode_12_1classLit, {23:1}, 19, [com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1MESSAGE, com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1INVALID_1TREE, com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1DELETED_1TREE, com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1IS_1NOT_1OWNER]);
}

function com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_AppClient$PearlClient$PearlClientErrorCode__Ljava_lang_String_2ILjava_lang_String_2V(enum$name, key){
  this.java_lang_Enum_name = enum$name;
  this.com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_key = key;
}

function com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_values___3Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_2(){
  com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$clinit__V();
  return com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$VALUES;
}

function com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode(){
}

_ = com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_AppClient$PearlClient$PearlClientErrorCode__Ljava_lang_String_2ILjava_lang_String_2V.prototype = com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode.prototype = new java_lang_Enum;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1AppClient$PearlClient$PearlClientErrorCode_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {19:1, 23:1, 25:1, 26:1};
_.com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_key = null;
var com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_$VALUES, com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1DELETED_1TREE, com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1INVALID_1TREE, com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1IS_1NOT_1OWNER, com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_ERROR_1MESSAGE;
function com_broceliand_pearlbar_gwt_client_common_PearledType_$clinit__V(){
  com_broceliand_pearlbar_gwt_client_common_PearledType_$clinit__V = nullMethod;
  com_broceliand_pearlbar_gwt_client_common_PearledType_PEARLED = new com_broceliand_pearlbar_gwt_client_common_PearledType_PearledType__Ljava_lang_String_2IV($intern_102);
  com_broceliand_pearlbar_gwt_client_common_PearledType_PEARLED_1PRIVATE = new com_broceliand_pearlbar_gwt_client_common_PearledType_PearledType__Ljava_lang_String_2IV($intern_103);
  com_broceliand_pearlbar_gwt_client_common_PearledType_NEW_1TREE = new com_broceliand_pearlbar_gwt_client_common_PearledType_PearledType__Ljava_lang_String_2IV($intern_104);
  com_broceliand_pearlbar_gwt_client_common_PearledType_NEW_1TREE_1PRIVATE = new com_broceliand_pearlbar_gwt_client_common_PearledType_PearledType__Ljava_lang_String_2IV($intern_105);
  com_broceliand_pearlbar_gwt_client_common_PearledType_$VALUES = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1PearledType_12_1classLit, {23:1}, 20, [com_broceliand_pearlbar_gwt_client_common_PearledType_PEARLED, com_broceliand_pearlbar_gwt_client_common_PearledType_PEARLED_1PRIVATE, com_broceliand_pearlbar_gwt_client_common_PearledType_NEW_1TREE, com_broceliand_pearlbar_gwt_client_common_PearledType_NEW_1TREE_1PRIVATE]);
}

function com_broceliand_pearlbar_gwt_client_common_PearledType_PearledType__Ljava_lang_String_2IV(enum$name){
  this.java_lang_Enum_name = enum$name;
}

function com_broceliand_pearlbar_gwt_client_common_PearledType_values___3Lcom_broceliand_pearlbar_gwt_client_common_PearledType_2(){
  com_broceliand_pearlbar_gwt_client_common_PearledType_$clinit__V();
  return com_broceliand_pearlbar_gwt_client_common_PearledType_$VALUES;
}

function com_broceliand_pearlbar_gwt_client_common_PearledType(){
}

_ = com_broceliand_pearlbar_gwt_client_common_PearledType_PearledType__Ljava_lang_String_2IV.prototype = com_broceliand_pearlbar_gwt_client_common_PearledType.prototype = new java_lang_Enum;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_common_PearledType_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1PearledType_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {20:1, 23:1, 25:1, 26:1};
var com_broceliand_pearlbar_gwt_client_common_PearledType_$VALUES, com_broceliand_pearlbar_gwt_client_common_PearledType_NEW_1TREE, com_broceliand_pearlbar_gwt_client_common_PearledType_NEW_1TREE_1PRIVATE, com_broceliand_pearlbar_gwt_client_common_PearledType_PEARLED, com_broceliand_pearlbar_gwt_client_common_PearledType_PEARLED_1PRIVATE;
function com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_$clinit__V(){
  com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_$clinit__V = nullMethod;
  com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_FACEBOOK = new com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_SyncModel$SyncService__Ljava_lang_String_2IV($intern_106);
  com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_TWITTER = new com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_SyncModel$SyncService__Ljava_lang_String_2IV($intern_107);
  com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_EXTEND = new com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_SyncModel$SyncService__Ljava_lang_String_2IV($intern_108);
  com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_$VALUES = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1SyncModel$SyncService_12_1classLit, {23:1}, 21, [com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_FACEBOOK, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_TWITTER, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_EXTEND]);
}

function com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_SyncModel$SyncService__Ljava_lang_String_2IV(enum$name){
  this.java_lang_Enum_name = enum$name;
}

function com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_values___3Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2(){
  com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_$clinit__V();
  return com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_$VALUES;
}

function com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService(){
}

_ = com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_SyncModel$SyncService__Ljava_lang_String_2IV.prototype = com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService.prototype = new java_lang_Enum;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1SyncModel$SyncService_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {21:1, 23:1, 25:1, 26:1};
var com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_$VALUES, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_EXTEND, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_FACEBOOK, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_TWITTER;
function com_broceliand_pearlbar_gwt_client_common_UUID_$clinit__V(){
  var java_lang_String_$toCharArray__Ljava_lang_String_2_3C_charArr_0;
  com_broceliand_pearlbar_gwt_client_common_UUID_$clinit__V = nullMethod;
  com_broceliand_pearlbar_gwt_client_common_UUID_CHARS = (java_lang_String_$toCharArray__Ljava_lang_String_2_3C_charArr_0 = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13C_1classLit, {23:1}, -1, 62, 1) , java_lang_String_$getChars__Ljava_lang_String_2II_3CIV(java_lang_String_$toCharArray__Ljava_lang_String_2_3C_charArr_0, 0) , java_lang_String_$toCharArray__Ljava_lang_String_2_3C_charArr_0);
}

function com_broceliand_pearlbar_gwt_client_common_UUID_uuid__Ljava_lang_String_2(){
  com_broceliand_pearlbar_gwt_client_common_UUID_$clinit__V();
  var i, r, uuid;
  uuid = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13C_1classLit, {23:1}, -1, 36, 1);
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = 45;
  uuid[14] = 52;
  for (i = 0; i < 36; ++i) {
    if (uuid[i] == 0) {
      r = com_google_gwt_lang_Cast_round_1int__DI(Math.random() * 16);
      uuid[i] = com_broceliand_pearlbar_gwt_client_common_UUID_CHARS[i == 19?r & 3 | 8:r & 15];
    }
  }
  return String.fromCharCode.apply(null, uuid);
}

var com_broceliand_pearlbar_gwt_client_common_UUID_CHARS;
function com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V(){
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V = nullMethod;
  com_broceliand_pearlbar_gwt_client_common_UserTrees_lastRequestTreesReceived = new java_util_Date_Date__JV(P0_longLit);
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsAuthenticated__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2Z(this$static, service){
  if (service == (com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_FACEBOOK)) {
    return this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.currentUser.authFb;
  }
  if (service == com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_TWITTER) {
    return this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.currentUser.authTw;
  }
  return false;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsPremium__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z(this$static){
  return java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_4, com_broceliand_pearlbar_gwt_client_common_UserTrees_getPremiumStatus__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data)) || java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_91, com_broceliand_pearlbar_gwt_client_common_UserTrees_getPremiumStatus__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data));
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsSharePearls__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2Z(this$static, service){
  if (service == (com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_FACEBOOK)) {
    return this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.currentUser.sharePearlsFb;
  }
  if (service == com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_TWITTER) {
    return this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.currentUser.sharePearlsTw;
  }
  return false;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_$getTreeTitle__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2ILjava_lang_String_2(this$static, i){
  if (!!this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data && !!com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i)) {
    return com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i).title;
  }
  return null;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_$hasChanged__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z(this$static, n){
  return com_broceliand_pearlbar_gwt_client_common_UserTrees_$hasStructureChanged__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z(this$static, n) || com_broceliand_pearlbar_gwt_client_common_UserTrees_$hasSelectionChanged__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z(this$static, n) || com_broceliand_pearlbar_gwt_client_common_UserTrees_$hasShareChanged__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z(this$static, n);
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_$hasSelectionChanged__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z(this$static, n){
  if ((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.status) != 1 || n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.status != 1) {
    return true;
  }
  if (com_broceliand_pearlbar_gwt_client_common_UserTrees_getSelectedTreeId__Lcom_google_gwt_core_client_JavaScriptObject_2D(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data) != com_broceliand_pearlbar_gwt_client_common_UserTrees_getSelectedTreeId__Lcom_google_gwt_core_client_JavaScriptObject_2D(n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data)) {
    return true;
  }
  return false;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_$hasShareChanged__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z(this$static, n){
  if ((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.status) != 1 || n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.status != 1) {
    return true;
  }
  if (com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsAuthenticated__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2Z(this$static, (com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_FACEBOOK)) != com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsAuthenticated__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2Z(n, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_FACEBOOK)) {
    return true;
  }
  if (com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsSharePearls__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2Z(this$static, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_FACEBOOK) != com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsSharePearls__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2Z(n, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_FACEBOOK)) {
    return true;
  }
  if (com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsAuthenticated__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2Z(this$static, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_TWITTER) != com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsAuthenticated__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2Z(n, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_TWITTER)) {
    return true;
  }
  if (com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsSharePearls__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2Z(this$static, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_TWITTER) != com_broceliand_pearlbar_gwt_client_common_UserTrees_$getIsSharePearls__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2Z(n, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_TWITTER)) {
    return true;
  }
  return false;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_$hasStructureChanged__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2Z(this$static, n){
  var i;
  if ((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.status) != n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.status) {
    return true;
  }
  if (!java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.message, n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.message)) {
    return true;
  }
  if (this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.status != 1) {
    return true;
  }
  if (com_broceliand_pearlbar_gwt_client_common_UserTrees_getPremiumStatus__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data) != com_broceliand_pearlbar_gwt_client_common_UserTrees_getPremiumStatus__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data)) {
    return true;
  }
  i = this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.treeList.length;
  if (i != n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.treeList.length) {
    return true;
  }
  for (; i-- > 0;) {
    if (com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i).treeID != com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i).treeID) {
      return true;
    }
    if (com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i).assoId != com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i).assoId) {
      return true;
    }
    if (!java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(com_broceliand_pearlbar_gwt_client_common_UserTrees_$getTreeTitle__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2ILjava_lang_String_2(this$static, i), com_broceliand_pearlbar_gwt_client_common_UserTrees_$getTreeTitle__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2ILjava_lang_String_2(n, i))) {
      return true;
    }
    if (com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i).depth != com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i).depth) {
      return true;
    }
    if ((i != 0 && java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i).pearlCount) >= 250) != (i != 0 && java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(n.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i).pearlCount) >= 250)) {
      return true;
    }
  }
  return false;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_$saveInLocalStorage__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2V(this$static){
  (com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.status) == 1?com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_109, com_broceliand_pearlbar_gwt_client_common_UserTrees_stringify__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(this$static.com_broceliand_pearlbar_gwt_client_common_UserTrees_data)):com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_109, null);
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2V(d){
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  this.com_broceliand_pearlbar_gwt_client_common_UserTrees_data = d;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(d, status, msg){
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  this.com_broceliand_pearlbar_gwt_client_common_UserTrees_data = !d?{}:d;
  com_broceliand_pearlbar_gwt_client_common_UserTrees_setStatus__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(this.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, status, msg);
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2(key){
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  try {
    if ($wnd.localStorage) {
      return $wnd.localStorage[key];
    }
  }
   catch (e) {
  }
  return null;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_getLocalStorageUserTrees__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2(){
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  var jobj, textStored, ut;
  textStored = com_broceliand_pearlbar_gwt_client_common_UserTrees_getInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2($intern_109);
  if (textStored != null && !java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_16, textStored)) {
    jobj = $wnd.JSON.parse(textStored);
    if (jobj.status == 1) {
      ut = new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(jobj, 1, $intern_110);
      return ut;
    }
  }
  ut = new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(null, 0, $intern_111);
  return ut;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_getPremiumStatus__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(data){
  if (data.currentUser && data.currentUser.premiumStatus) {
    return data.currentUser.premiumStatus;
  }
  return null;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_getSelectedTreeId__Lcom_google_gwt_core_client_JavaScriptObject_2D(data){
  if (data.currentUser && data.currentUser.selectedTreeID) {
    return data.currentUser.selectedTreeID;
  }
  return 0;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(data, i){
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  if (data != null && typeof data != $intern_20 && data.treeList != null && typeof data.treeList != $intern_20) {
    return data.treeList[i];
  }
  return null;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_getTreeVisibility__Lcom_google_gwt_core_client_JavaScriptObject_2I(tree){
  if (typeof tree.visibility != $intern_20) {
    return tree.visibility;
  }
   else {
    return 0;
  }
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_onTreesReceived__ILjava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2(statusCode, text){
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  var ut;
  if (statusCode == 200) {
    if (text.indexOf($intern_112) == 0 && text.lastIndexOf($intern_113) != -1 && text.lastIndexOf($intern_113) == text.length - $intern_113.length) {
      ut = new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V($wnd.JSON.parse(text), 1, $intern_110);
      if (ut.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.treeList.length < 2) {
        ut = new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(null, 3, $wnd.getMessage($intern_94));
        com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_109, null);
      }
    }
     else {
      ut = new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(null, 3, $wnd.getMessage($intern_94));
    }
  }
   else if (statusCode == 303 || statusCode == 12150 || statusCode == 12017 || statusCode == 0) {
    ut = new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(null, 2, com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(statusCode));
    com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_109, null);
  }
   else {
    ut = new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(null, 3, com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(statusCode));
    com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V($intern_109, null);
  }
  com_broceliand_pearlbar_gwt_client_common_UserTrees_lastRequestTreesReceived = new java_util_Date_Date__V;
  return ut;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_refreshTrees__ZV(force){
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  if (com_broceliand_pearlbar_gwt_client_common_UserTrees_requestTreesRunning)
    return;
  if (!force && !com_google_gwt_lang_LongLib_gte__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(com_google_gwt_lang_LongLib_sub__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2((new java_util_Date_Date__V).java_util_Date_jsdate.getTime()), com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(com_broceliand_pearlbar_gwt_client_common_UserTrees_lastRequestTreesReceived.java_util_Date_jsdate.getTime())), Pbb8_longLit)) {
    return;
  }
  com_broceliand_pearlbar_gwt_client_common_UserTrees_requestTrees__V();
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_requestTrees__V(){
  var $e0, builder, service, ut;
  com_broceliand_pearlbar_gwt_client_common_UserTrees_requestTreesRunning = true;
  service = (com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V() , $wnd.COLLECTOR_URL) + $intern_114 + com_google_gwt_http_client_URL_encodeQueryString__Ljava_lang_String_2Ljava_lang_String_2((com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , $wnd.pearlerVersion)) + $intern_44 + com_google_gwt_http_client_URL_encodeQueryString__Ljava_lang_String_2Ljava_lang_String_2($wnd.pearlerType);
  $wnd.pearlerType == $intern_115 && ($wnd.getHasGivenRights() || false?(service += $intern_45):(service += $intern_46));
  builder = new com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V((com_google_gwt_http_client_RequestBuilder_$clinit__V() , com_google_gwt_http_client_RequestBuilder_GET), service);
  try {
    com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(builder, $intern_16, new com_broceliand_pearlbar_gwt_client_common_UserTrees$1_UserTrees$1__V);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 2)) {
      com_broceliand_pearlbar_gwt_client_common_UserTrees_requestTreesRunning = false;
      ut = new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(null, 3, com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(0));
      $wnd.setUserTrees(ut.com_broceliand_pearlbar_gwt_client_common_UserTrees_data);
    }
     else 
      throw $e0;
  }
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_setInLocalStorage__Ljava_lang_String_2Ljava_lang_String_2V(key, value){
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  try {
    $wnd.localStorage && (value?($wnd.localStorage[key] = value):delete $wnd.localStorage[key]);
  }
   catch (e) {
  }
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_setStatus__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(data, status, msg){
  data.status = status;
  data.message = msg;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees_stringify__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(jsut){
  try {
    if ($wnd.localStorage) {
      return $wnd.JSON.stringify(jsut);
    }
  }
   catch (e) {
  }
  return null;
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees(){
}

_ = com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V.prototype = com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2V.prototype = com_broceliand_pearlbar_gwt_client_common_UserTrees.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_common_UserTrees_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1UserTrees_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_broceliand_pearlbar_gwt_client_common_UserTrees_data = null;
var com_broceliand_pearlbar_gwt_client_common_UserTrees_lastRequestTreesReceived, com_broceliand_pearlbar_gwt_client_common_UserTrees_requestTreesRunning = false;
function com_broceliand_pearlbar_gwt_client_common_UserTrees$1_UserTrees$1__V(){
}

function com_broceliand_pearlbar_gwt_client_common_UserTrees$1(){
}

_ = com_broceliand_pearlbar_gwt_client_common_UserTrees$1_UserTrees$1__V.prototype = com_broceliand_pearlbar_gwt_client_common_UserTrees$1.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_broceliand_pearlbar_gwt_client_common_UserTrees$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1UserTrees$1_12_1classLit;
}
;
_.onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V = function com_broceliand_pearlbar_gwt_client_common_UserTrees$1_onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V(request, exception){
  var ut;
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  com_broceliand_pearlbar_gwt_client_common_UserTrees_requestTreesRunning = false;
  ut = new com_broceliand_pearlbar_gwt_client_common_UserTrees_UserTrees__Lcom_google_gwt_core_client_JavaScriptObject_2ILjava_lang_String_2V(null, 3, com_broceliand_pearlbar_gwt_client_common_Alerts_getUserMessage__ILjava_lang_String_2(0));
  com_broceliand_pearlbar_gwt_client_common_UserTrees_lastRequestTreesReceived = new java_util_Date_Date__V;
  $wnd.setUserTrees(ut.com_broceliand_pearlbar_gwt_client_common_UserTrees_data);
}
;
_.onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V = function com_broceliand_pearlbar_gwt_client_common_UserTrees$1_onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(request, response){
  com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V();
  com_broceliand_pearlbar_gwt_client_common_UserTrees_requestTreesRunning = false;
  $wnd.setUserTrees(com_broceliand_pearlbar_gwt_client_common_UserTrees_onTreesReceived__ILjava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2(response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.status, response.com_google_gwt_http_client_Request$1_val$xmlHttpRequest.responseText).com_broceliand_pearlbar_gwt_client_common_UserTrees_data);
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V(){
  var com_broceliand_pearlbar_gwt_client_common_WebContent_isOnWindows__Z_platform_0;
  com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V = nullMethod;
  java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_116, (com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , $wnd.pearlerType));
  com_broceliand_pearlbar_gwt_client_common_WebContent_isOnSafari = java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_117, $wnd.pearlerType);
  java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_118, $wnd.pearlerType);
  java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z($intern_115, $wnd.pearlerType);
  com_broceliand_pearlbar_gwt_client_common_WebContent_isOnWindows = (com_broceliand_pearlbar_gwt_client_common_WebContent_isOnWindows__Z_platform_0 = $wnd.navigator.platform , com_broceliand_pearlbar_gwt_client_common_WebContent_isOnWindows__Z_platform_0 != null && com_broceliand_pearlbar_gwt_client_common_WebContent_isOnWindows__Z_platform_0.toLowerCase().indexOf($intern_119) != -1);
}

function com_broceliand_pearlbar_gwt_client_common_WebContent_findTreeInList__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2DI(userTrees, tree){
  var i;
  for (i = (com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data.treeList.length); i-- > 0;) {
    if (com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, i).treeID == tree) {
      return i;
    }
  }
  return -1;
}

function com_broceliand_pearlbar_gwt_client_common_WebContent_getCurrentAsso__Ljava_lang_String_2D(ptUrl){
  var $e0, anchor, param;
  anchor = ptUrl.indexOf(java_lang_String_fromCodePoint__ILjava_lang_String_2(35));
  try {
    param = com_broceliand_pearlbar_gwt_client_common_WebContent_parseAnchorParam__Ljava_lang_String_2ILjava_lang_String_2Ljava_lang_String_2(ptUrl, anchor, $intern_120);
    if (param != null) {
      return (new java_lang_Double_Double__DV(java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(param))).java_lang_Double_value;
    }
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 4))
      throw $e0;
  }
  return 0;
}

function com_broceliand_pearlbar_gwt_client_common_WebContent_getCurrentLocation__Ljava_lang_String_2Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2_3D(ptUrl, userTrees){
  com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V();
  var $e0, a, anchor, c, i, j, t;
  if (ptUrl == null) {
    return null;
  }
  anchor = ptUrl.indexOf(java_lang_String_fromCodePoint__ILjava_lang_String_2(35));
  if (anchor >= 0) {
    t = com_broceliand_pearlbar_gwt_client_common_WebContent_getCurrentTree__Ljava_lang_String_2D(ptUrl);
    a = com_broceliand_pearlbar_gwt_client_common_WebContent_getCurrentAsso__Ljava_lang_String_2D(ptUrl);
    if (t != 0 && a != 0) {
      return com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13D_1classLit, {23:1}, -1, [t, a]);
    }
    ptUrl = ptUrl.substr(0, anchor - 0);
  }
  if (!userTrees) {
    return null;
  }
  if (ptUrl.indexOf($wnd.PEARLTREES_URL) != 0 && ptUrl.indexOf($wnd.PEARLTREES_URL_HTTP) != 0) {
    return null;
  }
  ptUrl = ptUrl.indexOf($wnd.PEARLTREES_URL) == 0?java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(ptUrl, $wnd.PEARLTREES_URL.length):java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(ptUrl, $wnd.PEARLTREES_URL_HTTP.length);
  if (java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(ptUrl, com_broceliand_pearlbar_gwt_client_common_WebContent_sanitizeTitleForUrl__Ljava_lang_String_2Ljava_lang_String_2(com_broceliand_pearlbar_gwt_client_common_UserTrees_$getTreeTitle__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2ILjava_lang_String_2(userTrees, 1)))) {
    return com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13D_1classLit, {23:1}, -1, [(com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, 1).treeID), com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, 1).assoId]);
  }
  for (i = 0; (i = ptUrl.indexOf($intern_121, i)) >= 0;) {
    i += 3;
    for (j = i; j < ptUrl.length; ++j) {
      c = ptUrl.charCodeAt(j);
      if (c < 48 || c > 57) {
        break;
      }
    }
    if (i >= j) {
      continue;
    }
    try {
      t = java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(ptUrl.substr(i, j - i));
    }
     catch ($e0) {
      $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
      if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 4)) {
        continue;
      }
       else 
        throw $e0;
    }
    j = com_broceliand_pearlbar_gwt_client_common_WebContent_findTreeInList__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2DI(userTrees, t);
    if (j >= 0) {
      return com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13D_1classLit, {23:1}, -1, [(com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, j).treeID), com_broceliand_pearlbar_gwt_client_common_UserTrees_getTree__Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_core_client_JavaScriptObject_2(userTrees.com_broceliand_pearlbar_gwt_client_common_UserTrees_data, j).assoId]);
    }
  }
  return null;
}

function com_broceliand_pearlbar_gwt_client_common_WebContent_getCurrentTree__Ljava_lang_String_2D(ptUrl){
  var $e0, anchor, param;
  anchor = ptUrl.indexOf(java_lang_String_fromCodePoint__ILjava_lang_String_2(35));
  try {
    param = com_broceliand_pearlbar_gwt_client_common_WebContent_parseAnchorParam__Ljava_lang_String_2ILjava_lang_String_2Ljava_lang_String_2(ptUrl, anchor, $intern_122);
    if (param != null) {
      return (new java_lang_Double_Double__DV(java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(param))).java_lang_Double_value;
    }
    param = com_broceliand_pearlbar_gwt_client_common_WebContent_parseAnchorParam__Ljava_lang_String_2ILjava_lang_String_2Ljava_lang_String_2(ptUrl, anchor, $intern_123);
    if (param != null) {
      return (new java_lang_Double_Double__DV(java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(param))).java_lang_Double_value;
    }
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 4))
      throw $e0;
  }
  return 0;
}

function com_broceliand_pearlbar_gwt_client_common_WebContent_getUnanchoredUrl__Ljava_lang_String_2Ljava_lang_String_2(url){
  com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V();
  var anchor;
  anchor = url.indexOf(java_lang_String_fromCodePoint__ILjava_lang_String_2(35));
  return anchor < 0?url:url.substr(0, anchor - 0);
}

function com_broceliand_pearlbar_gwt_client_common_WebContent_isInPearltrees__Ljava_lang_String_2Z(url){
  com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V();
  return url != null && (url.indexOf($wnd.PEARLTREES_URL) == 0 || url.indexOf($wnd.PEARLTREES_URL_HTTP) == 0 || url.indexOf($wnd.PEARLTREES_URL_BASE) != -1 || url.indexOf($wnd.PEAR_LY_URL) == 0) && url.indexOf($intern_14) < 0;
}

function com_broceliand_pearlbar_gwt_client_common_WebContent_isUrlNotMutableInPearltrees__Ljava_lang_String_2Z(url){
  com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V();
  return url != null && (url.indexOf($wnd.PEARLTREES_URL) == 0 || url.indexOf($wnd.PEARLTREES_URL_HTTP) == 0 || url.indexOf($wnd.PEARLTREES_URL_BASE) != -1 || url.indexOf($wnd.PEAR_LY_URL) == 0) && (url.indexOf($intern_124) > 0 || url.indexOf($intern_125) > 0);
}

function com_broceliand_pearlbar_gwt_client_common_WebContent_isWebUrl__Ljava_lang_String_2Z(url){
  com_broceliand_pearlbar_gwt_client_common_WebContent_$clinit__V();
  if (url == null) {
    return false;
  }
  if ((url.indexOf($intern_126) == 0 || url.indexOf($intern_127) == 0) && url.indexOf($intern_128) != -1) {
    return false;
  }
  return url.indexOf($intern_55) == 0 || url.indexOf($intern_54) == 0;
}

function com_broceliand_pearlbar_gwt_client_common_WebContent_parseAnchorParam__Ljava_lang_String_2ILjava_lang_String_2Ljava_lang_String_2(ptUrl, anchor, start){
  var c, i, pos;
  if (anchor < 0) {
    return null;
  }
  i = ptUrl.indexOf(start, anchor);
  if (i < 0) {
    return null;
  }
  i += start.length;
  pos = i;
  for (; i < ptUrl.length; ++i) {
    c = ptUrl.charCodeAt(i);
    if (c < 48 || c > 57) {
      break;
    }
  }
  return pos == i?null:ptUrl.substr(pos, i - pos);
}

function com_broceliand_pearlbar_gwt_client_common_WebContent_sanitizeTitleForUrl__Ljava_lang_String_2Ljava_lang_String_2(title){
  if (title == null) {
    return null;
  }
  return title.toLowerCase();
}

var com_broceliand_pearlbar_gwt_client_common_WebContent_isOnIpad = false, com_broceliand_pearlbar_gwt_client_common_WebContent_isOnSafari, com_broceliand_pearlbar_gwt_client_common_WebContent_isOnWindows;
function java_lang_Throwable_$initCause__Ljava_lang_Throwable_2Ljava_lang_Throwable_2Ljava_lang_Throwable_2(this$static, cause){
  if (this$static.java_lang_Throwable_cause) {
    throw new java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V;
  }
  if (cause == this$static) {
    throw new java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V($intern_129);
  }
  this$static.java_lang_Throwable_cause = cause;
  return this$static;
}

function java_lang_Throwable_$setStackTrace__Ljava_lang_Throwable_2_3Ljava_lang_StackTraceElement_2V(stackTrace){
  var c, copy, i;
  copy = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1StackTraceElement_12_1classLit, {23:1}, 28, stackTrace.length, 0);
  for (i = 0 , c = stackTrace.length; i < c; ++i) {
    if (!stackTrace[i]) {
      throw new java_lang_NullPointerException_NullPointerException__V;
    }
    copy[i] = stackTrace[i];
  }
}

function java_lang_Throwable(){
}

_ = java_lang_Throwable.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function java_lang_Throwable_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Throwable_12_1classLit;
}
;
_.getMessage__Ljava_lang_String_2 = function java_lang_Throwable_getMessage__Ljava_lang_String_2(){
  return this.java_lang_Throwable_detailMessage;
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Throwable_toString__Ljava_lang_String_2(){
  var className, msg;
  className = this.getClass__Ljava_lang_Class_2$().java_lang_Class_typeName;
  msg = this.getMessage__Ljava_lang_String_2();
  return msg != null?className + $intern_130 + msg:className;
}
;
_.java_lang_Object_castableTypeMap$ = {7:1, 23:1};
_.java_lang_Throwable_cause = null;
_.java_lang_Throwable_detailMessage = null;
function java_lang_Exception(){
}

_ = java_lang_Exception.prototype = new java_lang_Throwable;
_.getClass__Ljava_lang_Class_2$ = function java_lang_Exception_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Exception_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 7:1, 23:1};
function java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V(message){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = message;
}

function java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2Ljava_lang_Throwable_2V(cause){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_cause = cause;
  this.java_lang_Throwable_detailMessage = $intern_131;
}

function java_lang_RuntimeException(){
}

_ = java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V.prototype = java_lang_RuntimeException.prototype = new java_lang_Exception;
_.getClass__Ljava_lang_Class_2$ = function java_lang_RuntimeException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1RuntimeException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function com_google_gwt_core_client_JavaScriptException_JavaScriptException__Ljava_lang_Object_2V(e){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.com_google_gwt_core_client_JavaScriptException_e = e;
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$createStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Lcom_google_gwt_core_client_JavaScriptException_2V(new com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_StackTraceCreator$CollectorChrome__V, this);
}

function com_google_gwt_core_client_JavaScriptException_getDescription__Ljava_lang_Object_2Ljava_lang_String_2(e){
  return com_google_gwt_lang_Cast_instanceOfJso__Ljava_lang_Object_2Z(e)?com_google_gwt_core_client_JavaScriptException_getDescription0__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(com_google_gwt_lang_Cast_dynamicCastJso__Ljava_lang_Object_2Ljava_lang_Object_2(e)):e + $intern_16;
}

function com_google_gwt_core_client_JavaScriptException_getDescription0__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(e){
  return e == null?null:e.message;
}

function com_google_gwt_core_client_JavaScriptException_getName__Ljava_lang_Object_2Ljava_lang_String_2(e){
  return e == null?$intern_132:com_google_gwt_lang_Cast_instanceOfJso__Ljava_lang_Object_2Z(e)?com_google_gwt_core_client_JavaScriptException_getName0__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(com_google_gwt_lang_Cast_dynamicCastJso__Ljava_lang_Object_2Ljava_lang_Object_2(e)):e != null && e.java_lang_Object_castableTypeMap$ && !!e.java_lang_Object_castableTypeMap$[1]?$intern_133:(e.java_lang_Object_typeMarker$ == nullMethod || e.java_lang_Object_castableTypeMap$ && !!e.java_lang_Object_castableTypeMap$[1]?e.getClass__Ljava_lang_Class_2$():com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1JavaScriptObject_12_1classLit).java_lang_Class_typeName;
}

function com_google_gwt_core_client_JavaScriptException_getName0__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(e){
  return e == null?null:e.name;
}

function com_google_gwt_core_client_JavaScriptException_getProperties__Ljava_lang_Object_2Ljava_lang_String_2(e){
  return com_google_gwt_lang_Cast_instanceOfJso__Ljava_lang_Object_2Z(e)?com_google_gwt_core_client_JavaScriptException_getProperties0__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(com_google_gwt_lang_Cast_dynamicCastJso__Ljava_lang_Object_2Ljava_lang_Object_2(e)):$intern_16;
}

function com_google_gwt_core_client_JavaScriptException_getProperties0__Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_String_2(e){
  var result = $intern_16;
  try {
    for (var prop in e) {
      if (prop != $intern_134 && prop != $intern_135 && prop != $intern_136) {
        try {
          result += $intern_137 + prop + $intern_130 + e[prop];
        }
         catch (ignored) {
        }
      }
    }
  }
   catch (ignored) {
  }
  return result;
}

function com_google_gwt_core_client_JavaScriptException(){
}

_ = com_google_gwt_core_client_JavaScriptException_JavaScriptException__Ljava_lang_Object_2V.prototype = com_google_gwt_core_client_JavaScriptException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_core_client_JavaScriptException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1JavaScriptException_12_1classLit;
}
;
_.getMessage__Ljava_lang_String_2 = function com_google_gwt_core_client_JavaScriptException_getMessage__Ljava_lang_String_2(){
  return this.com_google_gwt_core_client_JavaScriptException_message == null && (this.com_google_gwt_core_client_JavaScriptException_name = com_google_gwt_core_client_JavaScriptException_getName__Ljava_lang_Object_2Ljava_lang_String_2(this.com_google_gwt_core_client_JavaScriptException_e) , this.com_google_gwt_core_client_JavaScriptException_description = com_google_gwt_core_client_JavaScriptException_getDescription__Ljava_lang_Object_2Ljava_lang_String_2(this.com_google_gwt_core_client_JavaScriptException_e) , this.com_google_gwt_core_client_JavaScriptException_message = $intern_138 + this.com_google_gwt_core_client_JavaScriptException_name + $intern_139 + this.com_google_gwt_core_client_JavaScriptException_description + com_google_gwt_core_client_JavaScriptException_getProperties__Ljava_lang_Object_2Ljava_lang_String_2(this.com_google_gwt_core_client_JavaScriptException_e) , undefined) , this.com_google_gwt_core_client_JavaScriptException_message;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 12:1, 23:1};
_.com_google_gwt_core_client_JavaScriptException_description = null;
_.com_google_gwt_core_client_JavaScriptException_e = null;
_.com_google_gwt_core_client_JavaScriptException_message = null;
_.com_google_gwt_core_client_JavaScriptException_name = null;
function com_google_gwt_core_client_JavaScriptObject_equals_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(this$static, other){
  return this$static.java_lang_Object_typeMarker$ == nullMethod || this$static.java_lang_Object_castableTypeMap$ && !!this$static.java_lang_Object_castableTypeMap$[1]?this$static.equals__Ljava_lang_Object_2Z$(other):this$static === other;
}

function com_google_gwt_core_client_JavaScriptObject_hashCode_1_1devirtual$__Ljava_lang_Object_2I(this$static){
  return this$static.java_lang_Object_typeMarker$ == nullMethod || this$static.java_lang_Object_castableTypeMap$ && !!this$static.java_lang_Object_castableTypeMap$[1]?this$static.hashCode__I$():this$static.$H || (this$static.$H = ++com_google_gwt_core_client_impl_Impl_sNextHashId);
}

function com_google_gwt_core_client_Scheduler(){
}

_ = com_google_gwt_core_client_Scheduler.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_core_client_Scheduler_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1Scheduler_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_core_client_impl_Impl_enter__Z(){
  if (com_google_gwt_core_client_impl_Impl_entryDepth++ == 0) {
    com_google_gwt_core_client_impl_SchedulerImpl_$flushEntryCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V((com_google_gwt_core_client_impl_SchedulerImpl_$clinit__V() , com_google_gwt_core_client_impl_SchedulerImpl_INSTANCE));
    return true;
  }
  return false;
}

function com_google_gwt_core_client_impl_Impl_entry__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2(jsFunction){
  return function(){
    try {
      return com_google_gwt_core_client_impl_Impl_entry0__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(jsFunction, this, arguments);
    }
     catch (e) {
      throw e;
    }
  }
  ;
}

function com_google_gwt_core_client_impl_Impl_entry0__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(jsFunction, thisObj, arguments){
  var initialEntry;
  initialEntry = com_google_gwt_core_client_impl_Impl_enter__Z();
  try {
    return jsFunction.apply(thisObj, arguments);
  }
   finally {
    initialEntry && com_google_gwt_core_client_impl_SchedulerImpl_$flushFinallyCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V((com_google_gwt_core_client_impl_SchedulerImpl_$clinit__V() , com_google_gwt_core_client_impl_SchedulerImpl_INSTANCE));
    --com_google_gwt_core_client_impl_Impl_entryDepth;
  }
}

var com_google_gwt_core_client_impl_Impl_entryDepth = 0, com_google_gwt_core_client_impl_Impl_sNextHashId = 0;
function com_google_gwt_core_client_impl_SchedulerImpl_$clinit__V(){
  com_google_gwt_core_client_impl_SchedulerImpl_$clinit__V = nullMethod;
  com_google_gwt_core_client_impl_SchedulerImpl_INSTANCE = new com_google_gwt_core_client_impl_SchedulerImpl_SchedulerImpl__V;
}

function com_google_gwt_core_client_impl_SchedulerImpl_$flushEntryCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$static){
  var oldQueue, rescheduled;
  if (this$static.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands;
      this$static.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands = null;
      rescheduled = com_google_gwt_core_client_impl_SchedulerImpl_runScheduledTasks__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2(oldQueue, rescheduled);
    }
     while (this$static.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands);
    this$static.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands = rescheduled;
  }
}

function com_google_gwt_core_client_impl_SchedulerImpl_$flushFinallyCommands__Lcom_google_gwt_core_client_impl_SchedulerImpl_2V(this$static){
  var oldQueue, rescheduled;
  if (this$static.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands) {
    rescheduled = null;
    do {
      oldQueue = this$static.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands;
      this$static.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands = null;
      rescheduled = com_google_gwt_core_client_impl_SchedulerImpl_runScheduledTasks__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2(oldQueue, rescheduled);
    }
     while (this$static.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands);
    this$static.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands = rescheduled;
  }
}

function com_google_gwt_core_client_impl_SchedulerImpl_SchedulerImpl__V(){
}

function com_google_gwt_core_client_impl_SchedulerImpl_push__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_impl_SchedulerImpl$Task_2Lcom_google_gwt_core_client_JsArray_2(queue, task){
  !queue && (queue = []);
  queue[queue.length] = task;
  return queue;
}

function com_google_gwt_core_client_impl_SchedulerImpl_runScheduledTasks__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_JsArray_2(tasks, rescheduled){
  var $e0, i, j, t;
  for (i = 0 , j = tasks.length; i < j; ++i) {
    t = tasks[i];
    try {
      t[1]?t[0].nullMethod() && (rescheduled = com_google_gwt_core_client_impl_SchedulerImpl_push__Lcom_google_gwt_core_client_JsArray_2Lcom_google_gwt_core_client_impl_SchedulerImpl$Task_2Lcom_google_gwt_core_client_JsArray_2(rescheduled, t)):(com_google_gwt_event_shared_SimpleEventBus_$doAddNow__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Lcom_google_gwt_event_shared_EventHandler_2V(t[0].com_google_gwt_event_shared_SimpleEventBus$2_this$0, t[0].com_google_gwt_event_shared_SimpleEventBus$2_val$type, t[0].com_google_gwt_event_shared_SimpleEventBus$2_val$source, t[0].com_google_gwt_event_shared_SimpleEventBus$2_val$handler) , undefined);
    }
     catch ($e0) {
      $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
      if (!com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 5))
        throw $e0;
    }
  }
  return rescheduled;
}

function com_google_gwt_core_client_impl_SchedulerImpl(){
}

_ = com_google_gwt_core_client_impl_SchedulerImpl_SchedulerImpl__V.prototype = com_google_gwt_core_client_impl_SchedulerImpl.prototype = new com_google_gwt_core_client_Scheduler;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_core_client_impl_SchedulerImpl_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1SchedulerImpl_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_core_client_impl_SchedulerImpl_entryCommands = null;
_.com_google_gwt_core_client_impl_SchedulerImpl_finallyCommands = null;
var com_google_gwt_core_client_impl_SchedulerImpl_INSTANCE;
function com_google_gwt_core_client_impl_StackTraceCreator_extractNameFromToString__Ljava_lang_String_2Ljava_lang_String_2(fnToString){
  var index, start, toReturn;
  toReturn = $intern_16;
  fnToString = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(fnToString);
  index = fnToString.indexOf($intern_138);
  if (index != -1) {
    start = fnToString.indexOf($intern_140) == 0?8:0;
    toReturn = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(fnToString.substr(start, index - start));
  }
  return toReturn.length > 0?toReturn:$intern_141;
}

function com_google_gwt_core_client_impl_StackTraceCreator_splice__Lcom_google_gwt_core_client_JsArrayString_2ILcom_google_gwt_core_client_JsArrayString_2(arr, length){
  arr.length >= length && arr.splice(0, length);
  return arr;
}

function com_google_gwt_core_client_impl_StackTraceCreator$Collector_$createStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Lcom_google_gwt_core_client_JavaScriptException_2V(this$static, e){
  var i, j, stack, stackTrace;
  stack = com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_$inferFrom__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(this$static, com_google_gwt_lang_Cast_instanceOfJso__Ljava_lang_Object_2Z(e.com_google_gwt_core_client_JavaScriptException_e)?com_google_gwt_lang_Cast_dynamicCastJso__Ljava_lang_Object_2Ljava_lang_Object_2(e.com_google_gwt_core_client_JavaScriptException_e):null);
  stackTrace = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1StackTraceElement_12_1classLit, {23:1}, 28, stack.length, 0);
  for (i = 0 , j = stackTrace.length; i < j; ++i) {
    stackTrace[i] = new java_lang_StackTraceElement_StackTraceElement__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2IV(stack[i]);
  }
  java_lang_Throwable_$setStackTrace__Ljava_lang_Throwable_2_3Ljava_lang_StackTraceElement_2V(stackTrace);
}

function com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V(){
  var i, j, stack, stackTrace;
  stack = com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_$collect__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2Lcom_google_gwt_core_client_JsArrayString_2(new com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_StackTraceCreator$CollectorChrome__V);
  stackTrace = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1StackTraceElement_12_1classLit, {23:1}, 28, stack.length, 0);
  for (i = 0 , j = stackTrace.length; i < j; ++i) {
    stackTrace[i] = new java_lang_StackTraceElement_StackTraceElement__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2IV(stack[i]);
  }
  java_lang_Throwable_$setStackTrace__Ljava_lang_Throwable_2_3Ljava_lang_StackTraceElement_2V(stackTrace);
}

function com_google_gwt_core_client_impl_StackTraceCreator$Collector_$makeException__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Lcom_google_gwt_core_client_JavaScriptObject_2(){
  try {
    null.a();
  }
   catch (e) {
    return e;
  }
}

function com_google_gwt_core_client_impl_StackTraceCreator$Collector_StackTraceCreator$Collector__V(){
}

function com_google_gwt_core_client_impl_StackTraceCreator$Collector(){
}

_ = com_google_gwt_core_client_impl_StackTraceCreator$Collector_StackTraceCreator$Collector__V.prototype = com_google_gwt_core_client_impl_StackTraceCreator$Collector.prototype = new java_lang_Object;
_.collect__Lcom_google_gwt_core_client_JsArrayString_2 = function com_google_gwt_core_client_impl_StackTraceCreator$Collector_collect__Lcom_google_gwt_core_client_JsArrayString_2(){
  var seen = {};
  var toReturn = [];
  var callee = arguments.callee.caller.caller;
  while (callee) {
    var name = this.extractName__Ljava_lang_String_2Ljava_lang_String_2(callee.toString());
    toReturn.push(name);
    var keyName = $intern_142 + name;
    var withThisName = seen[keyName];
    if (withThisName) {
      var i, j;
      for (i = 0 , j = withThisName.length; i < j; i++) {
        if (withThisName[i] === callee) {
          return toReturn;
        }
      }
    }
    (withThisName || (seen[keyName] = [])).push(callee);
    callee = callee.caller;
  }
  return toReturn;
}
;
_.extractName__Ljava_lang_String_2Ljava_lang_String_2 = function com_google_gwt_core_client_impl_StackTraceCreator$Collector_extractName__Ljava_lang_String_2Ljava_lang_String_2(fnToString){
  return com_google_gwt_core_client_impl_StackTraceCreator_extractNameFromToString__Ljava_lang_String_2Ljava_lang_String_2(fnToString);
}
;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_core_client_impl_StackTraceCreator$Collector_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StackTraceCreator$Collector_12_1classLit;
}
;
_.inferFrom__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2 = function com_google_gwt_core_client_impl_StackTraceCreator$Collector_inferFrom__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(e){
  return [];
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_$inferFrom__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(this$static, e){
  var i, j, stack;
  stack = e && e.stack?e.stack.split($intern_143):[];
  for (i = 0 , j = stack.length; i < j; ++i) {
    stack[i] = this$static.extractName__Ljava_lang_String_2Ljava_lang_String_2(stack[i]);
  }
  return stack;
}

function com_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz(){
}

_ = com_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz.prototype = new com_google_gwt_core_client_impl_StackTraceCreator$Collector;
_.collect__Lcom_google_gwt_core_client_JsArrayString_2 = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_collect__Lcom_google_gwt_core_client_JsArrayString_2(){
  return com_google_gwt_core_client_impl_StackTraceCreator_splice__Lcom_google_gwt_core_client_JsArrayString_2ILcom_google_gwt_core_client_JsArrayString_2(this.inferFrom__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(com_google_gwt_core_client_impl_StackTraceCreator$Collector_$makeException__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Lcom_google_gwt_core_client_JavaScriptObject_2()), this.toSplice__I());
}
;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StackTraceCreator$CollectorMoz_12_1classLit;
}
;
_.inferFrom__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2 = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_inferFrom__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(e){
  return com_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_$inferFrom__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(this, e);
}
;
_.toSplice__I = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_toSplice__I(){
  return 2;
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_$collect__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2Lcom_google_gwt_core_client_JsArrayString_2(this$static){
  var res;
  res = com_google_gwt_core_client_impl_StackTraceCreator_splice__Lcom_google_gwt_core_client_JsArrayString_2ILcom_google_gwt_core_client_JsArrayString_2(com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_$inferFrom__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(this$static, com_google_gwt_core_client_impl_StackTraceCreator$Collector_$makeException__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Lcom_google_gwt_core_client_JavaScriptObject_2()), 3);
  res.length == 0 && (res = com_google_gwt_core_client_impl_StackTraceCreator_splice__Lcom_google_gwt_core_client_JsArrayString_2ILcom_google_gwt_core_client_JsArrayString_2((new com_google_gwt_core_client_impl_StackTraceCreator$Collector_StackTraceCreator$Collector__V).collect__Lcom_google_gwt_core_client_JsArrayString_2(), 1));
  return res;
}

function com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_$inferFrom__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(this$static, e){
  var stack;
  stack = com_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_$inferFrom__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(this$static, e);
  return stack.length == 0?(new com_google_gwt_core_client_impl_StackTraceCreator$Collector_StackTraceCreator$Collector__V).inferFrom__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(e):(stack.length >= 1 && stack.splice(0, 1) , stack);
}

function com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_StackTraceCreator$CollectorChrome__V(){
}

function com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome(){
}

_ = com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_StackTraceCreator$CollectorChrome__V.prototype = com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome.prototype = new com_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz;
_.collect__Lcom_google_gwt_core_client_JsArrayString_2 = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_collect__Lcom_google_gwt_core_client_JsArrayString_2(){
  return com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_$collect__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2Lcom_google_gwt_core_client_JsArrayString_2(this);
}
;
_.extractName__Ljava_lang_String_2Ljava_lang_String_2 = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_extractName__Ljava_lang_String_2Ljava_lang_String_2(fnToString){
  var index, toReturn;
  if (fnToString.length == 0) {
    return $intern_141;
  }
  toReturn = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(fnToString);
  toReturn.indexOf($intern_144) == 0 && (toReturn = toReturn.substr(3, toReturn.length - 3));
  index = toReturn.indexOf($intern_145);
  index == -1 && (index = toReturn.indexOf($intern_138));
  if (index == -1) {
    return $intern_141;
  }
   else {
    toReturn = java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(toReturn.substr(0, index - 0));
  }
  index = toReturn.indexOf(java_lang_String_fromCodePoint__ILjava_lang_String_2(46));
  index != -1 && (toReturn = toReturn.substr(index + 1, toReturn.length - (index + 1)));
  return toReturn.length > 0?toReturn:$intern_141;
}
;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StackTraceCreator$CollectorChrome_12_1classLit;
}
;
_.inferFrom__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2 = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_inferFrom__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(e){
  return com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_$inferFrom__Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JsArrayString_2(this, e);
}
;
_.toSplice__I = function com_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_toSplice__I(){
  return 3;
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_core_client_impl_StringBufferImpl(){
}

_ = com_google_gwt_core_client_impl_StringBufferImpl.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_core_client_impl_StringBufferImpl_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StringBufferImpl_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_core_client_impl_StringBufferImplAppend_$replace__Lcom_google_gwt_core_client_impl_StringBufferImplAppend_2Ljava_lang_Object_2IILjava_lang_String_2V(this$static, end){
  this$static.com_google_gwt_core_client_impl_StringBufferImplAppend_string = this$static.com_google_gwt_core_client_impl_StringBufferImplAppend_string.substr(0, 0 - 0) + $intern_16 + java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(this$static.com_google_gwt_core_client_impl_StringBufferImplAppend_string, end);
}

function com_google_gwt_core_client_impl_StringBufferImplAppend_StringBufferImplAppend__V(){
}

function com_google_gwt_core_client_impl_StringBufferImplAppend(){
}

_ = com_google_gwt_core_client_impl_StringBufferImplAppend_StringBufferImplAppend__V.prototype = com_google_gwt_core_client_impl_StringBufferImplAppend.prototype = new com_google_gwt_core_client_impl_StringBufferImpl;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_core_client_impl_StringBufferImplAppend_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StringBufferImplAppend_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_core_client_impl_StringBufferImplAppend_string = $intern_16;
function com_google_gwt_event_shared_GwtEvent(){
}

_ = com_google_gwt_event_shared_GwtEvent.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_event_shared_GwtEvent_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1GwtEvent_12_1classLit;
}
;
_.toString__Ljava_lang_String_2$ = function com_google_gwt_event_shared_GwtEvent_toString__Ljava_lang_String_2(){
  return $intern_146;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_event_shared_GwtEvent_dead = false;
_.com_google_gwt_event_shared_GwtEvent_source = null;
function com_google_gwt_event_logical_shared_CloseEvent_CloseEvent__Ljava_lang_Object_2ZV(){
}

function com_google_gwt_event_logical_shared_CloseEvent_fire__Lcom_google_gwt_event_logical_shared_HasCloseHandlers_2Ljava_lang_Object_2ZV(source){
  var event;
  if (com_google_gwt_event_logical_shared_CloseEvent_TYPE) {
    event = new com_google_gwt_event_logical_shared_CloseEvent_CloseEvent__Ljava_lang_Object_2ZV;
    com_google_gwt_event_shared_HandlerManager_$fireEvent__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent_2V(source, event);
  }
}

function com_google_gwt_event_logical_shared_CloseEvent(){
}

_ = com_google_gwt_event_logical_shared_CloseEvent_CloseEvent__Ljava_lang_Object_2ZV.prototype = com_google_gwt_event_logical_shared_CloseEvent.prototype = new com_google_gwt_event_shared_GwtEvent;
_.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V = function com_google_gwt_event_logical_shared_CloseEvent_dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler){
  com_google_gwt_user_client_Timer$1_$onClose__Lcom_google_gwt_user_client_Timer$1_2Lcom_google_gwt_event_logical_shared_CloseEvent_2V();
}
;
_.getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2 = function com_google_gwt_event_logical_shared_CloseEvent_getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2(){
  return com_google_gwt_event_logical_shared_CloseEvent_TYPE;
}
;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_event_logical_shared_CloseEvent_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1logical_1shared_1CloseEvent_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
var com_google_gwt_event_logical_shared_CloseEvent_TYPE = null;
function com_google_gwt_event_shared_EventBus(){
}

_ = com_google_gwt_event_shared_EventBus.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_event_shared_EventBus_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1EventBus_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V(){
  this.com_google_gwt_event_shared_GwtEvent$Type_index = ++com_google_gwt_event_shared_GwtEvent$Type_nextHashCode;
}

function com_google_gwt_event_shared_GwtEvent$Type(){
}

_ = com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V.prototype = com_google_gwt_event_shared_GwtEvent$Type.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_event_shared_GwtEvent$Type_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1GwtEvent$Type_12_1classLit;
}
;
_.hashCode__I$ = function com_google_gwt_event_shared_GwtEvent$Type_hashCode__I(){
  return this.com_google_gwt_event_shared_GwtEvent$Type_index;
}
;
_.toString__Ljava_lang_String_2$ = function com_google_gwt_event_shared_GwtEvent$Type_toString__Ljava_lang_String_2(){
  return $intern_147;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_event_shared_GwtEvent$Type_index = 0;
var com_google_gwt_event_shared_GwtEvent$Type_nextHashCode = 0;
function com_google_gwt_event_shared_HandlerManager_$fireEvent__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent_2V(this$static, event){
  var oldSource;
  !event.com_google_gwt_event_shared_GwtEvent_dead || (event.com_google_gwt_event_shared_GwtEvent_dead = false , event.com_google_gwt_event_shared_GwtEvent_source = null);
  oldSource = event.com_google_gwt_event_shared_GwtEvent_source;
  event.com_google_gwt_event_shared_GwtEvent_source = this$static.com_google_gwt_event_shared_HandlerManager_source;
  try {
    com_google_gwt_event_shared_SimpleEventBus_$fireEvent__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent_2V(this$static.com_google_gwt_event_shared_HandlerManager_eventBus, event);
  }
   finally {
    oldSource == null?(event.com_google_gwt_event_shared_GwtEvent_dead = true , event.com_google_gwt_event_shared_GwtEvent_source = null):(event.com_google_gwt_event_shared_GwtEvent_source = oldSource);
  }
}

function com_google_gwt_event_shared_HandlerManager(){
}

_ = com_google_gwt_event_shared_HandlerManager.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_event_shared_HandlerManager_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1HandlerManager_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_event_shared_HandlerManager_eventBus = null;
_.com_google_gwt_event_shared_HandlerManager_source = null;
function com_google_gwt_event_shared_SimpleEventBus_$addHandler__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(this$static, type, handler){
  var com_google_gwt_event_shared_SimpleEventBus_$doAddNow__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Lcom_google_gwt_event_shared_EventHandler_2V_l_0;
  if (!type) {
    throw new java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V($intern_148);
  }
  if (!handler) {
    throw new java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V($intern_149);
  }
  return this$static.com_google_gwt_event_shared_SimpleEventBus_firingDepth > 0?com_google_gwt_event_shared_SimpleEventBus_$defer__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_core_client_Scheduler$ScheduledCommand_2V(this$static, new com_google_gwt_event_shared_SimpleEventBus$2_SimpleEventBus$2__Lcom_google_gwt_event_shared_SimpleEventBus_2V(this$static, type, handler)):(com_google_gwt_event_shared_SimpleEventBus_$doAddNow__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Lcom_google_gwt_event_shared_EventHandler_2V_l_0 = com_google_gwt_event_shared_SimpleEventBus_$ensureHandlerList__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, type, null) , com_google_gwt_event_shared_SimpleEventBus_$doAddNow__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Lcom_google_gwt_event_shared_EventHandler_2V_l_0.add__Ljava_lang_Object_2Z(handler) , undefined) , new com_google_gwt_event_shared_SimpleEventBus$1_SimpleEventBus$1__Lcom_google_gwt_event_shared_SimpleEventBus_2V;
}

function com_google_gwt_event_shared_SimpleEventBus_$defer__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_core_client_Scheduler$ScheduledCommand_2V(this$static, command){
  !this$static.com_google_gwt_event_shared_SimpleEventBus_deferredDeltas && (this$static.com_google_gwt_event_shared_SimpleEventBus_deferredDeltas = new java_util_ArrayList_ArrayList__V);
  java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static.com_google_gwt_event_shared_SimpleEventBus_deferredDeltas, command);
}

function com_google_gwt_event_shared_SimpleEventBus_$doAddNow__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Lcom_google_gwt_event_shared_EventHandler_2V(this$static, type, source, handler){
  var l;
  l = com_google_gwt_event_shared_SimpleEventBus_$ensureHandlerList__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, type, source);
  l.add__Ljava_lang_Object_2Z(handler);
}

function com_google_gwt_event_shared_SimpleEventBus_$doFire__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent_2Ljava_lang_Object_2V(this$static, event){
  var $e0, causes, e, handler, handlers, it, java_util_HashSet_$add__Ljava_util_HashSet_2Ljava_lang_Object_2Z_old_0;
  try {
    ++this$static.com_google_gwt_event_shared_SimpleEventBus_firingDepth;
    handlers = com_google_gwt_event_shared_SimpleEventBus_$getHandlerList__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, event.getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2());
    causes = null;
    it = this$static.com_google_gwt_event_shared_SimpleEventBus_isReverseOrder?handlers.listIterator__ILjava_util_ListIterator_2(handlers.size__I()):handlers.listIterator__Ljava_util_ListIterator_2();
    while (this$static.com_google_gwt_event_shared_SimpleEventBus_isReverseOrder?it.java_util_AbstractList$IteratorImpl_i > 0:it.java_util_AbstractList$IteratorImpl_i < it.java_util_AbstractList$IteratorImpl_this$0.size__I()) {
      handler = this$static.com_google_gwt_event_shared_SimpleEventBus_isReverseOrder?com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_AbstractList$ListIteratorImpl_$previous__Ljava_util_AbstractList$ListIteratorImpl_2Ljava_lang_Object_2(it), 6):com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_AbstractList$IteratorImpl_$next__Ljava_util_AbstractList$IteratorImpl_2Ljava_lang_Object_2(it), 6);
      try {
        event.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler);
      }
       catch ($e0) {
        $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
        if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 7)) {
          e = $e0;
          !causes && (causes = new java_util_HashSet_HashSet__V);
          java_util_HashSet_$add__Ljava_util_HashSet_2Ljava_lang_Object_2Z_old_0 = causes.java_util_HashSet_map.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(e, causes);
        }
         else 
          throw $e0;
      }
    }
    if (causes) {
      throw new com_google_gwt_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V(causes);
    }
  }
   finally {
    --this$static.com_google_gwt_event_shared_SimpleEventBus_firingDepth;
    this$static.com_google_gwt_event_shared_SimpleEventBus_firingDepth == 0 && com_google_gwt_event_shared_SimpleEventBus_$handleQueuedAddsAndRemoves__Lcom_google_gwt_event_shared_SimpleEventBus_2V(this$static);
  }
}

function com_google_gwt_event_shared_SimpleEventBus_$ensureHandlerList__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, type, source){
  var handlers, sourceMap;
  sourceMap = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(this$static.com_google_gwt_event_shared_SimpleEventBus_map.get__Ljava_lang_Object_2Ljava_lang_Object_2(type), 8);
  if (!sourceMap) {
    sourceMap = new java_util_HashMap_HashMap__V;
    this$static.com_google_gwt_event_shared_SimpleEventBus_map.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(type, sourceMap);
  }
  handlers = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(sourceMap.get__Ljava_lang_Object_2Ljava_lang_Object_2(source), 9);
  if (!handlers) {
    handlers = new java_util_ArrayList_ArrayList__V;
    sourceMap.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(source, handlers);
  }
  return handlers;
}

function com_google_gwt_event_shared_SimpleEventBus_$fireEvent__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent_2V(this$static, event){
  if (!event) {
    throw new java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V($intern_150);
  }
  com_google_gwt_event_shared_SimpleEventBus_$doFire__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent_2Ljava_lang_Object_2V(this$static, event);
}

function com_google_gwt_event_shared_SimpleEventBus_$getHandlerList__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Ljava_util_List_2(this$static, type){
  var handlers, sourceMap;
  sourceMap = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(this$static.com_google_gwt_event_shared_SimpleEventBus_map.get__Ljava_lang_Object_2Ljava_lang_Object_2(type), 8);
  if (!sourceMap) {
    return java_util_Collections_$clinit__V() , java_util_Collections_$clinit__V() , java_util_Collections_EMPTY_1LIST;
  }
  handlers = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(sourceMap.get__Ljava_lang_Object_2Ljava_lang_Object_2(null), 9);
  if (!handlers) {
    return java_util_Collections_$clinit__V() , java_util_Collections_$clinit__V() , java_util_Collections_EMPTY_1LIST;
  }
  return handlers;
}

function com_google_gwt_event_shared_SimpleEventBus_$handleQueuedAddsAndRemoves__Lcom_google_gwt_event_shared_SimpleEventBus_2V(this$static){
  var c, c$iterator;
  if (this$static.com_google_gwt_event_shared_SimpleEventBus_deferredDeltas) {
    try {
      for (c$iterator = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this$static.com_google_gwt_event_shared_SimpleEventBus_deferredDeltas); c$iterator.java_util_AbstractList$IteratorImpl_i < c$iterator.java_util_AbstractList$IteratorImpl_this$0.size__I();) {
        c = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_AbstractList$IteratorImpl_$next__Ljava_util_AbstractList$IteratorImpl_2Ljava_lang_Object_2(c$iterator), 10);
        com_google_gwt_event_shared_SimpleEventBus_$doAddNow__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Ljava_lang_Object_2Lcom_google_gwt_event_shared_EventHandler_2V(c.com_google_gwt_event_shared_SimpleEventBus$2_this$0, c.com_google_gwt_event_shared_SimpleEventBus$2_val$type, c.com_google_gwt_event_shared_SimpleEventBus$2_val$source, c.com_google_gwt_event_shared_SimpleEventBus$2_val$handler);
      }
    }
     finally {
      this$static.com_google_gwt_event_shared_SimpleEventBus_deferredDeltas = null;
    }
  }
}

function com_google_gwt_event_shared_SimpleEventBus_SimpleEventBus__ZV(){
  this.com_google_gwt_event_shared_SimpleEventBus_map = new java_util_HashMap_HashMap__V;
  this.com_google_gwt_event_shared_SimpleEventBus_isReverseOrder = false;
}

function com_google_gwt_event_shared_SimpleEventBus(){
}

_ = com_google_gwt_event_shared_SimpleEventBus_SimpleEventBus__ZV.prototype = com_google_gwt_event_shared_SimpleEventBus.prototype = new com_google_gwt_event_shared_EventBus;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_event_shared_SimpleEventBus_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1SimpleEventBus_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_event_shared_SimpleEventBus_deferredDeltas = null;
_.com_google_gwt_event_shared_SimpleEventBus_firingDepth = 0;
_.com_google_gwt_event_shared_SimpleEventBus_isReverseOrder = false;
function com_google_gwt_event_shared_SimpleEventBus$1_SimpleEventBus$1__Lcom_google_gwt_event_shared_SimpleEventBus_2V(){
}

function com_google_gwt_event_shared_SimpleEventBus$1(){
}

_ = com_google_gwt_event_shared_SimpleEventBus$1_SimpleEventBus$1__Lcom_google_gwt_event_shared_SimpleEventBus_2V.prototype = com_google_gwt_event_shared_SimpleEventBus$1.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_event_shared_SimpleEventBus$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1SimpleEventBus$1_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_event_shared_SimpleEventBus$2_SimpleEventBus$2__Lcom_google_gwt_event_shared_SimpleEventBus_2V(this$0, val$type, val$handler){
  this.com_google_gwt_event_shared_SimpleEventBus$2_this$0 = this$0;
  this.com_google_gwt_event_shared_SimpleEventBus$2_val$type = val$type;
  this.com_google_gwt_event_shared_SimpleEventBus$2_val$source = null;
  this.com_google_gwt_event_shared_SimpleEventBus$2_val$handler = val$handler;
}

function com_google_gwt_event_shared_SimpleEventBus$2(){
}

_ = com_google_gwt_event_shared_SimpleEventBus$2_SimpleEventBus$2__Lcom_google_gwt_event_shared_SimpleEventBus_2V.prototype = com_google_gwt_event_shared_SimpleEventBus$2.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_event_shared_SimpleEventBus$2_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1SimpleEventBus$2_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {10:1};
_.com_google_gwt_event_shared_SimpleEventBus$2_this$0 = null;
_.com_google_gwt_event_shared_SimpleEventBus$2_val$handler = null;
_.com_google_gwt_event_shared_SimpleEventBus$2_val$source = null;
_.com_google_gwt_event_shared_SimpleEventBus$2_val$type = null;
function com_google_gwt_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V(causes){
  java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2Ljava_lang_Throwable_2V.call(this, causes.java_util_HashSet_map.size__I() == 0?null:com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(causes.toArray___3Ljava_lang_Object_2_3Ljava_lang_Object_2(com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1Throwable_12_1classLit, {11:1, 23:1}, 7, 0, 0)), 11)[0]);
}

function com_google_gwt_event_shared_UmbrellaException(){
}

_ = com_google_gwt_event_shared_UmbrellaException_UmbrellaException__Ljava_util_Set_2V.prototype = com_google_gwt_event_shared_UmbrellaException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_event_shared_UmbrellaException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1UmbrellaException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function com_google_gwt_http_client_Request_$cancel__Lcom_google_gwt_http_client_Request_2V(this$static){
  var xmlHttp;
  if (this$static.com_google_gwt_http_client_Request_xmlHttpRequest) {
    xmlHttp = this$static.com_google_gwt_http_client_Request_xmlHttpRequest;
    this$static.com_google_gwt_http_client_Request_xmlHttpRequest = null;
    com_google_gwt_xhr_client_XMLHttpRequest_$clearOnReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(xmlHttp);
    xmlHttp.abort();
    !!this$static.com_google_gwt_http_client_Request_timer && com_google_gwt_user_client_Timer_$cancel__Lcom_google_gwt_user_client_Timer_2V(this$static.com_google_gwt_http_client_Request_timer);
  }
}

function com_google_gwt_http_client_Request_$fireOnResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_RequestCallback_2V(this$static, callback){
  var errorMsg, exception, response, xhr;
  if (!this$static.com_google_gwt_http_client_Request_xmlHttpRequest) {
    return;
  }
  !!this$static.com_google_gwt_http_client_Request_timer && com_google_gwt_user_client_Timer_$cancel__Lcom_google_gwt_user_client_Timer_2V(this$static.com_google_gwt_http_client_Request_timer);
  xhr = this$static.com_google_gwt_http_client_Request_xmlHttpRequest;
  this$static.com_google_gwt_http_client_Request_xmlHttpRequest = null;
  errorMsg = com_google_gwt_http_client_Request_$getBrowserSpecificFailure__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_xhr_client_XMLHttpRequest_2Ljava_lang_String_2(xhr);
  if (errorMsg != null) {
    exception = new java_lang_RuntimeException_RuntimeException__Ljava_lang_String_2V(errorMsg);
    callback.onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V(this$static, exception);
  }
   else {
    response = new com_google_gwt_http_client_Request$1_Request$1__V(xhr);
    callback.onResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_Response_2V(this$static, response);
  }
}

function com_google_gwt_http_client_Request_$fireOnTimeout__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_RequestCallback_2V(this$static, callback){
  if (!this$static.com_google_gwt_http_client_Request_xmlHttpRequest) {
    return;
  }
  com_google_gwt_http_client_Request_$cancel__Lcom_google_gwt_http_client_Request_2V(this$static);
  callback.onError__Lcom_google_gwt_http_client_Request_2Ljava_lang_Throwable_2V(this$static, new com_google_gwt_http_client_RequestTimeoutException_RequestTimeoutException__Lcom_google_gwt_http_client_Request_2IV(this$static.com_google_gwt_http_client_Request_timeoutMillis));
}

function com_google_gwt_http_client_Request_$getBrowserSpecificFailure__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_xhr_client_XMLHttpRequest_2Ljava_lang_String_2(xhr){
  try {
    if (xhr.status === undefined) {
      return $intern_151;
    }
    return null;
  }
   catch (e) {
    return $intern_152;
  }
}

function com_google_gwt_http_client_Request_Request__Lcom_google_gwt_xhr_client_XMLHttpRequest_2ILcom_google_gwt_http_client_RequestCallback_2V(xmlHttpRequest, timeoutMillis, callback){
  if (!xmlHttpRequest) {
    throw new java_lang_NullPointerException_NullPointerException__V;
  }
  if (!callback) {
    throw new java_lang_NullPointerException_NullPointerException__V;
  }
  if (timeoutMillis < 0) {
    throw new java_lang_IllegalArgumentException_IllegalArgumentException__V;
  }
  this.com_google_gwt_http_client_Request_timeoutMillis = timeoutMillis;
  this.com_google_gwt_http_client_Request_xmlHttpRequest = xmlHttpRequest;
  if (timeoutMillis > 0) {
    this.com_google_gwt_http_client_Request_timer = new com_google_gwt_http_client_Request$3_Request$3__Lcom_google_gwt_http_client_Request_2V(this, callback);
    com_google_gwt_user_client_Timer_$schedule__Lcom_google_gwt_user_client_Timer_2IV(this.com_google_gwt_http_client_Request_timer, timeoutMillis);
  }
   else {
    this.com_google_gwt_http_client_Request_timer = null;
  }
}

function com_google_gwt_http_client_Request(){
}

_ = com_google_gwt_http_client_Request_Request__Lcom_google_gwt_xhr_client_XMLHttpRequest_2ILcom_google_gwt_http_client_RequestCallback_2V.prototype = com_google_gwt_http_client_Request.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_http_client_Request_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Request_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_http_client_Request_timeoutMillis = 0;
_.com_google_gwt_http_client_Request_timer = null;
_.com_google_gwt_http_client_Request_xmlHttpRequest = null;
function com_google_gwt_http_client_Response(){
}

_ = com_google_gwt_http_client_Response.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_http_client_Response_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Response_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_http_client_Request$1_Request$1__V(val$xmlHttpRequest){
  this.com_google_gwt_http_client_Request$1_val$xmlHttpRequest = val$xmlHttpRequest;
}

function com_google_gwt_http_client_Request$1(){
}

_ = com_google_gwt_http_client_Request$1_Request$1__V.prototype = com_google_gwt_http_client_Request$1.prototype = new com_google_gwt_http_client_Response;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_http_client_Request$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Request$1_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_http_client_Request$1_val$xmlHttpRequest = null;
function com_google_gwt_http_client_Request$3_Request$3__Lcom_google_gwt_http_client_Request_2V(this$0, val$callback){
  com_google_gwt_user_client_Timer_$clinit__V();
  this.com_google_gwt_http_client_Request$3_this$0 = this$0;
  this.com_google_gwt_http_client_Request$3_val$callback = val$callback;
}

function com_google_gwt_http_client_Request$3(){
}

_ = com_google_gwt_http_client_Request$3_Request$3__Lcom_google_gwt_http_client_Request_2V.prototype = com_google_gwt_http_client_Request$3.prototype = new com_google_gwt_user_client_Timer;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_http_client_Request$3_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Request$3_12_1classLit;
}
;
_.run__V = function com_google_gwt_http_client_Request$3_run__V(){
  com_google_gwt_http_client_Request_$fireOnTimeout__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_RequestCallback_2V(this.com_google_gwt_http_client_Request$3_this$0, this.com_google_gwt_http_client_Request$3_val$callback);
}
;
_.java_lang_Object_castableTypeMap$ = {16:1};
_.com_google_gwt_http_client_Request$3_this$0 = null;
_.com_google_gwt_http_client_Request$3_val$callback = null;
function com_google_gwt_http_client_RequestBuilder_$clinit__V(){
  com_google_gwt_http_client_RequestBuilder_$clinit__V = nullMethod;
  new com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V($intern_153);
  com_google_gwt_http_client_RequestBuilder_GET = new com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V($intern_154);
  new com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V($intern_155);
  com_google_gwt_http_client_RequestBuilder_POST = new com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V($intern_156);
  new com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V($intern_157);
}

function com_google_gwt_http_client_RequestBuilder_$doSend__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(this$static, requestData, callback){
  var $e0, e, request, requestPermissionException, xmlHttpRequest;
  xmlHttpRequest = com_google_gwt_xhr_client_XMLHttpRequest_create__Lcom_google_gwt_xhr_client_XMLHttpRequest_2();
  try {
    xmlHttpRequest.open(this$static.com_google_gwt_http_client_RequestBuilder_httpMethod, this$static.com_google_gwt_http_client_RequestBuilder_url, true);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 12)) {
      e = $e0;
      requestPermissionException = new com_google_gwt_http_client_RequestPermissionException_RequestPermissionException__Ljava_lang_String_2V(this$static.com_google_gwt_http_client_RequestBuilder_url);
      java_lang_Throwable_$initCause__Ljava_lang_Throwable_2Ljava_lang_Throwable_2Ljava_lang_Throwable_2(requestPermissionException, new com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V(e.getMessage__Ljava_lang_String_2()));
      throw requestPermissionException;
    }
     else 
      throw $e0;
  }
  com_google_gwt_http_client_RequestBuilder_$setHeaders__Lcom_google_gwt_http_client_RequestBuilder_2Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(this$static, xmlHttpRequest);
  request = new com_google_gwt_http_client_Request_Request__Lcom_google_gwt_xhr_client_XMLHttpRequest_2ILcom_google_gwt_http_client_RequestCallback_2V(xmlHttpRequest, this$static.com_google_gwt_http_client_RequestBuilder_timeoutMillis, callback);
  com_google_gwt_xhr_client_XMLHttpRequest_$setOnReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2Lcom_google_gwt_xhr_client_ReadyStateChangeHandler_2V(xmlHttpRequest, new com_google_gwt_http_client_RequestBuilder$1_RequestBuilder$1__Lcom_google_gwt_http_client_RequestBuilder_2V(request, callback));
  try {
    xmlHttpRequest.send(requestData);
  }
   catch ($e0) {
    $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
    if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 12)) {
      e = $e0;
      throw new com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V(e.getMessage__Ljava_lang_String_2());
    }
     else 
      throw $e0;
  }
  return request;
}

function com_google_gwt_http_client_RequestBuilder_$sendRequest__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(this$static, requestData, callback){
  com_google_gwt_http_client_StringValidator_throwIfNull__Ljava_lang_String_2Ljava_lang_Object_2V($intern_158, callback);
  return com_google_gwt_http_client_RequestBuilder_$doSend__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Lcom_google_gwt_http_client_RequestCallback_2Lcom_google_gwt_http_client_Request_2(this$static, requestData, callback);
}

function com_google_gwt_http_client_RequestBuilder_$setHeader__Lcom_google_gwt_http_client_RequestBuilder_2Ljava_lang_String_2Ljava_lang_String_2V(this$static, header, value){
  com_google_gwt_http_client_StringValidator_throwIfEmptyOrNull__Ljava_lang_String_2Ljava_lang_String_2V($intern_31, header);
  com_google_gwt_http_client_StringValidator_throwIfEmptyOrNull__Ljava_lang_String_2Ljava_lang_String_2V($intern_159, value);
  !this$static.com_google_gwt_http_client_RequestBuilder_headers && (this$static.com_google_gwt_http_client_RequestBuilder_headers = new java_util_HashMap_HashMap__V);
  this$static.com_google_gwt_http_client_RequestBuilder_headers.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(header, value);
}

function com_google_gwt_http_client_RequestBuilder_$setHeaders__Lcom_google_gwt_http_client_RequestBuilder_2Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(this$static, xmlHttpRequest){
  var $e0, e, header, header$iterator;
  if (!!this$static.com_google_gwt_http_client_RequestBuilder_headers && this$static.com_google_gwt_http_client_RequestBuilder_headers.size__I() > 0) {
    for (header$iterator = this$static.com_google_gwt_http_client_RequestBuilder_headers.entrySet__Ljava_util_Set_2().iterator__Ljava_util_Iterator_2(); header$iterator.hasNext__Z();) {
      header = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(header$iterator.next__Ljava_lang_Object_2(), 13);
      try {
        xmlHttpRequest.setRequestHeader(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(header.getKey__Ljava_lang_Object_2(), 1), com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(header.getValue__Ljava_lang_Object_2(), 1));
      }
       catch ($e0) {
        $e0 = com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2($e0);
        if (com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ($e0, 12)) {
          e = $e0;
          throw new com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V(e.getMessage__Ljava_lang_String_2());
        }
         else 
          throw $e0;
      }
    }
  }
   else {
    xmlHttpRequest.setRequestHeader($intern_160, $intern_161);
  }
}

function com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V(httpMethod, url){
  com_google_gwt_http_client_RequestBuilder_$clinit__V();
  com_google_gwt_http_client_RequestBuilder_RequestBuilder__Ljava_lang_String_2Ljava_lang_String_2V.call(this, !httpMethod?null:httpMethod.com_google_gwt_http_client_RequestBuilder$Method_name, url);
}

function com_google_gwt_http_client_RequestBuilder_RequestBuilder__Ljava_lang_String_2Ljava_lang_String_2V(httpMethod, url){
  com_google_gwt_http_client_StringValidator_throwIfEmptyOrNull__Ljava_lang_String_2Ljava_lang_String_2V($intern_162, httpMethod);
  com_google_gwt_http_client_StringValidator_throwIfEmptyOrNull__Ljava_lang_String_2Ljava_lang_String_2V($intern_163, url);
  this.com_google_gwt_http_client_RequestBuilder_httpMethod = httpMethod;
  this.com_google_gwt_http_client_RequestBuilder_url = url;
}

function com_google_gwt_http_client_RequestBuilder(){
}

_ = com_google_gwt_http_client_RequestBuilder_RequestBuilder__Lcom_google_gwt_http_client_RequestBuilder$Method_2Ljava_lang_String_2V.prototype = com_google_gwt_http_client_RequestBuilder.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_http_client_RequestBuilder_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestBuilder_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_http_client_RequestBuilder_headers = null;
_.com_google_gwt_http_client_RequestBuilder_httpMethod = null;
_.com_google_gwt_http_client_RequestBuilder_timeoutMillis = 0;
_.com_google_gwt_http_client_RequestBuilder_url = null;
var com_google_gwt_http_client_RequestBuilder_GET, com_google_gwt_http_client_RequestBuilder_POST;
function com_google_gwt_http_client_RequestBuilder$1_RequestBuilder$1__Lcom_google_gwt_http_client_RequestBuilder_2V(val$request, val$callback){
  this.com_google_gwt_http_client_RequestBuilder$1_val$request = val$request;
  this.com_google_gwt_http_client_RequestBuilder$1_val$callback = val$callback;
}

function com_google_gwt_http_client_RequestBuilder$1(){
}

_ = com_google_gwt_http_client_RequestBuilder$1_RequestBuilder$1__Lcom_google_gwt_http_client_RequestBuilder_2V.prototype = com_google_gwt_http_client_RequestBuilder$1.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_http_client_RequestBuilder$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestBuilder$1_12_1classLit;
}
;
_.onReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V = function com_google_gwt_http_client_RequestBuilder$1_onReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(xhr){
  if (xhr.readyState == 4) {
    com_google_gwt_xhr_client_XMLHttpRequest_$clearOnReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(xhr);
    com_google_gwt_http_client_Request_$fireOnResponseReceived__Lcom_google_gwt_http_client_Request_2Lcom_google_gwt_http_client_RequestCallback_2V(this.com_google_gwt_http_client_RequestBuilder$1_val$request, this.com_google_gwt_http_client_RequestBuilder$1_val$callback);
  }
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_http_client_RequestBuilder$1_val$callback = null;
_.com_google_gwt_http_client_RequestBuilder$1_val$request = null;
function com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V(name){
  this.com_google_gwt_http_client_RequestBuilder$Method_name = name;
}

function com_google_gwt_http_client_RequestBuilder$Method(){
}

_ = com_google_gwt_http_client_RequestBuilder$Method_RequestBuilder$Method__Ljava_lang_String_2V.prototype = com_google_gwt_http_client_RequestBuilder$Method.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_http_client_RequestBuilder$Method_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestBuilder$Method_12_1classLit;
}
;
_.toString__Ljava_lang_String_2$ = function com_google_gwt_http_client_RequestBuilder$Method_toString__Ljava_lang_String_2(){
  return this.com_google_gwt_http_client_RequestBuilder$Method_name;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_http_client_RequestBuilder$Method_name = null;
function com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V(message){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = message;
}

function com_google_gwt_http_client_RequestException(){
}

_ = com_google_gwt_http_client_RequestException_RequestException__Ljava_lang_String_2V.prototype = com_google_gwt_http_client_RequestException.prototype = new java_lang_Exception;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_http_client_RequestException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 7:1, 23:1};
function com_google_gwt_http_client_RequestPermissionException_RequestPermissionException__Ljava_lang_String_2V(url){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = $intern_164 + url + $intern_165;
}

function com_google_gwt_http_client_RequestPermissionException(){
}

_ = com_google_gwt_http_client_RequestPermissionException_RequestPermissionException__Ljava_lang_String_2V.prototype = com_google_gwt_http_client_RequestPermissionException.prototype = new com_google_gwt_http_client_RequestException;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_http_client_RequestPermissionException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestPermissionException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 7:1, 23:1};
function com_google_gwt_http_client_RequestTimeoutException_RequestTimeoutException__Lcom_google_gwt_http_client_Request_2IV(timeoutMillis){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = $intern_166 + timeoutMillis + $intern_167;
}

function com_google_gwt_http_client_RequestTimeoutException(){
}

_ = com_google_gwt_http_client_RequestTimeoutException_RequestTimeoutException__Lcom_google_gwt_http_client_Request_2IV.prototype = com_google_gwt_http_client_RequestTimeoutException.prototype = new com_google_gwt_http_client_RequestException;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_http_client_RequestTimeoutException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestTimeoutException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 7:1, 23:1};
function com_google_gwt_http_client_StringValidator_throwIfEmptyOrNull__Ljava_lang_String_2Ljava_lang_String_2V(name, value){
  com_google_gwt_http_client_StringValidator_throwIfNull__Ljava_lang_String_2Ljava_lang_Object_2V(name, value);
  if (0 == java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(value).length) {
    throw new java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V(name + $intern_168);
  }
}

function com_google_gwt_http_client_StringValidator_throwIfNull__Ljava_lang_String_2Ljava_lang_Object_2V(name, value){
  if (null == value) {
    throw new java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V(name + $intern_169);
  }
}

function com_google_gwt_http_client_URL_encodeQueryString__Ljava_lang_String_2Ljava_lang_String_2(decodedURLComponent){
  var com_google_gwt_http_client_URL_encodeQueryStringImpl__Ljava_lang_String_2Ljava_lang_String_2_regexp_0;
  com_google_gwt_http_client_StringValidator_throwIfNull__Ljava_lang_String_2Ljava_lang_Object_2V($intern_170, decodedURLComponent);
  return com_google_gwt_http_client_URL_encodeQueryStringImpl__Ljava_lang_String_2Ljava_lang_String_2_regexp_0 = /%20/g , encodeURIComponent(decodedURLComponent).replace(com_google_gwt_http_client_URL_encodeQueryStringImpl__Ljava_lang_String_2Ljava_lang_String_2_regexp_0, $intern_171);
}

function com_google_gwt_i18n_client_DateTimeFormat_$clinit__V(){
  com_google_gwt_i18n_client_DateTimeFormat_$clinit__V = nullMethod;
  com_google_gwt_i18n_client_DateTimeFormat_cache = new java_util_HashMap_HashMap__V;
}

function com_google_gwt_i18n_client_DateTimeFormat_$addPart__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IV(this$static, buf, count){
  var java_lang_StringBuffer_$setLength__Ljava_lang_StringBuffer_2IV_oldLength_0;
  if (buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string.length > 0) {
    java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static.com_google_gwt_i18n_client_DateTimeFormat_patternParts, new com_google_gwt_i18n_client_DateTimeFormat$PatternPart_DateTimeFormat$PatternPart__Ljava_lang_String_2IV(buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string, count));
    java_lang_StringBuffer_$setLength__Ljava_lang_StringBuffer_2IV_oldLength_0 = buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string.length;
    0 < java_lang_StringBuffer_$setLength__Ljava_lang_StringBuffer_2IV_oldLength_0?(com_google_gwt_core_client_impl_StringBufferImplAppend_$replace__Lcom_google_gwt_core_client_impl_StringBufferImplAppend_2Ljava_lang_Object_2IILjava_lang_String_2V(buf.java_lang_StringBuffer_impl, java_lang_StringBuffer_$setLength__Ljava_lang_StringBuffer_2IV_oldLength_0) , buf):0 > java_lang_StringBuffer_$setLength__Ljava_lang_StringBuffer_2IV_oldLength_0 && java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2_3CLjava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13C_1classLit, {23:1}, -1, -java_lang_StringBuffer_$setLength__Ljava_lang_StringBuffer_2IV_oldLength_0, 1));
  }
}

function com_google_gwt_i18n_client_DateTimeFormat_$format__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_util_Date_2Ljava_lang_String_2(this$static, date){
  var timeZone;
  timeZone = com_google_gwt_i18n_client_TimeZone_createTimeZone__ILcom_google_gwt_i18n_client_TimeZone_2(date.java_util_Date_jsdate.getTimezoneOffset());
  return com_google_gwt_i18n_client_DateTimeFormat_$format__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_util_Date_2Lcom_google_gwt_i18n_client_TimeZone_2Ljava_lang_String_2(this$static, date, timeZone);
}

function com_google_gwt_i18n_client_DateTimeFormat_$format__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_util_Date_2Lcom_google_gwt_i18n_client_TimeZone_2Ljava_lang_String_2(this$static, date, timeZone){
  var ch, diff, i, j, keepDate, keepTime, n, toAppendTo, trailQuote;
  diff = (date.java_util_Date_jsdate.getTimezoneOffset() - timeZone.com_google_gwt_i18n_client_TimeZone_standardOffset) * 60000;
  keepDate = new java_util_Date_Date__JV(com_google_gwt_lang_LongLib_add__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(date.java_util_Date_jsdate.getTime()), com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(diff)));
  keepTime = keepDate;
  if (keepDate.java_util_Date_jsdate.getTimezoneOffset() != date.java_util_Date_jsdate.getTimezoneOffset()) {
    diff > 0?(diff -= 86400000):(diff += 86400000);
    keepTime = new java_util_Date_Date__JV(com_google_gwt_lang_LongLib_add__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(date.java_util_Date_jsdate.getTime()), com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(diff)));
  }
  toAppendTo = new java_lang_StringBuffer_StringBuffer__IV;
  n = this$static.com_google_gwt_i18n_client_DateTimeFormat_pattern.length;
  for (i = 0; i < n;) {
    ch = this$static.com_google_gwt_i18n_client_DateTimeFormat_pattern.charCodeAt(i);
    if (ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90) {
      for (j = i + 1; j < n && this$static.com_google_gwt_i18n_client_DateTimeFormat_pattern.charCodeAt(j) == ch; ++j) {
      }
      com_google_gwt_i18n_client_DateTimeFormat_$subFormat__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2CILjava_util_Date_2Ljava_util_Date_2Ljava_util_Date_2Lcom_google_gwt_i18n_client_TimeZone_2Z(toAppendTo, ch, j - i, keepDate, keepTime, timeZone);
      i = j;
    }
     else if (ch == 39) {
      ++i;
      if (i < n && this$static.com_google_gwt_i18n_client_DateTimeFormat_pattern.charCodeAt(i) == 39) {
        toAppendTo.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += $intern_172;
        ++i;
        continue;
      }
      trailQuote = false;
      while (!trailQuote) {
        j = i;
        while (j < n && this$static.com_google_gwt_i18n_client_DateTimeFormat_pattern.charCodeAt(j) != 39) {
          ++j;
        }
        if (j >= n) {
          throw new java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V($intern_173);
        }
        j + 1 < n && this$static.com_google_gwt_i18n_client_DateTimeFormat_pattern.charCodeAt(j + 1) == 39?++j:(trailQuote = true);
        java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(toAppendTo, java_lang_String_$substring__Ljava_lang_String_2IILjava_lang_String_2(this$static.com_google_gwt_i18n_client_DateTimeFormat_pattern, i, j));
        i = j + 1;
      }
    }
     else {
      toAppendTo.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += String.fromCharCode(ch);
      ++i;
    }
  }
  return toAppendTo.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string;
}

function com_google_gwt_i18n_client_DateTimeFormat_$formatFractionalSeconds__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V(buf, count, date){
  var time, value;
  time = com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(date.java_util_Date_jsdate.getTime());
  if (!com_google_gwt_lang_LongLib_gte__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(time, P0_longLit)) {
    value = 1000 - com_google_gwt_lang_LongLib_toInt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I((com_google_gwt_lang_LongLibBase_divMod__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZLcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLib_neg__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(time), P3e8_longLit, true) , com_google_gwt_lang_LongLibBase_remainder));
    value == 1000 && (value = 0);
  }
   else {
    value = com_google_gwt_lang_LongLib_toInt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I((com_google_gwt_lang_LongLibBase_divMod__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZLcom_google_gwt_lang_LongLibBase$LongEmul_2(time, P3e8_longLit, true) , com_google_gwt_lang_LongLibBase_remainder));
  }
  if (count == 1) {
    value = ~~((value + 50) / 100) < 9?~~((value + 50) / 100):9;
    buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += String.fromCharCode(48 + value & 65535);
  }
   else if (count == 2) {
    value = ~~((value + 5) / 10) < 99?~~((value + 5) / 10):99;
    com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, value, 2);
  }
   else {
    com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, value, 3);
    count > 3 && com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, 0, count - 3);
  }
}

function com_google_gwt_i18n_client_DateTimeFormat_$formatMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V(buf, count, date){
  var value;
  value = date.java_util_Date_jsdate.getMonth();
  switch (count) {
    case 5:
      java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_174, $intern_175, $intern_176, $intern_177, $intern_176, $intern_174, $intern_174, $intern_177, $intern_178, $intern_179, $intern_180, $intern_181])[value]);
      break;
    case 4:
      java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_182, $intern_183, $intern_184, $intern_185, $intern_186, $intern_187, $intern_188, $intern_189, $intern_190, $intern_191, $intern_192, $intern_193])[value]);
      break;
    case 3:
      java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_194, $intern_195, $intern_196, $intern_197, $intern_186, $intern_198, $intern_199, $intern_200, $intern_201, $intern_202, $intern_203, $intern_204])[value]);
      break;
    default:com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, value + 1, count);
  }
}

function com_google_gwt_i18n_client_DateTimeFormat_$formatYear__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V(buf, count, date){
  var value;
  value = date.java_util_Date_jsdate.getFullYear() - 1900 + 1900;
  value < 0 && (value = -value);
  switch (count) {
    case 1:
      buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += value;
      break;
    case 2:
      com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, value % 100, 2);
      break;
    default:com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, value, count);
  }
}

function com_google_gwt_i18n_client_DateTimeFormat_$getNextCharCountInPattern__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2II(start){
  var ch, next;
  ch = $intern_205.charCodeAt(start);
  next = start + 1;
  while (next < 29 && $intern_205.charCodeAt(next) == ch) {
    ++next;
  }
  return next - start;
}

function com_google_gwt_i18n_client_DateTimeFormat_$identifyAbutStart__Lcom_google_gwt_i18n_client_DateTimeFormat_2V(this$static){
  var abut, i, len;
  abut = false;
  len = this$static.com_google_gwt_i18n_client_DateTimeFormat_patternParts.java_util_ArrayList_size;
  for (i = 0; i < len; ++i) {
    if (com_google_gwt_i18n_client_DateTimeFormat_$isNumeric__Lcom_google_gwt_i18n_client_DateTimeFormat_2Lcom_google_gwt_i18n_client_DateTimeFormat$PatternPart_2Z(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(this$static.com_google_gwt_i18n_client_DateTimeFormat_patternParts, i), 15))) {
      if (!abut && i + 1 < len && com_google_gwt_i18n_client_DateTimeFormat_$isNumeric__Lcom_google_gwt_i18n_client_DateTimeFormat_2Lcom_google_gwt_i18n_client_DateTimeFormat$PatternPart_2Z(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(this$static.com_google_gwt_i18n_client_DateTimeFormat_patternParts, i + 1), 15))) {
        abut = true;
        com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(this$static.com_google_gwt_i18n_client_DateTimeFormat_patternParts, i), 15).com_google_gwt_i18n_client_DateTimeFormat$PatternPart_abutStart = true;
      }
    }
     else {
      abut = false;
    }
  }
}

function com_google_gwt_i18n_client_DateTimeFormat_$isNumeric__Lcom_google_gwt_i18n_client_DateTimeFormat_2Lcom_google_gwt_i18n_client_DateTimeFormat$PatternPart_2Z(part){
  var i;
  if (part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_count <= 0) {
    return false;
  }
  i = $intern_206.indexOf(java_lang_String_fromCodePoint__ILjava_lang_String_2(part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_text.charCodeAt(0)));
  return i > 1 || i >= 0 && part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_count < 3;
}

function com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, data, pos){
  var bestMatch, bestMatchLength, count, i, length, textInLowerCase;
  count = data.length;
  bestMatchLength = 0;
  bestMatch = -1;
  textInLowerCase = text.substr(start, text.length - start).toLowerCase();
  for (i = 0; i < count; ++i) {
    length = data[i].length;
    if (length > bestMatchLength && textInLowerCase.indexOf(data[i].toLowerCase()) == 0) {
      bestMatch = i;
      bestMatchLength = length;
    }
  }
  bestMatch >= 0 && (pos[0] = start + bestMatchLength);
  return bestMatch;
}

function com_google_gwt_i18n_client_DateTimeFormat_$parse__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2ZLjava_util_Date_2(this$static, text){
  var charsConsumed, curDate, date;
  curDate = new java_util_Date_Date__V;
  date = new java_util_Date_Date__IIIV(curDate.java_util_Date_jsdate.getFullYear() - 1900, curDate.java_util_Date_jsdate.getMonth(), curDate.java_util_Date_jsdate.getDate());
  charsConsumed = com_google_gwt_i18n_client_DateTimeFormat_$parse__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2ILjava_util_Date_2ZI(this$static, text, date);
  if (charsConsumed == 0 || charsConsumed < text.length) {
    throw new java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V(text);
  }
  return date;
}

function com_google_gwt_i18n_client_DateTimeFormat_$parse__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2ILjava_util_Date_2ZI(this$static, text, date){
  var abutPass, abutPat, cal, count, i, parsePos, part, s;
  cal = new com_google_gwt_i18n_client_impl_DateRecord_DateRecord__V;
  parsePos = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13I_1classLit, {23:1}, -1, [0]);
  abutPat = -1;
  abutPass = 0;
  for (i = 0; i < this$static.com_google_gwt_i18n_client_DateTimeFormat_patternParts.java_util_ArrayList_size; ++i) {
    part = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(this$static.com_google_gwt_i18n_client_DateTimeFormat_patternParts, i), 15);
    if (part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_count > 0) {
      if (abutPat < 0 && part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_abutStart) {
        abutPat = i;
        abutPass = 0;
      }
      if (abutPat >= 0) {
        count = part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_count;
        if (i == abutPat) {
          count -= abutPass++;
          if (count == 0) {
            return 0;
          }
        }
        if (!com_google_gwt_i18n_client_DateTimeFormat_$subParse__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_DateTimeFormat$PatternPart_2ILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, parsePos, part, count, cal)) {
          i = abutPat - 1;
          parsePos[0] = 0;
          continue;
        }
      }
       else {
        abutPat = -1;
        if (!com_google_gwt_i18n_client_DateTimeFormat_$subParse__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_DateTimeFormat$PatternPart_2ILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, parsePos, part, 0, cal)) {
          return 0;
        }
      }
    }
     else {
      abutPat = -1;
      if (part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_text.charCodeAt(0) == 32) {
        s = parsePos[0];
        com_google_gwt_i18n_client_DateTimeFormat_$skipSpace__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3IV(text, parsePos);
        if (parsePos[0] > s) {
          continue;
        }
      }
       else if (java_lang_String_$startsWith__Ljava_lang_String_2Ljava_lang_String_2IZ(text, part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_text, parsePos[0])) {
        parsePos[0] += part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_text.length;
        continue;
      }
      return 0;
    }
  }
  if (!com_google_gwt_i18n_client_impl_DateRecord_$calcDate__Lcom_google_gwt_i18n_client_impl_DateRecord_2Ljava_util_Date_2ZZ(cal, date)) {
    return 0;
  }
  return parsePos[0];
}

function com_google_gwt_i18n_client_DateTimeFormat_$parseInt__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3II(text, pos){
  var ch, ind, ret;
  ret = 0;
  ind = pos[0];
  if (ind >= text.length) {
    return -1;
  }
  ch = text.charCodeAt(ind);
  while (ch >= 48 && ch <= 57) {
    ret = ret * 10 + (ch - 48);
    ++ind;
    if (ind >= text.length) {
      break;
    }
    ch = text.charCodeAt(ind);
  }
  ind > pos[0]?(pos[0] = ind):(ret = -1);
  return ret;
}

function com_google_gwt_i18n_client_DateTimeFormat_$parsePattern__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2V(this$static){
  var buf, ch, count, i, inQuote;
  buf = new java_lang_StringBuffer_StringBuffer__IV;
  inQuote = false;
  for (i = 0; i < 29; ++i) {
    ch = $intern_205.charCodeAt(i);
    if (ch == 32) {
      com_google_gwt_i18n_client_DateTimeFormat_$addPart__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IV(this$static, buf, 0);
      buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += $intern_207;
      com_google_gwt_i18n_client_DateTimeFormat_$addPart__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IV(this$static, buf, 0);
      while (i + 1 < 29 && $intern_205.charCodeAt(i + 1) == 32) {
        ++i;
      }
      continue;
    }
    if (inQuote) {
      if (ch == 39) {
        if (i + 1 < 29 && $intern_205.charCodeAt(i + 1) == 39) {
          buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += $intern_172;
          ++i;
        }
         else {
          inQuote = false;
        }
      }
       else {
        buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += String.fromCharCode(ch);
      }
      continue;
    }
    if ($intern_208.indexOf(java_lang_String_fromCodePoint__ILjava_lang_String_2(ch)) > 0) {
      com_google_gwt_i18n_client_DateTimeFormat_$addPart__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IV(this$static, buf, 0);
      buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += String.fromCharCode(ch);
      count = com_google_gwt_i18n_client_DateTimeFormat_$getNextCharCountInPattern__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2II(i);
      com_google_gwt_i18n_client_DateTimeFormat_$addPart__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IV(this$static, buf, count);
      i += count - 1;
      continue;
    }
    if (ch == 39) {
      if (i + 1 < 29 && $intern_205.charCodeAt(i + 1) == 39) {
        buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += $intern_172;
        ++i;
      }
       else {
        inQuote = true;
      }
    }
     else {
      buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += String.fromCharCode(ch);
    }
  }
  com_google_gwt_i18n_client_DateTimeFormat_$addPart__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IV(this$static, buf, 0);
  com_google_gwt_i18n_client_DateTimeFormat_$identifyAbutStart__Lcom_google_gwt_i18n_client_DateTimeFormat_2V(this$static);
}

function com_google_gwt_i18n_client_DateTimeFormat_$parseTimeZoneOffset__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, cal){
  var offset, sign, st, value;
  if (pos[0] >= text.length) {
    cal.com_google_gwt_i18n_client_impl_DateRecord_tzOffset = 0;
    return true;
  }
  switch (text.charCodeAt(pos[0])) {
    case 43:
      sign = 1;
      break;
    case 45:
      sign = -1;
      break;
    default:cal.com_google_gwt_i18n_client_impl_DateRecord_tzOffset = 0;
      return true;
  }
  ++pos[0];
  st = pos[0];
  value = com_google_gwt_i18n_client_DateTimeFormat_$parseInt__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3II(text, pos);
  if (value == 0 && pos[0] == st) {
    return false;
  }
  if (pos[0] < text.length && text.charCodeAt(pos[0]) == 58) {
    offset = value * 60;
    ++pos[0];
    st = pos[0];
    value = com_google_gwt_i18n_client_DateTimeFormat_$parseInt__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3II(text, pos);
    if (value == 0 && pos[0] == st) {
      return false;
    }
    offset += value;
  }
   else {
    offset = value;
    value < 24 && pos[0] - st <= 2?(offset *= 60):(offset = value % 100 + ~~(value / 100) * 60);
  }
  offset *= sign;
  cal.com_google_gwt_i18n_client_impl_DateRecord_tzOffset = -offset;
  return true;
}

function com_google_gwt_i18n_client_DateTimeFormat_$skipSpace__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3IV(text, pos){
  while (pos[0] < text.length && $intern_209.indexOf(java_lang_String_fromCodePoint__ILjava_lang_String_2(text.charCodeAt(pos[0]))) >= 0) {
    ++pos[0];
  }
}

function com_google_gwt_i18n_client_DateTimeFormat_$subFormat__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2CILjava_util_Date_2Ljava_util_Date_2Ljava_util_Date_2Lcom_google_gwt_i18n_client_TimeZone_2Z(buf, ch, count, adjustedDate, adjustedTime, timezone){
  var com_google_gwt_i18n_client_DateTimeFormat_$formatEra__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$format24Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$formatDayOfWeek__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$format1To12Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$format0To11Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$format0To23Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneDay__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$formatQuarter__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$formatDate__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$formatMinutes__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, com_google_gwt_i18n_client_DateTimeFormat_$formatSeconds__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0;
  switch (ch) {
    case 71:
      com_google_gwt_i18n_client_DateTimeFormat_$formatEra__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedDate.java_util_Date_jsdate.getFullYear() - 1900 >= -1900?1:0;
      count >= 4?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_210, $intern_211])[com_google_gwt_i18n_client_DateTimeFormat_$formatEra__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]):java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_212, $intern_213])[com_google_gwt_i18n_client_DateTimeFormat_$formatEra__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]);
      break;
    case 121:
      com_google_gwt_i18n_client_DateTimeFormat_$formatYear__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V(buf, count, adjustedDate);
      break;
    case 77:
      com_google_gwt_i18n_client_DateTimeFormat_$formatMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V(buf, count, adjustedDate);
      break;
    case 107:
      com_google_gwt_i18n_client_DateTimeFormat_$format24Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedTime.java_util_Date_jsdate.getHours();
      com_google_gwt_i18n_client_DateTimeFormat_$format24Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 == 0?com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, 24, count):com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, com_google_gwt_i18n_client_DateTimeFormat_$format24Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, count);
      break;
    case 83:
      com_google_gwt_i18n_client_DateTimeFormat_$formatFractionalSeconds__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V(buf, count, adjustedTime);
      break;
    case 69:
      com_google_gwt_i18n_client_DateTimeFormat_$formatDayOfWeek__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedDate.java_util_Date_jsdate.getDay();
      count == 5?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_178, $intern_176, $intern_214, $intern_215, $intern_214, $intern_175, $intern_178])[com_google_gwt_i18n_client_DateTimeFormat_$formatDayOfWeek__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]):count == 4?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_216, $intern_217, $intern_218, $intern_219, $intern_220, $intern_221, $intern_222])[com_google_gwt_i18n_client_DateTimeFormat_$formatDayOfWeek__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]):java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_223, $intern_224, $intern_225, $intern_226, $intern_227, $intern_228, $intern_229])[com_google_gwt_i18n_client_DateTimeFormat_$formatDayOfWeek__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]);
      break;
    case 97:
      adjustedTime.java_util_Date_jsdate.getHours() >= 12 && adjustedTime.java_util_Date_jsdate.getHours() < 24?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_230, $intern_231])[1]):java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_230, $intern_231])[0]);
      break;
    case 104:
      com_google_gwt_i18n_client_DateTimeFormat_$format1To12Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedTime.java_util_Date_jsdate.getHours() % 12;
      com_google_gwt_i18n_client_DateTimeFormat_$format1To12Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 == 0?com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, 12, count):com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, com_google_gwt_i18n_client_DateTimeFormat_$format1To12Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, count);
      break;
    case 75:
      com_google_gwt_i18n_client_DateTimeFormat_$format0To11Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedTime.java_util_Date_jsdate.getHours() % 12;
      com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, com_google_gwt_i18n_client_DateTimeFormat_$format0To11Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, count);
      break;
    case 72:
      com_google_gwt_i18n_client_DateTimeFormat_$format0To23Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedTime.java_util_Date_jsdate.getHours();
      com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, com_google_gwt_i18n_client_DateTimeFormat_$format0To23Hours__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, count);
      break;
    case 99:
      com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneDay__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedDate.java_util_Date_jsdate.getDay();
      count == 5?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_178, $intern_176, $intern_214, $intern_215, $intern_214, $intern_175, $intern_178])[com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneDay__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]):count == 4?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_216, $intern_217, $intern_218, $intern_219, $intern_220, $intern_221, $intern_222])[com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneDay__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]):count == 3?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_223, $intern_224, $intern_225, $intern_226, $intern_227, $intern_228, $intern_229])[com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneDay__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]):com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneDay__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, 1);
      break;
    case 76:
      com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedDate.java_util_Date_jsdate.getMonth();
      count == 5?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_174, $intern_175, $intern_176, $intern_177, $intern_176, $intern_174, $intern_174, $intern_177, $intern_178, $intern_179, $intern_180, $intern_181])[com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]):count == 4?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_182, $intern_183, $intern_184, $intern_185, $intern_186, $intern_187, $intern_188, $intern_189, $intern_190, $intern_191, $intern_192, $intern_193])[com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]):count == 3?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_194, $intern_195, $intern_196, $intern_197, $intern_186, $intern_198, $intern_199, $intern_200, $intern_201, $intern_202, $intern_203, $intern_204])[com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]):com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, com_google_gwt_i18n_client_DateTimeFormat_$formatStandaloneMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 + 1, count);
      break;
    case 81:
      com_google_gwt_i18n_client_DateTimeFormat_$formatQuarter__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = ~~(adjustedDate.java_util_Date_jsdate.getMonth() / 3);
      count < 4?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_232, $intern_233, $intern_234, $intern_235])[com_google_gwt_i18n_client_DateTimeFormat_$formatQuarter__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]):java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_236, $intern_237, $intern_238, $intern_239])[com_google_gwt_i18n_client_DateTimeFormat_$formatQuarter__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0]);
      break;
    case 100:
      com_google_gwt_i18n_client_DateTimeFormat_$formatDate__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedDate.java_util_Date_jsdate.getDate();
      com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, com_google_gwt_i18n_client_DateTimeFormat_$formatDate__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, count);
      break;
    case 109:
      com_google_gwt_i18n_client_DateTimeFormat_$formatMinutes__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedTime.java_util_Date_jsdate.getMinutes();
      com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, com_google_gwt_i18n_client_DateTimeFormat_$formatMinutes__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, count);
      break;
    case 115:
      com_google_gwt_i18n_client_DateTimeFormat_$formatSeconds__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0 = adjustedTime.java_util_Date_jsdate.getSeconds();
      com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, com_google_gwt_i18n_client_DateTimeFormat_$formatSeconds__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2ILjava_util_Date_2V_value_0, count);
      break;
    case 122:
      count < 4?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, timezone.com_google_gwt_i18n_client_TimeZone_tzNames[0]):java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, timezone.com_google_gwt_i18n_client_TimeZone_tzNames[1]);
      break;
    case 118:
      java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, timezone.com_google_gwt_i18n_client_TimeZone_timezoneID);
      break;
    case 90:
      count < 3?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_i18n_client_TimeZone_$getRFCTimeZoneString__Lcom_google_gwt_i18n_client_TimeZone_2Ljava_util_Date_2Ljava_lang_String_2(timezone)):count == 3?java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_i18n_client_TimeZone_$getISOTimeZoneString__Lcom_google_gwt_i18n_client_TimeZone_2Ljava_util_Date_2Ljava_lang_String_2(timezone)):java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(buf, com_google_gwt_i18n_client_TimeZone_composeGMTString__ILjava_lang_String_2(timezone.com_google_gwt_i18n_client_TimeZone_standardOffset));
      break;
    default:return false;
  }
  return true;
}

function com_google_gwt_i18n_client_DateTimeFormat_$subParse__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_DateTimeFormat$PatternPart_2ILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, part, digitCount, cal){
  var ch, start, value;
  com_google_gwt_i18n_client_DateTimeFormat_$skipSpace__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3IV(text, pos);
  start = pos[0];
  ch = part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_text.charCodeAt(0);
  value = -1;
  if (com_google_gwt_i18n_client_DateTimeFormat_$isNumeric__Lcom_google_gwt_i18n_client_DateTimeFormat_2Lcom_google_gwt_i18n_client_DateTimeFormat$PatternPart_2Z(part)) {
    if (digitCount > 0) {
      if (start + digitCount > text.length) {
        return false;
      }
      value = com_google_gwt_i18n_client_DateTimeFormat_$parseInt__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3II(text.substr(0, start + digitCount - 0), pos);
    }
     else {
      value = com_google_gwt_i18n_client_DateTimeFormat_$parseInt__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3II(text, pos);
    }
  }
  switch (ch) {
    case 71:
      value = com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_210, $intern_211]), pos);
      cal.com_google_gwt_i18n_client_impl_DateRecord_era = value;
      return true;
    case 77:
      return com_google_gwt_i18n_client_DateTimeFormat_$subParseMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_impl_DateRecord_2IIZ(text, pos, cal, value, start);
    case 76:
      return com_google_gwt_i18n_client_DateTimeFormat_$subParseStandaloneMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_impl_DateRecord_2IIZ(text, pos, cal, value, start);
    case 69:
      return com_google_gwt_i18n_client_DateTimeFormat_$subParseDayOfWeek__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3IILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, start, cal);
    case 99:
      return com_google_gwt_i18n_client_DateTimeFormat_$subParseStandaloneDay__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3IILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, start, cal);
    case 97:
      value = com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_230, $intern_231]), pos);
      cal.com_google_gwt_i18n_client_impl_DateRecord_ampm = value;
      return true;
    case 121:
      return com_google_gwt_i18n_client_DateTimeFormat_$subParseYear__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3IIILcom_google_gwt_i18n_client_DateTimeFormat$PatternPart_2Lcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, start, value, part, cal);
    case 100:
      if (value <= 0) {
        return false;
      }

      cal.com_google_gwt_i18n_client_impl_DateRecord_dayOfMonth = value;
      return true;
    case 83:
      if (value < 0) {
        return false;
      }

      return com_google_gwt_i18n_client_DateTimeFormat_$subParseFractionalSeconds__Lcom_google_gwt_i18n_client_DateTimeFormat_2IIILcom_google_gwt_i18n_client_impl_DateRecord_2Z(value, start, pos[0], cal);
    case 104:
      value == 12 && (value = 0);
    case 75:
    case 72:
      if (value < 0) {
        return false;
      }

      cal.com_google_gwt_i18n_client_impl_DateRecord_hours = value;
      return true;
    case 107:
      if (value < 0) {
        return false;
      }

      cal.com_google_gwt_i18n_client_impl_DateRecord_hours = value;
      return true;
    case 109:
      if (value < 0) {
        return false;
      }

      cal.com_google_gwt_i18n_client_impl_DateRecord_minutes = value;
      return true;
    case 115:
      if (value < 0) {
        return false;
      }

      cal.com_google_gwt_i18n_client_impl_DateRecord_seconds = value;
      return true;
    case 122:
    case 90:
    case 118:
      return com_google_gwt_i18n_client_DateTimeFormat_$subParseTimeZoneInGMT__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3ILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, start, pos, cal);
    default:return false;
  }
}

function com_google_gwt_i18n_client_DateTimeFormat_$subParseDayOfWeek__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3IILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, start, cal){
  var value;
  value = com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_216, $intern_217, $intern_218, $intern_219, $intern_220, $intern_221, $intern_222]), pos);
  value < 0 && (value = com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_223, $intern_224, $intern_225, $intern_226, $intern_227, $intern_228, $intern_229]), pos));
  if (value < 0) {
    return false;
  }
  cal.com_google_gwt_i18n_client_impl_DateRecord_dayOfWeek = value;
  return true;
}

function com_google_gwt_i18n_client_DateTimeFormat_$subParseFractionalSeconds__Lcom_google_gwt_i18n_client_DateTimeFormat_2IIILcom_google_gwt_i18n_client_impl_DateRecord_2Z(value, start, end, cal){
  var a, i;
  i = end - start;
  if (i < 3) {
    while (i < 3) {
      value *= 10;
      ++i;
    }
  }
   else {
    a = 1;
    while (i > 3) {
      a *= 10;
      --i;
    }
    value = ~~((value + (~~a >> 1)) / a);
  }
  cal.com_google_gwt_i18n_client_impl_DateRecord_milliseconds = value;
  return true;
}

function com_google_gwt_i18n_client_DateTimeFormat_$subParseMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_impl_DateRecord_2IIZ(text, pos, cal, value, start){
  if (value < 0) {
    value = com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_182, $intern_183, $intern_184, $intern_185, $intern_186, $intern_187, $intern_188, $intern_189, $intern_190, $intern_191, $intern_192, $intern_193]), pos);
    value < 0 && (value = com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_194, $intern_195, $intern_196, $intern_197, $intern_186, $intern_198, $intern_199, $intern_200, $intern_201, $intern_202, $intern_203, $intern_204]), pos));
    if (value < 0) {
      return false;
    }
    cal.com_google_gwt_i18n_client_impl_DateRecord_month = value;
    return true;
  }
   else if (value > 0) {
    cal.com_google_gwt_i18n_client_impl_DateRecord_month = value - 1;
    return true;
  }
  return false;
}

function com_google_gwt_i18n_client_DateTimeFormat_$subParseStandaloneDay__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3IILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, start, cal){
  var value;
  value = com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_216, $intern_217, $intern_218, $intern_219, $intern_220, $intern_221, $intern_222]), pos);
  value < 0 && (value = com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_223, $intern_224, $intern_225, $intern_226, $intern_227, $intern_228, $intern_229]), pos));
  if (value < 0) {
    return false;
  }
  cal.com_google_gwt_i18n_client_impl_DateRecord_dayOfWeek = value;
  return true;
}

function com_google_gwt_i18n_client_DateTimeFormat_$subParseStandaloneMonth__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_impl_DateRecord_2IIZ(text, pos, cal, value, start){
  if (value < 0) {
    value = com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_182, $intern_183, $intern_184, $intern_185, $intern_186, $intern_187, $intern_188, $intern_189, $intern_190, $intern_191, $intern_192, $intern_193]), pos);
    value < 0 && (value = com_google_gwt_i18n_client_DateTimeFormat_$matchString__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3Ljava_lang_String_2_3II(text, start, com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_194, $intern_195, $intern_196, $intern_197, $intern_186, $intern_198, $intern_199, $intern_200, $intern_201, $intern_202, $intern_203, $intern_204]), pos));
    if (value < 0) {
      return false;
    }
    cal.com_google_gwt_i18n_client_impl_DateRecord_month = value;
    return true;
  }
   else if (value > 0) {
    cal.com_google_gwt_i18n_client_impl_DateRecord_month = value - 1;
    return true;
  }
  return false;
}

function com_google_gwt_i18n_client_DateTimeFormat_$subParseTimeZoneInGMT__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2I_3ILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, start, pos, cal){
  if (!(start < 0 || start >= text.length) && text.indexOf($intern_240, start) == start) {
    pos[0] = start + 3;
    return com_google_gwt_i18n_client_DateTimeFormat_$parseTimeZoneOffset__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, cal);
  }
  if (!(start < 0 || start >= text.length) && text.indexOf($intern_241, start) == start) {
    pos[0] = start + 3;
    return com_google_gwt_i18n_client_DateTimeFormat_$parseTimeZoneOffset__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, cal);
  }
  return com_google_gwt_i18n_client_DateTimeFormat_$parseTimeZoneOffset__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3ILcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, cal);
}

function com_google_gwt_i18n_client_DateTimeFormat_$subParseYear__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3IIILcom_google_gwt_i18n_client_DateTimeFormat$PatternPart_2Lcom_google_gwt_i18n_client_impl_DateRecord_2Z(text, pos, start, value, part, cal){
  var ambiguousTwoDigitYear, ch, date, defaultCenturyStartYear;
  ch = 32;
  if (value < 0) {
    if (pos[0] >= text.length) {
      return false;
    }
    ch = text.charCodeAt(pos[0]);
    if (ch != 43 && ch != 45) {
      return false;
    }
    ++pos[0];
    value = com_google_gwt_i18n_client_DateTimeFormat_$parseInt__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2_3II(text, pos);
    if (value < 0) {
      return false;
    }
    ch == 45 && (value = -value);
  }
  if (ch == 32 && pos[0] - start == 2 && part.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_count == 2) {
    date = new java_util_Date_Date__V;
    defaultCenturyStartYear = date.java_util_Date_jsdate.getFullYear() - 1900 + 1900 - 80;
    ambiguousTwoDigitYear = defaultCenturyStartYear % 100;
    cal.com_google_gwt_i18n_client_impl_DateRecord_ambiguousYear = value == ambiguousTwoDigitYear;
    value += ~~(defaultCenturyStartYear / 100) * 100 + (value < ambiguousTwoDigitYear?100:0);
  }
  cal.com_google_gwt_i18n_client_impl_DateRecord_year = value;
  return true;
}

function com_google_gwt_i18n_client_DateTimeFormat_$zeroPaddingNumber__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_StringBuffer_2IIV(buf, value, minWidth){
  var b, i;
  b = 10;
  for (i = 0; i < minWidth - 1; ++i) {
    value < b && (buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += $intern_90 , buf);
    b *= 10;
  }
  buf.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += value;
}

function com_google_gwt_i18n_client_DateTimeFormat_DateTimeFormat__Ljava_lang_String_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2V(){
  this.com_google_gwt_i18n_client_DateTimeFormat_patternParts = new java_util_ArrayList_ArrayList__V;
  this.com_google_gwt_i18n_client_DateTimeFormat_pattern = $intern_205;
  com_google_gwt_i18n_client_DateTimeFormat_$parsePattern__Lcom_google_gwt_i18n_client_DateTimeFormat_2Ljava_lang_String_2V(this);
}

function com_google_gwt_i18n_client_DateTimeFormat_getFormat__Ljava_lang_String_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2Lcom_google_gwt_i18n_client_DateTimeFormat_2(dtfi){
  com_google_gwt_i18n_client_DateTimeFormat_$clinit__V();
  var defaultDtfi, dtf;
  defaultDtfi = com_google_gwt_i18n_client_LocaleInfo_$getDateTimeFormatInfo__Lcom_google_gwt_i18n_client_LocaleInfo_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2((com_google_gwt_i18n_client_LocaleInfo_$clinit__V() , com_google_gwt_i18n_client_LocaleInfo_$clinit__V() , com_google_gwt_i18n_client_LocaleInfo_instance));
  dtf = null;
  dtfi == defaultDtfi && (dtf = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(com_google_gwt_i18n_client_DateTimeFormat_cache.get__Ljava_lang_Object_2Ljava_lang_Object_2($intern_205), 14));
  if (!dtf) {
    dtf = new com_google_gwt_i18n_client_DateTimeFormat_DateTimeFormat__Ljava_lang_String_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2V;
    dtfi == defaultDtfi && com_google_gwt_i18n_client_DateTimeFormat_cache.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2($intern_205, dtf);
  }
  return dtf;
}

function com_google_gwt_i18n_client_DateTimeFormat(){
}

_ = com_google_gwt_i18n_client_DateTimeFormat_DateTimeFormat__Ljava_lang_String_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2V.prototype = com_google_gwt_i18n_client_DateTimeFormat.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_i18n_client_DateTimeFormat_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1DateTimeFormat_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {14:1};
_.com_google_gwt_i18n_client_DateTimeFormat_pattern = null;
var com_google_gwt_i18n_client_DateTimeFormat_cache = null;
function com_google_gwt_i18n_client_DateTimeFormat$PatternPart_DateTimeFormat$PatternPart__Ljava_lang_String_2IV(txt, cnt){
  this.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_text = txt;
  this.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_count = cnt;
  this.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_abutStart = false;
}

function com_google_gwt_i18n_client_DateTimeFormat$PatternPart(){
}

_ = com_google_gwt_i18n_client_DateTimeFormat$PatternPart_DateTimeFormat$PatternPart__Ljava_lang_String_2IV.prototype = com_google_gwt_i18n_client_DateTimeFormat$PatternPart.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_i18n_client_DateTimeFormat$PatternPart_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1DateTimeFormat$PatternPart_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {15:1};
_.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_abutStart = false;
_.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_count = 0;
_.com_google_gwt_i18n_client_DateTimeFormat$PatternPart_text = null;
function com_google_gwt_i18n_client_DefaultDateTimeFormatInfo(){
}

_ = com_google_gwt_i18n_client_DefaultDateTimeFormatInfo.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_i18n_client_DefaultDateTimeFormatInfo_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1DefaultDateTimeFormatInfo_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_i18n_client_LocaleInfo_$clinit__V(){
  com_google_gwt_i18n_client_LocaleInfo_$clinit__V = nullMethod;
  com_google_gwt_i18n_client_LocaleInfo_instance = new com_google_gwt_i18n_client_LocaleInfo_LocaleInfo__Lcom_google_gwt_i18n_client_impl_LocaleInfoImpl_2Lcom_google_gwt_i18n_client_impl_CldrImpl_2V;
}

function com_google_gwt_i18n_client_LocaleInfo_$getDateTimeFormatInfo__Lcom_google_gwt_i18n_client_LocaleInfo_2Lcom_google_gwt_i18n_client_DateTimeFormatInfo_2(this$static){
  !this$static.com_google_gwt_i18n_client_LocaleInfo_dateTimeFormatInfo && (this$static.com_google_gwt_i18n_client_LocaleInfo_dateTimeFormatInfo = new com_google_gwt_i18n_client_impl_cldr_DateTimeFormatInfoImpl_DateTimeFormatInfoImpl__V);
  return this$static.com_google_gwt_i18n_client_LocaleInfo_dateTimeFormatInfo;
}

function com_google_gwt_i18n_client_LocaleInfo_LocaleInfo__Lcom_google_gwt_i18n_client_impl_LocaleInfoImpl_2Lcom_google_gwt_i18n_client_impl_CldrImpl_2V(){
}

function com_google_gwt_i18n_client_LocaleInfo(){
}

_ = com_google_gwt_i18n_client_LocaleInfo_LocaleInfo__Lcom_google_gwt_i18n_client_impl_LocaleInfoImpl_2Lcom_google_gwt_i18n_client_impl_CldrImpl_2V.prototype = com_google_gwt_i18n_client_LocaleInfo.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_i18n_client_LocaleInfo_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1LocaleInfo_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_i18n_client_LocaleInfo_dateTimeFormatInfo = null;
var com_google_gwt_i18n_client_LocaleInfo_instance;
function com_google_gwt_i18n_client_TimeZone_$getISOTimeZoneString__Lcom_google_gwt_i18n_client_TimeZone_2Ljava_util_Date_2Ljava_lang_String_2(this$static){
  var data, offset;
  offset = -this$static.com_google_gwt_i18n_client_TimeZone_standardOffset;
  data = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13C_1classLit, {23:1}, -1, [43, 48, 48, 58, 48, 48]);
  if (offset < 0) {
    data[0] = 45;
    offset = -offset;
  }
  data[1] += ~~(~~(offset / 60) / 10);
  data[2] += ~~(offset / 60) % 10;
  data[4] += ~~(offset % 60 / 10);
  data[5] += offset % 10;
  return String.fromCharCode.apply(null, data);
}

function com_google_gwt_i18n_client_TimeZone_$getRFCTimeZoneString__Lcom_google_gwt_i18n_client_TimeZone_2Ljava_util_Date_2Ljava_lang_String_2(this$static){
  var data, offset;
  offset = -this$static.com_google_gwt_i18n_client_TimeZone_standardOffset;
  data = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13C_1classLit, {23:1}, -1, [43, 48, 48, 48, 48]);
  if (offset < 0) {
    data[0] = 45;
    offset = -offset;
  }
  data[1] += ~~(~~(offset / 60) / 10);
  data[2] += ~~(offset / 60) % 10;
  data[3] += ~~(offset % 60 / 10);
  data[4] += offset % 10;
  return String.fromCharCode.apply(null, data);
}

function com_google_gwt_i18n_client_TimeZone_TimeZone__V(){
}

function com_google_gwt_i18n_client_TimeZone_composeGMTString__ILjava_lang_String_2(offset){
  var data;
  data = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13C_1classLit, {23:1}, -1, [71, 77, 84, 45, 48, 48, 58, 48, 48]);
  if (offset <= 0) {
    data[3] = 43;
    offset = -offset;
  }
  data[4] += ~~(~~(offset / 60) / 10);
  data[5] += ~~(offset / 60) % 10;
  data[7] += ~~(offset % 60 / 10);
  data[8] += offset % 10;
  return String.fromCharCode.apply(null, data);
}

function com_google_gwt_i18n_client_TimeZone_composePOSIXTimeZoneID__ILjava_lang_String_2(offset){
  var str;
  if (offset == 0) {
    return $intern_242;
  }
  if (offset < 0) {
    offset = -offset;
    str = $intern_243;
  }
   else {
    str = $intern_244;
  }
  return str + com_google_gwt_i18n_client_TimeZone_offsetDisplay__ILjava_lang_String_2(offset);
}

function com_google_gwt_i18n_client_TimeZone_composeUTCString__ILjava_lang_String_2(offset){
  var str;
  if (offset == 0) {
    return $intern_241;
  }
  if (offset < 0) {
    offset = -offset;
    str = $intern_245;
  }
   else {
    str = $intern_246;
  }
  return str + com_google_gwt_i18n_client_TimeZone_offsetDisplay__ILjava_lang_String_2(offset);
}

function com_google_gwt_i18n_client_TimeZone_createTimeZone__ILcom_google_gwt_i18n_client_TimeZone_2(timeZoneOffsetInMinutes){
  var tz;
  tz = new com_google_gwt_i18n_client_TimeZone_TimeZone__V;
  tz.com_google_gwt_i18n_client_TimeZone_standardOffset = timeZoneOffsetInMinutes;
  tz.com_google_gwt_i18n_client_TimeZone_timezoneID = com_google_gwt_i18n_client_TimeZone_composePOSIXTimeZoneID__ILjava_lang_String_2(timeZoneOffsetInMinutes);
  tz.com_google_gwt_i18n_client_TimeZone_tzNames = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, 2, 0);
  tz.com_google_gwt_i18n_client_TimeZone_tzNames[0] = com_google_gwt_i18n_client_TimeZone_composeUTCString__ILjava_lang_String_2(timeZoneOffsetInMinutes);
  tz.com_google_gwt_i18n_client_TimeZone_tzNames[1] = com_google_gwt_i18n_client_TimeZone_composeUTCString__ILjava_lang_String_2(timeZoneOffsetInMinutes);
  return tz;
}

function com_google_gwt_i18n_client_TimeZone_offsetDisplay__ILjava_lang_String_2(offset){
  var hour, mins;
  hour = ~~(offset / 60);
  mins = offset % 60;
  if (mins == 0) {
    return $intern_16 + hour;
  }
  return $intern_16 + hour + $intern_142 + mins;
}

function com_google_gwt_i18n_client_TimeZone(){
}

_ = com_google_gwt_i18n_client_TimeZone_TimeZone__V.prototype = com_google_gwt_i18n_client_TimeZone.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_i18n_client_TimeZone_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1TimeZone_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_i18n_client_TimeZone_standardOffset = 0;
_.com_google_gwt_i18n_client_TimeZone_timezoneID = null;
_.com_google_gwt_i18n_client_TimeZone_tzNames = null;
function java_util_Date_$before__Ljava_util_Date_2Ljava_util_Date_2Z(this$static, when){
  return !com_google_gwt_lang_LongLib_gte__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(this$static.java_util_Date_jsdate.getTime()), com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(when.java_util_Date_jsdate.getTime()));
}

function java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(this$static, hours){
  var badHours, copy, day, newTime, timeDiff, timeDiffHours, timeDiffMinutes;
  if (this$static.java_util_Date_jsdate.getHours() % 24 != hours % 24) {
    copy = new Date(this$static.java_util_Date_jsdate.getTime());
    copy.setDate(copy.getDate() + 1);
    timeDiff = this$static.java_util_Date_jsdate.getTimezoneOffset() - copy.getTimezoneOffset();
    if (timeDiff > 0) {
      timeDiffHours = ~~(timeDiff / 60);
      timeDiffMinutes = timeDiff % 60;
      day = this$static.java_util_Date_jsdate.getDate();
      badHours = this$static.java_util_Date_jsdate.getHours();
      badHours + timeDiffHours >= 24 && ++day;
      newTime = new Date(this$static.java_util_Date_jsdate.getFullYear(), this$static.java_util_Date_jsdate.getMonth(), day, hours + timeDiffHours, this$static.java_util_Date_jsdate.getMinutes() + timeDiffMinutes, this$static.java_util_Date_jsdate.getSeconds(), this$static.java_util_Date_jsdate.getMilliseconds());
      this$static.java_util_Date_jsdate.setTime(newTime.getTime());
    }
  }
}

function java_util_Date_$setDate__Ljava_util_Date_2IV(this$static, date){
  var hours;
  hours = this$static.java_util_Date_jsdate.getHours();
  this$static.java_util_Date_jsdate.setDate(date);
  java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(this$static, hours);
}

function java_util_Date_$setTime__Ljava_util_Date_2JV(this$static, time){
  this$static.java_util_Date_jsdate.setTime(com_google_gwt_lang_LongLib_toDouble__Lcom_google_gwt_lang_LongLibBase$LongEmul_2D(time));
}

function java_util_Date_Date__V(){
  this.java_util_Date_jsdate = new Date;
}

function java_util_Date_Date__IIIV(year, month, date){
  this.java_util_Date_jsdate = new Date;
  this.java_util_Date_jsdate.setFullYear(year + 1900, month, date);
  this.java_util_Date_jsdate.setHours(0, 0, 0, 0);
  java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(this, 0);
}

function java_util_Date_Date__JV(date){
  this.java_util_Date_jsdate = new Date(com_google_gwt_lang_LongLib_toDouble__Lcom_google_gwt_lang_LongLibBase$LongEmul_2D(date));
}

function java_util_Date_padTwo__ILjava_lang_String_2(number){
  return number < 10?$intern_90 + number:$intern_16 + number;
}

function java_util_Date(){
}

_ = java_util_Date_Date__JV.prototype = java_util_Date_Date__IIIV.prototype = java_util_Date_Date__V.prototype = java_util_Date.prototype = new java_lang_Object;
_.equals__Ljava_lang_Object_2Z$ = function java_util_Date_equals__Ljava_lang_Object_2Z(obj){
  return obj != null && obj.java_lang_Object_castableTypeMap$ && !!obj.java_lang_Object_castableTypeMap$[30] && com_google_gwt_lang_LongLib_eq__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(this.java_util_Date_jsdate.getTime()), com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(obj, 30).java_util_Date_jsdate.getTime()));
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_Date_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Date_12_1classLit;
}
;
_.hashCode__I$ = function java_util_Date_hashCode__I(){
  var time;
  time = com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(this.java_util_Date_jsdate.getTime());
  return com_google_gwt_lang_LongLib_toInt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(com_google_gwt_lang_LongLib_xor__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(time, com_google_gwt_lang_LongLib_shru__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(time, 32)));
}
;
_.setHours__IV = function java_util_Date_setHours__IV(hours){
  this.java_util_Date_jsdate.setHours(hours);
  java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(this, hours);
}
;
_.setMinutes__IV = function java_util_Date_setMinutes__IV(minutes){
  var hours;
  hours = this.java_util_Date_jsdate.getHours() + ~~(minutes / 60);
  this.java_util_Date_jsdate.setMinutes(minutes);
  java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(this, hours);
}
;
_.setMonth__IV = function java_util_Date_setMonth__IV(month){
  var hours;
  hours = this.java_util_Date_jsdate.getHours();
  this.java_util_Date_jsdate.setMonth(month);
  java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(this, hours);
}
;
_.setSeconds__IV = function java_util_Date_setSeconds__IV(seconds){
  var hours;
  hours = this.java_util_Date_jsdate.getHours() + ~~(seconds / 3600);
  this.java_util_Date_jsdate.setSeconds(seconds);
  java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(this, hours);
}
;
_.setYear__IV = function java_util_Date_setYear__IV(year){
  var hours;
  hours = this.java_util_Date_jsdate.getHours();
  this.java_util_Date_jsdate.setFullYear(year + 1900);
  java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(this, hours);
}
;
_.toString__Ljava_lang_String_2$ = function java_util_Date_toString__Ljava_lang_String_2(){
  var hourOffset, minuteOffset, offset;
  offset = -this.java_util_Date_jsdate.getTimezoneOffset();
  hourOffset = (offset >= 0?$intern_171:$intern_16) + ~~(offset / 60);
  minuteOffset = (offset < 0?-offset:offset) % 60 < 10?$intern_90 + (offset < 0?-offset:offset) % 60:$intern_16 + (offset < 0?-offset:offset) % 60;
  return (java_util_Date$StringData_$clinit__V() , java_util_Date$StringData_DAYS)[this.java_util_Date_jsdate.getDay()] + $intern_207 + java_util_Date$StringData_MONTHS[this.java_util_Date_jsdate.getMonth()] + $intern_207 + java_util_Date_padTwo__ILjava_lang_String_2(this.java_util_Date_jsdate.getDate()) + $intern_207 + java_util_Date_padTwo__ILjava_lang_String_2(this.java_util_Date_jsdate.getHours()) + $intern_142 + java_util_Date_padTwo__ILjava_lang_String_2(this.java_util_Date_jsdate.getMinutes()) + $intern_142 + java_util_Date_padTwo__ILjava_lang_String_2(this.java_util_Date_jsdate.getSeconds()) + $intern_247 + hourOffset + minuteOffset + $intern_207 + this.java_util_Date_jsdate.getFullYear();
}
;
_.java_lang_Object_castableTypeMap$ = {23:1, 25:1, 30:1};
_.java_util_Date_jsdate = null;
function com_google_gwt_i18n_client_impl_DateRecord_$calcDate__Lcom_google_gwt_i18n_client_impl_DateRecord_2Ljava_util_Date_2ZZ(this$static, date){
  var adjustment, daysInCurrentMonth, defaultCenturyStart, offset, orgDayOfMonth, orgMonth, tmp, java_util_Date_$setDate__Ljava_util_Date_2IV_hours_0, java_util_Date_$setDate__Ljava_util_Date_2IV_hours_1, java_util_Date_$setDate__Ljava_util_Date_2IV_hours_2;
  this$static.com_google_gwt_i18n_client_impl_DateRecord_era == 0 && this$static.com_google_gwt_i18n_client_impl_DateRecord_year > 0 && (this$static.com_google_gwt_i18n_client_impl_DateRecord_year = -(this$static.com_google_gwt_i18n_client_impl_DateRecord_year - 1));
  this$static.com_google_gwt_i18n_client_impl_DateRecord_year > -2147483648 && date.setYear__IV(this$static.com_google_gwt_i18n_client_impl_DateRecord_year - 1900);
  orgDayOfMonth = date.java_util_Date_jsdate.getDate();
  java_util_Date_$setDate__Ljava_util_Date_2IV_hours_0 = date.java_util_Date_jsdate.getHours();
  date.java_util_Date_jsdate.setDate(1);
  java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(date, java_util_Date_$setDate__Ljava_util_Date_2IV_hours_0);
  this$static.com_google_gwt_i18n_client_impl_DateRecord_month >= 0 && date.setMonth__IV(this$static.com_google_gwt_i18n_client_impl_DateRecord_month);
  if (this$static.com_google_gwt_i18n_client_impl_DateRecord_dayOfMonth >= 0) {
    java_util_Date_$setDate__Ljava_util_Date_2IV(date, this$static.com_google_gwt_i18n_client_impl_DateRecord_dayOfMonth);
  }
   else if (this$static.com_google_gwt_i18n_client_impl_DateRecord_month >= 0) {
    tmp = new java_util_Date_Date__IIIV(date.java_util_Date_jsdate.getFullYear() - 1900, date.java_util_Date_jsdate.getMonth(), 35);
    daysInCurrentMonth = 35 - tmp.java_util_Date_jsdate.getDate();
    java_util_Date_$setDate__Ljava_util_Date_2IV_hours_1 = date.java_util_Date_jsdate.getHours();
    date.java_util_Date_jsdate.setDate(daysInCurrentMonth < orgDayOfMonth?daysInCurrentMonth:orgDayOfMonth);
    java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(date, java_util_Date_$setDate__Ljava_util_Date_2IV_hours_1);
  }
   else {
    java_util_Date_$setDate__Ljava_util_Date_2IV_hours_2 = date.java_util_Date_jsdate.getHours();
    date.java_util_Date_jsdate.setDate(orgDayOfMonth);
    java_util_Date_$fixDaylightSavings__Ljava_util_Date_2IV(date, java_util_Date_$setDate__Ljava_util_Date_2IV_hours_2);
  }
  this$static.com_google_gwt_i18n_client_impl_DateRecord_hours < 0 && (this$static.com_google_gwt_i18n_client_impl_DateRecord_hours = date.java_util_Date_jsdate.getHours());
  this$static.com_google_gwt_i18n_client_impl_DateRecord_ampm > 0 && this$static.com_google_gwt_i18n_client_impl_DateRecord_hours < 12 && (this$static.com_google_gwt_i18n_client_impl_DateRecord_hours += 12);
  date.setHours__IV(this$static.com_google_gwt_i18n_client_impl_DateRecord_hours);
  this$static.com_google_gwt_i18n_client_impl_DateRecord_minutes >= 0 && date.setMinutes__IV(this$static.com_google_gwt_i18n_client_impl_DateRecord_minutes);
  this$static.com_google_gwt_i18n_client_impl_DateRecord_seconds >= 0 && date.setSeconds__IV(this$static.com_google_gwt_i18n_client_impl_DateRecord_seconds);
  this$static.com_google_gwt_i18n_client_impl_DateRecord_milliseconds >= 0 && java_util_Date_$setTime__Ljava_util_Date_2JV(date, com_google_gwt_lang_LongLib_add__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLib_mul__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLibBase_divMod__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZLcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(date.java_util_Date_jsdate.getTime()), P3e8_longLit, false), P3e8_longLit), com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(this$static.com_google_gwt_i18n_client_impl_DateRecord_milliseconds)));
  if (this$static.com_google_gwt_i18n_client_impl_DateRecord_ambiguousYear) {
    defaultCenturyStart = new java_util_Date_Date__V;
    defaultCenturyStart.setYear__IV(defaultCenturyStart.java_util_Date_jsdate.getFullYear() - 1900 - 80);
    !com_google_gwt_lang_LongLib_gte__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(date.java_util_Date_jsdate.getTime()), com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(defaultCenturyStart.java_util_Date_jsdate.getTime())) && date.setYear__IV(defaultCenturyStart.java_util_Date_jsdate.getFullYear() - 1900 + 100);
  }
  if (this$static.com_google_gwt_i18n_client_impl_DateRecord_dayOfWeek >= 0) {
    if (this$static.com_google_gwt_i18n_client_impl_DateRecord_dayOfMonth == -1) {
      adjustment = (7 + this$static.com_google_gwt_i18n_client_impl_DateRecord_dayOfWeek - date.java_util_Date_jsdate.getDay()) % 7;
      adjustment > 3 && (adjustment -= 7);
      orgMonth = date.java_util_Date_jsdate.getMonth();
      java_util_Date_$setDate__Ljava_util_Date_2IV(date, date.java_util_Date_jsdate.getDate() + adjustment);
      date.java_util_Date_jsdate.getMonth() != orgMonth && java_util_Date_$setDate__Ljava_util_Date_2IV(date, date.java_util_Date_jsdate.getDate() + (adjustment > 0?-7:7));
    }
     else {
      if (date.java_util_Date_jsdate.getDay() != this$static.com_google_gwt_i18n_client_impl_DateRecord_dayOfWeek) {
        return false;
      }
    }
  }
  if (this$static.com_google_gwt_i18n_client_impl_DateRecord_tzOffset > -2147483648) {
    offset = date.java_util_Date_jsdate.getTimezoneOffset();
    java_util_Date_$setTime__Ljava_util_Date_2JV(date, com_google_gwt_lang_LongLib_add__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(date.java_util_Date_jsdate.getTime()), com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2((this$static.com_google_gwt_i18n_client_impl_DateRecord_tzOffset - offset) * 60 * 1000)));
  }
  return true;
}

function com_google_gwt_i18n_client_impl_DateRecord_DateRecord__V(){
  this.java_util_Date_jsdate = new Date;
  this.com_google_gwt_i18n_client_impl_DateRecord_era = -1;
  this.com_google_gwt_i18n_client_impl_DateRecord_ambiguousYear = false;
  this.com_google_gwt_i18n_client_impl_DateRecord_year = -2147483648;
  this.com_google_gwt_i18n_client_impl_DateRecord_month = -1;
  this.com_google_gwt_i18n_client_impl_DateRecord_dayOfMonth = -1;
  this.com_google_gwt_i18n_client_impl_DateRecord_ampm = -1;
  this.com_google_gwt_i18n_client_impl_DateRecord_hours = -1;
  this.com_google_gwt_i18n_client_impl_DateRecord_minutes = -1;
  this.com_google_gwt_i18n_client_impl_DateRecord_seconds = -1;
  this.com_google_gwt_i18n_client_impl_DateRecord_milliseconds = -1;
  this.com_google_gwt_i18n_client_impl_DateRecord_dayOfWeek = -1;
  this.com_google_gwt_i18n_client_impl_DateRecord_tzOffset = -2147483648;
}

function com_google_gwt_i18n_client_impl_DateRecord(){
}

_ = com_google_gwt_i18n_client_impl_DateRecord_DateRecord__V.prototype = com_google_gwt_i18n_client_impl_DateRecord.prototype = new java_util_Date;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_i18n_client_impl_DateRecord_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1impl_1DateRecord_12_1classLit;
}
;
_.setHours__IV = function com_google_gwt_i18n_client_impl_DateRecord_setHours__IV(hours){
  this.com_google_gwt_i18n_client_impl_DateRecord_hours = hours;
}
;
_.setMinutes__IV = function com_google_gwt_i18n_client_impl_DateRecord_setMinutes__IV(minutes){
  this.com_google_gwt_i18n_client_impl_DateRecord_minutes = minutes;
}
;
_.setMonth__IV = function com_google_gwt_i18n_client_impl_DateRecord_setMonth__IV(month){
  this.com_google_gwt_i18n_client_impl_DateRecord_month = month;
}
;
_.setSeconds__IV = function com_google_gwt_i18n_client_impl_DateRecord_setSeconds__IV(seconds){
  this.com_google_gwt_i18n_client_impl_DateRecord_seconds = seconds;
}
;
_.setYear__IV = function com_google_gwt_i18n_client_impl_DateRecord_setYear__IV(value){
  this.com_google_gwt_i18n_client_impl_DateRecord_year = value;
}
;
_.java_lang_Object_castableTypeMap$ = {23:1, 25:1, 30:1};
_.com_google_gwt_i18n_client_impl_DateRecord_ambiguousYear = false;
_.com_google_gwt_i18n_client_impl_DateRecord_ampm = 0;
_.com_google_gwt_i18n_client_impl_DateRecord_dayOfMonth = 0;
_.com_google_gwt_i18n_client_impl_DateRecord_dayOfWeek = 0;
_.com_google_gwt_i18n_client_impl_DateRecord_era = 0;
_.com_google_gwt_i18n_client_impl_DateRecord_hours = 0;
_.com_google_gwt_i18n_client_impl_DateRecord_milliseconds = 0;
_.com_google_gwt_i18n_client_impl_DateRecord_minutes = 0;
_.com_google_gwt_i18n_client_impl_DateRecord_month = 0;
_.com_google_gwt_i18n_client_impl_DateRecord_seconds = 0;
_.com_google_gwt_i18n_client_impl_DateRecord_tzOffset = 0;
_.com_google_gwt_i18n_client_impl_DateRecord_year = 0;
function com_google_gwt_i18n_client_impl_cldr_DateTimeFormatInfoImpl_DateTimeFormatInfoImpl__V(){
}

function com_google_gwt_i18n_client_impl_cldr_DateTimeFormatInfoImpl(){
}

_ = com_google_gwt_i18n_client_impl_cldr_DateTimeFormatInfoImpl_DateTimeFormatInfoImpl__V.prototype = com_google_gwt_i18n_client_impl_cldr_DateTimeFormatInfoImpl.prototype = new com_google_gwt_i18n_client_DefaultDateTimeFormatInfo;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_i18n_client_impl_cldr_DateTimeFormatInfoImpl_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1impl_1cldr_1DateTimeFormatInfoImpl_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_lang_Array_Array__V(){
}

function com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2(array, length){
  var a, result;
  a = array;
  result = com_google_gwt_lang_Array_createFromSeed__IILcom_google_gwt_lang_Array_2(0, length);
  com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(a.com_google_gwt_lang_Array_arrayClass$, a.java_lang_Object_castableTypeMap$, a.com_google_gwt_lang_Array_queryId$, result);
  return result;
}

function com_google_gwt_lang_Array_createFromSeed__IILcom_google_gwt_lang_Array_2(seedType, length){
  var array = new Array(length);
  if (seedType == 3) {
    for (var i = 0; i < length; ++i) {
      var value = new Object;
      value.l = value.m = value.h = 0;
      array[i] = value;
    }
  }
   else if (seedType > 0) {
    var value = [null, 0, false][seedType];
    for (var i = 0; i < length; ++i) {
      array[i] = value;
    }
  }
  return array;
}

function com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(arrayClass, castableTypeMap, queryId, length, seedType){
  var result;
  result = com_google_gwt_lang_Array_createFromSeed__IILcom_google_gwt_lang_Array_2(seedType, length);
  com_google_gwt_lang_Array$ExpandoWrapper_$clinit__V();
  com_google_gwt_lang_Array$ExpandoWrapper_wrapArray__Lcom_google_gwt_lang_Array_2Ljava_lang_Object_2Ljava_lang_Object_2V(result, com_google_gwt_lang_Array$ExpandoWrapper_expandoNames, com_google_gwt_lang_Array$ExpandoWrapper_expandoValues);
  result.com_google_gwt_lang_Array_arrayClass$ = arrayClass;
  result.java_lang_Object_castableTypeMap$ = castableTypeMap;
  result.com_google_gwt_lang_Array_queryId$ = queryId;
  return result;
}

function com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(arrayClass, castableTypeMap, queryId, array){
  com_google_gwt_lang_Array$ExpandoWrapper_$clinit__V();
  com_google_gwt_lang_Array$ExpandoWrapper_wrapArray__Lcom_google_gwt_lang_Array_2Ljava_lang_Object_2Ljava_lang_Object_2V(array, com_google_gwt_lang_Array$ExpandoWrapper_expandoNames, com_google_gwt_lang_Array$ExpandoWrapper_expandoValues);
  array.com_google_gwt_lang_Array_arrayClass$ = arrayClass;
  array.java_lang_Object_castableTypeMap$ = castableTypeMap;
  array.com_google_gwt_lang_Array_queryId$ = queryId;
  return array;
}

function com_google_gwt_lang_Array_setCheck__Lcom_google_gwt_lang_Array_2ILjava_lang_Object_2Ljava_lang_Object_2(array, index, value){
  if (value != null) {
    if (array.com_google_gwt_lang_Array_queryId$ > 0 && !com_google_gwt_lang_Cast_canCastUnsafe__Ljava_lang_Object_2IZ(value, array.com_google_gwt_lang_Array_queryId$)) {
      throw new java_lang_ArrayStoreException_ArrayStoreException__V;
    }
    if (array.com_google_gwt_lang_Array_queryId$ < 0 && (value.java_lang_Object_typeMarker$ == nullMethod || value.java_lang_Object_castableTypeMap$ && !!value.java_lang_Object_castableTypeMap$[1])) {
      throw new java_lang_ArrayStoreException_ArrayStoreException__V;
    }
  }
  return array[index] = value;
}

function com_google_gwt_lang_Array(){
}

_ = com_google_gwt_lang_Array_Array__V.prototype = com_google_gwt_lang_Array.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_lang_Array_getClass__Ljava_lang_Class_2(){
  return this.com_google_gwt_lang_Array_arrayClass$;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.com_google_gwt_lang_Array_arrayClass$ = null;
_.com_google_gwt_lang_Array_queryId$ = 0;
function com_google_gwt_lang_Array$ExpandoWrapper_$clinit__V(){
  com_google_gwt_lang_Array$ExpandoWrapper_$clinit__V = nullMethod;
  com_google_gwt_lang_Array$ExpandoWrapper_expandoNames = [];
  com_google_gwt_lang_Array$ExpandoWrapper_expandoValues = [];
  com_google_gwt_lang_Array$ExpandoWrapper_initExpandos__Lcom_google_gwt_lang_Array_2Ljava_lang_Object_2Ljava_lang_Object_2V(new com_google_gwt_lang_Array_Array__V, com_google_gwt_lang_Array$ExpandoWrapper_expandoNames, com_google_gwt_lang_Array$ExpandoWrapper_expandoValues);
}

function com_google_gwt_lang_Array$ExpandoWrapper_initExpandos__Lcom_google_gwt_lang_Array_2Ljava_lang_Object_2Ljava_lang_Object_2V(protoType, expandoNames, expandoValues){
  var i = 0, value;
  for (var name in protoType) {
    if (value = protoType[name]) {
      expandoNames[i] = name;
      expandoValues[i] = value;
      ++i;
    }
  }
}

function com_google_gwt_lang_Array$ExpandoWrapper_wrapArray__Lcom_google_gwt_lang_Array_2Ljava_lang_Object_2Ljava_lang_Object_2V(array, expandoNames, expandoValues){
  com_google_gwt_lang_Array$ExpandoWrapper_$clinit__V();
  for (var i = 0, c = expandoNames.length; i < c; ++i) {
    array[expandoNames[i]] = expandoValues[i];
  }
}

var com_google_gwt_lang_Array$ExpandoWrapper_expandoNames, com_google_gwt_lang_Array$ExpandoWrapper_expandoValues;
function com_google_gwt_lang_Cast_canCastUnsafe__Ljava_lang_Object_2IZ(src, dstId){
  return src.java_lang_Object_castableTypeMap$ && src.java_lang_Object_castableTypeMap$[dstId];
}

function com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(src, dstId){
  if (src != null && !(src.java_lang_Object_castableTypeMap$ && src.java_lang_Object_castableTypeMap$[dstId])) {
    throw new java_lang_ClassCastException_ClassCastException__V;
  }
  return src;
}

function com_google_gwt_lang_Cast_dynamicCastJso__Ljava_lang_Object_2Ljava_lang_Object_2(src){
  if (src != null && (src.java_lang_Object_typeMarker$ == nullMethod || src.java_lang_Object_castableTypeMap$ && !!src.java_lang_Object_castableTypeMap$[1])) {
    throw new java_lang_ClassCastException_ClassCastException__V;
  }
  return src;
}

function com_google_gwt_lang_Cast_instanceOf__Ljava_lang_Object_2IZ(src, dstId){
  return src != null && src.java_lang_Object_castableTypeMap$ && !!src.java_lang_Object_castableTypeMap$[dstId];
}

function com_google_gwt_lang_Cast_instanceOfJso__Ljava_lang_Object_2Z(src){
  return src != null && src.java_lang_Object_typeMarker$ != nullMethod && !(src.java_lang_Object_castableTypeMap$ && !!src.java_lang_Object_castableTypeMap$[1]);
}

function com_google_gwt_lang_Cast_round_1int__DI(x){
  return ~~Math.max(Math.min(x, 2147483647), -2147483648);
}

function com_google_gwt_lang_Cast_throwClassCastExceptionUnlessNull__Ljava_lang_Object_2Ljava_lang_Object_2(o){
  if (o != null) {
    throw new java_lang_ClassCastException_ClassCastException__V;
  }
  return null;
}

function com_google_gwt_lang_EntryMethodHolder_init__V(){
  !!$stats && $stats({moduleName:$moduleName, sessionId:$sessionId, subSystem:$intern_248, evtGroup:$intern_249, millis:(new Date).getTime(), type:$intern_250, className:$intern_251});
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_exports__V();
  com_broceliand_pearlbar_gwt_client_background_firefox_ServerConfig_exports__V();
  com_broceliand_pearlbar_gwt_client_background_firefox_BackgroundServerConfig_exports__V();
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_$clinit__V();
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_exports__V();
  com_broceliand_pearlbar_gwt_client_background_firefox_PromotionPoller_exports__V();
  $wnd.setButtonIcon = $entry(com_broceliand_pearlbar_gwt_client_background_firefox_MainButton_setIcon__ZZV);
  com_broceliand_pearlbar_gwt_client_background_firefox_ContextMenus_exports__V();
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_userTrees = (com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , com_broceliand_pearlbar_gwt_client_common_UserTrees_$clinit__V() , $wnd.refreshTrees = $entry(com_broceliand_pearlbar_gwt_client_common_UserTrees_refreshTrees__ZV) , com_broceliand_pearlbar_gwt_client_common_UserTrees_getLocalStorageUserTrees__Lcom_broceliand_pearlbar_gwt_client_common_UserTrees_2());
  com_broceliand_pearlbar_gwt_client_common_UserTrees_refreshTrees__ZV(false);
  com_broceliand_pearlbar_gwt_client_background_firefox_AppState_checkFirstRun__V();
  com_broceliand_pearlbar_gwt_client_background_firefox_BrowserTab_sendStatsIfNeeded__V();
}

function com_google_gwt_lang_Exceptions_caught__Ljava_lang_Object_2Ljava_lang_Object_2(e){
  if (e != null && e.java_lang_Object_castableTypeMap$ && !!e.java_lang_Object_castableTypeMap$[7]) {
    return e;
  }
  return new com_google_gwt_core_client_JavaScriptException_JavaScriptException__Ljava_lang_Object_2V(e);
}

function com_google_gwt_lang_LongLibBase_create__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(value){
  var a0, a1, a2;
  a0 = value & 4194303;
  a1 = ~~value >> 22 & 4194303;
  a2 = value < 0?1048575:0;
  return a = new com_google_gwt_lang_LongLibBase$LongEmul_LongLibBase$LongEmul__V , a.l = a0 , a.m = a1 , a.h = a2 , a;
}

function com_google_gwt_lang_LongLibBase_create__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a){
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(a.l, a.m, a.h);
}

function com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(l, m, h){
  return a = new com_google_gwt_lang_LongLibBase$LongEmul_LongLibBase$LongEmul__V , a.l = l , a.m = m , a.h = h , a;
}

function com_google_gwt_lang_LongLibBase_divMod__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZLcom_google_gwt_lang_LongLibBase$LongEmul_2(a, b, computeRemainder){
  var aIsCopy, aIsMinValue, aIsNegative, bpower, c, negative;
  if (b.l == 0 && b.m == 0 && b.h == 0) {
    throw new java_lang_ArithmeticException_ArithmeticException__Ljava_lang_String_2V;
  }
  if (a.l == 0 && a.m == 0 && a.h == 0) {
    computeRemainder && (com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(0, 0, 0));
    return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(0, 0, 0);
  }
  if (b.h == 524288 && b.m == 0 && b.l == 0) {
    return com_google_gwt_lang_LongLibBase_divModByMinValue__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZLcom_google_gwt_lang_LongLibBase$LongEmul_2(a, computeRemainder);
  }
  negative = false;
  if (~~b.h >> 19 != 0) {
    b = com_google_gwt_lang_LongLib_neg__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(b);
    negative = true;
  }
  bpower = com_google_gwt_lang_LongLibBase_powerOfTwo__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(b);
  aIsNegative = false;
  aIsMinValue = false;
  aIsCopy = false;
  if (a.h == 524288 && a.m == 0 && a.l == 0) {
    aIsMinValue = true;
    aIsNegative = true;
    if (bpower == -1) {
      a = com_google_gwt_lang_LongLibBase_create__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2((com_google_gwt_lang_LongLib$Const_$clinit__V() , com_google_gwt_lang_LongLib$Const_MAX_1VALUE));
      aIsCopy = true;
      negative = !negative;
    }
     else {
      c = com_google_gwt_lang_LongLib_shr__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(a, bpower);
      negative && com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V(c);
      computeRemainder && (com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(0, 0, 0));
      return c;
    }
  }
   else if (~~a.h >> 19 != 0) {
    aIsNegative = true;
    a = com_google_gwt_lang_LongLib_neg__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a);
    aIsCopy = true;
    negative = !negative;
  }
  if (bpower != -1) {
    return com_google_gwt_lang_LongLibBase_divModByShift__Lcom_google_gwt_lang_LongLibBase$LongEmul_2IZZZLcom_google_gwt_lang_LongLibBase$LongEmul_2(a, bpower, negative, aIsNegative, computeRemainder);
  }
  if (!com_google_gwt_lang_LongLib_gte__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(a, b)) {
    computeRemainder && (aIsNegative?(com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLib_neg__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a)):(com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(a.l, a.m, a.h)));
    return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(0, 0, 0);
  }
  return com_google_gwt_lang_LongLibBase_divModHelper__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZZZZLcom_google_gwt_lang_LongLibBase$LongEmul_2(aIsCopy?a:com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(a.l, a.m, a.h), b, negative, aIsNegative, aIsMinValue, computeRemainder);
}

function com_google_gwt_lang_LongLibBase_divModByMinValue__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZLcom_google_gwt_lang_LongLibBase$LongEmul_2(a, computeRemainder){
  if (a.h == 524288 && a.m == 0 && a.l == 0) {
    computeRemainder && (com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(0, 0, 0));
    return com_google_gwt_lang_LongLibBase_create__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2((com_google_gwt_lang_LongLib$Const_$clinit__V() , com_google_gwt_lang_LongLib$Const_ONE));
  }
  computeRemainder && (com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(a.l, a.m, a.h));
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(0, 0, 0);
}

function com_google_gwt_lang_LongLibBase_divModByShift__Lcom_google_gwt_lang_LongLibBase$LongEmul_2IZZZLcom_google_gwt_lang_LongLibBase$LongEmul_2(a, bpower, negative, aIsNegative, computeRemainder){
  var c;
  c = com_google_gwt_lang_LongLib_shr__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(a, bpower);
  negative && com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V(c);
  if (computeRemainder) {
    a = com_google_gwt_lang_LongLibBase_maskRight__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(a, bpower);
    aIsNegative?(com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLib_neg__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a)):(com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(a.l, a.m, a.h));
  }
  return c;
}

function com_google_gwt_lang_LongLibBase_divModHelper__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZZZZLcom_google_gwt_lang_LongLibBase$LongEmul_2(a, b, negative, aIsNegative, aIsMinValue, computeRemainder){
  var bshift, gte, quotient, shift, com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a0_0, com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a1_0, com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a2_0;
  shift = com_google_gwt_lang_LongLibBase_numberOfLeadingZeros__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(b) - com_google_gwt_lang_LongLibBase_numberOfLeadingZeros__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(a);
  bshift = com_google_gwt_lang_LongLib_shl__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(b, shift);
  quotient = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(0, 0, 0);
  while (shift >= 0) {
    gte = com_google_gwt_lang_LongLibBase_trialSubtract__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(a, bshift);
    if (gte) {
      shift < 22?(quotient.l |= 1 << shift , undefined):shift < 44?(quotient.m |= 1 << shift - 22 , undefined):(quotient.h |= 1 << shift - 44 , undefined);
      if (a.l == 0 && a.m == 0 && a.h == 0) {
        break;
      }
    }
    com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a1_0 = bshift.m;
    com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a2_0 = bshift.h;
    com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a0_0 = bshift.l;
    bshift.h = ~~com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a2_0 >>> 1;
    bshift.m = ~~com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a1_0 >>> 1 | (com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a2_0 & 1) << 21;
    bshift.l = ~~com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a0_0 >>> 1 | (com_google_gwt_lang_LongLibBase_toShru1__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V_a1_0 & 1) << 21;
    --shift;
  }
  negative && com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V(quotient);
  if (computeRemainder) {
    if (aIsNegative) {
      com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLib_neg__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a);
      aIsMinValue && (com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLib_sub__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(com_google_gwt_lang_LongLibBase_remainder, (com_google_gwt_lang_LongLib$Const_$clinit__V() , com_google_gwt_lang_LongLib$Const_ONE)));
    }
     else {
      com_google_gwt_lang_LongLibBase_remainder = com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(a.l, a.m, a.h);
    }
  }
  return quotient;
}

function com_google_gwt_lang_LongLibBase_maskRight__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(a, bits){
  var b0, b1, b2;
  if (bits <= 22) {
    b0 = a.l & (1 << bits) - 1;
    b1 = b2 = 0;
  }
   else if (bits <= 44) {
    b0 = a.l;
    b1 = a.m & (1 << bits - 22) - 1;
    b2 = 0;
  }
   else {
    b0 = a.l;
    b1 = a.m;
    b2 = a.h & (1 << bits - 44) - 1;
  }
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(b0, b1, b2);
}

function com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V(a){
  var neg0, neg1, neg2;
  neg0 = ~a.l + 1 & 4194303;
  neg1 = ~a.m + (neg0 == 0?1:0) & 4194303;
  neg2 = ~a.h + (neg0 == 0 && neg1 == 0?1:0) & 1048575;
  a.l = neg0;
  a.m = neg1;
  a.h = neg2;
}

function com_google_gwt_lang_LongLibBase_numberOfLeadingZeros__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(a){
  var b1, b2;
  b2 = java_lang_Integer_numberOfLeadingZeros__II(a.h);
  if (b2 == 32) {
    b1 = java_lang_Integer_numberOfLeadingZeros__II(a.m);
    return b1 == 32?java_lang_Integer_numberOfLeadingZeros__II(a.l) + 32:b1 + 20 - 10;
  }
   else {
    return b2 - 12;
  }
}

function com_google_gwt_lang_LongLibBase_powerOfTwo__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(a){
  var h, l, m;
  l = a.l;
  if ((l & l - 1) != 0) {
    return -1;
  }
  m = a.m;
  if ((m & m - 1) != 0) {
    return -1;
  }
  h = a.h;
  if ((h & h - 1) != 0) {
    return -1;
  }
  if (h == 0 && m == 0 && l == 0) {
    return -1;
  }
  if (h == 0 && m == 0 && l != 0) {
    return java_lang_Integer_numberOfTrailingZeros__II(l);
  }
  if (h == 0 && m != 0 && l == 0) {
    return java_lang_Integer_numberOfTrailingZeros__II(m) + 22;
  }
  if (h != 0 && m == 0 && l == 0) {
    return java_lang_Integer_numberOfTrailingZeros__II(h) + 44;
  }
  return -1;
}

function com_google_gwt_lang_LongLibBase_toDoubleHelper__Lcom_google_gwt_lang_LongLibBase$LongEmul_2D(a){
  return a.l + a.m * 4194304 + a.h * 17592186044416;
}

function com_google_gwt_lang_LongLibBase_trialSubtract__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(a, b){
  var sum0, sum1, sum2;
  sum2 = a.h - b.h;
  if (sum2 < 0) {
    return false;
  }
  sum0 = a.l - b.l;
  sum1 = a.m - b.m + (~~sum0 >> 22);
  sum2 += ~~sum1 >> 22;
  if (sum2 < 0) {
    return false;
  }
  a.l = sum0 & 4194303;
  a.m = sum1 & 4194303;
  a.h = sum2 & 1048575;
  return true;
}

var com_google_gwt_lang_LongLibBase_remainder = null;
function com_google_gwt_lang_LongLib_add__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a, b){
  var sum0, sum1, sum2;
  sum0 = a.l + b.l;
  sum1 = a.m + b.m + (~~sum0 >> 22);
  sum2 = a.h + b.h + (~~sum1 >> 22);
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(sum0 & 4194303, sum1 & 4194303, sum2 & 1048575);
}

function com_google_gwt_lang_LongLib_eq__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(a, b){
  return a.l == b.l && a.m == b.m && a.h == b.h;
}

function com_google_gwt_lang_LongLib_fromDouble__DLcom_google_gwt_lang_LongLibBase$LongEmul_2(value){
  var a0, a1, a2, negative, result;
  if (isNaN(value)) {
    return com_google_gwt_lang_LongLib$Const_$clinit__V() , com_google_gwt_lang_LongLib$Const_ZERO;
  }
  if (value < -9223372036854775808) {
    return com_google_gwt_lang_LongLib$Const_$clinit__V() , com_google_gwt_lang_LongLib$Const_MIN_1VALUE;
  }
  if (value >= 9223372036854775807) {
    return com_google_gwt_lang_LongLib$Const_$clinit__V() , com_google_gwt_lang_LongLib$Const_MAX_1VALUE;
  }
  negative = false;
  if (value < 0) {
    negative = true;
    value = -value;
  }
  a2 = 0;
  if (value >= 17592186044416) {
    a2 = ~~Math.max(Math.min(value / 17592186044416, 2147483647), -2147483648);
    value -= a2 * 17592186044416;
  }
  a1 = 0;
  if (value >= 4194304) {
    a1 = ~~Math.max(Math.min(value / 4194304, 2147483647), -2147483648);
    value -= a1 * 4194304;
  }
  a0 = ~~Math.max(Math.min(value, 2147483647), -2147483648);
  result = (a = new com_google_gwt_lang_LongLibBase$LongEmul_LongLibBase$LongEmul__V , a.l = a0 , a.m = a1 , a.h = a2 , a);
  negative && com_google_gwt_lang_LongLibBase_negate__Lcom_google_gwt_lang_LongLibBase$LongEmul_2V(result);
  return result;
}

function com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(value){
  var rebase, result;
  if (value > -129 && value < 128) {
    rebase = value + 128;
    com_google_gwt_lang_LongLib_boxedValues == null && (com_google_gwt_lang_LongLib_boxedValues = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Lcom_1google_1gwt_1lang_1LongLibBase$LongEmul_12_1classLit, {23:1}, 22, 256, 0));
    result = com_google_gwt_lang_LongLib_boxedValues[rebase];
    !result && (result = com_google_gwt_lang_LongLib_boxedValues[rebase] = com_google_gwt_lang_LongLibBase_create__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(value));
    return result;
  }
  return com_google_gwt_lang_LongLibBase_create__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(value);
}

function com_google_gwt_lang_LongLib_gt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(a, b){
  var signa, signb;
  signa = ~~a.h >> 19;
  signb = ~~b.h >> 19;
  return signa == 0?signb != 0 || a.h > b.h || a.h == b.h && a.m > b.m || a.h == b.h && a.m == b.m && a.l > b.l:!(signb == 0 || a.h < b.h || a.h == b.h && a.m < b.m || a.h == b.h && a.m == b.m && a.l <= b.l);
}

function com_google_gwt_lang_LongLib_gte__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(a, b){
  var signa, signb;
  signa = ~~a.h >> 19;
  signb = ~~b.h >> 19;
  return signa == 0?signb != 0 || a.h > b.h || a.h == b.h && a.m > b.m || a.h == b.h && a.m == b.m && a.l >= b.l:!(signb == 0 || a.h < b.h || a.h == b.h && a.m < b.m || a.h == b.h && a.m == b.m && a.l < b.l);
}

function com_google_gwt_lang_LongLib_mul__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a, b){
  var a0, a1, a2, a3, a4, b0, b1, b2, b3, b4, c0, c00, c01, c1, c10, c11, c12, c13, c2, c22, c23, c24, p0, p1, p2, p3, p4;
  a0 = a.l & 8191;
  a1 = ~~a.l >> 13 | (a.m & 15) << 9;
  a2 = ~~a.m >> 4 & 8191;
  a3 = ~~a.m >> 17 | (a.h & 255) << 5;
  a4 = ~~(a.h & 1048320) >> 8;
  b0 = b.l & 8191;
  b1 = ~~b.l >> 13 | (b.m & 15) << 9;
  b2 = ~~b.m >> 4 & 8191;
  b3 = ~~b.m >> 17 | (b.h & 255) << 5;
  b4 = ~~(b.h & 1048320) >> 8;
  p0 = a0 * b0;
  p1 = a1 * b0;
  p2 = a2 * b0;
  p3 = a3 * b0;
  p4 = a4 * b0;
  if (b1 != 0) {
    p1 += a0 * b1;
    p2 += a1 * b1;
    p3 += a2 * b1;
    p4 += a3 * b1;
  }
  if (b2 != 0) {
    p2 += a0 * b2;
    p3 += a1 * b2;
    p4 += a2 * b2;
  }
  if (b3 != 0) {
    p3 += a0 * b3;
    p4 += a1 * b3;
  }
  b4 != 0 && (p4 += a0 * b4);
  c00 = p0 & 4194303;
  c01 = (p1 & 511) << 13;
  c0 = c00 + c01;
  c10 = ~~p0 >> 22;
  c11 = ~~p1 >> 9;
  c12 = (p2 & 262143) << 4;
  c13 = (p3 & 31) << 17;
  c1 = c10 + c11 + c12 + c13;
  c22 = ~~p2 >> 18;
  c23 = ~~p3 >> 5;
  c24 = (p4 & 4095) << 8;
  c2 = c22 + c23 + c24;
  c1 += ~~c0 >> 22;
  c0 &= 4194303;
  c2 += ~~c1 >> 22;
  c1 &= 4194303;
  c2 &= 1048575;
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(c0, c1, c2);
}

function com_google_gwt_lang_LongLib_neg__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a){
  var neg0, neg1, neg2;
  neg0 = ~a.l + 1 & 4194303;
  neg1 = ~a.m + (neg0 == 0?1:0) & 4194303;
  neg2 = ~a.h + (neg0 == 0 && neg1 == 0?1:0) & 1048575;
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(neg0, neg1, neg2);
}

function com_google_gwt_lang_LongLib_shl__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(a, n){
  var res0, res1, res2;
  n &= 63;
  if (n < 22) {
    res0 = a.l << n;
    res1 = a.m << n | ~~a.l >> 22 - n;
    res2 = a.h << n | ~~a.m >> 22 - n;
  }
   else if (n < 44) {
    res0 = 0;
    res1 = a.l << n - 22;
    res2 = a.m << n - 22 | ~~a.l >> 44 - n;
  }
   else {
    res0 = 0;
    res1 = 0;
    res2 = a.l << n - 44;
  }
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(res0 & 4194303, res1 & 4194303, res2 & 1048575);
}

function com_google_gwt_lang_LongLib_shr__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(a, n){
  var a2, negative, res0, res1, res2;
  n &= 63;
  a2 = a.h;
  negative = (a2 & 524288) != 0;
  negative && (a2 |= -1048576);
  if (n < 22) {
    res2 = ~~a2 >> n;
    res1 = ~~a.m >> n | a2 << 22 - n;
    res0 = ~~a.l >> n | a.m << 22 - n;
  }
   else if (n < 44) {
    res2 = negative?1048575:0;
    res1 = ~~a2 >> n - 22;
    res0 = ~~a.m >> n - 22 | a2 << 44 - n;
  }
   else {
    res2 = negative?1048575:0;
    res1 = negative?4194303:0;
    res0 = ~~a2 >> n - 44;
  }
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(res0 & 4194303, res1 & 4194303, res2 & 1048575);
}

function com_google_gwt_lang_LongLib_shru__Lcom_google_gwt_lang_LongLibBase$LongEmul_2ILcom_google_gwt_lang_LongLibBase$LongEmul_2(a, n){
  var a2, res0, res1, res2;
  n &= 63;
  a2 = a.h & 1048575;
  if (n < 22) {
    res2 = ~~a2 >>> n;
    res1 = ~~a.m >> n | a2 << 22 - n;
    res0 = ~~a.l >> n | a.m << 22 - n;
  }
   else if (n < 44) {
    res2 = 0;
    res1 = ~~a2 >>> n - 22;
    res0 = ~~a.m >> n - 22 | a.h << 44 - n;
  }
   else {
    res2 = 0;
    res1 = 0;
    res0 = ~~a2 >>> n - 44;
  }
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(res0 & 4194303, res1 & 4194303, res2 & 1048575);
}

function com_google_gwt_lang_LongLib_sub__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a, b){
  var sum0, sum1, sum2;
  sum0 = a.l - b.l;
  sum1 = a.m - b.m + (~~sum0 >> 22);
  sum2 = a.h - b.h + (~~sum1 >> 22);
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(sum0 & 4194303, sum1 & 4194303, sum2 & 1048575);
}

function com_google_gwt_lang_LongLib_toDouble__Lcom_google_gwt_lang_LongLibBase$LongEmul_2D(a){
  if (com_google_gwt_lang_LongLib_eq__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(a, (com_google_gwt_lang_LongLib$Const_$clinit__V() , com_google_gwt_lang_LongLib$Const_MIN_1VALUE))) {
    return -9223372036854775808;
  }
  if (!com_google_gwt_lang_LongLib_gte__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Z(a, com_google_gwt_lang_LongLib$Const_ZERO)) {
    return -com_google_gwt_lang_LongLibBase_toDoubleHelper__Lcom_google_gwt_lang_LongLibBase$LongEmul_2D(com_google_gwt_lang_LongLib_neg__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a));
  }
  return a.l + a.m * 4194304 + a.h * 17592186044416;
}

function com_google_gwt_lang_LongLib_toInt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(a){
  return a.l | a.m << 22;
}

function com_google_gwt_lang_LongLib_toString__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Ljava_lang_String_2(a){
  var digits, rem, res, tenPowerLong, zeroesNeeded;
  if (a.l == 0 && a.m == 0 && a.h == 0) {
    return $intern_90;
  }
  if (a.h == 524288 && a.m == 0 && a.l == 0) {
    return $intern_252;
  }
  if (~~a.h >> 19 != 0) {
    return $intern_253 + com_google_gwt_lang_LongLib_toString__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Ljava_lang_String_2(com_google_gwt_lang_LongLib_neg__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a));
  }
  rem = a;
  res = $intern_16;
  while (!(rem.l == 0 && rem.m == 0 && rem.h == 0)) {
    tenPowerLong = com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(1000000000);
    rem = com_google_gwt_lang_LongLibBase_divMod__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2ZLcom_google_gwt_lang_LongLibBase$LongEmul_2(rem, tenPowerLong, true);
    digits = $intern_16 + com_google_gwt_lang_LongLib_toInt__Lcom_google_gwt_lang_LongLibBase$LongEmul_2I(com_google_gwt_lang_LongLibBase_remainder);
    if (!(rem.l == 0 && rem.m == 0 && rem.h == 0)) {
      zeroesNeeded = 9 - digits.length;
      for (; zeroesNeeded > 0; --zeroesNeeded) {
        digits = $intern_90 + digits;
      }
    }
    res = digits + res;
  }
  return res;
}

function com_google_gwt_lang_LongLib_xor__Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2Lcom_google_gwt_lang_LongLibBase$LongEmul_2(a, b){
  return com_google_gwt_lang_LongLibBase_create0__IIILcom_google_gwt_lang_LongLibBase$LongEmul_2(a.l ^ b.l, a.m ^ b.m, a.h ^ b.h);
}

var com_google_gwt_lang_LongLib_boxedValues = null;
function com_google_gwt_lang_LongLib$Const_$clinit__V(){
  com_google_gwt_lang_LongLib$Const_$clinit__V = nullMethod;
  com_google_gwt_lang_LongLib$Const_MAX_1VALUE = (a = new com_google_gwt_lang_LongLibBase$LongEmul_LongLibBase$LongEmul__V , a.l = 4194303 , a.m = 4194303 , a.h = 524287 , a);
  com_google_gwt_lang_LongLib$Const_MIN_1VALUE = (a = new com_google_gwt_lang_LongLibBase$LongEmul_LongLibBase$LongEmul__V , a.l = 0 , a.m = 0 , a.h = 524288 , a);
  com_google_gwt_lang_LongLib$Const_ONE = com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(1);
  com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(2);
  com_google_gwt_lang_LongLib$Const_ZERO = com_google_gwt_lang_LongLib_fromInt__ILcom_google_gwt_lang_LongLibBase$LongEmul_2(0);
}

var com_google_gwt_lang_LongLib$Const_MAX_1VALUE, com_google_gwt_lang_LongLib$Const_MIN_1VALUE, com_google_gwt_lang_LongLib$Const_ONE, com_google_gwt_lang_LongLib$Const_ZERO;
function com_google_gwt_lang_LongLibBase$LongEmul_LongLibBase$LongEmul__V(){
}

function com_google_gwt_lang_LongLibBase$LongEmul(){
}

_ = com_google_gwt_lang_LongLibBase$LongEmul_LongLibBase$LongEmul__V.prototype = com_google_gwt_lang_LongLibBase$LongEmul.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_lang_LongLibBase$LongEmul_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1lang_1LongLibBase$LongEmul_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {22:1};
function com_google_gwt_user_client_Timer$1_$onClose__Lcom_google_gwt_user_client_Timer$1_2Lcom_google_gwt_event_logical_shared_CloseEvent_2V(){
  while ((com_google_gwt_user_client_Timer_$clinit__V() , com_google_gwt_user_client_Timer_timers).java_util_ArrayList_size > 0) {
    com_google_gwt_user_client_Timer_$cancel__Lcom_google_gwt_user_client_Timer_2V(com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(com_google_gwt_user_client_Timer_timers, 0), 16));
  }
}

function com_google_gwt_user_client_Timer$1_Timer$1__V(){
}

function com_google_gwt_user_client_Timer$1(){
}

_ = com_google_gwt_user_client_Timer$1_Timer$1__V.prototype = com_google_gwt_user_client_Timer$1.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_user_client_Timer$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Timer$1_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {6:1};
function com_google_gwt_user_client_Window_addCloseHandler__Lcom_google_gwt_event_logical_shared_CloseHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(handler){
  com_google_gwt_user_client_Window_maybeInitializeCloseHandlers__V();
  return com_google_gwt_user_client_Window_addHandler__Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(com_google_gwt_event_logical_shared_CloseEvent_TYPE?com_google_gwt_event_logical_shared_CloseEvent_TYPE:(com_google_gwt_event_logical_shared_CloseEvent_TYPE = new com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V), handler);
}

function com_google_gwt_user_client_Window_addHandler__Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2(type, handler){
  return com_google_gwt_event_shared_SimpleEventBus_$addHandler__Lcom_google_gwt_event_shared_SimpleEventBus_2Lcom_google_gwt_event_shared_GwtEvent$Type_2Lcom_google_gwt_event_shared_EventHandler_2Lcom_google_gwt_event_shared_HandlerRegistration_2((!com_google_gwt_user_client_Window_handlers && (com_google_gwt_user_client_Window_handlers = new com_google_gwt_user_client_Window$WindowHandlers_Window$WindowHandlers__V) , com_google_gwt_user_client_Window_handlers).com_google_gwt_event_shared_HandlerManager_eventBus, type, handler);
}

function com_google_gwt_user_client_Window_maybeInitializeCloseHandlers__V(){
  if (!com_google_gwt_user_client_Window_closeHandlersInitialized) {
    com_google_gwt_user_client_impl_WindowImpl_$initWindowCloseHandler__Lcom_google_gwt_user_client_impl_WindowImpl_2V();
    com_google_gwt_user_client_Window_closeHandlersInitialized = true;
  }
}

function com_google_gwt_user_client_Window_onClosing__Ljava_lang_String_2(){
  var event;
  if (com_google_gwt_user_client_Window_closeHandlersInitialized) {
    event = new com_google_gwt_user_client_Window$ClosingEvent_Window$ClosingEvent__V;
    !!com_google_gwt_user_client_Window_handlers && com_google_gwt_event_shared_HandlerManager_$fireEvent__Lcom_google_gwt_event_shared_HandlerManager_2Lcom_google_gwt_event_shared_GwtEvent_2V(com_google_gwt_user_client_Window_handlers, event);
    return null;
  }
  return null;
}

var com_google_gwt_user_client_Window_closeHandlersInitialized = false, com_google_gwt_user_client_Window_handlers = null;
function com_google_gwt_user_client_Window$ClosingEvent_$clinit__V(){
  com_google_gwt_user_client_Window$ClosingEvent_$clinit__V = nullMethod;
  com_google_gwt_user_client_Window$ClosingEvent_TYPE = new com_google_gwt_event_shared_GwtEvent$Type_GwtEvent$Type__V;
}

function com_google_gwt_user_client_Window$ClosingEvent_Window$ClosingEvent__V(){
  com_google_gwt_user_client_Window$ClosingEvent_$clinit__V();
}

function com_google_gwt_user_client_Window$ClosingEvent(){
}

_ = com_google_gwt_user_client_Window$ClosingEvent_Window$ClosingEvent__V.prototype = com_google_gwt_user_client_Window$ClosingEvent.prototype = new com_google_gwt_event_shared_GwtEvent;
_.dispatch__Lcom_google_gwt_event_shared_EventHandler_2V = function com_google_gwt_user_client_Window$ClosingEvent_dispatch__Lcom_google_gwt_event_shared_EventHandler_2V(handler){
  com_google_gwt_lang_Cast_throwClassCastExceptionUnlessNull__Ljava_lang_Object_2Ljava_lang_Object_2(handler);
  null.nullMethod();
}
;
_.getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2 = function com_google_gwt_user_client_Window$ClosingEvent_getAssociatedType__Lcom_google_gwt_event_shared_GwtEvent$Type_2(){
  return com_google_gwt_user_client_Window$ClosingEvent_TYPE;
}
;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_user_client_Window$ClosingEvent_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Window$ClosingEvent_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
var com_google_gwt_user_client_Window$ClosingEvent_TYPE;
function com_google_gwt_user_client_Window$WindowHandlers_Window$WindowHandlers__V(){
  this.com_google_gwt_event_shared_HandlerManager_eventBus = new com_google_gwt_event_shared_SimpleEventBus_SimpleEventBus__ZV;
  this.com_google_gwt_event_shared_HandlerManager_source = null;
}

function com_google_gwt_user_client_Window$WindowHandlers(){
}

_ = com_google_gwt_user_client_Window$WindowHandlers_Window$WindowHandlers__V.prototype = com_google_gwt_user_client_Window$WindowHandlers.prototype = new com_google_gwt_event_shared_HandlerManager;
_.getClass__Ljava_lang_Class_2$ = function com_google_gwt_user_client_Window$WindowHandlers_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Window$WindowHandlers_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
function com_google_gwt_user_client_impl_WindowImpl_$initWindowCloseHandler__Lcom_google_gwt_user_client_impl_WindowImpl_2V(){
  var oldOnBeforeUnload = $wnd.onbeforeunload;
  var oldOnUnload = $wnd.onunload;
  $wnd.onbeforeunload = function(evt){
    var ret, oldRet;
    try {
      ret = $entry(com_google_gwt_user_client_Window_onClosing__Ljava_lang_String_2)();
    }
     finally {
      oldRet = oldOnBeforeUnload && oldOnBeforeUnload(evt);
    }
    if (ret != null) {
      return ret;
    }
    if (oldRet != null) {
      return oldRet;
    }
  }
  ;
  $wnd.onunload = $entry(function(evt){
    try {
      com_google_gwt_user_client_Window_closeHandlersInitialized && com_google_gwt_event_logical_shared_CloseEvent_fire__Lcom_google_gwt_event_logical_shared_HasCloseHandlers_2Ljava_lang_Object_2ZV((!com_google_gwt_user_client_Window_handlers && (com_google_gwt_user_client_Window_handlers = new com_google_gwt_user_client_Window$WindowHandlers_Window$WindowHandlers__V) , com_google_gwt_user_client_Window_handlers));
    }
     finally {
      oldOnUnload && oldOnUnload(evt);
      $wnd.onresize = null;
      $wnd.onscroll = null;
      $wnd.onbeforeunload = null;
      $wnd.onunload = null;
    }
  }
  );
}

function com_google_gwt_xhr_client_XMLHttpRequest_$clearOnReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(this$static){
  var self = this$static;
  $wnd.setTimeout(function(){
    self.onreadystatechange = function(){};
  }
  , 0);
}

function com_google_gwt_xhr_client_XMLHttpRequest_$setOnReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2Lcom_google_gwt_xhr_client_ReadyStateChangeHandler_2V(this$static, handler){
  var _this = this$static;
  this$static.onreadystatechange = $entry(function(){
    handler.onReadyStateChange__Lcom_google_gwt_xhr_client_XMLHttpRequest_2V(_this);
  }
  );
}

function com_google_gwt_xhr_client_XMLHttpRequest_create__Lcom_google_gwt_xhr_client_XMLHttpRequest_2(){
  if ($wnd.XMLHttpRequest) {
    return new $wnd.XMLHttpRequest;
  }
   else {
    try {
      return new $wnd.ActiveXObject($intern_254);
    }
     catch (e) {
      return new $wnd.ActiveXObject($intern_255);
    }
  }
}

function java_lang_ArithmeticException_ArithmeticException__Ljava_lang_String_2V(){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = $intern_256;
}

function java_lang_ArithmeticException(){
}

_ = java_lang_ArithmeticException_ArithmeticException__Ljava_lang_String_2V.prototype = java_lang_ArithmeticException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function java_lang_ArithmeticException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1ArithmeticException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function java_lang_ArrayStoreException_ArrayStoreException__V(){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
}

function java_lang_ArrayStoreException(){
}

_ = java_lang_ArrayStoreException_ArrayStoreException__V.prototype = java_lang_ArrayStoreException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function java_lang_ArrayStoreException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1ArrayStoreException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function java_lang_Character_digit__CII(c){
  if (c >= 48 && c < 58) {
    return c - 48;
  }
  if (c >= 97 && c < 97) {
    return c - 97 + 10;
  }
  if (c >= 65 && c < 65) {
    return c - 65 + 10;
  }
  return -1;
}

function java_lang_Class_Class__V(){
}

function java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2(packageName, className){
  var clazz;
  clazz = new java_lang_Class_Class__V;
  clazz.java_lang_Class_typeName = packageName + className;
  clazz.java_lang_Class_modifiers = 4;
  return clazz;
}

function java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2(packageName, className){
  var clazz;
  clazz = new java_lang_Class_Class__V;
  clazz.java_lang_Class_typeName = packageName + className;
  return clazz;
}

function java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2(packageName, className, enumConstantsFunc){
  var clazz;
  clazz = new java_lang_Class_Class__V;
  clazz.java_lang_Class_typeName = packageName + className;
  clazz.java_lang_Class_modifiers = enumConstantsFunc?8:0;
  return clazz;
}

function java_lang_Class(){
}

_ = java_lang_Class_Class__V.prototype = java_lang_Class.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function java_lang_Class_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Class_12_1classLit;
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Class_toString__Ljava_lang_String_2(){
  return ((this.java_lang_Class_modifiers & 2) != 0?$intern_257:(this.java_lang_Class_modifiers & 1) != 0?$intern_16:$intern_258) + this.java_lang_Class_typeName;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.java_lang_Class_modifiers = 0;
_.java_lang_Class_typeName = null;
function java_lang_ClassCastException_ClassCastException__V(){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
}

function java_lang_ClassCastException(){
}

_ = java_lang_ClassCastException_ClassCastException__V.prototype = java_lang_ClassCastException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function java_lang_ClassCastException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1ClassCastException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function java_lang_Number__1_1parseAndValidateDouble__Ljava_lang_String_2D(s){
  var toReturn;
  toReturn = java_lang_Number__1_1parseDouble__Ljava_lang_String_2D(s);
  if (isNaN(toReturn)) {
    throw new java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V($intern_259 + s + $intern_260);
  }
  return toReturn;
}

function java_lang_Number__1_1parseAndValidateInt__Ljava_lang_String_2IIII(s){
  var i, length, startIndex, toReturn;
  if (s == null) {
    throw new java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V($intern_132);
  }
  length = s.length;
  startIndex = length > 0 && s.charCodeAt(0) == 45?1:0;
  for (i = startIndex; i < length; ++i) {
    if (java_lang_Character_digit__CII(s.charCodeAt(i)) == -1) {
      throw new java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V($intern_259 + s + $intern_260);
    }
  }
  toReturn = parseInt(s, 10);
  if (isNaN(toReturn)) {
    throw new java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V($intern_259 + s + $intern_260);
  }
   else if (toReturn < -2147483648 || toReturn > 2147483647) {
    throw new java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V($intern_259 + s + $intern_260);
  }
  return toReturn;
}

function java_lang_Number__1_1parseDouble__Ljava_lang_String_2D(str){
  var floatRegex = java_lang_Number_floatRegex;
  !floatRegex && (floatRegex = java_lang_Number_floatRegex = /^\s*[+-]?((\d+\.?\d*)|(\.\d+))([eE][+-]?\d+)?[dDfF]?\s*$/i);
  if (floatRegex.test(str)) {
    return parseFloat(str);
  }
   else {
    return Number.NaN;
  }
}

function java_lang_Number(){
}

_ = java_lang_Number.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function java_lang_Number_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Number_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {23:1, 27:1};
var java_lang_Number_floatRegex = null;
function java_lang_Double_Double__DV(value){
  this.java_lang_Double_value = value;
}

function java_lang_Double(){
}

_ = java_lang_Double_Double__DV.prototype = java_lang_Double.prototype = new java_lang_Number;
_.equals__Ljava_lang_Object_2Z$ = function java_lang_Double_equals__Ljava_lang_Object_2Z(o){
  return o != null && o.java_lang_Object_castableTypeMap$ && !!o.java_lang_Object_castableTypeMap$[17] && com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(o, 17).java_lang_Double_value == this.java_lang_Double_value;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_lang_Double_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Double_12_1classLit;
}
;
_.hashCode__I$ = function java_lang_Double_hashCode__I(){
  return ~~Math.max(Math.min(this.java_lang_Double_value, 2147483647), -2147483648);
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Double_toString__Ljava_lang_String_2(){
  return $intern_16 + this.java_lang_Double_value;
}
;
_.java_lang_Object_castableTypeMap$ = {17:1, 23:1, 25:1, 27:1};
_.java_lang_Double_value = 0;
function java_lang_IllegalArgumentException_IllegalArgumentException__V(){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
}

function java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V(message){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = message;
}

function java_lang_IllegalArgumentException(){
}

_ = java_lang_IllegalArgumentException_IllegalArgumentException__Ljava_lang_String_2V.prototype = java_lang_IllegalArgumentException_IllegalArgumentException__V.prototype = java_lang_IllegalArgumentException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function java_lang_IllegalArgumentException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1IllegalArgumentException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V(){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = $intern_261;
}

function java_lang_IllegalStateException(){
}

_ = java_lang_IllegalStateException_IllegalStateException__Ljava_lang_String_2V.prototype = java_lang_IllegalStateException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function java_lang_IllegalStateException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1IllegalStateException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__V(){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
}

function java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__Ljava_lang_String_2V(message){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = message;
}

function java_lang_IndexOutOfBoundsException(){
}

_ = java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__Ljava_lang_String_2V.prototype = java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__V.prototype = java_lang_IndexOutOfBoundsException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function java_lang_IndexOutOfBoundsException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1IndexOutOfBoundsException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function java_lang_Integer_Integer__IV(value){
  this.java_lang_Integer_value = value;
}

function java_lang_Integer_numberOfLeadingZeros__II(i){
  var m, n, y;
  if (i < 0) {
    return 0;
  }
   else if (i == 0) {
    return 32;
  }
   else {
    y = -(~~i >> 16);
    m = ~~y >> 16 & 16;
    n = 16 - m;
    i = ~~i >> m;
    y = i - 256;
    m = ~~y >> 16 & 8;
    n += m;
    i <<= m;
    y = i - 4096;
    m = ~~y >> 16 & 4;
    n += m;
    i <<= m;
    y = i - 16384;
    m = ~~y >> 16 & 2;
    n += m;
    i <<= m;
    y = ~~i >> 14;
    m = y & ~(~~y >> 1);
    return n + 2 - m;
  }
}

function java_lang_Integer_numberOfTrailingZeros__II(i){
  var r, rtn;
  if (i == 0) {
    return 32;
  }
   else {
    rtn = 0;
    for (r = 1; (r & i) == 0; r <<= 1) {
      ++rtn;
    }
    return rtn;
  }
}

function java_lang_Integer_toPowerOfTwoString__IILjava_lang_String_2(value){
  var buf, digits, pos;
  buf = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13C_1classLit, {23:1}, -1, 8, 1);
  digits = (java_lang_Number$_1_1Digits_$clinit__V() , java_lang_Number$_1_1Digits_digits);
  pos = 7;
  if (value >= 0) {
    while (value > 15) {
      buf[pos--] = digits[value & 15];
      value >>= 4;
    }
  }
   else {
    while (pos > 0) {
      buf[pos--] = digits[value & 15];
      value >>= 4;
    }
  }
  buf[pos] = digits[value & 15];
  return java_lang_String__1_1valueOf___3CIILjava_lang_String_2(buf, pos, 8);
}

function java_lang_Integer_valueOf__ILjava_lang_Integer_2(i){
  var rebase, result;
  if (i > -129 && i < 128) {
    rebase = i + 128;
    result = (java_lang_Integer$BoxedValues_$clinit__V() , java_lang_Integer$BoxedValues_boxedValues)[rebase];
    !result && (result = java_lang_Integer$BoxedValues_boxedValues[rebase] = new java_lang_Integer_Integer__IV(i));
    return result;
  }
  return new java_lang_Integer_Integer__IV(i);
}

function java_lang_Integer(){
}

_ = java_lang_Integer_Integer__IV.prototype = java_lang_Integer.prototype = new java_lang_Number;
_.equals__Ljava_lang_Object_2Z$ = function java_lang_Integer_equals__Ljava_lang_Object_2Z(o){
  return o != null && o.java_lang_Object_castableTypeMap$ && !!o.java_lang_Object_castableTypeMap$[18] && com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(o, 18).java_lang_Integer_value == this.java_lang_Integer_value;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_lang_Integer_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Integer_12_1classLit;
}
;
_.hashCode__I$ = function java_lang_Integer_hashCode__I(){
  return this.java_lang_Integer_value;
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_Integer_toString__Ljava_lang_String_2(){
  return $intern_16 + this.java_lang_Integer_value;
}
;
_.java_lang_Object_castableTypeMap$ = {18:1, 23:1, 25:1, 27:1};
_.java_lang_Integer_value = 0;
function java_lang_Integer$BoxedValues_$clinit__V(){
  java_lang_Integer$BoxedValues_$clinit__V = nullMethod;
  java_lang_Integer$BoxedValues_boxedValues = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1Integer_12_1classLit, {23:1}, 18, 256, 0);
}

var java_lang_Integer$BoxedValues_boxedValues;
function java_lang_NullPointerException_NullPointerException__V(){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
}

function java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V(message){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = message;
}

function java_lang_NullPointerException(){
}

_ = java_lang_NullPointerException_NullPointerException__Ljava_lang_String_2V.prototype = java_lang_NullPointerException_NullPointerException__V.prototype = java_lang_NullPointerException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function java_lang_NullPointerException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1NullPointerException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function java_lang_Number$_1_1Digits_$clinit__V(){
  java_lang_Number$_1_1Digits_$clinit__V = nullMethod;
  java_lang_Number$_1_1Digits_digits = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13C_1classLit, {23:1}, -1, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]);
}

var java_lang_Number$_1_1Digits_digits;
function java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V(message){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = message;
}

function java_lang_NumberFormatException(){
}

_ = java_lang_NumberFormatException_NumberFormatException__Ljava_lang_String_2V.prototype = java_lang_NumberFormatException.prototype = new java_lang_IllegalArgumentException;
_.getClass__Ljava_lang_Class_2$ = function java_lang_NumberFormatException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1NumberFormatException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 4:1, 5:1, 7:1, 23:1};
function java_lang_StackTraceElement_StackTraceElement__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2IV(methodName){
  this.java_lang_StackTraceElement_className = $intern_262;
  this.java_lang_StackTraceElement_methodName = methodName;
  this.java_lang_StackTraceElement_fileName = $intern_263;
  this.java_lang_StackTraceElement_lineNumber = 0;
}

function java_lang_StackTraceElement(){
}

_ = java_lang_StackTraceElement_StackTraceElement__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2IV.prototype = java_lang_StackTraceElement.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function java_lang_StackTraceElement_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1StackTraceElement_12_1classLit;
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_StackTraceElement_toString__Ljava_lang_String_2(){
  return this.java_lang_StackTraceElement_className + $intern_264 + this.java_lang_StackTraceElement_methodName + $intern_138 + this.java_lang_StackTraceElement_fileName + $intern_142 + this.java_lang_StackTraceElement_lineNumber + $intern_265;
}
;
_.java_lang_Object_castableTypeMap$ = {23:1, 28:1};
_.java_lang_StackTraceElement_className = null;
_.java_lang_StackTraceElement_fileName = null;
_.java_lang_StackTraceElement_lineNumber = 0;
_.java_lang_StackTraceElement_methodName = null;
function java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(this$static, other){
  if (!(other != null && other.java_lang_Object_castableTypeMap$ && !!other.java_lang_Object_castableTypeMap$[1])) {
    return false;
  }
  return String(this$static) == other;
}

function java_lang_String_$getChars__Ljava_lang_String_2II_3CIV(dst, dstBegin){
  var srcIdx;
  for (srcIdx = 0; srcIdx < 62; ++srcIdx) {
    dst[dstBegin++] = $intern_266.charCodeAt(srcIdx);
  }
}

function java_lang_String_$startsWith__Ljava_lang_String_2Ljava_lang_String_2IZ(this$static, prefix, toffset){
  return !(toffset < 0 || toffset >= this$static.length) && this$static.indexOf(prefix, toffset) == toffset;
}

function java_lang_String_$substring__Ljava_lang_String_2ILjava_lang_String_2(this$static, beginIndex){
  return this$static.substr(beginIndex, this$static.length - beginIndex);
}

function java_lang_String_$substring__Ljava_lang_String_2IILjava_lang_String_2(this$static, beginIndex, endIndex){
  return this$static.substr(beginIndex, endIndex - beginIndex);
}

function java_lang_String_$trim__Ljava_lang_String_2Ljava_lang_String_2(this$static){
  if (this$static.length == 0 || this$static[0] > $intern_207 && this$static[this$static.length - 1] > $intern_207) {
    return this$static;
  }
  var r1 = this$static.replace(/^(\s*)/, $intern_16);
  var r2 = r1.replace(/\s*$/, $intern_16);
  return r2;
}

function java_lang_String__1_1valueOf___3CIILjava_lang_String_2(x, start, end){
  x = x.slice(start, end);
  return String.fromCharCode.apply(null, x);
}

function java_lang_String_fromCodePoint__ILjava_lang_String_2(codePoint){
  var hiSurrogate, loSurrogate;
  if (codePoint >= 65536) {
    hiSurrogate = 55296 + (~~(codePoint - 65536) >> 10 & 1023) & 65535;
    loSurrogate = 56320 + (codePoint - 65536 & 1023) & 65535;
    return String.fromCharCode(hiSurrogate) + String.fromCharCode(loSurrogate);
  }
   else {
    return String.fromCharCode(codePoint & 65535);
  }
}

_ = String.prototype;
_.equals__Ljava_lang_Object_2Z$ = function java_lang_String_equals__Ljava_lang_Object_2Z(other){
  return java_lang_String_$equals__Ljava_lang_String_2Ljava_lang_Object_2Z(this, other);
}
;
_.getClass__Ljava_lang_Class_2$ = function java_lang_String_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1String_12_1classLit;
}
;
_.hashCode__I$ = function java_lang_String_hashCode__I(){
  return java_lang_String$HashCache_getHashCode__Ljava_lang_String_2I(this);
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_String_toString__Ljava_lang_String_2(){
  return this;
}
;
_.java_lang_Object_castableTypeMap$ = {1:1, 23:1, 24:1, 25:1};
function java_lang_String$HashCache_$clinit__V(){
  java_lang_String$HashCache_$clinit__V = nullMethod;
  java_lang_String$HashCache_back = {};
  java_lang_String$HashCache_front = {};
}

function java_lang_String$HashCache_compute__Ljava_lang_String_2I(str){
  var hashCode, i, n, nBatch;
  hashCode = 0;
  n = str.length;
  nBatch = n - 4;
  i = 0;
  while (i < nBatch) {
    hashCode = str.charCodeAt(i + 3) + 31 * (str.charCodeAt(i + 2) + 31 * (str.charCodeAt(i + 1) + 31 * (str.charCodeAt(i) + 31 * hashCode))) | 0;
    i += 4;
  }
  while (i < n) {
    hashCode = hashCode * 31 + str.charCodeAt(i++);
  }
  return hashCode | 0;
}

function java_lang_String$HashCache_getHashCode__Ljava_lang_String_2I(str){
  java_lang_String$HashCache_$clinit__V();
  var key = $intern_142 + str;
  var result = java_lang_String$HashCache_front[key];
  if (result != null) {
    return result;
  }
  result = java_lang_String$HashCache_back[key];
  result == null && (result = java_lang_String$HashCache_compute__Ljava_lang_String_2I(str));
  java_lang_String$HashCache_increment__V();
  return java_lang_String$HashCache_front[key] = result;
}

function java_lang_String$HashCache_increment__V(){
  if (java_lang_String$HashCache_count == 256) {
    java_lang_String$HashCache_back = java_lang_String$HashCache_front;
    java_lang_String$HashCache_front = {};
    java_lang_String$HashCache_count = 0;
  }
  ++java_lang_String$HashCache_count;
}

var java_lang_String$HashCache_back, java_lang_String$HashCache_count = 0, java_lang_String$HashCache_front;
function java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2_3CLjava_lang_StringBuffer_2(this$static, x){
  this$static.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += String.fromCharCode.apply(null, x);
  return this$static;
}

function java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(this$static, x){
  this$static.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += x;
  return this$static;
}

function java_lang_StringBuffer_StringBuffer__V(){
  this.java_lang_StringBuffer_impl = new com_google_gwt_core_client_impl_StringBufferImplAppend_StringBufferImplAppend__V;
}

function java_lang_StringBuffer_StringBuffer__IV(){
  this.java_lang_StringBuffer_impl = new com_google_gwt_core_client_impl_StringBufferImplAppend_StringBufferImplAppend__V;
}

function java_lang_StringBuffer(){
}

_ = java_lang_StringBuffer_StringBuffer__IV.prototype = java_lang_StringBuffer_StringBuffer__V.prototype = java_lang_StringBuffer.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function java_lang_StringBuffer_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1StringBuffer_12_1classLit;
}
;
_.toString__Ljava_lang_String_2$ = function java_lang_StringBuffer_toString__Ljava_lang_String_2(){
  return this.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string;
}
;
_.java_lang_Object_castableTypeMap$ = {24:1};
function java_lang_UnsupportedOperationException_UnsupportedOperationException__Ljava_lang_String_2V(message){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
  this.java_lang_Throwable_detailMessage = message;
}

function java_lang_UnsupportedOperationException(){
}

_ = java_lang_UnsupportedOperationException_UnsupportedOperationException__Ljava_lang_String_2V.prototype = java_lang_UnsupportedOperationException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function java_lang_UnsupportedOperationException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1UnsupportedOperationException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function java_util_AbstractCollection_$advanceToFind__Ljava_util_AbstractCollection_2Ljava_util_Iterator_2Ljava_lang_Object_2Ljava_util_Iterator_2(iter, o){
  var t;
  while (iter.hasNext__Z()) {
    t = iter.next__Ljava_lang_Object_2();
    if (o == null?t == null:com_google_gwt_core_client_JavaScriptObject_equals_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(o, t)) {
      return iter;
    }
  }
  return null;
}

function java_util_AbstractCollection_$toString__Ljava_util_AbstractCollection_2Ljava_lang_String_2(this$static){
  var comma, iter, sb;
  sb = new java_lang_StringBuffer_StringBuffer__V;
  comma = null;
  sb.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += $intern_145;
  iter = this$static.iterator__Ljava_util_Iterator_2();
  while (iter.hasNext__Z()) {
    comma != null?(sb.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += comma , sb):(comma = $intern_267);
    java_lang_StringBuffer_$append__Ljava_lang_StringBuffer_2Ljava_lang_String_2Ljava_lang_StringBuffer_2(sb, $intern_16 + iter.next__Ljava_lang_Object_2());
  }
  sb.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string += $intern_268;
  return sb.java_lang_StringBuffer_impl.com_google_gwt_core_client_impl_StringBufferImplAppend_string;
}

function java_util_AbstractCollection(){
}

_ = java_util_AbstractCollection.prototype = new java_lang_Object;
_.add__Ljava_lang_Object_2Z = function java_util_AbstractCollection_add__Ljava_lang_Object_2Z(o){
  throw new java_lang_UnsupportedOperationException_UnsupportedOperationException__Ljava_lang_String_2V($intern_269);
}
;
_.contains__Ljava_lang_Object_2Z = function java_util_AbstractCollection_contains__Ljava_lang_Object_2Z(o){
  var iter;
  iter = java_util_AbstractCollection_$advanceToFind__Ljava_util_AbstractCollection_2Ljava_util_Iterator_2Ljava_lang_Object_2Ljava_util_Iterator_2(this.iterator__Ljava_util_Iterator_2(), o);
  return !!iter;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractCollection_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractCollection_12_1classLit;
}
;
_.toArray___3Ljava_lang_Object_2_3Ljava_lang_Object_2 = function java_util_AbstractCollection_toArray___3Ljava_lang_Object_2_3Ljava_lang_Object_2(a){
  var i, it, size;
  size = this.size__I();
  a.length < size && (a = com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2(a, size));
  it = this.iterator__Ljava_util_Iterator_2();
  for (i = 0; i < size; ++i) {
    com_google_gwt_lang_Array_setCheck__Lcom_google_gwt_lang_Array_2ILjava_lang_Object_2Ljava_lang_Object_2(a, i, it.next__Ljava_lang_Object_2());
  }
  a.length > size && com_google_gwt_lang_Array_setCheck__Lcom_google_gwt_lang_Array_2ILjava_lang_Object_2Ljava_lang_Object_2(a, size, null);
  return a;
}
;
_.toString__Ljava_lang_String_2$ = function java_util_AbstractCollection_toString__Ljava_lang_String_2(){
  return java_util_AbstractCollection_$toString__Ljava_util_AbstractCollection_2Ljava_lang_String_2(this);
}
;
_.java_lang_Object_castableTypeMap$ = {};
function java_util_AbstractMap_$implFindEntry__Ljava_util_AbstractMap_2Ljava_lang_Object_2ZLjava_util_Map$Entry_2(this$static, key){
  var entry, iter, k;
  for (iter = this$static.entrySet__Ljava_util_Set_2().iterator__Ljava_util_Iterator_2(); iter.hasNext__Z();) {
    entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(iter.next__Ljava_lang_Object_2(), 13);
    k = entry.getKey__Ljava_lang_Object_2();
    if (key == null?k == null:com_google_gwt_core_client_JavaScriptObject_equals_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(key, k)) {
      return entry;
    }
  }
  return null;
}

function java_util_AbstractMap_$keySet__Ljava_util_AbstractMap_2Ljava_util_Set_2(this$static){
  var entrySet;
  entrySet = this$static.entrySet__Ljava_util_Set_2();
  return new java_util_AbstractMap$1_AbstractMap$1__Ljava_util_AbstractMap_2V(this$static, entrySet);
}

function java_util_AbstractMap_$values__Ljava_util_AbstractMap_2Ljava_util_Collection_2(this$static){
  var entrySet;
  entrySet = new java_util_LinkedHashMap$EntrySet_LinkedHashMap$EntrySet__Ljava_util_LinkedHashMap_2V(this$static);
  return new java_util_AbstractMap$2_AbstractMap$2__Ljava_util_AbstractMap_2V(this$static, entrySet);
}

function java_util_AbstractMap(){
}

_ = java_util_AbstractMap.prototype = new java_lang_Object;
_.containsKey__Ljava_lang_Object_2Z = function java_util_AbstractMap_containsKey__Ljava_lang_Object_2Z(key){
  return !!java_util_AbstractMap_$implFindEntry__Ljava_util_AbstractMap_2Ljava_lang_Object_2ZLjava_util_Map$Entry_2(this, key);
}
;
_.equals__Ljava_lang_Object_2Z$ = function java_util_AbstractMap_equals__Ljava_lang_Object_2Z(obj){
  var entry, entry$iterator, otherKey, otherMap, otherValue;
  if (obj === this) {
    return true;
  }
  if (!(obj != null && obj.java_lang_Object_castableTypeMap$ && !!obj.java_lang_Object_castableTypeMap$[8])) {
    return false;
  }
  otherMap = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(obj, 8);
  if (this.size__I() != otherMap.size__I()) {
    return false;
  }
  for (entry$iterator = otherMap.entrySet__Ljava_util_Set_2().iterator__Ljava_util_Iterator_2(); entry$iterator.hasNext__Z();) {
    entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(entry$iterator.next__Ljava_lang_Object_2(), 13);
    otherKey = entry.getKey__Ljava_lang_Object_2();
    otherValue = entry.getValue__Ljava_lang_Object_2();
    if (!this.containsKey__Ljava_lang_Object_2Z(otherKey)) {
      return false;
    }
    if (!java_util_Utility_equalsWithNullCheck__Ljava_lang_Object_2Ljava_lang_Object_2Z(otherValue, this.get__Ljava_lang_Object_2Ljava_lang_Object_2(otherKey))) {
      return false;
    }
  }
  return true;
}
;
_.get__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractMap_get__Ljava_lang_Object_2Ljava_lang_Object_2(key){
  var entry;
  entry = java_util_AbstractMap_$implFindEntry__Ljava_util_AbstractMap_2Ljava_lang_Object_2ZLjava_util_Map$Entry_2(this, key);
  return !entry?null:entry.getValue__Ljava_lang_Object_2();
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractMap_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap_12_1classLit;
}
;
_.hashCode__I$ = function java_util_AbstractMap_hashCode__I(){
  var entry, entry$iterator, hashCode;
  hashCode = 0;
  for (entry$iterator = this.entrySet__Ljava_util_Set_2().iterator__Ljava_util_Iterator_2(); entry$iterator.hasNext__Z();) {
    entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(entry$iterator.next__Ljava_lang_Object_2(), 13);
    hashCode += entry.hashCode__I$();
    hashCode = ~~hashCode;
  }
  return hashCode;
}
;
_.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractMap_put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(key, value){
  throw new java_lang_UnsupportedOperationException_UnsupportedOperationException__Ljava_lang_String_2V($intern_270);
}
;
_.size__I = function java_util_AbstractMap_size__I(){
  return this.entrySet__Ljava_util_Set_2().size__I();
}
;
_.toString__Ljava_lang_String_2$ = function java_util_AbstractMap_toString__Ljava_lang_String_2(){
  var comma, entry, iter, s;
  s = $intern_271;
  comma = false;
  for (iter = this.entrySet__Ljava_util_Set_2().iterator__Ljava_util_Iterator_2(); iter.hasNext__Z();) {
    entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(iter.next__Ljava_lang_Object_2(), 13);
    comma?(s += $intern_267):(comma = true);
    s += $intern_16 + entry.getKey__Ljava_lang_Object_2();
    s += $intern_272;
    s += $intern_16 + entry.getValue__Ljava_lang_Object_2();
  }
  return s + $intern_273;
}
;
_.java_lang_Object_castableTypeMap$ = {8:1};
function java_util_AbstractHashMap_$addAllHashEntries__Ljava_util_AbstractHashMap_2Ljava_util_Collection_2V(this$static, dest){
  var hashCodeMap = this$static.java_util_AbstractHashMap_hashCodeMap;
  for (var hashCode in hashCodeMap) {
    var hashCodeInt = parseInt(hashCode, 10);
    if (hashCode == hashCodeInt) {
      var array = hashCodeMap[hashCodeInt];
      for (var i = 0, c = array.length; i < c; ++i) {
        dest.add__Ljava_lang_Object_2Z(array[i]);
      }
    }
  }
}

function java_util_AbstractHashMap_$addAllStringEntries__Ljava_util_AbstractHashMap_2Ljava_util_Collection_2V(this$static, dest){
  var stringMap = this$static.java_util_AbstractHashMap_stringMap;
  for (var key in stringMap) {
    if (key.charCodeAt(0) == 58) {
      var entry = new java_util_AbstractHashMap$MapEntryString_AbstractHashMap$MapEntryString__Ljava_util_AbstractHashMap_2Ljava_lang_String_2V(this$static, key.substring(1));
      dest.add__Ljava_lang_Object_2Z(entry);
    }
  }
}

function java_util_AbstractHashMap_$getHashValue__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2ILjava_lang_Object_2(this$static, key, hashCode){
  var array = this$static.java_util_AbstractHashMap_hashCodeMap[hashCode];
  if (array) {
    for (var i = 0, c = array.length; i < c; ++i) {
      var entry = array[i];
      var entryKey = entry.getKey__Ljava_lang_Object_2();
      if (this$static.private$java_util_AbstractHashMap$equalsBridge__Ljava_lang_Object_2Ljava_lang_Object_2Z(key, entryKey)) {
        return entry.getValue__Ljava_lang_Object_2();
      }
    }
  }
  return null;
}

function java_util_AbstractHashMap_$hasHashValue__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2IZ(this$static, key, hashCode){
  var array = this$static.java_util_AbstractHashMap_hashCodeMap[hashCode];
  if (array) {
    for (var i = 0, c = array.length; i < c; ++i) {
      var entry = array[i];
      var entryKey = entry.getKey__Ljava_lang_Object_2();
      if (this$static.private$java_util_AbstractHashMap$equalsBridge__Ljava_lang_Object_2Ljava_lang_Object_2Z(key, entryKey)) {
        return true;
      }
    }
  }
  return false;
}

function java_util_AbstractHashMap_$putHashValue__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2ILjava_lang_Object_2(this$static, key, value, hashCode){
  var array = this$static.java_util_AbstractHashMap_hashCodeMap[hashCode];
  if (array) {
    for (var i = 0, c = array.length; i < c; ++i) {
      var entry = array[i];
      var entryKey = entry.getKey__Ljava_lang_Object_2();
      if (this$static.private$java_util_AbstractHashMap$equalsBridge__Ljava_lang_Object_2Ljava_lang_Object_2Z(key, entryKey)) {
        var previous = entry.getValue__Ljava_lang_Object_2();
        entry.setValue__Ljava_lang_Object_2Ljava_lang_Object_2(value);
        return previous;
      }
    }
  }
   else {
    array = this$static.java_util_AbstractHashMap_hashCodeMap[hashCode] = [];
  }
  var entry = new java_util_MapEntryImpl_MapEntryImpl__Ljava_lang_Object_2Ljava_lang_Object_2V(key, value);
  array.push(entry);
  ++this$static.java_util_AbstractHashMap_size;
  return null;
}

function java_util_AbstractHashMap_$putNullSlot__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, value){
  var result;
  result = this$static.java_util_AbstractHashMap_nullSlot;
  this$static.java_util_AbstractHashMap_nullSlot = value;
  if (!this$static.java_util_AbstractHashMap_nullSlotLive) {
    this$static.java_util_AbstractHashMap_nullSlotLive = true;
    ++this$static.java_util_AbstractHashMap_size;
  }
  return result;
}

function java_util_AbstractHashMap_$putStringValue__Ljava_util_AbstractHashMap_2Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, key, value){
  var result, stringMap = this$static.java_util_AbstractHashMap_stringMap;
  key = $intern_142 + key;
  key in stringMap?(result = stringMap[key]):++this$static.java_util_AbstractHashMap_size;
  stringMap[key] = value;
  return result;
}

function java_util_AbstractHashMap_$removeHashValue__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2ILjava_lang_Object_2(this$static, key, hashCode){
  var array = this$static.java_util_AbstractHashMap_hashCodeMap[hashCode];
  if (array) {
    for (var i = 0, c = array.length; i < c; ++i) {
      var entry = array[i];
      var entryKey = entry.getKey__Ljava_lang_Object_2();
      if (this$static.private$java_util_AbstractHashMap$equalsBridge__Ljava_lang_Object_2Ljava_lang_Object_2Z(key, entryKey)) {
        array.length == 1?delete this$static.java_util_AbstractHashMap_hashCodeMap[hashCode]:array.splice(i, 1);
        --this$static.java_util_AbstractHashMap_size;
        return entry.getValue__Ljava_lang_Object_2();
      }
    }
  }
  return null;
}

function java_util_AbstractHashMap_$removeNullSlot__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2(this$static){
  var result;
  result = this$static.java_util_AbstractHashMap_nullSlot;
  this$static.java_util_AbstractHashMap_nullSlot = null;
  if (this$static.java_util_AbstractHashMap_nullSlotLive) {
    this$static.java_util_AbstractHashMap_nullSlotLive = false;
    --this$static.java_util_AbstractHashMap_size;
  }
  return result;
}

function java_util_AbstractHashMap_$removeStringValue__Ljava_util_AbstractHashMap_2Ljava_lang_String_2Ljava_lang_Object_2(this$static, key){
  var result, stringMap = this$static.java_util_AbstractHashMap_stringMap;
  key = $intern_142 + key;
  if (key in stringMap) {
    result = stringMap[key];
    --this$static.java_util_AbstractHashMap_size;
    delete stringMap[key];
  }
  return result;
}

function java_util_AbstractHashMap(){
}

_ = java_util_AbstractHashMap.prototype = new java_util_AbstractMap;
_.containsKey__Ljava_lang_Object_2Z = function java_util_AbstractHashMap_containsKey__Ljava_lang_Object_2Z(key){
  return key == null?this.java_util_AbstractHashMap_nullSlotLive:key != null && key.java_lang_Object_castableTypeMap$ && !!key.java_lang_Object_castableTypeMap$[1]?$intern_142 + com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(key, 1) in this.java_util_AbstractHashMap_stringMap:java_util_AbstractHashMap_$hasHashValue__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2IZ(this, key, this.getHashCode__Ljava_lang_Object_2I(key));
}
;
_.entrySet__Ljava_util_Set_2 = function java_util_AbstractHashMap_entrySet__Ljava_util_Set_2(){
  return new java_util_AbstractHashMap$EntrySet_AbstractHashMap$EntrySet__Ljava_util_AbstractHashMap_2V(this);
}
;
_.private$java_util_AbstractHashMap$equalsBridge__Ljava_lang_Object_2Ljava_lang_Object_2Z = function java_util_AbstractHashMap_equalsBridge__Ljava_lang_Object_2Ljava_lang_Object_2Z(value1, value2){
  return this.equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(value1, value2);
}
;
_.get__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractHashMap_get__Ljava_lang_Object_2Ljava_lang_Object_2(key){
  return key == null?this.java_util_AbstractHashMap_nullSlot:key != null && key.java_lang_Object_castableTypeMap$ && !!key.java_lang_Object_castableTypeMap$[1]?this.java_util_AbstractHashMap_stringMap[$intern_142 + com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(key, 1)]:java_util_AbstractHashMap_$getHashValue__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2ILjava_lang_Object_2(this, key, this.getHashCode__Ljava_lang_Object_2I(key));
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractHashMap_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap_12_1classLit;
}
;
_.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractHashMap_put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(key, value){
  return key == null?java_util_AbstractHashMap_$putNullSlot__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this, value):key != null && key.java_lang_Object_castableTypeMap$ && !!key.java_lang_Object_castableTypeMap$[1]?java_util_AbstractHashMap_$putStringValue__Ljava_util_AbstractHashMap_2Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2(this, com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(key, 1), value):java_util_AbstractHashMap_$putHashValue__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2ILjava_lang_Object_2(this, key, value, this.getHashCode__Ljava_lang_Object_2I(key));
}
;
_.remove__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractHashMap_remove__Ljava_lang_Object_2Ljava_lang_Object_2(key){
  return key == null?java_util_AbstractHashMap_$removeNullSlot__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2(this):key != null && key.java_lang_Object_castableTypeMap$ && !!key.java_lang_Object_castableTypeMap$[1]?java_util_AbstractHashMap_$removeStringValue__Ljava_util_AbstractHashMap_2Ljava_lang_String_2Ljava_lang_Object_2(this, com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(key, 1)):java_util_AbstractHashMap_$removeHashValue__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2ILjava_lang_Object_2(this, key, this.getHashCode__Ljava_lang_Object_2I(key));
}
;
_.size__I = function java_util_AbstractHashMap_size__I(){
  return this.java_util_AbstractHashMap_size;
}
;
_.java_lang_Object_castableTypeMap$ = {8:1};
_.java_util_AbstractHashMap_hashCodeMap = null;
_.java_util_AbstractHashMap_nullSlot = null;
_.java_util_AbstractHashMap_nullSlotLive = false;
_.java_util_AbstractHashMap_size = 0;
_.java_util_AbstractHashMap_stringMap = null;
function java_util_AbstractSet(){
}

_ = java_util_AbstractSet.prototype = new java_util_AbstractCollection;
_.equals__Ljava_lang_Object_2Z$ = function java_util_AbstractSet_equals__Ljava_lang_Object_2Z(o){
  var iter, other, otherItem;
  if (o === this) {
    return true;
  }
  if (!(o != null && o.java_lang_Object_castableTypeMap$ && !!o.java_lang_Object_castableTypeMap$[29])) {
    return false;
  }
  other = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(o, 29);
  if (other.size__I() != this.size__I()) {
    return false;
  }
  for (iter = other.iterator__Ljava_util_Iterator_2(); iter.hasNext__Z();) {
    otherItem = iter.next__Ljava_lang_Object_2();
    if (!this.contains__Ljava_lang_Object_2Z(otherItem)) {
      return false;
    }
  }
  return true;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractSet_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractSet_12_1classLit;
}
;
_.hashCode__I$ = function java_util_AbstractSet_hashCode__I(){
  var hashCode, iter, next;
  hashCode = 0;
  for (iter = this.iterator__Ljava_util_Iterator_2(); iter.hasNext__Z();) {
    next = iter.next__Ljava_lang_Object_2();
    if (next != null) {
      hashCode += com_google_gwt_core_client_JavaScriptObject_hashCode_1_1devirtual$__Ljava_lang_Object_2I(next);
      hashCode = ~~hashCode;
    }
  }
  return hashCode;
}
;
_.java_lang_Object_castableTypeMap$ = {29:1};
function java_util_AbstractHashMap$EntrySet_AbstractHashMap$EntrySet__Ljava_util_AbstractHashMap_2V(this$0){
  this.java_util_AbstractHashMap$EntrySet_this$0 = this$0;
}

function java_util_AbstractHashMap$EntrySet(){
}

_ = java_util_AbstractHashMap$EntrySet_AbstractHashMap$EntrySet__Ljava_util_AbstractHashMap_2V.prototype = java_util_AbstractHashMap$EntrySet.prototype = new java_util_AbstractSet;
_.contains__Ljava_lang_Object_2Z = function java_util_AbstractHashMap$EntrySet_contains__Ljava_lang_Object_2Z(o){
  var entry, key, value;
  if (o != null && o.java_lang_Object_castableTypeMap$ && !!o.java_lang_Object_castableTypeMap$[13]) {
    entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(o, 13);
    key = entry.getKey__Ljava_lang_Object_2();
    if (this.java_util_AbstractHashMap$EntrySet_this$0.containsKey__Ljava_lang_Object_2Z(key)) {
      value = this.java_util_AbstractHashMap$EntrySet_this$0.get__Ljava_lang_Object_2Ljava_lang_Object_2(key);
      return this.java_util_AbstractHashMap$EntrySet_this$0.equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(entry.getValue__Ljava_lang_Object_2(), value);
    }
  }
  return false;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractHashMap$EntrySet_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap$EntrySet_12_1classLit;
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_AbstractHashMap$EntrySet_iterator__Ljava_util_Iterator_2(){
  return new java_util_AbstractHashMap$EntrySetIterator_AbstractHashMap$EntrySetIterator__Ljava_util_AbstractHashMap_2V(this.java_util_AbstractHashMap$EntrySet_this$0);
}
;
_.size__I = function java_util_AbstractHashMap$EntrySet_size__I(){
  return this.java_util_AbstractHashMap$EntrySet_this$0.size__I();
}
;
_.java_lang_Object_castableTypeMap$ = {29:1};
_.java_util_AbstractHashMap$EntrySet_this$0 = null;
function java_util_AbstractHashMap$EntrySetIterator_AbstractHashMap$EntrySetIterator__Ljava_util_AbstractHashMap_2V(this$0){
  var list;
  list = new java_util_ArrayList_ArrayList__V;
  this$0.java_util_AbstractHashMap_nullSlotLive && java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(list, new java_util_AbstractHashMap$MapEntryNull_AbstractHashMap$MapEntryNull__Ljava_util_AbstractHashMap_2V(this$0));
  java_util_AbstractHashMap_$addAllStringEntries__Ljava_util_AbstractHashMap_2Ljava_util_Collection_2V(this$0, list);
  java_util_AbstractHashMap_$addAllHashEntries__Ljava_util_AbstractHashMap_2Ljava_util_Collection_2V(this$0, list);
  this.java_util_AbstractHashMap$EntrySetIterator_iter = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(list);
}

function java_util_AbstractHashMap$EntrySetIterator(){
}

_ = java_util_AbstractHashMap$EntrySetIterator_AbstractHashMap$EntrySetIterator__Ljava_util_AbstractHashMap_2V.prototype = java_util_AbstractHashMap$EntrySetIterator.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractHashMap$EntrySetIterator_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap$EntrySetIterator_12_1classLit;
}
;
_.hasNext__Z = function java_util_AbstractHashMap$EntrySetIterator_hasNext__Z(){
  return java_util_AbstractList$IteratorImpl_$hasNext__Ljava_util_AbstractList$IteratorImpl_2Z(this.java_util_AbstractHashMap$EntrySetIterator_iter);
}
;
_.next__Ljava_lang_Object_2 = function java_util_AbstractHashMap$EntrySetIterator_next__Ljava_lang_Object_2(){
  return com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(java_util_AbstractList$IteratorImpl_$next__Ljava_util_AbstractList$IteratorImpl_2Ljava_lang_Object_2(this.java_util_AbstractHashMap$EntrySetIterator_iter), 13);
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.java_util_AbstractHashMap$EntrySetIterator_iter = null;
function java_util_AbstractMapEntry(){
}

_ = java_util_AbstractMapEntry.prototype = new java_lang_Object;
_.equals__Ljava_lang_Object_2Z$ = function java_util_AbstractMapEntry_equals__Ljava_lang_Object_2Z(other){
  var entry;
  if (other != null && other.java_lang_Object_castableTypeMap$ && !!other.java_lang_Object_castableTypeMap$[13]) {
    entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(other, 13);
    if (java_util_Utility_equalsWithNullCheck__Ljava_lang_Object_2Ljava_lang_Object_2Z(this.getKey__Ljava_lang_Object_2(), entry.getKey__Ljava_lang_Object_2()) && java_util_Utility_equalsWithNullCheck__Ljava_lang_Object_2Ljava_lang_Object_2Z(this.getValue__Ljava_lang_Object_2(), entry.getValue__Ljava_lang_Object_2())) {
      return true;
    }
  }
  return false;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractMapEntry_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMapEntry_12_1classLit;
}
;
_.hashCode__I$ = function java_util_AbstractMapEntry_hashCode__I(){
  var keyHash, valueHash;
  keyHash = 0;
  valueHash = 0;
  this.getKey__Ljava_lang_Object_2() != null && (keyHash = com_google_gwt_core_client_JavaScriptObject_hashCode_1_1devirtual$__Ljava_lang_Object_2I(this.getKey__Ljava_lang_Object_2()));
  this.getValue__Ljava_lang_Object_2() != null && (valueHash = com_google_gwt_core_client_JavaScriptObject_hashCode_1_1devirtual$__Ljava_lang_Object_2I(this.getValue__Ljava_lang_Object_2()));
  return keyHash ^ valueHash;
}
;
_.toString__Ljava_lang_String_2$ = function java_util_AbstractMapEntry_toString__Ljava_lang_String_2(){
  return this.getKey__Ljava_lang_Object_2() + $intern_272 + this.getValue__Ljava_lang_Object_2();
}
;
_.java_lang_Object_castableTypeMap$ = {13:1};
function java_util_AbstractHashMap$MapEntryNull_AbstractHashMap$MapEntryNull__Ljava_util_AbstractHashMap_2V(this$0){
  this.java_util_AbstractHashMap$MapEntryNull_this$0 = this$0;
}

function java_util_AbstractHashMap$MapEntryNull(){
}

_ = java_util_AbstractHashMap$MapEntryNull_AbstractHashMap$MapEntryNull__Ljava_util_AbstractHashMap_2V.prototype = java_util_AbstractHashMap$MapEntryNull.prototype = new java_util_AbstractMapEntry;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractHashMap$MapEntryNull_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap$MapEntryNull_12_1classLit;
}
;
_.getKey__Ljava_lang_Object_2 = function java_util_AbstractHashMap$MapEntryNull_getKey__Ljava_lang_Object_2(){
  return null;
}
;
_.getValue__Ljava_lang_Object_2 = function java_util_AbstractHashMap$MapEntryNull_getValue__Ljava_lang_Object_2(){
  return this.java_util_AbstractHashMap$MapEntryNull_this$0.java_util_AbstractHashMap_nullSlot;
}
;
_.setValue__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractHashMap$MapEntryNull_setValue__Ljava_lang_Object_2Ljava_lang_Object_2(object){
  return java_util_AbstractHashMap_$putNullSlot__Ljava_util_AbstractHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this.java_util_AbstractHashMap$MapEntryNull_this$0, object);
}
;
_.java_lang_Object_castableTypeMap$ = {13:1};
_.java_util_AbstractHashMap$MapEntryNull_this$0 = null;
function java_util_AbstractHashMap$MapEntryString_AbstractHashMap$MapEntryString__Ljava_util_AbstractHashMap_2Ljava_lang_String_2V(this$0, key){
  this.java_util_AbstractHashMap$MapEntryString_this$0 = this$0;
  this.java_util_AbstractHashMap$MapEntryString_key = key;
}

function java_util_AbstractHashMap$MapEntryString(){
}

_ = java_util_AbstractHashMap$MapEntryString_AbstractHashMap$MapEntryString__Ljava_util_AbstractHashMap_2Ljava_lang_String_2V.prototype = java_util_AbstractHashMap$MapEntryString.prototype = new java_util_AbstractMapEntry;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractHashMap$MapEntryString_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap$MapEntryString_12_1classLit;
}
;
_.getKey__Ljava_lang_Object_2 = function java_util_AbstractHashMap$MapEntryString_getKey__Ljava_lang_Object_2(){
  return this.java_util_AbstractHashMap$MapEntryString_key;
}
;
_.getValue__Ljava_lang_Object_2 = function java_util_AbstractHashMap$MapEntryString_getValue__Ljava_lang_Object_2(){
  return this.java_util_AbstractHashMap$MapEntryString_this$0.java_util_AbstractHashMap_stringMap[$intern_142 + this.java_util_AbstractHashMap$MapEntryString_key];
}
;
_.setValue__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_AbstractHashMap$MapEntryString_setValue__Ljava_lang_Object_2Ljava_lang_Object_2(object){
  return java_util_AbstractHashMap_$putStringValue__Ljava_util_AbstractHashMap_2Ljava_lang_String_2Ljava_lang_Object_2Ljava_lang_Object_2(this.java_util_AbstractHashMap$MapEntryString_this$0, this.java_util_AbstractHashMap$MapEntryString_key, object);
}
;
_.java_lang_Object_castableTypeMap$ = {13:1};
_.java_util_AbstractHashMap$MapEntryString_key = null;
_.java_util_AbstractHashMap$MapEntryString_this$0 = null;
function java_util_AbstractList_checkIndex__IIV(index, size){
  (index < 0 || index >= size) && java_util_AbstractList_indexOutOfBounds__IIV(index, size);
}

function java_util_AbstractList_indexOutOfBounds__IIV(index, size){
  throw new java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__Ljava_lang_String_2V($intern_274 + index + $intern_275 + size);
}

function java_util_AbstractList(){
}

_ = java_util_AbstractList.prototype = new java_util_AbstractCollection;
_.add__Ljava_lang_Object_2Z = function java_util_AbstractList_add__Ljava_lang_Object_2Z(obj){
  this.add__ILjava_lang_Object_2V(this.size__I(), obj);
  return true;
}
;
_.add__ILjava_lang_Object_2V = function java_util_AbstractList_add__ILjava_lang_Object_2V(index, element){
  throw new java_lang_UnsupportedOperationException_UnsupportedOperationException__Ljava_lang_String_2V($intern_276);
}
;
_.equals__Ljava_lang_Object_2Z$ = function java_util_AbstractList_equals__Ljava_lang_Object_2Z(o){
  var elem, elemOther, iter, iterOther, other;
  if (o === this) {
    return true;
  }
  if (!(o != null && o.java_lang_Object_castableTypeMap$ && !!o.java_lang_Object_castableTypeMap$[9])) {
    return false;
  }
  other = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(o, 9);
  if (this.size__I() != other.size__I()) {
    return false;
  }
  iter = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this);
  iterOther = other.iterator__Ljava_util_Iterator_2();
  while (iter.java_util_AbstractList$IteratorImpl_i < iter.java_util_AbstractList$IteratorImpl_this$0.size__I()) {
    elem = java_util_AbstractList$IteratorImpl_$next__Ljava_util_AbstractList$IteratorImpl_2Ljava_lang_Object_2(iter);
    elemOther = java_util_AbstractList$IteratorImpl_$next__Ljava_util_AbstractList$IteratorImpl_2Ljava_lang_Object_2(iterOther);
    if (!(elem == null?elemOther == null:com_google_gwt_core_client_JavaScriptObject_equals_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(elem, elemOther))) {
      return false;
    }
  }
  return true;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractList_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractList_12_1classLit;
}
;
_.hashCode__I$ = function java_util_AbstractList_hashCode__I(){
  var iter, k, obj;
  k = 1;
  iter = new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this);
  while (iter.java_util_AbstractList$IteratorImpl_i < iter.java_util_AbstractList$IteratorImpl_this$0.size__I()) {
    obj = java_util_AbstractList$IteratorImpl_$next__Ljava_util_AbstractList$IteratorImpl_2Ljava_lang_Object_2(iter);
    k = 31 * k + (obj == null?0:com_google_gwt_core_client_JavaScriptObject_hashCode_1_1devirtual$__Ljava_lang_Object_2I(obj));
    k = ~~k;
  }
  return k;
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_AbstractList_iterator__Ljava_util_Iterator_2(){
  return new java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this);
}
;
_.listIterator__Ljava_util_ListIterator_2 = function java_util_AbstractList_listIterator__Ljava_util_ListIterator_2(){
  return new java_util_AbstractList$ListIteratorImpl_AbstractList$ListIteratorImpl__Ljava_util_AbstractList_2IV(this, 0);
}
;
_.listIterator__ILjava_util_ListIterator_2 = function java_util_AbstractList_listIterator__ILjava_util_ListIterator_2(from){
  return new java_util_AbstractList$ListIteratorImpl_AbstractList$ListIteratorImpl__Ljava_util_AbstractList_2IV(this, from);
}
;
_.java_lang_Object_castableTypeMap$ = {9:1};
function java_util_AbstractList$IteratorImpl_$hasNext__Ljava_util_AbstractList$IteratorImpl_2Z(this$static){
  return this$static.java_util_AbstractList$IteratorImpl_i < this$static.java_util_AbstractList$IteratorImpl_this$0.size__I();
}

function java_util_AbstractList$IteratorImpl_$next__Ljava_util_AbstractList$IteratorImpl_2Ljava_lang_Object_2(this$static){
  if (this$static.java_util_AbstractList$IteratorImpl_i >= this$static.java_util_AbstractList$IteratorImpl_this$0.size__I()) {
    throw new java_util_NoSuchElementException_NoSuchElementException__V;
  }
  return this$static.java_util_AbstractList$IteratorImpl_this$0.get__ILjava_lang_Object_2(this$static.java_util_AbstractList$IteratorImpl_i++);
}

function java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V(this$0){
  this.java_util_AbstractList$IteratorImpl_this$0 = this$0;
}

function java_util_AbstractList$IteratorImpl(){
}

_ = java_util_AbstractList$IteratorImpl_AbstractList$IteratorImpl__Ljava_util_AbstractList_2V.prototype = java_util_AbstractList$IteratorImpl.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractList$IteratorImpl_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractList$IteratorImpl_12_1classLit;
}
;
_.hasNext__Z = function java_util_AbstractList$IteratorImpl_hasNext__Z(){
  return this.java_util_AbstractList$IteratorImpl_i < this.java_util_AbstractList$IteratorImpl_this$0.size__I();
}
;
_.next__Ljava_lang_Object_2 = function java_util_AbstractList$IteratorImpl_next__Ljava_lang_Object_2(){
  return java_util_AbstractList$IteratorImpl_$next__Ljava_util_AbstractList$IteratorImpl_2Ljava_lang_Object_2(this);
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.java_util_AbstractList$IteratorImpl_i = 0;
_.java_util_AbstractList$IteratorImpl_this$0 = null;
function java_util_AbstractList$ListIteratorImpl_$previous__Ljava_util_AbstractList$ListIteratorImpl_2Ljava_lang_Object_2(this$static){
  if (this$static.java_util_AbstractList$IteratorImpl_i <= 0) {
    throw new java_util_NoSuchElementException_NoSuchElementException__V;
  }
  return this$static.java_util_AbstractList$ListIteratorImpl_this$0.get__ILjava_lang_Object_2(--this$static.java_util_AbstractList$IteratorImpl_i);
}

function java_util_AbstractList$ListIteratorImpl_AbstractList$ListIteratorImpl__Ljava_util_AbstractList_2IV(this$0, start){
  var size;
  this.java_util_AbstractList$ListIteratorImpl_this$0 = this$0;
  this.java_util_AbstractList$IteratorImpl_this$0 = this$0;
  size = this$0.size__I();
  (start < 0 || start > size) && java_util_AbstractList_indexOutOfBounds__IIV(start, size);
  this.java_util_AbstractList$IteratorImpl_i = start;
}

function java_util_AbstractList$ListIteratorImpl(){
}

_ = java_util_AbstractList$ListIteratorImpl_AbstractList$ListIteratorImpl__Ljava_util_AbstractList_2IV.prototype = java_util_AbstractList$ListIteratorImpl.prototype = new java_util_AbstractList$IteratorImpl;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractList$ListIteratorImpl_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractList$ListIteratorImpl_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.java_util_AbstractList$ListIteratorImpl_this$0 = null;
function java_util_AbstractMap$1_AbstractMap$1__Ljava_util_AbstractMap_2V(this$0, val$entrySet){
  this.java_util_AbstractMap$1_this$0 = this$0;
  this.java_util_AbstractMap$1_val$entrySet = val$entrySet;
}

function java_util_AbstractMap$1(){
}

_ = java_util_AbstractMap$1_AbstractMap$1__Ljava_util_AbstractMap_2V.prototype = java_util_AbstractMap$1.prototype = new java_util_AbstractSet;
_.contains__Ljava_lang_Object_2Z = function java_util_AbstractMap$1_contains__Ljava_lang_Object_2Z(key){
  return this.java_util_AbstractMap$1_this$0.containsKey__Ljava_lang_Object_2Z(key);
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractMap$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$1_12_1classLit;
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_AbstractMap$1_iterator__Ljava_util_Iterator_2(){
  var java_util_AbstractMap$1_$iterator__Ljava_util_AbstractMap$1_2Ljava_util_Iterator_2_outerIter_0;
  return java_util_AbstractMap$1_$iterator__Ljava_util_AbstractMap$1_2Ljava_util_Iterator_2_outerIter_0 = this.java_util_AbstractMap$1_val$entrySet.iterator__Ljava_util_Iterator_2() , new java_util_AbstractMap$1$1_AbstractMap$1$1__Ljava_util_AbstractMap$1_2V(java_util_AbstractMap$1_$iterator__Ljava_util_AbstractMap$1_2Ljava_util_Iterator_2_outerIter_0);
}
;
_.size__I = function java_util_AbstractMap$1_size__I(){
  return this.java_util_AbstractMap$1_val$entrySet.size__I();
}
;
_.java_lang_Object_castableTypeMap$ = {29:1};
_.java_util_AbstractMap$1_this$0 = null;
_.java_util_AbstractMap$1_val$entrySet = null;
function java_util_AbstractMap$1$1_AbstractMap$1$1__Ljava_util_AbstractMap$1_2V(val$outerIter){
  this.java_util_AbstractMap$1$1_val$outerIter = val$outerIter;
}

function java_util_AbstractMap$1$1(){
}

_ = java_util_AbstractMap$1$1_AbstractMap$1$1__Ljava_util_AbstractMap$1_2V.prototype = java_util_AbstractMap$1$1.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractMap$1$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$1$1_12_1classLit;
}
;
_.hasNext__Z = function java_util_AbstractMap$1$1_hasNext__Z(){
  return this.java_util_AbstractMap$1$1_val$outerIter.hasNext__Z();
}
;
_.next__Ljava_lang_Object_2 = function java_util_AbstractMap$1$1_next__Ljava_lang_Object_2(){
  var entry;
  entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(this.java_util_AbstractMap$1$1_val$outerIter.next__Ljava_lang_Object_2(), 13);
  return entry.getKey__Ljava_lang_Object_2();
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.java_util_AbstractMap$1$1_val$outerIter = null;
function java_util_AbstractMap$2_AbstractMap$2__Ljava_util_AbstractMap_2V(this$0, val$entrySet){
  this.java_util_AbstractMap$2_this$0 = this$0;
  this.java_util_AbstractMap$2_val$entrySet = val$entrySet;
}

function java_util_AbstractMap$2(){
}

_ = java_util_AbstractMap$2_AbstractMap$2__Ljava_util_AbstractMap_2V.prototype = java_util_AbstractMap$2.prototype = new java_util_AbstractCollection;
_.contains__Ljava_lang_Object_2Z = function java_util_AbstractMap$2_contains__Ljava_lang_Object_2Z(value){
  return java_util_LinkedHashMap_$containsValue__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Z(this.java_util_AbstractMap$2_this$0, value);
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractMap$2_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$2_12_1classLit;
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_AbstractMap$2_iterator__Ljava_util_Iterator_2(){
  var java_util_AbstractMap$2_$iterator__Ljava_util_AbstractMap$2_2Ljava_util_Iterator_2_outerIter_0;
  return java_util_AbstractMap$2_$iterator__Ljava_util_AbstractMap$2_2Ljava_util_Iterator_2_outerIter_0 = new java_util_LinkedHashMap$EntrySet$EntryIterator_LinkedHashMap$EntrySet$EntryIterator__Ljava_util_LinkedHashMap$EntrySet_2V(this.java_util_AbstractMap$2_val$entrySet) , new java_util_AbstractMap$2$1_AbstractMap$2$1__Ljava_util_AbstractMap$2_2V(java_util_AbstractMap$2_$iterator__Ljava_util_AbstractMap$2_2Ljava_util_Iterator_2_outerIter_0);
}
;
_.size__I = function java_util_AbstractMap$2_size__I(){
  return this.java_util_AbstractMap$2_val$entrySet.java_util_LinkedHashMap$EntrySet_this$0.java_util_LinkedHashMap_map.size__I();
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.java_util_AbstractMap$2_this$0 = null;
_.java_util_AbstractMap$2_val$entrySet = null;
function java_util_AbstractMap$2$1_AbstractMap$2$1__Ljava_util_AbstractMap$2_2V(val$outerIter){
  this.java_util_AbstractMap$2$1_val$outerIter = val$outerIter;
}

function java_util_AbstractMap$2$1(){
}

_ = java_util_AbstractMap$2$1_AbstractMap$2$1__Ljava_util_AbstractMap$2_2V.prototype = java_util_AbstractMap$2$1.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function java_util_AbstractMap$2$1_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$2$1_12_1classLit;
}
;
_.hasNext__Z = function java_util_AbstractMap$2$1_hasNext__Z(){
  return java_util_LinkedHashMap$EntrySet$EntryIterator_$hasNext__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Z(this.java_util_AbstractMap$2$1_val$outerIter);
}
;
_.next__Ljava_lang_Object_2 = function java_util_AbstractMap$2$1_next__Ljava_lang_Object_2(){
  return java_util_LinkedHashMap$EntrySet$EntryIterator_$next__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Ljava_util_Map$Entry_2(this.java_util_AbstractMap$2$1_val$outerIter).java_util_MapEntryImpl_value;
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.java_util_AbstractMap$2$1_val$outerIter = null;
function java_util_ArrayList_$add__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static, o){
  com_google_gwt_lang_Array_setCheck__Lcom_google_gwt_lang_Array_2ILjava_lang_Object_2Ljava_lang_Object_2(this$static.java_util_ArrayList_array, this$static.java_util_ArrayList_size++, o);
  return true;
}

function java_util_ArrayList_$get__Ljava_util_ArrayList_2ILjava_lang_Object_2(this$static, index){
  java_util_AbstractList_checkIndex__IIV(index, this$static.java_util_ArrayList_size);
  return this$static.java_util_ArrayList_array[index];
}

function java_util_ArrayList_$indexOf__Ljava_util_ArrayList_2Ljava_lang_Object_2II(this$static, o, index){
  for (; index < this$static.java_util_ArrayList_size; ++index) {
    if (java_util_Utility_equalsWithNullCheck__Ljava_lang_Object_2Ljava_lang_Object_2Z(o, this$static.java_util_ArrayList_array[index])) {
      return index;
    }
  }
  return -1;
}

function java_util_ArrayList_$remove__Ljava_util_ArrayList_2Ljava_lang_Object_2Z(this$static, o){
  var i, java_util_ArrayList_$remove__Ljava_util_ArrayList_2ILjava_lang_Object_2_previous_0;
  i = java_util_ArrayList_$indexOf__Ljava_util_ArrayList_2Ljava_lang_Object_2II(this$static, o, 0);
  if (i == -1) {
    return false;
  }
  java_util_ArrayList_$remove__Ljava_util_ArrayList_2ILjava_lang_Object_2_previous_0 = (java_util_AbstractList_checkIndex__IIV(i, this$static.java_util_ArrayList_size) , this$static.java_util_ArrayList_array[i]);
  this$static.java_util_ArrayList_array.splice(i, 1);
  --this$static.java_util_ArrayList_size;
  return true;
}

function java_util_ArrayList_ArrayList__V(){
  this.java_util_ArrayList_array = com_google_gwt_lang_Array_initDim__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2IIILcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1Object_12_1classLit, {23:1}, 0, 0, 0);
}

function java_util_ArrayList(){
}

_ = java_util_ArrayList_ArrayList__V.prototype = java_util_ArrayList.prototype = new java_util_AbstractList;
_.add__Ljava_lang_Object_2Z = function java_util_ArrayList_add__Ljava_lang_Object_2Z(o){
  return com_google_gwt_lang_Array_setCheck__Lcom_google_gwt_lang_Array_2ILjava_lang_Object_2Ljava_lang_Object_2(this.java_util_ArrayList_array, this.java_util_ArrayList_size++, o) , true;
}
;
_.add__ILjava_lang_Object_2V = function java_util_ArrayList_add__ILjava_lang_Object_2V(index, o){
  (index < 0 || index > this.java_util_ArrayList_size) && java_util_AbstractList_indexOutOfBounds__IIV(index, this.java_util_ArrayList_size);
  this.java_util_ArrayList_array.splice(index, 0, o);
  ++this.java_util_ArrayList_size;
}
;
_.contains__Ljava_lang_Object_2Z = function java_util_ArrayList_contains__Ljava_lang_Object_2Z(o){
  return java_util_ArrayList_$indexOf__Ljava_util_ArrayList_2Ljava_lang_Object_2II(this, o, 0) != -1;
}
;
_.get__ILjava_lang_Object_2 = function java_util_ArrayList_get__ILjava_lang_Object_2(index){
  return java_util_AbstractList_checkIndex__IIV(index, this.java_util_ArrayList_size) , this.java_util_ArrayList_array[index];
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_ArrayList_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1ArrayList_12_1classLit;
}
;
_.size__I = function java_util_ArrayList_size__I(){
  return this.java_util_ArrayList_size;
}
;
_.toArray___3Ljava_lang_Object_2_3Ljava_lang_Object_2 = function java_util_ArrayList_toArray___3Ljava_lang_Object_2_3Ljava_lang_Object_2(out){
  var i, com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_a_0, com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_result_0;
  out.length < this.java_util_ArrayList_size && (out = (com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_a_0 = out , com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_result_0 = com_google_gwt_lang_Array_createFromSeed__IILcom_google_gwt_lang_Array_2(0, this.java_util_ArrayList_size) , com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_a_0.com_google_gwt_lang_Array_arrayClass$, com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_a_0.java_lang_Object_castableTypeMap$, com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_a_0.com_google_gwt_lang_Array_queryId$, com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_result_0) , com_google_gwt_lang_Array_createFrom___3Ljava_lang_Object_2I_3Ljava_lang_Object_2_result_0));
  for (i = 0; i < this.java_util_ArrayList_size; ++i) {
    com_google_gwt_lang_Array_setCheck__Lcom_google_gwt_lang_Array_2ILjava_lang_Object_2Ljava_lang_Object_2(out, i, this.java_util_ArrayList_array[i]);
  }
  out.length > this.java_util_ArrayList_size && com_google_gwt_lang_Array_setCheck__Lcom_google_gwt_lang_Array_2ILjava_lang_Object_2Ljava_lang_Object_2(out, this.java_util_ArrayList_size, null);
  return out;
}
;
_.java_lang_Object_castableTypeMap$ = {9:1, 23:1};
_.java_util_ArrayList_size = 0;
function java_util_Collections_$clinit__V(){
  java_util_Collections_$clinit__V = nullMethod;
  java_util_Collections_EMPTY_1LIST = new java_util_Collections$EmptyList_Collections$EmptyList__V;
}

var java_util_Collections_EMPTY_1LIST;
function java_util_Collections$EmptyList_Collections$EmptyList__V(){
}

function java_util_Collections$EmptyList(){
}

_ = java_util_Collections$EmptyList_Collections$EmptyList__V.prototype = java_util_Collections$EmptyList.prototype = new java_util_AbstractList;
_.contains__Ljava_lang_Object_2Z = function java_util_Collections$EmptyList_contains__Ljava_lang_Object_2Z(object){
  return false;
}
;
_.get__ILjava_lang_Object_2 = function java_util_Collections$EmptyList_get__ILjava_lang_Object_2(location){
  throw new java_lang_IndexOutOfBoundsException_IndexOutOfBoundsException__V;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_Collections$EmptyList_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Collections$EmptyList_12_1classLit;
}
;
_.size__I = function java_util_Collections$EmptyList_size__I(){
  return 0;
}
;
_.java_lang_Object_castableTypeMap$ = {9:1, 23:1};
function java_util_Date$StringData_$clinit__V(){
  java_util_Date$StringData_$clinit__V = nullMethod;
  java_util_Date$StringData_DAYS = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_223, $intern_224, $intern_225, $intern_226, $intern_227, $intern_228, $intern_229]);
  java_util_Date$StringData_MONTHS = com_google_gwt_lang_Array_initValues__Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2ILcom_google_gwt_lang_Array_2Lcom_google_gwt_lang_Array_2(com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit, {23:1}, 1, [$intern_194, $intern_195, $intern_196, $intern_197, $intern_186, $intern_198, $intern_199, $intern_200, $intern_201, $intern_202, $intern_203, $intern_204]);
}

var java_util_Date$StringData_DAYS, java_util_Date$StringData_MONTHS;
function java_util_HashMap_HashMap__V(){
  this.java_util_AbstractHashMap_hashCodeMap = [];
  this.java_util_AbstractHashMap_stringMap = {};
  this.java_util_AbstractHashMap_nullSlotLive = false;
  this.java_util_AbstractHashMap_nullSlot = null;
  this.java_util_AbstractHashMap_size = 0;
}

function java_util_HashMap(){
}

_ = java_util_HashMap_HashMap__V.prototype = java_util_HashMap.prototype = new java_util_AbstractHashMap;
_.equals__Ljava_lang_Object_2Ljava_lang_Object_2Z = function java_util_HashMap_equals__Ljava_lang_Object_2Ljava_lang_Object_2Z(value1, value2){
  return (value1 == null?null:value1) === (value2 == null?null:value2) || value1 != null && com_google_gwt_core_client_JavaScriptObject_equals_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(value1, value2);
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_HashMap_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1HashMap_12_1classLit;
}
;
_.getHashCode__Ljava_lang_Object_2I = function java_util_HashMap_getHashCode__Ljava_lang_Object_2I(key){
  return ~~com_google_gwt_core_client_JavaScriptObject_hashCode_1_1devirtual$__Ljava_lang_Object_2I(key);
}
;
_.java_lang_Object_castableTypeMap$ = {8:1, 23:1};
function java_util_HashSet_HashSet__V(){
  this.java_util_HashSet_map = new java_util_HashMap_HashMap__V;
}

function java_util_HashSet(){
}

_ = java_util_HashSet_HashSet__V.prototype = java_util_HashSet.prototype = new java_util_AbstractSet;
_.add__Ljava_lang_Object_2Z = function java_util_HashSet_add__Ljava_lang_Object_2Z(o){
  var java_util_HashSet_$add__Ljava_util_HashSet_2Ljava_lang_Object_2Z_old_0;
  return java_util_HashSet_$add__Ljava_util_HashSet_2Ljava_lang_Object_2Z_old_0 = this.java_util_HashSet_map.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(o, this) , java_util_HashSet_$add__Ljava_util_HashSet_2Ljava_lang_Object_2Z_old_0 == null;
}
;
_.contains__Ljava_lang_Object_2Z = function java_util_HashSet_contains__Ljava_lang_Object_2Z(o){
  return this.java_util_HashSet_map.containsKey__Ljava_lang_Object_2Z(o);
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_HashSet_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1HashSet_12_1classLit;
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_HashSet_iterator__Ljava_util_Iterator_2(){
  var java_util_AbstractMap$1_$iterator__Ljava_util_AbstractMap$1_2Ljava_util_Iterator_2_outerIter_0;
  return java_util_AbstractMap$1_$iterator__Ljava_util_AbstractMap$1_2Ljava_util_Iterator_2_outerIter_0 = java_util_AbstractMap_$keySet__Ljava_util_AbstractMap_2Ljava_util_Set_2(this.java_util_HashSet_map).java_util_AbstractMap$1_val$entrySet.iterator__Ljava_util_Iterator_2() , new java_util_AbstractMap$1$1_AbstractMap$1$1__Ljava_util_AbstractMap$1_2V(java_util_AbstractMap$1_$iterator__Ljava_util_AbstractMap$1_2Ljava_util_Iterator_2_outerIter_0);
}
;
_.size__I = function java_util_HashSet_size__I(){
  return this.java_util_HashSet_map.size__I();
}
;
_.toString__Ljava_lang_String_2$ = function java_util_HashSet_toString__Ljava_lang_String_2(){
  return java_util_AbstractCollection_$toString__Ljava_util_AbstractCollection_2Ljava_lang_String_2(java_util_AbstractMap_$keySet__Ljava_util_AbstractMap_2Ljava_util_Set_2(this.java_util_HashSet_map));
}
;
_.java_lang_Object_castableTypeMap$ = {23:1, 29:1};
_.java_util_HashSet_map = null;
function java_util_LinkedHashMap_$containsValue__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Z(this$static, value){
  var node;
  node = this$static.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_next;
  while (node != this$static.java_util_LinkedHashMap_head) {
    if (java_util_Utility_equalsWithNullCheck__Ljava_lang_Object_2Ljava_lang_Object_2Z(node.java_util_MapEntryImpl_value, value)) {
      return true;
    }
    node = node.java_util_LinkedHashMap$ChainEntry_next;
  }
  return false;
}

function java_util_LinkedHashMap_$get__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, key){
  var entry;
  entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(this$static.java_util_LinkedHashMap_map.get__Ljava_lang_Object_2Ljava_lang_Object_2(key), 31);
  if (entry) {
    java_util_LinkedHashMap_$recordAccess__Ljava_util_LinkedHashMap_2Ljava_util_LinkedHashMap$ChainEntry_2V(this$static, entry);
    return entry.java_util_MapEntryImpl_value;
  }
  return null;
}

function java_util_LinkedHashMap_$put__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, key, value){
  var newEntry, old, oldValue;
  old = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(this$static.java_util_LinkedHashMap_map.get__Ljava_lang_Object_2Ljava_lang_Object_2(key), 31);
  if (!old) {
    newEntry = new java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2V(this$static, key, value);
    this$static.java_util_LinkedHashMap_map.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(key, newEntry);
    java_util_LinkedHashMap$ChainEntry_$addToEnd__Ljava_util_LinkedHashMap$ChainEntry_2V(newEntry);
    return null;
  }
   else {
    oldValue = old.java_util_MapEntryImpl_value;
    java_util_MapEntryImpl_$setValue__Ljava_util_MapEntryImpl_2Ljava_lang_Object_2Ljava_lang_Object_2(old, value);
    java_util_LinkedHashMap_$recordAccess__Ljava_util_LinkedHashMap_2Ljava_util_LinkedHashMap$ChainEntry_2V(this$static, old);
    return oldValue;
  }
}

function java_util_LinkedHashMap_$recordAccess__Ljava_util_LinkedHashMap_2Ljava_util_LinkedHashMap$ChainEntry_2V(this$static, entry){
  if (this$static.java_util_LinkedHashMap_accessOrder) {
    java_util_LinkedHashMap$ChainEntry_$remove__Ljava_util_LinkedHashMap$ChainEntry_2V(entry);
    java_util_LinkedHashMap$ChainEntry_$addToEnd__Ljava_util_LinkedHashMap$ChainEntry_2V(entry);
  }
}

function java_util_LinkedHashMap_$remove__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, key){
  var entry;
  entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(this$static.java_util_LinkedHashMap_map.remove__Ljava_lang_Object_2Ljava_lang_Object_2(key), 31);
  if (entry) {
    java_util_LinkedHashMap$ChainEntry_$remove__Ljava_util_LinkedHashMap$ChainEntry_2V(entry);
    return entry.java_util_MapEntryImpl_value;
  }
  return null;
}

function java_util_LinkedHashMap_LinkedHashMap__V(){
  java_util_HashMap_HashMap__V.call(this);
  this.java_util_LinkedHashMap_head = new java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2V(this);
  this.java_util_LinkedHashMap_map = new java_util_HashMap_HashMap__V;
  this.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_prev = this.java_util_LinkedHashMap_head;
  this.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_next = this.java_util_LinkedHashMap_head;
}

function java_util_LinkedHashMap(){
}

_ = java_util_LinkedHashMap_LinkedHashMap__V.prototype = java_util_LinkedHashMap.prototype = new java_util_HashMap;
_.containsKey__Ljava_lang_Object_2Z = function java_util_LinkedHashMap_containsKey__Ljava_lang_Object_2Z(key){
  return this.java_util_LinkedHashMap_map.containsKey__Ljava_lang_Object_2Z(key);
}
;
_.entrySet__Ljava_util_Set_2 = function java_util_LinkedHashMap_entrySet__Ljava_util_Set_2(){
  return new java_util_LinkedHashMap$EntrySet_LinkedHashMap$EntrySet__Ljava_util_LinkedHashMap_2V(this);
}
;
_.get__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_LinkedHashMap_get__Ljava_lang_Object_2Ljava_lang_Object_2(key){
  return java_util_LinkedHashMap_$get__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this, key);
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_LinkedHashMap_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap_12_1classLit;
}
;
_.put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_LinkedHashMap_put__Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(key, value){
  return java_util_LinkedHashMap_$put__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2Ljava_lang_Object_2(this, key, value);
}
;
_.remove__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_LinkedHashMap_remove__Ljava_lang_Object_2Ljava_lang_Object_2(key){
  return java_util_LinkedHashMap_$remove__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this, key);
}
;
_.size__I = function java_util_LinkedHashMap_size__I(){
  return this.java_util_LinkedHashMap_map.size__I();
}
;
_.java_lang_Object_castableTypeMap$ = {8:1, 23:1};
_.java_util_LinkedHashMap_accessOrder = false;
function java_util_MapEntryImpl_$setValue__Ljava_util_MapEntryImpl_2Ljava_lang_Object_2Ljava_lang_Object_2(this$static, value){
  var old;
  old = this$static.java_util_MapEntryImpl_value;
  this$static.java_util_MapEntryImpl_value = value;
  return old;
}

function java_util_MapEntryImpl_MapEntryImpl__Ljava_lang_Object_2Ljava_lang_Object_2V(key, value){
  this.java_util_MapEntryImpl_key = key;
  this.java_util_MapEntryImpl_value = value;
}

function java_util_MapEntryImpl(){
}

_ = java_util_MapEntryImpl_MapEntryImpl__Ljava_lang_Object_2Ljava_lang_Object_2V.prototype = java_util_MapEntryImpl.prototype = new java_util_AbstractMapEntry;
_.getClass__Ljava_lang_Class_2$ = function java_util_MapEntryImpl_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1MapEntryImpl_12_1classLit;
}
;
_.getKey__Ljava_lang_Object_2 = function java_util_MapEntryImpl_getKey__Ljava_lang_Object_2(){
  return this.java_util_MapEntryImpl_key;
}
;
_.getValue__Ljava_lang_Object_2 = function java_util_MapEntryImpl_getValue__Ljava_lang_Object_2(){
  return this.java_util_MapEntryImpl_value;
}
;
_.setValue__Ljava_lang_Object_2Ljava_lang_Object_2 = function java_util_MapEntryImpl_setValue__Ljava_lang_Object_2Ljava_lang_Object_2(value){
  var java_util_MapEntryImpl_$setValue__Ljava_util_MapEntryImpl_2Ljava_lang_Object_2Ljava_lang_Object_2_old_0;
  return java_util_MapEntryImpl_$setValue__Ljava_util_MapEntryImpl_2Ljava_lang_Object_2Ljava_lang_Object_2_old_0 = this.java_util_MapEntryImpl_value , this.java_util_MapEntryImpl_value = value , java_util_MapEntryImpl_$setValue__Ljava_util_MapEntryImpl_2Ljava_lang_Object_2Ljava_lang_Object_2_old_0;
}
;
_.java_lang_Object_castableTypeMap$ = {13:1};
_.java_util_MapEntryImpl_key = null;
_.java_util_MapEntryImpl_value = null;
function java_util_LinkedHashMap$ChainEntry_$addToEnd__Ljava_util_LinkedHashMap$ChainEntry_2V(this$static){
  var tail;
  tail = this$static.java_util_LinkedHashMap$ChainEntry_this$0.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_prev;
  this$static.java_util_LinkedHashMap$ChainEntry_prev = tail;
  this$static.java_util_LinkedHashMap$ChainEntry_next = this$static.java_util_LinkedHashMap$ChainEntry_this$0.java_util_LinkedHashMap_head;
  tail.java_util_LinkedHashMap$ChainEntry_next = this$static.java_util_LinkedHashMap$ChainEntry_this$0.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_prev = this$static;
}

function java_util_LinkedHashMap$ChainEntry_$remove__Ljava_util_LinkedHashMap$ChainEntry_2V(this$static){
  this$static.java_util_LinkedHashMap$ChainEntry_next.java_util_LinkedHashMap$ChainEntry_prev = this$static.java_util_LinkedHashMap$ChainEntry_prev;
  this$static.java_util_LinkedHashMap$ChainEntry_prev.java_util_LinkedHashMap$ChainEntry_next = this$static.java_util_LinkedHashMap$ChainEntry_next;
  this$static.java_util_LinkedHashMap$ChainEntry_next = this$static.java_util_LinkedHashMap$ChainEntry_prev = null;
}

function java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2V(this$0){
  this.java_util_LinkedHashMap$ChainEntry_this$0 = this$0;
  this.java_util_MapEntryImpl_key = null;
  this.java_util_MapEntryImpl_value = null;
  this.java_util_LinkedHashMap$ChainEntry_next = this.java_util_LinkedHashMap$ChainEntry_prev = null;
}

function java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2V(this$0, key, value){
  this.java_util_LinkedHashMap$ChainEntry_this$0 = this$0;
  this.java_util_MapEntryImpl_key = key;
  this.java_util_MapEntryImpl_value = value;
  this.java_util_LinkedHashMap$ChainEntry_next = this.java_util_LinkedHashMap$ChainEntry_prev = null;
}

function java_util_LinkedHashMap$ChainEntry(){
}

_ = java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2V.prototype = java_util_LinkedHashMap$ChainEntry_LinkedHashMap$ChainEntry__Ljava_util_LinkedHashMap_2V.prototype = java_util_LinkedHashMap$ChainEntry.prototype = new java_util_MapEntryImpl;
_.getClass__Ljava_lang_Class_2$ = function java_util_LinkedHashMap$ChainEntry_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap$ChainEntry_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {13:1, 31:1};
_.java_util_LinkedHashMap$ChainEntry_next = null;
_.java_util_LinkedHashMap$ChainEntry_prev = null;
_.java_util_LinkedHashMap$ChainEntry_this$0 = null;
function java_util_LinkedHashMap$EntrySet_LinkedHashMap$EntrySet__Ljava_util_LinkedHashMap_2V(this$0){
  this.java_util_LinkedHashMap$EntrySet_this$0 = this$0;
}

function java_util_LinkedHashMap$EntrySet(){
}

_ = java_util_LinkedHashMap$EntrySet_LinkedHashMap$EntrySet__Ljava_util_LinkedHashMap_2V.prototype = java_util_LinkedHashMap$EntrySet.prototype = new java_util_AbstractSet;
_.contains__Ljava_lang_Object_2Z = function java_util_LinkedHashMap$EntrySet_contains__Ljava_lang_Object_2Z(o){
  var entry, key, value;
  if (!(o != null && o.java_lang_Object_castableTypeMap$ && !!o.java_lang_Object_castableTypeMap$[13])) {
    return false;
  }
  entry = com_google_gwt_lang_Cast_dynamicCast__Ljava_lang_Object_2ILjava_lang_Object_2(o, 13);
  key = entry.getKey__Ljava_lang_Object_2();
  if (this.java_util_LinkedHashMap$EntrySet_this$0.java_util_LinkedHashMap_map.containsKey__Ljava_lang_Object_2Z(key)) {
    value = java_util_LinkedHashMap_$get__Ljava_util_LinkedHashMap_2Ljava_lang_Object_2Ljava_lang_Object_2(this.java_util_LinkedHashMap$EntrySet_this$0, key);
    return java_util_Utility_equalsWithNullCheck__Ljava_lang_Object_2Ljava_lang_Object_2Z(entry.getValue__Ljava_lang_Object_2(), value);
  }
  return false;
}
;
_.getClass__Ljava_lang_Class_2$ = function java_util_LinkedHashMap$EntrySet_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap$EntrySet_12_1classLit;
}
;
_.iterator__Ljava_util_Iterator_2 = function java_util_LinkedHashMap$EntrySet_iterator__Ljava_util_Iterator_2(){
  return new java_util_LinkedHashMap$EntrySet$EntryIterator_LinkedHashMap$EntrySet$EntryIterator__Ljava_util_LinkedHashMap$EntrySet_2V(this);
}
;
_.size__I = function java_util_LinkedHashMap$EntrySet_size__I(){
  return this.java_util_LinkedHashMap$EntrySet_this$0.java_util_LinkedHashMap_map.size__I();
}
;
_.java_lang_Object_castableTypeMap$ = {29:1};
_.java_util_LinkedHashMap$EntrySet_this$0 = null;
function java_util_LinkedHashMap$EntrySet$EntryIterator_$hasNext__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Z(this$static){
  return this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_next != this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_this$1.java_util_LinkedHashMap$EntrySet_this$0.java_util_LinkedHashMap_head;
}

function java_util_LinkedHashMap$EntrySet$EntryIterator_$next__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Ljava_util_Map$Entry_2(this$static){
  if (this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_next == this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_this$1.java_util_LinkedHashMap$EntrySet_this$0.java_util_LinkedHashMap_head) {
    throw new java_util_NoSuchElementException_NoSuchElementException__V;
  }
  this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_last = this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_next;
  this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_next = this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_next.java_util_LinkedHashMap$ChainEntry_next;
  return this$static.java_util_LinkedHashMap$EntrySet$EntryIterator_last;
}

function java_util_LinkedHashMap$EntrySet$EntryIterator_LinkedHashMap$EntrySet$EntryIterator__Ljava_util_LinkedHashMap$EntrySet_2V(this$1){
  this.java_util_LinkedHashMap$EntrySet$EntryIterator_this$1 = this$1;
  this.java_util_LinkedHashMap$EntrySet$EntryIterator_next = this$1.java_util_LinkedHashMap$EntrySet_this$0.java_util_LinkedHashMap_head.java_util_LinkedHashMap$ChainEntry_next;
}

function java_util_LinkedHashMap$EntrySet$EntryIterator(){
}

_ = java_util_LinkedHashMap$EntrySet$EntryIterator_LinkedHashMap$EntrySet$EntryIterator__Ljava_util_LinkedHashMap$EntrySet_2V.prototype = java_util_LinkedHashMap$EntrySet$EntryIterator.prototype = new java_lang_Object;
_.getClass__Ljava_lang_Class_2$ = function java_util_LinkedHashMap$EntrySet$EntryIterator_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap$EntrySet$EntryIterator_12_1classLit;
}
;
_.hasNext__Z = function java_util_LinkedHashMap$EntrySet$EntryIterator_hasNext__Z(){
  return this.java_util_LinkedHashMap$EntrySet$EntryIterator_next != this.java_util_LinkedHashMap$EntrySet$EntryIterator_this$1.java_util_LinkedHashMap$EntrySet_this$0.java_util_LinkedHashMap_head;
}
;
_.next__Ljava_lang_Object_2 = function java_util_LinkedHashMap$EntrySet$EntryIterator_next__Ljava_lang_Object_2(){
  return java_util_LinkedHashMap$EntrySet$EntryIterator_$next__Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2Ljava_util_Map$Entry_2(this);
}
;
_.java_lang_Object_castableTypeMap$ = {};
_.java_util_LinkedHashMap$EntrySet$EntryIterator_last = null;
_.java_util_LinkedHashMap$EntrySet$EntryIterator_next = null;
_.java_util_LinkedHashMap$EntrySet$EntryIterator_this$1 = null;
function java_util_NoSuchElementException_NoSuchElementException__V(){
  com_google_gwt_core_client_impl_StackTraceCreator$Collector_$fillInStackTrace__Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2Ljava_lang_Throwable_2V();
}

function java_util_NoSuchElementException(){
}

_ = java_util_NoSuchElementException_NoSuchElementException__V.prototype = java_util_NoSuchElementException.prototype = new java_lang_RuntimeException;
_.getClass__Ljava_lang_Class_2$ = function java_util_NoSuchElementException_getClass__Ljava_lang_Class_2(){
  return com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1NoSuchElementException_12_1classLit;
}
;
_.java_lang_Object_castableTypeMap$ = {2:1, 5:1, 7:1, 23:1};
function java_util_Utility_equalsWithNullCheck__Ljava_lang_Object_2Ljava_lang_Object_2Z(a, b){
  return (a == null?null:a) === (b == null?null:b) || a != null && com_google_gwt_core_client_JavaScriptObject_equals_1_1devirtual$__Ljava_lang_Object_2Ljava_lang_Object_2Z(a, b);
}

var $entry = com_google_gwt_core_client_impl_Impl_entry__Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2;
function gwtOnLoad(errFn, modName, modBase, softPermutationId){
  $moduleName = modName;
  $moduleBase = modBase;
  if (errFn)
    try {
      $entry(com_google_gwt_lang_EntryMethodHolder_init__V)();
    }
     catch (e) {
      errFn(modName);
    }
   else {
    $entry(com_google_gwt_lang_EntryMethodHolder_init__V)();
  }
}

var com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Object_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_278), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1BackgroundServerConfig$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_279, $intern_280), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1BrowserTab_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_279, $intern_281), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1BrowserTab$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_279, $intern_282), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1BrowserTab$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_279, $intern_283), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1BrowserTab$3_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_279, $intern_284), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Timer_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_285, $intern_286), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1MainButton$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_279, $intern_287), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1background_1firefox_1ServerConfig$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_279, $intern_288), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Enum_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_289), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1AppClient$PearlClient$PearlClientErrorCode_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_290, $intern_291, com_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_values___3Lcom_broceliand_pearlbar_gwt_client_common_AppClient$PearlClient$PearlClientErrorCode_2), com_google_gwt_lang_ClassLiteralHolder__13Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1AppClient$PearlClient$PearlClientErrorCode_12_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_292, $intern_293), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1AppClient$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_290, $intern_294), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1AppClient$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_290, $intern_295), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1PearledType_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_290, $intern_296, com_broceliand_pearlbar_gwt_client_common_PearledType_values___3Lcom_broceliand_pearlbar_gwt_client_common_PearledType_2), com_google_gwt_lang_ClassLiteralHolder__13Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1PearledType_12_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_292, $intern_297), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1SyncModel$SyncService_12_1classLit = java_lang_Class_createForEnum__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Lcom_google_gwt_core_client_JavaScriptObject_2Lcom_google_gwt_core_client_JavaScriptObject_2Ljava_lang_Class_2($intern_290, $intern_298, com_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_values___3Lcom_broceliand_pearlbar_gwt_client_common_SyncModel$SyncService_2), com_google_gwt_lang_ClassLiteralHolder__13Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1SyncModel$SyncService_12_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_292, $intern_299), com_google_gwt_lang_ClassLiteralHolder__13C_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_16, $intern_300), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1UserTrees_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_290, $intern_301), com_google_gwt_lang_ClassLiteralHolder_Lcom_1broceliand_1pearlbar_1gwt_1client_1common_1UserTrees$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_290, $intern_302), com_google_gwt_lang_ClassLiteralHolder__13D_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_16, $intern_303), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1GwtEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_304, $intern_305), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1HandlerManager_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_304, $intern_306), com_google_gwt_lang_ClassLiteralHolder__13I_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_16, $intern_307), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Throwable_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_308), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Exception_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_309), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1RuntimeException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_310), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1Scheduler_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_311, $intern_312), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1SchedulerImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_313, $intern_314), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StackTraceCreator$Collector_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_313, $intern_315), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1StackTraceElement_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_316), com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1StackTraceElement_12_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_317, $intern_318), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StackTraceCreator$CollectorMoz_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_313, $intern_319), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StackTraceCreator$CollectorChrome_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_313, $intern_320), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StringBufferImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_313, $intern_321), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1impl_1StringBufferImplAppend_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_313, $intern_322), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1JavaScriptException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_311, $intern_323), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1core_1client_1JavaScriptObject_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_311, $intern_324), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1String_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_133), com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1String_12_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_317, $intern_325), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1GwtEvent$Type_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_304, $intern_326), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1logical_1shared_1CloseEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_327, $intern_328), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1EventBus_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_304, $intern_329), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1SimpleEventBus_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_304, $intern_330), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1SimpleEventBus$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_304, $intern_331), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1SimpleEventBus$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_304, $intern_332), com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1Throwable_12_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_317, $intern_333), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1event_1shared_1UmbrellaException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_304, $intern_334), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Request_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_335, $intern_336), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Response_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_335, $intern_337), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Request$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_335, $intern_338), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1Request$3_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_335, $intern_339), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestBuilder_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_335, $intern_340), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestBuilder$Method_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_335, $intern_341), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestBuilder$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_335, $intern_342), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_335, $intern_343), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestPermissionException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_335, $intern_344), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1http_1client_1RequestTimeoutException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_335, $intern_345), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1DefaultDateTimeFormatInfo_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_346, $intern_347), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1impl_1cldr_1DateTimeFormatInfoImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_348, $intern_349), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Date_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_351), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1impl_1DateRecord_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_352, $intern_353), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1DateTimeFormat_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_346, $intern_354), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1DateTimeFormat$PatternPart_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_346, $intern_355), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1LocaleInfo_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_346, $intern_356), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1i18n_1client_1TimeZone_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_346, $intern_357), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1lang_1LongLibBase$LongEmul_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_358, $intern_359), com_google_gwt_lang_ClassLiteralHolder__13Lcom_1google_1gwt_1lang_1LongLibBase$LongEmul_12_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_360, $intern_361), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractCollection_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_362), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractList_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_363), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1ArrayList_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_364), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Timer$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_285, $intern_365), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Window$ClosingEvent_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_285, $intern_366), com_google_gwt_lang_ClassLiteralHolder_Lcom_1google_1gwt_1user_1client_1Window$WindowHandlers_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_285, $intern_367), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1ArithmeticException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_368), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1IndexOutOfBoundsException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_369), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1ArrayStoreException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_370), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Number_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_371), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Class_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_372), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1ClassCastException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_373), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Double_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_374), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1IllegalArgumentException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_375), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1IllegalStateException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_376), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1Integer_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_377), com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1Integer_12_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_317, $intern_378), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1NullPointerException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_379), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1NumberFormatException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_380), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1StringBuffer_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_381), com_google_gwt_lang_ClassLiteralHolder_Ljava_1lang_1UnsupportedOperationException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_277, $intern_382), com_google_gwt_lang_ClassLiteralHolder__13Ljava_1lang_1Object_12_1classLit = java_lang_Class_createForArray__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_317, $intern_383), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_384), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_385), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractSet_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_386), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap$EntrySet_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_387), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap$EntrySetIterator_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_388), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMapEntry_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_389), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap$MapEntryNull_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_390), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractHashMap$MapEntryString_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_391), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractList$IteratorImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_392), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractList$ListIteratorImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_393), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_394), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$1$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_395), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$2_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_396), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1AbstractMap$2$1_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_397), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1Collections$EmptyList_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_398), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1HashMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_399), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1HashSet_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_400), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_401), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1MapEntryImpl_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_402), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap$ChainEntry_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_403), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap$EntrySet_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_404), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1LinkedHashMap$EntrySet$EntryIterator_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_405), com_google_gwt_lang_ClassLiteralHolder_Ljava_1util_1NoSuchElementException_12_1classLit = java_lang_Class_createForClass__Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_String_2Ljava_lang_Class_2Ljava_lang_Class_2($intern_350, $intern_406);
if (background) background.onScriptLoad(gwtOnLoad);})();