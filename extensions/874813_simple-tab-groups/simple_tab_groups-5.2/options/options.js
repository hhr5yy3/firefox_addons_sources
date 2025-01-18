import * as __WEBPACK_EXTERNAL_MODULE__js_vue_runtime_esm_js_5b56ac01__ from "/js/vue.runtime.esm.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_json_js_f67ba1b8__ from "/js/json.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_background_js_e9185ef7__ from "/js/background.js";
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
import * as __WEBPACK_EXTERNAL_MODULE__js_hotkeys_js_a9053836__ from "/js/hotkeys.js";
import * as __WEBPACK_EXTERNAL_MODULE__js_mixins_default_group_mixin_js_b0c4f4fc__ from "/js/mixins/default-group.mixin.js";
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

;// CONCATENATED MODULE: external "/js/vue.runtime.esm.js"
var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
const vue_runtime_esm_js_namespaceObject = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_vue_runtime_esm_js_5b56ac01__["default"] });
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./options/Options.vue?vue&type=template&id=6b687228&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    { attrs: { id: "stg-options" } },
    [
      _c("div", { staticClass: "tabs is-boxed is-fullwidth" }, [
        _c("ul", [
          _c(
            "li",
            { class: { "is-active": _vm.section === _vm.SECTION_GENERAL } },
            [
              _c(
                "a",
                {
                  attrs: { tabindex: "0" },
                  on: {
                    click: function ($event) {
                      _vm.section = _vm.SECTION_GENERAL
                    },
                    keydown: function ($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      )
                        return null
                      _vm.section = _vm.SECTION_GENERAL
                    },
                  },
                },
                [
                  _vm._m(0),
                  _vm._v(" "),
                  _c("span", {
                    domProps: { textContent: _vm._s(_vm.lang("generalTitle")) },
                  }),
                ]
              ),
            ]
          ),
          _vm._v(" "),
          _c(
            "li",
            { class: { "is-active": _vm.section === _vm.SECTION_HOTKEYS } },
            [
              _c(
                "a",
                {
                  attrs: { tabindex: "0" },
                  on: {
                    click: function ($event) {
                      _vm.section = _vm.SECTION_HOTKEYS
                    },
                    keydown: function ($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      )
                        return null
                      _vm.section = _vm.SECTION_HOTKEYS
                    },
                  },
                },
                [
                  _vm._m(1),
                  _vm._v(" "),
                  _c("span", {
                    domProps: { textContent: _vm._s(_vm.lang("hotkeysTitle")) },
                  }),
                ]
              ),
            ]
          ),
          _vm._v(" "),
          _c(
            "li",
            { class: { "is-active": _vm.section === _vm.SECTION_BACKUP } },
            [
              _c(
                "a",
                {
                  attrs: { tabindex: "0" },
                  on: {
                    click: function ($event) {
                      _vm.section = _vm.SECTION_BACKUP
                    },
                    keydown: function ($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      )
                        return null
                      _vm.section = _vm.SECTION_BACKUP
                    },
                  },
                },
                [
                  _vm._m(2),
                  _vm._v(" "),
                  _c("span", {
                    domProps: {
                      textContent: _vm._s(_vm.lang("exportAddonSettingsTitle")),
                    },
                  }),
                ]
              ),
            ]
          ),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.section === _vm.SECTION_GENERAL,
              expression: "section === SECTION_GENERAL",
            },
          ],
        },
        [
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.permissions.bookmarks,
                    expression: "permissions.bookmarks",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.permissions.bookmarks)
                    ? _vm._i(_vm.permissions.bookmarks, null) > -1
                    : _vm.permissions.bookmarks,
                },
                on: {
                  click: _vm.setPermissionsBookmarks,
                  change: function ($event) {
                    var $$a = _vm.permissions.bookmarks,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.permissions,
                            "bookmarks",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.permissions,
                            "bookmarks",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.permissions, "bookmarks", $$c)
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: {
                  textContent: _vm._s(_vm.lang("allowAccessToBookmarks")),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field h-margin-left-10" }, [
            _c("label", {
              staticClass: "label",
              domProps: {
                textContent: _vm._s(_vm.lang("defaultBookmarkFolderLocation")),
              },
            }),
            _vm._v(" "),
            _c("div", { staticClass: "control has-icons-left" }, [
              _c("div", { staticClass: "select" }, [
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.options.defaultBookmarksParent,
                        expression: "options.defaultBookmarksParent",
                      },
                    ],
                    attrs: { disabled: !_vm.permissions.bookmarks },
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
                          _vm.options,
                          "defaultBookmarksParent",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      },
                    },
                  },
                  _vm._l(_vm.defaultBookmarksParents, function (bookmark) {
                    return _c("option", {
                      key: bookmark.id,
                      domProps: {
                        value: bookmark.id,
                        textContent: _vm._s(bookmark.title),
                      },
                    })
                  }),
                  0
                ),
              ]),
              _vm._v(" "),
              _vm._m(3),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.showContextMenuOnTabs,
                    expression: "options.showContextMenuOnTabs",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.options.showContextMenuOnTabs)
                    ? _vm._i(_vm.options.showContextMenuOnTabs, null) > -1
                    : _vm.options.showContextMenuOnTabs,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.showContextMenuOnTabs,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "showContextMenuOnTabs",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "showContextMenuOnTabs",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.options, "showContextMenuOnTabs", $$c)
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: {
                  textContent: _vm._s(_vm.lang("showContextMenuOnTabs")),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.showContextMenuOnLinks,
                    expression: "options.showContextMenuOnLinks",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.options.showContextMenuOnLinks)
                    ? _vm._i(_vm.options.showContextMenuOnLinks, null) > -1
                    : _vm.options.showContextMenuOnLinks,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.showContextMenuOnLinks,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "showContextMenuOnLinks",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "showContextMenuOnLinks",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.options, "showContextMenuOnLinks", $$c)
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: {
                  textContent: _vm._s(_vm.lang("showContextMenuOnLinks")),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.closePopupAfterChangeGroup,
                    expression: "options.closePopupAfterChangeGroup",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.options.closePopupAfterChangeGroup)
                    ? _vm._i(_vm.options.closePopupAfterChangeGroup, null) > -1
                    : _vm.options.closePopupAfterChangeGroup,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.closePopupAfterChangeGroup,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "closePopupAfterChangeGroup",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "closePopupAfterChangeGroup",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.options, "closePopupAfterChangeGroup", $$c)
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: {
                  textContent: _vm._s(_vm.lang("closePopupAfterChangeGroup")),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.closePopupAfterSelectTab,
                    expression: "options.closePopupAfterSelectTab",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.options.closePopupAfterSelectTab)
                    ? _vm._i(_vm.options.closePopupAfterSelectTab, null) > -1
                    : _vm.options.closePopupAfterSelectTab,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.closePopupAfterSelectTab,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "closePopupAfterSelectTab",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "closePopupAfterSelectTab",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.options, "closePopupAfterSelectTab", $$c)
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: {
                  textContent: _vm._s(_vm.lang("closePopupAfterSelectTab")),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.fullPopupWidth,
                    expression: "options.fullPopupWidth",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.options.fullPopupWidth)
                    ? _vm._i(_vm.options.fullPopupWidth, null) > -1
                    : _vm.options.fullPopupWidth,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.fullPopupWidth,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "fullPopupWidth",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "fullPopupWidth",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.options, "fullPopupWidth", $$c)
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: { textContent: _vm._s(_vm.lang("fullPopupWidth")) },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.openGroupAfterChange,
                    expression: "options.openGroupAfterChange",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.options.openGroupAfterChange)
                    ? _vm._i(_vm.options.openGroupAfterChange, null) > -1
                    : _vm.options.openGroupAfterChange,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.openGroupAfterChange,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "openGroupAfterChange",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "openGroupAfterChange",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.options, "openGroupAfterChange", $$c)
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: {
                  textContent: _vm._s(_vm.lang("openGroupAfterChange")),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.createNewGroupWhenOpenNewWindow,
                    expression: "options.createNewGroupWhenOpenNewWindow",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(
                    _vm.options.createNewGroupWhenOpenNewWindow
                  )
                    ? _vm._i(
                        _vm.options.createNewGroupWhenOpenNewWindow,
                        null
                      ) > -1
                    : _vm.options.createNewGroupWhenOpenNewWindow,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.createNewGroupWhenOpenNewWindow,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "createNewGroupWhenOpenNewWindow",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "createNewGroupWhenOpenNewWindow",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(
                        _vm.options,
                        "createNewGroupWhenOpenNewWindow",
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
                    _vm.lang("createNewGroupWhenOpenNewWindow")
                  ),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.showExtendGroupsPopupWithActiveTabs,
                    expression: "options.showExtendGroupsPopupWithActiveTabs",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(
                    _vm.options.showExtendGroupsPopupWithActiveTabs
                  )
                    ? _vm._i(
                        _vm.options.showExtendGroupsPopupWithActiveTabs,
                        null
                      ) > -1
                    : _vm.options.showExtendGroupsPopupWithActiveTabs,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.showExtendGroupsPopupWithActiveTabs,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "showExtendGroupsPopupWithActiveTabs",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "showExtendGroupsPopupWithActiveTabs",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(
                        _vm.options,
                        "showExtendGroupsPopupWithActiveTabs",
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
                    _vm.lang("showExtendGroupsPopupWithActiveTabs")
                  ),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.alwaysAskNewGroupName,
                    expression: "options.alwaysAskNewGroupName",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.options.alwaysAskNewGroupName)
                    ? _vm._i(_vm.options.alwaysAskNewGroupName, null) > -1
                    : _vm.options.alwaysAskNewGroupName,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.alwaysAskNewGroupName,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "alwaysAskNewGroupName",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "alwaysAskNewGroupName",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.options, "alwaysAskNewGroupName", $$c)
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: {
                  textContent: _vm._s(_vm.lang("alwaysAskNewGroupName")),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.openManageGroupsInTab,
                    expression: "options.openManageGroupsInTab",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.options.openManageGroupsInTab)
                    ? _vm._i(_vm.options.openManageGroupsInTab, null) > -1
                    : _vm.options.openManageGroupsInTab,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.openManageGroupsInTab,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "openManageGroupsInTab",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "openManageGroupsInTab",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(_vm.options, "openManageGroupsInTab", $$c)
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: {
                  textContent: _vm._s(_vm.lang("openManageGroupsInTab")),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.showConfirmDialogBeforeGroupDelete,
                    expression: "options.showConfirmDialogBeforeGroupDelete",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(
                    _vm.options.showConfirmDialogBeforeGroupDelete
                  )
                    ? _vm._i(
                        _vm.options.showConfirmDialogBeforeGroupDelete,
                        null
                      ) > -1
                    : _vm.options.showConfirmDialogBeforeGroupDelete,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.showConfirmDialogBeforeGroupDelete,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "showConfirmDialogBeforeGroupDelete",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "showConfirmDialogBeforeGroupDelete",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(
                        _vm.options,
                        "showConfirmDialogBeforeGroupDelete",
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
                    _vm.lang("showConfirmDialogBeforeGroupDelete")
                  ),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.showConfirmDialogBeforeGroupArchiving,
                    expression: "options.showConfirmDialogBeforeGroupArchiving",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(
                    _vm.options.showConfirmDialogBeforeGroupArchiving
                  )
                    ? _vm._i(
                        _vm.options.showConfirmDialogBeforeGroupArchiving,
                        null
                      ) > -1
                    : _vm.options.showConfirmDialogBeforeGroupArchiving,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.showConfirmDialogBeforeGroupArchiving,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "showConfirmDialogBeforeGroupArchiving",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "showConfirmDialogBeforeGroupArchiving",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(
                        _vm.options,
                        "showConfirmDialogBeforeGroupArchiving",
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
                    _vm.lang("showConfirmDialogBeforeGroupArchiving")
                  ),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.options.showNotificationAfterGroupDelete,
                    expression: "options.showNotificationAfterGroupDelete",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(
                    _vm.options.showNotificationAfterGroupDelete
                  )
                    ? _vm._i(
                        _vm.options.showNotificationAfterGroupDelete,
                        null
                      ) > -1
                    : _vm.options.showNotificationAfterGroupDelete,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.options.showNotificationAfterGroupDelete,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.options,
                            "showNotificationAfterGroupDelete",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.options,
                            "showNotificationAfterGroupDelete",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(
                        _vm.options,
                        "showNotificationAfterGroupDelete",
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
                    _vm.lang("showNotificationAfterGroupDelete")
                  ),
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
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
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c(
              "button",
              {
                staticClass: "button is-success",
                on: { click: _vm.openDefaultGroup },
              },
              [
                _vm._m(4),
                _vm._v(" "),
                _c("span", {
                  staticClass: "h-margin-left-5",
                  domProps: { textContent: _vm._s(_vm.lang("defaultGroup")) },
                }),
              ]
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", {
              staticClass: "label",
              domProps: {
                textContent: _vm._s(
                  _vm.lang("temporaryContainerTitleDescription")
                ),
              },
            }),
            _vm._v(" "),
            _c("div", { staticClass: "control" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model.lazy.trim",
                    value: _vm.options.temporaryContainerTitle,
                    expression: "options.temporaryContainerTitle",
                    modifiers: { lazy: true, trim: true },
                  },
                ],
                staticClass: "input tmp-container-input",
                attrs: {
                  type: "text",
                  placeholder: _vm.lang("temporaryContainerTitle"),
                },
                domProps: { value: _vm.options.temporaryContainerTitle },
                on: {
                  change: function ($event) {
                    _vm.$set(
                      _vm.options,
                      "temporaryContainerTitle",
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
              domProps: { textContent: _vm._s(_vm.lang("theme")) },
            }),
            _vm._v(" "),
            _c("div", { staticClass: "control" }, [
              _c("div", { staticClass: "select" }, [
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.options.theme,
                        expression: "options.theme",
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
                          _vm.options,
                          "theme",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      },
                    },
                  },
                  [
                    _c("option", {
                      attrs: { value: "auto" },
                      domProps: { textContent: _vm._s(_vm.lang("themeAuto")) },
                    }),
                    _vm._v(" "),
                    _c("option", {
                      attrs: { value: "light" },
                      domProps: { textContent: _vm._s(_vm.lang("themeLight")) },
                    }),
                    _vm._v(" "),
                    _c("option", {
                      attrs: { value: "dark" },
                      domProps: { textContent: _vm._s(_vm.lang("themeDark")) },
                    }),
                  ]
                ),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _vm.showEnableDarkThemeNotification
            ? _c("div", {
                staticClass: "field mb-6",
                domProps: {
                  innerHTML: _vm._s(_vm.lang("enableDarkThemeNotification")),
                },
              })
            : _vm._e(),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", {
              staticClass: "label",
              domProps: { textContent: _vm._s(_vm.lang("contextMenuEditor")) },
            }),
            _vm._v(" "),
            _c("div", { staticClass: "columns" }, [
              _c(
                "div",
                { staticClass: "column" },
                [
                  _c("label", {
                    staticClass: "label",
                    domProps: { textContent: _vm._s(_vm.lang("tab") + ":") },
                  }),
                  _vm._v(" "),
                  _vm._l(_vm.contextMenuTabTitles, function (item, id) {
                    return [
                      id === "hr"
                        ? _c("hr", { key: id })
                        : _c("div", { key: id, staticClass: "field" }, [
                            _c("label", { staticClass: "checkbox" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.options.contextMenuTab,
                                    expression: "options.contextMenuTab",
                                  },
                                ],
                                attrs: { type: "checkbox" },
                                domProps: {
                                  value: id,
                                  checked: Array.isArray(
                                    _vm.options.contextMenuTab
                                  )
                                    ? _vm._i(_vm.options.contextMenuTab, id) >
                                      -1
                                    : _vm.options.contextMenuTab,
                                },
                                on: {
                                  change: function ($event) {
                                    var $$a = _vm.options.contextMenuTab,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = id,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          _vm.$set(
                                            _vm.options,
                                            "contextMenuTab",
                                            $$a.concat([$$v])
                                          )
                                      } else {
                                        $$i > -1 &&
                                          _vm.$set(
                                            _vm.options,
                                            "contextMenuTab",
                                            $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1))
                                          )
                                      }
                                    } else {
                                      _vm.$set(
                                        _vm.options,
                                        "contextMenuTab",
                                        $$c
                                      )
                                    }
                                  },
                                },
                              }),
                              _vm._v(" "),
                              item.icon
                                ? _c("img", {
                                    staticClass: "size-16 mr-3",
                                    attrs: { src: `/icons/${item.icon}.svg` },
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              _c("span", {
                                domProps: {
                                  textContent: _vm._s(_vm.lang(item.title)),
                                },
                              }),
                            ]),
                          ]),
                    ]
                  }),
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "column" },
                [
                  _c("label", {
                    staticClass: "label",
                    domProps: { textContent: _vm._s(_vm.lang("group") + ":") },
                  }),
                  _vm._v(" "),
                  _vm._l(_vm.contextMenuGroupTitles, function (item, id) {
                    return [
                      id === "hr"
                        ? _c("hr", { key: id })
                        : _c("div", { key: id, staticClass: "field" }, [
                            _c("label", { staticClass: "checkbox" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.options.contextMenuGroup,
                                    expression: "options.contextMenuGroup",
                                  },
                                ],
                                attrs: { type: "checkbox" },
                                domProps: {
                                  value: id,
                                  checked: Array.isArray(
                                    _vm.options.contextMenuGroup
                                  )
                                    ? _vm._i(_vm.options.contextMenuGroup, id) >
                                      -1
                                    : _vm.options.contextMenuGroup,
                                },
                                on: {
                                  change: function ($event) {
                                    var $$a = _vm.options.contextMenuGroup,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = id,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          _vm.$set(
                                            _vm.options,
                                            "contextMenuGroup",
                                            $$a.concat([$$v])
                                          )
                                      } else {
                                        $$i > -1 &&
                                          _vm.$set(
                                            _vm.options,
                                            "contextMenuGroup",
                                            $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1))
                                          )
                                      }
                                    } else {
                                      _vm.$set(
                                        _vm.options,
                                        "contextMenuGroup",
                                        $$c
                                      )
                                    }
                                  },
                                },
                              }),
                              _vm._v(" "),
                              item.icon
                                ? _c("img", {
                                    staticClass: "size-16 mr-3",
                                    attrs: { src: `/icons/${item.icon}.svg` },
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              _c("span", {
                                domProps: {
                                  textContent: _vm._s(_vm.lang(item.title)),
                                },
                              }),
                            ]),
                          ]),
                    ]
                  }),
                ],
                2
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", { staticClass: "mt-5" }, [
            _c("button", {
              staticClass: "button is-warning",
              domProps: {
                textContent: _vm._s(_vm.lang("helpPageStgDebugTitle")),
              },
              on: { click: _vm.openDebugPage },
            }),
          ]),
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
              value: _vm.section === _vm.SECTION_HOTKEYS,
              expression: "section === SECTION_HOTKEYS",
            },
          ],
        },
        [
          _c("label", {
            staticClass: "has-text-weight-bold",
            domProps: { textContent: _vm._s(_vm.lang("hotkeysTitle")) },
          }),
          _vm._v(" "),
          _c("div", {
            staticClass: "h-margin-bottom-10",
            domProps: { innerHTML: _vm._s(_vm.lang("hotkeysDescription")) },
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "hotkeys" },
            _vm._l(_vm.options.hotkeys, function (hotkey, hotkeyIndex) {
              return _c("div", { key: hotkeyIndex, staticClass: "field" }, [
                _c(
                  "div",
                  {
                    staticClass: "is-flex is-align-items-center",
                    class: _vm.hasEqualHotkeys(hotkey) && "key-error",
                  },
                  [
                    _c("div", { staticClass: "control input-command" }, [
                      _c("input", {
                        staticClass: "input",
                        attrs: {
                          type: "text",
                          autocomplete: "off",
                          placeholder: _vm.lang("hotkeyPlaceholder"),
                          tabindex: "-1",
                        },
                        domProps: { value: hotkey.value },
                        on: {
                          keydown: function ($event) {
                            return _vm.saveHotkeyKeyCodeAndStopEvent(
                              hotkey,
                              $event
                            )
                          },
                          blur: _vm.onBlurHotkey,
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "select" }, [
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: hotkey.action,
                              expression: "hotkey.action",
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
                                hotkey,
                                "action",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                          },
                        },
                        [
                          !hotkey.action
                            ? _c("option", {
                                attrs: { disabled: "", value: "" },
                                domProps: {
                                  textContent: _vm._s(_vm.lang("selectAction")),
                                },
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(_vm.HOTKEY_ACTIONS, function (action) {
                            return _c("option", {
                              key: action,
                              domProps: {
                                value: action,
                                textContent: _vm._s(
                                  _vm.getHotkeyActionTitle(action)
                                ),
                              },
                            })
                          }),
                        ],
                        2
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "delete-button" }, [
                      _c(
                        "span",
                        {
                          staticClass: "cursor-pointer",
                          attrs: { title: _vm.lang("deleteHotKeyButton") },
                          on: {
                            click: function ($event) {
                              return _vm.options.hotkeys.splice(hotkeyIndex, 1)
                            },
                          },
                        },
                        [
                          _c("img", {
                            staticClass: "size-16",
                            attrs: { src: "/icons/delete.svg" },
                          }),
                        ]
                      ),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _vm.HOTKEY_ACTIONS_WITH_CUSTOM_GROUP.includes(hotkey.action)
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "is-flex is-align-items-center custom-group",
                      },
                      [
                        _c(
                          "div",
                          {
                            class: [
                              "control",
                              { "has-icons-left": hotkey.groupId },
                            ],
                          },
                          [
                            _c("div", { staticClass: "select" }, [
                              _c(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model.number",
                                      value: hotkey.groupId,
                                      expression: "hotkey.groupId",
                                      modifiers: { number: true },
                                    },
                                  ],
                                  on: {
                                    change: function ($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call(
                                          $event.target.options,
                                          function (o) {
                                            return o.selected
                                          }
                                        )
                                        .map(function (o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return _vm._n(val)
                                        })
                                      _vm.$set(
                                        hotkey,
                                        "groupId",
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
                                      value: 0,
                                      textContent: _vm._s(
                                        _vm.lang("selectGroup")
                                      ),
                                    },
                                  }),
                                  _vm._v(" "),
                                  hotkey.groupId &&
                                  !_vm.groupIds.includes(hotkey.groupId)
                                    ? _c("option", {
                                        attrs: { disabled: "" },
                                        domProps: {
                                          value: hotkey.groupId,
                                          textContent: _vm._s(
                                            _vm.lang("unknownGroup")
                                          ),
                                        },
                                      })
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm._l(_vm.groups, function (group) {
                                    return _c("option", {
                                      key: group.id,
                                      domProps: {
                                        value: group.id,
                                        textContent: _vm._s(
                                          _vm.getGroupTitle(group)
                                        ),
                                      },
                                    })
                                  }),
                                ],
                                2
                              ),
                            ]),
                            _vm._v(" "),
                            hotkey.groupId
                              ? _c("span", { staticClass: "icon is-left" }, [
                                  _c("img", {
                                    staticClass: "size-16",
                                    attrs: {
                                      src: _vm.getGroupIconUrl(hotkey.groupId),
                                    },
                                  }),
                                ])
                              : _vm._e(),
                          ]
                        ),
                      ]
                    )
                  : _vm._e(),
              ])
            }),
            0
          ),
          _vm._v(" "),
          _c("div", { staticClass: "control h-margin-top-10" }, [
            _c(
              "button",
              {
                staticClass: "button",
                on: {
                  click: function ($event) {
                    _vm.options.hotkeys.push(_vm.createHotkey())
                  },
                },
              },
              [
                _vm._m(5),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(_vm.lang("addHotKeyButton")),
                  },
                }),
              ]
            ),
          ]),
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
              value: _vm.section === _vm.SECTION_BACKUP,
              expression: "section === SECTION_BACKUP",
            },
          ],
        },
        [
          _c("div", { staticClass: "field" }, [
            _c("div", {
              staticClass: "has-text-weight-bold h-margin-bottom-5",
              domProps: {
                textContent: _vm._s(_vm.lang("exportAddonSettingsTitle")),
              },
            }),
            _vm._v(" "),
            _c("div", {
              staticClass: "h-margin-bottom-5",
              domProps: {
                innerHTML: _vm._s(_vm.lang("exportAddonSettingsDescription")),
              },
            }),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c(
                "label",
                {
                  staticClass: "checkbox",
                  attrs: {
                    disabled: !_vm.options.showTabsWithThumbnailsInManageGroups,
                  },
                },
                [
                  _vm.options.showTabsWithThumbnailsInManageGroups
                    ? _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.includeTabThumbnailsIntoBackup,
                            expression: "includeTabThumbnailsIntoBackup",
                          },
                        ],
                        attrs: { type: "checkbox" },
                        domProps: {
                          checked: Array.isArray(
                            _vm.includeTabThumbnailsIntoBackup
                          )
                            ? _vm._i(_vm.includeTabThumbnailsIntoBackup, null) >
                              -1
                            : _vm.includeTabThumbnailsIntoBackup,
                        },
                        on: {
                          change: function ($event) {
                            var $$a = _vm.includeTabThumbnailsIntoBackup,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 &&
                                  (_vm.includeTabThumbnailsIntoBackup =
                                    $$a.concat([$$v]))
                              } else {
                                $$i > -1 &&
                                  (_vm.includeTabThumbnailsIntoBackup = $$a
                                    .slice(0, $$i)
                                    .concat($$a.slice($$i + 1)))
                              }
                            } else {
                              _vm.includeTabThumbnailsIntoBackup = $$c
                            }
                          },
                        },
                      })
                    : _c("input", {
                        attrs: { disabled: "", type: "checkbox" },
                      }),
                  _vm._v(" "),
                  _c("span", {
                    domProps: {
                      textContent: _vm._s(
                        _vm.lang("includeTabThumbnailsIntoBackup")
                      ),
                    },
                  }),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.includeTabFavIconsIntoBackup,
                      expression: "includeTabFavIconsIntoBackup",
                    },
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.includeTabFavIconsIntoBackup)
                      ? _vm._i(_vm.includeTabFavIconsIntoBackup, null) > -1
                      : _vm.includeTabFavIconsIntoBackup,
                  },
                  on: {
                    change: function ($event) {
                      var $$a = _vm.includeTabFavIconsIntoBackup,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            (_vm.includeTabFavIconsIntoBackup = $$a.concat([
                              $$v,
                            ]))
                        } else {
                          $$i > -1 &&
                            (_vm.includeTabFavIconsIntoBackup = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)))
                        }
                      } else {
                        _vm.includeTabFavIconsIntoBackup = $$c
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(
                      _vm.lang("includeTabFavIconsIntoBackup")
                    ),
                  },
                }),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "control" }, [
                _c(
                  "button",
                  {
                    staticClass: "button is-info",
                    on: { click: _vm.exportAddonSettings },
                  },
                  [
                    _vm._m(6),
                    _vm._v(" "),
                    _c("span", {
                      staticClass: "h-margin-left-5",
                      domProps: {
                        textContent: _vm._s(
                          _vm.lang("exportAddonSettingsButton")
                        ),
                      },
                    }),
                  ]
                ),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", { staticClass: "field" }, [
              _c("label", { staticClass: "checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.options.autoBackupEnable,
                      expression: "options.autoBackupEnable",
                    },
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.options.autoBackupEnable)
                      ? _vm._i(_vm.options.autoBackupEnable, null) > -1
                      : _vm.options.autoBackupEnable,
                  },
                  on: {
                    change: function ($event) {
                      var $$a = _vm.options.autoBackupEnable,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            _vm.$set(
                              _vm.options,
                              "autoBackupEnable",
                              $$a.concat([$$v])
                            )
                        } else {
                          $$i > -1 &&
                            _vm.$set(
                              _vm.options,
                              "autoBackupEnable",
                              $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                            )
                        }
                      } else {
                        _vm.$set(_vm.options, "autoBackupEnable", $$c)
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(_vm.lang("autoBackupEnableTitle")),
                  },
                }),
              ]),
            ]),
            _vm._v(" "),
            _vm.options.autoBackupEnable
              ? _c("div", { staticClass: "field" }, [
                  _c("div", { staticClass: "field" }, [
                    _c(
                      "label",
                      {
                        staticClass: "checkbox",
                        attrs: {
                          disabled:
                            !_vm.options.showTabsWithThumbnailsInManageGroups,
                        },
                      },
                      [
                        _vm.options.showTabsWithThumbnailsInManageGroups
                          ? _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value:
                                    _vm.options.autoBackupIncludeTabThumbnails,
                                  expression:
                                    "options.autoBackupIncludeTabThumbnails",
                                },
                              ],
                              attrs: { type: "checkbox" },
                              domProps: {
                                checked: Array.isArray(
                                  _vm.options.autoBackupIncludeTabThumbnails
                                )
                                  ? _vm._i(
                                      _vm.options
                                        .autoBackupIncludeTabThumbnails,
                                      null
                                    ) > -1
                                  : _vm.options.autoBackupIncludeTabThumbnails,
                              },
                              on: {
                                change: function ($event) {
                                  var $$a =
                                      _vm.options
                                        .autoBackupIncludeTabThumbnails,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = null,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.options,
                                          "autoBackupIncludeTabThumbnails",
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.options,
                                          "autoBackupIncludeTabThumbnails",
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(
                                      _vm.options,
                                      "autoBackupIncludeTabThumbnails",
                                      $$c
                                    )
                                  }
                                },
                              },
                            })
                          : _c("input", {
                              attrs: { disabled: "", type: "checkbox" },
                            }),
                        _vm._v(" "),
                        _c("span", {
                          domProps: {
                            textContent: _vm._s(
                              _vm.lang("includeTabThumbnailsIntoBackup")
                            ),
                          },
                        }),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c("label", { staticClass: "checkbox" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.options.autoBackupIncludeTabFavIcons,
                            expression: "options.autoBackupIncludeTabFavIcons",
                          },
                        ],
                        attrs: { type: "checkbox" },
                        domProps: {
                          checked: Array.isArray(
                            _vm.options.autoBackupIncludeTabFavIcons
                          )
                            ? _vm._i(
                                _vm.options.autoBackupIncludeTabFavIcons,
                                null
                              ) > -1
                            : _vm.options.autoBackupIncludeTabFavIcons,
                        },
                        on: {
                          change: function ($event) {
                            var $$a = _vm.options.autoBackupIncludeTabFavIcons,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 &&
                                  _vm.$set(
                                    _vm.options,
                                    "autoBackupIncludeTabFavIcons",
                                    $$a.concat([$$v])
                                  )
                              } else {
                                $$i > -1 &&
                                  _vm.$set(
                                    _vm.options,
                                    "autoBackupIncludeTabFavIcons",
                                    $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                  )
                              }
                            } else {
                              _vm.$set(
                                _vm.options,
                                "autoBackupIncludeTabFavIcons",
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
                            _vm.lang("includeTabFavIconsIntoBackup")
                          ),
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c("label", { staticClass: "checkbox" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.options.autoBackupByDayIndex,
                            expression: "options.autoBackupByDayIndex",
                          },
                        ],
                        attrs: { type: "checkbox" },
                        domProps: {
                          checked: Array.isArray(
                            _vm.options.autoBackupByDayIndex
                          )
                            ? _vm._i(_vm.options.autoBackupByDayIndex, null) >
                              -1
                            : _vm.options.autoBackupByDayIndex,
                        },
                        on: {
                          change: function ($event) {
                            var $$a = _vm.options.autoBackupByDayIndex,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 &&
                                  _vm.$set(
                                    _vm.options,
                                    "autoBackupByDayIndex",
                                    $$a.concat([$$v])
                                  )
                              } else {
                                $$i > -1 &&
                                  _vm.$set(
                                    _vm.options,
                                    "autoBackupByDayIndex",
                                    $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                  )
                              }
                            } else {
                              _vm.$set(_vm.options, "autoBackupByDayIndex", $$c)
                            }
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("span", {
                        domProps: {
                          textContent: _vm._s(
                            _vm.lang("autoBackupByDayIndexTitle")
                          ),
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("p", {
                      staticClass: "help is-medium",
                      domProps: {
                        textContent: _vm._s(
                          _vm.lang("autoBackupByDayIndexDescription")
                        ),
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "field is-flex is-align-items-center indent-children",
                    },
                    [
                      _c("div", {
                        staticClass: "h-margin-right-5",
                        domProps: {
                          innerHTML: _vm._s(
                            _vm.lang("autoBackupCreateEveryTitle")
                          ),
                        },
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "field has-addons" }, [
                        _c("div", { staticClass: "control" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model.number",
                                value: _vm.options.autoBackupIntervalValue,
                                expression: "options.autoBackupIntervalValue",
                                modifiers: { number: true },
                              },
                            ],
                            staticClass: "input backup-time-input",
                            attrs: { type: "number", min: "1", max: "20" },
                            domProps: {
                              value: _vm.options.autoBackupIntervalValue,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) return
                                _vm.$set(
                                  _vm.options,
                                  "autoBackupIntervalValue",
                                  _vm._n($event.target.value)
                                )
                              },
                              blur: function ($event) {
                                return _vm.$forceUpdate()
                              },
                            },
                          }),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "control" }, [
                          _c("div", { staticClass: "select" }, [
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.options.autoBackupIntervalKey,
                                    expression: "options.autoBackupIntervalKey",
                                  },
                                ],
                                on: {
                                  change: function ($event) {
                                    var $$selectedVal = Array.prototype.filter
                                      .call(
                                        $event.target.options,
                                        function (o) {
                                          return o.selected
                                        }
                                      )
                                      .map(function (o) {
                                        var val =
                                          "_value" in o ? o._value : o.value
                                        return val
                                      })
                                    _vm.$set(
                                      _vm.options,
                                      "autoBackupIntervalKey",
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
                                    value: _vm.AUTO_BACKUP_INTERVAL_KEY.minutes,
                                    textContent: _vm._s(
                                      _vm.lang("autoBackupIntervalKeyMinutes")
                                    ),
                                  },
                                }),
                                _vm._v(" "),
                                _c("option", {
                                  domProps: {
                                    value: _vm.AUTO_BACKUP_INTERVAL_KEY.hours,
                                    textContent: _vm._s(
                                      _vm.lang("autoBackupIntervalKeyHours")
                                    ),
                                  },
                                }),
                                _vm._v(" "),
                                _c("option", {
                                  domProps: {
                                    value: _vm.AUTO_BACKUP_INTERVAL_KEY.days,
                                    textContent: _vm._s(
                                      _vm.lang("autoBackupIntervalKeyDays")
                                    ),
                                  },
                                }),
                              ]
                            ),
                          ]),
                        ]),
                      ]),
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c("span", {
                      domProps: {
                        textContent: _vm._s(
                          _vm.lang("autoBackupLastBackupTitle")
                        ),
                      },
                    }),
                    _vm._v(" "),
                    _vm.options.autoBackupLastBackupTimeStamp > 1
                      ? _c("span", {
                          domProps: {
                            textContent: _vm._s(
                              new Date(
                                _vm.options.autoBackupLastBackupTimeStamp * 1000
                              ).toLocaleString()
                            ),
                          },
                        })
                      : _c("span", [_vm._v("—")]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c(
                      "div",
                      { staticClass: "field is-grouped is-align-items-center" },
                      [
                        _c("div", { staticClass: "control" }, [
                          _c("label", {
                            staticClass: "field",
                            domProps: {
                              textContent: _vm._s(
                                _vm.lang("folderNameTitle") + ":"
                              ),
                            },
                          }),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "control" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model.trim",
                                value: _vm.options.autoBackupFolderName,
                                expression: "options.autoBackupFolderName",
                                modifiers: { trim: true },
                              },
                            ],
                            staticClass: "input",
                            attrs: { type: "text", maxlength: "200" },
                            domProps: {
                              value: _vm.options.autoBackupFolderName,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) return
                                _vm.$set(
                                  _vm.options,
                                  "autoBackupFolderName",
                                  $event.target.value.trim()
                                )
                              },
                              blur: function ($event) {
                                return _vm.$forceUpdate()
                              },
                            },
                          }),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "control" }, [
                          _c("button", {
                            staticClass: "button",
                            domProps: {
                              textContent: _vm._s(_vm.lang("openBackupFolder")),
                            },
                            on: { click: _vm.openBackupFolder },
                          }),
                        ]),
                      ]
                    ),
                  ]),
                ])
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", {
              staticClass: "has-text-weight-bold h-margin-bottom-5",
              domProps: {
                textContent: _vm._s(_vm.lang("importAddonSettingsTitle")),
              },
            }),
            _vm._v(" "),
            _c("div", {
              staticClass: "h-margin-bottom-5",
              domProps: {
                innerHTML: _vm._s(_vm.lang("importAddonSettingsDescription")),
              },
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "field is-grouped is-align-items-center" },
              [
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-info",
                      on: { click: _vm.importAddonSettings },
                    },
                    [
                      _vm._m(7),
                      _vm._v(" "),
                      _c("span", {
                        staticClass: "h-margin-left-5",
                        domProps: {
                          textContent: _vm._s(
                            _vm.lang("importAddonSettingsButton")
                          ),
                        },
                      }),
                    ]
                  ),
                ]),
              ]
            ),
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", {
            staticClass: "has-text-weight-bold h-margin-bottom-5",
            domProps: {
              textContent: _vm._s(
                _vm.lang("importSettingsOldTabGroupsAddonTitle")
              ),
            },
          }),
          _vm._v(" "),
          _c("div", {
            staticClass: "h-margin-bottom-5",
            domProps: {
              innerHTML: _vm._s(
                _vm.lang("importSettingsOldTabGroupsAddonDescription")
              ),
            },
          }),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", { staticClass: "control" }, [
              _c(
                "button",
                {
                  staticClass: "button",
                  on: { click: _vm.importSettingsOldTabGroupsAddonButton },
                },
                [
                  _vm._m(8),
                  _vm._v(" "),
                  _c("span", {
                    staticClass: "h-margin-left-5",
                    domProps: {
                      textContent: _vm._s(_vm.lang("browseFileTitle")),
                    },
                  }),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", {
            staticClass: "has-text-weight-bold h-margin-bottom-5",
            domProps: {
              textContent: _vm._s(
                _vm.lang("importSettingsPanoramaViewAddonTitle")
              ),
            },
          }),
          _vm._v(" "),
          _c("div", {
            staticClass: "h-margin-bottom-5",
            domProps: {
              innerHTML: _vm._s(
                _vm.lang("importSettingsPanoramaViewAddonDescription")
              ),
            },
          }),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", { staticClass: "control" }, [
              _c(
                "button",
                {
                  staticClass: "button",
                  on: { click: _vm.importSettingsPanoramaViewAddonButton },
                },
                [
                  _vm._m(9),
                  _vm._v(" "),
                  _c("span", {
                    staticClass: "h-margin-left-5",
                    domProps: {
                      textContent: _vm._s(_vm.lang("browseFileTitle")),
                    },
                  }),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", {
            staticClass: "has-text-weight-bold h-margin-bottom-5",
            domProps: {
              textContent: _vm._s(
                _vm.lang("importSettingsSyncTabGroupsAddonTitle")
              ),
            },
          }),
          _vm._v(" "),
          _c("div", {
            staticClass: "h-margin-bottom-5",
            domProps: {
              innerHTML: _vm._s(
                _vm.lang("importSettingsSyncTabGroupsAddonDescription")
              ),
            },
          }),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", { staticClass: "control" }, [
              _c(
                "button",
                {
                  staticClass: "button",
                  on: { click: _vm.importSettingsSyncTabGroupsAddonButton },
                },
                [
                  _vm._m(10),
                  _vm._v(" "),
                  _c("span", {
                    staticClass: "h-margin-left-5",
                    domProps: {
                      textContent: _vm._s(_vm.lang("browseFileTitle")),
                    },
                  }),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("div", {
              staticClass: "has-text-weight-bold h-margin-bottom-5",
              domProps: {
                textContent: _vm._s(_vm.lang("deleteAllAddonDataAndSettings")),
              },
            }),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass:
                  "has-text-danger has-text-weight-bold h-margin-bottom-5",
              },
              [
                _c("span", {
                  domProps: { textContent: _vm._s(_vm.lang("warning")) },
                }),
                _vm._v(" "),
                _c("span", {
                  domProps: {
                    innerHTML: _vm._s(
                      _vm.lang("eraseAddonSettingsWarningTitle")
                    ),
                  },
                }),
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "field is-grouped is-align-items-center" },
              [
                _c("div", { staticClass: "control" }, [
                  _c(
                    "button",
                    {
                      staticClass: "button is-danger",
                      on: {
                        click: function ($event) {
                          _vm.showClearAddonConfirmPopup = true
                        },
                      },
                    },
                    [
                      _vm._m(11),
                      _vm._v(" "),
                      _c("span", {
                        staticClass: "h-margin-left-5",
                        domProps: { textContent: _vm._s(_vm.lang("clear")) },
                      }),
                    ]
                  ),
                ]),
              ]
            ),
          ]),
        ]
      ),
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
      _vm.showLoadingMessage
        ? _c(
            "popup",
            {
              attrs: {
                buttons: [
                  {
                    event: "null",
                    lang: "ok",
                    classList: "is-success",
                  },
                ],
              },
            },
            [
              _c("span", {
                domProps: { textContent: _vm._s(_vm.lang("loading")) },
              }),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showClearAddonConfirmPopup
        ? _c(
            "popup",
            {
              attrs: {
                title: _vm.lang("deleteAllAddonDataAndSettings"),
                buttons: [
                  {
                    event: "clear",
                    lang: "ok",
                    classList: "is-danger",
                  },
                  {
                    event: "close-popup",
                    lang: "cancel",
                    focused: true,
                  },
                ],
              },
              on: {
                clear: _vm.runClearAddonConfirm,
                "close-popup": function ($event) {
                  _vm.showClearAddonConfirmPopup = false
                },
              },
            },
            [
              _c("span", {
                domProps: {
                  textContent: _vm._s(_vm.lang("warningAllDataWillRemove")),
                },
              }),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.manageAddonSettings
        ? _c(
            "popup",
            {
              ref: "mng",
              attrs: {
                title: _vm.lang(_vm.manageAddonSettingsTitle),
                buttons: [
                  {
                    event: "save",
                    lang: "eraseAndImportAddonBackupButton",
                    classList: "is-danger",
                    disabled: false,
                  },
                  {
                    event: "close-popup",
                    lang: "cancel",
                  },
                ],
              },
              on: {
                "close-popup": function ($event) {
                  _vm.manageAddonSettings = null
                },
                save: () => {
                  _vm.$refs.mng.buttonsClone = [{ lang: "ok" }]
                  _vm.saveManagedAddonSettings(
                    _vm.$refs.manageAddonBackup.getData(),
                    _vm.$refs.manageAddonBackup.clearAddonData
                  )
                },
              },
            },
            [
              _c("manage-addon-backup", {
                ref: "manageAddonBackup",
                attrs: {
                  data: _vm.manageAddonSettings,
                  "disable-empty-groups":
                    _vm.manageAddonSettingsDisableEmptyGroups,
                  "allow-clear-addon-data":
                    _vm.manageAddonSettingsAllowClearAddonDataBeforeRestore,
                },
                on: {
                  "enable-get-data": (value) =>
                    (_vm.$refs.mng.buttonsClone[0].disabled = !value),
                  "clear-addon-data-update": (value) =>
                    Object.assign(
                      _vm.$refs.mng.buttonsClone[0],
                      value
                        ? {
                            lang: "eraseAndImportAddonBackupButton",
                            classList: "is-danger",
                          }
                        : {
                            lang: "importAddonSettingsButton",
                            classList: "is-primary",
                          }
                    ),
                },
              }),
            ],
            1
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
      _c("img", { staticClass: "size-16", attrs: { src: "/icons/cog.svg" } }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "size-16",
        attrs: { src: "/icons/keyboard-o.svg" },
      }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "size-16",
        attrs: { src: "/icons/cloud-upload.svg" },
      }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("div", { staticClass: "icon is-left" }, [
      _c("img", {
        staticClass: "size-16",
        attrs: { src: "/icons/bookmark.svg" },
      }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", { staticClass: "size-16", attrs: { src: "/icons/icon.svg" } }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", { staticClass: "size-16", attrs: { src: "/icons/new.svg" } }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "size-16",
        attrs: { src: "/icons/download.svg" },
      }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", { staticClass: "size-16", attrs: { src: "/icons/icon.svg" } }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "size-16",
        attrs: { src: "/icons/old-tab-groups.svg" },
      }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "size-16",
        attrs: {
          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAADsOAAA7DgHMtqGDAAACL0lEQVR42m2Ty05UYRCEv+rzz03GQZORnTExuPMdeAv2JibudYO6x507fQjfgkdwYaJi8BajzAzCYQ6eOZf/bxcDgmJtuyuV6qoO6fn9R8AW+JhLEIhdYAMDEjtU8Q6zEr4Vs2JaPwvAFv4/MiAH1MMU2D+BoumxX8JxRXHk49ncH4c/yn4uCkACqhaKxmki7P6EJKdOFD8S02+JctQdB3TGcGgdyhbyCg4WcFxDTCBHJtyhmDqTt5HYEYejAYHjGubNkpTXUDRQR3CHTNA1yKBNMJ86Pz9GYg1NN+OQAYHXE1gkaNK5BRNIYIBhysSXTy3pBPMgNIR5v88idAgkdgn0MPNLRzQMsz1MVYuwvu/pmkjRUp6tiL5VgUwbSIG/+QYgkxNUPn31dfpgdUS9fmVT8h5J1NbBOrTh79iEMqsmbw4naw+v8+5Fc0OxGdy7u3arFlClVBN4yxotGYYTSL5D9B4Jx7CY0t7q+rXN9y8bsuivWOi2t57OavGLQIvw4PIBVSCmOzQOCcqTRH4CC/eeJYeS2577TcqlvYiYcoUWoYGDRJBDu3Dyz5H8yIkjSxou4/DWE6XjhSMgp88RffysdUMIx4dO/iFS/kgw1GkRdSmQBmOfERGdTx3C5HskFX76Nxcm/+CAFeb0ljs66wsEOprpqsYY0BMKaBkiKCAfwIIuU66eCxjYCqjLLNDVtlbtiQ98rEzQp6KjFoCBVyhjNhzR0CG7+OVdZuqy/RuUhxWxRglzCQAAAABJRU5ErkJggg==",
        },
      }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", {
        staticClass: "size-16",
        attrs: {
          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4ElEQVR42m1Tu09TcRQ+bVx0dyFYZGiqCelQaAwNVtMApe/29t375LYNCqSFxISBRBdD1MV/wsHBaDQScTYmYkV0MDGBQRExGAddhF65v+M55eXgTb6c331833deFxJ3zlxLP4YfuWeA0iIIjkfnp2CnlwCLd8/fBLrSUvJ2sVgUhD1Jkn7mcrkIMFl/A2gQOnHl+Ky9Btt878D4A+eaVI32qBVt26yOo6Zptq7rGI1GP0Nu6YC0ckw+jFoLRHXViYlF2EpMXvLrcvWPMa6joiiCRDCZTCJwqv/NoNURsM1VB6aewKY0ddGnlo1dTVdRlmWbRDAej9uQpTrZST9w1I/JQl0mgRYJPGKBkE8uaTuqpmC5XLYJIhaL7UH+uYMJlvpqHxpjeT8qL6BtvnRayYdcQsCvFg2rLJetQqHQLpVKFgkgRO7DhrIKOLHmwNpHQPMDYJVgvqP4lkAZxe7Bujld6spm8tuKqnATMZvN4vDwcAsat1RX8vq5+lkJZjwlaPjqp+a9+omFAYp9irM52DjdlG9c6OYxqqra6/f7m263u0ljvDo7O3sS5hpzrmxcrrtdfU2/d6ip5mu9/LEsyd3BwXCzz9PfHBq4PN/v718IBALzXq+34fF4Zo4E0pnURrU+jtONKbwyOYHlSmHbNM2uVCaxbpg66oaGFaVMna8gLRA3sINUKoWhUKgFPI5arWYZhtEmWFSfRep+mvEWpWwRqU1Ns/L5vEWbx++sdDrdieFwGIFHQo6CyDaBZ7xDJF8ikdhkcTrbRBaETuMymYwg9w6oiXtA4xAkgLSaNne3UqnssgAtySadkYj2IZlckdx5AwVvIQnYwHURUfB6krsgUqcEmvFXrpWIgu4FOR+RKTveQjEyMkKrLEm/+ccgAZtqRqrzFz3riUQiXyg7FrDZ+R8BJAGbRYLB4HfgX5LcPrHy2NgY1zbRGaMs65Qi8rPR0VEGMjhtgiDyNzJ0/QXvYtJ0HU94ewAAAABJRU5ErkJggg==",
        },
      }),
    ])
  },
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("span", { staticClass: "icon" }, [
      _c("img", { staticClass: "size-16", attrs: { src: "/icons/close.svg" } }),
    ])
  },
]
render._withStripped = true


;// CONCATENATED MODULE: ./options/Options.vue?vue&type=template&id=6b687228&

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
;// CONCATENATED MODULE: external "/js/background.js"
var background_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var background_js_y = x => () => x
const background_js_namespaceObject = background_js_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_background_js_e9185ef7__["default"] });
;// CONCATENATED MODULE: external "/js/constants.js"
var constants_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var constants_js_y = x => () => x
const constants_js_namespaceObject = constants_js_x({ ["ALL_OPTIONS_KEYS"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.ALL_OPTIONS_KEYS, ["AUTO_BACKUP_INTERVAL_KEY"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.AUTO_BACKUP_INTERVAL_KEY, ["DEFAULT_BOOKMARKS_PARENTS"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.DEFAULT_BOOKMARKS_PARENTS, ["DEFAULT_COOKIE_STORE_ID"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.DEFAULT_COOKIE_STORE_ID, ["DEFAULT_GROUP_ICON_VIEW_TYPE"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.DEFAULT_GROUP_ICON_VIEW_TYPE, ["GROUP_ICON_VIEW_TYPES"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.GROUP_ICON_VIEW_TYPES, ["HOTKEY_ACTIONS"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.HOTKEY_ACTIONS, ["HOTKEY_ACTIONS_WITH_CUSTOM_GROUP"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.HOTKEY_ACTIONS_WITH_CUSTOM_GROUP, ["ONLY_BOOL_OPTION_KEYS"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.ONLY_BOOL_OPTION_KEYS, ["PERMISSIONS"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.PERMISSIONS, ["TEMPORARY_CONTAINER"]: () => __WEBPACK_EXTERNAL_MODULE__js_constants_js_22ca4b1f__.TEMPORARY_CONTAINER });
;// CONCATENATED MODULE: external "/js/containers.js"
var containers_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var containers_js_y = x => () => x
const containers_js_namespaceObject = containers_js_x({ ["getAll"]: () => __WEBPACK_EXTERNAL_MODULE__js_containers_js_58464038__.getAll, ["load"]: () => __WEBPACK_EXTERNAL_MODULE__js_containers_js_58464038__.load, ["setTemporaryContainerTitle"]: () => __WEBPACK_EXTERNAL_MODULE__js_containers_js_58464038__.setTemporaryContainerTitle });
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
const file_js_namespaceObject = file_js_x({ ["getAutoBackupFolderName"]: () => __WEBPACK_EXTERNAL_MODULE__js_file_js_98ff2f38__.getAutoBackupFolderName, ["load"]: () => __WEBPACK_EXTERNAL_MODULE__js_file_js_98ff2f38__.load, ["openBackupFolder"]: () => __WEBPACK_EXTERNAL_MODULE__js_file_js_98ff2f38__.openBackupFolder });
;// CONCATENATED MODULE: external "/js/tabs.js"
var tabs_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var tabs_js_y = x => () => x
const tabs_js_namespaceObject = tabs_js_x({  });
;// CONCATENATED MODULE: external "/js/groups.js"
var groups_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var groups_js_y = x => () => x
const groups_js_namespaceObject = groups_js_x({ ["createTitle"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.createTitle, ["getIconUrl"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.getIconUrl, ["getTitle"]: () => __WEBPACK_EXTERNAL_MODULE__js_groups_js_36708201__.getTitle });
;// CONCATENATED MODULE: external "/js/utils.js"
var utils_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var utils_js_y = x => () => x
const utils_js_namespaceObject = utils_js_x({ ["DATE_LOCALE_VARIABLES"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.DATE_LOCALE_VARIABLES, ["assignKeys"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.assignKeys, ["capitalize"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.capitalize, ["getThemeApply"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.getThemeApply, ["isEqualPrimitiveArrays"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.isEqualPrimitiveArrays, ["isUrlAllowToCreate"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.isUrlAllowToCreate, ["normalizeGroupIcon"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.normalizeGroupIcon, ["normalizeTabUrl"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.normalizeTabUrl, ["normalizeUrl"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.normalizeUrl, ["notify"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.notify, ["randomColor"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.randomColor, ["toCamelCase"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.toCamelCase, ["type"]: () => __WEBPACK_EXTERNAL_MODULE__js_utils_js_7715c8ee__.type });
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
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./options/manage-addon-backup.vue?vue&type=template&id=669362e6&
var manage_addon_backupvue_type_template_id_669362e6_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c("div", { attrs: { id: "manageAddonBackup" } }, [
    _vm.allowClearAddonData
      ? _c("div", { staticClass: "field" }, [
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.clearAddonData,
                    expression: "clearAddonData",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.clearAddonData)
                    ? _vm._i(_vm.clearAddonData, null) > -1
                    : _vm.clearAddonData,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.clearAddonData,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.clearAddonData = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.clearAddonData = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.clearAddonData = $$c
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                staticClass: "has-text-weight-bold",
                domProps: {
                  textContent: _vm._s(
                    _vm.lang(
                      "deleteAllAddonDataAndSettingsBeforeRestoringBackup"
                    )
                  ),
                },
              }),
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("span", {
              staticClass: "has-text-danger has-text-weight-bold",
              domProps: {
                innerHTML: _vm._s(_vm.lang("eraseAddonSettingsWarningTitle")),
              },
            }),
          ]),
          _vm._v(" "),
          _c("hr"),
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.showPinnedTabs
      ? _c("div", { staticClass: "field" }, [
          _c("div", { staticClass: "field" }, [
            _c("label", { staticClass: "checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.includePinnedTabs,
                    expression: "includePinnedTabs",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.includePinnedTabs)
                    ? _vm._i(_vm.includePinnedTabs, null) > -1
                    : _vm.includePinnedTabs,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.includePinnedTabs,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.includePinnedTabs = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.includePinnedTabs = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.includePinnedTabs = $$c
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: { textContent: _vm._s(_vm.lang("pinnedTabs")) },
              }),
              _vm._v("\n                 \n                "),
              _c("small", { staticClass: "is-italic" }, [
                _vm._v("\n                    ("),
                _c("span", {
                  domProps: {
                    textContent: _vm._s(
                      _vm.lang("groupTabsCount", _vm.data.pinnedTabs.length)
                    ),
                  },
                }),
                _vm._v(")\n                "),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("hr"),
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.showGeneral || _vm.showHotkeys
      ? _c("div", { staticClass: "field" }, [
          _c("label", {
            staticClass: "label",
            domProps: { textContent: _vm._s(_vm.lang("importAddonSettings")) },
          }),
          _vm._v(" "),
          _vm.showGeneral
            ? _c("div", { staticClass: "field" }, [
                _c("label", { staticClass: "checkbox" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.includeGeneral,
                        expression: "includeGeneral",
                      },
                    ],
                    attrs: { type: "checkbox" },
                    domProps: {
                      checked: Array.isArray(_vm.includeGeneral)
                        ? _vm._i(_vm.includeGeneral, null) > -1
                        : _vm.includeGeneral,
                    },
                    on: {
                      change: function ($event) {
                        var $$a = _vm.includeGeneral,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 && (_vm.includeGeneral = $$a.concat([$$v]))
                          } else {
                            $$i > -1 &&
                              (_vm.includeGeneral = $$a
                                .slice(0, $$i)
                                .concat($$a.slice($$i + 1)))
                          }
                        } else {
                          _vm.includeGeneral = $$c
                        }
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("span", {
                    domProps: { textContent: _vm._s(_vm.lang("generalTitle")) },
                  }),
                ]),
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.showHotkeys
            ? _c("div", { staticClass: "field" }, [
                _c("label", { staticClass: "checkbox" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.includeHotkeys,
                        expression: "includeHotkeys",
                      },
                    ],
                    attrs: { type: "checkbox" },
                    domProps: {
                      checked: Array.isArray(_vm.includeHotkeys)
                        ? _vm._i(_vm.includeHotkeys, null) > -1
                        : _vm.includeHotkeys,
                    },
                    on: {
                      change: function ($event) {
                        var $$a = _vm.includeHotkeys,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 && (_vm.includeHotkeys = $$a.concat([$$v]))
                          } else {
                            $$i > -1 &&
                              (_vm.includeHotkeys = $$a
                                .slice(0, $$i)
                                .concat($$a.slice($$i + 1)))
                          }
                        } else {
                          _vm.includeHotkeys = $$c
                        }
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c("span", {
                    domProps: { textContent: _vm._s(_vm.lang("hotkeysTitle")) },
                  }),
                ]),
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("hr"),
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "field" },
      [
        _c("div", { staticClass: "field" }, [
          _c("div", { staticClass: "control" }, [
            _c("label", { staticClass: "label checkbox" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.checkAllGroups,
                    expression: "checkAllGroups",
                  },
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.checkAllGroups)
                    ? _vm._i(_vm.checkAllGroups, null) > -1
                    : _vm.checkAllGroups,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.checkAllGroups,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.checkAllGroups = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.checkAllGroups = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.checkAllGroups = $$c
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("span", {
                domProps: { textContent: _vm._s(_vm.lang("importGroups")) },
              }),
            ]),
          ]),
        ]),
        _vm._v(" "),
        _vm._l(_vm.data.groups, function (group) {
          return _c("div", { key: group.id, staticClass: "field" }, [
            _c("div", { staticClass: "control" }, [
              _c(
                "label",
                {
                  staticClass: "checkbox indent-children",
                  attrs: { disabled: _vm.disabledGroups.includes(group) },
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.groups,
                        expression: "groups",
                      },
                    ],
                    attrs: {
                      type: "checkbox",
                      disabled: _vm.disabledGroups.includes(group),
                    },
                    domProps: {
                      value: group,
                      checked: Array.isArray(_vm.groups)
                        ? _vm._i(_vm.groups, group) > -1
                        : _vm.groups,
                    },
                    on: {
                      change: function ($event) {
                        var $$a = _vm.groups,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = group,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 && (_vm.groups = $$a.concat([$$v]))
                          } else {
                            $$i > -1 &&
                              (_vm.groups = $$a
                                .slice(0, $$i)
                                .concat($$a.slice($$i + 1)))
                          }
                        } else {
                          _vm.groups = $$c
                        }
                      },
                    },
                  }),
                  _vm._v(" "),
                  group.iconUrl || group.iconColor
                    ? _c(
                        "figure",
                        { staticClass: "image is-16x16 is-inline-block" },
                        [
                          _c("img", {
                            attrs: { src: _vm.getGroupIconUrl(group) },
                          }),
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  group.isArchive
                    ? _c("figure", { staticClass: "image is-16x16" }, [
                        _c("img", { attrs: { src: "/icons/archive.svg" } }),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  group.newTabContainer !== _vm.DEFAULT_COOKIE_STORE_ID
                    ? [
                        group.newTabContainer === _vm.TEMPORARY_CONTAINER
                          ? _c(
                              "figure",
                              { staticClass: "image is-16x16 is-inline-block" },
                              [
                                _c("img", {
                                  staticClass: "size-16 fill-context",
                                  attrs: {
                                    src: _vm.allContainers[
                                      _vm.TEMPORARY_CONTAINER
                                    ].iconUrl,
                                  },
                                }),
                              ]
                            )
                          : _vm.data.containers &&
                            _vm.data.containers[group.newTabContainer] &&
                            _vm.data.containers[group.newTabContainer].iconUrl
                          ? _c(
                              "figure",
                              { staticClass: "image is-16x16 is-inline-block" },
                              [
                                _c("span", {
                                  class: `size-16 userContext-icon identity-icon-${
                                    _vm.data.containers[group.newTabContainer]
                                      .icon
                                  } identity-color-${
                                    _vm.data.containers[group.newTabContainer]
                                      .color
                                  }`,
                                }),
                              ]
                            )
                          : _vm._e(),
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _c("span", {
                    staticClass: "group-title",
                    domProps: { textContent: _vm._s(_vm.getGroupTitle(group)) },
                  }),
                  _vm._v(" "),
                  _c("small", { staticClass: "is-italic" }, [
                    _vm._v("\n                        ("),
                    _c("span", {
                      domProps: {
                        textContent: _vm._s(
                          _vm.lang("groupTabsCount", group.tabs.length)
                        ),
                      },
                    }),
                    _vm._v(")\n                    "),
                  ]),
                ],
                2
              ),
            ]),
          ])
        }),
      ],
      2
    ),
  ])
}
var manage_addon_backupvue_type_template_id_669362e6_staticRenderFns = []
manage_addon_backupvue_type_template_id_669362e6_render._withStripped = true


;// CONCATENATED MODULE: ./options/manage-addon-backup.vue?vue&type=template&id=669362e6&

;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/index.js??vue-loader-options!./options/manage-addon-backup.vue?vue&type=script&lang=js&

    

    
    
    
    

    /* harmony default export */ const manage_addon_backupvue_type_script_lang_js_ = ({
        props: {
            data: {
                required: true,
                type: Object,
            },
            disableEmptyGroups: {
                required: true,
                type: Boolean,
            },
            allowClearAddonData: {
                required: true,
                type: Boolean,
            },
        },
        watch: {
            clearAddonData(value) {
                this.$emit('clear-addon-data-update', value);
            },
            enableGetData(value) {
                this.$emit('enable-get-data', value);
            },
            groups({length}) {
                if (!length) {
                    this.checkAllGroups = false;
                } else if (this.filteredGroups.length === length) {
                    this.checkAllGroups = true;
                }
            },
            checkAllGroups(cheched) {
                this.groups = cheched ? this.filteredGroups.slice() : [];
            },
        },
        computed: {
            showPinnedTabs() {
                return this.data.pinnedTabs?.length > 0;
            },
            showGeneral() {
                return Object.keys(this.data).some(this.isGeneralOptionsKey, this);
            },
            showHotkeys() {
                return this.data.hotkeys?.length > 0;
            },
            readyPinnedTabs() {
                return this.showPinnedTabs && this.includePinnedTabs;
            },
            getGeneral() {
                return this.showGeneral && this.includeGeneral;
            },
            getHotkeys() {
                return this.showHotkeys && this.includeHotkeys;
            },
            getGroups() {
                return this.groups.length > 0;
            },
            enableGetData() {
                return this.getGeneral || this.getHotkeys || this.getGroups;
            },
        },
        mounted() {
            this.$nextTick(() => this.$emit('clear-addon-data-update', this.allowClearAddonData));
        },
        data() {
            let filteredGroups,
                disabledGroups;

            if (this.disableEmptyGroups) {
                filteredGroups = this.data.groups.filter(group => group.tabs.length);
                disabledGroups = this.data.groups.filter(group => !group.tabs.length);
            } else {
                filteredGroups = this.data.groups;
                disabledGroups = [];
            }

            return {
                TEMPORARY_CONTAINER: constants_js_namespaceObject.TEMPORARY_CONTAINER,
                DEFAULT_COOKIE_STORE_ID: constants_js_namespaceObject.DEFAULT_COOKIE_STORE_ID,
                allContainers: containers_js_namespaceObject.getAll(),

                filteredGroups,

                clearAddonData: this.allowClearAddonData,

                includePinnedTabs: true,
                includeGeneral: true,
                includeHotkeys: true,

                checkAllGroups: true,

                groups: filteredGroups.slice(),
                disabledGroups,
            };
        },
        methods: {
            lang: browser.i18n.getMessage,

            getGroupIconUrl: groups_js_namespaceObject.getIconUrl,

            getGroupTitle: groups_js_namespaceObject.getTitle,

            isGeneralOptionsKey(key) {
                if (key === 'hotkeys') {
                    return false;
                }

                return constants_js_namespaceObject.ALL_OPTIONS_KEYS.includes(key);
            },

            getData() {
                const result = {};

                if (this.getGroups) {
                    result.groups = this.groups;

                    if (this.data.containers) {
                        result.containers = this.data.containers;
                    }

                    if (this.data.lastCreatedGroupPosition) {
                        result.lastCreatedGroupPosition = this.data.lastCreatedGroupPosition;
                    }

                    if (this.readyPinnedTabs) {
                        result.pinnedTabs = this.data.pinnedTabs;
                    }
                }

                if (this.getGeneral) {
                    for (const key in this.data) {
                        if (this.isGeneralOptionsKey(key)) {
                            result[key] = this.data[key];
                        }
                    }
                }

                if (this.getHotkeys) {
                    result.hotkeys = this.data.hotkeys;
                }

                return json_js_namespaceObject["default"].clone(result);
            },
        },
    });

;// CONCATENATED MODULE: ./options/manage-addon-backup.vue?vue&type=script&lang=js&
 /* harmony default export */ const options_manage_addon_backupvue_type_script_lang_js_ = (manage_addon_backupvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./options/manage-addon-backup.vue



;


/* normalize component */

var manage_addon_backup_component = normalizeComponent(
  options_manage_addon_backupvue_type_script_lang_js_,
  manage_addon_backupvue_type_template_id_669362e6_render,
  manage_addon_backupvue_type_template_id_669362e6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const manage_addon_backup = (manage_addon_backup_component.exports);
;// CONCATENATED MODULE: external "/js/logger.js"
var logger_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var logger_js_y = x => () => x
const logger_js_namespaceObject = logger_js_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_logger_js_162b1479__["default"] });
;// CONCATENATED MODULE: external "/js/urls.js"
var urls_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var urls_js_y = x => () => x
const urls_js_namespaceObject = urls_js_x({ ["openDebugPage"]: () => __WEBPACK_EXTERNAL_MODULE__js_urls_js_a3942af5__.openDebugPage });
;// CONCATENATED MODULE: external "/js/hotkeys.js"
var hotkeys_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var hotkeys_js_y = x => () => x
const hotkeys_js_namespaceObject = hotkeys_js_x({ ["eventToHotkeyValue"]: () => __WEBPACK_EXTERNAL_MODULE__js_hotkeys_js_a9053836__.eventToHotkeyValue, ["isValidHotkeyEvent"]: () => __WEBPACK_EXTERNAL_MODULE__js_hotkeys_js_a9053836__.isValidHotkeyEvent, ["isValidHotkeyValue"]: () => __WEBPACK_EXTERNAL_MODULE__js_hotkeys_js_a9053836__.isValidHotkeyValue });
;// CONCATENATED MODULE: external "/js/mixins/default-group.mixin.js"
var default_group_mixin_js_x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var default_group_mixin_js_y = x => () => x
const default_group_mixin_js_namespaceObject = default_group_mixin_js_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE__js_mixins_default_group_mixin_js_b0c4f4fc__["default"] });
;// CONCATENATED MODULE: ../node_modules/vue-loader/lib/index.js??vue-loader-options!./options/Options.vue?vue&type=script&lang=js&

    

    

    
    
    

    
    
    
    
    
    
    
    
    
    

    

    window.logger = new logger_js_namespaceObject["default"]('Options');

    vue_runtime_esm_js_namespaceObject["default"].config.errorHandler = errorEventHandler.bind(window.logger);

    const SECTION_GENERAL = 'general',
        SECTION_HOTKEYS = 'hotkeys',
        SECTION_BACKUP = 'backup',
        folderNameRegExp = /[\<\>\:\"\/\\\|\?\*\x00-\x1F]|^(?:aux|con|nul|prn|com\d|lpt\d)$|^\.+|\.+$/gi;

    document.title = browser.i18n.getMessage('openSettings');

    /* harmony default export */ const Optionsvue_type_script_lang_js_ = ({
        name: 'options-page',
        mixins: [default_group_mixin_js_namespaceObject["default"]],
        data() {
            this.HOTKEY_ACTIONS = constants_js_namespaceObject.HOTKEY_ACTIONS;
            this.HOTKEY_ACTIONS_WITH_CUSTOM_GROUP = constants_js_namespaceObject.HOTKEY_ACTIONS_WITH_CUSTOM_GROUP;
            this.GROUP_ICON_VIEW_TYPES = constants_js_namespaceObject.GROUP_ICON_VIEW_TYPES;
            this.AUTO_BACKUP_INTERVAL_KEY = constants_js_namespaceObject.AUTO_BACKUP_INTERVAL_KEY;

            this.SECTION_GENERAL = SECTION_GENERAL;
            this.SECTION_HOTKEYS = SECTION_HOTKEYS;
            this.SECTION_BACKUP = SECTION_BACKUP;

            return {
                section: window.localStorage.optionsSection || SECTION_GENERAL,

                contextMenuTabTitles: {
                    'open-in-new-window': {
                        title: 'openGroupInNewWindow',
                        icon: 'window-new',
                    },
                    'reload': {
                        title: 'reloadTab',
                        icon: 'refresh',
                    },
                    'discard': {
                        title: 'discardTabTitle',
                        icon: 'snowflake',
                    },
                    'remove': {
                        title: 'deleteTab',
                        icon: 'close',
                    },
                    'update-thumbnail': {
                        title: 'updateTabThumbnail',
                        icon: 'image',
                    },
                    'set-group-icon': {
                        title: 'setTabIconAsGroupIcon',
                        icon: 'image',
                    },
                    'hr': null,
                    'move-tab-to-group': {
                        title: 'moveTabToGroupDisabledTitle',
                        icon: '',
                    },
                },

                contextMenuGroupTitles: {
                    'open-in-new-window': {
                        title: 'openGroupInNewWindow',
                        icon: 'window-new',
                    },
                    'sort-asc': {
                        title: 'sortGroupsAZ',
                        icon: 'sort-alpha-asc',
                    },
                    'sort-desc': {
                        title: 'sortGroupsZA',
                        icon: 'sort-alpha-desc',
                    },
                    'discard': {
                        title: 'hotkeyActionTitleDiscardGroup',
                        icon: 'snowflake',
                    },
                    'discard-other': {
                        title: 'hotkeyActionTitleDiscardOtherGroups',
                        icon: 'snowflake',
                    },
                    'export-to-bookmarks': {
                        title: 'exportGroupToBookmarks',
                        icon: 'bookmark',
                    },
                    'unload': {
                        title: 'unloadGroup',
                        icon: 'upload',
                    },
                    'archive': {
                        title: 'archiveGroup',
                        icon: 'archive',
                    },
                    'rename': {
                        title: 'hotkeyActionTitleRenameGroup',
                        icon: 'edit',
                    },
                    'hr': null,
                    'reload-all-tabs': {
                        title: 'reloadAllTabsInGroup',
                        icon: 'refresh',
                    },
                },

                includeTabThumbnailsIntoBackup: false,
                includeTabFavIconsIntoBackup: true,

                options: {},
                groups: [],

                manageAddonSettings: null,
                manageAddonSettingsTitle: '',
                manageAddonSettingsDisableEmptyGroups: false,
                manageAddonSettingsAllowClearAddonDataBeforeRestore: false,

                permissions: {
                    bookmarks: false,
                },

                defaultBookmarksParents: [],

                showLoadingMessage: false,

                showClearAddonConfirmPopup: false,
            };
        },
        components: {
            popup: popup,
            'edit-group': edit_group,
            'manage-addon-backup': manage_addon_backup,
        },
        async created() {
            const data = await storage_js_namespaceObject.get();

            const options = utils_js_namespaceObject.assignKeys({}, data, constants_js_namespaceObject.ALL_OPTIONS_KEYS);

            options.autoBackupFolderName = await file_js_namespaceObject.getAutoBackupFolderName();

            this.permissions.bookmarks = await browser.permissions.contains(constants_js_namespaceObject.PERMISSIONS.BOOKMARKS);

            this.groups = data.groups; // set before for watch hotkeys
            this.options = options;

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => this.updateTheme());

            this.loadBookmarksParents();

            [
                ...constants_js_namespaceObject.ONLY_BOOL_OPTION_KEYS,
                'defaultBookmarksParent',
                'autoBackupIntervalKey',
                'theme',
                'contextMenuTab',
                'contextMenuGroup',
                ]
                .forEach(option => {
                    this.$watch(`options.${option}`, function(value, oldValue) {
                        if (null == oldValue) {
                            return;
                        }

                        messages_js_namespaceObject["default"].sendMessageModule('BG.saveOptions', {
                            [option]: value,
                        });
                    });
                });
        },
        watch: {
            section(section) {
                window.localStorage.optionsSection = section;
            },
            'options.autoBackupFolderName': function(value, oldValue) {
                if (null == oldValue) {
                    return;
                }

                while (folderNameRegExp.exec(value)) {
                    value = value.replace(folderNameRegExp, '').trim();
                }

                if (value.length > 200) {
                    value = '';
                }

                messages_js_namespaceObject["default"].sendMessageModule('BG.saveOptions', {
                    autoBackupFolderName: value,
                });
            },
            'options.autoBackupIntervalValue': function(value, oldValue) {
                if (!value || null == oldValue) {
                    return;
                }

                if (
                    value < 1 ||
                    (constants_js_namespaceObject.AUTO_BACKUP_INTERVAL_KEY.minutes === this.options.autoBackupIntervalKey && value > 59) ||
                    (constants_js_namespaceObject.AUTO_BACKUP_INTERVAL_KEY.hours === this.options.autoBackupIntervalKey && value > 24) ||
                    (constants_js_namespaceObject.AUTO_BACKUP_INTERVAL_KEY.days === this.options.autoBackupIntervalKey && value > 30)
                    ) {
                    value = 1;
                }

                messages_js_namespaceObject["default"].sendMessageModule('BG.saveOptions', {
                    autoBackupIntervalValue: value,
                });
            },
            'options.theme': 'updateTheme',
            'options.temporaryContainerTitle': function(temporaryContainerTitle, oldValue) {
                if (!temporaryContainerTitle || null == oldValue) {
                    return;
                }

                messages_js_namespaceObject["default"].sendMessageModule('BG.saveOptions', {
                    temporaryContainerTitle,
                });
            },
            'options.hotkeys': {
                handler(hotkeys, oldValue) {
                    hotkeys = hotkeys.filter((hotkey, index, self) => {
                        return self.findIndex(h => h.value === hotkey.value) === index;
                    });

                    const hotheysIsValid = hotkeys.every(hotkey => hotkey.action && (0,hotkeys_js_namespaceObject.isValidHotkeyValue)(hotkey.value));

                    if (hotheysIsValid && oldValue) {
                        messages_js_namespaceObject["default"].sendMessageModule('BG.saveOptions', {hotkeys});
                    }
                },
                deep: true,
            },
            'options.showTabsWithThumbnailsInManageGroups': function(value, oldValue) {
                if (null == oldValue) {
                    return;
                }

                if (!value) {
                    this.includeTabThumbnailsIntoBackup = this.options.autoBackupIncludeTabThumbnails = false;
                }
            },
        },
        computed: {
            showEnableDarkThemeNotification() {
                return utils_js_namespaceObject.getThemeApply(this.options.theme) === 'dark';
            },
            groupIds() {
                return this.groups.map(group => group.id);
            },
        },
        methods: {
            lang: browser.i18n.getMessage,
            getHotkeyActionTitle: action => browser.i18n.getMessage('hotkeyActionTitle' + utils_js_namespaceObject.capitalize(utils_js_namespaceObject.toCamelCase(action))),

            updateTheme() {
                document.documentElement.dataset.theme = utils_js_namespaceObject.getThemeApply(this.options.theme);
            },

            openBackupFolder: file_js_namespaceObject.openBackupFolder,
            getGroupTitle: groups_js_namespaceObject.getTitle,

            hasEqualHotkeys(hotkey) {
                return this.options.hotkeys.filter(h => h.value && h.value === hotkey.value).length > 1;
            },

            getHotkeyParentNode(event) {
                return event.target.closest('.control');
            },

            onBlurHotkey(event) {
                const inputParent = this.getHotkeyParentNode(event);

                inputParent.classList.remove('key-success');
            },

            saveHotkeyKeyCodeAndStopEvent(hotkey, event, withKeyCode) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                const inputParent = this.getHotkeyParentNode(event);

                if ((0,hotkeys_js_namespaceObject.isValidHotkeyEvent)(event)) {
                    inputParent.classList.add('key-success');
                    inputParent.classList.remove('key-error');
                } else {
                    inputParent.classList.add('key-error');
                    inputParent.classList.remove('key-success');
                }

                hotkey.value = (0,hotkeys_js_namespaceObject.eventToHotkeyValue)(event);
            },

            setManageAddonSettings(data, popupTitle, disableEmptyGroups = false, allowClearAddonDataBeforeRestore = false) {
                this.manageAddonSettingsTitle = popupTitle;
                this.manageAddonSettingsDisableEmptyGroups = disableEmptyGroups;
                this.manageAddonSettingsAllowClearAddonDataBeforeRestore = allowClearAddonDataBeforeRestore;
                this.manageAddonSettings = data;
            },

            saveManagedAddonSettings(data, clearAddonDataBeforeRestore) {
                let clearAddonData = false;

                if (this.manageAddonSettingsAllowClearAddonDataBeforeRestore && clearAddonDataBeforeRestore) {
                    clearAddonData = true;
                }

                this.manageAddonSettings = null;

                this.showLoadingMessage = true;

                messages_js_namespaceObject["default"].sendMessageModule('BG.restoreBackup', data, clearAddonData);
            },

            exportAddonSettings() {
                messages_js_namespaceObject["default"].sendMessage('create-backup', {
                    includeTabFavIcons: this.includeTabFavIconsIntoBackup,
                    includeTabThumbnails: this.includeTabThumbnailsIntoBackup,
                });
            },

            async importAddonSettings() {
                let data = null;

                try {
                    data = await file_js_namespaceObject.load();
                } catch (e) {
                    utils_js_namespaceObject.notify(e);
                    return;
                }

                if ('object' !== utils_js_namespaceObject.type(data) || !Array.isArray(data.groups) || !Number.isSafeInteger(data.lastCreatedGroupPosition)) {
                    utils_js_namespaceObject.notify('This is wrong backup!');
                    return;
                }

                const resultMigrate = await messages_js_namespaceObject["default"].sendMessageModule('BG.runMigrateForData', data);

                if (resultMigrate.migrated) {
                    data = resultMigrate.data;
                } else if (resultMigrate.error) {
                    utils_js_namespaceObject.notify(resultMigrate.error);
                    return;
                }

                this.setManageAddonSettings(data, 'importAddonSettingsTitle', false, true);
            },

            async importSettingsOldTabGroupsAddonButton() {
                let oldOptions = null;

                try {
                    oldOptions = await file_js_namespaceObject.load();
                } catch (e) {
                    utils_js_namespaceObject.notify(e);
                    return;
                }

                if (!oldOptions || !Array.isArray(oldOptions.windows) || !oldOptions.session) {
                    utils_js_namespaceObject.notify('This is not "Tab Groups" backup!');
                    return;
                }

                let data = {
                    groups: [],
                    pinnedTabs: [],
                };

                oldOptions.windows.forEach(function(win) {
                    let oldGroups = {},
                        groups = {};

                    try {
                        oldGroups = json_js_namespaceObject["default"].parse(win.extData['tabview-group']);
                    } catch (e) {
                        utils_js_namespaceObject.notify('Error: cannot parse backup file - ' + e);
                        return;
                    }

                    Object.values(oldGroups).forEach(function({id, title, catchRules}) {
                        groups[id] = {
                            title: groups_js_namespaceObject.createTitle(title, id),
                            tabs: [],
                            catchTabRules: catchRules || '',
                        };
                    });

                    win.tabs.forEach(function(oldTab) {
                        let tabData = {},
                            tab = oldTab.entries.pop();

                        tab = utils_js_namespaceObject.normalizeTabUrl(tab);

                        if (!utils_js_namespaceObject.isUrlAllowToCreate(tab.url)) {
                            return;
                        }

                        if (oldTab.pinned) {
                            data.pinnedTabs.push({
                                title: tab.title,
                                url: tab.url,
                                pinned: true,
                            });
                            return;
                        }

                        try {
                            tabData = json_js_namespaceObject["default"].parse(oldTab.extData['tabview-tab']);
                            if (!tabData || !tabData.groupID) {
                                return;
                            }
                        } catch (e) {
                            return utils_js_namespaceObject.notify('Cannot parse groups: ' + e);
                        }

                        if (groups[tabData.groupID]) {
                            groups[tabData.groupID].tabs.push({
                                title: tab.title,
                                url: tab.url,
                                groupId: groups[tabData.groupID].id,
                            });
                        }
                    });

                    data.groups.push(...Object.values(groups));
                });

                this.setManageAddonSettings(data, 'importSettingsOldTabGroupsAddonTitle');
            },

            async importSettingsPanoramaViewAddonButton() {
                let panoramaOptions = null;

                try {
                    panoramaOptions = await file_js_namespaceObject.load();
                } catch (e) {
                    utils_js_namespaceObject.notify(e);
                    return;
                }

                if (!panoramaOptions || !panoramaOptions.file || 'panoramaView' !== panoramaOptions.file.type || !Array.isArray(panoramaOptions.windows)) {
                    utils_js_namespaceObject.notify('This is not "Panorama View" backup!');
                    return;
                }

                let data = {
                    groups: [],
                    pinnedTabs: [],
                };

                if (panoramaOptions.file.version === 1) {
                    panoramaOptions.windows.forEach(function(win) {
                        let groups = {};

                        win.groups.forEach(function({id, name}) {
                            groups[id] = {
                                title: groups_js_namespaceObject.createTitle(name, id),
                                tabs: [],
                            };
                        });

                        win.tabs.forEach(function({url, title, pinned, groupId}) {
                            url = utils_js_namespaceObject.normalizeUrl(url);

                            if (utils_js_namespaceObject.isUrlAllowToCreate(url)) {
                                if (pinned) {
                                    data.pinnedTabs.push({url, title, pinned});
                                } else if (groups[groupId]) {
                                    groups[groupId].tabs.push({url, title});
                                }
                            }
                        });

                        data.groups.push(...Object.values(groups));
                    });
                } else if (panoramaOptions.file.version === 2) {
                    panoramaOptions.windows.forEach(function(win) {
                        win.tabGroups?.forEach(function({title, tabs}) {
                            let groupTabs = [];

                            tabs.forEach(function({url, title}) {
                                url = utils_js_namespaceObject.normalizeUrl(url);

                                if (utils_js_namespaceObject.isUrlAllowToCreate(url)) {
                                    groupTabs.push({url, title});
                                }
                            });

                            if (groupTabs.length) {
                                data.groups.push({
                                    title: groups_js_namespaceObject.createTitle(title, groupTabs.length),
                                    tabs: groupTabs,
                                });
                            }
                        });

                        win.pinnedTabs?.forEach(function({url, title}) {
                            url = utils_js_namespaceObject.normalizeUrl(url);

                            if (utils_js_namespaceObject.isUrlAllowToCreate(url)) {
                                data.pinnedTabs.push({url, title});
                            }
                        });
                    });
                } else {
                    utils_js_namespaceObject.notify('"Panorama View" backup has unsupported version');
                    return;
                }

                this.setManageAddonSettings(data, 'importSettingsPanoramaViewAddonTitle', true);
            },

            async importSettingsSyncTabGroupsAddonButton() {
                let syncTabOptions = null;

                try {
                    syncTabOptions = await file_js_namespaceObject.load();
                } catch (e) {
                    utils_js_namespaceObject.notify(e);
                    return;
                }

                if (!syncTabOptions || !syncTabOptions.version || 'syncTabGroups' !== syncTabOptions.version[0] || !Array.isArray(syncTabOptions.groups)) {
                    utils_js_namespaceObject.notify('This is not "Sync Tab Groups" backup!');
                    return;
                }

                if (1 !== syncTabOptions.version[1]) {
                    utils_js_namespaceObject.notify('"Sync Tab Groups" backup has unsupported version');
                    return;
                }

                let data = {
                    groups: [],
                    pinnedTabs: [],
                };

                syncTabOptions.groups.forEach(function({id, title, tabs}) {
                    tabs = tabs
                        .map(function({url, title, favIconUrl, pinned}) {
                            url = utils_js_namespaceObject.normalizeUrl(url);

                            if (utils_js_namespaceObject.isUrlAllowToCreate(url)) {
                                return {url, title, favIconUrl, pinned};
                            }
                        })
                        .filter(Boolean);

                    data.groups.push({
                        title: groups_js_namespaceObject.createTitle(title, id),
                        tabs: tabs.filter(tab => !tab.pinned),
                    });

                    data.pinnedTabs.push(...tabs.filter(tab => tab.pinned));
                });

                this.setManageAddonSettings(data, 'importSettingsSyncTabGroupsAddonTitle', true);
            },

            runClearAddonConfirm() {
                this.showClearAddonConfirmPopup = false;
                this.showLoadingMessage = true;
                messages_js_namespaceObject["default"].sendMessageModule('BG.clearAddon');
            },

            createHotkey() {
                return {
                    value: '',
                    action: '',
                    groupId: 0,
                };
            },

            async setPermissionsBookmarks(event) {
                if (event.target.checked) {
                    this.permissions.bookmarks = await browser.permissions.request(constants_js_namespaceObject.PERMISSIONS.BOOKMARKS);
                } else {
                    await browser.permissions.remove(constants_js_namespaceObject.PERMISSIONS.BOOKMARKS);
                }

                this.loadBookmarksParents();
            },

            async loadBookmarksParents() {
                if (this.defaultBookmarksParents.length) {
                    return;
                }

                this.permissions.bookmarks = await browser.permissions.contains(constants_js_namespaceObject.PERMISSIONS.BOOKMARKS);

                if (this.permissions.bookmarks) {
                    this.defaultBookmarksParents = await browser.bookmarks.get(constants_js_namespaceObject.DEFAULT_BOOKMARKS_PARENTS);
                }
            },

            getGroupIconUrl(groupId) {
                const group = this.groups.find(gr => gr.id === groupId);
                return groups_js_namespaceObject.getIconUrl(group);
            },

            openDebugPage() {
                urls_js_namespaceObject.openDebugPage();
            },
        },
    });

;// CONCATENATED MODULE: ./options/Options.vue?vue&type=script&lang=js&
 /* harmony default export */ const options_Optionsvue_type_script_lang_js_ = (Optionsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./options/Options.vue



;


/* normalize component */

var Options_component = normalizeComponent(
  options_Optionsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const Options = (Options_component.exports);
;// CONCATENATED MODULE: ./options/options.js
// import 'wait-background';
// import backgroundSelf from 'background';



/* backgroundSelf?.inited &&  */new vue_runtime_esm_js_namespaceObject["default"]({
    el: '#stg-options',
    render: h => h(Options),
});

})();

