import './Settings.vue.css.proxy.js';
import {defineComponent, onBeforeMount, ref} from "../../snowpack/pkg/vue.js";
import ColorSwitch from "./components/ColorSwitch.vue.js";
import LanguageSelect from "./components/LanguageSelect.vue.js";
import Statistics from "./components/Statistics.vue.js";
import Dropdown from "./components/Dropdown.vue.js";
import SettingTile from "./components/SettingTile.vue.js";
import Onboarding from "./components/Onboarding.vue.js";
import Card from "./components/Card.vue.js";
import Toggle from "./components/Toggle.vue.js";
import AutoLogin from "./settingPages/AutoLogin.vue.js";
import Email from "./settingPages/Email.vue.js";
import OpalCourses from "./settingPages/OpalCourses.vue.js";
import ImproveOpal from "./settingPages/ImproveOpal.vue.js";
import ImproveSelma from "./settingPages/ImproveSelma.vue.js";
import Shortcuts from "./settingPages/Shortcuts.vue.js";
import SearchEngines from "./settingPages/SearchEngines.vue.js";
import Rockets from "./settingPages/Rockets.vue.js";
import Contact from "./settingPages/Contact.vue.js";
import Welcome from "./onboardingPages/01_Welcome.vue.js";
import SearchSetup from "./onboardingPages/02_SearchSetup.vue.js";
import LoginSetup from "./onboardingPages/03_LoginSetup.vue.js";
import LoginAccept from "./onboardingPages/04_LoginAccept.vue.js";
import EMailSetup from "./onboardingPages/05_EMailSetup.vue.js";
import OpalSetup from "./onboardingPages/06_OpalSetup.vue.js";
import DoneSetup from "./onboardingPages/07_DoneSetup.vue.js";
import settings from "./settings.json.proxy.js";
import onboardingSteps from "./onboarding.json.proxy.js";
import {useChrome} from "./composables/chrome.js";
import {useStepper} from "./composables/stepper.js";
const defaultExport = defineComponent({
  components: {
    ColorSwitch,
    LanguageSelect,
    Statistics,
    Dropdown,
    SettingTile,
    Card,
    Toggle,
    AutoLogin,
    Email,
    OpalCourses,
    ImproveOpal,
    ImproveSelma,
    Shortcuts,
    SearchEngines,
    Rockets,
    Contact,
    Onboarding,
    Welcome,
    SearchSetup,
    LoginSetup,
    LoginAccept,
    EMailSetup,
    OpalSetup,
    DoneSetup
  },
  setup() {
    const {getChromeLocalStorage, setChromeLocalStorage} = useChrome();
    const {hideWelcome, currentOnboardingStep} = useStepper();
    const showCard = ref(false);
    const currentSetting = ref(settings[0]);
    const animState = ref("dark");
    const openSetting = (setting) => {
      showCard.value = true;
      currentSetting.value = setting;
    };
    const toggleTheme = async () => {
      const theme = await getChromeLocalStorage("theme");
      if (animState.value === "dark") {
        await setChromeLocalStorage({theme: "light"});
      }
      if (animState.value === "light") {
        await setChromeLocalStorage({theme: "dark"});
      }
      updateTheme(theme === "dark" ? "light" : "dark");
    };
    const updateTheme = (theme) => {
      const setClass = (className) => document.documentElement.classList.add(className);
      const unsetClass = (className) => document.documentElement.classList.remove(className);
      if (theme === "dark") {
        animState.value = "dark";
        setClass("dark");
        unsetClass("light");
      } else if (theme === "light") {
        animState.value = "light";
        setClass("light");
        unsetClass("dark");
      }
    };
    const themeSetup = async () => {
      let selectedTheme = await getChromeLocalStorage("theme");
      if (selectedTheme === "system") {
        selectedTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        await setChromeLocalStorage({theme: selectedTheme});
      }
      updateTheme(selectedTheme);
    };
    onBeforeMount(async () => {
      hideWelcome.value = await getChromeLocalStorage("hideWelcome");
      themeSetup();
    });
    return {
      hideWelcome,
      onboardingSteps,
      currentOnboardingStep,
      showCard,
      settings,
      currentSetting,
      openSetting,
      toggleTheme,
      animState
    };
  }
});
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock, normalizeClass as _normalizeClass, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx, createCommentVNode as _createCommentVNode, Teleport as _Teleport, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "../../snowpack/pkg/vue.js"

const _withScopeId = n => (_pushScopeId("data-v-6e79b138"),n=n(),_popScopeId(),n)
const _hoisted_1 = { class: "main-grid" }
const _hoisted_2 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("header", { class: "main-grid__header" }, [
  /*#__PURE__*/_createElementVNode("h1", { class: "upper txt-bold main-grid__title" }, " Willkommen bei TUfast 🚀 "),
  /*#__PURE__*/_createElementVNode("h3", { class: "txt-bold main-grid__subtitle" }, " Hier kannst du alle Funktionen entdecken und Einstellungen vornehmen. ")
], -1))
const _hoisted_3 = { class: "main-grid__menues" }

export function render(_ctx, _cache) {
  const _component_ColorSwitch = _resolveComponent("ColorSwitch")
  const _component_Dropdown = _resolveComponent("Dropdown")
  const _component_Statistics = _resolveComponent("Statistics")
  const _component_LanguageSelect = _resolveComponent("LanguageSelect")
  const _component_SettingTile = _resolveComponent("SettingTile")
  const _component_Card = _resolveComponent("Card")
  const _component_Onboarding = _resolveComponent("Onboarding")

  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("div", _hoisted_1, [
      _hoisted_2,
      _createVNode(_component_ColorSwitch, {
        class: "main-grid__color-select",
        "anim-state": _ctx.animState,
        onClick: _cache[0] || (_cache[0] = $event => (_ctx.toggleTheme()))
      }, null, 8, ["anim-state"]),
      _createElementVNode("div", _hoisted_3, [
        _createVNode(_component_Dropdown),
        _createVNode(_component_Statistics),
        _createVNode(_component_LanguageSelect)
      ]),
      _createElementVNode("div", {
        class: _normalizeClass(["main-grid__settings", { 'main-grid__settings--no-overflow': _ctx.showCard }])
      }, [
        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.settings, (setting, index) => {
          return (_openBlock(), _createBlock(_component_SettingTile, {
            key: index,
            icon: setting.icon,
            title: setting.title,
            class: "main-grid__tile",
            onClick: $event => (_ctx.openSetting(setting))
          }, null, 8, ["icon", "title", "onClick"]))
        }), 128))
      ], 2)
    ]),
    (_ctx.showCard)
      ? (_openBlock(), _createBlock(_component_Card, {
          key: 0,
          title: _ctx.currentSetting.title,
          onCloseMe: _cache[1] || (_cache[1] = $event => (_ctx.showCard = false))
        }, {
          default: _withCtx(() => [
            (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.currentSetting.settingsPage)))
          ]),
          _: 1
        }, 8, ["title"]))
      : _createCommentVNode("", true),
    (!_ctx.hideWelcome)
      ? (_openBlock(), _createBlock(_Teleport, {
          key: 1,
          to: "body"
        }, [
          _createVNode(_component_Onboarding, {
            "current-step": _ctx.currentOnboardingStep,
            h1: _ctx.onboardingSteps[_ctx.currentOnboardingStep - 1].h1,
            h2: _ctx.onboardingSteps[_ctx.currentOnboardingStep - 1].h2
          }, {
            default: _withCtx(() => [
              (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.onboardingSteps[_ctx.currentOnboardingStep - 1].title)))
            ]),
            _: 1
          }, 8, ["current-step", "h1", "h2"])
        ]))
      : _createCommentVNode("", true)
  ], 64))
};

defaultExport.render = render;

defaultExport.__scopeId = "data-v-6e79b138";

export default defaultExport;