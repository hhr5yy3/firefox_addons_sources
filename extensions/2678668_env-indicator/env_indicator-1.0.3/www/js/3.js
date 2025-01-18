(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "1506":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5f42":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_2_2_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1506");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_2_2_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_2_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_2_2_node_modules_quasar_app_lib_webpack_loader_auto_import_client_js_kebab_node_modules_vue_loader_lib_index_js_vue_loader_options_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "97e0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/popup.vue?vue&type=template&id=17a0757d&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fullscreen row text-center q-pa-md flex flex-center"},[_vm._v("\n  "+_vm._s(_vm.$i18n('extensionName'))+"\n  "),(_vm.enable !== null)?_c('q-toggle',{attrs:{"size":"150px"},on:{"input":_vm.change},model:{value:(_vm.enable),callback:function ($$v) {_vm.enable=$$v},expression:"enable"}}):_vm._e(),_c('br'),_c('div',[_c('q-btn',{staticClass:"q-mt-xl",attrs:{"unelevated":"","label":this.$i18n('preferences'),"no-caps":""},on:{"click":_vm.goOptions}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/popup.vue?vue&type=template&id=17a0757d&

// CONCATENATED MODULE: ./node_modules/@quasar/app/lib/webpack/loader.transform-quasar-imports.js!./node_modules/babel-loader/lib??ref--2-0!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/popup.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var browser = __webpack_require__("9845");

/* harmony default export */ var popupvue_type_script_lang_js_ = ({
  name: 'Popup',

  data() {
    return {
      enable: null
    };
  },

  methods: {
    goOptions() {
      browser.tabs.create({
        url: browser.extension.getURL('www/index.html')
      }).then(() =>
      /* newTab */
      {// Tab opened.
      });
    },

    change() {
      this.$q.notify({
        position: 'top',
        timeout: 500,
        message: this.$i18n('needRefresh')
      });
    }

  },

  mounted() {
    let that = this;
    browser.storage.sync.get(['enable']).then(result => {
      // init enable value to true
      if (result.enable === undefined) {
        that.enable = true;
        browser.storage.sync.set({
          'enable': true
        });
      } else {
        that.enable = result.enable;
      }
    });
  },

  watch: {
    enable() {
      browser.storage.sync.set({
        "enable": this.enable
      });
    }

  }
});
// CONCATENATED MODULE: ./src/pages/popup.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_popupvue_type_script_lang_js_ = (popupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/pages/popup.vue?vue&type=style&index=0&lang=css&
var popupvue_type_style_index_0_lang_css_ = __webpack_require__("5f42");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/toggle/QToggle.js
var QToggle = __webpack_require__("9564");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/btn/QBtn.js + 1 modules
var QBtn = __webpack_require__("9c40");

// EXTERNAL MODULE: ./node_modules/@quasar/app/lib/webpack/runtime.auto-import.js
var runtime_auto_import = __webpack_require__("eebe");
var runtime_auto_import_default = /*#__PURE__*/__webpack_require__.n(runtime_auto_import);

// CONCATENATED MODULE: ./src/pages/popup.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_popupvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var popup = __webpack_exports__["default"] = (component.exports);



runtime_auto_import_default()(component, 'components', {QToggle: QToggle["a" /* default */],QBtn: QBtn["a" /* default */]});


/***/ })

}]);