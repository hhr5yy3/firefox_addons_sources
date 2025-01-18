import { C as genericComponent, E as makeComponentProps, F as propsFactory, H as useResizeObserver, I as convertToUnit, J as getCurrentInstance, K as findChildrenWithProvide, L as getCurrentInstanceName, M as useColor, N as makeDensityProps, P as makeRoundedProps, Q as makeTagProps, R as makeThemeProps, S as provideTheme, T as useDensity, U as useRounded, W as provideDefaults, X as useRender, Y as getUid, Z as useProxiedModel, $ as deepEqual, a0 as wrapInArray, a1 as consoleWarn, a2 as IconValue, a3 as makeDimensionProps, a4 as makeLoaderProps, a5 as makeLocationProps, a6 as makeRouterProps, a7 as makeSizeProps, a8 as useDimension, a9 as useLoader, aa as useLocation, ab as useSize, ac as useLink, V as VIcon, ad as VDefaultsProvider, ae as VProgressCircular, af as Ripple, ag as useTextColor, ah as useLocale, c as VSwitch, a as _export_sfc, ai as useRtl, aj as mdiExport, ak as mdiImport, G as GerenciadorOpcoes, al as Depurador, am as Armazenamento, _ as _sfc_main$b, e as OPCOES_TEMA, f as defaultTheme, g as darkTheme, h as highContrastTheme, an as OPCOES_PALETA_CORES, ao as OPCOES_CARTAO_DE_PROCESSO, j as OPCOES_COPIAR_DADOS_DA_PECA, ap as OPCOES_COPIAR_DADOS_POLO, aq as EN_MAPA_CALOR_ORIGEM_DADOS, ar as EN_MAPA_CALOR_FORMATO_BARRA, u as useTheme, w as _sfc_main$c, y as AppLinkBtn, z as AppRadio, A as AppSpinner, B as vuetify } from "./high-contrast-theme-837e3c31.js";
import { capitalize, camelize, h, inject, computed, ref, reactive, shallowRef, onMounted, provide, isRef, createVNode, Fragment, unref, toRef, onBeforeUnmount, watch, onUpdated, mergeProps, nextTick, withDirectives, defineComponent, openBlock, createBlock, withCtx, createElementBlock, renderSlot, vShow, normalizeClass, createElementVNode, toDisplayString, vModelDynamic, createTextVNode, withModifiers, withKeys, vModelText, createCommentVNode, renderList, toRaw, pushScopeId, popScopeId, normalizeStyle, createApp } from "../vue.esm-browser.prod.js";
function createSimpleFunctional(klass) {
  let tag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div";
  let name = arguments.length > 2 ? arguments[2] : void 0;
  return genericComponent()({
    name: name ?? capitalize(camelize(klass.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: tag
      },
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _a;
        return h(props.tag, {
          class: [klass, props.class],
          style: props.style
        }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
  });
}
const VuetifyLayoutKey = Symbol.for("vuetify:layout");
const VuetifyLayoutItemKey = Symbol.for("vuetify:layout-item");
const ROOT_ZINDEX = 1e3;
const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout");
const generateLayers = (layout, positions, layoutSizes, activeItems) => {
  let previousLayer = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const layers = [{
    id: "",
    layer: {
      ...previousLayer
    }
  }];
  for (const id of layout) {
    const position = positions.get(id);
    const amount = layoutSizes.get(id);
    const active = activeItems.get(id);
    if (!position || !amount || !active)
      continue;
    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
    };
    layers.push({
      id,
      layer
    });
    previousLayer = layer;
  }
  return layers;
};
function createLayout(props) {
  const parentLayout = inject(VuetifyLayoutKey, null);
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
  const registered = ref([]);
  const positions = reactive(/* @__PURE__ */ new Map());
  const layoutSizes = reactive(/* @__PURE__ */ new Map());
  const priorities = reactive(/* @__PURE__ */ new Map());
  const activeItems = reactive(/* @__PURE__ */ new Map());
  const disabledTransitions = reactive(/* @__PURE__ */ new Map());
  const {
    resizeRef,
    contentRect: layoutRect
  } = useResizeObserver();
  const computedOverlaps = computed(() => {
    const map = /* @__PURE__ */ new Map();
    const overlaps = props.overlaps ?? [];
    for (const overlap of overlaps.filter((item) => item.includes(":"))) {
      const [top, bottom] = overlap.split(":");
      if (!registered.value.includes(top) || !registered.value.includes(bottom))
        continue;
      const topPosition = positions.get(top);
      const bottomPosition = positions.get(bottom);
      const topAmount = layoutSizes.get(top);
      const bottomAmount = layoutSizes.get(bottom);
      if (!topPosition || !bottomPosition || !topAmount || !bottomAmount)
        continue;
      map.set(bottom, {
        position: topPosition.value,
        amount: parseInt(topAmount.value, 10)
      });
      map.set(top, {
        position: bottomPosition.value,
        amount: -parseInt(bottomAmount.value, 10)
      });
    }
    return map;
  });
  const layers = computed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map((p) => p.value))].sort((a, b) => a - b);
    const layout = [];
    for (const p of uniquePriorities) {
      const items2 = registered.value.filter((id) => {
        var _a;
        return ((_a = priorities.get(id)) == null ? void 0 : _a.value) === p;
      });
      layout.push(...items2);
    }
    return generateLayers(layout, positions, layoutSizes, activeItems);
  });
  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some((ref2) => ref2.value);
  });
  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer;
  });
  const mainStyles = computed(() => {
    return {
      "--v-layout-left": convertToUnit(mainRect.value.left),
      "--v-layout-right": convertToUnit(mainRect.value.right),
      "--v-layout-top": convertToUnit(mainRect.value.top),
      "--v-layout-bottom": convertToUnit(mainRect.value.bottom),
      ...transitionsEnabled.value ? void 0 : {
        transition: "none"
      }
    };
  });
  const items = computed(() => {
    return layers.value.slice(1).map((_ref, index) => {
      let {
        id
      } = _ref;
      const {
        layer
      } = layers.value[index];
      const size = layoutSizes.get(id);
      const position = positions.get(id);
      return {
        id,
        ...layer,
        size: Number(size.value),
        position: position.value
      };
    });
  });
  const getLayoutItem = (id) => {
    return items.value.find((item) => item.id === id);
  };
  const rootVm = getCurrentInstance("createLayout");
  const isMounted = shallowRef(false);
  onMounted(() => {
    isMounted.value = true;
  });
  provide(VuetifyLayoutKey, {
    register: (vm, _ref2) => {
      let {
        id,
        order,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute
      } = _ref2;
      priorities.set(id, order);
      positions.set(id, position);
      layoutSizes.set(id, layoutSize);
      activeItems.set(id, active);
      disableTransitions && disabledTransitions.set(id, disableTransitions);
      const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm == null ? void 0 : rootVm.vnode);
      const instanceIndex = instances.indexOf(vm);
      if (instanceIndex > -1)
        registered.value.splice(instanceIndex, 0, id);
      else
        registered.value.push(id);
      const index = computed(() => items.value.findIndex((i) => i.id === id));
      const zIndex = computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
      const layoutItemStyles = computed(() => {
        const isHorizontal = position.value === "left" || position.value === "right";
        const isOppositeHorizontal = position.value === "right";
        const isOppositeVertical = position.value === "bottom";
        const size = elementSize.value ?? layoutSize.value;
        const unit = size === 0 ? "%" : "px";
        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? "X" : "Y"}(${(active.value ? 0 : -(size === 0 ? 100 : size)) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}${unit})`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? "absolute" : "fixed",
          ...transitionsEnabled.value ? void 0 : {
            transition: "none"
          }
        };
        if (!isMounted.value)
          return styles;
        const item = items.value[index.value];
        if (!item)
          throw new Error(`[Vuetify] Could not find layout item "${id}"`);
        const overlap = computedOverlaps.value.get(id);
        if (overlap) {
          item[overlap.position] += overlap.amount;
        }
        return {
          ...styles,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : void 0,
          left: isOppositeHorizontal ? void 0 : `${item.left}px`,
          right: isOppositeHorizontal ? `${item.right}px` : void 0,
          top: position.value !== "bottom" ? `${item.top}px` : void 0,
          bottom: position.value !== "top" ? `${item.bottom}px` : void 0,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : void 0
        };
      });
      const layoutItemScrimStyles = computed(() => ({
        zIndex: zIndex.value - 1
      }));
      return {
        layoutItemStyles,
        layoutItemScrimStyles,
        zIndex
      };
    },
    unregister: (id) => {
      priorities.delete(id);
      positions.delete(id);
      layoutSizes.delete(id);
      activeItems.delete(id);
      disabledTransitions.delete(id);
      registered.value = registered.value.filter((v) => v !== id);
    },
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex
  });
  const layoutClasses = computed(() => ["v-layout", {
    "v-layout--full-height": props.fullHeight
  }]);
  const layoutStyles = computed(() => ({
    zIndex: parentLayout ? rootZIndex.value : void 0,
    position: parentLayout ? "relative" : void 0,
    overflow: parentLayout ? "hidden" : void 0
  }));
  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutRef: resizeRef
  };
}
const VAlert$1 = "";
const VAlertTitle = createSimpleFunctional("v-alert-title");
const VBtn$1 = "";
const VBtnToggle = "";
const VBtnGroup$1 = "";
const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, "border");
function useBorder(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const borderClasses = computed(() => {
    const border = isRef(props) ? props.value : props.border;
    const classes = [];
    if (border === true || border === "") {
      classes.push(`${name}--border`);
    } else if (typeof border === "string" || border === 0) {
      for (const value of String(border).split(" ")) {
        classes.push(`border-${value}`);
      }
    }
    return classes;
  });
  return {
    borderClasses
  };
}
const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }
  }
}, "elevation");
function useElevation(props) {
  const elevationClasses = computed(() => {
    const elevation = isRef(props) ? props.value : props.elevation;
    const classes = [];
    if (elevation == null)
      return classes;
    classes.push(`elevation-${elevation}`);
    return classes;
  });
  return {
    elevationClasses
  };
}
const allowedVariants = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function genOverlays(isClickable, name) {
  return createVNode(Fragment, null, [isClickable && createVNode("span", {
    "key": "overlay",
    "class": `${name}__overlay`
  }, null), createVNode("span", {
    "key": "underlay",
    "class": `${name}__underlay`
  }, null)]);
}
const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (v) => allowedVariants.includes(v)
  }
}, "variant");
function useVariant(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const variantClasses = computed(() => {
    const {
      variant
    } = unref(props);
    return `${name}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = useColor(computed(() => {
    const {
      variant,
      color
    } = unref(props);
    return {
      [["elevated", "flat"].includes(variant) ? "background" : "text"]: color
    };
  }));
  return {
    colorClasses,
    colorStyles,
    variantClasses
  };
}
const makeVBtnGroupProps = propsFactory({
  baseColor: String,
  divided: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps()
}, "VBtnGroup");
const VBtnGroup = genericComponent()({
  name: "VBtnGroup",
  props: makeVBtnGroupProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBtn: {
        height: "auto",
        baseColor: toRef(props, "baseColor"),
        color: toRef(props, "color"),
        density: toRef(props, "density"),
        flat: true,
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-btn-group", {
          "v-btn-group--divided": props.divided
        }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": props.style
      }, slots);
    });
  }
});
const makeGroupProps = propsFactory({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group");
const makeGroupItemProps = propsFactory({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function useGroupItem(props, injectKey) {
  let required = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  const vm = getCurrentInstance("useGroupItem");
  if (!vm) {
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  }
  const id = getUid();
  provide(Symbol.for(`${injectKey.description}:id`), id);
  const group = inject(injectKey, null);
  if (!group) {
    if (!required)
      return group;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
  }
  const value = toRef(props, "value");
  const disabled = computed(() => !!(group.disabled.value || props.disabled));
  group.register({
    id,
    value,
    disabled
  }, vm);
  onBeforeUnmount(() => {
    group.unregister(id);
  });
  const isSelected = computed(() => {
    return group.isSelected(id);
  });
  const isFirst = computed(() => {
    return group.items.value[0].id === id;
  });
  const isLast = computed(() => {
    return group.items.value[group.items.value.length - 1].id === id;
  });
  const selectedClass = computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
  watch(isSelected, (value2) => {
    vm.emit("group:selected", {
      value: value2
    });
  }, {
    flush: "sync"
  });
  return {
    id,
    isSelected,
    isFirst,
    isLast,
    toggle: () => group.select(id, !isSelected.value),
    select: (value2) => group.select(id, value2),
    selectedClass,
    value,
    disabled,
    group
  };
}
function useGroup(props, injectKey) {
  let isUnmounted = false;
  const items = reactive([]);
  const selected = useProxiedModel(props, "modelValue", [], (v) => {
    if (v == null)
      return [];
    return getIds(items, wrapInArray(v));
  }, (v) => {
    const arr = getValues(items, v);
    return props.multiple ? arr : arr[0];
  });
  const groupVm = getCurrentInstance("useGroup");
  function register(item, vm) {
    const unwrapped = item;
    const key = Symbol.for(`${injectKey.description}:id`);
    const children = findChildrenWithProvide(key, groupVm == null ? void 0 : groupVm.vnode);
    const index = children.indexOf(vm);
    if (unref(unwrapped.value) == null) {
      unwrapped.value = index;
      unwrapped.useIndexAsValue = true;
    }
    if (index > -1) {
      items.splice(index, 0, unwrapped);
    } else {
      items.push(unwrapped);
    }
  }
  function unregister(id) {
    if (isUnmounted)
      return;
    forceMandatoryValue();
    const index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);
  }
  function forceMandatoryValue() {
    const item = items.find((item2) => !item2.disabled);
    if (item && props.mandatory === "force" && !selected.value.length) {
      selected.value = [item.id];
    }
  }
  onMounted(() => {
    forceMandatoryValue();
  });
  onBeforeUnmount(() => {
    isUnmounted = true;
  });
  onUpdated(() => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].useIndexAsValue) {
        items[i].value = i;
      }
    }
  });
  function select(id, value) {
    const item = items.find((item2) => item2.id === id);
    if (value && (item == null ? void 0 : item.disabled))
      return;
    if (props.multiple) {
      const internalValue = selected.value.slice();
      const index = internalValue.findIndex((v) => v === id);
      const isSelected = ~index;
      value = value ?? !isSelected;
      if (isSelected && props.mandatory && internalValue.length <= 1)
        return;
      if (!isSelected && props.max != null && internalValue.length + 1 > props.max)
        return;
      if (index < 0 && value)
        internalValue.push(id);
      else if (index >= 0 && !value)
        internalValue.splice(index, 1);
      selected.value = internalValue;
    } else {
      const isSelected = selected.value.includes(id);
      if (props.mandatory && isSelected)
        return;
      selected.value = value ?? !isSelected ? [id] : [];
    }
  }
  function step(offset) {
    if (props.multiple)
      consoleWarn('This method is not supported when using "multiple" prop');
    if (!selected.value.length) {
      const item = items.find((item2) => !item2.disabled);
      item && (selected.value = [item.id]);
    } else {
      const currentId = selected.value[0];
      const currentIndex = items.findIndex((i) => i.id === currentId);
      let newIndex = (currentIndex + offset) % items.length;
      let newItem = items[newIndex];
      while (newItem.disabled && newIndex !== currentIndex) {
        newIndex = (newIndex + offset) % items.length;
        newItem = items[newIndex];
      }
      if (newItem.disabled)
        return;
      selected.value = [items[newIndex].id];
    }
  }
  const state = {
    register,
    unregister,
    selected,
    select,
    disabled: toRef(props, "disabled"),
    prev: () => step(items.length - 1),
    next: () => step(1),
    isSelected: (id) => selected.value.includes(id),
    selectedClass: computed(() => props.selectedClass),
    items: computed(() => items),
    getItemIndex: (value) => getItemIndex(items, value)
  };
  provide(injectKey, state);
  return state;
}
function getItemIndex(items, value) {
  const ids = getIds(items, [value]);
  if (!ids.length)
    return -1;
  return items.findIndex((item) => item.id === ids[0]);
}
function getIds(items, modelValue) {
  const ids = [];
  modelValue.forEach((value) => {
    const item = items.find((item2) => deepEqual(value, item2.value));
    const itemByIndex = items[value];
    if ((item == null ? void 0 : item.value) != null) {
      ids.push(item.id);
    } else if (itemByIndex != null) {
      ids.push(itemByIndex.id);
    }
  });
  return ids;
}
function getValues(items, ids) {
  const values = [];
  ids.forEach((id) => {
    const itemIndex = items.findIndex((item) => item.id === id);
    if (~itemIndex) {
      const item = items[itemIndex];
      values.push(item.value != null ? item.value : itemIndex);
    }
  });
  return values;
}
const VBtnToggleSymbol = Symbol.for("vuetify:v-btn-toggle");
const makeVBtnToggleProps = propsFactory({
  ...makeVBtnGroupProps(),
  ...makeGroupProps()
}, "VBtnToggle");
genericComponent()({
  name: "VBtnToggle",
  props: makeVBtnToggleProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      next,
      prev,
      select,
      selected
    } = useGroup(props, VBtnToggleSymbol);
    useRender(() => {
      const btnGroupProps = VBtnGroup.filterProps(props);
      return createVNode(VBtnGroup, mergeProps({
        "class": ["v-btn-toggle", props.class]
      }, btnGroupProps, {
        "style": props.style
      }), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
            isSelected,
            next,
            prev,
            select,
            selected
          })];
        }
      });
    });
    return {
      next,
      prev,
      select
    };
  }
});
const positionValues = ["static", "relative", "fixed", "absolute", "sticky"];
const makePositionProps = propsFactory({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (v) => positionValues.includes(v)
    )
  }
}, "position");
function usePosition(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const positionClasses = computed(() => {
    return props.position ? `${name}--${props.position}` : void 0;
  });
  return {
    positionClasses
  };
}
function useSelectLink(link, select) {
  watch(() => {
    var _a;
    return (_a = link.isActive) == null ? void 0 : _a.value;
  }, (isActive) => {
    if (link.isLink.value && isActive && select) {
      nextTick(() => {
        select(true);
      });
    }
  }, {
    immediate: true
  });
}
const makeVBtnProps = propsFactory({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: VBtnToggleSymbol
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: IconValue,
  appendIcon: IconValue,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "button"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "elevated"
  })
}, "VBtn");
const VBtn = genericComponent()({
  name: "VBtn",
  props: makeVBtnProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const group = useGroupItem(props, props.symbol, false);
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _a;
      if (props.active !== void 0) {
        return props.active;
      }
      if (link.isLink.value) {
        return (_a = link.isActive) == null ? void 0 : _a.value;
      }
      return group == null ? void 0 : group.isSelected.value;
    });
    const color = computed(() => isActive.value ? props.activeColor ?? props.color : props.color);
    const variantProps = computed(() => {
      var _a, _b;
      const showColor = (group == null ? void 0 : group.isSelected.value) && (!link.isLink.value || ((_a = link.isActive) == null ? void 0 : _a.value)) || !group || ((_b = link.isActive) == null ? void 0 : _b.value);
      return {
        color: showColor ? color.value ?? props.baseColor : props.baseColor,
        variant: props.variant
      };
    });
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const isDisabled = computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
    const isElevated = computed(() => {
      return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
    });
    const valueAttr = computed(() => {
      if (props.value === void 0 || typeof props.value === "symbol")
        return void 0;
      return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
    });
    function onClick(e) {
      var _a;
      if (isDisabled.value || link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || attrs.target === "_blank"))
        return;
      (_a = link.navigate) == null ? void 0 : _a.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    useSelectLink(link, group == null ? void 0 : group.select);
    useRender(() => {
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasPrepend = !!(props.prependIcon || slots.prepend);
      const hasAppend = !!(props.appendIcon || slots.append);
      const hasIcon = !!(props.icon && props.icon !== true);
      return withDirectives(createVNode(Tag, {
        "type": Tag === "a" ? void 0 : "button",
        "class": ["v-btn", group == null ? void 0 : group.selectedClass.value, {
          "v-btn--active": isActive.value,
          "v-btn--block": props.block,
          "v-btn--disabled": isDisabled.value,
          "v-btn--elevated": isElevated.value,
          "v-btn--flat": props.flat,
          "v-btn--icon": !!props.icon,
          "v-btn--loading": props.loading,
          "v-btn--readonly": props.readonly,
          "v-btn--slim": props.slim,
          "v-btn--stacked": props.stacked
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, sizeStyles.value, props.style],
        "aria-busy": props.loading ? true : void 0,
        "disabled": isDisabled.value || void 0,
        "href": link.href.value,
        "tabindex": props.loading || props.readonly ? -1 : void 0,
        "onClick": onClick,
        "value": valueAttr.value
      }, {
        default: () => {
          var _a;
          return [genOverlays(true, "v-btn"), !props.icon && hasPrepend && createVNode("span", {
            "key": "prepend",
            "class": "v-btn__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.prependIcon,
            "defaults": {
              VIcon: {
                icon: props.prependIcon
              }
            }
          }, slots.prepend)]), createVNode("span", {
            "class": "v-btn__content",
            "data-no-activator": ""
          }, [!slots.default && hasIcon ? createVNode(VIcon, {
            "key": "content-icon",
            "icon": props.icon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "content-defaults",
            "disabled": !hasIcon,
            "defaults": {
              VIcon: {
                icon: props.icon
              }
            }
          }, {
            default: () => {
              var _a2;
              return [((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) ?? props.text];
            }
          })]), !props.icon && hasAppend && createVNode("span", {
            "key": "append",
            "class": "v-btn__append"
          }, [!slots.append ? createVNode(VIcon, {
            "key": "append-icon",
            "icon": props.appendIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !props.appendIcon,
            "defaults": {
              VIcon: {
                icon: props.appendIcon
              }
            }
          }, slots.append)]), !!props.loading && createVNode("span", {
            "key": "loader",
            "class": "v-btn__loader"
          }, [((_a = slots.loader) == null ? void 0 : _a.call(slots)) ?? createVNode(VProgressCircular, {
            "color": typeof props.loading === "boolean" ? void 0 : props.loading,
            "indeterminate": true,
            "width": "2"
          }, null)])];
        }
      }), [[Ripple, !isDisabled.value && props.ripple, "", {
        center: !!props.icon
      }]]);
    });
    return {
      group
    };
  }
});
const allowedTypes = ["success", "info", "warning", "error"];
const makeVAlertProps = propsFactory({
  border: {
    type: [Boolean, String],
    validator: (val) => {
      return typeof val === "boolean" || ["top", "end", "bottom", "start"].includes(val);
    }
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$close"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  icon: {
    type: [Boolean, String, Function, Object],
    default: null
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  prominent: Boolean,
  title: String,
  text: String,
  type: {
    type: String,
    validator: (val) => allowedTypes.includes(val)
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "VAlert");
const VAlert = genericComponent()({
  name: "VAlert",
  props: makeVAlertProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const icon = computed(() => {
      if (props.icon === false)
        return void 0;
      if (!props.type)
        return props.icon;
      return props.icon ?? `$${props.type}`;
    });
    const variantProps = computed(() => ({
      color: props.color ?? props.type,
      variant: props.variant
    }));
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "borderColor"));
    const {
      t
    } = useLocale();
    const closeProps = computed(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    return () => {
      const hasPrepend = !!(slots.prepend || icon.value);
      const hasTitle = !!(slots.title || props.title);
      const hasClose = !!(slots.close || props.closable);
      return isActive.value && createVNode(props.tag, {
        "class": ["v-alert", props.border && {
          "v-alert--border": !!props.border,
          [`v-alert--border-${props.border === true ? "start" : props.border}`]: true
        }, {
          "v-alert--prominent": props.prominent
        }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, props.style],
        "role": "alert"
      }, {
        default: () => {
          var _a, _b;
          return [genOverlays(false, "v-alert"), props.border && createVNode("div", {
            "key": "border",
            "class": ["v-alert__border", textColorClasses.value],
            "style": textColorStyles.value
          }, null), hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-alert__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "density": props.density,
            "icon": icon.value,
            "size": props.prominent ? 44 : 28
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !icon.value,
            "defaults": {
              VIcon: {
                density: props.density,
                icon: icon.value,
                size: props.prominent ? 44 : 28
              }
            }
          }, slots.prepend)]), createVNode("div", {
            "class": "v-alert__content"
          }, [hasTitle && createVNode(VAlertTitle, {
            "key": "title"
          }, {
            default: () => {
              var _a2;
              return [((_a2 = slots.title) == null ? void 0 : _a2.call(slots)) ?? props.title];
            }
          }), ((_a = slots.text) == null ? void 0 : _a.call(slots)) ?? props.text, (_b = slots.default) == null ? void 0 : _b.call(slots)]), slots.append && createVNode("div", {
            "key": "append",
            "class": "v-alert__append"
          }, [slots.append()]), hasClose && createVNode("div", {
            "key": "close",
            "class": "v-alert__close"
          }, [!slots.close ? createVNode(VBtn, mergeProps({
            "key": "close-btn",
            "icon": props.closeIcon,
            "size": "x-small",
            "variant": "text"
          }, closeProps.value), null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VBtn: {
                icon: props.closeIcon,
                size: "x-small",
                variant: "text"
              }
            }
          }, {
            default: () => {
              var _a2;
              return [(_a2 = slots.close) == null ? void 0 : _a2.call(slots, {
                props: closeProps.value
              })];
            }
          })])];
        }
      });
    };
  }
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "AppWarning",
  props: {
    texto: { default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$8), null, {
        default: withCtx(() => [
          createVNode(VAlert, {
            title: "Cuidado!!!",
            text: _ctx.texto,
            type: "error"
          }, null, 8, ["text"])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "AppSwitch",
  props: {
    modelValue: { type: Boolean, default: false },
    textoAtivado: { default: "Ativado" },
    textoDesativado: { default: "Desativado" },
    estiloLabel: { default: "" }
  },
  emits: ["update:model-value"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ativada = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:model-value", val)
    });
    const label = computed(() => ativada.value ? props.textoAtivado : props.textoDesativado);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(VSwitch, {
        modelValue: ativada.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ativada.value = $event),
        label: label.value,
        autofocus: "",
        color: "extensionActivatedSwitch",
        "hide-details": ""
      }, null, 8, ["modelValue", "label"]);
    };
  }
});
const AppSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-2ab1b12d"]]);
const VApp$1 = "";
const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps({
    fullHeight: true
  }),
  ...makeThemeProps()
}, "VApp");
const VApp = genericComponent()({
  name: "VApp",
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      rtlClasses
    } = useRtl();
    useRender(() => {
      var _a;
      return createVNode("div", {
        "ref": layoutRef,
        "class": ["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class],
        "style": [props.style]
      }, [createVNode("div", {
        "class": "v-application__wrap"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    });
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Vuetify",
  props: {
    appPadrao: { type: Boolean }
  },
  setup(__props) {
    const mounted = ref(false);
    const props = __props;
    const mainDiv = ref(null);
    onMounted(() => {
      setTimeout(() => {
        mounted.value = true;
        !props.appPadrao && ajustarVuetifyDiv();
      }, 200);
    });
    function ajustarVuetifyDiv() {
      var _a, _b;
      const vDiv = (_a = mainDiv.value) == null ? void 0 : _a.querySelector(
        "div.pjemrVuetify div.v-application"
      );
      const vDivWrap = (_b = mainDiv.value) == null ? void 0 : _b.querySelector(
        "div.pjemrVuetify div.v-application__wrap"
      );
      if (!vDiv || !vDivWrap) {
        return;
      }
      vDivWrap.style.minHeight = "unset";
      vDiv.style.background = "unset";
    }
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        ref_key: "mainDiv",
        ref: mainDiv,
        class: "pjemrVuetify"
      }, [
        createVNode(unref(VApp), null, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        })
      ], 512)), [
        [vShow, mounted.value]
      ]);
    };
  }
});
const _hoisted_1$5 = ["for"];
const _hoisted_2$4 = ["id", "type", "disabled"];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AppInput",
  props: {
    modelValue: { default: void 0 },
    label: { default: "[LABEL]" },
    inputType: {},
    subItemId: {},
    idg: {},
    groupClass: {},
    toDisable: { type: Boolean }
  },
  emits: ["update:model-value"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const valor = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:model-value", val)
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`app_input_group ${_ctx.groupClass ? _ctx.groupClass : ""} ${_ctx.toDisable ? "desabilitado" : ""}`)
      }, [
        createElementVNode("label", { for: _ctx.idg }, toDisplayString(_ctx.label), 9, _hoisted_1$5),
        withDirectives(createElementVNode("input", {
          id: _ctx.idg,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => valor.value = $event),
          type: _ctx.inputType,
          disabled: _ctx.toDisable
        }, null, 8, _hoisted_2$4), [
          [vModelDynamic, valor.value]
        ])
      ], 2);
    };
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AppExportar",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(VBtn, {
        variant: "outlined",
        "prepend-icon": unref(mdiExport)
      }, {
        default: withCtx(() => [
          createTextVNode(" Exportar configurações ")
        ]),
        _: 1
      }, 8, ["prepend-icon"]);
    };
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AppImportar",
  emits: ["importado"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const importar = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".txt";
      input.multiple = true;
      input.addEventListener("change", () => {
        const arquivos = input.files;
        if (arquivos) {
          const arquivo = arquivos[0];
          arquivo.text().then((res) => {
            const jsonImportado = JSON.parse(res);
            emit("importado", jsonImportado);
          });
        }
      });
      input.click();
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(VBtn, {
        variant: "outlined",
        "prepend-icon": unref(mdiImport),
        onClick: importar
      }, {
        default: withCtx(() => [
          createTextVNode(" Importar configurações ")
        ]),
        _: 1
      }, 8, ["prepend-icon"]);
    };
  }
});
function guidGenerator() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
class GerenciadorOpcoesFiltros extends GerenciadorOpcoes {
  constructor(callback) {
    super(callback);
    this.nome = "GerenciadorOpcoesFiltros";
  }
  obterSetorPeloIndice(indice) {
    const setores = this.obterSetores();
    if (!Array.isArray(setores) || indice < 0 || indice >= setores.length) {
      return "";
    }
    return setores[indice];
  }
  obterIndicePelaTarefa(setor, tarefa) {
    const perfil = this.obterPerfilAtivo();
    return this.opcoes.filtros.perfis[perfil].setores[setor].indexOf(tarefa);
  }
  setorValidado(setor) {
    const perfil = this.obterPerfilAtivo();
    if (!perfil) {
      return false;
    }
    if (typeof setor === "number")
      setor = this.obterSetorPeloIndice(setor);
    if (setor === null || setor === "")
      return false;
    const valido = perfil && setor in this.opcoes.filtros.perfis[perfil].setores;
    if (!valido) {
      return false;
    }
    return true;
  }
  tarefaValidada(setor, tarefa) {
    if (!this.setorValidado(setor))
      return false;
    if (typeof setor === "number")
      setor = this.obterSetorPeloIndice(setor);
    if (setor === null || setor === "")
      return false;
    this.obterPerfilAtivo();
    const indice = typeof tarefa === "string" ? this.obterIndicePelaTarefa(setor, tarefa) : tarefa;
    if (indice < 0) {
      return false;
    }
    return true;
  }
  obterPerfilAtivo() {
    return this.opcoes.filtros.perfilAtivo;
  }
  obterSetores() {
    const perfil = this.obterPerfilAtivo();
    return Object.keys(this.opcoes.filtros.perfis[perfil].setores);
  }
  obterTarefas(setor) {
    if (typeof setor === "number")
      setor = this.obterSetorPeloIndice(setor);
    if (setor === null || setor === "")
      return [];
    const perfil = this.obterPerfilAtivo();
    return this.opcoes.filtros.perfis[perfil].setores[setor];
  }
  ativarPerfil(perfil) {
    this.opcoes.filtros.perfilAtivo = perfil;
    Depurador.console.info(`[~/services/${this.nome}] Alterando o perfil ativo para "${perfil}"`);
    Armazenamento.guardar({ filtros: this.opcoes.filtros });
  }
  adicionarSetor(setor) {
    if (typeof setor === "number")
      setor = this.obterSetorPeloIndice(setor);
    if (setor === null || setor.trim() === "")
      return;
    const perfil = this.obterPerfilAtivo();
    this.opcoes.filtros.perfis[perfil].setores[setor.trim()] = [];
    Depurador.console.info(
      `[~/services/${this.nome}] Criando setor "${setor}" o perfil ativo para "${perfil}"`
    );
    Armazenamento.guardar({ filtros: this.opcoes.filtros });
  }
  alterarSetor(setor, novoNome) {
    if (!this.setorValidado(setor))
      return;
    if (typeof setor === "number")
      setor = this.obterSetorPeloIndice(setor);
    if (setor === null || setor.trim() === "" || novoNome.trim() === "")
      return;
    const perfil = this.obterPerfilAtivo();
    const tarefas = this.obterTarefas(setor);
    this.opcoes.filtros.perfis[perfil].setores[novoNome] = tarefas;
    delete this.opcoes.filtros.perfis[perfil].setores[setor];
    Depurador.console.info(
      `[~/services/${this.nome}] Alterando o nome do setor "${setor}" (perfil "${perfil}") para "${novoNome}"`
    );
    Armazenamento.guardar({ filtros: this.opcoes.filtros });
  }
  removerSetor(setor) {
    if (!this.setorValidado(setor))
      return;
    if (typeof setor === "number")
      setor = this.obterSetorPeloIndice(setor);
    if (setor === null)
      return;
    const perfil = this.obterPerfilAtivo();
    delete this.opcoes.filtros.perfis[perfil].setores[setor];
    Depurador.console.info(
      `[~/services/${this.nome}] Removendo setor "${setor}" (perfil "${perfil}")`
    );
    Armazenamento.guardar({ filtros: this.opcoes.filtros });
  }
  reposicionarSetor(indiceAtual, indiceNovo) {
    if (!this.setorValidado(indiceAtual) || !this.setorValidado(indiceNovo))
      return;
    const perfil = this.obterPerfilAtivo();
    const setores = this.obterSetores();
    const setor = setores[indiceAtual];
    setores.splice(indiceAtual, 1);
    setores.splice(indiceNovo, 0, setor);
    const novo = setores.reduce((obj, setor2) => {
      obj[setor2] = this.opcoes.filtros.perfis[perfil].setores[setor2];
      return obj;
    }, {});
    this.opcoes.filtros.perfis[perfil].setores = novo;
    Depurador.console.info(
      `[~/services/${this.nome}] Reposicionando setor "${setor}" (perfil "${perfil}") da posição ${indiceAtual} para ${indiceNovo}`
    );
    Armazenamento.guardar({ filtros: this.opcoes.filtros });
  }
  adicionarTarefa(setor, tarefa) {
    if (!this.setorValidado(setor))
      return;
    if (typeof setor === "number")
      setor = this.obterSetorPeloIndice(setor);
    if (setor === null || setor === "")
      return;
    const perfil = this.obterPerfilAtivo();
    if (!(tarefa instanceof Array)) {
      this.opcoes.filtros.perfis[perfil].setores[setor].push(tarefa);
      Armazenamento.guardar({ filtros: this.opcoes.filtros });
      return;
    }
    for (const unidadeTarefa of tarefa) {
      this.opcoes.filtros.perfis[perfil].setores[setor].push(unidadeTarefa);
      Armazenamento.guardar({ filtros: this.opcoes.filtros });
    }
  }
  alterarTarefa(setor, indiceTarefa, novoNome) {
    if (!this.tarefaValidada(setor, indiceTarefa))
      return;
    const perfil = this.obterPerfilAtivo();
    if (typeof setor === "number")
      setor = this.obterSetorPeloIndice(setor);
    if (setor === null || setor === "")
      return;
    const nomeTarefa = this.opcoes.filtros.perfis[perfil].setores[setor][indiceTarefa];
    this.opcoes.filtros.perfis[perfil].setores[setor][indiceTarefa] = novoNome;
    Depurador.console.info(
      `[~/services/${this.nome}] Alterando o nome da tarefa "${nomeTarefa}" (setor "${setor}", perfil "${perfil}") para "${novoNome}"`
    );
    Armazenamento.guardar({ filtros: this.opcoes.filtros });
  }
  removerTarefa(setor, indiceTarefa) {
    if (!this.tarefaValidada(setor, indiceTarefa))
      return;
    const perfil = this.obterPerfilAtivo();
    if (typeof setor === "number")
      setor = this.obterSetorPeloIndice(setor);
    if (setor === null || setor === "")
      return;
    const nomeTarefa = this.opcoes.filtros.perfis[perfil].setores[setor][indiceTarefa];
    this.opcoes.filtros.perfis[perfil].setores[setor].splice(indiceTarefa, 1);
    Depurador.console.info(
      `[~/services/${this.nome}] Removendo tarefa "${nomeTarefa}" (setor "${setor}", perfil "${perfil}")`
    );
    Armazenamento.guardar({ filtros: this.opcoes.filtros });
  }
  reposicionarTarefa(setor, indiceAtualTarefa, indiceNovoTarefa) {
    if (!this.tarefaValidada(setor, indiceAtualTarefa) || !this.tarefaValidada(setor, indiceNovoTarefa))
      return;
    const perfil = this.obterPerfilAtivo();
    if (typeof setor === "number")
      setor = this.obterSetorPeloIndice(setor);
    if (setor === null || setor === "")
      return;
    const nomeTarefa = this.opcoes.filtros.perfis[perfil].setores[setor][indiceAtualTarefa];
    this.opcoes.filtros.perfis[perfil].setores[setor].splice(indiceAtualTarefa, 1);
    this.opcoes.filtros.perfis[perfil].setores[setor].splice(indiceNovoTarefa, 0, nomeTarefa);
    Depurador.console.info(
      `[~/services/${this.nome}] Reposicionando tarefa "${nomeTarefa}" (setor "${setor}", perfil "perfil") da posição ${indiceAtualTarefa} para ${indiceNovoTarefa}`
    );
    Armazenamento.guardar({ filtros: this.opcoes.filtros });
  }
}
const _hoisted_1$4 = ["draggable"];
const _hoisted_2$3 = { class: "app_lista_item__handle" };
const _hoisted_3$2 = { class: "app_lista_item__texto" };
const _hoisted_4$2 = { key: 0 };
const _hoisted_5$2 = {
  key: 1,
  class: "app_lista_item__input"
};
const _hoisted_6$2 = { class: "app_lista_item__controles" };
const _hoisted_7$2 = { class: "app_lista_item__controles__crud" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ListaValoresItem",
  props: {
    estatico: { type: Boolean, default: false },
    conteudo: { default: "" },
    ativo: { type: Boolean, default: false },
    setores: { type: Boolean, default: false }
  },
  emits: [
    "selecionado",
    "arrastando",
    "atingido",
    "alterado",
    "removido",
    "exportado"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const realcado = ref(false);
    const editando = ref(false);
    const arrastando = ref(false);
    const novoConteudo = ref("");
    const editar = () => {
      novoConteudo.value = props.conteudo;
      editando.value = true;
    };
    const atualizar = () => {
      editando.value = false;
      emit("alterado", novoConteudo.value);
    };
    const iniciando = () => {
      if (props.estatico)
        return;
      arrastando.value = true;
      emit("arrastando", true);
    };
    const finalizando = () => {
      if (props.estatico)
        return;
      arrastando.value = false;
      emit("arrastando", false);
    };
    const atingido = () => {
      if (props.estatico)
        return;
      realcar(false);
      emit("atingido");
    };
    const realcar = (status) => {
      if (props.estatico)
        return;
      realcado.value = status;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["app_lista_item__container", { realcado: realcado.value, arrastando: arrastando.value, ativo: _ctx.ativo }])
      }, [
        createElementVNode("button", {
          draggable: arrastando.value,
          onDragstart: iniciando,
          onDragend: finalizando,
          onDragenter: _cache[5] || (_cache[5] = withModifiers(($event) => realcar(true), ["prevent"])),
          onDragover: _cache[6] || (_cache[6] = withModifiers(($event) => realcar(true), ["prevent"])),
          onDragleave: _cache[7] || (_cache[7] = withModifiers(($event) => realcar(false), ["prevent"])),
          onDrop: atingido
        }, [
          createElementVNode("div", _hoisted_2$3, [
            createVNode(unref(_sfc_main$b), {
              nome: "mdi-drag",
              onMousedown: _cache[0] || (_cache[0] = ($event) => arrastando.value = true),
              onMouseup: _cache[1] || (_cache[1] = ($event) => arrastando.value = false)
            })
          ]),
          createElementVNode("div", _hoisted_3$2, [
            !editando.value ? (openBlock(), createElementBlock("span", _hoisted_4$2, toDisplayString(_ctx.conteudo), 1)) : (openBlock(), createElementBlock("span", _hoisted_5$2, [
              withDirectives(createElementVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => novoConteudo.value = $event),
                type: "text",
                onKeydown: [
                  _cache[3] || (_cache[3] = withKeys(($event) => editando.value = false, ["esc"])),
                  withKeys(atualizar, ["enter"])
                ]
              }, null, 544), [
                [vModelText, novoConteudo.value]
              ]),
              editando.value ? (openBlock(), createBlock(unref(_sfc_main$b), {
                key: 0,
                nome: "mdi-close",
                class: "app_lista__icone_fechar",
                title: "cancelar",
                onClick: _cache[4] || (_cache[4] = ($event) => editando.value = false)
              })) : createCommentVNode("", true),
              editando.value ? (openBlock(), createBlock(unref(_sfc_main$b), {
                key: 1,
                nome: "mdi-check",
                class: "app_lista__icone_salvar",
                title: "salvar",
                onClick: atualizar
              })) : createCommentVNode("", true)
            ]))
          ])
        ], 40, _hoisted_1$4),
        createElementVNode("span", _hoisted_6$2, [
          createElementVNode("span", _hoisted_7$2, [
            createVNode(unref(_sfc_main$b), {
              nome: "mdi-pencil",
              title: "editar",
              onClick: editar
            }),
            createVNode(unref(_sfc_main$b), {
              nome: "mdi-delete",
              title: "remover",
              onClick: _cache[8] || (_cache[8] = ($event) => emit("removido"))
            }),
            _ctx.setores ? (openBlock(), createBlock(unref(_sfc_main$b), {
              key: 0,
              nome: "mdi-export",
              title: "exportar setor",
              onClick: _cache[9] || (_cache[9] = ($event) => emit("exportado"))
            })) : createCommentVNode("", true)
          ])
        ])
      ], 2);
    };
  }
});
const ListaValoresItem_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$3 = { class: "app_lista__container" };
const _hoisted_2$2 = { class: "app_lista__adicionar" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ListaValores",
  props: {
    lista: { default: () => [] },
    itemAtivo: { default: -1 },
    estatica: { type: Boolean, default: false },
    setores: { type: Boolean, default: false }
  },
  emits: [
    "adicionado",
    "alterado",
    "removido",
    "reposicionado",
    "selecionado",
    "exportado",
    "importado"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const novoItem = ref("");
    const arrastando = ref(-1);
    const selecionado = ref(props.itemAtivo);
    const acompanhar = (index, status) => {
      arrastando.value = status === true ? index : -1;
      selecionado.value = status === true ? index : -1;
      emit("selecionado", selecionado.value);
    };
    const alterar = (indice, conteudo) => {
      if (conteudo.length && conteudo !== props.lista[indice]) {
        emit("alterado", { indice, conteudo });
      }
    };
    const remover = (indice) => {
      emit("removido", indice);
    };
    const exportar = (indice) => {
      emit("exportado", indice);
    };
    const importar = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".txt";
      input.multiple = true;
      input.addEventListener("change", () => {
        const arquivos = input.files;
        if (arquivos) {
          const arquivo = arquivos[0];
          arquivo.text().then((res) => {
            const jsonImportado = JSON.parse(res);
            const setorNovo = {};
            setorNovo[jsonImportado.setor] = jsonImportado.tarefas;
            emit("importado", setorNovo);
          });
        }
      });
      input.click();
    };
    const reposicionar = (alvo) => {
      if (arrastando.value >= 0 && arrastando.value !== alvo) {
        emit("reposicionado", { origem: arrastando.value, alvo });
      }
    };
    const selecionar = (indice) => {
      selecionado.value = indice === selecionado.value ? -1 : indice;
      emit("selecionado", selecionado.value);
    };
    const adicionar = () => {
      if (novoItem.value.trim()) {
        emit("adicionado", novoItem.value.trim());
      }
      novoItem.value = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createElementVNode("div", _hoisted_2$2, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => novoItem.value = $event),
            type: "text",
            onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => adicionar(), ["enter"]))
          }, null, 544), [
            [vModelText, novoItem.value]
          ]),
          createVNode(unref(_sfc_main$b), {
            class: "icone",
            nome: "mdi-plus-circle-outline",
            title: "adicionar",
            onClick: _cache[2] || (_cache[2] = ($event) => adicionar())
          }),
          _ctx.setores ? (openBlock(), createBlock(unref(_sfc_main$b), {
            key: 0,
            class: "icone",
            nome: "mdi-import",
            title: "importar setor",
            onClick: _cache[3] || (_cache[3] = ($event) => importar())
          })) : createCommentVNode("", true)
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.lista, (item, indice) => {
          return openBlock(), createBlock(_sfc_main$4, {
            key: `item-${indice}`,
            conteudo: item,
            estatico: _ctx.estatica,
            ativo: selecionado.value === indice,
            setores: _ctx.setores,
            class: "app_lista__item",
            onArrastando: ($event) => acompanhar(indice, $event),
            onAtingido: ($event) => reposicionar(indice),
            onRemovido: ($event) => remover(indice),
            onExportado: ($event) => exportar(indice),
            onAlterado: ($event) => alterar(indice, $event),
            onClick: ($event) => selecionar(indice)
          }, null, 8, ["conteudo", "estatico", "ativo", "setores", "onArrastando", "onAtingido", "onRemovido", "onExportado", "onAlterado", "onClick"]);
        }), 128))
      ]);
    };
  }
});
const ListaValores_vue_vue_type_style_index_0_lang = "";
function salvaArquivo(texto, nomeDoArquivoComExtensao) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(texto);
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", nomeDoArquivoComExtensao);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
const _withScopeId = (n) => (pushScopeId("data-v-b3b88e7d"), n = n(), popScopeId(), n);
const _hoisted_1$2 = {
  key: 0,
  class: "div-mae"
};
const _hoisted_2$1 = { class: "cabecalho" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", null, "Perfil ativo:", -1));
const _hoisted_4$1 = { class: "guias" };
const _hoisted_5$1 = ["onClick"];
const _hoisted_6$1 = { class: "setores" };
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("legend", null, "Setores", -1));
const _hoisted_8$1 = { class: "tarefas" };
const _hoisted_9$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("legend", null, "Tarefas", -1));
const _hoisted_10$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("p", null, 'Use "$"" para pesquisas exatas. Ex.: $[JEF] Triagem inicial', -1));
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EditorFiltros",
  setup(__props) {
    const opcoesCarregadas = ref(false);
    const setorAtivo = ref(-1);
    const tarefaAtiva = ref(-1);
    const perfilAtivo = ref("");
    const opcoes = reactive({});
    const gerenciadorOpcoesFiltros = new GerenciadorOpcoesFiltros((dados) => {
      Object.assign(opcoes, dados);
      perfilAtivo.value = toRaw(opcoes.filtros.perfilAtivo);
      if (!opcoesCarregadas.value) {
        ativarSetor(0);
        ativarTarefa(0);
      }
      opcoesCarregadas.value = true;
    });
    const ativarPerfil = async (perfil) => {
      gerenciadorOpcoesFiltros.ativarPerfil(perfil);
      perfilAtivo.value = perfil;
      ativarSetor(0);
      ativarTarefa(0);
    };
    const ativarSetor = (indice) => {
      const setores = gerenciadorOpcoesFiltros.obterSetores();
      if (indice >= 0 && indice < setores.length) {
        setorAtivo.value = indice;
        ativarTarefa(0);
      } else {
        setorAtivo.value = -1;
        tarefaAtiva.value = -1;
      }
    };
    const exportarSetor = (indice) => {
      const setores = gerenciadorOpcoesFiltros.obterSetores();
      if (indice >= 0 && indice < setores.length) {
        const setor = setores[indice];
        const tarefas = gerenciadorOpcoesFiltros.obterTarefas(setores[indice]);
        salvaArquivo(JSON.stringify({ setor, tarefas }), `${setores[indice]}.txt`);
      }
    };
    const importaSetor = (novoSetor) => {
      for (const [setor, tarefas] of Object.entries(novoSetor)) {
        adicionarSetor(setor);
        adicionarTarefa(tarefas, setor);
      }
    };
    const ativarTarefa = (indice) => {
      const tarefas = gerenciadorOpcoesFiltros.obterTarefas(setorAtivo.value);
      if (Array.isArray(tarefas) && indice >= 0 && indice < tarefas.length) {
        tarefaAtiva.value = indice;
      } else {
        tarefaAtiva.value = -1;
      }
    };
    const adicionarSetor = (nome) => {
      gerenciadorOpcoesFiltros.adicionarSetor(nome);
    };
    const removerSetor = (indice) => {
      gerenciadorOpcoesFiltros.removerSetor(indice);
      setorAtivo.value = -1;
    };
    const alterarSetor = ({ indice, conteudo }) => {
      gerenciadorOpcoesFiltros.alterarSetor(indice, conteudo);
    };
    const reposicionarSetor = ({ origem, alvo }) => {
      gerenciadorOpcoesFiltros.reposicionarSetor(origem, alvo);
    };
    const adicionarTarefa = (tarefa, setor = "") => {
      if (setor) {
        gerenciadorOpcoesFiltros.adicionarTarefa(setor, tarefa);
        return;
      }
      gerenciadorOpcoesFiltros.adicionarTarefa(setorAtivo.value, tarefa);
    };
    const removerTarefa = (indice) => {
      gerenciadorOpcoesFiltros.removerTarefa(setorAtivo.value, indice);
      tarefaAtiva.value = -1;
    };
    const alterarTarefa = ({ indice, conteudo }) => {
      gerenciadorOpcoesFiltros.alterarTarefa(setorAtivo.value, indice, conteudo);
    };
    const reposicionarTarefa = ({ origem, alvo }) => {
      gerenciadorOpcoesFiltros.reposicionarTarefa(setorAtivo.value, origem, alvo);
    };
    return (_ctx, _cache) => {
      return opcoesCarregadas.value ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createElementVNode("div", _hoisted_2$1, [
          _hoisted_3$1,
          createElementVNode("div", _hoisted_4$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(opcoes.filtros.perfis, (dadosPerfil, perfil) => {
              return openBlock(), createElementBlock("button", {
                key: `guia-${perfil}`,
                class: normalizeClass(["guia", { perfilAtivo: perfilAtivo.value === perfil }]),
                onClick: ($event) => ativarPerfil(perfil)
              }, toDisplayString(dadosPerfil.nome), 11, _hoisted_5$1);
            }), 128))
          ])
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(opcoes.filtros.perfis), (perfil) => {
          return withDirectives((openBlock(), createElementBlock("div", {
            key: `perfil-${perfil}`,
            class: "corpo"
          }, [
            withDirectives(createElementVNode("fieldset", _hoisted_6$1, [
              _hoisted_7$1,
              createVNode(_sfc_main$3, {
                lista: unref(gerenciadorOpcoesFiltros).obterSetores(),
                "item-ativo": setorAtivo.value,
                setores: true,
                onAdicionado: adicionarSetor,
                onImportado: importaSetor,
                onRemovido: removerSetor,
                onAlterado: alterarSetor,
                onReposicionado: reposicionarSetor,
                onSelecionado: ativarSetor,
                onExportado: exportarSetor
              }, null, 8, ["lista", "item-ativo"])
            ], 512), [
              [vShow, perfil === opcoes.filtros.perfilAtivo]
            ]),
            createElementVNode("fieldset", _hoisted_8$1, [
              _hoisted_9$1,
              _hoisted_10$1,
              createVNode(_sfc_main$3, {
                lista: unref(gerenciadorOpcoesFiltros).obterTarefas(setorAtivo.value),
                "item-ativo": setorAtivo.value,
                setores: false,
                onAdicionado: adicionarTarefa,
                onRemovido: removerTarefa,
                onAlterado: alterarTarefa,
                onReposicionado: reposicionarTarefa,
                onSelecionado: ativarTarefa
              }, null, 8, ["lista", "item-ativo"])
            ])
          ])), [
            [vShow, opcoes.filtros.perfilAtivo === perfil]
          ]);
        }), 128))
      ])) : createCommentVNode("", true);
    };
  }
});
const EditorFiltros_vue_vue_type_style_index_0_scoped_b3b88e7d_lang = "";
const EditorFiltros = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b3b88e7d"]]);
const displayName = "PJe+R";
const version = "1.21.82";
const description = "Extensão com melhorias na utilização do PJe";
const contributors = [
  {
    name: "Ageilson Rodrigues da Silva",
    email: "ageilson.silva@trf1.jus.br"
  },
  {
    name: "Caio Moyses de Lima",
    email: "Cmlima@trf3.jus.br"
  },
  {
    name: "Elmo de Oliveira de Moraes",
    email: "eomoraes@tjma.jus.br"
  },
  {
    name: "Igor André Madeira Oliveira",
    email: "iandre@trf3.jus.br"
  },
  {
    name: "Israel Azevedo Fabiano",
    email: "israel.azevedo@trf1.jus.br"
  },
  {
    name: " Sisenando Gomes Calixto de Sousa",
    email: "sisenandosousa@trt15.jus.br"
  },
  {
    name: " Vitor Rolemberg Guerra Costa",
    email: "vrgcosta@tjba.jus.br"
  }
];
const LICENSE = 'MIT License\n\nCopyright (c) 2021-present CNJ\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n';
const cartaoMinimoUrl = "/assets/cartao-minimo-51ac3653.png";
const cartaoAlternadoUrl = "/assets/cartao-alternado-e6eedf6c.png";
const CopiaNomeDocumentoPolo = "/assets/CopiaNomeDocumentoPolo-4796ff05.png";
const CopiaNomePolo = "/assets/CopiaNomePolo-a4fdca7e.png";
const paletaResuzida = "/assets/paleta_reduzida-79354424.png";
const paletaCompleta = "/assets/paleta_completa-98059e3d.png";
const cartaoNormalUrl = "/assets/cartao-normal-1c1388dd.png";
const setup = [
  {
    nome: "Gustavo Seráfico",
    orgao: "SJAM",
    colaboracao: "fornecer a lista de tarefas a serem utilizadas no filtro de tarefas das turmas recursais"
  }
];
const agradecimentos = setup.map((contributor) => ` - ${contributor.nome} por ${contributor.colaboracao}.`).join("<br>");
const explicacoes = {
  "abrir-lembrete-no-popup": '<h1 id="funcionalidade-abrir-lembrete-no-popup">Funcionalidade: Abrir Lembrete No Popup</h1>\n<p>Descrição da funcionalidade: descreva a funcionalidade detalhando o que ela faz, sua utilidade, etc.</p>\n<p>Configurações: chave tipo switch localizada na guia Recursos experimentais da página de opções. (caso você modifique a forma de configuração, você deve alterar o texto aqui também)</p>\n<p>Como testar: descreva como testar a funcionalidade com o máximo de detalhes possíveis.</p>\n',
  "abrir-link-menu-no-appup": '<h1 id="funcionalidade-abrir-link-menu-no-appup">Funcionalidade: Abrir Link Menu No Appup</h1>\n<p>Descrição da funcionalidade: Cria um botão ao lado da barra do menu lateral, para abrir o link no AppPopup</p>\n',
  "adicionar-etiquetas-autos": '<h1 id="funcionalidade-adicionar-etiquetas-autos">Funcionalidade: Adicionar Etiquetas Autos</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Você pode adicionar etiquetas ao processo enquanto está na tela de Autos Digitais.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Recursos experimentais</strong> da página de opções. Ative a chave <strong>Adicionar Etiquetas Autos</strong> para utilizar esta funcionalidade.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Localize o ícone de etiquetas na barra de título, no lado direito.</li>\n<li>Clique neste ícone para ver todas as etiquetas que já estão adicionadas ao processo.</li>\n<li>Um ícone verde com um sinal de &quot;+&quot; também estará presente. Clique neste ícone para ver todas as etiquetas disponíveis na sua lotação.</li>\n<li>Para adicionar uma etiqueta ao projeto, basta clicar sobre o nome da etiqueta desejada.</li>\n</ol>\n',
  ajg: '<h1 id="funcionalidade-integração-ajg">Funcionalidade: Integração AJG</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Esta funcionalidade visa facilitar a expedição e consulta de Requisição de Pagamento no sistema AJG.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Recursos experimentais</strong> da página de opções.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Abra um processo em modo Autos Digitais.</li>\n<li>Visualize o ícone ao lado do número do processo.</li>\n<li>Clique neste ícone para abrir uma nova janela com o sistema AJG.</li>\n<li>No primeiro acesso ao sistema AJG, será necessário fazer login manualmente.</li>\n<li>Na nova janela do sistema AJG, visualize os dados do processo e clique no botão para iniciar a expedição da Requisição de Pagamento.</li>\n</ol>\n',
  "automacao-processos": '<h1 id="01---funcionalidade-lista-processos-etiquetar">01 - Funcionalidade: Lista Processos Etiquetar</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Através de uma lista de processos que pode ser copiada ou vir de um arquivo CSV ou TXT, a automação irá vincular ou desvincular as etiquetas aos processos.</p>\n<h2 id="configurações">Configurações</h2>\n<p>Chave tipo switch localizada na guia <strong>Automação</strong> da página de opções. Ative a opção <strong>Automação nos processos</strong>.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>No painel de tarefas, aparecerá um ícone do Pje+R no lado esquerdo da página.</li>\n<li>Clique e segure o ícone, arrastando-o até um local em que a tela fique visível.</li>\n<li>No campo, você poderá digitar os números dos processos, copiar de outro local ou abrir um arquivo que contenha os números dos processos.</li>\n<li>Clique no botão <strong>Avançar</strong>.</li>\n<li>Aparecerá uma pergunta se você deseja adicionar alguma etiqueta. Escolha a opção desejada e clique novamente em <strong>Avançar</strong>. Se a resposta for sim, aparecerá uma lista de etiquetas. Escolha as etiquetas que deseja adicionar e clique novamente em <strong>Avançar</strong>.</li>\n<li>Aparecerá a pergunta se deseja retirar alguma etiqueta. Escolha a opção desejada e clique novamente em <strong>Avançar</strong>.</li>\n<li>Por último, aparecerá um resumo do que será feito e o botão <strong>Iniciar Automação</strong>.</li>\n<li>Depois de clicar no botão <strong>Iniciar Automação</strong>, será gerado um relatório de todos os processos alterados.</li>\n</ol>\n<h1 id="02---funcionalidade-lista-processos-etiquetar-e-movimentar">02 - Funcionalidade: Lista Processos Etiquetar e Movimentar</h1>\n<h2 id="descrição-da-funcionalidade-1">Descrição da funcionalidade</h2>\n<p>Estando dentro de uma tarefa, você poderá usar a automação para vincular, desvincular e movimentar os processos da tarefa.</p>\n<h2 id="configurações-1">Configurações</h2>\n<p>Chave tipo switch localizada na guia <strong>Recursos experimentais</strong> da página de opções. Ative a opção <strong>Automação nos processos</strong>.</p>\n<h2 id="como-testar-1">Como testar</h2>\n<ol>\n<li>Dentro da tarefa, localize o ícone do PJe+R no lado esquerdo da tela.</li>\n<li>Clique neste ícone para ver a tela de personalização da automação.</li>\n<li>Responda às perguntas e clique no botão <strong>Avançar</strong> até aparecer um resumo do que será feito.</li>\n<li>Depois de clicar no botão <strong>Iniciar Automação</strong>, será gerado um relatório de todos os processos alterados.</li>\n</ol>\n<h2 id="atenção">Atenção</h2>\n<p>A automação irá processar toda a tarefa, mesmo se você estiver filtrado por etiqueta e na tela estiverem aparecendo apenas os processos daquela etiqueta. A automação considerará o total de processos daquela tarefa específica.</p>\n',
  "contar-selecao-processos": '<h1 id="funcionalidade-contar-processos-selecionados">Funcionalidade: Contar Processos Selecionados</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Ao selecionar processos, no local onde aparece o número total de processos na tarefa, surgirá um novo número à frente, indicando a quantidade de processos que você selecionou.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Lista de Processos</strong> da página de opções.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Ative a funcionalidade na página de opções.</li>\n<li>Selecione os processos desejados na lista.</li>\n<li>O contador exibirá algo como: 15/194, onde o primeiro número representa os processos selecionados e o segundo, o total de processos na tarefa.</li>\n</ol>\n',
  "copiar-dados-polo": '<h1 id="funcionalidade-copiar-dados-polo">Funcionalidade: Copiar Dados Polo</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Esta funcionalidade permite copiar o CPF da parte ou do advogado para a área de transferência ao clicar com o mouse.</p>\n<h2 id="configurações">Configurações</h2>\n<p>Para ativar ou desativar a funcionalidade, abra a página de opções da extensão, localize a aba <strong>Recursos Experimentais</strong> e clique na <strong>checkbox</strong> em frente à opção <strong>Copiar Dados Polo</strong>.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Na página <strong>Autos Digitais</strong>, onde ficam os detalhes do processo, no final do nome da parte ou do advogado, aparecerá um ícone laranja.</li>\n<li>Clique sobre o ícone laranja e o CPF será copiado para a área de transferência.</li>\n</ol>\n',
  "esconder-barra-lateral-painel-tarefas": '<h1 id="funcionalidade-esconder-barra-lateral-painel-tarefas">Funcionalidade: Esconder Barra Lateral Painel Tarefas</h1>\n<p>Descrição da funcionalidade: A funcionalidade adiciona um botão no painel de tarefas para esconder a barra lateral.</p>\n',
  "etiqueta-favorita-minhas-tarefas": '<h1 id="funcionalidade-etiqueta-favorita-minhas-tarefas">Funcionalidade: Etiqueta Favorita Minhas Tarefas</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Esta funcionalidade adiciona no painel do usuário, na coluna <strong>Minhas Tarefas</strong>, o nome da etiqueta favorita abaixo do nome da tarefa.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Etiquetas</strong> da página de opções.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Ative o recurso <strong>Minhas Tarefas - Mostra Etiquetas</strong> na página de opções, na guia <strong>Etiquetas</strong>.</li>\n<li>Acesse o painel do usuário.</li>\n<li>Visualize as etiquetas favoritadas abaixo do nome das tarefas na coluna <strong>Minhas Tarefas</strong>.</li>\n</ol>\n',
  "etiquetas-coloridas": '<h1 id="funcionalidade-etiquetas-coloridas">Funcionalidade: Etiquetas Coloridas</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Esta funcionalidade permite que você escolha a cor de cada etiqueta pelo texto que a etiqueta contém.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Etiquetas</strong> da página de opções.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Acesse uma tarefa qualquer e vá para a guia <strong>Etiquetas</strong>.</li>\n<li>Ao lado de cada etiqueta, deve aparecer um ícone. Clique nesse ícone para mostrar uma janela com as opções de cores.</li>\n<li>Alternativamente, ao clicar no ícone de criação de etiquetas, deve aparecer um ícone próximo do nome da etiqueta que, ao ser clicado, mostrará uma janela com as opções de cores.</li>\n</ol>\n',
  "filtros-tarefas": '<h1 id="funcionalidade-filtros-setores">Funcionalidade: Filtros Setores</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Esta funcionalidade permite que você crie filtros acima da coluna &quot;Tarefas&quot; no painel do usuário. Você também pode exportar esses filtros na página de opções para que sua equipe funcione em sintonia.</p>\n<h2 id="configurações">Configurações</h2>\n<p>Na página de opções, você encontrará no menu lateral esquerdo a aba <strong>Filtros de tarefas</strong>. Clique nela.</p>\n<p>A configuração é dividida em três partes:</p>\n<ol>\n<li>Perfil ativo</li>\n<li>Setores</li>\n<li>Tarefas</li>\n</ol>\n<h3 id="1-perfil-ativo">1. Perfil ativo</h3>\n<p>Ao selecionar um perfil, os setores contidos nele estarão disponíveis no painel do usuário.\nVocê não pode criar novos perfis.</p>\n<h3 id="2-setores">2. Setores</h3>\n<p>O nome do setor que você deseja selecionar para as tarefas. Ex.: &quot;Recebimento&quot;.</p>\n<ul>\n<li>Você pode adicionar novos setores simplesmente escrevendo o nome desejado e pressionando a tecla Enter ou clicando no botão &quot;Adicionar&quot; ao lado direito da caixa de texto.</li>\n<li>Após criar o setor, clique nele antes de adicionar o nome de uma tarefa a esse setor.</li>\n</ul>\n<h4 id="21-importando-filtros-de-setores">2.1 Importando filtros de setores</h4>\n<p>Você pode importar um setor encaminhado por um colega ou que você exportou como forma de backup. Para isso, clique no botão <strong>Importar setor</strong> ao lado direito do botão <strong>Adicionar</strong> e da caixa de texto, e selecione o arquivo .txt que você exportou ou recebeu.</p>\n<h4 id="22-exportando-filtros-de-setores">2.2 Exportando filtros de setores</h4>\n<p>Para exportar um setor, coloque o mouse sobre ele e aparecerão alguns botões de edição, incluindo o botão <strong>Exportar setor</strong>. Ao clicar nele, será feito o download de um arquivo .txt na sua pasta de downloads, que pode ser encaminhado a um colega ou usado como backup.</p>\n<h3 id="3-tarefas">3. Tarefas</h3>\n<p>As tarefas que devem ser mostradas quando você clicar no setor.</p>\n<ul>\n<li>Você pode adicionar uma tarefa simplesmente digitando o nome completo, como: &quot;[JEF] Triagem inicial&quot;, ou parte do nome, como: &quot;Triagem&quot; ou &quot;tri&quot;.</li>\n</ul>\n<h2 id="como-testar">Como testar</h2>\n<p>Acesse o painel do usuário e visualize os filtros aparecendo na coluna &quot;Tarefas&quot;.</p>\n',
  "gerar-sinopse-relatoria": '<h1 id="funcionalidade-sinopse-relatoria">Funcionalidade: Sinopse Relatoria</h1>\n<p>Descrição da funcionalidade:</p>\n<p>Ao clicar no botão GERAR RELATÓRIO SINOPSE as ementas dos processos pautados para julgamento são copiadas, ordenadas por tipo de voto e assunto e disponibilizadas em um arquivo word único.</p>\n<p>Configurações:</p>\n<p>Para ativar ou desativar a funcionalidade abra a pagina de opções de extensão localize a aba Recursos Experimentais e clique no CHECBOX em frente a palavra Sinopse Relatoria.</p>\n<p>Pré-requisitos:</p>\n<ol>\n<li>O voto e a ementa devem estar liberados.</li>\n<li>Na aba ementa deve ser utilizado o modelo de ementa padrão que pode ser copiado de:\na. Configuração - Documentos - Modelo - Modelo - Copiar Modelo\nb. Localização origem do documento:\ni. Tribunal Regional Federal da 1ª Região\nii. Turmas Recursais e Regionais da 1ª Região\niii. Turmas Recursais SJBA\niv. 4ª Turma Recursal\nv. Secretaria da 4ª Turma Recursal da SJBA\nvi. 2ª Relatoria da 4ª Turma Recursal da SJBA\nc. Copiar o modelo: Ementa Modelo Sinopse Relatoria e fazer os ajustes necessários</li>\n<li>Todo o conteúdo da súmula de julgamento deve estar contido no corpo da ementa modelo</li>\n</ol>\n<p>Como testar:</p>\n<p>Para testar selecione uma data de pauta na Relação de Julgamento com o perfil Assessoria de Gabinete de Turma Recursal/Assessor de Gabinete de Turma e clique no botão GERAR RELATÓRIO SINOPSE.</p>\n',
  "gerenciador-etiquetas": '<h1 id="funcionalidade-gerenciador-de-etiquetas">Funcionalidade: Gerenciador de Etiquetas</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<ol>\n<li>O primeiro botão encontra todas as etiquetas vazias, ou seja, as etiquetas que não têm nenhum processo vinculado.</li>\n<li>O segundo botão procura todas as etiquetas com nomes parecidos para que o usuário decida se deseja vinculá-las.</li>\n<li>Ao pesquisar por uma etiqueta, o usuário tem a opção de baixar todos os processos que contenham a etiqueta pesquisada.</li>\n</ol>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Etiquetas</strong> da página de opções, com o nome <strong>Gerenciador de Etiquetas</strong>.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li><p><strong>Encontrar etiquetas sem processos</strong></p>\n<ul>\n<li>Acesse a página de criação de etiquetas.</li>\n<li>Ao lado do ícone &quot;Fazer Magia&quot;, aparecerá outro ícone com o título <strong>Gerenciador de Etiquetas</strong>. Clique neste ícone.</li>\n<li>No lado direito da tela, aparecerá um botão com o nome <strong>Localizar etiquetas sem processos</strong>. Clique nele e aguarde enquanto todas as etiquetas vazias são encontradas.</li>\n<li>Depois de localizar as etiquetas, você poderá excluí-las, se desejar.</li>\n</ul>\n</li>\n<li><p><strong>Localizar etiquetas parecidas</strong></p>\n<ul>\n<li>Clique no botão <strong>Localizar etiquetas parecidas</strong>.</li>\n<li>Aparecerá uma lista de etiquetas com nomes parecidos, com o número de processos na frente do nome.</li>\n<li>Se a etiqueta não estiver vazia, aparecerá um ícone verde. Clique nele para transferir todos os processos para a etiqueta com o maior número. As outras etiquetas serão deletadas da lotação.</li>\n</ul>\n</li>\n<li><p><strong>Baixar processos com etiquetas pesquisadas</strong></p>\n<ul>\n<li>Pesquise pelo nome de uma etiqueta.</li>\n<li>Clique no nome correspondente. Isso mostrará todos os processos que contêm a etiqueta pesquisada.</li>\n<li>Logo acima dos números de processo, você encontrará um ícone com uma seta para baixo. Clique neste ícone para baixar um arquivo CSV com os processos para o seu computador.</li>\n</ul>\n</li>\n</ol>\n',
  "gestor-de-modelos": '<h1 id="funcionalidade-gestor-de-modelos">Funcionalidade: Gestor De Modelos</h1>\n<p>Descrição da funcionalidade: Gestor de modelos para o PJE, em versão experimental e em desenvolvimento, com possibilidade de utilização de trechos de modelo, chamando-os diretamente do Editor CKE pelos seus respectivos atalhos, com a possibilidade de configuração de variáveis de entrada livremente elaboradas, que perguntam ao usuário do modelo quais os dados a serem preenchidos, bem como toolbar para facilitar elaboração de minutas, com possibilidade de copiar direto do word, ou juntar parágrafos para textos copiados de PDF.</p>\n<p>Configurações: chave tipo switch localizada na guia Recursos experimentais da página de opções.</p>\n<p>Como testar:\nI - Cadastrar nova fonte de modelo:</p>\n<ol>\n<li>Ir para a página de modelos do PJE</li>\n<li>Navegar para formulário</li>\n<li>Escolher tipo de modelo e de petição.\nObs.: Pode ser escolhido qualquer tipo, em ambos os campos. Os tipos são irrelevantes para a utilização dos modelos, que podem ser chamados a partir de qualquer local que utilize o CKEditor4 (popularmente chamado de &quot;editor novo&quot;).</li>\n<li>Escolher editor CKEditor</li>\n<li>Clicar em &quot;CRIAR FONTE DE MODELOS&quot;\nO documento e nome de modelo serão automaticamente preenchidos.</li>\n<li>Clicar em &quot;INCLUIR MODELO&quot;</li>\n<li>Preencher os campos &quot;Título do modelo&quot;, &quot;Atalho de chamada&quot;, &quot;Variáveis de entrada&quot;(opcional) e inserir o modelo no editor.\nA inserção de variáveis de entrada é opcional, porém, todos os campos são obrigatórios, CASO o usuário queira inserir uma variável de entrada.\nAs entradas podem ser de tipo texto, ou tipo opcional.\nEntrada de tipo texto consiste em um campo de texto a ser preenchido quando o modelo for utilizado.\nEx.: Marca de veículo, endereço do imóvel, número de contrato, número de protocolo de benefício do INSS, etc.\nEntrada de tipo opcional consiste em um campo de checkbox a ser selecionado, ou não, pelo usuário do modelo. Caso seja marcado, o texto respectivo será inserido.\nEx.: Emendar a petição para (a, b, c, d, e...?), ou incluir partes separadas de modelo em caso de ações sobre a incidência de contribuições sociais sobre verbas (a, b, c, d, e...)</li>\n<li>Após a edição, clicar em &quot;ENVIAR&quot;, e o modelo será inserido na lista de modelos.</li>\n<li>Clicar no ícone de salvar (disquete), para salvar o modelo no PJE.</li>\n</ol>\n<p>II - Utilizando a fonte de modelo:</p>\n<ol>\n<li>Após a inserção da fonte, navegar para a página de modelos do PJE, &quot;Pesquisa&quot;, e pesquisar os modelos do CKEditor.\nA fonte inserida pelo gestor terá o padrão &quot;pjemr-modelos-id_XXXXXXXX.XXXXXXXXXXX_XXXXXXXXXXX&quot;, e poderá ser escolhida como fonte.</li>\n<li>Clicar em &quot;DEFINIR COMO FONTE DE MODELOS&quot;</li>\n</ol>\n<p>Pronto! Os modelos inseridos na fonte já podem ser utilizados nas páginas de tarefa que utilizam o CKEditor, seja pelo atalho, seja pelo ícone de busca do gestor.</p>\n<p>III - Toolbar - Ferramentas de ajuda</p>\n<ol>\n<li>O toolbar deverá aparecer nas páginas de minuta que utilizem o CKEditor, com as seguintes ferramentas:\na) Copiar do word: Abre uma tela com o CKEditor5, para colagem de textos do word, que podem ser transpostos para o CKEditor4, mantendo a formatação original.\nb) Buscar modelos: Para busca e inserção de modelos da Fonte de Modelos do gestor, já cadastrada pelo usuário, com preview - sem formatação - ao passar o mouse por cima do título, e filtro por nome. O modelo pode ser inserido ao clicar no título do modelo (neste caso, ele é inserido no final do texto).\nc) Juntar parágrafos: &quot;Elimina&quot; ou &quot;junta&quot; os parágrafos criados ao copiar textos de PDF. O usuário deve selecionar o texto, e clicar no botão.\nObs.: A funcionalidade elimina os espaços duplos ao ser acionada novamente, caso seja necessário.</li>\n</ol>\n',
  infojud: '<h1 id="funcionalidade-infojud">Funcionalidade: Infojud</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Preenche automaticamente os campos do Infojud, conforme dados anteriormente capturados dos autos.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Automação</strong> da página de opções.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Na página dos Autos Digitais, aparecerá um ícone de &quot;I&quot;.</li>\n<li>Clique no ícone para abrir uma janela de apoio já preenchida com os dados de autuação e a seleção de todas as partes do polo passivo como destinatários da ordem.</li>\n<li>Se necessário, faça as alterações nas seleções.</li>\n<li>Preencha o nome da Vara/Juízo e a quantidade de anos (deve ser um número inteiro) apenas uma vez.</li>\n<li>Para as demais ordens, os dados serão gravados no PJE+R. O nome da Vara deve ser o mesmo que consta no Infojud.</li>\n<li>Após preencher os dados, clique em <strong>Capturar</strong>.</li>\n</ol>\n<h2 id="infojud">Infojud</h2>\n<p>Na página de inserção do Infojud, deverá aparecer um botão chamado <strong>Preencher automaticamente</strong>, que transferirá os dados capturados para a tela de cadastro de formulário.</p>\n',
  "intima-zap": '<h1 id="funcionalidade-intima-zap">Funcionalidade: Intima Zap</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da Funcionalidade</h2>\n<p>A funcionalidade Intima Zap permite enviar intimações via WhatsApp para os Autores das ações judiciais.</p>\n<h2 id="configurações">Configurações</h2>\n<ul>\n<li><strong>Localização:</strong> A chave de tipo switch está localizada na guia &quot;Recursos experimentais&quot; da página de opções.</li>\n<li><strong>Nome da Chave:</strong> Intima Zap</li>\n</ul>\n<h2 id="como-testar">Como Testar</h2>\n<ol>\n<li><p><strong>Ativar a Funcionalidade:</strong></p>\n<ul>\n<li>Ative a funcionalidade na guia &quot;Recursos experimentais&quot;.</li>\n</ul>\n</li>\n<li><p><strong>Acessar Autos Digitais:</strong></p>\n<ul>\n<li>Entre na seção de Autos Digitais.</li>\n</ul>\n</li>\n<li><p><strong>Identificar o Menu Hambúrguer:</strong></p>\n<ul>\n<li>Próximo ao número do processo, aparecerá um menu hambúrguer laranja. Clique nele.</li>\n</ul>\n</li>\n<li><p><strong>Acessar o Botão de WhatsApp:</strong></p>\n<ul>\n<li>No menu, aparecerá um botão com o ícone do WhatsApp. Clique nele.</li>\n</ul>\n</li>\n<li><p><strong>Preencher o Modal:</strong></p>\n<ul>\n<li>Insira o telefone do autor com o DDD.</li>\n<li>Coloque um assunto padrão.</li>\n<li>Selecione os documentos que deseja enviar marcando os checkboxes na lista.</li>\n</ul>\n</li>\n<li><p><strong>Enviar a Intimação:</strong></p>\n<ul>\n<li>Clique no botão &quot;Enviar Intimação&quot;.</li>\n</ul>\n</li>\n<li><p><strong>Visualizar Documentos:</strong></p>\n<ul>\n<li>Caso queira ler os documentos antes de enviá-los, clique sobre o nome do documento para abrir um link separadamente.</li>\n</ul>\n</li>\n</ol>\n<h2 id="observações">Observações</h2>\n<ul>\n<li><strong>Limitações:</strong> No momento, a funcionalidade só envia documentos produzidos pelo próprio PJe, como Certidões e Atos Ordinatórios. Documentos em PDFs externos não são enviados.</li>\n</ul>\n<h2 id="exemplo-de-uso">Exemplo de Uso</h2>\n<p>Para ativar e utilizar a funcionalidade Intima Zap, siga os passos descritos na seção &quot;Como Testar&quot;. Essa funcionalidade é útil para facilitar o envio de intimações diretamente via WhatsApp, economizando tempo e agilizando processos.</p>\n',
  "links-ultimas-tarefas": '<h1 id="funcionalidade-links-nas-últimas-tarefas">Funcionalidade: Links nas Últimas Tarefas</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Esta funcionalidade cria links para os números de processos e tarefas constantes na tela de <strong>Últimas Tarefas</strong> no painel do usuário.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade é ativada automaticamente e não requer configuração manual.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Acesse a tela de <strong>Últimas Tarefas</strong> no painel do usuário.</li>\n<li>Clique no número, nome da tarefa ou ícone correspondente.</li>\n<li>Uma pop-up será aberta para o processo ou tarefa selecionado.</li>\n</ol>\n',
  "mais-atalhos-autos-digitais": '<h1 id="funcionalidade-mais-atalhos-nos-autos-didgitais">Funcionalidade: Mais atalhos nos autos didgitais</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Cria mais atalhos na barra de navegação dos autos digitais.</p>\n<ol>\n<li>Atalho para exibir tarefas do processo</li>\n<li>Atalho para editar objeto do processo</li>\n</ol>\n<h2 id="configuração">Configuração</h2>\n<p>chave tipo switch localizada na guia Recursos experimentais da página de opções.</p>\n<h2 id="como-testar">Como testar</h2>\n<p>Abrir os autos digitais e na barra superior clicar nos ícones que foram adicionados.</p>\n',
  "mapa-de-calor-painel-usuario": '<h1 id="funcionalidade-mapa-de-calor-painel-usuario">Funcionalidade: Mapa De Calor Painel Usuario</h1>\n<p>#Descrição da funcionalidade\nMonta um mapa de calor do painel do usuário a fim de obter uma perpectiva da situação da paralisação do acervo da unidade judicial. O mapa suporta a exibição de quatros níveis de cores para a exibição da severidade da paralisação</p>\n<p>#Configurações\n##Ativar Mapa de Calor no Painel do Usuário\nUma chave tipo switch localizada na guia Mapa de Calor Painel Usuároi da página de opções ativa e desativa a funcionalidade. A demais configurações são acessórias, dependendo desta configuração.</p>\n<p>##Mapa de Calor baseado nos dados\nA configuração Mapa de Calor baseado nos dados deverá ser definido a fonte dos dados para análise.</p>\n<ol>\n<li><strong>Quantidade pendente em relação ao acervo total</strong>: utilize para ter uma perspectiva de quais são as tarefa que possuem mais carga de processo para execução.</li>\n<li><strong>Quantidade pendente com contagem de decurso de dias baseado na data de entrada da tarefa</strong>: a fim de verificar processos paralisados no acervo, quantidade de dias parado, baseado na data da entrada do processo na tarefa relacionada.</li>\n<li><strong>Quantidade pendente com contagem de decurso de dias baseado na data do último movimento do processo</strong>, a fim de verificar processos paralisados no acervo, quantidade de dias parado, baseado na data do último movimento do processo. <strong>Este critério de análise não está disponível para todos os tribunais</strong>.</li>\n</ol>\n<p>##Definir limites para dias decorridos\nA fim de estabelecer os limites da paralização do acervo, poderão ser aproveitadas as mesmas configurações dos níveus encontrados na funcionalidade <strong>Melhorar Cartão da Tarefa</strong>, ativando-se a chave própria.\nAlternativamente, novos níveis de limites para esta funcionalidade podem ser definidos pelo usário em seus níveis vermelho, amarelo e verde.</p>\n<p>##Formato da barra de calor\nBotões de opções para definir o formatdo da barra de calor quando a origem dos dados está baseado em &#39;Quantidade pendente com contagem de decurso de dias baseado na data de entrada da tarefa&#39; ou &#39;Quantidade pendente com contagem de decurso de dias baseado na data do último movimento do processo&#39;.\nPara a origem &#39;Quantidade pendente em relação ao acervo total&#39; será utilizado um formato padrão não configurável.</p>\n<p>##Ignorar as tarefas abaixo\nPara evitar o processamento de tarefas que não causam impacto para a paralisação do acervo estabelecido pela corregedoria do tribunal, uma lista de tarefas poderá ser informada nesta funcionalidade.</p>\n<p>#Outras informações\nUma vez montado o mapa, a carga de dados recebidos do tribunal estarão <strong>armazenadas na memória da extensão pelo prazo de 24 horas</strong> a fim de evitar muitas chamadas aos servidores do PJe do tribunal.</p>\n<p>#Exibição</p>\n<p><img src="/src/content/mapa-de-calor-painel-usuario/mapa_calor.PNG" alt="Mapa de calor ativo"></p>\n',
  "melhorar-cartao-tarefa": '<h1 id="funcionalidade-melhorar-o-cartão-de-tarefas">Funcionalidade: Melhorar o cartão de tarefas</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Melhora o cartão da tarefas para trazer mais informações úteis e funcionalidades para gestão das tarefas pelo usuário, bem como procurar melhorar os destaques de exibição de prioridade processual, número do processo e o cartão de tarefa selecionado para execução pelo usuário.\nTraz um comando para copiar o número do processo judicial. O pequeno mapa de calor tem como objetivo destacar visualmente o nível para paralização do processo e tarefa. A alteração na cor padrão da etiqueta procura destacar visualmente e melhorar o contraste para sua legibilidade. Em caso de conclusão, realiza a contagem dos dias decorridos desde a conclusão do processo.</p>\n<h2 id="configuração">Configuração</h2>\n<p>O mapa de calor com base na quantidade de dias decorridos da entrada na tarefa e do último movimento do processo podem ser configurados conforme a realidade da gestão processual na unidade judiciária em três níveis, verde, amarelo e vermelho.</p>\n<p>O recursos de Melhora o destaque da prioridade processual no cartão, Comando para copiar o número do processo, Melhora o destaque do cartão selecionado na lista de tarefas, Aumenta o destaque do número do processo, Recurso para recolher o cartão da tarefa e Altera a cor da etiqueta padrão do sistema podem ser ativados ou desativados pelo usuário.</p>\n<h2 id="recursos">Recursos</h2>\n<ol>\n<li>Destaque de data do último movimento do processo abaixo data de entrada da tarefa. O cartão da tarefa será atualizado com a data do ultimo movimento conforme o cartão surgir na tela.</li>\n<li>Contagem de dias decorridos\n2.1 desde a entrada do processo na tarefa.\n2.2 desde o último movimento do processo\n2.3 da conclusão do processo</li>\n<li>Complementa a informação &#39;ULTMA MOVIMENTAÇÃO&#39; do cartão para adicionar a data do movimento</li>\n<li>Destaque em três cores se decorridos dias desde a entrada do processo na tarefa e desde o último movimento do processo</li>\n<li>Melhora o destaque da prioridade processual no cartão</li>\n<li>Comando para copiar o número do processo</li>\n<li>Melhora o destaque do cartão selecionado na lista de tarefas</li>\n<li>Aumenta o destaque do número do processo</li>\n<li>Recurso para recolher o cartão da tarefa</li>\n<li>Altera a cor da etiqueta padrão do sistema</li>\n</ol>\n<h2 id="exibição-com-recursos-ativados">Exibição com recursos ativados</h2>\n<p><img src="/src/content/melhorar-cartao-tarefa/cartao-melhrado.png" alt="Alterações no cartão"></p>\n<h5 id="exibição-com-contagem-data-conclusão">Exibição com contagem data conclusão:</h5>\n<p><img src="/src/content/melhorar-cartao-tarefa/cartao-contagem-conclusao.png" alt="Contagem dias conclusão"></p>\n',
  "menu-haburgue-integracao-sistemas": '<h1 id="funcionalidade-menu-hambúrguer-integração-sistemas">Funcionalidade: Menu Hambúrguer Integração Sistemas</h1>\n<p>Descrição da funcionalidade:\nSe alguma integração de sistema estiver ativa será criado menu que ao clicar aparece as opções de integração dos sistemas.</p>\n',
  "mostra-processos-digitos": '<h1 id="funcionalidade-mostra-ou-colorir-processos-por-dígitos">Funcionalidade: Mostra ou colorir Processos por Dígitos</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>A funcionalidade &quot;Mostra Processos Dígitos&quot; permite aos usuários destacar números de processos com uma cor selecionada pelo próprio usuário, bem como a opção de ocultar processos com base em dígitos específicos.</p>\n<h3 id="configurações">Configurações</h3>\n<ul>\n<li><strong>Chave tipo switch</strong>: Localizada na guia Recursos experimentais da página de opções.</li>\n</ul>\n<h2 id="como-testar">Como testar</h2>\n<h3 id="passo-a-passo">Passo a Passo</h3>\n<ol>\n<li><p><strong>Acesse uma tarefa</strong></p>\n<ul>\n<li>Clique no ícone &quot;Filtro que esta na cor laranja&quot; lodo depois o icone Selecionar todos.</li>\n</ul>\n</li>\n<li><p><strong>Configuração da funcionalidade</strong></p>\n<ul>\n<li>Você verá o título &quot;Selecione os dígitos que deseja destacar&quot;.</li>\n<li>Selecione os dígitos que deseja destacar.</li>\n<li>Escolha a cor para destacar os processos.</li>\n</ul>\n</li>\n<li><p><strong>Destacar processos com a cor desejada</strong></p>\n<ul>\n<li>Os processos que contêm os dígitos selecionados serão destacados com a cor escolhida.</li>\n</ul>\n</li>\n<li><p><strong>Ocultar processos por dígitos</strong></p>\n<ul>\n<li>Abaixo dos checkboxes para seleção de dígitos, há duas opções de rádio:<ul>\n<li><strong>Deseja Colorir os números dos processos</strong>: Selecionar esta opção permitirá que você escolha uma cor para destacar os processos.</li>\n<li><strong>Visualizar apenas os processos que contenham os dígitos selecionados</strong>: Selecionar esta opção ocultará todos os processos que não contenham os dígitos selecionados.</li>\n</ul>\n</li>\n</ul>\n</li>\n<li><p><strong>Ações adicionais</strong></p>\n<ul>\n<li><strong>Marcar Todos</strong>: Um botão para selecionar todos os dígitos de uma vez.</li>\n<li><strong>Desmarcar Todos</strong>: Um botão para desmarcar todos os dígitos.</li>\n</ul>\n</li>\n</ol>\n<h3 id="interface-do-usuário">Interface do usuário</h3>\n<ul>\n<li><strong>Título</strong>: &quot;Selecione os dígitos que deseja destacar&quot;.</li>\n<li><strong>Checkboxes</strong>: Para selecionar os dígitos (0-9) que deseja destacar.</li>\n<li><strong>Botões de ação</strong>: &quot;Marcar Todos&quot; e &quot;Desmarcar Todos&quot;.</li>\n<li><strong>Opções de Rádio</strong>: Para escolher entre destacar com cor ou ocultar processos.</li>\n<li><strong>Paleta de cores</strong>: Disponível somente quando a opção &quot;Deseja Colorir os números dos processos&quot; está selecionada.</li>\n</ul>\n<h2 id="resumo-das-funcionalidades">Resumo das funcionalidades</h2>\n<ol>\n<li><p><strong>Destacar Processos por cor</strong></p>\n<ul>\n<li>Selecione os dígitos.</li>\n<li>Escolha uma cor.</li>\n<li>Os processos com os dígitos selecionados serão destacados.</li>\n</ul>\n</li>\n<li><p><strong>Ocultar Processos</strong></p>\n<ul>\n<li>Selecione os dígitos.</li>\n<li>Escolha a opção &quot;Visualizar apenas os processos que contenham os dígitos selecionados&quot;.</li>\n<li>Os processos que não contêm os dígitos selecionados serão ocultados.</li>\n</ul>\n</li>\n</ol>\n<h3 id="dicas-para-melhor-utilização">Dicas para melhor utilização</h3>\n<ul>\n<li>Utilize a opção de &quot;Marcar Todos&quot; para rapidamente selecionar todos os dígitos se deseja visualizar todos os processos.</li>\n<li>Use a paleta de cores para escolher uma cor que contraste bem com o fundo, garantindo melhor visibilidade dos processos destacados.</li>\n</ul>\n',
  multivisualizador: '<h1 id="funcionalidade-multivisualizador">Funcionalidade: Multivisualizador</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Permite a visualização de mais de um documento pela aba de Autos Digitais.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Recursos experimentais</strong> da página de opções.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li><p><strong>Abrindo Documentos:</strong></p>\n<ul>\n<li>Ao clicar nos documentos pela aba de Autos Digitais, eles serão abertos em novas abas e mantidos enquanto a aba estiver aberta.</li>\n<li>Documentos abertos serão sinalizados com fundo azul.</li>\n<li>Documentos abertos e posteriormente fechados terão fundo avermelhado.</li>\n<li>O documento atualmente selecionado será destacado com uma borda preta.</li>\n</ul>\n</li>\n<li><p><strong>Interação com Documentos:</strong></p>\n<ul>\n<li>Ao clicar no documento pela nova aba, o navegador irá focar no documento pelas abas de cronologia ou fases.</li>\n<li>Vídeos serão abertos pelo navegador.</li>\n<li>Documentos que não podem ser abertos pelo navegador serão baixados automaticamente.</li>\n</ul>\n</li>\n<li><p><strong>Downloads de Documentos:</strong></p>\n<ul>\n<li>Caso o download não inicie sozinho, um link aparecerá para o download manual.</li>\n<li>Em último caso, o download pode ser feito pelo ícone de &quot;Download do documento&quot; do próprio PJE.</li>\n</ul>\n</li>\n</ol>\n',
  "painel-baixa-tarefas": '<h1 id="funcionalidade-botão-para-baixar-lista-de-processos-em-tarefa">Funcionalidade: Botão para Baixar Lista de Processos em Tarefa</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Esta funcionalidade adiciona um botão ao lado de cada tarefa no painel do usuário, que ao ser clicado, baixa um arquivo CSV contendo dados dos processos contidos na tarefa.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Recursos experimentais</strong> da página de opções. (Caso você modifique a forma de configuração, altere o texto aqui também)</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>No painel do usuário, localize o botão ao lado de cada tarefa.</li>\n<li>Clique no botão e um arquivo CSV será baixado para a sua pasta de downloads padrão.</li>\n<li>O arquivo terá o nome idêntico ao da tarefa e conterá os dados dos processos.</li>\n</ol>\n',
  "panel-oficial-justica": '<h1 id="funcionalidade-painel-oficial-justiça">Funcionalidade: Painel Oficial Justiça</h1>\n<p>Descrição da funcionalidade: Esta funcionalidade vai percorre todas as páginas a partir da posição da paginação ao final vai trazer todos os processos para uma única tabela.</p>\n<p>Configurações: chave tipo switch localizada na guia Recursos experimentais da página de opções.</p>\n<p>Como testar: O painel do Oficial de Justiça e clique no botão mostra todos os processos desta forma todos os procesos serão carregados em uma mesma tabela.\nDepois para pesquisa por uma cidade basta escrever o nome da cidade e clicar no botão pesquisa que esta da cor verde.</p>\n',
  "Post-it": '<h1 id="funcionalidade-post-it">Funcionalidade: Post It</h1>\n<h2 id="descrição">Descrição</h2>\n<p>A funcionalidade <strong>Post It</strong> adiciona um atalho no painel superior direito dos autos digitais, permitindo a criação de post-its virtuais que ficam vinculados ao processo em que foram criados. Os post-its são totalmente editáveis, permitindo que os usuários adicionem títulos e conteúdos personalizados para fazer anotações diretamente dentro do sistema, sem a necessidade de recorrer a programas externos. Vários post-its podem ser criados dentro de um mesmo processo, facilitando a organização de notas e informações.</p>\n<h2 id="funcionalidades-principais">Funcionalidades Principais</h2>\n<ul>\n<li><strong>Criação de Post-its</strong>: Crie post-its personalizados diretamente nos autos digitais clicando no ícone de atalho ou utilizando a combinação de teclas <code>Ctrl + Alt + P</code>.</li>\n<li><strong>Vinculação ao Processo</strong>: Os post-its são vinculados ao processo específico em que foram criados, aparecendo apenas quando o processo correspondente é aberto.</li>\n<li><strong>Edição de Títulos e Conteúdos</strong>: Tanto o título quanto o conteúdo do post-it podem ser editados a qualquer momento, permitindo que o usuário ajuste suas anotações conforme necessário.</li>\n<li><strong>Persistência Local</strong>: Os post-its são armazenados localmente no navegador do usuário, garantindo que as notas permaneçam disponíveis mesmo após a recarga da página.</li>\n</ul>\n<h2 id="limitações">Limitações</h2>\n<ul>\n<li><strong>Armazenamento Local</strong>: Atualmente, os post-its são armazenados localmente no navegador do usuário, o que significa que eles só aparecerão no computador em que foram criados. Para compartilhar os post-its entre diferentes dispositivos, é necessário configurar manualmente o compartilhamento do <code>localStorage</code>.</li>\n<li><strong>Compatibilidade de Navegadores</strong>: A funcionalidade foi testada principalmente em navegadores modernos. A compatibilidade com versões antigas de navegadores não foi verificada.</li>\n</ul>\n<h2 id="configurações">Configurações</h2>\n<p>Para ativar ou desativar a funcionalidade <strong>Post It</strong>, utilize a chave de configuração do tipo &quot;switch&quot; localizada na guia &quot;Recursos experimentais&quot; na página de opções do sistema. Se o método de configuração for alterado, lembre-se de atualizar esta seção para refletir as mudanças.</p>\n<h2 id="como-testar">Como Testar</h2>\n<ol>\n<li><strong>Atalho no Painel</strong>: Clicar no ícone de post-it no painel superior direito dos autos digitais; ou</li>\n<li><strong>Atalho de Teclado</strong>: Usar a combinação de teclas <code>Ctrl + Alt + P</code> para criar um novo post-it.</li>\n<li><strong>Edição</strong>: Editar o título e o conteúdo do post-it para verificar se as mudanças são salvas corretamente.</li>\n<li><strong>Persistência</strong>: Recarregar a página e verificar se o post-it criado aparece no local correto com as edições realizadas.</li>\n</ol>\n',
  "seletor-processos": '<h1 id="funcionalidade-seletor-processos">Funcionalidade: Seletor Processos</h1>\n<p>Descrição da funcionalidade: Esta funcionalidade vai permitir selecionar vários processos em uma tarefa com base em algum critério escolhido pelo usuário. Atualmente os critérios são &quot;Última movimentação&quot;, &quot;Etiqueta&quot;, &quot;Dias Parados&quot;</p>\n<p>Configurações: chave tipo switch localizada na guia Recursos experimentais da página de opções.</p>\n<p>Como testar: Na tela de tarefas clique no símbolo de lupa que aparecerá acima da lista de processos.\nA seguir selecione quais tipos de últimas mvimentações deseja efetuar a ação e clique em selecionar.\nCaso opte por Etiqueta existe a opção adicional de selecionar processos que possuem todas as etiquetas escolhidas, que possuem algumas delas ou que tenha apenas uam das escolhidas.\nCaso opte por Dias Parados pode se escolher o critério de data de chegada ou de última movimentação para fazer o filtro e escolher o prazo pelo número de dias parados ou se estão parados desde uma determinada data.</p>\n<p>Após feita a seleção será criada um aba adicional &quot;SELEÇÃO&quot; com os processos selecionados para uma visualização alternativa. Ao voltar para a aba de processos a mesma será desfeita.</p>\n',
  serasajud: '<h1 id="funcionalidade-serasajud">Funcionalidade: SerasaJud</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Preenche automaticamente os campos do SerasaJud, conforme dados anteriormente capturados dos autos.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Automação</strong> da página de opções.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Na página dos Autos Digitais, aparecerá um ícone de &quot;Hambúrguer&quot;.</li>\n<li>Clique no ícone para abrir uma janela de apoio já preenchida com os dados de autuação e a seleção de todas as partes do polo passivo como destinatários da ordem.</li>\n<li>Se necessário, faça as alterações nas seleções.</li>\n<li>Preencha o nome do Foro/Vara, Nome do Juiz, Tipo da Ação apenas uma vez, conforme aparece no SerasaJud.</li>\n<li>Após preencher os dados, clique em <strong>Capturar Dados</strong>.</li>\n</ol>\n<h2 id="serasajud">SerasaJud</h2>\n<p>Na página de inserção do SerasaJud, deverá aparecer um botão chamado <strong>Pje+R</strong>, que transferirá os dados capturados para a tela de cadastro de formulário.</p>\n',
  sisbajud: '<h1 id="funcionalidade-sisbajud">Funcionalidade: Sisbajud</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Preenche automaticamente os campos do Sisbajud, conforme dados anteriormente capturados dos autos.</p>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Automação</strong> da página de opções.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Na página dos Autos Digitais, aparecerá um ícone de cifrão.</li>\n<li>Clique no ícone para abrir uma janela de apoio já preenchida com os dados de autuação, a seleção de uma das partes do polo ativo como exequente e todas as partes do polo passivo como destinatários da ordem.</li>\n<li>Se necessário, faça as alterações nas seleções.</li>\n<li>Preencha o nome do(a) Juiz(a) solicitante e o ID da Vara/Juízo apenas uma vez. Para as demais ordens, os dados ficarão gravados no PJE+R. O ID da Vara e o nome do Juiz devem ser os mesmos que constam no Sisbajud.</li>\n<li>Após preencher os dados, clique em <strong>Capturar</strong>.</li>\n</ol>\n<h2 id="sisbajud">Sisbajud</h2>\n<p>Na página de inserção de nova minuta do Sisbajud, deverá aparecer um botão chamado <strong>Preencher dados automaticamente</strong>, que transferirá os dados capturados para a tela de cadastro de minuta.</p>\n',
  "tags-autos-digitais": '<h1 id="funcionalidade-visualizar-etiquetas-e-lembretes-nos-autos-digitais">Funcionalidade: Visualizar Etiquetas e Lembretes nos Autos Digitais</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Mostra as etiquetas do processo e os lembretes quando na janela dos Autos Digitais.</p>\n<h3 id="lembretes">Lembretes</h3>\n<ul>\n<li>O ícone do lembrete aparece antes do ícone dos Autos Digitais.</li>\n<li>Foi adicionado um ícone de lembretes nos Autos Digitais para que o usuário possa visualizar os lembretes apenas parando o mouse sobre ele.</li>\n</ul>\n<h2 id="configurações">Configurações</h2>\n<p>A funcionalidade pode ser ativada através de uma chave tipo switch localizada na guia <strong>Etiquetas</strong> da página de opções.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Abra um processo em modo <strong>Autos Digitais</strong>.</li>\n<li>Visualize as etiquetas do processo abaixo do item <strong>Mais Detalhes</strong>.</li>\n<li>Veja o ícone dos lembretes.</li>\n</ol>\n',
  "ultimas-etiquetas-usadas": '<h1 id="funcionalidade-últimas-etiquetas-usadas-na-tarefa">Funcionalidade: Últimas Etiquetas Usadas na Tarefa</h1>\n<h2 id="o-que-esta-funcionalidade-faz">O que esta funcionalidade faz?</h2>\n<p>Esta funcionalidade adiciona as últimas etiquetas usadas na tarefa específica, facilitando o acesso rápido às etiquetas mais frequentes.</p>\n<h2 id="como-ativar-a-funcionalidade">Como ativar a funcionalidade?</h2>\n<p>Para ativar ou desativar o recurso, abra a página de opções da extensão, localize a guia <strong>Etiquetas</strong> e clique no botão ao lado direito da opção <strong>Últimas etiquetas usadas</strong>.</p>\n<h2 id="como-testar">Como testar?</h2>\n<ol>\n<li><p><strong>Vincular e Desvincular Etiquetas:</strong></p>\n<ul>\n<li>Ao clicar com o mouse sobre o nome das etiquetas, você vincula a etiqueta ao processo, criando uma lista das últimas etiquetas usadas.</li>\n<li>Se a etiqueta não existir no processo, ela será <strong>vinculada</strong>; se já existir, será <strong>desvinculada</strong>.</li>\n</ul>\n</li>\n<li><p><strong>Personalização por Tarefas:</strong></p>\n<ul>\n<li>As últimas etiquetas usadas são personalizadas por tarefas. Por exemplo, se você estiver na tarefa <strong>Minutar Ato Ordinatório</strong>, as etiquetas mais usadas nessa tarefa aparecerão no topo.</li>\n</ul>\n</li>\n<li><p><strong>Adicionar Etiquetas com ENTER:</strong></p>\n<ul>\n<li>Se você tentar adicionar uma etiqueta pressionando a tecla ENTER no campo de digitação e a etiqueta já existir, será emitido um aviso de confirmação.</li>\n</ul>\n</li>\n<li><p><strong>Teste Rápido:</strong></p>\n<ul>\n<li>Clique com o mouse sobre o nome das etiquetas para ver a lista das últimas etiquetas usadas.</li>\n<li>Use a tecla ENTER no campo de digitação para adicionar uma etiqueta e observe o aviso de confirmação se a etiqueta já existir.</li>\n</ul>\n</li>\n</ol>\n',
  "visualizador-lembretes": '<h1 id="funcionalidade-visualizador-de-lembretes">Funcionalidade: Visualizador de Lembretes</h1>\n<h2 id="descrição-da-funcionalidade">Descrição da funcionalidade</h2>\n<p>Ao passar o mouse sobre o ícone de lembrete, o conteúdo do lembrete aparecerá como um título (tooltip).</p>\n<h2 id="configurações">Configurações</h2>\n<p>Para ativar ou desativar a funcionalidade, abra a página de opções da extensão, localize a aba <strong>Etiquetas</strong> e clique na checkbox em frente à opção <strong>Visualizar Lembretes</strong>.</p>\n<h2 id="como-testar">Como testar</h2>\n<ol>\n<li>Crie um lembrete no processo.</li>\n<li>Passe o mouse sobre o ícone de lembretes.</li>\n<li>O conteúdo do lembrete deverá aparecer como um título (tooltip).</li>\n</ol>\n'
};
const pmrMcFormatoMinimo = "/assets/pmr_mc_formato_minimo-7e42631d.png";
const pmrMcFormatoPadrao = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ0AAAArCAYAAACjO1V+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABfaVRYdFNuaXBNZXRhZGF0YQAAAAAAeyJjbGlwUG9pbnRzIjpbeyJ4IjowLCJ5IjowfSx7IngiOjQxMywieSI6MH0seyJ4Ijo0MTMsInkiOjQzfSx7IngiOjAsInkiOjQzfV19kdiboAAACBtJREFUeF7tnduW2zQUhrfjzLR30JnCRV+jL0EPFHgYDpdcUvowQOmBxwAKpYuLWSy4oWVNM6dkEju20ba1x4rHcpxEGR/6f1nqr61t2ZnGkbRl2fESBZVwNgtSjeOYBoNBmmdgw4a9uR3OZzQ+P6EgHlPsz7WXKFF+z9geNuyu2sd/nadqcvv2bfK/Vmh7gclslip/SZgoilKFDZuBvZkdhgEF4ZTmifqeeTHFyu9pf6qwYXfcDk6yc93k1q1blHdRBTzPQ0JC2lJS3zCl/D0bLJQjIfUl2bBOrx1PLodGAAA3hOGMTidHFA2mFHuhLgWgP5z+k12iMeHpNWunc3I+1TkAgGt4au30bESRP6NkkF/TAaAvnPydXaIxKe10Dg4OdA4AAABYj9FopHM5lZHOOAjTVTZ8YQgKbVpn4YQm4YiCaEoJX3ivWQ/qXq9RRHtn/9L1WEVpcaTKPVWedFh9CsMB0emQordEA0+Vq2YRupm+vLGve5OcpZ0OAG0hVJ3N2eyQ5klAUYLpqCbZiUO6OXlDu/Nz8qi0+egY3JkOKT5WOrJfAAerYet0Klev+b4PhbZD1aiUR9pMre2hW9fhUOxsBV6nVb18dX6lNtSJ2rBGOpMQo0nQHtJIJ3ibakzZPS+gGSTSuaY+C0ou34vRPTyKox2KTxDpuOT39/d0Lqcy0gGgdajxUdUICoD1UWPvPswUdgBrpHM+x2gStAeOcMYc6cQzXNNpmMVIpw/tBF/TUZHOkYp4EOk44zdEOgAAV2RDVYQGYHWsnQ4vjYRC26TcxNXZDrp9TfS1HF5y3A/Vf4+e+IG60TKs02vTKPsQAGgDMr0WxFN1QmPqt0kuptfm/KisHrQTiac6nR1KTvz0Ph3ghhfv3dC5nMrptWUjHSi0CZUZnbrbQ7elekTbF1Vjb84tG7lDV9MyEOmATjCPZ1mkoyIeLCRolj5GOkmySxHfHIpIxxm2SAf36Vwxn967S98/fXahoB4XnU6sOp0Y52aTZJ3Of3QtUp1OT+7TSWLudLB6zSW2+3Qql0zzPRHsrtIHdz7SNRb54dnzWvU30U/u3rk4Dr+Px89/qlVvU617XHM70y6WQ5crX9OZzI/SZ7DxzaF160Hd666KNPfHr+m6+kySpF470WYl8lWnM6SYr+kc1q/XFf344aOsUdY8+eqLC//9b77VpYvlLtS2ZHrj+3SkAW2Cpo5d97hN/t/0DUyvtYe+Ta8lyUD9s9Pb6TXudH788nNt5RTLbduty1r36XCPtYlyo8sUbVM5ldWTxJh+s1yQcrO+qWZ9RvZhKy/WE9v0sbJflBFbthGW7d+sx8kshy6qJLGhUKhduSPhCEZsU4vlQnG7ddWGtdNZdcdlfp52kgaWlW3xi82Jp6jKyjlJffbLVFax3KS4H7HL9l/3uIzpZ0QF3q7q/VXt36zHyXxf0FwliQ2FutGEPH5I5aXy7ivDU2jc+bDWredKy6iMdOrCjWQxLYMb101YVr/O/ld5D6u+3+L2q9YHi/AccOk8MAAu6PHJxRGNJPMajsBlnCTy2TYb36fDcIPKK7FMFT/b3AnJSq06+yvrvOrUY9bdjtnmcVnX2T8004Q1SSiKsmuNdetBt6VZK90fjdOL33XvP+mKPtbXaMQWzO24s+HtuOMp1t9Uy7B2OvLbJcK6Ni8N5k6I1aSqPm8vSTqrZccrsmz7svpyPDm2yar7K9ry/yD7L7Lp/vtuc7guK2MY1/uHvaq9OH3SZZtz6WllTAnxr1+awN7MNlk8kwz4C14nLdtW/KKS59F+cZtinhM31jafadvyxWT6bO9hmc+0bfkqn0Q6Zb4yGylPMiJFajZxhJC+SnydS/x949TDc+vBw0cLttm2cGRj87lINpwsmS6Dlwqzz1wyLLapTHFZsbnPKh8jftlnMV/Gqsct7s+sb/MJ69Qzy0FG9iNuh0pn+BG3hunlTxtE/HPVPsUjXdQjeBGBUFwSXeXblJXv0xkHoc6557P79+i7J0+1BcByuNM5nR6q7ibAfToNI08k2J1P+F5+XdplBhRFqsM5HlByZJ38ASvy8sa+zuUsvU8HgHZRHbaDq6NPnwP/LZ5+ge1jjXTOZoHOAdA8wfxcnZOHNE8CivvwkMkOs6sinb3x63R6zevFEwn4pw14eg2Rjkv+2LupczlLIx1ZsVJUAX74y1Rw7WfMMZKsQCqqAP8W/Sqbl9f7/Nrs59Oqym+qAH+13wYiHdAJ+JrO8eQNRRRS4vVnaqeL7EQB7U8k0un+Z8GRTjT30wd+kop2gBvWinQAaAs8NrKMj0AjGFFP1+E/RaUe/UWtxhrpnE5nOgdA8/A1HYl0PAyVGmWYRjrZkmmvB1FnGumEAxXpqBPrWEU7wAmv9j/QuRxEOqAzyNgIK4yAa9IoOp0mxLl1FVgjneMJ/1YGAO2AI52js9cUD+aIdBpmGAe0N35D1+OeXNOJiUIV6dDZEJGOQ/68+aHO5WD1GvylKrTN7/FqKaONW7U+/O78HBNI1LlOfaZNfn6mn+35YUUV4K/221j8FAzSkNOS5OGLtgQ//GXlktbxXzxzTb3a+P7M9M74+VXwcWrN+7OkMn/6LDk1oFnwSztYUPjr+W1YOx3bqECADdvkKmxpGMQ2gX21NjcsJq73f9U2/zlmQ+l6/++6bXLpms7BwYHOAQAAAOsxGl1+eipf07EuJKj7lGkAAACgyMtffta5nMpOZ5tPmQYAANBvXr34VedyKlev8Zyt7/tQKBQKha6s5RD9D0dg0u4b8d5KAAAAAElFTkSuQmCC";
const desenvolvedores = contributors.map((contributor) => `- ${contributor.name} (${contributor.email})`).join("<br>");
const licenca = LICENSE.split("\n\n").join("</p><p>");
const textoSobre = `
  <div class="sobre"><h1>${displayName}
    <br><small>${description}</small>
    <br><small><small>Versão ${version}</small></small></h1>
  </div>
  <div class="licenca"><p>${licenca}</p></div>
  <div class="desenvolvedores"><h3><strong>Desenvolvedores</strong></h3><p>${desenvolvedores}</p></div>
  <div <h3><strong>Agradecimentos</strong></h3><p>${agradecimentos}</p></div>
`;
const navegacao = {
  titulo: "PJe+R",
  subtitulo: "+Rápido +Racional +Relevante",
  itens: [
    {
      titulo: "Aparência",
      subtitulo: "Ajustes na aparência do PJe",
      opcoes: [
        {
          titulo: "Incluir lotação no título",
          componente: "switch",
          item: "incluirLotacaoNoTitulo",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=223"
        },
        {
          titulo: "Ajustes gerais",
          componente: "switch",
          item: "ajustesGerais",
          valores: []
        },
        {
          titulo: "Mais espaço",
          componente: "switch",
          item: "maisEspaco",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=259"
        },
        {
          titulo: "Destacar lembretes",
          componente: "switch",
          item: "destacarLembretes",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=346"
        },
        {
          titulo: "Pesquisa por número no topo",
          componente: "switch",
          item: "pesquisacamposreordena",
          valores: [],
          link: "https://youtu.be/S4hcSO-OWLo"
        },
        {
          titulo: "Tema",
          componente: "radio",
          item: "tema",
          horizontal: true,
          valores: [
            {
              rotulo: "Padrão",
              valor: OPCOES_TEMA.PADRAO,
              imagemUrl: defaultTheme,
              width: "125"
            },
            {
              rotulo: "Escuro",
              valor: OPCOES_TEMA.ESCURO,
              imagemUrl: darkTheme,
              width: "125"
            },
            {
              rotulo: "Alto Contraste",
              valor: OPCOES_TEMA.ALTO_CONTRASTE,
              imagemUrl: highContrastTheme,
              width: "125"
            }
          ]
        }
      ]
    },
    {
      titulo: "Automação",
      subtitulo: "Automação de cliques",
      opcoes: [
        {
          titulo: "Pular página quadro de avisos",
          componente: "switch",
          item: "pularquadroavisos",
          valores: [],
          link: "https://youtu.be/PuQpa35Cosk?t=140"
        },
        {
          titulo: "Seleção automática de lotação",
          componente: "switch",
          item: "selecionarLotacao",
          valores: [],
          link: "https://youtu.be/PuQpa35Cosk?t=204"
        },
        {
          titulo: "Total de tarefas",
          componente: "switch",
          item: "totalTarefas",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=412"
        },
        {
          titulo: "Pular página vazia do Token PJe",
          componente: "switch",
          item: "pularpaginavazia",
          valores: []
        },
        {
          titulo: "Automação nos processos",
          componente: "switch",
          item: "automacaoProcessos",
          valores: [],
          link: "https://youtu.be/pBZZE-Hbvq8",
          title: explicacoes["automacao-processos"]
        },
        {
          titulo: "Integração SISBAJUD",
          componente: "switch",
          item: "sisbajud",
          valores: [],
          link: "https://youtu.be/51KxMr8QR1Y?t=7",
          title: explicacoes["sisbajud"]
        },
        {
          titulo: "Integração Infojud",
          componente: "switch",
          item: "integracaoInfojud",
          valores: [],
          title: explicacoes["infojud"]
        },
        {
          titulo: "Integração Serasajud",
          componente: "switch",
          item: "integracaoSerasajud",
          valores: [],
          title: explicacoes["serasajud"]
        },
        {
          titulo: "Melhorar Painel Oficial Justiça",
          componente: "switch",
          item: "painelOficialJustica",
          valores: []
        },
        {
          titulo: "Atalhos úteis",
          componente: "switch",
          item: "atalhosuteis",
          valores: []
        }
      ]
    },
    {
      titulo: "Etiquetas",
      subtitulo: "Gerenciamento de etiquetas",
      opcoes: [
        {
          titulo: "Últimas etiquetas usadas",
          componente: "switch",
          item: "ultimasEtiquetasUsadaTarefa",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=426",
          title: explicacoes["ultimas-etiquetas-usadas"]
        },
        {
          titulo: "Minhas Tarefas - Mostra Etiquetas",
          componente: "switch",
          item: "etiquetaFavoritaMinhasTarefas",
          valores: [],
          link: "https://youtu.be/PuQpa35Cosk?t=260",
          title: explicacoes["etiqueta-favorita-minhas-tarefas"]
        },
        {
          titulo: "Adicionar e remover etiquetas pelos Autos Digitais",
          componente: "switch",
          item: "adicionarEtiquetasAutos",
          valores: [],
          link: "https://youtu.be/KeEgNoBBu-4",
          title: explicacoes["adicionar-etiquetas-autos"]
        },
        {
          titulo: "Gerenciador Etiquetas",
          componente: "switch",
          item: "gerenciadorEtiquetas",
          valores: [],
          link: "https://youtu.be/G0hvzTPWinM",
          title: explicacoes["gerenciador-etiquetas"]
        },
        {
          titulo: "Visualizar Lembretes",
          componente: "switch",
          item: "visualizadorLembretes",
          valores: [],
          title: explicacoes["visualizador-lembretes"]
        },
        {
          titulo: "Visualizar etiquetas e lembretes nos Autos Digitais",
          componente: "switch",
          item: "tagsAutosDigitais",
          valores: [],
          title: explicacoes["tags-autos-digitais"]
        },
        {
          titulo: "Etiquetas Coloridas",
          componente: "switch",
          item: "etiquetasColoridas",
          valores: [],
          link: "https://youtu.be/PuQpa35Cosk?t=298",
          title: explicacoes["etiquetas-coloridas"]
        },
        {
          titulo: "Como deseja a paleta de cores",
          componente: "radio",
          item: "opcoesPaletaCores",
          valores: [
            {
              rotulo: "Cores reduzidas",
              valor: OPCOES_PALETA_CORES.REDUZIDO,
              imagemUrl: paletaResuzida
            },
            {
              rotulo: "Todas as cores possiveis",
              valor: OPCOES_PALETA_CORES.COMPLETO,
              imagemUrl: paletaCompleta
            }
          ]
        }
      ]
    },
    {
      titulo: "Lista de processos",
      subtitulo: "Opções para as páginas que apresentam listas de processos",
      opcoes: [
        {
          titulo: "Diminuir cartão inativo",
          componente: "switch",
          item: "inativaCartao",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=528"
        },
        {
          titulo: "Contar processos selecionados.",
          componente: "switch",
          item: "contarSelecaoProcessos",
          valores: [],
          title: explicacoes["contar-selecao-processos"]
        },
        {
          titulo: "Painel baixar de tarefas",
          componente: "switch",
          item: "painelBaixaTarefas",
          title: explicacoes["painel-baixa-tarefas"]
        },
        {
          titulo: "Melhorar o cartão de tarefas",
          componente: "switch",
          item: "melhorarCartaoTarefa",
          opcaoAuxiliar: "melhorarCartaoTarefaOpcoesAuxiliares",
          opcaoAuxiliarItems: [
            {
              rotulo: "Destacar se decorridos (dias):",
              inputType: "number",
              chave: "flagDeLimiteVermelho",
              groupClass: "flag-decurso-tempo-tarefa-vermelho"
            },
            {
              rotulo: "Destacar se decorridos (dias):",
              inputType: "number",
              chave: "flagDeLimiteAmarelo",
              groupClass: "flag-decurso-tempo-tarefa-amarelo"
            },
            {
              rotulo: "Destacar se decorridos (dias):",
              inputType: "number",
              chave: "flagDeLimiteVerde",
              groupClass: "flag-decurso-tempo-tarefa-verde"
            },
            {
              rotulo: "Copiar número do processo",
              inputType: "switch",
              chave: "copiarNumeroProcesso",
              //groupClass: 'flag-decurso-tempo-tarefa-verde'
              subItemGroup: "opcao-auxiliar-switch"
            },
            {
              rotulo: "Destacar o número do processo",
              inputType: "switch",
              chave: "destacarNumeroProcesso",
              //groupClass: 'flag-decurso-tempo-tarefa-verde'
              subItemGroup: "opcao-auxiliar-switch"
            },
            {
              rotulo: "Modificar a cor padrão das etiquetas",
              inputType: "switch",
              chave: "modificarCorPadraoEtiqueta",
              //groupClass: 'flag-decurso-tempo-tarefa-verde'
              subItemGroup: "opcao-auxiliar-switch"
            },
            {
              rotulo: "Melhorar destaque das prioridades",
              inputType: "switch",
              chave: "melhorarDestaquePrioridade",
              //groupClass: 'flag-decurso-tempo-tarefa-verde'
              subItemGroup: "opcao-auxiliar-switch"
            },
            {
              rotulo: "Recolher cartão",
              inputType: "switch",
              chave: "recolherdorCartao",
              //groupClass: 'flag-decurso-tempo-tarefa-verde'
              subItemGroup: "opcao-auxiliar-switch"
            },
            {
              rotulo: "Melhorar o destaque do cartão selecionado",
              inputType: "switch",
              chave: "melhorarDestaqueCartaoSelecionado",
              //groupClass: 'flag-decurso-tempo-tarefa-verde'
              subItemGroup: "opcao-auxiliar-switch"
            },
            {
              rotulo: "Contar dias desde a última conclusão (*experimental)",
              inputType: "switch",
              chave: "contarDiasConclusao",
              //groupClass: 'flag-decurso-tempo-tarefa-verde'
              subItemGroup: "opcao-auxiliar-switch"
            }
          ]
        },
        {
          titulo: "Cartão de processo",
          componente: "radio",
          item: "cartaoProcesso",
          valores: [
            {
              rotulo: "Versão normal",
              valor: OPCOES_CARTAO_DE_PROCESSO.NORMAL,
              imagemUrl: cartaoNormalUrl
            },
            {
              rotulo: "Alternar linhas",
              valor: OPCOES_CARTAO_DE_PROCESSO.ALTERNAR_LINHAS,
              imagemUrl: cartaoAlternadoUrl
            },
            {
              rotulo: "Mínimo",
              valor: OPCOES_CARTAO_DE_PROCESSO.MINIMO,
              imagemUrl: cartaoMinimoUrl
            }
          ],
          link: "https://youtu.be/FNJsVhAQSXE?t=528"
        }
      ]
    },
    {
      titulo: "Autos digitais",
      subtitulo: "Funcionalidades para a página de autos digitais",
      opcoes: [
        {
          titulo: "Cópia automática de dados da peça",
          componente: "switch",
          item: "copiaDadosPecaAtivado",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=51"
        },
        {
          titulo: " ",
          componente: "radio",
          item: "copiarDadosDaPeca",
          valores: [
            {
              rotulo: "Sem descrição: Documento - 9780707",
              valor: OPCOES_COPIAR_DADOS_DA_PECA.SEM_DESCRICAO
            },
            {
              rotulo: "Incluir descrição: Documento - Descrição - 9780707",
              valor: OPCOES_COPIAR_DADOS_DA_PECA.DESCRICAO
            },
            {
              rotulo: "Apenas ID: 9780707",
              valor: OPCOES_COPIAR_DADOS_DA_PECA.APENAS_ID
            },
            {
              rotulo: "Entre parênteses: (ID 9780707)",
              valor: OPCOES_COPIAR_DADOS_DA_PECA.ID_ENTRE_PARENTESE
            }
          ]
        },
        {
          titulo: "Inverter ordem de download",
          componente: "switch",
          item: "inverterOrdemDownload",
          valores: []
        },
        {
          titulo: "Aba Movimentos",
          componente: "switch",
          item: "autosAbaMovimentos",
          valores: []
        },
        {
          titulo: "Aba Fases",
          componente: "switch",
          item: "autosAbaFases",
          valores: []
        },
        {
          titulo: "Ajustar Data e Hora",
          componente: "switch",
          item: "autosAjustaDataHora",
          valores: []
        },
        {
          titulo: "Copiar Dados Polo",
          componente: "switch",
          item: "copiarDadosPolo",
          valores: [],
          title: explicacoes["copiar-dados-polo"]
        },
        {
          titulo: "O icone de usuário vai copiar:",
          componente: "radio",
          item: "opcoesCopiarDadosPolo",
          valores: [
            {
              rotulo: "Apenas nome da parte",
              valor: OPCOES_COPIAR_DADOS_POLO.NOME,
              imagemUrl: CopiaNomePolo
            },
            {
              rotulo: "Nome da parte e número do documento",
              valor: OPCOES_COPIAR_DADOS_POLO.NOME_NUMERO,
              imagemUrl: CopiaNomeDocumentoPolo
            }
          ]
        }
      ]
    },
    {
      titulo: "Minutas",
      subtitulo: "Opções para as páginas de elaboração e assinatura de minutas",
      opcoes: [
        {
          titulo: "Ajustar usuário da minuta",
          componente: "switch",
          item: "ajustarUsuarioMinuta",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=504"
        },
        {
          titulo: "Minuta centralizada",
          componente: "switch",
          item: "minutaCentralizada",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=504"
        },
        {
          titulo: "Remover aviso de Atenção",
          componente: "switch",
          item: "removerAvisoAtencao",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=504"
        },
        {
          titulo: "Ajustar urgência, sigilo e prazo",
          componente: "switch",
          item: "ajustarUrgenciaSigilo",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=504"
        },
        {
          titulo: "Ajustar opções automáticas",
          componente: "switch",
          item: "ajustarPrazoIntimacao",
          valores: []
        },
        {
          titulo: "Ajustar caixa de movimentos",
          componente: "switch",
          item: "ajustarCaixaMovimentos",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=504"
        },
        {
          titulo: "Homologador de movimentos",
          componente: "switch",
          item: "homologadorMovimentos",
          valores: [],
          link: "https://youtu.be/FNJsVhAQSXE?t=504"
        }
      ]
    },
    {
      titulo: "Filtros de tarefas",
      subtitulo: "Filtra as tarefas por setores no painel de usuários",
      opcoes: [
        {
          titulo: "Ativar/Desativar",
          componente: "switch",
          item: "filtrostarefas",
          valores: [],
          link: "https://youtu.be/PuQpa35Cosk?t=450",
          title: explicacoes["filtros-tarefas"]
        },
        {
          titulo: "",
          componente: "editorFiltros",
          item: "",
          valores: []
          // ,link: 'https://youtu.be/PuQpa35Cosk?t=450'
        }
      ]
    },
    // inicio da lista de recursos experimentais
    {
      titulo: "Recursos experimentais",
      subtitulo: "Os recursos listados abaixo podem conter erros",
      opcoes: [
        {
          titulo: "Integração AJG",
          componente: "switch",
          item: "integracaoAJG",
          valores: [],
          title: explicacoes["ajg"]
        },
        {
          titulo: "Gestor de modelos do PJe+R",
          componente: "switch",
          item: "gestorDeModelos",
          valores: [],
          link: "https://www.youtube.com/watch?v=vlR_Pp-2pm4",
          title: explicacoes["gestor-de-modelos"]
        },
        {
          titulo: "Visualizador",
          componente: "switch",
          item: "multivisualizador",
          valores: [],
          title: explicacoes["multivisualizador"]
        },
        {
          titulo: "Abrir link no popup",
          componente: "switch",
          item: "abrirLinkMenuNoAppup",
          valores: [],
          title: explicacoes["abrir-link-menu-no-appup"]
        },
        {
          titulo: "Gerar Sinopse Relatoria",
          componente: "switch",
          item: "gerarSinopseRelatoria",
          valores: [],
          link: "https://youtu.be/Wtr9HKUvX3I",
          title: explicacoes["gerar-sinopse-relatoria"]
        },
        {
          titulo: "Links nas Últimas Tarefas",
          componente: "switch",
          item: "linksUltimasTarefas",
          valores: [],
          title: explicacoes["links-ultimas-tarefas"]
        },
        {
          titulo: "Mais atalhos nos autos digitais",
          componente: "switch",
          item: "maisAtalhosAutosDigitais",
          valores: [],
          title: explicacoes["mais-atalhos-autos-digitais"]
        },
        {
          titulo: "Seletor Processos",
          componente: "switch",
          item: "seletorProcessos",
          title: explicacoes["seletor-processos"]
        },
        {
          titulo: "Mostra ou colorir Processos por Digitos",
          componente: "switch",
          item: "mostraProcessosDigitos",
          valores: [],
          title: explicacoes["mostra-processos-digitos"]
        },
        {
          titulo: "Intima Zap",
          componente: "switch",
          item: "intimaZap",
          valores: [],
          title: explicacoes["intima-zap"]
        },
        {
          titulo: "Abrir Lembrete No Popup",
          componente: "switch",
          item: "abrirLembreteNoPopup",
          valores: []
        },
        {
          titulo: "Post It",
          componente: "switch",
          item: "PostIt",
          valores: []
        }
        // insira o objeto acima
      ]
    },
    {
      titulo: "Mapa de calor painel usuário",
      subtitulo: "Ferramentas para exibir Mapa de Calor no Painel do Usuário para rápida análise situacional dos processos.",
      opcoes: [
        {
          textoAlerta: "Este é um recurso experimental e pode conter erros.",
          componente: "alerta",
          alertaTipo: "warning"
        },
        {
          titulo: "Ativar Mapa de Calor no Painel do Usuário",
          componente: "switch",
          item: "mapaDeCalorPainelUsuario",
          valores: [],
          title: explicacoes["mapa-de-calor-painel-usuario"]
        },
        {
          titulo: "Mapa de Calor baseado nos dados:",
          componente: "radio",
          item: "mapaDeCalorPainelUsuarioOrigemDados",
          valores: [
            {
              rotulo: "Quantidade pendente em relação ao acervo total",
              valor: EN_MAPA_CALOR_ORIGEM_DADOS.QUANTIDADE_TOTAL_TAREFA
            },
            {
              rotulo: "Quantidade pendente com contagem de decurso de dias baseado na data de entrada da tarefa",
              valor: EN_MAPA_CALOR_ORIGEM_DADOS.PARALIZADOS_ENTRADA_TAREFA
            },
            {
              rotulo: "Quantidade pendente com contagem de decurso de dias baseado na data do último movimento do processo",
              valor: EN_MAPA_CALOR_ORIGEM_DADOS.PARALIZADOS_ULTIMO_MOVIMENTO
            }
          ]
        },
        {
          textoAlerta: "Caso seu tribunal não tenha suporte à data do ultimo movimento, os dados apresentados serão pela data de entrada da tarefa.",
          componente: "alerta",
          alertaTipo: "info",
          avaliar: (opcoes) => opcoes.mapaDeCalorPainelUsuarioOrigemDados === EN_MAPA_CALOR_ORIGEM_DADOS.PARALIZADOS_ULTIMO_MOVIMENTO
        },
        {
          titulo: "Definir limites para dias decorridos",
          componente: "",
          item: "",
          valores: [],
          opcaoAuxiliar: "mapaDeCalorPainelUsuarioLimitesFlags",
          opcaoAuxiliarItems: [
            {
              rotulo: "Usar as mesmas definições de Melhorar Cartão da Tarefa",
              inputType: "switch",
              chave: "mapaDeCalorPainelUsuarioUsarLimitesFlagsMelhorarCartaoTarefa",
              //groupClass: 'flag-decurso-tempo-tarefa-verde'
              subItemGroup: "opcao-auxiliar-switch"
            },
            {
              rotulo: "Nível vermelho (dias):",
              inputType: "number",
              chave: "flagDeLimiteVermelho",
              groupClass: "flag-decurso-tempo-tarefa-vermelho",
              avaliarDesabilitado: (opcoes) => opcoes.mapaDeCalorPainelUsuarioLimitesFlags.mapaDeCalorPainelUsuarioUsarLimitesFlagsMelhorarCartaoTarefa
            },
            {
              rotulo: "Nível amarelo (dias):",
              inputType: "number",
              chave: "flagDeLimiteAmarelo",
              groupClass: "flag-decurso-tempo-tarefa-amarelo",
              avaliarDesabilitado: (opcoes) => {
                var _a;
                return (_a = opcoes == null ? void 0 : opcoes.mapaDeCalorPainelUsuarioLimitesFlags) == null ? void 0 : _a.mapaDeCalorPainelUsuarioUsarLimitesFlagsMelhorarCartaoTarefa;
              }
            },
            {
              rotulo: "Nível verde (dias):",
              inputType: "number",
              chave: "flagDeLimiteVerde",
              groupClass: "flag-decurso-tempo-tarefa-verde",
              avaliarDesabilitado: (opcoes) => opcoes.mapaDeCalorPainelUsuarioLimitesFlags.mapaDeCalorPainelUsuarioUsarLimitesFlagsMelhorarCartaoTarefa
            }
          ]
        },
        {
          titulo: "Formato da barra de calor",
          componente: "radio",
          item: "mapaDeCalorPainelUsuarioFormatoBarra",
          valores: [
            {
              rotulo: "Padrão",
              valor: EN_MAPA_CALOR_FORMATO_BARRA.PADRAO,
              imagemUrl: pmrMcFormatoPadrao
            },
            {
              rotulo: "Mínimo",
              valor: EN_MAPA_CALOR_FORMATO_BARRA.MINIMO,
              imagemUrl: pmrMcFormatoMinimo
            }
          ]
        },
        {
          titulo: "Ignorar as tarefas abaixo",
          componente: "editorListaTarefas",
          item: "mapaDeCalorPainelUsuarioTarefasIgnoradas",
          title: `	Ignorar tarefas que “contenham” (regra padrão) (nenhum símbolo):  "consulta"
            	Ignorar tarefas que “comecem com” (^): "^Expedir"
            	Ignorar tarefas que “terminem com” ($): "recursal$"
            	Ignorar uma correspondência exata (^...$): ^Preparar intimação$
            

            Avançado: Crie uma expressão regular válida (/.../): /^expedir(?!.*certidão).*/  (comece com "expedir", exceto se houver "certidão")`
        }
      ]
    },
    // insira o objeto acima
    {
      titulo: "Sobre",
      subtitulo: "Informações adicionais sobre esta extensão",
      conteudo: textoSobre
    }
  ]
};
const textoLogEmProducao = `Você autorizou logs no seu navegador. Recomenda-se desautorizar isso clicando no ícone da extensão no canto superior esquerdo da janela.
O único motivo para manter essa autorização é apra fins de informar problemas para os desenvolvedores.`;
const _hoisted_1$1 = {
  key: 0,
  class: "div-mae"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EditorListaTarefas",
  props: {
    setupOpcaoItem: { default: () => "" }
  },
  setup(__props) {
    const props = __props;
    const opcoesCarregadas = ref(false);
    const opcoes = reactive({});
    const gerenciadorOpcoes = new GerenciadorOpcoes((dados) => {
      Object.assign(opcoes, dados);
      opcoesCarregadas.value = true;
    });
    const obterTarefas = () => {
      return opcoes[props.setupOpcaoItem];
    };
    const adicionarTarefa = (tarefa) => {
      const newArrayValue = opcoes[props.setupOpcaoItem];
      newArrayValue.push(tarefa);
      newArrayValue.sort();
      gerenciadorOpcoes.definirOpcao({
        opcao: props.setupOpcaoItem,
        valor: Array.from(newArrayValue)
      });
    };
    const removerTarefa = (indice) => {
      const newArrayValue = opcoes[props.setupOpcaoItem];
      newArrayValue.splice(indice, 1);
      gerenciadorOpcoes.definirOpcao({
        opcao: props.setupOpcaoItem,
        valor: Array.from(newArrayValue)
      });
    };
    const alterarTarefa = ({ indice, conteudo }) => {
      const newArrayValue = opcoes[props.setupOpcaoItem];
      newArrayValue[indice] = conteudo;
      newArrayValue.sort();
      gerenciadorOpcoes.definirOpcao({
        opcao: props.setupOpcaoItem,
        valor: Array.from(newArrayValue)
      });
    };
    return (_ctx, _cache) => {
      return opcoesCarregadas.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(_sfc_main$3, {
          lista: obterTarefas(),
          setores: false,
          estatica: true,
          onAdicionado: adicionarTarefa,
          onRemovido: removerTarefa,
          onAlterado: alterarTarefa
        }, null, 8, ["lista"])
      ])) : createCommentVNode("", true);
    };
  }
});
const EditorListaTarefas_vue_vue_type_style_index_0_scoped_7c683def_lang = "";
const EditorListaTarefas = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7c683def"]]);
const _hoisted_1 = {
  key: 0,
  class: "container"
};
const _hoisted_2 = { class: "sidenav" };
const _hoisted_3 = { class: "header" };
const _hoisted_4 = { class: "subtitle" };
const _hoisted_5 = /* @__PURE__ */ createElementVNode("hr", null, null, -1);
const _hoisted_6 = { class: "content" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = /* @__PURE__ */ createElementVNode("div", { style: { padding: "0 8px" } }, [
  /* @__PURE__ */ createElementVNode("hr")
], -1);
const _hoisted_9 = { class: "main" };
const _hoisted_10 = {
  key: 0,
  class: "conteudo"
};
const _hoisted_11 = { class: "titulo" };
const _hoisted_12 = /* @__PURE__ */ createElementVNode("hr", { class: "rounded" }, null, -1);
const _hoisted_13 = {
  key: 0,
  class: "opcoes"
};
const _hoisted_14 = {
  key: 0,
  class: "option"
};
const _hoisted_15 = { class: "option-title" };
const _hoisted_16 = {
  key: 0,
  class: "link-tutorial"
};
const _hoisted_17 = {
  key: 5,
  class: "opcaoLinha-principal"
};
const _hoisted_18 = { key: 0 };
const _hoisted_19 = {
  key: 0,
  class: "link-tutorial"
};
const _hoisted_20 = {
  key: 6,
  class: "opcao-linha-items-auxiliares"
};
const _hoisted_21 = { key: 1 };
const _hoisted_22 = ["innerHTML"];
const _hoisted_23 = {
  key: 1,
  class: "spinner"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Options",
  setup(__props) {
    const theme = useTheme();
    const themeDict = {
      padrao: "light",
      escuro: "dark",
      altoContraste: "highContrast"
    };
    const secaoAtiva = ref(0);
    const opcoesCarregadas = ref(false);
    const opcoes = reactive({});
    const logAutorizadoEmProducao = ref(false);
    const gerenciadorOpcoes = new GerenciadorOpcoes((dados) => {
      const themeValue = themeDict[dados.tema] || "light";
      theme.global.name.value = themeValue;
      Object.assign(opcoes, dados);
      opcoesCarregadas.value = true;
      logAutorizadoEmProducao.value = opcoes.autorizarLogEmProducao;
    });
    const atualizar = async (opcao, valor) => {
      gerenciadorOpcoes.definirOpcao({ opcao, valor });
      if (opcao == "tema" && valor == OPCOES_TEMA.PADRAO) {
        theme.global.name.value = "light";
      } else if (valor == OPCOES_TEMA.ESCURO) {
        theme.global.name.value = "dark";
      } else if (valor == OPCOES_TEMA.ALTO_CONTRASTE) {
        theme.global.name.value = "highContrast";
      }
    };
    const atualizarOpcaoComOpcoesAuxiliares = async (opcao, objKey, valor) => {
      gerenciadorOpcoes.definirOpcaoComSubKey({ opcao, objKey, valor });
    };
    const inverteAutorizarLogEmProducao = () => {
      logAutorizadoEmProducao.value = !logAutorizadoEmProducao.value;
      atualizar("autorizarLogEmProducao", logAutorizadoEmProducao.value);
    };
    const obterValorDeOpcaoAuxiliar = (opcaoAuxiliar, chave) => {
      if (!(opcaoAuxiliar in opcoes))
        return void 0;
      const opcaoAuxiliarObj = opcoes[opcaoAuxiliar];
      if (!(chave in opcaoAuxiliarObj))
        return void 0;
      return opcaoAuxiliarObj[chave];
    };
    const exportarOpcoes = async () => {
      const opcoesAtuais = await gerenciadorOpcoes.obterOpcoes();
      salvaArquivo(JSON.stringify(opcoesAtuais), "configurações PJe+R.txt");
    };
    const importarOpcoes = (dados) => {
      gerenciadorOpcoes.atualizarOpcoes(dados);
    };
    function telaModaw(nome) {
      const existingModal = document.querySelector("#modal-info");
      if (!existingModal) {
        const modal = document.createElement("div");
        modal.id = "modal-info";
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: auto;
            height: auto;
            max-height: 70vh;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 15px;
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            overflow-y: auto;
        `;
        const closeButton = document.createElement("button");
        closeButton.textContent = "Fechar";
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            background-color: #dc3545;
            color: #fff;
            cursor: pointer;
            font-size: 1em;
        `;
        closeButton.addEventListener("click", () => {
          modal.remove();
        });
        modal.appendChild(closeButton);
        const content = document.createElement("div");
        const parser = new DOMParser();
        const doc = parser.parseFromString(nome, "text/html");
        Array.from(doc.body.childNodes).forEach((node) => {
          content.appendChild(node);
        });
        content.style.cssText = `
            margin-top: 1px;
            text-align: left;
            font-size: 1em;
            line-height: 1.5;
            padding-bottom: 10px;
        `;
        const style = document.createElement("style");
        style.textContent = `
            #modal-info h1 {
                font-size: 1.5em;
                margin-bottom: 10px;
                color: #333;
            }
            #modal-info h2 {
                font-size: 1.2em;
                margin-bottom: 10px;
                color: #555;
            }
            #modal-info p {
                margin-bottom: 10px;
                color: #666;
            }
            #modal-info ul, #modal-info ol {
                margin-bottom: 10px;
                padding-left: 20px;
            }
            #modal-info li {
                margin-bottom: 5px;
                color: #666;
            }
        `;
        document.head.appendChild(style);
        modal.appendChild(content);
        document.body.appendChild(modal);
        const closeModalOnClickOutside = (event) => {
          if (!modal.contains(event.target)) {
            modal.remove();
            document.removeEventListener("click", closeModalOnClickOutside);
          }
        };
        setTimeout(() => {
          document.addEventListener("click", closeModalOnClickOutside);
        }, 0);
        modal.addEventListener("mouseleave", () => {
          modal.remove();
        });
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$8), null, {
        default: withCtx(() => [
          opcoesCarregadas.value ? (openBlock(), createElementBlock("main", _hoisted_1, [
            createElementVNode("section", _hoisted_2, [
              createElementVNode("div", _hoisted_3, [
                createVNode(unref(_sfc_main$c), {
                  tamanho: "56",
                  onClick: inverteAutorizarLogEmProducao
                }),
                createElementVNode("div", _hoisted_4, toDisplayString(unref(navegacao).subtitulo), 1)
              ]),
              _hoisted_5,
              createElementVNode("div", _hoisted_6, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(navegacao).itens, (item, index) => {
                  return openBlock(), createElementBlock("a", {
                    key: index,
                    class: normalizeClass({ active: secaoAtiva.value === index }),
                    onClick: ($event) => secaoAtiva.value = index
                  }, toDisplayString(item.titulo), 11, _hoisted_7);
                }), 128)),
                _hoisted_8,
                createVNode(unref(_sfc_main$6), {
                  class: "btn",
                  onClick: exportarOpcoes
                }),
                createVNode(unref(_sfc_main$5), {
                  class: "btn",
                  onImportado: importarOpcoes
                })
              ])
            ]),
            createElementVNode("section", _hoisted_9, [
              logAutorizadoEmProducao.value ? (openBlock(), createBlock(unref(_sfc_main$a), {
                key: 0,
                texto: unref(textoLogEmProducao),
                class: "warning"
              }, null, 8, ["texto"])) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(navegacao).itens, (item, index) => {
                return openBlock(), createElementBlock("div", { key: index }, [
                  index === secaoAtiva.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
                    createElementVNode("div", _hoisted_11, [
                      createElementVNode("span", null, toDisplayString(item.titulo), 1),
                      createElementVNode("p", null, toDisplayString(item.subtitulo), 1),
                      _hoisted_12
                    ]),
                    Array.isArray(item.opcoes) ? (openBlock(), createElementBlock("div", _hoisted_13, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(item.opcoes, (opcao) => {
                        return openBlock(), createElementBlock("div", {
                          key: `${opcao.titulo}`,
                          class: normalizeClass(["opcao", `${opcao.componente} ${opcao.opcaoAuxiliar ? "comItemsAuxiliares" : ""}`])
                        }, [
                          (opcao.link || opcao.titulo) && !opcao.opcaoAuxiliar ? (openBlock(), createElementBlock("div", _hoisted_14, [
                            createElementVNode("span", _hoisted_15, toDisplayString(opcao.titulo), 1),
                            opcao.link || opcao.title ? (openBlock(), createElementBlock("div", _hoisted_16, [
                              opcao.link ? (openBlock(), createBlock(unref(AppLinkBtn), {
                                key: 0,
                                href: opcao.link,
                                target: "_blank",
                                title: "Abrir tutorial",
                                icone: "nossos-i",
                                alt: "Ícone de informação",
                                tamanho: "20"
                              }, null, 8, ["href"])) : createCommentVNode("", true),
                              opcao.title ? (openBlock(), createBlock(unref(AppLinkBtn), {
                                key: 1,
                                style: { "margin-left": "10px", "color": "rgb(202, 109, 2)" },
                                icone: "nossos-script",
                                alt: "Ícone de Explicativo",
                                tamanho: "20",
                                onMouseover: ($event) => opcao.title && telaModaw(opcao.title)
                              }, null, 8, ["onMouseover"])) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          opcao.componente === "switch" && !opcao.opcaoAuxiliar ? (openBlock(), createBlock(unref(AppSwitch), {
                            key: 1,
                            "texto-ativado": "",
                            "texto-desativado": "",
                            "model-value": opcoes[opcao.item],
                            "onUpdate:modelValue": ($event) => atualizar(opcao.item, $event)
                          }, null, 8, ["model-value", "onUpdate:modelValue"])) : opcao.componente === "radio" && !opcao.opcaoAuxiliar ? (openBlock(), createElementBlock("div", {
                            key: 2,
                            class: "radio-box",
                            style: normalizeStyle({
                              flexDirection: opcao.horizontal ? "row" : "column"
                            })
                          }, [
                            createVNode(unref(AppRadio), {
                              titulo: opcao.titulo,
                              opcoes: opcao.valores,
                              "model-value": opcoes[opcao.item],
                              "onUpdate:modelValue": ($event) => atualizar(opcao.item, $event)
                            }, null, 8, ["titulo", "opcoes", "model-value", "onUpdate:modelValue"])
                          ], 4)) : opcao.componente === "editorFiltros" && !opcao.opcaoAuxiliar ? (openBlock(), createBlock(EditorFiltros, { key: 3 })) : opcao.componente === "editorListaTarefas" && !opcao.opcaoAuxiliar ? (openBlock(), createBlock(EditorListaTarefas, {
                            key: 4,
                            "setup-opcao-item": opcao.item
                          }, null, 8, ["setup-opcao-item"])) : createCommentVNode("", true),
                          withDirectives(createVNode(VAlert, {
                            type: opcao.alertaTipo || "error",
                            text: opcao.textoAlerta
                          }, null, 8, ["type", "text"]), [
                            [
                              vShow,
                              opcao.componente === "alerta" && ((opcao == null ? void 0 : opcao.avaliar) ? opcao.avaliar(opcoes) : true)
                            ]
                          ]),
                          opcao.opcaoAuxiliar ? (openBlock(), createElementBlock("div", _hoisted_17, [
                            opcao.link || opcao.titulo ? (openBlock(), createElementBlock("h2", _hoisted_18, [
                              createTextVNode(toDisplayString(opcao.titulo) + " ", 1),
                              opcao.link ? (openBlock(), createElementBlock("div", _hoisted_19, [
                                opcao.link ? (openBlock(), createBlock(unref(AppLinkBtn), {
                                  key: 0,
                                  href: opcao.link,
                                  target: "_blank",
                                  title: "Abrir tutorial",
                                  icone: "nossos-i",
                                  alt: "Ícone de informação",
                                  tamanho: "20"
                                }, null, 8, ["href"])) : createCommentVNode("", true)
                              ])) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true),
                            opcao.componente === "switch" ? (openBlock(), createBlock(unref(AppSwitch), {
                              key: 1,
                              "texto-ativado": "",
                              "texto-desativado": "",
                              "model-value": opcoes[opcao.item],
                              "onUpdate:modelValue": ($event) => atualizar(opcao.item, $event)
                            }, null, 8, ["model-value", "onUpdate:modelValue"])) : opcao.componente === "radio" ? (openBlock(), createBlock(unref(AppRadio), {
                              key: 2,
                              titulo: opcao.titulo,
                              opcoes: opcao.valores,
                              "model-value": opcoes[opcao.item],
                              "onUpdate:modelValue": ($event) => atualizar(opcao.item, $event)
                            }, null, 8, ["titulo", "opcoes", "model-value", "onUpdate:modelValue"])) : opcao.componente === "editorFiltros" ? (openBlock(), createBlock(EditorFiltros, { key: 3 })) : opcao.componente === "editorListaTarefas" ? (openBlock(), createBlock(EditorListaTarefas, {
                              key: 4,
                              "setup-opcao-item": opcao.item
                            }, null, 8, ["setup-opcao-item"])) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          opcao.opcaoAuxiliar && (typeof opcoes[opcao.item] === "undefined" ? true : opcoes[opcao.item]) ? (openBlock(), createElementBlock("div", _hoisted_20, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(opcao.opcaoAuxiliarItems, (itemAux, indexAux) => {
                              return openBlock(), createElementBlock("div", {
                                key: indexAux,
                                class: normalizeClass(["subItemGroup", `${itemAux.subItemGroup ? itemAux.subItemGroup : ""}`])
                              }, [
                                itemAux.inputType === "number" ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                  key: 0,
                                  idg: unref(guidGenerator)(),
                                  label: itemAux.rotulo,
                                  "input-type": itemAux.inputType,
                                  "sub-item-id": itemAux.chave,
                                  "to-disable": (itemAux == null ? void 0 : itemAux.avaliarDesabilitado) ? itemAux.avaliarDesabilitado(opcoes) ? true : false : false,
                                  "group-class": `${itemAux.groupClass ? itemAux.groupClass : ""}`,
                                  "model-value": obterValorDeOpcaoAuxiliar(opcao.opcaoAuxiliar, itemAux.chave),
                                  "onUpdate:modelValue": ($event) => atualizarOpcaoComOpcoesAuxiliares(
                                    opcao.opcaoAuxiliar,
                                    itemAux.chave,
                                    $event
                                  )
                                }, null, 8, ["idg", "label", "input-type", "sub-item-id", "to-disable", "group-class", "model-value", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                itemAux.inputType === "switch" ? (openBlock(), createElementBlock("label", _hoisted_21, toDisplayString(itemAux.rotulo), 1)) : createCommentVNode("", true),
                                itemAux.inputType === "switch" ? (openBlock(), createBlock(unref(AppSwitch), {
                                  key: 2,
                                  "texto-ativado": "",
                                  "texto-desativado": "",
                                  "model-value": obterValorDeOpcaoAuxiliar(opcao.opcaoAuxiliar, itemAux.chave),
                                  "onUpdate:modelValue": ($event) => atualizarOpcaoComOpcoesAuxiliares(
                                    opcao.opcaoAuxiliar,
                                    itemAux.chave,
                                    $event
                                  )
                                }, null, 8, ["model-value", "onUpdate:modelValue"])) : createCommentVNode("", true)
                              ], 2);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ], 2);
                      }), 128))
                    ])) : (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: "conteudo-estatico",
                      innerHTML: item.conteudo
                    }, null, 8, _hoisted_22))
                  ])) : createCommentVNode("", true)
                ]);
              }), 128))
            ])
          ])) : (openBlock(), createElementBlock("main", _hoisted_23, [
            createVNode(unref(AppSpinner))
          ]))
        ]),
        _: 1
      });
    };
  }
});
const Options_vue_vue_type_style_index_0_lang = "";
const app = createApp(_sfc_main);
app.use(vuetify).mount("#app");
