import * as __WEBPACK_EXTERNAL_MODULE__js_wait_background_js_199dd16a__ from "/js/wait-background.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_background_js_e9185ef7__ from "/js/background.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_vue_runtime_esm_js_5b56ac01__ from "/js/vue.runtime.esm.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_json_js_f67ba1b8__ from "/js/json.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__ from "/js/constants.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_containers_js_58464038__ from "/js/containers.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_storage_js_76b1d68f__ from "/js/storage.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_messages_js_e1b129b7__ from "/js/messages.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_file_js_98ff2f38__ from "/js/file.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_tabs_js_b1cc2156__ from "/js/tabs.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__ from "/js/groups.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__ from "/js/utils.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_logger_js_162b1479__ from "/js/logger.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_urls_js_a3942af5__ from "/js/urls.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_cache_js_87263abf__ from "/js/cache.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_windows_js_630ae37e__ from "/js/windows.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_mixins_default_group_mixin_js_b0c4f4fc__ from "/js/mixins/default-group.mixin.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_mixins_start_up_data_mixin_js_421c48e9__ from "/js/mixins/start-up-data.mixin.js";
/******/ var __webpack_modules__ = ({

/***/ 476:
/***/ (function(module) {

(function(t,e){ true?module.exports=e():0})("undefined"!==typeof self?self:this,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="fb15")}({"0ca3":function(t,e,n){"use strict";var r=n("c6aa"),i=n.n(r);i.a},7937:function(t,e,n){},"7fca":function(t,e,n){"use strict";var r=n("c10a"),i=n.n(r);i.a},8875:function(t,e,n){var r,i,o;(function(n,c){i=[],r=c,o="function"===typeof r?r.apply(e,i):r,void 0===o||(t.exports=o)})("undefined"!==typeof self&&self,(function(){function t(){if(document.currentScript)return document.currentScript;try{throw new Error}catch(h){var t,e,n,r=/.*at [^(]*\((.*):(.+):(.+)\)$/gi,i=/@([^@]*):(\d+):(\d+)\s*$/gi,o=r.exec(h.stack)||i.exec(h.stack),c=o&&o[1]||!1,s=o&&o[2]||!1,a=document.location.href.replace(document.location.hash,""),l=document.getElementsByTagName("script");c===a&&(t=document.documentElement.outerHTML,e=new RegExp("(?:[^\\n]+?\\n){0,"+(s-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),n=t.replace(e,"$1").trim());for(var u=0;u<l.length;u++){if("interactive"===l[u].readyState)return l[u];if(l[u].src===c)return l[u];if(c===a&&l[u].innerHTML&&l[u].innerHTML.trim()===n)return l[u]}return null}}return t}))},9334:function(t,e,n){"use strict";var r=n("7937"),i=n.n(r);i.a},c10a:function(t,e,n){},c6aa:function(t,e,n){},fb15:function(t,e,n){"use strict";if(n.r(e),n.d(e,"DEFAULT_BACKGROUND_COLOR",(function(){return E})),n.d(e,"DEFAULT_BORDER_RADIUS",(function(){return R})),n.d(e,"DEFAULT_ROW_LENGTH",(function(){return F})),n.d(e,"DEFAULT_TRIGGER_CONTAINER_SPACE",(function(){return P})),n.d(e,"DEFAULT_SWATCH_SIZE",(function(){return D})),n.d(e,"DEFAULT_SHOW_BORDER",(function(){return A})),n.d(e,"extractPropertyFromPreset",(function(){return T})),"undefined"!==typeof window){var r=window.document.currentScript,i=n("8875");r=i(),"currentScript"in document||Object.defineProperty(document,"currentScript",{get:i});var o=r&&r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);o&&(n.p=o[1])}var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue-swatches",attrs:{tabindex:"-1"},on:{blur:function(e){return t.onBlur(e.relatedTarget)}}},[t.inline?t._e():n("div",{ref:"triggerWrapper",staticClass:"vue-swatches__trigger__wrapper",on:{click:t.togglePopover}},[t._t("trigger",[n("div",{staticClass:"vue-swatches__trigger",class:{"vue-swatches--is-empty":!t.value,"vue-swatches--is-disabled":t.disabled},style:t.triggerStyles},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isNoColor,expression:"isNoColor"}],staticClass:"vue-swatches__diagonal__wrapper vue-swatches--has-children-centered"},[n("div",{staticClass:"vue-swatches__diagonal"})])])])],2),n("transition",{attrs:{name:"vue-swatches-show-hide"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.inline||t.isOpen,expression:"inline || isOpen"}],ref:"containerWrapper",staticClass:"vue-swatches__container",class:{"vue-swatches--inline":t.inline},style:t.containerStyles},[n("div",{staticClass:"vue-swatches__wrapper",style:t.wrapperStyles},[t.isNested?t._l(t.computedSwatches,(function(e,r){return n("div",{key:r,staticClass:"vue-swatches__row"},t._l(e,(function(i,o){return n("v-swatch",{key:o,attrs:{"is-last":r===t.computedSwatches.length-1&&o===e.length,"row-length-setted":null!==t.rowLength||null!==t.presetRowLength,"border-radius":t.computedBorderRadius,disabled:t.getSwatchDisabled(i),inline:t.inline,selected:t.checkEquality(t.getSwatchColor(i),t.value),"swatch-size":t.computedSwatchSize,"spacing-size":t.computedSpacingSize,"show-border":t.getSwatchShowBorder(i),"show-checkbox":t.showCheckbox,"show-labels":t.showLabels,"swatch-color":t.getSwatchColor(i),"swatch-label":t.getSwatchLabel(i),"swatch-alt":t.getSwatchAlt(i),"swatch-style":t.swatchStyle},on:{blur:function(e){return t.onBlur(e)},click:function(e){return t.updateSwatch(i)}},nativeOn:{click:function(e){return t.updateSwatch(i)}}})})),1)})):t._l(t.computedSwatches,(function(e,r){return n("v-swatch",{key:r,attrs:{"is-last":r===t.computedSwatches.length-1,"row-length-setted":null!==t.rowLength||null!==t.presetRowLength,"border-radius":t.computedBorderRadius,disabled:t.getSwatchDisabled(e),inline:t.inline,selected:t.checkEquality(t.getSwatchColor(e),t.value),"swatch-size":t.computedSwatchSize,"spacing-size":t.computedSpacingSize,"show-border":t.getSwatchShowBorder(e),"show-checkbox":t.showCheckbox,"show-labels":t.showLabels,"swatch-color":t.getSwatchColor(e),"swatch-label":t.getSwatchLabel(e),"swatch-alt":t.getSwatchAlt(e),"swatch-style":t.swatchStyle},on:{blur:function(e){return t.onBlur(e)},click:function(n){return t.updateSwatch(e)}},nativeOn:{click:function(n){return t.updateSwatch(e)}}})}))],2),t.showFallback?n("div",{staticClass:"vue-swatches__fallback__wrapper",style:t.computedFallbackWrapperStyles},[n("span",{staticClass:"vue-swatches__fallback__input--wrapper"},[n("input",{ref:"fallbackInput",staticClass:"vue-swatches__fallback__input",class:t.fallbackInputClass,attrs:{type:t.fallbackInputType},domProps:{value:t.internalValue},on:{input:function(e){return t.updateSwatch(e.target.value,{fromFallbackInput:!0})}}})]),t.showFallbackOk?n("button",{staticClass:"vue-swatches__fallback__button",class:t.fallbackOkClass,on:{click:function(e){return e.preventDefault(),t.onFallbackButtonClick(e)}}},[t._v(" "+t._s(t.fallbackOkText)+" ")]):t._e()]):t._e()])])],1)},s=[],a={colors:["#1FBC9C","#1CA085","#2ECC70","#27AF60","#3398DB","#2980B9","#A463BF","#8E43AD","#3D556E","#222F3D","#F2C511","#F39C19","#E84B3C","#C0382B","#DDE6E8","#BDC3C8"],rowLength:4},l={colors:["#CC0001","#E36101","#FFCC00","#009900","#0066CB","#000000","#FFFFFF"],showBorder:!0},u={colors:[["#000000","#434343","#666666","#999999","#b7b7b7","#cccccc","#d9d9d9","#efefef","#f3f3f3","#ffffff"],["#980000","#ff0000","#ff9900","#ffff00","#00ff00","#00ffff","#4a86e8","#0000ff","#9900ff","#ff00ff"],["#e6b8af","#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#c9daf8","#cfe2f3","#d9d2e9","#ead1dc"],["#dd7e6b","#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#a4c2f4","#9fc5e8","#b4a7d6","#d5a6bd"],["#cc4125","#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6d9eeb","#6fa8dc","#8e7cc3","#c27ba0"],["#a61c00","#cc0000","#e69138","#f1c232","#6aa84f","#45818e","#3c78d8","#3d85c6","#674ea7","#a64d79"],["#85200c","#990000","#b45f06","#bf9000","#38761d","#134f5c","#1155cc","#0b5394","#351c75","#741b47"],["#5b0f00","#660000","#783f04","#7f6000","#274e13","#0c343d","#1c4587","#073763","#20124d","#4c1130"]],borderRadius:"0",rowLength:10,swatchSize:24,spacingSize:0},h=function(){var t=this,e=this,n=e.$createElement,r=e._self._c||n;return r("div",{staticClass:"vue-swatches__swatch",class:{"vue-swatches__swatch--border":e.showBorder,"vue-swatches__swatch--selected":e.selected,"vue-swatches__swatch--is-disabled":e.disabled},style:e.swatchStyles,attrs:{"aria-label":e.swatchAlt,role:"button",tabindex:"0"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.$emit("click",e.swatchColor)},blur:function(e){return t.$emit("blur",e.relatedTarget)}}},[""===e.swatchColor?r("div",{staticClass:"vue-swatches__diagonal__wrapper vue-swatches--has-children-centered"},[r("div",{staticClass:"vue-swatches__diagonal"})]):e._e(),r("v-check",{directives:[{name:"show",rawName:"v-show",value:e.showCheckbox&&e.selected,expression:"showCheckbox && selected"}]}),e.showLabels?r("div",{staticClass:"vue-swatches__swatch__label",style:e.labelStyles},[e._v(" "+e._s(e.swatchLabel)+" ")]):e._e()],1)},p=[],d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue-swatches__check__wrapper vue-swatches--has-children-centered"},[n("div",{staticClass:"vue-swatches__check__circle vue-swatches--has-children-centered"},[n("svg",{staticClass:"check",attrs:{version:"1.1",role:"presentation",width:"12",height:"12",viewBox:"0 0 1792 1792"}},[n("path",{staticClass:"vue-swatches__check__path",attrs:{d:"M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"}})])])])},f=[],w={name:"v-check",data:function(){return{}}},b=w;n("7fca");function S(t,e,n,r,i,o,c,s){var a,l="function"===typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),o&&(l._scopeId="data-v-"+o),c?(a=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(c)},l._ssrRegister=a):i&&(a=s?function(){i.call(this,this.$root.$options.shadowRoot)}:i),a)if(l.functional){l._injectStyles=a;var u=l.render;l.render=function(t,e){return a.call(e),u(t,e)}}else{var h=l.beforeCreate;l.beforeCreate=h?[].concat(h,a):[a]}return{exports:t,options:l}}var g=S(b,d,f,!1,null,null,null),y=g.exports;function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(Object(n),!0).forEach((function(e){_(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function _(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var O={name:"v-swatch",components:{VCheck:y},props:{borderRadius:{type:String},isLast:{type:Boolean,default:!1},rowLengthSetted:{type:Boolean,default:!1},disabled:{type:Boolean},inline:{type:Boolean},selected:{type:Boolean,default:!1},showCheckbox:{type:Boolean},showBorder:{type:Boolean},showLabels:{type:Boolean},spacingSize:{type:Number},swatchColor:{type:String,default:""},swatchLabel:{type:String},swatchAlt:{type:String},swatchSize:{type:Number},swatchStyle:{type:Object}},data:function(){return{}},computed:{computedLabelStyle:function(){var t=8+3*Math.floor(this.spacingSize/5);return{bottom:"-".concat(t,"px")}},computedSwatchStyle:function(){var t={width:"".concat(this.swatchSize,"px"),height:"".concat(this.swatchSize,"px"),borderRadius:this.borderRadius,backgroundColor:""!==this.swatchColor?this.swatchColor:"#FFFFFF",cursor:this.cursorStyle};return this.inline&&this.isLast||(t.marginRight="".concat(this.spacingSize,"px")),this.inline&&!this.rowLengthSetted?t:m({},t,{marginBottom:"".concat(this.spacingSize,"px")})},cursorStyle:function(){return this.disabled?"not-allowed":"pointer"},labelStyles:function(){return[this.computedLabelStyle]},swatchStyles:function(){return[this.computedSwatchStyle,this.swatchStyle]}}},C=O,k=(n("0ca3"),S(C,h,p,!1,null,null,null)),x=k.exports;function B(t){return B="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(t)}function j(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function L(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?j(Object(n),!0).forEach((function(e){z(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function z(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var E="#ffffff",R="10px",F=4,P=5,D=42,A=!1,T=function(t,e,n){return"string"!==typeof t?null:"text-basic"===t?void 0===l[e]?null:l[e]:"text-advanced"===t?void 0===u[e]?null:u[e]:"basic"===t||n?void 0===a[e]?null:a[e]:null},$={name:"v-swatches",components:{VSwatch:x},props:{backgroundColor:{type:String,default:E},closeOnSelect:{type:Boolean,default:!0},swatches:{type:[Array,String],default:function(){return"basic"}},disabled:{type:Boolean,default:!1},fallbackInputClass:{type:[Array,Object,String],default:null},fallbackInputType:{type:String,default:function(){return"text"},validator:function(t){return-1!==["text","color"].indexOf(t)}},fallbackOkClass:{type:[Array,Object,String],default:null},fallbackOkText:{type:String,default:"Ok"},inline:{type:Boolean,default:!1},shapes:{type:String,default:"squares"},popoverX:{type:String,default:"right"},popoverY:{type:String,default:"bottom"},rowLength:{type:[Number,String],default:null},showBorder:{type:Boolean,default:null},showFallback:{type:Boolean,default:!1},showCheckbox:{type:Boolean,default:!0},showLabels:{type:Boolean,default:!1},spacingSize:{type:Number,default:null},swatchSize:{type:[Number,String],default:null},swatchStyle:{type:[Object,Array],default:function(){}},triggerStyle:{type:[Object,Array],default:function(){}},wrapperStyle:{type:[Object,Array],default:function(){}},value:{type:String,default:null}},data:function(){return{alwaysOnScreenStyle:{},componentMounted:!1,internalValue:this.value,internalIsOpen:!1}},computed:{isNested:function(){return!!(this.computedSwatches&&this.computedSwatches.length&&this.computedSwatches[0]instanceof Array)},isOpen:function(){return!this.inline&&this.internalIsOpen},isNoColor:function(){return this.checkEquality("",this.value)},presetBorderRadius:function(){return T(this.swatches,"borderRadius")},presetRowLength:function(){return T(this.swatches,"rowLength")},presetShowBorder:function(){return T(this.swatches,"showBorder")},presetSwatchSize:function(){return T(this.swatches,"swatchSize")},presetSpacingSize:function(){return T(this.swatches,"spacingSize")},computedSwatches:function(){return this.swatches instanceof Array?this.swatches:"string"===typeof this.swatches?T(this.swatches,"colors",!0):[]},computedBorderRadius:function(){return null!==this.presetBorderRadius?this.presetBorderRadius:this.borderRadius},computedRowLength:function(){return null!==this.rowLength?Number(this.rowLength):null!==this.presetRowLength?this.presetRowLength:this.computedSwatches.length<F&&!this.isNested?this.computedSwatches.length:F},computedSwatchSize:function(){return null!==this.swatchSize?Number(this.swatchSize):null!==this.presetSwatchSize?this.presetSwatchSize:D},computedSpacingSize:function(){return null!==this.spacingSize?this.spacingSize:null!==this.presetSpacingSize?this.presetSpacingSize:Math.round(.25*this.computedSwatchSize)},computedShowBorder:function(){return null!==this.showBorder?this.showBorder:null!==this.presetShowBorder?this.presetShowBorder:A},showFallbackOk:function(){return!this.inline},borderRadius:function(){return"squares"===this.shapes?"".concat(Math.round(.25*this.computedSwatchSize),"px"):"circles"===this.shapes?"50%":""},wrapperWidth:function(){return this.computedRowLength*(this.computedSwatchSize+this.computedSpacingSize)},computedtriggerStyle:function(){return{width:"42px",height:"42px",backgroundColor:this.value?this.value:"#ffffff",borderRadius:"circles"===this.shapes?"50%":R}},triggerStyles:function(){return[this.computedtriggerStyle,this.triggerStyle]},containerStyles:function(){var t=[{backgroundColor:this.backgroundColor},this.alwaysOnScreenStyle];return this.inline?t:[].concat(t,[{padding:"5px",marginBottom:"5px"}])},computedWrapperStyle:function(){return this.inline?{}:{paddingTop:"".concat(this.computedSpacingSize,"px"),paddingLeft:"".concat(this.computedSpacingSize,"px"),width:"".concat(this.wrapperWidth,"px")}},wrapperStyles:function(){return[this.computedWrapperStyle,this.wrapperStyle]},computedFallbackWrapperStyle:function(){var t={marginLeft:"".concat(this.computedSpacingSize,"px"),paddingBottom:"".concat(this.computedSpacingSize,"px")};return this.inline?t:L({},t,{width:"".concat(this.wrapperWidth-this.computedSpacingSize,"px")})},computedFallbackWrapperStyles:function(){return[this.computedFallbackWrapperStyle]}},watch:{value:function(t){this.internalValue=t}},mounted:function(){this.componentMounted=!0},methods:{checkEquality:function(t,e){return!(!t&&""!==t||!e&&""!==e)&&t.toUpperCase()===e.toUpperCase()},hidePopover:function(){this.internalIsOpen=!1,this.$el.blur(),this.$emit("close",this.internalValue)},getAlwaysOnScreenStyle:function(){var t={},e=this.$refs.triggerWrapper,n=this.$refs.containerWrapper;if(!this.componentMounted||this.inline||!e||!window||!document)return t;var r=e.getBoundingClientRect(),i=5,o=(document.documentElement.clientWidth||window.innerWidth)-5,c=5,s=(document.documentElement.clientHeight||window.innerHeight)-5;n.style.visibility="hidden",n.style.display="block";var a=n.getBoundingClientRect();return n.style.display="none",n.style.visibility="visible","top"===this.popoverY?r.top-a.height<c?(t.top="".concat(r.height+P,"px"),t.bottom="auto"):(t.bottom="".concat(r.height+P,"px"),t.top="auto"):"bottom"===this.popoverY&&(r.bottom+a.height>s?(t.bottom="".concat(r.height+P,"px"),t.top="auto"):(t.top="".concat(r.height+P,"px"),t.bottom="auto")),"left"===this.popoverX?r.right-a.width<i?(t.left=0,t.right="auto"):(t.right=0,t.left="auto"):"right"===this.popoverX&&(r.left+a.width>o?(t.right=0,t.left="auto"):(t.left=0,t.right="auto")),t},getSwatchShowBorder:function(t){return"string"===typeof t?this.computedShowBorder:"object"===B(t)?void 0!==t.showBorder?t.showBorder:this.computedShowBorder:void 0},getSwatchColor:function(t){return"string"===typeof t?t:"object"===B(t)?t.color:void 0},getSwatchDisabled:function(t){return"string"===typeof t?this.disabled:"object"===B(t)?void 0!==t.disabled?t.disabled:this.disabled:void 0},getSwatchLabel:function(t){return"string"===typeof t?t:"object"===B(t)?t.label||t.color:void 0},getSwatchAlt:function(t){return"string"===typeof t?t:"object"===B(t)?t.alt||this.getSwatchLabel(t):void 0},onBlur:function(t){this.isOpen&&(null!==t&&this.$el.contains(t)||(this.internalIsOpen=!1,this.$emit("close",this.internalValue)))},onFallbackButtonClick:function(){this.hidePopover()},showPopover:function(){this.isOpen||this.inline||this.disabled||(this.alwaysOnScreenStyle=this.getAlwaysOnScreenStyle(),this.internalIsOpen=!0,this.$el.focus(),this.$emit("open"))},togglePopover:function(){this.isOpen?this.hidePopover():this.showPopover()},updateSwatch:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.fromFallbackInput;if(!this.getSwatchDisabled(t)){var r=this.getSwatchColor(t);this.internalValue=r,this.$emit("input",r),!this.closeOnSelect||this.inline||n||this.hidePopover()}}}},N=$,W=(n("9334"),S(N,c,s,!1,null,null,null)),I=W.exports;e["default"]=I}})["default"]}));
//# sourceMappingURL=vue-swatches.umd.min.js.map

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: external "/js/wait-background.js"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const wait_background_js_namespaceObject = x({  });
;// CONCATENATED MODULE: external "/js/background.js"
var background_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var background_js_y = x => () => x
const background_js_namespaceObject = background_js_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_background_js_e9185ef7__["default"] });
;// CONCATENATED MODULE: external "/js/vue.runtime.esm.js"
var vue_runtime_esm_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var vue_runtime_esm_js_y = x => () => x
const vue_runtime_esm_js_namespaceObject = vue_runtime_esm_js_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_vue_runtime_esm_js_5b56ac01__["default"] });
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./manage/Manage.vue?vue&type=template&id=e247436e&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    {
      staticClass: "is-flex is-column",
      attrs: { id: "stg-manage", tabindex: "-1" },
      on: {
        contextmenu: function ($event) {
          ;["INPUT", "TEXTAREA"].includes($event.target.nodeName)
            ? null
            : $event.preventDefault()
        },
        click: function ($event) {
          _vm.multipleTabIds = []
        },
        keydown: [
          function ($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
            )
              return null
            return _vm.closeThisWindow.apply(null, arguments)
          },
          function ($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "f3", undefined, $event.key, undefined)
            )
              return null
            $event.stopPropagation()
            $event.preventDefault()
            return _vm.setFocusOnSearch.apply(null, arguments)
          },
        ],
      },
    },
    [
      _c("header", { staticClass: "is-flex is-align-items-center" }, [
        _c("span", { staticClass: "page-title" }, [
          _c("span", {
            domProps: { textContent: _vm._s(_vm.lang("extensionName")) },
          }),
          _vm._v(" - "),
          _c("span", {
            domProps: { textContent: _vm._s(_vm.lang("manageGroupsTitle")) },
          }),
        ]),
        _vm._v(" "),
        _c("span", [
          _c("div", [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.showTabsWithThumbnailsInManageGroups,
                    expression: "options.showTabsWithThumbnailsInManageGroups",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(
                    _vm.options.showTabsWithThumbnailsInManageGroups
                  )
                    ? _vm._i(
                        _vm.options.showTabsWithThumbnailsInManageGroups,
                        null
                      ) > -1
                    : _vm.options.showTabsWithThumbnailsInManageGroups,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.showTabsWithThumbnailsInManageGroups,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "showTabsWithThumbnailsInManageGroups",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "showTabsWithThumbnailsInManageGroups",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(
                        _vm.options,
                        "showTabsWithThumbnailsInManageGroups",
                        $$c
                      )
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: {
                  textContent: _vm._s(
                    _vm.lang("showTabsWithThumbnailsInManageGroups")
                  ),
                },
              }),
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.showArchivedGroupsInManageGroups,
                    expression: "showArchivedGroupsInManageGroups",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.showArchivedGroupsInManageGroups)
                    ? _vm._i(_vm.showArchivedGroupsInManageGroups, null) > -1
                    : _vm.showArchivedGroupsInManageGroups,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.showArchivedGroupsInManageGroups,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          (_vm.showArchivedGroupsInManageGroups = $$a.concat([
                            $$v,
                          ]))
                      } else {
                        $$i > -1 &&
                          (_vm.showArchivedGroupsInManageGroups = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.showArchivedGroupsInManageGroups = $$c
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: {
                  textContent: _vm._s(_vm.lang("showArchivedGroups")),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "buttons has-addons",
              staticStyle: { display: "none" },
            },
            [
              _c("span", {
                staticClass: "button is-small is-primary",
                domProps: {
                  textContent: _vm._s(_vm.lang("manageGroupViewGrid")),
                },
              }),
              _vm._v(" "),
              _c("span", {
                staticClass: "button is-small",
                attrs: { disabled: "" },
                domProps: {
                  textContent: _vm._s(_vm.lang("manageGroupViewFreeArrange")),
                },
              }),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "is-full-width has-text-right" }, [
          _c(
            "button",
            {
              staticClass: "button",
              on: {
                click: _vm.addGroup,
                contextmenu: function ($event) {
                  return _vm.$refs.newGroupContextMenu.open($event)
                },
              },
            },
            [
              _vm._m(0),
              _vm._v(" "),
              _c("span", {
                domProps: { textContent: _vm._s(_vm.lang("createNewGroup")) },
              }),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("span", [
          _c(
            "div",
            {
              class: ["field", { "has-addons": _vm.searchDelay.length }],
              attrs: { id: "search-wrapper" },
            },
            [
              _c(
                "div",
                {
                  class: [
                    "control is-expanded",
                    { "is-loading": _vm.searchDelayTimer },
                  ],
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model.trim",
                        value: _vm.searchDelay,
                        expression: "searchDelay",
                        modifiers: { trim: true },
                      },
                    ],
                    ref: "search",
                    staticClass: "input search-input fill-context",
                    attrs: {
                      type: "text",
                      autocomplete: "off",
                      placeholder: _vm.lang("searchPlaceholder"),
                      readonly: _vm.isLoading,
                    },
                    domProps: { value: _vm.searchDelay },
                    on: {
                      click: function ($event) {
                        $event.stopPropagation()
                      },
                      input: function ($event) {
                        if ($event.target.composing) return
                        _vm.searchDelay = $event.target.value.trim()
                      },
                      blur: function ($event) {
                        return _vm.$forceUpdate()
                      },
                    },
                  }),
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.searchDelay.length,
                      expression: "searchDelay.length",
                    },
                  ],
                  staticClass: "control",
                },
                [
                  _c(
                    "label",
                    {
                      staticClass: "button",
                      attrs: { title: _vm.lang("extendedTabSearch") },
                    },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.extendedSearch,
                            expression: "extendedSearch",
                          },
                        ],
                        attrs: { type: "checkbox" },
                        domProps: {
                          checked: Array.isArray(_vm.extendedSearch)
                            ? _vm._i(_vm.extendedSearch, null) > -1
                            : _vm.extendedSearch,
                        },
                        on: {
                          change: function ($event) {
                            var $$a = _vm.extendedSearch,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 &&
                                  (_vm.extendedSearch = $$a.concat([$$v]))
                              } else {
                                $$i > -1 &&
                                  (_vm.extendedSearch = $$a
                                    .slice(0, $$i)
                                    .concat($$a.slice($$i + 1)))
                              }
                            } else {
                              _vm.extendedSearch = $$c
                            }
                          },
                        },
                      }),
                    ]
                  ),
                ]
              ),
            ]
          ),
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "cursor-pointer",
            attrs: { title: _vm.lang("openSettings") },
            on: { click: _vm.openOptionsPage },
          },
          [
            _c("img", {
              staticClass: "size-20",
              attrs: { src: "/icons/settings.svg" },
            }),
          ]
        ),
      ]),
      _vm._v(" "),
      _c(
        "main",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.isLoading,
              expression: "!isLoading",
            },
          ],
          attrs: { id: "result" },
        },
        [
          _vm.view === _vm.VIEW_GRID
            ? _c(
                "div",
                {
                  class: [
                    "grid",
                    _vm.dragData ? "drag-" + _vm.dragData.itemType : false,
                  ],
                },
                [
                  _vm._l(_vm.filteredGroups, function (group) {
                    return _c(
                      "div",
                      {
                        key: group.id,
                        class: [
                          "group",
                          {
                            "is-archive": group.isArchive,
                            "drag-moving": group.isMoving,
                            "drag-over": group.isOver,
                            "is-opened": _vm.isOpenedGroup(group),
                          },
                        ],
                        attrs: { draggable: String(group.draggable) },
                        on: {
                          contextmenu: function ($event) {
                            "INPUT" !== $event.target.nodeName &&
                              _vm.$refs.contextMenuGroup.open($event, { group })
                          },
                          dragstart: function ($event) {
                            return _vm.dragHandle($event, "group", ["group"], {
                              item: group,
                            })
                          },
                          dragenter: function ($event) {
                            return _vm.dragHandle($event, "group", ["group"], {
                              item: group,
                            })
                          },
                          dragover: function ($event) {
                            return _vm.dragHandle($event, "group", ["group"], {
                              item: group,
                            })
                          },
                          dragleave: function ($event) {
                            return _vm.dragHandle($event, "group", ["group"], {
                              item: group,
                            })
                          },
                          drop: function ($event) {
                            return _vm.dragHandle($event, "group", ["group"], {
                              item: group,
                            })
                          },
                          dragend: function ($event) {
                            return _vm.dragHandle($event, "group", ["group"], {
                              item: group,
                            })
                          },
                        },
                      },
                      [
                        _c("div", { staticClass: "header" }, [
                          _c("div", { staticClass: "group-icon" }, [
                            _c(
                              "figure",
                              {
                                class: [
                                  "image is-16x16",
                                  { "is-sticky": group.isSticky },
                                ],
                              },
                              [
                                _c("img", {
                                  attrs: { src: group.iconUrlToDisplay },
                                }),
                              ]
                            ),
                          ]),
                          _vm._v(" "),
                          group.newTabContainer !== _vm.DEFAULT_COOKIE_STORE_ID
                            ? _c("div", { staticClass: "other-icon" }, [
                                _c("span", {
                                  class: `size-16 userContext-icon identity-icon-${
                                    _vm.containers[group.newTabContainer]?.icon
                                  } identity-color-${
                                    _vm.containers[group.newTabContainer]?.color
                                  }`,
                                }),
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          group.isArchive
                            ? _c("div", { staticClass: "other-icon" }, [
                                _vm._m(1, true),
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("div", { staticClass: "group-title" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model.lazy.trim",
                                  value: group.title,
                                  expression: "group.title",
                                  modifiers: { lazy: true, trim: true },
                                },
                              ],
                              staticClass: "input",
                              attrs: {
                                type: "text",
                                placeholder: _vm.lang("title"),
                                maxlength: "256",
                              },
                              domProps: { value: group.title },
                              on: {
                                focus: function ($event) {
                                  group.draggable = false
                                },
                                blur: [
                                  function ($event) {
                                    group.draggable = true
                                  },
                                  function ($event) {
                                    return _vm.$forceUpdate()
                                  },
                                ],
                                change: function ($event) {
                                  _vm.$set(
                                    group,
                                    "title",
                                    $event.target.value.trim()
                                  )
                                },
                              },
                            }),
                          ]),
                          _vm._v(" "),
                          _c("div", {
                            staticClass: "tabs-count",
                            domProps: {
                              textContent: _vm._s(
                                _vm.groupTabsCountMessage(
                                  group.filteredTabs,
                                  group.isArchive
                                )
                              ),
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "other-icon cursor-pointer is-unselectable",
                              attrs: { title: _vm.lang("groupSettings") },
                              on: {
                                click: function ($event) {
                                  return _vm.openGroupSettings(group)
                                },
                              },
                            },
                            [_vm._m(2, true)]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "other-icon cursor-pointer is-unselectable",
                              attrs: { title: _vm.lang("deleteGroup") },
                              on: {
                                click: function ($event) {
                                  return _vm.removeGroup(group)
                                },
                              },
                            },
                            [_vm._m(3, true)]
                          ),
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            class: [
                              "body",
                              {
                                "in-list-view":
                                  !_vm.options
                                    .showTabsWithThumbnailsInManageGroups,
                              },
                            ],
                          },
                          [
                            _vm._l(group.filteredTabs, function (tab, index) {
                              return _c(
                                "div",
                                {
                                  key: index,
                                  class: [
                                    "tab",
                                    {
                                      "is-active-element": tab.active,
                                      "is-in-multiple-drop":
                                        _vm.multipleTabIds.includes(tab.id),
                                      "has-thumbnail":
                                        _vm.options
                                          .showTabsWithThumbnailsInManageGroups &&
                                        tab.thumbnail,
                                      "drag-moving": tab.isMoving,
                                      "drag-over": tab.isOver,
                                    },
                                    tab.container &&
                                      `identity-color-${tab.container?.color}`,
                                  ],
                                  attrs: {
                                    title: _vm.getTabTitle(tab, true),
                                    draggable: String(!group.isArchive),
                                  },
                                  on: {
                                    contextmenu: function ($event) {
                                      $event.stopPropagation()
                                      $event.preventDefault()
                                      !group.isArchive &&
                                        _vm.$refs.contextMenuTab.open($event, {
                                          tab,
                                          group,
                                        })
                                    },
                                    click: function ($event) {
                                      $event.stopPropagation()
                                      !group.isArchive &&
                                        _vm.clickOnTab($event, tab, group)
                                    },
                                    dragstart: function ($event) {
                                      return _vm.dragHandle(
                                        $event,
                                        "tab",
                                        ["tab", "group"],
                                        { item: tab, group }
                                      )
                                    },
                                    dragenter: function ($event) {
                                      return _vm.dragHandle(
                                        $event,
                                        "tab",
                                        ["tab", "group"],
                                        { item: tab, group }
                                      )
                                    },
                                    dragover: function ($event) {
                                      return _vm.dragHandle(
                                        $event,
                                        "tab",
                                        ["tab", "group"],
                                        { item: tab, group }
                                      )
                                    },
                                    dragleave: function ($event) {
                                      return _vm.dragHandle(
                                        $event,
                                        "tab",
                                        ["tab", "group"],
                                        { item: tab, group }
                                      )
                                    },
                                    drop: function ($event) {
                                      return _vm.dragHandle(
                                        $event,
                                        "tab",
                                        ["tab", "group"],
                                        { item: tab, group }
                                      )
                                    },
                                    dragend: function ($event) {
                                      return _vm.dragHandle(
                                        $event,
                                        "tab",
                                        ["tab", "group"],
                                        { item: tab, group }
                                      )
                                    },
                                  },
                                },
                                [
                                  _vm.options
                                    .showTabsWithThumbnailsInManageGroups
                                    ? [
                                        _c("div", { staticClass: "tab-icon" }, [
                                          _c("img", {
                                            staticClass: "size-16",
                                            attrs: {
                                              src: tab.favIconUrl,
                                              loading: "lazy",
                                              decoding: "async",
                                            },
                                          }),
                                        ]),
                                        _vm._v(" "),
                                        _vm.isTabLoading(tab)
                                          ? _c(
                                              "div",
                                              { staticClass: "refresh-icon" },
                                              [
                                                _c("img", {
                                                  staticClass: "spin size-16",
                                                  attrs: {
                                                    src: "/icons/refresh.svg",
                                                  },
                                                }),
                                              ]
                                            )
                                          : _vm._e(),
                                      ]
                                    : [
                                        _c("div", { staticClass: "tab-icon" }, [
                                          _vm.isTabLoading(tab)
                                            ? _c("img", {
                                                staticClass: "spin size-16",
                                                attrs: {
                                                  src: "/icons/refresh.svg",
                                                },
                                              })
                                            : _c("img", {
                                                staticClass: "size-16",
                                                attrs: {
                                                  src: tab.favIconUrl,
                                                  loading: "lazy",
                                                  decoding: "async",
                                                },
                                              }),
                                        ]),
                                      ],
                                  _vm._v(" "),
                                  tab.cookieStoreId &&
                                  tab.cookieStoreId !==
                                    _vm.DEFAULT_COOKIE_STORE_ID
                                    ? _c(
                                        "div",
                                        { staticClass: "cookie-container" },
                                        [
                                          _c("span", {
                                            class: `is-inline-block size-16 userContext-icon identity-icon-${tab.container?.icon} identity-color-${tab.container?.color}`,
                                            attrs: {
                                              title: tab.container?.name,
                                            },
                                          }),
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.options
                                    .showTabsWithThumbnailsInManageGroups
                                    ? _c("div", { staticClass: "screenshot" }, [
                                        tab.thumbnail
                                          ? _c("img", {
                                              attrs: {
                                                src: tab.thumbnail,
                                                loading: "lazy",
                                                decoding: "async",
                                              },
                                            })
                                          : _vm._e(),
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c("div", {
                                    staticClass: "tab-title clip-text",
                                    domProps: {
                                      textContent: _vm._s(
                                        _vm.getTabTitle(
                                          tab,
                                          false,
                                          0,
                                          !group.isArchive && !tab.discarded
                                        )
                                      ),
                                    },
                                    on: {
                                      mousedown: function ($event) {
                                        if (
                                          "button" in $event &&
                                          $event.button !== 1
                                        )
                                          return null
                                        $event.preventDefault()
                                      },
                                      mouseup: function ($event) {
                                        if (
                                          "button" in $event &&
                                          $event.button !== 1
                                        )
                                          return null
                                        $event.preventDefault()
                                        !group.isArchive && _vm.removeTab(tab)
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  !group.isArchive
                                    ? _c(
                                        "div",
                                        {
                                          staticClass: "delete-tab-button",
                                          attrs: {
                                            title: _vm.lang("deleteTab"),
                                          },
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.removeTab(tab)
                                            },
                                          },
                                        },
                                        [
                                          _c("img", {
                                            staticClass: "size-16",
                                            attrs: { src: "/icons/close.svg" },
                                          }),
                                        ]
                                      )
                                    : _vm._e(),
                                ],
                                2
                              )
                            }),
                            _vm._v(" "),
                            !group.isArchive
                              ? _c(
                                  "div",
                                  {
                                    staticClass: "tab new",
                                    attrs: {
                                      tabindex: "0",
                                      title: _vm.lang("createNewTab"),
                                    },
                                    on: {
                                      click: function ($event) {
                                        return _vm.addTab(group)
                                      },
                                      contextmenu: function ($event) {
                                        $event.stopPropagation()
                                        $event.preventDefault()
                                        return _vm.$refs.contextMenuTabNew.open(
                                          $event,
                                          { group }
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        class: _vm.options
                                          .showTabsWithThumbnailsInManageGroups
                                          ? "screenshot"
                                          : "tab-icon",
                                      },
                                      [
                                        _c("img", {
                                          attrs: { src: "/icons/tab-new.svg" },
                                        }),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("div", {
                                      class: [
                                        "tab-title",
                                        {
                                          "clip-text":
                                            _vm.options
                                              .showTabsWithThumbnailsInManageGroups,
                                        },
                                      ],
                                      domProps: {
                                        textContent: _vm._s(
                                          _vm.lang("createNewTab")
                                        ),
                                      },
                                    }),
                                  ]
                                )
                              : _vm._e(),
                          ],
                          2
                        ),
                      ]
                    )
                  }),
                  _vm._v(" "),
                  _vm.unSyncTabs.length
                    ? _c("div", { staticClass: "group" }, [
                        _c("div", { staticClass: "header" }, [
                          _c("div", { staticClass: "group-icon" }),
                          _vm._v(" "),
                          _c("div", { staticClass: "group-title" }, [
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(_vm.lang("showOtherTabs")),
                              },
                            }),
                          ]),
                          _vm._v(" "),
                          _c("div", {
                            staticClass: "tabs-count",
                            domProps: {
                              textContent: _vm._s(
                                _vm.groupTabsCountMessage(_vm.unSyncTabs)
                              ),
                            },
                          }),
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            class: [
                              "body",
                              {
                                "in-list-view":
                                  !_vm.options
                                    .showTabsWithThumbnailsInManageGroups,
                              },
                            ],
                          },
                          _vm._l(_vm.filteredUnSyncTabs, function (tab) {
                            return _c(
                              "div",
                              {
                                key: tab.id,
                                class: [
                                  "tab",
                                  {
                                    "is-in-multiple-drop":
                                      _vm.multipleTabIds.includes(tab.id),
                                    "has-thumbnail":
                                      _vm.options
                                        .showTabsWithThumbnailsInManageGroups &&
                                      tab.thumbnail,
                                    "drag-moving": tab.isMoving,
                                  },
                                  tab.container &&
                                    `identity-color-${tab.container?.color}`,
                                ],
                                attrs: {
                                  title: _vm.getTabTitle(tab, true),
                                  draggable: "true",
                                },
                                on: {
                                  contextmenu: function ($event) {
                                    $event.stopPropagation()
                                    $event.preventDefault()
                                    return _vm.$refs.contextMenuTab.open(
                                      $event,
                                      { tab }
                                    )
                                  },
                                  click: function ($event) {
                                    $event.stopPropagation()
                                    return _vm.clickOnTab($event, tab)
                                  },
                                  dragstart: function ($event) {
                                    return _vm.dragHandle(
                                      $event,
                                      "tab",
                                      ["tab", "group"],
                                      { item: tab }
                                    )
                                  },
                                  dragend: function ($event) {
                                    return _vm.dragHandle(
                                      $event,
                                      "tab",
                                      ["tab", "group"],
                                      { item: tab }
                                    )
                                  },
                                },
                              },
                              [
                                _vm.options.showTabsWithThumbnailsInManageGroups
                                  ? [
                                      _c("div", { staticClass: "tab-icon" }, [
                                        _c("img", {
                                          staticClass: "size-16",
                                          attrs: {
                                            src: tab.favIconUrl,
                                            loading: "lazy",
                                            decoding: "async",
                                          },
                                        }),
                                      ]),
                                      _vm._v(" "),
                                      _vm.isTabLoading(tab)
                                        ? _c(
                                            "div",
                                            { staticClass: "refresh-icon" },
                                            [
                                              _c("img", {
                                                staticClass: "spin size-16",
                                                attrs: {
                                                  src: "/icons/refresh.svg",
                                                },
                                              }),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]
                                  : [
                                      _c("div", { staticClass: "tab-icon" }, [
                                        _vm.isTabLoading(tab)
                                          ? _c("img", {
                                              staticClass: "spin size-16",
                                              attrs: {
                                                src: "/icons/refresh.svg",
                                              },
                                            })
                                          : _c("img", {
                                              staticClass: "size-16",
                                              attrs: {
                                                src: tab.favIconUrl,
                                                loading: "lazy",
                                                decoding: "async",
                                              },
                                            }),
                                      ]),
                                    ],
                                _vm._v(" "),
                                tab.cookieStoreId &&
                                tab.cookieStoreId !==
                                  _vm.DEFAULT_COOKIE_STORE_ID
                                  ? _c(
                                      "div",
                                      { staticClass: "cookie-container" },
                                      [
                                        _c("span", {
                                          class: `is-inline-block size-16 userContext-icon identity-icon-${tab.container?.icon} identity-color-${tab.container?.color}`,
                                          attrs: { title: tab.container?.name },
                                        }),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.options.showTabsWithThumbnailsInManageGroups
                                  ? _c("div", { staticClass: "screenshot" }, [
                                      tab.thumbnail
                                        ? _c("img", {
                                            attrs: {
                                              src: tab.thumbnail,
                                              loading: "lazy",
                                              decoding: "async",
                                            },
                                          })
                                        : _vm._e(),
                                    ])
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("div", {
                                  staticClass: "tab-title clip-text",
                                  domProps: {
                                    textContent: _vm._s(
                                      _vm.getTabTitle(
                                        tab,
                                        false,
                                        0,
                                        !tab.discarded
                                      )
                                    ),
                                  },
                                  on: {
                                    mousedown: function ($event) {
                                      if (
                                        "button" in $event &&
                                        $event.button !== 1
                                      )
                                        return null
                                      $event.preventDefault()
                                    },
                                    mouseup: function ($event) {
                                      if (
                                        "button" in $event &&
                                        $event.button !== 1
                                      )
                                        return null
                                      $event.preventDefault()
                                      return _vm.removeTab(tab)
                                    },
                                  },
                                }),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass: "delete-tab-button",
                                    attrs: { title: _vm.lang("deleteTab") },
                                    on: {
                                      click: function ($event) {
                                        $event.stopPropagation()
                                        return _vm.removeTab(tab)
                                      },
                                    },
                                  },
                                  [
                                    _c("img", {
                                      staticClass: "size-16",
                                      attrs: { src: "/icons/close.svg" },
                                    }),
                                  ]
                                ),
                              ],
                              2
                            )
                          }),
                          0
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "group new cursor-pointer",
                      attrs: { draggable: "true" },
                      on: {
                        click: _vm.addGroup,
                        dragover: function ($event) {
                          return _vm.dragHandle($event, "tab", ["tab"])
                        },
                        drop: function ($event) {
                          return _vm.dragHandle($event, "tab", ["tab"], {
                            item: { id: "new-group" },
                          })
                        },
                      },
                    },
                    [
                      _c("div", { staticClass: "body" }, [
                        _c("img", { attrs: { src: "/icons/group-new.svg" } }),
                        _vm._v(" "),
                        _c("div", {
                          staticClass: "h-margin-top-10",
                          domProps: {
                            textContent: _vm._s(_vm.lang("createNewGroup")),
                          },
                        }),
                      ]),
                    ]
                  ),
                ],
                2
              )
            : _vm._e(),
        ]
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "fade" } }, [
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.isLoading,
                expression: "isLoading",
              },
            ],
            staticClass: "loading spin",
          },
          [
            _c(
              "svg",
              {
                attrs: {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 512 512",
                },
              },
              [
                _c("path", {
                  attrs: {
                    d: "M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z",
                  },
                }),
              ]
            ),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("div", { attrs: { id: "multipleTabsText" } }),
      _vm._v(" "),
      _c("context-menu-tab-new", {
        ref: "contextMenuTabNew",
        on: { add: _vm.addTab },
      }),
      _vm._v(" "),
      _c("context-menu-group", {
        ref: "contextMenuGroup",
        attrs: {
          menu: _vm.options.contextMenuGroup,
          groups: _vm.groups,
          "opened-windows": _vm.openedWindows,
          "show-rename": false,
          "show-settings": false,
          "show-remove": false,
        },
        on: {
          "open-in-new-window": (group, tab) =>
            _vm.applyGroup(group, tab, true),
          sort: _vm.sortGroups,
          discard: _vm.discardGroup,
          "discard-other": _vm.discardOtherGroups,
          "export-to-bookmarks": _vm.exportGroupToBookmarks,
          unload: _vm.unloadGroup,
          archive: _vm.toggleArchiveGroup,
          unarchive: _vm.toggleArchiveGroup,
          "reload-all-tabs": _vm.reloadAllTabsInGroup,
        },
      }),
      _vm._v(" "),
      _c("context-menu-tab", {
        ref: "contextMenuTab",
        attrs: {
          menu: _vm.options.contextMenuTab,
          groups: _vm.groups,
          "multiple-tab-ids": _vm.multipleTabIds,
          "show-update-thumbnail":
            _vm.options.showTabsWithThumbnailsInManageGroups,
        },
        on: {
          "open-in-new-window": (group, tab) =>
            _vm.applyGroup(group, tab, true),
          reload: _vm.reloadTab,
          discard: _vm.discardTab,
          remove: _vm.removeTab,
          "update-thumbnail": _vm.updateTabThumbnail,
          "set-group-icon": _vm.setTabIconAsGroupIcon,
          "move-tab": _vm.moveTabs,
          "move-tab-new-group": _vm.moveTabToNewGroup,
        },
      }),
      _vm._v(" "),
      _c("context-menu", { ref: "newGroupContextMenu" }, [
        _c("ul", { staticClass: "is-unselectable" }, [
          _c("li", { on: { click: _vm.openDefaultGroup } }, [
            _c("img", {
              staticClass: "size-16",
              attrs: { src: "/icons/icon.svg" },
            }),
            _vm._v(" "),
            _c("span", {
              domProps: { textContent: _vm._s(_vm.lang("defaultGroup")) },
            }),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _vm.openEditDefaultGroup
        ? _c(
            "popup",
            {
              attrs: {
                title: _vm.lang("defaultGroup"),
                buttons: [
                  {
                    event: "save-group",
                    classList: "is-success",
                    lang: "save",
                  },
                  {
                    event: "close-popup",
                    lang: "cancel",
                  },
                ],
              },
              on: {
                "save-group": () => _vm.$refs.editDefaultGroup.triggerChanges(),
                "close-popup": function ($event) {
                  _vm.openEditDefaultGroup = false
                },
              },
            },
            [
              _c("edit-group", {
                ref: "editDefaultGroup",
                attrs: {
                  "group-to-edit": _vm.defaultGroup,
                  "is-default-group": true,
                  "group-to-compare": _vm.defaultCleanGroup,
                },
                on: { changes: _vm.saveDefaultGroup },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.groupToEdit
        ? _c(
            "popup",
            {
              attrs: {
                title: _vm.lang("groupSettings"),
                buttons: [
                  {
                    event: "save-group",
                    classList: "is-success",
                    lang: "save",
                  },
                  {
                    event: "close-popup",
                    lang: "cancel",
                  },
                ],
              },
              on: {
                "close-popup": function ($event) {
                  _vm.groupToEdit = null
                },
                "save-group": () => _vm.$refs.editGroup.triggerChanges(),
              },
            },
            [
              _c("edit-group", {
                ref: "editGroup",
                attrs: {
                  "group-to-edit": _vm.groupToEdit.$data,
                  "group-to-compare": _vm.groupToEdit.$data,
                },
                on: {
                  changes: (changes) =>
                    _vm.saveEditedGroup(_vm.groupToEdit.id, changes),
                },
              }),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showPromptPopup
        ? _c(
            "popup",
            {
              attrs: {
                title: _vm.promptTitle,
                buttons: [
                  {
                    event: "resolve",
                    classList: "is-success",
                    lang: "ok",
                    focused: false,
                  },
                  {
                    event: "close-popup",
                    lang: "cancel",
                  },
                ],
              },
              on: {
                resolve: function ($event) {
                  return _vm.promptResolveFunc(true)
                },
                "close-popup": function ($event) {
                  return _vm.promptResolveFunc(false)
                },
                "show-popup": function ($event) {
                  _vm.$refs.promptInput.focus()
                  _vm.$refs.promptInput.select()
                },
              },
            },
            [
              _c("div", { staticClass: "control is-expanded" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model.trim",
                      value: _vm.promptValue,
                      expression: "promptValue",
                      modifiers: { trim: true },
                    },
                  ],
                  ref: "promptInput",
                  staticClass: "input",
                  attrs: { type: "text" },
                  domProps: { value: _vm.promptValue },
                  on: {
                    keydown: function ($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      )
                        return null
                      $event.stopPropagation()
                      return _vm.promptResolveFunc(true)
                    },
                    input: function ($event) {
                      if ($event.target.composing) return
                      _vm.promptValue = $event.target.value.trim()
                    },
                    blur: function ($event) {
                      return _vm.$forceUpdate()
                    },
                  },
                }),
              ]),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showConfirmPopup
        ? _c(
            "popup",
            {
              attrs: {
                title: _vm.confirmTitle,
                buttons: [
                  {
                    event: "resolve",
                    classList: _vm.confirmClass,
                    lang: _vm.confirmLang,
                    focused: true,
                  },
                  {
                    event: "close-popup",
                    lang: "cancel",
                  },
                ],
              },
              on: {
                resolve: function ($event) {
                  return _vm.confirmResolveFunc(true)
                },
                "close-popup": function ($event) {
                  return _vm.confirmResolveFunc(false)
                },
              },
            },
            [_c("span", { domProps: { innerHTML: _vm._s(_vm.confirmText) } })]
          )
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "size-16",
        attrs: { src: "/icons/group-new.svg" },
      }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("figure", { staticClass: "image is-16x16" }, [
      _c("img", {
        staticClass: "size-16",
        attrs: { src: "/icons/archive.svg" },
      }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("figure", { staticClass: "image is-16x16" }, [
      _c("img", { attrs: { src: "/icons/settings.svg" } }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("figure", { staticClass: "image is-16x16" }, [
      _c("img", { attrs: { src: "/icons/group-delete.svg" } }),
    ])
  },
]
render._withStripped = true


;// CONCATENATED MODULE: ./manage/Manage.vue?vue&type=template&id=e247436e&

;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/popup.vue?vue&type=template&id=244ba5b8&
var popupvue_type_template_id_244ba5b8_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    {
      staticClass: "modal popup is-active",
      on: {
        keydown: function ($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
          )
            return null
          $event.stopPropagation()
          return _vm.$emit("close-popup")
        },
        keyup: function ($event) {
          $event.stopPropagation()
        },
      },
    },
    [
      _c("div", {
        staticClass: "modal-background",
        on: {
          click: function ($event) {
            return _vm.$emit("close-popup")
          },
        },
      }),
      _vm._v(" "),
      _c("div", { staticClass: "modal-card" }, [
        _c("header", { staticClass: "modal-card-head" }, [
          _c("p", {
            staticClass: "modal-card-title",
            domProps: { textContent: _vm._s(_vm.title) },
          }),
          _vm._v(" "),
          _c("button", {
            staticClass: "delete",
            attrs: { "aria-label": "close" },
            on: {
              click: function ($event) {
                return _vm.$emit("close-popup")
              },
            },
          }),
        ]),
        _vm._v(" "),
        _c(
          "section",
          { staticClass: "modal-card-body" },
          [_vm._t("default")],
          2
        ),
        _vm._v(" "),
        _vm.buttonsClone.length
          ? _c(
              "footer",
              { staticClass: "modal-card-foot" },
              _vm._l(_vm.buttonsClone, function (button) {
                return _c("button", {
                  key: button.lang,
                  class: ["button", button.classList],
                  attrs: { disabled: button.disabled },
                  domProps: { textContent: _vm._s(_vm.lang(button.lang)) },
                  on: {
                    click: function ($event) {
                      button.event && _vm.$emit(button.event)
                    },
                  },
                })
              }),
              0
            )
          : _vm._e(),
      ]),
    ]
  )
}
var popupvue_type_template_id_244ba5b8_staticRenderFns = []
popupvue_type_template_id_244ba5b8_render._withStripped = true


;// CONCATENATED MODULE: ./components/popup.vue?vue&type=template&id=244ba5b8&

;// CONCATENATED MODULE: external "/js/json.js"
var json_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var json_js_y = x => () => x
const json_js_namespaceObject = json_js_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_json_js_f67ba1b8__["default"] });
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/popup.vue?vue&type=script&lang=js&

    

    /* harmony default export */ const popupvue_type_script_lang_js_ = ({
        name: 'popup-dialog',
        props: {
            title: {
                type: String,
                default: '',
            },
            buttons: {
                type: Array,
                default: () => [],
            },
        },
        data() {
            return {
                buttonsClone: json_js_namespaceObject["default"].clone(this.buttons),
            };
        },
        methods: {
            lang: browser.i18n.getMessage,
        },
        mounted() {
            this.$nextTick(function() {
                if (this.buttons.length) {
                    let focusedButtonIndex = this.buttons.findIndex(button => button.hasOwnProperty('focused'));

                    if (-1 === focusedButtonIndex) {
                        focusedButtonIndex = 1;
                    } else if (this.buttons[focusedButtonIndex].focused) {
                        focusedButtonIndex++;
                    } else {
                        focusedButtonIndex = 0;
                    }

                    if (focusedButtonIndex) {
                        this.$el.querySelector(`footer button:nth-child(${focusedButtonIndex})`).focus();
                    }
                }

                this.$emit('show-popup');
            });
        },
    });

;// CONCATENATED MODULE: ./components/popup.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_popupvue_type_script_lang_js_ = (popupvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./components/popup.vue



;


/* normalize component */

var component = normalizeComponent(
  components_popupvue_type_script_lang_js_,
  popupvue_type_template_id_244ba5b8_render,
  popupvue_type_template_id_244ba5b8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const popup = (component.exports);
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/edit-group.vue?vue&type=template&id=0405d3fe&
var edit_groupvue_type_template_id_0405d3fe_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _vm.show
    ? _c(
        "div",
        {
          staticClass: "no-outline edit-group",
          attrs: { tabindex: "-1" },
          on: {
            keydown: function ($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              )
                return null
              $event.stopPropagation()
              return _vm.triggerChanges.apply(null, arguments)
            },
            keyup: function ($event) {
              $event.stopPropagation()
            },
          },
        },
        [
          _c("label", {
            staticClass: "label",
            domProps: { textContent: _vm._s(_vm.lang("title")) },
          }),
          _vm._v(" "),
          _c("div", { class: ["field", _vm.isDefaultGroup && "has-addons"] }, [
            _c("div", { staticClass: "control is-expanded has-icons-left" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model.trim",
                    value: _vm.group.title,
                    expression: "group.title",
                    modifiers: { trim: true },
                  },
                ],
                ref: "groupTitle",
                staticClass: "input",
                attrs: {
                  type: "text",
                  maxlength: "256",
                  placeholder: _vm.lang("title"),
                },
                domProps: { value: _vm.group.title },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) return
                    _vm.$set(_vm.group, "title", $event.target.value.trim())
                  },
                  blur: function ($event) {
                    return _vm.$forceUpdate()
                  },
                },
              }),
              _vm._v(" "),
              _c("span", { staticClass: "icon is-left" }, [
                _c(
                  "figure",
                  { staticClass: "image is-16x16 is-inline-block" },
                  [_c("img", { attrs: { src: _vm.iconUrlToDisplay } })]
                ),
              ]),
            ]),
            _vm._v(" "),
            _vm.isDefaultGroup
              ? _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button",
                      on: {
                        click: function ($event) {
                          return _vm.$refs.groupNameVariables.open($event)
                        },
                        contextmenu: function ($event) {
                          $event.preventDefault()
                          return _vm.$refs.groupNameVariables.open($event)
                        },
                      },
                    },
                    [_vm._m(0)]
                  ),
                ])
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c("context-menu", { ref: "groupNameVariables" }, [
            _c(
              "ul",
              { staticClass: "is-unselectable" },
              _vm._l(_vm.TITLE_VARIABLES, function (value, key) {
                return _c(
                  "li",
                  {
                    key: key,
                    on: {
                      click: function ($event) {
                        return _vm.insertValueToGroupTitle(`{${key}}`)
                      },
                    },
                  },
                  [
                    _c("span", {
                      domProps: { textContent: _vm._s(`{${key}} - ` + value) },
                    }),
                  ]
                )
              }),
              0
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", {
              staticClass: "label",
              domProps: { textContent: _vm._s(_vm.lang("iconStyle")) },
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "field is-grouped icon-buttons" },
              [
                _c(
                  "div",
                  { staticClass: "control" },
                  [
                    _c("swatches", {
                      attrs: {
                        title: _vm.lang("iconColor"),
                        swatches: "text-advanced",
                        "popover-x": "right",
                        "show-fallback": "",
                        "trigger-style": {
                          width: "41px",
                          height: "30px",
                          borderRadius: "4px",
                          borderWidth: "1px",
                          borderColor: "#dbdbdb",
                        },
                      },
                      nativeOn: {
                        keydown: function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          )
                            return null
                          $event.stopPropagation()
                        },
                        keypress: function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          )
                            return null
                          $event.stopPropagation()
                        },
                        keyup: function ($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          )
                            return null
                          $event.stopPropagation()
                        },
                      },
                      model: {
                        value: _vm.group.iconColor,
                        callback: function ($$v) {
                          _vm.$set(
                            _vm.group,
                            "iconColor",
                            typeof $$v === "string" ? $$v.trim() : $$v
                          )
                        },
                        expression: "group.iconColor",
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _vm._l(_vm.GROUP_ICON_VIEW_TYPES, function (iconViewType) {
                  return _c(
                    "div",
                    { key: iconViewType, staticClass: "control" },
                    [
                      _c(
                        "button",
                        {
                          class: [
                            "button",
                            {
                              "is-focused":
                                !_vm.group.iconUrl &&
                                iconViewType === _vm.group.iconViewType,
                            },
                          ],
                          on: {
                            click: function ($event) {
                              return _vm.setIconView(iconViewType)
                            },
                          },
                        },
                        [
                          _c(
                            "figure",
                            { staticClass: "image is-16x16 is-inline-block" },
                            [
                              _c("img", {
                                attrs: {
                                  src: _vm.getIconTypeUrl(iconViewType),
                                },
                              }),
                            ]
                          ),
                        ]
                      ),
                    ]
                  )
                }),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button",
                      attrs: { title: _vm.lang("setRandomColor") },
                      on: { click: _vm.setRandomColor },
                    },
                    [
                      _c("img", {
                        staticClass: "size-16",
                        attrs: { src: "/icons/refresh.svg" },
                      }),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button",
                      attrs: { title: _vm.lang("selectUserGroupIcon") },
                      on: { click: _vm.selectUserGroupIcon },
                    },
                    [
                      _c("img", {
                        staticClass: "size-16",
                        attrs: { src: "/icons/image.svg" },
                      }),
                    ]
                  ),
                ]),
              ],
              2
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", { staticClass: "control" }, [
              _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.group.discardTabsAfterHide,
                      expression: "group.discardTabsAfterHide",
                    },
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.group.discardTabsAfterHide)
                      ? _vm._i(_vm.group.discardTabsAfterHide, null) > -1
                      : _vm.group.discardTabsAfterHide,
                  },
                  on: {
                    change: function ($event) {
                      var $$a = _vm.group.discardTabsAfterHide,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.group,
                              "discardTabsAfterHide",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.group,
                              "discardTabsAfterHide",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.group, "discardTabsAfterHide", $$c)
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(_vm.lang("discardTabsAfterHide")),
                  },
                }),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field ml-3" }, [
            _c("div", { staticClass: "control" }, [
              _c(
                "label",
                {
                  staticClass: "checkbox",
                  attrs: { disabled: !_vm.group.discardTabsAfterHide },
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.group.discardExcludeAudioTabs,
                        expression: "group.discardExcludeAudioTabs",
                      },
                    ],
                    attrs: {
                      disabled: !_vm.group.discardTabsAfterHide,
                      type: "checkbox",
                    },
                    domProps: {
                      checked: Array.isArray(_vm.group.discardExcludeAudioTabs)
                        ? _vm._i(_vm.group.discardExcludeAudioTabs, null) > -1
                        : _vm.group.discardExcludeAudioTabs,
                    },
                    on: {
                      change: function ($event) {
                        var $$a = _vm.group.discardExcludeAudioTabs,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              _vm.$set(
                                _vm.group,
                                "discardExcludeAudioTabs",
                                $$a.concat([$$v])
                              )
                          } else {
                            $$i > -1 &&
                              _vm.$set(
                                _vm.group,
                                "discardExcludeAudioTabs",
                                $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                              )
                          }
                        } else {
                          _vm.$set(_vm.group, "discardExcludeAudioTabs", $$c)
                        }
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("span", {
                    domProps: {
                      textContent: _vm._s(_vm.lang("discardExcludeAudioTabs")),
                    },
                  }),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", { staticClass: "control" }, [
              _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.group.muteTabsWhenGroupCloseAndRestoreWhenOpen,
                      expression:
                        "group.muteTabsWhenGroupCloseAndRestoreWhenOpen",
                    },
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.group.muteTabsWhenGroupCloseAndRestoreWhenOpen
                    )
                      ? _vm._i(
                          _vm.group.muteTabsWhenGroupCloseAndRestoreWhenOpen,
                          null
                        ) > -1
                      : _vm.group.muteTabsWhenGroupCloseAndRestoreWhenOpen,
                  },
                  on: {
                    change: function ($event) {
                      var $$a =
                          _vm.group.muteTabsWhenGroupCloseAndRestoreWhenOpen,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.group,
                              "muteTabsWhenGroupCloseAndRestoreWhenOpen",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.group,
                              "muteTabsWhenGroupCloseAndRestoreWhenOpen",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(
                          _vm.group,
                          "muteTabsWhenGroupCloseAndRestoreWhenOpen",
                          $$c
                        )
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(
                      _vm.lang("muteTabsWhenGroupCloseAndRestoreWhenOpen")
                    ),
                  },
                }),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", { staticClass: "control" }, [
              _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.group.prependTitleToWindow,
                      expression: "group.prependTitleToWindow",
                    },
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.group.prependTitleToWindow)
                      ? _vm._i(_vm.group.prependTitleToWindow, null) > -1
                      : _vm.group.prependTitleToWindow,
                  },
                  on: {
                    change: function ($event) {
                      var $$a = _vm.group.prependTitleToWindow,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.group,
                              "prependTitleToWindow",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.group,
                              "prependTitleToWindow",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.group, "prependTitleToWindow", $$c)
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(_vm.lang("prependTitleToWindow")),
                  },
                }),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", { staticClass: "control" }, [
              _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.group.exportToBookmarksWhenAutoBackup,
                      expression: "group.exportToBookmarksWhenAutoBackup",
                    },
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.group.exportToBookmarksWhenAutoBackup
                    )
                      ? _vm._i(
                          _vm.group.exportToBookmarksWhenAutoBackup,
                          null
                        ) > -1
                      : _vm.group.exportToBookmarksWhenAutoBackup,
                  },
                  on: {
                    click: ($event) =>
                      _vm.setPermissionsBookmarks(
                        $event,
                        "exportToBookmarksWhenAutoBackup"
                      ),
                    change: function ($event) {
                      var $$a = _vm.group.exportToBookmarksWhenAutoBackup,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.group,
                              "exportToBookmarksWhenAutoBackup",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.group,
                              "exportToBookmarksWhenAutoBackup",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(
                          _vm.group,
                          "exportToBookmarksWhenAutoBackup",
                          $$c
                        )
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(
                      _vm.lang("exportToBookmarksWhenAutoBackup")
                    ),
                  },
                }),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field ml-3" }, [
            _c("div", { staticClass: "control" }, [
              _c(
                "label",
                {
                  staticClass: "checkbox",
                  attrs: {
                    disabled: !_vm.group.exportToBookmarksWhenAutoBackup,
                  },
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.group.leaveBookmarksOfClosedTabs,
                        expression: "group.leaveBookmarksOfClosedTabs",
                      },
                    ],
                    attrs: {
                      disabled: !_vm.group.exportToBookmarksWhenAutoBackup,
                      type: "checkbox",
                    },
                    domProps: {
                      checked: Array.isArray(
                        _vm.group.leaveBookmarksOfClosedTabs
                      )
                        ? _vm._i(_vm.group.leaveBookmarksOfClosedTabs, null) >
                          -1
                        : _vm.group.leaveBookmarksOfClosedTabs,
                    },
                    on: {
                      change: function ($event) {
                        var $$a = _vm.group.leaveBookmarksOfClosedTabs,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              _vm.$set(
                                _vm.group,
                                "leaveBookmarksOfClosedTabs",
                                $$a.concat([$$v])
                              )
                          } else {
                            $$i > -1 &&
                              _vm.$set(
                                _vm.group,
                                "leaveBookmarksOfClosedTabs",
                                $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                              )
                          }
                        } else {
                          _vm.$set(_vm.group, "leaveBookmarksOfClosedTabs", $$c)
                        }
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("span", {
                    domProps: {
                      textContent: _vm._s(
                        _vm.lang("leaveBookmarksOfClosedTabs")
                      ),
                    },
                  }),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", {
              staticClass: "label",
              domProps: {
                textContent: _vm._s(_vm.lang("alwaysOpenTabsInContainer")),
              },
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "containers-wrapper" },
              _vm._l(_vm.containersWithDefault, function (container) {
                return _c(
                  "div",
                  {
                    key: container.cookieStoreId + "open",
                    staticClass: "control",
                  },
                  [
                    _c("label", { staticClass: "radio indent-children" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.group.newTabContainer,
                            expression: "group.newTabContainer",
                          },
                        ],
                        attrs: { type: "radio" },
                        domProps: {
                          value: container.cookieStoreId,
                          checked: _vm._q(
                            _vm.group.newTabContainer,
                            container.cookieStoreId
                          ),
                        },
                        on: {
                          change: function ($event) {
                            return _vm.$set(
                              _vm.group,
                              "newTabContainer",
                              container.cookieStoreId
                            )
                          },
                        },
                      }),
                      _vm._v(" "),
                      container.iconUrl
                        ? _c("span", {
                            class: `size-16 userContext-icon identity-icon-${container.icon} identity-color-${container.color}`,
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("span", {
                        staticClass: "word-break-all",
                        domProps: { textContent: _vm._s(container.name) },
                      }),
                    ]),
                  ]
                )
              }),
              0
            ),
            _vm._v(" "),
            _c("div", { staticClass: "control h-margin-top-10" }, [
              _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.group.ifDifferentContainerReOpen,
                      expression: "group.ifDifferentContainerReOpen",
                    },
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.group.ifDifferentContainerReOpen)
                      ? _vm._i(_vm.group.ifDifferentContainerReOpen, null) > -1
                      : _vm.group.ifDifferentContainerReOpen,
                  },
                  on: {
                    change: function ($event) {
                      var $$a = _vm.group.ifDifferentContainerReOpen,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.group,
                              "ifDifferentContainerReOpen",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.group,
                              "ifDifferentContainerReOpen",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.group, "ifDifferentContainerReOpen", $$c)
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(_vm.lang("ifDifferentContainerReOpen")),
                  },
                }),
              ]),
            ]),
            _vm._v(" "),
            _vm.group.ifDifferentContainerReOpen
              ? _c("div", { staticClass: "field h-margin-top-10" }, [
                  _c("label", {
                    staticClass: "label",
                    domProps: {
                      textContent: _vm._s(
                        _vm.lang("excludeContainersForReOpen")
                      ),
                    },
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "containers-wrapper" },
                    _vm._l(_vm.containersExcludeTemp, function (container) {
                      return _c(
                        "div",
                        {
                          key: container.cookieStoreId + "reopen",
                          staticClass: "control",
                        },
                        [
                          _c(
                            "label",
                            {
                              staticClass: "checkbox indent-children",
                              attrs: {
                                disabled:
                                  container.cookieStoreId ===
                                  _vm.group.newTabContainer,
                              },
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.group.excludeContainersForReOpen,
                                    expression:
                                      "group.excludeContainersForReOpen",
                                  },
                                ],
                                attrs: {
                                  type: "checkbox",
                                  disabled:
                                    container.cookieStoreId ===
                                    _vm.group.newTabContainer,
                                },
                                domProps: {
                                  value: container.cookieStoreId,
                                  checked: Array.isArray(
                                    _vm.group.excludeContainersForReOpen
                                  )
                                    ? _vm._i(
                                        _vm.group.excludeContainersForReOpen,
                                        container.cookieStoreId
                                      ) > -1
                                    : _vm.group.excludeContainersForReOpen,
                                },
                                on: {
                                  change: function ($event) {
                                    var $$a =
                                        _vm.group.excludeContainersForReOpen,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = container.cookieStoreId,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          _vm.$set(
                                            _vm.group,
                                            "excludeContainersForReOpen",
                                            $$a.concat([$$v])
                                          )
                                      } else {
                                        $$i > -1 &&
                                          _vm.$set(
                                            _vm.group,
                                            "excludeContainersForReOpen",
                                            $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1))
                                          )
                                      }
                                    } else {
                                      _vm.$set(
                                        _vm.group,
                                        "excludeContainersForReOpen",
                                        $$c
                                      )
                                    }
                                  },
                                },
                              }),
                              _vm._v(" "),
                              container.iconUrl
                                ? _c("span", {
                                    class: `size-16 userContext-icon identity-icon-${container.icon} identity-color-${container.color}`,
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              _c("span", {
                                staticClass: "word-break-all",
                                domProps: {
                                  textContent: _vm._s(container.name),
                                },
                              }),
                            ]
                          ),
                        ]
                      )
                    }),
                    0
                  ),
                ])
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", {
              staticClass: "label",
              domProps: { textContent: _vm._s(_vm.lang("tabMoving")) },
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "control is-inline-flex indent-children" },
              [
                _c("label", { staticClass: "checkbox" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.group.isSticky,
                        expression: "group.isSticky",
                      },
                    ],
                    attrs: { type: "checkbox" },
                    domProps: {
                      checked: Array.isArray(_vm.group.isSticky)
                        ? _vm._i(_vm.group.isSticky, null) > -1
                        : _vm.group.isSticky,
                    },
                    on: {
                      change: function ($event) {
                        var $$a = _vm.group.isSticky,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              _vm.$set(_vm.group, "isSticky", $$a.concat([$$v]))
                          } else {
                            $$i > -1 &&
                              _vm.$set(
                                _vm.group,
                                "isSticky",
                                $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                              )
                          }
                        } else {
                          _vm.$set(_vm.group, "isSticky", $$c)
                        }
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("span", {
                    domProps: {
                      textContent: _vm._s(_vm.lang("isStickyGroupTitle")),
                    },
                  }),
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass: "cursor-help",
                    attrs: { title: _vm.lang("isStickyGroupHelp") },
                  },
                  [
                    _c("img", {
                      staticClass: "size-18",
                      attrs: { src: "/icons/help.svg" },
                    }),
                  ]
                ),
              ]
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", { staticClass: "control" }, [
              _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.group.showTabAfterMovingItIntoThisGroup,
                      expression: "group.showTabAfterMovingItIntoThisGroup",
                    },
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.group.showTabAfterMovingItIntoThisGroup
                    )
                      ? _vm._i(
                          _vm.group.showTabAfterMovingItIntoThisGroup,
                          null
                        ) > -1
                      : _vm.group.showTabAfterMovingItIntoThisGroup,
                  },
                  on: {
                    change: function ($event) {
                      var $$a = _vm.group.showTabAfterMovingItIntoThisGroup,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.group,
                              "showTabAfterMovingItIntoThisGroup",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.group,
                              "showTabAfterMovingItIntoThisGroup",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(
                          _vm.group,
                          "showTabAfterMovingItIntoThisGroup",
                          $$c
                        )
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(
                      _vm.lang("showTabAfterMovingItIntoThisGroup")
                    ),
                  },
                }),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field ml-3" }, [
            _c("div", { staticClass: "control" }, [
              _c(
                "label",
                {
                  staticClass: "checkbox",
                  attrs: {
                    disabled: !_vm.group.showTabAfterMovingItIntoThisGroup,
                  },
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value:
                          _vm.group.showOnlyActiveTabAfterMovingItIntoThisGroup,
                        expression:
                          "group.showOnlyActiveTabAfterMovingItIntoThisGroup",
                      },
                    ],
                    attrs: {
                      type: "checkbox",
                      disabled: !_vm.group.showTabAfterMovingItIntoThisGroup,
                    },
                    domProps: {
                      checked: Array.isArray(
                        _vm.group.showOnlyActiveTabAfterMovingItIntoThisGroup
                      )
                        ? _vm._i(
                            _vm.group
                              .showOnlyActiveTabAfterMovingItIntoThisGroup,
                            null
                          ) > -1
                        : _vm.group.showOnlyActiveTabAfterMovingItIntoThisGroup,
                    },
                    on: {
                      change: function ($event) {
                        var $$a =
                            _vm.group
                              .showOnlyActiveTabAfterMovingItIntoThisGroup,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              _vm.$set(
                                _vm.group,
                                "showOnlyActiveTabAfterMovingItIntoThisGroup",
                                $$a.concat([$$v])
                              )
                          } else {
                            $$i > -1 &&
                              _vm.$set(
                                _vm.group,
                                "showOnlyActiveTabAfterMovingItIntoThisGroup",
                                $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                              )
                          }
                        } else {
                          _vm.$set(
                            _vm.group,
                            "showOnlyActiveTabAfterMovingItIntoThisGroup",
                            $$c
                          )
                        }
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("span", {
                    domProps: {
                      textContent: _vm._s(
                        _vm.lang("showOnlyActiveTabAfterMovingItIntoThisGroup")
                      ),
                    },
                  }),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", { staticClass: "control" }, [
              _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value:
                        _vm.group.showNotificationAfterMovingTabIntoThisGroup,
                      expression:
                        "group.showNotificationAfterMovingTabIntoThisGroup",
                    },
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(
                      _vm.group.showNotificationAfterMovingTabIntoThisGroup
                    )
                      ? _vm._i(
                          _vm.group.showNotificationAfterMovingTabIntoThisGroup,
                          null
                        ) > -1
                      : _vm.group.showNotificationAfterMovingTabIntoThisGroup,
                  },
                  on: {
                    change: function ($event) {
                      var $$a =
                          _vm.group.showNotificationAfterMovingTabIntoThisGroup,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.group,
                              "showNotificationAfterMovingTabIntoThisGroup",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.group,
                              "showNotificationAfterMovingTabIntoThisGroup",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(
                          _vm.group,
                          "showNotificationAfterMovingTabIntoThisGroup",
                          $$c
                        )
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(
                      _vm.lang("showNotificationAfterMovingTabIntoThisGroup")
                    ),
                  },
                }),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", {
              staticClass: "label",
              domProps: { textContent: _vm._s(_vm.lang("catchTabContainers")) },
            }),
            _vm._v(" "),
            _c(
              "div",
              {
                class: [
                  "containers-wrapper",
                  _vm.isDefaultGroup && "no-y-scroll",
                ],
              },
              _vm._l(_vm.containersExcludeTemp, function (container) {
                return _c(
                  "div",
                  {
                    key: container.cookieStoreId + "catch",
                    staticClass: "control",
                  },
                  [
                    _c(
                      "label",
                      {
                        staticClass: "checkbox indent-children",
                        attrs: { disabled: _vm.isDisabledContainer(container) },
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.group.catchTabContainers,
                              expression: "group.catchTabContainers",
                            },
                          ],
                          attrs: {
                            type: "checkbox",
                            disabled: _vm.isDisabledContainer(container),
                          },
                          domProps: {
                            value: container.cookieStoreId,
                            checked: Array.isArray(_vm.group.catchTabContainers)
                              ? _vm._i(
                                  _vm.group.catchTabContainers,
                                  container.cookieStoreId
                                ) > -1
                              : _vm.group.catchTabContainers,
                          },
                          on: {
                            change: function ($event) {
                              var $$a = _vm.group.catchTabContainers,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = container.cookieStoreId,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.group,
                                      "catchTabContainers",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.group,
                                      "catchTabContainers",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(_vm.group, "catchTabContainers", $$c)
                              }
                            },
                          },
                        }),
                        _vm._v(" "),
                        container.iconUrl
                          ? _c("span", {
                              class: `size-16 userContext-icon identity-icon-${container.icon} identity-color-${container.color}`,
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _c("span", {
                          staticClass: "word-break-all",
                          domProps: { textContent: _vm._s(container.name) },
                        }),
                        _vm._v(" "),
                        _vm.disabledContainers.hasOwnProperty(
                          container.cookieStoreId
                        )
                          ? _c("i", { staticClass: "word-break-all" }, [
                              _vm._v(
                                "(" +
                                  _vm._s(
                                    _vm.disabledContainers[
                                      container.cookieStoreId
                                    ]
                                  ) +
                                  ")"
                              ),
                            ])
                          : _vm._e(),
                      ]
                    ),
                  ]
                )
              }),
              0
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c(
              "label",
              { staticClass: "label is-inline-flex indent-children" },
              [
                _c("span", {
                  domProps: {
                    textContent: _vm._s(_vm.lang("regexpForTabsTitle")),
                  },
                }),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass: "cursor-help",
                    attrs: { title: _vm.lang("regexpForTabsHelp") },
                  },
                  [
                    _c("img", {
                      staticClass: "size-18",
                      attrs: { src: "/icons/help.svg" },
                    }),
                  ]
                ),
              ]
            ),
          ]),
          _vm._v(" "),
          _vm.currentDomainRegexp || _vm.currentDomainWithSubdomainsRegexp
            ? _c("div", { staticClass: "field is-grouped" }, [
                _vm.currentDomainRegexp
                  ? _c("div", { staticClass: "control" }, [
                      _c(
                        "button",
                        {
                          staticClass: "button is-link is-small",
                          on: {
                            click: function ($event) {
                              return _vm.addCurrentDomain(
                                _vm.currentDomainRegexp
                              )
                            },
                          },
                        },
                        [
                          _c("span", {
                            domProps: {
                              textContent: _vm._s(_vm.currentDomainRegexp),
                            },
                          }),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.currentDomainWithSubdomainsRegexp
                  ? _c("div", { staticClass: "control" }, [
                      _c(
                        "button",
                        {
                          staticClass: "button is-link is-small",
                          on: {
                            click: function ($event) {
                              return _vm.addCurrentDomain(
                                _vm.currentDomainWithSubdomainsRegexp
                              )
                            },
                          },
                        },
                        [
                          _c("span", {
                            domProps: {
                              textContent: _vm._s(
                                _vm.currentDomainWithSubdomainsRegexp
                              ),
                            },
                          }),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "field h-margin-bottom-10" }, [
            _c("div", { staticClass: "control" }, [
              _c("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model.trim",
                    value: _vm.group.catchTabRules,
                    expression: "group.catchTabRules",
                    modifiers: { trim: true },
                  },
                ],
                staticClass: "textarea reg-exp",
                attrs: {
                  rows: _vm.canLoadFile ? false : 2,
                  disabled: _vm.isDefaultGroup,
                  placeholder: _vm.lang("regexpForTabsPlaceholder"),
                },
                domProps: { value: _vm.group.catchTabRules },
                on: {
                  keydown: function ($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    )
                      return null
                    $event.stopPropagation()
                  },
                  keypress: function ($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    )
                      return null
                    $event.stopPropagation()
                  },
                  keyup: function ($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    )
                      return null
                    $event.stopPropagation()
                  },
                  input: function ($event) {
                    if ($event.target.composing) return
                    _vm.$set(
                      _vm.group,
                      "catchTabRules",
                      $event.target.value.trim()
                    )
                  },
                  blur: function ($event) {
                    return _vm.$forceUpdate()
                  },
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", {
              staticClass: "label",
              domProps: {
                textContent: _vm._s(_vm.lang("moveToGroupIfNoneCatchTabRules")),
              },
            }),
            _vm._v(" "),
            _c(
              "div",
              {
                class: [
                  "control",
                  _vm.group.moveToGroupIfNoneCatchTabRules && "has-icons-left",
                ],
              },
              [
                _c("div", { staticClass: "select is-fullwidth" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.group.moveToGroupIfNoneCatchTabRules,
                          expression: "group.moveToGroupIfNoneCatchTabRules",
                        },
                      ],
                      on: {
                        change: function ($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function (o) {
                              return o.selected
                            })
                            .map(function (o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.$set(
                            _vm.group,
                            "moveToGroupIfNoneCatchTabRules",
                            $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          )
                        },
                      },
                    },
                    [
                      _c("option", {
                        domProps: {
                          value: null,
                          textContent: _vm._s(_vm.lang("dontMove")),
                        },
                      }),
                      _vm._v(" "),
                      _vm._l(
                        _vm.groupsMoveToIfNoneCatchTabRules,
                        function (group) {
                          return _c("option", {
                            key: group.id + "catch",
                            domProps: {
                              value: group.id,
                              textContent: _vm._s(
                                group.isArchive
                                  ? _vm.lang(
                                      "groupArchivedTitle",
                                      group.titleToView
                                    )
                                  : group.titleToView
                              ),
                            },
                          })
                        }
                      ),
                    ],
                    2
                  ),
                ]),
                _vm._v(" "),
                _vm.group.moveToGroupIfNoneCatchTabRules
                  ? _c("span", { staticClass: "icon is-left" }, [
                      _c("img", {
                        staticClass: "size-16",
                        attrs: { src: _vm.selectedMoveGroupToImage, alt: "" },
                      }),
                    ])
                  : _vm._e(),
              ]
            ),
          ]),
          _vm._v(" "),
          _vm.showMessageCantLoadFile
            ? _c(
                "popup",
                {
                  attrs: {
                    title: _vm.lang("warning"),
                    buttons: [
                      {
                        event: "open-manage-groups",
                        lang: "ok",
                      },
                      {
                        event: "close-popup",
                        lang: "cancel",
                      },
                    ],
                  },
                  on: {
                    "open-manage-groups": function ($event) {
                      return _vm.$emit("open-manage-groups")
                    },
                    "close-popup": function ($event) {
                      _vm.showMessageCantLoadFile = false
                    },
                  },
                },
                [
                  _c("span", {
                    domProps: {
                      textContent: _vm._s(
                        _vm.lang("selectUserGroupIconWarnText")
                      ),
                    },
                  }),
                ]
              )
            : _vm._e(),
        ],
        1
      )
    : _vm._e()
}
var edit_groupvue_type_template_id_0405d3fe_staticRenderFns = [
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "size-16",
        attrs: { src: "/icons/circle-info-solid.svg" },
      }),
    ])
  },
]
edit_groupvue_type_template_id_0405d3fe_render._withStripped = true


;// CONCATENATED MODULE: ./components/edit-group.vue?vue&type=template&id=0405d3fe&

// EXTERNAL MODULE: ../node_modules/vue-swatches/dist/vue-swatches.umd.min.js
var vue_swatches_umd_min = __webpack_require__(476);
var vue_swatches_umd_min_default = /*#__PURE__*/__webpack_require__.n(vue_swatches_umd_min);
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/context-menu.vue?vue&type=template&id=8e262530&scoped=true&
var context_menuvue_type_template_id_8e262530_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.show,
          expression: "show",
        },
      ],
      staticClass: "v-context-menu no-outline",
      style: _vm.style,
      attrs: { tabindex: "-1" },
      on: {
        blur: _vm.onblur,
        click: _vm.close,
        keydown: function ($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
          )
            return null
          $event.stopPropagation()
          return _vm.close.apply(null, arguments)
        },
        contextmenu: function ($event) {
          $event.preventDefault()
          return _vm.close.apply(null, arguments)
        },
      },
    },
    [_vm._t("default", null, { data: _vm.data })],
    2
  )
}
var context_menuvue_type_template_id_8e262530_scoped_true_staticRenderFns = []
context_menuvue_type_template_id_8e262530_scoped_true_render._withStripped = true


;// CONCATENATED MODULE: ./components/context-menu.vue?vue&type=template&id=8e262530&scoped=true&

;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/context-menu.vue?vue&type=script&lang=js&

    /* harmony default export */ const context_menuvue_type_script_lang_js_ = ({
        props: {
            minMargin: {
                type: Number,
                default: 25,
            },
        },
        data() {
            return {
                top: null,
                left: null,
                data: null,
                show: false,
            };
        },
        computed: {
            style() {
                if (!this.show) {
                    return {};
                }

                return {
                    top: this.top + 'px',
                    left: this.left + 'px',
                };
            },
        },
        methods: {
            close() {
                this.top = this.left = this.data = null;
                this.show = false;
                document.querySelectorAll('.is-context-active')
                    .forEach(node => node.classList.remove('is-context-active'));
            },

            open(event, data = null) {
                this.data = data;
                this.show = true;

                this.$nextTick(function() {
                    this.setMenu(event.clientY, event.clientX);
                    this.$el.focus();

                    [...this.$el.firstElementChild.children]
                        .filter(node => 'LI' === node.nodeName && !node.classList.contains('is-disabled'))
                        .forEach(function(node) {
                            node.tabIndex = 0;
                            node.addEventListener('keydown', function(event) {
                                if (event.key === 'Enter') {
                                    event.stopPropagation();
                                    event.stopImmediatePropagation();
                                    node.click();
                                }
                            });
                            node.addEventListener('blur', this.onblur.bind(this));
                        }, this);
                });
            },

            setMenu(top, left) {
                this.top = Math.min(top, window.innerHeight - this.$el.offsetHeight - this.minMargin);
                this.left = Math.min(left, window.innerWidth - this.$el.offsetWidth - this.minMargin);
            },

            onblur(event) {
                if (!this.$el.contains(event.relatedTarget)) {
                    this.close();
                }
            },
        }
    });

;// CONCATENATED MODULE: ./components/context-menu.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_context_menuvue_type_script_lang_js_ = (context_menuvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./components/context-menu.vue



;


/* normalize component */

var context_menu_component = normalizeComponent(
  components_context_menuvue_type_script_lang_js_,
  context_menuvue_type_template_id_8e262530_scoped_true_render,
  context_menuvue_type_template_id_8e262530_scoped_true_staticRenderFns,
  false,
  null,
  "8e262530",
  null
  
)

/* harmony default export */ const context_menu = (context_menu_component.exports);
;// CONCATENATED MODULE: external "/js/constants.js"
var constants_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var constants_js_y = x => () => x
const constants_js_namespaceObject = constants_js_x({ ["DEFAULT_COOKIE_STORE_ID"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.DEFAULT_COOKIE_STORE_ID, ["DEFAULT_GROUP_ICON_VIEW_TYPE"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.DEFAULT_GROUP_ICON_VIEW_TYPE, ["GROUP_ICON_VIEW_TYPES"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.GROUP_ICON_VIEW_TYPES, ["PERMISSIONS"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.PERMISSIONS, ["TEMPORARY_CONTAINER"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.TEMPORARY_CONTAINER });
;// CONCATENATED MODULE: external "/js/containers.js"
var containers_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var containers_js_y = x => () => x
const containers_js_namespaceObject = containers_js_x({ ["get"]: () => __WEBPACK_EXTERNAL_MODULE__js_containers_js_58464038__.get, ["getAll"]: () => __WEBPACK_EXTERNAL_MODULE__js_containers_js_58464038__.getAll, ["load"]: () => __WEBPACK_EXTERNAL_MODULE__js_containers_js_58464038__.load, ["setTemporaryContainerTitle"]: () => __WEBPACK_EXTERNAL_MODULE__js_containers_js_58464038__.setTemporaryContainerTitle });
;// CONCATENATED MODULE: external "/js/storage.js"
var storage_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var storage_js_y = x => () => x
const storage_js_namespaceObject = storage_js_x({ ["get"]: () => __WEBPACK_EXTERNAL_MODULE__js_storage_js_76b1d68f__.get });
;// CONCATENATED MODULE: external "/js/messages.js"
var messages_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var messages_js_y = x => () => x
const messages_js_namespaceObject = messages_js_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_messages_js_e1b129b7__["default"] });
;// CONCATENATED MODULE: external "/js/file.js"
var file_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var file_js_y = x => () => x
const file_js_namespaceObject = file_js_x({ ["load"]: () => __WEBPACK_EXTERNAL_MODULE__js_file_js_98ff2f38__.load });
;// CONCATENATED MODULE: external "/js/tabs.js"
var tabs_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var tabs_js_y = x => () => x
const tabs_js_namespaceObject = tabs_js_x({ ["extractId"]: () => __WEBPACK_EXTERNAL_MODULE__js_tabs_js_b1cc2156__.extractId, ["getActive"]: () => __WEBPACK_EXTERNAL_MODULE__js_tabs_js_b1cc2156__.getActive, ["getTitle"]: () => __WEBPACK_EXTERNAL_MODULE__js_tabs_js_b1cc2156__.getTitle, ["remove"]: () => __WEBPACK_EXTERNAL_MODULE__js_tabs_js_b1cc2156__.remove });
;// CONCATENATED MODULE: external "/js/groups.js"
var groups_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var groups_js_y = x => () => x
const groups_js_namespaceObject = groups_js_x({ ["add"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.add, ["createTitle"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.createTitle, ["getIconUrl"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.getIconUrl, ["getNextTitle"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.getNextTitle, ["getTitle"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.getTitle, ["load"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.load, ["move"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.move, ["setIconUrl"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.setIconUrl, ["sort"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.sort, ["tabsCountMessage"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.tabsCountMessage });
;// CONCATENATED MODULE: external "/js/utils.js"
var utils_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var utils_js_y = x => () => x
const utils_js_namespaceObject = utils_js_x({ ["DATE_LOCALE_VARIABLES"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.DATE_LOCALE_VARIABLES, ["getThemeApply"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.getThemeApply, ["isEqualPrimitiveArrays"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.isEqualPrimitiveArrays, ["isTabLoaded"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.isTabLoaded, ["isTabLoading"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.isTabLoading, ["isTabPinned"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.isTabPinned, ["isWindowAllow"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.isWindowAllow, ["mySearchFunc"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.mySearchFunc, ["normalizeGroupIcon"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.normalizeGroupIcon, ["normalizeTabFavIcon"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.normalizeTabFavIcon, ["normalizeTabUrl"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.normalizeTabUrl, ["notify"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.notify, ["randomColor"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.randomColor, ["safeHtml"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.safeHtml });
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/edit-group.vue?vue&type=script&lang=js&

    

    // import Vue from 'vue';

    
    
    
    

    
    
    
    
    
    
    
    
    
    

    /* harmony default export */ const edit_groupvue_type_script_lang_js_ = ({
        name: 'edit-group',
        props: {
            groupToEdit: {
                type: Object,
                required: true,
            },
            groupToCompare: {
                type: Object,
                required: true,
            },
            isDefaultGroup: {
                type: Boolean,
                default: false,
            },
            canLoadFile: {
                type: Boolean,
                default: true,
            },
        },
        components: {
            popup: popup,
            swatches: (vue_swatches_umd_min_default()),
            'context-menu': context_menu,
        },
        data() {
            this.TEMPORARY_CONTAINER = constants_js_namespaceObject.TEMPORARY_CONTAINER;
            this.DEFAULT_COOKIE_STORE_ID = constants_js_namespaceObject.DEFAULT_COOKIE_STORE_ID;
            this.GROUP_ICON_VIEW_TYPES = constants_js_namespaceObject.GROUP_ICON_VIEW_TYPES;
            this.TITLE_VARIABLES = {
                index: '{index}',
                ...utils_js_namespaceObject.DATE_LOCALE_VARIABLES,
            };

            return {
                show: false,

                containersWithDefault: {},
                containersExcludeTemp: {},

                disabledContainers: {},

                showMessageCantLoadFile: false,

                group: null,

                groupsMoveToIfNoneCatchTabRules: [],

                currentTabUrl: null,

                permissions: {
                    bookmarks: false,
                },
            };
        },
        watch: {
            'group.newTabContainer'(newTabContainer) {
                this.group.excludeContainersForReOpen = this.group.excludeContainersForReOpen.filter(cookieStoreId => cookieStoreId !== newTabContainer);
            },
        },
        computed: {
            iconUrlToDisplay() {
                return groups_js_namespaceObject.getIconUrl({
                    title: this.group.title,
                    iconUrl: this.group.iconUrl,
                    iconColor: this.group.iconColor,
                    iconViewType: this.group.iconViewType,
                });
            },
            currentDomainRegexp() {
                if (this.currentTabUrl) {
                    let currentDomainRegexp = this.currentTabUrl.hostname.replace(/\./g, '\\.');

                    if (!this.group.catchTabRules.includes(currentDomainRegexp)) {
                        return currentDomainRegexp;
                    }
                }

                return null;
            },
            currentDomainWithSubdomainsRegexp() {
                if (this.currentTabUrl) {
                    let parts = this.currentTabUrl.hostname.split('.');

                    if (parts.length > 2) {
                        if (parts.length === 3 && parts[0] === 'www') {
                            return;
                        }

                        let currentDomainWithSubdomainsRegexp = ['.*', ...parts.slice(-2)].join('\\.');

                        if (!this.group.catchTabRules.includes(currentDomainWithSubdomainsRegexp)) {
                            return currentDomainWithSubdomainsRegexp;
                        }
                    }
                }

                return null;
            },
            selectedMoveGroupToImage() {
                const group = this.groupsMoveToIfNoneCatchTabRules.find(group => group.id === this.group.moveToGroupIfNoneCatchTabRules);

                return group ? groups_js_namespaceObject.getIconUrl(group) : null;
            },
        },
        async created() {
            const [
                {groups},
                bookmarksPermission,
            ] = await Promise.all([
                storage_js_namespaceObject.get('groups'),
                browser.permissions.contains(constants_js_namespaceObject.PERMISSIONS.BOOKMARKS),
                this.loadContainers(),
            ]);

            this.permissions.bookmarks = bookmarksPermission;

            const newGroup = {...this.groupToEdit};

            delete newGroup.tabs;
            delete newGroup.filteredTabs;

            if (newGroup.exportToBookmarksWhenAutoBackup) {
                newGroup.exportToBookmarksWhenAutoBackup = this.permissions.bookmarks;
            }

            this.$set(this, 'group', json_js_namespaceObject["default"].clone(newGroup));

            this.groupsMoveToIfNoneCatchTabRules = groups.filter(group => {
                group.titleToView = groups_js_namespaceObject.getTitle(group);

                if (this.group.moveToGroupIfNoneCatchTabRules === group.id) {
                    return true;
                }

                return !group.isArchive;
            });

            if (!this.isDefaultGroup) {
                for (const cookieStoreId in this.containersWithDefault) {
                    groups.forEach(gr => {
                        if (gr.id === this.group.id) {
                            return;
                        }

                        if (gr.catchTabContainers.includes(cookieStoreId)) {
                            this.disabledContainers[cookieStoreId] = gr.title;
                        }
                    });
                }

                messages_js_namespaceObject["default"].sendMessageModule('Tabs.getActive')
                    .then(currentTab => {
                        if (currentTab?.url.startsWith('http')) {
                            this.currentTabUrl = new URL(currentTab.url);
                        }
                    });
            }

            this.show = true;

            this.setFocus();
        },
        methods: {
            lang: browser.i18n.getMessage,

            async loadContainers() {
                containers_js_namespaceObject.setTemporaryContainerTitle(background_js_namespaceObject["default"].options.temporaryContainerTitle)
                const containersStorage = await containers_js_namespaceObject.load({});
                const containersWithDefault = containers_js_namespaceObject.getAll(true, containersStorage);
                const containersExcludeTemp = {...containersWithDefault};
                delete containersExcludeTemp[constants_js_namespaceObject.TEMPORARY_CONTAINER];

                this.containersWithDefault = containersWithDefault;
                this.containersExcludeTemp = containersExcludeTemp;
            },

            addCurrentDomain(domainRegexpStr) {
                this.group.catchTabRules += (this.group.catchTabRules.length ? '\n' : '') + domainRegexpStr;
            },

            setFocus() {
                this.$nextTick(() => this.$refs.groupTitle.focus());
            },

            setIconView(groupIcon) {
                this.group.iconViewType = groupIcon;
                this.group.iconUrl = null;
            },

            setIconUrl(iconUrl) {
                this.group.iconViewType = null;
                this.group.iconUrl = iconUrl;
            },

            setRandomColor() {
                this.group.iconUrl = null;
                this.group.iconColor = utils_js_namespaceObject.randomColor();

                if (!this.group.iconViewType) {
                    this.group.iconViewType = constants_js_namespaceObject.DEFAULT_GROUP_ICON_VIEW_TYPE;
                }
            },

            getIconTypeUrl(iconType) {
                return groups_js_namespaceObject.getIconUrl({
                    title: this.group.title,
                    iconViewType: iconType,
                    iconColor: this.group.iconColor || 'rgb(66, 134, 244)',
                });
            },

            isDisabledContainer({cookieStoreId}) {
                return this.isDefaultGroup || !this.group.catchTabContainers.includes(cookieStoreId) && this.disabledContainers.hasOwnProperty(cookieStoreId);
            },

            async selectUserGroupIcon() {
                if (!this.canLoadFile) { // maybe temporary solution
                    this.showMessageCantLoadFile = true;
                    return;
                }

                let iconUrl = await file_js_namespaceObject.load('.ico,.png,.jpg,.svg', 'url');

                try {
                    iconUrl = await utils_js_namespaceObject.normalizeGroupIcon(iconUrl);
                    this.setIconUrl(iconUrl);
                } catch (e) {
                    utils_js_namespaceObject.notify(e);
                }
            },

            async setPermissionsBookmarks(event, groupOptionKey) {
                if (!this.permissions.bookmarks && event.target.checked) {
                    this.permissions.bookmarks = await browser.permissions.request(constants_js_namespaceObject.PERMISSIONS.BOOKMARKS);
                    this[groupOptionKey] = this.permissions.bookmarks;
                }
            },

            insertValueToGroupTitle(value) {
                const {selectionStart, selectionEnd} = this.$refs.groupTitle,
                    title = this.group.title;

                this.group.title = title.slice(0, selectionStart) + value + title.slice(selectionEnd, title.length);
            },

            triggerChanges() {
                const changes = {};

                for(const [key, value] of Object.entries(this.group)) {
                    const defaultValue = this.groupToCompare[key];

                    if (value !== Object(value)) { // is primitive
                        if (value !== defaultValue) {
                            changes[key] = value;
                        }
                    } else if (Array.isArray(value)) {
                        if (!utils_js_namespaceObject.isEqualPrimitiveArrays(value, defaultValue)) {
                            changes[key] = value.slice();
                        }
                    }
                }

                if (changes.hasOwnProperty('title')) {
                    const groupId = this.isDefaultGroup ? null : this.group.id;
                    changes.title = groups_js_namespaceObject.createTitle(changes.title, groupId);
                }

                changes.catchTabRules
                    ?.split(/\s*\n\s*/)
                    .filter(Boolean)
                    .forEach(regExpStr => {
                        try {
                            new RegExp(regExpStr);
                        } catch (e) {
                            utils_js_namespaceObject.notify(['invalidRegExpRuleTitle', regExpStr]);
                        }
                    });

                this.$emit('changes', changes);
            },
        }
    });

;// CONCATENATED MODULE: ./components/edit-group.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_edit_groupvue_type_script_lang_js_ = (edit_groupvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./components/edit-group.vue



;


/* normalize component */

var edit_group_component = normalizeComponent(
  components_edit_groupvue_type_script_lang_js_,
  edit_groupvue_type_template_id_0405d3fe_render,
  edit_groupvue_type_template_id_0405d3fe_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const edit_group = (edit_group_component.exports);
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/context-menu-tab.vue?vue&type=template&id=4bd2adad&
var context_menu_tabvue_type_template_id_4bd2adad_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c("context-menu", {
    ref: "contextMenu",
    scopedSlots: _vm._u([
      {
        key: "default",
        fn: function ({ data }) {
          return [
            data
              ? _c(
                  "ul",
                  { staticClass: "is-unselectable" },
                  [
                    _vm.menu.includes("open-in-new-window") && data.group
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit(
                                  "open-in-new-window",
                                  data.group,
                                  data.tab
                                )
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/window-new.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(
                                  _vm.lang("openGroupInNewWindow")
                                ),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("reload")
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit(
                                  "reload",
                                  data.tab,
                                  $event.ctrlKey || $event.metaKey
                                )
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/refresh.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(_vm.lang("reloadTab")),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("discard") && !data.tab.discarded
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("discard", data.tab)
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/snowflake.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(
                                  _vm.lang("discardTabTitle")
                                ),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("remove") && _vm.multipleTabIds.length
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("remove", data.tab)
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/close.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(_vm.lang("deleteTab")),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("update-thumbnail") &&
                    _vm.showUpdateThumbnail
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("update-thumbnail", data.tab)
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/image.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(
                                  _vm.lang("updateTabThumbnail")
                                ),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("set-group-icon") && data.group
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit(
                                  "set-group-icon",
                                  data.tab,
                                  data.group
                                )
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/image.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(
                                  _vm.lang("setTabIconAsGroupIcon")
                                ),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("move-tab-to-group")
                      ? [
                          _c("hr"),
                          _vm._v(" "),
                          _c("li", { staticClass: "is-disabled" }, [
                            _c("img", { staticClass: "size-16" }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(
                                  _vm.lang("moveTabToGroupDisabledTitle") + ":"
                                ),
                              },
                            }),
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.nonArchivedGroups, function (group) {
                            return _c(
                              "li",
                              {
                                key: group.id,
                                on: {
                                  click: function ($event) {
                                    return _vm.$emit(
                                      "move-tab",
                                      data.tab.id,
                                      group.id,
                                      !data.group,
                                      undefined,
                                      $event.ctrlKey || $event.metaKey
                                    )
                                  },
                                  contextmenu: function ($event) {
                                    return _vm.$emit(
                                      "move-tab",
                                      data.tab.id,
                                      group.id,
                                      !data.group,
                                      true
                                    )
                                  },
                                },
                              },
                              [
                                _c(
                                  "figure",
                                  {
                                    class: [
                                      "image is-16x16",
                                      { "is-sticky": group.isSticky },
                                    ],
                                  },
                                  [
                                    _c("img", {
                                      attrs: { src: group.iconUrlToDisplay },
                                    }),
                                  ]
                                ),
                                _vm._v(" "),
                                _c("span", {
                                  domProps: {
                                    textContent: _vm._s(
                                      _vm.getGroupTitle(
                                        group,
                                        "withActiveGroup withContainer"
                                      )
                                    ),
                                  },
                                }),
                              ]
                            )
                          }),
                          _vm._v(" "),
                          _c(
                            "li",
                            {
                              on: {
                                click: function ($event) {
                                  return _vm.$emit(
                                    "move-tab-new-group",
                                    data.tab.id,
                                    !data.group
                                  )
                                },
                                contextmenu: function ($event) {
                                  return _vm.$emit(
                                    "move-tab-new-group",
                                    data.tab.id,
                                    !data.group,
                                    true
                                  )
                                },
                              },
                            },
                            [
                              _c("img", {
                                staticClass: "size-16",
                                attrs: { src: "/icons/group-new.svg" },
                              }),
                              _vm._v(" "),
                              _c("span", {
                                domProps: {
                                  textContent: _vm._s(
                                    _vm.lang("createNewGroup")
                                  ),
                                },
                              }),
                            ]
                          ),
                        ]
                      : _vm._e(),
                  ],
                  2
                )
              : _vm._e(),
          ]
        },
      },
    ]),
  })
}
var context_menu_tabvue_type_template_id_4bd2adad_staticRenderFns = []
context_menu_tabvue_type_template_id_4bd2adad_render._withStripped = true


;// CONCATENATED MODULE: ./components/context-menu-tab.vue?vue&type=template&id=4bd2adad&

;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/context-menu-tab.vue?vue&type=script&lang=js&




/* harmony default export */ const context_menu_tabvue_type_script_lang_js_ = ({
    props: {
        menu: {
            type: Array,
            required: true,
        },
        groups: {
            type: Array,
            required: true,
        },
        multipleTabIds: {
            type: Array,
            default: () => [],
        },
        showUpdateThumbnail: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        'context-menu': context_menu,
    },
    computed: {
        nonArchivedGroups() {
            return this.groups.filter(group => !group.isArchive);
        },
    },
    methods: {
        lang: browser.i18n.getMessage,
        getGroupTitle: groups_js_namespaceObject.getTitle,
        open(...args) {
            this.$refs.contextMenu.open(...args);
        },
    },
});


;// CONCATENATED MODULE: ./components/context-menu-tab.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_context_menu_tabvue_type_script_lang_js_ = (context_menu_tabvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./components/context-menu-tab.vue





/* normalize component */
;
var context_menu_tab_component = normalizeComponent(
  components_context_menu_tabvue_type_script_lang_js_,
  context_menu_tabvue_type_template_id_4bd2adad_render,
  context_menu_tabvue_type_template_id_4bd2adad_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const context_menu_tab = (context_menu_tab_component.exports);
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/context-menu-tab-new.vue?vue&type=template&id=25704fff&
var context_menu_tab_newvue_type_template_id_25704fff_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c("context-menu", {
    ref: "contextMenu",
    scopedSlots: _vm._u([
      {
        key: "default",
        fn: function ({ data }) {
          return [
            data
              ? _c(
                  "ul",
                  { staticClass: "is-unselectable" },
                  _vm._l(_vm.containers, function (container) {
                    return _c(
                      "li",
                      {
                        key: container.cookieStoreId,
                        on: {
                          click: function ($event) {
                            return _vm.$emit(
                              "add",
                              data.group,
                              container.cookieStoreId
                            )
                          },
                        },
                      },
                      [
                        _c("span", {
                          class: `size-16 userContext-icon identity-icon-${container.icon} identity-color-${container.color}`,
                        }),
                        _vm._v(" "),
                        _c("span", {
                          domProps: { textContent: _vm._s(container.name) },
                        }),
                      ]
                    )
                  }),
                  0
                )
              : _vm._e(),
          ]
        },
      },
    ]),
  })
}
var context_menu_tab_newvue_type_template_id_25704fff_staticRenderFns = []
context_menu_tab_newvue_type_template_id_25704fff_render._withStripped = true


;// CONCATENATED MODULE: ./components/context-menu-tab-new.vue?vue&type=template&id=25704fff&

;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/context-menu-tab-new.vue?vue&type=script&lang=js&





/* harmony default export */ const context_menu_tab_newvue_type_script_lang_js_ = ({
    components: {
        'context-menu': context_menu,
    },
    data() {
        return {
            containers: [],
        };
    },
    methods: {
        open(...args) {
            let [, {group}] = args,
                containers = Object.values(containers_js_namespaceObject.getAll());

            if (group.ifDifferentContainerReOpen) {
                containers = containers.filter(container => {
                    return group.excludeContainersForReOpen.includes(container.cookieStoreId) ||
                        group.newTabContainer === container.cookieStoreId ||
                        container.cookieStoreId === constants_js_namespaceObject.TEMPORARY_CONTAINER;
                });
            }

            this.containers = Object.freeze(containers);

            this.$refs.contextMenu.open(...args);
        },
    },
});


;// CONCATENATED MODULE: ./components/context-menu-tab-new.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_context_menu_tab_newvue_type_script_lang_js_ = (context_menu_tab_newvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./components/context-menu-tab-new.vue





/* normalize component */
;
var context_menu_tab_new_component = normalizeComponent(
  components_context_menu_tab_newvue_type_script_lang_js_,
  context_menu_tab_newvue_type_template_id_25704fff_render,
  context_menu_tab_newvue_type_template_id_25704fff_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const context_menu_tab_new = (context_menu_tab_new_component.exports);
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/context-menu-group.vue?vue&type=template&id=32b76970&
var context_menu_groupvue_type_template_id_32b76970_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c("context-menu", {
    ref: "contextMenu",
    scopedSlots: _vm._u([
      {
        key: "default",
        fn: function ({ data }) {
          return [
            data
              ? _c(
                  "ul",
                  { staticClass: "is-unselectable" },
                  [
                    _vm.menu.includes("open-in-new-window") &&
                    !data.group.isArchive
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit(
                                  "open-in-new-window",
                                  data.group
                                )
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/window-new.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(
                                  _vm.lang("openGroupInNewWindow")
                                ),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("sort-asc")
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("sort", "asc")
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/sort-alpha-asc.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(_vm.lang("sortGroupsAZ")),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("sort-desc")
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("sort", "desc")
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/sort-alpha-desc.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(_vm.lang("sortGroupsZA")),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("discard") && !data.group.isArchive
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("discard", data.group)
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/snowflake.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(
                                  _vm.lang("hotkeyActionTitleDiscardGroup")
                                ),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("discard-other") && _vm.groups.length > 1
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("discard-other", data.group)
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/snowflake.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(
                                  _vm.lang(
                                    "hotkeyActionTitleDiscardOtherGroups"
                                  )
                                ),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("export-to-bookmarks")
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit(
                                  "export-to-bookmarks",
                                  data.group
                                )
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/bookmark.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(
                                  _vm.lang("exportGroupToBookmarks")
                                ),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("unload") && _vm.isOpened(data.group)
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("unload", data.group)
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/upload.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(_vm.lang("unloadGroup")),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("archive") && !data.group.isArchive
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("archive", data.group)
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/archive.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(_vm.lang("archiveGroup")),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("archive") && data.group.isArchive
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("unarchive", data.group)
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/unarchive.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(_vm.lang("unArchiveGroup")),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("rename") && _vm.showRename
                      ? _c(
                          "li",
                          {
                            on: {
                              click: function ($event) {
                                return _vm.$emit("rename", data.group)
                              },
                            },
                          },
                          [
                            _c("img", {
                              staticClass: "size-16",
                              attrs: { src: "/icons/edit.svg" },
                            }),
                            _vm._v(" "),
                            _c("span", {
                              domProps: {
                                textContent: _vm._s(
                                  _vm.lang("hotkeyActionTitleRenameGroup") +
                                    " (F2)"
                                ),
                              },
                            }),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.menu.includes("reload-all-tabs") &&
                    !data.group.isArchive
                      ? [
                          _c("hr"),
                          _vm._v(" "),
                          _c(
                            "li",
                            {
                              on: {
                                click: function ($event) {
                                  return _vm.$emit(
                                    "reload-all-tabs",
                                    data.group,
                                    $event.ctrlKey || $event.metaKey
                                  )
                                },
                              },
                            },
                            [
                              _c("img", {
                                staticClass: "size-16",
                                attrs: { src: "/icons/refresh.svg" },
                              }),
                              _vm._v(" "),
                              _c("span", {
                                domProps: {
                                  textContent: _vm._s(
                                    _vm.lang("reloadAllTabsInGroup")
                                  ),
                                },
                              }),
                            ]
                          ),
                        ]
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.showSettings || _vm.showRemove
                      ? [
                          _c("hr"),
                          _vm._v(" "),
                          _vm.showSettings
                            ? _c(
                                "li",
                                {
                                  on: {
                                    click: function ($event) {
                                      return _vm.$emit("settings", data.group)
                                    },
                                  },
                                },
                                [
                                  _c("img", {
                                    staticClass: "size-16",
                                    attrs: { src: "/icons/settings.svg" },
                                  }),
                                  _vm._v(" "),
                                  _c("span", {
                                    domProps: {
                                      textContent: _vm._s(
                                        _vm.lang("groupSettings")
                                      ),
                                    },
                                  }),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.showRemove
                            ? _c(
                                "li",
                                {
                                  on: {
                                    click: function ($event) {
                                      return _vm.$emit("remove", data.group)
                                    },
                                  },
                                },
                                [
                                  _c("img", {
                                    staticClass: "size-16",
                                    attrs: { src: "/icons/group-delete.svg" },
                                  }),
                                  _vm._v(" "),
                                  _c("span", {
                                    domProps: {
                                      textContent: _vm._s(
                                        _vm.lang("deleteGroup")
                                      ),
                                    },
                                  }),
                                ]
                              )
                            : _vm._e(),
                        ]
                      : _vm._e(),
                  ],
                  2
                )
              : _vm._e(),
          ]
        },
      },
    ]),
  })
}
var context_menu_groupvue_type_template_id_32b76970_staticRenderFns = []
context_menu_groupvue_type_template_id_32b76970_render._withStripped = true


;// CONCATENATED MODULE: ./components/context-menu-group.vue?vue&type=template&id=32b76970&

;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/index.js??vue-loader-options!./components/context-menu-group.vue?vue&type=script&lang=js&



/* harmony default export */ const context_menu_groupvue_type_script_lang_js_ = ({
    props: {
        menu: {
            type: Array,
            required: true,
        },
        groups: {
            type: Array,
            required: true,
        },
        openedWindows: {
            type: Array,
            required: true,
        },
        showRename: {
            type: Boolean,
            default: true,
        },
        showSettings: {
            type: Boolean,
            default: true,
        },
        showRemove: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        'context-menu': context_menu,
    },
    methods: {
        lang: browser.i18n.getMessage,
        open(...args) {
            this.$refs.contextMenu.open(...args);
        },
        isOpened({id}) {
            return this.openedWindows.some(win => win.groupId === id);
        },
    },
});


;// CONCATENATED MODULE: ./components/context-menu-group.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_context_menu_groupvue_type_script_lang_js_ = (context_menu_groupvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./components/context-menu-group.vue





/* normalize component */
;
var context_menu_group_component = normalizeComponent(
  components_context_menu_groupvue_type_script_lang_js_,
  context_menu_groupvue_type_template_id_32b76970_render,
  context_menu_groupvue_type_template_id_32b76970_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const context_menu_group = (context_menu_group_component.exports);
;// CONCATENATED MODULE: external "/js/logger.js"
var logger_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var logger_js_y = x => () => x
const logger_js_namespaceObject = logger_js_x({ ["catchFunc"]: () => __WEBPACK_EXTERNAL_MODULE__js_logger_js_162b1479__.catchFunc, ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_logger_js_162b1479__["default"] });
;// CONCATENATED MODULE: external "/js/urls.js"
var urls_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var urls_js_y = x => () => x
const urls_js_namespaceObject = urls_js_x({ ["openOptionsPage"]: () => __WEBPACK_EXTERNAL_MODULE__js_urls_js_a3942af5__.openOptionsPage });
;// CONCATENATED MODULE: external "/js/cache.js"
var cache_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var cache_js_y = x => () => x
const cache_js_namespaceObject = cache_js_x({ ["applyTabSession"]: () => __WEBPACK_EXTERNAL_MODULE__js_cache_js_87263abf__.applyTabSession, ["getTabGroup"]: () => __WEBPACK_EXTERNAL_MODULE__js_cache_js_87263abf__.getTabGroup, ["getWindowGroup"]: () => __WEBPACK_EXTERNAL_MODULE__js_cache_js_87263abf__.getWindowGroup, ["hasTab"]: () => __WEBPACK_EXTERNAL_MODULE__js_cache_js_87263abf__.hasTab });
;// CONCATENATED MODULE: external "/js/windows.js"
var windows_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var windows_js_y = x => () => x
const windows_js_namespaceObject = windows_js_x({ ["get"]: () => __WEBPACK_EXTERNAL_MODULE__js_windows_js_630ae37e__.get, ["load"]: () => __WEBPACK_EXTERNAL_MODULE__js_windows_js_630ae37e__.load });
;// CONCATENATED MODULE: external "/js/mixins/default-group.mixin.js"
var default_group_mixin_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var default_group_mixin_js_y = x => () => x
const default_group_mixin_js_namespaceObject = default_group_mixin_js_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_mixins_default_group_mixin_js_b0c4f4fc__["default"] });
;// CONCATENATED MODULE: external "/js/mixins/start-up-data.mixin.js"
var start_up_data_mixin_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var start_up_data_mixin_js_y = x => () => x
const start_up_data_mixin_js_namespaceObject = start_up_data_mixin_js_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_mixins_start_up_data_mixin_js_421c48e9__["default"] });
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/index.js??vue-loader-options!./manage/Manage.vue?vue&type=script&lang=js&

    

    

    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    

    
    

    window.logger = new logger_js_namespaceObject["default"]('Manage');

    // import dnd from '../js/dnd';
    // import { Drag, Drop } from 'vue-drag-drop';
    // import draggable from 'vuedraggable';

    document.title = browser.i18n.getMessage('manageGroupsTitle');

    vue_runtime_esm_js_namespaceObject["default"].config.errorHandler = errorEventHandler.bind(window.logger);

    function showDebugMode() {
        if (localStorage.enableDebug) {
            const div = document.createElement('div');
            div.innerText = browser.i18n.getMessage('loggingIsEnabledTitle');
            Object.assign(div.style, {
                position: 'fixed',
                backgroundColor: 'coral',
                padding: '0 4px',
                borderRadius: '3px',
                top: 0,
                left: '50%',
                transform: 'translate(-50%)',
                cursor: 'pointer',
            });
            div.addEventListener('click', () => messages_js_namespaceObject["default"].sendMessage('open-options-page', 'general'));
            document.body.appendChild(div);
        }
    }

    showDebugMode();

    const VIEW_GRID = 'grid',
        VIEW_DEFAULT = VIEW_GRID,
        availableTabKeys = new Set(['id', 'url', 'title', 'favIconUrl', 'status', 'index', 'discarded', 'active', 'cookieStoreId', 'thumbnail', 'windowId']);

    /* harmony default export */ const Managevue_type_script_lang_js_ = ({
        name: 'manage-page',
        mixins: [default_group_mixin_js_namespaceObject["default"], start_up_data_mixin_js_namespaceObject["default"]],
        data() {
            return {
                DEFAULT_COOKIE_STORE_ID: constants_js_namespaceObject.DEFAULT_COOKIE_STORE_ID,
                TEMPORARY_CONTAINER: constants_js_namespaceObject.TEMPORARY_CONTAINER,

                VIEW_GRID,

                view: VIEW_DEFAULT,

                showPromptPopup: false,
                promptTitle: null,
                promptValue: '',
                promptResolveFunc: null,

                showConfirmPopup: false,
                confirmTitle: '',
                confirmText: '',
                confirmLang: '',
                confirmClass: '',
                confirmResolveFunc: null,

                isLoading: true,

                search: '',
                searchDelay: '',
                searchDelayTimer: 0,
                extendedSearch: false,

                currentWindow: null,
                openedWindows: [],

                groupToEdit: null,

                containers: containers_js_namespaceObject.getAll(true),
                options: {},
                showArchivedGroupsInManageGroups: !!window.localStorage.showArchivedGroupsInManageGroups,

                groups: [],

                allTabs: {},

                unSyncTabs: [],

                dragData: null,
                multipleTabIds: [],
            };
        },
        components: {
            popup: popup,
            'edit-group': edit_group,
            'context-menu': context_menu,
            'context-menu-tab': context_menu_tab,
            'context-menu-tab-new': context_menu_tab_new,
            'context-menu-group': context_menu_group,
        },
        created() {
            this.loadOptions();

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => this.updateTheme());
        },
        async mounted() {
            const log = logger.start('mounted');
            const startUpData = await this.startUpData(this.options.showTabsWithThumbnailsInManageGroups);

            this.loadWindows(startUpData);
            this.loadGroups(startUpData);
            this.loadUnsyncedTabs(startUpData);

            log.log('loaded');

            this.$nextTick(function() {
                this.isLoading = false;
                this.setFocusOnSearch();
                this.setupListeners();

                if (this.options.showTabsWithThumbnailsInManageGroups) {
                    this.loadAvailableTabThumbnails();
                }

                log.stop();
            });
        },
        watch: {
            'options.theme': 'updateTheme',
            'options.showTabsWithThumbnailsInManageGroups': function(value, oldValue) {
                if (null != oldValue) {
                    messages_js_namespaceObject["default"].sendMessageModule('BG.saveOptions', {
                            showTabsWithThumbnailsInManageGroups: value,
                        })
                        .then(() => value && this.loadAvailableTabThumbnails());
                }
            },
            showArchivedGroupsInManageGroups(value) {
                if (value) {
                    window.localStorage.showArchivedGroupsInManageGroups = 1;
                } else {
                    delete window.localStorage.showArchivedGroupsInManageGroups;
                }
            },
            searchDelay(search) {
                if (search.length && this.allTabsCount > 200) {
                    window.clearTimeout(this.searchDelayTimer);
                    this.searchDelayTimer = window.setTimeout(() => {
                        this.search = search;
                        this.searchDelayTimer = 0;
                    }, 500);
                } else {
                    this.search = search;
                }
            },
        },
        computed: {
            filteredGroups() {
                let searchStr = this.search.toLowerCase(),
                    groups = this.showArchivedGroupsInManageGroups ? this.groups : this.groups.filter(group => !group.isArchive);

                return groups.map(group => {
                    group.filteredTabs = group.tabs.filter(tab => utils_js_namespaceObject.mySearchFunc(searchStr, tabs_js_namespaceObject.getTitle(tab, true), this.extendedSearch));
                    return group;
                });
            },
            filteredUnSyncTabs() {
                let searchStr = this.search.toLowerCase();

                return this.unSyncTabs.filter(tab => utils_js_namespaceObject.mySearchFunc(searchStr, tabs_js_namespaceObject.getTitle(tab, true), this.extendedSearch));
            },
            isCurrentWindowIsAllow() {
                return this.currentWindow && utils_js_namespaceObject.isWindowAllow(this.currentWindow);
            },
            allTabsCount() {
                return Object.keys(this.allTabs).length;
            },
        },
        methods: {
            lang: browser.i18n.getMessage,

            updateTheme() {
                document.documentElement.dataset.theme = utils_js_namespaceObject.getThemeApply(this.options.theme);
            },

            setFocusOnSearch() {
                this.$nextTick(() => this.$refs.search.focus());
            },

            loadOptions() {
                this.options = json_js_namespaceObject["default"].clone(background_js_namespaceObject["default"].options);
            },

            async loadWindows({currendWindow, windows} = {}) {
                this.currentWindow = currendWindow || await windows_js_namespaceObject.get();
                this.openedWindows = windows || await windows_js_namespaceObject.load();
            },

            setupListeners() {
                this
                    .$on('drag-move-group', function(from, to) {
                        groups_js_namespaceObject.move(from.data.item.id, this.groups.indexOf(to.data.item));
                    })
                    .$on('drag-move-tab', function(from, to) {
                        if ('new-group' === to.data.item.id) {
                            this.moveTabToNewGroup(null, true);
                        } else {
                            const tabIds = this.getTabIdsForMove(),
                                groupId = this.isGroup(to.data.item) ? to.data.item.id : to.data.group.id,
                                newTabIndex = this.isGroup(to.data.item) ? undefined : to.data.item.index;

                            messages_js_namespaceObject["default"].sendMessageModule('Tabs.move', tabIds, groupId, {newTabIndex});
                        }
                    })
                    .$on('drag-moving', (item, isMoving) => item.isMoving = isMoving)
                    .$on('drag-over', (item, isOver) => item.isOver = isOver);

                let lazyRemoveTabTimer = 0,
                    lazyRemoveTabIds = [];
                const removeTab = (tabId, withAllTabs = false) => {
                    lazyRemoveTabIds.push(tabId);

                    if (withAllTabs) {
                        delete this.allTabs[tabId];
                    }

                    clearTimeout(lazyRemoveTabTimer);
                    lazyRemoveTabTimer = setTimeout(tabIds => {
                        lazyRemoveTabIds = [];

                        this.multipleTabIds = this.multipleTabIds.filter(tabId => !tabIds.includes(tabId));
                        this.loadUnsyncedTabs();

                        tabIds.forEach(tabId => {
                            let tabIndex = -1,
                                group = this.groups.find(gr => !gr.isArchive && -1 !== (tabIndex = gr.tabs.findIndex(tab => tab.id === tabId)));

                            if (group) {
                                group.tabs.splice(tabIndex, 1);
                                group.tabs.slice(tabIndex).forEach(t => t.index--);
                            }
                        });
                    }, 150, lazyRemoveTabIds);
                };

                let lazyAddUnsyncTabTimer = 0;
                const lazyAddTab = (tab, groupId) => {
                    tab = this.mapTab(cache_js_namespaceObject.applyTabSession(tab));

                    let group = groupId ? this.groups.find(gr => gr.id === groupId) : null;

                    if (group) {
                        if (!Object.isFrozen(group.tabs)) {
                            if (group.tabs.some(t => t.id === tab.id)) {
                                return;
                            }

                            let index = group.tabs.findIndex(t => t.index >= tab.index);

                            if (index === -1) {
                                index = group.tabs.length;
                            }

                            group.tabs.splice(index, 0, tab);
                            group.tabs.slice(index + 1).forEach(t => t.index++);
                        }
                    } else {
                        clearTimeout(lazyAddUnsyncTabTimer);
                        lazyAddUnsyncTabTimer = setTimeout(() => this.loadUnsyncedTabs(), 150);
                    }
                };

                let lazyCreateTabsTimer = 0,
                    lazyCreateTabs = [];
                const onCreatedTab = tab => {
                    if (utils_js_namespaceObject.isTabPinned(tab)) {
                        return;
                    }

                    if (background_js_namespaceObject["default"].groupIdForNextTab) {
                        lazyAddTab(tab, background_js_namespaceObject["default"].groupIdForNextTab);
                        return;
                    }

                    lazyCreateTabs.push(tab);

                    clearTimeout(lazyCreateTabsTimer);
                    lazyCreateTabsTimer = setTimeout(function(tabs) {
                        lazyCreateTabs = [];

                        tabs.forEach(tab => lazyAddTab(tab, cache_js_namespaceObject.getTabGroup(tab.id)));
                    }, 200, lazyCreateTabs);
                };

                const onUpdatedTab = (tabId, changeInfo, tab) => {
                    if (utils_js_namespaceObject.isTabPinned(tab) && undefined === changeInfo.pinned) {
                        return;
                    }

                    if (!cache_js_namespaceObject.hasTab(tab.id)) {
                        return;
                    }

                    if (this.allTabs[tab.id]) {
                        if (changeInfo.favIconUrl) {
                            utils_js_namespaceObject.normalizeTabFavIcon(changeInfo);
                            this.allTabs[tab.id].favIconUrl = changeInfo.favIconUrl;
                        }

                        if (changeInfo.url) {
                            utils_js_namespaceObject.normalizeTabUrl(changeInfo);
                            this.allTabs[tab.id].url = changeInfo.url;
                        }

                        if (changeInfo.title) {
                            this.allTabs[tab.id].title = changeInfo.title;
                        }

                        if (changeInfo.status) {
                            this.allTabs[tab.id].status = changeInfo.status;
                        }

                        if (changeInfo.hasOwnProperty('discarded')) {
                            this.allTabs[tab.id].discarded = changeInfo.discarded;
                        } else if (changeInfo.status) {
                            this.allTabs[tab.id].discarded = false;
                        }

                        this.allTabs[tab.id].lastAccessed = tab.lastAccessed;
                    }

                    if (background_js_namespaceObject["default"].excludeTabIds.has(tab.id)) {
                        return;
                    }

                    if (changeInfo.hasOwnProperty('pinned') || changeInfo.hasOwnProperty('hidden')) {
                        let tabGroupId = cache_js_namespaceObject.getTabGroup(tab.id),
                            winGroupId = cache_js_namespaceObject.getWindowGroup(tab.windowId);

                        if (changeInfo.pinned || changeInfo.hidden) {
                            removeTab(tab.id);
                        } else {

                            if (false === changeInfo.hidden) {
                                if (tabGroupId) {
                                    return;
                                }
                            }

                            if (winGroupId) {
                                lazyAddTab(tab, winGroupId);
                            }
                        }
                    }
                };

                const onRemovedTab = tabId => removeTab(tabId, true);

                const onActivatedTab = ({tabId, previousTabId}) => {
                    if (this.allTabs[tabId]) {
                        this.allTabs[tabId].active = true;
                    }
                    if (this.allTabs[previousTabId]) {
                        this.allTabs[previousTabId].active = false;
                    }
                };

                let onMovedTabTimer = 0,
                    onMovedUnsyncTabTimer = 0;
                const onMovedTab = (tabId, {windowId}) => {
                    let groupId = cache_js_namespaceObject.getWindowGroup(windowId);

                    if (groupId) {
                        clearTimeout(onMovedTabTimer);
                        onMovedTabTimer = setTimeout(groupId => this.loadGroupTabs(groupId), 100, groupId);
                    } else {
                        clearTimeout(onMovedUnsyncTabTimer);
                        onMovedUnsyncTabTimer = setTimeout(() => this.loadUnsyncedTabs(), 100);
                    }
                };

                let onDetachedTabTimer = 0;
                const onDetachedTab = (tabId, {oldWindowId}) => { // notice: call before onAttached
                    if (background_js_namespaceObject["default"].excludeTabIds.has(tabId)) {
                        return;
                    }

                    let groupId = cache_js_namespaceObject.getWindowGroup(oldWindowId);

                    if (groupId) {
                        clearTimeout(onDetachedTabTimer);
                        onDetachedTabTimer = setTimeout(groupId => this.loadGroupTabs(groupId), 100, groupId);
                    }
                };

                let onAttachedTabTimer = 0,
                    onAttachedUnsyncTabTimer = 0,
                    onAttachedTabWinTimer = 0;
                const onAttachedTab = (tabId, {newWindowId}) => {
                    if (background_js_namespaceObject["default"].excludeTabIds.has(tabId)) {
                        return;
                    }

                    clearTimeout(onAttachedTabWinTimer);
                    onAttachedTabWinTimer = setTimeout(() => this.loadWindows());

                    let groupId = cache_js_namespaceObject.getWindowGroup(newWindowId);

                    if (groupId) {
                        clearTimeout(onAttachedTabTimer);
                        onAttachedTabTimer = setTimeout(groupId => this.loadGroupTabs(groupId), 100, groupId);
                    } else {
                        clearTimeout(onAttachedUnsyncTabTimer);
                        onAttachedUnsyncTabTimer = setTimeout(() => this.loadUnsyncedTabs(), 100);
                    }
                };

                const listeners = {
                    'group-updated': (request) => {
                        let group = this.groups.find(gr => gr.id === request.group.id);
                        Object.assign(group, request.group);
                    },
                    'group-added': (request) => {
                        if (!this.groups.some(gr => gr.id === request.group.id)) {
                            this.groups.push(this.mapGroup(request.group));
                            this.$emit('group-added');
                        }
                    },
                    'group-removed': (request) => {
                        let groupIndex = this.groups.findIndex(gr => gr.id === request.groupId);

                        if (-1 !== groupIndex) {
                            this.groups.splice(groupIndex, 1);
                        }
                    },
                    'groups-updated': () => listeners['group-unloaded'](),
                    'group-unloaded': () => {
                        this.loadGroups();
                        this.loadUnsyncedTabs();
                        this.loadWindows();
                    },
                    'group-loaded': () => listeners['window-closed'](),
                    'window-closed': () => {
                        this.loadWindows();
                    },
                    'options-updated': () => {
                        this.loadOptions();
                    },
                    'containers-updated': () => {
                        this.containers = containers_js_namespaceObject.getAll(true);
                        Object.values(this.allTabs).forEach(this.mapTabContainer);
                    },
                    'lock-addon': () => {
                        this.isLoading = true;
                        removeEvents();
                    },
                    'thumbnail-updated': (request) => {
                        let foundTab = this.groups.some(group => {
                            if (group.isArchive) {
                                return;
                            }

                            let tab = group.tabs.find(tab => tab.id === request.tabId);

                            if (tab) {
                                tab.thumbnail = request.thumbnail;
                                return true;
                            }
                        });

                        if (!foundTab) {
                            this.loadUnsyncedTabs();
                        }
                    },
                };

                const onMessage = (0,logger_js_namespaceObject.catchFunc)(async request => {
                    logger.info('take message', request.action);
                    await listeners[request.action](request);
                });

                browser.tabs.onCreated.addListener(onCreatedTab);
                browser.tabs.onUpdated.addListener(onUpdatedTab, {
                    properties: [
                        browser.tabs.UpdatePropertyName.DISCARDED,
                        browser.tabs.UpdatePropertyName.FAVICONURL,
                        browser.tabs.UpdatePropertyName.HIDDEN,
                        browser.tabs.UpdatePropertyName.PINNED,
                        browser.tabs.UpdatePropertyName.TITLE,
                        browser.tabs.UpdatePropertyName.STATUS,
                    ],
                });
                browser.tabs.onRemoved.addListener(onRemovedTab);
                browser.tabs.onActivated.addListener(onActivatedTab);
                browser.tabs.onMoved.addListener(onMovedTab);
                browser.tabs.onDetached.addListener(onDetachedTab);
                browser.tabs.onAttached.addListener(onAttachedTab);

                const {disconnect} = messages_js_namespaceObject["default"].connectToBackground(logger.prefixes.join('.'), Object.keys(listeners), onMessage);

                function removeEvents() {
                    browser.tabs.onCreated.removeListener(onCreatedTab);
                    browser.tabs.onUpdated.removeListener(onUpdatedTab);
                    browser.tabs.onRemoved.removeListener(onRemovedTab);
                    browser.tabs.onActivated.removeListener(onActivatedTab);
                    browser.tabs.onMoved.removeListener(onMovedTab);
                    browser.tabs.onDetached.removeListener(onDetachedTab);
                    browser.tabs.onAttached.removeListener(onAttachedTab);
                    disconnect();
                }

                window.addEventListener('unload', removeEvents);

                if (!this.isCurrentWindowIsAllow) {
                    window.addEventListener('resize', function() {
                        if (window.localStorage.manageGroupsWindowWidth != window.innerWidth) {
                            window.localStorage.manageGroupsWindowWidth = window.innerWidth;
                        }

                        if (window.localStorage.manageGroupsWindowHeight != window.innerHeight) {
                            window.localStorage.manageGroupsWindowHeight = window.innerHeight;
                        }
                    });
                }
            },

            loadAvailableTabThumbnails() {
                this.groups.forEach(function(group) {
                    if (!group.isArchive) {
                        group.tabs.forEach(function(tab) {
                            if (!tab.thumbnail && !tab.discarded && utils_js_namespaceObject.isTabLoaded(tab)) {
                                messages_js_namespaceObject["default"].sendMessageModule('Tabs.updateThumbnail', tab.id);
                            }
                        });
                    }
                });
            },

            async loadGroupTabs(groupId) {
                let {group: {tabs}} = await groups_js_namespaceObject.load(groupId, true, true, true),
                    group = this.groups.find(gr => gr.id === groupId);

                group.tabs = tabs.map(this.mapTab, this);
            },

            getTabIdsForMove(tabId) {
                if (tabId && !this.multipleTabIds.includes(tabId)) {
                    this.multipleTabIds.push(tabId);
                }

                let tabs = this.multipleTabIds;

                this.multipleTabIds = [];

                return [...tabs];
            },
            async moveTabs(tabId, groupId, loadUnsync = false, showTabAfterMovingItIntoThisGroup, discardTabs) {
                let tabIds = this.getTabIdsForMove(tabId);

                await messages_js_namespaceObject["default"].sendMessageModule('Tabs.move', tabIds, groupId, {showTabAfterMovingItIntoThisGroup});

                if (discardTabs) {
                    messages_js_namespaceObject["default"].sendMessageModule('Tabs.discard', tabIds);
                }

                if (loadUnsync) {
                    this.loadUnsyncedTabs();
                }
            },
            async moveTabToNewGroup(tabId, loadUnsync, showTabAfterMovingItIntoThisGroup) {
                let newGroupTitle = '',
                    tabIds = this.getTabIdsForMove(tabId);

                if (this.options.alwaysAskNewGroupName) {
                    newGroupTitle = await groups_js_namespaceObject.getNextTitle();

                    newGroupTitle = await this.showPrompt(this.lang('createNewGroup'), newGroupTitle);

                    if (!newGroupTitle) {
                        return;
                    }
                }

                let newGroupWindowId = showTabAfterMovingItIntoThisGroup ? this.currentWindow.id : undefined,
                    newGroup = await groups_js_namespaceObject.add(newGroupWindowId, tabIds, newGroupTitle);

                if (showTabAfterMovingItIntoThisGroup) {
                    this.applyGroup(newGroup, {id: tabId});
                }

                if (loadUnsync) {
                    this.loadUnsyncedTabs();
                }
            },

            showPrompt(title, value) {
                if (this.showPromptPopup) {
                    return Promise.resolve(false);
                }

                return new Promise(resolve => {
                    this.promptTitle = title;
                    this.promptValue = value;

                    this.promptResolveFunc = ok => {
                        this.showPromptPopup = false;

                        if (ok && this.promptValue.length) {
                            resolve(this.promptValue);
                        } else {
                            resolve(false);
                        }
                    };

                    this.showPromptPopup = true;
                });
            },

            showConfirm(title, text, confirmLang = 'ok', confirmClass = 'is-success') {
                if (this.showConfirmPopup) {
                    return Promise.resolve(false);
                }

                return new Promise(resolve => {
                    this.confirmTitle = title;
                    this.confirmText = text;
                    this.confirmLang = confirmLang;
                    this.confirmClass = confirmClass;

                    this.confirmResolveFunc = ok => {
                        this.showConfirmPopup = false;
                        resolve(ok);
                    };

                    this.showConfirmPopup = true;
                });
            },

            mapGroup(group) {
                if (group.isArchive) {
                    group.tabs = Object.freeze(group.tabs.map(utils_js_namespaceObject.normalizeTabFavIcon).map(this.mapTabContainer));
                } else {
                    group.tabs = group.tabs.map(this.mapTab, this);
                }

                group.draggable = true;
                group.isMoving = false;
                group.isOver = false;

                return new vue_runtime_esm_js_namespaceObject["default"]({
                    data: group,
                    watch: {
                        title: function(title) {
                            messages_js_namespaceObject["default"].sendMessageModule('Groups.update', this.id, {
                                title: groups_js_namespaceObject.createTitle(title, this.id),
                            });
                        },
                    },
                    computed: {
                        iconUrlToDisplay() {
                            return groups_js_namespaceObject.getIconUrl({
                                title: this.title,
                                iconUrl: this.iconUrl,
                                iconColor: this.iconColor,
                                iconViewType: this.iconViewType,
                            });
                        },
                    },
                });
            },

            mapTab(tab) {
                Object.keys(tab).forEach(key => !availableTabKeys.has(key) && delete tab[key]);

                tab = utils_js_namespaceObject.normalizeTabFavIcon(tab);

                if (!tab.thumbnail) {
                    tab.thumbnail = null;
                }

                if (tab.url === window.location.href) {
                    tab.status = browser.tabs.TabStatus.COMPLETE;
                }

                tab = this.mapTabContainer(tab);

                tab.isMoving = false;
                tab.isOver = false;

                return this.allTabs[tab.id] = vue_runtime_esm_js_namespaceObject["default"].observable(tab);
            },

            mapTabContainer(tab) {
                tab.container = containers_js_namespaceObject.get(tab.cookieStoreId);
                return tab;
            },

            async loadGroups({groups} = {}) {
                ({groups} = groups ? {groups} : await groups_js_namespaceObject.load(null, true, true, this.options.showTabsWithThumbnailsInManageGroups));

                this.groups = groups.map(this.mapGroup, this);

                this.multipleTabIds = [];
            },
            async loadUnsyncedTabs({unSyncTabs} = {}) {
                if (unSyncTabs) {
                    return this.unSyncTabs = unSyncTabs.map(this.mapTab, this);
                }

                let windows = await windows_js_namespaceObject.load(true, true, true);

                this.unSyncTabs = windows
                    .reduce(function(acc, win) {
                        win.tabs.forEach(tab => !tab.groupId && acc.push(tab));
                        return acc;
                    }, [])
                    .map(this.mapTab, this);
            },
            addGroup() {
                this.$once('group-added', () => {
                    this.$nextTick(() => [...document.querySelectorAll('input[type="text"]')].pop().select());
                });

                groups_js_namespaceObject.add();
            },

            addTab(group, cookieStoreId) {
                messages_js_namespaceObject["default"].sendMessageModule('Tabs.add', group.id, cookieStoreId);
            },
            removeTab(tab) {
                messages_js_namespaceObject["default"].sendMessageModule('Tabs.remove', this.getTabIdsForMove(tab.id));
            },
            updateTabThumbnail({id}) {
                messages_js_namespaceObject["default"].sendMessageModule('Tabs.updateThumbnail', id);
            },
            discardTab(tab) {
                messages_js_namespaceObject["default"].sendMessageModule('Tabs.discard', this.getTabIdsForMove(tab.id));
            },
            discardGroup({tabs}) {
                messages_js_namespaceObject["default"].sendMessageModule('Tabs.discard', tabs);
            },
            discardOtherGroups(groupExclude) {
                let tabs = this.groups.reduce((acc, gr) => {
                    let groupTabs = (gr.id === groupExclude.id || gr.isArchive || this.isOpenedGroup(gr)) ? [] : gr.tabs;

                    acc.push(...groupTabs);

                    return acc;
                }, []);

                messages_js_namespaceObject["default"].sendMessageModule('Tabs.discard', tabs);
            },
            reloadTab(tab, bypassCache) {
                messages_js_namespaceObject["default"].sendMessageModule('Tabs.reload', this.getTabIdsForMove(tab.id), bypassCache);
            },
            reloadAllTabsInGroup(group, bypassCache) {
                messages_js_namespaceObject["default"].sendMessageModule('Tabs.reload', group.tabs.map(tabs_js_namespaceObject.extractId), bypassCache);
            },

            async applyGroup({id: groupId}, {id: tabId} = {}, openInNewWindow = false) {
                if (!this.isCurrentWindowIsAllow) {
                    await browser.windows.update(this.currentWindow.id, {
                        state: browser.windows.WindowState.MINIMIZED,
                    });
                }

                await messages_js_namespaceObject["default"].sendMessage('load-custom-group', {
                    groupId,
                    tabId,
                    windowId: openInNewWindow ? 'new' : null,
                });

                if (!this.isCurrentWindowIsAllow) {
                    this.closeThisWindow();
                }
            },

            isOpenedGroup({id}) {
                return this.openedWindows.some(win => win.groupId === id);
            },

            async clickOnTab(event, tab, group) {
                if (event.ctrlKey || event.metaKey) {
                    if (this.multipleTabIds.includes(tab.id)) {
                        this.multipleTabIds.splice(this.multipleTabIds.indexOf(tab.id), 1);
                    } else {
                        this.multipleTabIds.push(tab.id);
                    }
                } else if (event.shiftKey) {
                    if (this.multipleTabIds.length) {
                        let tabIds = group ? group.filteredTabs.map(tabs_js_namespaceObject.extractId) : this.filteredUnSyncTabs.map(tabs_js_namespaceObject.extractId),
                            tabIndex = tabIds.indexOf(tab.id),
                            lastTabIndex = -1;

                        this.multipleTabIds.slice().reverse().some(function(tabId) {
                            return -1 !== (lastTabIndex = tabIds.indexOf(tabId));
                        });

                        if (-1 === lastTabIndex) {
                            this.multipleTabIds.push(tab.id);
                        } else if (tabIndex !== lastTabIndex) {
                            let multipleTabIndex = this.multipleTabIds.indexOf(tabIds[lastTabIndex]);

                            for (let i = Math.min(tabIndex, lastTabIndex), maxIndex = Math.max(tabIndex, lastTabIndex); i <= maxIndex; i++) {
                                if (!this.multipleTabIds.includes(tabIds[i])) {
                                    if (tabIndex > lastTabIndex) {
                                        this.multipleTabIds.push(tabIds[i]);
                                    } else {
                                        this.multipleTabIds.splice(multipleTabIndex, 0, tabIds[i]);
                                    }
                                }
                            }
                        }
                    } else {
                        this.multipleTabIds.push(tab.id);
                    }
                } else if (group) {
                    this.applyGroup(group, tab);
                } else if (this.isCurrentWindowIsAllow) {
                    await messages_js_namespaceObject["default"].sendMessageModule('Tabs.moveNative', [tab.id], {
                        windowId: this.currentWindow.id,
                        index: -1,
                    });

                    await messages_js_namespaceObject["default"].sendMessageModule('Tabs.show', tab.id);

                    this.loadUnsyncedTabs();
                }
            },

            openGroupSettings(group) {
                this.groupToEdit = group;
            },
            async removeGroup(group) {
                if (this.options.showConfirmDialogBeforeGroupDelete) {
                    let ok = await this.showConfirm(this.lang('deleteGroup'), this.lang('confirmDeleteGroup', utils_js_namespaceObject.safeHtml(group.title)), 'delete', 'is-danger');

                    if (!ok) {
                        return;
                    }
                }

                this.groups.splice(this.groups.indexOf(group), 1);

                messages_js_namespaceObject["default"].sendMessageModule('Groups.remove', group.id);
            },
            setTabIconAsGroupIcon({favIconUrl}, group) {
                groups_js_namespaceObject.setIconUrl(group.id, favIconUrl);
            },

            getTabTitle: tabs_js_namespaceObject.getTitle,
            // getGroupTitle: Groups.getTitle,
            isTabLoading: utils_js_namespaceObject.isTabLoading,
            groupTabsCountMessage: groups_js_namespaceObject.tabsCountMessage,

            isGroup(obj) {
                return obj.hasOwnProperty('tabs');
            },

            sortGroups(vector) {
                groups_js_namespaceObject.sort(vector);
            },
            exportGroupToBookmarks(group) {
                messages_js_namespaceObject["default"].sendMessage('export-group-to-bookmarks', {
                    groupId: group.id,
                });
            },
            unloadGroup({id}) {
                messages_js_namespaceObject["default"].sendMessageModule('Groups.unload', id);
            },

            saveEditedGroup(groupId, changes) {
                this.groupToEdit = null;

                if (Object.keys(changes).length) {
                    messages_js_namespaceObject["default"].sendMessageModule('Groups.update', groupId, changes);
                }
            },

            async toggleArchiveGroup({id, title, isArchive}) {
                let ok = true;

                if (!isArchive && this.options.showConfirmDialogBeforeGroupArchiving) {
                    ok = await this.showConfirm(this.lang('archiveGroup'), this.lang('confirmArchiveGroup', utils_js_namespaceObject.safeHtml(title)));
                }

                if (ok) {
                    this.isLoading = true;
                    await messages_js_namespaceObject["default"].sendMessageModule('Groups.archiveToggle', id);
                    this.isLoading = false;
                }
            },


            // allowTypes: Array ['groups', 'tabs']
            dragHandle(event, itemType, allowTypes, data) {
                if (event.type !== 'dragstart' && (!this.dragData || !this.dragData.allowTypes.includes(itemType))) {
                    return;
                }

                switch (event.type) {
                    case 'dragstart':
                        event.stopPropagation();
                        this.$emit('drag-moving', data.item, true);

                        this.dragData = {itemType, allowTypes, data};

                        event.dataTransfer.effectAllowed = 'move';
                        event.dataTransfer.setData('text/html', '');

                        if ('tab' === itemType) {
                            if (!this.multipleTabIds.includes(data.item.id)) {
                                this.multipleTabIds.push(data.item.id);
                            }

                            if (1 < this.multipleTabIds.length) {
                                let multiTabsNode = document.getElementById('multipleTabsText');
                                multiTabsNode.innerText = browser.i18n.getMessage('movingMultipleTabsText', this.multipleTabIds.length);

                                event.dataTransfer.setDragImage(multiTabsNode, 20, multiTabsNode.offsetHeight - 80);
                            }
                        }
                        break;
                    case 'dragenter':
                        event.preventDefault();
                        event.stopPropagation();
                        this.$emit('drag-over', data.item, true);
                        break;
                    case 'dragover':
                        event.preventDefault();
                        event.stopPropagation();
                        event.dataTransfer.dropEffect = 'move';
                        return false;
                        break;
                    case 'dragleave':
                        event.stopPropagation();
                        this.$emit('drag-over', data.item, false);
                        break;
                    case 'drop':
                        event.preventDefault();
                        event.stopPropagation();
                        this.$emit('drag-over', data.item, false);

                        if (data.item !== this.dragData.data.item) {
                            this.$emit('drag-move-' + this.dragData.itemType, this.dragData, {itemType, allowTypes, data});
                        }

                        return false;
                        break;
                    case 'dragend':
                        event.stopPropagation();
                        this.$emit('drag-moving', this.dragData.data.item, false);

                        if (1 === this.multipleTabIds.length) {
                            this.multipleTabIds = [];
                        }

                        this.dragData = null;
                        break;
                }
            },

            async closeThisWindow() {
                if (this.isCurrentWindowIsAllow) {
                    let tab = await tabs_js_namespaceObject.getActive();
                    tabs_js_namespaceObject.remove(tab.id);
                } else {
                    browser.windows.remove(this.currentWindow.id); // close manage groups POPUP window
                }
            },

            openOptionsPage() {
                delete window.localStorage.optionsSection;
                urls_js_namespaceObject.openOptionsPage();
            },
        },
    });

;// CONCATENATED MODULE: ./manage/Manage.vue?vue&type=script&lang=js&
 /* harmony default export */ const manage_Managevue_type_script_lang_js_ = (Managevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./manage/Manage.vue



;


/* normalize component */

var Manage_component = normalizeComponent(
  manage_Managevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const Manage = (Manage_component.exports);
;// CONCATENATED MODULE: ./manage/manage.js





background_js_namespaceObject["default"]?.inited && new vue_runtime_esm_js_namespaceObject["default"]({
    el: '#stg-manage',
    render: h => h(Manage),
});

})();

