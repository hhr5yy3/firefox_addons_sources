!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1333)}({0:function(e,t,n){"use strict";n.r(t),n.d(t,"__extends",(function(){return i})),n.d(t,"__assign",(function(){return o})),n.d(t,"__rest",(function(){return a})),n.d(t,"__decorate",(function(){return s})),n.d(t,"__param",(function(){return c})),n.d(t,"__metadata",(function(){return u})),n.d(t,"__awaiter",(function(){return f})),n.d(t,"__generator",(function(){return l})),n.d(t,"__createBinding",(function(){return p})),n.d(t,"__exportStar",(function(){return h})),n.d(t,"__values",(function(){return d})),n.d(t,"__read",(function(){return v})),n.d(t,"__spread",(function(){return g})),n.d(t,"__spreadArrays",(function(){return b})),n.d(t,"__await",(function(){return y})),n.d(t,"__asyncGenerator",(function(){return m})),n.d(t,"__asyncDelegator",(function(){return _})),n.d(t,"__asyncValues",(function(){return w})),n.d(t,"__makeTemplateObject",(function(){return O})),n.d(t,"__importStar",(function(){return S})),n.d(t,"__importDefault",(function(){return j})),n.d(t,"__classPrivateFieldGet",(function(){return E})),n.d(t,"__classPrivateFieldSet",(function(){return x}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function i(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function a(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}function s(e,t,n,r){var i,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,n,a):i(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a}function c(e,t){return function(n,r){t(n,r,e)}}function u(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function f(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))}function l(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function p(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}function h(e,t){for(var n in e)"default"===n||t.hasOwnProperty(n)||(t[n]=e[n])}function d(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function v(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}function g(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(v(arguments[t]));return e}function b(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),i=0;for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a];return r}function y(e){return this instanceof y?(this.v=e,this):new y(e)}function m(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,i=n.apply(e,t||[]),o=[];return r={},a("next"),a("throw"),a("return"),r[Symbol.asyncIterator]=function(){return this},r;function a(e){i[e]&&(r[e]=function(t){return new Promise((function(n,r){o.push([e,t,n,r])>1||s(e,t)}))})}function s(e,t){try{(n=i[e](t)).value instanceof y?Promise.resolve(n.value.v).then(c,u):f(o[0][2],n)}catch(e){f(o[0][3],e)}var n}function c(e){s("next",e)}function u(e){s("throw",e)}function f(e,t){e(t),o.shift(),o.length&&s(o[0][0],o[0][1])}}function _(e){var t,n;return t={},r("next"),r("throw",(function(e){throw e})),r("return"),t[Symbol.iterator]=function(){return this},t;function r(r,i){t[r]=e[r]?function(t){return(n=!n)?{value:y(e[r](t)),done:"return"===r}:i?i(t):t}:i}}function w(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e=d(e),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,i){(function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)})(r,i,(t=e[n](t)).done,t.value)}))}}}function O(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function S(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function j(e){return e&&e.__esModule?e:{default:e}}function E(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function x(e,t,n){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,n),n}},1:function(e,t,n){"use strict";function r(e,t,n,r,i,o,a){try{var s=e[o](a),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,i)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(i,o){var a=e.apply(t,n);function s(e){r(a,i,o,s,c,"next",e)}function c(e){r(a,i,o,s,c,"throw",e)}s(void 0)}))}}n.d(t,"a",(function(){return i}))},10:function(e,t,n){var r=n(7),i=n(79),o=n(22),a=n(93),s=n(129),c=n(174),u=i("wks"),f=r.Symbol,l=c?f:f&&f.withoutSetter||a;e.exports=function(e){return o(u,e)&&(s||"string"==typeof u[e])||(s&&o(f,e)?u[e]=f[e]:u[e]=l("Symbol."+e)),u[e]}},101:function(e,t,n){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=r(n(90));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
i.default.registerVersion("firebase","7.24.0","app"),e.exports=i.default},102:function(e,t,n){var r=n(79),i=n(93),o=r("keys");e.exports=function(e){return o[e]||(o[e]=i(e))}},103:function(e,t,n){var r=n(9),i=n(43),o="".split;e.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(e){return"String"==i(e)?o.call(e,""):Object(e)}:Object},104:function(e,t){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},128:function(e,t,n){var r=n(44),i=n(9),o=n(136);e.exports=!r&&!i((function(){return 7!=Object.defineProperty(o("div"),"a",{get:function(){return 7}}).a}))},129:function(e,t,n){var r=n(172),i=n(94),o=n(9);e.exports=!!Object.getOwnPropertySymbols&&!o((function(){return!Symbol.sham&&(r?38===i:i>37&&i<41)}))},130:function(e,t,n){var r=n(81),i=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(e){return i.call(e)}),e.exports=r.inspectSource},131:function(e,t,n){"use strict";n(77);var r=n(36),i=n(9),o=n(10),a=n(73),s=n(31),c=o("species"),u=!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),f="$0"==="a".replace(/./,"$0"),l=o("replace"),p=!!/./[l]&&""===/./[l]("a","$0"),h=!i((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));e.exports=function(e,t,n,l){var d=o(e),v=!i((function(){var t={};return t[d]=function(){return 7},7!=""[e](t)})),g=v&&!i((function(){var t=!1,n=/a/;return"split"===e&&((n={}).constructor={},n.constructor[c]=function(){return n},n.flags="",n[d]=/./[d]),n.exec=function(){return t=!0,null},n[d](""),!t}));if(!v||!g||"replace"===e&&(!u||!f||p)||"split"===e&&!h){var b=/./[d],y=n(d,""[e],(function(e,t,n,r,i){return t.exec===a?v&&!i?{done:!0,value:b.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:f,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),m=y[0],_=y[1];r(String.prototype,e,m),r(RegExp.prototype,d,2==t?function(e,t){return _.call(e,this,t)}:function(e){return _.call(e,this)})}l&&s(RegExp.prototype[d],"sham",!0)}},132:function(e,t,n){"use strict";var r=n(140).charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},133:function(e,t,n){var r=n(43),i=n(73);e.exports=function(e,t){var n=e.exec;if("function"==typeof n){var o=n.call(e,t);if("object"!=typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(e,t)}},1333:function(e,t,n){e.exports=n(1334)},1334:function(e,t,n){"use strict";n.r(t),function(e){var t,r=n(1),i=n(19),o=n(4),a=(n(17),n(29),n(200),n(265),n(275),n(77),n(1335),n(101)),s=n.n(a),c=(n(505),"1.0.0-ext"),u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={method:"POST",headers:new Headers({Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=UTF-8"}),body:JSON.stringify(t)};return fetch(e,n)},f=function(e){return null!=e?e:null},l=0,p="basic",h="system",d="adv",v="show",g="click",b="close",y=function(e){try{var t=e.hasOwnProperty("pushex_system")?h:e.hasOwnProperty("message_id")?p:e.hasOwnProperty("message_uuid")?d:void 0;return{title:e.title,options:{lang:void 0,actions:(e.actions||[]).map((function(e){return{action:e.action,title:e.title,icon:e.icon}})),badge:e.badge,body:e.body,dir:e.dir,icon:e.icon,image:e.image,renotify:e.renotify,requireInteraction:e.requireInteraction,tag:e.tag,vibrate:e.vibrate,data:{sw_ver:c,pushType:t,user_id:parseInt(l),project_id:parseInt(e.project_id),message_uuid:String(e.message_uuid),partner_id:e.partner_id,redirector_url:e.redirector_url,link:e.click_action}}}}catch(e){console.error(e)}},m={moduleName:"Redirector",endpoints:{FALLBACK:"https://pushex.io:4433/r"},fixedEncodeURIComponent:function(e){return encodeURIComponent(e).replace(/[!'()]/g,escape).replace(/\*/g,"%2A")},build:function(e,t){return"".concat(e.redirector_url||this.endpoints.FALLBACK)+"?user_id=".concat(f(e.user_id))+"&message_id=".concat(f(e.message_id))+"&message_uuid=".concat(f(e.message_uuid))+"&project_id=".concat(f(e.project_id))+"&partner_id=".concat(f(e.partner_id))+"&action=".concat(this.fixedEncodeURIComponent(t))}},_={moduleName:"Statistic",endpoints:(t={},Object(o.a)(t,p,"https://pushex.io:4433/e"),Object(o.a)(t,d,"https://pushex.io:4434/e"),t),send:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(console.log("@firebase-sw.Statistic.".concat(e),t),e)if(t){var n=this.endpoints[t.pushType];if(n){var r=Object(i.a)({type:e},t);return u(n,r).then((function(e){if(!e.ok)throw new Error("@firebase-sw.Statistic ".concat(e.status))}))}console.warn("@firebase-sw.Statistic.error","Unknown request url")}else console.warn("@firebase-sw.Statistic.error","Empty data object");else console.warn("@firebase-sw.Statistic.error","Empty event object")}};s.a.initializeApp({apiKey:"AIzaSyBVXy0sARHO3R_08auo7lnkPNZpljXwKTU",appId:"1:984171167481:web:bf0a1c3fa05842ef",projectId:"pushex-net",messagingSenderId:"984171167481"}),s.a.messaging().setBackgroundMessageHandler((function(e){var t=y(e.data);return self.registration.showNotification(t.title,t.options).then((function(){_.send(v,t.options.data)}))})),self.addEventListener("install",(function(e){return e.waitUntil((t=Object(r.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:self.skipWaiting().then((function(){console.log("@firebase-sw.install")}));case 1:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})(e));var t})),self.addEventListener("activate",(function(e){return e.waitUntil((t=Object(r.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:self.clients.claim().then((function(){console.log("@firebase-sw.activate")}));case 1:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})(e));var t})),self.addEventListener("notificationclick",(function(t){return t.waitUntil((n=Object(r.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("@firebase-sw.notificationclick",n.notification.data),n.notification.data.link&&n.waitUntil(e.clients.openWindow(m.build(n.notification.data,n.notification.data.link)).then((function(){_.send(g,n.notification.data)}))),n.notification.close();case 3:case"end":return t.stop()}}),t)}))),function(e){return n.apply(this,arguments)})(t));var n})),self.addEventListener("notificationclose",(function(e){return e.waitUntil((t=Object(r.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("@firebase-sw.notificationclose",t.notification.data),_.send(b,t.notification.data);case 2:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})(e));var t}))}.call(this,n(30))},1335:function(e,t,n){"use strict";var r=n(14),i=n(1336);r({target:"String",proto:!0,forced:n(1337)("link")},{link:function(e){return i(this,"a","href",e)}})},1336:function(e,t,n){var r=n(34),i=/"/g;e.exports=function(e,t,n,o){var a=String(r(e)),s="<"+t;return""!==n&&(s+=" "+n+'="'+String(o).replace(i,"&quot;")+'"'),s+">"+a+"</"+t+">"}},1337:function(e,t,n){var r=n(9);e.exports=function(e){return r((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},134:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},136:function(e,t,n){var r=n(7),i=n(15),o=r.document,a=i(o)&&i(o.createElement);e.exports=function(e){return a?o.createElement(e):{}}},137:function(e,t,n){var r=n(95);e.exports=r("navigator","userAgent")||""},138:function(e,t,n){var r=n(7),i=n(130),o=r.WeakMap;e.exports="function"==typeof o&&/native code/.test(i(o))},139:function(e,t,n){var r=n(78),i=n(43),o=n(10)("toStringTag"),a="Arguments"==i(function(){return arguments}());e.exports=r?i:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),o))?n:a?i(t):"Object"==(r=i(t))&&"function"==typeof t.callee?"Arguments":r}},14:function(e,t,n){var r=n(7),i=n(96).f,o=n(31),a=n(36),s=n(82),c=n(178),u=n(143);e.exports=function(e,t){var n,f,l,p,h,d=e.target,v=e.global,g=e.stat;if(n=v?r:g?r[d]||s(d,{}):(r[d]||{}).prototype)for(f in t){if(p=t[f],l=e.noTargetGet?(h=i(n,f))&&h.value:n[f],!u(v?f:d+(g?".":"#")+f,e.forced)&&void 0!==l){if(typeof p==typeof l)continue;c(p,l)}(e.sham||l&&l.sham)&&o(p,"sham",!0),a(n,f,p,e)}}},140:function(e,t,n){var r=n(60),i=n(34),o=function(e){return function(t,n){var o,a,s=String(i(t)),c=r(n),u=s.length;return c<0||c>=u?e?"":void 0:(o=s.charCodeAt(c))<55296||o>56319||c+1===u||(a=s.charCodeAt(c+1))<56320||a>57343?e?s.charAt(c):o:e?s.slice(c,c+2):a-56320+(o-55296<<10)+65536}};e.exports={codeAt:o(!1),charAt:o(!0)}},141:function(e,t,n){var r=n(22),i=n(61),o=n(142).indexOf,a=n(76);e.exports=function(e,t){var n,s=i(e),c=0,u=[];for(n in s)!r(a,n)&&r(s,n)&&u.push(n);for(;t.length>c;)r(s,n=t[c++])&&(~o(u,n)||u.push(n));return u}},142:function(e,t,n){var r=n(61),i=n(42),o=n(181),a=function(e){return function(t,n,a){var s,c=r(t),u=i(c.length),f=o(a,u);if(e&&n!=n){for(;u>f;)if((s=c[f++])!=s)return!0}else for(;u>f;f++)if((e||f in c)&&c[f]===n)return e||f||0;return!e&&-1}};e.exports={includes:a(!0),indexOf:a(!1)}},143:function(e,t,n){var r=n(9),i=/#|\.prototype\./,o=function(e,t){var n=s[a(e)];return n==u||n!=c&&("function"==typeof t?r(t):!!t)},a=o.normalize=function(e){return String(e).replace(i,".").toLowerCase()},s=o.data={},c=o.NATIVE="N",u=o.POLYFILL="P";e.exports=o},145:function(e,t,n){var r=n(43);e.exports=Array.isArray||function(e){return"Array"==r(e)}},146:function(e,t,n){var r=n(15),i=n(145),o=n(10)("species");e.exports=function(e,t){var n;return i(e)&&("function"!=typeof(n=e.constructor)||n!==Array&&!i(n.prototype)?r(n)&&null===(n=n[o])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},147:function(e,t,n){var r=n(9),i=n(10),o=n(94),a=i("species");e.exports=function(e){return o>=51||!r((function(){var t=[];return(t.constructor={})[a]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},148:function(e,t,n){var r=n(98);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},15:function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},167:function(e,t,n){"use strict";var r=n(18);e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},17:function(e,t,n){var r=function(e){"use strict";var t=Object.prototype,n=t.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},i=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",a=r.toStringTag||"@@toStringTag";function s(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,n){return e[t]=n}}function c(e,t,n,r){var i=t&&t.prototype instanceof l?t:l,o=Object.create(i.prototype),a=new S(r||[]);return o._invoke=function(e,t,n){var r="suspendedStart";return function(i,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===i)throw o;return E()}for(n.method=i,n.arg=o;;){var a=n.delegate;if(a){var s=_(a,n);if(s){if(s===f)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=u(e,t,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}(e,n,a),o}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var f={};function l(){}function p(){}function h(){}var d={};d[i]=function(){return this};var v=Object.getPrototypeOf,g=v&&v(v(j([])));g&&g!==t&&n.call(g,i)&&(d=g);var b=h.prototype=l.prototype=Object.create(d);function y(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function m(e,t){var r;this._invoke=function(i,o){function a(){return new t((function(r,a){!function r(i,o,a,s){var c=u(e[i],e,o);if("throw"!==c.type){var f=c.arg,l=f.value;return l&&"object"==typeof l&&n.call(l,"__await")?t.resolve(l.__await).then((function(e){r("next",e,a,s)}),(function(e){r("throw",e,a,s)})):t.resolve(l).then((function(e){f.value=e,a(f)}),(function(e){return r("throw",e,a,s)}))}s(c.arg)}(i,o,r,a)}))}return r=r?r.then(a,a):a()}}function _(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,_(e,t),"throw"===t.method))return f;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=u(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,f;var i=r.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,f):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,f)}function w(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(w,this),this.reset(!0)}function j(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,o=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:E}}function E(){return{value:void 0,done:!0}}return p.prototype=b.constructor=h,h.constructor=p,p.displayName=s(h,a,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,h):(e.__proto__=h,s(e,a,"GeneratorFunction")),e.prototype=Object.create(b),e},e.awrap=function(e){return{__await:e}},y(m.prototype),m.prototype[o]=function(){return this},e.AsyncIterator=m,e.async=function(t,n,r,i,o){void 0===o&&(o=Promise);var a=new m(c(t,n,r,i),o);return e.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},y(b),s(b,a,"Generator"),b[i]=function(){return this},b.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=j,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return a.type="throw",a.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],a=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var s=n.call(o,"catchLoc"),c=n.call(o,"finallyLoc");if(s&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),O(n),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var i=r.arg;O(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:j(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},e}(e.exports);try{regeneratorRuntime=r}catch(e){Function("r","regeneratorRuntime = r")(r)}},172:function(e,t,n){var r=n(43),i=n(7);e.exports="process"==r(i.process)},173:function(e,t,n){var r=n(7);e.exports=r},174:function(e,t,n){var r=n(129);e.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},175:function(e,t,n){"use strict";var r=n(78),i=n(139);e.exports=r?{}.toString:function(){return"[object "+i(this)+"]"}},177:function(e,t,n){"use strict";var r={}.propertyIsEnumerable,i=Object.getOwnPropertyDescriptor,o=i&&!r.call({1:2},1);t.f=o?function(e){var t=i(this,e);return!!t&&t.enumerable}:r},178:function(e,t,n){var r=n(22),i=n(179),o=n(96),a=n(41);e.exports=function(e,t){for(var n=i(t),s=a.f,c=o.f,u=0;u<n.length;u++){var f=n[u];r(e,f)||s(e,f,c(t,f))}}},179:function(e,t,n){var r=n(95),i=n(180),o=n(182),a=n(18);e.exports=r("Reflect","ownKeys")||function(e){var t=i.f(a(e)),n=o.f;return n?t.concat(n(e)):t}},18:function(e,t,n){var r=n(15);e.exports=function(e){if(!r(e))throw TypeError(String(e)+" is not an object");return e}},180:function(e,t,n){var r=n(141),i=n(104).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},181:function(e,t,n){var r=n(60),i=Math.max,o=Math.min;e.exports=function(e,t){var n=r(e);return n<0?i(n+t,0):o(n,t)}},182:function(e,t){t.f=Object.getOwnPropertySymbols},19:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(4);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}},200:function(e,t,n){"use strict";var r=n(14),i=n(84).map;r({target:"Array",proto:!0,forced:!n(147)("map")},{map:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},22:function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},264:function(e,t,n){"use strict";var r=n(9);function i(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=i("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=i("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},265:function(e,t,n){var r=n(14),i=n(266);r({global:!0,forced:parseInt!=i},{parseInt:i})},266:function(e,t,n){var r=n(7),i=n(267).trim,o=n(134),a=r.parseInt,s=/^[+-]?0[Xx]/,c=8!==a(o+"08")||22!==a(o+"0x16");e.exports=c?function(e,t){var n=i(String(e));return a(n,t>>>0||(s.test(n)?16:10))}:a},267:function(e,t,n){var r=n(34),i="["+n(134)+"]",o=RegExp("^"+i+i+"*"),a=RegExp(i+i+"*$"),s=function(e){return function(t){var n=String(r(t));return 1&e&&(n=n.replace(o,"")),2&e&&(n=n.replace(a,"")),n}};e.exports={start:s(1),end:s(2),trim:s(3)}},275:function(e,t,n){"use strict";var r=n(131),i=n(18),o=n(42),a=n(60),s=n(34),c=n(132),u=n(276),f=n(133),l=Math.max,p=Math.min;r("replace",2,(function(e,t,n,r){var h=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,d=r.REPLACE_KEEPS_$0,v=h?"$":"$0";return[function(n,r){var i=s(this),o=null==n?void 0:n[e];return void 0!==o?o.call(n,i,r):t.call(String(i),n,r)},function(e,r){if(!h&&d||"string"==typeof r&&-1===r.indexOf(v)){var s=n(t,e,this,r);if(s.done)return s.value}var g=i(e),b=String(this),y="function"==typeof r;y||(r=String(r));var m=g.global;if(m){var _=g.unicode;g.lastIndex=0}for(var w=[];;){var O=f(g,b);if(null===O)break;if(w.push(O),!m)break;""===String(O[0])&&(g.lastIndex=c(b,o(g.lastIndex),_))}for(var S,j="",E=0,x=0;x<w.length;x++){O=w[x];for(var k=String(O[0]),I=l(p(a(O.index),b.length),0),C=[],P=1;P<O.length;P++)C.push(void 0===(S=O[P])?S:String(S));var A=O.groups;if(y){var T=[k].concat(C,I,b);void 0!==A&&T.push(A);var D=String(r.apply(void 0,T))}else D=u(k,b,I,C,A,r);I>=E&&(j+=b.slice(E,I)+D,E=I+k.length)}return j+b.slice(E)}]}))},276:function(e,t,n){var r=n(52),i=Math.floor,o="".replace,a=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,s=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,n,c,u,f){var l=n+e.length,p=c.length,h=s;return void 0!==u&&(u=r(u),h=a),o.call(f,h,(function(r,o){var a;switch(o.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(l);case"<":a=u[o.slice(1,-1)];break;default:var s=+o;if(0===s)return r;if(s>p){var f=i(s/10);return 0===f?r:f<=p?void 0===c[f-1]?o.charAt(1):c[f-1]+o.charAt(1):r}a=c[s-1]}return void 0===a?"":a}))}},29:function(e,t,n){var r=n(78),i=n(36),o=n(175);r||i(Object.prototype,"toString",o,{unsafe:!0})},30:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},31:function(e,t,n){var r=n(44),i=n(41),o=n(75);e.exports=r?function(e,t,n){return i.f(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e}},34:function(e,t){e.exports=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e}},36:function(e,t,n){var r=n(7),i=n(31),o=n(22),a=n(82),s=n(130),c=n(63),u=c.get,f=c.enforce,l=String(String).split("String");(e.exports=function(e,t,n,s){var c,u=!!s&&!!s.unsafe,p=!!s&&!!s.enumerable,h=!!s&&!!s.noTargetGet;"function"==typeof n&&("string"!=typeof t||o(n,"name")||i(n,"name",t),(c=f(n)).source||(c.source=l.join("string"==typeof t?t:""))),e!==r?(u?!h&&e[t]&&(p=!0):delete e[t],p?e[t]=n:i(e,t,n)):p?e[t]=n:a(t,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&u(this).source||s(this)}))},4:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},41:function(e,t,n){var r=n(44),i=n(128),o=n(18),a=n(92),s=Object.defineProperty;t.f=r?s:function(e,t,n){if(o(e),t=a(t,!0),o(n),i)try{return s(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},42:function(e,t,n){var r=n(60),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},43:function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},44:function(e,t,n){var r=n(9);e.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},50:function(e,t,n){!function(e){"use strict";function t(e){return Array.prototype.slice.call(e)}function n(e){return new Promise((function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function r(e,t,r){var i,o=new Promise((function(o,a){n(i=e[t].apply(e,r)).then(o,a)}));return o.request=i,o}function i(e,t,n){var i=r(e,t,n);return i.then((function(e){if(e)return new f(e,i.request)}))}function o(e,t,n){n.forEach((function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})}))}function a(e,t,n,i){i.forEach((function(i){i in n.prototype&&(e.prototype[i]=function(){return r(this[t],i,arguments)})}))}function s(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})}))}function c(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return i(this[t],r,arguments)})}))}function u(e){this._index=e}function f(e,t){this._cursor=e,this._request=t}function l(e){this._store=e}function p(e){this._tx=e,this.complete=new Promise((function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}}))}function h(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new p(n)}function d(e){this._db=e}o(u,"_index",["name","keyPath","multiEntry","unique"]),a(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),c(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),o(f,"_cursor",["direction","key","primaryKey","value"]),a(f,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(e){e in IDBCursor.prototype&&(f.prototype[e]=function(){var t=this,r=arguments;return Promise.resolve().then((function(){return t._cursor[e].apply(t._cursor,r),n(t._request).then((function(e){if(e)return new f(e,t._request)}))}))})})),l.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},l.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},o(l,"_store",["name","keyPath","indexNames","autoIncrement"]),a(l,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),c(l,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),s(l,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new l(this._tx.objectStore.apply(this._tx,arguments))},o(p,"_tx",["objectStoreNames","mode"]),s(p,"_tx",IDBTransaction,["abort"]),h.prototype.createObjectStore=function(){return new l(this._db.createObjectStore.apply(this._db,arguments))},o(h,"_db",["name","version","objectStoreNames"]),s(h,"_db",IDBDatabase,["deleteObjectStore","close"]),d.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},o(d,"_db",["name","version","objectStoreNames"]),s(d,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(e){[l,u].forEach((function(n){e in n.prototype&&(n.prototype[e.replace("open","iterate")]=function(){var n=t(arguments),r=n[n.length-1],i=this._store||this._index,o=i[e].apply(i,n.slice(0,-1));o.onsuccess=function(){r(o.result)}})}))})),[u,l].forEach((function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise((function(i){n.iterateCursor(e,(function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():i(r)):i(r)}))}))})})),e.openDb=function(e,t,n){var i=r(indexedDB,"open",[e,t]),o=i.request;return o&&(o.onupgradeneeded=function(e){n&&n(new h(o.result,e.oldVersion,o.transaction))}),i.then((function(e){return new d(e)}))},e.deleteDb=function(e){return r(indexedDB,"deleteDatabase",[e])},Object.defineProperty(e,"__esModule",{value:!0})}(t)},502:function(e,t,n){"use strict";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function r(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),i=0;for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a];return r}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var i;n.r(t),n.d(t,"LogLevel",(function(){return o})),n.d(t,"Logger",(function(){return l})),n.d(t,"setLogLevel",(function(){return p})),n.d(t,"setUserLogHandler",(function(){return h}));var o,a=[];!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(o||(o={}));var s={debug:o.DEBUG,verbose:o.VERBOSE,info:o.INFO,warn:o.WARN,error:o.ERROR,silent:o.SILENT},c=o.INFO,u=((i={})[o.DEBUG]="log",i[o.VERBOSE]="log",i[o.INFO]="info",i[o.WARN]="warn",i[o.ERROR]="error",i),f=function(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];if(!(t<e.logLevel)){var o=(new Date).toISOString(),a=u[t];if(!a)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[a].apply(console,r(["["+o+"]  "+e.name+":"],n))}},l=function(){function e(e){this.name=e,this._logLevel=c,this._logHandler=f,this._userLogHandler=null,a.push(this)}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in o))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?s[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,o.DEBUG],e)),this._logHandler.apply(this,r([this,o.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,o.VERBOSE],e)),this._logHandler.apply(this,r([this,o.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,o.INFO],e)),this._logHandler.apply(this,r([this,o.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,o.WARN],e)),this._logHandler.apply(this,r([this,o.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,o.ERROR],e)),this._logHandler.apply(this,r([this,o.ERROR],e))},e}();function p(e){a.forEach((function(t){t.setLogLevel(e)}))}function h(e,t){for(var n=function(n){var r=null;t&&t.level&&(r=s[t.level]),n.userLogHandler=null===e?null:function(t,n){for(var i=[],a=2;a<arguments.length;a++)i[a-2]=arguments[a];var s=i.map((function(e){if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}})).filter((function(e){return e})).join(" ");n>=(null!=r?r:t.logLevel)&&e({level:o[n].toLowerCase(),message:s,args:i,type:t.name})}},r=0,i=a;r<i.length;r++){n(i[r])}}},505:function(e,t,n){"use strict";var r,i=n(90),o=n.n(i),a=n(91),s=n(0),c=n(58),u=n(50),f=((r={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',r["not-registered"]="Firebase Installation is not registered.",r["installation-not-found"]="Firebase Installation not found.",r["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',r["app-offline"]="Could not process request. Application offline.",r["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",r),l=new c.ErrorFactory("installations","Installations",f);function p(e){return e instanceof c.FirebaseError&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h(e){return"https://firebaseinstallations.googleapis.com/v1/projects/"+e.projectId+"/installations"}function d(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}function v(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return[4,t.json()];case 1:return n=i.sent(),r=n.error,[2,l.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}}))}))}function g(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function b(e,t){var n=t.refreshToken,r=g(e);return r.append("Authorization",function(e){return"FIS_v2 "+e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n)),r}function y(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t;return Object(s.__generator)(this,(function(n){switch(n.label){case 0:return[4,e()];case 1:return(t=n.sent()).status>=500&&t.status<600?[2,e()]:[2,t]}}))}))}function m(e,t){var n=t.fid;return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,r,i,o,a,c;return Object(s.__generator)(this,(function(s){switch(s.label){case 0:return t=h(e),r=g(e),i={fid:n,authVersion:"FIS_v2",appId:e.appId,sdkVersion:"w:0.4.17"},o={method:"POST",headers:r,body:JSON.stringify(i)},[4,y((function(){return fetch(t,o)}))];case 1:return(a=s.sent()).ok?[4,a.json()]:[3,3];case 2:return c=s.sent(),[2,{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:d(c.authToken)}];case 3:return[4,v("Create Installation",a)];case 4:throw s.sent()}}))}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(e){return new Promise((function(t){setTimeout(t,e)}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var w=/^[cdef][\w-]{21}$/;function O(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;var t=function(e){return(t=e,btoa(String.fromCharCode.apply(String,Object(s.__spread)(t))).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return w.test(t)?t:""}catch(e){return""}}function S(e){return e.appName+"!"+e.appId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j=new Map;function E(e,t){var n=S(e);x(n,t),function(e,t){var n=I();n&&n.postMessage({key:e,fid:t});C()}(n,t)}function x(e,t){var n,r,i=j.get(e);if(i)try{for(var o=Object(s.__values)(i),a=o.next();!a.done;a=o.next()){(0,a.value)(t)}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}}var k=null;function I(){return!k&&"BroadcastChannel"in self&&((k=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(e){x(e.data.key,e.data.fid)}),k}function C(){0===j.size&&k&&(k.close(),k=null)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var P,A,T="firebase-installations-store",D=null;function N(){return D||(D=Object(u.openDb)("firebase-installations-database",1,(function(e){switch(e.oldVersion){case 0:e.createObjectStore(T)}}))),D}function L(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r,i,o,a;return Object(s.__generator)(this,(function(s){switch(s.label){case 0:return n=S(e),[4,N()];case 1:return r=s.sent(),i=r.transaction(T,"readwrite"),[4,(o=i.objectStore(T)).get(n)];case 2:return a=s.sent(),[4,o.put(t,n)];case 3:return s.sent(),[4,i.complete];case 4:return s.sent(),a&&a.fid===t.fid||E(e,t.fid),[2,t]}}))}))}function R(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n,r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return t=S(e),[4,N()];case 1:return n=i.sent(),[4,(r=n.transaction(T,"readwrite")).objectStore(T).delete(t)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}}))}))}function M(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r,i,o,a,c;return Object(s.__generator)(this,(function(s){switch(s.label){case 0:return n=S(e),[4,N()];case 1:return r=s.sent(),i=r.transaction(T,"readwrite"),[4,(o=i.objectStore(T)).get(n)];case 2:return a=s.sent(),void 0!==(c=t(a))?[3,4]:[4,o.delete(n)];case 3:return s.sent(),[3,6];case 4:return[4,o.put(c,n)];case 5:s.sent(),s.label=6;case 6:return[4,i.complete];case 7:return s.sent(),!c||a&&a.fid===c.fid||E(e,c.fid),[2,c]}}))}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n,r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return[4,M(e,(function(n){var r=function(e){return K(e||{fid:O(),registrationStatus:0})}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){var n=Promise.reject(l.create("app-offline"));return{installationEntry:t,registrationPromise:n}}var r={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=function(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,m(e,t)];case 1:return n=i.sent(),[2,L(e,n)];case 2:return p(r=i.sent())&&409===r.serverCode?[4,R(e)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,L(e,{fid:t.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw r;case 7:return[2]}}))}))}(e,r);return{installationEntry:r,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:B(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}))];case 1:return""!==(n=i.sent()).fid?[3,3]:(r={},[4,t]);case 2:return[2,(r.installationEntry=i.sent(),r)];case 3:return[2,{installationEntry:n,registrationPromise:t}]}}))}))}function B(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n,r,i;return Object(s.__generator)(this,(function(o){switch(o.label){case 0:return[4,U(e)];case 1:t=o.sent(),o.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,_(100)];case 3:return o.sent(),[4,U(e)];case 4:return t=o.sent(),[3,2];case 5:return 0!==t.registrationStatus?[3,7]:[4,F(e)];case 6:return n=o.sent(),r=n.installationEntry,(i=n.registrationPromise)?[2,i]:[2,r];case 7:return[2,t]}}))}))}function U(e){return M(e,(function(e){if(!e)throw l.create("installation-not-found");return K(e)}))}function K(e){return 1===(t=e).registrationStatus&&t.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}function V(e,t){var n=e.appConfig,r=e.platformLoggerProvider;return Object(s.__awaiter)(this,void 0,void 0,(function(){var e,i,o,a,c,u,f;return Object(s.__generator)(this,(function(s){switch(s.label){case 0:return e=function(e,t){var n=t.fid;return h(e)+"/"+n+"/authTokens:generate"}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n,t),i=b(n,t),(o=r.getImmediate({optional:!0}))&&i.append("x-firebase-client",o.getPlatformInfoString()),a={installation:{sdkVersion:"w:0.4.17"}},c={method:"POST",headers:i,body:JSON.stringify(a)},[4,y((function(){return fetch(e,c)}))];case 1:return(u=s.sent()).ok?[4,u.json()]:[3,3];case 2:return f=s.sent(),[2,d(f)];case 3:return[4,v("Generate Auth Token",u)];case 4:throw s.sent()}}))}))}function H(e,t){return void 0===t&&(t=!1),Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r,i;return Object(s.__generator)(this,(function(o){switch(o.label){case 0:return[4,M(e.appConfig,(function(r){if(!q(r))throw l.create("not-registered");var i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(i))return r;if(1===i.requestStatus)return n=function(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return[4,W(e.appConfig)];case 1:n=i.sent(),i.label=2;case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,_(100)];case 3:return i.sent(),[4,W(e.appConfig)];case 4:return n=i.sent(),[3,2];case 5:return 0===(r=n.authToken).requestStatus?[2,H(e,t)]:[2,r]}}))}))}(e,t),r;if(!navigator.onLine)throw l.create("app-offline");var o=function(e){var t={requestStatus:1,requestTime:Date.now()};return Object(s.__assign)(Object(s.__assign)({},e),{authToken:t})}(r);return n=function(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r,i;return Object(s.__generator)(this,(function(o){switch(o.label){case 0:return o.trys.push([0,3,,8]),[4,V(e,t)];case 1:return n=o.sent(),i=Object(s.__assign)(Object(s.__assign)({},t),{authToken:n}),[4,L(e.appConfig,i)];case 2:return o.sent(),[2,n];case 3:return!p(r=o.sent())||401!==r.serverCode&&404!==r.serverCode?[3,5]:[4,R(e.appConfig)];case 4:return o.sent(),[3,7];case 5:return i=Object(s.__assign)(Object(s.__assign)({},t),{authToken:{requestStatus:0}}),[4,L(e.appConfig,i)];case 6:o.sent(),o.label=7;case 7:throw r;case 8:return[2]}}))}))}(e,o),o}))];case 1:return r=o.sent(),n?[4,n]:[3,3];case 2:return i=o.sent(),[3,4];case 3:i=r.authToken,o.label=4;case 4:return[2,i]}}))}))}function W(e){return M(e,(function(e){if(!q(e))throw l.create("not-registered");var t,n=e.authToken;return 1===(t=n).requestStatus&&t.requestTime+1e4<Date.now()?Object(s.__assign)(Object(s.__assign)({},e),{authToken:{requestStatus:0}}):e}))}function q(e){return void 0!==e&&2===e.registrationStatus}function z(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t;return Object(s.__generator)(this,(function(n){switch(n.label){case 0:return[4,F(e)];case 1:return(t=n.sent().registrationPromise)?[4,t]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}}))}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r,i,o;return Object(s.__generator)(this,(function(a){switch(a.label){case 0:return n=function(e,t){var n=t.fid;return h(e)+"/"+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,t),r=b(e,t),i={method:"DELETE",headers:r},[4,y((function(){return fetch(n,i)}))];case 1:return(o=a.sent()).ok?[3,3]:[4,v("Delete Installation",o)];case 2:throw a.sent();case 3:return[2]}}))}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function G(e,t){var n=e.appConfig;return function(e,t){I();var n=S(e),r=j.get(n);r||(r=new Set,j.set(n,r)),r.add(t)}(n,t),function(){!function(e,t){var n=S(e),r=j.get(n);r&&(r.delete(t),0===r.size&&j.delete(n),C())}(n,t)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(e){return l.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(P=o.a).INTERNAL.registerComponent(new a.Component("installations",(function(e){var t=e.getProvider("app").getImmediate(),n={appConfig:function(e){var t,n;if(!e||!e.options)throw J("App Configuration");if(!e.name)throw J("App Name");try{for(var r=Object(s.__values)(["projectId","apiKey","appId"]),i=r.next();!i.done;i=r.next()){var o=i.value;if(!e.options[o])throw J(o)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),platformLoggerProvider:e.getProvider("platform-logger")};return{app:t,getId:function(){
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return function(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n,r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return[4,F(e.appConfig)];case 1:return t=i.sent(),n=t.installationEntry,(r=t.registrationPromise)?r.catch(console.error):H(e).catch(console.error),[2,n.fid]}}))}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n)},getToken:function(e){return function(e,t){return void 0===t&&(t=!1),Object(s.__awaiter)(this,void 0,void 0,(function(){return Object(s.__generator)(this,(function(n){switch(n.label){case 0:return[4,z(e.appConfig)];case 1:return n.sent(),[4,H(e,t)];case 2:return[2,n.sent().token]}}))}))}(n,e)},delete:function(){return function(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n;return Object(s.__generator)(this,(function(r){switch(r.label){case 0:return[4,M(t=e.appConfig,(function(e){if(!e||0!==e.registrationStatus)return e}))];case 1:if(!(n=r.sent()))return[3,6];if(1!==n.registrationStatus)return[3,2];throw l.create("delete-pending-registration");case 2:if(2!==n.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw l.create("app-offline");case 3:return[4,$(t,n)];case 4:return r.sent(),[4,R(t)];case 5:r.sent(),r.label=6;case 6:return[2]}}))}))}(n)},onIdChange:function(e){return G(n,e)}}}),"PUBLIC")),P.registerVersion("@firebase/installations","0.4.17");var Y,X=((A={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',A["only-available-in-window"]="This method is available in a Window context.",A["only-available-in-sw"]="This method is available in a service worker context.",A["permission-default"]="The notification permission was not granted and dismissed instead.",A["permission-blocked"]="The notification permission was not granted and blocked instead.",A["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",A["failed-service-worker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",A["token-subscribe-failed"]="A problem occurred while subscribing the user to FCM: {$errorInfo}",A["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",A["token-unsubscribe-failed"]="A problem occurred while unsubscribing the user from FCM: {$errorInfo}",A["token-update-failed"]="A problem occurred while updating the user from FCM: {$errorInfo}",A["token-update-no-token"]="FCM returned no token when updating the user to push.",A["use-sw-after-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",A["invalid-sw-registration"]="The input to useServiceWorker() must be a ServiceWorkerRegistration.",A["invalid-bg-handler"]="The input to setBackgroundMessageHandler() must be a function.",A["invalid-vapid-key"]="The public VAPID key must be a string.",A["use-vapid-key-after-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",A),Z=new c.ErrorFactory("messaging","Messaging",X),Q="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ee(e){var t=new Uint8Array(e);return btoa(String.fromCharCode.apply(String,Object(s.__spread)(t))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function te(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length),i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(Y||(Y={}));function ne(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n,r=this;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return"databases"in indexedDB?[4,indexedDB.databases()]:[3,2];case 1:if(t=i.sent(),!t.map((function(e){return e.name})).includes("fcm_token_details_db"))return[2,null];i.label=2;case 2:return n=null,[4,Object(u.openDb)("fcm_token_details_db",5,(function(t){return Object(s.__awaiter)(r,void 0,void 0,(function(){var r,i,o,a;return Object(s.__generator)(this,(function(s){switch(s.label){case 0:return t.oldVersion<2?[2]:t.objectStoreNames.contains("fcm_token_object_Store")?[4,(r=t.transaction.objectStore("fcm_token_object_Store")).index("fcmSenderId").get(e)]:[2];case 1:return i=s.sent(),[4,r.clear()];case 2:if(s.sent(),!i)return[2];if(2===t.oldVersion){if(!(o=i).auth||!o.p256dh||!o.endpoint)return[2];n={token:o.fcmToken,createTime:null!==(a=o.createTime)&&void 0!==a?a:Date.now(),subscriptionOptions:{auth:o.auth,p256dh:o.p256dh,endpoint:o.endpoint,swScope:o.swScope,vapidKey:"string"==typeof o.vapidKey?o.vapidKey:ee(o.vapidKey)}}}else(3===t.oldVersion||4===t.oldVersion)&&(n={token:(o=i).fcmToken,createTime:o.createTime,subscriptionOptions:{auth:ee(o.auth),p256dh:ee(o.p256dh),endpoint:o.endpoint,swScope:o.swScope,vapidKey:ee(o.vapidKey)}});return[2]}}))}))}))];case 3:return i.sent().close(),[4,Object(u.deleteDb)("fcm_token_details_db")];case 4:return i.sent(),[4,Object(u.deleteDb)("fcm_vapid_details_db")];case 5:return i.sent(),[4,Object(u.deleteDb)("undefined")];case 6:return i.sent(),[2,re(n)?n:null]}}))}))}function re(e){if(!e||!e.subscriptionOptions)return!1;var t=e.subscriptionOptions;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie=null;function oe(){return ie||(ie=Object(u.openDb)("firebase-messaging-database",1,(function(e){switch(e.oldVersion){case 0:e.createObjectStore("firebase-messaging-store")}}))),ie}function ae(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n,r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return t=ue(e),[4,oe()];case 1:return[4,i.sent().transaction("firebase-messaging-store").objectStore("firebase-messaging-store").get(t)];case 2:return(n=i.sent())?[2,n]:[3,3];case 3:return[4,ne(e.appConfig.senderId)];case 4:return(r=i.sent())?[4,se(e,r)]:[3,6];case 5:return i.sent(),[2,r];case 6:return[2]}}))}))}function se(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r,i;return Object(s.__generator)(this,(function(o){switch(o.label){case 0:return n=ue(e),[4,oe()];case 1:return r=o.sent(),[4,(i=r.transaction("firebase-messaging-store","readwrite")).objectStore("firebase-messaging-store").put(t,n)];case 2:return o.sent(),[4,i.complete];case 3:return o.sent(),[2,t]}}))}))}function ce(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n,r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return t=ue(e),[4,oe()];case 1:return n=i.sent(),[4,(r=n.transaction("firebase-messaging-store","readwrite")).objectStore("firebase-messaging-store").delete(t)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}}))}))}function ue(e){return e.appConfig.appId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r,i,o,a,c;return Object(s.__generator)(this,(function(s){switch(s.label){case 0:return[4,de(e)];case 1:n=s.sent(),r=ve(t),i={method:"POST",headers:n,body:JSON.stringify(r)},s.label=2;case 2:return s.trys.push([2,5,,6]),[4,fetch(he(e.appConfig),i)];case 3:return[4,s.sent().json()];case 4:return o=s.sent(),[3,6];case 5:throw a=s.sent(),Z.create("token-subscribe-failed",{errorInfo:a});case 6:if(o.error)throw c=o.error.message,Z.create("token-subscribe-failed",{errorInfo:c});if(!o.token)throw Z.create("token-subscribe-no-token");return[2,o.token]}}))}))}function le(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r,i,o,a,c;return Object(s.__generator)(this,(function(s){switch(s.label){case 0:return[4,de(e)];case 1:n=s.sent(),r=ve(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)},s.label=2;case 2:return s.trys.push([2,5,,6]),[4,fetch(he(e.appConfig)+"/"+t.token,i)];case 3:return[4,s.sent().json()];case 4:return o=s.sent(),[3,6];case 5:throw a=s.sent(),Z.create("token-update-failed",{errorInfo:a});case 6:if(o.error)throw c=o.error.message,Z.create("token-update-failed",{errorInfo:c});if(!o.token)throw Z.create("token-update-no-token");return[2,o.token]}}))}))}function pe(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r,i,o,a;return Object(s.__generator)(this,(function(s){switch(s.label){case 0:return[4,de(e)];case 1:n=s.sent(),r={method:"DELETE",headers:n},s.label=2;case 2:return s.trys.push([2,5,,6]),[4,fetch(he(e.appConfig)+"/"+t,r)];case 3:return[4,s.sent().json()];case 4:if((i=s.sent()).error)throw o=i.error.message,Z.create("token-unsubscribe-failed",{errorInfo:o});return[3,6];case 5:throw a=s.sent(),Z.create("token-unsubscribe-failed",{errorInfo:a});case 6:return[2]}}))}))}function he(e){return"https://fcmregistrations.googleapis.com/v1/projects/"+e.projectId+"/registrations"}function de(e){var t=e.appConfig,n=e.installations;return Object(s.__awaiter)(this,void 0,void 0,(function(){var e;return Object(s.__generator)(this,(function(r){switch(r.label){case 0:return[4,n.getToken()];case 1:return e=r.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":"FIS "+e})]}}))}))}function ve(e){var t=e.p256dh,n=e.auth,r=e.endpoint,i=e.vapidKey,o={web:{endpoint:r,auth:n,p256dh:t}};return i!==Q&&(o.web.applicationPubKey=i),o}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(e,t,n){return Object(s.__awaiter)(this,void 0,void 0,(function(){var r,i,o,a;return Object(s.__generator)(this,(function(s){switch(s.label){case 0:if("granted"!==Notification.permission)throw Z.create("permission-blocked");return[4,_e(t,n)];case 1:return r=s.sent(),[4,ae(e)];case 2:return i=s.sent(),o={vapidKey:n,swScope:t.scope,endpoint:r.endpoint,auth:ee(r.getKey("auth")),p256dh:ee(r.getKey("p256dh"))},i?[3,3]:[2,me(e,o)];case 3:if(c=i.subscriptionOptions,f=(u=o).vapidKey===c.vapidKey,l=u.endpoint===c.endpoint,p=u.auth===c.auth,h=u.p256dh===c.p256dh,f&&l&&p&&h)return[3,8];s.label=4;case 4:return s.trys.push([4,6,,7]),[4,pe(e,i.token)];case 5:return s.sent(),[3,7];case 6:return a=s.sent(),console.warn(a),[3,7];case 7:return[2,me(e,o)];case 8:return Date.now()>=i.createTime+6048e5?[2,ye({token:i.token,createTime:Date.now(),subscriptionOptions:o},e,t)]:[2,i.token];case 9:return[2]}var c,u,f,l,p,h;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}))}))}function be(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return[4,ae(e)];case 1:return(n=i.sent())?[4,pe(e,n.token)]:[3,4];case 2:return i.sent(),[4,ce(e)];case 3:i.sent(),i.label=4;case 4:return[4,t.pushManager.getSubscription()];case 5:return(r=i.sent())?[2,r.unsubscribe()]:[2,!0]}}))}))}function ye(e,t,n){return Object(s.__awaiter)(this,void 0,void 0,(function(){var r,i,o;return Object(s.__generator)(this,(function(a){switch(a.label){case 0:return a.trys.push([0,3,,5]),[4,le(t,e)];case 1:return r=a.sent(),i=Object(s.__assign)(Object(s.__assign)({},e),{token:r,createTime:Date.now()}),[4,se(t,i)];case 2:return a.sent(),[2,r];case 3:return o=a.sent(),[4,be(t,n)];case 4:throw a.sent(),o;case 5:return[2]}}))}))}function me(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n,r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return[4,fe(e,t)];case 1:return n=i.sent(),r={token:n,createTime:Date.now(),subscriptionOptions:t},[4,se(e,r)];case 2:return i.sent(),[2,r.token]}}))}))}function _e(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n;return Object(s.__generator)(this,(function(r){switch(r.label){case 0:return[4,e.pushManager.getSubscription()];case 1:return(n=r.sent())?[2,n]:[2,e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:te(t)})]}}))}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function we(e){return"object"==typeof e&&!!e&&"google.c.a.c_id"in e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Oe=function(){function e(e){var t=this;this.firebaseDependencies=e,this.isOnBackgroundMessageUsed=null,this.vapidKey=null,this.bgMessageHandler=null,self.addEventListener("push",(function(e){e.waitUntil(t.onPush(e))})),self.addEventListener("pushsubscriptionchange",(function(e){e.waitUntil(t.onSubChange(e))})),self.addEventListener("notificationclick",(function(e){e.waitUntil(t.onNotificationClick(e))}))}return Object.defineProperty(e.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!1,configurable:!0}),e.prototype.setBackgroundMessageHandler=function(e){if(this.isOnBackgroundMessageUsed=!1,!e||"function"!=typeof e)throw Z.create("invalid-bg-handler");this.bgMessageHandler=e},e.prototype.onBackgroundMessage=function(e){var t=this;return this.isOnBackgroundMessageUsed=!0,this.bgMessageHandler=e,function(){t.bgMessageHandler=null}},e.prototype.getToken=function(){var e,t;return Object(s.__awaiter)(this,void 0,void 0,(function(){var n;return Object(s.__generator)(this,(function(r){switch(r.label){case 0:return this.vapidKey?[3,2]:[4,ae(this.firebaseDependencies)];case 1:n=r.sent(),this.vapidKey=null!==(t=null===(e=null==n?void 0:n.subscriptionOptions)||void 0===e?void 0:e.vapidKey)&&void 0!==t?t:Q,r.label=2;case 2:return[2,ge(this.firebaseDependencies,self.registration,this.vapidKey)]}}))}))},e.prototype.deleteToken=function(){return be(this.firebaseDependencies,self.registration)},e.prototype.requestPermission=function(){throw Z.create("only-available-in-window")},e.prototype.usePublicVapidKey=function(e){if(null!==this.vapidKey)throw Z.create("use-vapid-key-after-get-token");if("string"!=typeof e||0===e.length)throw Z.create("invalid-vapid-key");this.vapidKey=e},e.prototype.useServiceWorker=function(){throw Z.create("only-available-in-window")},e.prototype.onMessage=function(){throw Z.create("only-available-in-window")},e.prototype.onTokenRefresh=function(){throw Z.create("only-available-in-window")},e.prototype.onPush=function(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n,r,i;return Object(s.__generator)(this,(function(o){switch(o.label){case 0:return(t=function(e){var t=e.data;if(!t)return null;try{return t.json()}catch(e){return null}}(e))?[4,xe()]:(console.debug("FirebaseMessaging: failed to get parsed MessagePayload from the PushEvent. Skip handling the push."),[2]);case 1:return function(e){return e.some((function(e){return"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")}))}(n=o.sent())?[2,Ee(n,t)]:(r=!1,t.notification?[4,ke(Se(t))]:[3,3]);case 2:o.sent(),r=!0,o.label=3;case 3:return!0===r&&!1===this.isOnBackgroundMessageUsed||this.bgMessageHandler&&(i=function(e){var t={from:e.from,collapseKey:e.collapse_key};return function(e,t){if(!t.notification)return;e.notification={};var n=t.notification.title;n&&(e.notification.title=n);var r=t.notification.body;r&&(e.notification.body=r);var i=t.notification.image;i&&(e.notification.image=i)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){if(!t.fcmOptions)return;e.fcmOptions={};var n=t.fcmOptions.link;n&&(e.fcmOptions.link=n);var r=t.fcmOptions.analytics_label;r&&(e.fcmOptions.analyticsLabel=r)}(t,e),t}(t),"function"==typeof this.bgMessageHandler?this.bgMessageHandler(i):this.bgMessageHandler.next(i)),[2]}}))}))},e.prototype.onSubChange=function(e){var t,n;return Object(s.__awaiter)(this,void 0,void 0,(function(){var r;return Object(s.__generator)(this,(function(i){switch(i.label){case 0:return e.newSubscription?[3,2]:[4,be(this.firebaseDependencies,self.registration)];case 1:return i.sent(),[2];case 2:return[4,ae(this.firebaseDependencies)];case 3:return r=i.sent(),[4,be(this.firebaseDependencies,self.registration)];case 4:return i.sent(),[4,ge(this.firebaseDependencies,self.registration,null!==(n=null===(t=null==r?void 0:r.subscriptionOptions)||void 0===t?void 0:t.vapidKey)&&void 0!==n?n:Q)];case 5:return i.sent(),[2]}}))}))},e.prototype.onNotificationClick=function(e){var t,n;return Object(s.__awaiter)(this,void 0,void 0,(function(){var r,i,o,a,c;return Object(s.__generator)(this,(function(s){switch(s.label){case 0:return(r=null===(n=null===(t=e.notification)||void 0===t?void 0:t.data)||void 0===n?void 0:n.FCM_MSG)?e.action?[2]:(e.stopImmediatePropagation(),e.notification.close(),(i=function(e){var t,n,r,i=null!==(n=null===(t=e.fcmOptions)||void 0===t?void 0:t.link)&&void 0!==n?n:null===(r=e.notification)||void 0===r?void 0:r.click_action;if(i)return i;return we(e.data)?self.location.origin:null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r))?(o=new URL(i,self.location.href),a=new URL(self.location.origin),o.host!==a.host?[2]:[4,je(o)]):[2]):[2];case 1:return(c=s.sent())?[3,4]:[4,self.clients.openWindow(i)];case 2:return c=s.sent(),[4,(u=3e3,new Promise((function(e){setTimeout(e,u)})))];case 3:return s.sent(),[3,6];case 4:return[4,c.focus()];case 5:c=s.sent(),s.label=6;case 6:return c?(r.messageType=Y.NOTIFICATION_CLICKED,r.isFirebaseMessaging=!0,[2,c.postMessage(r)]):[2]}var u}))}))},e}();function Se(e){var t,n=Object(s.__assign)({},e.notification);return n.data=((t={}).FCM_MSG=e,t),n}function je(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n,r,i,o,a,c;return Object(s.__generator)(this,(function(u){switch(u.label){case 0:return[4,xe()];case 1:t=u.sent();try{for(n=Object(s.__values)(t),r=n.next();!r.done;r=n.next())if(i=r.value,o=new URL(i.url,self.location.href),e.host===o.host)return[2,i]}catch(e){a={error:e}}finally{try{r&&!r.done&&(c=n.return)&&c.call(n)}finally{if(a)throw a.error}}return[2,null]}}))}))}function Ee(e,t){var n,r;t.isFirebaseMessaging=!0,t.messageType=Y.PUSH_RECEIVED;try{for(var i=Object(s.__values)(e),o=i.next();!o.done;o=i.next()){o.value.postMessage(t)}}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}}function xe(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function ke(e){var t,n=e.actions,r=Notification.maxActions;return n&&r&&n.length>r&&console.warn("This browser only supports "+r+" actions. The remaining actions will not be displayed."),self.registration.showNotification(null!==(t=e.title)&&void 0!==t?t:"",e)}var Ie=function(){function e(e){var t=this;this.firebaseDependencies=e,this.vapidKey=null,this.onMessageCallback=null,navigator.serviceWorker.addEventListener("message",(function(e){return t.messageEventListener(e)}))}return Object.defineProperty(e.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!1,configurable:!0}),e.prototype.messageEventListener=function(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){var t,n;return Object(s.__generator)(this,(function(r){switch(r.label){case 0:return(t=e.data).isFirebaseMessaging?(this.onMessageCallback&&t.messageType===Y.PUSH_RECEIVED&&("function"==typeof this.onMessageCallback?this.onMessageCallback(function(e){return delete e.messageType,delete e.isFirebaseMessaging,e}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(Object.assign({},t))):this.onMessageCallback.next(Object.assign({},t))),we(n=t.data)&&"1"===n["google.c.a.e"]?[4,this.logEvent(t.messageType,n)]:[3,2]):[2];case 1:r.sent(),r.label=2;case 2:return[2]}}))}))},e.prototype.getVapidKey=function(){return this.vapidKey},e.prototype.getSwReg=function(){return this.swRegistration},e.prototype.getToken=function(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){return Object(s.__generator)(this,(function(t){switch(t.label){case 0:return"default"!==Notification.permission?[3,2]:[4,Notification.requestPermission()];case 1:t.sent(),t.label=2;case 2:if("granted"!==Notification.permission)throw Z.create("permission-blocked");return[4,this.updateVapidKey(null==e?void 0:e.vapidKey)];case 3:return t.sent(),[4,this.updateSwReg(null==e?void 0:e.serviceWorkerRegistration)];case 4:return t.sent(),[2,ge(this.firebaseDependencies,this.swRegistration,this.vapidKey)]}}))}))},e.prototype.updateVapidKey=function(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){return Object(s.__generator)(this,(function(t){return e?this.vapidKey=e:this.vapidKey||(this.vapidKey=Q),[2]}))}))},e.prototype.updateSwReg=function(e){return Object(s.__awaiter)(this,void 0,void 0,(function(){return Object(s.__generator)(this,(function(t){switch(t.label){case 0:return e||this.swRegistration?[3,2]:[4,this.registerDefaultSw()];case 1:t.sent(),t.label=2;case 2:if(!e&&this.swRegistration)return[2];if(!(e instanceof ServiceWorkerRegistration))throw Z.create("invalid-sw-registration");return this.swRegistration=e,[2]}}))}))},e.prototype.registerDefaultSw=function(){return Object(s.__awaiter)(this,void 0,void 0,(function(){var e,t;return Object(s.__generator)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),e=this,[4,navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"})];case 1:return e.swRegistration=n.sent(),this.swRegistration.update().catch((function(){})),[3,3];case 2:throw t=n.sent(),Z.create("failed-service-worker-registration",{browserErrorMessage:t.message});case 3:return[2]}}))}))},e.prototype.deleteToken=function(){return Object(s.__awaiter)(this,void 0,void 0,(function(){return Object(s.__generator)(this,(function(e){switch(e.label){case 0:return this.swRegistration?[3,2]:[4,this.registerDefaultSw()];case 1:e.sent(),e.label=2;case 2:return[2,be(this.firebaseDependencies,this.swRegistration)]}}))}))},e.prototype.requestPermission=function(){return Object(s.__awaiter)(this,void 0,void 0,(function(){var e;return Object(s.__generator)(this,(function(t){switch(t.label){case 0:return"granted"===Notification.permission?[2]:[4,Notification.requestPermission()];case 1:if("granted"===(e=t.sent()))return[2];throw"denied"===e?Z.create("permission-blocked"):Z.create("permission-default")}}))}))},e.prototype.usePublicVapidKey=function(e){if(null!==this.vapidKey)throw Z.create("use-vapid-key-after-get-token");if("string"!=typeof e||0===e.length)throw Z.create("invalid-vapid-key");this.vapidKey=e},e.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw Z.create("invalid-sw-registration");if(this.swRegistration)throw Z.create("use-sw-after-get-token");this.swRegistration=e},e.prototype.onMessage=function(e){var t=this;return this.onMessageCallback=e,function(){t.onMessageCallback=null}},e.prototype.setBackgroundMessageHandler=function(){throw Z.create("only-available-in-sw")},e.prototype.onBackgroundMessage=function(){throw Z.create("only-available-in-sw")},e.prototype.onTokenRefresh=function(){return function(){}},e.prototype.logEvent=function(e,t){return Object(s.__awaiter)(this,void 0,void 0,(function(){var n;return Object(s.__generator)(this,(function(r){switch(r.label){case 0:return n=function(e){switch(e){case Y.NOTIFICATION_CLICKED:return"notification_open";case Y.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}(e),[4,this.firebaseDependencies.analyticsProvider.get()];case 1:return r.sent().logEvent(n,{message_id:t["google.c.a.c_id"],message_name:t["google.c.a.c_l"],message_time:t["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)}),[2]}}))}))},e}();function Ce(e){return Z.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pe={isSupported:Ae};function Ae(){return self&&"ServiceWorkerGlobalScope"in self?"indexedDB"in self&&null!==indexedDB&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey"):"indexedDB"in window&&null!==indexedDB&&navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}o.a.INTERNAL.registerComponent(new a.Component("messaging",(function(e){var t=e.getProvider("app").getImmediate(),n={app:t,appConfig:function(e){var t,n;if(!e||!e.options)throw Ce("App Configuration Object");if(!e.name)throw Ce("App Name");var r=e.options;try{for(var i=Object(s.__values)(["projectId","apiKey","appId","messagingSenderId"]),o=i.next();!o.done;o=i.next()){var a=o.value;if(!r[a])throw Ce(a)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}return{appName:e.name,projectId:r.projectId,apiKey:r.apiKey,appId:r.appId,senderId:r.messagingSenderId}}(t),installations:e.getProvider("installations").getImmediate(),analyticsProvider:e.getProvider("analytics-internal")};if(!Ae())throw Z.create("unsupported-browser");return self&&"ServiceWorkerGlobalScope"in self?new Oe(n):new Ie(n)}),"PUBLIC").setServiceProps(Pe))},52:function(e,t,n){var r=n(34);e.exports=function(e){return Object(r(e))}},58:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},o=function(e,t){if(!e)throw a(t)},a=function(e){return new Error("Firebase Database ("+i.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)},s=function(e){for(var t=[],n=0,r=0;r<e.length;r++){var i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},c={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray:function(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[],i=0;i<e.length;i+=3){var o=e[i],a=i+1<e.length,s=a?e[i+1]:0,c=i+2<e.length,u=c?e[i+2]:0,f=o>>2,l=(3&o)<<4|s>>4,p=(15&s)<<2|u>>6,h=63&u;c||(h=64,a||(p=64)),r.push(n[f],n[l],n[p],n[h])}return r.join("")},encodeString:function(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(s(e),t)},decodeString:function(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){for(var t=[],n=0,r=0;n<e.length;){var i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){var o=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){var a=((7&i)<<18|(63&(o=e[n++]))<<12|(63&(s=e[n++]))<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(a>>10)),t[r++]=String.fromCharCode(56320+(1023&a))}else{o=e[n++];var s=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&s)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray:function(e,t){this.init_();for(var n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[],i=0;i<e.length;){var o=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0,s=++i<e.length?n[e.charAt(i)]:64,c=++i<e.length?n[e.charAt(i)]:64;if(++i,null==o||null==a||null==s||null==c)throw Error();var u=o<<2|a>>4;if(r.push(u),64!==s){var f=a<<4&240|s>>2;if(r.push(f),64!==c){var l=s<<6&192|c;r.push(l)}}}return r},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},u=function(e){try{return c.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var n in t)t.hasOwnProperty(n)&&(e[n]=f(e[n],t[n]));return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var l=function(){function e(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(t,n){e.resolve=t,e.reject=n}))}return e.prototype.wrapCallback=function(e){var t=this;return function(n,r){n?t.reject(n):t.resolve(r),"function"==typeof e&&(t.promise.catch((function(){})),1===e.length?e(n):e(n,r))}},e}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function h(){try{return"[object process]"===Object.prototype.toString.call(e.process)}catch(e){return!1}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var d=function(e){function t(n,r){var i=e.call(this,r)||this;return i.code=n,i.name="FirebaseError",Object.setPrototypeOf(i,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(i,v.prototype.create),i}return r.__extends(t,e),t}(Error),v=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=t[0]||{},i=this.service+"/"+e,o=this.errors[e],a=o?g(o,r):"Error",s=this.serviceName+": "+a+" ("+i+").",c=new d(i,s),u=0,f=Object.keys(r);u<f.length;u++){var l=f[u];"_"!==l.slice(-1)&&(l in c&&console.warn('Overwriting FirebaseError base field "'+l+'" can cause unexpected behavior.'),c[l]=r[l])}return c},e}();function g(e,t){return e.replace(b,(function(e,n){var r=t[n];return null!=r?String(r):"<"+n+"?>"}))}var b=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y(e){return JSON.parse(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var m=function(e){var t={},n={},r={},i="";try{var o=e.split(".");t=y(u(o[0])||""),n=y(u(o[1])||""),i=o[2],r=n.d||{},delete n.d}catch(e){}return{header:t,claims:n,data:r,signature:i}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _=function(){function e(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(var e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}return e.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},e.prototype.compress_=function(e,t){t||(t=0);var n=this.W_;if("string"==typeof e)for(var r=0;r<16;r++)n[r]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(r=0;r<16;r++)n[r]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(r=16;r<80;r++){var i=n[r-3]^n[r-8]^n[r-14]^n[r-16];n[r]=4294967295&(i<<1|i>>>31)}var o,a,s=this.chain_[0],c=this.chain_[1],u=this.chain_[2],f=this.chain_[3],l=this.chain_[4];for(r=0;r<80;r++){r<40?r<20?(o=f^c&(u^f),a=1518500249):(o=c^u^f,a=1859775393):r<60?(o=c&u|f&(c|u),a=2400959708):(o=c^u^f,a=3395469782);i=(s<<5|s>>>27)+o+l+a+n[r]&4294967295;l=f,f=u,u=4294967295&(c<<30|c>>>2),c=s,s=i}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+c&4294967295,this.chain_[2]=this.chain_[2]+u&4294967295,this.chain_[3]=this.chain_[3]+f&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295},e.prototype.update=function(e,t){if(null!=e){void 0===t&&(t=e.length);for(var n=t-this.blockSize,r=0,i=this.buf_,o=this.inbuf_;r<t;){if(0===o)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"==typeof e){for(;r<t;)if(i[o]=e.charCodeAt(r),++r,++o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<t;)if(i[o]=e[r],++r,++o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=t}},e.prototype.digest=function(){var e=[],t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var n=this.blockSize-1;n>=56;n--)this.buf_[n]=255&t,t/=256;this.compress_(this.buf_);var r=0;for(n=0;n<5;n++)for(var i=24;i>=0;i-=8)e[r]=this.chain_[n]>>i&255,++r;return e},e}();var w=function(){function e(e,t){var n=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((function(){e(n)})).catch((function(e){n.error(e)}))}return e.prototype.next=function(e){this.forEachObserver((function(t){t.next(e)}))},e.prototype.error=function(e){this.forEachObserver((function(t){t.error(e)})),this.close(e)},e.prototype.complete=function(){this.forEachObserver((function(e){e.complete()})),this.close()},e.prototype.subscribe=function(e,t,n){var r,i=this;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");void 0===(r=function(e,t){if("object"!=typeof e||null===e)return!1;for(var n=0,r=t;n<r.length;n++){var i=r[n];if(i in e&&"function"==typeof e[i])return!0}return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n}).next&&(r.next=O),void 0===r.error&&(r.error=O),void 0===r.complete&&(r.complete=O);var o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((function(){try{i.finalError?r.error(i.finalError):r.complete()}catch(e){}})),this.observers.push(r),o},e.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},e.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},e.prototype.sendOne=function(e,t){var n=this;this.task.then((function(){if(void 0!==n.observers&&void 0!==n.observers[e])try{t(n.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))},e.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((function(){t.observers=void 0,t.onNoObservers=void 0})))},e}();function O(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(e,t,n){var r="";switch(t){case 1:r=n?"first":"First";break;case 2:r=n?"second":"Second";break;case 3:r=n?"third":"Third";break;case 4:r=n?"fourth":"Fourth";break;default:throw new Error("errorPrefix called with argumentNumber > 4.  Need to update it?")}var i=e+" failed: ";return i+=r+" argument "}t.CONSTANTS=i,t.Deferred=l,t.ErrorFactory=v,t.FirebaseError=d,t.MAX_VALUE_MILLIS=144e5,t.RANDOM_FACTOR=.5,t.Sha1=_,t.areCookiesEnabled=function(){return!(!navigator||!navigator.cookieEnabled)},t.assert=o,t.assertionError=a,t.async=function(e,t){return function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];Promise.resolve(!0).then((function(){e.apply(void 0,n)})).catch((function(e){t&&t(e)}))}},t.base64=c,t.base64Decode=u,t.base64Encode=function(e){var t=s(e);return c.encodeByteArray(t,!0)},t.calculateBackoffMillis=function(e,t,n){void 0===t&&(t=1e3),void 0===n&&(n=2);var r=t*Math.pow(n,e),i=Math.round(.5*r*(Math.random()-.5)*2);return Math.min(144e5,r+i)},t.contains=
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.createSubscribe=function(e,t){var n=new w(e,t);return n.subscribe.bind(n)},t.decode=m,t.deepCopy=
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){return f(void 0,e)},t.deepExtend=f,t.errorPrefix=S,t.getUA=p,t.isAdmin=function(e){var t=m(e).claims;return"object"==typeof t&&!0===t.admin},t.isBrowser=function(){return"object"==typeof self&&self.self===self},t.isBrowserExtension=function(){var e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id},t.isElectron=function(){return p().indexOf("Electron/")>=0},t.isEmpty=function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0},t.isIE=function(){var e=p();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0},t.isIndexedDBAvailable=function(){return"indexedDB"in self&&null!=indexedDB},t.isMobileCordova=function(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(p())},t.isNode=h,t.isNodeSdk=function(){return!0===i.NODE_CLIENT||!0===i.NODE_ADMIN},t.isReactNative=function(){return"object"==typeof navigator&&"ReactNative"===navigator.product},t.isSafari=function(){return!h()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")},t.isUWP=function(){return p().indexOf("MSAppHost/")>=0},t.isValidFormat=function(e){var t=m(e).claims;return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")},t.isValidTimestamp=function(e){var t=m(e).claims,n=Math.floor((new Date).getTime()/1e3),r=0,i=0;return"object"==typeof t&&(t.hasOwnProperty("nbf")?r=t.nbf:t.hasOwnProperty("iat")&&(r=t.iat),i=t.hasOwnProperty("exp")?t.exp:r+86400),!!n&&!!r&&!!i&&n>=r&&n<=i},t.issuedAtTime=function(e){var t=m(e).claims;return"object"==typeof t&&t.hasOwnProperty("iat")?t.iat:null},t.jsonEval=y,t.map=function(e,t,n){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,t.querystring=function(e){for(var t=[],n=function(e,n){Array.isArray(n)?n.forEach((function(n){t.push(encodeURIComponent(e)+"="+encodeURIComponent(n))})):t.push(encodeURIComponent(e)+"="+encodeURIComponent(n))},r=0,i=Object.entries(e);r<i.length;r++){var o=i[r];n(o[0],o[1])}return t.length?"&"+t.join("&"):""},t.querystringDecode=function(e){var t={};return e.replace(/^\?/,"").split("&").forEach((function(e){if(e){var n=e.split("=");t[n[0]]=n[1]}})),t},t.safeGet=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0},t.stringLength=function(e){for(var t=0,n=0;n<e.length;n++){var r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t},t.stringToByteArray=function(e){for(var t=[],n=0,r=0;r<e.length;r++){var i=e.charCodeAt(r);if(i>=55296&&i<=56319){var a=i-55296;r++,o(r<e.length,"Surrogate pair missing trail surrogate."),i=65536+(a<<10)+(e.charCodeAt(r)-56320)}i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):i<65536?(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},t.stringify=function(e){return JSON.stringify(e)},t.validateArgCount=function(e,t,n,r){var i;if(r<t?i="at least "+t:r>n&&(i=0===n?"none":"no more than "+n),i)throw new Error(e+" failed: Was called with "+r+(1===r?" argument.":" arguments.")+" Expects "+i+".")},t.validateCallback=function(e,t,n,r){if((!r||n)&&"function"!=typeof n)throw new Error(S(e,t,r)+"must be a valid function.")},t.validateContextObject=function(e,t,n,r){if((!r||n)&&("object"!=typeof n||null===n))throw new Error(S(e,t,r)+"must be a valid context object.")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */,t.validateIndexedDBOpenable=function(){return new Promise((function(e,t){try{var n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=window.indexedDB.open(r);i.onsuccess=function(){i.result.close(),n||window.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=function(){n=!1},i.onerror=function(){var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))},t.validateNamespace=function(e,t,n,r){if((!r||n)&&"string"!=typeof n)throw new Error(S(e,t,r)+"must be a valid firebase namespace.")}}).call(this,n(30))},60:function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},61:function(e,t,n){var r=n(103),i=n(34);e.exports=function(e){return r(i(e))}},63:function(e,t,n){var r,i,o,a=n(138),s=n(7),c=n(15),u=n(31),f=n(22),l=n(81),p=n(102),h=n(76),d=s.WeakMap;if(a){var v=l.state||(l.state=new d),g=v.get,b=v.has,y=v.set;r=function(e,t){return t.facade=e,y.call(v,e,t),t},i=function(e){return g.call(v,e)||{}},o=function(e){return b.call(v,e)}}else{var m=p("state");h[m]=!0,r=function(e,t){return t.facade=e,u(e,m,t),t},i=function(e){return f(e,m)?e[m]:{}},o=function(e){return f(e,m)}}e.exports={set:r,get:i,has:o,enforce:function(e){return o(e)?i(e):r(e,{})},getterFor:function(e){return function(t){var n;if(!c(t)||(n=i(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return n}}}},7:function(e,t,n){(function(t){var n=function(e){return e&&e.Math==Math&&e};e.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof t&&t)||function(){return this}()||Function("return this")()}).call(this,n(30))},73:function(e,t,n){"use strict";var r,i,o=n(167),a=n(264),s=n(79),c=RegExp.prototype.exec,u=s("native-string-replace",String.prototype.replace),f=c,l=(r=/a/,i=/b*/g,c.call(r,"a"),c.call(i,"a"),0!==r.lastIndex||0!==i.lastIndex),p=a.UNSUPPORTED_Y||a.BROKEN_CARET,h=void 0!==/()??/.exec("")[1];(l||h||p)&&(f=function(e){var t,n,r,i,a=this,s=p&&a.sticky,f=o.call(a),d=a.source,v=0,g=e;return s&&(-1===(f=f.replace("y","")).indexOf("g")&&(f+="g"),g=String(e).slice(a.lastIndex),a.lastIndex>0&&(!a.multiline||a.multiline&&"\n"!==e[a.lastIndex-1])&&(d="(?: "+d+")",g=" "+g,v++),n=new RegExp("^(?:"+d+")",f)),h&&(n=new RegExp("^"+d+"$(?!\\s)",f)),l&&(t=a.lastIndex),r=c.call(s?n:a,g),s?r?(r.input=r.input.slice(v),r[0]=r[0].slice(v),r.index=a.lastIndex,a.lastIndex+=r[0].length):a.lastIndex=0:l&&r&&(a.lastIndex=a.global?r.index+r[0].length:t),h&&r&&r.length>1&&u.call(r[0],n,(function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(r[i]=void 0)})),r}),e.exports=f},75:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},76:function(e,t){e.exports={}},77:function(e,t,n){"use strict";var r=n(14),i=n(73);r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},78:function(e,t,n){var r={};r[n(10)("toStringTag")]="z",e.exports="[object z]"===String(r)},79:function(e,t,n){var r=n(80),i=n(81);(e.exports=function(e,t){return i[e]||(i[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.10.0",mode:r?"pure":"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})},80:function(e,t){e.exports=!1},81:function(e,t,n){var r=n(7),i=n(82),o=r["__core-js_shared__"]||i("__core-js_shared__",{});e.exports=o},82:function(e,t,n){var r=n(7),i=n(31);e.exports=function(e,t){try{i(r,e,t)}catch(n){r[e]=t}return t}},84:function(e,t,n){var r=n(148),i=n(103),o=n(52),a=n(42),s=n(146),c=[].push,u=function(e){var t=1==e,n=2==e,u=3==e,f=4==e,l=6==e,p=7==e,h=5==e||l;return function(d,v,g,b){for(var y,m,_=o(d),w=i(_),O=r(v,g,3),S=a(w.length),j=0,E=b||s,x=t?E(d,S):n||p?E(d,0):void 0;S>j;j++)if((h||j in w)&&(m=O(y=w[j],j,_),e))if(t)x[j]=m;else if(m)switch(e){case 3:return!0;case 5:return y;case 6:return j;case 2:c.call(x,y)}else switch(e){case 4:return!1;case 7:c.call(x,y)}return l?-1:u||f?f:x}};e.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterOut:u(7)}},9:function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},90:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i,o=n(0),a=n(58),s=n(91),c=n(502),u=((r={})["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",r["bad-app-name"]="Illegal App name: '{$appName}",r["duplicate-app"]="Firebase App named '{$appName}' already exists",r["app-deleted"]="Firebase App named '{$appName}' already deleted",r["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",r["invalid-log-argument"]="First argument to `onLog` must be null or a function.",r),f=new a.ErrorFactory("app","Firebase",u),l=((i={})["@firebase/app"]="fire-core",i["@firebase/analytics"]="fire-analytics",i["@firebase/auth"]="fire-auth",i["@firebase/database"]="fire-rtdb",i["@firebase/functions"]="fire-fn",i["@firebase/installations"]="fire-iid",i["@firebase/messaging"]="fire-fcm",i["@firebase/performance"]="fire-perf",i["@firebase/remote-config"]="fire-rc",i["@firebase/storage"]="fire-gcs",i["@firebase/firestore"]="fire-fst",i["fire-js"]="fire-js",i["firebase-wrapper"]="fire-js-all",i),p=new c.Logger("@firebase/app"),h=function(){function e(e,t,n){var r,i,c=this;this.firebase_=n,this.isDeleted_=!1,this.name_=t.name,this.automaticDataCollectionEnabled_=t.automaticDataCollectionEnabled||!1,this.options_=a.deepCopy(e),this.container=new s.ComponentContainer(t.name),this._addComponent(new s.Component("app",(function(){return c}),"PUBLIC"));try{for(var u=o.__values(this.firebase_.INTERNAL.components.values()),f=u.next();!f.done;f=u.next()){var l=f.value;this._addComponent(l)}}catch(e){r={error:e}}finally{try{f&&!f.done&&(i=u.return)&&i.call(u)}finally{if(r)throw r.error}}}return Object.defineProperty(e.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!1,configurable:!0}),e.prototype.delete=function(){var e=this;return new Promise((function(t){e.checkDestroyed_(),t()})).then((function(){return e.firebase_.INTERNAL.removeApp(e.name_),Promise.all(e.container.getProviders().map((function(e){return e.delete()})))})).then((function(){e.isDeleted_=!0}))},e.prototype._getService=function(e,t){return void 0===t&&(t="[DEFAULT]"),this.checkDestroyed_(),this.container.getProvider(e).getImmediate({identifier:t})},e.prototype._removeServiceInstance=function(e,t){void 0===t&&(t="[DEFAULT]"),this.container.getProvider(e).clearInstance(t)},e.prototype._addComponent=function(e){try{this.container.addComponent(e)}catch(t){p.debug("Component "+e.name+" failed to register with FirebaseApp "+this.name,t)}},e.prototype._addOrOverwriteComponent=function(e){this.container.addOrOverwriteComponent(e)},e.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw f.create("app-deleted",{appName:this.name_})},e}();h.prototype.name&&h.prototype.options||h.prototype.delete||console.log("dc");var d=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function e(){var t=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){var t={},n=new Map,r={__esModule:!0,initializeApp:function(n,i){void 0===i&&(i={});if("object"!=typeof i||null===i){i={name:i}}var o=i;void 0===o.name&&(o.name="[DEFAULT]");var s=o.name;if("string"!=typeof s||!s)throw f.create("bad-app-name",{appName:String(s)});if(a.contains(t,s))throw f.create("duplicate-app",{appName:s});var c=new e(n,o,r);return t[s]=c,c},app:i,registerVersion:function(e,t,n){var r,i=null!==(r=l[e])&&void 0!==r?r:e;n&&(i+="-"+n);var o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){var c=['Unable to register library "'+i+'" with version "'+t+'":'];return o&&c.push('library name "'+i+'" contains illegal characters (whitespace or "/")'),o&&a&&c.push("and"),a&&c.push('version name "'+t+'" contains illegal characters (whitespace or "/")'),void p.warn(c.join(" "))}u(new s.Component(i+"-version",(function(){return{library:i,version:t}}),"VERSION"))},setLogLevel:c.setLogLevel,onLog:function(e,t){if(null!==e&&"function"!=typeof e)throw f.create("invalid-log-argument",{appName:name});c.setUserLogHandler(e,t)},apps:null,SDK_VERSION:"7.20.0",INTERNAL:{registerComponent:u,removeApp:function(e){delete t[e]},components:n,useAsService:function(e,t){if("serverAuth"===t)return null;return t}}};function i(e){if(e=e||"[DEFAULT]",!a.contains(t,e))throw f.create("no-app",{appName:e});return t[e]}function u(s){var c,u,l=s.name;if(n.has(l))return p.debug("There were multiple attempts to register component "+l+"."),"PUBLIC"===s.type?r[l]:null;if(n.set(l,s),"PUBLIC"===s.type){var h=function(e){if(void 0===e&&(e=i()),"function"!=typeof e[l])throw f.create("invalid-app-argument",{appName:l});return e[l]()};void 0!==s.serviceProps&&a.deepExtend(h,s.serviceProps),r[l]=h,e.prototype[l]=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=this._getService.bind(this,l);return n.apply(this,s.multipleInstances?e:[])}}try{for(var d=o.__values(Object.keys(t)),v=d.next();!v.done;v=d.next()){var g=v.value;t[g]._addComponent(s)}}catch(e){c={error:e}}finally{try{v&&!v.done&&(u=d.return)&&u.call(d)}finally{if(c)throw c.error}}return"PUBLIC"===s.type?r[l]:null}return r.default=r,Object.defineProperty(r,"apps",{get:function(){return Object.keys(t).map((function(e){return t[e]}))}}),i.App=e,r}(h);return t.INTERNAL=o.__assign(o.__assign({},t.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){a.deepExtend(t,e)},createSubscribe:a.createSubscribe,ErrorFactory:a.ErrorFactory,deepExtend:a.deepExtend}),t}(),v=function(){function e(e){this.container=e}return e.prototype.getPlatformInfoString=function(){return this.container.getProviders().map((function(e){if(function(e){var t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)){var t=e.getImmediate();return t.library+"/"+t.version}return null})).filter((function(e){return e})).join(" ")},e}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
if(a.isBrowser()&&void 0!==self.firebase){p.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");var g=self.firebase.SDK_VERSION;g&&g.indexOf("LITE")>=0&&p.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}var b=d.initializeApp;d.initializeApp=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return a.isNode()&&p.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      '),b.apply(void 0,e)};var y=d;!function(e,t){e.INTERNAL.registerComponent(new s.Component("platform-logger",(function(e){return new v(e)}),"PRIVATE")),e.registerVersion("@firebase/app","0.6.11",t),e.registerVersion("fire-js","")}(y),t.default=y,t.firebase=y},91:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n(58),o=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e}(),a=function(){function e(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map}return e.prototype.get=function(e){void 0===e&&(e="[DEFAULT]");var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var n=new i.Deferred;this.instancesDeferred.set(t,n);try{var r=this.getOrInitializeService(t);r&&n.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise},e.prototype.getImmediate=function(e){var t=r.__assign({identifier:"[DEFAULT]",optional:!1},e),n=t.identifier,i=t.optional,o=this.normalizeInstanceIdentifier(n);try{var a=this.getOrInitializeService(o);if(!a){if(i)return null;throw Error("Service "+this.name+" is not available")}return a}catch(e){if(i)return null;throw e}},e.prototype.getComponent=function(){return this.component},e.prototype.setComponent=function(e){var t,n;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService("[DEFAULT]")}catch(e){}try{for(var i=r.__values(this.instancesDeferred.entries()),o=i.next();!o.done;o=i.next()){var a=r.__read(o.value,2),s=a[0],c=a[1],u=this.normalizeInstanceIdentifier(s);try{var f=this.getOrInitializeService(u);c.resolve(f)}catch(e){}}}catch(e){t={error:e}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}},e.prototype.clearInstance=function(e){void 0===e&&(e="[DEFAULT]"),this.instancesDeferred.delete(e),this.instances.delete(e)},e.prototype.delete=function(){return r.__awaiter(this,void 0,void 0,(function(){var e;return r.__generator(this,(function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(r.__spread(e.filter((function(e){return"INTERNAL"in e})).map((function(e){return e.INTERNAL.delete()})),e.filter((function(e){return"_delete"in e})).map((function(e){return e._delete()}))))];case 1:return t.sent(),[2]}}))}))},e.prototype.isComponentSet=function(){return null!=this.component},e.prototype.getOrInitializeService=function(e){var t=this.instances.get(e);return!t&&this.component&&(t=this.component.instanceFactory(this.container,function(e){return"[DEFAULT]"===e?void 0:e}(e)),this.instances.set(e,t)),t||null},e.prototype.normalizeInstanceIdentifier=function(e){return this.component?this.component.multipleInstances?e:"[DEFAULT]":e},e}();var s=function(){function e(e){this.name=e,this.providers=new Map}return e.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},e.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},e.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new a(e,this);return this.providers.set(e,t),t},e.prototype.getProviders=function(){return Array.from(this.providers.values())},e}();t.Component=o,t.ComponentContainer=s,t.Provider=a},92:function(e,t,n){var r=n(15);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},93:function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++n+r).toString(36)}},94:function(e,t,n){var r,i,o=n(7),a=n(137),s=o.process,c=s&&s.versions,u=c&&c.v8;u?i=(r=u.split("."))[0]+r[1]:a&&(!(r=a.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=a.match(/Chrome\/(\d+)/))&&(i=r[1]),e.exports=i&&+i},95:function(e,t,n){var r=n(173),i=n(7),o=function(e){return"function"==typeof e?e:void 0};e.exports=function(e,t){return arguments.length<2?o(r[e])||o(i[e]):r[e]&&r[e][t]||i[e]&&i[e][t]}},96:function(e,t,n){var r=n(44),i=n(177),o=n(75),a=n(61),s=n(92),c=n(22),u=n(128),f=Object.getOwnPropertyDescriptor;t.f=r?f:function(e,t){if(e=a(e),t=s(t,!0),u)try{return f(e,t)}catch(e){}if(c(e,t))return o(!i.f.call(e,t),e[t])}},98:function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function");return e}}});