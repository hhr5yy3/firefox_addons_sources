(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "713b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=template&id=3cc578b6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-layout',{attrs:{"view":"lHh Lpr lFf"}},[_c('q-header',{attrs:{"elevated":""}},[_c('q-toolbar',[_c('q-btn',{attrs:{"flat":"","dense":"","round":"","icon":"menu","aria-label":"Menu"},on:{"click":function($event){_vm.leftDrawerOpen = !_vm.leftDrawerOpen}}}),_c('q-toolbar-title',[_vm._v("\n        "+_vm._s(_vm.$i18n("extensionName"))+"\n      ")])],1)],1),_c('q-drawer',{attrs:{"show-if-above":"","bordered":""},model:{value:(_vm.leftDrawerOpen),callback:function ($$v) {_vm.leftDrawerOpen=$$v},expression:"leftDrawerOpen"}},[_c('q-list',[_c('q-item-label',{staticClass:"text-grey-8",attrs:{"header":""}},[_vm._v("\n        Links\n      ")]),_vm._l((_vm.essentialLinks),function(link){return _c('EssentialLink',_vm._b({key:link.title},'EssentialLink',link,false))})],2)],1),_c('q-page-container',[_c('router-view')],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=template&id=3cc578b6&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EssentialLink.vue?vue&type=template&id=6920a6f8&
var EssentialLinkvue_type_template_id_6920a6f8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-item',{attrs:{"clickable":"","tag":"a","target":"_blank","href":_vm.link}},[(_vm.icon)?_c('q-item-section',{attrs:{"avatar":""}},[_c('q-icon',{attrs:{"name":_vm.icon}})],1):_vm._e(),_c('q-item-section',[_c('q-item-label',[_vm._v(_vm._s(_vm.title))]),_c('q-item-label',{attrs:{"caption":""}},[_vm._v("\n      "+_vm._s(_vm.caption)+"\n    ")])],1)],1)}
var EssentialLinkvue_type_template_id_6920a6f8_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/EssentialLink.vue?vue&type=template&id=6920a6f8&

// CONCATENATED MODULE: ./node_modules/@quasar/app/lib/webpack/loader.transform-quasar-imports.js!./node_modules/babel-loader/lib??ref--2-0!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EssentialLink.vue?vue&type=script&lang=js&
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
//
//
//
//
//
//
/* harmony default export */ var EssentialLinkvue_type_script_lang_js_ = ({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  }
});
// CONCATENATED MODULE: ./src/components/EssentialLink.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_EssentialLinkvue_type_script_lang_js_ = (EssentialLinkvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/item/QItem.js + 1 modules
var QItem = __webpack_require__("66e5");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/item/QItemSection.js
var QItemSection = __webpack_require__("4074");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/icon/QIcon.js
var QIcon = __webpack_require__("0016");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/item/QItemLabel.js
var QItemLabel = __webpack_require__("0170");

// EXTERNAL MODULE: ./node_modules/@quasar/app/lib/webpack/runtime.auto-import.js
var runtime_auto_import = __webpack_require__("eebe");
var runtime_auto_import_default = /*#__PURE__*/__webpack_require__.n(runtime_auto_import);

// CONCATENATED MODULE: ./src/components/EssentialLink.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_EssentialLinkvue_type_script_lang_js_,
  EssentialLinkvue_type_template_id_6920a6f8_render,
  EssentialLinkvue_type_template_id_6920a6f8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EssentialLink = (component.exports);





runtime_auto_import_default()(component, 'components', {QItem: QItem["a" /* default */],QItemSection: QItemSection["a" /* default */],QIcon: QIcon["a" /* default */],QItemLabel: QItemLabel["a" /* default */]});

// CONCATENATED MODULE: ./node_modules/@quasar/app/lib/webpack/loader.transform-quasar-imports.js!./node_modules/babel-loader/lib??ref--2-0!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/MainLayout.vue?vue&type=script&lang=js&
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

const linksData = [{
  title: 'Github',
  caption: 'github.com/gaoliang/env-indicator',
  icon: 'code',
  link: 'https://github.com/gaoliang/env-indicator'
} // {
//   title: 'Chrome Store',
//   caption: 'Chrome store',
//   icon: 'store',
//   link: 'https://github.com/gaoliang/env-indicator'
// }
];
/* harmony default export */ var MainLayoutvue_type_script_lang_js_ = ({
  name: 'MainLayout',
  components: {
    EssentialLink: EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    };
  }

});
// CONCATENATED MODULE: ./src/layouts/MainLayout.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_MainLayoutvue_type_script_lang_js_ = (MainLayoutvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/quasar/src/components/layout/QLayout.js + 1 modules
var QLayout = __webpack_require__("4d5a");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/header/QHeader.js
var QHeader = __webpack_require__("e359");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/toolbar/QToolbar.js
var QToolbar = __webpack_require__("65c6");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/btn/QBtn.js + 1 modules
var QBtn = __webpack_require__("9c40");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/toolbar/QToolbarTitle.js
var QToolbarTitle = __webpack_require__("6ac5");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/drawer/QDrawer.js
var QDrawer = __webpack_require__("9404");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/item/QList.js
var QList = __webpack_require__("1c1c");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/page/QPageContainer.js
var QPageContainer = __webpack_require__("09e3");

// CONCATENATED MODULE: ./src/layouts/MainLayout.vue





/* normalize component */

var MainLayout_component = Object(componentNormalizer["a" /* default */])(
  layouts_MainLayoutvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MainLayout = __webpack_exports__["default"] = (MainLayout_component.exports);










runtime_auto_import_default()(MainLayout_component, 'components', {QLayout: QLayout["a" /* default */],QHeader: QHeader["a" /* default */],QToolbar: QToolbar["a" /* default */],QBtn: QBtn["a" /* default */],QToolbarTitle: QToolbarTitle["a" /* default */],QDrawer: QDrawer["a" /* default */],QList: QList["a" /* default */],QItemLabel: QItemLabel["a" /* default */],QPageContainer: QPageContainer["a" /* default */]});


/***/ })

}]);