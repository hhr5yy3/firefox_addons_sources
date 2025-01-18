(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "1e56":
/***/ (function(module) {

module.exports = JSON.parse("[{\"envBackgroundColor\":\"#00a300\",\"textColor\":\"#FFFFFF\",\"envName\":\"Dev 🤣\",\"position\":\"left\",\"ruleType\":\"regex\",\"shape\":\"triangle\",\"ruleValue\":\"(localhost)|(127.0.0.1).*\"},{\"envBackgroundColor\":\"#ffff00\",\"textColor\":\"#666666\",\"envName\":\"Staging 👀\",\"position\":\"left\",\"ruleType\":\"regex\",\"shape\":\"triangle\",\"ruleValue\":\"(st\\\\.)|(staging\\\\.)\"},{\"envBackgroundColor\":\"#ff8000\",\"textColor\":\"#FFFFFF\",\"envName\":\"Preview 🚗\",\"position\":\"left\",\"ruleType\":\"regex\",\"shape\":\"ribbon\",\"ruleValue\":\"(pre\\\\.)|(preview)\"},{\"envBackgroundColor\":\"#ff6666\",\"textColor\":\"#FFFFFF\",\"envName\":\"Production ⚠️\",\"position\":\"left\",\"ruleType\":\"suffix\",\"shape\":\"ribbon\",\"ruleValue\":\".srv\"}]");

/***/ }),

/***/ "8b24":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Index.vue?vue&type=template&id=c022bfaa&
var render = function () {
var this$1 = this;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-page',{staticClass:"flex flex-center"},[_c('div',{staticClass:"q-pa-md"},[_c('q-table',{attrs:{"title":this.$i18n('allEnvs'),"data":_vm.envs,"columns":_vm.columns,"row-key":"index","hide-pagination":true,"pagination":_vm.pagination},scopedSlots:_vm._u([{key:"top-right",fn:function(){return [_c('input',{ref:"jsonUploader",attrs:{"type":"file","hidden":"","accept":"application/json"},on:{"change":_vm.uploadJsonChange}}),_c('q-btn',{staticStyle:{"margin-right":"10px"},attrs:{"icon-right":"unarchive","label":_vm.i18n('importJSON'),"no-caps":""},on:{"click":_vm.importJson}}),_c('q-btn',{attrs:{"icon-right":"archive","label":_vm.i18n('exportJSON'),"no-caps":""},on:{"click":_vm.exportJson}})]},proxy:true},{key:"body-cell-index",fn:function(props){return [_c('q-td',{attrs:{"props":props}},[_vm._v("\n          "+_vm._s(props.rowIndex)+"\n        ")])]}},{key:"body-cell-envBackgroundColor",fn:function(props){return [_c('q-td',{attrs:{"props":props}},[_c('q-avatar',{style:({ backgroundColor: props.value }),attrs:{"size":"24px"}})],1)]}},{key:"body-cell-textColor",fn:function(props){return [_c('q-td',{attrs:{"props":props}},[_c('q-avatar',{style:({ backgroundColor: props.value }),attrs:{"size":"24px"}})],1)]}},{key:"body-cell-shape",fn:function(props){return [_c('q-td',{attrs:{"props":props}},[_vm._v("\n          "+_vm._s(_vm.$i18n(props.value))+"\n        ")])]}},{key:"body-cell-position",fn:function(props){return [_c('q-td',{attrs:{"props":props}},[_vm._v("\n          "+_vm._s(_vm.$i18n(props.value))+"\n        ")])]}},{key:"body-cell-operation",fn:function(props){return [_c('q-td',{attrs:{"props":props}},[_c('q-btn-group',{attrs:{"rounded":""}},[_c('q-btn',{attrs:{"icon":"arrow_upward","disable":props.rowIndex === 0,"size":"sm"},on:{"click":function($event){return _vm.up(props)}}}),_c('q-btn',{attrs:{"icon":"arrow_downward","disable":props.rowIndex === _vm.envs.length - 1,"size":"sm"},on:{"click":function($event){return _vm.down(props)}}}),_c('q-btn',{attrs:{"icon":"edit","color":"primary","size":"sm"},on:{"click":function($event){return _vm.edit(props)}}}),_c('q-btn',{attrs:{"icon":"delete","color":"red-5","size":"sm"},on:{"click":function($event){return _vm.deleteEnv(props)}}})],1)],1)]}}])})],1),_c('q-dialog',{attrs:{"persistent":""},model:{value:(_vm.formShow),callback:function ($$v) {_vm.formShow=$$v},expression:"formShow"}},[_c('q-card',{staticStyle:{"width":"700px","max-width":"80vw"}},[_c('q-card-section',{staticClass:"row items-center q-pb-none"},[_c('div',{staticClass:"text-h6"},[_vm._v(_vm._s(_vm.$i18n("addEnv")))]),_c('q-space'),_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"icon":"close","flat":"","round":"","dense":""}})],1),_c('q-card-section',[_c('q-form',{staticClass:"q-gutter-md",on:{"submit":_vm.onSubmit,"reset":_vm.onReset}},[_c('q-input',{attrs:{"filled":"","label":this.$i18n('envName'),"lazy-rules":"","rules":[ function (val) { return val && val.length > 0 || this$1.$i18n('envNameRequired'); }]},model:{value:(_vm.form.envName),callback:function ($$v) {_vm.$set(_vm.form, "envName", $$v)},expression:"form.envName"}}),_c('q-input',{attrs:{"filled":"","rules":['anyColor'],"label":this.$i18n('envBackgroundColor')},scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"colorize"}},[_c('q-popup-proxy',{attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-color',{model:{value:(_vm.form.envBackgroundColor),callback:function ($$v) {_vm.$set(_vm.form, "envBackgroundColor", $$v)},expression:"form.envBackgroundColor"}})],1)],1),_c('q-avatar',{style:({ backgroundColor: _vm.form.envBackgroundColor }),attrs:{"size":"24px"}})]},proxy:true}]),model:{value:(_vm.form.envBackgroundColor),callback:function ($$v) {_vm.$set(_vm.form, "envBackgroundColor", $$v)},expression:"form.envBackgroundColor"}}),_c('q-input',{attrs:{"filled":"","rules":['anyColor'],"label":this.$i18n('textColor')},scopedSlots:_vm._u([{key:"append",fn:function(){return [_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"colorize"}},[_c('q-popup-proxy',{attrs:{"transition-show":"scale","transition-hide":"scale"}},[_c('q-color',{model:{value:(_vm.form.textColor),callback:function ($$v) {_vm.$set(_vm.form, "textColor", $$v)},expression:"form.textColor"}})],1)],1),_c('q-avatar',{style:({ backgroundColor: _vm.form.textColor }),attrs:{"size":"24px"}})]},proxy:true}]),model:{value:(_vm.form.textColor),callback:function ($$v) {_vm.$set(_vm.form, "textColor", $$v)},expression:"form.textColor"}}),_c('q-select',{attrs:{"filled":"","options":_vm.ruleTypeOptions,"label":this.$i18n('ruleType'),"emit-value":"","map-options":""},model:{value:(_vm.form.ruleType),callback:function ($$v) {_vm.$set(_vm.form, "ruleType", $$v)},expression:"form.ruleType"}}),_c('q-input',{attrs:{"filled":"","label":this.$i18n('ruleValue'),"lazy-rules":"","rules":[ function (val) { return val && val.length > 0 || this$1.$i18n('ruleValueRequired'); }]},model:{value:(_vm.form.ruleValue),callback:function ($$v) {_vm.$set(_vm.form, "ruleValue", $$v)},expression:"form.ruleValue"}}),_c('q-select',{attrs:{"filled":"","options":_vm.shapeOptions,"label":this.$i18n('shape'),"emit-value":"","map-options":""},model:{value:(_vm.form.shape),callback:function ($$v) {_vm.$set(_vm.form, "shape", $$v)},expression:"form.shape"}}),_c('q-select',{attrs:{"filled":"","options":_vm.positionOptions,"label":this.$i18n('position'),"emit-value":"","map-options":""},model:{value:(_vm.form.position),callback:function ($$v) {_vm.$set(_vm.form, "position", $$v)},expression:"form.position"}}),_c('div',[_c('q-btn',{attrs:{"label":"Save","type":"submit","color":"primary"}}),_c('q-btn',{staticClass:"q-ml-sm",attrs:{"label":"Reset","type":"reset","color":"primary","flat":""}})],1)],1)],1)],1)],1),_c('q-dialog',{attrs:{"persistent":""},model:{value:(_vm.importConfirm),callback:function ($$v) {_vm.importConfirm=$$v},expression:"importConfirm"}},[_vm._v("i18n\n    "),_c('q-card',[_c('q-card-section',{staticClass:"row items-center"},[_c('q-avatar',{attrs:{"icon":"warning","color":"primary","text-color":"white"}}),_c('span',{staticClass:"q-ml-sm"},[_vm._v(_vm._s(_vm.$i18n('importWarning')))])],1),_c('q-card-actions',{attrs:{"align":"right"}},[_c('q-btn',{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{"flat":"","label":_vm.i18n('cancel'),"color":"secondary"}}),_c('q-btn',{attrs:{"flat":"","label":_vm.i18n('merge'),"color":"primary"},on:{"click":_vm.mergeImport}}),_c('q-btn',{attrs:{"flat":"","label":_vm.i18n('overwrite'),"color":"primary"},on:{"click":_vm.overwriteImport}})],1)],1)],1),_c('q-page-sticky',{attrs:{"position":"bottom-right","offset":[18, 18]}},[_c('q-btn',{attrs:{"fab":"","icon":"add","color":"secondary"},on:{"click":_vm.addEnv}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Index.vue?vue&type=template&id=c022bfaa&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__("2b3d");

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/extend.js
var extend = __webpack_require__("11ec");

// EXTERNAL MODULE: ./src/assets/defaultEnvs.json
var defaultEnvs = __webpack_require__("1e56");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// CONCATENATED MODULE: ./node_modules/@quasar/app/lib/webpack/loader.transform-quasar-imports.js!./node_modules/babel-loader/lib??ref--2-0!./node_modules/@quasar/app/lib/webpack/loader.auto-import-client.js?kebab!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Index.vue?vue&type=script&lang=js&



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
;



var browser = __webpack_require__("9845");

function downloadTextFile(text, name) {
  const a = document.createElement('a');
  const type = name.split(".").pop();
  a.href = URL.createObjectURL(new Blob([text], {
    type: `text/${type === "txt" ? "plain" : type}`
  }));
  a.download = name;
  a.click();
}

/* harmony default export */ var Indexvue_type_script_lang_js_ = ({
  name: 'PageIndex',

  data() {
    return {
      pagination: {
        rowsPerPage: -1 // current rows per page being displayed

      },
      // all envs stored
      envs: [],
      // current editing row index, if null then create;
      editRowIndex: null,
      form: {
        envName: null,
        envBackgroundColor: '#00a300',
        textColor: "#FFFFFF",
        ruleType: 'contains',
        ruleValue: '',
        position: 'left',
        shape: "ribbon"
      },
      ruleTypeOptions: [{
        label: this.$i18n('contains'),
        value: 'contains'
      }, {
        label: this.$i18n('prefix'),
        value: 'prefix'
      }, {
        label: this.$i18n('suffix'),
        value: 'suffix'
      }, {
        label: this.$i18n('regex'),
        value: 'regex'
      }],
      positionOptions: [{
        label: this.$i18n('left'),
        value: 'left'
      }, {
        label: this.$i18n('right'),
        value: 'right'
      }],
      shapeOptions: [{
        label: this.$i18n('ribbon'),
        value: 'ribbon'
      }, {
        label: this.$i18n('triangle'),
        value: 'triangle'
      }],
      accept: false,
      formShow: false,
      importConfirm: false,
      columns: [{
        name: 'index',
        required: true,
        label: this.$i18n('order'),
        align: 'center',
        field: 'index'
      }, {
        name: 'envName',
        required: true,
        label: this.$i18n('envName'),
        align: 'center',
        field: row => row.envName,
        format: val => `${val}`
      }, {
        name: 'ruleType',
        align: 'center',
        label: this.$i18n('ruleType'),
        field: 'ruleType',
        format: val => this.$i18n(val)
      }, {
        name: 'ruleValue',
        align: 'center',
        label: this.$i18n('ruleValue'),
        field: 'ruleValue'
      }, {
        name: 'envBackgroundColor',
        align: 'center',
        label: this.$i18n('envBackgroundColor'),
        field: 'envBackgroundColor'
      }, {
        name: 'textColor',
        align: 'center',
        label: this.$i18n('textColor'),
        field: 'textColor'
      }, {
        name: 'shape',
        align: 'center',
        label: this.$i18n('shape'),
        field: 'shape'
      }, {
        name: 'position',
        align: 'center',
        label: this.$i18n('position'),
        field: 'position'
      }, {
        name: 'operation',
        align: 'center',
        label: this.$i18n('operation'),
        field: 'operation'
      }],
      importData: {}
    };
  },

  methods: {
    onSubmit() {
      if (this.editRowIndex !== null) {
        this.$set(this.envs, this.editRowIndex, Object(extend["a" /* default */])(true, {}, this.form));
        console.log("editRowIndex", this.editRowIndex);
      } else {
        this.envs.push(Object(extend["a" /* default */])(true, {}, this.form));
      }

      let that = this;
      browser.storage.sync.set({
        "envs": this.envs
      }).then(() => {
        console.log('envs is set to ', that.envs);
      }); // reset editing status

      this.editRowIndex = null;
      this.formShow = false;
    },

    i18n: vue_runtime_esm["a" /* default */].prototype.$i18n,

    onReset() {
      this.form.envName = null;
      this.form.ruleType = 'contains';
      this.form.envBackgroundColor = '#00a300';
      this.form.ruleValue = '';
      this.form.position = 'left';
      this.form.textColor = '#FFFFFF';
      this.form.shape = 'ribbon';
    },

    addEnv() {
      this.editRowIndex = null;
      this.onReset();
      this.formShow = true;
    },

    edit(props) {
      console.log('editing row: ', props.rowIndex, props.row);
      this.editRowIndex = props.rowIndex;
      this.form = Object(extend["a" /* default */])(true, {}, props.row);
      this.formShow = true;
    },

    deleteEnv(props) {
      this.envs.splice(props.rowIndex, 1);
      browser.storage.sync.set({
        "envs": this.envs
      }).then(() => {
        console.log('envs is set to ' + this.envs);
      });
    },

    up(props) {
      let tmp = this.envs[props.rowIndex - 1];
      this.$set(this.envs, props.rowIndex - 1, this.envs[props.rowIndex]);
      this.$set(this.envs, props.rowIndex, tmp);
      browser.storage.sync.set({
        "envs": this.envs
      }).then(() => {
        console.log('envs is set to ' + this.envs);
      });
    },

    down(props) {
      let tmp = this.envs[props.rowIndex + 1];
      this.$set(this.envs, props.rowIndex + 1, this.envs[props.rowIndex]);
      this.$set(this.envs, props.rowIndex, tmp);
      browser.storage.sync.set({
        "envs": this.envs
      }).then(() => {
        console.log('envs is set to ' + this.envs);
      });
    },

    importJson() {
      this.$refs.jsonUploader.click();
    },

    uploadJsonChange(e) {
      let that = this;
      const reader = new FileReader();

      reader.onload = function fileReadCompleted() {
        that.importData = JSON.parse(reader.result);
        that.importConfirm = true; // clear

        that.$refs.jsonUploader.value = null;
      };

      reader.readAsText(this.$refs.jsonUploader.files[0]);
    },

    exportJson() {
      browser.storage.sync.get(['envs']).then(result => {
        downloadTextFile(JSON.stringify(result.envs), "env-indicator-export.json");
      });
    },

    mergeImport() {
      this.envs = this.envs.concat(this.importData);
      browser.storage.sync.set({
        'envs': this.envs
      });
      this.importConfirm = false;
    },

    overwriteImport() {
      this.envs = this.importData;
      browser.storage.sync.set({
        'envs': this.envs
      });
      this.importConfirm = false;
    }

  },

  mounted() {
    let that = this;
    browser.storage.sync.get(['envs']).then(result => {
      that.envs = result.envs;
      console.log('rules currently is ', result.envs); // put init data

      if (result.envs === undefined) {
        that.envs = defaultEnvs;
        browser.storage.sync.set({
          'envs': defaultEnvs
        });
      }
    });
  }

});
// CONCATENATED MODULE: ./src/pages/Index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Indexvue_type_script_lang_js_ = (Indexvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/page/QPage.js
var QPage = __webpack_require__("9989");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/table/QTable.js + 20 modules
var QTable = __webpack_require__("eaac");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/btn/QBtn.js + 1 modules
var QBtn = __webpack_require__("9c40");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/table/QTd.js
var QTd = __webpack_require__("db86");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/avatar/QAvatar.js
var QAvatar = __webpack_require__("cb32");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/btn-group/QBtnGroup.js
var QBtnGroup = __webpack_require__("e7a9");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/dialog/QDialog.js
var QDialog = __webpack_require__("24e8");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/card/QCard.js
var QCard = __webpack_require__("f09f");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/card/QCardSection.js
var QCardSection = __webpack_require__("a370");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/space/QSpace.js
var QSpace = __webpack_require__("2c91");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/form/QForm.js
var QForm = __webpack_require__("0378");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/input/QInput.js + 2 modules
var QInput = __webpack_require__("27f9");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/icon/QIcon.js
var QIcon = __webpack_require__("0016");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/popup-proxy/QPopupProxy.js
var QPopupProxy = __webpack_require__("7cbe");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/color/QColor.js + 8 modules
var QColor = __webpack_require__("b498");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/select/QSelect.js + 1 modules
var QSelect = __webpack_require__("ddd8");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/card/QCardActions.js
var QCardActions = __webpack_require__("4b7e");

// EXTERNAL MODULE: ./node_modules/quasar/src/components/page-sticky/QPageSticky.js
var QPageSticky = __webpack_require__("de5e");

// EXTERNAL MODULE: ./node_modules/quasar/src/directives/ClosePopup.js
var ClosePopup = __webpack_require__("7f67");

// EXTERNAL MODULE: ./node_modules/@quasar/app/lib/webpack/runtime.auto-import.js
var runtime_auto_import = __webpack_require__("eebe");
var runtime_auto_import_default = /*#__PURE__*/__webpack_require__.n(runtime_auto_import);

// CONCATENATED MODULE: ./src/pages/Index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_Indexvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Index = __webpack_exports__["default"] = (component.exports);



















runtime_auto_import_default()(component, 'components', {QPage: QPage["a" /* default */],QTable: QTable["a" /* default */],QBtn: QBtn["a" /* default */],QTd: QTd["a" /* default */],QAvatar: QAvatar["a" /* default */],QBtnGroup: QBtnGroup["a" /* default */],QDialog: QDialog["a" /* default */],QCard: QCard["a" /* default */],QCardSection: QCardSection["a" /* default */],QSpace: QSpace["a" /* default */],QForm: QForm["a" /* default */],QInput: QInput["a" /* default */],QIcon: QIcon["a" /* default */],QPopupProxy: QPopupProxy["a" /* default */],QColor: QColor["a" /* default */],QSelect: QSelect["a" /* default */],QCardActions: QCardActions["a" /* default */],QPageSticky: QPageSticky["a" /* default */]});runtime_auto_import_default()(component, 'directives', {ClosePopup: ClosePopup["a" /* default */]});


/***/ })

}]);